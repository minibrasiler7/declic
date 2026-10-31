/* Déclic — examen de compétence : Substitution et changement de variable */
(()=>{
const x='<i>x</i>', u='<i>u</i>', t='<i>t</i>';
const e=s=>`e<sup>${s}</sup>`;
const I=(a,b,g,d='<i>x</i>')=>`∫<sub>${a}</sub><sup>${b}</sup> ${g} d${d}`;
EXAMS['gred-substitution']=[
 {n:'Primitiver par substitution', r:'Primitiver par substitution : poser u, calculer du', qs:[
   {q:`Calcule ${I(0,1,`${x}(${x}² + 1)³`)} (valeur exacte, en décimal).`, lab:'I =', ans:15/8, tol:1e-3, why:`${u} = ${x}² + 1, d${u} = 2${x} d${x}, donc ${x} d${x} = d${u}/2. Primitive : (${x}² + 1)⁴/8. Entre 0 et 1 : (16 − 1)/8 = 15/8 = 1,875.`},
   {q:`Calcule ${I(0,'π/2',`sin ${x} cos² ${x}`)} (valeur exacte).`, lab:'I =', ans:1/3, tol:1e-3, show:'1/3', why:`${u} = cos ${x}, d${u} = −sin ${x} d${x}. Primitive : −cos³ ${x}/3. Entre 0 et π/2 : 0 − (−1/3) = 1/3.`},
   {q:`Calcule ${I(1,'e',`ln ${x}/${x}`)}.`, lab:'I =', ans:.5, tol:1e-4, why:`${u} = ln ${x}, d${u} = d${x}/${x} : la primitive est (ln ${x})²/2. Entre 1 et e : 1/2 − 0 = 0,5.`},
   {q:`Calcule ${I(0,'π/3',`tan ${x}`)}, arrondi au millième.`, lab:'I =', ans:Math.log(2), tol:.002, why:`∫ tan ${x} d${x} = −ln|cos ${x}| + C (poser ${u} = cos ${x}). Entre 0 et π/3 : −ln(1/2) + ln 1 = ln 2 ≈ 0,693.`},
   {q:`Une primitive de cos ${x}/sin ${x} sur ]0 ; π[ est…`, opts:[`−ln|sin ${x}|`,`ln|cos ${x}|`,`ln|sin ${x}|`,`1/sin² ${x}`], ans:2, why:`${u} = sin ${x}, d${u} = cos ${x} d${x} : ∫ d${u}/${u} = ln|${u}| = ln|sin ${x}| + C. Contrôle : (ln|sin ${x}|)′ = cos ${x}/sin ${x}.`},
   {q:`Un élève veut calculer ∫ cos(${x}²) d${x} en posant ${u} = ${x}². Que penses-tu de son idée ?`, opts:[`Elle donne sin(${x}²) + C`,`Elle donne sin(${x}²)/(2${x}) + C`,`Elle échoue : le facteur 2${x} = ${u}′ manque, et on ne peut sortir de l’intégrale qu’une constante`,`Elle donne 2${x} sin(${x}²) + C`], ans:2, why:`d${u} = 2${x} d${x}, mais aucun facteur ${x} n’est présent pour former d${u}. Diviser par 2${x} est interdit (ce n’est pas une constante). Cette intégrale n’a pas de primitive usuelle.`},
 ]},
 {n:'Reconnaître une forme', r:'Les formes à reconnaître', qs:[
   {q:`Une primitive de 2${x}/(${x}² + 3)² est…`, opts:[`ln((${x}² + 3)²)`,`−1/(${x}² + 3)`,`1/(${x}² + 3)`,`−2/(${x}² + 3)³`], ans:1, why:`Forme ${u}′/${u}² avec ${u} = ${x}² + 3, de primitive −1/${u}. Contrôle : (−1/(${x}² + 3))′ = 2${x}/(${x}² + 3)².`},
   {q:`Calcule ${I(0,1,`${x}/√(1 + ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.SQRT2-1, tol:.002, why:`${u} = 1 + ${x}², ${u}′ = 2${x} : l’intégrande vaut (1/2) ${u}′/√${u}, de primitive √${u}. [√(1 + ${x}²)]₀¹ = √2 − 1 ≈ 0,414.`},
   {q:`Calcule ${I(0,'π/2',`cos ${x} ${e(`sin ${x}`)}`)}, arrondi au millième.`, lab:'I =', ans:Math.E-1, tol:.002, why:`Forme ${u}′${e(u)} avec ${u} = sin ${x} : primitive ${e(`sin ${x}`)}. Entre 0 et π/2 : e − 1 ≈ 1,718.`},
   {q:`Calcule ${I(0,1,e(`2${x} + 1`))}, arrondi au millième.`, lab:'I =', ans:(Math.exp(3)-Math.E)/2, tol:.002, why:`${u} = 2${x} + 1, dérivée constante 2 : primitive ${e(`2${x} + 1`)}/2. Entre 0 et 1 : (e³ − e)/2 ≈ 8,684.`},
   {q:`Calcule ${I(0,1,`(2${x} + 1)/(${x}² + ${x} + 1)`)}, arrondi au millième.`, lab:'I =', ans:Math.log(3), tol:.002, why:`Le numérateur est la dérivée du dénominateur : forme ${u}′/${u}, primitive ln(${x}² + ${x} + 1). Entre 0 et 1 : ln 3 − ln 1 ≈ 1,099.`},
 ]},
 {n:'Changer les bornes', r:'Changement de variable dans une intégrale définie', qs:[
   {q:`Calcule ${I(0,'ln 3',`${e(x)}/(1 + ${e(x)})²`)} (valeur exacte, en décimal).`, lab:'I =', ans:.25, tol:1e-4, why:`${u} = ${e(x)}, d${u} = ${e(x)} d${x}, bornes 1 et 3 : ${I(1,3,`1/(1 + ${u})²`,u)} = [−1/(1 + ${u})]₁³ = −1/4 + 1/2 = 1/4.`},
   {q:`Calcule ${I(0,'√π',`${x} sin(${x}²)`)}.`, lab:'I =', ans:1, tol:1e-4, why:`${u} = ${x}², ${x} d${x} = d${u}/2, bornes 0 et π : (1/2)${I(0,'π',`sin ${u}`,u)} = (1/2)[−cos ${u}]₀<sup>π</sup> = (1/2) · 2 = 1.`},
   {q:`Dans ${I(0,2,`${x}² ${e(`1 + ${x}³`)}`)}, on pose ${u} = 1 + ${x}³. Quelles sont les nouvelles bornes ?`, opts:['de 0 à 2','de 1 à 3','de 1 à 9','de 0 à 8'], ans:2, why:`${u}(0) = 1 + 0 = 1 et ${u}(2) = 1 + 8 = 9. On remplace chaque borne en ${x} par la valeur correspondante de ${u}.`},
   {q:`Calcule ${I(0,1,`${x} ${e(`−${x}²`)}`)}, arrondi au millième.`, lab:'I =', ans:(1-Math.exp(-1))/2, tol:.002, why:`${u} = −${x}², d${u} = −2${x} d${x}, bornes 0 et −1 : −(1/2)${I(0,'−1',e(u),u)} = (1/2)(1 − ${e('−1')}) ≈ 0,316.`},
 ]},
 {n:'Poser x = a sin t', r:'Poser x = φ(t) : l’exemple du disque', qs:[
   {q:`Calcule ${I(0,3,`√(9 − ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:9*Math.PI/4, tol:.003, why:`${x} = 3 sin ${t}, d${x} = 3 cos ${t} d${t}, bornes 0 et π/2 : 9${I(0,'π/2',`cos² ${t}`,t)} = 9π/4 ≈ 7,069. C’est un quart du disque de rayon 3.`},
   {q:`Calcule ${I(-1,1,`√(1 − ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.PI/2, tol:.002, why:`${x} = sin ${t}, ${t} de −π/2 à π/2, où cos ${t} ≥ 0 : ${I('−π/2','π/2',`cos² ${t}`,t)} = [${t}/2 + sin 2${t}/4] = π/2 ≈ 1,571. C’est l’aire du demi-disque unité.`},
   {q:`Avec ${x} = 2 sin ${t} (${t} ∈ [−π/2 ; π/2]), que devient √(4 − ${x}²) d${x} ?`, opts:[`2 cos ${t} d${t}`,`4 cos² ${t} d${t}`,`2 cos² ${t} d${t}`,`4 sin ${t} cos ${t} d${t}`], ans:1, why:`√(4 − 4 sin² ${t}) = 2 cos ${t} (cos ${t} ≥ 0) et d${x} = 2 cos ${t} d${t}. Le produit vaut 4 cos² ${t} d${t}. Oublier le facteur venu de d${x} donnerait 2 cos ${t}.`},
   {q:`Calcule ${I(0,'1/2',`√(1 − ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.PI/12+Math.sqrt(3)/8, tol:.002, why:`${x} = sin ${t}, bornes 0 et π/6 : ${I(0,'π/6',`cos² ${t}`,t)} = [${t}/2 + sin 2${t}/4]₀<sup>π/6</sup> = π/12 + (√3/2)/4 = π/12 + √3/8 ≈ 0,478.`},
   {q:`Calcule ${I(0,'√2',`√(4 − ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.PI/2+1, tol:.002, why:`${x} = 2 sin ${t}, bornes 0 et π/4 (sin ${t} = √2/2) : 4${I(0,'π/4',`cos² ${t}`,t)} = 4[${t}/2 + sin 2${t}/4]₀<sup>π/4</sup> = 4(π/8 + 1/4) = π/2 + 1 ≈ 2,571.`},
 ]},
 {n:'Changements de variable classiques', r:'Les changements de variable classiques', qs:[
   {q:`Calcule ${I(0,9,`1/(1 + √${x})`)}, arrondi au millième.`, lab:'I =', ans:6-4*Math.log(2), tol:.002, why:`${u} = √${x}, d${x} = 2${u} d${u}, bornes 0 et 3 : ${I(0,3,`2${u}/(1 + ${u})`,u)} = [2${u} − 2 ln(1 + ${u})]₀³ = 6 − 2 ln 4 ≈ 3,227.`},
   {q:`Calcule ${I(1,4,`1/(${x} + √${x})`)}, arrondi au millième.`, lab:'I =', ans:2*Math.log(1.5), tol:.002, why:`${u} = √${x}, d${x} = 2${u} d${u}, bornes 1 et 2 : ${I(1,2,`2${u}/(${u}² + ${u})`,u)} = ${I(1,2,`2/(${u} + 1)`,u)} = 2 ln(3/2) ≈ 0,811.`},
   {q:`Calcule ${I(0,1,`1/(3 + ${x}²)`)} en posant ${x} = √3 tan ${t}. Arrondis au millième.`, lab:'I =', ans:Math.PI/(6*Math.sqrt(3)), tol:.002, why:`d${x} = √3(1 + tan² ${t}) d${t} et 3 + ${x}² = 3(1 + tan² ${t}) : l’intégrande devient 1/√3. tan ${t} = 1/√3 donne ${t} = π/6, donc I = π/(6√3) ≈ 0,302.`},
   {q:`Quel changement de variable simplifie ${I(0,1,`1/(1 + ${x}²)²`)} ?`, opts:[`${x} = sin ${t}`,`${u} = √${x}`,`${u} = 1 + ${x}²`,`${x} = tan ${t}`], ans:3, why:`Avec ${x} = tan ${t}, 1 + ${x}² = 1/cos² ${t} et d${x} = d${t}/cos² ${t} : l’intégrande devient cos² ${t}, qu’on linéarise. ${u} = 1 + ${x}² échoue : il n’y a pas de facteur ${x}.`},
   {q:`Calcule ${I(0,4,e(`√${x}`))}, arrondi au millième.`, lab:'I =', ans:2*(Math.exp(2)+1), tol:.003, why:`${u} = √${x}, d${x} = 2${u} d${u}, bornes 0 et 2 : ${I(0,2,`2${u}${e(u)}`,u)}. Par parties, ∫ ${u}${e(u)} = (${u} − 1)${e(u)}, donc I = 2[(${u} − 1)${e(u)}]₀² = 2(e² + 1) ≈ 16,778.`},
 ]},
 {n:'Les pièges du changement de variable', r:'Les pièges du changement de variable', qs:[
   {q:`Calcule correctement ${I(1,3,`2${x}/(1 + ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.log(5), tol:.002, why:`${u} = 1 + ${x}², bornes ${u}(1) = 2 et ${u}(3) = 10 : ${I(2,10,`1/${u}`,u)} = ln 10 − ln 2 = ln 5 ≈ 1,609. Garder les bornes 1 et 3 donnerait ln 3, faux.`},
   {q:`Calcule ${I(0,2,`${x} ${e(`${x}²`)}`)}, arrondi au centième.`, lab:'I =', ans:(Math.exp(4)-1)/2, tol:.01, why:`${u} = ${x}², ${x} d${x} = d${u}/2, bornes 0 et 4 : (1/2)${I(0,4,e(u),u)} = (e⁴ − 1)/2 ≈ 26,80.`},
   {q:`Un élève calcule ${I(0,1,`3${x}² ${e(`${x}³`)}`)} en posant ${u} = ${x}³ et écrit ${I(0,1,e(u),u)} = e − 1. Que vaut le résultat ?`, opts:['Il est faux : il fallait changer les bornes','Il est faux : il manque un facteur 1/3','Il est juste : 0³ = 0 et 1³ = 1, les bornes ne changent pas','Il est faux : la bonne valeur est e³ − 1'], ans:2, why:`d${u} = 3${x}² d${x} est bien présent, et les bornes ont été transportées : ${u}(0) = 0, ${u}(1) = 1. Ici elles coïncident avec les anciennes. Le résultat e − 1 est juste.`},
   {q:`Quand on pose ${x} = sin ${t} pour calculer ${I(0,1,`√(1 − ${x}²)`)}, pourquoi prend-on ${t} ∈ [0 ; π/2] ?`, opts:[`Parce que sin y est bijective et cos ${t} ≥ 0, ce qui donne √(1 − sin² ${t}) = cos ${t}`,'Parce que la formule du changement de variable n’accepte que des bornes positives',`Parce que sin ${t} &gt; 0 seulement sur cet intervalle`,'Par convention, sans conséquence sur le résultat'], ans:0, why:`Il faut que ${x} = sin ${t} parcoure [0 ; 1] une seule fois, de façon monotone. Sur [0 ; π/2], cos ${t} ≥ 0 et la racine se simplifie sans valeur absolue. Avec ${t} de 0 à π, sin reviendrait à 0 et √(cos² ${t}) = |cos ${t}| changerait de signe.`},
 ]},
];
})();
