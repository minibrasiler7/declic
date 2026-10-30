/* Déclic — examen de compétence : Logarithmes et exponentielles */
(()=>{
EXAMS['an2-explog']=[
 {n:'Simplifier avec ln et exp', r:'Simplifier avec ln et exp', qs:[
   {q:'Simplifie ln(e⁵/√e).', lab:'valeur =', ans:4.5, tol:.001, show:'9/2', why:'√e = e<sup>1/2</sup>, donc e⁵/√e = e<sup>5 − 1/2</sup> = e<sup>9/2</sup> et ln(e<sup>9/2</sup>) = 9/2.'},
   {q:'Combien vaut e<sup>3 ln 2</sup>&nbsp;?', lab:'valeur =', ans:8, tol:.001, why:'3 ln 2 = ln(2³) = ln 8, et e<sup>ln 8</sup> = 8.'},
   {q:'Combien vaut log₂ 32&nbsp;?', lab:'log₂ 32 =', ans:5, tol:.001, why:'log₂ 32 = ln 32 / ln 2 = 5 ln 2 / ln 2 = 5, car 32 = 2⁵.'},
   {q:'Simplifie ln 12 − ln 3 − 2 ln 2.', lab:'valeur =', ans:0, tol:.001, why:'ln 12 = ln(2² · 3) = 2 ln 2 + ln 3. Il reste 2 ln 2 + ln 3 − ln 3 − 2 ln 2 = 0.'},
   {q:'Pour <i>a</i>, <i>b</i> &gt; 0, laquelle de ces égalités est vraie&nbsp;?', opts:['ln(a + b) = ln a + ln b','ln(a/b) = ln a / ln b','ln(a²b) = 2 ln a + ln b','ln(ab) = ln a · ln b'], ans:2, why:'ln(a²b) = ln(a²) + ln b = 2 ln a + ln b. ln transforme les produits en sommes, pas les sommes en quoi que ce soit.'},
 ]},
 {n:'Équations exponentielles', r:'Résoudre une équation exponentielle', qs:[
   {q:'Résous e<sup>2<i>x</i> + 1</sup> = 7. Arrondis au millième.', lab:'x =', ans:.473, tol:.0006, why:'On applique ln : 2x + 1 = ln 7, donc x = (ln 7 − 1)/2 ≈ 0,473.'},
   {q:'Résous 5<sup><i>x</i></sup> = 40. Arrondis au millième.', lab:'x =', ans:2.292, tol:.0006, why:'x ln 5 = ln 40, donc x = ln 40 / ln 5 ≈ 2,292.'},
   {q:'Résous 2<sup><i>x</i> + 3</sup> = 5<sup><i>x</i></sup>. Arrondis au millième.', lab:'x =', ans:2.269, tol:.0006, why:'(x + 3) ln 2 = x ln 5, donc x (ln 5 − ln 2) = 3 ln 2 et x = 3 ln 2 / ln(5/2) ≈ 2,269.'},
   {q:'Combien de solutions l’équation e<sup><i>x</i></sup> = −3 a-t-elle&nbsp;?', opts:['Une, x = ln(−3)','Une, x = −ln 3','Aucune','Deux'], ans:2, why:'e<sup>x</sup> &gt; 0 pour tout x : il ne peut pas valoir −3. ln(−3) n’existe pas.'},
 ]},
 {n:'Équations avec des logarithmes', r:'Résoudre une équation avec des logarithmes', qs:[
   {q:'Résous ln(3<i>x</i> − 2) = 2. Arrondis au millième.', lab:'x =', ans:3.130, tol:.0006, why:'ln A = 2 ⇔ A = e², donc 3x − 2 = e² et x = (e² + 2)/3 ≈ 3,130. Elle vérifie bien 3x − 2 &gt; 0.'},
   {q:'Résous ln(<i>x</i> + 3) + ln(<i>x</i> − 3) = ln 16.', lab:'x =', ans:5, tol:.001, why:'Domaine : x &gt; 3. Puis (x + 3)(x − 3) = 16, soit x² = 25 : x = 5 ou −5. Seul 5 est dans le domaine.'},
   {q:'Résous 2 ln <i>x</i> = ln(<i>x</i> + 6).', lab:'x =', ans:3, tol:.001, why:'Domaine : x &gt; 0. 2 ln x = ln(x²), donc x² = x + 6 ⇔ (x − 3)(x + 2) = 0. −2 est hors du domaine : x = 3.'},
   {q:'Quel est l’ensemble des solutions de ln(<i>x</i> − 1) + ln(<i>x</i> + 2) = ln 4&nbsp;?', opts:['{2 ; −3}','{−3}','Aucune solution','{2}'], ans:3, why:'Domaine : x &gt; 1. (x − 1)(x + 2) = 4 ⇔ x² + x − 6 = 0 ⇔ x = 2 ou x = −3. −3 rend ln(x − 1) impossible : S = {2}.'},
 ]},
 {n:'Changement de variable X = eˣ', r:'Changement de variable X = eˣ', qs:[
   {q:'Résous e<sup>2<i>x</i></sup> − 5e<sup><i>x</i></sup> + 4 = 0. Donne la plus grande solution, arrondie au millième.', lab:'x =', ans:1.386, tol:.0006, why:'X = e<sup>x</sup> : X² − 5X + 4 = (X − 1)(X − 4) = 0. e<sup>x</sup> = 1 donne 0, e<sup>x</sup> = 4 donne ln 4 ≈ 1,386.'},
   {q:'Combien de solutions l’équation e<sup>2<i>x</i></sup> + e<sup><i>x</i></sup> − 2 = 0 a-t-elle&nbsp;?', lab:'nombre =', ans:1, tol:.01, why:'X² + X − 2 = (X − 1)(X + 2) = 0. X = −2 est rejeté (e<sup>x</sup> &gt; 0). Seul e<sup>x</sup> = 1, soit x = 0.'},
   {q:'Résous e<sup><i>x</i></sup> + 2e<sup>−<i>x</i></sup> = 3. Donne la somme des solutions, arrondie au millième.', lab:'somme =', ans:.693, tol:.0006, why:'Avec X = e<sup>x</sup>, on multiplie par X : X² − 3X + 2 = 0, X = 1 ou 2. Donc x = 0 ou x = ln 2 : somme ln 2 ≈ 0,693.'},
   {q:'Combien de solutions l’équation e<sup>2<i>x</i></sup> + 3e<sup><i>x</i></sup> + 2 = 0 a-t-elle&nbsp;?', lab:'nombre =', ans:0, tol:.01, why:'X² + 3X + 2 = (X + 1)(X + 2) : les racines −1 et −2 sont négatives, or e<sup>x</sup> &gt; 0. Aucune solution.'},
 ]},
 {n:'Inéquations avec exp et ln', r:'Inéquations avec exp et ln', qs:[
   {q:'Un capital placé à 5 % par an est multiplié par 1,05<sup><i>n</i></sup> en <i>n</i> ans. Quel est le plus petit entier <i>n</i> tel que 1,05<sup><i>n</i></sup> &gt; 2&nbsp;?', lab:'n =', ans:15, tol:.01, why:'n ln 1,05 &gt; ln 2, et ln 1,05 &gt; 0 : n &gt; ln 2 / ln 1,05 ≈ 14,21. Donc n = 15 (1,05¹⁴ ≈ 1,98 et 1,05¹⁵ ≈ 2,08).'},
   {q:'Résous ln(<i>x</i> + 1) ≥ 2. Quelle est la plus petite solution&nbsp;? Arrondis au millième.', lab:'x =', ans:6.389, tol:.0006, why:'exp est croissante : x + 1 ≥ e², donc x ≥ e² − 1 ≈ 6,389 (et le domaine x &gt; −1 est respecté).'},
   {q:'Quel est le plus petit entier <i>n</i> tel que 0,8<sup><i>n</i></sup> &lt; 0,05&nbsp;?', lab:'n =', ans:14, tol:.01, why:'n ln 0,8 &lt; ln 0,05. On divise par ln 0,8 &lt; 0, le sens change : n &gt; ln 0,05 / ln 0,8 ≈ 13,43. Donc n = 14.'},
   {q:'Pour résoudre 0,7<sup><i>n</i></sup> &lt; 0,2, on écrit <i>n</i> ln 0,7 &lt; ln 0,2. Qu’obtient-on ensuite&nbsp;?', opts:['n &lt; ln 0,2 / ln 0,7 ≈ 4,51','n &gt; ln 0,2 / ln 0,7 ≈ 4,51','n &lt; ln 0,2 − ln 0,7','n &gt; 0,2/0,7'], ans:1, why:'ln 0,7 &lt; 0 : diviser par ce nombre retourne l’inégalité. n &gt; 4,51, donc n ≥ 5 (0,7⁵ ≈ 0,168).'},
 ]},
 {n:'Dérivées de exp, ln et aˣ', r:'Dérivées', qs:[
   {q:'<i>f</i>(<i>x</i>) = e<sup>3<i>x</i></sup>. Calcule <i>f</i> ′(0).', lab:'f ′(0) =', ans:3, tol:.001, why:'(e<sup>u</sup>)′ = u′e<sup>u</sup> : f ′(x) = 3e<sup>3x</sup>, et f ′(0) = 3.'},
   {q:'<i>f</i>(<i>x</i>) = <i>x</i> ln <i>x</i>. Calcule <i>f</i> ′(e).', lab:'f ′(e) =', ans:2, tol:.001, why:'Produit : f ′(x) = ln x + x · (1/x) = ln x + 1. En e : 1 + 1 = 2.'},
   {q:'<i>f</i>(<i>x</i>) = ln(2<i>x</i> + 1). Calcule <i>f</i> ′(1).', lab:'f ′(1) =', ans:2/3, tol:.001, show:'2/3', why:'(ln u)′ = u′/u : f ′(x) = 2/(2x + 1). En 1 : 2/3.'},
   {q:'<i>f</i>(<i>x</i>) = 2<sup><i>x</i></sup>. Calcule <i>f</i> ′(0), arrondi au millième.', lab:'f ′(0) =', ans:.693, tol:.0006, why:'(a<sup>x</sup>)′ = a<sup>x</sup> ln a : f ′(0) = 2⁰ ln 2 = ln 2 ≈ 0,693.'},
   {q:'<i>f</i>(<i>x</i>) = <i>x</i>² e<sup>−<i>x</i></sup>. Calcule <i>f</i> ′(1), arrondi au millième.', lab:'f ′(1) =', ans:.368, tol:.0006, why:'f ′(x) = 2x e<sup>−x</sup> − x² e<sup>−x</sup> = (2x − x²)e<sup>−x</sup>. En 1 : e<sup>−1</sup> ≈ 0,368.'},
 ]},
 {n:'Croissances comparées', r:'Lever une indétermination par croissances comparées', qs:[
   {q:'Que vaut lim<sub><i>x</i>→+∞</sub> <i>x</i>⁵ e<sup>−<i>x</i></sup>&nbsp;?', opts:['+∞','1','0','5'], ans:2, why:'x⁵e<sup>−x</sup> = x⁵/e<sup>x</sup> : l’exponentielle l’emporte sur toute puissance, la limite vaut 0.'},
   {q:'Calcule lim<sub><i>x</i>→+∞</sub> (2e<sup><i>x</i></sup> + <i>x</i>³)/(e<sup><i>x</i></sup> − <i>x</i>).', lab:'limite =', ans:2, tol:.001, why:'On factorise e<sup>x</sup> en haut et en bas : (2 + x³/e<sup>x</sup>)/(1 − x/e<sup>x</sup>) → (2 + 0)/(1 − 0) = 2.'},
   {q:'Que vaut lim<sub><i>x</i>→+∞</sub> (ln <i>x</i> − <i>x</i>)&nbsp;?', opts:['−∞','0','+∞','−1'], ans:0, why:'Forme ∞ − ∞. On factorise x : x(ln x / x − 1). ln x / x → 0, la parenthèse tend vers −1 et le produit vers −∞.'},
   {q:'Calcule lim<sub><i>x</i>→+∞</sub> ln <i>x</i> / √<i>x</i>.', lab:'limite =', ans:0, tol:.001, why:'√x = x<sup>1/2</sup>, et ln x / x<sup>n</sup> → 0 pour tout n &gt; 0 : la puissance l’emporte sur le logarithme.'},
 ]},
];
})();
