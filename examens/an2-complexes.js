/* Déclic — examen de compétence : Nombres complexes */
(()=>{
EXAMS['an2-complexes']=[
 {n:'Calculer en forme algébrique', r:'Calculer en forme algébrique', qs:[
   {q:'Calcule la partie réelle de (2 − 3i)(4 + i).', lab:'Re =', ans:11, tol:.001, why:'(2 − 3i)(4 + i) = 8 + 2i − 12i − 3i² = 8 − 10i + 3 = 11 − 10i. La partie réelle vaut 11.'},
   {q:'Calcule la partie imaginaire de (3 + 2i)².', lab:'Im =', ans:12, tol:.001, why:'(3 + 2i)² = 9 + 12i + 4i² = 9 + 12i − 4 = 5 + 12i. La partie imaginaire vaut 12.'},
   {q:'Que vaut i¹⁰³&nbsp;?', opts:['i','−i','1','−1'], ans:1, why:'103 = 4 · 25 + 3, donc i¹⁰³ = (i⁴)²⁵ · i³ = i³ = −i.'},
   {q:'Calcule (1 − i)⁴ (c’est un réel).', lab:'(1 − i)⁴ =', ans:-4, tol:.001, why:'(1 − i)² = 1 − 2i + i² = −2i, puis (1 − i)⁴ = (−2i)² = 4i² = −4.'},
   {q:'Que vaut (2 + 5i)²&nbsp;?', opts:['4 + 25i','−21','−21 + 20i','29 + 20i'], ans:2, why:'(2 + 5i)² = 4 + 2 · 2 · 5i + 25i² = 4 + 20i − 25 = −21 + 20i. Le double produit 20i ne disparaît pas.'},
 ]},
 {n:'Conjugué et module', r:'z·z̄ = |z|²', qs:[
   {q:'Calcule |8 − 15i|.', lab:'|z| =', ans:17, tol:.001, why:'|8 − 15i| = √(64 + 225) = √289 = 17.'},
   {q:'Calcule (5 − 2i)(5 + 2i).', lab:'produit =', ans:29, tol:.001, why:'C’est z · z̄ avec z = 5 + 2i : le résultat est réel et vaut 5² + 2² = 29.'},
   {q:'Soit <i>z</i> = 3 − 7i. Calcule la partie imaginaire de <i>z</i> − <i>z̄</i>.', lab:'Im =', ans:-14, tol:.001, why:'<i>z̄</i> = 3 + 7i, donc <i>z</i> − <i>z̄</i> = −14i, de partie imaginaire −14. En général <i>z</i> − <i>z̄</i> = 2i Im <i>z</i>.'},
   {q:'Laquelle de ces affirmations est vraie pour tous complexes <i>z</i> et <i>w</i>&nbsp;?', opts:['|<i>z</i> + <i>w</i>| = |<i>z</i>| + |<i>w</i>|','<i>z</i> · <i>z̄</i> est un réel positif ou nul','le conjugué de <i>zw</i> est <i>z̄</i> · <i>w</i>','<i>z</i> est réel si et seulement si <i>z</i> = −<i>z̄</i>'], ans:1, why:'(a + bi)(a − bi) = a² + b² ≥ 0. Pour la somme, on a seulement |<i>z</i> + <i>w</i>| ≤ |<i>z</i>| + |<i>w</i>| ; le conjugué de <i>zw</i> est <i>z̄</i> · <i>w̄</i> ; et <i>z</i> est réel si et seulement si <i>z</i> = <i>z̄</i>.'},
 ]},
 {n:'Module d’un produit ou d’un quotient', r:'Un module sans développer', qs:[
   {q:'Calcule |(1 + i)⁶|.', lab:'module =', ans:8, tol:.001, why:'|1 + i| = √2, donc |(1 + i)⁶| = (√2)⁶ = 2³ = 8.'},
   {q:'Calcule |(5 + 12i)/(3 − 4i)| (valeur décimale).', lab:'module =', ans:2.6, tol:.001, why:'|5 + 12i| = 13 et |3 − 4i| = 5, donc le module vaut 13/5 = 2,6.'},
   {q:'Quelle est la distance entre les points du plan d’affixes 1 + 2i et 4 − 2i&nbsp;?', lab:'distance =', ans:5, tol:.001, why:'C’est |(4 − 2i) − (1 + 2i)| = |3 − 4i| = √(9 + 16) = 5.'},
   {q:'Calcule |(2 − i)⁴ (1 + 3i)|, arrondi au centième.', lab:'module =', ans:79.06, tol:.006, why:'|2 − i| = √5, donc |(2 − i)⁴| = 25, et |1 + 3i| = √10. Le module vaut 25√10 ≈ 79,06.'},
 ]},
 {n:'Inverser et diviser', r:'Inverser et diviser', qs:[
   {q:'Écris (5 + 5i)/(2 + i) sous la forme a + bi. Que vaut a&nbsp;?', lab:'a =', ans:3, tol:.001, why:'On multiplie par le conjugué 2 − i : (5 + 5i)(2 − i)/5 = (10 − 5i + 10i + 5)/5 = (15 + 5i)/5 = 3 + i.'},
   {q:'Calcule la partie imaginaire de 1/(1 − 2i) (valeur décimale).', lab:'Im =', ans:.4, tol:.001, why:'1/(1 − 2i) = (1 + 2i)/(1 + 4) = 1/5 + (2/5)i. La partie imaginaire vaut 2/5 = 0,4.'},
   {q:'Que vaut 1/i&nbsp;?', opts:['i','−i','1','−1'], ans:1, why:'1/i = (−i)/(i · (−i)) = −i/1 = −i. Contrôle : i · (−i) = −i² = 1.'},
   {q:'Résous (2 − i)<i>z</i> = 1 + 7i.', opts:['1 + 3i','3 − i','−1/2 + 7i','−1 + 3i'], ans:3, why:'<i>z</i> = (1 + 7i)/(2 − i) = (1 + 7i)(2 + i)/5 = (2 + i + 14i − 7)/5 = (−5 + 15i)/5 = −1 + 3i.'},
 ]},
 {n:'Identifier parties réelle et imaginaire', r:'Identifier parties réelle et imaginaire', qs:[
   {q:'Résous 3<i>z</i> − <i>z̄</i> = 4 + 8i, puis donne |<i>z</i>|².', lab:'|z|² =', ans:8, tol:.001, why:'Avec <i>z</i> = <i>x</i> + i<i>y</i> : 3<i>x</i> + 3i<i>y</i> − <i>x</i> + i<i>y</i> = 2<i>x</i> + 4i<i>y</i> = 4 + 8i, donc <i>x</i> = 2, <i>y</i> = 2 et |<i>z</i>|² = 8.'},
   {q:'Résous 2<i>z</i> − i<i>z̄</i> = 1 + 4i. Que vaut Im <i>z</i>&nbsp;?', lab:'Im z =', ans:3, tol:.001, why:'i<i>z̄</i> = i(<i>x</i> − i<i>y</i>) = <i>y</i> + i<i>x</i>, donc 2<i>z</i> − i<i>z̄</i> = (2<i>x</i> − <i>y</i>) + i(2<i>y</i> − <i>x</i>). On identifie : 2<i>x</i> − <i>y</i> = 1 et 2<i>y</i> − <i>x</i> = 4, d’où <i>x</i> = 2 et <i>y</i> = 3.'},
   {q:'Les réels <i>x</i> et <i>y</i> vérifient (<i>x</i> + 2i)(1 − i) = 5 + <i>y</i>i. Que vaut <i>y</i>&nbsp;?', lab:'y =', ans:-1, tol:.001, why:'(<i>x</i> + 2i)(1 − i) = <i>x</i> − <i>x</i>i + 2i + 2 = (<i>x</i> + 2) + (2 − <i>x</i>)i. Parties réelles : <i>x</i> + 2 = 5, donc <i>x</i> = 3. Parties imaginaires : <i>y</i> = 2 − 3 = −1.'},
 ]},
 {n:'Racine carrée d’un complexe', r:'La racine carrée d’un complexe', qs:[
   {q:'Quelles sont les racines carrées de 5 + 12i&nbsp;?', opts:['±(2 + 3i)','±(3 − 2i)','±(3 + 2i)','±(√5 + i√12)'], ans:2, why:'<i>x</i>² − <i>y</i>² = 5, <i>x</i>² + <i>y</i>² = √(25 + 144) = 13, donc <i>x</i>² = 9 et <i>y</i>² = 4. 2<i>xy</i> = 12 &gt; 0 : même signe, δ = ±(3 + 2i).'},
   {q:'Soit δ la racine carrée de −15 − 8i qui a une partie réelle positive. Que vaut Im δ&nbsp;?', lab:'Im δ =', ans:-4, tol:.001, why:'<i>x</i>² − <i>y</i>² = −15 et <i>x</i>² + <i>y</i>² = √(225 + 64) = 17, donc <i>x</i>² = 1, <i>y</i>² = 16. 2<i>xy</i> = −8 &lt; 0 : signes opposés, δ = 1 − 4i. Contrôle : (1 − 4i)² = 1 − 8i − 16 = −15 − 8i.'},
   {q:'On cherche δ = <i>x</i> + i<i>y</i> avec δ² = −7 + 24i. Que vaut <i>x</i>² + <i>y</i>²&nbsp;?', lab:'x² + y² =', ans:25, tol:.001, why:'|δ|² = |δ²| = |−7 + 24i| = √(49 + 576) = √625 = 25.'},
 ]},
 {n:'Équations du second degré dans ℂ', r:'Équation du 2e degré dans ℂ', qs:[
   {q:'Résous <i>z</i>² + 6<i>z</i> + 13 = 0. Quelle est la partie imaginaire de la solution dont la partie imaginaire est positive&nbsp;?', lab:'Im z =', ans:2, tol:.001, why:'Δ = 36 − 52 = −16, δ = 4i, donc <i>z</i> = (−6 ± 4i)/2 = −3 ± 2i.'},
   {q:'Quelles sont les solutions de <i>z</i>² − 2<i>z</i> + 10 = 0&nbsp;?', opts:['−1 ± 3i','1 ± 3i','1 ± 9i','2 et −5'], ans:1, why:'Δ = 4 − 40 = −36, δ = 6i, donc <i>z</i> = (2 ± 6i)/2 = 1 ± 3i.'},
   {q:'Quelles sont les solutions de <i>z</i>² − (3 + 2i)<i>z</i> + (1 + 3i) = 0&nbsp;?', opts:['2 + i et 1 + i','2 − i et 1 − i','3 + i et i','1 + 2i et 2'], ans:0, why:'Δ = (3 + 2i)² − 4(1 + 3i) = 5 + 12i − 4 − 12i = 1, δ = 1. Donc <i>z</i> = (3 + 2i ± 1)/2 : 2 + i ou 1 + i. Contrôle : produit (2 + i)(1 + i) = 1 + 3i.'},
   {q:'Résous <i>z</i>² − 2i<i>z</i> − 5 = 0. Quelle est la partie réelle de la solution dont la partie réelle est positive&nbsp;?', lab:'Re z =', ans:2, tol:.001, why:'Δ = (−2i)² + 20 = −4 + 20 = 16, δ = 4. Donc <i>z</i> = (2i ± 4)/2 = ±2 + i.'},
 ]},
 {n:'Somme et produit', r:'Somme et produit de deux nombres', qs:[
   {q:'Quels sont les deux nombres complexes de somme 4 et de produit 13&nbsp;?', opts:['4 + 3i et −3i','2 + 3i et 2 − 3i','2 + 9i et 2 − 9i','−2 ± 3i'], ans:1, why:'Ce sont les racines de <i>t</i>² − 4<i>t</i> + 13 = 0 : Δ = 16 − 52 = −36, <i>t</i> = (4 ± 6i)/2 = 2 ± 3i. Contrôle : (2 + 3i)(2 − 3i) = 4 + 9 = 13.'},
   {q:'1 + 4i et 1 − 4i sont les solutions de <i>t</i>² − 2<i>t</i> + <i>c</i> = 0. Que vaut <i>c</i>&nbsp;?', lab:'c =', ans:17, tol:.001, why:'<i>c</i> est le produit des racines : (1 + 4i)(1 − 4i) = 1 + 16 = 17.'},
   {q:'Le nombre i est solution de <i>z</i>² + (1 − i)<i>z</i> + <i>c</i> = 0. Quelle est l’autre solution&nbsp;?', opts:['−i','1 − i','−1','−1 + 2i'], ans:2, why:'La somme des racines vaut −<i>b</i>/<i>a</i> = −(1 − i) = −1 + i. L’autre racine est donc (−1 + i) − i = −1 (et <i>c</i> = i · (−1) = −i).'},
 ]},
];
})();
