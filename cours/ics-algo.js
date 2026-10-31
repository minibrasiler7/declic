/* Déclic — Informatique, Algorithmique */
(()=>{
/* ---------- petits outils SVG ---------- */
const SV=(h,s)=>`<svg viewBox="0 0 320 ${h}" width="320" role="img">${s}</svg>`;
const TX=(x,y,s,o={})=>`<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" font-size="${o.s||13}" font-weight="${o.w||700}" text-anchor="${o.a||'middle'}" fill="${o.c||'var(--ink)'}">${s}</text>`;
const RC=(x,y,w,h,o={})=>`<rect x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" width="${(+w).toFixed(1)}" height="${(+h).toFixed(1)}" rx="${o.rx??5}" fill="${o.f||'var(--surface)'}" fill-opacity="${o.fo??1}" stroke="${o.c||'var(--ink)'}" stroke-width="${o.sw??1.5}"/>`;
const LN=(x1,y1,x2,y2,o={})=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.c||'var(--muted)'}" stroke-width="${o.w??2}" ${o.dash?'stroke-dasharray="6 5"':''} opacity="${o.op??1}" stroke-linecap="round"/>`;
const sq=c=>`<span style="color:${c}">■</span>`;
const legend=l=>l.map(([c,s])=>`${sq(c)} ${s}`).join(' &nbsp; ');
const cc=s=>`<code class="code">${esc(s)}</code>`;
// petit tableau HTML (traces à la main)
const tab=(h,rows)=>`<table style="margin:6px auto;border-collapse:collapse;text-align:center"><tr>${h.map(x=>`<th style="padding:2px 9px;border-bottom:1px solid var(--line)">${x}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td style="padding:2px 9px">${x}</td>`).join('')}</tr>`).join('')}</table>`;

/* Barres : a = tableau ; o.cmp (indices comparés), o.done (placés), o.key (indice spécial), o.dim(i), o.lab {i:'g'} */
function bars(a,o={}){ const n=a.length, mx=Math.max(...a), w=300/n; let s='';
  a.forEach((x,i)=>{ const h=Math.round(x/mx*100)+8, X=10+i*w;
    let c='var(--accent)';
    if(o.dim&&o.dim(i)) c='var(--line)';
    if((o.done||[]).includes(i)) c='var(--ok)';
    if(o.key===i) c='var(--other)';
    if((o.cmp||[]).includes(i)) c='var(--spark)';
    s+=RC(X+3,120-h,w-6,h,{f:c,c:'none',rx:4,sw:0})+TX(X+w/2,138,x);
    if(o.lab&&o.lab[i]) s+=TX(X+w/2,158,o.lab[i],{c:'var(--muted)',s:12}); });
  return SV(o.lab?165:146,s); }

/* Graphe : N {A:[x,y]}, E [[u,v,w]], o.nc(k) couleur, o.ec(u,v) style, o.sub(k) texte sous le sommet */
function graph(N,E,o={},H=210){ let s='';
  E.forEach(([u,v,w])=>{ const [x1,y1]=N[u],[x2,y2]=N[v], st=(o.ec&&o.ec(u,v))||{};
    s+=LN(x1,y1,x2,y2,{c:st.c||'var(--muted)',w:st.w||2,dash:st.dash,op:st.op??(o.ec?.7:1)});
    if(w!==undefined){ const mx=(x1+x2)/2, my=(y1+y2)/2; s+=`<circle cx="${mx}" cy="${my}" r="10" fill="var(--surface)"/>`+TX(mx,my+4,w,{s:12,c:'var(--muted)'}); } });
  Object.entries(N).forEach(([k,[x,y]])=>{ const c=(o.nc&&o.nc(k))||null;
    s+=`<circle cx="${x}" cy="${y}" r="15" fill="${c||'var(--surface)'}" fill-opacity="${c?.35:1}" stroke="${c||'var(--ink)'}" stroke-width="2.5"/>`+TX(x,y+5,k,{s:14});
    if(o.sub){ const t=o.sub(k); if(t!=='') s+=TX(x,y<100?y-22:y+31,t,{s:12,c:'var(--code)'}); } });
  return SV(H,s); }

/* ---------- chapitre 1 : traces ---------- */
function euclideTrace(a,b){ const t=[[a,b]]; while(b!==0){ [a,b]=[b,a%b]; t.push([a,b]); } return t; }
const EU=euclideTrace(252,105);
const nbTours=(a,b)=>euclideTrace(a,b).length-1;
function euclideFig(t,k){ const a0=t[0][0]; let s='';
  const [a,b]=t[k], sc=290/a0;
  s+=TX(8,22,'a',{a:'start',c:'var(--muted)'})+RC(22,8,Math.max(a*sc,2),20,{f:'var(--accent)',c:'none',sw:0})+TX(26+a*sc,23,a,{a:'start'});
  s+=TX(8,52,'b',{a:'start',c:'var(--muted)'})+RC(22,38,Math.max(b*sc,2),20,{f:'var(--spark)',c:'none',sw:0})+TX(26+b*sc,53,b,{a:'start'});
  t.slice(0,k+1).forEach(([x,y],i)=>{ s+=TX(20,86+i*20,`${i===0?'départ':'après le tour '+i} : (a, b) = (${x}, ${y})`,{a:'start',w:i===k?700:400,c:i===k?'var(--ink)':'var(--muted)'}); });
  return SV(92+20*(t.length-1),s); }

/* ---------- chapitre 2 ---------- */
function pairsGrid(n){ const c=Math.min(24,Math.floor(280/n)), x0=(320-c*n)/2; let s='';
  for(let i=0;i<n;i++) for(let j=0;j<n;j++){ const on=j<i;
    s+=RC(x0+j*c,10+i*c,c-2,c-2,{f:on?'var(--accent)':'var(--surface)',c:on?'none':'var(--line)',sw:1,rx:3}); }
  s+=TX(x0-6,10+c/2+4,'i = 0',{a:'end',s:11,c:'var(--muted)'})+TX(x0+c/2,c*n+28,'j = 0',{s:11,c:'var(--muted)'});
  return SV(c*n+34,s); }

/* ---------- chapitre 3 ---------- */
const FACT=(()=>{ const st=[]; for(let k=0;k<=4;k++) st.push({fr:Array.from({length:k+1},(_,i)=>({n:4-i})),msg:`appel de fact(${4-k})`});
  let val=1; for(let n=0;n<=4;n++){ val=n===0?1:val*n; const fr=Array.from({length:5-n},(_,i)=>({n:4-i})); fr[fr.length-1].ret=val;
    st.push({fr,msg:`fact(${n}) renvoie ${val}`}); }
  return st; })();
function stackFig(s){ let o=''; s.fr.forEach((f,i)=>{ const y=170-(i+1)*32, top=i===s.fr.length-1;
    o+=RC(60,y,200,28,{f:f.ret!==undefined?'var(--ok)':top?'var(--spark)':'var(--accent)',fo:.3,c:top?'var(--ink)':'var(--muted)'});
    o+=TX(160,y+19,f.ret!==undefined?`fact(${f.n}) → renvoie ${f.ret}`:f.n===0?'fact(0) : cas de base':`fact(${f.n}) attend ${f.n} × fact(${f.n-1})`,{s:12}); });
  o+=LN(50,172,270,172,{c:'var(--ink)',w:2})+TX(160,188,'bas de la pile',{s:11,c:'var(--muted)'});
  return SV(194,o); }
function fibTree(n){ let leaf=0; const N=[], L=[];
  const build=(k,d)=>{ let x, kids=[]; if(k<2) x=leaf++; else { kids=[build(k-1,d+1),build(k-2,d+1)]; x=(kids[0].x+kids[1].x)/2; }
    const nd={k,d,x}; N.push(nd); kids.forEach(c=>L.push([nd,c])); return nd; };
  build(n,0); const nl=leaf, dx=nl>1?290/(nl-1):0, X=x=>nl>1?15+x*dx:160, Y=d=>18+d*34, md=Math.max(...N.map(q=>q.d));
  let s=''; L.forEach(([p,c])=>{ s+=LN(X(p.x),Y(p.d),X(c.x),Y(c.d),{c:'var(--line)'}); });
  N.forEach(q=>{ const c=q.k<2?'var(--ok)':q.k===2?'var(--spark)':'var(--accent)';
    s+=`<circle cx="${X(q.x).toFixed(1)}" cy="${Y(q.d)}" r="10" fill="${c}" fill-opacity=".35" stroke="${c}" stroke-width="2"/>`+TX(X(q.x),Y(q.d)+4,q.k,{s:11}); });
  return {svg:SV(Y(md)+16,s), calls:N.length, f2:N.filter(q=>q.k===2).length}; }
const FIB=[]; for(let n=1;n<=6;n++) FIB[n]=fibTree(n);
const fibv=n=>{ let a=0,b=1; for(let i=0;i<n;i++) [a,b]=[b,a+b]; return a; };

/* ---------- chapitre 4 ---------- */
const LD=[2,5,8,12,16,23,38,45,56,67,72,81,90,94,99];
const CIBLES=[...LD,50];
function dichoTrace(L,x){ let g=0,d=L.length-1; const st=[{g,d,m:null,msg:`Départ : g = 0, d = ${d}`}];
  while(g<=d){ const m=Math.floor((g+d)/2);
    if(L[m]===x){ st.push({g,d,m,found:true,msg:`m = ${m}, L[m] = ${L[m]} = x : trouvé, on renvoie ${m}`}); return st; }
    if(L[m]<x){ st.push({g,d,m,msg:`m = ${m}, L[m] = ${L[m]} &lt; ${x} : on garde la droite, g = ${m+1}`}); g=m+1; }
    else { st.push({g,d,m,msg:`m = ${m}, L[m] = ${L[m]} &gt; ${x} : on garde la gauche, d = ${m-1}`}); d=m-1; } }
  st.push({g,d,m:null,msg:`g = ${g} &gt; d = ${d} : zone vide, ${x} est absent, on renvoie −1`}); return st; }
const DT=CIBLES.map(x=>dichoTrace(LD,x));
const DTMAX=Math.max(...DT.map(t=>t.length))-1;
const toursD=t=>t.filter(s=>s.m!==null).length;
function dichoFig(t,k){ const s=t[Math.min(k,t.length-1)], lab={};
  const add=(i,l)=>{ if(i>=0&&i<LD.length) lab[i]=(lab[i]?lab[i]+' ':'')+l; };
  if(s.g<=s.d||s.m!==null){ add(s.g,'g'); add(s.d,'d'); } if(s.m!==null) add(s.m,'m');
  return bars(LD,{dim:i=>i<s.g||i>s.d,cmp:s.m!==null&&!s.found?[s.m]:[],done:s.found?[s.m]:[],lab}); }

/* ---------- chapitre 5 : traces des tris ---------- */
const A0=[5,2,9,1,6,3,8,4];
const rng=(a,b)=>{ const r=[]; for(let i=a;i<b;i++) r.push(i); return r; };
const TINS=(()=>{ const a=A0.slice(), n=a.length, st=[{a:a.slice(),msg:'Liste de départ. Le préfixe [5] est trié.',done:[0]}];
  for(let i=1;i<n;i++){ let j=i;
    while(j>0){ const sw=a[j-1]>a[j];
      st.push({a:a.slice(),cmp:[j-1,j],done:rng(0,i+1).filter(k=>k!==j-1&&k!==j),msg:`i = ${i} : on compare ${a[j-1]} et ${a[j]}${sw?', on échange':', c’est en ordre, on s’arrête'}`});
      if(!sw) break; [a[j-1],a[j]]=[a[j],a[j-1]]; j--; } }
  st.push({a:a.slice(),done:rng(0,n),msg:'Liste triée.'}); return st; })();
const TBUB=(()=>{ const a=A0.slice(), n=a.length, st=[{a:a.slice(),msg:'Liste de départ.'}];
  for(let i=0;i<n-1;i++) for(let j=0;j<n-1-i;j++){ const sw=a[j]>a[j+1];
    st.push({a:a.slice(),cmp:[j,j+1],done:rng(n-i,n),msg:`passe ${i+1} : ${a[j]} et ${a[j+1]}${sw?' : on échange':' : en ordre'}`});
    if(sw) [a[j],a[j+1]]=[a[j+1],a[j]]; }
  st.push({a:a.slice(),done:rng(0,n),msg:'Liste triée.'}); return st; })();
const TSEL=(()=>{ const a=A0.slice(), n=a.length, st=[{a:a.slice(),msg:'Liste de départ.'}];
  for(let i=0;i<n-1;i++){ let m=i;
    for(let j=i+1;j<n;j++){ st.push({a:a.slice(),cmp:[j],key:m,done:rng(0,i),msg:`i = ${i} : minimum provisoire ${a[m]}, on regarde ${a[j]}`}); if(a[j]<a[m]) m=j; }
    st.push({a:a.slice(),cmp:[i],key:m,done:rng(0,i),msg:m!==i?`minimum ${a[m]} : on l’échange avec ${a[i]} (case ${i})`:`minimum ${a[m]} déjà en case ${i} : rien à échanger`});
    [a[i],a[m]]=[a[m],a[i]]; }
  st.push({a:a.slice(),done:rng(0,n),msg:'Liste triée.'}); return st; })();
const sortStep=(T,k)=>{ const s=T[k]; return bars(s.a,{cmp:s.cmp,done:s.done,key:s.key}); };
const sortLeg=legend([['var(--spark)','examiné'],['var(--ok)','trié'],['var(--accent)','autre']]);

/* ---------- chapitre 6 ---------- */
const FA=[1,4,7,9], FB=[2,3,8,10];
const TFUS=(()=>{ let i=0,j=0; const R=[], st=[];
  while(i<FA.length&&j<FB.length){ const pa=FA[i]<=FB[j];
    st.push({i,j,R:R.slice(),msg:pa?`${FA[i]} ≤ ${FB[j]} : on prend ${FA[i]} dans A`:`${FA[i]} &gt; ${FB[j]} : on prend ${FB[j]} dans B`});
    if(pa) R.push(FA[i++]); else R.push(FB[j++]); }
  st.push({i,j,R:R.slice(),msg:i===FA.length?'A est épuisée : on recopie la fin de B':'B est épuisée : on recopie la fin de A'});
  const fin=R.concat(FA.slice(i),FB.slice(j)); st.push({i:FA.length,j:FB.length,R:fin,msg:`Fusion terminée en ${st.length-1} comparaisons.`}); return st; })();
function fusFig(s){ let o=''; const W=34, x0=50;
  const row=(lab,L,y,ptr,c)=>{ o+=TX(20,y+22,lab,{c:'var(--muted)'});
    L.forEach((v,k)=>{ const used=ptr!==null&&k<ptr, cur=k===ptr;
      o+=RC(x0+k*(W+4),y,W,32,{f:cur?'var(--spark)':used?'var(--line)':c,fo:cur?.6:used?.6:.25,c:cur?'var(--ink)':'var(--muted)'})+TX(x0+k*(W+4)+W/2,y+21,v,{c:used?'var(--muted)':'var(--ink)'}); }); };
  row('A',FA,10,s.i,'var(--accent)'); row('B',FB,52,s.j,'var(--math)');
  o+=TX(20,124,'R',{c:'var(--muted)'});
  for(let k=0;k<8;k++){ const v=s.R[k]; o+=RC(x0-14+k*(W+1),102,W-2,32,{f:v===undefined?'var(--surface)':'var(--ok)',fo:.35,c:'var(--muted)'})+(v===undefined?'':TX(x0-14+k*(W+1)+(W-2)/2,123,v)); }
  return SV(142,o); }
const NIV=(()=>{ let a=A0.slice(); const lv=[{a:a.slice(),b:1,c:0}];
  for(let k=1;k<a.length;k*=2){ let out=[], c=0;
    for(let s=0;s<a.length;s+=2*k){ const X=a.slice(s,s+k), Y=a.slice(s+k,s+2*k); let i=0,j=0;
      while(i<X.length&&j<Y.length){ c++; if(X[i]<=Y[j]) out.push(X[i++]); else out.push(Y[j++]); }
      out=out.concat(X.slice(i),Y.slice(j)); }
    a=out; lv.push({a:a.slice(),b:2*k,c}); }
  return lv; })();
function nivFig(k){ let o=''; const W=26;
  for(let r=0;r<=k;r++){ const L=NIV[r], y=10+r*42; let x=10;
    L.a.forEach((v,i)=>{ if(i>0&&i%L.b===0) x+=6; o+=RC(x,y,W,30,{f:r===k?'var(--accent)':'var(--line)',fo:r===k?.3:.5,c:'var(--muted)'})+TX(x+W/2,y+20,v); x+=W+3; });
    o+=TX(314,y+20,`×${L.b}`,{a:'end',s:11,c:'var(--muted)'}); }
  return SV(16+(k+1)*42,o); }

/* ---------- chapitre 7 ---------- */
const GN={A:[30,105],B:[115,45],C:[115,165],D:[205,35],E:[190,105],F:[210,170],G:[290,105]};
const GE=[['A','B'],['A','C'],['B','D'],['B','E'],['C','F'],['E','F'],['D','G'],['F','G']];
const ADJ={}; Object.keys(GN).forEach(k=>ADJ[k]=[]); GE.forEach(([u,v])=>{ ADJ[u].push(v); ADJ[v].push(u); }); Object.values(ADJ).forEach(l=>l.sort());
const same=(u,v,p,q)=>(u===p&&v===q)||(u===q&&v===p);
const TBFS=(()=>{ const vu=new Set(['A']), F=['A'], ord=[], par={}, st=[{ord:[],F:['A'],cur:null,par:{},msg:'On met A dans la file et on le marque.'}];
  while(F.length){ const u=F.shift(); ord.push(u); const nv=[];
    ADJ[u].forEach(v=>{ if(!vu.has(v)){ vu.add(v); F.push(v); par[v]=u; nv.push(v); } });
    st.push({ord:ord.slice(),F:F.slice(),cur:u,par:{...par},msg:`On défile ${u}. ${nv.length?'Nouveaux voisins enfilés : '+nv.join(', ')+'.':'Aucun voisin nouveau.'}`}); }
  return st; })();
const TDFS=(()=>{ const vu=[], par={}, st=[{ord:[],cur:null,path:[],par:{},msg:'Départ en A.'}];
  const rec=u=>{ vu.push(u); const path=[]; let x=u; while(x){ path.unshift(x); x=par[x]; }
    st.push({ord:vu.slice(),cur:u,path,par:{...par},msg:`On visite ${u}. Pile d’appels : ${path.join(' → ')}`});
    ADJ[u].forEach(v=>{ if(!vu.includes(v)){ par[v]=u; rec(v); } }); };
  rec('A'); return st; })();
/* petit graphe des méthodes de parcours */
const HN={'1':[30,100],'2':[115,35],'3':[115,165],'4':[205,35],'5':[205,165],'6':[290,100]};
const HE=[['1','2'],['1','3'],['2','4'],['3','4'],['3','5'],['4','6'],['5','6']];
const treeEdge=par=>(u,v)=>(par[v]===u||par[u]===v)?{c:'var(--accent)',w:4,op:1}:{c:'var(--muted)',w:2,op:.5};

/* ---------- chapitre 8 ---------- */
const WN={A:[30,110],B:[125,45],C:[125,175],D:[225,45],E:[225,175],F:[292,110]};
const WE=[['A','B',4],['A','C',2],['B','C',1],['B','D',5],['C','D',8],['C','E',10],['D','E',2],['D','F',6],['E','F',3]];
const WADJ={}; Object.keys(WN).forEach(k=>WADJ[k]=[]); WE.forEach(([u,v,w])=>{ WADJ[u].push([v,w]); WADJ[v].push([u,w]); });
const TDIJ=(()=>{ const d={}, par={}, fix=[]; Object.keys(WN).forEach(k=>d[k]=Infinity); d.A=0;
  const st=[{d:{...d},fix:[],cur:null,par:{},msg:'d(A) = 0, toutes les autres distances valent ∞.'}];
  while(fix.length<6){ let u=null; Object.keys(WN).forEach(k=>{ if(!fix.includes(k)&&(u===null||d[k]<d[u])) u=k; });
    fix.push(u); const up=[];
    WADJ[u].forEach(([v,w])=>{ if(!fix.includes(v)&&d[u]+w<d[v]){ up.push(`${v} : ${d[v]===Infinity?'∞':d[v]} → ${d[u]+w}`); d[v]=d[u]+w; par[v]=u; } });
    st.push({d:{...d},fix:fix.slice(),cur:u,par:{...par},msg:`On fixe ${u} (d = ${d[u]}). ${up.length?'Mises à jour : '+up.join(', ')+'.':'Aucune mise à jour.'}`}); }
  return st; })();
const KR=(()=>{ const E=WE.slice().sort((a,b)=>a[2]-b[2]), p={}; Object.keys(WN).forEach(k=>p[k]=k);
  const find=x=>{ while(p[x]!==x) x=p[x]; return x; }; const st=[{acc:[],rej:[],cur:null,tot:0,msg:'Arêtes triées par poids croissant : '+E.map(e=>e[0]+e[1]+' ('+e[2]+')').join(', ')}];
  const acc=[], rej=[]; let tot=0;
  E.forEach(e=>{ const ru=find(e[0]), rv=find(e[1]); let msg;
    if(ru!==rv){ p[ru]=rv; acc.push(e); tot+=e[2]; msg=`${e[0]}–${e[1]} (${e[2]}) relie deux morceaux : on la garde.`; }
    else { rej.push(e); msg=`${e[0]}–${e[1]} (${e[2]}) fermerait un cycle : on la rejette.`; }
    st.push({acc:acc.slice(),rej:rej.slice(),cur:e,tot,msg}); });
  return st; })();

/* petit graphe pondéré des méthodes */
const DN={S:[30,100],A:[160,35],B:[160,165],C:[290,100]};
const DE=[['S','A',1],['S','B',4],['A','B',2],['A','C',6],['B','C',3]];

/* ---------- graphes des problèmes ---------- */
const PB7N={S:[30,105],A:[115,45],B:[115,165],C:[205,45],D:[205,165],E:[290,45],T:[290,165]};
const PB7E=[['S','A'],['S','B'],['A','C'],['B','C'],['B','D'],['C','E'],['D','T'],['E','T']];
const PB7CN={'1':[40,45],'2':[130,45],'3':[210,45],'4':[85,120],'5':[285,40],'6':[285,120],'7':[40,180],'8':[140,180],'9':[250,180]};
const PB7CE=[['1','2'],['1','4'],['2','3'],['2','4'],['5','6'],['7','8']];
const PB8E1=[['A','B',7],['A','C',2],['B','C',3],['B','D',1],['C','D',8],['C','E',5],['D','E',2],['D','F',6],['E','F',4]];
const PB8E2=[['A','B',4],['A','C',3],['B','C',2],['B','D',5],['C','D',6],['C','E',4],['D','E',1],['D','F',3],['E','F',6]];

COURS.push(
/* ================= 1. Correction et terminaison ================= */
{subj:'ics', sem:'algo', id:'ics-correction', h:'Correction et terminaison', p:'Prouver qu’une boucle s’arrête et qu’elle calcule bien ce qu’on veut.', steps:[
  {kind:'Théorie',h:'Deux questions pour chaque algorithme',p:`<p>Tu écris une fonction, tu la testes sur trois valeurs, elle donne les bons résultats. Est-elle juste&nbsp;? Rien ne le garantit : la quatrième valeur peut la faire boucler sans fin ou renvoyer n’importe quoi. Pour en être sûr, il faut un raisonnement qui couvre <b>toutes</b> les entrées.</p><div class="def"><p>La <b>spécification</b> d’un algorithme dit quelles entrées sont permises (la <b>précondition</b>, par exemple « <i>n</i> entier ≥ 0 ») et ce qu’il doit renvoyer (la <b>postcondition</b>, ici « la somme 1 + 2 + … + <i>n</i> »). L’algorithme est <b>correct</b> si, pour toute entrée qui respecte la précondition : il <b>termine</b> (il s’arrête après un nombre fini d’étapes) et son résultat respecte la postcondition.</p></div><div class="idea"><p>Ce sont deux questions séparées, avec deux outils. « Est-ce que ça s’arrête&nbsp;? » se règle avec un <b>variant</b> ; « est-ce que le résultat est le bon&nbsp;? » se règle avec un <b>invariant</b>. Les deux étapes suivantes les présentent sur la fonction ci-dessous.</p></div><div class="ex"><p>Trace de <code class="code">somme(4)</code> : (i, s) vaut (0, 0), puis (1, 1), (2, 3), (3, 6), (4, 10). La condition i &lt; 4 devient fausse et on renvoie 10 = 1 + 2 + 3 + 4. Une trace montre ce qui se passe <b>pour une entrée</b> ; elle aide à comprendre, pas à prouver.</p></div>`,
   fig:py(`
def somme(n):
    s, i = 0, 0
    while i < n:
        i = i + 1
        s = s + i
    return s`),
   note:'Tester sur quelques valeurs ne prouve rien : une preuve couvre toutes les entrées d’un coup.'},
  {h:'L’invariant reste vrai à chaque tour',p:`<p>Les variables d’une boucle changent à chaque tour, mais une relation entre elles peut rester fixe. C’est elle qui explique ce que la boucle calcule.</p><div class="def"><p>Un <b>invariant de boucle</b> est une propriété des variables qui est vraie juste avant le premier tour, et qui reste vraie à la fin de chaque tour (donc au moment où on reteste la condition). Pour <code class="code">somme</code>, l’invariant est <b>s = i(i + 1)/2</b>.</p></div><div class="idea"><p>Pense à une photo prise chaque fois que le programme arrive sur la ligne <code class="code">while</code>. Sur chaque photo, s vaut i(i + 1)/2. La figure le montre : après <i>t</i> tours, les colonnes 1, 2, …, <i>t</i> sont coloriées, et leur nombre total de cases est s = 1 + 2 + … + <i>t</i>.</p></div><div class="ex"><p>Avec n = 4 : (i, s) = (0, 0), (1, 1), (2, 3), (3, 6), (4, 10). Et 0·1/2 = 0, 1·2/2 = 1, 2·3/2 = 3, 3·4/2 = 6, 4·5/2 = 10 : la relation tient sur chaque ligne. À la sortie i = 4, donc s = 4·5/2 = 10.</p></div><div class="warn"><p>L’invariant peut être faux <b>au milieu</b> du corps de la boucle : juste après <code class="code">i = i + 1</code>, s n’a pas encore été mis à jour. Ce n’est pas grave : on ne le vérifie qu’entre deux tours.</p></div>`,
   params:[{id:'n',l:'n',min:1,max:10,v:6},{id:'t',l:'Tours effectués',min:0,max:10,v:2}],
   draw:v=>{ const t=Math.min(v.t,v.n), c=26, x0=(320-v.n*c)/2; let s='';
     for(let k=1;k<=v.n;k++) for(let r=0;r<k;r++) s+=RC(x0+(k-1)*c,232-(r+1)*21,c-3,18,{f:k<=t?'var(--accent)':'var(--surface)',c:k<=t?'none':'var(--line)',sw:1,rx:3});
     for(let k=1;k<=v.n;k++) s+=TX(x0+(k-1)*c+(c-3)/2,248,k,{s:11,c:k<=t?'var(--ink)':'var(--muted)'});
     return SV(254,s); },
   info:v=>{ const t=Math.min(v.t,v.n); return `i = ${t}, s = ${t*(t+1)/2}, i(i + 1)/2 = ${t*(t+1)/2} ✓ &nbsp; variant n − i = ${v.n-t}${t===v.n?' : la boucle s’arrête, s = n(n + 1)/2':''}`; },
   note:'À la sortie, on a l’invariant <b>et</b> la négation de la condition (i = n). C’est leur combinaison qui donne le résultat.'},
  {kind:'Théorie',h:'Pourquoi un invariant prouve le résultat',p:`<p>On ne peut pas regarder tous les tours de toutes les exécutions. Mais on peut faire comme pour une récurrence : vérifier le premier tour, puis montrer qu’un tour ne casse jamais la propriété.</p><div class="thm"><p>Si une propriété P est vraie avant la boucle (<b>initialisation</b>) et si un tour exécuté à partir d’un état où P et la condition sont vraies redonne P (<b>conservation</b>), alors P est vraie après chaque tour. Si la boucle s’arrête, on a à la sortie <b>P et la négation de la condition</b>.</p></div><div class="why"><p>C’est une récurrence sur le nombre <i>k</i> de tours effectués : l’initialisation est le cas <i>k</i> = 0, la conservation fait passer de <i>k</i> à <i>k</i> + 1.</p></div><div class="ex"><p>Pour <code class="code">somme</code>, P : s = i(i + 1)/2 et i ≤ n. Initialisation : 0 = 0·1/2. Conservation : on entre avec i &lt; n ; le tour donne i′ = i + 1 ≤ n et s′ = i(i + 1)/2 + (i + 1) = (i + 1)(i + 2)/2 = i′(i′ + 1)/2. Sortie : i ≥ n et i ≤ n, donc i = n et s = n(n + 1)/2.</p></div><div class="warn"><p>Une propriété peut être un invariant sans rien prouver : « s ≥ 0 » est vraie à chaque tour, mais ne dit pas ce que vaut s. Et une relation devinée trop vite échoue : « s = 2i » vaut au départ (0 = 0), mais pas après un tour (s = 1, i = 1).</p></div>`},
  {h:'Reconnaître un invariant',p:`Dans la boucle ci-dessous, quelle propriété est un invariant&nbsp;?`,
   fig:py(`
