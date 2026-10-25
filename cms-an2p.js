/* Déclic — Analyse II, printemps (PREPA-006) */
(()=>{
const ch=Math.cosh, sh=Math.sinh;
const sup=s=>`<sup>${s}</sup>`;
const E=s=>`e<sup>${s}</sup>`;
// plan complexe avec étiquettes Re / Im
const cpl=(r=5,lab=2,q={})=>{ const P=plane(Object.assign({x:[-r,r],y:[-r,r],lab},q)); P.text(r*.98,0,'Re',{a:'end',dy:-6,c:'var(--muted)'}).text(0,r*.96,'Im',{dx:6,dy:8,c:'var(--muted)'}); return P; };
// a + bi en texte
const cz=(a,b,d=2)=>{ const A=Math.abs(a)<1e-9?0:a, B=Math.abs(b)<1e-9?0:b;
  if(B===0) return fmt(A,d); const bi=(Math.abs(Math.abs(B)-1)<1e-9?'':fmt(Math.abs(B),d))+'i';
  if(A===0) return (B<0?'−':'')+bi; return `${fmt(A,d)} ${B<0?'−':'+'} ${bi}`; };
// notation scientifique
const sci=x=>{ if(x===0) return '0'; const e=Math.floor(Math.log10(x)), m=x/10**e; return `${fmt(m,2)}·10${sup(fmt(e,0))}`; };
// oscillateur x″ + 2λx′ + ω²x = 0, x(0) = 1, x′(0) = 0
const osc=(l,w)=>{ if(Math.abs(l-w)<1e-9) return t=>(1+l*t)*Math.exp(-l*t);
  if(l<w){ const w1=Math.sqrt(w*w-l*l); return t=>Math.exp(-l*t)*(Math.cos(w1*t)+l/w1*Math.sin(w1*t)); }
  const s=Math.sqrt(l*l-w*w), r1=-l+s, r2=-l-s; return t=>(r2*Math.exp(r1*t)-r1*Math.exp(r2*t))/(r2-r1); };
const regime=(l,w)=>Math.abs(l-w)<1e-9?'<b>critique</b> (retour le plus rapide sans osciller)':l<w?(l===0?'<b>non amorti</b> (oscillation pure)':'<b>pseudo-périodique</b> (oscillations amorties)'):'<b>apériodique</b> (retour lent, sans osciller)';
const oscFig=(l,w)=>{ const P=plane({x:[0,8],y:[-1.1,1.2],h:200,grid:false,lx:2,ly:.5}); P.fn(t=>Math.exp(-l*t),{c:'var(--muted)',w:1.5,dash:true}).fn(t=>-Math.exp(-l*t),{c:'var(--muted)',w:1.5,dash:true}).fn(osc(l,w),{n:400}).text(7.9,0,'t',{a:'end',dy:-6,c:'var(--muted)'}); return P.svg(); };

CMS.push(
/* ===================== 1. Exponentielle, logarithme, puissances ===================== */
{subj:'an2', sem:'pri', id:'cms-an2-puissances', h:'Exponentielle, logarithme et puissances', p:'Définir aˣ et x^α pour tous les réels grâce à e et ln, et les dériver.', steps:[
 {kind:'Théorie',h:'aˣ, c’est e déguisé',p:`Pour <i>a</i> &gt; 0 et <i>x</i> réel, on <b>définit</b> la puissance par <b>aˣ = ${E('x ln a')}</b>. C’est la seule définition qui prolonge 2³ = 2·2·2 à tous les réels tout en gardant ${'a'+sup('x+y')} = aˣ·a${sup('y')}. Le signe de ln <i>a</i> décide de tout : croissante si <i>a</i> &gt; 1, décroissante si 0 &lt; <i>a</i> &lt; 1.`,
  params:[{id:'a',l:'Base a',min:.2,max:3,step:.2,v:2}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-.5,6],h:260,lab:1}); P.fn(Math.exp,{c:'var(--muted)',w:2,dash:true}).fn(x=>Math.pow(v.a,x)).dot(0,1,{r:5,l:'(0 ; 1)'}).dot(1,v.a,{r:5,c:'var(--math)',l:'(1 ; a)'}); return P.svg(); },
  info:v=>`${fmt(v.a,1)}${sup('x')} = ${E(fmt(Math.log(v.a),3)+'·x')} car ln ${fmt(v.a,1)} ≈ ${fmt(Math.log(v.a),3)}${Math.abs(v.a-1)<1e-9?' : la fonction est constante.':v.a<1?' : ln a &lt; 0, la fonction décroît.':' : ln a &gt; 0, la fonction croît.'} (pointillés : eˣ)`,
  note:'Toutes les courbes passent par (0 ; 1), car a⁰ = e⁰ = 1. La base a = e est celle dont la tangente en 0 a une pente exactement 1.'},
 {h:'Réécrire avec e',p:'Laquelle de ces écritures est égale à <i>5ˣ</i> pour tout réel <i>x</i>&nbsp;?',
  opts:[E('5x'),E('x ln 5'),'x·ln 5',E('ln(5x)')],ans:1,why:`Par définition 5ˣ = ${E('x ln 5')}. Attention, ${E('ln(5x)')} = 5x : ce n’est pas une puissance.`},
 {kind:'Théorie',h:'Puissance généralisée x^α',p:`Pour <i>x</i> &gt; 0 et α réel : <b>x${sup('α')} = ${E('α ln x')}</b>. On dérive comme une composée : <b>(x${sup('α')})′ = α·x${sup('α−1')}</b>, la même règle que pour les entiers. De même <b>(aˣ)′ = ln a · aˣ</b>.`,
  params:[{id:'al',l:'Exposant α',min:-2,max:3,step:.5,v:.5}],
  draw:v=>{ const P=plane({x:[0,4],y:[0,4],lab:1}); P.fn(x=>Math.pow(x,v.al),{from:.01,n:400}).seg(0,0,4,4,{c:'var(--muted)',w:1,dash:true}).dot(1,1,{r:5,l:'(1 ; 1)'}); return P.svg(); },
  info:v=>`f(x) = x${sup(fmt(v.al,1))}, f′(x) = ${fmt(v.al,1)}·x${sup(fmt(v.al-1,1))}, pente en x = 1 : ${fmt(v.al,1)}`,
  note:'x^α n’est définie pour tout α que si x &gt; 0. Pour x ≤ 0, ln x n’existe pas : (−8)^(1/3) n’est pas défini par cette formule.'},
 {h:'Dériver 2ˣ',p:'Soit <i>f(x) = 2ˣ</i>. Calcule <i>f′(2)</i>, arrondi au centième.',lab:'f′(2) =',ans:2.77,tol:.006,
  why:`f′(x) = ln 2 · 2ˣ, donc f′(2) = 4 ln 2 ≈ 4 × 0,6931 ≈ 2,77.`},
 {kind:'Méthode',h:'Le cas xˣ',p:`Ni puissance (exposant fixe) ni exponentielle (base fixe) : la base <b>et</b> l’exposant varient. On repasse par e : <i>xˣ = ${E('x ln x')}</i>, puis la règle de la chaîne donne <b>(xˣ)′ = xˣ·(ln x + 1)</b>.`,
  fig:(()=>{ const P=plane({x:[0,2],y:[0,2.5],lab:.5,step:.5}); const m=Math.exp(-1); P.fn(x=>Math.pow(x,x),{from:.005,n:300}).seg(0,Math.pow(m,m),2,Math.pow(m,m),{c:'var(--muted)',w:1,dash:true}).dot(m,Math.pow(m,m),{l:'1/e'}); return P.svg(); })(),
  note:'Piège : (xˣ)′ n’est ni x·xˣ⁻¹ (règle des puissances) ni xˣ·ln x (règle des exponentielles). C’est la somme des deux.'},
 {h:'Trouve le minimum de xˣ',p:'Déplace le point le long de la courbe <i>y = xˣ</i> jusqu’à ce que la tangente soit le plus proche possible de l’horizontale.',
  params:[{id:'x',l:'x',min:.05,max:1.5,step:.05,v:1}],
  draw:v=>{ const f=x=>Math.pow(x,x), d=x=>f(x)*(Math.log(x)+1), P=plane({x:[0,2],y:[0,2.5],lab:.5,step:.5}), m=d(v.x), y0=f(v.x);
    P.fn(f,{from:.005,n:300,c:'var(--muted)'}).seg(v.x-.5,y0-.5*m,v.x+.5,y0+.5*m,{c:'var(--spark)',w:2.5}).dot(v.x,y0); return P.svg(); },
  info:v=>`pente = xˣ(ln x + 1) ≈ ${fmt(Math.pow(v.x,v.x)*(Math.log(v.x)+1),3)}`,
  ok:v=>Math.abs(v.x-.35)<1e-6,why:'La dérivée xˣ(ln x + 1) s’annule quand ln x = −1, soit x = 1/e ≈ 0,37. Sur la grille, 0,35 est la position la plus proche (pente ≈ −0,03).'},
 {kind:'Défi',h:'Dérivée de xˣ',p:'Calcule la dérivée de <i>xˣ</i> en <i>x = 2</i>, arrondie au centième.',lab:'f′(2) =',ans:6.77,tol:.006,
  why:'f′(x) = xˣ(ln x + 1), donc f′(2) = 4(ln 2 + 1) ≈ 4 × 1,6931 ≈ 6,77.'},
]},

