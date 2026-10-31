/* Déclic — examen de compétence : Autres bases et limites classiques */
(()=>{
const x='<i>x</i>';
const e=s=>`e<sup>${s}</sup>`;
EXAMS['gred-bases-limites']=[
 {n:'Exponentielle de base a', r:'Règles de calcul et dérivée de aˣ', qs:[
   {q:`Calcule 8<sup>2/3</sup> à partir de la définition <i>a</i><sup>${x}</sup> = ${e(`${x} ln <i>a</i>`)}.`, lab:'8^(2/3) =', ans:4, tol:1e-6, why:`8<sup>2/3</sup> = ${e('(2/3) ln 8')} = ${e('(2/3) · 3 ln 2')} = ${e('2 ln 2')} = 2² = 4. C’est bien (∛8)² = 2² = 4.`},
   {q:`Calcule la dérivée de <i>f</i>(${x}) = 3<sup>${x}</sup> en ${x} = 2, arrondie au millième.`, lab:'f′(2) =', ans:9*Math.log(3), tol:.002, why:`(3<sup>${x}</sup>)′ = 3<sup>${x}</sup> ln 3, donc <i>f</i>′(2) = 9 ln 3 ≈ 9,888.`},
   {q:`Calcule la dérivée de <i>g</i>(${x}) = (1/3)<sup>${x}</sup> en ${x} = 1, arrondie au millième.`, lab:'g′(1) =', ans:-Math.log(3)/3, tol:.002, why:`<i>g</i>′(${x}) = (1/3)<sup>${x}</sup> ln(1/3) = −(1/3)<sup>${x}</sup> ln 3, donc <i>g</i>′(1) = −ln 3/3 ≈ −0,366. La pente est négative car la base est inférieure à 1.`},
   {q:`Quelle est la dérivée de ${x} ↦ 5<sup>${x}</sup> ?`, opts:[`${x} · 5<sup>${x}−1</sup>`,`5<sup>${x}</sup>`,`5<sup>${x}</sup>/ln 5`,`5<sup>${x}</sup> ln 5`], ans:3, why:`5<sup>${x}</sup> = ${e(`${x} ln 5`)}, dont la dérivée est ln 5 · ${e(`${x} ln 5`)} = 5<sup>${x}</sup> ln 5. La formule ${x} · 5<sup>${x}−1</sup> est celle d’une puissance d’exposant constant : ici la variable est dans l’exposant.`},
 ]},
 {n:'Logarithme de base a', r:'Le logarithme de base a', qs:[
   {q:'Calcule log<sub>3</sub> 81.', lab:'log₃ 81 =', ans:4, tol:1e-6, why:'81 = 3⁴, donc log<sub>3</sub> 81 = ln 81/ln 3 = 4 ln 3/ln 3 = 4.'},
   {q:'Calcule log<sub>8</sub> 4 (valeur exacte).', lab:'log₈ 4 =', ans:2/3, tol:.001, show:'2/3', why:'log<sub>8</sub> 4 = ln 4/ln 8 = 2 ln 2/(3 ln 2) = 2/3. Contrôle : 8<sup>2/3</sup> = (∛8)² = 4.'},
   {q:`Résous 2<sup>${x}</sup> = 7. Donne ${x} arrondi au millième.`, lab:'x =', ans:Math.log(7)/Math.log(2), tol:.002, why:`2<sup>${x}</sup> = 7 ⇔ ${x} = log<sub>2</sub> 7 = ln 7/ln 2 ≈ 1,9459/0,6931 ≈ 2,807.`},
   {q:`Calcule la dérivée de ${x} ↦ log<sub>10</sub> ${x} en ${x} = 5, arrondie au millième.`, lab:'dérivée =', ans:1/(5*Math.log(10)), tol:.001, why:`(log<sub>10</sub> ${x})′ = 1/(${x} ln 10). En ${x} = 5 : 1/(5 ln 10) ≈ 1/11,513 ≈ 0,087.`},
   {q:'Combien de chiffres le nombre 2<sup>100</sup> a-t-il en écriture décimale ?', lab:'chiffres :', ans:31, why:'log<sub>10</sub>(2<sup>100</sup>) = 100 log<sub>10</sub> 2 = 100 ln 2/ln 10 ≈ 30,10. Ce logarithme est entre 30 et 31, donc 2<sup>100</sup> est entre 10<sup>30</sup> et 10<sup>31</sup> : il a 31 chiffres.'},
 ]},
 {n:'Puissances d’exposant réel', r:'Puissances d’exposant réel : x^α', qs:[
   {q:`Calcule la dérivée de ${x} ↦ ${x}<sup>3/2</sup> en ${x} = 4.`, lab:'dérivée =', ans:3, tol:1e-6, why:`(${x}<sup>3/2</sup>)′ = (3/2) ${x}<sup>1/2</sup>. En ${x} = 4 : (3/2) · 2 = 3.`},
   {q:`Calcule la dérivée de ${x} ↦ 1/√${x} en ${x} = 4 (valeur exacte, en décimal).`, lab:'dérivée =', ans:-1/16, tol:1e-4, why:`1/√${x} = ${x}<sup>−1/2</sup>, de dérivée −(1/2) ${x}<sup>−3/2</sup>. En ${x} = 4 : 4<sup>−3/2</sup> = 1/8, donc −1/16 = −0,0625.`},
   {q:`Pour ${x} &gt; 0, (${x}<sup>√2</sup>)<sup>√2</sup> est égal à…`, opts:[`${x}<sup>2√2</sup>`,`${x}²`,`${x}<sup>√2 + √2</sup>`,`2${x}`], ans:1, why:`(${x}<sup>α</sup>)<sup>β</sup> = ${x}<sup>αβ</sup>, et √2 · √2 = 2 : on obtient ${x}². On multiplie les exposants, on ne les additionne pas.`},
   {q:'Laquelle de ces fonctions est décroissante sur ]0 ; +∞[ ?', opts:[`${x}<sup>0,1</sup>`,`${x}<sup>√2</sup>`,`${x}<sup>−0,5</sup>`,`2<sup>${x}</sup>`], ans:2, why:`${x}<sup>α</sup> est décroissante quand α &lt; 0, puisque sa dérivée α ${x}<sup>α−1</sup> est alors négative : c’est ${x}<sup>−0,5</sup>. Les deux autres puissances ont α &gt; 0, et 2<sup>${x}</sup> croît car 2 &gt; 1.`},
 ]},
 {n:'Dériver une fonction u(x)^v(x)', r:'Dériver u(x)^v(x) en passant par l’exponentielle', qs:[
   {q:`Calcule la dérivée de ${x}<sup>${x}</sup> en ${x} = e, arrondie au centième.`, lab:'f′(e) =', ans:2*Math.exp(Math.E), tol:.01, why:`${x}<sup>${x}</sup> = ${e(`${x} ln ${x}`)}, donc <i>f</i>′(${x}) = (ln ${x} + 1) ${x}<sup>${x}</sup>. En e : (1 + 1) e<sup>e</sup> = 2e<sup>e</sup> ≈ 2 · 15,154 ≈ 30,31.`},
   {q:`Calcule la dérivée de <i>f</i>(${x}) = (${x} + 1)<sup>${x}</sup> en ${x} = 1, arrondie au millième.`, lab:'f′(1) =', ans:2*Math.log(2)+1, tol:.002, why:`<i>f</i> = ${e('<i>w</i>')} avec <i>w</i> = ${x} ln(${x} + 1), <i>w</i>′ = ln(${x} + 1) + ${x}/(${x} + 1). En 1 : <i>w</i>′(1) = ln 2 + 1/2 et <i>f</i>(1) = 2, donc <i>f</i>′(1) = 2(ln 2 + 1/2) = 2 ln 2 + 1 ≈ 2,386.`},
   {q:`Quelle est la dérivée de ${x} ↦ ${x}<sup>sin ${x}</sup> sur ]0 ; +∞[ ?`, opts:[`sin ${x} · ${x}<sup>sin ${x} − 1</sup>`,`${x}<sup>sin ${x}</sup> (cos ${x} ln ${x} + sin ${x}/${x})`,`${x}<sup>sin ${x}</sup> ln ${x} cos ${x}`,`cos ${x} · ${x}<sup>sin ${x}</sup>`], ans:1, why:`${x}<sup>sin ${x}</sup> = ${e(`sin ${x} · ln ${x}`)}. L’exposant se dérive par la règle du produit : cos ${x} ln ${x} + sin ${x} · 1/${x}. On multiplie par ${x}<sup>sin ${x}</sup>.`},
   {q:`Un élève écrit : « (${x}<sup>${x}</sup>)′ = ${x} · ${x}<sup>${x}−1</sup> = ${x}<sup>${x}</sup> ». Que penses-tu de ce calcul ?`, opts:['Il est juste','Il est juste seulement pour x entier','Il fallait écrire x<sup>x</sup> ln x','Il est faux : la formule (x<sup>α</sup>)′ = αx<sup>α−1</sup> exige un exposant constant ; la dérivée est (ln x + 1)x<sup>x</sup>'], ans:3, why:`La variable est à la fois dans la base et dans l’exposant. On écrit ${x}<sup>${x}</sup> = ${e(`${x} ln ${x}`)} et on trouve (ln ${x} + 1)${x}<sup>${x}</sup>. Chaque formule toute faite (puissance ou exponentielle) oublie la moitié de la variation.`},
 ]},
 {n:'L’inégalité ln x ≤ x − 1', r:'L’encadrement fondamental de ln', qs:[
   {q:`En appliquant ln <i>t</i> ≤ <i>t</i> − 1 à <i>t</i> = 1/${x} (avec ${x} &gt; 0), quelle inégalité obtient-on ?`, opts:[`ln ${x} ≤ 1 − 1/${x}`,`ln ${x} ≥ 1 − 1/${x}`,`ln ${x} ≥ ${x} − 1`,`ln ${x} ≤ 1/${x} − 1`], ans:1, why:`ln(1/${x}) = −ln ${x} ≤ 1/${x} − 1. En multipliant par −1, le sens change : ln ${x} ≥ 1 − 1/${x}.`},
   {q:`Pour ${x} &gt; 1, on a 0 &lt; ln ${x}/${x} &lt; 2/√${x}. Quelle borne cette inégalité donne-t-elle pour ${x} = 10<sup>6</sup> ?`, lab:'borne =', ans:.002, tol:1e-5, why:`√(10<sup>6</sup>) = 1000, donc 2/√${x} = 2/1000 = 0,002. La vraie valeur ln(10<sup>6</sup>)/10<sup>6</sup> ≈ 0,0000138 est bien plus petite : la borne sert à prouver la limite, pas à l’approcher.`},
   {q:'Laquelle de ces inégalités, vraie pour tout réel <i>t</i>, découle de ln <i>x</i> ≤ <i>x</i> − 1 en posant <i>x</i> = e<sup><i>t</i></sup> ?', opts:['e<sup><i>t</i></sup> ≤ 1 + <i>t</i>','e<sup><i>t</i></sup> ≥ <i>t</i>²','e<sup><i>t</i></sup> ≥ 1 + <i>t</i>','ln <i>t</i> ≥ <i>t</i> − 1'], ans:2, why:'ln(e<sup><i>t</i></sup>) = <i>t</i> ≤ e<sup><i>t</i></sup> − 1, soit e<sup><i>t</i></sup> ≥ 1 + <i>t</i> : la courbe de exp est au-dessus de sa tangente en 0.'},
 ]},
 {n:'Croissances comparées', r:'Croissances comparées', qs:[
   {q:`Une seule de ces expressions tend vers +∞ quand ${x} → +∞. Laquelle ?`, opts:[`${e(x)}/${x}<sup>50</sup>`,`ln ${x}/${x}<sup>0,1</sup>`,`${x}<sup>100</sup> ${e(`−${x}`)}`,`ln ${x}/${x}`], ans:0, why:`L’exponentielle l’emporte sur toute puissance : ${e(x)}/${x}<sup>50</sup> → +∞. Les trois autres tendent vers 0 : ln ≪ ${x}<sup>0,1</sup>, ${x}<sup>100</sup>/${e(x)} → 0 et ln ${x}/${x} → 0.`},
   {q:`Calcule la limite de √${x} · ln ${x} quand ${x} → 0⁺.`, lab:'limite =', ans:0, tol:1e-6, why:`Pose <i>t</i> = √${x} → 0⁺ : √${x} ln ${x} = <i>t</i> ln(<i>t</i>²) = 2 <i>t</i> ln <i>t</i> → 2 · 0 = 0, par la limite <i>t</i> ln <i>t</i> → 0 en 0⁺.`},
   {q:`Calcule la limite de ${x}<sup>2${x}</sup> quand ${x} → 0⁺.`, lab:'limite =', ans:1, tol:1e-6, why:`${x}<sup>2${x}</sup> = ${e(`2${x} ln ${x}`)}, et 2${x} ln ${x} → 2 · 0 = 0 en 0⁺. Donc ${x}<sup>2${x}</sup> → e<sup>0</sup> = 1 (et non 0 : la forme 0<sup>0</sup> est indéterminée).`},
 ]},
 {n:'Limites en 0 par le taux d’accroissement', r:'Deux limites par le taux d’accroissement', qs:[
   {q:`Calcule lim<sub>${x}→0</sub> (${e(`5${x}`)} − 1)/${x}.`, lab:'limite =', ans:5, tol:1e-6, why:`Pose <i>h</i> = 5${x} : (${e('<i>h</i>')} − 1)/(<i>h</i>/5) = 5 · (${e('<i>h</i>')} − 1)/<i>h</i> → 5 · 1 = 5.`},
   {q:`Calcule lim<sub>${x}→0</sub> ln(1 + 3${x})/(2${x}).`, lab:'limite =', ans:1.5, tol:1e-6, why:`ln(1 + 3${x})/(2${x}) = (3/2) · ln(1 + 3${x})/(3${x}), et ln(1 + <i>h</i>)/<i>h</i> → 1 avec <i>h</i> = 3${x}. La limite vaut 3/2.`},
   {q:`Calcule lim<sub>${x}→0</sub> (2<sup>${x}</sup> − 1)/${x}, arrondie au millième.`, lab:'limite =', ans:Math.log(2), tol:.002, why:`C’est le taux d’accroissement de ${x} ↦ 2<sup>${x}</sup> en 0 : sa limite est la dérivée en 0, ln 2 · 2<sup>0</sup> = ln 2 ≈ 0,693.`},
   {q:`Calcule lim<sub>${x}→0</sub> (3<sup>${x}</sup> − 1)/(2<sup>${x}</sup> − 1), arrondie au millième.`, lab:'limite =', ans:Math.log(3)/Math.log(2), tol:.002, why:`Divise haut et bas par ${x} : (3<sup>${x}</sup> − 1)/${x} → ln 3 et (2<sup>${x}</sup> − 1)/${x} → ln 2. La limite vaut ln 3/ln 2 ≈ 1,585.`},
 ]},
 {n:'Lever une forme indéterminée', r:'Lever une forme indéterminée avec les croissances comparées', qs:[
   {q:`Calcule lim<sub>${x}→+∞</sub> (2${e(x)} + ${x}⁵)/(${e(x)} − ${x}²).`, lab:'limite =', ans:2, tol:1e-6, why:`On met ${e(x)} en facteur : (2 + ${x}⁵/${e(x)})/(1 − ${x}²/${e(x)}). Les quotients tendent vers 0 par croissances comparées, la limite vaut 2/1 = 2.`},
   {q:`Calcule lim<sub>${x}→+∞</sub> (${x}² + 3 ln ${x})/(2${x}² + 1).`, lab:'limite =', ans:.5, tol:1e-6, why:`Le terme dominant est ${x}² : (1 + 3 ln ${x}/${x}²)/(2 + 1/${x}²). Comme ln ${x}/${x}² → 0, la limite vaut 1/2.`},
   {q:`Que vaut lim<sub>${x}→+∞</sub> (${e(x)} − ${x}<sup>10</sup>) ?`, opts:['0','On ne peut pas conclure : c’est ∞ − ∞','+∞','−∞'], ans:2, why:`${e(x)} − ${x}<sup>10</sup> = ${e(x)}(1 − ${x}<sup>10</sup>/${e(x)}). La parenthèse tend vers 1 et ${e(x)} → +∞ : la limite est +∞. La forme ∞ − ∞ se lève en factorisant le terme dominant.`},
   {q:`Calcule lim<sub>${x}→+∞</sub> ${x}(${e(`1/${x}`)} − 1).`, lab:'limite =', ans:1, tol:1e-6, why:`Change de variable : <i>t</i> = 1/${x} → 0⁺. Alors ${x}(${e(`1/${x}`)} − 1) = (${e('<i>t</i>')} − 1)/<i>t</i> → 1.`},
 ]},
];
})();
