/* Déclic — examen de compétence : Fonctions trigonométriques */
(()=>{
EXAMS['an2-fonctions']=[
 {n:'Valeurs remarquables et angles associés', r:'Lire le cercle : valeurs remarquables et angles associés', qs:[
   {q:'Combien vaut sin(5π/4)&nbsp;?', opts:['√2/2','−1/2','−√3/2','−√2/2'], ans:3, why:'5π/4 = π + π/4 : sin(π + x) = −sin x, donc sin(5π/4) = −sin(π/4) = −√2/2. Le point est dans le 3e quadrant, en bas.'},
   {q:'Calcule cos(−2π/3).', lab:'cos(−2π/3) =', ans:-.5, tol:.001, why:'cos est paire : cos(−2π/3) = cos(2π/3) = cos(π − π/3) = −cos(π/3) = −1/2.'},
   {q:'Combien vaut tan(5π/6)&nbsp;?', opts:['−√3/3','√3/3','−√3','√3'], ans:0, why:'5π/6 = π − π/6 : sin(5π/6) = 1/2 et cos(5π/6) = −√3/2, donc tan(5π/6) = −1/√3 = −√3/3.'},
   {q:'Calcule sin(17π/6).', lab:'sin(17π/6) =', ans:.5, tol:.001, why:'17π/6 − 2π = 5π/6. sin(5π/6) = sin(π − π/6) = sin(π/6) = 1/2.'},
   {q:'On sait que sin <i>x</i> = 0,4. Calcule sin(π − <i>x</i>) + sin(−<i>x</i>) + cos(π/2 − <i>x</i>).', lab:'valeur =', ans:.4, tol:.001, why:'sin(π − x) = sin x = 0,4 ; sin(−x) = −0,4 ; cos(π/2 − x) = sin x = 0,4. Total : 0,4 − 0,4 + 0,4 = 0,4.'},
   {q:'Calcule cos(7π/3) + sin(−3π/2).', lab:'valeur =', ans:1.5, tol:.001, why:'cos(7π/3) = cos(π/3 + 2π) = 1/2. sin(−3π/2) = −sin(3π/2) = −(−1) = 1. Somme : 3/2.'},
   {q:'Un élève écrit cos(4π/3) = 1/2. Que lui réponds-tu&nbsp;?', opts:['Aucune erreur','La valeur de la table est fausse : cos(4π/3) = √3/2','Le signe est faux : 4π/3 est dans le 3e quadrant, donc cos(4π/3) = −1/2','cos(4π/3) n’existe pas, car 4π/3 &gt; π'], ans:2, why:'4π/3 = π + π/3 : cos(π + x) = −cos x, donc cos(4π/3) = −1/2. À gauche du cercle, le cosinus est négatif.'},
 ]},
 {n:'Périodicité, parité et valeurs prises', r:'Périodicité et parité', qs:[
   {q:'Quelle est la période de la fonction tangente&nbsp;?', opts:['2π','π/2','π','Elle n’est pas périodique'], ans:2, why:'tan(x + π) = tan x : la tangente est π-périodique, alors que sin et cos sont 2π-périodiques.'},
   {q:'Sachant que sin(0,7) ≈ 0,644, calcule sin(−0,7) + sin(0,7 + 2π).', lab:'valeur =', ans:0, tol:.001, why:'sin est impaire : sin(−0,7) ≈ −0,644. sin est 2π-périodique : sin(0,7 + 2π) ≈ 0,644. La somme vaut 0.'},
   {q:'On sait que cos <i>x</i> = 0,8. Calcule cos(−<i>x</i>) + cos(<i>x</i> + 2π).', lab:'valeur =', ans:1.6, tol:.001, why:'cos est paire et 2π-périodique : les deux termes valent cos x = 0,8. Total 1,6.'},
   {q:'On sait que tan <i>x</i> = 2. Calcule tan(<i>x</i> + π) − tan(−<i>x</i>).', lab:'valeur =', ans:4, tol:.001, why:'tan est π-périodique : tan(x + π) = 2. tan est impaire : tan(−x) = −2. Donc 2 − (−2) = 4.'},
   {q:'En quelle valeur la tangente n’est-elle pas définie&nbsp;?', opts:['π','3π/2','3π/4','0'], ans:1, why:'tan x n’est pas définie quand cos x = 0, soit x = π/2 + kπ. 3π/2 = π/2 + π en fait partie.'},
   {q:'Laquelle de ces équations n’a aucune solution réelle&nbsp;?', opts:['tan x = 1,2','cos x = −0,9','sin x = 1,2','tan x = −50'], ans:2, why:'sin prend ses valeurs dans [−1 ; 1], donc sin x = 1,2 est impossible. La tangente prend toutes les valeurs réelles.'},
 ]},
 {n:'arcsin, arccos et arctan', r:'Calculer arcsin, arccos et arctan exactement', qs:[
   {q:'Combien vaut arcsin(−1/2)&nbsp;?', opts:['7π/6','−π/6','11π/6','−π/3'], ans:1, why:'arcsin renvoie un angle de [−π/2 ; π/2]. sin(π/6) = 1/2 et sin est impaire, donc arcsin(−1/2) = −π/6.'},
   {q:'Combien vaut arccos(−√2/2)&nbsp;?', opts:['−π/4','5π/4','3π/4','π/4'], ans:2, why:'On cherche dans [0 ; π]. cos(π − π/4) = −cos(π/4) = −√2/2, donc arccos(−√2/2) = 3π/4.'},
   {q:'Combien vaut arctan(√3/3)&nbsp;?', opts:['π/6','π/3','7π/6','−π/6'], ans:0, why:'tan(π/6) = (1/2)/(√3/2) = 1/√3 = √3/3, et π/6 ∈ ]−π/2 ; π/2[.'},
   {q:'Combien vaut arccos(cos(−π/3))&nbsp;?', opts:['−π/3','2π/3','5π/3','π/3'], ans:3, why:'cos(−π/3) = cos(π/3) = 1/2. L’angle de [0 ; π] de cosinus 1/2 est π/3, pas −π/3 qui sort de l’intervalle.'},
   {q:'Combien vaut arcsin(sin(7π/6))&nbsp;?', opts:['7π/6','π/6','−π/6','−5π/6'], ans:2, why:'sin(7π/6) = −sin(π/6) = −1/2. L’angle de [−π/2 ; π/2] de sinus −1/2 est −π/6.'},
   {q:'Combien vaut arccos(cos(5π/4))&nbsp;?', opts:['5π/4','3π/4','−3π/4','π/4'], ans:1, why:'cos(5π/4) = −√2/2. L’angle de [0 ; π] de même cosinus est 3π/4 (5π/4 et 3π/4 sont symétriques par rapport à l’axe horizontal).'},
   {q:'Calcule arccos(0,3) + arccos(−0,3). Arrondis au millième.', lab:'valeur =', ans:3.142, tol:.0006, why:'arccos(−y) = π − arccos y, donc la somme vaut exactement π ≈ 3,142.'},
 ]},
 {n:'Inégalités lues sur le cercle', r:'Lire une inégalité sur le cercle', qs:[
   {q:'Sur [0 ; 2π[, pour quels <i>x</i> a-t-on sin <i>x</i> &gt; √2/2&nbsp;?', opts:['[π/4 ; 3π/4]','[0 ; π/4[ ∪ ]3π/4 ; 2π[',']π/4 ; 3π/4[',']5π/4 ; 7π/4['], ans:2, why:'sin x = √2/2 pour π/4 et 3π/4. L’arc du haut, au-dessus de la droite y = √2/2, va de π/4 à 3π/4, bornes exclues car l’inégalité est stricte.'},
   {q:'Sur ]−π ; π], pour quels <i>x</i> a-t-on cos <i>x</i> ≤ −1/2&nbsp;?', opts:['[−2π/3 ; 2π/3]',']−π ; −2π/3] ∪ [2π/3 ; π]','[2π/3 ; 4π/3]','[π/3 ; 2π/3]'], ans:1, why:'cos x = −1/2 pour ±2π/3. Les points d’abscisse ≤ −1/2 forment l’arc de gauche, qui passe par π : dans ]−π ; π], il se coupe en deux morceaux.'},
   {q:'Sur [0 ; 2π[, quelle est la longueur totale de l’ensemble des <i>x</i> tels que cos <i>x</i> &gt; √3/2&nbsp;? Arrondis au millième.', lab:'longueur =', ans:1.047, tol:.0006, why:'cos x = √3/2 pour ±π/6. L’arc de droite va de −π/6 à π/6, de longueur π/3 ≈ 1,047 (dans [0 ; 2π[ : [0 ; π/6[ ∪ ]11π/6 ; 2π[).'},
   {q:'Combien d’entiers <i>n</i> de [0 ; 6] vérifient sin <i>n</i> &gt; 1/2&nbsp;?', lab:'nombre =', ans:2, tol:.01, why:'Sur [0 ; 2π[, sin x &gt; 1/2 sur ]π/6 ; 5π/6[ ≈ ]0,52 ; 2,62[. Seuls n = 1 et n = 2 y sont.'},
   {q:'Sur [0 ; 2π[, pour quels <i>x</i> a-t-on cos <i>x</i> ≥ √2/2&nbsp;?', opts:['[π/4 ; 7π/4]','[0 ; π/4]','[0 ; π/4] ∪ [7π/4 ; 2π[','[π/4 ; 3π/4]'], ans:2, why:'cos x = √2/2 pour π/4 et 7π/4. L’arc de droite passe par l’angle 0, bord de [0 ; 2π[ : il se coupe en [0 ; π/4] et [7π/4 ; 2π[.'},
 ]},
 {n:'Coordonnées du point du cercle', r:'Du cercle au graphe', qs:[
   {q:'Quelles sont les coordonnées du point du cercle trigonométrique d’angle 2π/3&nbsp;?', opts:['(1/2 ; √3/2)','(−1/2 ; √3/2)','(√3/2 ; −1/2)','(−√3/2 ; 1/2)'], ans:1, why:'M = (cos(2π/3) ; sin(2π/3)) = (−1/2 ; √3/2) : 2π/3 = π − π/3 change le signe du cosinus, pas celui du sinus.'},
   {q:'Le point d’angle <i>x</i> sur le cercle trigonométrique a pour coordonnées (−0,6 ; 0,8). Combien vaut tan <i>x</i>&nbsp;?', lab:'tan x =', ans:-4/3, tol:.001, show:'−4/3', why:'cos x = −0,6 et sin x = 0,8, donc tan x = 0,8/(−0,6) = −4/3.'},
   {q:'Le point d’angle <i>x</i> a pour coordonnées (0,28 ; −0,96). Dans quel quadrant est <i>x</i>&nbsp;?', opts:['1er','2e','3e','4e'], ans:3, why:'cos x = 0,28 &gt; 0 (à droite) et sin x = −0,96 &lt; 0 (en bas) : 4e quadrant.'},
   {q:'Quelle est l’abscisse du point d’angle 11π/4&nbsp;? Arrondis au millième.', lab:'abscisse =', ans:-.707, tol:.0006, why:'11π/4 − 2π = 3π/4, et cos(3π/4) = −√2/2 ≈ −0,707.'},
   {q:'La droite (OM), où M est le point d’angle <i>x</i>, coupe la tangente au cercle en (1 ; 0) au point (1 ; −2). Combien vaut tan <i>x</i>&nbsp;?', lab:'tan x =', ans:-2, tol:.001, why:'tan x est l’ordonnée du point où (OM) coupe la tangente verticale en (1 ; 0) : tan x = −2.'},
 ]},
];
})();
