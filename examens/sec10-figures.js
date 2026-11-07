/* Déclic — examen de compétence : Figures planes et polygones réguliers */
(()=>{
const sg=(P,a,b,q={})=>P.seg(a[0],a[1],b[0],b[1],q);
const pt=(P,p,l,q={})=>P.dot(p[0],p[1],Object.assign({l,r:5},q));
const tri=(P,A,B,C)=>P.poly([A,B,C],{fill:'var(--accent)',fo:.1,c:'var(--accent)',w:2.5});
const arc=(P,c,r,a0,a1,q={})=>P.curve(t=>c[0]+r*Math.cos(t),t=>c[1]+r*Math.sin(t),a0,a1,Object.assign({w:1.6,n:40,c:'var(--muted)'},q));

const figMediatrice=(()=>{ const P=plane({x:[-5,5],y:[-3,4],grid:false,axes:false}), A=[-4,-2], B=[3,-2], C=[1.5,3];
  tri(P,A,B,C); P.seg(-.5,-3,-.5,4,{c:'var(--math)',w:2.5}); P.poly([[-.5,-2],[-.2,-2],[-.2,-1.7],[-.5,-1.7]],{open:true,c:'var(--ink)',w:1.3});
  pt(P,[-.5,-2],'',{r:3.5,c:'var(--muted)'}); pt(P,A,'A',{dx:-16}); pt(P,B,'B'); pt(P,C,'C'); return P.svg(); })();
const figRepere=(()=>{ const P=plane({x:[-5,5],y:[-2,5.5],lab:1}), A=[-4,0], B=[4,0], C=[0,4];
  tri(P,A,B,C); pt(P,A,'A',{dx:-6,dy:16}); pt(P,B,'B',{dy:16}); pt(P,C,'C'); return P.svg(); })();
const figBis=(()=>{ const P=plane({x:[-1,7],y:[-1,5],grid:false,axes:false}), A=[0,0], B=[6.5,0], C=[2.5,4.5], s=2.4;
  tri(P,A,B,C); const u=[C[0]/Math.hypot(...C),C[1]/Math.hypot(...C)], P1=[s,0], P2=[s*u[0],s*u[1]], Q=[P1[0]+P2[0],P1[1]+P2[1]];
  arc(P,A,s,-.1,Math.atan2(u[1],u[0])+.1); [P1,P2].forEach(c=>{ const t=Math.atan2(Q[1]-c[1],Q[0]-c[0]); arc(P,c,s,t-.3,t+.3); });
  sg(P,A,[Q[0]*1.5,Q[1]*1.5],{c:'var(--math)',w:2,dash:true}); pt(P,A,'A',{dx:-16}); pt(P,B,'B'); pt(P,C,'C'); return P.svg(); })();
const figGrav=(()=>{ const P=plane({x:[-1,9],y:[-1,13],w:240,lab:2}), A=[0,0], B=[8,0], C=[4,12];
  tri(P,A,B,C); sg(P,C,[4,0],{c:'var(--math)',w:1.6,dash:true}); pt(P,A,'A',{dx:-14}); pt(P,B,'B'); pt(P,C,'C'); pt(P,[4,0],'C′',{r:4,c:'var(--muted)',dy:16}); return P.svg(); })();
const figPenta=(()=>{ const P=plane({x:[-4,4],y:[-3.7,3.7],grid:false,axes:false}); P.circ(0,0,3,{c:'var(--line)',w:1.5});
  [0,72,144].forEach((a,k)=>{ const X=[3*Math.cos(rad(a)),3*Math.sin(rad(a))]; sg(P,[0,0],X,{c:'var(--muted)',w:1.3}); pt(P,X,'ABC'[k],{c:'var(--spark)'}); });
  pt(P,[0,0],'O',{r:4,c:'var(--ink)',dx:-14,dy:16}); return P.svg(); })();

EXAMS['sec10-figures']=[
 {n:'Reconnaître les droites remarquables', r:'Les droites remarquables d’un triangle', qs:[
   {q:'Quelle droite d’un triangle passe par un sommet et par le milieu du côté opposé&nbsp;?', opts:['Une hauteur','Une médiatrice','Une médiane','Une bissectrice'], ans:2, why:'La médiane relie un sommet au milieu du côté opposé. La médiatrice passe aussi par un milieu, mais elle est perpendiculaire au côté et ne passe en général pas par le sommet.'},
   {q:'Comment s’appelle la droite bleue&nbsp;? Elle coupe [AB] en son milieu, à angle droit.', fig:figMediatrice, opts:['La médiane issue de C','La médiatrice de [AB]','La hauteur issue de C','La bissectrice de l’angle en C'], ans:1, why:'Elle passe par le milieu de [AB] et lui est perpendiculaire : c’est la médiatrice de [AB]. Elle ne passe pas par C.'},
   {q:'Les trois bissectrices d’un triangle se coupent en un point. Lequel&nbsp;?', opts:['Le centre du cercle circonscrit','Le centre de gravité','Le centre du cercle inscrit','Le milieu du plus grand côté'], ans:2, why:'Le point commun des bissectrices est à la même distance des trois côtés : c’est le centre du cercle inscrit.'},
   {q:'Combien de médiatrices faut-il tracer, au minimum, pour trouver le centre du cercle circonscrit à un triangle&nbsp;?', lab:'nombre =', ans:2, why:'Deux médiatrices se coupent en un point, et la troisième passe forcément par ce point. Elle ne sert que de contrôle.'},
 ]},
 {n:'Le cercle circonscrit', r:'Les médiatrices et le cercle circonscrit', qs:[
   {q:'O est le centre du cercle circonscrit au triangle ABC et OA = 4,5 cm. Combien mesure OC&nbsp;?', unit:'cm', ans:4.5, tol:0.001, why:'O est à la même distance des trois sommets : OC = OA = 4,5 cm.'},
   {q:'Le triangle DEF est rectangle en D, avec DE = 6 cm et DF = 8 cm. Quel est le rayon de son cercle circonscrit&nbsp;?', unit:'cm', ans:5, why:'Hypoténuse : 6² + 8² = 100, donc EF = 10 cm. Dans un triangle rectangle, le centre est le milieu de l’hypoténuse : rayon = 10 : 2 = 5 cm.'},
   {q:'Un triangle a un angle obtus. Où se trouve le centre de son cercle circonscrit&nbsp;?', opts:['À l’intérieur du triangle','Au milieu du plus grand côté','À l’extérieur du triangle','Sur un sommet'], ans:2, why:'Avec un angle obtus, les médiatrices se coupent hors du triangle. Le milieu de l’hypoténuse, c’est seulement pour un triangle rectangle.'},
   {q:'Dans ce repère, A(−4 ; 0), B(4 ; 0) et C(0 ; 4). Quel est le rayon du cercle circonscrit au triangle ABC&nbsp;?', fig:figRepere, unit:'carreaux', ans:4, why:'Le point (0 ; 0) est à 4 carreaux de A, de B et de C : c’est le centre O, et le rayon vaut 4. (La médiatrice de [AB] est l’axe vertical, et OA = OC = 4.)'},
   {q:'Trois villages veulent installer une antenne à la même distance des trois. Quelle construction faut-il faire&nbsp;?', opts:['Tracer deux médianes du triangle formé par les villages','Tracer deux médiatrices de ce triangle','Tracer deux bissectrices de ce triangle','Tracer deux hauteurs de ce triangle'], ans:1, why:'Les points à égale distance de deux villages forment la médiatrice. L’intersection de deux médiatrices est à égale distance des trois.'},
 ]},
 {n:'Le cercle inscrit', r:'Construire le cercle circonscrit ou le cercle inscrit', qs:[
   {q:'Pour tracer le cercle inscrit de centre I, quel rayon prend-on&nbsp;?', opts:['La distance de I à un sommet','La distance de I à un côté, mesurée perpendiculairement','La moitié du plus grand côté','La distance de I au milieu d’un côté'], ans:1, why:'Le cercle inscrit touche les côtés : son rayon est la distance de I à un côté, mesurée à angle droit (avec l’équerre).'},
   {q:'Un jardinier veut le plus grand bassin rond possible dans un terrain triangulaire. Où place-t-il le centre du bassin&nbsp;?', opts:['Au croisement des médiatrices','Au croisement des médianes','Au croisement des bissectrices','Au milieu du plus long côté'], ans:2, why:'Le plus grand cercle qui tient dans le triangle est le cercle inscrit. Son centre est le croisement des bissectrices.'},
   {q:'Sur la figure, on a tracé un arc depuis A, puis deux petits arcs de même ouverture. Quelle droite (pointillés) construit-on&nbsp;?', fig:figBis, opts:['La bissectrice de l’angle en A','La médiatrice de [AB]','La hauteur issue de A','La médiane issue de A'], ans:0, why:'Les arcs forment un losange dont la diagonale partage l’angle en A en deux angles égaux : c’est la bissectrice.'},
   {q:'Le cercle inscrit d’un triangle a un diamètre de 5 cm. I est son centre et H le pied de la perpendiculaire de I sur [AB]. Combien mesure IH&nbsp;?', unit:'cm', ans:2.5, tol:0.001, why:'IH est un rayon du cercle inscrit : 5 : 2 = 2,5 cm.'},
 ]},
 {n:'Le centre de gravité et la règle des 2/3', r:'Calculer avec la règle des 2/3', qs:[
   {q:'Dans un triangle, la médiane [BB′] mesure 15 cm et G est le centre de gravité. Combien mesure BG&nbsp;?', unit:'cm', ans:10, why:'Une part vaut 15 : 3 = 5 cm. BG compte 2 parts : 10 cm.'},
   {q:'G est le centre de gravité du triangle ABC et GA′ = 3,5 cm (A′ milieu de [BC]). Combien mesure AG&nbsp;?', unit:'cm', ans:7, why:'GA′ est le petit morceau, 1 part. AG compte 2 parts : 2 · 3,5 = 7 cm.'},
   {q:'Le centre de gravité G est à 8 cm du sommet C. Combien mesure la médiane [CC′]&nbsp;?', unit:'cm', ans:12, why:'CG = 2 parts = 8 cm, donc 1 part = 4 cm. La médiane compte 3 parts : 12 cm.'},
   {q:'Pourquoi un triangle en carton tient-il en équilibre sur une pointe placée en G&nbsp;?', opts:['Parce que G est à la même distance des trois sommets','Parce que chaque médiane partage le triangle en deux parties de même aire','Parce que G est le centre du cercle inscrit','Parce que G est au milieu de chaque médiane'], ans:1, why:'Chaque médiane coupe le triangle en deux parties de même aire, donc de même poids. G est sur les trois médianes. Il est aux 2/3, pas au milieu.'},
   {q:'Sur ce quadrillage de 1 cm, A(0 ; 0), B(8 ; 0) et C(4 ; 12). À quelle hauteur au-dessus de [AB] se trouve le centre de gravité G&nbsp;?', fig:figGrav, unit:'cm', ans:4, why:'La médiane [CC′] est verticale, de C(4 ; 12) à C′(4 ; 0) : 12 cm. GC′ vaut 1 part : 12 : 3 = 4 cm. G(4 ; 4).'},
 ]},
 {n:'Les angles d’un polygone régulier', r:'Calculer les angles d’un polygone régulier', qs:[
   {q:'Quel est l’angle au centre d’un octogone régulier (8 côtés)&nbsp;?', unit:'°', ans:45, why:'360° : 8 = 45°.'},
   {q:'Quel est l’angle intérieur d’un décagone régulier (10 côtés)&nbsp;?', unit:'°', ans:144, why:'Angle au centre : 360° : 10 = 36°. Angle intérieur : 180° − 36° = 144°.'},
   {q:'Un polygone régulier a un angle au centre de 24°. Combien a-t-il de côtés&nbsp;?', lab:'n =', ans:15, why:'n = 360° : 24° = 15 côtés.'},
   {q:'Les angles intérieurs d’un polygone régulier mesurent 140°. Combien a-t-il de côtés&nbsp;?', lab:'n =', ans:9, why:'Angle au centre : 180° − 140° = 40°, puis n = 360° : 40° = 9 côtés.'},
   {q:'Un polygone a tous ses côtés de même longueur. Est-il forcément régulier&nbsp;?', opts:['Oui, toujours','Non : un losange a 4 côtés égaux sans avoir des angles égaux','Oui, s’il a plus de 3 côtés','Non, il faut aussi un nombre pair de côtés'], ans:1, why:'Un polygone régulier a ses côtés égaux et ses angles égaux. Le losange (non carré) a 4 côtés égaux mais deux angles aigus et deux obtus.'},
   {q:'Un polygone régulier peut-il avoir des angles intérieurs de 100°&nbsp;?', opts:['Oui, il a 4 côtés','Oui, il a 5 côtés','Non, car 360° : 80° n’est pas un nombre entier','Non, un angle intérieur est toujours un multiple de 60°'], ans:2, why:'L’angle au centre vaudrait 180° − 100° = 80°, et 360° : 80° = 4,5 : impossible, le nombre de côtés est entier.'},
 ]},
 {n:'Construire un polygone régulier', r:'Construire un polygone régulier dans un cercle', qs:[
   {q:'Pour construire un hexagone régulier au compas dans un cercle, quelle ouverture garde-t-on&nbsp;?', opts:['Le diamètre du cercle','Le rayon du cercle','La moitié du rayon','Une ouverture quelconque'], ans:1, why:'Le côté de l’hexagone régulier est égal au rayon : on reporte six fois le rayon sur le cercle.'},
   {q:'Tu construis au rapporteur un ennéagone régulier (9 côtés) dans un cercle. Quel angle sépare deux rayons voisins&nbsp;?', unit:'°', ans:40, why:'L’angle au centre vaut 360° : 9 = 40°.'},
   {q:'Pour un pentagone régulier, on mesure les angles depuis [OA] : 72° pour B, 144° pour C. Quel angle mesure-t-on depuis [OA] pour placer D&nbsp;?', fig:figPenta, unit:'°', ans:216, why:'Chaque sommet ajoute 72° : 3 · 72° = 216°. Mesurer depuis [OA] évite d’accumuler les erreurs.'},
   {q:'Un hexagone régulier est inscrit dans un cercle de rayon 3,5 cm. Quel est son périmètre&nbsp;?', unit:'cm', ans:21, tol:0.001, why:'Le côté est égal au rayon, 3,5 cm. Périmètre : 6 · 3,5 = 21 cm.'},
 ]},
 {n:'Dessiner à l’échelle', r:'Dessiner à l’échelle', qs:[
   {q:'Une chambre mesure 3,6 m de long. Quelle est sa longueur sur un plan à l’échelle 1:100&nbsp;?', unit:'cm', ans:3.6, tol:0.001, why:'3,6 m = 360 cm, et 360 : 100 = 3,6 cm.'},
   {q:'Sur une carte à l’échelle 1:25 000, deux refuges sont à 4 cm l’un de l’autre. Quelle est la distance réelle&nbsp;?', unit:'km', ans:1, tol:0.001, why:'4 · 25 000 = 100 000 cm = 1000 m = 1 km.'},
   {q:'Une rampe de skate de 7,5 m est dessinée par un segment de 15 cm. L’échelle est 1:<i>n</i>. Que vaut <i>n</i>&nbsp;?', lab:'n =', ans:50, why:'7,5 m = 750 cm, et 750 : 15 = 50. L’échelle est 1:50.'},
   {q:'Un hexagone régulier est dessiné à l’échelle 1:20. Que deviennent ses angles sur le dessin&nbsp;?', opts:['Ils sont divisés par 20','Ils restent de 120°','Ils sont multipliés par 20','Ils dépendent de la taille de la feuille'], ans:1, why:'Une échelle divise toutes les longueurs par le même nombre : la forme et les angles ne changent pas. Ils restent de 120°.'},
 ]},
];
})();
