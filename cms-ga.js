/* Déclic — Géométrie analytique (PREPA-013 / 014) */
(()=>{
// ---------- helpers locaux ----------
const ar=s=>`<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:.85;vertical-align:-.1em"><span style="font-size:.7em">→</span><i>${s}</i></span>`;
const B=s=>`<b>${s}</b>`;            // vecteur nommé par une lettre : u, v, n…
const c2=(a,b)=>`(${fmt(a)} ; ${fmt(b)})`;
const c3=(a,b,c)=>`(${fmt(a)} ; ${fmt(b)} ; ${fmt(c)})`;
const vec=(P,x0,y0,x,y,q={})=>P.arrow(x0,y0,x0+x,y0+y,Object.assign({hs:10,w:3},q));
const cr=(u,v)=>[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
const dt=(u,v)=>u.reduce((s,x,i)=>s+x*v[i],0);
const nr=u=>Math.sqrt(dt(u,u));
const add=(...a)=>a.reduce((s,u)=>s.map((x,i)=>x+u[i]));
const sc=(k,u)=>u.map(x=>k*x);
const deg=x=>x*180/Math.PI;
// carré de plan dans l’espace : normale n, point A, demi-côté s
function patch(S,n,A,s,q){ const h=Math.abs(n[2])<.9?[0,0,1]:[1,0,0]; let e1=cr(n,h); e1=sc(1/nr(e1),e1); let e2=cr(n,e1); e2=sc(1/nr(e2),e2);
  S.poly([add(A,sc(s,e1),sc(s,e2)),add(A,sc(-s,e1),sc(s,e2)),add(A,sc(-s,e1),sc(-s,e2)),add(A,sc(s,e1),sc(-s,e2))],Object.assign({fill:'var(--sci)',fo:.18,c:'var(--sci)',w:1.5},q)); }
// droite ax + by + c = 0 tracée dans la fenêtre [-L ; L]
function line2(P,a,b,c,q,L=12){ if(Math.abs(b)>=Math.abs(a)) P.seg(-L,(-c+a*L)/b,L,(-c-a*L)/b,q); else P.seg((-c+b*L)/a,-L,(-c-b*L)/a,L,q); return P; }
// grille oblique de base e1, e2
function oblique(P,e1,e2,n=8){ for(let i=-n;i<=n;i++){ P.seg(i*e1[0]-12*e2[0],i*e1[1]-12*e2[1],i*e1[0]+12*e2[0],i*e1[1]+12*e2[1],{c:'var(--line)',w:1.2});
  P.seg(i*e2[0]-12*e1[0],i*e2[1]-12*e1[1],i*e2[0]+12*e1[0],i*e2[1]+12*e1[1],{c:'var(--line)',w:1.2}); } return P; }
// figure en L pour les transformations
const LSH=[[1,1],[2.5,1],[2.5,1.6],[1.6,1.6],[1.6,3],[1,3]];
const azP={id:'az',l:'Angle de vue',min:-60,max:90,step:15,v:30,u:'°'};

CMS.push(

/* =============== 1. VECTEURS =============== */
{subj:'ga', sem:'all', id:'cms-ga-vecteurs', h:'Vecteurs et calcul vectoriel', p:'Additionner, étirer et combiner des flèches, puis reconnaître des vecteurs colinéaires.', steps:[
 {h:'Un vecteur, c’est une translation',p:`Un <b>vecteur</b> a une direction, un sens et une norme, mais pas de point de départ fixe. Toutes les flèches parallèles, de même sens et de même longueur représentent le même vecteur ${B('u')}. Dans un repère, on le note par ses composantes ${B('u')} = (<i>x</i> ; <i>y</i>).`,
  params:[{id:'x',l:'x',min:-3,max:3,v:2},{id:'y',l:'y',min:-3,max:3,v:1}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2}); [[-3,-2],[0,1],[2,-3]].forEach(([a,b],i)=>{ vec(P,a,b,v.x,v.y,{c:i?'var(--math)':'var(--accent)'}); P.dot(a,b,{r:4,c:'var(--muted)'}); }); return P.svg(); },
  info:v=>`${B('u')} = ${c2(v.x,v.y)} · ‖${B('u')}‖ = √(${v.x*v.x} + ${v.y*v.y}) = ${fmt(Math.hypot(v.x,v.y))}`,
  note:`Pour deux points <i>A</i> et <i>B</i> : ${ar('AB')} = (<i>x<sub>B</sub></i> − <i>x<sub>A</sub></i> ; <i>y<sub>B</sub></i> − <i>y<sub>A</sub></i>). C’est « arrivée moins départ ».`},
 {h:'Addition : bout à bout',p:`Pour additionner ${B('u')} et ${B('v')}, on place l’origine de ${B('v')} au bout de ${B('u')}. La somme va du départ de ${B('u')} au bout de ${B('v')}. C’est aussi la diagonale du parallélogramme construit sur les deux vecteurs. En composantes, on additionne terme à terme.`,
  params:[{id:'a',l:'u : x',min:-3,max:3,v:3},{id:'b',l:'u : y',min:-3,max:3,v:1},{id:'c',l:'v : x',min:-3,max:3,v:1},{id:'d',l:'v : y',min:-3,max:3,v:2}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2});
    P.poly([[0,0],[v.a,v.b],[v.a+v.c,v.b+v.d],[v.c,v.d]],{fill:'var(--accent)',fo:.1,c:'var(--muted)',w:1,dash:true});
    vec(P,0,0,v.a,v.b,{c:'var(--math)'}); vec(P,v.a,v.b,v.c,v.d,{c:'var(--spark)'}); vec(P,0,0,v.a+v.c,v.b+v.d,{c:'var(--accent)'});
    P.text(v.a/2,v.b/2,'u',{dx:6,dy:-6,c:'var(--math)'}).text(v.a+v.c/2,v.b+v.d/2,'v',{dx:6,c:'var(--spark)'}); return P.svg(); },
  info:v=>`${B('u')} + ${B('v')} = ${c2(v.a,v.b)} + ${c2(v.c,v.d)} = <b>${c2(v.a+v.c,v.b+v.d)}</b>`},
 {h:'La relation de Chasles',p:`Pour tous points <i>A</i>, <i>B</i>, <i>C</i>, que vaut ${ar('AB')} + ${ar('BC')}&nbsp;?`,
  opts:[ar('CA'),ar('BA'),ar('AC'),'le vecteur nul'],ans:2,
  why:`C’est la <b>relation de Chasles</b> : aller de <i>A</i> à <i>B</i> puis de <i>B</i> à <i>C</i> revient à aller de <i>A</i> à <i>C</i>. On « recolle » la lettre du milieu.`},
 {h:'Multiplier par un scalaire',p:`Le vecteur <i>k</i>${B('u')} a la même direction que ${B('u')}, une norme multipliée par |<i>k</i>|, et le même sens si <i>k</i> &gt; 0, le sens contraire si <i>k</i> &lt; 0. En composantes : <i>k</i>(<i>x</i> ; <i>y</i>) = (<i>kx</i> ; <i>ky</i>).`,
  params:[{id:'k',l:'k',min:-2,max:3,step:.5,v:1.5}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-4,4],lab:2}); line2(P,1,-2,0,{c:'var(--line)',w:1.5,dash:true}); vec(P,0,0,2*v.k,v.k,{c:v.k<0?'var(--bad)':'var(--accent)',w:4}); vec(P,0,0,2,1,{c:'var(--math)',w:2.5}); P.text(2,1,'u',{dx:4,dy:-6,c:'var(--math)'}); return P.svg(); },
  info:v=>`${fmt(v.k)}·${B('u')} = ${fmt(v.k)}·(2 ; 1) = ${c2(2*v.k,v.k)} · norme ×${fmt(Math.abs(v.k))}${v.k<0?', sens inversé':''}`,
  note:'Deux vecteurs sont <b>colinéaires</b> si l’un est un multiple de l’autre. Le vecteur nul est colinéaire à tous les vecteurs.'},
 {h:'Rends-les colinéaires',p:`${B('u')} = (2 ; −1) et ${B('v')} = (<i>x</i> ; 3). Dans le plan, ${B('u')} et ${B('v')} sont colinéaires si et seulement si leur <b>déterminant</b> <i>x</i><sub>u</sub><i>y</i><sub>v</sub> − <i>y</i><sub>u</sub><i>x</i><sub>v</sub> est nul. Règle <i>x</i>.`,
  params:[{id:'x',l:'x',min:-8,max:8,v:2}],
  draw:v=>{ const P=plane({x:[-9,9],y:[-5,5],lab:3}); line2(P,1,2,0,{c:'var(--line)',w:1.5,dash:true}); vec(P,0,0,2,-1,{c:'var(--math)'}); vec(P,0,0,v.x,3,{c:v.x===-6?'var(--ok)':'var(--spark)'}); P.text(2,-1,'u',{dx:4,dy:14,c:'var(--math)'}).text(v.x,3,'v',{dx:6,dy:-4,c:'var(--spark)'}); return P.svg(); },
  info:v=>`det = 2·3 − (−1)·${fmt(v.x)} = ${fmt(6+v.x)}`,
  ok:v=>v.x===-6, why:`det = 2·3 − (−1)·<i>x</i> = 6 + <i>x</i> = 0 donne <i>x</i> = −6. Alors ${B('v')} = (−6 ; 3) = −3${B('u')}.`,
  note:`Trois points <i>A</i>, <i>B</i>, <i>C</i> sont <b>alignés</b> si et seulement si ${ar('AB')} et ${ar('AC')} sont colinéaires.`},
 {h:'Combinaisons linéaires',p:`Une <b>combinaison linéaire</b> de ${B('u')} et ${B('v')} est un vecteur <i>a</i>${B('u')} + <i>b</i>${B('v')}. Si ${B('u')} et ${B('v')} ne sont pas colinéaires, on atteint ainsi <b>tous</b> les vecteurs du plan, et de façon unique.`,
  params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1.5},{id:'b',l:'b',min:-2,max:2,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-5,5],grid:false}); oblique(P,[2,1],[-1,1]);
    vec(P,0,0,2*v.a,v.a,{c:'var(--math)'}); vec(P,2*v.a,v.a,-v.b,v.b,{c:'var(--spark)'}); vec(P,0,0,2*v.a-v.b,v.a+v.b,{c:'var(--accent)',w:4});
    vec(P,0,0,2,1,{c:'var(--ink)',w:1.5,hs:7}); vec(P,0,0,-1,1,{c:'var(--ink)',w:1.5,hs:7}); P.text(2,1,'u',{dy:14}).text(-1,1,'v',{dx:-12}); return P.svg(); },
  info:v=>`${fmt(v.a)}${B('u')} + ${fmt(v.b)}${B('v')} = ${fmt(v.a)}·(2 ; 1) + ${fmt(v.b)}·(−1 ; 1) = <b>${c2(2*v.a-v.b,v.a+v.b)}</b>`},
 {h:'Décompose w',p:`Avec ${B('u')} = (1 ; 2) et ${B('v')} = (3 ; −1), trouve <i>a</i> et <i>b</i> tels que <i>a</i>${B('u')} + <i>b</i>${B('v')} = ${B('w')} = (5 ; 3). Le point visé est marqué.`,
  params:[{id:'a',l:'a',min:-3,max:3,v:0},{id:'b',l:'b',min:-3,max:3,v:0}],
  draw:v=>{ const P=plane({x:[-6,8],y:[-5,7],lab:2}); vec(P,0,0,v.a,2*v.a,{c:'var(--math)'}); vec(P,v.a,2*v.a,3*v.b,-v.b,{c:'var(--spark)'}); P.dot(5,3,{c:'var(--ok)',l:'w'}).dot(v.a+3*v.b,2*v.a-v.b,{r:5,c:'var(--accent)'}); return P.svg(); },
  info:v=>`<i>a</i>${B('u')} + <i>b</i>${B('v')} = ${c2(v.a+3*v.b,2*v.a-v.b)}`,
  ok:v=>v.a===2&&v.b===1, why:`On résout <i>a</i> + 3<i>b</i> = 5 et 2<i>a</i> − <i>b</i> = 3. La 2e donne <i>b</i> = 2<i>a</i> − 3, puis 7<i>a</i> − 9 = 5, donc <i>a</i> = 2 et <i>b</i> = 1.`},
 {kind:'Défi',h:'Dans un parallélogramme',p:`<i>ABCD</i> est un parallélogramme et <i>M</i> est le milieu de [<i>CD</i>]. Exprime ${ar('AM')} en fonction de ${ar('AB')} et ${ar('AD')}.`,
  fig:(()=>{ const P=plane({x:[-0.5,6.5],y:[-0.6,3.6],grid:false,axes:false}); P.poly([[0,0],[4,0],[5.5,3],[1.5,3]],{fill:'var(--accent)',fo:.1,c:'var(--ink)',w:2});
    P.seg(0,0,3.5,3,{c:'var(--spark)',w:3,dash:true}).dot(0,0,{r:4,l:'A',dx:-14,dy:14}).dot(4,0,{r:4,l:'B',dy:14}).dot(5.5,3,{r:4,l:'C',dy:-6}).dot(1.5,3,{r:4,l:'D',dx:-16,dy:-6}).dot(3.5,3,{r:4,l:'M',dy:-8}); return P.svg(); })(),
  opts:[`${ar('AB')} + ½ ${ar('AD')}`,`½ (${ar('AB')} + ${ar('AD')})`,`${ar('AB')} + ${ar('AD')}`,`${ar('AD')} + ½ ${ar('AB')}`],ans:3,
  why:`Chasles : ${ar('AM')} = ${ar('AD')} + ${ar('DM')}. Or ${ar('DM')} = ½ ${ar('DC')} et ${ar('DC')} = ${ar('AB')} (parallélogramme). Donc ${ar('AM')} = ${ar('AD')} + ½ ${ar('AB')}.`},
]},

