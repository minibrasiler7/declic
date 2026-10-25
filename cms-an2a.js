/* Déclic — Analyse II automne (PREPA-005, fonctions spéciales) */
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

CMS.push(
/* ===================== 1. L'angle et sa mesure ===================== */
{subj:'an2', sem:'aut', id:'cms-an2-angle', h:'L’angle et sa mesure', p:'Degrés, radians, longueur d’arc et cercle trigonométrique.', steps:[
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
 {h:'Le même point',p:'Règle l’angle pour obtenir la mesure principale de 17π/6.',
  params:[{id:'k',l:'θ (multiples de π/6)',min:-6,max:6,step:1,v:0}],
  draw:v=>{ const th=v.k*PI/6, P=circle({R:1.4}); arc(P,0,th,.35,{c:'var(--spark)',w:2.5}); ray(P,th);
    P.dot(Math.cos(17*PI/6),Math.sin(17*PI/6),{c:'var(--line)',r:9}).dot(Math.cos(th),Math.sin(th),{c:'var(--accent)'}); return P.svg(); },
  info:v=>`θ = ${pf(v.k,6)}`,ok:v=>v.k===5,
  why:'17π/6 = 12π/6 + 5π/6 = 2π + 5π/6. On retire un tour : la mesure principale est 5π/6, qui est bien dans ]−π ; π].'},
 {kind:'Défi',h:'L’aiguille des minutes',p:'L’aiguille des minutes d’une horloge mesure 12 cm. Quelle longueur d’arc parcourt sa pointe en 20 minutes&nbsp;? Arrondis au centième.',lab:'s =',unit:'cm',ans:25.13,tol:.01,
  why:'20 min = 1/3 de tour, soit θ = 2π/3 rad. s = 12 · 2π/3 = 8π ≈ 25,13 cm.'},
]},

/* ===================== 2. Fonctions trigonométriques ===================== */
{subj:'an2', sem:'aut', id:'cms-an2-fonctions', h:'Fonctions trigonométriques', p:'Sinus, cosinus, tangente et leurs réciproques, du cercle au graphe.', steps:[
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
 {h:'Valeur remarquable',p:'Combien vaut cos(5π/6)&nbsp;?',opts:['√3/2','−1/2','−√3/2','1/2'],ans:2,
  why:'5π/6 = π − π/6. Le symétrique par rapport à l’axe vertical change le signe du cosinus : cos(5π/6) = −cos(π/6) = −√3/2.'},
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
 {h:'Arccosinus',p:'Combien vaut arccos(−1/2)&nbsp;?',opts:['−π/3','4π/3','5π/6','2π/3'],ans:3,
  why:'On cherche l’angle de [0 ; π] dont le cosinus vaut −1/2 : c’est 2π/3, car cos(2π/3) = −cos(π/3) = −1/2. 4π/3 a le même cosinus mais n’est pas dans [0 ; π].'},
 {kind:'Défi',h:'Attention à l’intervalle',p:'Combien vaut arcsin(sin(3π/4))&nbsp;?',opts:['3π/4','−π/4','π/4','5π/4'],ans:2,
  why:'sin(3π/4) = √2/2. L’angle de [−π/2 ; π/2] de sinus √2/2 est π/4. 3π/4 n’est pas dans l’intervalle image de arcsin.'},
]},

/* ===================== 3. Formules trigonométriques ===================== */
{subj:'an2', sem:'aut', id:'cms-an2-formules', h:'Formules trigonométriques', p:'Pythagore sur le cercle, formules d’addition, angle double et somme-produit.', steps:[
 {h:'La relation fondamentale',p:`Le point (cos <i>x</i> ; sin <i>x</i>) est sur le cercle de rayon 1, donc par Pythagore : <b>sin²<i>x</i> + cos²<i>x</i> = 1</b> pour tout <i>x</i> réel. En divisant par cos²<i>x</i>, on obtient aussi <b>1 + tan²<i>x</i> = ${F(1,'cos²<i>x</i>')}</b>.`,
  params:[{id:'t',l:'x',min:0,max:360,step:15,v:30,u:'°'}],
  draw:v=>{ const x=rad(v.t), c=Math.cos(x), s=Math.sin(x), P=circle({R:1.35});
    P.poly([[0,0],[c,0],[c,s]],{fill:'var(--accent)',fo:.15,c:null}).seg(0,0,c,0,{c:'var(--math)',w:5}).seg(c,0,c,s,{c:'var(--spark)',w:5}); ray(P,x);
    P.text(c/2,0,'cos x',{a:'middle',dy:s>=0?16:-8,s:11,c:'var(--math)'}).dot(c,s,{c:'var(--accent)'}); return P.svg(); },
  info:v=>{ const c=Math.cos(rad(v.t)), s=Math.sin(rad(v.t)); return `cos² x ≈ ${fmt(c*c,3)} · sin² x ≈ ${fmt(s*s,3)} · somme = <b>1</b>`; }},
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
 {h:'Une valeur exacte',p:'Utilise 15° = 45° − 30° pour trouver sin 15°.',opts:['(√6 + √2)/4','(√3 − 1)/2','(√6 − √2)/4','√2/4'],ans:2,
  why:'sin(45° − 30°) = sin 45° cos 30° − cos 45° sin 30° = (√2/2)(√3/2) − (√2/2)(1/2) = (√6 − √2)/4 ≈ 0,259.'},
 {h:'Angle double et linéarisation',p:`Avec <i>a</i> = <i>b</i> : <b>sin 2<i>a</i> = 2 sin <i>a</i> cos <i>a</i></b> et <b>cos 2<i>a</i> = cos²<i>a</i> − sin²<i>a</i> = 2cos²<i>a</i> − 1 = 1 − 2sin²<i>a</i></b>. On en tire les formules de <b>linéarisation</b> : cos²<i>a</i> = ${F('1 + cos 2<i>a</i>',2)} et sin²<i>a</i> = ${F('1 − cos 2<i>a</i>',2)}.`,
  fig:(()=>{ const P=plane({x:[-.3,6.6],y:[-1.2,1.2],step:PI/2,h:130});
    P.fn(x=>Math.cos(2*x),{c:'var(--muted)',w:2,dash:true}).seg(-.3,.5,6.6,.5,{c:'var(--line)',w:1.5}).fn(x=>Math.sin(x)**2,{c:'var(--accent)'});
    P.text(3.6,1,'sin² x',{c:'var(--accent)'}).text(.5,-.9,'cos 2x',{c:'var(--muted)'}); ticksPi(P,.1,6.5,0,2); return P.svg(); })(),
  note:'sin² x oscille autour de 1/2 deux fois plus vite que sin x : c’est exactement (1 − cos 2x)/2.'},
 {h:'Cosinus double',p:`On sait que cos <i>a</i> = ${F(1,3)}. Calcule cos 2<i>a</i> (une fraction est acceptée).`,lab:'cos 2a =',ans:-7/9,tol:.001,
  why:'cos 2a = 2cos² a − 1 = 2 · 1/9 − 1 = −7/9.'},
 {h:'Somme en produit',p:`Les formules de <b>transformation somme-produit</b> :<br>sin <i>p</i> + sin <i>q</i> = 2 sin ${F('<i>p</i> + <i>q</i>',2)} cos ${F('<i>p</i> − <i>q</i>',2)}<br>cos <i>p</i> + cos <i>q</i> = 2 cos ${F('<i>p</i> + <i>q</i>',2)} cos ${F('<i>p</i> − <i>q</i>',2)}<br>Ici <i>y</i> = sin <i>px</i> + sin <i>qx</i> : quand <i>p</i> et <i>q</i> sont proches, la somme oscille vite dans une enveloppe lente (les <b>battements</b>).`,
  params:[{id:'p',l:'p',min:1,max:12,step:1,v:9},{id:'q',l:'q',min:1,max:12,step:1,v:8}],
  draw:v=>{ const P=plane({x:[0,6.3],y:[-2.3,2.3],step:PI/2,w:320,h:200}), e=x=>2*Math.cos((v.p-v.q)*x/2);
    P.fn(e,{c:'var(--math)',w:2,dash:true}).fn(x=>-e(x),{c:'var(--math)',w:2,dash:true}).fn(x=>Math.sin(v.p*x)+Math.sin(v.q*x),{c:'var(--accent)',w:2.5,n:800}); return P.svg(); },
  info:v=>`sin ${v.p}x + sin ${v.q}x = 2 sin ${fmt((v.p+v.q)/2,1)}x · cos ${fmt((v.p-v.q)/2,1)}x`,
  note:'Les deux autres : sin p − sin q = 2 cos((p + q)/2) sin((p − q)/2) et cos p − cos q = −2 sin((p + q)/2) sin((p − q)/2).'},
 {kind:'Défi',h:'Factorise',p:'Écris cos 3<i>x</i> + cos <i>x</i> sous forme de produit.',opts:['2 cos 2x cos x','2 sin 2x sin x','−2 sin 2x sin x','2 cos 4x cos 2x'],ans:0,
  why:'Avec p = 3x et q = x : (p + q)/2 = 2x et (p − q)/2 = x, donc cos 3x + cos x = 2 cos 2x cos x.'},
]},

/* ===================== 4. Équations trigonométriques ===================== */
{subj:'an2', sem:'aut', id:'cms-an2-equations', h:'Équations trigonométriques', p:'Résoudre sin x = a, cos x = a, tan x = a et s’y ramener.', steps:[
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
 {h:'Solution générale',p:'Quelles sont les solutions de cos <i>x</i> = √2/2&nbsp;?',opts:['x = π/4 + kπ','x = ±π/4 + 2kπ','x = π/4 + 2kπ ou x = 3π/4 + 2kπ','x = ±3π/4 + 2kπ'],ans:1,
  why:'arccos(√2/2) = π/4, donc x = ±π/4 + 2kπ. La troisième proposition résout sin x = √2/2.'},
 {h:'Trouve une solution',p:'Règle <i>x</i> dans [0 ; 2π[ sur une solution de <b>sin <i>x</i> = −½</b>.',
  params:[{id:'t',l:'x',min:0,max:345,step:15,v:90,u:'°'}],
  draw:v=>{ const x=rad(v.t), P=circle({R:1.4}); P.seg(-1.4,-.5,1.4,-.5,{c:'var(--bad)',w:1.5,dash:true}); ray(P,x);
    P.seg(Math.cos(x),0,Math.cos(x),Math.sin(x),{c:'var(--spark)',w:5}).dot(Math.cos(x),Math.sin(x),{c:'var(--accent)'}); return P.svg(); },
  info:v=>`x = ${pf(v.t,180)} · sin x ≈ ${fmt(Math.sin(rad(v.t)),3)}`,ok:v=>v.t===210||v.t===330,
  why:'α = arcsin(−½) = −π/6. Les solutions sont −π/6 + 2kπ et π + π/6 + 2kπ. Dans [0 ; 2π[ : 7π/6 (210°) et 11π/6 (330°).'},
 {h:'Compte les solutions',p:'Combien de solutions l’équation cos(2<i>x</i>) = ½ a-t-elle dans [0 ; 2π[&nbsp;?',lab:'nombre =',ans:4,
  why:'2x = ±π/3 + 2kπ, donc x = ±π/6 + kπ. Dans [0 ; 2π[ : π/6, 5π/6, 7π/6 et 11π/6, soit 4 solutions. Diviser par 2 transforme le « 2kπ » en « kπ ».'},
 {kind:'Méthode',h:'Se ramener à un trinôme',p:`Pour 2 sin²<i>x</i> − 3 sin <i>x</i> + 1 = 0, pose <b><i>t</i> = sin <i>x</i></b> avec <i>t</i> ∈ [−1 ; 1]. On résout 2<i>t</i>² − 3<i>t</i> + 1 = 0 : <i>t</i> = 1 ou <i>t</i> = ½. Puis sin <i>x</i> = 1 donne <i>x</i> = π/2 + 2<i>k</i>π, et sin <i>x</i> = ½ donne <i>x</i> = π/6 + 2<i>k</i>π ou 5π/6 + 2<i>k</i>π.`,
  fig:(()=>{ const P=plane({x:[-.3,6.6],y:[-1,6.3],step:PI/2,h:170}); P.fn(x=>2*Math.sin(x)**2-3*Math.sin(x)+1,{from:0,to:2*PI});
    [PI/6,PI/2,5*PI/6].forEach(x=>P.dot(x,0,{c:'var(--spark)',r:5})); ticksPi(P,.1,6.5,0,2); return P.svg(); })(),
  note:'Si l’équation mélange sin² et cos, remplace sin² x par 1 − cos² x pour n’avoir qu’une seule fonction. Rejette les racines t hors de [−1 ; 1].'},
 {h:'À toi',p:'Résous 2cos²<i>x</i> + cos <i>x</i> − 1 = 0 dans [0 ; 2π[.',opts:['{π/3 ; 5π/3}','{2π/3 ; 4π/3 ; 0}','{π/3 ; π ; 5π/3}','{π/6 ; π ; 11π/6}'],ans:2,
  why:'Avec t = cos x : 2t² + t − 1 = (2t − 1)(t + 1) = 0, donc t = ½ ou t = −1. cos x = ½ donne π/3 et 5π/3, cos x = −1 donne π.'},
 {kind:'Défi',h:'Avec un changement de fonction',p:'Résous 2 sin²<i>x</i> + 3 cos <i>x</i> = 0. Donne la plus petite solution de [0 ; 2π[ en radians, arrondie au centième.',lab:'x =',ans:2.09,tol:.006,
  why:'2(1 − cos² x) + 3 cos x = 0 ⇔ 2cos² x − 3 cos x − 2 = 0, racines t = 2 (rejetée, > 1) et t = −½. cos x = −½ donne 2π/3 ≈ 2,09 et 4π/3.'},
]},

/* ===================== 5. Relations dans les triangles ===================== */
{subj:'an2', sem:'aut', id:'cms-an2-triangles', h:'Relations dans les triangles', p:'Triangle rectangle, loi des sinus, loi du cosinus et résolution de triangles.', steps:[
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
 {kind:'Méthode',h:'Résoudre un triangle',p:`Résoudre un triangle, c’est trouver ses trois côtés et ses trois angles. Choisis l’outil selon les données :`,
  fig:`<table><tr><td><b>Données</b></td><td><b>Outil</b></td></tr><tr><td>3 côtés</td><td>loi du cosinus pour chaque angle</td></tr><tr><td>2 côtés et l’angle compris</td><td>loi du cosinus, puis loi des sinus</td></tr><tr><td>1 côté et 2 angles</td><td>somme 180°, puis loi des sinus</td></tr><tr><td>2 côtés et un angle non compris</td><td>loi des sinus : 0, 1 ou 2 solutions</td></tr></table>`,
  note:'Avec la loi des sinus, sin β = k a deux solutions dans ]0° ; 180°[ : β et 180° − β. Vérifie si la seconde laisse une somme d’angles inférieure à 180°. Pour trouver un angle, préfère la loi du cosinus : arccos n’a pas cette ambiguïté.'},
 {kind:'Défi',h:'Le plus grand angle',p:'Un triangle a pour côtés 7, 8 et 9. Calcule son plus grand angle en degrés, arrondi au dixième.',lab:'γ =',unit:'°',ans:73.4,tol:.05,
  why:'Le plus grand angle est opposé au plus grand côté. cos γ = (7² + 8² − 9²)/(2 · 7 · 8) = 32/112 = 2/7, donc γ = arccos(2/7) ≈ 73,4°.'},
]},

/* ===================== 6. Continuité et dérivabilité ===================== */
{subj:'an2', sem:'aut', id:'cms-an2-derivees', h:'Dérivées des fonctions trigonométriques', p:'La limite de sin x / x, puis les dérivées de sin, cos, tan, arctan et arcsin.', steps:[
 {h:'Pourquoi sin x / x tend vers 1',p:`Pour 0 < <i>x</i> < ${F('π',2)} (en radians), le cercle trigonométrique montre <b>sin <i>x</i> ≤ <i>x</i> ≤ tan <i>x</i></b> : la demi-corde, l’arc, puis le segment tangent. En divisant par sin <i>x</i> : 1 ≤ <i>x</i>/sin <i>x</i> ≤ 1/cos <i>x</i>. Le théorème des deux gendarmes donne <b>lim<sub><i>x</i>→0</sub> ${F('sin <i>x</i>','<i>x</i>')} = 1</b>.`,
  params:[{id:'x',l:'x (rad)',min:.05,max:1,step:.05,v:.8}],
  draw:v=>{ const x=v.x, c=Math.cos(x), s=Math.sin(x), T=Math.tan(x), P=plane({x:[-.15,1.3],y:[-.15,1.7],step:.5,w:250});
    arc(P,0,PI/2,1,{c:'var(--line)',w:2}); P.seg(0,0,1,T,{c:'var(--ink)',w:1.5}).seg(c,0,c,s,{c:'var(--math)',w:4.5}).seg(1,0,1,T,{c:'var(--spark)',w:4.5});
    arc(P,0,x,1,{c:'var(--accent)',w:4.5}); P.text(c,s/2,'sin x',{a:'end',dx:-5,s:11,c:'var(--math)'}).text(1,T/2,'tan x',{dx:5,s:11,c:'var(--spark)'}); return P.svg(); },
  info:v=>`sin x ≈ ${fmt(Math.sin(v.x),4)} ≤ x = ${fmt(v.x,2)} ≤ tan x ≈ ${fmt(Math.tan(v.x),4)} · <b>sin x / x ≈ ${fmt(Math.sin(v.x)/v.x,4)}</b>`,
  note:'Ce résultat n’est vrai qu’en radians. En degrés, la limite vaudrait π/180.'},
 {h:'Une variante',p:'Que vaut lim<sub><i>x</i>→0</sub> sin(3<i>x</i>) / <i>x</i>&nbsp;?',opts:['1','0','3','1/3'],ans:2,
  why:'sin(3x)/x = 3 · sin(3x)/(3x). Avec u = 3x → 0, sin u / u → 1, donc la limite vaut 3.'},
 {h:'Continuité, puis dérivée de sin',p:`sin et cos sont <b>continues sur ℝ</b>, tan est continue sur son domaine. On montre aussi que ${F('1 − cos <i>h</i>','<i>h</i>')} → 0. Alors ${F('sin(<i>x</i> + <i>h</i>) − sin <i>x</i>','<i>h</i>')} = cos <i>x</i> · ${F('sin <i>h</i>','<i>h</i>')} − sin <i>x</i> · ${F('1 − cos <i>h</i>','<i>h</i>')} → cos <i>x</i>. Le graphe de sin <i>x</i> / <i>x</i> ci-dessous a un trou en 0, qu’on bouche par la valeur 1.`,
  fig:(()=>{ const P=plane({x:[-12.5,12.5],y:[-.4,1.2],step:PI,h:140}); P.fn(x=>Math.abs(x)<1e-9?1:Math.sin(x)/x,{n:400});
    P.dot(0,1,{c:'var(--ink)',r:6}).dot(0,1,{c:'var(--surface)',r:3}).text(.6,1,'limite 1',{dy:-6,s:11}); return P.svg(); })()},
 {h:'La pente de sin, c’est cos',p:`<b>(sin <i>x</i>)′ = cos <i>x</i></b> et <b>(cos <i>x</i>)′ = −sin <i>x</i></b>. Déplace le point : la pente de la tangente au graphe de sin est l’ordonnée du point sur la courbe de cos (pointillés).`,
  params:[{id:'k',l:'x₀ (multiples de π/12)',min:0,max:24,step:1,v:3}],
  draw:v=>{ const x0=v.k*PI/12, s=Math.sin(x0), c=Math.cos(x0), P=plane({x:[-.3,6.6],y:[-1.6,1.6],step:PI/2});
    P.fn(Math.cos,{c:'var(--math)',w:2,dash:true}).fn(Math.sin,{c:'var(--accent)'}).seg(x0-1,s-c,x0+1,s+c,{c:'var(--spark)',w:3}).seg(x0,s,x0,c,{c:'var(--muted)',w:1.5,dash:true});
    P.dot(x0,s,{c:'var(--accent)'}).dot(x0,c,{c:'var(--math)',r:5}); ticksPi(P,.1,6.5,0,2); return P.svg(); },
  info:v=>`x₀ = ${pf(v.k,12)} · pente de la tangente = cos x₀ ≈ ${fmt(Math.cos(v.k*PI/12),3)}`},
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
 {kind:'Défi',h:'Une limite classique',p:'En utilisant 1 − cos <i>x</i> = 2 sin²(<i>x</i>/2), calcule lim<sub><i>x</i>→0</sub> (1 − cos <i>x</i>) / <i>x</i>².',lab:'limite =',ans:.5,
  why:'(1 − cos x)/x² = 2 sin²(x/2)/x² = ½ · (sin(x/2)/(x/2))². Le carré tend vers 1, donc la limite vaut ½.'},
]},

/* ===================== 7. Logarithmes et exponentielles ===================== */
{subj:'an2', sem:'aut', id:'cms-an2-explog', h:'Logarithmes et exponentielles', p:'eˣ et ln comme réciproques, leurs règles de calcul, leurs dérivées et leurs croissances.', steps:[
 {h:'Deux fonctions réciproques',p:`<b>exp</b> : ℝ → ]0 ; +∞[ est bijective et strictement croissante. Sa réciproque est <b>ln</b> : ]0 ; +∞[ → ℝ. Donc <b><i>y</i> = e<sup><i>x</i></sup> ⇔ <i>x</i> = ln <i>y</i></b>, et leurs graphes sont symétriques par rapport à la droite <i>y</i> = <i>x</i>.`,
  params:[{id:'a',l:'a',min:-2,max:1.5,step:.25,v:.5}],
  draw:v=>{ const ea=Math.exp(v.a), P=plane({x:[-3,5],y:[-3,5],lab:1});
    P.seg(-3,-3,5,5,{c:'var(--muted)',w:1.5,dash:true}).fn(Math.exp,{c:'var(--accent)'}).fn(Math.log,{from:.02,to:5,c:'var(--math)',n:400});
    P.seg(v.a,ea,ea,v.a,{c:'var(--spark)',w:2,dash:true}).dot(v.a,ea,{c:'var(--accent)',l:'(a ; eᵃ)',dx:-60}).dot(ea,v.a,{c:'var(--math)',l:'(eᵃ ; a)',dy:16});
    P.text(-2.8,.6,'eˣ',{c:'var(--accent)'}).text(4,1.8,'ln x',{c:'var(--math)'}); return P.svg(); },
  info:v=>`e<sup>${fmt(v.a)}</sup> ≈ ${fmt(Math.exp(v.a),3)} et ln ${fmt(Math.exp(v.a),3)} ≈ ${fmt(v.a)}`,
  note:'e ≈ 2,718. ln 1 = 0, ln e = 1, et ln x < 0 pour 0 < x < 1.'},
 {h:'Simplifie',p:'Combien vaut ln(e³ · √e)&nbsp;?',opts:['3/2','7/2','3','√3'],ans:1,
  why:'e³ · √e = e³ · e^(1/2) = e^(7/2), donc ln(e^(7/2)) = 7/2.'},
 {h:'Règles de calcul et base a',p:`Pour <i>a</i>, <i>b</i> > 0 : <b>ln(<i>ab</i>) = ln <i>a</i> + ln <i>b</i></b>, ln(<i>a</i>/<i>b</i>) = ln <i>a</i> − ln <i>b</i>, <b>ln(<i>a</i><sup><i>r</i></sup>) = <i>r</i> ln <i>a</i></b>. Côté exponentielle : e<sup><i>x</i>+<i>y</i></sup> = e<sup><i>x</i></sup>e<sup><i>y</i></sup> et <b><i>a</i><sup><i>x</i></sup> = e<sup><i>x</i> ln <i>a</i></sup></b>. Le logarithme en base <i>a</i> (<i>a</i> > 0, <i>a</i> ≠ 1) est <b>log<sub><i>a</i></sub> <i>x</i> = ${F('ln <i>x</i>','ln <i>a</i>')}</b>, la réciproque de <i>a</i><sup><i>x</i></sup>.`,
  fig:(()=>{ const P=plane({x:[-.5,8.5],y:[-2.5,3.5],h:180,lab:2}); [[2,'var(--accent)'],[Math.E,'var(--math)'],[10,'var(--spark)']].forEach(([b,c])=>P.fn(x=>Math.log(x)/Math.log(b),{from:.03,to:8.5,c,w:2.5,n:400}));
    P.dot(1,0,{c:'var(--ink)',r:4}).text(6.6,3,'log₂',{c:'var(--accent)',s:11}).text(6.6,1.6,'ln',{c:'var(--math)',s:11}).text(6.6,.55,'log₁₀',{c:'var(--spark)',s:11}); return P.svg(); })(),
  note:'Piège classique : ln(a + b) n’est pas ln a + ln b. Et ln x n’existe que pour x > 0.'},
 {h:'Équation exponentielle',p:'Résous e<sup>2<i>x</i></sup> = 5. Arrondis au centième.',lab:'x =',ans:.8,tol:.006,
  why:'On applique ln : 2x = ln 5, donc x = ln 5 / 2 ≈ 1,609 / 2 ≈ 0,80.'},
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
 {h:'Qui gagne&nbsp;?',p:'Que vaut lim<sub><i>x</i>→+∞</sub> (ln <i>x</i>)² / <i>x</i>&nbsp;?',opts:['+∞','1','0','e'],ans:2,
  why:'Avec x = e^t : (ln x)²/x = t²/e^t → 0 quand t → +∞. L’exponentielle l’emporte sur la puissance.'},
 {kind:'Défi',h:'Deux bases',p:'Résous 3<sup><i>x</i></sup> = 2<sup><i>x</i>+1</sup>. Arrondis au centième.',lab:'x =',ans:1.71,tol:.006,
  why:'On prend ln : x ln 3 = (x + 1) ln 2, donc x (ln 3 − ln 2) = ln 2 et x = ln 2 / ln(3/2) ≈ 0,693 / 0,405 ≈ 1,71.'},
]},
);
})();
