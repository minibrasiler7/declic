/* Déclic — examen de compétence : Déterminant 3 × 3 */
(()=>{
const M=A=>mat(A.map(r=>r.map(x=>fmt(x))));
EXAMS['al3-determinant']=[
 {n:'La règle de Sarrus', r:'Calculer un déterminant avec Sarrus', qs:[
   {q:`Calcule le déterminant de ${M([[2,1,3],[1,-1,2],[4,0,1]])}.`, lab:'det =', ans:17, tol:.001, why:'Descendantes : 2·(−1)·1 + 1·2·4 + 3·1·0 = −2 + 8 + 0 = 6. Montantes : 3·(−1)·4 + 2·2·0 + 1·1·1 = −12 + 0 + 1 = −11. det = 6 − (−11) = 17.'},
   {q:`Calcule le déterminant de ${M([[1,2,3],[4,5,6],[7,8,10]])}.`, lab:'det =', ans:-3, tol:.001, why:'Descendantes : 50 + 84 + 96 = 230. Montantes : 3·5·7 + 1·6·8 + 2·4·10 = 105 + 48 + 80 = 233. det = 230 − 233 = −3.'},
   {q:`Calcule le déterminant de ${M([[3,-2,1],[2,1,-1],[1,4,2]])}.`, lab:'det =', ans:35, tol:.001, why:'Descendantes : 3·1·2 + (−2)·(−1)·1 + 1·2·4 = 6 + 2 + 8 = 16. Montantes : 1·1·1 + 3·(−1)·4 + (−2)·2·2 = 1 − 12 − 8 = −19. det = 16 + 19 = 35.'},
   {q:`Pour quelle valeur de <i>k</i> le déterminant de ${M([[1,1,1],[1,2,3],[1,4,'<i>k</i>']])} est-il nul&nbsp;?`, lab:'k =', ans:7, tol:.001, why:'Descendantes : 2k + 3 + 4 = 2k + 7. Montantes : 2 + 12 + k = k + 14. det = 2k + 7 − k − 14 = k − 7, nul pour k = 7.'},
   {q:'Pour la matrice (a b c ; d e f ; g h i), lequel de ces produits est compté avec un signe moins dans la règle de Sarrus&nbsp;?', opts:['aei','bfg','ceg','cdh'], ans:2, why:'Les montantes ceg, afh et bdi sont retranchées. aei, bfg et cdh sont les descendantes, comptées en +.'},
 ]},
 {n:'Développer par cofacteurs', r:'Développer par cofacteurs avec le bon choix de ligne', qs:[
   {q:`Calcule le déterminant de ${M([[3,0,2],[1,0,5],[4,2,-1]])}.`, lab:'det =', ans:-26, tol:.001, why:'La colonne 2 n’a qu’un coefficient non nul, a₃₂ = 2, de signe (−1)³⁺² = −1. Mineur : det(3 2 ; 1 5) = 13. det = 2 · (−1) · 13 = −26.'},
   {q:`Calcule le cofacteur C₂₃ de ${M([[1,2,3],[4,5,6],[7,8,9]])}.`, lab:'C₂₃ =', ans:6, tol:.001, why:'On barre la ligne 2 et la colonne 3 : det(1 2 ; 7 8) = 8 − 14 = −6. Le signe vaut (−1)²⁺³ = −1, donc C₂₃ = 6.'},
   {q:`Calcule le déterminant de ${M([[2,-1,4],[0,3,0],[1,5,-2]])}.`, lab:'det =', ans:-24, tol:.001, why:'On développe selon la ligne 2 : seul a₂₂ = 3 compte, signe +. Mineur : det(2 4 ; 1 −2) = −4 − 4 = −8. det = 3 · (−8) = −24.'},
   {q:`Calcule le déterminant de ${M([[0,0,2],[0,3,1],[5,1,7]])}.`, lab:'det =', ans:-30, tol:.001, why:'Selon la colonne 1 : seul a₃₁ = 5 compte, signe +. Mineur : det(0 2 ; 3 1) = 0 − 6 = −6. det = 5 · (−6) = −30.'},
   {q:`Calcule le déterminant de ${M([[2,7,-3],[0,-1,4],[0,0,5]])}.`, lab:'det =', ans:-10, tol:.001, why:'En développant selon la 1re colonne, puis encore, on obtient le produit de la diagonale d’une matrice triangulaire : 2 · (−1) · 5 = −10.'},
 ]},
 {n:'Volume et indépendance de trois vecteurs', r:'Tester si trois vecteurs sont indépendants', qs:[
   {q:'Quel est le volume du parallélépipède construit sur <i>u</i> = (1 ; 2 ; 0), <i>v</i> = (0 ; 1 ; 3) et <i>w</i> = (2 ; 0 ; 1)&nbsp;?', lab:'V =', ans:13, tol:.001, why:'On range les vecteurs en colonnes : det(1 0 2 ; 2 1 0 ; 0 3 1) = 1·(1 − 0) − 0 + 2·(6 − 0) = 13. Le volume vaut |13| = 13.'},
   {q:'Les vecteurs (1 ; 1 ; 0), (0 ; 1 ; 1) et (1 ; 0 ; 1) forment-ils une base de ℝ³&nbsp;?', opts:['Non, car le déterminant vaut 0','Oui, car le déterminant vaut 2','Non, car aucun n’est nul','Oui, car aucun n’est nul'], ans:1, why:'det(1 0 1 ; 1 1 0 ; 0 1 1) = 1·(1 − 0) − 0 + 1·(1 − 0) = 2 ≠ 0 : la famille est libre, c’est une base.'},
   {q:'Pour quelle valeur de <i>k</i> les vecteurs (1 ; 2 ; 1), (2 ; 1 ; 0) et (1 ; <i>k</i> ; 1) sont-ils coplanaires&nbsp;?', lab:'k =', ans:2, tol:.001, why:'En colonnes, det = 2k − 4 (développement selon la 1re ligne : 1·(1 − 0) − 2·(2 − k) + 1·(0 − 1)). Il s’annule pour k = 2.'},
   {q:'Les points O(0 ; 0 ; 0), A(1 ; 0 ; 2), B(2 ; 1 ; 0) et C(3 ; 1 ; 2) sont-ils dans un même plan&nbsp;?', opts:['Oui, car det(OA, OB, OC) = 0','Non, car det(OA, OB, OC) = 6','Non, car les points sont distincts','On ne peut pas le savoir sans équation de plan'], ans:0, why:'det(1 2 3 ; 0 1 1 ; 2 0 2) = 1·2 − 2·(0 − 2) + 3·(0 − 2) = 2 + 4 − 6 = 0. D’ailleurs OC = OA + OB.'},
   {q:'Les vecteurs <i>u</i> = (1 ; 0 ; 2), <i>v</i> = (0 ; 1 ; 1) et <i>w</i> = (2 ; 3 ; 7) ont un déterminant nul. On écrit <i>w</i> = α<i>u</i> + β<i>v</i>. Combien vaut β&nbsp;?', lab:'β =', ans:3, tol:.001, why:'1re coordonnée : α = 2. 2e coordonnée : β = 3. Contrôle sur la 3e : 2 · 2 + 3 · 1 = 7.'},
   {q:'Trois vecteurs vérifient det(<i>u</i>, <i>v</i>, <i>w</i>) = −4. Que peux-tu dire&nbsp;?', opts:['Ils sont coplanaires','Le volume du parallélépipède vaut −4','Ils forment une base, et le parallélépipède a un volume de 4','Ils ne forment pas une base, car le déterminant est négatif'], ans:2, why:'Un déterminant non nul signifie une famille libre. Le volume est la valeur absolue, 4 ; le signe dit seulement que la base n’est pas directe.'},
 ]},
 {n:'Calculer par opérations sur les lignes', r:'Calculer un déterminant par opérations sur les lignes', qs:[
   {q:`Calcule le déterminant de ${M([[1,2,1],[2,5,4],[3,8,9]])}.`, lab:'det =', ans:2, tol:.001, why:'L₂ − 2L₁ = (0 1 2), L₃ − 3L₁ = (0 2 6), puis L₃ − 2L₂ = (0 0 2). det = 1 · 1 · 2 = 2.'},
   {q:`Calcule le déterminant de ${M([[2,4,6],[1,3,5],[1,1,4]])}.`, lab:'det =', ans:6, tol:.001, why:'On sort 2 de L₁ : 2 · det(1 2 3 ; 1 3 5 ; 1 1 4). L₂ − L₁ = (0 1 2), L₃ − L₁ = (0 −1 1), puis L₃ + L₂ = (0 0 3). det = 2 · 3 = 6.'},
   {q:`Calcule le déterminant de ${M([[1,1,1],[1,4,1],[1,1,-1]])}.`, lab:'det =', ans:-6, tol:.001, why:'L₂ − L₁ = (0 3 0) et L₃ − L₁ = (0 0 −2) : la matrice devient triangulaire. det = 1 · 3 · (−2) = −6.'},
   {q:`Que vaut le déterminant de ${M([[1,1,1],[1,'1 + <i>a</i>',1],[1,1,'1 + <i>b</i>']])}&nbsp;?`, opts:['a + b','ab','1 + ab','(1 + a)(1 + b)'], ans:1, why:'L₂ − L₁ = (0 a 0) et L₃ − L₁ = (0 0 b) : matrice triangulaire de diagonale 1, a, b. det = ab.'},
 ]},
 {n:'Propriétés du déterminant', r:'Opérations sur les lignes', qs:[
   {q:'Deux matrices 3 × 3 vérifient det A = 3 et det B = −2. Que vaut det(AB)&nbsp;?', lab:'det(AB) =', ans:-6, tol:.001, why:'det(AB) = det A · det B = 3 · (−2) = −6.'},
   {q:'Une matrice 3 × 3 vérifie det A = 7. Que vaut det(−A)&nbsp;?', lab:'det(−A) =', ans:-7, tol:.001, why:'Les trois lignes sont multipliées par −1 : det(−A) = (−1)³ · 7 = −7.'},
   {q:'Une matrice 3 × 3 vérifie det A = −3. Que vaut det(ᵗA · A)&nbsp;?', lab:'det =', ans:9, tol:.001, why:'det(ᵗA) = det A, donc det(ᵗA · A) = (−3) · (−3) = 9.'},
   {q:'On obtient B à partir de A en échangeant deux lignes, puis en multipliant une ligne par 3. Si det A = 4, que vaut det B&nbsp;?', lab:'det B =', ans:-12, tol:.001, why:'L’échange change le signe (−4), la multiplication d’une ligne par 3 multiplie par 3 : det B = −12.'},
   {q:'Une matrice inversible vérifie det A = 4. Que vaut det(A⁻¹)&nbsp;?', lab:'det(A⁻¹) =', ans:.25, tol:.001, show:'1/4', why:'det(A) · det(A⁻¹) = det(AA⁻¹) = det I = 1, donc det(A⁻¹) = 1/4.'},
 ]},
 {n:'Inverse par la comatrice', r:'Inverser une matrice 3 × 3 par la comatrice', qs:[
   {q:`Soit A = ${M([[1,0,1],[0,2,0],[1,0,2]])}, de déterminant 2. Quel est le coefficient ligne 1, colonne 3 de A⁻¹&nbsp;?`, lab:'(A⁻¹)₁₃ =', ans:-1, tol:.001, why:'(A⁻¹)₁₃ = C₃₁/det A. C₃₁ = (+1) · det(0 1 ; 2 0) = −2, donc (A⁻¹)₁₃ = −2/2 = −1.'},
   {q:`Soit A = ${M([[2,0,0],[1,1,0],[0,3,1]])}, de déterminant 2. Quel est le coefficient ligne 2, colonne 1 de A⁻¹&nbsp;?`, lab:'(A⁻¹)₂₁ =', ans:-.5, tol:.001, show:'−1/2', why:'Attention à la transposée : (A⁻¹)₂₁ = C₁₂/det A. C₁₂ = (−1) · det(1 0 ; 0 1) = −1, donc −1/2.'},
   {q:'Le coefficient ligne <i>i</i>, colonne <i>j</i> de A⁻¹ vaut…', opts:['Cᵢⱼ / det A','Cⱼᵢ / det A','Cᵢⱼ · det A','1 / aᵢⱼ'], ans:1, why:'A⁻¹ = (1/det A) ᵗcom(A) : la transposée échange les indices, donc (A⁻¹)ᵢⱼ = Cⱼᵢ / det A.'},
   {q:`La matrice ${M([[1,2,3],[2,4,6],[1,0,1]])} est-elle inversible&nbsp;?`, opts:['Oui, car aucune ligne n’est nulle','Non, car son déterminant est nul','Oui, car son déterminant vaut 2','On ne peut pas savoir sans la comatrice'], ans:1, why:'L₂ = 2L₁, donc L₂ − 2L₁ donne une ligne nulle : det = 0. Une matrice est inversible si et seulement si son déterminant est non nul.'},
   {q:`Quelle est l’inverse de ${M([[1,2,0],[0,1,3],[0,0,1]])}&nbsp;?`, opts:[M([[1,-2,0],[0,1,-3],[0,0,1]]),M([[1,-2,6],[0,1,-3],[0,0,1]]),M([[1,0,0],[-2,1,0],[6,-3,1]]),M([[1,2,-6],[0,1,3],[0,0,1]])], ans:1, why:'det = 1. Cofacteurs utiles : C₂₁ = −2, C₃₁ = det(2 0 ; 1 3) = 6, C₃₂ = −3. Avec la transposée : A⁻¹ = (1 −2 6 ; 0 1 −3 ; 0 0 1). Contrôle : ligne 1 de A fois colonne 3 : 6 − 6 = 0.'},
 ]},
];
})();