p, k = 1, 0
while k < n:
    p = p * x
    k = k + 1`),
   opts:['p = x × k','p = xᵏ','p = xⁿ','k = n'],ans:1,
   why:'Avant la boucle, p = 1 = x⁰. Si p = xᵏ au début d’un tour, alors après le tour p·x = xᵏ⁺¹ et k vaut k + 1 : la propriété p = xᵏ est conservée. À la sortie k = n, donc p = xⁿ.'},
  {kind:'Théorie',h:'Le variant garantit l’arrêt',p:`<p>L’invariant dit ce qu’on obtient <b>si</b> la boucle s’arrête. Il faut encore prouver qu’elle s’arrête, sinon on n’obtient rien du tout.</p><div class="def"><p>Un <b>variant</b> de boucle est une expression des variables qui est un <b>entier</b>, qui reste <b>≥ 0</b> tant qu’on est dans la boucle, et qui <b>diminue strictement</b> à chaque tour.</p></div><div class="why"><p>Un entier ≥ 0 qui baisse d’au moins 1 à chaque tour ne peut baisser qu’un nombre fini de fois : s’il vaut <i>V</i> au départ, il y a au plus <i>V</i> tours. La boucle s’arrête donc forcément.</p></div><div class="ex"><p>Dans l’algorithme d’Euclide, le variant est <i>b</i> : un tour remplace <i>b</i> par <i>a</i> mod <i>b</i>, qui est un reste de division par <i>b</i>, donc compris entre 0 et <i>b</i> − 1. Pour pgcd(252, 105) : 252 mod 105 = 42, 105 mod 42 = 21, 42 mod 21 = 0. Le variant prend les valeurs 105, 42, 21, 0 : trois tours, et on renvoie 21. Pendant ce temps, l’invariant pgcd(a, b) = 21 reste vrai.</p></div><div class="warn"><p>Les trois conditions comptent. Avec <code class="code">while x != 0: x = x - 3</code> et x = 10, x décroît strictement : 10, 7, 4, 1, −2, … mais saute par-dessus 0 et devient négatif. Ce n’est pas un variant, et la boucle ne s’arrête jamais.</p></div>`,
   params:[{id:'k',l:'Tour',min:0,max:EU.length-1,v:0}],
   draw:v=>euclideFig(EU,v.k)+py(`
def pgcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a`),
   info:v=>{ const [a,b]=EU[v.k]; return b===0?`b = 0 : on sort et on renvoie a = <b>${a}</b> = pgcd(252, 105).`:`Variant b = ${b}. Le pgcd de (${a}, ${b}) vaut toujours 21.`; }},
  {h:'Compte les tours',p:'Combien de tours de boucle fait <code class="code">pgcd(1071, 462)</code>&nbsp;?',lab:'tours =',ans:3,
   why:'1071 mod 462 = 147, puis 462 mod 147 = 21, puis 147 mod 21 = 0. Trois tours : (1071, 462) → (462, 147) → (147, 21) → (21, 0), et le pgcd vaut 21.'},
  {kind:'Méthode',h:'Une preuve en trois temps',p:`Pour Euclide, l’invariant est <b>pgcd(a, b) = pgcd(a₀, b₀)</b>. <b>Initialisation</b> : vrai avant la boucle. <b>Conservation</b> : pgcd(a, b) = pgcd(b, a mod b), car tout diviseur commun de a et b divise a − qb, et réciproquement. <b>Sortie</b> : b = 0 et pgcd(a, 0) = a.`,
   fig:'<p style="text-align:center;font-size:18px"><b>Invariant + condition de sortie ⟹ résultat</b><br><b>Variant entier ≥ 0 strictement décroissant ⟹ arrêt</b></p>',
   demo:{enonce:'Prouver que cette boucle, avec <i>n</i> entier ≥ 0, s’arrête et donne <i>p</i> = <i>x</i>ⁿ.'+py(`
p, k = 1, 0
while k < n:
    p = p * x
    k = k + 1`),
    etapes:[
     {f:'Invariant choisi : p = xᵏ et k ≤ n.',w:'Il relie les variables, et combiné à la sortie (k ≥ n) il donnera le résultat. La partie k ≤ n servira à conclure k = n.'},
     {f:'Initialisation : p = 1 = x⁰, k = 0 et 0 ≤ n.',w:'On vérifie la propriété avec les valeurs juste avant la boucle.'},
     {f:'Conservation : si p = xᵏ et k &lt; n au début d’un tour, alors p devient xᵏ · x = xᵏ⁺¹ et k devient k + 1 ≤ n.',w:'On suppose l’invariant vrai, on exécute le corps une fois, et on le vérifie avec les nouvelles valeurs. La condition de boucle (k &lt; n) est utilisable, puisqu’on est entré.'},
     {f:'Sortie : k ≥ n (condition fausse) et k ≤ n (invariant), donc k = n et p = xⁿ.',w:'Invariant + négation de la condition : c’est toujours ainsi qu’on conclut.'},
     {f:'Terminaison : n − k est un entier, ≥ 0 par l’invariant, qui baisse de 1 à chaque tour.',w:'C’est un variant. Il part de n, donc la boucle fait exactement n tours.'}],
    conclusion:'La boucle s’arrête après n tours avec p = xⁿ.'},
   note:'Le même schéma marche pour toutes les boucles <code class="code">while</code>. Pour une boucle <code class="code">for</code>, la terminaison est automatique.'},
  {h:'Est-ce que ça s’arrête&nbsp;?',p:'On part de <i>i</i> = 0. Pour quelles valeurs de <i>n</i> ≥ 0 cette boucle termine-t-elle&nbsp;?',
   fig:py(`
i = 0
while i != n:
    i = i + 2`),
   opts:['Pour tout n','Pour aucun n','Pour n pair seulement','Pour n impair seulement'],ans:2,
   why:'i prend les valeurs 0, 2, 4, … Si n est pair, i atteint n. Si n est impair, i saute par-dessus n et la boucle ne s’arrête jamais : n − i n’est pas un variant positif. Écrire <code class="code">while i &lt; n</code> corrigerait le problème.'},
  {kind:'Pratique',h:'Le pire cas d’Euclide',p:'On calcule <code class="code">pgcd(89, b)</code>. Règle <i>b</i> (entre 1 et 60) pour que la boucle fasse le <b>plus de tours possible</b>.',
   params:[{id:'b',l:'b',min:1,max:60,v:20}],
   draw:v=>euclideFig(euclideTrace(89,v.b),euclideTrace(89,v.b).length-1),
   info:v=>`${nbTours(89,v.b)} tour(s)`,
   ok:v=>nbTours(89,v.b)===9,
   why:'b = 55 donne 9 tours : (89, 55) → (55, 34) → (34, 21) → … → (1, 0). Deux nombres de Fibonacci consécutifs sont le pire cas d’Euclide (théorème de Lamé) : presque tous les quotients valent 1, donc le variant b décroît le plus lentement possible.'},
  {kind:'Méthode',h:'Trouver un invariant avec un tableau',
   p:'Un invariant ne se devine pas dans le vide. <b>Fais tourner</b> la boucle à la main sur quelques tours et note les variables dans un tableau. Cherche une relation qui lie les colonnes sur <b>toutes</b> les lignes, souvent en comparant à des carrés, des produits ou des puissances. Puis prouve-la : initialisation, conservation, et regarde ce qu’elle donne à la sortie.',
   demo:{enonce:'Que renvoie <code class="code">f(n)</code>&nbsp;? Le prouver.'+py(`
def f(n):
    s, k = 0, 0
    while k < n:
        k = k + 1
        s = s + 2 * k
    return s`),
    etapes:[
     {f:tab(['k',0,1,2,3,4],[['s',0,2,6,12,20]]),w:'On calcule quelques tours. Chaque colonne est l’état à la fin d’un tour.'},
     {f:'0 = 0 · 1, 2 = 1 · 2, 6 = 2 · 3, 12 = 3 · 4, 20 = 4 · 5 : on devine s = k(k + 1).',w:'On compare s à des expressions simples en k jusqu’à trouver celle qui marche sur toutes les colonnes.'},
     {f:'Initialisation : 0 = 0 · 1. Conservation : k(k + 1) + 2(k + 1) = (k + 1)(k + 2).',w:'Le corps fait k → k + 1 et s → s + 2(k + 1). On vérifie que la formule suit.'},
     {f:'Sortie : k = n, donc s = n(n + 1).',w:'k part de 0, augmente de 1 et s’arrête dès que k = n.'}],
    conclusion:'f(n) = n(n + 1). Par exemple f(10) = 110.'}},
  {kind:'Défi',h:'Trouve l’invariant',p:'Que renvoie <code class="code">mystere(12)</code>&nbsp;? Cherche une propriété liant <i>r</i> et <i>k</i>.',
   fig:py(`
def mystere(n):
    r, k = 0, 0
    while k < n:
        k = k + 1
        r = r + 2*k - 1
    return r`),
   lab:'résultat =',ans:144,
   why:'Invariant : r = k². Il est vrai au départ (0 = 0²) et conservé, car k² + 2(k + 1) − 1 = (k + 1)². À la sortie k = n, donc r = n² = 144.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : correction et terminaison',p:'<div class="keep"><ul><li><b>Correct</b> = pour toute entrée qui respecte la précondition, l’algorithme <b>termine</b> et renvoie ce qu’annonce la postcondition. Des tests ne prouvent rien.</li><li><b>Invariant</b> : propriété vraie avant la boucle et après chaque tour. Preuve en trois temps : <b>initialisation</b>, <b>conservation</b> (on suppose l’invariant et la condition vrais, on exécute un tour), <b>sortie</b> (invariant + négation de la condition ⟹ résultat).</li><li>Pour <b>trouver</b> un invariant : faire tourner la boucle à la main, noter les variables dans un tableau, chercher la relation qui tient sur toutes les lignes, puis la prouver.</li><li><b>Variant</b> : entier, ≥ 0 dans la boucle, strictement décroissant à chaque tour ⟹ la boucle s’arrête (au plus sa valeur initiale de tours). Un <code class="code">while i != n</code> qui peut sauter <i>n</i> est suspect.</li><li><b>Euclide</b> : pgcd(<i>a</i>, <i>b</i>) = pgcd(<i>b</i>, <i>a</i> mod <i>b</i>) est l’invariant, <i>b</i> le variant ; le pire cas est donné par deux nombres de Fibonacci consécutifs.</li><li>Une boucle <code class="code">for</code> sur un <code class="code">range</code> termine toujours ; seule la correction reste à prouver.</li></ul></div>'},
  {kind:'Problème',h:'Diviser avec des soustractions',p:`La fonction ci-dessous calcule le quotient et le reste de la division euclidienne de <i>a</i> ≥ 0 par <i>b</i> &gt; 0, uniquement avec des soustractions. On veut prouver qu’elle est correcte et qu’elle s’arrête, puis tester une variante fautive.`+py(`
def div(a, b):          # a >= 0 et b > 0
    q, r = 0, a
    while r >= b:
        r = r - b
        q = q + 1
    return q, r`),
   parts:[
    {q:'a) Quelle propriété est un invariant de la boucle&nbsp;?',opts:['r &lt; b','q = a // b','a = b·q + r et r ≥ 0','r = a − q'],ans:2,hint:'Un invariant est vrai <b>avant</b> la boucle. Teste chaque proposition avec q = 0 et r = a.',why:'Au départ, b·0 + a = a et a ≥ 0. Si a = bq + r au début d’un tour, alors b(q + 1) + (r − b) = bq + r, et r − b ≥ 0 car on est entré avec r ≥ b. r &lt; b et q = a // b ne sont vrais qu’à la sortie.'},
    {q:'b) Combien de tours de boucle fait ' + '<code class="code">div(100, 7)</code>&nbsp;?',lab:'tours =',ans:14,hint:'Chaque tour ajoute 1 à q. Quelle est la valeur finale de q&nbsp;?',why:'100 = 7 · 14 + 2. La boucle fait un tour par unité du quotient : 14 tours, et renvoie (14, 2).'},
    {q:'c) Quel est un variant qui prouve l’arrêt&nbsp;?',opts:['q','a − r','r','b'],ans:2,hint:'Il faut un entier positif ou nul qui décroît strictement à chaque tour.',why:'r est un entier ≥ 0 (invariant) et diminue de b ≥ 1 à chaque tour. q et a − r augmentent, b ne change pas.'},
    {q:'d) On remplace <code class="code">while r &gt;= b</code> par <code class="code">while r &gt; b</code>. Pour combien de valeurs de <i>a</i> entre 0 et 30 (inclus) <code class="code">div(a, 7)</code> renvoie-t-il un résultat faux&nbsp;?',lab:'valeurs =',ans:4,hint:'La variante s’arrête une fois de trop tôt dans un seul cas : quand r tombe exactement sur b.',why:'La boucle s’arrête avec r = 7 au lieu de continuer jusqu’à 0. Cela arrive quand a est un multiple non nul de 7 : 7, 14, 21, 28. Quatre valeurs.'},
   ],
   sol:`<p><b>Invariant</b> : a = b·q + r et r ≥ 0. Initialisation : q = 0 et r = a ≥ 0. Conservation : on entre avec r ≥ b, et b(q + 1) + (r − b) = bq + r, avec r − b ≥ 0.</p><p><b>Sortie</b> : la condition est fausse, donc r &lt; b. Avec l’invariant, a = bq + r et 0 ≤ r &lt; b : q et r sont bien le quotient et le reste.</p><p><b>Terminaison</b> : r est un entier ≥ 0 qui baisse de b ≥ 1 à chaque tour. div(100, 7) fait 14 tours.</p><p>Avec r &gt; b, la sortie donne seulement r ≤ b. Le cas r = b donne un résultat faux, par exemple div(14, 7) = (1, 7). Entre 0 et 30, c’est le cas pour a = 7, 14, 21, 28.</p>`},
  {kind:'Problème',h:'La multiplication du paysan russe',p:`Cette méthode multiplie deux entiers <i>a</i> et <i>b</i> ≥ 0 avec seulement des doublements, des divisions par 2 et des additions. À chaque tour, si <i>y</i> est impair, on ajoute <i>x</i> à <i>r</i>. Puis on double <i>x</i> et on divise <i>y</i> par 2. Tu dois concevoir l’invariant qui prouve que le résultat vaut <i>a</i>·<i>b</i>.`+py(`
def produit(a, b):
    r, x, y = 0, a, b
    while y > 0:
        if y % 2 == 1:
            r = r + x
        x = 2 * x
        y = y // 2
    return r`),
   parts:[
    {q:'a) Combien de tours de boucle fait <code class="code">produit(13, 11)</code>&nbsp;?',lab:'tours =',ans:4,hint:'Suis seulement y : 11, puis 11 // 2…',why:'y prend les valeurs 11, 5, 2, 1, puis 0 : 4 tours.'},
    {q:'b) Que vaut <i>r</i> après 2 tours&nbsp;?',lab:'r =',ans:39,hint:'Tour 1 : y = 11 est impair. Tour 2 : y = 5. Pense à doubler x entre les deux.',why:'Tour 1 : r = 13, x = 26, y = 5. Tour 2 : y impair, r = 13 + 26 = 39, puis x = 52 et y = 2.'},
    {q:'c) Quel invariant prouve la correction&nbsp;?',opts:['r = a·y','r + x·y = a·b','x·y = a·b','r = x − a'],ans:1,hint:'Vérifie au départ (r, x, y) = (0, 13, 11), puis après le tour 1 : (13, 26, 5).',why:'0 + 13 · 11 = 143 et 13 + 26 · 5 = 143. Si y est pair : 2x · (y/2) = xy. Si y est impair : r + x + 2x · (y − 1)/2 = r + xy. La quantité r + xy ne change jamais.'},
    {q:'d) Pourquoi la fonction renvoie-t-elle bien a·b&nbsp;?',opts:['Car x vaut 2ᵏ·a après k tours','Car la boucle fait environ log₂ b tours','Car r est toujours pair','Car à la sortie y = 0, et l’invariant donne r + x·0 = a·b'],ans:3,hint:'Combine l’invariant avec la négation de la condition de boucle.',why:'À la sortie, y ≤ 0, et y ≥ 0 reste vrai, donc y = 0. L’invariant r + xy = ab devient r = ab. Le nombre de tours sert à la complexité, pas à la correction.'},
   ],
   sol:`<p>Trace de produit(13, 11) : (r, x, y) = (0, 13, 11) → (13, 26, 5) → (39, 52, 2) → (39, 104, 1) → (143, 208, 0). 4 tours, résultat 143 = 13 · 11.</p><p><b>Invariant</b> : r + x·y = a·b. Il vaut 0 + ab au départ. Si y est pair, r ne change pas et (2x)(y/2) = xy. Si y est impair, y // 2 = (y − 1)/2 et (r + x) + 2x(y − 1)/2 = r + xy.</p><p><b>Sortie</b> : y est un entier ≥ 0 et la condition y &gt; 0 est fausse, donc y = 0 et r = ab.</p><p><b>Terminaison</b> : y est un variant (y // 2 &lt; y pour y ≥ 1). La boucle fait autant de tours que b a de chiffres en binaire : O(log b).</p>`},
]},

