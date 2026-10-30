/* Déclic — examen de compétence : Calcul littéral */
(()=>{
EXAMS['litteral']=[
 {n:'Simple distributivité', r:'Développer un produit', qs:[
   {q:'Développe −4(2<i>x</i> − 3).', opts:['−8<i>x</i> − 12','−8<i>x</i> + 12','−8<i>x</i> − 3','8<i>x</i> − 12'], ans:1, why:'Le −4 multiplie chaque terme avec son signe : (−4)·2<i>x</i> = −8<i>x</i> et (−4)·(−3) = +12.'},
   {q:'Développe <i>x</i>(<i>x</i> − 6).', opts:['<i>x</i>² − 6','2<i>x</i> − 6','<i>x</i>² − 6<i>x</i>','<i>x</i> − 6<i>x</i>'], ans:2, why:'<i>x</i> multiplie chaque terme : <i>x</i>·<i>x</i> = <i>x</i>² et <i>x</i>·(−6) = −6<i>x</i>.'},
   {q:'On développe −3(5 − 2<i>x</i>). Quel est le coefficient de <i>x</i>&nbsp;?', lab:'coefficient :', ans:6, why:'−3(5 − 2<i>x</i>) = −15 + 6<i>x</i> : (−3)·(−2<i>x</i>) = +6<i>x</i>, moins par moins donne plus.'},
   {q:'Développe et réduis 5(3<i>x</i> + 2) − 2(<i>x</i> − 4).', opts:['13<i>x</i> + 2','13<i>x</i> + 18','13<i>x</i> − 6','17<i>x</i> + 18'], ans:1, why:'5(3<i>x</i> + 2) = 15<i>x</i> + 10 et −2(<i>x</i> − 4) = −2<i>x</i> + 8. Total : 13<i>x</i> + 18. Le piège : oublier que −2·(−4) = +8.'},
   {q:'Un élève écrit 2(<i>x</i> + 5) = 2<i>x</i> + 5. Quelle est son erreur&nbsp;?', opts:['Il n’y a pas d’erreur','Le 2 doit aussi multiplier le 5 : 2<i>x</i> + 10','Il fallait écrire 2<i>x</i> + 7','Il fallait écrire <i>x</i> + 10'], ans:1, why:'Le facteur devant la parenthèse multiplie chaque terme : 2·<i>x</i> + 2·5 = 2<i>x</i> + 10.'},
 ]},
 {n:'Double distributivité', r:'Développer un produit', qs:[
   {q:'Développe (<i>x</i> + 4)(<i>x</i> − 2).', opts:['<i>x</i>² − 8','<i>x</i>² + 2<i>x</i> − 8','<i>x</i>² + 6<i>x</i> − 8','<i>x</i>² − 2<i>x</i> + 8'], ans:1, why:'Quatre produits : <i>x</i>² − 2<i>x</i> + 4<i>x</i> − 8 = <i>x</i>² + 2<i>x</i> − 8.'},
   {q:'On développe (2<i>x</i> − 1)(<i>x</i> + 3). Quel est le coefficient de <i>x</i>&nbsp;?', lab:'coefficient :', ans:5, why:'2<i>x</i>·<i>x</i> + 2<i>x</i>·3 − 1·<i>x</i> − 1·3 = 2<i>x</i>² + 6<i>x</i> − <i>x</i> − 3 = 2<i>x</i>² + 5<i>x</i> − 3.'},
   {q:'On développe (3<i>x</i> + 2)(2<i>x</i> − 5). Quel est le coefficient de <i>x</i>&nbsp;?', lab:'coefficient :', ans:-11, why:'Les deux produits en <i>x</i> sont 3<i>x</i>·(−5) = −15<i>x</i> et 2·2<i>x</i> = 4<i>x</i>. Total : −11<i>x</i>. Le développement complet est 6<i>x</i>² − 11<i>x</i> − 10.'},
   {q:'On développe (<i>x</i> − 5)(<i>x</i> − 1). Quel est le terme constant&nbsp;?', lab:'constante :', ans:5, why:'Le terme constant est le produit des deux nombres : (−5)·(−1) = +5. En entier : <i>x</i>² − 6<i>x</i> + 5.'},
   {q:'Un rectangle mesure <i>x</i> + 2 sur <i>x</i> + 7. Quelle expression donne son aire&nbsp;?', opts:['<i>x</i>² + 14','<i>x</i>² + 9<i>x</i> + 14','2<i>x</i> + 9','<i>x</i>² + 9<i>x</i> + 9'], ans:1, why:'(<i>x</i> + 2)(<i>x</i> + 7) = <i>x</i>² + 7<i>x</i> + 2<i>x</i> + 14 = <i>x</i>² + 9<i>x</i> + 14 : le grand rectangle se coupe en quatre morceaux.'},
 ]},
 {n:'Factoriser', r:'Développer un produit', qs:[
   {q:'Factorise 6<i>x</i> + 15.', opts:['6(<i>x</i> + 15)','3(2<i>x</i> + 5)','3(2<i>x</i> + 15)','2(3<i>x</i> + 5)'], ans:1, why:'3 divise 6 et 15 : 6<i>x</i> = 3·2<i>x</i> et 15 = 3·5. Contrôle : 3(2<i>x</i> + 5) = 6<i>x</i> + 15.'},
   {q:'Factorise 14<i>x</i> − 21.', opts:['7(2<i>x</i> − 3)','7(2<i>x</i> − 21)','2(7<i>x</i> − 3)','7(<i>x</i> − 3)'], ans:0, why:'Le facteur commun est 7 : 14<i>x</i> = 7·2<i>x</i> et 21 = 7·3. Contrôle : 7(2<i>x</i> − 3) = 14<i>x</i> − 21.'},
   {q:'Factorise <i>x</i>² + 5<i>x</i>.', opts:['5<i>x</i>(<i>x</i> + 1)','<i>x</i>(<i>x</i> + 5)','<i>x</i>²(1 + 5)','(<i>x</i> + 5)²'], ans:1, why:'<i>x</i> est dans les deux termes : <i>x</i>² = <i>x</i>·<i>x</i> et 5<i>x</i> = <i>x</i>·5. Contrôle : <i>x</i>(<i>x</i> + 5) = <i>x</i>² + 5<i>x</i>.'},
   {q:'Factorise 10<i>x</i>² − 4<i>x</i> le plus possible.', opts:['2(5<i>x</i>² − 2<i>x</i>)','<i>x</i>(10<i>x</i> − 4)','2<i>x</i>(5<i>x</i> − 2)','2<i>x</i>(5<i>x</i> − 4)'], ans:2, why:'Le facteur commun est 2<i>x</i> : 10<i>x</i>² = 2<i>x</i>·5<i>x</i> et 4<i>x</i> = 2<i>x</i>·2. Les deux premières réponses sont justes mais incomplètes : il reste un facteur commun dans la parenthèse.'},
 ]},
 {n:'Identités remarquables', r:'Utiliser les identités remarquables', qs:[
   {q:'Développe (<i>x</i> − 7)².', opts:['<i>x</i>² − 49','<i>x</i>² − 14<i>x</i> + 49','<i>x</i>² + 14<i>x</i> + 49','<i>x</i>² − 7<i>x</i> + 49'], ans:1, why:'(<i>a</i> − <i>b</i>)² = <i>a</i>² − 2<i>ab</i> + <i>b</i>² avec <i>a</i> = <i>x</i>, <i>b</i> = 7 : <i>x</i>² − 14<i>x</i> + 49.'},
   {q:'On développe (3<i>x</i> + 2)². Quel est le coefficient de <i>x</i>&nbsp;?', lab:'coefficient :', ans:12, why:'Le double produit vaut 2·3<i>x</i>·2 = 12<i>x</i>. En entier : 9<i>x</i>² + 12<i>x</i> + 4.'},
   {q:'On développe (2<i>x</i> − 3)². Quel est le coefficient de <i>x</i>&nbsp;?', lab:'coefficient :', ans:-12, why:'Le double produit vaut −2·2<i>x</i>·3 = −12<i>x</i>. En entier : 4<i>x</i>² − 12<i>x</i> + 9.'},
   {q:'Développe (5<i>x</i> − 4)(5<i>x</i> + 4).', opts:['25<i>x</i>² − 16','5<i>x</i>² − 16','25<i>x</i>² + 16','25<i>x</i>² − 40<i>x</i> − 16'], ans:0, why:'(<i>a</i> − <i>b</i>)(<i>a</i> + <i>b</i>) = <i>a</i>² − <i>b</i>² avec <i>a</i> = 5<i>x</i> : (5<i>x</i>)² − 4² = 25<i>x</i>² − 16.'},
   {q:'Calcule 102² de tête avec une identité remarquable.', ans:10404, why:'102² = (100 + 2)² = 100² + 2·100·2 + 2² = 10 000 + 400 + 4 = 10 404.'},
   {q:'Calcule 49 × 51 de tête avec une identité remarquable.', ans:2499, why:'49 × 51 = (50 − 1)(50 + 1) = 50² − 1² = 2500 − 1 = 2499.'},
 ]},
 {n:'Réduire et remplacer', r:'Réduire, remplacer, résoudre', qs:[
   {q:'Réduis 4<i>x</i> − 3 + 2<i>x</i> + 7.', opts:['6<i>x</i> + 4','6<i>x</i> − 10','10<i>x</i>','6<i>x</i> + 10'], ans:0, why:'Les <i>x</i> ensemble : 4<i>x</i> + 2<i>x</i> = 6<i>x</i>. Les nombres ensemble : −3 + 7 = 4.'},
   {q:'Réduis 2(3<i>x</i> − 1) − (<i>x</i> + 5).', opts:['5<i>x</i> + 3','5<i>x</i> − 7','5<i>x</i> + 4','7<i>x</i> − 7'], ans:1, why:'2(3<i>x</i> − 1) = 6<i>x</i> − 2 et −(<i>x</i> + 5) = −<i>x</i> − 5. Total : 5<i>x</i> − 7.'},
   {q:'Réduis (<i>x</i> + 3)² − <i>x</i>².', opts:['9','6<i>x</i> + 9','3<i>x</i> + 9','2<i>x</i>² + 6<i>x</i> + 9'], ans:1, why:'(<i>x</i> + 3)² = <i>x</i>² + 6<i>x</i> + 9, puis les <i>x</i>² s’annulent : 6<i>x</i> + 9.'},
   {q:'Calcule 3<i>x</i>² − 2<i>x</i> + 1 pour <i>x</i> = −2.', ans:17, why:'D’abord la puissance : (−2)² = 4. Puis 3·4 − 2·(−2) + 1 = 12 + 4 + 1 = 17.'},
   {q:'Calcule (2<i>x</i> − 1)(<i>x</i> + 4) pour <i>x</i> = 3.', ans:35, why:'(2·3 − 1)(3 + 4) = 5·7 = 35. Pas besoin de développer pour remplacer.'},
 ]},
 {n:'Écrire et résoudre', r:'Réduire, remplacer, résoudre', qs:[
   {q:'Résous 3<i>x</i> + 7 = 31.', lab:'x =', ans:8, why:'On enlève 7 des deux côtés : 3<i>x</i> = 24. On divise par 3 : <i>x</i> = 8.'},
   {q:'Un rectangle mesure <i>x</i> de large et <i>x</i> + 4 de long. Son périmètre vaut 30. Que vaut <i>x</i>&nbsp;?', lab:'x =', ans:5.5, tol:0.001, why:'P = 2<i>x</i> + 2(<i>x</i> + 4) = 4<i>x</i> + 8 = 30, donc 4<i>x</i> = 22 et <i>x</i> = 5,5.'},
   {q:'Un carré de côté <i>x</i> + 1 a un périmètre de 36. Que vaut <i>x</i>&nbsp;?', lab:'x =', ans:8, why:'P = 4(<i>x</i> + 1) = 4<i>x</i> + 4 = 36, donc 4<i>x</i> = 32 et <i>x</i> = 8. Le côté mesure 9.'},
   {q:'Un carré de côté <i>x</i> est agrandi en un carré de côté <i>x</i> + 3. L’aire gagne 51. Que vaut <i>x</i>&nbsp;?', lab:'x =', ans:7, why:'(<i>x</i> + 3)² − <i>x</i>² = 6<i>x</i> + 9 = 51, donc 6<i>x</i> = 42 et <i>x</i> = 7. Contrôle : 100 − 49 = 51.'},
   {q:'Résous 5(<i>x</i> − 2) + 3<i>x</i> = 30.', lab:'x =', ans:5, why:'On développe et on réduit : 5<i>x</i> − 10 + 3<i>x</i> = 8<i>x</i> − 10 = 30. Donc 8<i>x</i> = 40 et <i>x</i> = 5.'},
 ]},
];
})();
