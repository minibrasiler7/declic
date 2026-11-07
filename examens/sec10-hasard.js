/* Déclic — examen de compétence : Le hasard */
(()=>{
EXAMS['sec10-hasard']=[
 {n:'Issues et événements',r:'Les événements',qs:[
   {q:'Laquelle de ces expériences est aléatoire ?',opts:['mesurer la longueur d’un banc','lancer un dé à 12 faces','calculer 7 · 8','lire l’heure sur une horloge'],ans:1,why:'Pour le dé, on connaît les 12 issues possibles, mais on ne peut pas prévoir le résultat. Les autres donnent toujours le même résultat.'},
   {q:'Une roue a 10 secteurs numérotés de 1 à 10. Combien d’issues favorables a l’événement « obtenir un multiple de 3 » ?',ans:3,why:'Les multiples de 3 entre 1 et 10 sont 3, 6 et 9 : 3 issues favorables.'},
   {q:'Avec un dé, quel ensemble décrit l’événement « obtenir au moins 5 » ?',opts:['{5}','{6}','{5 ; 6}','{1 ; 2 ; 3 ; 4 ; 5}'],ans:2,why:'« Au moins 5 » veut dire 5 ou plus : {5 ; 6}.'},
   {q:'Avec un dé à 6 faces, l’événement « obtenir un nombre plus grand que 6 » est…',opts:['certain','impossible','une chance sur six','une chance sur deux'],ans:1,why:'Aucune face ne porte un nombre plus grand que 6 : aucune issue favorable, l’événement est impossible.'},
   {q:'On tire au hasard une des 6 lettres du mot BATEAU. Combien d’issues réalisent l’événement « obtenir une voyelle » ?',ans:4,why:'Les voyelles sont A, E, A, U : 4 lettres sur 6. Les deux A sont deux issues différentes.'},
 ]},
 {n:'Fréquence',r:'Calculer une fréquence',qs:[
   {q:'Sur 40 lancers d’une pièce, on a obtenu 18 piles. Quelle est la fréquence de pile, en décimal ?',ans:.45,tol:.001,why:'18 : 40 = 0,45.'},
   {q:'Un dé lancé 200 fois a donné 30 fois le 3. Quelle est la fréquence du 3, en pourcentage ?',unit:'%',ans:15,why:'30 : 200 = 0,15 = 15/100, soit 15 %.'},
   {q:'Une basketteuse réussit 21 tirs sur 28. Quelle est sa fréquence de réussite, en pourcentage ?',unit:'%',ans:75,why:'21 : 28 = 0,75 = 75 %.'},
   {q:'On lance une pièce équilibrée 1000 fois. La fréquence de face sera très probablement…',opts:['exactement 0,5','proche de 0,5','proche de 0,1','égale à 1'],ans:1,why:'Sur un grand nombre de lancers, la fréquence se stabilise près de la probabilité 0,5, sans être forcément exactement égale.'},
 ]},
 {n:'Probabilité avec des issues équiprobables',r:'Calculer une probabilité',qs:[
   {q:'On lance un dé équilibré. Quelle est la probabilité d’obtenir 1 ou 2 ?',lab:'P =',ans:1/3,tol:.001,show:'1/3',why:'2 issues favorables sur 6 : P = 2/6 = 1/3.'},
   {q:'On tire une carte au hasard dans un jeu de 52 cartes. Quelle est la probabilité de tirer un roi ?',lab:'P =',ans:1/13,tol:.001,show:'1/13',why:'Il y a 4 rois : P = 4/52 = 1/13.'},
   {q:'Un sac contient 4 billes rouges, 6 jaunes et 10 bleues. On tire une bille au hasard. Quelle est la probabilité qu’elle soit jaune ?',lab:'P =',ans:.3,tol:.001,show:'3/10',why:'Il y a 4 + 6 + 10 = 20 billes, dont 6 jaunes : P = 6/20 = 3/10 = 0,3.'},
   {q:'Une roue a 8 secteurs égaux numérotés de 1 à 8. Quelle est la probabilité d’obtenir un nombre premier ?',lab:'P =',ans:.5,tol:.001,show:'1/2',why:'Les nombres premiers jusqu’à 8 sont 2, 3, 5 et 7 : P = 4/8 = 1/2.'},
   {q:'Une roue a 3 secteurs : le rouge occupe la moitié de la roue, le bleu et le vert un quart chacun. Quelle est la probabilité de tomber sur rouge ?',opts:['1/3','1/2','1/4','2/3'],ans:1,why:'Les 3 secteurs ne sont pas équiprobables. On imagine 4 quarts égaux : le rouge en couvre 2, donc P(rouge) = 2/4 = 1/2.'},
   {q:'On tire une carte au hasard dans un jeu de 52 cartes. Quelle est la probabilité de tirer une figure (valet, dame ou roi) rouge ?',lab:'P =',ans:3/26,tol:.001,show:'3/26',why:'Les couleurs rouges sont cœur et carreau, avec 3 figures chacune : 6 cartes. P = 6/52 = 3/26 ≈ 0,115.'},
 ]},
 {n:'Une probabilité entre 0 et 1',r:'Une probabilité est toujours entre 0 et 1',qs:[
   {q:'Lequel de ces nombres ne peut pas être une probabilité ?',opts:['0','0,99',F(5,4),'35 %'],ans:2,why:'5/4 = 1,25 est plus grand que 1. Une probabilité est toujours entre 0 et 1.'},
   {q:'Si P(A) = 1, alors l’événement A est…',opts:['impossible','certain','réalisé une fois sur deux','très peu probable'],ans:1,why:'Une probabilité de 1 signifie que toutes les issues sont favorables : A est certain.'},
   {q:'On lance un dé à 6 faces. Quelle est la probabilité d’obtenir 0 ?',lab:'P =',ans:0,why:'Aucune face ne porte 0 : l’événement est impossible, sa probabilité est 0.'},
   {q:'Avec un dé, range du moins probable au plus probable : A « obtenir 6 », B « obtenir un nombre pair », C « obtenir au moins 2 ».',opts:['A, B, C','C, B, A','B, A, C','A, C, B'],ans:0,why:'P(A) = 1/6 ≈ 0,17 ; P(B) = 3/6 = 0,5 ; P(C) = 5/6 ≈ 0,83.'},
 ]},
 {n:'Événement contraire',r:'L’événement contraire',qs:[
   {q:'On sait que P(A) = 0,35. Que vaut P(non A) ?',lab:'P =',ans:.65,tol:.001,why:'P(non A) = 1 − 0,35 = 0,65.'},
   {q:'On lance un dé. Quelle est la probabilité de ne pas obtenir un multiple de 3 ?',lab:'P =',ans:2/3,tol:.001,show:'2/3',why:'Multiples de 3 : 3 et 6, donc P = 2/6 = 1/3. Le contraire : 1 − 1/3 = 2/3.'},
   {q:'Avec un dé, quel est le contraire de l’événement « obtenir au moins 3 » ?',opts:['obtenir au plus 3','obtenir 1 ou 2','obtenir moins que 2','obtenir 3'],ans:1,why:'« Au moins 3 » = {3 ; 4 ; 5 ; 6}. Les issues restantes sont 1 et 2. « Au plus 3 » contient 3, qui est déjà dans l’événement.'},
   {q:'Une tombola vend 300 billets, dont 45 sont gagnants. Quelle est la probabilité qu’un billet acheté au hasard ne gagne pas ?',lab:'P =',ans:.85,tol:.001,show:'17/20',why:'P(gagner) = 45/300 = 0,15, donc P(ne pas gagner) = 1 − 0,15 = 0,85.'},
   {q:'On sait que P(non A) = 3/8. Que vaut P(A) ?',lab:'P =',ans:.625,tol:.001,show:'5/8',why:'P(A) = 1 − P(non A) = 1 − 3/8 = 5/8 = 0,625.'},
 ]},
 {n:'Tableau à double entrée',r:'Utiliser un tableau à double entrée',qs:[
   {q:'On lance deux dés. Quelle est la probabilité que la somme vaille 6 ?',lab:'P =',ans:5/36,tol:.001,show:'5/36',why:'Somme 6 : 1-5, 2-4, 3-3, 4-2, 5-1, soit 5 cases sur 36. P = 5/36.'},
   {q:'On lance deux dés. Quelle est la probabilité que la somme vaille 11 ?',lab:'P =',ans:1/18,tol:.001,show:'1/18',why:'Somme 11 : 5-6 et 6-5, soit 2 cases sur 36. P = 2/36 = 1/18.'},
   {q:'On lance deux dés. Dans combien des 36 cases du tableau la somme est-elle au moins égale à 10 ?',ans:6,why:'Somme 10 : 3 cases (4-6, 5-5, 6-4) ; 11 : 2 cases ; 12 : 1 case. En tout 3 + 2 + 1 = 6.'},
   {q:'On lance deux dés. Quelle est la probabilité que les deux nombres soient pairs ?',lab:'P =',ans:.25,tol:.001,show:'1/4',why:'3 résultats pairs sur chaque dé : 3 · 3 = 9 cases sur 36. P = 9/36 = 1/4.'},
   {q:'Avec deux dés, pourquoi la somme 7 est-elle plus probable que la somme 12 ?',opts:['parce que 7 est un nombre premier','parce que 7 s’obtient dans 6 cases du tableau et 12 dans une seule','parce que les dés « préfèrent » le milieu','ce n’est pas vrai : toutes les sommes ont la même chance'],ans:1,why:'Les 36 cases sont équiprobables, mais 7 apparaît dans 6 cases (1-6, …, 6-1) et 12 dans une seule (6-6) : P(7) = 6/36, P(12) = 1/36.'},
   {q:'On lance deux pièces. Quelle est la probabilité d’obtenir un pile et un face ?',lab:'P =',ans:.5,tol:.001,show:'1/2',why:'Le tableau compte 4 cases : PP, PF, FP, FF. Deux cases conviennent (PF et FP) : P = 2/4 = 1/2.'},
 ]},
];
})();