/* ================= 2. Complexité ================= */
{subj:'ics', sem:'algo', id:'ics-complexite', h:'Complexité et notation grand-O', p:'Compter les opérations d’un algorithme et comparer les vitesses de croissance.', steps:[
  {h:'Compter les opérations',p:`<p>Deux programmes font le même travail : lequel est le plus rapide&nbsp;? Un chronomètre répond mal, car le temps dépend de la machine, du langage et de ce qui tourne à côté. On compte plutôt les opérations, ce qui ne dépend que de l’algorithme.</p><div class="def"><p>Une <b>opération élémentaire</b> est une action de coût fixe : affectation, comparaison, calcul arithmétique, accès à une case L[i]. La <b>complexité</b> (en temps) d’un algorithme est le nombre T(<i>n</i>) d’opérations élémentaires qu’il exécute, en fonction de la <b>taille</b> <i>n</i> de l’entrée (longueur d’une liste, nombre de chiffres…).</p></div><div class="idea"><p>On ne compte pas tout à la ligne près : on choisit l’opération qui est exécutée le plus souvent, ici <code class="code">c += 1</code> dans la boucle la plus intérieure. Les autres sont exécutées au plus autant de fois, à une constante près. Dans la figure, la ligne <i>i</i> de la grille a <i>i</i> cases coloriées : c’est le nombre de tours de la boucle sur <i>j</i> pour cette valeur de <i>i</i>.</p></div><div class="ex"><p>Pour n = 4 : i = 0 donne 0 tour, i = 1 donne 1, i = 2 donne 2, i = 3 donne 3. Total 0 + 1 + 2 + 3 = 6 = 4 · 3/2. La grille de 4 × 4 = 16 cases en colorie un peu moins de la moitié, et cette proportion se rapproche de 1/2 quand n grandit.</p></div>`,
   params:[{id:'n',l:'n',min:2,max:12,v:5}],
   draw:v=>py(`
c = 0
for i in range(n):
    for j in range(i):
        c += 1`)+pairsGrid(v.n),
   info:v=>`Ligne i : i cases. Total c = 0 + 1 + … + (n − 1) = n(n − 1)/2 = <b>${v.n*(v.n-1)/2}</b>`},
  {kind:'Méthode',h:'Compter les tours d’une double boucle dépendante',
   p:`<p>Si la boucle intérieure ne dépend pas de <i>i</i>, on multiplie les nombres de tours. Si elle <b>dépend</b> de <i>i</i>, on <b>additionne</b> : pour chaque <i>i</i>, combien de tours fait l’intérieure&nbsp;? On tombe très souvent sur la somme</p><p style="text-align:center;font-size:18px"><b>1 + 2 + … + n = n(n + 1)/2</b></p><p>Pour la retrouver : écris la somme à l’endroit, puis à l’envers en dessous. Chaque colonne vaut n + 1 et il y a n colonnes, donc deux fois la somme vaut n(n + 1). De même, 0 + 1 + … + (n − 1) = n(n − 1)/2.</p>`,
   demo:{enonce:'Combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 20&nbsp;?'+py(`
c = 0
for i in range(1, n + 1):
    for j in range(i, n + 1):
        c += 1`),
    etapes:[
     {f:'Pour un i fixé, j va de i à n : n − i + 1 tours.',w:'range(i, n + 1) contient n + 1 − i entiers.'},
     {f:'i = 1 : n tours, i = 2 : n − 1 tours, …, i = n : 1 tour.',w:'On écrit le nombre de tours pour la première et la dernière valeur de i, pour voir la forme de la somme.'},
     {f:'Total : n + (n − 1) + … + 1 = n(n + 1)/2.',w:'C’est la somme 1 + 2 + … + n, écrite à l’envers.'},
     {f:'Pour n = 20 : 20 · 21 / 2 = 210.',w:'On remplace n à la fin seulement.'}],
    conclusion:'c += 1 est exécuté 210 fois. En grand-O : n(n + 1)/2 = O(n²).'},
   note:'Vérifie la formule sur un petit n en comptant à la main : pour n = 3, 3 + 2 + 1 = 6 = 3 · 4 / 2.'},
  {h:'À toi',p:'Avec ce même code et <i>n</i> = 100, combien de fois <code class="code">c += 1</code> est-il exécuté&nbsp;?',lab:'c =',ans:4950,
   why:'c = n(n − 1)/2 = 100 × 99 / 2 = 4950.'},
  {kind:'Théorie',h:'La notation grand-O',p:`<p>Le nombre exact d’opérations, comme n(n − 1)/2 ou 3n + 100, est souvent pénible à obtenir et dépend de détails d’écriture. Ce qui compte vraiment, c’est la façon dont il <b>grandit</b> avec <i>n</i>. La notation grand-O garde exactement cette information.</p><div class="def"><p>Soient <i>f</i> et <i>g</i> deux fonctions positives de <i>n</i>. On écrit <b>f(n) = O(g(n))</b>, et on lit « <i>f</i> est un grand O de <i>g</i> », s’il existe une constante <i>C</i> &gt; 0 et un rang <i>n</i>₀ tels que <b>f(n) ≤ C · g(n) pour tout n ≥ n₀</b>.</p></div><div class="idea"><p>« À partir d’un certain rang, <i>f</i> ne grandit pas plus vite que <i>g</i>, à un facteur constant près. » Le facteur <i>C</i> absorbe les constantes (vitesse de la machine, nombre d’opérations par tour), et le rang <i>n</i>₀ permet d’ignorer les petites valeurs de <i>n</i>.</p></div><div class="ex"><p>f(n) = n(n − 1)/2 ≤ n²/2 pour tout n ≥ 1 : C = 1/2 et n₀ = 1 conviennent, donc f(n) = O(n²). De même 3n + 100 ≤ 4n dès que n ≥ 100 : C = 4, n₀ = 100, donc 3n + 100 = O(n).</p></div><div class="warn"><p>O donne une <b>borne supérieure</b>. Écrire n = O(n²) est vrai, mais n’apprend rien : on donne toujours la plus petite fonction de l’échelle ci-dessous qui convient.</p></div>`,
   fig:`<p style="text-align:center;line-height:1.9">O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ)<br><span style="color:var(--muted)">accès L[i] · dichotomie · parcours · tri fusion · double boucle · Fibonacci naïf</span></p>`,
   note:'En informatique, log n désigne en général log₂ n. Le changement de base ne change qu’une constante, donc O(log n) ne dépend pas de la base.'},
  {kind:'Théorie',h:'Les règles de calcul du grand-O',p:`<p>On n’applique presque jamais la définition avec <i>C</i> et <i>n</i>₀. On se sert de quelques règles qui en découlent, et qui suffisent pour lire la complexité d’un programme.</p><div class="prop"><p><b>Constantes</b> : O(c · f) = O(f) pour toute constante c &gt; 0. <b>Somme</b> : f + g = O(max(f, g)). <b>Produit</b> : une boucle de <i>n</i> tours dont le corps coûte O(<i>m</i>) coûte O(<i>n</i> · <i>m</i>). <b>Séquence</b> : deux blocs l’un après l’autre coûtent la somme, donc le plus gros des deux.</p></div><div class="why"><p>La constante c s’absorbe dans le <i>C</i> de la définition. Pour la somme, f + g ≤ 2 · max(f, g), et 2 s’absorbe aussi. Pour le produit, on additionne <i>n</i> fois un coût au plus C·<i>m</i>, soit au plus C·<i>n</i>·<i>m</i>.</p></div><div class="ex"><p>f(n) = 5n² + 3n + 50 : pour n ≥ 1, on a n ≤ n² et 1 ≤ n², donc f(n) ≤ (5 + 3 + 50) n² = 58 n², d’où f(n) = O(n²). Un programme qui fait une boucle simple sur <i>n</i> éléments, puis une double boucle, coûte O(n) + O(n²) = O(n²) : la double boucle l’emporte.</p></div><div class="warn"><p>Les constantes oubliées comptent pour les petits <i>n</i>. 10 n log₂ n est plus grand que n²/2 tant que n ≤ 143. Le grand-O décrit le comportement pour les grandes entrées, pas pour une liste de 20 éléments.</p></div>`},
  {kind:'Méthode',h:'Simplifier en grand-O',
   p:'Pour donner la complexité d’une formule : <b>développe</b> pour obtenir une somme de termes ; <b>classe</b> chaque terme sur l’échelle 1 &lt; log n &lt; n &lt; n log n &lt; n² &lt; n³ &lt; 2ⁿ ; <b>garde</b> le plus fort ; <b>enlève</b> sa constante multiplicative.',
   demo:{enonce:'Donner la complexité de f(n) = n(n + 3)/2 + 10 n log₂ n + 50.',
    etapes:[
     {f:'f(n) = n²/2 + 3n/2 + 10 n log₂ n + 50',w:'On développe le produit pour voir chaque terme séparément.'},
     {f:'Termes : n² (avec 1/2), n, n log n (avec 10), constante.',w:'On repère la forme de chaque terme sans regarder les constantes.'},
     {f:'Le plus fort est n²/2. Pour n = 1024 : n²/2 = 524 288, 10 n log₂ n = 102 400, 3n/2 = 1536.',w:'Un 10 devant n log n ne le fait pas passer devant n² : il ne gagne que pour les petits n.'},
     {f:'f(n) = O(n²)',w:'On enlève le facteur 1/2.'}],
    conclusion:'f(n) = O(n²).'}},
  {h:'Terme dominant',p:'Quelle est la complexité de <i>f</i>(<i>n</i>) = 3<i>n</i>² + 100 <i>n</i> log <i>n</i> + 7&nbsp;?',
   opts:['O(n log n)','O(3n²)','O(n²)','O(100 n log n)'],ans:2,
   why:'n log n est négligeable devant n² quand n grandit, et la constante 3 disparaît : f(n) = O(n²). Écrire O(3n²) n’est pas faux mais n’est pas l’usage.'},
  {h:'Comparer les croissances',p:`<p>Sur l’échelle O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ), chaque classe finit par écraser la précédente. Le curseur élargit la fenêtre : les courbes qui semblaient proches au début s’écartent vite.</p><div class="def"><p><b>log₂ n</b> est l’exposant <i>k</i> tel que 2ᵏ = n : c’est le nombre de fois qu’on peut diviser <i>n</i> par 2 avant d’arriver à 1. Ainsi log₂ 8 = 3 et log₂ 1024 = 10.</p></div><div class="ex"><p>Pour n = 8 : log₂ n = 3, n log₂ n = 24, n² = 64. Pour n = 64 : 6, 384 et 4096. Pour n = 1 000 000, à un milliard d’opérations par seconde : n log₂ n ≈ 2 · 10⁷ opérations prend 0,02 s, alors que n² = 10¹² prend 1000 s, plus d’un quart d’heure. Et 2ⁿ pour n = 60 seulement demande environ 36 ans.</p></div><div class="idea"><p>Pour comparer deux classes, regarde le <b>rapport</b> : n² / (n log n) = n / log n tend vers l’infini, donc n² finit par dominer, quelle que soit la constante devant n log n.</p></div>`,
   params:[{id:'N',l:'n jusqu’à',min:8,max:64,step:8,v:8}],
   draw:v=>{ const N=v.N, ym=Math.ceil(N*Math.log2(N)*1.15), P=plane({x:[0,N],y:[0,ym],w:320,h:220,grid:false,lx:N/4,ly:Math.ceil(ym/4)});
     P.fn(x=>Math.log2(x),{from:1,c:'var(--ok)'}).fn(x=>x,{c:'var(--math)'}).fn(x=>x*Math.log2(x),{from:1,c:'var(--spark)'}).fn(x=>x*x,{c:'var(--bad)'});
     const xs=Math.sqrt(ym)*.92;
     P.text(N*.97,Math.log2(N),'log n',{a:'end',dy:-6,c:'var(--ok)'}).text(N*.97,N*.97,'n',{a:'end',dy:-8,c:'var(--math)'}).text(N*.82,N*.82*Math.log2(N*.82),'n log n',{a:'end',dy:-8,c:'var(--spark)'}).text(xs,xs*xs,'n²',{dx:6,dy:12,c:'var(--bad)'});
     return P.svg(); },
   info:v=>`En n = ${v.N} : log₂ n = ${fmt(Math.log2(v.N),1)}, n = ${v.N}, n log₂ n = ${fmt(v.N*Math.log2(v.N),0)}, n² = ${v.N*v.N}`},
  {kind:'Méthode',h:'Prévoir un temps par proportionnalité',
   p:`<p>Si le temps vaut à peu près T(n) ≈ C · g(n), la constante C s’élimine dans un rapport : <b>T(n₂) / T(n₁) = g(n₂) / g(n₁)</b>. Quand <i>n</i> est multiplié par <i>k</i> :</p><ul><li>O(n) : le temps est multiplié par <i>k</i> ;</li><li>O(n²) : par <i>k</i>² ; O(n³) : par <i>k</i>³ ;</li><li>O(log n) : on ajoute seulement un petit nombre de tours (log₂ <i>k</i>) ;</li><li>O(2ⁿ) : chaque unité ajoutée à <i>n</i> double le temps.</li></ul>`,
   demo:{enonce:'Un algorithme en O(n²) met 3 s pour n = 2000. Combien de temps environ pour n = 10 000&nbsp;?',
    etapes:[
     {f:'k = 10 000 / 2000 = 5',w:'On cherche d’abord par combien n est multiplié.'},
     {f:'g(n) = n², donc le temps est multiplié par 5² = 25.',w:'(5n)² = 25 n² : la constante C est la même pour les deux tailles.'},
     {f:'T ≈ 3 × 25 = 75 s',w:'On applique le facteur au temps connu.'}],
    conclusion:'Environ 75 s. Un algorithme en O(n) n’aurait mis que 15 s.'},
   note:'Ce calcul n’est fiable que pour des n assez grands, quand le terme dominant écrase les autres.'},
  {h:'Prévoir un temps de calcul',p:'Un algorithme en O(<i>n</i>²) met 2 s pour <i>n</i> = 1000. Combien de temps environ pour <i>n</i> = 3000&nbsp;?',lab:'t ≈',unit:'s',ans:18,tol:0.01,
   why:'Si n est multiplié par 3, n² est multiplié par 3² = 9. Donc t ≈ 2 × 9 = 18 s.'},
  {kind:'Théorie',h:'Meilleur cas, pire cas',p:`<p>Jusqu’ici, le nombre d’opérations ne dépendait que de <i>n</i>. Mais la fonction ci-dessous s’arrête dès qu’elle trouve <i>x</i> : sur deux listes de même longueur, elle peut faire 1 comparaison ou <i>n</i>.</p><div class="def"><p>Pour une taille <i>n</i> fixée, le <b>pire cas</b> est le plus grand coût sur toutes les entrées de taille <i>n</i>, et le <b>meilleur cas</b> le plus petit. Sauf mention contraire, la complexité annoncée est celle du <b>pire cas</b>.</p></div><div class="ex"><p>L = [4, 8, 15, 16, 23, 42], donc n = 6. <code class="code">contient(L, 4)</code> fait 1 comparaison (meilleur cas). <code class="code">contient(L, 23)</code> en fait 5. <code class="code">contient(L, 7)</code> en fait 6 : il faut tout regarder pour conclure à l’absence (pire cas). La recherche est en O(n).</p></div><div class="idea"><p>Le pire cas est une <b>garantie</b> : quelle que soit l’entrée, l’algorithme ne fera jamais plus. C’est ce qu’on veut savoir avant de lancer un calcul sur des millions de données. Il existe aussi un <b>cas moyen</b> : si <i>x</i> est présent à une position au hasard, on fait en moyenne (n + 1)/2 comparaisons, ce qui reste O(n).</p></div><div class="warn"><p>Le meilleur cas ne garantit rien : presque tout algorithme est rapide sur une entrée bien choisie. Dire « la recherche est en O(1) car parfois <i>x</i> est en tête » est faux.</p></div>`,
   fig:py(`
def contient(L, x):
    for y in L:
        if y == x:
            return True
    return False`)},
  {kind:'Méthode',h:'Reconnaître O(log n)',
   p:`<p>Dès qu’une quantité est <b>divisée par 2</b> à chaque tour, ou <b>doublée</b> jusqu’à atteindre <i>n</i>, la boucle fait environ log₂ <i>n</i> tours, car 2ᵏ dépasse <i>n</i> dès que <i>k</i> dépasse log₂ <i>n</i>. Pour le nombre exact, encadre <i>n</i> entre deux puissances de 2 :</p><ul><li>${cc('while n > 1: n = n // 2')} fait ⌊log₂ n⌋ tours : le plus grand k tel que 2ᵏ ≤ n.</li><li>${cc('i = 1')} puis ${cc('while i < n: i = 2 * i')} fait ⌈log₂ n⌉ tours : le plus petit k tel que 2ᵏ ≥ n.</li></ul><p>Repères : 2¹⁰ = 1024 ≈ mille, 2²⁰ ≈ un million.</p>`,
   demo:{enonce:'Combien de tours font ces deux boucles pour n = 100&nbsp;?',
    etapes:[
     {f:'Division : n prend les valeurs 100, 50, 25, 12, 6, 3, 1. Six tours.',w:'On trace les valeurs de n jusqu’à ce que n &gt; 1 soit faux.'},
     {f:'Contrôle : 2⁶ = 64 ≤ 100 &lt; 128 = 2⁷, donc ⌊log₂ 100⌋ = 6.',w:'L’encadrement par les puissances de 2 donne le résultat sans tracer.'},
     {f:'Doublement : i prend les valeurs 1, 2, 4, 8, 16, 32, 64 avec i &lt; 100, puis 128. Sept tours.',w:'Un tour par valeur de i inférieure à 100. C’est le plus petit k avec 2ᵏ ≥ 100, soit 7.'},
     {f:'Dans les deux cas : O(log n).',w:'Une différence d’un tour ne change pas l’ordre de grandeur.'}],
    conclusion:'6 tours pour la division, 7 pour le doublement : environ log₂ 100 ≈ 6,6.'}},
  {h:'Diviser par deux',p:'Quelle est la complexité de cette fonction&nbsp;?',
   fig:py(`
def f(n):
    k = 0
    while n > 1:
        n = n // 2
        k = k + 1
    return k`),
   opts:['O(1)','O(n)','O(n log n)','O(log n)'],ans:3,
   why:'À chaque tour n est divisé par 2. Après k tours il reste environ n/2ᵏ, et la boucle s’arrête quand 2ᵏ ≥ n, soit k ≈ log₂ n : O(log n).'},
  {kind:'Défi',h:'Fais tourner la boucle',p:'Avec la même fonction, que renvoie <code class="code">f(1000)</code>&nbsp;?',lab:'f(1000) =',ans:9,
   why:'1000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1 : 9 tours. C’est ⌊log₂ 1000⌋ = 9, car 2⁹ = 512 ≤ 1000 &lt; 1024.'},
  {kind:'Méthode',h:'Compter de l’intérieur vers l’extérieur',
   p:'Avec plusieurs boucles imbriquées et des bornes qui dépendent les unes des autres, compte <b>une boucle à la fois, en partant de la plus intérieure</b>. Pour des valeurs fixées des boucles extérieures, combien de tours fait l’intérieure&nbsp;? Remplace-la par ce nombre, puis recommence avec la boucle suivante. Les sommes 0 + 1 + … + (m − 1) = m(m − 1)/2 reviennent à chaque étage. Pour un résultat numérique, un tableau des valeurs suffit.',
   demo:{enonce:'Combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 5&nbsp;?'+py(`
c = 0
for i in range(n):
    for j in range(i):
        for k in range(j):
            c += 1`),
    etapes:[
     {f:'Boucle sur k, i et j fixés : j tours.',w:'range(j) contient j valeurs.'},
     {f:'Boucle sur j, i fixé : 0 + 1 + … + (i − 1) = i(i − 1)/2 tours.',w:'On additionne les j tours intérieurs pour j = 0, …, i − 1.'},
     {f:tab(['i',0,1,2,3,4],[['i(i − 1)/2',0,0,1,3,6]]),w:'Boucle sur i : on additionne ces nombres pour i = 0, …, n − 1.'},
     {f:'Total : 0 + 0 + 1 + 3 + 6 = 10.',w:'On fait la somme de la dernière ligne.'},
     {f:'En général ≈ somme de i²/2 pour i jusqu’à n, soit environ n³/6 : O(n³).',w:'Trois boucles imbriquées dont les bornes valent au plus n : n³ divisé par une constante.'}],
    conclusion:'c += 1 est exécuté 10 fois pour n = 5, et le coût est en O(n³).'}},
  {h:'Trois boucles à toi',p:'Avec le code de la méthode, combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 6&nbsp;?',lab:'c =',ans:20,
   why:'On ajoute la ligne i = 5 : 5 · 4 / 2 = 10. Total 0 + 0 + 1 + 3 + 6 + 10 = 20.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : complexité',p:'<div class="keep"><ul><li><b>Complexité</b> T(<i>n</i>) : nombre d’opérations élémentaires en fonction de la taille <i>n</i> de l’entrée. On compte l’opération la plus intérieure.</li><li><b>Boucles</b> : bornes indépendantes ⟹ on multiplie ; borne intérieure qui dépend de <i>i</i> ⟹ on additionne, souvent 1 + 2 + … + <i>n</i> = <i>n</i>(<i>n</i> + 1)/2. Plusieurs boucles : de l’intérieur vers l’extérieur.</li><li><b>f = O(g)</b> : f(n) ≤ C·g(n) pour n ≥ n₀. On garde le terme dominant et on enlève sa constante. Somme ⟹ le plus gros terme ; boucle de <i>n</i> tours de coût O(<i>m</i>) ⟹ O(<i>nm</i>).</li><li><b>Échelle</b> : 1 &lt; log n &lt; n &lt; n log n &lt; n² &lt; n³ &lt; 2ⁿ.</li><li><b>O(log n)</b> : une quantité divisée par 2 (ou doublée) à chaque tour. n // 2 répété : ⌊log₂ n⌋ tours ; doublement depuis 1 jusqu’à n : ⌈log₂ n⌉ tours. 2¹⁰ ≈ mille, 2²⁰ ≈ un million.</li><li><b>Prévoir un temps</b> : T(n₂)/T(n₁) = g(n₂)/g(n₁). En O(n²), multiplier <i>n</i> par <i>k</i> multiplie le temps par <i>k</i>².</li><li>Sauf mention contraire, on donne le <b>pire cas</b>, qui est une garantie.</li></ul></div>'},
  {kind:'Problème',h:'Une boucle qui double',p:`Dans la fonction ci-dessous, la boucle extérieure double <i>i</i> à chaque tour, et la boucle intérieure fait toujours <i>n</i> tours. Compte les passages par <code class="code">c += 1</code> pour deux valeurs de <i>n</i>, puis déduis-en la complexité.`+py(`
def f(n):
    c = 0
    i = 1
    while i < n:
        for j in range(n):
            c += 1
        i = 2 * i
    return c`),
   parts:[
    {q:'a) Que renvoie <code class="code">f(16)</code>&nbsp;?',lab:'f(16) =',ans:64,hint:'Liste les valeurs de i pour lesquelles i &lt; 16. Chacune donne 16 passages.',why:'i vaut 1, 2, 4, 8 : 4 tours extérieurs de 16 passages, soit 64.'},
    {q:'b) Que renvoie <code class="code">f(1000)</code>&nbsp;?',lab:'f(1000) =',ans:10000,hint:'Quelle est la plus grande puissance de 2 strictement inférieure à 1000&nbsp;?',why:'i vaut 1, 2, 4, …, 512 = 2⁹ : 10 tours extérieurs. 10 × 1000 = 10 000.'},
    {q:'c) Quelle est la complexité de <i>f</i>&nbsp;?',opts:['O(n)','O(n²)','O(log n)','O(n log n)'],ans:3,hint:'Combien de tours fait la boucle while, en fonction de n&nbsp;? Et chacun coûte combien&nbsp;?',why:'La boucle while fait ⌈log₂ n⌉ tours, chacun de coût n : f(n) = n ⌈log₂ n⌉ = O(n log n).'},
   ],
   sol:`<p>La boucle extérieure s’exécute pour i = 1, 2, 4, …, tant que i &lt; n. Le nombre de tours est le plus petit k tel que 2ᵏ ≥ n, soit ⌈log₂ n⌉.</p><p>Chaque tour extérieur fait exactement n passages par c += 1, quel que soit i. Donc f(n) = n · ⌈log₂ n⌉.</p><p>f(16) = 16 · 4 = 64 et f(1000) = 1000 · 10 = 10 000.</p><p>Le coût est O(n log n) : bien moins qu’une double boucle O(n²), mais plus qu’un simple parcours.</p>`},
  {kind:'Problème',h:'Trois boucles imbriquées',p:`Les bornes des boucles intérieures dépendent des boucles extérieures. On ne peut donc pas simplement multiplier les nombres de tours. Pour chaque couple (<i>i</i>, <i>j</i>), la boucle sur <i>k</i> fait <i>j</i> − <i>i</i> tours. On cherche une formule, puis un ordre de grandeur.`+py(`
def g(n):
    c = 0
    for i in range(n):
        for j in range(i, n):
            for k in range(i, j):
                c += 1
    return c`),
   parts:[
    {q:'a) Que renvoie <code class="code">g(4)</code>&nbsp;?',lab:'g(4) =',ans:10,hint:'Pour i = 0, j va de 0 à 3 et la boucle sur k fait 0 + 1 + 2 + 3 tours. Recommence pour i = 1, 2, 3.',why:'i = 0 : 0 + 1 + 2 + 3 = 6. i = 1 : 0 + 1 + 2 = 3. i = 2 : 0 + 1 = 1. i = 3 : 0. Total 10.'},
    {q:'b) Que renvoie <code class="code">g(10)</code>&nbsp;?',lab:'g(10) =',ans:165,hint:'Les valeurs g(1), g(2), g(3), g(4) valent 0, 1, 4, 10. Cherche une formule de la forme (n + 1)n(n − 1)/6.',why:'g(n) = (n + 1)n(n − 1)/6, car chaque passage correspond à un triplet i ≤ k &lt; j. Donc g(10) = 11 · 10 · 9 / 6 = 165.'},
    {q:'c) Quelle est la complexité de <i>g</i>&nbsp;?',opts:['O(n²)','O(n³)','O(n log n)','O(2ⁿ)'],ans:1,hint:'Garde le terme dominant de (n + 1)n(n − 1)/6.',why:'(n + 1)n(n − 1)/6 = (n³ − n)/6, dont le terme dominant est n³/6 : O(n³).'},
    {q:'d) <i>g</i>(200) prend 0,5 s. On admet que le temps est proportionnel à <i>n</i>³. Combien de temps environ pour <i>g</i>(600)&nbsp;?',lab:'t ≈',unit:'s',ans:13.5,tol:0.01,hint:'n est multiplié par 3. Par combien est multiplié n³&nbsp;?',why:'3³ = 27, donc t ≈ 0,5 × 27 = 13,5 s.'},
   ],
   sol:`<p>Pour i et j fixés, la boucle sur k fait j − i tours. Pour i fixé, on obtient 0 + 1 + … + (n − 1 − i).</p><p>g(4) = 6 + 3 + 1 + 0 = 10. Plus généralement, c compte les triplets (i, k, j) avec 0 ≤ i ≤ k &lt; j ≤ n − 1, et on trouve g(n) = (n + 1)n(n − 1)/6. Ainsi g(10) = 165.</p><p>Le terme dominant est n³/6, donc g est en O(n³). Les bornes dépendantes divisent le coût par 6 par rapport à n³, mais ne changent pas l’ordre de grandeur.</p><p>Tripler n multiplie le temps par 27 : 0,5 s devient environ 13,5 s.</p>`},
]},

