/* Déclic — examen de compétence : Périmètres et aires */
(()=>{
const angDroit=(P,x,y,dx,dy,s=.3)=>P.poly([[x+dx*s,y],[x+dx*s,y+dy*s],[x,y+dy*s]],{open:true,c:'var(--ink)',w:1.3});
const fig=(xr,yr,pts,labs,extra)=>{ const P=plane({x:xr,y:yr,w:260,axes:false}); P.poly(pts,{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:3}); if(extra) extra(P); labs.forEach(([x,y,s,q])=>P.text(x,y,s,Object.assign({a:'middle',s:12},q||{}))); return P.svg(); };
EXAMS['sec9-aires']=[
 {n:'Convertir des longueurs', r:'Convertir une longueur', qs:[
   {q:'Convertis 4,2 km en mètres.', unit:'m', ans:4200, why:'De km à m, il y a 3 colonnes : 4,2 × 1000 = 4200 m.'},
   {q:'Convertis 356 cm en mètres.', unit:'m', ans:3.56, tol:.001, why:'De cm à m, 2 colonnes vers la gauche : 356 ÷ 100 = 3,56 m.'},
   {q:'Convertis 0,8 dm en millimètres.', unit:'mm', ans:80, why:'De dm à mm, 2 colonnes vers la droite : 0,8 × 100 = 80 mm.'},
   {q:'25 mm, c’est…', opts:['2,5 cm','25 cm','0,25 cm','250 cm'], ans:0, why:'10 mm = 1 cm, donc 25 mm = 25 ÷ 10 = 2,5 cm. Passer à une unité plus grande fait diminuer le nombre.'},
   {q:'Quelle est la plus grande de ces longueurs&nbsp;?', opts:['450 m','52 000 cm','0,5 km','4800 dm'], ans:1, why:'En mètres : 450 m, 52 000 cm = 520 m, 0,5 km = 500 m, 4800 dm = 480 m. La plus grande est 52 000 cm.'},
 ]},
 {n:'Calculer un périmètre', r:'Calculer un périmètre', qs:[
   {q:'Quel est le périmètre d’un carré de 7,5 cm de côté&nbsp;?', unit:'cm', ans:30, tol:.001, why:'4 × 7,5 = 30 cm.'},
   {q:'Quel est le périmètre d’un rectangle de 12 m sur 4,5 m&nbsp;?', unit:'m', ans:33, tol:.001, why:'2 × (12 + 4,5) = 2 × 16,5 = 33 m.'},
   {q:'Un triangle a des côtés de 8 cm, 65 mm et 1 dm. Quel est son périmètre, en cm&nbsp;?', unit:'cm', ans:24.5, tol:.001, why:'On convertit tout en cm : 65 mm = 6,5 cm et 1 dm = 10 cm. Puis 8 + 6,5 + 10 = 24,5 cm.'},
   {q:'Un hexagone régulier (6 côtés égaux) a un périmètre de 42 cm. Combien mesure un côté&nbsp;?', unit:'cm', ans:7, why:'Les 6 côtés sont égaux : 42 ÷ 6 = 7 cm.'},
   {q:'Quel est le périmètre de cette figure&nbsp;? Les longueurs sont en cm.', fig:fig([-1,7],[-1,4.8],[[0,0],[6,0],[6,2],[4,2],[4,4],[0,4]],[[3,0,'6',{dy:15}],[0,2,'4',{a:'end',dx:-5}],[6,1,'2',{a:'start',dx:5}],[2,4,'4',{dy:-6}]]), unit:'cm', ans:20, why:'Les côtés manquants se déduisent : 6 − 4 = 2 et 4 − 2 = 2. Périmètre : 6 + 2 + 2 + 2 + 4 + 4 = 20 cm, comme le rectangle de 6 × 4.'},
 ]},
 {n:'Aire du rectangle et du carré', r:'L’aire du rectangle et du carré', qs:[
   {q:'Quelle est l’aire d’un rectangle de 9 cm sur 6 cm&nbsp;?', unit:'cm²', ans:54, why:'9 × 6 = 54 cm².'},
   {q:'Quelle est l’aire d’un carré de 12 m de côté&nbsp;?', unit:'m²', ans:144, why:'12 × 12 = 144 m².'},
   {q:'Un rectangle a une aire de 72 m² et une longueur de 9 m. Quelle est sa largeur&nbsp;?', unit:'m', ans:8, why:'9 × largeur = 72, donc largeur = 72 ÷ 9 = 8 m.'},
   {q:'Un carré a un périmètre de 20 cm. Quelle est son aire&nbsp;?', opts:['20 cm²','25 cm²','100 cm²','16 cm²'], ans:1, why:'Le côté vaut 20 ÷ 4 = 5 cm, donc l’aire vaut 5 × 5 = 25 cm². Le périmètre et l’aire sont deux mesures différentes.'},
 ]},
 {n:'Les formules d’aire', r:'Calculer une aire avec une formule', qs:[
   {q:'Quelle est l’aire de ce parallélogramme&nbsp;? Les longueurs sont en cm.', fig:fig([-.6,12],[-1,5.6],[[0,0],[8,0],[11.3,5],[3.3,5]],[[4,0,'8',{dy:15}],[3.3,2.5,'5',{a:'start',dx:5,c:'var(--other)'}],[1.3,2.7,'6',{a:'end',c:'var(--muted)'}]],P=>{ P.seg(3.3,5,3.3,0,{c:'var(--other)',w:2,dash:1}); angDroit(P,3.3,0,1,1,.5); }), unit:'cm²', ans:40, why:'Base × hauteur = 8 × 5 = 40 cm². Le côté penché de 6 cm n’est pas la hauteur.'},
   {q:'Un triangle a une base de 10 cm et une hauteur de 7 cm. Quelle est son aire&nbsp;?', unit:'cm²', ans:35, why:'10 × 7 ÷ 2 = 70 ÷ 2 = 35 cm².'},
   {q:'Quelle est l’aire de ce triangle&nbsp;? La hauteur tombe en dehors de la base. Les longueurs sont en cm.', fig:fig([-.6,7.5],[-1,6.6],[[0,0],[4,0],[6.5,6]],[[2,0,'4',{dy:15}],[6.5,3,'6',{a:'start',dx:5,c:'var(--other)'}]],P=>{ P.seg(6.5,6,6.5,0,{c:'var(--other)',w:2,dash:1}).seg(4,0,6.5,0,{c:'var(--muted)',w:1.5,dash:1}); angDroit(P,6.5,0,-1,1,.4); }), unit:'cm²', ans:12, why:'Base × hauteur ÷ 2 = 4 × 6 ÷ 2 = 12 cm². La hauteur se mesure sur le prolongement de la base, la formule ne change pas.'},
   {q:'Un losange a des diagonales de 10 cm et 6 cm. Quelle est son aire&nbsp;?', unit:'cm²', ans:30, why:'10 × 6 ÷ 2 = 30 cm² : la moitié du rectangle de 10 × 6 qui l’entoure.'},
   {q:'Un trapèze a des bases de 9 cm et 5 cm et une hauteur de 4 cm. Quelle est son aire&nbsp;?', unit:'cm²', ans:28, why:'(9 + 5) × 4 ÷ 2 = 14 × 4 ÷ 2 = 28 cm².'},
   {q:'Un triangle a une base de 6 cm, deux côtés penchés de 5 cm et une hauteur de 4 cm. Un élève calcule 6 × 5 ÷ 2 = 15 cm². Où est l’erreur&nbsp;?', opts:['Il ne fallait pas diviser par 2','Il a pris un côté penché au lieu de la hauteur','Il fallait additionner les côtés','Il n’y a pas d’erreur'], ans:1, why:'La hauteur est perpendiculaire à la base : c’est 4 cm, pas 5 cm. Aire = 6 × 4 ÷ 2 = 12 cm².'},
   {q:'Un triangle rectangle a des côtés de l’angle droit de 5 m et 8 m. Quelle est son aire&nbsp;?', unit:'m²', ans:20, why:'Les deux côtés de l’angle droit sont une base et sa hauteur : 5 × 8 ÷ 2 = 20 m².'},
 ]},
 {n:'Aire par décomposition', r:'Calculer une aire par décomposition', qs:[
   {q:'Quelle est l’aire de cette figure&nbsp;? Les longueurs sont en m.', fig:fig([-1,9],[-1,6.8],[[0,0],[8,0],[8,4],[5,4],[5,6],[0,6]],[[4,0,'8',{dy:15}],[0,3,'6',{a:'end',dx:-5}],[8,2,'4',{a:'start',dx:5}],[6.5,4,'3',{dy:-6}]]), unit:'m²', ans:42, why:'Grand rectangle 8 × 6 = 48 m², moins le coin manquant 3 × 2 = 6 m² (6 − 4 = 2) : 48 − 6 = 42 m².'},
   {q:'Une façade est formée d’un carré de 4 m de côté surmonté d’un triangle de même base et de 3 m de haut. Quelle est son aire&nbsp;?', fig:fig([-1,5],[-1,7.6],[[0,0],[4,0],[4,4],[2,7],[0,4]],[[2,0,'4',{dy:15}],[4,2,'4',{a:'start',dx:5}],[2,5.5,'3',{a:'start',dx:5,c:'var(--other)'}]],P=>P.seg(2,4,2,7,{c:'var(--other)',w:2,dash:1}).seg(0,4,4,4,{c:'var(--accent)',w:1.5,dash:1})), unit:'m²', ans:22, why:'Carré : 4 × 4 = 16 m². Triangle : 4 × 3 ÷ 2 = 6 m². Total : 16 + 6 = 22 m².'},
   {q:'Un cadre photo est un rectangle de 10 cm sur 8 cm, percé d’une fenêtre rectangulaire de 6 cm sur 4 cm. Quelle est l’aire du cadre (sans la fenêtre)&nbsp;?', unit:'cm²', ans:56, why:'10 × 8 − 6 × 4 = 80 − 24 = 56 cm². On soustrait l’aire du trou.'},
   {q:'Dans un rectangle de 12 cm sur 5 cm, on coupe les deux coins du haut : deux triangles rectangles dont les côtés de l’angle droit mesurent 3 cm et 2 cm. Quelle aire reste-t-il&nbsp;?', fig:fig([-.6,12.6],[-1,5.8],[[0,0],[12,0],[12,3],[9,5],[3,5],[0,3]],[[6,0,'12',{dy:15}],[0,1.5,'3',{a:'end',dx:-5}],[1.5,5,'3',{dy:-6,c:'var(--muted)'}]],P=>{ P.poly([[0,3],[0,5],[3,5]],{c:'var(--muted)',w:1.5,dash:1}).poly([[12,3],[12,5],[9,5]],{c:'var(--muted)',w:1.5,dash:1}); P.text(0,4,'2',{a:'end',dx:-5,s:12,c:'var(--muted)'}); }), unit:'cm²', ans:54, why:'Rectangle : 12 × 5 = 60 cm². Chaque coin : 3 × 2 ÷ 2 = 3 cm². Reste : 60 − 2 × 3 = 54 cm².'},
 ]},
 {n:'Unités d’aire, ares et hectares', r:'Convertir une aire', qs:[
   {q:'Convertis 3 m² en dm².', unit:'dm²', ans:300, why:'1 m² = 100 dm² (un carré de 10 dm sur 10 dm), donc 3 m² = 300 dm².'},
   {q:'Convertis 45 000 cm² en m².', unit:'m²', ans:4.5, tol:.001, why:'1 m² = 10 000 cm², donc 45 000 ÷ 10 000 = 4,5 m².'},
   {q:'Un champ mesure 2,5 ha. Combien de m² cela fait-il&nbsp;?', unit:'m²', ans:25000, why:'1 ha = 10 000 m², donc 2,5 × 10 000 = 25 000 m².'},
   {q:'Un jardin mesure 750 m². Combien d’ares cela fait-il&nbsp;?', unit:'a', ans:7.5, tol:.001, why:'1 a = 100 m², donc 750 ÷ 100 = 7,5 a.'},
   {q:'1 m² est égal à…', opts:['10 dm²','1000 dm²','100 dm²','100 cm²'], ans:2, why:'Un carré de 1 m de côté contient 10 × 10 = 100 carrés de 1 dm de côté : 1 m² = 100 dm².'},
 ]},
];
})();
