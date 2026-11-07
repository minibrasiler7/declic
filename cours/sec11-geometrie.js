/* Déclic — Maths au secondaire, 11e année : angles et cercle, homothéties, Thalès */
(()=>{
/* ---------- helpers locaux ---------- */
const sdx='<div class="blk" data-t="Le savais-tu ?">';
const D=Math.PI/180;
const G=(x,y,w)=>plane({x,y,w:w||320,grid:false,axes:false});
const pt=(c,r,a)=>[c[0]+r*Math.cos(a*D),c[1]+r*Math.sin(a*D)];
const dir=(A,B)=>Math.atan2(B[1]-A[1],B[0]-A[0])/D;
const dist=(A,B)=>Math.hypot(B[0]-A[0],B[1]-A[1]);
const add=(A,B,k=1)=>[A[0]+k*B[0],A[1]+k*B[1]];
const lerp=(A,B,t)=>[A[0]+t*(B[0]-A[0]),A[1]+t*(B[1]-A[1])];
// mesure (en degrés, entre 0 et 180) de l'angle AVB
const angle=(V,A,B)=>{ const u=[A[0]-V[0],A[1]-V[1]], w=[B[0]-V[0],B[1]-V[1]]; const c=(u[0]*w[0]+u[1]*w[1])/(Math.hypot(...u)*Math.hypot(...w)); return Math.acos(Math.max(-1,Math.min(1,c)))/D; };
// arc de cercle de centre c, de l'angle a1 à a2 (degrés, sens inverse des aiguilles d'une montre), avec étiquette facultative
function arc(P,c,r,a1,a2,q={}){ let b=a2; while(b<a1) b+=360;
  P.curve(t=>c[0]+r*Math.cos(t*D),t=>c[1]+r*Math.sin(t*D),a1,b,Object.assign({w:2.5,c:'var(--spark)',n:48},q));
  if(q.l){ const m=(a1+b)/2, rr=r+(q.lr||.42); P.text(c[0]+rr*Math.cos(m*D),c[1]+rr*Math.sin(m*D),q.l,{a:'middle',dy:4,s:q.s||12,c:q.c||'var(--spark)'}); }
  return P; }
// marque l'angle (le plus petit) de sommet V entre [VA) et [VB)
function ang(P,V,A,B,q={}){ let a=dir(V,A), b=dir(V,B), d=((b-a)%360+360)%360; if(d>180){ a=b; d=360-d; } return arc(P,V,q.r||.6,a,a+d,q); }
// marque d'angle droit en V
function right(P,V,A,B,s=.32,c='var(--muted)'){ const u=dir(V,A)*D, v=dir(V,B)*D;
  const p1=[V[0]+s*Math.cos(u),V[1]+s*Math.sin(u)], p3=[V[0]+s*Math.cos(v),V[1]+s*Math.sin(v)], p2=[p1[0]+s*Math.cos(v),p1[1]+s*Math.sin(v)];
  P.poly([p1,p2,p3],{open:true,c,w:1.8}); return P; }
// droite (AB) prolongée de e de chaque côté
function line(P,A,B,q={},e=20){ const d=dist(A,B), ux=(B[0]-A[0])/d, uy=(B[1]-A[1])/d; P.seg(A[0]-e*ux,A[1]-e*uy,B[0]+e*ux,B[1]+e*uy,Object.assign({w:2,c:'var(--ink)'},q)); return P; }
const sg=(P,A,B,q={})=>P.seg(A[0],A[1],B[0],B[1],Object.assign({w:2.5,c:'var(--ink)'},q));
const lab=(P,A,s,dx,dy,c)=>{ P.dot(A[0],A[1],{r:4,c:c||'var(--ink)'}); P.text(A[0],A[1],s,{dx:dx??7,dy:dy??-7}); return P; };
const mid=(A,B)=>[(A[0]+B[0])/2,(A[1]+B[1])/2];
const tl=(P,A,B,s,dx,dy,c)=>{ const m=mid(A,B); P.text(m[0],m[1],s,{a:'middle',dx:dx||0,dy:dy||0,s:12,c:c||'var(--muted)'}); return P; };

/* --- figures du chapitre Angles et cercle --- */
// deux droites horizontales y = ±1,4 et une sécante d'angle s passant par (x0, 0)
function trans(s,x0=0){ const t=Math.tan(s*D); return {I1:[x0+1.4/t,1.4],I2:[x0-1.4/t,-1.4]}; }
function transFig(s,P,q={}){ const {I1,I2}=trans(s,q.x0||0);
  line(P,[-1,1.4],[1,1.4],{c:'var(--math)',w:2.5}); line(P,[-1,-1.4],[1,-1.4],{c:'var(--math)',w:2.5}); line(P,I2,I1,{c:'var(--ink)',w:2});
  P.text(-4.7,1.4,'d',{dy:-7,c:'var(--math)'}).text(-4.7,-1.4,'d′',{dy:-7,c:'var(--math)'});
  return {I1,I2}; }
// cercle de centre O, rayon R
function circ(P,O,R,q={}){ P.circ(O[0],O[1],R,Object.assign({c:'var(--muted)',w:2},q)); return P; }
// figure de l'angle inscrit : angle au centre c, M placé sur le grand arc à la fraction m (0 à 1)
function inscrit(c,m,o={}){ const P=G([-3.6,3.6],[-3.4,3.4]), O=[0,0], R=2.8;
  const A=pt(O,R,270-c/2), B=pt(O,R,270+c/2), a0=270+c/2+14, a1=270-c/2-14+360, M=pt(O,R,a0+m*(a1-a0));
  circ(P,O,R); arc(P,O,R,270-c/2,270+c/2,{c:'var(--math)',w:5,n:60});
  sg(P,O,A,{c:'var(--accent)'}); sg(P,O,B,{c:'var(--accent)'}); sg(P,M,A,{c:'var(--spark)'}); sg(P,M,B,{c:'var(--spark)'});
  ang(P,O,A,B,{c:'var(--accent)',r:.55,l:o.lo??`${c}°`}); ang(P,M,A,B,{c:'var(--spark)',r:.7,l:o.lm??`${fmt(angle(M,A,B),1)}°`,lr:.5});
  lab(P,O,'O',8,4); lab(P,A,'A',-16,10); lab(P,B,'B',6,10); lab(P,M,'M',M[0]<0?-18:8,M[1]>0?-6:16);
  return {P,A,B,M,O}; }

/* --- figures du chapitre Homothéties --- */
const img=(O,M,k)=>[O[0]+k*(M[0]-O[0]),O[1]+k*(M[1]-O[1])];
function triTo(P,T,q){ P.poly(T,Object.assign({w:2.5},q)); return P; }
// triangle de base [PQ] horizontale de longueur b, d'angles a (en P) et c (en Q)
function triAng(Pp,b,a,c,rot=0,flip=1){ const d=b*Math.sin(c*D)/Math.sin((a+c)*D); const R0=[d*Math.cos(a*D),flip*d*Math.sin(a*D)];
  const r=p=>[Pp[0]+p[0]*Math.cos(rot*D)-p[1]*Math.sin(rot*D),Pp[1]+p[0]*Math.sin(rot*D)+p[1]*Math.cos(rot*D)];
  return [r([0,0]),r([b,0]),r(R0)]; }
// triangle de côtés connus : A, B (AB = c) puis C avec AC = b, BC = a
function triCotes(A,c,b,a,rot=0){ const x=(b*b+c*c-a*a)/(2*c), y=Math.sqrt(Math.max(0,b*b-x*x));
  const r=p=>[A[0]+p[0]*Math.cos(rot*D)-p[1]*Math.sin(rot*D),A[1]+p[0]*Math.sin(rot*D)+p[1]*Math.cos(rot*D)];
  return [r([0,0]),r([c,0]),r([x,y])]; }

/* --- figures du chapitre Thalès --- */
function thalesTri(t,o={}){ const P=G([-3.6,4.6],[-2.2,4.2]), A=[0,3.6], B=[-3,-1.4], C=[4,-1.4];
  const M=lerp(A,B,t), N=lerp(A,C,t);
  P.poly([A,B,C],{fill:'var(--accent)',fo:.08,c:null}); P.poly([A,M,N],{fill:'var(--spark)',fo:.25,c:null});
  sg(P,A,B); sg(P,A,C); sg(P,B,C,{c:'var(--math)',w:3}); sg(P,M,N,{c:'var(--math)',w:3});
  lab(P,A,'A',8,-4); lab(P,B,'B',-14,16); lab(P,C,'C',6,16); lab(P,M,'M',-18,0); lab(P,N,'N',8,2);
  if(o.lab) o.lab(P,{A,B,C,M,N});
  return {P,A,B,C,M,N}; }
function papillon(t,o={}){ const P=G([-5,5.4],[-2.6,3]), A=[0,0], B=[-4,-2], C=[3,-2];
  const M=img(A,B,-t), N=img(A,C,-t);
  P.poly([A,B,C],{fill:'var(--accent)',fo:.08,c:null}); P.poly([A,M,N],{fill:'var(--spark)',fo:.25,c:null});
  sg(P,B,M); sg(P,C,N); sg(P,B,C,{c:'var(--math)',w:3}); sg(P,M,N,{c:'var(--math)',w:3});
  lab(P,A,'A',-4,18); lab(P,B,'B',-14,16); lab(P,C,'C',6,16); lab(P,M,'M',8,-4); lab(P,N,'N',-18,-4);
  if(o.lab) o.lab(P,{A,B,C,M,N});
  return {P,A,B,C,M,N}; }
const r2=x=>fmt(x,2);

COURS.push(
/* ===================== ANGLES ET CERCLE ===================== */
{subj:'sec', sem:'a11', o:4, id:'sec11-angles', h:'Angles et cercle', p:'Les angles formés par des droites parallèles et une sécante, l’angle inscrit qui vaut la moitié de l’angle au centre, le cercle de Thalès, la tangente et les polygones réguliers.', steps:[
 {kind:'Théorie',h:'Les angles opposés par le sommet',p:`<p>Ouvre une paire de ciseaux. Les deux lames se croisent comme deux droites. L’angle entre les poignées est toujours égal à l’angle entre les pointes des lames. Ce n’est pas un hasard.</p>
<div class="def"><p>Deux droites <b>sécantes</b> (qui se coupent) forment quatre angles autour de leur point commun, le <b>sommet</b>. Deux de ces angles sont <b>opposés par le sommet</b> quand les côtés de l’un sont les prolongements des côtés de l’autre. Deux angles sont <b>supplémentaires</b> quand leur somme vaut 180°.</p></div>
<div class="prop"><p>Deux angles opposés par le sommet sont <b>égaux</b>. Deux angles voisins posés sur une même droite sont <b>supplémentaires</b>.</p></div>
<div class="why"><p>Deux angles voisins sur une droite forment un angle plat : 180°. Appelle <i>a</i> l’angle du haut à droite et <i>b</i> son voisin. Alors <i>a</i> + <i>b</i> = 180°. L’angle opposé à <i>a</i> est aussi voisin de <i>b</i>, donc lui aussi vaut 180° − <i>b</i>. Il est égal à <i>a</i>.</p></div>
<div class="ex"><p>Un angle mesure 35°. Son opposé par le sommet mesure aussi 35°. Les deux autres mesurent 180° − 35° = 145° chacun. Contrôle : 35 + 145 + 35 + 145 = 360°, un tour complet.</p></div>
<p>Ouvre les « ciseaux » avec le curseur : les mesures changent, les égalités restent.</p>`,
  params:[{id:'a',l:'Ouverture a',min:10,max:170,step:5,v:50,u:'°'}],
  draw:v=>{ const P=G([-4,4],[-2.6,2.6]), O=[0,0];
    line(P,[-1,0],[1,0],{c:'var(--ink)'}); line(P,O,pt(O,1,v.a),{c:'var(--ink)'});
    arc(P,O,.8,0,v.a,{c:'var(--accent)',l:`${v.a}°`,lr:.5}); arc(P,O,.8,180,180+v.a,{c:'var(--accent)',l:`${v.a}°`,lr:.5});
    arc(P,O,1.15,v.a,180,{c:'var(--spark)',l:`${180-v.a}°`,lr:.45}); arc(P,O,1.15,180+v.a,360,{c:'var(--spark)',l:`${180-v.a}°`,lr:.45});
    lab(P,O,'O',6,16); return P.svg(); },
  info:v=>`Opposés par le sommet : ${v.a}° et ${v.a}°. Les deux autres : 180° − ${v.a}° = ${180-v.a}°. Somme des quatre : ${2*v.a} + ${2*(180-v.a)} = 360°.`},
 {kind:'Théorie',h:'Deux droites coupées par une sécante',p:`<p>Sur un plan de ville, deux rues parallèles sont traversées par une avenue en biais. À chaque carrefour, quatre angles apparaissent : huit en tout. Pour en parler sans se perdre, on leur donne des noms.</p>
<div class="def"><p>Une <b>sécante</b> est une droite qui coupe deux autres droites <i>d</i> et <i>d</i>′ (lire « d prime »). Elle crée deux carrefours. Deux angles sont <b>correspondants</b> s’ils occupent la même place aux deux carrefours, par exemple tous les deux « en haut à droite ». Deux angles sont <b>alternes-internes</b> s’ils sont entre <i>d</i> et <i>d</i>′ (internes) et de part et d’autre de la sécante (alternes). Les <b>alternes-externes</b> sont à l’extérieur de la bande, de part et d’autre de la sécante.</p></div>
<div class="idea"><p>Pense à un tampon : l’angle correspondant, c’est la même empreinte tamponnée au deuxième carrefour. Deux angles alternes-internes dessinent un Z (ou un N) entre les deux droites.</p></div>
<div class="ex"><p>Sur la figure, les droites sont parallèles et la sécante fait un angle de 62° avec elles. En haut à droite du carrefour du haut, et en haut à droite du carrefour du bas : deux angles correspondants, de 62° chacun. Leurs voisins mesurent 180° − 62° = 118°.</p></div>
<p>Bouge le curseur pour voir chaque famille d’angles.</p>`,
  params:[{id:'p',l:'Famille d’angles (0, 1 ou 2)',min:0,max:2,v:0}],
  draw:v=>{ const P=G([-5,5],[-3,3]), s=62, {I1,I2}=transFig(s,P);
    const pairs=[[[I1,0,s],[I2,0,s]],[[I1,180,180+s],[I2,0,s]],[[I1,s,180],[I2,180+s,360]]][v.p];
    pairs.forEach(([I,a,b])=>arc(P,I,.6,a,b,{c:'var(--spark)',w:4,l:`${b-a}°`,lr:.5}));
    lab(P,I1,'',0,0); lab(P,I2,'',0,0); P.text(I1[0]+.9*Math.cos(s*D),I1[1]+.9*Math.sin(s*D),'sécante',{dx:-8,a:'end',s:12,c:'var(--muted)'});
    return P.svg(); },
  info:v=>['Angles <b>correspondants</b> : la même place aux deux carrefours (ici, en haut à droite).','Angles <b>alternes-internes</b> : entre <i>d</i> et <i>d</i>′, de part et d’autre de la sécante. Ils forment un Z.','Angles <b>alternes-externes</b> : hors de la bande, de part et d’autre de la sécante.'][v.p]},
 {kind:'Théorie',h:'Le théorème de la transversale',p:`<p>Sur la figure précédente, les angles correspondants étaient égaux. Est-ce toujours vrai ? Seulement si les deux droites sont parallèles. On écrit <i>d</i> ∥ <i>d</i>′ et on lit « <i>d</i> est parallèle à <i>d</i>′ ».</p>
<div class="thm"><p><b>Théorème de la transversale.</b> Si deux droites <b>parallèles</b> sont coupées par une sécante, alors les angles correspondants sont égaux, les angles alternes-internes sont égaux et les angles alternes-externes sont égaux.</p><p><b>Réciproque.</b> Si deux droites coupées par une sécante forment deux angles correspondants égaux (ou deux angles alternes-internes égaux), alors ces deux droites sont parallèles.</p></div>
<div class="why"><p>Fais glisser la droite <i>d</i> le long de la sécante jusqu’à <i>d</i>′ : c’est une translation. Comme <i>d</i> ∥ <i>d</i>′, elle tombe pile sur <i>d</i>′, et le carrefour du haut se pose sur celui du bas. Une translation ne change pas les angles : chaque angle arrive sur son correspondant. Un angle alterne-interne est l’opposé par le sommet d’un correspondant : il est égal lui aussi.</p></div>
<div class="ex"><p>Si <i>d</i> ∥ <i>d</i>′ et qu’un angle mesure 70° au carrefour du haut, son correspondant mesure 70°, son alterne-interne aussi, et les angles voisins valent 180° − 70° = 110°.</p></div>
<div class="warn"><p>Sans parallèles, rien ne marche : si <i>d</i>′ penche un peu, ses angles avec la sécante deviennent par exemple 75° et 105°, plus du tout égaux à ceux de <i>d</i>.</p></div>
${sdx}<p>Vers 240 av. J.-C., Ératosthène a mesuré la Terre grâce à ce théorème. Les rayons du Soleil sont parallèles. À midi, un bâton à Alexandrie faisait une ombre d’angle 7,2°, alors qu’à Syène le Soleil était juste au-dessus. Par les angles alternes-internes, 7,2° est aussi l’angle au centre de la Terre entre les deux villes, soit 1/50 de tour. Le tour de la Terre vaut donc 50 fois la distance entre les villes : environ 40 000 km.</p></div>`,
  fig:(()=>{ const P=G([-5,5],[-3,3]), s=70, {I1,I2}=transFig(s,P);
    arc(P,I1,.6,0,s,{c:'var(--spark)',w:4,l:'70°',lr:.5}); arc(P,I2,.6,0,s,{c:'var(--spark)',w:4,l:'70°',lr:.5}); arc(P,I1,.6,180,180+s,{c:'var(--accent)',w:4,l:'70°',lr:.5});
    const v=[I2[0]-I1[0],I2[1]-I1[1]]; P.arrow(-3.2,1.25,-3.2+v[0],1.25+v[1]+.3,{c:'var(--muted)',w:2,dash:true,hs:9});
    P.text(-3.2+v[0]/2,0,'translation',{dx:6,s:11,c:'var(--muted)'}); return P.svg(); })()},
 {kind:'Méthode',h:'Calculer des angles avec des parallèles',p:`<b>Quand :</b> la figure contient des droites parallèles, une sécante et un angle connu. <b>Pourquoi ça marche :</b> trois règles suffisent pour trouver tous les autres angles. Les angles opposés par le sommet sont égaux. Deux angles voisins sur une droite sont supplémentaires (somme 180°). Avec des parallèles, les correspondants et les alternes-internes sont égaux. <b>Comment :</b> avance de proche en proche, un angle à la fois, et écris à chaque pas la règle utilisée. Pour <b>prouver</b> que deux droites sont parallèles, cherche deux angles correspondants (ou alternes-internes) et compare-les.`,
  demo:{enonce:'Les droites <i>d</i> et <i>d</i>′ sont parallèles. Une sécante les coupe en A et en B. En A, l’angle en haut à gauche mesure 115°. Trouve les quatre angles en B.',
   etapes:[
    {f:'En A, en haut à droite : 180° − 115° = 65°',w:'Les deux angles du haut en A sont voisins sur la droite <i>d</i> : ils sont supplémentaires.'},
    {f:'En B, en haut à droite : 65° ; en haut à gauche : 115°',w:'Ce sont les correspondants des angles du haut en A, et <i>d</i> ∥ <i>d</i>′.'},
    {f:'En B, en bas à gauche : 65° ; en bas à droite : 115°',w:'Chacun est opposé par le sommet à un angle du haut en B.'},
    {f:'Contrôle : 65 + 115 + 65 + 115 = 360°',w:'Les quatre angles autour d’un point font un tour complet.'},
    {f:'Si l’angle en haut à droite en B avait mesuré 63°, <i>d</i> et <i>d</i>′ ne seraient pas parallèles',w:'Avec des parallèles, le théorème donnerait deux correspondants égaux. Comme 63° ≠ 65°, les droites ne sont pas parallèles.'}],
   conclusion:'En B : 65°, 115°, 65° et 115°. Écris toujours la règle à côté du calcul.'},
  fig:(()=>{ const P=G([-5,5],[-3,3]), s=65, {I1,I2}=transFig(s,P);
    arc(P,I1,.6,s,180,{c:'var(--spark)',w:4,l:'115°',lr:.5}); ['?','?','?','?'].forEach((q,i)=>arc(P,I2,.5+.2*(i%2),[0,s,180,180+s][i],[s,180,180+s,360][i],{c:'var(--accent)',w:2.5,l:q,lr:.35}));
    lab(P,I1,'A',10,16); lab(P,I2,'B',10,16); return P.svg(); })()},
 {kind:'Pratique',h:'Retrouve l’angle x',p:'Les droites <i>d</i> et <i>d</i>′ sont parallèles. En A, l’angle en haut à droite mesure 72°. Règle le curseur sur la mesure de l’angle <i>x</i>, en haut à gauche en B.',
  params:[{id:'x',l:'Angle x',min:0,max:180,step:4,v:60,u:'°'}],
  draw:v=>{ const P=G([-5,5],[-3,3]), s=72, {I1,I2}=transFig(s,P);
    arc(P,I1,.6,0,s,{c:'var(--spark)',w:4,l:'72°',lr:.5}); lab(P,I1,'A',-16,16); lab(P,I2,'B',10,16);
    P.seg(I2[0],I2[1],I2[0]+2.2*Math.cos((180-v.x)*D),I2[1]+2.2*Math.sin((180-v.x)*D),{c:'var(--accent)',w:3});
    arc(P,I2,.7,180-v.x,180,{c:'var(--accent)',w:4,l:`x = ${v.x}°`,lr:.75}); return P.svg(); },
  info:v=>`x = ${v.x}°`,
  ok:v=>v.x===108,why:'En A, l’angle en haut à gauche vaut 180° − 72° = 108° (angles supplémentaires). En B, l’angle en haut à gauche est son correspondant, et <i>d</i> ∥ <i>d</i>′ : <i>x</i> = 108°.'},
 {kind:'Théorie',h:'Angle au centre et angle inscrit',p:`<p>Au stade, tu regardes les deux poteaux du but depuis les gradins. Sous quel angle les vois-tu ? Si les gradins forment un cercle, la réponse est étonnante. Il faut d’abord deux définitions.</p>
<div class="def"><p>Soit un cercle de centre O et deux points A et B du cercle. L’<b>angle au centre</b> AOB a son sommet au centre O (dans le nom d’un angle, la lettre du milieu est toujours le sommet). Un <b>angle inscrit</b> AMB a son sommet M <b>sur le cercle</b>, et ses côtés passent par A et B. On dit que ces angles <b>interceptent</b> l’arc AB : c’est le morceau de cercle situé à l’intérieur de l’angle.</p></div>
<div class="idea"><p>Imagine une pizza : la pointe d’une part est un angle au centre. Un angle inscrit, c’est la croûte de cette part regardée depuis un point du bord, de l’autre côté de la pizza.</p></div>
<div class="ex"><p>Une pizza coupée en 6 parts égales : chaque angle au centre mesure 360° : 6 = 60°. En 8 parts : 360° : 8 = 45°. Sur la figure, l’angle au centre mesure 100° et l’angle inscrit qui intercepte le même arc mesure 50°.</p></div>
<div class="warn"><p>Un angle dont le sommet est dans le disque, mais pas au centre, n’est ni un angle au centre, ni un angle inscrit.</p></div>`,
  fig:inscrit(100,.45).P.svg()},
 {kind:'Théorie',h:'Le théorème de l’angle inscrit',p:`<p>Sur la figure précédente, 50° est exactement la moitié de 100°. Coïncidence ? Déplace le sommet M sur le cercle : l’angle inscrit ne bouge pas.</p>
<div class="thm"><p><b>Théorème de l’angle inscrit.</b> Un angle inscrit mesure <b>la moitié</b> de l’angle au centre qui intercepte le même arc : AMB = AOB : 2. <b>Conséquence :</b> tous les angles inscrits qui interceptent le même arc sont <b>égaux</b>.</p></div>
<div class="why"><p>Prends le cas où [MA] passe par le centre O. Le triangle OMB est isocèle, car OM = OB (deux rayons). Ses angles en M et en B sont donc égaux : disons <i>x</i> chacun. Son angle en O vaut 180° − 2<i>x</i>. L’angle AOB est son voisin sur la droite (MA) : il vaut 180° − (180° − 2<i>x</i>) = 2<i>x</i>. L’angle au centre est bien le double de l’angle inscrit. Dans les autres cas, on coupe la figure par le diamètre qui passe par M et on additionne (ou on soustrait) deux morceaux de ce type.</p></div>
<div class="ex"><p>Angle au centre de 80° : chaque angle inscrit qui intercepte le même arc mesure 80° : 2 = 40°. Angle inscrit de 25° : l’angle au centre mesure 2 × 25° = 50°.</p></div>`,
  params:[{id:'c',l:'Angle au centre AOB',min:40,max:160,step:10,v:100,u:'°'},{id:'m',l:'Position de M sur le cercle',min:0,max:100,step:5,v:40,u:'%'}],
  draw:v=>inscrit(v.c,v.m/100).P.svg(),
  info:v=>{ const f=inscrit(v.c,v.m/100); return `Angle au centre AOB = ${v.c}°. Angle inscrit AMB = ${fmt(angle(f.M,f.A,f.B),1)}°, c’est-à-dire ${v.c}° : 2, où que soit M sur le grand arc.`; }},
 {kind:'Méthode',h:'Utiliser l’angle inscrit',p:`<b>Quand :</b> un angle a son sommet sur un cercle, ou au centre. <b>Pourquoi ça marche :</b> le théorème de l’angle inscrit relie les deux, à condition qu’ils interceptent le <b>même arc</b>. <b>Comment :</b> 1) repère l’arc intercepté, entre les côtés de l’angle ; 2) cherche l’angle au centre ou les autres angles inscrits qui interceptent cet arc ; 3) divise par 2 pour passer du centre à l’inscrit, ou multiplie par 2 pour passer de l’inscrit au centre. Les triangles comme AOB sont isocèles, car deux de leurs côtés sont des rayons : ils donnent souvent les angles qui manquent.`,
  demo:{enonce:'A, B, C et D sont sur un cercle de centre O. L’angle au centre AOB mesure 110°. C et D sont sur le grand arc, de l’autre côté de A et B. Calcule les angles ACB, ADB et OAB.',
   etapes:[
    {f:'ACB = 110° : 2 = 55°',w:'ACB est inscrit et intercepte l’arc AB, comme l’angle au centre AOB.'},
    {f:'ADB = 55°',w:'ADB intercepte le même arc : tous ces angles inscrits sont égaux.'},
    {f:'OA = OB, donc OAB = OBA',w:'Le triangle AOB est isocèle en O (deux rayons).'},
    {f:'OAB = (180° − 110°) : 2 = 35°',w:'La somme des angles d’un triangle vaut 180°. Il reste 70°, partagés entre deux angles égaux.'}],
   conclusion:'ACB = ADB = 55° et OAB = 35°.'},
  fig:(()=>{ const P=G([-3.6,3.6],[-3.4,3.4]), O=[0,0], R=2.8, A=pt(O,R,215), B=pt(O,R,325), C=pt(O,R,120), Dd=pt(O,R,50);
    circ(P,O,R); sg(P,O,A,{c:'var(--accent)'}); sg(P,O,B,{c:'var(--accent)'}); sg(P,A,B,{c:'var(--muted)',w:1.5});
    [C,Dd].forEach(X=>{ sg(P,X,A,{c:'var(--spark)',w:2}); sg(P,X,B,{c:'var(--spark)',w:2}); ang(P,X,A,B,{c:'var(--spark)',r:.6,l:'?',lr:.4}); });
    ang(P,O,A,B,{c:'var(--accent)',r:.5,l:'110°'}); lab(P,O,'O',-8,-8); lab(P,A,'A',-16,12); lab(P,B,'B',6,12); lab(P,C,'C',-16,-4); lab(P,Dd,'D',8,-4);
    return P.svg(); })()},
 {kind:'Question',h:'L’angle au centre caché',p:'Sur ce cercle de centre O, l’angle inscrit AMB mesure 34°. Combien mesure l’angle au centre AOB, qui intercepte le même arc ?',
  fig:inscrit(68,.5,{lo:'?',lm:'34°'}).P.svg(),lab:'AOB =',unit:'°',ans:68,why:'L’angle au centre vaut le double de l’angle inscrit qui intercepte le même arc : 2 × 34° = 68°.'},
 {kind:'Théorie',h:'Le cercle de Thalès',p:`<p>Comment trouver le centre d’une assiette ronde avec une simple feuille de papier ? Pose un coin de la feuille sur le bord de l’assiette. Les deux bords de la feuille recoupent le cercle en deux points : ce sont les deux bouts d’un diamètre ! Recommence ailleurs : les deux diamètres se croisent au centre. Voici pourquoi.</p>
<div class="thm"><p><b>Cercle de Thalès.</b> Si [AB] est un diamètre d’un cercle et M un autre point du cercle, alors l’angle AMB est <b>droit</b> (90°). <b>Réciproque :</b> si l’angle AMB est droit, alors M est sur le cercle de diamètre [AB]. Le cercle qui passe par les trois sommets d’un triangle rectangle a donc pour centre le milieu de l’hypoténuse.</p></div>
<div class="why"><p>L’angle au centre AOB est un angle plat : 180°. L’angle inscrit AMB intercepte le même demi-cercle, il vaut la moitié : 180° : 2 = 90°.</p></div>
<div class="ex"><p>Un diamètre [AB] de 10 cm et M sur le cercle : le triangle AMB est rectangle en M, d’hypoténuse [AB]. Le segment [OM] est un rayon : il mesure 5 cm, comme [OA] et [OB].</p></div>
${sdx}<p>Thalès de Milet vivait en Grèce il y a environ 2600 ans. On raconte qu’il a offert un bœuf aux dieux pour fêter cette découverte. C’est l’un des tout premiers théorèmes démontrés de l’histoire.</p></div>`,
  params:[{id:'m',l:'Position de M',min:10,max:170,step:5,v:60,u:'°'}],
  draw:v=>{ const P=G([-3.8,3.8],[-.8,3.6]), O=[0,0], R=3, A=[-3,0], B=[3,0], M=pt(O,R,v.m);
    arc(P,O,R,0,180,{c:'var(--muted)',w:2,n:80}); sg(P,A,B,{c:'var(--math)',w:3}); P.poly([A,M,B],{fill:'var(--spark)',fo:.15,c:null});
    sg(P,A,M,{c:'var(--spark)'}); sg(P,M,B,{c:'var(--spark)'}); sg(P,O,M,{c:'var(--muted)',w:1.5,dash:true}); right(P,M,A,B,.3,'var(--spark)');
    lab(P,A,'A',-16,14); lab(P,B,'B',6,14); lab(P,O,'O',-4,16); lab(P,M,'M',v.m>90?-18:8,-6); return P.svg(); },
  info:v=>{ const M=pt([0,0],3,v.m); return `Angle AMB = ${fmt(angle(M,[-3,0],[3,0]),1)}°, quelle que soit la place de M sur le demi-cercle.`; }},
 {kind:'Théorie',h:'La tangente à un cercle',p:`<p>Une roue de vélo roule sur la route : elle ne la touche qu’en un seul point. Lâche un caillou qui tourne au bout d’une fronde : il part tout droit, en frôlant le cercle qu’il décrivait. Ces droites qui effleurent un cercle sont des tangentes.</p>
<div class="def"><p>Une <b>tangente</b> à un cercle est une droite qui a <b>un seul point commun</b> avec lui, le <b>point de contact</b> T.</p></div>
<div class="prop"><p>La tangente en T est <b>perpendiculaire au rayon</b> [OT].</p></div>
<div class="why"><p>Le point d’une droite le plus proche de O est le pied de la perpendiculaire tracée depuis O. Si la droite n’était pas perpendiculaire à (OT), ce pied serait un autre point H, plus proche de O que T : OH serait plus petit que le rayon. H serait dans le disque et la droite traverserait le cercle en deux points. Ce ne serait pas une tangente.</p></div>
<div class="ex"><p>Pour tracer la tangente en T, trace le rayon [OT], puis la perpendiculaire à (OT) qui passe par T, à l’équerre. Sur la figure, OT = 3 et OP = 5. Le triangle OTP est rectangle en T, donc par Pythagore PT² = 5² − 3² = 25 − 9 = 16 et PT = 4.</p></div>`,
  fig:(()=>{ const P=G([-3.5,6.5],[-3.4,3.4]), O=[0,0], Pp=[5,0], T=[1.8,2.4];
    circ(P,O,3); line(P,T,Pp,{c:'var(--accent)',w:2.5},4); sg(P,O,T,{c:'var(--spark)'}); sg(P,O,Pp,{c:'var(--muted)',w:1.5,dash:true}); right(P,T,O,Pp,.35,'var(--spark)');
    lab(P,O,'O',-8,16); lab(P,T,'T',-4,-10); lab(P,Pp,'P',6,16); tl(P,O,T,'3',-10,0); tl(P,O,Pp,'5',0,14); tl(P,T,Pp,'4',10,-4); return P.svg(); })()},
 {kind:'Méthode',h:'Repérer un angle droit caché',p:`<b>Quand :</b> la figure contient un diamètre et un point du cercle, ou une tangente et le rayon qui va au point de contact. <b>Pourquoi ça marche :</b> le cercle de Thalès et la propriété de la tangente fabriquent un triangle rectangle. On peut alors utiliser le théorème de Pythagore. Rappel : dans un triangle rectangle, le carré de l’hypoténuse (le côté opposé à l’angle droit) est égal à la somme des carrés des deux autres côtés. <b>Comment :</b> 1) nomme l’angle droit et dis pourquoi il est droit ; 2) repère l’hypoténuse ; 3) écris Pythagore et calcule. Rédige ta réponse : une phrase, le calcul, la réponse avec l’unité.`,
  demo:{enonce:'Un cercle a pour diamètre [AB], avec AB = 10 cm. Le point M est sur le cercle et AM = 6 cm. Calcule MB.',
   etapes:[
    {f:'L’angle AMB est droit',w:'[AB] est un diamètre et M est sur le cercle : c’est le cercle de Thalès.'},
    {f:'L’hypoténuse est [AB]',w:'C’est le côté opposé à l’angle droit en M.'},
    {f:'AM² + MB² = AB², donc MB² = 100 − 36 = 64',w:'Pythagore, puis on isole MB².'},
    {f:'MB = √64 = 8 cm',w:'On prend la racine carrée.'}],
   conclusion:'Le segment [MB] mesure 8 cm.'},
  note:'Avec une tangente en T et un point P de cette tangente : l’angle droit est en T, et l’hypoténuse du triangle OTP est [OP].',
  fig:(()=>{ const P=G([-6,6],[-1,5.8]), A=[-5,0], B=[5,0], M=[-1.4,4.8];
    arc(P,[0,0],5,0,180,{c:'var(--muted)',w:2,n:80}); sg(P,A,B,{c:'var(--math)',w:3}); sg(P,A,M,{c:'var(--spark)'}); sg(P,M,B,{c:'var(--spark)'}); right(P,M,A,B,.5,'var(--spark)');
    lab(P,A,'A',-14,14); lab(P,B,'B',6,14); lab(P,M,'M',-4,-10); tl(P,A,M,'6 cm',-22,0); tl(P,M,B,'?',12,-4); tl(P,A,B,'10 cm',0,16); return P.svg(); })()},
 {kind:'Question',h:'La longueur de la tangente',p:'Un cercle de centre O a un rayon de 5 cm. Le point P est à 13 cm de O. La droite (PT) est tangente au cercle au point T. Combien mesure PT ?',
  fig:(()=>{ const P=G([-2.5,6],[-2.5,2.5]), O=[0,0], Pp=[5.2,0], a=Math.acos(5/13)/D, T=pt(O,2,a);
    circ(P,O,2); line(P,T,Pp,{c:'var(--accent)',w:2.5},3); sg(P,O,T,{c:'var(--spark)'}); sg(P,O,Pp,{c:'var(--muted)',w:1.5,dash:true}); right(P,T,O,Pp,.3,'var(--spark)');
    lab(P,O,'O',-8,16); lab(P,T,'T',-4,-10); lab(P,Pp,'P',6,16); tl(P,O,T,'5',-10,0); tl(P,O,Pp,'13',0,14); return P.svg(); })(),
  lab:'PT =',unit:'cm',ans:12,why:'La tangente est perpendiculaire au rayon : OTP est rectangle en T, d’hypoténuse [OP]. PT² = 13² − 5² = 169 − 25 = 144, donc PT = 12 cm.'},
 {kind:'Théorie',h:'Les polygones réguliers',p:`<p>Un panneau stop a 8 côtés égaux, un écrou en a 6, un ballon de foot est couvert de pentagones et d’hexagones. Ce sont des polygones réguliers. Le cercle permet de les dessiner parfaitement.</p>
<div class="def"><p>Un <b>polygone régulier</b> a tous ses côtés de même longueur et tous ses angles égaux. Ses sommets sont sur un cercle de centre O. Pour <i>n</i> côtés, l’<b>angle au centre</b> (entre les rayons qui vont vers deux sommets voisins) mesure 360° : <i>n</i>, et chaque <b>angle intérieur</b> mesure 180° − 360° : <i>n</i>.</p></div>
<div class="why"><p>Les <i>n</i> angles au centre font ensemble un tour complet : 360°. Chaque triangle formé par O et deux sommets voisins est isocèle, et ses deux angles de base valent ensemble 180° moins l’angle au centre. Un angle intérieur du polygone est formé de deux de ces angles de base, venus de deux triangles voisins : il vaut donc 180° − 360° : <i>n</i>.</p></div>
<div class="ex"><p>Pentagone (<i>n</i> = 5) : angle au centre 360° : 5 = 72°, angle intérieur 180° − 72° = 108°. Hexagone : 60° et 120°. Les triangles de l’hexagone sont équilatéraux, donc son côté est égal au rayon : on le construit en reportant 6 fois le rayon au compas sur le cercle.</p></div>
<p><b>Construction :</b> trace un cercle et un premier rayon, puis reporte l’angle au centre au rapporteur, <i>n</i> fois. Relie les points obtenus.</p>`,
  params:[{id:'n',l:'Nombre de côtés n',min:3,max:12,v:5}],
  draw:v=>{ const P=G([-3.4,3.4],[-3.2,3.4]), O=[0,0], R=2.8, V=[]; for(let k=0;k<v.n;k++) V.push(pt(O,R,90+360*k/v.n));
    circ(P,O,R,{w:1.5}); P.poly(V,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:3});
    sg(P,O,V[0],{c:'var(--spark)',w:2,dash:true}); sg(P,O,V[1],{c:'var(--spark)',w:2,dash:true}); ang(P,O,V[0],V[1],{c:'var(--spark)',r:.55,l:`${fmt(360/v.n,1)}°`,lr:.5});
    ang(P,V[1],V[0],V[2],{c:'var(--math)',r:.45,l:`${fmt(180-360/v.n,1)}°`,lr:.55}); lab(P,O,'O',6,16); return P.svg(); },
  info:v=>`<i>n</i> = ${v.n} : angle au centre 360° : ${v.n} = ${fmt(360/v.n,2)}° ; angle intérieur 180° − ${fmt(360/v.n,2)}° = ${fmt(180-360/v.n,2)}°.`},
 {kind:'Défi',h:'La pointe de l’étoile',p:'Une étoile à 5 branches est tracée en reliant, un point sur deux, 5 points régulièrement placés sur un cercle. Combien mesure l’angle à la pointe d’une branche ?',
  fig:(()=>{ const P=G([-3.4,3.4],[-3,3.3]), O=[0,0], R=2.8, V=[]; for(let k=0;k<5;k++) V.push(pt(O,R,90+72*k));
    circ(P,O,R,{w:1.5}); P.poly([V[0],V[2],V[4],V[1],V[3]],{c:'var(--accent)',w:3}); ang(P,V[0],V[2],V[3],{c:'var(--spark)',r:.7,l:'?',lr:.4}); return P.svg(); })(),
  lab:'angle =',unit:'°',ans:36,why:'Ajoute le centre O à la figure. L’angle à la pointe est un angle inscrit : il intercepte l’arc entre deux points voisins, dont l’angle au centre vaut 360° : 5 = 72°. Il mesure donc 72° : 2 = 36°. Stratégie : compléter la figure avec un élément utile (ici, le centre).'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Deux grandes familles de résultats : les angles avec des parallèles, et les angles dans un cercle.</p><div class="keep"><ul>
<li><b>Angles opposés par le sommet</b> : égaux. <b>Angles voisins sur une droite</b> : supplémentaires (somme 180°).</li>
<li><b>Sécante</b> qui coupe <i>d</i> et <i>d</i>′ : angles correspondants (même place), alternes-internes (entre les droites, en Z), alternes-externes.</li>
<li><b>Théorème de la transversale</b> : si <i>d</i> ∥ <i>d</i>′, correspondants et alternes-internes sont égaux. <b>Réciproque</b> : deux correspondants égaux prouvent que <i>d</i> ∥ <i>d</i>′.</li>
<li><b>Angle inscrit</b> = angle au centre : 2, s’ils interceptent le même arc. Les angles inscrits qui interceptent le même arc sont égaux.</li>
<li><b>Cercle de Thalès</b> : un angle inscrit dans un demi-cercle est droit. Le centre du cercle d’un triangle rectangle est le milieu de l’hypoténuse.</li>
<li><b>Tangente</b> : perpendiculaire au rayon au point de contact. Un angle droit caché permet d’utiliser Pythagore.</li>
<li><b>Polygone régulier</b> à <i>n</i> côtés : angle au centre 360° : <i>n</i>, angle intérieur 180° − 360° : <i>n</i>.</li></ul></div>`},
 {kind:'Problème',h:'Le parking en épi',p:'Le long d’une rue, les lignes blanches d’un parking sont parallèles entre elles. Le bord du trottoir est une droite qui les coupe toutes : c’est une sécante. La 1<sup>re</sup> ligne fait un angle de 58° avec le trottoir. On veut connaître les autres angles du marquage, et vérifier le travail du peintre.',
  fig:(()=>{ const P=G([-4.6,6.4],[-.6,2.8]), u=[Math.cos(58*D),Math.sin(58*D)];
    P.seg(-4.6,0,6.4,0,{c:'var(--ink)',w:3}); P.text(-4.4,0,'trottoir',{dy:16,s:11,c:'var(--muted)'});
    [-3.5,-1.5,.5,2.5].forEach((x,i)=>{ sg(P,[x,0],add([x,0],u,2.9),{c:'var(--math)',w:3}); P.text(x+2.9*u[0],2.9*u[1],`${i+1}`,{dx:4,dy:4,s:11,c:'var(--muted)'}); });
    arc(P,[-3.5,0],.55,0,58,{c:'var(--spark)',w:3,l:'58°',lr:.45}); arc(P,[-1.5,0],.55,0,58,{c:'var(--accent)',w:3,l:'α',lr:.4}); arc(P,[.5,0],.55,58,180,{c:'var(--accent)',w:3,l:'β',lr:.4});
    const F0=[2.5,0], Q=[4.5,0], H=add(F0,u,2*u[0]); P.arrow(Q[0],Q[1],H[0],H[1],{c:'var(--spark)',w:2.5,hs:9}); right(P,H,F0,Q,.25); arc(P,Q,.5,dir(Q,H),180,{c:'var(--spark)',w:2.5,l:'γ',lr:.4});
    return P.svg(); })(),
  parts:[
   {q:'a) Combien mesure l’angle α, au pied de la 2<sup>e</sup> ligne ?',lab:'α =',unit:'°',ans:58,hint:'Compare la place de α et celle de l’angle de 58°.',why:'Les lignes sont parallèles et α est le correspondant de l’angle de 58° : α = 58°.'},
   {q:'b) Combien mesure l’angle β, au pied de la 3<sup>e</sup> ligne, de l’autre côté de la ligne ?',lab:'β =',unit:'°',ans:122,hint:'β et l’angle correspondant à 58° sont voisins sur le trottoir.',why:'180° − 58° = 122° (angles supplémentaires).'},
   {q:'c) Le peintre trace une 5<sup>e</sup> ligne qui fait 60° avec le trottoir, à la place où les autres font 58°. Est-elle parallèle aux autres ?',opts:['Oui, car 60° est très proche de 58°','Non : si elle était parallèle, son angle correspondant mesurerait 58°','Oui, toutes les lignes d’un parking sont parallèles','On ne peut pas savoir sans mesurer des longueurs'],ans:1,hint:'Que dirait le théorème de la transversale si elle était parallèle ?',why:'Avec des parallèles, les angles correspondants seraient égaux. 60° ≠ 58°, donc la 5<sup>e</sup> ligne n’est pas parallèle : elle finira par croiser les autres.'},
   {q:'d) Une flèche part du trottoir et arrive perpendiculairement sur la 4<sup>e</sup> ligne (voir la figure). Combien mesure l’angle γ entre la flèche et le trottoir ?',lab:'γ =',unit:'°',ans:32,hint:'La flèche, la 4<sup>e</sup> ligne et le trottoir forment un triangle. Quelle est la somme de ses angles ?',why:'Le triangle a un angle de 58° au pied de la 4<sup>e</sup> ligne (correspondant de l’angle donné) et un angle droit : γ = 180° − 90° − 58° = 32°.'}],
  sol:'Les lignes sont parallèles et le trottoir est une sécante. a) α est le correspondant de l’angle de 58° : α = 58°. b) β est le voisin, sur le trottoir, d’un angle de 58° : β = 180° − 58° = 122°. c) Si la 5<sup>e</sup> ligne était parallèle, le théorème de la transversale donnerait un angle correspondant de 58° ; or elle fait 60°, donc elle n’est pas parallèle aux autres. d) Le triangle formé par la flèche, la 4<sup>e</sup> ligne et le trottoir a des angles de 58° et 90° : γ = 180° − 90° − 58° = 32°.'},
 {kind:'Problème',h:'Le cinéma en plein air',p:'Dans un cinéma en plein air, les sièges sont placés sur un grand arc de cercle de centre O. L’écran est une corde [AB] de ce cercle. Depuis le centre O, on voit l’écran sous un angle AOB de 70°. Le constructeur veut savoir sous quel angle chaque spectateur voit l’écran, puis il étudie une autre salle.',
  fig:(()=>{ const P=G([-3.6,3.6],[-3.4,3.4]), O=[0,0], R=2.8, A=pt(O,R,235), B=pt(O,R,305), M=pt(O,R,140), N=pt(O,R,60);
    circ(P,O,R); sg(P,A,B,{c:'var(--math)',w:5}); sg(P,O,A,{c:'var(--accent)'}); sg(P,O,B,{c:'var(--accent)'}); ang(P,O,A,B,{c:'var(--accent)',r:.55,l:'70°'});
    [[M,'M'],[N,'N']].forEach(([X,s])=>{ sg(P,X,A,{c:'var(--spark)',w:1.8}); sg(P,X,B,{c:'var(--spark)',w:1.8}); ang(P,X,A,B,{c:'var(--spark)',r:.6}); lab(P,X,s,X[0]<0?-18:8,-6); });
    lab(P,O,'O',8,-6); lab(P,A,'A',-16,12); lab(P,B,'B',6,12); P.text(0,(A[1]+B[1])/2,'écran',{a:'middle',dy:18,s:11,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) Sous quel angle le spectateur assis en M voit-il l’écran ?',lab:'AMB =',unit:'°',ans:35,hint:'AMB est un angle inscrit. Quel angle au centre intercepte le même arc ?',why:'AMB intercepte l’arc AB, comme AOB : AMB = 70° : 2 = 35°.'},
   {q:'b) Lina est assise en N, ailleurs sur le même arc. Sous quel angle voit-elle l’écran ?',opts:['Sous un angle plus petit, car elle est plus loin','Sous un angle de 35° aussi : son angle intercepte le même arc','Sous un angle de 70°','Sous un angle plus grand, car elle est plus près'],ans:1,hint:'Quel arc son angle intercepte-t-il ?',why:'Tous les angles inscrits qui interceptent l’arc AB sont égaux : Lina voit aussi l’écran sous 35°.'},
   {q:'c) Dans une autre salle, l’écran [AB] est un diamètre du cercle et mesure 20 m. Le spectateur M est assis sur le cercle, à 12 m de A. À quelle distance de B est-il ?',lab:'MB =',unit:'m',ans:16,hint:'Que vaut l’angle AMB quand [AB] est un diamètre ?',why:'Cercle de Thalès : AMB = 90°. Pythagore : MB² = 20² − 12² = 400 − 144 = 256, donc MB = 16 m.'},
   {q:'d) Le rayon de cette salle est donc de 10 m. Un projecteur P est placé à 26 m du centre O. Son faisceau est tangent au cercle au point T. Calcule la longueur PT.',lab:'PT =',unit:'m',ans:24,hint:'Quel angle la tangente fait-elle avec le rayon [OT] ?',why:'La tangente est perpendiculaire au rayon : OTP est rectangle en T. PT² = 26² − 10² = 676 − 100 = 576, donc PT = 24 m.'}],
  sol:'a) AMB est un angle inscrit qui intercepte le même arc que l’angle au centre AOB : AMB = 70° : 2 = 35°. b) N est sur le même arc : son angle intercepte aussi l’arc AB, il vaut 35°. Tous les spectateurs de l’arc voient l’écran sous le même angle. c) [AB] est un diamètre, donc AMB = 90° (cercle de Thalès). Dans le triangle rectangle AMB, d’hypoténuse [AB] : MB² = 400 − 144 = 256 et MB = 16 m. d) La tangente en T est perpendiculaire au rayon [OT] : le triangle OTP est rectangle en T, d’hypoténuse [OP]. PT² = 676 − 100 = 576, donc PT = 24 m.'},
]},

/* ===================== HOMOTHÉTIES ET SIMILITUDES ===================== */
{subj:'sec', sem:'a11', o:6, id:'sec11-homothetie', h:'Homothéties et similitudes', p:'Agrandir ou réduire une figure depuis un centre, avec un rapport positif ou négatif, prévoir les longueurs et les aires, et reconnaître des figures et des triangles semblables.', steps:[
 {kind:'Théorie',h:'Rappel : les isométries',p:`<p>Dans un jeu vidéo, ton personnage glisse, se retourne, fait demi-tour : il garde toujours la même taille. Ces mouvements sont des <b>isométries</b>, du grec <i>iso</i> (« même ») et <i>metron</i> (« mesure »).</p>
<div class="def"><p>Une isométrie transforme une figure sans changer ses longueurs. Tu en connais quatre : la <b>translation</b> (glisser selon une flèche), la <b>symétrie axiale</b> (retourner autour d’une droite, comme dans un miroir), la <b>symétrie centrale</b> (demi-tour autour d’un point) et la <b>rotation</b> (tourner d’un certain angle autour d’un centre).</p></div>
<div class="idea"><p>Une isométrie conserve tout : longueurs, angles, aires, parallélisme. L’image est une copie exacte, seulement placée ailleurs ou retournée.</p></div>
<div class="ex"><p>Le point A est à 3 carreaux à droite et 1 en haut de O. Par la symétrie centrale de centre O, il va à 3 carreaux à gauche et 1 en bas. Par la rotation de 90° de centre O, dans le sens inverse des aiguilles d’une montre, il va à 1 carreau à gauche et 3 en haut.</p></div>
<p>Mais comment faire grandir le personnage sans le déformer ? Aucune isométrie ne le peut. Il faut une nouvelle transformation : l’homothétie.</p>`,
  fig:(()=>{ const P=plane({x:[-4,4.5],y:[-2.4,2.4],w:320,axes:false}), L=[[0,0],[1,0],[1,.4],[.4,.4],[.4,1.4],[0,1.4]].map(p=>[p[0]+1,p[1]+.5]), O=[0,0];
    P.poly(L,{fill:'var(--accent)',fo:.4,c:'var(--accent)',w:2}); P.poly(L.map(p=>[p[0]+1.8,p[1]-2.4]),{fill:'var(--math)',fo:.3,c:'var(--math)',w:2});
    P.poly(L.map(p=>[-p[1],p[0]]),{fill:'var(--spark)',fo:.3,c:'var(--spark)',w:2}); P.poly(L.map(p=>[-p[0],-p[1]]),{fill:'var(--other)',fo:.3,c:'var(--other)',w:2});
    P.arrow(1.2,.3,3,-2.1,{c:'var(--math)',w:2,hs:9}); lab(P,O,'O',6,16);
    P.text(1,2,'départ',{s:11,dy:-4}).text(4.4,-.35,'translation',{a:'end',s:11,c:'var(--math)'}).text(-2.3,2.1,'rotation 90°',{s:11,c:'var(--spark)'}).text(-3.8,-2.1,'symétrie centrale',{s:11,c:'var(--other)'});
    return P.svg(); })()},
 {kind:'Théorie',h:'L’homothétie de rapport positif',p:`<p>Au cinéma, le projecteur envoie une petite image sur un immense écran. Avec une lampe de poche, l’ombre de ta main sur le mur grandit quand tu approches la main de la lampe. Dans les deux cas, tout part d’un point : la lampe.</p>
<div class="def"><p>Soit un point O et un nombre <i>k</i> &gt; 0. L’<b>homothétie de centre O et de rapport <i>k</i></b> envoie chaque point M sur le point M′ de la demi-droite [OM) tel que <b>OM′ = <i>k</i> × OM</b>. Le point M′ est l’<b>image</b> de M.</p></div>
<div class="idea"><p>Le centre O joue le rôle de la lampe. Les rayons partent de O, passent par M et continuent jusqu’à M′. Si <i>k</i> &gt; 1, l’image est plus loin : c’est un <b>agrandissement</b>. Si <i>k</i> est entre 0 et 1, elle est plus près : c’est une <b>réduction</b>. Si <i>k</i> = 1, rien ne bouge. Le centre O est toujours sa propre image.</p></div>
<div class="ex"><p>Centre O, rapport 3. Si OA = 2 cm, alors OA′ = 3 × 2 = 6 cm, sur la demi-droite [OA). Avec le rapport 0,5 : OA′ = 0,5 × 2 = 1 cm, à mi-chemin entre O et A.</p></div>
<p>Bouge le curseur <i>k</i> et observe le triangle image A′B′C′.</p>`,
  params:[{id:'k',l:'Rapport k',min:.5,max:3,step:.25,v:2}],
  draw:v=>{ const P=G([-4.5,2.5],[-2.5,3]), O=[-4,-2], T=[[-3,-1.5],[-2,-1.5],[-2.5,-.5]], I=T.map(p=>img(O,p,v.k));
    T.forEach((p,i)=>{ const q=I[i], far=dist(O,p)>dist(O,q)?p:q; sg(P,O,far,{c:'var(--muted)',w:1.2,dash:true}); });
    triTo(P,T,{fill:'var(--accent)',fo:.35,c:'var(--accent)'}); triTo(P,I,{fill:'var(--spark)',fo:.25,c:'var(--spark)'});
    lab(P,O,'O',-14,14); ['A','B','C'].forEach((s,i)=>{ P.text(T[i][0],T[i][1],s,{dx:-12,dy:14,s:12}); P.text(I[i][0],I[i][1],s+'′',{dx:5,dy:-5,s:12,c:'var(--spark)'}); });
    return P.svg(); },
  info:v=>`<i>k</i> = ${fmt(v.k)} : ${v.k>1?'agrandissement':v.k<1?'réduction':'la figure ne bouge pas'}. OA′ = ${fmt(v.k)} × OA. AB = 1 carreau, donc A′B′ = ${fmt(v.k)} carreau${v.k>=2?'x':''}.`},
 {kind:'Théorie',h:'L’homothétie de rapport négatif',p:`<p>Dans une chambre noire, une boîte percée d’un petit trou, l’image d’un arbre apparaît sur le fond… à l’envers ! Les rayons de lumière se croisent dans le trou : l’image se forme de l’autre côté du centre.</p>
<div class="def"><p>Si le rapport <i>k</i> est <b>négatif</b>, l’image M′ est sur la droite (OM), mais <b>de l’autre côté de O</b>, avec OM′ = |<i>k</i>| × OM. Le symbole |<i>k</i>| se lit « valeur absolue de <i>k</i> » : c’est le nombre sans son signe. Par exemple |−3| = 3 et |2| = 2.</p></div>
<div class="idea"><p>Une homothétie de rapport négatif fait deux choses à la fois : un agrandissement (ou une réduction) et un demi-tour autour de O. Avec <i>k</i> = −1, il ne reste que le demi-tour : c’est la <b>symétrie centrale</b> de centre O.</p></div>
<div class="ex"><p>Centre O, rapport −2. Si OA = 3 cm, A′ est de l’autre côté de O, avec OA′ = 2 × 3 = 6 cm. Avec <i>k</i> = −0,5 : OA′ = 0,5 × 3 = 1,5 cm, toujours de l’autre côté.</p></div>
<div class="warn"><p>Le rapport <i>k</i> = 0 n’est pas permis : tous les points iraient sur O.</p></div>`,
  params:[{id:'k',l:'Rapport k',min:-3,max:3,step:.25,v:-1.5}],
  draw:v=>{ const P=G([-5.2,5.2],[-3.6,3.6]), O=[0,0], T=[[.8,.3],[1.6,.3],[1.2,1.1]], I=T.map(p=>img(O,p,v.k));
    T.forEach(p=>line(P,O,p,{c:'var(--line)',w:1.2},8));
    triTo(P,T,{fill:'var(--accent)',fo:.35,c:'var(--accent)'}); if(v.k!==0) triTo(P,I,{fill:'var(--spark)',fo:.25,c:'var(--spark)'});
    lab(P,O,'O',-6,18); ['A','B','C'].forEach((s,i)=>{ P.text(T[i][0],T[i][1],s,{dx:4,dy:-5,s:12}); if(v.k!==0) P.text(I[i][0],I[i][1],s+'′',{dx:5,dy:-5,s:12,c:'var(--spark)'}); });
    return P.svg(); },
  info:v=>v.k===0?'<i>k</i> = 0 n’est pas permis : toute la figure s’écraserait sur O.':`<i>k</i> = ${fmt(v.k)} : l’image est ${v.k<0?'<b>de l’autre côté</b> de O, retournée,':'du même côté que la figure,'} et ses longueurs sont multipliées par |<i>k</i>| = ${fmt(Math.abs(v.k))}.${v.k===-1?' C’est la symétrie centrale.':''}`},
 {kind:'Méthode',h:'Construire l’image d’une figure',p:`<b>Quand :</b> on donne le centre O, le rapport <i>k</i> et une figure, et on veut dessiner l’image. <b>Pourquoi ça marche :</b> l’image d’un polygone est le polygone formé par les images de ses sommets ; il suffit donc de placer quelques points. <b>Comment :</b> pour chaque sommet M, trace la droite (OM). Mesure OM, calcule |<i>k</i>| × OM et reporte cette longueur depuis O : du côté de M si <i>k</i> &gt; 0, de l’autre côté si <i>k</i> &lt; 0. Sur un quadrillage, c’est plus simple : si M est à <i>a</i> carreaux à droite et <i>b</i> carreaux en haut de O, alors M′ est à <i>k</i> × <i>a</i> à droite et <i>k</i> × <i>b</i> en haut (un nombre négatif veut dire à gauche ou en bas).`,
  demo:{enonce:'Sur le quadrillage, A est à 2 carreaux à droite et 1 carreau en haut de O. Place l’image A₁ de A par l’homothétie de centre O et de rapport 3, puis l’image A₂ par celle de rapport −2.',
   etapes:[
    {f:'Déplacement de O vers A : (2 ; 1)',w:'On compte les carreaux : 2 à droite, 1 en haut.'},
    {f:'Rapport 3 : (3 × 2 ; 3 × 1) = (6 ; 3)',w:'On multiplie chaque déplacement par <i>k</i>.'},
    {f:'A₁ est à 6 carreaux à droite et 3 en haut de O',w:'Contrôle : A₁ est sur la demi-droite [OA), 3 fois plus loin que A.'},
    {f:'Rapport −2 : (−2 × 2 ; −2 × 1) = (−4 ; −2)',w:'Les nombres négatifs veulent dire à gauche et en bas : A₂ est de l’autre côté de O.'},
    {f:'Pour un triangle, on refait ce calcul pour chaque sommet, puis on relie les images',w:'L’image d’un segment est un segment : relier les sommets suffit.'}],
   conclusion:'A₁ est à (6 ; 3) depuis O et A₂ à (−4 ; −2). Les points A₂, O, A et A₁ sont alignés.'},
  note:'Pour retrouver le rapport à partir d’un point et de son image : |<i>k</i>| = OM′ : OM, puis le signe dit de quel côté de O se trouve M′ (+ du même côté, − de l’autre côté).',
  fig:(()=>{ const P=plane({x:[-5,7],y:[-3,4],w:320,axes:false}); const O=[0,0], A=[2,1];
    line(P,[-4,-2],[6,3],{c:'var(--line)',w:1.5},1); lab(P,O,'O',-6,16); lab(P,A,'A',-4,-8,'var(--accent)'); lab(P,[6,3],'A₁',-20,-6,'var(--spark)'); lab(P,[-4,-2],'A₂',6,14,'var(--math)'); return P.svg(); })()},
 {kind:'Pratique',h:'Place l’image du point',p:'Place le point A′, image de A par l’homothétie de centre O et de rapport −2. Règle ses coordonnées <i>x</i> et <i>y</i>.',
  params:[{id:'x',l:'x de A′',min:-5,max:5,v:3},{id:'y',l:'y de A′',min:-5,max:4,v:3}],
  draw:v=>{ const P=plane({x:[-5.5,5.5],y:[-5.5,4.5],w:320,lab:1}); const O=[1,0], A=[2,2];
    line(P,O,A,{c:'var(--line)',w:1.5,dash:true}); lab(P,O,'O',6,16); lab(P,A,'A',6,-6,'var(--accent)'); lab(P,[v.x,v.y],'A′',6,-6,'var(--spark)'); return P.svg(); },
  info:v=>`A′(${v.x} ; ${v.y}). Depuis O(1 ; 0), A est à 1 carreau à droite et 2 en haut.`,
  ok:v=>v.x===-1&&v.y===-4,why:'De O à A : 1 à droite et 2 en haut. On multiplie par −2 : 2 à gauche et 4 en bas. Depuis O(1 ; 0), on arrive en A′(−1 ; −4).'},
 {kind:'Question',h:'Trouver le rapport',p:'A′ est l’image de A par une homothétie de centre O. OA = 4 cm, OA′ = 10 cm, et O est entre A et A′. Quel est le rapport <i>k</i> ?',
  fig:(()=>{ const P=G([-3,5.5],[-.8,.8]), A=[-2,0], O=[0,0], A1=[5,0]; sg(P,A,A1,{c:'var(--muted)',w:1.5}); lab(P,A,'A',-4,-8,'var(--accent)'); lab(P,O,'O',-4,-8); lab(P,A1,'A′',-14,-8,'var(--spark)');
    tl(P,A,O,'4 cm',0,18); tl(P,O,A1,'10 cm',0,18); return P.svg(); })(),
  opts:['2,5','−2,5','0,4','−0,4'],ans:1,why:'OA′ : OA = 10 : 4 = 2,5, donc |<i>k</i>| = 2,5. Comme A et A′ sont de part et d’autre de O, le rapport est négatif : <i>k</i> = −2,5.'},
 {kind:'Théorie',h:'Ce que l’homothétie conserve',p:`<p>Sur ton téléphone, tu écartes deux doigts pour zoomer sur une photo : le visage grandit, mais il ne se déforme pas. Qu’est-ce qui change, qu’est-ce qui reste ?</p>
<div class="prop"><p>Une homothétie de rapport <i>k</i> <b>multiplie les longueurs par |<i>k</i>|</b> (et donc aussi les périmètres). Elle <b>conserve les angles</b>, l’alignement et les milieux. Elle transforme un segment en un segment <b>parallèle</b>.</p></div>
<div class="why"><p>Sur un quadrillage, aller de A à B demande <i>a</i> carreaux à droite et <i>b</i> en haut. Aller de A′ à B′ en demande <i>k</i> × <i>a</i> et <i>k</i> × <i>b</i> : même direction, donc (A′B′) ∥ (AB). Par Pythagore, AB = √(<i>a</i>² + <i>b</i>²) et A′B′ = √(<i>k</i>²<i>a</i>² + <i>k</i>²<i>b</i>²) = |<i>k</i>| × AB. Les côtés restent parallèles, donc les angles sont égaux (ce sont des angles correspondants).</p></div>
<div class="ex"><p>Un triangle de côtés 3, 4 et 5 cm, rapport −2 : l’image a des côtés de 6, 8 et 10 cm, et un périmètre de 24 cm au lieu de 12 cm. Ses angles sont les mêmes.</p></div>
<div class="warn"><p>Avec <i>k</i> = −2, les longueurs sont multipliées par 2, pas par −2 : une longueur n’est jamais négative.</p></div>`,
  fig:(()=>{ const P=G([-4.3,.4],[-2.3,1.5]), O=[-4,-2], T=[[-3.5,-1.6],[-2.7,-1.6],[-3.2,-1]], I=T.map(p=>img(O,p,3));
    I.forEach(p=>sg(P,O,p,{c:'var(--muted)',w:1.2,dash:true})); triTo(P,T,{fill:'var(--accent)',fo:.35,c:'var(--accent)'}); triTo(P,I,{fill:'var(--spark)',fo:.2,c:'var(--spark)'});
    lab(P,O,'O',-14,14); ['A','B','C'].forEach((s,i)=>{ P.text(T[i][0],T[i][1],s,{dx:-12,dy:14,s:12}); P.text(I[i][0],I[i][1],s+'′',{dx:5,dy:-5,s:12,c:'var(--spark)'}); });
    tl(P,T[0],T[1],'0,8',0,14,'var(--accent)'); tl(P,I[0],I[1],'2,4',0,14,'var(--spark)'); P.text(-4.1,1.3,'k = 3 : (A′B′) ∥ (AB) et A′B′ = 3 × AB',{s:11,c:'var(--muted)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Les aires sont multipliées par k²',p:`<p>Tu commandes une pizza de diamètre double. Combien de fois plus de pizza ? Pas 2 fois : 4 fois ! Les aires ne suivent pas les longueurs.</p>
<div class="prop"><p>Une homothétie de rapport <i>k</i> multiplie les <b>aires par <i>k</i>²</b>.</p></div>
<div class="why"><p>Un carré de côté 1 devient un carré de côté |<i>k</i>|, d’aire <i>k</i>². Un rectangle de côtés <i>a</i> et <i>b</i> devient un rectangle de côtés |<i>k</i>| × <i>a</i> et |<i>k</i>| × <i>b</i>, d’aire <i>k</i>² × <i>ab</i>. Toute figure peut être découpée en très petits carrés : chacun est multiplié par <i>k</i>², donc l’aire totale aussi.</p></div>
<div class="ex"><p>Un triangle de 6 cm², rapport 3 : 6 × 3² = 6 × 9 = 54 cm². Rapport 0,5 : 6 × 0,25 = 1,5 cm². Rapport −2 : 6 × (−2)² = 6 × 4 = 24 cm².</p></div>
<div class="warn"><p>Erreur classique : multiplier l’aire par <i>k</i>. Et les volumes ? Ils sont multipliés par |<i>k</i>|³ : un cube d’arête double contient 8 petits cubes.</p></div>`,
  params:[{id:'k',l:'Rapport k',min:1,max:5,v:2}],
  draw:v=>{ const P=G([-.5,7],[-.5,5.5]);
    P.rect(0,0,1,1,{fill:'var(--accent)',fo:.45,c:'var(--accent)',w:2}); P.text(.5,1,'1',{a:'middle',dy:-6,s:12});
    for(let i=0;i<v.k;i++) for(let j=0;j<v.k;j++) P.rect(1.5+i,j,1,1,{fill:(i+j)%2?'var(--spark)':'var(--accent)',fo:.3,c:'var(--ink)',w:1});
    P.rect(1.5,0,v.k,v.k,{c:'var(--ink)',w:2.5}); P.text(1.5+v.k/2,v.k,`${v.k}`,{a:'middle',dy:-6,s:12}); return P.svg(); },
  info:v=>`Côté × ${v.k}, aire × ${v.k}² = ${v.k*v.k} : le grand carré contient ${v.k*v.k} petit${v.k>1?'s':''} carré${v.k>1?'s':''}.`},
 {kind:'Méthode',h:'Calculer avec le rapport k',p:`<b>Quand :</b> deux figures se correspondent par une homothétie (ou un agrandissement), et il manque une longueur ou une aire. <b>Pourquoi ça marche :</b> toutes les longueurs sont multipliées par le même nombre |<i>k</i>|, et toutes les aires par <i>k</i>². <b>Comment :</b> 1) trouve |<i>k</i>| avec une paire de longueurs qui se correspondent : |<i>k</i>| = longueur image : longueur de départ ; 2) multiplie les autres longueurs par |<i>k</i>| ; 3) multiplie les aires par <i>k</i>² ; 4) si tu connais le rapport des aires, |<i>k</i>| en est la racine carrée.`,
  demo:{enonce:'Un triangle a un côté de 4 cm, un autre de 10 cm et une aire de 12 cm². Par une homothétie, le côté de 4 cm devient 6 cm. Calcule le côté qui correspond à 10 cm et l’aire de l’image.',
   etapes:[
    {f:'|<i>k</i>| = 6 : 4 = 1,5',w:'6 cm est l’image de 4 cm.'},
    {f:'10 × 1,5 = 15 cm',w:'Toutes les longueurs sont multipliées par 1,5.'},
    {f:'<i>k</i>² = 1,5² = 2,25',w:'Pour les aires, on utilise le carré du rapport.'},
    {f:'12 × 2,25 = 27 cm²',w:'On multiplie l’aire de départ par <i>k</i>².'},
    {f:'Dans l’autre sens : aires de 5 cm² et 45 cm², 45 : 5 = 9, donc |<i>k</i>| = √9 = 3',w:'Quand on part des aires, on prend la racine carrée de leur rapport.'}],
   conclusion:'Le côté mesure 15 cm et l’image a une aire de 27 cm².'}},
 {kind:'Question',h:'L’aire du logo',p:'Un logo de 5 cm² est transformé par une homothétie de rapport −3. Quelle est l’aire de l’image ?',lab:'aire =',unit:'cm²',ans:45,why:'Les aires sont multipliées par <i>k</i>² = (−3)² = 9 : 5 × 9 = 45 cm². Une aire n’est jamais négative.'},
 {kind:'Théorie',h:'Figures semblables et similitudes',p:`<p>Une figurine de collection est la copie exacte d’un héros de film, en plus petit. Une photo agrandie, puis tournée pour entrer dans un cadre, garde la même forme. On dit que ces figures sont semblables.</p>
<div class="def"><p>Une <b>similitude</b> est une homothétie suivie (ou non) d’une isométrie. Deux figures sont <b>semblables</b> si une similitude transforme l’une en l’autre. Le nombre positif par lequel on multiplie les longueurs est le <b>rapport de similitude</b>.</p></div>
<div class="idea"><p>Deux figures semblables ont la même forme : leurs angles sont égaux deux à deux et leurs longueurs sont proportionnelles. Seules la taille, la position et l’orientation peuvent changer.</p></div>
<div class="ex"><p>Un rectangle de 2 cm sur 3 cm et un rectangle de 6 cm sur 4 cm sont semblables : 4 : 2 = 2 et 6 : 3 = 2, rapport 2 (le second est tourné d’un quart de tour). Un rectangle de 3 cm sur 4 cm n’est pas semblable au premier : 3 : 2 = 1,5 mais 4 : 3 ≈ 1,33.</p></div>
${sdx}<p>Une feuille A4 pliée en deux donne une feuille A5, <b>semblable</b> à la feuille A4. C’est voulu : pour chaque format, longueur : largeur vaut environ 1,414, c’est-à-dire √2. Une feuille A0 a une aire de 1 m², et chaque format suivant en est la moitié.</p></div>`,
  fig:(()=>{ const P=G([-.3,12],[-.3,5]);
    P.rect(0,0,2,3,{fill:'var(--accent)',fo:.35,c:'var(--accent)'}).rect(2.8,0,6,4,{fill:'var(--accent)',fo:.2,c:'var(--accent)'}).rect(9.6,0,2.2,3,{fill:'var(--bad)',fo:.15,c:'var(--bad)'});
    P.text(1,3,'2 × 3',{a:'middle',dy:-6,s:11}).text(5.8,4,'6 × 4 : semblable',{a:'middle',dy:-6,s:11,c:'var(--accent)'}).text(10.7,3,'3 × 4 : non',{a:'middle',dy:-6,s:11,c:'var(--bad)'});
    return P.svg(); })()},
 {kind:'Théorie',h:'Triangles semblables',p:`<p>Pour savoir si deux polygones sont semblables, il faut en général vérifier tous leurs angles et toutes leurs longueurs. Pour les triangles, c’est bien plus rapide.</p>
<div class="thm"><p>Si deux triangles ont <b>deux angles égaux</b> deux à deux, alors ils sont <b>semblables</b>. Leurs côtés correspondants sont alors proportionnels.</p></div>
<div class="why"><p>La somme des angles d’un triangle vaut 180° : si deux angles sont égaux, le troisième aussi. Pose le petit triangle dans un coin du grand (c’est une isométrie), pour qu’ils partagent le même angle en A. Les angles en B sont égaux et ce sont des angles correspondants : les troisièmes côtés sont donc parallèles (réciproque du théorème de la transversale). Une homothétie de centre A envoie alors le petit triangle sur le grand.</p></div>
<div class="ex"><p>Un triangle a des angles de 50° et 60°. Un autre a des angles de 70° et 50°. Le troisième angle du premier vaut 180° − 50° − 60° = 70° : les deux triangles ont des angles de 50° et 70°, ils sont semblables.</p></div>
<div class="warn"><p>Les côtés <b>correspondants</b> sont ceux qui sont <b>opposés aux angles égaux</b>, pas forcément ceux qui sont dessinés au même endroit.</p></div>`,
  fig:(()=>{ const P=G([-.3,10],[-.3,4]), T1=triAng([0,0],3,50,70), T2=triAng([9.6,.2],4.5,70,50,180,-1);
    triTo(P,T1,{fill:'var(--accent)',fo:.25,c:'var(--accent)'}); triTo(P,T2,{fill:'var(--spark)',fo:.2,c:'var(--spark)'});
    ang(P,T1[0],T1[1],T1[2],{c:'var(--ink)',r:.5,l:'50°'}); ang(P,T1[1],T1[0],T1[2],{c:'var(--ink)',r:.5,l:'70°'});
    ang(P,T2[0],T2[1],T2[2],{c:'var(--ink)',r:.5,l:'70°'}); ang(P,T2[1],T2[0],T2[2],{c:'var(--ink)',r:.5,l:'50°'}); return P.svg(); })()},
 {kind:'Méthode',h:'Calculer une longueur dans des triangles semblables',p:`<b>Quand :</b> deux triangles ont deux angles égaux, souvent à cause de parallèles, d’angles droits ou d’angles opposés par le sommet. <b>Pourquoi ça marche :</b> ils sont semblables, donc leurs côtés correspondants sont proportionnels. <b>Comment :</b> 1) justifie les deux angles égaux ; 2) associe les côtés correspondants (opposés aux angles égaux) ; 3) calcule le rapport avec une paire connue ; 4) applique-le au côté cherché. Présente ta réponse : une phrase, le calcul, la réponse avec l’unité.`,
  demo:{enonce:'Au même moment, un bâton vertical de 1 m fait une ombre de 1,5 m, et un arbre fait une ombre de 12 m. Quelle est la hauteur de l’arbre ?',
   etapes:[
    {f:'Les deux triangles ont un angle droit, au pied du bâton et au pied de l’arbre',w:'Le bâton et l’arbre sont verticaux, le sol est horizontal.'},
    {f:'Ils ont le même angle au bout de l’ombre',w:'Les rayons du Soleil sont parallèles : ils font le même angle avec le sol (angles correspondants).'},
    {f:'Rapport : 12 : 1,5 = 8',w:'L’ombre de l’arbre correspond à l’ombre du bâton.'},
    {f:'Hauteur : 1 × 8 = 8 m',w:'La hauteur de l’arbre correspond à celle du bâton.'}],
   conclusion:'Les deux triangles sont semblables, de rapport 8 : l’arbre mesure 8 m.'},
  fig:(()=>{ const P=G([-1,17],[-1.3,9]);
    P.seg(-1,0,17,0,{c:'var(--ink)',w:2}); sg(P,[0,0],[0,1],{c:'var(--accent)',w:4}); sg(P,[0,1],[1.5,0],{c:'var(--spark)',w:1.5,dash:true}); sg(P,[0,0],[1.5,0],{c:'var(--muted)',w:4});
    sg(P,[4,0],[4,8],{c:'var(--ok)',w:5}); sg(P,[4,8],[16,0],{c:'var(--spark)',w:1.5,dash:true}); sg(P,[4,0],[16,0],{c:'var(--muted)',w:4});
    P.text(0,1,'1 m',{a:'middle',dy:-6,s:11}).text(.75,0,'1,5 m',{a:'middle',dy:14,s:11}).text(4,4,'?',{dx:-14,s:13}).text(10,0,'12 m',{a:'middle',dy:14,s:11}); return P.svg(); })()},
 {kind:'Question',h:'Le côté qui manque',p:'Les triangles ABC et DEF ont les angles marqués égaux : l’angle en A est égal à l’angle en D, et l’angle en B est égal à l’angle en E. AB = 4 cm, BC = 6 cm, AC = 5 cm et DE = 6 cm. Combien mesure EF ?',
  fig:(()=>{ const P=G([-.5,13],[-.9,8.6]), T1=triCotes([0,0],4,5,6), T2=triCotes([5.5,0],6,7.5,9);
    triTo(P,T1,{fill:'var(--accent)',fo:.25,c:'var(--accent)'}); triTo(P,T2,{fill:'var(--spark)',fo:.2,c:'var(--spark)'});
    [[T1,['A','B','C']],[T2,['D','E','F']]].forEach(([T,n])=>{ ang(P,T[0],T[1],T[2],{c:'var(--ink)',r:.55}); ang(P,T[1],T[0],T[2],{c:'var(--ink)',r:.5}); ang(P,T[1],T[0],T[2],{c:'var(--ink)',r:.62});
      P.text(T[0][0],T[0][1],n[0],{dx:-12,dy:12}).text(T[1][0],T[1][1],n[1],{dx:4,dy:12}).text(T[2][0],T[2][1],n[2],{dx:4,dy:-6}); });
    tl(P,T1[0],T1[1],'4',0,14); tl(P,T1[1],T1[2],'6',10,0); tl(P,T1[0],T1[2],'5',-10,0); tl(P,T2[0],T2[1],'6',0,14); tl(P,T2[1],T2[2],'?',12,0); return P.svg(); })(),
  lab:'EF =',unit:'cm',ans:9,why:'Les triangles ont deux angles égaux : ils sont semblables. DE correspond à AB : le rapport vaut 6 : 4 = 1,5. EF correspond à BC : EF = 6 × 1,5 = 9 cm.'},
 {kind:'Défi',h:'Des triangles dans le triangle',p:'Un triangle équilatéral de 5 cm de côté est découpé en petits triangles équilatéraux de 1 cm de côté, comme sur la figure pour les côtés 1, 2 et 3 cm. Combien y a-t-il de petits triangles ?',
  fig:(()=>{ const P=G([-.3,10.3],[-.8,3]), h=Math.sqrt(3)/2;
    [[0,1],[1.6,2],[4.8,3]].forEach(([x0,n])=>{ for(let r=0;r<n;r++) for(let i=0;i<n-r;i++){ const x=x0+i+r/2, y=r*h;
      P.poly([[x,y],[x+1,y],[x+.5,y+h]],{fill:'var(--accent)',fo:.3,c:'var(--ink)',w:1}); if(i<n-r-1) P.poly([[x+1,y],[x+1.5,y+h],[x+.5,y+h]],{fill:'var(--spark)',fo:.25,c:'var(--ink)',w:1}); } });
    P.text(.5,0,'1',{a:'middle',dy:14,s:11}).text(2.6,0,'4',{a:'middle',dy:14,s:11}).text(6.3,0,'9',{a:'middle',dy:14,s:11}).text(9,1,'côté 5 : ?',{a:'middle',s:12}); return P.svg(); })(),
  lab:'nombre =',ans:25,why:'Commence par les cas simples : côté 1 : 1 triangle, côté 2 : 4, côté 3 : 9. Le grand triangle est l’image du petit par une homothétie de rapport 5 : les aires sont multipliées par 5² = 25, donc il contient 25 petits triangles. Stratégie : commencer par un cas plus simple et chercher la régularité.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Une homothétie agrandit ou réduit une figure à partir d’un centre, sans la déformer.</p><div class="keep"><ul>
<li><b>Isométries</b> (translation, symétries, rotation) : elles conservent les longueurs, les angles et les aires.</li>
<li><b>Homothétie de centre O et de rapport <i>k</i></b> : M′ est sur la droite (OM), avec OM′ = |<i>k</i>| × OM ; du même côté que M si <i>k</i> &gt; 0, de l’autre côté si <i>k</i> &lt; 0. <i>k</i> = −1 donne la symétrie centrale.</li>
<li><b>Construire</b> : image de chaque sommet ; sur un quadrillage, on multiplie les déplacements depuis O par <i>k</i>.</li>
<li><b>Longueurs</b> × |<i>k</i>|, <b>aires</b> × <i>k</i>², volumes × |<i>k</i>|³ ; les angles et le parallélisme sont conservés.</li>
<li><b>Similitude</b> = homothétie puis isométrie. Figures <b>semblables</b> : mêmes angles, longueurs proportionnelles.</li>
<li><b>Triangles semblables</b> : deux angles égaux suffisent. Les côtés correspondants sont opposés aux angles égaux.</li></ul></div>`},
 {kind:'Problème',h:'Le poster de vacances',p:'Mia veut transformer sa photo de vacances en poster, sans la déformer. La photo mesure 10 cm de large et 15 cm de haut. Le poster doit mesurer 50 cm de large. L’imprimeur facture 40 CHF par mètre carré de poster.',
  fig:(()=>{ const P=G([-1.7,8.5],[-.8,8]); P.rect(0,0,1,1.5,{fill:'var(--accent)',fo:.4,c:'var(--accent)'}).rect(2.5,0,5,7.5,{fill:'var(--spark)',fo:.15,c:'var(--spark)'});
    P.text(.5,0,'10 cm',{a:'middle',dy:14,s:11}).text(0,.75,'15 cm',{a:'end',dx:-3,s:11}).text(5,0,'50 cm',{a:'middle',dy:14,s:11}).text(2.5,3.75,'?',{a:'end',dx:-4,s:13}); return P.svg(); })(),
  parts:[
   {q:'a) Quel est le rapport d’agrandissement <i>k</i> ?',lab:'k =',ans:5,hint:'Compare les deux largeurs.',why:'<i>k</i> = 50 : 10 = 5.'},
   {q:'b) Quelle est la hauteur du poster ?',lab:'hauteur =',unit:'cm',ans:75,hint:'Toutes les longueurs sont multipliées par <i>k</i>.',why:'15 × 5 = 75 cm.'},
   {q:'c) Par combien l’aire de la photo est-elle multipliée ?',lab:'×',ans:25,hint:'Les aires ne sont pas multipliées par <i>k</i>.',why:'Les aires sont multipliées par <i>k</i>² = 5² = 25. Contrôle : 150 cm² × 25 = 3750 cm² = 50 × 75.'},
   {q:'d) Combien coûte l’impression du poster ?',lab:'prix =',unit:'CHF',ans:15,hint:'Calcule l’aire en cm², puis convertis-la en m² (1 m² = 10 000 cm²).',why:'50 × 75 = 3750 cm² = 0,375 m². Prix : 0,375 × 40 = 15 CHF.'}],
  sol:'Le poster est un agrandissement de la photo. a) Le rapport est <i>k</i> = 50 : 10 = 5. b) La hauteur est multipliée par 5 : 15 × 5 = 75 cm. c) Les aires sont multipliées par <i>k</i>² = 25 : la photo mesure 10 × 15 = 150 cm² et le poster 150 × 25 = 3750 cm². d) 3750 cm² = 0,375 m², donc l’impression coûte 0,375 × 40 = 15 CHF.'},
 {kind:'Problème',h:'La chambre noire',p:'Léo fabrique une chambre noire : une boîte percée d’un petit trou O sur une face. L’image d’un arbre se forme sur la face opposée, à 20 cm du trou. L’arbre mesure 9 m de haut et se trouve à 30 m du trou. Tous les rayons lumineux passent par O : l’image est l’image de l’arbre par une homothétie de centre O.',
  fig:(()=>{ const P=G([-7.5,3.8],[-2.2,2.6]), O=[0,0], k=-2.2/7, T1=[-7,2.2], T0=[-7,-1.6], I1=img(O,T1,k), I0=img(O,T0,k);
    sg(P,T0,T1,{c:'var(--ok)',w:5}); P.rect(0,-1.2,2.2,2.4,{c:'var(--muted)',w:2}); sg(P,I0,I1,{c:'var(--spark)',w:4});
    sg(P,T1,I1,{c:'var(--accent)',w:1.2,dash:true}); sg(P,T0,I0,{c:'var(--accent)',w:1.2,dash:true}); lab(P,O,'O',-6,-8);
    P.text(-7,2.2,'arbre 9 m',{dx:6,s:11}).text(-3.5,-1.6,'30 m',{a:'middle',dy:14,s:11}).text(1.1,-1.2,'20 cm',{a:'middle',dy:14,s:11}).text(2.2,.3,'image',{dx:4,s:11,c:'var(--spark)'}); return P.svg(); })(),
  parts:[
   {q:'a) Le rapport de cette homothétie est-il positif ou négatif ?',opts:['Positif, car l’image est plus petite que l’arbre','Négatif, car l’image est de l’autre côté de O, à l’envers','Positif, car les longueurs sont toujours positives','Nul, car l’image est minuscule'],ans:1,hint:'De quel côté du centre O se forme l’image ?',why:'L’arbre et son image sont de part et d’autre du centre O : le rapport est négatif. C’est pour ça que l’image est à l’envers.'},
   {q:'b) Par combien les longueurs sont-elles divisées ?',lab:'divisées par',ans:150,hint:'Compare les distances au trou dans la même unité : convertis 30 m en centimètres.',why:'30 m = 3000 cm et 3000 : 20 = 150. Donc |<i>k</i>| = 1/150.'},
   {q:'c) Quelle est la hauteur de l’image de l’arbre ?',lab:'hauteur =',unit:'cm',ans:6,hint:'Convertis 9 m en centimètres.',why:'9 m = 900 cm et 900 : 150 = 6 cm.'},
   {q:'d) Léo s’éloigne de l’arbre jusqu’à ce que l’image mesure 4 cm. À quelle distance du trou se trouve maintenant l’arbre ?',lab:'distance =',unit:'m',ans:45,hint:'Calcule d’abord par combien les longueurs sont maintenant divisées, en comparant 900 cm et 4 cm.',why:'900 : 4 = 225 : les longueurs sont divisées par 225. La distance de l’arbre au trou vaut 20 × 225 = 4500 cm = 45 m.'}],
  sol:'a) L’image se forme de l’autre côté du centre O : le rapport est négatif, et l’image est retournée. b) Distances au trou : 3000 cm pour l’arbre et 20 cm pour l’image, donc |<i>k</i>| = 20/3000 = 1/150 : les longueurs sont divisées par 150. c) Hauteur de l’image : 900 : 150 = 6 cm. d) Pour une image de 4 cm, |<i>k</i>| = 4/900 = 1/225. La boîte ne change pas (20 cm), donc l’arbre est à 20 × 225 = 4500 cm, soit 45 m du trou.'},
]},

