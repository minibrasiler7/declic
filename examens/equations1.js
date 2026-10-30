/* Déclic — examen de compétence : Équations du 1er degré */
(()=>{
EXAMS['equations1']=[
 {n:'Garder la balance en équilibre', r:'Une équation est une balance', qs:[
   {q:'Laquelle de ces valeurs est solution de 3<i>x</i> − 4 = <i>x</i> + 6&nbsp;?', opts:['<i>x</i> = 1','<i>x</i> = 2','<i>x</i> = 5','<i>x</i> = 10'], ans:2, why:'Pour <i>x</i> = 5 : 3·5 − 4 = 11 et 5 + 6 = 11. Les deux côtés pèsent pareil.'},
   {q:'<i>x</i> = 4 est-il solution de 5<i>x</i> − 3 = 2<i>x</i> + 9&nbsp;?', opts:['Oui, les deux côtés valent 17','Non, les deux côtés valent 17 et 13','Non, car 5 ≠ 2','On ne peut pas savoir sans résoudre'], ans:0, why:'On remplace : 5·4 − 3 = 17 et 2·4 + 9 = 17. Égalité : 4 est solution.'},
   {q:'On part de 2<i>x</i> + 6 = 14. Quel passage est faux&nbsp;?', opts:['2<i>x</i> = 8, en enlevant 6 des deux côtés','<i>x</i> + 3 = 7, en divisant les deux côtés par 2','<i>x</i> + 6 = 7, en divisant par 2','2<i>x</i> + 6 − 6 = 14 − 6'], ans:2, why:'Diviser par 2 doit porter sur tout le côté gauche : (2<i>x</i> + 6) ÷ 2 = <i>x</i> + 3. Écrire <i>x</i> + 6 ne divise qu’un terme et déséquilibre la balance.'},
 ]},
 {n:'Isoler x', r:'Isoler x pas à pas', qs:[
   {q:'Résous 6<i>x</i> − 5 = 31.', lab:'x =', ans:6, why:'On ajoute 5 : 6<i>x</i> = 36. On divise par 6 : <i>x</i> = 6.'},
   {q:'Résous 4<i>x</i> + 1 = 7.', lab:'x =', ans:1.5, tol:0.001, why:'On enlève 1 : 4<i>x</i> = 6. On divise par 4 : <i>x</i> = 1,5. Contrôle : 4·1,5 + 1 = 7.'},
   {q:'Résous 9<i>x</i> + 4 = 5<i>x</i> − 12.', lab:'x =', ans:-4, why:'On enlève 5<i>x</i> : 4<i>x</i> + 4 = −12. On enlève 4 : 4<i>x</i> = −16. Donc <i>x</i> = −4. Contrôle : −36 + 4 = −32 et −20 − 12 = −32.'},
   {q:'Résous 2<i>x</i> + 13 = 7<i>x</i> − 2.', lab:'x =', ans:3, why:'On enlève 2<i>x</i> et on ajoute 2 : 15 = 5<i>x</i>, donc <i>x</i> = 3. Contrôle : 6 + 13 = 19 et 21 − 2 = 19.'},
   {q:'Résous 3<i>x</i> − 8 = 7<i>x</i>.', lab:'x =', ans:-2, why:'On enlève 3<i>x</i> : −8 = 4<i>x</i>, donc <i>x</i> = −2. Contrôle : −6 − 8 = −14 = 7·(−2).'},
   {q:'<i>5x − 3 = 2x + 9</i>. Quelle est une bonne première étape&nbsp;?', opts:['Diviser le côté gauche par 5','Soustraire 2<i>x</i> des deux côtés','Ajouter 3 au côté gauche seulement','Multiplier les deux côtés par <i>x</i>'], ans:1, why:'On regroupe les <i>x</i> d’un seul côté, des deux côtés à la fois : 3<i>x</i> − 3 = 9, puis 3<i>x</i> = 12 et <i>x</i> = 4.'},
 ]},
 {n:'Équations avec parenthèses', r:'Équations avec parenthèses', qs:[
   {q:'Résous 4(<i>x</i> − 3) = 2<i>x</i> + 6.', lab:'x =', ans:9, why:'4<i>x</i> − 12 = 2<i>x</i> + 6, donc 2<i>x</i> = 18 et <i>x</i> = 9. Contrôle : 4·6 = 24 = 18 + 6.'},
   {q:'Résous 3(2<i>x</i> + 1) = 5(<i>x</i> + 2).', lab:'x =', ans:7, why:'6<i>x</i> + 3 = 5<i>x</i> + 10, donc <i>x</i> = 7. Contrôle : 3·15 = 45 = 5·9.'},
   {q:'Résous 5(<i>x</i> − 2) = 3(<i>x</i> + 4).', lab:'x =', ans:11, why:'5<i>x</i> − 10 = 3<i>x</i> + 12, donc 2<i>x</i> = 22 et <i>x</i> = 11. Contrôle : 5·9 = 45 = 3·15.'},
   {q:'Résous 7 − (<i>x</i> − 4) = 2<i>x</i> + 2.', lab:'x =', ans:3, why:'Le signe moins change les signes : 7 − <i>x</i> + 4 = 11 − <i>x</i>. Donc 11 − <i>x</i> = 2<i>x</i> + 2, 9 = 3<i>x</i> et <i>x</i> = 3.'},
   {q:'Résous 2(<i>x</i> + 5) − 3(<i>x</i> − 1) = 0.', lab:'x =', ans:13, why:'2<i>x</i> + 10 − 3<i>x</i> + 3 = −<i>x</i> + 13 = 0, donc <i>x</i> = 13. Attention : −3·(−1) = +3.'},
   {q:'Que vaut −(2<i>x</i> − 5)&nbsp;?', opts:['−2<i>x</i> − 5','−2<i>x</i> + 5','2<i>x</i> + 5','2<i>x</i> − 5'], ans:1, why:'Un signe moins devant une parenthèse change tous les signes à l’intérieur : −2<i>x</i> + 5.'},
 ]},
 {n:'Mettre un problème en équation', r:'Mettre un problème en équation', qs:[
   {q:'Quelle équation traduit « si on ajoute 4 au triple d’un nombre <i>x</i>, on obtient 25 »&nbsp;?', opts:['3(<i>x</i> + 4) = 25','3<i>x</i> + 4 = 25','<i>x</i> + 12 = 25','3<i>x</i> = 25 + 4'], ans:1, why:'Le triple du nombre est 3<i>x</i>, puis on lui ajoute 4 : 3<i>x</i> + 4 = 25, donc <i>x</i> = 7.'},
   {q:'La somme de trois nombres entiers consécutifs vaut 84. Quel est le plus petit&nbsp;?', ans:27, why:'Soit <i>x</i> le plus petit : <i>x</i> + (<i>x</i> + 1) + (<i>x</i> + 2) = 3<i>x</i> + 3 = 84, donc 3<i>x</i> = 81 et <i>x</i> = 27. Contrôle : 27 + 28 + 29 = 84.'},
   {q:'Un pantalon coûte 25 CHF de plus qu’un t-shirt. Les deux ensemble coûtent 85 CHF. Combien coûte le t-shirt&nbsp;?', unit:'CHF', ans:30, why:'Soit <i>x</i> le prix du t-shirt : <i>x</i> + (<i>x</i> + 25) = 85, donc 2<i>x</i> = 60 et <i>x</i> = 30. Le pantalon coûte 55 CHF.'},
   {q:'Un rectangle est deux fois plus long que large. Son périmètre vaut 54 cm. Quelle est sa largeur&nbsp;?', unit:'cm', ans:9, why:'Largeur <i>x</i>, longueur 2<i>x</i> : 2<i>x</i> + 2·2<i>x</i> = 6<i>x</i> = 54, donc <i>x</i> = 9 cm. Contrôle : 9 + 18 + 9 + 18 = 54.'},
   {q:'Une mère a 38 ans et son fils 10 ans. Dans combien d’années la mère aura-t-elle exactement le double de l’âge de son fils&nbsp;?', unit:'ans', ans:18, why:'Dans <i>t</i> ans : 38 + <i>t</i> = 2(10 + <i>t</i>) = 20 + 2<i>t</i>, donc <i>t</i> = 18. Contrôle : 56 = 2 × 28.'},
   {q:'Tom a trois fois plus de billes que Lina. S’il lui en donne 10, ils en ont autant l’un que l’autre. Combien Lina a-t-elle de billes au départ&nbsp;?', ans:10, why:'Lina : <i>x</i>, Tom : 3<i>x</i>. Après le don : 3<i>x</i> − 10 = <i>x</i> + 10, donc 2<i>x</i> = 20 et <i>x</i> = 10. Contrôle : 30 − 10 = 20 = 10 + 10.'},
   {q:'Au musée, un billet adulte coûte 15 CHF et un billet enfant 9 CHF. Une famille de 2 adultes paie 66 CHF. Combien y a-t-il d’enfants&nbsp;?', ans:4, why:'Avec <i>x</i> enfants : 2·15 + 9<i>x</i> = 66, donc 9<i>x</i> = 36 et <i>x</i> = 4.'},
 ]},
 {n:'Résoudre une inéquation', r:'Résoudre une inéquation', qs:[
   {q:'Quel est le plus petit nombre entier <i>x</i> tel que 4<i>x</i> − 7 > 21&nbsp;?', lab:'x =', ans:8, why:'4<i>x</i> > 28, donc <i>x</i> > 7. Le plus petit entier strictement supérieur à 7 est 8.'},
   {q:'Quel est le plus grand nombre entier <i>x</i> tel que 5<i>x</i> + 3 ≤ 40&nbsp;?', lab:'x =', ans:7, why:'5<i>x</i> ≤ 37, donc <i>x</i> ≤ 7,4. Le plus grand entier qui convient est 7.'},
   {q:'Résous −2<i>x</i> < 10.', opts:['<i>x</i> < −5','<i>x</i> > −5','<i>x</i> < 5','<i>x</i> > 5'], ans:1, why:'On divise par −2, un nombre négatif : on retourne le sens. <i>x</i> > −5.'},
   {q:'Résous 3 − <i>x</i> ≥ 7.', opts:['<i>x</i> ≥ 4','<i>x</i> ≤ −4','<i>x</i> ≥ −4','<i>x</i> ≤ 4'], ans:1, why:'On enlève 3 : −<i>x</i> ≥ 4. On multiplie par −1 et on retourne le sens : <i>x</i> ≤ −4.'},
   {q:'Une piscine propose un abonnement à 30 CHF, plus 2 CHF par entrée. Sans abonnement, une entrée coûte 5 CHF. À partir de combien d’entrées l’abonnement est-il strictement moins cher&nbsp;?', ans:11, why:'30 + 2<i>x</i> < 5<i>x</i> donne 30 < 3<i>x</i>, soit <i>x</i> > 10. Pour 10 entrées, les deux coûtent 50 CHF : il en faut 11.'},
   {q:'Quel est le plus grand nombre entier <i>x</i> tel que 2(<i>x</i> − 3) > 5<i>x</i> − 30&nbsp;?', lab:'x =', ans:7, why:'2<i>x</i> − 6 > 5<i>x</i> − 30 donne 24 > 3<i>x</i>, soit <i>x</i> < 8. Le plus grand entier strictement inférieur à 8 est 7.'},
 ]},
];
})();
