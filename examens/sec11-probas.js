/* Déclic — examen de compétence : Probabilités */
(()=>{
EXAMS['sec11-probas']=[
 {n:'Calculer une probabilité en comptant', r:'Calculer une probabilité en comptant', qs:[
   {q:'On lance un dé équilibré à 12 faces numérotées de 1 à 12. Quelle est la probabilité d’obtenir un multiple de 4 ?', lab:'P =', ans:.25, tol:.001, why:`Multiples de 4 : 4, 8, 12, soit 3 cas sur 12. P = ${F(3,12)} = ${F(1,4)} = 0,25.`},
   {q:'On écrit chaque lettre du mot PROBABILITE sur un carton, puis on tire un carton au hasard. Quelle est la probabilité d’obtenir la lettre B ?', lab:'P =', ans:2/11, tol:.001, show:'2/11', why:`Le mot a 11 lettres, dont 2 B. P = ${F(2,11)} ≈ 0,18.`},
   {q:'Une roue a 10 secteurs égaux, dont 4 jaunes. Quelle est la probabilité, en pourcentage, de tomber sur du jaune ?', lab:'P =', unit:'%', ans:40, why:`P = ${F(4,10)} = 0,4 = 40 %.`},
   {q:'On tire une carte au hasard dans un jeu de jass de 36 cartes (4 couleurs de 9 cartes : 6, 7, 8, 9, 10, valet, dame, roi, as). Quelle est la probabilité d’obtenir un roi ou une dame ?', lab:'P =', ans:2/9, tol:.001, show:'2/9', why:`4 rois et 4 dames : 8 cas favorables sur 36. P = ${F(8,36)} = ${F(2,9)} ≈ 0,22.`},
   {q:'On lance un dé à 6 faces. L’événement « obtenir un nombre plus grand que 6 » est…', opts:['certain','impossible','équiprobable','le contraire de « obtenir 6 »'], ans:1, why:'Aucune face ne porte un nombre plus grand que 6 : l’événement ne contient aucune issue, il est impossible et sa probabilité vaut 0.'},
   {q:'On lance deux dés et on note la somme. Il y a 11 sommes possibles (de 2 à 12). Pourquoi P(somme = 2) n’est-elle pas égale à 1/11 ?', opts:['Parce qu’il y a en fait 12 sommes possibles','Parce que les 11 sommes ne sont pas équiprobables','Parce qu’une probabilité ne peut pas valoir 1/11','Parce que la somme 2 est impossible'], ans:1, why:'La formule « favorables sur possibles » exige des issues équiprobables. La somme 2 ne vient que de (1 ; 1), la somme 7 de six cases : P(somme = 2) = 1/36.'},
 ]},
 {n:'Événement contraire', r:'Passer par l’événement contraire', qs:[
   {q:'Pour un événement A, P(A) = 0,35. Que vaut P(Ā) ?', lab:'P(Ā) =', ans:.65, tol:.001, why:'P(Ā) = 1 − P(A) = 1 − 0,35 = 0,65.'},
   {q:'On tire au hasard un numéro de 1 à 60. Quelle est la probabilité qu’il ne soit pas un multiple de 5 ?', lab:'P =', ans:.8, tol:.001, why:`Il y a 12 multiples de 5 jusqu’à 60 (5, 10, …, 60). P(multiple de 5) = ${F(12,60)} = 0,2, donc P(pas multiple de 5) = 1 − 0,2 = 0,8.`},
   {q:'On tire au hasard un nombre entier de 1 à 100. Quelle est la probabilité qu’il ne soit pas un carré parfait ?', lab:'P =', ans:.9, tol:.001, why:`Carrés parfaits : 1, 4, 9, …, 100, soit 10 nombres. P = 1 − ${F(10,100)} = 0,9.`},
   {q:'On lance un dé deux fois. Quel est le contraire de l’événement « obtenir au moins un 6 » ?', opts:['obtenir deux 6','n’obtenir aucun 6','obtenir exactement un 6','obtenir au moins un 1'], ans:1, why:'« Au moins un 6 » regroupe un 6 ou deux 6. Toutes les autres issues sont celles sans aucun 6 : c’est le contraire.'},
 ]},
 {n:'Tableau à double entrée', r:'Le tableau à double entrée', qs:[
   {q:'On lance deux dés. Quelle est la probabilité que la somme vaille 9 ?', lab:'P =', ans:1/9, tol:.001, show:'1/9', why:`Cases : 3 + 6, 4 + 5, 5 + 4, 6 + 3, soit 4 sur 36. P = ${F(4,36)} = ${F(1,9)}.`},
   {q:'On lance deux dés. Quelle est la probabilité d’obtenir un double (deux fois le même nombre) ?', lab:'P =', ans:1/6, tol:.001, show:'1/6', why:`Les doubles forment la diagonale du tableau : 6 cases sur 36. P = ${F(6,36)} = ${F(1,6)}.`},
   {q:'On lance deux dés. Quelle est la probabilité que la somme soit un multiple de 5 ?', lab:'P =', ans:7/36, tol:.001, show:'7/36', why:`Somme 5 : 4 cases (1 + 4, 2 + 3, 3 + 2, 4 + 1). Somme 10 : 3 cases. En tout 7 cases : P = ${F(7,36)}.`},
   {q:'On lance deux dés et on calcule l’écart entre les deux nombres (le plus grand moins le plus petit). Quelle est la probabilité que l’écart vaille 1 ?', lab:'P =', ans:5/18, tol:.001, show:'5/18', why:`Paires (1 ; 2), (2 ; 3), (3 ; 4), (4 ; 5), (5 ; 6), et chacune dans les deux ordres : 10 cases. P = ${F(10,36)} = ${F(5,18)}.`},
   {q:'On lance une pièce et un dé. Quelle est la probabilité d’obtenir face et un nombre premier ?', lab:'P =', ans:.25, tol:.001, why:`Le tableau a 2 · 6 = 12 cases. Nombres premiers du dé : 2, 3, 5. Cases favorables : 3. P = ${F(3,12)} = ${F(1,4)}.`},
 ]},
 {n:'Arbres, avec et sans remise', r:'Tirer avec ou sans remise', qs:[
   {q:'Un sac contient 2 billes rouges et 3 bleues. On tire deux billes <b>avec remise</b>. Quelle est la probabilité d’obtenir deux rouges ?', lab:'P =', ans:.16, tol:.001, why:`${F(2,5)} · ${F(2,5)} = ${F(4,25)} = 0,16 : le sac est le même aux deux tirages.`},
   {q:'Un sac contient 2 billes rouges et 3 bleues. On tire deux billes <b>sans remise</b>. Quelle est la probabilité d’obtenir deux rouges ?', lab:'P =', ans:.1, tol:.001, why:`Après une rouge, il reste 1 rouge sur 4 billes : ${F(2,5)} · ${F(1,4)} = ${F(2,20)} = 0,1.`},
   {q:'Un sac contient 2 billes rouges et 3 bleues. On tire deux billes sans remise. Quelle est la probabilité d’obtenir une bille de chaque couleur ?', lab:'P =', ans:.6, tol:.001, why:`Deux chemins : R puis B, ${F(2,5)} · ${F(3,4)} = ${F(6,20)} ; B puis R, ${F(3,5)} · ${F(2,4)} = ${F(6,20)}. On additionne : ${F(12,20)} = 0,6.`},
   {q:'On lance une pièce, puis on tourne une roue de 4 secteurs égaux dont 1 rouge. Quelle est la probabilité d’obtenir pile, puis rouge ?', lab:'P =', ans:.125, tol:.001, why:`On multiplie le long du chemin : ${F(1,2)} · ${F(1,4)} = ${F(1,8)} = 0,125.`},
   {q:'Dans un groupe de 4 filles et 2 garçons, on tire au sort deux délégués, l’un après l’autre. Quelle est la probabilité que ce soient deux garçons ?', lab:'P =', ans:1/15, tol:.001, show:'1/15', why:`C’est un tirage sans remise : ${F(2,6)} · ${F(1,5)} = ${F(2,30)} = ${F(1,15)}.`},
   {q:'Dans un arbre de probabilités, comment obtient-on la probabilité d’un chemin ?', opts:['On additionne les probabilités de ses branches','On multiplie les probabilités de ses branches','On garde la plus petite probabilité','On divise par le nombre de branches'], ans:1, why:'On multiplie le long d’un chemin : par exemple, la moitié des fois, puis un tiers de ces fois-là, donne 1/2 · 1/3 = 1/6. On additionne seulement entre chemins différents.'},
 ]},
 {n:'Fréquence et loi des grands nombres', r:'Fréquence et loi des grands nombres', qs:[
   {q:'On a lancé un dé 200 fois et obtenu 46 fois le 6. Quelle est la fréquence du 6 ?', lab:'fréquence =', ans:.23, tol:.001, why:`Fréquence = ${F(46,200)} = 0,23.`},
   {q:'On lance un dé équilibré 900 fois. Combien de 6 peut-on s’attendre à obtenir, environ ?', lab:'nombre ≈', ans:150, why:`La fréquence est proche de la probabilité ${F(1,6)} : 900 · ${F(1,6)} = 150.`},
   {q:'On lance une pièce 10 fois et on obtient 7 piles. Que peut-on dire ?', opts:['La pièce est truquée','On ne peut pas conclure : 10 lancers, c’est trop peu','La probabilité de pile vaut 0,7','Le prochain lancer sera sûrement face'], ans:1, why:'Sur peu d’essais, la fréquence varie beaucoup. La loi des grands nombres ne parle que d’un très grand nombre de répétitions. Et la pièce n’a pas de mémoire.'},
   {q:'On lance une punaise 1000 fois : elle retombe 620 fois pointe en l’air. Quelle valeur proposer pour la probabilité qu’elle retombe pointe en l’air ?', lab:'P ≈', ans:.62, tol:.001, why:`Les issues ne sont pas équiprobables, on ne peut pas compter. Avec beaucoup d’essais, la fréquence ${F(620,1000)} = 0,62 est une bonne estimation de la probabilité.`},
 ]},
 {n:'Jeux équitables', r:'Décider si un jeu est équitable', qs:[
   {q:'On lance deux dés. Anna gagne si la somme est paire, Ben gagne si elle est impaire. Le jeu est-il équitable ?', opts:['Non, Anna est avantagée car 2 et 12 sont pairs','Oui, chacun a 18 cases sur 36','Non, Ben est avantagé','On ne peut pas le savoir sans jouer'], ans:1, why:'Dans le tableau des sommes, 18 cases sont paires et 18 impaires : chacun a la probabilité 1/2.'},
   {q:'On lance un dé. Anna gagne avec 1 ou 2, Ben gagne avec 4 ou 5. Avec 3 ou 6, on relance. Le jeu est-il équitable ?', opts:['Oui, il est équitable','Non, il avantage Anna','Non, il avantage Ben','Non, car on doit parfois relancer'], ans:0, why:'À chaque lancer, Anna et Ben ont chacun 2 faces sur 6, et les relances ne favorisent personne : ils ont la même probabilité de gagner.'},
   {q:'Tu paies 1 CHF, puis tu lances un dé. Si tu obtiens 5 ou 6, tu reçois un prix. Quel prix rend le jeu équitable ?', unit:'CHF', ans:3, why:'Sur 6 parties, tu paies 6 CHF et tu gagnes en moyenne 2 fois. Il faut 2 · prix = 6, donc un prix de 3 CHF.'},
   {q:'Une roue a 5 secteurs égaux, dont 1 gagnant. Une partie coûte 2 CHF. Quel prix rend le jeu équitable ?', unit:'CHF', ans:10, why:'Sur 5 parties, tu paies 10 CHF et tu gagnes en moyenne une fois. Le prix équitable est 10 CHF.'},
   {q:'Tu paies 2 CHF, puis tu lances un dé. Si tu obtiens 6, tu reçois 5 CHF. Combien perds-tu en moyenne par partie ? Arrondis au centime.', unit:'CHF', ans:7/6, tol:.01, why:'Sur 6 parties : tu paies 12 CHF et tu reçois en moyenne une fois 5 CHF. Tu perds 7 CHF en 6 parties, soit 7 : 6 ≈ 1,17 CHF par partie.'},
 ]},
];
})();