/* ===================== 2. Fonctions hyperboliques ===================== */
{subj:'an2', sem:'pri', id:'cms-an2-hyperboliques', h:'Fonctions hyperboliques', p:'ch, sh et th : les cousines de cos et sin, construites avec eˣ.', steps:[
 {kind:'Théorie',h:'ch et sh',p:`On définit <b>ch x = ${F(E('x')+' + '+E('−x'),2)}</b> (partie paire de eˣ) et <b>sh x = ${F(E('x')+' − '+E('−x'),2)}</b> (partie impaire). Leur somme redonne eˣ. Pour <i>x</i> grand, les deux se collent à eˣ/2.`,
  params:[{id:'x',l:'x',min:-2,max:2,step:.25,v:1}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-3.5,4.5],h:320,lab:1}); P.fn(x=>Math.exp(x)/2,{c:'var(--muted)',w:1.5,dash:true}).fn(ch,{c:'var(--math)'}).fn(sh,{c:'var(--spark)'})
    .dot(v.x,ch(v.x),{c:'var(--math)',l:'ch'}).dot(v.x,sh(v.x),{c:'var(--spark)',l:'sh',dy:16}); return P.svg(); },
  info:v=>`ch ${fmt(v.x)} ≈ ${fmt(ch(v.x),3)} · sh ${fmt(v.x)} ≈ ${fmt(sh(v.x),3)} · somme = e${sup(fmt(v.x))} ≈ ${fmt(Math.exp(v.x),3)}`,
  note:'ch est paire et vaut au moins 1 (minimum ch 0 = 1). sh est impaire, strictement croissante, et sh 0 = 0. La chaînette, forme d’un câble suspendu, est le graphe de ch.'},
 {kind:'Théorie',h:'ch² − sh² = 1',p:`Développe : (ch x)² − (sh x)² = ${F('(eˣ + e⁻ˣ)² − (eˣ − e⁻ˣ)²',4)} = ${F(4,4)} = 1. Le point (ch t ; sh t) parcourt donc l’<b>hyperbole</b> x² − y² = 1, comme (cos t ; sin t) parcourt le cercle x² + y² = 1. D’où le nom.`,
  params:[{id:'t',l:'t',min:-1.8,max:1.8,step:.2,v:.8}],
  draw:v=>{ const P=plane({x:[-1,5],y:[-3.5,3.5],lab:1}); P.seg(-1,-1,3.5,3.5,{c:'var(--muted)',w:1,dash:true}).seg(-1,1,3.5,-3.5,{c:'var(--muted)',w:1,dash:true})
    .curve(ch,sh,-2,2,{c:'var(--math)'}).circ(0,0,1,{c:'var(--muted)',w:1.5}).seg(ch(v.t),0,ch(v.t),sh(v.t),{c:'var(--spark)',w:2,dash:true}).arrow(0,0,ch(v.t),sh(v.t),{c:'var(--accent)',w:2.5}).dot(ch(v.t),sh(v.t),{l:'(ch t ; sh t)'}); return P.svg(); },
  info:v=>`ch² − sh² = ${fmt(ch(v.t)**2,3)} − ${fmt(sh(v.t)**2,3)} = ${fmt(ch(v.t)**2-sh(v.t)**2,3)}`},
 {h:'Valeurs en 0',p:'Que valent <i>ch 0</i> et <i>sh 0</i>&nbsp;?',opts:['ch 0 = 0 et sh 0 = 1','ch 0 = 1 et sh 0 = 1','ch 0 = 1 et sh 0 = 0','ch 0 = ½ et sh 0 = ½'],ans:2,
  why:'ch 0 = (1 + 1)/2 = 1 et sh 0 = (1 − 1)/2 = 0. On vérifie : 1² − 0² = 1.'},
 {kind:'Théorie',h:'Dérivées et tangente hyperbolique',p:`On dérive terme à terme : <b>(sh x)′ = ch x</b> et <b>(ch x)′ = sh x</b>, sans signe moins cette fois. On pose <b>th x = ${F('sh x','ch x')}</b>, et la règle du quotient donne <b>(th x)′ = ${F(1,'ch² x')} = 1 − th² x</b>.`,
  fig:(()=>{ const P=plane({x:[-4,4],y:[-1.5,1.5],h:160,lab:1}); P.seg(-4,1,4,1,{c:'var(--muted)',w:1,dash:true}).seg(-4,-1,4,-1,{c:'var(--muted)',w:1,dash:true}).fn(Math.tanh).text(-3.8,1,'y = 1',{dy:-6,c:'var(--muted)',s:11}); return P.svg(); })(),
  note:'th est impaire, strictement croissante, à valeurs dans ]−1 ; 1[, avec deux asymptotes horizontales y = ±1.'},
 {h:'th(ln 2)',p:'Calcule <i>th(ln 2)</i> exactement (donne une valeur décimale).',lab:'th(ln 2) =',ans:.6,tol:.001,
  why:'e^(ln 2) = 2 et e^(−ln 2) = ½. Donc sh(ln 2) = (2 − ½)/2 = ¾, ch(ln 2) = (2 + ½)/2 = 5/4, et th(ln 2) = (3/4)/(5/4) = 3/5 = 0,6.'},
 {kind:'Théorie',h:'Les réciproques',p:`sh est une bijection de ℝ sur ℝ. Pour inverser, on résout sh y = x : en posant u = ${E('y')}, on obtient u² − 2xu − 1 = 0, dont la seule racine positive est u = x + √(x² + 1). Donc <b>argsh x = ln(x + √(x² + 1))</b>. De même, sur [1 ; +∞[, argch x = ln(x + √(x² − 1)), et sur ]−1 ; 1[, argth x = ½ ln${F('1 + x','1 − x')}.`,
  fig:(()=>{ const P=plane({x:[-3,3],y:[-3,3],lab:1}); P.seg(-3,-3,3,3,{c:'var(--muted)',w:1,dash:true}).fn(sh,{c:'var(--spark)'}).fn(x=>Math.log(x+Math.sqrt(x*x+1)),{c:'var(--math)'}).text(1.5,2.6,'sh',{c:'var(--spark)'}).text(2.2,1.0,'argsh',{c:'var(--math)'}); return P.svg(); })(),
  note:'Les graphes de sh et argsh sont symétriques par rapport à la droite y = x, comme pour toute bijection et sa réciproque. Et (argsh x)′ = 1/√(x² + 1).'},
 {h:'Un argsh exact',p:'Calcule <i>argsh(4/3)</i>, arrondi au centième.',lab:'argsh(4/3) =',ans:1.1,tol:.006,
  why:'√(16/9 + 1) = √(25/9) = 5/3. Donc argsh(4/3) = ln(4/3 + 5/3) = ln 3 ≈ 1,10.'},
 {kind:'Défi',h:'Dérivée de argsh',p:'Quelle est la dérivée de <i>argsh x</i>&nbsp;?',opts:['1/√(1 − x²)','1/(1 + x²)','1/√(x² + 1)','1/√(x² − 1)'],ans:2,
  why:'Si y = argsh x, alors x = sh y et dx/dy = ch y = √(1 + sh² y) = √(1 + x²). Donc y′ = 1/√(x² + 1). Les autres sont les dérivées d’arcsin, arctan et argch.'},
]},

