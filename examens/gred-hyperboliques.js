/* Déclic — examen de compétence : Fonctions hyperboliques et leurs réciproques */
(()=>{
const x='<i>x</i>';
const e=s=>`e<sup>${s}</sup>`;
const I=(a,b,g)=>`∫<sub>${a}</sub><sup>${b}</sup> ${g} d<i>x</i>`;
EXAMS['gred-hyperboliques']=[
 {n:'Définitions de ch, sh, th', r:'Partie paire et partie impaire de eˣ', qs:[
   {q:'Calcule ch(ln 3) (valeur exacte, en décimal arrondi au millième).', lab:'ch(ln 3) =', ans:5/3, tol:.002, why:`${e('ln 3')} = 3 et ${e('−ln 3')} = 1/3 : ch(ln 3) = (3 + 1/3)/2 = (10/3)/2 = 5/3 ≈ 1,667.`},
   {q:'Calcule th(ln 3).', lab:'th(ln 3) =', ans:.8, tol:1e-3, why:'sh(ln 3) = (3 − 1/3)/2 = 4/3 et ch(ln 3) = 5/3, donc th(ln 3) = (4/3)/(5/3) = 4/5 = 0,8.'},
   {q:`Quelle est la partie paire de la fonction ${x} ↦ ${e(`2${x}`)} ?`, opts:[`ch ${x}`,`sh(2${x})`,`2 ch ${x}`,`ch(2${x})`], ans:3, why:`La partie paire est (${e(`2${x}`)} + ${e(`−2${x}`)})/2 = ch(2${x}). La partie impaire est sh(2${x}), et ${e(`2${x}`)} = ch(2${x}) + sh(2${x}).`},
 ]},
 {n:'L’identité ch² − sh² = 1', r:'L’identité ch² − sh² = 1 et l’hyperbole', qs:[
   {q:`On sait que sh ${x} = 2,4. Calcule ch ${x}.`, lab:'ch x =', ans:2.6, tol:1e-3, why:`ch² ${x} = 1 + sh² ${x} = 1 + 5,76 = 6,76, et ch ${x} &gt; 0, donc ch ${x} = 2,6.`},
   {q:`On sait que ch ${x} = 5/3 et ${x} &lt; 0. Calcule sh ${x}, arrondi au millième.`, lab:'sh x =', ans:-4/3, tol:.002, why:`sh² ${x} = 25/9 − 1 = 16/9, donc sh ${x} = ±4/3. Comme ${x} &lt; 0 et sh est impaire et croissante, sh ${x} &lt; 0 : sh ${x} = −4/3 ≈ −1,333.`},
   {q:`On sait que th ${x} = 0,6. Calcule ch ${x}.`, lab:'ch x =', ans:1.25, tol:1e-3, why:`1 − th² ${x} = 1/ch² ${x}, donc ch² ${x} = 1/(1 − 0,36) = 1/0,64, et ch ${x} = 1/0,8 = 1,25 (ch &gt; 0).`},
   {q:'Pour <i>t</i> = −1, où se trouve le point (ch <i>t</i> ; sh <i>t</i>) ?', opts:['Sur la branche gauche de l’hyperbole <i>x</i>² − <i>y</i>² = 1','Sur le cercle unité','Sur la branche droite de l’hyperbole <i>x</i>² − <i>y</i>² = 1, sous l’axe des abscisses','Sur la droite <i>y</i> = −<i>x</i>'], ans:2, why:'ch² − sh² = 1 place le point sur l’hyperbole, et ch(−1) ≈ 1,543 ≥ 1 : branche droite. sh(−1) ≈ −1,175 &lt; 0 : il est sous l’axe. Il n’atteint jamais l’asymptote <i>y</i> = −<i>x</i>.'},
 ]},
 {n:'Dérivées et variations', r:'Dérivées et variations', qs:[
   {q:`Calcule la dérivée de ${x} ↦ ch² ${x} en ${x} = ln 2.`, lab:'dérivée =', ans:15/8, tol:1e-3, why:`(ch² ${x})′ = 2 ch ${x} sh ${x}. En ln 2 : ch = 5/4, sh = 3/4, donc 2 · (5/4)(3/4) = 15/8 = 1,875.`},
   {q:'Calcule la dérivée de th en <i>x</i> = ln 2.', lab:'th′(ln 2) =', ans:.64, tol:1e-3, why:'th(ln 2) = (3/4)/(5/4) = 3/5 et th′ = 1 − th² : 1 − 9/25 = 16/25 = 0,64.'},
   {q:`Calcule lim<sub>${x}→+∞</sub> sh ${x}/${e(x)}.`, lab:'limite =', ans:.5, tol:1e-4, why:`sh ${x}/${e(x)} = (${e(x)} − ${e(`−${x}`)})/(2${e(x)}) = (1 − ${e(`−2${x}`)})/2 → 1/2.`},
   {q:`Calcule ${I(0,1,`th ${x}`)}, arrondi au millième.`, lab:'I =', ans:Math.log(Math.cosh(1)), tol:.002, why:`th = sh/ch = (ch)′/ch, forme <i>u</i>′/<i>u</i> : primitive ln(ch ${x}). I = ln(ch 1) − ln 1 ≈ ln 1,543 ≈ 0,434.`},
 ]},
 {n:'Formules d’addition', r:'Formules d’addition', qs:[
   {q:'Calcule ch(2 ln 3) avec la formule ch 2<i>a</i> = 2 ch² <i>a</i> − 1. Arrondis au millième.', lab:'=', ans:41/9, tol:.002, why:'ch(ln 3) = 5/3, donc ch(2 ln 3) = 2 · 25/9 − 1 = 41/9 ≈ 4,556. Contrôle : (9 + 1/9)/2 = 41/9.'},
   {q:'Deux réels positifs <i>a</i> et <i>b</i> vérifient sh <i>a</i> = 3/4 et sh <i>b</i> = 12/5. Calcule sh(<i>a</i> + <i>b</i>).', lab:'sh(a + b) =', ans:99/20, tol:1e-3, why:'ch <i>a</i> = √(1 + 9/16) = 5/4 et ch <i>b</i> = √(1 + 144/25) = 13/5. sh(<i>a</i> + <i>b</i>) = sh <i>a</i> ch <i>b</i> + ch <i>a</i> sh <i>b</i> = (3/4)(13/5) + (5/4)(12/5) = 39/20 + 60/20 = 99/20 = 4,95.'},
   {q:'On sait que th <i>a</i> = 1/2 et th <i>b</i> = 1/3. Calcule th(<i>a</i> + <i>b</i>), arrondi au millième.', lab:'th(a + b) =', ans:5/7, tol:.002, why:'th(<i>a</i> + <i>b</i>) = (1/2 + 1/3)/(1 + 1/6) = (5/6)/(7/6) = 5/7 ≈ 0,714. Le dénominateur a un + (en trigonométrie, ce serait un −).'},
   {q:'Laquelle de ces formules est juste ?', opts:['ch(<i>a</i> − <i>b</i>) = ch <i>a</i> ch <i>b</i> + sh <i>a</i> sh <i>b</i>','ch(<i>a</i> − <i>b</i>) = ch <i>a</i> ch <i>b</i> − sh <i>a</i> sh <i>b</i>','sh(<i>a</i> − <i>b</i>) = sh <i>a</i> sh <i>b</i> − ch <i>a</i> ch <i>b</i>','ch(<i>a</i> − <i>b</i>) = ch <i>a</i> − ch <i>b</i>'], ans:1, why:'On remplace <i>b</i> par −<i>b</i> dans ch(<i>a</i> + <i>b</i>) = ch <i>a</i> ch <i>b</i> + sh <i>a</i> sh <i>b</i> : ch est paire, sh impaire, donc sh <i>a</i> sh(−<i>b</i>) = −sh <i>a</i> sh <i>b</i>.'},
 ]},
 {n:'Équations hyperboliques', r:'Résoudre une équation hyperbolique en revenant aux exponentielles', qs:[
   {q:`Résous ch ${x} = 5/3 et donne la solution positive, arrondie au millième.`, lab:'x =', ans:Math.log(3), tol:.002, why:`<i>u</i> = ${e(x)} : <i>u</i> + 1/<i>u</i> = 10/3, soit 3<i>u</i>² − 10<i>u</i> + 3 = 0, de racines 3 et 1/3. La solution positive est ${x} = ln 3 ≈ 1,099 (l’autre est −ln 3).`},
   {q:`Résous sh ${x} = 3. Donne ${x} arrondi au millième.`, lab:'x =', ans:Math.log(3+Math.sqrt(10)), tol:.002, why:`<i>u</i> − 1/<i>u</i> = 6, soit <i>u</i>² − 6<i>u</i> − 1 = 0 : <i>u</i> = 3 ± √10. Seule 3 + √10 est positive, donc ${x} = ln(3 + √10) ≈ 1,818.`},
   {q:`Résous th ${x} = 1/3. Donne ${x} arrondi au millième.`, lab:'x =', ans:Math.log(2)/2, tol:.002, why:`Avec <i>u</i> = ${e(`2${x}`)} : (<i>u</i> − 1)/(<i>u</i> + 1) = 1/3 ⇔ 3<i>u</i> − 3 = <i>u</i> + 1 ⇔ <i>u</i> = 2. Donc 2${x} = ln 2 et ${x} = ln 2/2 ≈ 0,347.`},
   {q:`L’équation 2 ch ${x} + sh ${x} = 2 a deux solutions, dont ${x} = 0. Calcule l’autre, arrondie au millième.`, lab:'x =', ans:-Math.log(3), tol:.002, why:`2 ch ${x} + sh ${x} = (3/2)${e(x)} + (1/2)${e(`−${x}`)}. Avec <i>u</i> = ${e(x)} : 3<i>u</i>² − 4<i>u</i> + 1 = 0, racines 1 et 1/3, toutes deux positives. Donc ${x} = 0 ou ${x} = ln(1/3) = −ln 3 ≈ −1,099.`},
   {q:`Combien de solutions réelles l’équation ch ${x} = 3 a-t-elle ?`, opts:['Aucune','Une seule','Deux, opposées','Une infinité'], ans:2, why:`ch est paire, décroît sur ]−∞ ; 0] et croît sur [0 ; +∞[ à partir de ch 0 = 1. Comme 3 &gt; 1, il y a deux solutions opposées : ±ln(3 + √8).`},
 ]},
 {n:'La fonction argsh', r:'argsh : la réciproque de sh', qs:[
   {q:'Calcule argsh(12/5), arrondi au millième.', lab:'argsh(12/5) =', ans:Math.log(5), tol:.002, why:'argsh <i>x</i> = ln(<i>x</i> + √(<i>x</i>² + 1)) : √(144/25 + 1) = 13/5, donc argsh(12/5) = ln(12/5 + 13/5) = ln 5 ≈ 1,609.'},
   {q:'Calcule la dérivée de argsh en <i>x</i> = 2, arrondie au millième.', lab:'dérivée =', ans:1/Math.sqrt(5), tol:.002, why:'(argsh <i>x</i>)′ = 1/√(<i>x</i>² + 1) = 1/√5 ≈ 0,447.'},
   {q:'Calcule ch(argsh 3), arrondi au millième.', lab:'=', ans:Math.sqrt(10), tol:.002, why:'Pose <i>y</i> = argsh 3 : sh <i>y</i> = 3, et ch <i>y</i> = √(1 + sh² <i>y</i>) = √10 ≈ 3,162 (ch &gt; 0).'},
 ]},
 {n:'Les fonctions argch et argth', r:'argch et argth', qs:[
   {q:'Calcule argch 2, arrondi au millième.', lab:'argch 2 =', ans:Math.log(2+Math.sqrt(3)), tol:.002, why:'argch <i>x</i> = ln(<i>x</i> + √(<i>x</i>² − 1)) = ln(2 + √3) ≈ ln 3,732 ≈ 1,317.'},
   {q:'Calcule argth(0,8), arrondi au millième.', lab:'argth(0,8) =', ans:Math.log(3), tol:.002, why:'argth <i>x</i> = ½ ln((1 + <i>x</i>)/(1 − <i>x</i>)) = ½ ln(1,8/0,2) = ½ ln 9 = ln 3 ≈ 1,099.'},
   {q:'Calcule la dérivée de argch en <i>x</i> = 3, arrondie au millième.', lab:'dérivée =', ans:1/Math.sqrt(8), tol:.002, why:'(argch <i>x</i>)′ = 1/√(<i>x</i>² − 1) = 1/√8 ≈ 0,354.'},
   {q:'Laquelle de ces expressions est définie ?', opts:['argch(0,5)','argth(−1)','argch(−2)','argth(−0,9)'], ans:3, why:'argch est définie sur [1 ; +∞[ (ch ≥ 1) et argth sur ]−1 ; 1[ ouvert (|th| &lt; 1). Seul argth(−0,9) existe.'},
 ]},
 {n:'Primitiver avec les arguments', r:'Primitiver avec argsh, argch et argth', qs:[
   {q:`Calcule ${I(0,4,`1/√(${x}² + 9)`)}, arrondi au millième.`, lab:'I =', ans:Math.log(3), tol:.002, why:'<i>a</i> = 3 : primitive argsh(<i>x</i>/3). I = argsh(4/3) = ln(4/3 + 5/3) = ln 3 ≈ 1,099.'},
   {q:`Calcule ${I(2,3,`1/√(${x}² − 1)`)}, arrondi au millième.`, lab:'I =', ans:Math.acosh(3)-Math.acosh(2), tol:.002, why:'Primitive argch <i>x</i> : argch 3 − argch 2 = ln(3 + √8) − ln(2 + √3) ≈ 1,763 − 1,317 = 0,446.'},
   {q:`Calcule ${I(0,'0,6',`1/(1 − ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.log(2), tol:.002, why:'Primitive argth <i>x</i> : argth(0,6) = ½ ln(1,6/0,4) = ½ ln 4 = ln 2 ≈ 0,693.'},
   {q:`Calcule ${I(0,1,`1/√(4${x}² + 1)`)}, arrondi au millième.`, lab:'I =', ans:Math.asinh(2)/2, tol:.002, why:'√(4<i>x</i>² + 1) = 2√(<i>x</i>² + 1/4) : primitive (1/2) argsh(2<i>x</i>). I = (1/2) argsh 2 = (1/2) ln(2 + √5) ≈ 0,722.'},
 ]},
];
})();
