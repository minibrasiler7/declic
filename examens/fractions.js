/* Déclic — examen de compétence : Fractions */
(()=>{
EXAMS['fractions']=[
 {n:'Lire une fraction', r:'Une fraction, c’est un partage', qs:[
   {q:'Une tablette de chocolat a 24 carrés. Tu en manges 9. Quelle fraction de la tablette as-tu mangée&nbsp;?', opts:[F(9,15),F(3,8),F(24,9),F(1,9)], ans:1, why:'Tu prends 9 parts sur 24 : '+F(9,24)+'. On simplifie par 3 : '+F(3,8)+'.'},
   {q:'Une pizza est coupée en 12 parts égales. On en mange 5. Quelle fraction de la pizza reste-t-il&nbsp;?', opts:[F(5,12),F(7,5),F(7,12),F(12,7)], ans:2, why:'Il reste 12 − 5 = 7 parts sur 12 : '+F(7,12)+'. Le dénominateur dit en combien on a coupé, il ne change pas.'},
   {q:'Tu as lu 120 pages d’un livre qui en compte 200. Quelle fraction du livre as-tu lue, sous forme irréductible&nbsp;?', opts:[F(12,20),F(3,5),F(2,5),F(5,3)], ans:1, why:'Tu as lu '+F(120,200)+' du livre. On simplifie par 40 : '+F(3,5)+'. '+F(12,20)+' est juste mais pas irréductible.'},
   {q:'Quelle fraction d’heure représentent 15 minutes&nbsp;?', opts:[F(1,15),F(1,4),F(15,100),F(1,3)], ans:1, why:'Une heure fait 60 minutes : 15 minutes, c’est '+F(15,60)+' = '+F(1,4)+' d’heure (on simplifie par 15).'},
 ]},
 {n:'Simplifier et amplifier', r:'Simplifier et amplifier une fraction', qs:[
   {q:'Simplifie '+F(36,48)+' le plus possible.', opts:[F(18,24),F(3,4),F(6,8),F(4,3)], ans:1, why:'Le plus grand diviseur commun de 36 et 48 est 12 : 36 ÷ 12 = 3 et 48 ÷ 12 = 4, donc '+F(3,4)+'.'},
   {q:'Écris '+F(5,6)+' avec le dénominateur 42. Quel est le numérateur&nbsp;?', lab:'?/42 :', ans:35, why:'42 = 6 × 7 : on multiplie le haut et le bas par 7. 5 × 7 = 35, donc '+F(5,6)+' = '+F(35,42)+'.'},
   {q:'Écris '+F(3,8)+' avec le dénominateur 56. Quel est le numérateur&nbsp;?', lab:'?/56 :', ans:21, why:'56 = 8 × 7 : on amplifie par 7. 3 × 7 = 21, donc '+F(3,8)+' = '+F(21,56)+'.'},
   {q:'Laquelle de ces fractions n’est <b>pas</b> égale à '+F(4,10)+'&nbsp;?', opts:[F(2,5),F(12,30),F(6,12),F(40,100)], ans:2, why:F(4,10)+' = '+F(2,5)+'. '+F(12,30)+' et '+F(40,100)+' se simplifient aussi en '+F(2,5)+', mais '+F(6,12)+' = '+F(1,2)+'. On a ajouté 2 en haut et en bas : cela change la part.'},
   {q:'On simplifie '+F(45,75)+' jusqu’à obtenir une fraction irréductible. Quel est son dénominateur&nbsp;?', lab:'dénominateur :', ans:5, why:'45 = 15 × 3 et 75 = 15 × 5 : on divise par 15 et on obtient '+F(3,5)+'.'},
 ]},
 {n:'Comparer des fractions', r:'Additionner : réduire au même dénominateur', qs:[
   {q:'Laquelle de ces fractions est la plus grande&nbsp;?', opts:[F(5,8),F(7,12),F(2,3),F(3,4)], ans:3, why:'Au dénominateur 24 : '+F(15,24)+', '+F(14,24)+', '+F(16,24)+', '+F(18,24)+'. La plus grande est '+F(3,4)+'.'},
   {q:'Laquelle de ces fractions est la plus petite&nbsp;?', opts:[F(2,3),F(7,10),F(3,5),F(4,5)], ans:2, why:'Au dénominateur 30 : '+F(20,30)+', '+F(21,30)+', '+F(18,30)+', '+F(24,30)+'. La plus petite est '+F(3,5)+'.'},
   {q:'Compare '+F(5,6)+' et '+F(7,9)+'.', opts:[F(5,6)+' est plus grand',F(7,9)+' est plus grand','Elles sont égales','On ne peut pas comparer'], ans:0, why:'Au dénominateur 18 : '+F(5,6)+' = '+F(15,18)+' et '+F(7,9)+' = '+F(14,18)+'. 15 > 14, donc '+F(5,6)+' est plus grand.'},
   {q:'Compare '+F(4,7)+' et '+F(5,9)+'.', opts:['Elles sont égales',F(5,9)+' est plus grand, car 5 > 4',F(4,7)+' est plus grand','On ne peut pas comparer'], ans:2, why:'Au dénominateur 63 : '+F(4,7)+' = '+F(36,63)+' et '+F(5,9)+' = '+F(35,63)+'. 36 > 35, donc '+F(4,7)+' est un peu plus grand. Comparer seulement les numérateurs ne marche pas quand les dénominateurs diffèrent.'},
 ]},
 {n:'Additionner et soustraire', r:'Additionner : réduire au même dénominateur', qs:[
   {q:'Calcule '+F(3,4)+' + '+F(1,6)+'. Donne le résultat sous forme de fraction.', ans:11/12, tol:0.001, show:'11/12', why:'Dénominateur commun 12 : '+F(9,12)+' + '+F(2,12)+' = '+F(11,12)+'.'},
   {q:'Calcule '+F(2,5)+' + '+F(3,10)+'. Donne le résultat sous forme de fraction.', ans:7/10, tol:0.001, show:'7/10', why:'Dénominateur commun 10 : '+F(4,10)+' + '+F(3,10)+' = '+F(7,10)+'.'},
   {q:'Calcule '+F(5,6)+' − '+F(3,8)+'. Donne le résultat sous forme de fraction.', ans:11/24, tol:0.001, show:'11/24', why:'Dénominateur commun 24 : '+F(20,24)+' − '+F(9,24)+' = '+F(11,24)+'.'},
   {q:'Calcule 1 − '+F(3,8)+' − '+F(1,4)+'. Donne le résultat sous forme de fraction.', ans:3/8, tol:0.001, show:'3/8', why:'En huitièmes : 1 = '+F(8,8)+' et '+F(1,4)+' = '+F(2,8)+'. Donc 8 − 3 − 2 = 3 huitièmes : '+F(3,8)+'.'},
   {q:'Un élève écrit '+F(1,4)+' + '+F(2,5)+' = '+F(3,9)+'. Quel est le bon résultat&nbsp;?', opts:[F(3,9),F(3,20),F(13,20),F(2,20)], ans:2, why:'On n’additionne jamais les dénominateurs. Au dénominateur 20 : '+F(5,20)+' + '+F(8,20)+' = '+F(13,20)+'.'},
 ]},
 {n:'Multiplier des fractions', r:'Multiplier des fractions, prendre une fraction d’une quantité', qs:[
   {q:'Calcule '+F(4,9)+' × '+F(3,8)+' et simplifie. Donne le résultat sous forme de fraction.', ans:1/6, tol:0.001, show:'1/6', why:'Haut avec haut, bas avec bas : '+F('4 × 3','9 × 8')+' = '+F(12,72)+'. On simplifie par 12 : '+F(1,6)+'.'},
   {q:'Calcule '+F(5,6)+' × '+F(3,10)+' et simplifie. Donne le résultat sous forme de fraction.', ans:1/4, tol:0.001, show:'1/4', why:F('5 × 3','6 × 10')+' = '+F(15,60)+', puis on simplifie par 15 : '+F(1,4)+'.'},
   {q:'Calcule '+F(2,3)+' × '+F(9,4)+' et simplifie. Donne le résultat sous forme de fraction.', ans:3/2, tol:0.001, show:'3/2', why:F('2 × 9','3 × 4')+' = '+F(18,12)+', puis on simplifie par 6 : '+F(3,2)+'.'},
   {q:'Calcule '+F(3,5)+' × '+F(10,9)+' et simplifie. Donne le résultat sous forme de fraction.', ans:2/3, tol:0.001, show:'2/3', why:F('3 × 10','5 × 9')+' = '+F(30,45)+', puis on simplifie par 15 : '+F(2,3)+'.'},
   {q:'Quelle est la moitié de '+F(3,5)+'&nbsp;?', opts:[F(3,10),F(6,5),F(6,10),F(3,7)], ans:0, why:'Prendre la moitié, c’est multiplier par '+F(1,2)+' : '+F(3,5)+' × '+F(1,2)+' = '+F(3,10)+'. On double le dénominateur.'},
 ]},
 {n:'Fraction d’une quantité', r:'Multiplier des fractions, prendre une fraction d’une quantité', qs:[
   {q:'Combien valent les '+F(3,7)+' de 56&nbsp;?', ans:24, why:'56 × '+F(3,7)+' : un septième de 56 vaut 8, donc trois septièmes valent 24.'},
   {q:'Combien de minutes font les '+F(2,5)+' de 45 minutes&nbsp;?', unit:'min', ans:18, why:'Un cinquième de 45 vaut 9, donc deux cinquièmes valent 18 minutes.'},
   {q:'Une bouteille de 2 L est remplie aux '+F(3,8)+'. Combien contient-elle de centilitres&nbsp;?', unit:'cL', ans:75, why:'2 L = 200 cL. Un huitième de 200 vaut 25, donc trois huitièmes valent 75 cL.'},
   {q:'Dans une classe de 28 élèves, les '+F(3,7)+' sont des filles. Combien y a-t-il de garçons&nbsp;?', ans:16, why:'Filles : un septième de 28 vaut 4, donc 3 × 4 = 12. Garçons : 28 − 12 = 16.'},
   {q:'Tu as 60 CHF. Tu dépenses '+F(1,3)+' de cette somme, puis '+F(1,4)+' de cette même somme. Combien te reste-t-il&nbsp;?', unit:'CHF', ans:25, why:F(1,3)+' de 60 = 20 CHF et '+F(1,4)+' de 60 = 15 CHF. Il reste 60 − 20 − 15 = 25 CHF.'},
   {q:'Combien valent les '+F(3,4)+' des '+F(2,3)+' de 120&nbsp;?', ans:60, why:'On multiplie : 120 × '+F(2,3)+' = 80, puis 80 × '+F(3,4)+' = 60. Ou directement '+F(3,4)+' × '+F(2,3)+' = '+F(1,2)+', et la moitié de 120 vaut 60.'},
 ]},
];
})();
