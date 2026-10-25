/* Déclic — Algèbre linéaire, en dimension 3 */
(()=>{
/* ---------- helpers locaux ---------- */
const M=A=>mat(A.map(r=>r.map(x=>fmt(x))));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const ap=(A,x)=>A.map(r=>r.reduce((s,a,k)=>s+a*x[k],0));
const det3=A=>A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
const cr=(u,v)=>[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
const dt=(u,v)=>u.reduce((s,x,i)=>s+x*v[i],0);
const nr=u=>Math.sqrt(dt(u,u));
const add=(...a)=>a.reduce((s,u)=>s.map((x,i)=>x+u[i]));
const sc=(k,u)=>u.map(x=>k*x);
const c3=u=>`(${fmt(u[0])} ; ${fmt(u[1])} ; ${fmt(u[2])})`;
const azP={id:'az',l:'Vue (rotation)',min:0,max:90,step:15,v:30,u:'°'};
// carré de plan dans l’espace : normale n, point A, demi-côté s
function patch(S,n,A,s,q){ const h=Math.abs(n[2])<.9?[0,0,1]:[1,0,0]; let e1=cr(n,h); e1=sc(1/nr(e1),e1); let e2=cr(n,e1); e2=sc(1/nr(e2),e2);
  S.poly([add(A,sc(s,e1),sc(s,e2)),add(A,sc(-s,e1),sc(s,e2)),add(A,sc(-s,e1),sc(-s,e2)),add(A,sc(s,e1),sc(-s,e2))],Object.assign({fill:'var(--sci)',fo:.18,c:'var(--sci)',w:1.5},q)); }
// trois grilles A × B = AB, avec la ligne i de A, la colonne j de B et le coefficient (i, j) surlignés
function prodFig(A,B,i,j){
  const C=mul(A,B), cs=28;
  const g=(x0,X,hl,col,lab)=>{ let s=`<text x="${x0+42}" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="var(--muted)">${lab}</text><rect x="${x0}" y="28" width="84" height="84" rx="6" fill="none" stroke="var(--line)" stroke-width="1.5"/>`;
    X.forEach((r,a)=>r.forEach((x,b)=>{ if(hl(a,b)) s+=`<rect x="${x0+b*cs+1}" y="${28+a*cs+1}" width="${cs-2}" height="${cs-2}" rx="4" fill="${col}" fill-opacity=".3"/>`;
      s+=`<text x="${x0+b*cs+14}" y="${28+a*cs+19}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ink)">${fmt(x)}</text>`; })); return s; };
  return `<svg viewBox="0 0 320 124" width="320" role="img">`+g(8,A,(a)=>a===i,'var(--math)','A')+`<text x="104" y="76" font-size="18" font-weight="700" text-anchor="middle" fill="var(--muted)">×</text>`
    +g(116,B,(a,b)=>b===j,'var(--spark)','B')+`<text x="212" y="76" font-size="18" font-weight="700" text-anchor="middle" fill="var(--muted)">=</text>`+g(228,C,(a,b)=>a===i&&b===j,'var(--accent)','AB')+'</svg>';
}
const Rz=t=>[[Math.cos(t),-Math.sin(t),0],[Math.sin(t),Math.cos(t),0],[0,0,1]];
// rotation autour de l’axe z : vecteur u et son image
function rotFig(t,az,target){
  const S=space({az,r:3}), u=[2,0,1], w=ap(Rz(rad(t)),u), circ=[];
  for(let k=0;k<=36;k++){ const a=k*Math.PI/18; circ.push([2*Math.cos(a),2*Math.sin(a),1]); }
  S.seg([0,0,-1.2],[0,0,2.6],{c:'var(--accent)',w:2}).poly(circ,{c:'var(--muted)',w:1.2,dash:1,open:1});
  if(target) S.dot(target,{r:6,c:'var(--bad)'});
  S.arrow([0,0,0],u,{c:'var(--math)',w:3,hs:9}).arrow([0,0,0],w,{c:'var(--spark)',w:3,hs:9}).text(u,'u',{dx:6,c:'var(--math)'}).text(w,'Ru',{dx:6,dy:-4,c:'var(--spark)'});
  return S.svg();
}
// parallélépipède construit sur u, v, w
function para(u,v,w,az,r=5){
  const S=space({az,r}), O=[0,0,0], base=[O,u,add(u,v),v], top=base.map(p=>add(p,w));
  S.poly(base,{fill:'var(--sci)',fo:.2,c:'var(--sci)',w:1.5}).poly(top,{fill:'var(--accent)',fo:.12,c:'var(--accent)',w:1.5}); base.forEach((p,i)=>S.seg(p,top[i],{c:'var(--muted)',w:1.5}));
  S.arrow(O,u,{c:'var(--math)',w:3,hs:8}).arrow(O,v,{c:'var(--math)',w:3,hs:8}).arrow(O,w,{c:'var(--spark)',w:3,hs:8});
  S.text(u,'u',{dx:4,dy:14,c:'var(--math)'}).text(v,'v',{dx:6,c:'var(--math)'}).text(w,'w',{dx:6,c:'var(--spark)'}); return S.svg();
}
// règle de Sarrus
const sarrus=(()=>{ const L=[['a','b','c'],['d','e','f'],['g','h','i']], X=k=>40+k*50, Y=r=>40+r*40;
  let s=`<svg viewBox="0 0 320 200" width="320" role="img">`;
  for(let k=0;k<3;k++){ s+=`<line x1="${X(k)}" y1="${Y(0)}" x2="${X(k+2)}" y2="${Y(2)}" stroke="var(--ok)" stroke-width="3" opacity=".55" stroke-linecap="round"/>`;
    s+=`<line x1="${X(k)+4}" y1="${Y(2)}" x2="${X(k+2)+4}" y2="${Y(0)}" stroke="var(--bad)" stroke-width="3" opacity=".55" stroke-linecap="round" stroke-dasharray="7 5"/>`; }
  s+=`<line x1="165" y1="18" x2="165" y2="142" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 4"/>`;
  for(let r=0;r<3;r++) for(let k=0;k<5;k++) s+=`<text x="${X(k)}" y="${Y(r)+5}" font-size="16" font-style="italic" font-weight="700" text-anchor="middle" fill="${k>2?'var(--muted)':'var(--ink)'}" paint-order="stroke" stroke="var(--surface)" stroke-width="4">${L[r][k%3]}</text>`;
  s+=`<text x="140" y="166" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ok)">+ aei + bfg + cdh</text><text x="140" y="188" font-size="13" font-weight="700" text-anchor="middle" fill="var(--bad)">− ceg − afh − bdi</text>`;
  return s+'</svg>'; })();
// direction de l’espace : azimut p, élévation t (en degrés)
const dirv=(p,t)=>[Math.cos(rad(t))*Math.cos(rad(p)),Math.cos(rad(t))*Math.sin(rad(p)),Math.sin(rad(t))];
const AP=[[2,1,0],[1,2,0],[0,0,3]];
function propFig(v){ const d=dirv(v.p,v.t), Ad=ap(AP,d), S=space({az:50,r:4});
  S.arrow([0,0,0],sc(1.25,Ad),{c:'var(--spark)',w:5,hs:10,op:.8}).arrow([0,0,0],sc(1.25,d),{c:'var(--math)',w:3,hs:9}); return S.svg(); }
const propInfo=v=>{ const d=dirv(v.p,v.t), Ad=ap(AP,d); return nr(cr(d,Ad))<1e-9?`<b>Direction propre</b> : Av = ${fmt(dt(Ad,d))}·v`:`Av = ${c3(Ad)} n’est pas aligné avec v = ${c3(d)}`; };

const A1=[[1,2,0],[-1,3,1],[2,0,4]], B1=[[2,1,-1],[0,1,3],[1,-2,1]];

COURS.push(
/* ===================== 1. MATRICES 3 × 3 ===================== */
{subj:'al',sem:'esp',id:'al3-matrices',h:'Matrices 3 × 3',p:'Calcul matriciel en dimension 3 : produit, transposée, matrices diagonales et triangulaires, rotations et projections de l’espace.',steps:[
  {h:'Le tableau 3 × 3',p:`Une matrice 3 × 3 a 3 lignes et 3 colonnes ; <i>a</i><sub>ij</sub> est sur la ligne <i>i</i> et la colonne <i>j</i>. Comme en dimension 2, on additionne <b>terme à terme</b> et λ<i>A</i> multiplie chaque coefficient par λ.<br>${M([[1,0,2],[-1,3,1],[0,4,-2]])} + ${M([[2,1,0],[1,-1,1],[3,0,1]])} = ${M([[3,1,2],[0,2,2],[3,4,-1]])}.<br>La matrice <b>identité</b> <i>I</i>₃ a des 1 sur la diagonale et des 0 ailleurs.`,
   note:'Les colonnes d’une matrice 3 × 3 sont les images de e₁ = (1 ; 0 ; 0), e₂ et e₃ par l’application linéaire associée. C’est la clé pour écrire la matrice d’une transformation.'},
  {h:'Le produit, ligne par colonne',p:`Le coefficient (<i>i</i>, <i>j</i>) de <i>AB</i> est la ligne <i>i</i> de <i>A</i> fois la colonne <i>j</i> de <i>B</i> :<br><b>(<i>AB</i>)<sub>ij</sub> = <i>a</i><sub>i1</sub><i>b</i><sub>1j</sub> + <i>a</i><sub>i2</sub><i>b</i><sub>2j</sub> + <i>a</i><sub>i3</sub><i>b</i><sub>3j</sub></b>.<br>Choisis la ligne et la colonne.`,
   params:[{id:'i',l:'ligne i',min:1,max:3,v:1},{id:'j',l:'colonne j',min:1,max:3,v:1}],
   draw:v=>prodFig(A1,B1,v.i-1,v.j-1),
   info:v=>{ const r=A1[v.i-1], c=B1.map(x=>x[v.j-1]); return `(AB)<sub>${v.i}${v.j}</sub> = ${r.map((x,k)=>`${fmt(x)}·${c[k]<0?'('+fmt(c[k])+')':fmt(c[k])}`).join(' + ')} = <b>${fmt(dt(r,c))}</b>`; },
   note:'Comme en dimension 2, AB ≠ BA en général. Il faut 27 multiplications pour un produit complet : organise-toi ligne par ligne.'},
  {kind:'Méthode',h:'Poser un produit 3 × 3',
   p:'<b>Comment :</b> on calcule le résultat <b>ligne par ligne</b> : on fixe la ligne <i>i</i> de <i>A</i>, puis on la multiplie successivement par les trois colonnes de <i>B</i>. Chaque coefficient est une somme de 3 produits. Repère les 0 avant de commencer : chacun supprime un produit. <b>Contrôle :</b> recalcule une case au hasard, ou vérifie sur un vecteur, car (<i>AB</i>)<b>x</b> = <i>A</i>(<i>B</i><b>x</b>).',
   demo:{enonce:`Calcule <i>AB</i> avec <i>A</i> = ${M([[1,0,2],[0,1,-1],[3,1,0]])} et <i>B</i> = ${M([[1,1,0],[0,2,1],[1,0,1]])}.`,
    etapes:[{f:'Ligne 1 de <i>A</i>, (1 0 2) : 1·1 + 2·1 = 3 ; 1·1 + 2·0 = 1 ; 1·0 + 2·1 = 2.',w:'Le 0 du milieu supprime le 2e produit dans chaque case.'},
     {f:'Ligne 2, (0 1 −1) : 0 − 1 = −1 ; 2 − 0 = 2 ; 1 − 1 = 0.',w:'Même ligne, trois colonnes.'},
     {f:'Ligne 3, (3 1 0) : 3 + 0 = 3 ; 3 + 2 = 5 ; 0 + 1 = 1.',w:'Le dernier coefficient nul supprime la 3e ligne de B.'},
     {f:`<i>AB</i> = ${M([[3,1,2],[-1,2,0],[3,5,1]])}`,w:'On assemble.'}],
    conclusion:`<b>AB = ${M([[3,1,2],[-1,2,0],[3,5,1]])}</b>. Contrôle sur e₁ : <i>B</i>e₁ = (1 ; 0 ; 1) et <i>A</i>(1 ; 0 ; 1) = (3 ; −1 ; 3), qui est bien la 1re colonne.`}},
  {h:'Un coefficient de BA',p:`Avec les mêmes matrices <i>A</i> = ${M(A1)} et <i>B</i> = ${M(B1)}, calcule le coefficient ligne 2, colonne 3 de <i>BA</i> (attention à l’ordre).`,lab:'(BA)₂₃ =',ans:13,
   why:'Ligne 2 de B fois colonne 3 de A : 0·0 + 1·1 + 3·4 = 13. Alors que (AB)₂₃ = 11 : le produit ne commute pas.'},
  {h:'Transposée, diagonales, triangulaires',p:`La <b>transposée</b> ᵗ<i>A</i> échange lignes et colonnes, et ᵗ(<i>AB</i>) = ᵗ<i>B</i> ᵗ<i>A</i>. <i>A</i> est <b>symétrique</b> si ᵗ<i>A</i> = <i>A</i>.<br>Une matrice <b>diagonale</b> diag(<i>a</i>, <i>b</i>, <i>c</i>) n’a que des coefficients diagonaux, et <b>diag(<i>a</i>, <i>b</i>, <i>c</i>)ⁿ = diag(<i>a</i>ⁿ, <i>b</i>ⁿ, <i>c</i>ⁿ)</b>. Une matrice <b>triangulaire supérieure</b> n’a que des 0 sous la diagonale : le produit de deux d’entre elles l’est encore, et sa diagonale est le produit des diagonales.`,
   fig:`<div style="display:flex;gap:18px;justify-content:center;align-items:center;flex-wrap:wrap">${M([[2,0,0],[0,-1,0],[0,0,3]])}${mat([['<i>a</i>','<i>b</i>','<i>c</i>'],['0','<i>d</i>','<i>e</i>'],['0','0','<i>f</i>']])}${mat([[1,4,5],[4,2,6],[5,6,3]])}</div>`,
   note:'De gauche à droite : diagonale, triangulaire supérieure, symétrique. Une matrice diagonale est à la fois triangulaire et symétrique.'},
  {h:'Puissance d’une diagonale',p:`Soit <i>D</i> = diag(2, −1, 3). Que vaut <i>D</i>³&nbsp;?`,
   opts:['diag(6, −3, 9)','diag(8, 1, 27)','diag(8, −1, 27)',M([[8,1,0],[0,-1,1],[0,0,27]])],ans:2,
   why:'On élève chaque coefficient diagonal au cube : 2³ = 8, (−1)³ = −1, 3³ = 27. Multiplier par 3 donnerait 3D, pas D³.'},
  {h:'Rotation autour d’un axe',p:`La rotation d’angle θ autour de l’axe (O<i>z</i>) laisse <i>z</i> inchangé et tourne le plan (<i>x</i>, <i>y</i>) :<br><b><i>R</i> = ${mat([['cos θ','−sin θ','0'],['sin θ','cos θ','0'],['0','0','1']])}</b>.<br>Ses colonnes sont les images de e₁, e₂, e₃. Ici <b>u</b> = (2 ; 0 ; 1) en bleu et <i>R</i><b>u</b> en jaune.`,
   params:[{id:'t',l:'θ',min:0,max:345,step:15,v:60,u:'°'},azP],
   draw:v=>rotFig(v.t,v.az),
   info:v=>{ const R=Rz(rad(v.t)); return `${M(R)} &nbsp; Ru = ${c3(ap(R,[2,0,1]))}`; },
   note:'Autour de (Ox), c’est la 1re coordonnée qui reste fixe : R = (1 0 0 ; 0 cos θ −sin θ ; 0 sin θ cos θ).'},
  {h:'Vise la cible',p:'Règle θ pour que la rotation autour de (O<i>z</i>) envoie <b>u</b> = (2 ; 0 ; 1) sur le point rouge (0 ; −2 ; 1).',
   params:[{id:'t',l:'θ',min:0,max:345,step:15,v:30,u:'°'},azP],
   draw:v=>rotFig(v.t,v.az,[0,-2,1]),
   info:v=>`Ru = ${c3(ap(Rz(rad(v.t)),[2,0,1]))}`,
   ok:v=>v.t===270,why:'Ru = (2 cos θ ; 2 sin θ ; 1). Il faut cos θ = 0 et sin θ = −1, soit θ = 270° (ou −90°).'},
  {kind:'Méthode',h:'Écrire la matrice d’une transformation de l’espace',
   p:'<b>Principe :</b> comme en dimension 2, les colonnes de la matrice sont les images <i>f</i>(e₁), <i>f</i>(e₂) et <i>f</i>(e₃). <b>Comment :</b> pour chaque vecteur de base, cherche son image géométriquement (rotation, symétrie, projection…), écris-la en colonne, puis contrôle sur un vecteur dont tu connais l’image : un vecteur de l’axe, du plan fixe, etc.',
   demo:{enonce:'Matrice de la rotation d’angle 90° autour de (O<i>x</i>), dans le sens qui envoie e₂ sur e₃.',
    etapes:[{f:'<i>f</i>(e₁) = e₁ = (1 ; 0 ; 0).',w:'e₁ est sur l’axe : il ne bouge pas.'},
     {f:'<i>f</i>(e₂) = e₃ = (0 ; 0 ; 1).',w:'C’est le sens de rotation choisi.'},
     {f:'<i>f</i>(e₃) = −e₂ = (0 ; −1 ; 0).',w:'Dans le plan (y, z), un quart de tour envoie le 2e axe sur −(1er axe), comme e₂ ↦ −e₁ pour la rotation de 90° du plan.'},
     {f:`Matrice : ${M([[1,0,0],[0,0,-1],[0,1,0]])}`,w:'Les trois images en colonnes. On retrouve (1 0 0 ; 0 cos θ −sin θ ; 0 sin θ cos θ) avec θ = 90°.'}],
    conclusion:'Contrôle : le vecteur (0 ; 1 ; 1) devient (0 ; −1 ; 1), de même longueur et perpendiculaire à lui.'}},
  {h:'Matrice à partir des images',p:'L’application linéaire <i>f</i> vérifie <i>f</i>(e₁) = e₂, <i>f</i>(e₂) = e₁ + e₃ et <i>f</i>(e₃) = <b>0</b>. Quelle est sa matrice&nbsp;?',
   opts:[mat([[0,1,0],[1,0,1],[0,0,0]]),mat([[0,1,0],[1,0,0],[0,1,0]]),mat([[1,0,0],[0,1,0],[0,0,0]]),mat([[0,1,0],[1,0,0],[0,0,1]])],ans:1,
   why:'Les colonnes sont f(e₁) = (0 ; 1 ; 0), f(e₂) = (1 ; 0 ; 1) et f(e₃) = (0 ; 0 ; 0). La 1re option range les images en lignes : c’est la transposée.'},
  {h:'Projection sur un plan',p:`La <b>projection orthogonale</b> sur le plan <i>z</i> = 0 garde <i>x</i> et <i>y</i> et annule <i>z</i> : sa matrice est <b>diag(1, 1, 0)</b>. Plus généralement, la projection orthogonale sur le plan de normale <b>n</b> est <b><i>p</i>(<b>w</b>) = <b>w</b> − ${F('<b>w</b> · <b>n</b>','<b>n</b> · <b>n</b>')} <b>n</b></b>. Toute projection vérifie <i>p</i> ∘ <i>p</i> = <i>p</i>, soit <i>P</i>² = <i>P</i>.`,
   fig:(()=>{ const S=space({az:35}), m=[2,1,3], h=[2,1,0]; patch(S,[0,0,1],[0,0,0],2.6); S.seg(m,h,{c:'var(--muted)',w:1.5,dash:1}).arrow([0,0,0],m,{c:'var(--math)',w:3,hs:9}).arrow([0,0,0],h,{c:'var(--spark)',w:3,hs:9}).text(m,'w',{dx:6}).text(h,'p(w)',{dx:6,dy:14}); return S.svg(); })(),
   note:'Une projection n’est pas inversible (sauf l’identité) : elle écrase la direction de n sur 0, donc det P = 0.'},
  {kind:'Méthode',h:'Projeter orthogonalement sur un plan',
   p:'<b>Quand :</b> on cherche le projeté de <b>w</b> sur le plan <i>ax</i> + <i>by</i> + <i>cz</i> = 0. <b>Comment :</b> 1) lis la normale <b>n</b> = (<i>a</i> ; <i>b</i> ; <i>c</i>) dans l’équation ; 2) calcule les produits scalaires <b>w</b> · <b>n</b> et <b>n</b> · <b>n</b>, avec (<i>x</i> ; <i>y</i> ; <i>z</i>) · (<i>x</i>′ ; <i>y</i>′ ; <i>z</i>′) = <i>xx</i>′ + <i>yy</i>′ + <i>zz</i>′ ; 3) <i>p</i>(<b>w</b>) = <b>w</b> − (<b>w</b> · <b>n</b>)/(<b>n</b> · <b>n</b>) <b>n</b> ; 4) contrôle : <i>p</i>(<b>w</b>) vérifie l’équation du plan. <b>Pourquoi :</b> on retire à <b>w</b> sa composante le long de <b>n</b> ; ce qui reste est perpendiculaire à <b>n</b>, donc dans le plan. Pour la <b>matrice</b> de <i>p</i>, on projette e₁, e₂ et e₃, et on range les résultats en colonnes.',
   demo:{enonce:'Projeté orthogonal de <b>w</b> = (1 ; 2 ; 3) sur le plan <i>x</i> − <i>y</i> + <i>z</i> = 0.',
    etapes:[{f:'<b>n</b> = (1 ; −1 ; 1).',w:'Les coefficients de l’équation.'},
     {f:'<b>w</b> · <b>n</b> = 1 − 2 + 3 = 2 et <b>n</b> · <b>n</b> = 1 + 1 + 1 = 3.',w:'Deux produits scalaires.'},
     {f:`<i>p</i>(<b>w</b>) = (1 ; 2 ; 3) − ${F(2,3)}(1 ; −1 ; 1) = (${F(1,3)} ; ${F(8,3)} ; ${F(7,3)}).`,w:'On retire les 2/3 de n.'},
     {f:`Contrôle : ${F(1,3)} − ${F(8,3)} + ${F(7,3)} = 0.`,w:'Le projeté est bien dans le plan.'}],
    conclusion:'<b>p(w) = (1/3 ; 8/3 ; 7/3)</b>, et w − p(w) = (2/3)(1 ; −1 ; 1) est bien parallèle à n.'}},
  {h:'Projeter sur x + y + z = 0',p:'Le plan <i>x</i> + <i>y</i> + <i>z</i> = 0 a pour normale <b>n</b> = (1 ; 1 ; 1). Quelle est la <b>troisième</b> coordonnée du projeté orthogonal de <b>w</b> = (3 ; 0 ; 0) sur ce plan&nbsp;?',lab:'3e coordonnée =',ans:-1,
   why:'w · n = 3 et n · n = 3, donc p(w) = (3 ; 0 ; 0) − 1·(1 ; 1 ; 1) = (2 ; −1 ; −1). Contrôle : 2 − 1 − 1 = 0, le point est bien dans le plan.'},
  {kind:'Défi',h:'Deux rotations enchaînées',p:`<i>R<sub>z</sub></i> est la rotation de 90° autour de (O<i>z</i>) et <i>R<sub>x</sub></i> celle de 90° autour de (O<i>x</i>). Que vaut <i>R<sub>x</sub>R<sub>z</sub></i>e₁&nbsp;?`,
   opts:['(0 ; 1 ; 0)','(1 ; 0 ; 0)','(0 ; 0 ; −1)','(0 ; 0 ; 1)'],ans:3,
   why:'On applique R<sub>z</sub> d’abord : e₁ devient e₂. Puis R<sub>x</sub> envoie e₂ sur e₃ = (0 ; 0 ; 1). Dans l’autre ordre, R<sub>z</sub>R<sub>x</sub>e₁ = R<sub>z</sub>e₁ = e₂ : les rotations de l’espace ne commutent pas.'},
  {kind:'Méthode',h:'Puissances de I + N quand N est nilpotente',
   p:`<b>Quand :</b> <i>A</i> = <i>I</i> + <i>N</i>, ou λ<i>I</i> + <i>N</i>, où <i>N</i> est triangulaire avec des 0 sur la diagonale. En dimension 3, on a alors <i>N</i>³ = 0 : on dit que <i>N</i> est <b>nilpotente</b>. <b>Pourquoi :</b> <i>I</i> commute avec <i>N</i>, donc la formule du binôme s’applique, et elle s’arrête : <b>(<i>I</i> + <i>N</i>)ⁿ = <i>I</i> + <i>nN</i> + ${F('<i>n</i>(<i>n</i> − 1)','2')}<i>N</i>²</b>. <b>Comment :</b> calcule <i>N</i>², vérifie <i>N</i>³ = 0, puis assemble avec les coefficients du binôme <i>n</i> et <i>n</i>(<i>n</i> − 1)/2.`,
   demo:{enonce:`Calcule <i>A</i>⁴ pour <i>A</i> = ${mat([[1,1,0],[0,1,1],[0,0,1]])}.`,
    etapes:[{f:`<i>A</i> = <i>I</i> + <i>N</i> avec <i>N</i> = ${mat([[0,1,0],[0,0,1],[0,0,0]])}.`,w:'On sépare la diagonale du reste.'},
     {f:`<i>N</i>² = ${mat([[0,0,1],[0,0,0],[0,0,0]])} et <i>N</i>³ = 0.`,w:'Chaque puissance pousse les coefficients d’un cran vers le coin en haut à droite.'},
     {f:'<i>A</i>⁴ = <i>I</i> + 4<i>N</i> + 6<i>N</i>².',w:'Les coefficients du binôme pour n = 4 sont 4 et 4·3/2 = 6 ; les termes en N³ et N⁴ sont nuls.'},
     {f:`<i>A</i>⁴ = ${mat([[1,4,6],[0,1,4],[0,0,1]])}`,w:'On assemble. Contrôle : A² = (1 2 1 ; 0 1 2 ; 0 0 1), puis (A²)² donne la même matrice.'}],
    conclusion:'<b>A⁴ = (1 4 6 ; 0 1 4 ; 0 0 1)</b>. Sans N³ = 0, il faudrait garder tous les termes du binôme.'}},
  {h:'Une puissance sixième',p:`Avec <i>A</i> = ${mat([[1,1,0],[0,1,1],[0,0,1]])}, quel est le coefficient en haut à droite de <i>A</i>⁶&nbsp;?`,lab:'coefficient =',ans:15,
   why:'A⁶ = I + 6N + 15N², car 6·5/2 = 15. Seul N² a un coefficient en haut à droite : 15. En entier, A⁶ = (1 6 15 ; 0 1 6 ; 0 0 1).'},
  {kind:'Problème',h:'Une matrice nilpotente',
   p:`Soit <i>N</i> = ${mat([[0,1,2],[0,0,3],[0,0,0]])}, triangulaire supérieure avec des 0 sur la diagonale, et <i>A</i> = <i>I</i> + <i>N</i>. On veut calculer les puissances de <i>A</i> et son inverse sans gros calcul. L’idée : <i>I</i> et <i>N</i> commutent, donc la formule du binôme s’applique, et les puissances de <i>N</i> finissent par s’annuler.`,
   parts:[
    {q:'a) Calcule <i>N</i>². Quel est son coefficient en haut à droite&nbsp;?',lab:'coefficient =',ans:3,hint:'Ligne 1 de N fois colonne 3 de N.',why:'0·2 + 1·3 + 2·0 = 3. Tous les autres coefficients de N² sont nuls : N² = (0 0 3 ; 0 0 0 ; 0 0 0).'},
    {q:'b) Que vaut <i>N</i>³&nbsp;?',opts:['N','La matrice nulle','I','N²'],ans:1,hint:'N³ = N²·N. Regarde où se trouve le seul coefficient non nul de N².',why:'La ligne 1 de N² est (0 0 3) et la colonne j de N a un 0 en 3e position : N³ = 0. On dit que N est nilpotente.'},
    {q:'c) Avec <i>A</i>⁵ = <i>I</i> + 5<i>N</i> + 10<i>N</i>², quel est le coefficient en haut à droite de <i>A</i>⁵&nbsp;?',lab:'coefficient =',ans:40,hint:'Binôme : (I + N)⁵ = I + 5N + 10N² + 10N³ + …, et N³ = 0.',why:'0 + 5·2 + 10·3 = 40. En entier, A⁵ = (1 5 40 ; 0 1 15 ; 0 0 1).'},
    {q:'d) On vérifie que (<i>I</i> + <i>N</i>)(<i>I</i> − <i>N</i> + <i>N</i>²) = <i>I</i> + <i>N</i>³ = <i>I</i>. Quel est le coefficient en haut à droite de <i>A</i>⁻¹&nbsp;?',lab:'coefficient =',ans:1,hint:'A⁻¹ = I − N + N² : additionne les coefficients en haut à droite.',why:'0 − 2 + 3 = 1. A⁻¹ = (1 −1 1 ; 0 1 −3 ; 0 0 1). Contrôle : la 1re ligne de A fois la 3e colonne donne 1·1 + 1·(−3) + 2·1 = 0.'},
   ],
   sol:'N² = (0 0 3 ; 0 0 0 ; 0 0 0) et N³ = 0 : chaque produit pousse les coefficients d’un cran vers le coin en haut à droite.<br>Comme IN = NI, le binôme s’applique : Aⁿ = I + nN + (n(n − 1)/2)N², les termes suivants étant nuls.<br>Pour n = 5 : A⁵ = I + 5N + 10N² = <b>(1 5 40 ; 0 1 15 ; 0 0 1)</b>.<br>Comme (I + N)(I − N + N²) = I + N³ = I, on a <b>A⁻¹ = I − N + N² = (1 −1 1 ; 0 1 −3 ; 0 0 1)</b>.<br>C’est la même idée que 1/(1 + x) = 1 − x + x² − …, qui s’arrête ici car N³ = 0.'},
  {kind:'Problème',h:'La rotation qui permute les axes',
   p:`Soit <i>C</i> = ${mat([[0,0,1],[1,0,0],[0,1,0]])}. Ses colonnes montrent que <i>C</i>e₁ = e₂, <i>C</i>e₂ = e₃ et <i>C</i>e₃ = e₁ : elle fait tourner les trois axes. On veut montrer que c’est une rotation, trouver son axe et son angle. On admet que la trace d’une rotation d’angle θ vaut 1 + 2 cos θ (on le démontrera au chapitre sur les valeurs propres).`,
   fig:(()=>{ const S=space({az:30}), e=[[2.5,0,0],[0,2.5,0],[0,0,2.5]], l=(a,b,t)=>add(a,sc(t,add(b,sc(-1,a)))); S.seg([-1.2,-1.2,-1.2],[2.4,2.4,2.4],{c:'var(--accent)',w:2.5}).poly(e,{fill:'var(--sci)',fo:.15,c:'var(--sci)',w:1.5});
     [0,1,2].forEach(k=>S.arrow(l(e[k],e[(k+1)%3],.12),l(e[k],e[(k+1)%3],.8),{c:'var(--spark)',w:2.5,hs:9})); S.dot(e[0],{r:4,l:'e₁',dx:-22}).dot(e[1],{r:4,l:'e₂'}).dot(e[2],{r:4,l:'e₃'}).text([2.4,2.4,2.4],'axe',{dx:6,c:'var(--accent)'}); return S.svg(); })(),
   parts:[
    {q:'a) Quelle est la première coordonnée de <i>C</i>(1 ; 2 ; 3)&nbsp;?',lab:'1re coordonnée =',ans:3,hint:'Ligne 1 de C fois (1 ; 2 ; 3).',why:'C(x ; y ; z) = (z ; x ; y), donc C(1 ; 2 ; 3) = (3 ; 1 ; 2).'},
    {q:'b) Quel vecteur est fixé par <i>C</i> et dirige donc l’axe&nbsp;?',opts:['(1 ; 0 ; 0)','(1 ; −1 ; 0)','(1 ; 1 ; 1)','(1 ; 2 ; 3)'],ans:2,hint:'(z ; x ; y) = (x ; y ; z) impose quoi ?',why:'z = x, x = y et y = z : les trois coordonnées sont égales. L’axe est la droite dirigée par (1 ; 1 ; 1).'},
    {q:'c) Quel est le plus petit entier <i>n</i> ≥ 1 tel que <i>C</i>ⁿ = <i>I</i>&nbsp;?',lab:'n =',ans:3,hint:'Suis e₁ : e₁ → e₂ → e₃ → …',why:'Après trois applications, chaque axe revient à sa place : C³ = I, alors que C et C² ≠ I. Un tour complet en 3 pas : l’angle vaut 360°/3.'},
    {q:'d) Avec tr <i>C</i> = 1 + 2 cos θ, quel est l’angle θ de la rotation (entre 0° et 180°)&nbsp;?',lab:'θ =',unit:'°',ans:120,hint:'La diagonale de C ne contient que des 0.',why:'tr C = 0, donc cos θ = −1/2 et θ = 120°, cohérent avec C³ = I.'},
   ],
   sol:'C(x ; y ; z) = (z ; x ; y). Les colonnes e₂, e₃, e₁ sont orthonormées et det C = 1 : C est une rotation.<br>Les vecteurs fixes vérifient x = y = z : <b>l’axe est dirigé par (1 ; 1 ; 1)</b>.<br>C permute circulairement e₁ → e₂ → e₃ → e₁, donc C³ = I : trois applications font un tour.<br>tr C = 0 = 1 + 2 cos θ donne cos θ = −1/2, <b>θ = 120°</b>.<br>Le triangle (e₁, e₂, e₃) est équilatéral, centré sur l’axe : la rotation le fait tourner d’un tiers de tour.'},
]},

/* ===================== 2. DÉTERMINANT 3 × 3 ===================== */
{subj:'al',sem:'esp',id:'al3-determinant',h:'Déterminant 3 × 3',p:'Règle de Sarrus, développement par cofacteurs, volume, opérations sur les lignes et inverse par la comatrice.',steps:[
  {h:'La règle de Sarrus',p:`Pour <i>A</i> = ${mat([['<i>a</i>','<i>b</i>','<i>c</i>'],['<i>d</i>','<i>e</i>','<i>f</i>'],['<i>g</i>','<i>h</i>','<i>i</i>']])}, on recopie les deux premières colonnes à droite. Les trois diagonales descendantes comptent en +, les trois montantes en − :<br><b>det <i>A</i> = <i>aei</i> + <i>bfg</i> + <i>cdh</i> − <i>ceg</i> − <i>afh</i> − <i>bdi</i></b>.`,
   fig:sarrus,
   note:'<b>Piège :</b> Sarrus ne marche qu’en dimension 3. Pour une matrice 4 × 4, il faut développer par cofacteurs.'},
  {kind:'Méthode',h:'Calculer un déterminant avec Sarrus',
   p:'<b>Quand :</b> une matrice 3 × 3 sans 0 bien placés (sinon, préfère les cofacteurs). <b>Comment :</b> recopie les colonnes 1 et 2 à droite ; additionne les trois produits des diagonales descendantes, puis retranche les trois produits des diagonales montantes. Écris chaque produit séparément avec son signe : la plupart des erreurs viennent des signes moins.',
   demo:{enonce:`Calcule det ${M([[1,2,-1],[3,0,2],[-2,1,4]])}.`,
    etapes:[{f:'Descendantes : 1·0·4 + 2·2·(−2) + (−1)·3·1 = 0 − 8 − 3 = −11.',w:'Ce sont aei + bfg + cdh.'},
     {f:'Montantes : (−1)·0·(−2) + 1·2·1 + 2·3·4 = 0 + 2 + 24 = 26.',w:'Ce sont ceg + afh + bdi, qu’on va retrancher.'},
     {f:'det = −11 − 26 = −37.',w:'On retranche les montantes d’un bloc.'}],
    conclusion:'<b>det = −37</b>. Contrôle possible en développant selon la 2e ligne, qui contient un 0 : 3·(−9) + 2·(−5) = −37.'}},
  {h:'Calcule avec Sarrus',p:`Calcule le déterminant de ${mat([[2,1,0],[1,3,1],[0,1,2]])}.`,lab:'det =',ans:8,
   why:'Descendantes : 2·3·2 + 1·1·0 + 0·1·1 = 12. Montantes : 0·3·0 + 2·1·1 + 1·1·2 = 4. det = 12 − 4 = 8.'},
  {h:'Développer selon une ligne',p:`Le <b>cofacteur</b> <i>C</i><sub>ij</sub> vaut (−1)<sup>i+j</sup> fois le déterminant 2 × 2 obtenu en barrant la ligne <i>i</i> et la colonne <i>j</i>. On peut développer selon n’importe quelle ligne ou colonne :<br><b>det <i>A</i> = <i>a</i><sub>11</sub><i>C</i><sub>11</sub> + <i>a</i><sub>12</sub><i>C</i><sub>12</sub> + <i>a</i><sub>13</sub><i>C</i><sub>13</sub></b>.<br>Les signes suivent le damier ${mat([['+','−','+'],['−','+','−'],['+','−','+']])}.`,
   note:'Choisis la ligne ou la colonne qui contient le plus de 0 : chaque 0 supprime un déterminant 2 × 2.'},
  {kind:'Méthode',h:'Développer par cofacteurs avec le bon choix de ligne',
   p:'<b>Comment :</b> 1) cherche la ligne ou la colonne qui a le <b>plus de 0</b> ; 2) pour chaque coefficient non nul <i>a</i><sub>ij</sub>, barre sa ligne et sa colonne, calcule le déterminant 2 × 2 qui reste, et affecte le signe du damier (−1)<sup>i+j</sup> ; 3) additionne les produits <i>a</i><sub>ij</sub><i>C</i><sub>ij</sub>. <b>Pourquoi on peut choisir :</b> le développement donne le même résultat selon n’importe quelle ligne ou colonne. Autant prendre celle qui annule le plus de termes.',
   demo:{enonce:`Calcule det ${M([[2,0,1],[3,0,-1],[4,5,2]])}.`,
    etapes:[{f:'La colonne 2 contient deux 0 : on développe selon elle.',w:'Un seul déterminant 2 × 2 à calculer au lieu de trois.'},
     {f:'Seul <i>a</i>₃₂ = 5 compte. Son signe : (−1)³⁺² = −1.',w:'Dans le damier + − + / − + − / + − +, la case (3, 2) porte un −.'},
     {f:'En barrant la ligne 3 et la colonne 2, il reste det(2 1 ; 3 −1) = −2 − 3 = −5.',w:'C’est le mineur.'},
     {f:'det = 5·(−1)·(−5) = 25.',w:'Coefficient × signe × mineur.'}],
    conclusion:'<b>det = 25</b>, avec un seul petit calcul.'}},
  {h:'Développe selon la 1re colonne',p:`Calcule le déterminant de ${mat([[1,2,3],[0,4,5],[1,0,6]])} en développant selon la première colonne.`,lab:'det =',ans:22,
   why:'1·det(4 5 ; 0 6) − 0·(…) + 1·det(2 3 ; 4 5) = 1·24 + 1·(10 − 12) = 24 − 2 = 22.'},
  {h:'Volume et produit mixte',p:`det(<b>u</b>, <b>v</b>, <b>w</b>), le déterminant des trois vecteurs en colonnes, est le <b>produit mixte</b> (<b>u</b> × <b>v</b>) · <b>w</b>. Sa valeur absolue est le <b>volume du parallélépipède</b> construit sur eux. Ici <b>u</b> = (2 ; 0 ; 0), <b>v</b> = (0 ; 2 ; 0) et <b>w</b> = (<i>a</i> ; 1 ; <i>h</i>).`,
   params:[{id:'h',l:'cote h de w',min:-2,max:3,step:.5,v:1.5},{id:'a',l:'abscisse a de w',min:-1,max:2,step:.5,v:0}],
   draw:v=>para([2,0,0],[0,2,0],[v.a,1,v.h],30,3.6),
   info:v=>`det(u, v, w) = 2·2·${fmt(v.h)} = <b>${fmt(4*v.h)}</b> · volume ${fmt(Math.abs(4*v.h))}${v.h===0?' (vecteurs coplanaires)':''}${v.h<0?' · orientation inversée':''}`,
   note:'Faire varier a incline la boîte sans changer son volume : seule la hauteur compte. Le signe du déterminant dit si (u, v, w) est direct.'},
  {kind:'Méthode',h:'Tester si trois vecteurs sont indépendants',
   p:'<b>Quand :</b> pour savoir si (<b>u</b>, <b>v</b>, <b>w</b>) est une base de ℝ³, si trois vecteurs sont coplanaires, ou si quatre points sont dans un même plan. <b>Comment :</b> range les trois vecteurs en <b>colonnes</b> et calcule le déterminant. S’il est non nul, la famille est <b>libre</b> : c’est une base de ℝ³. S’il est nul, les vecteurs sont <b>coplanaires</b> (famille liée), et on peut chercher la relation <b>w</b> = α<b>u</b> + β<b>v</b>. <b>Pourquoi :</b> le déterminant est le volume du parallélépipède, qui s’aplatit exactement quand les vecteurs sont dans un même plan.',
   demo:{enonce:'<b>u</b> = (1 ; 2 ; 3), <b>v</b> = (0 ; 1 ; 1) et <b>w</b> = (2 ; 3 ; 5) forment-ils une base de ℝ³&nbsp;?',
    etapes:[{f:`On calcule det ${mat([[1,0,2],[2,1,3],[3,1,5]])} en développant selon la ligne 1, qui contient un 0.`,w:'Les vecteurs sont rangés en colonnes.'},
     {f:'1·(1·5 − 3·1) − 0 + 2·(2·1 − 1·3) = 2 − 2 = 0.',w:'Signes du damier + − + sur la 1re ligne.'},
     {f:'Les vecteurs sont coplanaires. On cherche <b>w</b> = α<b>u</b> + β<b>v</b> : la 1re coordonnée donne α = 2, la 2e 2α + β = 3, donc β = −1.',w:'Le déterminant nul garantit qu’une telle relation existe.'},
     {f:'Contrôle sur la 3e coordonnée : 3·2 + 1·(−1) = 5.',w:'La relation w = 2u − v est vérifiée.'}],
    conclusion:'det = 0 : <b>ce n’est pas une base</b>, car w = 2u − v est dans le plan de u et v.'}},
  {h:'Rends-les coplanaires',p:'Les vecteurs <b>u</b> = (1 ; 0 ; 1), <b>v</b> = (0 ; 1 ; 1) et <b>w</b> = (1 ; 1 ; <i>c</i>) sont coplanaires quand le parallélépipède s’aplatit. Règle <i>c</i>.',
   params:[{id:'c',l:'c',min:-2,max:4,step:.5,v:0},azP],
   draw:v=>para([1.6,0,1.6],[0,1.6,1.6],[1.6,1.6,1.6*v.c],v.az),
   info:v=>`det(u, v, w) = <b>${fmt(v.c-2)}</b>`,
   ok:v=>v.c===2,why:'Sarrus donne det(u, v, w) = c − 2. Pour c = 2, w = u + v : les trois vecteurs sont dans un même plan et le volume est nul.'},
  {h:'Opérations sur les lignes',p:`Trois règles pour calculer vite :<br>• échanger deux lignes <b>change le signe</b> du déterminant ;<br>• multiplier une ligne par λ <b>multiplie</b> le déterminant par λ ;<br>• ajouter à une ligne un multiple d’une autre <b>ne change rien</b>.<br>On se ramène ainsi à une matrice triangulaire, dont le déterminant est le <b>produit des coefficients diagonaux</b>. Enfin det(<i>AB</i>) = det <i>A</i> · det <i>B</i> et det(ᵗ<i>A</i>) = det <i>A</i>.`,
   note:'Conséquence : det(λA) = λ³ det A en dimension 3, car chacune des trois lignes est multipliée par λ.'},
  {kind:'Méthode',h:'Calculer un déterminant par opérations sur les lignes',
   p:'<b>Quand :</b> les coefficients sont grands, ou dépendent d’un paramètre, ou on veut un déterminant factorisé. <b>Comment :</b> 1) mets en facteur ce qui est commun à une ligne ; 2) avec <i>L</i><sub>i</sub> ← <i>L</i><sub>i</sub> − λ<i>L</i><sub>j</sub>, qui ne change rien, fais apparaître des 0 sous la diagonale ; 3) le déterminant d’une matrice triangulaire est le produit de sa diagonale. Compte les échanges de lignes : chacun change le signe.',
   demo:{enonce:`Calcule det ${M([[1,2,3],[2,5,7],[-1,1,4]])}.`,
    etapes:[{f:'<i>L</i>₂ ← <i>L</i>₂ − 2<i>L</i>₁ donne (0 1 1). <i>L</i>₃ ← <i>L</i>₃ + <i>L</i>₁ donne (0 3 7).',w:'Le pivot 1 en haut à gauche annule le reste de la 1re colonne.'},
     {f:'<i>L</i>₃ ← <i>L</i>₃ − 3<i>L</i>₂ donne (0 0 4).',w:'Le pivot 1 de la ligne 2 annule le 3 en dessous.'},
     {f:`det = det ${mat([[1,2,3],[0,1,1],[0,0,4]])} = 1·1·4 = 4.`,w:'Aucune opération n’a changé le déterminant : on multiplie la diagonale.'}],
    conclusion:'<b>det = 4</b>.'}},
  {h:'Le déterminant de 2A',p:'Une matrice 3 × 3 vérifie det <i>A</i> = 5. Que vaut det(2<i>A</i>)&nbsp;?',
   opts:['10','20','40','125'],ans:2,
   why:'Les trois lignes sont multipliées par 2 : det(2A) = 2³·5 = 40. La réponse 10 oublie que chaque ligne compte.'},
  {h:'Factoriser puis échelonner',p:`Calcule le déterminant de ${mat([[2,4,2],[1,3,4],[3,7,9]])}.`,lab:'det =',ans:6,
   why:'On sort 2 de L₁ : 2·det(1 2 1 ; 1 3 4 ; 3 7 9). Puis L₂ − L₁ = (0 1 3), L₃ − 3L₁ = (0 1 6), et L₃ − L₂ = (0 0 3). det = 2·(1·1·3) = 6.'},
  {h:'L’inverse par la comatrice',p:`La <b>comatrice</b> com(<i>A</i>) est la matrice des cofacteurs <i>C</i><sub>ij</sub>. Si det <i>A</i> ≠ 0 :<br><b><i>A</i>⁻¹ = ${F(1,'det <i>A</i>')} ᵗcom(<i>A</i>)</b>.<br>Attention à la transposée : le coefficient (<i>i</i>, <i>j</i>) de <i>A</i>⁻¹ est <i>C</i><sub>ji</sub>/det <i>A</i>. Exemple : ${mat([[1,1,0],[0,1,1],[0,0,1]])}⁻¹ = ${M([[1,-1,1],[0,1,-1],[0,0,1]])}.`,
   note:'A est inversible ⇔ det A ≠ 0. Vérifie toujours une inverse en calculant AA⁻¹ = I, au moins sur une ligne.'},
  {kind:'Méthode',h:'Inverser une matrice 3 × 3 par la comatrice',
   p:'<b>Comment :</b> 1) calcule det <i>A</i> ; s’il est nul, il n’y a pas d’inverse ; 2) calcule les 9 cofacteurs <i>C</i><sub>ij</sub> = (−1)<sup>i+j</sup> × (le déterminant 2 × 2 obtenu en barrant la ligne <i>i</i> et la colonne <i>j</i>) ; 3) range-les dans com(<i>A</i>), puis <b>transpose</b> ; 4) divise par det <i>A</i> ; 5) vérifie une ligne de <i>AA</i>⁻¹. <b>Pourquoi :</b> la ligne <i>i</i> de <i>A</i> fois les cofacteurs de la même ligne donne det <i>A</i> (c’est le développement), et fois ceux d’une autre ligne donne 0 (c’est le déterminant d’une matrice à deux lignes égales).',
   demo:{enonce:`Inverse <i>A</i> = ${mat([[1,2,0],[0,1,1],[1,0,1]])}.`,
    etapes:[{f:'det <i>A</i> = 1·(1·1 − 1·0) − 2·(0·1 − 1·1) + 0 = 1 + 2 = 3.',w:'Développement selon la ligne 1.'},
     {f:'Ligne 1 des cofacteurs : <i>C</i>₁₁ = 1, <i>C</i>₁₂ = −(0 − 1) = 1, <i>C</i>₁₃ = 0 − 1 = −1.',w:'Mineurs de la ligne 1 avec les signes + − +.'},
     {f:'Ligne 2 : <i>C</i>₂₁ = −(2 − 0) = −2, <i>C</i>₂₂ = 1 − 0 = 1, <i>C</i>₂₃ = −(0 − 2) = 2. Ligne 3 : <i>C</i>₃₁ = 2 − 0 = 2, <i>C</i>₃₂ = −(1 − 0) = −1, <i>C</i>₃₃ = 1 − 0 = 1.',w:'Signes − + − puis + − +.'},
     {f:`com(<i>A</i>) = ${M([[1,1,-1],[-2,1,2],[2,-1,1]])}, donc <i>A</i>⁻¹ = ${F(1,3)} ${M([[1,-2,2],[1,1,-1],[-1,2,1]])}.`,w:'On transpose : les lignes de com(A) deviennent les colonnes.'},
     {f:'Contrôle : la ligne 1 de <i>A</i>, (1 2 0), fois les colonnes de ᵗcom(<i>A</i>) donne 1 + 2 = 3, −2 + 2 = 0 et 2 − 2 = 0.',w:'On retrouve (3 0 0) = 3·(1 0 0) : après division par 3, c’est la 1re ligne de I.'}],
    conclusion:`<b>A⁻¹ = ${F(1,3)} ${M([[1,-2,2],[1,1,-1],[-1,2,1]])}</b>.`}},
  {h:'Un coefficient de l’inverse',p:`Soit <i>A</i> = ${mat([[2,1,0],[1,3,1],[0,1,2]])}, de déterminant 8. Quel est le coefficient ligne 1, colonne 3 de <i>A</i>⁻¹&nbsp;? Donne la valeur décimale.`,lab:'(A⁻¹)₁₃ =',ans:.125,tol:.001,
   why:'(A⁻¹)₁₃ = C₃₁/8. C₃₁ = (+1)·det(1 0 ; 3 1) = 1, donc 1/8 = 0,125. Ici A est symétrique, donc C₁₃ = C₃₁ aussi.'},
  {kind:'Problème',h:'Volume d’un tétraèdre',
   p:'On considère les points <i>O</i>(0 ; 0 ; 0), <i>A</i>(1 ; 0 ; 0), <i>B</i>(0 ; 2 ; 0) et <i>C</i>(0 ; 0 ; 3). Le volume d’un tétraèdre vaut le sixième du volume du parallélépipède construit sur trois de ses arêtes issues d’un même sommet. On veut le volume de <i>OABC</i>, puis savoir quand un point <i>D</i>(1 ; 1 ; <i>z</i>) est dans le plan <i>ABC</i>.',
   fig:(()=>{ const S=space({az:30}), O=[0,0,0], A=[1.2,0,0], B=[0,2.4,0], C=[0,0,3.6]; S.poly([A,B,C],{fill:'var(--accent)',fo:.2,c:'var(--accent)',w:2}).seg(O,A,{c:'var(--muted)',w:1.5,dash:1}).seg(O,B,{c:'var(--muted)',w:1.5,dash:1}).seg(O,C,{c:'var(--muted)',w:1.5,dash:1}); S.dot(A,{r:4,l:'A',dx:-18}).dot(B,{r:4,l:'B'}).dot(C,{r:4,l:'C'}).dot(O,{r:4,l:'O',dx:-18}); return S.svg(); })(),
   parts:[
    {q:'a) Calcule det(<i>OA</i>, <i>OB</i>, <i>OC</i>), les trois vecteurs en colonnes.',lab:'det =',ans:6,hint:'La matrice est diagonale.',why:'diag(1, 2, 3) a pour déterminant 1·2·3 = 6.'},
    {q:'b) Quel est le volume du tétraèdre <i>OABC</i>&nbsp;?',lab:'V =',ans:1,hint:'Un sixième du parallélépipède.',why:'V = |6|/6 = 1.'},
    {q:'c) Pour quelle valeur de <i>z</i> le point <i>D</i>(1 ; 1 ; <i>z</i>) est-il dans le plan <i>ABC</i>&nbsp;?',lab:'z =',ans:-1.5,tol:.01,hint:'D est dans le plan ABC ⇔ AB, AC et AD sont coplanaires ⇔ det(AB, AC, AD) = 0.',why:'AB = (−1 ; 2 ; 0), AC = (−1 ; 0 ; 3), AD = (0 ; 1 ; z). Le déterminant vaut 3 + 2z, nul pour z = −3/2. Contrôle avec l’équation x + y/2 + z/3 = 1 : 1 + 0,5 − 0,5 = 1.'},
    {q:'d) Pour <i>D</i>(1 ; 1 ; 1), quel est le volume du tétraèdre <i>ABCD</i>&nbsp;? Tu peux répondre par une fraction.',lab:'V =',ans:5/6,tol:.006,hint:'Reprends det(AB, AC, AD) = 3 + 2z avec z = 1.',why:'det = 3 + 2 = 5, donc V = 5/6 ≈ 0,83.'},
   ],
   sol:'det(OA, OB, OC) = det diag(1, 2, 3) = 6, donc <b>V(OABC) = 6/6 = 1</b>.<br>Avec AB = (−1 ; 2 ; 0), AC = (−1 ; 0 ; 3) et AD = (0 ; 1 ; z) en colonnes, on développe selon la 3e colonne :<br>det = −1·det(−1 −1 ; 0 3) + z·det(−1 −1 ; 2 0) = 3 + 2z.<br>D ∈ (ABC) ⇔ det = 0 ⇔ <b>z = −3/2</b>, ce que confirme l’équation du plan x + y/2 + z/3 = 1.<br>Pour z = 1 : det = 5 et <b>V(ABCD) = 5/6</b>.'},
  {kind:'Problème',h:'Un déterminant à paramètre',
   p:`Pour un réel <i>m</i>, on pose <i>A</i> = ${mat([['1','1','1'],['1','<i>m</i>','1'],['1','1','<i>m</i>']])}. On cherche pour quelles valeurs de <i>m</i> la matrice est inversible, puis on calcule son inverse pour <i>m</i> = 3 avec la comatrice. Une bonne factorisation du déterminant évite tout calcul inutile.`,
   parts:[
    {q:'a) En retranchant la ligne 1 aux lignes 2 et 3, calcule det <i>A</i> pour <i>m</i> = 3.',lab:'det =',ans:4,hint:'Après L₂ ← L₂ − L₁ et L₃ ← L₃ − L₁, la matrice devient triangulaire.',why:'On obtient (1 1 1 ; 0 m − 1 0 ; 0 0 m − 1), de déterminant (m − 1)². Pour m = 3 : 4.'},
    {q:'b) Pour quelle valeur de <i>m</i> la matrice n’est-elle pas inversible&nbsp;?',lab:'m =',ans:1,hint:'Quand (m − 1)² s’annule-t-il ?',why:'det A = (m − 1)² = 0 ⇔ m = 1. Les trois lignes sont alors égales.'},
    {q:'c) Pour <i>m</i> = 3, quel est le coefficient (1, 1) de <i>A</i>⁻¹&nbsp;?',lab:'(A⁻¹)₁₁ =',ans:2,hint:'C₁₁ = det(3 1 ; 1 3), puis divise par det A.',why:'C₁₁ = 9 − 1 = 8, et 8/4 = 2.'},
    {q:'d) Toujours pour <i>m</i> = 3, quel est le coefficient (1, 2) de <i>A</i>⁻¹&nbsp;?',lab:'(A⁻¹)₁₂ =',ans:-.5,tol:.001,hint:'Le coefficient (1, 2) de A⁻¹ est C₂₁/det A, à cause de la transposée.',why:'C₂₁ = −det(1 1 ; 1 3) = −2, et −2/4 = −0,5. A⁻¹ = (2 −0,5 −0,5 ; −0,5 0,5 0 ; −0,5 0 0,5).'},
    {q:'e) Pour <i>m</i> = 3, que vaut det(2<i>A</i>⁻¹)&nbsp;?',lab:'det =',ans:2,hint:'det(A⁻¹) = 1/det A et det(λB) = λ³ det B.',why:'det(2A⁻¹) = 2³·(1/4) = 2.'},
   ],
   sol:'L₂ ← L₂ − L₁ et L₃ ← L₃ − L₁ ne changent pas le déterminant et donnent (1 1 1 ; 0 m − 1 0 ; 0 0 m − 1).<br>Donc <b>det A = (m − 1)²</b> : A est inversible si et seulement si m ≠ 1.<br>Pour m = 3, det A = 4. Les cofacteurs valent C₁₁ = 8, C₁₂ = C₂₁ = −2, C₁₃ = C₃₁ = −2, C₂₂ = 2, C₂₃ = C₃₂ = 0, C₃₃ = 2.<br>A⁻¹ = ¼ ᵗcom(A) = <b>(2 −0,5 −0,5 ; −0,5 0,5 0 ; −0,5 0 0,5)</b>. Contrôle : ligne 1 de A fois colonne 1 de A⁻¹ = 2 − 0,5 − 0,5 = 1.<br>Enfin det(2A⁻¹) = 8/4 = 2.'},
]},

/* ===================== 3. SYSTÈMES 3 × 3 ===================== */
{subj:'al',sem:'esp',id:'al3-systemes',h:'Systèmes 3 × 3',p:'Pivot de Gauss, rang, intersection de trois plans et règle de Cramer.',steps:[
  {h:'Trois équations, trois plans',p:`Un système de trois équations à trois inconnues s’écrit <b><i>AX</i> = <i>B</i></b>, avec <i>A</i> une matrice 3 × 3. Chaque équation <i>ax</i> + <i>by</i> + <i>cz</i> = <i>d</i> décrit un <b>plan</b> de l’espace. Résoudre le système, c’est trouver l’<b>intersection des trois plans</b> : un point, une droite, un plan, ou rien. Ci-dessous, <i>x</i> = 1, <i>y</i> = 1 et <i>z</i> = 1 se coupent en (1 ; 1 ; 1).`,
   fig:(()=>{ const S=space({az:30,el:20,r:4}); patch(S,[0,0,1],[1,1,1],1.4,{fill:'var(--sci)',c:'var(--sci)'}); patch(S,[1,0,0],[1,1,1],1.4,{fill:'var(--math)',c:'var(--math)'}); patch(S,[0,1,0],[1,1,1],1.4,{fill:'var(--spark)',c:'var(--spark)'}); S.dot([1,1,1],{l:'(1 ; 1 ; 1)'}); return S.svg(); })(),
   note:'Si det A ≠ 0, la solution est unique : X = A⁻¹B. Tout l’intérêt du chapitre est le cas det A = 0.'},
  {h:'Le pivot de Gauss',p:`On élimine les inconnues ligne par ligne, avec des opérations qui ne changent pas les solutions.<br>${mat([['<i>x</i> + <i>y</i> + <i>z</i> = 6'],['2<i>x</i> + <i>y</i> − <i>z</i> = 1'],['<i>x</i> − <i>y</i> + 2<i>z</i> = 5']])} → <i>L</i>₂ − 2<i>L</i>₁, <i>L</i>₃ − <i>L</i>₁ → ${mat([['<i>x</i> + <i>y</i> + <i>z</i> = 6'],['−<i>y</i> − 3<i>z</i> = −11'],['−2<i>y</i> + <i>z</i> = −1']])}<br>Puis <i>L</i>₃ − 2<i>L</i>₂ donne 7<i>z</i> = 21. On remonte : <i>z</i> = 3, <i>y</i> = 2, <i>x</i> = 1.`,
   note:'Le système final est <b>échelonné</b> (triangulaire). On le résout de bas en haut. Vérifie toujours la solution dans les trois équations de départ.'},
  {kind:'Méthode',h:'Le pivot de Gauss, étape par étape',
   p:'<b>Comment :</b> 1) place en <i>L</i>₁ une équation dont le coefficient de <i>x</i> est non nul, si possible égal à 1 (échange des lignes si besoin) ; 2) annule <i>x</i> dans <i>L</i>₂ et <i>L</i>₃ avec <i>L</i><sub>i</sub> ← <i>L</i><sub>i</sub> − λ<i>L</i>₁ ; 3) recommence avec <i>y</i> sur les lignes 2 et 3 ; 4) résous de bas en haut ; 5) vérifie dans les trois équations de départ. <b>Pourquoi :</b> chaque opération est réversible, donc le nouveau système a exactement les mêmes solutions que l’ancien.',
   demo:{enonce:'Résous <i>x</i> + 2<i>y</i> − <i>z</i> = 2, 2<i>x</i> + 3<i>y</i> + <i>z</i> = 11, −<i>x</i> + <i>y</i> + 2<i>z</i> = 7.',
    etapes:[{f:'<i>L</i>₂ ← <i>L</i>₂ − 2<i>L</i>₁ : −<i>y</i> + 3<i>z</i> = 7. <i>L</i>₃ ← <i>L</i>₃ + <i>L</i>₁ : 3<i>y</i> + <i>z</i> = 9.',w:'Le pivot 1 de L₁ élimine x des deux autres lignes. On traite aussi le second membre.'},
     {f:'<i>L</i>₃ ← <i>L</i>₃ + 3<i>L</i>₂ : 10<i>z</i> = 30.',w:'Le pivot −1 de L₂ élimine y de L₃ : le système est échelonné.'},
     {f:'<i>z</i> = 3, puis −<i>y</i> + 9 = 7 donne <i>y</i> = 2, puis <i>x</i> = 2 − 4 + 3 = 1.',w:'Remontée de bas en haut.'},
     {f:'Vérification : 1 + 4 − 3 = 2, 2 + 6 + 3 = 11, −1 + 2 + 6 = 7.',w:'Dans les trois équations de départ.'}],
    conclusion:'Solution unique <b>(x ; y ; z) = (1 ; 2 ; 3)</b> : trois pivots non nuls, rang 3.'}},
  {h:'Résous par le pivot',p:'Résous <i>x</i> + <i>y</i> + <i>z</i> = 2, <i>x</i> + 2<i>y</i> + 3<i>z</i> = 7, 2<i>x</i> + 3<i>y</i> + 5<i>z</i> = 11. Combien vaut <i>z</i>&nbsp;?',lab:'z =',ans:2,
   why:'L₂ − L₁ : y + 2z = 5. L₃ − 2L₁ : y + 3z = 7. En soustrayant : z = 2, puis y = 1 et x = −1. Contrôle : −2 + 3 + 10 = 11.'},
  {h:'Rang et nombre de solutions',p:`Après le pivot, le <b>rang</b> <i>r</i> est le nombre de pivots non nuls (lignes non nulles du système échelonné).<br>• <i>r</i> = 3 : une <b>solution unique</b> (det <i>A</i> ≠ 0).<br>• <i>r</i> < 3 : il reste des lignes « 0 = <i>k</i> ». Si un <i>k</i> ≠ 0, <b>aucune solution</b>. Sinon, <b>une infinité</b> : une droite si <i>r</i> = 2, un plan si <i>r</i> = 1.`,
   note:'Nombre d’inconnues libres = 3 − r. C’est le théorème du rang : dim ker A + rg A = 3.'},
  {kind:'Méthode',h:'Calculer le rang d’une matrice',
   p:'<b>Comment :</b> échelonne la matrice par opérations sur les lignes, comme pour le pivot de Gauss mais sans second membre, puis compte les lignes non nulles. <b>Raccourcis :</b> rang 3 ⇔ det ≠ 0 ; si det = 0 mais que deux lignes ne sont pas proportionnelles, le rang vaut 2 ; si toutes les lignes sont proportionnelles (et pas toutes nulles), le rang vaut 1.',
   demo:{enonce:`Rang de ${mat([[1,2,3],[2,4,6],[1,0,1]])}.`,
    etapes:[{f:'<i>L</i>₂ ← <i>L</i>₂ − 2<i>L</i>₁ donne (0 0 0). <i>L</i>₃ ← <i>L</i>₃ − <i>L</i>₁ donne (0 −2 −2).',w:'La ligne 2 était le double de la ligne 1.'},
     {f:`On échange <i>L</i>₂ et <i>L</i>₃ : ${M([[1,2,3],[0,-2,-2],[0,0,0]])}.`,w:'On range la ligne nulle en bas : c’est la forme échelonnée.'},
     {f:'Deux lignes non nulles : rang 2.',w:'Contrôle : det = 0 car L₂ = 2L₁, et L₁, L₃ ne sont pas proportionnelles.'}],
    conclusion:'<b>rg = 2</b> : le noyau est une droite, car 3 − 2 = 1.'}},
  {h:'Lis le rang',p:`Quel est le rang de ${mat([[1,2,1],[2,1,0],[3,3,1]])}&nbsp;?`,lab:'rang =',ans:2,
   why:'L₂ − 2L₁ = (0 −3 −2) et L₃ − 3L₁ = (0 −3 −2), puis L₃ − L₂ = (0 0 0). Deux lignes non nulles : rang 2. On voit d’ailleurs que L₃ = L₁ + L₂.'},
  {h:'Trois plans qui bougent',p:`On fixe les plans <i>y</i> = 0 (bleu) et −<i>x</i> + <i>z</i> = 0 (jaune), qui se coupent selon la droite noire <i>L</i>. Le troisième plan <i>ax</i> + <i>z</i> = <i>c</i> (vert) bouge. On a det <i>A</i> = 1 + <i>a</i>.`,
   params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'c',l:'c',min:0,max:2,v:2}],
   draw:v=>{ const S=space({az:35,el:20,r:4}), n3=[v.a,0,1], A3=sc(v.c/dt(n3,n3),n3);
     patch(S,[0,1,0],[0,0,0],2.2,{fill:'var(--math)',c:'var(--math)'}); patch(S,[-1,0,1],[0,0,0],2.2,{fill:'var(--spark)',c:'var(--spark)'}); patch(S,n3,A3,2.2,{fill:'var(--ok)',c:'var(--ok)'});
     S.seg([-2.5,0,-2.5],[2.5,0,2.5],{c:'var(--ink)',w:2.5}); if(v.a!==-1){ const t=v.c/(v.a+1); if(Math.abs(t)<=3) S.dot([t,0,t],{l:'I'}); } return S.svg(); },
   info:v=>{ if(v.a!==-1){ const t=v.c/(v.a+1); return `det = ${fmt(1+v.a)} ≠ 0 : rang 3, <b>un point</b> I = ${c3([t,0,t])}`; }
     return v.c?'det = 0 : le plan vert est parallèle au jaune, <b>aucune solution</b> (rang 2, ligne 0 = c)':'det = 0 : le plan vert est le plan jaune, <b>une droite</b> de solutions (rang 2)'; },
   note:'Pour a = −1, le 3e plan a la même normale (−1 ; 0 ; 1) que le 2e : parallèles ou confondus selon c.'},
  {kind:'Méthode',h:'Décrire une infinité de solutions',
   p:'<b>Quand :</b> après le pivot, une ligne devient « 0 = 0 » : le rang est inférieur à 3. <b>Comment :</b> 1) les inconnues sans pivot sont <b>libres</b> : on les remplace par un paramètre (<i>t</i>, <i>s</i>) ; 2) on exprime les autres en fonction des paramètres en remontant ; 3) on écrit la solution comme un point plus des vecteurs directeurs. Un paramètre donne une droite, deux un plan. Si une ligne devient « 0 = <i>k</i> » avec <i>k</i> ≠ 0, il n’y a aucune solution.',
   demo:{enonce:'Résous <i>x</i> + <i>y</i> + <i>z</i> = 3, <i>x</i> + 2<i>y</i> + 3<i>z</i> = 6, 2<i>x</i> + 3<i>y</i> + 4<i>z</i> = 9.',
    etapes:[{f:'<i>L</i>₂ − <i>L</i>₁ : <i>y</i> + 2<i>z</i> = 3. <i>L</i>₃ − 2<i>L</i>₁ : <i>y</i> + 2<i>z</i> = 3.',w:'On élimine x.'},
     {f:'<i>L</i>₃ − <i>L</i>₂ : 0 = 0.',w:'Rang 2 et système compatible : une infinité de solutions.'},
     {f:'<i>z</i> = <i>t</i> libre ; <i>y</i> = 3 − 2<i>t</i> ; <i>x</i> = 3 − <i>y</i> − <i>z</i> = <i>t</i>.',w:'z n’a pas de pivot : c’est lui qui devient le paramètre.'},
     {f:'(<i>x</i> ; <i>y</i> ; <i>z</i>) = (0 ; 3 ; 0) + <i>t</i>(1 ; −2 ; 1).',w:'Contrôle avec t = 1 : (1 ; 1 ; 1) donne bien 3, 6 et 9.'}],
    conclusion:'Les solutions forment <b>la droite passant par (0 ; 3 ; 0) et dirigée par (1 ; −2 ; 1)</b>.'}},
  {h:'Combien de solutions&nbsp;?',p:'Combien de solutions a le système <i>x</i> + <i>y</i> + <i>z</i> = 1, <i>x</i> + 2<i>y</i> + 3<i>z</i> = 2, 2<i>x</i> + 3<i>y</i> + 4<i>z</i> = 4&nbsp;?',
   opts:['Une seule','Une infinité, formant une droite','Exactement deux','Aucune'],ans:3,
   why:'L₃ − L₁ − L₂ donne 0 = 4 − 1 − 2 = 1 : contradiction. La matrice est de rang 2 (det = 0), et le second membre n’est pas compatible.'},
  {h:'Rends le système compatible',p:'Pour le système <i>x</i> + <i>y</i> + <i>z</i> = 1, <i>x</i> + 2<i>y</i> + 3<i>z</i> = 2, 2<i>x</i> + 3<i>y</i> + 4<i>z</i> = <i>m</i>, le pivot donne le système échelonné ci-dessous. Règle <i>m</i> pour qu’il ait une infinité de solutions.',
   params:[{id:'m',l:'m',min:0,max:6,step:.5,v:1}],
   draw:v=>{ const rows=[['1','1','1','1'],['0','1','2','1'],['0','0','0',fmt(v.m-3)]], lab=['L₁','L₂ − L₁','L₃ − L₁ − L₂']; let s=`<svg viewBox="0 0 320 130" width="320" role="img">`;
     s+=`<rect x="96" y="${10+2*38}" width="214" height="32" rx="6" fill="${v.m===3?'var(--ok)':'var(--bad)'}" fill-opacity=".2"/><line x1="250" y1="8" x2="250" y2="122" stroke="var(--muted)" stroke-width="1.5"/>`;
     rows.forEach((r,i)=>{ s+=`<text x="10" y="${31+i*38}" font-size="12" fill="var(--muted)">${lab[i]}</text>`; r.forEach((x,j)=>{ s+=`<text x="${j<3?118+j*46:280}" y="${32+i*38}" font-size="16" font-weight="700" text-anchor="middle" fill="var(--ink)">${x}</text>`; }); });
     return s+'</svg>'; },
   info:v=>v.m===3?'Dernière ligne 0 = 0 : rang 2, une droite de solutions':`Dernière ligne 0 = ${fmt(v.m-3)} : aucune solution`,
   ok:v=>v.m===3,why:'L₃ − L₁ − L₂ donne 0 = m − 3. Compatible seulement pour m = 3. Alors z est libre : y = 1 − 2z, x = z, une droite de solutions.'},
  {h:'Une solution particulière',p:'Pour <i>m</i> = 3, le système <i>x</i> + <i>y</i> + <i>z</i> = 1, <i>x</i> + 2<i>y</i> + 3<i>z</i> = 2, 2<i>x</i> + 3<i>y</i> + 4<i>z</i> = 3 a une droite de solutions. Pour la solution qui a <i>z</i> = 5, combien vaut <i>y</i>&nbsp;?',lab:'y =',ans:-9,
   why:'L₂ − L₁ donne y + 2z = 1, donc y = 1 − 2z = −9, puis x = 1 − y − z = 1 + 9 − 5 = 5. Contrôle : 5 − 18 + 15 = 2 et 10 − 27 + 20 = 3.'},
  {h:'La règle de Cramer',p:`Si det <i>A</i> ≠ 0, la solution de <i>AX</i> = <i>B</i> est donnée par<br><b><i>x</i> = ${F('det <i>A<sub>x</sub></i>','det <i>A</i>')}, <i>y</i> = ${F('det <i>A<sub>y</sub></i>','det <i>A</i>')}, <i>z</i> = ${F('det <i>A<sub>z</sub></i>','det <i>A</i>')}</b>,<br>où <i>A<sub>x</sub></i> est <i>A</i> dont on a remplacé la 1re colonne par <i>B</i> (la 2e pour <i>A<sub>y</sub></i>, la 3e pour <i>A<sub>z</sub></i>).`,
   note:'Cramer est pratique pour une seule inconnue, ou pour un système à paramètre. Pour tout résoudre, le pivot de Gauss est plus rapide.'},
  {kind:'Méthode',h:'Appliquer la règle de Cramer',
   p:'<b>Comment :</b> 1) calcule det <i>A</i> et vérifie qu’il est non nul ; 2) pour l’inconnue voulue, remplace sa colonne dans <i>A</i> par le second membre <i>B</i> ; 3) calcule ce déterminant ; 4) divise par det <i>A</i>. <b>Pourquoi :</b> si <i>X</i> est solution, <i>B</i> = <i>x</i>·col₁ + <i>y</i>·col₂ + <i>z</i>·col₃. En remplaçant col₃ par <i>B</i>, les termes en col₁ et col₂ donnent des déterminants à deux colonnes égales, donc nuls, et il reste <i>z</i>·det <i>A</i>.',
   demo:{enonce:'Trouve <i>z</i> dans le système <i>x</i> + <i>y</i> + <i>z</i> = 6, 2<i>y</i> + 5<i>z</i> = −4, 2<i>x</i> + 5<i>y</i> − <i>z</i> = 27.',
    etapes:[{f:`det <i>A</i> = det ${M([[1,1,1],[0,2,5],[2,5,-1]])} = 1·(−2 − 25) − 1·(0 − 10) + 1·(0 − 4) = −21.`,w:'Développement selon la ligne 1.'},
     {f:`<i>A<sub>z</sub></i> = ${M([[1,1,6],[0,2,-4],[2,5,27]])}`,w:'La 3e colonne, celle de z, est remplacée par (6 ; −4 ; 27).'},
     {f:'det <i>A<sub>z</sub></i> = 1·(54 + 20) − 1·(0 + 8) + 6·(0 − 4) = 74 − 8 − 24 = 42.',w:'Même développement selon la ligne 1.'},
     {f:'<i>z</i> = 42/(−21) = −2.',w:'On divise par det A.'}],
    conclusion:'<b>z = −2</b>. On trouve de même x = 5 et y = 3. Contrôle : 5 + 3 − 2 = 6, 6 − 10 = −4 et 10 + 15 + 2 = 27.'}},
  {h:'Une inconnue par Cramer',p:`Résous 2<i>x</i> + <i>y</i> = 1, <i>x</i> + 2<i>y</i> + <i>z</i> = 1, <i>y</i> + 2<i>z</i> = 3. La matrice ${mat([[2,1,0],[1,2,1],[0,1,2]])} a pour déterminant 4. Combien vaut <i>y</i>&nbsp;?`,lab:'y =',ans:-1,
   why:`det A<sub>y</sub> = det ${mat([[2,1,0],[1,1,1],[0,3,2]])} = 2(2 − 3) − 1(2 − 0) = −4, donc y = −4/4 = −1. On trouve aussi x = 1 et z = 2 : 2 − 1 = 1, 1 − 2 + 2 = 1, −1 + 4 = 3.`},
  {kind:'Méthode',h:'Discuter un système selon un paramètre',
   p:'<b>Quand :</b> un coefficient du système dépend d’un paramètre <i>m</i>. <b>Comment :</b> 1) calcule det <i>A</i> en fonction de <i>m</i>, ou échelonne en gardant <i>m</i>, et trouve les valeurs qui l’annulent ; 2) pour toutes les autres valeurs, la solution est unique ; 3) pour chaque valeur critique, <b>remplace <i>m</i> par cette valeur</b> et refais le pivot : on obtient « 0 = 0 » (infinité de solutions) ou « 0 = <i>k</i> » avec <i>k</i> ≠ 0 (aucune). <b>Piège :</b> ne divise jamais par une expression en <i>m</i> sans avoir traité à part le cas où elle est nulle.',
   demo:{enonce:'Discute le système <i>x</i> + <i>y</i> + <i>z</i> = 1, <i>x</i> + 2<i>y</i> + 3<i>z</i> = 2, <i>x</i> + 3<i>y</i> + <i>mz</i> = 4.',
    etapes:[{f:'<i>L</i>₂ − <i>L</i>₁ : <i>y</i> + 2<i>z</i> = 1. <i>L</i>₃ − <i>L</i>₁ : 2<i>y</i> + (<i>m</i> − 1)<i>z</i> = 3.',w:'On élimine x en gardant m.'},
     {f:'<i>L</i>₃ − 2<i>L</i>₂ : (<i>m</i> − 5)<i>z</i> = 1.',w:'Le dernier pivot vaut m − 5 : c’est lui qui décide. On a d’ailleurs det A = m − 5.'},
     {f:'Si <i>m</i> ≠ 5 : <i>z</i> = 1/(<i>m</i> − 5), puis <i>y</i> et <i>x</i> en remontant : solution unique.',w:'On peut diviser, car m − 5 ≠ 0.'},
     {f:'Si <i>m</i> = 5 : la dernière ligne devient 0 = 1, impossible.',w:'Le cas critique est traité à part.'}],
    conclusion:'<b>Si m ≠ 5, une solution ; si m = 5, aucune.</b> <b>Astuce :</b> quand le système est symétrique en x, y et z, additionne les trois équations ou cherche une solution avec x = y = z.'}},
  {h:'Le cas critique',p:'On garde <i>m</i> = 5 mais on remplace le second membre 4 par 3 : <i>x</i> + <i>y</i> + <i>z</i> = 1, <i>x</i> + 2<i>y</i> + 3<i>z</i> = 2, <i>x</i> + 3<i>y</i> + 5<i>z</i> = 3. Que décrivent les solutions&nbsp;?',
   opts:['Un seul point','Aucune solution','Une droite','Un plan'],ans:2,
   why:'Le pivot donne y + 2z = 1, puis L₃ − L₁ − 2(L₂ − L₁) donne 0·z = 2 − 2 = 0, soit 0 = 0. Rang 2 : z est libre, y = 1 − 2z et x = z. Une droite de solutions.'},
  {kind:'Problème',h:'La parabole par trois points',
   p:'On cherche une parabole <i>y</i> = <i>ax</i>² + <i>bx</i> + <i>c</i> qui passe par les points (1 ; 2), (2 ; 3) et (3 ; 6). Chaque point donne une équation linéaire en <i>a</i>, <i>b</i>, <i>c</i>. On obtient un système 3 × 3 qu’on résout par le pivot, puis on se demande pourquoi la solution est toujours unique.',
   fig:(()=>{ const P=plane({x:[-1,5],y:[-1,12],w:320,h:300,lab:2,step:1}); P.fn(x=>x*x-2*x+3).dot(1,2,{l:'(1 ; 2)',dy:18}).dot(2,3,{l:'(2 ; 3)',dy:18}).dot(3,6,{l:'(3 ; 6)'}); return P.svg(); })(),
   parts:[
    {q:'a) Le système est <i>a</i> + <i>b</i> + <i>c</i> = 2, 4<i>a</i> + 2<i>b</i> + <i>c</i> = 3, 9<i>a</i> + 3<i>b</i> + <i>c</i> = 6. Combien vaut <i>a</i>&nbsp;?',lab:'a =',ans:1,hint:'Retranche L₁ à L₂, et L₂ à L₃ : c disparaît.',why:'L₂ − L₁ : 3a + b = 1. L₃ − L₂ : 5a + b = 3. En soustrayant : 2a = 2, donc a = 1.'},
    {q:'b) Combien vaut <i>b</i>&nbsp;?',lab:'b =',ans:-2,hint:'Reporte a dans 3a + b = 1.',why:'b = 1 − 3 = −2, puis c = 2 − 1 + 2 = 3.'},
    {q:'c) Quelle valeur la parabole prend-elle en <i>x</i> = 4&nbsp;?',lab:'y =',ans:11,hint:'y = x² − 2x + 3.',why:'16 − 8 + 3 = 11.'},
    {q:'d) Pourquoi trois points d’abscisses distinctes donnent-ils toujours une parabole unique&nbsp;?',opts:['Parce que trois points sont toujours alignés','Parce que le déterminant de la matrice (x₁² x₁ 1 ; x₂² x₂ 1 ; x₃² x₃ 1) vaut ±(x₂ − x₁)(x₃ − x₁)(x₃ − x₂), non nul','Parce que le système a toujours une infinité de solutions','Parce que c est toujours positif'],ans:1,
     hint:'Une solution unique ⇔ det A ≠ 0. Que vaut ce déterminant quand deux abscisses sont égales ?',why:'Ce déterminant (de Vandermonde) s’annule seulement si deux abscisses sont égales. Ici il vaut −(2 − 1)(3 − 1)(3 − 2) = −2 ≠ 0. Si les trois points sont alignés, on trouve a = 0 : une droite.'},
   ],
   sol:'Les trois points donnent a + b + c = 2, 4a + 2b + c = 3, 9a + 3b + c = 6.<br>L₂ − L₁ : 3a + b = 1 ; L₃ − L₂ : 5a + b = 3. Donc 2a = 2 : <b>a = 1</b>, puis <b>b = −2</b> et <b>c = 3</b>.<br>La parabole est y = x² − 2x + 3 : contrôle 1 − 2 + 3 = 2, 4 − 4 + 3 = 3, 9 − 6 + 3 = 6. En x = 4, y = 11.<br>Le déterminant du système vaut −2 ≠ 0. En général, il vaut ±(x₂ − x₁)(x₃ − x₁)(x₃ − x₂) : non nul dès que les abscisses sont distinctes, d’où l’unicité.'},
  {kind:'Problème',h:'Discuter selon un paramètre',
   p:'Pour un réel <i>m</i>, on étudie le système <i>x</i> + <i>y</i> + <i>mz</i> = 1, <i>x</i> + <i>my</i> + <i>z</i> = 1, <i>mx</i> + <i>y</i> + <i>z</i> = 1. On admet que son déterminant vaut −(<i>m</i> − 1)²(<i>m</i> + 2). Il faut donc distinguer trois cas : <i>m</i> = 1, <i>m</i> = −2, et toutes les autres valeurs. Dans chaque cas, on décrit les solutions et la position des trois plans.',
   parts:[
    {q:'a) Pour <i>m</i> = 2, la solution est unique et symétrique (<i>x</i> = <i>y</i> = <i>z</i>). Combien vaut <i>x</i>&nbsp;?',lab:'x =',ans:.25,tol:.001,hint:'Avec x = y = z, chaque équation devient (m + 2)x = 1.',why:'4x = 1, donc x = y = z = 1/4. Contrôle : 1/4 + 1/4 + 2/4 = 1.'},
    {q:'b) À part <i>m</i> = 1, pour quelle valeur de <i>m</i> le déterminant s’annule-t-il&nbsp;?',lab:'m =',ans:-2,hint:'Annule le facteur m + 2.',why:'−(m − 1)²(m + 2) = 0 ⇔ m = 1 ou m = −2.'},
    {q:'c) Pour <i>m</i> = −2, combien de solutions&nbsp;?',opts:['Une seule','Une infinité, formant un plan','Aucune : la somme des trois équations donne 0 = 3','Une infinité, formant une droite'],ans:2,
     hint:'Additionne les trois équations pour m = −2.',why:'La somme donne (m + 2)(x + y + z) = 3, soit 0 = 3 : impossible. Les trois plans n’ont aucun point commun.'},
    {q:'d) Pour <i>m</i> = −2, quel est le rang de la matrice du système&nbsp;?',lab:'rang =',ans:2,hint:'Le déterminant est nul, mais deux lignes sont-elles proportionnelles ?',why:'det = 0 donc rang ≤ 2. Les lignes (1 1 −2) et (1 −2 1) ne sont pas proportionnelles : rang 2. Les plans se coupent deux à deux selon trois droites parallèles.'},
    {q:'e) Pour <i>m</i> = 1, que décrivent les solutions&nbsp;?',opts:['Un point','Rien du tout','Une droite','Un plan : les trois équations sont x + y + z = 1'],ans:3,
     hint:'Écris les trois équations pour m = 1.',why:'Les trois équations sont identiques : rang 1, deux inconnues libres. L’ensemble des solutions est le plan x + y + z = 1.'},
   ],
   sol:'det = −(m − 1)²(m + 2).<br><b>m ∉ {1 ; −2}</b> : solution unique. Par symétrie, x = y = z, et (m + 2)x = 1 : x = y = z = 1/(m + 2). Pour m = 2 : 1/4.<br><b>m = −2</b> : la somme des équations donne 0 = 3, aucune solution. La matrice est de rang 2 : les plans se coupent deux à deux selon des droites parallèles, sans point commun.<br><b>m = 1</b> : les trois équations valent x + y + z = 1. Rang 1, les solutions forment ce plan.'},
]},

/* ===================== 4. VALEURS PROPRES EN DIMENSION 3 ===================== */
{subj:'al',sem:'esp',id:'al3-propres',h:'Valeurs propres en dimension 3',p:'Polynôme caractéristique de degré 3, matrices triangulaires et symétriques, diagonalisation et axe d’une rotation.',steps:[
  {h:'Le polynôme caractéristique',p:`Comme en dimension 2, λ est valeur propre de <i>A</i> ⇔ det(<i>A</i> − λ<i>I</i>) = 0. En dimension 3, c’est un polynôme de <b>degré 3</b> :<br><b>det(λ<i>I</i> − <i>A</i>) = λ³ − tr(<i>A</i>) λ² + <i>c</i> λ − det <i>A</i></b>,<br>où <i>c</i> est la somme des trois déterminants 2 × 2 « diagonaux » de <i>A</i>.`,
   note:'Un polynôme de degré 3 a toujours au moins une racine réelle : toute matrice 3 × 3 réelle a au moins une valeur propre réelle. Somme des valeurs propres = trace, produit = déterminant.'},
  {kind:'Méthode',h:'Calculer et factoriser un polynôme caractéristique 3 × 3',
   p:'<b>Comment :</b> 1) calcule det(<i>A</i> − λ<i>I</i>) en développant selon la ligne ou la colonne qui a le plus de 0, ou utilise la formule λ³ − tr(<i>A</i>)λ² + <i>c</i>λ − det <i>A</i> ; 2) garde les facteurs déjà trouvés, sans tout développer ; 3) cherche une <b>racine évidente</b> parmi 0, ±1, ±2, ±3… (les diviseurs du terme constant) ; 4) factorise par (λ − <i>r</i>) en identifiant les coefficients de (λ − <i>r</i>)(λ² + <i>p</i>λ + <i>q</i>), puis résous le second degré.',
   demo:{enonce:`Valeurs propres de <i>A</i> = ${mat([[1,2,0],[2,1,0],[0,0,2]])}, avec la formule.`,
    etapes:[{f:'tr <i>A</i> = 4 ; <i>c</i> = det(1 2 ; 2 1) + det(1 0 ; 0 2) + det(1 0 ; 0 2) = −3 + 2 + 2 = 1 ; det <i>A</i> = 2·(1 − 4) = −6.',w:'c additionne les trois déterminants 2 × 2 centrés sur la diagonale : lignes et colonnes 1-2, 1-3 et 2-3.'},
     {f:'<i>p</i>(λ) = λ³ − 4λ² + λ + 6.',w:'On remplace dans la formule ; −det A = +6.'},
     {f:'Racine évidente : <i>p</i>(−1) = −1 − 4 − 1 + 6 = 0.',w:'On teste les petits diviseurs de 6.'},
     {f:'λ³ − 4λ² + λ + 6 = (λ + 1)(λ² − 5λ + 6) = (λ + 1)(λ − 2)(λ − 3).',w:'En développant (λ + 1)(λ² + pλ + q), le coefficient de λ² vaut p + 1 = −4, donc p = −5, et le terme constant vaut q = 6.'}],
    conclusion:'Les valeurs propres sont <b>−1, 2 et 3</b>. Contrôle : somme 4 = trace, produit −6 = det. Ici, développer selon la 3e ligne donnait aussi directement (2 − λ)[(1 − λ)² − 4].'}},
  {h:'Chercher les directions propres',p:`Ici <i>A</i> = ${mat([[2,1,0],[1,2,0],[0,0,3]])}. Le vecteur <b>v</b> (bleu, de longueur 1) et son image <i>A</i><b>v</b> (jaune). Une direction est propre quand les deux flèches sont alignées. Essaie l’azimut 45° avec plusieurs élévations.`,
   params:[{id:'p',l:'azimut',min:0,max:345,step:15,v:0,u:'°'},{id:'t',l:'élévation',min:-90,max:90,step:15,v:30,u:'°'}],
   draw:propFig,info:propInfo,
   note:'Pour λ = 3, ce n’est pas une droite mais un <b>plan</b> de directions propres : celui engendré par (1 ; 1 ; 0) et (0 ; 0 ; 1).'},
  {h:'Trouve la valeur propre 1',p:'Pour la même matrice, 1 est aussi valeur propre. Trouve une direction <b>v</b> telle que <i>A</i><b>v</b> = <b>v</b>.',
   params:[{id:'p',l:'azimut',min:0,max:345,step:15,v:0,u:'°'},{id:'t',l:'élévation',min:-90,max:90,step:15,v:30,u:'°'}],
   draw:propFig,info:propInfo,
   ok:v=>v.t===0&&(v.p===135||v.p===315),why:'A(1 ; −1 ; 0) = (2 − 1 ; 1 − 2 ; 0) = (1 ; −1 ; 0). La direction d’azimut 135° (ou 315°) et d’élévation 0 est propre pour λ = 1.'},
  {h:'Une matrice par blocs',p:`Quelle est la plus grande valeur propre de ${mat([[4,1,0],[1,4,0],[0,0,2]])}&nbsp;?`,lab:'λ =',ans:5,
   why:'Développe selon la 3e ligne : det(A − λI) = (2 − λ)[(4 − λ)² − 1] = (2 − λ)(3 − λ)(5 − λ). Valeurs propres 2, 3 et 5. Contrôle : somme 10 = trace.'},
  {h:'Une racine évidente',p:'Le polynôme caractéristique d’une matrice est λ³ − 6λ² + 11λ − 6. Sachant que 1 est racine, quelle est la plus grande valeur propre&nbsp;?',lab:'λ =',ans:3,
   why:'λ³ − 6λ² + 11λ − 6 = (λ − 1)(λ² − 5λ + 6) = (λ − 1)(λ − 2)(λ − 3). Contrôle : 1 + 2 + 3 = 6 et 1·2·3 = 6.'},
  {h:'Triangulaires et symétriques',p:`Pour une matrice <b>triangulaire</b>, det(<i>A</i> − λ<i>I</i>) est le produit des (<i>a</i><sub>ii</sub> − λ) : <b>les valeurs propres sont les coefficients diagonaux</b>.<br>Pour une matrice <b>symétrique</b> réelle, c’est le <b>théorème spectral</b> : les valeurs propres sont réelles, et il existe une base <b>orthonormée</b> de vecteurs propres. Une matrice symétrique est donc toujours diagonalisable.`,
   note:'Pour une matrice symétrique, deux vecteurs propres associés à des valeurs propres différentes sont automatiquement perpendiculaires.'},
  {h:'Lis les valeurs propres',p:`Quelles sont les valeurs propres de ${M([[2,4,-1],[0,-3,5],[0,0,2]])}&nbsp;?`,
   opts:['4, 5 et −1','2 (double) et −3','2, −3 et 5','0, 2 et −3'],ans:1,
   why:'La matrice est triangulaire : on lit la diagonale 2, −3, 2. La valeur 2 est double. Contrôle : somme 1 = trace, produit −12 = det.'},
  {h:'Diagonaliser en dimension 3',p:`<i>A</i> est diagonalisable s’il existe une base (<b>v₁</b>, <b>v₂</b>, <b>v₃</b>) de vecteurs propres : <b><i>A</i> = <i>PDP</i>⁻¹</b>, <i>P</i> = (<b>v₁</b> | <b>v₂</b> | <b>v₃</b>), <i>D</i> = diag(λ₁, λ₂, λ₃).<br><b>Critères :</b> trois valeurs propres réelles distinctes ⇒ diagonalisable. Si une valeur propre est multiple, il faut que la <b>dimension de son espace propre</b> égale sa multiplicité.`,
   note:'Pour λ valeur propre, dim E<sub>λ</sub> = 3 − rg(A − λI). Une valeur propre double demande un plan propre, pas seulement une droite.'},
  {kind:'Méthode',h:'Espaces propres et diagonalisation en dimension 3',
   p:'<b>Comment :</b> pour chaque valeur propre λ : 1) écris <i>A</i> − λ<i>I</i> ; 2) résous (<i>A</i> − λ<i>I</i>)<i>X</i> = 0 par le pivot ; 3) <b>dim <i>E</i><sub>λ</sub> = 3 − rg(<i>A</i> − λ<i>I</i>)</b>, et chaque inconnue libre fournit un vecteur de base de <i>E</i><sub>λ</sub>. Puis additionne les dimensions : <b>si la somme vaut 3, <i>A</i> est diagonalisable</b>, et <i>P</i> a tous ces vecteurs en colonnes.',
   demo:{enonce:`<i>A</i> = ${mat([[2,1,1],[0,1,0],[1,1,2]])}. Valeurs propres, espaces propres, diagonalisation.`,
    etapes:[{f:'La ligne 2 de <i>A</i> − λ<i>I</i> est (0 ; 1 − λ ; 0). En développant selon elle : det = (1 − λ)[(2 − λ)² − 1] = (1 − λ)²(3 − λ).',w:'La ligne avec deux 0 donne directement un facteur, et (2 − λ)² − 1 = (1 − λ)(3 − λ).'},
     {f:`λ = 3 : <i>A</i> − 3<i>I</i> = ${M([[-1,1,1],[0,-2,0],[1,1,-1]])}, d’où <i>y</i> = 0 et <i>x</i> = <i>z</i> : <i>E</i>₃ = Vect((1 ; 0 ; 1)).`,w:'Rang 2 : une droite.'},
     {f:`λ = 1 : <i>A</i> − <i>I</i> = ${mat([[1,1,1],[0,0,0],[1,1,1]])}, de rang 1 : <i>E</i>₁ est le plan <i>x</i> + <i>y</i> + <i>z</i> = 0, engendré par (1 ; −1 ; 0) et (1 ; 0 ; −1).`,w:'Deux inconnues libres, y et z : dimension 3 − 1 = 2.'},
     {f:'1 + 2 = 3 : <i>A</i> est diagonalisable, avec <i>P</i> = (1 1 1 ; 0 −1 0 ; 1 0 −1) et <i>D</i> = diag(3, 1, 1).',w:'La valeur propre double 1 a bien un plan propre.'},
     {f:'Contrôle : <i>A</i>(1 ; 0 ; 1) = (3 ; 0 ; 3) et <i>A</i>(1 ; −1 ; 0) = (1 ; −1 ; 0).',w:'Au moins un vecteur par valeur propre.'}],
    conclusion:'<b>A = PDP⁻¹</b> avec D = diag(3, 1, 1). Si E₁ n’avait été qu’une droite, A n’aurait pas été diagonalisable.'}},
  {h:'Diagonalisable ou pas&nbsp;?',p:'Laquelle de ces matrices est diagonalisable dans ℝ&nbsp;?',
   opts:[mat([[1,1,0],[0,1,0],[0,0,2]]),mat([[1,2,3],[0,4,5],[0,0,6]]),mat([[2,1,0],[0,2,1],[0,0,2]]),M([[0,-1,0],[1,0,0],[0,0,1]])],ans:1,
   why:'(1 2 3 ; 0 4 5 ; 0 0 6) a trois valeurs propres distinctes 1, 4, 6. La 1re et la 3e ont une valeur propre multiple dont l’espace propre est trop petit (une droite). La 4e est une rotation de 90° : valeurs propres 1 et ±i.'},
  {h:'Dimension d’un espace propre',p:`Pour <i>A</i> = ${mat([[2,1,0],[0,2,0],[0,0,3]])}, quelle est la dimension de l’espace propre <i>E</i>₂&nbsp;?`,lab:'dim =',ans:1,
   why:'A − 2I = (0 1 0 ; 0 0 0 ; 0 0 1) est de rang 2, donc dim E₂ = 3 − 2 = 1. La valeur propre 2 est double, mais son espace propre n’est qu’une droite : A n’est pas diagonalisable.'},
  {h:'L’axe d’une rotation',p:`Une <b>rotation</b> de l’espace est une matrice <i>R</i> avec ᵗ<i>R</i><i>R</i> = <i>I</i> et det <i>R</i> = 1. Son <b>axe</b> est l’ensemble des vecteurs fixes : c’est l’<b>espace propre</b> <i>E</i>₁ = ker(<i>R</i> − <i>I</i>). Son angle θ se lit sur la trace : <b>tr <i>R</i> = 1 + 2 cos θ</b>, car dans une base adaptée <i>R</i> s’écrit ${mat([['1','0','0'],['0','cos θ','−sin θ'],['0','sin θ','cos θ']])}.`,
   fig:(()=>{ const S=space({az:30}), e=[[2.5,0,0],[0,2.5,0],[0,0,2.5]], l=(a,b,t)=>add(a,sc(t,add(b,sc(-1,a)))); S.seg([-1.2,-1.2,-1.2],[2.4,2.4,2.4],{c:'var(--accent)',w:2.5}).poly(e,{fill:'var(--sci)',fo:.15,c:'var(--sci)',w:1.5});
     [0,1,2].forEach(k=>S.arrow(l(e[k],e[(k+1)%3],.12),l(e[k],e[(k+1)%3],.8),{c:'var(--spark)',w:2.5,hs:9})); S.dot([2.5/3,2.5/3,2.5/3],{r:4,c:'var(--accent)'}).text([2.4,2.4,2.4],'E₁',{dx:6,c:'var(--accent)'}); return S.svg(); })(),
   note:'Ici, la rotation d’angle 120° autour de (1 ; 1 ; 1) envoie e₁ sur e₂, e₂ sur e₃ et e₃ sur e₁. Sa trace vaut 0 = 1 + 2 cos 120°.'},
  {kind:'Méthode',h:'Trouver l’axe et l’angle d’une rotation',
   p:'<b>Comment :</b> 1) vérifie que c’est une rotation : colonnes de longueur 1 et deux à deux perpendiculaires (c’est ᵗ<i>RR</i> = <i>I</i>), et det <i>R</i> = 1 ; 2) <b>axe</b> : résous <i>R</i><b>v</b> = <b>v</b>, c’est-à-dire (<i>R</i> − <i>I</i>)<b>v</b> = <b>0</b> ; 3) <b>angle</b> : cos θ = (tr <i>R</i> − 1)/2.',
   demo:{enonce:`Axe et angle de <i>R</i> = ${M([[0,0,1],[0,-1,0],[1,0,0]])}.`,
    etapes:[{f:'Les colonnes (0 ; 0 ; 1), (0 ; −1 ; 0) et (1 ; 0 ; 0) sont de longueur 1 et deux à deux perpendiculaires.',w:'C’est la condition ᵗRR = I.'},
     {f:'det <i>R</i> = −<i>ceg</i> = −1·(−1)·1 = 1.',w:'Avec Sarrus, seul le produit montant ceg est non nul. Un déterminant −1 signalerait une symétrie, pas une rotation.'},
     {f:'<i>R</i>(<i>x</i> ; <i>y</i> ; <i>z</i>) = (<i>z</i> ; −<i>y</i> ; <i>x</i>) = (<i>x</i> ; <i>y</i> ; <i>z</i>) ⇔ <i>z</i> = <i>x</i> et <i>y</i> = 0.',w:'On écrit Rv = v coordonnée par coordonnée.'},
     {f:'Axe : Vect((1 ; 0 ; 1)). Contrôle : <i>R</i>(1 ; 0 ; 1) = (1 ; 0 ; 1).',w:'Le vecteur trouvé est bien fixe.'},
     {f:'tr <i>R</i> = −1, donc cos θ = (−1 − 1)/2 = −1 et θ = 180°.',w:'C’est un demi-tour autour de l’axe.'}],
    conclusion:'<b>R est le demi-tour d’axe dirigé par (1 ; 0 ; 1)</b>. Contrôle : R² = I, comme pour tout demi-tour.'}},
  {kind:'Défi',h:'Trouve l’axe',p:`<i>R</i> = ${M([[0,-1,0],[0,0,-1],[1,0,0]])} est une rotation. Son axe est dirigé par un vecteur de la forme (1 ; <i>k</i> ; 1). Combien vaut <i>k</i>&nbsp;?`,lab:'k =',ans:-1,
   why:'R(x ; y ; z) = (−y ; −z ; x). R v = v donne x = −y, y = −z et z = x : v = (1 ; −1 ; 1). Contrôle : R(1 ; −1 ; 1) = (1 ; −1 ; 1). Comme tr R = 0, l’angle vaut 120°.'},
  {kind:'Méthode',h:'Résoudre une récurrence linéaire d’ordre 3',
   p:'<b>Quand :</b> <i>u</i>ₙ₊₃ = <i>a</i><i>u</i>ₙ₊₂ + <i>b</i><i>u</i>ₙ₊₁ + <i>c</i><i>u</i>ₙ, avec <i>u</i>₀, <i>u</i>₁ et <i>u</i>₂ donnés. <b>Comment :</b> comme à l’ordre 2. 1) Cherche les suites géométriques <i>u</i>ₙ = <i>r</i>ⁿ : on obtient l’équation caractéristique <i>r</i>³ = <i>ar</i>² + <i>br</i> + <i>c</i>, qui est le polynôme caractéristique de la matrice de la récurrence. 2) Avec trois racines distinctes, <i>u</i>ₙ = α<i>r</i>₁ⁿ + β<i>r</i>₂ⁿ + γ<i>r</i>₃ⁿ. 3) <i>u</i>₀, <i>u</i>₁ et <i>u</i>₂ donnent un système 3 × 3 en α, β, γ, qu’on résout par le pivot.',
   demo:{enonce:'<i>u</i>₀ = 3, <i>u</i>₁ = 6, <i>u</i>₂ = 14 et <i>u</i>ₙ₊₃ = 6<i>u</i>ₙ₊₂ − 11<i>u</i>ₙ₊₁ + 6<i>u</i>ₙ.',
    etapes:[{f:'<i>r</i>³ − 6<i>r</i>² + 11<i>r</i> − 6 = (<i>r</i> − 1)(<i>r</i> − 2)(<i>r</i> − 3).',w:'1 est racine évidente (1 − 6 + 11 − 6 = 0), puis on factorise.'},
     {f:'<i>u</i>ₙ = α + β·2ⁿ + γ·3ⁿ.',w:'Trois racines distinctes ; 1ⁿ = 1.'},
     {f:'α + β + γ = 3, α + 2β + 3γ = 6, α + 4β + 9γ = 14.',w:'On écrit la formule pour n = 0, 1 et 2.'},
     {f:'<i>L</i>₂ − <i>L</i>₁ : β + 2γ = 3. <i>L</i>₃ − <i>L</i>₁ : 3β + 8γ = 11. Donc 2γ = 11 − 9 : γ = 1, puis β = 1 et α = 1.',w:'Pivot de Gauss : (3β + 8γ) − 3(β + 2γ) = 2γ.'}],
    conclusion:'<b>uₙ = 1 + 2ⁿ + 3ⁿ</b>. Contrôle : la récurrence donne u₃ = 6·14 − 11·6 + 6·3 = 36, et 1 + 8 + 27 = 36.'}},
  {h:'Une autre récurrence d’ordre 3',p:'On pose <i>u</i>₀ = 3, <i>u</i>₁ = 3, <i>u</i>₂ = 11 et <i>u</i>ₙ₊₃ = 3<i>u</i>ₙ₊₂ + <i>u</i>ₙ₊₁ − 3<i>u</i>ₙ. L’équation caractéristique a pour racines 1, −1 et 3. Calcule <i>u</i>₆.',lab:'u₆ =',ans:731,
   why:'uₙ = α + β(−1)ⁿ + γ3ⁿ. n = 0, 1, 2 : α + β + γ = 3, α − β + 3γ = 3, α + β + 9γ = 11. La 3e moins la 1re : 8γ = 8, donc γ = 1, puis α + β = 2 et α − β = 0 : α = β = 1. u₆ = 1 + 1 + 729 = 731.'},
  {kind:'Problème',h:'Puissances de I + J',
   p:`Soit <i>A</i> = ${mat([[2,1,1],[1,2,1],[1,1,2]])} = <i>I</i> + <i>J</i>, où <i>J</i> a tous ses coefficients égaux à 1. <i>A</i> est symétrique, donc diagonalisable dans une base orthonormée. On cherche ses valeurs propres, la dimension de ses espaces propres, puis une formule pour <i>A</i>ⁿ.`,
   parts:[
    {q:'a) Calcule <i>A</i>(1 ; 1 ; 1). Pour quelle valeur propre λ ce vecteur est-il propre&nbsp;?',lab:'λ =',ans:4,hint:'Chaque ligne de A a pour somme 4.',why:'A(1 ; 1 ; 1) = (4 ; 4 ; 4) = 4·(1 ; 1 ; 1).'},
    {q:'b) Quelle est la dimension de l’espace propre <i>E</i>₁ = ker(<i>A</i> − <i>I</i>)&nbsp;?',lab:'dim =',ans:2,hint:'A − I = J. Quel est le rang de J ?',why:'J a trois lignes égales : rang 1, donc dim ker J = 3 − 1 = 2. E₁ est le plan x + y + z = 0, engendré par (1 ; −1 ; 0) et (1 ; 0 ; −1).'},
    {q:'c) On admet <i>A</i>ⁿ = <i>I</i> + ((4ⁿ − 1)/3)<i>J</i>. Quel est le coefficient (1, 1) de <i>A</i>³&nbsp;?',lab:'(A³)₁₁ =',ans:22,hint:'(4³ − 1)/3 = 21, et la diagonale reçoit aussi le 1 de I.',why:'1 + 21 = 22. Contrôle pour n = 1 : I + J = A.'},
    {q:'d) Et le coefficient (1, 3) de <i>A</i>³&nbsp;?',lab:'(A³)₁₃ =',ans:21,hint:'Hors de la diagonale, seul J contribue.',why:'(64 − 1)/3 = 21. A³ = (22 21 21 ; 21 22 21 ; 21 21 22).'},
    {q:'e) Pourquoi cette formule est-elle juste&nbsp;?',opts:['Car A est inversible','Car J² = J','Car (1 ; 1 ; 1) est propre pour 4ⁿ et tout vecteur de E₁ est fixe : les deux membres coïncident sur une base de vecteurs propres','Car det A = 4'],ans:2,
     hint:'Deux matrices qui agissent pareil sur une base sont égales.',why:'Sur (1 ; 1 ; 1) : J donne 3·(1 ; 1 ; 1), donc le membre de droite donne (1 + 4ⁿ − 1)(1 ; 1 ; 1) = 4ⁿ(1 ; 1 ; 1). Sur E₁, J donne 0 et les deux membres valent l’identité. Attention : J² = 3J, pas J.'},
   ],
   sol:'A(1 ; 1 ; 1) = 4(1 ; 1 ; 1) : 4 est valeur propre. A − I = J est de rang 1, donc E₁ est le plan x + y + z = 0, de dimension 2.<br>Comme 1 + 2 = 3, A est diagonalisable : A = PDP⁻¹ avec D = diag(4, 1, 1). Contrôle : trace 6 = 4 + 1 + 1, det 4 = 4·1·1.<br>Aⁿ vaut 4ⁿ sur la droite (1 ; 1 ; 1) et l’identité sur E₁. La matrice I + ((4ⁿ − 1)/3)J a exactement cet effet, car J(1 ; 1 ; 1) = 3(1 ; 1 ; 1) et J = 0 sur E₁.<br>Pour n = 3 : <b>A³ = (22 21 21 ; 21 22 21 ; 21 21 22)</b>.'},
  {kind:'Problème',h:'Une récurrence d’ordre 3',
   p:`La suite (<i>u</i>ₙ) vérifie <i>u</i>₀ = 3, <i>u</i>₁ = 2, <i>u</i>₂ = 6 et <i>u</i>ₙ₊₃ = 2<i>u</i>ₙ₊₂ + <i>u</i>ₙ₊₁ − 2<i>u</i>ₙ. Avec <i>X</i>ₙ = (<i>u</i>ₙ₊₂ ; <i>u</i>ₙ₊₁ ; <i>u</i>ₙ), on a <i>X</i>ₙ₊₁ = <i>CX</i>ₙ, où <i>C</i> = ${M([[2,1,-2],[1,0,0],[0,1,0]])}. On diagonalise <i>C</i> pour trouver une formule explicite de <i>u</i>ₙ.`,
   parts:[
    {q:'a) Calcule <i>u</i>₃ avec la relation de récurrence.',lab:'u₃ =',ans:8,hint:'u₃ = 2u₂ + u₁ − 2u₀.',why:'2·6 + 2 − 2·3 = 8.'},
    {q:'b) Quel est le polynôme caractéristique det(λ<i>I</i> − <i>C</i>)&nbsp;?',opts:['λ³ + 2λ² − λ − 2','λ³ − 2λ² − λ + 2','λ³ − 2λ² + λ − 2','λ³ − λ² − 2λ + 2'],ans:1,
     hint:'Développe selon la 1re ligne, ou essaie la suite géométrique uₙ = λⁿ dans la récurrence.',why:'uₙ = λⁿ convient si λ³ = 2λ² + λ − 2, soit λ³ − 2λ² − λ + 2 = 0. C’est bien det(λI − C), comme le donne le développement.'},
    {q:'c) Ce polynôme s’annule en λ = 1. Quelle est la plus grande valeur propre de <i>C</i>&nbsp;?',lab:'λ =',ans:2,hint:'Factorise par (λ − 1).',why:'λ³ − 2λ² − λ + 2 = (λ − 1)(λ² − λ − 2) = (λ − 1)(λ + 1)(λ − 2). Trois valeurs propres distinctes : 1, −1 et 2.'},
    {q:'d) On écrit <i>u</i>ₙ = α + β(−1)ⁿ + γ·2ⁿ. Combien vaut γ&nbsp;?',lab:'γ =',ans:1,hint:'n = 0, 1, 2 donnent α + β + γ = 3, α − β + 2γ = 2, α + β + 4γ = 6.',why:'La 3e moins la 1re : 3γ = 3, donc γ = 1. Puis α + β = 2 et α − β = 0 : α = β = 1.'},
    {q:'e) En déduire <i>u</i>₁₀.',lab:'u₁₀ =',ans:1026,hint:'uₙ = 1 + (−1)ⁿ + 2ⁿ.',why:'u₁₀ = 1 + 1 + 1 024 = 1 026. Contrôle : u₃ = 1 − 1 + 8 = 8.'},
   ],
   sol:'La récurrence s’écrit Xₙ₊₁ = CXₙ, donc Xₙ = CⁿX₀.<br>det(λI − C) = λ³ − 2λ² − λ + 2 = (λ − 1)(λ + 1)(λ − 2) : trois valeurs propres distinctes, C est diagonalisable.<br>Les coefficients de Cⁿ sont donc des combinaisons de 1ⁿ, (−1)ⁿ et 2ⁿ, et uₙ = α + β(−1)ⁿ + γ2ⁿ.<br>Les conditions initiales donnent α + β + γ = 3, α − β + 2γ = 2, α + β + 4γ = 6, d’où γ = 1, α = β = 1.<br><b>uₙ = 1 + (−1)ⁿ + 2ⁿ</b>, et u₁₀ = 1 026. Le terme 2ⁿ domine : uₙ/2ⁿ → 1.'},
]},
);
})();
