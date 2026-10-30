/* Déclic — examen de compétence : Suites et limites */
(()=>{
const n='<i>n</i>', u='<i>uₙ</i>', lim=`lim quand ${n} → ∞`;
EXAMS['an1-suites']=[
 {n:'Sens de variation et suites bornées', r:'Étudier le sens de variation d’une suite', qs:[
   {q:`Pour ${u} = ${F('2'+n+' + 1',n+' + 3')}, quel est le signe de <i>uₙ₊₁</i> − ${u}, et qu’en conclut-on ?`, opts:['Positif : la suite est croissante','Négatif : la suite est décroissante','Il change de signe : la suite n’est pas monotone','Nul : la suite est constante'], ans:0, why:'uₙ₊₁ − uₙ = ((2n + 3)(n + 3) − (2n + 1)(n + 4))/((n + 3)(n + 4)) = (2n² + 9n + 9 − 2n² − 9n − 4)/((n + 3)(n + 4)) = 5/((n + 3)(n + 4)) &gt; 0.'},
   {q:`La suite ${u} = ${n}² − 6${n} (pour ${n} ≥ 0) est…`, opts:['croissante','décroissante','ni croissante ni décroissante','constante à partir du rang 3'], ans:2, why:'uₙ₊₁ − uₙ = (n + 1)² − 6(n + 1) − n² + 6n = 2n − 5. Négatif pour n ≤ 2, positif pour n ≥ 3 : la suite descend (0, −5, −8, −9) puis remonte. Elle n’est pas monotone.'},
   {q:`Pour ${u} = ${F(n,'3<sup><i>n</i></sup>')} (${n} ≥ 1), dont tous les termes sont positifs, que donne le quotient <i>uₙ₊₁</i>/${u} ?`, opts:['(n + 1)/(3n), qui est ≤ 1 : la suite est décroissante','3(n + 1)/n, qui est ≥ 1 : la suite est croissante','(n + 1)/(3n), qui est ≥ 1 : la suite est croissante','1/3 : la suite est décroissante'], ans:0, why:'uₙ₊₁/uₙ = (n + 1)/3ⁿ⁺¹ · 3ⁿ/n = (n + 1)/(3n). Or n + 1 ≤ 3n dès que n ≥ 1/2 : le quotient est ≤ 1, la suite décroît.'},
   {q:'Laquelle de ces suites est bornée ?', opts:['uₙ = √n','uₙ = (−2)ⁿ','uₙ = 4n/(n + 1)','uₙ = n − 1/n'], ans:2, why:'0 ≤ 4n/(n + 1) &lt; 4n/n = 4, donc |uₙ| ≤ 4. Les trois autres prennent des valeurs aussi grandes qu’on veut en valeur absolue.'},
 ]},
 {n:'La définition ε–N', r:'Trouver le rang N pour un ε donné', qs:[
   {q:`${u} = ${F('5'+n+' + 2',n)} tend vers 5. Quel est le plus petit <i>N</i> tel que |${u} − 5| &lt; 0,01 pour tout ${n} ≥ <i>N</i> ?`, lab:'<i>N</i> =', ans:201, why:'uₙ − 5 = 2/n. 2/n &lt; 0,01 ⇔ n &gt; 200. Pour n = 200 l’écart vaut exactement 0,01, pas strictement moins : N = 201.'},
   {q:`${u} = ${F(n+' + 3',n+' + 1')} tend vers 1. Quel est le plus petit <i>N</i> tel que |${u} − 1| &lt; 0,1 pour tout ${n} ≥ <i>N</i> ?`, lab:'<i>N</i> =', ans:20, why:'uₙ − 1 = 2/(n + 1). 2/(n + 1) &lt; 0,1 ⇔ n + 1 &gt; 20 ⇔ n &gt; 19. Pour n = 19 l’écart vaut 0,1 exactement : N = 20.'},
   {q:`${u} = ${F('1',n+'²')} tend vers 0. Quel est le plus petit <i>N</i> tel que ${u} &lt; 0,0001 pour tout ${n} ≥ <i>N</i> ?`, lab:'<i>N</i> =', ans:101, why:'1/n² &lt; 0,0001 ⇔ n² &gt; 10 000 ⇔ n &gt; 100. Pour n = 100, 1/n² = 0,0001 exactement : N = 101.'},
   {q:`${u} = ${F('3'+n+' − 1',n+' + 2')} tend vers 3. Quel est le plus petit <i>N</i> tel que |${u} − 3| &lt; 0,05 pour tout ${n} ≥ <i>N</i> ?`, lab:'<i>N</i> =', ans:139, why:'uₙ − 3 = (3n − 1 − 3n − 6)/(n + 2) = −7/(n + 2), donc |uₙ − 3| = 7/(n + 2). 7/(n + 2) &lt; 0,05 ⇔ n + 2 &gt; 140 ⇔ n &gt; 138 : N = 139.'},
 ]},
 {n:'Règles de calcul et formes indéterminées', r:'Limites infinies et règles de calcul', qs:[
   {q:'Laquelle de ces situations est une forme indéterminée ?', opts:['uₙ → 2 et vₙ → +∞, on cherche lim uₙvₙ','uₙ → +∞ et vₙ → −∞, on cherche lim (uₙ + vₙ)','uₙ → 0 et vₙ → 5, on cherche lim uₙ/vₙ','uₙ → −∞ et vₙ → −∞, on cherche lim (uₙ + vₙ)'], ans:1, why:'+∞ + (−∞) est la forme ∞ − ∞ : indéterminée. Les autres donnent +∞, 0/5 = 0 et −∞.'},
   {q:'On sait que uₙ → −2 et vₙ → +∞. Que vaut lim uₙ · vₙ ?', opts:['+∞','−∞','0','On ne peut pas savoir : forme indéterminée'], ans:1, why:'Un nombre négatif fois une quantité qui tend vers +∞ : le produit tend vers −∞. Ce n’est pas indéterminé (seul 0 · ∞ l’est).'},
   {q:'On sait que uₙ → 5 et vₙ → −∞. Que vaut lim uₙ/vₙ ?', lab:'limite =', ans:0, why:'Un nombre fixe divisé par une quantité qui devient infinie : L/∞ = 0.'},
 ]},
 {n:'Mettre en facteur le terme dominant', r:'Mettre en facteur le terme dominant', qs:[
   {q:`Calcule ${lim} de ${F('4'+n+'² + 3'+n,'2'+n+'² − 7')}.`, lab:'limite =', ans:2, why:'On factorise n² : (4 + 3/n)/(2 − 7/n²) → 4/2 = 2.'},
   {q:`Calcule ${lim} de ${F('2'+n+'³ − '+n,'4 − 5'+n+'³')}.`, lab:'limite =', ans:-0.4, show:'−2/5', why:'On factorise n³ : (2 − 1/n²)/(4/n³ − 5) → 2/(−5) = −2/5 = −0,4.'},
   {q:`Calcule ${lim} de ${F('2'+n+' + 1',n+'³ + 4')}.`, lab:'limite =', ans:0, why:'Degré du haut (1) plus petit que celui du bas (3) : (2/n² + 1/n³)/(1 + 4/n³) → 0/1 = 0.'},
   {q:`Que vaut ${lim} de ${F('5'+n+' − '+n+'²','3'+n+' + 1')} ?`, opts:['−1/3','5/3','−∞','+∞'], ans:2, why:'n²(5/n − 1)/(n(3 + 1/n)) = n · (5/n − 1)/(3 + 1/n). Le quotient tend vers −1/3 et n → +∞ : la limite vaut −∞.'},
 ]},
 {n:'La quantité conjuguée', r:'Multiplier par la quantité conjuguée', qs:[
   {q:`Calcule ${lim} de √(${n}² + 6${n}) − ${n}.`, lab:'limite =', ans:3, why:'Avec le conjugué : (n² + 6n − n²)/(√(n² + 6n) + n) = 6n/(n(√(1 + 6/n) + 1)) → 6/2 = 3.'},
   {q:`Calcule ${lim} de √(${n}² + 1) − ${n}.`, lab:'limite =', ans:0, why:'Avec le conjugué : (n² + 1 − n²)/(√(n² + 1) + n) = 1/(√(n² + 1) + n). Le dénominateur tend vers +∞ : la limite vaut 0.'},
   {q:`Calcule ${lim} de √(4${n}² + 3${n}) − 2${n}.`, lab:'limite =', ans:0.75, show:'3/4', why:'Conjugué : 3n/(√(4n² + 3n) + 2n) = 3n/(n(√(4 + 3/n) + 2)) → 3/(2 + 2) = 3/4.'},
   {q:`Calcule ${lim} de ${n}(√(${n}² + 2) − ${n}).`, lab:'limite =', ans:1, why:'Conjugué : n · 2/(√(n² + 2) + n) = 2n/(n(√(1 + 2/n²) + 1)) → 2/2 = 1. Sans transformation, c’est la forme ∞ · 0.'},
 ]},
 {n:'Le théorème des gendarmes', r:'Le théorème des gendarmes', qs:[
   {q:`Calcule ${lim} de ${F('3'+n+' + cos '+n,n+' + 2')}.`, lab:'limite =', ans:3, why:'−1 ≤ cos n ≤ 1 donne (3n − 1)/(n + 2) ≤ uₙ ≤ (3n + 1)/(n + 2). Les deux bornes tendent vers 3, donc uₙ → 3.'},
   {q:`Calcule ${lim} de ${F(n+' sin '+n,n+'² + 1')}.`, lab:'limite =', ans:0, why:'−n ≤ n sin n ≤ n, donc −n/(n² + 1) ≤ uₙ ≤ n/(n² + 1). Les deux bornes tendent vers 0 (degré 1 contre degré 2).'},
   {q:`Calcule ${lim} de ${F('4'+n+' + 3 sin '+n,'2'+n+' − 1')}.`, lab:'limite =', ans:2, why:'−3 ≤ 3 sin n ≤ 3 donne (4n − 3)/(2n − 1) ≤ uₙ ≤ (4n + 3)/(2n − 1). Les deux bornes tendent vers 4/2 = 2.'},
   {q:`Que fait la suite ${u} = ${n} + 3 cos ${n} ?`, opts:['Elle tend vers +∞','Elle n’a pas de limite car cos n oscille','Elle tend vers 3','Elle tend vers 0'], ans:0, why:'cos n ≥ −1, donc uₙ ≥ n − 3, qui tend vers +∞. Un seul gendarme suffit : uₙ → +∞.'},
 ]},
 {n:'Les puissances qⁿ', r:'La limite de qⁿ', qs:[
   {q:'Laquelle de ces suites tend vers 0 ?', opts:['(1,01)ⁿ','(−0,99)ⁿ','(−1)ⁿ','(−1,2)ⁿ'], ans:1, why:'|−0,99| &lt; 1, donc (−0,99)ⁿ → 0. (1,01)ⁿ → +∞, (−1)ⁿ et (−1,2)ⁿ n’ont pas de limite.'},
   {q:`Calcule ${lim} de ${F('3 · 5<sup><i>n</i></sup> + 2<sup><i>n</i></sup>','5<sup><i>n</i>+1</sup> − 4<sup><i>n</i></sup>')}.`, lab:'limite =', ans:0.6, show:'3/5', why:'5ⁿ⁺¹ = 5 · 5ⁿ. On factorise 5ⁿ : (3 + (2/5)ⁿ)/(5 − (4/5)ⁿ) → 3/5 = 0,6.'},
   {q:`Calcule ${lim} de ${F('2<sup><i>n</i></sup> − 7<sup><i>n</i></sup>','3<sup><i>n</i></sup> + 7<sup><i>n</i></sup>')}.`, lab:'limite =', ans:-1, why:'On factorise 7ⁿ, la plus grande base : ((2/7)ⁿ − 1)/((3/7)ⁿ + 1) → (0 − 1)/(0 + 1) = −1.'},
   {q:`Que vaut ${lim} de ${F('4<sup><i>n</i></sup> + 1','3<sup><i>n</i></sup> + 2<sup><i>n</i></sup>')} ?`, opts:['1','4/3','+∞','0'], ans:2, why:'En haut on factorise 4ⁿ, en bas 3ⁿ : (4/3)ⁿ · (1 + (1/4)ⁿ)/(1 + (2/3)ⁿ). La fraction tend vers 1 et (4/3)ⁿ → +∞ car 4/3 &gt; 1.'},
 ]},
 {n:'Suites récurrentes affines', r:'Suite récurrente uₙ₊₁ = a uₙ + b', qs:[
   {q:'<i>u</i>₀ = 10 et <i>uₙ₊₁</i> = 0,2 <i>uₙ</i> + 4. Vers quelle limite tend (<i>uₙ</i>) ?', lab:'limite =', ans:5, why:'Point fixe : L = 0,2L + 4 ⇔ 0,8L = 4 ⇔ L = 5. Avec vₙ = uₙ − 5 : vₙ₊₁ = 0,2vₙ, donc uₙ = 5 + 5 · 0,2ⁿ → 5.'},
   {q:'<i>u</i>₀ = 1 et <i>uₙ₊₁</i> = 0,5 <i>uₙ</i> + 3. On écrit <i>uₙ</i> = <i>L</i> + <i>c</i> · 0,5ⁿ. Que vaut <i>c</i> ?', lab:'<i>c</i> =', ans:-5, why:'L = 0,5L + 3 donne L = 6. Puis c = v₀ = u₀ − L = 1 − 6 = −5 : uₙ = 6 − 5 · 0,5ⁿ.'},
   {q:'<i>u</i>₀ = 3 et <i>uₙ₊₁</i> = 3 <i>uₙ</i> − 4. Que fait la suite ?', opts:['Elle converge vers 2','Elle converge vers −2','Elle tend vers +∞','Elle tend vers −∞'], ans:2, why:'Le point fixe est L = 2 (L = 3L − 4). Mais vₙ = uₙ − 2 vérifie vₙ₊₁ = 3vₙ, donc uₙ = 2 + 1 · 3ⁿ → +∞. Le point fixe n’est qu’un candidat.'},
   {q:'<i>u</i>₀ = 0 et <i>uₙ₊₁</i> = 0,5 <i>uₙ</i> + 1. Quel est le plus petit <i>N</i> tel que |<i>uₙ</i> − 2| &lt; 0,01 pour tout <i>n</i> ≥ <i>N</i> ?', lab:'<i>N</i> =', ans:8, why:'L = 2 et uₙ = 2 − 2 · 0,5ⁿ, donc |uₙ − 2| = 2 · 0,5ⁿ = 2/2ⁿ. 2/2ⁿ &lt; 0,01 ⇔ 2ⁿ &gt; 200 : 2⁷ = 128 ne suffit pas, 2⁸ = 256 oui. N = 8.'},
 ]},
];
})();
