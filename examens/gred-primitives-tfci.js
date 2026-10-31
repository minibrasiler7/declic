/* Déclic — examen de compétence : Primitives et théorème fondamental */
(()=>{
const x='<i>x</i>', dx='d<i>x</i>', dt='d<i>t</i>';
const I=(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`;
EXAMS['gred-primitives-tfci']=[
 {n:'Primitives et constante', r:'Deux primitives diffèrent d’une constante', qs:[
   {q:`<i>F</i> est la primitive de 3${x}² telle que F(2) = 10. Que vaut F(1) ?`, lab:'F(1) =', ans:3, why:'F(x) = x³ + C et F(2) = 8 + C = 10, donc C = 2. F(1) = 1 + 2 = 3.'},
   {q:`<i>F</i> est la primitive de 4${x}³ − 1 telle que F(0) = 2. Que vaut F(1) ?`, lab:'F(1) =', ans:2, why:'F(x) = x⁴ − x + C avec C = F(0) = 2. F(1) = 1 − 1 + 2 = 2.'},
   {q:`Laquelle de ces fonctions est une primitive de ${F('1',x+'²')} sur ]0 ; +∞[ ?`, opts:['1/<i>x</i> + 2','−2/<i>x</i>³','−1/<i>x</i> + 2','−1/<i>x</i>² + 1'], ans:2, why:'(−1/x + 2)′ = 1/x². La constante 2 ne gêne pas : deux primitives diffèrent d’une constante. (1/x)′ = −1/x² a le mauvais signe.'},
   {q:`G(${x}) = ${x}² + 3 et H(${x}) = ${x}² − 5 sont-elles toutes deux des primitives de 2${x} sur ℝ ?`, opts:['Non : une fonction n’a qu’une primitive','Oui : elles diffèrent d’une constante, et toute primitive de 2<i>x</i> est de la forme <i>x</i>² + <i>C</i>','Non : seule <i>x</i>² est une primitive de 2<i>x</i>','Oui, mais seulement sur un intervalle borné'], ans:1, why:'G′ = H′ = 2x. Sur l’intervalle ℝ, les primitives de 2x sont exactement les x² + C.'},
 ]},
 {n:'Primitives usuelles terme à terme', r:'Trouver une primitive terme à terme', qs:[
   {q:`<i>F</i> est la primitive de ${x}³ − 6${x} + 2 qui s’annule en 0. Que vaut F(2) ?`, lab:'F(2) =', ans:-4, why:'F(x) = x⁴/4 − 3x² + 2x (C = 0). F(2) = 4 − 12 + 4 = −4.'},
   {q:`Quelle est une primitive de ${F('3','√'+x)} sur ]0 ; +∞[ ?`, opts:['6√<i>x</i>','3√<i>x</i>/2','−3/(2<i>x</i>√<i>x</i>)','3 ln <i>x</i>'], ans:0, why:'3x^(−1/2) a pour primitive 3 · x^(1/2)/(1/2) = 6√x. Contrôle : (6√x)′ = 6/(2√x) = 3/√x.'},
   {q:`Quelle est une primitive de ${F('1',x+'³')} ?`, opts:['−3/<i>x</i>⁴','1/(2<i>x</i>²)','−1/(2<i>x</i>²)','<i>x</i>⁻²'], ans:2, why:'x⁻³ → x⁻²/(−2) = −1/(2x²). Contrôle : (−x⁻²/2)′ = x⁻³.'},
   {q:`<i>F</i> est la primitive de 2${x} + ${F('1',x+'²')} sur ]0 ; +∞[ telle que F(1) = 0. Que vaut F(2) ?`, lab:'F(2) =', ans:3.5, tol:1e-9, why:'F(x) = x² − 1/x + C ; F(1) = 1 − 1 + C = 0 donne C = 0. F(2) = 4 − 1/2 = 3,5.'},
   {q:`Un élève écrit : « une primitive de ${x} · ${x}² est ${F(x+'²','2')} · ${F(x+'³','3')} ». Qu’en penses-tu ?`, opts:['C’est juste','C’est faux : il n’y a pas de règle produit ; x · x² = x³ a pour primitive x⁴/4','C’est faux : il manque la constante','C’est juste si on ajoute le facteur 1/6'], ans:1, why:'On ne peut pas primitiver facteur par facteur. Contrôle : (x⁵/6)′ = 5x⁴/6 ≠ x³. La bonne primitive est x⁴/4.'},
 ]},
 {n:'Fonction aire et théorème fondamental', r:'Le théorème fondamental : Φ′ = f', qs:[
   {q:`Φ(${x}) = ${I('2',x)} (<i>t</i>² + 1) ${dt}. Que vaut Φ′(3) ?`, lab:'Φ′(3) =', ans:10, why:'Φ′(x) = x² + 1 (théorème fondamental), donc Φ′(3) = 10. Pas besoin de calculer l’intégrale.'},
   {q:`Φ(${x}) = ${I('1',x)} ${F('d<i>t</i>','1 + <i>t</i>²')}. Que vaut Φ′(1) ?`, lab:'Φ′(1) =', ans:.5, tol:1e-9, why:'Φ′(x) = 1/(1 + x²), donc Φ′(1) = 1/2.'},
   {q:`Soit Φ(${x}) = ${I('0',x)} f(<i>t</i>) ${dt} avec <i>f</i> continue. Laquelle de ces affirmations est fausse ?`, opts:['Φ(0) = 0','Φ′ = f','Φ est la seule primitive de f','Φ est dérivable'], ans:2, why:'Φ est une primitive de f, celle qui s’annule en 0 ; toutes les autres sont Φ + C.'},
   {q:'Pourquoi peut-on affirmer que 1/<i>t</i> possède des primitives sur ]0 ; +∞[, alors qu’aucune formule connue n’en donne ?', opts:['Parce que toute fonction a des primitives','Parce que 1/<i>t</i> est continue sur cet intervalle : <i>x</i> ↦ ∫₁ˣ d<i>t</i>/<i>t</i> en est une (théorème fondamental)','Parce que sa primitive est −1/<i>t</i>²','On ne peut pas l’affirmer'], ans:1, why:'Le théorème fondamental fournit une primitive de toute fonction continue sur un intervalle, sous forme d’intégrale à borne variable.'},
   {q:`Φ(${x}) = ${I('0',x)} (<i>t</i>² − 4) ${dt}. Pour quelle valeur de ${x} &gt; 0 Φ est-elle minimale ?`, lab:'x =', ans:2, why:'Φ′(x) = x² − 4 est négative sur ]0 ; 2[ et positive après : Φ décroît puis croît, minimum en 2.'},
 ]},
 {n:'Calcul d’intégrales', r:'Calculer une intégrale définie', qs:[
   {q:`Calcule ${I('0','2')} (3${x}² + 2${x}) ${dx}.`, lab:'intégrale =', ans:12, why:'Primitive x³ + x². (8 + 4) − 0 = 12.'},
   {q:`Calcule ${I('1','4')} ${F('d<i>x</i>','√'+x)}.`, lab:'intégrale =', ans:2, why:'Primitive 2√x. 2√4 − 2√1 = 4 − 2 = 2.'},
   {q:`Calcule ${I('1','2')} (${x}² − ${F('1',x+'²')}) ${dx}. Donne une fraction ou un arrondi au millième.`, lab:'intégrale =', ans:11/6, tol:6e-4, show:'11/6 ≈ 1,833', why:'Primitive x³/3 + 1/x. (8/3 + 1/2) − (1/3 + 1) = 7/3 − 1/2 = 11/6.'},
   {q:`Calcule ${I('2','0')} 2${x} ${dx}.`, lab:'intégrale =', ans:-4, why:'[x²]₂⁰ = 0 − 4 = −4. Les bornes sont dans l’ordre décroissant : l’intégrale est l’opposée de ∫₀² 2x dx = 4.'},
   {q:`Calcule ${I('0','1')} (${x} + 1)² ${dx}. Donne une fraction ou un arrondi au millième.`, lab:'intégrale =', ans:7/3, tol:6e-4, show:'7/3 ≈ 2,333', why:'(x + 1)² = x² + 2x + 1, primitive x³/3 + x² + x : 1/3 + 1 + 1 = 7/3. Ou directement [(x + 1)³/3]₀¹ = 8/3 − 1/3.'},
 ]},
 {n:'Aires', r:'Calculer une aire', qs:[
   {q:`Calcule l’aire de la région comprise entre la parabole <i>y</i> = ${x}² et la droite <i>y</i> = 1. Donne une fraction ou un arrondi au millième.`, lab:'aire =', ans:4/3, tol:6e-4, show:'4/3 ≈ 1,333', why:'Intersections en ±1, droite au-dessus : ∫₋₁¹ (1 − x²) dx = [x − x³/3]₋₁¹ = 2 − 2/3 = 4/3.'},
   {q:`Calcule l’aire entre la courbe de f(${x}) = ${x}² − 3${x} et l’axe O${x} pour ${x} ∈ [0 ; 3].`, lab:'aire =', ans:4.5, tol:1e-6, why:'f ≤ 0 sur [0 ; 3] : ∫₀³ (x² − 3x) dx = 9 − 27/2 = −9/2. L’aire est la valeur absolue : 9/2 = 4,5.'},
   {q:`Calcule l’aire entre la courbe de f(${x}) = ${x}³ et l’axe O${x} pour ${x} ∈ [−1 ; 2].`, lab:'aire =', ans:4.25, tol:1e-6, why:'On coupe en 0 : ∫₋₁⁰ x³ dx = −1/4 et ∫₀² x³ dx = 4. Aire = 1/4 + 4 = 4,25 (alors que ∫₋₁² x³ dx = 3,75).'},
   {q:`${I('−2','2')} ${x}³ ${dx} = 0. Que signifie ce résultat ?`, opts:['La courbe est confondue avec l’axe sur [−2 ; 2]','L’aire entre la courbe et l’axe est nulle','Les aires au-dessus et en dessous de l’axe sont égales et se compensent (fonction impaire)','Le calcul est faux'], ans:2, why:'x³ est impaire : l’aire sous l’axe sur [−2 ; 0] égale celle au-dessus sur [0 ; 2]. L’aire géométrique vaut 2 · 4 = 8.'},
   {q:`Calcule l’aire de la région comprise entre les courbes <i>y</i> = ${x} et <i>y</i> = ${x}² pour ${x} ∈ [0 ; 1]. Donne une fraction ou un arrondi au millième.`, lab:'aire =', ans:1/6, tol:6e-4, show:'1/6 ≈ 0,167', why:'Sur [0 ; 1], x ≥ x² : ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6.'},
 ]},
 {n:'Les pièges', r:'Les pièges', qs:[
   {q:`Que penser du calcul « ${I('−1','1')} ${F('d<i>x</i>',x)} = [ln |${x}|]<sub>−1</sub><sup>1</sup> = 0 » ?`, opts:['Il est juste','Il est faux : 1/<i>x</i> n’est pas continue sur [−1 ; 1], le théorème ne s’applique pas','Il est faux : il manque une constante','Il est juste car la fonction est impaire'], ans:1, why:'1/x n’est pas définie en 0. Le théorème fondamental exige la continuité sur tout l’intervalle ; l’aire de chaque côté est infinie.'},
   {q:`Calcule ${I('3','1')} 2${x} ${dx}.`, lab:'intégrale =', ans:-8, why:'[x²]₃¹ = 1 − 9 = −8 : borne du haut moins borne du bas, même si le haut est le plus petit.'},
   {q:`<i>F</i> est la primitive de 2${x} telle que F(1) = 2. Que vaut F(3) ?`, lab:'F(3) =', ans:10, why:'F(x) = x² + C et F(1) = 1 + C = 2 : C = 1. F(3) = 9 + 1 = 10. Oublier la constante donnerait 9.'},
 ]},
 {n:'Dériver une intégrale à borne variable', r:'Dériver une fonction définie par une intégrale', qs:[
   {q:`G(${x}) = ${I('0','2'+x)} √(1 + <i>t</i>²) ${dt}. Que vaut G′(${x}) ?`, opts:['√(1 + 4<i>x</i>²)','2√(1 + 4<i>x</i>²)','2√(1 + <i>x</i>²)','√(1 + 4<i>x</i>²) − 1'], ans:1, why:'G = Φ ∘ u avec Φ′(y) = √(1 + y²) et u(x) = 2x : G′(x) = √(1 + 4x²) · 2.'},
   {q:`G(${x}) = ${I('1',x+'²')} ${F('d<i>t</i>','<i>t</i>')} pour ${x} &gt; 0. Que vaut G′(4) ?`, lab:'G′(4) =', ans:.5, tol:1e-9, why:'G′(x) = (1/x²) · 2x = 2/x. En 4 : 2/4 = 0,5.'},
   {q:`H(${x}) = ${I(x,'3')} <i>t</i>² ${dt}. Que vaut H′(2) ?`, lab:'H′(2) =', ans:-4, why:'H(x) = −∫₃ˣ t² dt, donc H′(x) = −x². H′(2) = −4.'},
 ]},
];
})();
