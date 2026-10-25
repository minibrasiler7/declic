/* Déclic — Informatique, Algorithmique (PREPA-025 / 026) */
(()=>{
/* ---------- petits outils SVG ---------- */
const SV=(h,s)=>`<svg viewBox="0 0 320 ${h}" width="320" role="img">${s}</svg>`;
const TX=(x,y,s,o={})=>`<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" font-size="${o.s||13}" font-weight="${o.w||700}" text-anchor="${o.a||'middle'}" fill="${o.c||'var(--ink)'}">${s}</text>`;
const RC=(x,y,w,h,o={})=>`<rect x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" width="${(+w).toFixed(1)}" height="${(+h).toFixed(1)}" rx="${o.rx??5}" fill="${o.f||'var(--surface)'}" fill-opacity="${o.fo??1}" stroke="${o.c||'var(--ink)'}" stroke-width="${o.sw??1.5}"/>`;
const LN=(x1,y1,x2,y2,o={})=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.c||'var(--muted)'}" stroke-width="${o.w??2}" ${o.dash?'stroke-dasharray="6 5"':''} opacity="${o.op??1}" stroke-linecap="round"/>`;
const sq=c=>`<span style="color:${c}">■</span>`;
const legend=l=>l.map(([c,s])=>`${sq(c)} ${s}`).join(' &nbsp; ');

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

CMS.push(
/* ================= 1. Correction et terminaison ================= */
{subj:'ics', sem:'algo', id:'cms-ics-correction', h:'Correction et terminaison', p:'Prouver qu’une boucle s’arrête et qu’elle calcule bien ce qu’on veut.', steps:[
  {kind:'Théorie',h:'Deux questions pour chaque algorithme',p:`Un algorithme est <b>correct</b> s’il <b>termine</b> pour toute entrée valide et s’il renvoie le résultat annoncé par sa spécification. Pour une boucle, on prouve la terminaison avec un <b>variant</b> et le résultat avec un <b>invariant</b>. Exemple : la somme 1 + 2 + … + <i>n</i>.`,
   fig:py(`
def somme(n):
    s, i = 0, 0
    while i < n:
        i = i + 1
        s = s + i
    return s`),
   note:'Tester sur quelques valeurs ne prouve rien : une preuve couvre toutes les entrées d’un coup.'},
  {h:'L’invariant reste vrai à chaque tour',p:`Un <b>invariant de boucle</b> est une propriété vraie avant la boucle et après chaque tour. Ici : <b>s = i(i + 1)/2</b>. Fais avancer la boucle et compare les deux colonnes.`,
   params:[{id:'n',l:'n',min:1,max:10,v:6},{id:'t',l:'Tours effectués',min:0,max:10,v:2}],
   draw:v=>{ const t=Math.min(v.t,v.n), c=26, x0=(320-v.n*c)/2; let s='';
     for(let k=1;k<=v.n;k++) for(let r=0;r<k;r++) s+=RC(x0+(k-1)*c,232-(r+1)*21,c-3,18,{f:k<=t?'var(--accent)':'var(--surface)',c:k<=t?'none':'var(--line)',sw:1,rx:3});
     for(let k=1;k<=v.n;k++) s+=TX(x0+(k-1)*c+(c-3)/2,248,k,{s:11,c:k<=t?'var(--ink)':'var(--muted)'});
     return SV(254,s); },
   info:v=>{ const t=Math.min(v.t,v.n); return `i = ${t}, s = ${t*(t+1)/2}, i(i + 1)/2 = ${t*(t+1)/2} ✓ &nbsp; variant n − i = ${v.n-t}${t===v.n?' : la boucle s’arrête, s = n(n + 1)/2':''}`; },
   note:'À la sortie, on a l’invariant <b>et</b> la négation de la condition (i = n). C’est leur combinaison qui donne le résultat.'},
  {h:'Reconnaître un invariant',p:`Dans la boucle ci-dessous, quelle propriété est un invariant&nbsp;?`,
   fig:py(`
p, k = 1, 0
while k < n:
    p = p * x
    k = k + 1`),
   opts:['p = x × k','p = xᵏ','p = xⁿ','k = n'],ans:1,
   why:'Avant la boucle, p = 1 = x⁰. Si p = xᵏ au début d’un tour, alors après le tour p·x = xᵏ⁺¹ et k vaut k + 1 : la propriété p = xᵏ est conservée. À la sortie k = n, donc p = xⁿ.'},
  {kind:'Théorie',h:'Le variant garantit l’arrêt',p:`Un <b>variant</b> est une quantité <b>entière, positive</b>, qui <b>décroît strictement</b> à chaque tour. Une suite d’entiers naturels strictement décroissante est finie, donc la boucle s’arrête. Dans l’algorithme d’Euclide, le variant est <i>b</i>, car <i>a</i> mod <i>b</i> &lt; <i>b</i>.`,
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
]},

/* ================= 2. Complexité ================= */
{subj:'ics', sem:'algo', id:'cms-ics-complexite', h:'Complexité et notation grand-O', p:'Compter les opérations d’un algorithme et comparer les vitesses de croissance.', steps:[
  {h:'Compter les opérations',p:`La <b>complexité</b> d’un algorithme est le nombre d’opérations élémentaires (affectation, comparaison, calcul, accès L[i]) en fonction de la taille <i>n</i> de l’entrée. Ici, chaque case colorée est un passage par <code class="code">c += 1</code>.`,
   params:[{id:'n',l:'n',min:2,max:12,v:5}],
   draw:v=>py(`
c = 0
for i in range(n):
    for j in range(i):
        c += 1`)+pairsGrid(v.n),
   info:v=>`Ligne i : i cases. Total c = 0 + 1 + … + (n − 1) = n(n − 1)/2 = <b>${v.n*(v.n-1)/2}</b>`},
  {h:'À toi',p:'Avec ce même code et <i>n</i> = 100, combien de fois <code class="code">c += 1</code> est-il exécuté&nbsp;?',lab:'c =',ans:4950,
   why:'c = n(n − 1)/2 = 100 × 99 / 2 = 4950.'},
  {kind:'Théorie',h:'La notation grand-O',p:`On écrit <b>f(n) = O(g(n))</b> s’il existe une constante <i>C</i> &gt; 0 et un rang <i>n</i>₀ tels que f(n) ≤ C·g(n) pour tout n ≥ n₀. En pratique, on garde le <b>terme dominant</b> et on oublie les constantes : n(n − 1)/2 = O(n²).`,
   fig:`<p style="text-align:center;line-height:1.9">O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ)<br><span style="color:var(--muted)">accès L[i] · dichotomie · parcours · tri fusion · double boucle · Fibonacci naïf</span></p>`,
   note:'En informatique, log n désigne en général log₂ n. Le changement de base ne change qu’une constante, donc O(log n) ne dépend pas de la base.'},
  {h:'Terme dominant',p:'Quelle est la complexité de <i>f</i>(<i>n</i>) = 3<i>n</i>² + 100 <i>n</i> log <i>n</i> + 7&nbsp;?',
   opts:['O(n log n)','O(3n²)','O(n²)','O(100 n log n)'],ans:2,
   why:'n log n est négligeable devant n² quand n grandit, et la constante 3 disparaît : f(n) = O(n²). Écrire O(3n²) n’est pas faux mais n’est pas l’usage.'},
  {h:'Comparer les croissances',p:'Élargis la fenêtre : les courbes qui semblaient proches au début s’écartent vite.',
   params:[{id:'N',l:'n jusqu’à',min:8,max:64,step:8,v:8}],
   draw:v=>{ const N=v.N, ym=Math.ceil(N*Math.log2(N)*1.15), P=plane({x:[0,N],y:[0,ym],w:320,h:220,grid:false,lx:N/4,ly:Math.ceil(ym/4)});
     P.fn(x=>Math.log2(x),{from:1,c:'var(--ok)'}).fn(x=>x,{c:'var(--math)'}).fn(x=>x*Math.log2(x),{from:1,c:'var(--spark)'}).fn(x=>x*x,{c:'var(--bad)'});
     const xs=Math.sqrt(ym)*.92;
     P.text(N*.97,Math.log2(N),'log n',{a:'end',dy:-6,c:'var(--ok)'}).text(N*.97,N*.97,'n',{a:'end',dy:-8,c:'var(--math)'}).text(N*.82,N*.82*Math.log2(N*.82),'n log n',{a:'end',dy:-8,c:'var(--spark)'}).text(xs,xs*xs,'n²',{dx:6,dy:12,c:'var(--bad)'});
     return P.svg(); },
   info:v=>`En n = ${v.N} : log₂ n = ${fmt(Math.log2(v.N),1)}, n = ${v.N}, n log₂ n = ${fmt(v.N*Math.log2(v.N),0)}, n² = ${v.N*v.N}`},
  {h:'Prévoir un temps de calcul',p:'Un algorithme en O(<i>n</i>²) met 2 s pour <i>n</i> = 1000. Combien de temps environ pour <i>n</i> = 3000&nbsp;?',lab:'t ≈',unit:'s',ans:18,tol:0.01,
   why:'Si n est multiplié par 3, n² est multiplié par 3² = 9. Donc t ≈ 2 × 9 = 18 s.'},
  {kind:'Théorie',h:'Meilleur cas, pire cas',p:`Pour une même taille <i>n</i>, le coût peut dépendre des données. Dans une recherche linéaire, si <i>x</i> est en tête, on fait <b>1</b> comparaison (meilleur cas) ; s’il est absent, on en fait <b>n</b> (pire cas). Sauf mention contraire, la complexité annoncée est celle du <b>pire cas</b>.`,
   fig:py(`
def contient(L, x):
    for y in L:
        if y == x:
            return True
    return False`),
   note:'Le pire cas est une garantie : l’algorithme ne fera jamais plus que ça.'},
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
]},

/* ================= 3. Récursivité ================= */
{subj:'ics', sem:'algo', id:'cms-ics-recursivite', h:'Récursivité', p:'Une fonction qui s’appelle elle-même, la pile d’appels et le coût caché de Fibonacci.', steps:[
  {kind:'Théorie',h:'Une fonction qui s’appelle',p:`Une fonction <b>récursive</b> s’appelle elle-même sur une entrée plus petite. Il lui faut un <b>cas de base</b>, traité sans appel, et un <b>appel récursif</b> qui s’en rapproche. Exemple : n! = n × (n − 1)! et 0! = 1.`,
   fig:py(`
def fact(n):
    if n == 0:          # cas de base
        return 1
    return n * fact(n - 1)   # appel récursif`),
   note:'La preuve d’une fonction récursive est une récurrence : le cas de base est l’initialisation, l’appel récursif l’hérédité.'},
  {h:'La pile d’appels',p:'Chaque appel est mis en attente sur une <b>pile</b> jusqu’à ce que l’appel du dessus lui renvoie sa valeur. Suis <code class="code">fact(4)</code> pas à pas.',
   params:[{id:'k',l:'Étape',min:0,max:FACT.length-1,v:0}],
   draw:v=>stackFig(FACT[v.k]),
   info:v=>`${FACT[v.k].msg} &nbsp; (pile : ${FACT[v.k].fr.length} appel${FACT[v.k].fr.length>1?'s':''})`,
   note:'La pile monte jusqu’au cas de base, puis redescend en calculant les produits : 1, 1, 2, 6, 24.'},
  {h:'Sans cas de base',p:'Que se passe-t-il si on supprime les deux premières lignes de <code class="code">fact</code> et qu’on appelle <code class="code">fact(3)</code>&nbsp;?',
   opts:['La fonction renvoie 0','La fonction renvoie 6','Les appels ne s’arrêtent jamais et Python lève une RecursionError','Python refuse de définir la fonction'],ans:2,
   why:'fact(3) appelle fact(2), fact(1), fact(0), fact(−1)… sans fin. La pile grandit jusqu’à la limite de Python (environ 1000 appels) et on obtient RecursionError.'},
  {h:'Compter les appels',p:'Combien d’appels à <code class="code">fact</code> au total (le premier compris) pour calculer <code class="code">fact(5)</code>&nbsp;?',lab:'appels =',ans:6,
   why:'fact(5), fact(4), fact(3), fact(2), fact(1), fact(0) : 6 appels. En général n + 1 appels, donc O(n).'},
  {kind:'Théorie',h:'Fibonacci naïf : l’arbre explose',p:`F(0) = 0, F(1) = 1 et F(n) = F(n − 1) + F(n − 2). La version récursive directe fait <b>deux</b> appels par niveau et recalcule sans cesse les mêmes valeurs (en orange : les appels à F(2)).`,
   params:[{id:'n',l:'n',min:1,max:6,v:4}],
   draw:v=>py(`
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`)+FIB[v.n].svg,
   info:v=>`fib(${v.n}) = ${fibv(v.n)} &nbsp; ${FIB[v.n].calls} appels${FIB[v.n].f2?`, dont ${FIB[v.n].f2} fois fib(2)`:''}<br>${legend([['var(--ok)','cas de base'],['var(--spark)','fib(2)'],['var(--accent)','autres']])}`,
   note:'Le nombre d’appels A(n) vérifie A(n) = 1 + A(n − 1) + A(n − 2) : il croît comme Fibonacci lui-même, c’est-à-dire exponentiellement (environ 1,618ⁿ).'},
  {h:'Le coût de la version naïve',p:'Combien d’appels à <code class="code">fib</code> (le premier compris) pour calculer <code class="code">fib(7)</code>&nbsp;?',lab:'appels =',ans:41,
   why:'A(0) = A(1) = 1 et A(n) = 1 + A(n − 1) + A(n − 2). Donc A(2) = 3, A(3) = 5, A(4) = 9, A(5) = 15, A(6) = 25, A(7) = 1 + 25 + 15 = 41.'},
  {kind:'Théorie',h:'Récursion ou itération',p:`Toute fonction récursive peut s’écrire avec une boucle. La version itérative de Fibonacci garde les deux derniers termes : <b>O(n)</b> opérations au lieu d’un coût exponentiel, et aucune pile d’appels.`,
   fig:py(`
def fib_iter(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`),
   note:'La récursion reste idéale quand le problème se découpe naturellement (tri fusion, parcours d’arbre). Le danger vient des sous-problèmes recalculés, pas de la récursion elle-même.'},
  {h:'Mémoire de la pile',p:'Combien de mémoire la pile d’appels utilise-t-elle au maximum pour <code class="code">fact(n)</code> récursif&nbsp;?',
   opts:['O(1)','O(log n)','O(n)','O(n²)'],ans:2,
   why:'Au moment du cas de base, les n + 1 appels fact(n), …, fact(0) sont tous en attente sur la pile : O(n). La version itérative, elle, n’utilise que O(1).'},
  {kind:'Défi',h:'Que calcule-t-elle&nbsp;?',p:'Que renvoie <code class="code">f(2024)</code>&nbsp;?',
   fig:py(`
def f(n):
    if n == 0:
        return 0
    return n % 10 + f(n // 10)`),
   lab:'f(2024) =',ans:8,
   why:'n % 10 est le dernier chiffre et n // 10 enlève ce chiffre : f fait la somme des chiffres. f(2024) = 4 + 2 + 0 + 2 + f(0) = 8.'},
]},

/* ================= 4. Recherche ================= */
{subj:'ics', sem:'algo', id:'cms-ics-recherche', h:'Recherche linéaire et dichotomique', p:'Chercher un élément, et aller beaucoup plus vite quand la liste est triée.', steps:[
  {kind:'Théorie',h:'La recherche linéaire',p:`On parcourt la liste du début à la fin et on s’arrête dès qu’on trouve <i>x</i>. Elle marche sur <b>n’importe quelle liste</b>, mais coûte jusqu’à <b>n</b> comparaisons : O(n).`,
   fig:py(`
def recherche(L, x):
    for i in range(len(L)):
        if L[i] == x:
            return i
    return -1`)},
  {h:'Le pire cas',p:'Une liste contient 50 éléments et <i>x</i> n’y est pas. Combien de comparaisons <code class="code">L[i] == x</code> fait la recherche linéaire&nbsp;?',lab:'comparaisons =',ans:50,
   why:'Pour conclure que x est absent, il faut l’avoir comparé à chacun des 50 éléments.'},
  {kind:'Théorie',h:'La dichotomie',p:`Si la liste est <b>triée</b>, on compare <i>x</i> à l’élément du milieu <i>L</i>[<i>m</i>] et on élimine la moitié qui ne peut pas le contenir. La zone de recherche [g ; d] est divisée par deux à chaque tour.`,
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
    return -1`),
   note:'Invariant : si x est dans L, il est dans L[g..d]. Variant : d − g + 1, la taille de la zone, qui décroît strictement.'},
  {h:'Les bornes bougent',p:'Choisis une cible et avance tour par tour. Les barres grises sont éliminées.',
   params:[{id:'c',l:'Cible',min:0,max:CIBLES.length-1,v:11},{id:'k',l:'Étape',min:0,max:DTMAX,v:0}],
   draw:v=>dichoFig(DT[v.c],v.k),
   info:v=>{ const t=DT[v.c]; return `x = <b>${CIBLES[v.c]}</b> &nbsp; ${t[Math.min(v.k,t.length-1)].msg}`; }},
  {kind:'Pratique',h:'Le chemin le plus long',p:'Choisis une cible <b>présente</b> dans la liste que la dichotomie ne trouve qu’au <b>4e tour</b>.',
   params:[{id:'c',l:'Cible',min:0,max:LD.length-1,v:7}],
   draw:v=>dichoFig(DT[v.c],DTMAX),
   info:v=>`x = ${CIBLES[v.c]} : trouvé en ${toursD(DT[v.c])} tour(s)`,
   ok:v=>toursD(DT[v.c])===4,
   why:'Les éléments d’indice pair (2, 8, 16, 38, 56, 72, 90, 99) sont tout en bas de l’arbre de décision : il faut 4 tours. Le milieu, 45, est trouvé en 1 tour.'},
  {kind:'Théorie',h:'Combien de tours au plus&nbsp;?',p:`Chaque tour fait passer la zone de <i>k</i> éléments à au plus ⌊k/2⌋. Avec <i>t</i> tours, on traite au plus 2ᵗ − 1 éléments. Le nombre maximal de tours est donc`,
   fig:`<p style="text-align:center;font-size:20px"><b>⌈log₂(n + 1)⌉</b></p><p style="text-align:center;color:var(--muted)">n = 1, 3, 7, 15, 31 → 1, 2, 3, 4, 5 tours</p>`,
   note:'Doubler la taille de la liste n’ajoute qu’<b>un</b> tour : la dichotomie est en O(log n).'},
  {h:'Mille éléments',p:'Combien de tours au plus fait la dichotomie sur une liste triée de 1000 éléments&nbsp;?',lab:'tours =',ans:10,
   why:'⌈log₂(1001)⌉ = 10, car 2⁹ = 512 &lt; 1001 ≤ 1024 = 2¹⁰.'},
  {h:'Sans la précondition',p:'On applique <code class="code">dichotomie([4, 1, 9, 7, 3], 1)</code>. Que se passe-t-il&nbsp;?',
   opts:['Elle renvoie 1','Elle renvoie −1 alors que 1 est présent','Elle boucle sans fin','Elle trie d’abord la liste'],ans:1,
   why:'g = 0, d = 4, m = 2 : L[2] = 9 &gt; 1, donc d = 1. Puis m = 0 : L[0] = 4 &gt; 1, donc d = −1 et on sort avec −1. La liste n’étant pas triée, l’élimination d’une moitié n’est plus justifiée.'},
  {kind:'Défi',h:'Un million',p:'Une liste triée contient 1 000 000 d’éléments. Combien de tours au plus fait la dichotomie&nbsp;?',lab:'tours =',ans:20,
   why:'2¹⁹ = 524 288 &lt; 1 000 001 ≤ 2²⁰ = 1 048 576, donc ⌈log₂(1 000 001)⌉ = 20. La recherche linéaire pourrait faire un million de comparaisons.'},
]},

/* ================= 5. Tris simples ================= */
{subj:'ics', sem:'algo', id:'cms-ics-tris', h:'Tris simples', p:'Insertion, bulles et sélection, pas à pas, et pourquoi ils coûtent O(n²).', steps:[
  {kind:'Théorie',h:'Le tri par insertion',p:`On trie comme une main de cartes : le début de la liste est déjà trié, et on y fait glisser l’élément suivant vers la gauche tant que son voisin est plus grand. Invariant : après le tour <i>i</i>, <i>L</i>[0..i] est trié.`,
   fig:py(`
def tri_insertion(L):
    for i in range(1, len(L)):
        j = i
        while j > 0 and L[j-1] > L[j]:
            L[j-1], L[j] = L[j], L[j-1]
            j = j - 1`)},
  {h:'Insertion pas à pas',p:'Avance étape par étape. Chaque étape est une comparaison entre deux voisins.',
   params:[{id:'k',l:'Étape',min:0,max:TINS.length-1,v:0}],
   draw:v=>sortStep(TINS,v.k),
   info:v=>`${TINS[v.k].msg}<br>${sortLeg}`,
   note:`Sur cette liste : ${TINS.length-2} comparaisons. Sur une liste déjà triée, chaque élément ne fait qu’une comparaison.`},
  {h:'Après deux tours',p:'On applique le tri par insertion à <code class="code">[7, 3, 5, 1]</code>. À quoi ressemble la liste à la fin du tour <i>i</i> = 2&nbsp;?',
   opts:['[3, 7, 5, 1]','[1, 3, 5, 7]','[3, 5, 7, 1]','[3, 5, 1, 7]'],ans:2,
   why:'Tour i = 1 : 3 passe devant 7, on obtient [3, 7, 5, 1]. Tour i = 2 : 5 passe devant 7 mais pas devant 3, on obtient [3, 5, 7, 1]. Le 1 n’a pas encore été traité.'},
  {kind:'Théorie',h:'Le tri à bulles',p:'On parcourt la liste en échangeant chaque paire de voisins mal ordonnés. À la fin de chaque passe, le plus grand élément restant est remonté à sa place, comme une bulle.',
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
  {h:'Compter les comparaisons',p:'Combien de comparaisons <code class="code">L[j] &gt; L[j+1]</code> fait ce tri à bulles sur une liste de 10 éléments&nbsp;?',lab:'comparaisons =',ans:45,
   why:'La passe i fait n − 1 − i comparaisons : 9 + 8 + … + 1 = 10 × 9 / 2 = 45, quel que soit l’ordre initial.'},
  {kind:'Théorie',h:'Le tri par sélection',p:'On cherche le minimum de la partie non triée, puis on l’échange avec la première case de cette partie. Le minimum provisoire est en violet.',
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
  {h:'Une liste déjà triée',p:'On donne une liste <b>déjà triée</b> de <i>n</i> éléments. Quel tri fait le moins de comparaisons&nbsp;?',
   opts:['Le tri à bulles','Le tri par sélection','Les trois en font autant','Le tri par insertion'],ans:3,
   why:'L’insertion compare chaque élément à son voisin de gauche, voit qu’il est en ordre et s’arrête : n − 1 comparaisons, O(n). Bulles (sans arrêt anticipé) et sélection en font toujours n(n − 1)/2.'},
  {kind:'Théorie',h:'Bilan des complexités',p:'Les trois tris sont <b>en place</b> (aucune liste auxiliaire) et coûtent <b>O(n²)</b> dans le pire cas, à cause des deux boucles imbriquées.',
   fig:`<table style="margin:auto;border-collapse:collapse;text-align:center"><tr><th style="padding:4px 10px"></th><th style="padding:4px 10px">meilleur cas</th><th style="padding:4px 10px">pire cas</th><th style="padding:4px 10px">échanges</th></tr><tr><td><b>insertion</b></td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td></tr><tr><td><b>bulles</b></td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td></tr><tr><td><b>sélection</b></td><td>O(n²)</td><td>O(n²)</td><td>≤ n − 1</td></tr></table>`,
   note:'Le tri à bulles devient O(n) dans le meilleur cas si on s’arrête dès qu’une passe ne fait aucun échange.'},
  {kind:'Défi',h:'Compter les échanges',p:'Combien d’échanges fait le tri par insertion sur <code class="code">[5, 2, 9, 1, 6, 3, 8, 4]</code>&nbsp;? Indice : chaque échange corrige exactement une paire mal ordonnée (une <b>inversion</b>).',
   lab:'échanges =',ans:13,
   why:'On compte les inversions, les paires (a, b) avec a avant b et a &gt; b : 5 en crée 4 (avec 2, 1, 3, 4), 2 en crée 1, 9 en crée 5, 1 aucune, 6 en crée 2, 3 aucune, 8 en crée 1. Total 4 + 1 + 5 + 2 + 1 = 13.'},
]},

/* ================= 6. Tri fusion ================= */
{subj:'ics', sem:'algo', id:'cms-ics-fusion', h:'Tri fusion', p:'Diviser pour régner : couper en deux, trier chaque moitié, fusionner.', steps:[
  {kind:'Théorie',h:'Diviser pour régner',p:`On <b>divise</b> la liste en deux moitiés, on les trie <b>récursivement</b>, puis on <b>fusionne</b> les deux listes triées. Le cas de base est une liste de longueur 0 ou 1, déjà triée.`,
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
  {h:'Fusionner deux listes triées',p:'On compare les deux têtes et on prend la plus petite. Dès qu’une liste est vide, on recopie l’autre.',
   params:[{id:'k',l:'Étape',min:0,max:TFUS.length-1,v:0}],
   draw:v=>fusFig(TFUS[v.k]),
   info:v=>TFUS[v.k].msg,
   note:'Chaque comparaison place un élément dans R : la fusion de listes de longueurs p et q coûte au plus p + q − 1 comparaisons.'},
  {h:'Au plus combien&nbsp;?',p:'On fusionne une liste triée de 5 éléments avec une liste triée de 7 éléments. Combien de comparaisons au maximum&nbsp;?',lab:'comparaisons =',ans:11,
   why:'Chaque comparaison place un élément. Dans le pire cas, il reste un seul élément quand une liste se vide : 5 + 7 − 1 = 11.'},
  {kind:'Théorie',h:'Les niveaux de la récursion',p:`Vu de bas en haut, on fusionne des blocs de 1, puis de 2, puis de 4… Il y a <b>log₂ n</b> niveaux, et chaque niveau coûte au plus <b>n</b> comparaisons. D’où un coût <b>O(n log n)</b>, même dans le pire cas.`,
   params:[{id:'k',l:'Niveau',min:0,max:NIV.length-1,v:0}],
   draw:v=>nivFig(v.k),
   info:v=>v.k===0?'Niveau 0 : 8 blocs de taille 1, triés par définition.':`Niveau ${v.k} : blocs de taille ${NIV[v.k].b}, ${NIV[v.k].c} comparaisons à ce niveau (au plus 8).`,
   note:'Équation de coût : C(n) = 2 C(n/2) + n, qui donne C(n) = n log₂ n pour n = 2ᵏ. Le prix à payer : une mémoire auxiliaire O(n) pour les listes fusionnées.'},
  {h:'Combien de niveaux&nbsp;?',p:'Pour trier 1024 éléments, combien de niveaux de fusion le tri fusion empile-t-il&nbsp;?',lab:'niveaux =',ans:10,
   why:'On passe de blocs de 1 à un bloc de 1024 en doublant à chaque niveau : 2¹⁰ = 1024, donc 10 niveaux.'},
  {kind:'Théorie',h:'La stabilité',p:`Un tri est <b>stable</b> s’il garde l’ordre initial des éléments égaux. Exemple : on trie des élèves par note, Ana (5) avant Léo (5) dans la liste de départ. Un tri stable laisse Ana devant Léo.`,
   fig:`<p style="text-align:center">[(Ana, 5), (Zoé, 4), (Léo, 5)] → <b>[(Zoé, 4), (Ana, 5), (Léo, 5)]</b></p>`,
   note:'La stabilité permet de trier en plusieurs passes : par prénom, puis par note, et les ex æquo restent rangés par prénom.'},
  {h:'D’où vient la stabilité&nbsp;?',p:'Dans <code class="code">fusion</code>, A vient avant B dans la liste de départ. Quel test rend le tri fusion stable&nbsp;?',
   opts:['if A[i] &lt; B[j]','if A[i] &lt;= B[j]','if A[i] &gt; B[j]','if A[i] != B[j]'],ans:1,
   why:'En cas d’égalité, A[i] &lt;= B[j] prend l’élément de A, qui était avant dans la liste. Avec &lt;, on prendrait celui de B en premier et on inverserait les ex æquo.'},
  {kind:'Défi',h:'Le gain concret',p:'Pour <i>n</i> = 2¹⁶ = 65 536, l’insertion fait environ <i>n</i>²/2 comparaisons dans le pire cas et le tri fusion environ <i>n</i> log₂ <i>n</i>. Combien de fois moins de comparaisons pour le tri fusion&nbsp;?',lab:'rapport =',ans:2048,
   why:'(n²/2) / (n log₂ n) = n / (2 log₂ n) = 65 536 / 32 = 2048.'},
]},

/* ================= 7. Graphes ================= */
{subj:'ics', sem:'algo', id:'cms-ics-graphes', h:'Graphes et parcours', p:'Représenter un graphe et le parcourir en largeur ou en profondeur.', steps:[
  {kind:'Théorie',h:'Sommets et arêtes',p:`Un <b>graphe</b> G = (S, A) est un ensemble de <b>sommets</b> S reliés par des <b>arêtes</b> A. Il est <b>non orienté</b> si chaque arête se parcourt dans les deux sens. Deux sommets reliés sont <b>voisins</b>, et le <b>degré</b> d’un sommet est son nombre de voisins.`,
   fig:graph(GN,GE,{sub:k=>''},200),
   note:'Ce graphe a 7 sommets et 8 arêtes. B a pour voisins A, D et E : son degré vaut 3.'},
  {kind:'Théorie',h:'Deux représentations',p:`La <b>matrice d’adjacence</b> M a un 1 en ligne u, colonne v si u et v sont voisins. Les <b>listes d’adjacence</b> donnent, pour chaque sommet, la liste de ses voisins (un dictionnaire en Python).`,
   fig:(()=>{ const K=Object.keys(GN); return `<div style="text-align:center">${mat([['',...K.map(k=>`<b>${k}</b>`)],...K.map(u=>[`<b>${u}</b>`,...K.map(v=>ADJ[u].includes(v)?'1':'<span style="color:var(--muted)">0</span>')])])}</div>`+py(`
G = {'A': ['B', 'C'], 'B': ['A', 'D', 'E'],
     'C': ['A', 'F'], 'D': ['B', 'G'],
     'E': ['B', 'F'], 'F': ['C', 'E', 'G'],
     'G': ['D', 'F']}`); })(),
   note:'La matrice occupe n² cases même si le graphe a peu d’arêtes. Les listes n’occupent que O(n + m), avec m le nombre d’arêtes.'},
  {h:'Compter les 1',p:'Combien de 1 contient la matrice d’adjacence de ce graphe à 8 arêtes&nbsp;?',lab:'nombre de 1 =',ans:16,
   why:'Chaque arête {u, v} donne deux 1, en (u, v) et en (v, u) : 2 × 8 = 16. C’est aussi la somme des degrés.'},
  {h:'Choisir la représentation',p:'Tu dois tester très souvent si deux sommets <i>u</i> et <i>v</i> sont voisins. Quelle représentation répond en O(1)&nbsp;?',
   opts:['Les listes d’adjacence','La matrice d’adjacence','Les deux','Aucune des deux'],ans:1,
   why:'Dans la matrice, il suffit de lire M[u][v] : O(1). Avec les listes, il faut parcourir les voisins de u, en O(degré de u). En revanche, pour parcourir tous les voisins, les listes sont plus efficaces.'},
  {kind:'Théorie',h:'Parcours en largeur (BFS)',p:`Le <b>BFS</b> visite les sommets par distance croissante au départ : d’abord ses voisins, puis les voisins des voisins… Il utilise une <b>file</b> (premier entré, premier sorti) et marque les sommets dès qu’ils y entrent.`,
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
    return ordre`),
   note:'Chaque sommet entre une fois dans la file et chaque liste de voisins est lue une fois : O(n + m).'},
  {h:'Le BFS pas à pas',p:'Les voisins sont pris par ordre alphabétique. Les arêtes épaisses forment l’<b>arbre du parcours</b>.',
   params:[{id:'k',l:'Étape',min:0,max:TBFS.length-1,v:0}],
   draw:v=>{ const s=TBFS[v.k]; return graph(GN,GE,{nc:k=>k===s.cur?'var(--spark)':s.ord.includes(k)?'var(--ok)':s.F.includes(k)?'var(--other)':null,ec:treeEdge(s.par)},200); },
   info:v=>{ const s=TBFS[v.k]; return `${s.msg}<br>Ordre : ${s.ord.join(', ')||'–'} &nbsp; File : [${s.F.join(', ')}]<br>${legend([['var(--spark)','défilé'],['var(--ok)','visité'],['var(--other)','dans la file']])}`; },
   note:'Dans l’arbre du BFS, le chemin de A à un sommet est un plus court chemin en nombre d’arêtes.'},
  {h:'Ordre du BFS',p:'Dans quel ordre le BFS depuis A visite-t-il les sommets (voisins par ordre alphabétique)&nbsp;?',
   opts:['A, B, D, G, F, C, E','A, C, B, F, E, D, G','A, B, C, D, E, F, G','A, B, C, D, E, G, F'],ans:2,
   why:'Distance 0 : A. Distance 1 : B, C. Distance 2 : D, E (voisins de B), puis F (voisin de C). Distance 3 : G. D’où A, B, C, D, E, F, G. La première option est l’ordre du DFS.'},
  {kind:'Théorie',h:'Parcours en profondeur (DFS)',p:'Le <b>DFS</b> fonce le plus loin possible : il visite un voisin non vu, puis un voisin de ce voisin… et ne revient en arrière que dans une impasse. La version récursive utilise la pile d’appels.',
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
  {kind:'Défi',h:'Un DFS depuis C',p:'On lance le DFS depuis <b>C</b>, voisins par ordre alphabétique. Quel est le <b>4e</b> sommet visité&nbsp;?',fig:graph(GN,GE,{},200),
   opts:['B','F','G','D'],ans:3,
   why:'C a pour voisins A, F : on va en A. A a pour voisins B, C : on va en B. B a pour voisins A, D, E : on va en D. L’ordre complet est C, A, B, D, G, F, E.'},
]},

/* ================= 8. Plus court chemin et arbre couvrant ================= */
{subj:'ics', sem:'algo', id:'cms-ics-dijkstra', h:'Plus court chemin et arbre couvrant', p:'L’algorithme de Dijkstra et l’arbre couvrant minimal de Kruskal.', steps:[
  {kind:'Théorie',h:'L’idée de Dijkstra',p:`Dans un graphe à poids <b>positifs</b>, on cherche les distances depuis A. On garde une distance provisoire d(v) pour chaque sommet. À chaque étape, on <b>fixe</b> le sommet non fixé de plus petite distance, puis on <b>relâche</b> ses arêtes : d(v) ← min(d(v), d(u) + poids(u, v)).`,
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
    return d`),
   note:'Avec un tas, le coût est O((n + m) log n).'},
  {h:'Dijkstra pas à pas',p:'Les nombres bleus sont les distances provisoires. Les arêtes épaisses indiquent par où passe le meilleur chemin connu.',
   params:[{id:'k',l:'Étape',min:0,max:TDIJ.length-1,v:0}],
   draw:v=>{ const s=TDIJ[v.k]; return graph(WN,WE,{nc:k=>k===s.cur?'var(--spark)':s.fix.includes(k)?'var(--ok)':null,ec:treeEdge(s.par),sub:k=>s.d[k]===Infinity?'∞':String(s.d[k])},220); },
   info:v=>`${TDIJ[v.k].msg}<br>${legend([['var(--spark)','fixé à cette étape'],['var(--ok)','fixé']])}`,
   note:'Une fois fixée, une distance ne change plus : tout autre chemin passe par un sommet non fixé, déjà au moins aussi loin.'},
  {h:'Changer un poids',p:'Dans ce même graphe, l’arête C–E passe de 10 à <b>5</b>. Quelle est alors la distance de A à F&nbsp;?',
   fig:graph(WN,WE.map(e=>e[0]==='C'&&e[1]==='E'?['C','E',5]:e),{},220),
   lab:'d(F) =',ans:10,
   why:'d(C) = 2, donc d(E) = 2 + 5 = 7, puis d(F) = 7 + 3 = 10. Le chemin par D donne 8 + 6 = 14, plus long. Plus court chemin : A → C → E → F.'},
  {h:'Pourquoi des poids positifs&nbsp;?',p:'Dijkstra peut se tromper si une arête a un poids <b>négatif</b>. Pourquoi&nbsp;?',
   opts:['Le tas ne sait pas stocker les nombres négatifs','La boucle ne termine plus','Un sommet fixé pourrait encore être atteint par un chemin plus court passant par l’arête négative','Le graphe devient orienté'],ans:2,
   why:'Dijkstra suppose qu’un chemin ne peut que s’allonger en ajoutant des arêtes. Avec un poids négatif, un détour par un sommet plus lointain peut raccourcir le chemin vers un sommet déjà fixé, et sa distance serait fausse.'},
  {kind:'Théorie',h:'Arbre couvrant minimal',p:`Un <b>arbre couvrant</b> relie tous les sommets sans cycle : avec <i>n</i> sommets, il a <b>n − 1</b> arêtes. On veut celui de poids total minimal. <b>Kruskal</b> : on trie les arêtes par poids croissant et on garde chaque arête qui ne crée pas de cycle.`,
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
  {h:'Kruskal pas à pas',p:'En vert : les arêtes gardées. En rouge pointillé : celles rejetées car elles fermeraient un cycle.',
   params:[{id:'k',l:'Arêtes examinées',min:0,max:KR.length-1,v:0}],
   draw:v=>{ const s=KR[v.k], has=(L,u,w)=>L.some(e=>same(e[0],e[1],u,w));
     return graph(WN,WE,{ec:(u,w)=>s.cur&&same(s.cur[0],s.cur[1],u,w)&&has(s.acc,u,w)?{c:'var(--spark)',w:5,op:1}:has(s.acc,u,w)?{c:'var(--ok)',w:5,op:1}:has(s.rej,u,w)?{c:'var(--bad)',w:2,dash:true,op:1}:{c:'var(--muted)',w:2,op:.5}},220); },
   info:v=>`${KR[v.k].msg}<br>Arêtes gardées : ${KR[v.k].acc.length}, poids total ${KR[v.k].tot}`},
  {h:'Une arête rejetée',p:'Kruskal examine A–B (poids 4) après avoir gardé B–C, A–C, D–E et E–F. Pourquoi la rejette-t-il&nbsp;?',
   opts:['Son poids est trop grand','A–B fermerait le cycle A–B–C','A a déjà deux voisins dans l’arbre','B n’est relié à aucun autre sommet'],ans:1,
   why:'A et B sont déjà reliés par A–C puis C–B. Ajouter A–B créerait le cycle A–B–C : ce n’est plus un arbre.'},
  {h:'Nombre d’arêtes',p:'Un graphe connexe a 10 sommets et 25 arêtes. Combien d’arêtes contient un arbre couvrant minimal&nbsp;?',lab:'arêtes =',ans:9,
   why:'Un arbre à n sommets a toujours n − 1 arêtes, quel que soit le nombre d’arêtes du graphe : 10 − 1 = 9.'},
  {kind:'Défi',h:'Un poids qui change',p:'Dans le graphe de Kruskal, l’arête D–E passe de 2 à <b>7</b>. Quel est le poids total du nouvel arbre couvrant minimal&nbsp;?',
   fig:graph(WN,WE.map(e=>e[0]==='D'&&e[1]==='E'?['D','E',7]:e),{},220),
   lab:'poids =',ans:17,
   why:'Ordre : B–C (1), A–C (2), E–F (3), A–B (4, cycle), B–D (5), D–F (6), D–E (7, cycle)… On garde B–C, A–C, E–F, B–D, D–F : 1 + 2 + 3 + 5 + 6 = 17.'},
]},
);
})();
