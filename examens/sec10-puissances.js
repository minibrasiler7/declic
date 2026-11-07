/* Déclic — examen de compétence : Puissances et calcul */
(()=>{
EXAMS['sec10-puissances']=[
 {n:'Priorités des opérations',r:'Calculer en respectant les priorités',qs:[
   {q:'Calcule 7 + 2 · 5².',ans:57,why:'La puissance d’abord : 5² = 25. Puis le produit : 2 · 25 = 50. Enfin 7 + 50 = 57.'},
   {q:'Calcule (7 + 2) · 5 − 3².',ans:36,why:'Parenthèses : 9. Puissance : 3² = 9. Produit : 9 · 5 = 45. Enfin 45 − 9 = 36.'},
   {q:'Dans le calcul 4 · 6 + 8, comment s’appellent les nombres 4 et 6 ?',opts:['des termes','des facteurs','des quotients','des différences'],ans:1,why:'4 et 6 sont multipliés : ce sont les facteurs du produit 4 · 6. Ce produit et 8 sont les termes de la somme.'},
   {q:'Calcule 36 : 3 · 2 + 4.',ans:28,why:'Division et multiplication de gauche à droite : 36 : 3 = 12, puis 12 · 2 = 24. Enfin 24 + 4 = 28.'},
   {q:'Calcule 50 − 3 · (2 + 2)² : 6.',ans:42,why:'(2 + 2)² = 4² = 16 ; 3 · 16 = 48 ; 48 : 6 = 8 ; 50 − 8 = 42.'},
 ]},
 {n:'Définition d’une puissance',r:'Les puissances : un raccourci pour les produits',qs:[
   {q:'Calcule 3⁴.',ans:81,why:'3⁴ = 3 · 3 · 3 · 3 = 9 · 9 = 81.'},
   {q:'Que vaut 4³ ?',opts:['12','64','7','43'],ans:1,why:'4³ = 4 · 4 · 4 = 64. L’exposant compte les facteurs : ce n’est pas 4 · 3 = 12.'},
   {q:'On écrit 10 · 10 · 10 · 10 · 10 · 10 = 10<sup><i>n</i></sup>. Que vaut <i>n</i> ?',lab:'n =',ans:6,why:'Il y a 6 facteurs égaux à 10 : c’est 10⁶ = 1 000 000.'},
   {q:'Calcule 2⁴ + 4².',ans:32,why:'2⁴ = 16 et 4² = 16, donc 16 + 16 = 32. Les deux puissances sont égales, mais ce n’est pas une règle générale (2³ = 8 et 3² = 9).'},
 ]},
 {n:'Règles des puissances',r:'Simplifier avec les règles des puissances',qs:[
   {q:'On écrit 5³ · 5⁴ = 5<sup><i>n</i></sup>. Que vaut <i>n</i> ?',lab:'n =',ans:7,why:'Produit de même base : on additionne les exposants, 3 + 4 = 7.'},
   {q:'Calcule 7¹⁰ : 7⁸.',ans:49,why:'Quotient de même base : 7¹⁰⁻⁸ = 7² = 49.'},
   {q:'On écrit (3²)⁵ = 3<sup><i>n</i></sup>. Que vaut <i>n</i> ?',lab:'n =',ans:10,why:'Puissance d’une puissance : on multiplie les exposants, 2 · 5 = 10.'},
   {q:'Calcule 2⁵ · 5⁵.',ans:100000,why:'Même exposant : 2⁵ · 5⁵ = (2 · 5)⁵ = 10⁵ = 100 000.'},
   {q:'Que vaut 9⁰ ?',opts:['0','9','1','90'],ans:2,why:'Toute puissance d’exposant 0 d’un nombre non nul vaut 1 : 9⁰ = 9³ : 9³ = 1.'},
   {q:'On écrit 8² · 2³ = 2<sup><i>n</i></sup>. Que vaut <i>n</i> ?',lab:'n =',ans:9,why:'8 = 2³, donc 8² = (2³)² = 2⁶. Puis 2⁶ · 2³ = 2⁹. Contrôle : 64 · 8 = 512 = 2⁹.'},
   {q:'Laquelle de ces égalités est fausse ?',opts:['<i>a</i>³ · <i>a</i>² = <i>a</i>⁵','(<i>a</i>³)² = <i>a</i>⁶','<i>a</i>³ + <i>a</i>² = <i>a</i>⁵','<i>a</i>⁶ : <i>a</i>² = <i>a</i>⁴'],ans:2,why:'Les règles valent pour les produits, pas pour les sommes. Avec <i>a</i> = 2 : 2³ + 2² = 12, alors que 2⁵ = 32.'},
 ]},
 {n:'Carrés parfaits et racine carrée',r:'Trouver la racine d’un carré parfait',qs:[
   {q:'Calcule √169.',ans:13,why:'13² = 169, et 13 est positif : √169 = 13.'},
   {q:'Sans calculatrice, trouve √3249.',ans:57,why:'50² = 2500 &lt; 3249 &lt; 3600 = 60². 3249 finit par 9, donc la racine finit par 3 ou 7. 53² = 2809, 57² = 3249 : √3249 = 57.'},
   {q:'Lequel de ces nombres n’est pas un carré parfait ?',opts:['121','196','250','400'],ans:2,why:'121 = 11², 196 = 14², 400 = 20². 250 est entre 15² = 225 et 16² = 256 : ce n’est pas un carré parfait.'},
   {q:'Calcule √6400.',ans:80,why:'80² = 6400 : √6400 = 80.'},
   {q:'Un carré parfait se termine par 6. Par quel chiffre sa racine peut-elle se terminer ?',opts:['3 ou 7','4 ou 6','2 ou 8','seulement 6'],ans:1,why:'4² = 16 et 6² = 36 finissent par 6 ; aucun autre chiffre ne donne un carré qui finit par 6.'},
 ]},
 {n:'Règle des signes',r:'Nombres négatifs : signes, produits et puissances',qs:[
   {q:'Calcule (−6) · (−7).',ans:42,why:'Deux signes égaux : le produit est positif, 6 · 7 = 42.'},
   {q:'Calcule (−48) : 6.',ans:-8,why:'Signes différents : le quotient est négatif, 48 : 6 = 8, donc −8.'},
   {q:'Calcule (−2)⁵.',ans:-32,why:'5 facteurs négatifs, exposant impair : le résultat est négatif. 2⁵ = 32, donc (−2)⁵ = −32.'},
   {q:'Quel est le signe du produit (−1) · (−2) · (−3) · (−4) · (−5) ?',opts:['positif','négatif','nul','on ne peut pas savoir'],ans:1,why:'Il y a 5 facteurs négatifs : 4 s’apparient en produits positifs, il en reste un. Le produit vaut −120.'},
 ]},
 {n:'Le signe moins devant une puissance',r:'(−3)² ou −3² : ne pas se tromper',qs:[
   {q:'Calcule −5².',ans:-25,why:'L’exposant ne porte que sur 5 : 5² = 25, puis on prend l’opposé : −25.'},
   {q:'Calcule (−5)².',ans:25,why:'L’exposant porte sur la parenthèse : (−5) · (−5) = 25.'},
   {q:'Calcule −2⁴ − (−2)⁴.',ans:-32,why:'−2⁴ = −16 et (−2)⁴ = 16. Donc −16 − 16 = −32.'},
   {q:'Calcule (−1)⁷ + (−1)⁸ − 1².',ans:-1,why:'(−1)⁷ = −1 (exposant impair), (−1)⁸ = 1 (pair), 1² = 1. Donc −1 + 1 − 1 = −1.'},
   {q:'Laquelle de ces expressions vaut 36 ?',opts:['−6²','(−6)²','−(6²)','−6 · 6'],ans:1,why:'(−6)² = (−6) · (−6) = 36. Les trois autres valent −36 : l’exposant ou le produit ne porte que sur 6.'},
 ]},
];
})();