/* ===================== 3. Nombres complexes ===================== */
{subj:'an2', sem:'pri', id:'cms-an2-complexes', h:'Nombres complexes', p:'Calculer avec i, le module, le conjugué et l’inverse.', steps:[
 {kind:'Théorie',h:'z = a + bi',p:'On ajoute à ℝ un nombre <b>i</b> tel que <b>i² = −1</b>. Un complexe s’écrit de façon unique <i>z = a + bi</i> avec <i>a</i> = Re <i>z</i> et <i>b</i> = Im <i>z</i> réels. Son <b>conjugué</b> est <i>z̄ = a − bi</i>, son <b>module</b> <i>|z| = √(a² + b²)</i>.',
  params:[{id:'a',l:'Partie réelle a',min:-4,max:4,v:3},{id:'b',l:'Partie imaginaire b',min:-4,max:4,v:2}],
  draw:v=>{ const P=cpl(); P.seg(v.a,v.b,v.a,-v.b,{c:'var(--muted)',w:1.5,dash:true}).arrow(0,0,v.a,v.b).arrow(0,0,v.a,-v.b,{c:'var(--math)',w:2}).dot(v.a,v.b,{l:'z'}).dot(v.a,-v.b,{c:'var(--math)',l:'z̄',dy:16}); return P.svg(); },
  info:v=>`z = ${cz(v.a,v.b)} · z̄ = ${cz(v.a,-v.b)} · |z| = √${v.a*v.a+v.b*v.b} ≈ ${fmt(Math.hypot(v.a,v.b))}`,
  note:'Le conjugué est le symétrique de z par rapport à l’axe réel. z est réel si et seulement si z = z̄.'},
 {h:'Multiplier',p:'Calcule <i>(2 + 3i)(1 − i)</i>.',opts:['2 − 3i','−1 + i','5 + i','5 − i'],ans:2,
  why:'On développe : 2 − 2i + 3i − 3i² = 2 + i + 3 = 5 + i, car −3i² = +3.'},
 {kind:'Théorie',h:'z·z̄ = |z|²',p:'Le produit d’un complexe par son conjugué est toujours un réel positif : <b>(a + bi)(a − bi) = a² + b² = |z|²</b>. Le module se comporte bien : <b>|zw| = |z|·|w|</b>, et la conjugaison passe aux opérations : <span style="text-decoration:overline">z + w</span> = z̄ + w̄, <span style="text-decoration:overline">zw</span> = z̄·w̄.',
  fig:(()=>{ const P=cpl(5,2); P.circ(0,0,Math.hypot(3,4),{c:'var(--muted)',w:1.5,dash:true}).arrow(0,0,3,4).arrow(0,0,3,-4,{c:'var(--math)'}).dot(3,4,{l:'3 + 4i'}).dot(3,-4,{c:'var(--math)',l:'3 − 4i',dy:16}).text(-4.6,4,'|z| = 5',{s:12}); return P.svg(); })(),
  note:'Piège : |z + w| n’est pas |z| + |w| en général. On a seulement l’inégalité triangulaire |z + w| ≤ |z| + |w|.'},
 {h:'Un module',p:'Calcule <i>|−5 + 12i|</i>.',lab:'|z| =',ans:13,why:'|−5 + 12i| = √(25 + 144) = √169 = 13.'},
 {kind:'Méthode',h:'Inverser et diviser',p:`Pour <i>z ≠ 0</i>, on multiplie haut et bas par le conjugué : <b>${F(1,'z')} = ${F('z̄','|z|²')}</b>. Exemple : ${F(1,'1 + i')} = ${F('1 − i','2')} = ½ − ½i. Pour diviser, même idée : ${F('z','w')} = ${F('z·w̄','|w|²')}. Le dénominateur devient réel.`,
  note:'Vérifie toujours : (1 + i)(½ − ½i) = ½ − ½i + ½i − ½i² = ½ + ½ = 1.'},
 {h:'Un inverse',p:'Que vaut <i>1/(3 + 4i)</i>&nbsp;?',opts:['1/3 + i/4','(3 − 4i)/25','(3 − 4i)/5','(−3 + 4i)/25'],ans:1,
  why:'1/(3 + 4i) = (3 − 4i)/((3 + 4i)(3 − 4i)) = (3 − 4i)/(9 + 16) = (3 − 4i)/25.'},
 {h:'Additionner, c’est translater',p:'Dans le plan, <i>z + w</i> s’obtient par la règle du parallélogramme : on met les flèches bout à bout. Ici <i>z = 2 + i</i> est fixe. Règle <i>w</i> pour que <i>z + w</i> tombe sur le point rouge <i>−1 + 3i</i>.',
  params:[{id:'c',l:'Re w',min:-4,max:4,v:0},{id:'d',l:'Im w',min:-4,max:4,v:0}],
  draw:v=>{ const P=cpl(); P.dot(-1,3,{c:'var(--bad)',l:'−1 + 3i'}).arrow(0,0,2,1,{c:'var(--math)'}).arrow(0,0,v.c,v.d,{c:'var(--spark)'}).arrow(2,1,2+v.c,1+v.d,{c:'var(--spark)',w:1.5,dash:true}).arrow(0,0,2+v.c,1+v.d,{w:3.5}).dot(2,1,{c:'var(--math)',r:4,l:'z'}).dot(2+v.c,1+v.d,{r:5,l:'z + w'}); return P.svg(); },
  info:v=>`w = ${cz(v.c,v.d)} · z + w = ${cz(2+v.c,1+v.d)}`,
  ok:v=>v.c===-3&&v.d===2,why:'w = (−1 + 3i) − (2 + i) = −3 + 2i. On soustrait partie réelle et partie imaginaire séparément.'},
 {kind:'Défi',h:'Un quotient',p:'Calcule la partie imaginaire de <i>(1 + 2i)/(1 − i)</i>.',lab:'Im =',ans:1.5,tol:.001,
  why:'(1 + 2i)/(1 − i) = (1 + 2i)(1 + i)/2 = (1 + i + 2i + 2i²)/2 = (−1 + 3i)/2. La partie imaginaire vaut 3/2 = 1,5.'},
]},

