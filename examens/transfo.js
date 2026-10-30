/* Déclic — examen de compétence : Transformations linéaires */
(()=>{
EXAMS['transfo']=[
 {n:'La matrice d’une transformation', r:'Écrire la matrice d’une transformation', qs:[
   {q:`Calcule la 2e composante de ${mat([[2,'−1'],[3,1]])}·(4 ; 1).`, ans:13, why:'Ligne 2 fois le vecteur : 3·4 + 1·1 = 13. L’image est (7 ; 13).'},
   {q:`Calcule la 1re composante de ${mat([['−1',2],[2,'−3']])}·(3 ; −2).`, ans:-7, why:'Ligne 1 fois le vecteur : (−1)·3 + 2·(−2) = −3 − 4 = −7. L’image est (−7 ; 12).'},
   {q:'Une transformation linéaire envoie e₁ sur (3 ; −1) et e₂ sur (2 ; 5). Quelle est l’ordonnée de l’image de (1 ; 2) ?', lab:'y =', ans:9, why:`La matrice est ${mat([[3,2],['−1',5]])}. Image de (1 ; 2) : (3 + 4 ; −1 + 10) = (7 ; 9).`},
   {q:'La symétrie par rapport à la droite y = −x envoie (x ; y) sur (−y ; −x). Quelle est l’abscisse de l’image de (3 ; 1) ?', lab:'x =', ans:-1, why:`Sa matrice est ${mat([[0,'−1'],['−1',0]])} : (3 ; 1) devient (−1 ; −3).`},
   {q:'Quelle est la matrice de la symétrie par rapport à l’axe des y ?', opts:[`${mat([[1,0],[0,'−1']])}`,`${mat([['−1',0],[0,1]])}`,`${mat([[0,1],[1,0]])}`,`${mat([['−1',0],[0,'−1']])}`], ans:1, why:'e₁ = (1 ; 0) va sur (−1 ; 0) et e₂ = (0 ; 1) reste en place. Ces images forment les colonnes.'},
   {q:'Quelle est la matrice de la projection sur l’axe des x, qui envoie (x ; y) sur (x ; 0) ?', opts:[`${mat([[0,0],[0,1]])}`,`${mat([[1,1],[0,0]])}`,`${mat([[1,0],[0,0]])}`,`${mat([[1,0],[0,1]])}`], ans:2, why:'e₁ va sur (1 ; 0) et e₂ va sur (0 ; 0). En colonnes : 1re colonne (1 ; 0), 2e colonne (0 ; 0).'},
   {q:'Une transformation envoie e₁ sur (1 ; 2) et e₂ sur (3 ; 4). Quelle est sa matrice ?', opts:[`${mat([[1,2],[3,4]])}`,`${mat([[2,1],[4,3]])}`,`${mat([[3,1],[4,2]])}`,`${mat([[1,3],[2,4]])}`], ans:3, why:'Les images s’écrivent en <b>colonnes</b> : 1re colonne (1 ; 2), 2e colonne (3 ; 4). Les écrire en lignes est l’erreur classique.'},
   {q:'Une transformation linéaire T vérifie T(1 ; 0) = (2 ; 1) et T(1 ; 1) = (5 ; 3). Quel est le coefficient en haut à droite de sa matrice ?', ans:3, why:'(0 ; 1) = (1 ; 1) − (1 ; 0), donc T(0 ; 1) = (5 ; 3) − (2 ; 1) = (3 ; 2). C’est la 2e colonne : le coefficient en haut à droite vaut 3.'},
 ]},
 {n:'Rotations', r:'Écrire la matrice d’une transformation', qs:[
   {q:'Quelle est l’abscisse de l’image de (4 ; 1) par la rotation de 90° (sens trigonométrique) ?', lab:'x =', ans:-1, why:`${mat([[0,'−1'],[1,0]])}·(4 ; 1) = (0·4 − 1·1 ; 1·4 + 0·1) = (−1 ; 4).`},
   {q:'Quelle est l’ordonnée de l’image de (2 ; −5) par la rotation de 180° ?', lab:'y =', ans:5, why:`cos 180° = −1 et sin 180° = 0 : la matrice est ${mat([['−1',0],[0,'−1']])}, et (2 ; −5) devient (−2 ; 5).`},
   {q:'Quelle est l’ordonnée de l’image de (2 ; 0) par la rotation de 60° ? (au centième)', lab:'y =', ans:1.73, tol:0.006, why:'Image de 2e₁ : 2·(cos 60° ; sin 60°) = (1 ; √3). √3 ≈ 1,73.'},
   {q:'Quelle est l’ordonnée de l’image de (1 ; 1) par la rotation de 45° ? (au centième)', lab:'y =', ans:1.41, tol:0.006, why:'(cos 45° − sin 45° ; sin 45° + cos 45°) = (0 ; 2·√2/2) = (0 ; √2) ≈ (0 ; 1,41).'},
   {q:'Quelle est l’abscisse de l’image de (0 ; 2) par la rotation de 30° ?', lab:'x =', ans:-1, why:'La 2e colonne de la rotation est (−sin 30° ; cos 30°). Image de (0 ; 2) : 2·(−1/2 ; √3/2) = (−1 ; √3).'},
   {q:'Quelle est la matrice de la rotation de 90° dans le sens des aiguilles d’une montre (angle −90°) ?', opts:[`${mat([[0,'−1'],[1,0]])}`,`${mat([[0,1],['−1',0]])}`,`${mat([['−1',0],[0,'−1']])}`,`${mat([[0,1],[1,0]])}`], ans:1, why:'cos(−90°) = 0 et sin(−90°) = −1. e₁ va sur (0 ; −1) et e₂ sur (1 ; 0) : ce sont les colonnes.'},
 ]},
 {n:'Déterminant, aires et orientation', r:'Lire le déterminant', qs:[
   {q:`Quelle est l’aire de l’image du carré unité par ${mat([[3,'−1'],[2,4]])} ?`, ans:14, why:'det = 3·4 − (−1)·2 = 14. L’aire 1 est multipliée par |14|.'},
   {q:`Un triangle a une aire de 5. Quelle est l’aire de son image par ${mat([[1,3],[2,1]])} ?`, ans:25, why:'det = 1·1 − 3·2 = −5. Les aires sont multipliées par |−5| = 5 : 5 × 5 = 25. Le signe indique seulement un retournement.'},
   {q:`Quelle est l’aire de l’image du disque unité par ${mat([[2,1],[1,3]])} ? (au centième)`, ans:15.71, tol:0.006, why:'det = 6 − 1 = 5. Le disque d’aire π devient une figure d’aire 5π ≈ 15,71.'},
   {q:'det A = 3 et det B = −2. Combien vaut det(AB) ?', lab:'det =', ans:-6, why:'det(AB) = det A · det B = 3 · (−2) = −6.'},
   {q:'det A = −3. Combien vaut det(A²) ?', lab:'det =', ans:9, why:'det(A²) = det A · det A = (−3)² = 9. Deux retournements se compensent.'},
   {q:`Pour quelle valeur de k la matrice ${mat([['k',2],[1,3]])} écrase-t-elle le plan sur une droite ? (fraction ou décimale)`, lab:'k =', ans:2/3, tol:0.003, show:'2/3', why:'Le plan est écrasé quand det = 0 : 3k − 2·1 = 0, donc k = 2/3.'},
   {q:`Que fait la matrice ${mat([[2,4],[1,2]])} ?`, opts:['Elle double les aires','Elle conserve les aires','Elle retourne le plan','Elle écrase le plan sur une droite'], ans:3, why:'det = 2·2 − 4·1 = 0. Les colonnes (2 ; 1) et (4 ; 2) sont colinéaires : tout le plan est envoyé sur la droite qu’elles portent.'},
   {q:`Que fait la matrice ${mat([[0,2],[3,0]])} aux aires et à l’orientation ?`, opts:['Elle multiplie les aires par 6 et renverse l’orientation','Elle multiplie les aires par 6 et garde l’orientation','Elle multiplie les aires par 5','Elle multiplie les aires par −6, donc les rend négatives'], ans:0, why:'det = 0·0 − 2·3 = −6. Les aires sont multipliées par |−6| = 6, et le signe − indique un retournement, comme dans un miroir.'},
 ]},
 {n:'Composer et reconnaître', r:'Composer avec un produit de matrices', qs:[
   {q:`A = ${mat([[1,2],[0,1]])} et B = ${mat([[3,0],[1,1]])}. Quel est le coefficient en haut à gauche de AB ?`, ans:5, why:'Ligne 1 de A fois colonne 1 de B : 1·3 + 2·1 = 5.'},
   {q:`A = ${mat([[1,2],[0,1]])} et B = ${mat([[3,0],[1,1]])}. Quel est le coefficient en haut à droite de BA ?`, ans:6, why:`Ligne 1 de B fois colonne 2 de A : 3·2 + 0·1 = 6. BA = ${mat([[3,6],[1,3]])}, alors que AB = ${mat([[5,2],[1,1]])}.`},
   {q:`A = ${mat([[2,'−1'],[1,3]])} et B = ${mat([[1,4],['−2',0]])}. Quel est le coefficient en bas à gauche de AB ?`, ans:-5, why:'Ligne 2 de A fois colonne 1 de B : 1·1 + 3·(−2) = −5.'},
   {q:`A = ${mat([[1,1],[0,1]])}. Quel est le coefficient en haut à droite de A³ ?`, ans:3, why:`A² = ${mat([[1,2],[0,1]])}, puis A³ = A²·A = ${mat([[1,3],[0,1]])}. Trois glissements de 1 font un glissement de 3.`},
   {q:'On applique d’abord la symétrie d’axe y = x, puis l’étirement (x ; y) ↦ (2x ; 3y). Quelle est l’ordonnée de l’image de (1 ; 4) ?', lab:'y =', ans:3, why:'La symétrie donne (4 ; 1), puis l’étirement donne (8 ; 3). Attention à l’ordre : dans l’autre ordre, on obtiendrait (12 ; 2).'},
   {q:'On applique d’abord la transformation A, puis la transformation B. Quelle matrice représente le tout ?', opts:['AB','A + B','BA','B⁻¹A'], ans:2, why:'La transformation faite en premier s’écrit à droite : B(Av) = (BA)v.'},
   {q:`La matrice ${mat([['−1',0],[0,1]])} est une symétrie axiale. Quel est son axe ?`, opts:['L’axe des x','L’axe des y','La droite y = x','La droite y = −x'], ans:1, why:'det = −1 et M² = I. Points fixes : (−x ; y) = (x ; y) donne x = 0, c’est l’axe des y.'},
   {q:`M = ${mat(([[F(3,5),F(4,5)],[F(4,5),'−'+F(3,5)]]))} vérifie det M = −1 et M² = I. Quel est l’axe de cette symétrie ?`, opts:['y = 2x','y = x','y = −x/2','y = x/2'], ans:3, why:'Points fixes : (3x + 4y)/5 = x donne 4y = 2x, soit y = x/2. Contrôle avec la 2e ligne : (4x − 3y)/5 = y donne 4x = 8y, la même droite.'},
 ]},
];
})();
