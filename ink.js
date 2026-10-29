/* Déclic — l'encre : écrire et dessiner au stylet (Apple Pencil), au doigt ou à la souris.
   Sert aux blocs « Dessin » de l'ardoise et aux annotations posées sur les leçons.
   Un trait = {k:'p'|'h' (stylo, surligneur), c:couleur, w:taille, p:[x, y, pression, x, y, pression, …]}.
   Les coordonnées sont rapportées à une largeur de 1000 : le dessin garde sa forme sur tous les écrans.
   Dès qu'un stylet a servi, le doigt fait défiler au lieu de dessiner (la paume posée ne laisse pas de trace). */
window.Ink = (()=>{
  const W=1000;
  const COLORS=[['ink','Encre','--ink'],['blue','Bleu','#2F6FE0'],['red','Rouge','#D93B3B'],['green','Vert','#1E9E55'],['orange','Orange','#E58A00'],['violet','Violet','#8250DF']];
  const SIZES=[[2,'Fin'],[3.5,'Moyen'],[6,'Épais']];
  const ls={ get(k,d){ try{ const v=localStorage.getItem(k); return v===null?d:JSON.parse(v); }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} } };
  const pref=Object.assign({tool:'p',c:'ink',w:3.5,finger:false},ls.get('declic-ink',{}));
  let penSeen=!!ls.get('declic-pen',false);
  const bars=new Set();
  const repaintBars=()=>bars.forEach(b=>{ if(b.el.isConnected) b.paint(); else bars.delete(b); });
  const setPref=o=>{ Object.assign(pref,o); ls.set('declic-ink',pref); repaintBars(); };

  document.head.append(Object.assign(document.createElement('style'),{textContent:`
  .ink-cv{display:block;width:100%;height:100%;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
  .ink-bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
  .ink-bar .grp{display:flex;gap:3px;align-items:center;padding:3px;border:1px solid var(--line);border-radius:11px;background:var(--surface)}
  .ink-bar button{height:32px;min-width:32px;border:0;border-radius:8px;background:none;color:var(--ink);cursor:pointer;display:grid;place-items:center;padding:0 7px;font:700 13px var(--f-body)}
  .ink-bar button:hover{background:var(--bg)}
  .ink-bar button.on{background:var(--accent-soft);color:var(--accent);box-shadow:inset 0 0 0 1.5px var(--accent)}
  .ink-bar button:disabled{opacity:.35;cursor:default;background:none}
  .ink-bar .sw{width:20px;height:20px;border-radius:50%;border:2px solid var(--surface);box-shadow:0 0 0 1px var(--line)}
  .ink-bar button.on .sw{box-shadow:0 0 0 2px var(--accent)}
  .ink-bar .dot{border-radius:50%;background:currentColor}
  .ink-bar .lab{font-size:12px;font-weight:700;color:var(--muted);padding:0 4px}
  .ink-layer{position:absolute;inset:0;pointer-events:none;z-index:2}
  body.annot-on .ink-layer{pointer-events:auto}
  `}));

  /* ---------- rendu ---------- */
  function col(c){ const d=COLORS.find(x=>x[0]===c); const v=d?d[2]:c; return v.startsWith('--')?(getComputedStyle(document.documentElement).getPropertyValue(v).trim()||'#13233A'):v; }
  const wid=(s,pr)=>s.w*(0.45+pr/9*1.1);
  // segment i : du milieu (i−1, i) au milieu (i, i+1), en passant par le point i (courbe lisse)
  function seg(g,s,i,k){
    const p=s.p, n=p.length/3, X=j=>p[3*j]*k, Y=j=>p[3*j+1]*k;
    const ax=i?(X(i-1)+X(i))/2:X(0), ay=i?(Y(i-1)+Y(i))/2:Y(0);
    const bx=i<n-1?(X(i)+X(i+1))/2:X(i), by=i<n-1?(Y(i)+Y(i+1))/2:Y(i);
    if(s.k!=='h') g.lineWidth=Math.max(.6,wid(s,p[3*i+2])*k);
    g.beginPath(); g.moveTo(ax,ay); g.quadraticCurveTo(X(i),Y(i),bx+(n===1?.01:0),by); g.stroke();
  }
  function paint(g,s,k){
    const n=s.p.length/3; if(!n) return;
    g.save(); g.lineCap='round'; g.lineJoin='round'; g.strokeStyle=col(s.c);
    if(s.k==='h'){ // surligneur : un seul chemin, transparent, pour ne pas foncer aux recouvrements
      g.globalAlpha=.3; g.lineWidth=s.w*4.5*k; const p=s.p; g.beginPath(); g.moveTo(p[0]*k,p[1]*k);
      for(let i=1;i<n;i++){ const mx=(p[3*i-3]+p[3*i])/2*k, my=(p[3*i-2]+p[3*i+1])/2*k; g.quadraticCurveTo(p[3*i-3]*k,p[3*i-2]*k,mx,my); }
      g.lineTo(p[3*n-3]*k+(n===1?.01:0),p[3*n-2]*k); g.stroke();
    } else for(let i=0;i<n;i++) seg(g,s,i,k);
    g.restore();
  }

  /* ---------- surface de dessin ----------
     o = {strokes, onChange(strokes), scroller() → élément qui défile sous le doigt, enabled() → bool} */
  function surface(o){
    const cv=document.createElement('canvas'); cv.className='ink-cv'; const g=cv.getContext('2d');
    let strokes=(o.strokes||[]).slice(), undo=[], redo=[], cur=null, k=1, dpr=1, drag=null;
    function render(){ g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,cv.width,cv.height); strokes.forEach(s=>paint(g,s,k)); if(cur&&!cur.erase) paint(g,cur,k); }
    function size(){ const r=cv.getBoundingClientRect(); if(!r.width) return; dpr=window.devicePixelRatio||1; k=r.width/W;
      const w=Math.round(r.width*dpr), h=Math.round(r.height*dpr); if(cv.width!==w||cv.height!==h){ cv.width=w; cv.height=h; } render(); }
    const ro=new ResizeObserver(size); ro.observe(cv);
    const cap=e=>{ try{ cv.setPointerCapture(e.pointerId); }catch(_){} };
    const pt=e=>{ const r=cv.getBoundingClientRect(); return [Math.round((e.clientX-r.left)/k),Math.round((e.clientY-r.top)/k)]; };
    const press=e=>e.pointerType==='pen'?Math.round(Math.min(1,Math.max(0,e.pressure||.5))*9):4;
    const changed=()=>{ o.onChange?.(strokes); repaintBars(); };
    function commit(next,before=strokes){ undo.push(before); if(undo.length>80) undo.shift(); redo=[]; strokes=next; render(); changed(); }
    function eraseAt(x,y){
      const keep=strokes.filter(s=>{ const p=s.p, r=12+s.w*(s.k==='h'?2.3:.8); for(let i=0;i<p.length;i+=3){ const dx=p[i]-x, dy=p[i+1]-y; if(dx*dx+dy*dy<r*r) return false; } return true; });
      if(keep.length!==strokes.length){ strokes=keep; cur.hit=true; render(); }
    }
    cv.addEventListener('pointerdown',e=>{
      if(o.enabled&&!o.enabled()) return;
      if(e.pointerType==='pen'&&!penSeen){ penSeen=true; ls.set('declic-pen',true); repaintBars(); }
      if(e.pointerType==='touch'&&penSeen&&!pref.finger){ // la main : on fait défiler, on ne dessine pas
        const sc=o.scroller?.(); if(sc&&!drag){ drag={id:e.pointerId,y:e.clientY,top:sc.scrollTop,sc}; cap(e); } return; }
      if(cur||(e.pointerType==='mouse'&&e.button!==0)) return;
      e.preventDefault(); cap(e);
      const [x,y]=pt(e);
      if(pref.tool==='e'){ cur={erase:true,id:e.pointerId,before:strokes,hit:false}; eraseAt(x,y); return; }
      cur={k:pref.tool,c:pref.c,w:pref.w,p:[x,y,press(e)],id:e.pointerId}; render();
    });
    cv.addEventListener('pointermove',e=>{
      if(drag&&e.pointerId===drag.id){ drag.sc.scrollTop=drag.top-(e.clientY-drag.y); return; }
      if(!cur||e.pointerId!==cur.id) return; e.preventDefault();
      const evs=(e.getCoalescedEvents&&e.getCoalescedEvents().length)?e.getCoalescedEvents():[e];
      const n0=cur.p?cur.p.length/3:0;
      for(const ev of evs){ const [x,y]=pt(ev);
        if(cur.erase){ eraseAt(x,y); continue; }
        const p=cur.p, n=p.length; if((x-p[n-3])**2+(y-p[n-2])**2<2) continue;
        p.push(x,y,press(ev)); }
      if(cur.erase) return;
      if(cur.k==='h') render();
      else { const n=cur.p.length/3; g.save(); g.setTransform(dpr,0,0,dpr,0,0); g.lineCap='round'; g.strokeStyle=col(cur.c); for(let i=Math.max(0,n0-1);i<n-1;i++) seg(g,cur,i,k); g.restore(); }
    });
    const end=e=>{
      if(drag&&e.pointerId===drag.id){ drag=null; return; }
      if(!cur||e.pointerId!==cur.id) return; const c=cur; cur=null;
      if(c.erase){ if(c.hit){ undo.push(c.before); redo=[]; changed(); } return; }
      delete c.id; commit([...strokes,c]);
    };
    cv.addEventListener('pointerup',end); cv.addEventListener('pointercancel',end);
    const S={el:cv, get:()=>strokes,
      set(st){ strokes=(st||[]).slice(); undo=[]; redo=[]; render(); },
      undo(){ if(!undo.length) return; redo.push(strokes); strokes=undo.pop(); render(); changed(); },
      redo(){ if(!redo.length) return; undo.push(strokes); strokes=redo.pop(); render(); changed(); },
      clear(){ if(strokes.length) commit([]); },
      canUndo:()=>undo.length>0, canRedo:()=>redo.length>0, isEmpty:()=>!strokes.length,
      resize:size, destroy(){ ro.disconnect(); }};
    return S;
  }

  /* ---------- barre d'outils ---------- */
  const ICON={
    p:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/></svg>',
    h:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14l-3 6h6l1-3"/><path d="M9 14l8-9 3 3-8 9z"/></svg>',
    e:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 20h12"/><path d="M5 15l9-10 6 6-8 9H8z"/><path d="M9 10l6 6"/></svg>',
    u:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/></svg>',
    r:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/></svg>'};
  // surf() → la surface visée ; opts.done → bouton « Terminer »
  function toolbar(surf,opts={}){
    const el=document.createElement('div'); el.className='ink-bar'; el.setAttribute('role','toolbar'); el.setAttribute('aria-label','Outils de dessin');
    const btn=(html,title,fn)=>{ const b=document.createElement('button'); b.type='button'; b.innerHTML=html; b.title=title; b.setAttribute('aria-label',title); b.onmousedown=e=>e.preventDefault(); b.onclick=fn; return b; };
    const grp=()=>{ const d=document.createElement('div'); d.className='grp'; el.append(d); return d; };
    const g1=grp(), tools=[['p','Stylo'],['h','Surligneur'],['e','Gomme : touche un trait pour l’effacer']].map(([t,l])=>{ const b=btn(ICON[t],l,()=>setPref({tool:t})); b.dataset.t=t; g1.append(b); return b; });
    const g2=grp(), sws=COLORS.map(([c,l])=>{ const b=btn(`<span class="sw" style="background:${c==='ink'?'var(--ink)':col(c)}"></span>`,l,()=>setPref({c,tool:pref.tool==='e'?'p':pref.tool})); b.dataset.c=c; g2.append(b); return b; });
    const g3=grp(), szs=SIZES.map(([w,l])=>{ const d=Math.round(4+w*1.6); const b=btn(`<span class="dot" style="width:${d}px;height:${d}px"></span>`,`Trait ${l.toLowerCase()}`,()=>setPref({w})); b.dataset.w=w; g3.append(b); return b; });
    const g4=grp(), bu=btn(ICON.u,'Annuler',()=>surf()?.undo()), br=btn(ICON.r,'Rétablir',()=>surf()?.redo());
    const bc=btn('Effacer','Effacer tout le dessin',()=>{ if(bc.dataset.sure){ surf()?.clear(); delete bc.dataset.sure; bc.textContent='Effacer'; } else { bc.dataset.sure=1; bc.textContent='Sûr ?'; setTimeout(()=>{ delete bc.dataset.sure; bc.textContent='Effacer'; },2500); } });
    g4.append(bu,br,bc);
    const bf=btn('','Ce que fait le doigt quand tu dessines au stylet',()=>setPref({finger:!pref.finger})); const g5=grp(); g5.append(bf);
    if(opts.done){ const d=btn('Terminer','Terminer l’annotation',opts.done); d.style.cssText='background:var(--accent);color:var(--accent-ink)'; el.append(d); }
    const bar={el,paint(){
      tools.forEach(b=>b.classList.toggle('on',b.dataset.t===pref.tool));
      sws.forEach(b=>b.classList.toggle('on',b.dataset.c===pref.c&&pref.tool!=='e'));
      szs.forEach(b=>b.classList.toggle('on',+b.dataset.w===pref.w));
      const s=surf(); bu.disabled=!s?.canUndo(); br.disabled=!s?.canRedo(); bc.disabled=!s||s.isEmpty();
      g5.hidden=!penSeen; bf.innerHTML=`<span class="lab">Doigt :</span>${pref.finger?'dessine':'défile'}`;
    }};
    bars.add(bar); bar.paint(); return el;
  }

  /* ---------- annotations sur les leçons ----------
     Une couche transparente couvre la carte de l'étape. Les traits sont rangés dans S.notes['leçon:étape']. */
  let annotOn=false, annot=null;
  const annotBar=()=>document.getElementById('ink-annot');
  function attachCard(card,key){
    annot?.surf.destroy();
    const layer=document.createElement('div'); layer.className='ink-layer';
    const surf=surface({strokes:(S.notes||{})[key]||[], scroller:()=>document.querySelector('.p-body'), enabled:()=>annotOn,
      onChange:st=>{ S.notes=S.notes||{}; if(st.length) S.notes[key]=st; else delete S.notes[key]; save(); }});
    layer.append(surf.el); card.append(layer); annot={surf,key};
    repaintBars(); paintBtn();
  }
  function paintBtn(){ const b=document.getElementById('annot-btn'); if(!b) return; b.classList.toggle('on',annotOn);
    const has=annot&&!annot.surf.isEmpty(); b.querySelector('span').textContent=annotOn?'Annoter':(has?'Annotée':'Annoter'); }
  function setAnnot(on){
    annotOn=on; document.body.classList.toggle('annot-on',on);
    let bar=annotBar();
    if(on&&!bar){ bar=document.createElement('div'); bar.id='ink-annot'; bar.className='wrap'; bar.append(toolbar(()=>annot?.surf,{done:()=>setAnnot(false)}));
      document.querySelector('#player .p-top').after(bar); }
    if(bar) bar.hidden=!on;
    paintBtn();
  }
  function onLessonClosed(){ if(annotOn) setAnnot(false); annot?.surf.destroy(); annot=null; }
  document.getElementById('annot-btn')?.addEventListener('click',()=>setAnnot(!annotOn));

  return {surface, toolbar, attachCard, setAnnot, onLessonClosed};
})();
