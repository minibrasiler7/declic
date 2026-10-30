/* Déclic — examen de compétence : Série géométrique et nombre d’Euler */
(()=>{
const S=(a,b)=>`Σ<sub>k=${a}</sub><sup>${b}</sup>`;
const lim='lim quand <i>n</i> → ∞ de';
EXAMS['an1-geometrique']=[
 {n:'Sommes finies de termes géométriques', r:'Somme finie de termes géométriques', qs:[
   {q:'Calcule 2 + 6 + 18 + … + 2 · 3⁵.', lab:'somme =', ans:728, why:'Premier terme 2, raison 3, et 6 termes (exposants 0 à 5) : S = 2 · (1 − 3⁶)/(1 − 3) = 2 · (−728)/(−2) = 728.'},
   {q:'Calcule 5 + 10 + 20 + … + 640.', lab:'somme =', ans:1275, why:'640 = 5 · 128 = 5 · 2⁷ : exposants 0 à 7, soit 8 termes. S = 5 · (1 − 2⁸)/(1 − 2) = 5 · 255 = 1275.'},
   {q:'Combien de termes compte la somme 1 + 2 + 4 + … + 1024 ?', lab:'nombre =', ans:11, why:'1024 = 2¹⁰ : les termes sont 2⁰, 2¹, …, 2¹⁰, donc 11 termes (on n’oublie pas 2⁰ = 1).'},
   {q:'Calcule 1 + 1/2 + 1/4 + … + 1/64 (fraction acceptée).', lab:'somme =', ans:127/64, show:'127/64', why:'Raison 1/2 et 7 termes (1/64 = (1/2)⁶) : S = (1 − (1/2)⁷)/(1 − 1/2) = 2(1 − 1/128) = 127/64.'},
   {q:'Calcule 1 − 2 + 4 − 8 + … + 256.', lab:'somme =', ans:171, why:'Raison −2. 256 = (−2)⁸ : 9 termes. S = (1 − (−2)⁹)/(1 − (−2)) = (1 + 512)/3 = 171.'},
   {q:'Calcule 3 + 3 · 1,1 + 3 · 1,1² + … + 3 · 1,1⁹, arrondi au centième.', lab:'somme ≈', ans:47.812273803, tol:0.006, show:'47,81', why:'Premier terme 3, raison 1,1, 10 termes : S = 3 · (1 − 1,1¹⁰)/(1 − 1,1) = 30 · (1,1¹⁰ − 1) ≈ 30 · 0,59374 ≈ 47,81.'},
   {q:`Calcule ${S(3,10)} 2<sup>k</sup>.`, lab:'somme =', ans:2040, why:'Premier terme 2³ = 8, raison 2, et 10 − 3 + 1 = 8 termes : S = 8 · (2⁸ − 1)/(2 − 1) = 8 · 255 = 2040.'},
 ]},
 {n:'Sommer une série géométrique', r:'Sommer une série géométrique', qs:[
   {q:`Calcule ${S(0,'∞')} (1/4)<sup>k</sup> (fraction acceptée).`, lab:'somme =', ans:4/3, show:'4/3', why:'Premier terme 1, raison 1/4 : S = 1/(1 − 1/4) = 1/(3/4) = 4/3.'},
   {q:`Calcule ${S(1,'∞')} 5 · (1/3)<sup>k</sup>.`, lab:'somme =', ans:2.5, show:'5/2', why:'Le premier terme (k = 1) vaut 5/3, la raison 1/3 : S = (5/3)/(1 − 1/3) = (5/3)/(2/3) = 5/2.'},
   {q:`Calcule ${S(2,'∞')} (−1/2)<sup>k</sup> (fraction acceptée).`, lab:'somme =', ans:1/6, show:'1/6', why:'Premier terme (k = 2) : (−1/2)² = 1/4. Raison −1/2 : S = (1/4)/(1 + 1/2) = (1/4)/(3/2) = 1/6.'},
   {q:'Calcule la somme infinie 6 − 2 + 2/3 − 2/9 + …', lab:'somme =', ans:4.5, show:'9/2', why:'Premier terme 6, raison −1/3 : S = 6/(1 + 1/3) = 6/(4/3) = 9/2.'},
   {q:'Écris 0,444… comme une fraction.', lab:'0,444… =', ans:4/9, show:'4/9', why:'0,444… = 4/10 + 4/100 + … : premier terme 4/10, raison 1/10, donc (4/10)/(9/10) = 4/9.'},
   {q:'Écris 1,363636… comme une fraction.', lab:'1,3636… =', ans:15/11, show:'15/11', why:'0,3636… = (36/100)/(1 − 1/100) = 36/99 = 4/11. Donc 1,3636… = 1 + 4/11 = 15/11.'},
   {q:`Pour quel nombre <i>x</i> ∈ ]0 ; 1[ a-t-on ${S(1,'∞')} <i>x</i><sup>k</sup> = 3 ?`, lab:'<i>x</i> =', ans:0.75, show:'3/4', why:'La somme vaut x/(1 − x). x/(1 − x) = 3 ⇔ x = 3 − 3x ⇔ x = 3/4.'},
 ]},
 {n:'Convergence et sommes partielles', r:'Sommes partielles', qs:[
   {q:'Laquelle de ces séries converge ?', opts:['Σ (5/4)ⁿ','Σ (−1)ⁿ','Σ (−2/3)ⁿ','Σ 1ⁿ'], ans:2, why:'Une série géométrique converge seulement si |q| &lt; 1. Seule |−2/3| &lt; 1 ; sa somme vaut 1/(1 + 2/3) = 3/5.'},
   {q:'Calcule Σ (−0,6)ⁿ, la somme pour <i>n</i> allant de 0 à l’infini.', lab:'somme =', ans:0.625, show:'5/8', why:'|−0,6| &lt; 1 : la série converge vers 1/(1 − (−0,6)) = 1/1,6 = 0,625.'},
   {q:'Pour quelles valeurs de <i>x</i> la série Σ (<i>x</i>/2)ⁿ converge-t-elle ?', opts:[']−1 ; 1[',']−2 ; 2[','[−2 ; 2]',']−∞ ; 2['], ans:1, why:'Il faut |x/2| &lt; 1, soit |x| &lt; 2 : x ∈ ]−2 ; 2[. En x = ±2, la raison vaut ±1 et la série diverge.'},
   {q:'Sₙ = 1 + 1/2 + 1/4 + … + (1/2)ⁿ tend vers 2. Quel est le plus petit <i>n</i> pour lequel 2 − Sₙ &lt; 0,001 ?', lab:'<i>n</i> =', ans:10, why:'Sₙ = (1 − (1/2)ⁿ⁺¹)/(1/2) = 2 − (1/2)ⁿ, donc 2 − Sₙ = 1/2ⁿ. Il faut 2ⁿ &gt; 1000 : 2⁹ = 512 ne suffit pas, 2¹⁰ = 1024 oui.'},
   {q:'Un élève écrit : « Σ 2ⁿ = 1/(1 − 2) = −1 ». Qu’en penses-tu ?', opts:['C’est correct','C’est faux : la série diverge car |2| ≥ 1','C’est faux : la somme vaut 1','C’est faux : la somme vaut 2'], ans:1, why:'La formule 1/(1 − q) n’est valable que pour |q| &lt; 1. Ici 2ⁿ → +∞, les sommes partielles tendent vers +∞ : la série diverge.'},
 ]},
 {n:'Le nombre e', r:'Le nombre e, deux fois', qs:[
   {q:'Calcule 1 + 1/1! + 1/2! + 1/3! + 1/4!, arrondi au millième.', lab:'somme ≈', ans:65/24, tol:0.0006, show:'65/24 ≈ 2,708', why:'1 + 1 + 1/2 + 1/6 + 1/24 = 65/24 ≈ 2,708. On s’approche de e ≈ 2,71828.'},
   {q:'Calcule (1 + 1/10)¹⁰, arrondi au centième.', lab:'valeur ≈', ans:2.5937424601, tol:0.006, show:'2,59', why:'1,1¹⁰ ≈ 2,5937. La suite (1 + 1/n)ⁿ approche e ≈ 2,718, mais lentement.'},
   {q:'Vers quoi tend (1 + 1/<i>n</i>)ⁿ quand <i>n</i> → ∞ ?', opts:['1, car 1 + 1/n → 1','e ≈ 2,718','+∞, car l’exposant devient infini','2'], ans:1, why:'1<sup>∞</sup> est une forme indéterminée : on ne peut pas dire « 1 puissance quelque chose vaut 1 ». Cette limite définit e ≈ 2,718.'},
   {q:`Calcule ${lim} (1 + 5/<i>n</i>)ⁿ, arrondi au dixième.`, lab:'limite ≈', ans:Math.exp(5), tol:0.06, show:'e⁵ ≈ 148,4', why:'C’est (1 + x/n)ⁿ avec x = 5 : la limite vaut e⁵ ≈ 148,4.'},
   {q:`Calcule ${lim} (1 − 2/<i>n</i>)ⁿ, arrondi au millième.`, lab:'limite ≈', ans:Math.exp(-2), tol:0.0006, show:'e⁻² ≈ 0,135', why:'C’est (1 + x/n)ⁿ avec x = −2 : la limite vaut e⁻² ≈ 0,135.'},
 ]},
 {n:'Lever une forme 1<sup>∞</sup>', r:'Forme 1<sup>∞</sup> : se ramener à (1 + x/n)ⁿ', qs:[
   {q:`Calcule ${lim} (1 + 1/<i>n</i>)<sup>4<i>n</i></sup>, arrondi au centième.`, lab:'limite ≈', ans:Math.exp(4), tol:0.006, show:'e⁴ ≈ 54,60', why:'(1 + 1/n)⁴ⁿ = [(1 + 1/n)ⁿ]⁴ → e⁴ ≈ 54,60.'},
   {q:`Calcule ${lim} (1 + 4/<i>n</i>)<sup><i>n</i>/2</sup>, arrondi au centième.`, lab:'limite ≈', ans:Math.exp(2), tol:0.006, show:'e² ≈ 7,39', why:'(1 + 4/n)<sup>n/2</sup> = [(1 + 4/n)ⁿ]<sup>1/2</sup> → (e⁴)<sup>1/2</sup> = e² ≈ 7,39.'},
   {q:`Calcule ${lim} (1 + 1/<i>n</i>)<sup><i>n</i>+5</sup>, arrondi au centième.`, lab:'limite ≈', ans:Math.E, tol:0.006, show:'e ≈ 2,72', why:'(1 + 1/n)ⁿ⁺⁵ = (1 + 1/n)ⁿ · (1 + 1/n)⁵. Le premier facteur tend vers e, le second vers 1⁵ = 1 : la limite vaut e ≈ 2,72.'},
   {q:`Calcule ${lim} (${F('2<i>n</i> + 1','2<i>n</i>')})ⁿ, arrondi au centième.`, lab:'limite ≈', ans:Math.exp(0.5), tol:0.006, show:'e<sup>1/2</sup> ≈ 1,65', why:'(2n + 1)/(2n) = 1 + 1/(2n) = 1 + (1/2)/n. C’est (1 + x/n)ⁿ avec x = 1/2 : la limite vaut e<sup>1/2</sup> = √e ≈ 1,65.'},
   {q:`Calcule ${lim} (${F('<i>n</i> − 1','<i>n</i> + 2')})ⁿ, arrondi au millième.`, lab:'limite ≈', ans:Math.exp(-3), tol:0.0006, show:'e⁻³ ≈ 0,050', why:'(n − 1)/(n + 2) = (1 − 1/n)/(1 + 2/n). La puissance n vaut (1 − 1/n)ⁿ/(1 + 2/n)ⁿ → e⁻¹/e² = e⁻³ ≈ 0,050.'},
   {q:'Un élève écrit : « 1 + 3/<i>n</i> → 1, donc (1 + 3/<i>n</i>)ⁿ → 1 ». Qu’en penses-tu ?', opts:['Il a raison','C’est faux : 1<sup>∞</sup> est indéterminé, la limite vaut e³','C’est faux : la limite vaut +∞','C’est faux : la limite vaut 3'], ans:1, why:'La base tend vers 1 mais l’exposant devient infini : forme 1<sup>∞</sup>. C’est (1 + x/n)ⁿ avec x = 3, qui tend vers e³ ≈ 20,1.'},
 ]},
];
})();
