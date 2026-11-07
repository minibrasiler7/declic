/* Déclic — examen de compétence : Thalès, figures semblables et mesures */
(()=>{
const G=(x,y)=>plane({x,y,w:320,grid:false,axes:false});
const pnt=(P,X,s,dx,dy)=>{ P.dot(X[0],X[1],{r:4,c:'var(--ink)'}); P.text(X[0],X[1],s,{dx,dy}); };
const mid=(A,B)=>[(A[0]+B[0])/2,(A[1]+B[1])/2];
const tl=(P,A,B,s,dx,dy)=>{ const m=mid(A,B); P.text(m[0],m[1],s,{a:'middle',dx,dy,s:12,c:'var(--muted)'}); };
// configuration triangle : t = AM/AB ; labs = [[point1, point2, texte, dx, dy], …]
function tri(t,labs){ const P=G([-3.6,4.6],[-2.2,4.2]), A=[0,3.6], B=[-3,-1.4], C=[4,-1.4], M=[A[0]+t*(B[0]-A[0]),A[1]+t*(B[1]-A[1])], N=[A[0]+t*(C[0]-A[0]),A[1]+t*(C[1]-A[1])], Q={A,B,C,M,N};
  P.poly([A,B,C],{c:'var(--ink)',w:2.5}); P.seg(M[0],M[1],N[0],N[1],{c:'var(--math)',w:3}); P.seg(B[0],B[1],C[0],C[1],{c:'var(--math)',w:3});
  pnt(P,A,'A',8,-4); pnt(P,B,'B',-14,16); pnt(P,C,'C',6,16); pnt(P,M,'M',-18,0); pnt(P,N,'N',8,2);
  labs.forEach(([p,q,s,dx,dy])=>tl(P,Q[p],Q[q],s,dx,dy)); return P.svg(); }
// configuration papillon : t = AM/AB
function pap(t,labs){ const P=G([-5,5.4],[-2.6,3]), A=[0,0], B=[-4,-2], C=[3,-2], M=[4*t,2*t], N=[-3*t,2*t], Q={A,B,C,M,N};
  P.seg(B[0],B[1],M[0],M[1],{c:'var(--ink)',w:2.5}).seg(C[0],C[1],N[0],N[1],{c:'var(--ink)',w:2.5}).seg(B[0],B[1],C[0],C[1],{c:'var(--math)',w:3}).seg(M[0],M[1],N[0],N[1],{c:'var(--math)',w:3});
  pnt(P,A,'A',-4,18); pnt(P,B,'B',-14,16); pnt(P,C,'C',6,16); pnt(P,M,'M',8,-4); pnt(P,N,'N',-18,-4);
  labs.forEach(([p,q,s,dx,dy])=>tl(P,Q[p],Q[q],s,dx,dy)); return P.svg(); }

EXAMS['sec11-thales']=[
 {n:'Le rapport de similitude', r:'Le rapport de similitude', qs:[
   {q:'Un triangle a des côtés de 4, 5 et 6 cm. Un triangle semblable a des côtés de 10, 12,5 et 15 cm. Quel est le rapport de similitude&nbsp;?', lab:'k =', ans:2.5, tol:0.001, why:'10 : 4 = 12,5 : 5 = 15 : 6 = 2,5.'},
   {q:'Un triangle a des côtés de 6, 8 et 9 cm. Un triangle semblable plus petit a pour plus petit côté 4 cm. Combien mesure son plus grand côté&nbsp;?', unit:'cm', ans:6, tol:0.001, why:'Le plus petit côté passe de 6 à 4 cm : on multiplie par 4/6 = 2/3. Le plus grand côté : 9 × 2/3 = 6 cm.'},
   {q:'Quel triangle est semblable au triangle de côtés 2, 3 et 4 cm&nbsp;?', opts:['3, 4 et 5 cm','4, 5 et 6 cm','4, 6 et 8 cm','2, 6 et 8 cm'], ans:2, why:'4 : 2 = 6 : 3 = 8 : 4 = 2 : les côtés sont proportionnels. Ajouter le même nombre à chaque côté, comme pour 3, 4, 5, ne donne pas un triangle semblable.'},
   {q:'Deux triangles sont semblables, de rapport 0,8. Le premier a un périmètre de 30 cm. Quel est le périmètre du second&nbsp;?', unit:'cm', ans:24, tol:0.001, why:'Toutes les longueurs sont multipliées par 0,8, donc le périmètre aussi : 30 × 0,8 = 24 cm.'},
 ]},
 {n:'Thalès dans un triangle', r:'Appliquer le théorème de Thalès', qs:[
   {q:'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC], avec (MN) ∥ (BC). AM = 2 cm, AB = 8 cm et BC = 10 cm. Combien mesure MN&nbsp;?', fig:tri(.25,[['A','M','2',-12,0],['A','B','8',-26,10],['B','C','10',0,14]]), unit:'cm', ans:2.5, tol:0.001, why:'AM/AB = MN/BC, soit 2/8 = MN/10. Donc MN = 10 × 2 : 8 = 2,5 cm.'},
   {q:'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC], avec (MN) ∥ (BC). AN = 3 cm, AC = 7,5 cm et AB = 10 cm. Combien mesure AM&nbsp;?', unit:'cm', ans:4, tol:0.001, why:'AM/AB = AN/AC, soit AM/10 = 3/7,5. Donc AM = 10 × 3 : 7,5 = 4 cm.'},
   {q:'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC], avec (MN) ∥ (BC). MN = 6 cm, BC = 9 cm et AC = 12 cm. Combien mesure AN&nbsp;?', unit:'cm', ans:8, tol:0.001, why:'AN/AC = MN/BC, soit AN/12 = 6/9. Donc AN = 12 × 6 : 9 = 8 cm.'},
   {q:'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC], avec (MN) ∥ (BC). AM = 6 cm, MB = 4 cm et MN = 4,5 cm. Combien mesure BC&nbsp;?', fig:tri(.6,[['A','M','6',-12,0],['M','B','4',-12,0],['M','N','4,5',0,-6]]), unit:'cm', ans:7.5, tol:0.001, why:'Attention : AB = 6 + 4 = 10 cm. AM/AB = MN/BC, soit 6/10 = 4,5/BC. Donc BC = 10 × 4,5 : 6 = 7,5 cm.'},
   {q:'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC], avec (MN) ∥ (BC). AN = 5 cm, NC = 3 cm et AB = 16 cm. Combien mesure AM&nbsp;?', unit:'cm', ans:10, tol:0.001, why:'AC = 5 + 3 = 8 cm. AM/AB = AN/AC, soit AM/16 = 5/8. Donc AM = 16 × 5 : 8 = 10 cm.'},
   {q:'Dans le triangle ABC, (MN) ∥ (BC), avec M ∈ [AB] et N ∈ [AC]. Laquelle de ces égalités est <b>fausse</b>&nbsp;?', opts:['AM/AB = MN/BC','AN/AC = AM/AB','AM/MB = MN/BC','AB/AM = AC/AN'], ans:2, why:'MB n’est pas un côté du petit triangle AMN : AM/MB ne se compare pas à MN/BC. La dernière égalité est juste : ce sont les mêmes rapports, renversés.'},
 ]},
 {n:'Configuration papillon', r:'La configuration papillon', qs:[
   {q:'Les droites (BM) et (CN) se coupent en A, et (MN) ∥ (BC). AB = 10 cm, AM = 4 cm et BC = 15 cm. Combien mesure MN&nbsp;?', fig:pap(.4,[['A','B','10',-8,-10],['A','M','4',-2,12],['B','C','15',0,14]]), unit:'cm', ans:6, tol:0.001, why:'AM/AB = MN/BC, soit 4/10 = MN/15. Donc MN = 15 × 4 : 10 = 6 cm.'},
   {q:'Les droites (BM) et (CN) se coupent en A, et (MN) ∥ (BC). AC = 9 cm, AN = 6 cm et MN = 8 cm. Combien mesure BC&nbsp;?', unit:'cm', ans:12, tol:0.001, why:'AN/AC = MN/BC, soit 6/9 = 8/BC. Donc BC = 9 × 8 : 6 = 12 cm.'},
   {q:'Les droites (BM) et (CN) se coupent en A, et (MN) ∥ (BC). AM = 3 cm, AB = 7,5 cm et AN = 2 cm. Combien mesure AC&nbsp;?', unit:'cm', ans:5, tol:0.001, why:'AM/AB = AN/AC, soit 3/7,5 = 2/AC. Donc AC = 7,5 × 2 : 3 = 5 cm.'},
   {q:'En configuration papillon, pourquoi les angles BAC et MAN sont-ils égaux&nbsp;?', opts:['Ils sont correspondants','Ils sont opposés par le sommet','Ils sont alternes-internes','Ils sont supplémentaires'], ans:1, why:'Les droites (BM) et (CN) se coupent en A : les angles BAC et MAN sont opposés par le sommet, donc égaux.'},
 ]},
 {n:'Réciproque de Thalès', r:'Prouver que deux droites sont parallèles', qs:[
   {q:'M ∈ [AB] et N ∈ [AC]. AM = 3, AB = 8, AN = 4,5 et AC = 12. Les droites (MN) et (BC) sont-elles parallèles&nbsp;?', opts:['Oui, car 3/8 = 4,5/12 = 0,375','Non, car 3 ≠ 4,5','Non, car 8 ≠ 12','On ne peut pas savoir'], ans:0, why:'AM/AB = 3 : 8 = 0,375 et AN/AC = 4,5 : 12 = 0,375. Les points sont dans le même ordre : par la réciproque de Thalès, (MN) ∥ (BC).'},
   {q:'M ∈ [AB] et N ∈ [AC]. AM = 4, AB = 10, AN = 5 et AC = 12. Les droites (MN) et (BC) sont-elles parallèles&nbsp;?', opts:['Oui, car les rapports sont presque égaux','Non, car 4/10 = 0,4 et 5/12 ≈ 0,417','Oui, car 10 − 4 = 6 et 12 − 5 = 7','On ne peut pas savoir sans mesurer les angles'], ans:1, why:'Les rapports 0,4 et 0,416… sont différents. Si les droites étaient parallèles, Thalès les rendrait égaux : elles ne sont pas parallèles.'},
   {q:'M ∈ [AB] et N ∈ [AC], avec AM = 2,5 cm, AB = 10 cm et AC = 14 cm. Quelle longueur AN faut-il pour que (MN) soit parallèle à (BC)&nbsp;?', lab:'AN =', unit:'cm', ans:3.5, tol:0.001, why:'Il faut AN/AC = AM/AB = 0,25, donc AN = 0,25 × 14 = 3,5 cm.'},
   {q:'M est sur [AB] et N est sur la droite (AC), mais de l’autre côté de A par rapport à C. On a AM/AB = AN/AC. Peut-on conclure que (MN) ∥ (BC)&nbsp;?', opts:['Oui, les rapports sont égaux','Non : les points ne sont pas dans le même ordre, la réciproque ne s’applique pas','Oui, c’est la configuration papillon','Non, car les rapports ne sont jamais égaux'], ans:1, why:'La réciproque exige que A, M, B et A, N, C soient dans le même ordre. Ici M est du côté de B mais N n’est pas du côté de C : (MN) n’est pas parallèle à (BC).'},
 ]},
 {n:'Mesurer une hauteur inaccessible', r:'Mesurer une hauteur inaccessible', qs:[
   {q:'Un bâton de 1,5 m est planté verticalement. Le bout de son ombre coïncide avec celui de l’ombre d’un arbre. Ce point est à 2,5 m du bâton et à 20 m de l’arbre. Quelle est la hauteur de l’arbre&nbsp;?', unit:'m', ans:12, tol:0.001, why:'Le bâton et l’arbre sont parallèles : 1,5/<i>h</i> = 2,5/20. Donc <i>h</i> = 1,5 × 20 : 2,5 = 12 m.'},
   {q:'Couché au sol en E, Tom aligne le haut d’un bâton vertical de 2 m et le haut d’une tour. E est à 4 m du bâton, et le bâton est à 26 m de la tour. Quelle est la hauteur de la tour&nbsp;?', fig:(()=>{ const P=G([-1,31],[-1.8,16.5]); P.seg(-1,0,31,0,{c:'var(--ink)',w:2}).seg(4,0,4,2,{c:'var(--accent)',w:4}).seg(30,0,30,15,{c:'var(--ok)',w:5}).seg(0,0,30,15,{c:'var(--spark)',w:1.5,dash:true});
     pnt(P,[0,0],'E',-12,-4); P.text(2,0,'4 m',{a:'middle',dy:14,s:11}).text(17,0,'26 m',{a:'middle',dy:14,s:11}).text(4,2,'2 m',{a:'middle',dy:-8,s:11}).text(30,7.5,'?',{dx:-14,s:13}); return P.svg(); })(), unit:'m', ans:15, tol:0.001, why:'E est à 4 + 26 = 30 m de la tour. Thalès de sommet E : 2/<i>h</i> = 4/30, donc <i>h</i> = 2 × 30 : 4 = 15 m.'},
   {q:'Une personne de 1,8 m se place pour que le bout de son ombre coïncide avec celui de l’ombre d’un arbre. Son ombre mesure 1,2 m et celle de l’arbre 6 m. Quelle est la hauteur de l’arbre&nbsp;?', unit:'m', ans:9, tol:0.001, why:'1,8/<i>h</i> = 1,2/6, donc <i>h</i> = 1,8 × 6 : 1,2 = 9 m.'},
   {q:'Au même moment, un immeuble de 24 m fait une ombre de 30 m. Quelle est la longueur de l’ombre d’un bâton vertical de 2 m&nbsp;?', unit:'m', ans:2.5, tol:0.001, why:'Ombre/hauteur est le même rapport : 30 : 24 = 1,25. Ombre du bâton : 2 × 1,25 = 2,5 m.'},
 ]},
 {n:'Pythagore et trigonométrie', r:'Choisir le bon outil', qs:[
   {q:'Une échelle de 6,5 m est appuyée contre un mur vertical. Son pied est à 2,5 m du mur. À quelle hauteur touche-t-elle le mur&nbsp;?', unit:'m', ans:6, tol:0.001, why:'Triangle rectangle, deux côtés connus : Pythagore. <i>h</i>² = 6,5² − 2,5² = 42,25 − 6,25 = 36, donc <i>h</i> = 6 m.'},
   {q:'Une rampe monte de 1 m sur une longueur au sol de 5 m. Quel angle fait-elle avec le sol&nbsp;? Arrondis au dixième de degré.', unit:'°', ans:11.3, tol:0.05, why:'Côté opposé et côté adjacent connus : tan α = 1 : 5 = 0,2, donc α = tan⁻¹(0,2) ≈ 11,3°.'},
   {q:'Dans un triangle rectangle, l’hypoténuse mesure 12 cm et un angle aigu mesure 35°. Combien mesure le côté adjacent à cet angle&nbsp;? Arrondis au dixième.', unit:'cm', ans:9.8, tol:0.05, why:'cos 35° = adjacent : hypoténuse, donc adjacent = 12 × cos 35° ≈ 9,8 cm.'},
   {q:'Dans un triangle rectangle, on connaît l’hypoténuse et un angle aigu. On cherche le côté opposé à cet angle. Quel outil utiliser&nbsp;?', opts:['Le théorème de Thalès','Le théorème de Pythagore','Le sinus de l’angle','Le cosinus de l’angle'], ans:2, why:'sin = opposé : hypoténuse relie exactement l’angle, l’hypoténuse connue et le côté opposé cherché.'},
 ]},
 {n:'Arcs, secteurs et décomposition', r:'Aire par décomposition et grandeur manquante', qs:[
   {q:'Quelle est la longueur d’un arc de cercle de rayon 5 cm et d’angle au centre 72°&nbsp;? Arrondis au centième.', unit:'cm', ans:6.28, tol:0.01, why:'2π × 5 × 72/360 = 2π ≈ 6,28 cm.'},
   {q:'Quelle est l’aire d’un secteur de rayon 6 cm et d’angle 150°&nbsp;? Arrondis au centième.', unit:'cm²', ans:47.12, tol:0.01, why:'π × 6² × 150/360 = 36π × 5/12 = 15π ≈ 47,12 cm².'},
   {q:'Dans un rectangle de 10 cm sur 4 cm, on découpe un demi-disque dont le diamètre est un petit côté du rectangle. Quelle est l’aire restante&nbsp;? Arrondis au centième.', fig:(()=>{ const P=G([-.5,10.5],[-.9,4.6]), pts=[]; for(let i=0;i<=40;i++){ const a=(-90+180*i/40)*Math.PI/180; pts.push([2*Math.cos(a),2+2*Math.sin(a)]); }
     P.rect(0,0,10,4,{fill:'var(--ok)',fo:.3,c:'var(--ink)',w:2}); P.poly(pts,{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2}); P.text(5,0,'10 cm',{a:'middle',dy:14,s:11}).text(10,2,'4 cm',{dx:-34,s:11}); return P.svg(); })(), unit:'cm²', ans:33.72, tol:0.01, why:'Rectangle : 10 × 4 = 40 cm². Demi-disque de rayon 2 cm : π × 2² : 2 = 2π ≈ 6,28 cm². Aire restante : 40 − 2π ≈ 33,72 cm².'},
   {q:'Un secteur de disque de rayon 6 cm a une aire de 12π cm². Quel est son angle au centre&nbsp;?', unit:'°', ans:120, tol:0.001, why:'π × 36 × α/360 = 12π, donc α/360 = 12/36 = 1/3 et α = 120°.'},
   {q:'Un disque a une aire de 50 cm². Quel est son rayon&nbsp;? Arrondis au centième.', unit:'cm', ans:3.99, tol:0.01, why:'π<i>r</i>² = 50, donc <i>r</i>² = 50/π ≈ 15,92 et <i>r</i> = √(50/π) ≈ 3,99 cm.'},
 ]},
];
})();