/* =============== 2. PRODUIT SCALAIRE =============== */
{subj:'ga', sem:'all', id:'cms-ga-scalaire', h:'Produit scalaire et problèmes métriques', p:'Un nombre qui mesure à quel point deux vecteurs vont dans le même sens, et qui donne longueurs, angles et projections.', steps:[
 {h:'Définition géométrique',p:`Le <b>produit scalaire</b> de ${B('u')} et ${B('v')}, d’angle θ, est le nombre <div class="formula">${B('u')}·${B('v')} = ‖${B('u')}‖ ‖${B('v')}‖ cos θ</div> C’est aussi ‖${B('u')}‖ fois la longueur signée de la projection de ${B('v')} sur ${B('u')}.`,
  params:[{id:'t',l:'Angle θ',min:0,max:180,step:15,v:45,u:'°'}],
  draw:v=>{ const c=2*Math.cos(rad(v.t)), s=2*Math.sin(rad(v.t)), P=plane({x:[-3,4],y:[-1,3],lab:1});
    P.seg(c,s,c,0,{c:'var(--muted)',w:1.5,dash:true}).seg(0,0,c,0,{c:Math.abs(c)<1e-9?'var(--muted)':c>0?'var(--ok)':'var(--bad)',w:7,op:.6});
    vec(P,0,0,3,0,{c:'var(--math)'}); vec(P,0,0,c,s,{c:'var(--spark)'}); P.text(3,0,'u',{dy:-8,c:'var(--math)'}).text(c,s,'v',{dx:6,c:'var(--spark)'}); return P.svg(); },
  info:v=>{ const p=6*Math.cos(rad(v.t)); return `‖${B('u')}‖ = 3, ‖${B('v')}‖ = 2 → ${B('u')}·${B('v')} = 6 cos ${v.t}° = <b>${fmt(Math.abs(p)<1e-9?0:p)}</b>${Math.abs(p)<1e-9?' : vecteurs orthogonaux':p>0?' : angle aigu':' : angle obtus'}`; },
  note:'Signe du produit scalaire : positif pour un angle aigu, nul pour un angle droit, négatif pour un angle obtus.'},
 {h:'En composantes',p:`Dans un repère <b>orthonormé</b>, si ${B('u')} = (<i>x</i> ; <i>y</i>) et ${B('v')} = (<i>x′</i> ; <i>y′</i>), alors ${B('u')}·${B('v')} = <i>xx′</i> + <i>yy′</i> (et on ajoute <i>zz′</i> dans l’espace). Calcule ${B('u')}·${B('v')} pour ${B('u')} = (3 ; −2) et ${B('v')} = (4 ; 5).`,
  lab:'u·v =', ans:2, why:'3·4 + (−2)·5 = 12 − 10 = 2.'},
 {h:'Norme et angle',p:`Le produit scalaire d’un vecteur avec lui-même donne sa norme au carré : ‖${B('u')}‖² = ${B('u')}·${B('u')} = <i>x</i>² + <i>y</i>². On en tire l’angle entre deux vecteurs non nuls : <div class="formula">cos θ = ${F(`${B('u')}·${B('v')}`,`‖${B('u')}‖ ‖${B('v')}‖`)}, θ ∈ [0 ; π]</div>`,
  fig:(()=>{ const P=plane({x:[-0.5,4],y:[-0.5,3],lab:1}); vec(P,0,0,1,2,{c:'var(--math)'}); vec(P,0,0,3,1,{c:'var(--spark)'}); P.text(1,2,'u',{dx:6,c:'var(--math)'}).text(3,1,'v',{dx:6,c:'var(--spark)'}).text(.55,.6,'θ',{s:14}); return P.svg(); })(),
  note:'Un vecteur de norme 1 est dit <b>unitaire</b>. Pour normer un vecteur non nul, on le divise par sa norme.'},
 {h:'Calcule l’angle',p:`Quel est l’angle entre ${B('u')} = (1 ; 2) et ${B('v')} = (3 ; 1) (les vecteurs de la figure précédente)&nbsp;?`,
  lab:'θ =', unit:'°', ans:45, tol:.01, why:`${B('u')}·${B('v')} = 3 + 2 = 5, ‖${B('u')}‖ = √5, ‖${B('v')}‖ = √10. Donc cos θ = 5/√50 = 1/√2 et θ = 45°.`},
 {h:'Rends-les orthogonaux',p:`${B('u')} et ${B('v')} sont <b>orthogonaux</b> si et seulement si ${B('u')}·${B('v')} = 0. Avec ${B('u')} = (2 ; 3) et ${B('v')} = (<i>x</i> ; −2), règle <i>x</i>.`,
  params:[{id:'x',l:'x',min:-6,max:6,v:0}],
  draw:v=>{ const P=plane({x:[-7,7],y:[-4,4],lab:2}); vec(P,0,0,2,3,{c:'var(--math)'}); vec(P,0,0,v.x,-2,{c:2*v.x-6===0?'var(--ok)':'var(--spark)'}); P.text(2,3,'u',{dx:6,c:'var(--math)'}).text(v.x,-2,'v',{dx:6,dy:12,c:'var(--spark)'}); return P.svg(); },
  info:v=>`${B('u')}·${B('v')} = 2·${fmt(v.x)} + 3·(−2) = ${fmt(2*v.x-6)}`,
  ok:v=>v.x===3, why:'2<i>x</i> − 6 = 0 donne <i>x</i> = 3. Astuce : (<i>a</i> ; <i>b</i>) est toujours orthogonal à (−<i>b</i> ; <i>a</i>) et à (<i>b</i> ; −<i>a</i>).'},
 {h:'Projection orthogonale',p:`La projection orthogonale de ${B('v')} sur la direction de ${B('u')} est <div class="formula">p = ${F(`${B('u')}·${B('v')}`,`‖${B('u')}‖²`)} ${B('u')}</div> La différence ${B('v')} − p est orthogonale à ${B('u')}. Déplace ${B('v')}.`,
  params:[{id:'a',l:'v : x',min:-4,max:4,v:1},{id:'b',l:'v : y',min:-4,max:4,v:3}],
  draw:v=>{ const k=(3*v.a+v.b)/10, P=plane({x:[-5,5],y:[-4,4],lab:2}); line2(P,1,-3,0,{c:'var(--line)',w:1.5,dash:true});
    P.seg(v.a,v.b,3*k,k,{c:'var(--muted)',w:1.5,dash:true}); vec(P,0,0,3,1,{c:'var(--math)',w:2}); vec(P,0,0,3*k,k,{c:'var(--ok)',w:5}); vec(P,0,0,v.a,v.b,{c:'var(--spark)'});
    P.text(3,1,'u',{dx:4,dy:14,c:'var(--math)'}).text(v.a,v.b,'v',{dx:6,c:'var(--spark)'}); return P.svg(); },
  info:v=>{ const d=3*v.a+v.b; return `${B('u')} = (3 ; 1), ${B('u')}·${B('v')} = ${fmt(d)}, ‖${B('u')}‖² = 10 → p = ${fmt(d/10)}${B('u')} = <b>${c2(3*d/10,d/10)}</b>`; }},
 {h:'Longueur d’une projection',p:`Quelle est la longueur de la projection orthogonale de ${B('v')} = (4 ; 2) sur la direction de ${B('u')} = (1 ; 1)&nbsp;? Arrondis au centième.`,
  lab:'longueur =', ans:4.24, tol:.006, why:`La longueur vaut |${B('u')}·${B('v')}| / ‖${B('u')}‖ = 6/√2 = 3√2 ≈ 4,24. Le vecteur projeté est 3·(1 ; 1) = (3 ; 3).`},
 {h:'Distances et identités',p:`La distance entre deux points est la norme du vecteur qui les relie : <i>AB</i> = ‖${ar('AB')}‖ = √((<i>x<sub>B</sub></i> − <i>x<sub>A</sub></i>)² + (<i>y<sub>B</sub></i> − <i>y<sub>A</sub></i>)²). En développant avec le produit scalaire : <div class="formula">‖${B('u')} ± ${B('v')}‖² = ‖${B('u')}‖² ± 2 ${B('u')}·${B('v')} + ‖${B('v')}‖²</div> Dans un triangle, c’est le théorème d’<b>Al-Kashi</b> : <i>c</i>² = <i>a</i>² + <i>b</i>² − 2<i>ab</i> cos γ.`,
  fig:(()=>{ const P=plane({x:[-0.5,5],y:[-0.5,3],grid:false,axes:false}); vec(P,0,0,4,0,{c:'var(--math)'}); vec(P,0,0,1.5,2.5,{c:'var(--spark)'}); vec(P,1.5,2.5,2.5,-2.5,{c:'var(--accent)'});
    P.text(2,0,'u',{dy:16,c:'var(--math)'}).text(.75,1.25,'v',{dx:-14,c:'var(--spark)'}).text(2.75,1.25,'u − v',{dx:8,c:'var(--accent)'}); return P.svg(); })(),
  note:'Piège : ‖<b>u</b> + <b>v</b>‖ n’est pas ‖<b>u</b>‖ + ‖<b>v</b>‖ en général. On a seulement l’inégalité triangulaire ‖<b>u</b> + <b>v</b>‖ ≤ ‖<b>u</b>‖ + ‖<b>v</b>‖.'},
 {kind:'Défi',h:'Norme d’une somme',p:`On sait que ‖${B('u')}‖ = 3, ‖${B('v')}‖ = 4 et ${B('u')}·${B('v')} = 6. Que vaut ‖${B('u')} + ${B('v')}‖&nbsp;?`,
  opts:['7','5','√37','√13'],ans:2, why:`‖${B('u')} + ${B('v')}‖² = 9 + 2·6 + 16 = 37, donc ‖${B('u')} + ${B('v')}‖ = √37 ≈ 6,08. On aurait 5 seulement si ${B('u')}·${B('v')} = 0.`},
]},

