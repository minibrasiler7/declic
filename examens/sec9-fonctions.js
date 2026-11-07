/* Déclic — examen de compétence : Tableaux, graphiques et proportionnalité */
(()=>{
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;
// graphique du parking : 2 CHF + 1,50 CHF par heure
const PARKING=(()=>{ const x1=5,y1=10, P=plane({x:[-x1*.12,x1*1.06],y:[-y1*.14,y1*1.08],w:320,h:230,grid:false,axes:false});
  for(let x=1;x<=x1;x++){ P.seg(x,0,x,y1,{c:'var(--line)',w:1}); P.text(x,0,fmt(x),{a:'middle',dy:15,s:11,c:'var(--muted)'}); }
  for(let y=1;y<=y1;y++){ P.seg(0,y,x1,y,{c:'var(--line)',w:1}); P.text(0,y,fmt(y),{a:'end',dx:-4,dy:4,s:11,c:'var(--muted)'}); }
  P.arrow(0,0,x1*1.05,0,{c:'var(--muted)',w:1.5,hs:8}).arrow(0,0,0,y1*1.07,{c:'var(--muted)',w:1.5,hs:8});
  P.text(x1*1.05,0,'heures',{a:'end',dy:-8,s:11,c:'var(--muted)'}).text(0,y1*1.07,'prix (CHF)',{dx:8,dy:10,s:11,c:'var(--muted)'});
  P.fn(x=>2+1.5*x,{from:0,to:5,w:2.5}); [0,1,2,3,4,5].forEach(h=>P.dot(h,2+1.5*h,{r:4}));
  return P.svg(); })();
const HOR=tab([['Ligne 7','bus 1','bus 2','bus 3'],['Port','9 h 10','9 h 40','10 h 10'],['Musée','9 h 22','9 h 52','10 h 22'],['Château','9 h 35','10 h 05','10 h 35']]);
const LIVRES=(()=>{ const vals=[12,20,8,16], labs=['lundi','mardi','mercredi','jeudi'], M=24, n=4, P=plane({x:[-1.3,n*1.6+.2],y:[-M*.16,M*1.12],w:320,h:200,grid:false,axes:false});
  for(let y=0;y<=M;y+=4){ P.seg(0,y,n*1.6,y,{c:'var(--line)',w:1}); P.text(0,y,fmt(y),{a:'end',dx:-5,dy:4,s:11,c:'var(--muted)'}); }
  vals.forEach((v,i)=>{ const x=.3+i*1.6; P.rect(x,0,1.1,v,{fill:'var(--accent)',fo:.6,c:'var(--ink)',w:1.2}); P.text(x+.55,0,labs[i],{a:'middle',dy:16,s:11,c:'var(--ink)'}); });
  P.seg(0,0,n*1.6,0,{c:'var(--muted)',w:1.5}).seg(0,0,0,M*1.08,{c:'var(--muted)',w:1.5}).text(0,M*1.12,'livres prêtés',{dx:6,dy:12,s:11,c:'var(--muted)'});
  return P.svg(); })();
EXAMS['sec9-fonctions']=[
 {n:'Machine à calculer et tableau de valeurs',r:'Une machine à calculer',qs:[
   {q:'Une machine fait « × 4 puis − 3 ». Quel nombre sort si on entre 6&nbsp;?',lab:'sortie =',ans:21,why:'6 × 4 = 24, puis 24 − 3 = 21.'},
   {q:'Une machine fait « + 5 puis × 2 ». Quel nombre sort si on entre 7&nbsp;?',lab:'sortie =',ans:24,why:'7 + 5 = 12, puis 12 × 2 = 24.'},
   {q:'Une machine fait « × 3 puis + 2 ». Il est sorti 29. Quel nombre est entré&nbsp;?',lab:'entrée =',ans:9,why:'On remonte la machine avec les opérations contraires, dans l’ordre inverse : 29 − 2 = 27, puis 27 ÷ 3 = 9. Contrôle : 9 × 3 + 2 = 29.'},
   {q:'Pour l’entrée 4, que donnent la machine « × 2 puis + 1 » et la machine « + 1 puis × 2 »&nbsp;?',opts:['9 toutes les deux','9 pour la première, 10 pour la seconde','10 pour la première, 9 pour la seconde','10 toutes les deux'],ans:1,why:'4 × 2 + 1 = 9, mais (4 + 1) × 2 = 10. L’ordre des opérations compte.'},
   {q:'Une location de vélo coûte 8 CHF, plus 3 CHF par heure. Dans le tableau de valeurs, quel prix faut-il écrire sous 5 heures&nbsp;?',unit:'CHF',ans:23,why:'La machine est « × 3 puis + 8 » : 5 × 3 + 8 = 15 + 8 = 23 CHF.'},
 ]},
 {n:'Lire et construire un graphique',r:'Passer du tableau au graphique et inversement',qs:[
   {q:'Le graphique donne le prix d’un parking selon la durée. Lis le prix pour 4 heures.',fig:PARKING,unit:'CHF',ans:8,why:'On part de 4 sur l’axe horizontal, on monte jusqu’au point, puis on va à gauche jusqu’à l’axe vertical : 8 CHF (2 + 4 × 1,50 = 8).'},
   {q:'Le graphique donne le prix d’un parking selon la durée. Combien d’heures peut-on stationner pour 5 CHF&nbsp;?',fig:PARKING,unit:'h',ans:2,why:'On part de 5 sur l’axe vertical, on va à droite jusqu’à la ligne, puis on descend : 2 heures (2 + 2 × 1,50 = 5).'},
   {q:'Dans le point P(6 ; 14) d’un graphique, que représente le nombre 6&nbsp;?',opts:['l’ordonnée, lue sur l’axe vertical','l’abscisse, lue sur l’axe horizontal','la distance entre P et l’origine','le prix'],ans:1,why:'Le premier nombre est l’abscisse : on avance de 6 sur l’axe horizontal. 14 est l’ordonnée, lue sur l’axe vertical.'},
   {q:'On place les points (1 ; 5), (2 ; 10) et (3 ; 15), on constate qu’ils sont alignés et on prolonge la droite. Quelle ordonnée lit-on pour l’abscisse 5&nbsp;?',lab:'ordonnée =',ans:25,why:'L’ordonnée augmente de 5 quand l’abscisse augmente de 1 : 15, 20, 25. Pour l’abscisse 5, on lit 25.'},
 ]},
 {n:'Reconnaître la proportionnalité',r:'Reconnaître une situation de proportionnalité',qs:[
   {q:'Lequel de ces tableaux est un tableau de proportionnalité&nbsp;?',opts:['2 → 6, 3 → 9, 5 → 16','1 → 4, 2 → 8, 5 → 20','2 → 5, 4 → 7, 6 → 9','1 → 1, 2 → 4, 3 → 9'],ans:1,why:'Seul le 2e a toujours le même quotient : 4 ÷ 1 = 8 ÷ 2 = 20 ÷ 5 = 4. Dans le 1er, 16 ÷ 5 = 3,2 et non 3.'},
   {q:'Le graphique d’une situation de proportionnalité est…',opts:['une courbe qui monte de plus en plus vite','une droite qui ne passe pas par l’origine','une droite qui passe par l’origine','toujours une ligne horizontale'],ans:2,why:'Multiplier toujours par le même nombre donne des points alignés, et l’entrée 0 donne 0 : la droite passe par l’origine.'},
   {q:'Laquelle de ces situations n’est <b>pas</b> proportionnelle&nbsp;?',opts:['Le prix de pommes à 3 CHF le kilo et leur masse','Ta taille et ton âge','Le périmètre d’un carré et la longueur de son côté','La distance parcourue à vitesse constante et la durée'],ans:1,why:'À 10 ans, tu ne mesures pas deux fois plus qu’à 5 ans. Les trois autres se calculent en multipliant toujours par le même nombre (3, 4, la vitesse).'},
   {q:'Un taxi coûte 6 CHF au départ, plus 2 CHF par kilomètre. Pourquoi le prix n’est-il pas proportionnel à la distance&nbsp;?',opts:['Parce que 2 n’est pas un grand nombre','Parce que pour 0 km, on paie déjà 6 CHF','Parce que le prix augmente avec la distance','Il est proportionnel'],ans:1,why:'Dans une situation proportionnelle, 0 donne 0. Ici, 0 km coûte 6 CHF, et 1 km coûte 8 CHF mais 2 km coûtent 10 CHF, pas 16 CHF.'},
 ]},
 {n:'Facteur de proportionnalité',r:'Trouver le facteur de proportionnalité',qs:[
   {q:'5 stylos identiques coûtent 7 CHF. Quel est le facteur de proportionnalité, c’est-à-dire le prix d’un stylo&nbsp;?',unit:'CHF',ans:1.4,tol:1e-6,why:'7 ÷ 5 = 1,4 : un stylo coûte 1,40 CHF.'},
   {q:'Ce tableau est proportionnel. Quel nombre faut-il écrire à la place du point d’interrogation&nbsp;?',fig:tab([['Masse (kg)','2','5','8'],['Prix (CHF)','7','17,50','?']]),unit:'CHF',ans:28,tol:1e-6,why:'7 ÷ 2 = 3,5 et 17,50 ÷ 5 = 3,5 : le facteur est 3,5. 8 × 3,5 = 28 CHF.'},
   {q:'Une imprimante imprime 18 pages en 3 minutes, toujours au même rythme. Combien de pages imprime-t-elle en 7 minutes&nbsp;?',lab:'pages =',ans:42,why:'18 ÷ 3 = 6 pages par minute. 7 × 6 = 42 pages.'},
   {q:'Dans un tableau de proportionnalité, on multiplie la 1re ligne par 2,5 pour obtenir la 2e. Quel nombre de la 1re ligne correspond à 45&nbsp;?',lab:'nombre =',ans:18,tol:1e-6,why:'Pour remonter, on divise par le facteur : 45 ÷ 2,5 = 18. Contrôle : 18 × 2,5 = 45.'},
 ]},
 {n:'Règle de trois',r:'La règle de trois (passer par l’unité)',qs:[
   {q:'Pour 6 personnes, un gâteau demande 180 g de sucre. Combien de sucre faut-il pour 10 personnes&nbsp;?',unit:'g',ans:300,tol:1e-6,why:'180 : 6 = 30 g par personne, puis 30 × 10 = 300 g.'},
   {q:'3 kg de cerises coûtent 22,50 CHF. Combien coûtent 2 kg&nbsp;?',unit:'CHF',ans:15,tol:1e-6,why:'22,50 : 3 = 7,50 CHF le kilo, puis 7,50 × 2 = 15 CHF.'},
   {q:'Ce jour-là, 20 € valent 19 CHF. Combien de francs faut-il pour 70 €&nbsp;?',unit:'CHF',ans:66.5,tol:1e-6,why:'19 : 20 = 0,95 CHF pour 1 €, puis 0,95 × 70 = 66,50 CHF.'},
   {q:'Ce jour-là, 1 CHF vaut 1,05 €. Combien d’euros reçois-tu pour 40 CHF&nbsp;?',unit:'€',ans:42,tol:1e-6,why:'40 × 1,05 = 42 €.'},
   {q:'Un robinet remplit 15 L en 4 minutes, toujours au même débit. Combien de litres remplit-il en 10 minutes&nbsp;?',unit:'L',ans:37.5,tol:1e-6,why:'15 : 4 = 3,75 L par minute, puis 3,75 × 10 = 37,5 L.'},
 ]},
 {n:'Agrandir et réduire',r:'Agrandir et réduire une figure',qs:[
   {q:'Un rectangle de 4 cm sur 7 cm est agrandi avec le rapport 3. Combien mesure le grand côté de l’image&nbsp;?',unit:'cm',ans:21,why:'Toutes les longueurs sont multipliées par 3 : 7 × 3 = 21 cm.'},
   {q:'Une photo de 10 cm sur 15 cm est réduite : sa largeur passe de 10 cm à 4 cm. Combien mesure sa nouvelle longueur&nbsp;?',unit:'cm',ans:6,tol:1e-6,why:'Le rapport vaut 4 ÷ 10 = 0,4. La longueur devient 15 × 0,4 = 6 cm.'},
   {q:'Un triangle a des côtés de 3 cm, 4 cm et 5 cm. Dans son agrandissement, le côté qui correspond à 4 cm mesure 12 cm. Combien mesure le côté qui correspond à 5 cm&nbsp;?',unit:'cm',ans:15,why:'Le rapport vaut 12 ÷ 4 = 3. Le côté de 5 cm devient 5 × 3 = 15 cm.'},
   {q:'Un carré de 2 cm de côté est agrandi avec le rapport 3. Que devient son aire&nbsp;?',opts:['Elle est multipliée par 3','Elle est multipliée par 9','Elle est multipliée par 6','Elle ne change pas'],ans:1,why:'Le côté passe de 2 cm à 6 cm. L’aire passe de 2 × 2 = 4 cm² à 6 × 6 = 36 cm² : elle est multipliée par 9, pas par 3.'},
 ]},
 {n:'Horaires et diagrammes',r:'Lire un horaire ou un diagramme',qs:[
   {q:'Avec cet horaire, combien de minutes dure le trajet du Port au Château&nbsp;?',fig:HOR,unit:'min',ans:25,why:'On suit le bus 1 : départ du Port à 9 h 10, arrivée au Château à 9 h 35. 35 − 10 = 25 minutes.'},
   {q:'Avec cet horaire, tu arrives au Musée à 9 h 30. À quelle heure passe le prochain bus&nbsp;? Réponds par les minutes après 9 h (par exemple, 9 h 05 s’écrit 5).',fig:HOR,lab:'minutes après 9 h =',ans:52,why:'Sur la ligne « Musée », le bus de 9 h 22 est déjà passé. Le suivant passe à 9 h 52.'},
   {q:'Combien de livres la bibliothèque a-t-elle prêtés en tout pendant ces quatre jours&nbsp;?',fig:LIVRES,lab:'livres =',ans:56,why:'On lit les hauteurs avec la graduation de 4 en 4 : 12, 20, 8 et 16. Total : 12 + 20 + 8 + 16 = 56 livres.'},
   {q:'Dans un diagramme en colonnes, un carreau vaut 5 élèves. La colonne « vélo » mesure 7 carreaux. Combien d’élèves viennent à vélo&nbsp;?',lab:'élèves =',ans:35,why:'7 carreaux × 5 élèves = 35 élèves.'},
   {q:'Tu construis un diagramme en colonnes où 1 cm de hauteur représente 4 élèves. Quelle hauteur donnes-tu à la colonne de 26 élèves&nbsp;?',unit:'cm',ans:6.5,tol:1e-6,why:'La hauteur est proportionnelle au nombre d’élèves : 26 ÷ 4 = 6,5 cm.'},
 ]},
];
})();
