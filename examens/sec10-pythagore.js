/* Déclic — examen de compétence : Théorème de Pythagore */
(()=>{
const U=(P,Q)=>{ const dx=Q[0]-P[0], dy=Q[1]-P[1], L=Math.hypot(dx,dy)||1; return [dx/L,dy/L]; };
// triangle rectangle en C : o.p = [A, B, C], o.n noms des sommets, o.l étiquettes des côtés [BC, AC, AB]
function rt(o){
  const [A,B,C]=o.p, P=plane({x:o.x,y:o.y,grid:false,axes:false,w:o.w||240});
  const span=o.x[1]-o.x[0], d=o.d??span*.06, s=span*.04;
  P.poly([A,B,C],{fill:'var(--accent)',fo:.1,c:'var(--ink)',w:2});
  const u=U(C,A), v=U(C,B);
  if(o.right!==false) P.poly([[C[0]+u[0]*s,C[1]+u[1]*s],[C[0]+(u[0]+v[0])*s,C[1]+(u[1]+v[1])*s],[C[0]+v[0]*s,C[1]+v[1]*s]],{open:true,c:'var(--ink)',w:1.5});
  const G=[(A[0]+B[0]+C[0])/3,(A[1]+B[1]+C[1])/3];
  if(o.n) [A,B,C].forEach((Q,i)=>{ const e=U(G,Q); P.text(Q[0]+e[0]*d,Q[1]+e[1]*d,o.n[i],{a:'middle',dy:5}); });
  if(o.l){ const sc=(o.w||240)/span; [[B,C],[A,C],[A,B]].forEach(([X,Y],i)=>{ if(!o.l[i]) return; const M=[(X[0]+Y[0])/2,(X[1]+Y[1])/2];
    let n=U(X,Y); n=[-n[1],n[0]]; if(n[0]*(M[0]-G[0])+n[1]*(M[1]-G[1])<0) n=[-n[0],-n[1]];
    const hw=String(o.l[i]).replace(/<[^>]+>/g,'').length*3.6, off=(7+Math.abs(n[0])*hw+Math.abs(n[1])*7)/sc;
    P.text(M[0]+n[0]*off,M[1]+n[1]*off,o.l[i],{a:'middle',dy:5}); }); }
  return P.svg();
}

EXAMS['sec10-pythagore']=[
 {n:'Reconnaître l’hypoténuse', r:'Le triangle rectangle et son hypoténuse', qs:[
   {q:'Le triangle RST est rectangle en T. Quelle est son hypoténuse&nbsp;?', fig:rt({p:[[0,0],[4,4.5],[4,0]],n:['R','S','T'],x:[-1,5.2],y:[-.9,5.4],w:180,d:.45}),
    opts:['[RT]','[ST]','[RS]','[RT] ou [ST], au choix'], ans:2, why:'L’hypoténuse est le côté en face de l’angle droit, celui qui ne passe pas par T : [RS].'},
   {q:'Dans un triangle rectangle, l’hypoténuse est…', opts:['le plus court des trois côtés','un des deux côtés qui forment l’angle droit','le côté en face de l’angle droit, et le plus long','toujours le côté horizontal'], ans:2, why:'Par définition, l’hypoténuse est en face de l’angle droit, et c’est toujours le plus long côté.'},
   {q:'Un triangle rectangle a des côtés de 9 cm, 12 cm et 15 cm. Quelle est la longueur de son hypoténuse&nbsp;?', unit:'cm', ans:15, why:'L’hypoténuse est le plus long côté : 15 cm. On le vérifie : 9² + 12² = 81 + 144 = 225 = 15².'},
 ]},
 {n:'Le théorème et les carrés', r:'Des carrés sur les côtés', qs:[
   {q:'Dans un triangle rectangle, les carrés construits sur les côtés de l’angle droit ont pour aires 25 cm² et 144 cm². Quelle est l’aire du carré construit sur l’hypoténuse&nbsp;?', unit:'cm²', ans:169, why:'Le grand carré a l’aire des deux autres réunis : 25 + 144 = 169 cm².'},
   {q:'Dans un triangle rectangle, le carré sur l’hypoténuse a une aire de 81 cm² et le carré sur un côté de l’angle droit 32 cm². Quelle est l’aire du troisième carré&nbsp;?', unit:'cm²', ans:49, why:'81 = 32 + ?, donc le troisième carré a une aire de 81 − 32 = 49 cm². Son côté mesure 7 cm.'},
   {q:'Le triangle ABC est rectangle en A. Quelle égalité est vraie&nbsp;?', fig:rt({p:[[0,3],[5,0],[0,0]],n:['B','C','A'],x:[-1,6],y:[-.9,3.9],w:200,d:.45}),
    opts:['AB² = AC² + BC²','BC² = AB² + AC²','AC² = AB² + BC²','BC = AB + AC'], ans:1, why:'L’hypoténuse est [BC], en face de l’angle droit A. Son carré est la somme des deux autres : BC² = AB² + AC².'},
   {q:'Dans la preuve par découpage, on place les mêmes quatre triangles dans deux carrés identiques de côté <i>a</i> + <i>b</i>. Pourquoi peut-on conclure que <i>c</i>² = <i>a</i>² + <i>b</i>²&nbsp;?', opts:['Parce qu’on l’a vérifié avec 3, 4 et 5','Parce que les deux carrés ont la même aire et qu’on y enlève la même chose','Parce que les triangles sont isocèles','Parce que <i>a</i> + <i>b</i> = <i>c</i>'], ans:1, why:'Même aire de départ, mêmes quatre triangles enlevés : les restes (c² d’un côté, a² + b² de l’autre) ont la même aire. Un exemple ne prouve rien pour tous les triangles.'},
 ]},
 {n:'Calculer l’hypoténuse', r:'Calculer l’hypoténuse', qs:[
   {q:'Les côtés de l’angle droit d’un triangle rectangle mesurent 7 cm et 24 cm. Combien mesure l’hypoténuse&nbsp;?', fig:rt({p:[[0,0],[8,2.33],[8,0]],l:['7 cm','24 cm','?'],x:[-1,10],y:[-1.2,3.4],w:240,d:.45}), unit:'cm', ans:25, why:'c² = 7² + 24² = 49 + 576 = 625, donc c = √625 = 25 cm.'},
   {q:'Les côtés de l’angle droit mesurent 2 cm et 3 cm. Combien mesure l’hypoténuse, arrondie au centième&nbsp;?', unit:'cm', ans:3.61, tol:.006, why:'c² = 4 + 9 = 13, donc c = √13 ≈ 3,61 cm.'},
   {q:'Les côtés de l’angle droit mesurent 1,5 m et 2 m. Combien mesure l’hypoténuse&nbsp;?', unit:'m', ans:2.5, tol:1e-6, why:'c² = 1,5² + 2² = 2,25 + 4 = 6,25, donc c = √6,25 = 2,5 m.'},
   {q:'Un écran de tablette mesure 32 cm de large et 24 cm de haut. Quelle est la longueur de sa diagonale&nbsp;?', unit:'cm', ans:40, why:'d² = 32² + 24² = 1024 + 576 = 1600, donc d = √1600 = 40 cm.'},
   {q:'Le triangle ABC est rectangle en C avec AC = 5 et BC = 12. Quelle rédaction est correcte&nbsp;?', opts:['5² + 12² = 169 = 13','AB = 5² + 12² = 169','AB² = 5² + 12² = 169, donc AB = √169 = 13','AB = 5 + 12 = 17'], ans:2, why:'Chaque signe = doit relier deux choses égales. « 169 = 13 » est une fausse égalité, et AB vaut la racine de 169, pas 169.'},
 ]},
 {n:'Calculer un côté de l’angle droit', r:'Calculer un côté de l’angle droit', qs:[
   {q:'Un triangle rectangle a une hypoténuse de 26 cm et un côté de l’angle droit de 10 cm. Combien mesure l’autre côté&nbsp;?', unit:'cm', ans:24, why:'x² = 26² − 10² = 676 − 100 = 576, donc x = √576 = 24 cm.'},
   {q:'Un triangle rectangle a une hypoténuse de 9 cm et un côté de l’angle droit de 5 cm. Combien mesure l’autre côté, arrondi au centième&nbsp;?', unit:'cm', ans:7.48, tol:.006, why:'x² = 81 − 25 = 56, donc x = √56 ≈ 7,48 cm.'},
   {q:'Une échelle de 4 m est appuyée contre un mur, son pied à 1 m du mur. À quelle hauteur touche-t-elle le mur, arrondie au centième&nbsp;?', fig:rt({p:[[1,0],[0,3.87],[0,0]],l:['?','1 m','4 m'],x:[-1.6,2.2],y:[-.5,4.3],w:150,d:.25}), unit:'m', ans:3.87, tol:.006, why:'L’échelle est l’hypoténuse : h² = 4² − 1² = 15, donc h = √15 ≈ 3,87 m.'},
   {q:'Quelle est la longueur <i>x</i> sur la figure&nbsp;?', fig:rt({p:[[0,0],[15,8],[15,0]],l:['x','15 cm','17 cm'],x:[-1.6,18],y:[-1.8,9.6],w:240,d:1}), unit:'cm', ans:8, why:'17 cm est l’hypoténuse. x² = 17² − 15² = 289 − 225 = 64, donc x = 8 cm.'},
   {q:'Un triangle rectangle a une hypoténuse de 10 cm et un côté de 6 cm. Lina écrit : x² = 10² + 6² = 136, donc x ≈ 11,66 cm. Quelle est son erreur&nbsp;?', opts:['Elle a additionné au lieu de soustraire : x² = 100 − 36 = 64, x = 8 cm','Elle aurait dû écrire x = 10 + 6','Il n’y a pas d’erreur','Elle aurait dû diviser par 2'], ans:0, why:'On cherche un côté de l’angle droit : on soustrait. Un côté de 11,66 cm, plus long que l’hypoténuse, est impossible.'},
 ]},
 {n:'La réciproque', r:'Tester si un triangle est rectangle', qs:[
   {q:'Un triangle a des côtés de 9 cm, 40 cm et 41 cm. Est-il rectangle&nbsp;?', opts:['Oui, car 9² + 40² = 41²','Non, car 9 + 40 ≠ 41','Non, car 41² est trop grand','On ne peut pas savoir sans le dessiner'], ans:0, why:'41² = 1681 et 9² + 40² = 81 + 1600 = 1681 : égal, donc rectangle.'},
   {q:'Un triangle a des côtés de 6 cm, 8 cm et 11 cm. Est-il rectangle&nbsp;?', opts:['Oui','Non, car 6² + 8² = 100 et 11² = 121','Oui, car 6, 8 et 11 sont entiers','Non, car 11 n’est pas pair'], ans:1, why:'D’une part 11² = 121, d’autre part 6² + 8² = 100. Ce n’est pas égal : pas rectangle.'},
   {q:'Le triangle ABC a pour côtés AB = 12 cm, AC = 16 cm et BC = 20 cm. Que peut-on dire&nbsp;?', opts:['Il est rectangle en B','Il est rectangle en C','Il est rectangle en A','Il n’est pas rectangle'], ans:2, why:'Le plus long côté est [BC] : BC² = 400 et AB² + AC² = 144 + 256 = 400. Il est rectangle, et l’angle droit est en face de [BC], donc en A.'},
   {q:'Un triangle a des côtés de 0,9 m, 1,2 m et 1,5 m. Est-il rectangle&nbsp;?', opts:['Non, les nombres décimaux ne marchent pas','Oui, car 0,81 + 1,44 = 2,25 = 1,5²','Non, car 0,9 + 1,2 ≠ 1,5','Oui, car 1,5 est le plus long côté'], ans:1, why:'1,5² = 2,25 et 0,9² + 1,2² = 0,81 + 1,44 = 2,25 : égal, rectangle. C’est le triplet (3, 4, 5) multiplié par 0,3.'},
   {q:'Lequel de ces triplets est un triplet de Pythagore&nbsp;?', opts:['(4, 5, 6)','(5, 12, 13)','(2, 3, 4)','(6, 7, 8)'], ans:1, why:'5² + 12² = 25 + 144 = 169 = 13². Les autres ne vérifient pas l’égalité : 16 + 25 ≠ 36, 4 + 9 ≠ 16, 36 + 49 ≠ 64.'},
   {q:'Pour un triangle de côtés 5 cm, 13 cm et 12 cm, Tom compare 5² + 13² et 12². Il trouve 194 ≠ 144 et conclut : « pas rectangle ». A-t-il raison&nbsp;?', opts:['Oui, son calcul est juste','Non : il faut comparer le carré du plus long côté (13² = 169) à 5² + 12² = 169, le triangle est rectangle','Non : il fallait additionner les trois carrés','Oui, car 194 est plus grand que 144'], ans:1, why:'On met toujours le plus long côté à part : 13² = 169 et 5² + 12² = 169. Le triangle est rectangle.'},
 ]},
 {n:'Distances et diagonales', r:'Pythagore en action : distance et diagonale', qs:[
   {q:'Dans un repère, quelle est la distance entre A(1 ; 1) et B(4 ; 5)&nbsp;?', fig:(()=>{ const P=plane({x:[-1,6],y:[-1,6],w:170,lab:1}); P.seg(1,1,4,5,{c:'var(--spark)',w:3}).dot(1,1,{l:'A',dx:-16}).dot(4,5,{l:'B'}); return P.svg(); })(), lab:'AB =', ans:5, why:'Écarts : 4 − 1 = 3 et 5 − 1 = 4. AB² = 9 + 16 = 25, donc AB = 5.'},
   {q:'Dans un repère, quelle est la distance entre C(−3 ; 2) et D(5 ; −4)&nbsp;?', lab:'CD =', ans:10, why:'Écarts : 5 − (−3) = 8 et 2 − (−4) = 6. CD² = 64 + 36 = 100, donc CD = 10.'},
   {q:'Dans un repère, quelle est la distance entre E(2 ; −1) et F(4 ; 3), arrondie au centième&nbsp;?', lab:'EF ≈', ans:4.47, tol:.006, why:'Écarts : 2 et 4. EF² = 4 + 16 = 20, donc EF = √20 ≈ 4,47.'},
   {q:'Quelle est la longueur de la diagonale d’un carré de 5 cm de côté, arrondie au centième&nbsp;?', fig:(()=>{ const P=plane({x:[-1,6],y:[-1,6],w:150,grid:false,axes:false}); P.rect(0,0,5,5,{fill:'var(--accent)',fo:.12,c:'var(--ink)',w:2}).seg(0,0,5,5,{c:'var(--spark)',w:3}).text(2.5,0,'5 cm',{a:'middle',dy:16}); return P.svg(); })(), unit:'cm', ans:7.07, tol:.006, why:'La diagonale coupe le carré en deux triangles rectangles : d² = 5² + 5² = 50, donc d = √50 ≈ 7,07 cm.'},
   {q:'Un terrain de foot mesure 100 m sur 60 m. Quelle distance parcourt un joueur qui court d’un coin au coin opposé en ligne droite, arrondie au centième&nbsp;?', unit:'m', ans:116.62, tol:.006, why:'d² = 100² + 60² = 10 000 + 3600 = 13 600, donc d = √13 600 ≈ 116,62 m.'},
   {q:'Un tiroir mesure 40 cm sur 30 cm. Un crayon de 48 cm peut-il y être posé à plat&nbsp;?', opts:['Non, car 48 &gt; 40','Oui, car la diagonale mesure 50 cm','Non, car la diagonale mesure 45 cm','Oui, car 40 + 30 = 70'], ans:1, why:'La diagonale du fond vaut √(40² + 30²) = √2500 = 50 cm. Posé en diagonale, le crayon de 48 cm rentre.'},
 ]},
];
})();
