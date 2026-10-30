/* Déclic — examen de compétence : Vecteurs du plan */
(()=>{
EXAMS['vecteurs']=[
 {n:'Additionner bout à bout', r:'Mettre les flèches bout à bout', qs:[
   {q:'A, B et C sont trois points. Que vaut <b>AB</b> + <b>BC</b> ?', opts:['<b>CA</b>','<b>AC</b>','<b>BA</b> + <b>CB</b>','le vecteur nul'], ans:1, why:'On place <b>BC</b> au bout de <b>AB</b> : on part de A, on passe par B, on arrive en C. La somme va du départ à l’arrivée : <b>AC</b>.'},
   {q:'Deux forces (3 ; 4) et (5 ; −2), en newtons, agissent sur un objet. Quelle est la norme de leur somme ? (au centième)', unit:'N', ans:8.25, tol:.011, why:'(3 ; 4) + (5 ; −2) = (8 ; 2), de norme √(64 + 4) = √68 ≈ 8,25 N.'},
   {q:'On sait que <b>u</b> + <b>v</b> = (1 ; −2) et <b>u</b> = (4 ; 3). Quelle est la 1re composante de <b>v</b> ?', ans:-3, why:'<b>v</b> = (1 ; −2) − (4 ; 3) = (−3 ; −5).'},
   {q:'Que vaut <b>AB</b> + <b>BC</b> + <b>CA</b> ?', opts:['2<b>AC</b>','<b>AB</b>','le vecteur nul','3<b>AB</b>'], ans:2, why:'Bout à bout, on part de A, on passe par B et C, et on revient en A : le départ et l’arrivée sont confondus, la somme est nulle.'},
 ]},
 {n:'Calculer avec les composantes', r:'Calculer avec les composantes', qs:[
   {q:'A(2 ; −1) et B(−3 ; 5). Quelles sont les composantes de <b>AB</b> ?', opts:['(5 ; −6)','(−1 ; 4)','(−5 ; 6)','(−5 ; 4)'], ans:2, why:'Arrivée moins départ : (−3 − 2 ; 5 − (−1)) = (−5 ; 6).'},
   {q:'A(1 ; 3) et B(4 ; 7). Quelles sont les composantes de <b>BA</b> ?', opts:['(3 ; 4)','(−3 ; −4)','(5 ; 10)','(−3 ; 4)'], ans:1, why:'<b>BA</b> va de B vers A : (1 − 4 ; 3 − 7) = (−3 ; −4). C’est l’opposé de <b>AB</b>.'},
   {q:'On pose <b>u</b> = (1 ; 4) et <b>v</b> = (−2 ; 3). Quelle est la 1re composante de 3<b>u</b> − 2<b>v</b> ?', ans:7, why:'3<b>u</b> = (3 ; 12) et 2<b>v</b> = (−4 ; 6). Donc 3<b>u</b> − 2<b>v</b> = (7 ; 6).'},
   {q:'A(1 ; 2) et <b>AB</b> = (4 ; −3). Quelle est l’ordonnée de B ?', lab:'y =', ans:-1, why:'B = A + <b>AB</b> = (1 + 4 ; 2 − 3) = (5 ; −1).'},
 ]},
 {n:'Norme d’un vecteur', r:'Calculer avec les composantes', qs:[
   {q:'Quelle est la norme de (−6 ; 8) ?', ans:10, why:'√(36 + 64) = √100 = 10. Le signe disparaît au carré.'},
   {q:'A(1 ; 1) et B(9 ; 16). Combien vaut ‖<b>AB</b>‖ ?', ans:17, why:'<b>AB</b> = (8 ; 15), donc ‖<b>AB</b>‖ = √(64 + 225) = √289 = 17.'},
   {q:'Quelle est la norme de (2 ; 5) ? (au centième)', ans:5.39, tol:.011, why:'√(4 + 25) = √29 ≈ 5,39.'},
   {q:'Trouve <i>a</i> > 0 tel que ‖(7 ; <i>a</i>)‖ = 25.', lab:'a =', ans:24, why:'49 + <i>a</i>² = 625, donc <i>a</i>² = 576 et <i>a</i> = 24.'},
   {q:'On pose <b>u</b> = (3 ; 0) et <b>v</b> = (0 ; 4). Combien vaut ‖<b>u</b> + <b>v</b>‖ ?', ans:5, why:'<b>u</b> + <b>v</b> = (3 ; 4), de norme 5. Ce n’est pas ‖<b>u</b>‖ + ‖<b>v</b>‖ = 7 : les normes ne s’additionnent pas.'},
   {q:'Trouve <i>k</i> > 0 tel que ‖<i>k</i> · (3 ; 4)‖ = 20.', lab:'k =', ans:4, why:'<i>k</i> · (3 ; 4) = (3<i>k</i> ; 4<i>k</i>), de norme √(25<i>k</i>²) = 5<i>k</i>. Donc 5<i>k</i> = 20 et <i>k</i> = 4.'},
 ]},
 {n:'Produit scalaire et angle', r:'Produit scalaire et angle', qs:[
   {q:'Calcule (−2 ; 5) · (4 ; 3).', ans:7, why:'−2 · 4 + 5 · 3 = −8 + 15 = 7.'},
   {q:'Calcule <b>u</b> · <b>u</b> pour <b>u</b> = (3 ; −2).', ans:13, why:'3 · 3 + (−2) · (−2) = 9 + 4 = 13. C’est ‖<b>u</b>‖².'},
   {q:'Pour quelle valeur de <i>k</i> les vecteurs (3 ; <i>k</i>) et (4 ; −6) sont-ils perpendiculaires ?', lab:'k =', ans:2, why:'Perpendiculaires : produit scalaire nul. 3 · 4 + <i>k</i> · (−6) = 12 − 6<i>k</i> = 0, donc <i>k</i> = 2.'},
   {q:'‖<b>u</b>‖ = 4, ‖<b>v</b>‖ = 5 et l’angle entre eux vaut 60°. Combien vaut <b>u</b> · <b>v</b> ?', ans:10, why:'<b>u</b> · <b>v</b> = ‖<b>u</b>‖ · ‖<b>v</b>‖ · cos 60° = 4 · 5 · ½ = 10.'},
   {q:'Quel est l’angle entre <b>u</b> = (1 ; 1) et <b>v</b> = (−1 ; 0) ?', unit:'°', ans:135, why:'<b>u</b> · <b>v</b> = −1, ‖<b>u</b>‖ = √2, ‖<b>v</b>‖ = 1. cos θ = −1/√2 ≈ −0,707, donc θ = 135°.'},
   {q:'Quel est l’angle entre (2 ; 1) et (−1 ; 3) ? (au centième de degré)', unit:'°', ans:81.87, tol:.011, why:'Produit scalaire −2 + 3 = 1, normes √5 et √10. cos θ = 1/√50 ≈ 0,1414, donc θ ≈ 81,87°.'},
   {q:'L’angle entre (1 ; 2) et (−3 ; 1) est…', opts:['aigu','droit','obtus','nul'], ans:2, why:'Le produit scalaire vaut 1 · (−3) + 2 · 1 = −1 < 0 : cos θ < 0, donc l’angle est obtus.'},
 ]},
 {n:'Aire, hauteur et direction', r:'Aire, hauteur et direction', qs:[
   {q:'On donne <b>AB</b> = (3 ; 2) et <b>AC</b> = (1 ; 4). Quelle est l’aire du triangle ABC ?', ans:5, why:'det = 3 · 4 − 2 · 1 = 10, donc aire = ½ · 10 = 5.'},
   {q:'On donne <b>AB</b> = (1 ; 4) et <b>AC</b> = (3 ; 2). Quelle est l’aire du triangle ABC ?', ans:5, why:'det = 1 · 2 − 3 · 4 = −10. L’aire prend la valeur absolue : ½ · |−10| = 5.'},
   {q:'Un parallélogramme ABCD est construit sur <b>AB</b> = (4 ; 0) et <b>AD</b> = (1 ; 3). Quelle est son aire ?', ans:12, why:'Le déterminant donne l’aire du parallélogramme : |4 · 3 − 0 · 1| = 12.'},
   {q:'Quelle est l’aire du triangle construit sur (2 ; 6) et (−1 ; −3) ?', ans:0, why:'det = 2 · (−3) − (−1) · 6 = −6 + 6 = 0. Les deux vecteurs ont la même direction : le triangle est aplati.'},
   {q:'A(0 ; 0), B(4 ; 3) et C(1 ; 4). Quelle est la distance de C à la droite (AB) ?', ans:2.6, tol:.001, why:'det(<b>AB</b>, <b>AC</b>) = 4 · 4 − 3 · 1 = 13, aire 6,5. Base ‖<b>AB</b>‖ = 5, donc h = 2 · 6,5 / 5 = 2,6.'},
   {q:'Quel angle aigu le vecteur (5 ; 2) fait-il avec l’horizontale ? (au centième de degré)', unit:'°', ans:21.8, tol:.011, why:'tan α = 2/5 = 0,4, donc α = arctan 0,4 ≈ 21,80°.'},
   {q:'Quel angle aigu le vecteur (−3 ; 3) fait-il avec la droite horizontale ?', unit:'°', ans:45, why:'tan α = |3| / |−3| = 1, donc α = 45° : le vecteur monte vers la gauche aussi vite qu’il avance.'},
 ]},
];
})();