/* ================= 3. Récursivité ================= */
{subj:'ics', sem:'algo', id:'ics-recursivite', h:'Récursivité', p:'Une fonction qui s’appelle elle-même, la pile d’appels et le coût caché de Fibonacci.', steps:[
  {kind:'Théorie',h:'Une fonction qui s’appelle',p:`<p>Pour calculer 5! = 5 × 4 × 3 × 2 × 1, tu peux remarquer que 5! = 5 × 4!. Si quelqu’un te donne 4!, il ne reste qu’une multiplication. Et 4! = 4 × 3!, et ainsi de suite jusqu’à 0! = 1, qu’on connaît sans calcul. Une fonction peut suivre exactement ce raisonnement.</p><div class="def"><p>Une fonction est <b>récursive</b> si elle s’appelle elle-même. Elle comporte un <b>cas de base</b>, une entrée traitée directement, sans appel, et un <b>cas récursif</b>, qui calcule le résultat à partir d’un appel sur une entrée <b>plus petite</b>.</p></div><div class="idea"><p>Chaque appel délègue « le reste du travail » à un appel sur un problème plus petit, et ne fait lui-même qu’une petite étape. Les entrées diminuent jusqu’au cas de base, qui arrête la chaîne.</p></div><div class="ex"><p>fact(3) = 3 × fact(2) = 3 × (2 × fact(1)) = 3 × (2 × (1 × fact(0))) = 3 × 2 × 1 × 1 = 6. Il y a 4 appels : fact(3), fact(2), fact(1) et fact(0).</p></div><div class="warn"><p>Les deux ingrédients sont obligatoires. Sans cas de base, rien n’arrête les appels. Avec un appel sur une entrée qui ne diminue pas, comme fact(n) qui appellerait fact(n), on n’atteint jamais le cas de base.</p></div>`,
   fig:py(`
def fact(n):
    if n == 0:          # cas de base
        return 1
    return n * fact(n - 1)   # appel récursif`),
   note:'La preuve d’une fonction récursive est une récurrence : le cas de base est l’initialisation, l’appel récursif l’hérédité.'},
  {h:'La pile d’appels',p:`<p>Quand fact(4) appelle fact(3), il n’a pas fini : il doit encore multiplier le résultat par 4. Python doit donc se souvenir de cet appel inachevé pendant que fact(3) travaille.</p><div class="def"><p>La <b>pile d’appels</b> contient un <b>cadre</b> par appel en cours : ses variables locales (ici n) et l’endroit où reprendre. Un nouvel appel pose un cadre <b>au sommet</b> ; quand un appel renvoie sa valeur, son cadre est retiré et l’appel du dessous reprend. C’est une pile : le dernier posé est le premier retiré.</p></div><div class="ex"><p>Suis fact(4) avec le curseur. Phase de descente : la pile monte à 5 cadres, fact(4), fact(3), fact(2), fact(1), fact(0). fact(0) est le cas de base et renvoie 1. Phase de remontée : fact(1) renvoie 1 × 1 = 1, fact(2) renvoie 2, fact(3) renvoie 6, fact(4) renvoie 24.</p></div><div class="idea"><p>La hauteur maximale de la pile mesure la <b>mémoire</b> utilisée par la récursion, en plus du temps de calcul. Python limite cette hauteur à environ 1000 cadres et lève une <code class="code">RecursionError</code> au-delà.</p></div>`,
   params:[{id:'k',l:'Étape',min:0,max:FACT.length-1,v:0}],
   draw:v=>stackFig(FACT[v.k]),
   info:v=>`${FACT[v.k].msg} &nbsp; (pile : ${FACT[v.k].fr.length} appel${FACT[v.k].fr.length>1?'s':''})`},
  {h:'Sans cas de base',p:'Que se passe-t-il si on supprime les deux premières lignes de <code class="code">fact</code> et qu’on appelle <code class="code">fact(3)</code>&nbsp;?',
   opts:['La fonction renvoie 0','La fonction renvoie 6','Les appels ne s’arrêtent jamais et Python lève une RecursionError','Python refuse de définir la fonction'],ans:2,
   why:'fact(3) appelle fact(2), fact(1), fact(0), fact(−1)… sans fin. La pile grandit jusqu’à la limite de Python (environ 1000 appels) et on obtient RecursionError.'},
  {h:'Compter les appels',p:'Combien d’appels à <code class="code">fact</code> au total (le premier compris) pour calculer <code class="code">fact(5)</code>&nbsp;?',lab:'appels =',ans:6,
   why:'fact(5), fact(4), fact(3), fact(2), fact(1), fact(0) : 6 appels. En général n + 1 appels, donc O(n).'},
  {kind:'Théorie',h:'Prouver une fonction récursive par récurrence',p:`<p>Une fonction récursive n’a pas de boucle, donc pas d’invariant de boucle. Sa preuve suit pourtant le même esprit : c’est une <b>récurrence</b> sur la taille de l’entrée.</p><div class="thm"><p>Soit f une fonction récursive sur les entiers n ≥ 0. Si (1) le cas de base renvoie la bonne valeur, (2) le cas récursif renvoie la bonne valeur <b>en supposant</b> que ses appels sur des entrées plus petites la renvoient, et (3) chaque appel se fait sur un entier ≥ 0 strictement plus petit, alors f termine et est correcte pour tout n ≥ 0.</p></div><div class="why"><p>(3) joue le rôle du variant : une suite d’entiers ≥ 0 strictement décroissante est finie, donc on atteint le cas de base. (1) est l’initialisation de la récurrence et (2) l’hérédité.</p></div>${py(`
def pw(x, n):        # n entier >= 0
    if n == 0:
        return 1
    return x * pw(x, n - 1)`)}<div class="ex"><p>Propriété P(n) : pw(x, n) = xⁿ. P(0) : on renvoie 1 = x⁰. Si P(n − 1) est vraie, pw(x, n) renvoie x · xⁿ⁻¹ = xⁿ. L’appel se fait sur n − 1 ≥ 0, plus petit que n. Donc pw est correcte.</p></div><div class="warn"><p>La précondition compte : pw(2, −1) appelle pw(2, −2), pw(2, −3)… sans jamais atteindre 0. Le point (3) échoue dès que n sort de ℕ.</p></div>`},
  {kind:'Méthode',h:'Écrire une fonction récursive',
   p:`<p>Réponds à trois questions, dans cet ordre :</p><ol><li><b>Cas de base</b> : quelle est la plus petite entrée, dont je connais la réponse sans calcul&nbsp;? (0, une liste vide, un seul chiffre…)</li><li><b>Réduction</b> : comment obtenir la réponse pour <i>n</i> à partir de la réponse pour une entrée <b>plus petite</b> (${cc('n - 1')}, ${cc('n // 10')}, la liste sans son premier élément ${cc('L[1:]')})&nbsp;?</li><li><b>Progrès</b> : chaque appel se rapproche-t-il vraiment du cas de base&nbsp;?</li></ol><p>Pour la réduction, fais confiance à l’appel récursif : suppose qu’il renvoie la bonne réponse pour l’entrée plus petite, et demande-toi seulement comment t’en servir.</p>`,
   demo:{enonce:'Écrire <code class="code">nb_chiffres(n)</code>, le nombre de chiffres d’un entier <i>n</i> ≥ 1, puis calculer nb_chiffres(4725).',
    etapes:[
     {f:'Cas de base : si n &lt; 10, n a un seul chiffre, on renvoie 1.',w:'C’est la plus petite entrée possible, et la réponse est immédiate.'},
     {f:'Réduction : n // 10 a un chiffre de moins que n, donc nb_chiffres(n) = 1 + nb_chiffres(n // 10).',w:'n // 10 efface le dernier chiffre. On suppose que l’appel compte bien les chiffres restants.'},
     {f:'Progrès : si n ≥ 10, alors n // 10 &lt; n et n // 10 ≥ 1.',w:'L’entrée diminue strictement et reste valide : on finit par passer sous 10.'},
     {f:py(`
def nb_chiffres(n):
    if n < 10:
        return 1
    return 1 + nb_chiffres(n // 10)`),w:'Le code suit exactement les deux premières réponses.'},
     {f:'nb_chiffres(4725) = 1 + nb_chiffres(472) = 2 + nb_chiffres(47) = 3 + nb_chiffres(4) = 3 + 1 = 4.',w:'On vérifie sur un exemple : 4725 a bien 4 chiffres.'}],
    conclusion:'nb_chiffres(4725) = 4, avec 4 appels.'}},
  {h:'Un appel qui ne progresse pas',p:'Que fait <code class="code">compte([3, 5], 5)</code>&nbsp;?',
   fig:py(`
def compte(L, x):
    if len(L) == 0:
        return 0
    if L[0] == x:
        return 1 + compte(L[1:], x)
    return compte(L, x)`),
   opts:['Elle renvoie 1','Elle renvoie 0','Elle lève IndexError','Elle lève RecursionError'],ans:3,
   why:'L[0] = 3 ≠ 5, donc on appelle compte(L, x) avec la même liste. Rien ne se rapproche du cas de base : les appels s’empilent sans fin. La dernière ligne doit être return compte(L[1:], x).'},
  {kind:'Théorie',h:'Fibonacci naïf : l’arbre explose',p:`<p>La suite de Fibonacci se définit par F(0) = 0, F(1) = 1 et F(n) = F(n − 1) + F(n − 2). On la recopie telle quelle en Python : le code est juste, mais fib(35) prend déjà plusieurs secondes. Pourquoi&nbsp;?</p><div class="def"><p>L’<b>arbre des appels</b> a un nœud par appel ; les enfants d’un nœud sont les appels qu’il lance. Ici, chaque appel avec n ≥ 2 lance <b>deux</b> appels, sur n − 1 et n − 2. Le nombre total d’appels A(n) vérifie A(0) = A(1) = 1 et <b>A(n) = 1 + A(n − 1) + A(n − 2)</b>.</p></div><div class="idea"><p>Les deux sous-arbres ne partagent rien : fib(n − 1) recalcule entièrement fib(n − 2), que l’autre branche calcule aussi. En orange, les appels à fib(2) : 2 pour n = 4, 5 pour n = 6. Le même travail est refait un nombre de fois qui grandit avec n.</p></div><div class="ex"><p>A(2) = 1 + 1 + 1 = 3, A(3) = 1 + 3 + 1 = 5, A(4) = 1 + 5 + 3 = 9. On montre par récurrence que A(n) = 2F(n + 1) − 1 : pour n = 4, 2 · 5 − 1 = 9. Pour fib(30) = 832 040, cela fait 2 692 537 appels.</p></div><div class="why"><p>Pourquoi exponentiel&nbsp;? A est croissante, donc A(n) ≥ 2A(n − 2) : le nombre d’appels au moins double quand n augmente de 2. D’où A(n) ≥ 2<sup>⌊n/2⌋</sup>, environ 1,41ⁿ. En fait A(n) croît comme 1,618ⁿ.</p></div>`,
   params:[{id:'n',l:'n',min:1,max:6,v:4}],
   draw:v=>py(`
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`)+FIB[v.n].svg,
   info:v=>`fib(${v.n}) = ${fibv(v.n)} &nbsp; ${FIB[v.n].calls} appels${FIB[v.n].f2?`, dont ${FIB[v.n].f2} fois fib(2)`:''}<br>${legend([['var(--ok)','cas de base'],['var(--spark)','fib(2)'],['var(--accent)','autres']])}`},
  {kind:'Méthode',h:'Écrire la récurrence du coût',
   p:`<p>Pour compter les appels d’une fonction récursive, note A(n) leur nombre pour l’entrée n, le premier appel compris. Écris :</p><ul><li>le <b>cas de base</b> : A(base) = 1, car l’appel ne lance rien ;</li><li>la <b>récurrence</b> : A(n) = 1 + la somme des A(…) de chaque appel lancé.</li></ul><p>Calcule ensuite un <b>tableau</b> des premières valeurs, devine une formule et vérifie-la. Repères : un appel sur n − 1 donne O(n) ; un appel sur n // 2 donne O(log n) ; deux appels ou plus sur n − 1 donnent un coût exponentiel.</p>`,
   demo:{enonce:'Combien d’appels fait <code class="code">trois(n)</code>&nbsp;?'+py(`
def trois(n):
    if n == 0:
        return 1
    return trois(n - 1) + trois(n - 1) + trois(n - 1)`),
    etapes:[
     {f:'A(0) = 1',w:'trois(0) est le cas de base : un seul appel.'},
     {f:'A(n) = 1 + 3 A(n − 1)',w:'L’appel lui-même, plus trois appels identiques sur n − 1.'},
     {f:tab(['n',0,1,2,3,4],[['A(n)',1,4,13,40,121]]),w:'Chaque valeur vaut 1 + 3 fois la précédente.'},
     {f:'On devine A(n) = (3ⁿ⁺¹ − 1)/2 : (3 − 1)/2 = 1, (9 − 1)/2 = 4, (27 − 1)/2 = 13.',w:'Les valeurs sont proches de 3ⁿ⁺¹/2 : on ajuste la constante. Hérédité : 1 + 3(3ⁿ − 1)/2 = (3ⁿ⁺¹ − 1)/2.'},
     {f:'A(n) = O(3ⁿ)',w:'Chaque niveau triple le nombre d’appels.'}],
    conclusion:'trois(n) fait (3ⁿ⁺¹ − 1)/2 appels, par exemple 121 pour n = 4 : coût exponentiel.'}},
  {h:'Le coût de la version naïve',p:'Combien d’appels à <code class="code">fib</code> (le premier compris) pour calculer <code class="code">fib(7)</code>&nbsp;?',lab:'appels =',ans:41,
   why:'A(0) = A(1) = 1 et A(n) = 1 + A(n − 1) + A(n − 2). Donc A(2) = 3, A(3) = 5, A(4) = 9, A(5) = 15, A(6) = 25, A(7) = 1 + 25 + 15 = 41.'},
  {h:'Une autre récurrence',p:'Combien d’appels à <code class="code">t</code> (le premier compris) pour calculer <code class="code">t(5)</code>&nbsp;?',
   fig:py(`
def t(n):
    if n <= 0:
        return 1
    return t(n - 1) + t(n - 3)`),lab:'appels =',ans:17,
   why:'A(n) = 1 pour n ≤ 0, et A(n) = 1 + A(n − 1) + A(n − 3). A(1) = 1 + 1 + 1 = 3, A(2) = 1 + 3 + 1 = 5, A(3) = 1 + 5 + 1 = 7, A(4) = 1 + 7 + 3 = 11, A(5) = 1 + 11 + 5 = 17.'},
  {kind:'Théorie',h:'Récursion ou itération',p:`<p>Le défaut de fib naïf n’est pas la récursion, c’est de recalculer les mêmes valeurs. Pour F(n), il suffit de connaître les deux termes précédents : une boucle peut les garder en mémoire.</p><div class="prop"><p>Toute fonction récursive peut se réécrire avec une boucle (au besoin en gérant soi-même une pile). La version itérative ci-dessous calcule F(n) en <b>n tours</b>, soit O(n) opérations, avec O(1) mémoire.</p></div><div class="why"><p>Invariant : après <i>k</i> tours, a = F(k) et b = F(k + 1). Au départ, a = 0 = F(0) et b = 1 = F(1). Un tour remplace (F(k), F(k + 1)) par (F(k + 1), F(k) + F(k + 1)) = (F(k + 1), F(k + 2)). À la sortie, k = n et on renvoie a = F(n).</p></div><div class="ex"><p>fib_iter(5) : (a, b) vaut (0, 1), (1, 1), (1, 2), (2, 3), (3, 5), (5, 8). On renvoie 5 après 5 tours, contre 15 appels pour la version naïve.</p></div><div class="idea"><p>Choisis selon le problème. La récursion est naturelle quand le problème se découpe en sous-problèmes <b>différents</b> (tri fusion, parcours d’arbre). Une boucle est préférable pour une simple chaîne n → n − 1, car chaque appel récursif coûte un cadre de pile.</p></div>`,
   fig:py(`
def fib_iter(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`),
   note:'Autre remède : garder dans un dictionnaire les valeurs déjà calculées (on parle de <b>mémoïsation</b>). La version récursive ne calcule alors chaque F(k) qu’une fois, et devient O(n).'},
  {h:'Mémoire de la pile',p:'Combien de mémoire la pile d’appels utilise-t-elle au maximum pour <code class="code">fact(n)</code> récursif&nbsp;?',
   opts:['O(1)','O(log n)','O(n)','O(n²)'],ans:2,
   why:'Au moment du cas de base, les n + 1 appels fact(n), …, fact(0) sont tous en attente sur la pile : O(n). La version itérative, elle, n’utilise que O(1).'},
  {kind:'Méthode',h:'Dérouler une récursion par substitution',
   p:'Pour calculer à la main la valeur d’une fonction récursive, <b>remplace</b> chaque appel par sa définition, en descendant jusqu’au cas de base. Garde en attente ce qui reste à faire autour de l’appel (le « 7 + … »). Une fois au cas de base, remonte en calculant. C’est exactement ce que fait la pile d’appels.',
   demo:{enonce:'Que renvoie <code class="code">g(7)</code>&nbsp;?'+py(`
def g(n):
    if n <= 1:
        return n
    return n + g(n - 2)`),
    etapes:[
     {f:'g(7) = 7 + g(5)',w:'7 &gt; 1 : on applique la ligne récursive. Le « 7 + » attend le résultat de g(5).'},
     {f:'= 7 + 5 + g(3) = 7 + 5 + 3 + g(1)',w:'On substitue de la même façon tant qu’on n’est pas au cas de base.'},
     {f:'g(1) = 1',w:'1 ≤ 1 : cas de base, on renvoie n.'},
     {f:'g(7) = 7 + 5 + 3 + 1 = 16',w:'On remonte : chaque appel en attente ajoute son terme.'}],
    conclusion:'g(7) = 16 : la somme des impairs jusqu’à 7, en 4 appels.'}},
  {kind:'Défi',h:'Que calcule-t-elle&nbsp;?',p:'Que renvoie <code class="code">f(2024)</code>&nbsp;?',
   fig:py(`
def f(n):
    if n == 0:
        return 0
    return n % 10 + f(n // 10)`),
   lab:'f(2024) =',ans:8,
   why:'n % 10 est le dernier chiffre et n // 10 enlève ce chiffre : f fait la somme des chiffres. f(2024) = 4 + 2 + 0 + 2 + f(0) = 8.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : récursivité',p:'<div class="keep"><ul><li>Une fonction <b>récursive</b> a un <b>cas de base</b> (réponse directe) et un <b>cas récursif</b> qui appelle la fonction sur une entrée <b>strictement plus petite</b>. Sans l’un des deux : appels sans fin et <code class="code">RecursionError</code>.</li><li><b>Écrire</b> : cas de base, réduction (faire confiance à l’appel sur l’entrée plus petite), progrès vers le cas de base.</li><li><b>Prouver</b> : récurrence sur la taille de l’entrée (cas de base = initialisation, cas récursif = hérédité) ; la taille qui décroît sert de variant.</li><li><b>Pile d’appels</b> : un cadre par appel en attente. Sa hauteur maximale est la mémoire utilisée, n + 1 cadres pour fact(n).</li><li><b>Compter les appels</b> : A(base) = 1, A(n) = 1 + somme des A des appels lancés. Un appel sur n − 1 : O(n) ; un appel sur n // 2 : O(log n) ; deux appels sur n − 1 ou plus : exponentiel.</li><li><b>Fibonacci naïf</b> : A(n) = 1 + A(n − 1) + A(n − 2) = 2F(n + 1) − 1, exponentiel car les sous-problèmes sont recalculés. La version itérative est en O(n).</li><li><b>Dérouler à la main</b> : substituer chaque appel par sa définition jusqu’au cas de base, puis remonter.</li></ul></div>'},
  {kind:'Problème',h:'L’exponentiation rapide',p:`Pour calculer <i>x</i>ⁿ, on utilise <i>x</i>ⁿ = (<i>x</i>ⁿᐟ²)² si <i>n</i> est pair et <i>x</i>ⁿ = <i>x</i> · <i>x</i>ⁿ⁻¹ si <i>n</i> est impair. La fonction calcule une seule fois la moitié, puis l’élève au carré. On compte les appels à <code class="code">puiss</code>, le premier compris.`+py(`
def puiss(x, n):
    if n == 0:
        return 1
    if n % 2 == 0:
        y = puiss(x, n // 2)
        return y * y
    return x * puiss(x, n - 1)`),
   parts:[
    {q:'a) Combien d’appels pour <code class="code">puiss(2, 10)</code>&nbsp;?',lab:'appels =',ans:6,hint:'Suis la suite des valeurs de n : 10, puis 5, puis…',why:'n vaut 10, 5, 4, 2, 1, 0 : 6 appels, et le résultat est 1024.'},
    {q:'b) Combien d’appels pour <code class="code">puiss(3, 13)</code>&nbsp;?',lab:'appels =',ans:7,hint:'Un n impair perd 1, un n pair est divisé par 2.',why:'n vaut 13, 12, 6, 3, 2, 1, 0 : 7 appels.'},
    {q:'c) Quelle est la complexité de <code class="code">puiss</code> en nombre d’appels&nbsp;?',opts:['O(n)','O(log n)','O(n log n)','O(1)'],ans:1,hint:'Après au plus deux appels de suite, que devient n&nbsp;?',why:'Un appel impair donne un n pair, qui est ensuite divisé par 2. n est donc au moins divisé par 2 tous les deux appels : au plus environ 2 log₂ n appels, O(log n).'},
    {q:'d) Un élève remplace les lignes 6 et 7 par <code class="code">return puiss(x, n // 2) * puiss(x, n // 2)</code>. Combien d’appels pour <code class="code">puiss(3, 8)</code>&nbsp;?',lab:'appels =',ans:23,hint:'Note A(n) le nombre d’appels. Ici A(n) = 1 + 2A(n/2) pour n pair, et A(1) = 1 + A(0) = 2.',why:'A(1) = 2, A(2) = 1 + 2 · 2 = 5, A(4) = 1 + 2 · 5 = 11, A(8) = 1 + 2 · 11 = 23. Le résultat est juste, mais les deux appels identiques font perdre tout le gain.'},
   ],
   sol:`<p>Le cas pair divise n par 2 avec un seul appel. Le cas impair retire 1 et rend n pair. Pour n = 10 : 10 → 5 → 4 → 2 → 1 → 0, 6 appels. Pour n = 13 : 13 → 12 → 6 → 3 → 2 → 1 → 0, 7 appels.</p><p>n est au moins divisé par 2 tous les deux appels, donc le nombre d’appels est au plus environ 2 log₂ n + 2 : O(log n), contre n + 1 appels pour la récursion naïve x · xⁿ⁻¹.</p><p>Si on écrit deux fois puiss(x, n // 2), chaque appel pair en lance deux. A(n) = 1 + 2A(n/2) donne A(8) = 23 et, pour n = 2ᵏ, A(n) = 3n − 1 : on revient à O(n). Garder le résultat dans une variable y est donc essentiel.</p>`},
  {kind:'Problème',h:'Les tours de Hanoï',p:`On doit déplacer <i>n</i> disques de la tour <i>a</i> vers la tour <i>c</i>, en s’aidant de <i>b</i>, sans jamais poser un disque sur un plus petit. Pour cela, on déplace les <i>n</i> − 1 disques du haut vers <i>b</i>, puis le grand disque vers <i>c</i>, puis les <i>n</i> − 1 disques de <i>b</i> vers <i>c</i>. La fonction affiche chaque déplacement et renvoie leur nombre.`+py(`
def h(n, a, b, c):
    if n == 0:
        return 0
    m = h(n - 1, a, c, b)
    print(a, '->', c)
    return m + 1 + h(n - 1, b, a, c)

h(3, 'A', 'B', 'C')`),
   parts:[
    {q:'a) Que renvoie <code class="code">h(5, \'A\', \'B\', \'C\')</code>&nbsp;?',lab:'déplacements =',ans:31,hint:'Note D(n) la valeur renvoyée : D(0) = 0 et D(n) = 2D(n − 1) + 1.',why:'D(1) = 1, D(2) = 3, D(3) = 7, D(4) = 15, D(5) = 31. En général D(n) = 2ⁿ − 1.'},
    {q:'b) Combien d’appels à <i>h</i> (le premier compris, et les appels avec n = 0) pour <code class="code">h(3, \'A\', \'B\', \'C\')</code>&nbsp;?',lab:'appels =',ans:15,hint:'Note C(n) le nombre d’appels : C(0) = 1 et chaque appel avec n ≥ 1 en lance deux.',why:'C(n) = 1 + 2C(n − 1) avec C(0) = 1 : C(1) = 3, C(2) = 7, C(3) = 15. En général C(n) = 2ⁿ⁺¹ − 1.'},
    {q:'c) Quelle est la première ligne affichée par <code class="code">h(3, \'A\', \'B\', \'C\')</code>&nbsp;?',opts:['<code class=\"code\">A -&gt; B</code>','<code class=\"code\">A -&gt; C</code>','<code class=\"code\">B -&gt; C</code>','<code class=\"code\">C -&gt; B</code>'],ans:1,hint:'Descends toujours dans le premier appel récursif jusqu’à n = 1. Attention : b et c s’échangent à chaque niveau.',why:'h(3, A, B, C) appelle h(2, A, C, B), qui appelle h(1, A, B, C). Celui-ci affiche A -> C, la tour c de cet appel. Le plus petit disque va donc d’abord en C.'},
    {q:'d) Quelle est la complexité de <i>h</i>&nbsp;?',opts:['O(n)','O(n²)','O(2ⁿ)','O(n log n)'],ans:2,hint:'Regarde les formules trouvées en a) et b).',why:'Il y a 2ⁿ − 1 déplacements et 2ⁿ⁺¹ − 1 appels : O(2ⁿ). Ajouter un disque double presque le travail.'},
   ],
   sol:`<p>Le nombre de déplacements vérifie D(0) = 0 et D(n) = D(n − 1) + 1 + D(n − 1) = 2D(n − 1) + 1. Par récurrence, D(n) = 2ⁿ − 1, donc D(5) = 31.</p><p>Le nombre d’appels vérifie C(0) = 1 et C(n) = 1 + 2C(n − 1), d’où C(n) = 2ⁿ⁺¹ − 1 et C(3) = 15.</p><p>Pour la première ligne, on suit les premiers appels : h(3, A, B, C) → h(2, A, C, B) → h(1, A, B, C) → h(0, …), qui ne fait rien. On revient dans h(1, A, B, C), qui affiche A -> C.</p><p>La séquence complète pour n = 3 est A→C, A→B, C→B, A→C, B→A, B→C, A→C : 7 déplacements. Le coût est en O(2ⁿ), et on peut montrer qu’aucune méthode ne fait moins de 2ⁿ − 1 déplacements.</p>`},
]},

/* ================= 4. Recherche ================= */
{subj:'ics', sem:'algo', id:'ics-recherche', h:'Recherche linéaire et dichotomique', p:'Chercher un élément, et aller beaucoup plus vite quand la liste est triée.', steps:[
  {kind:'Théorie',h:'La recherche linéaire',p:`<p>Chercher un nom dans une pile de copies non rangées : on n’a pas d’autre choix que de les regarder une par une. C’est la méthode la plus simple, et la seule possible quand on ne sait rien sur l’ordre des éléments.</p><div class="def"><p>La <b>recherche linéaire</b> (ou séquentielle) compare <i>x</i> à L[0], L[1], L[2]… dans l’ordre. Elle renvoie l’indice de la <b>première</b> case égale à <i>x</i>, ou −1 si aucune ne l’est. Par convention, −1 signifie « absent », car aucun indice valide n’est négatif.</p></div><div class="why"><p>Invariant : au début du tour <i>i</i>, <i>x</i> n’est dans aucune des cases L[0], …, L[i − 1]. Si on sort de la boucle sans avoir trouvé, l’invariant vaut pour i = n : <i>x</i> n’est nulle part, et −1 est la bonne réponse.</p></div><div class="ex"><p>L = [7, 3, 9, 3]. Pour x = 9 : 7, 3, puis 9, trouvé à l’indice 2 en 3 comparaisons. Pour x = 3 : on renvoie 1 en 2 comparaisons, la seconde occurrence n’est pas vue. Pour x = 5 : 4 comparaisons, puis −1.</p></div><div class="idea"><p>Coût : 1 comparaison dans le meilleur cas, <b>n</b> dans le pire (<i>x</i> absent ou en dernier), donc O(n). Elle marche sur <b>n’importe quelle liste</b>. Le test <code class="code">x in L</code> de Python fait exactement ce travail.</p></div>`,
   fig:py(`
def recherche(L, x):
    for i in range(len(L)):
        if L[i] == x:
            return i
    return -1`)},
  {h:'Le pire cas',p:'Une liste contient 50 éléments et <i>x</i> n’y est pas. Combien de comparaisons <code class="code">L[i] == x</code> fait la recherche linéaire&nbsp;?',lab:'comparaisons =',ans:50,
   why:'Pour conclure que x est absent, il faut l’avoir comparé à chacun des 50 éléments.'},
  {kind:'Théorie',h:'La dichotomie',p:`<p>Dans un dictionnaire, personne ne lit les mots un par un : on ouvre au milieu, on regarde si le mot cherché est avant ou après, et on recommence dans la bonne moitié. Cela marche parce que les mots sont <b>rangés</b>.</p><div class="def"><p>La <b>dichotomie</b> (recherche binaire) s’applique à une liste <b>triée</b> par ordre croissant. On garde une zone L[g..d] où <i>x</i> peut encore se trouver. À chaque tour : m = (g + d) // 2 ; si L[m] = x, on a trouvé ; si L[m] &lt; x, on garde la droite (g = m + 1) ; sinon la gauche (d = m − 1). Si la zone devient vide (g &gt; d), <i>x</i> est absent.</p></div><div class="why"><p>Invariant : <b>si x est dans L, il est dans L[g..d]</b>. Si L[m] &lt; x, alors comme la liste est triée, L[0], …, L[m] sont tous ≤ L[m] &lt; x : aucun n’est x, et on peut les jeter. Le cas L[m] &gt; x est symétrique. Variant : la taille d − g + 1 de la zone, qui baisse d’au moins 1 puisque m est exclu.</p></div><div class="ex"><p>L = [2, 5, 8, 12, 16, 23, 38], x = 16. (g, d) = (0, 6), m = 3, L[3] = 12 &lt; 16 : g = 4. m = 5, L[5] = 23 &gt; 16 : d = 4. m = 4, L[4] = 16 : trouvé en 3 tours.</p></div>`,
   fig:py(`
def dichotomie(L, x):
    g, d = 0, len(L) - 1
    while g <= d:
        m = (g + d) // 2
        if L[m] == x:
            return m
        elif L[m] < x:
            g = m + 1
        else:
            d = m - 1
    return -1`)},
  {h:'Les bornes bougent',p:`<p>Choisis une cible et avance tour par tour. La liste a 15 éléments triés. Les barres grises sont éliminées, la barre orange est L[m], celle qu’on compare à <i>x</i>, et les lettres g, d, m marquent les indices.</p><div class="idea"><p>Observe la taille de la zone encore colorée : 15, puis 7, puis 3, puis 1. Chaque tour garde une moitié et jette l’autre <b>avec</b> le milieu. C’est pour cela que 15 éléments demandent au plus 4 tours.</p></div><div class="ex"><p>Pour x = 23 : m = 7, L[7] = 45 &gt; 23, donc d = 6. Puis m = 3, L[3] = 12 &lt; 23, donc g = 4. Puis m = 5 et L[5] = 23 : trouvé au 3e tour. Pour x = 50, absent : les milieux sont 45, 81, 67, 56, puis g = 8 &gt; d = 7 et la fonction renvoie −1.</p></div><div class="warn"><p>Une seule borne bouge par tour, et elle passe <b>de l’autre côté</b> de m (m + 1 ou m − 1). Recalcule m avec les nouvelles bornes, jamais avec les anciennes.</p></div>`,
   params:[{id:'c',l:'Cible',min:0,max:CIBLES.length-1,v:11},{id:'k',l:'Étape',min:0,max:DTMAX,v:0}],
   draw:v=>dichoFig(DT[v.c],v.k),
   info:v=>{ const t=DT[v.c]; return `x = <b>${CIBLES[v.c]}</b> &nbsp; ${t[Math.min(v.k,t.length-1)].msg}`; }},
  {kind:'Méthode',h:'Simuler une dichotomie avec un tableau',
   p:'Écris les indices sous la liste. Puis fais un tableau avec les colonnes <b>g</b>, <b>d</b>, <b>m</b>, <b>L[m]</b> et <b>décision</b>. À chaque tour : m = (g + d) // 2 (division entière, donc arrondi vers le bas), compare L[m] à x, puis mets à jour <b>une seule</b> borne : g = m + 1 si L[m] &lt; x, d = m − 1 si L[m] &gt; x. On s’arrête si L[m] = x, ou quand g &gt; d : la zone est vide et x est absent.',
   demo:{enonce:'Chercher 20, puis 7, dans la liste triée ci-dessous.'+py(`
L = [1, 4, 6, 9, 13, 17, 20, 25, 31]
#    0  1  2  3   4   5   6   7   8   (indices)`),
    etapes:[
     {f:'x = 20 :'+tab(['g','d','m','L[m]','décision'],[[0,8,4,13,'13 &lt; 20 : g = 5'],[5,8,6,20,'trouvé']]),w:'(0 + 8) // 2 = 4, puis (5 + 8) // 2 = 6, arrondi vers le bas. Trouvé en 2 tours.'},
     {f:'x = 7 :'+tab(['g','d','m','L[m]','décision'],[[0,8,4,13,'13 &gt; 7 : d = 3'],[0,3,1,4,'4 &lt; 7 : g = 2'],[2,3,2,6,'6 &lt; 7 : g = 3'],[3,3,3,9,'9 &gt; 7 : d = 2']]),w:'On ne recalcule m qu’avec les nouvelles bornes. Un seul élément dans la zone (g = d = 3) fait encore un tour.'},
     {f:'Après le 4e tour : g = 3 &gt; d = 2, on renvoie −1.',w:'La zone [g ; d] est vide : 7 n’est pas dans la liste, et il se placerait à l’indice g = 3, entre 6 et 9.'}],
    conclusion:'20 est trouvé à l’indice 6 en 2 tours ; 7 est déclaré absent après 4 tours.'}},
  {h:'Les milieux successifs',p:'On cherche <i>x</i> = 4 dans <code class="code">L = [3, 7, 10, 14, 18, 21, 27, 30]</code> avec la fonction <code class="code">dichotomie</code>. Quelles sont les valeurs successives de <i>m</i>&nbsp;?',
   opts:['3, 1','4, 2, 1, 0','3, 1, 0','3, 1, 0, 1'],ans:2,
   why:'g = 0, d = 7 : m = 3, 14 &gt; 4, d = 2. m = 1, 7 &gt; 4, d = 0. m = 0, 3 &lt; 4, g = 1. Puis g = 1 &gt; d = 0 : on s’arrête après 3 tours et on renvoie −1.'},
  {kind:'Pratique',h:'Le chemin le plus long',p:'Choisis une cible <b>présente</b> dans la liste que la dichotomie ne trouve qu’au <b>4e tour</b>.',
   params:[{id:'c',l:'Cible',min:0,max:LD.length-1,v:7}],
   draw:v=>dichoFig(DT[v.c],DTMAX),
   info:v=>`x = ${CIBLES[v.c]} : trouvé en ${toursD(DT[v.c])} tour(s)`,
   ok:v=>toursD(DT[v.c])===4,
   why:'Les éléments d’indice pair (2, 8, 16, 38, 56, 72, 90, 99) sont tout en bas de l’arbre de décision : il faut 4 tours. Le milieu, 45, est trouvé en 1 tour.'},
  {kind:'Théorie',h:'Combien de tours au plus&nbsp;?',p:`<p>On sent que la dichotomie est rapide. Combien de tours fait-elle exactement dans le pire cas, pour <i>n</i> éléments&nbsp;?</p><div class="prop"><p>Un tour fait passer une zone de <i>k</i> éléments à au plus <b>⌊k/2⌋</b> éléments. Avec <i>t</i> tours, on peut traiter au plus <b>2ᵗ − 1</b> éléments. Le nombre maximal de tours sur <i>n</i> éléments est donc le plus petit <i>t</i> tel que 2ᵗ − 1 ≥ n, c’est-à-dire ⌈log₂(n + 1)⌉.</p></div><div class="why"><p>Le milieu m coupe la zone en une partie gauche de ⌊(k − 1)/2⌋ éléments et une droite de ⌈(k − 1)/2⌉ = ⌊k/2⌋ éléments, et m lui-même est éliminé. Notons N(t) la plus grande zone qu’on vide en <i>t</i> tours : N(1) = 1, et N(t) = 2N(t − 1) + 1, car un tour élimine m puis laisse au pire une moitié qui doit tenir en t − 1 tours. D’où N(t) = 2ᵗ − 1.</p></div><div class="ex"><p>n = 15 : 15 → 7 → 3 → 1 → 0, soit 4 tours, et 2⁴ − 1 = 15. n = 16 : 16 → 8 → 4 → 2 → 1 → 0, soit 5 tours. Un élément de plus coûte un tour de plus.</p></div>`,
   fig:`<p style="text-align:center;font-size:20px"><b>⌈log₂(n + 1)⌉</b></p><p style="text-align:center;color:var(--muted)">n = 1, 3, 7, 15, 31 → 1, 2, 3, 4, 5 tours</p>`,
   note:'Doubler la taille de la liste n’ajoute qu’<b>un</b> tour : la dichotomie est en O(log n).'},
  {kind:'Méthode',h:'Borner le nombre de tours avec les puissances de 2',
   p:'Pour le nombre maximal de tours de la dichotomie sur <i>n</i> éléments, cherche le plus petit <i>t</i> tel que <b>2ᵗ ≥ n + 1</b>. Pour cela, encadre n + 1 entre deux puissances de 2 consécutives : 2ᵗ⁻¹ &lt; n + 1 ≤ 2ᵗ. Garde en tête les premières puissances : 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024.',
   demo:{enonce:'Combien de tours au plus pour une liste triée de 100 éléments&nbsp;?',
    etapes:[
     {f:'n + 1 = 101',w:'Avec t tours, on traite au plus 2ᵗ − 1 éléments : il faut 2ᵗ − 1 ≥ n, soit 2ᵗ ≥ n + 1.'},
     {f:'2⁶ = 64 &lt; 101 ≤ 128 = 2⁷',w:'On place 101 entre deux puissances de 2 consécutives.'},
     {f:'t = 7',w:'C’est l’exposant de la puissance du dessus : ⌈log₂ 101⌉ = 7.'},
     {f:'Contrôle : avec 6 tours, on ne traite que 2⁶ − 1 = 63 éléments, moins que 100.',w:'On vérifie que t − 1 tours ne suffiraient pas.'}],
    conclusion:'Au plus 7 tours pour 100 éléments, contre 100 comparaisons pour la recherche linéaire.'}},
  {h:'Mille éléments',p:'Combien de tours au plus fait la dichotomie sur une liste triée de 1000 éléments&nbsp;?',lab:'tours =',ans:10,
   why:'⌈log₂(1001)⌉ = 10, car 2⁹ = 512 &lt; 1001 ≤ 1024 = 2¹⁰.'},
  {h:'Sans la précondition',p:'On applique <code class="code">dichotomie([4, 1, 9, 7, 3], 1)</code>. Que se passe-t-il&nbsp;?',
   opts:['Elle renvoie 1','Elle renvoie −1 alors que 1 est présent','Elle boucle sans fin','Elle trie d’abord la liste'],ans:1,
   why:'g = 0, d = 4, m = 2 : L[2] = 9 &gt; 1, donc d = 1. Puis m = 0 : L[0] = 4 &gt; 1, donc d = −1 et on sort avec −1. La liste n’étant pas triée, l’élimination d’une moitié n’est plus justifiée.'},
  {kind:'Défi',h:'Un million',p:'Une liste triée contient 1 000 000 d’éléments. Combien de tours au plus fait la dichotomie&nbsp;?',lab:'tours =',ans:20,
   why:'2¹⁹ = 524 288 &lt; 1 000 001 ≤ 2²⁰ = 1 048 576, donc ⌈log₂(1 000 001)⌉ = 20. La recherche linéaire pourrait faire un million de comparaisons.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : recherche',p:'<div class="keep"><ul><li><b>Recherche linéaire</b> : on compare <i>x</i> à chaque case dans l’ordre ; première occurrence ou −1. Marche sur toute liste ; 1 comparaison au mieux, <i>n</i> au pire : O(n).</li><li><b>Dichotomie</b> : liste <b>triée</b> obligatoire. m = (g + d) // 2 ; L[m] &lt; x ⟹ g = m + 1 ; L[m] &gt; x ⟹ d = m − 1 ; arrêt si L[m] = x ou si g &gt; d (absent).</li><li><b>Invariant</b> : si <i>x</i> est dans L, il est dans L[g..d]. <b>Variant</b> : d − g + 1. À la sortie d’une recherche infructueuse, g est l’indice où insérer <i>x</i>.</li><li><b>Simuler</b> : tableau g, d, m, L[m], décision ; une seule borne bouge par tour.</li><li><b>Nombre maximal de tours</b> : ⌈log₂(n + 1)⌉, le plus petit <i>t</i> avec 2ᵗ ≥ n + 1. Encadre n + 1 entre deux puissances de 2. 1000 éléments : 10 tours ; un million : 20.</li><li>Doubler la taille n’ajoute qu’<b>un</b> tour : O(log n).</li><li>Sur une liste non triée, la dichotomie peut répondre −1 alors que <i>x</i> est présent.</li></ul></div>'},
  {kind:'Problème',h:'Trace d’une dichotomie',p:`On applique la fonction <code class="code">dichotomie</code> du cours à la liste triée de 11 éléments ci-dessous. Un <b>tour</b> est un passage dans la boucle while, avec calcul de <i>m</i>. On cherche une valeur présente, puis une valeur absente.`+py(`
L = [3, 8, 11, 15, 21, 27, 34, 40, 46, 52, 59]
#    0  1   2   3   4   5   6   7   8   9  10   (indices)`),
   parts:[
    {q:'a) Combien de tours pour <code class="code">dichotomie(L, 46)</code>&nbsp;?',lab:'tours =',ans:2,hint:'Au départ g = 0 et d = 10. Calcule m = (g + d) // 2 et compare L[m] à 46.',why:'m = 5 : L[5] = 27 &lt; 46, donc g = 6. m = (6 + 10) // 2 = 8 : L[8] = 46, trouvé en 2 tours.'},
    {q:'b) Pour <code class="code">dichotomie(L, 10)</code>, quelles sont les valeurs successives de <i>m</i>&nbsp;?',opts:['5, 2, 1','5, 2, 0, 1','5, 1, 0','5, 3, 1, 0'],ans:1,hint:'Après chaque comparaison, mets à jour g ou d, puis recalcule m. Continue tant que g ≤ d.',why:'m = 5 (27 &gt; 10, d = 4), m = 2 (11 &gt; 10, d = 1), m = 0 (3 &lt; 10, g = 1), m = 1 (8 &lt; 10, g = 2). Puis g = 2 &gt; d = 1 : on renvoie −1.'},
    {q:'c) À la sortie de la boucle pour <i>x</i> = 10, que vaut <i>g</i>&nbsp;?',lab:'g =',ans:2,hint:'Reprends la fin de la trace de b).',why:'Le dernier tour fait g = m + 1 = 2, et d vaut 1.'},
    {q:'d) Quand <i>x</i> est absent, que représente la valeur finale de <i>g</i>&nbsp;?',opts:['L’indice du plus grand élément de L','Le nombre de tours effectués','L’indice où insérer x pour que L reste triée','Toujours len(L) // 2'],ans:2,hint:'Pour x = 10, g = 2 : où faudrait-il placer 10 dans L&nbsp;?',why:'Invariant : tout élément avant g est &lt; x, tout élément après d est &gt; x. À la sortie g = d + 1, donc x se place exactement à l’indice g. Pour 10, c’est entre 8 et 11, à l’indice 2.'},
   ],
   sol:`<p>Pour x = 46 : (g, d) = (0, 10), m = 5, 27 &lt; 46, g = 6. Puis m = 8 et L[8] = 46 : trouvé en 2 tours.</p><p>Pour x = 10 : m = 5 (d = 4), m = 2 (d = 1), m = 0 (g = 1), m = 1 (g = 2). La zone est vide (g = 2 &gt; d = 1) après 4 tours, et on renvoie −1. Ce sont 4 tours, soit ⌈log₂ 12⌉ = 4 au plus pour 11 éléments.</p><p>On a toujours L[i] &lt; x pour i &lt; g et L[i] &gt; x pour i &gt; d. À la sortie, g = d + 1 : tous les éléments avant g sont plus petits que x et tous les autres plus grands. g est donc la position d’insertion de x, ici 2. Une recherche infructueuse donne cette information gratuitement.</p>`},
  {kind:'Problème',h:'Première occurrence et boucle infinie',p:`Cette variante de la dichotomie renvoie l’indice de la <b>première</b> occurrence de <i>x</i> dans une liste triée non vide, ou −1. Elle s’arrête quand <i>g</i> = <i>d</i>, et ne teste l’égalité qu’à la fin. Remarque la mise à jour <code class="code">d = m</code>, sans le −1 habituel.`+py(`
def premiere(L, x):
    g, d = 0, len(L) - 1
    while g < d:
        m = (g + d) // 2
        if L[m] < x:
            g = m + 1
        else:
            d = m
    return g if L[g] == x else -1

L = [1, 3, 3, 3, 5, 8, 9]`),
   parts:[
    {q:'a) Que renvoie <code class="code">premiere(L, 3)</code>&nbsp;?',lab:'résultat =',ans:1,hint:'Quand L[m] vaut 3, on garde m dans la zone avec d = m et on continue à gauche.',why:'La première occurrence de 3 est à l’indice 1 : la fonction renvoie 1.'},
    {q:'b) Combien de tours fait cet appel&nbsp;?',lab:'tours =',ans:3,hint:'Départ (g, d) = (0, 6). Calcule m, puis la nouvelle zone, jusqu’à g = d.',why:'m = 3 : L[3] = 3, d = 3. m = 1 : L[1] = 3, d = 1. m = 0 : L[0] = 1 &lt; 3, g = 1. g = d = 1 : 3 tours.'},
    {q:'c) Un élève écrit <code class="code">g = m</code> au lieu de <code class="code">g = m + 1</code>. Que fait <code class="code">premiere([1, 3], 3)</code>&nbsp;?',opts:['Elle renvoie 1','Elle renvoie −1','Elle lève IndexError','Elle boucle sans fin'],ans:3,hint:'Avec g = 0 et d = 1, que vaut m&nbsp;? Et la zone change-t-elle&nbsp;?',why:'m = (0 + 1) // 2 = 0 et L[0] = 1 &lt; 3, donc g = m = 0. Rien ne change : la boucle tourne pour toujours.'},
    {q:'d) Pourquoi la version correcte, avec <code class="code">d = m</code>, termine-t-elle toujours&nbsp;?',opts:['Car d diminue de 1 à chaque tour','Car si g &lt; d, alors m = (g + d) // 2 est strictement inférieur à d, donc d − g diminue dans les deux branches','Car la liste est triée','Car m est toujours pair'],ans:1,hint:'Le variant est d − g. Montre qu’il baisse quand g devient m + 1, puis quand d devient m.',why:'Si g &lt; d, alors g ≤ m &lt; d. g = m + 1 &gt; g et d = m &lt; d font tous les deux baisser d − g, qui reste ≥ 0. La boucle s’arrête. Le danger est seulement g = m, puisque m peut valoir g.'},
   ],
   sol:`<p><b>Invariant</b> : si x est dans L, sa première occurrence est dans L[g..d]. Si L[m] &lt; x, elle est après m : g = m + 1. Sinon L[m] ≥ x, et la première occurrence est en m ou avant : d = m, sans exclure m.</p><p>Trace pour x = 3 : (0, 6) → m = 3 → (0, 3) → m = 1 → (0, 1) → m = 0 → (1, 1). 3 tours, L[1] = 3 : on renvoie 1.</p><p><b>Terminaison</b> : tant que g &lt; d, on a g ≤ m &lt; d, car la division entière arrondit vers le bas. Les deux branches font baisser l’entier d − g ≥ 0.</p><p>Avec g = m, la branche L[m] &lt; x ne fait rien progresser quand m = g, par exemple pour d = g + 1. premiere([1, 3], 3) boucle alors sans fin.</p>`},
]},

