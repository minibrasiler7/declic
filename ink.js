/* Déclic — l'encre : écrire et dessiner au stylet (Apple Pencil), au doigt ou à la souris.
   Sert aux blocs « Dessin » de l'ardoise et aux annotations posées sur les leçons.
   Un trait = {k:'p'|'h' (stylo, surligneur), c:couleur, w:taille, p:[x, y, pression, x, y, pression, …]}.
   Les coordonnées sont rapportées à une largeur de 1000 : le dessin garde sa forme sur tous les écrans.
   Dès qu'un stylet a servi, le doigt fait défiler au lieu de dessiner, et la paume posée ne laisse pas de trace ni n'appuie sur rien. */
window.Ink = (()=>{
  const W=1000;
  const COLORS=[['ink','Encre','--ink'],['blue','Bleu','#2F6FE0'],['red','Rouge','#D93B3B'],['green','Vert','#1E9E55'],['orange','Orange','#E58A00'],['violet','Violet','#8250DF']];
  const SIZES=[[2,'Fin'],[3.5,'Moyen'],[6,'Épais']];
  const ls={ get(k,d){ try{ const v=localStorage.getItem(k); return v===null?d:JSON.parse(v); }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} } };
  const pref=Object.assign({tool:'p',c:'ink',w:3.5,finger:'off'},ls.get('declic-ink',{}));
  // Le doigt quand on écrit au stylet : 'off' bloqué (défile seulement), 'scroll' défile (main ignorée près du stylet), 'draw' dessine
  if(typeof pref.finger==='boolean') pref.finger=pref.finger?'draw':'off';
  const fingerCls=()=>document.body.classList.toggle('ink-finger-off',penSeen&&pref.finger==='off');
  let penSeen=!!ls.get('declic-pen',false);
  const bars=new Set();
  const repaintBars=()=>bars.forEach(b=>{ if(b.el.isConnected) b.paint(); else bars.delete(b); });
  const setPref=o=>{ Object.assign(pref,o); ls.set('declic-ink',pref); repaintBars(); fingerCls(); };

  document.head.append(Object.assign(document.createElement('style'),{textContent:`
  .ink-cv{position:relative;display:block;width:100%;height:100%;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
  .ink-cv canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
  body.annot-on #player .p-body,body.ink-finger-off #player .p-body,body.ink-finger-off aside.ard .ard-ink{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
  .ink-bar .seg button{padding:0 8px}
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

  /* ---------- rendu ----------
     Comme dans Freeform : chaque trait est une forme pleine dont le contour suit la pression.
     Les points sont lissés, la pression aussi, et le trait s'affine au début et à la fin. */
  function col(c){ const d=COLORS.find(x=>x[0]===c); const v=d?d[2]:c; return v.startsWith('--')?(getComputedStyle(document.documentElement).getPropertyValue(v).trim()||'#13233A'):v; }
  // pression 0…1 d'un point (format 2 : 0…100 ; ancien format : 0…9)
  const prOf=(s,i)=>s.v?s.p[3*i+2]/100:s.p[3*i+2]/9;
  // épaisseur selon la pression : un appui léger au Pencil donne ~0,2, un appui fort ~0,8
  const thick=pr=>.42+1.45*Math.pow(Math.max(0,pr),.6);
  // Points du trait en pixels : stabilisés (la main tremble, la pointe aussi), pression lissée,
  // puis rééchantillonnés tous les ~1,2 px le long d'une spline de Catmull-Rom : le contour reste rond même en écrivant vite.
  function points(s,k,dense=true){
    const P=s.p, n=P.length/3, raw=[];
    let x=P[0]*k, y=P[1]*k, e=prOf(s,0);
    for(let i=0;i<n;i++){ const px=P[3*i]*k, py=P[3*i+1]*k, last=i===n-1;
      const a=last?1:.62; x+=(px-x)*a; y+=(py-y)*a; e+=(prOf(s,i)-e)*.4; raw.push([x,y,e]); }
    if(!dense||n<3) return raw;
    const out=[raw[0]];
    for(let i=0;i<n-1;i++){
      const p0=raw[Math.max(0,i-1)], p1=raw[i], p2=raw[i+1], p3=raw[Math.min(n-1,i+2)];
      const m=Math.min(24,Math.max(1,Math.ceil(Math.hypot(p2[0]-p1[0],p2[1]-p1[1])/1.2)));
      for(let j=1;j<=m;j++){ const t=j/m, t2=t*t, t3=t2*t;
        const c=(a,b,c2,d)=>.5*(2*b+(-a+c2)*t+(2*a-5*b+4*c2-d)*t2+(-a+3*b-3*c2+d)*t3);
        out.push([c(p0[0],p1[0],p2[0],p3[0]),c(p0[1],p1[1],p2[1],p3[1]),p1[2]+(p2[2]-p1[2])*t]); }
    }
    return out;
  }
  const cache=new WeakMap();
  function shape(s,k){
    const c=cache.get(s); if(c&&c.k===k&&c.n===s.p.length) return c.path;
    const pts=points(s,k), n=pts.length, base=s.w*k/2, path=new Path2D(), caps=new Path2D(); // les disques à part : même sens de rotation, pas de trou
    // longueur parcourue : le trait s'affine sur ses premiers et derniers pixels (moins au Pencil, dont la pression le fait déjà)
    const len=[0]; for(let i=1;i<n;i++) len.push(len[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));
    const L0=len[n-1], tl=Math.min(10*k+4,L0*.18), lo=s.v&&s.pen0?.75:.5;
    const r=pts.map((q,i)=>{ let t=1; if(tl>0){ const d=Math.min(len[i],L0-len[i]); if(d<tl) t=lo+(1-lo)*Math.sin(d/tl*Math.PI/2); }
      return Math.max(.4,base*thick(q[2])*t); });
    if(n===1||L0<1){ path.arc(pts[0][0],pts[0][1],Math.max(...r)*1.25,0,7); } // un point (celui d'un i) un peu plus rond
    else {
      const Lf=[], Rt=[]; let nx=0, ny=-1;
      for(let i=0;i<n;i++){
        const a=pts[Math.max(0,i-2)], b=pts[Math.min(n-1,i+2)], dx=b[0]-a[0], dy=b[1]-a[1], d=Math.hypot(dx,dy);
        if(d>.01){ nx=-dy/d; ny=dx/d; }
        Lf.push([pts[i][0]+nx*r[i],pts[i][1]+ny*r[i]]); Rt.push([pts[i][0]-nx*r[i],pts[i][1]-ny*r[i]]);
      }
      const side=(Q,fwd)=>{ const idx=fwd?[...Q.keys()]:[...Q.keys()].reverse(); // contour lisse : courbes passant par les milieux
        path.lineTo(Q[idx[0]][0],Q[idx[0]][1]);
        for(let j=1;j<idx.length-1;j++){ const p=Q[idx[j]], q=Q[idx[j+1]]; path.quadraticCurveTo(p[0],p[1],(p[0]+q[0])/2,(p[1]+q[1])/2); }
        const z=Q[idx[idx.length-1]]; path.lineTo(z[0],z[1]); };
      path.moveTo(Lf[0][0],Lf[0][1]); side(Lf,true); side(Rt,false); path.closePath();
      // bouts arrondis, et un disque aux virages serrés (points d'origine) pour que le trait ne se pince pas
      caps.moveTo(pts[0][0]+r[0],pts[0][1]); caps.arc(pts[0][0],pts[0][1],r[0],0,7);
      caps.moveTo(pts[n-1][0]+r[n-1],pts[n-1][1]); caps.arc(pts[n-1][0],pts[n-1][1],r[n-1],0,7);
      const raw=points(s,k,false);
      for(let i=1;i<raw.length-1;i++){ const a=raw[i-1], b=raw[i], c2=raw[i+1], u=[b[0]-a[0],b[1]-a[1]], v=[c2[0]-b[0],c2[1]-b[1]];
        const cos=(u[0]*v[0]+u[1]*v[1])/((Math.hypot(...u)*Math.hypot(...v))||1);
        if(cos<.2){ const rr=Math.max(.4,base*thick(b[2])); caps.moveTo(b[0]+rr,b[1]); caps.arc(b[0],b[1],rr,0,7); } }
    }
    const out=[path,caps]; // remplis séparément : en un seul chemin, la règle nonzero creusait les bouts
    cache.set(s,{k,n:s.p.length,path:out}); return out;
  }
  function paint(g,s,k){
    const n=s.p.length/3; if(!n) return;
    g.save();
    if(s.k==='h'){ // surligneur : un seul chemin large et transparent, pour ne pas foncer aux recouvrements
      const pts=points(s,k); g.globalAlpha=.3; g.strokeStyle=col(s.c); g.lineCap='round'; g.lineJoin='round'; g.lineWidth=s.w*4.5*k;
      g.beginPath(); g.moveTo(pts[0][0],pts[0][1]);
      for(let i=1;i<n-1;i++) g.quadraticCurveTo(pts[i][0],pts[i][1],(pts[i][0]+pts[i+1][0])/2,(pts[i][1]+pts[i+1][1])/2);
      g.lineTo(pts[n-1][0]+(n===1?.01:0),pts[n-1][1]); g.stroke();
    } else { g.fillStyle=col(s.c); for(const p of shape(s,k)) g.fill(p,'nonzero'); }
    g.restore();
  }

  /* ---------- la main posée pendant qu'on écrit ----------
     Dès qu'un stylet a servi (et sauf si « Doigt : dessine »), un doigt ou la paume ne sélectionne rien, n'appuie sur
     rien et ne fait pas défiler la page tout seul dans les zones d'écriture ; pendant un trait, nulle part. Le doigt garde
     un défilement fait à la main, coupé dès que le stylet touche l'écran. */
  let penDown=0, lastPen=0, force=0, fdrag=null;
  const palmZone=t=>!!t?.closest&&(!!t.closest('.ink-cv')||document.body.classList.contains('annot-on')&&!!t.closest('#player .p-body')
    ||pref.finger==='off'&&!!t.closest('#player .p-body, aside.ard .ard-ink')
    ||Date.now()-lastPen<1500&&!!t.closest('#player .p-body, aside.ard .ard-body'));
  const guard=()=>penSeen&&pref.finger!=='draw';
  // Sur la toile, aucun toucher (Pencil compris) ne déclenche les gestes d'iOS : après un point (le point d'un i),
  // iOS attendait un éventuel double-toucher et retenait le trait suivant.
  const onInk=e=>!!e.target?.closest?.('.ink-cv');
  for(const t of ['touchend','touchcancel']) document.addEventListener(t,e=>{ if(onInk(e)&&e.cancelable) e.preventDefault(); },{capture:true,passive:false});
  document.addEventListener('touchstart',e=>{
    for(const t of e.touches) if(t.touchType==='stylus') force=t.force;
    if(onInk(e)){ if(e.cancelable) e.preventDefault(); return; }
    if(!guard()||![...e.changedTouches].some(t=>t.touchType!=='stylus')) return;
    if((penDown||palmZone(e.target))&&e.cancelable) e.preventDefault();
  },{capture:true,passive:false});
  document.addEventListener('touchmove',e=>{ for(const t of e.touches) if(t.touchType==='stylus') force=t.force;
    if(onInk(e)){ if(e.cancelable) e.preventDefault(); return; }
    if(guard()&&(penDown||fdrag)&&e.cancelable&&[...e.changedTouches].some(t=>t.touchType!=='stylus')) e.preventDefault(); },{capture:true,passive:false});
  const scrollerOf=el=>{ for(;el&&el!==document.body;el=el.parentElement){ const o=getComputedStyle(el).overflowY; if((o==='auto'||o==='scroll')&&el.scrollHeight>el.clientHeight) return el; } return null; };
  document.addEventListener('pointerdown',e=>{
    if(e.pointerType==='pen'){ lastPen=Date.now(); fdrag=null;
      // une sélection de texte restée ouverte capterait le Pencil : on l'efface dès qu'il écrit
      if(e.target?.closest?.('.ink-cv')){ const sel=getSelection(); if(sel&&!sel.isCollapsed) sel.removeAllRanges(); }
      return; }
    if(e.pointerType==='touch'&&guard()&&!penDown&&!fdrag&&palmZone(e.target)){ const sc=scrollerOf(e.target); if(sc) fdrag={id:e.pointerId,y:e.clientY,top:sc.scrollTop,sc}; }
  },true);
  document.addEventListener('pointermove',e=>{
    if(e.pointerType==='pen'){ lastPen=Date.now(); return; } // le Pencil qui survole l'écran compte aussi
    if(fdrag&&e.pointerId===fdrag.id&&!penDown) fdrag.sc.scrollTop=fdrag.top-(e.clientY-fdrag.y);
  },true);
  const fend=e=>{ if(fdrag&&e.pointerId===fdrag.id) fdrag=null; };
  document.addEventListener('pointerup',fend,true); document.addEventListener('pointercancel',fend,true);

  /* ---------- surface de dessin ----------
     o = {strokes, onChange(strokes), enabled() → bool}. Deux toiles : les traits finis, et par-dessus le trait en cours. */
  function surface(o){
    const el=document.createElement('div'); el.className='ink-cv';
    const cv=document.createElement('canvas'), live=document.createElement('canvas'); el.append(cv,live);
    const g=cv.getContext('2d'), gl=live.getContext('2d');
    let strokes=(o.strokes||[]).slice(), undo=[], redo=[], cur=null, k=1, dpr=1, raf=0, pred=[];
    function render(){ g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,cv.width,cv.height); strokes.forEach(s=>paint(g,s,k)); }
    function renderLive(){ raf=0; gl.setTransform(dpr,0,0,dpr,0,0); gl.clearRect(0,0,live.width,live.height);
      if(!cur||cur.erase) return;
      const s=pred.length?{...cur,p:cur.p.concat(pred)}:cur; cache.delete(s); paint(gl,s,k); }
    const liveSoon=()=>{ if(!raf) raf=requestAnimationFrame(renderLive); };
    function size(){ const r=el.getBoundingClientRect(); if(!r.width) return; dpr=window.devicePixelRatio||1; k=r.width/W;
      const w=Math.round(r.width*dpr), h=Math.round(r.height*dpr);
      for(const c of [cv,live]) if(c.width!==w||c.height!==h){ c.width=w; c.height=h; }
      render(); renderLive(); }
    const ro=new ResizeObserver(size); ro.observe(el);
    const cap=e=>{ try{ el.setPointerCapture(e.pointerId); }catch(_){} };
    const pt=e=>{ const r=el.getBoundingClientRect(); return [Math.round((e.clientX-r.left)/k*10)/10,Math.round((e.clientY-r.top)/k*10)/10]; };
    // Pression du Pencil : celle de l'évènement, sinon celle de l'évènement principal, sinon la force du toucher (Safari)
    function press(ev,main){
      if(cur.pen){ const v=ev.pressure||main?.pressure||force||.5; return Math.round(Math.min(1,Math.max(.02,v))*100); }
      // doigt ou souris : pas de pression, on l'imite avec la vitesse (plus vite = plus fin)
      const p=cur.p, n=p.length, t=ev.timeStamp||performance.now();
      const sp=n>=3&&cur.t?Math.hypot(pt(ev)[0]-p[n-3],pt(ev)[1]-p[n-2])/Math.max(1,t-cur.t):0; cur.t=t;
      cur.sp=(cur.sp??sp)*.7+sp*.3; return Math.round((.62-Math.min(.32,cur.sp*.18))*100);
    }
    const changed=()=>{ o.onChange?.(strokes); repaintBars(); };
    function commit(next,before=strokes){ undo.push(before); if(undo.length>80) undo.shift(); redo=[]; strokes=next; render(); changed(); }
    function eraseAt(x,y){
      const keep=strokes.filter(s=>{ const p=s.p, r=12+s.w*(s.k==='h'?2.3:.8); for(let i=0;i<p.length;i+=3){ const dx=p[i]-x, dy=p[i+1]-y; if(dx*dx+dy*dy<r*r) return false; } return true; });
      if(keep.length!==strokes.length){ strokes=keep; cur.hit=true; render(); }
    }
    el.addEventListener('pointerdown',e=>{
      if(o.enabled&&!o.enabled()) return;
      if(e.pointerType==='pen'&&!penSeen){ penSeen=true; ls.set('declic-pen',true); repaintBars(); fingerCls(); }
      if(e.pointerType==='touch'&&guard()) return; // la main : défilement géré plus haut, jamais de trait
      if(cur&&cur.pen&&e.pointerType==='pen') end({pointerId:cur.id}); // un Pencil ne touche qu'en un point : un trait resté ouvert (fin perdue) se termine ici
      if(cur||(e.pointerType==='mouse'&&e.button!==0)) return;
      e.preventDefault(); cap(e);
      const [x,y]=pt(e);
      if(e.pointerType==='pen') penDown++;
      if(pref.tool==='e'){ cur={erase:true,id:e.pointerId,pen:e.pointerType==='pen',before:strokes,hit:false}; eraseAt(x,y); return; }
      cur={k:pref.tool,c:pref.c,w:pref.w,v:2,p:[],id:e.pointerId,pen:e.pointerType==='pen'}; if(cur.pen) cur.pen0=1;
      cur.p.push(x,y,press(e,e)); liveSoon();
    });
    el.addEventListener('pointermove',e=>{
      if(!cur||e.pointerId!==cur.id) return; e.preventDefault();
      const evs=(e.getCoalescedEvents&&e.getCoalescedEvents().length)?e.getCoalescedEvents():[e];
      for(const ev of evs){ const [x,y]=pt(ev);
        if(cur.erase){ eraseAt(x,y); continue; }
        const p=cur.p, n=p.length; if((x-p[n-3])**2+(y-p[n-2])**2<1) continue;
        p.push(x,y,press(ev,e)); }
      if(cur.erase) return;
      // points prédits (Chrome, Safari récent) : le trait suit la pointe sans retard ; ils ne sont pas gardés
      pred=[]; if(e.getPredictedEvents) for(const ev of e.getPredictedEvents().slice(0,2)){ const [x,y]=pt(ev); pred.push(x,y,cur.p[cur.p.length-1]); }
      liveSoon();
    });
    function end(e){
      if(!cur||e.pointerId!==cur.id) return; const c=cur; cur=null; pred=[];
      if(c.pen) penDown=Math.max(0,penDown-1);
      if(c.erase){ if(c.hit){ undo.push(c.before); redo=[]; changed(); } return; }
      ['id','pen','t','sp'].forEach(f=>delete c[f]);
      commit([...strokes,c]); renderLive();
    }
    el.addEventListener('pointerup',end); el.addEventListener('pointercancel',end);
    const S={el, get:()=>strokes,
      set(st){ strokes=(st||[]).slice(); undo=[]; redo=[]; render(); },
      undo(){ if(!undo.length) return; redo.push(strokes); strokes=undo.pop(); render(); changed(); },
      redo(){ if(!redo.length) return; undo.push(strokes); strokes=redo.pop(); render(); changed(); },
      clear(){ if(strokes.length) commit([]); },
      canUndo:()=>undo.length>0, canRedo:()=>redo.length>0, isEmpty:()=>!strokes.length,
      resize:size, destroy(){ ro.disconnect(); if(cur?.pen) penDown=Math.max(0,penDown-1); cur=null; }};
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
    const g5=grp(); g5.classList.add('seg'); g5.innerHTML='<span class="lab">Doigt :</span>';
    const fbs=[['off','Bloqué','Le doigt et la paume ne sélectionnent rien et n’appuient sur rien dans la page : seul le stylet écrit et touche. Le doigt fait seulement défiler.'],
      ['scroll','Défile','Le doigt fait défiler ; la main posée est ignorée pendant qu’on écrit'],['draw','Dessine','Le doigt dessine comme le stylet']]
      .map(([v,l,t])=>{ const b=btn(l,t,()=>setPref({finger:v})); b.dataset.f=v; g5.append(b); return b; });
    if(opts.done){ const d=btn('Terminer','Terminer l’annotation',opts.done); d.style.cssText='background:var(--accent);color:var(--accent-ink)'; el.append(d); }
    const bar={el,paint(){
      tools.forEach(b=>b.classList.toggle('on',b.dataset.t===pref.tool));
      sws.forEach(b=>b.classList.toggle('on',b.dataset.c===pref.c&&pref.tool!=='e'));
      szs.forEach(b=>b.classList.toggle('on',+b.dataset.w===pref.w));
      const s=surf(); bu.disabled=!s?.canUndo(); br.disabled=!s?.canRedo(); bc.disabled=!s||s.isEmpty();
      g5.hidden=!penSeen; fbs.forEach(b=>b.classList.toggle('on',b.dataset.f===pref.finger));
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
    const surf=surface({strokes:(S.notes||{})[key]||[], enabled:()=>annotOn,
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

  fingerCls();
  return {surface, toolbar, attachCard, setAnnot, onLessonClosed};
})();
