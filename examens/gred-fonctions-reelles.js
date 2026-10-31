/* Déclic — examen de compétence : Fonctions réelles : rappels et répertoire */
(()=>{
const x='<i>x</i>', f='<i>f</i>', y='<i>y</i>';
EXAMS['gred-fonctions-reelles']=[
 {n:'Calculer des images', r:'Une fonction réelle d’une variable réelle', qs:[
   {q:`Soit ${f}(${x}) = ${x}² − 3${x}. Que vaut ${f}(−2)&nbsp;?`, lab:'f(−2) =', ans:10, why:'f(−2) = (−2)² − 3 · (−2) = 4 + 6 = 10. Attention aux parenthèses : (−2)² = 4.'},
   {q:`Soit ${f}(${x}) = ${F('2'+x+' + 1',x+' − 1')}. Que vaut ${f}(3)&nbsp;? Donne une fraction ou un décimal exact.`, lab:'f(3) =', ans:3.5, tol:1e-9, show:'7/2', why:'f(3) = (6 + 1)/(3 − 1) = 7/2 = 3,5.'},
   {q:`Soit ${f}(${x}) = ${x}² − 1. Que vaut ${f}(<i>t</i> + 1)&nbsp;?`, opts:['<i>t</i>² + 2<i>t</i>','<i>t</i>²','<i>t</i>² + 1','<i>t</i>² − 1 + 1'], ans:0, why:'On remplace x par t + 1 partout : (t + 1)² − 1 = t² + 2t + 1 − 1 = t² + 2t.'},
 ]},
 {n:'Déterminer un domaine de définition', r:'Déterminer un domaine de définition', qs:[
   {q:`Quel est le domaine de définition naturel de ${f}(${x}) = ${F('√('+x+' + 4)',x+' − 1')}&nbsp;?`, opts:['[−4 ; +∞[','[−4 ; 1[ ∪ ]1 ; +∞[',']−4 ; 1[ ∪ ]1 ; +∞[','ℝ privé de 1'], ans:1, why:'Radicande x + 4 ≥ 0, soit x ≥ −4 (−4 est permis : √0 = 0), et dénominateur x − 1 ≠ 0. D = [−4 ; 1[ ∪ ]1 ; +∞[.'},
   {q:`Combien de réels sont exclus du domaine de ${f}(${x}) = ${F('1',x+'² − 9')}&nbsp;?`, lab:'nombre :', ans:2, why:'x² − 9 = (x − 3)(x + 3) s’annule en 3 et en −3 : deux valeurs interdites.'},
   {q:`Le domaine de ${f}(${x}) = √(6 − 2${x}) est un intervalle ]−∞ ; <i>c</i>]. Que vaut <i>c</i>&nbsp;?`, lab:'c =', ans:3, why:'6 − 2x ≥ 0 ⇔ 2x ≤ 6 ⇔ x ≤ 3. Le domaine est ]−∞ ; 3].'},
   {q:`Quel est le domaine de ${f}(${x}) = ${F('1','√('+x+' − 2)')}&nbsp;?`, opts:['[2 ; +∞[',']2 ; +∞[','ℝ privé de 2',']−∞ ; 2['], ans:1, why:'La racine est au dénominateur : il faut x − 2 &gt; 0 strictement, sinon on divise par √0 = 0. D = ]2 ; +∞[.'},
   {q:`Quel est le domaine de ${f}(${x}) = ${F('√('+x+'² + 4)',x+' + 5')}&nbsp;?`, opts:['[−2 ; 2]','ℝ privé de −5','[−5 ; +∞[','ℝ privé de −5, −2 et 2'], ans:1, why:'x² + 4 &gt; 0 pour tout x : la racine n’impose rien. Seul le dénominateur exclut x = −5.'},
 ]},
 {n:'Image et graphe', r:'Image et graphe', qs:[
   {q:`L’image de ${f}(${x}) = ${x}² + 4${x} sur ℝ est un intervalle [<i>m</i> ; +∞[. Que vaut <i>m</i>&nbsp;?`, lab:'m =', ans:-4, why:'x² + 4x = (x + 2)² − 4 ≥ −4, avec égalité en x = −2. L’image est [−4 ; +∞[.'},
   {q:`Quelle est la plus grande valeur prise par ${f}(${x}) = 3 − (${x} − 1)² sur ℝ&nbsp;?`, lab:'maximum :', ans:3, why:'(x − 1)² ≥ 0, donc f(x) ≤ 3, avec égalité en x = 1. L’image est ]−∞ ; 3].'},
   {q:'Laquelle de ces courbes est le graphe d’une fonction&nbsp;?', opts:['Le cercle de centre O et de rayon 1','La droite verticale x = 2','La parabole d’équation y = x² − 1','La réunion des droites y = x et y = −x'], ans:2, why:'Test des verticales : chaque droite x = c coupe la parabole y = x² − 1 en un seul point. Le cercle et la réunion des deux droites sont coupés deux fois par certaines verticales, la droite x = 2 une infinité de fois.'},
   {q:`Quelle est l’image de ${x} ↦ |${x}| + 2 sur ℝ&nbsp;?`, opts:['ℝ','[0 ; +∞[','[2 ; +∞[',']2 ; +∞['], ans:2, why:'|x| ≥ 0 avec égalité en 0, donc |x| + 2 ≥ 2, et la valeur 2 est atteinte. Toute valeur y ≥ 2 est atteinte en x = y − 2.'},
 ]},
 {n:'Compter les antécédents', r:'Injectivité et surjectivité lues sur le graphe', qs:[
   {q:`Combien d’antécédents le nombre 7 a-t-il par ${f}(${x}) = ${x}² − 6${x} sur ℝ&nbsp;?`, lab:'nombre :', ans:2, why:'x² − 6x = 7 ⇔ x² − 6x − 7 = 0 ⇔ (x − 7)(x + 1) = 0 : x = 7 ou x = −1. La droite y = 7 coupe le graphe deux fois.'},
   {q:`Combien d’antécédents le nombre −9 a-t-il par ${f}(${x}) = ${x}² − 6${x} sur ℝ&nbsp;?`, lab:'nombre :', ans:1, why:'x² − 6x = −9 ⇔ (x − 3)² = 0 ⇔ x = 3. Un seul antécédent : −9 est le minimum de f.'},
   {q:`Combien d’antécédents le nombre −10 a-t-il par ${f}(${x}) = ${x}² − 6${x} sur ℝ&nbsp;?`, lab:'nombre :', ans:0, why:'f(x) = (x − 3)² − 9 ≥ −9 &gt; −10 : aucun antécédent. f n’est donc pas surjective de ℝ sur ℝ.'},
   {q:'Laquelle de ces fonctions, définies sur ℝ, est injective&nbsp;?', opts:['x ↦ x² + 1','x ↦ |x − 1|','x ↦ sin x','x ↦ x³'], ans:3, why:'Si a &lt; b, alors a³ &lt; b³ : deux réels distincts ont des cubes distincts. Pour les autres : (−1)² + 1 = 1² + 1, |0 − 1| = |2 − 1|, sin 0 = sin π.'},
 ]},
 {n:'Calculer une réciproque', r:'Trouver l’expression d’une réciproque', qs:[
   {q:`Soit ${f}(${x}) = 3${x} − 4, bijection de ℝ sur ℝ. Que vaut ${f}<sup>−1</sup>(5)&nbsp;?`, lab:'f⁻¹(5) =', ans:3, why:'On résout 3x − 4 = 5 : x = 3. Vérification : f(3) = 5.'},
   {q:`Soit ${f}(${x}) = ${F(x+' + 1',x+' − 2')}, bijection de ℝ privé de 2 sur ℝ privé de 1. Que vaut ${f}<sup>−1</sup>(3)&nbsp;? Donne une fraction ou un décimal exact.`, lab:'f⁻¹(3) =', ans:3.5, tol:1e-9, show:'7/2', why:'(x + 1)/(x − 2) = 3 ⇔ x + 1 = 3x − 6 ⇔ x = 7/2. Vérification : f(3,5) = 4,5/1,5 = 3.'},
   {q:`Soit ${f}(${x}) = ${F('2'+x+' − 1',x+' + 3')} sur ℝ privé de −3. Quel est l’unique réel qui n’est pas dans l’image de ${f}&nbsp;?`, lab:'valeur :', ans:2, why:'y(x + 3) = 2x − 1 ⇔ x(y − 2) = −1 − 3y. Pour y = 2, on obtient 0 = −7 : impossible. Pour y ≠ 2, x = (1 + 3y)/(2 − y) convient. Seul 2 n’est pas atteint.'},
   {q:`Soit ${f}(${x}) = ${x}² + 1, bijection de [0 ; +∞[ sur [1 ; +∞[. Que vaut ${f}<sup>−1</sup>(10)&nbsp;?`, lab:'f⁻¹(10) =', ans:3, why:'x² + 1 = 10 ⇔ x² = 9 ⇔ x = 3 ou x = −3. Seul 3 est dans [0 ; +∞[.'},
   {q:`Soit ${f}(${x}) = ${F(x+' − 1',x+' + 2')}, bijection de ℝ privé de −2 sur ℝ privé de 1. Quelle est l’expression de ${f}<sup>−1</sup>(${y})&nbsp;?`, opts:['(y + 2)/(y − 1)','(1 + 2y)/(1 − y)','(y − 1)/(y + 2)','(1 − y)/(1 + 2y)'], ans:1, why:'y(x + 2) = x − 1 ⇔ x(y − 1) = −1 − 2y ⇔ x = (1 + 2y)/(1 − y). Test : f(0) = −1/2 et (1 − 1)/(1 + 1/2) = 0.'},
 ]},
 {n:'Réciproque, restriction et symétrie', r:'Fonction réciproque et symétrie des graphes', qs:[
   {q:'Le point (2 ; 5) est sur le graphe d’une bijection <i>f</i>. Quel point est sûrement sur le graphe de <i>f</i><sup>−1</sup>&nbsp;?', opts:['(−2 ; −5)','(5 ; 2)','(2 ; 1/5)','(1/2 ; 1/5)'], ans:1, why:'5 = f(2) ⇔ 2 = f⁻¹(5) : le point (5 ; 2) est sur le graphe de f⁻¹. C’est le symétrique de (2 ; 5) par rapport à la droite y = x.'},
   {q:`Soit ${f}(${x}) = 4${x} sur ℝ. Que vaut ${f}<sup>−1</sup>(8)&nbsp;?`, opts:['1/32','2','32','1/2'], ans:1, why:'f⁻¹(8) est la solution de 4x = 8, soit 2. Le piège 1/32 = 1/f(8) confond la réciproque et l’inverse 1/f.'},
   {q:`La restriction de ${x} ↦ (${x} + 1)² à ]−∞ ; −1] est une bijection sur [0 ; +∞[. Que vaut l’antécédent de 4 par cette restriction&nbsp;?`, lab:'antécédent :', ans:-3, why:'(x + 1)² = 4 ⇔ x + 1 = 2 ou x + 1 = −2. Sur ]−∞ ; −1], x + 1 ≤ 0, donc x + 1 = −2 et x = −3.'},
 ]},
 {n:'Le répertoire des fonctions usuelles', r:'Reconnaître une fonction sur son graphe', qs:[
   {q:'Calcule ⌊−0,5⌋ · ⌊4,9⌋.', lab:'résultat :', ans:-4, why:'⌊−0,5⌋ = −1 (le plus grand entier ≤ −0,5) et ⌊4,9⌋ = 4. Produit : −4.'},
   {q:'Calcule √((−5)²).', lab:'résultat :', ans:5, why:'√((−5)²) = √25 = 5. En général √(x²) = |x|, pas x.'},
   {q:'Calcule cos π + sin(π/2).', lab:'résultat :', ans:0, why:'cos π = −1 et sin(π/2) = 1 : la somme vaut 0.'},
   {q:'Pour quels réels <i>x</i> a-t-on ⌊<i>x</i>⌋ = −2&nbsp;?', opts:['[−3 ; −2[','[−2 ; −1[',']−2 ; −1]','[−2,5 ; −1,5['], ans:1, why:'⌊x⌋ = −2 ⇔ −2 ≤ x &lt; −1 : c’est la marche de l’escalier posée sur [−2 ; −1[.'},
   {q:'Une courbe n’existe que pour <i>x</i> ≥ 0, part de l’origine, passe par (4 ; 2) et (9 ; 3), et s’aplatit. De quelle fonction s’agit-il&nbsp;?', opts:['x ↦ x²','x ↦ √x','x ↦ 1/x','x ↦ |x|'], ans:1, why:'Domaine [0 ; +∞[ et points (4 ; 2), (9 ; 3) : c’est la racine carrée, puisque √4 = 2 et √9 = 3.'},
   {q:'Une courbe est en U, symétrique par rapport à l’axe vertical, passe par (1 ; 1) et (2 ; 16). De quelle fonction s’agit-il&nbsp;?', opts:['x ↦ x²','x ↦ x³','x ↦ x⁴','x ↦ |x|'], ans:2, why:'U symétrique : puissance paire (ou |x|). Le point (2 ; 16) tranche : 2⁴ = 16, alors que 2² = 4 et |2| = 2.'},
 ]},
];
})();