/* =============== 3. DROITES, PLANS, ESPACE (VECTORIEL) =============== */
{subj:'ga', sem:'all', id:'cms-ga-espace', h:'Droites, plans et espace : étude vectorielle', p:'Décrire droites et plans par un point et des vecteurs, puis classer leurs positions relatives.', steps:[
 {h:'Une droite : un point et une direction',p:`La droite <i>d</i> passant par <i>A</i> et de <b>vecteur directeur</b> ${B('u')} ≠ 0 est l’ensemble des points <i>M</i> tels que ${ar('AM')} = <i>t</i>${B('u')}, <i>t</i> ∈ ℝ. Chaque valeur du paramètre <i>t</i> donne un point. Tourne la vue pour bien voir la droite dans l’espace.`,
  params:[{id:'t',l:'t',min:-2,max:2,step:.5,v:1},azP],
  draw:v=>{ const A=[1,-1,1], u=[1,2,1], S=space({az:v.az}); S.seg(add(A,sc(-4,u)),add(A,sc(4,u)),{c:'var(--line)',w:2});
    S.arrow(A,add(A,sc(v.t,u)),{c:'var(--accent)',w:3,hs:9}).arrow(A,add(A,u),{c:'var(--math)',w:2,hs:7}); S.dot(A,{r:4,c:'var(--muted)',l:'A'}).dot(add(A,sc(v.t,u)),{l:'M'}); return S.svg(); },
  info:v=>`<i>A</i> = (1 ; −1 ; 1), ${B('u')} = (1 ; 2 ; 1) → <i>M</i> = <i>A</i> + ${fmt(v.t)}${B('u')} = ${c3(1+v.t,-1+2*v.t,1+v.t)}`,
  note:'Tout multiple non nul de <b>u</b> est aussi un vecteur directeur de la même droite.'},
 {h:'Ce point est-il sur la droite&nbsp;?',p:`La droite <i>d</i> passe par <i>A</i>(1 ; 2 ; 0) et a pour vecteur directeur ${B('u')} = (2 ; −1 ; 3). Lequel de ces points appartient à <i>d</i>&nbsp;?`,
  opts:['(3 ; 1 ; 2)','(5 ; 0 ; 6)','(2 ; −1 ; 3)','(0 ; 3 ; −2)'],ans:1,
  why:`(5 ; 0 ; 6) − <i>A</i> = (4 ; −2 ; 6) = 2${B('u')}, donc <i>t</i> = 2 convient. Pour les autres, aucun <i>t</i> ne marche pour les trois coordonnées à la fois.`},
 {h:'Un plan : un point et deux directions',p:`Le plan passant par <i>A</i> et dirigé par deux vecteurs ${B('u')} et ${B('v')} <b>non colinéaires</b> est l’ensemble des points <i>M</i> tels que ${ar('AM')} = <i>s</i>${B('u')} + <i>t</i>${B('v')}. Deux paramètres, car un plan a deux dimensions.`,
  params:[{id:'s',l:'s',min:-1,max:1,step:.25,v:.5},{id:'t',l:'t',min:-1,max:1,step:.25,v:.75},azP],
  draw:v=>{ const A=[0,0,1], u=[2,0,.5], w=[0,2.5,-.5], S=space({az:v.az});
    S.poly([add(A,u,w),add(A,sc(-1,u),w),add(A,sc(-1,u),sc(-1,w)),add(A,u,sc(-1,w))],{fill:'var(--sci)',fo:.18,c:'var(--sci)',w:1.5});
    const M=add(A,sc(v.s,u),sc(v.t,w)); S.arrow(A,add(A,sc(v.s,u)),{c:'var(--math)',w:3,hs:8}).arrow(add(A,sc(v.s,u)),M,{c:'var(--spark)',w:3,hs:8});
    S.dot(A,{r:4,c:'var(--muted)',l:'A'}).dot(M,{l:'M'}); return S.svg(); },
  info:v=>`${ar('AM')} = ${fmt(v.s)}${B('u')} + ${fmt(v.t)}${B('v')}`,
  note:`Quatre points <i>A</i>, <i>B</i>, <i>C</i>, <i>D</i> sont <b>coplanaires</b> si et seulement si ${ar('AD')} est combinaison linéaire de ${ar('AB')} et ${ar('AC')} (avec ${ar('AB')}, ${ar('AC')} non colinéaires).`},
 {h:'Deux droites de l’espace',p:`Deux droites de vecteurs directeurs ${B('u')} et ${B('v')} sont <b>parallèles</b> si ${B('u')} et ${B('v')} sont colinéaires. Sinon, elles sont <b>sécantes</b> si elles ont un point commun (elles sont alors coplanaires), et <b>gauches</b> sinon : ni parallèles, ni sécantes, elles ne sont dans aucun plan commun.`,
  params:[{id:'k',l:'Cas',min:0,max:2,v:0},azP],
  draw:v=>{ const A=[2,0,0], u=[0,1,.5], S=space({az:v.az}); S.seg(add(A,sc(-4,u)),add(A,sc(4,u)),{c:'var(--math)',w:3});
    const L=[[[-1,0,1.5],u],[A,[-1,.5,1]],[[0,0,2],[1,0,0]]][v.k]; S.seg(add(L[0],sc(-4,L[1])),add(L[0],sc(4,L[1])),{c:'var(--spark)',w:3});
    if(v.k===1) S.dot(A,{l:'I'}); return S.svg(); },
  info:v=>['<b>Parallèles</b> : même direction, pas de point commun.','<b>Sécantes</b> : un unique point commun <i>I</i>.','<b>Gauches</b> : directions différentes et aucun point commun. Tourne la vue : le croisement apparent n’est qu’un effet de perspective.'][v.k]},
 {h:'Classe les droites',p:`<i>d</i>₁ : <i>M</i> = (0 ; 0 ; 0) + <i>t</i>(1 ; 0 ; 0) et <i>d</i>₂ : <i>M</i> = (0 ; 1 ; 1) + <i>s</i>(0 ; 1 ; 0). Quelle est leur position relative&nbsp;?`,
  opts:['parallèles','sécantes','gauches','confondues'],ans:2,
  why:'Les directions (1 ; 0 ; 0) et (0 ; 1 ; 0) ne sont pas colinéaires. Un point commun vérifierait (<i>t</i> ; 0 ; 0) = (0 ; 1 + <i>s</i> ; 1), ce qui impose 0 = 1 sur la 3e coordonnée. Aucun point commun : les droites sont gauches.'},
 {h:'Fais-les se couper',p:`<i>d</i>₁ passe par (1 ; 0 ; 0) avec la direction (1 ; 1 ; 0). <i>d</i>₂ passe par (0 ; 0 ; <i>h</i>) avec la direction (0 ; 1 ; 0). Pour quelle hauteur <i>h</i> sont-elles sécantes&nbsp;? Tourne la vue pour vérifier.`,
  params:[{id:'h',l:'h',min:-3,max:3,step:.5,v:2},azP],
  draw:v=>{ const S=space({az:v.az}); S.seg([-3,-4,0],[5,4,0],{c:'var(--math)',w:3}).seg([0,-4,v.h],[0,4,v.h],{c:v.h===0?'var(--ok)':'var(--spark)',w:3}); if(v.h===0) S.dot([0,-1,0],{l:'I'}); return S.svg(); },
  info:v=>v.h===0?'Point commun <i>I</i>(0 ; −1 ; 0) : sécantes.':'Directions non colinéaires et pas de point commun : gauches.',
  ok:v=>v.h===0, why:'Un point de <i>d</i>₁ s’écrit (1 + <i>t</i> ; <i>t</i> ; 0), un point de <i>d</i>₂ s’écrit (0 ; <i>s</i> ; <i>h</i>). L’égalité impose <i>t</i> = −1, <i>s</i> = −1 et <i>h</i> = 0.'},
 {h:'Droite et plan, deux plans',p:`Une droite de direction ${B('w')} est <b>parallèle</b> à un plan dirigé par ${B('u')}, ${B('v')} si ${B('w')} est combinaison linéaire de ${B('u')} et ${B('v')}. Sinon, elle coupe le plan en un seul point. Deux plans distincts sont soit <b>parallèles</b> (mêmes directions), soit <b>sécants</b> selon une droite.`,
  fig:(()=>{ const S=space({az:35,el:20}); S.poly([[2.5,-3,0],[-2.5,-3,0],[-2.5,3,0],[2.5,3,0]],{fill:'var(--sci)',fo:.15,c:'var(--sci)',w:1.5});
    S.poly([[2.5,0,-2],[-2.5,0,-2],[-2.5,0,3],[2.5,0,3]],{fill:'var(--spark)',fo:.15,c:'var(--spark)',w:1.5}); S.seg([3,0,0],[-3,0,0],{c:'var(--accent)',w:4}); S.text([-2.5,0,0],'intersection',{dx:6,dy:16,c:'var(--accent)'}); return S.svg(); })(),
  note:'Dans l’espace, deux droites sans point commun ne sont pas forcément parallèles : elles peuvent être gauches. Dans le plan, ce cas n’existe pas.'},
 {kind:'Défi',h:'Droite parallèle au plan',p:`Le plan Π est dirigé par ${B('v')} = (1 ; 0 ; 1) et ${B('w')} = (0 ; 1 ; 1). Pour quelle valeur de <i>m</i> la droite de direction ${B('u')} = (1 ; 2 ; <i>m</i>) est-elle parallèle à Π&nbsp;?`,
  lab:'m =', ans:3, why:`Il faut ${B('u')} = <i>a</i>${B('v')} + <i>b</i>${B('w')} = (<i>a</i> ; <i>b</i> ; <i>a</i> + <i>b</i>). Les deux premières coordonnées donnent <i>a</i> = 1 et <i>b</i> = 2, donc <i>m</i> = <i>a</i> + <i>b</i> = 3.`},
]},

