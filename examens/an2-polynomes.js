/* Déclic — examen de compétence : Polynômes réels et complexes */
(()=>{
EXAMS['an2-polynomes']=[
 {n:'Poser une division euclidienne', r:'Poser une division euclidienne', qs:[
   {q:'Quel est le reste de la division de <i>x</i>³ + 4<i>x</i>² − <i>x</i> + 1 par <i>x</i>² + 2<i>x</i>&nbsp;?', opts:['1','−5<i>x</i> + 1','<i>x</i> + 2','3<i>x</i> + 1'], ans:1, why:'<i>x</i>³ ÷ <i>x</i>² = <i>x</i> : il reste 2<i>x</i>² − <i>x</i> + 1. Puis 2<i>x</i>² ÷ <i>x</i>² = 2 : il reste −<i>x</i> + 1 − 4<i>x</i> = −5<i>x</i> + 1. Donc Q = <i>x</i> + 2 et R = −5<i>x</i> + 1.'},
   {q:'Quel est le reste de la division de 2<i>x</i>⁴ − <i>x</i>² + 3 par <i>x</i>² − 1&nbsp;?', lab:'reste =', ans:4, tol:.001, why:'2<i>x</i>⁴ ÷ <i>x</i>² = 2<i>x</i>² : il reste <i>x</i>² + 3. Puis <i>x</i>² ÷ <i>x</i>² = 1 : il reste 3 + 1 = 4. Donc 2<i>x</i>⁴ − <i>x</i>² + 3 = (<i>x</i>² − 1)(2<i>x</i>² + 1) + 4.'},
   {q:'Quel est le reste de la division de <i>x</i>⁵ + 1 par <i>x</i>² + 1&nbsp;?', opts:['0','2','<i>x</i> + 1','−<i>x</i> + 1'], ans:2, why:'On écrit les termes manquants à 0. <i>x</i>⁵ ÷ <i>x</i>² = <i>x</i>³ : il reste −<i>x</i>³ + 1. Puis −<i>x</i>³ ÷ <i>x</i>² = −<i>x</i> : il reste <i>x</i> + 1, de degré 1 &lt; 2. Q = <i>x</i>³ − <i>x</i> et R = <i>x</i> + 1.'},
   {q:'On divise un polynôme de degré 5 par un polynôme de degré 2. Que peut-on dire&nbsp;?', opts:['deg Q = 3 et deg R ≤ 1','deg Q = 2 et deg R ≤ 2','deg Q = 3 et deg R = 2','deg Q = 7 et R = 0'], ans:0, why:'A = BQ + R avec deg R &lt; deg B = 2, donc deg R ≤ 1. Le terme dominant de A vient de BQ : deg Q = 5 − 2 = 3.'},
 ]},
 {n:'Le théorème du reste', r:'Division euclidienne', qs:[
   {q:'Quel est le reste de la division de <i>x</i>⁵ − 3<i>x</i>² + 2 par <i>x</i> + 1&nbsp;?', lab:'reste =', ans:-2, tol:.001, why:'<i>x</i> + 1 = <i>x</i> − (−1), donc le reste vaut P(−1) = −1 − 3 + 2 = −2.'},
   {q:'Quel est le reste de la division de 2<i>x</i>³ − <i>x</i> + 5 par <i>x</i> − 3&nbsp;?', lab:'reste =', ans:56, tol:.001, why:'Le reste vaut P(3) = 2 · 27 − 3 + 5 = 56.'},
   {q:'Pour quelle valeur de <i>a</i> le polynôme <i>x</i>³ + <i>ax</i> − 6 est-il divisible par <i>x</i> − 2&nbsp;?', lab:'a =', ans:-1, tol:.001, why:'Il faut un reste nul, donc P(2) = 8 + 2<i>a</i> − 6 = 0, soit <i>a</i> = −1.'},
 ]},
 {n:'Factoriser avec une racine évidente', r:'Factoriser avec une racine évidente', qs:[
   {q:'Factorise <i>x</i>³ + 2<i>x</i>² − 5<i>x</i> − 6. Quelle est sa plus petite racine&nbsp;?', lab:'x =', ans:-3, tol:.001, why:'P(−1) = −1 + 2 + 5 − 6 = 0, donc P = (<i>x</i> + 1)(<i>x</i>² + <i>x</i> − 6) = (<i>x</i> + 1)(<i>x</i> + 3)(<i>x</i> − 2). Les racines sont −1, −3 et 2.'},
   {q:'Factorise <i>x</i>³ − 7<i>x</i> − 6. Quelle est sa plus grande racine&nbsp;?', lab:'x =', ans:3, tol:.001, why:'P(−1) = −1 + 7 − 6 = 0, donc P = (<i>x</i> + 1)(<i>x</i>² − <i>x</i> − 6) = (<i>x</i> + 1)(<i>x</i> − 3)(<i>x</i> + 2). La plus grande racine est 3.'},
   {q:'Combien de racines réelles le polynôme <i>x</i>³ − <i>x</i>² + <i>x</i> − 1 a-t-il&nbsp;?', opts:['0','1','2','3'], ans:1, why:'P(1) = 0, et P = (<i>x</i> − 1)(<i>x</i>² + 1). Le trinôme <i>x</i>² + 1 n’a pas de racine réelle : seule la racine 1 est réelle.'},
   {q:'Lequel de ces nombres ne peut pas être une racine entière de <i>x</i>³ + 5<i>x</i>² − 7<i>x</i> + 10&nbsp;?', opts:['−5','2','3','−1'], ans:2, why:'Une racine entière divise le terme constant 10. Les diviseurs de 10 sont ±1, ±2, ±5, ±10 : 3 n’en fait pas partie.'},
 ]},
 {n:'Multiplicité d’une racine', r:'La multiplicité par les dérivées', qs:[
   {q:'Quelle est la multiplicité de la racine 2 de <i>x</i>³ − 6<i>x</i>² + 12<i>x</i> − 8&nbsp;?', lab:'multiplicité =', ans:3, tol:.001, why:'P(2) = 8 − 24 + 24 − 8 = 0, P′ = 3<i>x</i>² − 12<i>x</i> + 12 donne P′(2) = 0, P″ = 6<i>x</i> − 12 donne P″(2) = 0, et P‴ = 6 ≠ 0. Racine triple : P = (<i>x</i> − 2)³.'},
   {q:'Quelle est la multiplicité de la racine 1 de <i>x</i>⁴ − 2<i>x</i>² + 1&nbsp;?', lab:'multiplicité =', ans:2, tol:.001, why:'P(1) = 0, P′ = 4<i>x</i>³ − 4<i>x</i> donne P′(1) = 0, P″ = 12<i>x</i>² − 4 donne P″(1) = 8 ≠ 0 : racine double. En effet P = (<i>x</i>² − 1)² = (<i>x</i> − 1)²(<i>x</i> + 1)².'},
   {q:'Pour quelle valeur de <i>b</i> le nombre 2 est-il racine double de <i>x</i>³ − 12<i>x</i> + <i>b</i>&nbsp;?', lab:'b =', ans:16, tol:.001, why:'P′ = 3<i>x</i>² − 12 s’annule bien en 2. Il faut aussi P(2) = 8 − 24 + <i>b</i> = 0, donc <i>b</i> = 16. On a alors P = (<i>x</i> − 2)²(<i>x</i> + 4).'},
   {q:'Un polynôme vérifie P(<i>a</i>) = 0, P′(<i>a</i>) = 0 et P″(<i>a</i>) = 5. Alors <i>a</i> est racine…', opts:['simple','double','triple','de multiplicité 5'], ans:1, why:'La première dérivée non nulle en <i>a</i> est P″, de rang 2 : <i>a</i> est racine double.'},
 ]},
 {n:'Racines complexes d’un polynôme réel', r:'Sur ℝ : les racines vont par paires', qs:[
   {q:'Un polynôme à coefficients réels de degré 5 a au moins combien de racines réelles&nbsp;?', opts:['0','1','2','5'], ans:1, why:'Il a 5 racines complexes comptées avec multiplicité. Les racines non réelles vont par paires conjuguées, donc leur nombre est pair : il reste au moins une racine réelle.'},
   {q:'Un polynôme à coefficients réels a pour racine 2 − 3i. Laquelle de ces valeurs est forcément aussi racine&nbsp;?', opts:['−2 + 3i','3 − 2i','2 + 3i','−2 − 3i'], ans:2, why:'Si P est réel et P(<i>z</i>) = 0, alors P(<i>z̄</i>) est le conjugué de P(<i>z</i>), donc nul. Le conjugué de 2 − 3i est 2 + 3i.'},
   {q:'Combien de racines complexes, comptées avec leur multiplicité, a un polynôme de degré 6&nbsp;?', lab:'nombre =', ans:6, tol:.001, why:'Le théorème fondamental de l’algèbre donne la factorisation sur ℂ en 6 facteurs de degré 1 : <i>a</i>(<i>x</i> − <i>z</i>₁)…(<i>x</i> − <i>z</i>₆).'},
 ]},
 {n:'Factoriser sur ℝ avec les racines conjuguées', r:'Factoriser sur ℝ : associer les racines conjuguées', qs:[
   {q:'On développe (<i>x</i> − (3 + 2i))(<i>x</i> − (3 − 2i)) = <i>x</i>² + <i>px</i> + <i>q</i>. Que vaut <i>q</i>&nbsp;?', lab:'q =', ans:13, tol:.001, why:'(<i>x</i> − <i>z</i>)(<i>x</i> − <i>z̄</i>) = <i>x</i>² − 2 Re(<i>z</i>) <i>x</i> + |<i>z</i>|², donc <i>q</i> = |3 + 2i|² = 9 + 4 = 13 (et <i>p</i> = −6).'},
   {q:'P est un polynôme réel unitaire de degré 3 qui admet les racines 2 et i. Calcule P(1).', lab:'P(1) =', ans:-2, tol:.001, why:'−i est aussi racine, donc P = (<i>x</i> − 2)(<i>x</i>² + 1). P(1) = (−1) · 2 = −2.'},
   {q:'P est un polynôme réel unitaire de degré 4 qui admet les racines 1 + i et 2i. Calcule P(0).', lab:'P(0) =', ans:8, tol:.001, why:'Les conjugués 1 − i et −2i sont aussi racines. P = (<i>x</i>² − 2<i>x</i> + 2)(<i>x</i>² + 4), car |1 + i|² = 2 et |2i|² = 4. Donc P(0) = 2 · 4 = 8.'},
   {q:'Quelle est la factorisation de <i>x</i>³ − 1 en irréductibles sur ℝ&nbsp;?', opts:['(<i>x</i> − 1)(<i>x</i>² − <i>x</i> + 1)','(<i>x</i> − 1)(<i>x</i> − j)(<i>x</i> − j²)','(<i>x</i> − 1)³','(<i>x</i> − 1)(<i>x</i>² + <i>x</i> + 1)'], ans:3, why:'Les racines sont 1 et e<sup>±2iπ/3</sup> = −1/2 ± i√3/2. La paire conjuguée donne <i>x</i>² − 2 · (−1/2)<i>x</i> + 1 = <i>x</i>² + <i>x</i> + 1, de Δ = −3 &lt; 0. La version avec j est la factorisation sur ℂ.'},
 ]},
 {n:'Différence de carrés', r:'Faire apparaître une différence de carrés', qs:[
   {q:'Quelle est la factorisation de <i>x</i>⁴ + 324 sur ℝ&nbsp;?', opts:['(<i>x</i>² + 18)²','(<i>x</i>² − 6<i>x</i> + 18)(<i>x</i>² + 6<i>x</i> + 18)','(<i>x</i>² − 18<i>x</i> + 18)(<i>x</i>² + 18<i>x</i> + 18)','(<i>x</i>² − 6<i>x</i> + 9)(<i>x</i>² + 6<i>x</i> + 36)'], ans:1, why:'(<i>x</i>² + 18)² = <i>x</i>⁴ + 36<i>x</i>² + 324, donc <i>x</i>⁴ + 324 = (<i>x</i>² + 18)² − (6<i>x</i>)² = (<i>x</i>² − 6<i>x</i> + 18)(<i>x</i>² + 6<i>x</i> + 18).'},
   {q:'On écrit <i>x</i>⁴ + 4<i>x</i>² + 16 = (<i>x</i>² + <i>px</i> + 4)(<i>x</i>² − <i>px</i> + 4) avec <i>p</i> &gt; 0. Que vaut <i>p</i>&nbsp;?', lab:'p =', ans:2, tol:.001, why:'(<i>x</i>² + 4)² = <i>x</i>⁴ + 8<i>x</i>² + 16, donc <i>x</i>⁴ + 4<i>x</i>² + 16 = (<i>x</i>² + 4)² − 4<i>x</i>² = (<i>x</i>² + 4)² − (2<i>x</i>)². D’où <i>p</i> = 2.'},
   {q:'Quelle est la factorisation de 4<i>x</i>⁴ + 1 sur ℝ&nbsp;?', opts:['(2<i>x</i>² + 1)²','(2<i>x</i>² − 1)(2<i>x</i>² + 1)','(4<i>x</i>² − 2<i>x</i> + 1)(<i>x</i>² + 1)','(2<i>x</i>² − 2<i>x</i> + 1)(2<i>x</i>² + 2<i>x</i> + 1)'], ans:3, why:'(2<i>x</i>² + 1)² = 4<i>x</i>⁴ + 4<i>x</i>² + 1, donc 4<i>x</i>⁴ + 1 = (2<i>x</i>² + 1)² − (2<i>x</i>)² = (2<i>x</i>² − 2<i>x</i> + 1)(2<i>x</i>² + 2<i>x</i> + 1).'},
 ]},
 {n:'Relations entre coefficients et racines', r:'Relations entre coefficients et racines', qs:[
   {q:'Calcule la somme des trois racines (complexes) de 2<i>x</i>³ − 5<i>x</i>² + <i>x</i> + 7 (valeur décimale).', lab:'somme =', ans:2.5, tol:.001, why:'<i>x</i>₁ + <i>x</i>₂ + <i>x</i>₃ = −<i>b</i>/<i>a</i> = 5/2 = 2,5.'},
   {q:'Calcule le produit des trois racines de <i>x</i>³ − 4<i>x</i>² + 3<i>x</i> + 10.', lab:'produit =', ans:-10, tol:.001, why:'<i>x</i>₁<i>x</i>₂<i>x</i>₃ = −<i>d</i>/<i>a</i> = −10.'},
   {q:'Le polynôme <i>x</i>³ − 3<i>x</i>² + <i>cx</i> + <i>d</i> a pour racines 1 et 4. Quelle est sa troisième racine&nbsp;?', lab:'x₃ =', ans:-2, tol:.001, why:'La somme des racines vaut −(−3)/1 = 3, donc <i>x</i>₃ = 3 − 1 − 4 = −2.'},
   {q:'Les racines de <i>x</i>³ + 2<i>x</i>² − 7<i>x</i> + 1 sont <i>x</i>₁, <i>x</i>₂, <i>x</i>₃. Calcule <i>x</i>₁<i>x</i>₂ + <i>x</i>₁<i>x</i>₃ + <i>x</i>₂<i>x</i>₃.', lab:'valeur =', ans:-7, tol:.001, why:'La somme des produits deux à deux vaut <i>c</i>/<i>a</i> = −7/1 = −7.'},
 ]},
];
})();
