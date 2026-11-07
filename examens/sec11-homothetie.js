/* Déclic — examen de compétence : Homothéties et similitudes */
(()=>{
const G=(x,y)=>plane({x,y,w:320,grid:false,axes:false});
const pnt=(P,X,s,dx,dy,c)=>{ P.dot(X[0],X[1],{r:4,c:c||'var(--ink)'}); P.text(X[0],X[1],s,{dx,dy}); };
// quadrillage avec O et A (et éventuellement A′)
function quad(O,A,Ap){ const P=plane({x:[-7,8],y:[-5,5],w:320,lab:2});
  pnt(P,O,'O',6,16); if(A) pnt(P,A,'A',6,-6,'var(--accent)'); if(Ap) pnt(P,Ap,'A′',6,-6,'var(--spark)'); return P.svg(); }

EXAMS['sec11-homothetie']=[
 {n:'Centre, rapport et position de l’image', r:'L’homothétie de rapport négatif', qs:[
   {q:'Par l’homothétie de centre O et de rapport 4, le point A tel que OA = 2,5 cm a pour image A′. Combien mesure OA′&nbsp;?', unit:'cm', ans:10, why:'OA′ = <i>k</i> × OA = 4 × 2,5 = 10 cm, sur la demi-droite [OA).'},
   {q:'Par l’homothétie de centre O et de rapport 0,6, quelle est la distance OA′ si OA = 5 cm&nbsp;?', unit:'cm', ans:3, tol:0.001, why:'OA′ = 0,6 × 5 = 3 cm. Le rapport est entre 0 et 1 : c’est une réduction.'},
   {q:'Quelle transformation est l’homothétie de centre O et de rapport −1&nbsp;?', opts:['La translation','La symétrie axiale','La symétrie centrale de centre O','La rotation de 90° de centre O'], ans:2, why:'Avec <i>k</i> = −1, M′ est de l’autre côté de O, à la même distance : c’est la symétrie centrale de centre O.'},
   {q:'A′ est l’image de A par une homothétie de centre O. OA = 6 cm, OA′ = 2 cm, et A′ est sur le segment [OA]. Quel est le rapport <i>k</i>&nbsp;?', lab:'k =', ans:1/3, tol:0.002, show:'1/3', why:'|<i>k</i>| = OA′ : OA = 2 : 6 = 1/3. A′ est du même côté de O que A, donc <i>k</i> = 1/3 (positif).'},
   {q:'A′ est l’image de A par une homothétie de centre O. OA = 5 cm, OA′ = 15 cm, et O est entre A et A′. Quel est le rapport&nbsp;?', opts:['3','−3','1/3','−1/3'], ans:1, why:'|<i>k</i>| = 15 : 5 = 3. A et A′ sont de part et d’autre de O : le rapport est négatif, <i>k</i> = −3.'},
 ]},
 {n:'Construire une image sur un quadrillage', r:'Construire l’image d’une figure', qs:[
   {q:'Dans un repère, O(0 ; 0) et A(3 ; −1). Quelles sont les coordonnées de l’image de A par l’homothétie de centre O et de rapport 2&nbsp;?', opts:['(6 ; −2)','(5 ; 1)','(−6 ; 2)','(6 ; 2)'], ans:0, why:'On multiplie le déplacement de O vers A par 2 : (2 × 3 ; 2 × (−1)) = (6 ; −2).'},
   {q:'Dans un repère, O(0 ; 0) et A(4 ; 2). Quelles sont les coordonnées de l’image de A par l’homothétie de centre O et de rapport −0,5&nbsp;?', opts:['(2 ; 1)','(−2 ; −1)','(−8 ; −4)','(3,5 ; 1,5)'], ans:1, why:'(−0,5 × 4 ; −0,5 × 2) = (−2 ; −1). Le rapport est négatif : l’image est de l’autre côté de O.'},
   {q:'Dans un repère, O(1 ; 1) et A(3 ; 2). L’homothétie de centre O et de rapport 3 envoie A sur A′. Quelle est l’abscisse <i>x</i> de A′&nbsp;?', fig:quad([1,1],[3,2]), lab:'x =', ans:7, why:'De O à A : 2 à droite et 1 en haut. Multiplié par 3 : 6 à droite et 3 en haut. Depuis O(1 ; 1), on arrive en A′(7 ; 4).'},
   {q:'Dans un repère, O(2 ; 0) et A(0 ; 3). L’homothétie de centre O et de rapport −2 envoie A sur A′. Quelle est l’ordonnée <i>y</i> de A′&nbsp;?', fig:quad([2,0],[0,3]), lab:'y =', ans:-6, why:'De O à A : 2 à gauche et 3 en haut, soit (−2 ; 3). Multiplié par −2 : (4 ; −6). Depuis O(2 ; 0), on arrive en A′(6 ; −6).'},
   {q:'Dans un repère, O(0 ; 0). Le point A′(−6 ; 9) est l’image d’un point A par l’homothétie de centre O et de rapport −3. Quelles sont les coordonnées de A&nbsp;?', opts:['(18 ; −27)','(−2 ; 3)','(2 ; −3)','(−3 ; 6)'], ans:2, why:'Le déplacement de O vers A, multiplié par −3, donne (−6 ; 9). On divise donc par −3 : (2 ; −3). Contrôle : −3 × 2 = −6 et −3 × (−3) = 9.'},
 ]},
 {n:'Longueurs, angles et parallélisme', r:'Ce que l’homothétie conserve', qs:[
   {q:'Par une homothétie de rapport 4, que devient un segment [AB] de 3,5 cm&nbsp;?', lab:'A′B′ =', unit:'cm', ans:14, why:'Les longueurs sont multipliées par |<i>k</i>| = 4 : 3,5 × 4 = 14 cm.'},
   {q:'Par une homothétie de rapport −0,25, que devient un segment de 12 cm&nbsp;?', unit:'cm', ans:3, why:'Les longueurs sont multipliées par |−0,25| = 0,25 : 12 × 0,25 = 3 cm. Une longueur n’est jamais négative.'},
   {q:'Un angle mesure 37°. Que mesure son image par une homothétie de rapport −2&nbsp;?', unit:'°', ans:37, why:'Une homothétie conserve les angles : 37°.'},
   {q:'Un triangle a un périmètre de 18 cm. Quel est le périmètre de son image par une homothétie de rapport −1,5&nbsp;?', unit:'cm', ans:27, why:'Le périmètre est une longueur : 18 × 1,5 = 27 cm.'},
   {q:'Par une homothétie, le segment [AB] a pour image [A′B′]. Que peut-on dire des droites (AB) et (A′B′)&nbsp;?', opts:['Elles sont perpendiculaires','Elles sont parallèles (ou confondues)','Elles se coupent toujours en O','On ne peut rien dire'], ans:1, why:'Les déplacements de A vers B sont multipliés par <i>k</i> : la direction ne change pas, donc (A′B′) ∥ (AB). Si (AB) passe par O, les deux droites sont confondues.'},
 ]},
 {n:'Calculer avec le rapport et les aires', r:'Calculer avec le rapport k', qs:[
   {q:'Une figure de 8 cm² est agrandie par une homothétie de rapport 3. Quelle est l’aire de l’image&nbsp;?', unit:'cm²', ans:72, why:'Les aires sont multipliées par <i>k</i>² = 9 : 8 × 9 = 72 cm².'},
   {q:'Une figure de 50 cm² est réduite par une homothétie de rapport 0,2. Quelle est l’aire de l’image&nbsp;?', unit:'cm²', ans:2, tol:0.001, why:'<i>k</i>² = 0,2² = 0,04, et 50 × 0,04 = 2 cm².'},
   {q:'Une figure de 7 cm² a pour image, par une homothétie de rapport −2, une figure de quelle aire&nbsp;?', unit:'cm²', ans:28, why:'<i>k</i>² = (−2)² = 4, donc 7 × 4 = 28 cm².'},
   {q:'Par une homothétie de rapport positif, l’aire d’un logo passe de 12 cm² à 75 cm². Quel est le rapport <i>k</i>&nbsp;?', lab:'k =', ans:2.5, tol:0.001, why:'Les aires sont multipliées par 75 : 12 = 6,25 = <i>k</i>². Donc <i>k</i> = √6,25 = 2,5.'},
   {q:'Un triangle de 20 cm² a un côté de 5 cm. Par une homothétie, ce côté devient 8 cm. Quelle est l’aire de l’image&nbsp;?', unit:'cm²', ans:51.2, tol:0.01, why:'|<i>k</i>| = 8 : 5 = 1,6 et <i>k</i>² = 2,56. Aire : 20 × 2,56 = 51,2 cm².'},
   {q:'Une maquette de bateau est réduite avec un rapport 1/10. La coque de la maquette a un volume de 2 dm³. Quel est le volume de la vraie coque&nbsp;?', unit:'dm³', ans:2000, why:'Pour passer de la maquette au vrai bateau, le rapport vaut 10 ; les volumes sont multipliés par 10³ = 1000 : 2 × 1000 = 2000 dm³ (soit 2 m³).'},
 ]},
 {n:'Figures semblables et similitudes', r:'Figures semblables et similitudes', qs:[
   {q:'Un rectangle de 4 cm sur 6 cm et un rectangle de 10 cm sur 15 cm sont-ils semblables&nbsp;?', opts:['Non, car 10 − 4 ≠ 15 − 6','Oui, de rapport 2,5','Oui, de rapport 6','Non, car ils n’ont pas la même aire'], ans:1, why:'10 : 4 = 2,5 et 15 : 6 = 2,5 : les longueurs sont proportionnelles, rapport 2,5.'},
   {q:'Un rectangle de 3 cm sur 5 cm et un rectangle de 6 cm sur 8 cm sont-ils semblables&nbsp;?', opts:['Oui, de rapport 2','Oui, car on ajoute 3 à chaque côté','Non, car 6 : 3 = 2 mais 8 : 5 = 1,6','Oui, tous les rectangles sont semblables'], ans:2, why:'Les deux rapports sont différents : 2 et 1,6. Les longueurs ne sont pas proportionnelles, les rectangles ne sont pas semblables.'},
   {q:'Deux figures sont semblables, de rapport 1,2. Un côté de la petite mesure 15 cm. Combien mesure le côté correspondant de la grande&nbsp;?', unit:'cm', ans:18, tol:0.001, why:'15 × 1,2 = 18 cm.'},
   {q:'Qu’est-ce qu’une similitude&nbsp;?', opts:['Une isométrie suivie d’une translation','Une homothétie suivie (ou non) d’une isométrie','Une transformation qui conserve les aires','Une symétrie axiale suivie d’une rotation'], ans:1, why:'Une similitude change la taille (homothétie), puis peut déplacer ou retourner la figure (isométrie).'},
 ]},
 {n:'Triangles semblables', r:'Calculer une longueur dans des triangles semblables', qs:[
   {q:'Un triangle a des angles de 35° et 80°. Un autre a des angles de 65° et 35°. Sont-ils semblables&nbsp;?', opts:['Non, ils n’ont qu’un angle commun','Oui : le troisième angle du premier vaut 65°','On ne peut pas savoir sans les longueurs','Non, car 80° ≠ 65°'], ans:1, why:'180° − 35° − 80° = 65°. Les deux triangles ont des angles de 35° et 65° : deux angles égaux suffisent.'},
   {q:'Un triangle a des angles de 40° et 60°. Un autre a des angles de 40° et 70°. Sont-ils semblables&nbsp;?', opts:['Oui, ils ont un angle de 40°','Non : leurs troisièmes angles valent 80° et 70°, leurs angles ne sont pas les mêmes','Oui, tous les triangles sont semblables','On ne peut pas savoir'], ans:1, why:'Premier triangle : 40°, 60°, 80°. Second : 40°, 70°, 70°. Un seul angle en commun ne suffit pas.'},
   {q:'Au même moment, une personne de 1,5 m a une ombre de 2 m et un immeuble a une ombre de 24 m. Quelle est la hauteur de l’immeuble&nbsp;?', unit:'m', ans:18, tol:0.001, why:'Angle droit au pied et même angle des rayons du Soleil : triangles semblables. Rapport 24 : 2 = 12, donc 1,5 × 12 = 18 m.'},
   {q:'Les triangles ABC et DEF sont semblables, avec A ↔ D, B ↔ E et C ↔ F. AB = 5 cm, AC = 8 cm et DE = 7,5 cm. Combien mesure DF&nbsp;?', unit:'cm', ans:12, tol:0.001, why:'DE correspond à AB : rapport 7,5 : 5 = 1,5. DF correspond à AC : 8 × 1,5 = 12 cm.'},
   {q:'Dans le triangle ABC, D est sur [AB] et E sur [AC], avec l’angle ADE égal à l’angle ABC. AD = 3 cm, AB = 7,5 cm et DE = 4 cm. Combien mesure BC&nbsp;?', fig:(()=>{ const P=G([-.5,8],[-.6,4.6]), A=[0,0], B=[7.5,0], C=[5,4.2], t=.4, Dd=[A[0]+t*(B[0]-A[0]),0], E=[A[0]+t*(C[0]-A[0]),A[1]+t*(C[1]-A[1])];
     P.poly([A,B,C],{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.1}); P.seg(Dd[0],Dd[1],E[0],E[1],{c:'var(--spark)',w:2.5});
     pnt(P,A,'A',-14,14); pnt(P,B,'B',4,14); pnt(P,C,'C',4,-6); pnt(P,Dd,'D',-4,16); pnt(P,E,'E',-14,-4); P.text(1.5,0,'3',{a:'middle',dy:14,s:11,c:'var(--muted)'}).text(2.5,.84,'4',{dx:6,s:11,c:'var(--muted)'}); return P.svg(); })(), unit:'cm', ans:10, tol:0.001, why:'Les triangles ADE et ABC ont l’angle A en commun et ADE = ABC : ils sont semblables. AD correspond à AB : rapport 7,5 : 3 = 2,5. BC correspond à DE : 4 × 2,5 = 10 cm.'},
 ]},
];
})();
