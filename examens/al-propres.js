/* Déclic — examen de compétence : Valeurs et vecteurs propres */
(()=>{
const M=A=>mat(A.map(r=>r.map(x=>fmt(x))));
EXAMS['al-propres']=[
 {n:'Vecteur propre et valeur propre', r:'Une direction qui résiste', qs:[
   {q:`Soit <i>A</i> = ${M([[4,-2],[1,1]])} et <b>v</b> = (2 ; 1). <b>v</b> est un vecteur propre de <i>A</i>. Pour quelle valeur propre&nbsp;?`, lab:'λ =', ans:3, why:'Av = (8 − 2 ; 2 + 1) = (6 ; 3) = 3·(2 ; 1). Donc λ = 3.'},
   {q:`Soit <i>A</i> = ${mat([[2,3],[3,2]])} et <b>v</b> = (1 ; −1). <b>v</b> est un vecteur propre de <i>A</i>. Pour quelle valeur propre&nbsp;?`, lab:'λ =', ans:-1, why:'Av = (2 − 3 ; 3 − 2) = (−1 ; 1) = −1·(1 ; −1). Donc λ = −1 : A retourne cette direction sans la tourner.'},
   {q:`Soit <i>A</i> = ${mat([[1,2],[2,4]])} et <b>v</b> = (2 ; −1). <b>v</b> est un vecteur propre de <i>A</i>. Pour quelle valeur propre&nbsp;?`, lab:'λ =', ans:0, why:'Av = (2 − 2 ; 4 − 4) = (0 ; 0) = 0·v. Donc λ = 0 : la valeur propre peut être nulle, c’est le vecteur qui doit être non nul.'},
   {q:`Lequel de ces vecteurs est un vecteur propre de ${mat([[1,4],[2,3]])}&nbsp;?`, opts:['(1 ; 2)','(2 ; −1)','(4 ; 3)','(1 ; 0)'], ans:1, why:'A(2 ; −1) = (2 − 4 ; 4 − 3) = (−2 ; 1) = −1·(2 ; −1). Pour les autres, Av n’est pas aligné avec v : A(1 ; 2) = (9 ; 8), A(4 ; 3) = (16 ; 17), A(1 ; 0) = (1 ; 2).'},
 ]},
 {n:'Calculer les valeurs propres', r:'Calculer les valeurs propres d’une matrice 2 × 2', qs:[
   {q:`Quelle est la plus grande valeur propre de ${M([[6,-2],[2,1]])}&nbsp;?`, lab:'λ =', ans:5, why:'tr = 7 et det = 6 + 4 = 10. λ² − 7λ + 10 = (λ − 2)(λ − 5) : les valeurs propres sont 2 et 5.'},
   {q:`Quelle est la plus petite valeur propre de ${mat([[1,3],[4,2]])}&nbsp;?`, lab:'λ =', ans:-2, why:'tr = 3 et det = 2 − 12 = −10. λ² − 3λ − 10 = (λ − 5)(λ + 2) : les valeurs propres sont 5 et −2. Contrôle : 5 − 2 = 3 et 5·(−2) = −10.'},
   {q:`Quelle est la plus grande valeur propre de ${M([[0,1],[-2,3]])}&nbsp;?`, lab:'λ =', ans:2, why:'tr = 3 et det = 0 − (−2) = 2. λ² − 3λ + 2 = (λ − 1)(λ − 2) : les valeurs propres sont 1 et 2.'},
   {q:`Quel est le polynôme caractéristique de ${mat([[5,1],[4,2]])}&nbsp;?`, opts:['λ² + 7λ + 6','λ² − 6λ + 7','λ² − 7λ + 14','λ² − 7λ + 6'], ans:3, why:'λ² − (tr A)λ + det A, avec tr A = 7 et det A = 10 − 4 = 6. Ses racines sont 1 et 6.'},
   {q:'Une matrice 2×2 a pour trace 8, et 3 est l’une de ses valeurs propres. Quelle est l’autre&nbsp;?', lab:'λ =', ans:5, why:'La somme des valeurs propres vaut la trace : 3 + λ = 8, donc λ = 5. Le déterminant vaut alors 3·5 = 15.'},
 ]},
 {n:'Trace, déterminant et discriminant', r:'Trace, déterminant et racines', qs:[
   {q:`Combien de valeurs propres réelles a ${M([[2,-1],[1,2]])}&nbsp;?`, opts:['Deux distinctes','Une double','Aucune','Une infinité'], ans:2, why:'tr = 4 et det = 4 + 1 = 5 : Δ = 16 − 20 = −4 < 0. Pas de valeur propre réelle (dans ℂ : 2 ± i).'},
   {q:`La matrice ${M([[3,1],[-1,1]])} a une valeur propre double. Laquelle&nbsp;?`, lab:'λ =', ans:2, why:'tr = 4 et det = 3 + 1 = 4 : Δ = 16 − 16 = 0. La valeur propre double est tr/2 = 2.'},
   {q:`Quel est le produit des valeurs propres de ${M([[7,2],[3,-1]])}&nbsp;?`, lab:'produit =', ans:-13, why:'Le produit des valeurs propres vaut det A = 7·(−1) − 2·3 = −13. Pas besoin de les calculer.'},
   {q:'Une matrice 2×2 a pour trace −1 et pour déterminant −6. Quelle est sa plus grande valeur propre&nbsp;?', lab:'λ =', ans:2, why:'λ² + λ − 6 = (λ + 3)(λ − 2) : les valeurs propres sont −3 et 2. Contrôle : somme −1, produit −6.'},
 ]},
 {n:'Trouver un vecteur propre', r:'Trouver un vecteur propre', qs:[
   {q:`Pour <i>A</i> = ${M([[6,-2],[2,1]])} et λ = 2, on cherche un vecteur propre de la forme (1 ; <i>k</i>). Combien vaut <i>k</i>&nbsp;?`, lab:'k =', ans:2, why:'A − 2I = (4 −2 ; 2 −1) donne 2x − y = 0, donc (1 ; 2). Contrôle : A(1 ; 2) = (2 ; 4) = 2·(1 ; 2).'},
   {q:`Pour <i>A</i> = ${M([[6,-2],[2,1]])} et λ = 5, on cherche un vecteur propre de la forme (1 ; <i>k</i>). Combien vaut <i>k</i>&nbsp;?`, lab:'k =', ans:.5, tol:.001, why:'A − 5I = (1 −2 ; 2 −4) donne x = 2y, donc (2 ; 1), ou (1 ; 0,5). Contrôle : A(1 ; 0,5) = (5 ; 2,5) = 5·(1 ; 0,5).'},
   {q:`Pour <i>A</i> = ${mat([[1,3],[4,2]])} et λ = 5, quel vecteur engendre <i>E</i><sub>5</sub>&nbsp;?`, opts:['(4 ; 3)','(3 ; 4)','(1 ; 1)','(3 ; −4)'], ans:1, why:'A − 5I = (−4 3 ; 4 −3) donne −4x + 3y = 0, vérifiée par (3 ; 4). Contrôle : A(3 ; 4) = (15 ; 20) = 5·(3 ; 4).'},
   {q:`Pour <i>A</i> = ${mat([[1,3],[4,2]])} et λ = −2, on cherche un vecteur propre de la forme (1 ; <i>k</i>). Combien vaut <i>k</i>&nbsp;?`, lab:'k =', ans:-1, why:'A + 2I = (3 3 ; 4 4) donne x + y = 0, donc (1 ; −1). Contrôle : A(1 ; −1) = (−2 ; 2) = −2·(1 ; −1).'},
   {q:'Que vaut l’espace propre <i>E</i><sub>3</sub> de la matrice 3<i>I</i>&nbsp;?', opts:['{<b>0</b>}','La droite <i>y</i> = <i>x</i>','ℝ² tout entier','L’axe des abscisses'], ans:2, why:'3I − 3I est la matrice nulle, dont le noyau est ℝ² : tout vecteur non nul est propre pour 3.'},
   {q:'Pour une valeur λ, tu écris <i>A</i> − λ<i>I</i> et tu trouves deux lignes <b>non proportionnelles</b>. Que faut-il en conclure&nbsp;?', opts:['λ n’est pas valeur propre : il y a une erreur sur λ','<i>E</i><sub>λ</sub> = ℝ²','On prend une colonne comme vecteur propre','λ est valeur propre double'], ans:0, why:'Lignes non proportionnelles ⇔ det(A − λI) ≠ 0 ⇔ seul 0 est solution. λ n’est donc pas valeur propre : il faut revoir le calcul de λ.'},
 ]},
 {n:'Matrices triangulaires', r:'Valeurs propres d’une matrice triangulaire', qs:[
   {q:`Quelles sont les valeurs propres de ${M([[4,0],[9,-2]])}&nbsp;?`, opts:['4 et 9','−2 et 9','4 et −2','0 et 4'], ans:2, why:'La matrice est triangulaire : det(A − λI) = (4 − λ)(−2 − λ). Les valeurs propres sont sur la diagonale. Contrôle : somme 2 = trace, produit −8 = det.'},
   {q:`Pour <i>A</i> = ${mat([[5,6],[0,2]])} et λ = 2, on cherche un vecteur propre de la forme (1 ; <i>k</i>). Combien vaut <i>k</i>&nbsp;?`, lab:'k =', ans:-.5, tol:.001, why:'A − 2I = (3 6 ; 0 0) donne x + 2y = 0, donc (−2 ; 1), ou (1 ; −0,5). Contrôle : A(1 ; −0,5) = (5 − 3 ; −1) = 2·(1 ; −0,5).'},
   {q:`Pour <i>A</i> = ${M([[-1,0],[4,3]])}, lequel est un vecteur propre pour λ = 3&nbsp;?`, opts:['(1 ; 0)','(0 ; 1)','(1 ; 4)','(1 ; −1)'], ans:1, why:'A − 3I = (−4 0 ; 4 0) donne x = 0 : (0 ; 1). Contrôle : A(0 ; 1) = (0 ; 3). (1 ; −1) est propre pour −1.'},
   {q:`La matrice ${mat([[2,8],[0,2]])} a la valeur propre double 2. Que vaut <i>E</i><sub>2</sub>&nbsp;?`, opts:['ℝ² tout entier','La droite Vect((1 ; 0))','La droite Vect((0 ; 1))','{<b>0</b>}'], ans:1, why:'A − 2I = (0 8 ; 0 0) donne 8y = 0, soit y = 0 : E₂ est l’axe Vect((1 ; 0)). Ce n’est pas ℝ², car A ≠ 2I.'},
 ]},
 {n:'Calculer Aⁿx avec les vecteurs propres', r:'Appliquer Aⁿ grâce aux vecteurs propres', qs:[
   {q:'Une matrice <i>A</i> vérifie <i>A</i>(1 ; 1) = 2·(1 ; 1) et <i>A</i>(1 ; −1) = −(1 ; −1). Avec <b>x</b> = (3 ; 1), quelle est la première coordonnée de <i>A</i>³<b>x</b>&nbsp;?', lab:'1re coordonnée =', ans:15, why:'x = 2(1 ; 1) + (1 ; −1). Donc A³x = 2·2³(1 ; 1) + (−1)³(1 ; −1) = (16 ; 16) − (1 ; −1) = (15 ; 17).'},
   {q:'<b>v</b> = (2 ; 1) est un vecteur propre de <i>A</i> pour λ = 3. Quelle est la première coordonnée de <i>A</i>⁴<b>v</b>&nbsp;?', lab:'1re coordonnée =', ans:162, why:'Aⁿv = λⁿv, donc A⁴v = 3⁴v = 81·(2 ; 1) = (162 ; 81).'},
   {q:`<i>A</i> = ${M([[6,-2],[2,1]])} a pour vecteurs propres (1 ; 2), pour λ = 2, et (2 ; 1), pour λ = 5. Avec <b>x</b> = (3 ; 3), quelle est la deuxième coordonnée de <i>A</i>²<b>x</b>&nbsp;?`, lab:'2e coordonnée =', ans:33, why:'x = (1 ; 2) + (2 ; 1). Donc A²x = 4(1 ; 2) + 25(2 ; 1) = (54 ; 33). Contrôle : Ax = (12 ; 9), puis A(12 ; 9) = (54 ; 33).'},
   {q:'<i>A</i> a un vecteur propre <b>v₁</b> pour λ = 1 et un vecteur propre <b>v₂</b> pour λ = 0,5. Avec <b>x</b> = <b>v₁</b> + 3<b>v₂</b>, vers quoi tend <i>A</i>ⁿ<b>x</b> quand <i>n</i> devient grand&nbsp;?', opts:['<b>0</b>','<b>v₁</b>','3<b>v₂</b>','<b>v₁</b> + 3<b>v₂</b>'], ans:1, why:'Aⁿx = 1ⁿv₁ + 3·0,5ⁿv₂. Comme 0,5ⁿ → 0, la composante sur v₂ disparaît et Aⁿx → v₁.'},
   {q:'Une matrice <i>A</i> vérifie <i>A</i>(1 ; 1) = 3·(1 ; 1) et <i>A</i>(1 ; −1) = −2·(1 ; −1). Avec <b>x</b> = (2 ; 0), quelle est la deuxième coordonnée de <i>A</i>⁵<b>x</b>&nbsp;?', lab:'2e coordonnée =', ans:275, why:'x = (1 ; 1) + (1 ; −1). A⁵x = 3⁵(1 ; 1) + (−2)⁵(1 ; −1) = (243 ; 243) + (−32 ; 32) = (211 ; 275).'},
 ]},
];
})();
