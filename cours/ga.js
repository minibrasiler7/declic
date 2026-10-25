/* Déclic — Géométrie analytique */
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
// repère 3D sans axes, recentré sur le point c (pour les figures des problèmes)
const spc=(c,o={})=>{ const S=space(Object.assign({axes:false},o)), m=p=>p.map((x,i)=>x-c[i]), W={
  seg:(a,b,q)=>(S.seg(m(a),m(b),q),W), arrow:(a,b,q)=>(S.arrow(m(a),m(b),q),W), poly:(p,q)=>(S.poly(p.map(m),q),W),
  dot:(a,q)=>(S.dot(m(a),q),W), text:(a,t,q)=>(S.text(m(a),t,q),W), svg:()=>S.svg()}; return W; };

COURS.push(

/* =============== 1. VECTEURS =============== */
{subj:'ga', sem:'all', id:'ga-vecteurs', h:'Vecteurs et calcul vectoriel', p:'Additionner, étirer et combiner des flèches, puis reconnaître des vecteurs colinéaires.', steps:[
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
 {kind:'Problème',h:'Le centre de gravité d’un triangle',
  p:`Le triangle <i>ABC</i> a pour sommets <i>A</i>(−1 ; −2), <i>B</i>(5 ; 0) et <i>C</i>(2 ; 5). Une <b>médiane</b> relie un sommet au milieu du côté opposé : <i>A′</i>, <i>B′</i>, <i>C′</i> sont les milieux de [<i>BC</i>], [<i>CA</i>] et [<i>AB</i>]. On veut montrer avec des vecteurs que les trois médianes se coupent en un même point <i>G</i>, situé aux deux tiers de chacune en partant du sommet.`,
  fig:(()=>{ const P=plane({x:[-2,6],y:[-3,6],lab:2}), A=[-1,-2], Bq=[5,0], C=[2,5];
    P.poly([A,Bq,C],{fill:'var(--accent)',fo:.1,c:'var(--ink)',w:2});
    [[A,[3.5,2.5]],[Bq,[.5,1.5]],[C,[2,-1]]].forEach(([s,m])=>P.seg(s[0],s[1],m[0],m[1],{c:'var(--math)',w:2,dash:true}));
    P.dot(-1,-2,{r:4,l:'A',dx:-14,dy:16}).dot(5,0,{r:4,l:'B'}).dot(2,5,{r:4,l:'C'}).dot(3.5,2.5,{r:4,c:'var(--muted)',l:'A′'}).dot(2,1,{l:'G',dx:10,dy:16}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’abscisse de <i>A′</i>&nbsp;?',lab:'x =',ans:3.5,tol:.001,hint:'Les coordonnées d’un milieu sont les moyennes des coordonnées des extrémités.',why:'<i>A′</i> = ((5 + 2)/2 ; (0 + 5)/2) = (3,5 ; 2,5).'},
   {q:`b) On place <i>G</i> sur [<i>AA′</i>] tel que ${ar('AG')} = ⅔ ${ar('AA′')}. Quelle est l’ordonnée de <i>G</i>&nbsp;?`,lab:'y =',ans:1,tol:.001,hint:`Calcule ${ar('AA′')} (arrivée moins départ), multiplie par ⅔, puis ajoute le résultat aux coordonnées de <i>A</i>.`,why:`${ar('AA′')} = (4,5 ; 4,5), donc ${ar('AG')} = (3 ; 3) et <i>G</i> = (−1 + 3 ; −2 + 3) = (2 ; 1).`},
   {q:`c) Que vaut ${ar('GA')} + ${ar('GB')} + ${ar('GC')}&nbsp;?`,opts:[`3 ${ar('GA′')}`,`${ar('AA′')}`,'le vecteur nul',`2 ${ar('AG')}`],ans:2,hint:`Calcule les trois vecteurs à partir de <i>G</i>(2 ; 1), puis additionne-les composante par composante.`,why:`${ar('GA')} = (−3 ; −3), ${ar('GB')} = (3 ; −1) et ${ar('GC')} = (0 ; 4) : la somme vaut (0 ; 0).`},
   {q:'d) Pourquoi <i>G</i> est-il aussi aux deux tiers des médianes issues de <i>B</i> et de <i>C</i>&nbsp;?',opts:[
     'Parce que <i>G</i> est à la même distance des trois sommets.',
     `Parce que la relation ${ar('GA')} + ${ar('GB')} + ${ar('GC')} = 0 ne change pas quand on permute <i>A</i>, <i>B</i>, <i>C</i> : le calcul fait depuis <i>A</i> se refait tel quel depuis <i>B</i> ou <i>C</i>.`,
     'Parce que deux médianes non parallèles se coupent forcément en un point.',
     'Parce que le triangle <i>ABC</i> est isocèle.'],ans:1,
    hint:`Utilise ${ar('GB')} + ${ar('GC')} = 2 ${ar('GA′')} (car <i>A′</i> est le milieu de [<i>BC</i>]) et regarde si la relation de la question c) privilégie un sommet.`,
    why:`${ar('GA')} + ${ar('GB')} + ${ar('GC')} = ${ar('GA')} + 2 ${ar('GA′')}. Elle est nulle exactement quand ${ar('AG')} = ⅔ ${ar('AA′')}. La relation est symétrique en <i>A</i>, <i>B</i>, <i>C</i>, donc on a aussi ${ar('BG')} = ⅔ ${ar('BB′')} et ${ar('CG')} = ⅔ ${ar('CC′')}. Le triangle n’est pas isocèle (<i>AB</i> = √40, <i>AC</i> = √58, <i>BC</i> = √34) et <i>GA</i> = √18 ≠ <i>GB</i> = √10.`},
  ],
  sol:`<i>A′</i> = (3,5 ; 2,5), donc ${ar('AA′')} = (4,5 ; 4,5) et le point <i>G</i> tel que ${ar('AG')} = ⅔ ${ar('AA′')} est <b><i>G</i>(2 ; 1)</b>.<br>Preuve générale. <i>A′</i> étant le milieu de [<i>BC</i>], Chasles donne ${ar('GB')} + ${ar('GC')} = 2 ${ar('GA′')} + ${ar('A′B')} + ${ar('A′C')} = 2 ${ar('GA′')}.<br>Donc ${ar('GA')} + ${ar('GB')} + ${ar('GC')} = 0 ⇔ ${ar('GA')} + 2 ${ar('GA′')} = 0 ⇔ ${ar('AG')} = 2 ${ar('GA′')} ⇔ ${ar('AG')} = ⅔ ${ar('AA′')}.<br>Il existe un seul point <i>G</i> vérifiant ${ar('GA')} + ${ar('GB')} + ${ar('GC')} = 0, c’est <i>G</i> = (<i>A</i> + <i>B</i> + <i>C</i>)/3. Comme la relation est symétrique, le même raisonnement depuis <i>B</i> et <i>C</i> montre que <i>G</i> est aux deux tiers de chaque médiane : les trois médianes sont <b>concourantes</b> en <i>G</i>, le centre de gravité.`},
 {kind:'Problème',h:'La diagonale coupée au tiers',
  p:`<i>ABCD</i> est un parallélogramme et <i>M</i> est le milieu de [<i>AB</i>]. La droite (<i>DM</i>) coupe la diagonale [<i>AC</i>] en un point <i>P</i>. On pose ${B('u')} = ${ar('AB')} et ${B('v')} = ${ar('AD')}, qui ne sont pas colinéaires. On veut prouver que <i>P</i> est au tiers de [<i>AC</i>], quel que soit le parallélogramme, puis le vérifier sur un exemple.`,
  fig:(()=>{ const P=plane({x:[-.6,8.6],y:[-.8,3.8],grid:false,axes:false}); P.poly([[0,0],[6,0],[8,3],[2,3]],{fill:'var(--accent)',fo:.1,c:'var(--ink)',w:2});
    P.seg(0,0,8,3,{c:'var(--math)',w:2.5}).seg(2,3,3,0,{c:'var(--spark)',w:2.5});
    P.dot(0,0,{r:4,l:'A',dx:-14,dy:14}).dot(6,0,{r:4,l:'B',dy:16}).dot(8,3,{r:4,l:'C'}).dot(2,3,{r:4,l:'D',dx:-16}).dot(3,0,{r:4,l:'M',dy:16}).dot(8/3,1,{l:'P',dx:10,dy:14}); return P.svg(); })(),
  parts:[
   {q:`a) Exprime ${ar('DM')} en fonction de ${B('u')} et ${B('v')}.`,opts:[`½${B('u')} + ${B('v')}`,`½${B('u')} − ${B('v')}`,`${B('v')} − ½${B('u')}`,`${B('u')} − ½${B('v')}`],ans:1,hint:`Chasles : ${ar('DM')} = ${ar('DA')} + ${ar('AM')}.`,why:`${ar('DM')} = ${ar('DA')} + ${ar('AM')} = −${B('v')} + ½${B('u')}.`},
   {q:`b) <i>P</i> est sur (<i>AC</i>) : ${ar('AP')} = <i>t</i>(${B('u')} + ${B('v')}). <i>P</i> est sur (<i>DM</i>) : ${ar('AP')} = ${B('v')} + <i>s</i>(½${B('u')} − ${B('v')}). Qu’est-ce qui permet d’égaler séparément les coefficients de ${B('u')} et de ${B('v')}&nbsp;?`,opts:[
     `Le fait que ${B('u')} et ${B('v')} aient la même norme.`,
     `Le fait que ${B('u')} et ${B('v')} soient orthogonaux.`,
     `Le fait que <i>P</i> soit le milieu de [<i>DM</i>].`,
     `Le fait que ${B('u')} et ${B('v')} ne soient pas colinéaires : l’écriture d’un vecteur comme <i>a</i>${B('u')} + <i>b</i>${B('v')} est alors unique.`],ans:3,
    hint:'Relis la théorie sur les combinaisons linéaires : quand l’écriture d’un vecteur est-elle unique&nbsp;?',
    why:`Si ${B('u')} et ${B('v')} ne sont pas colinéaires, <i>a</i>${B('u')} + <i>b</i>${B('v')} = <i>a′</i>${B('u')} + <i>b′</i>${B('v')} impose <i>a</i> = <i>a′</i> et <i>b</i> = <i>b′</i>. Un parallélogramme quelconque n’a ni côtés égaux ni angle droit.`},
   {q:'c) Résous le système obtenu. Que vaut <i>t</i> = <i>AP</i>/<i>AC</i>&nbsp;?',lab:'t =',ans:1/3,tol:.002,hint:'Coefficient de <b>u</b> : <i>t</i> = <i>s</i>/2. Coefficient de <b>v</b> : <i>t</i> = 1 − <i>s</i>.',why:'<i>s</i>/2 = 1 − <i>s</i> donne <i>s</i> = 2/3, puis <i>t</i> = 1/3. Le point <i>P</i> est aux deux tiers de [<i>DM</i>] et au tiers de [<i>AC</i>].'},
   {q:'d) Exemple : <i>A</i>(0 ; 0), <i>B</i>(6 ; 0), <i>D</i>(2 ; 3). Quelle est l’ordonnée de <i>P</i>&nbsp;?',lab:'y =',ans:1,tol:.001,hint:'Calcule d’abord <i>C</i> = <i>B</i> + <i>D</i> − <i>A</i>, puis prends le tiers de ce vecteur depuis <i>A</i>.',why:`<i>C</i> = (8 ; 3), donc <i>P</i> = <i>A</i> + ⅓ (8 ; 3) = (8/3 ; 1). Vérification : <i>D</i> + ⅔ ${ar('DM')} = (2 ; 3) + ⅔ (1 ; −3) = (8/3 ; 1).`},
  ],
  sol:`${ar('AC')} = ${B('u')} + ${B('v')} et ${ar('DM')} = ½${B('u')} − ${B('v')}.<br><i>P</i> ∈ (<i>AC</i>) : ${ar('AP')} = <i>t</i>${B('u')} + <i>t</i>${B('v')}. <i>P</i> ∈ (<i>DM</i>) : ${ar('AP')} = ${ar('AD')} + <i>s</i> ${ar('DM')} = (<i>s</i>/2)${B('u')} + (1 − <i>s</i>)${B('v')}.<br>Comme ${B('u')} et ${B('v')} ne sont pas colinéaires, on identifie : <i>t</i> = <i>s</i>/2 et <i>t</i> = 1 − <i>s</i>, d’où <i>s</i> = 2/3 et <b><i>t</i> = 1/3</b>.<br>Donc ${ar('AP')} = ⅓ ${ar('AC')} pour tout parallélogramme : la droite (<i>DM</i>) coupe la diagonale au tiers.<br>Exemple : <i>C</i> = (8 ; 3) et <i>P</i> = (8/3 ; 1).`},
]},

/* =============== 2. PRODUIT SCALAIRE =============== */
{subj:'ga', sem:'all', id:'ga-scalaire', h:'Produit scalaire et problèmes métriques', p:'Un nombre qui mesure à quel point deux vecteurs vont dans le même sens, et qui donne longueurs, angles et projections.', steps:[
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
 {kind:'Problème',h:'Le bras articulé',
  p:`Un bras de robot plan part de l’épaule <i>O</i>. Le premier segment [<i>OA</i>] mesure 3 dm, le second [<i>AB</i>] mesure 2 dm. On note θ l’angle entre les vecteurs ${ar('OA')} et ${ar('AB')} : θ = 0° quand le bras est tendu. On veut placer la pince <i>B</i> à 4 dm de l’épaule. Fais varier θ pour te faire une idée.`,
  params:[{id:'t',l:'Angle θ',min:0,max:180,step:15,v:60,u:'°'}],
  draw:v=>{ const c=Math.cos(rad(v.t)), s=Math.sin(rad(v.t)), bx=3+2*c, by=2*s, P=plane({x:[-1,6],y:[-1,3],lab:1});
    P.seg(3,0,5.5,0,{c:'var(--muted)',w:1.5,dash:true}).seg(0,0,bx,by,{c:'var(--accent)',w:2,dash:true}); vec(P,0,0,3,0,{c:'var(--math)'}); vec(P,3,0,2*c,2*s,{c:'var(--spark)'});
    P.dot(0,0,{r:4,c:'var(--ink)',l:'O',dx:-14,dy:14}).dot(3,0,{r:4,l:'A',dx:-6,dy:18}).dot(bx,by,{l:'B'}); if(v.t>=30) P.text(3.5,.3,'θ',{s:14}); return P.svg(); },
  info:v=>`<i>OB</i> = ‖${ar('OA')} + ${ar('AB')}‖ = <b>${fmt(Math.sqrt(Math.max(0,13+12*Math.cos(rad(v.t)))))}</b> dm`,
  parts:[
   {q:'a) Quelle est la distance <i>OB</i> quand θ = 90°&nbsp;? Arrondis au centième.',lab:'OB =',unit:'dm',ans:3.61,tol:.006,hint:`Les deux segments sont alors perpendiculaires : ${ar('OA')}·${ar('AB')} = 0.`,why:'Pythagore : <i>OB</i> = √(9 + 4) = √13 ≈ 3,61 dm.'},
   {q:'b) Quelle formule donne <i>OB</i>² en fonction de θ&nbsp;?',opts:['<i>OB</i>² = 13 − 12 cos θ','<i>OB</i>² = 25 cos θ','<i>OB</i>² = 13 + 12 cos θ','<i>OB</i>² = 13 + 6 cos θ'],ans:2,
    hint:`Développe ‖${ar('OA')} + ${ar('AB')}‖² et remplace ${ar('OA')}·${ar('AB')} par 3·2·cos θ. Attention : θ n’est pas l’angle du triangle en <i>A</i>.`,
    why:`‖${ar('OA')} + ${ar('AB')}‖² = 9 + 2·${ar('OA')}·${ar('AB')} + 4 = 13 + 12 cos θ. La formule avec « − » est Al-Kashi écrite avec l’angle intérieur du triangle en <i>A</i>, qui vaut 180° − θ.`},
   {q:'c) Pour quel angle θ ∈ [0° ; 180°] a-t-on <i>OB</i> = 4 dm&nbsp;? Arrondis au centième de degré.',lab:'θ =',unit:'°',ans:75.52,tol:.006,hint:'Résous 13 + 12 cos θ = 16.',why:'cos θ = 3/12 = 1/4, donc θ = arccos(1/4) ≈ 75,52°.'},
   {q:`d) Dans cette position, quel angle le vecteur ${ar('OB')} fait-il avec ${ar('OA')}&nbsp;? Arrondis au centième de degré.`,lab:'angle =',unit:'°',ans:28.96,tol:.006,hint:`${ar('OA')}·${ar('OB')} = ${ar('OA')}·(${ar('OA')} + ${ar('AB')}) = 9 + 6 cos θ.`,why:`${ar('OA')}·${ar('OB')} = 9 + 6·¼ = 10,5. Donc cos = 10,5 / (3·4) = 0,875 et l’angle vaut arccos(0,875) ≈ 28,96°.`},
  ],
  sol:`On écrit ${ar('OB')} = ${ar('OA')} + ${ar('AB')} et on développe : <i>OB</i>² = ‖${ar('OA')}‖² + 2 ${ar('OA')}·${ar('AB')} + ‖${ar('AB')}‖² = 9 + 12 cos θ + 4 = <b>13 + 12 cos θ</b>.<br>Pour θ = 90°, <i>OB</i> = √13 ≈ 3,61 dm. La portée va de 1 dm (θ = 180°, bras replié) à 5 dm (θ = 0°, bras tendu).<br><i>OB</i> = 4 donne 13 + 12 cos θ = 16, soit cos θ = ¼ et <b>θ ≈ 75,52°</b>.<br>L’angle en <i>O</i> se trouve aussi par le produit scalaire : ${ar('OA')}·${ar('OB')} = 9 + 6 cos θ = 10,5, donc cos = 10,5/12 = 0,875 et l’angle vaut <b>≈ 28,96°</b>.`},
 {kind:'Problème',h:'Les diagonales du cube',
  p:`Un cube <i>ABCDEFGH</i> a 2 m d’arête. On le place dans un repère orthonormé : <i>A</i>(0 ; 0 ; 0), <i>B</i>(2 ; 0 ; 0), <i>D</i>(0 ; 2 ; 0), <i>E</i>(0 ; 0 ; 2), et <i>G</i>(2 ; 2 ; 2) est le sommet opposé à <i>A</i>, <i>H</i>(0 ; 2 ; 2) celui opposé à <i>B</i>. Les <b>grandes diagonales</b> [<i>AG</i>] et [<i>BH</i>] se coupent au centre du cube. On cherche l’angle entre ces deux droites, puis l’angle entre une grande diagonale et une arête.`,
  fig:(()=>{ const S=spc([1,1,1],{r:2.6,az:-25,el:20}), V={A:[0,0,0],B:[2,0,0],C:[2,2,0],D:[0,2,0],E:[0,0,2],F:[2,0,2],G:[2,2,2],H:[0,2,2]};
    ['AB','BC','CD','DA','EF','FG','GH','HE','AE','BF','CG','DH'].forEach(e=>S.seg(V[e[0]],V[e[1]],{c:'var(--muted)',w:1.5}));
    S.seg(V.A,V.G,{c:'var(--math)',w:3}).seg(V.B,V.H,{c:'var(--spark)',w:3}); Object.keys(V).forEach(k=>S.dot(V[k],{r:3.5,c:'var(--ink)',l:k,dx:7,dy:-6})); S.dot([1,1,1],{r:4}); return S.svg(); })(),
  parts:[
   {q:`a) Calcule le produit scalaire ${ar('AG')}·${ar('BH')}.`,lab:'AG·BH =',ans:4,tol:.001,hint:'Écris les deux vecteurs (arrivée moins départ), puis <i>xx′</i> + <i>yy′</i> + <i>zz′</i>.',why:`${ar('AG')} = (2 ; 2 ; 2) et ${ar('BH')} = (−2 ; 2 ; 2), donc le produit vaut −4 + 4 + 4 = 4.`},
   {q:'b) Quelle est la longueur d’une grande diagonale&nbsp;? Arrondis au centième.',lab:'AG =',unit:'m',ans:3.46,tol:.006,hint:'C’est la norme de (2 ; 2 ; 2).',why:'<i>AG</i> = √(4 + 4 + 4) = √12 = 2√3 ≈ 3,46 m. <i>BH</i> a la même longueur.'},
   {q:'c) Quel est l’angle aigu entre les droites (<i>AG</i>) et (<i>BH</i>)&nbsp;? Arrondis au centième de degré.',lab:'θ =',unit:'°',ans:70.53,tol:.006,hint:'cos θ = |produit scalaire| / (produit des normes).',why:'cos θ = 4 / (2√3 · 2√3) = 4/12 = 1/3, donc θ = arccos(1/3) ≈ 70,53°.'},
   {q:`d) Un camarade a calculé avec ${ar('AG')} et ${ar('HB')} et trouve 109,47°. Qui a raison&nbsp;?`,opts:[
     'Lui : il faut toujours prendre l’angle obtus.',
     'Personne : l’angle dépend de la longueur de l’arête.',
     `Les deux calculs sont justes pour les vecteurs. L’angle entre les <b>droites</b> est l’angle aigu, 70,53° = 180° − 109,47°.`,
     'Toi seulement : son calcul contient une erreur de signe.'],ans:2,
    hint:`${ar('HB')} = −${ar('BH')} : que devient le cosinus quand on change le sens d’un vecteur&nbsp;?`,
    why:`${ar('AG')}·${ar('HB')} = −4, donc cos = −1/3 et l’angle entre ces <b>vecteurs</b> vaut 109,47°. Une droite n’a pas de sens : l’angle entre deux droites est l’angle aigu, 70,53°.`},
   {q:'e) Quel est l’angle entre la grande diagonale (<i>AG</i>) et l’arête (<i>AB</i>)&nbsp;? Arrondis au centième de degré.',lab:'α =',unit:'°',ans:54.74,tol:.006,hint:`${ar('AB')} = (2 ; 0 ; 0).`,why:`${ar('AG')}·${ar('AB')} = 4, donc cos α = 4 / (2√3 · 2) = 1/√3 et α ≈ 54,74°.`},
  ],
  sol:`Dans le repère, ${ar('AG')} = (2 ; 2 ; 2), ${ar('BH')} = (−2 ; 2 ; 2) et ${ar('AB')} = (2 ; 0 ; 0).<br>${ar('AG')}·${ar('BH')} = −4 + 4 + 4 = 4 et ‖${ar('AG')}‖ = ‖${ar('BH')}‖ = 2√3 ≈ 3,46 m.<br>cos θ = 4/12 = 1/3, donc l’angle entre les deux grandes diagonales vaut <b>θ ≈ 70,53°</b>. Avec ${ar('HB')}, on trouve 109,47° pour les vecteurs, mais l’angle entre deux droites est l’angle aigu.<br>Entre une grande diagonale et une arête : cos α = 4/(2√3·2) = 1/√3, soit <b>α ≈ 54,74°</b>.<br>Ces angles ne dépendent pas de l’arête : pour un cube d’arête <i>a</i>, tous les vecteurs sont multipliés par <i>a</i>/2 et les cosinus ne changent pas.`},
]},

/* =============== 3. DROITES, PLANS, ESPACE (VECTORIEL) =============== */
{subj:'ga', sem:'all', id:'ga-espace', h:'Droites, plans et espace : étude vectorielle', p:'Décrire droites et plans par un point et des vecteurs, puis classer leurs positions relatives.', steps:[
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
 {kind:'Problème',h:'Les milieux d’un tétraèdre',
  p:`<i>ABCD</i> est un tétraèdre : quatre points qui ne sont pas dans un même plan. On note <i>I</i>, <i>J</i>, <i>K</i>, <i>L</i> les milieux des arêtes [<i>AB</i>], [<i>BC</i>], [<i>CD</i>] et [<i>DA</i>]. On veut montrer que ces quatre points forment toujours un parallélogramme, donc qu’ils sont coplanaires. On l’applique ensuite à <i>A</i>(0 ; 0 ; 0), <i>B</i>(6 ; 0 ; 0), <i>C</i>(2 ; 4 ; 0) et <i>D</i>(1 ; 1 ; 6).`,
  fig:(()=>{ const S=spc([2.5,1.5,2],{r:5,az:35,el:20}), A=[0,0,0], Bq=[6,0,0], C=[2,4,0], D=[1,1,6], I=[3,0,0], J=[4,2,0], K=[1.5,2.5,3], L=[.5,.5,3];
    [[A,Bq],[Bq,C],[C,A],[A,D],[Bq,D],[C,D]].forEach(([p,q])=>S.seg(p,q,{c:'var(--muted)',w:1.5}));
    S.poly([I,J,K,L],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:2.5});
    S.dot(A,{r:4,c:'var(--ink)',l:'A',dx:-14}).dot(Bq,{r:4,c:'var(--ink)',l:'B'}).dot(C,{r:4,c:'var(--ink)',l:'C'}).dot(D,{r:4,c:'var(--ink)',l:'D'});
    S.dot(I,{r:4,l:'I',dy:16}).dot(J,{r:4,l:'J'}).dot(K,{r:4,l:'K'}).dot(L,{r:4,l:'L',dx:-14}); return S.svg(); })(),
  parts:[
   {q:`a) Exprime ${ar('IJ')} à l’aide d’une arête du tétraèdre.`,opts:[`${ar('IJ')} = ½ ${ar('AC')}`,`${ar('IJ')} = ${ar('AC')}`,`${ar('IJ')} = ½ ${ar('BD')}`,`${ar('IJ')} = ½ ${ar('CA')}`],ans:0,
    hint:`Chasles : ${ar('IJ')} = ${ar('IB')} + ${ar('BJ')}, et chacun est la moitié d’une arête.`,
    why:`${ar('IJ')} = ${ar('IB')} + ${ar('BJ')} = ½ ${ar('AB')} + ½ ${ar('BC')} = ½ ${ar('AC')}.`},
   {q:`b) De même, ${ar('LK')} = ${ar('LD')} + ${ar('DK')}. Avec les coordonnées de l’énoncé, ${ar('IJ')} = <i>k</i> ${ar('LK')}. Que vaut <i>k</i>&nbsp;?`,lab:'k =',ans:1,tol:.001,hint:'Calcule les quatre milieux, puis les deux vecteurs.',why:`<i>I</i>(3 ; 0 ; 0), <i>J</i>(4 ; 2 ; 0), <i>K</i>(1,5 ; 2,5 ; 3), <i>L</i>(0,5 ; 0,5 ; 3). Donc ${ar('IJ')} = (1 ; 2 ; 0) = ${ar('LK')}, et <i>k</i> = 1. En général ${ar('LK')} = ½ ${ar('AC')} aussi.`},
   {q:'c) Que peut-on en conclure&nbsp;?',opts:[
     '<i>IJKL</i> est un rectangle.',
     '(<i>IJ</i>) et (<i>LK</i>) sont gauches.',
     '<i>IJKL</i> est un losange, car toutes les arêtes sont égales.',
     `${ar('IJ')} = ${ar('LK')}, donc <i>IJKL</i> est un parallélogramme : ses quatre sommets sont dans un même plan.`],ans:3,
    hint:'Que dit l’égalité de deux vecteurs sur le quadrilatère formé par leurs origines et leurs extrémités&nbsp;?',
    why:`${ar('IJ')} = ${ar('LK')} caractérise le parallélogramme <i>IJKL</i>. Ainsi ${ar('IL')} = ${ar('JK')} et ${ar('IK')} = ${ar('IJ')} + ${ar('IL')} : <i>K</i> est dans le plan passant par <i>I</i> dirigé par ${ar('IJ')} et ${ar('IL')}. Rien n’impose un angle droit ni des côtés égaux.`},
   {q:'d) Montre que le périmètre de <i>IJKL</i> vaut <i>AC</i> + <i>BD</i>, puis calcule-le. Arrondis au centième.',lab:'périmètre =',ans:12.35,tol:.006,hint:`${ar('JK')} = ½ ${ar('BD')} par le même calcul qu’en a).`,why:`<i>IJ</i> = <i>LK</i> = ½ <i>AC</i> et <i>JK</i> = <i>IL</i> = ½ <i>BD</i>, donc le périmètre vaut <i>AC</i> + <i>BD</i> = √20 + √62 ≈ 4,47 + 7,87 ≈ 12,35.`},
  ],
  sol:`Par Chasles, ${ar('IJ')} = ${ar('IB')} + ${ar('BJ')} = ½ (${ar('AB')} + ${ar('BC')}) = ½ ${ar('AC')}, et de même ${ar('LK')} = ${ar('LD')} + ${ar('DK')} = ½ (${ar('AD')} + ${ar('DC')}) = ½ ${ar('AC')}.<br>Donc ${ar('IJ')} = ${ar('LK')} : <i>IJKL</i> est un <b>parallélogramme</b>, et ses quatre sommets sont <b>coplanaires</b>, même si <i>A</i>, <i>B</i>, <i>C</i>, <i>D</i> ne le sont pas.<br>On a aussi ${ar('JK')} = ${ar('IL')} = ½ ${ar('BD')}, d’où un périmètre égal à <i>AC</i> + <i>BD</i>.<br>Exemple : ${ar('IJ')} = ${ar('LK')} = (1 ; 2 ; 0), <i>AC</i> = √20 et <i>BD</i> = √62, soit un périmètre ≈ <b>12,35</b>.`},
 {kind:'Problème',h:'Deux drones qui se croisent',
  p:`Deux drones volent en ligne droite à vitesse constante. Leurs positions au temps <i>t</i> (en secondes, coordonnées en mètres) sont <i>D</i>₁(<i>t</i>) = (0 ; 0 ; 2) + <i>t</i>(1 ; 2 ; 1) et <i>D</i>₂(<i>t</i>) = (7 ; −2 ; −3) + <i>t</i>(−1 ; 2 ; 2). Les deux <b>trajectoires</b> sont des droites de l’espace. La sécurité impose que les drones ne soient jamais à moins de 3 m l’un de l’autre. On veut savoir si les trajectoires se croisent, puis si les drones se rapprochent dangereusement.`,
  fig:(()=>{ const S=spc([3.5,4,3],{r:8,az:25,el:20}); S.seg([0,0,2],[5,10,7],{c:'var(--math)',w:3}).seg([7,-2,-3],[1,10,9],{c:'var(--spark)',w:3});
    S.dot([0,0,2],{r:4,c:'var(--math)',l:'D₁(0)',dx:-40}).dot([7,-2,-3],{r:4,c:'var(--spark)',l:'D₂(0)'}).dot([3,6,5],{l:'I'}); return S.svg(); })(),
  parts:[
   {q:'a) Quelle est la position relative des deux trajectoires&nbsp;?',opts:['parallèles','gauches','sécantes','confondues'],ans:2,
    hint:'Les directions sont-elles colinéaires&nbsp;? Cherche ensuite un point commun en utilisant deux paramètres différents, <i>s</i> pour le 1er drone et <i>r</i> pour le 2e.',
    why:'(1 ; 2 ; 1) et (−1 ; 2 ; 2) ne sont pas colinéaires. (<i>s</i> ; 2<i>s</i> ; 2 + <i>s</i>) = (7 − <i>r</i> ; −2 + 2<i>r</i> ; −3 + 2<i>r</i>) donne <i>s</i> = 3, <i>r</i> = 4, et la 3e équation est vérifiée (5 = 5). Les trajectoires sont sécantes.'},
   {q:'b) Quelle est la cote <i>z</i> du point de croisement <i>I</i>&nbsp;?',lab:'z =',unit:'m',ans:5,tol:.001,hint:'Remplace <i>s</i> = 3 dans la trajectoire du 1er drone.',why:'<i>I</i> = (0 ; 0 ; 2) + 3(1 ; 2 ; 1) = (3 ; 6 ; 5).'},
   {q:'c) À quel instant le 2e drone passe-t-il en <i>I</i>&nbsp;?',lab:'t =',unit:'s',ans:4,tol:.001,hint:'C’est le paramètre <i>r</i> trouvé en a).',why:'<i>D</i>₂(4) = (7 − 4 ; −2 + 8 ; −3 + 8) = (3 ; 6 ; 5). Le 1er drone y passe à <i>t</i> = 3, le 2e à <i>t</i> = 4 : ils ne s’y rencontrent pas.'},
   {q:'d) Quelle est la distance entre les deux drones à <i>t</i> = 3 s&nbsp;?',lab:'distance =',unit:'m',ans:3,tol:.001,hint:'Calcule <i>D</i>₂(3) et la norme de <i>D</i>₂(3) − <i>D</i>₁(3).',why:'<i>D</i>₁(3) = (3 ; 6 ; 5) et <i>D</i>₂(3) = (4 ; 4 ; 3) : l’écart (1 ; −2 ; −2) a pour norme √9 = 3 m.'},
   {q:'e) Quelle est la plus petite distance entre les drones au cours du vol&nbsp;? Arrondis au centième.',lab:'d<sub>min</sub> =',unit:'m',ans:2.41,tol:.006,hint:'Écris le vecteur <i>D</i>₂(<i>t</i>) − <i>D</i>₁(<i>t</i>), puis le carré de sa norme : c’est un polynôme du 2e degré en <i>t</i>, minimal au sommet.',why:'<i>D</i>₂(<i>t</i>) − <i>D</i>₁(<i>t</i>) = (7 − 2<i>t</i> ; −2 ; <i>t</i> − 5), de norme au carré 5<i>t</i>² − 38<i>t</i> + 78. Le minimum est en <i>t</i> = 3,8 s et vaut 5,8 : d<sub>min</sub> = √5,8 ≈ 2,41 m, sous la limite de 3 m.'},
  ],
  sol:`Les directions (1 ; 2 ; 1) et (−1 ; 2 ; 2) ne sont pas colinéaires. Le système (<i>s</i> ; 2<i>s</i> ; 2 + <i>s</i>) = (7 − <i>r</i> ; −2 + 2<i>r</i> ; −3 + 2<i>r</i>) a pour solution <i>s</i> = 3, <i>r</i> = 4 : les trajectoires sont <b>sécantes</b> en <b><i>I</i>(3 ; 6 ; 5)</b>.<br>Mais le 1er drone passe en <i>I</i> à <i>t</i> = 3 s et le 2e à <i>t</i> = 4 s : il n’y a pas collision. Sécantes ne veut pas dire rencontre, car les paramètres jouent ici le rôle du temps.<br>À <i>t</i> = 3, l’écart vaut (1 ; −2 ; −2), soit 3 m.<br>Plus généralement, ‖<i>D</i>₂(<i>t</i>) − <i>D</i>₁(<i>t</i>)‖² = (7 − 2<i>t</i>)² + 4 + (<i>t</i> − 5)² = 5<i>t</i>² − 38<i>t</i> + 78, minimal en <i>t</i> = 38/10 = 3,8 s.<br>La distance minimale vaut √5,8 ≈ <b>2,41 m</b> : la règle des 3 m est violée (5<i>t</i>² − 38<i>t</i> + 78 &lt; 9 pour 3 &lt; <i>t</i> &lt; 4,6), il faut décaler l’un des vols.`},
]},

/* =============== 4. REPÈRES ET COORDONNÉES =============== */
{subj:'ga', sem:'all', id:'ga-reperes', h:'Repères et coordonnées', p:'Choisir une base, lire des coordonnées, passer d’un repère à l’autre.', steps:[
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
 {kind:'Problème',h:'Le plan de chantier',
  p:`Le géomètre travaille dans le repère orthonormé du cadastre, en mètres. L’architecte a dessiné son plan dans un autre repère orthonormé direct : origine <i>O′</i>(20 ; 10), axes dirigés par ${B('e₁′')} = (0,6 ; 0,8) et ${B('e₂′')} = (−0,8 ; 0,6), coordonnées du cadastre. Il faut implanter le coin <i>M</i> du bâtiment, de coordonnées (5 ; 10) sur le plan, et retrouver sur le plan un piquet <i>N</i> posé en (30 ; 15) au cadastre.`,
  fig:(()=>{ const P=plane({x:[0,36],y:[0,26],step:5,lab:10}), e=[.6,.8], f=[-.8,.6];
    P.seg(20-25*e[0],10-25*e[1],20+25*e[0],10+25*e[1],{c:'var(--spark)',w:1.5,dash:true}).seg(20-25*f[0],10-25*f[1],20+25*f[0],10+25*f[1],{c:'var(--spark)',w:1.5,dash:true});
    vec(P,20,10,5*e[0],5*e[1],{c:'var(--spark)',hs:8}); vec(P,20,10,5*f[0],5*f[1],{c:'var(--spark)',hs:8});
    P.dot(20,10,{r:4,c:'var(--spark)',l:'O′',dx:8,dy:16}).dot(15,20,{l:'M'}).dot(30,15,{l:'N'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’abscisse de <i>M</i> dans le repère du cadastre&nbsp;?',lab:'x =',unit:'m',ans:15,tol:.001,hint:`${ar('OM')} = ${ar('OO′')} + 5${B('e₁′')} + 10${B('e₂′')}.`,why:`<i>M</i> = (20 ; 10) + 5(0,6 ; 0,8) + 10(−0,8 ; 0,6) = (20 + 3 − 8 ; 10 + 4 + 6) = (15 ; 20).`},
   {q:'b) Pour aller dans l’autre sens, il faut inverser la matrice de passage <i>P</i>. Pourquoi est-ce facile ici&nbsp;?',opts:[
     '<i>P</i> est diagonale, il suffit d’inverser les coefficients.',
     'Il suffit de changer le signe de tous les coefficients.',
     `Le nouveau repère est orthonormé direct : <i>P</i> est une rotation et <i>P</i>⁻¹ est sa transposée.`,
     'On ne peut pas inverser <i>P</i>, il faut résoudre un système à chaque point.'],ans:2,
    hint:`Calcule ‖${B('e₁′')}‖, ‖${B('e₂′')}‖ et ${B('e₁′')}·${B('e₂′')}.`,
    why:`‖${B('e₁′')}‖ = ‖${B('e₂′')}‖ = 1 et ${B('e₁′')}·${B('e₂′')} = −0,48 + 0,48 = 0. Les colonnes de <i>P</i> sont orthonormées, donc <i>P</i>ᵀ<i>P</i> = <i>I</i> : la nouvelle coordonnée <i>x′</i> est simplement le produit scalaire de ${ar('O′N')} avec ${B('e₁′')}, et <i>y′</i> avec ${B('e₂′')}.`},
   {q:'c) Quelle est l’ordonnée <i>y′</i> du piquet <i>N</i>(30 ; 15) sur le plan de l’architecte&nbsp;?',lab:'y′ =',unit:'m',ans:-5,tol:.001,hint:`Calcule ${ar('O′N')}, puis <i>y′</i> = ${ar('O′N')}·${B('e₂′')}.`,why:`${ar('O′N')} = (10 ; 5). <i>x′</i> = 10·0,6 + 5·0,8 = 10 et <i>y′</i> = 10·(−0,8) + 5·0,6 = −5. Sur le plan, <i>N</i> = (10 ; −5).`},
   {q:'d) Quelle est la distance <i>MN</i>&nbsp;? Arrondis au centième.',lab:'MN =',unit:'m',ans:15.81,tol:.006,hint:'Les deux repères sont orthonormés : la formule √(Δx² + Δy²) marche dans l’un comme dans l’autre.',why:'Au cadastre : √(15² + 5²) = √250 ≈ 15,81 m. Sur le plan : √(5² + 15²) = √250, le même résultat.'},
  ],
  sol:`Formule de passage : (<i>x</i> ; <i>y</i>) = <i>O′</i> + <i>x′</i>${B('e₁′')} + <i>y′</i>${B('e₂′')}. Pour <i>M</i>(5 ; 10) sur le plan : <i>M</i> = (20 + 3 − 8 ; 10 + 4 + 6) = <b>(15 ; 20)</b> au cadastre.<br>Le repère de l’architecte est orthonormé (normes 1, produit scalaire nul) et direct (déterminant 0,36 + 0,64 = 1). La matrice de passage est donc une rotation, d’inverse sa transposée : <i>x′</i> = ${ar('O′N')}·${B('e₁′')}, <i>y′</i> = ${ar('O′N')}·${B('e₂′')}.<br>Pour <i>N</i>(30 ; 15) : ${ar('O′N')} = (10 ; 5), d’où <b><i>N</i> = (10 ; −5)</b> sur le plan.<br>Un changement de repère orthonormé conserve les distances : <i>MN</i> = √250 ≈ <b>15,81 m</b> dans les deux repères.`},
 {kind:'Problème',h:'Le plateau à cases triangulaires',
  p:`Un jeu se joue sur un réseau de triangles équilatéraux de côté 1. On le repère avec la base (${B('e₁')}, ${B('e₂')}) formée de deux vecteurs unitaires à 60° : en coordonnées usuelles, ${B('e₁')} = (1 ; 0) et ${B('e₂')} = (½ ; √3/2). Chaque nœud du réseau a des coordonnées entières (<i>a</i> ; <i>b</i>) dans cette base. On veut calculer des distances directement avec ces coordonnées, sans repasser par le repère usuel. Le pion <i>M</i> est au nœud (2 ; 3).`,
  fig:(()=>{ const h=Math.sqrt(3)/2, P=plane({x:[-2,5],y:[-1,4],grid:false,axes:false}); oblique(P,[1,0],[.5,h],8);
    vec(P,0,0,1,0,{c:'var(--ink)',w:2,hs:7}); vec(P,0,0,.5,h,{c:'var(--ink)',w:2,hs:7}); P.seg(0,0,3.5,3*h,{c:'var(--accent)',w:2.5,dash:true});
    P.dot(0,0,{r:4,c:'var(--muted)',l:'O',dx:-14,dy:14}).dot(3.5,3*h,{l:'M'}).dot(0,2*h,{l:'N',dx:-16}); return P.svg(); })(),
  parts:[
   {q:`a) Que vaut le produit scalaire ${B('e₁')}·${B('e₂')}&nbsp;?`,lab:'e₁·e₂ =',ans:.5,tol:.001,hint:'Deux vecteurs unitaires qui font un angle de 60°.',why:`${B('e₁')}·${B('e₂')} = 1·1·cos 60° = ½. En coordonnées usuelles : 1·½ + 0·√3/2 = ½.`},
   {q:'b) Quelle est la distance <i>OM</i>&nbsp;? Arrondis au centième.',lab:'OM =',ans:4.36,tol:.006,hint:`‖<i>a</i>${B('e₁')} + <i>b</i>${B('e₂')}‖² = <i>a</i>² + 2<i>ab</i> ${B('e₁')}·${B('e₂')} + <i>b</i>².`,why:'<i>OM</i>² = 4 + 2·2·3·½ + 9 = 19, donc <i>OM</i> = √19 ≈ 4,36. Vérification en usuel : <i>M</i> = (3,5 ; 3√3/2) et 12,25 + 6,75 = 19.'},
   {q:'c) Un joueur affirme que <i>OM</i> = √(2² + 3²) = √13. Où est l’erreur&nbsp;?',opts:[
     'Il a oublié de diviser par 2.',
     `Il applique une formule valable seulement en base orthonormée : ici ${B('e₁')}·${B('e₂')} ≠ 0 et il manque le terme 2<i>ab</i> ${B('e₁')}·${B('e₂')}.`,
     'Il n’y a pas d’erreur, les deux résultats sont égaux.',
     'Il aurait dû calculer √(2 + 3).'],ans:1,
    hint:'Relis l’étape « Repère orthonormé » du chapitre.',
    why:`√(<i>a</i>² + <i>b</i>²) suppose ${B('e₁')} ⊥ ${B('e₂')}. Ici le terme croisé 2·2·3·½ = 6 manque : 13 + 6 = 19.`},
   {q:'d) Le nœud <i>N</i> a pour coordonnées usuelles (0 ; √3). Quelle est sa première coordonnée <i>a</i> dans la base du réseau&nbsp;?',lab:'a =',ans:-1,tol:.001,hint:`Résous <i>a</i>(1 ; 0) + <i>b</i>(½ ; √3/2) = (0 ; √3) : commence par la 2e coordonnée.`,why:'<i>b</i>·√3/2 = √3 donne <i>b</i> = 2, puis <i>a</i> + <i>b</i>/2 = 0 donne <i>a</i> = −1. Donc <i>N</i> = (−1 ; 2) dans la base du réseau.'},
   {q:'e) Quelle est la distance <i>MN</i>&nbsp;? Arrondis au centième.',lab:'MN =',ans:3.61,tol:.006,hint:`${ar('NM')} = (2 − (−1) ; 3 − 2) dans la base du réseau. Applique la même formule qu’en b).`,why:`${ar('NM')} = (3 ; 1), donc <i>MN</i>² = 9 + 2·3·1·½ + 1 = 13 et <i>MN</i> = √13 ≈ 3,61. Vérification en usuel : (3,5 ; √3/2), 12,25 + 0,75 = 13.`},
  ],
  sol:`Dans la base (${B('e₁')}, ${B('e₂')}), ‖${B('e₁')}‖ = ‖${B('e₂')}‖ = 1 et ${B('e₁')}·${B('e₂')} = cos 60° = ½. Pour un vecteur de coordonnées (<i>a</i> ; <i>b</i>) : <div class="formula">‖<i>a</i>${B('e₁')} + <i>b</i>${B('e₂')}‖² = <i>a</i>² + <i>ab</i> + <i>b</i>²</div>Pour <i>M</i>(2 ; 3) : <i>OM</i>² = 4 + 6 + 9 = 19, soit <b><i>OM</i> = √19 ≈ 4,36</b>. La formule √(<i>a</i>² + <i>b</i>²) donnerait √13 : elle oublie le terme croisé, non nul en base oblique.<br>Le nœud (0 ; √3) a pour coordonnées <b>(−1 ; 2)</b> dans le réseau (on résout <i>b</i>√3/2 = √3, puis <i>a</i> + <i>b</i>/2 = 0).<br>${ar('NM')} = (3 ; 1), donc <i>MN</i>² = 9 + 3 + 1 = 13 et <b><i>MN</i> = √13 ≈ 3,61</b>. Chaque résultat se vérifie en coordonnées usuelles.`},
]},

/* =============== 5. DROITES DU PLAN =============== */
{subj:'ga', sem:'all', id:'ga-droites', h:'Droites du plan', p:'Équations paramétriques et cartésiennes, vecteur normal, intersections, angles et distances.', steps:[
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
 {kind:'Problème',h:'Le laser et le miroir',
  p:`Un laser placé en <i>A</i>(4 ; −3) doit atteindre un capteur en <i>B</i>(−4 ; 3) après réflexion sur un miroir plan, représenté par la droite <i>m</i> : 3<i>x</i> + 4<i>y</i> − 25 = 0 (unités en dm). Le rayon réfléchi semble venir du <b>symétrique</b> <i>B′</i> de <i>B</i> par rapport au miroir. Le point d’impact <i>I</i> est donc l’intersection de (<i>AB′</i>) avec <i>m</i>. On cherche <i>I</i> et la longueur du trajet.`,
  fig:(()=>{ const P=plane({x:[-6,8],y:[-4,12],lab:2}); line2(P,3,4,-25,{c:'var(--sci)',w:4},20);
    P.seg(-4,3,2,11,{c:'var(--muted)',w:1.5,dash:true}).seg(3,4,2,11,{c:'var(--muted)',w:2,dash:true}).seg(4,-3,3,4,{c:'var(--bad)',w:3}).seg(3,4,-4,3,{c:'var(--bad)',w:3});
    P.dot(4,-3,{r:5,l:'A'}).dot(-4,3,{r:5,l:'B',dx:-8,dy:16}).dot(2,11,{r:4,c:'var(--muted)',l:'B′'}).dot(-1,7,{r:3.5,c:'var(--muted)',l:'H',dx:-18}).dot(3,4,{l:'I'}).text(6.5,1.3,'m',{c:'var(--sci)'}); return P.svg(); })(),
  parts:[
   {q:'a) À quelle distance du miroir se trouve le capteur <i>B</i>&nbsp;?',lab:'d =',unit:'dm',ans:5,tol:.001,hint:'Formule de la distance d’un point à une droite.',why:'|3·(−4) + 4·3 − 25| / √(9 + 16) = 25/5 = 5 dm.'},
   {q:'b) Le symétrique <i>B′</i> s’obtient en avançant deux fois de cette distance le long du vecteur normal (3 ; 4), vers le miroir. Quelle est l’ordonnée de <i>B′</i>&nbsp;?',lab:'y =',ans:11,tol:.001,hint:'Le vecteur normal unitaire est (3 ; 4)/5. Le pied <i>H</i> de la perpendiculaire est à 5 dm de <i>B</i>, et <i>B′</i> est à 10 dm.',why:'<i>H</i> = <i>B</i> + 5·(0,6 ; 0,8) = (−1 ; 7), sur le miroir. Puis <i>B′</i> = <i>B</i> + 10·(0,6 ; 0,8) = (2 ; 11).'},
   {q:'c) Quelle est l’abscisse du point d’impact <i>I</i>&nbsp;?',lab:'x =',ans:3,tol:.001,hint:'Écris (<i>AB′</i>) en paramétrique : <i>A</i> + <i>s</i>·(<i>B′</i> − <i>A</i>), puis remplace dans l’équation du miroir.',why:'<i>B′</i> − <i>A</i> = (−2 ; 14). Le point (4 − 2<i>s</i> ; −3 + 14<i>s</i>) est sur <i>m</i> si 12 − 6<i>s</i> − 12 + 56<i>s</i> − 25 = 0, soit <i>s</i> = ½. Donc <i>I</i> = (3 ; 4).'},
   {q:'d) Quelle est la longueur du trajet <i>AI</i> + <i>IB</i>&nbsp;? Arrondis au centième.',lab:'trajet =',unit:'dm',ans:14.14,tol:.006,hint:'<i>IB</i> = <i>IB′</i> par symétrie.',why:'<i>AI</i> + <i>IB</i> = <i>AI</i> + <i>IB′</i> = <i>AB′</i> = √(4 + 196) = √200 ≈ 14,14 dm. Chaque morceau vaut √50.'},
   {q:'e) Pourquoi ce point <i>I</i> rend-il le trajet <i>A</i> → miroir → <i>B</i> le plus court possible&nbsp;?',opts:[
     'Parce que <i>I</i> est le point du miroir le plus proche de <i>A</i>.',
     'Parce que <i>I</i> est le milieu de [<i>AB</i>].',
     'Parce que (<i>AI</i>) est perpendiculaire au miroir.',
     'Pour tout point <i>P</i> du miroir, <i>AP</i> + <i>PB</i> = <i>AP</i> + <i>PB′</i> ≥ <i>AB′</i>, avec égalité seulement si <i>P</i> est sur [<i>AB′</i>], c’est-à-dire <i>P</i> = <i>I</i>.'],ans:3,
    hint:'La symétrie conserve les distances, puis pense à l’inégalité triangulaire.',
    why:'La symétrie donne <i>PB</i> = <i>PB′</i>. L’inégalité triangulaire donne <i>AP</i> + <i>PB′</i> ≥ <i>AB′</i>, atteinte seulement quand <i>A</i>, <i>P</i>, <i>B′</i> sont alignés dans cet ordre. La lumière suit ce chemin le plus court : angle d’incidence = angle de réflexion.'},
  ],
  sol:`<i>B</i> est à |−12 + 12 − 25|/5 = <b>5 dm</b> du miroir, du même côté que <i>A</i> (les deux donnent 3<i>x</i> + 4<i>y</i> − 25 = −25 &lt; 0).<br>Le pied de la perpendiculaire est <i>H</i> = <i>B</i> + 5·(0,6 ; 0,8) = (−1 ; 7), et le symétrique est <b><i>B′</i> = (2 ; 11)</b>.<br>(<i>AB′</i>) : (4 − 2<i>s</i> ; −3 + 14<i>s</i>). Dans l’équation du miroir : 50<i>s</i> − 25 = 0, donc <i>s</i> = ½ et <b><i>I</i> = (3 ; 4)</b>.<br>Trajet : <i>AI</i> + <i>IB</i> = <i>AB′</i> = √200 ≈ <b>14,14 dm</b>. Par l’inégalité triangulaire, aucun autre point du miroir ne donne un trajet plus court.<br>Vérification de la loi de réflexion : le rayon incident (−1 ; 7) devient (−1 ; 7) − 2·5·(0,6 ; 0,8) = (−7 ; −1), qui est bien la direction de ${ar('IB')}.`},
 {kind:'Problème',h:'Le cercle inscrit',
  p:`Un triangle est délimité par trois droites : <i>d</i>₁ : <i>y</i> = 0, <i>d</i>₂ : 4<i>x</i> − 3<i>y</i> = 0 et <i>d</i>₃ : 4<i>x</i> + 3<i>y</i> − 24 = 0. Ses sommets sont <i>O</i>(0 ; 0), <i>P</i>(6 ; 0) et <i>S</i>(3 ; 4). Le <b>cercle inscrit</b> est tangent aux trois côtés : son centre <i>I</i> est à la même distance <i>r</i> des trois droites, à l’intérieur du triangle. On veut trouver <i>I</i> et <i>r</i> avec la formule de la distance à une droite.`,
  fig:(()=>{ const P=plane({x:[-1,7],y:[-1,5],lab:1}); P.poly([[0,0],[6,0],[3,4]],{fill:'var(--accent)',fo:.1,c:'var(--ink)',w:2}).seg(3,-1,3,5,{c:'var(--muted)',w:1.5,dash:true}).circ(3,1.5,1.5,{c:'var(--math)',w:2.5});
    P.dot(0,0,{r:4,l:'O',dx:-14,dy:14}).dot(6,0,{r:4,l:'P',dy:16}).dot(3,4,{r:4,l:'S'}).dot(3,1.5,{l:'I'}); return P.svg(); })(),
  parts:[
   {q:'a) Quel est l’angle du triangle en <i>O</i>, entre <i>d</i>₁ et <i>d</i>₂&nbsp;? Arrondis au centième de degré.',lab:'angle =',unit:'°',ans:53.13,tol:.006,hint:'Utilise les vecteurs normaux (0 ; 1) et (4 ; −3).',why:'cos θ = |0·4 + 1·(−3)| / (1·5) = 3/5, donc θ = arccos(0,6) ≈ 53,13°.'},
   {q:'b) Pourquoi le centre <i>I</i> est-il sur la droite <i>x</i> = 3&nbsp;?',opts:[
     'Parce que <i>x</i> = 3 est la médiane issue de <i>O</i>.',
     'Parce que le centre d’un cercle est toujours au milieu d’un côté.',
     'Parce que <i>OS</i> = <i>PS</i> = 5 : le triangle est isocèle en <i>S</i> et symétrique par rapport à <i>x</i> = 3. Le centre inscrit est unique, donc il est sur cet axe.',
     'Parce que <i>d</i>₂ et <i>d</i>₃ sont perpendiculaires.'],ans:2,
    hint:'Compare les longueurs <i>OS</i> et <i>PS</i>.',
    why:'<i>OS</i> = √(9 + 16) = 5 = <i>PS</i>. La symétrie d’axe <i>x</i> = 3 échange <i>O</i> et <i>P</i> et fixe <i>S</i> : elle envoie le cercle inscrit sur lui-même, donc son centre est sur l’axe. <i>d</i>₂ et <i>d</i>₃ ne sont pas perpendiculaires : (4 ; −3)·(4 ; 3) = 7 ≠ 0.'},
   {q:'c) On pose <i>I</i>(3 ; <i>r</i>) avec <i>r</i> &gt; 0 (distance à <i>d</i>₁). En écrivant que la distance de <i>I</i> à <i>d</i>₂ vaut aussi <i>r</i>, trouve <i>r</i>.',lab:'r =',ans:1.5,tol:.001,hint:'Résous |12 − 3<i>r</i>| / 5 = <i>r</i>. Comme <i>I</i> est dans le triangle, 12 − 3<i>r</i> &gt; 0.',why:'12 − 3<i>r</i> = 5<i>r</i> donne <i>r</i> = 1,5. Vérification avec <i>d</i>₃ : |12 + 4,5 − 24| / 5 = 7,5/5 = 1,5.'},
   {q:'d) Sans la condition « à l’intérieur », l’équation |12 − 3<i>r</i>| = 5<i>r</i> devient (12 − 3<i>r</i>)² = 25<i>r</i>², qui a une 2e solution <i>r</i> = −6. Que représente le point (3 ; −6)&nbsp;?',opts:[
     'C’est le centre d’un cercle tangent aux trois droites, mais situé hors du triangle, sous le côté [<i>OP</i>] : un cercle exinscrit.',
     'Rien : c’est une solution parasite sans signification.',
     'C’est le centre du cercle circonscrit.',
     'C’est le centre de gravité du triangle.'],ans:0,
    hint:'Calcule les distances de (3 ; −6) aux trois droites.',
    why:'Les distances de (3 ; −6) à <i>d</i>₁, <i>d</i>₂ et <i>d</i>₃ valent 6, |12 + 18|/5 = 6 et |12 − 18 − 24|/5 = 6. Le cercle de centre (3 ; −6) et de rayon 6 touche les trois droites, mais de l’extérieur.'},
   {q:'e) Vérifie avec la formule aire = <i>r</i> × demi-périmètre. Quelle aire obtiens-tu&nbsp;?',lab:'aire =',ans:12,tol:.001,hint:'Les côtés mesurent 6, 5 et 5.',why:'Demi-périmètre (6 + 5 + 5)/2 = 8, donc aire = 1,5·8 = 12. C’est bien ½·base·hauteur = ½·6·4 = 12.'},
  ],
  sol:`L’angle en <i>O</i> vérifie cos θ = 3/5, soit <b>≈ 53,13°</b> (et autant en <i>P</i>).<br><i>OS</i> = <i>PS</i> = 5 : le triangle est isocèle en <i>S</i> et le centre inscrit est sur l’axe de symétrie <i>x</i> = 3. On pose <i>I</i>(3 ; <i>r</i>).<br>Distance à <i>d</i>₂ : |4·3 − 3<i>r</i>|/5 = <i>r</i>. À l’intérieur, 12 − 3<i>r</i> &gt; 0, donc 12 − 3<i>r</i> = 5<i>r</i> et <b><i>r</i> = 1,5</b>, <b><i>I</i>(3 ; 1,5)</b>. La distance à <i>d</i>₃ vaut aussi 7,5/5 = 1,5.<br>La solution <i>r</i> = −6 donne le centre (3 ; −6) d’un cercle exinscrit, de rayon 6.<br>Contrôle : aire = <i>r</i> · demi-périmètre = 1,5 · 8 = 12 = ½ · 6 · 4.`},
]},

/* =============== 6. TRANSFORMATIONS DU PLAN =============== */
{subj:'ga', sem:'all', id:'ga-transfos', h:'Transformations du plan', p:'Translations, homothéties, rotations, symétries et projections : leurs formules, leurs matrices et leurs compositions.', steps:[
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
 {kind:'Problème',h:'Deux miroirs font une rotation',
  p:`Deux miroirs passent par l’origine <i>O</i>. Le premier, Δ₁, fait un angle de 30° avec l’axe <i>Ox</i>, le second, Δ₂, un angle de 75°. On note <i>S</i>₁ et <i>S</i>₂ les symétries axiales correspondantes. On applique <i>S</i>₁ puis <i>S</i>₂ au point <i>M</i>(2 ; 0), et on veut reconnaître la transformation <i>S</i>₂ ∘ <i>S</i>₁.`,
  fig:(()=>{ const P=plane({x:[-3,3],y:[-1,3],lab:1}), r3=Math.sqrt(3); [[30,'Δ₁'],[75,'Δ₂']].forEach(([a,l])=>{ const c=Math.cos(rad(a)), s=Math.sin(rad(a)); P.seg(-4*c,-4*s,4*c,4*s,{c:'var(--sci)',w:2.5}).text(2.9*c,2.9*s,l,{dx:6,c:'var(--sci)'}); });
    P.seg(2,0,1,r3,{c:'var(--muted)',w:1.5,dash:true}).seg(1,r3,0,2,{c:'var(--muted)',w:1.5,dash:true});
    P.dot(2,0,{l:'M',dy:16}).dot(1,r3,{c:'var(--math)',l:'M₁'}).dot(0,2,{c:'var(--accent)',l:'M₂',dx:-24}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’ordonnée de <i>M</i>₁ = <i>S</i>₁(<i>M</i>)&nbsp;? Arrondis au centième.',lab:'y =',ans:1.73,tol:.006,hint:`Matrice de <i>S</i>₁ avec α = 30° : ${mat([['cos 60°','sin 60°'],['sin 60°','−cos 60°']])}.`,why:'<i>S</i>₁(2 ; 0) = (2 cos 60° ; 2 sin 60°) = (1 ; √3), et √3 ≈ 1,73.'},
   {q:'b) Quelle est l’ordonnée de <i>M</i>₂ = <i>S</i>₂(<i>M</i>₁)&nbsp;?',lab:'y =',ans:2,tol:.001,hint:`Matrice de <i>S</i>₂ avec α = 75° : cos 150° = −√3/2 et sin 150° = ½.`,why:'<i>x</i> = −√3/2·1 + ½·√3 = 0 et <i>y</i> = ½·1 + √3/2·√3 = ½ + 3/2 = 2. Donc <i>M</i>₂ = (0 ; 2).'},
   {q:'c) <i>S</i>₂ ∘ <i>S</i>₁ est une rotation de centre <i>O</i>. Quel est son angle&nbsp;?',lab:'θ =',unit:'°',ans:90,tol:.001,hint:'Compare <i>M</i>(2 ; 0) et <i>M</i>₂(0 ; 2), ou multiplie les deux matrices.',why:`Le produit des matrices vaut ${mat([[0,-1],[1,0]])} = R<sub>90°</sub>. C’est le double de l’angle entre les miroirs : 2·(75° − 30°) = 90°.`},
   {q:'d) Et si l’on applique d’abord <i>S</i>₂, puis <i>S</i>₁&nbsp;?',opts:['On obtient la même rotation de 90°.','On obtient une symétrie axiale.','On obtient l’identité.','On obtient la rotation d’angle −90°.'],ans:3,
    hint:'<i>S</i>₁ ∘ <i>S</i>₂ est l’inverse de <i>S</i>₂ ∘ <i>S</i>₁, car chaque symétrie est sa propre inverse.',
    why:`(<i>S</i>₂ ∘ <i>S</i>₁)⁻¹ = <i>S</i>₁⁻¹ ∘ <i>S</i>₂⁻¹ = <i>S</i>₁ ∘ <i>S</i>₂. L’inverse de R<sub>90°</sub> est R<sub>−90°</sub>, de matrice ${mat([[0,1],[-1,0]])}. La composition n’est pas commutative.`},
  ],
  sol:`Avec α = 30°, <i>S</i>₁ = ${mat([['½','√3/2'],['√3/2','−½']])} et <i>M</i>₁ = (1 ; √3). Avec α = 75°, <i>S</i>₂ = ${mat([['−√3/2','½'],['½','√3/2']])} et <i>M</i>₂ = (0 ; 2).<br>En général, ${mat([['cos 2β','sin 2β'],['sin 2β','−cos 2β']])}·${mat([['cos 2α','sin 2α'],['sin 2α','−cos 2α']])} = ${mat([['cos 2(β − α)','−sin 2(β − α)'],['sin 2(β − α)','cos 2(β − α)']])} (formules d’addition).<br>Donc <i>S</i>₂ ∘ <i>S</i>₁ est la <b>rotation de centre <i>O</i> et d’angle 2(β − α) = 90°</b> : <i>M</i>(2 ; 0) va en (0 ; 2).<br>Dans l’autre ordre, on obtient la rotation inverse, d’angle −90°. Deux miroirs parallèles donneraient de la même façon une translation.`},
 {kind:'Problème',h:'Le centre caché d’une rotation',
  p:`On définit la transformation <i>f</i> du plan par : on tourne <i>M</i> d’un quart de tour autour de l’origine <i>O</i>, puis on translate le résultat du vecteur ${B('t')} = (4 ; 0). Autrement dit, <i>f</i>(<i>M</i>) = R<sub>90°</sub>·<i>M</i> + ${B('t')}. Ce n’est pas une application linéaire, car <i>f</i>(<i>O</i>) ≠ <i>O</i>. On veut montrer que <i>f</i> est pourtant une rotation, mais autour d’un autre centre Ω, puis étudier <i>f</i> ∘ <i>f</i>.`,
  fig:(()=>{ const P=plane({x:[-1,6],y:[-1,6],lab:1}); P.poly(LSH.map(([x,y])=>[x+2.5,y-.5]),{fill:'var(--muted)',fo:.2,c:'var(--muted)',w:1.5}).poly(LSH.map(([x,y])=>[-(y-.5)+4,x+2.5]),{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2});
    P.seg(2,2,5,3,{c:'var(--muted)',w:1.5,dash:true}).seg(2,2,1,5,{c:'var(--muted)',w:1.5,dash:true});
    P.dot(2,2,{r:5,c:'var(--ink)',l:'Ω',dx:-18}).dot(5,3,{l:'M'}).dot(1,5,{l:'f(M)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’abscisse de <i>f</i>(<i>O</i>)&nbsp;?',lab:'x =',ans:4,tol:.001,hint:'La rotation laisse <i>O</i> en place.',why:'R<sub>90°</sub>·<i>O</i> = <i>O</i>, puis on ajoute (4 ; 0) : <i>f</i>(<i>O</i>) = (4 ; 0).'},
   {q:'b) Un point fixe Ω vérifie <i>f</i>(Ω) = Ω. Quelle est son abscisse&nbsp;?',lab:'x =',ans:2,tol:.001,hint:'R<sub>90°</sub>(<i>x</i> ; <i>y</i>) = (−<i>y</i> ; <i>x</i>). Résous (−<i>y</i> + 4 ; <i>x</i>) = (<i>x</i> ; <i>y</i>).',why:'La 2e équation donne <i>y</i> = <i>x</i>, la 1re −<i>x</i> + 4 = <i>x</i>, donc <i>x</i> = 2. Ω = (2 ; 2).'},
   {q:'c) Quelle est la nature de <i>f</i>&nbsp;?',opts:[
     'La rotation de centre <i>O</i> et d’angle 90°.',
     'La rotation de centre Ω et d’angle 90°.',
     'Une translation de vecteur (4 ; 0).',
     'La symétrie axiale d’axe <i>y</i> = <i>x</i>.'],ans:1,
    hint:`Soustrais <i>f</i>(Ω) = Ω de <i>f</i>(<i>M</i>) pour exprimer ${ar('Ωf(M)')} en fonction de ${ar('ΩM')}.`,
    why:`<i>f</i>(<i>M</i>) − <i>f</i>(Ω) = R<sub>90°</sub>(<i>M</i> − Ω), car ${B('t')} disparaît. Donc ${ar('Ωf(M)')} = R<sub>90°</sub> ${ar('ΩM')} : c’est la rotation de centre Ω et d’angle 90°.`},
   {q:'d) Quelle est l’abscisse de l’image de <i>M</i>(5 ; 3)&nbsp;?',lab:'x′ =',ans:1,tol:.001,hint:`Calcule R<sub>90°</sub>(5 ; 3) + (4 ; 0), puis vérifie en tournant ${ar("ΩM")} autour de Ω.`,why:`R<sub>90°</sub>(5 ; 3) = (−3 ; 5), plus (4 ; 0) donne (1 ; 5). Avec Ω : ${ar("ΩM")} = (3 ; 1) tourne en (−1 ; 3), et Ω + (−1 ; 3) = (1 ; 5).`},
   {q:'e) Que vaut <i>f</i> ∘ <i>f</i>&nbsp;?',opts:[
     'La translation de vecteur (8 ; 0).',
     'L’identité.',
     'La rotation de centre <i>O</i> et d’angle 180°.',
     'La symétrie centrale de centre Ω(2 ; 2).'],ans:3,
    hint:'Calcule <i>f</i>(<i>f</i>(<i>M</i>)) avec R<sub>90°</sub>·R<sub>90°</sub> = R<sub>180°</sub> = −<i>I</i>.',
    why:`<i>f</i>(<i>f</i>(<i>M</i>)) = R<sub>180°</sub><i>M</i> + R<sub>90°</sub>${B("t")} + ${B("t")} = −<i>M</i> + (0 ; 4) + (4 ; 0) = −<i>M</i> + (4 ; 4). Son point fixe est (2 ; 2) : c’est la symétrie centrale de centre Ω, soit deux quarts de tour autour de Ω.`},
  ],
  sol:`<i>f</i>(<i>x</i> ; <i>y</i>) = (−<i>y</i> + 4 ; <i>x</i>), donc <i>f</i>(<i>O</i>) = (4 ; 0) : <i>f</i> n’est pas linéaire.<br>Point fixe : −<i>y</i> + 4 = <i>x</i> et <i>x</i> = <i>y</i> donnent <b>Ω(2 ; 2)</b>.<br>En soustrayant <i>f</i>(Ω) = Ω : <i>f</i>(<i>M</i>) − Ω = R<sub>90°</sub>(<i>M</i> − Ω). Donc <i>f</i> est la <b>rotation de centre Ω et d’angle 90°</b>. Exemple : <i>f</i>(5 ; 3) = (1 ; 5).<br>Deux fois de suite : <i>f</i> ∘ <i>f</i>(<i>M</i>) = −<i>M</i> + (4 ; 4), la <b>symétrie centrale de centre Ω</b>.<br>À retenir : une rotation suivie d’une translation est une rotation de même angle, dont il suffit de chercher le centre (le point fixe).`},
]},

/* =============== 7. DROITES ET PLANS DE L’ESPACE =============== */
{subj:'ga', sem:'all', id:'ga-plans', h:'Droites et plans de l’espace', p:'Équations de droites et de plans en 3D, vecteur normal, intersections et distance d’un point à un plan.', steps:[
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
 {kind:'Problème',h:'L’ombre du mât',
  p:`Un mât vertical de 6 m est planté en <i>O</i>(0 ; 0 ; 0) sur un sol horizontal, le plan <i>z</i> = 0 ; son sommet est <i>S</i>(0 ; 0 ; 6). Les rayons du soleil sont parallèles au vecteur ${B('u')} = (2 ; 1 ; −1). Un mur vertical se dresse selon le plan <i>x</i> + <i>y</i> − 12 = 0. On veut savoir où tombe l’ombre du sommet, avec et sans le mur, et sous quel angle le soleil éclaire.`,
  fig:(()=>{ const S=spc([6,4,2],{r:8.5,az:-70,el:28}); S.poly([[-2,-2,0],[12,-2,0],[12,8,0],[-2,8,0]],{fill:'var(--muted)',fo:.08,c:null}).poly([[5,7,0],[11,1,0],[11,1,4],[5,7,4]],{fill:'var(--sci)',fo:.2,c:'var(--sci)',w:1.5});
    S.seg([0,0,0],[0,0,6],{c:'var(--ink)',w:4}).seg([0,0,6],[12,6,0],{c:'var(--spark)',w:1.5,dash:true}).seg([0,0,0],[8,4,0],{c:'var(--muted)',w:4}).seg([8,4,0],[8,4,2],{c:'var(--muted)',w:4});
    S.dot([0,0,6],{r:4,c:'var(--ink)',l:'S'}).dot([0,0,0],{r:4,c:'var(--ink)',l:'O',dx:-14}).dot([12,6,0],{r:4,c:'var(--spark)',l:'T'}).dot([8,4,2],{l:'W'}); return S.svg(); })(),
  parts:[
   {q:'a) Sans le mur, l’ombre du sommet tombe au sol en <i>T</i>. Quelle est l’abscisse de <i>T</i>&nbsp;?',lab:'x =',unit:'m',ans:12,tol:.001,hint:`Le rayon passant par <i>S</i> est <i>S</i> + <i>t</i>${B("u")}. Il touche le sol quand <i>z</i> = 0.`,why:'6 − <i>t</i> = 0 donne <i>t</i> = 6, et <i>T</i> = (0 ; 0 ; 6) + 6(2 ; 1 ; −1) = (12 ; 6 ; 0). L’ombre mesurerait √(144 + 36) ≈ 13,42 m.'},
   {q:'b) Quelle est la hauteur du soleil, c’est-à-dire l’angle entre les rayons et le sol&nbsp;? Arrondis au centième de degré.',lab:'h =',unit:'°',ans:24.09,tol:.006,hint:`L’angle φ entre une droite et un plan vérifie sin φ = |${B("u")}·${B("n")}| / (‖${B("u")}‖ ‖${B("n")}‖), avec ${B("n")} = (0 ; 0 ; 1) normal au sol.`,why:'sin φ = 1/√6 ≈ 0,408, donc φ ≈ 24,09°. Vérification : tan φ = 6 / 13,42 ≈ 0,447.'},
   {q:'c) Le mur arrête le rayon issu de <i>S</i> en un point <i>W</i>. À quelle hauteur se trouve <i>W</i>&nbsp;?',lab:'z =',unit:'m',ans:2,tol:.001,hint:'Remplace (2<i>t</i> ; <i>t</i> ; 6 − <i>t</i>) dans l’équation du mur.',why:'2<i>t</i> + <i>t</i> − 12 = 0 donne <i>t</i> = 4, donc <i>W</i> = (8 ; 4 ; 2) : l’ombre du sommet est à 2 m de haut sur le mur.'},
   {q:'d) Quelle forme a l’ombre du mât sur le mur&nbsp;?',opts:[
     'Un segment incliné qui monte de (8 ; 4 ; 0) jusqu’à (12 ; 6 ; 0).',
     'Un seul point, car le mât est vertical.',
     'Un segment vertical de 2 m, de (8 ; 4 ; 0) à (8 ; 4 ; 2).',
     'Un segment vertical de 6 m, comme le mât.'],ans:2,
    hint:'Prends un point (0 ; 0 ; <i>h</i>) du mât et cherche où son rayon touche le mur.',
    why:'Le rayon issu de (0 ; 0 ; <i>h</i>) touche le mur pour 3<i>t</i> = 12, soit <i>t</i> = 4 quel que soit <i>h</i>, au point (8 ; 4 ; <i>h</i> − 4). Les points du mât avec 4 ≤ <i>h</i> ≤ 6 donnent un segment vertical de 2 m. Le bas du mât fait son ombre au sol, de <i>O</i> à (8 ; 4 ; 0).'},
  ],
  sol:`Rayon issu du sommet : (2<i>t</i> ; <i>t</i> ; 6 − <i>t</i>).<br>Sans mur, il touche le sol (<i>z</i> = 0) pour <i>t</i> = 6 : <b><i>T</i>(12 ; 6 ; 0)</b>, une ombre de √180 ≈ 13,42 m.<br>Hauteur du soleil : sin φ = |${B('u')}·(0 ; 0 ; 1)| / ‖${B('u')}‖ = 1/√6, soit <b>φ ≈ 24,09°</b>.<br>Avec le mur <i>x</i> + <i>y</i> = 12 : 3<i>t</i> = 12, <i>t</i> = 4 et <b><i>W</i>(8 ; 4 ; 2)</b>. Le mur est atteint avant le sol, car 4 &lt; 6.<br>Pour un point (0 ; 0 ; <i>h</i>) du mât, le rayon touche aussi le mur à <i>t</i> = 4, en (8 ; 4 ; <i>h</i> − 4). L’ombre est donc un trait au sol de <i>O</i> à (8 ; 4 ; 0), long de √80 ≈ 8,94 m, prolongé par un <b>segment vertical de 2 m</b> sur le mur.`},
 {kind:'Problème',h:'Le drone et l’antenne',
  p:`Un drone vole en ligne droite : sa position au temps <i>t</i> (en secondes, coordonnées en mètres) est <i>D</i>(<i>t</i>) = (0 ; 0 ; 20) + <i>t</i>(2 ; 2 ; 1). Le sommet d’une antenne relais est en <i>A</i>(24 ; 12 ; 20). Le point de la trajectoire le plus proche de <i>A</i> est le pied <i>H</i> de la perpendiculaire : c’est l’intersection de la trajectoire avec le plan Π passant par <i>A</i> et de vecteur normal ${B('u')} = (2 ; 2 ; 1). L’antenne capte le drone tant qu’il est à moins de 13 m.`,
  fig:(()=>{ const S=spc([12,10,16],{r:20,az:-35,el:20}); S.seg([0,0,20],[28,28,34],{c:'var(--accent)',w:3}).seg([24,12,0],[24,12,20],{c:'var(--ink)',w:4}).seg([24,12,20],[16,16,28],{c:'var(--spark)',w:2,dash:true});
    S.dot([0,0,20],{r:4,c:'var(--muted)',l:'D(0)',dx:-34}).dot([24,12,20],{r:5,c:'var(--ink)',l:'A'}).dot([16,16,28],{l:'H'}); return S.svg(); })(),
  parts:[
   {q:'a) Le plan Π a pour équation 2<i>x</i> + 2<i>y</i> + <i>z</i> + <i>d</i> = 0. Que vaut <i>d</i>&nbsp;?',lab:'d =',ans:-92,tol:.001,hint:'Écris que <i>A</i> est dans le plan.',why:'2·24 + 2·12 + 20 + <i>d</i> = 0 donne <i>d</i> = −92.'},
   {q:'b) À quel instant le drone traverse-t-il Π&nbsp;?',lab:'t =',unit:'s',ans:8,tol:.001,hint:'Remplace (2<i>t</i> ; 2<i>t</i> ; 20 + <i>t</i>) dans l’équation de Π.',why:'4<i>t</i> + 4<i>t</i> + 20 + <i>t</i> − 92 = 0, soit 9<i>t</i> = 72 et <i>t</i> = 8. Le pied est <i>H</i> = (16 ; 16 ; 28).'},
   {q:'c) Quelle est la plus courte distance entre le drone et le sommet de l’antenne&nbsp;?',lab:'AH =',unit:'m',ans:12,tol:.001,hint:`Calcule ${ar('HA')} et sa norme.`,why:`${ar('HA')} = (8 ; −4 ; −8), de norme √(64 + 16 + 64) = √144 = 12 m. On vérifie que ${ar('HA')}·${B('u')} = 16 − 8 − 8 = 0.`},
   {q:'d) Pourquoi <i>H</i> est-il bien le point le plus proche&nbsp;?',opts:[
     'Parce que <i>H</i> est le point de la trajectoire le plus haut.',
     `Pour tout point <i>M</i> de la trajectoire, ${ar('HA')} ⊥ ${ar('HM')}, donc <i>AM</i>² = <i>AH</i>² + <i>HM</i>² ≥ <i>AH</i>² (Pythagore).`,
     'Parce que <i>H</i> a la même cote que <i>A</i>.',
     'Parce que le drone est le plus lent en <i>H</i>.'],ans:1,
    hint:`${ar('HM')} est colinéaire à ${B('u')}, et ${B('u')} est normal à Π.`,
    why:`${ar('HA')} est dans Π, donc orthogonal à ${B('u')} et à tout ${ar('HM')}. Le triangle <i>AHM</i> est rectangle en <i>H</i> : <i>AM</i> ≥ <i>AH</i>, avec égalité seulement si <i>M</i> = <i>H</i>. Le drone vole à vitesse constante (‖${B('u')}‖ = 3 m/s) et <i>H</i> est plus haut que <i>A</i>.`},
   {q:'e) Pendant combien de temps l’antenne capte-t-elle le drone&nbsp;? Arrondis au centième.',lab:'durée =',unit:'s',ans:10/3,tol:.006,hint:'Il faut <i>HM</i>² ≤ 13² − 12², et <i>HM</i> = 3|<i>t</i> − 8|.',why:'<i>HM</i>² ≤ 169 − 144 = 25, donc <i>HM</i> ≤ 5 m, soit |<i>t</i> − 8| ≤ 5/3. Le drone est capté de <i>t</i> ≈ 6,33 s à <i>t</i> ≈ 9,67 s, pendant 10/3 ≈ 3,33 s.'},
  ],
  sol:`Le plan Π passant par <i>A</i> et perpendiculaire à la trajectoire est <b>2<i>x</i> + 2<i>y</i> + <i>z</i> − 92 = 0</b>.<br>En remplaçant <i>D</i>(<i>t</i>) = (2<i>t</i> ; 2<i>t</i> ; 20 + <i>t</i>) : 9<i>t</i> − 72 = 0, donc <i>t</i> = 8 s et <b><i>H</i>(16 ; 16 ; 28)</b>.<br>${ar('HA')} = (8 ; −4 ; −8) est orthogonal à ${B('u')} et a pour norme <b>12 m</b> : c’est la distance minimale, car pour tout <i>M</i> de la trajectoire <i>AM</i>² = <i>AH</i>² + <i>HM</i>² (Pythagore).<br>Le drone parcourt 3 m par seconde, donc <i>HM</i> = 3|<i>t</i> − 8|. Il est capté si 144 + 9(<i>t</i> − 8)² ≤ 169, soit |<i>t</i> − 8| ≤ 5/3 : pendant <b>10/3 ≈ 3,33 s</b>.`},
]},

/* =============== 8. PRODUIT VECTORIEL =============== */
{subj:'ga', sem:'all', id:'ga-vectoriel', h:'Produit vectoriel et géométrie 3D', p:'Un vecteur orthogonal à deux autres, qui mesure des aires et, avec le produit mixte, des volumes.', steps:[
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
 {kind:'Problème',h:'Volume d’un tétraèdre',
  p:`Une pièce de charpente a la forme d’un tétraèdre de sommets <i>A</i>(1 ; 0 ; 1), <i>B</i>(3 ; 2 ; 1), <i>C</i>(1 ; 3 ; 2) et <i>D</i>(2 ; 1 ; 5), en décimètres. On veut calculer l’aire de la face <i>ABC</i>, le volume de la pièce et la hauteur issue de <i>D</i>, uniquement avec le produit vectoriel et le produit mixte.`,
  fig:(()=>{ const S=spc([2,1.5,2.5],{r:3.6,az:35,el:18}), A=[1,0,1], Bq=[3,2,1], C=[1,3,2], D=[2,1,5];
    S.poly([A,Bq,C],{fill:'var(--sci)',fo:.25,c:'var(--sci)',w:2}); [[A,D],[Bq,D],[C,D]].forEach(([p,q])=>S.seg(p,q,{c:'var(--accent)',w:2}));
    S.dot(A,{r:4,l:'A',dx:-16}).dot(Bq,{r:4,l:'B'}).dot(C,{r:4,l:'C'}).dot(D,{r:4,l:'D'}); return S.svg(); })(),
  parts:[
   {q:`a) Calcule ${ar('AB')} × ${ar('AC')}. Quelle est sa 3e composante&nbsp;?`,lab:'3e composante =',ans:6,tol:.001,hint:`${ar('AB')} = (2 ; 2 ; 0) et ${ar('AC')} = (0 ; 3 ; 1).`,why:`${ar('AB')} × ${ar('AC')} = (2·1 − 0·3 ; 0·0 − 2·1 ; 2·3 − 2·0) = (2 ; −2 ; 6).`},
   {q:'b) Quelle est l’aire du triangle <i>ABC</i>&nbsp;? Arrondis au centième.',lab:'aire =',unit:'dm²',ans:3.32,tol:.006,hint:'Aire = ½ ‖<b>AB</b> × <b>AC</b>‖.',why:'‖(2 ; −2 ; 6)‖ = √44 = 2√11, donc aire = √11 ≈ 3,32 dm².'},
   {q:`c) Quel est le volume du tétraèdre&nbsp;?`,lab:'V =',unit:'dm³',ans:4,tol:.001,hint:`V = |[${ar('AB')}, ${ar('AC')}, ${ar('AD')}]| / 6, avec ${ar('AD')} = (1 ; 1 ; 4).`,why:`(${ar('AB')} × ${ar('AC')})·${ar('AD')} = 2 − 2 + 24 = 24, donc V = 24/6 = 4 dm³.`},
   {q:'d) Quelle est la distance de <i>D</i> au plan <i>ABC</i>&nbsp;? Arrondis au centième.',lab:'h =',unit:'dm',ans:3.62,tol:.006,hint:'Pour un tétraèdre, V = ⅓ · aire de la base · hauteur.',why:'h = 3V / aire = 12 / √11 ≈ 3,62 dm. C’est aussi |[<b>AB</b>, <b>AC</b>, <b>AD</b>]| / ‖<b>AB</b> × <b>AC</b>‖ = 24/√44.'},
  ],
  sol:`${ar('AB')} = (2 ; 2 ; 0), ${ar('AC')} = (0 ; 3 ; 1), ${ar('AD')} = (1 ; 1 ; 4).<br>${ar('AB')} × ${ar('AC')} = (2 ; −2 ; 6), de norme √44. Aire de <i>ABC</i> = ½√44 = <b>√11 ≈ 3,32 dm²</b>.<br>Produit mixte : (2 ; −2 ; 6)·(1 ; 1 ; 4) = 24. Le parallélépipède construit sur les trois arêtes a un volume 24, le tétraèdre six fois moins : <b>V = 4 dm³</b>.<br>Hauteur : V = ⅓ · aire · h donne <b>h = 12/√11 ≈ 3,62 dm</b>. On retrouve la distance de <i>D</i> au plan <i>ABC</i> : ce plan a pour normale (1 ; −1 ; 3), d’équation <i>x</i> − <i>y</i> + 3<i>z</i> − 4 = 0, et |2 − 1 + 15 − 4| / √11 = 12/√11.`},
 {kind:'Problème',h:'Deux câbles qui ne se touchent pas',
  p:`Deux câbles tendus sont modélisés par des droites (coordonnées en mètres). Le premier passe par <i>A</i>(0 ; 0 ; 8) avec la direction ${B('u')} = (2 ; 2 ; 1), le second passe par <i>B</i>(1 ; 7 ; 10) avec la direction ${B('v')} = (2 ; −1 ; −2). On veut vérifier qu’ils ne se coupent pas, mesurer leur écart minimal, puis trouver où poser une entretoise entre eux : les points <i>P</i> = <i>A</i> + <i>t</i>${B('u')} et <i>Q</i> = <i>B</i> + <i>s</i>${B('v')} les plus proches, reliés par la <b>perpendiculaire commune</b>.`,
  fig:(()=>{ const S=spc([3,4,9],{r:8,az:-35,el:20}); S.seg([-2,-2,7],[8,8,12],{c:'var(--math)',w:3}).seg([-1,8,12],[7,4,4],{c:'var(--spark)',w:3}).seg([4,4,10],[3,6,8],{c:'var(--accent)',w:2.5,dash:true});
    S.dot([0,0,8],{r:4,c:'var(--math)',l:'A',dx:-14}).dot([1,7,10],{r:4,c:'var(--spark)',l:'B'}).dot([4,4,10],{r:4,l:'P'}).dot([3,6,8],{r:4,l:'Q'}); return S.svg(); })(),
  parts:[
   {q:`a) Quelle est la norme de ${B('u')} × ${B('v')}&nbsp;?`,lab:'‖u × v‖ =',ans:9,tol:.001,hint:'Calcule les trois composantes avec la formule du chapitre, puis la norme.',why:`${B('u')} × ${B('v')} = (2·(−2) − 1·(−1) ; 1·2 − 2·(−2) ; 2·(−1) − 2·2) = (−3 ; 6 ; −6), de norme √81 = 9.`},
   {q:'b) Pourquoi les câbles sont-ils gauches&nbsp;?',opts:[
     `Parce que ${B('u')}·${B('v')} = 0.`,
     `Parce que ${B('u')} × ${B('v')} ≠ 0 (directions non colinéaires) et [${ar('AB')}, ${B('u')}, ${B('v')}] ≠ 0 (${ar('AB')}, ${B('u')}, ${B('v')} non coplanaires).`,
     `Parce que ${B('u')} × ${B('v')} ≠ 0 suffit.`,
     'Parce que <i>A</i> et <i>B</i> n’ont pas la même cote.'],ans:1,
    hint:'Deux droites sécantes sont dans un même plan. Que vaudrait alors le produit mixte&nbsp;?',
    why:`${ar('AB')} = (1 ; 7 ; 2) et (−3 ; 6 ; −6)·(1 ; 7 ; 2) = −3 + 42 − 12 = 27 ≠ 0. Les deux droites ne sont ni parallèles ni coplanaires : elles sont gauches. ${B('u')}·${B('v')} = 0 dit seulement que les directions sont orthogonales.`},
   {q:'c) Quelle est la distance entre les deux câbles&nbsp;?',lab:'d =',unit:'m',ans:3,tol:.001,hint:`d = |[${ar('AB')}, ${B('u')}, ${B('v')}]| / ‖${B('u')} × ${B('v')}‖.`,why:'d = 27/9 = 3 m.'},
   {q:`d) Le segment [<i>PQ</i>] est perpendiculaire aux deux câbles : ${ar('PQ')}·${B('u')} = 0 et ${ar('PQ')}·${B('v')} = 0. Que vaut <i>t</i>&nbsp;?`,lab:'t =',ans:2,tol:.001,hint:`${ar('PQ')} = ${ar('AB')} + <i>s</i>${B('v')} − <i>t</i>${B('u')}. Ici ${B('u')}·${B('v')} = 0, ce qui découple les deux équations.`,why:`${ar('PQ')}·${B('u')} = ${ar('AB')}·${B('u')} − 9<i>t</i> = 18 − 9<i>t</i> = 0, donc <i>t</i> = 2. De même ${ar('AB')}·${B('v')} + 9<i>s</i> = −9 + 9<i>s</i> = 0 donne <i>s</i> = 1.`},
   {q:'e) À quelle hauteur se trouve le point <i>Q</i> du second câble&nbsp;?',lab:'z =',unit:'m',ans:8,tol:.001,hint:`<i>Q</i> = <i>B</i> + <i>s</i>${B("v")} avec la valeur de <i>s</i> trouvée.`,why:`<i>Q</i> = (1 ; 7 ; 10) + (2 ; −1 ; −2) = (3 ; 6 ; 8). Contrôle : <i>P</i> = (4 ; 4 ; 10) et ${ar("PQ")} = (−1 ; 2 ; −2), de norme 3.`},
  ],
  sol:`${B('u')} × ${B('v')} = (−3 ; 6 ; −6), de norme 9 : les directions ne sont pas colinéaires.<br>${ar('AB')} = (1 ; 7 ; 2) et [${ar('AB')}, ${B('u')}, ${B('v')}] = 27 ≠ 0 : les droites ne sont pas coplanaires, elles sont <b>gauches</b>.<br>Distance : volume du parallélépipède sur aire de sa base, <b>d = 27/9 = 3 m</b>.<br>Perpendiculaire commune : ${ar('PQ')} = ${ar('AB')} + <i>s</i>${B('v')} − <i>t</i>${B('u')}, orthogonal à ${B('u')} et à ${B('v')}. Comme ${B('u')}·${B('v')} = 0, on obtient 18 − 9<i>t</i> = 0 et −9 + 9<i>s</i> = 0, d’où <i>t</i> = 2 et <i>s</i> = 1.<br><b><i>P</i>(4 ; 4 ; 10)</b> et <b><i>Q</i>(3 ; 6 ; 8)</b>, avec ${ar('PQ')} = (−1 ; 2 ; −2) = ⅓ (${B('u')} × ${B('v')}), de norme 3 : on retrouve la distance.`},
]},

);
})();
