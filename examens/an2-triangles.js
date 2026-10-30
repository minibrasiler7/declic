/* Déclic — examen de compétence : Relations dans les triangles */
(()=>{
EXAMS['an2-triangles']=[
 {n:'Trigonométrie du triangle rectangle', r:'Le triangle rectangle', qs:[
   {q:'Un triangle rectangle a une hypoténuse de 10 et un angle aigu de 35°. Combien mesure le côté adjacent à cet angle&nbsp;? Arrondis au centième.', lab:'adjacent =', ans:8.19, tol:.006, why:'cos 35° = adjacent/hypoténuse, donc adjacent = 10 cos 35° ≈ 8,19.'},
   {q:'Une rampe monte de 1,2 m sur une distance horizontale de 15 m. Quel angle fait-elle avec le sol&nbsp;? Arrondis au centième de degré.', lab:'angle =', unit:'°', ans:4.57, tol:.006, why:'tan α = opposé/adjacent = 1,2/15 = 0,08, donc α = arctan(0,08) ≈ 4,57°.'},
   {q:'Quand le soleil est à 40° au-dessus de l’horizon, un mât vertical projette une ombre de 8 m. Quelle est sa hauteur&nbsp;? Arrondis au centième.', lab:'h =', unit:'m', ans:6.71, tol:.006, why:'La hauteur est opposée à l’angle de 40°, l’ombre est adjacente : h = 8 tan 40° ≈ 6,71 m.'},
   {q:'Dans un triangle rectangle, le côté opposé à l’angle α mesure 5 et l’hypoténuse 13. Combien vaut α&nbsp;? Arrondis au centième de degré.', lab:'α =', unit:'°', ans:22.62, tol:.006, why:'sin α = 5/13, donc α = arcsin(5/13) ≈ 22,62°.'},
   {q:'Une échelle de 6 m touche un mur vertical à 5,5 m de hauteur. Quel angle fait-elle avec le sol&nbsp;? Arrondis au centième de degré.', lab:'angle =', unit:'°', ans:66.44, tol:.006, why:'La hauteur est opposée à l’angle avec le sol et l’échelle est l’hypoténuse : sin α = 5,5/6, α ≈ 66,44°.'},
 ]},
 {n:'Loi des sinus', r:'La loi des sinus', qs:[
   {q:'Dans un triangle, α = 35°, β = 75° et <i>a</i> = 12. Calcule <i>b</i>, arrondi au centième.', lab:'b =', ans:20.21, tol:.006, why:'b = a · sin β / sin α = 12 · sin 75° / sin 35° ≈ 20,21.'},
   {q:'Dans un triangle, <i>a</i> = 10 et α = 30°. Quel est le rayon <i>R</i> du cercle circonscrit&nbsp;?', lab:'R =', ans:10, tol:.01, why:'a / sin α = 2R, donc 2R = 10/0,5 = 20 et R = 10.'},
   {q:'Dans un triangle, α = 50°, β = 65° et <i>a</i> = 9. Calcule <i>c</i>, arrondi au centième.', lab:'c =', ans:10.65, tol:.006, why:'γ = 180° − 50° − 65° = 65°, puis c = a · sin γ / sin α = 9 · sin 65° / sin 50° ≈ 10,65.'},
   {q:'Dans un triangle, α = 20°, β = 130° et <i>c</i> = 5. Calcule <i>a</i>, arrondi au centième.', lab:'a =', ans:3.42, tol:.006, why:'γ = 180° − 20° − 130° = 30°. a = c · sin α / sin γ = 5 · sin 20° / 0,5 ≈ 3,42.'},
   {q:'Dans un triangle, β = 40°, <i>b</i> = 6 et <i>a</i> = 5. Calcule α en degrés, arrondi au centième.', lab:'α =', unit:'°', ans:32.39, tol:.006, why:'sin α = a sin β / b = 5 sin 40° / 6 ≈ 0,536, donc α ≈ 32,39°. L’autre angle de même sinus, 147,61°, ne laisse pas de place à β = 40°.'},
 ]},
 {n:'Loi du cosinus et aire', r:'Loi du cosinus (Al-Kashi) et aire', qs:[
   {q:'Dans un triangle, <i>a</i> = 7, <i>b</i> = 9 et γ = 40°. Calcule <i>c</i>, arrondi au centième.', lab:'c =', ans:5.79, tol:.006, why:'c² = 49 + 81 − 2 · 7 · 9 · cos 40° ≈ 130 − 96,52 = 33,48, donc c ≈ 5,79.'},
   {q:'Dans un triangle, <i>a</i> = 4, <i>b</i> = 6 et γ = 120°. Calcule <i>c</i>, arrondi au centième.', lab:'c =', ans:8.72, tol:.006, why:'cos 120° = −1/2, donc c² = 16 + 36 + 24 = 76 et c = √76 ≈ 8,72.'},
   {q:'Deux côtés d’un triangle mesurent 8 et 5 et forment un angle de 30°. Quelle est l’aire du triangle&nbsp;?', lab:'A =', ans:10, tol:.01, why:'A = ½ ab sin γ = ½ · 8 · 5 · ½ = 10.'},
   {q:'Deux côtés d’un triangle mesurent 12 et 7 et forment un angle de 110°. Quelle est son aire&nbsp;? Arrondis au centième.', lab:'A =', ans:39.47, tol:.006, why:'A = ½ · 12 · 7 · sin 110° = 42 sin 110° ≈ 39,47.'},
   {q:'Dans un triangle, on constate que <i>c</i>² &gt; <i>a</i>² + <i>b</i>². Que peux-tu dire de l’angle γ opposé à <i>c</i>&nbsp;?', opts:['γ est aigu','γ est droit','On ne peut rien dire','γ est obtus'], ans:3, why:'c² = a² + b² − 2ab cos γ &gt; a² + b² impose −2ab cos γ &gt; 0, donc cos γ &lt; 0 : γ est obtus.'},
 ]},
 {n:'Trouver un angle avec la loi du cosinus', r:'Trouver un angle avec la loi du cosinus', qs:[
   {q:'Un triangle a pour côtés 5, 6 et 7. Calcule l’angle opposé au côté 7, en degrés, arrondi au centième.', lab:'γ =', unit:'°', ans:78.46, tol:.006, why:'cos γ = (25 + 36 − 49)/(2 · 5 · 6) = 12/60 = 0,2, donc γ = arccos(0,2) ≈ 78,46°.'},
   {q:'Un triangle a pour côtés 3, 5 et 7. Quel est son plus grand angle, en degrés&nbsp;?', lab:'γ =', unit:'°', ans:120, tol:.01, why:'Il est opposé au côté 7 : cos γ = (9 + 25 − 49)/30 = −15/30 = −1/2, donc γ = 120°.'},
   {q:'Un triangle a pour côtés 6, 8 et 10. Quel est son plus petit angle, en degrés, arrondi au centième&nbsp;?', lab:'α =', unit:'°', ans:36.87, tol:.006, why:'Il est opposé au plus petit côté, 6 : cos α = (64 + 100 − 36)/(2 · 8 · 10) = 128/160 = 0,8, donc α ≈ 36,87°.'},
   {q:'Un triangle isocèle a deux côtés de 4 et une base de 6. Quel est l’angle au sommet, en degrés, arrondi au centième&nbsp;?', lab:'angle =', unit:'°', ans:97.18, tol:.006, why:'L’angle au sommet est opposé à la base : cos γ = (16 + 16 − 36)/32 = −1/8, donc γ = arccos(−1/8) ≈ 97,18°.'},
   {q:'Un triangle a pour côtés 2, 3 et 4. Que vaut son angle opposé au côté 4&nbsp;?', opts:['Il est obtus, car son cosinus vaut −1/4','Il est aigu, car 4 &lt; 2 + 3','Il est droit','Il est obtus, car son cosinus vaut 1/4'], ans:0, why:'cos γ = (4 + 9 − 16)/(2 · 2 · 3) = −3/12 = −1/4 &lt; 0 : γ ≈ 104,5° est obtus.'},
 ]},
 {n:'Choisir l’outil pour résoudre un triangle', r:'Résoudre un triangle', qs:[
   {q:'On connaît deux côtés <i>a</i>, <i>b</i> et l’angle γ qu’ils forment. Par quoi commences-tu&nbsp;?', opts:['La loi des sinus, pour trouver α','La somme des angles, pour trouver β','La loi du cosinus, pour trouver c','On ne peut pas résoudre ce triangle'], ans:2, why:'Aucun couple côté et angle opposé n’est connu : la loi des sinus ne sert pas encore. La loi du cosinus donne c, puis les angles.'},
   {q:'Dans un triangle, α = 45°, γ = 60° et <i>b</i> = 10. Calcule <i>a</i>, arrondi au centième.', lab:'a =', ans:7.32, tol:.006, why:'D’abord β = 180° − 45° − 60° = 75°. Puis a = b · sin α / sin β = 10 sin 45° / sin 75° ≈ 7,32.'},
   {q:'Dans un triangle, <i>a</i> = 6, <i>b</i> = 10 et γ = 50°. Calcule α en degrés, arrondi au dixième.', lab:'α =', unit:'°', ans:36.8, tol:.06, why:'c² = 36 + 100 − 120 cos 50° ≈ 58,87, donc c ≈ 7,672. Puis cos α = (b² + c² − a²)/(2bc) = (100 + 58,87 − 36)/(2 · 10 · 7,672) ≈ 0,801, d’où α ≈ 36,8°.'},
   {q:'Dans un triangle, <i>a</i> = 8, β = 35° et γ = 100°. Calcule <i>c</i>, arrondi au centième.', lab:'c =', ans:11.14, tol:.006, why:'α = 180° − 35° − 100° = 45°. Puis c = a · sin γ / sin α = 8 sin 100° / sin 45° ≈ 11,14.'},
   {q:'On connaît seulement les trois angles d’un triangle : 50°, 60° et 70°. Combien de triangles conviennent&nbsp;?', opts:['Un seul','Aucun','Deux','Une infinité, tous de même forme'], ans:3, why:'Les angles fixent la forme mais pas la taille : il faut au moins un côté. Tous les triangles agrandis ou réduits conviennent.'},
 ]},
 {n:'Le cas ambigu', r:'Le cas ambigu : deux côtés et un angle non compris', qs:[
   {q:'α = 40°, <i>a</i> = 5 et <i>b</i> = 7. Combien de triangles vérifient ces données&nbsp;?', lab:'nombre =', ans:2, tol:.01, why:'sin β = 7 sin 40°/5 ≈ 0,900, donc β ≈ 64,1° ou β ≈ 115,9°. Dans les deux cas α + β &lt; 180° : deux triangles.'},
   {q:'α = 60°, <i>a</i> = 4 et <i>b</i> = 6. Combien de triangles vérifient ces données&nbsp;?', lab:'nombre =', ans:0, tol:.01, why:'sin β = 6 sin 60°/4 ≈ 1,30 &gt; 1 : impossible, aucun triangle.'},
   {q:'α = 30°, <i>a</i> = 4 et <i>b</i> = 8. Combien de triangles vérifient ces données&nbsp;?', lab:'nombre =', ans:1, tol:.01, why:'sin β = 8 · 0,5/4 = 1, donc β = 90° : les deux candidats β et 180° − β sont égaux. Un seul triangle, rectangle.'},
   {q:'α = 35°, <i>a</i> = 6 et <i>b</i> = 9. Dans le triangle où β est obtus, calcule <i>c</i>, arrondi au centième.', lab:'c =', ans:4.31, tol:.006, why:'sin β = 9 sin 35°/6 ≈ 0,860, β₁ ≈ 59,36°, β₂ ≈ 120,64°. Avec β₂ : γ ≈ 24,36° et c = 6 sin γ / sin 35° ≈ 4,31.'},
   {q:'La loi des sinus donne sin β = 0,6. Pourquoi faut-il tester aussi β₂ = 180° − β₁&nbsp;?', opts:['Parce que arcsin se trompe parfois','Parce que β et 180° − β ont le même sinus, et tous deux sont des angles possibles de triangle','Parce que la somme des angles vaut 360°','Ce n’est pas utile, β₁ suffit toujours'], ans:1, why:'sin(180° − β) = sin β. Dans ]0° ; 180°[, deux angles ont donc le sinus 0,6. On garde chacun s’il laisse α + β &lt; 180°.'},
 ]},
];
})();
