/* Déclic — examen de compétence : Angles et figures */
(()=>{
const D=Math.PI/180, pt=(O,r,t)=>[O[0]+r*Math.cos(t*D),O[1]+r*Math.sin(t*D)], dirA=(O,A)=>Math.atan2(A[1]-O[1],A[0]-O[0])/D, mid=(A,B)=>[(A[0]+B[0])/2,(A[1]+B[1])/2];
const sg=(P,A,B,q={})=>P.seg(A[0],A[1],B[0],B[1],q), dt=(P,A,l,q={})=>P.dot(A[0],A[1],Object.assign({l},q)), tx=(P,A,s,q={})=>P.text(A[0],A[1],s,q);
function markA(P,O,a,b,q={}){ const r=q.r||.6, c=q.c||'var(--spark)';
  if(Math.abs(b-a-90)<.01){ const u=pt([0,0],r*.7,a), w=pt([0,0],r*.7,b); P.poly([O,[O[0]+u[0],O[1]+u[1]],[O[0]+u[0]+w[0],O[1]+u[1]+w[1]],[O[0]+w[0],O[1]+w[1]]],{c,w:2,fill:c,fo:.15}); }
  else { const pts=[O]; for(let i=0;i<=36;i++) pts.push(pt(O,r,a+(b-a)*i/36)); P.poly(pts,{c:null,fill:c,fo:.2}); P.curve(t=>O[0]+r*Math.cos(t*D),t=>O[1]+r*Math.sin(t*D),a,b,{c,w:2,n:40}); }
  if(q.l){ const m=pt(O,r+.5,(a+b)/2); P.text(m[0],m[1],q.l,{a:'middle',dy:5,s:12,c}); } return P; }
function mark(P,O,A,B,q={}){ const a=dirA(O,A); let b=dirA(O,B); while(b<a) b+=360; return markA(P,O,a,b,q); }
function tick(P,A,B,n=1){ const m=mid(A,B), d=Math.hypot(B[0]-A[0],B[1]-A[1]), ux=(B[0]-A[0])/d, uy=(B[1]-A[1])/d; for(let i=0;i<n;i++){ const o=(i-(n-1)/2)*.13, cx=m[0]+ux*o, cy=m[1]+uy*o; P.seg(cx-uy*.17,cy+ux*.17,cx+uy*.17,cy-ux*.17,{c:'var(--ink)',w:1.8}); } }
function rapporteur(P,O,R){ const pts=[]; for(let i=0;i<=60;i++) pts.push(pt(O,R,3*i)); P.poly(pts,{c:'var(--muted)',w:1.5,fill:'var(--sci)',fo:.08});
  for(let t=0;t<=180;t+=5) sg(P,pt(O,R,t),pt(O,R*(t%10?.95:.9),t),{c:'var(--muted)',w:t%10?1:1.5});
  for(let t=0;t<=180;t+=10){ tx(P,pt(O,R*.82,t),String(180-t),{a:'middle',dy:4,s:9,c:'var(--math)'}); tx(P,pt(O,R*.67,t),String(t),{a:'middle',dy:4,s:9,c:'var(--spark)'}); } P.dot(O[0],O[1],{r:3,c:'var(--ink)'}); }
// angle au rapporteur : côté [OA) à droite (gauche=false) ou à gauche, côté [OB) dans la direction d
function lecture(gauche,d){ const P=plane({x:[-5.3,5.3],y:[-.7,5.6],grid:false,axes:false}), O=[0,0], A=gauche?[-5,0]:[5,0], B=pt(O,5,d);
  rapporteur(P,O,4.6); sg(P,O,A,{c:'var(--ink)',w:2.5}); sg(P,O,B,{c:'var(--ink)',w:2.5}); dt(P,A,'A',{c:'var(--ink)',dy:16,dx:gauche?9:-16}); dt(P,B,'B',{c:'var(--ink)'}); P.text(0,0,'O',{a:'middle',dy:16}); return P.svg(); }
function angleFig(a){ const P=plane({x:[-1,5],y:[-.6,3.6],grid:false,axes:false}), O=[0,0]; sg(P,O,[4.6,0],{c:'var(--ink)',w:2.5}); sg(P,O,pt(O,4.6,a),{c:'var(--ink)',w:2.5}); markA(P,O,0,a,{r:.8});
  dt(P,O,'O',{c:'var(--ink)',dx:-14,dy:14}); P.text(4.6,0,'x',{dy:16,c:'var(--muted)'}); tx(P,pt(O,4.6,a),'y',{dx:8,c:'var(--muted)'}); return P.svg(); }

EXAMS['sec9-angles']=[
 {n:'Droites, segments et demi-droites', r:'Droites, segments et demi-droites', qs:[
   {q:'Quelle notation désigne la ligne qui commence en P, passe par Q et continue sans fin ?', opts:['[PQ]','(PQ)','[PQ)','[QP)'], ans:2, why:'Le crochet du côté de P dit « ça commence ici », la parenthèse du côté de Q dit « ça continue » : c’est la demi-droite [PQ).'},
   {q:'Les points R, S et T sont alignés dans cet ordre. Lequel n’est pas sur la demi-droite [SR) ?', fig:(()=>{ const P=plane({x:[-5,5],y:[-.8,.9],grid:false,axes:false}); P.seg(-5,0,5,0,{c:'var(--muted)',w:2}); dt(P,[-3,0],'R'); dt(P,[0,0],'S'); dt(P,[3,0],'T'); return P.svg(); })(), opts:['R','S','T','Aucun : les trois y sont'], ans:2, why:'[SR) part de S et file vers R, puis au-delà de R. T est de l’autre côté de S : il n’est pas sur [SR).'},
   {q:'Que désigne l’écriture KL, sans crochet ni parenthèse ?', opts:['la droite qui passe par K et L','la longueur du segment [KL]','la demi-droite d’origine K','le milieu de [KL]'], ans:1, why:'Sans crochets, KL est un nombre : la longueur du segment [KL], par exemple KL = 4 cm.'},
 ]},
 {n:'Nommer et classer les angles', r:'Ouvrir un angle', qs:[
   {q:'Un angle de 135° est…', opts:['aigu','droit','obtus','rentrant'], ans:2, why:'135° est entre 90° et 180° : l’angle est obtus.'},
   {q:'Un angle de 210° est…', opts:['obtus','plat','rentrant','plein'], ans:2, why:'210° est plus grand que 180° et plus petit que 360° : l’angle est rentrant.'},
   {q:'À 2 h, quel angle forment les deux aiguilles d’une montre (le plus petit des deux) ?', lab:'angle =', unit:'°', ans:60, why:'Entre deux nombres du cadran, il y a 360° : 12 = 30°. De 12 à 2, il y a 2 intervalles : 2 × 30° = 60°.'},
   {q:'Sans rapporteur, estime la mesure de l’angle xOy.', fig:angleFig(25), opts:['25°','65°','115°','155°'], ans:0, why:'L’angle est nettement plus petit que la moitié d’un angle droit (45°) : seul 25° convient.'},
   {q:'Dans l’angle ∠RST, quel point est le sommet ?', opts:['R','S','T','On ne peut pas savoir'], ans:1, why:'La lettre du sommet est toujours au milieu : le sommet est S, les côtés sont [SR) et [ST).'},
 ]},
 {n:'Mesurer au rapporteur', r:'Mesurer un angle au rapporteur', qs:[
   {q:'Combien mesure l’angle AOB ?', fig:lecture(false,70), lab:'∠AOB =', unit:'°', ans:70, why:'[OA) est à droite : on lit la graduation intérieure, qui vaut 0 à droite. Elle indique 70, et l’angle est bien aigu.'},
   {q:'Lis la mesure de l’angle AOB sur ce rapporteur.', fig:lecture(true,40), lab:'∠AOB =', unit:'°', ans:140, why:'[OA) est à gauche : on lit la graduation extérieure, qui vaut 0 à gauche. Elle indique 140. L’angle est obtus, ce qui confirme 140° et pas 40°.'},
   {q:'Quelle est la mesure de ∠AOB ?', fig:lecture(true,155), lab:'∠AOB =', unit:'°', ans:25, why:'[OA) est à gauche : graduation extérieure. Elle indique 25. L’angle est aigu : 25° et pas 155°.'},
   {q:'Léa mesure un angle clairement obtus et lit 55° sur son rapporteur. Que s’est-il passé ?', opts:['Elle a bien mesuré','Elle a lu la mauvaise graduation : l’angle mesure 180° − 55° = 125°','Son angle est en fait aigu','L’angle mesure 55° + 90° = 145°'], ans:1, why:'Un angle obtus dépasse 90°. Les deux graduations donnent des lectures qui font 180° ensemble : la bonne lecture est 125°.'},
 ]},
 {n:'Parallèles et perpendiculaires', r:'Construire une perpendiculaire et une parallèle', qs:[
   {q:'On sait que <i>d</i> ⊥ <i>p</i> et <i>d′</i> ⊥ <i>p</i>. Que peut-on dire de <i>d</i> et <i>d′</i> ?', opts:['<i>d</i> ⊥ <i>d′</i>','<i>d</i> // <i>d′</i>','<i>d</i> et <i>d′</i> se coupent sur <i>p</i>','On ne peut rien dire'], ans:1, why:'Deux droites perpendiculaires à une même droite sont parallèles entre elles.'},
   {q:'On sait que <i>d</i> // <i>d′</i> et que la droite <i>s</i> est perpendiculaire à <i>d</i>. Alors…', opts:['<i>s</i> // <i>d′</i>','<i>s</i> ne coupe pas <i>d′</i>','<i>s</i> ⊥ <i>d′</i>','<i>s</i> est confondue avec <i>d′</i>'], ans:2, why:'Une droite perpendiculaire à l’une de deux parallèles est perpendiculaire à l’autre.'},
   {q:'Avec une équerre, comment tracer la parallèle à <i>d</i> passant par A ?', opts:['Tracer un cercle de centre A','Relier A à un point quelconque de <i>d</i>','Tracer la perpendiculaire à <i>d</i> passant par A, et c’est fini','Tracer la perpendiculaire <i>p</i> à <i>d</i> passant par A, puis la perpendiculaire à <i>p</i> passant par A'], ans:3, why:'La seconde droite et <i>d</i> sont toutes deux perpendiculaires à <i>p</i> : elles sont parallèles.'},
   {q:'Au compas, un arc centré en A coupe <i>d</i> en M et N ; deux arcs de même ouverture centrés en M et N se croisent en B. Pourquoi (AB) est-elle perpendiculaire à <i>d</i> ?', opts:['Parce que AM = AN et BM = BN : en pliant le long de (AB), M tombe sur N','Parce que B est sur <i>d</i>','Parce que AB = MN','Parce que A est plus haut que B'], ans:0, why:'A et B sont chacun à la même distance de M et de N. Le pli (AB) envoie M sur N, il fait donc un angle droit avec <i>d</i>.'},
 ]},
 {n:'Classer les triangles', r:'Classer les triangles', qs:[
   {q:'Un triangle a trois côtés de 7 cm. Combien a-t-il d’axes de symétrie ?', lab:'axes :', ans:3, why:'C’est un triangle équilatéral : il a 3 axes de symétrie, un par sommet.'},
   {q:'Comment s’appelle ce triangle ?', fig:(()=>{ const P=plane({x:[-.6,4],y:[-.6,3.6],grid:false,axes:false}), A=[0,0], B=[3.2,0], C=[0,3.2]; P.poly([A,B,C],{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.15}); markA(P,A,0,90,{r:.4}); tick(P,A,B); tick(P,A,C); return P.svg(); })(), opts:['isocèle seulement','rectangle seulement','rectangle isocèle','équilatéral'], ans:2, why:'Il a un angle droit (le petit carré) et deux côtés égaux (le codage) : il est rectangle et isocèle.'},
   {q:'Un triangle a des angles de 30°, 40° et 110°. C’est un triangle…', opts:['acutangle','rectangle','obtusangle','équilatéral'], ans:2, why:'Un de ses angles, 110°, est obtus : le triangle est obtusangle.'},
   {q:'Laquelle de ces affirmations est vraie ?', opts:['Un triangle équilatéral est aussi isocèle','Un triangle isocèle est toujours équilatéral','Un triangle rectangle ne peut pas être isocèle','Un triangle quelconque a un axe de symétrie'], ans:0, why:'Isocèle veut dire « au moins deux côtés égaux » : l’équilatéral en a trois, il est donc isocèle. L’équerre est un triangle rectangle isocèle.'},
 ]},
 {n:'Quadrilatères et diagonales', r:'Les quadrilatères et leurs diagonales', qs:[
   {q:'Les diagonales d’un quadrilatère se coupent en leur milieu et ont la même longueur, sans être perpendiculaires. C’est…', opts:['un losange','un rectangle','un carré','un cerf-volant'], ans:1, why:'Milieu commun : parallélogramme. Même longueur en plus : rectangle. Il faudrait des diagonales perpendiculaires pour un carré.'},
   {q:'Combien d’axes de symétrie un carré a-t-il ?', lab:'axes :', ans:4, why:'Ses 2 diagonales et les 2 droites qui passent par les milieux des côtés opposés : 4 axes.'},
   {q:'Les diagonales de ce quadrilatère se coupent en leur milieu (voir le codage), mais n’ont ni la même longueur ni d’angle droit. C’est…', fig:(()=>{ const P=plane({x:[-4,4],y:[-2.2,2.2],grid:false,axes:false}), O=[0,0], A=[-3,0], C=[3,0], Dd=pt(O,1.8,55), B=pt(O,1.8,235);
     P.poly([A,B,C,Dd],{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.12}); sg(P,A,C,{c:'var(--math)',w:1.5,dash:true}); sg(P,B,Dd,{c:'var(--spark)',w:1.5,dash:true}); tick(P,A,O); tick(P,O,C); tick(P,B,O,2); tick(P,O,Dd,2); return P.svg(); })(), opts:['un parallélogramme','un rectangle','un losange','un trapèze isocèle'], ans:0, why:'Des diagonales qui se coupent en leur milieu caractérisent le parallélogramme. Sans autre propriété, ce n’est ni un rectangle ni un losange.'},
   {q:'Combien d’axes de symétrie a un losange qui n’est pas un carré ?', lab:'axes :', ans:2, why:'Ses deux diagonales sont des axes de symétrie : 2 axes.'},
   {q:'Lequel de ces quadrilatères a toujours des diagonales perpendiculaires ?', opts:['un rectangle qui n’est pas un carré','un parallélogramme quelconque','un trapèze quelconque','un losange'], ans:3, why:'Les diagonales d’un losange se coupent en leur milieu et sont perpendiculaires.'},
 ]},
 {n:'Calculer un angle manquant', r:'Calculer un angle manquant', qs:[
   {q:'Dans un triangle, deux angles mesurent 47° et 68°. Combien mesure le troisième ?', lab:'angle =', unit:'°', ans:65, why:'180° − 47° − 68° = 65°.'},
   {q:'Dans un triangle rectangle, un angle aigu mesure 38°. Combien mesure l’autre angle aigu ?', lab:'angle =', unit:'°', ans:52, why:'Les deux angles aigus font ensemble 90° : 90° − 38° = 52°.'},
   {q:'Dans un triangle isocèle, l’angle au sommet principal mesure 44°. Combien mesure chaque angle à la base ?', lab:'angle =', unit:'°', ans:68, why:'Les angles à la base sont égaux : (180° − 44°) : 2 = 136° : 2 = 68°.'},
   {q:'Trois angles d’un quadrilatère mesurent 95°, 80° et 110°. Combien mesure le quatrième ?', lab:'angle =', unit:'°', ans:75, why:'La somme fait 360° : 360° − 95° − 80° − 110° = 75°.'},
   {q:'Le triangle ABC est isocèle en A (codage) et ∠BAC = 72°. Combien mesure ∠ABC ?', fig:(()=>{ const P=plane({x:[-2.6,2.6],y:[-.6,3.4],grid:false,axes:false}), B=[-1.8,0], C=[1.8,0], A=[0,1.8*Math.tan(54*D)];
     P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.1}); tick(P,A,B); tick(P,A,C); mark(P,A,B,C,{r:.6,c:'var(--accent)',l:'72°'}); mark(P,B,C,A,{r:.5});
     dt(P,A,'A',{c:'var(--ink)'}); dt(P,B,'B',{c:'var(--ink)',dx:-14,dy:14}); dt(P,C,'C',{c:'var(--ink)',dy:14}); return P.svg(); })(), lab:'∠ABC =', unit:'°', ans:54, why:'Isocèle en A : ∠ABC = ∠ACB = (180° − 72°) : 2 = 108° : 2 = 54°.'},
   {q:'Un quadrilatère a trois angles droits. Combien mesure son quatrième angle ?', lab:'angle =', unit:'°', ans:90, why:'360° − 3 × 90° = 360° − 270° = 90° : c’est un rectangle.'},
 ]},
];
})();
