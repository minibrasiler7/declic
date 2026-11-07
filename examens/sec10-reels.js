/* Déclic — examen de compétence : Fractions, notation scientifique et racines */
(()=>{
EXAMS['sec10-reels']=[
 {n:'Multiplier et diviser des fractions',r:'Calculer avec des fractions',qs:[
   {q:`Calcule ${F(2,5)} · ${F(3,4)} (tu peux écrire une fraction comme a/b).`,ans:.3,tol:.001,show:'3/10',why:`${F(2,5)} · ${F(3,4)} = ${F(6,20)} = ${F(3,10)} = 0,3.`},
   {q:`Calcule ${F(5,6)} : ${F(5,12)}.`,ans:2,tol:.001,why:`On multiplie par l’inverse : ${F(5,6)} · ${F(12,5)} = ${F(60,30)} = 2.`},
   {q:`Combien valent les ${F(3,8)} de 120 CHF ?`,unit:'CHF',ans:45,why:'120 : 8 = 15, puis 15 · 3 = 45 CHF.'},
   {q:`Calcule ${F(7,3)} · ${F(9,14)} (tu peux écrire une fraction comme a/b).`,ans:1.5,tol:.001,show:'3/2',why:`On simplifie 7 avec 14 et 9 avec 3 : ${F('1 · 3','1 · 2')} = ${F(3,2)} = 1,5.`},
   {q:`Pour calculer 4 : ${F(2,3)}, on…`,opts:[`calcule 4 · ${F(2,3)}`,`calcule 4 · ${F(3,2)}`,`calcule ${F(3,'4 · 2')}`,`calcule ${F(1,4)} · ${F(2,3)}`],ans:1,why:`Diviser par une fraction, c’est multiplier par son inverse : 4 · ${F(3,2)} = 6. Il y a bien 6 fois deux tiers dans 4.`},
 ]},
 {n:'Pourcentages',r:'Pourcentages : prendre, réduire, augmenter',qs:[
   {q:'Combien valent 20 % de 65 CHF ?',unit:'CHF',ans:13,why:'65 · 20 : 100 = 13 CHF.'},
   {q:'Un vélo à 450 CHF est soldé à −30 %. Quel est son nouveau prix ?',unit:'CHF',ans:315,why:'Rabais : 450 · 30 : 100 = 135 CHF. Nouveau prix : 450 − 135 = 315 CHF.'},
   {q:'Dans une classe, 9 élèves sur 36 ont un chat. Quel pourcentage cela représente-t-il ?',unit:'%',ans:25,why:'9 : 36 = 0,25 = 25/100 = 25 %.'},
   {q:'Un loyer de 1200 CHF augmente de 3 %. Quel est le nouveau loyer ?',unit:'CHF',ans:1236,why:'Augmentation : 1200 · 3 : 100 = 36 CHF. Nouveau loyer : 1200 + 36 = 1236 CHF.'},
   {q:'Un pull à 80 CHF baisse de 10 %, puis son nouveau prix augmente de 10 %. Quel est le prix final ?',opts:['80 CHF','79,20 CHF','88 CHF','72 CHF'],ans:1,why:'Après la baisse : 80 − 8 = 72 CHF. Puis 10 % de 72 = 7,20 CHF, donc 72 + 7,20 = 79,20 CHF. La hausse porte sur un prix plus petit : on ne revient pas à 80 CHF.'},
 ]},
 {n:'Exposants négatifs et puissances de 10',r:'Puissances de 10 et exposants négatifs',qs:[
   {q:'Écris 10⁻³ en écriture décimale.',ans:.001,tol:1e-9,why:'10⁻³ = 1/10³ = 1/1000 = 0,001.'},
   {q:'Calcule 2⁻².',ans:.25,tol:1e-9,why:'2⁻² = 1/2² = 1/4 = 0,25.'},
   {q:'On écrit 10⁷ · 10⁻⁴ = 10<sup><i>n</i></sup>. Que vaut <i>n</i> ?',lab:'n =',ans:3,why:'On additionne les exposants : 7 + (−4) = 3.'},
   {q:'Le nombre 10⁻⁵ est…',opts:['un nombre négatif','égal à −100 000','égal à 0,000 01','égal à 0,000 001'],ans:2,why:'10⁻⁵ = 1/100 000 = 0,000 01 : le 1 est au 5e rang après la virgule. C’est un petit nombre positif.'},
 ]},
 {n:'Notation scientifique',r:'Écrire et calculer en notation scientifique',qs:[
   {q:'Quelle est l’écriture scientifique de 3 800 000 ?',opts:['38 · 10⁵','3,8 · 10⁶','3,8 · 10⁵','0,38 · 10⁷'],ans:1,why:'La virgule se place derrière le 3 : elle recule de 6 rangs. 3 800 000 = 3,8 · 10⁶. 38 · 10⁵ et 0,38 · 10⁷ ont la bonne valeur, mais pas la bonne forme.'},
   {q:'Quelle est l’écriture scientifique de 0,000 504 ?',opts:['5,04 · 10⁻⁴','5,04 · 10⁴','50,4 · 10⁻⁵','5,04 · 10⁻³'],ans:0,why:'La virgule se place derrière le 5 : elle avance de 4 rangs, le nombre est plus petit que 1. 0,000 504 = 5,04 · 10⁻⁴.'},
   {q:'On calcule (2 · 10⁴) · (3 · 10⁵) = 6 · 10<sup><i>n</i></sup>. Que vaut <i>n</i> ?',lab:'n =',ans:9,why:'(2 · 3) · 10⁴⁺⁵ = 6 · 10⁹.'},
   {q:'On calcule (8 · 10⁹) : (4 · 10³) = 2 · 10<sup><i>n</i></sup>. Que vaut <i>n</i> ?',lab:'n =',ans:6,why:'(8 : 4) · 10⁹⁻³ = 2 · 10⁶.'},
   {q:'Écris (5 · 10³) · (4 · 10²) en notation scientifique.',opts:['20 · 10⁵','2 · 10⁶','2 · 10⁵','9 · 10⁵'],ans:1,why:'(5 · 4) · 10³⁺² = 20 · 10⁵. Comme 20 = 2 · 10, on obtient 2 · 10⁶.'},
   {q:'Écris 7,2 · 10⁻³ en écriture décimale.',ans:.0072,tol:1e-9,why:'On décale la virgule de 3 rangs vers la gauche : 7,2 · 10⁻³ = 0,0072.'},
 ]},
 {n:'Racines et encadrements',r:'Encadrer une racine',qs:[
   {q:'Calcule ∛125.',ans:5,why:'5³ = 5 · 5 · 5 = 125, donc ∛125 = 5.'},
   {q:'√70 est compris entre deux entiers consécutifs. Donne le plus petit.',ans:8,why:'8² = 64 &lt; 70 &lt; 81 = 9², donc 8 &lt; √70 &lt; 9.'},
   {q:'Encadre √20 entre deux dixièmes consécutifs. Donne la borne de gauche.',ans:4.4,tol:.001,why:'4² = 16 &lt; 20 &lt; 25 = 5². Puis 4,4² = 19,36 &lt; 20 &lt; 20,25 = 4,5². Donc 4,4 &lt; √20 &lt; 4,5.'},
   {q:'∛500 est compris entre deux entiers consécutifs. Donne le plus petit.',ans:7,why:'7³ = 343 &lt; 500 &lt; 512 = 8³, donc 7 &lt; ∛500 &lt; 8.'},
 ]},
 {n:'Ensembles de nombres et irrationnels',r:'Nombres irrationnels et ensembles de nombres',qs:[
   {q:'Lequel de ces nombres est irrationnel ?',opts:['√81','0,121212…','√12',F(5,7)],ans:2,why:'12 n’est pas un carré parfait, donc √12 est irrationnel. √81 = 9 ; 0,1212… se répète, c’est un rationnel ; 5/7 est une fraction.'},
   {q:`Quel est le plus petit ensemble qui contient ${F('−20',5)} ?`,opts:['ℕ','ℤ','ℚ','ℝ'],ans:1,why:'−20/5 = −4 : c’est un entier négatif. Il est dans ℤ mais pas dans ℕ.'},
   {q:'Quelle affirmation est vraie ?',opts:['ℚ ⊂ ℤ','π ∈ ℚ','√2 ∈ ℝ','−3 ∈ ℕ'],ans:2,why:'√2 est un nombre de la droite graduée, donc un réel (irrationnel). ℤ ⊂ ℚ et non l’inverse ; π est irrationnel ; −3 n’est pas un naturel.'},
   {q:`Le nombre ${F(22,7)} est…`,opts:['égal à π','un nombre irrationnel','un rationnel proche de π','un entier'],ans:2,why:'22/7 est une fraction, donc un rationnel : 3,142857… Il est proche de π = 3,14159…, mais pas égal.'},
 ]},
 {n:'Le binaire',r:'Compter en binaire',qs:[
   {q:'Quel nombre s’écrit 10110 en binaire ?',ans:22,why:'Rangs de droite à gauche : 1, 2, 4, 8, 16. 10110 = 16 + 4 + 2 = 22.'},
   {q:'Comment s’écrit 19 en binaire ?',opts:['10011','11001','10101','10010'],ans:0,why:'19 = 16 + 3 = 16 + 2 + 1 : rangs 16, 8, 4, 2, 1 → 1, 0, 0, 1, 1. Donc 10011.'},
   {q:'Quel nombre s’écrit 1000000 en binaire ?',ans:64,why:'Un seul 1, au 7e rang en partant de la droite : sa valeur est 2⁶ = 64.'},
 ]},
];
})();