/* ================= 5. Tris simples ================= */
{subj:'ics', sem:'algo', id:'ics-tris', h:'Tris simples', p:'Insertion, bulles et sélection, pas à pas, et pourquoi ils coûtent O(n²).', steps:[
  {kind:'Théorie',h:'Le tri par insertion',p:`<p>Trier une liste sert partout : afficher un classement, préparer une dichotomie, repérer des doublons. Le premier tri que l’on fait sans y penser est celui d’une main de cartes : on prend les cartes une à une et on glisse chacune à sa place parmi celles déjà rangées.</p><div class="def"><p><b>Tri par insertion</b> : pour i = 1, 2, …, n − 1, l’élément L[i] recule vers la gauche, par échanges avec son voisin, tant que ce voisin est plus grand que lui. Le tri est <b>en place</b> : il modifie L sans créer d’autre liste.</p></div><div class="why"><p>Invariant : à la fin du tour <i>i</i>, <b>L[0..i] contient les i + 1 premiers éléments de départ, triés</b>. Au tour suivant, L[i + 1] recule et s’arrête juste derrière le premier élément plus petit ou égal : le préfixe L[0..i + 1] est trié. À la fin, i = n − 1 et toute la liste est triée.</p></div><div class="ex"><p>[5, 2, 4, 1]. Tour i = 1 : 2 passe devant 5, [2, 5, 4, 1]. Tour i = 2 : 4 passe devant 5, s’arrête derrière 2, [2, 4, 5, 1]. Tour i = 3 : 1 recule jusqu’au début, [1, 2, 4, 5]. En tout 6 comparaisons et 5 échanges.</p></div><div class="idea"><p>Coût : une liste à l’envers fait reculer chaque élément jusqu’au début, soit 1 + 2 + … + (n − 1) = n(n − 1)/2 comparaisons, O(n²). Une liste déjà triée ne demande qu’une comparaison par élément : n − 1, O(n).</p></div>`,
   fig:py(`
def tri_insertion(L):
    for i in range(1, len(L)):
        j = i
        while j > 0 and L[j-1] > L[j]:
            L[j-1], L[j] = L[j], L[j-1]
            j = j - 1`)},
  {h:'Insertion pas à pas',p:`<p>Avance étape par étape sur la liste [5, 2, 9, 1, 6, 3, 8, 4]. Chaque étape est <b>une comparaison</b> entre deux voisins, en orange. Les barres vertes forment le préfixe déjà trié.</p><div class="idea"><p>Une comparaison a deux issues. Si le voisin de gauche est plus grand, on échange et l’élément recule d’une case. Sinon, l’élément est à sa place et le tour s’arrête. Donc le nombre de comparaisons est égal au nombre d’<b>échanges</b>, plus un <b>arrêt</b> par tour, sauf quand l’élément recule jusqu’à la case 0, où il s’arrête sans comparer.</p></div><div class="ex"><p>Au tour i = 3, l’élément 1 trouve le préfixe [2, 5, 9]. Il passe devant 9, puis devant 5, puis devant 2 : 3 comparaisons, 3 échanges, et il arrive en case 0 sans comparaison d’arrêt. Au tour i = 4, l’élément 6 passe devant 9, puis s’arrête derrière 5 : 2 comparaisons, 1 échange.</p></div><div class="warn"><p>Le coût dépend de l’ordre de départ, pas seulement de la longueur : c’est la différence avec le tri par sélection, qui fait toujours le même nombre de comparaisons.</p></div>`,
   params:[{id:'k',l:'Étape',min:0,max:TINS.length-1,v:0}],
   draw:v=>sortStep(TINS,v.k),
   info:v=>`${TINS[v.k].msg}<br>${sortLeg}`,
   note:`Sur cette liste : ${TINS.length-2} comparaisons. Sur une liste déjà triée, chaque élément ne fait qu’une comparaison.`},
  {kind:'Méthode',h:'Dérouler un tri passe par passe',
   p:`<p>Pour prédire l’état d’une liste, ne simule pas chaque comparaison : applique la <b>règle d’une passe</b> (un tour de la boucle extérieure), et écris la liste après chaque passe en marquant la partie triée.</p><ul><li><b>Insertion</b>, passe i : l’élément L[i] recule vers la gauche tant que son voisin est plus grand. Les cases 0 à i sont alors triées.</li><li><b>Bulles</b>, passe p : on balaie les voisins de gauche à droite, en échangeant chaque paire mal rangée. Le plus grand élément restant arrive au bout.</li><li><b>Sélection</b>, passe i : on cherche le minimum des cases i à n − 1 et on l’échange avec la case i. Un seul échange par passe.</li></ul>`,
   demo:{enonce:'Trier [4, 1, 3, 2] par insertion, passe par passe, et compter les échanges.',
    etapes:[
     {f:'Passe i = 1 : 1 recule devant 4. [<b>1, 4</b>, 3, 2], 1 échange.',w:'Le préfixe trié [4] reçoit 1, qui va tout au début.'},
     {f:'Passe i = 2 : 3 recule devant 4, mais pas devant 1. [<b>1, 3, 4</b>, 2], 1 échange.',w:'On s’arrête dès que le voisin de gauche est plus petit : 1 &lt; 3.'},
     {f:'Passe i = 3 : 2 recule devant 4, puis devant 3. [<b>1, 2, 3, 4</b>], 2 échanges.',w:'2 s’insère entre 1 et 3.'}],
    conclusion:'La liste est triée après 3 passes et 1 + 1 + 2 = 4 échanges.'}},
  {h:'Après deux tours',p:'On applique le tri par insertion à <code class="code">[7, 3, 5, 1]</code>. À quoi ressemble la liste à la fin du tour <i>i</i> = 2&nbsp;?',
   opts:['[3, 7, 5, 1]','[1, 3, 5, 7]','[3, 5, 7, 1]','[3, 5, 1, 7]'],ans:2,
   why:'Tour i = 1 : 3 passe devant 7, on obtient [3, 7, 5, 1]. Tour i = 2 : 5 passe devant 7 mais pas devant 3, on obtient [3, 5, 7, 1]. Le 1 n’a pas encore été traité.'},
  {kind:'Théorie',h:'Le tri à bulles',p:`<p>Autre idée : au lieu d’insérer, on corrige localement. Tant que deux voisins sont dans le mauvais ordre, on les échange. Le code est en dessous de la figure.</p><div class="def"><p>Une <b>passe</b> du <b>tri à bulles</b> compare L[0] et L[1], puis L[1] et L[2], et ainsi de suite jusqu’à la fin de la zone non triée, en échangeant chaque paire où le gauche est plus grand. La passe <i>i</i> (en comptant depuis 0) s’arrête avant les <i>i</i> dernières cases.</p></div><div class="why"><p>Invariant : <b>après p passes, les p plus grands éléments sont à leur place finale</b>, au bout de la liste. Pendant une passe, dès que le plus grand élément restant est atteint, il gagne toutes les comparaisons suivantes et il est poussé jusqu’au bout de la zone, comme une bulle qui remonte.</p></div><div class="ex"><p>[5, 2, 9, 1]. Passe 1 : 5 &gt; 2 échange, 5 &lt; 9 rien, 9 &gt; 1 échange : [2, 5, 1, 9], le 9 est placé. Passe 2 sur les trois premières cases : [2, 1, 5, 9]. Passe 3 : [1, 2, 5, 9].</p></div><div class="idea"><p>La version du cours fait toujours (n − 1) + (n − 2) + … + 1 = n(n − 1)/2 comparaisons : O(n²) même sur une liste triée. Un petit élément placé à la fin ne recule que d’une case par passe : c’est lui qui rend le tri lent.</p></div>`,
   params:[{id:'k',l:'Étape',min:0,max:TBUB.length-1,v:0}],
   draw:v=>sortStep(TBUB,v.k),
   info:v=>`${TBUB[v.k].msg}<br>${sortLeg}`,
   note:py(`
def tri_bulles(L):
    n = len(L)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if L[j] > L[j+1]:
                L[j], L[j+1] = L[j+1], L[j]`)},
  {h:'Une passe de bulles',p:'On fait <b>une seule</b> passe du tri à bulles sur <code class="code">[4, 3, 1, 5, 2]</code>. Quelle liste obtient-on&nbsp;?',
   opts:['[3, 4, 1, 2, 5]','[1, 3, 4, 2, 5]','[3, 1, 4, 5, 2]','[3, 1, 4, 2, 5]'],ans:3,
   why:'4 &gt; 3 : échange, [3, 4, 1, 5, 2]. 4 &gt; 1 : échange, [3, 1, 4, 5, 2]. 4 &lt; 5 : rien. 5 &gt; 2 : échange, [3, 1, 4, 2, 5]. Le maximum 5 est arrivé au bout.'},
  {h:'Compter les comparaisons',p:'Combien de comparaisons <code class="code">L[j] &gt; L[j+1]</code> fait ce tri à bulles sur une liste de 10 éléments&nbsp;?',lab:'comparaisons =',ans:45,
   why:'La passe i fait n − 1 − i comparaisons : 9 + 8 + … + 1 = 10 × 9 / 2 = 45, quel que soit l’ordre initial.'},
  {kind:'Théorie',h:'Le tri par sélection',p:`<p>Troisième idée, la plus directe : la case 0 doit recevoir le plus petit élément, la case 1 le deuxième plus petit, et ainsi de suite. Il suffit d’aller les chercher. Sur la figure, le minimum provisoire est en violet ; le code est en dessous.</p><div class="def"><p><b>Tri par sélection</b> : pour i = 0, 1, …, n − 2, on cherche l’indice m du minimum de L[i..n − 1], puis on échange L[i] et L[m]. Chaque passe fait <b>un seul échange</b>.</p></div><div class="why"><p>Invariant : <b>après la passe i, L[0..i] contient les i + 1 plus petits éléments, triés, à leur place finale</b>. La passe suivante prend le minimum du reste, qui est plus grand ou égal à tout ce qui est déjà placé, et le pose juste après.</p></div><div class="ex"><p>[5, 2, 9, 1]. i = 0 : le minimum de toute la liste est 1, en case 3, échangé avec 5 : [1, 2, 9, 5]. i = 1 : le minimum de [2, 9, 5] est 2, déjà en case 1 : rien ne bouge. i = 2 : le minimum de [9, 5] est 5, échangé avec 9 : [1, 2, 5, 9].</p></div><div class="idea"><p>Pour trouver le minimum de n − i cases, il faut n − i − 1 comparaisons, quelles que soient les valeurs. Total (n − 1) + … + 1 = n(n − 1)/2, toujours O(n²), même sur une liste déjà triée. Son atout : au plus n − 1 échanges.</p></div>`,
   params:[{id:'k',l:'Étape',min:0,max:TSEL.length-1,v:0}],
   draw:v=>sortStep(TSEL,v.k),
   info:v=>`${TSEL[v.k].msg}<br>${legend([['var(--spark)','examiné'],['var(--other)','minimum provisoire'],['var(--ok)','trié']])}`,
   note:py(`
def tri_selection(L):
    n = len(L)
    for i in range(n - 1):
        m = i
        for j in range(i + 1, n):
            if L[j] < L[m]:
                m = j
        L[i], L[m] = L[m], L[i]`)},
  {h:'Deux passes de sélection',p:'On fait deux passes (i = 0 puis i = 1) du tri par sélection sur <code class="code">[4, 3, 1, 5, 2]</code>. Quelle liste obtient-on&nbsp;?',
   opts:['[1, 2, 4, 5, 3]','[1, 3, 4, 5, 2]','[1, 2, 3, 4, 5]','[3, 1, 4, 2, 5]'],ans:0,
   why:'i = 0 : le minimum 1 (case 2) s’échange avec 4 : [1, 3, 4, 5, 2]. i = 1 : le minimum de [3, 4, 5, 2] est 2 (case 4), échangé avec 3 : [1, 2, 4, 5, 3].'},
  {h:'Une liste déjà triée',p:'On donne une liste <b>déjà triée</b> de <i>n</i> éléments. Quel tri fait le moins de comparaisons&nbsp;?',
   opts:['Le tri à bulles','Le tri par sélection','Les trois en font autant','Le tri par insertion'],ans:3,
   why:'L’insertion compare chaque élément à son voisin de gauche, voit qu’il est en ordre et s’arrête : n − 1 comparaisons, O(n). Bulles (sans arrêt anticipé) et sélection en font toujours n(n − 1)/2.'},
  {kind:'Théorie',h:'Bilan des complexités',p:`<p>Trois algorithmes, trois idées différentes, mais un même ordre de grandeur. D’où vient ce O(n²) commun, et qu’est-ce qui les distingue quand même&nbsp;?</p><div class="prop"><p>Les tris par insertion, à bulles et par sélection sont <b>en place</b> (mémoire supplémentaire O(1)) et coûtent <b>O(n²)</b> comparaisons dans le pire cas. Le tableau ci-dessous résume meilleur cas, pire cas et nombre d’échanges.</p></div><div class="why"><p>Les trois ont deux boucles imbriquées dont la boucle intérieure fait jusqu’à i tours (insertion) ou n − 1 − i tours (bulles, sélection) au passage i : la somme (n − 1) + … + 1 = n(n − 1)/2 apparaît chaque fois. Plus profondément, ils n’échangent que des <b>voisins</b> (insertion, bulles) ou parcourent tout le reste pour un seul placement (sélection). Une liste à l’envers a n(n − 1)/2 paires mal rangées, et un échange de voisins n’en corrige qu’une.</p></div><div class="ex"><p>n = 1000 : n(n − 1)/2 = 499 500 comparaisons, c’est instantané. n = 100 000 : environ 5 · 10⁹ comparaisons, quelques secondes à un milliard par seconde, et bien plus en Python. Le chapitre suivant fait beaucoup mieux.</p></div><div class="idea"><p>Pour choisir : l’insertion est excellente sur une liste <b>presque triée</b> (proche de O(n)) ; la sélection minimise les <b>échanges</b>, utile si déplacer un élément coûte cher.</p></div>`,
   fig:`<table style="margin:auto;border-collapse:collapse;text-align:center"><tr><th style="padding:4px 10px"></th><th style="padding:4px 10px">meilleur cas</th><th style="padding:4px 10px">pire cas</th><th style="padding:4px 10px">échanges</th></tr><tr><td><b>insertion</b></td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td></tr><tr><td><b>bulles</b></td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td></tr><tr><td><b>sélection</b></td><td>O(n²)</td><td>O(n²)</td><td>≤ n − 1</td></tr></table>`,
   note:'Le tri à bulles devient O(n) dans le meilleur cas si on s’arrête dès qu’une passe ne fait aucun échange.'},
  {kind:'Méthode',h:'Compter les inversions',
   p:'Une <b>inversion</b> est une paire d’éléments mal rangés : a placé avant b avec a &gt; b. Pour les compter sans en oublier, prends chaque élément tour à tour et compte les éléments <b>plus petits situés après lui</b>, puis additionne. Une liste triée en a 0, une liste à l’envers en a le maximum, n(n − 1)/2. Échanger deux <b>voisins</b> mal rangés supprime exactement une inversion, sans toucher aux autres paires : le tri par insertion fait donc autant d’échanges que la liste a d’inversions.',
   demo:{enonce:'Combien d’inversions dans [3, 1, 4, 2]&nbsp;? Combien d’échanges fera le tri par insertion&nbsp;?',
    etapes:[
     {f:'3 : après lui, 1 et 2 sont plus petits. 2 inversions.',w:'On ne regarde que vers la droite, pour compter chaque paire une seule fois.'},
     {f:'1 : rien de plus petit après. 4 : seul 2 est plus petit après. 2 : dernier élément.',w:'0, puis 1, puis 0.'},
     {f:'Total : 2 + 0 + 1 + 0 = 3 inversions : (3, 1), (3, 2), (4, 2).',w:'On liste les paires pour vérifier.'},
     {f:'Insertion : 1 recule d’une case (1 échange), 4 ne bouge pas, 2 recule de deux cases (2 échanges). Total 3.',w:'Chaque échange de voisins corrige une inversion : le décompte concorde.'}],
    conclusion:'3 inversions, donc 3 échanges pour le tri par insertion.'}},
  {kind:'Défi',h:'Compter les échanges',p:'Combien d’échanges fait le tri par insertion sur <code class="code">[5, 2, 9, 1, 6, 3, 8, 4]</code>&nbsp;? Indice : chaque échange corrige exactement une paire mal ordonnée (une <b>inversion</b>).',
   lab:'échanges =',ans:13,
   why:'On compte les inversions, les paires (a, b) avec a avant b et a &gt; b : 5 en crée 4 (avec 2, 1, 3, 4), 2 en crée 1, 9 en crée 5, 1 aucune, 6 en crée 2, 3 aucune, 8 en crée 1. Total 4 + 1 + 5 + 2 + 1 = 13.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : tris simples',p:'<div class="keep"><ul><li><b>Insertion</b> : L[i] recule tant que son voisin de gauche est plus grand. Invariant : L[0..i] est trié. Meilleur cas O(n) (liste triée), pire cas O(n²).</li><li><b>Bulles</b> : une passe échange chaque paire de voisins mal rangés. Invariant : après p passes, les p plus grands sont à leur place au bout. Toujours n(n − 1)/2 comparaisons ; O(n) au mieux seulement avec l’arrêt quand une passe ne fait aucun échange.</li><li><b>Sélection</b> : on échange L[i] avec le minimum de L[i..n − 1]. Invariant : L[0..i] contient les plus petits, à leur place finale. Toujours n(n − 1)/2 comparaisons, au plus n − 1 échanges.</li><li><b>Dérouler passe par passe</b> : appliquer la règle d’une passe et écrire la liste après chaque passe, sans détailler chaque comparaison.</li><li><b>Inversion</b> : paire (a, b) avec a avant b et a &gt; b. Pour chaque élément, compter les plus petits placés après lui. Liste triée : 0 ; à l’envers : n(n − 1)/2.</li><li>Un échange de voisins corrige exactement une inversion : le tri par insertion fait <b>autant d’échanges que d’inversions</b>.</li><li>Les trois tris sont en place et en O(n²) dans le pire cas.</li></ul></div>'},
  {kind:'Problème',h:'Trois tris, une liste',p:`On trie la liste <code class="code">[6, 3, 8, 2, 7, 1]</code> avec les trois tris du chapitre, dans leur version du cours. Pour chacun, il faut prédire l’état du tableau après quelques passes, sans tout dérouler. Une <b>passe</b> est un tour de la boucle extérieure.`+bars([6,3,8,2,7,1]),
   parts:[
    {q:'a) Tri à bulles : quel est l’état de la liste après 2 passes&nbsp;?',opts:['[3, 6, 2, 7, 1, 8]','[2, 3, 6, 1, 7, 8]','[3, 2, 6, 1, 7, 8]','[1, 2, 8, 3, 7, 6]'],ans:2,hint:'Une passe fait remonter le plus grand élément restant à la fin. Fais la première passe en entier, puis la seconde jusqu’à l’avant-dernière case.',why:'Passe 1 : [3, 6, 2, 7, 1, 8], le 8 est en place. Passe 2 : 3 &lt; 6 reste, 6 et 2 s’échangent, 6 &lt; 7 reste, 7 et 1 s’échangent : [3, 2, 6, 1, 7, 8].'},
    {q:'b) Tri par sélection : quel est l’état de la liste après 2 passes (i = 0 puis i = 1)&nbsp;?',opts:['[1, 3, 8, 2, 7, 6]','[1, 2, 8, 3, 7, 6]','[1, 2, 3, 6, 7, 8]','[1, 2, 6, 3, 7, 8]'],ans:1,hint:'À chaque passe, on échange seulement deux cases : la case i et celle du minimum restant.',why:'i = 0 : le minimum 1 s’échange avec 6, d’où [1, 3, 8, 2, 7, 6]. i = 1 : le minimum restant 2 s’échange avec 3, d’où [1, 2, 8, 3, 7, 6].'},
    {q:'c) Tri par insertion : combien d’échanges au total pour trier la liste&nbsp;?',lab:'échanges =',ans:10,hint:'Chaque échange de voisins corrige exactement une inversion. Compte les paires (a, b) avec a avant b et a &gt; b.',why:'6 est plus grand que 3, 2 et 1 placés après lui : 3 inversions. 3 en fait 2 (avec 2 et 1), 8 en fait 3 (avec 2, 7 et 1), 2 en fait 1 et 7 en fait 1. Total : 3 + 2 + 3 + 1 + 1 = 10.'},
   ],
   sol:`<p><b>Bulles.</b> La passe 1 compare les 5 paires voisines et pousse 8 au bout : [3, 6, 2, 7, 1, 8]. La passe 2 pousse 7 en avant-dernière place : [3, 2, 6, 1, 7, 8]. Invariant : après p passes, les p plus grands sont à leur place finale.</p><p><b>Sélection.</b> Chaque passe place le minimum restant en case i par un seul échange : [1, 3, 8, 2, 7, 6], puis [1, 2, 8, 3, 7, 6]. Invariant : après p passes, les p plus petits sont à leur place finale.</p><p><b>Insertion.</b> Chaque échange de deux voisins mal ordonnés supprime exactement une inversion. Le nombre d’échanges est donc le nombre d’inversions de la liste de départ : 3 (pour 6) + 2 (pour 3) + 3 (pour 8) + 1 (pour 2) + 1 (pour 7) = 10.</p>`},
  {kind:'Problème',h:'Le tri à bulles qui s’arrête tôt',p:`Cette version du tri à bulles s’arrête dès qu’une passe ne fait aucun échange. Elle renvoie le nombre de passes effectuées, la dernière passe comprise, même si elle ne fait aucune comparaison. Une liste déjà triée ne coûte ainsi qu’une passe. Mais toutes les listes « presque triées » ne se valent pas.`+py(`
def tri(L):
    n = len(L)
    passes = 0
    echange = True
    while echange:
        echange = False
        passes += 1
        for j in range(n - passes):
            if L[j] > L[j+1]:
                L[j], L[j+1] = L[j+1], L[j]
                echange = True
    return passes`),
   parts:[
    {q:'a) Que renvoie <code class="code">tri([6, 1, 2, 3, 4, 5])</code>&nbsp;?',lab:'passes =',ans:2,hint:'Le 6 est un grand élément mal placé. Combien de passes faut-il pour l’envoyer au bout, puis pour constater que tout est trié&nbsp;?',why:'Passe 1 : le 6 remonte jusqu’au bout en 5 échanges, la liste est triée. Passe 2 : aucun échange, on s’arrête. 2 passes.'},
    {q:'b) Que renvoie <code class="code">tri([2, 3, 4, 5, 6, 1])</code>&nbsp;?',lab:'passes =',ans:6,hint:'Le 1 est un petit élément mal placé. De combien de cases recule-t-il à chaque passe&nbsp;?',why:'Le 1 ne recule que d’une case par passe : il lui faut 5 passes, et la 5e fait encore un échange. La passe 6 (range(0), aucune comparaison) ne fait aucun échange : on renvoie 6.'},
    {q:'c) Combien de comparaisons <code class="code">L[j] &gt; L[j+1]</code> au total pour cette même liste&nbsp;?',lab:'comparaisons =',ans:15,hint:'La passe p fait n − p comparaisons.',why:'Passes 1 à 6 : 5 + 4 + 3 + 2 + 1 + 0 = 15, autant que pour une liste dans l’ordre inverse.'},
    {q:'d) Quel invariant justifie <code class="code">range(n - passes)</code>&nbsp;?',opts:['Après p passes, les p premiers éléments sont les p plus petits','Chaque passe fait au moins un échange','Après p passes, la liste a exactement p inversions de moins','Après p passes, les p derniers éléments sont les p plus grands, à leur place finale'],ans:3,hint:'Que devient le plus grand élément non placé pendant une passe&nbsp;?',why:'Pendant une passe, le maximum de la partie non triée est poussé d’échange en échange jusqu’au bout de cette partie. Les p dernières cases sont donc définitives et la passe p + 1 peut s’arrêter avant elles.'},
   ],
   sol:`<p>Un grand élément mal placé (« lièvre ») remonte en une seule passe, car chaque échange le pousse d’une case et il reste le maximum. Un petit élément mal placé (« tortue ») ne recule que d’une case par passe.</p><p>[6, 1, 2, 3, 4, 5] : une passe pour envoyer 6 au bout, une passe sans échange, donc 2 passes et 5 + 4 = 9 comparaisons.</p><p>[2, 3, 4, 5, 6, 1] : le 1 doit reculer de 5 cases, soit 5 passes avec échange, puis une 6e passe vide. On fait 5 + 4 + 3 + 2 + 1 + 0 = 15 comparaisons, le pire cas.</p><p>L’invariant « après p passes, les p plus grands sont en place » justifie la borne n − passes. Grâce à l’arrêt anticipé, le meilleur cas devient O(n) mais le pire cas reste O(n²).</p>`},
]},

