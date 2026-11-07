/* Déclic — examen de compétence : Multiples, diviseurs et nombres premiers */
(()=>{
EXAMS['sec9-divisibilite']=[
 {n:'Multiples et diviseurs', r:'Multiples et diviseurs', qs:[
   {q:'Lequel de ces nombres est un diviseur de 42 ?', opts:['8','12','14','84'], ans:2, why:'42 = 14 × 3 : la division 42 : 14 tombe juste. 42 : 8 et 42 : 12 laissent un reste, et 84 est un multiple de 42, pas un diviseur.'},
   {q:'Combien le nombre 30 a-t-il de diviseurs ?', lab:'diviseurs :', ans:8, why:'Par paires : 1 × 30, 2 × 15, 3 × 10, 5 × 6. Les diviseurs sont 1, 2, 3, 5, 6, 10, 15, 30 : il y en a 8.'},
   {q:'Quel est le plus petit multiple de 7 plus grand que 100 ?', ans:105, why:'100 = 7 × 14 + 2. Le multiple suivant est 7 × 15 = 105.'},
   {q:'Combien y a-t-il de multiples de 6 entre 1 et 100 ?', ans:16, why:'Ce sont 6 × 1, 6 × 2, …, 6 × 16 = 96. Le suivant, 6 × 17 = 102, dépasse 100. Il y en a 16.'},
   {q:'Laquelle de ces affirmations est vraie ?', opts:['0 est un diviseur de 5','0 est un multiple de 5','5 a une infinité de diviseurs','1 n’est un diviseur que de lui-même'], ans:1, why:'0 = 5 × 0, donc 0 est un multiple de 5 (et de tout nombre). On ne divise jamais par 0, 5 n’a que deux diviseurs (1 et 5), et 1 divise tous les nombres.'},
 ]},
 {n:'Critères de divisibilité', r:'Tester la divisibilité d’un nombre', qs:[
   {q:'Lequel de ces nombres est divisible par 4 ?', opts:['1 314','2 718','5 216','3 330'], ans:2, why:'On regarde les deux derniers chiffres : 14, 18 et 30 ne sont pas divisibles par 4, mais 16 = 4 × 4. Donc 5 216 est divisible par 4.'},
   {q:'Lequel de ces nombres est divisible par 9 ?', opts:['3 721','4 518','6 103','2 224'], ans:1, why:'Sommes des chiffres : 3 + 7 + 2 + 1 = 13, 4 + 5 + 1 + 8 = 18, 6 + 1 + 0 + 3 = 10, 2 + 2 + 2 + 4 = 10. Seul 18 est divisible par 9 : c’est 4 518.'},
   {q:'Le nombre 2 475 est divisible par…', opts:['2 et 5','3 et 25','4 et 25','9 et 10'], ans:1, why:'Il finit par 75 : divisible par 25 et 5, pas par 2, 4 ou 10. La somme des chiffres vaut 18 : divisible par 3 (et par 9). Seule la réponse « 3 et 25 » est entièrement juste.'},
   {q:'Dans le nombre 7 2▢4, quel est le plus grand chiffre ▢ qui le rend divisible par 3 ?', ans:8, why:'7 + 2 + 4 = 13. Il faut une somme multiple de 3 : 15, 18 ou 21, donc ▢ = 2, 5 ou 8. Le plus grand est 8 : 7 284 = 3 × 2 428.'},
   {q:'Combien de chiffres ▢ rendent le nombre 45▢ divisible par 4 ?', ans:2, why:'Les deux derniers chiffres forment 5▢. Parmi 50 à 59, seuls 52 = 4 × 13 et 56 = 4 × 14 sont divisibles par 4. Il y a 2 possibilités.'},
   {q:'Un nombre est divisible par 9. Il est alors toujours divisible par…', opts:['6','18','3','27'], ans:2, why:'9 = 3 × 3 : un multiple de 9 est aussi un multiple de 3. Par contre 9 lui-même n’est divisible ni par 6, ni par 18, ni par 27.'},
 ]},
 {n:'Nombres premiers', r:'Les nombres premiers et le crible', qs:[
   {q:'Lequel de ces nombres est premier ?', opts:['87','91','89','93'], ans:2, why:'87 = 3 × 29, 91 = 7 × 13 et 93 = 3 × 31. 89 n’est divisible ni par 2, 3, 5, ni 7, et 11 × 11 = 121 dépasse 89 : il est premier.'},
   {q:'Combien y a-t-il de nombres premiers entre 20 et 40 ?', ans:4, why:'Ce sont 23, 29, 31 et 37. Les autres impairs sont divisibles par 3, 5 ou 7 : 21, 25, 27, 33, 35, 39.'},
   {q:'Laquelle de ces affirmations sur les nombres premiers est vraie ?', opts:['1 est premier','Tous les nombres premiers sont impairs','2 est le seul nombre premier pair','51 est premier'], ans:2, why:'Tout nombre pair plus grand que 2 est divisible par 2, donc pas premier. 1 n’a qu’un diviseur, et 51 = 3 × 17.'},
   {q:'Pour prouver que 113 est premier, jusqu’à quel nombre premier suffit-il d’essayer les divisions ?', opts:['5','7','11','13'], ans:1, why:'On essaie les nombres premiers tant que leur carré ne dépasse pas 113 : 7 × 7 = 49 convient, mais 11 × 11 = 121 dépasse 113. Il suffit d’essayer 2, 3, 5 et 7.'},
   {q:'Dans le crible jusqu’à 100, on a barré les multiples de 2 et de 3 (sauf 2 et 3). Lequel de ces nombres n’est pas barré, mais n’est pourtant pas premier ?', opts:['51','49','57','39'], ans:1, why:'51 = 3 × 17, 57 = 3 × 19 et 39 = 3 × 13 sont déjà barrés. 49 = 7 × 7 n’est divisible ni par 2 ni par 3 : il ne sera barré qu’avec les multiples de 7.'},
 ]},
 {n:'Décomposer en facteurs premiers', r:'Décomposer en produit de facteurs premiers', qs:[
   {q:'Quelle est la décomposition de 84 en produit de facteurs premiers ?', opts:['2 × 42','4 × 21','2² × 3 × 7','2 × 3 × 14'], ans:2, why:'84 : 2 = 42, 42 : 2 = 21, 21 : 3 = 7, 7 : 7 = 1. Donc 84 = 2² × 3 × 7. Les autres écritures contiennent 42, 4, 21 ou 14, qui ne sont pas premiers.'},
   {q:'Quel nombre a pour décomposition 2³ × 3 × 5 ?', ans:120, why:'2³ = 2 × 2 × 2 = 8, puis 8 × 3 × 5 = 120.'},
   {q:'Quel est le plus grand facteur premier de 462 ?', ans:11, why:'462 : 2 = 231, 231 : 3 = 77, 77 : 7 = 11, 11 : 11 = 1. Donc 462 = 2 × 3 × 7 × 11, et le plus grand facteur premier est 11.'},
   {q:'En comptant les répétitions, combien de facteurs premiers y a-t-il dans la décomposition de 360 ?', ans:6, why:'360 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5 : il y a 6 facteurs.'},
   {q:'Un nombre a pour décomposition 2 × 3² × 5. Lequel de ces nombres n’est pas un de ses diviseurs ?', opts:['15','18','45','12'], ans:3, why:'Le nombre vaut 90. 15 = 3 × 5, 18 = 2 × 3² et 45 = 3² × 5 utilisent ses briques. 12 = 2² × 3 demande deux fois le facteur 2 : impossible, 90 : 12 ne tombe pas juste.'},
 ]},
 {n:'pgdc et ppmc avec des listes', r:'pgdc et ppmc par listes', qs:[
   {q:'Calcule pgdc(18 ; 27).', lab:'pgdc =', ans:9, why:'Diviseurs de 18 : 1, 2, 3, 6, 9, 18. Diviseurs de 27 : 1, 3, 9, 27. Le plus grand commun est 9.'},
   {q:'Calcule ppmc(6 ; 8).', lab:'ppmc =', ans:24, why:'Multiples de 8 : 8, 16, 24. 8 et 16 ne sont pas divisibles par 6, mais 24 = 6 × 4. Donc ppmc = 24.'},
   {q:'Pour les nombres 16 et 35, laquelle de ces affirmations est vraie ?', opts:['Leur pgdc est 5','Leur pgdc est 1 : ils sont premiers entre eux','Leur ppmc est 35','Leur pgdc est 16'], ans:1, why:'Diviseurs de 16 : 1, 2, 4, 8, 16. Diviseurs de 35 : 1, 5, 7, 35. Seul 1 est commun. Leur ppmc est alors le produit 16 × 35 = 560.'},
 ]},
 {n:'pgdc et ppmc par décomposition', r:'pgdc et ppmc par décomposition', qs:[
   {q:'On sait que 60 = 2² × 3 × 5 et 126 = 2 × 3² × 7. Calcule le pgdc de 60 et 126.', lab:'pgdc =', ans:6, why:'Facteurs communs 2 et 3, avec le plus petit exposant : 2 × 3 = 6.'},
   {q:'On sait que 60 = 2² × 3 × 5 et 126 = 2 × 3² × 7. Calcule le ppmc de 60 et 126.', lab:'ppmc =', ans:1260, why:'Tous les facteurs avec le plus grand exposant : 2² × 3² × 5 × 7 = 4 × 9 × 35 = 1 260.'},
   {q:'Calcule pgdc(150 ; 225).', lab:'pgdc =', ans:75, why:'150 = 2 × 3 × 5² et 225 = 3² × 5². Facteurs communs 3 et 5, plus petits exposants : 3 × 5² = 75.'},
 ]},
 {n:'Problèmes de pgdc et de ppmc', r:'Résoudre un problème de pgdc ou de ppmc', qs:[
   {q:'Deux phares clignotent : le premier toutes les 8 secondes, le second toutes les 12 secondes. Ils viennent de clignoter ensemble. Dans combien de secondes clignoteront-ils de nouveau ensemble ?', unit:'s', ans:24, why:'« De nouveau ensemble » : c’est un ppmc. Multiples de 12 : 12, 24. 24 = 8 × 3, donc ppmc(8 ; 12) = 24 s.'},
   {q:'Un fleuriste a 45 roses et 75 tulipes. Il fait des bouquets identiques en utilisant toutes les fleurs. Combien de bouquets peut-il faire au maximum ?', lab:'bouquets :', ans:15, why:'Partager sans reste, le plus possible : pgdc(45 ; 75). 45 = 3² × 5 et 75 = 3 × 5², donc pgdc = 3 × 5 = 15 bouquets.'},
   {q:'On coupe deux rubans de 84 cm et de 126 cm en morceaux tous de même longueur, les plus longs possible, sans chute. Quelle est la longueur d’un morceau ?', unit:'cm', ans:42, why:'84 = 2² × 3 × 7 et 126 = 2 × 3² × 7. pgdc = 2 × 3 × 7 = 42 cm (2 morceaux et 3 morceaux).'},
   {q:'Deux coureurs partent ensemble de la ligne. L’un fait un tour de piste en 6 min, l’autre en 8 min. Pour savoir quand ils repasseront ensemble sur la ligne, on calcule…', opts:['le pgdc de 6 et 8','6 + 8','6 × 8 − 6','le ppmc de 6 et 8'], ans:3, why:'Ils repassent ensemble à un multiple commun des deux durées, le plus petit : ppmc(6 ; 8) = 24 min.'},
 ]},
];
})();