/* ===================== THALÈS, FIGURES SEMBLABLES ET MESURES ===================== */
{subj:'sec', sem:'a11', o:8, id:'sec11-thales', h:'Thalès, figures semblables et mesures', p:'Le théorème de Thalès et sa réciproque, mesurer une hauteur inaccessible, choisir entre Thalès, Pythagore et la trigonométrie, et calculer des aires par décomposition.', steps:[
 {kind:'Théorie',h:'Le rapport de similitude',p:`<p>Comment mesurer la hauteur d’une pyramide sans grimper dessus ? Il y a plus de 2500 ans, Thalès aurait trouvé la réponse avec un simple bâton et son ombre. Son idée : des triangles semblables.</p>
<div class="def"><p>Rappel : deux triangles sont <b>semblables</b> s’ils ont la même forme, c’est-à-dire les mêmes angles. Leurs côtés correspondants sont proportionnels : on passe de l’un à l’autre en multipliant par un même nombre <i>k</i> &gt; 0, le <b>rapport de similitude</b>. Pour un agrandissement, <i>k</i> = longueur dans le grand triangle : longueur correspondante dans le petit.</p></div>
<div class="idea"><p>Range les côtés dans un tableau de proportionnalité : une ligne par triangle, une colonne par paire de côtés correspondants. Le rapport est le nombre qui fait passer d’une ligne à l’autre.</p></div>
<div class="ex"><p>Triangles de côtés 3, 4, 5 cm et 4,5, 6, 7,5 cm : 4,5 : 3 = 1,5 ; 6 : 4 = 1,5 ; 7,5 : 5 = 1,5. Ils sont semblables, de rapport 1,5. Un triangle de côtés 3, 4, 6 cm n’est pas semblable au premier : 3 : 3 = 1 mais 6 : 5 = 1,2.</p></div>
${sdx}<p>On raconte que Thalès attendit le moment de la journée où son ombre était aussi longue que sa taille. À cet instant, l’ombre de la grande pyramide, mesurée depuis le centre de sa base, était égale à sa hauteur : environ 147 m à l’époque.</p></div>`,
  fig:(()=>{ const P=G([-.5,11],[-.8,6.6]); triTo(P,[[0,0],[4,0],[0,3]],{fill:'var(--accent)',fo:.3,c:'var(--accent)'}); triTo(P,[[4.8,0],[10.8,0],[4.8,4.5]],{fill:'var(--spark)',fo:.2,c:'var(--spark)'});
    right(P,[0,0],[4,0],[0,3]); right(P,[4.8,0],[10.8,0],[4.8,4.5]);
    P.text(2,0,'4',{a:'middle',dy:14,s:11}).text(0,1.5,'3',{a:'end',dx:-3,s:11}).text(2,1.5,'5',{dx:4,dy:-4,s:11}).text(7.8,0,'6',{a:'middle',dy:14,s:11}).text(4.8,2.25,'4,5',{a:'end',dx:-3,s:11}).text(7.8,2.25,'7,5',{dx:6,dy:-4,s:11}).text(7.8,5.6,'k = 1,5',{a:'middle',s:12});
    return P.svg(); })()},
 {kind:'Théorie',h:'Le théorème de Thalès',p:`<p>Une tente a la forme d’un triangle. On veut ajouter une barre horizontale entre ses deux côtés pour y suspendre une lampe. Quelle longueur faut-il couper ? Le théorème de Thalès répond sans rien mesurer de plus.</p>
<div class="thm"><p><b>Théorème de Thalès.</b> Dans un triangle ABC, soit M un point de [AB] et N un point de [AC]. Si (MN) ∥ (BC), alors ${F('AM','AB')} = ${F('AN','AC')} = ${F('MN','BC')}.</p></div>
<div class="why"><p>La droite (AB) est une sécante des parallèles (MN) et (BC) : les angles AMN et ABC sont correspondants, donc égaux. Les triangles AMN et ABC ont aussi l’angle en A en commun. Deux angles égaux : ils sont semblables. Le petit triangle est l’image du grand par l’homothétie de centre A et de rapport AM/AB, donc les trois rapports de côtés sont égaux.</p></div>
<div class="ex"><p>AB = 6 m, AM = 2 m et BC = 4,5 m. Alors ${F('AM','AB')} = ${F(2,6)} = ${F(1,3)}, donc MN = 4,5 : 3 = 1,5 m.</p></div>
<div class="warn"><p>Les trois rapports comparent toujours le <b>petit triangle</b> AMN au <b>grand triangle</b> ABC. MB n’est pas un côté du petit triangle !</p></div>`,
  params:[{id:'t',l:'Position de M sur [AB]',min:.1,max:.9,step:.1,v:.4}],
  draw:v=>thalesTri(v.t).P.svg(),
  info:v=>{ const f=thalesTri(v.t); return `AM/AB = ${r2(dist(f.A,f.M))} : ${r2(dist(f.A,f.B))} = ${r2(v.t)} ; AN/AC = ${r2(dist(f.A,f.N))} : ${r2(dist(f.A,f.C))} = ${r2(v.t)} ; MN/BC = ${r2(dist(f.M,f.N))} : ${r2(dist(f.B,f.C))} = ${r2(v.t)}.`; }},
 {kind:'Théorie',h:'La configuration papillon',p:`<p>Deux routes droites se croisent en A. Deux ponts parallèles relient ces routes, l’un avant le carrefour, l’autre après. La figure ressemble à un nœud papillon, et Thalès marche encore.</p>
<div class="thm"><p><b>Configuration papillon.</b> Les droites (BM) et (CN) se coupent en A, avec A entre B et M, et A entre C et N. Si (MN) ∥ (BC), alors ${F('AM','AB')} = ${F('AN','AC')} = ${F('MN','BC')}.</p></div>
<div class="why"><p>Les angles en A sont opposés par le sommet, donc égaux. Les angles AMN et ABC sont alternes-internes, donc égaux car (MN) ∥ (BC). Les triangles AMN et ABC ont deux angles égaux : ils sont semblables. Ici, le petit triangle est l’image du grand par une homothétie de centre A et de rapport <b>négatif</b> : il est de l’autre côté de A, retourné.</p></div>
<div class="ex"><p>AB = 8, AM = 2 et BC = 6. Alors ${F('AM','AB')} = ${F(2,8)} = 0,25 et MN = 6 × 0,25 = 1,5.</p></div>
<p>Bouge le curseur : le triangle AMN grandit ou rapetisse, mais les trois rapports restent égaux entre eux.</p>`,
  params:[{id:'t',l:'Rapport AM/AB',min:.2,max:1.2,step:.1,v:.5}],
  draw:v=>papillon(v.t).P.svg(),
  info:v=>{ const f=papillon(v.t); return `AM/AB = ${r2(dist(f.A,f.M))} : ${r2(dist(f.A,f.B))} = ${r2(v.t)} ; AN/AC = ${r2(dist(f.A,f.N))} : ${r2(dist(f.A,f.C))} = ${r2(v.t)} ; MN/BC = ${r2(dist(f.M,f.N))} : ${r2(dist(f.B,f.C))} = ${r2(v.t)}.`; }},
 {kind:'Méthode',h:'Appliquer le théorème de Thalès',p:`<b>Quand :</b> deux droites parallèles coupent deux droites qui se croisent en un point A (configuration triangle ou papillon), et on cherche une longueur. <b>Pourquoi ça marche :</b> les deux triangles sont semblables, leurs côtés correspondants sont proportionnels. <b>Comment :</b> 1) écris les parallèles et le point commun A ; 2) écris les trois rapports, petit triangle en haut, grand triangle en bas, chaque côté commençant par A ; 3) remplace par les longueurs connues ; 4) garde l’égalité de deux rapports qui contient l’inconnue et résous-la par produit en croix (${F('a','b')} = ${F('c','d')} donne <i>a</i> × <i>d</i> = <i>b</i> × <i>c</i>) ; 5) termine par une phrase, avec l’unité.`,
  demo:{enonce:'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC], avec (MN) ∥ (BC). AM = 3 cm, AB = 5 cm, AN = 2,4 cm et BC = 7 cm. Calcule MN et AC.',
   etapes:[
    {f:'(MN) ∥ (BC), point commun A',w:'C’est la configuration triangle du théorème de Thalès.'},
    {f:`${F('AM','AB')} = ${F('AN','AC')} = ${F('MN','BC')}`,w:'Petit triangle AMN en haut, grand triangle ABC en bas.'},
    {f:`${F(3,5)} = ${F('2,4','AC')} = ${F('MN',7)}`,w:'On remplace ce qu’on connaît.'},
    {f:'MN = 7 × 3 : 5 = 4,2 cm',w:`Produit en croix dans ${F(3,5)} = ${F('MN',7)} : 5 × MN = 3 × 7.`},
    {f:'AC = 5 × 2,4 : 3 = 4 cm',w:`Produit en croix dans ${F(3,5)} = ${F('2,4','AC')} : 3 × AC = 5 × 2,4.`}],
   conclusion:'MN mesure 4,2 cm et AC mesure 4 cm. En configuration papillon, on écrit exactement les mêmes rapports.'},
  fig:thalesTri(.6,{lab:(P,f)=>{ tl(P,f.A,f.M,'3',-12,0); tl(P,f.A,f.N,'2,4',14,0); tl(P,f.B,f.C,'7',0,14); tl(P,f.M,f.N,'?',0,-6); }}).P.svg()},
 {kind:'Question',h:'Attention au piège',p:'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC], avec (MN) ∥ (BC). AM = 4 cm, MB = 2 cm et AN = 5 cm. Combien mesure AC ?',
  fig:thalesTri(2/3,{lab:(P,f)=>{ tl(P,f.A,f.M,'4',-12,0); tl(P,f.M,f.B,'2',-12,0); tl(P,f.A,f.N,'5',12,0); }}).P.svg(),
  lab:'AC =',unit:'cm',ans:7.5,tol:.01,why:'Attention : AB = AM + MB = 6 cm. AM/AB = AN/AC donne 4/6 = 5/AC, donc AC = 6 × 5 : 4 = 7,5 cm.'},
 {kind:'Question',h:'Le papillon',p:'Les droites (BM) et (CN) se coupent en A, et (MN) ∥ (BC). AB = 6 cm, AM = 4 cm et BC = 9 cm. Combien mesure MN ?',
  fig:papillon(2/3,{lab:(P,f)=>{ tl(P,f.A,f.B,'6',-6,-10); tl(P,f.A,f.M,'4',-4,12); tl(P,f.B,f.C,'9',0,14); tl(P,f.M,f.N,'?',0,-6); }}).P.svg(),
  lab:'MN =',unit:'cm',ans:6,why:'Configuration papillon : AM/AB = MN/BC, soit 4/6 = MN/9. Donc MN = 9 × 4 : 6 = 6 cm.'},
 {kind:'Méthode',h:'Prouver que deux droites sont parallèles',p:`<b>Quand :</b> on connaît des longueurs sur deux droites qui se croisent en A, et on se demande si (MN) et (BC) sont parallèles. <div class="thm"><p><b>Réciproque du théorème de Thalès.</b> Si A, M, B sont alignés, si A, N, C sont alignés <b>dans le même ordre</b>, et si ${F('AM','AB')} = ${F('AN','AC')}, alors (MN) ∥ (BC).</p></div> <b>Pourquoi ça marche :</b> trace la parallèle à (BC) qui passe par M ; elle coupe (AC) en un point N₀. Par Thalès, AN₀/AC = AM/AB = AN/AC, donc AN₀ = AN : N₀ et N sont le même point. <b>Comment :</b> calcule séparément les deux rapports (en nombres décimaux ou en fractions simplifiées), compare-les et conclus. S’ils sont différents, les droites ne sont <b>pas</b> parallèles, car sinon Thalès les rendrait égaux.`,
  demo:{enonce:'M ∈ [AB] et N ∈ [AC]. AM = 2, AB = 5, AN = 3 et AC = 7,5. Les droites (MN) et (BC) sont-elles parallèles ? Et si AC valait 8 ?',
   etapes:[
    {f:'AM/AB = 2 : 5 = 0,4',w:'Premier rapport, calculé seul.'},
    {f:'AN/AC = 3 : 7,5 = 0,4',w:'Deuxième rapport, calculé seul.'},
    {f:'Les rapports sont égaux et les points sont dans le même ordre : (MN) ∥ (BC)',w:'On applique la réciproque du théorème de Thalès.'},
    {f:'Avec AC = 8 : 3 : 8 = 0,375 ≠ 0,4',w:'Les rapports diffèrent : si les droites étaient parallèles, Thalès donnerait des rapports égaux.'}],
   conclusion:'Avec AC = 7,5, les droites sont parallèles ; avec AC = 8, elles ne le sont pas.'}},
 {kind:'Pratique',h:'Rends les droites parallèles',p:'M est sur [AB], avec AM = 2 et AB = 5. Le point N glisse sur [AC], avec AC = 7,5. Règle la longueur AN pour que (MN) soit parallèle à (BC).',
  params:[{id:'n',l:'AN',min:.5,max:7,step:.5,v:5}],
  draw:v=>{ const P=G([-1,8],[-2.5,2.7]), A=[0,0], B=pt(A,5,20), C=pt(A,7.5,-15), M=lerp(A,B,.4), N=lerp(A,C,v.n/7.5);
    line(P,A,B,{c:'var(--ink)',w:2},.4); line(P,A,C,{c:'var(--ink)',w:2},.4); line(P,B,C,{c:'var(--math)',w:2.5},3); line(P,M,N,{c:'var(--spark)',w:2.5},3);
    lab(P,A,'A',-14,4); lab(P,B,'B',4,-8); lab(P,C,'C',6,14); lab(P,M,'M',-4,-10); lab(P,N,'N',-6,16); return P.svg(); },
  info:v=>`AM/AB = 2 : 5 = 0,4 ; AN/AC = ${fmt(v.n)} : 7,5 = ${fmt(v.n/7.5,3)}.`,
  ok:v=>v.n===3,why:'Il faut AN/AC = AM/AB = 0,4, donc AN = 0,4 × 7,5 = 3. Par la réciproque de Thalès, (MN) ∥ (BC).'},
 {kind:'Méthode',h:'Mesurer une hauteur inaccessible',p:`<b>Quand :</b> on veut la hauteur d’un arbre, d’un immeuble ou d’une falaise sans y monter. <b>Pourquoi ça marche :</b> l’objet et un bâton sont verticaux, donc parallèles. On place le bâton pour que le bout de son ombre tombe au même point S que le bout de l’ombre de l’objet. Les rayons du Soleil forment alors avec le sol une configuration de Thalès de sommet S. <b>Comment :</b> 1) mesure la hauteur du bâton, la distance de S au pied du bâton et la distance de S au pied de l’objet ; 2) écris hauteur du bâton / hauteur de l’objet = distance de S au bâton / distance de S à l’objet ; 3) résous par produit en croix ; 4) réponds par une phrase avec l’unité. Sans soleil, on remplace les ombres par une visée : l’œil au ras du sol, aligné avec le haut du bâton et le haut de l’objet.`,
  demo:{enonce:'Un bâton de 1,2 m est planté verticalement. Le bout S de son ombre est aussi le bout de l’ombre d’un arbre. S est à 2 m du pied du bâton et à 15 m du pied de l’arbre. Quelle est la hauteur <i>h</i> de l’arbre ?',
   etapes:[
    {f:'Le bâton et l’arbre sont verticaux, donc parallèles',w:'C’est une configuration triangle de Thalès, de sommet S.'},
    {f:`${F('1,2','<i>h</i>')} = ${F(2,15)}`,w:'Petit triangle (bâton) en haut, grand triangle (arbre) en bas.'},
    {f:'<i>h</i> = 1,2 × 15 : 2 = 9 m',w:'Produit en croix : 2 × <i>h</i> = 1,2 × 15 = 18.'}],
   conclusion:'L’arbre mesure 9 m de haut.'},
  fig:(()=>{ const P=G([-1.6,16],[-1,9.6]); P.seg(-1,0,16,0,{c:'var(--ink)',w:2});
    sg(P,[2,0],[2,1.2],{c:'var(--accent)',w:4}); sg(P,[15,0],[15,9],{c:'var(--ok)',w:5}); sg(P,[0,0],[15,9],{c:'var(--spark)',w:1.5,dash:true}); lab(P,[0,0],'S',-14,-4);
    P.text(2,1.2,'1,2 m',{a:'middle',dy:-8,s:11}).text(1,0,'2 m',{a:'middle',dy:14,s:11}).text(8.5,0,'15 m',{a:'middle',dy:14,s:11}).text(15,4.5,'h',{dx:6,s:13}); return P.svg(); })()},
 {kind:'Question',h:'La hauteur du mât',p:'Ana mesure 1,6 m. Elle se place pour que le bout de son ombre coïncide avec le bout de l’ombre d’un mât. Son ombre mesure 2,4 m et celle du mât 18 m. Quelle est la hauteur du mât ?',
  fig:(()=>{ const P=G([-1,19],[-.9,12.8]); P.seg(-1,0,19,0,{c:'var(--ink)',w:2});
    sg(P,[2.4,0],[2.4,1.6],{c:'var(--accent)',w:4}); sg(P,[18,0],[18,12],{c:'var(--ok)',w:4}); sg(P,[0,0],[18,12],{c:'var(--spark)',w:1.5,dash:true});
    P.text(2.4,1.6,'1,6 m',{a:'middle',dy:-8,s:11}).text(1.2,0,'2,4 m',{a:'middle',dy:14,s:11}).text(9,0,'18 m',{a:'middle',dy:14,s:11}).text(18,6,'?',{dx:-14,s:13}); return P.svg(); })(),
  lab:'hauteur =',unit:'m',ans:12,why:'Ana et le mât sont verticaux, donc parallèles : 1,6/<i>h</i> = 2,4/18. Donc <i>h</i> = 1,6 × 18 : 2,4 = 12 m.'},
 {kind:'Méthode',h:'Choisir le bon outil',p:`<p>Pour calculer une longueur ou un angle dans une figure, tu as maintenant trois outils. Rappel :</p><ul><li><b>Thalès</b> : deux droites parallèles coupent deux droites qui se croisent. On égale des rapports de longueurs.</li><li><b>Pythagore</b> : un triangle <b>rectangle</b> dont on connaît deux côtés. Hypoténuse² = somme des carrés des deux autres côtés.</li><li><b>Trigonométrie</b> : un triangle rectangle avec un <b>angle</b>, connu ou cherché. sin = opposé : hypoténuse, cos = adjacent : hypoténuse, tan = opposé : adjacent (SOH-CAH-TOA). Pour retrouver un angle, on utilise les touches sin⁻¹, cos⁻¹, tan⁻¹ de la calculatrice.</li></ul><p><b>Comment :</b> repère d’abord les parallèles et les angles droits, puis demande-toi ce qu’on connaît (deux côtés ? un côté et un angle ?) et ce qu’on cherche. Un même problème demande souvent plusieurs outils l’un après l’autre.</p>`,
  demo:{enonce:'Une rampe de skate monte de 1,5 m sur une longueur au sol de 4 m. Calcule la longueur de la pente, son angle α avec le sol (au dixième de degré) et la hauteur <i>h</i> d’un support vertical placé à 1 m du bas de la rampe.',
   etapes:[
    {f:'Pente : √(4² + 1,5²) = √18,25 ≈ 4,27 m',w:'Triangle rectangle, deux côtés connus : Pythagore.'},
    {f:'tan α = 1,5 : 4 = 0,375, donc α ≈ 20,6°',w:'Triangle rectangle, angle cherché, côtés opposé et adjacent connus : la tangente, puis la touche tan⁻¹.'},
    {f:`${F('<i>h</i>','1,5')} = ${F(1,4)}, donc <i>h</i> = 0,375 m`,w:'Le support et le côté vertical de la rampe sont parallèles : Thalès, depuis le bas de la rampe.'}],
   conclusion:'La pente mesure environ 4,27 m, l’angle environ 20,6° et le support 0,375 m, soit 37,5 cm.'},
  fig:(()=>{ const P=G([-.4,5.2],[-.5,2]), A=[0,0], B=[4,0], C=[4,1.5];
    triTo(P,[A,B,C],{fill:'var(--accent)',fo:.2,c:'var(--accent)'}); sg(P,[1,0],[1,.375],{c:'var(--spark)',w:3}); right(P,B,A,C,.18); arc(P,A,.5,0,dir(A,C),{c:'var(--spark)',l:'α',lr:.25});
    P.text(2,0,'4 m',{a:'middle',dy:14,s:11}).text(4,.75,'1,5 m',{dx:5,s:11}).text(1,.2,'h',{dx:5,s:12}).text(.5,0,'1 m',{a:'middle',dy:14,s:11}); return P.svg(); })()},
 {kind:'Question',h:'Le cerf-volant',p:'Le fil d’un cerf-volant mesure 30 m. Il est tendu bien droit depuis le sol et fait un angle de 40° avec le sol. À quelle hauteur vole le cerf-volant ? Arrondis au dixième.',
  lab:'hauteur =',unit:'m',ans:19.3,tol:.05,why:'Triangle rectangle : le fil est l’hypoténuse, la hauteur est le côté opposé à l’angle de 40°. sin 40° = <i>h</i>/30, donc <i>h</i> = 30 × sin 40° ≈ 19,3 m.'},
 {kind:'Théorie',h:'Arcs, secteurs et aires (rappel)',p:`<p>Une part de pizza, un essuie-glace qui balaie le pare-brise, une piste d’athlétisme : beaucoup de formes contiennent des morceaux de cercle. Voici ce que tu sais déjà calculer.</p>
<div class="prop"><p>Pour un cercle de rayon <i>r</i> : périmètre 2π<i>r</i>, aire du disque π<i>r</i>². Un <b>arc</b> et un <b>secteur</b> d’angle au centre α sont <b>proportionnels à α</b> : longueur de l’arc = 2π<i>r</i> × α/360 et aire du secteur = π<i>r</i>² × α/360.</p></div>
<div class="idea"><p>Un secteur de 90° est un quart de disque, car 90/360 = 1/4. Pour une figure compliquée, on la <b>décompose</b> en morceaux connus (rectangles, triangles, secteurs) qu’on additionne. Ou on part d’une grande figure et on <b>soustrait</b> ce qui manque.</p></div>
<div class="ex"><p>Rayon 3 cm, angle 120° : arc = 2π × 3 × 120/360 = 2π ≈ 6,28 cm ; secteur = π × 9 × 120/360 = 3π ≈ 9,42 cm².</p></div>
${sdx}<p>Il y a plus de 2200 ans, Archimède a encadré π en dessinant des polygones à 96 côtés, dans et autour d’un cercle. Il a trouvé que π est entre 3,1408 et 3,1429.</p></div>`,
  params:[{id:'a',l:'Angle α',min:15,max:360,step:15,v:90,u:'°'}],
  draw:v=>{ const P=G([-3.6,3.6],[-3.4,3.4]), O=[0,0], pts=[O]; for(let i=0;i<=60;i++) pts.push(pt(O,3,v.a*i/60));
    circ(P,O,3,{w:1.5}); P.poly(pts,{fill:'var(--accent)',fo:.3,c:null}); arc(P,O,3,0,v.a,{c:'var(--spark)',w:5,n:80}); sg(P,O,[3,0],{c:'var(--ink)',w:2}); if(v.a<360) sg(P,O,pt(O,3,v.a),{c:'var(--ink)',w:2});
    lab(P,O,'O',-14,16); P.text(1.5,0,'3 cm',{a:'middle',dy:14,s:11}); return P.svg(); },
  info:v=>`α = ${v.a}° : arc = 2π × 3 × ${v.a}/360 ≈ ${fmt(2*Math.PI*3*v.a/360)} cm ; secteur = π × 9 × ${v.a}/360 ≈ ${fmt(Math.PI*9*v.a/360)} cm².`},
 {kind:'Méthode',h:'Aire par décomposition et grandeur manquante',p:`<b>Quand :</b> la figure n’a pas de formule toute faite, ou bien on connaît le résultat (aire, périmètre) et il manque une dimension. <b>Pourquoi ça marche :</b> l’aire d’une figure est la somme des aires de ses morceaux, s’ils ne se chevauchent pas. Une formule est une égalité : si une seule lettre est inconnue, on l’isole comme dans une équation. <b>Comment :</b> 1) découpe la figure en morceaux connus et note leurs dimensions ; 2) calcule chaque morceau, puis additionne (ou soustrais) ; 3) pour une grandeur manquante, écris la formule, remplace ce qu’on connaît et résous l’équation. Garde π jusqu’au bout et arrondis seulement à la fin.`,
  demo:{enonce:'Un terrain est formé d’un rectangle de 100 m sur 60 m et de deux demi-disques de 60 m de diamètre collés à ses petits côtés. Calcule son aire et son périmètre. Quelle longueur <i>L</i> faudrait-il au rectangle pour un périmètre de 400 m ?',
   etapes:[
    {f:'Rectangle : 100 × 60 = 6000 m²',w:'Premier morceau.'},
    {f:'Deux demi-disques = un disque de rayon 30 m : π × 30² ≈ 2827,4 m²',w:'Le diamètre vaut 60 m, donc le rayon vaut 30 m.'},
    {f:'Aire ≈ 6000 + 2827,4 = 8827,4 m²',w:'On additionne les morceaux.'},
    {f:'Périmètre = 2 × 100 + 2π × 30 ≈ 388,5 m',w:'Les deux grands côtés, plus le tour complet d’un cercle. Les petits côtés sont à l’intérieur : on ne les compte pas.'},
    {f:'2<i>L</i> + 60π = 400, donc <i>L</i> = (400 − 60π) : 2 ≈ 105,75 m',w:'Grandeur manquante : on isole <i>L</i> dans la formule du périmètre.'}],
   conclusion:'Aire ≈ 8827 m² et périmètre ≈ 388,5 m. Pour 400 m, le rectangle devrait mesurer environ 105,75 m de long.'},
  fig:(()=>{ const P=G([-1.8,6.8],[-1.9,1.9]); P.rect(0,-1.5,5,3,{fill:'var(--ok)',fo:.25,c:null});
    const half=(cx,a0)=>{ const p=[]; for(let i=0;i<=40;i++) p.push(pt([cx,0],1.5,a0+180*i/40)); P.poly(p,{fill:'var(--ok)',fo:.25,c:null}); arc(P,[cx,0],1.5,a0,a0+180,{c:'var(--ink)',w:2.5,n:60}); };
    half(5,-90); half(0,90); P.seg(0,1.5,5,1.5,{c:'var(--ink)',w:2.5}).seg(0,-1.5,5,-1.5,{c:'var(--ink)',w:2.5}).seg(0,-1.5,0,1.5,{c:'var(--muted)',w:1.2,dash:true}).seg(5,-1.5,5,1.5,{c:'var(--muted)',w:1.2,dash:true});
    P.text(2.5,1.5,'100 m',{a:'middle',dy:-6,s:11}).text(5,0,'60 m',{dx:-30,s:11}); return P.svg(); })()},
 {kind:'Défi',h:'La feuille entre deux quarts de cercle',p:'Dans un carré de 4 cm de côté, on trace deux quarts de cercle de rayon 4 cm, centrés en deux coins opposés. Ils délimitent une « feuille ». Quelle est l’aire de cette feuille ? Arrondis au centième.',
  fig:(()=>{ const P=G([-.5,4.5],[-.5,4.5],220), pts=[];
    for(let i=0;i<=40;i++) pts.push(pt([0,0],4,90*i/40)); for(let i=0;i<=40;i++) pts.push(pt([4,4],4,180+90*i/40));
    P.rect(0,0,4,4,{c:'var(--ink)',w:2}); P.poly(pts,{fill:'var(--ok)',fo:.4,c:null}); arc(P,[0,0],4,0,90,{c:'var(--accent)',w:2.5,n:60}); arc(P,[4,4],4,180,270,{c:'var(--spark)',w:2.5,n:60});
    P.text(2,0,'4 cm',{a:'middle',dy:14,s:11}); return P.svg(); })(),
  lab:'aire =',unit:'cm²',ans:9.13,tol:.01,why:'Chaque quart de disque a une aire de π × 4² : 4 = 4π. Les deux quarts ensemble recouvrent tout le carré, et la feuille deux fois. Donc 4π + 4π = 16 + feuille, soit feuille = 8π − 16 ≈ 9,13 cm². Stratégie : faire un dessin et repérer ce qui est compté deux fois.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Des triangles semblables permettent de mesurer ce qu’on ne peut pas atteindre.</p><div class="keep"><ul>
<li><b>Rapport de similitude</b> <i>k</i> : le nombre par lequel on multiplie toutes les longueurs pour passer d’un triangle à un triangle semblable.</li>
<li><b>Thalès</b> (triangle ou papillon) : si (MN) ∥ (BC), alors AM/AB = AN/AC = MN/BC. Petit triangle en haut, grand en bas ; attention à AB = AM + MB.</li>
<li><b>Réciproque</b> : points dans le même ordre et AM/AB = AN/AC donnent (MN) ∥ (BC). Des rapports différents prouvent que les droites ne sont pas parallèles.</li>
<li><b>Hauteur inaccessible</b> : bâton et objet verticaux, ombres ou visée qui finissent au même point S, puis Thalès.</li>
<li><b>Choisir l’outil</b> : parallèles → Thalès ; triangle rectangle et deux côtés → Pythagore ; triangle rectangle et un angle → sin, cos, tan.</li>
<li><b>Arc</b> = 2π<i>r</i> × α/360, <b>secteur</b> = π<i>r</i>² × α/360. Aire par décomposition : additionner ou soustraire des morceaux. Grandeur manquante : isoler la lettre dans la formule.</li></ul></div>`},
 {kind:'Problème',h:'La rampe de skate',p:'Le club de skate construit une rampe. Vue de côté, c’est un triangle rectangle : elle monte de 2 m sur une longueur au sol de 6 m. La pente sera recouverte d’une plaque de bois de 1,5 m de large. Un support vertical sera placé sous la pente, à 1,5 m du bas de la rampe.',
  fig:(()=>{ const P=G([-.6,6.8],[-.6,2.6]), A=[0,0], B=[6,0], C=[6,2];
    triTo(P,[A,B,C],{fill:'var(--accent)',fo:.2,c:'var(--accent)'}); sg(P,[1.5,0],[1.5,.5],{c:'var(--spark)',w:3}); right(P,B,A,C,.22); arc(P,A,.9,0,dir(A,C),{c:'var(--spark)',l:'α',lr:.3});
    P.text(3,0,'6 m',{a:'middle',dy:14,s:11}).text(6,1,'2 m',{dx:5,s:11}).text(.75,0,'1,5 m',{a:'middle',dy:14,s:11}).text(1.5,.5,'support',{dx:-4,dy:-8,s:11,a:'end'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la longueur de la pente ? Arrondis au centième.',lab:'pente =',unit:'m',ans:6.32,tol:.01,hint:'Le triangle est rectangle et tu connais deux côtés.',why:'Pythagore : √(6² + 2²) = √40 ≈ 6,32 m.'},
   {q:'b) Quelle est la hauteur du support ?',lab:'hauteur =',unit:'m',ans:.5,tol:.001,hint:'Le support et le côté vertical de 2 m sont parallèles.',why:'Thalès depuis le bas de la rampe : <i>h</i>/2 = 1,5/6, donc <i>h</i> = 2 × 1,5 : 6 = 0,5 m.'},
   {q:'c) Quel angle α la pente fait-elle avec le sol ? Arrondis au dixième de degré.',lab:'α =',unit:'°',ans:18.4,tol:.05,hint:'Tu connais le côté opposé et le côté adjacent à α.',why:'tan α = 2 : 6, donc α = tan⁻¹(1/3) ≈ 18,4°.'},
   {q:'d) Quelle est l’aire de la plaque de bois ? Arrondis au centième.',lab:'aire =',unit:'m²',ans:9.49,tol:.01,hint:'La plaque est un rectangle : la longueur de la pente fois la largeur.',why:'√40 × 1,5 ≈ 9,49 m² (garde la valeur exacte de la pente jusqu’au bout).'}],
  sol:'a) Le triangle est rectangle : pente = √(36 + 4) = √40 ≈ 6,32 m (Pythagore). b) Le support et le côté de 2 m sont verticaux, donc parallèles. Par Thalès, depuis le bas de la rampe : <i>h</i>/2 = 1,5/6, d’où <i>h</i> = 0,5 m. c) tan α = opposé : adjacent = 2/6, donc α ≈ 18,4°. d) La plaque est un rectangle de √40 m sur 1,5 m : 1,5 × √40 ≈ 9,49 m².'},
 {kind:'Problème',h:'Le clocher du village',p:'Léa veut connaître la hauteur du clocher de son village. Elle plante un bâton vertical de 2 m à 24 m du pied du clocher. Puis elle se couche au sol, de l’autre côté du bâton, à 3 m de lui, en un point E : de là, le haut du bâton cache exactement le haut du clocher. Le cadran de l’horloge du clocher a une grande aiguille de 1,2 m.',
  fig:(()=>{ const P=G([-1,28.5],[-1.4,20]); P.seg(-1,0,28.5,0,{c:'var(--ink)',w:2});
    sg(P,[3,0],[3,2],{c:'var(--accent)',w:4}); P.rect(25.5,0,3,18,{fill:'var(--muted)',fo:.2,c:'var(--ink)',w:2}); sg(P,[0,0],[27,18],{c:'var(--spark)',w:1.5,dash:true}); lab(P,[0,0],'E',-10,16); lab(P,[27,18],'',0,0);
    P.circ(27,13,1.2,{c:'var(--ink)',w:1.5}); P.text(1.5,0,'3 m',{a:'middle',dy:14,s:11}).text(15,0,'24 m',{a:'middle',dy:14,s:11}).text(3,2,'2 m',{a:'middle',dy:-8,s:11}).text(25.5,9,'?',{a:'end',dx:-6,s:13});
    return P.svg(); })(),
  parts:[
   {q:'a) À quelle distance du pied du clocher Léa se trouve-t-elle ?',lab:'distance =',unit:'m',ans:27,hint:'Additionne les deux distances le long du sol.',why:'3 + 24 = 27 m.'},
   {q:'b) Quelle est la hauteur du clocher ? On considère que l’œil de Léa est au ras du sol et que le haut du clocher est au-dessus de son pied.',lab:'hauteur =',unit:'m',ans:18,hint:'Le bâton et le clocher sont verticaux : utilise Thalès avec E comme sommet.',why:'2/<i>h</i> = 3/27, donc <i>h</i> = 2 × 27 : 3 = 18 m.'},
   {q:'c) En 20 minutes, la pointe de la grande aiguille décrit un arc. Quelle est sa longueur ? Arrondis au centième.',lab:'arc =',unit:'m',ans:2.51,tol:.01,hint:'En 60 minutes, l’aiguille fait un tour complet de 360°. Quel angle en 20 minutes ?',why:'20 min = 1/3 de tour = 120°. Arc = 2π × 1,2 × 120/360 ≈ 2,51 m.'},
   {q:'d) Quelle aire l’aiguille balaie-t-elle pendant ces 20 minutes ? Arrondis au centième.',lab:'aire =',unit:'m²',ans:1.51,tol:.01,hint:'C’est un secteur de disque de rayon 1,2 m.',why:'Secteur = π × 1,2² × 120/360 = 0,48π ≈ 1,51 m².'}],
  sol:'a) E, le bâton et le clocher sont alignés au sol : 3 + 24 = 27 m. b) Le bâton et le clocher sont verticaux, donc parallèles, et le rayon visuel part de E : c’est une configuration triangle de Thalès de sommet E. 2/<i>h</i> = 3/27, d’où <i>h</i> = 18 m. c) En 20 minutes, l’aiguille tourne d’un tiers de tour, soit 120°. Arc = 2π × 1,2 × 120/360 = 0,8π ≈ 2,51 m. d) Secteur = π × 1,44 × 120/360 = 0,48π ≈ 1,51 m².'},
]},
);
})();
