/* Déclic — examen de compétence : Angles et cercle */
(()=>{
const D=Math.PI/180;
const G=(x,y)=>plane({x,y,w:320,grid:false,axes:false});
const pt=(c,r,a)=>[c[0]+r*Math.cos(a*D),c[1]+r*Math.sin(a*D)];
function arc(P,c,r,a1,a2,q={}){ let b=a2; while(b<a1) b+=360;
  P.curve(t=>c[0]+r*Math.cos(t*D),t=>c[1]+r*Math.sin(t*D),a1,b,Object.assign({w:2.5,c:'var(--spark)',n:40},q));
  if(q.l){ const m=(a1+b)/2, rr=r+(q.lr||.35); P.text(c[0]+rr*Math.cos(m*D),c[1]+rr*Math.sin(m*D),q.l,{a:'middle',dy:4,s:12,c:q.c||'var(--spark)'}); } return P; }
// deux droites parallèles coupées par une sécante d'angle s ; angles numérotés de 1 à 8 ; marks = {numéro: étiquette}
function huit(s,marks){ const P=G([-5,5],[-3,3]), t=Math.tan(s*D), I1=[1.4/t,1.4], I2=[-1.4/t,-1.4];
  [1.4,-1.4].forEach(y=>P.seg(-5,y,5,y,{c:'var(--math)',w:2.5})); P.seg(I2[0]-5*Math.cos(s*D),I2[1]-5*Math.sin(s*D),I1[0]+5*Math.cos(s*D),I1[1]+5*Math.sin(s*D),{c:'var(--ink)',w:2});
  P.text(-4.7,1.4,'d',{dy:-7,c:'var(--math)'}).text(-4.7,-1.4,'d′',{dy:-7,c:'var(--math)'});
  const sec=[[0,s],[s,180],[180,180+s],[180+s,360]];
  [I1,I2].forEach((I,j)=>sec.forEach(([a,b],i)=>{ const n=4*j+i+1, m=marks[n]; if(m) arc(P,I,.55,a,b,{c:'var(--accent)',w:3}); const mm=(a+b)/2;
    P.text(I[0]+(m?1.1:.75)*Math.cos(mm*D),I[1]+(m?1.1:.75)*Math.sin(mm*D),m||String(n),{a:'middle',dy:4,s:m?12:11,c:m?'var(--accent)':'var(--muted)'}); }));
  return P.svg(); }
function cercle(c,lo,lm){ const P=G([-3.4,3.4],[-3.2,3.2]), O=[0,0], R=2.6, A=pt(O,R,270-c/2), B=pt(O,R,270+c/2), M=pt(O,R,110);
  P.circ(0,0,R,{c:'var(--muted)',w:2}); [[O,'var(--accent)'],[M,'var(--spark)']].forEach(([X,col])=>{ P.seg(X[0],X[1],A[0],A[1],{c:col,w:2.5}).seg(X[0],X[1],B[0],B[1],{c:col,w:2.5}); });
  const a=Math.atan2(A[1],A[0])/D, b=Math.atan2(B[1],B[0])/D; arc(P,O,.5,a,b,{c:'var(--accent)',l:lo});
  const ma=Math.atan2(A[1]-M[1],A[0]-M[0])/D, mb=Math.atan2(B[1]-M[1],B[0]-M[0])/D; arc(P,M,.6,Math.min(ma,mb),Math.max(ma,mb),{c:'var(--spark)',l:lm,lr:.45});
  [[O,'O',8,-4],[A,'A',-16,12],[B,'B',6,12],[M,'M',-16,-4]].forEach(([X,s,dx,dy])=>{ P.dot(X[0],X[1],{r:4,c:'var(--ink)'}); P.text(X[0],X[1],s,{dx,dy}); });
  return P.svg(); }

EXAMS['sec11-angles']=[
 {n:'Angles opposés et supplémentaires', r:'Les angles opposés par le sommet', qs:[
   {q:'Deux droites se coupent. L’un des quatre angles mesure 47°. Combien mesure l’angle qui lui est opposé par le sommet&nbsp;?', unit:'°', ans:47, why:'Deux angles opposés par le sommet sont égaux : 47°.'},
   {q:'Deux droites se coupent. L’un des angles mesure 112°. Combien mesure un angle voisin, posé à côté de lui sur la même droite&nbsp;?', unit:'°', ans:68, why:'Deux angles voisins sur une droite sont supplémentaires : 180° − 112° = 68°.'},
   {q:'Deux droites se coupent. Un angle mesure le double de son voisin. Combien mesure le plus petit des deux&nbsp;?', unit:'°', ans:60, why:'Si le petit vaut <i>x</i>, alors <i>x</i> + 2<i>x</i> = 180°, donc 3<i>x</i> = 180° et <i>x</i> = 60°.'},
   {q:'Deux angles ont le même sommet et mesurent 40° chacun. Sont-ils forcément opposés par le sommet&nbsp;?', opts:['Oui, deux angles égaux de même sommet sont toujours opposés','Non : il faut aussi que les côtés de l’un prolongent les côtés de l’autre','Oui, si leur somme vaut 80°','Non, deux angles opposés ne sont jamais égaux'], ans:1, why:'Opposés par le sommet est une question de position : les côtés doivent être dans le prolongement l’un de l’autre. Deux angles égaux côte à côte ne le sont pas.'},
 ]},
 {n:'Vocabulaire de la sécante', r:'Deux droites coupées par une sécante', qs:[
   {q:'Sur la figure, quel angle est correspondant à l’angle 1&nbsp;?', fig:huit(65,{}), opts:['3','5','7','6'], ans:1, why:'L’angle 1 est en haut à droite du carrefour du haut. Son correspondant est à la même place au carrefour du bas : l’angle 5.'},
   {q:'Sur la figure, quel angle est alterne-interne avec l’angle 4&nbsp;?', fig:huit(65,{}), opts:['2','8','6','5'], ans:2, why:'L’angle 4 est entre <i>d</i> et <i>d</i>′, à droite de la sécante. Son alterne-interne est aussi entre les droites, mais à gauche de la sécante, au carrefour du bas : l’angle 6.'},
   {q:'Sur la figure, les angles 2 et 8 sont…', fig:huit(65,{}), opts:['correspondants','alternes-internes','alternes-externes','opposés par le sommet'], ans:2, why:'Les angles 2 et 8 sont tous les deux hors de la bande entre <i>d</i> et <i>d</i>′, et de part et d’autre de la sécante : ils sont alternes-externes.'},
   {q:'Sur la figure, les angles 1 et 3 sont…', fig:huit(65,{}), opts:['correspondants','alternes-internes','alternes-externes','opposés par le sommet'], ans:3, why:'Ils ont le même sommet et leurs côtés se prolongent : ils sont opposés par le sommet.'},
 ]},
 {n:'Calculer des angles avec des parallèles', r:'Calculer des angles avec des parallèles', qs:[
   {q:'Les droites <i>d</i> et <i>d</i>′ sont parallèles. L’angle 1 mesure 74°. Combien mesure l’angle 5&nbsp;?', fig:huit(74,{1:'74°',5:'?'}), unit:'°', ans:74, why:'Les angles 1 et 5 sont correspondants et <i>d</i> ∥ <i>d</i>′ : ils sont égaux, 74°.'},
   {q:'Les droites <i>d</i> et <i>d</i>′ sont parallèles. L’angle 1 mesure 74°. Combien mesure l’angle 6&nbsp;?', fig:huit(74,{1:'74°',6:'?'}), unit:'°', ans:106, why:'L’angle 5 vaut 74° (correspondant de 1). L’angle 6 est son voisin sur <i>d</i>′ : 180° − 74° = 106°.'},
   {q:'Les droites <i>d</i> et <i>d</i>′ sont parallèles. L’angle 4 mesure 131°. Combien mesure l’angle 7&nbsp;?', fig:huit(49,{4:'131°',7:'?'}), unit:'°', ans:49, why:'L’angle 1 est voisin de l’angle 4 : 180° − 131° = 49°. L’angle 5 est son correspondant (49°), et l’angle 7 est opposé par le sommet à l’angle 5 : 49°.'},
   {q:'Une sécante coupe deux droites <i>d</i> et <i>d</i>′. Deux angles correspondants mesurent tous deux 65°. Que peut-on conclure&nbsp;?', opts:['<i>d</i> et <i>d</i>′ sont parallèles','<i>d</i> et <i>d</i>′ sont perpendiculaires','On ne peut rien conclure','La sécante est perpendiculaire à <i>d</i>'], ans:0, why:'C’est la réciproque du théorème de la transversale : deux angles correspondants égaux prouvent que <i>d</i> ∥ <i>d</i>′.'},
   {q:'Une sécante coupe deux droites <i>d</i> et <i>d</i>′. Deux angles alternes-internes mesurent 58° et 60°. Que peut-on conclure&nbsp;?', opts:['<i>d</i> et <i>d</i>′ sont parallèles, car les angles sont presque égaux','<i>d</i> et <i>d</i>′ ne sont pas parallèles','<i>d</i> et <i>d</i>′ sont perpendiculaires','On ne peut rien conclure sans une autre mesure'], ans:1, why:'Si les droites étaient parallèles, les angles alternes-internes seraient égaux. Comme 58° ≠ 60°, elles ne sont pas parallèles.'},
   {q:'Les droites <i>d</i> et <i>d</i>′ sont parallèles. Deux sécantes partent d’un point S de <i>d</i> et coupent <i>d</i>′ en A et B. En S, la sécante (SB) fait un angle de 75° avec <i>d</i>, du côté de B. Combien mesure l’angle SBA du triangle SAB&nbsp;?', fig:(()=>{ const P=G([-4,4],[-2,2.2]), S=[0,1.4], A=pt(S,2.8/Math.sin(40*D),220), B=pt(S,2.8/Math.sin(75*D),-75);
     P.seg(-4,1.4,4,1.4,{c:'var(--math)',w:2.5}).seg(-4,-1.4,4,-1.4,{c:'var(--math)',w:2.5}).poly([S,A,B],{c:'var(--ink)',w:2}); arc(P,S,.5,-75,0,{c:'var(--accent)',l:'75°',lr:.4}); arc(P,B,.5,105,180,{c:'var(--spark)',l:'?'});
     [[S,'S',-4,-8],[A,'A',-14,14],[B,'B',4,14]].forEach(([X,s,dx,dy])=>{ P.dot(X[0],X[1],{r:4,c:'var(--ink)'}); P.text(X[0],X[1],s,{dx,dy}); }); P.text(3.6,1.4,'d',{dy:-7,c:'var(--math)'}).text(3.6,-1.4,'d′',{dy:-7,c:'var(--math)'}); return P.svg(); })(), unit:'°', ans:75, why:'La droite (SB) est une sécante des parallèles <i>d</i> et <i>d</i>′. L’angle de 75° en S et l’angle SBA sont alternes-internes : ils sont égaux, 75°.'},
 ]},
 {n:'Angle inscrit et angle au centre', r:'Utiliser l’angle inscrit', qs:[
   {q:'Sur un cercle de centre O, l’angle au centre AOB mesure 136°. Combien mesure un angle inscrit AMB qui intercepte le même arc&nbsp;?', fig:cercle(136,'136°','?'), unit:'°', ans:68, why:'L’angle inscrit vaut la moitié de l’angle au centre : 136° : 2 = 68°.'},
   {q:'Sur un cercle de centre O, l’angle inscrit AMB mesure 41°. Combien mesure l’angle au centre AOB qui intercepte le même arc&nbsp;?', unit:'°', ans:82, why:'L’angle au centre vaut le double : 2 × 41° = 82°.'},
   {q:'Les angles inscrits AMB et ANB interceptent le même arc AB. AMB = 53°. Combien mesure ANB&nbsp;?', unit:'°', ans:53, why:'Deux angles inscrits qui interceptent le même arc sont égaux : 53°.'},
   {q:'Sur un cercle de centre O, l’angle au centre AOB mesure 80°. Combien mesure l’angle OAB du triangle AOB&nbsp;?', unit:'°', ans:50, why:'OA = OB (deux rayons) : le triangle est isocèle, ses angles en A et B sont égaux. (180° − 80°) : 2 = 50°.'},
   {q:'A, B et C sont sur un cercle de centre O, et l’angle inscrit ACB mesure 35°. Combien mesure l’angle OAB&nbsp;?', unit:'°', ans:55, why:'L’angle au centre AOB vaut 2 × 35° = 70°. Le triangle AOB est isocèle en O : OAB = (180° − 70°) : 2 = 55°.'},
   {q:'Dix points partagent un cercle en 10 arcs égaux. Combien mesure un angle inscrit qui intercepte un seul de ces arcs&nbsp;?', unit:'°', ans:18, why:'L’angle au centre d’un arc vaut 360° : 10 = 36°. L’angle inscrit vaut la moitié : 18°.'},
 ]},
 {n:'Cercle de Thalès et tangente', r:'Repérer un angle droit caché', qs:[
   {q:'[AB] est un diamètre d’un cercle, AB = 13 cm. Le point M est sur le cercle et AM = 5 cm. Combien mesure MB&nbsp;?', unit:'cm', ans:12, why:'Cercle de Thalès : l’angle AMB est droit, d’hypoténuse [AB]. MB² = 169 − 25 = 144, donc MB = 12 cm.'},
   {q:'Un triangle rectangle a une hypoténuse de 9 cm. Quel est le rayon du cercle qui passe par ses trois sommets&nbsp;?', unit:'cm', ans:4.5, tol:0.001, why:'Le centre de ce cercle est le milieu de l’hypoténuse, qui est un diamètre : rayon = 9 : 2 = 4,5 cm.'},
   {q:'Le triangle ABC est rectangle en C. Où se trouve le centre du cercle qui passe par A, B et C&nbsp;?', opts:['Au point C','Au milieu de [AC]','Au milieu de [AB]','Au milieu de [BC]'], ans:2, why:'Réciproque du cercle de Thalès : C est sur le cercle de diamètre [AB], l’hypoténuse. Le centre est le milieu de [AB].'},
   {q:'Un cercle de centre O a un rayon de 6 cm. Le point P est à 10 cm de O, et (PT) est tangente au cercle en T. Combien mesure PT&nbsp;?', unit:'cm', ans:8, why:'La tangente est perpendiculaire au rayon : OTP est rectangle en T. PT² = 100 − 36 = 64, donc PT = 8 cm.'},
   {q:'La droite (PT) est tangente en T à un cercle de centre O. L’angle TPO mesure 30°. Combien mesure l’angle TOP&nbsp;?', unit:'°', ans:60, why:'L’angle OTP est droit (tangente perpendiculaire au rayon). Dans le triangle OTP : 180° − 90° − 30° = 60°.'},
   {q:'La droite (PT) est tangente en T à un cercle de centre O et de rayon 8 cm. PT = 15 cm. À quelle distance de O se trouve le point P&nbsp;?', unit:'cm', ans:17, why:'OTP est rectangle en T, d’hypoténuse [OP] : OP² = 8² + 15² = 64 + 225 = 289, donc OP = 17 cm.'},
 ]},
 {n:'Polygones réguliers', r:'Les polygones réguliers', qs:[
   {q:'Combien mesure l’angle au centre d’un octogone régulier (8 côtés)&nbsp;?', unit:'°', ans:45, why:'360° : 8 = 45°.'},
   {q:'Combien mesure un angle intérieur d’un hexagone régulier&nbsp;?', unit:'°', ans:120, why:'Angle au centre : 360° : 6 = 60°. Angle intérieur : 180° − 60° = 120°.'},
   {q:'Combien mesure un angle intérieur d’un décagone régulier (10 côtés)&nbsp;?', unit:'°', ans:144, why:'Angle au centre : 360° : 10 = 36°. Angle intérieur : 180° − 36° = 144°.'},
   {q:'Un polygone régulier a des angles intérieurs de 150°. Combien a-t-il de côtés&nbsp;?', lab:'n =', ans:12, why:'L’angle au centre vaut 180° − 150° = 30°. Or il vaut 360° : <i>n</i>, donc <i>n</i> = 360 : 30 = 12.'},
 ]},
];
})();