/* ================= 6. Tri fusion ================= */
{subj:'ics', sem:'algo', id:'ics-fusion', h:'Tri fusion', p:'Diviser pour régner : couper en deux, trier chaque moitié, fusionner.', steps:[
  {kind:'Théorie',h:'Diviser pour régner',p:`<p>Les tris simples coûtent O(n²) : pour 100 000 éléments, des milliards de comparaisons. Pour faire mieux, on change de stratégie : plutôt que de placer les éléments un par un, on coupe le problème en deux problèmes deux fois plus petits.</p><div class="def"><p><b>Diviser pour régner</b> : on <b>divise</b> le problème en sous-problèmes plus petits, on les <b>résout récursivement</b>, puis on <b>combine</b> leurs solutions. Pour le <b>tri fusion</b> : on coupe L en L[:m] et L[m:] avec m = len(L) // 2, on trie chaque moitié par un appel récursif, puis on <b>fusionne</b> les deux listes triées. Cas de base : une liste de longueur 0 ou 1, déjà triée.</p></div><div class="why"><p>Correction par récurrence sur la longueur. Si len(L) ≥ 2, alors m ≥ 1 et len(L) − m ≥ 1 : les deux moitiés sont strictement plus courtes, donc bien triées par hypothèse de récurrence. La fusion de deux listes triées donne une liste triée qui contient les mêmes éléments.</p></div><div class="ex"><p>[8, 3, 5, 1] se coupe en [8, 3] et [5, 1], qui se coupent en listes d’un élément. On remonte : [8] et [3] donnent [3, 8], [5] et [1] donnent [1, 5], puis fusion([3, 8], [1, 5]) = [1, 3, 5, 8] en 3 comparaisons.</p></div><div class="warn"><p>Le tri fusion n’est pas en place : L[:m], L[m:] et la liste R de la fusion sont de nouvelles listes, soit une mémoire auxiliaire O(n).</p></div>`,
   fig:py(`
def fusion(A, B):
    i, j, R = 0, 0, []
    while i < len(A) and j < len(B):
        if A[i] <= B[j]:
            R.append(A[i]); i += 1
        else:
            R.append(B[j]); j += 1
    return R + A[i:] + B[j:]

def tri_fusion(L):
    if len(L) <= 1:
        return L
    m = len(L) // 2
    return fusion(tri_fusion(L[:m]), tri_fusion(L[m:]))`)},
  {h:'Fusionner deux listes triées',p:`<p>Tout le travail du tri fusion se fait dans la fusion. Il faut donc qu’elle soit rapide : un seul passage sur chaque liste.</p><div class="def"><p><b>Fusionner</b> deux listes triées A et B, c’est construire la liste triée R de tous leurs éléments. On garde un indice i dans A et j dans B. À chaque étape, on compare les <b>têtes</b> A[i] et B[j], on ajoute la plus petite à R et on avance dans sa liste. Dès qu’une liste est épuisée, on recopie la fin de l’autre.</p></div><div class="why"><p>Invariant : <b>R est triée et contient les i + j plus petits éléments</b> de A et B. La plus petite valeur non encore prise est forcément une des deux têtes, puisque A et B sont triées : l’ajouter à R conserve l’invariant.</p></div><div class="ex"><p>Avec le curseur, A = [1, 4, 7, 9] et B = [2, 3, 8, 10] : on prend 1, 2, 3, 4, 7, 8, 9, puis A est vide et on recopie 10. 7 comparaisons pour 8 éléments.</p></div><div class="idea"><p>Chaque comparaison place un élément dans R, et la dernière liste restante se recopie sans comparaison. Pour des longueurs p et q, il y a donc au plus p + q − 1 comparaisons, et au moins min(p, q) : fusionner [1, 2] et [5, 6, 7] n’en demande que 2. La fusion coûte O(p + q).</p></div>`,
   params:[{id:'k',l:'Étape',min:0,max:TFUS.length-1,v:0}],
   draw:v=>fusFig(TFUS[v.k]),
   info:v=>TFUS[v.k].msg},
  {h:'Au plus combien&nbsp;?',p:'On fusionne une liste triée de 5 éléments avec une liste triée de 7 éléments. Combien de comparaisons au maximum&nbsp;?',lab:'comparaisons =',ans:11,
   why:'Chaque comparaison place un élément. Dans le pire cas, il reste un seul élément quand une liste se vide : 5 + 7 − 1 = 11.'},
  {kind:'Méthode',h:'Dérouler un tri fusion avec l’arbre des appels',
   p:'Dessine l’<b>arbre des découpages</b> : chaque liste se coupe en L[:m] et L[m:] avec m = len(L) // 2, jusqu’aux listes d’un élément. Les fusions se font en <b>remontant</b>, dans l’ordre où les appels se terminent : Python finit toute la branche gauche avant de commencer la droite. Pour chaque fusion, compare les têtes, prends la plus petite, et arrête de compter dès qu’une des deux listes est vide.',
   demo:{enonce:'Dérouler <code class="code">tri_fusion([7, 2, 6, 3])</code> : nombre d’appels et de comparaisons.',
    etapes:[
     {f:'[7, 2, 6, 3] → [7, 2] et [6, 3] → [7], [2], [6], [3].',w:'m = 2, puis m = 1. Les 4 feuilles sont des cas de base : 1 + 2 + 4 = 7 appels.'},
     {f:'fusion([7], [2]) = [2, 7] : 1 comparaison.',w:'La branche gauche se termine en premier. 7 &gt; 2, on prend 2, puis B est vide et on recopie 7.'},
     {f:'fusion([6], [3]) = [3, 6] : 1 comparaison.',w:'Puis la branche droite.'},
     {f:'fusion([2, 7], [3, 6]) : 2 ≤ 3 prend 2, 7 &gt; 3 prend 3, 7 &gt; 6 prend 6, B est vide. 3 comparaisons, résultat [2, 3, 6, 7].',w:'Le reste de A (le 7) est recopié sans comparaison.'}],
    conclusion:'7 appels et 1 + 1 + 3 = 5 comparaisons pour obtenir [2, 3, 6, 7].'}},
  {h:'Un petit tri fusion',p:'Combien de comparaisons <code class="code">A[i] &lt;= B[j]</code> fait <code class="code">tri_fusion([3, 1, 2])</code>&nbsp;?',lab:'comparaisons =',ans:3,
   why:'m = 1 : [3] et [1, 2]. La droite se coupe en [1] et [2], fusionnés en 1 comparaison. Puis fusion([3], [1, 2]) : 3 &gt; 1, 3 &gt; 2, B est vide. Total 1 + 2 = 3.'},
  {kind:'Théorie',h:'Les niveaux de la récursion',p:`<p>Combien coûte le tri fusion en tout&nbsp;? Compter fusion par fusion serait long. On regroupe plutôt les fusions par <b>niveau</b> de l’arbre des appels.</p><div class="prop"><p>Pour n = 2ᵏ éléments, le tri fusion a <b>k = log₂ n</b> niveaux de fusion, et chaque niveau coûte au plus <b>n</b> comparaisons. Il fait donc au plus n log₂ n comparaisons : <b>O(n log n)</b>, même dans le pire cas.</p></div><div class="why"><p>Vu de bas en haut, on fusionne des blocs de 1 en blocs de 2, puis de 2 en 4, et ainsi de suite : la taille des blocs double à chaque niveau, donc il faut k niveaux pour arriver à n = 2ᵏ. À un niveau donné, chaque élément appartient à exactement une fusion, et une fusion de p + q éléments coûte au plus p + q comparaisons : le niveau coûte au plus n. C’est l’équation C(n) = 2 C(n/2) + n.</p></div><div class="ex"><p>Sur la figure, n = 8 et 3 niveaux. On compte 4, puis 6, puis 7 comparaisons : 17 au total, sous la borne 8 × 3 = 24. Pour n = 1024 : au plus 1024 × 10 = 10 240 comparaisons, contre 523 776 pour l’insertion dans le pire cas.</p></div><div class="warn"><p>Si <i>n</i> n’est pas une puissance de 2, il y a ⌈log₂ n⌉ niveaux et le coût reste O(n log n). Le prix à payer est la mémoire auxiliaire O(n).</p></div>`,
   params:[{id:'k',l:'Niveau',min:0,max:NIV.length-1,v:0}],
   draw:v=>nivFig(v.k),
   info:v=>v.k===0?'Niveau 0 : 8 blocs de taille 1, triés par définition.':`Niveau ${v.k} : blocs de taille ${NIV[v.k].b}, ${NIV[v.k].c} comparaisons à ce niveau (au plus 8).`},
  {kind:'Méthode',h:'Résoudre C(n) = 2 C(n/2) + n',
   p:'Cette récurrence est celle de tout algorithme qui coupe en deux moitiés, traite chacune récursivement, puis recolle en O(n). Deux façons de la résoudre pour n = 2ᵏ. <b>Par les niveaux</b> : il y a k = log₂ n niveaux de découpage, et chaque niveau coûte au total n (deux moitiés de n/2, quatre quarts de n/4…), d’où C(n) = n log₂ n. <b>Par un tableau</b> : calcule C(2), C(4), C(8)… à partir de C(1) et compare à n log₂ n.',
   demo:{enonce:'Calculer C(8) avec C(1) = 0 et C(n) = 2 C(n/2) + n.',
    etapes:[
     {f:'C(2) = 2 · 0 + 2 = 2, C(4) = 2 · 2 + 4 = 8, C(8) = 2 · 8 + 8 = 24.',w:'On remonte depuis le cas de base en doublant n à chaque fois.'},
     {f:'Niveaux : 8 → 4 → 2 → 1, soit log₂ 8 = 3 niveaux, chacun de coût 8.',w:'Au niveau des blocs de 4, deux fusions coûtent 4 chacune : 8 en tout. Idem pour les autres niveaux.'},
     {f:'3 × 8 = 24 = 8 log₂ 8 ✓',w:'Les deux méthodes donnent le même résultat.'}],
    conclusion:'C(8) = 24 et, en général, C(n) = n log₂ n : O(n log n).'}},
  {h:'Résoudre la récurrence',p:'Avec C(1) = 0 et C(n) = 2 C(n/2) + n, que vaut C(32)&nbsp;?',lab:'C(32) =',ans:160,
   why:'32 = 2⁵ : 5 niveaux de coût 32, donc C(32) = 32 · 5 = 160. Au tableau : C(16) = 64, puis C(32) = 2 · 64 + 32 = 160.'},
  {h:'Combien de niveaux&nbsp;?',p:'Pour trier 1024 éléments, combien de niveaux de fusion le tri fusion empile-t-il&nbsp;?',lab:'niveaux =',ans:10,
   why:'On passe de blocs de 1 à un bloc de 1024 en doublant à chaque niveau : 2¹⁰ = 1024, donc 10 niveaux.'},
  {kind:'Théorie',h:'La stabilité',p:`<p>On trie rarement des nombres seuls : on trie des élèves par note, des commandes par date. Deux éléments peuvent alors avoir la même <b>clé</b> de tri tout en étant différents. Dans quel ordre le tri les laisse-t-il&nbsp;?</p><div class="def"><p>Un tri est <b>stable</b> si deux éléments de même clé restent dans leur <b>ordre de départ</b> : si a était avant b et clé(a) = clé(b), alors a est encore avant b après le tri.</p></div><div class="ex"><p>On trie par note [(Ana, 5), (Zoé, 4), (Léo, 5)]. Ana et Léo ont la même note, et Ana est la première. Un tri stable donne [(Zoé, 4), (Ana, 5), (Léo, 5)]. Un tri non stable peut donner [(Zoé, 4), (Léo, 5), (Ana, 5)] : l’ordre est correct pour les notes, mais l’ordre de départ est perdu.</p></div><div class="warn"><p>Le tri par sélection n’est pas stable. Sur [(2, a), (2, b), (1, c)], la passe i = 0 échange la case 0 avec le minimum (1, c) : (2, a) saute par-dessus (2, b), et on obtient [(1, c), (2, b), (2, a)]. Les tris par insertion et à bulles, eux, n’échangent que des voisins strictement mal rangés : deux éléments égaux ne se croisent jamais, ils sont stables.</p></div>`,
   fig:`<p style="text-align:center">[(Ana, 5), (Zoé, 4), (Léo, 5)] → <b>[(Zoé, 4), (Ana, 5), (Léo, 5)]</b></p>`,
   note:'La stabilité permet de trier en plusieurs passes : par prénom, puis par note, et les ex æquo restent rangés par prénom.'},
  {h:'D’où vient la stabilité&nbsp;?',p:'Dans <code class="code">fusion</code>, A vient avant B dans la liste de départ. Quel test rend le tri fusion stable&nbsp;?',
   opts:['if A[i] &lt; B[j]','if A[i] &lt;= B[j]','if A[i] &gt; B[j]','if A[i] != B[j]'],ans:1,
   why:'En cas d’égalité, A[i] &lt;= B[j] prend l’élément de A, qui était avant dans la liste. Avec &lt;, on prendrait celui de B en premier et on inverserait les ex æquo.'},
  {kind:'Défi',h:'Le gain concret',p:'Pour <i>n</i> = 2¹⁶ = 65 536, l’insertion fait environ <i>n</i>²/2 comparaisons dans le pire cas et le tri fusion environ <i>n</i> log₂ <i>n</i>. Combien de fois moins de comparaisons pour le tri fusion&nbsp;?',lab:'rapport =',ans:2048,
   why:'(n²/2) / (n log₂ n) = n / (2 log₂ n) = 65 536 / 32 = 2048.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : tri fusion',p:'<div class="keep"><ul><li><b>Diviser pour régner</b> : couper en sous-problèmes, les résoudre récursivement, combiner.</li><li><b>Tri fusion</b> : m = len(L) // 2, trier L[:m] et L[m:], puis fusionner. Cas de base : longueur 0 ou 1.</li><li><b>Fusion</b> de deux listes triées : comparer les têtes, prendre la plus petite ; recopier le reste quand une liste est vide. Au plus p + q − 1 comparaisons, O(p + q).</li><li><b>Dérouler</b> : dessiner l’arbre des découpages ; les fusions se font en remontant, la branche gauche entièrement avant la droite. Une liste de n éléments donne 2n − 1 appels.</li><li><b>Coût</b> : C(n) = 2 C(n/2) + n, soit log₂ n niveaux de coût n : C(n) = n log₂ n pour n = 2ᵏ. O(n log n) même dans le pire cas, mais mémoire auxiliaire O(n).</li><li><b>Stable</b> : les éléments de même clé gardent leur ordre de départ. Insertion et bulles le sont, sélection non ; le tri fusion l’est grâce au test de la fusion.</li><li>En gain : (n²/2) / (n log₂ n) = n / (2 log₂ n), déjà 2048 pour n = 65 536.</li></ul></div>'},
  {kind:'Problème',h:'Dérouler un tri fusion',p:`On applique <code class="code">tri_fusion</code> du cours à <code class="code">[5, 1, 4, 2, 3]</code>. Avec 5 éléments, m = 5 // 2 = 2 : la moitié gauche a 2 éléments et la droite 3. Python évalue <code class="code">tri_fusion(L[:m])</code> en entier avant <code class="code">tri_fusion(L[m:])</code>. On compte les appels et les comparaisons <code class="code">A[i] &lt;= B[j]</code>.`,
   parts:[
    {q:'a) Combien d’appels à <code class="code">tri_fusion</code> au total, le premier compris&nbsp;?',lab:'appels =',ans:9,hint:'Dessine l’arbre des découpages : [5, 1, 4, 2, 3] → [5, 1] et [4, 2, 3], et ainsi de suite jusqu’aux listes d’un élément.',why:'Un appel pour la liste entière, 2 pour [5, 1] et [4, 2, 3], 2 pour [5] et [1], 2 pour [4] et [2, 3], 2 pour [2] et [3] : 9 appels.'},
    {q:'b) Quel est le premier appel à <code class="code">fusion</code> exécuté&nbsp;?',opts:['fusion([2], [3])','fusion([5], [1])','fusion([1, 5], [2, 3, 4])','fusion([4], [2, 3])'],ans:1,hint:'Une fusion n’a lieu qu’une fois les deux moitiés triées. Quelle branche se termine en premier&nbsp;?',why:'L’appel sur [5, 1] est lancé en premier et ses deux moitiés [5] et [1] sont des cas de base. On fusionne donc d’abord [5] et [1].'},
    {q:'c) Combien de comparaisons <code class="code">A[i] &lt;= B[j]</code> en tout&nbsp;?',lab:'comparaisons =',ans:8,hint:'Il y a 4 fusions : [5] et [1], [2] et [3], [4] et [2, 3], puis la dernière. Une fusion s’arrête dès qu’une des listes est vide.',why:'1 + 1 + 2 comparaisons pour les trois premières fusions. Pour [1, 5] et [2, 3, 4] : 1 ≤ 2, puis 5 &gt; 2, 5 &gt; 3, 5 &gt; 4, soit 4. Total 8.'},
    {q:'d) Combien d’appels à <code class="code">tri_fusion</code> pour une liste de <i>n</i> ≥ 1 éléments&nbsp;?',opts:['n','n log₂ n','2n − 1','2ⁿ'],ans:2,hint:'Les feuilles de l’arbre sont les listes d’un élément. Chaque autre appel a exactement deux enfants.',why:'Il y a n feuilles. Un arbre où chaque nœud interne a deux enfants a une feuille de plus que de nœuds internes : n − 1 nœuds internes, soit 2n − 1 appels. Pour n = 5 : 9.'},
   ],
   sol:`<p>Arbre des appels : [5, 1, 4, 2, 3] → [5, 1] et [4, 2, 3] ; [5, 1] → [5] et [1] ; [4, 2, 3] → [4] et [2, 3] ; [2, 3] → [2] et [3]. Cela fait 9 appels, dont 5 cas de base.</p><p>Les fusions s’exécutent dans l’ordre où les appels se terminent : fusion([5], [1]) donne [1, 5] (1 comparaison). fusion([2], [3]) donne [2, 3] (1). fusion([4], [2, 3]) donne [2, 3, 4] (2 : 4 &gt; 2, 4 &gt; 3, puis B est vide).</p><p>Enfin fusion([1, 5], [2, 3, 4]) fait 4 comparaisons et donne [1, 2, 3, 4, 5]. Total : 8 comparaisons.</p><p>En général, l’arbre a n feuilles et n − 1 nœuds internes, soit 2n − 1 appels. Le coût vient des fusions : au plus n comparaisons par niveau.</p>`},
  {kind:'Problème',h:'Compter les inversions en O(n log n)',p:`Une <b>inversion</b> d’une liste est une paire d’indices <i>i</i> &lt; <i>j</i> avec L[i] &gt; L[j]. Les compter toutes coûte O(n²) avec deux boucles. On adapte le tri fusion : quand on prend B[j] avant A[i], B[j] est plus petit que tous les éléments restants de A.`+py(`
def fus_inv(A, B):
    i, j, R, inv = 0, 0, [], 0
    while i < len(A) and j < len(B):
        if A[i] <= B[j]:
            R.append(A[i]); i += 1
        else:
            R.append(B[j]); j += 1
            inv += len(A) - i
    return R + A[i:] + B[j:], inv

def tri_inv(L):
    if len(L) <= 1:
        return L, 0
    m = len(L) // 2
    A, a = tri_inv(L[:m])
    B, b = tri_inv(L[m:])
    R, c = fus_inv(A, B)
    return R, a + b + c`),
   parts:[
    {q:'a) Quelle valeur de <i>inv</i> renvoie <code class="code">fus_inv([2, 5, 8], [1, 3, 9])</code>&nbsp;?',lab:'inv =',ans:5,hint:'Note la valeur de len(A) − i chaque fois qu’on prend un élément de B.',why:'On prend 1 avec i = 0 : +3. On prend 2. On prend 3 avec i = 1 : +2. On prend 5, puis 8, et A est vide. Total 5 : (2, 1), (5, 1), (8, 1), (5, 3), (8, 3).'},
    {q:'b) Pourquoi ajoute-t-on <code class="code">len(A) - i</code> quand on prend B[j]&nbsp;?',opts:['Parce que B est plus courte que A','Parce que A est triée : A[i], A[i+1], … sont tous &gt; B[j], et chacun forme une inversion avec B[j]','Parce que chaque comparaison coûte len(A) − i opérations','Parce que i compte les éléments de B déjà pris'],ans:1,hint:'Dans la liste de départ, tous les éléments de A étaient avant ceux de B. Lesquels sont plus grands que B[j]&nbsp;?',why:'On prend B[j] parce que A[i] &gt; B[j]. Comme A est triée, les len(A) − i éléments restants de A sont tous &gt; B[j]. Ils étaient avant B[j] : ce sont autant d’inversions, comptées d’un coup.'},
    {q:'c) Pour <code class="code">tri_inv([4, 7, 1, 8, 2, 6])</code>, combien d’inversions la <b>dernière</b> fusion compte-t-elle&nbsp;?',lab:'inversions =',ans:3,hint:'Les deux moitiés triées sont [1, 4, 7] et [2, 6, 8]. Applique fus_inv.',why:'On prend 1, puis 2 avec i = 1 : +2. On prend 4, puis 6 avec i = 2 : +1. On prend 7, puis A est vide. Total 3 : (4, 2), (7, 2), (7, 6).'},
    {q:'d) Combien d’inversions au total dans <code class="code">[4, 7, 1, 8, 2, 6]</code>&nbsp;?',lab:'inversions =',ans:7,hint:'Ajoute les inversions internes à chaque moitié [4, 7, 1] et [8, 2, 6].',why:'[4, 7, 1] en contient 2 ((4, 1) et (7, 1)), [8, 2, 6] en contient 2 ((8, 2) et (8, 6)), et la fusion 3 : total 7.'},
    {q:'e) Quelle est la complexité de <code class="code">tri_inv</code>&nbsp;?',opts:['O(n²)','O(n)','O(n log n)','O(log n)'],ans:2,hint:'Compare avec le tri fusion : le travail ajouté dans fus_inv coûte-t-il plus que O(1) par tour&nbsp;?',why:'fus_inv fait le même travail que fusion, plus une addition par tour. On garde C(n) = 2C(n/2) + O(n), donc O(n log n).'},
   ],
   sol:`<p>Une inversion (x, y) de L est soit dans la moitié gauche, soit dans la moitié droite, soit « à cheval » : x à gauche et y à droite. tri_inv compte récursivement les deux premières sortes (a et b). fus_inv compte la troisième (c).</p><p>Pendant la fusion, prendre B[j] signifie A[i] &gt; B[j]. Comme A est triée, les len(A) − i éléments restants de A dépassent B[j] : ce sont exactement les inversions à cheval qui finissent en B[j].</p><p>Pour [4, 7, 1, 8, 2, 6] : la moitié [4, 7, 1] a 2 inversions, la moitié [8, 2, 6] en a 2, et la fusion de [1, 4, 7] et [2, 6, 8] en compte 3. Total 7, ce qu’on vérifie avec les paires (4, 1), (4, 2), (7, 1), (7, 2), (7, 6), (8, 2), (8, 6).</p><p>Le coût reste celui du tri fusion, O(n log n), au lieu de O(n²) pour la double boucle.</p>`},
]},

