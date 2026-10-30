/* Déclic — examen de compétence : Exponentielles et logarithmes */
(()=>{
EXAMS['explog']=[
 {n:'Lire une fonction exponentielle', r:'Multiplier à chaque pas', qs:[
   {q:'On pose <i>f</i>(<i>x</i>) = 3·2<sup><i>x</i></sup>. Combien vaut <i>f</i>(−1) ?', ans:1.5, tol:.001, why:'2<sup>−1</sup> = ½, donc <i>f</i>(−1) = 3 · ½ = 1,5. Reculer de 1, c’est diviser par le facteur 2.'},
   {q:'Une fonction <i>f</i>(<i>x</i>) = <i>a</i>·<i>b</i><sup><i>x</i></sup> vérifie <i>f</i>(0) = 5 et <i>f</i>(1) = 15. Combien vaut <i>f</i>(3) ?', ans:135, why:'<i>a</i> = <i>f</i>(0) = 5 et <i>b</i> = 15/5 = 3. Donc <i>f</i>(3) = 5 · 3³ = 135.'},
   {q:'Une fonction <i>f</i>(<i>x</i>) = <i>a</i>·<i>b</i><sup><i>x</i></sup> avec <i>b</i> > 0 vérifie <i>f</i>(0) = 200 et <i>f</i>(2) = 50. Combien vaut <i>f</i>(3) ?', ans:25, why:'<i>b</i>² = 50/200 = 0,25, donc <i>b</i> = 0,5. Alors <i>f</i>(3) = 200 · 0,5³ = 25.'},
   {q:'Comment se comporte <i>y</i> = 4·0,5<sup><i>x</i></sup> quand <i>x</i> augmente ?', opts:['Elle croît de plus en plus vite','Elle décroît et devient négative','Elle décroît en se rapprochant de 0','Elle reste constante'], ans:2, why:'Le facteur 0,5 est plus petit que 1 : on divise par 2 à chaque pas. Les valeurs restent positives et se rapprochent de 0.'},
 ]},
 {n:'Modéliser un pourcentage', r:'Modéliser une évolution en pourcentage', qs:[
   {q:'Une quantité baisse de 8 % par an. Par quel facteur est-elle multipliée chaque année ?', opts:['0,08','1,08','0,92','−0,08'], ans:2, why:'Une baisse de 8 % garde 92 % : <i>b</i> = 1 − 8/100 = 0,92.'},
   {q:'Tu places 800 CHF à 3 % par an, intérêts composés. Combien as-tu après 4 ans ? (au centime)', unit:'CHF', ans:900.41, tol:.006, why:'<i>b</i> = 1,03 et 800 · 1,03⁴ ≈ 900,41 CHF.'},
   {q:'Une machine de 25 000 CHF perd 12 % de sa valeur par an. Que vaut-elle après 3 ans ? (au franc)', unit:'CHF', ans:17036.8, tol:.6, why:'<i>b</i> = 0,88 et 25 000 · 0,88³ = 17 036,80 CHF.'},
   {q:'Un article à 200 CHF augmente de 10 %, puis baisse de 10 %. Quel est son prix final ?', unit:'CHF', ans:198, why:'Les facteurs se multiplient : 200 · 1,1 · 0,9 = 200 · 0,99 = 198 CHF. Les deux pourcentages ne se compensent pas.'},
   {q:'Une population passe de 400 à 484 individus en 2 ans, avec le même pourcentage de hausse chaque année. Quel est ce pourcentage ?', unit:'%', ans:10, why:'400 · <i>b</i>² = 484 donne <i>b</i>² = 1,21, donc <i>b</i> = 1,1 : une hausse de 10 % par an.'},
 ]},
 {n:'Calculer un logarithme', r:'Calculer un logarithme', qs:[
   {q:'Combien vaut log₅(125) ?', ans:3, why:'5³ = 125, donc log₅(125) = 3.'},
   {q:'Combien vaut log₂(1/8) ?', ans:-3, why:'1/8 = 2<sup>−3</sup>, donc log₂(1/8) = −3.'},
   {q:'Combien vaut log₄(2) ?', ans:0.5, tol:.001, why:'4<sup>1/2</sup> = √4 = 2, donc log₄(2) = ½.'},
   {q:'Calcule log₃(50) au centième.', ans:3.56, tol:.011, why:'log₃(50) = ln 50 / ln 3 ≈ 3,912 / 1,099 ≈ 3,56. Contrôle : 3³ = 27 < 50 < 81 = 3⁴.'},
   {q:'Entre quels entiers consécutifs se trouve log₂(50) ?', opts:['4 et 5','5 et 6','6 et 7','25 et 26'], ans:1, why:'2⁵ = 32 < 50 < 64 = 2⁶, donc log₂(50) est entre 5 et 6 (≈ 5,64).'},
 ]},
 {n:'Lois des logarithmes', r:'Calculer un logarithme', qs:[
   {q:'Combien vaut log₂(12) − log₂(3) ?', ans:2, why:'log₂(12) − log₂(3) = log₂(12/3) = log₂(4) = 2.'},
   {q:'Combien vaut log₆(4) + log₆(9) ?', ans:2, why:'log₆(4) + log₆(9) = log₆(36) = 2, car 6² = 36.'},
   {q:'Combien vaut log₃(9⁵) ?', ans:10, why:'log(<i>x</i>ⁿ) = <i>n</i> · log <i>x</i> : 5 · log₃(9) = 5 · 2 = 10.'},
   {q:'On sait que log₂(<i>a</i>) = 5. Combien vaut log₂(<i>a</i>³) ?', ans:15, why:'L’exposant descend : log₂(<i>a</i>³) = 3 · log₂(<i>a</i>) = 15.'},
   {q:'Laquelle de ces égalités est <b>fausse</b> en général ?', opts:['log(<i>xy</i>) = log <i>x</i> + log <i>y</i>','log(<i>x</i> + <i>y</i>) = log <i>x</i> + log <i>y</i>','log(<i>x</i>/<i>y</i>) = log <i>x</i> − log <i>y</i>','log(<i>x</i>ⁿ) = <i>n</i> · log <i>x</i>'], ans:1, why:'Le logarithme transforme un produit en somme, pas une somme en somme. Par exemple log₁₀(1 + 1) ≈ 0,301 alors que log₁₀ 1 + log₁₀ 1 = 0.'},
 ]},
 {n:'Résoudre une équation exponentielle', r:'Passer au logarithme pour résoudre', qs:[
   {q:'Résous 3<sup><i>x</i></sup> = 40 (au centième).', lab:'x =', ans:3.36, tol:.011, why:'<i>x</i> · ln 3 = ln 40, donc <i>x</i> = ln 40 / ln 3 ≈ 3,36.'},
   {q:'Résous 5 · 1,5<sup><i>x</i></sup> = 60 (au centième).', lab:'x =', ans:6.13, tol:.011, why:'On isole la puissance : 1,5<sup><i>x</i></sup> = 12. Puis <i>x</i> = ln 12 / ln 1,5 ≈ 6,13.'},
   {q:'Résous 2<sup><i>x</i></sup> = 0,3 (au centième).', lab:'x =', ans:-1.74, tol:.011, why:'<i>x</i> = ln 0,3 / ln 2 ≈ −1,204 / 0,693 ≈ −1,74. Le résultat est négatif car 0,3 < 1 = 2⁰.'},
   {q:'Quel est le plus petit entier <i>n</i> tel que 0,7ⁿ < 0,1 ?', lab:'n =', ans:7, why:'<i>n</i> · ln 0,7 < ln 0,1. Comme ln 0,7 < 0, on retourne le sens : <i>n</i> > ln 0,1 / ln 0,7 ≈ 6,46. Donc <i>n</i> = 7.'},
   {q:'On résout 0,6ⁿ ≥ 0,2. Quelle est la bonne conclusion ?', opts:['<i>n</i> ≥ ln 0,2 / ln 0,6','<i>n</i> ≤ ln 0,6 / ln 0,2','<i>n</i> ≥ ln 0,6 / ln 0,2','<i>n</i> ≤ ln 0,2 / ln 0,6'], ans:3, why:'<i>n</i> · ln 0,6 ≥ ln 0,2. On divise par ln 0,6 < 0, ce qui retourne le sens : <i>n</i> ≤ ln 0,2 / ln 0,6 ≈ 3,15.'},
   {q:'Tu places 2 000 CHF à 2,5 % par an, intérêts composés. Après combien d’années entières dépasses-tu 3 000 CHF ?', unit:'ans', ans:17, why:'1,025ⁿ ≥ 1,5 donne <i>n</i> ≥ ln 1,5 / ln 1,025 ≈ 16,42. Il faut donc 17 ans.'},
 ]},
 {n:'Temps de doublement et demi-vie', r:'Passer au logarithme pour résoudre', qs:[
   {q:'Une quantité augmente de 7 % par an. Quel est son temps de doublement ? (au centième)', unit:'ans', ans:10.24, tol:.011, why:'1,07ⁿ = 2 donne <i>n</i> = ln 2 / ln 1,07 ≈ 10,24 ans.'},
   {q:'Une substance perd 15 % de sa masse par heure. Quelle est sa demi-vie ? (au centième)', unit:'h', ans:4.27, tol:.011, why:'0,85ᵗ = 0,5 donne <i>t</i> = ln 0,5 / ln 0,85 ≈ 4,27 h.'},
   {q:'Deux placements au même taux partent l’un de 1 000 CHF, l’autre de 5 000 CHF. Lequel double le plus vite ?', opts:['Celui de 1 000 CHF','Celui de 5 000 CHF','Les deux en même temps','Cela dépend du nombre d’années'], ans:2, why:'Doubler revient à résoudre <i>b</i>ⁿ = 2 : la quantité de départ s’élimine. Le temps de doublement ln 2 / ln <i>b</i> ne dépend que du taux.'},
 ]},
];
})();
