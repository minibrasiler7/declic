/* Déclic — examen de compétence : Applications de l’intégrale */
(()=>{
const x='<i>x</i>', t='<i>t</i>', y='<i>y</i>';
const I=(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`;
const tourne='tourner autour de l’axe O<i>x</i>';
EXAMS['an1-applications']=[
 {n:'Aire entre deux courbes', r:'Calculer l’aire entre deux courbes', qs:[
   {q:`Calcule l’aire comprise entre ${y} = ${x}² et ${y} = 3${x}.`, lab:'aire =', ans:4.5, show:'9/2', why:'x² = 3x ⇔ x = 0 ou 3. En x = 1, 3 &gt; 1 : la droite est au-dessus. A = ∫₀³ (3x − x²) dx = 27/2 − 9 = 9/2.'},
   {q:`Calcule l’aire comprise entre ${y} = 6 − ${x}² et ${y} = ${x}² − 2 (fraction acceptée).`, lab:'aire =', ans:64/3, show:'64/3', why:'6 − x² = x² − 2 ⇔ x² = 4 ⇔ x = ±2. En 0, 6 &gt; −2. A = ∫₋₂² (8 − 2x²) dx = [8x − 2x³/3]₋₂² = 2(16 − 16/3) = 64/3.'},
   {q:`Calcule l’aire de la région comprise entre ${y} = ${x} et ${y} = ${x}³ pour ${x} ∈ [0 ; 1].`, lab:'aire =', ans:0.25, show:'1/4', why:'Sur [0 ; 1], x ≥ x³ (test en 1/2 : 1/2 &gt; 1/8). A = ∫₀¹ (x − x³) dx = 1/2 − 1/4 = 1/4.'},
   {q:`Calcule l’aire comprise entre ${y} = √${x} et ${y} = ${x} (fraction acceptée).`, lab:'aire =', ans:1/6, show:'1/6', why:'√x = x ⇔ x = 0 ou 1. En 1/4 : √(1/4) = 1/2 &gt; 1/4. A = ∫₀¹ (√x − x) dx = 2/3 − 1/2 = 1/6.'},
   {q:`Quelle intégrale donne l’aire entre ${y} = ${x}² − 4${x} et ${y} = −${x} ?`, opts:['∫₀³ (3x − x²) dx','∫₀³ (x² − 3x) dx','∫₀⁴ (x² − 4x) dx','∫₋₃⁰ (3x − x²) dx'], ans:0, why:'x² − 4x = −x ⇔ x(x − 3) = 0 : bornes 0 et 3. En 1 : −1 &gt; −3, la droite est au-dessus. Haut − bas : −x − (x² − 4x) = 3x − x².'},
   {q:`Calcule l’aire entre ${y} = e<sup><i>x</i></sup> et ${y} = 1 pour ${x} ∈ [0 ; 1], arrondie au millième.`, lab:'aire ≈', ans:Math.E-2, tol:0.0006, show:'e − 2 ≈ 0,718', why:'Sur [0 ; 1], eˣ ≥ 1. A = ∫₀¹ (eˣ − 1) dx = (e − 1) − 1 = e − 2 ≈ 0,718.'},
   {q:`Calcule l’aire entre ${y} = sin ${x} et ${y} = cos ${x} pour ${x} ∈ [0 ; π/2], arrondie au centième.`, lab:'aire ≈', ans:2*Math.SQRT2-2, tol:0.006, show:'2√2 − 2 ≈ 0,83', why:'Les courbes se croisent en π/4 : on coupe. de 0 à π/4, ∫ (cos x − sin x) dx = [sin x + cos x] = √2 − 1 ; de π/4 à π/2, ∫ (sin x − cos x) dx = [−cos x − sin x] = √2 − 1. Total 2√2 − 2 ≈ 0,83.'},
 ]},
 {n:'Volumes de révolution', r:'Calculer un volume de révolution', qs:[
   {q:`On fait ${tourne} le segment ${y} = ${x}, ${x} ∈ [0 ; 3]. Calcule le volume du cône obtenu, arrondi au centième.`, lab:'V ≈', ans:9*Math.PI, tol:0.006, show:'9π ≈ 28,27', why:'V = π ∫₀³ x² dx = π · 27/3 = 9π ≈ 28,27. Contrôle : πr²h/3 = π · 9 · 3/3.'},
   {q:`On fait ${tourne} ${y} = ${x}², ${x} ∈ [0 ; 1]. Calcule le volume, arrondi au centième.`, lab:'V ≈', ans:Math.PI/5, tol:0.006, show:'π/5 ≈ 0,63', why:'V = π ∫₀¹ (x²)² dx = π ∫₀¹ x⁴ dx = π/5 ≈ 0,63.'},
   {q:`On fait ${tourne} ${y} = e<sup><i>x</i></sup>, ${x} ∈ [0 ; 1]. Calcule le volume, arrondi au centième.`, lab:'V ≈', ans:Math.PI*(Math.exp(2)-1)/2, tol:0.006, show:'π(e² − 1)/2 ≈ 10,04', why:'V = π ∫₀¹ e²ˣ dx = π [e²ˣ/2]₀¹ = π(e² − 1)/2 ≈ 10,04.'},
   {q:`On fait ${tourne} ${y} = 2 + ${x}, ${x} ∈ [0 ; 1]. Calcule le volume, arrondi au centième.`, lab:'V ≈', ans:19*Math.PI/3, tol:0.006, show:'19π/3 ≈ 19,90', why:'V = π ∫₀¹ (2 + x)² dx = π [(2 + x)³/3]₀¹ = π(27 − 8)/3 = 19π/3 ≈ 19,90.'},
   {q:`On fait ${tourne} ${y} = ${F('1','√'+x)}, ${x} ∈ [1 ; e]. Calcule le volume, arrondi au centième.`, lab:'V ≈', ans:Math.PI, tol:0.006, show:'π ≈ 3,14', why:'f(x)² = 1/x. V = π ∫₁ᵉ dx/x = π(ln e − ln 1) = π ≈ 3,14.'},
   {q:`Avec f(${x}) = √(9 − ${x}²), ${x} ∈ [−3 ; 3], on obtient une boule. Calcule son volume, arrondi au dixième.`, lab:'V ≈', ans:36*Math.PI, tol:0.06, show:'36π ≈ 113,1', why:'V = π ∫₋₃³ (9 − x²) dx = π[9x − x³/3]₋₃³ = π(18 + 18) = 36π ≈ 113,1, soit 4π · 3³/3.'},
   {q:`Pour le volume obtenu en faisant tourner le graphe de f ≥ 0 sur [<i>a</i> ; <i>b</i>] autour de O${x}, quelle formule est juste ?`, opts:['V = π (∫ₐᵇ f(x) dx)²','V = π ∫ₐᵇ f(x)² dx','V = 2π ∫ₐᵇ f(x) dx','V = ∫ₐᵇ π f(x) dx'], ans:1, why:'Chaque tranche est un disque de rayon f(x), d’aire π f(x)². Le carré porte sur f, à l’intérieur de l’intégrale.'},
 ]},
 {n:'Longueur d’un graphe', r:'Calculer la longueur d’un graphe', qs:[
   {q:'Quelle formule donne la longueur du graphe de f entre <i>a</i> et <i>b</i> ?', opts:['∫ₐᵇ (1 + f′(x)) dx','∫ₐᵇ √(1 + f(x)²) dx','∫ₐᵇ √(1 + f′(x)²) dx','√(∫ₐᵇ (1 + f′(x)²) dx)'], ans:2, why:'Un petit morceau a pour côtés dx et f′(x) dx : par Pythagore, sa longueur vaut √(1 + f′(x)²) dx. On somme ces longueurs.'},
   {q:`Calcule la longueur du graphe de f(${x}) = 3${x} + 1 pour ${x} ∈ [0 ; 2], arrondie au centième.`, lab:'L ≈', ans:2*Math.sqrt(10), tol:0.006, show:'2√10 ≈ 6,32', why:'f′ = 3 : L = ∫₀² √10 dx = 2√10 ≈ 6,32, la longueur du segment de (0 ; 1) à (2 ; 7).'},
   {q:`Calcule la longueur du graphe de f(${x}) = (2/3)${x}<sup>3/2</sup> pour ${x} ∈ [0 ; 8] (fraction acceptée).`, lab:'L =', ans:52/3, show:'52/3', why:'f′(x) = √x, donc √(1 + f′²) = (1 + x)<sup>1/2</sup>. L = [(2/3)(1 + x)<sup>3/2</sup>]₀⁸ = (2/3)(27 − 1) = 52/3.'},
   {q:`Calcule la longueur du graphe de f(${x}) = ${x}<sup>3/2</sup> pour ${x} ∈ [0 ; 4], arrondie au centième.`, lab:'L ≈', ans:8/27*(Math.pow(10,1.5)-1), tol:0.006, show:'(8/27)(10√10 − 1) ≈ 9,07', why:'1 + f′² = 1 + 9x/4. Primitive de (1 + 9x/4)<sup>1/2</sup> : (8/27)(1 + 9x/4)<sup>3/2</sup>. L = (8/27)(10<sup>3/2</sup> − 1) ≈ 9,07.'},
   {q:`Pour f(${x}) = ${F(x+'³','6')} + ${F('1','2'+x)}, on a 1 + f′(${x})² = (${F(x+'²','2')} + ${F('1','2'+x+'²')})². Calcule la longueur du graphe pour ${x} ∈ [1 ; 2] (fraction acceptée).`, lab:'L =', ans:17/12, show:'17/12', why:'La racine se simplifie : L = ∫₁² (x²/2 + 1/(2x²)) dx = [x³/6 − 1/(2x)]₁² = (8/6 − 1/4) − (1/6 − 1/2) = 17/12.'},
   {q:`Calcule la longueur du graphe de f(${x}) = (1/3)(${x}² + 2)<sup>3/2</sup> pour ${x} ∈ [0 ; 1] (fraction acceptée).`, lab:'L =', ans:4/3, show:'4/3', why:'f′(x) = x(x² + 2)<sup>1/2</sup>, donc 1 + f′² = 1 + 2x² + x⁴ = (x² + 1)². L = ∫₀¹ (x² + 1) dx = 4/3.'},
 ]},
 {n:'Longueur d’un arc paramétré', r:'Longueur d’un arc paramétré', qs:[
   {q:`Calcule la longueur de γ(${t}) = (1 + 3${t} ; 2 − 4${t}) pour ${t} ∈ [0 ; 2].`, lab:'L =', ans:10, why:'x′ = 3, y′ = −4 : |γ′| = √(9 + 16) = 5. L = ∫₀² 5 dt = 10.'},
   {q:`Calcule la longueur de γ(${t}) = (3 cos ${t} ; 3 sin ${t}) pour ${t} ∈ [0 ; π], arrondie au centième.`, lab:'L ≈', ans:3*Math.PI, tol:0.006, show:'3π ≈ 9,42', why:'x′² + y′² = 9 sin² t + 9 cos² t = 9, donc |γ′| = 3. L = 3π ≈ 9,42 : un demi-cercle de rayon 3.'},
   {q:`Calcule la longueur de γ(${t}) = (3${t}² ; 2${t}³) pour ${t} ∈ [0 ; 1], arrondie au centième.`, lab:'L ≈', ans:2*(2*Math.SQRT2-1), tol:0.006, show:'2(2√2 − 1) ≈ 3,66', why:'x′² + y′² = 36t² + 36t⁴ = 36t²(1 + t²), donc |γ′| = 6t√(1 + t²) (t ≥ 0). Forme u′u<sup>1/2</sup> : primitive 2(1 + t²)<sup>3/2</sup>. L = 2(2√2 − 1) ≈ 3,66.'},
   {q:`Calcule la longueur de γ(${t}) = (cos³ ${t} ; sin³ ${t}) pour ${t} ∈ [0 ; π/2].`, lab:'L =', ans:1.5, show:'3/2', why:'x′ = −3cos² t sin t, y′ = 3 sin² t cos t : x′² + y′² = 9 sin² t cos² t, donc |γ′| = 3 sin t cos t (positif ici). Primitive (3/2) sin² t : L = 3/2.'},
   {q:`Calcule la longueur de γ(${t}) = (e<sup><i>t</i></sup> cos ${t} ; e<sup><i>t</i></sup> sin ${t}) pour ${t} ∈ [0 ; 1], arrondie au centième.`, lab:'L ≈', ans:Math.SQRT2*(Math.E-1), tol:0.006, show:'√2(e − 1) ≈ 2,43', why:'x′ = eᵗ(cos t − sin t), y′ = eᵗ(sin t + cos t) : x′² + y′² = 2e²ᵗ, donc |γ′| = √2 eᵗ. L = √2(e − 1) ≈ 2,43.'},
 ]},
 {n:'Aire d’une surface de révolution', r:'Calculer l’aire d’une surface de révolution', qs:[
   {q:`On fait ${tourne} le segment ${y} = 2${x}, ${x} ∈ [0 ; 1]. Calcule l’aire de la surface, arrondie au centième.`, lab:'S ≈', ans:2*Math.PI*Math.sqrt(5), tol:0.006, show:'2π√5 ≈ 14,05', why:'f′ = 2 : S = 2π ∫₀¹ 2x√5 dx = 2π√5 · 1 = 2π√5 ≈ 14,05 (c’est πrℓ avec r = 2 et ℓ = √5).'},
   {q:`On fait ${tourne} ${y} = 3, ${x} ∈ [0 ; 2]. Calcule l’aire de la surface obtenue, arrondie au centième.`, lab:'S ≈', ans:12*Math.PI, tol:0.006, show:'12π ≈ 37,70', why:'f′ = 0 : S = 2π ∫₀² 3 dx = 12π ≈ 37,70, la surface latérale d’un cylindre de rayon 3 et de hauteur 2.'},
   {q:`Avec f(${x}) = √(4 − ${x}²), ${x} ∈ [−2 ; 2], on a f(${x})√(1 + f′(${x})²) = 2. Calcule l’aire de la sphère obtenue, arrondie au centième.`, lab:'S ≈', ans:16*Math.PI, tol:0.006, show:'16π ≈ 50,27', why:'S = 2π ∫₋₂² 2 dx = 2π · 2 · 4 = 16π ≈ 50,27, soit 4πR² avec R = 2.'},
   {q:`On fait ${tourne} ${y} = √${x}, ${x} ∈ [0 ; 6]. Calcule l’aire de la surface, arrondie au centième.`, lab:'S ≈', ans:62*Math.PI/3, tol:0.006, show:'62π/3 ≈ 64,93', why:'f√(1 + f′²) = √(x + 1/4). S = 2π · (2/3)[(x + 1/4)<sup>3/2</sup>]₀⁶ = (4π/3)(125/8 − 1/8) = 62π/3 ≈ 64,93.'},
   {q:`On fait ${tourne} ${y} = ${x}³, ${x} ∈ [0 ; 1]. Calcule l’aire de la surface, arrondie au centième.`, lab:'S ≈', ans:Math.PI/27*(Math.pow(10,1.5)-1), tol:0.006, show:'(π/27)(10√10 − 1) ≈ 3,56', why:'S = 2π ∫₀¹ x³√(1 + 9x⁴) dx. Forme u′u<sup>1/2</sup> avec u = 1 + 9x⁴, u′ = 36x³ : primitive (1/36)(2/3)u<sup>3/2</sup>. S = (π/27)(10<sup>3/2</sup> − 1) ≈ 3,56.'},
 ]},
];
})();
