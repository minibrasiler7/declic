/* Déclic — examen de compétence : Sommes de Riemann et théorème fondamental */
(()=>{
const x='<i>x</i>', dx='d<i>x</i>', dt='d<i>t</i>';
const I=(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`;
const lim='lim quand <i>n</i> → ∞ de (1/<i>n</i>) Σ<sub>k=1</sub><sup>n</sup>';
EXAMS['an1-riemann']=[
 {n:'Sommes de Riemann à la main', r:'Calculer une somme de Riemann à la main', qs:[
   {q:`Calcule la somme supérieure <i>S</i>₄ de f(${x}) = ${x}² sur [0 ; 2].`, lab:'<i>S</i>₄ =', ans:3.75, why:'Δx = 0,5 et f croissante : bords droits 0,5 ; 1 ; 1,5 ; 2. S₄ = 0,5 · (0,25 + 1 + 2,25 + 4) = 0,5 · 7,5 = 3,75.'},
   {q:`Calcule la somme supérieure <i>S</i>₅ de f(${x}) = 2${x} + 1 sur [0 ; 1].`, lab:'<i>S</i>₅ =', ans:2.2, why:'Δx = 0,2, f croissante : bords droits 0,2 ; 0,4 ; 0,6 ; 0,8 ; 1, hauteurs 1,4 ; 1,8 ; 2,2 ; 2,6 ; 3. S₅ = 0,2 · 11 = 2,2.'},
   {q:`Calcule la somme inférieure <i>s</i>₃ de f(${x}) = 3 − ${x} sur [0 ; 3].`, lab:'<i>s</i>₃ =', ans:3, why:'Δx = 1. f est décroissante : son minimum sur chaque morceau est au bord droit 1, 2, 3. s₃ = 1 · (2 + 1 + 0) = 3.'},
   {q:`Calcule la somme inférieure <i>s</i>₂ de f(${x}) = 1/${x} sur [1 ; 3] (fraction acceptée).`, lab:'<i>s</i>₂ =', ans:5/6, show:'5/6', why:'Δx = 1. f est décroissante : minimum au bord droit 2 et 3. s₂ = 1 · (1/2 + 1/3) = 5/6.'},
   {q:'Pour une fonction décroissante, la somme supérieure <i>Sₙ</i> utilise…', opts:['les bords droits des morceaux','les bords gauches des morceaux','les milieux des morceaux','le minimum de f sur tout l’intervalle'], ans:1, why:'Une fonction décroissante est maximale au début de chaque morceau : la somme supérieure prend les hauteurs aux bords gauches.'},
 ]},
 {n:'L’écart entre les sommes', r:'L’intégrale de Riemann', qs:[
   {q:`Pour f(${x}) = ${x}³ sur [0 ; 2], que vaut <i>Sₙ</i> − <i>sₙ</i> ?`, opts:['8/n','16/n','2/n','16/n²'], ans:1, why:'f est croissante : Sₙ − sₙ = (f(2) − f(0)) · (2 − 0)/n = 8 · 2/n = 16/n.'},
   {q:`Pour f(${x}) = √${x} sur [0 ; 4], quel est le plus petit <i>n</i> tel que <i>Sₙ</i> − <i>sₙ</i> &lt; 0,1 ?`, lab:'<i>n</i> =', ans:81, why:'f croissante : Sₙ − sₙ = (2 − 0) · 4/n = 8/n. 8/n &lt; 0,1 ⇔ n &gt; 80. Pour n = 80 l’écart vaut exactement 0,1 : n = 81.'},
   {q:'Laquelle de ces affirmations est vraie ?', opts:['Toute fonction continue sur [a ; b] est intégrable sur [a ; b]','Seules les fonctions positives sont intégrables','Une fonction intégrable est forcément dérivable','Une fonction croissante sur [a ; b] n’est pas forcément intégrable'], ans:0, why:'Les fonctions continues et les fonctions monotones sur un segment sont intégrables. Une intégrale peut être négative, et l’intégrabilité ne demande pas la dérivabilité.'},
 ]},
 {n:'Intégrer avec une primitive', r:'Calculer une intégrale avec une primitive', qs:[
   {q:`Calcule ${I(0,2)} (3${x}² − 4${x} + 1) ${dx}.`, lab:'intégrale =', ans:2, why:'Une primitive est x³ − 2x² + x. G(2) − G(0) = (8 − 8 + 2) − 0 = 2.'},
   {q:`Calcule ${I(1,4)} √${x} ${dx} (fraction acceptée).`, lab:'intégrale =', ans:14/3, show:'14/3', why:'√x = x<sup>1/2</sup> a pour primitive (2/3)x<sup>3/2</sup>. (2/3)(4<sup>3/2</sup> − 1) = (2/3)(8 − 1) = 14/3.'},
   {q:`Calcule ${I(1,2)} ${F('1',x+'²')} ${dx}.`, lab:'intégrale =', ans:0.5, show:'1/2', why:'1/x² = x⁻² a pour primitive x⁻¹/(−1) = −1/x. [−1/x]₁² = −1/2 − (−1) = 1/2.'},
   {q:`Calcule ${I(0,'π')} sin ${x} ${dx}.`, lab:'intégrale =', ans:2, why:'(−cos x)′ = sin x, donc −cos x est une primitive. −cos π − (−cos 0) = 1 + 1 = 2.'},
   {q:`Calcule ${I('−1','1')} (${x}³ − ${x} + 2) ${dx}.`, lab:'intégrale =', ans:4, why:'Primitive : x⁴/4 − x²/2 + 2x. G(1) − G(−1) = (1/4 − 1/2 + 2) − (1/4 − 1/2 − 2) = 4.'},
 ]},
 {n:'Le théorème fondamental', r:'Le théorème fondamental', qs:[
   {q:`Soit F(${x}) = ${I(0,x)} (<i>t</i>² − 4) ${dt}. Que vaut F′(3) ?`, lab:'F′(3) =', ans:5, why:'Théorème fondamental : F′(x) = f(x) = x² − 4. F′(3) = 9 − 4 = 5.'},
   {q:`Soit F(${x}) = ${I(1,x)} (3 − <i>t</i>) ${dt}. En quelle valeur de ${x} la fonction F est-elle maximale ?`, lab:`${x} =`, ans:3, why:'F′(x) = 3 − x : positive avant 3, négative après. F croît puis décroît, son maximum est en x = 3.'},
   {q:`Soit F(${x}) = ${I(2,x)} f(<i>t</i>) ${dt}, avec f continue. Que vaut F(2) ?`, lab:'F(2) =', ans:0, why:'F(2) = ∫₂² f(t) dt : l’intervalle est réduit à un point, l’aire est nulle.'},
 ]},
 {n:'Intégrale à borne variable', r:'Dériver une intégrale à borne variable', qs:[
   {q:`Soit G(${x}) = ${I(0,x+'²')} √(<i>t</i> + 9) ${dt}. Calcule G′(4).`, lab:'G′(4) =', ans:40, why:'G′(x) = f(x²) · 2x = √(x² + 9) · 2x. En 4 : √25 · 8 = 40.'},
   {q:`Soit G(${x}) = ${I(1,'3'+x)} ln <i>t</i> ${dt}. Calcule G′(1), arrondi au centième.`, lab:'G′(1) ≈', ans:3*Math.log(3), tol:0.006, show:'3 ln 3 ≈ 3,30', why:'G′(x) = ln(3x) · 3. En 1 : 3 ln 3 ≈ 3,30.'},
   {q:`Soit G(${x}) = ${I(0,'sin '+x)} (1 + <i>t</i>²) ${dt}. Que vaut G′(${x}) ?`, opts:['(1 + sin² x) cos x','1 + sin² x','(1 + x²) cos x','2 sin x cos x'], ans:0, why:'On remplace t par la borne sin x dans 1 + t², puis on multiplie par la dérivée de la borne, cos x.'},
   {q:`Soit H(${x}) = ${I(0,x+'³')} e<sup><i>t</i></sup> ${dt}. Calcule H′(1), arrondi au centième.`, lab:'H′(1) ≈', ans:3*Math.E, tol:0.006, show:'3e ≈ 8,15', why:'H′(x) = e<sup>x³</sup> · 3x². En 1 : 3e ≈ 8,15.'},
 ]},
 {n:'Reconnaître une somme de Riemann', r:'Reconnaître une somme de Riemann', qs:[
   {q:`Calcule ${lim} (k/<i>n</i>)³.`, lab:'limite =', ans:0.25, show:'1/4', why:'Somme de Riemann de f(x) = x³ sur [0 ; 1] : elle tend vers ∫₀¹ x³ dx = [x⁴/4]₀¹ = 1/4.'},
   {q:`Calcule ${lim} (2k/<i>n</i> + 1).`, lab:'limite =', ans:2, why:'C’est f(k/n) avec f(x) = 2x + 1. Limite : ∫₀¹ (2x + 1) dx = [x² + x]₀¹ = 2.'},
   {q:`Calcule ${lim} e<sup>k/<i>n</i></sup>, arrondi au centième.`, lab:'limite ≈', ans:Math.E-1, tol:0.006, show:'e − 1 ≈ 1,72', why:'Somme de Riemann de f(x) = eˣ sur [0 ; 1] : elle tend vers ∫₀¹ eˣ dx = e − 1 ≈ 1,72.'},
 ]},
 {n:'Valeur moyenne', r:'La valeur moyenne d’une fonction', qs:[
   {q:`Calcule la valeur moyenne de f(${x}) = ${x}³ sur [0 ; 2].`, lab:'moyenne =', ans:2, why:'∫₀² x³ dx = [x⁴/4]₀² = 4. Moyenne : 4/(2 − 0) = 2.'},
   {q:`Calcule la valeur moyenne de f(${x}) = √${x} sur [0 ; 9].`, lab:'moyenne =', ans:2, why:'∫₀⁹ x<sup>1/2</sup> dx = (2/3) · 9<sup>3/2</sup> = (2/3) · 27 = 18. Moyenne : 18/9 = 2.'},
   {q:'La température d’une pièce vaut T(<i>t</i>) = 10 + 6<i>t</i> − <i>t</i>² (en °C), pour <i>t</i> ∈ [0 ; 6] heures. Quelle est la température moyenne sur ces 6 heures ?', unit:'°C', ans:16, why:'∫₀⁶ (10 + 6t − t²) dt = [10t + 3t² − t³/3]₀⁶ = 60 + 108 − 72 = 96. Moyenne : 96/6 = 16 °C.'},
 ]},
 {n:'Aire géométrique', r:'Aire géométrique : couper aux zéros', qs:[
   {q:`Calcule l’aire entre la courbe de f(${x}) = ${x}² − 9 et l’axe O${x}, pour ${x} ∈ [0 ; 4] (fraction acceptée).`, lab:'aire =', ans:64/3, show:'64/3', why:'f s’annule en 3. ∫₀³ (x² − 9) dx = 9 − 27 = −18 et ∫₃⁴ (x² − 9) dx = (64/3 − 36) − (9 − 27) = 10/3. Aire : 18 + 10/3 = 64/3.'},
   {q:`Calcule l’aire entre la courbe de f(${x}) = ${x}³ et l’axe O${x}, pour ${x} ∈ [−1 ; 2].`, lab:'aire =', ans:4.25, show:'17/4', why:'f &lt; 0 sur [−1 ; 0[. ∫₋₁⁰ x³ dx = −1/4 et ∫₀² x³ dx = 4. Aire : 1/4 + 4 = 17/4 (alors que l’intégrale vaut 15/4).'},
   {q:`On a ${I(0,4)} (${x} − 2) ${dx} = 0. Que vaut l’aire entre la droite <i>y</i> = ${x} − 2 et l’axe O${x}, pour ${x} ∈ [0 ; 4] ?`, lab:'aire =', ans:4, why:'Coupure en 2 : ∫₀² (x − 2) dx = −2 et ∫₂⁴ (x − 2) dx = 2. Les deux triangles se compensent dans l’intégrale, mais l’aire vaut 2 + 2 = 4.'},
   {q:`Calcule l’aire entre la courbe de cos ${x} et l’axe O${x}, pour ${x} ∈ [0 ; π].`, lab:'aire =', ans:2, why:'cos s’annule en π/2. Avec la primitive sin x : l’intégrale de 0 à π/2 vaut sin(π/2) − sin 0 = 1, celle de π/2 à π vaut sin π − sin(π/2) = −1. Aire : 1 + 1 = 2.'},
 ]},
];
})();
