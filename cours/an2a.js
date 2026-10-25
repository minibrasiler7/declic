/* Déclic — Analyse II, fonctions spéciales */
(()=>{
const PI=Math.PI;
const sci=x=>{ const e=Math.floor(Math.log10(x)), m=x/10**e; return `${fmt(m,1)}·10<sup>${fmt(e,0)}</sup>`; };
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
// n/d · π en texte : pf(5,6) → 5π/6
const pf=(n,d)=>{ if(n===0) return '0'; const g=gcd(Math.abs(n),d); n/=g; d/=g;
  const s=(n===1?'':n===-1?'−':fmt(n))+'π'; return d===1?s:s+'/'+d; };
// cercle trigonométrique de base
const circle=(o={})=>{ const R=o.R||1.35, P=plane({x:[-R,R],y:[-R,R],step:.5,lab:o.lab===false?0:1,w:o.w||300});
  P.circ(0,0,1,{c:'var(--ink)',w:2}); return P; };
const arc=(P,a,b,r,q)=>P.curve(t=>r*Math.cos(t),t=>r*Math.sin(t),a,b,q);
const ray=(P,t,q={})=>P.seg(0,0,Math.cos(t),Math.sin(t),Object.assign({c:'var(--ink)',w:2.5},q));
const ticksPi=(P,from,to,y=0,d=2)=>{ for(let k=Math.ceil(from*d/PI);k<=Math.floor(to*d/PI);k++) if(k) P.text(k*PI/d,y,pf(k,d),{a:'middle',dy:16,s:11,c:'var(--muted)'}); return P; };

COURS.push(
/* ===================== 1. L'angle et sa mesure ===================== */
{subj:'an2', sem:'aut', id:'an2-angle', h:'L’angle et sa mesure', p:'Degrés, radians, longueur d’arc et cercle trigonométrique.', steps:[
 {h:'Le radian, une mesure par la longueur',p:`Un angle au centre de <i>θ</i> <b>radians</b> intercepte, sur un cercle de rayon <i>r</i>, un arc de longueur <b><i>s</i> = <i>rθ</i></b>. Sur le cercle de rayon 1, la mesure en radians est donc exactement la longueur de l’arc. Un tour complet vaut 360° = 2π rad.`,
  params:[{id:'t',l:'Angle',min:0,max:360,step:15,v:60,u:'°'},{id:'r',l:'Rayon r',min:1,max:3,step:.5,v:2}],
  draw:v=>{ const th=rad(v.t), P=plane({x:[-3.4,3.4],y:[-3.4,3.4],lab:1});
    P.circ(0,0,v.r,{c:'var(--muted)',w:1.5,dash:true}); arc(P,0,th,v.r,{c:'var(--spark)',w:5});
    P.seg(0,0,v.r,0,{c:'var(--ink)',w:2}).seg(0,0,v.r*Math.cos(th),v.r*Math.sin(th),{c:'var(--ink)',w:2});
    arc(P,0,th,.45,{c:'var(--math)',w:2}); P.dot(v.r*Math.cos(th),v.r*Math.sin(th),{c:'var(--accent)',l:'s'}); return P.svg(); },
  info:v=>`θ = ${v.t}° = ${pf(v.t,180)} rad ≈ ${fmt(rad(v.t),3)} rad · <b>s = rθ ≈ ${fmt(v.r*rad(v.t),2)}</b>`,
  note:'Le radian est un rapport de deux longueurs (s / r) : c’est un nombre sans dimension.'},
 {h:'Convertir',p:`Comme 180° = π rad, on passe d’une unité à l’autre par une règle de trois : <b><i>θ</i><sub>rad</sub> = <i>θ</i><sub>deg</sub> · ${F('π','180')}</b> et <b><i>θ</i><sub>deg</sub> = <i>θ</i><sub>rad</sub> · ${F('180','π')}</b>. Retiens les valeurs du tableau, elles reviennent partout.`,
  fig:`<table><tr><td>degrés</td><td>0</td><td>30</td><td>45</td><td>60</td><td>90</td><td>180</td><td>360</td></tr><tr><td>radians</td><td>0</td><td>π/6</td><td>π/4</td><td>π/3</td><td>π/2</td><td>π</td><td>2π</td></tr></table>`,
  note:'1 rad ≈ 57,3°. Un angle de « 2 » sans unité est en radians, pas en degrés.'},
 {h:'De degrés en radians',p:'Combien vaut 135° en radians&nbsp;?',opts:['2π/3','3π/4','5π/6','3π/5'],ans:1,
  why:'135 · π/180 = 135π/180 = 3π/4 (on simplifie par 45).'},
 {h:'De radians en degrés',p:'Convertis 2 rad en degrés. Arrondis au dixième.',lab:'θ =',unit:'°',ans:114.6,tol:.05,
  why:'2 · 180/π = 360/π ≈ 114,6°.'},
 {h:'Longueur d’arc',p:`Avec <i>θ</i> en radians, l’arc mesure <b><i>s</i> = <i>rθ</i></b> et le secteur a pour aire <b><i>A</i> = ½ <i>r</i>²<i>θ</i></b>. Un cercle de rayon 5 cm, angle au centre 1,2 rad : quelle est la longueur de l’arc&nbsp;?`,lab:'s =',unit:'cm',ans:6,
  why:'s = rθ = 5 · 1,2 = 6 cm. (Le secteur a une aire de ½ · 25 · 1,2 = 15 cm².)',
  note:'Ces formules n’ont cette forme simple qu’en radians. En degrés, il faudrait s = πrθ/180.'},
 {h:'Le cercle trigonométrique',p:`C’est le cercle de centre O et de rayon 1, orienté dans le <b>sens positif</b> (inverse des aiguilles d’une montre) à partir du point (1 ; 0). Un angle négatif tourne dans l’autre sens, un angle de plus de 2π fait plusieurs tours. Les angles <i>θ</i> et <i>θ</i> + 2<i>k</i>π (<i>k</i> ∈ ℤ) donnent le <b>même point</b>.`,
  params:[{id:'k',l:'θ (multiples de π/6)',min:-24,max:24,step:1,v:4}],
  draw:v=>{ const th=v.k*PI/6, P=circle({R:1.4});
    P.curve(t=>(.3+.05*Math.abs(t))*Math.cos(t),t=>(.3+.05*Math.abs(t))*Math.sin(t),0,th,{c:'var(--spark)',w:2.5});
    ray(P,th); P.dot(1,0,{c:'var(--muted)',r:4}).dot(Math.cos(th),Math.sin(th),{c:'var(--accent)',l:'M'}); return P.svg(); },
  info:v=>{ let kp=((v.k%12)+12)%12; if(kp>6) kp-=12; const tours=(v.k-kp)/12;
    return `θ = ${pf(v.k,6)} · mesure principale ${pf(kp,6)}${tours?` (${tours>0?'+':'−'}${Math.abs(tours)} tour${Math.abs(tours)>1?'s':''})`:''}`; },
  note:'La <b>mesure principale</b> est l’unique représentant dans ]−π ; π].'},
 {kind:'Méthode',h:'Réduire un angle modulo 2π',p:`<b>Quand ?</b> Dès qu’un angle sort de ]−π ; π] (ou de [0 ; 2π[) : pour placer le point sur le cercle, lire un sinus ou un cosinus, trouver la mesure principale.<br><b>Pourquoi ça marche ?</b> Ajouter ou retirer 2π, c’est faire un tour complet : on revient au même point, donc tous les sinus et cosinus restent les mêmes.<br><b>Comment ?</b> Avec un angle <i>n</i>π/<i>d</i>, écris 2π = 2<i>d</i>π/<i>d</i> et retire (ou ajoute) des multiples de 2<i>d</i> au numérateur jusqu’à tomber entre −<i>d</i> et <i>d</i>. Avec un angle décimal <i>θ</i>, calcule <i>θ</i>/(2π), prends l’entier <i>k</i> le plus proche et calcule <i>θ</i> − 2<i>k</i>π.`,
  demo:{enonce:'Trouve la mesure principale de −19π/4, puis celle de 29,5 rad.',
   etapes:[
    {f:'2π = 8π/4, donc on ajoute des multiples de 8 au numérateur −19.',w:'On travaille en quarts de π pour rester sur des entiers.'},
    {f:'−19 + 8 = −11, encore trop petit (il faut un numérateur dans ]−4 ; 4]). −19 + 16 = −3.',w:'−11π/4 &lt; −π, donc on ajoute un deuxième tour.'},
    {f:'−19π/4 + 4π = −3π/4, et −π &lt; −3π/4 ≤ π.',w:'On vérifie qu’on est bien dans ]−π ; π] : c’est la mesure principale.'},
    {f:'29,5 / (2π) ≈ 4,695, l’entier le plus proche est <i>k</i> = 5.',w:'Pour un angle décimal, on compte combien de tours il contient.'},
    {f:'29,5 − 5 · 2π ≈ 29,5 − 31,416 ≈ −1,916 rad.',w:'Avec l’entier le plus proche, le reste tombe toujours entre −π et π. Avec k = 4, on aurait 4,37 &gt; π.'}],
   conclusion:'Mesures principales : −19π/4 → −3π/4 et 29,5 rad → −1,916 rad environ. Les deux angles de départ donnent les mêmes points du cercle que ces mesures.'},
  note:'Pour la mesure dans [0 ; 2π[, on vise un numérateur entre 0 et 2d (ou on prend la partie entière de θ/(2π) au lieu de l’entier le plus proche).'},
 {h:'Le même point',p:'Règle l’angle pour obtenir la mesure principale de 17π/6.',
  params:[{id:'k',l:'θ (multiples de π/6)',min:-6,max:6,step:1,v:0}],
  draw:v=>{ const th=v.k*PI/6, P=circle({R:1.4}); arc(P,0,th,.35,{c:'var(--spark)',w:2.5}); ray(P,th);
    P.dot(Math.cos(17*PI/6),Math.sin(17*PI/6),{c:'var(--line)',r:9}).dot(Math.cos(th),Math.sin(th),{c:'var(--accent)'}); return P.svg(); },
  info:v=>`θ = ${pf(v.k,6)}`,ok:v=>v.k===5,
  why:'17π/6 = 12π/6 + 5π/6 = 2π + 5π/6. On retire un tour : la mesure principale est 5π/6, qui est bien dans ]−π ; π].'},
 {h:'Un angle négatif',p:'Quelle est la mesure principale de −23π/4&nbsp;?',opts:['−3π/4','3π/4','π/4','−π/4'],ans:2,
  why:'2π = 8π/4. −23 + 8 = −15, −23 + 16 = −7, −23 + 24 = 1 : on ajoute 3 tours (6π) et −23π/4 + 6π = π/4, dans ]−π ; π].'},
 {h:'Un angle décimal',p:'Quelle est la mesure principale de 20 rad&nbsp;? Arrondis au millième.',lab:'θ =',unit:'rad',ans:1.150,tol:.0006,
  why:'20/(2π) ≈ 3,18, l’entier le plus proche est 3. 20 − 3 · 2π = 20 − 6π ≈ 1,150 rad, qui est bien dans ]−π ; π].'},
 {kind:'Méthode',h:'Tours, arcs et vitesse angulaire',p:`<b>Quand ?</b> Un objet tourne (roue, aiguille, pale) et on demande un angle, une distance parcourue ou une vitesse.<br><b>Pourquoi ça marche ?</b> Un tour vaut 2π rad, donc <i>n</i> tours font <b><i>θ</i> = 2π<i>n</i></b>. Un point à la distance <i>r</i> du centre parcourt l’arc <i>s</i> = <i>rθ</i>. Si l’angle <i>θ</i> est balayé en un temps <i>t</i>, la <b>vitesse angulaire</b> vaut <b><i>ω</i> = <i>θ</i>/<i>t</i></b> (en rad/s) et la vitesse du point vaut <b><i>v</i> = <i>rω</i></b>.<br><b>Comment ?</b> 1) Convertis la fraction de tour en radians. 2) Applique <i>s</i> = <i>rθ</i> ou <i>v</i> = <i>rω</i>. 3) Pour compter des tours à partir d’un angle, calcule <i>θ</i>/(2π) ; à partir d’une distance, calcule <i>s</i>/(2π<i>r</i>).`,
  demo:{enonce:'La pale d’un ventilateur mesure 25 cm et tourne à 1200 tours par minute. Quelle est la vitesse de son extrémité&nbsp;?',
   etapes:[
    {f:'1200 tours/min = 1200/60 = 20 tours par seconde.',w:'On se ramène à la seconde pour obtenir une vitesse en m/s.'},
    {f:'<i>ω</i> = 20 · 2π = 40π ≈ 125,7 rad/s.',w:'Chaque tour vaut 2π rad.'},
    {f:'<i>v</i> = <i>rω</i> = 0,25 · 40π = 10π ≈ 31,4 m/s.',w:'Le rayon doit être en mètres. Par seconde, l’extrémité parcourt l’arc rθ avec θ = 40π.'}],
   conclusion:'L’extrémité de la pale va à environ 31,4 m/s, soit plus de 110 km/h.'},
  note:'Une fraction de tour se convertit directement : un quart de tour vaut π/2, un tiers de tour 2π/3.'},
 {kind:'Défi',h:'L’aiguille des minutes',p:'L’aiguille des minutes d’une horloge mesure 12 cm. Quelle longueur d’arc parcourt sa pointe en 20 minutes&nbsp;? Arrondis au centième.',lab:'s =',unit:'cm',ans:25.13,tol:.01,
  why:'20 min = 1/3 de tour, soit θ = 2π/3 rad. s = 12 · 2π/3 = 8π ≈ 25,13 cm.'},
 {h:'La jante',p:'Une roue de 0,3 m de rayon fait 3 tours par seconde. Quelle est la vitesse d’un point de la jante&nbsp;? Arrondis au centième.',lab:'v =',unit:'m/s',ans:5.65,tol:.006,
  why:'ω = 3 · 2π = 6π rad/s, donc v = rω = 0,3 · 6π = 1,8π ≈ 5,65 m/s.'},
 {kind:'Problème',h:'La roue de vélo',
  p:'Un vélo roule en ligne droite sans glisser. Ses roues ont un diamètre de 70 cm, donc un rayon de 0,35 m. Quand la roue tourne d’un angle <i>θ</i> (en radians), le vélo avance de la longueur d’arc <i>s</i> = <i>rθ</i> déroulée au sol. On suit la valve, placée au départ tout à droite de la roue (angle 0).',
  parts:[
   {q:'a) De quel angle (en radians) la roue tourne-t-elle quand le vélo avance de 10 m&nbsp;? Arrondis au centième.',lab:'θ =',unit:'rad',ans:28.57,tol:.01,hint:'Inverse la formule de l’arc : θ = s / r, avec s et r dans la même unité.',why:'θ = 10 / 0,35 ≈ 28,57 rad.'},
   {q:'b) Combien de tours complets la roue fait-elle sur 1 km&nbsp;?',lab:'tours =',ans:454,hint:'Un tour fait avancer le vélo d’une circonférence 2πr. Garde la partie entière.',why:'1000 / (2π · 0,35) ≈ 454,7 : la roue fait 454 tours complets.'},
   {q:'c) Après 10 m, quelle est la mesure principale (dans ]−π ; π]) de l’angle de la valve&nbsp;? Arrondis au centième.',lab:'θ =',unit:'rad',ans:-2.84,tol:.01,hint:'Retire autant de fois 2π ≈ 6,283 qu’il faut pour tomber dans ]−π ; π]. Essaie 4 tours, puis 5.',why:'28,571 − 4 · 2π ≈ 3,44, qui dépasse π. 28,571 − 5 · 2π ≈ −2,84 est dans ]−π ; π].'},
   {q:'d) À 18 km/h (5 m/s), quelle est la vitesse angulaire de la roue en rad/s&nbsp;? Arrondis au centième.',lab:'ω =',unit:'rad/s',ans:14.29,tol:.01,hint:'En une seconde, la roue déroule 5 m d’arc.',why:'ω = v / r = 5 / 0,35 ≈ 14,29 rad/s.'},
  ],
  sol:'<p>Le sol reçoit exactement l’arc déroulé : <i>s</i> = <i>rθ</i>, donc <i>θ</i> = <i>s</i>/<i>r</i>.</p><p>a) <i>θ</i> = 10/0,35 ≈ 28,57 rad. b) Un tour fait 2π · 0,35 ≈ 2,199 m, et 1000/2,199 ≈ 454,7 : 454 tours complets. c) 28,571 = 4 · 2π + 3,438 ; comme 3,438 &gt; π, on retire un tour de plus : 3,438 − 2π ≈ −2,84 rad. d) En une seconde, <i>θ</i> = 5/0,35 ≈ 14,29 rad, soit environ 2,3 tours par seconde.</p>'},
 {kind:'Problème',h:'Ératosthène mesure la Terre',
  p:'Vers 230 av. J.-C., Ératosthène remarque qu’à midi le jour du solstice, le soleil est à la verticale à Syène, alors qu’à Alexandrie, plus au nord sur le même méridien, ses rayons font un angle de 7,2° avec la verticale. Les rayons du soleil sont parallèles, donc 7,2° est aussi l’angle au centre de la Terre entre les deux villes. La distance Syène–Alexandrie est d’environ 800 km.',
  fig:(()=>{ const P=plane({x:[-1.6,1.6],y:[-1.2,2],grid:false,axes:false}), b=rad(70), a=rad(95);
    P.circ(0,0,1,{c:'var(--ink)',w:2}); arc(P,b,a,1,{c:'var(--spark)',w:5}); P.seg(0,0,Math.cos(a),Math.sin(a),{c:'var(--muted)',w:1.5,dash:true}).seg(0,0,Math.cos(b),Math.sin(b),{c:'var(--muted)',w:1.5,dash:true});
    arc(P,b,a,.3,{c:'var(--math)',w:2}); [a,b].forEach(t=>{ const x=Math.cos(t), y=Math.sin(t); P.arrow(x+.8*Math.cos(b),y+.8*Math.sin(b),x,y,{c:'var(--accent)',w:1.5,hs:8}); });
    P.dot(Math.cos(a),Math.sin(a),{c:'var(--ink)',r:4,l:'Alexandrie',dx:-78,dy:-4}).dot(Math.cos(b),Math.sin(b),{c:'var(--ink)',r:4,l:'Syène',dx:10,dy:6}).text(.05,.42,'7,2°',{s:11,c:'var(--math)'}).text(-1.5,-1.1,'angle exagéré sur la figure',{s:11,c:'var(--muted)'}).text(.75,1.85,'rayons du soleil',{s:11,c:'var(--accent)'}); return P.svg(); })(),
  parts:[
   {q:'a) Convertis 7,2° en radians. Arrondis au dix-millième.',lab:'θ =',unit:'rad',ans:.1257,tol:.00006,hint:'Multiplie par π/180. Remarque que 7,2 = 180/25.',why:'7,2 · π/180 = π/25 ≈ 0,1257 rad.'},
   {q:'b) Quel rayon terrestre R en déduis-tu&nbsp;? Arrondis au kilomètre.',lab:'R =',unit:'km',ans:6366,tol:1,hint:'Les 800 km sont la longueur de l’arc intercepté par cet angle au centre.',why:'800 = R · π/25, donc R = 20 000/π ≈ 6366 km.'},
   {q:'c) Avec ce rayon, quelle distance sépare deux villes du même méridien de latitudes 47,5° N et 43,3° N&nbsp;? Arrondis au kilomètre.',lab:'d =',unit:'km',ans:467,tol:1,hint:'L’écart de latitude est l’angle au centre. Tu peux aussi faire une règle de trois avec 7,2° ↔ 800 km.',why:'Δφ = 4,2°, d = R · 4,2π/180 = 800 · 4,2/7,2 ≈ 467 km.'},
   {q:'d) Le mille marin est l’arc qui correspond à 1 minute d’angle (1/60 de degré) au centre. Combien de mètres mesure-t-il avec ce rayon&nbsp;?',lab:'1 mille =',unit:'m',ans:1852,tol:1,hint:'Convertis 1/60° en radians, puis multiplie par R exprimé en mètres.',why:'1′ = π/10 800 rad, donc s = 6 366 198 · π/10 800 ≈ 1852 m. C’est bien la valeur officielle du mille marin.'},
  ],
  sol:'<p>Les rayons étant parallèles, l’angle de 7,2° mesuré à Alexandrie est l’angle au centre <i>θ</i> entre les deux villes (angles alternes-internes).</p><p>a) <i>θ</i> = 7,2 · π/180 = π/25 ≈ 0,1257 rad. b) Avec <i>s</i> = <i>Rθ</i> : <i>R</i> = 800/(π/25) = 20 000/π ≈ 6366 km, et la circonférence vaut 2π<i>R</i> = 40 000 km. c) 4,2° donne <i>d</i> = <i>R</i> · 4,2π/180 ≈ 467 km. d) 1′ = π/10 800 rad, et <i>R</i> · π/10 800 ≈ 1852 m.</p><p>La longueur d’arc proportionnelle à l’angle en radians suffit à mesurer la planète.</p>'},
]},

/* ===================== 2. Fonctions trigonométriques ===================== */
{subj:'an2', sem:'aut', id:'an2-fonctions', h:'Fonctions trigonométriques', p:'Sinus, cosinus, tangente et leurs réciproques, du cercle au graphe.', steps:[
 {h:'Du cercle au graphe',p:`Pour tout réel <i>x</i>, le point M d’angle <i>x</i> sur le cercle trigonométrique a pour coordonnées <b>(cos <i>x</i> ; sin <i>x</i>)</b>. En déroulant l’angle sur l’axe horizontal, on obtient les graphes. Fais tourner le point et regarde la courbe se tracer.`,
  params:[{id:'t',l:'x',min:0,max:360,step:15,v:60,u:'°'},{id:'f',l:'0 = sin, 1 = cos',min:0,max:1,step:1,v:0}],
  draw:v=>{ const x=rad(v.t), c=Math.cos(x), s=Math.sin(x), C=circle({R:1.3,w:150,lab:false});
    ray(C,x); if(v.f) C.seg(0,0,c,0,{c:'var(--math)',w:5}); else C.seg(c,0,c,s,{c:'var(--spark)',w:5}); C.dot(c,s,{c:'var(--accent)',l:'M'});
    const g=v.f?Math.cos:Math.sin, P=plane({x:[-.3,6.7],y:[-1.3,1.3],step:PI/2});
    P.fn(g,{from:0,to:2*PI,c:'var(--muted)',w:2,dash:true}).fn(g,{from:0,to:x,c:v.f?'var(--math)':'var(--spark)'}).seg(x,0,x,g(x),{c:'var(--ink)',w:1.5,dash:true}).dot(x,g(x),{c:'var(--accent)'});
    ticksPi(P,.1,6.6,0,2); return C.svg()+P.svg(); },
  info:v=>`${v.f?'cos':'sin'} ${pf(v.t,180)} ≈ ${fmt(v.f?Math.cos(rad(v.t)):Math.sin(rad(v.t)),3)}`},
 {h:'La tangente',p:`<b>tan <i>x</i> = ${F('sin <i>x</i>','cos <i>x</i>')}</b>, définie pour <i>x</i> ≠ ${F('π',2)} + <i>k</i>π. Géométriquement, c’est l’ordonnée du point où la droite (OM) coupe la tangente au cercle en (1 ; 0).`,
  params:[{id:'t',l:'x',min:-60,max:60,step:5,v:30,u:'°'}],
  draw:v=>{ const x=rad(v.t), T=Math.tan(x), P=plane({x:[-1.2,2.2],y:[-2,2],step:.5,lab:1,w:270});
    P.circ(0,0,1,{c:'var(--ink)',w:2}).seg(1,-2,1,2,{c:'var(--muted)',w:1.5,dash:true}).seg(0,0,1,T,{c:'var(--ink)',w:2}).seg(1,0,1,T,{c:'var(--spark)',w:5});
    P.dot(Math.cos(x),Math.sin(x),{c:'var(--accent)',l:'M'}).dot(1,T,{c:'var(--spark)',l:'T'}); return P.svg(); },
  info:v=>`tan ${v.t}° ≈ ${fmt(Math.tan(rad(v.t)),3)}`,
  note:'Quand x s’approche de π/2, (OM) devient verticale et ne coupe plus la tangente : tan x part à l’infini.'},
 {h:'Périodicité et parité',p:`sin et cos sont <b>2π-périodiques</b>, tan est <b>π-périodique</b>. cos est <b>paire</b> : cos(−<i>x</i>) = cos <i>x</i>. sin et tan sont <b>impaires</b> : sin(−<i>x</i>) = −sin <i>x</i>. Sur le cercle, −<i>x</i> est le symétrique de <i>x</i> par rapport à l’axe horizontal.`,
  fig:(()=>{ const P=plane({x:[-6.6,6.6],y:[-2.5,2.5],step:PI/2,w:320,h:160});
    for(let k=-2;k<=2;k++) P.fn(Math.tan,{from:k*PI-PI/2+.08,to:k*PI+PI/2-.08,c:'var(--spark)',w:2});
    P.fn(Math.sin,{c:'var(--accent)'}).fn(Math.cos,{c:'var(--math)'});
    P.text(-6.4,2.1,'sin',{c:'var(--accent)'}).text(-4.6,2.1,'cos',{c:'var(--math)'}).text(-2.7,2.1,'tan',{c:'var(--spark)'}); ticksPi(P,-6.5,6.5,0,1); return P.svg(); })(),
  note:'Images : sin et cos prennent leurs valeurs dans [−1 ; 1], tan dans ℝ tout entier.'},
 {kind:'Méthode',h:'Lire le cercle : valeurs remarquables et angles associés',p:`<p><b>Quand ?</b> Pour calculer exactement sin, cos ou tan d’un angle comme 5π/6, 7π/6 ou 11π/3, qui n’est pas dans le premier quadrant.<br><b>Les valeurs de base</b> (à connaître) :</p><table><tr><td><i>x</i></td><td>0</td><td>π/6</td><td>π/4</td><td>π/3</td><td>π/2</td></tr><tr><td>sin <i>x</i></td><td>0</td><td>1/2</td><td>√2/2</td><td>√3/2</td><td>1</td></tr><tr><td>cos <i>x</i></td><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td></tr><tr><td>tan <i>x</i></td><td>0</td><td>√3/3</td><td>1</td><td>√3</td><td>—</td></tr></table><p><b>Pourquoi ça marche ?</b> Les points d’angles −<i>x</i>, π − <i>x</i>, π + <i>x</i> sont les symétriques du point d’angle <i>x</i> par rapport à l’axe horizontal, à l’axe vertical et au centre. Une symétrie garde les longueurs et ne change que des signes :<br>cos(−<i>x</i>) = cos <i>x</i>, sin(−<i>x</i>) = −sin <i>x</i> ; <b>sin(π − <i>x</i>) = sin <i>x</i></b>, cos(π − <i>x</i>) = −cos <i>x</i> ; sin(π + <i>x</i>) = −sin <i>x</i>, cos(π + <i>x</i>) = −cos <i>x</i>. Le point d’angle π/2 − <i>x</i> est le symétrique par rapport à la droite <i>y</i> = <i>x</i>, qui échange les coordonnées : <b>sin(π/2 − <i>x</i>) = cos <i>x</i></b> et cos(π/2 − <i>x</i>) = sin <i>x</i>.<br><b>Comment ?</b> 1) Réduis l’angle modulo 2π. 2) Écris-le comme −<i>x</i>, π − <i>x</i> ou π + <i>x</i> avec <i>x</i> de la table. 3) Le quadrant donne le signe, la table donne la valeur.</p>`,
  demo:{enonce:'Calcule cos(3π/4), puis sin(11π/3).',
   etapes:[
    {f:'3π/4 = π − π/4.',w:'3π/4 est dans le 2e quadrant, à π/4 de l’angle plat.'},
    {f:'cos(3π/4) = −cos(π/4) = −√2/2.',w:'La symétrie par rapport à l’axe vertical change le signe du cosinus. Dans le 2e quadrant, le cosinus est bien négatif.'},
    {f:'11π/3 − 2 · 2π = 11π/3 − 12π/3 = −π/3.',w:'On réduit d’abord modulo 2π : 11π/3 fait presque deux tours.'},
    {f:'sin(11π/3) = sin(−π/3) = −sin(π/3) = −√3/2.',w:'sin est impaire : le symétrique par rapport à l’axe horizontal change le signe du sinus.'}],
   conclusion:'cos(3π/4) = −√2/2 et sin(11π/3) = −√3/2. Retiens aussi que sin(π − x) = sin x : deux angles par tour, x et π − x, ont toujours le même sinus.'},
  note:'Vérifie toujours le signe avec le quadrant : sin &gt; 0 en haut, cos &gt; 0 à droite.'},
 {h:'Valeur remarquable',p:'Combien vaut cos(5π/6)&nbsp;?',opts:['√3/2','−1/2','−√3/2','1/2'],ans:2,
  why:'5π/6 = π − π/6. Le symétrique par rapport à l’axe vertical change le signe du cosinus : cos(5π/6) = −cos(π/6) = −√3/2.'},
 {h:'Angles associés',p:'On sait que sin <i>x</i> = 0,6. Calcule cos(π/2 − <i>x</i>) − sin(π + <i>x</i>).',lab:'=',ans:1.2,tol:.001,
  why:'cos(π/2 − x) = sin x = 0,6 et sin(π + x) = −sin x = −0,6. Donc 0,6 − (−0,6) = 1,2.'},
 {h:'Place le point',p:'Règle <i>x</i> dans [π ; 3π/2] pour que <b>sin <i>x</i> = −√3/2</b>.',
  params:[{id:'t',l:'x',min:180,max:270,step:15,v:180,u:'°'}],
  draw:v=>{ const x=rad(v.t), P=circle({R:1.4}); P.seg(-1.4,-Math.sqrt(3)/2,1.4,-Math.sqrt(3)/2,{c:'var(--bad)',w:1.5,dash:true});
    ray(P,x); P.seg(Math.cos(x),0,Math.cos(x),Math.sin(x),{c:'var(--spark)',w:5}).dot(Math.cos(x),Math.sin(x),{c:'var(--accent)'}); return P.svg(); },
  info:v=>`x = ${pf(v.t,180)} · sin x ≈ ${fmt(Math.sin(rad(v.t)),3)}`,ok:v=>v.t===240,
  why:'sin(π/3) = √3/2. Dans le 3e quadrant, x = π + π/3 = 4π/3 (240°) donne sin x = −sin(π/3) = −√3/2.'},
 {h:'Calcule',p:'Calcule sin(7π/6) + cos(2π/3).',lab:'=',ans:-1,
  why:'sin(7π/6) = −sin(π/6) = −1/2 et cos(2π/3) = −cos(π/3) = −1/2. La somme vaut −1.'},
 {h:'Les fonctions réciproques',p:`sin, cos et tan ne sont pas bijectives sur ℝ. On les restreint à un intervalle où elles le sont : <b>arcsin</b> : [−1 ; 1] → [−${F('π',2)} ; ${F('π',2)}], <b>arccos</b> : [−1 ; 1] → [0 ; π], <b>arctan</b> : ℝ → ]−${F('π',2)} ; ${F('π',2)}[. arcsin <i>y</i> est l’unique angle de cet intervalle dont le sinus vaut <i>y</i>.`,
  params:[{id:'y',l:'y',min:-1,max:1,step:.1,v:.5}],
  draw:v=>{ const y=v.y, a=Math.asin(y), b=Math.acos(y), P=circle({R:1.4});
    P.seg(-1.4,y,1.4,y,{c:'var(--accent)',w:1.5,dash:true}).seg(y,-1.4,y,1.4,{c:'var(--math)',w:1.5,dash:true});
    arc(P,0,a,.35,{c:'var(--accent)',w:4}); arc(P,0,b,.6,{c:'var(--math)',w:4});
    ray(P,a,{c:'var(--accent)'}); ray(P,b,{c:'var(--math)'});
    P.dot(Math.cos(a),y,{c:'var(--accent)'}).dot(y,Math.sin(b),{c:'var(--math)'}); return P.svg(); },
  info:v=>`<span style="color:var(--accent)">arcsin ${fmt(v.y,1)} ≈ ${fmt(Math.asin(v.y),3)}</span> · <span style="color:var(--math)">arccos ${fmt(v.y,1)} ≈ ${fmt(Math.acos(v.y),3)}</span>`,
  note:'On a sin(arcsin y) = y pour tout y ∈ [−1 ; 1], mais arcsin(sin x) = x seulement si x ∈ [−π/2 ; π/2].'},
 {kind:'Méthode',h:'Calculer arcsin, arccos et arctan exactement',p:`<b>Quand ?</b> On demande arccos(−√3/2), arctan(−1) ou arcsin(sin <i>x</i>) sans calculatrice.<br><b>Pourquoi ça marche ?</b> Chaque fonction réciproque renvoie <b>l’unique</b> angle de son intervalle image qui a la bonne valeur : [−π/2 ; π/2] pour arcsin, [0 ; π] pour arccos, ]−π/2 ; π/2[ pour arctan. Plusieurs angles ont le même sinus, mais un seul est dans l’intervalle.<br><b>Comment ?</b> 1) Écris l’intervalle image. 2) Trouve dans la table l’angle de base qui a la valeur au signe près. 3) Utilise un angle associé (−<i>x</i>, π − <i>x</i>) pour corriger le signe en restant dans l’intervalle. Pour arcsin(sin <i>x</i>) ou arccos(cos <i>x</i>), cherche l’angle de l’intervalle qui a le même sinus (ou cosinus) que <i>x</i>.`,
  demo:{enonce:'Calcule arccos(−√3/2), puis arcsin(sin(5π/6)).',
   etapes:[
    {f:'arccos renvoie un angle de [0 ; π].',w:'On fixe d’abord où chercher.'},
    {f:'cos(π/6) = √3/2, et cos(π − π/6) = −cos(π/6) = −√3/2.',w:'La table donne √3/2 pour π/6. Pour obtenir le signe moins sans sortir de [0 ; π], on prend π − π/6.'},
    {f:'arccos(−√3/2) = 5π/6.',w:'5π/6 est bien dans [0 ; π] : c’est l’unique réponse.'},
    {f:'5π/6 n’est pas dans [−π/2 ; π/2], mais sin(π − 5π/6) = sin(5π/6), avec π − 5π/6 = π/6.',w:'On cherche l’angle de [−π/2 ; π/2] qui a le même sinus que 5π/6. L’angle associé π − x garde le sinus.'},
    {f:'arcsin(sin(5π/6)) = π/6.',w:'π/6 ∈ [−π/2 ; π/2] : ce n’est pas 5π/6, car arcsin ne peut pas renvoyer un angle hors de son intervalle.'}],
   conclusion:'arccos(−√3/2) = 5π/6 et arcsin(sin(5π/6)) = π/6. Pour arctan, même idée sur ]−π/2 ; π/2[ : arctan(−1) = −π/4.'},
  note:'arcsin et arctan sont impaires : arcsin(−y) = −arcsin y. arccos ne l’est pas : arccos(−y) = π − arccos y.'},
 {h:'Arccosinus',p:'Combien vaut arccos(−1/2)&nbsp;?',opts:['−π/3','4π/3','5π/6','2π/3'],ans:3,
  why:'On cherche l’angle de [0 ; π] dont le cosinus vaut −1/2 : c’est 2π/3, car cos(2π/3) = −cos(π/3) = −1/2. 4π/3 a le même cosinus mais n’est pas dans [0 ; π].'},
 {h:'Arctangente',p:'Combien vaut arctan(−√3)&nbsp;?',opts:['2π/3','−π/6','−π/3','5π/3'],ans:2,
  why:'tan(π/3) = √3 et tan est impaire, donc tan(−π/3) = −√3. −π/3 est dans ]−π/2 ; π/2[ : arctan(−√3) = −π/3.'},
 {kind:'Défi',h:'Attention à l’intervalle',p:'Combien vaut arcsin(sin(3π/4))&nbsp;?',opts:['3π/4','−π/4','π/4','5π/4'],ans:2,
  why:'sin(3π/4) = √2/2. L’angle de [−π/2 ; π/2] de sinus √2/2 est π/4. 3π/4 n’est pas dans l’intervalle image de arcsin.'},
 {kind:'Méthode',h:'Lire une inégalité sur le cercle',p:`<b>Quand ?</b> On cherche les <i>x</i> d’un tour pour lesquels cos <i>x</i> ≥ <i>a</i>, sin <i>x</i> &lt; <i>a</i>, etc.<br><b>Pourquoi ça marche ?</b> cos <i>x</i> est l’abscisse du point M, sin <i>x</i> son ordonnée. « cos <i>x</i> ≥ <i>a</i> » veut dire que M est à droite de la droite verticale d’abscisse <i>a</i> : c’est un <b>arc</b> du cercle, limité par les deux points où cos <i>x</i> = <i>a</i>. Pour le sinus, on coupe par une droite horizontale.<br><b>Comment ?</b> 1) Trouve les deux angles frontières (avec arccos ou arcsin et un angle associé). 2) Repère quel arc vérifie l’inégalité. 3) Écris cet arc en parcourant le cercle dans le sens positif, dans l’intervalle demandé.`,
  fig:(()=>{ const P=circle({R:1.4}); P.seg(.5,-1.4,.5,1.4,{c:'var(--bad)',w:1.5,dash:true}); arc(P,-PI/3,PI/3,1,{c:'var(--accent)',w:6});
    P.dot(.5,Math.sqrt(3)/2,{c:'var(--ink)',r:4,l:'π/3'}).dot(.5,-Math.sqrt(3)/2,{c:'var(--ink)',r:4,l:'−π/3',dy:16}).text(.55,-1.25,'x = 1/2',{s:11,c:'var(--bad)'}); return P.svg(); })(),
  demo:{enonce:'Résous cos <i>x</i> ≥ 1/2 sur ]−π ; π], puis sur [0 ; 2π[.',
   etapes:[
    {f:'cos <i>x</i> = 1/2 pour <i>x</i> = π/3 et <i>x</i> = −π/3.',w:'Ce sont les deux points où la droite verticale d’abscisse 1/2 coupe le cercle.'},
    {f:'Les points d’abscisse ≥ 1/2 forment l’arc de droite, de −π/3 à π/3.',w:'L’inégalité demande une abscisse grande : on garde la partie du cercle à droite de la droite.'},
    {f:'Sur ]−π ; π] : <i>x</i> ∈ [−π/3 ; π/3].',w:'Dans cet intervalle, l’arc se parcourt d’un seul tenant.'},
    {f:'Sur [0 ; 2π[ : −π/3 correspond à 5π/3, donc <i>x</i> ∈ [0 ; π/3] ∪ [5π/3 ; 2π[.',w:'L’arc passe par l’angle 0, qui est un bord de [0 ; 2π[ : il se coupe en deux morceaux.'}],
   conclusion:'Le même arc s’écrit [−π/3 ; π/3] ou [0 ; π/3] ∪ [5π/3 ; 2π[ selon l’intervalle choisi. Sa longueur, 2π/3, est le tiers d’un tour.'},
  note:'Pour une inégalité stricte, les bornes sont exclues.'},
 {h:'Une inégalité avec le sinus',p:'Sur [0 ; 2π[, pour quels <i>x</i> a-t-on sin <i>x</i> ≤ −1/2&nbsp;?',opts:['[π/6 ; 5π/6]','[7π/6 ; 11π/6]','[0 ; 7π/6] ∪ [11π/6 ; 2π[','[4π/3 ; 5π/3]'],ans:1,
  why:'sin x = −1/2 pour x = 7π/6 = π + π/6 et x = 11π/6 = 2π − π/6. Les points d’ordonnée ≤ −1/2 forment l’arc du bas, de 7π/6 à 11π/6.'},
 {kind:'Problème',h:'La grande roue',
  p:'Une grande roue a un diamètre de 60 m, son centre est à 32 m du sol et elle fait un tour en 15 minutes. Une nacelle part du point le plus bas à <i>t</i> = 0. Sa hauteur au-dessus du sol est alors <b><i>h</i>(<i>t</i>) = 32 − 30 cos(2π<i>t</i>/15)</b>, avec <i>t</i> en minutes.',
  fig:(()=>{ const P=plane({x:[-1,16],y:[-4,66],w:320,h:180,grid:false,lx:5,ly:20}); [17,32,47,62].forEach(y=>P.seg(0,y,15,y,{c:'var(--line)',w:1}));
    P.fn(t=>32-30*Math.cos(2*Math.PI*t/15),{from:0,to:15}).seg(0,47,15,47,{c:'var(--bad)',w:1.5,dash:true}).text(15.8,0,'t',{a:'end',dy:-6,c:'var(--muted)'}).text(.3,49,'47 m',{s:11,c:'var(--bad)'}); return P.svg(); })(),
  parts:[
   {q:'a) À quelle hauteur est la nacelle à <i>t</i> = 5 min&nbsp;?',lab:'h =',unit:'m',ans:47,hint:'2π · 5/15 = 2π/3. Quel est le cosinus de cet angle&nbsp;?',why:'cos(2π/3) = −1/2, donc h(5) = 32 + 15 = 47 m.'},
   {q:'b) À quel instant la nacelle atteint-elle 17 m pour la première fois&nbsp;?',lab:'t =',unit:'min',ans:2.5,tol:.01,hint:'Il faut cos(2πt/15) = 1/2. Le plus petit angle positif de cosinus 1/2 est arccos(1/2).',why:'arccos(1/2) = π/3, donc 2πt/15 = π/3 et t = 15/6 = 2,5 min.'},
   {q:'c) Pendant combien de minutes par tour la nacelle est-elle au-dessus de 47 m&nbsp;?',lab:'durée =',unit:'min',ans:5,hint:'h > 47 équivaut à cos(2πt/15) < −1/2. Sur un tour, l’angle 2πt/15 parcourt [0 ; 2π]. Où le cosinus est-il inférieur à −1/2&nbsp;?',why:'cos u < −1/2 pour u ∈ ]2π/3 ; 4π/3[, soit un tiers du tour : 15/3 = 5 min (de t = 5 à t = 10).'},
  ],
  sol:'<p><i>h</i>(<i>t</i>) = 32 − 30 cos <i>u</i> avec <i>u</i> = 2π<i>t</i>/15, qui parcourt [0 ; 2π] en un tour.</p><p>a) <i>u</i> = 2π/3, cos <i>u</i> = −1/2 : <i>h</i> = 32 + 15 = 47 m. b) <i>h</i> = 17 ⇔ cos <i>u</i> = 1/2 ; la première fois, <i>u</i> = arccos(1/2) = π/3, d’où <i>t</i> = 2,5 min. c) <i>h</i> &gt; 47 ⇔ cos <i>u</i> &lt; −1/2 ⇔ <i>u</i> ∈ ]2π/3 ; 4π/3[ sur un tour. Cet intervalle a une longueur 2π/3, le tiers de 2π : la nacelle reste 5 minutes au-dessus de 47 m, entre <i>t</i> = 5 et <i>t</i> = 10.</p>'},
 {kind:'Problème',h:'Le graphe de arcsin(sin x)',
  p:'On étudie <i>g</i>(<i>x</i>) = arcsin(sin <i>x</i>) sur ℝ. On sait que sin(arcsin <i>y</i>) = <i>y</i>, mais que arcsin(sin <i>x</i>) = <i>x</i> seulement si <i>x</i> ∈ [−π/2 ; π/2]. Il faut donc, pour chaque <i>x</i>, trouver l’angle de [−π/2 ; π/2] qui a le même sinus que <i>x</i>.',
  fig:(()=>{ const P=plane({x:[-.5,13],y:[-2,2],step:Math.PI/2,h:130}); P.fn(Math.sin,{c:'var(--muted)',w:2,dash:true}).fn(x=>Math.asin(Math.max(-1,Math.min(1,Math.sin(x)))),{n:600}); ticksPi(P,.1,12.9,0,2); return P.svg(); })(),
  parts:[
   {q:'a) Calcule <i>g</i>(2), arrondi au millième.',lab:'g(2) =',ans:1.142,tol:.0006,hint:'2 est dans [π/2 ; π]. Quel angle de [−π/2 ; π/2] a le même sinus que 2&nbsp;? Pense à sin(π − x) = sin x.',why:'sin(π − 2) = sin 2 et π − 2 ≈ 1,142 est dans [−π/2 ; π/2], donc g(2) = π − 2 ≈ 1,142.'},
   {q:'b) Calcule <i>g</i>(5), arrondi au millième.',lab:'g(5) =',ans:-1.283,tol:.0006,hint:'Utilise la 2π-périodicité de sin : retire 2π.',why:'5 − 2π ≈ −1,283 est dans [−π/2 ; π/2] et a le même sinus que 5. Donc g(5) = 5 − 2π.'},
   {q:'c) Sur [π/2 ; 3π/2], quelle est l’expression de <i>g</i>(<i>x</i>)&nbsp;?',opts:['x − π','x','π − x','−x'],ans:2,hint:'Si x ∈ [π/2 ; 3π/2], dans quel intervalle tombe π − x&nbsp;?',why:'π − x ∈ [−π/2 ; π/2] et sin(π − x) = sin x, donc g(x) = π − x. Le graphe est un segment de pente −1 : g est en dents de scie.'},
   {q:'d) Combien l’équation <i>g</i>(<i>x</i>) = 1 a-t-elle de solutions dans [0 ; 4π]&nbsp;?',lab:'nombre =',ans:4,hint:'g(x) = 1 ⇔ sin x = sin 1. Compte les solutions par tour.',why:'sin x = sin 1 donne x = 1 + 2kπ ou x = π − 1 + 2kπ. Dans [0 ; 4π] : 1, π − 1, 2π + 1, 3π − 1, soit 4 solutions.'},
  ],
  sol:'<p>Pour tout <i>x</i>, <i>g</i>(<i>x</i>) est l’unique angle de [−π/2 ; π/2] de même sinus que <i>x</i>. <i>g</i> est 2π-périodique comme sin.</p><p>Sur [−π/2 ; π/2], <i>g</i>(<i>x</i>) = <i>x</i>. Sur [π/2 ; 3π/2], π − <i>x</i> tombe dans [−π/2 ; π/2] et sin(π − <i>x</i>) = sin <i>x</i>, donc <i>g</i>(<i>x</i>) = π − <i>x</i>. Le graphe est une ligne brisée de pentes +1 et −1, entre −π/2 et π/2.</p><p>Ainsi <i>g</i>(2) = π − 2 ≈ 1,142 et <i>g</i>(5) = 5 − 2π ≈ −1,283. Enfin <i>g</i>(<i>x</i>) = 1 ⇔ sin <i>x</i> = sin 1, qui a deux solutions par période : 4 dans [0 ; 4π].</p>'},
]},

/* ===================== 3. Formules trigonométriques ===================== */
{subj:'an2', sem:'aut', id:'an2-formules', h:'Formules trigonométriques', p:'Pythagore sur le cercle, formules d’addition, angle double et somme-produit.', steps:[
 {h:'La relation fondamentale',p:`Le point (cos <i>x</i> ; sin <i>x</i>) est sur le cercle de rayon 1, donc par Pythagore : <b>sin²<i>x</i> + cos²<i>x</i> = 1</b> pour tout <i>x</i> réel. En divisant par cos²<i>x</i>, on obtient aussi <b>1 + tan²<i>x</i> = ${F(1,'cos²<i>x</i>')}</b>.`,
  params:[{id:'t',l:'x',min:0,max:360,step:15,v:30,u:'°'}],
  draw:v=>{ const x=rad(v.t), c=Math.cos(x), s=Math.sin(x), P=circle({R:1.35});
    P.poly([[0,0],[c,0],[c,s]],{fill:'var(--accent)',fo:.15,c:null}).seg(0,0,c,0,{c:'var(--math)',w:5}).seg(c,0,c,s,{c:'var(--spark)',w:5}); ray(P,x);
    P.text(c/2,0,'cos x',{a:'middle',dy:s>=0?16:-8,s:11,c:'var(--math)'}).dot(c,s,{c:'var(--accent)'}); return P.svg(); },
  info:v=>{ const c=Math.cos(rad(v.t)), s=Math.sin(rad(v.t)); return `cos² x ≈ ${fmt(c*c,3)} · sin² x ≈ ${fmt(s*s,3)} · somme = <b>1</b>`; }},
 {kind:'Méthode',h:'Du cosinus au sinus (et à la tangente)',p:`<b>Quand ?</b> On connaît une seule des valeurs cos <i>x</i>, sin <i>x</i>, et le quadrant de <i>x</i>. On demande les autres.<br><b>Pourquoi ça marche ?</b> sin²<i>x</i> + cos²<i>x</i> = 1 donne la valeur manquante au carré, donc <b>au signe près</b>. Le quadrant dit où est le point M, donc le signe de chaque coordonnée.<br><b>Comment ?</b> 1) Calcule sin²<i>x</i> = 1 − cos²<i>x</i> (ou l’inverse). 2) Prends la racine et choisis le signe avec le quadrant. 3) Termine par tan <i>x</i> = sin <i>x</i> / cos <i>x</i>.`,
  demo:{enonce:'On sait que cos <i>x</i> = −5/13 et <i>x</i> ∈ [π ; 3π/2]. Calcule sin <i>x</i> et tan <i>x</i>.',
   etapes:[
    {f:'sin²<i>x</i> = 1 − 25/169 = 144/169.',w:'La relation fondamentale donne le carré du sinus.'},
    {f:'sin <i>x</i> = ±12/13.',w:'Une racine carrée laisse deux signes possibles.'},
    {f:'<i>x</i> ∈ [π ; 3π/2] : le point est en bas à gauche, donc sin <i>x</i> = −12/13.',w:'Dans le 3e quadrant, l’ordonnée est négative.'},
    {f:'tan <i>x</i> = (−12/13) / (−5/13) = 12/5.',w:'Deux nombres négatifs : la tangente est positive, comme toujours dans le 3e quadrant.'}],
   conclusion:'sin x = −12/13 et tan x = 12/5. Sans le quadrant, on ne pourrait pas trancher entre +12/13 et −12/13.'}},
 {h:'Retrouver le cosinus',p:`On sait que sin <i>x</i> = ${F(3,5)} et <i>x</i> ∈ [${F('π',2)} ; π]. Combien vaut cos <i>x</i>&nbsp;?`,opts:['4/5','−4/5','−3/4','2/5'],ans:1,
  why:'cos² x = 1 − 9/25 = 16/25, donc cos x = ±4/5. Dans le 2e quadrant, le cosinus est négatif : cos x = −4/5.',
  note:'La relation fondamentale donne le cosinus au signe près. Le quadrant fixe le signe.'},
 {h:'Formules d’addition',p:`<b>cos(<i>a</i> + <i>b</i>) = cos <i>a</i> cos <i>b</i> − sin <i>a</i> sin <i>b</i></b><br><b>sin(<i>a</i> + <i>b</i>) = sin <i>a</i> cos <i>b</i> + cos <i>a</i> sin <i>b</i></b><br>Ajouter des angles, c’est composer deux rotations. Remplace <i>b</i> par −<i>b</i> pour obtenir les formules de différence.`,
  params:[{id:'a',l:'a',min:0,max:180,step:15,v:45,u:'°'},{id:'b',l:'b',min:0,max:180,step:15,v:30,u:'°'}],
  draw:v=>{ const a=rad(v.a), b=rad(v.b), P=circle({R:1.35});
    arc(P,0,a,.3,{c:'var(--math)',w:4}); arc(P,a,a+b,.45,{c:'var(--spark)',w:4});
    ray(P,a,{c:'var(--math)'}); ray(P,a+b);
    P.dot(Math.cos(a),Math.sin(a),{c:'var(--math)',l:'a'}).dot(Math.cos(a+b),Math.sin(a+b),{c:'var(--accent)',l:'a + b'}); return P.svg(); },
  info:v=>{ const a=rad(v.a), b=rad(v.b); return `cos a cos b − sin a sin b ≈ ${fmt(Math.cos(a)*Math.cos(b)-Math.sin(a)*Math.sin(b),3)} = cos(a + b) ≈ ${fmt(Math.cos(a+b),3)}`; },
  note:'Pour la tangente : tan(a + b) = (tan a + tan b) / (1 − tan a tan b). Et attention : cos(a + b) ≠ cos a + cos b.'},
 {kind:'Méthode',h:'Une valeur exacte par décomposition',p:`<b>Quand ?</b> On veut la valeur exacte de sin, cos ou tan d’un angle qui n’est pas dans la table, comme 15°, 75° ou 7π/12.<br><b>Pourquoi ça marche ?</b> Ces angles sont des sommes ou des différences d’angles de la table (30°, 45°, 60°). Les formules d’addition ramènent le calcul à des valeurs connues.<br><b>Comment ?</b> 1) Écris l’angle comme <i>a</i> + <i>b</i> ou <i>a</i> − <i>b</i> avec <i>a</i>, <i>b</i> dans la table. 2) Applique la bonne formule, avec ses signes. 3) Remplace et simplifie les produits de racines.`,
  demo:{enonce:'Calcule la valeur exacte de cos 75°.',
   etapes:[
    {f:'75° = 45° + 30°.',w:'Deux angles de la table.'},
    {f:'cos 75° = cos 45° cos 30° − sin 45° sin 30°.',w:'Formule d’addition du cosinus : le signe est moins pour une somme.'},
    {f:'= (√2/2)(√3/2) − (√2/2)(1/2) = √6/4 − √2/4.',w:'On remplace par les valeurs de la table et on multiplie les racines : √2 · √3 = √6.'},
    {f:'cos 75° = (√6 − √2)/4 ≈ 0,259.',w:'Contrôle à la calculatrice : cos 75° ≈ 0,2588.'}],
   conclusion:'cos 75° = (√6 − √2)/4. C’est aussi sin 15°, car 75° et 15° sont complémentaires.'}},
 {h:'Une valeur exacte',p:'Utilise 15° = 45° − 30° pour trouver sin 15°.',opts:['(√6 + √2)/4','(√3 − 1)/2','(√6 − √2)/4','√2/4'],ans:2,
  why:'sin(45° − 30°) = sin 45° cos 30° − cos 45° sin 30° = (√2/2)(√3/2) − (√2/2)(1/2) = (√6 − √2)/4 ≈ 0,259.'},
 {h:'Angle double et linéarisation',p:`Avec <i>a</i> = <i>b</i> : <b>sin 2<i>a</i> = 2 sin <i>a</i> cos <i>a</i></b> et <b>cos 2<i>a</i> = cos²<i>a</i> − sin²<i>a</i> = 2cos²<i>a</i> − 1 = 1 − 2sin²<i>a</i></b>. On en tire les formules de <b>linéarisation</b> : cos²<i>a</i> = ${F('1 + cos 2<i>a</i>',2)} et sin²<i>a</i> = ${F('1 − cos 2<i>a</i>',2)}.`,
  fig:(()=>{ const P=plane({x:[-.3,6.6],y:[-1.2,1.2],step:PI/2,h:130});
    P.fn(x=>Math.cos(2*x),{c:'var(--muted)',w:2,dash:true}).seg(-.3,.5,6.6,.5,{c:'var(--line)',w:1.5}).fn(x=>Math.sin(x)**2,{c:'var(--accent)'});
    P.text(3.6,1,'sin² x',{c:'var(--accent)'}).text(.5,-.9,'cos 2x',{c:'var(--muted)'}); ticksPi(P,.1,6.5,0,2); return P.svg(); })(),
  note:'sin² x oscille autour de 1/2 deux fois plus vite que sin x : c’est exactement (1 − cos 2x)/2.'},
 {h:'Cosinus double',p:`On sait que cos <i>a</i> = ${F(1,3)}. Calcule cos 2<i>a</i> (une fraction est acceptée).`,lab:'cos 2a =',ans:-7/9,tol:.001,
  why:'cos 2a = 2cos² a − 1 = 2 · 1/9 − 1 = −7/9.'},
 {kind:'Méthode',h:'Linéariser sin² et cos²',p:`<b>Quand ?</b> Une expression contient des carrés (ou des produits) de sinus et cosinus : pour trouver une valeur exacte d’un angle moitié, étudier une oscillation, plus tard pour intégrer.<br><b>Pourquoi ça marche ?</b> Les deux écritures de cos 2<i>a</i> donnent <b>cos²<i>a</i> = ${F('1 + cos 2<i>a</i>',2)}</b> et <b>sin²<i>a</i> = ${F('1 − cos 2<i>a</i>',2)}</b>, ainsi que sin <i>a</i> cos <i>a</i> = ½ sin 2<i>a</i>. Un carré devient une expression <b>du premier degré</b> en cos 2<i>a</i>.<br><b>Comment ?</b> Remplace chaque carré par sa formule, en doublant l’angle. Recommence si un carré réapparaît.`,
  demo:{enonce:'Linéarise sin²<i>x</i> cos²<i>x</i>, puis calcule la valeur exacte de cos²(π/12).',
   etapes:[
    {f:'sin <i>x</i> cos <i>x</i> = ½ sin 2<i>x</i>, donc sin²<i>x</i> cos²<i>x</i> = ¼ sin²2<i>x</i>.',w:'On regroupe d’abord le produit, grâce à la formule de l’angle double.'},
    {f:'sin²2<i>x</i> = (1 − cos 4<i>x</i>)/2.',w:'On linéarise le carré restant : l’angle 2x double et devient 4x.'},
    {f:'sin²<i>x</i> cos²<i>x</i> = (1 − cos 4<i>x</i>)/8.',w:'On multiplie par ¼. Plus aucun carré : l’expression est linéarisée.'},
    {f:'cos²(π/12) = (1 + cos(π/6))/2 = (1 + √3/2)/2 = (2 + √3)/4 ≈ 0,933.',w:'Avec a = π/12, l’angle double π/6 est dans la table.'}],
   conclusion:'sin²x cos²x = (1 − cos 4x)/8 oscille entre 0 et 1/4. Et cos²(π/12) = (2 + √3)/4.'}},
 {h:'Un angle moitié',p:'Avec la linéarisation, calcule sin²(π/8). Arrondis au dix-millième.',lab:'sin²(π/8) =',ans:.1464,tol:.00006,
  why:'sin²(π/8) = (1 − cos(π/4))/2 = (1 − √2/2)/2 = (2 − √2)/4 ≈ 0,1464.'},
 {h:'Linéarise',p:'Quelle est la forme linéarisée de cos²(3<i>x</i>)&nbsp;?',opts:['(1 − cos 6x)/2','(1 + cos 3x)/2','(1 + cos 6x)/2','1 + cos 6x'],ans:2,
  why:'cos² a = (1 + cos 2a)/2 avec a = 3x : cos²(3x) = (1 + cos 6x)/2.'},
 {h:'Somme en produit',p:`Les formules de <b>transformation somme-produit</b> :<br>sin <i>p</i> + sin <i>q</i> = 2 sin ${F('<i>p</i> + <i>q</i>',2)} cos ${F('<i>p</i> − <i>q</i>',2)}<br>cos <i>p</i> + cos <i>q</i> = 2 cos ${F('<i>p</i> + <i>q</i>',2)} cos ${F('<i>p</i> − <i>q</i>',2)}<br>Ici <i>y</i> = sin <i>px</i> + sin <i>qx</i> : quand <i>p</i> et <i>q</i> sont proches, la somme oscille vite dans une enveloppe lente (les <b>battements</b>).`,
  params:[{id:'p',l:'p',min:1,max:12,step:1,v:9},{id:'q',l:'q',min:1,max:12,step:1,v:8}],
  draw:v=>{ const P=plane({x:[0,6.3],y:[-2.3,2.3],step:PI/2,w:320,h:200}), e=x=>2*Math.cos((v.p-v.q)*x/2);
    P.fn(e,{c:'var(--math)',w:2,dash:true}).fn(x=>-e(x),{c:'var(--math)',w:2,dash:true}).fn(x=>Math.sin(v.p*x)+Math.sin(v.q*x),{c:'var(--accent)',w:2.5,n:800}); return P.svg(); },
  info:v=>`sin ${v.p}x + sin ${v.q}x = 2 sin ${fmt((v.p+v.q)/2,1)}x · cos ${fmt((v.p-v.q)/2,1)}x`,
  note:'Les deux autres : sin p − sin q = 2 cos((p + q)/2) sin((p − q)/2) et cos p − cos q = −2 sin((p + q)/2) sin((p − q)/2).'},
 {kind:'Méthode',h:'Factoriser une somme de sinus ou de cosinus',p:`<b>Quand ?</b> Une expression contient sin <i>p</i> ± sin <i>q</i> ou cos <i>p</i> ± cos <i>q</i>, et on veut un produit : pour résoudre une équation (produit nul), étudier un signe, voir des battements.<br><b>Pourquoi ça marche ?</b> En écrivant <i>p</i> = <i>u</i> + <i>v</i> et <i>q</i> = <i>u</i> − <i>v</i>, avec <i>u</i> = (<i>p</i> + <i>q</i>)/2 et <i>v</i> = (<i>p</i> − <i>q</i>)/2, les formules d’addition font disparaître la moitié des termes : par exemple sin(<i>u</i> + <i>v</i>) + sin(<i>u</i> − <i>v</i>) = 2 sin <i>u</i> cos <i>v</i>.<br><b>Comment ?</b> 1) Repère <i>p</i> et <i>q</i>. 2) Calcule la demi-somme et la demi-différence. 3) Choisis la formule qui correspond aux fonctions et au signe.`,
  demo:{enonce:'Écris sin 5<i>x</i> − sin <i>x</i> sous forme de produit.',
   etapes:[
    {f:'<i>p</i> = 5<i>x</i>, <i>q</i> = <i>x</i>.',w:'On identifie les deux angles.'},
    {f:'(<i>p</i> + <i>q</i>)/2 = 3<i>x</i> et (<i>p</i> − <i>q</i>)/2 = 2<i>x</i>.',w:'Demi-somme et demi-différence.'},
    {f:'sin <i>p</i> − sin <i>q</i> = 2 cos((<i>p</i> + <i>q</i>)/2) sin((<i>p</i> − <i>q</i>)/2).',w:'C’est une différence de sinus : le cosinus porte la demi-somme.'},
    {f:'sin 5<i>x</i> − sin <i>x</i> = 2 cos 3<i>x</i> sin 2<i>x</i>.',w:'Contrôle en x = 0,3 : sin 1,5 − sin 0,3 ≈ 0,702 et 2 cos 0,9 sin 0,6 ≈ 0,702.'}],
   conclusion:'sin 5x − sin x = 2 cos 3x sin 2x. Ce produit s’annule dès que cos 3x = 0 ou sin 2x = 0.'}},
 {kind:'Défi',h:'Factorise',p:'Écris cos 3<i>x</i> + cos <i>x</i> sous forme de produit.',opts:['2 cos 2x cos x','2 sin 2x sin x','−2 sin 2x sin x','2 cos 4x cos 2x'],ans:0,
  why:'Avec p = 3x et q = x : (p + q)/2 = 2x et (p − q)/2 = x, donc cos 3x + cos x = 2 cos 2x cos x.'},
 {kind:'Méthode',h:'Écrire a cos x + b sin x = R cos(x − φ)',p:`<b>Quand ?</b> Une somme <i>a</i> cos <i>x</i> + <i>b</i> sin <i>x</i> (même angle <i>x</i>) : pour trouver son maximum, résoudre <i>a</i> cos <i>x</i> + <i>b</i> sin <i>x</i> = <i>c</i>, lire l’amplitude d’une vibration.<br><b>Pourquoi ça marche ?</b> Avec <b><i>R</i> = √(<i>a</i>² + <i>b</i>²)</b>, le point (<i>a</i>/<i>R</i> ; <i>b</i>/<i>R</i>) est sur le cercle trigonométrique : il existe un angle <i>φ</i> avec <b>cos <i>φ</i> = <i>a</i>/<i>R</i></b> et <b>sin <i>φ</i> = <i>b</i>/<i>R</i></b>. Alors <i>a</i> cos <i>x</i> + <i>b</i> sin <i>x</i> = <i>R</i>(cos <i>φ</i> cos <i>x</i> + sin <i>φ</i> sin <i>x</i>) = <i>R</i> cos(<i>x</i> − <i>φ</i>), par la formule d’addition.<br><b>Comment ?</b> 1) Calcule <i>R</i>. 2) Trouve <i>φ</i> avec cos <i>φ</i> = <i>a</i>/<i>R</i> et sin <i>φ</i> = <i>b</i>/<i>R</i> : les signes donnent le quadrant (si <i>a</i> &gt; 0, <i>φ</i> = arctan(<i>b</i>/<i>a</i>)). 3) Conclus : l’expression varie entre −<i>R</i> et <i>R</i>.`,
  demo:{enonce:'Écris √3 cos <i>x</i> + sin <i>x</i> sous la forme <i>R</i> cos(<i>x</i> − <i>φ</i>) et donne son maximum.',
   etapes:[
    {f:'<i>R</i> = √(3 + 1) = 2.',w:'a = √3 et b = 1.'},
    {f:'√3 cos <i>x</i> + sin <i>x</i> = 2(√3/2 · cos <i>x</i> + 1/2 · sin <i>x</i>).',w:'On met R en facteur : les coefficients deviennent un cosinus et un sinus d’un même angle.'},
    {f:'cos <i>φ</i> = √3/2 et sin <i>φ</i> = 1/2, donc <i>φ</i> = π/6.',w:'Les deux sont positifs : φ est dans le 1er quadrant, et la table donne π/6.'},
    {f:'√3 cos <i>x</i> + sin <i>x</i> = 2 cos(<i>x</i> − π/6).',w:'cos(x − π/6) = cos x cos(π/6) + sin x sin(π/6) : on retrouve bien l’expression de départ.'},
    {f:'Maximum 2, atteint quand <i>x</i> − π/6 = 0, soit <i>x</i> = π/6.',w:'Un cosinus vaut au plus 1.'}],
   conclusion:'√3 cos x + sin x = 2 cos(x − π/6), qui varie entre −2 et 2. On peut aussi viser la forme R sin(x + φ) : on identifie alors R cos φ au coefficient de sin x et R sin φ à celui de cos x.'},
  note:'Si a &lt; 0, arctan(b/a) donne le mauvais quadrant : ajoute π, ou raisonne avec les signes de cos φ et sin φ.'},
 {h:'L’amplitude',p:'Quelle est la plus grande valeur de 5 cos <i>x</i> + 12 sin <i>x</i>&nbsp;?',lab:'max =',ans:13,
  why:'R = √(25 + 144) = 13, et 5 cos x + 12 sin x = 13 cos(x − φ) avec cos φ = 5/13, sin φ = 12/13. Le maximum vaut 13.'},
 {h:'La bonne forme',p:'Laquelle de ces écritures est égale à cos <i>x</i> − √3 sin <i>x</i>&nbsp;?',opts:['2 cos(x − π/3)','2 sin(x + π/3)','√2 cos(x + π/4)','2 cos(x + π/3)'],ans:3,
  why:'R = √(1 + 3) = 2, cos φ = 1/2 et sin φ = −√3/2, donc φ = −π/3. Ainsi cos x − √3 sin x = 2 cos(x − (−π/3)) = 2 cos(x + π/3).'},
 {kind:'Problème',h:'Superposer deux vibrations',
  p:'Deux vibrations de même fréquence se superposent : <i>f</i>(<i>t</i>) = 3 sin <i>t</i> + 4 cos <i>t</i>. On veut l’écrire comme une seule vibration <b><i>f</i>(<i>t</i>) = <i>R</i> sin(<i>t</i> + <i>φ</i>)</b> avec <i>R</i> &gt; 0, pour lire directement son amplitude et son décalage.',
  parts:[
   {q:'a) En développant <i>R</i> sin(<i>t</i> + <i>φ</i>), quelles conditions obtiens-tu&nbsp;?',opts:['R sin φ = 3 et R cos φ = 4','R cos φ = 3 et R sin φ = 4','R = 3 + 4 et φ = 0','R cos φ = 4 et R sin φ = 4'],ans:1,hint:'sin(t + φ) = sin t cos φ + cos t sin φ. Identifie le coefficient de sin t, puis celui de cos t.',why:'R sin(t + φ) = R cos φ · sin t + R sin φ · cos t. On identifie : R cos φ = 3 et R sin φ = 4.'},
   {q:'b) Quelle est l’amplitude <i>R</i>&nbsp;?',lab:'R =',ans:5,hint:'Élève les deux conditions au carré et additionne : la relation fondamentale fait le reste.',why:'R²(cos² φ + sin² φ) = 9 + 16 = 25, donc R = 5.'},
   {q:'c) Quel est le décalage <i>φ</i> en radians, arrondi au millième&nbsp;?',lab:'φ =',unit:'rad',ans:.927,tol:.0006,hint:'tan φ = 4/3, et φ est dans le 1er quadrant puisque cos φ et sin φ sont positifs.',why:'cos φ = 3/5 > 0 et sin φ = 4/5 > 0, donc φ = arctan(4/3) ≈ 0,927 rad.'},
   {q:'d) À quel premier instant <i>t</i> &gt; 0 la vibration atteint-elle son maximum&nbsp;? Arrondis au millième.',lab:'t =',ans:.644,tol:.0006,hint:'Le sinus vaut 1 quand son argument vaut π/2.',why:'t + φ = π/2 donne t = π/2 − 0,927 ≈ 0,644. Alors f(t) = 5.'},
  ],
  sol:'<p>On développe : <i>R</i> sin(<i>t</i> + <i>φ</i>) = <i>R</i> cos <i>φ</i> sin <i>t</i> + <i>R</i> sin <i>φ</i> cos <i>t</i>. L’identification avec 3 sin <i>t</i> + 4 cos <i>t</i> donne <i>R</i> cos <i>φ</i> = 3 et <i>R</i> sin <i>φ</i> = 4.</p><p>En sommant les carrés, <i>R</i>² = 25, donc <i>R</i> = 5. Puis cos <i>φ</i> = 3/5 et sin <i>φ</i> = 4/5 : <i>φ</i> = arctan(4/3) ≈ 0,927 rad.</p><p>Donc <i>f</i>(<i>t</i>) = 5 sin(<i>t</i> + 0,927). Son maximum 5 est atteint quand <i>t</i> + <i>φ</i> = π/2, soit <i>t</i> ≈ 0,644. On vérifie : 3 sin(0,644) + 4 cos(0,644) ≈ 3 · 0,6 + 4 · 0,8 = 5.</p>'},
 {kind:'Problème',h:'La valeur exacte de sin 18°',
  p:'On veut une valeur exacte de sin 18°, utile pour construire le pentagone régulier. Pose <i>θ</i> = 18°. L’astuce : 5<i>θ</i> = 90°, donc 2<i>θ</i> = 90° − 3<i>θ</i>, et deux angles complémentaires vérifient sin <i>a</i> = cos(90° − <i>a</i>). On en tire une équation pour <i>s</i> = sin <i>θ</i>.',
  parts:[
   {q:'a) En écrivant 3<i>θ</i> = 2<i>θ</i> + <i>θ</i>, à quoi est égal cos 3<i>θ</i>&nbsp;?',opts:['3 cos θ − 4 cos³ θ','4 cos³ θ − 3 cos θ','cos³ θ − 3 cos θ','3 cos θ'],ans:1,hint:'cos(2θ + θ) = cos 2θ cos θ − sin 2θ sin θ, puis remplace sin² θ par 1 − cos² θ.',why:'cos 3θ = (2cos² θ − 1) cos θ − 2 sin² θ cos θ = 2cos³ θ − cos θ − 2(1 − cos² θ) cos θ = 4cos³ θ − 3cos θ.'},
   {q:'b) De sin 2<i>θ</i> = cos 3<i>θ</i>, après division par cos <i>θ</i> ≠ 0, quelle équation vérifie <i>s</i> = sin <i>θ</i>&nbsp;?',opts:['4s² − 2s − 1 = 0','2s² + s − 1 = 0','s² + s − 1 = 0','4s² + 2s − 1 = 0'],ans:3,hint:'Le membre de gauche vaut 2 sin θ cos θ. À droite, mets cos θ en facteur et écris cos² θ = 1 − s².',why:'2s cos θ = cos θ(4cos² θ − 3) donne 2s = 4(1 − s²) − 3 = 1 − 4s², soit 4s² + 2s − 1 = 0.'},
   {q:'c) Calcule sin 18° (la racine qui convient), arrondi au dix-millième.',lab:'sin 18° =',ans:.309,tol:.00006,hint:'Le trinôme a une racine positive et une négative. sin 18° est positif.',why:'s = (−2 + √20)/8 = (√5 − 1)/4 ≈ 0,3090. L’autre racine, −(1 + √5)/4, est négative.'},
   {q:'d) Déduis-en cos 36°, arrondi au dix-millième.',lab:'cos 36° =',ans:.809,tol:.00006,hint:'cos 2θ = 1 − 2 sin² θ, avec 2θ = 36°.',why:'cos 36° = 1 − 2s² = 1 − 2(6 − 2√5)/16 = (1 + √5)/4 ≈ 0,8090, la moitié du nombre d’or.'},
  ],
  sol:'<p>Avec <i>θ</i> = 18°, 2<i>θ</i> et 3<i>θ</i> sont complémentaires, donc sin 2<i>θ</i> = cos 3<i>θ</i>.</p><p>La formule d’addition donne cos 3<i>θ</i> = 4cos³<i>θ</i> − 3cos <i>θ</i>. L’équation devient 2<i>s</i> cos <i>θ</i> = cos <i>θ</i>(4cos²<i>θ</i> − 3). On divise par cos <i>θ</i> ≠ 0 et on écrit cos²<i>θ</i> = 1 − <i>s</i>² : 2<i>s</i> = 1 − 4<i>s</i>², soit 4<i>s</i>² + 2<i>s</i> − 1 = 0.</p><p>Les racines sont (−1 ± √5)/4. Comme sin 18° &gt; 0, <b>sin 18° = (√5 − 1)/4 ≈ 0,3090</b>. Enfin cos 36° = 1 − 2 sin² 18° = <b>(1 + √5)/4 ≈ 0,8090</b>.</p>'},
]},

/* ===================== 4. Équations trigonométriques ===================== */
{subj:'an2', sem:'aut', id:'an2-equations', h:'Équations trigonométriques', p:'Résoudre sin x = a, cos x = a, tan x = a et s’y ramener.', steps:[
 {h:'sin x = a : deux familles',p:`Pour |<i>a</i>| ≤ 1, la droite <i>y</i> = <i>a</i> coupe le cercle en deux points, d’angles <i>α</i> = arcsin <i>a</i> et π − <i>α</i>. Avec les tours complets : <b><i>x</i> = <i>α</i> + 2<i>k</i>π ou <i>x</i> = π − <i>α</i> + 2<i>k</i>π</b>, <i>k</i> ∈ ℤ. Si |<i>a</i>| > 1, il n’y a aucune solution.`,
  params:[{id:'a',l:'a',min:-1,max:1,step:.1,v:.5}],
  draw:v=>{ const al=Math.asin(v.a), P=circle({R:1.4}); P.seg(-1.4,v.a,1.4,v.a,{c:'var(--bad)',w:1.5,dash:true});
    ray(P,al,{c:'var(--accent)'}); ray(P,PI-al,{c:'var(--math)'});
    P.dot(Math.cos(al),v.a,{c:'var(--accent)',l:'α'}).dot(Math.cos(PI-al),v.a,{c:'var(--math)',l:'π − α',dx:-50}); return P.svg(); },
  info:v=>{ const al=Math.asin(v.a); return `α ≈ ${fmt(al,3)} · π − α ≈ ${fmt(PI-al,3)}${Math.abs(v.a)===1?' · les deux points sont confondus':''}`; }},
 {h:'cos x = a et tan x = a',p:`<b>cos <i>x</i> = <i>a</i></b> (|<i>a</i>| ≤ 1) : <i>x</i> = ± arccos <i>a</i> + 2<i>k</i>π, car les deux points sont symétriques par rapport à l’axe horizontal.<br><b>tan <i>x</i> = <i>a</i></b> (tout <i>a</i> réel) : <i>x</i> = arctan <i>a</i> + <i>k</i>π, car tan est π-périodique. Ci-dessous, cos <i>x</i> = ½ sur [−2π ; 2π].`,
  fig:(()=>{ const P=plane({x:[-6.6,6.6],y:[-1.3,1.3],step:PI/2,h:130}); P.seg(-6.6,.5,6.6,.5,{c:'var(--bad)',w:1.5,dash:true}).fn(Math.cos,{c:'var(--math)'});
    [-5,-1,1,5].forEach(k=>P.dot(k*PI/3,.5,{c:'var(--accent)',r:5})); ticksPi(P,-6.5,6.5,0,1); P.text(-PI/3,.5,'−π/3',{a:'middle',dy:-10,s:11}).text(PI/3,.5,'π/3',{a:'middle',dy:-10,s:11}); return P.svg(); })(),
  note:'N’oublie jamais le « + 2kπ » (ou « + kπ » pour tan) : sinon tu perds une infinité de solutions.'},
 {kind:'Méthode',h:'Toutes les solutions, en trois gestes',p:`<b>Quand ?</b> Pour toute équation de base sin <i>x</i> = <i>a</i>, cos <i>x</i> = <i>a</i> ou tan <i>x</i> = <i>a</i>, sur ℝ ou dans un intervalle.<br><b>Pourquoi ça marche ?</b> Sur un tour, il y a deux points de même sinus (<i>α</i> et π − <i>α</i>), deux points de même cosinus (<i>α</i> et −<i>α</i>), et un seul angle de ]−π/2 ; π/2[ de tangente donnée. La périodicité ajoute ensuite tous les tours.<br><b>Comment ?</b> 1) Vérifie que |<i>a</i>| ≤ 1 (pour sin et cos) et trouve un angle de base <i>α</i> avec arcsin, arccos ou arctan. 2) Écris les familles : <i>α</i> + 2<i>k</i>π et π − <i>α</i> + 2<i>k</i>π (sin) ; ±<i>α</i> + 2<i>k</i>π (cos) ; <i>α</i> + <i>k</i>π (tan). 3) Si un intervalle est imposé, essaie <i>k</i> = −1, 0, 1, 2… et garde les valeurs qui tombent dedans.`,
  demo:{enonce:'Résous sin <i>x</i> = −√2/2, puis tan <i>x</i> = −√3, dans [0 ; 2π[.',
   etapes:[
    {f:'|−√2/2| ≤ 1 et <i>α</i> = arcsin(−√2/2) = −π/4.',w:'sin(π/4) = √2/2 et sin est impaire.'},
    {f:'<i>x</i> = −π/4 + 2<i>k</i>π ou <i>x</i> = π + π/4 + 2<i>k</i>π = 5π/4 + 2<i>k</i>π.',w:'Deuxième famille : π − α = π − (−π/4).'},
    {f:'Dans [0 ; 2π[ : −π/4 + 2π = 7π/4 (<i>k</i> = 1) et 5π/4 (<i>k</i> = 0).',w:'−π/4 seul est négatif, il faut un tour de plus. 5π/4 + 2π dépasse 2π.'},
    {f:'tan <i>x</i> = −√3 : <i>α</i> = arctan(−√3) = −π/3, donc <i>x</i> = −π/3 + <i>k</i>π.',w:'Une seule famille, de période π.'},
    {f:'Dans [0 ; 2π[ : 2π/3 (<i>k</i> = 1) et 5π/3 (<i>k</i> = 2).',w:'On ajoute π autant de fois qu’il faut pour entrer dans l’intervalle, puis tant qu’on y reste.'}],
   conclusion:'sin x = −√2/2 : {5π/4 ; 7π/4}. tan x = −√3 : {2π/3 ; 5π/3}. Contrôle sur le cercle : les deux sinus négatifs sont en bas, les deux tangentes sont diamétralement opposées.'}},
 {h:'Solution générale',p:'Quelles sont les solutions de cos <i>x</i> = √2/2&nbsp;?',opts:['x = π/4 + kπ','x = ±π/4 + 2kπ','x = π/4 + 2kπ ou x = 3π/4 + 2kπ','x = ±3π/4 + 2kπ'],ans:1,
  why:'arccos(√2/2) = π/4, donc x = ±π/4 + 2kπ. La troisième proposition résout sin x = √2/2.'},
 {h:'Trouve une solution',p:'Règle <i>x</i> dans [0 ; 2π[ sur une solution de <b>sin <i>x</i> = −½</b>.',
  params:[{id:'t',l:'x',min:0,max:345,step:15,v:90,u:'°'}],
  draw:v=>{ const x=rad(v.t), P=circle({R:1.4}); P.seg(-1.4,-.5,1.4,-.5,{c:'var(--bad)',w:1.5,dash:true}); ray(P,x);
    P.seg(Math.cos(x),0,Math.cos(x),Math.sin(x),{c:'var(--spark)',w:5}).dot(Math.cos(x),Math.sin(x),{c:'var(--accent)'}); return P.svg(); },
  info:v=>`x = ${pf(v.t,180)} · sin x ≈ ${fmt(Math.sin(rad(v.t)),3)}`,ok:v=>v.t===210||v.t===330,
  why:'α = arcsin(−½) = −π/6. Les solutions sont −π/6 + 2kπ et π + π/6 + 2kπ. Dans [0 ; 2π[ : 7π/6 (210°) et 11π/6 (330°).'},
 {h:'Avec la tangente',p:'Combien de solutions l’équation tan <i>x</i> = 1 a-t-elle dans [0 ; 3π[&nbsp;?',lab:'nombre =',ans:3,
  why:'arctan 1 = π/4, donc x = π/4 + kπ. Dans [0 ; 3π[ : π/4, 5π/4 et 9π/4 (le suivant, 13π/4, dépasse 3π). Trois solutions.'},
 {kind:'Méthode',h:'Quand l’inconnue est dans un argument ax + b',p:`<b>Quand ?</b> L’équation porte sur sin(<i>ax</i> + <i>b</i>), cos(<i>ax</i> + <i>b</i>) ou tan(<i>ax</i> + <i>b</i>), par exemple cos 2<i>x</i> = ½.<br><b>Pourquoi ça marche ?</b> On pose <i>u</i> = <i>ax</i> + <i>b</i> : l’équation devient une équation de base en <i>u</i>. En revenant à <i>x</i>, on divise par <i>a</i>, <b>y compris la période</b> : 2<i>k</i>π devient 2<i>k</i>π/<i>a</i>. Il y a donc plus de solutions par tour quand <i>a</i> &gt; 1.<br><b>Comment ?</b> 1) Résous en <i>u</i> avec ses familles. 2) Isole <i>x</i> dans chaque famille. 3) Liste les solutions de l’intervalle en faisant varier <i>k</i>.`,
  demo:{enonce:'Résous sin(2<i>x</i> − π/3) = √3/2 dans [0 ; 2π[.',
   etapes:[
    {f:'<i>u</i> = 2<i>x</i> − π/3 : sin <i>u</i> = √3/2 ⇔ <i>u</i> = π/3 + 2<i>k</i>π ou <i>u</i> = 2π/3 + 2<i>k</i>π.',w:'arcsin(√3/2) = π/3, et π − π/3 = 2π/3.'},
    {f:'2<i>x</i> = 2π/3 + 2<i>k</i>π ou 2<i>x</i> = π + 2<i>k</i>π.',w:'On ajoute π/3 des deux côtés.'},
    {f:'<i>x</i> = π/3 + <i>k</i>π ou <i>x</i> = π/2 + <i>k</i>π.',w:'On divise tout par 2, la période aussi : 2kπ devient kπ.'},
    {f:'Dans [0 ; 2π[ : π/3, 4π/3, π/2, 3π/2.',w:'k = 0 et k = 1 dans chaque famille. k = 2 sort de l’intervalle.'}],
   conclusion:'Quatre solutions : {π/3 ; π/2 ; 4π/3 ; 3π/2}. Si on oubliait de diviser la période, on n’en trouverait que deux.'}},
 {h:'Compte les solutions',p:'Combien de solutions l’équation cos(2<i>x</i>) = ½ a-t-elle dans [0 ; 2π[&nbsp;?',lab:'nombre =',ans:4,
  why:'2x = ±π/3 + 2kπ, donc x = ±π/6 + kπ. Dans [0 ; 2π[ : π/6, 5π/6, 7π/6 et 11π/6, soit 4 solutions. Diviser par 2 transforme le « 2kπ » en « kπ ».'},
 {kind:'Méthode',h:'sin u = sin v et cos u = cos v',p:`<b>Quand ?</b> Les deux membres sont des sinus (ou deux cosinus) d’expressions différentes, comme cos 3<i>x</i> = cos <i>x</i>.<br><b>Pourquoi ça marche ?</b> Deux angles ont le même sinus exactement quand ils sont égaux ou associés par π − ·, à un tour près. Même idée pour le cosinus avec −·. D’où :<br><b>sin <i>u</i> = sin <i>v</i> ⇔ <i>u</i> = <i>v</i> + 2<i>k</i>π ou <i>u</i> = π − <i>v</i> + 2<i>k</i>π</b><br><b>cos <i>u</i> = cos <i>v</i> ⇔ <i>u</i> = <i>v</i> + 2<i>k</i>π ou <i>u</i> = −<i>v</i> + 2<i>k</i>π</b><br><b>Comment ?</b> 1) Écris les deux familles. 2) Résous chacune comme une équation du premier degré en <i>x</i> (divise aussi la période). 3) Regroupe les solutions et enlève les doublons.`,
  demo:{enonce:'Résous cos 3<i>x</i> = cos <i>x</i> sur ℝ.',
   etapes:[
    {f:'3<i>x</i> = <i>x</i> + 2<i>k</i>π ou 3<i>x</i> = −<i>x</i> + 2<i>k</i>π.',w:'On applique cos u = cos v avec u = 3x et v = x.'},
    {f:'2<i>x</i> = 2<i>k</i>π, donc <i>x</i> = <i>k</i>π.',w:'Première famille : on divise par 2, période comprise.'},
    {f:'4<i>x</i> = 2<i>k</i>π, donc <i>x</i> = <i>k</i>π/2.',w:'Deuxième famille : on divise par 4.'},
    {f:'Les <i>k</i>π sont déjà des <i>k</i>π/2 : les solutions sont <i>x</i> = <i>k</i>π/2.',w:'On fusionne les familles pour ne pas compter deux fois les mêmes nombres.'}],
   conclusion:'cos 3x = cos x ⇔ x = kπ/2, k ∈ ℤ. Pour une équation mixte comme cos u = sin v, remplace d’abord sin v par cos(π/2 − v).'}},
 {h:'Deux sinus',p:'Combien de solutions l’équation sin 3<i>x</i> = sin <i>x</i> a-t-elle dans [0 ; 2π[&nbsp;?',lab:'nombre =',ans:6,
  why:'3x = x + 2kπ donne x = kπ : 0 et π. 3x = π − x + 2kπ donne x = π/4 + kπ/2 : π/4, 3π/4, 5π/4, 7π/4. Aucune ne se répète : 6 solutions.'},
 {kind:'Méthode',h:'Se ramener à un trinôme',p:`Pour 2 sin²<i>x</i> − 3 sin <i>x</i> + 1 = 0, pose <b><i>t</i> = sin <i>x</i></b> avec <i>t</i> ∈ [−1 ; 1]. On résout 2<i>t</i>² − 3<i>t</i> + 1 = 0 : <i>t</i> = 1 ou <i>t</i> = ½. Puis sin <i>x</i> = 1 donne <i>x</i> = π/2 + 2<i>k</i>π, et sin <i>x</i> = ½ donne <i>x</i> = π/6 + 2<i>k</i>π ou 5π/6 + 2<i>k</i>π.`,
  fig:(()=>{ const P=plane({x:[-.3,6.6],y:[-1,6.3],step:PI/2,h:170}); P.fn(x=>2*Math.sin(x)**2-3*Math.sin(x)+1,{from:0,to:2*PI});
    [PI/6,PI/2,5*PI/6].forEach(x=>P.dot(x,0,{c:'var(--spark)',r:5})); ticksPi(P,.1,6.5,0,2); return P.svg(); })(),
  demo:{enonce:'Résous 2 sin²<i>x</i> + cos <i>x</i> − 1 = 0 sur ℝ.',
   etapes:[
    {f:'2(1 − cos²<i>x</i>) + cos <i>x</i> − 1 = 0, soit −2cos²<i>x</i> + cos <i>x</i> + 1 = 0.',w:'L’équation mélange sin² et cos : on remplace sin² x par 1 − cos² x pour n’avoir plus que cos x.'},
    {f:'On pose <i>t</i> = cos <i>x</i>, <i>t</i> ∈ [−1 ; 1] : 2<i>t</i>² − <i>t</i> − 1 = 0.',w:'On multiplie par −1 pour avoir un coefficient dominant positif. C’est un trinôme ordinaire en t.'},
    {f:'Δ = 1 + 8 = 9, <i>t</i> = (1 ± 3)/4, soit <i>t</i> = 1 ou <i>t</i> = −1/2.',w:'Les deux racines sont dans [−1 ; 1] : on les garde toutes les deux. Une racine hors de [−1 ; 1] serait rejetée, car un cosinus ne peut pas la valoir.'},
    {f:'cos <i>x</i> = 1 ⇔ <i>x</i> = 2<i>k</i>π ; cos <i>x</i> = −1/2 ⇔ <i>x</i> = ±2π/3 + 2<i>k</i>π.',w:'On revient à x avec les équations de base.'}],
   conclusion:'Solutions : x = 2kπ ou x = ±2π/3 + 2kπ. Contrôle en x = 2π/3 : 2 · 3/4 − 1/2 − 1 = 0.'},
  note:'Si l’équation mélange sin² et cos, remplace sin² x par 1 − cos² x pour n’avoir qu’une seule fonction. Rejette les racines t hors de [−1 ; 1].'},
 {h:'À toi',p:'Résous 2cos²<i>x</i> + cos <i>x</i> − 1 = 0 dans [0 ; 2π[.',opts:['{π/3 ; 5π/3}','{2π/3 ; 4π/3 ; 0}','{π/3 ; π ; 5π/3}','{π/6 ; π ; 11π/6}'],ans:2,
  why:'Avec t = cos x : 2t² + t − 1 = (2t − 1)(t + 1) = 0, donc t = ½ ou t = −1. cos x = ½ donne π/3 et 5π/3, cos x = −1 donne π.'},
 {kind:'Défi',h:'Avec un changement de fonction',p:'Résous 2 sin²<i>x</i> + 3 cos <i>x</i> = 0. Donne la plus petite solution de [0 ; 2π[ en radians, arrondie au centième.',lab:'x =',ans:2.09,tol:.006,
  why:'2(1 − cos² x) + 3 cos x = 0 ⇔ 2cos² x − 3 cos x − 2 = 0, racines t = 2 (rejetée, > 1) et t = −½. cos x = −½ donne 2π/3 ≈ 2,09 et 4π/3.'},
 {kind:'Méthode',h:'Factoriser plutôt que diviser',p:`<b>Quand ?</b> Le même facteur apparaît des deux côtés, comme dans sin 2<i>x</i> = sin <i>x</i> (une fois sin 2<i>x</i> développé) ou cos <i>x</i> sin <i>x</i> = cos <i>x</i>.<br><b>Pourquoi ça marche ?</b> Diviser par un facteur qui peut s’annuler fait <b>perdre</b> les solutions qui l’annulent. En revanche, un produit est nul si et seulement si l’un de ses facteurs est nul : on garde tout.<br><b>Comment ?</b> 1) Passe tout du même côté. 2) Développe si besoin (sin 2<i>x</i> = 2 sin <i>x</i> cos <i>x</i>, ou somme-produit) et mets le facteur commun en évidence. 3) Résous chaque facteur = 0, puis réunis les solutions.`,
  demo:{enonce:'Résous sin 2<i>x</i> = sin <i>x</i> dans [0 ; 2π[.',
   etapes:[
    {f:'2 sin <i>x</i> cos <i>x</i> − sin <i>x</i> = 0.',w:'On développe sin 2x et on passe tout à gauche.'},
    {f:'sin <i>x</i> (2 cos <i>x</i> − 1) = 0.',w:'sin x est un facteur commun. On ne divise pas par sin x, qui peut valoir 0.'},
    {f:'sin <i>x</i> = 0 ⇔ <i>x</i> = <i>k</i>π : 0 et π.',w:'Premier facteur.'},
    {f:'cos <i>x</i> = 1/2 ⇔ <i>x</i> = ±π/3 + 2<i>k</i>π : π/3 et 5π/3.',w:'Second facteur.'}],
   conclusion:'Quatre solutions : {0 ; π/3 ; π ; 5π/3}. En divisant par sin x, on aurait perdu 0 et π.'}},
 {h:'Un facteur commun',p:'Combien de solutions l’équation sin 2<i>x</i> = cos <i>x</i> a-t-elle dans [0 ; 2π[&nbsp;?',lab:'nombre =',ans:4,
  why:'2 sin x cos x − cos x = cos x (2 sin x − 1) = 0. cos x = 0 donne π/2 et 3π/2, sin x = ½ donne π/6 et 5π/6. Quatre solutions.'},
 {kind:'Méthode',h:'Résoudre a cos x + b sin x = c',p:`<b>Quand ?</b> L’équation mélange cos <i>x</i> et sin <i>x</i> au premier degré, avec un second membre constant.<br><b>Pourquoi ça marche ?</b> Le chapitre Formules montre que <i>a</i> cos <i>x</i> + <i>b</i> sin <i>x</i> = <i>R</i> cos(<i>x</i> − <i>φ</i>), avec <i>R</i> = √(<i>a</i>² + <i>b</i>²), cos <i>φ</i> = <i>a</i>/<i>R</i> et sin <i>φ</i> = <i>b</i>/<i>R</i>. L’équation devient cos(<i>x</i> − <i>φ</i>) = <i>c</i>/<i>R</i> : une équation de base avec un argument décalé.<br><b>Comment ?</b> 1) Calcule <i>R</i> et <i>φ</i>. 2) Si |<i>c</i>| &gt; <i>R</i>, il n’y a aucune solution. 3) Sinon, résous cos <i>u</i> = <i>c</i>/<i>R</i> avec <i>u</i> = <i>x</i> − <i>φ</i>, puis ajoute <i>φ</i>.`,
  demo:{enonce:'Résous cos <i>x</i> + √3 sin <i>x</i> = 1 sur ℝ.',
   etapes:[
    {f:'<i>R</i> = √(1 + 3) = 2, cos <i>φ</i> = 1/2, sin <i>φ</i> = √3/2, donc <i>φ</i> = π/3.',w:'a = 1 et b = √3 sont positifs : φ est dans le 1er quadrant.'},
    {f:'L’équation devient 2 cos(<i>x</i> − π/3) = 1, soit cos(<i>x</i> − π/3) = 1/2.',w:'|1| ≤ 2 : il y a des solutions.'},
    {f:'<i>x</i> − π/3 = ±π/3 + 2<i>k</i>π.',w:'arccos(1/2) = π/3.'},
    {f:'<i>x</i> = 2π/3 + 2<i>k</i>π ou <i>x</i> = 2<i>k</i>π.',w:'On ajoute π/3 dans les deux familles.'}],
   conclusion:'Solutions : x = 2kπ ou x = 2π/3 + 2kπ. Contrôle en 2π/3 : −1/2 + √3 · √3/2 = −1/2 + 3/2 = 1.'}},
 {h:'Une combinaison',p:'Résous √3 cos <i>x</i> − sin <i>x</i> = √2. Donne la plus petite solution positive en radians, arrondie au millième.',lab:'x =',ans:.262,tol:.0006,
  why:'R = 2, cos φ = √3/2, sin φ = −1/2, donc φ = −π/6 : 2 cos(x + π/6) = √2, cos(x + π/6) = √2/2, x + π/6 = ±π/4 + 2kπ. Donc x = π/12 + 2kπ ou x = −5π/12 + 2kπ. La plus petite positive est π/12 ≈ 0,262.'},
 {kind:'Problème',h:'Entrer au port avec la marée',
  p:'Dans un port, la hauteur d’eau suit à peu près <b><i>h</i>(<i>t</i>) = 4 + 2,5 cos(π<i>t</i>/6)</b>, en mètres, où <i>t</i> est le temps en heures depuis la pleine mer. Un voilier a besoin d’au moins 5 m d’eau pour entrer ou sortir.',
  fig:(()=>{ const P=plane({x:[-.5,12.5],y:[0,7.5],w:320,h:170,grid:false,lx:2,ly:1}); [1,2,3,4,5,6,7].forEach(y=>P.seg(0,y,12,y,{c:'var(--line)',w:1}));
    P.fn(t=>4+2.5*Math.cos(Math.PI*t/6),{from:0,to:12}).seg(0,5,12,5,{c:'var(--bad)',w:1.5,dash:true}).text(12.3,0,'t (h)',{a:'end',dy:-6,s:11,c:'var(--muted)'}).text(5.2,5.2,'5 m',{s:11,c:'var(--bad)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la hauteur d’eau 2 heures après la pleine mer&nbsp;?',lab:'h =',unit:'m',ans:5.25,tol:.01,hint:'π · 2/6 = π/3.',why:'h(2) = 4 + 2,5 cos(π/3) = 4 + 1,25 = 5,25 m.'},
   {q:'b) Combien de temps après la pleine mer la hauteur tombe-t-elle à 5 m&nbsp;? Arrondis au centième d’heure.',lab:'t =',unit:'h',ans:2.21,tol:.006,hint:'Résous cos(πt/6) = 0,4 et prends la plus petite solution positive.',why:'πt/6 = arccos(0,4) ≈ 1,159, donc t = 6 · 1,159/π ≈ 2,21 h.'},
   {q:'c) Sur un cycle de 12 h, pendant combien d’heures le voilier peut-il passer&nbsp;? Arrondis au centième.',lab:'durée =',unit:'h',ans:4.43,tol:.006,hint:'h ≥ 5 ⇔ cos(πt/6) ≥ 0,4. Les solutions de cos u = 0,4 sont ±arccos(0,4) + 2kπ : la fenêtre est centrée sur la pleine mer.',why:'La fenêtre va de t ≈ −2,21 h à t ≈ 2,21 h autour de chaque pleine mer, soit 2 · 2,214 ≈ 4,43 h.'},
  ],
  sol:'<p>On pose <i>u</i> = π<i>t</i>/6. <i>h</i>(<i>t</i>) ≥ 5 ⇔ 2,5 cos <i>u</i> ≥ 1 ⇔ cos <i>u</i> ≥ 0,4.</p><p>Les solutions de cos <i>u</i> = 0,4 sont <i>u</i> = ± arccos(0,4) + 2<i>k</i>π, avec arccos(0,4) ≈ 1,159. Sur une période, cos <i>u</i> ≥ 0,4 pour <i>u</i> ∈ [−1,159 ; 1,159], soit <i>t</i> ∈ [−2,21 ; 2,21] heures autour de la pleine mer.</p><p>a) <i>h</i>(2) = 5,25 m. b) La hauteur passe sous 5 m à <i>t</i> ≈ 2,21 h. c) La fenêtre dure 2 · 6 · arccos(0,4)/π ≈ 4,43 h par marée, soit environ 4 h 26 min.</p>'},
 {kind:'Problème',h:'Une équation qui cache un produit',
  p:'On veut résoudre <b>sin <i>x</i> + sin 3<i>x</i> = sin 2<i>x</i></b> sur [0 ; 2π[. Développer sin 3<i>x</i> serait long. Les formules somme-produit permettent de faire apparaître un facteur commun et de se ramener à des équations simples.',
  parts:[
   {q:'a) Que vaut sin 3<i>x</i> + sin <i>x</i>&nbsp;?',opts:['2 sin 2x cos x','2 cos 2x sin x','sin 4x','2 sin 2x sin x'],ans:0,hint:'sin p + sin q = 2 sin((p + q)/2) cos((p − q)/2), avec p = 3x et q = x.',why:'(p + q)/2 = 2x et (p − q)/2 = x : sin 3x + sin x = 2 sin 2x cos x.'},
   {q:'b) Comment continuer correctement&nbsp;?',opts:['Diviser par sin 2x : 2 cos x = 1','Écrire sin 2x(2 cos x − 1) = 0, puis sin 2x = 0 ou cos x = ½','Élever au carré les deux membres','Poser x = 0, seule solution évidente'],ans:1,hint:'Diviser par une expression qui peut être nulle fait perdre des solutions.',why:'2 sin 2x cos x − sin 2x = sin 2x(2 cos x − 1). Un produit est nul si l’un des facteurs l’est. Diviser par sin 2x ferait perdre les solutions de sin 2x = 0.'},
   {q:'c) Combien de solutions l’équation a-t-elle dans [0 ; 2π[&nbsp;?',lab:'nombre =',ans:6,hint:'sin 2x = 0 donne x = kπ/2. cos x = ½ donne x = ±π/3 + 2kπ. Vérifie qu’aucune ne se répète.',why:'sin 2x = 0 : 0, π/2, π, 3π/2. cos x = ½ : π/3, 5π/3. Six solutions distinctes.'},
   {q:'d) Calcule la somme de toutes ces solutions, arrondie au centième.',lab:'somme =',ans:15.71,tol:.006,hint:'Additionne les multiples de π, puis multiplie par π ≈ 3,1416.',why:'0 + π/2 + π + 3π/2 + π/3 + 5π/3 = 3π + 2π = 5π ≈ 15,71.'},
  ],
  sol:'<p>Somme-produit : sin 3<i>x</i> + sin <i>x</i> = 2 sin 2<i>x</i> cos <i>x</i>. L’équation devient 2 sin 2<i>x</i> cos <i>x</i> = sin 2<i>x</i>, soit <b>sin 2<i>x</i> (2 cos <i>x</i> − 1) = 0</b>.</p><p>Premier facteur : sin 2<i>x</i> = 0 ⇔ 2<i>x</i> = <i>k</i>π ⇔ <i>x</i> = <i>k</i>π/2, soit 0, π/2, π, 3π/2 dans [0 ; 2π[.</p><p>Second facteur : cos <i>x</i> = ½ ⇔ <i>x</i> = ±π/3 + 2<i>k</i>π, soit π/3 et 5π/3.</p><p>Solutions : {0 ; π/3 ; π/2 ; π ; 3π/2 ; 5π/3}, six valeurs de somme 5π. Diviser par sin 2<i>x</i> n’aurait laissé que π/3 et 5π/3.</p>'},
]},

/* ===================== 5. Relations dans les triangles ===================== */
{subj:'an2', sem:'aut', id:'an2-triangles', h:'Relations dans les triangles', p:'Triangle rectangle, loi des sinus, loi du cosinus et résolution de triangles.', steps:[
 {h:'Le triangle rectangle',p:`Dans un triangle rectangle, pour un angle aigu <i>α</i> : <b>sin <i>α</i> = ${F('opposé','hypoténuse')}</b>, <b>cos <i>α</i> = ${F('adjacent','hypoténuse')}</b>, <b>tan <i>α</i> = ${F('opposé','adjacent')}</b>. Ici l’hypoténuse vaut 4.`,
  params:[{id:'a',l:'α',min:10,max:80,step:5,v:35,u:'°'}],
  draw:v=>{ const a=rad(v.a), c=4*Math.cos(a), s=4*Math.sin(a), P=plane({x:[-.6,4.6],y:[-.7,4.3],grid:false,axes:false});
    P.poly([[0,0],[c,0],[c,s]],{fill:'var(--accent)',fo:.12,c:'var(--ink)',w:2}).seg(0,0,c,0,{c:'var(--math)',w:4.5}).seg(c,0,c,s,{c:'var(--spark)',w:4.5});
    P.poly([[c-.25,0],[c-.25,.25],[c,.25]],{open:true,c:'var(--ink)',w:1.5}); arc(P,0,a,.6,{c:'var(--ink)',w:2});
    P.text(.7,.12,'α',{s:12}).text(c/2,0,`adj. ${fmt(c,2)}`,{a:'middle',dy:16,s:11,c:'var(--math)'}).text(c,s/2,`opp. ${fmt(s,2)}`,{dx:6,s:11,c:'var(--spark)'}).text(c/2,s/2,'4',{dx:-14,dy:-4}); return P.svg(); },
  info:v=>`sin α ≈ ${fmt(Math.sin(rad(v.a)),3)} · cos α ≈ ${fmt(Math.cos(rad(v.a)),3)} · tan α ≈ ${fmt(Math.tan(rad(v.a)),3)}`},
 {h:'L’échelle',p:'Une échelle de 5 m est appuyée contre un mur et fait un angle de 70° avec le sol. À quelle hauteur touche-t-elle le mur&nbsp;? Arrondis au centième.',lab:'h =',unit:'m',ans:4.7,tol:.006,
  why:'La hauteur est le côté opposé à l’angle de 70°, l’échelle est l’hypoténuse : h = 5 sin 70° ≈ 4,70 m.'},
 {h:'La loi des sinus',p:`Dans tout triangle de côtés <i>a</i>, <i>b</i>, <i>c</i> opposés aux angles <i>α</i>, <i>β</i>, <i>γ</i> : <b>${F('<i>a</i>','sin <i>α</i>')} = ${F('<i>b</i>','sin <i>β</i>')} = ${F('<i>c</i>','sin <i>γ</i>')} = 2<i>R</i></b>, où <i>R</i> est le rayon du cercle circonscrit. Ici <i>c</i> = 4 est fixé, et <i>γ</i> = 180° − <i>α</i> − <i>β</i>.`,
  params:[{id:'a',l:'α',min:30,max:75,step:5,v:50,u:'°'},{id:'b',l:'β',min:30,max:75,step:5,v:60,u:'°'}],
  draw:v=>{ const al=rad(v.a), be=rad(v.b), ga=PI-al-be, k=4/Math.sin(ga), a=k*Math.sin(al), b=k*Math.sin(be), C=[b*Math.cos(al),b*Math.sin(al)];
    const P=plane({x:[-.8,8.2],y:[-.8,8],grid:false,axes:false});
    P.poly([[0,0],[4,0],C],{fill:'var(--accent)',fo:.12,c:'var(--ink)',w:2});
    P.dot(0,0,{c:'var(--ink)',r:4,l:'A',dx:-14,dy:14}).dot(4,0,{c:'var(--ink)',r:4,l:'B',dx:6,dy:14}).dot(C[0],C[1],{c:'var(--ink)',r:4,l:'C'});
    P.text(2,0,'c = 4',{a:'middle',dy:16,s:11}).text((4+C[0])/2,C[1]/2,`a ≈ ${fmt(a,2)}`,{dx:8,s:11,c:'var(--math)'}).text(C[0]/2,C[1]/2,`b ≈ ${fmt(b,2)}`,{a:'end',dx:-8,s:11,c:'var(--spark)'}); return P.svg(); },
  info:v=>{ const al=rad(v.a), be=rad(v.b), ga=PI-al-be, k=4/Math.sin(ga); return `γ = ${180-v.a-v.b}° · a/sin α = b/sin β = c/sin γ ≈ <b>${fmt(k,3)}</b>`; },
  note:'Quand γ devient petit, c/sin γ grandit : le triangle s’allonge et son cercle circonscrit aussi.'},
 {h:'Applique la loi des sinus',p:'Dans un triangle, <i>α</i> = 40°, <i>β</i> = 60° et <i>a</i> = 7. Calcule <i>b</i>, arrondi au centième.',lab:'b =',ans:9.43,tol:.006,
  why:'b = a · sin β / sin α = 7 · sin 60° / sin 40° ≈ 7 · 0,866 / 0,643 ≈ 9,43.'},
 {h:'Loi du cosinus (Al-Kashi) et aire',p:`<b><i>c</i>² = <i>a</i>² + <i>b</i>² − 2<i>ab</i> cos <i>γ</i></b>. C’est Pythagore corrigé : le terme −2<i>ab</i> cos <i>γ</i> s’annule quand <i>γ</i> = 90°. L’aire du triangle vaut <b><i>A</i> = ½ <i>ab</i> sin <i>γ</i></b>. Ici <i>a</i> = 3 et <i>b</i> = 4.`,
  params:[{id:'g',l:'γ',min:10,max:170,step:10,v:60,u:'°'}],
  draw:v=>{ const g=rad(v.g), B=[3*Math.cos(g),3*Math.sin(g)], P=plane({x:[-3.2,4.6],y:[-.8,3.6],grid:false,axes:false});
    P.poly([[0,0],[4,0],B],{fill:'var(--accent)',fo:.15,c:'var(--ink)',w:2}).seg(4,0,B[0],B[1],{c:'var(--spark)',w:4.5}); arc(P,0,g,.5,{c:'var(--ink)',w:2});
    P.dot(0,0,{c:'var(--ink)',r:4,l:'C',dx:-8,dy:16}).text(2,0,'b = 4',{a:'middle',dy:16,s:11}).text(B[0]/2,B[1]/2,'a = 3',{a:'end',dx:-6,s:11}).text((4+B[0])/2,B[1]/2,'c',{dx:6,c:'var(--spark)'}); return P.svg(); },
  info:v=>{ const c2=25-24*Math.cos(rad(v.g)); return `c² = 9 + 16 − 24 cos ${v.g}° ≈ ${fmt(c2,2)} · c ≈ <b>${fmt(Math.sqrt(c2),3)}</b> · aire ≈ ${fmt(6*Math.sin(rad(v.g)),3)}`; },
  note:'Si γ est obtus, cos γ < 0 et c² dépasse a² + b².'},
 {h:'Le troisième côté',p:'<i>a</i> = 5, <i>b</i> = 8 et <i>γ</i> = 60°. Calcule <i>c</i>.',lab:'c =',ans:7,
  why:'c² = 25 + 64 − 2 · 5 · 8 · cos 60° = 89 − 40 = 49, donc c = 7.'},
 {h:'Une aire',p:'Un triangle a deux côtés de 6 et 10 qui forment un angle de 150°. Quelle est son aire&nbsp;?',lab:'A =',ans:15,
  why:'A = ½ · 6 · 10 · sin 150° = 30 · ½ = 15.'},
 {kind:'Méthode',h:'Trouver un angle avec la loi du cosinus',p:`<b>Quand ?</b> On connaît les trois côtés (ou deux côtés et le troisième vient d’être calculé) et on cherche un angle.<br><b>Pourquoi ça marche ?</b> On isole cos <i>γ</i> dans <i>c</i>² = <i>a</i>² + <i>b</i>² − 2<i>ab</i> cos <i>γ</i> : <b>cos <i>γ</i> = ${F('<i>a</i>² + <i>b</i>² − <i>c</i>²','2<i>ab</i>')}</b>. Comme un angle de triangle est dans ]0° ; 180°[ et que arccos renvoie justement un angle de [0° ; 180°], la réponse est <b>unique</b>, sans ambiguïté.<br><b>Comment ?</b> 1) Repère le côté opposé à l’angle cherché : il va au numérateur avec un signe moins. 2) Calcule le cosinus, puis l’arccos. 3) Le troisième angle vient de la somme 180°.`,
  demo:{enonce:'Un triangle a pour côtés <i>a</i> = 4, <i>b</i> = 5 et <i>c</i> = 6. Calcule ses angles.',
   etapes:[
    {f:'cos <i>γ</i> = (16 + 25 − 36)/(2 · 4 · 5) = 5/40 = 1/8, donc <i>γ</i> = arccos(1/8) ≈ 82,82°.',w:'γ est opposé à c = 6, le plus grand côté : c’est le plus grand angle.'},
    {f:'cos <i>α</i> = (<i>b</i>² + <i>c</i>² − <i>a</i>²)/(2<i>bc</i>) = (25 + 36 − 16)/60 = 3/4, donc <i>α</i> ≈ 41,41°.',w:'Même formule, en mettant au numérateur avec un moins le côté a opposé à α.'},
    {f:'<i>β</i> = 180° − 82,82° − 41,41° ≈ 55,77°.',w:'La somme des angles d’un triangle vaut 180°.'}],
   conclusion:'α ≈ 41,41°, β ≈ 55,77°, γ ≈ 82,82°. Un cosinus négatif aurait signalé un angle obtus.'}},
 {kind:'Méthode',h:'Résoudre un triangle',p:`Résoudre un triangle, c’est trouver ses trois côtés et ses trois angles. Choisis l’outil selon les données :`,
  fig:`<table><tr><td><b>Données</b></td><td><b>Outil</b></td></tr><tr><td>3 côtés</td><td>loi du cosinus pour chaque angle</td></tr><tr><td>2 côtés et l’angle compris</td><td>loi du cosinus, puis loi des sinus</td></tr><tr><td>1 côté et 2 angles</td><td>somme 180°, puis loi des sinus</td></tr><tr><td>2 côtés et un angle non compris</td><td>loi des sinus : 0, 1 ou 2 solutions</td></tr></table>`,
  demo:{enonce:'<i>a</i> = 5, <i>b</i> = 8 et <i>γ</i> = 60° (l’angle compris entre <i>a</i> et <i>b</i>). Résous le triangle.',
   etapes:[
    {f:'Données : deux côtés et l’angle compris. Outil : loi du cosinus.',w:'La loi des sinus ne sert à rien ici : on ne connaît aucun couple côté et angle opposé.'},
    {f:'<i>c</i>² = 25 + 64 − 2 · 5 · 8 · cos 60° = 89 − 40 = 49, donc <i>c</i> = 7.',w:'On obtient le côté opposé à l’angle connu.'},
    {f:'cos <i>α</i> = (64 + 49 − 25)/(2 · 8 · 7) = 88/112, donc <i>α</i> ≈ 38,21°.',w:'Pour un angle, la loi du cosinus évite l’ambiguïté de sin.'},
    {f:'<i>β</i> = 180° − 60° − 38,21° ≈ 81,79°.',w:'Somme des angles.'}],
   conclusion:'c = 7, α ≈ 38,21°, β ≈ 81,79°. Avec un côté et deux angles, on aurait commencé par la somme 180°, puis la loi des sinus.'},
  note:'Avec la loi des sinus, sin β = k a deux solutions dans ]0° ; 180°[ : β et 180° − β. Vérifie si la seconde laisse une somme d’angles inférieure à 180°. Pour trouver un angle, préfère la loi du cosinus : arccos n’a pas cette ambiguïté.'},
 {h:'Un côté et deux angles',p:'Dans un triangle, <i>α</i> = 50°, <i>β</i> = 70° et <i>c</i> = 10. Calcule <i>a</i>, arrondi au centième.',lab:'a =',ans:8.85,tol:.006,
  why:'Un côté et deux angles : γ = 180° − 50° − 70° = 60°, puis la loi des sinus donne a = c · sin α / sin γ = 10 · sin 50° / sin 60° ≈ 8,85.'},
 {kind:'Défi',h:'Le plus grand angle',p:'Un triangle a pour côtés 7, 8 et 9. Calcule son plus grand angle en degrés, arrondi au dixième.',lab:'γ =',unit:'°',ans:73.4,tol:.05,
  why:'Le plus grand angle est opposé au plus grand côté. cos γ = (7² + 8² − 9²)/(2 · 7 · 8) = 32/112 = 2/7, donc γ = arccos(2/7) ≈ 73,4°.'},
 {kind:'Méthode',h:'Le cas ambigu : deux côtés et un angle non compris',p:`<b>Quand ?</b> On connaît <i>a</i>, <i>b</i> et l’angle <i>α</i> opposé à <i>a</i> (donc pas l’angle entre <i>a</i> et <i>b</i>).<br><b>Pourquoi c’est délicat ?</b> La loi des sinus donne sin <i>β</i> = <i>b</i> sin <i>α</i> / <i>a</i>. Or dans ]0° ; 180°[, deux angles ont ce sinus : <i>β</i>₁ = arcsin(…) et <i>β</i>₂ = 180° − <i>β</i>₁ (angles associés). Chacun donne un triangle, <b>s’il reste de la place</b> pour le troisième angle.<br><b>Comment ?</b> 1) Calcule sin <i>β</i>. S’il dépasse 1, aucun triangle. 2) Calcule <i>β</i>₁ et <i>β</i>₂ = 180° − <i>β</i>₁. 3) Garde chaque valeur telle que <i>α</i> + <i>β</i> &lt; 180°. 4) Pour chaque triangle gardé, calcule <i>γ</i> = 180° − <i>α</i> − <i>β</i> puis <i>c</i> par la loi des sinus.`,
  demo:{enonce:'<i>α</i> = 30°, <i>a</i> = 3 et <i>b</i> = 5. Combien de triangles, et quelles valeurs de <i>c</i>&nbsp;?',
   etapes:[
    {f:'sin <i>β</i> = 5 · sin 30° / 3 = 2,5/3 ≈ 0,833.',w:'Loi des sinus : sin β / b = sin α / a. La valeur est ≤ 1, donc il y a au moins un triangle.'},
    {f:'<i>β</i>₁ ≈ 56,44° et <i>β</i>₂ = 180° − 56,44° ≈ 123,56°.',w:'Les deux angles de ]0° ; 180°[ de même sinus.'},
    {f:'30° + 56,44° &lt; 180° et 30° + 123,56° &lt; 180° : deux triangles.',w:'Il reste un angle γ positif dans les deux cas.'},
    {f:'<i>γ</i>₁ ≈ 93,56°, <i>c</i>₁ = 3 sin <i>γ</i>₁ / sin 30° ≈ 5,99 ; <i>γ</i>₂ ≈ 26,44°, <i>c</i>₂ ≈ 2,67.',w:'Loi des sinus avec c / sin γ = a / sin α = 6.'}],
   conclusion:'Deux triangles : c ≈ 5,99 ou c ≈ 2,67. Il faut une information de plus pour choisir.'}},
 {h:'Combien de triangles&nbsp;?',p:'<i>α</i> = 70°, <i>a</i> = 8 et <i>b</i> = 6. Combien de triangles vérifient ces données&nbsp;?',lab:'nombre =',ans:1,
  why:'sin β = 6 sin 70°/8 ≈ 0,705, donc β ≈ 44,8° ou β ≈ 135,2°. Mais 70° + 135,2° > 180° : seul β ≈ 44,8° convient. Un seul triangle.'},
 {kind:'Problème',h:'La hauteur d’une tour par deux visées',
  p:'On ne peut pas atteindre le pied d’une tour. Depuis un point A du sol, on voit son sommet T sous un angle d’élévation de 30°. On avance de 40 m en ligne droite vers la tour jusqu’à un point B, d’où l’angle d’élévation vaut 45°. Le sol est horizontal et H désigne le pied de la tour.',
  fig:(()=>{ const P=plane({x:[-8,104],y:[-10,64],grid:false,axes:false}), h=54.64, xh=94.64;
    P.seg(-8,0,104,0,{c:'var(--muted)',w:1.5}).poly([[0,0],[40,0],[xh,h]],{fill:'var(--accent)',fo:.12,c:'var(--ink)',w:2}).seg(xh,0,xh,h,{c:'var(--spark)',w:4.5}).seg(40,0,xh,h,{c:'var(--ink)',w:2});
    arc(P,0,rad(30),10,{c:'var(--math)',w:2}); arc(P,0,rad(45),10,{c:'var(--math)',w:2}); P.curve(t=>40+10*Math.cos(t),t=>10*Math.sin(t),0,rad(45),{c:'var(--math)',w:2});
    P.dot(0,0,{c:'var(--ink)',r:4,l:'A',dx:-6,dy:16}).dot(40,0,{c:'var(--ink)',r:4,l:'B',dx:-4,dy:16}).dot(xh,0,{c:'var(--ink)',r:4,l:'H',dx:4,dy:16}).dot(xh,h,{c:'var(--ink)',r:4,l:'T',dx:6,dy:4});
    P.text(12,2,'30°',{s:11,c:'var(--math)'}).text(52,3,'45°',{s:11,c:'var(--math)'}).text(20,0,'40 m',{a:'middle',dy:16,s:11}); return P.svg(); })(),
  parts:[
   {q:'a) Quel est l’angle <i>ATB</i> au sommet du triangle ABT, en degrés&nbsp;?',lab:'angle =',unit:'°',ans:15,hint:'L’angle en B du triangle ABT est le supplémentaire de 45°. Puis la somme des angles vaut 180°.',why:'Angle ABT = 180° − 45° = 135°, donc ATB = 180° − 30° − 135° = 15° (c’est aussi 45° − 30°).'},
   {q:'b) Calcule la distance BT avec la loi des sinus, arrondie au centième.',lab:'BT =',unit:'m',ans:77.27,tol:.01,hint:'Dans ABT, BT est opposé à l’angle en A (30°) et AB = 40 m est opposé à l’angle en T.',why:'BT / sin 30° = 40 / sin 15°, donc BT = 40 · 0,5 / 0,2588 ≈ 77,27 m.'},
   {q:'c) Quelle est la hauteur TH de la tour, arrondie au centième&nbsp;?',lab:'h =',unit:'m',ans:54.64,tol:.01,hint:'Le triangle BHT est rectangle en H, d’angle 45° en B.',why:'h = BT · sin 45° ≈ 77,27 · 0,7071 ≈ 54,64 m. (Formule directe : h = 40 tan 30° / (1 − tan 30°).)'},
  ],
  sol:'<p>Dans le triangle ABT : l’angle en A vaut 30°, l’angle en B vaut 180° − 45° = 135°, donc l’angle en T vaut 15°.</p><p>Loi des sinus : BT/sin 30° = AB/sin 15°, d’où BT = 40 · sin 30°/sin 15° ≈ 77,27 m.</p><p>Dans le triangle BHT rectangle en H : TH = BT · sin 45° ≈ 54,64 m (et BH = BT cos 45° ≈ 54,64 m aussi).</p><p>Contrôle : en posant BH = <i>x</i>, on a <i>h</i> = <i>x</i> tan 45° = (<i>x</i> + 40) tan 30°, d’où <i>h</i> = 40 tan 30°/(1 − tan 30°) = 20(√3 + 1) ≈ 54,64 m.</p>'},
 {kind:'Problème',h:'Où est la bouée&nbsp;?',
  p:'Un bateau en A se trouve à 8 km d’un phare B. Il suit un cap rectiligne qui fait un angle de 35° avec la direction du phare. Le radar du phare indique qu’une bouée posée sur ce cap se trouve à 5,5 km du phare. On cherche la distance AC entre le bateau et la bouée C : c’est le cas « deux côtés et un angle non compris ».',
  fig:(()=>{ const P=plane({x:[-1,12],y:[-2.5,7.5],grid:false,axes:false}), B=[6.553,4.589];
    P.seg(-1,0,12,0,{c:'var(--muted)',w:1.5,dash:true}).circ(B[0],B[1],5.5,{c:'var(--math)',w:1.5,dash:true}).seg(0,0,B[0],B[1],{c:'var(--ink)',w:2}).seg(B[0],B[1],3.521,0,{c:'var(--spark)',w:2}).seg(B[0],B[1],9.585,0,{c:'var(--spark)',w:2});
    arc(P,0,rad(35),1.4,{c:'var(--ink)',w:2}); P.dot(0,0,{c:'var(--ink)',r:4,l:'A',dx:-6,dy:16}).dot(B[0],B[1],{c:'var(--ink)',r:4,l:'B (phare)'}).dot(3.521,0,{r:5,l:'C₂',dx:-8,dy:16}).dot(9.585,0,{r:5,l:'C₁',dx:-4,dy:16}).text(1.6,.2,'35°',{s:11}).text(3,2.6,'8',{s:12}); return P.svg(); })(),
  parts:[
   {q:'a) En appliquant la loi des sinus dans ABC, que vaut sin <i>γ</i> (angle en C)&nbsp;? Arrondis au millième.',lab:'sin γ =',ans:.834,tol:.0006,hint:'AB = 8 est opposé à l’angle en C, BC = 5,5 est opposé à l’angle en A.',why:'sin γ / 8 = sin 35° / 5,5, donc sin γ = 8 · 0,5736 / 5,5 ≈ 0,834.'},
   {q:'b) Combien de triangles (donc de positions de la bouée) sont possibles&nbsp;?',lab:'nombre =',ans:2,hint:'sin γ = 0,834 a deux solutions dans ]0° ; 180°[. Vérifie pour chacune que 35° + γ reste inférieur à 180°.',why:'γ ≈ 56,5° ou γ ≈ 123,5°. Dans les deux cas 35° + γ < 180°, donc deux triangles existent : le cercle de rayon 5,5 autour du phare coupe le cap en deux points.'},
   {q:'c) Dans le cas où <i>γ</i> est aigu, calcule AC, arrondi au centième.',lab:'AC =',unit:'km',ans:9.59,tol:.006,hint:'L’angle en B vaut 180° − 35° − γ. Puis AC / sin β = 5,5 / sin 35°.',why:'β = 180° − 35° − 56,54° = 88,46°, et AC = 5,5 · sin 88,46° / sin 35° ≈ 9,59 km.'},
   {q:'d) Dans l’autre cas, calcule AC, arrondi au centième.',lab:'AC =',unit:'km',ans:3.52,tol:.006,hint:'Prends γ = 180° − 56,54°, recalcule β puis AC.',why:'γ ≈ 123,46°, β ≈ 21,54°, et AC = 5,5 · sin 21,54° / sin 35° ≈ 3,52 km.'},
   {q:'e) Quelle distance sépare les deux positions possibles de la bouée&nbsp;? Arrondis au centième.',lab:'C₁C₂ =',unit:'km',ans:6.06,tol:.006,hint:'Soustrais, ou bien utilise le triangle rectangle formé par le phare et son projeté sur le cap.',why:'9,585 − 3,521 ≈ 6,06 km. Contrôle : le phare est à 8 sin 35° ≈ 4,589 km du cap, et C₁C₂ = 2√(5,5² − 4,589²) ≈ 6,06 km.'},
  ],
  sol:'<p>Loi des sinus dans ABC : sin <i>γ</i> = AB · sin 35°/BC = 8 · 0,5736/5,5 ≈ 0,8343.</p><p>Deux angles conviennent : <i>γ</i>₁ ≈ 56,54° et <i>γ</i>₂ = 180° − <i>γ</i>₁ ≈ 123,46°. Comme 35° + <i>γ</i>₂ &lt; 180°, les deux triangles existent : c’est le cas ambigu.</p><p>Cas 1 : <i>β</i> ≈ 88,46° et AC = 5,5 sin <i>β</i>/sin 35° ≈ 9,59 km. Cas 2 : <i>β</i> ≈ 21,54° et AC ≈ 3,52 km.</p><p>Géométriquement, le phare est à 8 sin 35° ≈ 4,59 km du cap (moins que 5,5 km), donc le cercle de rayon 5,5 km coupe le cap deux fois, en des points distants de 2√(5,5² − 4,59²) ≈ 6,06 km. Il faut une autre information (un relèvement depuis le bateau, par exemple) pour trancher.</p>'},
]},

/* ===================== 6. Continuité et dérivabilité ===================== */
{subj:'an2', sem:'aut', id:'an2-derivees', h:'Dérivées des fonctions trigonométriques', p:'La limite de sin x / x, puis les dérivées de sin, cos, tan, arctan et arcsin.', steps:[
 {h:'Pourquoi sin x / x tend vers 1',p:`Pour 0 < <i>x</i> < ${F('π',2)} (en radians), le cercle trigonométrique montre <b>sin <i>x</i> ≤ <i>x</i> ≤ tan <i>x</i></b> : la demi-corde, l’arc, puis le segment tangent. En divisant par sin <i>x</i> : 1 ≤ <i>x</i>/sin <i>x</i> ≤ 1/cos <i>x</i>. Le théorème des deux gendarmes donne <b>lim<sub><i>x</i>→0</sub> ${F('sin <i>x</i>','<i>x</i>')} = 1</b>.`,
  params:[{id:'x',l:'x (rad)',min:.05,max:1,step:.05,v:.8}],
  draw:v=>{ const x=v.x, c=Math.cos(x), s=Math.sin(x), T=Math.tan(x), P=plane({x:[-.15,1.3],y:[-.15,1.7],step:.5,w:250});
    arc(P,0,PI/2,1,{c:'var(--line)',w:2}); P.seg(0,0,1,T,{c:'var(--ink)',w:1.5}).seg(c,0,c,s,{c:'var(--math)',w:4.5}).seg(1,0,1,T,{c:'var(--spark)',w:4.5});
    arc(P,0,x,1,{c:'var(--accent)',w:4.5}); P.text(c,s/2,'sin x',{a:'end',dx:-5,s:11,c:'var(--math)'}).text(1,T/2,'tan x',{dx:5,s:11,c:'var(--spark)'}); return P.svg(); },
  info:v=>`sin x ≈ ${fmt(Math.sin(v.x),4)} ≤ x = ${fmt(v.x,2)} ≤ tan x ≈ ${fmt(Math.tan(v.x),4)} · <b>sin x / x ≈ ${fmt(Math.sin(v.x)/v.x,4)}</b>`,
  note:'Ce résultat n’est vrai qu’en radians. En degrés, la limite vaudrait π/180.'},
 {kind:'Méthode',h:'Faire apparaître sin u / u',p:`<b>Quand ?</b> Une limite en 0 de forme 0/0 avec des sinus ou des tangentes : sin(5<i>x</i>)/(2<i>x</i>), tan <i>x</i>/<i>x</i>, sin(4<i>x</i>)/sin(6<i>x</i>).<br><b>Pourquoi ça marche ?</b> Si <i>u</i> → 0, alors sin <i>u</i> / <i>u</i> → 1, quelle que soit l’expression <i>u</i> (3<i>x</i>, <i>x</i>/2, <i>x</i>²…). Il suffit de fabriquer exactement ce quotient, avec <b>le même <i>u</i></b> en haut et en bas, en compensant par une constante.<br><b>Comment ?</b> 1) Pour chaque sin(<i>ax</i>), multiplie et divise par <i>ax</i>. 2) Regroupe les quotients sin(<i>ax</i>)/(<i>ax</i>), qui tendent vers 1. 3) Il reste une constante. Pour tan, écris tan <i>u</i> = sin <i>u</i> / cos <i>u</i> avec cos <i>u</i> → 1.`,
  demo:{enonce:'Calcule lim<sub><i>x</i>→0</sub> sin(5<i>x</i>)/(2<i>x</i>), puis lim<sub><i>x</i>→0</sub> tan <i>x</i>/<i>x</i>.',
   etapes:[
    {f:'sin(5<i>x</i>)/(2<i>x</i>) = (5/2) · sin(5<i>x</i>)/(5<i>x</i>).',w:'On veut 5x au dénominateur pour aller avec sin(5x) : on multiplie et divise par 5.'},
    {f:'Avec <i>u</i> = 5<i>x</i> → 0 : sin <i>u</i>/<i>u</i> → 1, donc la limite vaut 5/2.',w:'Le quotient se ramène à la limite de référence.'},
    {f:'tan <i>x</i>/<i>x</i> = (sin <i>x</i>/<i>x</i>) · (1/cos <i>x</i>).',w:'On remplace tan par sin/cos.'},
    {f:'sin <i>x</i>/<i>x</i> → 1 et 1/cos <i>x</i> → 1, donc tan <i>x</i>/<i>x</i> → 1.',w:'cos est continue et cos 0 = 1.'}],
   conclusion:'lim sin(5x)/(2x) = 5/2 et lim tan x/x = 1. Avec un 1 − cos u, utilise la linéarisation 1 − cos u = 2 sin²(u/2) pour faire apparaître des sinus.'}},
 {h:'Une variante',p:'Que vaut lim<sub><i>x</i>→0</sub> sin(3<i>x</i>) / <i>x</i>&nbsp;?',opts:['1','0','3','1/3'],ans:2,
  why:'sin(3x)/x = 3 · sin(3x)/(3x). Avec u = 3x → 0, sin u / u → 1, donc la limite vaut 3.'},
 {h:'Deux sinus',p:'Calcule lim<sub><i>x</i>→0</sub> sin(4<i>x</i>) / sin(6<i>x</i>). Une fraction est acceptée.',lab:'limite =',ans:2/3,tol:.001,
  why:'sin(4x)/sin(6x) = [sin(4x)/(4x)] · [(6x)/sin(6x)] · (4x)/(6x). Les deux crochets tendent vers 1, il reste 4/6 = 2/3.'},
 {h:'Continuité, puis dérivée de sin',p:`sin et cos sont <b>continues sur ℝ</b>, tan est continue sur son domaine. On montre aussi que ${F('1 − cos <i>h</i>','<i>h</i>')} → 0. Alors ${F('sin(<i>x</i> + <i>h</i>) − sin <i>x</i>','<i>h</i>')} = cos <i>x</i> · ${F('sin <i>h</i>','<i>h</i>')} − sin <i>x</i> · ${F('1 − cos <i>h</i>','<i>h</i>')} → cos <i>x</i>. Le graphe de sin <i>x</i> / <i>x</i> ci-dessous a un trou en 0, qu’on bouche par la valeur 1.`,
  fig:(()=>{ const P=plane({x:[-12.5,12.5],y:[-.4,1.2],step:PI,h:140}); P.fn(x=>Math.abs(x)<1e-9?1:Math.sin(x)/x,{n:400});
    P.dot(0,1,{c:'var(--ink)',r:6}).dot(0,1,{c:'var(--surface)',r:3}).text(.6,1,'limite 1',{dy:-6,s:11}); return P.svg(); })()},
 {h:'La pente de sin, c’est cos',p:`<b>(sin <i>x</i>)′ = cos <i>x</i></b> et <b>(cos <i>x</i>)′ = −sin <i>x</i></b>. Déplace le point : la pente de la tangente au graphe de sin est l’ordonnée du point sur la courbe de cos (pointillés).`,
  params:[{id:'k',l:'x₀ (multiples de π/12)',min:0,max:24,step:1,v:3}],
  draw:v=>{ const x0=v.k*PI/12, s=Math.sin(x0), c=Math.cos(x0), P=plane({x:[-.3,6.6],y:[-1.6,1.6],step:PI/2});
    P.fn(Math.cos,{c:'var(--math)',w:2,dash:true}).fn(Math.sin,{c:'var(--accent)'}).seg(x0-1,s-c,x0+1,s+c,{c:'var(--spark)',w:3}).seg(x0,s,x0,c,{c:'var(--muted)',w:1.5,dash:true});
    P.dot(x0,s,{c:'var(--accent)'}).dot(x0,c,{c:'var(--math)',r:5}); ticksPi(P,.1,6.5,0,2); return P.svg(); },
  info:v=>`x₀ = ${pf(v.k,12)} · pente de la tangente = cos x₀ ≈ ${fmt(Math.cos(v.k*PI/12),3)}`},
 {kind:'Méthode',h:'Dériver produits, quotients et composées trigonométriques',p:`<b>Quand ?</b> Dès que la fonction n’est pas simplement sin <i>x</i> ou cos <i>x</i> : <i>x</i>² cos <i>x</i>, sin(3<i>x</i>), sin²<i>x</i>, 2/sin <i>x</i>…<br><b>Les règles</b> : (<i>uv</i>)′ = <i>u</i>′<i>v</i> + <i>uv</i>′ ; (<i>u</i>/<i>v</i>)′ = (<i>u</i>′<i>v</i> − <i>uv</i>′)/<i>v</i>² ; (1/<i>u</i>)′ = −<i>u</i>′/<i>u</i>² ; et la <b>règle de chaîne</b> (<i>g</i>(<i>u</i>))′ = <i>u</i>′ · <i>g</i>′(<i>u</i>). Elle donne <b>(sin <i>u</i>)′ = <i>u</i>′ cos <i>u</i></b>, <b>(cos <i>u</i>)′ = −<i>u</i>′ sin <i>u</i></b>, (<i>u</i>ⁿ)′ = <i>n</i><i>u</i>′<i>u</i>ⁿ⁻¹.<br><b>Pourquoi ça marche ?</b> Si <i>u</i> varie un peu, <i>g</i>(<i>u</i>) varie <i>g</i>′(<i>u</i>) fois plus : les deux taux de variation se multiplient.<br><b>Comment ?</b> 1) Repère la dernière opération (produit, quotient ou fonction appliquée à <i>u</i>). 2) Applique la règle correspondante. 3) Dérive l’intérieur <i>u</i> sans l’oublier.`,
  demo:{enonce:'Dérive <i>f</i>(<i>x</i>) = sin²(3<i>x</i>) et calcule <i>f</i> ′(π/12).',
   etapes:[
    {f:'<i>f</i> = <i>u</i>² avec <i>u</i> = sin(3<i>x</i>).',w:'La dernière opération est le carré : on commence par (u²)′ = 2u′u.'},
    {f:'<i>u</i>′ = 3 cos(3<i>x</i>).',w:'Règle de chaîne une deuxième fois : l’intérieur 3x a pour dérivée 3.'},
    {f:'<i>f</i> ′(<i>x</i>) = 2 · 3 cos(3<i>x</i>) · sin(3<i>x</i>) = 3 sin(6<i>x</i>).',w:'2 sin a cos a = sin 2a simplifie l’écriture.'},
    {f:'<i>f</i> ′(π/12) = 3 sin(π/2) = 3.',w:'On remplace x par π/12 : 6x = π/2.'}],
   conclusion:'f ′(x) = 6 sin(3x) cos(3x) = 3 sin(6x), et f ′(π/12) = 3. Si θ dépend du temps t, la même règle donne d/dt[f(θ)] = f ′(θ) · θ′(t).'}},
 {h:'Une composée',p:'<i>h</i>(<i>x</i>) = cos²(2<i>x</i>). Calcule <i>h</i> ′(π/8).',lab:'h ′(π/8) =',ans:-2,tol:.001,
  why:'h ′(x) = 2 cos(2x) · (−2 sin(2x)) = −2 sin(4x). En π/8 : −2 sin(π/2) = −2.'},
 {h:'Dérivée de la tangente',p:'Avec la règle du quotient, que vaut (tan <i>x</i>)′&nbsp;?',opts:['−1/cos² x','1 + tan² x','1/sin² x','tan² x'],ans:1,
  why:'(sin x / cos x)′ = (cos x · cos x − sin x · (−sin x))/cos² x = 1/cos² x = 1 + tan² x.'},
 {h:'Dérivées des réciproques',p:`Si <i>f</i> est dérivable et bijective avec <i>f</i> ′ ≠ 0, alors (<i>f</i>⁻¹)′(<i>y</i>) = ${F(1,'<i>f</i> ′(<i>f</i>⁻¹(<i>y</i>))')}. On obtient :<br><b>(arctan <i>x</i>)′ = ${F(1,'1 + <i>x</i>²')}</b> sur ℝ, <b>(arcsin <i>x</i>)′ = ${F(1,'√(1 − <i>x</i>²)')}</b> et (arccos <i>x</i>)′ = −${F(1,'√(1 − <i>x</i>²)')} sur ]−1 ; 1[.`,
  fig:(()=>{ const P=plane({x:[-5,5],y:[-1.8,1.8],h:150,lab:2}); P.seg(-5,PI/2,5,PI/2,{c:'var(--line)',w:1.5,dash:true}).seg(-5,-PI/2,5,-PI/2,{c:'var(--line)',w:1.5,dash:true});
    P.fn(Math.atan,{c:'var(--accent)'}).fn(x=>1/(1+x*x),{c:'var(--math)',w:2.5}); P.text(2.6,1.1,'arctan x',{c:'var(--accent)',s:11}).text(.6,.95,'1/(1 + x²)',{c:'var(--math)',s:11}); return P.svg(); })(),
  note:'Exemple pour arcsin : avec y = sin θ, θ ∈ ]−π/2 ; π/2[, on a (arcsin)′(y) = 1/cos θ = 1/√(1 − y²), car cos θ > 0 sur cet intervalle.'},
 {h:'Produit',p:'<i>f</i>(<i>x</i>) = <i>x</i>² cos <i>x</i>. Calcule <i>f</i> ′(π), arrondi au centième.',lab:'f ′(π) =',ans:-6.28,tol:.006,
  why:'f ′(x) = 2x cos x − x² sin x. En π : 2π · (−1) − π² · 0 = −2π ≈ −6,28.'},
 {h:'Composée',p:'<i>g</i>(<i>x</i>) = arcsin(<i>x</i>/2). Calcule <i>g</i> ′(1), arrondi au millième.',lab:'g ′(1) =',ans:.577,tol:.0006,
  why:'g ′(x) = (1/2) · 1/√(1 − x²/4). En 1 : (1/2)/√(3/4) = (1/2)/(√3/2) = 1/√3 ≈ 0,577.'},
 {h:'Arctangente composée',p:'<i>k</i>(<i>x</i>) = arctan(<i>x</i>²). Calcule <i>k</i> ′(1).',lab:'k ′(1) =',ans:1,tol:.001,
  why:'Règle de chaîne avec u = x² : k ′(x) = u′/(1 + u²) = 2x/(1 + x⁴). En 1 : 2/2 = 1.'},
 {kind:'Défi',h:'Une limite classique',p:'En utilisant 1 − cos <i>x</i> = 2 sin²(<i>x</i>/2), calcule lim<sub><i>x</i>→0</sub> (1 − cos <i>x</i>) / <i>x</i>².',lab:'limite =',ans:.5,
  why:'(1 − cos x)/x² = 2 sin²(x/2)/x² = ½ · (sin(x/2)/(x/2))². Le carré tend vers 1, donc la limite vaut ½.'},
 {kind:'Méthode',h:'Chercher un extremum avec la dérivée',p:`<b>Quand ?</b> On cherche la plus grande ou la plus petite valeur d’une fonction sur un intervalle : une longueur minimale, une hauteur maximale.<br><b>Pourquoi ça marche ?</b> Là où <i>f</i> ′ &gt; 0, <i>f</i> monte ; là où <i>f</i> ′ &lt; 0, elle descend. Un maximum se trouve donc là où <i>f</i> ′ passe de + à − (un minimum, de − à +), ou bien à une borne de l’intervalle.<br><b>Comment ?</b> 1) Calcule <i>f</i> ′ et résous <i>f</i> ′(<i>x</i>) = 0 dans l’intervalle. 2) Étudie le signe de <i>f</i> ′ entre ces points (tableau de variation). 3) Compare les valeurs aux points trouvés et aux bornes. Sur un intervalle ouvert où <i>f</i> → +∞ aux deux bords, l’unique point où <i>f</i> ′ passe de − à + donne le minimum.`,
  demo:{enonce:'Trouve le maximum et le minimum de <i>f</i>(<i>x</i>) = <i>x</i> + 2 cos <i>x</i> sur [0 ; π].',
   etapes:[
    {f:'<i>f</i> ′(<i>x</i>) = 1 − 2 sin <i>x</i>.',w:'(cos x)′ = −sin x.'},
    {f:'<i>f</i> ′(<i>x</i>) = 0 ⇔ sin <i>x</i> = 1/2 ⇔ <i>x</i> = π/6 ou <i>x</i> = 5π/6 dans [0 ; π].',w:'Équation de base du chapitre Équations.'},
    {f:'<i>f</i> ′ &gt; 0 sur [0 ; π/6[, <i>f</i> ′ &lt; 0 sur ]π/6 ; 5π/6[, <i>f</i> ′ &gt; 0 sur ]5π/6 ; π].',w:'sin x &gt; 1/2 exactement entre π/6 et 5π/6 (lecture sur le cercle).'},
    {f:'<i>f</i>(0) = 2, <i>f</i>(π/6) = π/6 + √3 ≈ 2,256, <i>f</i>(5π/6) = 5π/6 − √3 ≈ 0,886, <i>f</i>(π) = π − 2 ≈ 1,142.',w:'On compare les points critiques et les bornes.'}],
   conclusion:'Le maximum vaut π/6 + √3 ≈ 2,256 (en π/6) et le minimum 5π/6 − √3 ≈ 0,886 (en 5π/6).'}},
 {h:'Un minimum',p:'Quelle est la plus petite valeur de <i>f</i>(<i>x</i>) = <i>x</i> − 2 sin <i>x</i> sur [0 ; π]&nbsp;? Arrondis au millième.',lab:'min =',ans:-.685,tol:.0006,
  why:'f ′(x) = 1 − 2 cos x s’annule pour cos x = ½, soit x = π/3. f ′ < 0 avant, f ′ > 0 après : minimum f(π/3) = π/3 − √3 ≈ −0,685 (f(0) = 0 et f(π) = π sont plus grands).'},
 {kind:'Problème',h:'Le faisceau du phare',
  p:'Un phare est situé à 2 km d’une côte rectiligne. Son faisceau tourne à vitesse constante et fait un tour par minute, soit <i>θ</i>′ = 2π rad/min. Quand le faisceau fait l’angle <i>θ</i> avec la perpendiculaire à la côte, la tache lumineuse est à la distance <b><i>x</i> = 2 tan <i>θ</i></b> du point de la côte le plus proche du phare.',
  parts:[
   {q:'a) Quelle est la vitesse de la tache, <i>dx</i>/<i>dt</i>, quand elle passe au point le plus proche (<i>θ</i> = 0)&nbsp;? Arrondis au centième.',lab:'v =',unit:'km/min',ans:12.57,tol:.01,hint:'Règle de chaîne : dx/dt = 2 (tan θ)′ · θ′, avec (tan θ)′ = 1 + tan² θ.',why:'dx/dt = 2(1 + tan² θ) · 2π. En θ = 0 : 4π ≈ 12,57 km/min.'},
   {q:'b) Et quand la tache est à 2 km de ce point&nbsp;? Arrondis au centième.',lab:'v =',unit:'km/min',ans:25.13,tol:.01,hint:'x = 2 donne tan θ = 1.',why:'1 + tan² θ = 2, donc dx/dt = 2 · 2 · 2π = 8π ≈ 25,13 km/min.'},
   {q:'c) À quelle distance du point le plus proche la tache va-t-elle 4 fois plus vite qu’en a)&nbsp;? Arrondis au millième.',lab:'x =',unit:'km',ans:3.464,tol:.0006,hint:'Il faut 1 + tan² θ = 4.',why:'tan² θ = 3, tan θ = √3, donc x = 2√3 ≈ 3,464 km.'},
  ],
  sol:'<p>On dérive <i>x</i>(<i>t</i>) = 2 tan <i>θ</i>(<i>t</i>) par la règle de chaîne : <b><i>dx</i>/<i>dt</i> = 2(1 + tan²<i>θ</i>) · <i>θ</i>′ = 4π(1 + tan²<i>θ</i>)</b>, en km/min.</p><p>En fonction de la position : tan <i>θ</i> = <i>x</i>/2, donc <i>dx</i>/<i>dt</i> = 4π(1 + <i>x</i>²/4) = π(4 + <i>x</i>²).</p><p>a) <i>x</i> = 0 : 4π ≈ 12,57 km/min. b) <i>x</i> = 2 : 8π ≈ 25,13 km/min. c) π(4 + <i>x</i>²) = 16π ⇔ <i>x</i>² = 12 ⇔ <i>x</i> = 2√3 ≈ 3,464 km.</p><p>La tache accélère sans limite quand <i>θ</i> → π/2 : le faisceau devient parallèle à la côte.</p>'},
 {kind:'Problème',h:'La perche dans le couloir',
  p:`Un couloir de 2 m de large débouche à angle droit sur un couloir de 3 m de large. On veut faire passer une perche horizontale, sans la plier, d’un couloir à l’autre. Une perche qui fait l’angle <i>θ</i> avec le mur du premier couloir et touche le coin intérieur a pour longueur, entre les deux murs extérieurs, <b><i>L</i>(<i>θ</i>) = ${F('2','sin <i>θ</i>')} + ${F('3','cos <i>θ</i>')}</b>, <i>θ</i> ∈ ]0 ; π/2[. La perche passe si et seulement si sa longueur ne dépasse aucune de ces valeurs.`,
  fig:(()=>{ const P=plane({x:[-.5,9],y:[-.5,8],grid:false,axes:false}), t=Math.atan(Math.cbrt(2/3)), x0=3+2/Math.tan(t), y0=2+3*Math.tan(t);
    P.poly([[0,8],[0,0],[9,0]],{open:true,c:'var(--ink)',w:2.5}).poly([[3,8],[3,2],[9,2]],{open:true,c:'var(--ink)',w:2.5}).seg(0,y0,x0,0,{c:'var(--spark)',w:4}).dot(3,2,{c:'var(--ink)',r:4,l:'coin',dx:6,dy:-6});
    P.text(6,1,'2 m',{s:11,c:'var(--muted)'}).text(1.5,6.5,'3 m',{a:'middle',s:11,c:'var(--muted)'}).text(x0-1.6,.25,'θ',{s:12}); return P.svg(); })(),
  parts:[
   {q:'a) Calcule <i>L</i>(π/4), arrondi au millième.',lab:'L =',unit:'m',ans:7.071,tol:.0006,hint:'sin(π/4) = cos(π/4) = √2/2.',why:'L(π/4) = 2√2 + 3√2 = 5√2 ≈ 7,071 m.'},
   {q:'b) Quelle est la dérivée <i>L</i>′(<i>θ</i>)&nbsp;?',opts:['−2 cos θ/sin² θ + 3 sin θ/cos² θ','2 cos θ/sin² θ − 3 sin θ/cos² θ','−2/cos θ + 3/sin θ','2 cos θ + 3 sin θ'],ans:0,hint:'(1/u)′ = −u′/u². Ici u = sin θ, puis u = cos θ.',why:'(2/sin θ)′ = −2 cos θ/sin² θ et (3/cos θ)′ = 3 sin θ/cos² θ.'},
   {q:'c) <i>L</i>′ s’annule quand tan³<i>θ</i> = 2/3. Quel angle obtiens-tu, en degrés, arrondi au dixième&nbsp;?',lab:'θ =',unit:'°',ans:41.1,tol:.06,hint:'L′ = 0 ⇔ 3 sin³ θ = 2 cos³ θ. Prends la racine cubique de 2/3, puis arctan.',why:'tan θ = (2/3)^(1/3) ≈ 0,8736, donc θ ≈ 41,1°. L′ < 0 avant et L′ > 0 après : c’est un minimum.'},
   {q:'d) Quelle est la longueur maximale d’une perche qui passe le coin&nbsp;? Arrondis au centième.',lab:'L =',unit:'m',ans:7.02,tol:.006,hint:'Calcule L en l’angle trouvé. Formule fermée possible : (2^(2/3) + 3^(2/3))^(3/2).',why:'L(41,14°) ≈ 7,02 m. Une perche plus longue resterait coincée dans la position la plus défavorable.'},
   {q:'e) Pourquoi la réponse est-elle le <b>minimum</b> de <i>L</i> et non son maximum&nbsp;?',opts:['Parce qu’une fonction dérivable atteint toujours son minimum en 0','Parce que L tend vers +∞ en 0 et en π/2, donc L n’a pas de maximum','Parce que la perche doit passer par toutes les positions θ, donc tenir dans la plus étroite','Parce que L′(θ) est positive sur tout l’intervalle'],ans:2,hint:'Pendant le passage, la perche prend successivement toutes les inclinaisons de 0 à π/2.',why:'En tournant, la perche passe par chaque angle θ. Elle doit donc être plus courte que L(θ) pour tous les θ, c’est-à-dire plus courte que le minimum de L.'},
  ],
  sol:'<p>On cherche le minimum de <i>L</i>(<i>θ</i>) = 2/sin <i>θ</i> + 3/cos <i>θ</i> sur ]0 ; π/2[ (<i>L</i> → +∞ aux deux bornes).</p><p><i>L</i>′(<i>θ</i>) = −2 cos <i>θ</i>/sin²<i>θ</i> + 3 sin <i>θ</i>/cos²<i>θ</i> = (3 sin³<i>θ</i> − 2 cos³<i>θ</i>)/(sin²<i>θ</i> cos²<i>θ</i>). Elle s’annule pour tan³<i>θ</i> = 2/3, soit <i>θ</i> ≈ 41,1°, négative avant et positive après.</p><p>Le minimum vaut <i>L</i> ≈ 7,02 m = (2<sup>2/3</sup> + 3<sup>2/3</sup>)<sup>3/2</sup>. La perche passe toutes les positions <i>θ</i> : elle doit donc mesurer au plus 7,02 m. Le choix intuitif <i>θ</i> = 45° donne 7,07 m, un peu trop : la perche de 7,05 m resterait coincée.</p>'},
]},

/* ===================== 7. Logarithmes et exponentielles ===================== */
{subj:'an2', sem:'aut', id:'an2-explog', h:'Logarithmes et exponentielles', p:'eˣ et ln comme réciproques, leurs règles de calcul, leurs dérivées et leurs croissances.', steps:[
 {h:'Deux fonctions réciproques',p:`<b>exp</b> : ℝ → ]0 ; +∞[ est bijective et strictement croissante. Sa réciproque est <b>ln</b> : ]0 ; +∞[ → ℝ. Donc <b><i>y</i> = e<sup><i>x</i></sup> ⇔ <i>x</i> = ln <i>y</i></b>, et leurs graphes sont symétriques par rapport à la droite <i>y</i> = <i>x</i>.`,
  params:[{id:'a',l:'a',min:-2,max:1.5,step:.25,v:.5}],
  draw:v=>{ const ea=Math.exp(v.a), P=plane({x:[-3,5],y:[-3,5],lab:1});
    P.seg(-3,-3,5,5,{c:'var(--muted)',w:1.5,dash:true}).fn(Math.exp,{c:'var(--accent)'}).fn(Math.log,{from:.02,to:5,c:'var(--math)',n:400});
    P.seg(v.a,ea,ea,v.a,{c:'var(--spark)',w:2,dash:true}).dot(v.a,ea,{c:'var(--accent)',l:'(a ; eᵃ)',dx:-60}).dot(ea,v.a,{c:'var(--math)',l:'(eᵃ ; a)',dy:16});
    P.text(-2.8,.6,'eˣ',{c:'var(--accent)'}).text(4,1.8,'ln x',{c:'var(--math)'}); return P.svg(); },
  info:v=>`e<sup>${fmt(v.a)}</sup> ≈ ${fmt(Math.exp(v.a),3)} et ln ${fmt(Math.exp(v.a),3)} ≈ ${fmt(v.a)}`,
  note:'e ≈ 2,718. ln 1 = 0, ln e = 1, et ln x < 0 pour 0 < x < 1.'},
 {h:'Règles de calcul et base a',p:`Pour <i>a</i>, <i>b</i> > 0 : <b>ln(<i>ab</i>) = ln <i>a</i> + ln <i>b</i></b>, ln(<i>a</i>/<i>b</i>) = ln <i>a</i> − ln <i>b</i>, <b>ln(<i>a</i><sup><i>r</i></sup>) = <i>r</i> ln <i>a</i></b>. Côté exponentielle : e<sup><i>x</i>+<i>y</i></sup> = e<sup><i>x</i></sup>e<sup><i>y</i></sup> et <b><i>a</i><sup><i>x</i></sup> = e<sup><i>x</i> ln <i>a</i></sup></b>. Le logarithme en base <i>a</i> (<i>a</i> > 0, <i>a</i> ≠ 1) est <b>log<sub><i>a</i></sub> <i>x</i> = ${F('ln <i>x</i>','ln <i>a</i>')}</b>, la réciproque de <i>a</i><sup><i>x</i></sup>.`,
  fig:(()=>{ const P=plane({x:[-.5,8.5],y:[-2.5,3.5],h:180,lab:2}); [[2,'var(--accent)'],[Math.E,'var(--math)'],[10,'var(--spark)']].forEach(([b,c])=>P.fn(x=>Math.log(x)/Math.log(b),{from:.03,to:8.5,c,w:2.5,n:400}));
    P.dot(1,0,{c:'var(--ink)',r:4}).text(6.6,3,'log₂',{c:'var(--accent)',s:11}).text(6.6,1.6,'ln',{c:'var(--math)',s:11}).text(6.6,.55,'log₁₀',{c:'var(--spark)',s:11}); return P.svg(); })(),
  note:'Piège classique : ln(a + b) n’est pas ln a + ln b. Et ln x n’existe que pour x > 0.'},
 {kind:'Méthode',h:'Simplifier avec ln et exp',p:`<b>Quand ?</b> Une expression mélange des logarithmes, des puissances et des racines : ln 8 − 2 ln 2, ln(e³√e), e<sup>2 ln 3</sup>.<br><b>Pourquoi ça marche ?</b> ln transforme les produits en sommes et les puissances en facteurs, et ln(e<sup><i>a</i></sup>) = <i>a</i>, e<sup>ln <i>b</i></sup> = <i>b</i> parce que ln et exp sont réciproques.<br><b>Comment ?</b> 1) Écris les racines comme des puissances : √<i>x</i> = <i>x</i><sup>1/2</sup>. 2) Décompose les nombres en puissances d’un même nombre premier (8 = 2³). 3) Applique ln(<i>ab</i>) = ln <i>a</i> + ln <i>b</i> et ln(<i>a</i><sup><i>r</i></sup>) = <i>r</i> ln <i>a</i>, puis regroupe.`,
  demo:{enonce:'Simplifie <i>A</i> = ln 8 − 2 ln 2 + ln(e²/2).',
   etapes:[
    {f:'ln 8 = ln(2³) = 3 ln 2.',w:'8 est une puissance de 2 : on fait apparaître ln 2 partout.'},
    {f:'ln(e²/2) = ln(e²) − ln 2 = 2 − ln 2.',w:'Le logarithme d’un quotient est la différence des logarithmes, et ln(e²) = 2.'},
    {f:'<i>A</i> = 3 ln 2 − 2 ln 2 + 2 − ln 2 = 2.',w:'On regroupe les termes en ln 2 : 3 − 2 − 1 = 0.'}],
   conclusion:'A = 2. Pour exp, même idée : e^(2 ln 3) = (e^(ln 3))² = 9.'}},
 {h:'Simplifie',p:'Combien vaut ln(e³ · √e)&nbsp;?',opts:['3/2','7/2','3','√3'],ans:1,
  why:'e³ · √e = e³ · e^(1/2) = e^(7/2), donc ln(e^(7/2)) = 7/2.'},
 {kind:'Méthode',h:'Résoudre une équation exponentielle',p:`<b>Quand ?</b> L’inconnue est dans un exposant : e<sup>3<i>x</i>−1</sup> = 4, 4<sup><i>x</i></sup> = 3<sup><i>x</i>+2</sup>.<br><b>Pourquoi ça marche ?</b> ln est strictement croissante, donc injective : pour <i>A</i>, <i>B</i> &gt; 0, <b><i>A</i> = <i>B</i> ⇔ ln <i>A</i> = ln <i>B</i></b>. Et ln fait « descendre » l’exposant : ln(<i>a</i><sup><i>x</i></sup>) = <i>x</i> ln <i>a</i>.<br><b>Comment ?</b> 1) Isole la puissance d’un côté. 2) Applique ln aux deux membres (ils doivent être &gt; 0 ; e<sup>…</sup> = −2 n’a aucune solution). 3) Résous l’équation du premier degré obtenue.`,
  demo:{enonce:'Résous e<sup>3<i>x</i>−1</sup> = 4, puis 4<sup><i>x</i></sup> = 3<sup><i>x</i>+2</sup>.',
   etapes:[
    {f:'3<i>x</i> − 1 = ln 4, donc <i>x</i> = (1 + ln 4)/3 ≈ 0,795.',w:'ln(e^(3x−1)) = 3x − 1 : l’exponentielle disparaît.'},
    {f:'<i>x</i> ln 4 = (<i>x</i> + 2) ln 3.',w:'Deux bases différentes : on prend ln des deux côtés, les exposants descendent.'},
    {f:'<i>x</i>(ln 4 − ln 3) = 2 ln 3.',w:'On regroupe les termes en x d’un côté. Attention, ln 4 et ln 3 sont des nombres : c’est une équation du premier degré.'},
    {f:'<i>x</i> = 2 ln 3 / ln(4/3) ≈ 7,638.',w:'ln 4 − ln 3 = ln(4/3) &gt; 0, on peut diviser.'}],
   conclusion:'x = (1 + ln 4)/3 ≈ 0,795 et x = 2 ln 3/ln(4/3) ≈ 7,638.'}},
 {h:'Équation exponentielle',p:'Résous e<sup>2<i>x</i></sup> = 5. Arrondis au centième.',lab:'x =',ans:.8,tol:.006,
  why:'On applique ln : 2x = ln 5, donc x = ln 5 / 2 ≈ 1,609 / 2 ≈ 0,80.'},
 {kind:'Méthode',h:'Résoudre une équation avec des logarithmes',p:`<b>Quand ?</b> L’inconnue est dans un ln : ln(<i>x</i> − 1) + ln(<i>x</i> + 1) = ln 3, ln(2<i>x</i>) = 3.<br><b>Pourquoi ça marche ?</b> ln est injective sur ]0 ; +∞[ : ln <i>A</i> = ln <i>B</i> ⇔ <i>A</i> = <i>B</i>, et ln <i>A</i> = <i>c</i> ⇔ <i>A</i> = e<sup><i>c</i></sup>. Mais en regroupant ln <i>a</i> + ln <i>b</i> = ln(<i>ab</i>), on agrandit le domaine : il peut apparaître des solutions qui rendent un ln d’origine impossible.<br><b>Comment ?</b> 1) <b>Domaine d’abord</b> : chaque argument de ln doit être &gt; 0. 2) Regroupe en un seul ln de chaque côté, puis enlève les ln. 3) Résous, et ne garde que les solutions du domaine.`,
  demo:{enonce:'Résous ln(<i>x</i> − 1) + ln(<i>x</i> + 1) = ln 3.',
   etapes:[
    {f:'Domaine : <i>x</i> − 1 &gt; 0 et <i>x</i> + 1 &gt; 0, soit <i>x</i> &gt; 1.',w:'On l’écrit avant de transformer l’équation.'},
    {f:'ln((<i>x</i> − 1)(<i>x</i> + 1)) = ln 3, donc <i>x</i>² − 1 = 3.',w:'La somme de ln devient le ln d’un produit, puis on enlève les ln.'},
    {f:'<i>x</i>² = 4, <i>x</i> = 2 ou <i>x</i> = −2.',w:'Équation du second degré.'},
    {f:'−2 n’est pas dans le domaine : seule <i>x</i> = 2 convient.',w:'En −2, ln(x − 1) = ln(−3) n’existe pas.'}],
   conclusion:'S = {2}. Contrôle : ln 1 + ln 3 = ln 3.'}},
 {h:'Équation logarithmique',p:'Résous ln <i>x</i> + ln(<i>x</i> − 2) = ln 8.',lab:'x =',ans:4,
  why:'Domaine : x > 2. Alors x(x − 2) = 8 ⇔ x² − 2x − 8 = 0 ⇔ (x − 4)(x + 2) = 0. −2 est hors du domaine, donc x = 4.'},
 {kind:'Méthode',h:'Changement de variable X = eˣ',p:`<b>Quand ?</b> L’équation contient e<sup>2<i>x</i></sup> et e<sup><i>x</i></sup> (ou e<sup><i>x</i></sup> et e<sup>−<i>x</i></sup>) : e<sup>2<i>x</i></sup> − 3e<sup><i>x</i></sup> + 2 = 0.<br><b>Pourquoi ça marche ?</b> e<sup>2<i>x</i></sup> = (e<sup><i>x</i></sup>)². En posant <b><i>X</i> = e<sup><i>x</i></sup></b>, l’équation devient un trinôme en <i>X</i>. Comme e<sup><i>x</i></sup> &gt; 0, seules les racines <i>X</i> &gt; 0 sont utiles.<br><b>Comment ?</b> 1) Pose <i>X</i> = e<sup><i>x</i></sup> (avec e<sup>−<i>x</i></sup> = 1/<i>X</i>, multiplie par <i>X</i>). 2) Résous le trinôme. 3) Rejette les racines ≤ 0, puis <i>x</i> = ln <i>X</i>.`,
  demo:{enonce:'Résous e<sup>2<i>x</i></sup> − 3e<sup><i>x</i></sup> + 2 = 0.',
   etapes:[
    {f:'<i>X</i> = e<sup><i>x</i></sup> : <i>X</i>² − 3<i>X</i> + 2 = 0.',w:'e^(2x) = (e^x)² = X².'},
    {f:'(<i>X</i> − 1)(<i>X</i> − 2) = 0, donc <i>X</i> = 1 ou <i>X</i> = 2.',w:'Les deux racines sont positives : on les garde.'},
    {f:'e<sup><i>x</i></sup> = 1 ⇔ <i>x</i> = 0 ; e<sup><i>x</i></sup> = 2 ⇔ <i>x</i> = ln 2.',w:'On revient à x avec ln.'}],
   conclusion:'S = {0 ; ln 2}. C’est la même idée que t = cos x pour les équations trigonométriques.'}},
 {h:'Avec X = eˣ',p:'Résous e<sup>2<i>x</i></sup> − e<sup><i>x</i></sup> − 6 = 0. Arrondis au centième.',lab:'x =',ans:1.1,tol:.006,
  why:'Avec X = eˣ : X² − X − 6 = (X − 3)(X + 2) = 0. X = −2 est rejeté (eˣ > 0), donc eˣ = 3 et x = ln 3 ≈ 1,10.'},
 {kind:'Méthode',h:'Inéquations avec exp et ln',p:`<b>Quand ?</b> e<sup>…</sup> ≥ <i>c</i>, ln(…) ≤ <i>c</i>, ou une puissance <i>q</i><sup><i>n</i></sup> &lt; <i>c</i> (« à partir de quand… »).<br><b>Pourquoi ça marche ?</b> exp et ln sont <b>strictement croissantes</b> : appliquer l’une ou l’autre aux deux membres <b>garde le sens</b> de l’inégalité. En revanche, diviser par un nombre négatif, comme ln 0,5, le <b>renverse</b>.<br><b>Comment ?</b> 1) Domaine si un ln apparaît. 2) Applique exp (pour enlever un ln) ou ln (pour descendre un exposant). 3) Isole l’inconnue en surveillant le signe de ce par quoi tu divises. 4) Croise avec le domaine.`,
  demo:{enonce:'Résous ln(2<i>x</i> − 1) ≤ 1, puis trouve le plus petit entier <i>n</i> tel que 0,5<sup><i>n</i></sup> &lt; 0,01.',
   etapes:[
    {f:'Domaine : 2<i>x</i> − 1 &gt; 0, soit <i>x</i> &gt; 1/2.',w:'Le ln doit exister.'},
    {f:'2<i>x</i> − 1 ≤ e, donc <i>x</i> ≤ (1 + e)/2 ≈ 1,859.',w:'On applique exp, croissante : le sens ne change pas.'},
    {f:'S = ]1/2 ; (1 + e)/2].',w:'On croise avec le domaine.'},
    {f:'<i>n</i> ln 0,5 &lt; ln 0,01, donc <i>n</i> &gt; ln 0,01 / ln 0,5 ≈ 6,64.',w:'ln est croissante, puis on divise par ln 0,5 &lt; 0 : l’inégalité se retourne.'},
    {f:'Le plus petit entier est <i>n</i> = 7.',w:'Contrôle : 0,5⁶ ≈ 0,0156 et 0,5⁷ ≈ 0,0078.'}],
   conclusion:'ln(2x − 1) ≤ 1 ⇔ x ∈ ]1/2 ; (1 + e)/2], et 0,5ⁿ < 0,01 dès n = 7.'}},
 {h:'À partir de quand&nbsp;?',p:'Quel est le plus petit entier <i>n</i> tel que 0,9<sup><i>n</i></sup> &lt; 0,1&nbsp;?',lab:'n =',ans:22,
  why:'n ln 0,9 < ln 0,1. ln 0,9 < 0, donc n > ln 0,1/ln 0,9 ≈ 21,85. Le plus petit entier est 22 (0,9²¹ ≈ 0,109 et 0,9²² ≈ 0,098).'},
 {h:'Dérivées',p:`<b>(e<sup><i>x</i></sup>)′ = e<sup><i>x</i></sup></b> : en chaque point, la pente vaut la hauteur. Par la dérivée de la réciproque, <b>(ln <i>x</i>)′ = ${F(1,'<i>x</i>')}</b>. Avec la règle de chaîne : (e<sup><i>u</i></sup>)′ = <i>u</i>′e<sup><i>u</i></sup>, (ln <i>u</i>)′ = ${F('<i>u</i>′','<i>u</i>')} et (<i>a</i><sup><i>x</i></sup>)′ = <i>a</i><sup><i>x</i></sup> ln <i>a</i>.`,
  params:[{id:'x',l:'x₀',min:-2,max:1.5,step:.25,v:0}],
  draw:v=>{ const e=Math.exp(v.x), P=plane({x:[-4,3],y:[-1,5],lab:1}); P.fn(Math.exp,{c:'var(--accent)'}).fn(x=>e*(x-v.x+1),{c:'var(--spark)',w:2.5});
    P.seg(v.x,0,v.x,e,{c:'var(--muted)',w:1.5,dash:true}).seg(v.x-1,0,v.x,0,{c:'var(--math)',w:4}).dot(v.x,e,{c:'var(--accent)'}).dot(v.x-1,0,{c:'var(--math)',r:4}); return P.svg(); },
  info:v=>`pente en x₀ = e<sup>${fmt(v.x)}</sup> ≈ ${fmt(Math.exp(v.x),3)} = hauteur du point`,
  note:'La tangente coupe toujours l’axe horizontal en x₀ − 1 (segment coloré) : c’est une autre façon de voir que la pente est égale à la valeur.'},
 {h:'Dérivée d’un logarithme',p:'<i>f</i>(<i>x</i>) = ln(<i>x</i>² + 3). Calcule <i>f</i> ′(1).',lab:'f ′(1) =',ans:.5,
  why:'f ′(x) = 2x / (x² + 3). En 1 : 2/4 = 0,5.'},
 {h:'Croissances comparées',p:`Pour tout <i>n</i> > 0 : <b>lim<sub><i>x</i>→+∞</sub> ${F('e<sup><i>x</i></sup>','<i>x</i><sup><i>n</i></sup>')} = +∞</b>, <b>lim<sub><i>x</i>→+∞</sub> ${F('ln <i>x</i>','<i>x</i><sup><i>n</i></sup>')} = 0</b> et lim<sub><i>x</i>→0⁺</sub> <i>x</i><sup><i>n</i></sup> ln <i>x</i> = 0. L’exponentielle l’emporte sur toute puissance, qui l’emporte sur le logarithme. Le graphe montre <i>x</i><sup><i>n</i></sup>e<sup>−<i>x</i></sup> : il monte, puis s’écrase vers 0.`,
  params:[{id:'n',l:'n',min:1,max:5,step:1,v:2}],
  draw:v=>{ const n=v.n, M=Math.pow(n,n)*Math.exp(-n), P=plane({x:[-.5,25],y:[-.12*M,1.25*M],grid:false,h:170});
    P.fn(x=>Math.pow(Math.max(x,0),n)*Math.exp(-x),{from:0,to:25,n:400}).dot(n,M,{c:'var(--spark)',l:`max en x = ${n}`});
    [5,10,15,20].forEach(x=>P.text(x,0,String(x),{a:'middle',dy:15,s:11,c:'var(--muted)'})); return P.svg(); },
  info:v=>`xⁿe⁻ˣ vaut au plus ${fmt(Math.pow(v.n,v.n)*Math.exp(-v.n),3)} et seulement ${sci(Math.pow(25,v.n)*Math.exp(-25))} en x = 25`,
  note:'Le maximum est en x = n, car la dérivée vaut xⁿ⁻¹e⁻ˣ(n − x).'},
 {kind:'Méthode',h:'Lever une indétermination par croissances comparées',p:`<b>Quand ?</b> Une limite mélange exponentielle, puissances et logarithmes et donne une forme indéterminée : ∞ − ∞, ∞/∞, 0 · ∞.<br><b>Pourquoi ça marche ?</b> En +∞, e<sup><i>x</i></sup> écrase toute puissance, qui écrase toute puissance de ln : le terme le plus fort impose la limite. On le met <b>en facteur</b> pour que les autres termes deviennent des quotients connus, qui tendent vers 0.<br><b>Comment ?</b> 1) Repère le terme dominant. 2) Factorise-le, en haut et en bas d’un quotient. 3) Conclus avec les limites de référence. Si un ln gêne, pose <i>x</i> = e<sup><i>t</i></sup> (ou <i>x</i> = e<sup>−<i>t</i></sup> en 0⁺) : tout s’écrit avec <i>t</i> et e<sup><i>t</i></sup>.`,
  demo:{enonce:'Calcule lim<sub><i>x</i>→+∞</sub> (<i>x</i>³ − e<sup><i>x</i></sup>), puis lim<sub><i>x</i>→0⁺</sub> <i>x</i>(ln <i>x</i>)².',
   etapes:[
    {f:'Forme ∞ − ∞. Le terme dominant est e<sup><i>x</i></sup> : <i>x</i>³ − e<sup><i>x</i></sup> = e<sup><i>x</i></sup>(<i>x</i>³/e<sup><i>x</i></sup> − 1).',w:'On factorise le terme le plus fort.'},
    {f:'<i>x</i>³/e<sup><i>x</i></sup> → 0, donc la parenthèse tend vers −1 et le produit vers −∞.',w:'Croissance comparée : e^x/x³ → +∞, donc son inverse tend vers 0.'},
    {f:'Forme 0 · ∞. On pose <i>x</i> = e<sup>−<i>t</i></sup> avec <i>t</i> → +∞ : ln <i>x</i> = −<i>t</i>.',w:'Quand x → 0⁺, t = −ln x → +∞. Le ln disparaît.'},
    {f:'<i>x</i>(ln <i>x</i>)² = e<sup>−<i>t</i></sup> <i>t</i>² = <i>t</i>²/e<sup><i>t</i></sup> → 0.',w:'L’exponentielle l’emporte sur la puissance t².'}],
   conclusion:'lim (x³ − eˣ) = −∞ en +∞ et lim x(ln x)² = 0 en 0⁺.'}},
 {h:'Qui gagne&nbsp;?',p:'Que vaut lim<sub><i>x</i>→+∞</sub> (ln <i>x</i>)² / <i>x</i>&nbsp;?',opts:['+∞','1','0','e'],ans:2,
  why:'Avec x = e^t : (ln x)²/x = t²/e^t → 0 quand t → +∞. L’exponentielle l’emporte sur la puissance.'},
 {h:'Un quotient',p:'Calcule lim<sub><i>x</i>→+∞</sub> (e<sup><i>x</i></sup> + <i>x</i>) / (e<sup><i>x</i></sup> − <i>x</i>²).',lab:'limite =',ans:1,tol:.001,
  why:'On factorise eˣ en haut et en bas : (1 + x/eˣ)/(1 − x²/eˣ). Par croissances comparées, x/eˣ → 0 et x²/eˣ → 0, donc la limite vaut 1.'},
 {kind:'Défi',h:'Deux bases',p:'Résous 3<sup><i>x</i></sup> = 2<sup><i>x</i>+1</sup>. Arrondis au centième.',lab:'x =',ans:1.71,tol:.006,
  why:'On prend ln : x ln 3 = (x + 1) ln 2, donc x (ln 3 − ln 2) = ln 2 et x = ln 2 / ln(3/2) ≈ 0,693 / 0,405 ≈ 1,71.'},
 {kind:'Problème',h:'Datation au carbone 14',
  p:'Dans un organisme mort, la quantité de carbone 14 décroît selon <b><i>N</i>(<i>t</i>) = <i>N</i>₀ e<sup>−<i>λt</i></sup></b>, avec <i>t</i> en années. La demi-vie du carbone 14 est de 5730 ans : au bout de 5730 ans, il reste la moitié de la quantité initiale. Un os découvert lors d’une fouille contient encore 30 % du carbone 14 d’un os actuel.',
  parts:[
   {q:'a) La constante <i>λ</i> vérifie e<sup>−5730<i>λ</i></sup> = ½. Laquelle de ces expressions est correcte&nbsp;?',opts:['λ = 5730 / ln 2','λ = ln 2 / 5730','λ = e^(1/2) / 5730','λ = 1/(2 · 5730)'],ans:1,hint:'Applique ln aux deux membres : ln(1/2) = −ln 2.',why:'−5730 λ = −ln 2, donc λ = ln 2 / 5730 ≈ 1,21·10⁻⁴ par an.'},
   {q:'b) Quel pourcentage de carbone 14 reste-t-il au bout de 1000 ans&nbsp;? Arrondis au dixième.',lab:'reste =',unit:'%',ans:88.6,tol:.06,hint:'Calcule e^(−1000λ), ou 2^(−1000/5730).',why:'e^(−1000 ln 2/5730) = 2^(−0,1745) ≈ 0,886, soit 88,6 %.'},
   {q:'c) Quel est l’âge de l’os&nbsp;? Arrondis à la centaine d’années.',lab:'t =',unit:'ans',ans:9950,tol:50,hint:'Résous e^(−λt) = 0,3 avec ln.',why:'t = ln(1/0,3)/λ = 5730 · ln(10/3)/ln 2 ≈ 9953 ans, soit environ 9950 ans.'},
   {q:'d) La méthode n’est plus fiable sous 1 % de carbone 14 restant. À partir de quel âge&nbsp;? Arrondis au millier d’années.',lab:'t =',unit:'ans',ans:38000,tol:500,hint:'e^(−λt) = 0,01 donne t = ln 100/λ = 5730 · log₂ 100.',why:'t = 5730 · ln 100/ln 2 ≈ 5730 · 6,64 ≈ 38 069 ans, soit environ 38 000 ans.'},
  ],
  sol:'<p>De e<sup>−5730<i>λ</i></sup> = ½ on tire <i>λ</i> = ln 2/5730 ≈ 1,21·10⁻⁴ an⁻¹. On peut aussi écrire <i>N</i>(<i>t</i>) = <i>N</i>₀ · 2<sup>−<i>t</i>/5730</sup>.</p><p>Après 1000 ans : 2<sup>−1000/5730</sup> ≈ 0,886, il reste 88,6 %.</p><p>Pour l’os : e<sup>−<i>λt</i></sup> = 0,3 ⇔ <i>t</i> = ln(1/0,3)/<i>λ</i> = 5730 · ln(10/3)/ln 2 ≈ 9950 ans.</p><p>Seuil de 1 % : <i>t</i> = 5730 · log₂ 100 ≈ 38 000 ans, soit un peu moins de 7 demi-vies (2⁻⁷ ≈ 0,8 %).</p>'},
 {kind:'Problème',h:'e<sup>π</sup> ou π<sup>e</sup>&nbsp;?',
  p:`Lequel est le plus grand, e<sup>π</sup> ou π<sup>e</sup>&nbsp;? Sans calculatrice, on compare leurs logarithmes : π et <i>e</i> ln π. En divisant par π<i>e</i>, la question devient : comparer ${F('ln e','e')} et ${F('ln π','π')}. On étudie donc <b><i>f</i>(<i>x</i>) = ${F('ln <i>x</i>','<i>x</i>')}</b> sur ]0 ; +∞[.`,
  fig:(()=>{ const P=plane({x:[-.3,10],y:[-.6,.6],w:320,h:150,grid:false,lx:2}); P.fn(x=>Math.log(x)/x,{from:.55,to:10,n:300}).dot(Math.E,1/Math.E,{l:'x = e'}).dot(Math.PI,Math.log(Math.PI)/Math.PI,{c:'var(--math)',r:4,l:'π',dx:4,dy:16}); return P.svg(); })(),
  parts:[
   {q:'a) En quelle valeur de <i>x</i> la dérivée <i>f</i>′ s’annule-t-elle&nbsp;? Arrondis au millième.',lab:'x =',ans:2.718,tol:.0006,hint:'Règle du quotient : f′(x) = (1 − ln x)/x².',why:'f′(x) = (1 − ln x)/x² s’annule pour ln x = 1, soit x = e ≈ 2,718.'},
   {q:'b) Quelle est la valeur maximale de <i>f</i>&nbsp;? Arrondis au millième.',lab:'f(e) =',ans:.368,tol:.0006,hint:'f′ > 0 avant e et f′ < 0 après.',why:'f(e) = 1/e ≈ 0,368 est le maximum global de f.'},
   {q:'c) Que peux-tu conclure&nbsp;?',opts:['π^e > e^π, car π > e','e^π = π^e','e^π > π^e, car f(π) < f(e)','On ne peut pas conclure sans calculatrice'],ans:2,hint:'π ≠ e, donc f(π) est strictement inférieur au maximum f(e). Multiplie ensuite par πe > 0.',why:'ln π/π < 1/e donne e ln π < π, puis π^e < e^π par croissance de exp. (e^π ≈ 23,14 et π^e ≈ 22,46.)'},
   {q:'d) La même fonction résout xʸ = yˣ. L’équation 2ˣ = x² a pour solutions positives x = 2 et une autre valeur entière. Laquelle&nbsp;?',lab:'x =',ans:4,hint:'2ˣ = x² ⇔ ln 2/2 = ln x/x : cherche un autre x avec f(x) = f(2). Il est plus grand que e.',why:'f(4) = ln 4/4 = 2 ln 2/4 = ln 2/2 = f(2). Et 2⁴ = 16 = 4².'},
  ],
  sol:'<p>Comme ln est croissante, e<sup>π</sup> &gt; π<sup>e</sup> ⇔ π &gt; <i>e</i> ln π ⇔ 1/<i>e</i> &gt; ln π/π ⇔ <i>f</i>(<i>e</i>) &gt; <i>f</i>(π).</p><p><i>f</i>′(<i>x</i>) = (1 − ln <i>x</i>)/<i>x</i>² est positive sur ]0 ; <i>e</i>[ et négative sur ]<i>e</i> ; +∞[ : <i>f</i> a un maximum strict en <i>e</i>, de valeur 1/<i>e</i>. Comme π ≠ <i>e</i>, <i>f</i>(π) &lt; <i>f</i>(<i>e</i>), donc <b>e<sup>π</sup> &gt; π<sup>e</sup></b>.</p><p>De même, <i>x</i><sup><i>y</i></sup> = <i>y</i><sup><i>x</i></sup> (<i>x</i>, <i>y</i> &gt; 0) ⇔ <i>f</i>(<i>x</i>) = <i>f</i>(<i>y</i>). Chaque valeur de ]0 ; 1/<i>e</i>[ est prise une fois avant <i>e</i> et une fois après : 2 et 4 forment une telle paire, d’où 2⁴ = 4².</p>'},
]},
);
})();
