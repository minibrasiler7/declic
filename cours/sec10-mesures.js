/* Déclic — Maths au secondaire, 10e année : cercle, Pythagore, trigonométrie */
(()=>{
/* ---------- helpers locaux ---------- */
const U=(P,Q)=>{ const dx=Q[0]-P[0], dy=Q[1]-P[1], L=Math.hypot(dx,dy)||1; return [dx/L,dy/L]; };
// Triangle rectangle en C. o.p = [A, B, C] ; o.n = noms des sommets ; o.l = étiquettes des côtés [BC, AC, AB] ;
// o.sc = couleurs des côtés ; o.ang = étiquette de l’angle en A ; o.x, o.y = cadre
function rt(o){
  const [A,B,C]=o.p, P=plane({x:o.x,y:o.y,grid:false,axes:false,w:o.w||320});
  const span=o.x[1]-o.x[0], d=o.d??span*.06, s=o.s??span*.04;
  P.poly([A,B,C],{fill:o.fill||'var(--accent)',fo:.1,c:'var(--ink)',w:2});
  const sides=[[B,C],[A,C],[A,B]];
  if(o.sc) sides.forEach(([X,Y],i)=>{ if(o.sc[i]) P.seg(X[0],X[1],Y[0],Y[1],{c:o.sc[i],w:5}); });
  const u=U(C,A), v=U(C,B);
  P.poly([[C[0]+u[0]*s,C[1]+u[1]*s],[C[0]+(u[0]+v[0])*s,C[1]+(u[1]+v[1])*s],[C[0]+v[0]*s,C[1]+v[1]*s]],{open:true,c:'var(--ink)',w:1.5});
  const G=[(A[0]+B[0]+C[0])/3,(A[1]+B[1]+C[1])/3];
  if(o.n) [A,B,C].forEach((Q,i)=>{ const e=U(G,Q); P.text(Q[0]+e[0]*d,Q[1]+e[1]*d,o.n[i],{a:'middle',dy:5}); });
  if(o.l){ const sc=(o.w||320)/span; [[B,C],[A,C],[A,B]].forEach(([X,Y],i)=>{ if(!o.l[i]) return; const M=[(X[0]+Y[0])/2,(X[1]+Y[1])/2];
    let n=U(X,Y); n=[-n[1],n[0]]; if(n[0]*(M[0]-G[0])+n[1]*(M[1]-G[1])<0) n=[-n[0],-n[1]];
    const hw=String(o.l[i]).replace(/<[^>]+>/g,'').length*3.6, off=(7+Math.abs(n[0])*hw+Math.abs(n[1])*7)/sc;
    P.text(M[0]+n[0]*off,M[1]+n[1]*off,o.l[i],{a:'middle',dy:5,c:o.sc&&o.sc[i]||'var(--ink)'}); }); }
  if(o.ang){ let a1=Math.atan2(B[1]-A[1],B[0]-A[0]), a2=Math.atan2(C[1]-A[1],C[0]-A[0]);
    if(a2-a1>Math.PI) a2-=2*Math.PI; if(a1-a2>Math.PI) a1-=2*Math.PI; const r=o.ar??span*.1;
    P.curve(t=>A[0]+r*Math.cos(t),t=>A[1]+r*Math.sin(t),a1,a2,{c:'var(--spark)',w:2.5,n:40});
    const m=(a1+a2)/2; P.text(A[0]+1.8*r*Math.cos(m),A[1]+1.8*r*Math.sin(m),o.ang,{a:'middle',dy:5,c:'var(--spark)'}); }
  return P.svg();
}
// points d’un arc de cercle (angles en degrés) et secteur
const arcPts=(cx,cy,r,a0,a1,n=60)=>Array.from({length:n+1},(_,i)=>{ const t=rad(a0+(a1-a0)*i/n); return [cx+r*Math.cos(t),cy+r*Math.sin(t)]; });
const sector=(P,cx,cy,r,a0,a1,q)=>P.poly([[cx,cy],...arcPts(cx,cy,r,a0,a1)],q);
// la pizza découpée en n parts et remise tête-bêche
function slices(n,r=2){
  const al=2*Math.PI/n, c=2*r*Math.sin(al/2), y0=r*(1-Math.cos(al/2));
  const P=plane({x:[-.6,7.4],y:[-.9,2.9],grid:false,axes:false});
  const sl=(ax,ay,mid,col)=>P.poly([[ax,ay],...Array.from({length:21},(_,i)=>{ const t=mid-al/2+al*i/20; return [ax+r*Math.cos(t),ay+r*Math.sin(t)]; })],{fill:col,fo:.55,c:'var(--ink)',w:1});
  for(let k=0;k<n/2;k++){ sl(c/2+k*c,r,-Math.PI/2,'var(--spark)'); sl((k+1)*c,y0,Math.PI/2,'var(--accent)'); }
  const W=(n/2)*c;
  P.seg(c/2,-.45,c/2+W,-.45,{c:'var(--math)',w:2}).text(c/2+W/2,-.45,'≈ π × r',{a:'middle',dy:-6,c:'var(--math)'});
  P.seg(-.25,0,-.25,r,{c:'var(--math)',w:2}).text(-.25,r/2,'r',{a:'middle',dx:-9,dy:5,c:'var(--math)'});
  return P.svg();
}
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;

COURS.push(
/* ===================== CERCLE, DISQUE ET DÉCOMPOSITION ===================== */
{subj:'sec', sem:'a10', id:'sec10-cercle', o:2, h:'Cercle, disque et décomposition', p:'Le nombre π, le périmètre et l’aire du disque, les parts de pizza (arcs et secteurs), les figures composées et la grandeur manquante.', steps:[
 {kind:'Théorie',h:'Cercle et disque',p:`<p>Une pizza, une roue de skate, le rond central d’un terrain de foot, un cadran de montre : les ronds sont partout. Pour les mesurer, il faut d’abord les nommer avec précision.</p>
<div class="def"><p>Le <b>cercle</b> de centre O et de rayon <i>r</i> est la ligne formée de tous les points situés à la distance <i>r</i> du point O. Le <b>disque</b> est toute la surface à l’intérieur, bord compris. Un <b>rayon</b> est un segment qui va du centre à un point du cercle. Un <b>diamètre</b> est un segment qui relie deux points du cercle en passant par le centre. On note <i>d</i> sa longueur : <b><i>d</i> = 2 · <i>r</i></b>.</p></div>
<div class="idea"><p>Pense au compas : la pointe est le centre, l’écartement est le rayon. Le crayon dessine le cercle. Le diamètre, c’est deux rayons mis bout à bout, d’un côté à l’autre du centre.</p></div>
<div class="ex"><p>Une roue de vélo a un diamètre de 70 cm. Son rayon vaut 70 : 2 = 35 cm. Un rond-point a un rayon de 12 m : son diamètre vaut 2 · 12 = 24 m.</p></div>
<div class="warn"><p>Le <b>cercle</b> est une ligne : on mesure sa longueur, le <b>périmètre</b>, en cm ou en m. Le <b>disque</b> est une surface : on mesure son <b>aire</b>, en cm² ou en m².</p></div>`,
  fig:(()=>{ const P=plane({x:[-4.4,4.4],y:[-3.3,3.3],grid:false,axes:false});
    P.circ(0,0,3,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:3});
    P.seg(-3,0,3,0,{c:'var(--spark)',w:3}).seg(0,0,2.12,2.12,{c:'var(--math)',w:3});
    P.dot(0,0,{r:5,c:'var(--ink)'}).text(0,0,'O',{a:'middle',dy:20});
    P.text(1.6,1,'rayon r',{c:'var(--math)'}).text(-1.5,0,'diamètre d',{a:'middle',dy:-8,c:'var(--spark)'});
    P.text(-2.6,2.4,'cercle',{a:'end',c:'var(--accent)'}).text(-.6,-1.6,'disque',{a:'middle',c:'var(--muted)'});
    return P.svg(); })()},
 {kind:'Théorie',h:'Le nombre π',p:`<p>Prends une boîte de conserve, entoure-la d’une ficelle, puis compare la longueur de la ficelle au diamètre de la boîte. Recommence avec une assiette, puis une roue. Surprise : le tour fait toujours un peu plus de 3 fois le diamètre.</p>
<div class="def"><p>Pour tous les cercles, le quotient <b>périmètre : diamètre</b> donne le même nombre. On l’appelle <b>π</b> (lire « pi », une lettre grecque). <b>π ≈ 3,14</b>. Ses chiffres après la virgule ne s’arrêtent jamais et ne se répètent pas : 3,14159265…</p></div>
<div class="prop"><p>Le périmètre d’un cercle vaut donc <b>P = π · <i>d</i></b>, ou, puisque <i>d</i> = 2<i>r</i>, <b>P = 2 · π · <i>r</i></b>.</p></div>
<div class="idea"><p>Bouge le curseur : on déroule le cercle sur la ligne. Il faut toujours 3 diamètres et un petit bout pour faire le tour, quelle que soit la taille.</p></div>
<div class="ex"><p>Une boîte de 10 cm de diamètre : P = π · 10 ≈ 31,4 cm. Un cerceau de rayon 50 cm : P = 2 · π · 50 = 100π ≈ 314 cm.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Vers −250, le savant grec Archimède a coincé π entre deux polygones à 96 côtés : il a prouvé que π est entre 3,1408 et 3,1429. Aujourd’hui, les ordinateurs connaissent des milliers de milliards de décimales. Le 14 mars (3/14 en anglais) est la journée de π.</p></div>`,
  params:[{id:'d',l:'Diamètre d',min:1,max:6,step:.5,v:3,u:' cm'}],
  draw:v=>{ const P=plane({x:[-.5,20],y:[-1.8,6.4],grid:false,axes:false}), d=v.d, L=Math.PI*d;
    P.circ(d/2,d/2,d/2,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:3}).seg(0,d/2,d,d/2,{c:'var(--spark)',w:2.5});
    P.seg(0,0,19.5,0,{c:'var(--line)',w:1.5}).seg(0,-.5,L,-.5,{c:'var(--accent)',w:5});
    const cols=['var(--spark)','var(--math)','var(--spark)'];
    for(let k=0;k<3;k++) P.seg(k*d,-1.2,(k+1)*d,-1.2,{c:cols[k],w:5});
    P.text(L,-.5,'tour',{dx:6,dy:5,c:'var(--accent)'}).text(3*d,-1.2,'3 d',{dx:6,dy:5,c:'var(--muted)'});
    return P.svg(); },
  info:v=>`Diamètre ${fmt(v.d)} cm, tour ≈ ${fmt(Math.PI*v.d)} cm. Tour : diamètre ≈ ${fmt(Math.PI,4)}, toujours le même nombre.`},
 {kind:'Méthode',h:'Calculer le périmètre d’un cercle',p:`<b>Quand :</b> on cherche la longueur du tour d’un objet rond (roue, cerceau, bordure de piscine) et on connaît son rayon ou son diamètre. <b>Pourquoi ça marche :</b> par définition de π, le tour vaut π fois le diamètre. <b>Comment :</b> 1) regarde si on te donne <i>r</i> ou <i>d</i> ; 2) écris la formule P = π · <i>d</i> ou P = 2 · π · <i>r</i> ; 3) remplace et calcule avec la touche π de la calculatrice ; 4) arrondis seulement à la fin. Rédige toujours en trois temps : une phrase, le calcul, la réponse avec l’unité.`,
  demo:{enonce:'Une roue de vélo a un diamètre de 70 cm. De combien avance le vélo quand la roue fait un tour&nbsp;? Combien de tours fait la roue sur 1 km&nbsp;?',
   etapes:[
    {f:'On connaît <i>d</i> = 70 cm.',w:'On nous donne le diamètre, pas le rayon : on prend la formule avec <i>d</i>.'},
    {f:'P = π · 70 ≈ 219,91 cm',w:'Touche π, puis arrondi au centième. Un tour de roue fait avancer le vélo de la longueur du tour.'},
    {f:'1 km = 1000 m = 100 000 cm',w:'Pour diviser, les deux longueurs doivent être dans la même unité.'},
    {f:'100 000 : 219,91 ≈ 454,7',w:'On cherche combien de fois 219,91 cm entre dans 100 000 cm.'}],
   conclusion:'À chaque tour, le vélo avance d’environ 219,91 cm, soit 2,2 m. Sur 1 km, la roue fait environ 455 tours.'},
  note:'Avec π ≈ 3,14, on trouve 219,8 cm : c’est une bonne estimation, un peu moins précise que la touche π.'},
 {h:'Le tour du cerceau',p:'Un cerceau de gymnastique a un rayon de 40 cm. Quel est son périmètre, arrondi au centimètre&nbsp;?',lab:'P ≈',unit:'cm',ans:251,tol:1,
  why:'P = 2 · π · r = 2 · π · 40 = 80π ≈ 251,33 cm, donc environ 251 cm.'},
 {kind:'Théorie',h:'L’aire du disque',p:`<p>Combien de sauce faut-il pour couvrir une pizza ? Cela dépend de son <b>aire</b>. Mais un disque n’a pas de côté droit : impossible de faire « longueur × largeur ». L’astuce : couper la pizza en parts.</p>
<div class="thm"><p>L’aire d’un disque de rayon <i>r</i> vaut <b>A = π · <i>r</i> · <i>r</i> = π<i>r</i>²</b>.</p></div>
<div class="why"><p>Coupe le disque en parts égales et range-les tête-bêche, une pointe en haut, une pointe en bas. Bouge le curseur : avec beaucoup de parts, on obtient presque un <b>rectangle</b>. Sa hauteur est le rayon <i>r</i>. Sa longueur est la moitié du tour (l’autre moitié des croûtes est en haut) : la moitié de 2π<i>r</i>, soit π<i>r</i>. Son aire vaut donc π<i>r</i> × <i>r</i> = π<i>r</i>².</p></div>
<div class="ex"><p>Disque de rayon 3 cm : A = π · 3² = π · 9 ≈ 28,27 cm². Disque de rayon 10 cm : A = π · 100 ≈ 314,16 cm².</p></div>
<div class="warn"><p><i>r</i>² veut dire <i>r</i> × <i>r</i>, pas 2 × <i>r</i>. Pour <i>r</i> = 3, <i>r</i>² = 9 et pas 6.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Il y a environ 3600 ans, un scribe égyptien, Ahmès, calculait l’aire d’un champ rond avec un carré de côté 8/9 du diamètre. Cela revient à prendre π ≈ 3,16. Pas mal du tout !</p></div>`,
  params:[{id:'n',l:'Nombre de parts',min:4,max:40,step:2,v:6}],
  draw:v=>slices(v.n),
  info:v=>{ const c=2*2*Math.sin(Math.PI/v.n); return `Rayon r = 2. Avec ${v.n} parts, la longueur vaut ${fmt(v.n/2*c)} et π × r ≈ ${fmt(2*Math.PI)}. La forme ressemble de plus en plus à un rectangle de π<i>r</i> sur <i>r</i>.`; }},
 {kind:'Méthode',h:'Calculer l’aire d’un disque',p:`<b>Quand :</b> on cherche la surface d’un objet rond (pizza, tapis, bassin). <b>Pourquoi ça marche :</b> le disque découpé en parts devient un rectangle de π<i>r</i> sur <i>r</i>. <b>Comment :</b> 1) trouve le <b>rayon</b> (si on donne le diamètre, divise-le par 2) ; 2) calcule <i>r</i>² = <i>r</i> × <i>r</i> ; 3) multiplie par π ; 4) arrondis et écris l’unité d’aire (cm², m²). Phrase, calcul, réponse.`,
  demo:{enonce:'Une pizza a un diamètre de 30 cm. Quelle est son aire&nbsp;?',
   etapes:[
    {f:'<i>r</i> = 30 : 2 = 15 cm',w:'La formule utilise le rayon. Le piège serait de mettre 30 dans la formule.'},
    {f:'<i>r</i>² = 15 × 15 = 225',w:'Le carré du rayon, c’est le rayon multiplié par lui-même.'},
    {f:'A = π · 225 ≈ 706,86 cm²',w:'On multiplie par π avec la calculatrice et on arrondit au centième.'}],
   conclusion:'La pizza a une aire d’environ 706,86 cm². Pour comparer : une feuille A4 fait environ 624 cm².'}},
 {h:'Une grande ou deux moyennes&nbsp;?',p:'Pour le même prix, tu peux avoir une pizza de 36 cm de diamètre ou deux pizzas de 25 cm de diamètre. Quel choix donne le plus de pizza&nbsp;?',
  fig:(()=>{ const P=plane({x:[0,10.2],y:[0,3.9],grid:false,axes:false});
    P.circ(1.9,1.9,1.8,{fill:'var(--spark)',fo:.35,c:'var(--ink)',w:2}).circ(5.6,1.9,1.25,{fill:'var(--accent)',fo:.35,c:'var(--ink)',w:2}).circ(8.6,1.9,1.25,{fill:'var(--accent)',fo:.35,c:'var(--ink)',w:2});
    P.text(1.9,1.9,'36 cm',{a:'middle',dy:5}).text(5.6,1.9,'25 cm',{a:'middle',dy:5}).text(8.6,1.9,'25 cm',{a:'middle',dy:5});
    return P.svg(); })(),
  opts:['Les deux pizzas de 25 cm','La pizza de 36 cm','Exactement la même quantité','On ne peut pas comparer'],ans:1,
  why:'Grande : r = 18, A = π · 324 ≈ 1017,88 cm². Moyenne : r = 12,5, A = π · 156,25 ≈ 490,87 cm², donc deux font ≈ 981,75 cm². La grande gagne d’environ 36 cm².'},
 {kind:'Théorie',h:'Arcs et secteurs',p:`<p>Une part de pizza, la zone balayée par un essuie-glace, une tranche d’un diagramme circulaire : ce sont des morceaux de disque. Comment mesurer seulement un morceau ?</p>
<div class="def"><p>Un <b>secteur</b> est la part de disque comprise entre deux rayons. L’angle entre ces rayons, au centre, est l’<b>angle au centre</b> α (lire « alpha »). Le bout de cercle qui borde le secteur est un <b>arc</b>.</p></div>
<div class="prop"><p>La longueur de l’arc et l’aire du secteur sont <b>proportionnelles</b> à l’angle :<br>longueur de l’arc = ${F('α','360')} · 2π<i>r</i> &nbsp; et &nbsp; aire du secteur = ${F('α','360')} · π<i>r</i>².</p></div>
<div class="why"><p>Un tour complet fait 360°. Un angle de 90°, c’est ${F(90,360)} = ${F(1,4)} de tour : on obtient un quart du périmètre et un quart de l’aire. Si l’angle double, la part double. C’est la proportionnalité que tu connais.</p></div>
<div class="ex"><p>Rayon 4 cm, angle 90° : arc = ${F(1,4)} · 8π = 2π ≈ 6,28 cm ; aire = ${F(1,4)} · 16π = 4π ≈ 12,57 cm². Un demi-disque (180°), c’est la moitié du tout.</p></div>
<p>Bouge les curseurs et regarde la fraction du tour.</p>`,
  params:[{id:'a',l:'Angle au centre α',min:0,max:360,step:15,v:90,u:'°'},{id:'r',l:'Rayon r',min:1,max:5,v:3,u:' cm'}],
  draw:v=>{ const P=plane({x:[-5.5,5.5],y:[-5.5,5.5],grid:false,axes:false,w:280});
    P.circ(0,0,v.r,{c:'var(--line)',w:2}); if(v.a>0){ sector(P,0,0,v.r,0,v.a,{fill:'var(--spark)',fo:.45,c:'var(--ink)',w:1.5}); P.poly(arcPts(0,0,v.r,0,v.a),{open:true,c:'var(--accent)',w:5}); }
    P.dot(0,0,{r:4,c:'var(--ink)'}); return P.svg(); },
  info:v=>`Fraction du tour : ${F(v.a,360)} ≈ ${fmt(v.a/360,3)}. Arc ≈ ${fmt(v.a/360*2*Math.PI*v.r)} cm, secteur ≈ ${fmt(v.a/360*Math.PI*v.r*v.r)} cm².`},
 {kind:'Méthode',h:'Calculer un arc ou un secteur',p:`<b>Quand :</b> on ne prend qu’un morceau du cercle ou du disque, défini par un angle au centre. <b>Pourquoi ça marche :</b> la part est proportionnelle à l’angle, et le tour complet vaut 360°. <b>Comment :</b> 1) calcule la fraction du tour ${F('α','360')} et simplifie-la ; 2) calcule le périmètre entier 2π<i>r</i> (pour un arc) ou l’aire entière π<i>r</i>² (pour un secteur) ; 3) multiplie par la fraction ; 4) arrondis à la fin avec l’unité.`,
  demo:{enonce:'Une pizza de rayon 15 cm est coupée en parts de 60°. Quelle est la longueur de la croûte d’une part, et l’aire d’une part&nbsp;?',
   etapes:[
    {f:`${F(60,360)} = ${F(1,6)}`,w:'Une part de 60° représente un sixième du tour.'},
    {f:'Tour entier : 2 · π · 15 = 30π ; arc = 30π : 6 = 5π ≈ 15,71 cm',w:'La croûte est l’arc : un sixième du périmètre.'},
    {f:'Aire entière : π · 15² = 225π ; secteur = 225π : 6 = 37,5π ≈ 117,81 cm²',w:'La part est un secteur : un sixième de l’aire du disque.'}],
   conclusion:'Une part a une croûte d’environ 15,71 cm et une aire d’environ 117,81 cm².'}},
 {kind:'Pratique',h:'Règle l’angle',p:'Le cercle a un rayon de 6 cm. Règle l’angle au centre pour que l’arc mesure 2π cm, soit environ 6,28 cm. Calcule avant de bouger le curseur.',
  params:[{id:'a',l:'Angle au centre α',min:10,max:180,step:10,v:90,u:'°'}],
  draw:v=>{ const P=plane({x:[-6.8,6.8],y:[-6.8,6.8],grid:false,axes:false,w:260});
    P.circ(0,0,6,{c:'var(--line)',w:2}); sector(P,0,0,6,0,v.a,{fill:'var(--spark)',fo:.35,c:'var(--ink)',w:1.5}); P.poly(arcPts(0,0,6,0,v.a),{open:true,c:'var(--accent)',w:5});
    P.dot(0,0,{r:4,c:'var(--ink)'}).text(3,0,'6 cm',{a:'middle',dy:16}); return P.svg(); },
  info:v=>`Fraction du tour : ${F(v.a,360)}`,
  ok:v=>v.a===60,why:'Le tour entier vaut 2π · 6 = 12π. On veut 2π, soit 2π : 12π = 1/6 du tour. Et 1/6 de 360° = 60°.'},
 {kind:'Méthode',h:'Aire d’une figure composée',p:`<b>Quand :</b> la figure est faite de morceaux connus (rectangle, triangle, demi-disque, quart de disque) ou c’est une grande figure avec un trou. <b>Pourquoi ça marche :</b> quand on colle des morceaux sans qu’ils se chevauchent, les aires s’<b>additionnent</b> ; quand on enlève un morceau, on <b>soustrait</b> son aire. <b>Comment :</b> 1) découpe la figure sur un croquis ; 2) calcule l’aire de chaque morceau ; 3) additionne ou soustrais ; 4) pour le périmètre, ne compte que le <b>bord extérieur</b>, jamais les traits de découpe. Un demi-disque a la moitié de l’aire du disque, un quart de disque le quart.`,
  fig:(()=>{ const P=plane({x:[-1.4,9.4],y:[-1.6,17.2],grid:false,axes:false,w:200});
    P.rect(0,0,8,12,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2}); sector(P,4,12,4,0,180,{fill:'var(--spark)',fo:.35,c:'var(--ink)',w:2});
    P.seg(0,12,8,12,{c:'var(--ink)',w:1.5,dash:true}).text(4,0,'80 cm',{a:'middle',dy:16}).text(8,6,'120 cm',{dx:6,dy:5});
    return P.svg(); })(),
  demo:{enonce:'Une fenêtre est formée d’un rectangle de 80 cm sur 120 cm, surmonté d’un demi-disque de diamètre 80 cm. Calcule l’aire de la vitre et la longueur du cadre.',
   etapes:[
    {f:'Rectangle : 80 × 120 = 9600 cm²',w:'Premier morceau : longueur × largeur.'},
    {f:'Demi-disque : <i>r</i> = 40, π · 40² : 2 = 800π ≈ 2513,27 cm²',w:'Le diamètre 80 cm donne le rayon 40 cm. On prend la moitié de l’aire du disque.'},
    {f:'Aire totale ≈ 9600 + 2513,27 = 12 113,27 cm²',w:'Les deux morceaux sont collés sans se chevaucher : on additionne.'},
    {f:'Cadre : 80 + 2 · 120 + π · 80 : 2 ≈ 320 + 125,66 = 445,66 cm',w:'Le bord extérieur : le bas, les deux côtés et le demi-cercle. Le trait pointillé n’en fait pas partie.'}],
   conclusion:'La vitre mesure environ 12 113 cm², soit environ 1,21 m², et le cadre environ 4,46 m.'}},
 {h:'Les coins du carré',p:'Un disque est dessiné dans un carré de 8 cm de côté : il touche les quatre côtés. Quelle est l’aire de la partie colorée (les quatre coins), arrondie au centième&nbsp;?',
  fig:(()=>{ const P=plane({x:[-.6,8.6],y:[-.9,8.6],grid:false,axes:false,w:220});
    P.rect(0,0,8,8,{fill:'var(--spark)',fo:.45,c:'var(--ink)',w:2}).circ(4,4,4,{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2}); P.text(4,0,'8 cm',{a:'middle',dy:16}); return P.svg(); })(),
  lab:'A ≈',unit:'cm²',ans:13.73,tol:.06,
  why:'Le disque a un rayon de 8 : 2 = 4 cm. Aire du carré : 8 · 8 = 64 cm². Aire du disque : π · 16 ≈ 50,27 cm². Les coins : 64 − 50,27 ≈ 13,73 cm².'},
 {kind:'Méthode',h:'Retrouver une grandeur manquante',p:`<b>Quand :</b> on connaît le résultat d’une formule (un périmètre, une aire) et on cherche une des mesures. <b>Pourquoi ça marche :</b> une formule est une suite d’opérations. Pour remonter, on fait l’<b>opération contraire</b> : une multiplication se défait par une division. <b>Comment :</b> 1) écris la formule et remplace ce que tu connais ; 2) repère ce qui multiplie la mesure cherchée ; 3) divise le résultat par ce nombre ; 4) vérifie en refaisant le calcul dans le bon sens. Exemples de formules retournées : <i>r</i> = P : (2π), <i>d</i> = P : π, hauteur d’un triangle <i>h</i> = 2A : <i>b</i>.`,
  demo:{enonce:'a) Un triangle a une aire de 24 cm² et une base de 8 cm. Quelle est sa hauteur&nbsp;? b) Avec une corde de 100 cm, on trace un cercle. Quel est son rayon&nbsp;?',
   etapes:[
    {f:'a) A = <i>b</i> · <i>h</i> : 2, donc 8 · <i>h</i> : 2 = 24',w:'On remplace dans la formule de l’aire du triangle.'},
    {f:'8 · <i>h</i> = 48, donc <i>h</i> = 48 : 8 = 6 cm',w:'On défait la division par 2 (on multiplie 24 par 2), puis la multiplication par 8 (on divise par 8).'},
    {f:'b) P = 2 · π · <i>r</i> = 100',w:'La corde fait le tour : c’est le périmètre.'},
    {f:'<i>r</i> = 100 : (2π) ≈ 15,92 cm',w:'<i>r</i> est multiplié par 2π : on divise 100 par 2π. Vérification : 2 · π · 15,92 ≈ 100 ✓.'}],
   conclusion:'Le triangle a une hauteur de 6 cm et le cercle un rayon d’environ 15,92 cm.'},
  note:'Si on connaît l’aire d’un disque, par exemple 49π cm², alors <i>r</i>² = 49 et <i>r</i> = 7 cm : on cherche le nombre dont le carré vaut 49.'},
 {h:'Le tronc de l’arbre',p:'Le tour du tronc d’un vieux chêne mesure 2,5 m. Quel est son diamètre, en centimètres, arrondi au centimètre&nbsp;?',lab:'d ≈',unit:'cm',ans:80,tol:.6,
  why:'P = π · d, donc d = P : π = 250 : π ≈ 79,58 cm, soit environ 80 cm.'},
 {kind:'Défi',h:'La corde autour de la Terre',p:'On tend une corde tout autour de l’équateur, collée au sol (environ 40 000 km). On rallonge la corde de seulement 1 m et on la soulève pour qu’elle flotte partout à la même hauteur. Peut-on passer dessous&nbsp;?',
  opts:['Non, elle est à peine à 1 mm du sol','Un chat peut passer : elle est à environ 16 cm','Un humain peut passer : elle est à environ 2 m','Elle est à environ 1 m'],ans:1,
  why:'Stratégie : commencer par un cas plus simple, un ballon de rayon 10 cm. Le périmètre vaut 2πr. Ajouter 1 m = 100 cm au tour ajoute 100 : (2π) ≈ 15,92 cm au rayon, quelle que soit la taille du cercle. Pour la Terre aussi : environ 16 cm.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : cercle et disque',p:`<div class="keep"><ul><li><b>Vocabulaire</b> : le cercle est la ligne, le disque la surface. Diamètre <i>d</i> = 2<i>r</i>.</li><li><b>π</b> = périmètre : diamètre ≈ 3,14, le même pour tous les cercles.</li><li><b>Périmètre</b> : P = π · <i>d</i> = 2π<i>r</i> (unité de longueur).</li><li><b>Aire du disque</b> : A = π<i>r</i>² (unité d’aire). Toujours avec le <b>rayon</b> ; <i>r</i>² = <i>r</i> × <i>r</i>.</li><li><b>Arc et secteur</b> : proportionnels à l’angle au centre. On multiplie le tout par ${F('α','360')}.</li><li><b>Figure composée</b> : découper, calculer chaque morceau, additionner ou soustraire. Le périmètre ne compte que le bord extérieur.</li><li><b>Grandeur manquante</b> : défaire la formule par les opérations contraires, par exemple <i>r</i> = P : (2π), <i>h</i> = 2A : <i>b</i>.</li><li>Calculer avec la touche π, arrondir à la fin, rédiger : phrase, calcul, réponse avec l’unité.</li></ul></div>`},
 {kind:'Problème',h:'Le stade du village',
  p:'Le stade du village a une piste formée de deux lignes droites de 80 m et de deux virages en demi-cercle de 30 m de rayon, comme sur la figure. À l’intérieur de la piste, il y a de la pelouse. Tu veux t’entraîner pour une course de 5 km.',
  fig:(()=>{ const P=plane({x:[-4.6,12.6],y:[-4.2,4.2],grid:false,axes:false});
    P.rect(0,-3,8,6,{fill:'var(--ok)',fo:.25,c:null}); sector(P,0,0,3,90,270,{fill:'var(--ok)',fo:.25,c:null}); sector(P,8,0,3,-90,90,{fill:'var(--ok)',fo:.25,c:null});
    P.seg(0,3,8,3,{c:'var(--bad)',w:3}).seg(0,-3,8,-3,{c:'var(--bad)',w:3}).poly(arcPts(0,0,3,90,270),{open:true,c:'var(--bad)',w:3}).poly(arcPts(8,0,3,-90,90),{open:true,c:'var(--bad)',w:3});
    P.seg(8,0,11,0,{c:'var(--ink)',w:1.5,dash:true}).text(9.3,0,'30 m',{a:'middle',dy:-6}).text(4,3,'80 m',{a:'middle',dy:-8});
    return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la longueur d’un tour de piste, arrondie au dixième de mètre&nbsp;?',unit:'m',ans:348.5,tol:.1,hint:'Les deux demi-cercles forment ensemble un cercle entier de rayon 30 m.',why:'2 · 80 + 2 · π · 30 = 160 + 60π ≈ 160 + 188,50 = 348,50 m.'},
   {q:'b) Quelle est l’aire de la pelouse, arrondie au m²&nbsp;?',unit:'m²',ans:7627,tol:1,hint:'Découpe : un rectangle de 80 m sur 60 m, et deux demi-disques qui forment un disque entier.',why:'Rectangle : 80 · 60 = 4800 m². Disque : π · 30² = 900π ≈ 2827,43 m². Total ≈ 7627 m².'},
   {q:'c) Combien de tours complets dois-tu faire, au minimum, pour courir au moins 5 km&nbsp;?',lab:'tours :',ans:15,hint:'Convertis 5 km en mètres, divise par la longueur d’un tour, puis réfléchis à l’arrondi.',why:'5000 : 348,50 ≈ 14,35. Avec 14 tours, on ne fait que 4879 m : il faut 15 tours.'},
  ],
  sol:'Un tour comprend deux lignes droites (2 · 80 = 160 m) et deux demi-cercles qui forment un cercle de rayon 30 m (2 · π · 30 ≈ 188,50 m) : environ 348,50 m.<br>La pelouse se découpe en un rectangle de 80 m sur 2 · 30 = 60 m (4800 m²) et un disque de rayon 30 m (π · 900 ≈ 2827,43 m²) : environ 7627 m².<br>Pour 5 km = 5000 m : 5000 : 348,50 ≈ 14,35. On arrondit vers le haut, car 14 tours ne suffisent pas (14 · 348,50 = 4879 m).<br>Réponse : il faut 15 tours.'},
 {kind:'Problème',h:'Pizza : la bonne affaire',
  p:'Une pizzeria vend une pizza moyenne de 30 cm de diamètre à 15 CHF et une grande de 40 cm de diamètre à 24 CHF. Tu veux savoir laquelle est la plus avantageuse, en comparant le prix pour 100 cm² de pizza. Ensuite, la grande est coupée en 8 parts égales.',
  parts:[
   {q:'a) Quelle est l’aire de la pizza moyenne, arrondie au cm²&nbsp;?',unit:'cm²',ans:707,tol:.5,hint:'Le rayon vaut la moitié du diamètre.',why:'r = 15 cm, A = π · 225 ≈ 706,86 cm², soit environ 707 cm².'},
   {q:'b) Combien coûtent 100 cm² de la grande pizza, arrondi au centime&nbsp;?',unit:'CHF',ans:1.91,tol:.011,hint:'Calcule son aire, puis le prix d’un cm² (prix : aire), puis multiplie par 100.',why:'A = π · 20² ≈ 1256,64 cm². 24 : 1256,64 · 100 ≈ 1,91 CHF.'},
   {q:'c) Laquelle est la plus avantageuse&nbsp;?',opts:['La moyenne, car elle est moins chère','La grande : environ 1,91 CHF pour 100 cm² contre 2,12 CHF','Les deux se valent','La moyenne : environ 1,91 CHF pour 100 cm²'],ans:1,hint:'Calcule aussi le prix de 100 cm² de la moyenne et compare.',why:'Moyenne : 15 : 706,86 · 100 ≈ 2,12 CHF. Grande : 1,91 CHF. La grande donne plus de pizza par franc.'},
   {q:'d) Quelle est la longueur de la croûte d’une part de la grande pizza, arrondie au centième&nbsp;?',unit:'cm',ans:15.71,tol:.02,hint:'8 parts égales : chaque part a un angle de 360° : 8 = 45°, soit 1/8 du tour.',why:'Le tour vaut π · 40 = 40π ≈ 125,66 cm. Une part : 40π : 8 = 5π ≈ 15,71 cm.'},
  ],
  sol:'Moyenne : rayon 15 cm, aire π · 15² ≈ 706,86 cm². Prix pour 100 cm² : 15 : 706,86 · 100 ≈ 2,12 CHF.<br>Grande : rayon 20 cm, aire π · 20² ≈ 1256,64 cm². Prix pour 100 cm² : 24 : 1256,64 · 100 ≈ 1,91 CHF.<br>La grande est plus chère, mais elle donne presque deux fois plus de pizza : elle est plus avantageuse.<br>Une part de la grande est 1/8 du disque (angle 45°). Sa croûte est 1/8 du tour : π · 40 : 8 = 5π ≈ 15,71 cm.'},
]},

/* ===================== THÉORÈME DE PYTHAGORE ===================== */
{subj:'sec', sem:'a10', id:'sec10-pythagore', o:3, h:'Théorème de Pythagore', p:'Le triangle rectangle, les carrés sur ses côtés, le théorème et sa preuve, calculer un côté, la réciproque et les applications.', steps:[
 {kind:'Théorie',h:'Le triangle rectangle et son hypoténuse',p:`<p>Au parc, tu coupes en diagonale à travers la pelouse au lieu de longer les deux allées. Combien de mètres gagnes-tu ? Pour répondre, il faut un outil qui relie les trois côtés d’un triangle qui a un angle droit.</p>
<div class="def"><p>Un <b>triangle rectangle</b> a un angle droit (90°). Les deux côtés qui forment l’angle droit s’appellent les <b>côtés de l’angle droit</b>. Le troisième côté, en face de l’angle droit, s’appelle l’<b>hypoténuse</b>. On dit « le triangle ABC est rectangle en C » quand l’angle droit est au sommet C.</p></div>
<div class="idea"><p>L’hypoténuse est toujours le <b>plus long</b> des trois côtés. C’est le côté qui ne touche pas l’angle droit. Sur un dessin, l’angle droit est marqué par un petit carré.</p></div>
<div class="ex"><p>Le triangle ABC est rectangle en C : les côtés de l’angle droit sont [AC] et [BC], l’hypoténuse est [AB]. Si le triangle RST est rectangle en R, l’hypoténuse est [ST], le côté qui ne passe pas par R.</p></div>
<div class="warn"><p>L’hypoténuse n’est pas forcément « en bas » ou « en biais » sur le dessin. Cherche d’abord le petit carré, puis prends le côté d’en face.</p></div>`,
  fig:rt({p:[[0,0],[6,3.2],[6,0]],n:['A','B','C'],l:['côté de l’angle droit','côté de l’angle droit','hypoténuse'],sc:[null,null,'var(--spark)'],x:[-1,11],y:[-1.4,4.4],d:.55})},
 {h:'Trouve l’hypoténuse',p:'Le triangle KLM est rectangle en L. Quel côté est son hypoténuse&nbsp;?',
  fig:rt({p:[[0,3],[5,0],[0,0]],n:['K','M','L'],x:[-1.2,6.2],y:[-1,4],d:.5}),
  opts:['[KL]','[LM]','[KM]','On ne peut pas savoir sans les longueurs'],ans:2,why:'L’hypoténuse est en face de l’angle droit, donc c’est le côté qui ne passe pas par L : [KM].'},
 {kind:'Théorie',h:'Des carrés sur les côtés',p:`<p>Il y a plus de 2500 ans, on a fait une découverte étonnante : construis un carré sur chaque côté d’un triangle rectangle et compare leurs aires.</p>
<div class="thm"><p><b>Théorème de Pythagore.</b> Dans un triangle rectangle, l’aire du carré construit sur l’hypoténuse est égale à la somme des aires des carrés construits sur les deux autres côtés. Avec les longueurs <i>a</i> et <i>b</i> des côtés de l’angle droit et <i>c</i> celle de l’hypoténuse : <b><i>a</i>² + <i>b</i>² = <i>c</i>²</b>.</p></div>
<div class="idea"><p>Bouge les curseurs. Compte les petits carreaux dans les carrés bleu et jaune, additionne : tu obtiens l’aire du grand carré rose, toujours.</p></div>
<div class="ex"><p>Avec <i>a</i> = 3 et <i>b</i> = 4 : 3² + 4² = 9 + 16 = 25. Le grand carré a une aire de 25, donc son côté vaut 5, car 5² = 25. L’hypoténuse mesure 5.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Le théorème porte le nom de Pythagore, un savant grec d’il y a 2500 ans. Mais une tablette d’argile babylonienne, plus vieille de 1000 ans, contient déjà des listes de nombres qui le vérifient. Et en Chine, un livre ancien l’explique avec un dessin de carrés.</p></div>`,
  params:[{id:'a',l:'Côté a',min:1,max:6,v:3},{id:'b',l:'Côté b',min:1,max:6,v:4}],
  draw:v=>{ const a=v.a, b=v.b, P=plane({x:[-6.5,12.5],y:[-6.5,12.5],w:300,axes:false});
    P.poly([[0,0],[a,0],[a,-a],[0,-a]],{fill:'var(--math)',fo:.35,c:'var(--ink)',w:1.5});
    P.poly([[0,0],[0,b],[-b,b],[-b,0]],{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:1.5});
    P.poly([[a,0],[0,b],[b,a+b],[a+b,a]],{fill:'var(--bad)',fo:.3,c:'var(--ink)',w:1.5});
    P.poly([[0,0],[a,0],[0,b]],{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2.5});
    P.text(a/2,-a/2,`${a*a}`,{a:'middle',dy:5}).text(-b/2,b/2,`${b*b}`,{a:'middle',dy:5}).text((a+b)/2,(a+b)/2,`${a*a+b*b}`,{a:'middle',dy:5});
    return P.svg(); },
  info:v=>`a² + b² = ${v.a*v.a} + ${v.b*v.b} = ${v.a*v.a+v.b*v.b}. Aire du carré sur l’hypoténuse : c² = ${v.a*v.a+v.b*v.b}, donc c ≈ ${fmt(Math.hypot(v.a,v.b))}.`},
 {kind:'Théorie',h:'Pourquoi c’est vrai : la preuve par découpage',p:`<p>Vérifier sur quelques exemples ne suffit pas : il faut être sûr que ça marche pour <b>tous</b> les triangles rectangles. Voici une preuve qu’on peut faire avec des ciseaux.</p>
<div class="why"><p>Prends deux grands carrés identiques, de côté <i>a</i> + <i>b</i>. Dans chacun, place les <b>mêmes quatre triangles</b> rectangles de côtés <i>a</i>, <i>b</i> et <i>c</i>. Montage 1 : les triangles sont dans les coins, il reste au milieu un carré penché de côté <i>c</i>, d’aire <i>c</i>². Montage 2 : les triangles sont rangés deux par deux en rectangles, il reste deux carrés, d’aires <i>a</i>² et <i>b</i>².</p></div>
<div class="idea"><p>Les deux grands carrés ont la même aire. On y enlève les mêmes quatre triangles. Ce qui reste a donc la même aire dans les deux montages : <i>c</i>² = <i>a</i>² + <i>b</i>². Passe d’un montage à l’autre avec le curseur.</p></div>
<div class="ex"><p>Avec <i>a</i> = 2 et <i>b</i> = 5, le grand carré a pour côté 7 et pour aire 49. Les quatre triangles font 4 · (2 · 5 : 2) = 20. Il reste 49 − 20 = 29, et en effet 2² + 5² = 4 + 25 = 29.</p></div>
<div class="warn"><p>Le théorème ne marche que si le triangle est <b>rectangle</b>. Pour un triangle de côtés 4, 5 et 6, on a 4² + 5² = 41, mais 6² = 36.</p></div>`,
  params:[{id:'m',l:'Montage',min:1,max:2,v:1},{id:'a',l:'Côté a (et b = 7 − a)',min:1,max:6,v:2}],
  draw:v=>{ const a=v.a, b=7-v.a, P=plane({x:[-.4,7.4],y:[-.4,7.4],w:260,grid:false,axes:false});
    const tri=q=>P.poly(q,{fill:'var(--accent)',fo:.35,c:'var(--ink)',w:1.5});
    P.rect(0,0,7,7,{c:'var(--ink)',w:2.5});
    if(v.m===1){ P.poly([[a,0],[7,a],[7-a,7],[0,7-a]],{fill:'var(--bad)',fo:.3,c:null}).text(3.5,3.5,'c²',{a:'middle',dy:5,s:16});
      tri([[0,0],[a,0],[0,b]]); tri([[7,0],[7,a],[a,0]]); tri([[7,7],[7-a,7],[7,a]]); tri([[0,7],[0,7-a],[7-a,7]]); }
    else { P.rect(0,0,a,a,{fill:'var(--math)',fo:.35,c:null}).rect(a,a,b,b,{fill:'var(--spark)',fo:.4,c:null});
      P.text(a/2,a/2,'a²',{a:'middle',dy:5,s:16}).text(a+b/2,a+b/2,'b²',{a:'middle',dy:5,s:16});
      tri([[a,0],[7,0],[7,a]]); tri([[a,0],[a,a],[7,a]]); tri([[0,a],[0,7],[a,7]]); tri([[0,a],[a,a],[a,7]]); }
    return P.svg(); },
  info:v=>{ const a=v.a, b=7-v.a; return v.m===1?`Montage 1 : il reste c² = 49 − 4 · ${F(a+' · '+b,2)} = ${49-2*a*b}.`:`Montage 2 : il reste a² + b² = ${a*a} + ${b*b} = ${a*a+b*b}.`; }},
 {kind:'Méthode',h:'Calculer l’hypoténuse',p:`<b>Quand :</b> le triangle est rectangle et on connaît les deux côtés de l’angle droit. <b>Pourquoi ça marche :</b> le théorème donne <i>c</i>² = <i>a</i>² + <i>b</i>², puis <i>c</i> est le nombre positif dont le carré vaut <i>c</i>² : sa <b>racine carrée</b>, notée √. <b>Comment :</b> 1) repère l’angle droit et l’hypoténuse ; 2) écris l’égalité de Pythagore avec les noms des côtés ; 3) calcule les carrés et leur somme ; 4) prends la racine carrée. Si la somme est un carré parfait (25, 100, 169…), tu trouves de tête. Sinon, utilise la touche √ de la calculatrice et arrondis. <b>Rédige sans fausse égalité</b> : chaque signe = relie deux choses vraiment égales.`,
  demo:{enonce:'Le triangle ABC est rectangle en C, avec AC = 6 cm et BC = 8 cm. Calcule AB, puis refais le calcul avec AC = 5 cm et BC = 7 cm.',
   etapes:[
    {f:'Le triangle est rectangle en C, donc AB² = AC² + BC²',w:'[AB] est en face de l’angle droit : c’est l’hypoténuse, elle est seule de son côté.'},
    {f:'AB² = 6² + 8² = 36 + 64 = 100',w:'On calcule les carrés, puis leur somme.'},
    {f:'AB = √100 = 10 cm',w:'10 × 10 = 100 : la racine de 100 est 10.'},
    {f:'Avec 5 et 7 : AB² = 25 + 49 = 74, donc AB = √74 ≈ 8,60 cm',w:'74 n’est pas un carré parfait : touche √ de la calculatrice, puis arrondi au centième.'}],
   conclusion:'AB = 10 cm dans le premier cas, AB ≈ 8,60 cm dans le second.'},
  note:'Fausse égalité à éviter : « 6² + 8² = 100 = 10 ». 100 n’est pas égal à 10 ! Écris plutôt « AB² = 100, donc AB = 10 ».'},
 {h:'À toi : l’hypoténuse',p:'Un triangle est rectangle. Les côtés de l’angle droit mesurent 4 cm et 9 cm. Combien mesure l’hypoténuse, arrondie au centième&nbsp;?',
  fig:rt({p:[[0,0],[9,4],[9,0]],l:['4 cm','9 cm','?'],x:[-1,10.6],y:[-1.4,5],d:.5}),
  lab:'c ≈',unit:'cm',ans:9.85,tol:.006,why:'c² = 4² + 9² = 16 + 81 = 97, donc c = √97 ≈ 9,85 cm.'},
 {kind:'Méthode',h:'Calculer un côté de l’angle droit',p:`<b>Quand :</b> le triangle est rectangle, on connaît l’hypoténuse et un côté de l’angle droit, et on cherche l’autre. <b>Pourquoi ça marche :</b> dans <i>a</i>² + <i>b</i>² = <i>c</i>², le grand carré est la somme des deux petits. Si on enlève un petit carré au grand, il reste l’autre : <b><i>a</i>² = <i>c</i>² − <i>b</i>²</b>. <b>Comment :</b> 1) repère l’hypoténuse ; 2) écris l’égalité de Pythagore ; 3) calcule (hypoténuse)² <b>moins</b> (côté connu)² ; 4) prends la racine carrée.`,
  demo:{enonce:'Une échelle de 5 m est appuyée contre un mur vertical. Son pied est à 1,4 m du mur. À quelle hauteur touche-t-elle le mur&nbsp;?',
   etapes:[
    {f:'Le mur et le sol forment un angle droit. L’échelle est l’hypoténuse.',w:'Elle est en face de l’angle droit, au pied du mur.'},
    {f:'<i>h</i>² + 1,4² = 5², donc <i>h</i>² = 5² − 1,4²',w:'On cherche un côté de l’angle droit : on soustrait.'},
    {f:'<i>h</i>² = 25 − 1,96 = 23,04',w:'1,4² = 1,4 × 1,4 = 1,96.'},
    {f:'<i>h</i> = √23,04 = 4,8 m',w:'Touche √. Contrôle : 4,8 &lt; 5, le côté est bien plus court que l’hypoténuse.'}],
   conclusion:'L’échelle touche le mur à 4,8 m de hauteur.'},
  note:'Piège : additionner au lieu de soustraire. Si tu trouves un côté plus long que l’hypoténuse, tu t’es trompé.'},
 {kind:'Pratique',h:'L’échelle contre le mur',p:'Une échelle de 5 m a son pied à 3 m du mur. Règle la hauteur où elle doit toucher le mur. Calcule d’abord, puis vérifie : le haut de l’échelle doit arriver pile sur le point visé.',
  params:[{id:'h',l:'Hauteur visée',min:1,max:5,step:.5,v:2,u:' m'}],
  draw:v=>{ const P=plane({x:[-1.2,4.4],y:[-.6,5.8],w:240,grid:false,axes:false}), L=Math.hypot(3,v.h), E=[3-5*3/L,5*v.h/L];
    P.rect(-1,0,1,5.6,{fill:'var(--muted)',fo:.25,c:'var(--ink)',w:1.5}).seg(-1.2,0,4.4,0,{c:'var(--ink)',w:2});
    P.seg(3,0,E[0],E[1],{c:'var(--spark)',w:5}); P.dot(0,v.h,{r:6,c:'var(--bad)'}).dot(3,0,{r:4,c:'var(--ink)'}).text(1.5,0,'3 m',{a:'middle',dy:16});
    return P.svg(); },
  info:v=>`Point visé à ${fmt(v.h)} m de hauteur.`,
  ok:v=>v.h===4,why:'h² = 5² − 3² = 25 − 9 = 16, donc h = √16 = 4 m.'},
 {h:'La rampe de skate',p:'Une rampe de skate a une planche inclinée de 2,6 m. Le pied de la rampe est à 2,4 m du bord vertical. Quelle est la hauteur de la rampe&nbsp;?',
  fig:rt({p:[[0,0],[2.4,1],[2.4,0]],l:['?','2,4 m','2,6 m'],x:[-.4,3.2],y:[-.4,1.5],d:.16}),
  lab:'h =',unit:'m',ans:1,tol:.001,why:'La planche est l’hypoténuse : h² = 2,6² − 2,4² = 6,76 − 5,76 = 1, donc h = √1 = 1 m.'},
 {kind:'Théorie',h:'La réciproque : le triangle est-il rectangle&nbsp;?',p:`<p>Un maçon veut construire un mur bien à angle droit, sans équerre géante. Il a seulement un mètre ruban. Peut-il vérifier un angle droit avec des longueurs ? Oui, grâce à la réciproque du théorème.</p>
<div class="thm"><p><b>Réciproque de Pythagore.</b> Si, dans un triangle, le carré du plus long côté est égal à la somme des carrés des deux autres, alors le triangle est rectangle, et l’angle droit est en face du plus long côté. Si ce n’est pas égal, le triangle n’est pas rectangle.</p></div>
<div class="idea"><p>Le théorème part de l’angle droit pour arriver à l’égalité. La réciproque fait le chemin inverse : elle part de l’égalité pour prouver l’angle droit.</p></div>
<div class="ex"><p>Côtés 5, 12 et 13 : 13² = 169 et 5² + 12² = 25 + 144 = 169. Égal : rectangle. Côtés 6, 7 et 9 : 9² = 81 mais 6² + 7² = 36 + 49 = 85. Pas égal : pas rectangle.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Les arpenteurs égyptiens utilisaient une corde à 13 nœuds, soit 12 intervalles égaux. Tendue en triangle de côtés 3, 4 et 5 intervalles, elle donne un angle droit parfait, car 3² + 4² = 5². Des nombres entiers comme (3, 4, 5), (5, 12, 13) ou (8, 15, 17) s’appellent des <b>triplets de Pythagore</b>.</p></div>`,
  fig:(()=>{ const P=plane({x:[-.8,5],y:[-.9,3.9],w:260,grid:false,axes:false});
    P.poly([[0,0],[4,0],[4,3]],{fill:'var(--accent)',fo:.12,c:'var(--ink)',w:2});
    for(let k=0;k<12;k++){ const p=k<4?[k,0]:k<7?[4,k-4]:[4-(k-7)*.8,3-(k-7)*.6]; P.dot(p[0],p[1],{r:4,c:'var(--spark)'}); }
    P.text(2,0,'3',{a:'middle',dy:18}).text(4,1.5,'4',{dx:10,dy:5}).text(1.8,1.6,'5',{a:'middle',dy:-6});
    return P.svg(); })()},
 {kind:'Méthode',h:'Tester si un triangle est rectangle',p:`<b>Quand :</b> on connaît les trois côtés d’un triangle et on veut savoir s’il a un angle droit. <b>Pourquoi ça marche :</b> c’est la réciproque du théorème de Pythagore. <b>Comment :</b> 1) repère le <b>plus long</b> côté ; 2) calcule son carré <b>à part</b> ; 3) calcule la somme des carrés des deux autres <b>à part</b> ; 4) compare. Égal : rectangle, l’angle droit est en face du plus long côté. Différent : pas rectangle. Ne commence pas par écrire une égalité que tu ne sais pas encore vraie.`,
  demo:{enonce:'Le triangle DEF a pour côtés DE = 20 cm, EF = 29 cm et DF = 21 cm. Est-il rectangle&nbsp;?',
   etapes:[
    {f:'Le plus long côté est [EF] = 29 cm.',w:'Si le triangle est rectangle, c’est forcément lui l’hypoténuse.'},
    {f:'D’une part : EF² = 29² = 841',w:'On calcule séparément, sans mettre de signe = entre les deux membres.'},
    {f:'D’autre part : DE² + DF² = 20² + 21² = 400 + 441 = 841',w:'La somme des carrés des deux autres côtés.'},
    {f:'On constate que EF² = DE² + DF².',w:'Les deux résultats sont égaux : la réciproque s’applique.'}],
   conclusion:'Le triangle DEF est rectangle en D, le sommet en face de [EF].'}},
 {h:'Lequel est rectangle&nbsp;?',p:'Un seul de ces triangles est rectangle. Lequel&nbsp;? (Les longueurs sont en cm.)',
  opts:['Côtés 7, 9 et 12','Côtés 5, 6 et 8','Côtés 10, 11 et 15','Côtés 8, 15 et 17'],ans:3,
  why:'17² = 289 et 8² + 15² = 64 + 225 = 289 : égal, rectangle. Pour les autres : 144 contre 130, 64 contre 61, 225 contre 221.'},
 {kind:'Méthode',h:'Pythagore en action : distance et diagonale',p:`<b>Quand :</b> on cherche une longueur « en biais » : la distance entre deux points d’un repère, la diagonale d’un rectangle ou d’un écran, le trajet direct à travers un terrain. <b>Pourquoi ça marche :</b> en traçant une ligne horizontale et une verticale, on fait apparaître un triangle rectangle dont la longueur cherchée est l’hypoténuse. <b>Comment :</b> 1) dessine le triangle rectangle caché ; 2) calcule ses côtés de l’angle droit (dans un repère : l’écart des abscisses et l’écart des ordonnées) ; 3) applique Pythagore.`,
  fig:(()=>{ const P=plane({x:[-1,9],y:[-1,11],w:220,lab:2}); P.poly([[1,2],[7,2],[7,10]],{fill:'var(--accent)',fo:.15,c:'var(--muted)',w:2,dash:true});
    P.seg(1,2,7,10,{c:'var(--spark)',w:4}).dot(1,2,{l:'A(1 ; 2)',dx:-10,dy:16}).dot(7,10,{l:'B(7 ; 10)',dx:-70}).text(4,2,'6',{a:'middle',dy:16}).text(7,6,'8',{dx:8,dy:5}); return P.svg(); })(),
  demo:{enonce:'Dans un repère, calcule la distance entre A(1 ; 2) et B(7 ; 10). Puis calcule la diagonale d’un écran de 40 cm sur 30 cm.',
   etapes:[
    {f:'Écart horizontal : 7 − 1 = 6 ; écart vertical : 10 − 2 = 8',w:'On va de A vers B en avançant de 6 et en montant de 8 : ce sont les côtés de l’angle droit.'},
    {f:'AB² = 6² + 8² = 36 + 64 = 100, donc AB = √100 = 10',w:'Le segment [AB] est l’hypoténuse.'},
    {f:'Écran : <i>d</i>² = 40² + 30² = 1600 + 900 = 2500',w:'La diagonale coupe l’écran rectangulaire en deux triangles rectangles.'},
    {f:'<i>d</i> = √2500 = 50 cm',w:'50 × 50 = 2500.'}],
   conclusion:'AB = 10 unités. L’écran a une diagonale de 50 cm.'},
  note:'Avec des coordonnées négatives, l’écart se calcule pareil : de −2 à 3, l’écart vaut 3 − (−2) = 5.'},
 {h:'Distance dans le repère',p:'Dans un repère, quelle est la distance entre les points M(−2 ; 1) et N(3 ; 13)&nbsp;?',lab:'MN =',ans:13,
  fig:(()=>{ const P=plane({x:[-4,5],y:[-1,14],w:180,lab:2}); P.seg(-2,1,3,13,{c:'var(--spark)',w:3}).dot(-2,1,{l:'M',dx:-18}).dot(3,13,{l:'N'}); return P.svg(); })(),
  why:'Écarts : 3 − (−2) = 5 et 13 − 1 = 12. MN² = 5² + 12² = 25 + 144 = 169, donc MN = √169 = 13.'},
 {kind:'Défi',h:'La baguette dans la boîte',p:'Une boîte en forme de pavé mesure 120 cm de long. Ses deux petites faces, aux bouts, sont des rectangles de 30 cm sur 40 cm. Quelle est la plus longue baguette bien droite qu’on peut y ranger, d’un coin de la boîte au coin le plus éloigné&nbsp;?',
  fig:(()=>{ const P=plane({x:[-2.2,16],y:[-1.2,5.4],grid:false,axes:false}), o=[2.4,1.6], F=[[0,0],[12,0],[12,3],[0,3]], B=F.map(p=>[p[0]+o[0],p[1]+o[1]]);
    [[B[0],B[1]],[B[0],B[3]],[B[0],F[0]]].forEach(([p,q])=>P.seg(p[0],p[1],q[0],q[1],{c:'var(--muted)',w:1.5,dash:true}));
    P.poly(F,{fill:'var(--accent)',fo:.08,c:'var(--ink)',w:2}).poly([F[3],F[2],B[2],B[3]],{fill:'var(--accent)',fo:.15,c:'var(--ink)',w:2}).poly([F[1],B[1],B[2],F[2]],{fill:'var(--accent)',fo:.22,c:'var(--ink)',w:2});
    P.seg(0,0,B[3][0],B[3][1],{c:'var(--math)',w:2.5,dash:true}).seg(0,0,B[2][0],B[2][1],{c:'var(--spark)',w:4});
    P.text(6,0,'120 cm',{a:'middle',dy:16}).text(0,1.5,'30 cm',{a:'end',dx:-6,dy:5}).text(13.2,.8,'40 cm',{dx:8,dy:5});
    return P.svg(); })(),
  lab:'longueur =',unit:'cm',ans:130,
  why:'Stratégie : découper le problème en deux étapes plus simples. Étape 1 : la diagonale d’une petite face (pointillés violets) vaut √(30² + 40²) = √2500 = 50 cm. Étape 2 : cette diagonale, une arête de 120 cm et la baguette forment un triangle rectangle : √(50² + 120²) = √16 900 = 130 cm.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : Pythagore',p:`<div class="keep"><ul><li><b>Triangle rectangle</b> : l’<b>hypoténuse</b> est en face de l’angle droit, c’est le plus long côté.</li><li><b>Théorème</b> : dans un triangle rectangle, <i>a</i>² + <i>b</i>² = <i>c</i>² (<i>c</i> = hypoténuse). Le carré sur l’hypoténuse a l’aire des deux autres réunis. Preuve : même grand carré, mêmes quatre triangles.</li><li><b>Hypoténuse</b> : <i>c</i>² = <i>a</i>² + <i>b</i>², puis <i>c</i> = √(<i>c</i>²).</li><li><b>Côté de l’angle droit</b> : <i>a</i>² = <i>c</i>² − <i>b</i>², puis racine carrée. Le résultat est plus court que l’hypoténuse.</li><li><b>Réciproque</b> : on calcule à part le carré du plus long côté et la somme des deux autres carrés. Égal : rectangle ; différent : pas rectangle.</li><li><b>Triplets</b> : (3, 4, 5), (5, 12, 13), (8, 15, 17) et leurs multiples.</li><li><b>Applications</b> : échelle, diagonale, distance dans un repère (écarts des coordonnées).</li><li>Pas de fausse égalité : « <i>c</i>² = 100, donc <i>c</i> = 10 ».</li></ul></div>`},
 {kind:'Problème',h:'Le raccourci du parc',
  p:'Un parc rectangulaire mesure 120 m de long et 50 m de large. Pour aller d’un coin au coin opposé, Léa longe les allées du bord. Noé, lui, traverse la pelouse en ligne droite, en diagonale. Ils marchent tous les deux à 1,25 m par seconde.',
  fig:(()=>{ const P=plane({x:[-1,13],y:[-1.6,6.4],grid:false,axes:false}); P.rect(0,0,12,5,{fill:'var(--ok)',fo:.2,c:'var(--ink)',w:2});
    P.poly([[0,0],[12,0],[12,5]],{open:true,c:'var(--accent)',w:4}).seg(0,0,12,5,{c:'var(--spark)',w:4,dash:true}); P.text(6,0,'120 m',{a:'middle',dy:16}).text(12,2.5,'50 m',{dx:6,dy:5});
    P.text(4.5,2.6,'Noé',{c:'var(--spark)'}).text(9,0,'Léa',{dy:-8,c:'var(--accent)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle distance parcourt Noé&nbsp;?',unit:'m',ans:130,hint:'La diagonale est l’hypoténuse d’un triangle rectangle de côtés 120 m et 50 m.',why:'d² = 120² + 50² = 14 400 + 2500 = 16 900, donc d = √16 900 = 130 m.'},
   {q:'b) Combien de mètres Noé gagne-t-il par rapport à Léa&nbsp;?',unit:'m',ans:40,hint:'Léa fait la longueur plus la largeur.',why:'Léa : 120 + 50 = 170 m. Gain : 170 − 130 = 40 m.'},
   {q:'c) Combien de secondes Noé gagne-t-il&nbsp;?',unit:'s',ans:32,hint:'Chaque seconde, on parcourt 1,25 m. Combien de secondes pour 40 m ?',why:'40 : 1,25 = 32 s.'},
  ],
  sol:'Le coin du parc est un angle droit : la diagonale est l’hypoténuse d’un triangle rectangle de côtés 120 m et 50 m.<br>d² = 120² + 50² = 16 900, donc d = 130 m.<br>Léa parcourt 120 + 50 = 170 m, soit 40 m de plus.<br>À 1,25 m par seconde, ces 40 m prennent 40 : 1,25 = 32 s.<br>Réponse : Noé gagne 40 m et 32 secondes.'},
 {kind:'Problème',h:'L’armoire à relever',
  p:'On monte une armoire couchée dans une chambre, puis on la relève en la faisant pivoter sur un coin. L’armoire mesure 2,2 m de haut et 0,6 m de profondeur. Pendant qu’elle pivote, sa diagonale de côté doit passer sous le plafond. Le plafond est à 2,3 m du sol.',
  fig:rt({p:[[0,0],[.6,2.2],[.6,0]],l:['2,2 m','0,6 m','diagonale'],sc:[null,null,'var(--spark)'],x:[-1.4,2],y:[-.3,2.5],w:200,d:.2}),
  parts:[
   {q:'a) Quelle est la longueur de la diagonale de côté de l’armoire, arrondie au centimètre&nbsp;?',unit:'m',ans:2.28,tol:.006,hint:'La hauteur et la profondeur forment un angle droit.',why:'d² = 2,2² + 0,6² = 4,84 + 0,36 = 5,2, donc d = √5,2 ≈ 2,28 m.'},
   {q:'b) L’armoire peut-elle être relevée&nbsp;?',opts:['Non, car 2,2 m + 0,6 m = 2,8 m dépasse 2,3 m','Oui, car sa diagonale (≈ 2,28 m) est plus courte que 2,3 m','Oui, car sa hauteur 2,2 m est plus courte que 2,3 m','Non, car la diagonale dépasse toujours la hauteur de la pièce'],ans:1,hint:'Au milieu du mouvement, c’est la diagonale qui est verticale.',why:'Pendant le pivot, la plus grande hauteur atteinte est la diagonale, ≈ 2,28 m &lt; 2,3 m : ça passe, de justesse.'},
   {q:'c) Dans une autre chambre, le plafond est à 2,25 m. Pour une armoire de 2,2 m de haut, quelle profondeur maximale faut-il pour pouvoir la relever, arrondie au centimètre&nbsp;?',unit:'m',ans:.47,tol:.006,hint:'La diagonale doit valoir au plus 2,25 m : c’est l’hypoténuse, et tu cherches un côté de l’angle droit.',why:'p² = 2,25² − 2,2² = 5,0625 − 4,84 = 0,2225, donc p = √0,2225 ≈ 0,47 m.'},
   {q:'d) Pour vérifier qu’un coin de la chambre est droit, on marque 1,2 m sur un mur, 1,6 m sur l’autre, et on mesure 2 m entre les deux marques. Le coin est-il droit&nbsp;?',opts:['Oui, car 1,2² + 1,6² = 2²','Non, car 1,2 + 1,6 ≠ 2','Oui, car 1,2 + 1,6 &gt; 2','On ne peut pas savoir sans équerre'],ans:0,hint:'Utilise la réciproque du théorème de Pythagore.',why:'2² = 4 et 1,2² + 1,6² = 1,44 + 2,56 = 4 : égal, donc le coin est droit (triplet 3, 4, 5 multiplié par 0,4).'},
  ],
  sol:'Le côté de l’armoire est un rectangle de 2,2 m sur 0,6 m. Sa diagonale vaut √(2,2² + 0,6²) = √5,2 ≈ 2,28 m.<br>En pivotant, l’armoire atteint sa plus grande hauteur quand cette diagonale est verticale. Comme 2,28 m &lt; 2,30 m, elle passe.<br>Sous un plafond de 2,25 m, la diagonale doit valoir au plus 2,25 m : profondeur² = 2,25² − 2,2² = 0,2225, donc profondeur ≈ 0,47 m au maximum.<br>Pour le coin : 1,2² + 1,6² = 4 = 2². Par la réciproque de Pythagore, le coin est droit.'},
]},

/* ===================== TRIGONOMÉTRIE ===================== */
{subj:'sec', sem:'a10', id:'sec10-trigo', o:10, h:'Trigonométrie', p:'Dans un triangle rectangle, relier un angle et des côtés : sinus, cosinus, tangente, calculer un côté ou un angle, et mesurer ce qu’on ne peut pas atteindre.', steps:[
 {kind:'Théorie',h:'Côtés opposé, adjacent et hypoténuse',p:`<p>Comment mesurer la hauteur d’un arbre sans grimper dessus ? Ou l’angle d’une rampe de skate ? Avec Pythagore, il faut connaître deux côtés. La trigonométrie, elle, relie les <b>angles</b> et les <b>côtés</b> d’un triangle rectangle. D’abord, il faut nommer les côtés <b>vus depuis un angle</b>.</p>
<div class="def"><p>Dans un triangle rectangle, choisis un angle aigu α (pas l’angle droit). L’<b>hypoténuse</b> est toujours en face de l’angle droit. Le côté <b>opposé</b> à α est celui qui est en face de α : il ne le touche pas. Le côté <b>adjacent</b> à α (adjacent = « à côté ») est le côté de l’angle droit qui touche α.</p></div>
<div class="idea"><p>Mets-toi au sommet de l’angle α et regarde droit devant : le côté que tu vois au loin est l’opposé. Les deux côtés qui partent de toi sont l’hypoténuse et l’adjacent.</p></div>
<div class="ex"><p>Triangle ABC rectangle en C, angle α en A. L’hypoténuse est [AB]. Le côté opposé à α est [BC]. Le côté adjacent à α est [AC].</p></div>
<div class="warn"><p>Opposé et adjacent <b>changent</b> si on regarde depuis l’autre angle aigu B : depuis B, [AC] devient l’opposé et [BC] l’adjacent. L’hypoténuse, elle, ne change jamais.</p></div>`,
  fig:rt({p:[[0,0],[6,3.5],[6,0]],n:['A','B','C'],l:['opposé','adjacent','hypoténuse'],sc:['var(--bad)','var(--math)','var(--spark)'],ang:'α',x:[-1,8.4],y:[-1.4,4.6],d:.55})},
 {h:'Vu depuis l’angle',p:'Le triangle PQR est rectangle en Q. Vu depuis l’angle en R, quel côté est le côté opposé&nbsp;?',
  fig:rt({p:[[5,0],[0,3],[0,0]],n:['R','P','Q'],ang:' ',x:[-1.2,6.2],y:[-1,4],d:.5}),
  opts:['[PR]','[QR]','[PQ]','[RQ] et [PQ]'],ans:2,why:'[PR] est l’hypoténuse (en face de l’angle droit Q). Le côté qui ne touche pas R est [PQ] : c’est l’opposé. [QR] est l’adjacent.'},
 {kind:'Théorie',h:'Un rapport qui ne dépend que de l’angle',p:`<p>Deux rampes ont la même inclinaison, l’une petite, l’autre géante. Pour chaque mètre parcouru sur la pente, elles montent de la même hauteur. Pourquoi ?</p>
<div class="prop"><p>Dans un triangle rectangle, les quotients ${F('opposé','hypoténuse')}, ${F('adjacent','hypoténuse')} et ${F('opposé','adjacent')} <b>ne dépendent que de l’angle</b> α, pas de la taille du triangle.</p></div>
<div class="why"><p>Deux triangles rectangles qui ont le même angle α ont la même forme : l’un est un <b>agrandissement</b> de l’autre. Un agrandissement multiplie toutes les longueurs par le même nombre. Si on multiplie le numérateur et le dénominateur d’un quotient par le même nombre, le quotient ne change pas.</p></div>
<div class="ex"><p>Pour α = 30°, si l’hypoténuse mesure 4, l’opposé mesure 2 : quotient 2 : 4 = 0,5. Si l’hypoténuse mesure 8, l’opposé mesure 4 : quotient 4 : 8 = 0,5. Même quotient.</p></div>
<p>Bouge le curseur de la taille : les longueurs changent, les quotients non. Bouge l’angle : les quotients changent.</p>`,
  params:[{id:'a',l:'Angle α',min:10,max:80,step:5,v:30,u:'°'},{id:'k',l:'Taille (hypoténuse)',min:2,max:6,v:4}],
  draw:v=>{ const c=Math.cos(rad(v.a)), s=Math.sin(rad(v.a)), k=v.k;
    return rt({p:[[0,0],[k*c,k*s],[k*c,0]],sc:['var(--bad)','var(--math)','var(--spark)'],ang:'α',x:[-.5,6.6],y:[-.5,6.2],w:280,d:.35,s:.25,ar:.7}); },
  info:v=>{ const c=Math.cos(rad(v.a)), s=Math.sin(rad(v.a)), k=v.k;
    return `<span style="color:var(--bad)">opposé ≈ ${fmt(k*s)}</span>, <span style="color:var(--math)">adjacent ≈ ${fmt(k*c)}</span>, <span style="color:var(--spark)">hypoténuse = ${k}</span><br>opposé : hypoténuse ≈ ${fmt(s,3)} ; adjacent : hypoténuse ≈ ${fmt(c,3)} ; opposé : adjacent ≈ ${fmt(s/c,3)}`; }},
 {kind:'Théorie',h:'Sinus, cosinus et tangente',p:`<p>Ces trois quotients sont si utiles qu’on leur a donné un nom. Ils permettent de passer d’un angle à des longueurs, et inversement.</p>
<div class="def"><p>Dans un triangle rectangle, pour un angle aigu α :<br><b>sin α</b> = ${F('opposé','hypoténuse')} (sinus) ; <b>cos α</b> = ${F('adjacent','hypoténuse')} (cosinus) ; <b>tan α</b> = ${F('opposé','adjacent')} (tangente).</p></div>
<div class="idea"><p>Pour retenir : <b>SOH-CAH-TOA</b>. <b>S</b>inus = <b>O</b>pposé sur <b>H</b>ypoténuse, <b>C</b>osinus = <b>A</b>djacent sur <b>H</b>ypoténuse, <b>T</b>angente = <b>O</b>pposé sur <b>A</b>djacent. Comme l’hypoténuse est le plus long côté, sin α et cos α sont toujours entre 0 et 1.</p></div>
<div class="ex"><p>Triangle de côtés 3, 4 et 5, angle α en face du côté 3 : sin α = ${F(3,5)} = 0,6 ; cos α = ${F(4,5)} = 0,8 ; tan α = ${F(3,4)} = 0,75.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Le mot « sinus » vient d’une erreur de traduction ! Des savants indiens disaient « jya » (la corde d’un arc). Les Arabes l’ont écrit « jiba », puis des traducteurs latins l’ont lu « jaib », qui veut dire « pli » ou « creux », en latin <i>sinus</i>.</p></div>`,
  fig:rt({p:[[0,0],[4,3],[4,0]],n:['A','B','C'],l:['3','4','5'],sc:['var(--bad)','var(--math)','var(--spark)'],ang:'α',x:[-1,5.6],y:[-1,3.8],w:260,d:.4})},
 {h:'Le bon quotient',p:'Le triangle EFG est rectangle en G, avec EG = 12, FG = 5 et EF = 13. Que vaut le sinus de l’angle en E&nbsp;?',
  fig:rt({p:[[0,0],[12,5],[12,0]],n:['E','F','G'],l:['5','12','13'],ang:'α',x:[-1.6,14],y:[-1.6,6.4],d:.9}),
  opts:[F(12,13),F(5,12),F(5,13),F(13,5)],ans:2,why:'Vu depuis E, le côté opposé est [FG] = 5 et l’hypoténuse [EF] = 13. sin α = opposé : hypoténuse = 5/13.'},
 {kind:'Théorie',h:'Sinus, cosinus et tangente à la calculatrice',p:`<p>Pour un angle de 35°, impossible de deviner sin 35° de tête. La calculatrice le donne en un instant, à condition de bien la régler.</p>
<div class="def"><p>Les touches <b>sin</b>, <b>cos</b> et <b>tan</b> donnent les quotients pour un angle donné. La calculatrice doit être en mode <b>degrés</b> (DEG ou D affiché à l’écran). On tape par exemple « sin 35 = » et on lit 0,5735…</p></div>
<div class="idea"><p>Imagine un triangle dont l’hypoténuse mesure 1, dans un quart de cercle de rayon 1. Le côté opposé mesure alors sin α et le côté adjacent cos α. Bouge l’angle : quand il grandit, le sinus monte vers 1 et le cosinus descend vers 0.</p></div>
<div class="ex"><p>sin 30° = 0,5 : l’opposé fait la moitié de l’hypoténuse. cos 60° = 0,5. tan 45° = 1 : pour 45°, l’opposé et l’adjacent sont égaux. sin 35° ≈ 0,574 et cos 35° ≈ 0,819.</p></div>
<div class="warn"><p>Si sin 30 affiche −0,988, la calculatrice est en mode radians (RAD) : change le mode. Et sin 35° ne veut pas dire « sin × 35 » : c’est le sinus de l’angle 35°.</p></div>`,
  params:[{id:'a',l:'Angle α',min:0,max:90,step:5,v:30,u:'°'}],
  draw:v=>{ const c=Math.cos(rad(v.a)), s=Math.sin(rad(v.a)), P=plane({x:[-.15,1.25],y:[-.2,1.15],w:260,grid:false,axes:false});
    P.poly(arcPts(0,0,1,0,90),{open:true,c:'var(--line)',w:2}).seg(0,0,1.2,0,{c:'var(--muted)',w:1.5}).seg(0,0,0,1.1,{c:'var(--muted)',w:1.5});
    P.seg(0,0,c,0,{c:'var(--math)',w:5}).seg(c,0,c,s,{c:'var(--bad)',w:5}).seg(0,0,c,s,{c:'var(--spark)',w:4});
    if(v.a>0) P.poly(arcPts(0,0,.15,0,v.a,20),{open:true,c:'var(--spark)',w:2});
    P.dot(c,s,{r:5,c:'var(--spark)'}).text(c/2,s/2,'1',{a:'middle',dx:-8,dy:-6,c:'var(--spark)'});
    if(v.a<90) P.text(c,s/2,'sin α',{dx:6,dy:5,c:'var(--bad)'}); if(v.a>0) P.text(c/2,0,'cos α',{a:'middle',dy:16,c:'var(--math)'});
    return P.svg(); },
  info:v=>`<span style="color:var(--bad)">sin ${v.a}° ≈ ${fmt(Math.sin(rad(v.a)),3)}</span> ; <span style="color:var(--math)">cos ${v.a}° ≈ ${fmt(Math.cos(rad(v.a)),3)}</span> ; tan ${v.a}° ${v.a===90?'n’existe pas (adjacent nul)':'≈ '+fmt(Math.tan(rad(v.a)),3)}`},
 {kind:'Méthode',h:'Calculer un côté : l’inconnue en haut',p:`<b>Quand :</b> on connaît un angle aigu et un côté, et le côté cherché se retrouve au <b>numérateur</b> du quotient. <b>Pourquoi ça marche :</b> sin α = ${F('opposé','hypoténuse')} veut dire que l’opposé vaut sin α <b>fois</b> l’hypoténuse : c’est un tableau de proportionnalité, l’hypoténuse multipliée par sin α donne l’opposé. <b>Comment :</b> 1) repère l’angle et nomme les côtés ; 2) choisis le quotient qui contient le côté connu et le côté cherché (SOH-CAH-TOA) ; 3) écris l’égalité ; 4) multiplie : côté cherché = côté connu × sin, cos ou tan de l’angle.`,
  fig:rt({p:[[0,0],[8.19,5.74],[8.19,0]],n:['A','B','C'],l:['?','','10 cm'],sc:['var(--bad)',null,'var(--spark)'],ang:'35°',x:[-1.2,9.8],y:[-1.2,6.6],w:260,d:.7}),
  demo:{enonce:'Le triangle ABC est rectangle en C. L’angle en A mesure 35° et l’hypoténuse AB = 10 cm. Calcule BC.',
   etapes:[
    {f:'Vu depuis A : [BC] est l’opposé, [AB] l’hypoténuse.',w:'On connaît l’hypoténuse, on cherche l’opposé.'},
    {f:'Opposé et hypoténuse : c’est le sinus (SOH).',w:'Le seul quotient qui contient ces deux côtés.'},
    {f:`sin 35° = ${F('BC','10')}`,w:'On écrit la définition avec les vraies lettres et le nombre connu.'},
    {f:'BC = 10 × sin 35° ≈ 10 × 0,5736 ≈ 5,74 cm',w:'BC divisé par 10 donne sin 35°, donc BC vaut 10 fois sin 35°. On tape « 10 × sin 35 » à la calculatrice.'}],
   conclusion:'BC ≈ 5,74 cm. Contrôle : c’est plus court que l’hypoténuse, comme il se doit.'}},
 {h:'À toi : l’adjacent',p:'Un triangle est rectangle. Son hypoténuse mesure 8 cm et l’un de ses angles aigus 40°. Combien mesure le côté adjacent à cet angle, arrondi au centième&nbsp;?',
  fig:rt({p:[[0,0],[6.13,5.14],[6.13,0]],l:['','?','8 cm'],sc:[null,'var(--math)','var(--spark)'],ang:'40°',x:[-1.2,7.6],y:[-1.2,6],w:240,d:.6}),
  lab:'adjacent ≈',unit:'cm',ans:6.13,tol:.011,why:'Adjacent et hypoténuse : cosinus. cos 40° = adjacent : 8, donc adjacent = 8 × cos 40° ≈ 8 × 0,766 ≈ 6,13 cm.'},
 {kind:'Méthode',h:'Calculer un côté : l’inconnue en bas',p:`<b>Quand :</b> le côté cherché se retrouve au <b>dénominateur</b>, par exemple tan 30° = ${F(5,'<i>x</i>')}. <b>Pourquoi ça marche :</b> tu connais le <b>produit en croix</b> de la proportionnalité : dans ${F('<i>a</i>','<i>b</i>')} = ${F('<i>c</i>','<i>d</i>')}, on a <i>a</i> × <i>d</i> = <i>b</i> × <i>c</i>. En écrivant tan 30° = ${F('tan 30°',1)}, on obtient <i>x</i> × tan 30° = 5 × 1. Le nombre qui, multiplié par tan 30°, donne 5, c’est <b>5 : tan 30°</b>. <b>Comment :</b> 1) choisis le quotient avec SOH-CAH-TOA ; 2) écris l’égalité ; 3) si l’inconnue est en bas, le côté cherché = côté connu <b>divisé</b> par sin, cos ou tan.`,
  demo:{enonce:'Le triangle DEF est rectangle en F. L’angle en D mesure 30° et le côté opposé EF = 5 m. Calcule DF, puis l’hypoténuse DE.',
   etapes:[
    {f:'Depuis D : EF = 5 est l’opposé, DF l’adjacent. C’est la tangente (TOA).',w:'On connaît l’opposé et on cherche l’adjacent.'},
    {f:`tan 30° = ${F(5,'DF')}`,w:'L’inconnue DF est au dénominateur.'},
    {f:'DF × tan 30° = 5, donc DF = 5 : tan 30° ≈ 5 : 0,5774 ≈ 8,66 m',w:'Produit en croix, puis on défait la multiplication par une division.'},
    {f:`sin 30° = ${F(5,'DE')}, donc DE = 5 : sin 30° = 5 : 0,5 = 10 m`,w:'Pour l’hypoténuse, opposé et hypoténuse : sinus. Même geste.'}],
   conclusion:'DF ≈ 8,66 m et DE = 10 m. Contrôle avec Pythagore : 5² + 8,66² ≈ 25 + 75 = 100 = 10² ✓.'},
  note:'Astuce : si tu hésites entre multiplier et diviser, remplace par des nombres simples. Dans 0,5 = 5 : <i>x</i>, on voit que <i>x</i> = 10, c’est-à-dire 5 : 0,5.'},
 {h:'À toi : l’hypoténuse avec le sinus',p:'Dans un triangle rectangle, un angle aigu mesure 25° et le côté opposé à cet angle mesure 6 cm. Combien mesure l’hypoténuse, arrondie au centième&nbsp;?',
  fig:rt({p:[[0,0],[12.87,6],[12.87,0]],l:['6 cm','','?'],sc:['var(--bad)',null,'var(--spark)'],ang:'25°',x:[-1.6,14.6],y:[-1.6,7.4],w:280,d:.9}),
  lab:'hypoténuse ≈',unit:'cm',ans:14.2,tol:.011,why:'Opposé et hypoténuse : sinus. sin 25° = 6 : h, donc h = 6 : sin 25° ≈ 6 : 0,4226 ≈ 14,20 cm.'},
 {kind:'Théorie',h:'Retrouver l’angle : les touches inverses',p:`<p>Une rampe monte de 3 m quand on avance de 4 m. Quel est son angle avec le sol ? Cette fois, on connaît les côtés et on cherche l’angle : il faut faire le chemin à l’envers.</p>
<div class="def"><p>Si on connaît la valeur d’un quotient, les touches <b>sin⁻¹</b>, <b>cos⁻¹</b> et <b>tan⁻¹</b> (souvent avec la touche 2nd ou SHIFT) donnent l’angle. Si tan α = 0,75, alors α = tan⁻¹(0,75) ≈ 36,87°. On lit « tangente moins un » ou « arc tangente ».</p></div>
<div class="idea"><p>La touche sin va de l’angle vers le quotient. La touche sin⁻¹ fait le trajet inverse, du quotient vers l’angle, comme une machine qu’on fait tourner à l’envers.</p></div>
<div class="ex"><p>sin α = 0,5 donne α = sin⁻¹(0,5) = 30°. Pour la rampe : opposé 3, adjacent 4, donc tan α = ${F(3,4)} = 0,75 et α ≈ 36,87°. Contrôle : tan 36,87° ≈ 0,75 ✓.</p></div>
<div class="warn"><p>sin⁻¹ ne veut pas dire « 1 divisé par sin ». Et sin⁻¹ ou cos⁻¹ d’un nombre plus grand que 1 donne une erreur : un quotient « côté : hypoténuse » ne dépasse jamais 1. Si ça arrive, tu as mis l’hypoténuse en haut.</p></div>`,
  fig:rt({p:[[0,0],[4,3],[4,0]],l:['3 m','4 m',''],sc:['var(--bad)','var(--math)',null],ang:'α ?',x:[-1,5.6],y:[-1,3.8],w:260,d:.4})},
 {kind:'Méthode',h:'Calculer un angle',p:`<b>Quand :</b> on connaît deux côtés d’un triangle rectangle et on cherche un angle aigu. <b>Pourquoi ça marche :</b> le quotient des deux côtés ne dépend que de l’angle ; la touche inverse retrouve cet angle. <b>Comment :</b> 1) place-toi à l’angle cherché et nomme les deux côtés connus ; 2) choisis le quotient (SOH-CAH-TOA) ; 3) calcule le quotient ; 4) utilise sin⁻¹, cos⁻¹ ou tan⁻¹ et arrondis. Phrase, calcul, réponse en degrés.`,
  demo:{enonce:'Une rampe pour fauteuil roulant mesure 5 m de long (sur la pente) et monte de 0,6 m. Quel angle fait-elle avec le sol&nbsp;?',
   etapes:[
    {f:'La pente (5 m) est l’hypoténuse ; la hauteur (0,6 m) est l’opposé à l’angle α au sol.',w:'L’angle droit est entre le sol et la verticale.'},
    {f:'Opposé et hypoténuse : sinus. sin α = 0,6 : 5 = 0,12',w:'On calcule le quotient.'},
    {f:'α = sin⁻¹(0,12) ≈ 6,89°',w:'Touche 2nd puis sin, ou SHIFT puis sin, selon la calculatrice.'}],
   conclusion:'La rampe fait un angle d’environ 6,89°, soit à peu près 7° avec le sol.'}},
 {kind:'Pratique',h:'L’angle de l’échelle',p:'Une échelle de 5 m doit atteindre la marque rouge, à 4 m de haut sur le mur. Quel angle doit-elle faire avec le sol, arrondi au degré&nbsp;? Calcule, puis règle le curseur.',
  params:[{id:'a',l:'Angle avec le sol',min:30,max:80,v:40,u:'°'}],
  draw:v=>{ const c=Math.cos(rad(v.a)), s=Math.sin(rad(v.a)), P=plane({x:[-1.2,5.2],y:[-.6,5.6],w:240,grid:false,axes:false});
    P.rect(-1,0,1,5.4,{fill:'var(--muted)',fo:.25,c:'var(--ink)',w:1.5}).seg(-1.2,0,5.2,0,{c:'var(--ink)',w:2});
    P.seg(5*c,0,0,5*s,{c:'var(--spark)',w:5}).seg(-.3,4,.3,4,{c:'var(--bad)',w:4}).text(-.5,4,'4 m',{a:'middle',dy:-8,c:'var(--bad)'});
    P.poly(arcPts(5*c,0,.6,180-v.a,180,20),{open:true,c:'var(--spark)',w:2}); return P.svg(); },
  info:v=>`Angle avec le sol : ${v.a}°`,
  ok:v=>v.a===53,why:'L’échelle est l’hypoténuse, la hauteur 4 m est l’opposé : sin α = 4 : 5 = 0,8, donc α = sin⁻¹(0,8) ≈ 53,13°, soit 53°.'},
 {kind:'Méthode',h:'Mesurer l’inaccessible',p:`<b>Quand :</b> une longueur est impossible à mesurer directement (hauteur d’un arbre, d’un bâtiment, largeur d’une rivière), mais on peut mesurer une distance au sol et un angle de visée. <b>Pourquoi ça marche :</b> la visée, le sol et la verticale forment un triangle rectangle. <b>Comment :</b> 1) fais un croquis et marque l’angle droit ; 2) nomme les côtés depuis l’angle connu ; 3) choisis sin, cos ou tan ; 4) calcule ; 5) n’oublie pas les morceaux en plus (la hauteur des yeux) ; 6) phrase, calcul, réponse avec l’unité.`,
  fig:(()=>{ const P=plane({x:[-1,22],y:[-1.4,18.6],w:240,grid:false,axes:false});
    P.seg(-1,0,22,0,{c:'var(--ink)',w:2}).seg(20,0,20,17.2,{c:'var(--ok)',w:6}).circ(20,17.2,2,{fill:'var(--ok)',fo:.35,c:null});
    P.seg(0,0,0,1.6,{c:'var(--ink)',w:3}).seg(0,1.6,20,17.2,{c:'var(--spark)',w:2,dash:true}).seg(0,1.6,20,1.6,{c:'var(--muted)',w:1.5,dash:true});
    P.poly(arcPts(0,1.6,3,0,38,20),{open:true,c:'var(--spark)',w:2}).text(3.8,3.2,'38°',{c:'var(--spark)'}).text(10,0,'20 m',{a:'middle',dy:16}).text(0,.8,'1,6 m',{a:'end',dx:-4,dy:5});
    return P.svg(); })(),
  demo:{enonce:'Tu es à 20 m d’un arbre. Tes yeux sont à 1,6 m du sol. Tu vises le sommet de l’arbre avec un angle de 38° au-dessus de l’horizontale. Quelle est la hauteur de l’arbre&nbsp;?',
   etapes:[
    {f:'Triangle rectangle : tes yeux, le tronc à hauteur des yeux, le sommet.',w:'La ligne horizontale depuis tes yeux et le tronc forment l’angle droit.'},
    {f:'Depuis l’angle de 38° : 20 m est l’adjacent, la hauteur <i>h</i> au-dessus des yeux est l’opposé. Tangente (TOA).',w:'On connaît l’adjacent, on cherche l’opposé.'},
    {f:`tan 38° = ${F('<i>h</i>',20)}, donc <i>h</i> = 20 × tan 38° ≈ 15,63 m`,w:'L’inconnue est en haut : on multiplie.'},
    {f:'Hauteur de l’arbre ≈ 15,63 + 1,6 = 17,23 m',w:'Le triangle commence à hauteur des yeux : on ajoute 1,6 m.'}],
   conclusion:'L’arbre mesure environ 17,2 m.'}},
 {kind:'Défi',h:'Une route à 100 %',p:'Sur les panneaux, la pente d’une route s’écrit en pourcentage : une pente de 10 % monte de 10 m quand on avance de 100 m à l’horizontale. Imagine une route à 100 % de pente. Est-elle verticale&nbsp;?',
  opts:['Oui, 100 % veut dire verticale','Non, elle fait 45° avec l’horizontale','Non, elle fait 10° avec l’horizontale','Non, elle fait 60° avec l’horizontale'],ans:1,
  why:'Stratégie : faire un dessin. 100 % veut dire qu’on monte de 100 m pour 100 m à l’horizontale : opposé = adjacent, donc tan α = 100 : 100 = 1 et α = tan⁻¹(1) = 45°. Une route verticale aurait une pente infinie. Et 10 % donne tan⁻¹(0,1) ≈ 5,71°.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : trigonométrie',p:`<div class="keep"><ul><li><b>Vus depuis un angle aigu α</b> : l’<b>hypoténuse</b> (en face de l’angle droit), l’<b>opposé</b> (en face de α), l’<b>adjacent</b> (le côté de l’angle droit qui touche α).</li><li>Les quotients ne dépendent que de l’angle : deux triangles de même angle sont des agrandissements l’un de l’autre.</li><li><b>SOH-CAH-TOA</b> : sin α = ${F('opposé','hypoténuse')}, cos α = ${F('adjacent','hypoténuse')}, tan α = ${F('opposé','adjacent')}.</li><li>Calculatrice en mode <b>degrés</b>. sin et cos sont entre 0 et 1.</li><li><b>Côté inconnu en haut</b> : on multiplie (BC = 10 × sin 35°).</li><li><b>Côté inconnu en bas</b> : produit en croix, on divise (DF = 5 : tan 30°).</li><li><b>Angle</b> : on calcule le quotient, puis sin⁻¹, cos⁻¹ ou tan⁻¹.</li><li><b>Problèmes</b> : croquis, angle droit, choix du quotient, morceaux en plus, phrase, calcul, réponse avec l’unité.</li></ul></div>`},
 {kind:'Problème',h:'La rampe d’accès',
  p:'L’entrée d’une salle de sport est 0,5 m plus haute que le trottoir. On veut construire une rampe pour fauteuil roulant. Sa pente ne doit pas dépasser 6 % : elle monte d’au plus 6 cm pour 100 cm d’avancée à l’horizontale. On construit la rampe avec exactement 6 % de pente.',
  fig:rt({p:[[0,0],[8.33,.5],[8.33,0]],l:['0,5 m','horizontale','rampe'],sc:[null,null,'var(--spark)'],x:[-.6,9.4],y:[-.9,1.4],d:.4,s:.25}),
  parts:[
   {q:'a) Quelle longueur horizontale faut-il au sol, arrondie au centimètre&nbsp;?',unit:'m',ans:8.33,tol:.006,hint:'6 % veut dire que la hauteur vaut 0,06 fois la longueur horizontale. Quel nombre, multiplié par 0,06, donne 0,5 ?',why:'0,5 : 0,06 ≈ 8,33 m.'},
   {q:'b) Quel angle la rampe fait-elle avec le sol, arrondi au centième de degré&nbsp;?',unit:'°',ans:3.43,tol:.006,hint:'La pente, c’est opposé : adjacent. Quelle touche inverse utiliser ?',why:'tan α = 0,06, donc α = tan⁻¹(0,06) ≈ 3,43°.'},
   {q:'c) Quelle est la longueur de la rampe elle-même, arrondie au centimètre&nbsp;?',unit:'m',ans:8.35,tol:.011,hint:'Tu peux utiliser le sinus de l’angle trouvé, ou Pythagore avec 0,5 m et la longueur horizontale.',why:'Pythagore : 0,5² + 8,333² ≈ 0,25 + 69,44 = 69,69, donc √69,69 ≈ 8,35 m. Avec le sinus : 0,5 : sin 3,43° ≈ 8,35 m.'},
  ],
  sol:'La pente de 6 % signifie hauteur : horizontale = 0,06. Pour 0,5 m de hauteur, il faut 0,5 : 0,06 ≈ 8,33 m à l’horizontale.<br>Dans le triangle rectangle, la hauteur est l’opposé et l’horizontale l’adjacent : tan α = 0,06, donc α = tan⁻¹(0,06) ≈ 3,43°.<br>La rampe est l’hypoténuse : avec Pythagore, √(0,5² + 8,333²) ≈ 8,35 m ; avec le sinus, 0,5 : sin 3,43° ≈ 8,35 m.<br>Réponse : la rampe mesure environ 8,35 m et fait un angle d’environ 3,4° avec le sol.'},
 {kind:'Problème',h:'Le cerf-volant',
  p:'Mia fait voler son cerf-volant. Le fil, bien tendu, mesure 50 m et fait un angle de 40° avec l’horizontale. Sa main tient le fil à 1,2 m du sol. On considère que le fil est un segment droit.',
  fig:(()=>{ const c=Math.cos(rad(40)), s=Math.sin(rad(40)), P=plane({x:[-4,44],y:[-2,38],w:260,grid:false,axes:false});
    P.seg(-4,0,44,0,{c:'var(--ink)',w:2}).seg(0,0,0,1.2,{c:'var(--ink)',w:3}).seg(0,1.2,50*c,1.2+50*s,{c:'var(--spark)',w:2.5}).seg(0,1.2,50*c,1.2,{c:'var(--muted)',w:1.5,dash:true}).seg(50*c,1.2,50*c,1.2+50*s,{c:'var(--muted)',w:1.5,dash:true});
    P.poly([[50*c,1.2+50*s+3],[50*c+2,1.2+50*s],[50*c,1.2+50*s-3],[50*c-2,1.2+50*s]],{fill:'var(--bad)',fo:.7,c:'var(--ink)',w:1});
    P.poly(arcPts(0,1.2,5,0,40,20),{open:true,c:'var(--spark)',w:2}).text(6,4.5,'40°',{c:'var(--spark)'}).text(17,20,'50 m',{a:'middle',c:'var(--spark)'});
    return P.svg(); })(),
  parts:[
   {q:'a) À quelle hauteur au-dessus du sol vole le cerf-volant, arrondie au centième&nbsp;?',unit:'m',ans:33.34,tol:.011,hint:'Le fil est l’hypoténuse. La hauteur au-dessus de la main est l’opposé à l’angle de 40°. N’oublie pas la main.',why:'50 × sin 40° ≈ 32,14 m au-dessus de la main, donc 32,14 + 1,2 ≈ 33,34 m.'},
   {q:'b) À quelle distance horizontale de Mia se trouve le cerf-volant, arrondie au centième&nbsp;?',unit:'m',ans:38.3,tol:.011,hint:'La distance horizontale est l’adjacent.',why:'50 × cos 40° ≈ 38,30 m.'},
   {q:'c) Le vent forcit et le fil fait maintenant 55° avec l’horizontale, toujours avec 50 m de fil. De combien le cerf-volant est-il monté, arrondi au centième&nbsp;?',unit:'m',ans:8.82,tol:.02,hint:'Calcule la nouvelle hauteur, puis la différence. La main n’a pas bougé.',why:'50 × sin 55° ≈ 40,96 m au-dessus de la main. 40,96 − 32,14 ≈ 8,82 m.'},
   {q:'d) Plus tard, le fil fait 30° avec l’horizontale. Quelle longueur de fil faudrait-il pour que le cerf-volant soit à la même hauteur qu’en a), arrondie au centième&nbsp;?',unit:'m',ans:64.28,tol:.03,hint:'Au-dessus de la main, il faut toujours 32,14 m (l’opposé). Le fil est l’hypoténuse, au dénominateur du sinus.',why:'sin 30° = 32,14 : L, donc L = 32,14 : 0,5 ≈ 64,28 m.'},
  ],
  sol:'Le fil (50 m) est l’hypoténuse d’un triangle rectangle qui commence à la main de Mia.<br>Hauteur au-dessus de la main : 50 × sin 40° ≈ 32,14 m. Hauteur du cerf-volant : 32,14 + 1,2 ≈ 33,34 m. Distance horizontale : 50 × cos 40° ≈ 38,30 m.<br>À 55° : 50 × sin 55° ≈ 40,96 m au-dessus de la main, soit 8,82 m de plus.<br>À 30°, pour garder 32,14 m au-dessus de la main : sin 30° = 32,14 : L, donc L = 32,14 : sin 30° ≈ 64,28 m de fil.'},
]},
);
})();