/* =============== 4. REPÈRES ET COORDONNÉES =============== */
{subj:'ga', sem:'all', id:'cms-ga-reperes', h:'Repères et coordonnées', p:'Choisir une base, lire des coordonnées, passer d’un repère à l’autre.', steps:[
 {h:'Base et repère',p:`Une <b>base</b> du plan est un couple (${B('e₁')}, ${B('e₂')}) de vecteurs non colinéaires. Un <b>repère</b> (<i>O</i> ; ${B('e₁')}, ${B('e₂')}) ajoute une origine. Le point <i>M</i> a les coordonnées (<i>x</i> ; <i>y</i>) si ${ar('OM')} = <i>x</i>${B('e₁')} + <i>y</i>${B('e₂')}. La base n’a pas besoin d’être orthogonale : incline ${B('e₂')}.`,
  params:[{id:'al',l:'Angle entre e₁ et e₂',min:30,max:150,step:15,v:60,u:'°'},{id:'x',l:'x',min:-3,max:3,v:2},{id:'y',l:'y',min:-3,max:3,v:1}],
  draw:v=>{ const e1=[1,0], e2=[Math.cos(rad(v.al)),Math.sin(rad(v.al))], P=plane({x:[-6,6],y:[-4,4],grid:false,axes:false}); oblique(P,e1,e2,10);
    vec(P,0,0,v.x,0,{c:'var(--math)'}); vec(P,v.x,0,v.y*e2[0],v.y*e2[1],{c:'var(--spark)'}); vec(P,0,0,1,0,{c:'var(--ink)',w:2,hs:7}); vec(P,0,0,e2[0],e2[1],{c:'var(--ink)',w:2,hs:7});
    P.dot(0,0,{r:4,c:'var(--muted)',l:'O',dx:-14,dy:14}).dot(v.x+v.y*e2[0],v.y*e2[1],{l:'M'}); return P.svg(); },
  info:v=>`<i>M</i> = (${fmt(v.x)} ; ${fmt(v.y)}) dans (<i>O</i> ; ${B('e₁')}, ${B('e₂')}) : ${ar('OM')} = ${fmt(v.x)}${B('e₁')} + ${fmt(v.y)}${B('e₂')}`},
 {h:'Lire des coordonnées',p:`Dans le repère usuel, ${B('e₁')} = (1 ; 0) et ${B('e₂')} = (1 ; 1). Le vecteur ${B('w')} = (3 ; 2) en coordonnées usuelles a quelles coordonnées dans la base (${B('e₁')}, ${B('e₂')})&nbsp;?`,
  opts:['(1 ; 2)','(3 ; 2)','(2 ; 1)','(1 ; 1)'],ans:0,
  why:`On cherche <i>a</i>${B('e₁')} + <i>b</i>${B('e₂')} = (<i>a</i> + <i>b</i> ; <i>b</i>) = (3 ; 2). Donc <i>b</i> = 2 et <i>a</i> = 1.`},
 {h:'Place le point',p:`La base est ${B('e₁')} = (1 ; 0) et ${B('e₂')} = (1 ; 2). Règle les coordonnées (<i>a</i> ; <i>b</i>) de <i>M</i> dans cette base pour qu’il tombe sur le point vert, qui vaut (4 ; 2) en coordonnées usuelles.`,
  params:[{id:'a',l:'a',min:-4,max:4,v:0},{id:'b',l:'b',min:-4,max:4,v:0}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-4,4],grid:false,axes:false}); oblique(P,[1,0],[1,2],12); vec(P,0,0,1,0,{c:'var(--ink)',w:2,hs:7}); vec(P,0,0,1,2,{c:'var(--ink)',w:2,hs:7});
    P.dot(4,2,{c:'var(--ok)',r:8}).dot(v.a+v.b,2*v.b,{l:'M'}).dot(0,0,{r:4,c:'var(--muted)',l:'O',dx:-14,dy:14}); return P.svg(); },
  info:v=>`<i>a</i>${B('e₁')} + <i>b</i>${B('e₂')} = ${c2(v.a+v.b,2*v.b)} en coordonnées usuelles`,
  ok:v=>v.a===3&&v.b===1, why:`(<i>a</i> + <i>b</i> ; 2<i>b</i>) = (4 ; 2) donne <i>b</i> = 1 et <i>a</i> = 3.`},
 {h:'Calculer avec des coordonnées',p:`Dans n’importe quel repère, les opérations se font sur les coordonnées : ${ar('AB')} = <i>B</i> − <i>A</i>, le milieu de [<i>AB</i>] est ${F('<i>A</i> + <i>B</i>','2')}, et <i>ABCD</i> est un parallélogramme si et seulement si ${ar('AB')} = ${ar('DC')}.`,
  fig:(()=>{ const P=plane({x:[-0.5,6],y:[-0.5,3.5],grid:false,axes:false}); P.poly([[0,0],[4,0],[5.5,3],[1.5,3]],{fill:'var(--accent)',fo:.1,c:'var(--ink)',w:2}); vec(P,0,0,4,0,{c:'var(--math)'}); vec(P,1.5,3,4,0,{c:'var(--math)'});
    P.dot(0,0,{r:4,l:'A',dx:-14,dy:14}).dot(4,0,{r:4,l:'B',dy:14}).dot(5.5,3,{r:4,l:'C',dy:-6}).dot(1.5,3,{r:4,l:'D',dx:-16,dy:-6}); return P.svg(); })(),
  note:'Le milieu, les vecteurs et la colinéarité se calculent dans <b>tout</b> repère. Les longueurs et les angles, eux, demandent un repère orthonormé.'},
 {h:'Le quatrième sommet',p:'<i>A</i>(−1 ; 4), <i>B</i>(5 ; −2), <i>C</i>(3 ; 3). On veut que <i>ABCD</i> soit un parallélogramme. Quelle est l’ordonnée de <i>D</i>&nbsp;?',
  lab:'y<sub>D</sub> =', ans:9, why:`${ar('AB')} = ${ar('DC')} donne <i>D</i> = <i>A</i> + <i>C</i> − <i>B</i> = (−1 + 3 − 5 ; 4 + 3 + 2) = (−3 ; 9).`},
 {h:'Changement de repère',p:`Un nouveau repère (<i>O′</i> ; ${B('e₁′')}, ${B('e₂′')}) est donné dans l’ancien. Si <i>M</i> a les nouvelles coordonnées (<i>x′</i> ; <i>y′</i>), alors ${ar('OM')} = ${ar('OO′')} + <i>x′</i>${B('e₁′')} + <i>y′</i>${B('e₂′')}, soit <div class="formula">(<i>x</i> ; <i>y</i>) = <i>O′</i> + <i>P</i>·(<i>x′</i> ; <i>y′</i>)</div> où la <b>matrice de passage</b> <i>P</i> a pour colonnes ${B('e₁′')} et ${B('e₂′')}. Ici le nouveau repère est orthonormé, tourné de φ.`,
  params:[{id:'a',l:'O′ : x',min:-2,max:2,v:1},{id:'b',l:'O′ : y',min:-2,max:2,v:0},{id:'f',l:'φ',min:0,max:90,step:15,v:30,u:'°'}],
  draw:v=>{ const c=Math.cos(rad(v.f)), s=Math.sin(rad(v.f)), P=plane({x:[-3,5],y:[-3,4],lab:1});
    P.seg(v.a-8*c,v.b-8*s,v.a+8*c,v.b+8*s,{c:'var(--spark)',w:1.5,dash:true}).seg(v.a+8*s,v.b-8*c,v.a-8*s,v.b+8*c,{c:'var(--spark)',w:1.5,dash:true});
    vec(P,v.a,v.b,c,s,{c:'var(--spark)',hs:8}); vec(P,v.a,v.b,-s,c,{c:'var(--spark)',hs:8}); P.dot(v.a,v.b,{r:4,c:'var(--spark)',l:'O′',dx:-20,dy:16}).dot(3,2,{l:'M'}); return P.svg(); },
  info:v=>{ const c=Math.cos(rad(v.f)), s=Math.sin(rad(v.f)), X=3-v.a, Y=2-v.b; return `<i>M</i> = (3 ; 2) dans l’ancien repère, <b>${c2(X*c+Y*s,-X*s+Y*c)}</b> dans le nouveau`; },
  note:'Pour aller dans l’autre sens, il faut inverser <i>P</i> : (<i>x′</i> ; <i>y′</i>) = <i>P</i>⁻¹·((<i>x</i> ; <i>y</i>) − <i>O′</i>). Si le nouveau repère est orthonormé direct, <i>P</i> est une rotation et <i>P</i>⁻¹ est sa transposée.'},
 {h:'Retour à l’ancien repère',p:`<i>O′</i> = (1 ; 2), ${B('e₁′')} = (1 ; 1), ${B('e₂′')} = (−1 ; 1) dans l’ancien repère. Le point <i>M</i> a les nouvelles coordonnées (2 ; 1). Quelle est son ordonnée dans l’ancien repère&nbsp;?`,
  lab:'y =', ans:5, why:`<i>M</i> = <i>O′</i> + 2${B('e₁′')} + 1${B('e₂′')} = (1 + 2 − 1 ; 2 + 2 + 1) = (2 ; 5).`},
 {h:'Repère orthonormé',p:`Un repère est <b>orthonormé</b> si ‖${B('e₁')}‖ = ‖${B('e₂')}‖ = 1 et ${B('e₁')}·${B('e₂')} = 0. C’est seulement dans ce cas que ${B('u')}·${B('v')} = <i>xx′</i> + <i>yy′</i> et ‖${B('u')}‖ = √(<i>x</i>² + <i>y</i>²). Dans une base quelconque, il faut développer : ‖<i>x</i>${B('e₁')} + <i>y</i>${B('e₂')}‖² = <i>x</i>²‖${B('e₁')}‖² + 2<i>xy</i> ${B('e₁')}·${B('e₂')} + <i>y</i>²‖${B('e₂')}‖².`,
  fig:(()=>{ const P=plane({x:[-0.5,3],y:[-0.5,2],grid:false,axes:false}); vec(P,0,0,1.5,0,{c:'var(--math)'}); vec(P,0,0,0,1.5,{c:'var(--spark)'}); P.poly([[0,.25],[.25,.25],[.25,0]],{open:true,c:'var(--ink)',w:1.5}).text(1.5,0,'e₁',{dy:16}).text(0,1.5,'e₂',{dx:8}); return P.svg(); })(),
  note:'Un repère orthonormé est <b>direct</b> si l’on passe de <b>e₁</b> à <b>e₂</b> par un quart de tour dans le sens trigonométrique.'},
 {kind:'Défi',h:'Le piège de la base oblique',p:`En coordonnées usuelles, ${B('e₁')} = (1 ; 0) et ${B('e₂')} = (1 ; 1). Le vecteur ${B('u')} a pour coordonnées (1 ; −1) dans la base (${B('e₁')}, ${B('e₂')}). Quelle est sa norme&nbsp;?`,
  lab:'‖u‖ =', ans:1, why:`${B('u')} = ${B('e₁')} − ${B('e₂')} = (0 ; −1) en coordonnées usuelles, donc ‖${B('u')}‖ = 1, et non √2. La formule √(<i>x</i>² + <i>y</i>²) ne vaut que dans une base orthonormée.`},
]},