/* ===================== 4. Représentations ===================== */
{subj:'an2', sem:'pri', id:'cms-an2-representations', h:'Représentations des complexes', p:'Plan de Gauss, forme polaire, Euler, Moivre et matrices 2 × 2.', steps:[
 {kind:'Théorie',h:'Forme polaire',p:`Dans le <b>plan de Gauss</b>, <i>z</i> est repéré par sa distance <i>r = |z|</i> à l’origine et son angle θ = arg <i>z</i> avec l’axe réel. Alors <b>z = r(cos θ + i sin θ) = r·${E('iθ')}</b>. On repasse en cartésien avec a = r cos θ et b = r sin θ.`,
  params:[{id:'r',l:'Module r',min:.5,max:4,step:.5,v:3},{id:'t',l:'Argument θ',min:0,max:345,step:15,v:45,u:'°'}],
  draw:v=>{ const a=v.r*Math.cos(rad(v.t)), b=v.r*Math.sin(rad(v.t)), P=cpl(); P.circ(0,0,v.r,{c:'var(--muted)',w:1,dash:true}).curve(t=>.8*Math.cos(t),t=>.8*Math.sin(t),0,rad(v.t),{c:'var(--spark)',w:2})
    .seg(a,0,a,b,{c:'var(--muted)',w:1.5,dash:true}).arrow(0,0,a,b).dot(a,b,{l:'z'}); return P.svg(); },
  info:v=>`z = ${fmt(v.r,1)}·e${sup('i·'+v.t+'°')} = ${cz(v.r*Math.cos(rad(v.t)),v.r*Math.sin(rad(v.t)))}`,
  note:'L’argument n’est défini qu’à 2π près : θ et θ + 360° donnent le même point. On choisit souvent θ dans ]−π ; π].'},
 {h:'Place −√3 + i',p:'Règle <i>r</i> et θ pour que <i>z</i> tombe sur le point rouge <i>−√3 + i</i>.',
  params:[{id:'r',l:'Module r',min:.5,max:4,step:.5,v:1},{id:'t',l:'Argument θ',min:0,max:345,step:15,v:0,u:'°'}],
  draw:v=>{ const a=v.r*Math.cos(rad(v.t)), b=v.r*Math.sin(rad(v.t)), P=cpl(3,1); P.dot(-Math.sqrt(3),1,{c:'var(--bad)',l:'−√3 + i',dx:-60}).arrow(0,0,a,b).dot(a,b,{r:5,l:'z'}); return P.svg(); },
  info:v=>`z = ${cz(v.r*Math.cos(rad(v.t)),v.r*Math.sin(rad(v.t)))}`,
  ok:v=>v.r===2&&v.t===150,why:'r = √(3 + 1) = 2. Puis cos θ = −√3/2 et sin θ = ½, donc θ = 150° = 5π/6. Ainsi −√3 + i = 2e^(5iπ/6).'},
 {kind:'Théorie',h:'Euler et Moivre',p:`La <b>formule d’Euler</b> ${E('iθ')} = cos θ + i sin θ transforme les produits en sommes d’angles : <b>r${E('iα')}·s${E('iβ')} = rs·${E('i(α+β)')}</b>. Les modules se multiplient, les arguments s’additionnent. En particulier, <b>formule de Moivre</b> : (cos θ + i sin θ)ⁿ = cos nθ + i sin nθ.`,
  params:[{id:'r',l:'Module r',min:.8,max:1.2,step:.1,v:1.1},{id:'t',l:'θ',min:15,max:90,step:15,v:30,u:'°'},{id:'n',l:'Puissance n',min:1,max:8,v:4}],
  draw:v=>{ const P=cpl(4.5,1); P.circ(0,0,1,{c:'var(--muted)',w:1.5,dash:true}); let px=1,py=0;
    for(let k=1;k<=v.n;k++){ const R=v.r**k, x=R*Math.cos(rad(k*v.t)), y=R*Math.sin(rad(k*v.t)); P.seg(px,py,x,y,{c:'var(--muted)',w:1.5}); P.dot(x,y,{r:k===v.n?7:4,c:k===v.n?'var(--accent)':'var(--spark)',l:k===1?'z':k===v.n?'zⁿ':''}); px=x; py=y; }
    return P.svg(); },
  info:v=>`zⁿ = ${fmt(v.r,1)}${sup(v.n)}·e${sup('i·'+(v.n*v.t)+'°')} : module ${fmt(v.r**v.n,3)}, argument ${v.n*v.t}°${v.n*v.t>=360?' (≡ '+(v.n*v.t%360)+'°)':''}`,
  note:'Si r &gt; 1 les puissances spiralent vers l’extérieur, si r &lt; 1 vers l’origine, si r = 1 elles restent sur le cercle.'},
 {h:'Une grande puissance',p:'Calcule <i>(1 + i)⁸</i> grâce à la forme polaire.',lab:'(1 + i)⁸ =',ans:16,
  why:'1 + i = √2·e^(iπ/4). Donc (1 + i)⁸ = (√2)⁸·e^(8iπ/4) = 16·e^(2iπ) = 16.'},
 {h:'Moivre au travail',p:'En développant <i>(cos θ + i sin θ)²</i> et en identifiant avec Moivre, la partie réelle donne…',
  opts:['cos 2θ = 2 cos θ','cos 2θ = cos²θ + sin²θ','sin 2θ = cos²θ − sin²θ','cos 2θ = cos²θ − sin²θ'],ans:3,
  why:'(cos θ + i sin θ)² = cos²θ − sin²θ + 2i sin θ cos θ. Moivre dit que c’est aussi cos 2θ + i sin 2θ. Parties réelles : cos 2θ = cos²θ − sin²θ (et sin 2θ = 2 sin θ cos θ).'},
 {kind:'Théorie',h:'Des complexes en matrices',p:`On associe à <i>z = a + bi</i> la matrice <b>M(z) = ${mat([['a','−b'],['b','a']])}</b>. Alors M(z + w) = M(z) + M(w) et <b>M(zw) = M(z)·M(w)</b> : calculer avec ces matrices, c’est calculer avec les complexes. On a M(i) = ${mat([[0,'−1'],[1,0]])}, la rotation de 90°, et M(i)² = −I.`,
  fig:`<p>En polaire, M(r${E('iθ')}) = r·${mat([['cos θ','−sin θ'],['sin θ','cos θ']])} : une rotation d’angle θ suivie d’une homothétie de rapport r. Et det M(z) = a² + b² = |z|².</p>`,
  note:'M(z̄) est la transposée de M(z). Multiplier par z agit sur le plan exactement comme la matrice M(z) agit sur le vecteur (x ; y).'},
 {h:'La bonne matrice',p:'Quelle matrice représente <i>z = 3 − 2i</i>&nbsp;?',
  opts:[mat([[3,'−2'],[2,3]]),mat([[3,2],['−2',3]]),mat([[3,'−2'],['−2',3]]),mat([['−2',3],[3,2]])],ans:1,
  why:'Avec a = 3 et b = −2, la forme [[a, −b], [b, a]] donne [[3, 2], [−2, 3]].'},
 {kind:'Défi',h:'Produit matriciel',p:`Soient <i>z = 1 + 2i</i> et <i>w = 3 − i</i>. Quel est le coefficient en haut à droite de M(z)·M(w)&nbsp;?`,lab:'coefficient =',ans:-5,
  why:'M(z)M(w) = M(zw) et zw = 3 − i + 6i − 2i² = 5 + 5i. La matrice est [[5, −5], [5, 5]] : le coefficient en haut à droite est −b = −5.'},
]},

