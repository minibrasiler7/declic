/* Déclic — examen de compétence : Représentations des complexes */
(()=>{
EXAMS['an2-representations']=[
 {n:'De la forme polaire à a + bi', r:'Forme polaire', qs:[
   {q:'Soit <i>z</i> = 4e<sup>2iπ/3</sup>. Calcule la partie réelle de <i>z</i>.', lab:'Re z =', ans:-2, tol:.001, why:'Re <i>z</i> = <i>r</i> cos θ = 4 cos(2π/3) = 4 · (−1/2) = −2. Et Im <i>z</i> = 4 sin(2π/3) = 2√3.'},
   {q:'Soit <i>z</i> = 6e<sup>−iπ/4</sup>. Calcule la partie imaginaire de <i>z</i>, arrondie au centième.', lab:'Im z =', ans:-4.24, tol:.006, why:'Im <i>z</i> = 6 sin(−π/4) = −6 · √2/2 = −3√2 ≈ −4,24.'},
   {q:'Que vaut 2e<sup>iπ</sup>&nbsp;?', opts:['2','−2','2i','−2i'], ans:1, why:'e<sup>iπ</sup> = cos π + i sin π = −1, donc 2e<sup>iπ</sup> = −2 : le point est à distance 2 de l’origine, sur l’axe réel négatif.'},
 ]},
 {n:'Trouver module et argument', r:'De a + bi à la forme polaire', qs:[
   {q:'Calcule le module de 2√3 − 2i.', lab:'r =', ans:4, tol:.001, why:'<i>r</i> = √(12 + 4) = √16 = 4.'},
   {q:'Quel est l’argument de −3 + 3i, en degrés, choisi dans ]−180° ; 180°]&nbsp;?', lab:'θ =', unit:'°', ans:135, tol:.001, why:'<i>r</i> = 3√2, cos θ = −√2/2 et sin θ = √2/2 : 2e quadrant, θ = 135°. La calculatrice donne arctan(−1) = −45°, à corriger de +180°.'},
   {q:'Quel est l’argument de 1 − i√3, en degrés, choisi dans ]−180° ; 180°]&nbsp;?', lab:'θ =', unit:'°', ans:-60, tol:.001, why:'<i>r</i> = 2, cos θ = 1/2 et sin θ = −√3/2 &lt; 0 : 4e quadrant, θ = −60°.'},
   {q:'Quel est l’argument de −5, en degrés, choisi dans ]−180° ; 180°]&nbsp;?', lab:'θ =', unit:'°', ans:180, tol:.001, why:'−5 = 5(cos 180° + i sin 180°) : cos θ = −1 et sin θ = 0, donc θ = 180°.'},
   {q:'Quelle est la forme polaire de −√3 − i&nbsp;?', opts:['2e<sup>iπ/6</sup>','2e<sup>5iπ/6</sup>','2e<sup>−5iπ/6</sup>','4e<sup>−5iπ/6</sup>'], ans:2, why:'<i>r</i> = √(3 + 1) = 2, cos θ = −√3/2 et sin θ = −1/2 : 3e quadrant, θ = −5π/6. Le sinus négatif écarte 5π/6.'},
 ]},
 {n:'Produits et quotients en polaire', r:'Multiplier et diviser en forme polaire', qs:[
   {q:'Quel est l’argument de (√3 + i)/(1 − i), en degrés&nbsp;?', lab:'θ =', unit:'°', ans:75, tol:.001, why:'arg(√3 + i) = 30° et arg(1 − i) = −45°. Les arguments se soustraient : 30° − (−45°) = 75°.'},
   {q:'Calcule le module de (√3 + i)/(1 − i), arrondi au centième.', lab:'module =', ans:1.41, tol:.006, why:'|√3 + i| = 2 et |1 − i| = √2, donc le module vaut 2/√2 = √2 ≈ 1,41.'},
   {q:'Quel est l’argument de (1 + i√3)(−1 + i), en degrés, choisi dans ]−180° ; 180°]&nbsp;?', lab:'θ =', unit:'°', ans:-165, tol:.001, why:'arg(1 + i√3) = 60° et arg(−1 + i) = 135°. La somme 195° sort de l’intervalle : 195° − 360° = −165°.'},
   {q:'Calcule 3e<sup>iπ/5</sup> · 2e<sup>4iπ/5</sup> (c’est un réel).', lab:'produit =', ans:-6, tol:.001, why:'Modules multipliés : 3 · 2 = 6. Arguments additionnés : π/5 + 4π/5 = π. Le produit vaut 6e<sup>iπ</sup> = −6.'},
 ]},
 {n:'Puissances avec Moivre', r:'Une puissance avec Moivre', qs:[
   {q:'Calcule (1 − i√3)⁶.', lab:'(1 − i√3)⁶ =', ans:64, tol:.001, why:'1 − i√3 = 2e<sup>−iπ/3</sup>, donc (1 − i√3)⁶ = 2⁶ e<sup>−2iπ</sup> = 64.'},
   {q:'Calcule la partie réelle de (√3 + i)⁴.', lab:'Re =', ans:-8, tol:.001, why:'√3 + i = 2e<sup>iπ/6</sup>, donc (√3 + i)⁴ = 16e<sup>2iπ/3</sup> = 16(−1/2 + i√3/2) = −8 + 8√3 i.'},
   {q:'Calcule (−1 + i)¹⁰ (c’est un imaginaire pur). Que vaut sa partie imaginaire&nbsp;?', lab:'Im =', ans:-32, tol:.001, why:'−1 + i = √2 e<sup>3iπ/4</sup>, donc (−1 + i)¹⁰ = (√2)¹⁰ e<sup>30iπ/4</sup> = 32e<sup>15iπ/2</sup>. Or 15π/2 − 8π = −π/2, donc le résultat vaut 32e<sup>−iπ/2</sup> = −32i.'},
   {q:'Quel est le plus petit entier <i>n</i> ≥ 1 tel que (√3 + i)<sup><i>n</i></sup> soit un imaginaire pur&nbsp;?', lab:'n =', ans:3, tol:.001, why:'(√3 + i)<sup><i>n</i></sup> = 2<sup><i>n</i></sup>e<sup>i<i>n</i>π/6</sup> est imaginaire pur quand <i>n</i>π/6 = π/2 + <i>k</i>π, soit <i>n</i> = 3 + 6<i>k</i>. Le plus petit est 3 : (√3 + i)³ = 8i.'},
 ]},
 {n:'Formules trigonométriques par Moivre', r:'Des formules trigonométriques par Moivre', qs:[
   {q:'On note <i>c</i> = cos θ et <i>s</i> = sin θ. En développant (<i>c</i> + i<i>s</i>)⁴ avec Moivre, la partie réelle donne…', opts:['cos 4θ = <i>c</i>⁴ + 6<i>c</i>²<i>s</i>² + <i>s</i>⁴','cos 4θ = <i>c</i>⁴ − 6<i>c</i>²<i>s</i>² + <i>s</i>⁴','cos 4θ = <i>c</i>⁴ − <i>s</i>⁴','cos 4θ = 4<i>c</i>³<i>s</i> − 4<i>c</i><i>s</i>³'], ans:1, why:'Binôme 1, 4, 6, 4, 1 : (<i>c</i> + i<i>s</i>)⁴ = <i>c</i>⁴ + 4i<i>c</i>³<i>s</i> − 6<i>c</i>²<i>s</i>² − 4i<i>c</i><i>s</i>³ + <i>s</i>⁴. Les termes réels donnent cos 4θ = <i>c</i>⁴ − 6<i>c</i>²<i>s</i>² + <i>s</i>⁴ ; 4<i>c</i>³<i>s</i> − 4<i>c</i><i>s</i>³ est sin 4θ.'},
   {q:'On sait que cos θ = 0,6 et sin θ = 0,8. En développant (cos θ + i sin θ)³, calcule sin 3θ.', lab:'sin 3θ =', ans:.352, tol:.0006, why:'La partie imaginaire de (<i>c</i> + i<i>s</i>)³ est 3<i>c</i>²<i>s</i> − <i>s</i>³, donc sin 3θ = 3 · 0,36 · 0,8 − 0,512 = 0,864 − 0,512 = 0,352.'},
   {q:'On sait que cos 4θ = 8cos⁴ θ − 8cos² θ + 1. Calcule cos 4θ quand cos θ = 0,5.', lab:'cos 4θ =', ans:-.5, tol:.001, why:'8 · 0,0625 − 8 · 0,25 + 1 = 0,5 − 2 + 1 = −0,5. Contrôle : θ = 60° donne 4θ = 240° et cos 240° = −0,5.'},
 ]},
 {n:'Linéariser avec Euler', r:'Linéariser avec les formules d’Euler', qs:[
   {q:'Laquelle de ces formules est juste pour tout réel θ&nbsp;?', opts:['sin θ = (e<sup>iθ</sup> − e<sup>−iθ</sup>)/2','sin θ = (e<sup>iθ</sup> + e<sup>−iθ</sup>)/(2i)','sin θ = (e<sup>iθ</sup> − e<sup>−iθ</sup>)/(2i)','sin θ = (e<sup>−iθ</sup> − e<sup>iθ</sup>)/(2i)'], ans:2, why:'e<sup>iθ</sup> − e<sup>−iθ</sup> = (cos θ + i sin θ) − (cos θ − i sin θ) = 2i sin θ. On divise par 2i.'},
   {q:'On linéarise : sin² θ = <i>a</i> + <i>b</i> cos 2θ. Que vaut <i>b</i>&nbsp;?', lab:'b =', ans:-.5, tol:.001, why:'sin² θ = (e<sup>iθ</sup> − e<sup>−iθ</sup>)²/(2i)² = (e<sup>2iθ</sup> − 2 + e<sup>−2iθ</sup>)/(−4) = (2 − 2 cos 2θ)/4 = 1/2 − (1/2) cos 2θ.'},
   {q:'On linéarise : cos⁴ θ = <i>a</i> cos 4θ + <i>b</i> cos 2θ + <i>c</i>. Que vaut <i>c</i>&nbsp;?', lab:'c =', ans:.375, tol:.0006, show:'3/8', why:'cos⁴ θ = (e<sup>iθ</sup> + e<sup>−iθ</sup>)⁴/16 = (e<sup>4iθ</sup> + 4e<sup>2iθ</sup> + 6 + 4e<sup>−2iθ</sup> + e<sup>−4iθ</sup>)/16 = (2 cos 4θ + 8 cos 2θ + 6)/16. Donc <i>c</i> = 6/16 = 3/8.'},
 ]},
 {n:'Module d’une somme d’exponentielles', r:'Le module d’une somme d’exponentielles', qs:[
   {q:'Calcule |1 + e<sup>2iπ/3</sup>|.', lab:'module =', ans:1, tol:.001, why:'|1 + e<sup>iθ</sup>|² = (1 + cos θ)² + sin² θ = 2 + 2 cos θ = 2 − 1 = 1 pour θ = 2π/3. Le module vaut 1 (ou 2|cos(π/3)| = 1).'},
   {q:'Calcule |3 + 4e<sup>iπ/3</sup>|, arrondi au centième.', lab:'module =', ans:6.08, tol:.006, why:'|3 + 4 cos β + 4i sin β|² = 9 + 24 cos β + 16 = 25 + 24 · 1/2 = 37 pour β = π/3. Le module vaut √37 ≈ 6,08.'},
   {q:'Soit <i>z</i> = 2e<sup>iα</sup> + e<sup>i(α+β)</sup>. Son module…', opts:['dépend de α et de β','ne dépend que de β','ne dépend que de α','vaut toujours 3'], ans:1, why:'<i>z</i> = e<sup>iα</sup>(2 + e<sup>iβ</sup>) et |e<sup>iα</sup>| = 1, donc |<i>z</i>| = |2 + e<sup>iβ</sup>| = √(5 + 4 cos β) : seul β compte.'},
 ]},
 {n:'Complexes et matrices', r:'Des complexes en matrices', qs:[
   {q:'Quelle matrice représente <i>z</i> = −1 + 4i&nbsp;?', opts:[mat([['−1',4],['−4','−1']]),mat([['−1','−4'],[4,'−1']]),mat([['−1','−4'],['−4','−1']]),mat([[4,'−1'],['−1',4]])], ans:1, why:'Avec <i>a</i> = −1 et <i>b</i> = 4, la forme [[<i>a</i>, −<i>b</i>], [<i>b</i>, <i>a</i>]] donne [[−1, −4], [4, −1]].'},
   {q:'Calcule le déterminant de M(2 − 5i).', lab:'det =', ans:29, tol:.001, why:'det M(<i>z</i>) = <i>a</i>² + <i>b</i>² = |<i>z</i>|² = 4 + 25 = 29.'},
   {q:'Soient <i>z</i> = 2 + i et <i>w</i> = 1 − 3i. Quel est le coefficient en bas à gauche de M(<i>z</i>)·M(<i>w</i>)&nbsp;?', lab:'coefficient =', ans:-5, tol:.001, why:'M(<i>z</i>)M(<i>w</i>) = M(<i>zw</i>) et <i>zw</i> = 2 − 6i + i + 3 = 5 − 5i. La matrice est [[5, 5], [−5, 5]] : en bas à gauche, <i>b</i> = −5.'},
   {q:'Soit <i>z</i> = 1 + i. Quel est le coefficient en haut à droite de M(<i>z</i>)²&nbsp;?', lab:'coefficient =', ans:-2, tol:.001, why:'M(<i>z</i>)² = M(<i>z</i>²) et (1 + i)² = 2i. La matrice est [[0, −2], [2, 0]] : en haut à droite, −<i>b</i> = −2.'},
 ]},
];
})();
