/* Déclic — examen de compétence : Premières lettres */
(()=>{
const rect=(L,l)=>(()=>{ const P=plane({x:[-1.5,8],y:[-1,4],w:320,grid:false,axes:false}); P.rect(0,0,6,3,{fill:'var(--math)',fo:.2,c:'var(--ink)',w:2}).text(3,0,L,{a:'middle',dy:16}).text(0,1.5,l,{a:'end',dx:-6,dy:4}); return P.svg(); })();
const RX5=rect('x','5');
EXAMS['sec9-litteral']=[
 {n:'Les conventions d’écriture',r:'Écrire une expression avec les conventions',qs:[
   {q:'Quelle est l’écriture courte de 4 · <i>a</i> · <i>b</i> · 3&nbsp;?',opts:['43<i>ab</i>','12<i>ab</i>','7<i>ab</i>','12<i>a</i> + <i>b</i>'],ans:1,why:'On regroupe les nombres : 4 · 3 = 12, puis les lettres : 12<i>ab</i>.'},
   {q:'Quelle est l’écriture courte de <i>y</i> · <i>y</i> · <i>y</i> · 2&nbsp;?',opts:['2<i>y</i>³','3<i>y</i>²','<i>y</i>³ + 2','6<i>y</i>'],ans:0,why:'Le nombre passe devant, et trois facteurs <i>y</i> donnent <i>y</i>³ : 2<i>y</i>³.'},
   {q:'Que signifie 5<i>x</i>²&nbsp;?',opts:['5 · <i>x</i> · 2','(5 · <i>x</i>) · (5 · <i>x</i>)','5 + <i>x</i> + <i>x</i>','5 · <i>x</i> · <i>x</i>'],ans:3,why:'L’exposant ne porte que sur <i>x</i>, juste devant lui : 5<i>x</i>² = 5 · <i>x</i> · <i>x</i>.'},
   {q:'Pour <i>a</i> = 4, que vaut 3<i>a</i>&nbsp;?',lab:'3a =',ans:12,why:'3<i>a</i> = 3 · <i>a</i> = 3 · 4 = 12. Ce n’est pas 34 : le signe · est caché, pas effacé.'},
   {q:'Quelle est l’écriture courte de <i>a</i> · 2 · <i>b</i> · <i>a</i>&nbsp;?',opts:['4<i>ab</i>','2<i>ab</i>²','2<i>a</i>²<i>b</i>','<i>a</i>²<i>b</i> + 2'],ans:2,why:'Le nombre 2 devant, puis <i>a</i> · <i>a</i> = <i>a</i>², puis <i>b</i> : 2<i>a</i>²<i>b</i>.'},
 ]},
 {n:'Valeur d’une expression',r:'Calculer la valeur d’une expression',qs:[
   {q:'Calcule 4<i>x</i> + 5 pour <i>x</i> = 8.',lab:'valeur =',ans:37,why:'4 · 8 + 5 = 32 + 5 = 37.'},
   {q:`Calcule ${F('<i>bh</i>',2)} pour <i>b</i> = 9 et <i>h</i> = 4.`,lab:'valeur =',ans:18,why:`${F('9 · 4',2)} = ${F(36,2)} = 18.`},
   {q:'Calcule <i>abc</i> pour <i>a</i> = 2, <i>b</i> = 3 et <i>c</i> = 7.',lab:'valeur =',ans:42,why:'<i>abc</i> = 2 · 3 · 7 = 42.'},
   {q:'Calcule <i>x</i>³ pour <i>x</i> = 5.',lab:'valeur =',ans:125,why:'5³ = 5 · 5 · 5 = 125.'},
   {q:'Calcule 3<i>x</i>² pour <i>x</i> = 2.',lab:'valeur =',ans:12,why:'La puissance d’abord : 2² = 4, puis 3 · 4 = 12. Ce n’est pas (3 · 2)² = 36.'},
   {q:'Calcule 7 − 2<i>y</i> pour <i>y</i> = 5.',lab:'valeur =',ans:-3,why:'7 − 2 · 5 = 7 − 10 = −3.'},
 ]},
 {n:'Périmètre et aire d’une figure',r:'Écrire le périmètre et l’aire d’une figure',qs:[
   {q:'Quel est le périmètre d’un carré de côté <i>c</i>&nbsp;?',opts:['<i>c</i>²','4<i>c</i>','2<i>c</i>','<i>c</i> + 4'],ans:1,why:'Quatre côtés de longueur <i>c</i> : <i>c</i> + <i>c</i> + <i>c</i> + <i>c</i> = 4<i>c</i>. <i>c</i>² est son aire.'},
   {q:'Quel est le périmètre de ce rectangle&nbsp;?',fig:RX5,opts:['5<i>x</i>','<i>x</i> + 5','2<i>x</i> + 10','2<i>x</i> + 5'],ans:2,why:'Le tour : <i>x</i> + 5 + <i>x</i> + 5 = 2<i>x</i> + 10.'},
   {q:'Quelle est l’aire de ce rectangle&nbsp;?',fig:RX5,opts:['5<i>x</i>','2<i>x</i> + 10','<i>x</i> + 5','5 + <i>x</i>²'],ans:0,why:'Aire = longueur · largeur = <i>x</i> · 5 = 5<i>x</i>.'},
   {q:'Un rectangle a une longueur de 2<i>x</i> et une largeur de <i>x</i>. Que vaut son aire pour <i>x</i> = 4 cm&nbsp;?',unit:'cm²',ans:32,why:'Aire = 2<i>x</i> · <i>x</i> = 2<i>x</i>². Pour <i>x</i> = 4 : 2 · 4 · 4 = 32 cm².'},
   {q:'Quelle expression donne l’aire d’un triangle de base <i>b</i> et de hauteur <i>h</i>&nbsp;?',opts:['<i>bh</i>',F('<i>bh</i>',2),'<i>b</i> + <i>h</i>','2<i>bh</i>'],ans:1,why:`Un triangle est la moitié d’un rectangle de côtés <i>b</i> et <i>h</i> : ${F('<i>bh</i>',2)}.`},
 ]},
 {n:'Traduire une phrase',r:'Traduire une phrase en expression',qs:[
   {q:'Quelle expression traduit « le triple de <i>n</i>, augmenté de 7 »&nbsp;?',opts:['3(<i>n</i> + 7)','3<i>n</i> + 7','<i>n</i>³ + 7','3 + <i>n</i> + 7'],ans:1,why:'On prend le triple de <i>n</i>, 3<i>n</i>, puis on ajoute 7 : 3<i>n</i> + 7.'},
   {q:'Quelle expression traduit « le carré de la différence de <i>a</i> et de <i>b</i> »&nbsp;?',opts:['<i>a</i>² − <i>b</i>²','2(<i>a</i> − <i>b</i>)','<i>a</i> − <i>b</i>²','(<i>a</i> − <i>b</i>)²'],ans:3,why:'« Le carré de… » est la dernière opération : on calcule <i>a</i> − <i>b</i>, puis on l’élève au carré. D’où (<i>a</i> − <i>b</i>)².'},
   {q:'Quelle expression traduit « la moitié de la somme de <i>x</i> et de 10 »&nbsp;?',opts:[`${F('<i>x</i>',2)} + 10`,F('<i>x</i> + 10',2),'2(<i>x</i> + 10)','<i>x</i> + 10 · 2'],ans:1,why:`On calcule d’abord la somme <i>x</i> + 10, puis on en prend la moitié : ${F('<i>x</i> + 10',2)}.`},
   {q:'Au cinéma, un billet coûte 14 CHF et un popcorn 6 CHF. Quelle expression donne le prix de <i>n</i> billets et d’un seul popcorn&nbsp;?',opts:['14<i>n</i> + 6','20<i>n</i>','14 + 6<i>n</i>','(14 + 6)<i>n</i>'],ans:0,why:'<i>n</i> billets coûtent 14 · <i>n</i> = 14<i>n</i>, et on ajoute un popcorn : 14<i>n</i> + 6.'},
   {q:'Quelle phrase traduit 2<i>x</i> − 3&nbsp;?',opts:['le double de la différence de <i>x</i> et de 3','<i>x</i> au carré, diminué de 3','le double de <i>x</i>, diminué de 3','la différence de 3 et du double de <i>x</i>'],ans:2,why:'On prend le double de <i>x</i>, 2<i>x</i>, puis on enlève 3. « Le double de la différence » serait 2(<i>x</i> − 3).'},
 ]},
 {n:'Expressions égales',r:'Tester si deux expressions sont égales',qs:[
   {q:'Laquelle de ces expressions est toujours égale à 5(<i>x</i> + 2)&nbsp;?',opts:['5<i>x</i> + 2','5<i>x</i> + 10','7<i>x</i>','<i>x</i> + 10'],ans:1,why:'Distributivité : 5(<i>x</i> + 2) = 5<i>x</i> + 5 · 2 = 5<i>x</i> + 10.'},
   {q:'Les expressions <i>n</i>² et 2<i>n</i> donnent le même résultat pour <i>n</i> = 2. Sont-elles égales&nbsp;?',opts:['Oui, puisqu’on a trouvé une valeur qui marche','Non : pour <i>n</i> = 3, on trouve 9 et 6','Oui, elles sont toujours égales','On ne peut pas savoir'],ans:1,why:'Une valeur qui marche ne prouve rien. Pour <i>n</i> = 3 : 3² = 9 et 2 · 3 = 6. Ce contre-exemple suffit : elles ne sont pas égales.'},
   {q:'Pour quel nombre entier <i>a</i>, compris entre 1 et 5, les expressions 3<i>a</i> + 1 et <i>a</i> + 7 donnent-elles le même résultat&nbsp;?',lab:'a =',ans:3,why:'On essaie : <i>a</i> = 1 donne 4 et 8 ; <i>a</i> = 2 donne 7 et 9 ; <i>a</i> = 3 donne 10 et 10. C’est <i>a</i> = 3. Elles ne sont pas égales pour autant : pour <i>a</i> = 4, 13 et 11.'},
   {q:'Laquelle de ces expressions est égale à <i>x</i> + <i>x</i> + <i>x</i> + <i>x</i>&nbsp;?',opts:['<i>x</i>⁴','<i>x</i> + 4','4<i>x</i>','4 + <i>x</i>'],ans:2,why:'Quatre fois <i>x</i>, c’est 4 · <i>x</i> = 4<i>x</i>. <i>x</i>⁴ serait <i>x</i> · <i>x</i> · <i>x</i> · <i>x</i>.'},
   {q:'Laquelle de ces expressions n’est <b>pas</b> égale à 2<i>a</i> + 6&nbsp;?',opts:['2(<i>a</i> + 3)','6 + 2<i>a</i>','<i>a</i> + <i>a</i> + 6','2(<i>a</i> + 6)'],ans:3,why:'2(<i>a</i> + 6) = 2<i>a</i> + 12. Contre-exemple : pour <i>a</i> = 0, on trouve 12 au lieu de 6. Les trois autres sont égales à 2<i>a</i> + 6.'},
 ]},
 {n:'Lettres et formules',r:'Pourquoi des lettres ?',qs:[
   {q:'L’aire d’un rectangle est <i>A</i> = <i>L</i> · <i>l</i>. Que vaut <i>A</i> pour <i>L</i> = 12 m et <i>l</i> = 4,5 m&nbsp;?',unit:'m²',ans:54,tol:1e-6,why:'<i>A</i> = 12 · 4,5 = 54 m².'},
   {q:'Tour de magie : pense à un nombre, multiplie-le par 2, ajoute 8, divise par 2, puis enlève le nombre de départ. Quel résultat trouve-t-on toujours&nbsp;?',lab:'résultat =',ans:4,why:'Avec la lettre <i>n</i> : 2 · <i>n</i>, puis 2 · <i>n</i> + 8, puis la moitié <i>n</i> + 4, puis on enlève <i>n</i> : il reste 4.'},
   {q:'Dans la formule <i>p</i> = 4<i>c</i> du périmètre d’un carré, que représente la lettre <i>c</i>&nbsp;?',opts:['un nombre qui vaut toujours 4','la longueur du côté, qui peut changer','le mot « carré »','le périmètre'],ans:1,why:'<i>c</i> est la longueur du côté : elle change d’un carré à l’autre, et la formule donne le périmètre pour chaque valeur de <i>c</i>.'},
   {q:'Le prix d’une course de taxi est <i>P</i> = 5 + 2<i>d</i>, où <i>d</i> est la distance en km. Combien coûte une course de 9 km&nbsp;?',unit:'CHF',ans:23,why:'<i>P</i> = 5 + 2 · 9 = 5 + 18 = 23 CHF.'},
 ]},
];
})();
