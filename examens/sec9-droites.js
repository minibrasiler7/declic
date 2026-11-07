/* Déclic — examen de compétence : Droites remarquables et constructions */
(()=>{
const D=Math.PI/180, pt=(O,r,t)=>[O[0]+r*Math.cos(t*D),O[1]+r*Math.sin(t*D)], dirA=(O,A)=>Math.atan2(A[1]-O[1],A[0]-O[0])/D, mid=(A,B)=>[(A[0]+B[0])/2,(A[1]+B[1])/2];
const sg=(P,A,B,q={})=>P.seg(A[0],A[1],B[0],B[1],q), dt=(P,A,l,q={})=>P.dot(A[0],A[1],Object.assign({l},q));
function markA(P,O,a,b,q={}){ const r=q.r||.6, c=q.c||'var(--spark)';
  if(Math.abs(b-a-90)<.01){ const u=pt([0,0],r*.7,a), w=pt([0,0],r*.7,b); P.poly([O,[O[0]+u[0],O[1]+u[1]],[O[0]+u[0]+w[0],O[1]+u[1]+w[1]],[O[0]+w[0],O[1]+w[1]]],{c,w:2,fill:c,fo:.15}); }
  else { const pts=[O]; for(let i=0;i<=36;i++) pts.push(pt(O,r,a+(b-a)*i/36)); P.poly(pts,{c:null,fill:c,fo:.2}); P.curve(t=>O[0]+r*Math.cos(t*D),t=>O[1]+r*Math.sin(t*D),a,b,{c,w:2,n:40}); }
  if(q.l){ const m=pt(O,r+.5,(a+b)/2); P.text(m[0],m[1],q.l,{a:'middle',dy:5,s:12,c}); } return P; }
function mark(P,O,A,B,q={}){ const a=dirA(O,A); let b=dirA(O,B); while(b<a) b+=360; return markA(P,O,a,b,q); }
function tick(P,A,B,n=1){ const m=mid(A,B), d=Math.hypot(B[0]-A[0],B[1]-A[1]), ux=(B[0]-A[0])/d, uy=(B[1]-A[1])/d; for(let i=0;i<n;i++){ const o=(i-(n-1)/2)*.13, cx=m[0]+ux*o, cy=m[1]+uy*o; P.seg(cx-uy*.17,cy+ux*.17,cx+uy*.17,cy-ux*.17,{c:'var(--ink)',w:1.8}); } }

EXAMS['sec9-droites']=[
 {n:'La médiatrice', r:'La médiatrice d’un segment', qs:[
   {q:'Un point P vérifie PA = PB. Que peut-on affirmer ?', opts:['P est le milieu de [AB]','P est sur la médiatrice de [AB]','P est sur la droite (AB)','(PA) est perpendiculaire à (PB)'], ans:1, why:'Les points équidistants de A et de B sont exactement ceux de la médiatrice de [AB]. Le milieu n’est que l’un d’eux.'},
   {q:'M est sur la médiatrice de [AB] et MA = 7,5 cm. Combien mesure MB ?', lab:'MB =', unit:'cm', ans:7.5, why:'Tout point de la médiatrice est à la même distance de A et de B : MB = MA = 7,5 cm.'},
   {q:'AB = 9 cm. La médiatrice de [AB] coupe [AB] en I. Combien mesure AI ?', lab:'AI =', unit:'cm', ans:4.5, why:'La médiatrice passe par le milieu de [AB] : AI = 9 : 2 = 4,5 cm.'},
   {q:'La droite en pointillés est la médiatrice de [AB]. Lequel de ces points est à la même distance de A et de B ?', fig:(()=>{ const P=plane({x:[-4,4],y:[-2.4,3],grid:false,axes:false}); P.seg(0,-2.4,0,3,{c:'var(--math)',w:2,dash:true}); sg(P,[-3,0],[3,0],{c:'var(--ink)',w:3});
     dt(P,[-3,0],'A',{c:'var(--ink)',dy:16}); dt(P,[3,0],'B',{c:'var(--ink)',dy:16}); dt(P,[1.5,1.6],'N',{c:'var(--accent)'}); dt(P,[-2,-1.4],'R',{c:'var(--accent)'}); dt(P,[0,2.2],'M',{c:'var(--accent)'}); return P.svg(); })(), opts:['N','R','M','Aucun'], ans:2, why:'Seul M est sur la médiatrice : MA = MB. N est plus près de B, R plus près de A.'},
   {q:'Pour construire au compas la médiatrice d’un segment de 10 cm, quelle ouverture convient ?', opts:['4 cm','5 cm','6 cm','3 cm'], ans:2, why:'Il faut une ouverture plus grande que la moitié du segment, donc plus de 5 cm : 6 cm convient.'},
 ]},
 {n:'La bissectrice', r:'Construire la bissectrice d’un angle', qs:[
   {q:'La bissectrice d’un angle de 128° le partage en deux angles. Combien mesure chacun ?', lab:'angle =', unit:'°', ans:64, why:'La bissectrice coupe l’angle en deux angles égaux : 128° : 2 = 64°.'},
   {q:'La bissectrice d’un angle forme avec un des côtés un angle de 37°. Combien mesure l’angle entier ?', lab:'angle =', unit:'°', ans:74, why:'Les deux moitiés sont égales : 2 × 37° = 74°.'},
   {q:'Pour la bissectrice au compas, un arc centré au sommet O coupe les côtés en M et N. Que fait-on ensuite ?', opts:['On trace [OM]','On trace deux arcs de même ouverture centrés en M et en N, qui se croisent en P','On mesure l’angle au rapporteur','On trace le cercle de centre O, puis on s’arrête'], ans:1, why:'Le point P est à la même distance de M et de N. La demi-droite [OP) est la bissectrice.'},
   {q:'Dans ce triangle, [CD) est la bissectrice de l’angle C. Combien mesure ∠ACD ?', fig:(()=>{ const P=plane({x:[-3.6,3.6],y:[-.7,5],grid:false,axes:false}), A=[-3,0], B=[3,0], t=Math.tan(80*D), u=Math.tan(40*D), xc=(-3*t+3*u)/(t+u), C=[xc,(xc+3)*t];
     P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.1}); mark(P,A,B,C,{r:.6,l:'80°'}); mark(P,B,C,A,{r:.7,c:'var(--math)',l:'40°'});
     const dir=(dirA(C,A)+dirA(C,B))/2, dd=pt(C,-C[1]/Math.sin(dir*D),dir); sg(P,C,dd,{c:'var(--accent)',w:2,dash:true}); dt(P,dd,'D',{c:'var(--accent)',dy:16});
     dt(P,A,'A',{c:'var(--ink)',dx:-14,dy:14}); dt(P,B,'B',{c:'var(--ink)',dy:14}); dt(P,C,'C',{c:'var(--ink)'}); return P.svg(); })(), lab:'∠ACD =', unit:'°', ans:30, why:'D’abord ∠ACB = 180° − 80° − 40° = 60°. La bissectrice le coupe en deux : 60° : 2 = 30°.'},
 ]},
 {n:'Hauteurs et médianes', r:'Hauteurs et médianes', qs:[
   {q:'Dans cette figure, quel segment est la médiane issue de C ?', fig:(()=>{ const P=plane({x:[-3.6,3.6],y:[-.8,3],grid:false,axes:false}), A=[-3,0], B=[3,0], C=[1.6,2.5], H=[1.6,0], I=[0,0];
     P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.1}); sg(P,C,H,{c:'var(--accent)',w:2}); sg(P,C,I,{c:'var(--accent)',w:2}); markA(P,H,0,90,{r:.3}); tick(P,A,I); tick(P,I,B);
     dt(P,A,'A',{c:'var(--ink)',dx:-14,dy:14}); dt(P,B,'B',{c:'var(--ink)',dy:14}); dt(P,C,'C',{c:'var(--ink)'}); dt(P,H,'H',{c:'var(--accent)',dy:16}); dt(P,I,'I',{c:'var(--accent)',dy:16}); return P.svg(); })(), opts:['[CH]','[CI]','[CA]','[CB]'], ans:1, why:'I est le milieu de [AB] (codage) : [CI] est la médiane. [CH], avec l’angle droit, est la hauteur.'},
   {q:'La hauteur issue de A dans le triangle ABC est…', opts:['la droite qui passe par A et par le milieu de [BC]','la droite qui passe par A et qui est perpendiculaire à (BC)','la demi-droite qui coupe l’angle A en deux','la perpendiculaire à [BC] en son milieu'], ans:1, why:'Une hauteur passe par un sommet et est perpendiculaire au côté opposé. Les autres réponses décrivent la médiane, la bissectrice et la médiatrice.'},
   {q:'Dans un triangle ABC rectangle en A, quelle est la hauteur issue de B ?', opts:['la droite (BA)','la médiane issue de B','la droite (BC)','la médiatrice de [AC]'], ans:0, why:'La hauteur issue de B est perpendiculaire à (AC) et passe par B. Comme (AB) ⊥ (AC), c’est la droite (BA) elle-même.'},
   {q:'Dans un triangle ABC dont l’angle B est obtus, où tombe le pied de la hauteur issue de A ?', opts:['sur le côté [BC], entre B et C','sur le prolongement de [BC], au-delà de B','au milieu de [BC]','exactement en B'], ans:1, why:'Avec un angle obtus en B, la perpendiculaire à (BC) passant par A tombe à l’extérieur du triangle : il faut prolonger [BC] du côté de B.'},
 ]},
 {n:'Cercles circonscrit et inscrit', r:'Trois droites, un seul point', qs:[
   {q:'Le centre du cercle circonscrit à un triangle est le point de rencontre…', opts:['des hauteurs','des médianes','des médiatrices','des bissectrices'], ans:2, why:'Le centre est équidistant des trois sommets : il est sur les trois médiatrices.'},
   {q:'Un arroseur doit être à la même distance des trois bords d’une pelouse triangulaire. On le place au point de rencontre…', opts:['des médiatrices','des bissectrices','des hauteurs','des médianes'], ans:1, why:'Les points d’une bissectrice sont à la même distance des deux côtés de l’angle. Le point équidistant des trois côtés est le centre du cercle inscrit.'},
   {q:'Un triangle est rectangle et son hypoténuse mesure 13 cm. Quel est le rayon de son cercle circonscrit ?', lab:'rayon =', unit:'cm', ans:6.5, why:'Le centre du cercle circonscrit est le milieu de l’hypoténuse : le rayon vaut 13 : 2 = 6,5 cm.'},
   {q:'Le cercle inscrit d’un triangle a pour centre I. Quel est son rayon ?', opts:['IA, la distance de I à un sommet','la distance de I à un côté, mesurée perpendiculairement','la moitié du plus long côté','la longueur d’une bissectrice'], ans:1, why:'Le cercle inscrit touche les côtés : son rayon est la distance de I à un côté, prise sur la perpendiculaire. Avec IA, il sortirait du triangle.'},
   {q:'Où se trouve le centre du cercle circonscrit d’un triangle qui a un angle obtus ?', opts:['à l’intérieur du triangle','au milieu d’un côté','à l’extérieur du triangle','sur un sommet'], ans:2, why:'Avec un angle obtus, les médiatrices se coupent hors du triangle. (Au milieu d’un côté, c’est le cas du triangle rectangle.)'},
 ]},
 {n:'Le segment moyen', r:'Le segment moyen', qs:[
   {q:'M et N sont les milieux de [AB] et [AC], et BC = 11 cm. Combien mesure MN ?', fig:(()=>{ const P=plane({x:[-3.6,3.6],y:[-.8,3.2],grid:false,axes:false}), B=[-3,0], C=[3,0], A=[-.8,2.8], M=mid(A,B), N=mid(A,C);
     P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.1}); sg(P,M,N,{c:'var(--accent)',w:3}); tick(P,A,M); tick(P,M,B); tick(P,A,N,2); tick(P,N,C,2);
     dt(P,A,'A',{c:'var(--ink)'}); dt(P,B,'B',{c:'var(--ink)',dx:-14,dy:14}); dt(P,C,'C',{c:'var(--ink)',dy:14}); dt(P,M,'M',{c:'var(--accent)',dx:-18}); dt(P,N,'N',{c:'var(--accent)'}); P.text(0,0,'11 cm',{a:'middle',dy:16,s:11,c:'var(--muted)'}); return P.svg(); })(), lab:'MN =', unit:'cm', ans:5.5, why:'[MN] est un segment moyen : MN = BC : 2 = 11 : 2 = 5,5 cm.'},
   {q:'M est le milieu de [AB], N celui de [AC], et MN = 3,8 cm. Combien mesure BC ?', lab:'BC =', unit:'cm', ans:7.6, why:'MN est la moitié de BC, donc BC = 2 × 3,8 = 7,6 cm.'},
   {q:'M est le milieu de [AB] et N celui de [AC]. Que peut-on dire des droites (MN) et (BC) ?', opts:['Elles sont perpendiculaires','Elles sont parallèles','Elles se coupent en A','On ne peut rien dire'], ans:1, why:'Le segment qui joint les milieux de deux côtés est parallèle au troisième côté.'},
   {q:'Un triangle a des côtés de 12 cm, 9 cm et 7 cm. Quel est le périmètre du triangle formé par les milieux de ses côtés ?', lab:'périmètre =', unit:'cm', ans:14, why:'Chaque côté du petit triangle est un segment moyen, moitié d’un côté du grand : 6 + 4,5 + 3,5 = 14 cm, la moitié de 28 cm.'},
 ]},
 {n:'Dessin à l’échelle', r:'Dessiner à l’échelle', qs:[
   {q:'Sur un plan à l’échelle 1:100, un mur mesure 4,5 cm. Quelle est sa longueur réelle ?', lab:'longueur =', unit:'m', ans:4.5, why:'4,5 × 100 = 450 cm = 4,5 m. À l’échelle 1:100, 1 cm représente 1 m.'},
   {q:'Une table de 1,6 m est dessinée à l’échelle 1:50. Quelle est sa longueur sur le plan ?', lab:'longueur =', unit:'cm', ans:3.2, why:'1,6 m = 160 cm, et 160 : 50 = 3,2 cm.'},
   {q:'Sur une carte à l’échelle 1:25 000, deux refuges sont à 4 cm l’un de l’autre. Quelle est la distance réelle ?', lab:'distance =', unit:'km', ans:1, why:'4 × 25 000 = 100 000 cm = 1000 m = 1 km.'},
   {q:'Un insecte de 8 mm est dessiné à l’échelle 5:1. Combien mesure-t-il sur le dessin ?', lab:'longueur =', unit:'mm', ans:40, why:'L’échelle 5:1 agrandit 5 fois : 8 × 5 = 40 mm.'},
   {q:'Sur un dessin à l’échelle 1:2, un angle mesure 50°. Combien mesure cet angle en vrai ?', opts:['25°','50°','100°','On ne peut pas savoir'], ans:1, why:'Un dessin à l’échelle change les longueurs, pas les angles : 50°.'},
 ]},
 {n:'Construire d’après une description', r:'Construire un triangle d’après une description', qs:[
   {q:'Pour construire ABC avec AB = 7 cm, AC = 5 cm et BC = 4 cm, tu as tracé [AB]. Que fais-tu ensuite ?', opts:['Un arc de centre A et de rayon 4 cm, puis un arc de centre B et de rayon 5 cm','Un arc de centre A et de rayon 5 cm, puis un arc de centre B et de rayon 4 cm','Un cercle de centre A et de rayon 7 cm','Je place le milieu de [AB]'], ans:1, why:'C est à 5 cm de A (arc de centre A, rayon 5 cm) et à 4 cm de B (arc de centre B, rayon 4 cm) : C est au croisement.'},
   {q:'Lequel de ces triangles est impossible à construire ?', opts:['3 cm, 4 cm, 5 cm','2 cm, 3 cm, 6 cm','5 cm, 5 cm, 8 cm','4 cm, 4 cm, 4 cm'], ans:1, why:'2 + 3 = 5 cm, c’est moins que 6 cm : les deux arcs ne se rencontrent pas.'},
   {q:'Avant de construire une figure décrite par un texte, pourquoi fait-on un croquis à main levée ?', opts:['Parce que le croquis remplace la construction','Pour mesurer les angles plus précisément','Pour voir quel côté tracer d’abord et où chercher les sommets','Ce n’est jamais utile'], ans:2, why:'Le croquis, avec les mesures notées, sert à réfléchir et à organiser la construction. Il ne la remplace pas.'},
 ]},
];
})();
