/* Déclic — examen de compétence : Calculer des limites de suites */
(()=>{
const n='<i>n</i>';
EXAMS['gred-calcul-limites']=[
 {n:'Règles de calcul et limites de référence', r:'Les limites de référence', qs:[
   {q:`Calcule lim (3 − 2/${n})(5 + 1/${n}²) quand ${n} → ∞.`, lab:'limite =', ans:15, why:'2/n → 0 et 1/n² → 0 : la première parenthèse tend vers 3, la seconde vers 5. Limite d’un produit : 3 · 5 = 15.'},
   {q:`Calcule lim ${F('2 + 1/√'+n,'1 − 3/'+n)} quand ${n} → ∞.`, lab:'limite =', ans:2, why:'1/√n → 0 (puissance 1/2 &gt; 0) et 3/n → 0. Le numérateur tend vers 2, le dénominateur vers 1 ≠ 0 : la limite vaut 2.'},
   {q:`Calcule lim (5 · 0,7<sup>${n}</sup> + 4) quand ${n} → ∞.`, lab:'limite =', ans:4, why:'|0,7| &lt; 1 donc 0,7ⁿ → 0, puis 5 · 0,7ⁿ → 0. La limite vaut 0 + 4 = 4.'},
   {q:`Calcule lim (1 + 1/${n})(2 − 0,5<sup>${n}</sup>) quand ${n} → ∞.`, lab:'limite =', ans:2, why:'1 + 1/n → 1 et 0,5ⁿ → 0, donc 2 − 0,5ⁿ → 2. Produit : 1 · 2 = 2.'},
   {q:'Laquelle de ces suites n’a <b>aucune</b> limite, ni finie ni infinie&nbsp;?', opts:['0,8ⁿ','1,2ⁿ','(−1,2)ⁿ','(−0,8)ⁿ'], ans:2, why:'Pour q ≤ −1, qⁿ alterne de signe en grandissant en valeur absolue : pas de limite. 0,8ⁿ et (−0,8)ⁿ tendent vers 0 (|q| &lt; 1), 1,2ⁿ tend vers +∞.'},
 ]},
 {n:'Encadrer avec les gendarmes', r:'Encadrer pour trouver une limite', qs:[
   {q:`Calcule lim ${F('3'+n+' + cos '+n,n)} quand ${n} → ∞.`, lab:'limite =', ans:3, why:'On sépare : 3 + (cos n)/n. Comme −1/n ≤ (cos n)/n ≤ 1/n et que les deux bornes tendent vers 0, (cos n)/n → 0. Limite : 3.'},
   {q:`Calcule lim ${F('2 + (−1)<sup>'+n+'</sup>',n)} quand ${n} → ∞.`, lab:'limite =', ans:0, why:'1 ≤ 2 + (−1)ⁿ ≤ 3, donc 1/n ≤ uₙ ≤ 3/n. Les deux gendarmes tendent vers 0 : uₙ → 0.'},
   {q:`Calcule lim ${F(n+'² cos '+n,n+'³ + 1')} quand ${n} → ∞.`, lab:'limite =', ans:0, why:'|n² cos n| ≤ n², donc −n²/(n³ + 1) ≤ uₙ ≤ n²/(n³ + 1). Les bornes ont un degré plus petit en haut : elles tendent vers 0, donc uₙ → 0.'},
   {q:`Calcule lim ${F(n+' + sin '+n,n+' + 2')} quand ${n} → ∞.`, lab:'limite =', ans:1, why:'−1 ≤ sin n ≤ 1 donne (n − 1)/(n + 2) ≤ uₙ ≤ (n + 1)/(n + 2). Les deux bornes ont même degré en haut et en bas, de coefficients dominants 1 et 1 : elles tendent vers 1, donc uₙ → 1.'},
   {q:'Un élève écrit : « −1 ≤ (−1)ⁿ ≤ 1, donc par les gendarmes (−1)ⁿ tend vers une limite comprise entre −1 et 1. » Où est l’erreur&nbsp;?', opts:['Il n’y a pas d’erreur : la limite vaut 0','L’encadrement est faux','Les gendarmes doivent avoir la même limite ; ici −1 et 1 diffèrent, on ne conclut rien','Les gendarmes ne s’appliquent qu’aux suites positives'], ans:2, why:'Le théorème exige deux bornes de même limite. Avec −1 et 1, il ne dit rien ; de fait (−1)ⁿ n’a pas de limite.'},
 ]},
 {n:'Passer à la limite dans une inégalité', r:'Passer à la limite dans une inégalité', qs:[
   {q:`Une suite convergente vérifie <i>uₙ</i> ≤ 5 − 1/${n} pour tout ${n} ≥ 1. Quelle est la plus grande valeur possible de sa limite <i>L</i>&nbsp;?`, lab:'L ≤', ans:5, why:'En passant à la limite dans l’inégalité, L ≤ lim (5 − 1/n) = 5. La valeur 5 est possible : uₙ = 5 − 1/n elle-même convient.'},
   {q:'Une suite convergente vérifie <i>uₙ</i> &gt; 0 pour tout <i>n</i>. Que peut-on dire de sa limite <i>L</i>&nbsp;?', opts:['L &gt; 0','L ≥ 0, et L = 0 est possible','L = 0','On ne peut rien dire'], ans:1, why:'À la limite, l’inégalité stricte devient large : L ≥ 0. Exemple 1/n &gt; 0 qui tend vers 0.'},
   {q:'On sait que <i>uₙ</i> &lt; <i>vₙ</i> pour tout <i>n</i>, <i>uₙ</i> → <i>a</i> et <i>vₙ</i> → <i>b</i>. Laquelle de ces conclusions est garantie&nbsp;?', opts:['a &lt; b','a ≤ b','a = b','a &gt; b'], ans:1, why:'Le passage à la limite donne seulement a ≤ b. Par exemple uₙ = 0 &lt; vₙ = 1/n, et pourtant a = b = 0.'},
 ]},
 {n:'Factoriser le terme dominant', r:'Factoriser le terme dominant', qs:[
   {q:`Calcule lim ${F('3'+n+'² − '+n+' + 4','6'+n+'² + 5')} quand ${n} → ∞. Donne une fraction ou un décimal exact.`, lab:'limite =', ans:0.5, tol:1e-9, show:'1/2', why:'On factorise n² : (3 − 1/n + 4/n²)/(6 + 5/n²) → 3/6 = 1/2.'},
   {q:`Calcule lim ${F('2'+n+'³ − 1',n+'⁴ + '+n)} quand ${n} → ∞.`, lab:'limite =', ans:0, why:'Degré 3 en haut, 4 en bas. En factorisant n⁴ : (2/n − 1/n⁴)/(1 + 1/n³) → 0/1 = 0.'},
   {q:`Calcule lim ${F('5 − 4'+n+'²','2'+n+'² + '+n)} quand ${n} → ∞.`, lab:'limite =', ans:-2, why:'Même degré 2 : on factorise n², (5/n² − 4)/(2 + 1/n) → −4/2 = −2.'},
   {q:`Calcule lim ${F('3<sup>'+n+'</sup> + 2<sup>'+n+'</sup>','3<sup>'+n+' + 1</sup> − 1')} quand ${n} → ∞. Donne une fraction ou un arrondi au millième.`, lab:'limite =', ans:1/3, tol:5e-4, show:'1/3', why:'On factorise 3ⁿ, la plus grande base : (1 + (2/3)ⁿ)/(3 − (1/3)ⁿ). Comme (2/3)ⁿ → 0 et (1/3)ⁿ → 0, la limite vaut 1/3.'},
   {q:`Que vaut lim (${n}³ − 2${n}⁵) quand ${n} → ∞&nbsp;?`, opts:['+∞','−∞','0','On ne peut pas conclure : c’est une forme ∞ − ∞'], ans:1, why:'C’est bien une forme ∞ − ∞, mais on lève l’indétermination : n³ − 2n⁵ = n⁵(1/n² − 2), avec n⁵ → +∞ et la parenthèse → −2. Le produit tend vers −∞.'},
 ]},
 {n:'Multiplier par la quantité conjuguée', r:'Multiplier par la quantité conjuguée', qs:[
   {q:`Calcule lim (√(${n}² + 6${n}) − ${n}) quand ${n} → ∞.`, lab:'limite =', ans:3, why:'Conjugué : (n² + 6n − n²)/(√(n² + 6n) + n) = 6n/(n(√(1 + 6/n) + 1)) → 6/2 = 3.'},
   {q:`Calcule lim (√(${n} + 5) − √${n}) quand ${n} → ∞.`, lab:'limite =', ans:0, why:'Conjugué : ((n + 5) − n)/(√(n + 5) + √n) = 5/(√(n + 5) + √n). Le dénominateur tend vers +∞ : la limite vaut 0.'},
   {q:`Calcule lim (√(9${n}² + 2${n}) − 3${n}) quand ${n} → ∞. Donne une fraction ou un arrondi au millième.`, lab:'limite =', ans:1/3, tol:5e-4, show:'1/3', why:'Conjugué : 2n/(√(9n² + 2n) + 3n) = 2/(√(9 + 2/n) + 3) → 2/(3 + 3) = 1/3.'},
   {q:`Calcule lim (${n} − √(${n}² − 4${n})) quand ${n} → ∞.`, lab:'limite =', ans:2, why:'Conjugué : (n² − (n² − 4n))/(n + √(n² − 4n)) = 4n/(n(1 + √(1 − 4/n))) → 4/2 = 2.'},
 ]},
 {n:'Suites adjacentes', r:'Suites adjacentes', qs:[
   {q:`<i>aₙ</i> = 3 − 1/${n} et <i>bₙ</i> = 3 + 1/${n}² (pour ${n} ≥ 1). Ces suites sont adjacentes. Quelle est leur limite commune&nbsp;?`, lab:'L =', ans:3, why:'(aₙ) croît, (bₙ) décroît, bₙ − aₙ = 1/n + 1/n² → 0. Les deux suites tendent vers 3.'},
   {q:'Lequel de ces couples (<i>aₙ</i>), (<i>bₙ</i>) est formé de suites adjacentes&nbsp;?', opts:['aₙ = 2 + 1/n, bₙ = 2 − 1/n','aₙ = −1/n², bₙ = 1/n','aₙ = 1 − 1/n, bₙ = 2 + 1/n','aₙ = n, bₙ = n + 1'], ans:1, why:'−1/n² croît, 1/n décroît et leur différence 1/n + 1/n² tend vers 0. Le 1er couple a les monotonies inversées, le 3e une différence qui tend vers 1, le 4e diverge.'},
   {q:'Deux suites adjacentes de limite <i>L</i> vérifient <i>a</i>₁₀ = 1,732 et <i>b</i>₁₀ = 1,733. Que peut-on affirmer&nbsp;?', opts:['L = 1,732','L = 1,7325','1,732 ≤ L ≤ 1,733','L &gt; 1,733'], ans:2, why:'Pour des suites adjacentes, aₙ ≤ L ≤ bₙ pour tout n : chaque couple encadre la limite, sans la donner exactement.'},
   {q:`Deux suites adjacentes vérifient <i>bₙ</i> − <i>aₙ</i> = 2/${n}. Quel est le plus petit rang ${n} pour lequel <i>bₙ</i> − <i>aₙ</i> &lt; 0,001&nbsp;?`, lab:'n =', ans:2001, why:'2/n &lt; 0,001 ⇔ n &gt; 2000. Pour n = 2000, l’écart vaut exactement 0,001 : le premier rang qui convient est 2001.'},
 ]},
 {n:'Développement décimal et fraction', r:'Développement périodique et fraction', qs:[
   {q:'On écrit <i>x</i> = 0,121212… sous forme de fraction irréductible <i>p</i>/<i>q</i>. Que vaut <i>q</i>&nbsp;?', lab:'q =', ans:33, why:'Période « 12 » de longueur 2 : 100x − x = 12, donc x = 12/99 = 4/33. Le dénominateur réduit est 33.'},
   {q:'Écris <i>x</i> = 0,1666… (le 6 se répète) sous forme de fraction.', lab:'x =', ans:1/6, tol:1e-6, show:'1/6', why:'10x = 1,666… et 100x = 16,666… : 100x − 10x = 15, donc 90x = 15 et x = 15/90 = 1/6.'},
   {q:'Écris <i>x</i> = 2,333… (le 3 se répète) sous forme de fraction.', lab:'x =', ans:7/3, tol:1e-6, show:'7/3', why:'10x = 23,333…, donc 10x − x = 21 et x = 21/9 = 7/3.'},
   {q:'Quelle est la valeur exacte du nombre 0,999… (le 9 se répète indéfiniment)&nbsp;?', lab:'valeur :', ans:1, why:'C’est la limite de uₙ = 1 − 10⁻ⁿ, qui vaut 1 puisque 10⁻ⁿ → 0. Ou bien : 10x − x = 9, donc x = 1.'},
 ]},
];
})();
