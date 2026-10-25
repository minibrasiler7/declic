/* Déclic — Physique */
(()=>{
const g=9.81, R_GAZ=8.314, KB=1.381e-23;
// flèche étiquetée
const vec=(P,x1,y1,x2,y2,c,l,q={})=>{ P.arrow(x1,y1,x2,y2,Object.assign({c,w:2.5,hs:10},q)); if(l&&Math.hypot(x2-x1,y2-y1)>1e-6) P.text(x2,y2,l,{c,dx:q.dx??6,dy:q.dy??-6}); return P; };
// ressort en zigzag entre deux points
const spring=(P,x1,y1,x2,y2,n=12,wd=.18,c='var(--ink)')=>{ const L=Math.hypot(x2-x1,y2-y1), ux=(x2-x1)/L, uy=(y2-y1)/L, nx=-uy, ny=ux, pts=[[x1,y1]];
  const a=.08*L, b=L-.08*L; pts.push([x1+ux*a,y1+uy*a]);
  for(let i=1;i<n;i++){ const s=a+(b-a)*i/n, sg=i%2?1:-1; pts.push([x1+ux*s+nx*wd*sg,y1+uy*s+ny*wd*sg]); }
  pts.push([x1+ux*b,y1+uy*b],[x2,y2]); P.poly(pts,{open:true,c,w:2}); return P; };
// pression de vapeur saturante de l’eau (Antoine), T en °C → kPa, et inverse
const psat=T=>133.322*10**(8.07131-1730.63/(233.426+T))/1000;
const teb=p=>1730.63/(8.07131-Math.log10(p*1000/133.322))-233.426;
// pseudo-aléatoire déterministe
const rnd=i=>{ const s=Math.sin(i*12.9898+78.233)*43758.5453; return s-Math.floor(s); };

COURS.push(
/* ================= 1. CINÉMATIQUE ================= */
{subj:'phy', sem:'all', id:'phy-cinematique', h:'Mouvement dans le plan', p:'Décrire un mouvement : position, vitesse et accélération comme dérivées, jusqu’au tir parabolique.', steps:[
 {h:'Référentiel et repère',p:`Un mouvement se décrit toujours <b>par rapport à</b> quelque chose : c’est le <b>référentiel</b> (le sol, un train, le Soleil). On y fixe un <b>repère</b> (O ; <i>i</i>, <i>j</i>) et une horloge. La position du mobile M est le vecteur <b>OM(<i>t</i>) = <i>x</i>(<i>t</i>) <i>i</i> + <i>y</i>(<i>t</i>) <i>j</i></b>, en mètres.`,
  fig:(()=>{ const P=plane({x:[-1.3,8],y:[-0.5,4.5],grid:false,axes:false,w:300});
    P.arrow(0,0,7.6,0,{c:'var(--muted)',w:1.5,hs:8}).arrow(0,0,0,4.2,{c:'var(--muted)',w:1.5,hs:8}).text(7.5,0,'x',{dy:16,c:'var(--muted)'}).text(0,4.1,'y',{dx:-14,c:'var(--muted)'});
    P.curve(t=>t,t=>3.5-0.128*(t-4)**2,0.3,7.2,{c:'var(--line)',w:3,dash:true});
    const t=5, y=3.5-0.128*(t-4)**2; vec(P,0,0,t,y,'var(--accent)'); P.text(t/2,y/2,'OM',{c:'var(--accent)',dx:-30,dy:-4});
    P.dot(t,y,{l:'M'}).text(0,0,'O',{dx:-14,dy:14}); P.seg(t,y,t,0,{c:'var(--muted)',w:1,dash:true}).seg(t,y,0,y,{c:'var(--muted)',w:1,dash:true});
    P.text(t,0,'x(t)',{a:'middle',dy:16,c:'var(--muted)',s:12}).text(0,y,'y(t)',{a:'end',dx:-4,c:'var(--muted)',s:12}); return P.svg(); })(),
  note:'La <b>trajectoire</b> (en pointillé) est l’ensemble des positions occupées. Elle dépend du référentiel : la valve d’une roue de vélo décrit un cercle pour le cycliste, une cycloïde pour le piéton.'},
 {h:'Vitesse et accélération sont des dérivées',p:`La vitesse est la dérivée de la position, l’accélération celle de la vitesse : <b><i>v</i> = d<b>OM</b>/d<i>t</i></b> (m/s) et <b><i>a</i> = d<i>v</i>/d<i>t</i></b> (m/s²). Ici <i>x</i> = 3<i>t</i>, <i>y</i> = 4<i>t</i> − <i>t</i>². Déplace le temps : la vitesse reste <b>tangente</b> à la trajectoire.`,
  params:[{id:'t',l:'Temps t',min:0,max:4,step:.1,v:.5,u:' s'}],
  draw:v=>{ const P=plane({x:[-0.5,13],y:[-1.5,5.5],grid:true,step:1,lab:2}); const t=v.t, x=3*t, y=4*t-t*t, vx=3, vy=4-2*t;
    P.curve(s=>3*s,s=>4*s-s*s,0,4,{c:'var(--line)',w:3,dash:true}).curve(s=>3*s,s=>4*s-s*s,0,t||1e-6,{c:'var(--math)',w:3});
    vec(P,x,y,x+vx*.5,y+vy*.5,'var(--accent)','v'); vec(P,x,y,x,y-2*.5,'var(--bad)','a',{dx:6,dy:12}); P.dot(x,y); return P.svg(); },
  info:v=>`<i>v</i> = (3 ; ${fmt(4-2*v.t)}) m/s, ‖<i>v</i>‖ = ${fmt(Math.hypot(3,4-2*v.t))} m/s · <i>a</i> = (0 ; −2) m/s², constante`,
  note:'Les flèches sont dessinées à l’échelle 0,5 s. Au sommet (t = 2 s), la vitesse est horizontale mais l’accélération n’est pas nulle.'},
 {h:'Dériver une position',p:'Un mobile se déplace sur un axe selon <i>x</i>(<i>t</i>) = 2<i>t</i>² − 3<i>t</i> (x en m, t en s). Quelle est sa vitesse à <i>t</i> = 2 s&nbsp;?',lab:'v =',unit:'m/s',ans:5,
  why:'v(t) = dx/dt = 4t − 3, donc v(2) = 8 − 3 = 5 m/s.'},
 {h:'Mouvement rectiligne uniformément accéléré',p:`Si <i>a</i> est constante sur un axe : <b><i>v</i>(<i>t</i>) = <i>v</i>₀ + <i>a t</i></b> et <b><i>x</i>(<i>t</i>) = <i>x</i>₀ + <i>v</i>₀<i>t</i> + ½ <i>a t</i>²</b>. En éliminant <i>t</i> : <b><i>v</i>² − <i>v</i>₀² = 2<i>a</i>(<i>x</i> − <i>x</i>₀)</b>.<br>Une voiture passe de 0 à 100 km/h en 8,0 s, avec une accélération constante. Quelle distance parcourt-elle&nbsp;? Arrondis au mètre.`,
  unit:'m',ans:111.1,tol:.6,why:'v = 100/3,6 = 27,8 m/s, a = 27,8/8 = 3,47 m/s². Alors x = ½·a·t² = ½·3,47·64 ≈ 111 m (c’est aussi la vitesse moyenne 13,9 m/s × 8 s).',
  note:'Pense à convertir en unités SI : 1 m/s = 3,6 km/h.'},
 {h:'Le tir parabolique',p:`Lancé avec <i>v</i>₀ sous l’angle α, un projectile ne subit que son poids (on néglige l’air) : <i>a</i> = (0 ; −<i>g</i>). En intégrant deux fois : <b><i>x</i> = <i>v</i>₀ cos α · <i>t</i></b> et <b><i>y</i> = <i>v</i>₀ sin α · <i>t</i> − ½ <i>g t</i>²</b>. La composante horizontale de la vitesse ne change jamais.`,
  params:[{id:'v0',l:'Vitesse v₀',min:5,max:20,v:14,u:' m/s'},{id:'al',l:'Angle α',min:10,max:80,step:5,v:45,u:'°'},{id:'t',l:'Temps t',min:0,max:4,step:.1,v:.6,u:' s'}],
  draw:v=>{ const P=plane({x:[-2,42],y:[-2,22],grid:true,step:5,lab:10}); const c=Math.cos(rad(v.al)), s=Math.sin(rad(v.al)), T=2*v.v0*s/g, t=Math.min(v.t,T);
    const x=v.v0*c*t, y=Math.max(0,v.v0*s*t-.5*g*t*t), vy=v.v0*s-g*t;
    P.curve(u=>v.v0*c*u,u=>v.v0*s*u-.5*g*u*u,0,T,{c:'var(--line)',w:3,dash:true});
    vec(P,x,y,x+v.v0*c*.5,y+vy*.5,'var(--accent)','v'); vec(P,x,y,x,y-g*.5,'var(--bad)','a',{dy:14});
    P.seg(x,y,x+v.v0*c*.5,y,{c:'var(--accent)',w:1.5,dash:true,op:.6}); P.dot(x,y); return P.svg(); },
  info:v=>{ const c=Math.cos(rad(v.al)), s=Math.sin(rad(v.al)), T=2*v.v0*s/g, t=Math.min(v.t,T);
    return `Vol : ${fmt(T)} s · portée ${fmt(v.v0**2*Math.sin(rad(2*v.al))/g,1)} m · hauteur max ${fmt((v.v0*s)**2/(2*g),1)} m<br>`+(v.t>=T?'Le projectile est retombé au sol.':`<i>v<sub>x</sub></i> = ${fmt(v.v0*c)} m/s · <i>v<sub>y</sub></i> = ${fmt(v.v0*s-g*t)} m/s`); },
  note:'Portée sur sol plat : <b>R = <i>v</i>₀² sin 2α / <i>g</i></b>, maximale pour α = 45°. Deux angles complémentaires (30° et 60°) donnent la même portée.'},
 {h:'Touche la cible',p:'Lancée à <i>v</i>₀ = 15 m/s, la balle doit retomber sur la cible à 20 m (à 0,3 m près). Règle l’angle.',
  params:[{id:'al',l:'Angle α',min:20,max:70,v:45,u:'°'}],
  draw:v=>{ const P=plane({x:[-1,25],y:[-1,11],grid:true,step:5,lab:5}); const s=Math.sin(rad(v.al)), c=Math.cos(rad(v.al)), T=2*15*s/g;
    P.curve(u=>15*c*u,u=>15*s*u-.5*g*u*u,0,T,{c:'var(--accent)',w:3}); P.rect(19.7,0,.6,.5,{fill:'var(--spark)',fo:.9,c:null}).text(20,.5,'cible',{a:'middle',dy:-6,c:'var(--muted)',s:11});
    P.dot(15*c*T,0,{r:5,c:'var(--accent)'}); return P.svg(); },
  info:v=>`Portée : ${fmt(225*Math.sin(rad(2*v.al))/g,2)} m`,
  ok:v=>Math.abs(225*Math.sin(rad(2*v.al))/g-20)<.3,
  why:'Il faut sin 2α = 20·9,81/15² = 0,872, donc 2α ≈ 60,7° ou 119,3°. Les angles α ≈ 30° et α ≈ 60° conviennent tous les deux : tir tendu ou tir en cloche.'},
 {h:'Hauteur maximale',p:'Un ballon part du sol à 20 m/s sous un angle de 30°. Quelle hauteur maximale atteint-il&nbsp;? Arrondis au centième.',unit:'m',ans:5.097,tol:.011,
  why:'Au sommet v<sub>y</sub> = 0. Avec v<sub>y0</sub> = 20·sin 30° = 10 m/s : h = v<sub>y0</sub>²/(2g) = 100/19,62 ≈ 5,10 m.'},
 {kind:'Défi',h:'Depuis la falaise',p:'Une pierre est lancée horizontalement à 8,0 m/s du haut d’une falaise de 20 m. À quelle distance du pied de la falaise touche-t-elle le sol&nbsp;? Arrondis au dixième.',unit:'m',ans:16.15,tol:.06,
  why:'La chute verticale est libre : 20 = ½·9,81·t², donc t = √(40/9,81) = 2,02 s. Horizontalement x = 8,0 × 2,02 ≈ 16,2 m.'},
 {kind:'Problème',h:'Le freinage d’urgence',
  p:'Une voiture roule à 90 km/h sur une route sèche. La conductrice aperçoit un obstacle immobile 60 m devant elle. Elle réagit au bout de <i>t</i><sub>r</sub> = 1,0 s, pendant lequel la voiture garde sa vitesse. Elle freine ensuite avec une décélération constante de 7,5 m/s². S’arrête-t-elle à temps&nbsp;?',
  fig:(()=>{ const P=plane({x:[-4,72],y:[-6,7],grid:false,axes:false,w:320,h:110});
    P.seg(-4,0,72,0,{c:'var(--muted)',w:1.5}).rect(-3.5,0,3.5,1.6,{fill:'var(--math)',fo:.45,c:'var(--ink)',w:2}).rect(60,0,1.5,3,{fill:'var(--bad)',fo:.6,c:'var(--ink)',w:2});
    P.seg(0,-1.5,25,-1.5,{c:'var(--spark)',w:4}).seg(25,-1.5,66.7,-1.5,{c:'var(--accent)',w:4}).text(12.5,-1.5,'réaction',{a:'middle',dy:16,s:11,c:'var(--muted)'}).text(45,-1.5,'freinage',{a:'middle',dy:16,s:11,c:'var(--muted)'});
    P.text(60.7,3,'obstacle à 60 m',{a:'end',dy:-6,s:11,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle distance parcourt-elle pendant le temps de réaction&nbsp;?',unit:'m',ans:25,tol:.1,hint:'Convertis 90 km/h en m/s. Pendant la réaction, le mouvement est uniforme.',why:'90 km/h = 90/3,6 = 25 m/s, donc d<sub>r</sub> = 25 × 1,0 = 25 m.'},
   {q:'b) Quelle est la distance de freinage, de 25 m/s jusqu’à l’arrêt&nbsp;? Arrondis au dixième.',unit:'m',ans:41.67,tol:.06,hint:'Utilise <i>v</i>² − <i>v</i>₀² = 2<i>a</i>(<i>x</i> − <i>x</i>₀) avec <i>a</i> = −7,5 m/s² et <i>v</i> = 0.',why:'0 − 25² = 2 × (−7,5) × d<sub>f</sub>, donc d<sub>f</sub> = 625/15 ≈ 41,7 m.'},
   {q:'c) La voiture s’arrête-t-elle avant l’obstacle&nbsp;?',opts:['Oui, car la distance de freinage (41,7 m) est inférieure à 60 m','Non : la distance d’arrêt, 66,7 m, dépasse 60 m','Oui, elle s’arrête 6,7 m avant l’obstacle','On ne peut pas conclure sans la masse de la voiture'],ans:1,hint:'La distance d’arrêt additionne la distance de réaction et la distance de freinage.',why:'d<sub>r</sub> + d<sub>f</sub> = 25 + 41,7 = 66,7 m &gt; 60 m. Oublier la distance de réaction est l’erreur la plus fréquente.'},
   {q:'d) À quelle vitesse heurte-t-elle l’obstacle&nbsp;? Donne-la en km/h.',lab:'v =',unit:'km/h',ans:36,tol:.5,hint:'Il ne reste que 60 − 25 = 35 m pour freiner. Applique la même relation entre 25 m/s et la vitesse inconnue.',why:'v² = 25² − 2 × 7,5 × 35 = 625 − 525 = 100, donc v = 10 m/s = 36 km/h.'},
  ],
  sol:'<p>On découpe le mouvement en deux phases. Pendant la réaction, la vitesse est constante : d<sub>r</sub> = v₀ t<sub>r</sub> = 25 × 1,0 = 25 m.</p><p>Pendant le freinage, le mouvement est uniformément décéléré : v² − v₀² = 2ax donne d<sub>f</sub> = v₀²/(2|a|) = 625/15 ≈ 41,7 m. La distance d’arrêt vaut donc 66,7 m, plus que les 60 m disponibles.</p><p>Le freinage ne dure que 35 m : v² = 625 − 2 × 7,5 × 35 = 100, soit v = 10 m/s = 36 km/h au moment du choc.</p><p>Ordre de grandeur : à 80 km/h (22,2 m/s), la distance d’arrêt tomberait à 22,2 + 22,2²/15 ≈ 22,2 + 32,9 ≈ 55 m, et la voiture s’arrêterait. La distance de freinage croît comme v².</p>'},
 {kind:'Problème',h:'Le saut à skis',
  p:'Un sauteur quitte le tremplin à l’horizontale avec une vitesse de 25 m/s. Sous lui, la piste de réception est une pente rectiligne qui descend à 35° sous l’horizontale, à partir du bout du tremplin. On néglige l’air. On prend l’origine au point d’envol, l’axe <i>x</i> horizontal et l’axe <i>y</i> vers le haut. On cherche où et comment il atterrit.',
  fig:(()=>{ const P=plane({x:[-8,100],y:[-72,8],grid:false,axes:false,w:320}); const ta=Math.tan(rad(35)), T=2*25*ta/g;
    P.poly([[0,0],[98,-98*ta],[0,-98*ta]],{fill:'var(--line)',fo:.6,c:null}).seg(0,0,98,-98*ta,{c:'var(--muted)',w:2}).seg(-8,0,0,0,{c:'var(--ink)',w:4}).seg(0,0,30,0,{c:'var(--muted)',w:1,dash:true});
    P.curve(t=>25*t,t=>-g/2*t*t,0,T,{c:'var(--accent)',w:3,dash:true}); vec(P,0,0,16,0,'var(--accent)','v₀',{dy:-8});
    P.text(10,-1.5,'35°',{dy:14,s:12,c:'var(--muted)'}).dot(25*T,-g/2*T*T,{l:'impact',dx:-60,dy:-8}); return P.svg(); })(),
  parts:[
   {q:'a) Combien de temps dure le vol&nbsp;? Arrondis au centième.',unit:'s',ans:3.569,tol:.011,hint:'Il atterrit quand son point (<i>x</i> ; <i>y</i>) est sur la pente : <i>y</i> = −<i>x</i> tan 35°. Remplace <i>x</i> et <i>y</i> par leurs expressions en <i>t</i>.',why:'−½gt² = −v₀t tan 35° donne t = 2v₀ tan 35°/g = 2 × 25 × 0,700/9,81 ≈ 3,57 s.'},
   {q:'b) Quelle distance parcourt-il le long de la pente, du bout du tremplin au point d’impact&nbsp;? Arrondis au mètre.',unit:'m',ans:108.9,tol:.6,hint:'Calcule d’abord <i>x</i> = <i>v</i>₀<i>t</i>. La longueur sur la pente vaut <i>x</i>/cos 35°.',why:'x = 25 × 3,569 = 89,2 m, donc D = 89,2/cos 35° ≈ 109 m.'},
   {q:'c) Quelle est la norme de sa vitesse à l’impact&nbsp;? Arrondis au dixième.',unit:'m/s',ans:43.02,tol:.06,hint:'<i>v<sub>x</sub></i> ne change pas pendant le vol, et <i>v<sub>y</sub></i> = −<i>g t</i>.',why:'v<sub>y</sub> = −9,81 × 3,569 = −35,0 m/s, donc v = √(25² + 35,0²) ≈ 43,0 m/s, environ 155 km/h.'},
   {q:'d) Quel angle sa vitesse fait-elle avec la pente au moment de l’impact&nbsp;? Arrondis au dixième de degré.',unit:'°',ans:19.47,tol:.06,hint:'Calcule l’angle β de la vitesse sous l’horizontale avec tan β = |<i>v<sub>y</sub></i>|/<i>v<sub>x</sub></i>, puis compare-le à 35°.',why:'tan β = 35,0/25 = 1,40, donc β ≈ 54,5°. L’angle avec la pente vaut 54,5 − 35 ≈ 19,5°.'},
   {q:'e) Avec un élan de 30 m/s au lieu de 25 m/s (+ 20 %), la distance sur la pente…',opts:['augmente aussi de 20 %','augmente d’environ 10 %','augmente d’environ 44 %','ne change pas, car la pente impose l’angle'],ans:2,hint:'Regarde comment <i>t</i>, puis <i>x</i> = <i>v</i>₀<i>t</i>, dépendent de <i>v</i>₀.',why:'t est proportionnel à v₀ et x = v₀t, donc D ∝ v₀². Or (30/25)² = 1,44 : la distance augmente de 44 %.'},
  ],
  sol:'<p>Les équations horaires sont x = v₀t et y = −½gt². L’impact a lieu sur la pente, où y = −x tan 35° : ½gt² = v₀t tan 35°, d’où t = 2v₀ tan 35°/g ≈ 3,57 s.</p><p>Alors x = 89,2 m et la distance sur la pente vaut D = x/cos 35° ≈ 109 m (le sauteur est descendu de 62,5 m).</p><p>À l’impact, v<sub>x</sub> = 25 m/s et v<sub>y</sub> = −gt = −35,0 m/s, donc v ≈ 43,0 m/s. La vitesse plonge de β = arctan 1,40 ≈ 54,5° sous l’horizontale, soit 19,5° par rapport à la pente.</p><p>Remarque : tan β = gt/v₀ = 2 tan 35° ne dépend pas de v₀. L’angle d’arrivée est le même pour tous les élans, mais la distance croît comme v₀².</p>'},
]},

/* ================= 2. MOUVEMENT CIRCULAIRE ================= */
{subj:'phy', sem:'all', id:'phy-circulaire', h:'Mouvement circulaire et repère de Frenet', p:'Séparer l’accélération en une partie qui change la norme de la vitesse et une partie qui la fait tourner.', steps:[
 {h:'Le repère de Frenet',p:`Sur une trajectoire courbe, on attache au mobile deux vecteurs unitaires : <b><i>e</i>ₜ</b>, tangent et dans le sens du mouvement, et <b><i>e</i>ₙ</b>, perpendiculaire et tourné vers le centre de courbure. La vitesse s’écrit simplement <b><i>v</i> = <i>v e</i>ₜ</b>.`,
  fig:(()=>{ const P=plane({x:[-3,3],y:[-2.6,2.8],grid:false,axes:false,w:280}); const th=rad(50), x=2*Math.cos(th), y=2*Math.sin(th);
    P.circ(0,0,2,{c:'var(--line)',w:3}).dot(0,0,{r:4,c:'var(--muted)',l:'C'});
    vec(P,x,y,x-Math.sin(th)*1.1,y+Math.cos(th)*1.1,'var(--accent)','eₜ'); vec(P,x,y,x-Math.cos(th)*1.1,y-Math.sin(th)*1.1,'var(--math)','eₙ',{dy:16});
    P.seg(0,0,x,y,{c:'var(--muted)',w:1,dash:true}).text(x/2,y/2,'R',{dx:6,dy:12,c:'var(--muted)'}).dot(x,y,{l:'M',dx:8,dy:16}); return P.svg(); })(),
  note:'Le repère de Frenet bouge avec le mobile : <i>e</i>ₜ et <i>e</i>ₙ changent de direction à chaque instant.'},
 {h:'Accélération tangentielle et normale',p:`Dans ce repère, <b><i>a</i> = (d<i>v</i>/d<i>t</i>) <i>e</i>ₜ + (<i>v</i>²/R) <i>e</i>ₙ</b>. La partie tangentielle <i>a</i>ₜ change la <b>norme</b> de la vitesse. La partie normale <i>a</i>ₙ = <i>v</i>²/R, toujours vers le centre, change sa <b>direction</b>. Ici R = 2 m.`,
  params:[{id:'th',l:'Position θ',min:0,max:345,step:15,v:30,u:'°'},{id:'v',l:'Vitesse v',min:1,max:4,step:.5,v:2,u:' m/s'},{id:'at',l:'aₜ = dv/dt',min:-2,max:2,step:.5,v:1,u:' m/s²'}],
  draw:v=>{ const P=plane({x:[-3.6,3.6],y:[-3.6,3.6],grid:false,axes:false,w:300}); const th=rad(v.th), x=2*Math.cos(th), y=2*Math.sin(th);
    const tx=-Math.sin(th), ty=Math.cos(th), nx=-Math.cos(th), ny=-Math.sin(th), an=v.v**2/2, k=.4;
    P.circ(0,0,2,{c:'var(--line)',w:3}).dot(0,0,{r:4,c:'var(--muted)'});
    vec(P,x,y,x+tx*v.v*.5,y+ty*v.v*.5,'var(--accent)','v');
    P.arrow(x,y,x+tx*v.at*k,y+ty*v.at*k,{c:'var(--muted)',w:1.5,hs:7,dash:true}); P.arrow(x,y,x+nx*an*k,y+ny*an*k,{c:'var(--muted)',w:1.5,hs:7,dash:true});
    vec(P,x,y,x+(tx*v.at+nx*an)*k,y+(ty*v.at+ny*an)*k,'var(--bad)','a',{dy:14}); P.dot(x,y); return P.svg(); },
  info:v=>{ const an=v.v**2/2; return `<i>a</i>ₜ = ${fmt(v.at)} m/s² · <i>a</i>ₙ = <i>v</i>²/R = ${fmt(an)} m/s² · ‖<i>a</i>‖ = ${fmt(Math.hypot(v.at,an))} m/s²`; },
  note:'Les composantes sont en pointillé. Si <i>a</i>ₜ &gt; 0 le mobile accélère, si <i>a</i>ₜ &lt; 0 il freine : <i>a</i> penche vers l’avant ou vers l’arrière.'},
 {h:'Le virage',p:'Une voiture roule à 72 km/h dans un virage de rayon 50 m, à vitesse constante. Quelle est son accélération normale&nbsp;?',lab:'aₙ =',unit:'m/s²',ans:8,tol:.01,
  why:'72 km/h = 20 m/s. aₙ = v²/R = 400/50 = 8 m/s², presque g.'},
 {h:'Mouvement circulaire uniforme',p:`Si <i>v</i> est constante, <i>a</i>ₜ = 0 et l’accélération est purement <b>centripète</b> : <b><i>a</i> = <i>v</i>²/R = ω²R</b>, avec la vitesse angulaire <b>ω = <i>v</i>/R</b> (rad/s). Un tour dure la période <b>T = 2π/ω = 2πR/<i>v</i></b>.`,
  opts:['L’accélération est nulle puisque la vitesse est constante','L’accélération est tangente à la trajectoire','L’accélération est dirigée vers le centre du cercle','L’accélération est dirigée vers l’extérieur du cercle'],ans:2,
  why:'La norme de v est constante mais sa direction tourne. Il reste aₙ = v²/R, dirigée vers le centre. L’« effet centrifuge » n’est ressenti que dans le référentiel qui tourne.'},
 {h:'Règle la vitesse',p:'Sur un cercle de rayon R = 2 m, règle la vitesse pour que l’accélération (centripète) vaille 8 m/s².',
  params:[{id:'v',l:'Vitesse v',min:0,max:6,step:.5,v:2,u:' m/s'}],
  draw:v=>{ const P=plane({x:[-3.6,3.6],y:[-3.6,3.6],grid:false,axes:false,w:260}); const an=v.v**2/2;
    P.circ(0,0,2,{c:'var(--line)',w:3}).dot(0,0,{r:4,c:'var(--muted)'}); P.seg(2-8*.2,-.5,2-8*.2,.5,{c:'var(--spark)',w:2,dash:true}).text(2-8*.2,-.5,'cible',{a:'middle',dy:14,c:'var(--muted)',s:11});
    vec(P,2,0,2,v.v*.4,'var(--accent)','v'); vec(P,2,0,2-an*.2,0,'var(--bad)','a',{dy:16}); P.dot(2,0); return P.svg(); },
  info:v=>`<i>a</i> = <i>v</i>²/R = ${fmt(v.v**2/2)} m/s² (cible : 8 m/s², repère pointillé)`,
  ok:v=>v.v===4, why:'v² = a·R = 8 × 2 = 16, donc v = 4 m/s. Doubler la vitesse quadruple l’accélération centripète.'},
 {h:'Le manège',p:'Un manège fait un tour en 6,0 s. Un enfant est assis à 3,0 m de l’axe. Quelle est son accélération&nbsp;? Arrondis au centième.',unit:'m/s²',ans:3.29,tol:.011,
  why:'ω = 2π/T = 1,047 rad/s, donc a = ω²R = 1,097 × 3 ≈ 3,29 m/s².'},
 {kind:'Défi',h:'Freiner dans un virage',p:'Une voiture roule à 10 m/s dans un virage de rayon 40 m et freine avec dv/dt = −3,0 m/s². Quelle est la norme de son accélération&nbsp;? Arrondis au centième.',unit:'m/s²',ans:3.905,tol:.011,
  why:'aₙ = v²/R = 100/40 = 2,5 m/s² et aₜ = −3,0 m/s². Ces deux composantes sont perpendiculaires : ‖a‖ = √(3,0² + 2,5²) ≈ 3,91 m/s².'},
 {kind:'Problème',h:'La centrifugeuse des pilotes',
  p:'Pour entraîner des pilotes, on les fait tourner dans une cabine placée au bout d’un bras de 8,0 m. On veut, en régime de rotation uniforme, une accélération centripète de 5<i>g</i>, soit 49,05 m/s². La centrifugeuse part du repos et atteint ce régime en 30 s, avec une accélération tangentielle constante.',
  parts:[
   {q:'a) Quelle vitesse angulaire ω faut-il en régime&nbsp;? Arrondis au centième.',lab:'ω =',unit:'rad/s',ans:2.476,tol:.011,hint:'En rotation uniforme, <i>a</i> = ω²R.',why:'ω = √(a/R) = √(49,05/8,0) ≈ 2,48 rad/s.'},
   {q:'b) Combien de tours par minute cela représente-t-il&nbsp;? Arrondis à l’unité.',unit:'tr/min',ans:23.65,tol:.6,hint:'Un tour vaut 2π rad, une minute 60 s.',why:'2,476 × 60/(2π) ≈ 23,6 tr/min, soit un tour toutes les 2,5 s environ.'},
   {q:'c) Quelle est l’accélération tangentielle pendant la mise en route&nbsp;? Arrondis au centième.',lab:'aₜ =',unit:'m/s²',ans:.6603,tol:.011,hint:'Calcule la vitesse finale <i>v</i> = ωR, atteinte en 30 s à partir de 0.',why:'v = 2,476 × 8,0 ≈ 19,8 m/s, donc aₜ = 19,8/30 ≈ 0,66 m/s².'},
   {q:'d) À <i>t</i> = 15 s, au milieu de la mise en route, quelle est la norme de l’accélération&nbsp;? Arrondis au dixième.',unit:'m/s²',ans:12.28,tol:.06,hint:'À mi-parcours, <i>v</i> vaut la moitié de la vitesse finale. Calcule <i>a</i>ₙ = <i>v</i>²/R, puis combine avec <i>a</i>ₜ.',why:'v = 9,90 m/s, aₙ = 9,90²/8,0 ≈ 12,26 m/s² et aₜ = 0,66 m/s². ‖a‖ = √(12,26² + 0,66²) ≈ 12,3 m/s².'},
  ],
  sol:'<p>En régime, a = ω²R donne ω = √(49,05/8) ≈ 2,48 rad/s, soit 2,476 × 60/(2π) ≈ 23,6 tr/min. La cabine va alors à v = ωR ≈ 19,8 m/s (71 km/h).</p><p>Pendant la mise en route, v croît linéairement de 0 à 19,8 m/s en 30 s : aₜ ≈ 0,66 m/s².</p><p>À t = 15 s, v = 9,90 m/s. La partie normale vaut v²/R ≈ 12,26 m/s², la partie tangentielle 0,66 m/s². Ces composantes sont perpendiculaires : ‖a‖ ≈ 12,3 m/s².</p><p>Vérification : à mi-vitesse, aₙ ∝ v² ne vaut que le quart de 5g (1,25g ≈ 12,3 m/s²). La partie tangentielle reste minuscule devant la partie normale.</p>'},
 {kind:'Problème',h:'La bretelle de sortie',
  p:'Une voiture aborde à 72 km/h une bretelle de sortie en quart de cercle de rayon 60 m. Elle freine régulièrement, avec une accélération tangentielle constante, pour arriver en bout de courbe à 36 km/h. On note <i>s</i> la distance parcourue le long de la courbe. Pour <i>a</i>ₜ constante, la relation du mouvement uniformément accéléré reste valable : <i>v</i>² − <i>v</i>₀² = 2 <i>a</i>ₜ <i>s</i>.',
  parts:[
   {q:'a) Quelle est la longueur de la courbe&nbsp;? Arrondis au dixième.',unit:'m',ans:94.25,tol:.06,hint:'Un quart de cercle de rayon R a pour longueur 2πR/4.',why:'s = πR/2 = π × 60/2 ≈ 94,2 m.'},
   {q:'b) Quelle est la valeur absolue de la décélération |<i>a</i>ₜ|&nbsp;? Arrondis au centième.',lab:'|aₜ| =',unit:'m/s²',ans:1.5915,tol:.011,hint:'Convertis les vitesses en m/s, puis utilise la relation de l’énoncé.',why:'10² − 20² = 2aₜ × 94,25 donne aₜ = −300/188,5 ≈ −1,59 m/s². Le signe moins traduit le freinage.'},
   {q:'c) Quelle est la norme de l’accélération à l’entrée de la courbe&nbsp;? Arrondis au centième.',unit:'m/s²',ans:6.854,tol:.011,hint:'À l’entrée, <i>v</i> = 20 m/s. Calcule <i>a</i>ₙ = <i>v</i>²/R et combine avec <i>a</i>ₜ.',why:'aₙ = 400/60 ≈ 6,67 m/s², donc ‖a‖ = √(6,67² + 1,59²) ≈ 6,85 m/s².'},
   {q:'d) Où la norme de l’accélération est-elle la plus grande&nbsp;?',opts:['À la sortie de la courbe, car la voiture a freiné longtemps','À l’entrée de la courbe, car <i>a</i>ₙ = <i>v</i>²/R y est maximale','Au milieu de la courbe','Elle est la même partout, car <i>a</i>ₜ est constante'],ans:1,hint:'Une seule des deux composantes change le long de la courbe. Laquelle, et dans quel sens&nbsp;?',why:'aₜ est constante, mais aₙ = v²/R diminue avec v : elle passe de 6,67 à 1,67 m/s². ‖a‖ va donc de 6,85 à 2,30 m/s².'},
   {q:'e) Combien de temps dure la traversée de la courbe&nbsp;? Arrondis au centième.',unit:'s',ans:6.283,tol:.011,hint:'<i>v</i> = <i>v</i>₀ + <i>a</i>ₜ<i>t</i>, avec les vitesses en m/s.',why:'t = (10 − 20)/(−1,59) ≈ 6,28 s. Vérification : vitesse moyenne 15 m/s × 6,28 s ≈ 94,2 m.'},
  ],
  sol:'<p>Les vitesses valent v₀ = 20 m/s et v = 10 m/s. La courbe mesure s = πR/2 ≈ 94,2 m.</p><p>Avec aₜ constante : v² − v₀² = 2aₜs, donc aₜ = (100 − 400)/(2 × 94,25) ≈ −1,59 m/s².</p><p>À l’entrée, aₙ = v₀²/R ≈ 6,67 m/s² et ‖a‖ = √(aₙ² + aₜ²) ≈ 6,85 m/s². À la sortie, aₙ = 100/60 ≈ 1,67 m/s² et ‖a‖ ≈ 2,30 m/s². Le maximum est à l’entrée.</p><p>La durée vaut t = Δv/aₜ ≈ 6,28 s, et la vitesse moyenne 15 m/s redonne bien 94 m. Ordre de grandeur : 6,85 m/s² ≈ 0,7g, déjà une bonne part de ce qu’un pneu tient sur route sèche (environ 0,8g). Mieux vaut freiner avant la courbe.</p>'},
]},

/* ================= 3. NEWTON ================= */
{subj:'phy', sem:'all', id:'phy-newton', h:'Lois de Newton et forces', p:'Les trois lois, les forces usuelles et la méthode du bilan des forces.', steps:[
 {h:'Les trois lois',p:`<b>1. Inertie</b> : dans un référentiel galiléen, un corps soumis à des forces qui se compensent est au repos ou en mouvement rectiligne uniforme. <b>2. Loi fondamentale</b> : <b>Σ<i>F</i> = <i>m a</i></b> (N = kg·m/s²). <b>3. Actions réciproques</b> : si A exerce <i>F</i><sub>A/B</sub> sur B, alors B exerce <b><i>F</i><sub>B/A</sub> = −<i>F</i><sub>A/B</sub></b> sur A.`,
  fig:(()=>{ const P=plane({x:[-4,4],y:[-1.3,1.3],grid:false,axes:false,w:300});
    P.circ(-1.6,0,.9,{fill:'var(--math)',fo:.3,c:'var(--ink)',w:2}).circ(1.6,0,.6,{fill:'var(--spark)',fo:.5,c:'var(--ink)',w:2});
    P.text(-1.6,0,'A',{a:'middle',dy:5}).text(1.6,0,'B',{a:'middle',dy:5});
    vec(P,-.7,.3,.4,.3,'var(--bad)','F<tspan font-size="9" dy="3">B/A</tspan>',{dx:-20,dy:-8}); vec(P,1,-.3,-.1,-.3,'var(--accent)','F<tspan font-size="9" dy="3">A/B</tspan>',{dx:-8,dy:24}); return P.svg(); })(),
  note:'Les deux forces de la 3e loi s’appliquent à <b>deux corps différents</b> : elles ne s’annulent jamais l’une l’autre.'},
 {h:'Le livre sur la table',p:'Un livre est posé sur une table. Avec quelle force son poids forme-t-il une paire au sens de la 3e loi&nbsp;?',
  opts:['La réaction de la table sur le livre','La force exercée par le livre sur la table','L’attraction que le livre exerce sur la Terre','Aucune : le poids n’a pas de réaction'],ans:2,
  why:'Le poids est l’action de la Terre sur le livre. Sa réciproque est l’action du livre sur la Terre. La réaction de la table compense le poids (1re loi), mais c’est une autre interaction.'},
 {h:'Les forces usuelles',p:`<b>Poids</b> <i>P</i> = <i>m g</i>, vertical vers le bas. <b>Réaction normale</b> <i>N</i>, perpendiculaire au support. <b>Frottement</b> parallèle au support et opposé au glissement : <i>f</i> ≤ μₛ<i>N</i> sans glissement, <i>f</i> = μ<sub>d</sub><i>N</i> en glissement. <b>Tension</b> d’un fil, dirigée le long du fil. Sur un plan incliné d’angle α, on projette : <b><i>N</i> = <i>mg</i> cos α</b> et la composante motrice vaut <b><i>mg</i> sin α</b>.`,
  params:[{id:'al',l:'Angle α',min:0,max:50,step:2,v:20,u:'°'},{id:'mu',l:'Coefficient μ',min:0,max:.8,step:.1,v:.3}],
  draw:v=>{ const P=plane({x:[-1,10],y:[-2.5,8],grid:false,axes:false,w:300}); const a=rad(v.al), ca=Math.cos(a), sa=Math.sin(a), ux=ca, uy=-sa, nx=sa, ny=ca;
    P.poly([[0,0],[9*ca,0],[0,9*sa]],{fill:'var(--line)',fo:.6,c:'var(--muted)',w:1.5}).seg(-1,0,10,0,{c:'var(--muted)',w:1.5});
    const sx=4.5*ca, sy=4.5*sa, h=.6; P.poly([[sx-ux*h,sy-uy*h],[sx+ux*h,sy+uy*h],[sx+ux*h+nx*2*h,sy+uy*h+ny*2*h],[sx-ux*h+nx*2*h,sy-uy*h+ny*2*h]],{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2});
    const cx=sx+nx*h, cy=sy+ny*h, k=3/(2*g), slide=Math.tan(a)>v.mu+1e-9, f=slide?v.mu*2*g*ca:2*g*sa;
    vec(P,cx,cy,cx,cy-2*g*k,'var(--bad)','P',{dy:14}); vec(P,sx,sy,sx+nx*2*g*ca*k,sy+ny*2*g*ca*k,'var(--accent)','N'); vec(P,sx-ux*h,sy-uy*h,sx-ux*h-ux*f*k,sy-uy*h-uy*f*k,'var(--spark)','f',{dy:14});
    P.text(9*ca-.3,0,'α',{a:'end',dx:-14,dy:-4,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const a=rad(v.al), m=2, P1=m*g*Math.sin(a), N=m*g*Math.cos(a), slide=Math.tan(a)>v.mu+1e-9;
    return `<i>m</i> = 2 kg · <i>mg</i> sin α = ${fmt(P1,1)} N · <i>N</i> = ${fmt(N,1)} N · μ<i>N</i> = ${fmt(v.mu*N,1)} N<br>`+(slide?`<b>Le bloc glisse</b> : <i>a</i> = <i>g</i>(sin α − μ cos α) = ${fmt(g*(Math.sin(a)-v.mu*Math.cos(a)))} m/s²`:`<b>Le bloc reste immobile</b> : <i>f</i> = <i>mg</i> sin α = ${fmt(P1,1)} N`); },
  note:'Pour simplifier, on prend ici μₛ = μ<sub>d</sub> = μ. Le bloc glisse dès que tan α &gt; μ, quelle que soit sa masse.'},
 {h:'Juste avant le glissement',p:'Avec μₛ = 0,5, règle le plus grand angle entier (en degrés) pour lequel le bloc reste immobile.',
  params:[{id:'al',l:'Angle α',min:0,max:50,v:10,u:'°'}],
  draw:v=>{ const P=plane({x:[-1,10],y:[-.5,7.5],grid:false,axes:false,w:280}); const a=rad(v.al), ca=Math.cos(a), sa=Math.sin(a), slide=Math.tan(a)>.5;
    P.poly([[0,0],[9*ca,0],[0,9*sa]],{fill:'var(--line)',fo:.6,c:'var(--muted)',w:1.5}).seg(-1,0,10,0,{c:'var(--muted)',w:1.5});
    const sx=4.5*ca, sy=4.5*sa, h=.6; P.poly([[sx-ca*h,sy+sa*h],[sx+ca*h,sy-sa*h],[sx+ca*h+sa*2*h,sy-sa*h+ca*2*h],[sx-ca*h+sa*2*h,sy+sa*h+ca*2*h]],{fill:slide?'var(--bad)':'var(--ok)',fo:.4,c:'var(--ink)',w:2});
    return P.svg(); },
  info:v=>`tan α = ${fmt(Math.tan(rad(v.al)),3)} · `+(Math.tan(rad(v.al))>.5?'le bloc glisse':'le bloc tient'),
  ok:v=>v.al===26, why:'L’équilibre exige mg sin α ≤ μₛ mg cos α, soit tan α ≤ 0,5. Or tan 26° = 0,488 et tan 27° = 0,510 : la limite est α = arctan 0,5 ≈ 26,6°.'},
 {h:'Plan incliné sans frottement',p:'Un bloc de 2,0 kg glisse sans frottement sur un plan incliné à 30°. Quelle est son accélération&nbsp;? Arrondis au centième.',unit:'m/s²',ans:4.905,tol:.011,
  why:'Sur l’axe du plan : m a = m g sin α, donc a = 9,81 × 0,5 ≈ 4,91 m/s². La masse se simplifie.'},
 {kind:'Méthode',h:'Le bilan des forces',p:`1. Choisis le <b>système</b> et un <b>référentiel</b> galiléen. 2. Fais la liste de <b>toutes</b> les forces extérieures et dessine-les. 3. Écris Σ<i>F</i> = <i>m a</i> et <b>projette</b> sur des axes bien choisis.<br>Une personne de 70 kg est sur un pèse-personne dans un ascenseur qui démarre vers le haut avec <i>a</i> = 1,5 m/s². Quelle force le pèse-personne exerce-t-il sur elle&nbsp;? Arrondis au newton.`,
  fig:(()=>{ const P=plane({x:[-2,2],y:[-2.2,2.6],grid:false,axes:false,w:150});
    P.rect(-1.5,-2,3,4.4,{c:'var(--muted)',w:2}).rect(-.6,-1.8,1.2,.2,{fill:'var(--ink)',fo:.8,c:null}).circ(0,1,.3,{fill:'var(--math)',fo:.4,c:'var(--ink)',w:2}).rect(-.3,-1.6,.6,2.2,{fill:'var(--math)',fo:.4,c:'var(--ink)',w:2});
    vec(P,-.12,-.4,-.12,-1.5,'var(--bad)','P',{dx:-18,dy:10}); vec(P,.12,-1.6,.12,-.2,'var(--accent)','N',{dx:6,dy:10}); vec(P,1.1,-.5,1.1,.6,'var(--spark)','a'); return P.svg(); })(),
  lab:'N =',unit:'N',ans:791.7,tol:.6,why:'Selon l’axe vertical vers le haut : N − mg = ma, donc N = m(g + a) = 70 × 11,31 ≈ 792 N. La balance affiche plus que le poids (687 N).'},
 {kind:'Défi',h:'Tirer une caisse',p:'Une caisse de 4,0 kg est tirée horizontalement par une corde avec une tension de 20 N, sur un sol où μ<sub>d</sub> = 0,30. Quelle est son accélération&nbsp;? Arrondis au centième.',unit:'m/s²',ans:2.057,tol:.011,
  why:'Verticalement N = mg = 39,2 N, donc f = 0,30 × 39,2 = 11,8 N. Horizontalement m a = T − f, d’où a = (20 − 11,77)/4 ≈ 2,06 m/s².'},
 {kind:'Problème',h:'Le colis sur la rampe',
  p:'Un déménageur tire un colis de 20 kg sur une rampe inclinée à 25°, avec une sangle parallèle à la rampe. La tension de la sangle vaut 150 N. Le coefficient de frottement dynamique entre le colis et la rampe est μ<sub>d</sub> = 0,30. Le colis glisse vers le haut de la rampe.',
  fig:(()=>{ const P=plane({x:[-1,10],y:[-1,6],grid:false,axes:false,w:300}); const a=rad(25), ca=Math.cos(a), sa=Math.sin(a), ux=-ca, uy=sa, nx=sa, ny=ca, k=2.2/196.2;
    P.poly([[0,0],[9*ca,0],[0,9*sa]],{fill:'var(--line)',fo:.6,c:'var(--muted)',w:1.5}).seg(-1,0,10,0,{c:'var(--muted)',w:1.5});
    const bx=4.5*ca, by=4.5*sa, h=.5; P.poly([[bx-ux*h,by-uy*h],[bx+ux*h,by+uy*h],[bx+ux*h+nx*2*h,by+uy*h+ny*2*h],[bx-ux*h+nx*2*h,by-uy*h+ny*2*h]],{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2});
    const cx=bx+nx*h, cy=by+ny*h;
    vec(P,cx,cy,cx,cy-196.2*k,'var(--bad)','P',{dy:14}); vec(P,bx,by,bx+nx*177.8*k,by+ny*177.8*k,'var(--accent)','N');
    vec(P,cx+ux*h,cy+uy*h,cx+ux*(h+150*k),cy+uy*(h+150*k),'var(--ok)','T'); vec(P,bx-ux*h,by-uy*h,bx-ux*(h+53.3*k),by-uy*(h+53.3*k),'var(--spark)','f',{dy:14});
    P.text(9*ca-.3,0,'25°',{a:'end',dx:-14,dy:-4,c:'var(--muted)',s:12}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la réaction normale de la rampe sur le colis&nbsp;? Arrondis au dixième.',lab:'N =',unit:'N',ans:177.8,tol:.06,hint:'Le colis ne décolle pas et ne s’enfonce pas : projette les forces sur l’axe perpendiculaire à la rampe.',why:'Perpendiculairement à la rampe, N − mg cos 25° = 0, donc N = 20 × 9,81 × 0,906 ≈ 177,8 N.'},
   {q:'b) Quelle est la force de frottement&nbsp;? Arrondis au dixième.',lab:'f =',unit:'N',ans:53.35,tol:.06,hint:'Le colis glisse : le frottement vaut μ<sub>d</sub><i>N</i>.',why:'f = 0,30 × 177,8 ≈ 53,3 N, dirigée vers le bas de la rampe puisque le colis monte.'},
   {q:'c) Quelle est l’accélération du colis&nbsp;? Arrondis au centième.',lab:'a =',unit:'m/s²',ans:.6869,tol:.011,hint:'Projette sur l’axe de la rampe orienté vers le haut : <i>T</i>, la composante du poids <i>mg</i> sin 25° et <i>f</i>.',why:'ma = T − mg sin 25° − f = 150 − 82,9 − 53,3 = 13,7 N, donc a = 13,7/20 ≈ 0,69 m/s².'},
   {q:'d) Quelle tension suffirait pour monter le colis à vitesse constante&nbsp;? Arrondis au newton.',lab:'T =',unit:'N',ans:136.3,tol:.6,hint:'Vitesse constante : d’après la 1re loi, la somme des forces est nulle.',why:'T = mg sin 25° + μ<sub>d</sub>mg cos 25° = 82,9 + 53,3 ≈ 136 N.'},
  ],
  sol:'<p>Système : le colis, dans le référentiel du sol. Forces : poids P = mg = 196,2 N, réaction normale N, frottement f vers le bas de la rampe, tension T vers le haut.</p><p>Perpendiculairement à la rampe : N = mg cos 25° ≈ 177,8 N, donc f = μ<sub>d</sub>N ≈ 53,3 N.</p><p>Le long de la rampe, vers le haut : ma = T − mg sin 25° − f = 150 − 82,9 − 53,3 ≈ 13,7 N, d’où a ≈ 0,69 m/s².</p><p>À vitesse constante, a = 0 et T = 82,9 + 53,3 ≈ 136 N. Vérification : 136 N est bien inférieur au poids (196 N). La rampe aide, même avec le frottement : soulever le colis à la verticale demanderait 196 N.</p>'},
 {kind:'Problème',h:'Le virage relevé',
  p:'Un virage d’autoroute de rayon 150 m est relevé : la chaussée penche de 15° vers l’intérieur du virage. Une voiture de 1200 kg le parcourt à vitesse constante, sur un cercle horizontal. On cherche d’abord la vitesse pour laquelle aucun frottement latéral n’est nécessaire, puis la vitesse maximale avant le dérapage, avec μₛ = 0,60.',
  fig:(()=>{ const P=plane({x:[-4.5,4.5],y:[-1.6,3.4],grid:false,axes:false,w:300}); const a=rad(15), ca=Math.cos(a), sa=Math.sin(a);
    P.poly([[-4,-1.2],[4,-1.2+8*Math.tan(a)],[4,-1.5],[-4,-1.5]],{fill:'var(--line)',fo:.6,c:null}).seg(-4,-1.2,4,-1.2+8*Math.tan(a),{c:'var(--muted)',w:2});
    const bx=0, by=-1.2+4*Math.tan(a), w=1.1, h=.8; P.poly([[bx-w*ca,by-w*sa],[bx+w*ca,by+w*sa],[bx+w*ca-h*sa,by+w*sa+h*ca],[bx-w*ca-h*sa,by-w*sa+h*ca]],{fill:'var(--math)',fo:.4,c:'var(--ink)',w:2});
    const cx=bx-h/2*sa, cy=by+h/2*ca; vec(P,cx,cy,cx,cy-1.5,'var(--bad)','P',{dy:14}); vec(P,cx,cy,cx-1.55*sa,cy+1.55*ca,'var(--accent)','N',{dx:-18});
    vec(P,-2.2,2.6,-4.2,2.6,'var(--spark)','vers le centre',{dx:0,dy:-10}); P.text(3.6,-1.2,'15°',{a:'end',dy:-6,s:12,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) Sans frottement, quelle force fournit l’accélération centripète&nbsp;?',opts:['Le poids','La composante verticale de la réaction normale','La force centrifuge','La composante horizontale de la réaction normale'],ans:3,hint:'L’accélération est horizontale et dirigée vers le centre. Quelles forces ont une composante horizontale&nbsp;?',why:'Le poids est vertical. N est perpendiculaire à la chaussée inclinée : sa composante horizontale N sin 15° pointe vers le centre et vaut mv²/R. La « force centrifuge » n’existe pas dans le référentiel du sol.'},
   {q:'b) À quelle vitesse aucun frottement n’est-il nécessaire&nbsp;? Donne-la en km/h, arrondie à l’unité.',lab:'v =',unit:'km/h',ans:71.48,tol:.6,hint:'Verticalement <i>N</i> cos θ = <i>mg</i>, horizontalement <i>N</i> sin θ = <i>mv</i>²/R. Divise une équation par l’autre.',why:'tan θ = v²/(Rg), donc v = √(150 × 9,81 × tan 15°) ≈ 19,9 m/s ≈ 71 km/h.'},
   {q:'c) Que vaut alors la réaction normale&nbsp;? Arrondis au newton.',lab:'N =',unit:'N',ans:12187,tol:1,hint:'Utilise l’équation verticale.',why:'N = mg/cos 15° = 11 772/0,966 ≈ 12 187 N, un peu plus que le poids.'},
   {q:'d) Plus vite, le frottement maximal μₛ<i>N</i> agit le long de la chaussée, vers le bas de la pente. Quelle est la vitesse maximale avant dérapage&nbsp;? En km/h, arrondie à l’unité.',lab:'v =',unit:'km/h',ans:140.4,tol:.6,hint:'Verticalement : <i>N</i> cos θ − μₛ<i>N</i> sin θ = <i>mg</i>. Horizontalement : <i>N</i> sin θ + μₛ<i>N</i> cos θ = <i>mv</i>²/R. Divise encore les deux équations.',why:'v² = Rg (tan θ + μₛ)/(1 − μₛ tan θ) = 1471,5 × 0,868/0,839 ≈ 1522 m²/s², soit v ≈ 39,0 m/s ≈ 140 km/h.'},
  ],
  sol:'<p>Système : la voiture, dans le référentiel du sol. Son accélération est centripète, horizontale, de norme v²/R.</p><p>Sans frottement : N cos θ = mg et N sin θ = mv²/R. Le quotient donne tan θ = v²/(Rg), d’où v = √(Rg tan θ) ≈ 19,9 m/s ≈ 71 km/h, et N = mg/cos θ ≈ 12 187 N.</p><p>À la limite du dérapage vers l’extérieur, le frottement μₛN pointe vers le bas de la pente : N(cos θ − μₛ sin θ) = mg et N(sin θ + μₛ cos θ) = mv²/R. Donc v² = Rg (tan θ + μₛ)/(1 − μₛ tan θ) ≈ 1522 m²/s², v ≈ 39,0 m/s ≈ 140 km/h.</p><p>Vérification : sur une route plate (θ = 0), on trouverait v = √(μₛRg) ≈ 29,7 m/s ≈ 107 km/h. Le relèvement gagne plus de 30 km/h de marge.</p>'},
]},

/* ================= 4. QUANTITÉ DE MOUVEMENT ================= */
{subj:'phy', sem:'all', id:'phy-quantite', h:'Quantité de mouvement et centre de masse', p:'Une grandeur qui se conserve dans les chocs, et un point qui résume tout un système.', steps:[
 {h:'La quantité de mouvement',p:`Pour un point de masse <i>m</i> et de vitesse <i>v</i> : <b><i>p</i> = <i>m v</i></b> (kg·m/s). La 2e loi de Newton s’écrit en général <b>d<i>p</i>/d<i>t</i> = Σ<i>F</i><sub>ext</sub></b>. Pour un système <b>isolé</b> (ou dont les forces extérieures se compensent), la quantité de mouvement totale est <b>conservée</b>.`,
  lab:'p =',unit:'kg·m/s',ans:2.9,tol:.01,
  fig:'<p>Exemple : une balle de tennis de 58 g servie à 50 m/s. Calcule sa quantité de mouvement.</p>',
  why:'p = m v = 0,058 × 50 = 2,9 kg·m/s. Attention à convertir les grammes en kilogrammes.'},
 {h:'Les chocs sur un rail',p:`Le chariot 1 arrive à 2 m/s sur le chariot 2 immobile. Pendant le choc, les forces intérieures dominent : <b><i>p</i> est conservée</b>. Dans un choc <b>élastique</b>, l’énergie cinétique l’est aussi. Dans un choc <b>parfaitement inélastique</b>, les chariots restent accrochés.`,
  params:[{id:'m1',l:'Masse m₁',min:1,max:5,v:2,u:' kg'},{id:'m2',l:'Masse m₂',min:1,max:5,v:2,u:' kg'},{id:'e',l:'Choc (0 accroché, 1 élastique)',min:0,max:1,v:1}],
  draw:v=>{ const P=plane({x:[0,10],y:[0,5.4],grid:false,axes:false,w:300}); const w1=.6+.2*v.m1, w2=.6+.2*v.m2;
    let a1,a2; if(v.e){ a1=(v.m1-v.m2)/(v.m1+v.m2)*2; a2=2*v.m1/(v.m1+v.m2)*2; } else { a1=a2=v.m1*2/(v.m1+v.m2); }
    const cart=(x,y,w,c,l)=>{ P.rect(x,y,w,.8,{fill:c,fo:.45,c:'var(--ink)',w:2}).text(x+w/2,y+.4,l,{a:'middle',dy:5,s:12}); };
    P.seg(0,3,10,3,{c:'var(--muted)',w:1.5}).seg(0,.4,10,.4,{c:'var(--muted)',w:1.5}).text(.1,5.1,'avant',{c:'var(--muted)',s:12}).text(.1,2.5,'après',{c:'var(--muted)',s:12});
    cart(4-w1,3,w1,'var(--math)','1'); cart(5.5,3,w2,'var(--spark)','2'); vec(P,4-w1/2,4.3,4-w1/2+2*.8,4.3,'var(--accent)','2 m/s',{dx:4,dy:4});
    cart(4-w1,.4,w1,'var(--math)','1'); cart(v.e?5.5:4,.4,w2,'var(--spark)','2');
    if(Math.abs(a1)>1e-9) vec(P,4-w1/2,1.7,4-w1/2+a1*.8,1.7,'var(--accent)',fmt(a1)+' m/s',{dx:a1<0?-46:4,dy:-6});
    if(v.e) vec(P,5.5+w2/2,1.7,5.5+w2/2+a2*.8,1.7,'var(--bad)',fmt(a2)+' m/s',{dx:4,dy:-6});
    return P.svg(); },
  info:v=>{ let a1,a2; if(v.e){ a1=(v.m1-v.m2)/(v.m1+v.m2)*2; a2=2*v.m1/(v.m1+v.m2)*2; } else { a1=a2=v.m1*2/(v.m1+v.m2); }
    const Ec1=.5*v.m1*4, Ec2=.5*v.m1*a1*a1+.5*v.m2*a2*a2;
    return `<i>p</i> avant = ${fmt(2*v.m1)} kg·m/s · <i>p</i> après = ${fmt(v.m1*a1+v.m2*a2)} kg·m/s<br><i>E</i><sub>c</sub> avant = ${fmt(Ec1)} J · <i>E</i><sub>c</sub> après = ${fmt(Ec2)} J`; },
  note:'Choc élastique de deux masses égales : le chariot 1 s’arrête net et transmet toute sa vitesse au chariot 2, comme au billard.'},
 {h:'Ce qui se conserve',p:'Dans un choc parfaitement inélastique entre deux chariots sur un rail horizontal, que peut-on dire&nbsp;?',
  opts:['L’énergie cinétique et la quantité de mouvement sont conservées','Ni l’une ni l’autre ne sont conservées','La quantité de mouvement est conservée, pas l’énergie cinétique','L’énergie cinétique est conservée, pas la quantité de mouvement'],ans:2,
  why:'Le système est pseudo-isolé : p est conservée. Une partie de l’énergie cinétique est transformée en déformation et en chaleur.'},
 {h:'Les wagons',p:'Un wagon de 3,0 t roulant à 2,0 m/s heurte un wagon de 1,0 t à l’arrêt. Ils s’accrochent. Quelle est leur vitesse commune juste après le choc&nbsp;?',lab:'v =',unit:'m/s',ans:1.5,tol:.001,
  why:'Conservation : 3000 × 2,0 = (3000 + 1000) v, donc v = 6000/4000 = 1,5 m/s.'},
 {h:'Le centre de masse',p:`Pour un système de points, le <b>centre de masse</b> G est la moyenne des positions pondérée par les masses : <b><i>r</i><sub>G</sub> = Σ <i>m</i><sub>i</sub> <i>r</i><sub>i</sub> / Σ <i>m</i><sub>i</sub></b>. Sur une tige légère, c’est le point où elle tient en équilibre.`,
  params:[{id:'m1',l:'Masse m₁ (en x = 0)',min:1,max:5,v:1,u:' kg'},{id:'m2',l:'Masse m₂ (en x = 6 m)',min:1,max:5,v:3,u:' kg'}],
  draw:v=>{ const P=plane({x:[-1,7],y:[-1.4,1.4],grid:false,axes:false,w:300}); const xg=6*v.m2/(v.m1+v.m2);
    P.seg(0,0,6,0,{c:'var(--ink)',w:3}).circ(0,0,.25+.08*v.m1,{fill:'var(--math)',fo:.6,c:'var(--ink)',w:1.5}).circ(6,0,.25+.08*v.m2,{fill:'var(--spark)',fo:.7,c:'var(--ink)',w:1.5});
    P.poly([[xg,-.05],[xg-.3,-.6],[xg+.3,-.6]],{fill:'var(--muted)',fo:.8,c:null}).dot(xg,0,{r:5,c:'var(--bad)'}).text(xg,-.6,'G',{a:'middle',dy:16});
    for(let x=0;x<=6;x+=1) P.text(x,0,fmt(x),{a:'middle',dy:-14,c:'var(--muted)',s:10}); return P.svg(); },
  info:v=>`<i>x</i><sub>G</sub> = (${v.m1}·0 + ${v.m2}·6)/${v.m1+v.m2} = ${fmt(6*v.m2/(v.m1+v.m2))} m`},
 {h:'Équilibre la tige',p:'Une masse de 3 kg est en <i>x</i> = 0. Place la masse de 1 kg pour que le centre de masse soit en <i>x</i> = 1 m.',
  params:[{id:'x2',l:'Position de m₂',min:0,max:6,step:.5,v:2,u:' m'}],
  draw:v=>{ const P=plane({x:[-1,7],y:[-1.4,1.4],grid:false,axes:false,w:300}); const xg=v.x2/4;
    P.seg(0,0,Math.max(v.x2,1.2),0,{c:'var(--ink)',w:3}).circ(0,0,.49,{fill:'var(--math)',fo:.6,c:'var(--ink)',w:1.5}).circ(v.x2,0,.33,{fill:'var(--spark)',fo:.7,c:'var(--ink)',w:1.5});
    P.poly([[1,-.05],[.7,-.6],[1.3,-.6]],{fill:'var(--muted)',fo:.8,c:null}).dot(xg,0,{r:5,c:'var(--bad)'}).text(xg,0,'G',{a:'middle',dy:-12}); return P.svg(); },
  info:v=>`<i>x</i><sub>G</sub> = (3·0 + 1·${fmt(v.x2)})/4 = ${fmt(v.x2/4,3)} m (appui en 1 m)`,
  ok:v=>v.x2===4, why:'x<sub>G</sub> = 1·x₂/(3 + 1) = 1 impose x₂ = 4 m. La masse légère doit être 3 fois plus loin de G que la lourde.'},
 {h:'Théorème du centre de masse',p:`Pour un système de masse totale <i>M</i> : <b><i>M a</i><sub>G</sub> = Σ<i>F</i><sub>ext</sub></b>. Les forces intérieures (explosion, choc, muscles) n’agissent pas sur le mouvement de G. Un obus qui explose en vol : les débris s’éparpillent, mais leur centre de masse continue la parabole.`,
  fig:(()=>{ const P=plane({x:[-1,21],y:[-1,11],grid:false,axes:false,w:300}); const f=x=>x*(20-x)/14;
    P.seg(-1,0,21,0,{c:'var(--muted)',w:1.5}).fn(f,{from:0,to:20,c:'var(--accent)',dash:true,w:2.5}).fn(f,{from:0,to:8,c:'var(--accent)',w:3});
    P.curve(u=>8+u+.8*u,u=>f(8+u)+.6*u,0,4,{c:'var(--spark)',w:2.5}).curve(u=>8+u-.8*u,u=>f(8+u)-.6*u,0,4,{c:'var(--math)',w:2.5});
    P.seg(15.2,f(12)+2.4,8.8,f(12)-2.4,{c:'var(--muted)',w:1,dash:true}).dot(15.2,f(12)+2.4,{r:4,c:'var(--spark)'}).dot(8.8,f(12)-2.4,{r:4,c:'var(--math)'});
    P.dot(8,f(8),{r:5,c:'var(--bad)',l:'explosion',dx:-70}); P.dot(12,f(12),{r:5,c:'var(--ink)',l:'G'}); return P.svg(); })(),
  note:'Corollaire : un système isolé a un centre de masse en mouvement rectiligne uniforme, et <i>p</i><sub>tot</sub> = <i>M v</i><sub>G</sub>.'},
 {kind:'Défi',h:'Le patineur',p:'Un patineur de 60 kg, immobile sur la glace, lance un ballon de 3,0 kg vers l’avant à 10 m/s. À quelle vitesse recule-t-il&nbsp;? (frottements négligés)',unit:'m/s',ans:.5,tol:.001,
  why:'p totale = 0 avant et après : 3,0 × 10 + 60 v = 0, donc v = −0,5 m/s. Il recule à 0,5 m/s.'},
 {kind:'Problème',h:'L’accrochage des wagons',
  p:'Sur une voie horizontale, un wagon A de 20 t roulant à 1,2 m/s rattrape un wagon B de 15 t qui roule dans le même sens à 0,50 m/s. Les attelages s’enclenchent et les deux wagons repartent ensemble. L’accrochage dure 0,40 s. On néglige les frottements des roues pendant ce temps.',
  parts:[
   {q:'a) Quelle est la vitesse commune juste après l’accrochage&nbsp;?',lab:'v =',unit:'m/s',ans:.9,tol:.001,hint:'Le système A + B est pseudo-isolé horizontalement : sa quantité de mouvement se conserve.',why:'20 000 × 1,2 + 15 000 × 0,50 = 35 000 v, donc v = 31 500/35 000 = 0,90 m/s.'},
   {q:'b) Quelle énergie cinétique est perdue dans le choc&nbsp;?',unit:'J',ans:2100,tol:1,hint:'Calcule ½<i>mv</i>² pour chaque wagon avant, puis pour l’ensemble après.',why:'Avant : 14 400 + 1875 = 16 275 J. Après : ½ × 35 000 × 0,90² = 14 175 J. Perte : 2100 J, environ 13 %.'},
   {q:'c) Quelle force moyenne A exerce-t-il sur B pendant l’accrochage&nbsp;?',lab:'F =',unit:'N',ans:15000,tol:1,hint:'Applique d<i>p</i>/d<i>t</i> = <i>F</i> au seul wagon B : <i>F</i> = Δ<i>p</i><sub>B</sub>/Δ<i>t</i>.',why:'Δp<sub>B</sub> = 15 000 × (0,90 − 0,50) = 6000 kg·m/s, donc F = 6000/0,40 = 15 000 N.'},
   {q:'d) Et la force moyenne de B sur A&nbsp;?',opts:['Elle est nulle : B ne fait que subir le choc','20 000 N, car A est plus lourd','15 000 N, dirigée vers l’arrière de A','11 250 N, dans le rapport des masses'],ans:2,hint:'Pense aux actions réciproques, puis vérifie avec Δ<i>p</i><sub>A</sub>.',why:'Par la 3e loi, F<sub>B/A</sub> = −F<sub>A/B</sub>. On le vérifie : Δp<sub>A</sub> = 20 000 × (0,90 − 1,2) = −6000 kg·m/s, soit −15 000 N pendant 0,40 s.'},
  ],
  sol:'<p>Pendant l’accrochage, les forces intérieures dominent et les forces extérieures horizontales sont négligées : la quantité de mouvement totale est conservée. m<sub>A</sub>v<sub>A</sub> + m<sub>B</sub>v<sub>B</sub> = (m<sub>A</sub> + m<sub>B</sub>)v donne v = 31 500/35 000 = 0,90 m/s.</p><p>L’énergie cinétique passe de 16 275 J à 14 175 J : 2100 J sont dissipés dans les tampons et les attelages. C’est un choc parfaitement inélastique.</p><p>Pour le wagon B seul, Δp<sub>B</sub> = +6000 kg·m/s en 0,40 s : la force moyenne de A sur B vaut 15 000 N, vers l’avant. Le wagon A perd exactement 6000 kg·m/s : B exerce sur lui 15 000 N vers l’arrière, comme l’impose la 3e loi.</p><p>Ordre de grandeur : 15 kN, c’est le poids d’environ 1,5 t, réparti sur les tampons.</p>'},
 {kind:'Problème',h:'Le pendule balistique',
  p:'Pour mesurer la vitesse d’une balle, on la tire horizontalement dans un bloc de bois de 2,0 kg suspendu à des fils. La balle, de 10 g, se loge dans le bloc. Le choc est si bref que le bloc n’a pas le temps de bouger pendant qu’il a lieu. Ensuite, le bloc et la balle s’élèvent en se balançant : leur centre de masse monte de 12 cm au plus haut. Pendant cette montée, l’énergie cinétique se transforme en énergie de position : ½(<i>m</i> + <i>M</i>)<i>V</i>² = (<i>m</i> + <i>M</i>)<i>g h</i>.',
  parts:[
   {q:'a) Quelle est la vitesse <i>V</i> du bloc juste après le choc&nbsp;? Arrondis au centième.',lab:'V =',unit:'m/s',ans:1.534,tol:.011,hint:'Utilise la relation de l’énoncé : la masse se simplifie.',why:'V = √(2gh) = √(2 × 9,81 × 0,12) ≈ 1,53 m/s.'},
   {q:'b) Quelle était la vitesse de la balle&nbsp;? Arrondis au m/s.',lab:'v =',unit:'m/s',ans:308.4,tol:1.5,hint:'Pendant le choc, la quantité de mouvement horizontale du système balle + bloc est conservée.',why:'m v = (m + M)V, donc v = (2,01/0,010) × 1,534 = 201 × 1,534 ≈ 308 m/s.'},
   {q:'c) Pourquoi ne peut-on pas écrire directement ½<i>mv</i>² = (<i>m</i> + <i>M</i>)<i>g h</i>&nbsp;?',opts:['Parce que la balle est trop légère','Parce que la quantité de mouvement n’est pas conservée pendant le choc','Parce que le choc est parfaitement inélastique : de l’énergie cinétique devient chaleur et déformation','Parce que le poids travaille pendant le choc'],ans:2,hint:'Qu’est-ce qui se conserve pendant le choc, et qu’est-ce qui ne se conserve pas&nbsp;?',why:'La balle s’enfonce dans le bois et reste dedans : c’est un choc parfaitement inélastique. Seule p est conservée pendant le choc. L’énergie ne sert qu’après, pour la montée.'},
   {q:'d) Quel pourcentage de l’énergie cinétique de la balle reste-t-il juste après le choc&nbsp;? Arrondis au dixième.',unit:'%',ans:.4975,tol:.06,hint:'Compare ½(<i>m</i> + <i>M</i>)<i>V</i>² à ½<i>mv</i>², en utilisant <i>mv</i> = (<i>m</i> + <i>M</i>)<i>V</i>.',why:'Le rapport vaut m/(m + M) = 0,010/2,01 ≈ 0,50 %. La balle porte 476 J, le bloc ne reçoit que 2,4 J.'},
  ],
  sol:'<p>On sépare deux phases. <b>Le choc</b> : bref, les forces intérieures dominent, la quantité de mouvement horizontale est conservée : mv = (m + M)V. L’énergie cinétique, elle, ne l’est pas (choc parfaitement inélastique).</p><p><b>La montée</b> : l’énergie mécanique se conserve, ½(m + M)V² = (m + M)gh, donc V = √(2gh) ≈ 1,53 m/s.</p><p>D’où v = (m + M)V/m = 201 × 1,534 ≈ 308 m/s, une vitesse typique de balle de pistolet.</p><p>Le rapport des énergies vaut ½(m + M)V² / ½mv² = m/(m + M) ≈ 0,5 % : 99,5 % des 476 J part en chaleur et en déformation du bois. Écrire ½mv² = (m + M)gh donnerait v ≈ 21,8 m/s, absurde pour une arme à feu.</p>'},
]},

/* ================= 5. OSCILLATEUR ================= */
{subj:'phy', sem:'all', id:'phy-oscillateur', h:'Oscillateur harmonique', p:'Un ressort, une masse, et l’équation qui décrit toutes les petites oscillations.', steps:[
 {h:'La loi de Hooke',p:`Un ressort allongé ou comprimé de <i>x</i> par rapport à sa longueur au repos exerce une force de rappel <b><i>F</i> = −<i>k x</i></b>. La <b>raideur</b> <i>k</i> s’exprime en N/m. Le signe moins dit que la force ramène toujours vers l’équilibre.<br>Une masse de 200 g suspendue à un ressort l’allonge de 4,0 cm à l’équilibre. Calcule <i>k</i>, arrondi au dixième.`,
  lab:'k =',unit:'N/m',ans:49.05,tol:.06,why:'À l’équilibre, k·x = m g, donc k = 0,200 × 9,81/0,040 ≈ 49,1 N/m.'},
 {h:'L’équation du mouvement',p:`Sur un plan horizontal sans frottement, Newton donne <b><i>m x</i>″ = −<i>k x</i></b>, soit <i>x</i>″ + ω₀² <i>x</i> = 0 avec <b>ω₀ = √(<i>k</i>/<i>m</i>)</b>. La solution est <b><i>x</i>(<i>t</i>) = <i>X</i><sub>m</sub> cos(ω₀<i>t</i> + φ)</b>, de période <b>T = 2π√(<i>m</i>/<i>k</i>)</b>. Ici <i>X</i><sub>m</sub> = 0,10 m et φ = 0.`,
  params:[{id:'m',l:'Masse m',min:.5,max:2,step:.5,v:1,u:' kg'},{id:'k',l:'Raideur k',min:10,max:50,step:10,v:20,u:' N/m'},{id:'t',l:'Temps t',min:0,max:4,step:.1,v:.3,u:' s'}],
  draw:v=>{ const w=Math.sqrt(v.k/v.m), x=.1*Math.cos(w*v.t), vx=-.1*w*Math.sin(w*v.t);
    const A=plane({x:[-.2,3.4],y:[-.5,.6],grid:false,axes:false,w:300}); const bx=1.8+x*6;
    A.rect(-.2,-.5,.2,1.1,{fill:'var(--muted)',fo:.5,c:null}).seg(0,-.3,3.4,-.3,{c:'var(--muted)',w:1.5}); spring(A,0,0,bx-.25,0,14,.12);
    A.rect(bx-.25,-.3,.5,.55,{fill:'var(--math)',fo:.45,c:'var(--ink)',w:2}).seg(1.8,-.45,1.8,.55,{c:'var(--muted)',w:1,dash:true});
    if(Math.abs(x)>1e-4) vec(A,bx,.4,bx-x*6*.6,.4,'var(--bad)','F',{dy:-4});
    const B=plane({x:[-.3,4.2],y:[-.16,.16],h:130,w:300,grid:false}); B.fn(s=>.1*Math.cos(w*s),{from:0,to:4,c:'var(--accent)',w:2.5,n:400}).dot(v.t,x,{r:5});
    B.text(4.1,0,'t (s)',{a:'end',dy:14,c:'var(--muted)',s:11}).text(0,.1,'0,1 m',{dx:4,c:'var(--muted)',s:10});
    return A.svg()+B.svg(); },
  info:v=>{ const w=Math.sqrt(v.k/v.m); return `ω₀ = ${fmt(w)} rad/s · T = ${fmt(2*Math.PI/w)} s · <i>x</i> = ${fmt(.1*Math.cos(w*v.t),3)} m · <i>v</i> = ${fmt(-.1*w*Math.sin(w*v.t),2)} m/s`; },
  note:'La période ne dépend pas de l’amplitude : c’est ce qui fait de l’oscillateur harmonique une bonne horloge.'},
 {h:'Masse et période',p:'On remplace la masse accrochée au ressort par une masse quatre fois plus grande. La période…',
  opts:['est divisée par 2','est multipliée par 2','est multipliée par 4','ne change pas'],ans:1,
  why:'T = 2π√(m/k) : si m est multipliée par 4, √m est multiplié par 2, donc T aussi.'},
 {h:'Accorde l’oscillateur',p:'Avec un ressort de raideur <i>k</i> = 40 N/m, règle la masse pour obtenir une pulsation ω₀ = 10 rad/s. La courbe pointillée est la cible.',
  params:[{id:'m',l:'Masse m',min:.1,max:2,step:.1,v:1,u:' kg'}],
  draw:v=>{ const w=Math.sqrt(40/v.m), B=plane({x:[-.2,3.2],y:[-.14,.14],h:150,w:300,grid:false});
    B.fn(s=>.1*Math.cos(10*s),{from:0,to:3,c:'var(--muted)',w:2,dash:true,n:300}).fn(s=>.1*Math.cos(w*s),{from:0,to:3,c:'var(--accent)',w:2.5,n:400});
    B.text(3.1,0,'t (s)',{a:'end',dy:14,c:'var(--muted)',s:11}); return B.svg(); },
  info:v=>`ω₀ = √(40/${fmt(v.m,1)}) = ${fmt(Math.sqrt(40/v.m))} rad/s`,
  ok:v=>Math.abs(v.m-.4)<1e-6, why:'ω₀² = k/m donne m = k/ω₀² = 40/100 = 0,4 kg. La période vaut alors 2π/10 ≈ 0,63 s.'},
 {h:'Le pendule simple',p:`Une masse au bout d’un fil de longueur <i>L</i> vérifie θ″ = −(<i>g</i>/<i>L</i>) sin θ. Aux <b>petits angles</b>, sin θ ≈ θ (en radians) et on retrouve un oscillateur harmonique : <b>T = 2π√(<i>L</i>/<i>g</i>)</b>. La période ne dépend ni de la masse, ni de l’amplitude.`,
  params:[{id:'L',l:'Longueur L',min:.25,max:2,step:.25,v:1,u:' m'},{id:'a',l:'Amplitude θ₀',min:5,max:20,step:5,v:15,u:'°'},{id:'t',l:'Temps t',min:0,max:3,step:.1,v:.4,u:' s'}],
  draw:v=>{ const P=plane({x:[-1.2,1.2],y:[-2.3,.2],grid:false,axes:false,w:240}); const w=Math.sqrt(g/v.L), th=rad(v.a)*Math.cos(w*v.t), x=v.L*Math.sin(th), y=-v.L*Math.cos(th);
    P.seg(-.5,0,.5,0,{c:'var(--ink)',w:4}).seg(0,0,0,-v.L-.15,{c:'var(--muted)',w:1,dash:true}).seg(0,0,x,y,{c:'var(--ink)',w:2});
    P.curve(s=>v.L*Math.sin(s),s=>-v.L*Math.cos(s),-rad(v.a),rad(v.a),{c:'var(--line)',w:2}); P.dot(x,y,{r:9,c:'var(--math)'}); return P.svg(); },
  info:v=>{ const w=Math.sqrt(g/v.L); return `T = 2π√(<i>L</i>/<i>g</i>) = ${fmt(2*Math.PI/w)} s · θ(<i>t</i>) = ${fmt(v.a*Math.cos(w*v.t),1)}°`; },
  note:'Aux petits angles seulement : à 20°, sin θ et θ diffèrent de 2 %, et la vraie période est environ 0,8 % plus longue.'},
 {h:'Le pendule qui bat la seconde',p:'Quelle longueur doit avoir un pendule simple pour que sa période soit exactement 2,0 s&nbsp;? Arrondis au centimètre (en m).',lab:'L =',unit:'m',ans:.994,tol:.006,
  why:'L = g T²/(4π²) = 9,81 × 4/39,48 ≈ 0,99 m. Chaque aller (ou chaque retour) dure alors une seconde.'},
 {kind:'Défi',h:'Sur la Lune',p:'Sur la Lune, <i>g</i> est environ 6 fois plus faible que sur Terre. Par quel facteur la période d’un pendule simple est-elle multipliée&nbsp;? Arrondis au centième.',lab:'×',ans:2.449,tol:.011,
  why:'T ∝ 1/√g. Si g est divisée par 6, T est multipliée par √6 ≈ 2,45. Un ressort horizontal, lui, garderait la même période.'},
 {kind:'Problème',h:'La suspension de la voiture',
  p:'Une voiture de 1200 kg repose sur quatre ressorts de suspension, qu’on modélise par un seul ressort vertical de raideur <i>k</i>. Quand quatre passagers de 75 kg montent, la caisse s’enfonce de 3,0 cm. On étudie les oscillations verticales de la voiture chargée, sans amortisseur. Le poids ne fait que déplacer la position d’équilibre : autour d’elle, on retrouve <i>m x</i>″ = −<i>k x</i>.',
  parts:[
   {q:'a) Quelle est la raideur <i>k</i> de la suspension&nbsp;?',lab:'k =',unit:'N/m',ans:98100,tol:1,hint:'Le poids ajouté est équilibré par la force supplémentaire du ressort : Δ<i>m</i>·<i>g</i> = <i>k</i>·Δ<i>x</i>.',why:'k = 300 × 9,81/0,030 = 98 100 N/m.'},
   {q:'b) Quelle est la période des oscillations de la voiture chargée&nbsp;? Arrondis au centième.',lab:'T =',unit:'s',ans:.7769,tol:.011,hint:'Prends la masse totale qui oscille : voiture et passagers.',why:'T = 2π√(1500/98 100) ≈ 0,78 s, soit une fréquence de 1,29 Hz.'},
   {q:'c) La route présente des joints réguliers espacés de 15 m. À quelle vitesse les chocs arrivent-ils au rythme des oscillations propres&nbsp;? En km/h, arrondie à l’unité.',lab:'v =',unit:'km/h',ans:69.5,tol:.6,hint:'Les chocs entretiennent l’oscillation quand la durée entre deux joints est égale à la période T.',why:'Il faut parcourir 15 m en T = 0,777 s : v = 15/0,777 ≈ 19,3 m/s ≈ 69,5 km/h. Chaque choc relance l’oscillation au bon moment, et l’amplitude grandit.'},
   {q:'d) Quel est le rôle de l’amortisseur, monté à côté de chaque ressort&nbsp;?',opts:['Porter le poids de la voiture à la place du ressort','Rendre la suspension plus raide pour changer la période','Augmenter la masse qui oscille','Dissiper l’énergie des oscillations pour qu’elles s’éteignent vite'],ans:3,hint:'Sans lui, que se passe-t-il à la vitesse trouvée en c)&nbsp;?',why:'L’amortisseur exerce une force opposée à la vitesse et transforme l’énergie des oscillations en chaleur. Sans lui, la résonance de c) ferait rebondir la caisse de plus en plus fort.'},
  ],
  sol:'<p>À l’équilibre, la force supplémentaire du ressort compense le poids ajouté : k = Δm g/Δx = 300 × 9,81/0,030 = 98 100 N/m.</p><p>Autour de la nouvelle position d’équilibre, m x″ = −kx avec m = 1500 kg : ω₀ = √(k/m) ≈ 8,09 rad/s et T = 2π/ω₀ ≈ 0,78 s.</p><p>Des joints espacés de d = 15 m frappent la roue toutes les d/v secondes. Si d/v = T, chaque choc arrive en phase avec l’oscillation : c’est la résonance, à v = d/T ≈ 19,3 m/s ≈ 69,5 km/h.</p><p>Ordre de grandeur : une suspension de voiture oscille autour de 1 à 1,5 Hz, une fréquence confortable pour le corps humain. L’amortisseur dissipe l’énergie et évite que l’amplitude n’explose à la résonance.</p>'},
 {kind:'Problème',h:'La pièce sur le plateau',
  p:'Un plateau de 0,50 kg est fixé au sommet d’un ressort vertical de raideur 50 N/m. On l’enfonce de 8,0 cm sous sa position d’équilibre, puis on le lâche sans vitesse. Autour de l’équilibre, le mouvement est harmonique. On pose sur le plateau une pièce de monnaie de masse négligeable : elle n’est pas collée. On cherche si elle décolle, et à partir de quelle amplitude cela arriverait.',
  parts:[
   {q:'a) Quelle est la pulsation propre ω₀&nbsp;?',lab:'ω₀ =',unit:'rad/s',ans:10,tol:.01,hint:'ω₀ = √(<i>k</i>/<i>m</i>).',why:'ω₀ = √(50/0,50) = √100 = 10 rad/s, soit T ≈ 0,63 s.'},
   {q:'b) Quelle est la vitesse maximale du plateau&nbsp;?',lab:'v =',unit:'m/s',ans:.8,tol:.001,hint:'Dérive <i>x</i>(<i>t</i>) = <i>X</i><sub>m</sub> cos(ω₀<i>t</i>) : l’amplitude de la vitesse est <i>X</i><sub>m</sub>ω₀.',why:'v<sub>max</sub> = X<sub>m</sub>ω₀ = 0,080 × 10 = 0,80 m/s, atteinte au passage par l’équilibre.'},
   {q:'c) Quelle est la norme maximale de son accélération&nbsp;?',lab:'a =',unit:'m/s²',ans:8,tol:.01,hint:'<i>x</i>″ = −ω₀²<i>x</i> : où |<i>x</i>| est-il le plus grand&nbsp;?',why:'|a| est maximale aux extrémités : ω₀²X<sub>m</sub> = 100 × 0,080 = 8,0 m/s².'},
   {q:'d) En quel point la pièce risque-t-elle de décoller&nbsp;?',opts:['Au point le plus bas, où le plateau remonte le plus fort','Au passage par l’équilibre, où la vitesse est maximale','Au point le plus haut, où l’accélération est dirigée vers le bas et maximale','Nulle part : la pièce suit toujours le plateau'],ans:2,hint:'La pièce ne subit que son poids et la réaction <i>N</i> ≥ 0 du plateau. Écris <i>N</i> − <i>mg</i> = <i>ma</i>, avec <i>a</i> orientée vers le haut.',why:'N = m(g + a) s’annule si a = −g. L’accélération la plus négative, −ω₀²X<sub>m</sub>, est atteinte au point le plus haut.'},
   {q:'e) À partir de quelle amplitude la pièce décollerait-elle&nbsp;? Donne-la en cm, arrondie au millimètre.',lab:'Xₘ =',unit:'cm',ans:9.81,tol:.06,hint:'Il faut que l’accélération maximale ω₀²<i>X</i><sub>m</sub> dépasse <i>g</i>.',why:'X<sub>m</sub> &gt; g/ω₀² = 9,81/100 = 0,0981 m ≈ 9,8 cm. Avec 8,0 cm, la pièce reste en contact.'},
  ],
  sol:'<p>Autour de l’équilibre, le mouvement est harmonique, d’amplitude X<sub>m</sub> = 0,080 m (lâché sans vitesse) et de pulsation ω₀ = √(k/m) = 10 rad/s.</p><p>La vitesse maximale vaut X<sub>m</sub>ω₀ = 0,80 m/s, au passage par l’équilibre. L’accélération x″ = −ω₀²x vaut au plus ω₀²X<sub>m</sub> = 8,0 m/s², aux extrémités.</p><p>La pièce subit son poids et la réaction N du plateau : N − mg = ma, soit N = m(g + a). Elle reste en contact tant que N ≥ 0, c’est-à-dire a ≥ −g. Le cas critique est le point haut, où a = −ω₀²X<sub>m</sub>.</p><p>Condition de décollage : ω₀²X<sub>m</sub> &gt; g, soit X<sub>m</sub> &gt; 9,8 cm. Ici 8,0 m/s² &lt; 9,81 m/s² : la pièce ne décolle pas, mais en haut elle ne pèse plus sur le plateau que 18 % de son poids.</p>'},
]},

/* ================= 6. HYDROSTATIQUE ================= */
{subj:'phy', sem:'all', id:'phy-hydrostatique', h:'Pression et hydrostatique', p:'La pression dans un fluide au repos, la presse hydraulique et la poussée d’Archimède.', steps:[
 {h:'La pression',p:`Une force <i>F</i> répartie sur une surface <i>S</i> perpendiculaire exerce la pression <b><i>p</i> = <i>F</i>/<i>S</i></b>. Unité : le <b>pascal</b>, 1 Pa = 1 N/m². On utilise aussi 1 bar = 10⁵ Pa. La pression atmosphérique au niveau de la mer vaut environ 1,013·10⁵ Pa.<br>Une personne de 60 kg se tient sur un seul talon aiguille de 1,0 cm². Quelle pression exerce-t-elle sur le sol, en MPa&nbsp;? Arrondis au centième.`,
  lab:'p =',unit:'MPa',ans:5.886,tol:.011,why:'F = 60 × 9,81 = 589 N et S = 1,0·10⁻⁴ m², donc p = 589/10⁻⁴ ≈ 5,89·10⁶ Pa = 5,89 MPa, environ 58 fois la pression atmosphérique.'},
 {h:'La loi de l’hydrostatique',p:`Dans un fluide au repos de masse volumique ρ, la pression augmente avec la profondeur <i>h</i> : <b><i>p</i> = <i>p</i>₀ + ρ <i>g h</i></b>, où <i>p</i>₀ est la pression à la surface. En un point, la pression agit de la même façon dans toutes les directions.`,
  params:[{id:'h',l:'Profondeur h',min:0,max:10,step:.5,v:3,u:' m'},{id:'f',l:'Fluide (huile, eau, glycérine)',min:0,max:2,v:1}],
  draw:v=>{ const rho=[900,1000,1260][v.f], p=101.3+rho*g*v.h/1000;
    const P=plane({x:[-1,8],y:[-11,1.5],w:300,h:280,grid:false,axes:false});
    P.rect(0,-10,4,10,{fill:['var(--spark)','var(--sci)','var(--other)'][v.f],fo:.25,c:null}).poly([[0,1],[0,-10],[4,-10],[4,1]],{open:true,c:'var(--ink)',w:2});
    for(let d=2;d<=10;d+=2) P.text(0,-d,fmt(d)+' m',{a:'end',dx:-4,dy:4,c:'var(--muted)',s:10});
    const L=p/250*1.2; [[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>P.arrow(2+a*(L+.15),-v.h+b*(L+.15)*.9,2+a*.15,-v.h+b*.15*.9,{c:'var(--bad)',w:2,hs:8}));
    P.dot(2,-v.h,{r:5,c:'var(--ink)'});
    P.rect(5.5,-10,1,10,{c:'var(--muted)',w:1.5}).rect(5.5,-10,1,p/250*10,{fill:'var(--bad)',fo:.5,c:null}).text(6,-10+p/250*10,fmt(p,0)+' kPa',{a:'middle',dy:-6,s:12});
    return P.svg(); },
  info:v=>{ const rho=[900,1000,1260][v.f]; return `ρ = ${rho} kg/m³ · <i>p</i> = 101,3 kPa + ${fmt(rho*g*v.h/1000,1)} kPa = <b>${fmt(101.3+rho*g*v.h/1000,1)} kPa</b>`; },
  note:'Dans l’eau, la pression augmente d’environ 1 bar tous les 10 m. Elle ne dépend que de la profondeur, pas de la forme du récipient.'},
 {h:'Le plongeur',p:'Un plongeur descend à 20 m dans l’eau de mer (ρ = 1025 kg/m³), avec <i>p</i>₀ = 1,013 bar en surface. Quelle pression subit-il, en bar&nbsp;? Arrondis au centième.',lab:'p =',unit:'bar',ans:3.024,tol:.011,
  why:'ρgh = 1025 × 9,81 × 20 = 2,01·10⁵ Pa = 2,01 bar. Donc p = 1,013 + 2,011 ≈ 3,02 bar.'},
 {h:'Le principe de Pascal',p:`Une variation de pression imposée en un point d’un liquide incompressible au repos se transmet <b>intégralement</b> à tout le liquide. Dans une presse hydraulique : <b><i>F</i>₂/<i>S</i>₂ = <i>F</i>₁/<i>S</i>₁</b>.<br>Un piston de 10 cm² est poussé avec 100 N. Quelle force soulève le piston de 500 cm²&nbsp;?`,
  fig:(()=>{ const P=plane({x:[-.5,9],y:[-.5,4.5],grid:false,axes:false,w:280});
    P.poly([[0,3],[0,0],[8,0],[8,2],[3,2],[3,1],[1,1],[1,3]],{open:true,c:'var(--ink)',w:2}).poly([[0,0],[8,0],[8,2],[3,2],[3,1],[1,1],[1,2.5],[0,2.5]],{fill:'var(--sci)',fo:.25,c:null});
    P.rect(0,2.5,1,.3,{fill:'var(--muted)',fo:.8,c:null}).rect(3,2,5,.3,{fill:'var(--muted)',fo:.8,c:null}).seg(8,2,8,3,{c:'var(--ink)',w:2}).seg(3,2,3,3,{c:'var(--ink)',w:2});
    vec(P,.5,4.2,.5,2.85,'var(--bad)','F₁',{dx:8,dy:-14}); vec(P,5.5,2.35,5.5,4,'var(--accent)','F₂'); P.text(.5,0,'S₁',{a:'middle',dy:-28,c:'var(--muted)',s:12}).text(5.5,0,'S₂',{a:'middle',dy:-28,c:'var(--muted)',s:12}); return P.svg(); })(),
  opts:['2 N','100 N','500 N','5000 N'],ans:3,
  why:'F₂ = F₁ × S₂/S₁ = 100 × 500/10 = 5000 N. En contrepartie, le grand piston monte 50 fois moins que le petit ne descend : le travail est le même.'},
 {h:'La poussée d’Archimède',p:`Tout corps immergé dans un fluide subit une force verticale, vers le haut, égale au poids du fluide déplacé : <b>Π = ρ<sub>fluide</sub> <i>V</i><sub>imm</sub> <i>g</i></b>. Un corps <b>flotte</b> à l’équilibre quand Π = <i>P</i>, d’où la fraction immergée <b><i>V</i><sub>imm</sub>/<i>V</i> = ρ<sub>corps</sub>/ρ<sub>fluide</sub></b>.`,
  params:[{id:'rc',l:'ρ du bloc',min:100,max:1400,step:50,v:600,u:' kg/m³'},{id:'rf',l:'ρ du liquide',min:700,max:1500,step:100,v:1000,u:' kg/m³'}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-3.6,2.6],grid:false,axes:false,w:260}); const fr=v.rc/v.rf, sink=fr>=1;
    P.rect(-3,-3.5,6,3.5,{fill:'var(--sci)',fo:.25,c:null}).seg(-3,0,3,0,{c:'var(--sci)',w:2});
    const y0=sink?-3.5:-2*fr; P.rect(-1,y0,2,2,{fill:'var(--spark)',fo:.6,c:'var(--ink)',w:2});
    const Pw=v.rc/1400*2.2, Pi=(sink?v.rf:v.rc)/1400*2.2; vec(P,.3,y0+1,.3,y0+1-Pw,'var(--bad)','P',{dy:12}); vec(P,-.3,y0+1,-.3,y0+1+Pi,'var(--accent)','Π',{dx:-20});
    return P.svg(); },
  info:v=>{ const fr=v.rc/v.rf; return fr>=1?(fr===1?'Masses volumiques égales : le bloc reste en équilibre à n’importe quelle profondeur.':'ρ<sub>bloc</sub> &gt; ρ<sub>liquide</sub> : la poussée maximale est plus petite que le poids, <b>le bloc coule</b>.'):`Fraction immergée : ${fmt(v.rc)}/${fmt(v.rf)} = <b>${fmt(100*fr,1)} %</b>`; },
  note:'La poussée ne dépend pas de la masse du corps, seulement du volume immergé et du fluide.'},
 {h:'Trois quarts sous la surface',p:'Un bloc de bois a une masse volumique de 900 kg/m³. Choisis le liquide pour qu’il flotte avec exactement 3/4 de son volume immergé.',
  params:[{id:'rf',l:'ρ du liquide',min:700,max:1500,step:100,v:1000,u:' kg/m³'}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-3.6,2.6],grid:false,axes:false,w:240}); const fr=900/v.rf, sink=fr>=1;
    P.rect(-3,-3.5,6,3.5,{fill:'var(--sci)',fo:.25,c:null}).seg(-3,0,3,0,{c:'var(--sci)',w:2});
    const y0=sink?-3.5:-2*fr; P.rect(-1,y0,2,2,{fill:'var(--spark)',fo:.6,c:'var(--ink)',w:2}); for(let k=1;k<4;k++) P.seg(-1.15,y0+k*.5,-1,y0+k*.5,{c:'var(--ink)',w:1.5});
    return P.svg(); },
  info:v=>900/v.rf>=1?'Le bloc ne flotte pas dans ce liquide.':`Fraction immergée : ${fmt(100*900/v.rf,1)} %`,
  ok:v=>v.rf===1200, why:'ρ<sub>bloc</sub>/ρ<sub>liquide</sub> = 3/4 donne ρ<sub>liquide</sub> = 900 × 4/3 = 1200 kg/m³.'},
 {h:'La partie cachée de l’iceberg',p:'La glace a une masse volumique de 917 kg/m³ et l’eau de mer 1025 kg/m³. Quel pourcentage du volume d’un iceberg est sous l’eau&nbsp;? Arrondis à l’unité.',unit:'%',ans:89.46,tol:.6,
  why:'Fraction immergée = 917/1025 = 0,895, soit environ 89 %. Seul un dixième émerge.'},
 {kind:'Défi',h:'Poids apparent',p:'Une pierre de 2,0 kg et de volume 0,80 L est entièrement plongée dans l’eau douce. Quelle force faut-il exercer pour la retenir&nbsp;? Arrondis au centième.',unit:'N',ans:11.772,tol:.011,
  why:'P = 2,0 × 9,81 = 19,62 N et Π = 1000 × 0,80·10⁻³ × 9,81 = 7,85 N. Il faut donc 19,62 − 7,85 ≈ 11,77 N.'},
 {kind:'Problème',h:'L’iceberg',
  p:'Un iceberg dérive dans l’océan. Depuis un avion, on estime le volume de sa partie émergée à 5000 m³. La glace a une masse volumique de 917 kg/m³, l’eau de mer 1025 kg/m³. L’iceberg flotte à l’équilibre. On veut connaître sa taille réelle, puis ce qui change s’il entre dans un fjord d’eau douce.',
  parts:[
   {q:'a) Quel pourcentage du volume de l’iceberg est immergé&nbsp;? Arrondis au dixième.',unit:'%',ans:89.46,tol:.06,hint:'À l’équilibre, poussée et poids se compensent : <i>V</i><sub>imm</sub>/<i>V</i> = ρ<sub>glace</sub>/ρ<sub>eau</sub>.',why:'917/1025 ≈ 0,8946, soit 89,5 %.'},
   {q:'b) Quel est le volume total de l’iceberg&nbsp;? Arrondis à la centaine de m³.',lab:'V =',unit:'m³',ans:47454,tol:60,hint:'La partie émergée représente la fraction 1 − <i>V</i><sub>imm</sub>/<i>V</i> du volume total.',why:'V = 5000/(1 − 0,8946) = 5000/0,1054 ≈ 47 500 m³.'},
   {q:'c) Quelle est sa masse, en tonnes&nbsp;? Arrondis à la centaine de tonnes.',lab:'m =',unit:'t',ans:43515,tol:60,hint:'<i>m</i> = ρ<sub>glace</sub> <i>V</i>, et 1 t = 1000 kg.',why:'m = 917 × 47 454 ≈ 4,35·10⁷ kg ≈ 43 500 t.'},
   {q:'d) Les courants le poussent dans un fjord d’eau douce (1000 kg/m³). Quel volume émerge alors&nbsp;? Arrondis à la centaine de m³.',unit:'m³',ans:3939,tol:60,hint:'Sa masse ne change pas, mais la fraction immergée devient 917/1000.',why:'Fraction émergée 1 − 0,917 = 0,083, donc 0,083 × 47 454 ≈ 3900 m³. L’iceberg s’enfonce : l’eau douce, moins dense, le porte moins.'},
  ],
  sol:'<p>À l’équilibre, la poussée d’Archimède égale le poids : ρ<sub>eau</sub>V<sub>imm</sub>g = ρ<sub>glace</sub>Vg, d’où V<sub>imm</sub>/V = 917/1025 ≈ 0,895. Seuls 10,5 % du volume émergent.</p><p>Le volume total vaut donc V = 5000/0,1054 ≈ 47 500 m³, environ neuf fois et demie la partie visible. Sa masse est m = ρ<sub>glace</sub>V ≈ 4,35·10⁷ kg ≈ 43 500 t.</p><p>En eau douce, la fraction immergée passe à 0,917 : il n’émerge plus que 8,3 % du volume, soit environ 3900 m³. L’iceberg s’enfonce un peu.</p><p>Ordre de grandeur : 47 500 m³, c’est un cube de 36 m de côté, dont seule une calotte de quelques mètres dépasse.</p>'},
 {kind:'Problème',h:'La poussée sur un barrage',
  p:'Un barrage a une paroi amont verticale et rectangulaire, de 40 m de large. L’eau douce (1000 kg/m³) monte à 20 m de hauteur contre cette paroi. Côté aval, la paroi est à l’air libre. On cherche la force totale de l’eau sur la paroi et l’endroit où elle s’applique. On note <i>h</i> la profondeur sous la surface de l’eau.',
  fig:(()=>{ const P=plane({x:[-10,6],y:[-1.5,23],w:300,h:230,grid:false,axes:false});
    P.rect(-10,0,10,20,{fill:'var(--sci)',fo:.25,c:null}).seg(-10,20,0,20,{c:'var(--sci)',w:2}).poly([[0,0],[0,22],[1.2,22],[4,0]],{fill:'var(--muted)',fo:.5,c:'var(--ink)',w:2}).seg(-10,0,6,0,{c:'var(--muted)',w:1.5});
    P.poly([[0,20],[-6,0],[0,0]],{c:'var(--bad)',w:1.5,dash:true});
    for(let y=2;y<20;y+=3) P.arrow(-(20-y)*.3,y,0,y,{c:'var(--bad)',w:1.5,hs:7});
    vec(P,-7,20/3,-.2,20/3,'var(--accent)','',{w:3.5}); P.text(-7,20/3,'F',{dy:-8,c:'var(--accent)'}).text(-9.5,20,'20 m',{dy:-6,s:11,c:'var(--muted)'}).text(.3,20/3,'H/3',{dx:4,dy:4,s:11,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) Pourquoi peut-on oublier la pression atmosphérique <i>p</i>₀ dans le calcul&nbsp;?',opts:['Parce qu’elle est négligeable devant ρ<i>gh</i>','Parce qu’elle agit des deux côtés de la paroi et que ses forces se compensent','Parce que l’eau est incompressible','Parce que la pression atmosphérique n’agit pas sous l’eau'],ans:1,hint:'Compare 1 bar à ρ<i>gH</i> pour 20 m d’eau, puis regarde la face aval.',why:'p₀ pousse sur la face amont, transmise par l’eau, et sur la face aval, directement : les deux forces s’annulent. Elle n’est pas négligeable pour autant (1 bar contre 2 bar au fond).'},
   {q:'b) Quelle est la surpression ρ<i>gh</i> au pied de la paroi, en kPa&nbsp;?',lab:'Δp =',unit:'kPa',ans:196.2,tol:.06,hint:'<i>h</i> = 20 m au pied.',why:'ρgH = 1000 × 9,81 × 20 = 196 200 Pa = 196,2 kPa, environ 2 bar.'},
   {q:'c) La surpression croît linéairement de 0 en surface à ρ<i>gH</i> au fond. Quelle force totale l’eau exerce-t-elle sur la paroi&nbsp;? En MN, arrondie au dixième.',lab:'F =',unit:'MN',ans:78.48,tol:.06,hint:'Pour une pression qui varie linéairement, la force vaut la pression moyenne fois la surface. Tu peux aussi intégrer d<i>F</i> = ρ<i>g h</i> · <i>L</i> d<i>h</i> de 0 à <i>H</i>.',why:'Pression moyenne ρgH/2 = 98,1 kPa sur S = 40 × 20 = 800 m² : F = ρgLH²/2 ≈ 7,85·10⁷ N = 78,5 MN.'},
   {q:'d) À quelle hauteur au-dessus du pied s’applique cette force&nbsp;? En m, arrondie au centimètre.',lab:'y =',unit:'m',ans:6.667,tol:.006,hint:'Le profil de pression est un triangle, plus large en bas. La force passe par le centre de gravité de ce triangle.',why:'Le centre de gravité d’un triangle est au tiers de sa hauteur depuis la base : H/3 ≈ 6,67 m au-dessus du pied.'},
   {q:'e) Si le niveau de l’eau monte de 20 m à 30 m, la force sur la paroi est multipliée par…',opts:['1,5','3','1,22','2,25'],ans:3,hint:'Regarde comment <i>F</i> dépend de <i>H</i>.',why:'F ∝ H², donc (30/20)² = 2,25. Le moment de renversement, F × H/3 ∝ H³, est même multiplié par 3,4.'},
  ],
  sol:'<p>La pression atmosphérique agit des deux côtés de la paroi : on ne garde que la surpression ρgh, qui croît linéairement avec la profondeur, de 0 à ρgH = 196,2 kPa au pied.</p><p>Une bande horizontale de hauteur dh, à la profondeur h, reçoit dF = ρgh L dh. En intégrant de 0 à H : F = ρgLH²/2 = 1000 × 9,81 × 40 × 400/2 ≈ 7,85·10⁷ N, soit 78,5 MN, le poids d’environ 8000 t.</p><p>La force s’applique au centre de gravité du triangle de pression, à H/3 ≈ 6,67 m au-dessus du pied. Son moment de renversement autour du pied vaut F·H/3 ≈ 5,2·10⁸ N·m.</p><p>Comme F ∝ H² et le moment ∝ H³, un barrage doit être beaucoup plus épais à sa base qu’à son sommet.</p>'},
]},

/* ================= 7. ÉNERGIE ================= */
{subj:'phy', sem:'all', id:'phy-energie', h:'Énergie, travail et puissance', p:'Ce qu’une force fournit au cours d’un déplacement, et ce qui se conserve.', steps:[
 {h:'Le travail d’une force',p:`Une force constante <i>F</i> dont le point d’application se déplace de <i>d</i> = AB effectue le travail <b><i>W</i> = <i>F</i>·<i>d</i> = <i>F d</i> cos θ</b>, en joules (1 J = 1 N·m). Il est <b>moteur</b> si <i>W</i> &gt; 0, <b>résistant</b> si <i>W</i> &lt; 0, et nul si la force est perpendiculaire au déplacement. Ici <i>d</i> = 5 m.`,
  params:[{id:'F',l:'Force F',min:10,max:50,step:10,v:30,u:' N'},{id:'th',l:'Angle θ',min:0,max:180,step:15,v:30,u:'°'}],
  draw:v=>{ const P=plane({x:[-1.5,8.5],y:[-1.8,5.6],grid:false,axes:false,w:300}); const c=Math.cos(rad(v.th)), s=Math.sin(rad(v.th)), L=v.F/10;
    P.seg(-1.5,0,8.5,0,{c:'var(--muted)',w:1.5}).rect(-.6,0,1.2,1,{c:'var(--ink)',w:1.5,dash:true,op:.5}).rect(4.4,0,1.2,1,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2});
    vec(P,0,-.8,5,-.8,'var(--muted)','d = 5 m',{dx:-60,dy:16}); vec(P,5,.5,5+L*c,.5+L*s,'var(--accent)','F');
    P.seg(5,.5,5+L*c,.5,{c:'var(--accent)',w:4,op:.4}); return P.svg(); },
  info:v=>{ const W=v.F*5*Math.cos(rad(v.th)); return `<i>W</i> = ${v.F} × 5 × cos ${v.th}° = <b>${fmt(Math.abs(W)<1e-9?0:W,1)} J</b> · `+(W>1e-9?'travail moteur':W<-1e-9?'travail résistant':'travail nul'); },
  note:'Seule la composante de <i>F</i> le long du déplacement (trait épais) travaille.'},
 {h:'Une force qui ne travaille pas',p:'Un chariot roule sur un sol horizontal. Quel est le travail de la réaction normale du sol&nbsp;?',
  opts:['Il est moteur','Il est résistant','Il est nul','Il vaut −mgd'],ans:2,
  why:'La réaction normale est perpendiculaire au déplacement : cos 90° = 0, donc W = 0. Il en va de même pour le poids sur un trajet horizontal.'},
 {h:'Énergie cinétique et théorème',p:`Un corps de masse <i>m</i> à la vitesse <i>v</i> possède l’<b>énergie cinétique</b> <b><i>E</i><sub>c</sub> = ½ <i>m v</i>²</b>. <b>Théorème de l’énergie cinétique</b> : entre deux instants, <b>Δ<i>E</i><sub>c</sub> = Σ <i>W</i></b>, la somme des travaux de toutes les forces.<br>Quel travail total faut-il fournir à une voiture de 1200 kg pour la faire passer de 0 à 20 m/s, en kJ&nbsp;?`,
  lab:'W =',unit:'kJ',ans:240,tol:.5,why:'ΔE<sub>c</sub> = ½ × 1200 × 20² − 0 = 240 000 J = 240 kJ.'},
 {h:'Énergie potentielle et énergie mécanique',p:`Le poids dérive d’une <b>énergie potentielle</b> <b><i>E</i><sub>p</sub> = <i>m g h</i></b>, un ressort de <b>½ <i>k x</i>²</b>. L’énergie mécanique <b><i>E</i><sub>m</sub> = <i>E</i><sub>c</sub> + <i>E</i><sub>p</sub></b> est <b>conservée</b> si seules des forces conservatives travaillent. Une skateuse de 50 kg part sans vitesse du bord d’une rampe de 4,5 m de haut.`,
  params:[{id:'x',l:'Position x',min:-3,max:3,step:.25,v:-2,u:' m'}],
  draw:v=>{ const P=plane({x:[-3.6,6.4],y:[-.6,5.4],grid:false,axes:false,w:300}); const h=.5*v.x*v.x, H=4.5;
    P.fn(x=>.5*x*x,{from:-3.2,to:3.2,c:'var(--ink)',w:3}).seg(-3.6,H,3.4,H,{c:'var(--muted)',w:1,dash:true}).dot(v.x,h+.2,{r:8,c:'var(--math)'});
    P.rect(4.2,0,.8,h,{fill:'var(--spark)',fo:.8,c:null}).rect(5.3,0,.8,H-h,{fill:'var(--accent)',fo:.8,c:null}).seg(4,0,6.3,0,{c:'var(--muted)',w:1.5});
    P.text(4.6,0,'Ep',{a:'middle',dy:16,s:12}).text(5.7,0,'Ec',{a:'middle',dy:16,s:12}); return P.svg(); },
  info:v=>{ const h=.5*v.x*v.x, m=50; return `<i>h</i> = ${fmt(h,2)} m · <i>E</i><sub>p</sub> = ${fmt(m*g*h,0)} J · <i>E</i><sub>c</sub> = ${fmt(m*g*(4.5-h),0)} J · <i>v</i> = ${fmt(Math.sqrt(2*g*(4.5-h)),2)} m/s<br><i>E</i><sub>m</sub> = ${fmt(m*g*4.5,0)} J, constante`; },
  note:'Avec des frottements, <i>E</i><sub>m</sub> diminue : ΔE<sub>m</sub> = <i>W</i><sub>frottements</sub> &lt; 0. L’énergie n’est pas perdue, elle devient de la chaleur.'},
 {h:'La chute',p:'Un objet tombe sans vitesse initiale d’une hauteur de 5,0 m. Frottements négligés, quelle est sa vitesse en touchant le sol&nbsp;? Arrondis au centième.',unit:'m/s',ans:9.905,tol:.011,
  why:'mgh = ½mv² donne v = √(2gh) = √(98,1) ≈ 9,90 m/s. La masse ne joue aucun rôle.'},
 {h:'Le lance-bille',p:'Un ressort de raideur 200 N/m lance verticalement une bille de 100 g. Règle la compression pour que la bille monte de 2 m (à 10 cm près) au-dessus de son point de départ.',
  params:[{id:'x',l:'Compression x',min:5,max:30,v:20,u:' cm'}],
  draw:v=>{ const P=plane({x:[-1.5,3.5],y:[-.6,6.2],grid:false,axes:false,w:220,h:280}); const h=200*(v.x/100)**2/(2*.1*g);
    P.seg(-1.5,0,3.5,0,{c:'var(--muted)',w:1.5}); spring(P,0,0,0,.6,10,.25); P.seg(-.5,2,1.2,2,{c:'var(--spark)',w:2,dash:true}).text(1.3,2,'2 m',{dy:4,c:'var(--muted)',s:12});
    P.seg(0,.7,0,Math.min(h,6)+.1,{c:'var(--line)',w:2,dash:true}).dot(0,Math.min(h,6)+.1,{r:7,c:'var(--math)'}); return P.svg(); },
  info:v=>`½<i>kx</i>² = ${fmt(100*(v.x/100)**2,2)} J → <i>h</i> = <i>kx</i>²/(2<i>mg</i>) = ${fmt(200*(v.x/100)**2/(2*.1*g),2)} m`,
  ok:v=>Math.abs(200*(v.x/100)**2/(2*.1*g)-2)<.1, why:'½kx² = mgh donne x = √(2mgh/k) = √(2 × 0,1 × 9,81 × 2/200) ≈ 0,14 m = 14 cm.'},
 {h:'La puissance',p:`La <b>puissance</b> mesure le travail fourni par unité de temps : <b><i>P</i> = <i>W</i>/Δ<i>t</i></b>, en watts (1 W = 1 J/s). Pour une force appliquée à un corps de vitesse <i>v</i>, la puissance instantanée vaut <b><i>P</i> = <i>F</i>·<i>v</i></b>.<br>Une grue soulève à vitesse constante une charge de 500 kg sur 12 m en 20 s. Quelle puissance développe-t-elle&nbsp;?`,
  lab:'P =',unit:'W',ans:2943,tol:1,why:'À vitesse constante, F = mg. W = 500 × 9,81 × 12 = 58 860 J, donc P = 58 860/20 = 2943 W, soit près de 3 kW.',
  note:'Le kilowattheure est une unité d’énergie : 1 kWh = 1000 W × 3600 s = 3,6·10⁶ J.'},
 {kind:'Défi',h:'Le freinage',p:'Une voiture de 1000 kg roule à 25 m/s. Elle freine jusqu’à l’arrêt sur 50 m. Quelle est la force de freinage moyenne, supposée constante&nbsp;?',unit:'N',ans:6250,tol:1,
  why:'Théorème de l’énergie cinétique : 0 − ½ × 1000 × 25² = −F × 50, donc F = 312 500/50 = 6250 N.'},
 {kind:'Problème',h:'La puissance d’un ascenseur',
  p:'Une cabine d’ascenseur chargée a une masse de 1200 kg. Elle monte de 30 m, une dizaine d’étages, à vitesse constante en 20 s. Le moteur électrique a un rendement de 80 % : il transforme 80 % de l’énergie électrique reçue en travail mécanique. On néglige les frottements ainsi que les phases de démarrage et d’arrêt.',
  parts:[
   {q:'a) Quel travail le câble fournit-il à la cabine pendant la montée&nbsp;? En kJ, arrondi au dixième.',lab:'W =',unit:'kJ',ans:353.16,tol:.06,hint:'À vitesse constante, la tension du câble compense exactement le poids.',why:'T = mg, donc W = mgh = 1200 × 9,81 × 30 = 353 160 J ≈ 353,2 kJ.'},
   {q:'b) Quelle puissance mécanique le moteur développe-t-il&nbsp;? En kW, arrondie au dixième.',lab:'P =',unit:'kW',ans:17.658,tol:.06,hint:'<i>P</i> = <i>W</i>/Δ<i>t</i>, ou <i>P</i> = <i>F v</i>.',why:'P = 353 160/20 = 17 658 W ≈ 17,7 kW. On retrouve P = mg·v avec v = 1,5 m/s.'},
   {q:'c) Quelle puissance électrique le moteur consomme-t-il&nbsp;? En kW, arrondie au dixième.',lab:'P =',unit:'kW',ans:22.07,tol:.06,hint:'Rendement = puissance utile / puissance reçue.',why:'P<sub>él</sub> = 17,66/0,80 ≈ 22,1 kW.'},
   {q:'d) Les vrais ascenseurs ont un contrepoids de 900 kg, relié à la cabine par le câble, qui descend quand elle monte. Quelle puissance mécanique le moteur doit-il alors fournir&nbsp;? En kW, arrondie au dixième.',lab:'P =',unit:'kW',ans:4.4145,tol:.06,hint:'Pendant que la cabine gagne de l’énergie potentielle, le contrepoids en perd. Le moteur ne fournit que la différence.',why:'ΔE<sub>p</sub> = (1200 − 900) × 9,81 × 30 = 88 290 J en 20 s, soit environ 4,4 kW, quatre fois moins.'},
  ],
  sol:'<p>À vitesse constante, l’énergie cinétique ne varie pas : le travail du câble compense celui du poids, W = mgh ≈ 353 kJ.</p><p>La puissance mécanique vaut P = W/Δt ≈ 17,7 kW, ce qu’on retrouve avec P = F·v = mg × 1,5 m/s. Avec un rendement de 80 %, le moteur tire 17,66/0,80 ≈ 22,1 kW du réseau.</p><p>Avec un contrepoids de 900 kg qui descend de 30 m, l’énergie potentielle du système ne gagne que (1200 − 900)gh ≈ 88 kJ : le moteur ne fournit plus que 4,4 kW mécaniques, soit 5,5 kW électriques.</p><p>Ordre de grandeur : 22 kW, c’est la puissance d’une dizaine de bouilloires. Le contrepoids divise la facture par quatre.</p>'},
 {kind:'Problème',h:'La boucle des montagnes russes',
  p:'Un wagonnet part sans vitesse d’une hauteur <i>h</i> au-dessus du bas d’une boucle circulaire verticale de rayon R = 8,0 m. On néglige tous les frottements. En haut de la boucle, les passagers ont la tête en bas : le wagonnet reste sur le rail tant que la réaction du rail, dirigée vers le centre, est positive ou nulle. On cherche la hauteur de départ minimale et la force ressentie au bas de la boucle.',
  fig:(()=>{ const P=plane({x:[-30,14],y:[-2,23],grid:false,axes:false,w:320});
    P.fn(x=>20*(x/28)**2,{from:-28,to:0,c:'var(--ink)',w:3}).circ(0,8,8,{c:'var(--ink)',w:3}).seg(0,0,14,0,{c:'var(--ink)',w:3});
    P.seg(-30,20,-24,20,{c:'var(--muted)',w:1,dash:true}).seg(-27,0,-27,20,{c:'var(--muted)',w:1,dash:true}).text(-27,10,'h',{dx:6,c:'var(--muted)'});
    P.seg(0,8,0,16,{c:'var(--muted)',w:1,dash:true}).text(0,12,'R',{dx:5,c:'var(--muted)',s:12}).dot(-28,20,{l:'départ',dx:8,dy:-6}).dot(0,16,{r:5,c:'var(--bad)',l:'sommet',dx:8,dy:-6}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle vitesse minimale le wagonnet doit-il avoir au sommet de la boucle&nbsp;? Arrondis au centième.',lab:'v =',unit:'m/s',ans:8.859,tol:.011,hint:'Au sommet, le poids et la réaction pointent tous deux vers le centre : <i>mg</i> + <i>N</i> = <i>mv</i>²/R, avec <i>N</i> ≥ 0.',why:'N = m(v²/R − g) ≥ 0 impose v² ≥ gR = 78,5 m²/s², donc v ≥ 8,86 m/s.'},
   {q:'b) Quelle hauteur de départ minimale <i>h</i> faut-il&nbsp;?',lab:'h =',unit:'m',ans:20,tol:.05,hint:'Conserve l’énergie mécanique entre le départ et le sommet de la boucle, situé à 2R au-dessus du bas.',why:'mgh = mg·2R + ½m·gR donne h = 2,5R = 20 m.'},
   {q:'c) Partant de <i>h</i> = 20 m, quelle est la vitesse au bas de la boucle&nbsp;? Arrondis au centième.',lab:'v =',unit:'m/s',ans:19.81,tol:.011,hint:'Toute l’énergie potentielle est devenue cinétique.',why:'v = √(2gh) = √(2 × 9,81 × 20) ≈ 19,81 m/s, environ 71 km/h.'},
   {q:'d) Quelle force le siège exerce-t-il sur un passager de 70 kg au bas de la boucle&nbsp;? Arrondis au newton.',lab:'N =',unit:'N',ans:4120,tol:1,hint:'Au bas, l’accélération <i>v</i>²/R pointe vers le haut, vers le centre : <i>N</i> − <i>mg</i> = <i>mv</i>²/R.',why:'v²/R = 392,4/8 = 49,05 m/s² = 5g, donc N = 70 × (9,81 + 49,05) ≈ 4120 N, six fois son poids.'},
  ],
  sol:'<p><b>Au sommet</b>, l’accélération est centripète, vers le bas : mg + N = mv²/R. La condition N ≥ 0 donne v² ≥ gR, soit v ≥ √(gR) ≈ 8,86 m/s.</p><p><b>Énergie</b> : sans frottement, E<sub>m</sub> se conserve. Entre le départ (vitesse nulle, hauteur h) et le sommet (hauteur 2R) : mgh = 2mgR + ½mv². Avec v² = gR : h = 2,5R = 20 m.</p><p><b>Au bas</b>, v² = 2gh = 392,4 m²/s², v ≈ 19,8 m/s. La réaction vaut N = m(g + v²/R) = m(g + 5g) = 6mg ≈ 4120 N.</p><p>Vérification : 6g, c’est beaucoup trop pour un public. Les vraies boucles ne sont pas circulaires : leur rayon est grand en bas et petit en haut (clothoïde), ce qui réduit l’accélération au bas.</p>'},
]},

/* ================= 8. GAZ PARFAIT ================= */
{subj:'phy', sem:'all', id:'phy-gaz', h:'Gaz parfait', p:'Des molécules qui s’agitent, une équation d’état et trois transformations simples.', steps:[
 {h:'Le modèle microscopique',p:`Un <b>gaz parfait</b> est fait de molécules ponctuelles, sans interaction entre elles sauf lors de chocs brefs, en agitation désordonnée. La <b>pression</b> vient des chocs des molécules sur les parois, la <b>température</b> mesure leur agitation. Ici <i>n</i> = 0,04 mol.`,
  params:[{id:'T',l:'Température T',min:100,max:600,step:50,v:300,u:' K'},{id:'V',l:'Volume V',min:1,max:4,step:.5,v:2,u:' L'}],
  draw:v=>{ const P=plane({x:[-.2,4.4],y:[-.2,2.2],grid:false,axes:false,w:300}); const W=v.V, s=Math.sqrt(v.T/300)*.25;
    P.rect(0,0,W,2,{fill:'var(--sci)',fo:.08,c:'var(--ink)',w:2.5}).rect(W,0,.12,2,{fill:'var(--muted)',fo:.8,c:null});
    for(let i=0;i<30;i++){ const x=.1+rnd(i)*(W-.2), y=.1+rnd(i+50)*1.8, a=rnd(i+100)*2*Math.PI, l=s*(.6+rnd(i+150)*.8);
      P.arrow(x,y,x+l*Math.cos(a),y+l*Math.sin(a),{c:'var(--accent)',w:1.2,hs:5,op:.7}); P.dot(x,y,{r:3,c:'var(--math)'}); }
    return P.svg(); },
  info:v=>`<i>p</i> = <i>nRT</i>/<i>V</i> = ${fmt(.04*R_GAZ*v.T/(v.V*1e-3)/1000,1)} kPa · énergie cinétique moyenne par molécule ${fmt(1.5*KB*v.T*1e21,2)}·10⁻²¹ J`,
  note:'Les flèches sont proportionnelles à la vitesse, qui varie comme √T. Doubler la température ne double pas la vitesse des molécules.'},
 {h:'Chauffer à volume constant',p:'Dans un récipient rigide, on fait passer un gaz parfait de 300 K à 600 K. Sa pression…',
  opts:['reste la même','est multipliée par √2','double','quadruple'],ans:2,
  why:'À n et V fixés, p = nRT/V est proportionnelle à T (en kelvins). Les molécules frappent plus souvent et plus fort.'},
 {h:'L’équation d’état',p:`Pour <i>n</i> moles de gaz parfait : <b><i>pV</i> = <i>nRT</i></b>, avec <i>R</i> = 8,314 J/(mol·K). En SI : <i>p</i> en Pa, <i>V</i> en m³, <i>T</i> en K (<i>T</i> = θ + 273,15).<br>Quel volume occupe 1 mol de gaz parfait à 0 °C et 101 325 Pa, en litres&nbsp;? Arrondis au dixième.`,
  lab:'V =',unit:'L',ans:22.41,tol:.06,why:'V = nRT/p = 8,314 × 273,15/101 325 = 0,0224 m³ = 22,4 L, quel que soit le gaz.',
  note:'Piège classique : oublier de convertir les °C en K, ou les litres en m³ (1 L = 10⁻³ m³).'},
 {h:'Température et agitation',p:`La théorie cinétique relie la température à l’énergie cinétique moyenne de translation d’une molécule : <b>⟨<i>E</i><sub>c</sub>⟩ = (3/2) <i>k</i><sub>B</sub> <i>T</i></b>, avec <i>k</i><sub>B</sub> = <i>R</i>/<i>N</i><sub>A</sub> = 1,381·10⁻²³ J/K. On en tire la vitesse quadratique moyenne <b><i>v</i><sub>q</sub> = √(3<i>RT</i>/<i>M</i>)</b>, <i>M</i> en kg/mol.<br>Calcule <i>v</i><sub>q</sub> pour le diazote N₂ (<i>M</i> = 0,028 kg/mol) à 300 K, arrondie au m/s.`,
  lab:'v_q ='.replace('_q','<sub>q</sub>'),unit:'m/s',ans:516.9,tol:1,why:'v<sub>q</sub> = √(3 × 8,314 × 300/0,028) = √267 236 ≈ 517 m/s, plus vite que le son.'},
 {h:'Trois transformations sur le diagramme p–V',p:`Partons de l’état A : <i>p</i> = 100 kPa, <i>V</i> = 2 L, <i>T</i> = 300 K. Une <b>isotherme</b> garde <i>T</i> (hyperbole <i>pV</i> = cste), une <b>isobare</b> garde <i>p</i> (segment horizontal), une <b>isochore</b> garde <i>V</i> (segment vertical). Le travail reçu par le gaz vaut <b><i>W</i> = −∫<i>p</i> d<i>V</i></b>.`,
  params:[{id:'ty',l:'Type (isoT, isoP, isoV)',min:0,max:2,v:0},{id:'k',l:'Facteur (V ou p)',min:.5,max:2,step:.1,v:1.5}],
  draw:v=>{ const P=plane({x:[-.4,4.6],y:[-20,230],w:300,h:240,grid:false,lx:1,ly:50});
    for(let x=1;x<=4;x++) P.seg(x,0,x,230,{c:'var(--line)',w:1}); for(let y=50;y<=200;y+=50) P.seg(0,y,4.6,y,{c:'var(--line)',w:1});
    P.fn(V=>200/V,{from:.8,to:4.6,c:'var(--muted)',w:1.5,dash:true});
    let VB=2,pB=100; if(v.ty===0){ VB=2*v.k; pB=200/VB; P.fn(V=>200/V,{from:Math.min(2,VB),to:Math.max(2,VB),c:'var(--accent)',w:3.5}); }
    else if(v.ty===1){ VB=2*v.k; P.seg(2,100,VB,100,{c:'var(--accent)',w:3.5}); } else { pB=100*v.k; P.seg(2,100,2,pB,{c:'var(--accent)',w:3.5}); }
    P.dot(2,100,{l:'A',c:'var(--ink)'}).dot(VB,pB,{l:'B'}); P.text(4.5,0,'V (L)',{a:'end',dy:-6,c:'var(--muted)',s:11}).text(0,225,'p (kPa)',{dx:6,dy:4,c:'var(--muted)',s:11}); return P.svg(); },
  info:v=>{ let VB=2,pB=100,W=0; if(v.ty===0){ VB=2*v.k; pB=200/VB; W=-200*Math.log(v.k); } else if(v.ty===1){ VB=2*v.k; W=-100*(VB-2); } else pB=100*v.k;
    const TB=300*pB*VB/200; return `<b>${['Isotherme','Isobare','Isochore'][v.ty]}</b> · B : <i>p</i> = ${fmt(pB,1)} kPa, <i>V</i> = ${fmt(VB,1)} L, <i>T</i> = ${fmt(TB,0)} K · <i>W</i> reçu = ${fmt(Math.abs(W)<1e-9?0:W,0)} J`; },
  note:'Isotherme : <i>W</i> = −<i>nRT</i> ln(<i>V</i><sub>B</sub>/<i>V</i><sub>A</sub>). Isobare : <i>W</i> = −<i>p</i>Δ<i>V</i>. Isochore : <i>W</i> = 0. Une détente (<i>V</i> augmente) donne <i>W</i> &lt; 0 : le gaz fournit du travail.'},
 {h:'Compression isotherme',p:'On comprime le gaz de l’état A (100 kPa, 2 L) à température constante. Règle le volume final pour que la pression atteigne 250 kPa.',
  params:[{id:'V',l:'Volume V',min:.5,max:4,step:.1,v:2,u:' L'}],
  draw:v=>{ const P=plane({x:[-.4,4.6],y:[-25,430],w:300,h:240,grid:false,lx:1,ly:100});
    P.fn(V=>200/V,{from:.47,to:4.6,c:'var(--line)',w:2}).seg(0,250,4.6,250,{c:'var(--spark)',w:1.5,dash:true}).dot(2,100,{l:'A',c:'var(--ink)'}).dot(v.V,200/v.V,{l:'B'}); return P.svg(); },
  info:v=>`<i>p</i> = 200 J / ${fmt(v.V,1)} L = ${fmt(200/v.V,1)} kPa`,
  ok:v=>Math.abs(v.V-.8)<1e-6, why:'Isotherme : p<sub>A</sub>V<sub>A</sub> = p<sub>B</sub>V<sub>B</sub>, donc V<sub>B</sub> = 100 × 2/250 = 0,8 L.'},
 {h:'Le pneu au soleil',p:'Un pneu contient de l’air à 20 °C sous une pression absolue de 2,20 bar. Au soleil, l’air monte à 50 °C, à volume constant. Quelle est la nouvelle pression, en bar&nbsp;? Arrondis au centième.',lab:'p =',unit:'bar',ans:2.425,tol:.011,
  why:'Isochore : p/T constant, avec T en kelvins. p = 2,20 × 323,15/293,15 ≈ 2,43 bar.'},
 {kind:'Défi',h:'Doubler le volume',p:'Un gaz parfait à 27 °C est chauffé à pression constante jusqu’à ce que son volume double. Quelle est sa température finale en degrés Celsius&nbsp;?',unit:'°C',ans:327,tol:.6,
  why:'Isobare : V/T constant. T passe de 300 K à 600 K, soit 600 − 273 = 327 °C. Doubler en °C (54 °C) serait faux.'},
 {kind:'Problème',h:'Le pneu sur l’autoroute',
  p:'Un pneu de 25 L est gonflé le matin, à 10 °C, à « 2,0 bar » au manomètre de la station-service. Ce manomètre affiche la pression <b>relative</b> : l’écart avec la pression atmosphérique, qui vaut 1,013 bar. Après une heure d’autoroute, l’air du pneu est à 45 °C. On suppose le volume du pneu constant et l’air parfait, de masse molaire 0,029 kg/mol.',
  parts:[
   {q:'a) Quelle est la pression absolue de l’air dans le pneu au départ&nbsp;?',lab:'p =',unit:'bar',ans:3.013,tol:.002,hint:'<i>p</i><sub>abs</sub> = <i>p</i><sub>rel</sub> + <i>p</i><sub>atm</sub>. C’est la pression absolue qui entre dans <i>pV</i> = <i>nRT</i>.',why:'p = 2,0 + 1,013 = 3,013 bar = 3,013·10⁵ Pa.'},
   {q:'b) Combien de moles d’air le pneu contient-il&nbsp;? Arrondis au dixième.',lab:'n =',unit:'mol',ans:3.2,tol:.06,hint:'<i>n</i> = <i>pV</i>/(<i>RT</i>), en unités SI : Pa, m³ et K.',why:'n = 3,013·10⁵ × 0,025/(8,314 × 283,15) ≈ 3,20 mol, soit 3,20 × 0,029 ≈ 93 g d’air.'},
   {q:'c) Quelle pression le manomètre affiche-t-il après le trajet&nbsp;? Arrondis au centième.',lab:'p =',unit:'bar',ans:2.372,tol:.011,hint:'À volume constant, la pression <b>absolue</b> est proportionnelle à <i>T</i> en kelvins. Repasse ensuite en pression relative.',why:'p<sub>abs</sub> = 3,013 × 318,15/283,15 ≈ 3,385 bar, donc le manomètre affiche 3,385 − 1,013 ≈ 2,37 bar.'},
   {q:'d) Un automobiliste mesure 2,37 bar à chaud, croit son pneu trop gonflé et le dégonfle jusqu’à 2,0 bar affichés. Que lira-t-il une fois le pneu revenu à 10 °C&nbsp;?',opts:['2,0 bar : on a réglé la pression','Environ 1,78 bar','Environ 1,67 bar : le pneu est nettement sous-gonflé','2,37 bar, comme avant le dégonflage'],ans:2,hint:'Refais le calcul à volume constant dans l’autre sens, avec 3,013 bar absolus à 45 °C. Attention : on ne multiplie pas la pression relative par le rapport des températures.',why:'p<sub>abs</sub> = 3,013 × 283,15/318,15 ≈ 2,68 bar, soit 1,67 bar au manomètre. 1,78 bar est le piège : 2,0 × 283/318 applique la loi à la pression relative.'},
  ],
  sol:'<p>La loi des gaz parfaits porte sur la pression <b>absolue</b> : au départ p = 2,0 + 1,013 = 3,013 bar.</p><p>La quantité d’air vaut n = pV/(RT) = 3,013·10⁵ × 0,025/(8,314 × 283,15) ≈ 3,20 mol, environ 93 g.</p><p>À n et V fixés, p/T est constant : p = 3,013 × 318,15/283,15 ≈ 3,385 bar absolus, soit 2,37 bar au manomètre. La pression relative a monté de 19 %, plus que la pression absolue (12 %).</p><p>Si on dégonfle à chaud jusqu’à 2,0 bar relatifs, on retrouve à froid 3,013 × 283,15/318,15 − 1,013 ≈ 1,67 bar. C’est pourquoi les constructeurs demandent de régler la pression à froid.</p>'},
 {kind:'Problème',h:'La bulle du plongeur',
  p:'Au fond d’un lac d’eau douce (1000 kg/m³), à 30 m de profondeur, un plongeur expire une bulle d’air de 1,0 cm³. L’eau y est à 6 °C. La bulle remonte jusqu’à la surface, où l’eau est à 20 °C et la pression atmosphérique vaut 101,3 kPa. On suppose qu’à chaque instant l’air de la bulle a la température et la pression de l’eau qui l’entoure, et qu’aucun air ne s’échappe ni ne se dissout.',
  parts:[
   {q:'a) Quelle est la pression au fond&nbsp;? En kPa, arrondie au dixième.',lab:'p =',unit:'kPa',ans:395.6,tol:.06,hint:'Loi de l’hydrostatique : <i>p</i> = <i>p</i>₀ + ρ<i>g h</i>.',why:'p = 101 300 + 1000 × 9,81 × 30 = 395 600 Pa = 395,6 kPa, près de 4 fois la pression en surface.'},
   {q:'b) Combien de moles d’air contient la bulle&nbsp;? Donne le résultat en 10⁻⁴ mol, arrondi au centième.',lab:'n =',unit:'× 10⁻⁴ mol',ans:1.7045,tol:.011,hint:'<i>n</i> = <i>pV</i>/(<i>RT</i>) avec <i>V</i> = 1,0·10⁻⁶ m³ et <i>T</i> = 279,15 K.',why:'n = 395 600 × 1,0·10⁻⁶/(8,314 × 279,15) ≈ 1,70·10⁻⁴ mol.'},
   {q:'c) Quel est le volume de la bulle en surface&nbsp;? Arrondis au centième.',lab:'V =',unit:'cm³',ans:4.101,tol:.011,hint:'Pour <i>n</i> fixé, <i>pV</i>/<i>T</i> est constant entre le fond et la surface.',why:'V₂ = V₁ × (p₁/p₂) × (T₂/T₁) = 1,0 × (395,6/101,3) × (293,15/279,15) ≈ 3,905 × 1,050 ≈ 4,10 cm³.'},
   {q:'d) Quelle part de cette augmentation de volume vient du réchauffement de l’eau&nbsp;?',opts:['La plus grande part : 14 °C d’écart, c’est beaucoup','Aucune : la température ne compte pas quand la pression varie','Exactement la moitié','Une petite part : la température absolue n’augmente que de 5 %, alors que la pression est divisée par 3,9'],ans:3,hint:'Compare les deux facteurs du calcul précédent.',why:'Le facteur thermique vaut 293,15/279,15 ≈ 1,05, le facteur de pression 3,9. Ce qui compte, c’est le rapport des températures en kelvins, pas l’écart en °C.'},
   {q:'e) Par combien le rayon de la bulle est-il multiplié pendant la remontée&nbsp;? Arrondis au centième.',lab:'×',ans:1.6007,tol:.011,hint:'Le volume d’une sphère est proportionnel au cube de son rayon.',why:'r₂/r₁ = ∛(4,10) ≈ 1,60.'},
  ],
  sol:'<p>Au fond, p₁ = p₀ + ρgh = 101,3 + 294,3 = 395,6 kPa et T₁ = 279,15 K. La bulle contient n = p₁V₁/(RT₁) ≈ 1,70·10⁻⁴ mol, et cette quantité ne change pas.</p><p>En surface, p₂ = 101,3 kPa et T₂ = 293,15 K. Comme pV/T = nR est constant : V₂ = V₁ (p₁/p₂)(T₂/T₁) ≈ 1,0 × 3,905 × 1,050 ≈ 4,10 cm³.</p><p>La pression explique presque tout (×3,9), la température très peu (×1,05). Le rayon, proportionnel à la racine cubique du volume, est multiplié par 1,60.</p><p>Conséquence pratique : un plongeur qui remonte de 30 m en bloquant sa respiration verrait l’air de ses poumons chercher à occuper près de 4 fois plus de volume. C’est pourquoi on remonte en expirant.</p>'},
]},

/* ================= 9. THERMODYNAMIQUE ================= */
{subj:'phy', sem:'all', id:'phy-thermo', h:'États de la matière et thermodynamique', p:'Compressibilité, dilatation, premier principe et transferts de chaleur.', steps:[
 {h:'Solides, liquides, gaz',p:`Dans un solide les particules vibrent autour de positions fixes, dans un liquide elles sont serrées mais glissent, dans un gaz elles sont loin les unes des autres. La <b>compressibilité</b> <b>χ = −(1/<i>V</i>)(d<i>V</i>/d<i>p</i>)</b> le mesure : pour l’eau χ ≈ 4,6·10⁻¹⁰ Pa⁻¹, pour un gaz parfait isotherme χ = 1/<i>p</i> ≈ 10⁻⁵ Pa⁻¹.`,
  opts:['Le volume d’eau diminue de moitié environ','Le volume d’eau diminue d’environ 0,5 %','Le volume d’eau ne change pas du tout','Le volume d’eau augmente légèrement'],ans:1,
  fig:'<p>On augmente de 100 bar (10⁷ Pa) la pression sur 1 L d’eau. Que se passe-t-il&nbsp;?</p>',
  why:'ΔV/V ≈ −χΔp = −4,6·10⁻¹⁰ × 10⁷ = −0,46 %. Un liquide est presque incompressible ; un gaz, lui, verrait son volume divisé par 101 en isotherme.'},
 {h:'La dilatation thermique',p:`Chauffé de Δ<i>T</i>, un solide s’allonge : <b>Δ<i>L</i> = α <i>L</i>₀ Δ<i>T</i></b>, où α est le coefficient de dilatation linéaire (K⁻¹). Le volume suit <b>Δ<i>V</i> = β <i>V</i>₀ Δ<i>T</i></b> avec β ≈ 3α pour un solide. Ici une barre de 50 m.`,
  params:[{id:'mat',l:'Matériau (acier, cuivre, alu)',min:0,max:2,v:0},{id:'dT',l:'Échauffement ΔT',min:0,max:100,step:10,v:40,u:' K'}],
  draw:v=>{ const al=[12e-6,17e-6,23e-6][v.mat], dL=al*50*v.dT*1000, P=plane({x:[-.5,12.5],y:[-1.2,1.6],grid:false,axes:false,w:300});
    P.rect(0,0,6,.8,{c:'var(--muted)',w:1.5,dash:true}).rect(0,0,6+dL/20,.8,{fill:['var(--muted)','var(--spark)','var(--sci)'][v.mat],fo:.5,c:'var(--ink)',w:2});
    P.rect(-.5,-.4,.5,1.6,{fill:'var(--ink)',fo:.6,c:null}).text(6,0,'L₀',{a:'middle',dy:16,c:'var(--muted)',s:12});
    if(dL>0) P.text(6+dL/40,.8,'+'+fmt(dL,0)+' mm',{a:'middle',dy:-6,s:12}); return P.svg(); },
  info:v=>{ const al=[12e-6,17e-6,23e-6][v.mat]; return `α = ${fmt(al*1e6,0)}·10⁻⁶ K⁻¹ · Δ<i>L</i> = ${fmt(al*1e6,0)}·10⁻⁶ × 50 × ${v.dT} = <b>${fmt(al*50*v.dT*1000,1)} mm</b> (allongement exagéré sur le dessin)`; },
  note:'C’est pourquoi les ponts ont des joints de dilatation. L’eau est une exception : entre 0 et 4 °C, elle se contracte quand on la chauffe.'},
 {h:'Le rail',p:'Un rail d’acier (α = 12·10⁻⁶ K⁻¹) mesure 25 m. De combien s’allonge-t-il, en mm, quand sa température monte de 40 K&nbsp;?',lab:'ΔL =',unit:'mm',ans:12,tol:.01,
  why:'ΔL = 12·10⁻⁶ × 25 × 40 = 0,012 m = 12 mm.'},
 {h:'Le premier principe',p:`L’énergie interne <i>U</i> d’un système (énergie des mouvements et des interactions microscopiques) ne varie que par échanges : <b>Δ<i>U</i> = <i>Q</i> + <i>W</i></b>. <i>Q</i> est la chaleur <b>reçue</b>, <i>W</i> le travail <b>reçu</b>. Pour un gaz parfait, <i>U</i> ne dépend que de <i>T</i>.<br>Un gaz reçoit 500 J de chaleur et fournit 200 J de travail en se détendant. Que vaut Δ<i>U</i>&nbsp;?`,
  opts:['700 J','−300 J','300 J','200 J'],ans:2,
  why:'Le gaz fournit 200 J de travail, donc il en reçoit W = −200 J. ΔU = 500 − 200 = 300 J.',
  note:'Signe : tout ce que le système reçoit compte en positif. Certains livres d’ingénierie utilisent ΔU = Q − W avec W fourni : c’est la même physique.'},
 {h:'La chaleur spécifique',p:`Pour chauffer une masse <i>m</i> de Δ<i>T</i> sans changement d’état, il faut <b><i>Q</i> = <i>m c</i> Δ<i>T</i></b>. La <b>chaleur spécifique</b> <i>c</i> est en J/(kg·K) : 4186 pour l’eau liquide, environ 900 pour l’aluminium, 450 pour le fer.<br>Quelle énergie faut-il pour chauffer 1,5 kg d’eau de 20 °C à 100 °C, en kJ&nbsp;? Arrondis au kJ.`,
  lab:'Q =',unit:'kJ',ans:502.3,tol:.6,why:'Q = 1,5 × 4186 × 80 = 502 320 J ≈ 502 kJ. Une bouilloire de 2 kW met donc environ 4 minutes.'},
 {h:'Le mélange',p:'On verse 1 kg d’eau à 80 °C dans de l’eau à 20 °C (récipient isolé, sans pertes). Règle la masse d’eau froide pour que le mélange soit à 40 °C.',
  params:[{id:'m2',l:'Eau froide m₂',min:.5,max:4,step:.5,v:1,u:' kg'}],
  draw:v=>{ const Tf=(80+v.m2*20)/(1+v.m2), P=plane({x:[-1,5],y:[-12,108],w:220,h:260,grid:false,axes:false});
    P.rect(1.6,0,.8,100,{c:'var(--ink)',w:2}).rect(1.6,0,.8,Tf,{fill:'var(--bad)',fo:.6,c:null}).rect(1.3,-10,1.4,10,{fill:'var(--bad)',fo:.6,c:'var(--ink)',w:2});
    [20,40,60,80,100].forEach(T=>P.seg(2.4,T,2.8,T,{c:'var(--muted)',w:1.5}).text(2.9,T,T+' °C',{dy:4,s:11,c:'var(--muted)'}));
    P.seg(1.2,40,2.8,40,{c:'var(--spark)',w:2,dash:true}); return P.svg(); },
  info:v=>`<i>T</i><sub>f</sub> = (1 × 80 + ${fmt(v.m2,1)} × 20)/(1 + ${fmt(v.m2,1)}) = ${fmt((80+v.m2*20)/(1+v.m2),1)} °C`,
  ok:v=>v.m2===2, why:'Chaleur cédée = chaleur reçue : 1 × c × (80 − 40) = m₂ × c × (40 − 20), donc m₂ = 40/20 = 2 kg. La chaleur spécifique se simplifie.'},
 {h:'Les transferts thermiques',p:`<b>Conduction</b> : transfert de proche en proche dans la matière, sans déplacement global. À travers une paroi : <b>Φ = λ <i>S</i> Δ<i>T</i>/<i>e</i></b> (W), λ la conductivité en W/(m·K). <b>Convection</b> : le fluide lui-même se déplace et emporte la chaleur. <b>Rayonnement</b> : ondes électromagnétiques, même dans le vide, <b><i>P</i> = ε σ <i>S T</i>⁴</b> avec σ = 5,67·10⁻⁸ W/(m²·K⁴).`,
  opts:['×2','×4','×8','×16'],ans:3,fig:'<p>La température absolue d’un corps passe de 300 K à 600 K. Par combien est multipliée la puissance qu’il rayonne&nbsp;?</p>',
  why:'P ∝ T⁴ et 2⁴ = 16. C’est pourquoi le rayonnement domine aux hautes températures.',
  note:'Le Soleil chauffe la Terre par rayonnement, le radiateur chauffe la pièce surtout par convection, la poignée de la casserole chauffe par conduction.'},
 {kind:'Défi',h:'La vitre',p:'Une vitre simple de 1,5 m² et de 4,0 mm d’épaisseur (λ = 1,0 W/(m·K)) sépare deux faces à 20 K d’écart. Quel flux thermique la traverse par conduction&nbsp;?',lab:'Φ =',unit:'W',ans:7500,tol:1,
  why:'Φ = λSΔT/e = 1,0 × 1,5 × 20/0,004 = 7500 W. En réalité, les couches d’air collées au verre réduisent fortement ce flux, d’où l’intérêt du double vitrage.'},
 {kind:'Problème',h:'Le chauffe-eau',
  p:'Un chauffe-eau électrique contient 150 L d’eau, soit 150 kg. Sa résistance de 2,4 kW la chauffe de 15 °C à 60 °C. Ensuite, un thermostat maintient l’eau à 60 °C. La cuve est entourée d’une mousse isolante de 5,0 cm d’épaisseur (λ = 0,040 W/(m·K)), sur une surface de 2,5 m². La pièce est à 20 °C.',
  parts:[
   {q:'a) Quelle énergie faut-il pour chauffer l’eau&nbsp;? En MJ, arrondie au centième.',lab:'Q =',unit:'MJ',ans:28.2555,tol:.011,hint:'<i>Q</i> = <i>m c</i> Δ<i>T</i>, avec <i>c</i> = 4186 J/(kg·K).',why:'Q = 150 × 4186 × 45 = 28 255 500 J ≈ 28,26 MJ.'},
   {q:'b) Combien de temps dure la chauffe&nbsp;? En heures, arrondi au centième.',lab:'Δt =',unit:'h',ans:3.2703,tol:.011,hint:'<i>P</i> = <i>Q</i>/Δ<i>t</i>, si toute l’énergie électrique chauffe l’eau. Puis convertis les secondes en heures.',why:'Δt = 28 255 500/2400 ≈ 11 773 s ≈ 3,27 h, environ 3 h 16 min.'},
   {q:'c) Combien de kilowattheures cette chauffe consomme-t-elle&nbsp;? Arrondis au centième.',lab:'E =',unit:'kWh',ans:7.84875,tol:.011,hint:'1 kWh = 3,6·10⁶ J. Ou bien : puissance en kW × durée en heures.',why:'2,4 kW × 3,27 h ≈ 7,85 kWh.'},
   {q:'d) Une fois l’eau à 60 °C, quelle puissance thermique s’échappe à travers l’isolant&nbsp;?',lab:'Φ =',unit:'W',ans:80,tol:.1,hint:'Φ = λ<i>S</i>Δ<i>T</i>/<i>e</i>, avec Δ<i>T</i> l’écart entre l’eau et la pièce.',why:'Φ = 0,040 × 2,5 × 40/0,050 = 80 W.'},
   {q:'e) Quelle énergie le thermostat doit-il fournir chaque jour pour compenser ces pertes&nbsp;? En kWh, arrondie au centième.',lab:'E =',unit:'kWh',ans:1.92,tol:.011,hint:'80 W pendant 24 h.',why:'80 W × 24 h = 1920 Wh = 1,92 kWh par jour, le quart de l’énergie d’une chauffe complète.'},
  ],
  sol:'<p>Chauffer 150 kg d’eau de 45 K demande Q = mcΔT = 150 × 4186 × 45 ≈ 28,3 MJ.</p><p>Avec 2,4 kW, la chauffe dure Δt = Q/P ≈ 11 800 s ≈ 3,3 h, et consomme Q/(3,6·10⁶) ≈ 7,85 kWh.</p><p>À 60 °C, l’eau perd par conduction à travers l’isolant Φ = λSΔT/e = 0,040 × 2,5 × 40/0,050 = 80 W. En un jour : 80 × 24 = 1920 Wh ≈ 1,92 kWh, que le thermostat doit compenser.</p><p>Vérification : sans isolant, il ne resterait que la tôle et l’air ; avec une mousse deux fois plus épaisse, les pertes seraient divisées par deux (40 W). Baisser la consigne à 55 °C réduirait aussi ΔT, donc les pertes, de 12,5 %.</p>'},
 {kind:'Problème',h:'Les disques de frein',
  p:'Une voiture de 1400 kg roulant à 30 m/s (108 km/h) freine jusqu’à l’arrêt. On admet que 90 % de son énergie cinétique chauffe ses quatre disques de frein en acier, de 8,0 kg chacun. Pour l’acier, <i>c</i> = 450 J/(kg·K) et α = 12·10⁻⁶ K⁻¹. Le freinage est assez bref pour négliger les pertes de chaleur vers l’air pendant ce temps.',
  parts:[
   {q:'a) Quelle énergie cinétique la voiture possède-t-elle avant de freiner&nbsp;? En kJ.',lab:'Eₖ =',unit:'kJ',ans:630,tol:.5,hint:'<i>E</i><sub>c</sub> = ½<i>mv</i>².',why:'E<sub>c</sub> = ½ × 1400 × 30² = 630 000 J = 630 kJ.'},
   {q:'b) De combien la température des disques monte-t-elle&nbsp;? Arrondis au dixième.',lab:'ΔT =',unit:'K',ans:39.375,tol:.06,hint:'L’énergie reçue, 0,90 <i>E</i><sub>c</sub>, se répartit sur la masse totale des quatre disques : <i>Q</i> = <i>m c</i> Δ<i>T</i>.',why:'Q = 0,90 × 630 000 = 567 000 J sur 32 kg : ΔT = 567 000/(32 × 450) ≈ 39,4 K.'},
   {q:'c) Si la voiture freinait depuis 60 m/s au lieu de 30 m/s, l’échauffement des disques serait…',opts:['le même','deux fois plus grand','quatre fois plus grand','huit fois plus grand'],ans:2,hint:'Comment <i>E</i><sub>c</sub> dépend-elle de <i>v</i>&nbsp;?',why:'E<sub>c</sub> ∝ v² : ×4, soit environ 158 K. Sur circuit, les disques rougissent.'},
   {q:'d) De combien le diamètre d’un disque de 30 cm augmente-t-il&nbsp;? En mm, arrondi au centième.',lab:'ΔD =',unit:'mm',ans:.14175,tol:.006,hint:'Δ<i>L</i> = α<i>L</i>₀Δ<i>T</i> s’applique à toute longueur du disque, donc à son diamètre.',why:'ΔD = 12·10⁻⁶ × 0,30 × 39,4 ≈ 1,4·10⁻⁴ m ≈ 0,14 mm.'},
   {q:'e) En descendant un col, la voiture enchaîne des freinages identiques sans que les disques aient le temps de refroidir. Au bout de combien de freinages leur échauffement dépasse-t-il 300 K&nbsp;?',lab:'n =',ans:8,tol:.01,hint:'Chaque freinage ajoute le même Δ<i>T</i>. Cherche le plus petit entier <i>n</i> tel que <i>n</i>Δ<i>T</i> &gt; 300 K.',why:'300/39,4 ≈ 7,6 : 7 freinages donnent 276 K, le 8e fait passer à 315 K. D’où le conseil d’utiliser le frein moteur en descente.'},
  ],
  sol:'<p>Premier principe pour les disques : ils ne reçoivent pas de travail (leur volume change à peine) mais la chaleur Q dégagée par le frottement des plaquettes, donc ΔU = Q = mcΔT.</p><p>L’énergie cinétique vaut ½ × 1400 × 900 = 630 kJ, dont 90 % chauffent les disques : 567 kJ sur 32 kg d’acier. ΔT = 567 000/(32 × 450) ≈ 39,4 K.</p><p>L’échauffement suit E<sub>c</sub> ∝ v² : depuis 60 m/s, il serait quatre fois plus grand, près de 160 K.</p><p>La dilatation du diamètre reste minuscule : ΔD = αDΔT ≈ 0,14 mm. En revanche, des freinages répétés sans refroidissement s’additionnent : 8 freinages dépassent 300 K. Les garnitures perdent alors leur efficacité.</p>'},
]},

/* ================= 10. CHANGEMENTS D'ÉTAT ================= */
{subj:'phy', sem:'all', id:'phy-changements', h:'Changements d’état', p:'Chaleur latente, paliers de température, pression de vapeur saturante et ébullition en altitude.', steps:[
 {h:'La chaleur latente',p:`Pour faire changer d’état une masse <i>m</i> à température constante, il faut <b><i>Q</i> = <i>m L</i></b>. <i>L</i> est la <b>chaleur latente</b> (J/kg) : fusion de la glace <i>L</i><sub>f</sub> = 334 kJ/kg, vaporisation de l’eau à 100 °C <i>L</i><sub>v</sub> = 2257 kJ/kg. L’énergie sert à rompre des liaisons, pas à augmenter l’agitation.<br>Quelle énergie faut-il pour fondre 200 g de glace à 0 °C, en kJ&nbsp;?`,
  lab:'Q =',unit:'kJ',ans:66.8,tol:.05,why:'Q = m L<sub>f</sub> = 0,200 × 334 = 66,8 kJ.'},
 {h:'Les paliers de température',p:`On chauffe 1 kg de glace à −20 °C sous 1 atm. Tant qu’il n’y a qu’une phase, <i>T</i> monte (<i>Q</i> = <i>mc</i>Δ<i>T</i>). Pendant un changement d’état, <i>T</i> reste <b>constante</b> : c’est un <b>palier</b>. Capacités : glace 2100, eau 4186, vapeur 2010 J/(kg·K).`,
  params:[{id:'Q',l:'Énergie reçue Q',min:0,max:3100,step:100,v:200,u:' kJ'}],
  draw:v=>{ const q1=42, q2=376, q3=794.6, q4=3051.6, T=Q=>Q<q1?-20+Q/2.1:Q<q2?0:Q<q3?(Q-q2)/4.186:Q<q4?100:100+(Q-q4)/2.01;
    const P=plane({x:[-250,3300],y:[-45,145],w:300,h:220,grid:false,lx:500,ly:20});
    [-20,20,40,60,80,100,120].forEach(y=>P.seg(0,y,3300,y,{c:'var(--line)',w:1}));
    P.fn(T,{from:0,to:3100,c:'var(--muted)',w:2,n:600}).fn(T,{from:0,to:Math.max(v.Q,1),c:'var(--bad)',w:3.5,n:600}).dot(v.Q,T(v.Q));
    P.text(3250,0,'Q (kJ)',{a:'end',dy:-6,c:'var(--muted)',s:11}).text(0,140,'T (°C)',{dx:6,dy:4,c:'var(--muted)',s:11}); return P.svg(); },
  info:v=>{ const Q=v.Q; let s,T;
    if(Q<42){ T=-20+Q/2.1; s='glace qui se réchauffe'; } else if(Q<376){ T=0; s=`fusion : ${fmt((Q-42)/334*100,0)} % de la glace a fondu`; }
    else if(Q<794.6){ T=(Q-376)/4.186; s='eau liquide qui se réchauffe'; } else if(Q<3051.6){ T=100; s=`ébullition : ${fmt((Q-794.6)/2257*100,0)} % de l’eau est vaporisée`; }
    else { T=100+(Q-3051.6)/2.01; s='vapeur qui se réchauffe'; }
    return `<i>T</i> = ${fmt(T,1)} °C · ${s}`; },
  note:'Le palier d’ébullition est de loin le plus long : vaporiser l’eau demande plus de 5 fois l’énergie qu’il faut pour la chauffer de 0 à 100 °C.'},
 {h:'Pendant l’ébullition',p:'De l’eau bout dans une casserole ouverte. On double la puissance de la plaque. Que fait la température de l’eau&nbsp;?',
  opts:['Elle monte au-dessus de 100 °C','Elle double','Elle baisse un peu','Elle reste à la température d’ébullition'],ans:3,
  why:'Sur un palier, l’énergie supplémentaire vaporise l’eau plus vite mais ne la chauffe pas. Baisser le feu une fois l’ébullition atteinte économise de l’énergie sans ralentir la cuisson.'},
 {h:'De l’eau tiède à la vapeur',p:'Quelle énergie faut-il pour transformer 500 g d’eau à 20 °C en vapeur à 100 °C, en kJ&nbsp;? Arrondis au kJ.',lab:'Q =',unit:'kJ',ans:1295.9,tol:.6,
  why:'Chauffer : 0,5 × 4186 × 80 = 167,4 kJ. Vaporiser : 0,5 × 2257 = 1128,5 kJ. Total ≈ 1296 kJ.'},
 {h:'Pression de vapeur saturante et altitude',p:`Au-dessus d’un liquide, sa vapeur est en équilibre à la <b>pression de vapeur saturante</b> <i>p</i><sub>sat</sub>(<i>T</i>), qui croît très vite avec <i>T</i>. Le liquide <b>bout</b> quand <b><i>p</i><sub>sat</sub>(<i>T</i>) = <i>p</i><sub>ext</sub></b>. En altitude la pression baisse (ici <i>p</i> ≈ 101,3 kPa · e<sup>−<i>z</i>/8400 m</sup>), donc l’eau bout plus tôt.`,
  params:[{id:'z',l:'Altitude z',min:0,max:8000,step:500,v:1000,u:' m'}],
  draw:v=>{ const pe=101.325*Math.exp(-v.z/8400), Te=teb(pe), P=plane({x:[-10,125],y:[-18,215],w:300,h:240,grid:false,lx:20,ly:50});
    for(let x=20;x<=120;x+=20) P.seg(x,0,x,215,{c:'var(--line)',w:1}); for(let y=50;y<=200;y+=50) P.seg(0,y,125,y,{c:'var(--line)',w:1});
    P.fn(psat,{from:0,to:121,c:'var(--accent)',w:3}).seg(0,pe,Te,pe,{c:'var(--bad)',w:2,dash:true}).seg(Te,pe,Te,0,{c:'var(--bad)',w:2,dash:true}).dot(Te,pe);
    P.text(122,0,'T (°C)',{a:'end',dy:-6,c:'var(--muted)',s:11}).text(0,210,'p (kPa)',{dx:6,dy:4,c:'var(--muted)',s:11}).text(Te,pe,'p ext',{dx:-46,dy:-8,c:'var(--bad)',s:11}); return P.svg(); },
  info:v=>{ const pe=101.325*Math.exp(-v.z/8400); return `<i>p</i><sub>ext</sub> = ${fmt(pe,1)} kPa · l’eau bout à <b>${fmt(teb(pe),1)} °C</b>`; },
  note:'Au sommet du Mont Blanc (4808 m), l’eau bout vers 85 °C : les pâtes cuisent moins bien. À l’inverse, l’<b>évaporation</b> se produit à toute température tant que l’air n’est pas saturé de vapeur.'},
 {h:'L’autocuiseur',p:'Dans un autocuiseur, une soupape maintient la pression au-dessus de 1 atm. Règle la pression intérieure pour que l’eau bouille à 120 °C (à 1 °C près).',
  params:[{id:'p',l:'Pression intérieure',min:60,max:250,step:10,v:100,u:' kPa'}],
  draw:v=>{ const Te=teb(v.p), P=plane({x:[-10,135],y:[-20,270],w:300,h:230,grid:false,lx:20,ly:50});
    P.fn(psat,{from:0,to:130,c:'var(--accent)',w:3}).seg(120,0,120,270,{c:'var(--spark)',w:1.5,dash:true}).seg(0,v.p,Te,v.p,{c:'var(--bad)',w:2,dash:true}).dot(Te,v.p);
    P.text(132,0,'T (°C)',{a:'end',dy:-6,c:'var(--muted)',s:11}).text(0,262,'p (kPa)',{dx:6,dy:6,c:'var(--muted)',s:11}); return P.svg(); },
  info:v=>`Ébullition à ${fmt(teb(v.p),1)} °C`,
  ok:v=>Math.abs(teb(v.p)-120)<1, why:'Il faut p<sub>ext</sub> = p<sub>sat</sub>(120 °C) ≈ 199 kPa, soit environ 2 bar. Les aliments cuisent alors bien plus vite.'},
 {h:'Lire la courbe',p:'À 1000 m d’altitude, la pression extérieure vaut environ 90 kPa. Pourquoi l’eau y bout-elle en dessous de 100 °C&nbsp;?',
  opts:['Parce que l’air est plus froid en altitude','Parce que la pression de vapeur saturante atteint 90 kPa à une température plus basse','Parce que l’eau contient moins de sels minéraux','Parce que la gravité est plus faible'],ans:1,
  why:'L’ébullition a lieu quand p<sub>sat</sub>(T) = p<sub>ext</sub>. Comme p<sub>sat</sub> croît avec T, une p<sub>ext</sub> plus faible est atteinte plus tôt : environ 97 °C à 1000 m.'},
 {kind:'Défi',h:'Le glaçon dans le verre',p:'On met 50 g de glace à 0 °C dans 300 g d’eau à 25 °C (verre isolé, sans pertes). Toute la glace fond. Quelle est la température finale&nbsp;? Arrondis au dixième.',unit:'°C',ans:10.03,tol:.06,
  why:'Chaleur cédée par l’eau = chaleur pour fondre puis réchauffer : 0,3 × 4186 × (25 − T) = 0,05 × 334 000 + 0,05 × 4186 × T. D’où 31 395 − 1255,8 T = 16 700 + 209,3 T, et T = 14 695/1465,1 ≈ 10,0 °C.'},
 {kind:'Problème',h:'Trop de glaçons',
  p:'On jette 200 g de glaçons à −10 °C dans 300 g d’eau à 30 °C, dans un récipient isolé et sans pertes. Données : <i>c</i><sub>glace</sub> = 2100 J/(kg·K), <i>c</i><sub>eau</sub> = 4186 J/(kg·K), <i>L</i><sub>f</sub> = 334 kJ/kg. On cherche l’état final : la température et la masse de glace qui reste. Attention, rien ne dit que toute la glace fond.',
  parts:[
   {q:'a) Quelle énergie faut-il pour amener toute la glace de −10 °C à 0 °C&nbsp;? En kJ.',lab:'Q₁ =',unit:'kJ',ans:4.2,tol:.01,hint:'Pas encore de fusion : <i>Q</i> = <i>m c</i><sub>glace</sub> Δ<i>T</i>.',why:'Q₁ = 0,200 × 2100 × 10 = 4200 J = 4,2 kJ.'},
   {q:'b) Quelle énergie l’eau peut-elle céder au plus en refroidissant jusqu’à 0 °C&nbsp;? En kJ, arrondie au dixième.',lab:'Q₂ =',unit:'kJ',ans:37.674,tol:.06,hint:'L’eau liquide ne peut pas descendre sous 0 °C tant qu’il reste de la glace.',why:'Q₂ = 0,300 × 4186 × 30 = 37 674 J ≈ 37,7 kJ.'},
   {q:'c) Toute la glace peut-elle fondre&nbsp;?',opts:['Oui, car il y a plus d’eau que de glace','Oui, il y a largement assez d’énergie','Non : fondre toute la glace demande 66,8 kJ, il ne reste que 37,7 − 4,2 = 33,5 kJ','On ne peut pas savoir sans connaître la température finale'],ans:2,hint:'Calcule l’énergie de fusion de toute la glace et compare-la à ce qui reste une fois la glace à 0 °C.',why:'m L<sub>f</sub> = 0,200 × 334 = 66,8 kJ &gt; 33,5 kJ. La fusion s’arrête en route : le mélange reste sur le palier de fusion.'},
   {q:'d) Quelle est la température finale du mélange&nbsp;?',lab:'T =',unit:'°C',ans:0,tol:.01,hint:'Glace et eau liquide coexistent à l’équilibre sous 1 atm. À quelle température&nbsp;?',why:'Tant que glace et eau coexistent, la température est celle du palier de fusion : 0 °C.'},
   {q:'e) Quelle masse de glace reste-t-il à la fin&nbsp;? Arrondis au gramme.',lab:'m =',unit:'g',ans:99.78,tol:.6,hint:'L’énergie disponible, 33,5 kJ, fond une masse <i>m</i> = <i>Q</i>/<i>L</i><sub>f</sub>.',why:'33 474/334 000 ≈ 0,100 kg fondent. Il reste 200 − 100,2 ≈ 100 g de glace, dans 400 g d’eau, à 0 °C.'},
  ],
  sol:'<p>On fait le bilan en supposant d’abord que tout finit à 0 °C. L’eau peut céder 0,300 × 4186 × 30 = 37,7 kJ. La glace demande 4,2 kJ pour atteindre 0 °C, puis 66,8 kJ pour fondre entièrement.</p><p>Il ne reste que 37,7 − 4,2 = 33,5 kJ pour la fusion, moins que 66,8 kJ : toute la glace ne peut pas fondre. Le système s’arrête sur le palier, à 0 °C, avec de la glace et de l’eau.</p><p>La masse fondue vaut 33 474/334 000 ≈ 100 g. État final : environ 100 g de glace et 400 g d’eau à 0 °C.</p><p>Vérification : si on avait écrit le bilan habituel avec une température finale T inconnue, on aurait trouvé T &lt; 0 °C pour de l’eau liquide, ce qui est impossible. Ce signe négatif est l’alerte qu’il faut reprendre le raisonnement par paliers.</p>'},
 {kind:'Problème',h:'L’autocuiseur en montagne',
  p:'Dans un chalet à 2000 m d’altitude, on cuit des légumes. La pression extérieure suit <i>p</i> ≈ 101,3 kPa · e<sup>−<i>z</i>/8400 m</sup>. Une table de pression de vapeur saturante de l’eau donne : 70,0 kPa à 90 °C, 84,5 kPa à 95 °C, 101,3 kPa à 100 °C, 143,5 kPa à 110 °C, 169,5 kPa à 115 °C et 199,3 kPa à 120 °C. La soupape de l’autocuiseur est un petit poids posé sur un trou de 3,0 mm de diamètre : elle ne se soulève que si la pression intérieure dépasse la pression extérieure de Δ<i>p</i> = <i>mg</i>/<i>S</i>.',
  parts:[
   {q:'a) Quelle est la pression extérieure au chalet&nbsp;? En kPa, arrondie au dixième.',lab:'p =',unit:'kPa',ans:79.84,tol:.06,hint:'Calcule e<sup>−2000/8400</sup>.',why:'p = 101,3 × e<sup>−0,238</sup> = 101,3 × 0,788 ≈ 79,8 kPa.'},
   {q:'b) À quelle température l’eau bout-elle dans une casserole ouverte&nbsp;? Arrondis au degré.',lab:'T =',unit:'°C',ans:93.4,tol:.7,hint:'Cherche <i>T</i> telle que <i>p</i><sub>sat</sub>(<i>T</i>) = <i>p</i><sub>ext</sub>, en interpolant linéairement entre deux lignes de la table.',why:'79,8 kPa est entre 70,0 kPa (90 °C) et 84,5 kPa (95 °C) : T ≈ 90 + 5 × 9,8/14,5 ≈ 93 °C.'},
   {q:'c) On veut que l’eau bouille à 115 °C dans l’autocuiseur. Quelle surpression Δ<i>p</i> la soupape doit-elle maintenir&nbsp;? En kPa, arrondie au dixième.',lab:'Δp =',unit:'kPa',ans:89.66,tol:.15,hint:'À l’intérieur, il faut <i>p</i> = <i>p</i><sub>sat</sub>(115 °C). La soupape ajoute Δ<i>p</i> à la pression extérieure.',why:'Δp = 169,5 − 79,8 ≈ 89,7 kPa.'},
   {q:'d) Quelle doit être la masse du poids de la soupape&nbsp;? En g, arrondie au gramme.',lab:'m =',unit:'g',ans:64.63,tol:1,hint:'<i>S</i> = π(<i>d</i>/2)², puis <i>m</i> = Δ<i>p</i>·<i>S</i>/<i>g</i>. Attention aux unités : Pa et m².',why:'S = π × (1,5·10⁻³)² ≈ 7,07·10⁻⁶ m², donc m = 89 700 × 7,07·10⁻⁶/9,81 ≈ 0,065 kg, soit environ 65 g.'},
   {q:'e) De retour au bord de la mer (<i>p</i><sub>ext</sub> = 101,3 kPa), on utilise le même autocuiseur. À quelle température l’eau y bout-elle&nbsp;? Arrondis au degré.',lab:'T =',unit:'°C',ans:118.6,tol:.7,hint:'La soupape impose toujours le même Δ<i>p</i>, mais la pression extérieure a changé.',why:'p = 101,3 + 89,7 = 191,0 kPa, entre 169,5 kPa (115 °C) et 199,3 kPa (120 °C) : T ≈ 115 + 5 × 21,5/29,8 ≈ 119 °C.'},
  ],
  sol:'<p>À 2000 m, p<sub>ext</sub> = 101,3 × e<sup>−2000/8400</sup> ≈ 79,8 kPa. L’eau bout quand p<sub>sat</sub>(T) = p<sub>ext</sub> : par interpolation dans la table, T ≈ 93 °C. Les légumes cuisent nettement plus lentement.</p><p>Pour bouillir à 115 °C, il faut p<sub>int</sub> = 169,5 kPa, donc une surpression Δp = 169,5 − 79,8 ≈ 89,7 kPa.</p><p>La soupape est en équilibre quand le poids mg compense la force de surpression Δp·S, avec S = π × (1,5 mm)² ≈ 7,07·10⁻⁶ m² : m = Δp·S/g ≈ 65 g.</p><p>La soupape fixe un écart de pression, pas une température. Au bord de la mer, p<sub>int</sub> = 101,3 + 89,7 ≈ 191 kPa et l’eau bout vers 119 °C. Ordre de grandeur : les autocuiseurs du commerce visent environ 1 bar de surpression et 120 °C au niveau de la mer.</p>'},
]},
);
})();
