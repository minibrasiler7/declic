/* Déclic — examen de compétence : Valeurs absolues et trinôme */
(()=>{
const x='<i>x</i>';
EXAMS['an1-trinome']=[
 {n:'Équations avec une valeur absolue', r:'Résoudre |A| = k', qs:[
   {q:`Résous |${x} − 5| = 3. Donne la plus grande solution.`, lab:`${x} =`, ans:8, why:'x − 5 = 3 ou x − 5 = −3, donc x = 8 ou x = 2. La plus grande est 8 : c’est le point à distance 3 de 5, à droite.'},
   {q:`Résous |4${x} + 2| = 10. Donne la plus petite solution.`, lab:`${x} =`, ans:-3, why:'4x + 2 = 10 donne x = 2 ; 4x + 2 = −10 donne 4x = −12, x = −3. La plus petite est −3.'},
   {q:`Combien de solutions a l’équation |2${x} − 7| = −4 ?`, lab:'nombre =', ans:0, why:'Une valeur absolue n’est jamais négative : elle ne peut pas valoir −4. Aucune solution.'},
   {q:`Résous |5${x} − 1| = 4. Donne la somme des solutions.`, lab:'somme =', ans:0.4, show:'2/5', why:'5x − 1 = 4 donne x = 1 ; 5x − 1 = −4 donne x = −3/5. Somme : 1 − 3/5 = 2/5 = 0,4.'},
   {q:`Résous √((${x} − 2)²) = 6. Donne le produit des solutions.`, lab:'produit =', ans:-32, why:'√((x − 2)²) = |x − 2|, pas x − 2. |x − 2| = 6 donne x = 8 ou x = −4, de produit −32.'},
 ]},
 {n:'Inéquations avec une valeur absolue', r:'Inéquations |A| ≤ r et |A| ≥ r', qs:[
   {q:`Résous |${x} − 3| &lt; 2.`, opts:[']−∞ ; 1[ ∪ ]5 ; +∞[',']1 ; 5[','[1 ; 5]',']−5 ; −1['], ans:1, why:'Les points à distance strictement moins de 2 de 3 : 3 − 2 &lt; x &lt; 3 + 2, soit ]1 ; 5[.'},
   {q:`Résous |3${x} + 6| ≤ 9. L’ensemble des solutions est [<i>a</i> ; <i>b</i>]. Donne <i>a</i>.`, lab:'<i>a</i> =', ans:-5, why:'−9 ≤ 3x + 6 ≤ 9, puis −15 ≤ 3x ≤ 3, donc −5 ≤ x ≤ 1. S = [−5 ; 1], a = −5.'},
   {q:`Résous |${x} + 1| ≥ 4.`, opts:['[−5 ; 3]',']−∞ ; −3] ∪ [5 ; +∞[',']−∞ ; −5] ∪ [3 ; +∞[','[3 ; +∞['], ans:2, why:'|x + 1| est la distance de x à −1. Elle vaut au moins 4 si x ≤ −1 − 4 = −5 ou x ≥ −1 + 4 = 3.'},
   {q:`Combien de nombres entiers ne sont pas solutions de |2${x} − 5| &gt; 1 ?`, lab:'nombre =', ans:2, why:'Les non-solutions vérifient |2x − 5| ≤ 1 : −1 ≤ 2x − 5 ≤ 1, soit 2 ≤ x ≤ 3. Entiers : 2 et 3.'},
   {q:`Résous |${x} − 4| ≥ −1.`, opts:['∅','ℝ',']−∞ ; 3] ∪ [5 ; +∞[','[3 ; 5]'], ans:1, why:'Une valeur absolue est toujours ≥ 0, donc toujours ≥ −1 : tout réel est solution, S = ℝ.'},
 ]},
 {n:'Équations du second degré', r:'Résoudre une équation du second degré', qs:[
   {q:`Résous 2${x}² − 7${x} + 3 = 0. Donne la plus petite solution.`, lab:`${x} =`, ans:0.5, show:'1/2', why:'Δ = 49 − 24 = 25, donc x = (7 ± 5)/4 : x = 3 ou x = 1/2. La plus petite est 1/2.'},
   {q:`Combien de solutions réelles a l’équation 3${x}² + 2${x} + 5 = 0 ?`, lab:'nombre =', ans:0, why:'Δ = 2² − 4 · 3 · 5 = 4 − 60 = −56 &lt; 0 : pas de racine réelle.'},
   {q:`Résous 4${x}² + 4${x} + 1 = 0.`, lab:`${x} =`, ans:-0.5, show:'−1/2', why:'Δ = 16 − 16 = 0 : une racine double, −b/(2a) = −4/8 = −1/2. En effet 4x² + 4x + 1 = (2x + 1)².'},
   {q:`Résous ${x}² − 2${x} − 1 = 0. Donne la plus grande solution, arrondie au centième.`, lab:`${x} ≈`, ans:1+Math.SQRT2, tol:0.006, show:'1 + √2 ≈ 2,41', why:'Δ = 4 + 4 = 8, donc x = (2 ± √8)/2 = 1 ± √2. La plus grande est 1 + √2 ≈ 2,41.'},
   {q:`Résous (${x} + 1)(${x} − 2) = 4. Donne la plus grande solution.`, lab:`${x} =`, ans:3, why:'Le second membre n’est pas 0 : on développe et on passe tout à gauche. x² − x − 2 − 4 = x² − x − 6 = 0, Δ = 25, x = (1 ± 5)/2 : 3 ou −2.'},
 ]},
 {n:'Racine évidente, somme et produit', r:'La racine évidente', qs:[
   {q:`2${x}² + 5${x} − 7 = 0 a une racine évidente. Donne l’autre racine.`, lab:`${x} =`, ans:-3.5, show:'−7/2', why:'2 + 5 − 7 = 0, donc 1 est racine. Le produit des racines vaut c/a = −7/2 : l’autre racine est −7/2.'},
   {q:`3${x}² + 10${x} + 7 = 0 a une racine évidente. Donne l’autre racine (fraction acceptée).`, lab:`${x} =`, ans:-7/3, show:'−7/3', why:'a − b + c = 3 − 10 + 7 = 0, donc −1 est racine. Le produit vaut 7/3, donc l’autre racine est (7/3)/(−1) = −7/3.'},
   {q:`On sait que 2 est une racine de ${x}² + ${x} − 6 = 0. Quelle est l’autre ?`, lab:`${x} =`, ans:-3, why:'Le produit des racines vaut c/a = −6. L’autre racine est −6/2 = −3. Contrôle : 9 − 3 − 6 = 0.'},
   {q:`L’équation 5${x}² − 15${x} + 2 = 0 a deux racines (Δ = 185 &gt; 0). Que vaut leur somme ?`, lab:'somme =', ans:3, why:'La somme des racines vaut −b/a = 15/5 = 3, sans avoir besoin de les calculer.'},
 ]},
 {n:'Signe et inéquations du second degré', r:'Inéquation du second degré', qs:[
   {q:`Résous ${x}² − ${x} − 12 ≤ 0.`, opts:['[−3 ; 4]',']−∞ ; −3] ∪ [4 ; +∞[','[−4 ; 3]',']−3 ; 4['], ans:0, why:'Δ = 1 + 48 = 49, racines (1 ± 7)/2 : 4 et −3. a = 1 &gt; 0 : le trinôme est négatif entre les racines, incluses car l’inégalité est large.'},
   {q:`Résous −2${x}² + 4${x} + 6 &lt; 0.`, opts:[']−1 ; 3[',']−∞ ; −3[ ∪ ]1 ; +∞[',']−∞ ; −1] ∪ [3 ; +∞[',']−∞ ; −1[ ∪ ]3 ; +∞['], ans:3, why:'Δ = 16 + 48 = 64, racines (−4 ± 8)/(−4) : −1 et 3. a = −2 &lt; 0 : le trinôme est négatif à l’extérieur des racines, exclues (inégalité stricte).'},
   {q:`Résous ${x}² + ${x} + 3 &gt; 0.`, opts:['∅','ℝ',']−∞ ; −3[','ℝ privé de −1/2'], ans:1, why:'Δ = 1 − 12 = −11 &lt; 0 : pas de racine, le trinôme garde partout le signe de a = 1 &gt; 0. S = ℝ.'},
   {q:`Quelle est la factorisation de 3${x}² − 3${x} − 18 ?`, opts:['3(x + 3)(x − 2)','(3x − 9)(x − 2)','3(x − 3)(x + 2)','3(x − 6)(x + 1)'], ans:2, why:'3x² − 3x − 18 = 3(x² − x − 6). Δ = 25, racines (1 ± 5)/2 : 3 et −2. Donc 3(x − 3)(x + 2).'},
   {q:`Combien de nombres entiers vérifient 2${x}² − 9${x} + 4 &lt; 0 ?`, lab:'nombre =', ans:3, why:'Δ = 81 − 32 = 49, racines (9 ± 7)/4 : 4 et 1/2. a &gt; 0 : négatif entre les racines, S = ]1/2 ; 4[. Entiers : 1, 2, 3.'},
 ]},
 {n:'Changement de variable', r:'Changement de variable : se ramener à un trinôme', qs:[
   {q:`Résous ${x}⁴ − 10${x}² + 9 = 0. Donne la plus grande solution.`, lab:`${x} =`, ans:3, why:'Avec t = x² ≥ 0 : t² − 10t + 9 = 0, t = 1 (racine évidente) ou t = 9 (produit 9). Donc x = ±1 ou x = ±3. La plus grande est 3.'},
   {q:`Combien de solutions réelles a ${x}⁴ + 3${x}² − 4 = 0 ?`, lab:'nombre =', ans:2, why:'Avec t = x² ≥ 0 : t² + 3t − 4 = 0, t = 1 ou t = −4. On rejette t = −4 (un carré n’est pas négatif). x² = 1 donne x = ±1 : 2 solutions.'},
   {q:`Combien de solutions réelles a ${x}² + |${x}| − 6 = 0 ?`, lab:'nombre =', ans:2, why:'Avec t = |x| ≥ 0 et x² = t² : t² + t − 6 = (t − 2)(t + 3) = 0. On garde t = 2, on rejette t = −3. |x| = 2 donne x = ±2.'},
 ]},
 {n:'La forme canonique', r:'La forme canonique', qs:[
   {q:`Quel est le minimum de ${x}² − 8${x} + 21 sur ℝ ?`, lab:'minimum =', ans:5, why:'x² − 8x = (x − 4)² − 16, donc x² − 8x + 21 = (x − 4)² + 5 ≥ 5, avec égalité en x = 4.'},
   {q:`On écrit ${x}² + 10${x} + 18 = (${x} + 5)² + <i>k</i>. Que vaut <i>k</i> ?`, lab:'<i>k</i> =', ans:-7, why:'(x + 5)² = x² + 10x + 25 : il y a 25 en trop, donc x² + 10x + 18 = (x + 5)² − 25 + 18 = (x + 5)² − 7.'},
   {q:`Quel est le minimum de 2${x}² − 12${x} + 7 sur ℝ ?`, lab:'minimum =', ans:-11, why:'On met 2 en facteur : 2(x² − 6x) + 7 = 2[(x − 3)² − 9] + 7 = 2(x − 3)² − 11. Minimum −11, atteint en x = 3.'},
   {q:`Quel est le maximum de −${x}² + 6${x} − 4 sur ℝ ?`, lab:'maximum =', ans:5, why:'−x² + 6x − 4 = −(x² − 6x) − 4 = −[(x − 3)² − 9] − 4 = −(x − 3)² + 5. Un carré est ≥ 0, donc l’expression est ≤ 5, avec égalité en x = 3.'},
 ]},
];
})();
