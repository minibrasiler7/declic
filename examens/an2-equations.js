/* Déclic — examen de compétence : Équations trigonométriques */
(()=>{
EXAMS['an2-equations']=[
 {n:'Équations de base sin x = a, cos x = a, tan x = a', r:'Toutes les solutions, en trois gestes', qs:[
   {q:'Quelles sont les solutions de sin <i>x</i> = √3/2&nbsp;?', opts:['x = ±π/3 + 2kπ','x = π/3 + 2kπ ou x = 2π/3 + 2kπ','x = π/3 + kπ','x = π/3 + 2kπ ou x = 4π/3 + 2kπ'], ans:1, why:'α = arcsin(√3/2) = π/3, et la deuxième famille est π − α = 2π/3. La forme ±α + 2kπ correspond au cosinus.'},
   {q:'Combien de solutions l’équation cos <i>x</i> = −0,3 a-t-elle dans [0 ; 4π[&nbsp;?', lab:'nombre =', ans:4, tol:.01, why:'|−0,3| ≤ 1 : deux solutions par tour (±arccos(−0,3) + 2kπ), et [0 ; 4π[ contient deux tours. Quatre solutions.'},
   {q:'Résous tan <i>x</i> = −1 dans [0 ; 2π[. Donne la somme des solutions, arrondie au centième.', lab:'somme =', ans:7.85, tol:.006, why:'arctan(−1) = −π/4, donc x = −π/4 + kπ. Dans [0 ; 2π[ : 3π/4 et 7π/4. Somme : 10π/4 = 5π/2 ≈ 7,85.'},
   {q:'Combien de solutions l’équation sin <i>x</i> = −1,2 a-t-elle sur ℝ&nbsp;?', lab:'nombre =', ans:0, tol:.01, why:'Un sinus est toujours dans [−1 ; 1] : |−1,2| &gt; 1, il n’y a aucune solution.'},
   {q:'Quelle est la plus grande solution de cos <i>x</i> = −√3/2 dans [0 ; 2π[&nbsp;? Arrondis au millième.', lab:'x =', ans:3.665, tol:.0006, why:'arccos(−√3/2) = 5π/6, donc x = ±5π/6 + 2kπ. Dans [0 ; 2π[ : 5π/6 et −5π/6 + 2π = 7π/6 ≈ 3,665.'},
   {q:'Résous sin <i>x</i> = 0,4 dans [0 ; 2π[. Donne la plus grande des deux solutions, arrondie au millième.', lab:'x =', ans:2.730, tol:.0006, why:'α = arcsin(0,4) ≈ 0,412. L’autre solution est π − α ≈ 2,730. Les ajouts de 2π sortent de l’intervalle.'},
 ]},
 {n:'Inconnue dans un argument ax + b', r:'Quand l’inconnue est dans un argument ax + b', qs:[
   {q:'Combien de solutions l’équation sin(3<i>x</i>) = 1/2 a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:6, tol:.01, why:'3x = π/6 + 2kπ ou 5π/6 + 2kπ, donc x = π/18 + 2kπ/3 ou 5π/18 + 2kπ/3. k = 0, 1, 2 dans chaque famille : 6 solutions.'},
   {q:'Combien de solutions l’équation cos(<i>x</i>/2) = 0 a-t-elle dans [0 ; 4π[&nbsp;?', lab:'nombre =', ans:2, tol:.01, why:'x/2 = π/2 + kπ, donc x = π + 2kπ : la période est multipliée par 2. Dans [0 ; 4π[ : π et 3π.'},
   {q:'Combien de solutions l’équation tan(2<i>x</i>) = 1 a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:4, tol:.01, why:'2x = π/4 + kπ, donc x = π/8 + kπ/2 : π/8, 5π/8, 9π/8 et 13π/8. Quatre solutions.'},
   {q:'Quelle est la plus petite solution positive de sin(2<i>x</i> − π/6) = 1/2&nbsp;? Arrondis au millième.', lab:'x =', ans:.524, tol:.0006, why:'2x − π/6 = π/6 + 2kπ ou 5π/6 + 2kπ, donc x = π/6 + kπ ou x = π/2 + kπ. La plus petite positive est π/6 ≈ 0,524.'},
   {q:'Quelles sont les solutions de cos(3<i>x</i>) = 1/2&nbsp;?', opts:['x = ±π/9 + 2kπ','x = ±π/3 + 2kπ/3','x = ±π/9 + kπ/3','x = ±π/9 + 2kπ/3'], ans:3, why:'3x = ±π/3 + 2kπ. On divise tout par 3, la période aussi : x = ±π/9 + 2kπ/3.'},
 ]},
 {n:'Égalité de deux sinus ou de deux cosinus', r:'sin u = sin v et cos u = cos v', qs:[
   {q:'Quelles sont les solutions de cos 4<i>x</i> = cos <i>x</i> sur ℝ&nbsp;?', opts:['x = 2kπ/3 uniquement','x = kπ/3 ou x = kπ/5','x = 2kπ/3 ou x = 2kπ/5','x = 2kπ/3 ou x = π/5 + 2kπ/5'], ans:2, why:'4x = x + 2kπ donne x = 2kπ/3 ; 4x = −x + 2kπ donne x = 2kπ/5.'},
   {q:'Combien de solutions l’équation sin 2<i>x</i> = sin(<i>x</i> + π/3) a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:4, tol:.01, why:'2x = x + π/3 + 2kπ donne x = π/3 + 2kπ : π/3. 2x = π − x − π/3 + 2kπ donne x = 2π/9 + 2kπ/3 : 2π/9, 8π/9, 14π/9. Quatre solutions distinctes.'},
   {q:'Combien de solutions l’équation cos 2<i>x</i> = sin <i>x</i> a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:3, tol:.01, why:'sin x = cos(π/2 − x). 2x = π/2 − x + 2kπ donne x = π/6 + 2kπ/3 : π/6, 5π/6, 3π/2. 2x = −π/2 + x + 2kπ donne x = 3π/2, déjà compté. Trois solutions.'},
   {q:'Combien de solutions l’équation sin 5<i>x</i> = sin <i>x</i> a-t-elle dans [0 ; π[&nbsp;?', lab:'nombre =', ans:4, tol:.01, why:'5x = x + 2kπ donne x = kπ/2 : 0, π/2. 5x = π − x + 2kπ donne x = π/6 + kπ/3 : π/6, π/2, 5π/6. π/2 est commun : 4 solutions.'},
 ]},
 {n:'Se ramener à un trinôme', r:'Se ramener à un trinôme', qs:[
   {q:'Combien de solutions l’équation 2 sin²<i>x</i> − sin <i>x</i> − 1 = 0 a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:3, tol:.01, why:'Avec t = sin x : 2t² − t − 1 = (t − 1)(2t + 1) = 0, donc t = 1 ou t = −1/2. sin x = 1 donne π/2, sin x = −1/2 donne 7π/6 et 11π/6.'},
   {q:'Combien de solutions l’équation cos²<i>x</i> − 3 cos <i>x</i> + 2 = 0 a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:1, tol:.01, why:'Avec t = cos x : t² − 3t + 2 = (t − 1)(t − 2) = 0. t = 2 est rejeté (un cosinus est ≤ 1). cos x = 1 donne x = 0 seulement.'},
   {q:'Résous 2 cos²<i>x</i> − 3 sin <i>x</i> = 0. Donne la plus grande solution de [0 ; 2π[, arrondie au millième.', lab:'x =', ans:2.618, tol:.0006, why:'2(1 − sin²x) − 3 sin x = 0 ⇔ 2t² + 3t − 2 = 0 avec t = sin x : t = 1/2 ou t = −2 (rejeté). sin x = 1/2 donne π/6 et 5π/6 ≈ 2,618.'},
   {q:'Combien de solutions l’équation 4 sin²<i>x</i> = 3 a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:4, tol:.01, why:'t² = 3/4 donne t = √3/2 ou t = −√3/2. Chaque valeur donne deux angles par tour : π/3, 2π/3, 4π/3 et 5π/3.'},
   {q:'En posant <i>t</i> = sin <i>x</i> dans 2 sin²<i>x</i> + 5 sin <i>x</i> − 3 = 0, on trouve <i>t</i> = 1/2 et <i>t</i> = −3. Que fais-tu de <i>t</i> = −3&nbsp;?', opts:['Il donne x = arcsin(−3)','Il donne x = −3 + 2kπ','Je le rejette : un sinus est toujours dans [−1 ; 1]','Il donne x = π + 3 + 2kπ'], ans:2, why:'sin x = −3 n’a aucune solution. Seul t = 1/2 compte : x = π/6 + 2kπ ou x = 5π/6 + 2kπ.'},
 ]},
 {n:'Factoriser au lieu de diviser', r:'Factoriser plutôt que diviser', qs:[
   {q:'Combien de solutions l’équation sin 2<i>x</i> = √3 sin <i>x</i> a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:4, tol:.01, why:'2 sin x cos x − √3 sin x = sin x (2 cos x − √3) = 0. sin x = 0 donne 0 et π ; cos x = √3/2 donne π/6 et 11π/6.'},
   {q:'Combien de solutions l’équation sin²<i>x</i> = sin <i>x</i> a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:3, tol:.01, why:'sin x (sin x − 1) = 0. sin x = 0 donne 0 et π, sin x = 1 donne π/2. Diviser par sin x ferait perdre 0 et π.'},
   {q:'Pour résoudre cos <i>x</i> sin 2<i>x</i> = cos <i>x</i>, un élève divise par cos <i>x</i>. Quelles solutions perd-il&nbsp;?', opts:['Aucune','x = π/2 + kπ','x = kπ','x = π/4 + kπ'], ans:1, why:'cos x (sin 2x − 1) = 0 : il faut garder cos x = 0, soit x = π/2 + kπ. Diviser par cos x les élimine.'},
   {q:'Combien de solutions l’équation sin 3<i>x</i> + sin <i>x</i> = 0 a-t-elle dans [0 ; 2π[&nbsp;?', lab:'nombre =', ans:4, tol:.01, why:'Somme-produit : 2 sin 2x cos x = 0. sin 2x = 0 donne x = kπ/2 : 0, π/2, π, 3π/2. cos x = 0 redonne π/2 et 3π/2. Quatre solutions.'},
   {q:'Résous sin 2<i>x</i> + sin <i>x</i> = 0 dans [0 ; 2π[. Donne la somme des solutions, arrondie au centième.', lab:'somme =', ans:9.42, tol:.006, why:'sin x (2 cos x + 1) = 0 : sin x = 0 donne 0 et π ; cos x = −1/2 donne 2π/3 et 4π/3. Somme : 0 + π + 2π = 3π ≈ 9,42.'},
 ]},
 {n:'Résoudre a cos x + b sin x = c', r:'Résoudre a cos x + b sin x = c', qs:[
   {q:'Résous cos <i>x</i> + sin <i>x</i> = 1. Quelle est la plus petite solution strictement positive&nbsp;? Arrondis au millième.', lab:'x =', ans:1.571, tol:.0006, why:'√2 cos(x − π/4) = 1, donc cos(x − π/4) = √2/2 et x − π/4 = ±π/4 + 2kπ : x = π/2 + 2kπ ou x = 2kπ. La plus petite strictement positive est π/2 ≈ 1,571.'},
   {q:'Combien de solutions l’équation 3 cos <i>x</i> + 4 sin <i>x</i> = 6 a-t-elle sur ℝ&nbsp;?', lab:'nombre =', ans:0, tol:.01, why:'3 cos x + 4 sin x = 5 cos(x − φ) reste entre −5 et 5. Comme 6 &gt; 5, il n’y a aucune solution.'},
   {q:'Résous √3 cos <i>x</i> + sin <i>x</i> = 1. Donne la plus grande solution de [0 ; 2π[, arrondie au millième.', lab:'x =', ans:5.760, tol:.0006, why:'R = 2, φ = π/6 : cos(x − π/6) = 1/2, x − π/6 = ±π/3 + 2kπ. x = π/2 ou x = −π/6 + 2π = 11π/6 ≈ 5,760.'},
   {q:'Quelles sont les solutions de sin <i>x</i> − cos <i>x</i> = 1 dans [0 ; 2π[&nbsp;?', opts:['{0 ; π/2}','{π/2 ; 3π/2}','{π/2 ; π}','{π ; 3π/2}'], ans:2, why:'a = −1, b = 1 : R = √2, cos φ = −√2/2, sin φ = √2/2, donc φ = 3π/4. cos(x − 3π/4) = √2/2 donne x = 3π/4 ± π/4 : π/2 et π.'},
   {q:'Résous 4 cos <i>x</i> + 3 sin <i>x</i> = 2,5. Quelle est la plus petite solution positive&nbsp;? Arrondis au millième.', lab:'x =', ans:1.691, tol:.0006, why:'R = 5 et φ = arctan(3/4) ≈ 0,644. cos(x − φ) = 1/2, donc x = φ ± π/3 + 2kπ : 0,644 + 1,047 ≈ 1,691 (l’autre, 0,644 − 1,047, est négative).'},
 ]},
];
})();
