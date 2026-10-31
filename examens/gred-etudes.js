/* Déclic — examen de compétence : Étudier une fonction */
(()=>{
const x='<i>x</i>';
EXAMS['gred-etudes']=[
 {n:'Domaine de définition', r:'Le plan d’une étude de fonction', qs:[
   {q:`Quel est le domaine de définition de f(${x}) = ${F('√(2'+x+' − 6)',x+' − 5')} ?`, opts:['[3 ; +∞[',']3 ; 5[ ∪ ]5 ; +∞[','[3 ; 5[ ∪ ]5 ; +∞[','ℝ ∖ {5}'], ans:2, why:'Il faut 2x − 6 ≥ 0, soit x ≥ 3 (3 est permis : √0 = 0), et x ≠ 5.'},
   {q:`Combien de valeurs interdites possède f(${x}) = ${F('1',x+'² − 9')} ?`, lab:'valeurs interdites :', ans:2, why:'x² − 9 = (x − 3)(x + 3) s’annule en 3 et −3.'},
   {q:`Quel est le domaine de f(${x}) = √(${x}² − 4) ?`, opts:['[2 ; +∞[',']−∞ ; −2] ∪ [2 ; +∞[','[−2 ; 2]','ℝ'], ans:1, why:'x² − 4 ≥ 0 ⇔ x² ≥ 4 ⇔ |x| ≥ 2. Les deux branches comptent : ne pas oublier x ≤ −2.'},
   {q:`Quelle est la plus petite valeur du domaine de f(${x}) = ${F('√('+x+' + 1)',x)} ?`, lab:'x min =', ans:-1, why:'x + 1 ≥ 0 et x ≠ 0 : D = [−1 ; 0[ ∪ ]0 ; +∞[, de plus petit élément −1.'},
 ]},
 {n:'Parité', r:'Parité et périodicité : diviser le travail par deux', qs:[
   {q:'Laquelle de ces fonctions est <b>impaire</b> ?', opts:['<i>x</i>² + 1','<i>x</i>³/(<i>x</i>² + 1)','<i>x</i>³ + 1','√(<i>x</i>² + 1)'], ans:1, why:'(−x)³/((−x)² + 1) = −x³/(x² + 1) : impaire. Les autres : paire, ni l’un ni l’autre (f(1) = 2, f(−1) = 0), paire.'},
   {q:'<i>f</i> est impaire et f(2) = −7. Que vaut f(−2) ?', lab:'f(−2) =', ans:7, why:'f(−x) = −f(x), donc f(−2) = −f(2) = 7.'},
   {q:`Pourquoi f(${x}) = ${x}² + 2${x} n’est-elle ni paire ni impaire ?`, opts:['Parce qu’elle contient <i>x</i>²','Parce que f(1) = 3 et f(−1) = −1 : ni égaux, ni opposés','Parce que son domaine n’est pas symétrique','Elle est paire, car <i>x</i>² est pair'], ans:1, why:'Une seule valeur suffit : f(−1) = −1 n’est ni f(1) = 3 ni −f(1) = −3. Le domaine ℝ est symétrique, ce n’est pas le problème.'},
 ]},
 {n:'Asymptotes', r:'Trouver une asymptote oblique par division', qs:[
   {q:`Quelle est l’asymptote oblique de f(${x}) = ${F(x+'² + 2'+x+' + 3',x+' + 1')} ?`, opts:['<i>y</i> = <i>x</i> + 1','<i>y</i> = <i>x</i> + 2','<i>y</i> = <i>x</i> + 3','<i>y</i> = <i>x</i>'], ans:0, why:'x² + 2x + 3 = (x + 1)² + 2, donc f(x) = x + 1 + 2/(x + 1) et 2/(x + 1) → 0.'},
   {q:`f(${x}) = ${F('3'+x+'² − '+x+' + 2',x+' − 1')} a une asymptote oblique <i>y</i> = <i>mx</i> + <i>p</i>. Que vaut <i>m</i> + <i>p</i> ?`, lab:'m + p =', ans:5, why:'Division : 3x² − x + 2 = (x − 1)(3x + 2) + 4. Asymptote y = 3x + 2, donc m + p = 5.'},
   {q:`f(${x}) = ${F(x+'² − 1',x+' + 2')} = ${x} − 2 + ${F('3',x+' + 2')}. Où la courbe est-elle au-dessus de son asymptote oblique ?`, opts:['Pour <i>x</i> &gt; −2','Pour <i>x</i> &lt; −2','Partout','Nulle part'], ans:0, why:'f(x) − (x − 2) = 3/(x + 2) est positif exactement quand x + 2 > 0.'},
   {q:`Quelles sont les asymptotes de f(${x}) = ${F('2'+x+' + 1',x+' − 3')} ?`, opts:['<i>x</i> = 3 et <i>y</i> = 2','<i>x</i> = −3 et <i>y</i> = 2<i>x</i>','<i>x</i> = 3 et <i>y</i> = 2<i>x</i> + 1','<i>y</i> = 3 et <i>x</i> = 2'], ans:0, why:'Le dénominateur s’annule en 3 (f → ±∞) : verticale x = 3. Degrés égaux : f → 2/1 = 2 en ±∞, horizontale y = 2.'},
   {q:`Que vaut la limite de f(${x}) = ${F(x+' + 2',x+' − 1')} quand ${x} → 1⁺ ?`, opts:['+∞','−∞','1','3'], ans:0, why:'Le numérateur tend vers 3 > 0 et le dénominateur vers 0⁺ (x > 1) : quotient → +∞.'},
 ]},
 {n:'Tableau de variations', r:'Dresser le tableau de variations', qs:[
   {q:`f(${x}) = ${x}³ − 3${x}² − 9${x} + 1. Quelle est la valeur de son maximum local ?`, lab:'max local =', ans:6, why:'f′(x) = 3x² − 6x − 9 = 3(x − 3)(x + 1). En −1, f′ passe de + à − : f(−1) = −1 − 3 + 9 + 1 = 6.'},
   {q:`f(${x}) = ${x}⁴ − 8${x}². Quelle est la plus petite valeur prise par <i>f</i> sur ℝ ?`, lab:'min =', ans:-16, why:'f′(x) = 4x³ − 16x = 4x(x − 2)(x + 2). Minima en ±2 : f(2) = 16 − 32 = −16 ; en 0, maximum local 0.'},
   {q:`<i>f</i> vérifie f′(${x}) = (${x} − 1)²(${x} + 2). Où <i>f</i> a-t-elle un extremum local ?`, opts:['En 1 et en −2','En −2 seulement : en 1, f′ s’annule sans changer de signe','En 1 seulement','Nulle part'], ans:1, why:'(x − 1)² ≥ 0 ne change pas le signe ; seul x + 2 change de signe, en −2 (minimum local). En 1, tangente horizontale sans extremum.'},
   {q:`Sur ]0 ; +∞[, f(${x}) = ${x} + ${F('1',x)}. Quelle est la valeur de son minimum ?`, lab:'min =', ans:2, why:'f′(x) = 1 − 1/x² = (x − 1)(x + 1)/x² s’annule en 1 (− puis +) : f(1) = 2.'},
   {q:`f(${x}) = 2${x}³ − 15${x}² + 36${x}. Quelle est la somme des abscisses de ses extrema locaux ?`, lab:'somme =', ans:5, why:'f′(x) = 6x² − 30x + 36 = 6(x − 2)(x − 3), qui change de signe en 2 et 3 : somme 5.'},
 ]},
 {n:'Étude d’un polynôme du troisième degré', r:'Étude complète d’un polynôme du troisième degré', qs:[
   {q:`f(${x}) = ${x}³ − 6${x}² + 9${x} + 1. Combien de solutions réelles a l’équation f(${x}) = 0 ?`, lab:'solutions :', ans:1, why:'f′ = 3(x − 1)(x − 3) : maximum local f(1) = 5, minimum local f(3) = 1 > 0. La courbe ne coupe l’axe qu’une fois, à gauche de 1 (f → −∞ en −∞).'},
   {q:`Quelle est l’équation de la tangente à la courbe de f(${x}) = ${x}³ − 4${x} au point d’abscisse 0 ?`, opts:['<i>y</i> = 0','<i>y</i> = −4<i>x</i>','<i>y</i> = 4<i>x</i>','<i>y</i> = 3<i>x</i>² − 4'], ans:1, why:'f(0) = 0 et f′(0) = 3 · 0 − 4 = −4 : y = −4x.'},
   {q:`f(${x}) = −${x}³ + 3${x}. Quelle est la valeur de son maximum local ?`, lab:'max local =', ans:2, why:'f′(x) = −3x² + 3 = −3(x − 1)(x + 1), positive entre −1 et 1 : maximum local en 1, f(1) = −1 + 3 = 2.'},
   {q:`Que peut-on dire des extrema de f(${x}) = ${x}³ + ${x} ?`, opts:['Un maximum et un minimum local','Un seul extremum, en 0','Aucun : f′ = 3<i>x</i>² + 1 &gt; 0, f est strictement croissante','Un minimum global en 0'], ans:2, why:'La dérivée ne s’annule jamais : pas d’extremum, la courbe monte sans arrêt de −∞ à +∞.'},
 ]},
 {n:'Étude d’une fraction rationnelle', r:'Étude d’une fraction rationnelle avec asymptote oblique', qs:[
   {q:`Sur ]0 ; +∞[, f(${x}) = ${F(x+'² + 9',x)}. Quelle est la valeur de son minimum ?`, lab:'min =', ans:6, why:'f(x) = x + 9/x, f′(x) = 1 − 9/x² s’annule en 3 (− puis +) : f(3) = 3 + 3 = 6.'},
   {q:`f(${x}) = ${F(x+'² − 4'+x+' + 5',x+' − 2')}. Combien de zéros possède <i>f</i> ?`, lab:'zéros :', ans:0, why:'f(x) = 0 ⇔ x² − 4x + 5 = 0, de discriminant 16 − 20 < 0 : aucun. Cohérent avec f = (x − 2) + 1/(x − 2) : maximum local −2 à gauche de 2, minimum local 2 à droite.'},
   {q:`f(${x}) = ${F(x+'² + 3',x+' + 1')}. Quelle est la valeur de son maximum local ?`, lab:'max local =', ans:-6, why:'f(x) = x − 1 + 4/(x + 1), f′(x) = 1 − 4/(x + 1)² s’annule en 1 et −3. En −3, f′ passe de + à − : f(−3) = 12/(−2) = −6.'},
 ]},
 {n:'Fonction avec racine carrée', r:'Étude d’une fonction avec une racine carrée', qs:[
   {q:`f(${x}) = ${x} √(9 − ${x}²). Quelle est la valeur de son maximum ?`, lab:'max =', ans:4.5, tol:1e-6, why:'f′(x) = (9 − 2x²)/√(9 − x²) s’annule en x = 3/√2. f(3/√2) = (3/√2) · √(9 − 9/2) = (3/√2)(3/√2) = 9/2.'},
   {q:`f(${x}) = √${x} (4 − ${x}) sur [0 ; 4]. En quelle abscisse atteint-elle son maximum ? (fraction acceptée)`, lab:'x =', ans:4/3, tol:1e-3, show:'4/3', why:'f = 4√x − x√x, f′(x) = 2/√x − (3/2)√x = (4 − 3x)/(2√x), nulle en 4/3, positive avant, négative après.'},
   {q:`Que peut-on dire de f(${x}) = √(${x}² + 1) − ${x} sur ℝ ?`, opts:['Elle a un minimum en 0','Elle est strictement décroissante, car f′(<i>x</i>) = <i>x</i>/√(<i>x</i>² + 1) − 1 &lt; 0','Elle est croissante pour <i>x</i> &gt; 0','Elle est paire'], ans:1, why:'|x| < √(x² + 1), donc x/√(x² + 1) < 1 et f′ < 0 partout : strictement décroissante sur ℝ.'},
   {q:`Comment la courbe de f(${x}) = ${x} √(1 − ${x}²) arrive-t-elle au point (1 ; 0) ?`, opts:['Avec une tangente horizontale','Avec une tangente verticale, car f′ → −∞ quand <i>x</i> → 1⁻','Avec une tangente de pente 1','Elle n’atteint pas ce point'], ans:1, why:'f′(x) = (1 − 2x²)/√(1 − x²) : le dénominateur tend vers 0⁺ et le numérateur vers −1, donc f′ → −∞. Tangente verticale au bord du domaine.'},
 ]},
];
})();