/* ================= 7. Graphes ================= */
{subj:'ics', sem:'algo', id:'ics-graphes', h:'Graphes et parcours', p:'Représenter un graphe et le parcourir en largeur ou en profondeur.', steps:[
  {kind:'Théorie',h:'Sommets et arêtes',p:`<p>Un réseau de routes entre des villes, des amitiés entre des personnes, des liens entre des pages web : chaque fois, des objets et des relations deux à deux. Le même modèle mathématique les décrit tous, et les mêmes algorithmes y cherchent des chemins.</p><div class="def"><p>Un <b>graphe</b> G = (S, A) est formé d’un ensemble S de <b>sommets</b> et d’un ensemble A d’<b>arêtes</b> ; une arête {u, v} relie deux sommets. Le graphe est <b>non orienté</b> si chaque arête se parcourt dans les deux sens (une rue à double sens). Deux sommets reliés sont <b>voisins</b>, et le <b>degré</b> de u, noté deg(u), est son nombre de voisins. On note en général <b>n</b> le nombre de sommets et <b>m</b> le nombre d’arêtes.</p></div><div class="thm"><p><b>Somme des degrés</b> : la somme de tous les degrés vaut 2m.</p></div><div class="why"><p>Chaque arête {u, v} est comptée deux fois dans cette somme : une fois dans deg(u), une fois dans deg(v).</p></div><div class="ex"><p>Le graphe ci-dessous a n = 7 sommets et m = 8 arêtes. Degrés : A 2, B 3, C 2, D 2, E 2, F 3, G 2. Leur somme vaut 16 = 2 × 8.</p></div><div class="warn"><p>Le dessin n’est qu’une représentation : deux arêtes qui se croisent sur la figure ne créent pas de sommet. Seules comptent les paires reliées.</p></div>`,
   fig:graph(GN,GE,{sub:k=>''},200)},
  {kind:'Théorie',h:'Deux représentations',p:`<p>Un programme ne voit pas le dessin. Il faut ranger le graphe dans une structure de données, et ce choix décide du coût des opérations qu’on fera ensuite.</p><div class="def"><p>On numérote ou on nomme les sommets. La <b>matrice d’adjacence</b> M est un tableau n × n avec M[u][v] = 1 si u et v sont voisins, 0 sinon. Les <b>listes d’adjacence</b> donnent, pour chaque sommet, la liste de ses voisins ; en Python, un dictionnaire G où G[u] est la liste des voisins de u.</p></div><div class="ex"><p>Pour le graphe de l’étape précédente, la ligne B de la matrice a des 1 dans les colonnes A, D, E, et G['B'] = ['A', 'D', 'E']. La matrice est <b>symétrique</b> (M[u][v] = M[v][u], car le graphe est non orienté) et sa diagonale ne contient que des 0.</p></div><div class="idea"><p>Chaque structure a son point fort. La matrice répond à « u et v sont-ils voisins&nbsp;? » en lisant une case. Les listes donnent directement les voisins d’un sommet, en deg(u) étapes, au lieu de parcourir une ligne entière de n cases. En mémoire, la matrice occupe n² cases, les listes n + 2m entrées.</p></div><div class="ex"><p>Un réseau de 1000 sommets et 3000 arêtes : la matrice a 1 000 000 cases, presque toutes nulles ; les listes ont 1000 entrées de dictionnaire et 6000 voisins en tout. Pour un graphe avec peu d’arêtes, les listes gagnent largement.</p></div>`,
   fig:(()=>{ const K=Object.keys(GN); return `<div style="text-align:center">${mat([['',...K.map(k=>`<b>${k}</b>`)],...K.map(u=>[`<b>${u}</b>`,...K.map(v=>ADJ[u].includes(v)?'1':'<span style="color:var(--muted)">0</span>')])])}</div>`+py(`
G = {'A': ['B', 'C'], 'B': ['A', 'D', 'E'],
     'C': ['A', 'F'], 'D': ['B', 'G'],
     'E': ['B', 'F'], 'F': ['C', 'E', 'G'],
     'G': ['D', 'F']}`); })()},
  {kind:'Méthode',h:'Construire une liste d’adjacence',
   p:`<p>On part souvent d’une simple liste d’arêtes. Pour chaque arête {u, v} : crée la liste de u et celle de v si elles n’existent pas encore, puis ajoute v aux voisins de u <b>et</b> u aux voisins de v, car le graphe est non orienté.</p><p>Contrôle : la somme des longueurs des listes vaut <b>2m</b> (chaque arête est écrite deux fois), et la longueur de G[u] est le degré de u.</p>`,
   demo:{enonce:'Construire G à partir des arêtes A–B, A–C, B–C et C–D.'+py(`
aretes = [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'D')]
G = {}
for u, v in aretes:
    if u not in G:
        G[u] = []
    if v not in G:
        G[v] = []
    G[u].append(v)
    G[v].append(u)     # non orienté : dans les deux sens`),
    etapes:[
     {f:'A–B : G = {\'A\': [\'B\'], \'B\': [\'A\']}',w:'Deux nouvelles listes, puis un ajout dans chaque sens.'},
     {f:'A–C : G[\'A\'] = [\'B\', \'C\'] et G[\'C\'] = [\'A\'].',w:'A existe déjà : on ne recrée pas sa liste, on la complète.'},
     {f:'B–C : G[\'B\'] = [\'A\', \'C\'] et G[\'C\'] = [\'A\', \'B\'].',w:'Les voisins s’ajoutent dans l’ordre des arêtes.'},
     {f:'C–D : G[\'C\'] = [\'A\', \'B\', \'D\'] et G[\'D\'] = [\'C\'].',w:'Dernière arête.'},
     {f:'Contrôle : 2 + 2 + 3 + 1 = 8 = 2 × 4 arêtes.',w:'La somme des degrés vaut deux fois le nombre d’arêtes.'}],
    conclusion:'G = {\'A\': [\'B\', \'C\'], \'B\': [\'A\', \'C\'], \'C\': [\'A\', \'B\', \'D\'], \'D\': [\'C\']}. C est de degré 3.'}},
  {h:'Degrés à partir des arêtes',p:'On construit G avec le code de la méthode à partir des arêtes ci-dessous. Que vaut <code class="code">len(G[3]) + len(G[5])</code>&nbsp;?',
   fig:py(`
aretes = [(1, 2), (2, 3), (3, 1), (3, 4), (4, 5)]`),lab:'résultat =',ans:4,
   why:'3 apparaît dans trois arêtes (2–3, 3–1, 3–4), donc G[3] = [2, 1, 4]. 5 n’apparaît que dans 4–5 : G[5] = [4]. 3 + 1 = 4.'},
  {h:'Compter les 1',p:'Combien de 1 contient la matrice d’adjacence de ce graphe à 8 arêtes&nbsp;?',lab:'nombre de 1 =',ans:16,
   why:'Chaque arête {u, v} donne deux 1, en (u, v) et en (v, u) : 2 × 8 = 16. C’est aussi la somme des degrés.'},
  {h:'Choisir la représentation',p:'Tu dois tester très souvent si deux sommets <i>u</i> et <i>v</i> sont voisins. Quelle représentation répond en O(1)&nbsp;?',
   opts:['Les listes d’adjacence','La matrice d’adjacence','Les deux','Aucune des deux'],ans:1,
   why:'Dans la matrice, il suffit de lire M[u][v] : O(1). Avec les listes, il faut parcourir les voisins de u, en O(degré de u). En revanche, pour parcourir tous les voisins, les listes sont plus efficaces.'},
  {kind:'Théorie',h:'Parcours en largeur (BFS)',p:`<p>Dans un réseau, combien de liens au minimum séparent deux personnes&nbsp;? On regarde d’abord les amis directs, puis les amis d’amis, puis le cercle suivant. Le parcours en largeur procède exactement ainsi.</p><div class="def"><p>Une <b>file</b> est une liste où l’on ajoute à droite et retire à gauche : <b>premier entré, premier sorti</b>. Le <b>parcours en largeur</b> (BFS, de l’anglais <i>breadth-first search</i>) depuis s : on enfile s et on le marque ; tant que la file n’est pas vide, on défile un sommet u, puis on enfile et marque chacun de ses voisins <b>pas encore marqués</b>.</p></div><div class="why"><p>La <b>distance</b> d(s, v) est le nombre minimal d’arêtes d’un chemin de s à v. Le BFS visite les sommets par distance croissante : à tout moment, la file contient des sommets de distance k suivis de sommets de distance k + 1. Les sommets de distance k + 1 sont enfilés en défilant ceux de distance k, donc ils sortent après eux. Chaque sommet entre une seule fois dans la file et chaque liste de voisins est lue une fois : O(n + m).</p></div><div class="ex"><p>Arêtes 1–2, 1–3, 2–4, 3–4, 4–5, BFS depuis 1. On défile 1 et on enfile 2, 3. On défile 2 et on enfile 4. On défile 3 : 4 est déjà marqué, rien à faire. On défile 4 et on enfile 5. Ordre 1, 2, 3, 4, 5 et distances 0, 1, 1, 2, 3.</p></div><div class="warn"><p>On marque un sommet <b>quand il entre</b> dans la file, pas quand il en sort. Sinon, un sommet voisin de deux sommets de la file serait enfilé deux fois.</p></div>`,
   fig:py(`
from collections import deque

def bfs(G, s):
    vus, file, ordre = {s}, deque([s]), []
    while file:
        u = file.popleft()
        ordre.append(u)
        for v in G[u]:
            if v not in vus:
                vus.add(v)
                file.append(v)
    return ordre`)},
  {h:'Le BFS pas à pas',p:`<p>Avance le curseur : chaque étape défile un sommet. Les voisins sont pris par ordre alphabétique, comme dans les listes G['A'] = ['B', 'C'], G['B'] = ['A', 'D', 'E']…</p><div class="def"><p>Quand le BFS enfile v en défilant u, on dit que u est le <b>parent</b> de v. Les arêtes u–v ainsi utilisées, dessinées en épais, forment l’<b>arbre du parcours</b> : il relie tous les sommets atteints, sans cycle.</p></div><div class="ex"><p>Première étape : on défile A et on enfile B et C, la file vaut [B, C]. Deuxième : on défile B ; A est déjà marqué, D et E sont nouveaux : la file vaut [C, D, E]. Troisième : on défile C ; A est marqué, F est nouveau : [D, E, F]. On voit la file passer d’une couche de distance à la suivante.</p></div><div class="idea"><p>Dans l’arbre du BFS, le chemin qui remonte de v vers A en suivant les parents est un <b>plus court chemin</b> : chaque parent est à distance exactement un de moins. Pour G : G ← D ← B ← A, trois arêtes.</p></div>`,
   params:[{id:'k',l:'Étape',min:0,max:TBFS.length-1,v:0}],
   draw:v=>{ const s=TBFS[v.k]; return graph(GN,GE,{nc:k=>k===s.cur?'var(--spark)':s.ord.includes(k)?'var(--ok)':s.F.includes(k)?'var(--other)':null,ec:treeEdge(s.par)},200); },
   info:v=>{ const s=TBFS[v.k]; return `${s.msg}<br>Ordre : ${s.ord.join(', ')||'–'} &nbsp; File : [${s.F.join(', ')}]<br>${legend([['var(--spark)','défilé'],['var(--ok)','visité'],['var(--other)','dans la file']])}`; }},
  {kind:'Méthode',h:'Dérouler un BFS avec la file',
   p:`<p>Fais un tableau avec trois colonnes : le sommet <b>défilé</b>, les voisins <b>nouveaux</b> qu’il enfile, et la <b>file</b> après l’étape. Règles : on défile toujours à gauche (${cc('file.popleft()')}), on enfile à droite (${cc('append')}), dans l’ordre de la liste de voisins, et un sommet est marqué « vu » <b>dès qu’il entre</b> dans la file, pour ne jamais l’enfiler deux fois.</p><p>L’ordre de visite est l’ordre des défilements. La distance d’un sommet vaut celle de son « parent » (celui qui l’a enfilé) plus 1.</p>`+graph(HN,HE,{},200),
   demo:{enonce:'Dérouler le BFS depuis 1, avec G = {1: [2, 3], 2: [1, 4], 3: [1, 4, 5], 4: [2, 3, 6], 5: [3, 6], 6: [4, 5]}.',
    etapes:[
     {f:'Départ : file [1], vus {1}.',w:'On marque le départ en même temps qu’on l’enfile.'},
     {f:tab(['défilé','enfilés','file'],[[1,'2, 3','[2, 3]'],[2,'4','[3, 4]'],[3,'5','[4, 5]'],[4,'6','[5, 6]'],[5,'–','[6]'],[6,'–','[ ]']]),w:'Quand 3 est défilé, 4 est déjà vu (enfilé par 2) : seul 5 est nouveau. De même, 6 n’est enfilé qu’une fois, par 4.'},
     {f:'Ordre : 1, 2, 3, 4, 5, 6.',w:'On lit la colonne des défilés.'},
     {f:'Distances : d(1) = 0 ; d(2) = d(3) = 1 ; d(4) = d(5) = 2 ; d(6) = 3.',w:'4 a été enfilé par 2 et 5 par 3, tous deux à distance 1. 6 a été enfilé par 4.'}],
    conclusion:'Le BFS visite 1, 2, 3, 4, 5, 6, couche par couche, et d(1, 6) = 3.'}},
  {h:'Ordre du BFS',p:'Dans quel ordre le BFS depuis A visite-t-il les sommets (voisins par ordre alphabétique)&nbsp;?',
   opts:['A, B, D, G, F, C, E','A, C, B, F, E, D, G','A, B, C, D, E, F, G','A, B, C, D, E, G, F'],ans:2,
   why:'Distance 0 : A. Distance 1 : B, C. Distance 2 : D, E (voisins de B), puis F (voisin de C). Distance 3 : G. D’où A, B, C, D, E, F, G. La première option est l’ordre du DFS.'},
  {kind:'Théorie',h:'Parcours en profondeur (DFS)',p:`<p>Pour explorer un labyrinthe, on peut aussi avancer tant qu’on peut, et ne revenir sur ses pas qu’au fond d’une impasse, jusqu’au dernier carrefour qui offre un couloir neuf. C’est le parcours en profondeur.</p><div class="def"><p>Le <b>parcours en profondeur</b> (DFS, <i>depth-first search</i>) depuis u : on marque u, puis pour chaque voisin v de u, dans l’ordre de la liste, s’il n’est pas encore marqué, on lance le DFS depuis v. La version récursive (code sous la figure) utilise la <b>pile d’appels</b> pour se souvenir des carrefours.</p></div><div class="idea"><p>Sur la figure, les sommets violets sont sur la pile : c’est le chemin qui mène du départ au sommet courant. Quand un sommet n’a plus de voisin non vu, son appel se termine, il passe en vert, et on reprend le sommet du dessous, là où il en était dans sa liste.</p></div><div class="ex"><p>Depuis A, voisins par ordre alphabétique : A → B (premier voisin de A) → D (A est vu) → G → F → C. En C, A et F sont vus : impasse, on revient en F, qui a encore E. Ordre : A, B, D, G, F, C, E.</p></div><div class="warn"><p>Le DFS atteint les mêmes sommets que le BFS, en O(n + m) aussi, mais ne donne pas les distances : son arbre relie A à C par A – B – D – G – F – C, cinq arêtes, alors que C est voisin de A.</p></div>`,
   params:[{id:'k',l:'Étape',min:0,max:TDFS.length-1,v:0}],
   draw:v=>{ const s=TDFS[v.k]; return graph(GN,GE,{nc:k=>k===s.cur?'var(--spark)':s.path.includes(k)?'var(--other)':s.ord.includes(k)?'var(--ok)':null,ec:treeEdge(s.par)},200); },
   info:v=>{ const s=TDFS[v.k]; return `${s.msg}<br>Ordre : ${s.ord.join(', ')||'–'}<br>${legend([['var(--spark)','courant'],['var(--other)','sur la pile'],['var(--ok)','terminé']])}`; },
   note:py(`
def dfs(G, u, vus):
    vus.append(u)
    for v in G[u]:
        if v not in vus:
            dfs(G, v, vus)
    return vus     # dfs(G, 'A', [])`)},
  {kind:'Méthode',h:'Dérouler un DFS avec la pile d’appels',
   p:'Écris la <b>pile</b> des appels en cours, du départ au sommet courant. Depuis le sommet courant, prends le <b>premier voisin non vu</b> de sa liste : il est visité et posé sur la pile. Si tous ses voisins sont vus, l’appel se termine : retire-le et reprends le sommet du dessous, là où il en était dans sa liste. L’ordre de visite est l’ordre des empilements.'+graph(HN,HE,{},200),
   demo:{enonce:'Dérouler <code class="code">dfs(G, 1, [])</code> sur le même graphe, G = {1: [2, 3], 2: [1, 4], 3: [1, 4, 5], 4: [2, 3, 6], 5: [3, 6], 6: [4, 5]}.',
    etapes:[
     {f:'Pile 1. Voisins de 1 : 2 est non vu → pile 1 → 2.',w:'On prend toujours le premier voisin non vu, dans l’ordre de la liste.'},
     {f:'Voisins de 2 : 1 vu, 4 non vu → pile 1 → 2 → 4.',w:'On descend sans attendre d’avoir vu les autres voisins de 1.'},
     {f:'Voisins de 4 : 2 vu, 3 non vu → pile 1 → 2 → 4 → 3.',w:'Le DFS fonce en profondeur.'},
     {f:'Voisins de 3 : 1 et 4 vus, 5 non vu → pile … → 3 → 5. Voisins de 5 : 3 vu, 6 non vu → pile … → 5 → 6.',w:'La pile contient maintenant les 6 sommets.'},
     {f:'6 n’a plus de voisin non vu : les appels se terminent un à un (6, 5, 3, 4, 2, 1), sans nouvelle visite.',w:'En redescendant, chaque appel finit sa liste de voisins : tous sont déjà vus.'}],
    conclusion:'Ordre du DFS : 1, 2, 4, 3, 5, 6. Le BFS donnait 1, 2, 3, 4, 5, 6.'}},
  {kind:'Défi',h:'Un DFS depuis C',p:'On lance le DFS depuis <b>C</b>, voisins par ordre alphabétique. Quel est le <b>4e</b> sommet visité&nbsp;?',fig:graph(GN,GE,{},200),
   opts:['B','F','G','D'],ans:3,
   why:'C a pour voisins A, F : on va en A. A a pour voisins B, C : on va en B. B a pour voisins A, D, E : on va en D. L’ordre complet est C, A, B, D, G, F, E.'},
  {kind:'Méthode',h:'Un DFS avec une pile explicite',
   p:`<p>Sans récursion, on remplace la pile d’appels par une liste ${cc('pile')}. ${cc('pile.pop()')} retire le <b>dernier</b> élément ajouté. À chaque étape : dépile u ; s’il est déjà vu, passe ; sinon marque-le et empile <b>tous</b> ses voisins, dans l’ordre de sa liste.</p><p>Conséquence : le <b>dernier</b> voisin empilé est exploré en premier, donc l’ordre peut différer de la version récursive. Un sommet peut être empilé plusieurs fois, mais le test « déjà vu » ne le traite qu’une fois.</p>`+py(`
def dfs_pile(G, s):
    vus, pile = [], [s]
    while pile:
        u = pile.pop()
        if u not in vus:
            vus.append(u)
            for v in G[u]:
                pile.append(v)
    return vus`),
   demo:{enonce:'Dérouler <code class="code">dfs_pile(G, 1)</code> avec le graphe des deux méthodes précédentes.',
    etapes:[
     {f:tab(['dépilé','vus','pile après'],[[1,'1','[2, 3]'],[3,'1, 3','[2, 1, 4, 5]'],[5,'1, 3, 5','[2, 1, 4, 3, 6]'],[6,'1, 3, 5, 6','[2, 1, 4, 3, 4, 5]'],['5, puis 4','… 4','[2, 1, 4, 3, 2, 3, 6]'],['6, 3, puis 2','… 2','[2, 1, 4, 3, 1, 4]']]),w:'On dépile toujours à droite. 5, 6 et 3 ressortent alors qu’ils sont déjà vus : on les jette.'},
     {f:'Il reste [2, 1, 4, 3, 1, 4] : tous déjà vus, on les dépile sans rien faire.',w:'La boucle s’arrête quand la pile est vide.'}],
    conclusion:'Ordre : 1, 3, 5, 6, 4, 2. La version récursive donnait 1, 2, 4, 3, 5, 6 : ici, c’est le dernier voisin de 1, le sommet 3, qui passe en premier.'}},
  {h:'Pile explicite à toi',p:'Dans quel ordre <code class="code">dfs_pile</code> visite-t-il les sommets depuis A&nbsp;?',
   fig:py(`
K = {'A': ['B', 'C'], 'B': ['A', 'D'],
     'C': ['A', 'D'], 'D': ['B', 'C']}`),
   opts:['A, B, D, C','A, C, D, B','A, B, C, D','A, C, B, D'],ans:1,
   why:'On dépile A et on empile B, C. On dépile C (le dernier) et on empile A, D. On dépile D et on empile B, C. C est déjà vu, puis on dépile B. Ordre : A, C, D, B.'},
  {kind:'Théorie',h:'Chemins, cycles et composantes',p:`<p>Un parcours ne visite que ce qu’il peut atteindre. Si le réseau est coupé en morceaux, un BFS ou un DFS depuis un sommet laisse les autres morceaux intacts. Il faut des mots pour ces morceaux.</p><div class="def"><p>Un <b>chemin</b> est une suite de sommets v₀, v₁, …, vₖ où chaque vᵢ est voisin de vᵢ₊₁ ; sa <b>longueur</b> est k, son nombre d’arêtes. Un <b>cycle</b> est un chemin de longueur ≥ 3 qui revient à son départ (vₖ = v₀) sans passer deux fois par un autre sommet. Un graphe est <b>connexe</b> si un chemin relie toute paire de sommets. Une <b>composante connexe</b> est un groupe maximal de sommets reliés entre eux par des chemins. Un <b>arbre</b> est un graphe connexe sans cycle ; une <b>forêt</b>, un graphe sans cycle, dont chaque composante est un arbre.</p></div><div class="ex"><p>Sommets 1 à 5, arêtes 1–2, 2–3, 4–5. Le chemin 1 – 2 – 3 a pour longueur 2. Il n’y a aucun cycle. Les composantes sont {1, 2, 3} et {4, 5} : c’est une forêt de deux arbres. Ajouter l’arête 1–3 crée le cycle 1 – 2 – 3 – 1 ; ajouter 3–4 rend le graphe connexe.</p></div><div class="idea"><p>Un parcours lancé depuis s marque <b>exactement</b> la composante de s : tout sommet relié à s par un chemin finit par être atteint, et aucun autre ne peut l’être. L’arbre du parcours est un arbre qui couvre cette composante.</p></div>`},
  {kind:'Méthode',h:'Composantes connexes et nombre d’arêtes',
   p:`<p>Un parcours lancé depuis s marque exactement les sommets de la <b>composante</b> de s. Pour compter les composantes, parcours tous les sommets et lance un nouveau parcours depuis chaque sommet <b>pas encore vu</b> : le nombre de parcours lancés est le nombre de composantes.</p><p>Pour les arêtes, pars de n sommets isolés, soit n composantes. Une arête qui relie deux composantes différentes en fusionne deux, et ne crée pas de cycle. Une arête dans une même composante ne change rien au nombre de composantes, mais ferme un cycle. Donc :</p><ul><li>un <b>arbre</b> (connexe, sans cycle) à n sommets a <b>n − 1</b> arêtes ;</li><li>un graphe sans cycle à n sommets et c composantes a <b>n − c</b> arêtes ;</li><li>avec plus d’arêtes, il y a forcément un cycle.</li></ul>`,
   demo:{enonce:'Un graphe a 7 sommets et les arêtes 1–2, 2–3, 1–3, 4–5, 6–7. Combien de composantes&nbsp;? A-t-il un cycle&nbsp;?',
    etapes:[
     {f:'Parcours depuis 1 : il marque 1, 2, 3. Depuis 4 : 4, 5. Depuis 6 : 6, 7.',w:'2, 3, 5 et 7 sont déjà vus quand la boucle les atteint : on ne relance rien.'},
     {f:'3 parcours lancés : 3 composantes.',w:'Un parcours par composante.'},
     {f:'Sans cycle, il y aurait 7 − 3 = 4 arêtes. Il y en a 5.',w:'On compare au nombre d’arêtes d’une forêt de mêmes sommets et composantes.'},
     {f:'Il y a donc un cycle : 1 – 2 – 3.',w:'L’arête en trop, 1–3, relie deux sommets déjà dans la même composante.'}],
    conclusion:'3 composantes et un cycle. Pour rendre le graphe connexe, il faudrait au moins 3 − 1 = 2 arêtes de plus.'}},
  {h:'Une forêt',p:'Un graphe <b>sans cycle</b> a 12 sommets et 3 composantes connexes. Combien a-t-il d’arêtes&nbsp;?',lab:'arêtes =',ans:9,
   why:'Chaque composante est un arbre à kᵢ sommets et kᵢ − 1 arêtes. En tout : 12 − 3 = 9 arêtes.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : graphes et parcours',p:'<div class="keep"><ul><li><b>Graphe</b> G = (S, A) : <i>n</i> sommets, <i>m</i> arêtes. <b>Degré</b> = nombre de voisins ; somme des degrés = 2<i>m</i>.</li><li><b>Matrice d’adjacence</b> : n² cases, test « voisins&nbsp;? » en O(1). <b>Listes d’adjacence</b> (dictionnaire) : n + 2m entrées, voisins de u en O(deg u). Construire les listes : chaque arête {u, v} s’ajoute dans les deux sens.</li><li><b>BFS</b> : une <b>file</b> (popleft, append), marquer un sommet quand il entre. Visite par distance croissante ; l’arbre du BFS donne les plus courts chemins en nombre d’arêtes. Dérouler : tableau défilé / enfilés / file.</li><li><b>DFS</b> : aller au premier voisin non vu, revenir en arrière dans une impasse. Récursif : pile d’appels ; avec une <b>pile</b> explicite (pop), le dernier voisin empilé est exploré en premier.</li><li>BFS et DFS coûtent O(n + m) avec des listes d’adjacence ; l’ordre de visite dépend de l’ordre des listes.</li><li><b>Composantes</b> : relancer un parcours depuis chaque sommet non vu ; le nombre de lancements est le nombre de composantes.</li><li><b>Arbre</b> à <i>n</i> sommets : n − 1 arêtes. Forêt à c composantes : n − c arêtes. Plus d’arêtes ⟹ un cycle.</li></ul></div>'},
  {kind:'Problème',h:'BFS et DFS avec un ordre imposé',p:`On parcourt le graphe ci-dessous depuis <b>S</b> avec les fonctions <code class="code">bfs</code> et <code class="code">dfs</code> du cours. Attention : les voisins ne sont <b>pas</b> rangés par ordre alphabétique. Les parcours les lisent dans l’ordre du dictionnaire.`+graph(PB7N,PB7E,{},210)+py(`
G = {'S': ['B', 'A'], 'A': ['C', 'S'],
     'B': ['D', 'C', 'S'], 'C': ['E', 'B', 'A'],
     'D': ['T', 'B'], 'E': ['T', 'C'],
     'T': ['E', 'D']}`),
   parts:[
    {q:'a) Dans quel ordre <code class="code">bfs(G, \'S\')</code> visite-t-il les sommets&nbsp;?',opts:['S, A, B, C, D, E, T','S, B, D, T, E, C, A','S, B, A, C, D, E, T','S, B, A, D, C, T, E'],ans:3,hint:'Simule la file. S enfile B puis A. Quand on défile B, quels voisins non vus sont enfilés, et dans quel ordre&nbsp;?',why:'S enfile B, A. B enfile D, C. A n’apporte rien (C déjà vu). D enfile T. C enfile E. Ordre : S, B, A, D, C, T, E.'},
    {q:'b) Combien d’arêtes contient un plus court chemin de S à T&nbsp;?',lab:'arêtes =',ans:3,hint:'Le BFS visite par distance croissante : à quelle « couche » T apparaît-il&nbsp;?',why:'Couche 1 : B, A. Couche 2 : D, C. Couche 3 : T, E. Un plus court chemin est S – B – D – T, soit 3 arêtes.'},
    {q:'c) Dans quel ordre <code class="code">dfs(G, \'S\', [])</code> visite-t-il les sommets&nbsp;?',opts:['S, B, D, T, E, C, A','S, B, A, D, C, T, E','S, A, C, E, T, D, B','S, B, C, E, T, D, A'],ans:0,hint:'Va toujours vers le premier voisin non vu de la liste, et ne reviens en arrière que si tous sont vus.',why:'S → B (premier voisin) → D → T → E (T a pour voisins E, D) → C (E a pour voisins T, C) → A. Ordre : S, B, D, T, E, C, A.'},
    {q:'d) Au moment où le DFS visite A, combien d’appels sont en attente sur la pile, celui de A compris&nbsp;?',lab:'appels =',ans:7,hint:'Le chemin de la pile est S → B → D → … → A. Aucun appel n’est encore terminé&nbsp;?',why:'Chaque sommet a été atteint depuis le précédent, sans retour en arrière : la pile contient S, B, D, T, E, C, A, soit 7 appels. Le DFS a suivi un chemin qui passe par tous les sommets.'},
   ],
   sol:`<p><b>BFS.</b> File [S]. On défile S et on enfile B, A. On défile B et on enfile D, C (S est vu). On défile A : C et S sont déjà vus. On défile D et on enfile T. On défile C et on enfile E. Puis T et E n’apportent rien. Ordre : S, B, A, D, C, T, E.</p><p>Le BFS visite par couches de distance : {S}, {B, A}, {D, C}, {T, E}. d(S, T) = 3, par exemple S – B – D – T.</p><p><b>DFS.</b> On suit à chaque fois le premier voisin non vu : S → B → D → T → E → C → A. Arrivé en A, aucun appel n’est terminé : la pile contient les 7 sommets. Le DFS a trouvé un chemin passant par tous les sommets, alors que le BFS, lui, construit un arbre « large ».</p><p>Changer l’ordre des listes d’adjacence change l’ordre de visite, mais pas les distances du BFS.</p>`},
  {kind:'Problème',h:'Compter les composantes connexes',p:`Une <b>composante connexe</b> est un groupe de sommets reliés entre eux par des chemins, et à rien d’autre. La fonction ci-dessous lance un parcours en profondeur, avec une pile explicite, depuis chaque sommet pas encore vu. Elle compte combien de parcours elle a dû lancer.`+graph(PB7CN,PB7CE,{},200)+py(`
G = {1: [2, 4], 2: [1, 3, 4], 3: [2], 4: [1, 2],
     5: [6], 6: [5], 7: [8], 8: [7], 9: []}

def composantes(G):
    vus, nb = set(), 0
    for s in G:
        if s not in vus:
            nb += 1
            pile = [s]
            while pile:
                u = pile.pop()
                if u not in vus:
                    vus.add(u)
                    for v in G[u]:
                        pile.append(v)
    return nb`),
   parts:[
    {q:'a) Que renvoie <code class="code">composantes(G)</code>&nbsp;?',lab:'nb =',ans:4,hint:'Un sommet isolé forme une composante à lui seul.',why:'Les composantes sont {1, 2, 3, 4}, {5, 6}, {7, 8} et {9} : 4 parcours lancés.'},
    {q:'b) Dans quel ordre les sommets 1, 2, 3, 4 sont-ils ajoutés à <i>vus</i>&nbsp;?',opts:['1, 2, 3, 4','1, 2, 4, 3','1, 4, 3, 2','1, 4, 2, 3'],ans:3,hint:'pop() retire le <b>dernier</b> élément empilé. Après 1, la pile vaut [2, 4].',why:'On dépile 1 et on empile 2, 4. On dépile 4 et on empile 1, 2. On dépile 2 et on empile 1, 3, 4. On dépile 4 (déjà vu), puis 3. Ordre : 1, 4, 2, 3.'},
    {q:'c) Combien de fois <code class="code">pile.append(v)</code> est-il exécuté en tout&nbsp;?',lab:'empilements =',ans:12,hint:'Chaque sommet n’est traité qu’une fois, et on empile alors tous ses voisins.',why:'On empile la liste de voisins de chaque sommet une seule fois : la somme des degrés, 2 + 3 + 1 + 2 + 1 + 1 + 1 + 1 + 0 = 12, soit 2 × 6 arêtes.'},
    {q:'d) Combien d’arêtes faut-il ajouter, au minimum, pour rendre le graphe connexe&nbsp;?',lab:'arêtes =',ans:3,hint:'Une arête nouvelle relie au mieux deux composantes en une seule.',why:'Chaque arête ajoutée fait baisser le nombre de composantes d’au plus 1. Pour passer de 4 à 1, il en faut au moins 3, et 3 suffisent (par exemple 3–5, 6–7, 8–9).'},
    {q:'e) Le graphe a 9 sommets, 4 composantes et 6 arêtes. Que peut-on en conclure&nbsp;?',opts:['Il n’a aucun cycle','Il contient au moins un cycle, car un graphe sans cycle à 9 sommets et 4 composantes a exactement 5 arêtes','On ne peut rien dire sans le dessin','Il est connexe'],ans:1,hint:'Une forêt (graphe sans cycle) est faite d’arbres. Combien d’arêtes a un arbre à k sommets&nbsp;?',why:'Chaque composante sans cycle est un arbre à kᵢ sommets et kᵢ − 1 arêtes. Le total vaut alors 9 − 4 = 5. Avec 6 arêtes, il y a un cycle : ici 1 – 2 – 4.'},
   ],
   sol:`<p>La boucle for lance un parcours depuis 1, ce qui marque 1, 4, 2, 3. Puis elle saute 2, 3, 4, lance un parcours depuis 5 (marque 5, 6), depuis 7 (marque 7, 8) et depuis 9. nb = 4.</p><p>Avec une pile, le dernier voisin empilé est exploré en premier. Les sommets peuvent être empilés plusieurs fois, mais le test u not in vus garantit qu’on ne les traite qu’une fois. Chaque liste de voisins est donc parcourue une fois : 12 empilements, soit la somme des degrés. Le coût total est O(n + m).</p><p>Il faut au moins nb − 1 = 3 arêtes pour tout relier. Enfin, une forêt à n sommets et k composantes a n − k arêtes. Ici 9 − 4 = 5 &lt; 6 : le graphe a un cycle, 1 – 2 – 4.</p>`},
]},

