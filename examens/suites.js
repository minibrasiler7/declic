/* Déclic — examen de compétence : Suites */
(()=>{
EXAMS['suites']=[
 {n:'Reconnaître la suite', r:'Reconnaître la suite et calculer un terme', qs:[
   {q:'La suite 5, 8, 11, 14, … est…', opts:['géométrique de raison 3','arithmétique de raison 3','arithmétique de raison 5','ni arithmétique ni géométrique'], ans:1, why:'Les différences sont constantes : 8 − 5 = 11 − 8 = 14 − 11 = 3.'},
   {q:'La suite 1, 4, 9, 16, … est…', opts:['arithmétique de raison 3','géométrique de raison 4','arithmétique de raison 5','ni arithmétique ni géométrique'], ans:3, why:'Les différences 3, 5, 7 ne sont pas constantes, les quotients 4 ; 2,25 ; 1,78 non plus. Ce sont les carrés.'},
   {q:'La suite 48, 24, 12, 6, … est géométrique. Quelle est sa raison ?', lab:'q =', ans:0.5, tol:.001, why:'24/48 = 12/24 = 6/12 = 0,5 : on divise par 2, donc on multiplie par ½.'},
   {q:'La suite 20, 13, 6, −1, … est arithmétique. Quelle est sa raison ?', lab:'r =', ans:-7, why:'13 − 20 = 6 − 13 = −1 − 6 = −7. La raison est négative : la suite décroît.'},
   {q:'La suite 2, −6, 18, −54, … est géométrique. Quelle est sa raison ?', lab:'q =', ans:-3, why:'−6/2 = 18/(−6) = −54/18 = −3. Une raison négative fait alterner les signes.'},
 ]},
 {n:'Calculer un terme', r:'Reconnaître la suite et calculer un terme', qs:[
   {q:'Suite arithmétique avec <i>u</i>₀ = 12 et <i>r</i> = −4. Combien vaut <i>u</i>₁₅ ?', ans:-48, why:'<i>u</i>ₙ = <i>u</i>₀ + <i>n</i>·<i>r</i> = 12 + 15 · (−4) = −48.'},
   {q:'Suite arithmétique avec <i>u</i>₁ = 3 et <i>r</i> = 5. Combien vaut <i>u</i>₂₀ ?', ans:98, why:'De <i>u</i>₁ à <i>u</i>₂₀, il y a 19 pas : 3 + 19 · 5 = 98.'},
   {q:'Suite géométrique avec <i>v</i>₀ = 5 et <i>q</i> = 3. Combien vaut <i>v</i>₄ ?', ans:405, why:'<i>v</i>₄ = 5 · 3⁴ = 5 · 81 = 405.'},
   {q:'Suite géométrique avec <i>v</i>₁ = 2 et <i>q</i> = 2. Combien vaut <i>v</i>₈ ?', ans:256, why:'De <i>v</i>₁ à <i>v</i>₈, il y a 7 pas : 2 · 2⁷ = 256.'},
   {q:'Une suite arithmétique vérifie <i>u</i>₃ = 17 et <i>u</i>₇ = 37. Combien vaut <i>u</i>₀ ?', ans:2, why:'De <i>u</i>₃ à <i>u</i>₇, 4 pas valent 20, donc <i>r</i> = 5. Puis <i>u</i>₀ = 17 − 3 · 5 = 2.'},
   {q:'Une suite géométrique de raison positive vérifie <i>v</i>₂ = 12 et <i>v</i>₄ = 108. Combien vaut <i>v</i>₅ ?', ans:324, why:'<i>q</i>² = 108/12 = 9, donc <i>q</i> = 3 et <i>v</i>₅ = 108 · 3 = 324.'},
   {q:'Suite arithmétique avec <i>u</i>₁ = 7 et <i>r</i> = 3. Pour quel <i>n</i> a-t-on <i>u</i>ₙ = 100 ?', lab:'n =', ans:32, why:'7 + (<i>n</i> − 1) · 3 = 100 donne <i>n</i> − 1 = 31, donc <i>n</i> = 32.'},
 ]},
 {n:'Somme de termes arithmétiques', r:'Calculer une somme de termes', qs:[
   {q:'Combien vaut 1 + 2 + 3 + … + 60 ?', ans:1830, why:'60 termes, premier 1, dernier 60 : 60 × 61 ÷ 2 = 1 830.'},
   {q:'Combien vaut 5 + 9 + 13 + … + 81 ?', ans:860, why:'Nombre de termes : (81 − 5) ÷ 4 + 1 = 20. Somme : 20 × (5 + 81) ÷ 2 = 860.'},
   {q:'Combien vaut la somme des 30 premiers nombres impairs, 1 + 3 + 5 + … ?', ans:900, why:'Le 30e impair est 1 + 29 · 2 = 59. Somme : 30 × (1 + 59) ÷ 2 = 900.'},
   {q:'On pose <i>u</i>ₙ = 3 + 2<i>n</i>. Combien vaut <i>u</i>₀ + <i>u</i>₁ + … + <i>u</i>₁₀ ?', ans:143, why:'De <i>u</i>₀ à <i>u</i>₁₀, il y a 11 termes. <i>u</i>₀ = 3 et <i>u</i>₁₀ = 23 : 11 × 26 ÷ 2 = 143.'},
   {q:'Suite arithmétique avec <i>u</i>₁ = 10 et <i>r</i> = 2. Quelle est la somme des 15 premiers termes ?', ans:360, why:'Le 15e terme est 10 + 14 · 2 = 38. Somme : 15 × (10 + 38) ÷ 2 = 360.'},
 ]},
 {n:'Somme de termes géométriques', r:'Calculer une somme de termes', qs:[
   {q:'Combien vaut 1 + 2 + 4 + … + 512 ?', ans:1023, why:'512 = 2⁹ : il y a 10 termes, de 2⁰ à 2⁹. Somme : (1 − 2¹⁰)/(1 − 2) = 1 023.'},
   {q:'Combien vaut 5 + 15 + 45 + … (6 termes) ?', ans:1820, why:'<i>u</i>₀ = 5, <i>q</i> = 3, 6 termes : 5 · (1 − 3⁶)/(1 − 3) = 5 · 728 / 2 = 1 820.'},
   {q:'Combien vaut la somme infinie 10 + 5 + 2,5 + … ?', ans:20, why:'Raison ½, avec |<i>q</i>| < 1 : 10 / (1 − ½) = 20.'},
   {q:'Combien vaut la somme infinie 8 + 2 + 0,5 + … ? (au centième)', ans:32/3, tol:.006, show:'32/3 ≈ 10,67', why:'Raison ¼ : 8 / (1 − ¼) = 8 / 0,75 = 32/3 ≈ 10,67.'},
   {q:'Combien vaut la somme infinie 3 − 1,5 + 0,75 − … ?', ans:2, why:'Raison −½, de valeur absolue < 1 : 3 / (1 − (−½)) = 3 / 1,5 = 2.'},
   {q:'Que vaut la somme infinie 1 + 1,1 + 1,21 + 1,331 + … ?', opts:['1 / (1 − 1,1) = −10','Elle n’est pas finie','1 / 1,1 ≈ 0,91','11'], ans:1, why:'La raison 1,1 est plus grande que 1 : les termes grandissent et la somme dépasse tout nombre. La formule <i>u</i>₀/(1 − <i>q</i>) ne vaut que pour |<i>q</i>| < 1.'},
 ]},
 {n:'Limite et premier rang', r:'Limite et premier rang sous un seuil', qs:[
   {q:'Vers quoi tend <i>u</i>ₙ = 7 · 0,95ⁿ ?', opts:['7','0','0,95','+∞'], ans:1, why:'|0,95| < 1 : 0,95ⁿ → 0, donc <i>u</i>ₙ → 0, même si la décroissance est lente.'},
   {q:'Vers quoi tend <i>u</i>ₙ = 0,01 · 1,02ⁿ ?', opts:['0','0,01','1,02','+∞'], ans:3, why:'<i>q</i> = 1,02 > 1 et <i>u</i>₀ > 0 : la suite tend vers +∞, même en partant de 0,01.'},
   {q:'On pose <i>u</i>ₙ = 200 · 0,85ⁿ. Quel est le premier rang <i>n</i> tel que <i>u</i>ₙ < 10 ?', lab:'n =', ans:19, why:'0,85ⁿ < 0,05 ⟺ <i>n</i> > ln 0,05 / ln 0,85 ≈ 18,4 (on retourne le sens car ln 0,85 < 0). Donc <i>n</i> = 19 : <i>u</i>₁₈ ≈ 10,7 et <i>u</i>₁₉ ≈ 9,1.'},
   {q:'On pose <i>v</i>ₙ = 3 · 1,2ⁿ. Quel est le premier rang <i>n</i> tel que <i>v</i>ₙ > 100 ?', lab:'n =', ans:20, why:'1,2ⁿ > 100/3 ⟺ <i>n</i> > ln(100/3) / ln 1,2 ≈ 19,2. Donc <i>n</i> = 20 : <i>v</i>₁₉ ≈ 95,8 et <i>v</i>₂₀ ≈ 115,0.'},
   {q:'On cherche <i>n</i> tel que 0,9ⁿ < 0,3. Après avoir pris le ln, quelle condition obtient-on ?', opts:['<i>n</i> < ln 0,3 / ln 0,9','<i>n</i> > ln 0,3 / ln 0,9','<i>n</i> > ln 0,9 / ln 0,3','<i>n</i> < ln 0,9 / ln 0,3'], ans:1, why:'<i>n</i> · ln 0,9 < ln 0,3. On divise par ln 0,9 < 0, ce qui retourne le sens : <i>n</i> > ln 0,3 / ln 0,9 ≈ 11,4.'},
   {q:'Quel est le plus petit <i>n</i> tel que 1 + 2 + … + <i>n</i> > 500 ?', lab:'n =', ans:32, why:'La somme vaut <i>n</i>(<i>n</i> + 1)/2. Pour <i>n</i> = 31 : 496 ≤ 500. Pour <i>n</i> = 32 : 528 > 500.'},
 ]},
];
})();
