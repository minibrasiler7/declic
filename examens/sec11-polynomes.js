/* Déclic — examen de compétence : Polynômes et identités remarquables */
(()=>{
const X='<i>x</i>', Y='<i>y</i>', A='<i>a</i>', B='<i>b</i>', N='<i>n</i>';
EXAMS['sec11-polynomes']=[
 {n:'Vocabulaire, réduire et ordonner', r:'Réduire et ordonner un polynôme', qs:[
   {q:`Quel est le degré du polynôme 2${A}²${B} − 5${A}${B} + ${F(1,3)}${B}²&nbsp;?`, lab:'degré =', ans:3, why:`2${A}²${B} = 2 · ${A} · ${A} · ${B} contient trois lettres : degré 3. Les autres termes sont de degré 2. Le degré du polynôme est le plus grand : 3.`},
   {q:`Quel est le coefficient du terme en ${X}${Y} dans 3${X}²${Y} − ${F(2,5)}${X}${Y} + 7&nbsp;?`, lab:'coefficient =', ans:-0.4, tol:.001, show:'−2/5', why:`Le terme en ${X}${Y} est −${F(2,5)}${X}${Y}. Le signe fait partie du coefficient : −${F(2,5)}.`},
   {q:`Réduis et ordonne 5${X}² − 3${X} + 2 − ${X}² + 7${X} − 6.`, opts:[`4${X}² − 10${X} − 4`,`6${X}² + 4${X} − 4`,`4${X}² + 4${X} − 4`,`8${X}³ − 4`], ans:2, why:`En ${X}² : 5 − 1 = 4. En ${X} : −3 + 7 = 4. Nombres : 2 − 6 = −4. Résultat : 4${X}² + 4${X} − 4.`},
   {q:`Réduis ${F(1,2)}${A} + ${F(1,3)}${A}. Quel est le coefficient obtenu&nbsp;?`, lab:'coefficient =', ans:5/6, tol:.001, show:'5/6', why:`Termes semblables : on additionne les coefficients. ${F(1,2)} + ${F(1,3)} = ${F(3,6)} + ${F(2,6)} = ${F(5,6)}.`},
 ]},
 {n:'Additionner, soustraire, multiplier', r:'Additionner, soustraire et multiplier des polynômes', qs:[
   {q:`Calcule (3${X}² − 2${X} + 5) − (${X}² − 4${X} − 1).`, opts:[`2${X}² − 6${X} + 4`,`2${X}² + 2${X} + 6`,`4${X}² − 6${X} + 4`,`2${X}² + 2${X} + 4`], ans:1, why:`Le − change le signe de chaque terme : 3${X}² − 2${X} + 5 − ${X}² + 4${X} + 1 = 2${X}² + 2${X} + 6.`},
   {q:`Développe (${X} + 4)(${X} − 7). Quel est le coefficient de ${X}&nbsp;?`, lab:'coefficient =', ans:-3, why:`${X}² − 7${X} + 4${X} − 28 = ${X}² − 3${X} − 28. Le coefficient de ${X} est −3.`},
   {q:`Développe (2${X} − 1)(${X}² + 3${X} − 2). Quel est le coefficient de ${X}²&nbsp;?`, lab:'coefficient =', ans:5, why:`Les termes en ${X}² viennent de 2${X} · 3${X} = 6${X}² et de −1 · ${X}² = −${X}². Total : 5${X}². (Le résultat complet est 2${X}³ + 5${X}² − 7${X} + 2.)`},
   {q:`Que vaut le produit (−3${X}²) · (4${X})&nbsp;?`, opts:[`−12${X}²`,`12${X}³`,`${X}³`,`−12${X}³`], ans:3, why:`On multiplie les coefficients, −3 · 4 = −12, et on additionne les exposants, ${X}² · ${X} = ${X}³. Résultat : −12${X}³.`},
   {q:`Développe et réduis 2${X}(${X} − 3) − (${X} − 1)(${X} + 5). Quel est le terme constant (le nombre seul)&nbsp;?`, lab:'terme constant =', ans:5, why:`2${X}² − 6${X} − (${X}² + 4${X} − 5) = 2${X}² − 6${X} − ${X}² − 4${X} + 5 = ${X}² − 10${X} + 5. Le terme constant est 5.`},
 ]},
 {n:'Développer avec les identités', r:'Développer avec une identité remarquable', qs:[
   {q:`Développe (${X} + 6)².`, opts:[`${X}² + 36`,`${X}² + 12${X} + 36`,`${X}² + 6${X} + 36`,`${X}² + 12${X} + 12`], ans:1, why:`(${A} + ${B})² = ${A}² + 2${A}${B} + ${B}² avec ${A} = ${X} et ${B} = 6 : ${X}² + 12${X} + 36.`},
   {q:`Développe (3${A} − 4)². Quel est le coefficient de ${A}&nbsp;?`, lab:'coefficient =', ans:-24, why:`(3${A})² − 2 · 3${A} · 4 + 4² = 9${A}² − 24${A} + 16. Le coefficient de ${A} est −24.`},
   {q:`Développe (5${X} + 2)(5${X} − 2).`, opts:[`25${X}² − 4`,`5${X}² − 4`,`25${X}² − 20${X} − 4`,`25${X}² + 4`], ans:0, why:`(${A} + ${B})(${A} − ${B}) = ${A}² − ${B}² avec ${A} = 5${X} et ${B} = 2 : (5${X})² − 2² = 25${X}² − 4.`},
   {q:'Calcule 102² de tête, avec une identité remarquable.', ans:10404, why:'102² = (100 + 2)² = 10 000 + 2 · 100 · 2 + 4 = 10 000 + 400 + 4 = 10 404.'},
   {q:'Calcule 38 × 42 de tête, avec une identité remarquable.', ans:1596, why:'38 × 42 = (40 − 2)(40 + 2) = 40² − 2² = 1600 − 4 = 1596.'},
   {q:`Un camarade écrit (${X} − 3)² = ${X}² − 9. Que penses-tu de son calcul&nbsp;?`, opts:['Il est juste','Il faut écrire x² + 9','Il manque le double produit : (x − 3)² = x² − 6x + 9','Il manque le double produit : (x − 3)² = x² − 6x − 9'], ans:2, why:`(${A} − ${B})² = ${A}² − 2${A}${B} + ${B}² : ${X}² − 6${X} + 9. Le dernier terme est +9, car (−3)² = 9. Test avec ${X} = 1 : (1 − 3)² = 4, et 1 − 6 + 9 = 4 ✓, alors que 1 − 9 = −8.`},
 ]},
 {n:'Les identités vues sur les figures', r:'(a + b)² : le carré découpé', qs:[
   {q:`Un carré de côté ${A} + ${B} est découpé en un carré ${A}², un carré ${B}² et deux rectangles. Quelle est l’aire totale des deux rectangles&nbsp;?`, opts:[`${A}${B}`,`2${A}${B}`,`${A}² + ${B}²`,`(${A}${B})²`], ans:1, why:`Chaque rectangle a pour côtés ${A} et ${B}, donc une aire ${A}${B}. Les deux ensemble : 2${A}${B}, le terme du milieu de (${A} + ${B})².`},
   {q:'Une terrasse carrée de 10 m de côté est agrandie de 3 m en longueur et en largeur. De combien de m² son aire augmente-t-elle&nbsp;?', unit:'m²', ans:69, why:'13² − 10² = 169 − 100 = 69 m². Sur la figure : deux rectangles de 10 × 3 = 30 m² et un petit carré de 3 × 3 = 9 m², soit 69 m².'},
   {q:`Dans un carré de côté ${A}, on retire une bande de largeur ${B} à droite et une bande de largeur ${B} en haut, pour obtenir (${A} − ${B})² = ${A}² − 2${A}${B} + ${B}². Pourquoi ajoute-t-on ${B}²&nbsp;?`, opts:[`Parce qu’un carré est toujours positif`,`Parce que le petit coin ${B}² appartient aux deux bandes : il a été retiré deux fois`,`Parce que (${A} − ${B})² est plus grand que ${A}²`,`Pour que la formule ressemble à celle de (${A} + ${B})²`], ans:1, why:`En retirant deux bandes d’aire ${A}${B}, on enlève deux fois le coin ${B}². On le rend une fois : ${A}² − 2${A}${B} + ${B}².`},
   {q:'On retire un carré de 3 cm de côté dans le coin d’un carré de 8 cm de côté. Le L qui reste est recoupé en un seul rectangle. Quelles sont ses dimensions&nbsp;?', opts:['8 cm sur 5 cm','11 cm sur 5 cm','5 cm sur 5 cm','11 cm sur 3 cm'], ans:1, why:'L’aire du L vaut 8² − 3² = 64 − 9 = 55 cm² = (8 + 3)(8 − 3). Le rectangle mesure 11 cm sur 5 cm.'},
 ]},
 {n:'Factoriser', r:'Factoriser : mettre en évidence, puis reconnaître une identité', qs:[
   {q:`Factorise 6${X}² − 15${X}.`, opts:[`3(2${X}² − 5${X})`,`3${X}(2${X} − 5)`,`${X}(6${X} − 15${X})`,`3${X}(2${X} − 15)`], ans:1, why:`3 divise 6 et 15, et ${X} est dans les deux termes : 6${X}² − 15${X} = 3${X} · 2${X} − 3${X} · 5 = 3${X}(2${X} − 5).`},
   {q:`Factorise ${X}² − 49.`, opts:[`(${X} − 7)²`,`(${X} − 49)(${X} + 1)`,`(${X} − 7)(${X} + 7)`,`${X}(${X} − 49)`], ans:2, why:`Différence de deux carrés : ${X}² − 7² = (${X} − 7)(${X} + 7).`},
   {q:`On sait que ${X}² + 10${X} + 25 = (${X} + <i>k</i>)². Que vaut <i>k</i>&nbsp;?`, lab:'k =', ans:5, why:`25 = 5² et 2 · ${X} · 5 = 10${X} : c’est (${A} + ${B})² avec ${B} = 5. Donc ${X}² + 10${X} + 25 = (${X} + 5)².`},
   {q:`Factorise 9${Y}² − 12${Y} + 4.`, opts:[`(3${Y} − 2)²`,`(3${Y} + 2)²`,`(9${Y} − 2)²`,`(3${Y} − 2)(3${Y} + 2)`], ans:0, why:`9${Y}² = (3${Y})², 4 = 2², et 2 · 3${Y} · 2 = 12${Y} avec le signe − : c’est (3${Y} − 2)².`},
   {q:`Factorise complètement 5${X}³ − 20${X}.`, opts:[`5${X}(${X}² − 4)`,`5${X}(${X} − 2)²`,`5(${X}³ − 4${X})`,`5${X}(${X} − 2)(${X} + 2)`], ans:3, why:`Mise en évidence de 5${X} : 5${X}(${X}² − 4). Puis ${X}² − 4 = (${X} − 2)(${X} + 2). Résultat : 5${X}(${X} − 2)(${X} + 2).`},
 ]},
 {n:'La somme et le produit', r:'Factoriser x² + sx + p : la somme et le produit', qs:[
   {q:`Factorise ${X}² + 8${X} + 15.`, opts:[`(${X} + 1)(${X} + 15)`,`(${X} + 2)(${X} + 6)`,`(${X} + 3)(${X} + 5)`,`(${X} + 4)²`], ans:2, why:`On cherche deux nombres de produit 15 et de somme 8 : 3 et 5. Donc (${X} + 3)(${X} + 5).`},
   {q:`On écrit ${X}² − 5${X} − 14 = (${X} + <i>m</i>)(${X} + ${N}) avec <i>m</i> &gt; ${N}. Que vaut <i>m</i>&nbsp;?`, lab:'m =', ans:2, why:`Produit −14, somme −5 : les nombres sont 2 et −7 (2 · (−7) = −14 et 2 − 7 = −5). Donc ${X}² − 5${X} − 14 = (${X} + 2)(${X} − 7) et <i>m</i> = 2.`},
   {q:`Factorise ${X}² − 9${X} + 20.`, opts:[`(${X} + 4)(${X} + 5)`,`(${X} − 4)(${X} − 5)`,`(${X} − 2)(${X} − 10)`,`(${X} + 4)(${X} − 5)`], ans:1, why:`Produit +20 et somme −9 : les deux nombres sont négatifs, −4 et −5. Donc (${X} − 4)(${X} − 5).`},
 ]},
 {n:'Prouver avec des lettres', r:'Prouver avec le calcul littéral', qs:[
   {q:`On additionne deux nombres impairs, écrits 2${N} + 1 et 2<i>m</i> + 1 (${N} et <i>m</i> entiers). Que peut-on prouver&nbsp;?`, opts:['La somme est toujours impaire, car elle vaut 2n + 2m + 1','La somme est toujours paire, car elle vaut 2(n + m + 1)','La somme est un multiple de 4, car elle vaut 4nm','On ne peut rien prouver sans exemple'], ans:1, why:`(2${N} + 1) + (2<i>m</i> + 1) = 2${N} + 2<i>m</i> + 2 = 2(${N} + <i>m</i> + 1) : deux fois un entier, donc un nombre pair.`},
   {q:`La somme de cinq entiers consécutifs ${N}, ${N} + 1, …, ${N} + 4 est toujours un multiple de quel nombre (le plus grand possible)&nbsp;?`, lab:'multiple de', ans:5, why:`${N} + (${N} + 1) + (${N} + 2) + (${N} + 3) + (${N} + 4) = 5${N} + 10 = 5(${N} + 2). C’est toujours un multiple de 5 (par exemple 1 + 2 + 3 + 4 + 5 = 15, qui n’est pas un multiple de 10).`},
   {q:`À quoi est égale (${N} + 1)² − ${N}², la différence des carrés de deux entiers consécutifs&nbsp;?`, opts:[`1`,`2${N} + 1`,`${N} + 1`,`2${N}`], ans:1, why:`(${N} + 1)² − ${N}² = ${N}² + 2${N} + 1 − ${N}² = 2${N} + 1. C’est la somme des deux nombres : par exemple 8² − 7² = 15 = 7 + 8.`},
 ]},
];
})();