/* =============== 5. DROITES DU PLAN =============== */
{subj:'ga', sem:'all', id:'cms-ga-droites', h:'Droites du plan', p:'Équations paramétriques et cartésiennes, vecteur normal, intersections, angles et distances.', steps:[
 {h:'Équations paramétriques',p:`La droite passant par <i>A</i>(<i>x</i>₀ ; <i>y</i>₀) de vecteur directeur ${B('u')} = (<i>u</i>₁ ; <i>u</i>₂) a pour équations paramétriques <div class="formula"><i>x</i> = <i>x</i>₀ + <i>t u</i>₁, <i>y</i> = <i>y</i>₀ + <i>t u</i>₂, <i>t</i> ∈ ℝ</div>`,
  params:[{id:'t',l:'t',min:-3,max:2,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-4,4],lab:2}); line2(P,1,-2,4,{c:'var(--line)',w:2}); vec(P,-2,1,2,1,{c:'var(--math)',w:2,hs:8}); vec(P,-2,1,2*v.t,v.t,{c:'var(--accent)'});
    P.dot(-2,1,{r:4,c:'var(--muted)',l:'A',dx:-12,dy:-10}).dot(-2+2*v.t,1+v.t,{l:'M'}); return P.svg(); },
  info:v=>`<i>A</i> = (−2 ; 1), ${B('u')} = (2 ; 1), <i>t</i> = ${fmt(v.t)} → <i>M</i> = ${c2(-2+2*v.t,1+v.t)}`},
 {h:'Équation cartésienne et vecteur normal',p:`Toute droite du plan a une équation <b>cartésienne</b> <i>ax</i> + <i>by</i> + <i>c</i> = 0, avec (<i>a</i> ; <i>b</i>) ≠ (0 ; 0). Le vecteur ${B('n')} = (<i>a</i> ; <i>b</i>) est <b>normal</b> à la droite (perpendiculaire), et ${B('u')} = (−<i>b</i> ; <i>a</i>) est un vecteur directeur.`,
  params:[{id:'a',l:'a',min:-3,max:3,v:1},{id:'b',l:'b',min:-3,max:3,v:2},{id:'c',l:'c',min:-6,max:6,v:-2}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-5,5],lab:2}); if(!v.a&&!v.b) return P.svg(); const q=v.a*v.a+v.b*v.b, H=[-v.c*v.a/q,-v.c*v.b/q];
    line2(P,v.a,v.b,v.c,{c:'var(--accent)',w:3}); vec(P,H[0],H[1],v.a,v.b,{c:'var(--math)'}); vec(P,H[0],H[1],-v.b,v.a,{c:'var(--spark)',w:2,hs:8});
    P.text(H[0]+v.a,H[1]+v.b,'n',{dx:6,c:'var(--math)'}).text(H[0]-v.b,H[1]+v.a,'u',{dx:6,c:'var(--spark)'}); return P.svg(); },
  info:v=>(!v.a&&!v.b)?'Avec <i>a</i> = <i>b</i> = 0, ce n’est plus une droite.':`${fmt(v.a)}<i>x</i> + ${fmt(v.b)}<i>y</i> + ${fmt(v.c)} = 0 · ${B('n')} = ${c2(v.a,v.b)}, ${B('u')} = ${c2(-v.b,v.a)}`,
  note:'Pour passer du paramétrique au cartésien : on prend <b>n</b> orthogonal à <b>u</b>, puis on trouve <i>c</i> en écrivant que <i>A</i> est sur la droite.'},
 {h:'Trouve l’équation',p:`Quelle est une équation cartésienne de la droite passant par <i>A</i>(1 ; 2) de vecteur directeur ${B('u')} = (3 ; 1)&nbsp;?`,
  opts:['3<i>x</i> + <i>y</i> − 5 = 0','<i>x</i> + 3<i>y</i> − 7 = 0','<i>x</i> − 3<i>y</i> + 5 = 0','3<i>x</i> − <i>y</i> − 1 = 0'],ans:2,
  why:`Un vecteur normal est ${B('n')} = (1 ; −3), orthogonal à (3 ; 1). Donc <i>x</i> − 3<i>y</i> + <i>c</i> = 0, et <i>A</i> donne 1 − 6 + <i>c</i> = 0, soit <i>c</i> = 5. Les trois autres équations passent aussi par <i>A</i>, mais leur direction n’est pas (3 ; 1).`},
 {h:'Le point d’intersection',p:'Place <i>P</i> à l’intersection de <i>d</i>₁ : 2<i>x</i> + <i>y</i> − 5 = 0 et <i>d</i>₂ : <i>x</i> − <i>y</i> − 1 = 0. Un point commun vérifie les deux équations à la fois.',
  params:[{id:'x',l:'x',min:-4,max:4,v:-2},{id:'y',l:'y',min:-4,max:4,v:3}],
  draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}); line2(P,2,1,-5,{c:'var(--math)'}); line2(P,1,-1,-1,{c:'var(--spark)'}); P.dot(v.x,v.y,{l:'P'}); return P.svg(); },
  info:v=>`<i>d</i>₁ : ${fmt(2*v.x+v.y-5)} · <i>d</i>₂ : ${fmt(v.x-v.y-1)} (les deux doivent valoir 0)`,
  ok:v=>v.x===2&&v.y===1, why:'En additionnant les équations : 3<i>x</i> − 6 = 0, donc <i>x</i> = 2, puis <i>y</i> = <i>x</i> − 1 = 1.',
  note:'Deux droites sont <b>parallèles</b> si leurs vecteurs normaux sont colinéaires : <i>ab′</i> − <i>a′b</i> = 0. Sinon, elles se coupent en un seul point.'},
 {h:'Angle entre deux droites',p:`L’angle θ entre deux droites est l’angle aigu (θ ∈ [0° ; 90°]) entre leurs directions. On le calcule avec les vecteurs normaux (ou directeurs) : <div class="formula">cos θ = ${F(`|${B('n')}₁·${B('n')}₂|`,`‖${B('n')}₁‖ ‖${B('n')}₂‖`)}</div> Les droites sont <b>perpendiculaires</b> si et seulement si ${B('n')}₁·${B('n')}₂ = 0.`,
  fig:(()=>{ const P=plane({x:[-4,4],y:[-3,3],grid:false,axes:false}); line2(P,1,2,0,{c:'var(--math)'}); line2(P,3,1,0,{c:'var(--spark)'}); vec(P,0,0,1,2,{c:'var(--math)',w:2,hs:8}); vec(P,0,0,3,1,{c:'var(--spark)',w:2,hs:8}); P.text(1,2,'n₁',{dx:6}).text(3,1,'n₂',{dy:-8}); return P.svg(); })(),
  note:'La valeur absolue au numérateur sert à obtenir l’angle aigu : <b>n</b> et −<b>n</b> sont normaux à la même droite.'},
 {h:'Calcule l’angle',p:'Quel est l’angle entre <i>d</i>₁ : <i>x</i> + 2<i>y</i> − 4 = 0 et <i>d</i>₂ : 3<i>x</i> + <i>y</i> + 1 = 0 (la figure précédente)&nbsp;?',
  lab:'θ =', unit:'°', ans:45, tol:.01, why:`${B('n')}₁·${B('n')}₂ = 1·3 + 2·1 = 5, ‖${B('n')}₁‖‖${B('n')}₂‖ = √5·√10 = √50. Donc cos θ = 5/√50 = 1/√2 et θ = 45°.`},
 {h:'Distance d’un point à une droite',p:`La distance de <i>P</i>(<i>x</i>₀ ; <i>y</i>₀) à la droite <i>ax</i> + <i>by</i> + <i>c</i> = 0 est <div class="formula">d = ${F('|<i>ax</i>₀ + <i>by</i>₀ + <i>c</i>|','√(<i>a</i>² + <i>b</i>²)')}</div> C’est la longueur <i>PH</i>, où <i>H</i> est le pied de la perpendiculaire. Ici la droite est 3<i>x</i> + 4<i>y</i> − 12 = 0.`,
  params:[{id:'x',l:'x₀',min:-4,max:6,v:-2},{id:'y',l:'y₀',min:-4,max:6,v:-1}],
  draw:v=>{ const k=(3*v.x+4*v.y-12)/25, H=[v.x-3*k,v.y-4*k], P=plane({x:[-5,7],y:[-5,7],lab:2}); line2(P,3,4,-12,{c:'var(--accent)'});
    P.seg(v.x,v.y,H[0],H[1],{c:'var(--spark)',w:2.5,dash:true}).dot(H[0],H[1],{r:4,c:'var(--muted)',l:'H'}).dot(v.x,v.y,{l:'P'}); return P.svg(); },
  info:v=>`d = |3·${fmt(v.x)} + 4·${fmt(v.y)} − 12| / 5 = ${fmt(Math.abs(3*v.x+4*v.y-12))}/5 = <b>${fmt(Math.abs(3*v.x+4*v.y-12)/5)}</b>`,
  note:'Le signe de <i>ax</i>₀ + <i>by</i>₀ + <i>c</i> indique de quel côté de la droite se trouve <i>P</i>.'},
 {h:'À toi',p:'Quelle est la distance du point <i>P</i>(1 ; −2) à la droite 8<i>x</i> − 6<i>y</i> + 5 = 0&nbsp;?',
  lab:'d =', ans:2.5, tol:.001, why:'|8·1 − 6·(−2) + 5| / √(64 + 36) = |8 + 12 + 5| / 10 = 25/10 = 2,5.'},
 {kind:'Défi',h:'Entre deux parallèles',p:'Quelle est la distance entre les droites parallèles 3<i>x</i> − 4<i>y</i> + 2 = 0 et 3<i>x</i> − 4<i>y</i> − 8 = 0&nbsp;?',
  lab:'d =', ans:2, tol:.001, why:'On prend un point de la 2e droite, par exemple (0 ; −2), et on calcule sa distance à la 1re : |0 + 8 + 2| / 5 = 2. En général : |<i>c</i> − <i>c′</i>| / √(<i>a</i>² + <i>b</i>²).'},
]},

