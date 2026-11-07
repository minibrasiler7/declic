/* Déclic — Maths au secondaire, 9e année : angles, droites remarquables, isométries */
(()=>{
/* ---------- helpers locaux de géométrie ---------- */
const D=Math.PI/180;
const cs=t=>Math.cos(t*D), sn=t=>Math.sin(t*D);
const pt=(O,r,t)=>[O[0]+r*cs(t),O[1]+r*sn(t)];
const dist=(A,B)=>Math.hypot(B[0]-A[0],B[1]-A[1]);
const mid=(A,B)=>[(A[0]+B[0])/2,(A[1]+B[1])/2];
const dirA=(O,A)=>Math.atan2(A[1]-O[1],A[0]-O[0])/D;
const sg=(P,A,B,q={})=>P.seg(A[0],A[1],B[0],B[1],q);
const dt=(P,A,l,q={})=>P.dot(A[0],A[1],Object.assign({l},q));
const tx=(P,A,s,q={})=>P.text(A[0],A[1],s,q);
// arc de cercle de centre O, rayon r, de t0 à t1 (degrés, sens inverse des aiguilles)
const arc=(P,O,r,t0,t1,q={})=>P.curve(t=>O[0]+r*cs(t),t=>O[1]+r*sn(t),t0,t1,Object.assign({w:2,n:48,c:'var(--muted)'},q));
// marque d'angle de sommet O entre les directions a et b (b > a, sens inverse des aiguilles)
function markA(P,O,a,b,q={}){ const r=q.r||.6, c=q.c||'var(--spark)';
  if(Math.abs(b-a-90)<.01&&!q.arc){ const u=pt([0,0],r*.7,a), w=pt([0,0],r*.7,b);
    P.poly([O,[O[0]+u[0],O[1]+u[1]],[O[0]+u[0]+w[0],O[1]+u[1]+w[1]],[O[0]+w[0],O[1]+w[1]]],{c,w:2,fill:c,fo:.15}); }
  else if(b-a>.01){ const pts=[O]; for(let i=0;i<=36;i++) pts.push(pt(O,r,a+(b-a)*i/36)); P.poly(pts,{c:null,fill:c,fo:.2}); arc(P,O,r,a,b,{c,w:2}); }
  if(q.l){ const m=pt(O,r+(q.ld||.45),(a+b)/2); P.text(m[0],m[1],q.l,{a:'middle',dy:5,s:12,c}); }
  return P; }
// marque l'angle de sommet O, du côté [OA) vers le côté [OB) en tournant dans le sens inverse des aiguilles
function mark(P,O,A,B,q={}){ const a=dirA(O,A); let b=dirA(O,B); while(b<a-1e-9) b+=360; return markA(P,O,a,b,q); }
// droite (AB) prolongée ; demi-droite [AB)
function line(P,A,B,q={},L=40){ const d=dist(A,B), ux=(B[0]-A[0])/d, uy=(B[1]-A[1])/d; return P.seg(A[0]-ux*L,A[1]-uy*L,B[0]+ux*L,B[1]+uy*L,Object.assign({w:2},q)); }
function ray(P,A,B,q={},L=40){ const d=dist(A,B), ux=(B[0]-A[0])/d, uy=(B[1]-A[1])/d; return P.seg(A[0],A[1],B[0]+ux*L,B[1]+uy*L,Object.assign({w:2.5},q)); }
// petits traits de codage au milieu de [AB]
function tick(P,A,B,n=1,q={}){ const m=mid(A,B), d=dist(A,B), ux=(B[0]-A[0])/d, uy=(B[1]-A[1])/d, s=q.s||.17, g=q.g||.13;
  for(let i=0;i<n;i++){ const o=(i-(n-1)/2)*g, cx=m[0]+ux*o, cy=m[1]+uy*o; P.seg(cx-uy*s+ux*.06,cy+ux*s+uy*.06,cx+uy*s-ux*.06,cy-ux*s-uy*.06,{c:q.c||'var(--ink)',w:1.8}); } return P; }
// intersections de deux cercles (le 1er point est à gauche quand on va de A vers B)
function inter(A,ra,B,rb){ const d=dist(A,B), a=(ra*ra-rb*rb+d*d)/(2*d), h=Math.sqrt(Math.max(0,ra*ra-a*a)), ux=(B[0]-A[0])/d, uy=(B[1]-A[1])/d, M=[A[0]+ux*a,A[1]+uy*a];
  return [[M[0]-uy*h,M[1]+ux*h],[M[0]+uy*h,M[1]-ux*h]]; }
// pied de la perpendiculaire issue de M sur (AB)
function foot(M,A,B){ const ux=B[0]-A[0], uy=B[1]-A[1], t=((M[0]-A[0])*ux+(M[1]-A[1])*uy)/(ux*ux+uy*uy); return [A[0]+t*ux,A[1]+t*uy]; }
function circum(A,B,C){ const d=2*(A[0]*(B[1]-C[1])+B[0]*(C[1]-A[1])+C[0]*(A[1]-B[1])), a2=A[0]**2+A[1]**2, b2=B[0]**2+B[1]**2, c2=C[0]**2+C[1]**2;
  return [(a2*(B[1]-C[1])+b2*(C[1]-A[1])+c2*(A[1]-B[1]))/d,(a2*(C[0]-B[0])+b2*(A[0]-C[0])+c2*(B[0]-A[0]))/d]; }
function incenter(A,B,C){ const a=dist(B,C), b=dist(A,C), c=dist(A,B), s=a+b+c; return [(a*A[0]+b*B[0]+c*C[0])/s,(a*A[1]+b*B[1]+c*C[1])/s]; }
// angle géométrique (0 à 180°) au sommet V
const angAt=(V,A,B)=>{ const u=[A[0]-V[0],A[1]-V[1]], w=[B[0]-V[0],B[1]-V[1]]; return Math.acos(Math.max(-1,Math.min(1,(u[0]*w[0]+u[1]*w[1])/(Math.hypot(...u)*Math.hypot(...w)))))/D; };
// arrondit trois angles à l'unité en gardant une somme de 180
function round180(arr){ const f=arr.map(Math.floor); const rest=180-f.reduce((s,x)=>s+x,0); const idx=arr.map((x,i)=>[x-Math.floor(x),i]).sort((a,b)=>b[0]-a[0]); for(let k=0;k<rest;k++) f[idx[k][1]]++; return f; }
const typeAngle=a=>a===0?'nul':a<90?'aigu':a===90?'droit':a<180?'obtus':a===180?'plat':a<360?'rentrant':'plein';
// rapporteur : demi-disque de centre O, rayon R ; graduation extérieure (0 à gauche) et intérieure (0 à droite)
function rapporteur(P,O,R,q={}){ const rot=q.rot||0, pts=[];
  for(let i=0;i<=60;i++) pts.push(pt(O,R,rot+180*i/60)); P.poly(pts,{c:'var(--muted)',w:1.5,fill:'var(--sci)',fo:.08});
  for(let t=0;t<=180;t+=5){ const a=pt(O,R,rot+t), b=pt(O,R*(t%10?.95:.9),rot+t); sg(P,a,b,{c:'var(--muted)',w:t%10?1:1.5}); }
  if(q.labels!==false) for(let t=0;t<=180;t+=10){ const e=pt(O,R*.82,rot+t), i=pt(O,R*.67,rot+t);
    tx(P,e,String(180-t),{a:'middle',dy:4,s:9,c:'var(--math)'}); tx(P,i,String(t),{a:'middle',dy:4,s:9,c:'var(--spark)'}); }
  P.dot(O[0],O[1],{r:3,c:'var(--ink)'}); return P; }
// construction pas à pas : gestes = [{t:'texte du geste', f:(P, actuel)=>…}] ; base() crée la figure de départ
function etapes(start,base,gestes){
  return {params:[{id:'e',l:'Étape de la construction',min:0,max:gestes.length,step:1,v:0}],
    draw:v=>{ const P=base(); gestes.slice(0,v.e).forEach((g,i)=>g.f(P,i===v.e-1)); return P.svg(); },
    info:v=>v.e?`<b>Étape ${v.e} sur ${gestes.length}.</b> ${gestes[v.e-1].t}`:`<b>Départ.</b> ${start}`}; }
const hl=cur=>cur?'var(--spark)':'var(--muted)';
// quadrillage avec repère
const grille=(x,y,o={})=>plane(Object.assign({x,y,lab:o.lab||1},o));
// drapeau : mât de (0;0) à (0;3), fanion (0;1)-(0;3)-(2;2) ; f transforme un point
const FL={pied:[0,0],haut:[0,3],tri:[[0,1],[0,3],[2,2]],T:[2,2]};
function drapeau(P,f,q={}){ const c=q.c||'var(--accent)';
  const a=f(FL.pied), b=f(FL.haut); sg(P,a,b,{c,w:q.w||3,dash:q.dash,op:q.op});
  P.poly(FL.tri.map(f),{c,w:q.dash?2:2,fill:q.dash?'none':c,fo:q.fo??.35,dash:q.dash,op:q.op});
  if(q.l){ const t=f(FL.T); P.dot(t[0],t[1],{r:4.5,c,l:q.l,dx:q.dx,dy:q.dy}); }
  return P; }
const tr=(a,b)=>p=>[p[0]+a,p[1]+b];
const rotP=(O,al)=>p=>{ const x=p[0]-O[0], y=p[1]-O[1]; return [O[0]+x*cs(al)-y*sn(al),O[1]+x*sn(al)+y*cs(al)]; };
const comp=(...fs)=>p=>fs.reduce((q,f)=>f(q),p);
const co=p=>`(${fmt(p[0])} ; ${fmt(p[1])})`;

COURS.push(
/* =====================================================================
   CHAPITRE 3 : ANGLES ET FIGURES
   ===================================================================== */
{subj:'sec', sem:'a9', id:'sec9-angles', o:3, h:'Angles et figures', p:'Nommer et mesurer les angles, tracer des parallèles et des perpendiculaires, reconnaître triangles et quadrilatères, et calculer un angle grâce à la somme 180°.', steps:[
 {kind:'Théorie',h:'Droites, segments et demi-droites',p:`<p>Le faisceau d’un laser part de ton stylo et file tout droit, sans jamais s’arrêter. Le fil tendu entre deux poteaux, lui, s’arrête aux poteaux. Et une ligne qu’on prolonge des deux côtés ne s’arrête nulle part. Trois objets, trois mots différents en géométrie.</p>
<div class="def"><p>Un <b>point</b> se note avec une lettre majuscule : A, B… La <b>droite</b> (AB) passe par A et B et continue sans fin des deux côtés. Le <b>segment</b> [AB] est le morceau de droite compris entre A et B : il a deux <b>extrémités</b> et une longueur, notée AB, sans crochets. La <b>demi-droite</b> [AB) commence en A, son <b>origine</b>, passe par B et continue sans fin.</p></div>
<div class="idea"><p>Lis les signes comme des panneaux : un crochet veut dire « ça s’arrête ici », une parenthèse veut dire « ça continue ».</p></div>
<div class="ex"><p>Sur la figure, [CD] mesure 3 cm : on écrit CD = 3 cm. La demi-droite [EF) part de E et file vers la droite en passant par F. Un point G placé plus loin que F est sur [EF), mais pas sur le segment [EF].</p></div>
<div class="warn"><p>[AB) et [BA) ne sont pas la même demi-droite : la première part de A, la seconde part de B, dans l’autre sens. En revanche, (AB) et (BA) sont la même droite.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Vers 300 avant notre ère, le Grec Euclide a écrit les <i>Éléments</i>, un livre de géométrie utilisé pendant plus de 2000 ans. Il y décrit la ligne comme une longueur sans largeur.</p></div>`,
  fig:(()=>{ const P=plane({x:[-5,5],y:[-.6,5],grid:false,axes:false});
    P.seg(-5,4,5,4,{w:2.5}); dt(P,[-1.5,4],'A'); dt(P,[1.5,4],'B'); P.text(-4.8,4,'droite (AB)',{dy:-10,s:12,c:'var(--accent)'});
    P.seg(-1.5,2.2,1.5,2.2,{w:2.5,c:'var(--math)'}); dt(P,[-1.5,2.2],'C',{c:'var(--math)'}); dt(P,[1.5,2.2],'D',{c:'var(--math)'}); P.text(-4.8,2.2,'segment [CD]',{dy:-10,s:12,c:'var(--math)'});
    P.text(0,2.2,'3 cm',{a:'middle',dy:20,s:11,c:'var(--muted)'});
    P.seg(-1.5,.4,5,.4,{w:2.5,c:'var(--ok)'}); dt(P,[-1.5,.4],'E',{c:'var(--ok)'}); dt(P,[1.5,.4],'F',{c:'var(--ok)'}); dt(P,[3.4,.4],'G',{c:'var(--muted)'}); P.text(-4.8,.4,'demi-droite [EF)',{dy:-10,s:12,c:'var(--ok)'});
    return P.svg(); })()},
 {kind:'Théorie',h:'Ouvrir un angle',p:`<p>En skate, un « 180 », c’est un demi-tour, et un « 360 », un tour complet. Ces nombres disent de combien tu tournes : ce sont des <b>angles</b>, mesurés en <b>degrés</b>.</p>
<div class="def"><p>Deux demi-droites de même origine forment un <b>angle</b>. L’origine commune est le <b>sommet</b>, les deux demi-droites sont les <b>côtés</b>. On note ∠AOB (lire « l’angle AOB ») : la lettre du sommet est toujours au milieu. Un tour complet mesure <b>360°</b>.</p></div>
<div class="def"><p>Selon sa mesure, un angle est <b>nul</b> (0°), <b>aigu</b> (entre 0° et 90°), <b>droit</b> (90°, marqué d’un petit carré), <b>obtus</b> (entre 90° et 180°), <b>plat</b> (180°, les côtés sont dans le prolongement l’un de l’autre), <b>rentrant</b> (entre 180° et 360°) ou <b>plein</b> (360°).</p></div>
<div class="ex"><p>Les aiguilles d’une montre à 3 h forment un angle droit : 90°. À 6 h, un angle plat : 180°. À 1 h, elles sont écartées d’un douzième de tour : 360 : 12 = 30°, un angle aigu.</p></div>
<div class="warn"><p>La longueur des côtés ne change rien à la mesure : un angle dessiné avec de longs traits n’est pas plus grand. Seule l’ouverture compte.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Le tour de 360 degrés vient des Babyloniens, il y a environ 4000 ans. Ils comptaient en base 60, comme nos minutes et nos secondes, et 360 se divise par 2, 3, 4, 5, 6, 8, 9, 10, 12…</p></div>`,
  params:[{id:'a',l:'Ouverture ∠AOB',min:0,max:360,step:5,v:40,u:'°'}],
  draw:v=>{ const P=plane({x:[-4,4],y:[-3,3],grid:false,axes:false}), O=[0,0], A=[3.5,0], B=pt(O,3.5,v.a);
    if(v.a===360) markA(P,O,0,359.9,{r:.8,arc:true}); else markA(P,O,0,v.a,{r:.8});
    sg(P,O,A,{w:3}); sg(P,O,B,{w:3,c:'var(--math)'}); dt(P,O,'O',{dx:-16,dy:16,c:'var(--ink)'}); dt(P,A,'A'); dt(P,B,'B',{c:'var(--math)'});
    return P.svg(); },
  info:v=>`∠AOB = ${v.a}° : angle <b>${typeAngle(v.a)}</b>.`,
  note:'Fais tourner le côté [OB) et regarde le nom de l’angle changer : il passe par droit à 90°, plat à 180° et plein à 360°.'},
 {kind:'Méthode',h:'Mesurer un angle au rapporteur',p:`<b>Quand :</b> pour connaître la mesure d’un angle dessiné, ou pour tracer un angle de mesure donnée. <b>L’outil :</b> le rapporteur est un demi-disque gradué de 0° à 180°, avec <b>deux graduations</b> : l’extérieure vaut 0 à gauche, l’intérieure vaut 0 à droite. <b>Comment :</b> 1) estime d’abord : l’angle est-il aigu ou obtus ? 2) place le centre du rapporteur sur le sommet ; 3) aligne la ligne du 0 sur un côté ; 4) suis la graduation qui part de 0 sur ce côté jusqu’à l’autre côté, et lis ; 5) compare avec ton estimation. Pour <b>tracer</b> un angle, procède de même, marque un point à la bonne graduation, puis relie-le au sommet.`,
  fig:(()=>{ const P=plane({x:[-5.3,5.3],y:[-.7,5.4],grid:false,axes:false}), O=[0,0];
    rapporteur(P,O,4.6); markA(P,O,60,180,{r:1.1,c:'var(--bad)'}); ray(P,O,[-5,0],{c:'var(--ink)'},.2); ray(P,O,pt(O,5,60),{c:'var(--ink)'},.2);
    dt(P,[-5,0],'A',{c:'var(--ink)',dy:16}); dt(P,pt(O,5,60),'B',{c:'var(--ink)'}); P.text(0,0,'O',{a:'middle',dy:16});
    return P.svg(); })(),
  demo:{enonce:'Mesurer l’angle AOB de la figure.',
   etapes:[
    {f:'Estimation : ∠AOB est plus ouvert qu’un angle droit, il est obtus.',w:'On sait déjà que la réponse est entre 90° et 180°.'},
    {f:'Le centre du rapporteur est sur O, la ligne du 0 est alignée sur [OA).',w:'Le sommet au centre et un côté sur le 0 : c’est la seule position correcte.'},
    {f:'[OA) part vers la gauche : on suit la graduation extérieure, qui vaut 0 à gauche.',w:'On part toujours du 0 qui est sur le côté de l’angle.'},
    {f:'On lit 120 sur la graduation extérieure. L’intérieure indique 60.',w:'120° est bien entre 90° et 180° : c’est la bonne lecture. 60° serait un angle aigu.'}],
   conclusion:'∠AOB = 120°.'},
  note:'Repères pour estimer : le coin d’une feuille fait 90°, sa moitié 45°. Un angle plat fait 180°.'},
 {h:'Lis le rapporteur',p:'Combien mesure l’angle AOB ?',lab:'∠AOB =',unit:'°',ans:35,
  fig:(()=>{ const P=plane({x:[-5.3,5.3],y:[-.7,5.4],grid:false,axes:false}), O=[0,0];
    rapporteur(P,O,4.6); ray(P,O,[-5,0],{c:'var(--ink)'},.2); ray(P,O,pt(O,5,145),{c:'var(--ink)'},.2);
    dt(P,[-5,0],'A',{c:'var(--ink)',dy:16}); dt(P,pt(O,5,145),'B',{c:'var(--ink)'}); P.text(0,0,'O',{a:'middle',dy:16});
    return P.svg(); })(),
  why:'[OA) part vers la gauche : on lit la graduation extérieure, qui vaut 0 à gauche. Elle indique 35. L’angle est aigu, donc c’est 35° et pas 145° (la lecture sur l’autre graduation).'},
 {kind:'Pratique',h:'Ouvre l’angle à 50°',p:'Le côté [OA) part vers la gauche. Déplace B pour que ∠AOB mesure exactement 50°. Attention : le nombre du curseur est celui de la graduation intérieure.',
  params:[{id:'d',l:'Position de B',min:0,max:180,step:5,v:90}],
  draw:v=>{ const P=plane({x:[-5.3,5.3],y:[-.7,5.8],grid:false,axes:false}), O=[0,0];
    rapporteur(P,O,4.6); ray(P,O,[-5,0],{c:'var(--ink)'},.2); ray(P,O,pt(O,5,v.d),{c:'var(--accent)'},.2);
    dt(P,[-5,0],'A',{c:'var(--ink)',dy:16}); dt(P,pt(O,5,v.d),'B'); P.text(0,0,'O',{a:'middle',dy:16}); return P.svg(); },
  info:v=>`Pour l’instant, ∠AOB est un angle <b>${typeAngle(180-v.d)}</b>.`,
  ok:v=>v.d===130,why:'On lit sur la graduation extérieure, celle qui vaut 0 du côté de A. Son 50 est en face du 130 de la graduation intérieure. Contrôle : 50° est aigu, et B est bien du côté de A.'},
 {kind:'Théorie',h:'Droites parallèles et perpendiculaires',p:`<p>Les deux rails d’une voie de train ne se touchent jamais. Les traverses posées dessous les coupent en formant des coins parfaitement carrés. Voilà les deux positions vedettes de deux droites.</p>
<div class="def"><p>Deux droites qui ont un seul point commun sont <b>sécantes</b>. Si elles se coupent en formant un angle droit, elles sont <b>perpendiculaires</b> : on écrit <i>d</i> ⊥ <i>p</i>. Deux droites qui ne se coupent jamais, même prolongées, sont <b>parallèles</b> : on écrit <i>d</i> // <i>d′</i>. Leur écart est le même partout.</p></div>
<div class="prop"><p>1) Si deux droites sont perpendiculaires à une même troisième, elles sont parallèles entre elles. 2) Si deux droites sont parallèles, toute droite perpendiculaire à l’une est perpendiculaire à l’autre.</p></div>
<div class="why"><p>Pense aux rails et aux traverses : chaque rail coupe la traverse à angle droit, et les rails restent à la même distance. Si l’un des deux angles n’était pas droit, ce rail pencherait vers l’autre et finirait par le croiser.</p></div>
<div class="ex"><p>Sur la figure, <i>d</i> ⊥ <i>p</i> et <i>d′</i> ⊥ <i>p</i>, donc <i>d</i> // <i>d′</i>. La droite <i>s</i> coupe <i>d</i> sans angle droit : elles sont sécantes, mais pas perpendiculaires.</p></div>
<div class="warn"><p>« Perpendiculaire » ne veut pas dire « verticale » : deux droites penchées peuvent être perpendiculaires. Et deux droites qui semblent ne pas se couper sur ta feuille peuvent se croiser plus loin : mesure leur écart en deux endroits.</p></div>`,
  fig:(()=>{ const P=plane({x:[-5,5],y:[-3,3],grid:false,axes:false});
    line(P,[-5,1.5],[5,1.5],{c:'var(--accent)'}); line(P,[-5,-1.2],[5,-1.2],{c:'var(--accent)'}); line(P,[-2.5,-3],[-2.5,3],{c:'var(--math)'}); line(P,[.5,-3],[3.5,3],{c:'var(--ok)'});
    markA(P,[-2.5,1.5],0,90,{r:.5}); markA(P,[-2.5,-1.2],0,90,{r:.5});
    P.text(4.6,1.5,'d',{dy:-8,c:'var(--accent)'}).text(4.6,-1.2,'d′',{dy:-8,c:'var(--accent)'}).text(-2.5,2.7,'p',{dx:8,c:'var(--math)'}).text(3.3,2.6,'s',{dx:8,c:'var(--ok)'});
    return P.svg(); })()},
 {kind:'Méthode',h:'Construire une perpendiculaire et une parallèle',p:`<b>Quand :</b> on te demande la droite perpendiculaire (ou parallèle) à une droite <i>d</i> passant par un point A. <b>À l’équerre :</b> pose un côté de l’angle droit de l’équerre le long de <i>d</i>, fais-la glisser jusqu’à ce que l’autre côté touche A, puis trace. <b>Au compas :</b> un arc centré en A coupe <i>d</i> en M et N, à la même distance de A ; deux arcs de même ouverture centrés en M et en N se croisent en B. <b>Pourquoi ça marche :</b> si on plie la feuille le long de (AB), M tombe sur N ; le pli fait donc un angle droit avec <i>d</i>. <b>Pour la parallèle :</b> trace d’abord la perpendiculaire <i>p</i>, puis la perpendiculaire à <i>p</i> passant par A : deux perpendiculaires à une même droite sont parallèles. Fais avancer la construction avec le curseur.`,
  ...etapes('La droite <i>d</i> et le point A sont donnés.',
   ()=>{ const P=plane({x:[-5,5],y:[-4.2,2.8],grid:false,axes:false}); line(P,[-5,-1],[5,-1],{c:'var(--accent)'}); P.text(4.6,-1,'d',{dy:-8,c:'var(--accent)'}); dt(P,[0,1.6],'A',{c:'var(--ink)'}); return P; },
   [{t:'Pointe du compas sur A, ouverture assez grande : l’arc coupe <i>d</i> en deux points M et N. On a AM = AN.',f:(P,c)=>{ arc(P,[0,1.6],3.2,-140,-40,{c:hl(c)}); dt(P,[-1.865,-1],'M',{c:'var(--math)',dx:-18}); dt(P,[1.865,-1],'N',{c:'var(--math)'}); }},
    {t:'Sans changer l’ouverture, pointe sur M : trace un arc de l’autre côté de <i>d</i>.',f:(P,c)=>arc(P,[-1.865,-1],3.2,-72,-38,{c:hl(c)})},
    {t:'Même ouverture, pointe sur N : le nouvel arc croise le précédent en B.',f:(P,c)=>{ arc(P,[1.865,-1],3.2,-142,-108,{c:hl(c)}); dt(P,[0,-3.6],'B',{c:'var(--math)'}); }},
    {t:'À la règle, trace (AB) : c’est la perpendiculaire <i>p</i> à <i>d</i> passant par A. Code l’angle droit.',f:(P,c)=>{ line(P,[0,1.6],[0,-3.6],{c:c?'var(--spark)':'var(--math)'}); markA(P,[0,-1],0,90,{r:.45}); P.text(0,2.5,'p',{dx:8,c:'var(--math)'}); }},
    {t:'Pour la parallèle : pose l’équerre avec un côté de l’angle droit le long de <i>p</i> et le sommet de l’angle droit en A.',f:(P,c)=>P.poly([[0,1.6],[0,-.2],[2.6,1.6]],{c:'var(--sci)',w:2,fill:'var(--sci)',fo:.2})},
    {t:'Trace <i>d′</i> le long de l’autre côté de l’équerre : <i>d′</i> ⊥ <i>p</i> et <i>d</i> ⊥ <i>p</i>, donc <i>d′</i> // <i>d</i>.',f:(P,c)=>{ line(P,[-5,1.6],[5,1.6],{c:c?'var(--spark)':'var(--accent)'}); markA(P,[0,1.6],0,90,{r:.45}); P.text(4.6,1.6,'d′',{dy:-8,c:'var(--accent)'}); }}]),
  demo:{enonce:'Tracer la perpendiculaire <i>p</i> à <i>d</i> passant par A, puis la parallèle <i>d′</i> à <i>d</i> passant par A.',
   etapes:[
    {f:'Pointe du compas sur A, ouverture assez grande : l’arc coupe <i>d</i> en M et N.',w:'AM = AN, car c’est le même rayon.'},
    {f:'Sans changer l’ouverture, pointe sur M puis sur N : deux arcs de l’autre côté de <i>d</i> se croisent en B.',w:'B est à la même distance de M et de N, comme A.'},
    {f:'À la règle, trace (AB) : c’est <i>p</i>, et <i>p</i> ⊥ <i>d</i>.',w:'En pliant le long de (AB), M tombe sur N : l’angle est droit.'},
    {f:'Équerre le long de <i>p</i>, sommet de l’angle droit en A : trace <i>d′</i>.',w:'<i>d′</i> ⊥ <i>p</i> et <i>d</i> ⊥ <i>p</i>, donc <i>d′</i> // <i>d</i>.'}],
   conclusion:'Code les angles droits par un petit carré et nomme chaque droite tracée.'}},
 {h:'Le bon geste',p:'Tu construis au compas la perpendiculaire à <i>d</i> passant par A. Ton arc centré en A a coupé <i>d</i> en M et N. Que fais-tu ensuite ?',
  opts:['Tu traces (AM) à la règle','Tu mesures l’angle AMN au rapporteur','Avec une même ouverture, tu traces un arc centré en M et un arc centré en N, de l’autre côté de <i>d</i>','Tu traces le cercle de centre M qui passe par N'],ans:2,
  why:'Les deux arcs de même ouverture se croisent en un point B, à la même distance de M et de N. La droite (AB) est alors perpendiculaire à <i>d</i>.'},
 {kind:'Théorie',h:'Classer les triangles',p:`<p>Le panneau « attention » au bord de la route, une part de pizza, la voile d’un bateau : des triangles partout, mais pas tous du même genre. On les range selon leurs côtés et selon leurs angles.</p>
<div class="def"><p><b>Selon les côtés.</b> Un triangle <b>isocèle</b> a deux côtés de même longueur ; ils se rejoignent au <b>sommet principal</b>, et le troisième côté est la <b>base</b>. Un triangle <b>équilatéral</b> a trois côtés de même longueur. Sinon, il est <b>quelconque</b>. Sur un dessin, de petits traits identiques signalent des côtés égaux : c’est le <b>codage</b>.</p></div>
<div class="def"><p><b>Selon les angles.</b> Un triangle <b>rectangle</b> a un angle droit ; le côté opposé à l’angle droit est l’<b>hypoténuse</b>. Un triangle <b>obtusangle</b> a un angle obtus. Un triangle <b>acutangle</b> a trois angles aigus.</p></div>
<div class="idea"><p>Plie un triangle isocèle pour poser un côté égal sur l’autre : les deux moitiés se recouvrent. Le pli est un <b>axe de symétrie</b>. Un isocèle en a 1, un équilatéral en a 3, un quelconque aucun.</p></div>
<div class="ex"><p>Des côtés de 5 cm, 5 cm et 7 cm : isocèle. 4 cm, 4 cm et 4 cm : équilatéral. Une équerre a un angle droit et deux côtés égaux : c’est un triangle <b>rectangle isocèle</b>, les deux à la fois.</p></div>
<div class="warn"><p>Un équilatéral est aussi isocèle : « isocèle » veut dire « au moins deux côtés égaux », et lui en a même trois.</p></div>`,
  fig:(()=>{ const P=plane({x:[-5.6,5.6],y:[-4.9,3],grid:false,axes:false});
    const q1=[[-5.3,0],[-2.4,0],[-4.6,2.3]], q2=[[-1.3,0],[1.3,0],[0,2.6]], q3=[[2.4,0],[5.2,0],[3.8,2.425]];
    P.poly(q1,{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.15}); P.poly(q2,{c:'var(--math)',w:2.5,fill:'var(--math)',fo:.15}); P.poly(q3,{c:'var(--ok)',w:2.5,fill:'var(--ok)',fo:.15});
    tick(P,q2[0],q2[2]); tick(P,q2[1],q2[2]); P.seg(0,-.2,0,2.9,{c:'var(--math)',w:1.5,dash:true});
    tick(P,q3[0],q3[1]); tick(P,q3[1],q3[2]); tick(P,q3[0],q3[2]);
    [[q3[0],mid(q3[1],q3[2])],[q3[1],mid(q3[0],q3[2])],[q3[2],mid(q3[0],q3[1])]].forEach(([a,b])=>sg(P,a,b,{c:'var(--ok)',w:1.5,dash:true}));
    P.text(-3.9,0,'quelconque',{a:'middle',dy:16,s:11}).text(0,0,'isocèle',{a:'middle',dy:16,s:11}).text(3.8,0,'équilatéral',{a:'middle',dy:16,s:11});
    const r1=[[-5.3,-4],[-3,-4],[-5.3,-1.6]], r2=[[-1.4,-4],[1.4,-4],[.3,-2.1]], r3=[[2.2,-4],[5.4,-4],[2.9,-2.6]];
    P.poly(r1,{c:'var(--sci)',w:2.5,fill:'var(--sci)',fo:.15}); markA(P,r1[0],0,90,{r:.4});
    P.poly(r2,{c:'var(--sci)',w:2.5,fill:'var(--sci)',fo:.15}); P.poly(r3,{c:'var(--sci)',w:2.5,fill:'var(--sci)',fo:.15}); mark(P,r3[2],r3[0],r3[1],{r:.4,c:'var(--bad)'});
    P.text(-4.2,-4,'rectangle',{a:'middle',dy:16,s:11}).text(0,-4,'acutangle',{a:'middle',dy:16,s:11}).text(3.8,-4,'obtusangle',{a:'middle',dy:16,s:11});
    return P.svg(); })(),
  note:'En haut, les pointillés sont les axes de symétrie. En bas, les mêmes familles vues par les angles.'},
 {kind:'Théorie',h:'Les quadrilatères et leurs diagonales',p:`<p>Un écran de téléphone, un carreau de vitrail, un cerf-volant : tous ont quatre côtés. Ce sont des <b>quadrilatères</b>. Pour les reconnaître, regarde leurs côtés, leurs angles… et surtout leurs <b>diagonales</b>, les segments qui relient deux sommets opposés.</p>
<div class="def"><p>Un <b>trapèze</b> a deux côtés parallèles. Un <b>parallélogramme</b> a ses côtés opposés parallèles deux à deux. Un <b>rectangle</b> a quatre angles droits. Un <b>losange</b> a quatre côtés égaux. Un <b>carré</b> est à la fois rectangle et losange. Un <b>cerf-volant</b> a deux paires de côtés voisins égaux.</p></div>
<div class="prop"><p>Les diagonales d’un <b>parallélogramme</b> se coupent en leur milieu. Celles d’un <b>rectangle</b> aussi, et en plus elles ont la même longueur. Celles d’un <b>losange</b> se coupent en leur milieu et sont perpendiculaires. Celles d’un <b>carré</b> ont les trois propriétés.</p></div>
<div class="ex"><p>Axes de symétrie : un parallélogramme quelconque n’en a aucun ; un rectangle en a 2 (les droites qui passent par les milieux de deux côtés opposés) ; un losange en a 2 (ses diagonales) ; un carré en a 4 ; un cerf-volant en a 1.</p></div>
<div class="idea"><p>Avec les curseurs, tu choisis deux diagonales qui se coupent en leur milieu, et le quadrilatère se dessine tout seul. Rends-les de même longueur, puis perpendiculaires : regarde la famille changer.</p></div>`,
  params:[{id:'l',l:'Longueur de [BD] (celle de [AC] vaut 6)',min:2,max:8,step:1,v:4},{id:'t',l:'Angle entre les diagonales',min:30,max:150,step:15,v:60,u:'°'}],
  draw:v=>{ const P=plane({x:[-4.5,4.5],y:[-4.2,4.2],grid:false,axes:false}), O=[0,0], A=[-3,0], C=[3,0], Dd=pt(O,v.l/2,v.t), B=pt(O,v.l/2,v.t+180);
    P.poly([A,B,C,Dd],{c:'var(--accent)',w:3,fill:'var(--accent)',fo:.12}); sg(P,A,C,{c:'var(--math)',w:2,dash:true}); sg(P,B,Dd,{c:'var(--spark)',w:2,dash:true});
    tick(P,A,O,1,{c:'var(--math)'}); tick(P,O,C,1,{c:'var(--math)'}); tick(P,B,O,2,{c:'var(--spark)'}); tick(P,O,Dd,2,{c:'var(--spark)'});
    if(v.t===90) markA(P,O,0,90,{r:.4});
    dt(P,A,'A',{dx:-16}); dt(P,B,'B',{dy:16}); dt(P,C,'C'); dt(P,Dd,'D'); return P.svg(); },
  info:v=>{ const eq=v.l===6, pe=v.t===90; const n=eq&&pe?'un <b>carré</b> (4 axes de symétrie)':eq?'un <b>rectangle</b> (2 axes de symétrie)':pe?'un <b>losange</b> (2 axes de symétrie)':'un <b>parallélogramme</b> (aucun axe de symétrie)';
    return `Diagonales qui se coupent en leur milieu${eq?', de même longueur':''}${pe?', perpendiculaires':''} : c’est ${n}.`; }},
 {h:'Quel quadrilatère ?',p:'Les diagonales d’un quadrilatère se coupent en leur milieu et sont perpendiculaires, mais elles n’ont pas la même longueur. C’est…',
  opts:['un rectangle','un losange','un carré','un trapèze quelconque'],ans:1,
  why:'Diagonales qui se coupent en leur milieu : parallélogramme. Perpendiculaires en plus : losange. Il faudrait aussi la même longueur pour un carré.'},
 {kind:'Théorie',h:'La somme des angles d’un triangle',p:`<p>Découpe un triangle en papier, déchire ses trois coins et pose-les côte à côte, pointes réunies. Quel que soit ton triangle, les trois coins forment un angle plat. Ce n’est pas un hasard.</p>
<div class="thm"><p>Dans tout triangle, la somme des trois angles vaut <b>180°</b>. Dans tout quadrilatère, elle vaut <b>360°</b>.</p></div>
<div class="why"><p>Un rectangle a quatre angles droits : 4 × 90° = 360°. Sa diagonale le coupe en deux triangles rectangles identiques, qui se partagent ces 360° : 180° chacun. Un autre triangle se coupe en deux triangles rectangles par la perpendiculaire tracée depuis le sommet de son plus grand angle : 180° + 180° = 360°, moins les deux angles droits du pied, qui ne sont pas des angles du grand triangle : 360° − 180° = 180°. Enfin, une diagonale coupe un quadrilatère en deux triangles : 2 × 180° = 360°.</p></div>
<div class="prop"><p>Conséquences : dans un triangle <b>équilatéral</b>, chaque angle vaut 180° : 3 = 60°. Dans un triangle <b>isocèle</b>, les deux angles à la base sont égaux (l’axe de symétrie les pose l’un sur l’autre). Dans un triangle <b>rectangle</b>, les deux angles aigus font ensemble 180° − 90° = 90°.</p></div>
<div class="ex"><p>Deux angles de 50° et 70° : le troisième vaut 180° − 50° − 70° = 60°.</p></div>`,
  params:[{id:'x',l:'Position de C (gauche-droite)',min:0,max:8,step:.5,v:5},{id:'y',l:'Hauteur de C',min:1,max:4,step:.5,v:2.5}],
  draw:v=>{ const P=plane({x:[-4.5,4.5],y:[-3.7,3],grid:false,axes:false}), A=[-3,-1.5], B=[3,-1.5], C=[v.x-4,-1.5+v.y];
    const g=round180([angAt(A,B,C),angAt(B,C,A),angAt(C,A,B)]);
    P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.08});
    mark(P,A,B,C,{r:.6,c:'var(--accent)',arc:true}); mark(P,B,C,A,{r:.6,c:'var(--math)',arc:true}); mark(P,C,A,B,{r:.6,c:'var(--spark)',arc:true});
    dt(P,A,'A',{dx:-16,dy:14,c:'var(--accent)'}); dt(P,B,'B',{dy:14,c:'var(--math)'}); dt(P,C,'C',{c:'var(--spark)'});
    const F=[0,-3.5]; markA(P,F,0,g[1],{r:1.2,c:'var(--math)',arc:true}); markA(P,F,g[1],g[1]+g[2],{r:1.2,c:'var(--spark)',arc:true}); markA(P,F,g[1]+g[2],180,{r:1.2,c:'var(--accent)',arc:true});
    P.seg(-1.6,-3.5,1.6,-3.5,{c:'var(--ink)',w:1.5}); return P.svg(); },
  info:v=>{ const A=[-3,-1.5], B=[3,-1.5], C=[v.x-4,-1.5+v.y]; const g=round180([angAt(A,B,C),angAt(B,C,A),angAt(C,A,B)]);
    return `∠A ≈ ${g[0]}°, ∠B ≈ ${g[1]}°, ∠C ≈ ${g[2]}°. Somme : ${g[0]} + ${g[1]} + ${g[2]} = 180°. En bas, les trois angles mis bout à bout forment un angle plat.`; }},
 {kind:'Méthode',h:'Calculer un angle manquant',p:`<b>Quand :</b> on connaît certains angles d’un triangle ou d’un quadrilatère et on cherche les autres. <b>Pourquoi ça marche :</b> la somme est toujours 180° dans un triangle et 360° dans un quadrilatère ; un triangle particulier donne en plus des angles égaux (60° partout pour l’équilatéral, deux angles à la base égaux pour l’isocèle, deux angles aigus qui font 90° pour le rectangle). <b>Comment :</b> 1) repère la figure et sa nature ; 2) écris les angles connus et les angles égaux ; 3) calcule la somme totale moins les angles connus, puis divise par 2 s’il reste deux angles égaux ; 4) vérifie la somme et rédige une phrase réponse.`,
  fig:(()=>{ const P=plane({x:[-3,3],y:[-.7,4.8],grid:false,axes:false}), B=[-1.5,0], C=[1.5,0], A=[0,1.5*Math.tan(70*D)];
    P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.1}); tick(P,A,B); tick(P,A,C);
    mark(P,A,B,C,{r:.7,c:'var(--accent)',l:'40°',ld:.5}); mark(P,B,C,A,{r:.5,c:'var(--spark)'}); mark(P,C,A,B,{r:.5,c:'var(--spark)'});
    dt(P,A,'A',{c:'var(--ink)'}); dt(P,B,'B',{dx:-16,dy:14,c:'var(--ink)'}); dt(P,C,'C',{dy:14,c:'var(--ink)'}); return P.svg(); })(),
  demo:{enonce:'Le triangle ABC est isocèle en A et ∠BAC = 40°. Calculer ∠ABC et ∠ACB.',
   etapes:[
    {f:'Isocèle en A : ∠ABC = ∠ACB.',w:'Les angles à la base d’un triangle isocèle sont égaux.'},
    {f:'∠ABC + ∠ACB = 180° − 40° = 140°',w:'Les trois angles font 180° : on retire l’angle connu.'},
    {f:'∠ABC = ∠ACB = 140° : 2 = 70°',w:'Les deux angles égaux se partagent ce qui reste.'},
    {f:'Contrôle : 40° + 70° + 70° = 180° ✓',w:'Une vérification rapide évite les erreurs de calcul.'}],
   conclusion:'Les angles à la base mesurent 70° chacun. Pour un quadrilatère, même démarche avec 360° : si trois angles mesurent 90°, 110° et 75°, le quatrième vaut 360° − 90° − 110° − 75° = 85°.'}},
 {h:'À toi : le triangle isocèle',p:'Dans un triangle isocèle, chacun des deux angles à la base mesure 52°. Combien mesure l’angle au sommet principal ?',lab:'angle =',unit:'°',ans:76,
  why:'Les deux angles à la base font 52° + 52° = 104°. Il reste 180° − 104° = 76° pour l’angle au sommet principal.'},
 {kind:'Défi',h:'Les angles du pentagone',p:'Un pentagone a 5 côtés et 5 angles. Que vaut la somme de ses 5 angles ? Conseil de chercheur : commence par des cas plus simples.',lab:'somme =',unit:'°',ans:540,
  fig:(()=>{ const P=plane({x:[-3,3],y:[-2.6,3],grid:false,axes:false}), O=[0,.1], S=[0,1,2,3,4].map(k=>pt(O,2.6,90+72*k));
    P.poly(S,{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.1}); sg(P,S[0],S[2],{c:'var(--spark)',w:2,dash:true}); sg(P,S[0],S[3],{c:'var(--spark)',w:2,dash:true}); return P.svg(); })(),
  why:'Stratégie : commencer par un cas plus simple. Un triangle : 180°. Un quadrilatère se coupe en 2 triangles depuis un sommet : 360°. Un pentagone se coupe en 3 triangles : 3 × 180° = 540°. À chaque côté de plus, on gagne un triangle, donc 180°.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : angles et figures',p:`<div class="keep"><ul>
<li><b>Droite</b> (AB) sans fin des deux côtés, <b>segment</b> [AB] entre A et B (longueur AB), <b>demi-droite</b> [AB) d’origine A.</li>
<li><b>Angle</b> ∠AOB : sommet O au milieu. Nul 0°, aigu &lt; 90°, droit 90°, obtus entre 90° et 180°, plat 180°, rentrant entre 180° et 360°, plein 360°.</li>
<li><b>Rapporteur</b> : estimer, centre sur le sommet, 0 sur un côté, lire la graduation qui part de ce 0.</li>
<li><b>Perpendiculaires</b> ⊥ : angle droit. <b>Parallèles</b> // : jamais de point commun. Deux perpendiculaires à une même droite sont parallèles.</li>
<li><b>Constructions</b> : perpendiculaire à l’équerre ou au compas (arc centré en A, puis deux arcs de même ouverture) ; parallèle = perpendiculaire à la perpendiculaire.</li>
<li><b>Triangles</b> : isocèle (2 côtés égaux, 1 axe), équilatéral (3 côtés égaux, 3 axes), rectangle, obtusangle, acutangle.</li>
<li><b>Quadrilatères</b> : diagonales qui se coupent en leur milieu = parallélogramme ; + même longueur = rectangle ; + perpendiculaires = losange ; les trois = carré.</li>
<li><b>Sommes</b> : 180° dans un triangle, 360° dans un quadrilatère. Équilatéral : 60° partout ; isocèle : angles à la base égaux ; rectangle : angles aigus qui font 90° ensemble.</li>
</ul></div>`},
 {kind:'Problème',h:'Le module de skate',p:'Au skatepark, le module « pyramide » a un profil en forme de trapèze isocèle ABCD : la base [AB] est posée au sol et le plateau [DC] est parallèle au sol. La rampe [AD] monte avec un angle ∠DAB = 30°, la rampe [BC] descend avec ∠ABC = 30°. Un pilier [DH] soutient le plateau : H est sur le sol et (DH) ⊥ (AB).',
  fig:(()=>{ const P=plane({x:[-4.6,4.6],y:[-.8,2.4],grid:false,axes:false}), A=[-4,0], B=[4,0], h=1.6, Dd=[-4+h/Math.tan(30*D),h], C=[4-h/Math.tan(30*D),h], H=[Dd[0],0];
    P.poly([A,B,C,Dd],{c:'var(--accent)',w:3,fill:'var(--accent)',fo:.15}); sg(P,Dd,H,{c:'var(--math)',w:2,dash:true}); markA(P,H,0,90,{r:.3});
    mark(P,A,B,Dd,{r:.8,l:'30°',ld:.6}); mark(P,B,C,A,{r:.8,l:'30°',ld:.6});
    dt(P,A,'A',{dx:-14,dy:14,c:'var(--ink)'}); dt(P,B,'B',{dy:14,c:'var(--ink)'}); dt(P,C,'C',{c:'var(--ink)'}); dt(P,Dd,'D',{dx:-16,c:'var(--ink)'}); dt(P,H,'H',{dy:14,c:'var(--math)'}); return P.svg(); })(),
  parts:[
   {q:'a) De quel type est l’angle ∠DAB de 30° ?',opts:['aigu','droit','obtus','plat'],ans:0,hint:'Compare 30° avec 90°.',why:'30° est plus petit que 90° : l’angle est aigu.'},
   {q:'b) Le triangle ADH est rectangle en H. Combien mesure ∠ADH ?',lab:'∠ADH =',unit:'°',ans:60,hint:'Dans un triangle rectangle, les deux angles aigus font ensemble 90°.',why:'∠ADH = 90° − 30° = 60°.'},
   {q:'c) Pourquoi l’angle ∠HDC est-il droit ?',opts:['Parce que [DH] est plus court que [DC]','Parce que le trapèze est isocèle','Parce que 30° + 60° = 90°','Parce que (DC) // (AB) et (DH) ⊥ (AB) : une perpendiculaire à l’une de deux parallèles est perpendiculaire à l’autre'],ans:3,hint:'Regarde les positions des droites (DC), (AB) et (DH).',why:'(DC) est parallèle au sol (AB) et le pilier est perpendiculaire au sol : il est donc aussi perpendiculaire au plateau.'},
   {q:'d) Combien mesure l’angle ∠ADC, entre la rampe et le plateau ?',lab:'∠ADC =',unit:'°',ans:150,hint:'∠ADC = ∠ADH + ∠HDC.',why:'∠ADC = 60° + 90° = 150°.'}],
  sol:'a) 30° &lt; 90° : ∠DAB est aigu.<br>b) Dans le triangle ADH rectangle en H, les angles aigus font 90° : ∠ADH = 90° − 30° = 60°.<br>c) (DC) // (AB) et (DH) ⊥ (AB), donc (DH) ⊥ (DC) : ∠HDC = 90°.<br>d) ∠ADC = ∠ADH + ∠HDC = 60° + 90° = 150°.<br>Contrôle avec la somme du quadrilatère : par symétrie ∠BCD = 150° aussi, et 30° + 30° + 150° + 150° = 360° ✓.'},
 {kind:'Problème',h:'Le logo du club d’escalade',p:'Le logo d’un club d’escalade est dessiné dans un carré ABCD. À l’intérieur du carré, on construit le triangle équilatéral ABE sur le côté [AB]. Puis on relie E aux sommets D et C. On cherche les angles du triangle DEC, en haut du logo.',
  fig:(()=>{ const P=plane({x:[-.8,4.8],y:[-.7,4.7],grid:false,axes:false}), A=[0,0], B=[4,0], C=[4,4], Dd=[0,4], E=[2,2*Math.sqrt(3)];
    P.poly([A,B,C,Dd],{c:'var(--ink)',w:2.5}); P.poly([A,B,E],{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.15}); P.poly([Dd,E,C],{c:'var(--spark)',w:2.5,fill:'var(--spark)',fo:.15}); sg(P,Dd,E,{c:'var(--math)',w:2.5});
    tick(P,A,B); tick(P,B,E); tick(P,A,E); markA(P,Dd,-90,0,{r:.35});
    dt(P,A,'A',{dx:-16,dy:14,c:'var(--ink)'}); dt(P,B,'B',{dy:14,c:'var(--ink)'}); dt(P,C,'C',{c:'var(--ink)'}); dt(P,Dd,'D',{dx:-16,c:'var(--ink)'}); dt(P,E,'E',{dy:20,dx:-4,c:'var(--ink)'}); return P.svg(); })(),
  parts:[
   {q:'a) Combien mesure l’angle ∠DAE ?',lab:'∠DAE =',unit:'°',ans:30,hint:'∠DAB est un angle du carré, ∠EAB est un angle du triangle équilatéral.',why:'∠DAE = ∠DAB − ∠EAB = 90° − 60° = 30°.'},
   {q:'b) Pourquoi le triangle ADE est-il isocèle en A ?',opts:['Parce que ∠DAE = 30°','Parce que E est au centre du carré','Parce que AD = AB (côtés du carré) et AB = AE (côtés du triangle équilatéral), donc AD = AE','Parce que tous les triangles dessinés dans un carré sont isocèles'],ans:2,hint:'Compare les longueurs AD, AB et AE.',why:'AD = AB car ABCD est un carré, et AB = AE car ABE est équilatéral. Donc AD = AE.'},
   {q:'c) Combien mesure l’angle ∠ADE ?',lab:'∠ADE =',unit:'°',ans:75,hint:'Dans ADE isocèle en A, les deux angles à la base sont égaux et se partagent 180° − 30°.',why:'(180° − 30°) : 2 = 150° : 2 = 75°.'},
   {q:'d) Combien mesure l’angle ∠EDC ?',lab:'∠EDC =',unit:'°',ans:15,hint:'∠ADC est un angle droit du carré.',why:'∠EDC = ∠ADC − ∠ADE = 90° − 75° = 15°.'},
   {q:'e) Par symétrie, ∠ECD = ∠EDC. Combien mesure l’angle ∠DEC ?',lab:'∠DEC =',unit:'°',ans:150,hint:'Somme des angles du triangle DEC.',why:'∠DEC = 180° − 15° − 15° = 150°.'}],
  sol:'Dans le carré, ∠DAB = 90°. Dans le triangle équilatéral, ∠EAB = 60°, donc ∠DAE = 90° − 60° = 30°.<br>AD = AB (carré) et AB = AE (équilatéral), donc AD = AE : le triangle ADE est isocèle en A.<br>Ses angles à la base valent (180° − 30°) : 2 = 75°, donc ∠ADE = 75°.<br>Alors ∠EDC = 90° − 75° = 15°, et de même ∠ECD = 15°.<br>Enfin ∠DEC = 180° − 15° − 15° = 150°. Le triangle DEC est isocèle en E, avec un angle obtus de 150°.'}
]},
/* =====================================================================
   CHAPITRE 4 : DROITES REMARQUABLES ET CONSTRUCTIONS
   ===================================================================== */
{subj:'sec', sem:'a9', id:'sec9-droites', o:4, h:'Droites remarquables et constructions', p:'Médiatrice, bissectrice, hauteur et médiane, cercles circonscrit et inscrit, segment moyen, dessin à l’échelle et construction d’une figure d’après une description.', steps:[
 {kind:'Théorie',h:'La médiatrice d’un segment',p:`<p>Léa habite en A, Tom en B. Ils veulent se retrouver en un point situé exactement à la même distance de chez l’un et de chez l’autre. Le milieu de [AB] convient… mais il y a bien d’autres points possibles. Où sont-ils tous ?</p>
<div class="def"><p>La <b>médiatrice</b> du segment [AB] est la droite perpendiculaire à [AB] qui passe par son milieu.</p></div>
<div class="prop"><p>Un point M est sur la médiatrice de [AB] exactement quand il est à la même distance de A et de B : MA = MB. On dit que M est <b>équidistant</b> de A et de B.</p></div>
<div class="why"><p>Plie la feuille pour que A tombe sur B. Le pli passe par le milieu de [AB] et lui est perpendiculaire : c’est la médiatrice. Un point M du pli reste sur place, et le segment [MA] se pose exactement sur [MB] : ils ont la même longueur.</p></div>
<div class="ex"><p>Avec AB = 6 cm, la médiatrice coupe [AB] à 3 cm de A. Place M sur la médiatrice, 4 cm au-dessus du milieu : MA = MB = 5 cm. Pousse-le ensuite vers la droite : il se rapproche de B, et MB devient plus petit que MA.</p></div>
<div class="warn"><p>Le milieu n’est qu’un des points équidistants. La réponse à la question de Léa et Tom, c’est toute une droite.</p></div>`,
  params:[{id:'e',l:'Position de M (gauche-droite)',min:1,max:7,step:.5,v:5},{id:'m',l:'Hauteur de M',min:0,max:8,step:.5,v:6}],
  draw:v=>{ const P=plane({x:[-4.5,4.5],y:[-4.5,4.5],grid:false,axes:false}), A=[-3,0], B=[3,0], M=[v.e-4,v.m-4];
    line(P,[0,-1],[0,1],{c:'var(--math)',dash:true}); markA(P,[0,0],0,90,{r:.35}); tick(P,A,[0,0]); tick(P,[0,0],B);
    sg(P,A,B,{c:'var(--ink)',w:3}); sg(P,M,A,{c:'var(--accent)',w:2}); sg(P,M,B,{c:'var(--spark)',w:2});
    dt(P,A,'A',{c:'var(--ink)',dx:-16,dy:16}); dt(P,B,'B',{c:'var(--ink)',dy:16}); dt(P,M,'M',{c:'var(--math)'}); P.text(.15,4.1,'médiatrice',{s:11,c:'var(--math)'}); return P.svg(); },
  info:v=>{ const MA=Math.hypot(v.e-1,v.m-4), MB=Math.hypot(v.e-7,v.m-4);
    return `MA ≈ ${fmt(MA,1)} cm et MB ≈ ${fmt(MB,1)} cm : ${v.e===4?'M est sur la médiatrice, il est <b>équidistant</b> de A et de B.':v.e>4?'M n’est pas sur la médiatrice, il est plus près de B.':'M n’est pas sur la médiatrice, il est plus près de A.'}`; }},
 {kind:'Méthode',h:'Construire la médiatrice au compas',p:`<b>Quand :</b> pour tracer la médiatrice d’un segment, trouver son milieu avec précision, ou trouver des points à la même distance de deux points. <b>Pourquoi ça marche :</b> avec la même ouverture de compas, chaque point où les arcs se croisent est à la même distance de A et de B ; il est donc sur la médiatrice. Deux de ces points suffisent pour tracer une droite. <b>Comment :</b> 1) prends une ouverture plus grande que la moitié de AB ; 2) pointe sur A, trace un arc au-dessus et un arc au-dessous du segment ; 3) même ouverture, pointe sur B et recommence : les arcs se croisent en P et en Q ; 4) trace (PQ) à la règle et code la figure.`,
  ...etapes('Le segment [AB] est donné.',
   ()=>{ const P=plane({x:[-4,4],y:[-3.2,3.2],grid:false,axes:false}); sg(P,[-2.5,0],[2.5,0],{c:'var(--ink)',w:3}); dt(P,[-2.5,0],'A',{c:'var(--ink)',dx:-16,dy:16}); dt(P,[2.5,0],'B',{c:'var(--ink)',dy:16}); return P; },
   [{t:'Ouverture plus grande que la moitié de AB. Pointe sur A : un arc au-dessus et un arc au-dessous du segment.',f:(P,c)=>{ arc(P,[-2.5,0],3.5,25,65,{c:hl(c)}); arc(P,[-2.5,0],3.5,-65,-25,{c:hl(c)}); }},
    {t:'Même ouverture, pointe sur B : les nouveaux arcs croisent les premiers en P et en Q.',f:(P,c)=>{ arc(P,[2.5,0],3.5,115,155,{c:hl(c)}); arc(P,[2.5,0],3.5,-155,-115,{c:hl(c)}); dt(P,[0,2.449],'P',{c:'var(--math)'}); dt(P,[0,-2.449],'Q',{c:'var(--math)'}); }},
    {t:'À la règle, trace (PQ) : c’est la médiatrice de [AB]. Elle coupe [AB] en son milieu I.',f:(P,c)=>{ line(P,[0,-2.449],[0,2.449],{c:c?'var(--spark)':'var(--math)'}); dt(P,[0,0],'I',{c:'var(--math)',dx:8,dy:16}); }},
    {t:'Code la figure : un angle droit en I et des petits traits égaux sur [AI] et [IB].',f:(P,c)=>{ markA(P,[0,0],0,90,{r:.35}); tick(P,[-2.5,0],[0,0]); tick(P,[0,0],[2.5,0]); }}]),
  demo:{enonce:'Construire la médiatrice de [AB], avec AB = 6 cm.',
   etapes:[
    {f:'On prend une ouverture de 4 cm, plus grande que 3 cm (la moitié de AB).',w:'Avec 3 cm ou moins, les arcs ne se croiseraient pas.'},
    {f:'Pointe sur A : un arc au-dessus et un arc au-dessous de [AB].',w:'Tous les points de ces arcs sont à 4 cm de A.'},
    {f:'Pointe sur B, même ouverture : deux arcs qui coupent les premiers en P et en Q.',w:'P et Q sont à 4 cm de A et à 4 cm de B : ils sont équidistants de A et de B.'},
    {f:'On trace (PQ), puis on code un angle droit et deux segments égaux.',w:'(PQ) coupe [AB] en son milieu, à 3 cm de A.'}],
   conclusion:'(PQ) est la médiatrice de [AB]. En prime, on a trouvé le milieu de [AB] sans mesurer.'}},
 {h:'Quelle ouverture ?',p:'Tu veux construire au compas la médiatrice d’un segment [AB] de 8 cm. Quelle ouverture de compas peux-tu choisir ?',
  opts:['2 cm','3 cm','5 cm','4 cm'],ans:2,
  why:'Il faut plus que la moitié de AB, donc plus de 4 cm : 5 cm convient. Avec exactement 4 cm, les arcs se touchent seulement au milieu ; avec moins, ils ne se croisent pas.'},
 {kind:'Méthode',h:'Construire la bissectrice d’un angle',p:`<p>Deux amis se partagent une part de gâteau en pointe : pour être juste, il faut couper l’angle de la pointe en deux angles égaux.</p>
<div class="def"><p>La <b>bissectrice</b> d’un angle est la demi-droite issue du sommet qui partage cet angle en deux angles égaux. Chacun de ses points est à la même distance des deux côtés de l’angle.</p></div>
<p><b>Quand :</b> pour couper un angle en deux sans rapporteur, ou pour trouver des points à égale distance de deux côtés. <b>Pourquoi ça marche :</b> l’arc centré au sommet O donne deux points M et N tels que OM = ON ; le point P où se croisent deux arcs de même ouverture centrés en M et en N est à la même distance de M et de N. Si on plie la feuille le long de (OP), M tombe sur N et les deux moitiés de l’angle se recouvrent. <b>Comment :</b> 1) pointe sur O : un arc coupe les deux côtés en M et N ; 2) une même ouverture, pointe sur M puis sur N : les arcs se croisent en P, à l’intérieur de l’angle ; 3) trace [OP).</p>`,
  ...(()=>{ const O=[-3.5,-1.8], M=pt(O,3,0), N=pt(O,3,70), I2=inter(M,2.6,N,2.6), Pp=dist(I2[0],O)>dist(I2[1],O)?I2[0]:I2[1], aM=dirA(M,Pp), aN=dirA(N,Pp);
   return etapes('L’angle xOy de 70° est donné.',
    ()=>{ const P=plane({x:[-4,4.2],y:[-2.5,3.8],grid:false,axes:false}); ray(P,O,pt(O,6,0),{c:'var(--ink)'},.1); ray(P,O,pt(O,5,70),{c:'var(--ink)'},.1);
      dt(P,O,'O',{c:'var(--ink)',dx:-16,dy:14}); P.text(...pt(O,6.6,0),'x',{dy:5,c:'var(--muted)'}); P.text(...pt(O,5.1,70),'y',{dx:8,c:'var(--muted)'}); return P; },
    [{t:'Pointe sur O : un arc coupe les côtés en M et N. On a OM = ON.',f:(P,c)=>{ arc(P,O,3,-8,78,{c:hl(c)}); dt(P,M,'M',{c:'var(--math)',dy:16}); dt(P,N,'N',{c:'var(--math)',dx:-18}); }},
     {t:'Pointe sur M : trace un arc à l’intérieur de l’angle.',f:(P,c)=>arc(P,M,2.6,aM-22,aM+22,{c:hl(c)})},
     {t:'Même ouverture, pointe sur N : l’arc croise le précédent en P.',f:(P,c)=>{ arc(P,N,2.6,aN-22,aN+22,{c:hl(c)}); dt(P,Pp,'P',{c:'var(--math)'}); }},
     {t:'Trace [OP) : c’est la bissectrice. Les deux angles obtenus mesurent 70° : 2 = 35° chacun.',f:(P,c)=>{ ray(P,O,Pp,{c:c?'var(--spark)':'var(--accent)'},1.5); markA(P,O,0,35,{r:1.1,c:'var(--ok)',l:'35°',ld:.5}); markA(P,O,35,70,{r:1.4,c:'var(--other)',l:'35°',ld:.5}); }}]); })(),
  demo:{enonce:'Tracer la bissectrice d’un angle xOy de 70°.',
   etapes:[
    {f:'Pointe sur O, ouverture quelconque : l’arc coupe [Ox) en M et [Oy) en N.',w:'OM = ON : c’est le même rayon.'},
    {f:'Pointe sur M, puis sur N, avec une même ouverture : les deux arcs se croisent en P.',w:'P est à la même distance de M et de N.'},
    {f:'Trace [OP).',w:'La figure est symétrique par rapport à (OP) : les deux moitiés de l’angle se recouvrent.'}],
   conclusion:'[OP) est la bissectrice. Chaque moitié mesure 70° : 2 = 35°, ce que tu peux contrôler au rapporteur.'}},
 {h:'La moitié de l’angle',p:'Dans le triangle ABC, ∠A = 64° et ∠B = 48°. On trace la bissectrice de l’angle C. Combien mesure chacun des deux angles qu’elle forme en C ?',lab:'angle =',unit:'°',ans:34,
  why:'D’abord ∠C = 180° − 64° − 48° = 68° (somme des angles d’un triangle). La bissectrice le coupe en deux : 68° : 2 = 34°.'},
 {kind:'Théorie',h:'Hauteurs et médianes',p:`<p>Pour mesurer la hauteur d’une tente, tu ne mesures pas le long de la toile qui penche : tu mesures tout droit, du sommet jusqu’au sol, à angle droit. En géométrie, c’est une <b>hauteur</b>.</p>
<div class="def"><p>La <b>hauteur</b> issue du sommet C est la droite qui passe par C et qui est perpendiculaire au côté opposé [AB]. Le point H où elle coupe (AB) est le <b>pied</b> de la hauteur. La <b>médiane</b> issue de C est le segment qui joint C au milieu I du côté opposé. Un triangle a trois hauteurs et trois médianes, une par sommet.</p></div>
<div class="idea"><p>La hauteur dit à quelle distance le sommet se trouve du côté opposé. La médiane coupe le côté opposé en deux moitiés égales.</p></div>
<div class="ex"><p>Pour tracer la hauteur issue de C, trace la perpendiculaire à (AB) passant par C, à l’équerre ou au compas, comme au chapitre précédent. Pour la médiane, trouve le milieu de [AB] (en mesurant, ou avec la médiatrice), puis relie-le à C. Dans un triangle rectangle en A, la hauteur issue de C est le côté [CA] lui-même.</p></div>
<div class="warn"><p>Si le triangle a un angle obtus, une hauteur peut tomber à l’extérieur : il faut prolonger le côté en pointillés. Bouge C au-delà de A ou de B pour le voir. Hauteur et médiane sont en général différentes. Exception : dans un triangle isocèle, l’axe de symétrie est à la fois la hauteur et la médiane issues du sommet principal, la bissectrice de son angle et la médiatrice de la base.</p></div>`,
  params:[{id:'x',l:'Position de C',min:0,max:8,step:.5,v:5}],
  draw:v=>{ const P=plane({x:[-4.6,4.6],y:[-2.4,2.9],grid:false,axes:false}), A=[-2,-1.5], B=[2,-1.5], C=[v.x-4,2.2], H=[v.x-4,-1.5], I=[0,-1.5];
    if(v.x<2) sg(P,H,A,{c:'var(--muted)',w:2,dash:true}); if(v.x>6) sg(P,B,H,{c:'var(--muted)',w:2,dash:true});
    P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.1}); sg(P,C,H,{c:'var(--accent)',w:2.5}); sg(P,C,I,{c:'var(--spark)',w:2.5});
    markA(P,H,0,90,{r:.3,c:'var(--accent)'}); tick(P,A,I,1,{c:'var(--spark)'}); tick(P,I,B,1,{c:'var(--spark)'});
    dt(P,A,'A',{c:'var(--ink)',dx:-16,dy:14}); dt(P,B,'B',{c:'var(--ink)',dy:14}); dt(P,C,'C',{c:'var(--ink)'}); dt(P,H,'H',{c:'var(--accent)',dx:-6,dy:18}); dt(P,I,'I',{c:'var(--spark)',dx:4,dy:18});
    return P.svg(); },
  info:v=>`En bleu, la hauteur [CH] ; en orange, la médiane [CI]. ${v.x===4?'Le triangle est isocèle en C : hauteur et médiane sont confondues.':Math.abs(v.x-4)>2?'Le pied H est <b>en dehors</b> de [AB] : on a prolongé le côté.':Math.abs(v.x-4)===2?'Le triangle est rectangle : la hauteur est un côté.':'Le pied H est sur le côté [AB].'}`},
 {kind:'Théorie',h:'Trois droites, un seul point',p:`<p>Trois villages veulent construire une antenne à la même distance des trois. Il faut un point équidistant de A et de B, de B et de C, et de A et de C. Un tel point existe-t-il seulement ?</p>
<div class="thm"><p>Les trois <b>médiatrices</b> des côtés d’un triangle se coupent en un même point O : c’est le centre du <b>cercle circonscrit</b>, le cercle qui passe par les trois sommets. Les trois <b>bissectrices</b> des angles se coupent aussi en un même point I : c’est le centre du <b>cercle inscrit</b>, qui touche les trois côtés de l’intérieur.</p></div>
<div class="why"><p>O est sur la médiatrice de [AB], donc OA = OB. Il est sur la médiatrice de [BC], donc OB = OC. Alors OA = OC : O est forcément sur la troisième médiatrice ! Même idée pour I, avec les distances aux côtés.</p></div>
<div class="ex"><p>Dans un triangle rectangle, le centre du cercle circonscrit est le milieu de l’hypoténuse. Si le triangle a un angle obtus, ce centre est à l’extérieur du triangle. Le centre du cercle inscrit, lui, est toujours à l’intérieur.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Un archéologue qui trouve un morceau d’assiette ronde peut retrouver sa taille : il marque trois points sur le bord, trace deux médiatrices, et obtient le centre de l’assiette.</p></div>`,
  params:[{id:'k',l:'Droites (0 : médiatrices, 1 : bissectrices)',min:0,max:1,v:0},{id:'c',l:'Position de C',min:0,max:8,step:1,v:5}],
  draw:v=>{ const P=plane({x:[-5,5],y:[-4.2,5],grid:false,axes:false}), A=[-3,-1.5], B=[3,-1.5], C=[v.c-4,2], T=[A,B,C];
    if(v.k===0){ const O=circum(A,B,C), R=dist(O,A); P.circ(O[0],O[1],R,{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.06});
      [[A,B],[B,C],[C,A]].forEach(([X,Y])=>{ const m=mid(X,Y); line(P,m,[m[0]-(Y[1]-X[1]),m[1]+(Y[0]-X[0])],{c:'var(--math)',w:1.6,dash:true}); markA(P,m,dirA(m,Y),dirA(m,Y)+90,{r:.25,c:'var(--math)'}); });
      P.poly(T,{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.08}); dt(P,O,'O',{c:'var(--accent)'}); }
    else { const I=incenter(A,B,C), r=I[1]+1.5; P.poly(T,{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.08});
      T.forEach(X=>sg(P,X,[X[0]+(I[0]-X[0])*1.6,X[1]+(I[1]-X[1])*1.6],{c:'var(--math)',w:1.6,dash:true}));
      P.circ(I[0],I[1],r,{c:'var(--spark)',w:2.5,fill:'var(--spark)',fo:.08}); sg(P,I,[I[0],-1.5],{c:'var(--spark)',w:1.5}); dt(P,I,'I',{c:'var(--spark)'}); }
    dt(P,A,'A',{c:'var(--ink)',dx:-16,dy:14}); dt(P,B,'B',{c:'var(--ink)',dy:14}); dt(P,C,'C',{c:'var(--ink)'}); return P.svg(); },
  info:v=>{ const A=[-3,-1.5], B=[3,-1.5], C=[v.c-4,2];
    if(v.k===1){ const I=incenter(A,B,C); return `Les trois bissectrices passent par I. I est à ${fmt(I[1]+1.5,1)} unité de chaque côté : c’est le rayon du cercle inscrit.`; }
    const O=circum(A,B,C); return `Les trois médiatrices passent par O, et OA = OB = OC ≈ ${fmt(dist(O,A),1)}. ${Math.abs(v.c-4)===3?'Le triangle est rectangle : O est le milieu de l’hypoténuse.':Math.abs(v.c-4)>3?'Le triangle a un angle obtus : O est à l’extérieur.':'Ici, O est à l’intérieur du triangle.'}`; }},
 {kind:'Méthode',h:'Construire les cercles circonscrit et inscrit',p:`<b>Quand :</b> on cherche le cercle qui passe par trois points (cercle circonscrit), ou le plus grand cercle qui tient dans un triangle (cercle inscrit). <b>Pourquoi ça marche :</b> les trois droites se coupent au même point, donc <b>deux suffisent</b> ; la troisième sert de contrôle. <b>Cercle circonscrit :</b> 1) construis les médiatrices de deux côtés ; 2) elles se coupent en O ; 3) trace le cercle de centre O qui passe par A. <b>Cercle inscrit :</b> 1) construis les bissectrices de deux angles ; 2) elles se coupent en I ; 3) trace la perpendiculaire à un côté passant par I : elle coupe ce côté en T ; 4) trace le cercle de centre I et de rayon IT. Choisis le cercle avec le premier curseur, puis avance étape par étape.`,
  params:[{id:'c',l:'Cercle (0 : circonscrit, 1 : inscrit)',min:0,max:1,v:0},{id:'e',l:'Étape de la construction',min:0,max:4,v:0}],
  draw:v=>{ const P=plane({x:[-4.5,4.5],y:[-4,3.2],grid:false,axes:false}), A=[-3,-1.5], B=[3,-1.5], C=[.8,2.4];
    P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.08});
    if(v.c===0){ const O=circum(A,B,C);
      if(v.e>=1){ line(P,[0,-1.5],[0,0],{c:v.e===1?'var(--spark)':'var(--math)',w:1.8}); markA(P,[0,-1.5],0,90,{r:.25,c:'var(--math)'}); tick(P,A,[0,-1.5]); tick(P,[0,-1.5],B); }
      if(v.e>=2){ const m=mid(B,C); line(P,m,[m[0]-(C[1]-B[1]),m[1]+(C[0]-B[0])],{c:v.e===2?'var(--spark)':'var(--math)',w:1.8}); tick(P,B,m,2); tick(P,m,C,2); }
      if(v.e>=3) dt(P,O,'O',{c:'var(--accent)'});
      if(v.e>=4){ P.circ(O[0],O[1],dist(O,A),{c:'var(--accent)',w:2.5}); sg(P,O,A,{c:'var(--accent)',w:1.5,dash:true}); } }
    else { const I=incenter(A,B,C), T=[I[0],-1.5];
      if(v.e>=1) ray(P,A,I,{c:v.e===1?'var(--spark)':'var(--math)',w:1.8},2.5);
      if(v.e>=2) ray(P,B,I,{c:v.e===2?'var(--spark)':'var(--math)',w:1.8},2.5);
      if(v.e>=3){ dt(P,I,'I',{c:'var(--spark)'}); sg(P,I,T,{c:'var(--accent)',w:1.8}); markA(P,T,0,90,{r:.25,c:'var(--accent)'}); dt(P,T,'T',{c:'var(--accent)',dy:16}); }
      if(v.e>=4) P.circ(I[0],I[1],I[1]+1.5,{c:'var(--spark)',w:2.5}); }
    dt(P,A,'A',{c:'var(--ink)',dx:-16,dy:14}); dt(P,B,'B',{c:'var(--ink)',dy:14}); dt(P,C,'C',{c:'var(--ink)'}); return P.svg(); },
  info:v=>{ const t=v.c===0?['Le triangle ABC est donné.','Construis la médiatrice de [AB] (au compas, comme vu plus haut).','Construis la médiatrice de [BC].','Elles se coupent en O : le centre du cercle circonscrit.','Pointe du compas sur O, ouverture OA : le cercle passe par A, B et C.']:['Le triangle ABC est donné.','Construis la bissectrice de l’angle A.','Construis la bissectrice de l’angle B.','Elles se coupent en I. Trace la perpendiculaire à [AB] passant par I : elle coupe [AB] en T.','Pointe du compas sur I, ouverture IT : le cercle touche les trois côtés.'];
    return `<b>${v.e?'Étape '+v.e:'Départ'}.</b> ${t[v.e]}`; },
  demo:{enonce:'Construire le cercle inscrit dans un triangle ABC.',
   etapes:[
    {f:'Au compas, trace la bissectrice de l’angle A, puis celle de l’angle B.',w:'Chaque point d’une bissectrice est à la même distance des deux côtés de l’angle.'},
    {f:'Elles se coupent en I.',w:'I est à la même distance des trois côtés. Inutile de tracer la troisième bissectrice, sauf pour contrôler.'},
    {f:'Trace la perpendiculaire à [AB] passant par I : elle coupe [AB] en T.',w:'La distance de I à un côté se mesure perpendiculairement à ce côté.'},
    {f:'Pointe sur I, ouverture IT : trace le cercle.',w:'Il touche [AB] en T, et les deux autres côtés aussi, sans les traverser.'}],
   conclusion:'Le cercle de centre I et de rayon IT est le cercle inscrit.'},
  note:'Erreur fréquente : prendre IA comme rayon du cercle inscrit. Le cercle sortirait du triangle. Le rayon, c’est la distance de I à un côté.'},
 {h:'Le bon centre',p:'Trois arbres sont plantés aux sommets d’un triangle. Un jardinier veut placer un arroseur à la même distance des trois arbres. Où doit-il le mettre ?',
  opts:['Au point de rencontre des hauteurs','Au milieu du plus long côté','Au point de rencontre des médiatrices des côtés','Au point de rencontre des bissectrices'],ans:2,
  why:'Être à la même distance de deux points, c’est être sur leur médiatrice. Le point équidistant des trois sommets est le centre du cercle circonscrit : l’intersection des médiatrices.'},
 {kind:'Théorie',h:'Le segment moyen',p:`<p>Une tente canadienne a la forme d’un triangle. À mi-hauteur, une barre relie le milieu de la toile de gauche au milieu de la toile de droite. Elle est parallèle au sol, et deux fois plus courte que la largeur de la tente. Coïncidence ?</p>
<div class="thm"><p>Dans un triangle ABC, si M est le milieu de [AB] et N le milieu de [AC], alors le <b>segment moyen</b> [MN] est <b>parallèle</b> au troisième côté [BC] et mesure <b>la moitié</b> de sa longueur : MN = BC : 2.</p></div>
<div class="why"><p>Les trois milieux des côtés découpent le triangle en <b>4 petits triangles identiques</b>, que l’on peut poser l’un sur l’autre (les couleurs de la figure). Le côté [MN] du petit triangle du haut est donc aussi long que [BP] et que [PC], les deux moitiés de [BC]. Et le petit triangle AMN a les mêmes angles que ABC : [MN] penche exactement comme [BC], ils sont parallèles.</p></div>
<div class="ex"><p>Si BC = 9 cm, alors MN = 9 : 2 = 4,5 cm. Dans l’autre sens : si MN = 3,2 cm, alors BC = 2 × 3,2 = 6,4 cm.</p></div>
<div class="warn"><p>Il faut deux vrais milieux. Si M n’est pas exactement au milieu de [AB], le segment [MN] n’est en général plus parallèle à [BC].</p></div>`,
  params:[{id:'x',l:'Position de A (gauche-droite)',min:0,max:8,v:3},{id:'y',l:'Hauteur de A',min:1,max:5,v:4}],
  draw:v=>{ const P=plane({x:[-5,5],y:[-2.8,3.8],grid:true,axes:false}), B=[-4,-2], C=[4,-2], A=[v.x-4,-2+v.y], M=mid(A,B), N=mid(A,C), Pm=mid(B,C);
    P.poly([A,M,N],{c:null,fill:'var(--spark)',fo:.3}); P.poly([M,B,Pm],{c:null,fill:'var(--spark)',fo:.3}); P.poly([N,Pm,C],{c:null,fill:'var(--spark)',fo:.3}); P.poly([M,N,Pm],{c:null,fill:'var(--math)',fo:.2});
    P.poly([A,B,C],{c:'var(--ink)',w:2.5}); sg(P,M,N,{c:'var(--accent)',w:3.5}); tick(P,A,M); tick(P,M,B); tick(P,A,N,2); tick(P,N,C,2);
    dt(P,A,'A',{c:'var(--ink)'}); dt(P,B,'B',{c:'var(--ink)',dx:-14,dy:16}); dt(P,C,'C',{c:'var(--ink)',dy:16}); dt(P,M,'M',{c:'var(--accent)',dx:-18}); dt(P,N,'N',{c:'var(--accent)'}); dt(P,Pm,'P',{c:'var(--muted)',dy:16});
    return P.svg(); },
  info:()=>'BC = 8 cases et MN = 4 cases : MN = BC : 2, et (MN) // (BC). Bouge A : ça reste vrai.'},
 {kind:'Méthode',h:'Dessiner à l’échelle',p:`<div class="def"><p>Un <b>croquis</b> est un dessin à main levée, avec les mesures notées dessus : il sert à réfléchir. Un <b>dessin à l’échelle</b> est précis : toutes les longueurs réelles sont divisées (ou multipliées) par le même nombre. L’échelle <b>1:100</b> (lire « un pour cent ») veut dire que 1 cm sur le dessin représente 100 cm, soit 1 m, en vrai. L’échelle 1:1, c’est la grandeur réelle ; 1:2, deux fois plus petit ; 2:1, deux fois plus grand.</p></div>
<p><b>Quand :</b> plan d’une chambre, carte, maquette, schéma d’un objet trop grand ou trop petit pour ta feuille. <b>Pourquoi ça marche :</b> toutes les longueurs sont divisées par le même nombre, donc la forme ne change pas et les angles restent les mêmes. <b>Comment :</b> 1) écris la longueur réelle dans la même unité que le dessin, souvent en cm ; 2) divise par le nombre de l’échelle pour passer du réel au dessin, multiplie pour passer du dessin au réel ; 3) rédige : phrase, calcul, réponse avec l’unité.</p>
<div class="blk" data-t="Le savais-tu ?"><p>Les cartes de randonnée sont souvent à l’échelle 1:25 000 : 1 cm sur la carte représente 25 000 cm, soit 250 m sur le terrain.</p></div>`,
  fig:(()=>{ const P=plane({x:[-.8,10.2],y:[-1,7.8],grid:false,axes:false});
    P.rect(0,0,8.4,7,{c:'var(--ink)',w:3,fill:'var(--sci)',fo:.08}); P.seg(5.6,0,7.4,0,{c:'var(--surface)',w:5}); arc(P,[5.6,0],1.8,0,90,{c:'var(--muted)',w:1.5,dash:true}); P.seg(5.6,0,5.6,1.8,{c:'var(--muted)',w:1.5});
    P.text(4.2,7,'8,4 cm',{a:'middle',dy:-6,s:12,c:'var(--accent)'}).text(8.4,3.5,'7 cm',{dx:6,s:12,c:'var(--accent)'}).text(6.5,0,'porte 1,8 cm',{a:'middle',dy:16,s:11,c:'var(--muted)'}).text(2.4,3.5,'échelle 1:50',{a:'middle',s:12,c:'var(--muted)'});
    return P.svg(); })(),
  demo:{enonce:'Ta chambre mesure 4,2 m sur 3,5 m. Dessine-la à l’échelle 1:50. Sur ce plan, la porte mesure 1,8 cm : quelle est sa largeur réelle ?',
   etapes:[
    {f:'4,2 m = 420 cm et 3,5 m = 350 cm',w:'On travaille dans la même unité que le dessin.'},
    {f:'420 : 50 = 8,4 cm et 350 : 50 = 7 cm',w:'Du réel vers le dessin, on divise par 50.'},
    {f:'Porte : 1,8 × 50 = 90 cm',w:'Du dessin vers le réel, on multiplie par 50.'}],
   conclusion:'Le plan est un rectangle de 8,4 cm sur 7 cm, et la porte mesure 90 cm de large en vrai.'}},
 {h:'Le terrain de foot',p:'Un terrain de football mesure 100 m de long. Tu le dessines à l’échelle 1:500. Quelle longueur mesure-t-il sur ta feuille ?',lab:'longueur =',unit:'cm',ans:20,
  why:'100 m = 10 000 cm. Du réel vers le dessin, on divise par 500 : 10 000 : 500 = 20 cm.'},
 {kind:'Méthode',h:'Construire un triangle d’après une description',p:`<b>Quand :</b> un énoncé décrit une figure avec des mots et des mesures, par exemple « le triangle ABC tel que AB = 6 cm, AC = 4 cm et BC = 5 cm ». <b>Comment :</b> 1) fais d’abord un <b>croquis</b> à main levée et note les mesures dessus ; 2) trace un côté entier à la règle, en général le plus long ; 3) place le dernier sommet : au <b>compas</b> si on connaît des longueurs (un arc par longueur, le sommet est au croisement), au <b>rapporteur</b> si on connaît des angles ; 4) relie, code et contrôle les mesures. <b>Pourquoi ça marche :</b> tous les points à 4 cm de A sont sur le cercle de centre A et de rayon 4 cm ; tous ceux à 5 cm de B sont sur le cercle de centre B et de rayon 5 cm. Le sommet C doit être sur les deux à la fois.`,
  ...etapes('Le croquis est fait : AB = 6 cm, AC = 4 cm, BC = 5 cm.',
   ()=>plane({x:[-4,4],y:[-2.4,2.6],grid:false,axes:false}),
   [{t:'Trace [AB] = 6 cm à la règle.',f:(P,c)=>{ sg(P,[-3,-1.5],[3,-1.5],{c:c?'var(--spark)':'var(--ink)',w:3}); dt(P,[-3,-1.5],'A',{c:'var(--ink)',dx:-16,dy:14}); dt(P,[3,-1.5],'B',{c:'var(--ink)',dy:14}); }},
    {t:'Compas ouvert à 4 cm, pointe sur A : trace un arc au-dessus de [AB].',f:(P,c)=>arc(P,[-3,-1.5],4,35,80,{c:hl(c)})},
    {t:'Compas ouvert à 5 cm, pointe sur B : l’arc croise le premier en C.',f:(P,c)=>{ arc(P,[3,-1.5],5,122,158,{c:hl(c)}); dt(P,[-.75,1.807],'C',{c:'var(--math)'}); }},
    {t:'Relie C à A et à B, puis contrôle : AC = 4 cm et BC = 5 cm.',f:(P,c)=>{ sg(P,[-3,-1.5],[-.75,1.807],{c:'var(--accent)',w:3}); sg(P,[3,-1.5],[-.75,1.807],{c:'var(--accent)',w:3}); }}]),
  demo:{enonce:'Construire le triangle ABC tel que AB = 6 cm, AC = 4 cm et BC = 5 cm.',
   etapes:[
    {f:'Croquis à main levée avec les trois longueurs.',w:'Il montre quel côté tracer en premier et où chercher C.'},
    {f:'Trace [AB] = 6 cm, le plus long côté.',w:'On part d’un côté connu en entier.'},
    {f:'Arc de centre A et de rayon 4 cm, puis arc de centre B et de rayon 5 cm : ils se croisent en C.',w:'C est à 4 cm de A et à 5 cm de B.'},
    {f:'Trace [AC] et [BC], puis mesure pour contrôler.',w:'Un bon dessin donne les bonnes longueurs à 1 mm près.'}],
   conclusion:'Le triangle est construit. Il y avait aussi une solution de l’autre côté de [AB], symétrique de la première.'},
  note:'Si une longueur est plus grande que la somme des deux autres (par exemple 2 cm, 3 cm et 7 cm), les arcs ne se croisent pas : le triangle est impossible.'},
 {kind:'Pratique',h:'Place le sommet C',p:'Description : « ABC est un triangle isocèle en C, sa base [AB] mesure 6 cases et ses côtés [CA] et [CB] mesurent 5 cases chacun. » Place C au-dessus de [AB] avec les curseurs.',
  params:[{id:'x',l:'Cases vers la droite',min:0,max:10,v:7},{id:'y',l:'Cases vers le haut',min:0,max:9,v:3}],
  draw:v=>{ const P=plane({x:[-.5,10.5],y:[-.5,9.5],grid:true,axes:false}), A=[2,1], B=[8,1], C=[v.x,v.y];
    P.poly([A,B,C],{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.12}); dt(P,A,'A',{c:'var(--ink)',dx:-16,dy:16}); dt(P,B,'B',{c:'var(--ink)',dy:16}); dt(P,C,'C',{c:'var(--spark)'}); return P.svg(); },
  info:v=>`CA ≈ ${fmt(Math.hypot(v.x-2,v.y-1),1)} cases et CB ≈ ${fmt(Math.hypot(v.x-8,v.y-1),1)} cases.`,
  ok:v=>v.x===5&&v.y===5,why:'CA = CB, donc C est sur la médiatrice de [AB] : la verticale qui passe par le milieu de [AB], 3 cases à droite de A. En montant sur cette verticale, on lit CA = 5 cases quand C est 4 cases au-dessus de [AB]. Le point symétrique, 4 cases au-dessous, conviendrait aussi.'},
 {kind:'Défi',h:'Le triangle des milieux',p:'Un triangle a des côtés de 10 cm, 8 cm et 6 cm. On relie les milieux de ses trois côtés : on obtient un petit triangle. On recommence dans ce petit triangle, ce qui donne un triangle encore plus petit. Quel est le périmètre de ce tout petit triangle ?',lab:'périmètre =',unit:'cm',ans:6,
  fig:(()=>{ const P=plane({x:[-.5,8.5],y:[-.5,6.5],grid:false,axes:false}), A=[0,0], B=[8,0], C=[0,6]; let T=[A,B,C];
    ['var(--ink)','var(--accent)','var(--spark)'].forEach(c=>{ P.poly(T,{c,w:2.5,fill:c,fo:.1}); T=[mid(T[0],T[1]),mid(T[1],T[2]),mid(T[2],T[0])]; }); return P.svg(); })(),
  why:'Stratégie : commencer par un seul côté. Chaque côté du triangle des milieux est un segment moyen : il mesure la moitié d’un côté du grand. Le périmètre est donc divisé par 2 à chaque fois : 10 + 8 + 6 = 24 cm, puis 12 cm, puis 6 cm.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : droites remarquables',p:`<div class="keep"><ul>
<li><b>Médiatrice</b> de [AB] : perpendiculaire à [AB] en son milieu ; ses points sont équidistants de A et de B. Au compas : même ouverture (plus que la moitié de AB) depuis A et depuis B.</li>
<li><b>Bissectrice</b> : demi-droite qui coupe un angle en deux angles égaux. Au compas : arc centré au sommet, puis deux arcs de même ouverture.</li>
<li><b>Hauteur</b> issue de C : perpendiculaire à (AB) passant par C (elle peut tomber dehors : prolonger le côté). <b>Médiane</b> issue de C : segment de C au milieu de [AB].</li>
<li>Les 3 médiatrices se coupent en O, centre du <b>cercle circonscrit</b> (passe par les sommets). Les 3 bissectrices se coupent en I, centre du <b>cercle inscrit</b> (rayon = distance de I à un côté). Deux droites suffisent.</li>
<li><b>Segment moyen</b> : le segment qui joint les milieux de deux côtés est parallèle au troisième et mesure sa moitié.</li>
<li><b>Échelle 1:<i>n</i></b> : réel → dessin, on divise par <i>n</i> ; dessin → réel, on multiplie par <i>n</i>, dans la même unité.</li>
<li><b>Construire d’après une description</b> : croquis, un côté à la règle, le dernier sommet au compas (longueurs) ou au rapporteur (angles), puis contrôle.</li>
</ul></div>`},
 {kind:'Problème',h:'Le feu de camp',p:'Trois cabanes de scouts A, B et C forment un triangle dans la forêt. On veut allumer le feu de camp en un point F situé à la même distance des trois cabanes. Sur le plan, à l’échelle 1:1000, le segment [AB] mesure 6 cm, et le triangle ABC est rectangle en C.',
  fig:(()=>{ const P=plane({x:[-3.7,3.7],y:[-3.4,3.4],grid:false,axes:false}), A=[-3,0], B=[3,0], C=pt([0,0],3,115);
    P.circ(0,0,3,{c:'var(--spark)',w:2,dash:true}); P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--sci)',fo:.12}); mark(P,C,A,B,{r:.35});
    dt(P,A,'A',{c:'var(--ink)',dx:-16,dy:14}); dt(P,B,'B',{c:'var(--ink)',dy:14}); dt(P,C,'C',{c:'var(--ink)'}); P.text(0,-2.3,'?',{a:'middle',s:15,c:'var(--spark)'}); return P.svg(); })(),
  parts:[
   {q:'a) Par quelles droites le point F doit-il passer ?',opts:['par les hauteurs du triangle','par les médiatrices des côtés','par les bissectrices des angles','par les médianes'],ans:1,hint:'Être à la même distance de deux points, c’est être sur…',why:'F est équidistant des trois sommets : c’est le point de rencontre des médiatrices, centre du cercle circonscrit.'},
   {q:'b) Quelle est la vraie distance entre les cabanes A et B ?',lab:'AB =',unit:'m',ans:60,hint:'Échelle 1:1000 : multiplie la longueur du plan par 1000, puis convertis en mètres.',why:'6 × 1000 = 6000 cm = 60 m.'},
   {q:'c) Le triangle est rectangle en C. Où se trouve F ?',opts:['au sommet C','à l’extérieur du triangle','au milieu de [AB], l’hypoténuse','au milieu de [AC]'],ans:2,hint:'Pense au cas particulier du triangle rectangle vu dans le cours.',why:'Dans un triangle rectangle, le centre du cercle circonscrit est le milieu de l’hypoténuse [AB].'},
   {q:'d) À quelle distance réelle de chaque cabane se trouve le feu ?',lab:'distance =',unit:'m',ans:30,hint:'F est au milieu de [AB], et FA = FB = FC.',why:'FA = FB = 60 : 2 = 30 m, et FC = FA car F est le centre du cercle qui passe par A, B et C.'}],
  sol:'Le feu F doit être équidistant de A, B et C : c’est le centre du cercle circonscrit, à l’intersection des médiatrices.<br>Distance réelle AB : 6 × 1000 = 6000 cm = 60 m.<br>Le triangle est rectangle en C : le centre du cercle circonscrit est le milieu de l’hypoténuse [AB].<br>Donc FA = FB = 30 m, et FC = 30 m aussi (même cercle). Le feu est à 30 m de chaque cabane.'},
 {kind:'Problème',h:'La façade du chalet',p:'La façade d’un chalet est un triangle ABC isocèle en A. La base [BC] mesure 8 m et les angles à la base ∠ABC et ∠ACB mesurent 35°. Une poutre horizontale [MN] relie le milieu M de [AB] au milieu N de [AC]. Un poteau vertical part du sommet A et tombe au milieu H de [BC].',
  fig:(()=>{ const P=plane({x:[-4.6,4.6],y:[-.9,3.3],grid:false,axes:false}), B=[-4,0], C=[4,0], A=[0,4*Math.tan(35*D)], M=mid(A,B), N=mid(A,C), H=[0,0];
    P.poly([A,B,C],{c:'var(--ink)',w:2.5,fill:'var(--other)',fo:.12}); sg(P,M,N,{c:'var(--accent)',w:3.5}); sg(P,A,H,{c:'var(--math)',w:2.5,dash:true});
    tick(P,A,B); tick(P,A,C); mark(P,B,C,A,{r:.8,l:'35°',ld:.6}); mark(P,C,A,B,{r:.8,l:'35°',ld:.6});
    dt(P,A,'A',{c:'var(--ink)'}); dt(P,B,'B',{c:'var(--ink)',dx:-14,dy:14}); dt(P,C,'C',{c:'var(--ink)',dy:14}); dt(P,M,'M',{c:'var(--accent)',dx:-18}); dt(P,N,'N',{c:'var(--accent)'}); dt(P,H,'H',{c:'var(--math)',dy:16}); return P.svg(); })(),
  parts:[
   {q:'a) Combien mesure l’angle ∠BAC, au sommet du toit ?',lab:'∠BAC =',unit:'°',ans:110,hint:'Somme des angles d’un triangle.',why:'180° − 35° − 35° = 110°.'},
   {q:'b) Quelle est la longueur de la poutre [MN] ?',lab:'MN =',unit:'m',ans:4,hint:'[MN] joint les milieux de deux côtés.',why:'C’est un segment moyen : MN = BC : 2 = 8 : 2 = 4 m.'},
   {q:'c) L’architecte dessine la façade à l’échelle 1:50. Combien mesure la poutre sur son plan ?',lab:'MN sur le plan =',unit:'cm',ans:8,hint:'Convertis 4 m en cm, puis divise par 50.',why:'4 m = 400 cm, et 400 : 50 = 8 cm.'},
   {q:'d) Que représente le poteau [AH] dans le triangle ?',opts:['seulement une médiane','seulement une hauteur','la hauteur et la médiane issues de A, et il est porté par la bissectrice de ∠BAC et la médiatrice de [BC]','une bissectrice, mais pas une hauteur'],ans:2,hint:'Le triangle est isocèle en A : pense à son axe de symétrie.',why:'Dans un triangle isocèle, l’axe de symétrie joue les quatre rôles à la fois.'},
   {q:'e) Combien mesure l’angle ∠BAH ?',lab:'∠BAH =',unit:'°',ans:55,hint:'(AH) est la bissectrice de ∠BAC.',why:'∠BAH = 110° : 2 = 55°. Contrôle dans le triangle ABH rectangle en H : 35° + 55° = 90° ✓.'}],
  sol:'Somme des angles : ∠BAC = 180° − 2 × 35° = 110°.<br>M et N sont des milieux : [MN] est un segment moyen, parallèle à [BC] et MN = 8 : 2 = 4 m. La poutre est bien horizontale.<br>À l’échelle 1:50 : 400 cm : 50 = 8 cm sur le plan.<br>Le triangle est isocèle en A : son axe de symétrie (AH) est à la fois hauteur, médiane, bissectrice de ∠BAC et médiatrice de [BC].<br>Donc ∠BAH = 110° : 2 = 55°.'}
]},
/* =====================================================================
   CHAPITRE 6 : ISOMÉTRIES
   ===================================================================== */
{subj:'sec', sem:'a9', id:'sec9-isometries', o:6, h:'Isométries', p:'Translation, symétries axiale et centrale, rotation : construire des images, retrouver l’axe, le centre ou la flèche, créer des frises et des pavages, agrandir et réduire.', steps:[
 {kind:'Théorie',h:'Bouger sans déformer',p:`<p>Dans un jeu de blocs qui tombent, les pièces glissent et tournent, mais elles ne changent jamais de forme. Devant un miroir, ton reflet a exactement ta taille. Ces mouvements qui ne déforment rien ont un nom : les <b>isométries</b>.</p>
<div class="def"><p>Une <b>transformation</b> associe à chaque point M un point M′ (lire « M prime »), son <b>image</b>. Une <b>isométrie</b> est une transformation qui conserve les longueurs : une figure et son image sont <b>superposables</b>. On peut découper l’une et la poser exactement sur l’autre, en retournant parfois le papier. Il y en a quatre sortes : la <b>translation</b>, la <b>symétrie axiale</b>, la <b>symétrie centrale</b> et la <b>rotation</b>.</p></div>
<div class="prop"><p>Une isométrie conserve les <b>longueurs</b>, les <b>angles</b>, les <b>aires</b> (le même nombre de carreaux), l’alignement et le parallélisme.</p></div>
<div class="idea"><p>Décalque la figure sur du papier calque. Fais glisser le calque, fais-le tourner, ou retourne-le : le dessin obtenu est l’image par une isométrie.</p></div>
<div class="ex"><p>Sur la figure, le drapeau bleu a trois images. Son mât mesure 3 cases : chaque image a aussi un mât de 3 cases, et un fanion de même forme. Seules la position et l’orientation changent.</p></div>
<div class="warn"><p>Le reflet dans le miroir est <b>retourné</b> : un drapeau qui pointe vers la droite pointe vers la gauche dans le miroir. C’est quand même une isométrie, car rien n’est déformé. En revanche, un agrandissement n’en est pas une : les longueurs changent.</p></div>`,
  fig:(()=>{ const P=grille([-6,6],[-4.5,4.5],{lab:2});
    drapeau(P,tr(-4,1),{l:'T'}); drapeau(P,tr(2,1),{c:'var(--ok)'}); drapeau(P,p=>[p[0]-4,-(p[1]+1)],{c:'var(--spark)'}); drapeau(P,p=>[4-p[0],-1-p[1]],{c:'var(--math)'});
    P.text(2,4.1,'glissement',{s:11,c:'var(--ok)'}).text(-5.8,-4.3,'miroir',{s:11,c:'var(--spark)'}).text(1.4,-4.3,'demi-tour',{s:11,c:'var(--math)'});
    return P.svg(); })()},
 {kind:'Théorie',h:'La translation',p:`<p>Sur un tapis roulant d’aéroport, toutes les valises avancent dans la même direction, du même nombre de pas. Dans un jeu vidéo, un personnage qui glisse de 3 cases vers la droite bouge tout son corps de la même façon. C’est une <b>translation</b>.</p>
<div class="def"><p>Une <b>translation</b> fait glisser tous les points selon une même <b>flèche</b>, qui donne une direction, un sens et une longueur. Dans un repère, la translation « <i>a</i> cases à l’horizontale, <i>b</i> cases à la verticale » envoie le point M(<i>x</i> ; <i>y</i>) sur M′(<i>x</i> + <i>a</i> ; <i>y</i> + <i>b</i>). Un nombre négatif veut dire vers la gauche ou vers le bas.</p></div>
<div class="idea"><p>Toutes les flèches qui vont d’un point à son image sont parallèles, de même sens et de même longueur. La figure ne tourne pas et ne se retourne pas.</p></div>
<div class="ex"><p>Translation « 3 à droite, 1 en bas » : A(1 ; 2) va en A′(1 + 3 ; 2 − 1) = A′(4 ; 1), et B(−2 ; 0) va en B′(1 ; −1). Un <b>itinéraire</b> sur un quadrillage enchaîne des translations : « 2 à droite, 1 en haut », puis « 1 à droite, 3 en bas », revient à « 3 à droite, 2 en bas ».</p></div>
<div class="warn"><p>Ne confonds pas direction et sens : une flèche horizontale peut aller vers la droite ou vers la gauche. Et ne compte pas les points du quadrillage, compte les cases.</p></div>`,
  params:[{id:'a',l:'Cases à l’horizontale',min:-3,max:6,v:3},{id:'b',l:'Cases à la verticale',min:-2,max:3,v:1}],
  draw:v=>{ const P=grille([-6,6],[-4.5,4.5],{lab:2}), f=tr(-3,-2), g=tr(-3+v.a,-2+v.b);
    drapeau(P,f,{op:.6,l:'T',dy:16}); drapeau(P,g,{c:'var(--spark)',l:'T′'});
    if(v.a||v.b){ [[0,0],[2,2],[0,3]].forEach(p=>P.arrow(...f(p),...g(p),{c:'var(--math)',w:2,hs:9})); }
    return P.svg(); },
  info:v=>{ const h=v.a>0?`${v.a} vers la droite`:v.a<0?`${-v.a} vers la gauche`:'0 à l’horizontale', w=v.b>0?`${v.b} vers le haut`:v.b<0?`${-v.b} vers le bas`:'0 à la verticale';
    return `Flèche : ${h}, ${w}. T(−1 ; 0) va en T′${co([-1+v.a,v.b])}.`; }},
 {kind:'Théorie',h:'La symétrie axiale',p:`<p>Fais une tache d’encre fraîche sur une feuille, puis plie-la en deux : en dépliant, tu obtiens un papillon. Chaque goutte a laissé une copie de l’autre côté du pli. Le pli s’appelle l’<b>axe</b>.</p>
<div class="def"><p>Le <b>symétrique</b> d’un point M par rapport à une droite <i>d</i> est le point M′ tel que <i>d</i> soit la <b>médiatrice</b> du segment [MM′] : [MM′] est perpendiculaire à <i>d</i>, et <i>d</i> le coupe en son milieu. Un point situé sur l’axe est son propre symétrique.</p></div>
<div class="idea"><p>M′ est l’endroit où M atterrit quand on plie la feuille le long de <i>d</i>. Il est à la même distance de l’axe que M, de l’autre côté, sur la perpendiculaire.</p></div>
<div class="ex"><p>Axe = l’axe vertical des ordonnées : M(3 ; 2) a pour symétrique M′(−3 ; 2). Axe = l’axe horizontal des abscisses : M(3 ; 2) devient M′(3 ; −2). Axe = la droite oblique qui passe par (1 ; 1), (2 ; 2)… : M(3 ; 2) devient M′(2 ; 3), les deux coordonnées s’échangent.</p></div>
<div class="warn"><p>La figure est <b>retournée</b>. Et on mesure la distance à l’axe perpendiculairement à lui, jamais en biais. Choisis l’axe et déplace M avec les curseurs.</p></div>`,
  params:[{id:'s',l:'Axe (0 : vertical, 1 : horizontal, 2 : oblique)',min:0,max:2,v:0},{id:'x',l:'Abscisse de M',min:-4,max:4,v:-3},{id:'y',l:'Ordonnée de M',min:-4,max:4,v:2}],
  draw:v=>{ const P=grille([-6,6],[-4.5,4.5],{lab:2}), S=[p=>[-p[0],p[1]],p=>[p[0],-p[1]],p=>[p[1],p[0]]][v.s], f=tr(2,-3), M=[v.x,v.y], M2=S(M);
    line(P,[0,0],[[0,1],[1,0],[1,1]][v.s],{c:'var(--math)',w:3}); drapeau(P,f); drapeau(P,comp(f,S),{c:'var(--spark)'});
    if(M[0]!==M2[0]||M[1]!==M2[1]){ const m=mid(M,M2); sg(P,M,M2,{c:'var(--muted)',w:1.5,dash:true}); markA(P,m,dirA(m,M),dirA(m,M)+90,{r:.3,c:'var(--math)'}); tick(P,M,m); tick(P,m,M2); }
    dt(P,M,'M',{c:'var(--accent)'}); dt(P,M2,'M′',{c:'var(--spark)'}); return P.svg(); },
  info:v=>{ const S=[p=>[-p[0],p[1]],p=>[p[0],-p[1]],p=>[p[1],p[0]]][v.s]; return `M${co([v.x,v.y])} a pour symétrique M′${co(S([v.x,v.y]))}.${v.s===2?' Les coordonnées s’échangent.':''}`; }},
 {kind:'Méthode',h:'Construire le symétrique d’un point par rapport à une droite',p:`<b>Quand :</b> pour dessiner l’image d’un point, ou d’une figure point par point, par une symétrie axiale. <b>Sur un quadrillage</b> (axe vertical ou horizontal) : compte les cases de M jusqu’à l’axe, perpendiculairement, puis compte le même nombre de cases de l’autre côté. <b>Au compas</b> (axe quelconque) : choisis deux points P et Q sur l’axe ; trace l’arc de centre P qui passe par M, puis l’arc de centre Q qui passe par M ; de l’autre côté de l’axe, ils se croisent en M′. <b>Pourquoi ça marche :</b> PM = PM′ et QM = QM′, donc P et Q sont sur la médiatrice de [MM′] ; cette médiatrice est la droite (PQ), c’est-à-dire l’axe. <b>Pour une figure :</b> construis l’image de chaque sommet, puis relie dans le même ordre.`,
  ...(()=>{ const Pp=[-3,-1.5], Q=[2.4,1.2], M=[-1,2.5], M2=[1.4,-2.3], aP=dirA(Pp,M2), aQ=dirA(Q,M2);
   return etapes('La droite <i>d</i> et le point M sont donnés. On choisit deux points P et Q sur <i>d</i>.',
    ()=>{ const P=plane({x:[-4.5,4.5],y:[-3.3,3.4],grid:false,axes:false}); line(P,Pp,Q,{c:'var(--math)'}); P.text(4,2,'d',{dy:-6,c:'var(--math)'}); dt(P,Pp,'P',{c:'var(--math)',dy:16}); dt(P,Q,'Q',{c:'var(--math)',dy:16}); dt(P,M,'M',{c:'var(--accent)'}); return P; },
    [{t:'Pointe sur P, ouverture PM : trace un arc de l’autre côté de <i>d</i>.',f:(P,c)=>arc(P,Pp,dist(Pp,M),aP-15,aP+15,{c:hl(c)})},
     {t:'Pointe sur Q, ouverture QM : l’arc croise le précédent en M′.',f:(P,c)=>{ arc(P,Q,dist(Q,M),aQ-15,aQ+15,{c:hl(c)}); dt(P,M2,'M′',{c:'var(--spark)'}); }},
     {t:'Contrôle : (MM′) est perpendiculaire à <i>d</i> et la coupe en son milieu.',f:(P,c)=>{ const m=mid(M,M2); sg(P,M,M2,{c:'var(--spark)',w:2,dash:true}); markA(P,m,dirA(m,M),dirA(m,M)+90,{r:.3}); tick(P,M,m); tick(P,m,M2); }}]); })(),
  demo:{enonce:'Dans un repère, <i>d</i> est la droite verticale formée des points d’abscisse 1. Construire le symétrique du triangle A(−2 ; 3), B(0 ; −1), C(1 ; 1).',
   etapes:[
    {f:'A est à 3 cases à gauche de <i>d</i> : A′ est à 3 cases à droite, A′(4 ; 3).',w:'On compte horizontalement, perpendiculairement à l’axe vertical. L’ordonnée ne change pas.'},
    {f:'B est à 1 case à gauche de <i>d</i> : B′(2 ; −1).',w:'Même distance, de l’autre côté.'},
    {f:'C est sur <i>d</i> : C′ = C(1 ; 1).',w:'Un point de l’axe est son propre symétrique.'},
    {f:'On relie A′, B′ et C′.',w:'Le triangle A′B′C′ a les mêmes longueurs et les mêmes angles que ABC, mais il est retourné.'}],
   conclusion:'L’image est le triangle A′(4 ; 3), B′(2 ; −1), C′(1 ; 1).'}},
 {h:'Le symétrique sur le quadrillage',p:'La droite <i>d</i> est verticale et passe par tous les points d’abscisse 2. Quelle est l’abscisse du symétrique de A(−1 ; 4) par rapport à <i>d</i> ?',lab:'abscisse de A′ =',ans:5,
  fig:(()=>{ const P=grille([-2,7],[-1,5],{lab:1}); line(P,[2,0],[2,1],{c:'var(--math)',w:3}); P.text(2,4.6,'d',{dx:6,c:'var(--math)'}); dt(P,[-1,4],'A',{c:'var(--accent)'}); return P.svg(); })(),
  why:'A est à 3 cases à gauche de <i>d</i> (de −1 à 2). Son symétrique est à 3 cases à droite : 2 + 3 = 5. A′(5 ; 4).'},
 {kind:'Théorie',h:'La symétrie centrale',p:`<p>Prends un roi dans un jeu de cartes et fais-lui faire un demi-tour sur la table : la carte a l’air identique. Ce demi-tour est une <b>symétrie centrale</b>.</p>
<div class="def"><p>Le <b>symétrique</b> d’un point M par rapport à un point O est le point M′ tel que O soit le <b>milieu</b> de [MM′]. Le point O s’appelle le <b>centre</b> ; il est son propre symétrique. La symétrie centrale de centre O est un <b>demi-tour</b> autour de O.</p></div>
<div class="idea"><p>Pour construire M′ : trace la droite (MO), puis reporte la longueur OM de l’autre côté de O, au compas. Avec un calque, plante la pointe du compas en O et fais faire un demi-tour au calque.</p></div>
<div class="ex"><p>Centre O(0 ; 0) : M(3 ; 1) a pour symétrique M′(−3 ; −1). Chaque coordonnée est remplacée par son opposé. Centre O(1 ; 0) : M(3 ; 1) est à 2 cases à droite et 1 en haut de O, donc M′ est à 2 cases à gauche et 1 en bas de O : M′(−1 ; −1).</p></div>
<div class="warn"><p>Contrairement à la symétrie axiale, la figure n’est pas retournée : elle a seulement tourné d’un demi-tour. Certaines figures sont leur propre image : elles ont un <b>centre de symétrie</b>. C’est le cas du parallélogramme (le point où se coupent ses diagonales), du rectangle, du losange, du carré, du cercle et des lettres N, S, Z.</p></div>`,
  params:[{id:'x',l:'Abscisse du centre O',min:-1,max:1,step:.5,v:0},{id:'y',l:'Ordonnée du centre O',min:-1,max:1,step:.5,v:0}],
  draw:v=>{ const P=grille([-6,6],[-4.5,4.5],{lab:2}), O=[v.x,v.y], f=tr(2,-1), S=p=>[2*v.x-p[0],2*v.y-p[1]], T=f(FL.T), T2=S(T), B=f([0,0]), B2=S(B);
    sg(P,T,T2,{c:'var(--muted)',w:1.5,dash:true}); sg(P,B,B2,{c:'var(--muted)',w:1.5,dash:true}); tick(P,T,O); tick(P,O,T2); tick(P,B,O,2); tick(P,O,B2,2);
    drapeau(P,f,{l:'T'}); drapeau(P,comp(f,S),{c:'var(--spark)',l:'T′'}); dt(P,O,'O',{c:'var(--ink)'}); return P.svg(); },
  info:v=>`Centre O${co([v.x,v.y])}. T(4 ; 1) a pour symétrique T′${co([2*v.x-4,2*v.y-1])}, et O est le milieu de [TT′].`},
 {kind:'Théorie',h:'La rotation',p:`<p>Une grande roue de fête foraine tourne autour de son axe : chaque cabine décrit un cercle, et toutes tournent du même angle en même temps. Les aiguilles d’une montre font pareil. C’est une <b>rotation</b>.</p>
<div class="def"><p>Une <b>rotation</b> est donnée par un <b>centre</b> O, un <b>angle</b> et un <b>sens</b> : le sens des aiguilles d’une montre (<b>horaire</b>) ou le sens contraire (<b>anti-horaire</b>). L’image de M est le point M′ tel que OM′ = OM et ∠MOM′ égal à l’angle, mesuré dans le bon sens. Le centre ne bouge pas.</p></div>
<div class="idea"><p>Plante la pointe du compas en O, crayon en M : M glisse sur le cercle de centre O jusqu’à avoir tourné de l’angle voulu. Tous les points de la figure tournent du même angle.</p></div>
<div class="ex"><p>Un quart de tour (90°) anti-horaire autour de O(0 ; 0) : le point (3 ; 1), à 3 cases à droite et 1 en haut, devient (−1 ; 3), à 1 case à gauche et 3 en haut. En coordonnées : (<i>x</i> ; <i>y</i>) devient (−<i>y</i> ; <i>x</i>). Une rotation de 180° est un demi-tour : c’est la symétrie centrale. Une rotation de 360° ramène chaque point à sa place.</p></div>
<div class="warn"><p>Il faut toujours donner le sens : 90° dans le sens horaire et 90° dans le sens anti-horaire donnent des images différentes.</p></div>`,
  params:[{id:'a',l:'Angle',min:0,max:360,step:15,v:45,u:'°'},{id:'s',l:'Sens (0 : anti-horaire, 1 : horaire)',min:0,max:1,v:0}],
  draw:v=>{ const P=grille([-6,6],[-4.5,4.5],{lab:2}), O=[0,0], al=v.s?-v.a:v.a, f=tr(1,0), R=rotP(O,al), T=f(FL.T), T2=R(T), a0=dirA(O,T);
    drapeau(P,f,{op:.6,l:'T'}); drapeau(P,comp(f,R),{c:'var(--spark)',l:'T′'});
    if(v.a%360){ sg(P,O,T,{c:'var(--muted)',w:1.5}); sg(P,O,T2,{c:'var(--muted)',w:1.5}); if(v.s) markA(P,O,a0-v.a,a0,{r:.9,c:'var(--math)',arc:true}); else markA(P,O,a0,a0+v.a,{r:.9,c:'var(--math)',arc:true}); }
    dt(P,O,'O',{c:'var(--ink)',dx:-16,dy:16}); return P.svg(); },
  info:v=>{ const T2=rotP([0,0],v.s?-v.a:v.a)([3,2]), ex=v.a%90===0; return `Rotation de centre O, d’angle ${v.a}°, sens ${v.s?'horaire':'anti-horaire'}. T(3 ; 2) a pour image T′${ex?'':' ≈ '}${ex?co(T2.map(Math.round)):`(${fmt(T2[0],1)} ; ${fmt(T2[1],1)})`}.`; }},
 {kind:'Méthode',h:'Construire l’image d’un point par une rotation',p:`<b>Quand :</b> on connaît le centre O, l’angle et le sens, et on veut l’image M′ d’un point M. <b>Pourquoi ça marche :</b> M′ doit vérifier deux conditions, OM′ = OM (le compas) et ∠MOM′ = l’angle (le rapporteur). <b>Comment :</b> 1) trace le segment [OM] ; 2) place le rapporteur, centre sur O, ligne du 0 le long de [OM) ; 3) marque l’angle dans le bon sens et trace la demi-droite issue de O ; 4) au compas, pointe sur O et ouverture OM, reporte cette longueur sur la demi-droite : c’est M′. <b>Sur un quadrillage, pour un quart de tour :</b> si M est à « <i>a</i> cases à droite et <i>b</i> en haut » de O, alors, dans le sens anti-horaire, M′ est à « <i>b</i> cases à gauche et <i>a</i> en haut » de O.`,
  ...(()=>{ const O=[-1.5,-1.5], M=[2.5,-.5], a0=dirA(O,M), M2=rotP(O,60)(M), r=dist(O,M);
   return etapes('Le centre O et le point M sont donnés. Angle : 60°, sens anti-horaire.',
    ()=>{ const P=plane({x:[-4.3,4.3],y:[-2.6,3.6],grid:false,axes:false}); dt(P,O,'O',{c:'var(--ink)',dx:-16,dy:14}); dt(P,M,'M',{c:'var(--accent)'}); return P; },
    [{t:'Trace le segment [OM].',f:(P,c)=>sg(P,O,M,{c:c?'var(--spark)':'var(--accent)',w:2.5})},
     {t:'Pose le rapporteur : centre sur O, ligne du 0 le long de [OM).',f:(P,c)=>{ rapporteur(P,O,2.4,{rot:a0,labels:false}); tx(P,pt(O,2.75,a0),'0',{a:'middle',dy:4,s:11,c:'var(--spark)'}); tx(P,pt(O,2.75,a0+60),'60',{a:'middle',dy:4,s:11,c:'var(--spark)'}); }},
     {t:'Dans le sens anti-horaire, repère 60° et trace la demi-droite issue de O.',f:(P,c)=>{ ray(P,O,pt(O,4.8,a0+60),{c:c?'var(--spark)':'var(--math)',w:2},.1); markA(P,O,a0,a0+60,{r:.8,c:'var(--math)',arc:true}); }},
     {t:'Pointe du compas sur O, ouverture OM : l’arc coupe la demi-droite en M′.',f:(P,c)=>{ arc(P,O,r,a0,a0+66,{c:hl(c),dash:true}); dt(P,M2,'M′',{c:'var(--spark)'}); }}]); })(),
  demo:{enonce:'Construire l’image de M par la rotation de centre O, d’angle 60°, dans le sens anti-horaire.',
   etapes:[
    {f:'Trace [OM].',w:'C’est le côté de départ de l’angle.'},
    {f:'Rapporteur centré en O, 0 sur [OM) ; marque 60° en tournant dans le sens anti-horaire.',w:'Choisis la graduation qui part de 0 sur [OM).'},
    {f:'Trace la demi-droite qui part de O et passe par la marque.',w:'M′ est quelque part sur cette demi-droite.'},
    {f:'Compas : pointe sur O, ouverture OM, et reporte sur la demi-droite.',w:'Ainsi OM′ = OM.'}],
   conclusion:'M′ vérifie OM′ = OM et ∠MOM′ = 60° : c’est l’image de M.'}},
 {h:'Un quart de tour',p:'On applique la rotation de centre O(0 ; 0), d’angle 90°, dans le sens anti-horaire. Quelle est l’image de A(4 ; 1) ?',
  fig:(()=>{ const P=grille([-5,5],[-5,5],{lab:1}); dt(P,[0,0],'O',{c:'var(--ink)',dx:-16,dy:16}); dt(P,[4,1],'A',{c:'var(--accent)'}); arc(P,[0,0],Math.hypot(4,1),14,50,{c:'var(--muted)',dash:true}); return P.svg(); })(),
  opts:['(1 ; −4)','(−4 ; −1)','(−1 ; 4)','(−4 ; 1)'],ans:2,
  why:'A est à 4 cases à droite et 1 en haut de O. Après un quart de tour anti-horaire, il est à 1 case à gauche et 4 en haut : A′(−1 ; 4). En formule, (<i>x</i> ; <i>y</i>) devient (−<i>y</i> ; <i>x</i>).'},
 {kind:'Méthode',h:'Retrouver l’axe, le centre ou la flèche',p:`<b>Quand :</b> on voit une figure et son image, et on cherche l’isométrie utilisée. <b>Comment :</b> 1) compare les deux figures. Ont-elles seulement glissé ? C’est une <b>translation</b>. L’une est-elle le reflet de l’autre ? Parcours A → B → C : si les sommets tournent dans un sens sur la figure et dans l’autre sur l’image, elle a été retournée, c’est une <b>symétrie axiale</b>. A-t-elle fait un demi-tour ? C’est une <b>symétrie centrale</b>. 2) Choisis un point A et son image A′. 3) Translation : la flèche va de A à A′. Symétrie axiale : l’axe est la <b>médiatrice</b> de [AA′]. Symétrie centrale : le centre est le <b>milieu</b> de [AA′]. 4) Contrôle avec un deuxième point. <b>Pourquoi ça marche :</b> ce sont les définitions lues à l’envers ; par exemple, dans une symétrie centrale, le centre est le milieu de chaque segment [MM′].`,
  fig:(()=>{ const P=grille([-1,7],[-3,5],{lab:1}), T=[[1,2],[3,2],[1,4]], T2=[[5,0],[3,0],[5,-2]];
    P.poly(T,{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.2}); P.poly(T2,{c:'var(--spark)',w:2.5,fill:'var(--spark)',fo:.2});
    ['A','B','C'].forEach((n,i)=>{ dt(P,T[i],n,{c:'var(--accent)'}); dt(P,T2[i],n+'′',{c:'var(--spark)'}); }); return P.svg(); })(),
  demo:{enonce:'Le triangle A(1 ; 2), B(3 ; 2), C(1 ; 4) a pour image A′(5 ; 0), B′(3 ; 0), C′(5 ; −2). Quelle isométrie ? Donner son élément.',
   etapes:[
    {f:'[AB] va vers la droite, [A′B′] va vers la gauche ; [AC] monte, [A′C′] descend.',w:'La figure n’a pas glissé : elle s’est retournée tête en bas.'},
    {f:'A → B → C et A′ → B′ → C′ tournent dans le même sens : pas de miroir.',w:'C’est donc un demi-tour : une symétrie centrale.'},
    {f:'De A à A′ : 4 cases à droite, 2 en bas. Le milieu est à mi-chemin : 2 à droite, 1 en bas de A, soit (3 ; 1).',w:'Dans une symétrie centrale, le centre est le milieu de [AA′].'},
    {f:'Contrôle : le milieu de [BB′] est (3 ; 1), celui de [CC′] aussi.',w:'Un deuxième point confirme le résultat.'}],
   conclusion:'C’est la symétrie de centre (3 ; 1).'}},
 {kind:'Pratique',h:'Retrouve la flèche',p:'Le drapeau pointillé est l’image du drapeau bleu par une translation. Règle les curseurs pour retrouver la flèche de cette translation.',
  params:[{id:'a',l:'Cases à l’horizontale',min:-3,max:8,v:2},{id:'b',l:'Cases à la verticale',min:-1,max:4,v:0}],
  draw:v=>{ const P=grille([-6,6],[-4.5,4.5],{lab:2}), f=tr(-4,-3);
    drapeau(P,f,{l:'T'}); drapeau(P,tr(1,-1),{c:'var(--muted)',dash:true}); drapeau(P,tr(-4+v.a,-3+v.b),{c:'var(--spark)',l:'T′'});
    if(v.a||v.b) P.arrow(...f(FL.T),-2+v.a,-1+v.b,{c:'var(--math)',w:2,hs:9}); return P.svg(); },
  info:v=>`Ta flèche : ${v.a} case(s) à l’horizontale, ${v.b} à la verticale.`,
  ok:v=>v.a===5&&v.b===2,why:'La pointe T(−2 ; −1) doit arriver sur la pointe du drapeau pointillé, en (3 ; 1) : 5 cases vers la droite et 2 vers le haut. Tous les autres points suivent la même flèche.'},
 {kind:'Théorie',h:'Frises et pavages',p:`<p>Regarde la bordure d’un papier peint, le motif d’un pull de ski ou le carrelage d’une salle de bain : un même dessin se répète, encore et encore, sans jamais se déformer. Ce sont des isométries au travail.</p>
<div class="def"><p>Une <b>frise</b> est une bande où un motif se répète en se décalant toujours de la même flèche : on passe d’un motif au suivant par une <b>translation</b>. Un <b>pavage</b> recouvre tout le plan avec des copies d’un ou de plusieurs motifs, sans trou et sans chevauchement.</p></div>
<div class="idea"><p>Le motif de base peut lui-même être fabriqué avec une isométrie : un drapeau et son reflet, ou un drapeau et son demi-tour. Ce motif double se répète ensuite par translation. Essaie les trois façons avec le curseur.</p></div>
<div class="why"><p>Les carrés, les triangles équilatéraux et les hexagones réguliers pavent le plan, car autour d’un sommet les angles font pile 360° : 4 × 90° pour les carrés, 6 × 60° pour les triangles, 3 × 120° pour les hexagones des ruches. Un pentagone régulier a des angles de 540° : 5 = 108° : 3 × 108° = 324° laisse un trou, et 4 × 108° = 432° déborde. Pas de pavage avec lui !</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>L’artiste néerlandais M. C. Escher a dessiné des pavages d’oiseaux, de poissons et de lézards qui s’emboîtent parfaitement. Bien avant lui, les murs de l’Alhambra, en Espagne, ont été couverts de pavages de céramique.</p></div>`,
  params:[{id:'t',l:'Motif (0 : glissement, 1 : miroir, 2 : demi-tour)',min:0,max:2,v:0},{id:'n',l:'Nombre de drapeaux',min:1,max:6,v:4}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-2.2,2.2],grid:true,axes:false}); P.seg(-6,1.8,6,1.8,{c:'var(--muted)',w:1.5}); P.seg(-6,-1.8,6,-1.8,{c:'var(--muted)',w:1.5});
    for(let k=0;k<v.n;k++){ const x0=-5.9+2*k, odd=k%2===1; let f=p=>[x0+.9*p[0],-1.35+.9*p[1]];
      if(odd&&v.t===1) f=p=>[x0+.9*(2-p[0]),-1.35+.9*p[1]]; if(odd&&v.t===2) f=p=>[x0+.9*(2-p[0]),-1.35+.9*(3-p[1])];
      drapeau(P,f,{c:odd&&v.t?'var(--spark)':'var(--accent)'}); }
    return P.svg(); },
  info:v=>['Chaque drapeau est l’image du précédent par la même translation.','Un drapeau et son reflet forment le motif ; ce motif double se répète par translation.','Un drapeau et son demi-tour forment le motif ; ce motif double se répète par translation.'][v.t]},
 {kind:'Méthode',h:'Agrandir ou réduire avec un rapport',p:`<div class="def"><p><b>Agrandir</b> ou <b>réduire</b> une figure avec un <b>rapport</b> <i>k</i>, c’est multiplier toutes ses longueurs par <i>k</i>. Si <i>k</i> &gt; 1, c’est un agrandissement ; si <i>k</i> &lt; 1, une réduction. Les angles ne changent pas : la forme reste la même. Ce n’est pas une isométrie (sauf si <i>k</i> = 1), car les longueurs changent.</p></div>
<p><b>Quand :</b> agrandir une photo, fabriquer une maquette, reproduire une figure plus grande ou plus petite. <b>Pourquoi ça marche :</b> toutes les longueurs sont multipliées par le même nombre, comme avec un zoom : la figure garde ses proportions. <b>Comment :</b> 1) repère deux longueurs qui se correspondent ; 2) calcule le rapport <i>k</i> = longueur de l’image : longueur d’origine, dans la même unité ; 3) multiplie chaque longueur par <i>k</i> ; 4) recopie les angles sans les changer.</p>`,
  params:[{id:'k',l:'Rapport k',min:.5,max:3,step:.5,v:2}],
  draw:v=>{ const P=grille([-6,6],[-3,4],{axes:false}), H=[[0,0],[2,0],[2,1.2],[1,2],[0,1.2]];
    P.poly(H.map(p=>[-5.5+p[0],-2.5+p[1]]),{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.2}); P.poly(H.map(p=>[-2.5+v.k*p[0],-2.5+v.k*p[1]]),{c:'var(--spark)',w:2.5,fill:'var(--spark)',fo:.2}); return P.svg(); },
  info:v=>`Rapport <i>k</i> = ${fmt(v.k)} : ${v.k>1?'agrandissement':v.k<1?'réduction':'même taille'}. La largeur passe de 2 à ${fmt(2*v.k)} cases, la hauteur du mur de 1,2 à ${fmt(1.2*v.k)} cases. Les angles ne changent pas.`,
  demo:{enonce:'Un triangle a des côtés de 4 cm, 6 cm et 5 cm, et un angle de 40°. On l’agrandit : le côté de 4 cm devient 10 cm. Que deviennent les autres côtés et l’angle ?',
   etapes:[
    {f:'<i>k</i> = 10 : 4 = 2,5',w:'Le rapport compare une longueur de l’image à la longueur d’origine correspondante.'},
    {f:'6 × 2,5 = 15 cm et 5 × 2,5 = 12,5 cm',w:'Toutes les longueurs sont multipliées par le même rapport.'},
    {f:'L’angle de 40° reste 40°.',w:'Agrandir ne change pas la forme, donc pas les angles.'}],
   conclusion:'Le triangle agrandi mesure 10 cm, 15 cm et 12,5 cm, avec toujours un angle de 40°.'}},
 {h:'La réduction',p:'Un rectangle de 16 cm sur 10 cm est réduit : sa longueur de 16 cm devient 4 cm. Quelle est la largeur du rectangle réduit ?',lab:'largeur =',unit:'cm',ans:2.5,
  why:'Le rapport vaut <i>k</i> = 4 : 16 = 0,25. La largeur devient 10 × 0,25 = 2,5 cm.'},
 {kind:'Défi',h:'La chasse au trésor',p:'Tu pars du point (−2 ; 1). Tu appliques d’abord la translation « 3 cases à droite, 2 cases en bas », puis la symétrie par rapport à l’axe des abscisses, puis la symétrie de centre O(0 ; 0). Où arrives-tu ?',
  opts:['(1 ; 1)','(−1 ; −1)','(1 ; −1)','(−1 ; 1)'],ans:1,
  why:'Stratégie : faire un tableau étape par étape. (−2 ; 1) → translation → (1 ; −1) → symétrie d’axe horizontal (l’ordonnée change de signe) → (1 ; 1) → symétrie de centre O (les deux coordonnées changent de signe) → (−1 ; −1).'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : isométries',p:`<div class="keep"><ul>
<li><b>Isométrie</b> : transformation qui conserve longueurs, angles, aires, alignement et parallélisme. Figure et image sont superposables.</li>
<li><b>Translation</b> : tout glisse selon la même flèche ; (<i>x</i> ; <i>y</i>) → (<i>x</i> + <i>a</i> ; <i>y</i> + <i>b</i>). Un itinéraire enchaîne des translations.</li>
<li><b>Symétrie axiale</b> d’axe <i>d</i> : <i>d</i> est la médiatrice de [MM′]. Quadrillage : compter les cases jusqu’à l’axe. Compas : deux arcs centrés sur l’axe. La figure est retournée.</li>
<li><b>Symétrie centrale</b> de centre O : O est le milieu de [MM′] ; c’est un demi-tour. Centre O(0 ; 0) : (<i>x</i> ; <i>y</i>) → (−<i>x</i> ; −<i>y</i>).</li>
<li><b>Rotation</b> : centre, angle et sens ; OM′ = OM et ∠MOM′ = l’angle (rapporteur puis compas). Quart de tour anti-horaire autour de O(0 ; 0) : (<i>x</i> ; <i>y</i>) → (−<i>y</i> ; <i>x</i>).</li>
<li><b>Retrouver</b> : flèche de A vers A′ ; axe = médiatrice de [AA′] ; centre = milieu de [AA′]. Toujours contrôler avec un 2e point.</li>
<li><b>Frise</b> : un motif répété par translation. <b>Pavage</b> : sans trou ni chevauchement ; autour d’un sommet, les angles font 360°.</li>
<li><b>Agrandissement, réduction</b> de rapport <i>k</i> : longueurs × <i>k</i>, angles inchangés ; <i>k</i> = longueur image : longueur d’origine.</li>
</ul></div>`},
 {kind:'Problème',h:'Le logo de Mia',p:'Mia dessine un logo sur un quadrillage muni d’un repère d’origine O. Elle part du triangle A(1 ; 1), B(4 ; 1), C(1 ; 3), rectangle en A. Elle veut le faire apparaître quatre fois autour de O, en utilisant des isométries.',
  fig:(()=>{ const P=grille([-5,5],[-5,5],{lab:1}), T=[[1,1],[4,1],[1,3]]; P.poly(T,{c:'var(--accent)',w:2.5,fill:'var(--accent)',fo:.25});
    dt(P,T[0],'A',{dx:-14,dy:16}); dt(P,T[1],'B'); dt(P,T[2],'C'); markA(P,T[0],0,90,{r:.35}); dt(P,[0,0],'O',{c:'var(--ink)',dx:-16,dy:16}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’abscisse du symétrique de B par rapport à l’axe des ordonnées ?',lab:'abscisse =',ans:-4,hint:'B est à 4 cases à droite de l’axe vertical.',why:'B(4 ; 1) a pour symétrique (−4 ; 1) : l’abscisse change de signe.'},
   {q:'b) Quelle est l’ordonnée du symétrique de C par rapport au point O ?',lab:'ordonnée =',ans:-3,hint:'Avec le centre O(0 ; 0), chaque coordonnée devient son opposé.',why:'C(1 ; 3) a pour symétrique (−1 ; −3).'},
   {q:'c) Quelle que soit l’isométrie, combien mesure le côté A′B′ de l’image ?',lab:'A′B′ =',unit:'cases',ans:3,hint:'Une isométrie conserve les longueurs. Combien mesure AB ?',why:'AB = 4 − 1 = 3 cases, donc A′B′ = 3 cases.'},
   {q:'d) Quelle est l’image de B par la rotation de centre O, d’angle 90°, sens anti-horaire ?',opts:['(1 ; −4)','(−1 ; 4)','(−4 ; 1)','(4 ; −1)'],ans:1,hint:'(<i>x</i> ; <i>y</i>) devient (−<i>y</i> ; <i>x</i>).',why:'B(4 ; 1) devient (−1 ; 4) : 1 case à gauche et 4 en haut de O.'},
   {q:'e) Combien mesure l’angle ∠B′A′C′ de l’image par cette rotation ?',lab:'∠B′A′C′ =',unit:'°',ans:90,hint:'Que conserve une isométrie ?',why:'Les angles sont conservés : l’angle droit en A reste un angle droit, 90°.'}],
  sol:'a) Symétrie d’axe vertical passant par O : B(4 ; 1) devient (−4 ; 1).<br>b) Symétrie de centre O : C(1 ; 3) devient (−1 ; −3).<br>c) Les isométries conservent les longueurs : A′B′ = AB = 3 cases.<br>d) Quart de tour anti-horaire : (<i>x</i> ; <i>y</i>) → (−<i>y</i> ; <i>x</i>), donc B devient (−1 ; 4).<br>e) Les angles sont conservés : ∠B′A′C′ = ∠BAC = 90°.'},
 {kind:'Problème',h:'La frise de l’affiche',p:'Pour la fête du quartier, Noé imprime une frise de 60 cm de long. Le motif mesure 4 cm de large ; on passe d’un motif au suivant par une translation de 4 cm vers la droite, et le premier motif touche le bord gauche. Ensuite, il agrandit toute l’affiche avec un rapport <i>k</i> = 2,5.',
  fig:(()=>{ const P=plane({x:[-6,6],y:[-2.2,2.9],grid:false,axes:false}); P.rect(-6,-1.8,12,3.6,{c:'var(--muted)',w:1.5});
    for(let k=0;k<6;k++){ const x0=-5.9+2*k; drapeau(P,p=>[x0+.9*p[0],-1.35+.9*p[1]],{c:k%2?'var(--spark)':'var(--accent)'}); }
    P.arrow(-5.9,2.15,-3.9,2.15,{c:'var(--math)',w:2,hs:8}); P.text(-4.9,2.15,'4 cm',{a:'middle',dy:-4,s:11,c:'var(--math)'}); return P.svg(); })(),
  parts:[
   {q:'a) Combien de motifs la frise de 60 cm contient-elle ?',lab:'motifs :',ans:15,hint:'Chaque motif occupe 4 cm.',why:'60 : 4 = 15 motifs.'},
   {q:'b) Quelle est la longueur de la frise agrandie ?',lab:'longueur =',unit:'cm',ans:150,hint:'Toutes les longueurs sont multipliées par k.',why:'60 × 2,5 = 150 cm.'},
   {q:'c) Quelle est la longueur de la flèche de translation sur l’affiche agrandie ?',lab:'flèche =',unit:'cm',ans:10,hint:'La flèche est une longueur comme les autres.',why:'4 × 2,5 = 10 cm.'},
   {q:'d) Combien de motifs la frise agrandie contient-elle ?',opts:['6, car on divise 15 par 2,5','15, car la frise et les motifs sont agrandis avec le même rapport','37, car on multiplie 15 par 2,5','150, comme la longueur en cm'],ans:1,hint:'Calcule 150 : 10.',why:'150 : 10 = 15 : l’agrandissement ne change pas le nombre de motifs.'},
   {q:'e) Un angle du fanion mesure 35°. Combien mesure-t-il sur l’affiche agrandie ?',lab:'angle =',unit:'°',ans:35,hint:'Un agrandissement change-t-il la forme ?',why:'Un agrandissement conserve les angles : 35°.'}],
  sol:'a) 60 : 4 = 15 motifs, chacun obtenu à partir du précédent par la translation de 4 cm.<br>b) Agrandissement de rapport 2,5 : 60 × 2,5 = 150 cm.<br>c) La flèche aussi : 4 × 2,5 = 10 cm.<br>d) 150 : 10 = 15 motifs : la frise et les motifs grandissent ensemble, leur nombre ne change pas.<br>e) Les angles ne changent pas : 35°.'}
]},
);
})();
