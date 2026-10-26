/* Déclic — l'ardoise : un brouillon de calcul qui remplace le papier.
   Chaque ligne est un calcul, une équation, une définition ou une phrase de raisonnement.
   La formule s'affiche comme écrite à la main (KaTeX), le résultat se calcule seul (math.js),
   et des boutons font les gestes du brouillon : résoudre, agir des deux côtés, simplifier,
   dériver, tracer, envoyer le résultat dans la réponse. Une ardoise par leçon, sauvegardée avec la progression. */
window.Ardoise = (()=>{
  const LIBS=[
    ['script','https://cdn.jsdelivr.net/npm/mathjs@12.4.2/lib/browser/math.js'],
    ['script','https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js'],
    ['css','https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css'],
  ];
  let loading=null, panel=null, key='_libre', lines=[''], focusIdx=0, saveT=null, openGraphs=new Set(), lastInput=null;
  const isOpen=()=>panel&&!panel.hidden;

  /* ---------- styles ---------- */
  document.head.append(Object.assign(document.createElement('style'),{textContent:`
  .ard{position:fixed;z-index:30;background:var(--surface);border-left:1px solid var(--line);display:flex;flex-direction:column;top:0;right:0;bottom:0;width:430px;max-width:100%;box-shadow:-10px 0 30px rgba(0,0,0,.08);padding-top:env(safe-area-inset-top,0px)}
  body.ard-open #player{right:430px}
  body.ard-open main,body.ard-open header.top .wrap{margin-right:430px}
  @media (max-width:900px){
    .ard{top:auto;left:0;width:auto;height:50vh;border-left:0;border-top:1px solid var(--line);box-shadow:0 -10px 30px rgba(0,0,0,.12);border-radius:18px 18px 0 0;padding-bottom:env(safe-area-inset-bottom,0px)}
    body.ard-open #player{right:0;bottom:50vh} body.ard-open main,body.ard-open header.top .wrap{margin-right:auto}
  }
  .ard-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--line)}
  .ard-head b{font:800 19px var(--f-display)}
  .ard-head .sub{color:var(--muted);font-size:13px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ard-ib{border:1px solid var(--line);background:var(--bg);border-radius:10px;height:34px;min-width:34px;padding:0 10px;cursor:pointer;font:700 13px var(--f-body);color:var(--ink)}
  .ard-ib:hover{border-color:var(--accent)}
  .ard-body{flex:1;overflow-y:auto;padding:10px 12px 16px;display:grid;gap:8px;align-content:start}
  .ard-help{background:var(--accent-soft);border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.5}
  .ard-help ul{margin:6px 0 0;padding-left:18px}
  .ard-help code{cursor:pointer;background:var(--surface);border-radius:6px;padding:1px 6px;border:1px solid var(--line)}
  .ard-line{border:1px solid var(--line);border-radius:14px;background:var(--bg);padding:8px 10px;display:grid;gap:6px}
  .ard-line.focus{border-color:var(--accent)}
  .ard-row{display:flex;gap:8px;align-items:center}
  .ard-n{font:600 12px var(--f-mono);color:var(--muted);min-width:18px}
  .ard-in{flex:1;min-width:0;border:0;background:transparent;font:500 17px var(--f-mono);color:var(--ink);padding:4px 0;outline:none}
  .ard-del{border:0;background:none;color:var(--muted);cursor:pointer;font-size:18px;line-height:1;padding:2px 4px}
  .ard-out{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:baseline;font-size:16px;overflow-x:auto}
  .ard-out .tex{color:var(--ink)}
  .ard-out .res{font:700 16px var(--f-mono);color:var(--accent)}
  .ard-out .note{background:none;padding:0;color:var(--ink);font-style:italic}
  .ard-out .err{color:var(--muted);font-size:13px}
  .ard-out .tag{font-size:12px;color:var(--muted);border:1px dashed var(--line);border-radius:8px;padding:1px 6px}
  .ard-out .ok{color:var(--ok);font-weight:700}.ard-out .ko{color:var(--bad);font-weight:700}
  .ard-acts{display:flex;flex-wrap:wrap;gap:6px}
  .ard-chip{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:4px 10px;font:700 13px var(--f-body);color:var(--ink);cursor:pointer}
  .ard-chip:hover{border-color:var(--accent)}
  .ard-chip.main{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
  .ard-form{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:14px}
  .ard-form select,.ard-form input{font:600 15px var(--f-mono);padding:5px 8px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink)}
  .ard-form input{width:7ch}
  .ard-graph svg{width:100%;height:auto;display:block}
  .ard-keys{border-top:1px solid var(--line);padding:8px 10px;display:grid;grid-template-columns:repeat(8,1fr);gap:5px;background:var(--surface)}
  .ard-keys button{height:38px;border-radius:9px;border:1px solid var(--line);background:var(--bg);font:600 15px var(--f-body);color:var(--ink);cursor:pointer;padding:0}
  .ard-keys button:active{background:var(--accent-soft)}
  .ard-keys button.w2{grid-column:span 2}
  .ard-loading{padding:24px;color:var(--muted)}
  .ard-tabwrap{overflow-x:auto;max-width:100%}
  .ard-table{border-collapse:collapse;font:500 15px var(--f-mono);font-variant-numeric:tabular-nums}
  .ard-table th,.ard-table td{border:1px solid var(--line);padding:0;min-width:64px;height:32px}
  .ard-table th{background:var(--accent-soft)}
  .ard-table input{width:100%;min-width:64px;border:0;background:transparent;font:inherit;color:var(--ink);padding:5px 7px;text-align:right;outline:none}
  .ard-table th input{text-align:center;font-weight:700}
  .ard-table input:focus{background:var(--surface);box-shadow:inset 0 0 0 2px var(--accent)}
  .ard-table td.calc{background:color-mix(in srgb,var(--math) 8%,var(--surface));color:var(--math);text-align:right;padding:5px 7px;font-weight:700}
  .ard-table td.ctl,.ard-table th.ctl{min-width:28px;border:0;background:none;text-align:center}
  .ard-table .rm{border:0;background:none;color:var(--muted);cursor:pointer;font-size:15px;padding:2px 6px}
  .ard-table tfoot td{background:var(--bg);text-align:right;padding:5px 7px;font-weight:700;cursor:default}
  .ard-table tfoot td.lab{text-align:left;color:var(--muted);font:700 12px var(--f-body);text-transform:uppercase;letter-spacing:.06em}
  .ard-table tfoot td.send{cursor:pointer;color:var(--accent)}
  .ard-tabnote{font-size:12px;color:var(--muted)}
  `}));

  /* ---------- chargement des bibliothèques (à la première ouverture) ---------- */
  function load(){
    if(loading) return loading;
    loading=Promise.all(LIBS.map(([t,u])=>new Promise((res,rej)=>{
      if(t==='css'){ const l=document.createElement('link'); l.rel='stylesheet'; l.href=u; l.onload=res; l.onerror=res; document.head.append(l); }
      else { const s=document.createElement('script'); s.src=u; s.onload=res; s.onerror=()=>rej(new Error(u)); document.head.append(s); }
    })));
    return loading;
  }

  /* ---------- interprétation d'une ligne ---------- */
  const KNOWN=new Set(['pi','e','i','deg','Infinity','ans']);
  function prep(s){
    return s.replace(/#.*$/,'').replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/π/g,'pi').replace(/√/g,'sqrt')
      .replace(/²/g,'^2').replace(/³/g,'^3').replace(/(\d),(\d)/g,'$1.$2').replace(/\bln\s*\(/g,'log(').replace(/°/g,' deg').replace(/≤/g,'<=').replace(/≥/g,'>=').trim();
  }
  const comment=s=>{ const m=s.match(/#\s*(.*)$/); return m?m[1]:''; };
  function freeSymbols(node,scope){
    const fns=new Set(node.filter(n=>n.isFunctionNode).map(n=>n.fn.name||n.name));
    // une colonne de tableau (liste) n'est « connue » que comme argument d'une fonction : mean(y), sum(x)…
    const inFn=new Set(node.filter(n=>n.isFunctionNode).flatMap(f=>f.args.flatMap(a=>a.filter(s=>s.isSymbolNode).map(s=>s.name))));
    return [...new Set(node.filter(n=>n.isSymbolNode).map(n=>n.name))].filter(n=>!fns.has(n)&&!KNOWN.has(n)&&(!(n in scope)||(Array.isArray(scope[n])&&!inFn.has(n))));
  }
  const looksLikeWords=syms=>syms.some(n=>n.length>2&&!/^[a-zA-Z]\d*$/.test(n));
  function tex(node){ try{ return node.toTex({parenthesis:'keep',implicit:'hide'}).replace(/(\d)\.(\d)/g,'$1{,}$2'); }catch(e){ return ''; } }
  function katexHTML(t){ try{ return window.katex.renderToString(t,{throwOnError:false,displayMode:false}); }catch(e){ return esc(t); } }
  function pretty(node){ return node.toString({implicit:'hide',parenthesis:'auto'}).replace(/(\d) \* ([a-zA-Z(])/g,'$1$2').replace(/ \* /g,' · '); }
  /* fraction exacte si le nombre en est une (dénominateur ≤ 1000) */
  function asFrac(v){
    if(!isFinite(v)||Number.isInteger(v)) return null;
    let h1=1,h0=0,k1=0,k0=1,x=v;
    for(let i=0;i<20;i++){ const a=Math.floor(x); [h1,h0]=[a*h1+h0,h1]; [k1,k0]=[a*k1+k0,k1]; if(k1>1000) return null; if(Math.abs(v-h1/k1)<1e-10) return k1>1?`${h1}/${k1}`.replace('-','−'):null; x=1/(x-a); if(!isFinite(x)) break; }
    return null;
  }
  function fnum(v){
    const M=window.math;
    if(typeof v==='number'){ if(Number.isNaN(v)) return 'indéfini'; if(!isFinite(v)) return v>0?'+∞':'−∞'; const r=Math.abs(v)<1e-13?0:v;
      const s=(Math.abs(r)>=1e9||(Math.abs(r)<1e-5&&r!==0))?r.toExponential(5).replace(/e\+?(-?)(\d+)/,(m,sg,d)=>` · 10^${sg}${d}`):String(+r.toPrecision(12));
      return s.replace('.',',').replace(/-/g,'−'); }
    if(typeof v==='boolean') return v?'vrai':'faux';
    try{ return M.format(v,{precision:10}).replace(/(\d)\.(\d)/g,'$1,$2').replace(/-/g,'−'); }catch(e){ return String(v); }
  }

  function analyse(raw,scope){
    const M=window.math, s=prep(raw), info={raw, cmt:comment(raw)};
    if(!s) return {...info,type:'empty'};
    const eq=s.split(/(?<![<>=!])=(?!=)/);
    try{
      // définition de fonction : f(x) = …
      if(eq.length===2&&/^\s*[a-zA-Z]\w*\s*\(\s*[a-zA-Z]\w*\s*\)\s*$/.test(eq[0])){
        const name=eq[0].trim().match(/^[a-zA-Z]\w*/)[0], v=eq[0].match(/\(\s*([a-zA-Z]\w*)/)[1], body=M.parse(eq[1]);
        M.evaluate(s,scope); return {...info,type:'fdef',name,v,body,tex:`${name}(${v}) = ${tex(body)}`};
      }
      if(eq.length===2){
        const L=M.parse(eq[0]), R=M.parse(eq[1]);
        // affectation : a = 5
        if(L.isSymbolNode&&!freeSymbols(R,scope).length&&!(R.filter(n=>n.isSymbolNode&&n.name===L.name).length)){
          const val=R.evaluate(scope); scope[L.name]=val; return {...info,type:'assign',name:L.name,val,tex:`${tex(L)} = ${tex(R)}`};
        }
        const free=[...new Set([...freeSymbols(L,scope),...freeSymbols(R,scope)])];
        if(looksLikeWords(free)) return {...info,type:'note'};
        if(!free.length){ const a=L.evaluate(scope), b=R.evaluate(scope); const same=typeof a==='number'&&typeof b==='number'?Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(a)):M.equal(a,b);
          return {...info,type:'check',same,a,b,tex:`${tex(L)} = ${tex(R)}`}; }
        const v=free.includes('x')?'x':free[0];
        return {...info,type:'equation',L,R,v,free,tex:`${tex(L)} = ${tex(R)}`};
      }
      if(eq.length>2) return {...info,type:'note'};
      const node=M.parse(s), free=freeSymbols(node,scope);
      if(looksLikeWords(free)) return {...info,type:'note'};
      if(!free.length){ const val=node.evaluate(scope); if(typeof val==='number'||val?.isComplex||val?.isUnit||val?.isFraction||val?.isBigNumber) scope.ans=val; return {...info,type:'value',node,val,tex:tex(node)}; }
      const v=free.includes('x')?'x':free[0];
      return {...info,type:'expr',node,v,free,tex:tex(node)};
    }catch(e){
      return /\s/.test(s)&&/[a-zA-Zàâçéèêëîïôûùüÿœ]{3,}/.test(s) ? {...info,type:'note'} : {...info,type:'error',msg:e.message};
    }
  }

  /* racines numériques de f sur [−100 ; 100] : changements de signe + minima de |f| proches de 0 */
  function roots(f){
    const out=[], N=40000, a=-100, b=100, h=(b-a)/N; let px=a, pv=f(a);
    const push=r=>{ if(isFinite(r)&&!out.some(o=>Math.abs(o-r)<1e-6)) out.push(Math.abs(r)<1e-12?0:r); };
    const bis=(l,r)=>{ let fl=f(l); for(let i=0;i<80;i++){ const m=(l+r)/2, fm=f(m); if(!isFinite(fm)) return NaN; if(fl*fm<=0) r=m; else { l=m; fl=fm; } } return (l+r)/2; };
    let ppv=NaN;
    for(let i=1;i<=N&&out.length<12;i++){
      const x=a+i*h, v=f(x);
      if(isFinite(v)&&isFinite(pv)){
        if(pv===0) push(px); else if(pv*v<0){ const r=bis(px,x); if(isFinite(f(r))&&Math.abs(f(r))<1e-6*Math.max(1,Math.abs(pv),Math.abs(v))) push(r); }
        else if(isFinite(ppv)&&Math.abs(pv)<Math.abs(ppv)&&Math.abs(pv)<=Math.abs(v)&&Math.abs(pv)<1e-3){ // racine double
          let l=px-h, r=x; for(let k=0;k<100;k++){ const m1=l+(r-l)/3, m2=r-(r-l)/3; if(Math.abs(f(m1))<Math.abs(f(m2))) r=m2; else l=m1; }
          const m=(l+r)/2; if(Math.abs(f(m))<1e-9) push(+m.toFixed(9)); }
      }
      ppv=pv; px=x; pv=v;
    }
    return out.sort((p,q)=>p-q);
  }
  const showRoot=r=>{ const fr=asFrac(r), n=fnum(+r.toFixed(10)); return fr?`${fr} ≈ ${n}`:n; };

  /* ---------- graphe ---------- */
  function graphSVG(fns){
    const xs=[]; for(let i=0;i<=400;i++) xs.push(-10+i*0.05);
    const ys=fns.flatMap(f=>xs.map(x=>{ try{ return f(x); }catch(e){ return NaN; } })).filter(isFinite).sort((p,q)=>p-q);
    let lo=ys.length?ys[Math.floor(ys.length*.05)]:-5, hi=ys.length?ys[Math.floor(ys.length*.95)]:5;
    if(hi-lo<2){ lo-=1; hi+=1; } const pad=(hi-lo)*.15; lo=Math.min(lo-pad,-1); hi=Math.max(hi+pad,1);
    const span=hi-lo, step=span>40?10:span>12?5:span>5?2:1;
    const P=plane({x:[-10,10],y:[lo,hi],w:380,h:220,grid:false,lx:5,ly:step});
    const cols=['var(--accent)','var(--other)','var(--code)'];
    fns.forEach((f,i)=>P.fn(x=>{ try{ return f(x); }catch(e){ return NaN; } },{c:cols[i%3],w:2.5,n:400}));
    return P.svg();
  }

  /* ---------- tableaux de données ----------
     Une ligne d'ardoise qui commence par ⊞ contient un tableau en JSON : {cols:[en-têtes], rows:[[cellules]], stats}.
     Un en-tête « nom = formule » est une colonne calculée ligne par ligne. Chaque colonne nommée
     devient une liste utilisable dans les lignes suivantes (mean(y), sum(x), max(x)…). */
  const TAB='⊞';
  const newTable=()=>TAB+JSON.stringify({cols:['x','y'],rows:[['',''],['',''],['','']],stats:false});
  function insertTable(){ const at=Math.min(focusIdx,lines.length-1), i=lines[at]===''?at:at+1; if(lines[at]==='') lines[at]=newTable(); else lines.splice(i,0,newTable()); if(lines[lines.length-1]!=='') lines.push(''); persist(); draw(); document.getElementById(`ard-t-${i}-h-0`)?.focus(); }
  const cellNum=v=>{ const t=String(v).trim().replace(/[\s']/g,'').replace(/,/g,'.').replace(/−/g,'-'); if(t===''||!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t)) return NaN; return Number(t); };
  const ident=s=>/^[a-zA-Z_]\w*$/.test(s);
  function headInfo(h){ const m=String(h).match(/^\s*([a-zA-Z_]\w*)\s*=\s*(.+)$/); return m?{name:m[1],formula:m[2]}:{name:String(h).trim(),formula:null}; }
  /* calcule les colonnes : valeurs (nombres ou NaN) et textes affichés */
  function computeTable(T,scope){
    const M=window.math, heads=T.cols.map(headInfo), vals=T.cols.map(()=>[]), errs={};
    const compiled=heads.map((h,c)=>{ if(!h.formula) return null; try{ return M.compile(prep(h.formula)); }catch(e){ errs[c]='formule illisible'; return null; } });
    T.rows.forEach((row,r)=>{
      const rs=Object.assign({},scope);
      heads.forEach((h,c)=>{
        let v;
        if(h.formula){ try{ v=compiled[c]?compiled[c].evaluate(rs):NaN; if(typeof v!=='number') v=NaN; }catch(e){ v=NaN; if(!errs[c]) errs[c]='variable inconnue : '+(e.message.match(/"(\w+)"/)?.[1]||'?'); } }
        else v=cellNum(row[c]??'');
        vals[c][r]=v; if(ident(h.name)) rs[h.name]=v;
      });
    });
    heads.forEach((h,c)=>{ if(ident(h.name)&&!KNOWN.has(h.name)){ const nums=vals[c].filter(isFinite); if(nums.length) scope[h.name]=nums; } });
    return {heads,vals,errs};
  }
  function regression(xs,ys){ const pts=xs.map((x,k)=>[x,ys[k]]).filter(p=>isFinite(p[0])&&isFinite(p[1])); const n=pts.length; if(n<2) return null;
    const mx=pts.reduce((s,p)=>s+p[0],0)/n, my=pts.reduce((s,p)=>s+p[1],0)/n; let sxy=0,sxx=0,syy=0;
    pts.forEach(([x,y])=>{ sxy+=(x-mx)*(y-my); sxx+=(x-mx)**2; syy+=(y-my)**2; }); if(!sxx) return null;
    const a=sxy/sxx, b=my-a*mx, r=syy?sxy/Math.sqrt(sxx*syy):1; return {a,b,r,n}; }
  function tableGraph(X,series,reg){
    const xs=X.filter(isFinite), ys=series.flatMap(s=>s.v).filter(isFinite); if(!xs.length||!ys.length) return '<div class="ard-tabnote">Il faut au moins un point avec deux nombres.</div>';
    let [x0,x1]=[Math.min(...xs),Math.max(...xs)], [y0,y1]=[Math.min(...ys,0),Math.max(...ys,0)];
    const px=(x1-x0)||1, py=(y1-y0)||1; x0-=px*.08; x1+=px*.08; y0-=py*.1; y1+=py*.12;
    const nice=sp=>{ const p=10**Math.floor(Math.log10(sp/4)); return [1,2,5,10].map(k=>k*p).find(k=>sp/k<=6)||p*10; };
    const P=plane({x:[x0,x1],y:[y0,y1],w:380,h:230,grid:false,lx:nice(x1-x0),ly:nice(y1-y0)});
    const cols=['var(--accent)','var(--other)','var(--code)','var(--math)'];
    series.forEach((s,k)=>{ const pts=X.map((x,r)=>[x,s.v[r]]).filter(p=>isFinite(p[0])&&isFinite(p[1])).sort((p,q)=>p[0]-q[0]);
      if(pts.length>1) P.poly(pts,{open:true,c:cols[k%4],w:2,op:.55}); pts.forEach(p=>P.dot(p[0],p[1],{c:cols[k%4],r:5})); });
    if(reg) P.fn(x=>reg.a*x+reg.b,{c:'var(--ink)',w:1.5,dash:true});
    return P.svg()+`<div class="ard-tabnote">${series.map((s,k)=>`<span style="color:${cols[k%4]}">●</span> ${esc(s.name)}`).join(' · ')} en fonction de ${esc(X.name||'x')}</div>`;
  }
  function tableLine(i,raw,scope){
    let T; try{ T=JSON.parse(raw.slice(1)); }catch(e){ T={cols:['x','y'],rows:[['','']],stats:false}; }
    const save=()=>{ lines[i]=TAB+JSON.stringify(T); persist(); };
    const later=()=>{ clearTimeout(draw.t); draw.t=setTimeout(()=>{ const a=document.activeElement, id=a?.id, p=a?.selectionStart; draw(); const n=id&&document.getElementById(id); if(n){ n.focus(); try{ n.setSelectionRange(p,p); }catch(e){} } },400); };
    const C=computeTable(T,scope);
    const el=$(`<div class="ard-line ard-tab"><div class="ard-row"><span class="ard-n">${i+1}</span><b style="flex:1">Tableau</b><button class="ard-del" title="Supprimer le tableau" aria-label="Supprimer le tableau ligne ${i+1}">×</button></div><div class="ard-tabwrap"><table class="ard-table"><thead></thead><tbody></tbody><tfoot></tfoot></table></div><div class="ard-out"></div><div class="ard-acts"></div><div class="ard-extra"></div></div>`);
    el.querySelector('.ard-del').onclick=()=>{ lines.splice(i,1); if(!lines.length||lines[lines.length-1]!=='') lines.push(''); persist(); draw(); };
    const thead=el.querySelector('thead'), tbody=el.querySelector('tbody'), tfoot=el.querySelector('tfoot');
    const hr=document.createElement('tr');
    T.cols.forEach((h,c)=>{ const th=document.createElement('th'); const inp=document.createElement('input'); inp.id=`ard-t-${i}-h-${c}`; inp.value=h; inp.setAttribute('aria-label',`Nom de la colonne ${c+1}`); inp.spellcheck=false; inp.autocomplete='off';
      inp.onfocus=()=>{ focusIdx=i; lastInput=inp; }; inp.oninput=()=>{ T.cols[c]=inp.value; save(); later(); }; th.append(inp); hr.append(th); });
    const thc=document.createElement('th'); thc.className='ctl'; hr.append(thc); thead.append(hr);
    T.rows.forEach((row,r)=>{
      const tr=document.createElement('tr');
      T.cols.forEach((h,c)=>{ const td=document.createElement('td');
        if(C.heads[c].formula){ td.className='calc'; const v=C.vals[c][r]; const anyData=row.some((x,k)=>!C.heads[k].formula&&String(x).trim()!==''); td.textContent=anyData&&isFinite(v)?fnum(v):''; }
        else { const inp=document.createElement('input'); inp.id=`ard-t-${i}-${r}-${c}`; inp.value=row[c]??''; inp.inputMode='decimal'; inp.autocomplete='off'; inp.spellcheck=false; inp.setAttribute('aria-label',`${C.heads[c].name||'colonne '+(c+1)}, ligne ${r+1}`);
          inp.onfocus=()=>{ focusIdx=i; lastInput=inp; };
          inp.oninput=()=>{ T.rows[r][c]=inp.value; save(); later(); };
          inp.onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); if(r===T.rows.length-1){ T.rows.push(T.cols.map(()=>'')); save(); draw(); } document.getElementById(`ard-t-${i}-${r+1}-${c}`)?.focus(); } };
          inp.onpaste=e=>{ const t=(e.clipboardData||window.clipboardData)?.getData('text')||''; if(!/[\t\n]/.test(t)) return; e.preventDefault();
            const grid=t.replace(/\r/g,'').replace(/\n$/,'').split('\n').map(l=>l.split('\t'));
            grid.forEach((line,dr)=>{ while(T.rows.length<=r+dr) T.rows.push(T.cols.map(()=>'')); line.forEach((v,dc)=>{ while(T.cols.length<=c+dc){ T.cols.push('c'+(T.cols.length+1)); T.rows.forEach(rw=>rw.push('')); } T.rows[r+dr][c+dc]=v.trim(); }); });
            save(); draw(); };
          td.append(inp); }
        tr.append(td); });
      const tdc=document.createElement('td'); tdc.className='ctl'; const rm=document.createElement('button'); rm.className='rm'; rm.textContent='×'; rm.title='Supprimer cette ligne'; rm.setAttribute('aria-label',`Supprimer la ligne ${r+1} du tableau`);
      rm.onclick=()=>{ if(T.rows.length>1){ T.rows.splice(r,1); save(); draw(); } }; tdc.append(rm); tr.append(tdc); tbody.append(tr);
    });
    if(T.stats){
      const sendable=!!target();
      [['Somme',a=>a.reduce((s,v)=>s+v,0)],['Moyenne',a=>a.reduce((s,v)=>s+v,0)/a.length]].forEach(([lab,f])=>{
        const tr=document.createElement('tr');
        T.cols.forEach((h,c)=>{ const td=document.createElement('td'); const nums=C.vals[c].filter(isFinite); if(c===0&&!nums.length){ td.className='lab'; td.textContent=lab; }
          else if(nums.length){ const v=f(nums); td.textContent=fnum(+v.toPrecision(10)); if(sendable){ td.className='send'; td.title='Envoyer dans la réponse'; td.onclick=()=>sendToAnswer(v); } }
          tr.append(td); });
        const lab2=document.createElement('td'); lab2.className='lab ctl'; lab2.textContent=T.cols.length&&C.vals[0].some(isFinite)?lab:''; tr.append(lab2); tfoot.append(tr); });
    }
    const out=el.querySelector('.ard-out'), acts=el.querySelector('.ard-acts'), extra=el.querySelector('.ard-extra');
    const exported=C.heads.filter((h,c)=>ident(h.name)&&C.vals[c].some(isFinite)).map(h=>h.name);
    const msgs=Object.entries(C.errs).map(([c,m])=>`<span class="err">Colonne ${esc(C.heads[c].name||+c+1)} : ${esc(m)}</span>`);
    out.innerHTML=msgs.join('')+(exported.length?`<span class="tag">utilisables ensuite : ${exported.map(esc).join(', ')}</span>`:'');
    const chip=(label,fn,main)=>{ const b=$(`<button class="ard-chip${main?' main':''}" type="button">${label}</button>`); b.onclick=fn; acts.append(b); };
    chip('+ Ligne',()=>{ T.rows.push(T.cols.map(()=>'')); save(); draw(); document.getElementById(`ard-t-${i}-${T.rows.length-1}-0`)?.focus(); });
    chip('+ Colonne',()=>{ T.cols.push(['y','z','u','v','w'].find(n=>!T.cols.map(headInfo).some(h=>h.name===n))||'c'+(T.cols.length+1)); T.rows.forEach(r=>r.push('')); save(); draw(); document.getElementById(`ard-t-${i}-h-${T.cols.length-1}`)?.select(); });
    chip('+ Colonne calculée',()=>{ const a=C.heads[0]?.name||'x'; T.cols.push(`z = 2*${ident(a)?a:'x'}`); T.rows.forEach(r=>r.push('')); save(); draw(); const n=document.getElementById(`ard-t-${i}-h-${T.cols.length-1}`); n?.focus(); n?.select(); });
    if(T.cols.length>1&&!C.heads[T.cols.length-1].formula) chip('− Colonne',()=>{ T.cols.pop(); T.rows.forEach(r=>r.pop()); save(); draw(); });
    chip(T.stats?'Masquer somme et moyenne':'Somme et moyenne',()=>{ T.stats=!T.stats; save(); draw(); });
    const numCols=C.heads.map((h,c)=>c).filter(c=>C.vals[c].some(isFinite));
    if(numCols.length>=2){
      const gk=i+':tab'; chip(openGraphs.has(gk)?'Masquer le graphique':'Graphique',()=>{ openGraphs.has(gk)?openGraphs.delete(gk):openGraphs.add(gk); draw(); });
      const rk=i+':reg', X=Object.assign(C.vals[numCols[0]],{name:C.heads[numCols[0]].name}), Yc=numCols[1];
      chip(openGraphs.has(rk)?'Masquer la droite':'Ajuster une droite',()=>{ openGraphs.has(rk)?openGraphs.delete(rk):openGraphs.add(rk); draw(); });
      const reg=openGraphs.has(rk)?regression(X,C.vals[Yc]):null;
      if(openGraphs.has(gk)||reg) extra.innerHTML=`<div class="ard-graph">${tableGraph(X,(reg?[Yc]:numCols.slice(1)).map(c=>({name:C.heads[c].name,v:C.vals[c]})),reg)}</div>`;
      if(reg){ const yn=C.heads[Yc].name||'y', xn=X.name||'x';
        const box=$(`<div class="ard-out"><span class="res">${esc(yn)} ≈ ${fnum(+reg.a.toPrecision(4))}·${esc(xn)} ${reg.b<0?'−':'+'} ${fnum(+Math.abs(reg.b).toPrecision(4))}</span><span class="tag">r = ${fnum(+reg.r.toFixed(4))} · ${reg.n} points</span></div>`);
        const b=$(`<button class="ard-chip" type="button">Utiliser comme fonction</button>`); b.onclick=()=>insertAfter(i,`g(x) = ${+reg.a.toPrecision(6)}*x + ${+reg.b.toPrecision(6)}  # droite ajustée`.replace('+ -','- '));
        box.append(b); extra.append(box); }
    }
    return el;
  }

  /* ---------- rendu ---------- */
  const target=()=>document.querySelector('#card input.cible:not([disabled])');
  function sendToAnswer(val){
    const t=target(); if(!t) return;
    t.value=fnum(typeof val==='number'?+val.toPrecision(12):val).replace(/\s·\s10\^.*/,'');
    t.dispatchEvent(new Event('input',{bubbles:true})); t.focus({preventScroll:false});
    t.animate?.([{boxShadow:'0 0 0 6px var(--accent-soft)'},{boxShadow:'none'}],{duration:700});
    if(matchMedia('(max-width:900px)').matches) close();
  }
  function insertAfter(i,text){ lines.splice(i+1,0,text); if(lines[lines.length-1]!=='') lines.push(''); persist(); draw(i+1); }

  function draw(focusAt){
    if(!panel) return;
    const body=panel.querySelector('.ard-body'), M=window.math; body.innerHTML='';
    if(lines.length===1&&!lines[0]) body.append(helpBox());
    const scope={};
    lines.forEach((raw,i)=>{
      if(raw.startsWith(TAB)){ body.append(tableLine(i,raw,scope)); return; }
      const A=analyse(raw,scope);
      const el=$(`<div class="ard-line"><div class="ard-row"><span class="ard-n">${i+1}</span><input class="ard-in" id="ard-in-${i}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Ligne ${i+1} de l’ardoise"><button class="ard-del" title="Supprimer la ligne" aria-label="Supprimer la ligne ${i+1}">×</button></div><div class="ard-out"></div><div class="ard-acts"></div><div class="ard-extra"></div></div>`);
      const inp=el.querySelector('input'), out=el.querySelector('.ard-out'), acts=el.querySelector('.ard-acts'), extra=el.querySelector('.ard-extra');
      inp.value=raw; if(i===lines.length-1&&!raw) inp.placeholder='Écris un calcul, une équation ou une phrase…';
      inp.onfocus=()=>{ focusIdx=i; lastInput=inp; body.querySelectorAll('.ard-line').forEach(x=>x.classList.remove('focus')); el.classList.add('focus'); };
      inp.oninput=()=>{ lines[i]=inp.value; if(i===lines.length-1&&inp.value) lines.push(''); persist(); clearTimeout(draw.t); draw.t=setTimeout(()=>{ const p=inp.selectionStart; draw(i); const ni=document.getElementById('ard-in-'+i); if(ni){ ni.setSelectionRange(p,p); } },350); };
      inp.onkeydown=e=>{
        if(e.key==='Enter'){ e.preventDefault(); if(/^\s*tableau\s*$/i.test(inp.value)){ lines[i]=newTable(); if(i===lines.length-1) lines.push(''); persist(); draw(); document.getElementById(`ard-t-${i}-h-0`)?.focus(); return; } if(i===lines.length-1) lines.push(''); draw(i+1); }
        else if(e.key==='ArrowUp'&&i>0){ e.preventDefault(); document.getElementById('ard-in-'+(i-1))?.focus(); }
        else if(e.key==='ArrowDown'){ e.preventDefault(); document.getElementById('ard-in-'+(i+1))?.focus(); }
        else if(e.key==='Backspace'&&!inp.value&&lines.length>1){ e.preventDefault(); lines.splice(i,1); persist(); draw(Math.max(0,i-1)); }
      };
      el.querySelector('.ard-del').onclick=()=>{ lines.splice(i,1); if(!lines.length||lines[lines.length-1]!=='') lines.push(''); persist(); draw(Math.min(i,lines.length-1)); };
      const chip=(label,fn,main)=>{ const b=$(`<button class="ard-chip${main?' main':''}" type="button">${label}</button>`); b.onclick=fn; acts.append(b); };
      const cmt=A.cmt?`<span class="tag">${esc(A.cmt)}</span>`:'';
      const graphToggle=fns=>chip(openGraphs.has(i)?'Masquer le graphe':'Tracer',()=>{ openGraphs.has(i)?openGraphs.delete(i):openGraphs.add(i); draw(i); });
      try{
      switch(A.type){
        case 'empty': break;
        case 'note': out.innerHTML=`<span class="note">${esc(raw.replace(/#.*$/,''))}</span>${cmt}`; break;
        case 'error': out.innerHTML=`<span class="err">Pas encore lisible. Vérifie les parenthèses et les opérations (exemple : 2*(x+1)/3).</span>`; break;
        case 'value': {
          const v=A.val, fr=typeof v==='number'?asFrac(v):null;
          out.innerHTML=`<span class="tex">${katexHTML(A.tex)}</span><span class="res">= ${fr?fr+' ≈ ':''}${fnum(v)}</span>${cmt}`;
          if(typeof v==='number'&&target()) chip('→ Réponse',()=>sendToAnswer(v),true);
          break; }
        case 'assign': out.innerHTML=`<span class="tex">${katexHTML(A.tex)}</span><span class="res">${esc(A.name)} = ${fnum(A.val)}</span><span class="tag">mémorisé</span>${cmt}`;
          if(typeof A.val==='number'&&target()) chip('→ Réponse',()=>sendToAnswer(A.val),true); break;
        case 'check': out.innerHTML=`<span class="tex">${katexHTML(A.tex)}</span>${A.same?'<span class="ok">✓ vrai</span>':`<span class="ko">✗ faux</span><span class="err">(${fnum(A.a)} ≠ ${fnum(A.b)})</span>`}${cmt}`; break;
        case 'fdef': {
          out.innerHTML=`<span class="tex">${katexHTML(A.tex)}</span><span class="tag">fonction mémorisée</span>${cmt}`;
          chip(`Dériver`,()=>{ const d=M.derivative(A.body,A.v); insertAfter(i,`${A.name}'(${A.v}) = ${pretty(M.simplify(d))}  # dérivée de ${A.name}`.replace(`${A.name}'(`,`d${A.name}(`)); });
          graphToggle();
          if(openGraphs.has(i)){ const c=A.body.compile(); extra.innerHTML=`<div class="ard-graph">${graphSVG([x=>c.evaluate({...scope,[A.v]:x})])}</div>`; }
          break; }
        case 'expr': {
          let simp=''; try{ simp=pretty(M.simplify(A.node)); }catch(e){}
          out.innerHTML=`<span class="tex">${katexHTML(A.tex)}</span>${simp&&simp.replace(/\s/g,'')!==prep(raw).replace(/\s/g,'')?`<span class="res">= ${esc(simp)}</span>`:''}${cmt}`;
          chip('Simplifier',()=>insertAfter(i,`${pretty(M.simplify(A.node))}  # simplifié`));
          chip('Développer',()=>{ let r; try{ r=pretty(M.rationalize(A.node)); }catch(e){ r=pretty(M.simplify(A.node)); } insertAfter(i,`${r}  # développé`); });
          chip(`Dériver (${A.v})`,()=>insertAfter(i,`${pretty(M.simplify(M.derivative(A.node,A.v)))}  # dérivée par rapport à ${A.v}`));
          if(A.free.length===1){ graphToggle(); if(openGraphs.has(i)){ const c=A.node.compile(); extra.innerHTML=`<div class="ard-graph">${graphSVG([x=>c.evaluate({...scope,[A.v]:x})])}</div>`; } }
          break; }
        case 'equation': {
          out.innerHTML=`<span class="tex">${katexHTML(A.tex)}</span><span class="tag">équation en ${esc(A.v)}</span>${cmt}`;
          const one=A.free.length===1, cl=A.L.compile(), cr=A.R.compile(), f=x=>{ const sc={...scope,[A.v]:x}; return cl.evaluate(sc)-cr.evaluate(sc); };
          if(one) chip('Résoudre',()=>{ const rs=roots(f); extra.innerHTML=`<div class="ard-out">${rs.length?rs.map(r=>`<span class="res">${esc(A.v)} = ${showRoot(r)}</span>`).join('')+(target()&&rs.length===1?'':''):'<span class="err">Aucune solution réelle trouvée entre −100 et 100.</span>'}</div>`;
            if(rs.length&&target()){ const row=$(`<div class="ard-acts"></div>`); rs.slice(0,4).forEach(r=>{ const b=$(`<button class="ard-chip main">→ ${fnum(+r.toFixed(10))}</button>`); b.onclick=()=>sendToAnswer(r); row.append(b); }); extra.append(row); } },true);
          chip('Des deux côtés…',()=>{
            extra.innerHTML=''; const fm=$(`<form class="ard-form"><span>Faire</span><select aria-label="Opération"><option value="+">+</option><option value="-">−</option><option value="*">×</option><option value="/">÷</option></select><input aria-label="Valeur" placeholder="3"><span>des deux côtés</span><button class="ard-chip main" type="submit">Appliquer</button></form>`);
            fm.onsubmit=e=>{ e.preventDefault(); const op=fm.querySelector('select').value, k=prep(fm.querySelector('input').value); if(!k) return;
              try{ const nl=pretty(M.simplify(`(${A.L.toString()}) ${op} (${k})`)), nr=pretty(M.simplify(`(${A.R.toString()}) ${op} (${k})`));
                const sym={'+':'+','-':'−','*':'×','/':'÷'}[op]; insertAfter(i,`${nl} = ${nr}  # ${sym} ${fm.querySelector('input').value} des deux côtés`); }
              catch(err){ fm.querySelector('input').setCustomValidity('Valeur illisible'); fm.querySelector('input').reportValidity(); } };
            extra.append(fm); fm.querySelector('input').focus(); });
          if(one){ graphToggle(); if(openGraphs.has(i)) extra.innerHTML=`<div class="ard-graph">${graphSVG([x=>cl.evaluate({...scope,[A.v]:x}),x=>cr.evaluate({...scope,[A.v]:x})])}</div>`; }
          break; }
      }
      }catch(e){ out.innerHTML=`<span class="err">Calcul impossible : ${esc(e.message)}</span>`; }
      body.append(el);
    });
    const fi=Math.min(focusAt??focusIdx,lines.length-1); const f=document.getElementById('ard-in-'+fi); if(f&&focusAt!==undefined) f.focus({preventScroll:false});
  }

  function helpBox(){
    const h=$(`<div class="ard-help"><b>Ton brouillon, sans papier.</b> Écris ligne par ligne, comme sur une feuille :
      <ul>
        <li>un calcul : <code>12 × 3,5 + 7</code> ou <code>sqrt(2)/2</code></li>
        <li>une valeur à retenir : <code>a = 7</code>, puis <code>a² + 1</code></li>
        <li>une équation : <code>2x + 3 = 11</code>, puis « Résoudre » ou « Des deux côtés… »</li>
        <li>une fonction : <code>f(x) = x^2 − 4x</code>, puis « Tracer » ou « Dériver »</li>
        <li>une phrase pour ton raisonnement : <code>donc le triangle est rectangle</code></li>
        <li>un tableau de données : bouton « ⊞ Tableau » ou <code>tableau</code>. Un en-tête comme <i>y = 2x + 1</i> calcule la colonne, et chaque colonne se réutilise ensuite : <i>mean(y)</i>, <i>sum(x)</i>.</li>
      </ul>
      Les touches du bas tapent les symboles. « → Réponse » envoie un résultat dans la case de l’exercice.</div>`);
    h.querySelectorAll('code').forEach(c=>c.onclick=()=>{ lines[lines.length-1]=c.textContent; lines.push(''); persist(); draw(lines.length-2); });
    return h;
  }

  /* ---------- clavier de symboles ---------- */
  const KEYS=[['x','x'],['y','y'],['(',')','()'],['^','^'],['x²','^2'],['√','sqrt()',-1],['π','pi'],['/','/'],
              ['×','*'],['=','='],['sin','sin()',-1],['cos','cos()',-1],['tan','tan()',-1],['ln','ln()',-1],['eˣ','e^'],['|x|','abs()',-1],
              ['°','°'],['←',null,'L'],['→',null,'R'],['⌫',null,'B'],['Texte','# ',0,'w2'],['Ligne ↵',null,'N','w2']];
  function keypad(){
    const k=$(`<div class="ard-keys" role="group" aria-label="Symboles mathématiques"></div>`);
    KEYS.forEach(([label,ins,mv,cls])=>{
      const b=$(`<button type="button" class="${typeof cls==='string'?cls:''}">${label}</button>`);
      if(label==='(') { ins='()'; mv=-1; }
      b.onmousedown=e=>e.preventDefault();
      b.onclick=()=>{
        const inp=(lastInput&&panel.contains(lastInput))?lastInput:(document.getElementById('ard-in-'+focusIdx)||document.getElementById('ard-in-'+(lines.length-1))); if(!inp) return;
        inp.focus(); const s=inp.selectionStart??inp.value.length, en=inp.selectionEnd??s;
        if(mv==='N'){ if(focusIdx===lines.length-1) lines.push(''); draw(focusIdx+1); return; }
        if(mv==='L'){ inp.setSelectionRange(Math.max(0,s-1),Math.max(0,s-1)); return; }
        if(mv==='R'){ inp.setSelectionRange(s+1,s+1); return; }
        if(mv==='B'){ if(s===en&&s>0){ inp.value=inp.value.slice(0,s-1)+inp.value.slice(en); inp.setSelectionRange(s-1,s-1); } else { inp.value=inp.value.slice(0,s)+inp.value.slice(en); inp.setSelectionRange(s,s); } inp.dispatchEvent(new Event('input')); return; }
        inp.value=inp.value.slice(0,s)+ins+inp.value.slice(en); const p=s+ins.length+(typeof mv==='number'?mv:0); inp.setSelectionRange(p,p); inp.dispatchEvent(new Event('input'));
      };
      k.append(b);
    });
    return k;
  }

  /* ---------- panneau ---------- */
  function persist(){ const keep=lines.filter((l,i)=>l||i<lines.length-1); if(keep.length) S.ardoise[key]=keep; else delete S.ardoise[key]; clearTimeout(saveT); saveT=setTimeout(save,600); }
  function loadLines(){ lines=[...(S.ardoise[key]||[])]; if(lines[lines.length-1]!=='') lines.push(''); openGraphs=new Set(); }
  function subtitle(){ return key==='_libre'?'Ardoise libre':`Pour : ${LESSONS[key]?.title||''}`; }
  async function open(){
    if(!panel){
      panel=$(`<aside class="ard" id="ardoise" aria-label="Ardoise de calcul" hidden><div class="ard-head"><b>Ardoise</b><span class="sub"></span>
        <button class="ard-ib" id="ard-table" title="Insérer un tableau de données">⊞ Tableau</button><button class="ard-ib" id="ard-help" title="Aide">?</button><button class="ard-ib" id="ard-clear" title="Effacer l’ardoise">Effacer</button><button class="ard-ib" id="ard-close" aria-label="Fermer l’ardoise">×</button></div>
        <div class="ard-body"><div class="ard-loading">Préparation de l’ardoise…</div></div></aside>`);
      panel.append(keypad()); document.body.append(panel);
      panel.querySelector('#ard-close').onclick=close;
      panel.querySelector('#ard-table').onclick=()=>insertTable();
      panel.querySelector('#ard-help').onclick=()=>{ const b=panel.querySelector('.ard-body'); const ex=b.querySelector('.ard-help'); if(ex) ex.remove(); else b.prepend(helpBox()); };
      const clr=panel.querySelector('#ard-clear');
      clr.onclick=()=>{ if(clr.dataset.sure){ lines=['']; persist(); draw(0); clr.textContent='Effacer'; delete clr.dataset.sure; } else { clr.textContent='Sûr ?'; clr.dataset.sure=1; setTimeout(()=>{ clr.textContent='Effacer'; delete clr.dataset.sure; },2500); } };
      panel.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    }
    panel.hidden=false; document.body.classList.add('ard-open'); panel.querySelector('.sub').textContent=subtitle();
    try{ await load(); }catch(e){ panel.querySelector('.ard-body').innerHTML='<div class="ard-loading">Impossible de charger l’ardoise. Vérifie ta connexion puis réessaie.</div>'; loading=null; return; }
    loadLines(); draw(lines.length-1);
  }
  function close(){ if(panel){ panel.hidden=true; } document.body.classList.remove('ard-open'); }
  function toggle(){ isOpen()?close():open(); }
  function onLesson(id){ key=id||'_libre'; if(isOpen()){ panel.querySelector('.sub').textContent=subtitle(); loadLines(); draw(lines.length-1); } }

  document.getElementById('ardoise-open').onclick=toggle;
  document.getElementById('ardoise-btn').onclick=toggle;
  return {open, close, toggle, onLesson};
})();
