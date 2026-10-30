/* Déclic — examen de compétence : Limites de fonctions */
(()=>{
const x='<i>x</i>';
const L=a=>`lim<sub>x→${a}</sub>`;
EXAMS['an1-limfonctions']=[
 {n:'Limites à gauche et à droite', r:'À gauche, à droite', qs:[
   {q:`Calcule ${L('3⁻')} ${F(x+'² − 9','|'+x+' − 3|')}.`, lab:'limite =', ans:-6, why:'Pour x &lt; 3, |x − 3| = −(x − 3). Le quotient vaut (x − 3)(x + 3)/(−(x − 3)) = −(x + 3), qui tend vers −6.'},
   {q:`Calcule ${L('0⁻')} ${F(x+' + |'+x+'|',x)}.`, lab:'limite =', ans:0, why:'Pour x &lt; 0, |x| = −x, donc x + |x| = 0 et le quotient vaut 0 : la limite à gauche est 0 (à droite, elle vaudrait 2x/x = 2).'},
   {q:`La fonction f(${x}) = ${F('|'+x+' + 1|',x+' + 1')} a-t-elle une limite en −1 ?`, opts:['Oui, elle vaut 1','Oui, elle vaut 0','Non : elle vaut −1 à gauche et 1 à droite','Non, car f n’est pas définie en −1'], ans:2, why:'À droite de −1, |x + 1| = x + 1 et f vaut 1 ; à gauche, f vaut −1. Les limites à gauche et à droite diffèrent : pas de limite. Une fonction peut avoir une limite en un point où elle n’est pas définie.'},
 ]},
 {n:'Forme 0/0 : factoriser par (x − a)', r:'Forme 0/0 en un point : factoriser par (x − a)', qs:[
   {q:`Calcule ${L('−1')} ${F(x+'² + 3'+x+' + 2',x+' + 1')}.`, lab:'limite =', ans:1, why:'x² + 3x + 2 = (x + 1)(x + 2). Pour x ≠ −1, le quotient vaut x + 2, qui tend vers 1.'},
   {q:`Calcule ${L('2')} ${F(x+'² − 5'+x+' + 6',x+'² − 4')}.`, lab:'limite =', ans:-0.25, show:'−1/4', why:'Forme 0/0. x² − 5x + 6 = (x − 2)(x − 3) et x² − 4 = (x − 2)(x + 2). On simplifie : (x − 3)/(x + 2) → −1/4.'},
   {q:`Calcule ${L('3')} ${F('2'+x+'² − 5'+x+' − 3',x+'² − 2'+x+' − 3')}.`, lab:'limite =', ans:1.75, show:'7/4', why:'3 est racine des deux. 2x² − 5x − 3 = (x − 3)(2x + 1) (produit des racines −3/2) et x² − 2x − 3 = (x − 3)(x + 1). Limite : (2 · 3 + 1)/(3 + 1) = 7/4.'},
   {q:`Calcule ${L('0')} ${F(x+'³ − 2'+x,x+'² + 5'+x)}.`, lab:'limite =', ans:-0.4, show:'−2/5', why:'On factorise x en haut et en bas : x(x² − 2)/(x(x + 5)) = (x² − 2)/(x + 5) → −2/5.'},
 ]},
 {n:'Forme 0/0 avec une racine', r:'0/0 avec une racine : le conjugué', qs:[
   {q:`Calcule ${L('9')} ${F('√'+x+' − 3',x+' − 9')}.`, lab:'limite =', ans:1/6, show:'1/6', why:'(√x − 3)(√x + 3) = x − 9. Pour x ≠ 9, le quotient vaut 1/(√x + 3), qui tend vers 1/6.'},
   {q:`Calcule ${L('0')} ${F('√(4 + '+x+') − 2',x)}.`, lab:'limite =', ans:0.25, show:'1/4', why:'Avec le conjugué : (4 + x − 4)/(x(√(4 + x) + 2)) = 1/(√(4 + x) + 2) → 1/4.'},
   {q:`Calcule ${L('0')} ${F(x,'√(1 + 3'+x+') − 1')}.`, lab:'limite =', ans:2/3, show:'2/3', why:'Le conjugué est au dénominateur : on multiplie par √(1 + 3x) + 1. On obtient x(√(1 + 3x) + 1)/(3x) = (√(1 + 3x) + 1)/3 → 2/3.'},
   {q:`Calcule ${L('1')} ${F('√('+x+' + 3) − 2',x+'² − 1')}.`, lab:'limite =', ans:0.125, show:'1/8', why:'Conjugué en haut : (x + 3 − 4)/((x − 1)(x + 1)(√(x + 3) + 2)) = 1/((x + 1)(√(x + 3) + 2)) → 1/(2 · 4) = 1/8.'},
 ]},
 {n:'Forme « nombre / 0 »', r:'Forme « nombre / 0 » : regarder le signe', qs:[
   {q:`Que vaut ${L('2⁺')} ${F(x+' − 5',x+' − 2')} ?`, opts:['+∞','−∞','5/2','0'], ans:1, why:'Le numérateur tend vers −3. Pour x &gt; 2, x − 2 → 0⁺. −3/0⁺ donne −∞.'},
   {q:`Que vaut ${L('−3⁻')} ${F('2'+x+' + 1',x+' + 3')} ?`, opts:['−∞','0','+∞','−5/3'], ans:2, why:'Le numérateur tend vers −5. Pour x &lt; −3, x + 3 &lt; 0 tend vers 0⁻. −5/0⁻ donne +∞.'},
   {q:`Que vaut ${L('1')} ${F('1','('+x+' − 1)²')} ?`, opts:['+∞','−∞','Elle n’existe pas : +∞ à droite et −∞ à gauche','0'], ans:0, why:'(x − 1)² &gt; 0 des deux côtés et tend vers 0⁺ : 1/0⁺ donne +∞, à gauche comme à droite.'},
   {q:`Que vaut ${L('0⁻')} ${F(x+' + 4',x+'² − '+x)} ?`, opts:['−∞','+∞','−4','0'], ans:1, why:'x² − x = x(x − 1). Pour x &lt; 0 proche de 0, x &lt; 0 et x − 1 &lt; 0 : le produit est positif, il tend vers 0⁺. 4/0⁺ donne +∞.'},
 ]},
 {n:'Limites à l’infini', r:'Limites à l’infini', qs:[
   {q:`Calcule ${L('+∞')} ${F('3'+x+'² − '+x,'6'+x+'² + 5')}.`, lab:'limite =', ans:0.5, show:'1/2', why:'Seuls les termes de plus haut degré comptent : 3x²/(6x²) = 1/2.'},
   {q:`Que vaut ${L('−∞')} ${F('2'+x+'³ + 1',x+'² − 4')} ?`, opts:['+∞','−∞','2','0'], ans:1, why:'Termes dominants : 2x³/x² = 2x, qui tend vers −∞ quand x → −∞.'},
   {q:`La courbe de f(${x}) = ${F('5 − 4'+x,'2'+x+' + 1')} a une asymptote horizontale <i>y</i> = <i>L</i>. Que vaut <i>L</i> ?`, lab:'<i>L</i> =', ans:-2, why:'En ±∞, f(x) se comporte comme −4x/(2x) = −2 : la droite y = −2 est asymptote horizontale.'},
 ]},
 {n:'Croissances comparées', r:'Croissances comparées', qs:[
   {q:`Calcule ${L('+∞')} ${F(x+'⁵','e<sup><i>x</i></sup>')}.`, lab:'limite =', ans:0, why:'Croissances comparées : l’exponentielle l’emporte sur toute puissance, xⁿ/eˣ → 0.'},
   {q:`Calcule ${L('+∞')} ${F('e<sup><i>x</i></sup> + '+x+'²','3e<sup><i>x</i></sup> − '+x)}.`, lab:'limite =', ans:1/3, show:'1/3', why:'On factorise eˣ : (1 + x²/eˣ)/(3 − x/eˣ). Or x²/eˣ → 0 et x/eˣ → 0 : la limite vaut 1/3.'},
   {q:`Calcule ${L('+∞')} ${F('2'+x+' + ln '+x,'5'+x+' − ln '+x)}.`, lab:'limite =', ans:0.4, show:'2/5', why:'On factorise x : (2 + ln x/x)/(5 − ln x/x). ln x/x → 0, donc la limite vaut 2/5.'},
   {q:`Que vaut ${L('+∞')} (${x} − ln ${x}) ?`, opts:['0','+∞','−∞','1'], ans:1, why:'Forme ∞ − ∞. On factorise x : x(1 − ln x/x). La parenthèse tend vers 1 car ln x/x → 0, et x → +∞ : la limite vaut +∞.'},
 ]},
 {n:'Infiniment petits équivalents', r:'Calculer une limite avec les équivalents', qs:[
   {q:`Calcule ${L('0')} ${F('sin(6'+x+')','2'+x)}.`, lab:'limite =', ans:3, why:'6x → 0, donc sin(6x) ~ 6x. Le quotient se comporte comme 6x/(2x) = 3.'},
   {q:`Calcule ${L('0')} ${F('ln(1 + 4'+x+')','e<sup>2<i>x</i></sup> − 1')}.`, lab:'limite =', ans:2, why:'ln(1 + 4x) ~ 4x et e²ˣ − 1 ~ 2x. Le quotient se comporte comme 4x/(2x) = 2.'},
   {q:`Calcule ${L('0')} ${F('1 − cos(3'+x+')',x+'²')}.`, lab:'limite =', ans:4.5, show:'9/2', why:'1 − cos u ~ u²/2 avec u = 3x : 1 − cos(3x) ~ 9x²/2. Le quotient tend vers 9/2.'},
   {q:`Calcule ${L('0')} ${F(x+' · sin(2'+x+')','1 − cos '+x)}.`, lab:'limite =', ans:4, why:'En haut, x · sin(2x) ~ x · 2x = 2x². En bas, 1 − cos x ~ x²/2. Quotient : 2x²/(x²/2) = 4.'},
   {q:`Pour calculer ${L('0')} ${F('sin '+x+' − '+x,x+'³')}, un élève remplace sin ${x} par ${x} et trouve 0. Qu’en penses-tu ?`, opts:['Il a raison','Erreur : on ne remplace jamais un terme d’une somme par son équivalent','Erreur : sin x ~ x n’est vrai qu’en +∞','Erreur : la limite vaut +∞'], ans:1, why:'Un équivalent se remplace dans un produit ou un quotient, jamais dans une somme : sin x − x n’est pas « équivalent à 0 ». Son raisonnement ne prouve rien.'},
 ]},
 {n:'Changement de variable', r:'Changement de variable dans une limite', qs:[
   {q:`Calcule ${L('+∞')} ${x} sin(2/${x}).`, lab:'limite =', ans:2, why:'On pose u = 2/x → 0⁺, donc x = 2/u : x sin(2/x) = 2 sin u/u → 2, car sin u ~ u.'},
   {q:`Calcule ${L('+∞')} ${x}²(e<sup>1/<i>x</i>²</sup> − 1).`, lab:'limite =', ans:1, why:'On pose u = 1/x² → 0⁺ : l’expression vaut (eᵘ − 1)/u, qui tend vers 1 car eᵘ − 1 ~ u.'},
   {q:`Calcule ${L('+∞')} ${x} ln(1 − 2/${x}).`, lab:'limite =', ans:-2, why:'On pose u = −2/x → 0, donc x = −2/u : x ln(1 − 2/x) = −2 ln(1 + u)/u → −2, car ln(1 + u) ~ u.'},
 ]},
];
})();
