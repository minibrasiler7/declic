/* Déclic — examen de compétence : Croissance, extrema, parité, périodicité */
(()=>{
const x='<i>x</i>', f='<i>f</i>', a='<i>a</i>', b='<i>b</i>';
EXAMS['gred-variations']=[
 {n:'Prouver une monotonie', r:'Prouver une monotonie avec la définition', qs:[
   {q:`Pour ${f}(${x}) = ${x}² + 2${x}, on trouve ${f}(${b}) − ${f}(${a}) = (${b} − ${a})(${a} + ${b} + 2). Sur lequel de ces intervalles ${f} est-elle strictement croissante&nbsp;?`, opts:[']−∞ ; −1]','[−1 ; +∞[','ℝ','[−2 ; 0]'], ans:1, why:'Si −1 ≤ a &lt; b, alors a + b + 2 &gt; 0 et b − a &gt; 0 : la différence est positive, f croît. Sur ]−∞ ; −1], a + b + 2 &lt; 0 et f décroît ; sur ℝ ou [−2 ; 0], les deux cas se produisent.'},
   {q:`Soit ${f}(${x}) = ${F('1',x+' − 2')} sur ]2 ; +∞[. Pour 2 &lt; ${a} &lt; ${b}, ${f}(${b}) − ${f}(${a}) = ${F(a+' − '+b,'('+a+' − 2)('+b+' − 2)')}. Que conclut-on&nbsp;?`, opts:['f est strictement croissante sur ]2 ; +∞[','f est strictement décroissante sur ]2 ; +∞[','f n’est pas monotone sur ]2 ; +∞[','On ne peut pas conclure sans dérivée'], ans:1, why:'a − b &lt; 0, et a − 2 &gt; 0, b − 2 &gt; 0 : la différence est négative. Donc a &lt; b ⇒ f(a) &gt; f(b) : strictement décroissante.'},
   {q:`Soit ${f}(${x}) = −2${x} + 5. Que vaut ${f}(3) − ${f}(1)&nbsp;?`, lab:'f(3) − f(1) =', ans:-4, why:'f(3) − f(1) = −2 · (3 − 1) = −4 &lt; 0 : avec 1 &lt; 3, l’ordre est renversé, comme pour toute fonction affine de pente négative.'},
   {q:'Une fonction constante sur ℝ est…', opts:['strictement croissante','ni croissante ni décroissante','à la fois croissante et décroissante, mais ni l’une ni l’autre strictement','seulement décroissante'], ans:2, why:'Pour x₁ &lt; x₂, f(x₁) = f(x₂) : les deux inégalités larges f(x₁) ≤ f(x₂) et f(x₁) ≥ f(x₂) sont vraies, les strictes non.'},
   {q:`${f}(${x}) = (${x} − 3)² est décroissante sur ]−∞ ; <i>c</i>] et croissante sur [<i>c</i> ; +∞[. Que vaut <i>c</i>&nbsp;?`, lab:'c =', ans:3, why:'f(b) − f(a) = (b − a)(a + b − 6) : négatif si a &lt; b ≤ 3, positif si 3 ≤ a &lt; b. Le changement de sens a lieu en 3.'},
 ]},
 {n:'Bornes, maximum et minimum', r:'Fonctions bornées, maximum et minimum', qs:[
   {q:`Quel est le maximum de ${f}(${x}) = ${F('4','2 + '+x+'²')} sur ℝ&nbsp;?`, lab:'maximum :', ans:2, why:'2 + x² ≥ 2, avec égalité en 0, donc f(x) ≤ 4/2 = 2 = f(0). Le maximum vaut 2.'},
   {q:`Quel est le maximum de ${x} ↦ 2 − sin ${x} sur ℝ&nbsp;?`, lab:'maximum :', ans:3, why:'sin x ≥ −1, donc 2 − sin x ≤ 3, avec égalité quand sin x = −1 (par exemple x = −π/2).'},
   {q:`Quel est le minimum de ${x} ↦ ${x}² − 6${x} + 11 sur ℝ&nbsp;?`, lab:'minimum :', ans:2, why:'x² − 6x + 11 = (x − 3)² + 2 ≥ 2, avec égalité en x = 3.'},
   {q:`Que dire de ${x} ↦ ${x}² sur l’intervalle ouvert ]1 ; 3[&nbsp;?`, opts:['Minimum 1 et maximum 9','Minorée par 1 et majorée par 9, sans minimum ni maximum','Ni majorée ni minorée','Minimum 1, pas de maximum'], ans:1, why:'Pour 1 &lt; x &lt; 3, 1 &lt; x² &lt; 9 : bornée. Mais 1 et 9 ne sont atteints qu’en 1 et 3, exclus de l’intervalle : pas d’extremum.'},
   {q:`Que dire de ${x} ↦ 1/${x} sur [1 ; +∞[&nbsp;?`, opts:['Maximum 1 atteint en 1 ; minorée par 0, sans minimum','Minimum 0 atteint à l’infini','Ni majorée ni minorée','Maximum 1 et minimum 0'], ans:0, why:'Pour x ≥ 1, 0 &lt; 1/x ≤ 1 = f(1) : maximum 1. 1/x prend des valeurs aussi proches de 0 qu’on veut sans jamais valoir 0 : pas de minimum.'},
 ]},
 {n:'Extrema locaux et globaux', r:'Extrema locaux et globaux', qs:[
   {q:`${f}(${x}) = ${x}³ − 12${x} admet un maximum local en ${x} = −2. Quelle est sa valeur&nbsp;?`, lab:'f(−2) =', ans:16, why:'f(−2) = −8 + 24 = 16. Ce maximum n’est pas global : f(5) = 125 − 60 = 65 &gt; 16.'},
   {q:`<i>g</i>(${x}) = ${x}³ − 3${x} − 2 admet un minimum local en ${x} = 1. Quelle est sa valeur&nbsp;?`, lab:'g(1) =', ans:-4, why:'g(1) = 1 − 3 − 2 = −4. Retrancher 2 à x³ − 3x décale le graphe vers le bas sans déplacer les extrema.'},
   {q:'Laquelle de ces affirmations est vraie&nbsp;?', opts:['Un extremum local est toujours global','Un maximum global est aussi un maximum local','Une fonction a toujours au moins un extremum local','Un maximum local est toujours plus grand qu’un minimum local'], ans:1, why:'Si f(x) ≤ f(x₀) pour tout x du domaine, c’est vrai en particulier sur un voisinage. L’inverse est faux (x³ − 3x), x ↦ x n’a aucun extremum, et un maximum local peut être plus bas qu’un minimum local ailleurs.'},
 ]},
 {n:'Parité', r:'Étudier la parité d’une fonction', qs:[
   {q:'Laquelle de ces fonctions est impaire&nbsp;?', opts:['x ↦ x² + x','x ↦ |x| + x','x ↦ x⁴ + 1','x ↦ x³ − x'], ans:3, why:'(−x)³ − (−x) = −x³ + x = −(x³ − x) : impaire. Les deux premières mélangent un terme pair et un terme impair ; x⁴ + 1 est paire.'},
   {q:`Quelle est la parité de ${x} ↦ ${F(x+'²',x+'² + 1')}&nbsp;?`, opts:['paire','impaire','ni paire ni impaire','paire et impaire'], ans:0, why:'Domaine ℝ, symétrique ; (−x)²/((−x)² + 1) = x²/(x² + 1) : paire.'},
   {q:`${f} est impaire et ${f}(2) = 5. Que vaut ${f}(−2)&nbsp;?`, lab:'f(−2) =', ans:-5, why:'Impaire : f(−2) = −f(2) = −5.'},
   {q:`${f} est impaire et définie en 0. Que vaut ${f}(0)&nbsp;?`, lab:'f(0) =', ans:0, why:'f(−0) = −f(0) donne f(0) = −f(0), donc 2f(0) = 0 et f(0) = 0.'},
   {q:`Quelle est la parité de ${x} ↦ ${x}³ + 2&nbsp;?`, opts:['paire','impaire','ni paire ni impaire','impaire, car x³ est impaire'], ans:2, why:'f(1) = 3 et f(−1) = 1. Or 1 ≠ 3 et 1 ≠ −3 : ni paire ni impaire. Ajouter une constante non nulle détruit l’imparité.'},
 ]},
 {n:'Périodicité', r:'Périodicité', qs:[
   {q:`Quelle est la plus petite période de ${x} ↦ sin(4${x})&nbsp;? Donne un arrondi au centième.`, lab:'T ≈', ans:Math.PI/2, tol:0.006, show:'π/2 ≈ 1,57', why:'sin(4(x + T)) = sin(4x + 4T) : il faut 4T = 2π, soit T = π/2 ≈ 1,57.'},
   {q:`${f} est périodique de période 3 et ${f}(1) = 7. Que vaut ${f}(10)&nbsp;?`, lab:'f(10) =', ans:7, why:'10 = 1 + 3 · 3, donc f(10) = f(1 + 3T) = f(1) = 7.'},
   {q:`Quelle est la plus petite période de ${x} ↦ 2${x} − ⌊2${x}⌋&nbsp;?`, lab:'T =', ans:0.5, tol:1e-9, show:'1/2', why:'C’est la partie décimale évaluée en 2x. Elle se répète quand 2x augmente de 1, c’est-à-dire quand x augmente de 1/2.'},
   {q:'Lequel de ces nombres n’est <b>pas</b> une période de cos&nbsp;?', opts:['2π','4π','π','6π'], ans:2, why:'cos(0 + π) = −1 ≠ cos 0 = 1 : π n’est pas une période. 2π l’est, donc ses multiples 4π et 6π aussi.'},
 ]},
 {n:'Variations des composées', r:'Déterminer les variations d’une composée', qs:[
   {q:`Quelles sont les variations de ${x} ↦ √(${x} − 3) sur [3 ; +∞[&nbsp;?`, opts:['croissante','décroissante','croissante puis décroissante','constante'], ans:0, why:'u(x) = x − 3 croît, à valeurs dans [0 ; +∞[, et √ croît sur [0 ; +∞[ : composée de deux croissantes, croissante.'},
   {q:`${x} ↦ ${F('1',x+'² + 4')} est décroissante sur [0 ; +∞[. Quel est son maximum sur [0 ; +∞[&nbsp;?`, lab:'maximum :', ans:0.25, tol:1e-9, show:'1/4', why:'u(x) = x² + 4 croît sur [0 ; +∞[ et 1/t décroît sur ]0 ; +∞[ : la composée décroît, son maximum est en 0 : 1/4.'},
   {q:`Quelles sont les variations de ${x} ↦ (2 − ${x})³ sur ℝ&nbsp;?`, opts:['croissante, car x³ est croissante','décroissante : 2 − x décroît et le cube croît','croissante sur [2 ; +∞[ seulement','ni croissante ni décroissante'], ans:1, why:'u(x) = 2 − x est décroissante et t ↦ t³ croissante : sens contraires, la composée est décroissante.'},
   {q:`Soient ${f}(${x}) = ${x} + 3 et <i>g</i>(${x}) = ${x}². Que vaut <i>g</i>(${f}(1)) − ${f}(<i>g</i>(1))&nbsp;?`, lab:'résultat :', ans:12, why:'g(f(1)) = g(4) = 16 et f(g(1)) = f(1) = 4. Différence 12 : g ∘ f et f ∘ g ne sont pas la même fonction.'},
 ]},
 {n:'Encadrer une fonction', r:'Encadrer une fonction sur un intervalle', qs:[
   {q:`Pour ${x} ∈ [1 ; 9], quel est le maximum de 3 + ${F('2','√'+x)}&nbsp;?`, lab:'maximum :', ans:5, why:'1 ≤ √x ≤ 3, puis 2/3 ≤ 2/√x ≤ 2 (l’inverse renverse), donc 11/3 ≤ 3 + 2/√x ≤ 5. Le maximum 5 est atteint en x = 1.'},
   {q:`Pour ${x} ∈ [−3 ; 2], quel est le maximum de ${x}² + 1&nbsp;?`, lab:'maximum :', ans:10, why:'Sur [−3 ; 2], x² est compris entre 0 et max(9 ; 4) = 9. Donc x² + 1 ≤ 10, atteint en x = −3.'},
   {q:`Pour ${x} ∈ [−3 ; 2], quel est le minimum de ${x}² + 1&nbsp;?`, lab:'minimum :', ans:1, why:'L’intervalle contient 0, où x² vaut 0 : le minimum est 0 + 1 = 1. Le piège serait de prendre la valeur à une borne, 5 ou 10.'},
   {q:`Pour ${x} ∈ [2 ; 5], quel est le minimum de ${F('1',x+' − 1')}&nbsp;?`, lab:'minimum :', ans:0.25, tol:1e-9, show:'1/4', why:'1 ≤ x − 1 ≤ 4, puis l’inverse renverse : 1/4 ≤ 1/(x − 1) ≤ 1. Le minimum 1/4 est atteint en x = 5.'},
 ]},
];
})();
