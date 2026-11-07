/* Déclic — examen de compétence : Calcul littéral (10e année) */
(()=>{
const rectFig=(w,h,lw,lh,extra)=>{ const P=plane({x:[-1.5,9],y:[-1,5.5],grid:false,axes:false});
  P.rect(0,0,w,h,{fill:'var(--math)',fo:.25,c:'var(--math)',w:2.5}); P.text(w/2,h,lw,{a:'middle',dy:-8,s:14}).text(0,h/2,lh,{a:'end',dx:-8,dy:5,s:14});
  if(extra) extra(P); return P.svg(); };
EXAMS['sec10-litteral']=[
 {n:'Valeur numérique d’une expression', r:'Calculer la valeur numérique d’une expression', qs:[
   {q:'Calcule 5<i>x</i> − 2<i>x</i>² pour <i>x</i> = 3.', ans:-3, why:'D’abord le carré : 3² = 9. Puis 5 · 3 − 2 · 9 = 15 − 18 = −3.'},
   {q:'Calcule 4 − 3<i>x</i>² pour <i>x</i> = −2.', ans:-8, why:'(−2)² = 4, donc 4 − 3 · 4 = 4 − 12 = −8. Le carré d’un nombre négatif est positif.'},
   {q:'Aire d’un trapèze : (<i>B</i> + <i>b</i>) · <i>h</i> : 2. Calcule-la pour <i>B</i> = 12 cm, <i>b</i> = 7 cm, <i>h</i> = 6 cm.', unit:'cm²', ans:57, why:'(12 + 7) · 6 : 2 = 19 · 6 : 2 = 114 : 2 = 57 cm².'},
   {q:'Calcule √(<i>a</i>² + <i>b</i>²) pour <i>a</i> = 8 et <i>b</i> = 15.', ans:17, why:'√(64 + 225) = √289 = 17. La racine se prend à la fin, après la somme des carrés.'},
   {q:`Calcule ${F(1,'<i>a</i>')} + ${F(1,'<i>b</i>')} pour <i>a</i> = 3 et <i>b</i> = 6.`, ans:0.5, tol:0.001, show:'1/2', why:`${F(1,3)} + ${F(1,6)} = ${F(2,6)} + ${F(1,6)} = ${F(3,6)} = ${F(1,2)}.`},
   {q:'Volume d’un cylindre : π<i>r</i>²<i>h</i>. Calcule-le pour <i>r</i> = 2 cm et <i>h</i> = 5 cm, arrondi au dixième.', unit:'cm³', ans:62.8, tol:0.06, why:'π · 2² · 5 = π · 4 · 5 = 20π ≈ 62,8 cm³.'},
 ]},
 {n:'Écrire une expression', r:'Traduire une figure ou une phrase en expression', qs:[
   {q:'« La moitié de la différence de <i>x</i> et de 6 » s’écrit :', opts:['<i>x</i> − 6 : 2','(<i>x</i> − 6) : 2','<i>x</i> : 2 − 6','2(<i>x</i> − 6)'], ans:1, why:'Le dernier calcul est « la moitié » : on divise par 2 toute la différence, donc des parenthèses : (<i>x</i> − 6) : 2.'},
   {q:'« Le produit de 5 par le carré de <i>y</i> » s’écrit :', opts:['(5<i>y</i>)²','5 + <i>y</i>²','5<i>y</i>²','10<i>y</i>'], ans:2, why:'Le dernier calcul est un produit : 5 · <i>y</i>², qui s’écrit 5<i>y</i>². (5<i>y</i>)² serait le carré du produit.'},
   {q:'Quel est le périmètre réduit de ce rectangle&nbsp;?', fig:rectFig(7,3,'x + 5','3'), opts:['3<i>x</i> + 15','2<i>x</i> + 13','<i>x</i> + 8','2<i>x</i> + 16'], ans:3, why:'2(<i>x</i> + 5) + 2 · 3 = 2<i>x</i> + 10 + 6 = 2<i>x</i> + 16. 3<i>x</i> + 15 serait l’aire.'},
   {q:'<i>n</i> amis vont au cinéma : chacun paie une place à 14 CHF et un pop-corn à 6 CHF. Quel est le prix total&nbsp;?', opts:['14<i>n</i> + 6','20<i>n</i>','14 + 6<i>n</i>','20 + <i>n</i>'], ans:1, why:'Chaque ami paie 14 + 6 = 20 CHF, donc le total vaut 14<i>n</i> + 6<i>n</i> = 20<i>n</i>. 14<i>n</i> + 6 compterait un seul pop-corn.'},
   {q:'On découpe un carré de côté 2 dans un coin d’un carré de côté <i>x</i>. L’aire restante s’écrit <i>x</i>² − 4. Calcule-la pour <i>x</i> = 7.', fig:rectFig(5,5,'x','x',P=>P.rect(3.6,3.6,1.4,1.4,{fill:'var(--surface)',fo:1,c:'var(--bad)',w:2,dash:true}).text(4.3,4.3,'2',{a:'middle',dy:5,s:12,c:'var(--bad)'})), ans:45, why:'7² − 4 = 49 − 4 = 45.'},
 ]},
 {n:'Expressions équivalentes', r:'Des expressions équivalentes', qs:[
   {q:'Laquelle de ces expressions est équivalente à 3(<i>x</i> + 2)&nbsp;?', opts:['3<i>x</i> + 2','3<i>x</i> + 6','<i>x</i> + 6','3<i>x</i> + 5'], ans:1, why:'3(<i>x</i> + 2) = 3<i>x</i> + 3 · 2 = 3<i>x</i> + 6 : le 3 multiplie les deux termes.'},
   {q:'Pour prouver que <i>x</i>² et 2<i>x</i> ne sont pas équivalentes, il suffit de…', opts:['vérifier qu’elles sont égales pour <i>x</i> = 2','trouver une valeur de <i>x</i> pour laquelle elles diffèrent, par exemple <i>x</i> = 1','tester dix valeurs au hasard','c’est impossible à prouver'], ans:1, why:'Un contre-exemple suffit : pour <i>x</i> = 1, <i>x</i>² = 1 et 2<i>x</i> = 2. Le cas <i>x</i> = 2 est une coïncidence.'},
   {q:'Quelle affirmation est vraie&nbsp;?', opts:['<i>x</i> + <i>x</i> + <i>x</i> et <i>x</i>³ sont équivalentes','Pour <i>x</i> = 0, <i>x</i> + <i>x</i> + <i>x</i> = <i>x</i>³, et pourtant ces expressions ne sont pas équivalentes','<i>x</i> + <i>x</i> + <i>x</i> = 3 + <i>x</i>','<i>x</i> · <i>x</i> · <i>x</i> = 3<i>x</i>'], ans:1, why:'<i>x</i> + <i>x</i> + <i>x</i> = 3<i>x</i> et <i>x</i> · <i>x</i> · <i>x</i> = <i>x</i>³. Elles coïncident pour <i>x</i> = 0, mais pour <i>x</i> = 2 : 6 contre 8.'},
   {q:'2<i>x</i> + 6 et <i>x</i>² + 6 donnent le même résultat pour <i>x</i> = 0 et pour un autre nombre entier positif. Lequel&nbsp;?', lab:'x =', ans:2, why:'Il faut <i>x</i>² = 2<i>x</i>. Essais : <i>x</i> = 1 donne 1 et 2, <i>x</i> = 2 donne 4 et 4. Pour <i>x</i> = 2, les deux valent 10.'},
 ]},
 {n:'Monômes et polynômes', r:'Monômes et polynômes', qs:[
   {q:'Quel est le coefficient du monôme −<i>x</i>³<i>y</i>&nbsp;?', lab:'coefficient :', ans:-1, why:'−<i>x</i>³<i>y</i> = −1 · <i>x</i>³<i>y</i> : le coefficient est −1, même s’il ne s’écrit pas.'},
   {q:'Quel est le degré du monôme 6<i>a</i>²<i>b</i>³&nbsp;?', lab:'degré =', ans:5, why:'<i>a</i>²<i>b</i>³ contient 2 + 3 = 5 lettres multipliées : degré 5. Le coefficient 6 ne compte pas.'},
   {q:'Quel est le degré du polynôme 7 − 2<i>x</i> + 5<i>x</i>³ − <i>x</i>²&nbsp;?', lab:'degré =', ans:3, why:'Les termes ont pour degrés 0, 1, 3 et 2. Le plus grand est 3.'},
   {q:'Quelle paire est formée de termes semblables&nbsp;?', opts:['3<i>x</i>²<i>y</i> et 3<i>xy</i>²','2<i>x</i> et 2<i>x</i>²','5<i>a</i> et 5<i>b</i>','4<i>xy</i>² et −<i>xy</i>²'], ans:3, why:'Des termes semblables ont la même partie littérale : <i>xy</i>² pour les deux. Le coefficient peut être différent.'},
   {q:'Quelle est la partie littérale du monôme 9<i>a</i>²<i>b</i>&nbsp;?', opts:['9','<i>a</i>²<i>b</i>','9<i>a</i>²','<i>ab</i>'], ans:1, why:'La partie littérale est tout ce qui est lettres : <i>a</i>²<i>b</i>. Le nombre 9 est le coefficient.'},
 ]},
 {n:'Réduire, additionner et soustraire', r:'Supprimer les parenthèses et réduire', qs:[
   {q:'Réduis 5<i>x</i> + 3 − 2<i>x</i> + 7.', opts:['13<i>x</i>','3<i>x</i> + 10','7<i>x</i> + 10','3<i>x</i> − 4'], ans:1, why:'Les <i>x</i> : 5<i>x</i> − 2<i>x</i> = 3<i>x</i>. Les nombres : 3 + 7 = 10.'},
   {q:'On réduit 4<i>a</i>² − 3<i>a</i> + 2<i>a</i>² + 8<i>a</i> − 1. Quel est le coefficient de <i>a</i>&nbsp;?', lab:'coefficient :', ans:5, why:'−3<i>a</i> + 8<i>a</i> = 5<i>a</i>. La forme réduite est 6<i>a</i>² + 5<i>a</i> − 1.'},
   {q:'Réduis (3<i>x</i>² + 2<i>x</i> − 5) + (<i>x</i>² − 6<i>x</i> + 1).', opts:['4<i>x</i>² − 4<i>x</i> − 4','4<i>x</i>² + 8<i>x</i> − 4','3<i>x</i>² − 4<i>x</i> − 4','4<i>x</i>² − 4<i>x</i> + 6'], ans:0, why:'Après un +, on recopie : 3<i>x</i>² + <i>x</i>² = 4<i>x</i>², 2<i>x</i> − 6<i>x</i> = −4<i>x</i>, −5 + 1 = −4.'},
   {q:'Réduis (2<i>x</i>² − <i>x</i> + 4) − (5<i>x</i>² + 3<i>x</i> − 2).', opts:['−3<i>x</i>² + 2<i>x</i> + 2','−3<i>x</i>² − 4<i>x</i> + 2','−3<i>x</i>² − 4<i>x</i> + 6','7<i>x</i>² + 2<i>x</i> + 2'], ans:2, why:'Le − change tous les signes : 2<i>x</i>² − <i>x</i> + 4 − 5<i>x</i>² − 3<i>x</i> + 2 = −3<i>x</i>² − 4<i>x</i> + 6.'},
   {q:'Léo écrit 2<i>x</i> + 3<i>x</i>² = 5<i>x</i>³. Quelle est son erreur&nbsp;?', opts:['Il fallait écrire 5<i>x</i>²','Il fallait écrire 6<i>x</i>³','Ce ne sont pas des termes semblables : on ne peut pas réduire','Il n’y a pas d’erreur'], ans:2, why:'2<i>x</i> et 3<i>x</i>² n’ont pas la même partie littérale. La somme 3<i>x</i>² + 2<i>x</i> reste telle quelle. Contrôle avec <i>x</i> = 1 : 5 contre 5 par hasard, mais <i>x</i> = 2 donne 16 contre 40.'},
 ]},
 {n:'Multiplier et développer', r:'Développer et réduire un produit', qs:[
   {q:'Calcule (−3<i>a</i>²) · 5<i>a</i>³.', opts:['2<i>a</i>⁵','−15<i>a</i>⁶','−15<i>a</i>⁵','15<i>a</i>⁵'], ans:2, why:'Coefficients : (−3) · 5 = −15. Lettres : <i>a</i>² · <i>a</i>³ = <i>a</i>⁵, les exposants s’additionnent.'},
   {q:'Développe 4<i>x</i>(2<i>x</i> − 3).', opts:['8<i>x</i>² − 12<i>x</i>','8<i>x</i> − 12','8<i>x</i>² − 3','6<i>x</i> − 12<i>x</i>'], ans:0, why:'4<i>x</i> · 2<i>x</i> = 8<i>x</i>² et 4<i>x</i> · (−3) = −12<i>x</i>.'},
   {q:'Développe et réduis (<i>x</i> + 5)(<i>x</i> − 2).', opts:['<i>x</i>² − 10','<i>x</i>² + 3<i>x</i> − 10','<i>x</i>² − 3<i>x</i> − 10','<i>x</i>² + 7<i>x</i> − 10'], ans:1, why:'<i>x</i>² − 2<i>x</i> + 5<i>x</i> − 10 = <i>x</i>² + 3<i>x</i> − 10.'},
   {q:'On développe (3<i>x</i> − 1)(2<i>x</i> + 4). Quel est le coefficient de <i>x</i>&nbsp;?', lab:'coefficient :', ans:10, why:'Les produits en <i>x</i> : 3<i>x</i> · 4 = 12<i>x</i> et (−1) · 2<i>x</i> = −2<i>x</i>, total 10<i>x</i>. En entier : 6<i>x</i>² + 10<i>x</i> − 4.'},
   {q:'On développe et réduit (2<i>x</i> + 1)(<i>x</i> − 3) − 2<i>x</i>². Quel est le coefficient de <i>x</i>&nbsp;?', lab:'coefficient :', ans:-5, why:'(2<i>x</i> + 1)(<i>x</i> − 3) = 2<i>x</i>² − 6<i>x</i> + <i>x</i> − 3 = 2<i>x</i>² − 5<i>x</i> − 3. On retire 2<i>x</i>² : −5<i>x</i> − 3.'},
   {q:'Ce rectangle de côtés <i>x</i> + 4 et <i>x</i> + 1 est découpé en quatre morceaux. Quelle est son aire développée&nbsp;?', fig:rectFig(7,4,'x + 4','x + 1',P=>P.seg(4.5,0,4.5,4,{c:'var(--ink)',w:1.5}).seg(0,1,7,1,{c:'var(--ink)',w:1.5})), opts:['<i>x</i>² + 4','<i>x</i>² + 5<i>x</i> + 4','2<i>x</i> + 5','<i>x</i>² + 4<i>x</i> + 5'], ans:1, why:'Les quatre morceaux : <i>x</i>², 4<i>x</i>, <i>x</i> et 4. Total : <i>x</i>² + 5<i>x</i> + 4.'},
 ]},
];
})();
