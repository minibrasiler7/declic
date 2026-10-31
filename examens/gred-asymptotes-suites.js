/* Déclic — examen de compétence : Asymptotes, suites et fonctions continues */
(()=>{
const x='<i>x</i>', n='<i>n</i>';
const L=(a,v='x')=>`lim<sub>${v}→${a}</sub>`;
const u=(k='n')=>`<i>u</i><sub>${k==='n'?'<i>n</i>':k}</sub>`;
const u1=`<i>u</i><sub><i>n</i>+1</sub>`;
EXAMS['gred-asymptotes-suites']=[
 {n:'Asymptote verticale', r:'Asymptote verticale', qs:[
   {q:`f(${x}) = ${F(x+' + 2',x+' − 3')}. Sa courbe a une asymptote verticale d’équation ${x} = <i>a</i>. Que vaut <i>a</i> ?`, lab:'a =', ans:3, why:'Le dénominateur s’annule en 3, où le numérateur vaut 5 ≠ 0 : f tend vers ±∞ de part et d’autre de 3, donc x = 3 est asymptote verticale.'},
   {q:`Que vaut ${L('−1⁻')} ${F('2'+x+' + 1',x+' + 1')} ?`, opts:['−∞','−1','+∞','2'], ans:2, why:'Le numérateur tend vers −1 < 0 et, pour x < −1, x + 1 → 0⁻. Un nombre négatif sur 0⁻ donne +∞. La droite x = −1 est asymptote verticale.'},
   {q:`Combien la courbe de f(${x}) = ${F(x+'² − 4',x+'² − 5'+x+' + 6')} a-t-elle d’asymptotes verticales ?`, lab:'nombre =', ans:1, why:'x² − 5x + 6 = (x − 2)(x − 3) et x² − 4 = (x − 2)(x + 2). En 2, le facteur commun se simplifie : f → 4/(−1) = −4, la courbe a un trou. En 3, le numérateur vaut 5 ≠ 0 : asymptote x = 3. Une seule.'},
   {q:`Quelles sont les asymptotes verticales de la courbe de f(${x}) = ${F(x+' + 1',x+'² + 1')} ?`, opts:['<i>x</i> = −1','<i>x</i> = 1 et <i>x</i> = −1','<i>x</i> = 0','Aucune : le dénominateur ne s’annule jamais'], ans:3, why:'x² + 1 ≥ 1 > 0 pour tout réel x : f est définie et continue sur ℝ, ses limites en tout point sont finies. x = −1 annule le numérateur, pas le dénominateur.'},
 ]},
 {n:'Asymptote horizontale et position relative', r:'Asymptote horizontale et position relative', qs:[
   {q:`f(${x}) = ${F('6'+x+' − 1','2'+x+' + 5')}. Sa courbe a une asymptote horizontale <i>y</i> = <i>L</i> en +∞. Que vaut <i>L</i> ?`, lab:'L =', ans:3, why:'Terme dominant : (6 − 1/x)/(2 + 5/x) → 6/2 = 3.'},
   {q:`f(${x}) = 3 + 2<sup>${x}</sup>. Quelle est son asymptote horizontale en −∞ ? Donne <i>L</i> dans <i>y</i> = <i>L</i>.`, lab:'L =', ans:3, why:'En −∞, 2ˣ → 0 (base > 1), donc f(x) → 3 : y = 3 est asymptote en −∞. En +∞, f → +∞ : pas d’asymptote horizontale de ce côté.'},
   {q:`Où est la courbe de f(${x}) = ${F('3'+x+'² − 1',x+'² + 4')} par rapport à son asymptote <i>y</i> = 3 ?`, opts:['Au-dessus partout','En dessous partout','Au-dessus en +∞, en dessous en −∞','Elle la coupe en <i>x</i> = 0'], ans:1, why:'f(x) − 3 = (3x² − 1 − 3x² − 12)/(x² + 4) = −13/(x² + 4), toujours strictement négatif : la courbe est sous l’asymptote pour tout x.'},
   {q:`La courbe de f(${x}) = ${F(x+'² + '+x,x+'² + 1')} coupe son asymptote horizontale en un point. Quelle est son abscisse ?`, lab:'x =', ans:1, why:'f → 1 en ±∞, l’asymptote est y = 1. L’écart vaut f(x) − 1 = (x² + x − x² − 1)/(x² + 1) = (x − 1)/(x² + 1), nul en x = 1. Une asymptote peut être touchée.'},
 ]},
 {n:'Asymptote oblique', r:'Trouver l’asymptote oblique : m puis p', qs:[
   {q:`f(${x}) = ${F('6'+x+'³ − '+x+' + 1','2'+x+'² + 5')}. Quelle est la pente <i>m</i> de son asymptote oblique en +∞ ?`, lab:'m =', ans:3, why:'m = lim f(x)/x = lim (6x³ − x + 1)/(2x³ + 5x) = 6/2 = 3 (terme dominant).'},
   {q:`f(${x}) = ${F(x+'² − 4'+x+' + 7',x+' − 2')}. Que vaut l’ordonnée à l’origine <i>p</i> de son asymptote oblique ?`, lab:'p =', ans:-2, why:'Division : x² − 4x + 7 = (x − 2)(x − 2) + 3, donc f(x) = x − 2 + 3/(x − 2). Comme 3/(x − 2) → 0, l’asymptote est y = x − 2 : p = −2.'},
   {q:`f(${x}) = ${F('4'+x+'² − '+x+' + 2','2'+x+' + 1')}. Que vaut l’ordonnée à l’origine <i>p</i> de son asymptote oblique en +∞ ?`, lab:'p =', ans:-1.5, tol:1e-9, why:'m = lim f(x)/x = 4/2 = 2. Puis f(x) − 2x = (4x² − x + 2 − 4x² − 2x)/(2x + 1) = (−3x + 2)/(2x + 1) → −3/2. L’asymptote est y = 2x − 3/2.'},
   {q:`f(${x}) = ${F(x+'² + 5'+x,x+' + 1')}, dont l’asymptote oblique est <i>y</i> = ${x} + 4. Où est la courbe par rapport à cette droite ?`, opts:['Au-dessus en +∞, en dessous en −∞','En dessous en +∞, au-dessus en −∞','Au-dessus des deux côtés','En dessous des deux côtés'], ans:1, why:'x² + 5x = (x + 1)(x + 4) − 4, donc f(x) − (x + 4) = −4/(x + 1). Négatif pour x > −1 (en dessous en +∞), positif pour x < −1 (au-dessus en −∞).'},
   {q:`f(${x}) = 2${x} + √${x}. Sa courbe a-t-elle une asymptote oblique en +∞ ?`, opts:['Oui, <i>y</i> = 2<i>x</i>','Oui, <i>y</i> = 2<i>x</i> + 1','Non : f(<i>x</i>)/<i>x</i> → +∞','Non : f(<i>x</i>)/<i>x</i> → 2, mais f(<i>x</i>) − 2<i>x</i> = √<i>x</i> → +∞'], ans:3, why:'f(x)/x = 2 + 1/√x → 2, donc m = 2. Mais f(x) − 2x = √x n’a pas de limite finie : p n’existe pas, il n’y a pas d’asymptote oblique (branche parabolique).'},
 ]},
 {n:'Caractérisation séquentielle de la limite', r:'Limite d’une fonction et suites', qs:[
   {q:`f(${x}) = ${F(x+'² + 3'+x,x)} pour ${x} ≠ 0 et ${u()} = 2/${n}. Vers quoi tend f(${u()}) ?`, lab:'limite =', ans:3, why:'Pour x ≠ 0, f(x) = x + 3, qui tend vers 3 en 0. Comme uₙ → 0 avec uₙ ≠ 0, f(uₙ) = uₙ + 3 → 3.'},
   {q:`On sait que ${L(2)} f(${x}) = 5. Vers quoi tend la suite f(2 + 1/${n}²) ?`, lab:'limite =', ans:5, why:'uₙ = 2 + 1/n² tend vers 2 sans jamais valoir 2. Par la caractérisation séquentielle, f(uₙ) → 5.'},
   {q:`f(${x}) = ${F('2'+x+' + 1',x+' + 3')} et ${u()} = ${n}². Vers quoi tend f(${u()}) ?`, lab:'limite =', ans:2, why:'f → 2 en +∞ (terme dominant 2x/x). Comme uₙ = n² → +∞, f(uₙ) → 2 : la caractérisation reste vraie quand a est infini.'},
   {q:`On sait que g(1/${n}) → 0. Peut-on conclure que ${L(0)} g(${x}) = 0 ?`, opts:['Oui, c’est la caractérisation séquentielle','Oui, car 1/<i>n</i> → 0','Non : il faut que ce soit vrai pour toute suite qui tend vers 0 sans valoir 0','Non : une limite en 0 ne se calcule jamais avec des suites'], ans:2, why:'Une seule suite ne prouve rien. Exemple : g(x) = 0 pour x > 0 et g(x) = 1 pour x < 0 vérifie g(1/n) = 0, mais g(−1/n) = 1 : g n’a pas de limite en 0.'},
 ]},
 {n:'Faire passer la limite dans une fonction continue', r:'Continuité et suites : échanger f et lim', qs:[
   {q:`Calcule la limite de ${u()} = √(${F('16'+n+' + 1',n)}).`, lab:'limite =', ans:4, why:'(16n + 1)/n = 16 + 1/n → 16, et la racine carrée est continue en 16 : uₙ → √16 = 4.'},
   {q:`Calcule la limite de ${u()} = 3<sup>(2${n} + 1)/${n}</sup>.`, lab:'limite =', ans:9, why:'L’exposant (2n + 1)/n = 2 + 1/n → 2, et exp₃ est continue en 2 : uₙ → 3² = 9.'},
   {q:`Calcule la limite de ${u()} = log<sub>2</sub>(${F('8'+n+' + 1',n+' + 3')}).`, lab:'limite =', ans:3, why:'(8n + 1)/(n + 3) → 8 (terme dominant), et log₂ est continue en 8 : uₙ → log₂ 8 = 3.'},
   {q:`<i>E</i> est la partie entière (le plus grand entier ≤ ${x}). Que vaut la limite de <i>E</i>(2 − 1/${n}) ?`, lab:'limite =', ans:1, why:'Pour n ≥ 2, 1 ≤ 2 − 1/n < 2, donc E(2 − 1/n) = 1 et la limite vaut 1. Elle diffère de E(2) = 2 : E n’est pas continue en 2, l’échange de E et lim est faux ici.'},
 ]},
 {n:'Prouver qu’une limite n’existe pas avec deux suites', r:'Montrer qu’une limite n’existe pas avec deux suites', qs:[
   {q:`Pour étudier sin(1/${x}) en 0, on prend <i>w</i><sub><i>n</i></sub> = 1/(3π/2 + 2π${n}). Vers quoi tend sin(1/<i>w</i><sub><i>n</i></sub>) ?`, lab:'limite =', ans:-1, why:'1/wₙ = 3π/2 + 2πn, et sin(3π/2 + 2πn) = sin(3π/2) = −1 pour tout n. La suite constante −1 tend vers −1.'},
   {q:`g(${x}) = ${x}² pour ${x} ≤ 1 et g(${x}) = 2${x} + 1 pour ${x} &gt; 1. Vers quoi tend g(1 + 1/${n}) ?`, lab:'limite =', ans:3, why:'1 + 1/n > 1, donc g(1 + 1/n) = 2(1 + 1/n) + 1 = 3 + 2/n → 3. Avec 1 − 1/n, on obtient (1 − 1/n)² → 1 : deux limites différentes, g n’a pas de limite en 1.'},
   {q:`Pour prouver que la partie entière <i>E</i> n’a pas de limite en 3, quel couple de suites convient ?`, opts:['3 + 1/<i>n</i> et 3 + 2/<i>n</i>','3 + 1/<i>n</i> et 3 − 1/<i>n</i>','<i>n</i> et −<i>n</i>','3 − 1/<i>n</i> et 3 − 2/<i>n</i>'], ans:1, why:'Les deux suites tendent vers 3, avec E(3 + 1/n) = 3 et E(3 − 1/n) = 2 pour n ≥ 2. Les images ont des limites différentes. Les deux couples du même côté donnent la même limite, et n, −n ne tendent pas vers 3.'},
   {q:`Que peut-on dire de ${L('+∞')} sin ${x} ?`, opts:['Elle vaut 0, car sin(π<i>n</i>) = 0 pour tout <i>n</i>','Elle n’existe pas : sin(2π<i>n</i>) → 0 et sin(π/2 + 2π<i>n</i>) → 1','Elle vaut 1','Elle vaut +∞'], ans:1, why:'Les suites 2πn et π/2 + 2πn tendent vers +∞, avec des images constantes 0 et 1. Deux limites différentes : pas de limite. Une seule suite, comme πn, ne prouve rien.'},
 ]},
 {n:'Limite d’une suite récurrente : le point fixe', r:'Trouver la limite d’une suite récurrente', qs:[
   {q:`${u('0')} = 0 et ${u1} = √(12 + ${u()}). On admet que la suite converge. Quelle est sa limite ?`, lab:'limite =', ans:4, why:'f(x) = √(12 + x) est continue, donc ℓ = √(12 + ℓ), puis ℓ² − ℓ − 12 = 0 : ℓ = 4 ou ℓ = −3. Une racine carrée est positive : ℓ = 4.'},
   {q:`${u('0')} = 0 et ${u1} = ${F(u()+'² + 6','5')}. On admet que la suite est croissante et majorée par 2. Quelle est sa limite ?`, lab:'limite =', ans:2, why:'La suite converge vers ℓ ≤ 2. Par continuité, (ℓ² + 6)/5 = ℓ ⇔ ℓ² − 5ℓ + 6 = 0 ⇔ ℓ = 2 ou ℓ = 3. Le majorant exclut 3 : ℓ = 2.'},
   {q:`${u('0')} = 1 et ${u1} = ${u()}/2 + 3. On admet que la suite converge. Quelle est sa limite ?`, lab:'limite =', ans:6, why:'f(x) = x/2 + 3 est continue : ℓ = ℓ/2 + 3 ⇔ ℓ/2 = 3 ⇔ ℓ = 6.'},
   {q:`${u('0')} = 2 et ${u1} = ${u()}². Les points fixes de ${x} ↦ ${x}² sont 0 et 1. Que dire de la suite ?`, opts:['Elle tend vers 1','Elle tend vers 0','On ne peut choisir qu’entre 0 et 1','Elle diverge : <i>u</i><sub><i>n</i></sub> = 2^(2ⁿ) → +∞, le théorème ne s’applique que si la suite converge'], ans:3, why:'u₁ = 4, u₂ = 16, u₃ = 256 : uₙ = 2^(2ⁿ) → +∞. Le théorème du point fixe dit seulement « si la suite converge, c’est vers un point fixe » ; il ne prouve pas la convergence.'},
   {q:`${u1} = ${u()}² + 1, avec ${u('0')} réel quelconque. Que peut-on conclure ?`, opts:['La suite converge vers 1','La suite ne converge pas : ℓ² + 1 = ℓ n’a pas de solution réelle','La suite converge vers 0','On ne peut rien conclure'], ans:1, why:'Si la suite convergeait vers ℓ, la continuité de x ↦ x² + 1 donnerait ℓ² − ℓ + 1 = 0, de discriminant 1 − 4 = −3 < 0 : aucun réel ne convient. Donc la suite ne converge pas.'},
 ]},
];
})();
