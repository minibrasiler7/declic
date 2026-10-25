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
  let loading=null, panel=null, key='_libre', lines=[''], focusIdx=0, saveT=null, openGraphs=new Set();
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
    return [...new Set(node.filter(n=>n.isSymbolNode).map(n=>n.name))].filter(n=>!fns.has(n)&&!KNOWN.has(n)&&!(n in scope));
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
      const A=analyse(raw,scope);
      const el=$(`<div class="ard-line"><div class="ard-row"><span class="ard-n">${i+1}</span><input class="ard-in" id="ard-in-${i}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Ligne ${i+1} de l’ardoise"><button class="ard-del" title="Supprimer la ligne" aria-label="Supprimer la ligne ${i+1}">×</button></div><div class="ard-out"></div><div class="ard-acts"></div><div class="ard-extra"></div></div>`);
      const inp=el.querySelector('input'), out=el.querySelector('.ard-out'), acts=el.querySelector('.ard-acts'), extra=el.querySelector('.ard-extra');
      inp.value=raw; if(i===lines.length-1&&!raw) inp.placeholder='Écris un calcul, une équation ou une phrase…';
      inp.onfocus=()=>{ focusIdx=i; body.querySelectorAll('.ard-line').forEach(x=>x.classList.remove('focus')); el.classList.add('focus'); };
      inp.oninput=()=>{ lines[i]=inp.value; if(i===lines.length-1&&inp.value) lines.push(''); persist(); clearTimeout(draw.t); draw.t=setTimeout(()=>{ const p=inp.selectionStart; draw(i); const ni=document.getElementById('ard-in-'+i); if(ni){ ni.setSelectionRange(p,p); } },350); };
      inp.onkeydown=e=>{
        if(e.key==='Enter'){ e.preventDefault(); if(i===lines.length-1) lines.push(''); draw(i+1); }
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
        const inp=document.getElementById('ard-in-'+focusIdx)||document.getElementById('ard-in-'+(lines.length-1)); if(!inp) return;
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
        <button class="ard-ib" id="ard-help" title="Aide">?</button><button class="ard-ib" id="ard-clear" title="Effacer l’ardoise">Effacer</button><button class="ard-ib" id="ard-close" aria-label="Fermer l’ardoise">×</button></div>
        <div class="ard-body"><div class="ard-loading">Préparation de l’ardoise…</div></div></aside>`);
      panel.append(keypad()); document.body.append(panel);
      panel.querySelector('#ard-close').onclick=close;
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
