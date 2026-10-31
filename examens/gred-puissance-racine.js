/* Déclic — examen de compétence : Fonctions puissance et racine n-ième */
(()=>{
const x='<i>x</i>';
EXAMS['gred-puissance-racine']=[
 {n:'Les fonctions puissance', r:'Monotonie et limites de xⁿ', qs:[
   {q:'Quel est le signe de (−2)⁷ ?', opts:['Positif','Négatif','Nul','Cela dépend'], ans:1, why:'L’exposant 7 est impair : (−2)⁷ = −2⁷ = −128, du signe de la base.'},
   {q:'Calcule 1,5³.', lab:'1,5³ =', ans:3.375, tol:1e-6, why:'1,5² = 2,25 et 2,25 · 1,5 = 3,375.'},
   {q:'Compare 0,3⁴ et 0,3³.', opts:['0,3⁴ &gt; 0,3³','0,3⁴ = 0,3³','0,3⁴ &lt; 0,3³','Impossible à comparer sans calculer'], ans:2, why:'Pour 0 &lt; x &lt; 1, xⁿ⁺¹ = xⁿ · x &lt; xⁿ. Ici 0,0081 &lt; 0,027.'},
   {q:'Quelle est la limite de <i>x</i>⁷ quand <i>x</i> → −∞ ?', opts:['+∞','−∞','0','Elle n’existe pas'], ans:1, why:'Exposant impair : x⁷ est négatif pour x &lt; 0 et |x|⁷ → +∞. Donc x⁷ → −∞.'},
   {q:'Laquelle de ces fonctions est paire ?', opts:['x ↦ x⁵','x ↦ x³ + x','x ↦ x⁶','x ↦ x⁴ + x'], ans:2, why:'(−x)⁶ = x⁶ : exposant pair. x⁵ et x³ + x sont impaires ; x⁴ + x n’est ni paire ni impaire.'},
 ]},
 {n:'Racine n-ième : définition', r:'Existence et unicité de la racine n-ième', qs:[
   {q:'Calcule ⁵√243.', lab:'⁵√243 =', ans:3, why:'3⁵ = 243 et 3 ≥ 0 : ⁵√243 = 3.'},
   {q:'Calcule ∛0,008.', lab:'∛0,008 =', ans:.2, tol:1e-6, why:'0,2³ = 0,008, donc ∛0,008 = 0,2.'},
   {q:'Quel est le réel <i>x</i> ≥ 0 tel que <i>x</i>⁴ = 625 ?', lab:'x =', ans:5, why:'5⁴ = 625. Par stricte croissance de x⁴ sur [0 ; +∞[, c’est la seule solution positive.'},
   {q:'Calcule ⁵√(1/32) (décimal ou fraction).', lab:'⁵√(1/32) =', ans:.5, tol:1e-6, show:'1/2', why:'(1/2)⁵ = 1/32, donc ⁵√(1/32) = 1/2.'},
   {q:'Que vaut √16 ?', opts:['4 ou −4','4','−4','{4 ; −4}'], ans:1, why:'Par définition, √16 est l’unique réel positif dont le carré vaut 16 : c’est 4. L’équation x² = 16 a deux solutions, mais la racine est un nombre.'},
 ]},
 {n:'Règles de calcul sur les racines', r:'Simplifier une expression avec des racines', qs:[
   {q:'Calcule ∛40 · ∛25.', lab:'=', ans:10, why:'∛40 · ∛25 = ∛(40 · 25) = ∛1000 = 10.'},
   {q:'Calcule ⁴√(81 · 16).', lab:'=', ans:6, why:'⁴√81 · ⁴√16 = 3 · 2 = 6.'},
   {q:'Calcule ∛(2⁹).', lab:'=', ans:8, why:'∛(2⁹) = ∛((2³)³) = 2³ = 8. Ou (∛2)⁹ = ((∛2)³)³ = 2³.'},
   {q:'Calcule √3 · √27.', lab:'=', ans:9, why:'√(3 · 27) = √81 = 9.'},
   {q:'Simplifie ⁶√(7³).', opts:['7','√7','∛7','7²'], ans:1, why:'Règle de simplification de l’indice : ⁶√(7³) = ³ˣ²√(7³) = √7. Contrôle : (√7)⁶ = 7³.'},
   {q:'Quelle est la forme simplifiée de ∛128 ?', opts:['2∛16','4∛2','8∛2','2∛32'], ans:1, why:'128 = 64 · 2 = 4³ · 2, donc ∛128 = ∛(4³) · ∛2 = 4∛2.'},
   {q:'Calcule ⁴√(∛4096), sachant que 4096 = 2¹².', lab:'=', ans:2, why:'Racines emboîtées : ⁴√(∛4096) = ¹²√4096 = ¹²√(2¹²) = 2.'},
 ]},
 {n:'Exposants rationnels', r:'Calculer avec des exposants rationnels', qs:[
   {q:'Calcule 27<sup>2/3</sup>.', lab:'27^(2/3) =', ans:9, why:'(∛27)² = 3² = 9.'},
   {q:'Calcule 16<sup>5/4</sup>.', lab:'16^(5/4) =', ans:32, why:'(⁴√16)⁵ = 2⁵ = 32.'},
   {q:'Calcule 8<sup>−1/3</sup> (décimal ou fraction).', lab:'8^(−1/3) =', ans:.5, tol:1e-6, show:'1/2', why:'8^(−1/3) = 1/8^(1/3) = 1/∛8 = 1/2.'},
   {q:'Calcule 4<sup>3/2</sup> · 4<sup>1/2</sup>.', lab:'=', ans:16, why:'Même base : les exposants s’ajoutent, 3/2 + 1/2 = 2, et 4² = 16.'},
   {q:'Calcule (1/32)<sup>2/5</sup> (décimal ou fraction).', lab:'=', ans:.25, tol:1e-6, show:'1/4', why:'⁵√(1/32) = 1/2, puis (1/2)² = 1/4.'},
   {q:'Calcule 125<sup>−2/3</sup> (décimal ou fraction).', lab:'125^(−2/3) =', ans:.04, tol:1e-6, show:'1/25', why:'∛125 = 5, 5² = 25, et l’exposant négatif inverse : 1/25 = 0,04.'},
   {q:'Pour <i>x</i> &gt; 0, simplifie <i>x</i><sup>1/2</sup> · <i>x</i><sup>1/6</sup>.', opts:['x^(1/12)','x^(1/3)','x^(2/3)','x^(1/8)'], ans:2, why:'1/2 + 1/6 = 3/6 + 1/6 = 4/6 = 2/3. Donc x^(2/3) = ∛(x²).'},
 ]},
 {n:'Pièges : carrés et nombres négatifs', r:'Les pièges : racine d’un carré, nombres négatifs', qs:[
   {q:'Calcule √((−5)²).', lab:'=', ans:5, why:'√(x²) = |x| : √25 = 5, et non −5.'},
   {q:'Calcule ∛(−125).', lab:'=', ans:-5, why:'Exposant impair : (−5)³ = −125, et c’est la seule solution réelle. ∛(−125) = −∛125 = −5.'},
   {q:'Quel est l’ensemble des solutions réelles de <i>x</i>⁴ = 81 ?', opts:['{3}','{−3 ; 3}','{−3 ; 0 ; 3}','Aucune solution'], ans:1, why:'Exposant pair et 81 &gt; 0 : deux solutions, ⁴√81 = 3 et son opposé.'},
   {q:'Résous <i>x</i>³ = −64 dans ℝ.', lab:'x =', ans:-4, why:'x ↦ x³ est une bijection de ℝ sur ℝ : une seule solution, x = ∛(−64) = −4.'},
   {q:'Pour quels réels <i>x</i> a-t-on √(<i>x</i>²) = <i>x</i> ?', opts:['Tous les réels','Seulement x ≥ 0','Seulement x ≤ 0','Aucun'], ans:1, why:'√(x²) = |x|, qui vaut x exactement quand x ≥ 0. Pour x = −3, √9 = 3 ≠ −3.'},
   {q:'Que vaut ⁴√(−16) dans ℝ ?', opts:['−2','2','−2 ou 2','Ce n’est pas défini : un nombre négatif n’a pas de racine quatrième réelle'], ans:3, why:'x⁴ ≥ 0 pour tout réel x : aucun réel n’a pour puissance quatrième −16. Seules les racines d’indice impair acceptent les nombres négatifs.'},
 ]},
];
})();
