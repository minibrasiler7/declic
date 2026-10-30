/* Déclic — examen de compétence : L’angle et sa mesure */
(()=>{
EXAMS['an2-angle']=[
 {n:'Convertir degrés et radians', r:'Convertir', qs:[
   {q:'Combien vaut 210° en radians&nbsp;?', opts:['5π/6','7π/4','7π/6','4π/3'], ans:2, why:'θ = 210 · π/180 = 210π/180 = 7π/6 (on simplifie par 30).'},
   {q:'Convertis 5π/12 rad en degrés.', lab:'θ =', unit:'°', ans:75, tol:.01, why:'θ = (5π/12) · 180/π = 5 · 180/12 = 75°.'},
   {q:'Convertis 3,5 rad en degrés. Arrondis au dixième.', lab:'θ =', unit:'°', ans:200.5, tol:.06, why:'θ = 3,5 · 180/π = 630/π ≈ 200,5°.'},
   {q:'Convertis 40° en radians. Arrondis au millième.', lab:'θ =', unit:'rad', ans:.698, tol:.0006, why:'θ = 40 · π/180 = 2π/9 ≈ 0,698 rad.'},
   {q:'Convertis −11π/6 rad en degrés.', lab:'θ =', unit:'°', ans:-330, tol:.01, why:'θ = (−11π/6) · 180/π = −11 · 30 = −330°.'},
   {q:'Un énoncé parle d’un angle de 1,5, sans unité. De quoi s’agit-il&nbsp;?', opts:['De 1,5°','De 1,5π rad, soit 270°','De 1,5 rad, soit environ 85,9°','On ne peut pas le savoir'], ans:2, why:'Un angle sans unité est en radians : 1,5 · 180/π ≈ 85,9°.'},
 ]},
 {n:'Longueur d’arc et aire d’un secteur', r:'Longueur d’arc', qs:[
   {q:'Sur un cercle de rayon 8 cm, un angle au centre de 0,75 rad intercepte un arc. Quelle est sa longueur&nbsp;?', lab:'s =', unit:'cm', ans:6, tol:.01, why:'s = rθ = 8 · 0,75 = 6 cm.'},
   {q:'Quelle est l’aire d’un secteur de rayon 4 cm et d’angle 1,5 rad&nbsp;?', lab:'A =', unit:'cm²', ans:12, tol:.01, why:'A = ½ r²θ = ½ · 16 · 1,5 = 12 cm².'},
   {q:'Un arc de 15 cm est tracé sur un cercle de rayon 6 cm. Quel est l’angle au centre, en radians&nbsp;?', lab:'θ =', unit:'rad', ans:2.5, tol:.001, why:'s = rθ donne θ = s/r = 15/6 = 2,5 rad.'},
   {q:'Sur un cercle de rayon 10 cm, quelle est la longueur de l’arc intercepté par un angle de 54°&nbsp;? Arrondis au centième.', lab:'s =', unit:'cm', ans:9.42, tol:.006, why:'On convertit d’abord : 54° = 54π/180 = 3π/10 rad. Puis s = 10 · 3π/10 = 3π ≈ 9,42 cm.'},
   {q:'Un secteur de rayon 6 cm a une aire de 27 cm². Quel est son angle au centre, en radians&nbsp;?', lab:'θ =', unit:'rad', ans:1.5, tol:.001, why:'A = ½ r²θ donne θ = 2A/r² = 54/36 = 1,5 rad.'},
 ]},
 {n:'Mesure principale d’un angle', r:'Réduire un angle modulo 2π', qs:[
   {q:'Quelle est la mesure principale de 25π/6&nbsp;?', opts:['−π/6','π/6','5π/6','13π/6'], ans:1, why:'2π = 12π/6. 25 − 24 = 1, donc 25π/6 = 4π + π/6 : la mesure principale est π/6.'},
   {q:'Quelle est la mesure principale de −17π/3&nbsp;?', opts:['−π/3','2π/3','−5π/3','π/3'], ans:3, why:'2π = 6π/3. −17 + 18 = 1 : on ajoute 3 tours (6π) et −17π/3 + 6π = π/3, dans ]−π ; π].'},
   {q:'Quelle est la mesure principale de 31π/4&nbsp;?', opts:['−π/4','7π/4','π/4','3π/4'], ans:0, why:'2π = 8π/4. 31 − 32 = −1 : 31π/4 − 8π = −π/4, qui est dans ]−π ; π]. 7π/4 a le même point mais sort de l’intervalle.'},
   {q:'Quelle est la mesure principale de 15 rad&nbsp;? Arrondis au millième.', lab:'θ =', unit:'rad', ans:2.434, tol:.0006, why:'15/(2π) ≈ 2,39, l’entier le plus proche est 2. 15 − 4π ≈ 2,434 rad, qui est bien dans ]−π ; π].'},
   {q:'Quelle est la mesure principale de −10 rad&nbsp;? Arrondis au millième.', lab:'θ =', unit:'rad', ans:2.566, tol:.0006, why:'−10/(2π) ≈ −1,59, l’entier le plus proche est −2. −10 + 4π ≈ 2,566 rad, dans ]−π ; π].'},
   {q:'Quelle est la mesure de −5π/6 dans [0 ; 2π[&nbsp;?', opts:['5π/6','7π/6','11π/6','π/6'], ans:1, why:'On ajoute un tour : −5π/6 + 12π/6 = 7π/6, qui est bien dans [0 ; 2π[.'},
   {q:'Quelle est la mesure principale de 7π&nbsp;?', opts:['−π','0','π','7π'], ans:2, why:'7π = 6π + π : on retire 3 tours et on obtient π. Comme l’intervalle est ]−π ; π], c’est π et non −π.'},
 ]},
 {n:'Se repérer sur le cercle trigonométrique', r:'Le cercle trigonométrique', qs:[
   {q:'Lequel de ces angles donne le même point du cercle que 2π/3&nbsp;?', opts:['4π/3','−2π/3','5π/3','−4π/3'], ans:3, why:'Deux angles donnent le même point s’ils diffèrent d’un multiple de 2π : 2π/3 − 2π = −4π/3.'},
   {q:'On part du point (1 ; 0) et on tourne d’un angle de −π/2. Où arrive-t-on&nbsp;?', opts:['En (0 ; 1)','En (0 ; −1)','En (−1 ; 0)','En (1 ; 0)'], ans:1, why:'Un angle négatif tourne dans le sens des aiguilles d’une montre : un quart de tour vers le bas mène en (0 ; −1).'},
   {q:'Lequel de ces angles donne le même point que 7π/5&nbsp;?', opts:['3π/5','−7π/5','−3π/5','2π/5'], ans:2, why:'7π/5 − 2π = 7π/5 − 10π/5 = −3π/5.'},
   {q:'Combien d’angles de l’intervalle [0 ; 10π[ donnent le même point que π/3&nbsp;?', lab:'nombre =', ans:5, tol:.01, why:'Ce sont les π/3 + 2kπ. Dans [0 ; 10π[ : k = 0, 1, 2, 3, 4 (π/3 + 8π < 10π, mais π/3 + 10π dépasse). Cinq angles.'},
 ]},
 {n:'Tours, arcs et vitesse angulaire', r:'Tours, arcs et vitesse angulaire', qs:[
   {q:'Combien vaut un angle de trois quarts de tour, en radians&nbsp;?', opts:['3π/4','3π/2','4π/3','3π'], ans:1, why:'Un tour vaut 2π, donc trois quarts de tour valent (3/4) · 2π = 3π/2.'},
   {q:'Combien de tours représente un angle de 50 rad&nbsp;? Arrondis au centième.', lab:'tours =', ans:7.96, tol:.006, why:'On divise par 2π : 50/(2π) ≈ 7,96 tours.'},
   {q:'Une roue de 0,4 m de rayon roule sans glisser sur 100 m. Combien de tours fait-elle&nbsp;? Arrondis au centième.', lab:'tours =', ans:39.79, tol:.006, why:'Un tour fait avancer de 2πr = 0,8π m. 100/(0,8π) ≈ 39,79 tours.'},
   {q:'Un disque tourne à 45 tours par minute. Quelle est sa vitesse angulaire en rad/s&nbsp;? Arrondis au centième.', lab:'ω =', unit:'rad/s', ans:4.71, tol:.006, why:'45 tours/min = 0,75 tour/s. ω = 0,75 · 2π = 1,5π ≈ 4,71 rad/s.'},
   {q:'Un point est à 12 cm de l’axe d’une roue qui tourne à 5 rad/s. Quelle est sa vitesse en m/s&nbsp;?', lab:'v =', unit:'m/s', ans:.6, tol:.001, why:'v = rω avec r en mètres : v = 0,12 · 5 = 0,6 m/s.'},
   {q:'L’aiguille des heures d’une horloge mesure 9 cm. Quelle longueur d’arc parcourt sa pointe en 4 heures&nbsp;? Arrondis au centième.', lab:'s =', unit:'cm', ans:18.85, tol:.006, why:'En 12 h, l’aiguille fait un tour, donc 4 h = 1/3 de tour = 2π/3 rad. s = 9 · 2π/3 = 6π ≈ 18,85 cm.'},
   {q:'Un manège fait 3 tours par minute. Un cheval de bois est à 5 m du centre. Quelle est sa vitesse en m/s&nbsp;? Arrondis au centième.', lab:'v =', unit:'m/s', ans:1.57, tol:.006, why:'ω = 3 · 2π/60 = π/10 rad/s, donc v = rω = 5 · π/10 = π/2 ≈ 1,57 m/s. Il faut passer en tours par seconde avant de multiplier.'},
 ]},
];
})();
