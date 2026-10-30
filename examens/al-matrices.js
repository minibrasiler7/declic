/* Déclic — examen de compétence : Matrices 2×2 */
(()=>{
const M=A=>mat(A.map(r=>r.map(x=>fmt(x))));
EXAMS['al-matrices']=[
 {n:'Somme et multiple', r:'Somme et multiple', qs:[
   {q:`Soit <i>A</i> = ${M([[3,-1],[2,0]])} et <i>B</i> = ${M([[-2,4],[1,5]])}. Quel est le coefficient ligne 1, colonne 2 de 2<i>A</i> − <i>B</i>&nbsp;?`, lab:'coefficient =', ans:-6, why:'On calcule terme à terme : 2·(−1) − 4 = −6. En entier, 2A − B = (8 −6 ; 3 −5).'},
   {q:`Soit <i>A</i> = ${M([[3,-1],[2,0]])} et <i>B</i> = ${M([[-2,4],[1,5]])}. Quel est le coefficient ligne 2, colonne 1 de <i>A</i> + 3<i>B</i>&nbsp;?`, lab:'coefficient =', ans:5, why:'Ligne 2, colonne 1 : 2 + 3·1 = 5.'},
   {q:`On cherche la matrice <i>X</i> telle que 2${mat([[1,2],[3,4]])} + <i>X</i> = ${mat([[5,0],[1,2]])}. Quel est son coefficient en haut à gauche&nbsp;?`, lab:'coefficient =', ans:3, why:'X = B − 2A, terme à terme : 5 − 2·1 = 3. En entier, X = (3 −4 ; −5 −6).'},
 ]},
 {n:'Produit matriciel', r:'Poser un produit matriciel', qs:[
   {q:`Soit <i>A</i> = ${M([[1,3],[-2,1]])} et <i>B</i> = ${M([[2,0],[1,-1]])}. Quel est le coefficient ligne 1, colonne 2 de <i>AB</i>&nbsp;?`, lab:'(AB)₁₂ =', ans:-3, why:'Ligne 1 de A × colonne 2 de B : 1·0 + 3·(−1) = −3. En entier, AB = (5 −3 ; −3 −1).'},
   {q:`Soit <i>A</i> = ${M([[1,3],[-2,1]])} et <i>B</i> = ${M([[2,0],[1,-1]])}. Quel est le coefficient ligne 1, colonne 2 de <i>BA</i>&nbsp;?`, lab:'(BA)₁₂ =', ans:6, why:'Ligne 1 de B × colonne 2 de A : 2·3 + 0·1 = 6. Dans l’autre ordre on trouvait −3 : AB ≠ BA.'},
   {q:`Calcule ${M([[3,-2],[1,4]])}${M([[2],[-1]])}. Quelle est la <b>première</b> coordonnée du résultat&nbsp;?`, lab:'1re coordonnée =', ans:8, why:'Ligne 1 × la colonne : 3·2 + (−2)·(−1) = 6 + 2 = 8. Le résultat est (8 ; −2).'},
   {q:`Soit <i>A</i> = ${M([[1,2],[3,-1]])}. Quel est le coefficient en haut à gauche de <i>A</i>²&nbsp;?`, lab:'coefficient =', ans:7, why:'Ligne 1 × colonne 1 : 1·1 + 2·3 = 7. En entier, A² = (7 0 ; 0 7) = 7I.'},
   {q:`Soit <i>A</i> = ${mat([[0,1],[0,0]])}. Que vaut <i>A</i>²&nbsp;?`, opts:['<i>A</i>','La matrice nulle','<i>I</i>',mat([[0,0],[1,0]])], ans:1, why:'Ligne 1 × colonne 2 : 0·1 + 1·0 = 0, et tous les autres coefficients sont nuls aussi. A² = 0 alors que A ≠ 0.'},
   {q:`Soit <i>A</i> = ${mat([[1,1],[0,1]])}. Quel est le coefficient en haut à droite de <i>A</i>³&nbsp;?`, lab:'coefficient =', ans:3, why:'A² = AA = (1 2 ; 0 1), puis A³ = A²A = (1 3 ; 0 1). Le coefficient vaut 3.'},
 ]},
 {n:'Déterminant et transposée', r:'Transposée et déterminant', qs:[
   {q:`Calcule det ${M([[5,-3],[2,4]])}.`, lab:'det =', ans:26, why:'ad − bc = 5·4 − (−3)·2 = 20 + 6 = 26.'},
   {q:`Soit <i>A</i> = ${mat([[2,1],[1,2]])} et <i>B</i> = ${mat([[1,3],[1,1]])}. Combien vaut det(<i>AB</i>)&nbsp;?`, lab:'det(AB) =', ans:-6, why:'det(AB) = det A · det B = (4 − 1)(1 − 3) = 3·(−2) = −6. Pas besoin de calculer AB.'},
   {q:`Pour quelle valeur de <i>k</i> la matrice ${mat([['<i>k</i>','4'],['3','6']])} n’est-elle pas inversible&nbsp;?`, lab:'k =', ans:2, why:'Elle n’est pas inversible si det = 6k − 12 = 0, soit k = 2. Les colonnes (2 ; 3) et (4 ; 6) sont alors colinéaires.'},
   {q:`Soit <i>A</i> = ${M([[1,4],[-2,3]])}. Quel est le coefficient ligne 1, colonne 2 de ᵗ<i>A</i>&nbsp;?`, lab:'coefficient =', ans:-2, why:'La transposée échange lignes et colonnes : ᵗA = (1 −2 ; 4 3). Le coefficient ligne 1, colonne 2 de ᵗA est celui ligne 2, colonne 1 de A.'},
   {q:'<i>A</i> est une matrice 2×2 avec det <i>A</i> = 5. Combien vaut det(2<i>A</i>)&nbsp;?', lab:'det(2A) =', ans:20, why:'Tous les coefficients sont doublés : (2a)(2d) − (2b)(2c) = 4(ad − bc) = 4·5 = 20, et non 2·5.'},
 ]},
 {n:'Inverse par la formule', r:'Inverser une matrice 2 × 2 avec la formule', qs:[
   {q:`Soit <i>A</i> = ${mat([[5,3],[3,2]])}. Quel est le coefficient en haut à droite de <i>A</i>⁻¹&nbsp;?`, lab:'coefficient =', ans:-3, why:'det A = 10 − 9 = 1. On échange 5 et 2, on change le signe de 3 et 3 : A⁻¹ = (2 −3 ; −3 5).'},
   {q:`Soit <i>A</i> = ${mat([[2,5],[1,4]])}. Quel est le coefficient en bas à droite de <i>A</i>⁻¹&nbsp;? Tu peux répondre par une fraction.`, lab:'coefficient =', ans:2/3, tol:.01, show:'2/3', why:'det A = 8 − 5 = 3, donc A⁻¹ = (1/3)(4 −5 ; −1 2). Le coefficient en bas à droite vaut 2/3.'},
   {q:`Soit <i>A</i> = ${mat([[6,2],[4,2]])}. Quel est le coefficient en bas à gauche de <i>A</i>⁻¹&nbsp;?`, lab:'coefficient =', ans:-1, why:'det A = 12 − 8 = 4, donc A⁻¹ = ¼(2 −2 ; −4 6) = (0,5 −0,5 ; −1 1,5). Le coefficient vaut −4/4 = −1.'},
   {q:`Quelle est l’inverse de ${mat([[1,2],[0,1]])}&nbsp;?`, opts:[mat([[1,0],[2,1]]),M([[-1,2],[0,-1]]),M([[1,-2],[0,1]]),M([[1,0],[-2,1]])], ans:2, why:'det = 1. On échange les deux 1 de la diagonale et on change le signe de 2 et de 0 : (1 −2 ; 0 1). Contrôle : (1 2 ; 0 1)(1 −2 ; 0 1) = I.'},
   {q:'<i>A</i> et <i>B</i> sont inversibles. Que vaut (<i>AB</i>)⁻¹&nbsp;?', opts:['<i>A</i>⁻¹<i>B</i>⁻¹','<i>BA</i>','<i>B</i>⁻¹<i>A</i>⁻¹','<i>AB</i>'], ans:2, why:'(AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = AA⁻¹ = I. On défait dans l’ordre inverse. A⁻¹B⁻¹ ne convient pas en général, car le produit ne commute pas.'},
 ]},
 {n:'Inverse par Gauss-Jordan', r:'Inverser par la méthode de Gauss-Jordan', qs:[
   {q:`On inverse <i>A</i> = ${mat([[1,3],[2,7]])} par Gauss-Jordan : <i>L</i>₂ ← <i>L</i>₂ − 2<i>L</i>₁, puis <i>L</i>₁ ← <i>L</i>₁ − 3<i>L</i>₂. Quel est le coefficient en haut à gauche de <i>A</i>⁻¹&nbsp;?`, lab:'coefficient =', ans:7, why:'[1 3 | 1 0 ; 2 7 | 0 1] → L₂ − 2L₁ : [0 1 | −2 1] → L₁ − 3L₂ : [1 0 | 7 −3]. Donc A⁻¹ = (7 −3 ; −2 1), ce que confirme la formule avec det A = 1.'},
   {q:'Laquelle de ces opérations est permise dans la méthode de Gauss-Jordan&nbsp;?', opts:['Multiplier une ligne par 0','Ajouter un même nombre à tous les coefficients d’une ligne','Ajouter à une ligne un multiple d’une autre ligne','Échanger deux colonnes de la partie gauche seulement'], ans:2, why:'Les trois opérations permises portent sur des lignes entières : échanger deux lignes, multiplier une ligne par un nombre non nul, ajouter à une ligne un multiple d’une autre.'},
   {q:`On inverse <i>A</i> = ${mat([[2,2],[3,4]])} par Gauss-Jordan : <i>L</i>₁ ← <i>L</i>₁/2, puis <i>L</i>₂ ← <i>L</i>₂ − 3<i>L</i>₁, puis <i>L</i>₁ ← <i>L</i>₁ − <i>L</i>₂. Quel est le coefficient en bas à gauche de <i>A</i>⁻¹&nbsp;? Donne la valeur décimale.`, lab:'coefficient =', ans:-1.5, tol:.001, why:'[1 1 | 0,5 0] puis L₂ − 3L₁ : [0 1 | −1,5 1], puis L₁ − L₂ : [1 0 | 2 −1]. Donc A⁻¹ = (2 −1 ; −1,5 1), comme avec la formule (det A = 2).'},
   {q:`On veut inverser <i>A</i> = ${mat([[0,1],[1,3]])} par Gauss-Jordan. Quelle est la bonne première opération&nbsp;?`, opts:['Diviser <i>L</i>₁ par 0','Échanger <i>L</i>₁ et <i>L</i>₂','<i>L</i>₂ ← <i>L</i>₂ − 3<i>L</i>₁','Conclure que <i>A</i> n’est pas inversible'], ans:1, why:'Le premier pivot est nul : on échange les lignes pour en avoir un non nul. A est bien inversible, car det A = −1 ≠ 0.'},
 ]},
 {n:'Résoudre un système 2 × 2', r:'Résoudre un système 2 × 2', qs:[
   {q:'Résous 3<i>x</i> − <i>y</i> = 7 et <i>x</i> + 2<i>y</i> = 7. Combien vaut <i>x</i>&nbsp;?', lab:'x =', ans:3, why:'det = 3·2 − (−1)·1 = 7. Cramer : x = (7·2 − (−1)·7)/7 = 21/7 = 3, puis y = (3·7 − 7·1)/7 = 2. Vérification : 9 − 2 = 7 et 3 + 4 = 7.'},
   {q:'Résous 4<i>x</i> + 3<i>y</i> = 5 et 2<i>x</i> + 5<i>y</i> = −1. Combien vaut <i>y</i>&nbsp;?', lab:'y =', ans:-1, why:'det = 20 − 6 = 14. Cramer : y = (4·(−1) − 5·2)/14 = −14/14 = −1, et x = (5·5 − 3·(−1))/14 = 2. Vérification : 8 − 3 = 5 et 4 − 5 = −1.'},
   {q:'Pour le système 2<i>x</i> + <i>y</i> = 4 et 5<i>x</i> + 3<i>y</i> = 7, quelle formule de Cramer donne <i>x</i>&nbsp;?', opts:[`<i>x</i> = det ${mat([[2,4],[5,7]])} / det ${mat([[2,1],[5,3]])}`,`<i>x</i> = det ${mat([[4,1],[7,3]])} / det ${mat([[2,1],[5,3]])}`,`<i>x</i> = det ${mat([[2,1],[5,3]])} / det ${mat([[4,1],[7,3]])}`,`<i>x</i> = det ${mat([[4,2],[7,5]])} / det ${mat([[2,1],[5,3]])}`], ans:1, why:'Pour x, on remplace la 1re colonne de A par le second membre (4 ; 7), et on divise par det A = 1 : x = 12 − 7 = 5. La 1re option donne y = 14 − 20 = −6.'},
   {q:`On sait que <i>A</i> = ${mat([[2,1],[3,2]])} a pour inverse ${M([[2,-1],[-3,2]])}. Résous <i>AX</i> = (4 ; 5) avec <i>X</i> = (<i>x</i> ; <i>y</i>). Combien vaut <i>y</i>&nbsp;?`, lab:'y =', ans:-2, why:'X = A⁻¹B : x = 2·4 − 5 = 3 et y = −3·4 + 2·5 = −2. Vérification : 6 − 2 = 4 et 9 − 4 = 5.'},
   {q:'2 billets adulte et 3 billets enfant coûtent 31 francs ; 1 billet adulte et 2 billets enfant coûtent 18 francs. Combien coûte un billet enfant&nbsp;?', lab:'prix =', unit:'francs', ans:5, why:'2a + 3e = 31 et a + 2e = 18. L₁ − 2L₂ donne −e = −5, donc e = 5, puis a = 18 − 10 = 8. Vérification : 16 + 15 = 31.'},
 ]},
 {n:'Systèmes de déterminant nul', r:'Un système dont le déterminant est nul', qs:[
   {q:'Pour quelle valeur de <i>k</i> le système <i>x</i> − 3<i>y</i> = 2, −2<i>x</i> + 6<i>y</i> = <i>k</i> a-t-il une infinité de solutions&nbsp;?', lab:'k =', ans:-4, why:'det = 6 − 6 = 0. L₂ + 2L₁ donne 0 = k + 4. Infinité de solutions si k = −4 (droites confondues), aucune sinon.'},
   {q:'Combien de solutions a le système 2<i>x</i> + 4<i>y</i> = 6, <i>x</i> + 2<i>y</i> = 5&nbsp;?', opts:['Une seule','Une infinité','Aucune','Deux'], ans:2, why:'det = 4 − 4 = 0. L₁ − 2L₂ donne 0 = 6 − 10 = −4, impossible : les droites sont parallèles.'},
   {q:'Le système <i>x</i> − 2<i>y</i> = 1, 3<i>x</i> − 6<i>y</i> = 3 a une infinité de solutions. Laquelle vérifie aussi <i>x</i> + <i>y</i> = 10&nbsp;? Donne <i>x</i>.', lab:'x =', ans:7, why:'L₂ = 3L₁ : il reste x = 1 + 2t, y = t. Puis 1 + 3t = 10 donne t = 3, donc (x ; y) = (7 ; 3). Contrôle : 7 − 6 = 1.'},
   {q:'Pour quelle valeur de <i>m</i> le système <i>mx</i> + 2<i>y</i> = 1, 2<i>x</i> + <i>y</i> = 3 n’a-t-il pas de solution unique&nbsp;?', lab:'m =', ans:4, why:'Pas de solution unique ⇔ det = m·1 − 2·2 = 0 ⇔ m = 4. Le système devient alors 4x + 2y = 1 et 4x + 2y = 6 : aucune solution.'},
 ]},
];
})();
