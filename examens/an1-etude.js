/* Déclic — examen de compétence : Extrema et étude de fonction */
(()=>{
const x='<i>x</i>';
EXAMS['an1-etude']=[
 {n:'Extrema locaux', r:'Trouver les extrema locaux', qs:[
   {q:`Quelle est la valeur du maximum local de f(${x}) = ${x}³ − 12${x} ?`, lab:'maximum local =', ans:16, why:'f′(x) = 3x² − 12 = 3(x − 2)(x + 2). f′ passe de + à − en −2 : maximum local f(−2) = −8 + 24 = 16.'},
   {q:`Quelle est la valeur du minimum local de f(${x}) = 2${x}³ + 3${x}² − 36${x} ?`, lab:'minimum local =', ans:-44, why:'f′(x) = 6x² + 6x − 36 = 6(x + 3)(x − 2). f′ passe de − à + en 2 : minimum local f(2) = 16 + 12 − 72 = −44.'},
   {q:`Que peut-on dire de f(${x}) = ${x} e<sup>−<i>x</i></sup> ?`, opts:['Elle a un minimum local en x = 1','Elle a un maximum local en x = 1','Elle a un maximum local en x = −1','Elle n’a aucun extremum local'], ans:1, why:'f′(x) = e⁻ˣ − x e⁻ˣ = (1 − x)e⁻ˣ. Comme e⁻ˣ &gt; 0, f′ a le signe de 1 − x : + avant 1, − après. Maximum local en 1.'},
   {q:`Combien d’extrema locaux a f(${x}) = ${x}⁴ − 8${x}² ?`, lab:'nombre =', ans:3, why:'f′(x) = 4x³ − 16x = 4x(x − 2)(x + 2). Signes : −, +, −, + : minimum en −2, maximum en 0, minimum en 2. Trois extrema locaux.'},
   {q:`Quelle est la valeur du minimum de f(${x}) = ${x}² ln ${x} sur ]0 ; +∞[, arrondie au centième ?`, lab:'minimum ≈', ans:-1/(2*Math.E), tol:0.006, show:'−1/(2e) ≈ −0,18', why:'f′(x) = 2x ln x + x = x(2 ln x + 1), nul pour ln x = −1/2, soit x = e<sup>−1/2</sup>. f′ passe de − à + : minimum f = e⁻¹ · (−1/2) = −1/(2e) ≈ −0,18.'},
 ]},
 {n:'f′(a) = 0 ne suffit pas', r:'Extrema et tangente horizontale', qs:[
   {q:`f(${x}) = ${x}³ − 3${x}² + 3${x} + 1 vérifie f′(1) = 0. Que peut-on dire en 1 ?`, opts:['C’est un minimum local','C’est un maximum local','Ce n’est pas un extremum : f′ = 3(x − 1)² ne change pas de signe','f n’est pas dérivable en 1'], ans:2, why:'f′(x) = 3x² − 6x + 3 = 3(x − 1)² ≥ 0 : f est croissante, la tangente est horizontale en 1 mais f′ ne change pas de signe.'},
   {q:'Laquelle de ces affirmations est vraie, pour f dérivable sur un intervalle ouvert ?', opts:['Si f′(a) = 0, alors f a un extremum en a','Si f a un extremum local en a, alors f′(a) = 0','Si f′(a) ≠ 0, alors f a un extremum en a','Un extremum local est toujours global'], ans:1, why:'Un extremum en un point intérieur impose f′(a) = 0 : condition nécessaire. La réciproque est fausse (x³ en 0).'},
   {q:`Sur [1 ; 3], f(${x}) = ${x}² atteint son minimum en 1, alors que f′(1) = 2 ≠ 0. Pourquoi n’est-ce pas une contradiction ?`, opts:['Parce que 1 est une borne : f′ = 0 n’est imposé qu’en un point intérieur','Parce que f n’est pas dérivable en 1','Parce que le minimum est en fait atteint en 0','Parce qu’on a en réalité f′(1) = 0'], ans:0, why:'La condition f′(a) = 0 vaut pour un extremum en un point intérieur. À une borne, f peut être minimale sans que sa pente soit nulle.'},
 ]},
 {n:'Extremum global sur un segment', r:'Extremum global sur un segment', qs:[
   {q:`Quel est le maximum de f(${x}) = ${x}³ − 6${x}² + 9${x} sur [0 ; 5] ?`, lab:'maximum =', ans:20, why:'f′(x) = 3(x − 1)(x − 3). Valeurs : f(1) = 4, f(3) = 0, f(0) = 0, f(5) = 125 − 150 + 45 = 20. Le maximum vaut 20, atteint à la borne 5.'},
   {q:`Quel est le minimum de f(${x}) = ${x}⁴ − 2${x}² sur [−1 ; 2] ?`, lab:'minimum =', ans:-1, why:'f′(x) = 4x(x − 1)(x + 1) : points critiques intérieurs 0 et 1. f(0) = 0, f(1) = −1, bornes f(−1) = −1, f(2) = 8. Minimum −1.'},
   {q:`Quel est le maximum de f(${x}) = ${x} + 1/${x} sur [1/2 ; 3] ? (fraction acceptée)`, lab:'maximum =', ans:10/3, show:'10/3', why:'f′(x) = 1 − 1/x², nul en 1 : f(1) = 2. Bornes : f(1/2) = 5/2, f(3) = 10/3. Le maximum vaut 10/3, en 3.'},
   {q:`Quel est le maximum de f(${x}) = −${x}² + 4${x} sur [3 ; 5] ?`, lab:'maximum =', ans:3, why:'f′(x) = −2x + 4 s’annule en 2, hors de [3 ; 5] : f décroît sur tout le segment. Le maximum est à la borne 3 : f(3) = −9 + 12 = 3 (et non le sommet 4).'},
 ]},
 {n:'Convexité et points d’inflexion', r:'Convexité et points d’inflexion', qs:[
   {q:`Quelle est l’abscisse du point d’inflexion de f(${x}) = ${x}³ + 3${x}² − 2 ?`, lab:`${x} =`, ans:-1, why:'f′(x) = 3x² + 6x, f″(x) = 6x + 6. f″ s’annule et change de signe en x = −1.'},
   {q:`Sur quel intervalle f(${x}) = ${x}⁴ − 4${x}³ est-elle concave ?`, opts:['[0 ; 3]','[0 ; 2]',']−∞ ; 0]','[2 ; +∞['], ans:1, why:'f″(x) = 12x² − 24x = 12x(x − 2), négatif entre les racines 0 et 2 : f est concave sur [0 ; 2].'},
   {q:`Combien de points d’inflexion a f(${x}) = ${x}⁴ + ${x}² ?`, lab:'nombre =', ans:0, why:'f″(x) = 12x² + 2 &gt; 0 partout : f est convexe sur ℝ, f″ ne change jamais de signe.'},
   {q:`Quelle est l’abscisse du point d’inflexion de f(${x}) = ${x} e<sup><i>x</i></sup> ?`, lab:`${x} =`, ans:-2, why:'f′(x) = (x + 1)eˣ, f″(x) = eˣ + (x + 1)eˣ = (x + 2)eˣ. Comme eˣ &gt; 0, f″ change de signe en x = −2.'},
   {q:'Laquelle de ces fonctions a un point d’inflexion en 0 ?', opts:['x⁴','x⁵','x² + 1','x⁴ + x²'], ans:1, why:'Pour x⁵, f″ = 20x³ change de signe en 0. Pour x⁴, f″ = 12x² s’annule en 0 sans changer de signe : pas d’inflexion.'},
 ]},
 {n:'Asymptotes', r:'Asymptotes', qs:[
   {q:`La courbe de f(${x}) = ${F('3'+x+' + 1',x+' − 2')} a une asymptote verticale <i>x</i> = <i>a</i>. Que vaut <i>a</i> ?`, lab:'<i>a</i> =', ans:2, why:'En 2, le numérateur tend vers 7 et le dénominateur vers 0 : f(x) → ±∞. La droite x = 2 est asymptote verticale.'},
   {q:`En +∞, f(${x}) = √(${x}² + 4${x}) a une asymptote oblique <i>y</i> = <i>x</i> + <i>p</i>. Que vaut <i>p</i> ?`, lab:'<i>p</i> =', ans:2, why:'m = lim f(x)/x = lim √(1 + 4/x) = 1. Puis p = lim (√(x² + 4x) − x) = lim 4x/(√(x² + 4x) + x) = 4/2 = 2 (conjugué).'},
   {q:`Combien d’asymptotes (verticales ou obliques) a la courbe de f(${x}) = ${x} − 1 + ${F('4',x+' + 2')} ?`, lab:'nombre =', ans:2, why:'Asymptote verticale x = −2 (4/(x + 2) → ±∞). Asymptote oblique y = x − 1 en ±∞, car 4/(x + 2) → 0.'},
 ]},
 {n:'Asymptote oblique par division', r:'Division de polynômes et asymptote oblique', qs:[
   {q:`Quelle est l’asymptote oblique de f(${x}) = ${F(x+'² + 5'+x+' + 1',x+' + 2')} ?`, opts:['y = x + 5','y = x + 3','y = x − 3','y = x + 7'], ans:1, why:'Division : x² + 5x + 1 = (x + 2)(x + 3) − 5, donc f(x) = x + 3 − 5/(x + 2), et −5/(x + 2) → 0.'},
   {q:`L’asymptote oblique de f(${x}) = ${F('3'+x+'² − '+x+' + 2',x+' − 1')} s’écrit <i>y</i> = 3${x} + <i>p</i>. Que vaut <i>p</i> ?`, lab:'<i>p</i> =', ans:2, why:'3x² ÷ x = 3x, reste 3x² − x + 2 − (3x² − 3x) = 2x + 2. Puis 2x ÷ x = 2, reste 2x + 2 − (2x − 2) = 4. f(x) = 3x + 2 + 4/(x − 1).'},
   {q:`L’asymptote oblique de f(${x}) = ${F('2'+x+'³ + '+x,x+'² + 1')} s’écrit <i>y</i> = 2${x} + <i>p</i>. Que vaut <i>p</i> ?`, lab:'<i>p</i> =', ans:0, why:'2x³ ÷ x² = 2x, et 2x(x² + 1) = 2x³ + 2x : reste −x, de degré plus petit que x² + 1. f(x) = 2x − x/(x² + 1), asymptote y = 2x.'},
   {q:`En +∞, où est la courbe de f(${x}) = ${F(x+'² + 5'+x+' + 1',x+' + 2')} par rapport à son asymptote oblique ?`, opts:['Au-dessus','En dessous','Elle la coupe une infinité de fois','Elle est confondue avec elle'], ans:1, why:'f(x) = x + 3 − 5/(x + 2). L’écart f(x) − (x + 3) = −5/(x + 2) est négatif pour x &gt; −2 : la courbe est en dessous.'},
 ]},
 {n:'Mener une étude de fonction', r:'La démarche d’une étude de fonction', qs:[
   {q:`La fonction f(${x}) = ${F(x+'²',x+'² + 1')} est…`, opts:['paire','impaire','ni paire ni impaire','à la fois paire et impaire'], ans:0, why:'f(−x) = (−x)²/((−x)² + 1) = x²/(x² + 1) = f(x) : f est paire, son graphe est symétrique par rapport à l’axe Oy.'},
   {q:`Quel est le maximum global de f(${x}) = ${F(x,x+'² + 4')} sur ℝ ?`, lab:'maximum =', ans:0.25, show:'1/4', why:'f′(x) = (4 − x²)/(x² + 4)², positive entre −2 et 2, négative ailleurs. f(2) = 2/8 = 1/4, et f → 0 en ±∞ : le maximum global vaut 1/4.'},
   {q:`Quel est le minimum de f(${x}) = ${F('e<sup><i>x</i></sup>',x)} sur ]0 ; +∞[, arrondi au centième ?`, lab:'minimum ≈', ans:Math.E, tol:0.006, show:'e ≈ 2,72', why:'f′(x) = (eˣ · x − eˣ)/x² = eˣ(x − 1)/x² : négative avant 1, positive après. f → +∞ en 0⁺ et en +∞ : le minimum vaut f(1) = e ≈ 2,72.'},
 ]},
 {n:'Problèmes d’optimisation', r:'Résoudre un problème d’optimisation', qs:[
   {q:`Quel est le minimum de f(${x}) = 4${x} + 1/${x} pour ${x} &gt; 0 ?`, lab:'minimum =', ans:4, why:'f′(x) = 4 − 1/x² s’annule en x = 1/2 (x &gt; 0), négative avant, positive après. f(1/2) = 2 + 2 = 4.'},
   {q:'Un rectangle a une aire de 36 m². Quel est son plus petit périmètre possible ?', unit:'m', ans:24, why:'Avec les côtés x et 36/x : P(x) = 2x + 72/x, P′(x) = 2 − 72/x² = 0 pour x = 6. Minimum P(6) = 12 + 12 = 24 m (un carré).'},
   {q:'Deux nombres positifs <i>x</i> et <i>y</i> vérifient <i>x</i> + <i>y</i> = 12. Quelle est la plus grande valeur possible de <i>x</i><i>y</i>² ?', lab:'maximum =', ans:256, why:'x = 12 − y, donc P(y) = (12 − y)y² = 12y² − y³ sur [0 ; 12]. P′(y) = 24y − 3y² = 3y(8 − y), nul en 8. P(8) = 4 · 64 = 256, et P(0) = P(12) = 0.'},
   {q:'Une boîte sans couvercle a une base carrée de côté <i>x</i> et un volume de 32 dm³. Quelle est la plus petite surface de carton possible (fond et quatre côtés) ?', unit:'dm²', ans:48, why:'Hauteur h = 32/x². Surface S = x² + 4xh = x² + 128/x. S′(x) = 2x − 128/x² = 0 ⇔ x³ = 64 ⇔ x = 4. S(4) = 16 + 32 = 48 dm².'},
 ]},
];
})();
