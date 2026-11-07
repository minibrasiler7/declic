/* Déclic — examen de compétence : Isométries */
(()=>{
const D=Math.PI/180, pt=(O,r,t)=>[O[0]+r*Math.cos(t*D),O[1]+r*Math.sin(t*D)];
const sg=(P,A,B,q={})=>P.seg(A[0],A[1],B[0],B[1],q), dt=(P,A,l,q={})=>P.dot(A[0],A[1],Object.assign({l},q)), tx=(P,A,s,q={})=>P.text(A[0],A[1],s,q);
const grille=(x,y)=>plane({x,y,lab:1});
// drapeau : mât de (0;0) à (0;3), fanion (0;1)-(0;3)-(2;2) ; f transforme un point
function drapeau(P,f,c='var(--accent)'){ sg(P,f([0,0]),f([0,3]),{c,w:3}); P.poly([[0,1],[0,3],[2,2]].map(f),{c,w:2,fill:c,fo:.35}); return P; }
function rapporteur(P,O,R){ const pts=[]; for(let i=0;i<=60;i++) pts.push(pt(O,R,3*i)); P.poly(pts,{c:'var(--muted)',w:1.5,fill:'var(--sci)',fo:.08});
  for(let t=0;t<=180;t+=5) sg(P,pt(O,R,t),pt(O,R*(t%10?.95:.9),t),{c:'var(--muted)',w:t%10?1:1.5});
  for(let t=0;t<=180;t+=10){ tx(P,pt(O,R*.82,t),String(180-t),{a:'middle',dy:4,s:9,c:'var(--math)'}); tx(P,pt(O,R*.67,t),String(t),{a:'middle',dy:4,s:9,c:'var(--spark)'}); } P.dot(O[0],O[1],{r:3,c:'var(--ink)'}); }

EXAMS['sec9-isometries']=[
 {n:'La translation', r:'La translation', qs:[
   {q:'La translation « 2 cases à droite, 5 cases en bas » envoie A(−1 ; 3) sur…', opts:['(−3 ; 8)','(1 ; 8)','(1 ; −2)','(−2 ; −1)'], ans:2, why:'On ajoute 2 à l’abscisse et on retire 5 à l’ordonnée : (−1 + 2 ; 3 − 5) = (1 ; −2).'},
   {q:'Une translation envoie A(2 ; −1) sur A′(−3 ; 1). Quelle est l’abscisse de l’image de B(4 ; 4) ?', lab:'abscisse =', ans:-1, why:'De A à A′ : 5 cases à gauche et 2 en haut. B(4 ; 4) va donc en (4 − 5 ; 4 + 2) = (−1 ; 6).'},
   {q:'Un robot fait « 3 cases à droite, 1 en haut », puis « 2 cases à gauche, 4 en haut ». Une seule translation fait le même trajet. De combien de cases monte-t-elle ?', lab:'cases vers le haut :', ans:5, why:'On additionne les déplacements : à l’horizontale 3 − 2 = 1 case à droite, à la verticale 1 + 4 = 5 cases en haut.'},
   {q:'Quelle translation envoie le drapeau bleu sur le drapeau orange ?', fig:(()=>{ const P=grille([-5,5],[-4,4]); drapeau(P,p=>[p[0]-4,p[1]-3]); drapeau(P,p=>[p[0]+1,p[1]],'var(--spark)'); return P.svg(); })(), opts:['3 à droite, 5 en haut','5 à droite, 3 en haut','5 à droite, 3 en bas','4 à droite, 3 en haut'], ans:1, why:'Le pied du mât passe de (−4 ; −3) à (1 ; 0) : 5 cases à droite et 3 en haut.'},
 ]},
 {n:'La symétrie axiale', r:'Construire le symétrique d’un point par rapport à une droite', qs:[
   {q:'Quelle est l’ordonnée du symétrique de A(4 ; −3) par rapport à l’axe des abscisses ?', lab:'ordonnée =', ans:3, why:'A est à 3 cases sous l’axe horizontal : son symétrique est à 3 cases au-dessus. A′(4 ; 3).'},
   {q:'La droite <i>d</i> est verticale et passe par tous les points d’abscisse −1. Quelle est l’abscisse du symétrique de B(3 ; 2) par rapport à <i>d</i> ?', lab:'abscisse =', ans:-5, why:'B est à 4 cases à droite de <i>d</i> (de −1 à 3). Son symétrique est à 4 cases à gauche : −1 − 4 = −5.'},
   {q:'La droite <i>d</i> est horizontale. Quelle est l’ordonnée du symétrique de C par rapport à <i>d</i> ?', fig:(()=>{ const P=grille([-1,5],[-3,5]); P.seg(-1,1,5,1,{c:'var(--math)',w:3}); P.text(4.6,1,'d',{dy:-8,c:'var(--math)'}); dt(P,[2,4],'C',{c:'var(--accent)'}); return P.svg(); })(), lab:'ordonnée =', ans:-2, why:'<i>d</i> passe par les points d’ordonnée 1. C(2 ; 4) est 3 cases au-dessus : son symétrique est 3 cases au-dessous, à l’ordonnée 1 − 3 = −2.'},
   {q:'On prend pour axe la droite oblique formée des points (1 ; 1), (2 ; 2), (3 ; 3)… Quel est le symétrique de (5 ; 2) ?', opts:['(−5 ; 2)','(2 ; 5)','(5 ; −2)','(−2 ; −5)'], ans:1, why:'Par rapport à cette droite, les deux coordonnées s’échangent : (5 ; 2) devient (2 ; 5).'},
   {q:'Au compas, avec deux points P et Q de l’axe, on trace l’arc de centre P passant par M et l’arc de centre Q passant par M. Pourquoi leur autre point de croisement M′ est-il le symétrique de M ?', opts:['Parce que M′ est sur l’axe','Parce que PM = QM','Parce que les deux arcs ont le même rayon','Parce que PM = PM′ et QM = QM′ : l’axe (PQ) est la médiatrice de [MM′]'], ans:3, why:'P et Q sont chacun équidistants de M et de M′ : ils sont sur la médiatrice de [MM′], qui est donc la droite (PQ).'},
 ]},
 {n:'La symétrie centrale', r:'La symétrie centrale', qs:[
   {q:'Quel est le symétrique de (−2 ; 5) par rapport à O(0 ; 0) ?', opts:['(2 ; 5)','(−2 ; −5)','(2 ; −5)','(5 ; −2)'], ans:2, why:'Avec le centre O(0 ; 0), chaque coordonnée devient son opposé : (2 ; −5).'},
   {q:'Le centre de symétrie est O(1 ; 1). Quelle est l’abscisse du symétrique de A(4 ; 3) ?', lab:'abscisse =', ans:-2, why:'A est 3 cases à droite et 2 en haut de O. Son symétrique est 3 cases à gauche et 2 en bas de O : (1 − 3 ; 1 − 2) = (−2 ; −1).'},
   {q:'Laquelle de ces figures n’a pas de centre de symétrie ?', opts:['un rectangle','un triangle équilatéral','un cercle','un parallélogramme'], ans:1, why:'Un demi-tour retourne le triangle équilatéral pointe en bas : il ne se superpose pas à lui-même. Les trois autres figures ont un centre de symétrie.'},
   {q:'M′ est le symétrique de M par rapport au point O, et OM = 3,5 cm. Combien mesure MM′ ?', lab:'MM′ =', unit:'cm', ans:7, why:'O est le milieu de [MM′] : MM′ = 2 × 3,5 = 7 cm.'},
 ]},
 {n:'La rotation', r:'Construire l’image d’un point par une rotation', qs:[
   {q:'Rotation de centre O(0 ; 0), d’angle 90°, dans le sens horaire (celui des aiguilles d’une montre). Quelle est l’image de (0 ; 3) ?', opts:['(−3 ; 0)','(0 ; −3)','(3 ; 0)','(3 ; 3)'], ans:2, why:'Le point est 3 cases au-dessus de O, comme l’aiguille sur le 12. Un quart de tour dans le sens des aiguilles l’amène sur le 3 : 3 cases à droite, (3 ; 0).'},
   {q:'Rotation de centre O(0 ; 0), d’angle 90°, dans le sens anti-horaire. Quelle est l’image de (2 ; −3) ?', opts:['(3 ; 2)','(−3 ; −2)','(−2 ; 3)','(2 ; 3)'], ans:0, why:'Quart de tour anti-horaire : (<i>x</i> ; <i>y</i>) devient (−<i>y</i> ; <i>x</i>), donc (2 ; −3) devient (3 ; 2).'},
   {q:'Par une rotation de centre O d’angle 70°, M a pour image M′, et OM = 5 cm. Combien mesure OM′ ?', lab:'OM′ =', unit:'cm', ans:5, why:'Une rotation garde la distance au centre : OM′ = OM = 5 cm.'},
   {q:'Une rotation de 180° autour d’un point O, c’est la même chose que…', opts:['la symétrie axiale d’axe passant par O','la symétrie de centre O','une translation','un agrandissement de rapport 2'], ans:1, why:'Un demi-tour autour de O est la symétrie centrale de centre O.'},
   {q:'M′ est l’image de M par une rotation de centre O dans le sens anti-horaire. Lis l’angle de cette rotation.', fig:(()=>{ const P=plane({x:[-5.3,5.3],y:[-.7,5.6],grid:false,axes:false}), O=[0,0], M=[4.4,0], M2=pt(O,4.4,75);
     rapporteur(P,O,4.6); sg(P,O,M,{c:'var(--accent)',w:2.5}); sg(P,O,M2,{c:'var(--spark)',w:2.5}); dt(P,M,'M',{dy:16}); dt(P,M2,'M′',{c:'var(--spark)'}); P.text(0,0,'O',{a:'middle',dy:16}); return P.svg(); })(), lab:'angle =', unit:'°', ans:75, why:'[OM) est sur le 0 de droite : on lit la graduation intérieure, qui indique 75. L’angle est aigu, donc 75° et pas 105°.'},
 ]},
 {n:'Ce que conserve une isométrie', r:'Bouger sans déformer', qs:[
   {q:'Un triangle de périmètre 15 cm subit une symétrie axiale. Quel est le périmètre de son image ?', lab:'périmètre =', unit:'cm', ans:15, why:'Une isométrie conserve les longueurs, donc le périmètre : 15 cm.'},
   {q:'Laquelle de ces transformations n’est pas une isométrie ?', opts:['une rotation de 30°','une symétrie centrale','un agrandissement de rapport 2','une translation'], ans:2, why:'Un agrandissement de rapport 2 double les longueurs : il ne les conserve pas.'},
   {q:'Qu’est-ce qu’une symétrie axiale change dans une figure ?', opts:['les longueurs','les angles','le sens de parcours des sommets : la figure est retournée','l’aire'], ans:2, why:'Longueurs, angles et aires sont conservés. Mais la figure est retournée, comme dans un miroir.'},
 ]},
 {n:'Retrouver l’isométrie', r:'Retrouver l’axe, le centre ou la flèche', qs:[
   {q:'Par une symétrie centrale, A(1 ; 2) a pour image A′(5 ; 6). Quel est le centre ?', opts:['(4 ; 4)','(3 ; 4)','(6 ; 8)','(2 ; 2)'], ans:1, why:'Le centre est le milieu de [AA′]. De A à A′ : 4 cases à droite et 4 en haut ; à mi-chemin : 2 à droite et 2 en haut de A, soit (3 ; 4).'},
   {q:'Quelle isométrie envoie le drapeau bleu sur le drapeau orange ?', fig:(()=>{ const P=grille([-5,5],[-3,3]); drapeau(P,p=>[p[0]+1,p[1]-1]); drapeau(P,p=>[-(p[0]+1),p[1]-1],'var(--spark)'); return P.svg(); })(), opts:['une translation','une symétrie axiale','une symétrie centrale','une rotation de 90°'], ans:1, why:'Le drapeau orange est le reflet du bleu : il pointe dans l’autre sens, à la même hauteur. C’est la symétrie d’axe vertical passant par O.'},
   {q:'Par une symétrie axiale, A(−3 ; 2) a pour image A′(5 ; 2). Où est l’axe ?', opts:['la droite verticale qui passe par les points d’abscisse 1','la droite verticale qui passe par les points d’abscisse 2','l’axe des ordonnées','la droite horizontale qui passe par les points d’ordonnée 2'], ans:0, why:'L’axe est la médiatrice de [AA′]. [AA′] est horizontal et son milieu est à mi-chemin entre −3 et 5, en 1 : l’axe est la droite verticale d’abscisse 1.'},
   {q:'Une translation envoie A(2 ; 5) sur A′(−1 ; 3). De combien de cases la flèche va-t-elle vers la gauche ?', lab:'cases :', ans:3, why:'L’abscisse passe de 2 à −1 : 3 cases vers la gauche (et 2 cases vers le bas).'},
 ]},
 {n:'Frises et pavages', r:'Frises et pavages', qs:[
   {q:'Dans une frise, on passe d’un motif au suivant par…', opts:['une symétrie centrale','un agrandissement','une rotation de 90°','une translation'], ans:3, why:'Une frise répète son motif en le décalant toujours de la même flèche : c’est une translation.'},
   {q:'Lequel de ces polygones réguliers ne peut pas paver le plan à lui seul ?', opts:['le triangle équilatéral','le carré','le pentagone régulier','l’hexagone régulier'], ans:2, why:'Ses angles mesurent 108° : 3 × 108° = 324° et 4 × 108° = 432°, jamais 360° autour d’un sommet.'},
   {q:'Dans un pavage d’hexagones réguliers (angles de 120°), combien d’hexagones se rejoignent en chaque sommet ?', lab:'hexagones :', ans:3, why:'Les angles autour d’un sommet font 360° : 360° : 120° = 3 hexagones.'},
 ]},
 {n:'Agrandir et réduire', r:'Agrandir ou réduire avec un rapport', qs:[
   {q:'On agrandit une figure avec un rapport 3. Un côté de 4,5 cm devient…', lab:'longueur =', unit:'cm', ans:13.5, why:'Toutes les longueurs sont multipliées par 3 : 4,5 × 3 = 13,5 cm.'},
   {q:'Une photo de 10 cm sur 15 cm est agrandie : sa largeur de 10 cm devient 25 cm. Que devient sa longueur de 15 cm ?', lab:'longueur =', unit:'cm', ans:37.5, why:'Rapport <i>k</i> = 25 : 10 = 2,5. Longueur : 15 × 2,5 = 37,5 cm.'},
   {q:'Un triangle réduit avec un rapport 0,5 avait un angle de 64°. Combien mesure cet angle sur la réduction ?', lab:'angle =', unit:'°', ans:64, why:'Agrandir ou réduire ne change pas les angles : 64°.'},
   {q:'Un côté de 12 cm devient 3 cm sur une réduction. Quel est le rapport <i>k</i> ?', lab:'k =', ans:0.25, why:'<i>k</i> = longueur de l’image : longueur d’origine = 3 : 12 = 0,25.'},
 ]},
];
})();
