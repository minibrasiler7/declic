/* Déclic — examen de compétence : Dérivées des fonctions trigonométriques */
(()=>{
EXAMS['an2-derivees']=[
 {n:'Limites avec sin u / u', r:'Faire apparaître sin u / u', qs:[
   {q:'Calcule lim<sub><i>x</i>→0</sub> sin(7<i>x</i>)/<i>x</i>.', lab:'limite =', ans:7, tol:.001, why:'sin(7x)/x = 7 · sin(7x)/(7x). Avec u = 7x → 0, sin u/u → 1 : la limite vaut 7.'},
   {q:'Calcule lim<sub><i>x</i>→0</sub> sin(2<i>x</i>)/(5<i>x</i>).', lab:'limite =', ans:.4, tol:.001, show:'2/5', why:'sin(2x)/(5x) = (2/5) · sin(2x)/(2x) → 2/5 = 0,4.'},
   {q:'Calcule lim<sub><i>x</i>→0</sub> tan(3<i>x</i>)/<i>x</i>.', lab:'limite =', ans:3, tol:.001, why:'tan(3x)/x = 3 · [sin(3x)/(3x)] · [1/cos(3x)]. Les deux crochets tendent vers 1 : la limite vaut 3.'},
   {q:'Calcule lim<sub><i>x</i>→0</sub> sin(3<i>x</i>)/sin(9<i>x</i>). Une fraction est acceptée.', lab:'limite =', ans:1/3, tol:.001, show:'1/3', why:'sin(3x)/sin(9x) = [sin(3x)/(3x)] · [(9x)/sin(9x)] · (3x)/(9x). Les crochets tendent vers 1, il reste 3/9 = 1/3.'},
   {q:'En utilisant 1 − cos <i>u</i> = 2 sin²(<i>u</i>/2), calcule lim<sub><i>x</i>→0</sub> (1 − cos 2<i>x</i>)/<i>x</i>².', lab:'limite =', ans:2, tol:.001, why:'Avec u = 2x : 1 − cos 2x = 2 sin²x, donc (1 − cos 2x)/x² = 2 (sin x/x)² → 2.'},
   {q:'Calcule lim<sub><i>x</i>→0</sub> <i>x</i>/sin(<i>x</i>/2).', lab:'limite =', ans:2, tol:.001, why:'x/sin(x/2) = 2 · (x/2)/sin(x/2). Avec u = x/2 → 0, u/sin u → 1 : la limite vaut 2.'},
   {q:'Que vaut lim<sub><i>x</i>→0</sub> sin(<i>x</i>²)/<i>x</i>&nbsp;?', opts:['1','0','+∞','2'], ans:1, why:'sin(x²)/x = x · sin(x²)/x². Avec u = x² → 0, sin u/u → 1, et le facteur x tend vers 0 : la limite vaut 0.'},
 ]},
 {n:'Dérivées de sin, cos et tan', r:'La pente de sin, c’est cos', qs:[
   {q:'<i>f</i>(<i>x</i>) = 3 sin <i>x</i> − 2 cos <i>x</i>. Calcule <i>f</i> ′(π/2).', lab:'f ′(π/2) =', ans:2, tol:.001, why:'f ′(x) = 3 cos x + 2 sin x. En π/2 : 0 + 2 · 1 = 2.'},
   {q:'Quelle est la pente de la tangente au graphe de cos au point d’abscisse π/6&nbsp;?', lab:'pente =', ans:-.5, tol:.001, why:'(cos x)′ = −sin x, donc la pente vaut −sin(π/6) = −1/2.'},
   {q:'Calcule la dérivée de tan en π/3.', lab:'tan ′(π/3) =', ans:4, tol:.001, why:'(tan x)′ = 1 + tan²x. En π/3 : 1 + (√3)² = 4.'},
   {q:'Quelle est la dérivée de <i>x</i> ↦ cos <i>x</i>&nbsp;?', opts:['sin x','−sin x','−cos x','1/cos² x'], ans:1, why:'(cos x)′ = −sin x : en 0, cos est maximal et sa pente est nulle, puis elle devient négative.'},
   {q:'En combien de points de [0 ; 2π] la tangente au graphe de sin est-elle horizontale&nbsp;?', lab:'nombre =', ans:2, tol:.01, why:'La pente vaut cos x, nulle pour x = π/2 et x = 3π/2 dans [0 ; 2π].'},
 ]},
 {n:'Produits, quotients et composées', r:'Dériver produits, quotients et composées trigonométriques', qs:[
   {q:'<i>f</i>(<i>x</i>) = <i>x</i> sin <i>x</i>. Calcule <i>f</i> ′(π/2).', lab:'f ′(π/2) =', ans:1, tol:.001, why:'Produit : f ′(x) = sin x + x cos x. En π/2 : 1 + (π/2) · 0 = 1.'},
   {q:'<i>g</i>(<i>x</i>) = sin(4<i>x</i>). Calcule <i>g</i> ′(π/12).', lab:'g ′(π/12) =', ans:2, tol:.001, why:'Règle de chaîne : g ′(x) = 4 cos(4x). En π/12 : 4 cos(π/3) = 4 · ½ = 2.'},
   {q:'<i>h</i>(<i>x</i>) = cos³<i>x</i>. Calcule <i>h</i> ′(π/4), arrondi au millième.', lab:'h ′(π/4) =', ans:-1.061, tol:.0006, why:'h = u³ avec u = cos x : h ′(x) = 3u′u² = −3 sin x cos²x. En π/4 : −3 · (√2/2) · ½ = −3√2/4 ≈ −1,061.'},
   {q:'<i>k</i>(<i>x</i>) = 1/sin <i>x</i>. Calcule <i>k</i> ′(π/6), arrondi au millième.', lab:'k ′(π/6) =', ans:-3.464, tol:.0006, why:'(1/u)′ = −u′/u² : k ′(x) = −cos x / sin²x. En π/6 : −(√3/2)/(1/4) = −2√3 ≈ −3,464.'},
   {q:'<i>q</i>(<i>x</i>) = sin <i>x</i> / <i>x</i>. Calcule <i>q</i> ′(π), arrondi au millième.', lab:'q ′(π) =', ans:-.318, tol:.0006, why:'Quotient : q ′(x) = (x cos x − sin x)/x². En π : (−π − 0)/π² = −1/π ≈ −0,318.'},
   {q:'Quelle est la dérivée de <i>x</i> ↦ sin(<i>x</i>²)&nbsp;?', opts:['cos(x²)','2x cos(x²)','2 cos(2x)','cos(2x)'], ans:1, why:'Règle de chaîne avec u = x² : (sin u)′ = u′ cos u = 2x cos(x²). Il ne faut pas oublier la dérivée de l’intérieur.'},
   {q:'<i>f</i>(<i>x</i>) = tan(2<i>x</i>). Calcule <i>f</i> ′(π/8).', lab:'f ′(π/8) =', ans:4, tol:.001, why:'f ′(x) = 2(1 + tan²(2x)). En π/8 : 2(1 + tan²(π/4)) = 2 · 2 = 4.'},
 ]},
 {n:'Dérivées de arctan, arcsin et arccos', r:'Dérivées des réciproques', qs:[
   {q:'Calcule la dérivée de arctan en 2.', lab:'arctan ′(2) =', ans:.2, tol:.001, why:'(arctan x)′ = 1/(1 + x²). En 2 : 1/5 = 0,2.'},
   {q:'Calcule la dérivée de arcsin en 1/2, arrondie au millième.', lab:'arcsin ′(1/2) =', ans:1.155, tol:.0006, why:'(arcsin x)′ = 1/√(1 − x²). En 1/2 : 1/√(3/4) = 2/√3 ≈ 1,155.'},
   {q:'<i>f</i>(<i>x</i>) = arctan(3<i>x</i>). Calcule <i>f</i> ′(1).', lab:'f ′(1) =', ans:.3, tol:.001, why:'Règle de chaîne avec u = 3x : f ′(x) = 3/(1 + 9x²). En 1 : 3/10 = 0,3.'},
   {q:'Calcule la dérivée de arccos en 0.', lab:'arccos ′(0) =', ans:-1, tol:.001, why:'(arccos x)′ = −1/√(1 − x²). En 0 : −1/1 = −1.'},
   {q:'<i>g</i>(<i>x</i>) = arcsin(<i>x</i>²). Calcule <i>g</i> ′(1/2), arrondi au millième.', lab:'g ′(1/2) =', ans:1.033, tol:.0006, why:'g ′(x) = 2x/√(1 − x⁴). En 1/2 : 1/√(15/16) = 4/√15 ≈ 1,033.'},
   {q:'<i>h</i>(<i>x</i>) = <i>x</i> arctan <i>x</i>. Calcule <i>h</i> ′(1), arrondi au millième.', lab:'h ′(1) =', ans:1.285, tol:.0006, why:'Produit : h ′(x) = arctan x + x/(1 + x²). En 1 : π/4 + 1/2 ≈ 1,285.'},
 ]},
 {n:'Chercher un extremum', r:'Chercher un extremum avec la dérivée', qs:[
   {q:'Quelle est la plus grande valeur de <i>f</i>(<i>x</i>) = sin <i>x</i> + cos <i>x</i> sur [0 ; π/2]&nbsp;? Arrondis au millième.', lab:'maximum =', ans:1.414, tol:.0006, why:'f ′(x) = cos x − sin x s’annule en π/4, positive avant, négative après. f(π/4) = √2 ≈ 1,414, plus grand que f(0) = f(π/2) = 1.'},
   {q:'Quelle est la plus grande valeur de <i>f</i>(<i>x</i>) = <i>x</i> + 2 sin <i>x</i> sur [0 ; π]&nbsp;? Arrondis au millième.', lab:'maximum =', ans:3.826, tol:.0006, why:'f ′(x) = 1 + 2 cos x = 0 pour cos x = −1/2, soit x = 2π/3. f ′ &gt; 0 avant, &lt; 0 après : f(2π/3) = 2π/3 + √3 ≈ 3,826, plus grand que f(π) = π.'},
   {q:'Quelle est la plus grande valeur de <i>f</i>(<i>x</i>) = 2<i>x</i> − tan <i>x</i> sur [0 ; π/2[&nbsp;? Arrondis au millième.', lab:'maximum =', ans:.571, tol:.0006, why:'f ′(x) = 2 − (1 + tan²x) = 1 − tan²x s’annule en π/4 et passe de + à −. f(π/4) = π/2 − 1 ≈ 0,571.'},
   {q:'Quelle est la plus grande valeur de <i>f</i>(<i>x</i>) = 2 cos <i>x</i> + sin 2<i>x</i> sur [0 ; π/2]&nbsp;? Arrondis au millième.', lab:'maximum =', ans:2.598, tol:.0006, why:'f ′(x) = −2 sin x + 2 cos 2x = 2(1 − sin x − 2sin²x). Avec t = sin x : 2t² + t − 1 = 0, t = 1/2 (ou −1). En π/6 : f = √3 + √3/2 = 3√3/2 ≈ 2,598, contre f(0) = 2 et f(π/2) = 0.'},
   {q:'En <i>x</i>₀, <i>f</i> ′ s’annule et passe d’un signe négatif à un signe positif. Que peux-tu dire&nbsp;?', opts:['f a un maximum local en x₀','f a un minimum local en x₀','f n’a pas d’extremum en x₀','f(x₀) = 0'], ans:1, why:'f descend avant x₀ (f ′ &lt; 0) et monte après (f ′ &gt; 0) : f(x₀) est un minimum local.'},
 ]},
];
})();
