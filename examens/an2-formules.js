/* Déclic — examen de compétence : Formules trigonométriques */
(()=>{
EXAMS['an2-formules']=[
 {n:'Relation fondamentale et quadrant', r:'Du cosinus au sinus (et à la tangente)', qs:[
   {q:'On sait que cos <i>x</i> = 0,8 et <i>x</i> ∈ [3π/2 ; 2π]. Combien vaut sin <i>x</i>&nbsp;?', lab:'sin x =', ans:-.6, tol:.001, why:'sin²x = 1 − 0,64 = 0,36, donc sin x = ±0,6. Dans le 4e quadrant, le sinus est négatif : sin x = −0,6.'},
   {q:'On sait que sin <i>x</i> = −5/13 et <i>x</i> ∈ [π ; 3π/2]. Combien vaut tan <i>x</i>&nbsp;?', lab:'tan x =', ans:5/12, tol:.001, show:'5/12', why:'cos²x = 1 − 25/169 = 144/169. Dans le 3e quadrant, cos x = −12/13. tan x = (−5/13)/(−12/13) = 5/12.'},
   {q:'On sait que tan <i>x</i> = 2 et <i>x</i> ∈ [0 ; π/2[. Combien vaut cos <i>x</i>&nbsp;? Arrondis au millième.', lab:'cos x =', ans:.447, tol:.0006, why:'1 + tan²x = 1/cos²x donne cos²x = 1/5. Dans le 1er quadrant, cos x = 1/√5 ≈ 0,447.'},
   {q:'On sait que cos <i>x</i> = −1/3 et <i>x</i> ∈ [π/2 ; π]. Combien vaut sin <i>x</i>&nbsp;?', opts:['−2√2/3','2/3','√2/3','2√2/3'], ans:3, why:'sin²x = 1 − 1/9 = 8/9, donc sin x = ±2√2/3. Dans le 2e quadrant, le sinus est positif : 2√2/3.'},
   {q:'Peut-on avoir sin <i>x</i> = 0,6 et cos <i>x</i> = 0,7 pour un même <i>x</i>&nbsp;?', opts:['Oui, les deux valeurs sont entre −1 et 1','Non, car 0,6² + 0,7² ≠ 1','Oui, si x est dans le 1er quadrant','Non, car 0,6 + 0,7 &gt; 1'], ans:1, why:'Il faudrait sin²x + cos²x = 1. Or 0,36 + 0,49 = 0,85 ≠ 1 : impossible.'},
 ]},
 {n:'Formules d’addition et valeurs exactes', r:'Une valeur exacte par décomposition', qs:[
   {q:'Quelle est la valeur exacte de sin 75°&nbsp;?', opts:['(√6 − √2)/4','(√6 + √2)/4','(√3 + 1)/2','√3/4'], ans:1, why:'sin(45° + 30°) = sin 45° cos 30° + cos 45° sin 30° = √6/4 + √2/4 = (√6 + √2)/4 ≈ 0,966.'},
   {q:'Quelle est la valeur exacte de cos(7π/12)&nbsp;? (7π/12 = π/3 + π/4)', opts:['(√6 + √2)/4','(√6 − √2)/4','(√2 − √6)/4','−√2/4'], ans:2, why:'cos(π/3 + π/4) = cos(π/3)cos(π/4) − sin(π/3)sin(π/4) = √2/4 − √6/4 = (√2 − √6)/4 ≈ −0,259.'},
   {q:'Quelle est la valeur exacte de tan 15°&nbsp;?', opts:['2 − √3','2 + √3','√3 − 1','(√6 − √2)/4'], ans:0, why:'tan(45° − 30°) = (1 − √3/3)/(1 + √3/3) = (3 − √3)/(3 + √3) = (3 − √3)²/6 = (12 − 6√3)/6 = 2 − √3 ≈ 0,268.'},
   {q:'On donne sin <i>a</i> = 3/5, cos <i>a</i> = 4/5, sin <i>b</i> = 5/13 et cos <i>b</i> = 12/13. Calcule sin(<i>a</i> + <i>b</i>).', lab:'sin(a + b) =', ans:56/65, tol:.001, show:'56/65', why:'sin(a + b) = sin a cos b + cos a sin b = 36/65 + 20/65 = 56/65.'},
   {q:'On donne sin <i>a</i> = 3/5, cos <i>a</i> = 4/5, sin <i>b</i> = 5/13 et cos <i>b</i> = 12/13. Calcule cos(<i>a</i> − <i>b</i>).', lab:'cos(a − b) =', ans:63/65, tol:.001, show:'63/65', why:'Pour une différence, le signe devient plus : cos(a − b) = cos a cos b + sin a sin b = 48/65 + 15/65 = 63/65.'},
 ]},
 {n:'Angle double', r:'Angle double et linéarisation', qs:[
   {q:'On sait que sin <i>x</i> = 1/4. Calcule cos 2<i>x</i>.', lab:'cos 2x =', ans:.875, tol:.001, show:'7/8', why:'cos 2x = 1 − 2sin²x = 1 − 2/16 = 7/8.'},
   {q:'On sait que sin <i>x</i> = 3/5 et <i>x</i> ∈ [π/2 ; π]. Calcule sin 2<i>x</i>.', lab:'sin 2x =', ans:-.96, tol:.001, why:'Dans le 2e quadrant, cos x = −4/5. sin 2x = 2 sin x cos x = 2 · (3/5) · (−4/5) = −24/25 = −0,96.'},
   {q:'Laquelle de ces expressions est égale à cos²<i>x</i> − sin²<i>x</i>&nbsp;?', opts:['1 − 2cos²x','2sin²x − 1','2cos²x − 1','1'], ans:2, why:'C’est cos 2x, qui vaut aussi 2cos²x − 1 (en remplaçant sin²x par 1 − cos²x) ou 1 − 2sin²x.'},
   {q:'On sait que cos <i>a</i> = −2/3. Calcule cos 2<i>a</i>.', lab:'cos 2a =', ans:-1/9, tol:.001, show:'−1/9', why:'cos 2a = 2cos²a − 1 = 2 · 4/9 − 1 = −1/9. Le signe de cos a disparaît dans le carré.'},
   {q:'Calcule sin 15° · cos 15° sans calculatrice.', lab:'valeur =', ans:.25, tol:.001, why:'sin a cos a = ½ sin 2a, donc sin 15° cos 15° = ½ sin 30° = ½ · ½ = 1/4.'},
 ]},
 {n:'Linéariser les carrés', r:'Linéariser sin² et cos²', qs:[
   {q:'Avec la linéarisation, calcule cos²(π/8). Arrondis au dix-millième.', lab:'cos²(π/8) =', ans:.8536, tol:.00006, why:'cos²(π/8) = (1 + cos(π/4))/2 = (1 + √2/2)/2 = (2 + √2)/4 ≈ 0,8536.'},
   {q:'Quelle est la forme linéarisée de sin²(2<i>x</i>)&nbsp;?', opts:['(1 + cos 4x)/2','(1 − cos 2x)/2','(1 − cos 4x)/2','1 − cos 4x'], ans:2, why:'sin²a = (1 − cos 2a)/2 avec a = 2x : sin²(2x) = (1 − cos 4x)/2.'},
   {q:'Avec la linéarisation, calcule sin²(π/12). Arrondis au dix-millième.', lab:'sin²(π/12) =', ans:.067, tol:.00006, why:'sin²(π/12) = (1 − cos(π/6))/2 = (1 − √3/2)/2 = (2 − √3)/4 ≈ 0,0670.'},
   {q:'Quelle est la forme linéarisée de sin(3<i>x</i>) cos(3<i>x</i>)&nbsp;?', opts:['½ sin 6x','2 sin 6x','½ sin 3x','(1 − cos 6x)/2'], ans:0, why:'sin a cos a = ½ sin 2a avec a = 3x : ½ sin 6x.'},
 ]},
 {n:'Transformer une somme en produit', r:'Factoriser une somme de sinus ou de cosinus', qs:[
   {q:'Écris sin 3<i>x</i> + sin <i>x</i> sous forme de produit.', opts:['2 cos 2x sin x','2 sin 2x cos x','2 sin 4x cos 2x','2 sin 2x sin x'], ans:1, why:'p = 3x, q = x : demi-somme 2x, demi-différence x. sin p + sin q = 2 sin((p + q)/2) cos((p − q)/2) = 2 sin 2x cos x.'},
   {q:'Écris cos 5<i>x</i> − cos <i>x</i> sous forme de produit.', opts:['2 sin 3x sin 2x','−2 cos 3x cos 2x','2 cos 3x sin 2x','−2 sin 3x sin 2x'], ans:3, why:'Demi-somme 3x, demi-différence 2x, et cos p − cos q = −2 sin((p + q)/2) sin((p − q)/2) = −2 sin 3x sin 2x.'},
   {q:'Écris cos 5<i>x</i> + cos 3<i>x</i> sous forme de produit.', opts:['2 cos 4x cos x','2 cos 8x cos 2x','2 sin 4x sin x','2 cos 4x cos 2x'], ans:0, why:'(5x + 3x)/2 = 4x et (5x − 3x)/2 = x, donc cos 5x + cos 3x = 2 cos 4x cos x.'},
   {q:'Calcule sin 75° + sin 15° avec une formule somme-produit. Arrondis au dix-millième.', lab:'valeur =', ans:1.2247, tol:.00006, why:'sin 75° + sin 15° = 2 sin 45° cos 30° = 2 · (√2/2) · (√3/2) = √6/2 ≈ 1,2247.'},
   {q:'Calcule cos 75° − cos 15° avec une formule somme-produit. Arrondis au dix-millième.', lab:'valeur =', ans:-.7071, tol:.00006, why:'cos 75° − cos 15° = −2 sin 45° sin 30° = −2 · (√2/2) · (1/2) = −√2/2 ≈ −0,7071.'},
 ]},
 {n:'Écrire a cos x + b sin x = R cos(x − φ)', r:'Écrire a cos x + b sin x = R cos(x − φ)', qs:[
   {q:'Quelle est la plus petite valeur de 8 cos <i>x</i> − 15 sin <i>x</i>&nbsp;?', lab:'minimum =', ans:-17, tol:.001, why:'R = √(64 + 225) = 17, et l’expression vaut 17 cos(x − φ), qui varie entre −17 et 17.'},
   {q:'Laquelle de ces écritures est égale à cos <i>x</i> + sin <i>x</i>&nbsp;?', opts:['2 cos(x − π/4)','√2 cos(x + π/4)','√2 cos(x − π/4)','cos(x − π/4)'], ans:2, why:'R = √(1 + 1) = √2, cos φ = sin φ = 1/√2 = √2/2, donc φ = π/4 : cos x + sin x = √2 cos(x − π/4).'},
   {q:'Laquelle de ces écritures est égale à −cos <i>x</i> + √3 sin <i>x</i>&nbsp;?', opts:['2 cos(x + π/3)','2 cos(x − π/3)','2 cos(x + 2π/3)','2 cos(x − 2π/3)'], ans:3, why:'R = 2, cos φ = −1/2 et sin φ = √3/2 : φ est dans le 2e quadrant, φ = 2π/3. arctan(b/a) = −π/3 donnerait le mauvais quadrant, car a &lt; 0.'},
   {q:'On écrit 3 cos <i>x</i> + 4 sin <i>x</i> = 5 cos(<i>x</i> − φ) avec φ ∈ ]0 ; π/2[. Combien vaut φ, en radians&nbsp;? Arrondis au millième.', lab:'φ =', ans:.927, tol:.0006, why:'cos φ = 3/5 et sin φ = 4/5 sont positifs, donc φ = arctan(4/3) ≈ 0,927 rad.'},
   {q:'Pour quel <i>x</i> de [0 ; 2π[ l’expression √2 cos <i>x</i> + √2 sin <i>x</i> atteint-elle son maximum&nbsp;? Arrondis au millième.', lab:'x =', ans:.785, tol:.0006, why:'R = √(2 + 2) = 2, cos φ = sin φ = √2/2, φ = π/4. 2 cos(x − π/4) est maximal pour x = π/4 ≈ 0,785.'},
   {q:'Quelle est la plus grande valeur de 2 cos <i>x</i> + 2 sin <i>x</i> + 1&nbsp;? Arrondis au millième.', lab:'maximum =', ans:3.828, tol:.0006, why:'2 cos x + 2 sin x = R cos(x − φ) avec R = √8 = 2√2. Le maximum de l’expression vaut 1 + 2√2 ≈ 3,828, et non 2 + 2 + 1.'},
 ]},
];
})();
