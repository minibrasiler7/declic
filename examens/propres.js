/* Déclic — examen de compétence : Valeurs propres */
(()=>{
EXAMS['propres']=[
 {n:'Vérifier qu’un vecteur est propre', r:'Vérifier qu’un vecteur est propre', qs:[
   {q:`Avec A = ${mat([[4,1],[2,3]])}, le vecteur v = (1 ; 1) est propre. Quelle est sa valeur propre ?`, lab:'λ =', ans:5, why:'Av = (4 + 1 ; 2 + 3) = (5 ; 5) = 5·(1 ; 1), donc λ = 5.'},
   {q:`Avec A = ${mat([[1,2],[3,2]])}, le vecteur v = (2 ; 3) est propre. Quelle est sa valeur propre ?`, lab:'λ =', ans:4, why:'Av = (1·2 + 2·3 ; 3·2 + 2·3) = (8 ; 12) = 4·(2 ; 3), donc λ = 4.'},
   {q:`Avec A = ${mat([[2,0],[0,'−3']])}, quelle est la valeur propre du vecteur (0 ; 1) ?`, lab:'λ =', ans:-3, why:'A(0 ; 1) = (0 ; −3) = −3·(0 ; 1). Une valeur propre peut être négative : le vecteur garde sa droite mais change de sens.'},
   {q:`Avec A = ${mat([[6,'−2'],[2,1]])}, quelle est la valeur propre du vecteur (1 ; 2) ?`, lab:'λ =', ans:2, why:'A(1 ; 2) = (6 − 4 ; 2 + 2) = (2 ; 4) = 2·(1 ; 2), donc λ = 2.'},
   {q:`Avec A = ${mat([[1,4],[2,3]])}, quelle est la valeur propre du vecteur (2 ; −1) ?`, lab:'λ =', ans:-1, why:'A(2 ; −1) = (2 − 4 ; 4 − 3) = (−2 ; 1) = −1·(2 ; −1), donc λ = −1.'},
   {q:`Avec A = ${mat([[5,'−2'],[1,2]])}, le vecteur (1 ; 2) est-il propre ?`, opts:['Oui, avec λ = 1','Oui, avec λ = 5','Non : A(1 ; 2) = (1 ; 5) n’est pas un multiple de (1 ; 2)','Oui, avec λ = 2,5'], ans:2, why:'A(1 ; 2) = (5 − 4 ; 1 + 4) = (1 ; 5). Il faudrait 1 = λ et 5 = 2λ en même temps : impossible. Le vecteur change de direction.'},
   {q:'v est un vecteur propre de A pour la valeur propre 3. Que dire du vecteur 5v ?', opts:['Il est propre, de valeur propre 15','Il est propre, de valeur propre 3','Il est propre, de valeur propre 5','Il n’est pas propre'], ans:1, why:'A(5v) = 5·Av = 5·3v = 3·(5v). Tout multiple non nul d’un vecteur propre est propre, avec la même valeur propre.'},
 ]},
 {n:'Le polynôme caractéristique', r:'Le polynôme caractéristique', qs:[
   {q:`Quelle est la plus grande valeur propre de A = ${mat([[3,2],[1,4]])} ?`, lab:'λ =', ans:5, why:'tr A = 7 et det A = 12 − 2 = 10. λ² − 7λ + 10 = (λ − 2)(λ − 5) : les valeurs propres sont 2 et 5.'},
   {q:`Quelle est la plus petite valeur propre de A = ${mat([[1,2],[4,3]])} ?`, lab:'λ =', ans:-1, why:'tr A = 4 et det A = 3 − 8 = −5. λ² − 4λ − 5 = (λ − 5)(λ + 1) : les valeurs propres sont 5 et −1.'},
   {q:`Quelle est la plus petite valeur propre de A = ${mat([[6,'−1'],[2,3]])} ?`, lab:'λ =', ans:4, why:'tr A = 9 et det A = 18 + 2 = 20. λ² − 9λ + 20 = (λ − 4)(λ − 5) : les valeurs propres sont 4 et 5.'},
   {q:`Combien vaut le produit des valeurs propres de ${mat([[7,'−3'],[2,'−1']])} ?`, ans:-1, why:'Le produit des valeurs propres égale le déterminant : 7·(−1) − (−3)·2 = −7 + 6 = −1.'},
   {q:'Une matrice 2 × 2 a pour valeurs propres 2 et 7. Combien vaut son déterminant ?', lab:'det =', ans:14, why:'Le déterminant est le produit des valeurs propres : 2 · 7 = 14. (Sa trace vaut 2 + 7 = 9.)'},
   {q:`Quel est le polynôme caractéristique de ${mat([[2,5],[1,'−2']])} ?`, opts:['λ² − 4λ − 9','λ² + 9','λ² − 9','λ² + 4λ + 1'], ans:2, why:'tr = 2 + (−2) = 0 et det = −4 − 5 = −9 : λ² − 0·λ − 9 = λ² − 9. Les valeurs propres sont 3 et −3.'},
   {q:`Quelles sont les valeurs propres de ${mat([[4,7],[0,'−2']])} ?`, opts:['4 et 7','4 et −2','7 et −2','2 et −4'], ans:1, why:'tr = 2 et det = −8 : λ² − 2λ − 8 = (λ − 4)(λ + 2). Ce sont 4 et −2, les coefficients diagonaux.'},
   {q:`Quelles sont les valeurs propres réelles de la rotation ${mat([[0,'−1'],[1,0]])} ?`, opts:['1 et −1','0, deux fois','Aucune : λ² + 1 = 0 n’a pas de solution réelle','1 seulement'], ans:2, why:'tr = 0 et det = 0 − (−1) = 1 : λ² + 1 = 0, sans racine réelle. Logique : une rotation d’un quart de tour fait tourner toutes les directions.'},
 ]},
 {n:'Vecteurs propres et diagonalisation', r:'Trouver les vecteurs propres et diagonaliser', qs:[
   {q:`A = ${mat([[3,2],[1,4]])} a la valeur propre 5. Un vecteur propre associé s’écrit (1 ; y). Combien vaut y ?`, lab:'y =', ans:1, why:`A − 5I = ${mat([['−2',2],[1,'−1']])} : −2x + 2y = 0, donc y = x = 1. Contrôle : A(1 ; 1) = (5 ; 5).`},
   {q:`A = ${mat([[3,2],[1,4]])} a la valeur propre 2. Un vecteur propre associé s’écrit (2 ; y). Combien vaut y ?`, lab:'y =', ans:-1, why:`A − 2I = ${mat([[1,2],[1,2]])} : x + 2y = 0, donc y = −1 pour x = 2. Contrôle : A(2 ; −1) = (4 ; −2) = 2·(2 ; −1).`},
   {q:`A = ${mat([[4,'−2'],[1,1]])} a la valeur propre 3. Un vecteur propre associé s’écrit (x ; 1). Combien vaut x ?`, lab:'x =', ans:2, why:`A − 3I = ${mat([[1,'−2'],[1,'−2']])} : x − 2y = 0, donc x = 2. Contrôle : A(2 ; 1) = (6 ; 3) = 3·(2 ; 1).`},
   {q:`A = ${mat([[6,'−1'],[2,3]])} a la valeur propre 4. Un vecteur propre associé s’écrit (1 ; y). Combien vaut y ?`, lab:'y =', ans:2, why:`A − 4I = ${mat([[2,'−1'],[2,'−1']])} : 2x − y = 0, donc y = 2. Contrôle : A(1 ; 2) = (4 ; 8) = 4·(1 ; 2).`},
   {q:`A = ${mat([[4,'−2'],[1,1]])} a pour vecteurs propres (2 ; 1) pour λ = 3 et (1 ; 1) pour λ = 2. On pose P = ${mat([[2,1],[1,1]])}. Quelle matrice D donne A = PDP⁻¹ ?`, opts:[`${mat([[2,0],[0,3]])}`,`${mat([[3,0],[0,2]])}`,`${mat([[1,0],[0,1]])}`,`${mat([[3,2],[0,0]])}`], ans:1, why:'D porte les valeurs propres dans le même ordre que les colonnes de P : 1re colonne (2 ; 1) pour 3, 2e colonne (1 ; 1) pour 2. Donc D = diag(3, 2).'},
   {q:'On a trouvé v₁ = (1 ; 3) pour λ₁ = 2 et v₂ = (1 ; −1) pour λ₂ = 5. Avec D = diag(2, 5), quelle matrice P donne A = PDP⁻¹ ?', opts:[`${mat([[1,3],[1,'−1']])}`,`${mat([[2,0],[0,5]])}`,`${mat([[1,1],[3,'−1']])}`,`${mat([[1,1],['−1',3]])}`], ans:2, why:'Les vecteurs propres se placent en <b>colonnes</b>, dans l’ordre des valeurs propres de D : 1re colonne (1 ; 3), 2e colonne (1 ; −1). Les mettre en lignes est l’erreur classique.'},
   {q:'A = PDP⁻¹ avec D = diag(3, −1). Combien vaut la trace de A ?', lab:'tr A =', ans:2, why:'Les valeurs propres de A sont celles de D : 3 et −1. La trace est leur somme : 3 + (−1) = 2.'},
 ]},
 {n:'Puissances et équilibre', r:'Puissances et état d’équilibre', qs:[
   {q:`A = ${mat([[2,1],[0,3]])} a les vecteurs propres (1 ; 0) pour λ = 2 et (1 ; 1) pour λ = 3. Calcule la 1re composante de A²·(2 ; 1).`, ans:13, why:'(2 ; 1) = (1 ; 0) + (1 ; 1). Donc A²(2 ; 1) = 2²·(1 ; 0) + 3²·(1 ; 1) = (4 + 9 ; 9) = (13 ; 9).'},
   {q:'A a les vecteurs propres (1 ; 1) pour λ = 2 et (1 ; −1) pour λ = −1. Calcule la 2e composante de A⁵·(3 ; 1).', ans:65, why:'(3 ; 1) = 2·(1 ; 1) + 1·(1 ; −1). A⁵(3 ; 1) = 2·2⁵·(1 ; 1) + (−1)⁵·(1 ; −1) = (64 − 1 ; 64 + 1) = (63 ; 65).'},
   {q:`M = ${mat([['0,6','0,4'],['0,4','0,6']])} a 1 comme valeur propre. Quelle est l’autre ?`, lab:'λ =', ans:0.2, tol:0.001, why:'La somme des valeurs propres est la trace : 0,6 + 0,6 = 1,2. L’autre vaut 1,2 − 1 = 0,2.'},
   {q:`Pour M = ${mat([['0,9','0,4'],['0,1','0,6']])}, quelle est la 1re composante du vecteur d’équilibre (composantes de somme 1) ?`, ans:0.8, tol:0.005, why:'(M − I)v = 0 donne −0,1c + 0,4r = 0, donc c = 4r. Avec c + r = 1 : r = 0,2 et c = 0,8.'},
   {q:`Pour M = ${mat([['0,5','0,2'],['0,5','0,8']])}, quelle est la 1re composante du vecteur d’équilibre (composantes de somme 1) ? (fraction ou décimale)`, ans:2/7, tol:0.005, show:'2/7', why:'−0,5c + 0,2r = 0 donne c = 0,4r. Avec c + r = 1 : 1,4r = 1, r = 5/7 et c = 2/7 ≈ 0,286.'},
   {q:`M = ${mat([['0,8','0,4'],['0,2','0,6']])} a pour équilibre (2/3 ; 1/3), et (1 ; −1) est propre pour λ = 0,4. Que vaut la 1re composante de M²·(1 ; 0) ?`, ans:0.72, tol:0.001, why:'(1 ; 0) = (2/3 ; 1/3) + (1/3)·(1 ; −1). Donc M²(1 ; 0) a pour 1re composante 2/3 + (1/3)·0,4² = 2/3 + 0,16/3 = 0,72.'},
   {q:'A a les vecteurs propres v₁ = (1 ; 1) pour λ = 1 et v₂ = (1 ; −1) pour λ = 0,5. Vers quoi tend la 1re composante de Aⁿ·(7 ; −1) quand n → ∞ ?', ans:3, why:'(7 ; −1) = 3·(1 ; 1) + 4·(1 ; −1). Aⁿ(7 ; −1) = 3·(1 ; 1) + 4·0,5ⁿ·(1 ; −1) → (3 ; 3), car 0,5ⁿ → 0.'},
   {q:'v = v₁ + v₂, où v₁ est propre pour λ₁ = 1 et v₂ pour λ₂ = −0,5. Que devient Aⁿv quand n → ∞ ?', opts:['Il tend vers v₁','Il oscille sans converger, car λ₂ est négatif','Il tend vers 0','Il tend vers v₁ + v₂'], ans:0, why:'Aⁿv = v₁ + (−0,5)ⁿv₂. Le signe alterne, mais |−0,5| < 1, donc (−0,5)ⁿ → 0 et Aⁿv → v₁.'},
 ]},
];
})();