/* ===================== 5. Racines n-ièmes ===================== */
{subj:'an2', sem:'pri', id:'cms-an2-racines', h:'Racines de l’unité et racines n-ièmes', p:'Résoudre zⁿ = w : des polygones réguliers dans le plan complexe.', steps:[
 {kind:'Théorie',h:'Les racines n-ièmes de l’unité',p:`L’équation <b>zⁿ = 1</b> a exactement <i>n</i> solutions dans ℂ : <b>ω<sub>k</sub> = ${E('2ikπ/n')}</b>, pour k = 0, 1, …, n − 1. Elles ont toutes un module 1 et sont espacées de 360°/n : ce sont les sommets d’un <b>polygone régulier</b> inscrit dans le cercle unité, avec 1 comme sommet.`,
  params:[{id:'n',l:'n',min:2,max:12,v:5}],
  draw:v=>{ const P=cpl(1.5,1,{step:.5}), pts=[]; for(let k=0;k<v.n;k++) pts.push([Math.cos(2*Math.PI*k/v.n),Math.sin(2*Math.PI*k/v.n)]);
    P.circ(0,0,1,{c:'var(--muted)',w:1.5,dash:true}).poly(pts,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:2}); pts.forEach((p,k)=>P.dot(p[0],p[1],{r:5,l:k===0?'1':k===1?'ω':''})); return P.svg(); },
  info:v=>`${v.n} racines, angle entre deux voisines : ${fmt(360/v.n,1)}°. ω = e${sup('2iπ/'+v.n)} et ω${sup('k')} parcourt toutes les racines.`},
 {h:'Racines réelles',p:'Parmi les 6 solutions complexes de <i>z⁶ = 1</i>, combien sont réelles&nbsp;?',opts:['0','1','2','6'],ans:2,
  why:'Les racines sont aux angles 0°, 60°, 120°, 180°, 240°, 300°. Seules 0° et 180° tombent sur l’axe réel : z = 1 et z = −1.'},
 {kind:'Théorie',h:'Leur somme est nulle',p:`Pour <i>n</i> ≥ 2, avec ω = ${E('2iπ/n')} ≠ 1 : <b>1 + ω + ω² + … + ωⁿ⁻¹ = ${F('ωⁿ − 1','ω − 1')} = 0</b> (somme géométrique). Géométriquement : mises bout à bout, les <i>n</i> flèches de longueur 1 tournent chaque fois de 360°/n et referment un polygone. On revient à 0.`,
  params:[{id:'n',l:'n',min:2,max:12,v:6}],
  draw:v=>{ const P=plane({x:[-1.6,2.6],y:[-.6,4],lab:1}); let x=0,y=0;
    for(let k=0;k<v.n;k++){ const a=2*Math.PI*k/v.n, nx=x+Math.cos(a), ny=y+Math.sin(a); P.arrow(x,y,nx,ny,{c:k%2?'var(--spark)':'var(--accent)',w:2.5,hs:9}); x=nx; y=ny; }
    P.dot(0,0,{c:'var(--ink)',r:5,l:'0',dy:16}); return P.svg(); },
  info:v=>`Flèches 1, ω, …, ω${sup(v.n-1)} bout à bout : on finit en ${cz(0,0)}.`},
 {h:'Une somme partielle',p:'Soit <i>ω = e^(2iπ/5)</i>. Combien vaut <i>ω + ω² + ω³ + ω⁴</i>&nbsp;?',lab:'somme =',ans:-1,
  why:'La somme des 5 racines cinquièmes vaut 0 : 1 + ω + ω² + ω³ + ω⁴ = 0. Donc ω + ω² + ω³ + ω⁴ = −1.'},
 {kind:'Méthode',h:'Racines n-ièmes de w quelconque',p:`On écrit <i>w = ρ${E('iφ')}</i> et on cherche <i>z = r${E('iθ')}</i>. L’égalité zⁿ = w donne rⁿ = ρ et nθ = φ + 2kπ, d’où <b>z<sub>k</sub> = ρ${sup('1/n')}·${E('i(φ + 2kπ)/n')}</b>, k = 0, …, n − 1. Encore un polygone régulier, sur le cercle de rayon ρ${sup('1/n')}, tourné de φ/n.`,
  note:'Piège : il faut diviser l’angle par n, pas seulement prendre la racine du module. Et ne pas oublier les n − 1 autres solutions obtenues en ajoutant 2π/n.'},
 {h:'Une racine cubique de 8i',p:'Règle <i>z</i> pour que <i>z³</i> (flèche jaune) tombe sur le point rouge <i>8i</i>.',
  params:[{id:'r',l:'Module r',min:.5,max:2.5,step:.25,v:1},{id:'t',l:'Argument θ',min:0,max:345,step:15,v:0,u:'°'}],
  draw:v=>{ const P=cpl(10,4,{step:2}), a=rad(v.t), R=v.r**3, Rc=Math.min(R,9.6);
    P.dot(0,8,{c:'var(--bad)',l:'8i'}).arrow(0,0,Rc*Math.cos(3*a),Rc*Math.sin(3*a),{c:'var(--spark)',w:3}).arrow(0,0,v.r*Math.cos(a),v.r*Math.sin(a),{w:3,hs:9}).dot(v.r*Math.cos(a),v.r*Math.sin(a),{r:4,l:'z'});
    if(R>9.6) P.text(-9.5,-9,'z³ sort du cadre',{s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>`z = ${fmt(v.r)}·e${sup('i·'+v.t+'°')} donc z³ = ${fmt(v.r**3,3)}·e${sup('i·'+(3*v.t%360)+'°')}`,
  ok:v=>v.r===2&&[30,150,270].includes(v.t),why:'8i = 8e^(iπ/2). Donc r = 8^(1/3) = 2 et θ = 30° + k·120° : 30°, 150° ou 270°. Les trois racines sont √3 + i, −√3 + i et −2i.'},
 {h:'Racines carrées de i',p:'Quelles sont les deux racines carrées de <i>i</i>&nbsp;?',opts:['±i','±(1 + i)','±(1 − i)/√2','±(1 + i)/√2'],ans:3,
  why:'i = e^(iπ/2), donc z = ±e^(iπ/4) = ±(√2/2)(1 + i) = ±(1 + i)/√2. Vérification : ((1 + i)/√2)² = 2i/2 = i.'},
 {kind:'Défi',h:'Le carré de −16',p:'Les quatre racines quatrièmes de <i>−16</i> forment un carré. Quelle est la longueur de son côté, arrondie au centième&nbsp;?',lab:'côté =',ans:2.83,tol:.006,
  why:'−16 = 16e^(iπ). Les racines ont pour module 16^(1/4) = 2 et pour arguments 45°, 135°, 225°, 315°. Deux sommets voisins, comme √2 + i√2 et −√2 + i√2, sont à distance 2√2 ≈ 2,83.'},
]},

/* ===================== 6. Polynômes ===================== */
{subj:'an2', sem:'pri', id:'cms-an2-polynomes', h:'Polynômes réels et complexes', p:'Division euclidienne, racines, et factorisation sur ℂ et sur ℝ.', steps:[
 {kind:'Théorie',h:'Division euclidienne',p:'Pour deux polynômes <i>A</i> et <i>B ≠ 0</i>, il existe un unique couple (Q, R) tel que <b>A = B·Q + R</b> avec <b>deg R &lt; deg B</b>. On pose la division comme pour les entiers, en éliminant à chaque étape le terme de plus haut degré.',
  fig:`<p>Exemple : <i>A = x³ − 2x² + 4</i> divisé par <i>B = x − 1</i>.</p><p>x³ ÷ x = <b>x²</b> : il reste A − x²(x − 1) = −x² + 4.<br>−x² ÷ x = <b>−x</b> : il reste −x² + 4 − (−x)(x − 1) = −x + 4.<br>−x ÷ x = <b>−1</b> : il reste −x + 4 − (−1)(x − 1) = <b>3</b>.</p><p>Donc x³ − 2x² + 4 = (x − 1)(x² − x − 1) + 3.</p>`,
  note:'Quand B = x − a, le reste est une constante, et il vaut A(a). Ici A(1) = 1 − 2 + 4 = 3. C’est le théorème du reste.'},
 {h:'Le reste sans diviser',p:'Quel est le reste de la division de <i>x⁴ + 3x − 5</i> par <i>x − 2</i>&nbsp;?',lab:'reste =',ans:17,
  why:'Le reste de la division par x − 2 vaut P(2) = 16 + 6 − 5 = 17.'},
 {kind:'Théorie',h:'Racines et facteurs',p:'<i>a</i> est racine de <i>P</i> si et seulement si <b>(x − a) divise P</b>. Si (x − a)ᵐ divise P mais pas (x − a)ᵐ⁺¹, <i>a</i> est racine de <b>multiplicité m</b>. Fais varier <i>c</i> : le graphe de x³ − 3x + c coupe l’axe 3 fois, ou 1 fois, ou le touche en une racine double.',
  params:[{id:'c',l:'c',min:-4,max:4,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-6,6],h:240,lab:1,step:1}); P.fn(x=>x**3-3*x+v.c,{n:300});
    let rs=[]; if(Math.abs(v.c)<2-1e-9){ const t=Math.acos(-v.c/2)/3; rs=[0,1,2].map(k=>2*Math.cos(t-2*Math.PI*k/3)); }
    else if(Math.abs(Math.abs(v.c)-2)<1e-9){ rs=v.c>0?[1,-2]:[-1,2]; }
    else { const s=Math.sqrt(v.c*v.c/4-1); rs=[Math.cbrt(-v.c/2+s)+Math.cbrt(-v.c/2-s)]; }
    rs.forEach(x=>P.dot(x,0,{r:5})); return P.svg(); },
  info:v=>Math.abs(v.c)<2-1e-9?'3 racines réelles simples.':Math.abs(Math.abs(v.c)-2)<1e-9?`Une racine double (x = ${v.c>0?1:-1}) et une simple (x = ${v.c>0?-2:2}) : 2 + 1 = 3.`:'1 racine réelle et 2 racines complexes non réelles conjuguées.',
  note:'Dans tous les cas, en comptant les multiplicités et les racines complexes, il y a exactement 3 racines : le degré.'},
 {h:'Multiplicité',p:'On a <i>x³ − 3x + 2 = (x − 1)²(x + 2)</i>. Quelle est la multiplicité de la racine 1&nbsp;?',opts:['1','2','3','0'],ans:1,
  why:'Le facteur (x − 1) apparaît au carré : 1 est racine double. On le voit aussi avec P(1) = 0 et P′(1) = 3·1² − 3 = 0, mais P″(1) = 6 ≠ 0.'},
 {kind:'Théorie',h:'Le théorème fondamental de l’algèbre',p:'Tout polynôme non constant à coefficients complexes a au moins une racine dans ℂ. Par récurrence, un polynôme de degré <i>n</i> se <b>factorise sur ℂ</b> en <b>P = a(x − z₁)(x − z₂)…(x − zₙ)</b>. Sur ℂ, les irréductibles sont donc les polynômes de degré 1.',
  note:'Sur ℝ, c’est faux : x² + 1 n’a pas de racine réelle. Mais il se factorise sur ℂ en (x − i)(x + i).'},
 {kind:'Théorie',h:'Sur ℝ : les racines vont par paires',p:`Si P est à coefficients <b>réels</b> et P(z) = 0, alors P(z̄) = ${'<span style="text-decoration:overline">P(z)</span>'} = 0 : les racines non réelles viennent par <b>paires conjuguées</b>. Chaque paire donne un facteur réel <b>(x − z)(x − z̄) = x² − 2 Re(z)·x + |z|²</b>, de discriminant négatif. Les irréductibles sur ℝ sont les degrés 1 et les degrés 2 avec Δ &lt; 0.`,
  params:[{id:'p',l:'p',min:-6,max:6,v:0},{id:'q',l:'q',min:-4,max:10,v:1}],
  draw:v=>{ const P=cpl(), D=v.p*v.p-4*v.q; P.dot(2,1,{c:'var(--bad)',r:4,l:'2 + i'}).dot(2,-1,{c:'var(--bad)',r:4,l:'2 − i',dy:16});
    if(D>=0){ [(-v.p+Math.sqrt(D))/2,(-v.p-Math.sqrt(D))/2].forEach(x=>P.dot(x,0,{r:6})); } else { const re=-v.p/2, im=Math.sqrt(-D)/2; P.seg(re,im,re,-im,{c:'var(--muted)',w:1,dash:true}).dot(re,im,{r:6}).dot(re,-im,{r:6}); }
    return P.svg(); },
  info:v=>{ const D=v.p*v.p-4*v.q; return `x² ${v.p<0?'−':'+'} ${Math.abs(v.p)}x ${v.q<0?'−':'+'} ${Math.abs(v.q)} : Δ = ${fmt(D,0)}, ${D>0?'deux racines réelles':D===0?'une racine double réelle':'deux racines conjuguées '+cz(-v.p/2,Math.sqrt(-D)/2)+' et '+cz(-v.p/2,-Math.sqrt(-D)/2)}`; },
  ok:v=>v.p===-4&&v.q===5,why:'(x − (2 + i))(x − (2 − i)) = x² − 2·2·x + |2 + i|² = x² − 4x + 5. Donc p = −4 et q = 5 ; Δ = 16 − 20 = −4 &lt; 0.'},
 {h:'Factoriser x⁴ − 1 sur ℝ',p:'Quelle est la factorisation de <i>x⁴ − 1</i> en irréductibles sur ℝ&nbsp;?',
  opts:['(x − 1)(x + 1)(x − i)(x + i)','(x² − 1)(x² + 1)','(x − 1)(x + 1)(x² + 1)','(x − 1)²(x + 1)²'],ans:2,
  why:'x⁴ − 1 = (x² − 1)(x² + 1) = (x − 1)(x + 1)(x² + 1). x² + 1 a Δ = −4 &lt; 0 : il est irréductible sur ℝ. La première écriture est la factorisation sur ℂ, la deuxième n’est pas complète.'},
 {kind:'Défi',h:'Reconstruire un polynôme',p:'<i>P</i> est un polynôme réel unitaire de degré 3. Il admet les racines 1 et 1 + 2i. Calcule <i>P(0)</i>.',lab:'P(0) =',ans:-5,
  why:'Coefficients réels, donc 1 − 2i est aussi racine. P = (x − 1)(x² − 2x + 5), car |1 + 2i|² = 5. Donc P(0) = (−1)·5 = −5.'},
]},