/* ================= 8. Plus court chemin et arbre couvrant ================= */
{subj:'ics', sem:'algo', id:'ics-dijkstra', h:'Plus court chemin et arbre couvrant', p:'L’algorithme de Dijkstra et l’arbre couvrant minimal de Kruskal.', steps:[
  {kind:'Théorie',h:'L’idée de Dijkstra',p:`<p>Un GPS ne compte pas les routes, il additionne des kilomètres ou des minutes. Le BFS ne suffit plus : un chemin de trois tronçons courts peut battre une seule route longue.</p><div class="def"><p>Dans un <b>graphe pondéré</b>, chaque arête u–v porte un <b>poids</b> w(u, v) ≥ 0. Le poids d’un chemin est la somme des poids de ses arêtes, et la <b>distance</b> d(s, v) est le plus petit poids d’un chemin de s à v. <b>Dijkstra</b> garde pour chaque sommet une <b>distance provisoire</b> d(v) : 0 pour s, ∞ pour les autres. À chaque étape, il <b>fixe</b> le sommet u non fixé de plus petite distance provisoire, puis il <b>relâche</b> chaque arête u–v : <b>d(v) ← min(d(v), d(u) + w(u, v))</b>.</p></div><div class="idea"><p>d(v) est le poids du meilleur chemin <b>connu</b> jusqu’ici. Relâcher u–v, c’est se demander : « passer par u pour aller en v est-il plus court que ce que je connais&nbsp;? ». Le sommet fixé est le plus proche de ceux qui restent ; on verra pourquoi sa distance est alors définitive.</p></div><div class="ex"><p>Graphe de l’étape suivante, depuis A. On fixe A (0) : d(B) = 4, d(C) = 2. On fixe C, le plus proche : l’arête C–B donne 2 + 1 = 3 &lt; 4, donc d(B) passe à 3. Le détour A → C → B bat l’arête directe A–B.</p></div><div class="warn"><p>Le code utilise un <b>tas</b> (module heapq) pour trouver vite le plus petit d(u) : le coût est O((n + m) log n), au lieu de O(n²) en cherchant le minimum à la main.</p></div>`,
   fig:py(`
import heapq

def dijkstra(G, s):        # G[u] = [(v, poids), ...]
    d = {s: 0}
    tas, fixes = [(0, s)], set()
    while tas:
        du, u = heapq.heappop(tas)
        if u in fixes:
            continue
        fixes.add(u)
        for v, w in G[u]:
            if v not in d or du + w < d[v]:
                d[v] = du + w
                heapq.heappush(tas, (d[v], v))
    return d`)},
  {h:'Dijkstra pas à pas',p:`<p>Avance le curseur : chaque étape fixe un sommet, puis relâche ses arêtes. Les nombres bleus sont les distances provisoires. Les arêtes épaisses relient chaque sommet à son <b>prédécesseur</b>, celui qui lui a donné sa distance actuelle.</p><div class="ex"><p>On fixe A (0) : B reçoit 4 et C reçoit 2. On fixe C (2) : B passe à 3, D reçoit 10, E reçoit 12. On fixe B (3) : D passe à 3 + 5 = 8. On fixe D (8) : E passe à 8 + 2 = 10 et F reçoit 14. On fixe E (10) : F passe à 13. On fixe F. Distances finales : A 0, C 2, B 3, D 8, E 10, F 13.</p></div><div class="idea"><p>Les sommets sont fixés dans l’ordre A, C, B, D, E, F, c’est-à-dire par <b>distance croissante</b>. Une distance provisoire ne fait que baisser, et elle ne bouge plus une fois le sommet fixé. Les arêtes épaisses forment à la fin l’<b>arbre des plus courts chemins</b> : pour aller en F, on remonte F ← E ← D ← B ← C ← A.</p></div><div class="warn"><p>Une distance provisoire n’est pas encore la distance : D reçoit d’abord 10 par C, puis 8 par B. Seule la valeur au moment où le sommet est <b>fixé</b> est sûre.</p></div>`,
   params:[{id:'k',l:'Étape',min:0,max:TDIJ.length-1,v:0}],
   draw:v=>{ const s=TDIJ[v.k]; return graph(WN,WE,{nc:k=>k===s.cur?'var(--spark)':s.fix.includes(k)?'var(--ok)':null,ec:treeEdge(s.par),sub:k=>s.d[k]===Infinity?'∞':String(s.d[k])},220); },
   info:v=>`${TDIJ[v.k].msg}<br>${legend([['var(--spark)','fixé à cette étape'],['var(--ok)','fixé']])}`},
  {kind:'Théorie',h:'Pourquoi une distance fixée est la bonne',p:`<p>Dijkstra ne revient jamais sur un sommet fixé. C’est ce qui le rend rapide, mais c’est aussi un pari : et si un chemin plus court vers ce sommet apparaissait plus tard&nbsp;?</p><div class="thm"><p>Si tous les poids sont <b>≥ 0</b>, au moment où Dijkstra fixe un sommet u, sa distance provisoire d(u) est la vraie distance d(s, u).</p></div><div class="why"><p>Invariant : pour tout sommet v non fixé, d(v) est le poids du meilleur chemin de s à v dont tous les sommets, sauf v, sont déjà fixés. Prends un chemin quelconque P de s à u et note y son premier sommet non fixé. Le morceau de P qui va de s à y ne passe que par des sommets fixés, donc il pèse au moins d(y). Or d(y) ≥ d(u), puisque u a la plus petite distance provisoire. Le reste de P, de y à u, a un poids ≥ 0. Donc P pèse au moins d(u) : aucun chemin ne bat d(u).</p></div><div class="ex"><p>Contre-exemple quand un poids est négatif, dans un graphe orienté : A→B (2), A→C (3), C→B (−2). Dijkstra fixe A, puis B avec d(B) = 2, puis C (3). L’arc C→B mènerait à B, déjà fixé, et il est ignoré. Pourtant A → C → B pèse 3 − 2 = 1 &lt; 2.</p></div><div class="idea"><p>Tout repose sur une phrase : « prolonger un chemin ne peut pas le raccourcir ». C’est vrai avec des poids ≥ 0, faux dès qu’un poids est négatif.</p></div>`},
  {kind:'Méthode',h:'Dérouler Dijkstra avec un tableau des distances',
   p:'Fais un tableau avec une colonne par sommet et une ligne par étape. Chaque case contient la distance provisoire et, en petit, le <b>prédécesseur</b> qui l’a donnée. À chaque étape : <b>fixe</b> le sommet non fixé de plus petite distance (souligne-le), puis, pour chacun de ses voisins non fixés v, calcule d(u) + poids(u, v) et garde le minimum avec l’ancienne valeur. Pour retrouver un chemin, remonte les prédécesseurs depuis l’arrivée.'+graph(DN,DE,{},200),
   demo:{enonce:'Distances depuis S, et plus court chemin de S à C.',
    etapes:[
     {f:'Départ : d(S) = 0, d(A) = d(B) = d(C) = ∞.',w:'Seule la source a une distance connue.'},
     {f:tab(['fixé','S','A','B','C'],[['S','<u>0</u>','1 (S)','4 (S)','∞'],['A','','<u>1</u>','3 (A)','7 (A)'],['B','','','<u>3</u>','6 (B)'],['C','','','','<u>6</u>']]),w:'Fixer A : B passe de 4 à 1 + 2 = 3 et C reçoit 1 + 6 = 7. Fixer B : C passe de 7 à 3 + 3 = 6.'},
     {f:'Distances : 0, 1, 3, 6.',w:'Les sommets sont fixés par distance croissante.'},
     {f:'Chemin : C ← B ← A ← S, soit S → A → B → C.',w:'On remonte les prédécesseurs de la dernière mise à jour de chaque sommet.'}],
    conclusion:'d(C) = 6 par S → A → B → C, alors que les arêtes directes S–B et A–C font croire à des chemins de 7.'},
   note:'Le tas de la fonction Python joue le rôle de « chercher le plus petit non fixé » : heappop renvoie le couple (distance, sommet) de plus petite distance.'},
  {h:'Changer un poids',p:'Dans ce même graphe, l’arête C–E passe de 10 à <b>5</b>. Quelle est alors la distance de A à F&nbsp;?',
   fig:graph(WN,WE.map(e=>e[0]==='C'&&e[1]==='E'?['C','E',5]:e),{},220),
   lab:'d(F) =',ans:10,
   why:'d(C) = 2, donc d(E) = 2 + 5 = 7, puis d(F) = 7 + 3 = 10. Le chemin par D donne 8 + 6 = 14, plus long. Plus court chemin : A → C → E → F.'},
  {h:'Pourquoi des poids positifs&nbsp;?',p:'Dijkstra peut se tromper si une arête a un poids <b>négatif</b>. Pourquoi&nbsp;?',
   opts:['Le tas ne sait pas stocker les nombres négatifs','La boucle ne termine plus','Un sommet fixé pourrait encore être atteint par un chemin plus court passant par l’arête négative','Le graphe devient orienté'],ans:2,
   why:'Dijkstra suppose qu’un chemin ne peut que s’allonger en ajoutant des arêtes. Avec un poids négatif, un détour par un sommet plus lointain peut raccourcir le chemin vers un sommet déjà fixé, et sa distance serait fausse.'},
  {kind:'Théorie',h:'Arbre couvrant minimal',p:`<p>Une commune veut relier six villages par fibre optique. Chaque tranchée possible a un coût. Il faut que tous les villages soient reliés, directement ou non, pour un coût total minimal. Une tranchée qui ferme une boucle ne sert à rien : on cherche un arbre.</p><div class="def"><p>Dans un graphe connexe, un <b>arbre couvrant</b> est un ensemble d’arêtes qui relie <b>tous</b> les sommets sans former de cycle. Avec <i>n</i> sommets, il a toujours <b>n − 1</b> arêtes. Son <b>poids</b> est la somme des poids de ses arêtes ; un <b>arbre couvrant minimal</b> (ACM) est un arbre couvrant de poids le plus petit possible.</p></div><div class="def"><p><b>Algorithme de Kruskal</b> : trier les arêtes par poids croissant ; les examiner dans cet ordre ; <b>garder</b> une arête si elle relie deux morceaux différents, la <b>rejeter</b> si ses deux extrémités sont déjà reliées (elle fermerait un cycle). On s’arrête à n − 1 arêtes.</p></div><div class="ex"><p>Graphe de l’étape suivante. Les plus légères sont B–C (1), A–C (2), D–E (2), E–F (3) : toutes gardées. A–B (4) est rejetée, car A et B sont déjà reliés par C. B–D (5) relie {A, B, C} à {D, E, F} : gardée. On a 5 arêtes, de poids 1 + 2 + 2 + 3 + 5 = 13.</p></div><div class="idea"><p>Dans le code, chef et racine identifient le morceau de chaque sommet : deux sommets sont dans le même morceau si et seulement s’ils ont la même racine.</p></div>`,
   fig:py(`
def kruskal(sommets, aretes):   # aretes = [(w, u, v), ...]
    chef = {s: s for s in sommets}
    def racine(x):
        while chef[x] != x:
            x = chef[x]
        return x
    arbre = []
    for w, u, v in sorted(aretes):
        ru, rv = racine(u), racine(v)
        if ru != rv:            # pas de cycle
            chef[ru] = rv
            arbre.append((u, v, w))
    return arbre`),
   note:'<b>Prim</b> fait autrement : il part d’un sommet et ajoute à chaque étape l’arête la plus légère qui sort de l’arbre déjà construit. Les deux donnent un arbre de même poids minimal.'},
  {h:'Kruskal pas à pas',p:`<p>Avance le curseur : chaque étape examine une arête, dans l’ordre des poids croissants. En vert, les arêtes gardées ; en orange, celle qu’on vient de garder ; en rouge pointillé, celles rejetées car elles fermeraient un cycle.</p><div class="idea"><p>Regarde les <b>morceaux</b> verts plutôt que les arêtes. Au départ, chaque sommet est un morceau. Une arête gardée soude deux morceaux en un seul ; il y en a donc un de moins à chaque fois. Avec 6 sommets, après 5 arêtes gardées, il ne reste qu’un morceau : l’arbre couvre tout.</p></div><div class="ex"><p>Après B–C et A–C, le morceau {A, B, C} est formé. A–B (4) a ses deux extrémités dedans : rejetée. Après D–E et E–F, le morceau {D, E, F} est formé. B–D (5) soude les deux morceaux : gardée, poids total 13. Les arêtes suivantes, D–F (6), C–D (8) et C–E (10), sont toutes rejetées.</p></div><div class="warn"><p>Une arête rejetée n’est pas « trop lourde » en soi : C–D (8) est rejetée parce que C et D sont déjà dans le même morceau, pas à cause de son poids. Une arête lourde est gardée si elle est la seule à relier deux morceaux.</p></div>`,
   params:[{id:'k',l:'Arêtes examinées',min:0,max:KR.length-1,v:0}],
   draw:v=>{ const s=KR[v.k], has=(L,u,w)=>L.some(e=>same(e[0],e[1],u,w));
     return graph(WN,WE,{ec:(u,w)=>s.cur&&same(s.cur[0],s.cur[1],u,w)&&has(s.acc,u,w)?{c:'var(--spark)',w:5,op:1}:has(s.acc,u,w)?{c:'var(--ok)',w:5,op:1}:has(s.rej,u,w)?{c:'var(--bad)',w:2,dash:true,op:1}:{c:'var(--muted)',w:2,op:.5}},220); },
   info:v=>`${KR[v.k].msg}<br>Arêtes gardées : ${KR[v.k].acc.length}, poids total ${KR[v.k].tot}`},
  {kind:'Théorie',h:'Pourquoi Kruskal donne le minimum',p:`<p>Kruskal ne revient jamais sur ses choix : il prend la plus légère arête utile et passe à la suite. Pourquoi ce choix « gourmand », fait sans regarder plus loin, mène-t-il au meilleur arbre&nbsp;?</p><div class="thm"><p><b>Propriété de la coupe</b> : coupe les sommets en deux groupes X et Y. Une arête de poids minimal parmi celles qui <b>traversent</b> la coupe (une extrémité dans X, l’autre dans Y) appartient à un arbre couvrant minimal.</p></div><div class="why"><p>Échange : soit T un ACM qui ne contient pas cette arête e = u–v. Dans T, un chemin relie u à v ; comme u ∈ X et v ∈ Y, il traverse la coupe par une arête f. Retirer f coupe T en deux morceaux, l’un avec u, l’autre avec v ; ajouter e les recolle. On obtient un arbre couvrant de poids w(T) − w(f) + w(e) ≤ w(T), car w(e) ≤ w(f). Il est donc minimal lui aussi, et il contient e.</p></div><div class="ex"><p>Quand Kruskal garde u–v, prends pour X le morceau de u. Les arêtes plus légères déjà examinées sont toutes à l’intérieur d’un morceau : aucune ne sort de X. u–v est donc la plus légère qui traverse la coupe, et la propriété dit qu’on peut la garder sans regret. Dans le graphe du cours, avec X = {A}, les arêtes qui sortent sont A–B (4) et A–C (2) : A–C est bien dans l’arbre.</p></div><div class="warn"><p>L’ordre croissant est indispensable. Triangle A–B (1), B–C (2), A–C (3) : en examinant A–C, puis B–C, puis A–B, on garde A–C et B–C, poids 5, alors que le minimum vaut 1 + 2 = 3.</p></div>`},
  {kind:'Méthode',h:'Dérouler Kruskal en suivant les morceaux',
   p:'Trie les arêtes par poids croissant. Tiens la liste des <b>morceaux</b> déjà formés : au départ, chaque sommet est seul. Pour chaque arête u–v : si u et v sont dans deux morceaux <b>différents</b>, garde l’arête et fusionne les deux morceaux ; s’ils sont dans le <b>même</b> morceau, un chemin les relie déjà, et l’arête fermerait un cycle : rejette-la. Arrête-toi dès que tu as n − 1 arêtes. Dans le code, chef et racine servent exactement à savoir si deux sommets sont dans le même morceau.'+graph(DN,DE,{},200),
   demo:{enonce:'Arbre couvrant minimal du graphe ci-dessus.',
    etapes:[
     {f:'Ordre : S–A (1), A–B (2), B–C (3), S–B (4), A–C (6).',w:'On trie une fois pour toutes.'},
     {f:'S–A : {S}, {A} différents, on garde. Morceaux {S, A}, {B}, {C}.',w:'Une arête gardée fusionne deux morceaux.'},
     {f:'A–B : gardée, {S, A, B}, {C}. B–C : gardée, {S, A, B, C}.',w:'On a n − 1 = 3 arêtes : l’arbre est complet.'},
     {f:'S–B serait rejetée : S et B sont dans le même morceau (S – A – B les relie).',w:'C’est la détection de cycle. Ici on s’arrête même avant de l’examiner.'}],
    conclusion:'Arbre : S–A, A–B, B–C, de poids 1 + 2 + 3 = 6.'}},
  {h:'Une arête rejetée',p:'Kruskal examine A–B (poids 4) après avoir gardé B–C, A–C, D–E et E–F. Pourquoi la rejette-t-il&nbsp;?',
   opts:['Son poids est trop grand','A–B fermerait le cycle A–B–C','A a déjà deux voisins dans l’arbre','B n’est relié à aucun autre sommet'],ans:1,
   why:'A et B sont déjà reliés par A–C puis C–B. Ajouter A–B créerait le cycle A–B–C : ce n’est plus un arbre.'},
  {h:'Nombre d’arêtes',p:'Un graphe connexe a 10 sommets et 25 arêtes. Combien d’arêtes contient un arbre couvrant minimal&nbsp;?',lab:'arêtes =',ans:9,
   why:'Un arbre à n sommets a toujours n − 1 arêtes, quel que soit le nombre d’arêtes du graphe : 10 − 1 = 9.'},
  {kind:'Défi',h:'Un poids qui change',p:'Dans le graphe de Kruskal, l’arête D–E passe de 2 à <b>7</b>. Quel est le poids total du nouvel arbre couvrant minimal&nbsp;?',
   fig:graph(WN,WE.map(e=>e[0]==='D'&&e[1]==='E'?['D','E',7]:e),{},220),
   lab:'poids =',ans:17,
   why:'Ordre : B–C (1), A–C (2), E–F (3), A–B (4, cycle), B–D (5), D–F (6), D–E (7, cycle)… On garde B–C, A–C, E–F, B–D, D–F : 1 + 2 + 3 + 5 + 6 = 17.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : Dijkstra et Kruskal',p:'<div class="keep"><ul><li><b>Graphe pondéré</b> : poids w ≥ 0 sur les arêtes ; poids d’un chemin = somme ; distance d(s, v) = poids minimal d’un chemin.</li><li><b>Dijkstra</b> : d(s) = 0, les autres à ∞. Fixer le sommet non fixé de plus petite distance, puis <b>relâcher</b> ses arêtes : d(v) ← min(d(v), d(u) + w(u, v)). Les sommets sont fixés par distance croissante.</li><li><b>Pourquoi</b> : avec des poids ≥ 0, prolonger un chemin ne le raccourcit pas, donc une distance fixée est définitive. Un poids négatif peut fausser le résultat.</li><li><b>Dérouler</b> : tableau des distances provisoires avec le prédécesseur ; le chemin se lit en remontant les prédécesseurs. Avec un tas : O((n + m) log n).</li><li><b>Arbre couvrant minimal</b> : n − 1 arêtes, sans cycle, reliant tous les sommets, de poids total minimal.</li><li><b>Kruskal</b> : arêtes par poids croissant ; garder celles qui relient deux morceaux différents, rejeter celles qui fermeraient un cycle ; arrêt à n − 1 arêtes. Justifié par la propriété de la coupe.</li><li>Dijkstra minimise chaque distance depuis une source, Kruskal le poids total : leurs arbres peuvent différer.</li></ul></div>'},
  {kind:'Problème',h:'Dijkstra sur un nouveau réseau',p:`Le graphe ci-dessous a les mêmes sommets et les mêmes arêtes que dans le cours, mais d’autres poids. On applique Dijkstra depuis <b>A</b>. À chaque étape, on fixe le sommet non fixé de plus petite distance provisoire, puis on relâche ses arêtes. Garde un tableau des distances provisoires.`+graph(WN,PB8E1,{},220),
   parts:[
    {q:'a) Quelle est la distance d(B) de A à B&nbsp;?',lab:'d(B) =',ans:5,hint:'L’arête directe A–B pèse 7. Y a-t-il un détour plus léger&nbsp;?',why:'Le détour A → C → B coûte 2 + 3 = 5 &lt; 7. C est fixé en premier (d = 2) et fait passer d(B) de 7 à 5.'},
    {q:'b) Quelle est la distance d(F)&nbsp;?',lab:'d(F) =',ans:11,hint:'Calcule d’abord d(D) et d(E), puis compare les deux façons d’arriver en F.',why:'d(D) = 5 + 1 = 6 et d(E) = 2 + 5 = 7 (le chemin par D donne 6 + 2 = 8). Puis d(F) = min(6 + 6, 7 + 4) = 11.'},
    {q:'c) Dans quel ordre les sommets sont-ils fixés&nbsp;?',opts:['A, B, C, D, E, F','A, C, E, B, D, F','A, C, B, D, E, F','A, C, B, E, D, F'],ans:2,hint:'Les distances finales sont 0, 2, 5, 6, 7, 11 : Dijkstra fixe les sommets par distance croissante.',why:'d(A) = 0, d(C) = 2, d(B) = 5, d(D) = 6, d(E) = 7, d(F) = 11. Les distances sont toutes différentes, donc l’ordre est A, C, B, D, E, F.'},
    {q:'d) Quel est le plus court chemin de A à F&nbsp;?',opts:['A → B → D → F','A → C → B → D → F','A → C → E → F','A → C → B → D → E → F'],ans:2,hint:'Remonte depuis F : quel relâchement a donné d(F) = 11&nbsp;?',why:'d(F) = 11 vient de E (7 + 4), et d(E) = 7 vient de C (2 + 5). Chemin : A → C → E → F. Les autres pèsent 14, 12 et 12.'},
   ],
   sol:`<p>Départ : d(A) = 0. On fixe A : d(B) = 7, d(C) = 2.</p><p>On fixe C (2) : d(B) = min(7, 2 + 3) = 5, d(D) = 10, d(E) = 7. On fixe B (5) : d(D) = min(10, 5 + 1) = 6. On fixe D (6) : d(E) reste 7 (6 + 2 = 8), d(F) = 12. On fixe E (7) : d(F) = min(12, 7 + 4) = 11. On fixe F.</p><p>Ordre de fixation : A, C, B, D, E, F, avec les distances 0, 2, 5, 6, 7, 11.</p><p>En notant pour chaque sommet d’où vient sa dernière mise à jour, on remonte F ← E ← C ← A : le plus court chemin est A → C → E → F, de poids 11.</p>`},
  {kind:'Problème',h:'Plus courts chemins ou arbre couvrant&nbsp;?',p:`Sur ce nouveau graphe, on calcule les distances depuis <b>A</b> avec Dijkstra, puis l’arbre couvrant minimal avec Kruskal. Les deux algorithmes construisent un arbre qui relie les 6 sommets. Mais ils ne répondent pas à la même question, et leurs arbres peuvent être différents.`+graph(WN,PB8E2,{},220),
   parts:[
    {q:'a) Quelle est la distance d(D) depuis A&nbsp;?',lab:'d(D) =',ans:8,hint:'Il y a trois façons d’arriver en D : par B, par C ou par E. Calcule d’abord d(B), d(C) et d(E).',why:'d(C) = 3, d(B) = 4 et d(E) = 3 + 4 = 7. Puis d(D) = min(4 + 5, 3 + 6, 7 + 1) = 8, par A → C → E → D.'},
    {q:'b) Quelle est la distance d(F)&nbsp;?',lab:'d(F) =',ans:11,hint:'Compare l’arrivée par D et l’arrivée par E.',why:'d(F) = min(d(D) + 3, d(E) + 6) = min(11, 13) = 11.'},
    {q:'c) Quel est le poids de l’arbre couvrant minimal&nbsp;?',lab:'poids =',ans:13,hint:'Trie les arêtes : D–E (1), B–C (2), A–C (3), D–F (3), A–B (4), C–E (4)… Garde-les tant qu’elles ne ferment pas de cycle, jusqu’à 5 arêtes.',why:'On garde D–E (1), B–C (2), A–C (3), D–F (3), on rejette A–B (4), et on garde C–E (4). 1 + 2 + 3 + 3 + 4 = 13.'},
    {q:'d) Quelle est la première arête rejetée par Kruskal&nbsp;?',opts:['C–E (4)','B–D (5)','A–B (4)','E–F (6)'],ans:2,hint:'Après D–E, B–C, A–C et D–F, les sommets A, B et C sont-ils déjà reliés&nbsp;?',why:'A–C et B–C relient déjà A, B et C. A–B fermerait le cycle A–B–C : elle est rejetée. C–E, de même poids, relie deux morceaux différents et est gardée, quel que soit l’ordre entre les deux.'},
    {q:'e) L’arbre des plus courts chemins depuis A (A–C, A–B, C–E, E–D, D–F) pèse 15, plus que l’arbre couvrant minimal. Est-ce une contradiction&nbsp;?',opts:['Oui : Dijkstra a dû se tromper','Non : Dijkstra minimise chaque distance depuis A, Kruskal minimise la somme de tous les poids de l’arbre, ce sont deux objectifs différents','Oui : les deux arbres devraient toujours être égaux','Non : c’est parce que le graphe contient des poids égaux'],ans:1,hint:'Compare ce que chaque algorithme cherche à rendre minimal.',why:'L’arbre de Kruskal relie B par B–C (2), mais alors A → B coûte 3 + 2 = 5 au lieu de 4. Chaque algorithme est optimal pour son propre critère : distances depuis une source pour Dijkstra, poids total pour Kruskal.'},
   ],
   sol:`<p><b>Dijkstra.</b> On fixe A (0) : d(B) = 4, d(C) = 3. On fixe C (3) : d(D) = 9, d(E) = 7. On fixe B (4) : D reste à 9. On fixe E (7) : d(D) = 8, d(F) = 13. On fixe D (8) : d(F) = 11. On fixe F. L’arbre des plus courts chemins est A–C, A–B, C–E, E–D, D–F, de poids 3 + 4 + 4 + 1 + 3 = 15.</p><p><b>Kruskal.</b> Ordre : D–E 1, B–C 2, A–C 3, D–F 3, A–B 4, C–E 4, B–D 5, C–D 6, E–F 6. On garde D–E, B–C, A–C, D–F, on rejette A–B (cycle A–B–C), on garde C–E. Les 5 arêtes sont trouvées : poids 13.</p><p>Les deux arbres diffèrent : l’arbre couvrant minimal remplace A–B (4) par B–C (2), ce qui allonge le trajet de A à B. Minimiser chaque distance depuis A et minimiser le poids total sont deux problèmes différents.</p>`},
]},
);
})();
