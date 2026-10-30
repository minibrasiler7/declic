/* Déclic — examen de compétence : Recherche de primitives */
(()=>{
const x='<i>x</i>', dx='d<i>x</i>';
const I=(a,b)=>`∫<sub>${a}</sub><sup>${b}</sup>`;
EXAMS['an1-primitives']=[
 {n:'Primitives et constante', r:'Une famille de primitives', qs:[
   {q:`F est une primitive de 3${x}² et F(2) = 5. Que vaut la constante <i>C</i> dans F(${x}) = ${x}³ + <i>C</i> ?`, lab:'<i>C</i> =', ans:-3, why:'F(2) = 8 + C = 5, donc C = −3.'},
   {q:`F est la primitive de 2${x} + 1 qui s’annule en 1. Que vaut F(3) ?`, lab:'F(3) =', ans:10, why:'F(x) = x² + x + C et F(1) = 2 + C = 0 donne C = −2. F(3) = 9 + 3 − 2 = 10.'},
   {q:`Laquelle de ces fonctions est une primitive de cos ${x} ?`, opts:['sin x + 7','−sin x','cos x + 1','−sin x + 7'], ans:0, why:'(sin x + 7)′ = cos x. Deux primitives diffèrent d’une constante : sin x + 7 convient. (−sin x)′ = −cos x ne convient pas.'},
 ]},
 {n:'Intégrer terme à terme', r:'Linéarité : intégrer terme à terme', qs:[
   {q:`Calcule ${I(1,2)} (6${x}² − ${F('2',x+'²')}) ${dx}.`, lab:'intégrale =', ans:13, why:'2/x² = 2x⁻² a pour primitive −2/x. Primitive : 2x³ + 2/x. (16 + 1) − (2 + 2) = 13.'},
   {q:`Une primitive de 5${x}⁴ + ${F('3',x)} − sin ${x} (pour ${x} &gt; 0) est…`, opts:['x⁵ + 3 ln x − cos x','20x³ − 3/x² − cos x','x⁵ + 3 ln x + cos x','x⁵ − 3/x² + cos x'], ans:2, why:'Terme à terme : x⁵, puis 3 ln x, puis cos x (car (cos x)′ = −sin x). Contrôle : 5x⁴ + 3/x − sin x.'},
   {q:`Calcule ${I(1,4)} (3√${x} − ${F('1',x)}) ${dx}, arrondi au centième.`, lab:'intégrale ≈', ans:14-Math.log(4), tol:0.006, show:'14 − ln 4 ≈ 12,61', why:'3x<sup>1/2</sup> a pour primitive 3 · x<sup>3/2</sup>/(3/2) = 2x<sup>3/2</sup>. Primitive : 2x<sup>3/2</sup> − ln x. (16 − ln 4) − (2 − 0) = 14 − ln 4 ≈ 12,61.'},
   {q:`Calcule ${I(0,'π/2')} (2 cos ${x} + 1) ${dx}, arrondi au centième.`, lab:'intégrale ≈', ans:2+Math.PI/2, tol:0.006, show:'2 + π/2 ≈ 3,57', why:'Primitive : 2 sin x + x. (2 · 1 + π/2) − (0 + 0) = 2 + π/2 ≈ 3,57.'},
   {q:`Un élève écrit : « ∫ 2${x} cos ${x} ${dx} = ${x}² sin ${x} + C ». Qu’en penses-tu ?`, opts:['C’est correct','C’est faux : il n’y a pas de règle simple pour un produit, et (x² sin x)′ = 2x sin x + x² cos x','C’est faux : il manque seulement un signe moins','C’est faux : la réponse est 2 sin x + C'], ans:1, why:'On ne peut pas intégrer chaque facteur séparément. En redérivant sa réponse, on ne retrouve pas 2x cos x. Ce produit demande une intégration par parties.'},
 ]},
 {n:'Composée avec ax + b', r:'Composée avec ax + b', qs:[
   {q:`Calcule ${I(0,1)} e<sup>3<i>x</i></sup> ${dx}, arrondi au centième.`, lab:'intégrale ≈', ans:(Math.exp(3)-1)/3, tol:0.006, show:'(e³ − 1)/3 ≈ 6,36', why:'Primitive : e³ˣ/3. (e³ − 1)/3 ≈ 19,086/3 ≈ 6,36.'},
   {q:`Calcule ${I(0,'π/6')} cos(3${x}) ${dx} (fraction acceptée).`, lab:'intégrale =', ans:1/3, show:'1/3', why:'Primitive : sin(3x)/3. sin(π/2)/3 − 0 = 1/3.'},
   {q:`Une primitive de ${F('1','2'+x+' + 1')} (pour ${x} &gt; −1/2) est…`, opts:['ln(2x + 1)','2 ln(2x + 1)','ln(2x + 1)/2','−2/(2x + 1)²'], ans:2, why:'1/u a pour primitive ln u, appliquée à 2x + 1 avec a = 2 : on divise par 2. Contrôle : (ln(2x + 1)/2)′ = 2/(2(2x + 1)).'},
   {q:`Calcule ${I(1,2)} (2${x} − 1)³ ${dx}.`, lab:'intégrale =', ans:10, why:'Primitive : (2x − 1)⁴/4 divisé par a = 2, soit (2x − 1)⁴/8. (81 − 1)/8 = 10.'},
 ]},
 {n:'La substitution', r:'Faire une substitution', qs:[
   {q:`Calcule ${I(0,1)} ${x}(${x}² + 1)³ ${dx}.`, lab:'intégrale =', ans:1.875, show:'15/8', why:'u = x² + 1, du = 2x dx, bornes 1 et 2 : (1/2)∫₁² u³ du = (1/2)(16 − 1)/4 = 15/8.'},
   {q:`Calcule ${I(0,2)} ${x} e<sup>−<i>x</i>²</sup> ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:(1-Math.exp(-4))/2, tol:0.0006, show:'(1 − e⁻⁴)/2 ≈ 0,491', why:'u = −x², du = −2x dx, bornes 0 et −4 : −(1/2)∫₀⁻⁴ eᵘ du = (1/2)(1 − e⁻⁴) ≈ 0,491.'},
   {q:`Calcule ${I(1,'e')} ${F('ln '+x,x)} ${dx}.`, lab:'intégrale =', ans:0.5, show:'1/2', why:'u = ln x, du = dx/x, bornes ln 1 = 0 et ln e = 1 : ∫₀¹ u du = 1/2.'},
   {q:`Pour ${I(1,3)} 2${x}√(${x}² − 1) ${dx}, on pose <i>u</i> = ${x}² − 1. Quelles sont les nouvelles bornes ?`, opts:['u de 1 à 3','u de 0 à 8','u de 0 à 2','u de 1 à 9'], ans:1, why:'x = 1 donne u = 0, x = 3 donne u = 9 − 1 = 8. L’intégrale devient ∫₀⁸ √u du.'},
 ]},
 {n:'Les formes u′/u et u′uⁿ', r:'Reconnaître u′/u et u′uⁿ', qs:[
   {q:`Calcule ${I(0,1)} ${F('2'+x+' + 1',x+'² + '+x+' + 1')} ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:Math.log(3), tol:0.0006, show:'ln 3 ≈ 1,099', why:'Le numérateur est la dérivée du dénominateur : forme u′/u. Primitive ln(x² + x + 1). ln 3 − ln 1 = ln 3 ≈ 1,099.'},
   {q:`Calcule ${I(0,1)} ${F('3'+x+'²',x+'³ + 1')} ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:Math.log(2), tol:0.0006, show:'ln 2 ≈ 0,693', why:'(x³ + 1)′ = 3x² : forme u′/u. Primitive ln(x³ + 1). ln 2 − ln 1 ≈ 0,693.'},
   {q:`Calcule ${I(0,'π/2')} sin ${x} cos² ${x} ${dx} (fraction acceptée).`, lab:'intégrale =', ans:1/3, show:'1/3', why:'Avec u = cos x, u′ = −sin x : sin x cos² x = −u′u². Primitive −cos³ x/3. [−cos³ x/3] de 0 à π/2 : 0 − (−1/3) = 1/3.'},
   {q:`Une primitive de ${F(x,x+'² + 4')} est…`, opts:['ln(x² + 4)','(1/2) ln(x² + 4)','2 ln(x² + 4)','x²/(2(x² + 4))'], ans:1, why:'x/(x² + 4) = (1/2) · 2x/(x² + 4), de la forme u′/u à la constante 1/2 près. Primitive : (1/2) ln(x² + 4).'},
 ]},
 {n:'Intégration par parties', r:'Intégrer par parties', qs:[
   {q:`Calcule ${I(0,1)} ${x} e<sup>2<i>x</i></sup> ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:(Math.exp(2)+1)/4, tol:0.0006, show:'(e² + 1)/4 ≈ 2,097', why:'u = x, v′ = e²ˣ, v = e²ˣ/2 : ∫ x e²ˣ dx = x e²ˣ/2 − e²ˣ/4. De 0 à 1 : e²/2 − e²/4 + 1/4 = (e² + 1)/4 ≈ 2,097.'},
   {q:`Calcule ${I(1,2)} ${x} ln ${x} ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:2*Math.log(2)-0.75, tol:0.0006, show:'2 ln 2 − 3/4 ≈ 0,636', why:'u = ln x, v′ = x, v = x²/2 : ∫ x ln x dx = (x²/2) ln x − ∫ x/2 dx = (x²/2) ln x − x²/4. De 1 à 2 : 2 ln 2 − 1 + 1/4 ≈ 0,636.'},
   {q:`Pour intégrer ${x}² ln ${x} par parties, quel choix faut-il faire ?`, opts:['u = ln x et v′ = x²','u = x² et v′ = ln x','u = x² ln x et v′ = 1','Aucun : il faut une substitution'], ans:0, why:'ln x se simplifie en dérivant (1/x) et x² s’intègre facilement : ∫ x² ln x dx = (x³/3) ln x − ∫ x²/3 dx. L’ordre de choix pour u commence par ln.'},
   {q:`Calcule ${I(0,'π/2')} ${x} sin ${x} ${dx}.`, lab:'intégrale =', ans:1, why:'u = x, v′ = sin x, v = −cos x : ∫ x sin x dx = −x cos x + sin x. De 0 à π/2 : (0 + 1) − (0 + 0) = 1.'},
 ]},
 {n:'Plusieurs intégrations par parties', r:'Plusieurs intégrations par parties', qs:[
   {q:`Calcule ${I(0,1)} ${x}² e<sup>−<i>x</i></sup> ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:2-5/Math.E, tol:0.0006, show:'2 − 5/e ≈ 0,161', why:'Deux parties en dérivant x² : ∫ x² e⁻ˣ dx = −(x² + 2x + 2)e⁻ˣ. De 0 à 1 : −5e⁻¹ + 2 ≈ 0,161.'},
   {q:`Quelle est une primitive de ${x}² cos ${x} ?`, opts:['x² sin x + 2x cos x − 2 sin x','x² sin x − 2x cos x + 2 sin x','(x³/3) sin x','x² sin x + 2x cos x + 2 sin x'], ans:0, why:'∫ x² cos x = x² sin x − ∫ 2x sin x, puis ∫ 2x sin x = −2x cos x + 2 sin x. Donc x² sin x + 2x cos x − 2 sin x. Contrôle en dérivant : x² cos x.'},
   {q:`Calcule ${I(0,'π')} e<sup><i>x</i></sup> sin ${x} ${dx}, arrondi au centième.`, lab:'intégrale ≈', ans:(Math.exp(Math.PI)+1)/2, tol:0.006, show:'(e<sup>π</sup> + 1)/2 ≈ 12,07', why:'Deux parties font réapparaître l’intégrale : ∫ eˣ sin x dx = eˣ(sin x − cos x)/2. De 0 à π : (e<sup>π</sup> · 1 − (−1))/2 = (e<sup>π</sup> + 1)/2 ≈ 12,07.'},
 ]},
 {n:'Fractions simples', r:'Décomposer en fractions simples', qs:[
   {q:`On écrit ${F('1',x+'² − 4')} = ${F('A',x+' − 2')} + ${F('B',x+' + 2')}. Que vaut A ?`, lab:'A =', ans:0.25, show:'1/4', why:'1 = A(x + 2) + B(x − 2). Avec x = 2 : 1 = 4A, donc A = 1/4 (et x = −2 donne B = −1/4).'},
   {q:`On écrit ${F('3'+x+' + 1','('+x+' − 1)('+x+' + 1)')} = ${F('A',x+' − 1')} + ${F('B',x+' + 1')}. Que vaut B ?`, lab:'B =', ans:1, why:'3x + 1 = A(x + 1) + B(x − 1). Avec x = −1 : −2 = −2B, donc B = 1 (et x = 1 donne A = 2).'},
   {q:`Calcule ${I(2,3)} ${F('2',x+'² − 1')} ${dx}, arrondi au millième.`, lab:'intégrale ≈', ans:Math.log(1.5), tol:0.0006, show:'ln(3/2) ≈ 0,405', why:'2/(x² − 1) = 1/(x − 1) − 1/(x + 1). Primitive ln|x − 1| − ln|x + 1|. De 2 à 3 : (ln 2 − ln 4) − (0 − ln 3) = ln 3 − ln 2 ≈ 0,405.'},
 ]},
];
})();
