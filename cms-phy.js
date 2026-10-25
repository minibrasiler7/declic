/* Déclic — Physique (PREPA-021 / 022) */
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

CMS.push(
/* ================= 1. CINÉMATIQUE ================= */
{subj:'phy', sem:'all', id:'cms-phy-cinematique', h:'Mouvement dans le plan', p:'Décrire un mouvement : position, vitesse et accélération comme dérivées, jusqu’au tir parabolique.', steps:[
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
]},

/* ================= 2. MOUVEMENT CIRCULAIRE ================= */
{subj:'phy', sem:'all', id:'cms-phy-circulaire', h:'Mouvement circulaire et repère de Frenet', p:'Séparer l’accélération en une partie qui change la norme de la vitesse et une partie qui la fait tourner.', steps:[
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
]},

/* ================= 3. NEWTON ================= */
{subj:'phy', sem:'all', id:'cms-phy-newton', h:'Lois de Newton et forces', p:'Les trois lois, les forces usuelles et la méthode du bilan des forces.', steps:[
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
]},

/* ================= 4. QUANTITÉ DE MOUVEMENT ================= */
{subj:'phy', sem:'all', id:'cms-phy-quantite', h:'Quantité de mouvement et centre de masse', p:'Une grandeur qui se conserve dans les chocs, et un point qui résume tout un système.', steps:[
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
]},

/* ================= 5. OSCILLATEUR ================= */
{subj:'phy', sem:'all', id:'cms-phy-oscillateur', h:'Oscillateur harmonique', p:'Un ressort, une masse, et l’équation qui décrit toutes les petites oscillations.', steps:[
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
]},

/* ================= 6. HYDROSTATIQUE ================= */
{subj:'phy', sem:'all', id:'cms-phy-hydrostatique', h:'Pression et hydrostatique', p:'La pression dans un fluide au repos, la presse hydraulique et la poussée d’Archimède.', steps:[
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
]},

/* ================= 7. ÉNERGIE ================= */
{subj:'phy', sem:'all', id:'cms-phy-energie', h:'Énergie, travail et puissance', p:'Ce qu’une force fournit au cours d’un déplacement, et ce qui se conserve.', steps:[
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
]},

/* ================= 8. GAZ PARFAIT ================= */
{subj:'phy', sem:'all', id:'cms-phy-gaz', h:'Gaz parfait', p:'Des molécules qui s’agitent, une équation d’état et trois transformations simples.', steps:[
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
]},

/* ================= 9. THERMODYNAMIQUE ================= */
{subj:'phy', sem:'all', id:'cms-phy-thermo', h:'États de la matière et thermodynamique', p:'Compressibilité, dilatation, premier principe et transferts de chaleur.', steps:[
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
]},

/* ================= 10. CHANGEMENTS D'ÉTAT ================= */
{subj:'phy', sem:'all', id:'cms-phy-changements', h:'Changements d’état', p:'Chaleur latente, paliers de température, pression de vapeur saturante et ébullition en altitude.', steps:[
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
]},
);
})();
