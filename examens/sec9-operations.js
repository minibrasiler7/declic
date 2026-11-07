/* Déclic — examen de compétence : Calculer malin */
(()=>{
EXAMS['sec9-operations']=[
 {n:'Le vocabulaire des opérations', r:'Le vocabulaire des opérations', qs:[
   {q:'Dans 56 : 8 = 7, comment s’appelle le nombre 7 ?', opts:['le produit','le quotient','le diviseur','la différence'], ans:1, why:'Le résultat d’une division est le quotient. 56 est le dividende et 8 le diviseur.'},
   {q:'Calcule le produit de 6 par la somme de 5 et 4.', ans:54, why:'La somme d’abord : 5 + 4 = 9. Puis le produit : 6 × 9 = 54. On écrit 6 × (5 + 4).'},
   {q:'Calcule la différence entre 50 et le produit de 7 par 6.', ans:8, why:'Le produit vaut 7 × 6 = 42, puis la différence 50 − 42 = 8.'},
   {q:'Quelle écriture traduit « la somme du quotient de 20 par 4 et de 3 » ?', opts:['20 : (4 + 3)','(20 + 3) : 4','20 : 4 + 3','20 × 4 + 3'], ans:2, why:'Le résultat est une somme : on l’écrit en dernier. Ses termes sont le quotient 20 : 4 et le nombre 3. 20 : 4 + 3 = 8.'},
 ]},
 {n:'Nombres décimaux et écritures', r:'Les naturels et les nombres décimaux', qs:[
   {q:'Combien de centièmes y a-t-il dans 4,08 ?', lab:'centièmes :', ans:408, why:'4,08 = 4 unités + 8 centièmes = 400 centièmes + 8 centièmes = 408 centièmes.'},
   {q:'Lequel de ces nombres est égal à 3,5 ?', opts:['3,05','35 dixièmes','350 dixièmes','3 + 5 centièmes'], ans:1, why:'3,5 = 3 unités + 5 dixièmes = 30 dixièmes + 5 dixièmes = 35 dixièmes. 3,05 et 3 + 5 centièmes valent 3,05 ; 350 dixièmes valent 35.'},
   {q:'Lequel de ces nombres est le plus grand ?', opts:['2,45','2,5','2,409','2,449'], ans:1, why:'Même partie entière 2. On compare les dixièmes : 4, 5, 4, 4. Le seul avec 5 dixièmes, 2,5, est le plus grand.'},
   {q:'Lequel de ces nombres n’est pas un nombre naturel ?', opts:['0','12 : 4','17','7 : 2'], ans:3, why:'7 : 2 = 3,5 a un chiffre après la virgule : c’est un décimal, pas un naturel. 12 : 4 = 3 est un naturel, 0 aussi.'},
 ]},
 {n:'Les priorités des opérations', r:'Respecter les priorités', qs:[
   {q:'Calcule 7 + 3 × 5.', ans:22, why:'La multiplication d’abord : 3 × 5 = 15. Puis 7 + 15 = 22.'},
   {q:'Calcule 36 : 6 × 3.', ans:18, why:'Division et multiplication de gauche à droite : 36 : 6 = 6, puis 6 × 3 = 18.'},
   {q:'Calcule 100 − 4 × (8 + 2 × 6).', ans:20, why:'Dans la parenthèse, 2 × 6 = 12 puis 8 + 12 = 20. Ensuite 4 × 20 = 80, et 100 − 80 = 20.'},
   {q:'Calcule 48 : (6 − 2) : 3.', ans:4, why:'La parenthèse : 6 − 2 = 4. Puis de gauche à droite : 48 : 4 = 12, et 12 : 3 = 4.'},
   {q:'Où faut-il placer des parenthèses pour que 6 + 4 × 5 − 2 donne 48 ?', opts:['6 + 4 × (5 − 2)','(6 + 4) × (5 − 2)','(6 + 4) × 5 − 2','6 + (4 × 5 − 2)'], ans:2, why:'(6 + 4) × 5 − 2 = 10 × 5 − 2 = 50 − 2 = 48. Les autres donnent 18, 30 et 24.'},
 ]},
 {n:'Calculer de tête avec les propriétés', r:'Calculer de tête avec les propriétés', qs:[
   {q:'Calcule de tête 25 × 13 × 4.', ans:1300, why:'On regroupe 25 × 4 = 100 (commutativité et associativité), puis 100 × 13 = 1 300.'},
   {q:'Calcule de tête 9 × 101.', ans:909, why:'9 × (100 + 1) = 900 + 9 = 909 (distributivité).'},
   {q:'Calcule de tête 7 × 98.', ans:686, why:'7 × (100 − 2) = 700 − 14 = 686.'},
   {q:'Calcule de tête 17 × 23 + 17 × 77.', ans:1700, why:'17 est un facteur commun : 17 × (23 + 77) = 17 × 100 = 1 700.'},
   {q:'Laquelle de ces égalités est fausse ?', opts:['8 + 5 = 5 + 8','(2 × 3) × 4 = 2 × (3 × 4)','4 × (5 + 2) = 4 × 5 + 4 × 2','20 − 6 = 6 − 20'], ans:3, why:'La soustraction n’est pas commutative : 20 − 6 = 14, alors que 6 − 20 est plus petit que 0. Les trois autres sont la commutativité, l’associativité et la distributivité.'},
   {q:'À quoi est égal 6 × (10 − 3) ?', opts:['6 × 10 − 3','6 × 10 + 6 × 3','6 × 10 − 6 × 3','60 − 3 × 3'], ans:2, why:'La distributivité s’applique aussi à la soustraction : le 6 multiplie les deux termes. 60 − 18 = 42 = 6 × 7.'},
 ]},
 {n:'Estimer un ordre de grandeur', r:'Estimer un ordre de grandeur', qs:[
   {q:'Quel est l’ordre de grandeur de 598 + 403 + 297 ?', opts:['130','1 300','13 000','2 000'], ans:1, why:'598 ≈ 600, 403 ≈ 400, 297 ≈ 300 : 600 + 400 + 300 = 1 300. Le résultat exact est 1 298.'},
   {q:'Quel est l’ordre de grandeur de 41 × 19,8 ?', opts:['80','8 000','800','600'], ans:2, why:'41 ≈ 40 et 19,8 ≈ 20 : 40 × 20 = 800. Le résultat exact est 811,8.'},
   {q:'Tu achètes 6 cahiers à 3,95 CHF et 2 stylos à 1,10 CHF. Combien paies-tu environ ?', opts:['environ 16 CHF','environ 26 CHF','environ 50 CHF','environ 260 CHF'], ans:1, why:'6 × 4 + 2 × 1 = 24 + 2 = 26 CHF. Le prix exact est 25,90 CHF.'},
   {q:'Tim calcule 3 012 : 6 à la calculatrice et lit 5 020. Que peut-on dire sans faire le calcul exact ?', opts:['C’est plausible','C’est faux : le résultat doit être proche de 50','C’est faux : le résultat doit être proche de 500','C’est faux : le résultat doit être proche de 18 000'], ans:2, why:'3 012 ≈ 3 000 et 3 000 : 6 = 500. 5 020 est dix fois trop grand : Tim a mal tapé. Le résultat exact est 502.'},
 ]},
 {n:'Autres systèmes de numération', r:'Passer d’un système à l’autre', qs:[
   {q:'Quel nombre s’écrit MCMXCIX en chiffres romains ?', ans:1999, why:'M = 1 000, CM = 900, XC = 90, IX = 9. Total : 1 999.'},
   {q:'Quel nombre s’écrit CDXLIV en chiffres romains ?', ans:444, why:'CD = 500 − 100 = 400, XL = 50 − 10 = 40, IV = 5 − 1 = 4. Total : 444.'},
   {q:'Que vaut le nombre binaire 10110 ?', ans:22, why:'Positions 16, 8, 4, 2, 1. Les 1 sont sur 16, 4 et 2 : 16 + 4 + 2 = 22.'},
   {q:'Comment s’écrit 19 en binaire ?', opts:['11001','10011','10101','1001'], ans:1, why:'19 = 16 + 2 + 1. Positions 16, 8, 4, 2, 1 : 1, 0, 0, 1, 1, soit 10011.'},
   {q:'Combien de minutes y a-t-il dans 7 h 15 min ?', unit:'min', ans:435, why:'7 h = 7 × 60 = 420 min, puis 420 + 15 = 435 min.'},
 ]},
 {n:'Utiliser la calculatrice', r:'Bien utiliser la calculatrice', qs:[
   {q:'Que donne 3 ^ 4 sur la calculatrice ?', ans:81, why:'3 ^ 4 = 3 × 3 × 3 × 3 = 9 × 9 = 81.'},
   {q:'Que donne √196 ?', ans:14, why:'On cherche le nombre positif qui, multiplié par lui-même, donne 196 : 14 × 14 = 196.'},
   {q:'Pour calculer la somme de 45 et 27 divisée par la différence de 14 et 6, quelle suite de touches faut-il taper ?', opts:['45 + 27 ÷ 14 − 6 =','( 45 + 27 ) ÷ 14 − 6 =','45 + 27 ÷ ( 14 − 6 ) =','( 45 + 27 ) ÷ ( 14 − 6 ) ='], ans:3, why:'Il faut des parenthèses autour de la somme et de la différence, sinon la division passe avant. On obtient 72 ÷ 8 = 9.'},
   {q:'La mémoire est vide. Tu tapes 12 × 3 = M+, puis 5 × 4 = M+, puis 10 M−, puis MR. Qu’affiche la calculatrice ?', ans:46, why:'La mémoire reçoit 36, puis 20 de plus (56), puis on retire 10 : MR affiche 46.'},
 ]},
];
})();
