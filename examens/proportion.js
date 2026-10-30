/* Déclic — examen de compétence : Proportionnalité et pourcentages */
(()=>{
EXAMS['proportion']=[
 {n:'Reconnaître la proportionnalité', r:'Proportionnel = droite qui passe par 0', qs:[
   {q:'Dans lequel de ces tableaux la 2e ligne est-elle proportionnelle à la 1re&nbsp;?', opts:['1, 2, 3 → 3, 5, 7','2, 4, 6 → 5, 10, 15','2, 3, 4 → 4, 9, 16','5, 10, 15 → 10, 15, 20'], ans:1, why:'On multiplie toujours par 2,5 : 2 × 2,5 = 5, 4 × 2,5 = 10, 6 × 2,5 = 15. Dans les autres, le rapport change d’une colonne à l’autre.'},
   {q:'Un taxi coûte 5 CHF de prise en charge, plus 2 CHF par kilomètre. Le prix est-il proportionnel à la distance&nbsp;?', opts:['Oui, car le prix augmente avec la distance','Non : pour 0 km, on paie déjà 5 CHF, la droite ne passe pas par l’origine','Oui, avec un coefficient de 2','Oui, avec un coefficient de 7'], ans:1, why:'Proportionnel veut dire multiplier toujours par le même nombre, donc 0 km coûterait 0 CHF. Ici 10 km coûtent 25 CHF mais 20 km coûtent 45 CHF, pas le double.'},
   {q:'3 kg de poires coûtent 8,40 CHF. Quel est le prix d’un kilo&nbsp;?', unit:'CHF', ans:2.8, tol:0.001, why:'On passe par l’unité : 8,40 ÷ 3 = 2,80 CHF. C’est le coefficient de proportionnalité.'},
   {q:'Il faut 12 L de peinture pour 8 m² de façade. Combien de litres faut-il par mètre carré&nbsp;?', unit:'L', ans:1.5, tol:0.001, why:'12 ÷ 8 = 1,5 L par m².'},
 ]},
 {n:'La règle de trois', r:'La règle de trois : passer par l’unité', qs:[
   {q:'6 croissants coûtent 7,20 CHF. Combien coûtent 10 croissants&nbsp;?', unit:'CHF', ans:12, tol:0.001, why:'1 croissant : 7,20 ÷ 6 = 1,20 CHF. 10 croissants : 10 × 1,20 = 12 CHF.'},
   {q:'5 m de tissu coûtent 42,50 CHF. Combien coûtent 8 m&nbsp;?', unit:'CHF', ans:68, tol:0.001, why:'1 m : 42,50 ÷ 5 = 8,50 CHF. 8 m : 8 × 8,50 = 68 CHF.'},
   {q:'Une recette pour 4 personnes demande 250 g de farine. Combien en faut-il pour 6 personnes&nbsp;?', unit:'g', ans:375, tol:0.001, why:'Pour 1 personne : 250 ÷ 4 = 62,5 g. Pour 6 : 6 × 62,5 = 375 g.'},
   {q:'Une voiture consomme 6,5 L d’essence pour 100 km. Combien consomme-t-elle pour 340 km&nbsp;?', unit:'L', ans:22.1, tol:0.001, why:'Pour 1 km : 6,5 ÷ 100 = 0,065 L. Pour 340 km : 340 × 0,065 = 22,1 L.'},
   {q:'Un robinet remplit 15 L en 6 minutes. Combien de minutes faut-il pour remplir 40 L&nbsp;?', unit:'min', ans:16, tol:0.001, why:'Pour 1 L : 6 ÷ 15 = 0,4 min. Pour 40 L : 40 × 0,4 = 16 min.'},
   {q:'Laquelle de ces situations n’est <b>pas</b> proportionnelle&nbsp;?', opts:['Le prix payé et le nombre de litres d’essence','La taille d’un enfant et son âge','Le périmètre d’un carré et la longueur de son côté','La distance parcourue à vitesse constante et la durée'], ans:1, why:'Un enfant de 10 ans ne mesure pas le double d’un enfant de 5 ans. Dans les trois autres cas, on multiplie toujours par le même nombre (prix au litre, 4, vitesse).'},
 ]},
 {n:'Le coefficient multiplicateur', r:'Le coefficient multiplicateur', qs:[
   {q:'Un loyer de 250 CHF augmente de 12 %. Quel est le nouveau loyer&nbsp;?', unit:'CHF', ans:280, tol:0.001, why:'+12 % → × 1,12 : 250 × 1,12 = 280 CHF.'},
   {q:'Un article à 80 CHF est soldé à −35 %. Quel est son prix soldé&nbsp;?', unit:'CHF', ans:52, tol:0.001, why:'−35 % → × (1 − 0,35) = × 0,65 : 80 × 0,65 = 52 CHF.'},
   {q:'Par quel nombre multiplie-t-on un prix pour le baisser de 8 %&nbsp;?', lab:'×', ans:0.92, tol:0.0001, why:'Baisser de 8 %, c’est multiplier par 1 − 8/100 = 0,92.'},
   {q:'Un prix augmente de 10 %, puis encore de 10 %. De combien de pour cent a-t-il augmenté au total&nbsp;?', unit:'%', ans:21, tol:0.001, why:'1,1 × 1,1 = 1,21 = 1 + 21/100 : une hausse de 21 %, pas de 20 %. La 2e hausse porte sur un prix déjà augmenté.'},
   {q:'Un prix baisse de 25 %, puis augmente de 20 %. Au final&nbsp;?', opts:['Il a baissé de 5 %','Il a baissé de 10 %','Il revient au prix de départ','Il a augmenté de 5 %'], ans:1, why:'0,75 × 1,2 = 0,9 : on paie 90 % du prix de départ, soit une baisse de 10 %.'},
   {q:'Après une baisse de 30 %, un vélo coûte 63 CHF. Quel était son prix de départ&nbsp;?', unit:'CHF', ans:90, tol:0.001, why:'Prix soldé = prix de départ × 0,7. On divise par le coefficient : 63 ÷ 0,7 = 90 CHF. Ajouter 30 % de 63 serait faux.'},
   {q:'Un abonnement passe de 40 CHF à 46 CHF. De combien de pour cent a-t-il augmenté&nbsp;?', unit:'%', ans:15, tol:0.001, why:'Coefficient : 46 ÷ 40 = 1,15 = 1 + 15/100, soit +15 %.'},
   {q:'Après une hausse de 25 %, un billet coûte 75 CHF. Quel était son prix avant la hausse&nbsp;?', unit:'CHF', ans:60, tol:0.001, why:'On divise par le coefficient 1,25 : 75 ÷ 1,25 = 60 CHF. Contrôle : 60 × 1,25 = 75.'},
 ]},
 {n:'La TVA', r:'Le coefficient multiplicateur', qs:[
   {q:'Un objet coûte 150 CHF hors taxe. Avec une TVA de 8,1 %, combien paie-t-on&nbsp;?', unit:'CHF', ans:162.15, tol:0.001, why:'Prix TTC = prix HT × 1,081 : 150 × 1,081 = 162,15 CHF.'},
   {q:'Un prix TTC vaut 108,10 CHF avec une TVA de 8,1 %. Quel est le prix hors taxe&nbsp;?', unit:'CHF', ans:100, tol:0.001, why:'On divise par le coefficient : 108,10 ÷ 1,081 = 100 CHF.'},
   {q:'Des livres sont soumis à une TVA de 2,6 %. Un livre coûte 50 CHF hors taxe. Quel est son prix TTC&nbsp;?', unit:'CHF', ans:51.3, tol:0.001, why:'50 × 1,026 = 51,30 CHF.'},
 ]},
 {n:'Échelles', r:'Échelles et vitesses', qs:[
   {q:'Sur une carte au 1:25 000, un sentier mesure 9 cm. Quelle est sa longueur réelle&nbsp;?', unit:'km', ans:2.25, tol:0.001, why:'9 × 25 000 = 225 000 cm = 2 250 m = 2,25 km.'},
   {q:'Sur une carte au 1:200 000, combien de centimètres représentent 15 km&nbsp;?', unit:'cm', ans:7.5, tol:0.001, why:'15 km = 1 500 000 cm, et 1 500 000 ÷ 200 000 = 7,5 cm.'},
   {q:'Sur une carte, 2 km réels mesurent 4 cm. Quelle est l’échelle de la carte (1 : ?)&nbsp;?', lab:'1 :', ans:50000, why:'2 km = 200 000 cm. n = longueur réelle ÷ longueur sur la carte = 200 000 ÷ 4 = 50 000.'},
   {q:'Sur une carte au 1:10 000, que représente 1 cm&nbsp;?', opts:['10 m','100 m','1 km','10 km'], ans:1, why:'1 cm × 10 000 = 10 000 cm = 100 m.'},
 ]},
 {n:'Vitesses et durées', r:'Échelles et vitesses', qs:[
   {q:'Combien de minutes faut-il pour parcourir 12 km à 4,8 km/h&nbsp;?', unit:'min', ans:150, tol:0.001, why:'Durée = 12 ÷ 4,8 = 2,5 h, et 2,5 × 60 = 150 min.'},
   {q:'Combien de minutes faut-il pour parcourir 7,5 km à 5 km/h&nbsp;?', unit:'min', ans:90, tol:0.001, why:'7,5 ÷ 5 = 1,5 h = 90 min.'},
   {q:'Une cycliste roule à 4 km/h dans une montée de 1,2 km. Combien de minutes met-elle&nbsp;?', unit:'min', ans:18, tol:0.001, why:'1,2 ÷ 4 = 0,3 h, et 0,3 × 60 = 18 min.'},
   {q:'Un train roule à 90 km/h. Quelle distance parcourt-il en 20 minutes&nbsp;?', unit:'km', ans:30, tol:0.001, why:'20 min = 20/60 h. La distance est proportionnelle à la durée : 90 × 20 ÷ 60 = 30 km.'},
 ]},
];
})();