/* =============== 6. TRANSFORMATIONS DU PLAN =============== */
{subj:'ga', sem:'all', id:'cms-ga-transfos', h:'Transformations du plan', p:'Translations, homothéties, rotations, symétries et projections : leurs formules, leurs matrices et leurs compositions.', steps:[
 {h:'Translation',p:`La <b>translation</b> de vecteur ${B('u')} = (<i>a</i> ; <i>b</i>) envoie <i>M</i> sur <i>M′</i> = <i>M</i> + ${B('u')} : <div class="formula"><i>x′</i> = <i>x</i> + <i>a</i>, <i>y′</i> = <i>y</i> + <i>b</i></div> Elle conserve les longueurs, les angles et l’orientation.`,
  params:[{id:'a',l:'a',min:-4,max:4,v:2},{id:'b',l:'b',min:-4,max:4,v:-3}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-5,6],lab:2}); P.poly(LSH,{fill:'var(--muted)',fo:.2,c:'var(--muted)',w:1.5}).poly(LSH.map(([x,y])=>[x+v.a,y+v.b]),{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:2}); vec(P,1,1,v.a,v.b,{c:'var(--spark)',w:2,hs:8}); return P.svg(); },
  info:v=>`${B('u')} = ${c2(v.a,v.b)} : (1 ; 1) ↦ ${c2(1+v.a,1+v.b)}`,
  note:'Une translation de vecteur non nul n’est pas linéaire (l’origine bouge) : elle n’a pas de matrice 2×2. C’est une transformation <b>affine</b>.'},
 {h:'Homothétie',p:`L’<b>homothétie</b> de centre Ω et de rapport <i>k</i> ≠ 0 envoie <i>M</i> sur <i>M′</i> tel que ${ar('ΩM′')} = <i>k</i> ${ar('ΩM')}. De centre <i>O</i>, sa matrice est ${mat([['<i>k</i>',0],[0,'<i>k</i>']])}. Les longueurs sont multipliées par |<i>k</i>| et les aires par <i>k</i>².`,
  params:[{id:'k',l:'k',min:-2,max:2,step:.25,v:1.5}],
  draw:v=>{ const P=plane({x:[-7,7],y:[-7,7],lab:2}); [[2.5,1],[1,3]].forEach(([x,y])=>P.seg(0,0,v.k*x,v.k*y,{c:'var(--line)',w:1.5,dash:true}));
    P.poly(LSH,{fill:'var(--muted)',fo:.2,c:'var(--muted)',w:1.5}); if(v.k) P.poly(LSH.map(([x,y])=>[v.k*x,v.k*y]),{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:2}); P.dot(0,0,{r:4,c:'var(--ink)'}); return P.svg(); },
  info:v=>v.k?`<i>k</i> = ${fmt(v.k)} : longueurs ×${fmt(Math.abs(v.k))}, aires ×${fmt(v.k*v.k,4)}${v.k===-1?' (symétrie centrale)':''}`:'<i>k</i> = 0 n’est pas une homothétie : tout s’écrase sur le centre.',
  note:'Pour <i>k</i> = −1, on obtient la <b>symétrie centrale</b> de centre Ω.'},
 {h:'Homothétie de centre Ω',p:'Quelle est l’ordonnée de l’image de <i>M</i>(2 ; −1) par l’homothétie de centre Ω(1 ; 1) et de rapport 3&nbsp;?',
  lab:'y′ =', ans:-5, why:`<i>M′</i> = Ω + 3 ${ar('ΩM')} = (1 ; 1) + 3·(1 ; −2) = (4 ; −5).`},
 {h:'Rotation',p:`La <b>rotation</b> de centre <i>O</i> et d’angle θ (sens trigonométrique) a pour matrice <div class="formula">R<sub>θ</sub> = ${mat([['cos θ','−sin θ'],['sin θ','cos θ']])}</div> Ses colonnes sont les images de ${B('e₁')} et ${B('e₂')}. Elle conserve longueurs, angles et orientation.`,
  params:[{id:'t',l:'θ',min:0,max:345,step:15,v:60,u:'°'}],
  draw:v=>{ const c=Math.cos(rad(v.t)), s=Math.sin(rad(v.t)), P=plane({x:[-4,4],y:[-4,4],lab:1});
    P.poly(LSH,{fill:'var(--muted)',fo:.2,c:'var(--muted)',w:1.5}).poly(LSH.map(([x,y])=>[c*x-s*y,s*x+c*y]),{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:2});
    vec(P,0,0,c,s,{c:'var(--math)',w:2,hs:8}); vec(P,0,0,-s,c,{c:'var(--spark)',w:2,hs:8}); return P.svg(); },
  info:v=>{ const z=x=>Math.abs(x)<1e-9?0:x, c=z(Math.cos(rad(v.t))), s=z(Math.sin(rad(v.t))); return `R<sub>${v.t}°</sub> ≈ ${mat([[fmt(c,3),fmt(-s,3)],[fmt(s,3),fmt(c,3)]])}`; }},
 {h:'Un quart de tour',p:'Quelle est l’abscisse de l’image de <i>M</i>(2 ; 1) par la rotation de centre <i>O</i> et d’angle 90°&nbsp;?',
  lab:'x′ =', ans:-1, why:`R<sub>90°</sub> = ${mat([[0,-1],[1,0]])}, donc (<i>x</i> ; <i>y</i>) ↦ (−<i>y</i> ; <i>x</i>) et (2 ; 1) ↦ (−1 ; 2).`},
 {h:'Symétrie axiale et projection',p:`Pour la droite passant par <i>O</i> qui fait un angle α avec l’axe <i>Ox</i> : la <b>symétrie axiale</b> a pour matrice ${mat([['cos 2α','sin 2α'],['sin 2α','−cos 2α']])} et la <b>projection orthogonale</b> sur cette droite ${mat([['cos²α','cos α sin α'],['cos α sin α','sin²α']])}.`,
  params:[{id:'al',l:'α',min:0,max:165,step:15,v:30,u:'°'},{id:'m',l:'0 : symétrie · 1 : projection',min:0,max:1,v:0}],
  draw:v=>{ const c=Math.cos(rad(v.al)), s=Math.sin(rad(v.al)), M=v.m?[[c*c,c*s],[c*s,s*s]]:[[c*c-s*s,2*c*s],[2*c*s,s*s-c*c]], P=plane({x:[-4,4],y:[-4,4],lab:1});
    P.seg(-6*c,-6*s,6*c,6*s,{c:'var(--sci)',w:2}); const T=LSH.map(([x,y])=>[M[0][0]*x+M[0][1]*y,M[1][0]*x+M[1][1]*y]);
    P.poly(LSH,{fill:'var(--muted)',fo:.2,c:'var(--muted)',w:1.5}).poly(T,{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:v.m?4:2}); return P.svg(); },
  info:v=>{ const z=x=>Math.abs(x)<1e-9?0:x, c=Math.cos(rad(v.al)), s=Math.sin(rad(v.al)), M=v.m?[[c*c,c*s],[c*s,s*s]]:[[c*c-s*s,2*c*s],[2*c*s,s*s-c*c]];
    return `${v.m?'Projection':'Symétrie'} : ${mat(M.map(r=>r.map(x=>fmt(z(x),3))))}${v.m?' · tout s’écrase sur la droite (det = 0)':' · l’orientation s’inverse (det = −1)'}`; },
  note:'Une projection n’est pas bijective : appliquée deux fois, elle ne change plus rien (<i>P</i>² = <i>P</i>). Une symétrie appliquée deux fois redonne l’identité (<i>S</i>² = <i>I</i>).'},
 {h:'Quelle matrice&nbsp;?',p:'Quelle est la matrice de la symétrie orthogonale par rapport à la droite <i>y</i> = <i>x</i>&nbsp;?',
  opts:[mat([[1,0],[0,-1]]),mat([[0,-1],[1,0]]),mat([[-1,0],[0,-1]]),mat([[0,1],[1,0]])],ans:3,
  why:`α = 45°, donc cos 2α = 0 et sin 2α = 1 : ${mat([[0,1],[1,0]])}. Elle échange les coordonnées : (<i>x</i> ; <i>y</i>) ↦ (<i>y</i> ; <i>x</i>).`},
 {h:'Composer, c’est multiplier',p:`Faire <i>f</i> puis <i>g</i>, c’est <i>g</i> ∘ <i>f</i>, de matrice <i>G</i>·<i>F</i> (la première appliquée est à droite). La forme pointillée est l’image de la figure grise par la symétrie d’axe <i>Ox</i>, <b>suivie</b> de la symétrie d’axe <i>y</i> = <i>x</i>. Trouve la rotation qui fait la même chose.`,
  params:[{id:'t',l:'θ',min:0,max:345,step:15,v:0,u:'°'}],
  draw:v=>{ const c=Math.cos(rad(v.t)), s=Math.sin(rad(v.t)), P=plane({x:[-4,4],y:[-4,4],lab:1});
    P.poly(LSH,{fill:'var(--muted)',fo:.2,c:'var(--muted)',w:1.5}).poly(LSH.map(([x,y])=>[-y,x]),{c:'var(--ok)',w:2.5,dash:true}).poly(LSH.map(([x,y])=>[c*x-s*y,s*x+c*y]),{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:2}); return P.svg(); },
  info:v=>`Rotation d’angle ${v.t}°`,
  ok:v=>v.t===90, why:`${mat([[0,1],[1,0]])}·${mat([[1,0],[0,-1]])} = ${mat([[0,-1],[1,0]])} = R<sub>90°</sub>. En général, deux symétries d’axes faisant un angle α donnent une rotation d’angle 2α.`},
 {kind:'Défi',h:'Matrice d’une composée',p:'On applique d’abord la rotation de centre <i>O</i> d’angle 90°, puis la projection orthogonale sur l’axe <i>Ox</i>. Quelle est la matrice de la composée&nbsp;?',
  opts:[mat([[0,0],[1,0]]),mat([[0,-1],[0,0]]),mat([[0,1],[0,0]]),mat([[1,0],[0,0]])],ans:1,
  why:`La projection agit en second, donc elle est à gauche : ${mat([[1,0],[0,0]])}·${mat([[0,-1],[1,0]])} = ${mat([[0,-1],[0,0]])}. Vérification : (2 ; 1) tourne en (−1 ; 2), puis se projette en (−1 ; 0).`},
]},

