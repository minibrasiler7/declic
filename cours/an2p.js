/* Déclic — Analyse II, complexes et équations différentielles */
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

COURS.push(
/* ===================== 1. Exponentielle, logarithme, puissances ===================== */
{subj:'an2', sem:'pri', id:'an2-puissances', h:'Exponentielle, logarithme et puissances', p:'Définir aˣ et x^α pour tous les réels grâce à e et ln, et les dériver.', steps:[
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
 {kind:'Problème',h:'Intérêts composés ou continus',
  p:'Tu places 1000 CHF à 3 % par an, intérêts composés chaque année : le capital vaut <b><i>C</i>(<i>t</i>) = 1000 · 1,03<sup><i>t</i></sup></b> après <i>t</i> années. La formule a un sens pour tout réel <i>t</i> ≥ 0 grâce à 1,03<sup><i>t</i></sup> = e<sup><i>t</i> ln 1,03</sup>. Une autre banque propose un taux « continu » de 3 % : <i>D</i>(<i>t</i>) = 1000 e<sup>0,03<i>t</i></sup>.',
  parts:[
   {q:'a) Au bout de combien d’années le capital <i>C</i> double-t-il&nbsp;? Arrondis au centième.',lab:'t =',unit:'ans',ans:23.45,tol:.006,hint:'1,03ᵗ = 2. Passe par ln : t ln 1,03 = ln 2.',why:'t = ln 2 / ln 1,03 ≈ 0,6931 / 0,02956 ≈ 23,45 ans.'},
   {q:'b) À quelle vitesse le capital augmente-t-il au départ, <i>C</i>′(0), en CHF par an&nbsp;? Arrondis au centième.',lab:'C′(0) =',unit:'CHF/an',ans:29.56,tol:.006,hint:'(aᵗ)′ = ln a · aᵗ.',why:'C′(t) = 1000 ln 1,03 · 1,03ᵗ, donc C′(0) = 1000 ln 1,03 ≈ 29,56 CHF/an, un peu moins que 30.'},
   {q:'c) Après 10 ans, de combien <i>D</i>(10) dépasse-t-il <i>C</i>(10)&nbsp;? Arrondis au centime.',lab:'écart =',unit:'CHF',ans:5.94,tol:.006,hint:'D(10) = 1000 e^0,3 et C(10) = 1000 · 1,03¹⁰.',why:'D(10) ≈ 1349,86 et C(10) ≈ 1343,92 : l’écart vaut environ 5,94 CHF.'},
   {q:'d) Pourquoi <i>D</i> croît-il toujours plus vite que <i>C</i>&nbsp;?',opts:['Parce que e > 1,03','Parce que 0,03 > ln 1,03, donc e^(0,03t) > e^(t ln 1,03) pour t > 0','Parce que D est une exponentielle et C une puissance','Parce que C′(0) = 30 et D′(0) = 29,56'],ans:1,hint:'Écris les deux capitaux sous la forme 1000 e^(kt) et compare les deux valeurs de k.',why:'C(t) = 1000 e^(t ln 1,03) avec ln 1,03 ≈ 0,02956 < 0,03. Comme exp est croissante, D(t) > C(t) pour tout t > 0.'},
  ],
  sol:'<p>Toute exponentielle de base <i>a</i> s’écrit avec e : <i>C</i>(<i>t</i>) = 1000 e<sup><i>t</i> ln 1,03</sup>, avec ln 1,03 ≈ 0,02956.</p><p>a) Doublement : <i>t</i> = ln 2/ln 1,03 ≈ 23,45 ans (la « règle de 72 » donne 72/3 = 24). b) <i>C</i>′(<i>t</i>) = ln 1,03 · <i>C</i>(<i>t</i>), donc <i>C</i>′(0) ≈ 29,56 CHF/an.</p><p>c) <i>D</i>(10) − <i>C</i>(10) = 1000(e<sup>0,3</sup> − 1,03<sup>10</sup>) ≈ 5,94 CHF. d) Le taux continu équivalent à 3 % annuel est ln 1,03 ≈ 2,956 % : la banque continue, à 3 %, offre donc un peu plus.</p>'},
 {kind:'Problème',h:'La loi de Kleiber',
  p:'Chez les mammifères, la dépense d’énergie au repos suit à peu près la <b>loi de Kleiber</b> : <b><i>B</i>(<i>M</i>) = 70 <i>M</i><sup>0,75</sup></b>, avec <i>B</i> en kcal par jour et la masse <i>M</i> en kg. L’exposant 0,75 n’est pas entier, donc <i>M</i><sup>0,75</sup> = e<sup>0,75 ln <i>M</i></sup>. On compare un humain de 70 kg et une souris de 20 g.',
  fig:(()=>{ const P=plane({x:[0,80],y:[0,2200],w:320,h:170,grid:false,lx:20,ly:500}); [500,1000,1500,2000].forEach(y=>P.seg(0,y,80,y,{c:'var(--line)',w:1}));
    P.fn(M=>70*Math.pow(M,.75),{from:0,to:80,n:300}).dot(70,70*Math.pow(70,.75),{l:'humain',dx:-60,dy:-10}).text(79,0,'M (kg)',{a:'end',dy:-6,s:11,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la dépense <i>B</i>(70) d’un humain de 70 kg&nbsp;? Arrondis à l’unité.',lab:'B =',unit:'kcal/j',ans:1694,tol:1,hint:'70^0,75 = e^(0,75 ln 70).',why:'70^0,75 ≈ 24,20, donc B(70) ≈ 70 · 24,20 ≈ 1694 kcal/j.'},
   {q:'b) Par quel facteur <i>B</i> est-elle multipliée quand la masse double&nbsp;? Arrondis au centième.',lab:'facteur =',ans:1.68,tol:.006,hint:'B(2M)/B(M) ne dépend pas de M.',why:'B(2M)/B(M) = 2^0,75 ≈ 1,68 : doubler la masse ne double pas la dépense.'},
   {q:'c) Combien vaut <i>B</i>′(70), en kcal/j par kg supplémentaire&nbsp;? Arrondis au centième.',lab:'B′(70) =',ans:18.15,tol:.006,hint:'(M^α)′ = α M^(α − 1), ici α − 1 = −0,25.',why:'B′(M) = 70 · 0,75 · M^(−0,25), et B′(70) = 52,5 · 70^(−0,25) ≈ 18,15.'},
   {q:'d) Par kilo de masse, combien de fois une souris de 0,02 kg dépense-t-elle plus qu’un humain de 70 kg&nbsp;? Arrondis au centième.',lab:'rapport =',ans:7.69,tol:.006,hint:'La dépense par kilo vaut B(M)/M = 70 M^(−0,25).',why:'Rapport = (0,02)^(−0,25) / 70^(−0,25) = (70/0,02)^0,25 = 3500^0,25 ≈ 7,69.'},
   {q:'e) Quelle masse correspond à une dépense de 1000 kcal/j&nbsp;? Arrondis au dixième de kg.',lab:'M =',unit:'kg',ans:34.7,tol:.06,hint:'M^0,75 = 1000/70, puis élève à la puissance 1/0,75 = 4/3.',why:'M = (1000/70)^(4/3) = e^((4/3) ln 14,286) ≈ 34,7 kg.'},
  ],
  sol:'<p>On écrit <i>B</i>(<i>M</i>) = 70 e<sup>0,75 ln <i>M</i></sup>, définie pour <i>M</i> &gt; 0.</p><p>a) <i>B</i>(70) ≈ 1694 kcal/j. b) <i>B</i>(2<i>M</i>)/<i>B</i>(<i>M</i>) = 2<sup>0,75</sup> ≈ 1,68. c) <i>B</i>′(<i>M</i>) = 52,5 <i>M</i><sup>−0,25</sup>, donc <i>B</i>′(70) ≈ 18,15 : un kilo de plus coûte environ 18 kcal/j, bien moins que la moyenne 1694/70 ≈ 24,2.</p><p>d) La dépense par kilo, 70 <i>M</i><sup>−0,25</sup>, décroît avec la masse : rapport souris/humain (3500)<sup>0,25</sup> ≈ 7,69. e) <i>M</i> = (1000/70)<sup>4/3</sup> ≈ 34,7 kg.</p><p>En coordonnées log-log, ln <i>B</i> = ln 70 + 0,75 ln <i>M</i> : une droite de pente 0,75, c’est ainsi qu’on mesure l’exposant.</p>'},
]},

/* ===================== 2. Fonctions hyperboliques ===================== */
{subj:'an2', sem:'pri', id:'an2-hyperboliques', h:'Fonctions hyperboliques', p:'ch, sh et th : les cousines de cos et sin, construites avec eˣ.', steps:[
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
 {kind:'Problème',h:'Le câble entre deux poteaux',
  p:'Un câble homogène suspendu entre deux poteaux prend la forme d’une <b>chaînette</b> <i>y</i> = <i>a</i> ch(<i>x</i>/<i>a</i>). Ici <i>a</i> = 20 m et les poteaux sont en <i>x</i> = −30 m et <i>x</i> = 30 m. La longueur du câble entre les abscisses −<i>b</i> et <i>b</i> vaut 2<i>a</i> sh(<i>b</i>/<i>a</i>), une formule qui vient de 1 + sh² = ch².',
  fig:(()=>{ const P=plane({x:[-36,36],y:[-4,52],w:320,grid:false,axes:false}), f=x=>20*Math.cosh(x/20);
    P.seg(-36,0,36,0,{c:'var(--muted)',w:1.5}).seg(-30,0,-30,f(30),{c:'var(--ink)',w:3}).seg(30,0,30,f(30),{c:'var(--ink)',w:3}).fn(f,{from:-30,to:30}).seg(0,0,0,20,{c:'var(--muted)',w:1.5,dash:true}).dot(0,20,{r:4,l:'20 m',dx:6,dy:16}).text(-29,f(30),'47 m',{dx:6,dy:4,s:11}); return P.svg(); })(),
  parts:[
   {q:'a) À quelle hauteur le câble est-il fixé aux poteaux&nbsp;? Arrondis au centième.',lab:'y =',unit:'m',ans:47.05,tol:.006,hint:'Calcule 20 ch(30/20) = 10(e^1,5 + e^(−1,5)).',why:'ch(1,5) ≈ 2,3524, donc y(30) ≈ 47,05 m.'},
   {q:'b) Quelle est la flèche du câble (écart entre la hauteur aux poteaux et le point le plus bas)&nbsp;? Arrondis au centième.',lab:'flèche =',unit:'m',ans:27.05,tol:.006,hint:'Le point le plus bas est en x = 0, où ch 0 = 1.',why:'Le minimum vaut 20 ch 0 = 20 m. La flèche est 47,05 − 20 ≈ 27,05 m.'},
   {q:'c) Quelle est la longueur du câble&nbsp;? Arrondis au centième.',lab:'L =',unit:'m',ans:85.17,tol:.006,hint:'L = 2a sh(b/a) avec b = 30.',why:'L = 40 sh(1,5) ≈ 40 · 2,1293 ≈ 85,17 m, bien plus que les 60 m entre les poteaux.'},
   {q:'d) Quel angle le câble fait-il avec l’horizontale au poteau de droite&nbsp;? Arrondis au dixième de degré.',lab:'angle =',unit:'°',ans:64.8,tol:.06,hint:'La pente est y′(30). Dérive a ch(x/a) : (ch u)′ = sh u.',why:'y′(x) = sh(x/20), donc y′(30) = sh 1,5 ≈ 2,129 et l’angle vaut arctan(2,129) ≈ 64,8°.'},
  ],
  sol:'<p>Avec <i>y</i>(<i>x</i>) = 20 ch(<i>x</i>/20) : <i>y</i>(±30) = 20 ch 1,5 ≈ 47,05 m et le point le plus bas est <i>y</i>(0) = 20 m, d’où une flèche de 27,05 m.</p><p>La dérivée vaut <i>y</i>′(<i>x</i>) = sh(<i>x</i>/20). La longueur d’arc est ∫√(1 + sh²(<i>x</i>/20)) d<i>x</i> = ∫ch(<i>x</i>/20) d<i>x</i> sur [−30 ; 30], soit 40 sh 1,5 ≈ 85,17 m.</p><p>Au poteau, la pente vaut sh 1,5 ≈ 2,129 : le câble y fait un angle de 64,8° avec l’horizontale.</p>'},
 {kind:'Problème',h:'Chute avec frottement de l’air',
  p:'Un parachutiste en chute libre (parachute fermé) subit un frottement proportionnel au carré de sa vitesse. Sa vitesse vérifie <i>v</i>′ = <i>g</i>(1 − <i>v</i>²/<i>v</i><sub>L</sub>²), et la solution partant de <i>v</i>(0) = 0 est <b><i>v</i>(<i>t</i>) = <i>v</i><sub>L</sub> th(<i>gt</i>/<i>v</i><sub>L</sub>)</b>. On prend <i>g</i> = 9,81 m/s² et une vitesse limite <i>v</i><sub>L</sub> = 50 m/s.',
  fig:(()=>{ const P=plane({x:[-1,21],y:[-5,58],w:320,h:180,grid:false,lx:5,ly:10}); P.seg(0,50,21,50,{c:'var(--muted)',w:1.5,dash:true}).seg(0,45,21,45,{c:'var(--bad)',w:1,dash:true}).fn(t=>50*Math.tanh(9.81*t/50),{from:0,to:21}).text(20.5,0,'t (s)',{a:'end',dy:-6,s:11,c:'var(--muted)'}).text(12,53,'vitesse limite',{s:11,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) Vérifie que cette fonction satisfait l’équation. Quelle égalité utilises-tu&nbsp;?',opts:['(th u)′ = 1 + th² u','(th u)′ = 1 − th² u','th u = sh u − ch u','ch² u + sh² u = 1'],ans:1,hint:'Dérive v<sub>L</sub> th(gt/v<sub>L</sub>) par la règle de chaîne, puis exprime le résultat avec v.',why:'v′ = v<sub>L</sub> · (g/v<sub>L</sub>)(1 − th²(gt/v<sub>L</sub>)) = g(1 − v²/v<sub>L</sub>²). C’est bien l’équation.'},
   {q:'b) Quelle est la vitesse au bout de 2 s&nbsp;? Arrondis au centième.',lab:'v =',unit:'m/s',ans:18.67,tol:.006,hint:'Calcule 50 th(9,81 · 2/50) = 50 th(0,3924).',why:'th(0,3924) ≈ 0,3734, donc v(2) ≈ 18,67 m/s, à peine moins que gt = 19,62 m/s sans frottement.'},
   {q:'c) Au bout de combien de secondes atteint-il 90 % de la vitesse limite&nbsp;? Arrondis au centième.',lab:'t =',unit:'s',ans:7.5,tol:.006,hint:'th u = 0,9 ⇔ u = argth 0,9 = ½ ln(1,9/0,1).',why:'u = ½ ln 19 ≈ 1,4722, puis t = u · v<sub>L</sub>/g = 1,4722 · 50/9,81 ≈ 7,50 s.'},
   {q:'d) La distance parcourue est <i>x</i>(<i>t</i>) = (<i>v</i><sub>L</sub>²/<i>g</i>) ln ch(<i>gt</i>/<i>v</i><sub>L</sub>). Combien de mètres a-t-il chuté après 10 s&nbsp;? Arrondis au mètre.',lab:'x =',unit:'m',ans:328,tol:1,hint:'Vérifie d’abord que x′ = v : (ln ch u)′ = th u. Puis calcule avec u = 1,962.',why:'u = 9,81 · 10/50 = 1,962, ch u ≈ 3,627, ln ch u ≈ 1,2885, et x ≈ (2500/9,81) · 1,2885 ≈ 328 m (contre 490 m sans frottement).'},
  ],
  sol:'<p>Avec <i>u</i> = <i>gt</i>/<i>v</i><sub>L</sub> : <i>v</i>′ = <i>g</i>(1 − th²<i>u</i>) = <i>g</i>(1 − <i>v</i>²/<i>v</i><sub>L</sub>²), et <i>v</i>(0) = 0. Comme th <i>u</i> → 1, <i>v</i> tend vers <i>v</i><sub>L</sub> sans l’atteindre.</p><p><i>v</i>(2) = 50 th 0,3924 ≈ 18,67 m/s. Pour 90 % : th <i>u</i> = 0,9 ⇔ <i>u</i> = argth 0,9 = ½ ln 19 ≈ 1,472, d’où <i>t</i> ≈ 7,50 s.</p><p>La distance est une primitive de <i>v</i> : comme (ln ch <i>u</i>)′ = th <i>u</i>, <i>x</i>(<i>t</i>) = (<i>v</i><sub>L</sub>²/<i>g</i>) ln ch(<i>gt</i>/<i>v</i><sub>L</sub>), nulle en 0. À <i>t</i> = 10 s : <i>x</i> ≈ 254,8 · 1,2885 ≈ 328 m.</p>'},
]},

/* ===================== 3. Nombres complexes ===================== */
{subj:'an2', sem:'pri', id:'an2-complexes', h:'Nombres complexes', p:'Calculer avec i, le module, le conjugué et l’inverse.', steps:[
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
 {kind:'Problème',h:'Impédances d’un circuit',
  p:'En courant alternatif, un dipôle se décrit par une <b>impédance complexe</b> <i>Z</i> = <i>R</i> + <i>iX</i> (en ohms) : <i>R</i> est la résistance, <i>X</i> la réactance, et |<i>Z</i>| règle l’amplitude du courant. Deux dipôles ont pour impédances <i>Z</i>₁ = 3 + 4i et <i>Z</i>₂ = 6 − 8i. En série, <i>Z</i> = <i>Z</i>₁ + <i>Z</i>₂. En parallèle, 1/<i>Z</i> = 1/<i>Z</i>₁ + 1/<i>Z</i>₂, soit <i>Z</i> = <i>Z</i>₁<i>Z</i>₂/(<i>Z</i>₁ + <i>Z</i>₂).',
  parts:[
   {q:'a) Quel est le module de l’impédance en série, |<i>Z</i>₁ + <i>Z</i>₂|&nbsp;? Arrondis au centième.',lab:'|Z| =',unit:'Ω',ans:9.85,tol:.006,hint:'Additionne parties réelles et imaginaires séparément.',why:'Z₁ + Z₂ = 9 − 4i, donc |Z| = √(81 + 16) = √97 ≈ 9,85 Ω.'},
   {q:'b) Calcule le produit <i>Z</i>₁<i>Z</i>₂. Que vaut sa partie réelle&nbsp;?',lab:'Re =',ans:50,hint:'Développe et utilise i² = −1. Remarque que Z₂ = 2 · Z̄₁.',why:'(3 + 4i)(6 − 8i) = 18 − 24i + 24i − 32i² = 18 + 32 = 50. Le produit est réel, car Z₂ = 2·Z̄₁ et Z₁Z̄₁ = |Z₁|² = 25.'},
   {q:'c) Quelle est la partie réelle de l’impédance en parallèle&nbsp;? Arrondis au centième.',lab:'Re Z =',unit:'Ω',ans:4.64,tol:.006,hint:'Z = 50/(9 − 4i). Multiplie haut et bas par le conjugué 9 + 4i.',why:'Z = 50(9 + 4i)/97 = 450/97 + (200/97)i ≈ 4,64 + 2,06i.'},
   {q:'d) Quel est le module de l’impédance en parallèle&nbsp;? Arrondis au centième.',lab:'|Z| =',unit:'Ω',ans:5.08,tol:.006,hint:'|z/w| = |z|/|w| : pas besoin de la forme a + bi.',why:'|Z| = |Z₁||Z₂|/|Z₁ + Z₂| = 5 · 10/√97 ≈ 5,08 Ω.'},
  ],
  sol:'<p>Série : <i>Z</i>₁ + <i>Z</i>₂ = 9 − 4i, de module √97 ≈ 9,85 Ω.</p><p>Parallèle : <i>Z</i>₁<i>Z</i>₂ = (3 + 4i)(6 − 8i) = 50, donc <i>Z</i> = 50/(9 − 4i) = 50(9 + 4i)/(81 + 16) ≈ 4,64 + 2,06i Ω.</p><p>Le module se calcule plus vite avec |<i>zw</i>| = |<i>z</i>||<i>w</i>| : |<i>Z</i>| = 5 · 10/√97 ≈ 5,08 Ω. La partie imaginaire positive indique un comportement globalement inductif.</p>'},
 {kind:'Problème',h:'Une équation du second degré dans ℂ',
  p:'On veut résoudre <b><i>z</i>² − (2 + i)<i>z</i> + (2 − 2i) = 0</b>. La formule habituelle marche dans ℂ : <i>z</i> = (<i>b</i>′ ± <i>δ</i>)/2, où <i>b</i>′ = 2 + i et <i>δ</i> est une racine carrée du discriminant Δ. Mais il faut trouver <i>δ</i> à la main, en posant <i>δ</i> = <i>x</i> + <i>iy</i> avec <i>x</i>, <i>y</i> réels.',
  parts:[
   {q:'a) Calcule le discriminant Δ = (2 + i)² − 4(2 − 2i). Que vaut sa partie imaginaire&nbsp;?',lab:'Im Δ =',ans:12,hint:'(2 + i)² = 4 + 4i + i².',why:'(2 + i)² = 3 + 4i et 4(2 − 2i) = 8 − 8i, donc Δ = −5 + 12i.'},
   {q:'b) <i>δ</i>² = Δ donne <i>x</i>² − <i>y</i>² = −5 et 2<i>xy</i> = 12. Quelle troisième équation, tirée des modules, simplifie tout&nbsp;?',lab:'x² + y² =',ans:13,hint:'|δ|² = |Δ|, et |Δ| = √(25 + 144).',why:'|δ|² = |δ²| = |Δ| = √169 = 13, donc x² + y² = 13.'},
   {q:'c) Avec <i>x</i> &gt; 0, que vaut <i>x</i>&nbsp;?',lab:'x =',ans:2,hint:'Additionne x² − y² = −5 et x² + y² = 13.',why:'2x² = 8, x = 2 ; puis y = 12/(2x) = 3. Donc δ = 2 + 3i (et −δ convient aussi).'},
   {q:'d) Quelles sont les deux solutions&nbsp;?',opts:['2 + 2i et −i','2 − 2i et i','1 + 2i et 1 − i','2 + 3i et −2 − 3i'],ans:0,hint:'z = ((2 + i) ± (2 + 3i))/2.',why:'((2 + i) + (2 + 3i))/2 = 2 + 2i et ((2 + i) − (2 + 3i))/2 = −i. Contrôle : somme 2 + i et produit (2 + 2i)(−i) = 2 − 2i.'},
  ],
  sol:'<p>Δ = (2 + i)² − 4(2 − 2i) = 3 + 4i − 8 + 8i = −5 + 12i.</p><p>On cherche <i>δ</i> = <i>x</i> + <i>iy</i> avec <i>δ</i>² = Δ : <i>x</i>² − <i>y</i>² = −5, 2<i>xy</i> = 12, et par les modules <i>x</i>² + <i>y</i>² = 13. D’où <i>x</i>² = 4, <i>y</i>² = 9, et <i>xy</i> &gt; 0 : <i>δ</i> = ±(2 + 3i).</p><p>Les solutions sont <i>z</i> = ((2 + i) ± (2 + 3i))/2, soit <b>2 + 2i et −i</b>. Vérification par les relations coefficients-racines : somme 2 + i, produit 2 − 2i. Les racines ne sont pas conjuguées : normal, les coefficients ne sont pas réels.</p>'},
]},

/* ===================== 4. Représentations ===================== */
{subj:'an2', sem:'pri', id:'an2-representations', h:'Représentations des complexes', p:'Plan de Gauss, forme polaire, Euler, Moivre et matrices 2 × 2.', steps:[
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
 {kind:'Problème',h:'Une puissance dixième',
  p:'On veut calculer <b>(1 + i√3)¹⁰</b> sans développer dix fois. La forme polaire transforme la puissance en deux opérations simples : élever le module à la puissance 10 et multiplier l’argument par 10. On repasse ensuite en forme cartésienne.',
  parts:[
   {q:'a) Quel est le module de 1 + i√3&nbsp;?',lab:'r =',ans:2,hint:'r = √(a² + b²).',why:'r = √(1 + 3) = 2.'},
   {q:'b) Quel est son argument, en degrés&nbsp;?',lab:'θ =',unit:'°',ans:60,hint:'cos θ = 1/2 et sin θ = √3/2.',why:'θ = 60° = π/3, donc 1 + i√3 = 2e^(iπ/3).'},
   {q:'c) Quelle est la partie réelle de (1 + i√3)¹⁰&nbsp;?',lab:'Re =',ans:-512,hint:'Moivre : 2¹⁰ e^(10iπ/3). Ramène 10π/3 dans ]−π ; π].',why:'10π/3 = 4π − 2π/3, donc l’argument vaut −2π/3 et la puissance vaut 1024(−1/2 − i√3/2) = −512 − 512√3 i. Partie réelle : −512.'},
   {q:'d) Quel est le plus petit entier <i>n</i> ≥ 1 tel que (1 + i√3)ⁿ soit un réel <b>positif</b>&nbsp;?',lab:'n =',ans:6,hint:'Il faut que nπ/3 soit un multiple de 2π.',why:'nπ/3 = 2kπ ⇔ n = 6k. Le plus petit est n = 6 : (1 + i√3)⁶ = 64.'},
  ],
  sol:'<p>1 + i√3 a pour module 2 et pour argument π/3 : 1 + i√3 = 2e<sup>iπ/3</sup>.</p><p>Par Moivre, (1 + i√3)¹⁰ = 2¹⁰ e<sup>10iπ/3</sup> = 1024 e<sup>−2iπ/3</sup>, car 10π/3 − 4π = −2π/3. Donc <b>(1 + i√3)¹⁰ = −512 − 512√3 i ≈ −512 − 886,8i</b>.</p><p>La puissance <i>n</i>-ième a pour argument <i>n</i>π/3. Elle est réelle positive si <i>n</i>π/3 ≡ 0 (mod 2π), soit <i>n</i> multiple de 6 : la plus petite vaut (1 + i√3)⁶ = 64.</p>'},
 {kind:'Problème',h:'Le bras articulé',
  p:'Un bras de robot plan a deux segments : le premier, de longueur 3, part de l’origine et fait l’angle <i>α</i> avec l’axe réel. Le second, de longueur 2, est articulé au bout du premier et tourne d’un angle <i>β</i> supplémentaire. La pince est donc en <b><i>z</i> = 3e<sup><i>iα</i></sup> + 2e<sup><i>i</i>(<i>α</i>+<i>β</i>)</sup></b>. Les produits d’exponentielles additionnent les angles, ce qui rend le calcul naturel.',
  params:[{id:'a',l:'α',min:0,max:90,step:15,v:30,u:'°'},{id:'b',l:'β',min:0,max:180,step:15,v:45,u:'°'}],
  draw:v=>{ const a=rad(v.a), b=rad(v.b), x1=3*Math.cos(a), y1=3*Math.sin(a), x2=x1+2*Math.cos(a+b), y2=y1+2*Math.sin(a+b), P=cpl(5.5,1);
    P.circ(0,0,5,{c:'var(--muted)',w:1,dash:true}).seg(0,0,x1,y1,{c:'var(--math)',w:5}).seg(x1,y1,x2,y2,{c:'var(--spark)',w:5}).dot(x1,y1,{c:'var(--ink)',r:4}).dot(x2,y2,{l:'z'}); return P.svg(); },
  info:v=>{ const a=rad(v.a), b=rad(v.b), x=3*Math.cos(a)+2*Math.cos(a+b), y=3*Math.sin(a)+2*Math.sin(a+b); return 'z ≈ '+cz(x,y)+' · |z| ≈ '+fmt(Math.hypot(x,y),3); },
  parts:[
   {q:'a) Pour <i>α</i> = 30° et <i>β</i> = 45°, quelle est la partie réelle de <i>z</i>&nbsp;? Arrondis au centième.',lab:'Re z =',ans:3.12,tol:.006,hint:'Re z = 3 cos 30° + 2 cos 75°.',why:'3 · 0,8660 + 2 · 0,2588 ≈ 2,598 + 0,518 ≈ 3,12.'},
   {q:'b) Quelle est la distance |<i>z</i>| de la pince à l’origine dans ce cas&nbsp;? Arrondis au centième.',lab:'|z| =',ans:4.64,tol:.006,hint:'Mets e^(iα) en facteur : |z| = |3 + 2e^(iβ)|. α ne compte pas.',why:'|z|² = |3 + 2e^(iβ)|² = 9 + 4 + 12 cos β = 13 + 12 cos 45° ≈ 21,49, donc |z| ≈ 4,64.'},
   {q:'c) Pour que la pince soit à distance 4 de l’origine, quel angle <i>β</i> ∈ [0° ; 180°] faut-il&nbsp;? Arrondis au dixième.',lab:'β =',unit:'°',ans:75.5,tol:.06,hint:'Résous 13 + 12 cos β = 16.',why:'cos β = 3/12 = 1/4, donc β = arccos(1/4) ≈ 75,5°. C’est la loi du cosinus déguisée.'},
   {q:'d) Quelles distances la pince peut-elle atteindre&nbsp;?',opts:['Toutes celles de [0 ; 5]','Toutes celles de [1 ; 5]','Toutes celles de [2 ; 3]','Seulement 5'],ans:1,hint:'|z|² = 13 + 12 cos β, avec cos β ∈ [−1 ; 1].',why:'|z|² varie de 13 − 12 = 1 à 13 + 12 = 25, donc |z| ∈ [1 ; 5] : un anneau. Bras replié (β = 180°) : 3 − 2 = 1. Bras tendu (β = 0) : 3 + 2 = 5.'},
  ],
  sol:'<p><i>z</i> = 3e<sup><i>iα</i></sup> + 2e<sup><i>i</i>(<i>α</i>+<i>β</i>)</sup> = e<sup><i>iα</i></sup>(3 + 2e<sup><i>iβ</i></sup>). Comme |e<sup><i>iα</i></sup>| = 1, <b>|<i>z</i>| = |3 + 2e<sup><i>iβ</i></sup>|</b> : <i>α</i> ne fait que tourner la pince autour de l’origine.</p><p>|3 + 2e<sup><i>iβ</i></sup>|² = (3 + 2 cos <i>β</i>)² + (2 sin <i>β</i>)² = 13 + 12 cos <i>β</i>.</p><p>Pour <i>α</i> = 30°, <i>β</i> = 45° : <i>z</i> ≈ 3,12 + 3,43i, |<i>z</i>| ≈ 4,64. Distance 4 : cos <i>β</i> = 1/4, <i>β</i> ≈ 75,5°. En faisant varier <i>β</i>, |<i>z</i>| parcourt [1 ; 5] et, avec <i>α</i>, la pince couvre tout l’anneau 1 ≤ |<i>z</i>| ≤ 5.</p>'},
]},

/* ===================== 5. Racines n-ièmes ===================== */
{subj:'an2', sem:'pri', id:'an2-racines', h:'Racines de l’unité et racines n-ièmes', p:'Résoudre zⁿ = w : des polygones réguliers dans le plan complexe.', steps:[
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
 {kind:'Problème',h:'Les racines cubiques de −8',
  p:'On résout <b><i>z</i>³ = −8</b> dans ℂ. On sait déjà que −2 est une solution réelle. Les trois solutions forment un triangle équilatéral centré à l’origine, qu’on va décrire complètement.',
  fig:(()=>{ const P=cpl(2.6,1,{step:.5}), pts=[60,180,300].map(t=>[2*Math.cos(rad(t)),2*Math.sin(rad(t))]); P.circ(0,0,2,{c:'var(--muted)',w:1.5,dash:true}).poly(pts,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:2}); pts.forEach(p=>P.dot(p[0],p[1],{r:5})); return P.svg(); })(),
  parts:[
   {q:'a) Quel est le module commun des trois solutions&nbsp;?',lab:'r =',ans:2,hint:'r³ = |−8|.',why:'r³ = 8, donc r = 2.'},
   {q:'b) Quelles sont les trois solutions&nbsp;?',opts:['−2, 2i, −2i','−2, 1 + i√3, 1 − i√3','2, −1 + i√3, −1 − i√3','−2, √3 + i, √3 − i'],ans:1,hint:'−8 = 8e^(iπ). Les arguments sont (π + 2kπ)/3 : π/3, π et 5π/3.',why:'2e^(iπ/3) = 1 + i√3, 2e^(iπ) = −2 et 2e^(5iπ/3) = 1 − i√3.'},
   {q:'c) Quelle est la longueur du côté du triangle&nbsp;? Arrondis au millième.',lab:'côté =',ans:3.464,tol:.0006,hint:'Distance entre 1 + i√3 et 1 − i√3.',why:'|(1 + i√3) − (1 − i√3)| = |2i√3| = 2√3 ≈ 3,464.'},
   {q:'d) Quelle est l’aire du triangle&nbsp;? Arrondis au millième.',lab:'aire =',ans:5.196,tol:.0006,hint:'Aire d’un triangle équilatéral de côté c : (√3/4) c².',why:'(√3/4) · 12 = 3√3 ≈ 5,196.'},
  ],
  sol:'<p>−8 = 8e<sup>iπ</sup>. Avec <i>z</i> = <i>r</i>e<sup>iθ</sup> : <i>r</i>³ = 8 et 3<i>θ</i> = π + 2<i>k</i>π, donc <i>r</i> = 2 et <i>θ</i> ∈ {π/3 ; π ; 5π/3}.</p><p>Solutions : <b>1 + i√3, −2, 1 − i√3</b>. On peut aussi factoriser : <i>z</i>³ + 8 = (<i>z</i> + 2)(<i>z</i>² − 2<i>z</i> + 4), et le trinôme a pour racines 1 ± i√3.</p><p>Ce sont les sommets d’un triangle équilatéral inscrit dans le cercle de rayon 2 : côté 2√3 ≈ 3,464, aire 3√3 ≈ 5,196. La somme des trois racines vaut 0 : le centre de gravité est l’origine.</p>'},
 {kind:'Problème',h:'cos 72° par les racines cinquièmes',
  p:'Soit <i>ω</i> = e<sup>2iπ/5</sup>. On sait que 1 + <i>ω</i> + <i>ω</i>² + <i>ω</i>³ + <i>ω</i>⁴ = 0 et que <i>ω</i>⁵ = 1. On pose <b><i>u</i> = <i>ω</i> + <i>ω</i>⁴</b> et <b><i>v</i> = <i>ω</i>² + <i>ω</i>³</b>. Comme <i>ω</i>⁴ = <i>ω̄</i>, on a <i>u</i> = 2 cos 72° et <i>v</i> = 2 cos 144°. Le but est d’en déduire la valeur exacte de cos 72°.',
  parts:[
   {q:'a) Que vaut <i>u</i> + <i>v</i>&nbsp;?',lab:'u + v =',ans:-1,hint:'Utilise la somme des cinq racines.',why:'u + v = ω + ω² + ω³ + ω⁴ = −1.'},
   {q:'b) Que vaut <i>uv</i>&nbsp;?',lab:'uv =',ans:-1,hint:'Développe (ω + ω⁴)(ω² + ω³) et réduis les exposants avec ω⁵ = 1.',why:'uv = ω³ + ω⁴ + ω⁶ + ω⁷ = ω³ + ω⁴ + ω + ω² = −1.'},
   {q:'c) De quelle équation <i>u</i> et <i>v</i> sont-ils les racines&nbsp;?',opts:['t² − t − 1 = 0','t² + t + 1 = 0','t² + t − 1 = 0','t² − t + 1 = 0'],ans:2,hint:'Deux nombres de somme S et de produit P sont racines de t² − St + P = 0.',why:'S = −1 et P = −1 donnent t² + t − 1 = 0, de racines (−1 ± √5)/2.'},
   {q:'d) Déduis-en cos 72°, arrondi au dix-millième.',lab:'cos 72° =',ans:.309,tol:.00006,hint:'u = 2 cos 72° est la racine positive, car cos 72° > 0 et cos 144° < 0.',why:'u = (−1 + √5)/2, donc cos 72° = (√5 − 1)/4 ≈ 0,3090.'},
   {q:'e) Quel est le côté du pentagone régulier inscrit dans le cercle unité, |<i>ω</i> − 1|&nbsp;? Arrondis au millième.',lab:'côté =',ans:1.176,tol:.0006,hint:'|ω − 1|² = (cos 72° − 1)² + sin² 72° = 2 − 2 cos 72°.',why:'|ω − 1|² = 2 − 2 · 0,3090 = 1,382, donc |ω − 1| ≈ 1,176 (c’est aussi 2 sin 36°).'},
  ],
  sol:'<p>Somme des racines cinquièmes : <i>u</i> + <i>v</i> = −1. Produit : <i>uv</i> = <i>ω</i>³ + <i>ω</i>⁴ + <i>ω</i>⁶ + <i>ω</i>⁷ = <i>ω</i>³ + <i>ω</i>⁴ + <i>ω</i> + <i>ω</i>² = −1.</p><p><i>u</i> et <i>v</i> sont donc les racines de <i>t</i>² + <i>t</i> − 1 = 0, soit (−1 ± √5)/2. Comme <i>u</i> = 2 cos 72° &gt; 0 : <b>cos 72° = (√5 − 1)/4 ≈ 0,3090</b>, et cos 144° = −(1 + √5)/4.</p><p>Le côté du pentagone régulier inscrit vaut |<i>ω</i> − 1| = √(2 − 2 cos 72°) ≈ 1,176. On retrouve sin 18° = cos 72° : les calculs trigonométriques et complexes se rejoignent.</p>'},
]},

/* ===================== 6. Polynômes ===================== */
{subj:'an2', sem:'pri', id:'an2-polynomes', h:'Polynômes réels et complexes', p:'Division euclidienne, racines, et factorisation sur ℂ et sur ℝ.', steps:[
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
 {kind:'Problème',h:'Factoriser un polynôme de degré 3',
  p:'On veut factoriser complètement <b><i>P</i>(<i>x</i>) = <i>x</i>³ − 3<i>x</i>² + 4<i>x</i> − 2</b>, sur ℝ puis sur ℂ. Méthode : chercher une racine évidente parmi les petits entiers, diviser, puis étudier le trinôme restant.',
  parts:[
   {q:'a) Quelle est la racine évidente entière de <i>P</i>&nbsp;?',lab:'x =',ans:1,hint:'Une racine entière divise le terme constant −2 : essaie ±1 et ±2.',why:'P(1) = 1 − 3 + 4 − 2 = 0. (P(2) = 2, P(−1) = −10.)'},
   {q:'b) Quel est le quotient de <i>P</i> par <i>x</i> − 1&nbsp;?',opts:['x² − 2x − 2','x² + 2x + 2','x² − 2x + 2','x² − 3x + 4'],ans:2,hint:'Pose la division ou identifie (x − 1)(x² + bx + c) avec P.',why:'(x − 1)(x² − 2x + 2) = x³ − 2x² + 2x − x² + 2x − 2 = x³ − 3x² + 4x − 2.'},
   {q:'c) Quel est le discriminant du quotient&nbsp;?',lab:'Δ =',ans:-4,hint:'Δ = b² − 4ac.',why:'Δ = 4 − 8 = −4 < 0 : le trinôme est irréductible sur ℝ.'},
   {q:'d) Quelle est la factorisation sur ℂ&nbsp;?',opts:['(x − 1)(x − 1 − i)(x − 1 + i)','(x − 1)(x − 2i)(x + 2i)','(x + 1)(x − 1 − i)(x − 1 + i)','(x − 1)(x − i)(x + i)'],ans:0,hint:'Les racines du trinôme sont (2 ± √Δ)/2 avec √−4 = 2i.',why:'x² − 2x + 2 a pour racines 1 ± i, donc P = (x − 1)(x − (1 + i))(x − (1 − i)).'},
  ],
  sol:'<p>1 est racine évidente : <i>P</i>(1) = 0, donc <i>x</i> − 1 divise <i>P</i>. La division donne <i>P</i> = (<i>x</i> − 1)(<i>x</i>² − 2<i>x</i> + 2).</p><p>Le trinôme a Δ = −4 &lt; 0 : il est irréductible sur ℝ. <b>Sur ℝ : <i>P</i> = (<i>x</i> − 1)(<i>x</i>² − 2<i>x</i> + 2).</b></p><p>Sur ℂ, ses racines sont 1 ± i, conjuguées comme prévu pour un polynôme réel. <b>Sur ℂ : <i>P</i> = (<i>x</i> − 1)(<i>x</i> − 1 − i)(<i>x</i> − 1 + i).</b> Contrôle : le produit des racines 1 · (1 + i)(1 − i) = 2 vaut bien −(−2)/1.</p>'},
 {kind:'Problème',h:'Factoriser x⁴ + 1 sur ℝ',
  p:'Le polynôme <b><i>x</i>⁴ + 1</b> n’a aucune racine réelle, puisqu’il est toujours ≥ 1. Pourtant, comme tout polynôme réel de degré 4, il se factorise sur ℝ en facteurs de degré au plus 2. On va trouver ces facteurs grâce aux racines complexes.',
  fig:(()=>{ const P=cpl(1.6,1,{step:.5}); P.circ(0,0,1,{c:'var(--muted)',w:1.5,dash:true}); [45,135,225,315].forEach((t,k)=>P.dot(Math.cos(rad(t)),Math.sin(rad(t)),{r:5,c:k===0||k===3?'var(--accent)':'var(--math)'})); P.seg(Math.SQRT1_2,Math.SQRT1_2,Math.SQRT1_2,-Math.SQRT1_2,{c:'var(--accent)',w:1.5,dash:true}).seg(-Math.SQRT1_2,Math.SQRT1_2,-Math.SQRT1_2,-Math.SQRT1_2,{c:'var(--math)',w:1.5,dash:true}); return P.svg(); })(),
  parts:[
   {q:'a) Les racines vérifient <i>z</i>⁴ = −1 = e<sup>iπ</sup>. Quels sont leurs arguments&nbsp;?',opts:['0°, 90°, 180°, 270°','45°, 135°, 225°, 315°','30°, 120°, 210°, 300°','90° et 270° seulement'],ans:1,hint:'4θ = π + 2kπ, donc θ = π/4 + kπ/2.',why:'θ = 45° + k · 90° : 45°, 135°, 225°, 315°. Ce sont les sommets d’un carré sur le cercle unité.'},
   {q:'b) La paire conjuguée e<sup>±iπ/4</sup> donne le facteur <i>x</i>² + <i>px</i> + 1. Que vaut <i>p</i>&nbsp;? Arrondis au millième.',lab:'p =',ans:-1.414,tol:.0006,hint:'(x − z)(x − z̄) = x² − 2 Re(z) x + |z|².',why:'Re(e^(iπ/4)) = √2/2, donc p = −2 · √2/2 = −√2 ≈ −1,414.'},
   {q:'c) Quelle est la factorisation de <i>x</i>⁴ + 1 sur ℝ&nbsp;?',opts:['(x² + 1)²','(x² + x + 1)(x² − x + 1)','(x² + √2x + 1)(x² − √2x + 1)','(x² + i)(x² − i)'],ans:2,hint:'L’autre paire, e^(±3iπ/4), a pour partie réelle −√2/2.',why:'Paire e^(±3iπ/4) : x² + √2x + 1. Donc x⁴ + 1 = (x² + √2x + 1)(x² − √2x + 1).'},
   {q:'d) Quelle astuce permet de vérifier ce résultat sans les complexes&nbsp;?',opts:['x⁴ + 1 = (x² + 1)² − 2x², puis a² − b² = (a − b)(a + b)','x⁴ + 1 = (x + 1)⁴','x⁴ + 1 = (x² − 1)² + 2x², qui est un produit','Le théorème du reste avec x = 1'],ans:0,hint:'Complète le carré : (x² + 1)² = x⁴ + 2x² + 1.',why:'(x² + 1)² − (√2x)² = (x² + 1 − √2x)(x² + 1 + √2x). Une somme de deux carrés se factorise ici car on fait apparaître une différence de carrés.'},
   {q:'e) Calcule la valeur du facteur <i>x</i>² + √2<i>x</i> + 1 en <i>x</i> = 1, arrondie au millième.',lab:'valeur =',ans:3.414,tol:.0006,hint:'Contrôle ensuite que le produit des deux facteurs en 1 vaut 1⁴ + 1 = 2.',why:'2 + √2 ≈ 3,414. Et (2 + √2)(2 − √2) = 4 − 2 = 2 = 1⁴ + 1.'},
  ],
  sol:'<p>Les racines de <i>z</i>⁴ = −1 = e<sup>iπ</sup> sont e<sup>i(π/4 + <i>k</i>π/2)</sup>, aux angles 45°, 135°, 225°, 315°. Aucune n’est réelle.</p><p>On les groupe par paires conjuguées : (<i>x</i> − e<sup>iπ/4</sup>)(<i>x</i> − e<sup>−iπ/4</sup>) = <i>x</i>² − √2<i>x</i> + 1 et (<i>x</i> − e<sup>3iπ/4</sup>)(<i>x</i> − e<sup>−3iπ/4</sup>) = <i>x</i>² + √2<i>x</i> + 1.</p><p>Donc <b><i>x</i>⁴ + 1 = (<i>x</i>² − √2<i>x</i> + 1)(<i>x</i>² + √2<i>x</i> + 1)</b>, deux trinômes de discriminant 2 − 4 = −2 &lt; 0, irréductibles sur ℝ.</p><p>Vérification directe : <i>x</i>⁴ + 1 = (<i>x</i>² + 1)² − 2<i>x</i>², différence de deux carrés.</p>'},
]},

/* ===================== 7. Développements limités ===================== */
{subj:'an2', sem:'pri', id:'an2-dl', h:'Développements limités', p:'Approcher une fonction par un polynôme et contrôler l’erreur.', steps:[
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
 {kind:'Problème',h:'Le pendule et sin x ≈ x',
  p:'Pour un pendule, l’équation exacte contient sin <i>θ</i>. Les physiciens la remplacent par <i>θ</i> pour les petites oscillations. Le DL sin <i>x</i> = <i>x</i> − <i>x</i>³/6 + … et le reste de Lagrange disent jusqu’où c’est raisonnable : pour <i>x</i> &gt; 0, on a <b>0 ≤ <i>x</i> − sin <i>x</i> ≤ <i>x</i>³/6</b>, et l’erreur relative (<i>x</i> − sin <i>x</i>)/<i>x</i> est au plus <i>x</i>²/6.',
  parts:[
   {q:'a) Avec ce majorant, jusqu’à quel angle (en radians) l’erreur relative reste-t-elle sous 1 %&nbsp;? Arrondis au millième.',lab:'x =',unit:'rad',ans:.245,tol:.0006,hint:'Résous x²/6 = 0,01.',why:'x² = 0,06, donc x = √0,06 ≈ 0,245 rad.'},
   {q:'b) Convertis cet angle en degrés et donne le plus grand nombre entier de degrés qui convient.',lab:'angle =',unit:'°',ans:14,hint:'Multiplie par 180/π.',why:'0,2449 · 180/π ≈ 14,03°, donc jusqu’à 14°. Contrôle : à 14°, 1 − sin x/x ≈ 0,99 % ; à 15°, 1,14 %.'},
   {q:'c) On garde le terme suivant : sin <i>x</i> ≈ <i>x</i> − <i>x</i>³/6. Que donne cette approximation pour 30° = π/6&nbsp;? Arrondis à 4 décimales.',lab:'≈',ans:.4997,tol:.00006,hint:'π/6 ≈ 0,5236 et (π/6)³/6 ≈ 0,0239.',why:'0,5236 − 0,0239 ≈ 0,4997, pour une valeur exacte sin 30° = 0,5.'},
   {q:'d) Quel majorant de l’erreur le reste de Lagrange donne-t-il pour c)&nbsp;?',opts:['x³/6 ≈ 2,4·10⁻²','x⁴/24 ≈ 3,1·10⁻³','x⁵/120 ≈ 3,3·10⁻⁴','x⁶/720 ≈ 2,9·10⁻⁵'],ans:2,hint:'Le DL de sin n’a pas de terme en x⁴ : x − x³/6 est aussi le polynôme de Taylor d’ordre 4. Et |sin⁽⁵⁾| ≤ 1.',why:'À l’ordre 4, le reste est sin⁽⁵⁾(ξ) x⁵/5!, majoré par (π/6)⁵/120 ≈ 3,3·10⁻⁴. L’erreur réelle, 3,26·10⁻⁴, est juste en dessous.'},
  ],
  sol:'<p>Lagrange à l’ordre 2 (le terme en <i>x</i>² est nul) : sin <i>x</i> = <i>x</i> − cos(<i>ξ</i>)<i>x</i>³/6, donc 0 ≤ <i>x</i> − sin <i>x</i> ≤ <i>x</i>³/6 pour <i>x</i> ≥ 0.</p><p>Erreur relative ≤ <i>x</i>²/6 &lt; 0,01 ⇔ <i>x</i> &lt; √0,06 ≈ 0,245 rad ≈ 14,0°. L’approximation sin <i>θ</i> ≈ <i>θ</i> du pendule est donc bonne à 1 % près jusqu’à environ 14°.</p><p>Avec un terme de plus, à 30° : <i>x</i> − <i>x</i>³/6 ≈ 0,4997. Comme le polynôme de Taylor d’ordre 3 est aussi celui d’ordre 4, le reste est majoré par <i>x</i>⁵/120 ≈ 3,3·10⁻⁴, et l’erreur réelle vaut 3,26·10⁻⁴.</p>'},
 {kind:'Problème',h:'Calculer √e à 10⁻⁶ près',
  p:'On veut une valeur de √<i>e</i> = e<sup>0,5</sup> garantie à 10⁻⁶ près, avec seulement des additions et des divisions. On utilise Pₙ(<i>x</i>) = 1 + <i>x</i> + <i>x</i>²/2! + … + <i>x</i>ⁿ/n! et le reste de Lagrange : pour 0 &lt; <i>x</i>, <b>|Rₙ(<i>x</i>)| ≤ e<sup><i>x</i></sup>·<i>x</i>ⁿ⁺¹/(n + 1)!</b>. Comme e<sup>0,5</sup> &lt; 2, il suffit que 2 · 0,5ⁿ⁺¹/(n + 1)! &lt; 10⁻⁶.',
  parts:[
   {q:'a) Que vaut ce majorant pour n = 3&nbsp;? Arrondis au dix-millième.',lab:'majorant =',ans:.0052,tol:.00006,hint:'2 · 0,5⁴ / 4!.',why:'2 · 0,0625 / 24 ≈ 0,0052. Il faut beaucoup plus de termes.'},
   {q:'b) Quel est le plus petit n qui garantit une erreur inférieure à 10⁻⁶&nbsp;?',lab:'n =',ans:7,hint:'Calcule 2 · 0,5ⁿ⁺¹/(n + 1)! pour n = 5, 6, 7.',why:'n = 6 : 2 · 0,5⁷/5040 ≈ 3,1·10⁻⁶, trop grand. n = 7 : 2 · 0,5⁸/40 320 ≈ 1,9·10⁻⁷ < 10⁻⁶.'},
   {q:'c) Calcule P₇(0,5), arrondi à 6 décimales.',lab:'P₇(0,5) =',ans:1.648721,tol:.0000006,hint:'Additionne 1 + 0,5 + 0,125 + 0,0208333 + 0,0026042 + 0,0002604 + 0,0000217 + 0,0000016.',why:'P₇(0,5) ≈ 1,6487212, et la vraie valeur √e ≈ 1,6487213 est bien à moins de 10⁻⁶.'},
   {q:'d) Avec la même méthode pour e² (en utilisant e² &lt; 9), quel est le plus petit n qui garantit 10⁻⁶&nbsp;?',lab:'n =',ans:14,hint:'Il faut 9 · 2ⁿ⁺¹/(n + 1)! < 10⁻⁶. Teste n = 13 et n = 14.',why:'n = 13 : 9 · 2¹⁴/14! ≈ 1,7·10⁻⁶. n = 14 : 9 · 2¹⁵/15! ≈ 2,3·10⁻⁷. Il faut n = 14.'},
   {q:'e) Pourquoi faut-il deux fois plus de termes pour e² que pour √e&nbsp;?',opts:['Parce que e² est un nombre irrationnel','Parce que xⁿ⁺¹ grandit avec x, et la factorielle met plus longtemps à l’écraser','Parce que le DL de eˣ n’est valable que pour |x| < 1','Parce que la dérivée de eˣ est eˣ'],ans:1,hint:'Compare 0,5ⁿ⁺¹ et 2ⁿ⁺¹ dans le majorant.',why:'Pour x = 2, le numérateur 2ⁿ⁺¹ croît : (n + 1)! ne l’emporte que pour n plus grand. Le DL converge pour tout x, mais d’autant plus lentement que x est loin de 0.'},
  ],
  sol:'<p>Majorant de Lagrange pour <i>x</i> = 0,5 : 2 · 0,5<sup>n+1</sup>/(n + 1)!. Il vaut 5,2·10⁻³ pour n = 3, 3,1·10⁻⁶ pour n = 6 et 1,9·10⁻⁷ pour n = 7 : <b>n = 7</b> suffit.</p><p>P₇(0,5) = 1 + 0,5 + 0,125 + 0,0208333 + 0,0026042 + 0,0002604 + 0,0000217 + 0,0000016 ≈ <b>1,648721</b>, et √<i>e</i> = 1,6487213…</p><p>Pour e², le majorant 9 · 2<sup>n+1</sup>/(n + 1)! passe sous 10⁻⁶ seulement à <b>n = 14</b>. Le DL de eˣ converge partout, mais d’autant plus lentement que |<i>x</i>| est grand. D’où l’astuce pratique : calculer e² comme (√<i>e</i>)⁴ à partir d’un petit <i>x</i>.</p>'},
]},

/* ===================== 8. ED du 1er ordre ===================== */
{subj:'an2', sem:'pri', id:'an2-ed1', h:'Équations différentielles du 1er ordre', p:'Linéaires, séparables, problèmes de Cauchy, refroidissement et circuit RC.', steps:[
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
 {kind:'Problème',h:'L’heure du décès',
  p:'Un médecin légiste trouve un corps dans une pièce à 20 °C. À 22 h, la température du corps est de 34 °C ; à 23 h, elle est de 30 °C. On admet la loi de Newton <i>T</i>′ = −<i>k</i>(<i>T</i> − 20), donc <i>T</i>(<i>t</i>) = 20 + (<i>T</i>₀ − 20)e<sup>−<i>kt</i></sup>, et qu’au moment du décès la température était de 37 °C.',
  parts:[
   {q:'a) Calcule <i>k</i> (en h⁻¹), arrondi au millième.',lab:'k =',unit:'h⁻¹',ans:.336,tol:.0006,hint:'En une heure, l’écart à 20 °C passe de 14 à 10 : 10 = 14 e^(−k).',why:'e^(−k) = 10/14, donc k = ln(14/10) = ln 1,4 ≈ 0,336 h⁻¹.'},
   {q:'b) Combien de minutes avant 22 h le décès a-t-il eu lieu&nbsp;? Arrondis à la minute.',lab:'durée =',unit:'min',ans:35,tol:1,hint:'Il faut que l’écart passe de 17 °C à 14 °C : 14 = 17 e^(−kt).',why:'t = ln(17/14)/k ≈ 0,1942/0,3365 ≈ 0,577 h ≈ 34,6 min. Le décès date d’environ 21 h 25.'},
   {q:'c) Quelle sera la température du corps à minuit&nbsp;? Arrondis au centième.',lab:'T =',unit:'°C',ans:27.14,tol:.006,hint:'Pars de 23 h : écart 10, encore une heure.',why:'T = 20 + 10 · e^(−k) = 20 + 10 · 10/14 ≈ 27,14 °C.'},
  ],
  sol:'<p>L’écart <i>E</i> = <i>T</i> − 20 vérifie <i>E</i>′ = −<i>kE</i>, donc <i>E</i>(<i>t</i>) = <i>E</i>₀e<sup>−<i>kt</i></sup> : il est multiplié par le même facteur à chaque heure.</p><p>a) De 22 h à 23 h, l’écart passe de 14 à 10 : e<sup>−<i>k</i></sup> = 5/7, <i>k</i> = ln 1,4 ≈ 0,336 h⁻¹.</p><p>b) Au décès, l’écart valait 17. On cherche <i>t</i> avec 17e<sup>−<i>kt</i></sup> = 14 : <i>t</i> = ln(17/14)/ln 1,4 ≈ 0,577 h ≈ 35 min, soit un décès vers 21 h 25.</p><p>c) À minuit, l’écart vaut 10 · 5/7 ≈ 7,14 : <i>T</i> ≈ 27,14 °C.</p>'},
 {kind:'Problème',h:'Une cuve qui se remplit',
  p:'Une cuve contient au départ 100 L d’eau pure. On y verse 3 L/min d’eau salée à 0,2 kg/L, et on soutire 2 L/min du mélange, supposé homogène. Le volume vaut donc <i>V</i>(<i>t</i>) = 100 + <i>t</i> litres. On note <i>Q</i>(<i>t</i>) la masse de sel (en kg) dans la cuve, avec <i>Q</i>(0) = 0. Le sel entre à 0,6 kg/min et sort à la concentration <i>Q</i>/<i>V</i>.',
  parts:[
   {q:'a) Quelle équation différentielle <i>Q</i> vérifie-t-elle&nbsp;?',opts:['Q′ = 0,6 − 2Q/100','Q′ = 0,6 − 3Q/(100 + t)','Q′ = 0,6 − 2Q/(100 + t)','Q′ = 0,2 − 2Q'],ans:2,hint:'Débit sortant de sel = débit de liquide × concentration Q/V, avec V qui change.',why:'Q′ = (sel entrant) − (sel sortant) = 3 · 0,2 − 2 · Q/(100 + t).'},
   {q:'b) Quelles sont les solutions de l’équation homogène Q′ + 2Q/(100 + t) = 0&nbsp;?',opts:['Q = C e^(−2t)','Q = C (100 + t)²','Q = C/(100 + t)²','Q = C/(100 + t)'],ans:2,hint:'Une primitive de a(t) = 2/(100 + t) est A(t) = 2 ln(100 + t). Puis Q = C e^(−A(t)).',why:'e^(−2 ln(100 + t)) = (100 + t)^(−2), donc Q = C/(100 + t)².'},
   {q:'c) Par variation de la constante, on trouve Q(t) = 0,2(100 + t) − 200 000/(100 + t)². Quelle masse de sel y a-t-il au bout de 50 min&nbsp;? Arrondis au centième.',lab:'Q =',unit:'kg',ans:21.11,tol:.006,hint:'Remplace t = 50, donc 100 + t = 150.',why:'Q(50) = 30 − 200 000/22 500 ≈ 30 − 8,89 = 21,11 kg.'},
   {q:'d) Au bout de combien de minutes la concentration atteint-elle 0,1 kg/L&nbsp;? Arrondis au centième.',lab:'t =',unit:'min',ans:25.99,tol:.006,hint:'Q/V = 0,2 − 200 000/(100 + t)³. Résous = 0,1.',why:'(100 + t)³ = 2 000 000, donc 100 + t = 2^(1/3) · 100 ≈ 125,99 et t ≈ 25,99 min.'},
  ],
  sol:'<p>Bilan de sel : <i>Q</i>′ = 0,6 − 2<i>Q</i>/(100 + <i>t</i>), une ED linéaire à coefficient non constant.</p><p>Homogène : <i>A</i>(<i>t</i>) = 2 ln(100 + <i>t</i>), donc <i>Q</i><sub>h</sub> = <i>C</i>/(100 + <i>t</i>)². Variation de la constante : <i>C</i>′(<i>t</i>) = 0,6(100 + <i>t</i>)², d’où <i>C</i>(<i>t</i>) = 0,2(100 + <i>t</i>)³ + <i>K</i>.</p><p><i>Q</i>(<i>t</i>) = 0,2(100 + <i>t</i>) + <i>K</i>/(100 + <i>t</i>)², et <i>Q</i>(0) = 0 donne <i>K</i> = −200 000.</p><p><i>Q</i>(50) ≈ 21,11 kg. La concentration <i>Q</i>/<i>V</i> = 0,2 − 200 000/(100 + <i>t</i>)³ tend vers 0,2 kg/L (celle de l’entrée) et vaut 0,1 kg/L pour <i>t</i> = 100(∛2 − 1) ≈ 25,99 min.</p>'},
]},

/* ===================== 9. ED du 2e ordre ===================== */
{subj:'an2', sem:'pri', id:'an2-ed2', h:'Équations différentielles du 2e ordre', p:'Coefficients constants, équation caractéristique et oscillateur amorti.', steps:[
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
 {kind:'Problème',h:'Une masse sur un ressort amorti',
  p:'Une masse de 1 kg, accrochée à un ressort de raideur 10 N/m, subit un frottement visqueux de coefficient 2 N·s/m. Sa position vérifie <b><i>x</i>″ + 2<i>x</i>′ + 10<i>x</i> = 0</b>. On l’écarte de 0,1 m et on la lâche sans vitesse : <i>x</i>(0) = 0,1 et <i>x</i>′(0) = 0.',
  fig:(()=>{ const P=plane({x:[0,6],y:[-.08,.11],w:320,h:170,grid:false,lx:1}); const f=t=>Math.exp(-t)*(.1*Math.cos(3*t)+.1/3*Math.sin(3*t));
    P.fn(t=>.1054*Math.exp(-t),{c:'var(--muted)',w:1.5,dash:true}).fn(t=>-.1054*Math.exp(-t),{c:'var(--muted)',w:1.5,dash:true}).fn(f,{n:400}).text(5.9,0,'t',{a:'end',dy:-6,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) L’équation caractéristique a pour racines −1 ± <i>β</i>i. Quelle est la pseudo-période 2π/<i>β</i>, en secondes&nbsp;? Arrondis au millième.',lab:'T =',unit:'s',ans:2.094,tol:.0006,hint:'r² + 2r + 10 = 0 : Δ = 4 − 40.',why:'Δ = −36, r = −1 ± 3i, donc β = 3 et T = 2π/3 ≈ 2,094 s.'},
   {q:'b) On écrit <i>x</i> = e<sup>−<i>t</i></sup>(<i>C</i>₁ cos 3<i>t</i> + <i>C</i>₂ sin 3<i>t</i>). Que vaut <i>C</i>₂&nbsp;? Arrondis au dix-millième.',lab:'C₂ =',ans:.0333,tol:.00006,hint:'x(0) = C₁. Puis x′(0) = −C₁ + 3C₂.',why:'C₁ = 0,1 et −0,1 + 3C₂ = 0, donc C₂ = 1/30 ≈ 0,0333.'},
   {q:'c) Quelle est la position à <i>t</i> = 1 s, en mètres&nbsp;? Arrondis au dix-millième.',lab:'x(1) =',unit:'m',ans:-.0347,tol:.00006,hint:'Calcule e^(−1)(0,1 cos 3 + sin 3/30), avec 3 en radians.',why:'cos 3 ≈ −0,98999 et sin 3 ≈ 0,14112 : x(1) ≈ 0,3679 · (−0,09900 + 0,00470) ≈ −0,0347 m.'},
   {q:'d) Par quel facteur l’amplitude est-elle multipliée à chaque pseudo-période&nbsp;? Arrondis au millième.',lab:'facteur =',ans:.123,tol:.0006,hint:'Le facteur e^(−t) est multiplié par e^(−T) quand t augmente de T.',why:'e^(−2π/3) ≈ 0,123 : il ne reste que 12 % de l’amplitude après une oscillation.'},
  ],
  sol:'<p>Équation caractéristique : <i>r</i>² + 2<i>r</i> + 10 = 0, Δ = −36, <i>r</i> = −1 ± 3i. Régime pseudo-périodique : <i>x</i>(<i>t</i>) = e<sup>−<i>t</i></sup>(<i>C</i>₁ cos 3<i>t</i> + <i>C</i>₂ sin 3<i>t</i>).</p><p>Conditions initiales : <i>x</i>(0) = <i>C</i>₁ = 0,1 et <i>x</i>′(0) = −<i>C</i>₁ + 3<i>C</i>₂ = 0, d’où <i>C</i>₂ = 1/30. Donc <b><i>x</i>(<i>t</i>) = e<sup>−<i>t</i></sup>(0,1 cos 3<i>t</i> + (1/30) sin 3<i>t</i>)</b>.</p><p>Pseudo-période 2π/3 ≈ 2,094 s ; <i>x</i>(1) ≈ −0,0347 m ; à chaque pseudo-période, l’amplitude est multipliée par e<sup>−2π/3</sup> ≈ 0,123.</p>'},
 {kind:'Problème',h:'Oscillateur forcé',
  p:'Un oscillateur amorti est entraîné par une force périodique : <b><i>y</i>″ + 2<i>y</i>′ + 5<i>y</i> = 10 cos <i>t</i></b>, avec <i>y</i>(0) = 0 et <i>y</i>′(0) = 0. La solution est la somme d’un régime transitoire (solution homogène, qui s’éteint) et d’un régime permanent (solution particulière, qui oscille au rythme de la force).',
  parts:[
   {q:'a) On cherche <i>y</i><sub>p</sub> = <i>B</i> cos <i>t</i> + <i>D</i> sin <i>t</i>. Que vaut <i>B</i>&nbsp;?',lab:'B =',ans:2,hint:'Calcule y<sub>p</sub>″ = −y<sub>p</sub>, reporte, puis identifie les coefficients de cos t et de sin t : 4B + 2D = 10 et 4D − 2B = 0.',why:'D = B/2, puis 4B + B = 10 donne B = 2 et D = 1.'},
   {q:'b) Quelle est l’amplitude du régime permanent&nbsp;? Arrondis au millième.',lab:'A =',ans:2.236,tol:.0006,hint:'B cos t + D sin t = A cos(t − φ) avec A = √(B² + D²).',why:'A = √(4 + 1) = √5 ≈ 2,236.'},
   {q:'c) La solution homogène est e<sup>−<i>t</i></sup>(<i>C</i>₁ cos 2<i>t</i> + <i>C</i>₂ sin 2<i>t</i>). Avec les conditions initiales, que vaut <i>C</i>₂&nbsp;?',lab:'C₂ =',ans:-1.5,tol:.001,hint:'y(0) = C₁ + B = 0. y′(0) = −C₁ + 2C₂ + D = 0.',why:'C₁ = −2, puis 2 + 2C₂ + 1 = 0, donc C₂ = −3/2.'},
   {q:'d) Que vaut <i>y</i>(3)&nbsp;? Arrondis au centième.',lab:'y(3) =',ans:-1.91,tol:.006,hint:'y(t) = e^(−t)(−2 cos 2t − 1,5 sin 2t) + 2 cos t + sin t, avec les angles en radians.',why:'e^(−3)(−2 cos 6 − 1,5 sin 6) ≈ 0,0498 · (−1,920 + 0,419) ≈ −0,075, et 2 cos 3 + sin 3 ≈ −1,839. Total ≈ −1,91.'},
   {q:'e) Que fait <i>y</i>(<i>t</i>) quand <i>t</i> devient grand&nbsp;?',opts:['Il tend vers 0','Il oscille comme √5 cos(t − φ), quelles que soient les conditions initiales','Son amplitude croît sans limite (résonance)','Il oscille à la pulsation 2 de la solution homogène'],ans:1,hint:'Regarde le facteur e^(−t) de la partie homogène.',why:'La partie homogène est écrasée par e^(−t). Il reste le régime permanent 2 cos t + sin t = √5 cos(t − φ), avec tan φ = 1/2, indépendant des conditions initiales.'},
  ],
  sol:'<p>Solution particulière : avec <i>y</i><sub>p</sub> = <i>B</i> cos <i>t</i> + <i>D</i> sin <i>t</i>, on obtient (4<i>B</i> + 2<i>D</i>) cos <i>t</i> + (4<i>D</i> − 2<i>B</i>) sin <i>t</i> = 10 cos <i>t</i>, donc <i>B</i> = 2 et <i>D</i> = 1. i n’est pas racine caractéristique, il n’y a pas de résonance.</p><p>Homogène : <i>r</i>² + 2<i>r</i> + 5 = 0, <i>r</i> = −1 ± 2i. Solution générale <i>y</i> = e<sup>−<i>t</i></sup>(<i>C</i>₁ cos 2<i>t</i> + <i>C</i>₂ sin 2<i>t</i>) + 2 cos <i>t</i> + sin <i>t</i>.</p><p><i>y</i>(0) = <i>C</i>₁ + 2 = 0 et <i>y</i>′(0) = −<i>C</i>₁ + 2<i>C</i>₂ + 1 = 0 donnent <i>C</i>₁ = −2, <i>C</i>₂ = −3/2.</p><p>Le transitoire disparaît en quelques secondes ; il reste <b>√5 cos(<i>t</i> − <i>φ</i>)</b>, d’amplitude ≈ 2,236 et de déphasage <i>φ</i> = arctan(1/2) ≈ 0,464 rad. <i>y</i>(3) ≈ −1,91.</p>'},
]},
);
})();