/* ===================== 7. Développements limités ===================== */
{subj:'an2', sem:'pri', id:'cms-an2-dl', h:'Développements limités', p:'Approcher une fonction par un polynôme et contrôler l’erreur.', steps:[
 {kind:'Théorie',h:'La formule de Taylor',p:`Si <i>f</i> est n fois dérivable en <i>a</i>, son <b>polynôme de Taylor</b> d’ordre n est <b>Pₙ(x) = f(a) + f′(a)(x − a) + ${F('f″(a)','2!')}(x − a)² + … + ${F('f⁽ⁿ⁾(a)','n!')}(x − a)ⁿ</b>. On a f(x) = Pₙ(x) + o((x − a)ⁿ) : c’est le <b>développement limité</b> (DL) à l’ordre n.`,
  params:[{id:'n',l:'Ordre n',min:0,max:8,v:1}],
  draw:v=>{ const T=x=>{ let s=0,t=1; for(let k=0;k<=v.n;k++){ s+=t; t*=x/(k+1); } return s; }; const P=plane({x:[-4,3],y:[-2,8],h:300,lab:1});
    P.fn(Math.exp,{c:'var(--muted)',w:5,op:.6}).fn(T,{n:300}).dot(0,1,{r:4}); return P.svg(); },
  info:v=>{ const T=x=>{ let s=0,t=1; for(let k=0;k<=v.n;k++){ s+=t; t*=x/(k+1); } return s; }; return `P${['₀','₁','₂','₃','₄','₅','₆','₇','₈'][v.n]}(1) ≈ ${fmt(T(1),5)} contre e ≈ ${fmt(Math.E,5)} (écart ${sci(Math.E-T(1))})`; },
  note:'Pour eˣ en 0, toutes les dérivées valent 1 : Pₙ(x) = 1 + x + x²/2! + … + xⁿ/n!. Plus n est grand, plus le polynôme colle loin de 0.'},
 {kind:'Théorie',h:'Les DL usuels en 0',p:'À connaître par cœur :',
  fig:`<p>eˣ = 1 + x + ${F('x²','2')} + ${F('x³','6')} + … + ${F('xⁿ','n!')} + o(xⁿ)<br>sin x = x − ${F('x³','6')} + ${F('x⁵','120')} − … <br>cos x = 1 − ${F('x²','2')} + ${F('x⁴','24')} − … <br>ln(1 + x) = x − ${F('x²','2')} + ${F('x³','3')} − … + (−1)ⁿ⁺¹${F('xⁿ','n')} + o(xⁿ)<br>(1 + x)${sup('α')} = 1 + αx + ${F('α(α − 1)','2')}x² + … + o(xⁿ)</p>`,
  note:'sin est impaire : seules les puissances impaires apparaissent. cos est paire : seulement les paires. ln(1 + x) n’a pas de factorielles au dénominateur.'},
 {h:'DL de cos',p:'Quel est le DL de <i>cos x</i> à l’ordre 4 en 0&nbsp;?',
  opts:['1 − x² + x⁴','x − x³/6','1 + x²/2 + x⁴/24','1 − x²/2 + x⁴/24'],ans:3,
  why:'Les dérivées de cos en 0 valent 1, 0, −1, 0, 1. Donc cos x = 1 − x²/2! + x⁴/4! + o(x⁴) = 1 − x²/2 + x⁴/24 + o(x⁴).'},
 {h:'Un coefficient',p:'Quel est le coefficient de <i>x²</i> dans le DL de <i>√(1 + x)</i> en 0&nbsp;? (Une fraction comme 1/3 est acceptée.)',lab:'coefficient =',ans:-.125,tol:.0001,
  why:'√(1 + x) = (1 + x)^(1/2). Le coefficient de x² est α(α − 1)/2 = (½)(−½)/2 = −1/8. Donc √(1 + x) = 1 + x/2 − x²/8 + o(x²).'},
 {kind:'Théorie',h:'Le reste de Lagrange',p:`Le o(xⁿ) dit seulement que l’erreur devient petite. Pour la <b>chiffrer</b>, on utilise le <b>reste de Lagrange</b> : f(x) − Pₙ(x) = ${F('f⁽ⁿ⁺¹⁾(ξ)','(n + 1)!')}xⁿ⁺¹ pour un ξ entre 0 et x. Pour eˣ avec x &gt; 0 : <b>|Rₙ(x)| ≤ ${E('x')}·${F('xⁿ⁺¹','(n + 1)!')}</b>. Ici, en échelle logarithmique : erreur réelle (bleu) et majorant (jaune) selon n.`,
  params:[{id:'x',l:'x',min:.25,max:2,step:.25,v:1},{id:'n',l:'Ordre n',min:1,max:10,v:3}],
  draw:v=>{ const err=n=>{ let s=0,t=1; for(let k=0;k<=n+40;k++){ if(k>n) s+=t; t*=v.x/(k+1); } return s; }; const fact=m=>{ let p=1; for(let k=2;k<=m;k++) p*=k; return p; };
    const P=plane({x:[0,11],y:[-12,1],h:260,grid:false,lx:1,ly:2}); for(let y=-12;y<=0;y+=2) P.seg(0,y,11,y,{c:'var(--line)',w:1});
    for(let n=1;n<=10;n++){ const b=Math.exp(v.x)*v.x**(n+1)/fact(n+1); P.dot(n,Math.log10(b),{c:'var(--spark)',r:n===v.n?7:4}).dot(n,Math.log10(err(n)),{c:'var(--math)',r:n===v.n?7:4}); }
    P.text(10.9,0,'n',{a:'end',dy:-6,c:'var(--muted)'}).text(.2,.6,'log₁₀(erreur)',{s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ let s=0,t=1; for(let k=0;k<=v.n+40;k++){ if(k>v.n) s+=t; t*=v.x/(k+1); } let f=1; for(let k=2;k<=v.n+1;k++) f*=k; return `x = ${fmt(v.x)}, n = ${v.n} : erreur réelle ${sci(s)}, majorant de Lagrange ${sci(Math.exp(v.x)*v.x**(v.n+1)/f)}`; },
  note:'La factorielle finit toujours par écraser xⁿ⁺¹ : le DL de eˣ converge pour tout x. Plus x est grand, plus il faut monter en ordre.'},
 {h:'Combien de termes&nbsp;?',p:'On approche <i>e = e¹</i> par Pₙ(1) = 1 + 1 + 1/2! + … + 1/n!. En utilisant e &lt; 3, quel est le plus petit <i>n</i> pour lequel le majorant de Lagrange 3/(n + 1)! garantit une erreur inférieure à 10⁻³&nbsp;?',lab:'n =',ans:6,
  why:'Il faut (n + 1)! &gt; 3000. Or 6! = 720 &lt; 3000 et 7! = 5040 &gt; 3000. Donc n + 1 = 7, soit n = 6.'},
 {h:'Trigonométrie approchée',p:'Approche <i>sin(0,5)</i> par le DL <i>x − x³/6</i>. Donne le résultat arrondi à 4 décimales.',lab:'sin(0,5) ≈',ans:.4792,tol:.00006,
  why:'0,5 − 0,125/6 = 0,5 − 0,020833 ≈ 0,4792. Comme le terme en x⁴ est nul, Lagrange à l’ordre 4 borne l’erreur par 0,5⁵/120 ≈ 2,6·10⁻⁴. La vraie valeur est 0,47943.'},
 {kind:'Défi',h:'Une limite par DL',p:'Que vaut la limite de <i>(eˣ − 1 − x)/x²</i> quand x → 0&nbsp;?',opts:['0','½','1','+∞'],ans:1,
  why:'eˣ = 1 + x + x²/2 + o(x²), donc eˣ − 1 − x = x²/2 + o(x²). Le quotient vaut ½ + o(1) et tend vers ½.'},
]},

/* ===================== 8. ED du 1er ordre ===================== */
{subj:'an2', sem:'pri', id:'cms-an2-ed1', h:'Équations différentielles du 1er ordre', p:'Linéaires, séparables, problèmes de Cauchy, refroidissement et circuit RC.', steps:[
 {kind:'Théorie',h:'L’équation homogène',p:`Une ED linéaire homogène du 1er ordre s’écrit <i>y′ + a(x)·y = 0</i>. Ses solutions sont <b>y = C·${E('−A(x)')}</b>, où A est une primitive de a et C une constante. Pour a constant, <i>y′ = ky</i> donne <b>y = C${E('kx')}</b>. La condition initiale y(0) = y₀ fixe C = y₀ : c’est un <b>problème de Cauchy</b>.`,
  params:[{id:'k',l:'k',min:-1.5,max:1.5,step:.25,v:.5},{id:'y',l:'y₀',min:-3,max:3,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],lab:2});
    for(let x=-3.5;x<=3.5;x+=1) for(let y=-3.5;y<=3.5;y+=1){ const m=v.k*y, L=.3/Math.hypot(1,m); P.seg(x-L,y-L*m,x+L,y+L*m,{c:'var(--muted)',w:1.5}); }
    P.fn(x=>v.y*Math.exp(v.k*x)).dot(0,v.y,{r:5,l:'y₀'}); return P.svg(); },
  info:v=>`y = ${fmt(v.y)}·e${sup(fmt(v.k)+'x')} · chaque petit trait a la pente k·y imposée par l’équation`,
  note:'Une solution qui vaut 0 en un point est nulle partout : deux courbes solutions distinctes ne se croisent jamais (unicité de Cauchy-Lipschitz).'},
 {h:'Un problème de Cauchy',p:'Quelle est la solution de <i>y′ = −2y</i> avec <i>y(0) = 3</i>&nbsp;?',opts:['y = 3e^(2x)','y = −2e^(3x)','y = 3e^(−2x)','y = 3 − 2x'],ans:2,
  why:'Les solutions sont C·e^(−2x), et y(0) = C = 3. Vérification : y′ = −6e^(−2x) = −2y.'},
 {kind:'Méthode',h:'Inhomogène : variation de la constante',p:`Pour <i>y′ + a(x)y = b(x)</i>, la solution générale est <b>y = y<sub>h</sub> + y<sub>p</sub></b> : homogène plus <b>une</b> solution particulière. Pour trouver y<sub>p</sub>, on cherche y = C(x)${E('−A(x)')} : en reportant, il reste <b>C′(x) = b(x)${E('A(x)')}</b>, qu’on intègre.`,
  fig:`<p>Exemple : y′ + y = x. Ici A(x) = x, donc C′(x) = x${E('x')} et C(x) = (x − 1)${E('x')} (par parties). D’où y<sub>p</sub> = x − 1 et <b>y = C${E('−x')} + x − 1</b>.</p>`,
  note:'Vérifie toujours : (x − 1)′ + (x − 1) = 1 + x − 1 = x. Pour un second membre simple, on peut aussi deviner y_p de la même forme que b(x).'},
 {h:'Trouver la constante',p:'Avec <i>y′ + y = x</i> et <i>y(0) = 2</i>, calcule <i>y(1)</i>, arrondi au centième.',lab:'y(1) =',ans:1.1,tol:.006,
  why:'y = Ce^(−x) + x − 1 et y(0) = C − 1 = 2, donc C = 3. Alors y(1) = 3/e + 0 ≈ 1,10.'},
 {kind:'Méthode',h:'Séparation des variables',p:`Si <i>y′ = g(x)·h(y)</i>, on sépare : <b>${F('dy','h(y)')} = g(x) dx</b>, puis on intègre chaque côté. Exemple : y′ = xy donne ∫dy/y = ∫x dx, ln|y| = x²/2 + c, et <b>y = C${E('x²/2')}</b>.`,
  note:'Piège : diviser par h(y) suppose h(y) ≠ 0. Les zéros de h donnent des solutions constantes à ne pas oublier (ici y = 0, qui correspond à C = 0).'},
 {h:'Séparer et intégrer',p:'Quelle est la solution de <i>y′ = x/y</i> avec <i>y(0) = 1</i>&nbsp;?',opts:['y = x + 1','y = e^(x²/2)','y = 1 + x²/2','y = √(x² + 1)'],ans:3,
  why:'y dy = x dx donne y²/2 = x²/2 + c. Avec y(0) = 1 : c = ½, donc y² = x² + 1 et, comme y(0) &gt; 0, y = √(x² + 1).'},
 {h:'Refroidir un café',p:`Loi de Newton : <i>T′ = −k(T − T<sub>a</sub>)</i>, donc <b>T(t) = T<sub>a</sub> + (T₀ − T<sub>a</sub>)${E('−kt')}</b>. Un café à 90 °C refroidit dans une pièce à 20 °C. Règle <i>k</i> (en min⁻¹) pour qu’il soit à 50 °C au bout de 10 min.`,
  params:[{id:'k',l:'k',min:.02,max:.2,step:.005,v:.05}],
  draw:v=>{ const T=t=>20+70*Math.exp(-v.k*t), P=plane({x:[0,40],y:[0,100],h:240,grid:false,lx:10,ly:20});
    for(let y=20;y<=100;y+=20) P.seg(0,y,40,y,{c:'var(--line)',w:1}); P.seg(0,20,40,20,{c:'var(--muted)',w:1.5,dash:true}).fn(T).dot(10,50,{c:'var(--bad)',r:5,l:'(10 ; 50)'}).dot(10,T(10),{r:5}).text(39,0,'t (min)',{a:'end',dy:-6,c:'var(--muted)',s:11}); return P.svg(); },
  info:v=>`k = ${fmt(v.k,3)} : T(10) ≈ ${fmt(20+70*Math.exp(-10*v.k),1)} °C`,
  ok:v=>Math.abs(20+70*Math.exp(-10*v.k)-50)<.5,why:'50 = 20 + 70e^(−10k) donne e^(−10k) = 3/7, donc k = ln(7/3)/10 ≈ 0,085 min⁻¹.'},
 {kind:'Défi',h:'Charge d’un condensateur',p:`Dans un circuit RC branché sur une tension E, <i>RC·u′ + u = E</i> avec u(0) = 0 donne <i>u(t) = E(1 − ${E('−t/RC')})</i>. Avec R = 10 kΩ et C = 100 µF, au bout de combien de secondes u atteint-elle 90 % de E&nbsp;? Arrondis au centième.`,unit:'s',ans:2.3,tol:.006,
  why:'τ = RC = 10⁴ × 10⁻⁴ = 1 s. 1 − e^(−t) = 0,9 donne e^(−t) = 0,1, soit t = ln 10 ≈ 2,30 s.'},
]},

