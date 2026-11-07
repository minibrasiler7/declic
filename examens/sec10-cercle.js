/* Déclic — examen de compétence : Cercle, disque et décomposition */
(()=>{
const arcPts=(cx,cy,r,a0,a1,n=60)=>Array.from({length:n+1},(_,i)=>{ const t=rad(a0+(a1-a0)*i/n); return [cx+r*Math.cos(t),cy+r*Math.sin(t)]; });
const sector=(P,cx,cy,r,a0,a1,q)=>P.poly([[cx,cy],...arcPts(cx,cy,r,a0,a1)],q);
const box=(x,y,w)=>plane({x,y,w:w||240,grid:false,axes:false});
// secteur seul, avec son rayon et son angle
const secFig=(a,lr,la)=>{ const P=box([-4.6,4.6],[-4.6,4.6],200); P.circ(0,0,4,{c:'var(--line)',w:1.5,dash:true});
  sector(P,0,0,4,0,a,{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:2}); P.text(2,0,lr,{a:'middle',dy:16}).text(1.6*Math.cos(rad(a/2)),1.6*Math.sin(rad(a/2)),la,{a:'middle',dy:5});
  return P.svg(); };

EXAMS['sec10-cercle']=[
 {n:'Vocabulaire du cercle et nombre π', r:'Le nombre π', qs:[
   {q:'Un cercle a un rayon de 7,5 cm. Quel est son diamètre&nbsp;?', unit:'cm', ans:15, tol:1e-6, why:'Le diamètre vaut deux rayons : d = 2 · 7,5 = 15 cm.'},
   {q:'Que représente le nombre π&nbsp;?', opts:['Le quotient périmètre : diamètre, le même pour tous les cercles','Exactement 3,14','Le quotient périmètre : rayon','Un nombre qui dépend de la taille du cercle'], ans:0, why:'Pour tout cercle, périmètre : diamètre donne le même nombre π ≈ 3,14159… Ce n’est pas exactement 3,14 : ses décimales ne s’arrêtent jamais.'},
   {q:'Sur la figure, O est le centre du cercle. Quel segment est un diamètre&nbsp;?',
    fig:(()=>{ const P=box([-4.4,4.4],[-4.4,4.4],200); P.circ(0,0,3.5,{c:'var(--accent)',w:2.5});
      const A=[-3.03,-1.75],B=[3.03,1.75],C=[0,3.5],D=[-2.47,2.47],E=[2.47,-2.47+0.0];
      P.seg(A[0],A[1],B[0],B[1],{c:'var(--ink)',w:2}).seg(0,0,C[0],C[1],{c:'var(--ink)',w:2}).seg(D[0],D[1],3.5,0,{c:'var(--ink)',w:2});
      P.dot(0,0,{r:4,c:'var(--ink)',l:'O',dx:6,dy:16}).dot(A[0],A[1],{r:4,l:'A',dx:-16,dy:12}).dot(B[0],B[1],{r:4,l:'B'}).dot(C[0],C[1],{r:4,l:'C',dx:6,dy:-8}).dot(D[0],D[1],{r:4,l:'D',dx:-16}).dot(3.5,0,{r:4,l:'E',dx:8,dy:14});
      return P.svg(); })(),
    opts:['[OC]','[DE]','[AB]','[OA]'], ans:2, why:'Un diamètre relie deux points du cercle en passant par le centre : c’est [AB]. [OC] et [OA] sont des rayons, [DE] ne passe pas par O.'},
   {q:'Tu entoures une roue d’une ficelle. La longueur de la ficelle vaut environ…', opts:['un peu plus de 2 fois le diamètre','exactement 3 fois le diamètre','un peu plus de 3 fois le diamètre','environ 6 fois le diamètre'], ans:2, why:'Le tour vaut π fois le diamètre, et π ≈ 3,14 : un peu plus de 3 fois.'},
 ]},
 {n:'Périmètre du cercle', r:'Calculer le périmètre d’un cercle', qs:[
   {q:'Un cercle a un diamètre de 12 cm. Quel est son périmètre, arrondi au centième&nbsp;?', unit:'cm', ans:37.7, tol:.02, why:'P = π · d = π · 12 ≈ 37,70 cm.'},
   {q:'Un bassin rond a un rayon de 2,5 m. Quelle est la longueur de sa bordure, arrondie au centième&nbsp;?', unit:'m', ans:15.71, tol:.02, why:'P = 2 · π · r = 2 · π · 2,5 = 5π ≈ 15,71 m.'},
   {q:'Une roue de trottinette a un diamètre de 20 cm. Combien de tours fait-elle sur 100 m, arrondi à l’unité&nbsp;?', lab:'tours ≈', ans:159, tol:.5, why:'Un tour : π · 20 ≈ 62,83 cm. 100 m = 10 000 cm, et 10 000 : 62,83 ≈ 159 tours.'},
   {q:'Une voiture fait un demi-tour de rond-point, sur un demi-cercle de rayon 15 m. Quelle distance parcourt-elle, arrondie au centième&nbsp;?', unit:'m', ans:47.12, tol:.02, why:'Le cercle entier mesure 2 · π · 15 = 30π. La moitié : 15π ≈ 47,12 m.'},
   {q:'Pour un cercle de rayon 4 cm, Zoé écrit : P = π · 4 ≈ 12,57 cm. Qu’en penses-tu&nbsp;?', opts:['C’est juste','C’est faux : P = π · 4² ≈ 50,27 cm','C’est faux : P = 2 · π · 4 ≈ 25,13 cm','C’est faux : P = 2 · 4 = 8 cm'], ans:2, why:'P = π · d, et le diamètre vaut 8 cm, pas 4. Donc P = 2 · π · 4 = 8π ≈ 25,13 cm. π · 4² est une aire.'},
 ]},
 {n:'Aire du disque', r:'Calculer l’aire d’un disque', qs:[
   {q:'Quelle est l’aire d’un disque de rayon 5 cm, arrondie au centième&nbsp;?', unit:'cm²', ans:78.54, tol:.02, why:'A = π · r² = π · 25 ≈ 78,54 cm².'},
   {q:'Une table ronde a un diamètre de 8 dm. Quelle est l’aire de son plateau, arrondie au centième&nbsp;?', unit:'dm²', ans:50.27, tol:.02, why:'Le rayon vaut 8 : 2 = 4 dm. A = π · 4² = 16π ≈ 50,27 dm².'},
   {q:'Pour un disque de rayon 6 cm, Léo calcule π · 12 ≈ 37,70 cm². Quelle est son erreur&nbsp;?', opts:['Il a oublié de diviser par 2','Il a calculé 2 × r au lieu de r × r','Il aurait dû utiliser le diamètre','Il n’y a pas d’erreur'], ans:1, why:'r² = 6 × 6 = 36, pas 2 × 6 = 12. La bonne aire est π · 36 ≈ 113,10 cm².'},
   {q:'Le rayon d’un disque double. Par combien son aire est-elle multipliée&nbsp;?', lab:'×', ans:4, why:'Avec un rayon 2r : π · (2r)² = π · 4r², soit 4 fois π · r². Par exemple r = 1 donne π, r = 2 donne 4π.'},
   {q:'Un tapis rond a un diamètre de 1,6 m. Quelle est son aire, arrondie au centième&nbsp;?',
    fig:(()=>{ const P=box([-2.2,2.2],[-1.9,1.9],200); P.circ(0,0,1.6,{fill:'var(--spark)',fo:.35,c:'var(--ink)',w:2}).seg(-1.6,0,1.6,0,{c:'var(--ink)',w:1.5,dash:true}).text(0,0,'1,6 m',{a:'middle',dy:-6}); return P.svg(); })(),
    unit:'m²', ans:2.01, tol:.011, why:'r = 0,8 m, r² = 0,64. A = π · 0,64 ≈ 2,01 m².'},
 ]},
 {n:'Arcs et secteurs', r:'Calculer un arc ou un secteur', qs:[
   {q:'Quelle est l’aire du secteur de la figure (rayon 6 cm, angle 90°), arrondie au centième&nbsp;?', fig:secFig(90,'6 cm','90°'), unit:'cm²', ans:28.27, tol:.02, why:'90° = 1/4 du tour. Aire du disque : π · 36 = 36π. Un quart : 9π ≈ 28,27 cm².'},
   {q:'Quelle est la longueur d’un arc de 120° sur un cercle de rayon 9 cm, arrondie au centième&nbsp;?', fig:secFig(120,'9 cm','120°'), unit:'cm', ans:18.85, tol:.02, why:'120° = 1/3 du tour. Périmètre : 2 · π · 9 = 18π. Un tiers : 6π ≈ 18,85 cm.'},
   {q:'Quelle fraction du disque représente un secteur de 45°&nbsp;?', opts:['1/4','1/6','1/8','1/45'], ans:2, why:'45 : 360 = 1/8. Il faut 8 secteurs de 45° pour faire le tour.'},
   {q:'Une part de fromage rond a un angle de 30° et un rayon de 6 cm. Quelle est l’aire du dessus de la part, arrondie au centième&nbsp;?', fig:secFig(30,'6 cm','30°'), unit:'cm²', ans:9.42, tol:.02, why:'30 : 360 = 1/12. Aire du disque : 36π. 36π : 12 = 3π ≈ 9,42 cm².'},
   {q:'Quelle est l’aire d’un demi-disque de <b>diamètre</b> 10 cm, arrondie au centième&nbsp;?', unit:'cm²', ans:39.27, tol:.02, why:'Le rayon vaut 5 cm. Disque : π · 25 = 25π. La moitié : 12,5π ≈ 39,27 cm².'},
 ]},
 {n:'Figures composées', r:'Aire d’une figure composée', qs:[
   {q:'La figure est un rectangle de 10 cm sur 6 cm, avec un demi-disque collé sur un petit côté. Quelle est son aire, arrondie au centième&nbsp;?',
    fig:(()=>{ const P=box([-2.2,14],[-1.4,7],240); P.rect(0,0,10,6,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2}); sector(P,10,3,3,-90,90,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2});
      P.seg(10,0,10,6,{c:'var(--ink)',w:1.5,dash:true}).text(5,0,'10 cm',{a:'middle',dy:16}).text(0,3,'6 cm',{a:'end',dx:-4,dy:5}); return P.svg(); })(),
    unit:'cm²', ans:74.14, tol:.02, why:'Rectangle : 10 · 6 = 60 cm². Demi-disque de diamètre 6, donc de rayon 3 : π · 9 : 2 ≈ 14,14 cm². Total ≈ 74,14 cm².'},
   {q:'Dans un carré de 10 cm de côté, on enlève un quart de disque de rayon 10 cm centré sur un coin. Quelle est l’aire de ce qui reste (en couleur), arrondie au centième&nbsp;?',
    fig:(()=>{ const P=box([-1,11],[-1.4,11],200); P.rect(0,0,10,10,{fill:'var(--spark)',fo:.45,c:'var(--ink)',w:2}); sector(P,0,0,10,0,90,{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2}); P.text(5,0,'10 cm',{a:'middle',dy:16}); return P.svg(); })(),
    unit:'cm²', ans:21.46, tol:.02, why:'Carré : 100 cm². Quart de disque : π · 100 : 4 = 25π ≈ 78,54 cm². Reste : 100 − 78,54 ≈ 21,46 cm².'},
   {q:'Une rondelle a un rayon extérieur de 5 cm et un trou de rayon 3 cm. Quelle est l’aire de la rondelle, arrondie au centième&nbsp;?',
    fig:(()=>{ const P=box([-5.6,5.6],[-5.6,5.6],180); P.circ(0,0,5,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2}).circ(0,0,3,{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2}).seg(0,0,5,0,{c:'var(--ink)',w:1.5}).seg(0,0,0,3,{c:'var(--ink)',w:1.5}).text(4,0,'5',{a:'middle',dy:-6}).text(0,1.5,'3',{dx:5,dy:5}); return P.svg(); })(),
    unit:'cm²', ans:50.27, tol:.02, why:'Grand disque : 25π. Trou : 9π. Rondelle : 25π − 9π = 16π ≈ 50,27 cm².'},
   {q:'Quel est le périmètre d’un demi-disque de diamètre 10 cm (le bord arrondi et le bord droit), arrondi au centième&nbsp;?', unit:'cm', ans:25.71, tol:.02, why:'Demi-cercle : π · 10 : 2 = 5π ≈ 15,71 cm. On ajoute le diamètre, qui fait partie du bord : 15,71 + 10 = 25,71 cm.'},
   {q:'Dans un rectangle de 8 cm sur 4 cm, on découpe deux demi-disques de diamètre 4 cm, un à chaque bout. Quelle est l’aire de ce qui reste, arrondie au centième&nbsp;?',
    fig:(()=>{ const P=box([-2.4,8.8],[-1.4,4.6],240); P.rect(0,0,8,4,{fill:'var(--ok)',fo:.3,c:'var(--ink)',w:2}); sector(P,0,2,2,-90,90,{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2}); sector(P,8,2,2,90,270,{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2}); P.text(4,0,'8 cm',{a:'middle',dy:16}); P.text(0,2,'4 cm',{a:'end',dx:-4,dy:5}); return P.svg(); })(),
    unit:'cm²', ans:19.43, tol:.02, why:'Rectangle : 32 cm². Les deux demi-disques de rayon 2 forment un disque : π · 4 ≈ 12,57 cm². Reste : 32 − 12,57 ≈ 19,43 cm².'},
 ]},
 {n:'Grandeur manquante', r:'Retrouver une grandeur manquante', qs:[
   {q:'Un triangle a une aire de 35 cm² et une base de 10 cm. Quelle est sa hauteur&nbsp;?', unit:'cm', ans:7, why:'A = b · h : 2, donc b · h = 70, et h = 70 : 10 = 7 cm.'},
   {q:'Un triangle a une aire de 18 cm² et une hauteur de 4 cm. Quelle est sa base&nbsp;?', unit:'cm', ans:9, why:'b · h = 2 · 18 = 36, donc b = 36 : 4 = 9 cm.'},
   {q:'Un cercle a un périmètre de 50 cm. Quel est son rayon, arrondi au centième&nbsp;?', unit:'cm', ans:7.96, tol:.011, why:'P = 2 · π · r, donc r = 50 : (2π) ≈ 7,96 cm.'},
   {q:'Un disque a une aire de 81π cm². Quel est son rayon&nbsp;?', unit:'cm', ans:9, why:'π · r² = 81π, donc r² = 81, et r = 9 cm car 9 × 9 = 81.'},
   {q:'Le tour d’un pilier rond mesure 31,4 m. Quel est son diamètre, arrondi à l’unité&nbsp;?', unit:'m', ans:10, tol:.5, why:'P = π · d, donc d = 31,4 : π ≈ 9,99, soit environ 10 m.'},
   {q:'Comment retrouve-t-on le rayon <i>r</i> d’un cercle dont on connaît le périmètre P&nbsp;?', opts:['r = P × 2π','r = P : π','r = P : (2π)','r = 2π : P'], ans:2, why:'P = 2 · π · r : r est multiplié par 2π, on défait en divisant P par 2π. P : π donne le diamètre.'},
 ]},
];
})();
