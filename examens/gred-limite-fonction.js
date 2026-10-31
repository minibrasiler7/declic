/* Déclic — examen de compétence : Limite d’une fonction en un point */
(()=>{
const x='<i>x</i>';
const L=(a,v='x')=>`lim<sub>${v}→${a}</sub>`;
EXAMS['gred-limite-fonction']=[
 {n:'Prouver une limite avec ε–δ', r:'Prouver une limite avec ε–δ', qs:[
   {q:`On veut prouver ${L(4)} (2${x} + 3) = 11 avec la définition. L’adversaire choisit ε = 0,5. Quel est le plus grand δ qui convient ?`, lab:'δ =', ans:.25, tol:1e-9, why:'|2x + 3 − 11| = |2x − 8| = 2|x − 4|. On veut 2|x − 4| < 0,5, soit |x − 4| < 0,25 : δ = 0,5/2 = 0,25.'},
   {q:`Pour prouver ${L('−1')} (−4${x} + 1) = 5, quel δ convient pour tout ε &gt; 0 ?`, opts:['δ = 4ε','δ = ε − 4','δ = ε/4','δ = −ε/4'], ans:2, why:'|−4x + 1 − 5| = |−4x − 4| = 4|x + 1|. Avec δ = ε/4, 0 < |x + 1| < δ donne 4|x + 1| < 4δ = ε. Un δ doit être strictement positif, et 4ε est trop grand.'},
   {q:`Laquelle de ces phrases est la définition de ${L('<i>a</i>')} f(${x}) = <i>L</i> ?`, opts:['∃δ &gt; 0, ∀ε &gt; 0, 0 &lt; |<i>x</i> − <i>a</i>| &lt; δ ⇒ |f(<i>x</i>) − <i>L</i>| &lt; ε','∀δ &gt; 0, ∃ε &gt; 0, 0 &lt; |<i>x</i> − <i>a</i>| &lt; δ ⇒ |f(<i>x</i>) − <i>L</i>| &lt; ε','∀ε &gt; 0, ∃δ &gt; 0, 0 &lt; |<i>x</i> − <i>a</i>| &lt; δ ⇒ |f(<i>x</i>) − <i>L</i>| &lt; ε','∀ε &gt; 0, ∃δ &gt; 0, |f(<i>x</i>) − <i>L</i>| &lt; ε ⇒ 0 &lt; |<i>x</i> − <i>a</i>| &lt; δ'], ans:2, why:'La tolérance ε est imposée d’abord, quelconque ; on répond ensuite par un rayon δ qui dépend de ε. Et c’est la proximité de x à a qui doit entraîner la proximité de f(x) à L, pas l’inverse.'},
   {q:`Pour prouver ${L(2)} ${x}² = 4, on se limite à |${x} − 2| &lt; 1, on majore |${x} + 2| par la plus petite constante <i>C</i> possible, puis on pose δ = min(1, ε/<i>C</i>). Que vaut δ pour ε = 0,5 ?`, lab:'δ =', ans:.1, tol:1e-9, why:'|x − 2| < 1 donne 1 < x < 3, donc 3 < x + 2 < 5 et C = 5. Alors δ = min(1 ; 0,5/5) = min(1 ; 0,1) = 0,1, et |x² − 4| = |x − 2| · |x + 2| < 0,1 · 5 = 0,5.'},
 ]},
 {n:'Continuité, prolongement et unicité', r:'Limite, continuité et unicité', qs:[
   {q:`Calcule ${L(1)} ${F(x+'² + 4',x+' + 1')}.`, lab:'limite =', ans:2.5, tol:1e-9, why:'Le numérateur tend vers 1 + 4 = 5 et le dénominateur vers 2 ≠ 0 : la limite vaut 5/2 = 2,5.'},
   {q:`f(${x}) = ${F(x+'² − 9',x+' + 3')} n’est pas définie en −3. Quelle valeur faut-il donner à f(−3) pour la prolonger par continuité ?`, lab:'f(−3) =', ans:-6, why:'Pour x ≠ −3, f(x) = (x − 3)(x + 3)/(x + 3) = x − 3, qui tend vers −6. Le prolongement par continuité pose f(−3) = −6.'},
   {q:`f est définie sur ℝ, avec f(1) = 3 et ${L(1)} f(${x}) = 2. Que peut-on dire ?`, opts:['f est continue en 1','C’est impossible : la limite en 1 vaut forcément f(1)','La limite vaut en réalité 3, puisque f(1) = 3','f n’est pas continue en 1'], ans:3, why:'Pour a ∈ D, f est continue en a si et seulement si la limite vaut f(a). Ici 2 ≠ 3. C’est possible : f(x) = 2 pour x ≠ 1 et f(1) = 3. La valeur en 1 ne compte pas dans la limite.'},
   {q:'Pour démontrer qu’une limite est unique, on suppose deux limites <i>L</i> ≠ <i>L</i>′. Quel ε choisit-on pour obtenir une contradiction ?', opts:['ε = |<i>L</i> − <i>L</i>′|','ε = 2|<i>L</i> − <i>L</i>′|','ε = <i>L</i> + <i>L</i>′','ε = |<i>L</i> − <i>L</i>′|/2'], ans:3, why:'Avec ε = |L − L′|/2, on aurait |L − L′| ≤ |L − f(x)| + |f(x) − L′| < 2ε = |L − L′| : absurde. Avec ε = |L − L′|, on obtient seulement |L − L′| < 2|L − L′|, ce qui ne contredit rien.'},
 ]},
 {n:'Limites à gauche et à droite', r:'Limite à gauche, limite à droite', qs:[
   {q:`f(${x}) = ${x}² + 1 pour ${x} &lt; 1 et f(${x}) = 3${x} − 1 pour ${x} ≥ 1. Calcule ${L(1)} f(${x}).`, lab:'limite =', ans:2, why:'À gauche, x² + 1 → 2 ; à droite, 3x − 1 → 2. Les deux limites latérales existent et sont égales : la limite vaut 2.'},
   {q:`Calcule ${L('3⁺')} ${F(x+'² − 9','|'+x+' − 3|')}.`, lab:'limite =', ans:6, why:'Pour x > 3, |x − 3| = x − 3. Le quotient vaut (x − 3)(x + 3)/(x − 3) = x + 3, qui tend vers 6.'},
   {q:`f(${x}) = 2${x} + 1 pour ${x} &lt; 0 et f(${x}) = ${x}² + <i>k</i> pour ${x} &gt; 0. Pour quelle valeur de <i>k</i> f a-t-elle une limite en 0 ?`, lab:'k =', ans:1, why:'À gauche, 2x + 1 → 1 ; à droite, x² + k → k. La limite existe si et seulement si les deux sont égales : k = 1.'},
   {q:`Que dire de ${L(2)} ${F(x+'² − 2'+x,'|'+x+' − 2|')} ?`, opts:['Elle vaut 2','Elle vaut −2','Elle vaut 0','Elle n’existe pas : −2 à gauche, 2 à droite'], ans:3, why:'x² − 2x = x(x − 2). Pour x > 2, le quotient vaut x → 2 ; pour x < 2, |x − 2| = 2 − x et le quotient vaut −x → −2. Les limites latérales diffèrent : pas de limite en 2.'},
 ]},
 {n:'Limite infinie en un point', r:'Limite infinie en un point', qs:[
   {q:`Que vaut ${L('2⁺')} ${F('3'+x+' − 1',x+' − 2')} ?`, opts:['5','+∞','−∞','0'], ans:1, why:'Le numérateur tend vers 5 > 0 et le dénominateur vers 0⁺ (x > 2). Un nombre positif sur 0⁺ : +∞.'},
   {q:`Que vaut ${L(1)} ${F(x+' − 3','('+x+' − 1)²')} ?`, opts:['+∞','Pas de limite : +∞ d’un côté, −∞ de l’autre','−∞','−2'], ans:2, why:'Le numérateur tend vers −2 < 0 et (x − 1)² tend vers 0 en restant positif, des deux côtés. Un nombre négatif sur 0⁺ : −∞, à gauche comme à droite.'},
   {q:`Pour prouver ${L(0)} 1/${x}⁴ = +∞ avec la définition, on cherche δ tel que 0 &lt; |${x}| &lt; δ ⇒ 1/${x}⁴ &gt; <i>A</i>. Quel δ obtient-on pour <i>A</i> = 10 000 ?`, lab:'δ =', ans:.1, tol:1e-9, why:'1/x⁴ > A ⇔ x⁴ < 1/A ⇔ |x| < A^(−1/4). Pour A = 10 000 = 10⁴ : δ = 1/10 = 0,1. Contrôle : 0,1⁴ = 0,0001 = 1/A.'},
 ]},
 {n:'Limites en l’infini et limites de référence', r:'Limites en +∞ et en −∞, limites de référence', qs:[
   {q:`Pour ${L('+∞')} 1/${x}² = 0, on cherche <i>B</i> tel que ${x} &gt; <i>B</i> ⇒ 1/${x}² &lt; ε. Quel est le plus petit <i>B</i> positif qui convient pour ε = 0,0001 ?`, lab:'B =', ans:100, why:'Pour x > 0, 1/x² < 0,0001 ⇔ x² > 10 000 ⇔ x > 100. Donc B = 100.'},
   {q:`Que vaut ${L('−∞')} (1/3)<sup>${x}</sup> ?`, opts:['0','1','+∞','−∞'], ans:2, why:'La base 1/3 est inférieure à 1 : (1/3)ˣ = 3^(−x), et −x → +∞, donc la limite est +∞ (tableau des limites de référence).'},
   {q:`Que vaut ${L('−∞')} (${x}³ + 2<sup>${x}</sup>) ?`, opts:['+∞','−∞','0','Forme indéterminée, on ne peut pas conclure'], ans:1, why:'En −∞, x³ → −∞ (puissance impaire) et 2ˣ → 0 (base > 1). La somme tend vers −∞ + 0 = −∞ : ce n’est pas une forme indéterminée.'},
 ]},
 {n:'Forme ∞/∞ : le terme dominant', r:'Forme ∞/∞ en l’infini : le terme dominant', qs:[
   {q:`Calcule ${L('+∞')} ${F('4'+x+'² + '+x+' − 7','2'+x+'² − 3')}.`, lab:'limite =', ans:2, why:'On factorise x² : (4 + 1/x − 7/x²)/(2 − 3/x²) → 4/2 = 2.'},
   {q:`Calcule ${L('−∞')} ${F('5'+x+' − 2',x+'² + 1')}.`, lab:'limite =', ans:0, why:'On factorise : x(5 − 2/x)/(x²(1 + 1/x²)) = (1/x) · (5 − 2/x)/(1 + 1/x²) → 0 · 5 = 0. Le degré du haut est plus petit.'},
   {q:`Que vaut ${L('−∞')} ${F(x+'³ − 4'+x,'2'+x+'² + 1')} ?`, opts:['−∞','1/2','+∞','0'], ans:0, why:'x³(1 − 4/x²)/(x²(2 + 1/x²)) = x · (1 − 4/x²)/(2 + 1/x²). Le quotient tend vers 1/2 et x → −∞ : la limite est −∞.'},
   {q:`Calcule ${L('+∞')} ${F('2'+x+'³ − '+x,'1 − 4'+x+'³')}.`, lab:'limite =', ans:-.5, tol:1e-9, why:'On factorise x³ : (2 − 1/x²)/(1/x³ − 4) → 2/(−4) = −1/2. Attention au signe du coefficient dominant du bas.'},
 ]},
 {n:'Forme 0/0 : factoriser par (x − a)', r:'Forme 0/0 en un point : factoriser par (x − a)', qs:[
   {q:'Laquelle de ces limites est une forme indéterminée 0/0 ?', opts:[`${L(0)} ${F(x+' + 1',x+'² + 1')}`,`${L(3)} ${F(x+' − 3',x+'² − 9')}`,`${L(1)} ${F(x+'² + 1',x+' + 1')}`,`${L(2)} ${F(x+' + 2',x+' − 1')}`], ans:1, why:'En 3, x − 3 → 0 et x² − 9 → 0 : forme 0/0. Les autres se calculent directement : 1/1 = 1, 2/2 = 1 et 4/1 = 4.'},
   {q:`Calcule ${L('−1')} ${F(x+'² − 2'+x+' − 3',x+'² − 1')}.`, lab:'limite =', ans:2, why:'x² − 2x − 3 = (x + 1)(x − 3) et x² − 1 = (x + 1)(x − 1). Pour x ≠ −1, le quotient vaut (x − 3)/(x − 1) → (−4)/(−2) = 2.'},
   {q:`Calcule ${L(2)} ${F(x+'³ − 8',x+' − 2')}.`, lab:'limite =', ans:12, why:'2 est racine de x³ − 8, qui se factorise : x³ − 8 = (x − 2)(x² + 2x + 4) (développe pour vérifier). Pour x ≠ 2, le quotient vaut x² + 2x + 4 → 4 + 4 + 4 = 12.'},
   {q:`Que dire de ${L(1)} ${F(x+'² − 1','('+x+' − 1)²')} ?`, opts:['Elle vaut 2','Elle vaut +∞','Elle n’existe pas : +∞ à droite, −∞ à gauche','Elle vaut 0'], ans:2, why:'Après simplification par x − 1 : (x + 1)/(x − 1). Le haut tend vers 2, le bas vers 0 en changeant de signe : nombre sur 0⁺ à droite (+∞), sur 0⁻ à gauche (−∞). Pas de limite.'},
 ]},
 {n:'Forme 0/0 avec une racine : la quantité conjuguée', r:'Forme 0/0 avec une racine : la quantité conjuguée', qs:[
   {q:`Calcule ${L(16)} ${F('√'+x+' − 4',x+' − 16')}. Donne une fraction ou un décimal.`, lab:'limite =', ans:.125, tol:1e-9, show:'1/8', why:'On multiplie par √x + 4 : (x − 16)/((x − 16)(√x + 4)) = 1/(√x + 4) → 1/(4 + 4) = 1/8.'},
   {q:`Calcule ${L(0)} ${F(x,'√('+x+' + 9) − 3')}.`, lab:'limite =', ans:6, why:'La racine est au dénominateur : on multiplie haut et bas par √(x + 9) + 3. Le bas devient x + 9 − 9 = x, et le quotient vaut √(x + 9) + 3 → 6.'},
   {q:`Calcule ${L(3)} ${F('√('+x+' + 1) − 2',x+' − 3')}. Donne une fraction ou un décimal.`, lab:'limite =', ans:.25, tol:1e-9, show:'1/4', why:'Avec le conjugué √(x + 1) + 2 : (x + 1 − 4)/((x − 3)(√(x + 1) + 2)) = 1/(√(x + 1) + 2) → 1/(2 + 2) = 1/4.'},
   {q:`Que vaut ${L('+∞')} (√(${x} + 5) − √${x}) ?`, opts:['+∞','0','5','Forme ∞ − ∞, la limite n’existe pas'], ans:1, why:'Avec la quantité conjuguée √(x + 5) + √x : (x + 5 − x)/(√(x + 5) + √x) = 5/(√(x + 5) + √x). Le dénominateur tend vers +∞, donc la limite vaut 0. « Indéterminée » veut dire qu’il faut transformer, pas que la limite n’existe pas.'},
 ]},
];
})();
