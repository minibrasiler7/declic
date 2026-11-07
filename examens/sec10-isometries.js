/* Déclic — examen de compétence : Isométries et compositions */
(()=>{
const GAM=[[0,0],[1,0],[1,2],[2,2],[2,3],[0,3]];
const mv=(S,f)=>S.map(p=>f(p[0],p[1]));
const pt=(P,p,l,q={})=>P.dot(p[0],p[1],Object.assign({l,r:4},q));
function pair(S,I,extra){ const P=plane({x:[-6,6],y:[-5,5],lab:2});
  P.poly(S,{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:2}); P.poly(I,{fill:'var(--spark)',fo:.35,c:'var(--spark)',w:2});
  if(extra) extra(P); return P.svg(); }
const figAxiale=pair(mv(GAM,(x,y)=>[x-4,y-1]),mv(GAM,(x,y)=>[4-x,y-1]));
const figTrans=pair(mv(GAM,(x,y)=>[x-5,y-4]),mv(GAM,(x,y)=>[x+1,y]));
const figRot=pair(mv(GAM,(x,y)=>[x+1,y-4]),mv(GAM,(x,y)=>[4-y,x+1]));
const figAxe=pair(mv(GAM,(x,y)=>[x-3,y-1]),mv(GAM,(x,y)=>[2-(x-3),y-1]));
const figCentre=(()=>{ const P=plane({x:[-4,6],y:[-2,5],lab:1}), S=[[4,0],[4,2],[3,2]], I=[[0,2],[-2,2],[-2,1]];
  P.poly(S,{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:2}); P.poly(I,{fill:'var(--spark)',fo:.35,c:'var(--spark)',w:2});
  ['A','B','C'].forEach((l,i)=>{ pt(P,S[i],l,{c:'var(--accent)'}); pt(P,I[i],l+'′',{c:'var(--spark)',dx:i?-20:8}); }); return P.svg(); })();
const figFrise=(()=>{ const P=plane({x:[0,12.5],y:[-1,4.6],grid:false,axes:false});
  P.seg(0,0,12.5,0,{c:'var(--line)',w:1}).seg(0,4,12.5,4,{c:'var(--line)',w:1});
  for(let k=0;k<5;k++){ const S=mv(GAM,(x,y)=>k%2?[.25+2.5*k+2-x,y+.5]:[.25+2.5*k+x,y+.5]); P.poly(S,{fill:k%2?'var(--spark)':'var(--accent)',fo:.35,c:k%2?'var(--spark)':'var(--accent)',w:2}); }
  P.seg(.25,-.4,2.75,-.4,{c:'var(--ink)',w:1.5}); P.text(1.5,-.4,'2,5 cm',{a:'middle',dy:15,s:11,c:'var(--muted)'}); return P.svg(); })();

EXAMS['sec10-isometries']=[
 {n:'Reconnaître une isométrie', r:'Les quatre isométries', qs:[
   {q:'Quelle isométrie transforme la figure orange en la figure rose&nbsp;?', fig:figAxiale, opts:['Une translation','Une rotation de 90°','Une symétrie axiale','Une symétrie centrale'], ans:2, why:'La figure rose est retournée (son bras pointe vers la gauche) : seule la symétrie axiale retourne une figure. Ici, l’axe est la droite verticale <i>x</i> = 0.'},
   {q:'Par quelle isométrie passe-t-on de la figure orange à la figure rose&nbsp;?', fig:figTrans, opts:['Une translation','Une symétrie axiale','Une symétrie centrale','Une rotation'], ans:0, why:'La figure a glissé sans tourner ni se retourner : c’est une translation, ici de 6 carreaux à droite et 4 vers le haut.'},
   {q:'La figure rose est l’image de la figure orange. De quelle isométrie s’agit-il&nbsp;?', fig:figRot, opts:['Une symétrie centrale','Une rotation d’un quart de tour','Une symétrie axiale','Une translation'], ans:1, why:'Le bras, qui pointait vers la droite, pointe maintenant vers le haut : la figure a tourné de 90° sans être retournée. Un demi-tour l’aurait mise la tête en bas.'},
   {q:'Laquelle de ces isométries est la seule à retourner une figure&nbsp;?', opts:['La translation','La rotation','La symétrie centrale','La symétrie axiale'], ans:3, why:'Comme un miroir, la symétrie axiale change un gant gauche en gant droit. La symétrie centrale est une rotation de 180° : elle ne retourne pas.'},
 ]},
 {n:'Retrouver l’axe, le centre ou le vecteur', r:'Retrouver l’axe, le centre de symétrie ou le vecteur', qs:[
   {q:'Par une symétrie axiale, A(2 ; 5) a pour image A′(8 ; 5). L’axe est une droite verticale <i>x</i> = <i>c</i>. Que vaut <i>c</i>&nbsp;?', lab:'c =', ans:5, why:'L’axe est la médiatrice de [AA′]. Milieu : ((2 + 8) : 2 ; 5) = (5 ; 5), et [AA′] est horizontal, donc l’axe est vertical : <i>x</i> = 5.'},
   {q:'Par une symétrie centrale, A(−3 ; 4) a pour image A′(5 ; −2). Quelle est l’abscisse du centre&nbsp;?', lab:'abscisse =', ans:1, why:'Le centre est le milieu de [AA′] : (−3 + 5) : 2 = 1. Son ordonnée vaut (4 − 2) : 2 = 1.'},
   {q:'Par une translation, A(−1 ; 3) a pour image A′(4 ; −2). Quel est le vecteur de la translation&nbsp;?', opts:['(−5 ; 5)','(3 ; 1)','(5 ; −5)','(5 ; 5)'], ans:2, why:'Arrivée moins départ : 4 − (−1) = 5 et −2 − 3 = −5. Vecteur (5 ; −5) : 5 à droite, 5 vers le bas.'},
   {q:'La figure rose est l’image de la figure orange par une symétrie axiale. Quel est l’axe&nbsp;?', fig:figAxe, opts:['La droite <i>x</i> = 0','La droite <i>x</i> = 1','La droite <i>y</i> = 1','La droite <i>x</i> = 2'], ans:1, why:'Le coin en bas à gauche de la figure orange, (−3 ; −1), va en (5 ; −1). Le milieu est ((−3 + 5) : 2 ; −1) = (1 ; −1) : l’axe est la verticale <i>x</i> = 1.'},
   {q:'Par une symétrie axiale, A(1 ; 1) a pour image A′(5 ; 3). Par quel point l’axe passe-t-il forcément&nbsp;?', opts:['(2 ; 1)','(3 ; 2)','(4 ; 2)','(6 ; 4)'], ans:1, why:'L’axe est la médiatrice de [AA′] : il passe par le milieu ((1 + 5) : 2 ; (1 + 3) : 2) = (3 ; 2).'},
 ]},
 {n:'Centre et angle d’une rotation', r:'Retrouver le centre et l’angle d’une rotation', qs:[
   {q:'Une rotation envoie A en A′. Sur quelle ligne se trouve forcément son centre&nbsp;?', opts:['La médiatrice de [AA′]','Le segment [AA′]','La droite (AA′)','La perpendiculaire à (AA′) passant par A'], ans:0, why:'Le centre est à la même distance de A et de A′ : il est sur la médiatrice de [AA′]. En général, il n’est pas sur [AA′].'},
   {q:'Une rotation envoie A(4 ; 0), B(4 ; 2), C(3 ; 2) en A′(0 ; 2), B′(−2 ; 2), C′(−2 ; 1). Quel est son centre&nbsp;?', fig:figCentre, opts:['(2 ; 1)','(0 ; 0)','(1 ; −1)','(−1 ; 1)'], ans:2, why:'Avec Ω(1 ; −1) : ΩA² = 3² + 1² = 10 = ΩA′² = 1² + 3², et ΩB² = 3² + 3² = 18 = ΩB′². (2 ; 1) n’est que le milieu de [AA′].'},
   {q:'Une rotation de centre O(0 ; 0) envoie A(5 ; 0) en A′(0 ; 5). Quel est son angle&nbsp;?', unit:'°', ans:90, why:'[OA] va vers la droite et [OA′] vers le haut : l’angle AOA′ est droit, 90°, dans le sens inverse des aiguilles d’une montre.'},
   {q:'Dans une rotation de centre Ω, le point A est à 7 cm de Ω. À quelle distance de Ω se trouve son image A′&nbsp;?', unit:'cm', ans:7, why:'Une rotation garde la distance au centre : ΩA′ = ΩA = 7 cm.'},
   {q:'On trace les médiatrices de [AA′] et de [BB′] : elles sont parallèles. Que peux-tu conclure&nbsp;?', opts:['C’est une rotation dont le centre est très loin, on prolonge plus','Ce n’est pas une rotation : c’est une translation','C’est une symétrie centrale','Le centre est le milieu de [AB]'], ans:1, why:'Des médiatrices parallèles ne se coupent pas : il n’y a pas de centre. La figure a glissé : c’est une translation.'},
 ]},
 {n:'Enchaîner deux symétries', r:'Remplacer deux symétries par une seule isométrie', qs:[
   {q:'Deux axes de symétrie sont parallèles, à 3,5 cm l’un de l’autre. On applique les deux symétries de suite. Quelle est la longueur de la translation obtenue&nbsp;?', unit:'cm', ans:7, tol:0.001, why:'Deux symétries d’axes parallèles donnent une translation de deux fois l’écart : 2 · 3,5 = 7 cm.'},
   {q:'Deux axes se coupent en formant un angle de 25°. On applique les deux symétries de suite. Quel est l’angle de la rotation obtenue&nbsp;?', unit:'°', ans:50, why:'Axes sécants : rotation d’angle double, 2 · 25° = 50°.'},
   {q:'On veut obtenir une rotation de 120° avec deux symétries d’axes sécants. Quel angle doivent faire les axes&nbsp;?', unit:'°', ans:60, why:'L’angle de la rotation est le double de celui des axes : 120° : 2 = 60°.'},
   {q:'Le point A(2 ; 1) subit la symétrie d’axe <i>x</i> = 3, puis celle d’axe <i>x</i> = 7. Quelle est l’abscisse de son image finale&nbsp;?', lab:'abscisse =', ans:10, why:'2 · 3 − 2 = 4, puis 2 · 7 − 4 = 10. Contrôle : translation de 2 · (7 − 3) = 8 vers la droite, 2 + 8 = 10.'},
   {q:'Deux axes sont perpendiculaires et se coupent en S. Quelle isométrie remplace les deux symétries&nbsp;?', opts:['La symétrie centrale de centre S','Une translation','Une symétrie axiale','Aucune : la figure ne bouge pas'], ans:0, why:'Axes à 90° : rotation de centre S et d’angle 2 · 90° = 180°, c’est-à-dire la symétrie centrale de centre S.'},
 ]},
 {n:'Frises et pavages', r:'Frises et pavages', qs:[
   {q:'Quelle isométrie superpose toujours une frise à elle-même&nbsp;?', opts:['Une rotation de 90°','Une translation le long de la bande','Une symétrie d’axe perpendiculaire à la bande, toujours','Aucune'], ans:1, why:'Une frise est un motif répété par une translation le long de la bande. Certaines frises ont aussi des symétries, mais pas toutes.'},
   {q:'Dans cette frise, le motif et son reflet alternent. Chaque motif occupe 2,5 cm. Quel est le pas de la frise&nbsp;?', fig:figFrise, unit:'cm', ans:5, tol:0.001, why:'Le motif ne revient identique (même orientation) qu’après son reflet : le pas vaut 2 · 2,5 = 5 cm.'},
   {q:'Lequel de ces polygones réguliers ne peut pas paver le plan à lui seul&nbsp;?', opts:['Le triangle équilatéral','Le carré','Le pentagone régulier','L’hexagone régulier'], ans:2, why:'Autour d’un sommet, les angles doivent faire 360°. 360 : 108 n’est pas entier pour le pentagone, alors que 6 · 60°, 4 · 90° et 3 · 120° font 360°.'},
 ]},
 {n:'Agrandissement et réduction', r:'Agrandir ou réduire : le rapport', qs:[
   {q:'Un rectangle de 4 cm sur 6 cm est agrandi avec un rapport de 2,5. Quelle est la longueur du grand côté de l’image&nbsp;?', unit:'cm', ans:15, tol:0.001, why:'Toutes les longueurs sont multipliées par 2,5 : 6 · 2,5 = 15 cm.'},
   {q:'Dans une réduction, un côté de 8 cm devient 6 cm. Quel est le rapport&nbsp;?', lab:'k =', ans:0.75, tol:0.001, why:'k = longueur de l’image : longueur de départ = 6 : 8 = 0,75.'},
   {q:'Un triangle a un angle de 35°. On l’agrandit avec un rapport 3. Combien mesure cet angle sur l’image&nbsp;?', unit:'°', ans:35, why:'Un agrandissement conserve les angles : 35°. Seules les longueurs sont multipliées par 3.'},
   {q:'Un agrandissement de rapport 3 est-il une isométrie&nbsp;?', opts:['Oui, car il conserve les angles','Non, car il ne conserve pas les longueurs','Oui, car la forme ne change pas','Non, car il retourne la figure'], ans:1, why:'Une isométrie conserve les longueurs. Ici elles sont multipliées par 3 : ce n’est une isométrie que pour un rapport 1.'},
 ]},
 {n:'Coordonnées des images', r:'Repérer les images avec des coordonnées', qs:[
   {q:'Le point B(−1 ; 2) subit la translation de vecteur (3 ; −4). Quelle est l’ordonnée de son image&nbsp;?', lab:'ordonnée =', ans:-2, why:'(−1 + 3 ; 2 − 4) = (2 ; −2) : l’ordonnée vaut −2.'},
   {q:'Quelle est l’image de (4 ; −3) par la symétrie d’axe des abscisses&nbsp;?', opts:['(−4 ; −3)','(4 ; 3)','(−4 ; 3)','(−3 ; 4)'], ans:1, why:'Le miroir horizontal garde l’abscisse et change le signe de l’ordonnée : (4 ; 3).'},
   {q:'Le point A(−1 ; 5) subit la symétrie d’axe vertical <i>x</i> = 2. Quelle est l’abscisse de son image&nbsp;?', lab:'abscisse =', ans:5, why:'2 · 2 − (−1) = 5. A est à 3 carreaux à gauche de l’axe, son image à 3 carreaux à droite : (5 ; 5).'},
   {q:'Quelle est l’image de (2 ; 5) par la rotation de 90° autour de l’origine, dans le sens inverse des aiguilles d’une montre&nbsp;?', opts:['(5 ; 2)','(−2 ; −5)','(5 ; −2)','(−5 ; 2)'], ans:3, why:'Règle (<i>x</i> ; <i>y</i>) → (−<i>y</i> ; <i>x</i>) : (−5 ; 2). La flèche « 2 à droite, 5 en haut » devient « 2 en haut, 5 à gauche ».'},
   {q:'Le point (3 ; −1) a pour image (−3 ; −1). Quelle isométrie a-t-on pu utiliser&nbsp;?', opts:['La symétrie de centre l’origine','La symétrie d’axe des abscisses','La symétrie d’axe des ordonnées','La rotation de 90° autour de l’origine'], ans:2, why:'Seule l’abscisse a changé de signe : c’est la règle (−<i>x</i> ; <i>y</i>) de la symétrie d’axe des ordonnées. Le centre l’origine aurait donné (−3 ; 1).'},
 ]},
];
})();