/* =============== 7. DROITES ET PLANS DE L’ESPACE =============== */
{subj:'ga', sem:'all', id:'cms-ga-plans', h:'Droites et plans de l’espace', p:'Équations de droites et de plans en 3D, vecteur normal, intersections et distance d’un point à un plan.', steps:[
 {h:'Droite de l’espace',p:`Une droite de l’espace a des équations paramétriques (<i>x</i> ; <i>y</i> ; <i>z</i>) = <i>A</i> + <i>t</i>${B('u')}. Elle n’a <b>pas</b> d’équation cartésienne unique : il en faut deux, car c’est l’intersection de deux plans. Si les <i>u<sub>i</sub></i> sont non nuls : <div class="formula">${F('<i>x</i> − <i>x</i>₀','<i>u</i>₁')} = ${F('<i>y</i> − <i>y</i>₀','<i>u</i>₂')} = ${F('<i>z</i> − <i>z</i>₀','<i>u</i>₃')}</div>`,
  params:[{id:'t',l:'t',min:-2,max:2,step:.5,v:.5},azP],
  draw:v=>{ const A=[1,0,1], u=[1,2,-1], S=space({az:v.az}); S.seg(add(A,sc(-4,u)),add(A,sc(4,u)),{c:'var(--accent)',w:3}); S.arrow(A,add(A,u),{c:'var(--math)',w:2.5,hs:8}); S.dot(A,{r:4,c:'var(--muted)',l:'A'}).dot(add(A,sc(v.t,u)),{l:'M'}); return S.svg(); },
  info:v=>`<i>A</i> = (1 ; 0 ; 1), ${B('u')} = (1 ; 2 ; −1) → <i>M</i> = ${c3(1+v.t,2*v.t,1-v.t)} · <i>x</i> − 1 = <i>y</i>/2 = −(<i>z</i> − 1)`},
 {h:'Équation d’un plan',p:`Un plan a une équation cartésienne <i>ax</i> + <i>by</i> + <i>cz</i> + <i>d</i> = 0. Le vecteur ${B('n')} = (<i>a</i> ; <i>b</i> ; <i>c</i>) est <b>normal</b> au plan : il est orthogonal à tous les vecteurs du plan. Change ${B('n')} et regarde le plan pivoter autour de l’origine.`,
  params:[{id:'a',l:'a',min:-2,max:2,v:1},{id:'b',l:'b',min:-2,max:2,v:0},{id:'c',l:'c',min:-2,max:2,v:2}],
  draw:v=>{ const S=space({az:30}), n=[v.a,v.b,v.c]; if(!nr(n)) return S.svg(); patch(S,n,[0,0,0],2.6); S.arrow([0,0,0],sc(2.2/nr(n),n),{c:'var(--math)',w:3,hs:9}); S.text(sc(2.2/nr(n),n),'n',{dx:6,c:'var(--math)'}); S.dot([0,0,0],{r:4,c:'var(--ink)'}); return S.svg(); },
  info:v=>nr([v.a,v.b,v.c])?`${fmt(v.a)}<i>x</i> + ${fmt(v.b)}<i>y</i> + ${fmt(v.c)}<i>z</i> = 0 · ${B('n')} = ${c3(v.a,v.b,v.c)}`:'Avec <b>n</b> = 0, l’équation 0 = 0 ne définit pas de plan.',
  note:`Le plan passant par <i>A</i> de vecteur normal <b>n</b> : <i>M</i> est dans le plan si et seulement si ${ar('AM')}·<b>n</b> = 0. On développe et on obtient <i>d</i>.`},
 {h:'Trouve le plan',p:`Quelle est l’équation du plan passant par <i>A</i>(1 ; 0 ; 2) de vecteur normal ${B('n')} = (2 ; −1 ; 3)&nbsp;?`,
  opts:['2<i>x</i> − <i>y</i> + 3<i>z</i> + 8 = 0','2<i>x</i> − <i>y</i> + 3<i>z</i> − 8 = 0','<i>x</i> + 2<i>z</i> − 5 = 0','2<i>x</i> − <i>y</i> + 3<i>z</i> − 5 = 0'],ans:1,
  why:'2<i>x</i> − <i>y</i> + 3<i>z</i> + <i>d</i> = 0 et <i>A</i> donne 2 − 0 + 6 + <i>d</i> = 0, soit <i>d</i> = −8. La 3e équation passe par <i>A</i> mais n’a pas le bon vecteur normal.'},
 {h:'Intersections',p:`Pour couper une droite paramétrique avec un plan cartésien, on <b>remplace</b> <i>x</i>, <i>y</i>, <i>z</i> par leurs expressions en <i>t</i> dans l’équation du plan. On obtient une équation en <i>t</i> : une solution (un point), aucune (droite parallèle au plan), ou toutes (droite contenue dans le plan). La droite est parallèle au plan exactement quand ${B('u')}·${B('n')} = 0.`,
  fig:(()=>{ const S=space({az:30}); patch(S,[0,0,1],[0,0,0],3); S.seg([-1,-2,-2.5],[1,2,2.5],{c:'var(--accent)',w:3}); S.dot([0,0,0],{l:'I'}); return S.svg(); })(),
  note:'Pour deux plans, on résout un système de deux équations à trois inconnues : on obtient une droite (un paramètre libre), ou rien si les plans sont strictement parallèles.'},
 {h:'Le point de percée',p:'La droite (<i>x</i> ; <i>y</i> ; <i>z</i>) = (1 ; 2 ; 0) + <i>t</i>(1 ; −1 ; 2) coupe le plan <i>x</i> + <i>y</i> + <i>z</i> − 6 = 0 en un point <i>I</i>. Quelle est la cote <i>z</i> de <i>I</i>&nbsp;?',
  lab:'z =', ans:3, why:'(1 + <i>t</i>) + (2 − <i>t</i>) + 2<i>t</i> − 6 = 0 donne 2<i>t</i> − 3 = 0, donc <i>t</i> = 1,5 et <i>I</i> = (2,5 ; 0,5 ; 3).'},
 {h:'Deux plans',p:`Deux plans de vecteurs normaux ${B('n')}₁ et ${B('n')}₂ sont <b>parallèles</b> si ${B('n')}₁ et ${B('n')}₂ sont colinéaires, et <b>perpendiculaires</b> si ${B('n')}₁·${B('n')}₂ = 0. Sinon, ils se coupent selon une droite, dont un vecteur directeur est orthogonal à ${B('n')}₁ et à ${B('n')}₂.`,
  fig:(()=>{ const S=space({az:35}); patch(S,[0,0,1],[0,0,0],2.6); patch(S,[0,1,0],[0,0,.5],2.4,{fill:'var(--spark)',c:'var(--spark)'}); S.seg([3,0,0],[-3,0,0],{c:'var(--accent)',w:4}); S.arrow([0,0,0],[0,0,1.8],{c:'var(--math)',w:2.5,hs:8}).arrow([0,0,0],[0,1.8,0],{c:'var(--spark)',w:2.5,hs:8}); S.text([0,0,1.8],'n₁',{dx:6}).text([0,1.8,0],'n₂',{dx:6}); return S.svg(); })(),
  note:'Le chapitre sur le produit vectoriel donne directement ce vecteur directeur : <b>n</b>₁ × <b>n</b>₂.'},
 {h:'Position de deux plans',p:'Quelle est la position relative des plans <i>x</i> + <i>y</i> − <i>z</i> = 1 et 2<i>x</i> + 2<i>y</i> − 2<i>z</i> = 5&nbsp;?',
  opts:['sécants selon une droite','perpendiculaires','confondus','strictement parallèles'],ans:3,
  why:'Les normales (1 ; 1 ; −1) et (2 ; 2 ; −2) sont colinéaires, donc les plans sont parallèles. La 2e équation équivaut à <i>x</i> + <i>y</i> − <i>z</i> = 2,5 ≠ 1 : ils sont distincts.'},
 {h:'Règle la distance',p:`La distance d’un point <i>P</i>(<i>x</i>₀ ; <i>y</i>₀ ; <i>z</i>₀) au plan <i>ax</i> + <i>by</i> + <i>cz</i> + <i>d</i> = 0 vaut <div class="formula">${F('|<i>ax</i>₀ + <i>by</i>₀ + <i>cz</i>₀ + <i>d</i>|','√(<i>a</i>² + <i>b</i>² + <i>c</i>²)')}</div> Règle <i>d</i> pour que le plan <i>x</i> + 2<i>y</i> + 2<i>z</i> + <i>d</i> = 0 soit à distance 2 de l’origine.`,
  params:[{id:'d',l:'d',min:-9,max:9,v:0}],
  draw:v=>{ const n=[1,2,2], H=sc(-v.d/9,n), S=space({az:20,el:15,r:4}); patch(S,n,H,1.8,{fill:Math.abs(v.d)===6?'var(--ok)':'var(--sci)',c:Math.abs(v.d)===6?'var(--ok)':'var(--sci)'});
    S.seg([0,0,0],H,{c:'var(--spark)',w:3,dash:true}); S.dot([0,0,0],{r:5,c:'var(--ink)',l:'O'}); if(v.d) S.dot(H,{r:4,l:'H'}); return S.svg(); },
  info:v=>`distance = |${fmt(v.d)}| / √(1 + 4 + 4) = ${fmt(Math.abs(v.d))}/3 = <b>${fmt(Math.abs(v.d)/3)}</b>`,
  ok:v=>Math.abs(v.d)===6, why:'‖<b>n</b>‖ = √9 = 3, donc la distance de <i>O</i> vaut |<i>d</i>|/3 = 2, soit <i>d</i> = 6 ou <i>d</i> = −6 : deux plans parallèles, un de chaque côté.'},
 {kind:'Défi',h:'Distance point-plan',p:'Quelle est la distance du point <i>P</i>(2 ; 3 ; −1) au plan 2<i>x</i> + <i>y</i> − 2<i>z</i> + 3 = 0&nbsp;?',
  lab:'d =', ans:4, tol:.001, why:'|2·2 + 3 − 2·(−1) + 3| / √(4 + 1 + 4) = |4 + 3 + 2 + 3| / 3 = 12/3 = 4.'},
]},

