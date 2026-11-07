/* Déclic — examen de compétence : Systèmes d’équations */
(()=>{
const X='<i>x</i>', Y='<i>y</i>';
const SYS=(e1,e2)=>`<span style="display:inline-flex;align-items:center;vertical-align:middle;gap:3px;margin:2px 4px"><span style="font-size:2.3em;line-height:1;font-weight:300">{</span><span style="display:inline-flex;flex-direction:column;line-height:1.5"><span>${e1}</span><span>${e2}</span></span></span>`;
// deux droites y = ax + b dans un repère
const deux=(a1,b1,a2,b2)=>{ const P=plane({x:[-6,6],y:[-6,8],lab:2}); P.fn(x=>a1*x+b1).fn(x=>a2*x+b2,{c:'var(--spark)'}); return P.svg(); };
EXAMS['sec11-systemes']=[
 {n:'Couples et systèmes', r:'Un système : deux conditions à la fois', qs:[
   {q:`Le couple (3 ; −2) est-il solution du système ${SYS(`2${X} + ${Y} = 4`,`${X} − ${Y} = 5`)}&nbsp;?`, opts:['Oui, il vérifie les deux équations','Non, il ne vérifie que la première','Non, il ne vérifie que la seconde','Non, il ne vérifie aucune des deux'], ans:0, why:`2 · 3 + (−2) = 6 − 2 = 4 ✓ et 3 − (−2) = 3 + 2 = 5 ✓. Les deux équations sont vérifiées.`},
   {q:`Quel couple est solution de ${SYS(`${X} + ${Y} = 9`,`${X} − ${Y} = 3`)}&nbsp;?`, opts:['(3 ; 6)','(6 ; 3)','(4,5 ; 4,5)','(12 ; −3)'], ans:1, why:'6 + 3 = 9 ✓ et 6 − 3 = 3 ✓. Attention à l’ordre : (3 ; 6) donne 3 − 6 = −3.'},
   {q:`Dans l’équation 3${X} − 2${Y} = 10, quelle valeur de ${Y} va avec ${X} = 4&nbsp;?`, lab:'y =', ans:1, why:`3 · 4 − 2${Y} = 10, soit 12 − 2${Y} = 10, donc ${Y} = 1. Le couple (4 ; 1) est solution.`},
   {q:`Le couple (2 ; 5) est-il solution du système ${SYS(`${X} + ${Y} = 7`,`2${X} − ${Y} = 3`)}&nbsp;?`, opts:['Oui, car 2 + 5 = 7','Non, car il ne vérifie pas la seconde équation','Oui, car il vérifie au moins une équation','Non, car il ne vérifie aucune équation'], ans:1, why:'2 + 5 = 7 ✓, mais 2 · 2 − 5 = −1 et pas 3. Une solution doit vérifier les deux équations.'},
   {q:`Combien de couples sont solutions de la seule équation 2${X} + ${Y} = 5&nbsp;?`, opts:['Un seul','Deux','Aucun','Une infinité'], ans:3, why:`Pour chaque valeur de ${X}, on trouve ${Y} = 5 − 2${X}. Les couples solutions forment une droite : il y en a une infinité.`},
 ]},
 {n:'Isoler une variable', r:'Isoler une variable', qs:[
   {q:`Isole ${Y} dans 6${X} + 2${Y} = 8.`, opts:[`${Y} = 8 − 6${X}`,`${Y} = 4 − 6${X}`,`${Y} = 4 − 3${X}`,`${Y} = 3${X} − 4`], ans:2, why:`2${Y} = 8 − 6${X}, puis on divise chaque terme par 2 : ${Y} = 4 − 3${X}.`},
   {q:`Isole ${X} dans ${X} − 4${Y} = 2.`, opts:[`${X} = 2 − 4${Y}`,`${X} = 4${Y} + 2`,`${X} = ${F(2,4)}${Y}`,`${X} = 4${Y} − 2`], ans:1, why:`On ajoute 4${Y} des deux côtés : ${X} = 4${Y} + 2.`},
   {q:'Un rectangle a un périmètre <i>P</i> = 2(<i>L</i> + <i>l</i>) de 26 cm et une longueur <i>L</i> de 8 cm. Quelle est sa largeur <i>l</i>&nbsp;?', lab:'l =', unit:'cm', ans:5, why:`<i>l</i> = ${F('<i>P</i>',2)} − <i>L</i> = 13 − 8 = 5 cm.`},
   {q:`On écrit 5${X} − 3${Y} = 15 sous la forme ${Y} = <i>a</i>${X} + <i>b</i>. Que vaut l’ordonnée à l’origine <i>b</i>&nbsp;?`, lab:'b =', ans:-5, why:`−3${Y} = 15 − 5${X}, donc ${Y} = ${F(5,3)}${X} − 5. L’ordonnée à l’origine est −5 (la valeur de ${Y} pour ${X} = 0).`},
 ]},
 {n:'Résolution graphique', r:'Résoudre graphiquement', qs:[
   {q:`Les droites ${Y} = ${X} + 2 et ${Y} = −2${X} + 5 sont tracées. Quelle est la solution du système&nbsp;?`, fig:deux(1,2,-2,5), opts:['(3 ; 1)','(1 ; 3)','(0 ; 2)','(2 ; 4)'], ans:1, why:`Les droites se croisent en (1 ; 3). Vérification : 1 + 2 = 3 ✓ et −2 + 5 = 3 ✓.`},
   {q:`Les droites ${Y} = 3${X} − 2 et ${Y} = ${X} + 4 sont tracées. Quelle est l’abscisse ${X} de leur point d’intersection&nbsp;?`, fig:(()=>{ const P=plane({x:[-2,6],y:[-4,10],lab:2}); P.fn(x=>3*x-2).fn(x=>x+4,{c:'var(--spark)'}); return P.svg(); })(), lab:'x =', ans:3, why:`Le croisement est en (3 ; 7). Vérification : 3 · 3 − 2 = 7 ✓ et 3 + 4 = 7 ✓.`},
   {q:`Les droites ${Y} = ${F(1,2)}${X} + 1 et ${Y} = −${X} + 4 sont tracées. Quelle est l’ordonnée ${Y} de leur point d’intersection&nbsp;?`, fig:deux(.5,1,-1,4), lab:'y =', ans:2, why:`Le croisement est en (2 ; 2). Vérification : ${F(1,2)} · 2 + 1 = 2 ✓ et −2 + 4 = 2 ✓.`},
   {q:'Sur un graphique, deux droites semblent se croiser vers (1,3 ; 2,7). Que faut-il faire&nbsp;?', opts:['Donner (1,3 ; 2,7) comme solution exacte','Arrondir à (1 ; 3)','Calculer la solution exacte (substitution ou combinaison) et la vérifier dans les deux équations','Conclure qu’il n’y a pas de solution'], ans:2, why:'Une lecture graphique n’est qu’approchée quand le croisement tombe entre deux carreaux. Le calcul donne la valeur exacte, qu’on vérifie dans les deux équations.'},
 ]},
 {n:'Substitution', r:'La méthode de substitution', qs:[
   {q:`Résous ${SYS(`${Y} = ${X} + 3`,`2${X} + ${Y} = 12`)} et donne ${Y}.`, lab:'y =', ans:6, why:`2${X} + (${X} + 3) = 12, soit 3${X} = 9, donc ${X} = 3 et ${Y} = 6. Contrôle : 6 + 6 = 12 ✓.`},
   {q:`Résous ${SYS(`${X} = 2${Y}`,`${X} + 3${Y} = 20`)} et donne ${X}.`, lab:'x =', ans:8, why:`2${Y} + 3${Y} = 20, donc ${Y} = 4 et ${X} = 8. Contrôle : 8 + 12 = 20 ✓.`},
   {q:`Résous ${SYS(`${Y} = 4 − ${X}`,`3${X} − ${Y} = 8`)} et donne ${X}.`, lab:'x =', ans:3, why:`3${X} − (4 − ${X}) = 8, soit 4${X} − 4 = 8, donc ${X} = 3 et ${Y} = 1. Contrôle : 9 − 1 = 8 ✓.`},
   {q:`Pour résoudre ${SYS(`${Y} = 2${X} − 1`,`3${X} − ${Y} = 4`)}, un élève écrit 3${X} − 2${X} − 1 = 4. Quelle est son erreur&nbsp;?`, opts:['Aucune erreur','Il a oublié les parenthèses : 3x − (2x − 1) = 4, donc x + 1 = 4','Il aurait dû remplacer x et pas y','Il fallait additionner les deux équations'], ans:1, why:`On remplace ${Y} par toute l’expression, entre parenthèses : 3${X} − (2${X} − 1) = 3${X} − 2${X} + 1 = 4, donc ${X} = 3 et ${Y} = 5.`},
   {q:`Résous ${SYS(`${X} + 2${Y} = 11`,`3${X} − ${Y} = 5`)} par substitution et donne ${Y}.`, lab:'y =', ans:4, why:`On isole ${X} = 11 − 2${Y}, puis 3(11 − 2${Y}) − ${Y} = 5, soit 33 − 7${Y} = 5, donc ${Y} = 4 et ${X} = 3. Contrôle : 9 − 4 = 5 ✓.`},
 ]},
 {n:'Combinaison', r:'La méthode de combinaison (addition)', qs:[
   {q:`Résous ${SYS(`${X} + ${Y} = 12`,`${X} − ${Y} = 2`)} et donne ${X}.`, lab:'x =', ans:7, why:`On additionne : 2${X} = 14, donc ${X} = 7 (et ${Y} = 5).`},
   {q:`Résous ${SYS(`3${X} + 2${Y} = 13`,`${X} − 2${Y} = −1`)} et donne ${Y}.`, lab:'y =', ans:2, why:`On additionne : 4${X} = 12, donc ${X} = 3. Puis 9 + 2${Y} = 13, donc ${Y} = 2. Contrôle : 3 − 4 = −1 ✓.`},
   {q:`Résous ${SYS(`2${X} + 5${Y} = 1`,`3${X} − 2${Y} = 11`)} et donne ${Y}.`, lab:'y =', ans:-1, why:`On multiplie la 1re par 2 et la 2e par 5 : 4${X} + 10${Y} = 2 et 15${X} − 10${Y} = 55. En additionnant : 19${X} = 57, donc ${X} = 3. Puis 6 + 5${Y} = 1, donc ${Y} = −1.`},
   {q:`Pour éliminer ${Y} dans ${SYS(`4${X} + 3${Y} = 5`,`2${X} − 6${Y} = 0`)}, que faire avant d’additionner&nbsp;?`, opts:['Multiplier la 1re équation par 2','Multiplier la 2e équation par 2','Multiplier la 1re par 3 et la 2e par 6','Rien, on peut additionner directement'], ans:0, why:`La 1re multipliée par 2 donne 8${X} + 6${Y} = 10 : les termes +6${Y} et −6${Y} sont opposés et s’annulent quand on additionne.`},
   {q:`Résous ${SYS(`4${X} + 3${Y} = 5`,`2${X} − 6${Y} = 0`)} et donne ${Y} (tu peux écrire une fraction).`, lab:'y =', ans:1/3, tol:.001, show:'1/3', why:`(1re × 2) + 2e : 10${X} = 10, donc ${X} = 1. Puis 4 + 3${Y} = 5, donc ${Y} = ${F(1,3)}. Contrôle : 2 − 6 · ${F(1,3)} = 0 ✓.`},
 ]},
 {n:'Aucune solution ou une infinité', r:'Aucune solution ou une infinité', qs:[
   {q:`Combien de solutions le système ${SYS(`${X} + 2${Y} = 4`,`2${X} + 4${Y} = 8`)} a-t-il&nbsp;?`, opts:['Aucune','Une seule','Deux','Une infinité'], ans:3, why:`La 2e équation est la 1re multipliée par 2 : c’est la même droite. Tous ses couples sont solutions.`},
   {q:`Combien de solutions le système ${SYS(`${Y} = 3${X} + 1`,`${Y} = 3${X} − 2`)} a-t-il&nbsp;?`, opts:['Une seule','Aucune','Une infinité','Deux'], ans:1, why:`Même pente 3, ordonnées à l’origine différentes (1 et −2) : droites parallèles, aucune solution. Par substitution : 3${X} + 1 = 3${X} − 2 donne 1 = −2, faux.`},
   {q:'En combinant les deux équations d’un système, un élève voit disparaître les deux inconnues et obtient 0 = 5. Que peut-il conclure&nbsp;?', opts:['La solution est x = 0 et y = 5','Le système a une infinité de solutions','Il a forcément fait une erreur de calcul','Le système n’a aucune solution'], ans:3, why:'0 = 5 est une égalité fausse : aucun couple ne vérifie les deux équations. Les droites sont parallèles.'},
   {q:`Pour quelle valeur de <i>a</i> le système ${SYS(`${Y} = <i>a</i>${X} + 2`,`${Y} = 4${X} − 1`)} n’a-t-il aucune solution&nbsp;?`, lab:'a =', ans:4, why:`Aucune solution quand les droites sont parallèles et distinctes : même pente, <i>a</i> = 4, et les ordonnées à l’origine 2 et −1 sont bien différentes.`},
 ]},
 {n:'Mettre un problème en système', r:'Mettre un problème en système', qs:[
   {q:'Ta tirelire contient 25 pièces de 2 CHF et de 5 CHF, pour un total de 80 CHF. Combien y a-t-il de pièces de 5 CHF&nbsp;?', lab:'pièces', ans:10, why:`${SYS(`${X} + ${Y} = 25`,`2${X} + 5${Y} = 80`)} avec ${X} pièces de 2 CHF et ${Y} de 5 CHF. La 1re × (−2) plus la 2e : 3${Y} = 30, donc ${Y} = 10 (et ${X} = 15 ; 30 + 50 = 80 ✓).`},
   {q:'Deux nombres ont une somme de 50 et une différence de 14. Quel est le plus grand&nbsp;?', ans:32, why:`${X} + ${Y} = 50 et ${X} − ${Y} = 14. En additionnant : 2${X} = 64, donc ${X} = 32 (et ${Y} = 18).`},
   {q:'Pour un concert, 4 places assises et 3 places debout coûtent 160 CHF. 2 places assises et 5 places debout coûtent 150 CHF. Combien coûte une place assise&nbsp;?', unit:'CHF', ans:25, why:`${SYS('4<i>a</i> + 3<i>d</i> = 160','2<i>a</i> + 5<i>d</i> = 150')}. La 2e × (−2) plus la 1re : −7<i>d</i> = −140, donc <i>d</i> = 20. Puis 4<i>a</i> = 160 − 60 = 100, donc <i>a</i> = 25 CHF. Contrôle : 50 + 100 = 150 ✓.`},
   {q:'Tu mélanges un jus à 3 CHF le litre et un jus à 5 CHF le litre pour obtenir 10 litres à 3,80 CHF le litre. Combien de litres du jus à 5 CHF faut-il&nbsp;?', unit:'L', ans:4, why:`${X} + ${Y} = 10 et 3${X} + 5${Y} = 38 (car 10 × 3,80 = 38). La 1re × (−3) plus la 2e : 2${Y} = 8, donc ${Y} = 4 L (et 6 L du jus à 3 CHF ; 18 + 20 = 38 ✓).`},
 ]},
];
})();
