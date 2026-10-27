/* Déclic — Notions fondamentales : anneaux et corps (1) */
(()=>{
/* ---------- helpers locaux ---------- */
const pg=(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b){ const t=a%b; a=b; b=t; } return a; };
// division euclidienne : a = b·q + r avec 0 ≤ r < |b|
const ed=(a,b)=>{ const m=Math.abs(b), r=((a%m)+m)%m; return [(a-r)/b,r]; };
const pn=x=>x<0?'('+fmt(x)+')':fmt(x);
const isP=n=>{ if(n<2) return false; for(let d=2;d*d<=n;d++) if(n%d===0) return false; return true; };
const SUP=['','','²','³','⁴','⁵','⁶','⁷','⁸'];
const facto=n=>{ const f=[]; for(let p=2;p<=n;p++){ let e=0; while(n%p===0){ n/=p; e++; } if(e) f.push([p,e]); } return f; };
const factoS=n=>facto(n).map(([p,e])=>p+(e>1?SUP[e]:'')).join(' · ');
const COLS=['var(--accent)','var(--spark)','var(--math)','var(--ok)','var(--sci)','var(--other)'];
const tx=(x,y,s,o={})=>`<text x="${x}" y="${y}" font-size="${o.s||13}" font-weight="${o.wt||700}" text-anchor="${o.a||'middle'}" fill="${o.c||'var(--ink)'}">${s}</text>`;

// Droite des entiers : division euclidienne a = bq + r en sauts de longueur b
function sauts(a,b){
  const P=plane({x:[-33,33],y:[-2.6,4.2],h:140,grid:false,axes:false});
  P.seg(-33,0,33,0,{c:'var(--muted)',w:1.5});
  for(let x=-30;x<=30;x+=5){ P.seg(x,-0.25,x,0.25,{c:'var(--muted)',w:1}); P.text(x,0,fmt(x),{a:'middle',dy:24,s:10,c:'var(--muted)'}); }
  if(b===0){ P.dot(a,0,{l:'a'}); return P.svg(); }
  const [q,r]=ed(a,b), m=Math.abs(b), s=q===0?0:b*Math.sign(q);
  for(let k=-40;k<=40;k++){ const x=k*m; if(Math.abs(x)<=32) P.seg(x,-0.45,x,0.45,{c:'var(--math)',w:2}); }
  for(let i=0;i<Math.abs(q);i++){ const x0=i*s; P.curve(t=>x0+s*t,t=>Math.min(2.6,0.5+m*0.22)*Math.sin(Math.PI*t),0,1,{c:'var(--math)',w:2,n:30}); }
  if(r>0) P.seg(b*q,0,a,0,{c:'var(--ok)',w:7});
  P.dot(0,0,{r:4,c:'var(--ink)'});
  P.dot(b*q,0,{c:'var(--math)',l:'bq',dx:-8,dy:-12});
  P.dot(a,0,{c:'var(--spark)',l:'a',dx:6,dy:20});
  return P.svg();
}
// Grille des entiers 1 à 60 : nombres premiers et facteurs premiers de n
function crible(n){
  const fs=facto(n).map(f=>f[0]); let s='<svg viewBox="0 0 320 186" width="320" role="img">';
  for(let k=1;k<=60;k++){ const i=(k-1)%10, j=Math.floor((k-1)/10), x=2+i*31.6, y=3+j*30.5;
    const fill=fs.includes(k)?'var(--spark)':isP(k)?'var(--accent)':'none', fo=fs.includes(k)?.65:.25;
    s+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="29" height="28" rx="5" fill="${fill}" fill-opacity="${fo}" stroke="${k===n?'var(--ink)':'var(--line)'}" stroke-width="${k===n?3:1}"/>`;
    s+=tx((x+14.5).toFixed(1),(y+19).toFixed(1),k,{s:12,c:isP(k)||k===n?'var(--ink)':'var(--muted)',wt:isP(k)||k===n?700:400}); }
  return s+'</svg>';
}
// Rectangle a × b découpé en carrés (algorithme d’Euclide)
function eucl(a,b){
  const sc=Math.min(300/a,190/b), H=Math.round(b*sc)+14; let x=0,y=0,w=a,h=b,k=0,s=`<svg viewBox="0 0 320 ${H}" width="320" role="img">`;
  const sq=(X,Y,c)=>{ s+=`<rect x="${(10+X*sc).toFixed(1)}" y="${(7+Y*sc).toFixed(1)}" width="${(c*sc).toFixed(1)}" height="${(c*sc).toFixed(1)}" fill="${COLS[k%6]}" fill-opacity=".35" stroke="var(--ink)" stroke-width="1.5"/>`;
    if(c*sc>=20) s+=tx((10+(X+c/2)*sc).toFixed(1),(7+(Y+c/2)*sc+5).toFixed(1),c,{s:c*sc>=34?13:10}); };
  while(w>0&&h>0){ if(w>=h){ const n=Math.floor(w/h); for(let i=0;i<n;i++) sq(x+i*h,y,h); x+=n*h; w-=n*h; } else { const n=Math.floor(h/w); for(let i=0;i<n;i++) sq(x,y+i*w,w); y+=n*w; h-=n*w; } k++; }
  return s+'</svg>';
}
const euclLignes=(a,b)=>{ const L=[]; while(b>0){ const [q,r]=ed(a,b); L.push(`${a} = ${b} · ${q} + ${r}`); a=b; b=r; } return L; };
// Rectangle 84 × 60 pavé par des carrés de côté c
function pave(c,A=84,B=60){
  const sc=300/A, H=Math.round(B*sc)+14; let s=`<svg viewBox="0 0 320 ${H}" width="320" role="img">`;
  for(let i=0;i*c<A;i++) for(let j=0;j*c<B;j++){ const w=Math.min(c,A-i*c), h=Math.min(c,B-j*c), ok=w===c&&h===c;
    s+=`<rect x="${(10+i*c*sc).toFixed(1)}" y="${(7+j*c*sc).toFixed(1)}" width="${(w*sc).toFixed(1)}" height="${(h*sc).toFixed(1)}" fill="${ok?'var(--accent)':'var(--bad)'}" fill-opacity="${ok?.3:.45}" stroke="var(--ink)" stroke-width="1"/>`; }
  return s+`<rect x="10" y="7" width="300" height="${(B*sc).toFixed(1)}" fill="none" stroke="var(--ink)" stroke-width="2.5"/></svg>`;
}
// Droite ax + by = c et ses points entiers
function dioph(a,b,c,pt){
  const P=plane({x:[-8,8],y:[-8,8],lab:2});
  P.fn(x=>(c-a*x)/b,{c:'var(--math)',w:2.5});
  for(let x=-8;x<=8;x++){ const n=c-a*x; if(n%b===0&&Math.abs(n/b)<=8) P.dot(x,n/b,{r:5,c:'var(--ok)'}); }
  if(pt) P.dot(pt[0],pt[1],{r:7,c:'var(--spark)',l:`(${fmt(pt[0])} ; ${fmt(pt[1])})`});
  return P.svg();
}
// Polynômes : tableau de coefficients [a0, a1, a2, …]
const mono=(c,e,first)=>{ const s=c<0?(first?'−':' − '):(first?'':' + '), m=Math.abs(c);
  const k=e===0?fmt(m):(m===1?'':fmt(m)); return s+k+(e===0?'':'T'+(e>1?SUP[e]:'')); };
const ps=P=>{ let s='', f=true; for(let e=P.length-1;e>=0;e--){ if(Math.abs(P[e])<1e-9) continue; s+=mono(P[e],e,f); f=false; } return s||'0'; };
const deg=P=>{ for(let e=P.length-1;e>=0;e--) if(Math.abs(P[e])>1e-9) return e; return -1; };
function pdiv(A,B){ // étapes de la division euclidienne de A par B
  let R=A.slice(); const Q=new Array(Math.max(deg(A)-deg(B)+1,1)).fill(0), st=[], db=deg(B);
  while(deg(R)>=db){ const e=deg(R)-db, c=R[deg(R)]/B[db]; Q[e]=c; const S=new Array(R.length).fill(0);
    B.forEach((b,i)=>{ S[i+e]+=c*b; }); R=R.map((r,i)=>{ const v=r-S[i]; return Math.abs(v)<1e-9?0:v; });
    st.push({t:mono(c,e,true),s:ps(S),r:ps(R)}); }
  return {Q,R,st};
}
// Matrices 2 × 2
const mul=(A,B)=>[[A[0][0]*B[0][0]+A[0][1]*B[1][0],A[0][0]*B[0][1]+A[0][1]*B[1][1]],[A[1][0]*B[0][0]+A[1][1]*B[1][0],A[1][0]*B[0][1]+A[1][1]*B[1][1]]];
const M=A=>mat(A.map(r=>r.map(x=>fmt(x))));
const ap=(A,p)=>[A[0][0]*p[0]+A[0][1]*p[1],A[1][0]*p[0]+A[1][1]*p[1]];
function grille(P,A,n=3){
  const T=(x,y)=>ap(A,[x,y]);
  for(let i=-n;i<=n;i++){ const p=T(i,-n),q=T(i,n),r=T(-n,i),s=T(n,i); P.seg(p[0],p[1],q[0],q[1],{c:'var(--line)',w:1.2}).seg(r[0],r[1],s[0],s[1],{c:'var(--line)',w:1.2}); }
  P.poly([[0,0],[1,0],[1,1],[0,1]],{c:'var(--muted)',w:1.5,dash:true});
  P.poly([[0,0],T(1,0),T(1,1),T(0,1)],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2}).arrow(0,0,A[0][0],A[1][0],{c:'var(--math)'}).arrow(0,0,A[0][1],A[1][1],{c:'var(--spark)'});
  return P;
}
const LF=[[0,0],[0,2],[1.4,2],[1.4,1.6],[0.5,1.6],[0.5,1.15],[1.1,1.15],[1.1,0.75],[0.5,0.75],[0.5,0]];

COURS.push(
/* ===================== 1. L’ANNEAU ℤ ===================== */
{subj:'gred',sem:'ann',id:'gred-entiers',h:'L’anneau (ℤ, +, ·) des entiers',p:'Deux lois sur un même ensemble, la distributivité qui les relie, l’ordre, la valeur absolue, la division euclidienne (même avec des négatifs), la divisibilité et les nombres premiers.',steps:[
  {h:'Pourquoi deux lois ?',p:`Tu connais déjà le groupe (ℤ, +). Mais sur ℤ on dispose aussi d’une seconde loi, la multiplication. Un <b>anneau</b>, c’est justement un ensemble muni de deux lois qui <b>coopèrent</b>. Le lien entre elles s’appelle la <b>distributivité</b> :<br><b><i>a</i> · (<i>b</i> + <i>c</i>) = <i>a</i> · <i>b</i> + <i>a</i> · <i>c</i></b>.<br>Sur la figure, un rectangle de hauteur <i>a</i> et de largeur <i>b</i> + <i>c</i> se coupe en deux rectangles : l’aire totale est la somme des aires.`,
   params:[{id:'a',l:'a',min:1,max:6,v:3},{id:'b',l:'b',min:1,max:6,v:4},{id:'c',l:'c',min:1,max:6,v:2}],
   draw:v=>{ const P=plane({x:[-2.8,12.8],y:[-1.4,6.6],grid:false,axes:false});
     for(let i=0;i<=v.b+v.c;i++) P.seg(i,0,i,v.a,{c:'var(--line)',w:1}); for(let j=0;j<=v.a;j++) P.seg(0,j,v.b+v.c,j,{c:'var(--line)',w:1});
     P.rect(0,0,v.b,v.a,{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:2.5}).rect(v.b,0,v.c,v.a,{fill:'var(--spark)',fo:.35,c:'var(--spark)',w:2.5});
     P.text(v.b/2,0,'b = '+v.b,{a:'middle',dy:18}).text(v.b+v.c/2,0,'c = '+v.c,{a:'middle',dy:18}).text(0,v.a/2,'a = '+v.a,{a:'end',dx:-6,dy:5});
     return P.svg(); },
   info:v=>`${v.a} · (${v.b} + ${v.c}) = ${v.a} · ${v.b+v.c} = <b>${v.a*(v.b+v.c)}</b> &nbsp;et&nbsp; ${v.a} · ${v.b} + ${v.a} · ${v.c} = ${v.a*v.b} + ${v.a*v.c} = <b>${v.a*v.b+v.a*v.c}</b>`,
   note:'La distributivité est la seule règle qui fait intervenir les deux lois à la fois. Presque toutes les « règles de calcul » de ℤ (signes, produit nul, identités remarquables) en découlent.'},
  {kind:'Question',h:'Pourquoi a · 0 = 0 ?',p:'On veut <b>démontrer</b> que <i>a</i> · 0 = 0 pour tout entier <i>a</i>, en n’utilisant que les axiomes. Quel raisonnement est correct&nbsp;?',
   opts:['C’est évident : multiplier par rien donne rien.','0 + 0 = 0 donne <i>a</i> · 0 = <i>a</i> · (0 + 0) = <i>a</i> · 0 + <i>a</i> · 0 ; on ajoute l’opposé de <i>a</i> · 0 des deux côtés et il reste 0 = <i>a</i> · 0.','0 est neutre pour la multiplication, donc <i>a</i> · 0 = <i>a</i>.','On divise les deux membres par <i>a</i>.'],ans:1,
   why:'La distributivité donne a · 0 = a · 0 + a · 0. Dans le groupe (ℤ, +), on simplifie en ajoutant −(a · 0) : 0 = a · 0. L’argument « évident » n’est pas une preuve, 0 est neutre pour +, pas pour ·, et on ne peut pas diviser dans ℤ.'},
  {h:'Les axiomes de l’anneau ℤ',p:`<b>Addition</b> : (ℤ, +) est un groupe abélien. Elle est associative, commutative, de neutre 0, et tout <i>a</i> a un opposé −<i>a</i>.<br><b>Multiplication</b> : elle est associative, commutative et de neutre <b>1</b>.<br><b>Distributivité</b> de · sur +.<br>On résume en disant que (ℤ, +, ·) est un <b>anneau commutatif unitaire</b>. Les règles des signes s’en déduisent : (−<i>a</i>) · <i>b</i> = −(<i>ab</i>) et (−<i>a</i>)(−<i>b</i>) = <i>ab</i>.`,
   note:'Attention : (ℤ, ·) n’est <b>pas</b> un groupe. 1 est bien neutre, mais 2 n’a pas d’inverse dans ℤ : aucun entier <i>x</i> ne vérifie 2<i>x</i> = 1.'},
  {kind:'Question',h:'Moins par moins',p:'On sait déjà que <i>a</i> · 0 = 0. Comment prouver que (−1) · (−1) = 1&nbsp;?',
   opts:['(−1) · (−1) = −(−1) par définition du produit.','On part de 0 = (−1) · 0 = (−1) · (1 + (−1)) = (−1) · 1 + (−1) · (−1) = −1 + (−1)(−1). Donc (−1)(−1) est l’opposé de −1, c’est-à-dire 1.','Deux signes moins s’annulent, c’est la règle.','On le vérifie sur une calculatrice.'],ans:1,
   why:'On écrit 0 sous la forme (−1) · (1 + (−1)) et on distribue. On obtient −1 + (−1)(−1) = 0 : (−1)(−1) est l’opposé de −1, donc vaut 1. La « règle des signes » est un théorème, pas un axiome.'},
  {h:'Peu d’inversibles, mais l’intégrité',p:`Un entier <i>a</i> est <b>inversible</b> s’il existe <i>b</i> ∈ ℤ avec <i>ab</i> = 1. Seuls <b>1 et −1</b> le sont : si <i>ab</i> = 1, alors <i>a</i> ≠ 0 et |<i>a</i>| · |<i>b</i>| = 1 avec |<i>a</i>|, |<i>b</i>| ≥ 1, donc |<i>a</i>| = 1.<br>En revanche ℤ est <b>intègre</b> :<br><b><i>ab</i> = 0 ⇒ <i>a</i> = 0 ou <i>b</i> = 0</b>.<br>Conséquence : on peut <b>simplifier</b> par un entier non nul. Si <i>ac</i> = <i>bc</i> avec <i>c</i> ≠ 0, alors (<i>a</i> − <i>b</i>)<i>c</i> = 0, donc <i>a</i> = <i>b</i>.`,
   note:'Simplifier n’est pas diviser. 2<i>x</i> = 6 a pour solution 3, mais 2<i>x</i> = 7 n’a <b>aucune</b> solution dans ℤ, car 2 n’est pas inversible. Tu verras dans le chapitre sur les matrices un anneau où l’on ne peut <b>pas</b> simplifier.'},
  {kind:'Méthode',h:'Résoudre une équation produit dans ℤ',
   p:'<b>Quand :</b> l’équation s’écrit (produit) = 0, ou (produit de deux entiers) = <i>n</i> avec <i>n</i> ≠ 0. <b>Pourquoi ça marche :</b> si le produit vaut 0, l’intégrité dit qu’un facteur est nul. Si <i>XY</i> = <i>n</i>, alors <i>X</i> est un <b>diviseur</b> de <i>n</i> (positif ou négatif) et <i>Y</i> = <i>n</i>/<i>X</i> : il n’y a qu’un nombre fini de cas. <b>Comment :</b> 1) factorise ; 2) liste les couples de diviseurs (<i>X</i> ; <i>Y</i>) avec <i>XY</i> = <i>n</i>, sans oublier les négatifs ; 3) reviens aux inconnues.',
   demo:{enonce:'Trouve tous les couples d’entiers (<i>x</i> ; <i>y</i>) tels que <i>xy</i> − 2<i>x</i> + <i>y</i> = 7.',
    etapes:[{f:'<i>xy</i> − 2<i>x</i> + <i>y</i> − 2 = 5, donc (<i>x</i> + 1)(<i>y</i> − 2) = 5.',w:'On cherche une factorisation : (x + 1)(y − 2) = xy − 2x + y − 2. On retire 2 des deux côtés pour la faire apparaître.'},
     {f:'Les couples de diviseurs de 5 : (1 ; 5), (5 ; 1), (−1 ; −5), (−5 ; −1).',w:'5 est premier : ses diviseurs sont ±1 et ±5. Les deux facteurs ont le même signe, puisque leur produit est positif.'},
     {f:'<i>x</i> + 1 = 1, <i>y</i> − 2 = 5 donne (0 ; 7). De même : (4 ; 3), (−2 ; −3), (−6 ; 1).',w:'On revient aux inconnues dans chacun des quatre cas.'},
     {f:'Contrôle : 4 · 3 − 8 + 3 = 7 et (−6) · 1 + 12 + 1 = 7.',w:'On vérifie toujours sur au moins deux solutions.'}],
    conclusion:'L’équation a exactement <b>4</b> solutions : (0 ; 7), (4 ; 3), (−2 ; −3), (−6 ; 1). Pour une équation (produit) = 0, c’est plus simple : <i>x</i>² = 3<i>x</i> ⇔ <i>x</i>(<i>x</i> − 3) = 0 ⇔ <i>x</i> = 0 ou <i>x</i> = 3. Surtout, ne divise pas par <i>x</i> : tu perdrais la solution 0.'}},
  {h:'Compter les solutions',p:'Combien de couples d’entiers (<i>x</i> ; <i>y</i>) vérifient (<i>x</i> + 1)(<i>y</i> − 3) = 6&nbsp;?',lab:'couples :',ans:8,
   why:'Les diviseurs de 6 sont ±1, ±2, ±3, ±6 : 8 choix pour x + 1, et y − 3 = 6/(x + 1) est alors imposé. Il y a 8 couples, par exemple (0 ; 9) et (−7 ; 2).'},
  {h:'L’ordre sur ℤ',p:`La relation ≤ est un <b>ordre total</b> sur ℤ : deux entiers sont toujours comparables. Elle est <b>compatible</b> avec les lois :<br>• avec l’addition : <i>a</i> ≤ <i>b</i> ⇒ <i>a</i> + <i>c</i> ≤ <i>b</i> + <i>c</i> pour tout <i>c</i> ;<br>• avec la multiplication <b>par un positif</b> : <i>a</i> ≤ <i>b</i> et <i>c</i> ≥ 0 ⇒ <i>ac</i> ≤ <i>bc</i>.<br>Par un négatif, l’inégalité <b>se renverse</b> : si <i>c</i> ≤ 0, alors <i>ac</i> ≥ <i>bc</i>.`,
   note:'Deux faits utiles qui en découlent : un carré est toujours ≥ 0, et entre <i>n</i> et <i>n</i> + 1 il n’y a aucun entier. Donc <i>a</i> &gt; <i>b</i> équivaut à <i>a</i> ≥ <i>b</i> + 1 dans ℤ.'},
  {h:'Inégalité piégée',p:'Laquelle de ces affirmations est vraie pour <b>tous</b> les entiers <i>a</i>, <i>b</i>&nbsp;?',
   opts:['Si <i>a</i> ≤ <i>b</i>, alors <i>a</i>² ≤ <i>b</i>².','Si <i>a</i> ≤ <i>b</i>, alors −<i>b</i> ≤ −<i>a</i>.','Si <i>a</i> ≤ <i>b</i>, alors 2<i>a</i> ≤ <i>a</i> + <i>b</i> − 1.','Si <i>a</i> &lt; <i>b</i>, alors <i>a</i>(−3) &lt; <i>b</i>(−3).'],ans:1,
   why:'On ajoute −a − b aux deux membres de a ≤ b : −b ≤ −a. Contre-exemples : −3 ≤ 1 mais 9 &gt; 1 ; pour a = b, 2a ≤ 2a − 1 est faux ; multiplier par −3 renverse l’inégalité.'},
  {h:'La valeur absolue',p:`On pose |<i>a</i>| = <i>a</i> si <i>a</i> ≥ 0 et |<i>a</i>| = −<i>a</i> sinon. C’est la distance de <i>a</i> à 0 sur la droite des entiers. Ses propriétés :<br>• |<i>a</i>| ≥ 0, et |<i>a</i>| = 0 ⇔ <i>a</i> = 0 ;<br>• <b>|<i>ab</i>| = |<i>a</i>| · |<i>b</i>|</b> ;<br>• <b>inégalité triangulaire</b> : |<i>a</i> + <i>b</i>| ≤ |<i>a</i>| + |<i>b</i>|, avec égalité si et seulement si <i>a</i> et <i>b</i> sont de même signe (ou l’un est nul) ;<br>• ||<i>a</i>| − |<i>b</i>|| ≤ |<i>a</i> − <i>b</i>|.`,
   note:'Pour prouver une propriété de |·|, on fait une <b>disjonction de cas</b> selon les signes. Par exemple si a ≥ 0 et b &lt; 0, ab ≤ 0 et |ab| = −ab = a · (−b) = |a| · |b|.'},
  {kind:'Pratique',h:'Quand l’inégalité est stricte',p:'Sur la droite, on part de 0, on avance de <i>a</i> (flèche bleue) puis de <i>b</i> (flèche orange). Règle <i>a</i> et <i>b</i> pour que le chemin total parcouru soit |<i>a</i>| + |<i>b</i>| = 7 mais que l’arrivée soit à distance |<i>a</i> + <i>b</i>| = 3 de 0.',
   params:[{id:'a',l:'a',min:-8,max:8,v:2},{id:'b',l:'b',min:-8,max:8,v:1}],
   draw:v=>{ const P=plane({x:[-17,17],y:[-2,3],h:110,grid:false,axes:false});
     P.seg(-17,0,17,0,{c:'var(--muted)',w:1.5}); for(let x=-15;x<=15;x+=5){ P.seg(x,-0.2,x,0.2,{c:'var(--muted)',w:1}); P.text(x,0,fmt(x),{a:'middle',dy:20,s:10,c:'var(--muted)'}); }
     P.arrow(0,1.4,v.a,1.4,{c:'var(--math)',hs:9}).arrow(v.a,0.7,v.a+v.b,0.7,{c:'var(--spark)',hs:9});
     P.dot(0,0,{r:4,c:'var(--ink)'}).dot(v.a+v.b,0,{c:'var(--ok)',l:'a + b',dx:-14,dy:-10}); return P.svg(); },
   info:v=>`|a| + |b| = ${Math.abs(v.a)} + ${Math.abs(v.b)} = <b>${Math.abs(v.a)+Math.abs(v.b)}</b> &nbsp;·&nbsp; |a + b| = |${fmt(v.a+v.b)}| = <b>${Math.abs(v.a+v.b)}</b>`,
   ok:v=>Math.abs(v.a)+Math.abs(v.b)===7&&Math.abs(v.a+v.b)===3,
   why:'Il faut a et b de signes contraires (sinon il y a égalité), par exemple a = 5 et b = −2 : |a| + |b| = 7 et |a + b| = 3. Le retour en arrière « gaspille » 2 · 2 = 4 unités de chemin.'},
  {h:'La division euclidienne',p:`<b>Théorème.</b> Pour tout <i>a</i> ∈ ℤ et tout <i>b</i> ∈ ℤ, <i>b</i> ≠ 0, il existe un <b>unique</b> couple (<i>q</i> ; <i>r</i>) d’entiers tel que<br><b><i>a</i> = <i>bq</i> + <i>r</i> &nbsp;et&nbsp; 0 ≤ <i>r</i> &lt; |<i>b</i>|</b>.<br><i>q</i> est le <b>quotient</b>, <i>r</i> le <b>reste</b>. Idée de l’existence : les multiples de <i>b</i> (traits bleus) découpent la droite en intervalles de longueur |<i>b</i>|. L’entier <i>a</i> tombe dans un seul d’entre eux, [<i>bq</i> ; <i>bq</i> + |<i>b</i>|[. Le reste est le petit morceau vert, toujours <b>positif</b>.`,
   params:[{id:'a',l:'a',min:-25,max:25,v:17},{id:'b',l:'b',min:-7,max:7,v:5}],
   draw:v=>sauts(v.a,v.b),
   info:v=>{ if(v.b===0) return 'Division par 0 : impossible. Le théorème exige b ≠ 0.'; const [q,r]=ed(v.a,v.b);
     return `${fmt(v.a)} = ${pn(v.b)} · ${pn(q)} + <b>${r}</b> &nbsp; avec 0 ≤ ${r} &lt; ${Math.abs(v.b)} &nbsp;·&nbsp; q = ${fmt(q)}, r = ${r}`; },
   note:'Prends a = −17 et b = 5 : le reste est 3, pas −2. On saute <b>jusqu’au multiple de b situé juste à gauche de a</b>, même quand a est négatif.'},
  {kind:'Méthode',h:'Diviser avec des entiers négatifs',
   p:'<b>Quand :</b> <i>a</i> ou <i>b</i> est négatif. Le piège est d’obtenir un reste négatif, ce qui est interdit. <b>Pourquoi ça marche :</b> <i>bq</i> doit être le plus grand multiple de <i>b</i> qui soit ≤ <i>a</i> ; alors <i>r</i> = <i>a</i> − <i>bq</i> est dans [0 ; |<i>b</i>|[. <b>Comment :</b> 1) cherche le plus grand multiple de |<i>b</i>| inférieur ou égal à <i>a</i> ; 2) écris-le sous la forme <i>b</i> · <i>q</i> (attention au signe de <i>q</i> si <i>b</i> &lt; 0) ; 3) <i>r</i> = <i>a</i> − <i>bq</i> ; 4) vérifie 0 ≤ <i>r</i> &lt; |<i>b</i>|.',
   demo:{enonce:'Effectue les divisions euclidiennes de −17 par 5, de 17 par −5 et de −17 par −5.',
    etapes:[{f:'−17 par 5 : les multiples de 5 autour de −17 sont −20 et −15. Le plus grand ≤ −17 est −20 = 5 · (−4). Donc <b>−17 = 5 · (−4) + 3</b>.',w:'−15 est plus grand que −17 : il ne convient pas, il donnerait r = −2 &lt; 0.'},
     {f:'17 par −5 : le plus grand multiple de 5 ≤ 17 est 15 = (−5) · (−3). Donc <b>17 = (−5) · (−3) + 2</b>.',w:'Avec b négatif, on obtient 15 en multipliant −5 par −3 : le quotient est −3.'},
     {f:'−17 par −5 : le plus grand multiple ≤ −17 est −20 = (−5) · 4. Donc <b>−17 = (−5) · 4 + 3</b>.',w:'Même multiple que dans le premier cas, mais écrit avec b = −5.'},
     {f:'Contrôle : 0 ≤ 3 &lt; 5, 0 ≤ 2 &lt; 5, 0 ≤ 3 &lt; 5.',w:'Le reste est toujours positif et plus petit que |b|.'}],
    conclusion:'Résultats : (<i>q</i> ; <i>r</i>) = (−4 ; 3), (−3 ; 2) et (4 ; 3). Astuce : le reste de −<i>a</i> par <i>b</i> vaut |<i>b</i>| − <i>r</i> si le reste <i>r</i> de <i>a</i> n’est pas nul (17 = 5 · 3 + 2, et −17 a pour reste 5 − 2 = 3).'}},
  {h:'Reste d’un négatif',p:'Quel est le reste de la division euclidienne de −23 par 7&nbsp;?',lab:'r =',ans:5,
   why:'Le plus grand multiple de 7 inférieur ou égal à −23 est −28 = 7 · (−4). Donc −23 = 7 · (−4) + 5 et r = 5. Contrôle par l’astuce : 23 = 7 · 3 + 2, et 7 − 2 = 5.'},
  {kind:'Question',h:'Pourquoi le couple est unique',p:'Supposons <i>a</i> = <i>bq</i> + <i>r</i> = <i>bq</i>′ + <i>r</i>′ avec 0 ≤ <i>r</i>, <i>r</i>′ &lt; |<i>b</i>|. On en déduit <i>b</i>(<i>q</i> − <i>q</i>′) = <i>r</i>′ − <i>r</i>. Comment conclure&nbsp;?',
   opts:['On divise par b, donc q = q′.','|r′ − r| &lt; |b|. Si q ≠ q′, alors |b(q − q′)| = |b| · |q − q′| ≥ |b|, contradiction. Donc q = q′, puis r = r′.','r et r′ sont positifs, donc égaux.','Comme b ≠ 0, ℤ est intègre et r = r′ directement.'],ans:1,
   why:'r et r′ sont dans [0 ; |b|[, donc leur écart est &lt; |b|. Or un multiple non nul de b vaut au moins |b| en valeur absolue. Donc q − q′ = 0, et alors r′ − r = 0. C’est un raisonnement par l’absurde avec |xy| = |x| · |y|.'},
  {h:'La divisibilité',p:`On dit que <i>b</i> <b>divise</b> <i>a</i>, et on écrit <b><i>b</i> | <i>a</i></b>, s’il existe <i>k</i> ∈ ℤ tel que <i>a</i> = <i>bk</i>. Pour <i>b</i> ≠ 0, c’est dire que le reste de <i>a</i> par <i>b</i> est nul.<br>• La relation est <b>réflexive</b> et <b>transitive</b> : c’est un <b>préordre</b> sur ℤ.<br>• Elle n’est <b>pas antisymétrique</b> : 2 | −2 et −2 | 2. En fait <i>a</i> | <i>b</i> et <i>b</i> | <i>a</i> ⇔ |<i>a</i>| = |<i>b</i>|. Sur ℕ, c’est un vrai ordre (partiel).<br>• <b>Clé :</b> si <i>d</i> | <i>a</i> et <i>d</i> | <i>b</i>, alors <i>d</i> | <i>ua</i> + <i>vb</i> pour tous <i>u</i>, <i>v</i> ∈ ℤ.`,
   note:'Tout entier divise 0 (0 = b · 0), mais 0 ne divise que 0. Et ±1 divisent tout. Preuve de la clé : a = dk et b = dl donnent ua + vb = d(uk + vl).'},
  {kind:'Méthode',h:'Faire disparaître n avec une combinaison',
   p:'<b>Quand :</b> on cherche les entiers <i>n</i> tels qu’une expression en <i>n</i> divise une autre, par exemple « <i>n</i> + 2 divise 3<i>n</i> + 11 ». <b>Pourquoi ça marche :</b> si <i>d</i> divise deux nombres, il divise toute combinaison <i>ua</i> + <i>vb</i>. On choisit <i>u</i>, <i>v</i> pour que <i>n</i> disparaisse : il reste un entier fixe, qui n’a qu’un nombre fini de diviseurs. <b>Comment :</b> 1) combinaison qui élimine <i>n</i> ; 2) liste des diviseurs ; 3) retour à <i>n</i> ; 4) vérification, car on n’a écrit qu’une condition nécessaire.',
   demo:{enonce:'Trouve tous les entiers <i>n</i> tels que <i>n</i> + 2 divise 3<i>n</i> + 11.',
    etapes:[{f:'<i>n</i> + 2 divise <i>n</i> + 2 et 3<i>n</i> + 11, donc il divise (3<i>n</i> + 11) − 3(<i>n</i> + 2) = 5.',w:'On prend u = 1 et v = −3 pour faire disparaître n.'},
     {f:'<i>n</i> + 2 ∈ {−5 ; −1 ; 1 ; 5}.',w:'Ce sont les diviseurs de 5, positifs et négatifs.'},
     {f:'<i>n</i> ∈ {−7 ; −3 ; −1 ; 3}.',w:'On retire 2 à chaque valeur.'},
     {f:'Vérification : <i>n</i> = 3 : 5 | 20 ; <i>n</i> = −1 : 1 | 8 ; <i>n</i> = −3 : −1 | 2 ; <i>n</i> = −7 : −5 | −10.',w:'Réciproquement, si n + 2 divise 5, il divise 3(n + 2) + 5 = 3n + 11 : les quatre valeurs conviennent.'}],
    conclusion:'Les solutions sont <b><i>n</i> ∈ {−7 ; −3 ; −1 ; 3}</b>. Le même outil donne des résultats généraux : deux entiers consécutifs <i>n</i> et <i>n</i> + 1 n’ont que ±1 comme diviseurs communs, car un diviseur commun divise (<i>n</i> + 1) − <i>n</i> = 1.'}},
  {h:'Le plus grand n',p:'Parmi les entiers <i>n</i> tels que <i>n</i> + 1 divise 2<i>n</i> + 9, quel est le plus grand&nbsp;?',lab:'n =',ans:6,
   why:'n + 1 divise (2n + 9) − 2(n + 1) = 7, donc n + 1 ∈ {−7 ; −1 ; 1 ; 7} et n ∈ {−8 ; −2 ; 0 ; 6}. Le plus grand est 6 : 7 divise bien 21.'},
  {kind:'Méthode',h:'Critères de divisibilité par congruence',
   p:'<b>Quand :</b> on veut savoir vite si un grand nombre est divisible par 3, 9 ou 11, ou trouver son reste. <b>Pourquoi ça marche :</b> on écrit <i>n</i> = <i>a</i>₀ + 10<i>a</i>₁ + 10²<i>a</i>₂ + … avec ses chiffres. Comme <b>10 ≡ 1 (mod 9)</b>, toutes les puissances de 10 sont ≡ 1 et <i>n</i> ≡ <i>a</i>₀ + <i>a</i>₁ + <i>a</i>₂ + … (mod 9), donc aussi mod 3. Comme <b>10 ≡ −1 (mod 11)</b>, 10<sup>k</sup> ≡ (−1)<sup>k</sup> et <i>n</i> ≡ <i>a</i>₀ − <i>a</i>₁ + <i>a</i>₂ − … (mod 11). Pour 2, 5, 4, 25 : 10 ≡ 0 (mod 2 et 5), 100 ≡ 0 (mod 4 et 25), on ne regarde que les derniers chiffres.',
   demo:{enonce:'Donne le reste de 3 847 dans la division par 9, puis par 11.',
    etapes:[{f:'Somme des chiffres : 3 + 8 + 4 + 7 = 22, et 22 = 9 · 2 + 4.',w:'3 847 ≡ 22 (mod 9) ; on réduit 22 en refaisant une division euclidienne.'},
     {f:'Le reste de 3 847 par 9 est <b>4</b>.',w:'Contrôle : 9 · 427 = 3 843 et 3 847 − 3 843 = 4.'},
     {f:'Somme alternée en partant des unités : 7 − 4 + 8 − 3 = 8.',w:'Les unités ont le signe +, les dizaines −, les centaines +, etc.'},
     {f:'Le reste de 3 847 par 11 est <b>8</b>.',w:'0 ≤ 8 &lt; 11. Si la somme alternée était négative, on ajouterait 11 jusqu’à tomber dans [0 ; 11[.'}],
    conclusion:'3 847 n’est divisible ni par 9 ni par 11. Ces critères donnent le <b>reste</b>, pas seulement un oui ou un non.'}},
  {h:'Reste par 9',p:'Quel est le reste de la division euclidienne de 52 718 par 9&nbsp;?',lab:'r =',ans:5,
   why:'5 + 2 + 7 + 1 + 8 = 23 et 23 = 9 · 2 + 5. Comme 10 ≡ 1 (mod 9), 52 718 ≡ 23 ≡ 5 (mod 9).'},
  {h:'Les nombres premiers',p:`Un entier <i>p</i> ≥ 2 est <b>premier</b> si ses seuls diviseurs positifs sont 1 et <i>p</i>. Deux faits fondamentaux :<br>• tout entier <i>n</i> ≥ 2 a un <b>diviseur premier</b> : son plus petit diviseur &gt; 1 ;<br>• tout entier <i>n</i> ≥ 2 est un <b>produit de nombres premiers</b>, et cette décomposition est unique à l’ordre près (l’unicité se démontre au chapitre suivant).<br>Sur la grille, les premiers sont en bleu ; les facteurs premiers de <i>n</i> en orange.`,
   params:[{id:'n',l:'n',min:2,max:60,v:60}],
   draw:v=>crible(v.n),
   info:v=>isP(v.n)?`<b>${v.n}</b> est premier.`:`${v.n} = <b>${factoS(v.n)}</b>`,
   note:'1 n’est pas premier : sinon la décomposition ne serait plus unique (6 = 2 · 3 = 1 · 2 · 3). Il y a une infinité de nombres premiers : c’est l’objet de la question qui suit la méthode.'},
  {kind:'Méthode',h:'Tester la primalité, décomposer',
   p:'<b>Quand :</b> on veut savoir si <i>n</i> est premier, ou écrire sa décomposition. <b>Pourquoi on s’arrête à √<i>n</i> :</b> si <i>n</i> = <i>ab</i> avec 1 &lt; <i>a</i> ≤ <i>b</i>, alors <i>a</i>² ≤ <i>ab</i> = <i>n</i>, donc <i>a</i> ≤ √<i>n</i>. Un nombre composé a toujours un diviseur premier ≤ √<i>n</i>. <b>Comment :</b> 1) essaie les premiers 2, 3, 5, 7, 11, … tant que <i>p</i>² ≤ <i>n</i> ; 2) dès qu’un <i>p</i> divise, divise par <i>p</i> autant de fois que possible et recommence avec le quotient ; 3) si aucun ne divise, <i>n</i> est premier.',
   demo:{enonce:'223 est-il premier&nbsp;? Décompose 1 386.',
    etapes:[{f:'√223 ≈ 14,9 : on teste 2, 3, 5, 7, 11, 13.',w:'Inutile de tester 17 : 17² = 289 &gt; 223.'},
     {f:'223 est impair ; 2 + 2 + 3 = 7 non multiple de 3 ; ne finit ni par 0 ni par 5 ; 223 = 7 · 31 + 6 ; 223 = 11 · 20 + 3 ; 223 = 13 · 17 + 2.',w:'Les critères de divisibilité font gagner du temps pour 2, 3 et 5.'},
     {f:'Donc <b>223 est premier</b>.',w:'Aucun premier ≤ √223 ne le divise.'},
     {f:'1 386 = 2 · 693 = 2 · 3 · 231 = 2 · 3 · 3 · 77 = 2 · 3² · 7 · 11.',w:'On divise par 2, puis par 3 tant que possible (6 + 9 + 3 = 18, puis 2 + 3 + 1 = 6), puis 77 = 7 · 11.'}],
    conclusion:'223 est premier et <b>1 386 = 2 · 3² · 7 · 11</b>. On contrôle en remultipliant : 2 · 9 · 77 = 18 · 77 = 1 386.'}},
  {h:'Le plus grand facteur premier',p:'Décompose 3 553 en facteurs premiers. Quel est son plus grand facteur premier&nbsp;?',lab:'p =',ans:19,
   why:'Somme alternée : 3 − 5 + 5 − 3 = 0, donc 11 divise 3 553 = 11 · 323. Puis 323 = 17 · 19. Donc 3 553 = 11 · 17 · 19 et le plus grand facteur est 19.'},
  {kind:'Question',h:'Une infinité de premiers',p:'Preuve d’Euclide : supposons que 2, 3, 5, …, <i>p</i> soient <b>tous</b> les premiers, et posons <i>N</i> = 2 · 3 · 5 · … · <i>p</i> + 1. Par exemple 2 · 3 · 5 · 7 · 11 · 13 + 1 = 30 031 = 59 · 509. Quelle phrase est juste&nbsp;?',
   opts:['N est toujours premier, ce qui donne un premier de plus.','N n’est pas toujours premier, et la preuve échoue.','N a un diviseur premier q. Si q était l’un des premiers de la liste, q diviserait N et le produit, donc leur différence 1 : impossible. q est un premier nouveau, contradiction.','N est pair, donc divisible par 2.'],ans:2,
   why:'30 031 = 59 · 509 montre que N n’est pas forcément premier. Mais ses facteurs premiers (ici 59 et 509) ne sont pas dans la liste, car un diviseur commun de N et de N − 1 divise 1. La liste n’était donc pas complète.'},
  {kind:'Problème',h:'Le calendrier des entiers',
   p:'On numérote les jours : le jour 0 est un lundi, le jour 1 un mardi, et ainsi de suite ; les jours passés ont des numéros négatifs. Le jour de la semaine d’un jour <i>n</i> ne dépend que du reste <i>r</i> de <i>n</i> dans la division euclidienne par 7 : <i>r</i> = 0 pour lundi, 1 pour mardi, …, 6 pour dimanche. On s’intéresse au jour −100.',
   params:[{id:'a',l:'n',min:-25,max:25,v:-17}],
   draw:v=>sauts(v.a,7),
   info:v=>{ const [q,r]=ed(v.a,7); return `${fmt(v.a)} = 7 · ${pn(q)} + ${r} &nbsp;·&nbsp; ${['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'][r]}`; },
   parts:[
    {q:'a) Quel est le quotient de la division euclidienne de −100 par 7&nbsp;?',lab:'q =',ans:-15,hint:'Cherche le plus grand multiple de 7 inférieur ou égal à −100.',why:'7 · (−15) = −105 ≤ −100 &lt; −98 = 7 · (−14). Donc q = −15.'},
    {q:'b) Quel jour de la semaine est le jour −100&nbsp;?',opts:['Mardi','Vendredi','Samedi','Dimanche'],ans:2,hint:'Calcule le reste r = −100 − 7q.',why:'r = −100 + 105 = 5 : c’est un samedi. Le reste « naïf » −2 (−100 = 7 · (−14) − 2) est interdit.'},
    {q:'c) Combien de lundis y a-t-il parmi les jours −100 à 100 (inclus)&nbsp;?',lab:'lundis :',ans:29,hint:'Ce sont les multiples de 7 entre −100 et 100. Le plus petit est 7 · (−14), le plus grand 7 · 14.',why:'Les multiples 7k avec −14 ≤ k ≤ 14 : 29 valeurs de k.'},
    {q:'d) Peut-il arriver que les jours <i>n</i> et <i>n</i> + 30 soient tous deux des jeudis&nbsp;?',opts:['C’est possible si n est négatif.','C’est impossible : 30 n’est pas multiple de 7.','C’est toujours vrai.','Cela dépend du mois.'],ans:1,hint:'Deux jours ont le même reste par 7 si et seulement si 7 divise leur différence.',why:'n et n + 30 ont le même reste si et seulement si 7 | 30, ce qui est faux (30 = 7 · 4 + 2). Le jour n + 30 est un samedi.'},
   ],
   sol:'On applique la division euclidienne avec un dividende négatif. Le plus grand multiple de 7 inférieur ou égal à −100 est −105, donc <b>−100 = 7 · (−15) + 5</b> : q = −15 et r = 5, le jour −100 est un <b>samedi</b>.<br>Les lundis sont les jours de reste 0, c’est-à-dire les multiples de 7. Entre −100 et 100, ce sont 7k avec −14 ≤ k ≤ 14 : <b>29 lundis</b>.<br>Enfin deux jours tombent le même jour de la semaine si et seulement si 7 divise leur écart. Comme 7 ne divise pas 30, les jours n et n + 30 ne sont jamais le même jour de la semaine.'},
  {kind:'Problème',h:'Les carrés des grands premiers',
   p:'On veut démontrer que pour tout nombre premier <i>p</i> ≥ 5, l’entier <i>p</i>² − 1 est divisible par 24. Exemple : 7² − 1 = 48 = 24 · 2. On factorise <i>p</i>² − 1 = (<i>p</i> − 1)(<i>p</i> + 1) et on raisonne avec la division euclidienne et la divisibilité.',
   parts:[
    {q:'a) Quels restes peut avoir un premier <i>p</i> ≥ 5 dans la division par 6&nbsp;?',opts:['0, 1, 2, 3, 4 ou 5','1 ou 5 seulement','1, 3 ou 5','2 ou 4'],ans:1,hint:'Si le reste est 0, 2 ou 4, p est pair ; s’il est 3, p = 6q + 3 est multiple de 3.',why:'Les restes 0, 2, 4 rendent p pair, le reste 3 le rend multiple de 3. Comme p ≥ 5 est premier, il reste 1 ou 5.'},
    {q:'b) Pourquoi 8 divise-t-il (<i>p</i> − 1)(<i>p</i> + 1)&nbsp;?',opts:['Car p − 1 et p + 1 sont deux nombres pairs consécutifs : l’un des deux est multiple de 4, l’autre de 2.','Car p est impair, donc p² − 1 est pair.','Car 8 = 2³ et p ≥ 5.','Car p + 1 est toujours multiple de 8.'],ans:0,hint:'p est impair. Parmi deux nombres pairs consécutifs 2k et 2k + 2, l’un des deux k, k + 1 est pair.',why:'p − 1 = 2k et p + 1 = 2(k + 1) ; un des deux k, k + 1 est pair, donc le produit est 4k(k + 1), multiple de 4 · 2 = 8. « p² − 1 pair » ne donne que 2.'},
    {q:'c) Pourquoi 3 divise-t-il (<i>p</i> − 1)(<i>p</i> + 1)&nbsp;?',opts:['Car p − 1 + p + 1 = 2p.','Parmi p − 1, p, p + 1, trois entiers consécutifs, l’un est multiple de 3 ; ce n’est pas p, qui est premier ≥ 5.','Car p est impair.','Car 24 = 3 · 8.'],ans:1,hint:'Regarde les restes de trois entiers consécutifs dans la division par 3.',why:'Trois entiers consécutifs ont les restes 0, 1, 2 dans un certain ordre : l’un est multiple de 3. Comme 3 ne divise pas p, il divise p − 1 ou p + 1.'},
    {q:'d) Conclusion : 24 divise <i>p</i>² − 1. Pour <i>p</i> = 13, calcule le quotient (<i>p</i>² − 1)/24.',lab:'quotient :',ans:7,hint:'13² − 1 = 168.',why:'168 = 24 · 7. Pourquoi 3 | N et 8 | N donnent 24 | N : on écrit N = 8k ; 3 divise 9k et 8k, donc leur différence k. Ainsi k = 3m et N = 24m.'},
   ],
   sol:'Soit p ≥ 5 premier. <b>Restes par 6</b> : p = 6q + r avec r ∈ {1 ; 5}, car les autres restes rendent p divisible par 2 ou 3. En particulier p est impair.<br><b>Facteur 8</b> : p − 1 = 2k et p + 1 = 2k + 2, donc (p − 1)(p + 1) = 4k(k + 1). L’un des deux entiers consécutifs k, k + 1 est pair : 8 divise le produit.<br><b>Facteur 3</b> : parmi p − 1, p, p + 1, l’un est multiple de 3, et ce n’est pas p. Donc 3 | (p − 1)(p + 1).<br>Enfin N = p² − 1 = 8k et 3 | 8k ; comme 3 | 9k, 3 divise 9k − 8k = k, donc <b>24 | p² − 1</b>. Exemple : 13² − 1 = 168 = 24 · 7. Le résultat est faux pour p = 3 : 3² − 1 = 8.'},
]},
/* ===================== 2. PGCD ET ÉQUATIONS DIOPHANTIENNES ===================== */
{subj:'gred',sem:'ann',id:'gred-pgcd',h:'PGCD et équations diophantiennes',p:'Le plus grand commun diviseur, l’algorithme d’Euclide vu comme un découpage en carrés, l’identité de Bézout, le lemme de Gauss, le ppcm, puis la résolution complète de ax + by = c.',steps:[
  {h:'Le plus grand commun diviseur',p:`Les <b>diviseurs communs</b> de <i>a</i> et <i>b</i> sont les entiers qui divisent à la fois <i>a</i> et <i>b</i>. Si <i>a</i> et <i>b</i> ne sont pas tous deux nuls, ils sont en nombre fini, et le plus grand s’appelle le <b>pgcd</b>, noté pgcd(<i>a</i> ; <i>b</i>). Il est toujours ≥ 1.<br><b>Exemple :</b> les diviseurs positifs de 12 sont 1, 2, 3, 4, 6, 12 ; ceux de 18 sont 1, 2, 3, 6, 9, 18. Les communs : 1, 2, 3, 6. Donc pgcd(12 ; 18) = 6.`,
   note:'Les signes ne comptent pas : pgcd(<i>a</i> ; <i>b</i>) = pgcd(|<i>a</i>| ; |<i>b</i>|). Et comme tout entier divise 0, pgcd(<i>a</i> ; 0) = |<i>a</i>| pour <i>a</i> ≠ 0.'},
  {h:'Avec un négatif',p:'Que vaut pgcd(−18 ; 30)&nbsp;?',lab:'pgcd =',ans:6,
   why:'Les diviseurs de −18 sont ceux de 18. Diviseurs positifs communs de 18 et 30 : 1, 2, 3, 6. Le pgcd est 6, toujours positif.'},
  {h:'Le lemme qui fait tout marcher',p:`Si <i>a</i> = <i>bq</i> + <i>r</i>, alors <b>pgcd(<i>a</i> ; <i>b</i>) = pgcd(<i>b</i> ; <i>r</i>)</b>.<br>Mieux : les couples (<i>a</i> ; <i>b</i>) et (<i>b</i> ; <i>r</i>) ont exactement les <b>mêmes diviseurs communs</b>. On remplace donc un couple par un couple plus petit sans perdre d’information.<br><b>Exemple :</b> 1071 = 462 · 2 + 147, donc pgcd(1071 ; 462) = pgcd(462 ; 147).`},
  {kind:'Question',h:'Preuve du lemme',p:'Soit <i>d</i> un diviseur commun de <i>a</i> et <i>b</i>, avec <i>a</i> = <i>bq</i> + <i>r</i>. Pourquoi <i>d</i> divise-t-il <i>r</i>&nbsp;?',
   opts:['Car r &lt; b.','Car r = a − bq est une combinaison de a et b, et d divise toute combinaison ua + vb.','Car d divise q.','Car r est le reste, donc il est divisible par tout.'],ans:1,
   why:'r = 1 · a + (−q) · b : c’est une combinaison de a et b, donc d | r. Dans l’autre sens, un diviseur commun de b et r divise a = bq + r. Les deux ensembles de diviseurs communs sont égaux.'},
  {kind:'Méthode',h:'L’algorithme d’Euclide',
   p:'<b>Quand :</b> pour calculer pgcd(<i>a</i> ; <i>b</i>) de grands nombres, sans chercher leurs diviseurs. <b>Pourquoi ça marche :</b> à chaque étape, pgcd(<i>a</i> ; <i>b</i>) = pgcd(<i>b</i> ; <i>r</i>) et les restes diminuent strictement ; on finit par tomber sur un reste nul, et pgcd(<i>d</i> ; 0) = <i>d</i>. <b>Comment :</b> 1) divise <i>a</i> par <i>b</i> ; 2) remplace (<i>a</i> ; <i>b</i>) par (<i>b</i> ; <i>r</i>) ; 3) recommence jusqu’au reste 0. Le pgcd est le <b>dernier reste non nul</b>.',
   demo:{enonce:'Calcule pgcd(1071 ; 462).',
    etapes:[{f:'1071 = 462 · 2 + 147',w:'Première division : 2 · 462 = 924 et 1071 − 924 = 147.'},
     {f:'462 = 147 · 3 + 21',w:'On divise l’ancien diviseur par le reste : 3 · 147 = 441.'},
     {f:'147 = 21 · 7 + 0',w:'Le reste est nul : on s’arrête.'},
     {f:'pgcd(1071 ; 462) = 21',w:'C’est le dernier reste non nul. Contrôle : 1071 = 21 · 51 et 462 = 21 · 22.'}],
    conclusion:'<b>pgcd(1071 ; 462) = 21</b>, en trois divisions seulement. Garde ces lignes : elles serviront à trouver les coefficients de Bézout.'}},
  {h:'Euclide en carrés',p:`Voici l’algorithme en image. Dans un rectangle <i>a</i> × <i>b</i>, on découpe le plus de carrés <i>b</i> × <i>b</i> possible : c’est le quotient <i>q</i>. Il reste un rectangle <i>b</i> × <i>r</i>, qu’on découpe à son tour, et ainsi de suite. Chaque couleur est une étape. Le <b>dernier carré</b>, qui finit le pavage, a pour côté le pgcd.`,
   params:[{id:'a',l:'a',min:2,max:40,v:34},{id:'b',l:'b',min:1,max:30,v:21}],
   draw:v=>eucl(v.a,v.b),
   info:v=>euclLignes(Math.max(v.a,v.b),Math.min(v.a,v.b)).join(' &nbsp;|&nbsp; ')+` &nbsp;⇒&nbsp; <b>pgcd = ${pg(v.a,v.b)}</b>`,
   note:'Essaie a = 34 et b = 21 : deux nombres de Fibonacci consécutifs. Tous les quotients valent 1, il y a beaucoup d’étapes : c’est le pire cas de l’algorithme.'},
  {h:'Euclide avec des négatifs',p:'Calcule pgcd(−252 ; 198) avec l’algorithme d’Euclide.',lab:'pgcd =',ans:18,
   why:'pgcd(−252 ; 198) = pgcd(252 ; 198). 252 = 198 · 1 + 54 ; 198 = 54 · 3 + 36 ; 54 = 36 · 1 + 18 ; 36 = 18 · 2 + 0. Le dernier reste non nul est 18.'},
  {kind:'Pratique',h:'Le plus grand carré qui pave',p:'On veut carreler exactement un sol de 84 dm × 60 dm avec des carreaux carrés tous identiques, de côté entier, sans découpe. Règle le côté <i>c</i> pour obtenir les <b>plus grands</b> carreaux possibles. Les carreaux rouges dépassent.',
   params:[{id:'c',l:'côté c (dm)',min:1,max:30,v:5}],
   draw:v=>pave(v.c),
   info:v=>{ const [q1,r1]=ed(84,v.c), [q2,r2]=ed(60,v.c); return `84 = ${v.c} · ${q1} + ${r1} &nbsp;·&nbsp; 60 = ${v.c} · ${q2} + ${r2}`+(r1===0&&r2===0?` &nbsp;·&nbsp; <b>pavage exact</b> avec ${q1*q2} carreaux`:''); },
   ok:v=>v.c===12,
   why:'Le côté doit diviser 84 et 60 : c’est un diviseur commun. Le plus grand est pgcd(84 ; 60) : 84 = 60 · 1 + 24, 60 = 24 · 2 + 12, 24 = 12 · 2 + 0. Donc c = 12 dm et il faut 7 · 5 = 35 carreaux.'},
  {h:'aℤ + bℤ = dℤ et l’identité de Bézout',p:`Considère l’ensemble aℤ + bℤ de toutes les <b>combinaisons</b> <i>au</i> + <i>bv</i>, avec <i>u</i>, <i>v</i> ∈ ℤ. C’est un sous-groupe de (ℤ, +) : il contient 0 et la différence de deux combinaisons en est une. Or tu sais que les sous-groupes de ℤ sont les <i>n</i>ℤ. Donc aℤ + bℤ = <i>d</i>ℤ, où <i>d</i> est la plus petite combinaison positive. On montre que <b><i>d</i> = pgcd(<i>a</i> ; <i>b</i>)</b>.<br><b>Identité de Bézout :</b> il existe <i>u</i>, <i>v</i> ∈ ℤ tels que <b><i>au</i> + <i>bv</i> = pgcd(<i>a</i> ; <i>b</i>)</b>.`,
   note:'Les combinaisons de a et b sont exactement les multiples du pgcd. Avec 6 et 4 : 6u + 4v prend toutes les valeurs paires, et jamais une valeur impaire.'},
  {kind:'Question',h:'Pourquoi d est le pgcd',p:'On a aℤ + bℤ = <i>d</i>ℤ avec <i>d</i> &gt; 0. Pourquoi <i>d</i> est-il le <b>plus grand</b> diviseur commun de <i>a</i> et <i>b</i>&nbsp;?',
   opts:['Car d est la plus petite combinaison positive.','a = a · 1 + b · 0 ∈ dℤ et de même b ∈ dℤ : d est un diviseur commun. Et d = au + bv, donc tout diviseur commun divise d, et vaut au plus d.','Car d divise ab.','Car aℤ + bℤ contient a et b.'],ans:1,
   why:'Deux choses à montrer : d divise a et b (car a et b sont des combinaisons, donc des multiples de d), et tout diviseur commun c divise au + bv = d, donc c ≤ d. Ainsi d est le plus grand.'},
  {kind:'Méthode',h:'Euclide étendu : remonter les calculs',
   p:'<b>Quand :</b> on veut des coefficients <i>u</i>, <i>v</i> explicites avec <i>au</i> + <i>bv</i> = pgcd(<i>a</i> ; <i>b</i>). <b>Pourquoi ça marche :</b> chaque ligne d’Euclide <i>a</i> = <i>bq</i> + <i>r</i> s’écrit <i>r</i> = <i>a</i> − <i>bq</i> : un reste est une combinaison des deux nombres précédents. En remontant, on exprime le pgcd en fonction de <i>a</i> et <i>b</i>. <b>Comment :</b> 1) écris toutes les lignes d’Euclide ; 2) isole chaque reste ; 3) pars de la ligne du pgcd et remplace les restes un par un, du bas vers le haut, en regroupant à chaque fois ; 4) vérifie.',
   demo:{enonce:'Trouve <i>u</i>, <i>v</i> tels que 1071<i>u</i> + 462<i>v</i> = 21.',
    etapes:[{f:'147 = 1071 − 2 · 462 &nbsp;et&nbsp; 21 = 462 − 3 · 147',w:'On isole les restes dans les lignes d’Euclide déjà calculées.'},
     {f:'21 = 462 − 3 · (1071 − 2 · 462)',w:'On remplace 147 par son expression : il ne reste que 1071 et 462.'},
     {f:'21 = 462 − 3 · 1071 + 6 · 462 = 7 · 462 − 3 · 1071',w:'On développe et on regroupe les 462 : 1 + 6 = 7.'},
     {f:'Contrôle : 7 · 462 = 3 234 et 3 · 1071 = 3 213 ; 3 234 − 3 213 = 21.',w:'Une vérification de 10 secondes évite les erreurs de signe.'}],
    conclusion:'<b>u = −3 et v = 7</b>. Ces coefficients ne sont pas uniques : (−3 + 22<i>k</i> ; 7 − 51<i>k</i>) convient aussi pour tout <i>k</i>, car 1071 · 22 = 462 · 51.'}},
  {h:'Bézout à la main',p:'Avec l’algorithme d’Euclide étendu, trouve <i>u</i>, <i>v</i> ∈ ℤ tels que 26<i>u</i> + 11<i>v</i> = 1 et 0 &lt; <i>u</i> &lt; 11. Que vaut <i>v</i>&nbsp;?',lab:'v =',ans:-7,
   why:'26 = 11 · 2 + 4 ; 11 = 4 · 2 + 3 ; 4 = 3 · 1 + 1. Remontée : 1 = 4 − 3 = 4 − (11 − 2 · 4) = 3 · 4 − 11 = 3(26 − 2 · 11) − 11 = 3 · 26 − 7 · 11. Donc u = 3, v = −7.'},
  {h:'Entiers premiers entre eux',p:`<i>a</i> et <i>b</i> sont <b>premiers entre eux</b> si pgcd(<i>a</i> ; <i>b</i>) = 1 : leurs seuls diviseurs communs sont ±1.<br><b>Théorème de Bézout :</b> <i>a</i> et <i>b</i> sont premiers entre eux <b>si et seulement si</b> il existe <i>u</i>, <i>v</i> ∈ ℤ avec <b><i>au</i> + <i>bv</i> = 1</b>.<br>Sens ⇐ : un diviseur commun divise <i>au</i> + <i>bv</i> = 1. Sens ⇒ : c’est l’identité de Bézout.<br><b>Exemple :</b> 8 · 2 + 15 · (−1) = 1, donc 8 et 15 sont premiers entre eux, bien qu’aucun des deux ne soit premier.`,
   note:'Si d = pgcd(a ; b), alors a/d et b/d sont premiers entre eux : on divise au + bv = d par d.'},
  {h:'Une combinaison égale à 6',p:'On sait que 14<i>u</i> + <i>b</i><i>v</i> = 6 pour certains entiers <i>u</i>, <i>v</i>. Que peut-on dire de <i>d</i> = pgcd(14 ; <i>b</i>)&nbsp;?',
   opts:['d = 6','d divise 6','d = 1','d est un multiple de 6'],ans:1,
   why:'6 est une combinaison de 14 et b, donc un multiple de d : d divise 6. Seule la valeur 1 a la propriété « combinaison égale à d ⇒ d = pgcd ». Ici d divise aussi 14, donc d ∈ {1 ; 2}.'},
  {h:'Le lemme de Gauss',p:`<b>Lemme de Gauss :</b> si <i>a</i> | <i>bc</i> et pgcd(<i>a</i> ; <i>b</i>) = 1, alors <b><i>a</i> | <i>c</i></b>.<br><b>Preuve :</b> Bézout donne <i>au</i> + <i>bv</i> = 1. On multiplie par <i>c</i> : <i>c</i> = <i>acu</i> + <i>bcv</i>. Or <i>a</i> divise <i>acu</i> et <i>bcv</i>, donc <i>a</i> | <i>c</i>.<br><b>Cas d’un premier (lemme d’Euclide) :</b> si <i>p</i> est premier et <i>p</i> | <i>bc</i>, alors <i>p</i> | <i>b</i> ou <i>p</i> | <i>c</i>. C’est ce qui prouve l’<b>unicité</b> de la décomposition en facteurs premiers.`,
   note:'L’hypothèse « premiers entre eux » est indispensable : 6 | 4 · 9 = 36, mais 6 ne divise ni 4 ni 9.'},
  {h:'Gauss en action',p:'L’entier <i>k</i> vérifie 6 | 35<i>k</i>. Que peut-on conclure&nbsp;?',
   opts:['6 divise 35','Rien du tout','6 divise k','k = 6'],ans:2,
   why:'pgcd(6 ; 35) = 1 (6 = 2 · 3 et 35 = 5 · 7 n’ont aucun facteur commun). Le lemme de Gauss donne 6 | k. Par exemple k = 12 : 35 · 12 = 420 = 6 · 70.'},
  {h:'Le plus petit commun multiple',p:`Les multiples communs de <i>a</i> et <i>b</i> forment aℤ ∩ bℤ, un sous-groupe de ℤ, donc de la forme <i>m</i>ℤ. Le nombre <i>m</i> ≥ 0 est le <b>ppcm</b> : tout multiple commun est un multiple de <i>m</i>.<br><b>pgcd(<i>a</i> ; <i>b</i>) · ppcm(<i>a</i> ; <i>b</i>) = |<i>ab</i>|</b>.<br>Avec les décompositions : le pgcd prend chaque premier avec le <b>plus petit</b> exposant, le ppcm avec le <b>plus grand</b>. Exemple : 12 = 2² · 3 et 18 = 2 · 3², pgcd = 2 · 3 = 6, ppcm = 2² · 3² = 36, et 6 · 36 = 216 = 12 · 18.`},
  {h:'Calcule le ppcm',p:'Calcule ppcm(84 ; 120).',lab:'ppcm =',ans:840,
   why:'pgcd(84 ; 120) : 120 = 84 · 1 + 36 ; 84 = 36 · 2 + 12 ; 36 = 12 · 3. Donc pgcd = 12 et ppcm = 84 · 120 / 12 = 840.'},
  {kind:'Méthode',h:'Résoudre ax + by = c dans ℤ',
   p:'<b>Quand :</b> on cherche tous les couples d’entiers (<i>x</i> ; <i>y</i>) tels que <i>ax</i> + <i>by</i> = <i>c</i> (équation <b>diophantienne</b>). <b>Pourquoi ça marche :</b> les valeurs de <i>ax</i> + <i>by</i> sont exactement les multiples de <i>d</i> = pgcd(<i>a</i> ; <i>b</i>). Et la différence de deux solutions vérifie <i>a</i>′(<i>x</i> − <i>x</i>₀) = −<i>b</i>′(<i>y</i> − <i>y</i>₀) avec <i>a</i>′, <i>b</i>′ premiers entre eux : Gauss donne <i>b</i>′ | <i>x</i> − <i>x</i>₀. <b>Comment :</b><br>1) calcule <i>d</i>. Si <i>d</i> ne divise pas <i>c</i>, <b>aucune solution</b> ;<br>2) divise tout par <i>d</i> : <i>a</i>′<i>x</i> + <i>b</i>′<i>y</i> = <i>c</i>′ ;<br>3) trouve <i>a</i>′<i>u</i> + <i>b</i>′<i>v</i> = 1 (Bézout) et multiplie par <i>c</i>′ : solution particulière (<i>x</i>₀ ; <i>y</i>₀) ;<br>4) solution générale : <b><i>x</i> = <i>x</i>₀ + <i>b</i>′<i>k</i>, <i>y</i> = <i>y</i>₀ − <i>a</i>′<i>k</i></b>, <i>k</i> ∈ ℤ.',
   demo:{enonce:'Résous 12<i>x</i> + 42<i>y</i> = 30 dans ℤ².',
    etapes:[{f:'pgcd(12 ; 42) = 6 et 6 | 30 : il y a des solutions.',w:'42 = 12 · 3 + 6, 12 = 6 · 2 + 0.'},
     {f:'On divise par 6 : 2<i>x</i> + 7<i>y</i> = 5.',w:'Maintenant 2 et 7 sont premiers entre eux.'},
     {f:'2 · 4 + 7 · (−1) = 1, donc 2 · 20 + 7 · (−5) = 5 : (<i>x</i>₀ ; <i>y</i>₀) = (20 ; −5).',w:'On trouve u = 4, v = −1 (à vue ou par Euclide étendu), puis on multiplie par c′ = 5.'},
     {f:'Si 2<i>x</i> + 7<i>y</i> = 5 = 2 · 20 + 7 · (−5), alors 2(<i>x</i> − 20) = 7(−5 − <i>y</i>). 7 divise 2(<i>x</i> − 20) et pgcd(7 ; 2) = 1, donc <i>x</i> − 20 = 7<i>k</i>, puis <i>y</i> = −5 − 2<i>k</i>.',w:'C’est le lemme de Gauss qui donne toutes les solutions, pas seulement une.'},
     {f:'Avec <i>k</i> = −3 : (−1 ; 1). Contrôle : 12 · (−1) + 42 · 1 = 30.',w:'On choisit k pour avoir une solution plus simple.'}],
    conclusion:'Les solutions sont les couples <b>(20 + 7<i>k</i> ; −5 − 2<i>k</i>)</b>, <i>k</i> ∈ ℤ, ou de façon équivalente (−1 + 7<i>k</i> ; 1 − 2<i>k</i>). Sur un dessin, ce sont les points entiers de la droite, régulièrement espacés.'}},
  {h:'Les points entiers d’une droite',p:`L’équation <i>ax</i> + <i>by</i> = <i>c</i> est celle d’une droite. Ses solutions entières sont ses points à coordonnées entières (en vert). Fais varier <i>a</i>, <i>b</i> et <i>c</i> : il y a des points entiers exactement quand pgcd(<i>a</i> ; <i>b</i>) divise <i>c</i>, et ils sont alors espacés régulièrement, de <i>b</i>′ en <i>x</i> et de −<i>a</i>′ en <i>y</i>.`,
   params:[{id:'a',l:'a',min:1,max:9,v:2},{id:'b',l:'b',min:1,max:9,v:3},{id:'c',l:'c',min:-15,max:15,v:5}],
   draw:v=>dioph(v.a,v.b,v.c),
   info:v=>{ const d=pg(v.a,v.b); return `${v.a}x + ${v.b}y = ${fmt(v.c)} &nbsp;·&nbsp; pgcd(${v.a} ; ${v.b}) = ${d} `+(v.c%d===0?`divise ${fmt(v.c)} : solutions, pas (${v.b/d} ; −${v.a/d})`:`ne divise pas ${fmt(v.c)} : <b>aucune solution</b>`); },
   note:'Prends a = 4, b = 6 : tant que c est impair, la droite ne passe par aucun point entier, même si elle en frôle beaucoup.'},
  {h:'Sans solution',p:'Laquelle de ces équations n’a <b>aucune</b> solution dans ℤ²&nbsp;?',
   opts:['7<i>x</i> + 5<i>y</i> = 1','6<i>x</i> + 9<i>y</i> = 15','6<i>x</i> + 10<i>y</i> = 7','4<i>x</i> − 6<i>y</i> = 2'],ans:2,
   why:'pgcd(6 ; 10) = 2 ne divise pas 7 : pas de solution (6x + 10y est toujours pair). Ailleurs, pgcd(7 ; 5) = 1, pgcd(6 ; 9) = 3 | 15 et pgcd(4 ; 6) = 2 | 2.'},
  {kind:'Pratique',h:'Trouve un point entier',p:'Place le point (<i>x</i> ; <i>y</i>) sur un point entier de la droite 5<i>x</i> + 3<i>y</i> = 7.',
   params:[{id:'x',l:'x',min:-8,max:8,v:0},{id:'y',l:'y',min:-8,max:8,v:0}],
   draw:v=>{ const P=plane({x:[-8,8],y:[-8,8],lab:2}); P.fn(x=>(7-5*x)/3,{c:'var(--math)',w:2.5}); P.dot(v.x,v.y,{r:7,c:'var(--spark)',l:`(${fmt(v.x)} ; ${fmt(v.y)})`}); return P.svg(); },
   info:v=>`5 · ${pn(v.x)} + 3 · ${pn(v.y)} = <b>${fmt(5*v.x+3*v.y)}</b>`,
   ok:v=>5*v.x+3*v.y===7,
   why:'5 · 2 + 3 · (−1) = 7 : (2 ; −1) convient. Les autres sont (2 + 3k ; −1 − 5k) : (−1 ; 4) et (5 ; −6) sont aussi dans la fenêtre.'},
  {kind:'Méthode',h:'Problèmes concrets : ajouter les contraintes',
   p:'<b>Quand :</b> les inconnues comptent des objets (pièces, timbres, personnes), donc doivent être <b>positives</b>, voire dans un intervalle. <b>Pourquoi :</b> la solution générale (<i>x</i>₀ + <i>b</i>′<i>k</i> ; <i>y</i>₀ − <i>a</i>′<i>k</i>) dépend d’un seul paramètre <i>k</i> ; les contraintes deviennent des inégalités sur <i>k</i>, qui ne laissent qu’un nombre fini de valeurs. <b>Comment :</b> 1) mets le problème en équation ; 2) résous-la dans ℤ² ; 3) traduis <i>x</i> ≥ 0 et <i>y</i> ≥ 0 en un encadrement de <i>k</i> ; 4) liste les solutions.',
   demo:{enonce:'De combien de façons peut-on payer exactement 37 francs avec des pièces de 2 francs et de 5 francs&nbsp;?',
    etapes:[{f:'2<i>x</i> + 5<i>y</i> = 37, avec <i>x</i>, <i>y</i> ≥ 0.',w:'x pièces de 2 et y pièces de 5.'},
     {f:'pgcd(2 ; 5) = 1. Solution particulière : <i>y</i> = 1, <i>x</i> = 16.',w:'37 − 5y doit être pair : y impair. On essaie y = 1.'},
     {f:'Solution générale : <i>x</i> = 16 − 5<i>k</i>, <i>y</i> = 1 + 2<i>k</i>.',w:'Formule x₀ + b′k, y₀ − a′k avec k changé en −k, ce qui revient au même puisque k parcourt ℤ.'},
     {f:'<i>x</i> ≥ 0 ⇔ <i>k</i> ≤ 3,2 et <i>y</i> ≥ 0 ⇔ <i>k</i> ≥ −0,5. Donc <i>k</i> ∈ {0 ; 1 ; 2 ; 3}.',w:'Les contraintes de signe deviennent un encadrement de k.'},
     {f:'(16 ; 1), (11 ; 3), (6 ; 5), (1 ; 7).',w:'On contrôle : 2 · 6 + 5 · 5 = 37.'}],
    conclusion:'Il y a <b>4 façons</b> de payer. Sans la contrainte de positivité il y en aurait une infinité.'}},
  {h:'Affranchir une lettre',p:'On ne dispose que de timbres à 7 centimes et à 11 centimes. On veut affranchir une lettre à exactement 100 centimes. Combien de timbres faut-il au total&nbsp;?',lab:'timbres :',ans:12,
   why:'7x + 11y = 100 avec x, y ≥ 0. Solution générale à partir de 7 · (−3) + 11 · 2 = 1 : x = −300 + 11k, y = 200 − 7k. x ≥ 0 ⇔ k ≥ 27,3 et y ≥ 0 ⇔ k ≤ 28,6 : k = 28, x = 8, y = 4. 8 · 7 + 4 · 11 = 100 : 12 timbres.'},
  {kind:'Problème',h:'Deux lignes de bus',
   p:'Au terminus, le bus A part toutes les 14 minutes à partir de 6 h 00. Le bus B part toutes les 20 minutes à partir de 6 h 06. On note <i>t</i> le nombre de minutes après 6 h 00. Un départ simultané a lieu quand <i>t</i> = 14<i>x</i> = 6 + 20<i>y</i> avec <i>x</i>, <i>y</i> entiers positifs, c’est-à-dire 14<i>x</i> − 20<i>y</i> = 6. Le service s’arrête à 22 h 00.',
   params:[{id:'x',l:'départ n° x du bus A',min:0,max:20,v:3}],
   draw:v=>{ const P=plane({x:[-10,300],y:[-1,3],h:110,grid:false,axes:false});
     P.seg(0,0.6,300,0.6,{c:'var(--muted)',w:1.5}).seg(0,1.9,300,1.9,{c:'var(--muted)',w:1.5});
     for(let t=0;t<=300;t+=14) P.dot(t,1.9,{r:t===14*v.x?7:4,c:'var(--math)'});
     for(let t=6;t<=300;t+=20) P.dot(t,0.6,{r:4,c:'var(--spark)'});
     P.text(0,1.9,'A',{dy:-10}).text(0,0.6,'B',{dy:-10});
     for(let t=0;t<=300;t+=60) P.text(t,0,(6+t/60)+' h',{a:'middle',dy:8,s:10,c:'var(--muted)'});
     return P.svg(); },
   info:v=>{ const t=14*v.x; return `Départ A n° ${v.x} : t = ${t} min`+((t-6)%20===0&&t>=6?' &nbsp;·&nbsp; <b>B part aussi !</b>':` &nbsp;·&nbsp; (t − 6) = ${t-6} n’est pas multiple de 20`); },
   parts:[
    {q:'a) Pourquoi existe-t-il des départs simultanés&nbsp;?',opts:['Car 14 et 20 sont pairs.','Car pgcd(14 ; 20) = 2 divise 6.','Car 14 + 20 &gt; 6.','Car ppcm(14 ; 20) = 140.'],ans:1,hint:'Applique la condition d’existence pour ax + by = c.',why:'14x − 20y = 6 a des solutions car pgcd(14 ; 20) = 2 divise 6. On simplifie : 7x − 10y = 3.'},
    {q:'b) À combien de minutes après 6 h 00 a lieu le premier départ simultané&nbsp;?',lab:'t =',unit:'min',ans:126,hint:'Résous 7x − 10y = 3 : pars de 7 · 3 − 10 · 2 = 1, puis cherche la plus petite solution avec x ≥ 0 et y ≥ 0.',why:'7 · 9 − 10 · 6 = 3 et la solution générale est x = 9 + 10k, y = 6 + 7k. La plus petite avec x, y ≥ 0 est x = 9 : t = 14 · 9 = 126 min, soit 8 h 06.'},
    {q:'c) Combien de minutes séparent deux départs simultanés consécutifs&nbsp;?',lab:'écart :',unit:'min',ans:140,hint:'Quand k augmente de 1, x augmente de 10.',why:'t = 14(9 + 10k) = 126 + 140k. L’écart est 140 min = ppcm(14 ; 20).'},
    {q:'d) Combien de départs simultanés ont lieu entre 6 h 00 et 22 h 00&nbsp;?',lab:'départs :',ans:6,hint:'22 h 00 correspond à t = 960. Encadre k dans 126 + 140k ≤ 960.',why:'140k ≤ 834 donne k ≤ 5,95 : k = 0, 1, …, 5, soit 6 départs (8 h 06, 10 h 26, …, 19 h 46).'},
   ],
   sol:'On cherche t = 14x = 6 + 20y, soit <b>14x − 20y = 6</b>. Comme pgcd(14 ; 20) = 2 divise 6, on simplifie en 7x − 10y = 3.<br>Bézout : 7 · 3 − 10 · 2 = 1, donc 7 · 9 − 10 · 6 = 3. Par le lemme de Gauss, la solution générale est <b>x = 9 + 10k, y = 6 + 7k</b>.<br>Les départs simultanés ont lieu à t = 14x = 126 + 140k minutes : le premier à <b>8 h 06</b>, puis toutes les <b>140 minutes</b> (c’est ppcm(14 ; 20)).<br>Avant 22 h 00 (t = 960) : 126 + 140k ≤ 960 donne 0 ≤ k ≤ 5, soit <b>6 départs simultanés</b>.'},
  {kind:'Problème',h:'Cent volailles pour cent écus',
   p:'Un vieux problème : un coq coûte 5 écus, une poule 3 écus, et 3 poussins coûtent 1 écu. On achète exactement 100 volailles pour exactement 100 écus, avec au moins un animal de chaque sorte. On note <i>x</i> le nombre de coqs, <i>y</i> de poules et <i>z</i> de poussins. On a donc <i>x</i> + <i>y</i> + <i>z</i> = 100 et 5<i>x</i> + 3<i>y</i> + <i>z</i>/3 = 100.',
   parts:[
    {q:'a) En multipliant la seconde équation par 3 puis en lui retranchant la première, quelle équation obtient-on&nbsp;?',opts:['14x + 8y = 200, soit 7x + 4y = 100','15x + 9y = 300','4x + 2y = 0','7x + 4y = 300'],ans:0,hint:'15x + 9y + z = 300, et on retranche x + y + z = 100.',why:'(15x + 9y + z) − (x + y + z) = 300 − 100 donne 14x + 8y = 200. On divise par pgcd(14 ; 8) = 2 : 7x + 4y = 100.'},
    {q:'b) Quelle est la solution générale de 7<i>x</i> + 4<i>y</i> = 100 dans ℤ²&nbsp;?',opts:['x = 4k, y = 25 − 7k','x = 7k, y = 25 − 4k','x = 4 + k, y = 18 − k','x = 100 − 4k, y = 7k'],ans:0,hint:'(0 ; 25) est une solution particulière évidente. Puis applique la formule x₀ + b′k, y₀ − a′k.',why:'7 · 0 + 4 · 25 = 100. Avec a′ = 7 et b′ = 4 premiers entre eux : x = 4k, y = 25 − 7k.'},
    {q:'c) Combien d’achats possibles avec au moins un coq, une poule et un poussin&nbsp;?',lab:'achats :',ans:3,hint:'Traduis x ≥ 1 et y ≥ 1 en conditions sur k, puis vérifie z = 100 − x − y.',why:'x = 4k ≥ 1 ⇔ k ≥ 1 ; y = 25 − 7k ≥ 1 ⇔ k ≤ 3. Pour k = 1, 2, 3 : z = 75 + 3k vaut 78, 81, 84, positif et multiple de 3. Il y a 3 achats.'},
    {q:'d) Dans l’achat qui compte le plus de coqs, combien y a-t-il de poussins&nbsp;?',lab:'z =',ans:84,hint:'Le nombre de coqs 4k est maximal pour le plus grand k permis.',why:'k = 3 : 12 coqs, 4 poules, 84 poussins. Contrôle : 60 + 12 + 28 = 100 écus.'},
   ],
   sol:'On élimine z : 3 × (2e équation) − (1re) donne 14x + 8y = 200, soit <b>7x + 4y = 100</b>.<br>(0 ; 25) est une solution particulière ; comme pgcd(7 ; 4) = 1, le lemme de Gauss donne la solution générale <b>x = 4k, y = 25 − 7k</b>, puis z = 100 − x − y = 75 + 3k.<br>Les contraintes x ≥ 1, y ≥ 1 imposent 1 ≤ k ≤ 3, et z est alors positif et multiple de 3 (on paie bien un nombre entier d’écus).<br>Les <b>3 achats</b> sont : (4 ; 18 ; 78), (8 ; 11 ; 81) et (12 ; 4 ; 84). Par exemple 5 · 12 + 3 · 4 + 84/3 = 60 + 12 + 28 = 100.'},
]},
/* ===================== 3. L’ANNEAU DES POLYNÔMES ===================== */
{subj:'gred',sem:'ann',id:'gred-polynomes',h:'L’anneau des polynômes ℝ[T]',p:'Un polynôme comme suite de coefficients, degré, produit par convolution, un ordre sans Archimède, la division euclidienne posée pas à pas, le reste par T − a, le pgcd et Bézout pour les polynômes.',steps:[
  {h:'Un polynôme, c’est une suite de coefficients',p:`Un <b>polynôme</b> à coefficients réels est une suite (<i>a</i>₀ ; <i>a</i>₁ ; <i>a</i>₂ ; …) de réels <b>nulle à partir d’un certain rang</b>. On dit que son support est fini.<br>On additionne terme à terme : (<i>a</i>ₖ) + (<i>b</i>ₖ) = (<i>a</i>ₖ + <i>b</i>ₖ). Le produit, plus subtil, est défini un peu plus loin.<br>On note <b>T</b> = (0 ; 1 ; 0 ; 0 ; …). Avec le produit, on trouvera T² = (0 ; 0 ; 1 ; 0 ; …), T³ = (0 ; 0 ; 0 ; 1 ; …), etc. Ainsi la suite (3 ; 0 ; −2 ; 5 ; 0 ; …) s’écrit <b>5T³ − 2T² + 3</b>.`,
   note:'Ce point de vue évite une question floue : « qu’est-ce que T ? ». T n’est pas un nombre inconnu, c’est un polynôme précis, la suite (0 ; 1 ; 0 ; …). On l’appelle l’<b>indéterminée</b>.'},
  {h:'Polynôme ou fonction ?',p:`À un polynôme <i>P</i> = <i>a</i>₀ + <i>a</i>₁T + … + <i>a</i>ₙTⁿ, on associe la <b>fonction polynomiale</b> <i>x</i> ↦ <i>a</i>₀ + <i>a</i>₁<i>x</i> + … + <i>a</i>ₙ<i>x</i>ⁿ. On note <i>P</i>(<i>a</i>) sa valeur en <i>a</i>. Sur ℝ, deux polynômes distincts donnent deux fonctions distinctes, car un polynôme non nul n’a qu’un nombre fini de racines.<br>Mais l’objet « polynôme » est plus fin que la fonction. Avec des coefficients dans ℤ/2ℤ, le polynôme T² + T n’est pas nul, alors que la fonction associée est nulle : 0² + 0 = 0 et 1² + 1 = 2 = 0.`},
  {kind:'Question',h:'Reconnaître un polynôme',p:'Laquelle de ces suites est un polynôme de ℝ[T]&nbsp;?',
   opts:['(1 ; 1 ; 1 ; 1 ; …), avec des 1 partout','(1 ; 2 ; 3 ; 4 ; …)','(0 ; 0 ; 4 ; 0 ; −1 ; 0 ; 0 ; …), nulle après −1','(1 ; 0 ; 1 ; 0 ; 1 ; 0 ; …)'],ans:2,
   why:'Seule la troisième est nulle à partir d’un certain rang : c’est 4T² − T⁴. Les autres ont une infinité de termes non nuls : ce sont des séries formelles, pas des polynômes.'},
  {h:'Le degré',p:`Le <b>degré</b> d’un polynôme non nul <i>P</i> est le plus grand indice <i>n</i> avec <i>a</i>ₙ ≠ 0 ; <i>a</i>ₙ est le <b>coefficient dominant</b>. Par convention, le polynôme nul a pour degré −∞.<br><b>deg(<i>P</i> + <i>Q</i>) ≤ max(deg <i>P</i> ; deg <i>Q</i>)</b>, avec égalité si les degrés sont différents.<br>L’inégalité peut être stricte : (T² + 1) + (−T² + T) = T + 1 est de degré 1, les termes dominants se sont annulés.`},
  {h:'Degré d’une somme',p:'Quel est le degré de (T³ + 2T − 1) + (−T³ + 4T²)&nbsp;?',lab:'degré =',ans:2,
   why:'Les termes en T³ s’annulent : la somme vaut 4T² + 2T − 1, de degré 2, strictement moins que max(3 ; 3).'},
  {h:'Le produit : une convolution',p:`Le produit de <i>P</i> = Σ <i>a</i>ᵢTⁱ et <i>Q</i> = Σ <i>b</i>ⱼTʲ est le polynôme dont le coefficient d’indice <i>k</i> est<br><b><i>c</i>ₖ = Σ<sub>i + j = k</sub> <i>a</i>ᵢ<i>b</i>ⱼ = <i>a</i>₀<i>b</i>ₖ + <i>a</i>₁<i>b</i>ₖ₋₁ + … + <i>a</i>ₖ<i>b</i>₀</b>.<br>C’est exactement ce qu’on obtient en développant et en regroupant les puissances. Avec ces deux lois, (ℝ[T], +, ·) est un <b>anneau commutatif unitaire</b> de neutre 1.<br>Le coefficient dominant de <i>PQ</i> est <i>a</i>ₙ<i>b</i>ₘ ≠ 0, donc <b>deg(<i>PQ</i>) = deg <i>P</i> + deg <i>Q</i></b>. On en déduit que ℝ[T] est <b>intègre</b>, et que ses seuls inversibles sont les constantes non nulles.`,
   note:'Pourquoi les inversibles sont les constantes : si PQ = 1, alors deg P + deg Q = 0, donc deg P = deg Q = 0. T n’a donc pas d’inverse dans ℝ[T] : 1/T n’est pas un polynôme.'},
  {kind:'Méthode',h:'Trouver un coefficient du produit sans tout développer',
   p:'<b>Quand :</b> on ne veut qu’un seul coefficient de <i>PQ</i>, ou on veut développer proprement un produit sans rien oublier. <b>Pourquoi ça marche :</b> le terme en T<sup>k</sup> vient seulement des produits <i>a</i>ᵢTⁱ · <i>b</i>ⱼTʲ avec <i>i</i> + <i>j</i> = <i>k</i>. <b>Comment :</b> 1) écris les coefficients <i>a</i>₀, <i>a</i>₁, … et <i>b</i>₀, <i>b</i>₁, … (attention aux coefficients nuls) ; 2) liste les couples (<i>i</i> ; <i>j</i>) avec <i>i</i> + <i>j</i> = <i>k</i> ; 3) additionne les produits. Pour tout développer, range les produits dans un tableau : chaque <b>diagonale</b> donne un coefficient.',
   demo:{enonce:'Calcule le coefficient de T³ dans (2T² − T + 3)(T² + 4T − 5), puis le produit complet.',
    etapes:[{f:'<i>a</i>₀ = 3, <i>a</i>₁ = −1, <i>a</i>₂ = 2 ; <i>b</i>₀ = −5, <i>b</i>₁ = 4, <i>b</i>₂ = 1.',w:'On lit les coefficients par puissance croissante.'},
     {f:'<i>i</i> + <i>j</i> = 3 : (1 ; 2) et (2 ; 1).',w:'(0 ; 3) et (3 ; 0) n’apportent rien, car b₃ = a₃ = 0.'},
     {f:'<i>c</i>₃ = <i>a</i>₁<i>b</i>₂ + <i>a</i>₂<i>b</i>₁ = (−1) · 1 + 2 · 4 = 7.',w:'On additionne les produits correspondants.'},
     {f:'De même <i>c</i>₄ = 2, <i>c</i>₂ = 3 · 1 + (−1) · 4 + 2 · (−5) = −11, <i>c</i>₁ = 3 · 4 + (−1)(−5) = 17, <i>c</i>₀ = −15.',w:'Chaque diagonale du tableau donne un coefficient.'}],
    conclusion:'(2T² − T + 3)(T² + 4T − 5) = <b>2T⁴ + 7T³ − 11T² + 17T − 15</b>. Contrôle en T = 1 : 4 · 0 = 0 et 2 + 7 − 11 + 17 − 15 = 0.'}},
  {h:'Le tableau des produits',p:`Voici le tableau de (2T² − T + 3)(T² + 4T − 5). Chaque case contient le produit d’un terme de la ligne par un terme de la colonne. Choisis <i>k</i> : les cases de la diagonale <i>i</i> + <i>j</i> = <i>k</i> s’allument, et leur somme est le coefficient <i>c</i>ₖ.`,
   params:[{id:'k',l:'k (puissance de T)',min:0,max:4,v:2}],
   draw:v=>{ const A=[3,-1,2], B=[-5,4,1], w=76, h=42; let s='<svg viewBox="0 0 320 176" width="320" role="img">';
     const cell=(c,r,str,hl,head)=>{ s+=`<rect x="${6+c*w}" y="${4+r*h}" width="${w-4}" height="${h-4}" rx="6" fill="${hl?'var(--spark)':head?'var(--line)':'none'}" fill-opacity="${hl?.45:.6}" stroke="var(--line)"/>`+tx(6+c*w+(w-4)/2,4+r*h+25,str,{s:14,c:head?'var(--muted)':'var(--ink)'}); };
     cell(0,0,'×',false,true); B.forEach((b,j)=>cell(j+1,0,mono(b,j,true),false,true)); A.forEach((a,i)=>cell(0,i+1,mono(a,i,true),false,true));
     A.forEach((a,i)=>B.forEach((b,j)=>cell(j+1,i+1,mono(a*b,i+j,true),i+j===v.k,false)));
     return s+'</svg>'; },
   info:v=>{ const A=[3,-1,2], B=[-5,4,1], t=[]; let c=0; A.forEach((a,i)=>B.forEach((b,j)=>{ if(i+j===v.k){ t.push(fmt(a*b)); c+=a*b; } }));
     return `c<sub>${v.k}</sub> = ${t.join(' + ').replace(/\+ −/g,'− ')} = <b>${fmt(c)}</b> &nbsp;·&nbsp; produit : 2T⁴ + 7T³ − 11T² + 17T − 15`; }},
  {h:'Un coefficient',p:'Quel est le coefficient de T² dans (T³ − 2T + 1)(3T² + T − 4)&nbsp;?',lab:'coefficient :',ans:1,
   why:'a₀ = 1, a₁ = −2, a₂ = 0, a₃ = 1 et b₀ = −4, b₁ = 1, b₂ = 3. c₂ = a₀b₂ + a₁b₁ + a₂b₀ = 3 − 2 + 0 = 1. Ne pas oublier le coefficient nul a₂.'},
  {h:'Degré d’un produit',p:'Quel est le degré de (T² + 1)³ · (2T − 5)&nbsp;?',lab:'degré =',ans:7,
   why:'deg((T² + 1)³) = 3 · 2 = 6 et deg(2T − 5) = 1. Les degrés s’additionnent : 6 + 1 = 7, car le coefficient dominant 1 · 2 n’est pas nul.'},
  {h:'Un ordre sur ℝ[T]',p:`On dit qu’un polynôme non nul est <b>positif</b>, <i>P</i> &gt; 0, si son <b>coefficient dominant est &gt; 0</b>. On pose <i>P</i> &lt; <i>Q</i> si <i>Q</i> − <i>P</i> &gt; 0.<br>• C’est un <b>ordre total</b> : pour <i>P</i> ≠ <i>Q</i>, <i>Q</i> − <i>P</i> a un coefficient dominant positif ou négatif.<br>• Il est <b>compatible</b> avec + et avec la multiplication par un positif, car le coefficient dominant de <i>PQ</i> est le produit des coefficients dominants.<br>Image : <i>P</i> &gt; 0 signifie que <i>P</i>(<i>x</i>) &gt; 0 pour tous les <i>x</i> assez grands.`,
   params:[{id:'a',l:'coefficient de T²',min:-2,max:2,step:0.5,v:0.5},{id:'b',l:'coefficient de T',min:-3,max:3,v:-3},{id:'c',l:'constante',min:-4,max:4,v:-2}],
   draw:v=>{ const P=plane({x:[-2,10],y:[-8,8],h:240,lab:2}); P.rect(7,-8,3,16,{fill:'var(--ok)',fo:.12,c:null}); P.text(8.5,7,'x grand',{a:'middle',s:11,c:'var(--muted)',dy:6});
     P.fn(x=>v.a*x*x+v.b*x+v.c,{c:'var(--math)'}); return P.svg(); },
   info:v=>{ const d=v.a!==0?v.a:v.b!==0?v.b:v.c, nm=v.a!==0?'de T²':v.b!==0?'de T':'terme constant';
     return `P = ${ps([v.c,v.b,v.a])} &nbsp;·&nbsp; `+(d===0?'P = 0':`coefficient dominant (${nm}) = ${fmt(d)} ⇒ <b>P ${d>0?'&gt;':'&lt;'} 0</b>`); },
   note:'Avec a = 0,5, b = −3, c = −2, le polynôme est positif, alors qu’il est négatif pour beaucoup de x : seul le comportement « à l’infini » compte.'},
  {h:'Lequel est positif ?',p:'Pour l’ordre de ℝ[T], lequel de ces polynômes est &gt; 0&nbsp;?',
   opts:['−T³ + 100T²','3 − T','T − 1 000 000','−2'],ans:2,
   why:'T − 1 000 000 a pour coefficient dominant 1 &gt; 0. Les autres ont pour coefficient dominant −1, −1 et −2. Peu importe la taille des autres coefficients.'},
  {kind:'Question',h:'Un ordre non archimédien',p:'Dans ℝ, pour tout réel <i>x</i> il existe un entier <i>n</i> avec <i>n</i> &gt; <i>x</i> : c’est la propriété d’Archimède. Que se passe-t-il pour T dans ℝ[T]&nbsp;?',
   opts:['Il existe n entier avec n &gt; T, par exemple n = 1 000.','T est plus grand que tout réel : T − r a pour coefficient dominant 1 &gt; 0, quel que soit le réel r.','T et 5 ne sont pas comparables.','T &lt; 0 car T(−1) = −1.'],ans:1,
   why:'Pour tout réel r, T − r &gt; 0 car son coefficient dominant est 1. Donc T &gt; r pour tout r : aucun entier ne dépasse T. L’ordre de ℝ[T] est total mais <b>non archimédien</b>. La valeur en −1 ne compte pas.'},
  {h:'La division euclidienne des polynômes',p:`<b>Théorème.</b> Soient <i>A</i>, <i>B</i> ∈ ℝ[T] avec <i>B</i> ≠ 0. Il existe un <b>unique</b> couple (<i>Q</i> ; <i>R</i>) de polynômes tel que<br><b><i>A</i> = <i>BQ</i> + <i>R</i> &nbsp;et&nbsp; deg <i>R</i> &lt; deg <i>B</i></b>.<br>C’est le même énoncé que dans ℤ, où le degré joue le rôle de la valeur absolue.<br><b>Existence :</b> tant que deg <i>A</i> ≥ deg <i>B</i>, on retranche à <i>A</i> un multiple c · T<sup>k</sup> · <i>B</i> qui tue son terme dominant ; le degré baisse à chaque fois.<br><b>Unicité :</b> si <i>BQ</i> + <i>R</i> = <i>BQ</i>′ + <i>R</i>′, alors <i>B</i>(<i>Q</i> − <i>Q</i>′) = <i>R</i>′ − <i>R</i>. Le membre de droite a un degré &lt; deg <i>B</i>, ce qui force <i>Q</i> − <i>Q</i>′ = 0.`},
  {kind:'Méthode',h:'Poser une division de polynômes',
   p:'<b>Quand :</b> pour obtenir <i>Q</i> et <i>R</i>, pour factoriser, ou pour simplifier une fraction de polynômes. <b>Pourquoi ça marche :</b> chaque étape retranche un multiple de <i>B</i> qui annule le terme de plus haut degré ; le degré du reste partiel baisse jusqu’à passer sous deg <i>B</i>. <b>Comment :</b> 1) ordonne <i>A</i> et <i>B</i> par puissances décroissantes, en laissant la place des termes manquants ; 2) divise le terme dominant du reste par celui de <i>B</i> : c’est un terme du quotient ; 3) multiplie <i>B</i> par ce terme et retranche ; 4) recommence tant que deg(reste) ≥ deg <i>B</i>.',
   demo:{enonce:'Divise <i>A</i> = 2T³ + 3T² − 5T + 4 par <i>B</i> = T² + T − 1.',
    etapes:[{f:'2T³ ÷ T² = <b>2T</b>. On retire 2T · <i>B</i> = 2T³ + 2T² − 2T : il reste T² − 3T + 4.',w:'Le terme 2T tue le terme dominant 2T³.'},
     {f:'T² ÷ T² = <b>1</b>. On retire 1 · <i>B</i> = T² + T − 1 : il reste −4T + 5.',w:'On recommence avec le reste partiel, qui est encore de degré 2.'},
     {f:'deg(−4T + 5) = 1 &lt; 2 = deg <i>B</i> : on s’arrête.',w:'Le reste doit être de degré strictement plus petit que B.'},
     {f:'Contrôle : (T² + T − 1)(2T + 1) − 4T + 5 = 2T³ + 3T² − T − 1 − 4T + 5 = 2T³ + 3T² − 5T + 4.',w:'On vérifie A = BQ + R en développant.'}],
    conclusion:'<b><i>Q</i> = 2T + 1</b> et <b><i>R</i> = −4T + 5</b>. Si le reste avait été nul, <i>B</i> diviserait <i>A</i>.'}},
  {h:'La division pas à pas',p:`Fais avancer la division étape par étape. À chaque ligne, on choisit le terme du quotient qui tue le terme dominant, on retire son produit par <i>B</i>, et on regarde ce qui reste.`,
   params:[{id:'e',l:'exemple',min:0,max:2,v:1},{id:'k',l:'étape',min:0,max:3,v:1}],
   draw:v=>{ const EX=[[[4,-5,3,2],[-1,1,1]],[[5,-1,0,2,1],[1,0,1]],[[4,0,-7,6],[-3,2]]], [A,B]=EX[v.e], D=pdiv(A,B), n=Math.min(v.k,D.st.length);
     let h=`<div style="text-align:left;line-height:1.8"><b>A</b> = ${ps(A)} &nbsp; ; &nbsp; <b>B</b> = ${ps(B)}</div><table><tr><td><b>terme de Q</b></td><td><b>on retire</b></td><td><b>il reste</b></td></tr>`;
     for(let i=0;i<n;i++) h+=`<tr><td>${D.st[i].t}</td><td>${D.st[i].s}</td><td>${D.st[i].r}</td></tr>`;
     h+='</table>';
     h+=n===D.st.length?`<div style="text-align:left;line-height:1.8"><b>Q = ${ps(D.Q)}</b> &nbsp; ; &nbsp; <b>R = ${ps(D.R)}</b></div>`:`<div style="text-align:left;line-height:1.8">Prochaine étape : diviser ${n?D.st[n-1].r.split(' ')[0]:'le terme dominant de A'} par le terme dominant de B.</div>`;
     return h; },
   info:v=>{ const EX=[[[4,-5,3,2],[-1,1,1]],[[5,-1,0,2,1],[1,0,1]],[[4,0,-7,6],[-3,2]]], [A,B]=EX[v.e], D=pdiv(A,B), n=Math.min(v.k,D.st.length);
     return n===D.st.length?`Terminé en ${n} étapes : deg R = ${deg(D.R)<0?'−∞':deg(D.R)} &lt; ${deg(B)} = deg B.`:`Étape ${n} sur ${D.st.length}`; },
   note:'Dans l’exemple 3, on divise par 2T − 3 : les coefficients du quotient deviennent des fractions (1,5). C’est normal dans ℝ[T]. Dans ℤ[T], la division ne marcherait pas toujours.'},
  {h:'Le bon reste',p:'Quel est le reste de la division de T⁴ − 3T² + 2T + 1 par T² − 1&nbsp;?',
   opts:['−2','2T + 1','2T − 1','T² − 2'],ans:2,
   why:'T⁴ ÷ T² = T² : on retire T⁴ − T², il reste −2T² + 2T + 1. Puis −2T² ÷ T² = −2 : on retire −2T² + 2, il reste 2T − 1, de degré 1 &lt; 2. Q = T² − 2 et R = 2T − 1.'},
  {kind:'Méthode',h:'Le reste par T − a, et le schéma de Horner',
   p:'<b>Le résultat :</b> le reste de la division de <i>P</i> par T − <i>a</i> est la <b>constante <i>P</i>(<i>a</i>)</b>. <b>Pourquoi :</b> <i>P</i> = (T − <i>a</i>)<i>Q</i> + <i>R</i> avec deg <i>R</i> &lt; 1, donc <i>R</i> est une constante <i>r</i> ; on évalue en <i>a</i> : <i>P</i>(<i>a</i>) = 0 · <i>Q</i>(<i>a</i>) + <i>r</i>. Conséquence : <b><i>a</i> est racine de <i>P</i> ⇔ T − <i>a</i> divise <i>P</i></b>. <b>Comment obtenir aussi <i>Q</i> (Horner) :</b> écris les coefficients de <i>P</i> par degrés décroissants ; abaisse le premier ; puis, à chaque pas, multiplie le dernier nombre obtenu par <i>a</i> et ajoute le coefficient suivant. Les nombres obtenus sont les coefficients de <i>Q</i>, le dernier est <i>P</i>(<i>a</i>).',
   demo:{enonce:'Divise <i>P</i> = 2T³ − 3T² + 4T − 5 par T − 2.',
    etapes:[{f:'Coefficients : 2, −3, 4, −5. On abaisse 2.',w:'Le premier coefficient du quotient est celui de P.'},
     {f:'2 · 2 + (−3) = 1 ; puis 1 · 2 + 4 = 6 ; puis 6 · 2 + (−5) = 7.',w:'On multiplie par a = 2 et on ajoute le coefficient suivant.'},
     {f:'<i>Q</i> = 2T² + T + 6 et reste 7.',w:'Les premiers nombres sont les coefficients de Q, le dernier est le reste.'},
     {f:'Contrôle : <i>P</i>(2) = 16 − 12 + 8 − 5 = 7.',w:'Le reste est bien P(2).'}],
    conclusion:'2T³ − 3T² + 4T − 5 = (T − 2)(2T² + T + 6) + 7. Pour savoir si T − <i>a</i> divise <i>P</i>, il suffit de calculer <i>P</i>(<i>a</i>) ; pour diviser par T + 1, on prend <i>a</i> = −1.'}},
  {h:'Un reste sans division',p:'Quel est le reste de la division de T¹⁰⁰ + 3T − 2 par T + 1&nbsp;?',lab:'reste :',ans:-4,
   why:'T + 1 = T − (−1), donc le reste est P(−1) = (−1)¹⁰⁰ + 3 · (−1) − 2 = 1 − 3 − 2 = −4. Poser la division serait interminable.'},
  {kind:'Pratique',h:'Régler pour diviser',p:'Règle <i>m</i> pour que T − 1 divise <i>P</i> = T³ − 2T² + <i>m</i>T + 3. La courbe montre la fonction <i>x</i> ↦ <i>P</i>(<i>x</i>) et le point d’abscisse 1.',
   params:[{id:'m',l:'m',min:-6,max:6,v:0}],
   draw:v=>{ const P=plane({x:[-3,3],y:[-8,8],h:240,lab:2}); P.fn(x=>x*x*x-2*x*x+v.m*x+3,{c:'var(--math)'}); P.dot(1,v.m+2,{c:'var(--spark)',l:'(1 ; P(1))'}); return P.svg(); },
   info:v=>`P(1) = 1 − 2 + ${pn(v.m)} + 3 = <b>${fmt(v.m+2)}</b> = reste de la division par T − 1`,
   ok:v=>v.m===-2,
   why:'T − 1 divise P ⇔ P(1) = 0 ⇔ 1 − 2 + m + 3 = 0 ⇔ m = −2. Alors P = (T − 1)(T² − T − 3).'},
  {h:'PGCD de polynômes et Bézout',p:`Un <b>diviseur commun</b> de <i>A</i> et <i>B</i> est un polynôme qui les divise tous les deux. Le <b>pgcd</b> est le diviseur commun de plus grand degré, rendu <b>unitaire</b> (coefficient dominant 1) pour qu’il soit unique.<br>Tout se passe comme dans ℤ :<br>• si <i>A</i> = <i>BQ</i> + <i>R</i>, alors pgcd(<i>A</i> ; <i>B</i>) = pgcd(<i>B</i> ; <i>R</i>), d’où l’<b>algorithme d’Euclide</b> ; il s’arrête car les degrés des restes baissent ;<br>• <b>Bézout</b> : il existe <i>U</i>, <i>V</i> ∈ ℝ[T] avec <i>AU</i> + <i>BV</i> = pgcd(<i>A</i> ; <i>B</i>) ;<br>• <i>A</i> et <i>B</i> sont <b>premiers entre eux</b> (pgcd = 1) ⇔ il existe <i>U</i>, <i>V</i> avec <i>AU</i> + <i>BV</i> = 1.`,
   note:'Deux polynômes qui ont une racine commune a ne sont pas premiers entre eux : T − a divise les deux. Par exemple T² − 1 et T² − 3T + 2 ont tous deux la racine 1.'},
  {kind:'Méthode',h:'Euclide pour les polynômes',
   p:'<b>Quand :</b> pour trouver le pgcd de deux polynômes (donc leurs racines communes), ou des polynômes de Bézout. <b>Pourquoi ça marche :</b> comme dans ℤ, chaque division conserve les diviseurs communs et fait baisser le degré. <b>Comment :</b> 1) divise <i>A</i> par <i>B</i> ; 2) remplace (<i>A</i> ; <i>B</i>) par (<i>B</i> ; <i>R</i>) ; 3) le dernier reste non nul, rendu unitaire, est le pgcd ; 4) pour Bézout, remonte les calculs.',
   demo:{enonce:'Calcule le pgcd de <i>A</i> = T³ − 1 et <i>B</i> = T² − 1, puis une relation de Bézout.',
    etapes:[{f:'T³ − 1 = (T² − 1) · T + (T − 1)',w:'T³ ÷ T² = T ; on retire T³ − T, il reste T − 1.'},
     {f:'T² − 1 = (T − 1)(T + 1) + 0',w:'Le reste est nul : on s’arrête.'},
     {f:'pgcd(<i>A</i> ; <i>B</i>) = T − 1',w:'Dernier reste non nul, déjà unitaire.'},
     {f:'T − 1 = <i>A</i> − T · <i>B</i>, donc <i>U</i> = 1 et <i>V</i> = −T.',w:'On isole le reste dans la première ligne. Contrôle : T³ − 1 − T³ + T = T − 1.'}],
    conclusion:'<b>pgcd(T³ − 1 ; T² − 1) = T − 1</b> : 1 est la seule racine réelle commune. Si le dernier reste non nul est une constante non nulle c, le pgcd est 1 : les polynômes sont premiers entre eux.'}},
  {h:'Bézout avec des constantes',p:'T + 1 et T − 1 sont premiers entre eux. Trouve des constantes <i>u</i>, <i>v</i> telles que (T + 1)<i>u</i> + (T − 1)<i>v</i> = 1. Que vaut <i>u</i>&nbsp;?',lab:'u =',ans:0.5,tol:0.001,
   why:'On identifie les coefficients : u + v = 0 (en T) et u − v = 1 (constante). Donc u = 1/2 et v = −1/2. Contrôle : ½(T + 1) − ½(T − 1) = 1.'},
  {kind:'Problème',h:'Un reste sans poser la division',
   p:'On veut le reste <i>R</i> de la division de <i>P</i> = T⁵ + 2T³ − T + 4 par <i>B</i> = (T − 1)(T + 2) = T² + T − 2, sans poser la division. On écrit <i>P</i> = <i>BQ</i> + <i>R</i> et on évalue cette égalité aux racines de <i>B</i>.',
   parts:[
    {q:'a) Sous quelle forme peut-on chercher <i>R</i>&nbsp;?',opts:['R = αT² + βT + γ','R = αT + β, car deg R &lt; deg B = 2','R = α, une constante','R = (T − 1)(T + 2)'],ans:1,hint:'Le théorème de division impose une condition sur le degré du reste.',why:'deg R &lt; 2, donc R = αT + β avec α, β réels (éventuellement nuls).'},
    {q:'b) Que vaut <i>P</i>(1)&nbsp;?',lab:'P(1) =',ans:6,hint:'Remplace T par 1 dans P.',why:'P(1) = 1 + 2 − 1 + 4 = 6. Comme B(1) = 0, l’égalité P = BQ + R donne R(1) = α + β = 6.'},
    {q:'c) Que vaut <i>P</i>(−2)&nbsp;?',lab:'P(−2) =',ans:-42,hint:'(−2)⁵ = −32 et (−2)³ = −8.',why:'P(−2) = −32 − 16 + 2 + 4 = −42. Comme B(−2) = 0 : R(−2) = −2α + β = −42.'},
    {q:'d) Que vaut α, le coefficient de T dans <i>R</i>&nbsp;?',lab:'α =',ans:16,hint:'Retranche les deux équations α + β = 6 et −2α + β = −42.',why:'3α = 48 donne α = 16, puis β = 6 − 16 = −10. Donc R = 16T − 10.'},
   ],
   sol:'On écrit P = (T − 1)(T + 2)Q + R avec deg R &lt; 2, donc <b>R = αT + β</b>.<br>En T = 1 : P(1) = 6 = α + β. En T = −2 : P(−2) = −42 = −2α + β.<br>Par soustraction, 3α = 48, donc <b>α = 16</b> et <b>β = −10</b>.<br>Le reste est <b>R = 16T − 10</b>. Une division posée le confirme : Q = T³ − T² + 5T − 7 et (T² + T − 2)(T³ − T² + 5T − 7) + 16T − 10 = T⁵ + 2T³ − T + 4.'},
  {kind:'Problème',h:'Racine commune et Bézout',
   p:'Soient <i>A</i> = T³ − 2T² + 2T − 1 et <i>B</i> = T² − 1. On veut leur pgcd par l’algorithme d’Euclide, en déduire leurs racines réelles communes, puis écrire une relation de Bézout <i>AU</i> + <i>BV</i> = pgcd(<i>A</i> ; <i>B</i>).',
   parts:[
    {q:'a) Quel est le quotient de la division de <i>A</i> par <i>B</i>&nbsp;?',opts:['T + 2','T − 2','T² − 2T','T − 1'],ans:1,hint:'T³ ÷ T² = T. Retire T(T² − 1), puis continue avec le reste partiel −2T² + 3T − 1.',why:'On retire T³ − T : il reste −2T² + 3T − 1. Puis −2T² ÷ T² = −2 : on retire −2T² + 2, il reste 3T − 3. Donc Q = T − 2.'},
    {q:'b) Le reste <i>R</i>₁ de cette division s’écrit αT + β. Que vaut α&nbsp;?',lab:'α =',ans:3,hint:'Reprends la dernière ligne de la division.',why:'R₁ = 3T − 3 = 3(T − 1) : α = 3.'},
    {q:'c) Quel est pgcd(<i>A</i> ; <i>B</i>)&nbsp;?',opts:['1','3T − 3','T − 1','T² − 1'],ans:2,hint:'Divise B par R₁ et regarde le reste. N’oublie pas de rendre le pgcd unitaire.',why:'T² − 1 = (3T − 3) · (T + 1)/3 + 0. Le dernier reste non nul est 3T − 3 ; unitaire, il donne T − 1. La racine commune est 1.'},
    {q:'d) On écrit T − 1 = <i>A</i> · <i>U</i> + <i>B</i> · <i>V</i> avec <i>U</i> constant. Que vaut <i>U</i>&nbsp;?',lab:'U =',ans:1/3,tol:0.001,hint:'La première ligne d’Euclide donne 3T − 3 = A − (T − 2)B. Divise par 3.',why:'T − 1 = (1/3)A − (1/3)(T − 2)B : U = 1/3 et V = −(T − 2)/3.'},
   ],
   sol:'<b>Division de A par B</b> : T³ − 2T² + 2T − 1 = (T² − 1)(T − 2) + (3T − 3).<br><b>Division de B par 3T − 3</b> : T² − 1 = (3T − 3) · ⅓(T + 1), reste 0.<br>Le dernier reste non nul est 3T − 3 ; le pgcd unitaire est <b>T − 1</b>. Les racines réelles communes de A et B sont celles de T − 1 : <b>seulement 1</b> (−1 annule B mais A(−1) = −6).<br><b>Bézout</b> : de la première ligne, 3(T − 1) = A − (T − 2)B, donc <b>T − 1 = ⅓A − ⅓(T − 2)B</b>.<br>Contrôle : A = (T − 1)(T² − T + 1) et B = (T − 1)(T + 1) ; T² − T + 1 et T + 1 n’ont pas de racine commune.'},
]},
/* ===================== 4. L’ANNEAU DES MATRICES 2 × 2 ===================== */
{subj:'gred',sem:'ann',id:'gred-matrices',h:'L’anneau des matrices M₂,₂(ℝ)',p:'Un anneau non commutatif où l’on ne peut pas simplifier : produit ligne × colonne, AB ≠ BA, diviseurs de zéro, matrices nilpotentes, déterminant comme aire, inverse et groupe GL₂(ℝ), sous-anneaux qui imitent les complexes.',steps:[
  {h:'Une matrice transforme le plan',p:`Une <b>matrice</b> 2 × 2 est un tableau de quatre réels ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])}. On note M₂,₂(ℝ) leur ensemble. Elle agit sur les points du plan :<br><b>(<i>x</i> ; <i>y</i>) ↦ (<i>ax</i> + <i>by</i> ; <i>cx</i> + <i>dy</i>)</b>.<br>La <b>1re colonne</b> (<i>a</i> ; <i>c</i>) est l’image de (1 ; 0), flèche bleue ; la <b>2e colonne</b> (<i>b</i> ; <i>d</i>) est l’image de (0 ; 1), flèche orange. Le carré unité (pointillé) devient un parallélogramme et tout le quadrillage se déforme avec lui.`,
   params:[{id:'a',l:'a',min:-2,max:2,step:0.5,v:1},{id:'b',l:'b',min:-2,max:2,step:0.5,v:0.5},{id:'c',l:'c',min:-2,max:2,step:0.5,v:0},{id:'d',l:'d',min:-2,max:2,step:0.5,v:1}],
   draw:v=>grille(plane({x:[-4,4],y:[-4,4],grid:false}),[[v.a,v.b],[v.c,v.d]]).svg(),
   info:v=>`${M([[v.a,v.b],[v.c,v.d]])} &nbsp; (1 ; 0) ↦ (${fmt(v.a)} ; ${fmt(v.c)}) &nbsp;·&nbsp; (0 ; 1) ↦ (${fmt(v.b)} ; ${fmt(v.d)}) &nbsp;·&nbsp; aire du parallélogramme : ${fmt(Math.abs(v.a*v.d-v.b*v.c))}`,
   note:'Essaie a = 0, b = −1, c = 1, d = 0 : c’est le quart de tour. Et a = d = 1, b = c = 0 : la matrice identité I, qui ne bouge rien.'},
  {h:'Image d’un point',p:`Quelle est l’image du point (1 ; 2) par la matrice ${mat([[2,1],[0,3]])}&nbsp;?`,
   opts:['(2 ; 6)','(4 ; 6)','(3 ; 3)','(4 ; 3)'],ans:1,
   why:'(2 · 1 + 1 · 2 ; 0 · 1 + 3 · 2) = (4 ; 6). Chaque coordonnée de l’image est une ligne de la matrice multipliée par la colonne (1 ; 2).'},
  {h:'L’addition des matrices',p:`On additionne case par case : ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} + ${mat([['<i>a</i>′','<i>b</i>′'],['<i>c</i>′','<i>d</i>′']])} = ${mat([['<i>a</i> + <i>a</i>′','<i>b</i> + <i>b</i>′'],['<i>c</i> + <i>c</i>′','<i>d</i> + <i>d</i>′']])}.<br>Comme on additionne des réels case par case, (M₂,₂(ℝ), +) hérite de tout : c’est un <b>groupe abélien</b>, de neutre la matrice nulle <b>0</b>, l’opposée de <i>A</i> étant −<i>A</i> (on change tous les signes). On multiplie aussi par un réel case par case : 3<i>A</i> = <i>A</i> + <i>A</i> + <i>A</i>.`},
  {h:'La multiplication : ligne × colonne',p:`Le produit <i>AB</i> est défini pour que <b>appliquer <i>B</i> puis <i>A</i></b> revienne à appliquer <i>AB</i>. Le calcul se fait <b>ligne × colonne</b> : la case (<i>i</i> ; <i>j</i>) de <i>AB</i> est la ligne <i>i</i> de <i>A</i> « fois » la colonne <i>j</i> de <i>B</i>.<br>${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} · ${mat([['<i>e</i>','<i>f</i>'],['<i>g</i>','<i>h</i>']])} = ${mat([['<i>ae</i> + <i>bg</i>','<i>af</i> + <i>bh</i>'],['<i>ce</i> + <i>dg</i>','<i>cf</i> + <i>dh</i>']])}.<br>Comme la composition des applications, ce produit est <b>associatif</b>, et <b>I</b> = ${mat([[1,0],[0,1]])} est neutre : <i>AI</i> = <i>IA</i> = <i>A</i>.`,
   note:'L’ordre se lit de droite à gauche, comme pour g ∘ f : dans AB, c’est B qui agit en premier.'},
  {kind:'Méthode',h:'Calculer un produit de matrices',
   p:'<b>Quand :</b> à chaque produit <i>AB</i>, puissance <i>A</i>², vérification d’un inverse. <b>Pourquoi ça marche :</b> la case (<i>i</i> ; <i>j</i>) de <i>AB</i> mesure ce que devient la <i>j</i>-ième colonne de <i>B</i> sous l’action de <i>A</i>, lue sur la <i>i</i>-ième coordonnée. <b>Comment :</b> pour chaque case, pose ton doigt gauche sur la ligne <i>i</i> de <i>A</i>, ton doigt droit sur la colonne <i>j</i> de <i>B</i>, multiplie terme à terme et additionne. Fais les 4 cases dans l’ordre, puis compare avec <i>BA</i> si besoin.',
   demo:{enonce:`Calcule <i>AB</i> et <i>BA</i> pour <i>A</i> = ${mat([[1,2],[3,4]])} et <i>B</i> = ${mat([[0,1],[1,0]])}.`,
    etapes:[{f:'Case (1 ; 1) de <i>AB</i> : (1 ; 2) · (0 ; 1) = 1 · 0 + 2 · 1 = 2. Case (1 ; 2) : (1 ; 2) · (1 ; 0) = 1.',w:'Première ligne de A avec chaque colonne de B.'},
     {f:'Case (2 ; 1) : (3 ; 4) · (0 ; 1) = 4. Case (2 ; 2) : (3 ; 4) · (1 ; 0) = 3.',w:'Deuxième ligne de A avec chaque colonne de B.'},
     {f:`<i>AB</i> = ${mat([[2,1],[4,3]])}`,w:'Multiplier à droite par B a échangé les colonnes de A.'},
     {f:`<i>BA</i> = ${mat([[3,4],[1,2]])}`,w:'Même méthode avec les lignes de B : multiplier à gauche par B échange les lignes de A.'}],
    conclusion:'<b><i>AB</i> ≠ <i>BA</i></b> : la multiplication des matrices n’est <b>pas commutative</b>. Retiens aussi ces deux effets : multiplier à droite agit sur les colonnes, à gauche sur les lignes.'}},
  {h:'Une case du produit',p:`Que vaut la case (ligne 2 ; colonne 1) du produit ${mat([[2,-1],[3,1]])} · ${mat([[1,4],[-2,0]])}&nbsp;?`,lab:'case =',ans:1,
   why:'Ligne 2 de la première matrice : (3 ; 1). Colonne 1 de la seconde : (1 ; −2). 3 · 1 + 1 · (−2) = 1. Le produit complet vaut [[4 ; 8] ; [1 ; 12]].'},
  {h:'AB ≠ BA, en image',p:`<i>A</i> = ${mat([[0,-1],[1,0]])} est le quart de tour, <i>B</i> = ${mat([[1,1],[0,1]])} un cisaillement horizontal. Applique-les à la lettre F, dans un ordre puis dans l’autre, étape par étape. Les deux résultats finaux ne coïncident pas.`,
   params:[{id:'o',l:'ordre (0 : AB, 1 : BA)',min:0,max:1,v:0},{id:'k',l:'étape',min:0,max:2,v:2}],
   draw:v=>{ const A=[[0,-1],[1,0]], B=[[1,1],[0,1]], seq=v.o===0?[B,A]:[A,B]; let pts=LF;
     for(let i=0;i<v.k;i++) pts=pts.map(p=>ap(seq[i],p));
     const P=plane({x:[-4,4],y:[-4,4],lab:1}); P.poly(LF,{c:'var(--muted)',w:1.5,dash:true});
     P.poly(pts,{fill:v.o===0?'var(--accent)':'var(--spark)',fo:.4,c:v.o===0?'var(--accent)':'var(--spark)',w:2}); return P.svg(); },
   info:v=>{ const A=[[0,-1],[1,0]], B=[[1,1],[0,1]];
     const t=v.o===0?['lettre F de départ','après B (cisaillement)','après B puis A : image par AB = ']:['lettre F de départ','après A (quart de tour)','après A puis B : image par BA = '];
     return t[v.k]+(v.k===2?M(v.o===0?mul(A,B):mul(B,A)):''); },
   note:'AB = [[0 ; −1] ; [1 ; 1]] et BA = [[1 ; −1] ; [1 ; 0]] : cisailler puis tourner n’est pas tourner puis cisailler.'},
  {h:'Qui commute ?',p:'Pour quelle paire a-t-on <i>AB</i> = <i>BA</i>&nbsp;?',
   opts:[`${mat([[1,2],[0,1]])} et ${mat([[3,0],[1,1]])}`,`${mat([[0,1],[1,0]])} et ${mat([[1,2],[3,4]])}`,`${mat([[2,0],[0,3]])} et ${mat([[-1,0],[0,4]])}`,`${mat([[0,-1],[1,0]])} et ${mat([[1,1],[0,1]])}`],ans:2,
   why:'Deux matrices diagonales commutent : leur produit est diagonal, de cases 2 · (−1) = −2 et 3 · 4 = 12, dans les deux ordres. Pour la première paire, AB = [[5 ; 2] ; [1 ; 1]] mais BA = [[3 ; 6] ; [1 ; 3]].'},
  {h:'Un anneau non commutatif',p:`Avec l’addition et la multiplication, M₂,₂(ℝ) vérifie : (M₂,₂(ℝ), +) groupe abélien, · associative de neutre I, et distributivité <b>des deux côtés</b> : <i>A</i>(<i>B</i> + <i>C</i>) = <i>AB</i> + <i>AC</i> et (<i>B</i> + <i>C</i>)<i>A</i> = <i>BA</i> + <i>CA</i>. C’est un <b>anneau unitaire non commutatif</b>.<br>Conséquence : les identités remarquables changent. En développant,<br><b>(<i>A</i> + <i>B</i>)² = <i>A</i>² + <i>AB</i> + <i>BA</i> + <i>B</i>²</b>,<br>qui ne vaut <i>A</i>² + 2<i>AB</i> + <i>B</i>² que si <i>AB</i> = <i>BA</i>.`,
   note:'Il faut deux distributivités car on ne peut pas passer de l’une à l’autre en échangeant les facteurs. Dans ℤ et ℝ[T], une seule suffisait.'},
  {kind:'Question',h:'Développer sans commuter',p:'Pour des matrices <i>A</i> et <i>B</i> quelconques, à quoi est égal (<i>A</i> + <i>B</i>)(<i>A</i> − <i>B</i>)&nbsp;?',
   opts:['<i>A</i>² − <i>B</i>²','<i>A</i>² − <i>AB</i> + <i>BA</i> − <i>B</i>²','<i>A</i>² + <i>AB</i> − <i>BA</i> − <i>B</i>²','<i>A</i>² − 2<i>AB</i> − <i>B</i>²'],ans:1,
   why:'On distribue en gardant l’ordre : (A + B)(A − B) = A · A − A · B + B · A − B · B. Les termes −AB et BA ne s’annulent que si A et B commutent.'},
  {h:'Diviseurs de zéro et nilpotents',p:`Dans M₂,₂(ℝ), un produit peut être nul sans qu’aucun facteur le soit :<br>${mat([[1,0],[0,0]])} · ${mat([[0,0],[0,1]])} = ${mat([[0,0],[0,0]])}.<br>La première matrice projette sur l’axe horizontal, la seconde sur l’axe vertical : enchaînées, elles écrasent tout sur l’origine. Ces matrices sont des <b>diviseurs de zéro</b>, et l’anneau <b>n’est pas intègre</b>.<br>Plus surprenant : <i>N</i> = ${mat([[0,1],[0,0]])} vérifie <i>N</i> ≠ 0 mais <b><i>N</i>² = 0</b>. On dit que <i>N</i> est <b>nilpotente</b>. Dans ℝ, <i>x</i>² = 0 force <i>x</i> = 0.`,
   note:'Conséquence majeure : on ne peut pas simplifier. AB = AC n’implique pas B = C, puisque A(B − C) = 0 peut arriver avec B − C ≠ 0.'},
  {kind:'Méthode',h:'Trouver B ≠ 0 tel que AB = 0',
   p:'<b>Quand :</b> on veut prouver qu’une matrice <i>A</i> est un diviseur de zéro, ou montrer qu’une simplification est impossible. <b>Pourquoi ça marche :</b> les colonnes de <i>AB</i> sont les images par <i>A</i> des colonnes de <i>B</i>. Donc <i>AB</i> = 0 ⇔ chaque colonne de <i>B</i> est envoyée sur 0 par <i>A</i>. <b>Comment :</b> 1) cherche un vecteur non nul (<i>x</i> ; <i>y</i>) avec <i>A</i>(<i>x</i> ; <i>y</i>) = (0 ; 0), en résolvant un petit système ; 2) prends pour <i>B</i> des colonnes multiples de ce vecteur.',
   demo:{enonce:`Trouve <i>B</i> ≠ 0 tel que <i>AB</i> = 0 pour <i>A</i> = ${mat([[1,2],[2,4]])}.`,
    etapes:[{f:'<i>A</i>(<i>x</i> ; <i>y</i>) = (<i>x</i> + 2<i>y</i> ; 2<i>x</i> + 4<i>y</i>) = (0 ; 0) ⇔ <i>x</i> + 2<i>y</i> = 0.',w:'La deuxième équation est le double de la première : une seule contrainte, donc une infinité de solutions.'},
     {f:'(<i>x</i> ; <i>y</i>) = (2 ; −1) convient.',w:'On choisit y = −1, alors x = 2.'},
     {f:`<i>B</i> = ${mat([[2,-4],[-1,2]])}`,w:'Colonnes (2 ; −1) et (−4 ; 2) = −2 · (2 ; −1).'},
     {f:'Contrôle : 1 · 2 + 2 · (−1) = 0, 1 · (−4) + 2 · 2 = 0, 2 · 2 + 4 · (−1) = 0, 2 · (−4) + 4 · 2 = 0.',w:'Les quatre cases sont nulles.'}],
    conclusion:'<b><i>AB</i> = 0</b> avec <i>A</i> ≠ 0 et <i>B</i> ≠ 0. Cela marche ici car les colonnes de <i>A</i> sont proportionnelles. Tu verras plus bas que c’est le cas exactement quand le déterminant de <i>A</i> est nul.'}},
  {kind:'Pratique',h:'Le vecteur écrasé',p:`<i>A</i> = ${mat([[2,6],[1,3]])}. Règle un vecteur <i>v</i> = (<i>x</i> ; <i>y</i>) <b>non nul</b> (bleu) pour que son image <i>Av</i> (orange) soit le vecteur nul. Toutes les images tombent sur la droite en pointillé.`,
   params:[{id:'x',l:'x',min:-5,max:5,v:1},{id:'y',l:'y',min:-5,max:5,v:1}],
   draw:v=>{ const P=plane({x:[-10,10],y:[-10,10],lab:5}), w=ap([[2,6],[1,3]],[v.x,v.y]);
     P.seg(-20,-10,20,10,{c:'var(--muted)',w:1.5,dash:true}); P.arrow(0,0,v.x,v.y,{c:'var(--math)'});
     if(w[0]||w[1]) P.arrow(0,0,w[0],w[1],{c:'var(--spark)'}); else P.dot(0,0,{c:'var(--spark)',l:'Av = 0'}); return P.svg(); },
   info:v=>`Av = (2 · ${pn(v.x)} + 6 · ${pn(v.y)} ; ${pn(v.x)} + 3 · ${pn(v.y)}) = (<b>${fmt(2*v.x+6*v.y)}</b> ; <b>${fmt(v.x+3*v.y)}</b>)`,
   ok:v=>v.x+3*v.y===0&&(v.x!==0||v.y!==0),
   why:'Av = 0 ⇔ x + 3y = 0, par exemple v = (3 ; −1) ou (−3 ; 1). Avec B = [[3 ; −3] ; [−1 ; 1]], on obtient AB = 0 : A est un diviseur de zéro.'},
  {h:'Repérer une nilpotente',p:'Laquelle de ces matrices vérifie <i>N</i>² = 0&nbsp;?',
   opts:[mat([[1,1],[0,1]]),mat([[2,4],[-1,-2]]),mat([[0,1],[1,0]]),mat([[1,0],[0,0]])],ans:1,
   why:'[[2 ; 4] ; [−1 ; −2]]² : 2 · 2 + 4 · (−1) = 0, 2 · 4 + 4 · (−2) = 0, −1 · 2 + (−2)(−1) = 0, −1 · 4 + (−2)(−2) = 0. La 3e a pour carré I, la 4e est égale à son carré.'},
  {h:'Le déterminant : une aire',p:`Le <b>déterminant</b> de <i>A</i> = ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} est <b>det <i>A</i> = <i>ad</i> − <i>bc</i></b>. C’est l’<b>aire signée</b> du parallélogramme image du carré unité : |det <i>A</i>| est le facteur par lequel <i>A</i> multiplie toutes les aires, et le signe dit si l’orientation est conservée.<br>Si on applique <i>B</i> puis <i>A</i>, les aires sont multipliées par det <i>B</i> puis par det <i>A</i> :<br><b>det(<i>AB</i>) = det <i>A</i> · det <i>B</i></b>.<br>det <i>A</i> = 0 signifie que le plan est aplati sur une droite (ou un point) : c’est exactement le cas des colonnes proportionnelles.`},
  {kind:'Pratique',h:'Aplatir le carré',p:`Règle <i>a</i> et <i>d</i> pour que la matrice ${mat([['<i>a</i>',1],[1,'<i>d</i>']])} aplatisse le carré unité sur un segment.`,
   params:[{id:'a',l:'a',min:-2,max:2,step:0.5,v:2},{id:'d',l:'d',min:-2,max:2,step:0.5,v:2}],
   draw:v=>grille(plane({x:[-4,4],y:[-4,4],grid:false}),[[v.a,1],[1,v.d]]).svg(),
   info:v=>`det = ${pn(v.a)} · ${pn(v.d)} − 1 · 1 = <b>${fmt(v.a*v.d-1)}</b>`+(v.a*v.d-1===0?' : aire nulle, le carré est aplati':` : aire ${fmt(Math.abs(v.a*v.d-1))}`+(v.a*v.d-1<0?', orientation renversée':'')),
   ok:v=>v.a*v.d===1,
   why:'Il faut det = ad − 1 = 0, soit ad = 1 : par exemple a = d = 1, ou a = 2 et d = 0,5, ou a = d = −1. Les deux colonnes sont alors proportionnelles.'},
  {h:'Déterminant d’un produit',p:`Calcule det(<i>AB</i>) pour <i>A</i> = ${mat([[3,1],[2,4]])} et <i>B</i> = ${mat([[1,-2],[5,1]])}.`,lab:'det(AB) =',ans:110,
   why:'det A = 12 − 2 = 10 et det B = 1 + 10 = 11, donc det(AB) = 110. Contrôle : AB = [[8 ; −5] ; [22 ; 0]] et 8 · 0 − (−5) · 22 = 110.'},
  {h:'L’inverse et le groupe GL₂(ℝ)',p:`<i>A</i> est <b>inversible</b> s’il existe <i>B</i> avec <i>AB</i> = <i>BA</i> = I. Si det <i>A</i> ≠ 0,<br><b><i>A</i>⁻¹ = ${F(1,'det <i>A</i>')} ${mat([['<i>d</i>','−<i>b</i>'],['−<i>c</i>','<i>a</i>']])}</b> : on échange <i>a</i> et <i>d</i>, on change le signe de <i>b</i> et <i>c</i>, et on divise par le déterminant.<br>Les matrices inversibles forment un <b>groupe</b> pour la multiplication, noté <b>GL₂(ℝ)</b> : le produit de deux inversibles est inversible, (<i>AB</i>)⁻¹ = <i>B</i>⁻¹<i>A</i>⁻¹. Ce sont les éléments inversibles de l’anneau.`,
   note:'Attention à l’ordre : (AB)⁻¹ = B⁻¹A⁻¹, comme pour enlever ses chaussures puis ses chaussettes. Et un diviseur de zéro n’est jamais inversible : si AB = 0 avec B ≠ 0, alors B = A⁻¹AB = 0, absurde.'},
  {kind:'Question',h:'Pourquoi det A ≠ 0 est nécessaire',p:'Pourquoi une matrice de déterminant nul n’a-t-elle pas d’inverse&nbsp;?',
   opts:['Parce qu’on ne peut pas diviser par une matrice.','Si AB = I, alors det A · det B = det I = 1, ce qui est impossible si det A = 0.','Parce que ses coefficients sont nuls.','Parce que A² = 0.'],ans:1,
   why:'La règle det(AB) = det A · det B donne det A · det B = 1. Si det A = 0, le membre de gauche vaut 0. Donc pas d’inverse. Une matrice de déterminant nul n’est pas forcément nilpotente ni à coefficients nuls.'},
  {kind:'Méthode',h:'Inverser une matrice 2 × 2 et résoudre un système',
   p:`<b>Quand :</b> pour résoudre un système de deux équations à deux inconnues écrit <i>AX</i> = <i>Y</i>, ou pour « défaire » une transformation. <b>Pourquoi ça marche :</b> en multipliant ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} par ${mat([['<i>d</i>','−<i>b</i>'],['−<i>c</i>','<i>a</i>']])}, on trouve (<i>ad</i> − <i>bc</i>) I. <b>Comment :</b> 1) calcule det <i>A</i> ; s’il est nul, pas d’inverse ; 2) applique la formule ; 3) vérifie <i>AA</i>⁻¹ = I ; 4) si <i>AX</i> = <i>Y</i>, multiplie à gauche par <i>A</i>⁻¹ : <i>X</i> = <i>A</i>⁻¹<i>Y</i>.`,
   demo:{enonce:'Résous le système 3<i>x</i> + 5<i>y</i> = 7, <i>x</i> + 2<i>y</i> = 3 avec une matrice inverse.',
    etapes:[{f:`<i>A</i> = ${mat([[3,5],[1,2]])}, det <i>A</i> = 3 · 2 − 5 · 1 = 1.`,w:'Le déterminant n’est pas nul : A est inversible.'},
     {f:`<i>A</i>⁻¹ = ${mat([[2,-5],[-1,3]])}`,w:'On échange 3 et 2, on change le signe de 5 et de 1, on divise par 1.'},
     {f:'Contrôle : 3 · 2 + 5 · (−1) = 1, 3 · (−5) + 5 · 3 = 0, 1 · 2 + 2 · (−1) = 0, 1 · (−5) + 2 · 3 = 1.',w:'AA⁻¹ = I.'},
     {f:'(<i>x</i> ; <i>y</i>) = <i>A</i>⁻¹(7 ; 3) = (2 · 7 − 5 · 3 ; −7 + 3 · 3) = (−1 ; 2).',w:'On multiplie à gauche, car A⁻¹(AX) = (A⁻¹A)X = X.'}],
    conclusion:'La solution est <b>(<i>x</i> ; <i>y</i>) = (−1 ; 2)</b>. Contrôle : 3 · (−1) + 5 · 2 = 7 et −1 + 4 = 3.'}},
  {h:'Une case de l’inverse',p:`Calcule l’inverse de ${mat([[4,7],[2,4]])}. Que vaut sa case en haut à droite&nbsp;?`,lab:'case =',ans:-3.5,tol:0.001,
   why:'det = 16 − 14 = 2. A⁻¹ = ½ [[4 ; −7] ; [−2 ; 4]] = [[2 ; −3,5] ; [−1 ; 2]]. La case en haut à droite vaut −7/2 = −3,5.'},
  {h:'Des sous-anneaux remarquables',p:`Un <b>sous-anneau</b> est une partie qui contient I et qui est stable par différence et par produit. Deux exemples :<br>• les <b>matrices diagonales</b> ${mat([['<i>a</i>',0],[0,'<i>d</i>']])} : on calcule case par case, c’est un sous-anneau <b>commutatif</b>, mais il contient des diviseurs de zéro ;<br>• les matrices ${mat([['<i>a</i>','−<i>b</i>'],['<i>b</i>','<i>a</i>']])} : leur produit vaut ${mat([['<i>ac</i> − <i>bd</i>','−(<i>ad</i> + <i>bc</i>)'],['<i>ad</i> + <i>bc</i>','<i>ac</i> − <i>bd</i>']])}, exactement comme (<i>a</i> + <i>bi</i>)(<i>c</i> + <i>di</i>). Ce sous-anneau est une copie des <b>nombres complexes</b> : J = ${mat([[0,-1],[1,0]])} joue le rôle de <i>i</i>, avec J² = −I. Son déterminant <i>a</i>² + <i>b</i>² n’est nul que pour la matrice nulle : tout élément non nul est inversible.`,
   note:'Le quart de tour J est la « racine carrée de −1 » du plan : deux quarts de tour font un demi-tour, c’est-à-dire −I.'},
  {kind:'Méthode',h:'Vérifier qu’une partie est un sous-anneau',
   p:'<b>Quand :</b> on te présente une famille de matrices (ou de polynômes, d’entiers) et on se demande si elle forme un anneau pour les mêmes lois. <b>Pourquoi :</b> associativité, distributivité et commutativité de + sont héritées de l’anneau ambiant. Il ne reste à vérifier que ce qui peut « sortir » de la partie. <b>Comment :</b> 1) I est-elle dans la partie ? 2) la différence de deux éléments y reste-t-elle ? 3) le produit de deux éléments y reste-t-il ? Pour réfuter, un seul contre-exemple suffit.',
   demo:{enonce:`Montre que les matrices de la forme ${mat([['<i>a</i>','<i>b</i>'],[0,'<i>a</i>']])} forment un sous-anneau commutatif de M₂,₂(ℝ).`,
    etapes:[{f:'I = [[1 ; 0] ; [0 ; 1]] est de cette forme (<i>a</i> = 1, <i>b</i> = 0).',w:'Premier critère : le neutre.'},
     {f:'[[<i>a</i> ; <i>b</i>] ; [0 ; <i>a</i>]] − [[<i>c</i> ; <i>d</i>] ; [0 ; <i>c</i>]] = [[<i>a</i> − <i>c</i> ; <i>b</i> − <i>d</i>] ; [0 ; <i>a</i> − <i>c</i>]].',w:'Même forme : stable par différence.'},
     {f:'[[<i>a</i> ; <i>b</i>] ; [0 ; <i>a</i>]] · [[<i>c</i> ; <i>d</i>] ; [0 ; <i>c</i>]] = [[<i>ac</i> ; <i>ad</i> + <i>bc</i>] ; [0 ; <i>ac</i>]].',w:'Ligne × colonne : même forme, stable par produit.'},
     {f:'L’expression <i>ad</i> + <i>bc</i> est symétrique en (<i>a</i> ; <i>b</i>) et (<i>c</i> ; <i>d</i>) : le produit est commutatif.',w:'Échanger les deux matrices donne cb + da, la même chose.'}],
    conclusion:'C’est un <b>sous-anneau commutatif</b>. Il contient N = [[0 ; 1] ; [0 ; 0]] (<i>a</i> = 0, <i>b</i> = 1), nilpotente : il n’est pas intègre. À l’inverse, les matrices de déterminant 1 ne forment pas un sous-anneau : I + I a pour déterminant 4.'}},
  {h:'Multiplier des « complexes »',p:`Calcule ${mat([[1,-2],[2,1]])} · ${mat([[3,-1],[1,3]])}. Que vaut la case en haut à droite&nbsp;?`,lab:'case =',ans:-7,
   why:'Ligne 1 (1 ; −2) et colonne 2 (−1 ; 3) : 1 · (−1) + (−2) · 3 = −7. Le produit vaut [[1 ; −7] ; [7 ; 1]], comme (1 + 2i)(3 + i) = 3 + i + 6i + 2i² = 1 + 7i.'},
  {kind:'Problème',h:'Les puissances d’une similitude',
   p:`Soit <i>A</i> = ${mat([[1,-1],[1,1]])}. Elle est de la forme ${mat([['<i>a</i>','−<i>b</i>'],['<i>b</i>','<i>a</i>']])} et correspond au complexe 1 + <i>i</i> : géométriquement, elle tourne de 45° et agrandit les longueurs d’un facteur √2. On veut calculer <i>A</i>⁸ avec le moins de calculs possible, en utilisant <i>A</i>⁴ = <i>A</i>² · <i>A</i>² et <i>A</i>⁸ = <i>A</i>⁴ · <i>A</i>⁴.`,
   params:[{id:'n',l:'puissance n',min:0,max:4,v:1}],
   draw:v=>{ let B=[[1,0],[0,1]]; for(let i=0;i<v.n;i++) B=mul([[1,-1],[1,1]],B); return grille(plane({x:[-5,5],y:[-5,5],grid:false}),B,2).svg(); },
   info:v=>{ let B=[[1,0],[0,1]]; for(let i=0;i<v.n;i++) B=mul([[1,-1],[1,1]],B); return `A<sup>${v.n}</sup> = ${M(B)} &nbsp;·&nbsp; aire du carré image : ${fmt(B[0][0]*B[1][1]-B[0][1]*B[1][0])}`; },
   parts:[
    {q:'a) Que vaut <i>A</i>²&nbsp;?',opts:[mat([[0,-2],[2,0]]),mat([[2,-2],[2,2]]),mat([[1,1],[1,1]]),mat([[0,2],[-2,0]])],ans:0,hint:'Ligne × colonne, ou bien (1 + i)² = 1 + 2i + i².',why:'Case (1 ; 1) : 1 − 1 = 0 ; case (1 ; 2) : −1 − 1 = −2 ; case (2 ; 1) : 1 + 1 = 2 ; case (2 ; 2) : −1 + 1 = 0. A² = 2J avec J le quart de tour.'},
    {q:'b) Que vaut la case en haut à gauche de <i>A</i>⁴&nbsp;?',lab:'case =',ans:-4,hint:'A⁴ = (2J)(2J) = 4J² et J² = −I.',why:'A⁴ = A² · A² = [[0 ; −2] ; [2 ; 0]]² = [[−4 ; 0] ; [0 ; −4]] = −4I.'},
    {q:'c) Que vaut la case en haut à gauche de <i>A</i>⁸&nbsp;?',lab:'case =',ans:16,hint:'A⁸ = (−4I)(−4I).',why:'A⁸ = (−4I)² = 16I : huit rotations de 45° font un tour complet, et (√2)⁸ = 16.'},
    {q:'d) Calcule det(<i>A</i>⁸) de deux façons. Que vaut-il&nbsp;?',lab:'det =',ans:256,hint:'det A = 1 + 1 = 2, et det(AB) = det A · det B.',why:'det(A⁸) = (det A)⁸ = 2⁸ = 256, et directement det(16I) = 16 · 16 = 256.'},
   ],
   sol:'On calcule par élévations au carré successives. <b>A² = [[0 ; −2] ; [2 ; 0]] = 2J</b>, où J est le quart de tour.<br>Comme J² = −I et que les scalaires commutent avec tout, <b>A⁴ = 4J² = −4I</b>, puis <b>A⁸ = 16I</b>.<br>Vérification par le déterminant : det A = 2 et det(A⁸) = 2⁸ = 256 = det(16I).<br>En complexes : (1 + i)² = 2i, (1 + i)⁴ = −4, (1 + i)⁸ = 16. Géométriquement, 8 rotations de 45° font un tour et les aires sont multipliées par 2 à chaque étape.'},
  {kind:'Problème',h:'Fibonacci dans une matrice',
   p:`La suite de Fibonacci est définie par <i>F</i>₀ = 0, <i>F</i>₁ = 1 et <i>F</i>ₙ₊₁ = <i>F</i>ₙ + <i>F</i>ₙ₋₁ : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, … Soit <i>Φ</i> = ${mat([[1,1],[1,0]])}. On admet (récurrence facile) que pour <i>n</i> ≥ 1,<br><i>Φ</i>ⁿ = ${mat([['<i>F</i>ₙ₊₁','<i>F</i>ₙ'],['<i>F</i>ₙ','<i>F</i>ₙ₋₁']])}.<br>On va en tirer une identité surprenante sur les nombres de Fibonacci.`,
   parts:[
    {q:'a) Que vaut <i>Φ</i>²&nbsp;?',opts:[mat([[1,1],[1,1]]),mat([[2,1],[1,1]]),mat([[2,1],[1,0]]),mat([[1,2],[2,1]])],ans:1,hint:'Ligne × colonne : (1 ; 1) · (1 ; 1) pour la première case.',why:'Φ² = [[1 + 1 ; 1 + 0] ; [1 + 0 ; 1 + 0]] = [[2 ; 1] ; [1 ; 1]] = [[F₃ ; F₂] ; [F₂ ; F₁]].'},
    {q:'b) Que vaut la case en haut à gauche de <i>Φ</i>⁵&nbsp;?',lab:'case =',ans:8,hint:'Calcule Φ⁴ = Φ² · Φ², puis Φ⁵ = Φ⁴ · Φ. Ou lis la formule admise.',why:'Φ⁴ = [[5 ; 3] ; [3 ; 2]] et Φ⁵ = [[8 ; 5] ; [5 ; 3]] : la case vaut F₆ = 8.'},
    {q:'c) Que vaut det(<i>Φ</i>ⁿ)&nbsp;?',opts:['1','(−1)ⁿ','n','−n'],ans:1,hint:'det Φ = 1 · 0 − 1 · 1. Puis utilise det(AB) = det A · det B.',why:'det Φ = −1, donc det(Φⁿ) = (det Φ)ⁿ = (−1)ⁿ.'},
    {q:'d) En égalant les deux expressions de det(<i>Φ</i>¹⁰), calcule <i>F</i>₁₁ · <i>F</i>₉ − <i>F</i>₁₀².',lab:'valeur :',ans:1,hint:'Φ¹⁰ = [[F₁₁ ; F₁₀] ; [F₁₀ ; F₉]] et son déterminant vaut (−1)¹⁰.',why:'F₁₁F₉ − F₁₀² = (−1)¹⁰ = 1. Contrôle : 89 · 34 − 55² = 3 026 − 3 025 = 1.'},
    {q:'e) Quel est l’inverse de <i>Φ</i>&nbsp;?',opts:[mat([[0,1],[1,-1]]),mat([[1,-1],[-1,0]]),mat([[0,-1],[-1,1]]),'Φ n’est pas inversible'],ans:0,hint:'Formule de l’inverse avec det Φ = −1.',why:'Φ⁻¹ = (1/(−1)) [[0 ; −1] ; [−1 ; 1]] = [[0 ; 1] ; [1 ; −1]]. Contrôle : Φ · Φ⁻¹ = [[0 + 1 ; 1 − 1] ; [0 ; 1]] = I.'},
   ],
   sol:'Par calcul ligne × colonne, Φ² = [[2 ; 1] ; [1 ; 1]], Φ⁴ = [[5 ; 3] ; [3 ; 2]] et Φ⁵ = [[8 ; 5] ; [5 ; 3]], conformément à Φⁿ = [[Fₙ₊₁ ; Fₙ] ; [Fₙ ; Fₙ₋₁]].<br>Comme det Φ = −1, la multiplicativité du déterminant donne <b>det(Φⁿ) = (−1)ⁿ</b>.<br>Mais le déterminant de [[Fₙ₊₁ ; Fₙ] ; [Fₙ ; Fₙ₋₁]] vaut Fₙ₊₁Fₙ₋₁ − Fₙ². On obtient l’<b>identité de Cassini</b> : <b>Fₙ₊₁Fₙ₋₁ − Fₙ² = (−1)ⁿ</b>.<br>Pour n = 10 : 89 · 34 − 55² = 1.<br>Enfin det Φ ≠ 0, donc Φ ∈ GL₂(ℝ), d’inverse [[0 ; 1] ; [1 ; −1]] : la suite se prolonge aussi vers les indices négatifs.'},
]},
);
})();
