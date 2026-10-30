/* Déclic — examen de compétence : Nombres complexes */
(()=>{
EXAMS['complexes']=[
 {n:'Calculer en forme algébrique', r:'Calculer en forme algébrique', qs:[
   {q:'Quelle est la partie imaginaire de (4 − 2<i>i</i>) + (−1 + 5<i>i</i>) ?', lab:'Im =', ans:3, why:'On ajoute les parties imaginaires entre elles : −2 + 5 = 3. Le résultat est 3 + 3<i>i</i>.'},
   {q:'Quelle est la partie réelle de (2 + 5<i>i</i>)(3 − <i>i</i>) ?', lab:'Re =', ans:11, why:'6 − 2<i>i</i> + 15<i>i</i> − 5<i>i</i>² = 6 + 13<i>i</i> + 5 = 11 + 13<i>i</i>.'},
   {q:'Quelle est la partie imaginaire de (1 − 3<i>i</i>)² ?', lab:'Im =', ans:-6, why:'(1 − 3<i>i</i>)² = 1 − 6<i>i</i> + 9<i>i</i>² = 1 − 6<i>i</i> − 9 = −8 − 6<i>i</i>.'},
   {q:'Combien vaut <i>i</i>³ ?', opts:['1','−1','<i>i</i>','−<i>i</i>'], ans:3, why:'<i>i</i>³ = <i>i</i>² · <i>i</i> = −1 · <i>i</i> = −<i>i</i>.'},
   {q:'Combien vaut (3 + 2<i>i</i>)(3 − 2<i>i</i>) ?', ans:13, why:'Un nombre fois son conjugué : <i>a</i>² + <i>b</i>² = 9 + 4 = 13. Le résultat est réel.'},
   {q:'Quelle est la partie imaginaire de (5 + 5<i>i</i>)/(1 + 2<i>i</i>) ?', lab:'Im =', ans:-1, why:'On multiplie par le conjugué 1 − 2<i>i</i> : (5 + 5<i>i</i>)(1 − 2<i>i</i>) = 5 − 10<i>i</i> + 5<i>i</i> + 10 = 15 − 5<i>i</i>, et en bas 1 + 4 = 5. Résultat : 3 − <i>i</i>.'},
   {q:'Combien vaut 1/<i>i</i> ?', opts:['<i>i</i>','−<i>i</i>','1','−1'], ans:1, why:'On multiplie en haut et en bas par le conjugué −<i>i</i> : 1 · (−<i>i</i>) / (<i>i</i> · (−<i>i</i>)) = −<i>i</i> / 1 = −<i>i</i>.'},
 ]},
 {n:'Module et argument', r:'Un nombre, un point', qs:[
   {q:'Combien vaut |5 − 12<i>i</i>| ?', ans:13, why:'|<i>z</i>| = √(25 + 144) = √169 = 13 : la distance du point (5 ; −12) à l’origine.'},
   {q:'Quel est l’argument de −2 + 2<i>i</i>, dans [0° ; 360°[ ?', unit:'°', ans:135, why:'Le point (−2 ; 2) est en haut à gauche, sur la bissectrice : 180° − 45° = 135°.'},
   {q:'Quel est l’argument de −5<i>i</i>, dans [0° ; 360°[ ?', unit:'°', ans:270, why:'−5<i>i</i> est le point (0 ; −5), sur l’axe vertical vers le bas : 270°.'},
   {q:'Quel est l’argument de √3 + <i>i</i>, dans [0° ; 360°[ ?', unit:'°', ans:30, why:'Le module vaut √(3 + 1) = 2, et cos θ = √3/2, sin θ = ½ : θ = 30°.'},
 ]},
 {n:'Multiplier par i et tourner', r:'Tourner un point avec i', qs:[
   {q:'Combien vaut <i>i</i>(4 − 3<i>i</i>) ?', opts:['3 + 4<i>i</i>','−3 + 4<i>i</i>','4 + 3<i>i</i>','3 − 4<i>i</i>'], ans:0, why:'4<i>i</i> − 3<i>i</i>² = 4<i>i</i> + 3 = 3 + 4<i>i</i> : le point (4 ; −3) a tourné de 90° en (3 ; 4).'},
   {q:'Combien de fois au minimum faut-il multiplier un nombre <i>z</i> ≠ 0 par <i>i</i> pour retrouver <i>z</i> ?', ans:4, why:'Chaque multiplication par <i>i</i> tourne de 90° : il faut 4 × 90° = 360°. En effet <i>i</i>⁴ = (<i>i</i>²)² = 1.'},
   {q:'A = 1 + <i>i</i> et B = 3 + 4<i>i</i>. Quelle est l’image de B par la rotation de 90° de centre A (sens trigonométrique) ?', opts:['−3 + 2<i>i</i>','−2 + 3<i>i</i>','4 − <i>i</i>','−4 + 3<i>i</i>'], ans:1, why:'B − A = 2 + 3<i>i</i>, puis <i>i</i>(2 + 3<i>i</i>) = −3 + 2<i>i</i>. On revient en A : B′ = 1 + <i>i</i> − 3 + 2<i>i</i> = −2 + 3<i>i</i>. −3 + 2<i>i</i> oublie de rajouter A.'},
   {q:'Dans le plan complexe, A = 0 et B = 2 + <i>i</i> sont deux sommets consécutifs d’un carré. Quelle est l’aire de ce carré ?', ans:5, why:'Le côté vaut |B − A| = |2 + <i>i</i>| = √5, donc l’aire vaut 5. Le sommet suivant est <i>i</i>(2 + <i>i</i>) = −1 + 2<i>i</i>.'},
   {q:'A = 2 et B = 5 + 2<i>i</i>. On tourne B de 90° autour de A. Quelle est la partie réelle de l’image B′ ?', lab:'Re =', ans:0, why:'B − A = 3 + 2<i>i</i>, <i>i</i>(3 + 2<i>i</i>) = −2 + 3<i>i</i>, puis B′ = 2 − 2 + 3<i>i</i> = 3<i>i</i>. Sa partie réelle est 0.'},
 ]},
 {n:'Forme exponentielle', r:'Forme exponentielle et racines n-ièmes', qs:[
   {q:'On pose <i>z</i> = 2<i>e</i><sup><i>i</i>·30°</sup> et <i>w</i> = 3<i>e</i><sup><i>i</i>·60°</sup>. Combien vaut <i>zw</i> ?', opts:['5<i>e</i><sup><i>i</i>·90°</sup>','6<i>e</i><sup><i>i</i>·1800°</sup>','6<i>i</i>','6'], ans:2, why:'On multiplie les modules et on ajoute les arguments : 6<i>e</i><sup><i>i</i>·90°</sup> = 6<i>i</i>.'},
   {q:'Quelle est la partie réelle de (2<i>e</i><sup><i>i</i>·20°</sup>)³ ?', lab:'Re =', ans:4, why:'(2<i>e</i><sup><i>i</i>·20°</sup>)³ = 8<i>e</i><sup><i>i</i>·60°</sup>, de partie réelle 8 cos 60° = 4.'},
   {q:'Combien vaut (1 + <i>i</i>)⁸ ?', ans:16, why:'1 + <i>i</i> = √2 <i>e</i><sup><i>i</i>·45°</sup>. Donc (1 + <i>i</i>)⁸ = (√2)⁸ <i>e</i><sup><i>i</i>·360°</sup> = 16.'},
   {q:'Combien vaut (√3 + <i>i</i>)⁶ ?', ans:-64, why:'√3 + <i>i</i> = 2<i>e</i><sup><i>i</i>·30°</sup>. Donc (√3 + <i>i</i>)⁶ = 64<i>e</i><sup><i>i</i>·180°</sup> = −64.'},
   {q:'Quelle est la forme algébrique de 4<i>e</i><sup><i>i</i>·120°</sup> ?', opts:['2 + 2√3<i>i</i>','−2√3 + 2<i>i</i>','−2 + 2√3<i>i</i>','−2 − 2√3<i>i</i>'], ans:2, why:'4(cos 120° + <i>i</i> sin 120°) = 4(−½ + <i>i</i>√3/2) = −2 + 2√3<i>i</i>.'},
 ]},
 {n:'Racines n-ièmes', r:'Forme exponentielle et racines n-ièmes', qs:[
   {q:'Combien de solutions l’équation <i>z</i>⁴ = 16 a-t-elle dans ℂ ?', ans:4, why:'Une équation <i>z</i>ⁿ = <i>Re</i><sup><i>i</i>φ</sup> a <i>n</i> solutions : ici 2, 2<i>i</i>, −2 et −2<i>i</i>.'},
   {q:'Quelles sont les solutions de <i>z</i>² = −9 ?', opts:['3 et −3','3<i>i</i> et −3<i>i</i>','9<i>i</i> et −9<i>i</i>','Il n’y en a pas'], ans:1, why:'−9 = 9<i>e</i><sup><i>i</i>·180°</sup> : module 3, arguments 90° et 270°, donc ±3<i>i</i>. Contrôle : (3<i>i</i>)² = −9.'},
   {q:'On résout <i>z</i>³ = −8. Quel est l’argument de la solution située dans ]0° ; 90°[ ?', unit:'°', ans:60, why:'−8 = 8<i>e</i><sup><i>i</i>·180°</sup>. θ = 180°/3 + <i>k</i> · 120° donne 60°, 180° et 300°.'},
   {q:'On résout <i>z</i>⁴ = 16<i>i</i>. Quel est le plus petit argument positif d’une solution ?', unit:'°', ans:22.5, tol:.001, why:'16<i>i</i> = 16<i>e</i><sup><i>i</i>·90°</sup>, donc θ = 90°/4 + <i>k</i> · 90° : 22,5°, 112,5°, 202,5° et 292,5°, avec le module 2.'},
   {q:'Dans le plan complexe, les 6 solutions de <i>z</i>⁶ = 1 forment…', opts:['un hexagone régulier inscrit dans le cercle de rayon 1','un triangle équilatéral','six points alignés sur l’axe réel','un hexagone régulier de côté 6'], ans:0, why:'Elles ont toutes le module 1 et des arguments espacés de 360°/6 = 60° : un hexagone régulier centré en 0.'},
 ]},
 {n:'Racines d’un polynôme', r:'Racines d’un polynôme : somme et produit', qs:[
   {q:'Résous <i>z</i>² − 6<i>z</i> + 25 = 0. Quelle est la partie imaginaire positive d’une racine ?', lab:'Im =', ans:4, why:'Δ = 36 − 100 = −64, donc <i>z</i> = (6 ± 8<i>i</i>)/2 = 3 ± 4<i>i</i>.'},
   {q:'Résous <i>z</i>² + 4<i>z</i> + 8 = 0. Quelle est la partie réelle des racines ?', lab:'Re =', ans:-2, why:'Δ = 16 − 32 = −16, donc <i>z</i> = (−4 ± 4<i>i</i>)/2 = −2 ± 2<i>i</i>.'},
   {q:'Quel est le produit des racines de <i>z</i>² + 3<i>z</i> + 7 = 0 ?', ans:7, why:'Pour <i>z</i>² + <i>bz</i> + <i>c</i>, le produit des racines vaut <i>c</i> = 7. Pas besoin de les calculer.'},
   {q:'Quel polynôme a pour racines 1 + 2<i>i</i> et 1 − 2<i>i</i> ?', opts:['<i>z</i>² + 2<i>z</i> + 5','<i>z</i>² − 2<i>z</i> − 3','<i>z</i>² − 2<i>z</i> + 5','<i>z</i>² − 2<i>z</i> + 3'], ans:2, why:'Somme 2, donc <i>b</i> = −2. Produit (1 + 2<i>i</i>)(1 − 2<i>i</i>) = 1 + 4 = 5, donc <i>c</i> = 5 : <i>z</i>² − 2<i>z</i> + 5.'},
   {q:'Quelle est la somme des racines de <i>z</i>³ − 5<i>z</i>² + 2<i>z</i> − 7 = 0 ?', ans:5, why:'La somme des racines de <i>z</i>ⁿ + <i>a</i>ₙ₋₁<i>z</i>ⁿ⁻¹ + … vaut −<i>a</i>ₙ₋₁ = −(−5) = 5.'},
 ]},
];
})();
