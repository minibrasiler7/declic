/* Déclic — examen de compétence : Exponentielle et logarithme de base a */
(()=>{
const x='<i>x</i>', lg=(a,s)=>`log<sub>${a}</sub> ${s}`;
EXAMS['gred-exp-log-def']=[
 {n:'Puissances à exposant réel : les règles', r:'Les règles de calcul restent vraies', qs:[
   {q:'Que vaut 2<sup>√3</sup> · 2<sup>4 − √3</sup> ?', lab:'valeur =', ans:16, why:'aˣ · aʸ = a^(x+y) : l’exposant devient √3 + 4 − √3 = 4, et 2⁴ = 16.'},
   {q:'Que vaut (7<sup>√5</sup>)<sup>√5</sup> ?', lab:'valeur =', ans:16807, why:'(aˣ)ʸ = a^(xy) : 7^(√5 · √5) = 7⁵ = 16 807.'},
   {q:`Simplifie 3<sup>${x}</sup> · 3<sup><i>y</i></sup>.`, opts:['3<sup><i>x</i>+<i>y</i></sup>','3<sup><i>xy</i></sup>','9<sup><i>x</i>+<i>y</i></sup>','9<sup><i>xy</i></sup>'], ans:0, why:'Un produit de puissances de même base s’écrit avec la somme des exposants : 3ˣ · 3ʸ = 3^(x+y). Vérifie avec x = y = 1 : 3 · 3 = 9 = 3².'},
   {q:'Que vaut 8<sup>2/3</sup> · 2<sup>−1</sup> ?', lab:'valeur =', ans:2, why:'8^(2/3) = (8^(1/3))² = 2² = 4, et 2⁻¹ = 1/2. Produit : 4/2 = 2.'},
   {q:'Pour <i>a</i> &gt; 0 et <i>x</i>, <i>y</i> réels, laquelle de ces égalités est <b>fausse</b> ?', opts:['<i>a</i><sup><i>x</i>−<i>y</i></sup> = <i>a</i><sup><i>x</i></sup>/<i>a</i><sup><i>y</i></sup>','(<i>ab</i>)<sup><i>x</i></sup> = <i>a</i><sup><i>x</i></sup><i>b</i><sup><i>x</i></sup>','<i>a</i><sup><i>x</i></sup> + <i>a</i><sup><i>y</i></sup> = <i>a</i><sup><i>x</i>+<i>y</i></sup>','<i>a</i><sup>−<i>x</i></sup> = 1/<i>a</i><sup><i>x</i></sup>'], ans:2, why:'Une somme de puissances ne se simplifie pas : 2¹ + 2¹ = 4 alors que 2² = 4 marche par hasard, mais 2¹ + 2² = 6 ≠ 2³ = 8. Les trois autres sont les règles du cours.'},
 ]},
 {n:'Sens de variation de l’exponentielle de base a', r:'La fonction exponentielle de base a', qs:[
   {q:'Sans calculatrice : lequel est le plus grand, 0,7<sup>3,2</sup> ou 0,7<sup>2,9</sup> ?', opts:['0,7<sup>3,2</sup>','0,7<sup>2,9</sup>','Ils sont égaux','Impossible à dire sans calculer'], ans:1, why:'La base 0,7 est inférieure à 1 : exp₀,₇ est décroissante. Un exposant plus petit donne une valeur plus grande, donc 0,7^2,9 > 0,7^3,2.'},
   {q:'La courbe de <i>x</i> ↦ <i>a</i><sup><i>x</i></sup> passe par le point (3 ; 1/8). Que vaut <i>a</i> ?', lab:'a =', ans:.5, why:'a³ = 1/8 = (1/2)³, donc a = 1/2 (la base est positive et la fonction cube est injective).'},
   {q:'La courbe de <i>x</i> ↦ <i>a</i><sup><i>x</i></sup> passe par (−2 ; 1/9). Que vaut <i>a</i> ?', lab:'a =', ans:3, why:'a⁻² = 1/9 ⇔ a² = 9 ⇔ a = 3, puisque a > 0.'},
   {q:'Pour tout <i>a</i> &gt; 0, <i>a</i> ≠ 1, laquelle de ces affirmations est vraie ?', opts:['<i>a</i><sup><i>x</i></sup> est négatif pour <i>x</i> &lt; 0','La courbe de <i>x</i> ↦ <i>a</i><sup><i>x</i></sup> passe par (0 ; 1)','<i>a</i><sup><i>x</i></sup> = 0 pour un certain <i>x</i>','<i>x</i> ↦ <i>a</i><sup><i>x</i></sup> est croissante'], ans:1, why:'a⁰ = 1 pour toute base. aˣ est toujours strictement positif, jamais nul, et la fonction est décroissante si a < 1.'},
 ]},
 {n:'Calculer un logarithme', r:'Le logarithme de base a', qs:[
   {q:`Que vaut ${lg(2,'32')} ?`, lab:'log₂ 32 =', ans:5, why:'2⁵ = 32, donc l’exposant cherché est 5.'},
   {q:`Que vaut ${lg(5,'(1/125)')} ?`, lab:'valeur =', ans:-3, why:'125 = 5³, donc 1/125 = 5⁻³ et log₅(1/125) = −3.'},
   {q:`Que vaut ${lg(4,'8')} ?`, lab:'valeur =', ans:1.5, why:'4^(3/2) = (√4)³ = 2³ = 8, donc log₄ 8 = 3/2.'},
   {q:`Que vaut ${lg('1/3','9')} ?`, lab:'valeur =', ans:-2, why:'(1/3)⁻² = 3² = 9, donc log_{1/3} 9 = −2. En base inférieure à 1, un nombre plus grand que 1 a un logarithme négatif.'},
   {q:`Que vaut ${lg(3,'(−9)')} ?`, opts:['−2','2','Il n’existe pas','0'], ans:2, why:'3ˣ est toujours strictement positif : aucun exposant ne donne −9. Le logarithme d’un nombre négatif n’est pas défini.'},
 ]},
 {n:'Propriétés du logarithme et simplification', r:'Simplifier une expression avec des logarithmes', qs:[
   {q:`Que vaut ${lg(2,'40')} − ${lg(2,'5')} ?`, lab:'valeur =', ans:3, why:'Différence de logarithmes : log₂(40/5) = log₂ 8 = 3.'},
   {q:`Que vaut 3 ${lg(2,'4')} − ${lg(2,'8')} ?`, lab:'valeur =', ans:3, why:'3 log₂ 4 = log₂ 4³ = log₂ 64, puis log₂(64/8) = log₂ 8 = 3. Ou directement : 3 · 2 − 3 = 3.'},
   {q:`Que vaut ${lg(5,'2')} + ${lg(5,'12,5')} ?`, lab:'valeur =', ans:2, why:'Somme de logarithmes : log₅(2 · 12,5) = log₅ 25 = 2.'},
   {q:`Que vaut ${lg(3,'√27')} ?`, lab:'valeur =', ans:1.5, why:'√27 = 27^(1/2), donc log₃ √27 = ½ log₃ 27 = ½ · 3 = 3/2.'},
   {q:`Un élève écrit ${lg(2,'(8 + 8)')} = ${lg(2,'8')} + ${lg(2,'8')} = 6. Que vaut en réalité ${lg(2,'(8 + 8)')} ?`, lab:'valeur =', ans:4, why:'8 + 8 = 16 = 2⁴, donc log₂ 16 = 4. Le logarithme d’une somme n’est pas la somme des logarithmes ; la règle vaut pour un produit : log₂(8 · 8) = 6.'},
 ]},
 {n:'Changement de base', r:'Changer de base', qs:[
   {q:`Que vaut ${lg(8,'16')} ? Donne une fraction.`, lab:'valeur =', ans:4/3, tol:1e-6, show:'4/3', why:'En base 2 : log₂ 16 / log₂ 8 = 4/3. Vérification : 8^(4/3) = (8^(1/3))⁴ = 2⁴ = 16.'},
   {q:`Que vaut ${lg(9,'27')} ?`, lab:'valeur =', ans:1.5, why:'log₃ 27 / log₃ 9 = 3/2. Vérification : 9^(3/2) = 3³ = 27.'},
   {q:`Que vaut ${lg(3,'5')} · ${lg(5,'3')} ?`, lab:'valeur =', ans:1, why:'log₅ 3 = 1/log₃ 5 (changement de base avec x = a), donc le produit vaut 1.'},
   {q:`Avec une calculatrice qui ne connaît que log<sub>10</sub>, comment calculer ${lg(7,'50')} ?`, opts:[`${lg(10,'(50/7)')}`,`${lg(10,'50')} − ${lg(10,'7')}`,`${lg(10,'50')} / ${lg(10,'7')}`,`${lg(10,'7')} / ${lg(10,'50')}`], ans:2, why:'Formule de changement de base : log₇ 50 = log₁₀ 50 / log₁₀ 7 ≈ 1,699/0,845 ≈ 2,01. Les deux premières options valent log₁₀(50/7), ce qui est autre chose.'},
 ]},
 {n:'Équations exponentielles', r:'Résoudre une équation exponentielle', qs:[
   {q:`Résous 3<sup>2${x} − 1</sup> = 27.`, lab:'x =', ans:2, why:'27 = 3³, donc 2x − 1 = 3 (exp₃ est injective), soit x = 2.'},
   {q:`Résous 2<sup>${x}</sup> · 4<sup>${x} + 1</sup> = 128. Donne une fraction.`, lab:'x =', ans:5/3, tol:1e-6, show:'5/3', why:'4^(x+1) = 2^(2x+2), donc le membre de gauche vaut 2^(3x+2). Avec 128 = 2⁷ : 3x + 2 = 7, x = 5/3.'},
   {q:`L’équation 4<sup>${x}</sup> − 5 · 2<sup>${x}</sup> + 4 = 0 a deux solutions. Quelle est leur somme ?`, lab:'somme =', ans:2, why:'Avec y = 2ˣ : y² − 5y + 4 = 0, donc y = 1 ou y = 4, soit x = 0 ou x = 2. Somme : 2.'},
   {q:`Quelle est la solution de 2<sup>${x}</sup> = 10 ?`, opts:['<i>x</i> = 5','<i>x</i> = log<sub>2</sub> 10','<i>x</i> = log<sub>10</sub> 2','Il n’y en a pas'], ans:1, why:'Par définition du logarithme, 2ˣ = 10 ⇔ x = log₂ 10 ≈ 3,32. Toute valeur positive est atteinte par 2ˣ, une seule fois.'},
 ]},
 {n:'Inéquations exponentielles', r:'Résoudre une inéquation exponentielle', qs:[
   {q:`Quel est l’ensemble des solutions de (1/3)<sup>${x}</sup> &gt; 81 ?`, opts:['<i>x</i> &gt; 4','<i>x</i> &lt; 4','<i>x</i> &gt; −4','<i>x</i> &lt; −4'], ans:3, why:'81 = 3⁴ = (1/3)⁻⁴. La base 1/3 est inférieure à 1, donc l’inégalité se renverse : x < −4. Contrôle : x = −5 donne 3⁵ = 243 > 81.'},
   {q:`Quelle est la plus grande valeur de ${x} vérifiant 2<sup>3${x}</sup> ≤ 1/16 ? Donne une fraction.`, lab:'x =', ans:-4/3, tol:1e-6, show:'−4/3', why:'1/16 = 2⁻⁴. Base 2 > 1 : 3x ≤ −4, soit x ≤ −4/3. La plus grande valeur est −4/3.'},
   {q:`Quel est le plus petit entier <i>n</i> tel que 2<sup><i>n</i></sup> &gt; 1000 ?`, lab:'n =', ans:10, why:'2⁹ = 512 < 1000 et 2¹⁰ = 1024 > 1000. Comme exp₂ est croissante, n = 10 est le premier entier qui convient.'},
 ]},
];
})();
