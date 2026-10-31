/* Déclic — examen de compétence : Logarithme naturel et exponentielle */
(()=>{
const x='<i>x</i>', dx='d<i>x</i>', dt='d<i>t</i>';
const I=(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`;
EXAMS['gred-ln-exp']=[
 {n:'Propriétés algébriques de ln', r:'La propriété fondamentale : ln(ab) = ln a + ln b', qs:[
   {q:'On écrit ln 32 = <i>k</i> ln 2. Que vaut <i>k</i> ?', lab:'k =', ans:5, why:'32 = 2⁵, donc ln 32 = 5 ln 2.'},
   {q:'Simplifie ln 12 − ln 3 sous la forme <i>k</i> ln 2. Que vaut <i>k</i> ?', lab:'k =', ans:2, why:'ln 12 − ln 3 = ln(12/3) = ln 4 = 2 ln 2.'},
   {q:'Pour <i>a</i>, <i>b</i> &gt; 0, laquelle de ces égalités est toujours vraie ?', opts:['ln(<i>a</i> + <i>b</i>) = ln <i>a</i> + ln <i>b</i>','ln(<i>a</i>²<i>b</i>) = 2 ln <i>a</i> + ln <i>b</i>','ln(<i>ab</i>) = ln <i>a</i> · ln <i>b</i>','ln(<i>a</i>/<i>b</i>) = ln <i>a</i>/ln <i>b</i>'], ans:1, why:'ln transforme un produit en somme et une puissance en multiple : ln(a²b) = ln a² + ln b = 2 ln a + ln b. Les trois autres sont des erreurs classiques.'},
   {q:'Que vaut ln(√8)/ln 2 ?', lab:'quotient =', ans:1.5, tol:1e-9, why:'ln √8 = ½ ln 8 = ½ · 3 ln 2 = (3/2) ln 2. Le quotient vaut 3/2.'},
   {q:'Pour quels réels <i>x</i> a-t-on ln <i>x</i> &lt; 0 ?', opts:['<i>x</i> &lt; 0','<i>x</i> &lt; 1','0 &lt; <i>x</i> &lt; 1','Jamais'], ans:2, why:'ln n’est définie que pour x > 0, s’annule en 1 et est croissante : négative exactement sur ]0 ; 1[.'},
 ]},
 {n:'ln définie par une aire', r:'La primitive manquante : définir ln', qs:[
   {q:'Pourquoi ln 1 = 0 ?', opts:['Par convention','Parce que ∫₁¹ d<i>t</i>/<i>t</i> est une intégrale de largeur nulle','Parce que 1/1 = 1','Parce que ln est impaire'], ans:1, why:'ln x = ∫₁ˣ dt/t ; pour x = 1, les deux bornes coïncident et l’aire est nulle.'},
   {q:`Que vaut ${I('1','e')} ${F('d<i>t</i>','<i>t</i>')} ?`, lab:'intégrale =', ans:1, why:'C’est ln e = 1, par définition de e.'},
   {q:`Calcule ${I('2','4')} ${F('d<i>t</i>','<i>t</i>')}, arrondi au millième.`, lab:'intégrale ≈', ans:Math.log(2), tol:6e-4, show:'ln 2 ≈ 0,693', why:'[ln t]₂⁴ = ln 4 − ln 2 = ln(4/2) = ln 2 ≈ 0,693.'},
   {q:'Sur [1 ; 3], on a 1/3 ≤ 1/<i>t</i> ≤ 1. Quel encadrement de ln 3 en déduit-on ?', opts:['1/3 ≤ ln 3 ≤ 1','2/3 ≤ ln 3 ≤ 2','1 ≤ ln 3 ≤ 3','0 ≤ ln 3 ≤ 1/3'], ans:1, why:'Inégalité de la moyenne sur un intervalle de longueur 2 : 2 · 1/3 ≤ ∫₁³ dt/t ≤ 2 · 1. (Valeur réelle : ln 3 ≈ 1,099.)'},
 ]},
 {n:'Le nombre e et l’exponentielle', r:'La fonction exponentielle', qs:[
   {q:'Que vaut e<sup>ln 7</sup> ?', lab:'valeur =', ans:7, why:'exp et ln sont réciproques : e^(ln y) = y pour y > 0.'},
   {q:'Que vaut e<sup>2 ln 3</sup> ?', lab:'valeur =', ans:9, why:'2 ln 3 = ln 9, donc e^(2 ln 3) = e^(ln 9) = 9. Ou (e^(ln 3))² = 3² = 9.'},
   {q:'Que vaut e<sup>ln 2 + ln 5</sup> ?', lab:'valeur =', ans:10, why:'e^(a + b) = e^a · e^b, donc e^(ln 2) · e^(ln 5) = 2 · 5 = 10.'},
   {q:'Laquelle de ces égalités est <b>fausse</b> ?', opts:['e<sup>−<i>x</i></sup> = 1/e<sup><i>x</i></sup>','e<sup><i>x</i>+<i>y</i></sup> = e<sup><i>x</i></sup>e<sup><i>y</i></sup>','e<sup><i>x</i>²</sup> = (e<sup><i>x</i></sup>)²','e<sup>2<i>x</i></sup> = (e<sup><i>x</i></sup>)²'], ans:2, why:'(eˣ)² = e^(2x), pas e^(x²). Pour x = 2 : e⁴ ≠ (e²)² ? Si, e⁴ = (e²)², mais e^(x²) = e⁴ et pour x = 3 : e⁹ ≠ e⁶.'},
   {q:`Simplifie ${F('e³ · e⁻⁵','e⁻²')}.`, lab:'valeur =', ans:1, why:'e³ · e⁻⁵ = e⁻², divisé par e⁻² : e⁰ = 1.'},
 ]},
 {n:'Dériver avec ln et exp', r:'Dériver ln ∘ u et e^u', qs:[
   {q:`f(${x}) = ln(3${x} + 1). Calcule f′(1).`, lab:'f′(1) =', ans:.75, tol:1e-9, why:'(ln u)′ = u′/u : f′(x) = 3/(3x + 1). En 1 : 3/4 = 0,75.'},
   {q:`f(${x}) = e<sup>3<i>x</i></sup>. Calcule f′(0).`, lab:'f′(0) =', ans:3, why:'(e^u)′ = u′e^u : f′(x) = 3e^(3x). En 0 : 3 · 1 = 3.'},
   {q:`f(${x}) = ${x} ln ${x}. Calcule f′(e).`, lab:'f′(e) =', ans:2, why:'Produit : f′(x) = ln x + x · 1/x = ln x + 1. En e : 1 + 1 = 2.'},
   {q:`f(${x}) = e<sup><i>x</i>²</sup>. Calcule f′(1), arrondi au centième.`, lab:'f′(1) ≈', ans:2*Math.E, tol:.006, show:'2e ≈ 5,44', why:'f′(x) = 2x e^(x²). En 1 : 2e ≈ 5,44.'},
   {q:`Quelle est la dérivée de ln(${x}² + 4) ?`, opts:['1/(<i>x</i>² + 4)','2<i>x</i>/(<i>x</i>² + 4)','2<i>x</i> ln(<i>x</i>² + 4)','1/(2<i>x</i>)'], ans:1, why:'(ln u)′ = u′/u avec u = x² + 4, u′ = 2x. Oublier u′ donne la première option.'},
 ]},
 {n:'Étudier une fonction avec ln ou exp', r:'Dériver et étudier une fonction avec ln ou exp', qs:[
   {q:`f(${x}) = ${x}² e<sup>−<i>x</i></sup>. En quelle abscisse <i>f</i> a-t-elle un maximum local ?`, lab:'x =', ans:2, why:'f′(x) = (2x − x²)e^(−x) = x(2 − x)e^(−x), positive sur ]0 ; 2[, négative après : maximum local en 2 (minimum local en 0).'},
   {q:`Sur ]0 ; +∞[, f(${x}) = ${x} − ln ${x}. Quelle est la valeur de son minimum ?`, lab:'min =', ans:1, why:'f′(x) = 1 − 1/x s’annule en 1 (− puis +) : minimum f(1) = 1 − 0 = 1.'},
   {q:`Sur ]0 ; +∞[, f(${x}) = ln ${x} − ${x}/2. Quelle est la valeur de son maximum, arrondie au millième ?`, lab:'max ≈', ans:Math.log(2)-1, tol:6e-4, show:'ln 2 − 1 ≈ −0,307', why:'f′(x) = 1/x − 1/2 s’annule en 2 (+ puis −) : maximum f(2) = ln 2 − 1 ≈ −0,307.'},
   {q:`Que peut-on dire de f(${x}) = eˣ − ${x} sur ℝ ?`, opts:['Elle est strictement croissante','Elle a un minimum en 0 qui vaut 1','Elle a un maximum en 0','Elle s’annule en 0'], ans:1, why:'f′(x) = eˣ − 1 est négative pour x < 0, positive pour x > 0 : minimum en 0, f(0) = 1. C’est l’inégalité eˣ ≥ 1 + x.'},
 ]},
 {n:'Primitives avec ln et exp', r:'Dériver ln ∘ u et e^u', qs:[
   {q:`Calcule ${I('0','1')} eˣ ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:Math.E-1, tol:6e-4, show:'e − 1 ≈ 1,718', why:'[eˣ]₀¹ = e − 1 ≈ 1,718.'},
   {q:`Calcule ${I('0','1')} ${F('3','3'+x+' + 1')} ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:Math.log(4), tol:6e-4, show:'ln 4 ≈ 1,386', why:'Forme u′/u avec u = 3x + 1 : [ln(3x + 1)]₀¹ = ln 4 − ln 1 = ln 4 ≈ 1,386.'},
   {q:`Calcule ${I('0','1')} ${x} e<sup><i>x</i>²</sup> ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:(Math.E-1)/2, tol:6e-4, show:'(e − 1)/2 ≈ 0,859', why:'x e^(x²) = ½ · (2x) e^(x²) = ½ u′e^u avec u = x² : primitive ½ e^(x²). [½ e^(x²)]₀¹ = (e − 1)/2 ≈ 0,859.'},
   {q:`Quelle est une primitive de ${F('1','2'+x)} sur ]0 ; +∞[ ?`, opts:['ln(2<i>x</i>)','½ ln <i>x</i>','2 ln <i>x</i>','−1/(2<i>x</i>²)'], ans:1, why:'1/(2x) = ½ · 1/x, de primitive ½ ln x. (ln(2x) = ln 2 + ln x convient aussi, à une constante près : la deuxième option est celle de la liste.)'},
 ]},
 {n:'Équations avec ln et exp', r:'Résoudre une équation avec ln ou exp', qs:[
   {q:`Résous ln(2${x} − 1) = 0.`, lab:'x =', ans:1, why:'Domaine x > 1/2. ln(2x − 1) = 0 ⇔ 2x − 1 = 1 ⇔ x = 1.'},
   {q:'Résous eˣ = 20. Donne la solution arrondie au millième.', lab:'x ≈', ans:Math.log(20), tol:6e-4, show:'ln 20 ≈ 2,996', why:'eˣ = 20 ⇔ x = ln 20 ≈ 2,996.'},
   {q:`Résous ln ${x} + ln(${x} − 3) = ln 10.`, lab:'x =', ans:5, why:'Domaine x > 3. ln(x(x − 3)) = ln 10 ⇔ x² − 3x − 10 = 0 ⇔ x = 5 ou x = −2. Seul 5 est dans le domaine.'},
   {q:`Combien de solutions réelles a l’équation e<sup>2<i>x</i></sup> − 4eˣ + 3 = 0 ?`, lab:'solutions :', ans:2, why:'Avec X = eˣ > 0 : X² − 4X + 3 = 0 ⇔ X = 1 ou X = 3, deux valeurs positives. Donc x = 0 ou x = ln 3 : deux solutions.'},
   {q:'Quel est l’ensemble des solutions de ln <i>x</i> ≤ 2 ?', opts:[']−∞ ; e²]',']0 ; e²]',']0 ; 2]','[e² ; +∞['], ans:1, why:'Domaine x > 0. ln est croissante : ln x ≤ 2 = ln e² ⇔ x ≤ e². Solutions : ]0 ; e²].'},
 ]},
];
})();
