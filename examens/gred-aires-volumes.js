/* Déclic — examen de compétence : Calculs d’aires et de volumes */
(()=>{
const x='<i>x</i>';
EXAMS['gred-aires-volumes']=[
 {n:'Aire sous une courbe', r:'Calculer une aire sous une courbe', qs:[
   {q:`Aire de la région sous la courbe <i>y</i> = ${x}³ pour 0 ≤ ${x} ≤ 2 (au-dessus de l’axe des abscisses).`, lab:'𝒜 =', ans:4, tol:1e-6, why:'∫₀² x³ dx = 2⁴/4 = 4.'},
   {q:`Aire sous la courbe <i>y</i> = 3${x}² pour 1 ≤ ${x} ≤ 2.`, lab:'𝒜 =', ans:7, tol:1e-6, why:'3 ∫₁² x² dx = 3 · (8 − 1)/3 = 7.'},
   {q:`Aire sous la droite <i>y</i> = 2${x} + 1 pour 0 ≤ ${x} ≤ 3.`, lab:'𝒜 =', ans:12, tol:1e-6, why:'2 · 9/2 + 3 = 12. Contrôle : trapèze de bases 1 et 7, de hauteur 3 : (1 + 7) · 3/2 = 12.'},
   {q:`Aire sous la courbe <i>y</i> = 9 − ${x}² pour 0 ≤ ${x} ≤ 3.`, lab:'𝒜 =', ans:18, tol:1e-6, why:'9 · 3 − 27/3 = 27 − 9 = 18. La fonction est positive sur [0 ; 3] (elle s’annule en 3).'},
   {q:`Aire sous la courbe <i>y</i> = ${x}² + ${x} pour 0 ≤ ${x} ≤ 2 (fraction ou arrondi au millième).`, lab:'𝒜 =', ans:14/3, tol:1e-3, show:'14/3', why:'8/3 + 4/2 = 8/3 + 2 = 14/3 ≈ 4,667.'},
   {q:`Aire sous la courbe <i>y</i> = ${x}³ pour 1 ≤ ${x} ≤ 2.`, lab:'𝒜 =', ans:3.75, tol:1e-6, why:'(2⁴ − 1⁴)/4 = 15/4 = 3,75.'},
 ]},
 {n:'Aire entre deux courbes', r:'Aire entre deux courbes : trouver les points d’intersection', qs:[
   {q:`Aire de la région délimitée par <i>y</i> = ${x} et <i>y</i> = ${x}³ pour ${x} ≥ 0.`, lab:'𝒜 =', ans:.25, tol:1e-6, why:'Intersections : x = x³ ⇔ x = 0 ou 1 (x ≥ 0). En x = 0,5, la droite est au-dessus. ∫₀¹ (x − x³) dx = 1/2 − 1/4 = 1/4.'},
   {q:`Aire de la région délimitée par la parabole <i>y</i> = ${x}² et la droite <i>y</i> = 2${x} + 3 (fraction ou arrondi au millième).`, lab:'𝒜 =', ans:32/3, tol:1e-3, show:'32/3', why:'x² = 2x + 3 ⇔ x² − 2x − 3 = 0 ⇔ x = −1 ou 3. La droite est au-dessus (en 0 : 3 &gt; 0). ∫₋₁³ (2x + 3 − x²) dx = (9 − 1) + 12 − (27 + 1)/3 = 20 − 28/3 = 32/3.'},
   {q:`Aire de la région délimitée par <i>y</i> = ${x}² et <i>y</i> = 4 (fraction ou arrondi au millième).`, lab:'𝒜 =', ans:32/3, tol:1e-3, show:'32/3', why:'Intersections x = ±2, la droite y = 4 est au-dessus. ∫₋₂² (4 − x²) dx = 16 − (8 + 8)/3 = 32/3.'},
   {q:`Aire de la région comprise entre <i>y</i> = ${x}² et <i>y</i> = ${x}³ pour 0 ≤ ${x} ≤ 1 (fraction ou arrondi au millième).`, lab:'𝒜 =', ans:1/12, tol:1e-3, show:'1/12', why:'Sur [0 ; 1], x³ ≤ x². ∫₀¹ (x² − x³) dx = 1/3 − 1/4 = 1/12.'},
   {q:`On calcule ∫₀² (<i>g</i>(${x}) − <i>f</i>(${x})) d${x} pour l’aire entre deux courbes qui ne se croisent pas sur [0 ; 2], et on trouve −5. Que conclut-on ?`, opts:['L’aire vaut −5','On s’est trompé d’ordre : f est au-dessus et l’aire vaut 5','L’aire vaut 0','Les courbes se croisent'], ans:1, why:'Une aire est positive. Un résultat négatif avec des courbes qui ne se croisent pas signifie qu’on a intégré « dessous − dessus » : l’aire vaut 5.'},
   {q:`Aire de la région délimitée par <i>y</i> = ${x} et <i>y</i> = ${x}²/2 (fraction ou arrondi au millième).`, lab:'𝒜 =', ans:2/3, tol:1e-3, show:'2/3', why:'x = x²/2 ⇔ x(x − 2) = 0 : bornes 0 et 2 ; en x = 1 la droite est au-dessus. ∫₀² (x − x²/2) dx = 2 − 8/6 = 2/3.'},
 ]},
 {n:'Aire géométrique', r:'Aire géométrique : couper aux zéros', qs:[
   {q:`Aire de la région comprise entre la courbe de <i>f</i>(${x}) = ${x} − 1 et l’axe des abscisses pour 0 ≤ ${x} ≤ 3.`, lab:'𝒜 =', ans:2.5, tol:1e-6, why:'Zéro en 1. ∫₀¹ (x − 1) dx = 1/2 − 1 = −1/2 ; ∫₁³ (x − 1) dx = (9 − 1)/2 − 2 = 2. Aire : 1/2 + 2 = 2,5 (deux triangles).'},
   {q:`Que vaut ∫₀³ (${x} − 1) d${x} ?`, lab:'intégrale =', ans:1.5, tol:1e-6, why:'9/2 − 3 = 1,5 : c’est l’aire algébrique, 2 − 1/2, plus petite que l’aire géométrique 2,5.'},
   {q:`Aire de la région comprise entre la courbe de <i>f</i>(${x}) = ${x}² − 4 et l’axe des abscisses pour 0 ≤ ${x} ≤ 4.`, lab:'𝒜 =', ans:16, tol:1e-6, why:'Zéro en 2. ∫₀² (x² − 4) dx = 8/3 − 8 = −16/3 ; ∫₂⁴ (x² − 4) dx = (64 − 8)/3 − 8 = 32/3. Aire : 16/3 + 32/3 = 16, alors que l’intégrale vaut 16/3.'},
   {q:`Aire de la région comprise entre la courbe de <i>f</i>(${x}) = ${x}³ et l’axe des abscisses pour −2 ≤ ${x} ≤ 1.`, lab:'𝒜 =', ans:4.25, tol:1e-6, why:'∫₋₂⁰ x³ dx = (0 − 16)/4 = −4 et ∫₀¹ x³ dx = 1/4. Aire : 4 + 1/4 = 4,25 ; l’intégrale vaut −3,75.'},
   {q:'<i>f</i> est impaire et continue sur [−3 ; 3]. Laquelle de ces affirmations est vraie ?', opts:['L’aire entre la courbe et l’axe est nulle','∫₋₃³ f = 0, mais l’aire géométrique vaut 2 ∫₀³ |f|','∫₋₃³ f = 2 ∫₀³ f','L’aire géométrique est négative'], ans:1, why:'Par symétrie par rapport à l’origine, les parties de part et d’autre de 0 se compensent dans l’intégrale, mais elles s’ajoutent dans l’aire géométrique.'},
 ]},
 {n:'Volume par tranches', r:'Le volume d’un solide par tranches', qs:[
   {q:`Un solide a, pour 0 ≤ ${x} ≤ 3, des sections d’aire <i>A</i>(${x}) = ${x}². Quel est son volume ?`, lab:'V =', ans:9, tol:1e-6, why:'V = ∫₀³ x² dx = 27/3 = 9.'},
   {q:`Un solide a des sections d’aire constante 4 pour 0 ≤ ${x} ≤ 5. Quel est son volume ?`, lab:'V =', ans:20, why:'V = ∫₀⁵ 4 dx = 20 : c’est un prisme (ou cylindre) de base 4 et de hauteur 5.'},
   {q:'Volume d’une pyramide à base carrée de côté 3 et de hauteur 4.', lab:'V =', ans:12, tol:1e-6, why:'A(z) = 9(1 − z/4)² ; V = c²H/3 = 9 · 4/3 = 12.'},
   {q:`Un solide a des sections d’aire <i>A</i>(${x}) = 2${x} + 1 pour 0 ≤ ${x} ≤ 2. Quel est son volume ?`, lab:'V =', ans:6, tol:1e-6, why:'∫₀² (2x + 1) dx = 2 · 2 + 2 = 6.'},
   {q:'Pourquoi le volume vaut-il l’intégrale de l’aire des sections ?', opts:['Parce que l’aire est la dérivée du volume','Parce que le solide est coincé entre des empilements de galettes d’épaisseur h dont les volumes sont les sommes inférieure et supérieure de A','Parce que toutes les sections sont égales','Parce que le volume est toujours proportionnel à la hauteur'], ans:1, why:'Sur chaque tranche d’épaisseur h, le volume est entre mₖh et Mₖh (bornes de A sur le morceau). Les sommes de Darboux de A encadrent V et convergent vers ∫ A.'},
 ]},
 {n:'Volumes de révolution', r:'Volumes de révolution : la méthode des disques', qs:[
   {q:`On fait tourner <i>y</i> = ${x}, 0 ≤ ${x} ≤ 3, autour de l’axe des abscisses. Volume divisé par π ?`, lab:'V/π =', ans:9, tol:1e-6, why:'π ∫₀³ x² dx = 9π : un cône de rayon 3 et de hauteur 3, soit π · 9 · 3/3.'},
   {q:`On fait tourner <i>y</i> = √(${x} + 1), 0 ≤ ${x} ≤ 3, autour de l’axe des abscisses. Volume divisé par π ?`, lab:'V/π =', ans:7.5, tol:1e-6, why:'f(x)² = x + 1. ∫₀³ (x + 1) dx = 9/2 + 3 = 7,5.'},
   {q:`On fait tourner <i>y</i> = ${x} + 1, 0 ≤ ${x} ≤ 2, autour de l’axe des abscisses. Volume divisé par π (fraction ou arrondi au millième) ?`, lab:'V/π =', ans:26/3, tol:1e-3, show:'26/3', why:'(x + 1)² = x² + 2x + 1. ∫₀² = 8/3 + 4 + 2 = 26/3 : un tronc de cône de rayons 1 et 3.'},
   {q:`On fait tourner le demi-cercle <i>y</i> = √(4 − ${x}²), −2 ≤ ${x} ≤ 2, autour de l’axe des abscisses. Volume divisé par π (fraction ou arrondi au millième) ?`, lab:'V/π =', ans:32/3, tol:1e-3, show:'32/3', why:'f² = 4 − x². ∫₋₂² (4 − x²) dx = 16 − 16/3 = 32/3 : la sphère de rayon 2, 4π · 8/3.'},
   {q:'Volume d’un cône de rayon 3 et de hauteur 4, divisé par π.', lab:'V/π =', ans:12, tol:1e-6, why:'f(x) = 3x/4 sur [0 ; 4] : π (9/16) · 64/3 = 12π.'},
   {q:'On fait tourner la région entre <i>y</i> = 1 et <i>y</i> = 2, pour 0 ≤ <i>x</i> ≤ 3, autour de l’axe des abscisses (tube). Volume divisé par π ?', lab:'V/π =', ans:9, tol:1e-6, why:'Couronnes d’aire π(2² − 1²) = 3π sur une longueur 3 : V = 9π. C’est le cylindre plein 12π moins le trou 3π.'},
   {q:'Volume d’une sphère de rayon 3, divisé par π.', lab:'V/π =', ans:36, tol:1e-6, why:'4R³/3 = 4 · 27/3 = 36. Par intégration : ∫₋₃³ (9 − x²) dx = 54 − 18 = 36.'},
 ]},
];
})();