/* ===================== 9. ED du 2e ordre ===================== */
{subj:'an2', sem:'pri', id:'cms-an2-ed2', h:'Équations différentielles du 2e ordre', p:'Coefficients constants, équation caractéristique et oscillateur amorti.', steps:[
 {kind:'Théorie',h:'L’équation caractéristique',p:`Pour <i>ay″ + by′ + cy = 0</i> (a ≠ 0), on essaie y = ${E('rx')} : il faut <b>ar² + br + c = 0</b>, l’équation caractéristique. Selon son discriminant Δ = b² − 4ac :`,
  fig:`<p><b>Δ &gt; 0</b>, deux racines réelles r₁, r₂ : y = C₁${E('r₁x')} + C₂${E('r₂x')}.<br><b>Δ = 0</b>, racine double r : y = (C₁ + C₂x)${E('rx')}.<br><b>Δ &lt; 0</b>, racines α ± iβ : y = ${E('αx')}(C₁ cos βx + C₂ sin βx).</p>`,
  note:'Deux constantes, donc deux conditions pour un problème de Cauchy : y(0) et y′(0).'},
 {h:'Deux racines réelles',p:'Quelles sont les solutions de <i>y″ − 3y′ + 2y = 0</i>&nbsp;?',opts:['C₁e^(−x) + C₂e^(−2x)','C₁eˣ + C₂e^(2x)','(C₁ + C₂x)eˣ','C₁ cos 2x + C₂ sin 2x'],ans:1,
  why:'r² − 3r + 2 = (r − 1)(r − 2) = 0 donne r = 1 et r = 2. D’où y = C₁eˣ + C₂e^(2x).'},
 {kind:'Théorie',h:'L’oscillateur amorti',p:`Une masse sur un ressort avec frottement obéit à <b>x″ + 2λx′ + ω₀²x = 0</b>. Équation caractéristique r² + 2λr + ω₀² = 0, Δ = 4(λ² − ω₀²). Ici ω₀ = 2, x(0) = 1 et x′(0) = 0 : fais varier l’amortissement λ et observe les trois régimes.`,
  params:[{id:'l',l:'Amortissement λ',min:0,max:4,step:.25,v:.5}],
  draw:v=>oscFig(v.l,2),
  info:v=>`λ = ${fmt(v.l)} : régime ${regime(v.l,2)}${v.l<2&&v.l>0?`, pseudo-pulsation √(ω₀² − λ²) ≈ ${fmt(Math.sqrt(4-v.l*v.l),3)}`:''}`,
  note:'Les pointillés sont l’enveloppe ±e^(−λt) : en régime pseudo-périodique, l’amplitude décroît exponentiellement.'},
 {h:'Pseudo-pulsation',p:'Pour <i>y″ + 4y′ + 13y = 0</i>, les solutions sont de la forme e^(αx)(C₁ cos βx + C₂ sin βx). Combien vaut β&nbsp;?',lab:'β =',ans:3,
  why:'r² + 4r + 13 = 0 : Δ = 16 − 52 = −36, donc r = (−4 ± 6i)/2 = −2 ± 3i. α = −2 et β = 3.'},
 {kind:'Méthode',h:'Second membre simple',p:'Pour <i>ay″ + by′ + cy = f(x)</i>, encore <b>y = y<sub>h</sub> + y<sub>p</sub></b>. On cherche y<sub>p</sub> de la même forme que f :',
  fig:`<p><b>f polynôme</b> de degré d : y<sub>p</sub> polynôme de degré d (si c ≠ 0).<br><b>f = A${E('mx')}</b> : y<sub>p</sub> = B${E('mx')}, si m n’est pas racine caractéristique.<br><b>f = A cos ωx</b> ou <b>A sin ωx</b> : y<sub>p</sub> = B cos ωx + D sin ωx, si iω n’est pas racine.</p><p>Si m (ou iω) est racine, on multiplie l’essai par x, et par x² si la racine est double : c’est la <b>résonance</b>.</p>`,
  note:'Exemple : y″ − y = e^(2x). On essaie Be^(2x) : 4B − B = 1, donc B = 1/3.'},
 {h:'Trouver B',p:'On cherche une solution particulière de <i>y″ − y′ − 2y = e^(3x)</i> sous la forme <i>Be^(3x)</i>. Combien vaut B&nbsp;?',lab:'B =',ans:.25,tol:.0001,
  why:'y_p″ − y_p′ − 2y_p = (9 − 3 − 2)Be^(3x) = 4Be^(3x). Il faut 4B = 1, donc B = 1/4. Ça marche car 3 n’est pas racine de r² − r − 2 = (r − 2)(r + 1).'},
 {h:'Amortissement critique',p:'Pour <i>x″ + b·x′ + 9x = 0</i>, avec x(0) = 1 et x′(0) = 0, règle <i>b</i> pour obtenir le régime <b>critique</b>.',
  params:[{id:'b',l:'b',min:0,max:10,step:.5,v:2}],
  draw:v=>oscFig(v.b/2,3),
  info:v=>`b² − 36 = ${fmt(v.b*v.b-36)} : régime ${regime(v.b/2,3)}`,
  ok:v=>v.b===6,why:'Équation caractéristique r² + br + 9 = 0. Régime critique quand Δ = b² − 36 = 0, soit b = 6. Alors r = −3 est racine double et x = (1 + 3t)e^(−3t).'},
 {kind:'Défi',h:'Résonance',p:'Quelle fonction est une solution particulière de <i>y″ + y = cos x</i>&nbsp;?',opts:['½ cos x','(x/2)·sin x','x·cos x','sin x'],ans:1,
  why:'i est racine de r² + 1 = 0 : un essai B cos x + D sin x donne 0, il faut multiplier par x. Avec y = (x/2) sin x : y″ = cos x − (x/2) sin x, donc y″ + y = cos x.'},
]},
);
})();
