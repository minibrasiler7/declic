/* Déclic — examen de compétence : Fonctions (10e année) */
(()=>{
const line=(f,pts=[])=>{ const P=plane({x:[-5,5],y:[-5,5],lab:1}); P.fn(f,{c:'var(--accent)'}); pts.forEach(p=>P.dot(p[0],p[1])); return P.svg(); };
const bars=(data,max,step)=>{ const n=data.length, P=plane({x:[-1.4,n*1.4+.2],y:[-max*.16,max*1.1],h:200,grid:false,axes:false});
  for(let y=0;y<=max+1e-9;y+=step){ P.seg(-.2,y,n*1.4+.1,y,{c:'var(--line)',w:1}); P.text(-.35,y,fmt(y),{a:'end',dy:4,s:10,c:'var(--muted)'}); }
  data.forEach(([l,v],i)=>{ const x0=.3+i*1.4; P.rect(x0,0,.9,v,{fill:'var(--math)',fo:.55,c:'var(--math)',w:1.5}); P.text(x0+.45,0,l,{a:'middle',dy:15,s:11}); });
  return P.svg(); };
EXAMS['sec10-fonctions']=[
 {n:'Images, tableau et graphique', r:'Faire le tableau de valeurs et le graphique', qs:[
   {q:'Soit <i>f</i>(<i>x</i>) = 5<i>x</i> − 3. Calcule <i>f</i>(4).', ans:17, why:'<i>f</i>(4) = 5 · 4 − 3 = 20 − 3 = 17.'},
   {q:'Soit <i>g</i> : <i>x</i> ↦ 7 − 2<i>x</i>. Calcule <i>g</i>(−3).', ans:13, why:'<i>g</i>(−3) = 7 − 2 · (−3) = 7 + 6 = 13. Moins par moins donne plus.'},
   {q:'Pour <i>f</i>(<i>x</i>) = 2<i>x</i> + 5, quelle est la ligne des images pour <i>x</i> = −1, 0, 1&nbsp;?', opts:['−7 ; 5 ; 7','3 ; 5 ; 7','4 ; 5 ; 6','3 ; 2 ; 7'], ans:1, why:'<i>f</i>(−1) = −2 + 5 = 3, <i>f</i>(0) = 5, <i>f</i>(1) = 2 + 5 = 7.'},
   {q:'Le point (2 ; 1) est-il sur le graphique de <i>f</i> : <i>x</i> ↦ 4<i>x</i> − 7&nbsp;?', opts:['Non, car <i>f</i>(1) = −3','Oui, car <i>f</i>(2) = 1','Non, car <i>f</i>(2) = 8','On ne peut pas savoir sans dessiner'], ans:1, why:'On calcule l’image de l’abscisse : <i>f</i>(2) = 8 − 7 = 1. C’est bien l’ordonnée du point.'},
   {q:'Le point d’abscisse −2 du graphique de <i>h</i> : <i>x</i> ↦ 3<i>x</i> − 1 a pour ordonnée :', lab:'ordonnée :', ans:-7, why:'<i>h</i>(−2) = 3 · (−2) − 1 = −6 − 1 = −7. Le point est (−2 ; −7).'},
 ]},
 {n:'Pente et ordonnée à l’origine', r:'Lire la pente et l’ordonnée à l’origine', qs:[
   {q:'Quelle est l’ordonnée à l’origine de <i>f</i> : <i>x</i> ↦ −4<i>x</i> + 9&nbsp;?', ans:9, why:'C’est le nombre <i>b</i> de <i>ax</i> + <i>b</i> : <i>f</i>(0) = 9.'},
   {q:'Quelle est la pente de <i>f</i> : <i>x</i> ↦ 6 − 5<i>x</i>&nbsp;?', lab:'pente :', ans:-5, why:'6 − 5<i>x</i> = −5<i>x</i> + 6 : la pente est le coefficient de <i>x</i>, −5. L’ordre d’écriture ne change rien.'},
   {q:'Quelle est la pente de cette droite&nbsp;?', fig:line(t=>3*t-2,[[0,-2],[1,1]]), lab:'pente :', ans:3, why:'De (0 ; −2) à (1 ; 1) : 1 vers la droite, 3 vers le haut. La pente vaut 3.'},
   {q:'Cette droite descend. Quelle est sa pente&nbsp;?', fig:line(t=>4-2*t,[[0,4],[2,0]]), lab:'pente :', ans:-2, why:'De (0 ; 4) à (2 ; 0) : 2 vers la droite, 4 vers le bas. Pente : −4 : 2 = −2.'},
   {q:'Laquelle de ces fonctions est linéaire&nbsp;?', opts:['<i>x</i> ↦ <i>x</i> + 3','<i>x</i> ↦ 3','<i>x</i> ↦ 3<i>x</i>²','<i>x</i> ↦ −3<i>x</i>'], ans:3, why:'Une fonction linéaire s’écrit <i>x</i> ↦ <i>ax</i> (ordonnée à l’origine 0) : sa droite passe par l’origine. C’est −3<i>x</i>.'},
   {q:'Quelle fonction a ce graphique&nbsp;?', fig:line(()=>-2), opts:['<i>x</i> ↦ −2<i>x</i>','<i>x</i> ↦ −2','<i>x</i> ↦ <i>x</i> − 2','<i>x</i> ↦ 2'], ans:1, why:'La droite est horizontale à la hauteur −2 : toutes les images valent −2. C’est la fonction constante <i>x</i> ↦ −2.'},
 ]},
 {n:'La parabole x ↦ ax²', r:'La parabole x ↦ ax²', qs:[
   {q:'Soit <i>f</i>(<i>x</i>) = 3<i>x</i>². Calcule <i>f</i>(−2).', ans:12, why:'(−2)² = 4, donc <i>f</i>(−2) = 3 · 4 = 12. Le carré se calcule avant la multiplication.'},
   {q:'Soit <i>g</i>(<i>x</i>) = −2<i>x</i>². Calcule <i>g</i>(3).', ans:-18, why:'3² = 9, donc <i>g</i>(3) = −2 · 9 = −18.'},
   {q:'Quelle fonction a pour graphique une parabole ouverte vers le bas&nbsp;?', opts:['<i>x</i> ↦ 4<i>x</i>²','<i>x</i> ↦ −<i>x</i>²','<i>x</i> ↦ −4<i>x</i>','<i>x</i> ↦ 0,5<i>x</i>²'], ans:1, why:'<i>x</i> ↦ <i>ax</i>² est ouverte vers le bas quand <i>a</i> &lt; 0 : ici <i>a</i> = −1. −4<i>x</i> est une droite.'},
   {q:'Pour une fonction <i>f</i> : <i>x</i> ↦ <i>ax</i>², on sait que <i>f</i>(2) = 12. Que vaut <i>f</i>(4)&nbsp;?', ans:48, why:'4<i>a</i> = 12 donne <i>a</i> = 3, donc <i>f</i>(4) = 3 · 16 = 48. Quand <i>x</i> double, l’image est multipliée par 4.'},
 ]},
 {n:'Échelles et pentes', r:'Échelle de carte et pente d’une route', qs:[
   {q:'Sur une carte au 1 : 25 000, deux villages sont à 8 cm. Quelle est la distance réelle&nbsp;?', unit:'km', ans:2, why:'8 · 25 000 = 200 000 cm = 2000 m = 2 km.'},
   {q:'Sur le plan d’une maison au 1 : 200, le salon mesure 4,5 cm de long. Quelle est sa longueur réelle&nbsp;?', unit:'m', ans:9, tol:0.001, why:'4,5 · 200 = 900 cm = 9 m.'},
   {q:'Deux sommets sont à 3 km l’un de l’autre. Quelle distance les sépare sur une carte au 1 : 50 000&nbsp;?', unit:'cm', ans:6, why:'3 km = 300 000 cm, et 300 000 : 50 000 = 6 cm. Pour passer du réel à la carte, on divise.'},
   {q:'Une route de pente 12 % parcourt 250 m à l’horizontale. De combien monte-t-elle&nbsp;?', unit:'m', ans:30, why:'0,12 · 250 = 30 m.'},
   {q:'Une rampe monte de 0,9 m pour 6 m à l’horizontale. Quelle est sa pente&nbsp;?', unit:'%', ans:15, why:'0,9 : 6 = 0,15 = 15 %.'},
 ]},
 {n:'Pourcentages : hausse et rabais', r:'Augmenter ou baisser d’un pourcentage', qs:[
   {q:'Un casque audio à 80 CHF est soldé à −25 %. Quel est son nouveau prix&nbsp;?', unit:'CHF', ans:60, why:'On paie 75 % : 80 · 0,75 = 60 CHF.'},
   {q:'Un vélo à 250 CHF augmente de 8 %. Quel est son nouveau prix&nbsp;?', unit:'CHF', ans:270, why:'On multiplie par 1,08 : 250 · 1,08 = 270 CHF.'},
   {q:'Par quel nombre multiplie-t-on un prix pour le baisser de 15 %&nbsp;?', opts:['0,15','1,15','0,85','−0,15'], ans:2, why:'Il reste 100 % − 15 % = 85 % du prix : on multiplie par 0,85.'},
   {q:'Un billet passe de 45 CHF à 54 CHF. De combien de pour cent a-t-il augmenté&nbsp;?', unit:'%', ans:20, why:'54 : 45 = 1,2 : le prix a été multiplié par 1,2, soit une hausse de 20 %.'},
   {q:'Un prix baisse de 10 %, puis augmente de 10 %. Le prix final est :', opts:['égal au prix de départ','99 % du prix de départ','101 % du prix de départ','90 % du prix de départ'], ans:1, why:'0,9 · 1,1 = 0,99 : on obtient 99 % du prix de départ. La hausse se calcule sur un prix déjà baissé.'},
 ]},
 {n:'Diagrammes', r:'Lire et construire un diagramme', qs:[
   {q:'Dans un sondage, 9 jeunes sur 36 préfèrent le skate. Quel angle a le secteur « skate » dans un diagramme circulaire&nbsp;?', unit:'°', ans:90, why:'9 : 36 = 0,25, et 0,25 · 360° = 90°.'},
   {q:'Dans un diagramme circulaire, un secteur mesure 72°. Quelle part du total représente-t-il&nbsp;?', unit:'%', ans:20, why:'72 : 360 = 0,2 = 20 %.'},
   {q:'50 personnes ont répondu à un sondage. Le secteur « randonnée » mesure 144°. Combien de personnes ont choisi la randonnée&nbsp;?', ans:20, why:'144 : 360 = 0,4, et 0,4 · 50 = 20 personnes.'},
   {q:'Le diagramme montre le nombre de livres lus en une année par quatre amis. Combien de livres Zoé a-t-elle lus de plus que Malik&nbsp;?', fig:bars([['Zoé',14],['Malik',6],['Inès',10],['Noah',8]],16,2), ans:8, why:'On lit les hauteurs : Zoé 14, Malik 6. Différence : 14 − 6 = 8 livres.'},
   {q:'Pour montrer comment un budget de vacances se partage entre transport, logement, nourriture et loisirs, le diagramme le plus adapté est :', opts:['un diagramme en barres des températures','un diagramme circulaire','un graphique d’une parabole','une droite par l’origine'], ans:1, why:'Le diagramme circulaire montre comment un tout se partage en parts : chaque secteur est proportionnel à sa part du total.'},
 ]},
];
})();