/* =============== 8. PRODUIT VECTORIEL =============== */
{subj:'ga', sem:'all', id:'cms-ga-vectoriel', h:'Produit vectoriel et géométrie 3D', p:'Un vecteur orthogonal à deux autres, qui mesure des aires et, avec le produit mixte, des volumes.', steps:[
 {h:'Le produit vectoriel',p:`Pour ${B('u')}, ${B('v')} de l’espace, ${B('u')} × ${B('v')} est le vecteur <b>orthogonal</b> à ${B('u')} et à ${B('v')}, de norme ‖${B('u')}‖ ‖${B('v')}‖ sin θ, et tel que (${B('u')}, ${B('v')}, ${B('u')} × ${B('v')}) soit direct (<b>règle de la main droite</b> : pouce ${B('u')}, index ${B('v')}, majeur ${B('u')} × ${B('v')}). Fais tourner ${B('v')} dans le plan horizontal.`,
  params:[{id:'t',l:'Angle θ de u à v',min:0,max:345,step:15,v:60,u:'°'},azP],
  draw:v=>{ const u=[2,0,0], w=[2*Math.cos(rad(v.t)),2*Math.sin(rad(v.t)),0], k=4*Math.sin(rad(v.t)), S=space({az:v.az});
    S.poly([[0,0,0],u,add(u,w),w],{fill:'var(--sci)',fo:.2,c:'var(--sci)',w:1}); S.arrow([0,0,0],u,{c:'var(--math)',w:3,hs:9}).arrow([0,0,0],w,{c:'var(--spark)',w:3,hs:9});
    S.arrow([0,0,0],[0,0,k*.75],{c:'var(--accent)',w:4,hs:10}); S.text(u,'u',{dx:-14,dy:12,c:'var(--math)'}).text(w,'v',{dx:6,c:'var(--spark)'}); if(Math.abs(k)>.1) S.text([0,0,k*.75],'u × v',{dx:8,c:'var(--accent)'}); return S.svg(); },
  info:v=>{ const k=4*Math.sin(rad(v.t)), z=Math.abs(k)<1e-9?0:k; return `${B('u')} = (2 ; 0 ; 0), ${B('v')} = (2 cos θ ; 2 sin θ ; 0) → ${B('u')} × ${B('v')} = ${c3(0,0,z)} · ‖${B('u')} × ${B('v')}‖ = ${fmt(Math.abs(z))}`; },
  note:'Au-delà de 180°, le vecteur change de sens : le produit vectoriel dépend de l’ordre. Il est nul si et seulement si <b>u</b> et <b>v</b> sont colinéaires.'},
 {h:'En composantes',p:`Dans un repère orthonormé direct : <div class="formula">${B('u')} × ${B('v')} = (<i>u</i>₂<i>v</i>₃ − <i>u</i>₃<i>v</i>₂ ; <i>u</i>₃<i>v</i>₁ − <i>u</i>₁<i>v</i>₃ ; <i>u</i>₁<i>v</i>₂ − <i>u</i>₂<i>v</i>₁)</div> Calcule la 2e composante de (1 ; 2 ; 3) × (4 ; 5 ; 6).`,
  lab:'2e composante =', ans:6, why:'(2·6 − 3·5 ; 3·4 − 1·6 ; 1·5 − 2·4) = (−3 ; 6 ; −3). Vérification : (−3 ; 6 ; −3)·(1 ; 2 ; 3) = −3 + 12 − 9 = 0.'},
 {h:'L’ordre compte',p:`Que vaut ${B('v')} × ${B('u')}&nbsp;?`,
  opts:[`${B('u')} × ${B('v')}`,`−(${B('u')} × ${B('v')})`,'le vecteur nul',`‖${B('u')}‖ ‖${B('v')}‖`],ans:1,
  why:`Le produit vectoriel est <b>antisymétrique</b> : échanger les facteurs inverse le sens (la main droite se retourne). Par exemple ${B('e₁')} × ${B('e₂')} = ${B('e₃')} mais ${B('e₂')} × ${B('e₁')} = −${B('e₃')}.`},
 {h:'Aire d’un parallélogramme',p:`La norme ‖${B('u')} × ${B('v')}‖ = ‖${B('u')}‖ ‖${B('v')}‖ sin θ est l’<b>aire du parallélogramme</b> construit sur ${B('u')} et ${B('v')} (base × hauteur). Le triangle <i>ABC</i> a donc pour aire ½ ‖${ar('AB')} × ${ar('AC')}‖.`,
  fig:(()=>{ const S=space({az:30}); const A=[1,0,0], Bp=[0,2,0], C=[0,0,3]; S.poly([A,Bp,C],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:2}); S.dot(A,{r:4,l:'A',dx:-16}).dot(Bp,{r:4,l:'B'}).dot(C,{r:4,l:'C'}); return S.svg(); })(),
  note:`Le même vecteur ${ar('AB')} × ${ar('AC')} est normal au plan <i>ABC</i> : une seule formule donne l’aire et la normale.`},
 {h:'Aire d’un triangle',p:'Quelle est l’aire du triangle <i>A</i>(1 ; 0 ; 0), <i>B</i>(0 ; 2 ; 0), <i>C</i>(0 ; 0 ; 3) de la figure&nbsp;?',
  lab:'aire =', ans:3.5, tol:.001, why:`${ar('AB')} = (−1 ; 2 ; 0), ${ar('AC')} = (−1 ; 0 ; 3), ${ar('AB')} × ${ar('AC')} = (6 ; 3 ; 2), de norme √(36 + 9 + 4) = 7. Aire = 7/2 = 3,5.`},
 {h:'Normale à un plan',p:`Un vecteur normal au plan <i>ABC</i> est ${ar('AB')} × ${ar('AC')}. Avec les points de l’exercice précédent, quelle est l’équation du plan <i>ABC</i>&nbsp;?`,
  opts:['<i>x</i> + 2<i>y</i> + 3<i>z</i> − 1 = 0','6<i>x</i> + 3<i>y</i> + 2<i>z</i> = 0','6<i>x</i> + 3<i>y</i> + 2<i>z</i> − 6 = 0','3<i>x</i> + 6<i>y</i> + 2<i>z</i> − 6 = 0'],ans:2,
  why:'Normale (6 ; 3 ; 2), donc 6<i>x</i> + 3<i>y</i> + 2<i>z</i> + <i>d</i> = 0, et <i>A</i>(1 ; 0 ; 0) donne <i>d</i> = −6. Vérifie avec <i>B</i> : 6 − 6 = 0 et <i>C</i> : 6 − 6 = 0. C’est aussi <i>x</i>/1 + <i>y</i>/2 + <i>z</i>/3 = 1.'},
 {h:'Produit mixte et volume',p:`Le <b>produit mixte</b> [${B('u')}, ${B('v')}, ${B('w')}] = (${B('u')} × ${B('v')})·${B('w')} est le déterminant des trois vecteurs. Sa valeur absolue est le <b>volume du parallélépipède</b> construit sur eux (aire de base × hauteur). Il est nul si et seulement si les trois vecteurs sont coplanaires. Change la hauteur de ${B('w')}.`,
  params:[{id:'h',l:'cote de w',min:-2,max:3,step:.5,v:1.5},azP],
  draw:v=>{ const u=[2,0,0], w2=[0,2,0], w=[1,1,v.h], S=space({az:v.az}), O=[0,0,0], base=[O,u,add(u,w2),w2], top=base.map(p=>add(p,w));
    S.poly(base,{fill:'var(--sci)',fo:.2,c:'var(--sci)',w:1.5}); S.poly(top,{fill:'var(--accent)',fo:.12,c:'var(--accent)',w:1.5}); base.forEach((p,i)=>S.seg(p,top[i],{c:'var(--muted)',w:1.5}));
    S.arrow(O,u,{c:'var(--math)',w:3,hs:8}).arrow(O,w2,{c:'var(--math)',w:3,hs:8}).arrow(O,w,{c:'var(--spark)',w:3,hs:8}); S.text(w,'w',{dx:6,c:'var(--spark)'}); return S.svg(); },
  info:v=>`${B('u')} × ${B('v')} = (2 ; 0 ; 0) × (0 ; 2 ; 0) = (0 ; 0 ; 4) · [${B('u')}, ${B('v')}, ${B('w')}] = 4·${fmt(v.h)} = ${fmt(4*v.h)} · volume = <b>${fmt(Math.abs(4*v.h))}</b>${v.h===0?' (coplanaires)':''}`,
  note:'Le tétraèdre construit sur les mêmes trois vecteurs a un volume six fois plus petit : |[<b>u</b>, <b>v</b>, <b>w</b>]| / 6.'},
 {h:'Calcule un volume',p:`Quel est le volume du parallélépipède construit sur ${B('u')} = (1 ; 1 ; 0), ${B('v')} = (0 ; 1 ; 1) et ${B('w')} = (1 ; 0 ; 1)&nbsp;?`,
  lab:'V =', ans:2, tol:.001, why:`${B('u')} × ${B('v')} = (1·1 − 0·1 ; 0·0 − 1·1 ; 1·1 − 1·0) = (1 ; −1 ; 1), puis (1 ; −1 ; 1)·(1 ; 0 ; 1) = 2. Volume = |2| = 2.`},
 {kind:'Défi',h:'Distance entre droites gauches',p:`Pour deux droites gauches (<i>A</i> ; ${B('u')}) et (<i>B</i> ; ${B('v')}), la distance est le volume du parallélépipède divisé par l’aire de sa base : <div class="formula">d = ${F(`|[${ar('AB')}, ${B('u')}, ${B('v')}]|`,`‖${B('u')} × ${B('v')}‖`)}</div> Calcule la distance entre <i>d</i>₁ : (0 ; 0 ; 0) + <i>t</i>(1 ; 0 ; 1) et <i>d</i>₂ : (3 ; 0 ; 0) + <i>s</i>(0 ; 1 ; 1). Arrondis au centième.`,
  lab:'d =', ans:1.73, tol:.006, why:`${B('u')} × ${B('v')} = (0·1 − 1·1 ; 1·0 − 1·1 ; 1·1 − 0·0) = (−1 ; −1 ; 1), de norme √3. ${ar('AB')} = (3 ; 0 ; 0) donne (${B('u')} × ${B('v')})·${ar('AB')} = −3. Donc d = 3/√3 = √3 ≈ 1,73.`},
]},

);
})();
