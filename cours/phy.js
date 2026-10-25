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
 {kind:'Méthode',h:'Passer de la position à la vitesse, et retour',p:`<p><b>Quand</b> : on te donne <i>x</i>(<i>t</i>) et on demande une vitesse ou une accélération. Ou bien on te donne l’accélération et on demande où se trouve le mobile.</p><p><b>Pourquoi</b> : <i>v</i> = d<i>x</i>/d<i>t</i> et <i>a</i> = d<i>v</i>/d<i>t</i>. Dans un sens on dérive, dans l’autre on cherche une primitive.</p><p><b>Comment</b> : pour dériver, applique (<i>t</i>ⁿ)′ = <i>n t</i>ⁿ⁻¹ terme par terme. Pour remonter, prends une primitive et fixe la constante avec les <b>conditions initiales</b> <i>v</i>(0) et <i>x</i>(0). Sans elles, le résultat n’est pas unique.</p>`,
  demo:{enonce:'a) Un mobile suit <i>x</i>(<i>t</i>) = 2<i>t</i>³ − 3<i>t</i>² + 1 (unités SI). Calcule <i>v</i> et <i>a</i> à <i>t</i> = 2 s. b) Un autre mobile a une accélération constante <i>a</i> = −2 m/s², avec <i>v</i>(0) = 3 m/s et <i>x</i>(0) = 0. Trouve <i>x</i>(<i>t</i>).',
   etapes:[
    {f:'<i>v</i>(<i>t</i>) = 6<i>t</i>² − 6<i>t</i> et <i>a</i>(<i>t</i>) = 12<i>t</i> − 6',w:'On dérive terme par terme. La constante 1 disparaît.'},
    {f:'<i>v</i>(2) = 24 − 12 = 12 m/s et <i>a</i>(2) = 24 − 6 = 18 m/s²',w:'On remplace <i>t</i> par 2 seulement à la fin, après avoir dérivé.'},
    {f:'<i>v</i>(<i>t</i>) = −2<i>t</i> + <i>C</i>, et <i>v</i>(0) = 3 donne <i>C</i> = 3',w:'Une primitive de −2 est −2<i>t</i> + <i>C</i>. La condition initiale fixe <i>C</i>.'},
    {f:'<i>x</i>(<i>t</i>) = 3<i>t</i> − <i>t</i>² + <i>D</i>, et <i>x</i>(0) = 0 donne <i>D</i> = 0',w:'On recommence avec <i>v</i>(<i>t</i>) = 3 − 2<i>t</i>, puis on utilise <i>x</i>(0).'},
   ],
   conclusion:'<i>x</i>(<i>t</i>) = 3<i>t</i> − <i>t</i>². Vérification : en dérivant deux fois, on retrouve bien <i>a</i> = −2 m/s².'},
  note:'Ne remplace jamais <i>t</i> par une valeur avant de dériver : la dérivée d’un nombre est nulle.'},
 {h:'Dériver une position',p:'Un mobile se déplace sur un axe selon <i>x</i>(<i>t</i>) = 2<i>t</i>² − 3<i>t</i> (x en m, t en s). Quelle est sa vitesse à <i>t</i> = 2 s&nbsp;?',lab:'v =',unit:'m/s',ans:5,
  why:'v(t) = dx/dt = 4t − 3, donc v(2) = 8 − 3 = 5 m/s.'},
 {h:'Remonter à la position',p:'Un mobile a une accélération constante <i>a</i> = 4 m/s², avec <i>v</i>(0) = −2 m/s et <i>x</i>(0) = 1 m. Où se trouve-t-il à <i>t</i> = 3 s&nbsp;?',lab:'x =',unit:'m',ans:13,tol:.01,
  why:'v(t) = −2 + 4t, puis x(t) = 1 − 2t + 2t². À t = 3 s : x = 1 − 6 + 18 = 13 m.'},
 {kind:'Méthode',h:'Les équations du MRUA : laquelle choisir',p:`<p><b>Quand</b> : l’accélération est constante sur un axe (démarrage, freinage régulier, chute libre).</p><p><b>Pourquoi</b> : en intégrant <i>a</i> constante, on obtient <i>v</i> = <i>v</i>₀ + <i>at</i> et <i>x</i> − <i>x</i>₀ = <i>v</i>₀<i>t</i> + ½<i>at</i>². Si on tire <i>t</i> = (<i>v</i> − <i>v</i>₀)/<i>a</i> de la première et qu’on le reporte dans la seconde, <i>t</i> disparaît : <b><i>v</i>² − <i>v</i>₀² = 2<i>a</i>(<i>x</i> − <i>x</i>₀)</b>.</p><p><b>Comment</b> : 1. Convertis tout en SI (km/h ÷ 3,6 donne des m/s). 2. Oriente l’axe dans le sens du mouvement : un freinage a alors <i>a</i> &lt; 0. 3. Fais la liste des grandeurs connues et de l’inconnue, puis prends l’équation qui ne contient <b>que</b> celles-là. Le temps n’est ni donné ni demandé&nbsp;? Prends la relation sans <i>t</i>.</p>`,
  demo:{enonce:'Une moto passe de 36 km/h à 108 km/h sur 200 m, avec une accélération constante. Calcule son accélération, puis la durée de la manœuvre.',
   etapes:[
    {f:'<i>v</i>₀ = 36/3,6 = 10 m/s, <i>v</i> = 108/3,6 = 30 m/s, <i>d</i> = 200 m',w:'Tout en SI d’abord.'},
    {f:'<i>v</i>² − <i>v</i>₀² = 2<i>a d</i> donne <i>a</i> = (900 − 100)/(2 × 200) = 2,0 m/s²',w:'Le temps n’est pas donné : on prend la relation sans <i>t</i>.'},
    {f:'<i>t</i> = (<i>v</i> − <i>v</i>₀)/<i>a</i> = 20/2,0 = 10 s',w:'Maintenant que <i>a</i> est connue, <i>v</i> = <i>v</i>₀ + <i>at</i> donne <i>t</i> directement.'},
    {f:'Contrôle : <i>v</i>₀<i>t</i> + ½<i>at</i>² = 100 + 100 = 200 m',w:'La troisième équation, non utilisée, sert de vérification.'},
   ],
   conclusion:'<i>a</i> = 2,0 m/s² et <i>t</i> = 10 s. Astuce : en MRUA, la distance vaut aussi la vitesse moyenne (<i>v</i>₀ + <i>v</i>)/2 multipliée par la durée, ici 20 × 10 = 200 m.'}},
 {h:'Mouvement rectiligne uniformément accéléré',p:`Si <i>a</i> est constante sur un axe : <b><i>v</i>(<i>t</i>) = <i>v</i>₀ + <i>a t</i></b> et <b><i>x</i>(<i>t</i>) = <i>x</i>₀ + <i>v</i>₀<i>t</i> + ½ <i>a t</i>²</b>. En éliminant <i>t</i> : <b><i>v</i>² − <i>v</i>₀² = 2<i>a</i>(<i>x</i> − <i>x</i>₀)</b>.<br>Une voiture passe de 0 à 100 km/h en 8,0 s, avec une accélération constante. Quelle distance parcourt-elle&nbsp;? Arrondis au mètre.`,
  unit:'m',ans:111.1,tol:.6,why:'v = 100/3,6 = 27,8 m/s, a = 27,8/8 = 3,47 m/s². Alors x = ½·a·t² = ½·3,47·64 ≈ 111 m (c’est aussi la vitesse moyenne 13,9 m/s × 8 s).',
  note:'Pense à convertir en unités SI : 1 m/s = 3,6 km/h.'},
 {kind:'Méthode',h:'La démarche de résolution d’un problème de physique',p:`<p><b>Quand</b> : toujours, dès qu’un énoncé décrit une situation et pose une question.</p><p><b>Pourquoi</b> : la plupart des erreurs viennent d’un système mal choisi, d’un signe ou d’une unité. Une démarche fixe les évite.</p><p><b>Comment</b> : 1. <b>Système</b> : qu’est-ce que j’étudie&nbsp;? 2. <b>Référentiel</b> et <b>repère</b> : origine, axes orientés. 3. <b>Schéma</b> avec les données, converties en SI. 4. <b>Bilan</b> : forces subies, ou nature du mouvement. 5. <b>Loi</b> qui relie les données à l’inconnue. 6. <b>Projection</b> sur les axes. 7. <b>Résolution littérale</b>, puis seulement l’application numérique. 8. <b>Vérification</b> : unité, signe, ordre de grandeur.</p>`,
  demo:{enonce:'On lâche une balle sans vitesse du haut d’une tour de 45 m. On néglige l’air. Combien de temps dure la chute, et à quelle vitesse la balle arrive-t-elle au sol&nbsp;?',
   etapes:[
    {f:'Système : la balle. Référentiel : le sol. Axe <i>y</i> vertical vers le <b>bas</b>, origine au point de départ.',w:'Orienter l’axe dans le sens du mouvement évite les signes moins.'},
    {f:'Données : <i>h</i> = 45 m, <i>v</i>₀ = 0, <i>a</i> = <i>g</i> = 9,81 m/s². C’est un MRUA.',w:'Seul le poids agit : l’accélération vaut <i>g</i>, vers le bas.'},
    {f:'<i>h</i> = ½<i>g t</i>² donne <i>t</i> = √(2<i>h</i>/<i>g</i>) ; <i>v</i>² = 2<i>g h</i> donne <i>v</i> = √(2<i>gh</i>)',w:'On résout en lettres : on voit comment le résultat dépend des données.'},
    {f:'<i>t</i> = √(90/9,81) ≈ 3,03 s et <i>v</i> = √(2 × 9,81 × 45) ≈ 29,7 m/s',w:'L’application numérique vient en dernier.'},
    {f:'Unités : √(m/(m/s²)) = s et √(m²/s²) = m/s. Ordre de grandeur : 30 m/s ≈ 107 km/h, plausible pour 45 m de chute.',w:'Une unité fausse trahit une erreur de formule.'},
   ],
   conclusion:'La formule littérale dit aussi comment le résultat change : <i>t</i> ∝ √<i>h</i>, donc quadrupler la hauteur ne fait que doubler la durée. Ce raisonnement en proportion répond souvent à une question sans aucun calcul.'},
  note:'Lois d’échelle : si une grandeur est proportionnelle à <i>v</i>², multiplier <i>v</i> par <i>k</i> la multiplie par <i>k</i>². +20 % sur <i>v</i>, c’est ×1,2² = ×1,44.'},
 {h:'Le puits',p:'On lâche un caillou sans vitesse dans un puits. Il touche l’eau 2,0 s plus tard (on néglige l’air). Quelle est la profondeur du puits&nbsp;? Arrondis au centième.',lab:'h =',unit:'m',ans:19.62,tol:.011,
  why:'Axe vers le bas, MRUA avec a = g et v₀ = 0 : h = ½gt² = ½ × 9,81 × 2,0² = 19,62 m.'},
 {kind:'Méthode',h:'Découper un mouvement en phases',p:`<p><b>Quand</b> : le mouvement change de nature en cours de route. Il démarre, roule à vitesse constante, puis freine.</p><p><b>Pourquoi</b> : les équations du MRUA ne valent que tant que <i>a</i> reste constante. Chaque phase a son accélération.</p><p><b>Comment</b> : découpe le trajet en phases où <i>a</i> est constante. Résous la première phase. Sa vitesse et sa position finales deviennent les <b>conditions initiales</b> de la suivante. Additionne enfin les distances ou les durées.</p>`,
  demo:{enonce:'Un scooter part du repos, accélère à 2,0 m/s² pendant 5,0 s, puis freine à 2,5 m/s² jusqu’à l’arrêt. Quelle distance totale parcourt-il&nbsp;?',
   etapes:[
    {f:'Phase 1 : <i>v</i>₁ = 0 + 2,0 × 5,0 = 10 m/s et <i>d</i>₁ = ½ × 2,0 × 5,0² = 25 m',w:'Démarrage depuis le repos, avec <i>a</i> = +2,0 m/s².'},
    {f:'Phase 2 : départ à 10 m/s, <i>a</i> = −2,5 m/s², arrivée à 0',w:'La vitesse de fin de phase 1 est la vitesse initiale de la phase 2. Le freinage est négatif sur l’axe du mouvement.'},
    {f:'0 − 10² = 2 × (−2,5) × <i>d</i>₂, donc <i>d</i>₂ = 100/5 = 20 m',w:'La durée n’est pas demandée : relation sans <i>t</i>.'},
    {f:'<i>d</i> = 25 + 20 = 45 m',w:'Les distances des phases s’additionnent.'},
   ],
   conclusion:'45 m au total. Pour une phase à vitesse constante, il suffit d’écrire <i>d</i> = <i>v t</i>.'}},
 {h:'La rame de métro',p:'Une rame de métro part du repos, accélère à 1,2 m/s² pendant 10 s, puis roule à vitesse constante pendant 30 s. Quelle distance a-t-elle parcourue&nbsp;?',unit:'m',ans:420,tol:.5,
  why:'Phase 1 : v = 12 m/s et d₁ = ½ × 1,2 × 10² = 60 m. Phase 2 : d₂ = 12 × 30 = 360 m. Total : 420 m.'},
 {h:'Deux fois plus vite',p:'La distance de freinage d’une voiture vaut <i>v</i>₀²/(2|<i>a</i>|). Si on roule deux fois plus vite, avec le même freinage, la distance de freinage…',
  opts:['double','est multipliée par 4','est multipliée par √2','ne change pas'],ans:1,
  why:'d ∝ v₀² : multiplier v₀ par 2 multiplie d par 2² = 4. À 100 km/h au lieu de 50 km/h, on freine sur 4 fois plus de distance.'},
 {kind:'Méthode',h:'Décomposer un vecteur sur des axes',p:`<p><b>Quand</b> : un vecteur (vitesse, force) est donné par sa norme et un angle, et tu dois travailler sur des axes <i>x</i> et <i>y</i>. Ou l’inverse : tu connais ses composantes et tu veux sa norme et sa direction.</p><p><b>Pourquoi</b> : le vecteur est l’hypoténuse d’un triangle rectangle dont les côtés sont les composantes. Le cosinus donne le côté adjacent à l’angle, le sinus le côté opposé.</p><p><b>Comment</b> : si α est l’angle avec l’axe <i>x</i>, <b><i>v<sub>x</sub></i> = <i>v</i> cos α</b> et <b><i>v<sub>y</sub></i> = <i>v</i> sin α</b>. Retour : <b><i>v</i> = √(<i>v<sub>x</sub></i>² + <i>v<sub>y</sub></i>²)</b> et <b>tan α = <i>v<sub>y</sub></i>/<i>v<sub>x</sub></i></b>. Fixe les signes avec un schéma : si l’axe <i>y</i> monte, une composante dirigée vers le bas est négative.</p>`,
  fig:(()=>{ const P=plane({x:[-1,9.5],y:[-1.2,5.8],grid:false,axes:false,w:280}); const a=rad(30), L=8, cx=L*Math.cos(a), cy=L*Math.sin(a);
    P.arrow(0,0,9.2,0,{c:'var(--muted)',w:1.5,hs:8}).arrow(0,0,0,5.6,{c:'var(--muted)',w:1.5,hs:8}).seg(cx,0,cx,cy,{c:'var(--muted)',w:1,dash:true}).seg(0,cy,cx,cy,{c:'var(--muted)',w:1,dash:true});
    vec(P,0,0,cx,0,'var(--math)','v cos α',{dx:-50,dy:18}); vec(P,0,0,0,cy,'var(--math)','v sin α',{dx:6,dy:-4}); vec(P,0,0,cx,cy,'var(--accent)','v'); P.text(1.7,.2,'α',{c:'var(--muted)'}); return P.svg(); })(),
  demo:{enonce:'a) Un ballon part à 20 m/s sous 30° au-dessus de l’horizontale. Donne ses composantes. b) Une pierre a pour vitesse <i>v<sub>x</sub></i> = 12 m/s et <i>v<sub>y</sub></i> = −9 m/s. Donne sa norme et sa direction.',
   etapes:[
    {f:'<i>v<sub>x</sub></i> = 20 cos 30° ≈ 17,3 m/s et <i>v<sub>y</sub></i> = 20 sin 30° = 10 m/s',w:'L’angle est mesuré depuis l’horizontale : cosinus pour <i>x</i>, sinus pour <i>y</i>.'},
    {f:'Contrôle : √(17,3² + 10²) ≈ 20 m/s',w:'Les composantes doivent redonner la norme.'},
    {f:'<i>v</i> = √(12² + 9²) = √225 = 15 m/s',w:'Pythagore, car les deux composantes sont perpendiculaires.'},
    {f:'tan β = 9/12 = 0,75, donc β ≈ 36,9° sous l’horizontale',w:'On prend les valeurs absolues pour l’angle. Le signe de <i>v<sub>y</sub></i> dit que la vitesse pointe vers le bas.'},
   ],
   conclusion:'Pour l’angle entre deux directions (par exemple une vitesse et une pente), calcule l’angle de chacune avec l’horizontale, puis fais la différence.'}},
 {h:'La direction de la vitesse',p:'Un projectile a pour vitesse <i>v<sub>x</sub></i> = 6,0 m/s et <i>v<sub>y</sub></i> = −8,0 m/s. Quel angle sa vitesse fait-elle avec l’horizontale&nbsp;? Arrondis au dixième de degré.',unit:'°',ans:53.13,tol:.06,
  why:'tan β = 8,0/6,0 ≈ 1,33, donc β ≈ 53,1° sous l’horizontale. Sa norme vaut √(36 + 64) = 10 m/s.'},
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
 {kind:'Méthode',h:'Éliminer le temps : l’équation de la trajectoire',p:`<p><b>Quand</b> : la question porte sur la <b>forme</b> du chemin ou sur un point repéré par sa position (passer au-dessus d’un mur, retomber à une distance donnée), pas sur un instant.</p><p><b>Pourquoi</b> : les équations horaires donnent <i>x</i>(<i>t</i>) et <i>y</i>(<i>t</i>). Si on tire <i>t</i> de l’une et qu’on le reporte dans l’autre, il reste une relation <i>y</i>(<i>x</i>) : c’est la trajectoire.</p><p><b>Comment</b> : de <i>x</i> = <i>v</i>₀ cos α · <i>t</i>, tire <i>t</i> = <i>x</i>/(<i>v</i>₀ cos α). Reporte dans <i>y</i> : <b><i>y</i> = <i>x</i> tan α − <i>g x</i>²/(2<i>v</i>₀² cos² α)</b>, une parabole. Pour la portée, résous <i>y</i> = 0. Pour un sol qui descend avec une pente d’angle β, résous <i>y</i> = −<i>x</i> tan β.</p>`,
  demo:{enonce:'Un ballon est lancé du sol à <i>v</i>₀ = 15 m/s sous α = 45°. Écris sa trajectoire, puis calcule sa hauteur à <i>x</i> = 10 m et sa portée.',
   etapes:[
    {f:'<i>t</i> = <i>x</i>/(15 cos 45°)',w:'On isole <i>t</i> dans l’équation la plus simple, celle de <i>x</i>.'},
    {f:'<i>y</i> = <i>x</i> tan 45° − 9,81 <i>x</i>²/(2 × 225 × 0,5) = <i>x</i> − 0,0436 <i>x</i>²',w:'On reporte <i>t</i> dans <i>y</i>(<i>t</i>), avec cos² 45° = 0,5 et tan 45° = 1.'},
    {f:'<i>y</i>(10) = 10 − 4,36 = 5,64 m',w:'La hauteur à une abscisse donnée se lit directement, sans passer par le temps.'},
    {f:'<i>y</i> = 0 donne <i>x</i>(1 − 0,0436 <i>x</i>) = 0, donc <i>x</i> = 1/0,0436 ≈ 22,9 m',w:'<i>x</i> = 0 est le point de départ. L’autre racine est le point d’arrivée.'},
   ],
   conclusion:'En lettres, <i>y</i> = 0 donne <i>x</i> = 2<i>v</i>₀² sin α cos α/<i>g</i> = <b><i>v</i>₀² sin 2α/<i>g</i></b> : c’est la formule de la portée. Pour viser une portée R, on résout sin 2α = R<i>g</i>/<i>v</i>₀², qui a deux solutions, α et 90° − α.'}},
 {h:'Le mur',p:'Un ballon est frappé depuis le sol à 12 m/s sous 40°. Un mur se dresse à 8,0 m. À quelle hauteur le ballon passe-t-il à l’aplomb du mur&nbsp;? Arrondis au centième.',lab:'y =',unit:'m',ans:2.998,tol:.011,
  why:'y = x tan 40° − gx²/(2v₀² cos² 40°) = 8 × 0,839 − 9,81 × 64/(2 × 144 × 0,587) ≈ 6,71 − 3,71 ≈ 3,00 m.'},
 {h:'Touche la cible',p:'Lancée à <i>v</i>₀ = 15 m/s, la balle doit retomber sur la cible à 20 m (à 0,3 m près). Règle l’angle.',
  params:[{id:'al',l:'Angle α',min:20,max:70,v:45,u:'°'}],
  draw:v=>{ const P=plane({x:[-1,25],y:[-1,11],grid:true,step:5,lab:5}); const s=Math.sin(rad(v.al)), c=Math.cos(rad(v.al)), T=2*15*s/g;
    P.curve(u=>15*c*u,u=>15*s*u-.5*g*u*u,0,T,{c:'var(--accent)',w:3}); P.rect(19.7,0,.6,.5,{fill:'var(--spark)',fo:.9,c:null}).text(20,.5,'cible',{a:'middle',dy:-6,c:'var(--muted)',s:11});
    P.dot(15*c*T,0,{r:5,c:'var(--accent)'}); return P.svg(); },
  info:v=>`Portée : ${fmt(225*Math.sin(rad(2*v.al))/g,2)} m`,
  ok:v=>Math.abs(225*Math.sin(rad(2*v.al))/g-20)<.3,
  why:'Il faut sin 2α = 20·9,81/15² = 0,872, donc 2α ≈ 60,7° ou 119,3°. Les angles α ≈ 30° et α ≈ 60° conviennent tous les deux : tir tendu ou tir en cloche.'},
 {kind:'Méthode',h:'Trouver le sommet et le point d’impact',p:`<p><b>Quand</b> : on demande une hauteur maximale, une durée de vol ou l’endroit où le projectile retombe.</p><p><b>Pourquoi</b> : chaque événement se traduit par une condition simple sur les équations horaires. Au <b>sommet</b>, la vitesse est horizontale : <i>v<sub>y</sub></i> = 0. À l’<b>impact</b>, le point est sur le sol : <i>y</i>(<i>t</i>) = 0 pour un sol plat à l’origine, <i>y</i> = −<i>x</i> tan β pour une pente.</p><p><b>Comment</b> : écris les équations horaires avec les conditions initiales, y compris la hauteur de départ <i>y</i>₀. Traduis l’événement en équation sur <i>t</i>, résous-la, garde la racine positive, puis reporte <i>t</i> dans <i>x</i>(<i>t</i>) ou <i>y</i>(<i>t</i>).</p>`,
  demo:{enonce:'Une balle est lancée depuis 2,0 m de haut à 10 m/s sous 30°. Trouve sa hauteur maximale et la distance horizontale à laquelle elle touche le sol.',
   etapes:[
    {f:'<i>v</i><sub>0x</sub> = 8,66 m/s, <i>v</i><sub>0y</sub> = 5,0 m/s ; <i>x</i> = 8,66 <i>t</i> et <i>y</i> = 2,0 + 5,0 <i>t</i> − 4,905 <i>t</i>²',w:'On décompose <i>v</i>₀, puis on intègre <i>a</i> = (0 ; −<i>g</i>) avec <i>x</i>(0) = 0 et <i>y</i>(0) = 2,0 m.'},
    {f:'Sommet : <i>v<sub>y</sub></i> = 5,0 − 9,81 <i>t</i> = 0, donc <i>t</i> ≈ 0,510 s et <i>y</i> = 2,0 + 5,0²/(2 × 9,81) ≈ 3,27 m',w:'La hauteur gagnée vaut <i>v</i><sub>0y</sub>²/(2<i>g</i>) : c’est la relation sans <i>t</i> sur l’axe vertical, avec <i>v<sub>y</sub></i> = 0 à l’arrivée.'},
    {f:'Impact : 4,905 <i>t</i>² − 5,0 <i>t</i> − 2,0 = 0, donc <i>t</i> = (5,0 + √(25 + 39,24))/9,81 ≈ 1,33 s',w:'On résout <i>y</i>(<i>t</i>) = 0. L’autre racine est négative : elle n’a pas de sens physique.'},
    {f:'<i>x</i> = 8,66 × 1,327 ≈ 11,5 m',w:'On reporte la durée de vol dans <i>x</i>(<i>t</i>).'},
   ],
   conclusion:'Hauteur maximale 3,27 m, impact à 11,5 m. Lancée depuis le sol sur un terrain plat, la balle aurait un vol symétrique : durée totale = 2 × durée de montée.'}},
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
 {kind:'Méthode',h:'Calculer l’accélération dans le repère de Frenet',p:`<p><b>Quand</b> : un mobile suit une courbe et sa vitesse change, ou on demande la norme de son accélération dans un virage.</p><p><b>Pourquoi</b> : les deux composantes ont des causes séparées. <i>a</i>ₜ ne dépend que de la variation de la norme de la vitesse, <i>a</i>ₙ que de la vitesse et du rayon. Comme <i>e</i>ₜ ⟂ <i>e</i>ₙ, on les combine par Pythagore.</p><p><b>Comment</b> : 1. Convertis <i>v</i> en m/s. 2. <i>a</i>ₜ = d<i>v</i>/d<i>t</i> (négative si le mobile freine, nulle si <i>v</i> est constante). 3. <i>a</i>ₙ = <i>v</i>²/R, toujours positive, vers le centre. 4. <b>‖<i>a</i>‖ = √(<i>a</i>ₜ² + <i>a</i>ₙ²)</b>. 5. Si on veut sa direction : tan φ = <i>a</i>ₜ/<i>a</i>ₙ donne l’angle φ entre <i>a</i> et la direction du centre.</p>`,
  demo:{enonce:'Une voiture roule à 54 km/h dans un virage de rayon 90 m et accélère avec d<i>v</i>/d<i>t</i> = 2,0 m/s². Quelle est la norme de son accélération, et dans quelle direction pointe-t-elle&nbsp;?',
   etapes:[
    {f:'<i>v</i> = 54/3,6 = 15 m/s',w:'Toujours en SI avant d’utiliser <i>v</i>²/R.'},
    {f:'<i>a</i>ₜ = 2,0 m/s² et <i>a</i>ₙ = 15²/90 = 2,5 m/s²',w:'Une composante par cause : le changement de norme, puis le virage.'},
    {f:'‖<i>a</i>‖ = √(2,0² + 2,5²) ≈ 3,20 m/s²',w:'Les deux composantes sont perpendiculaires : on ne les additionne pas, on applique Pythagore.'},
    {f:'tan φ = 2,0/2,5 = 0,8, donc φ ≈ 38,7°',w:'L’accélération penche de 38,7° vers l’avant par rapport à la direction du centre.'},
   ],
   conclusion:'‖<i>a</i>‖ ≈ 3,20 m/s². Erreur fréquente : écrire 2,0 + 2,5 = 4,5 m/s², comme si les deux composantes étaient dans la même direction.'}},
 {h:'Le virage',p:'Une voiture roule à 72 km/h dans un virage de rayon 50 m, à vitesse constante. Quelle est son accélération normale&nbsp;?',lab:'aₙ =',unit:'m/s²',ans:8,tol:.01,
  why:'72 km/h = 20 m/s. aₙ = v²/R = 400/50 = 8 m/s², presque g.'},
 {h:'Mouvement circulaire uniforme',p:`Si <i>v</i> est constante, <i>a</i>ₜ = 0 et l’accélération est purement <b>centripète</b> : <b><i>a</i> = <i>v</i>²/R = ω²R</b>, avec la vitesse angulaire <b>ω = <i>v</i>/R</b> (rad/s). Un tour dure la période <b>T = 2π/ω = 2πR/<i>v</i></b>.`,
  opts:['L’accélération est nulle puisque la vitesse est constante','L’accélération est tangente à la trajectoire','L’accélération est dirigée vers le centre du cercle','L’accélération est dirigée vers l’extérieur du cercle'],ans:2,
  why:'La norme de v est constante mais sa direction tourne. Il reste aₙ = v²/R, dirigée vers le centre. L’« effet centrifuge » n’est ressenti que dans le référentiel qui tourne.'},
 {kind:'Méthode',h:'Passer des tours par minute à ω, T et v',p:`<p><b>Quand</b> : une rotation est donnée en tours par minute (tr/min), en tours par seconde, par sa période ou par sa fréquence, et il faut ω, une vitesse ou une accélération.</p><p><b>Pourquoi</b> : toutes les formules utilisent ω en <b>rad/s</b>. Un tour vaut 2π rad, une minute 60 s.</p><p><b>Comment</b> : <b>ω = 2π × (tours par seconde) = 2π × N/60</b> si N est en tr/min. Puis <b>T = 2π/ω</b>, la fréquence <b><i>f</i> = 1/T</b> (Hz), <b><i>v</i> = ωR</b> et <b><i>a</i> = ω²R</b>. Dans l’autre sens : N = 60ω/(2π).</p>`,
  demo:{enonce:'Un disque vinyle tourne à 33 tr/min. Calcule ω, la période, puis la vitesse et l’accélération d’un point situé à 15 cm du centre.',
   etapes:[
    {f:'ω = 2π × 33/60 ≈ 3,46 rad/s',w:'33 tours par minute, c’est 33/60 tour par seconde, et chaque tour vaut 2π rad.'},
    {f:'T = 2π/ω = 60/33 ≈ 1,82 s',w:'La période est la durée d’un tour : 60 s divisées par 33 tours.'},
    {f:'<i>v</i> = ωR = 3,456 × 0,15 ≈ 0,518 m/s',w:'R en mètres.'},
    {f:'<i>a</i> = ω²R = 3,456² × 0,15 ≈ 1,79 m/s²',w:'Mouvement circulaire uniforme : l’accélération est centripète. On retrouve <i>v</i>²/R = 0,518²/0,15.'},
   ],
   conclusion:'ω ≈ 3,46 rad/s, T ≈ 1,82 s, <i>v</i> ≈ 0,52 m/s, <i>a</i> ≈ 1,79 m/s². Tous les points du disque ont le même ω, mais <i>v</i> et <i>a</i> croissent avec R.'}},
 {h:'L’éolienne',p:'Le rotor d’une éolienne tourne à 15 tr/min. Ses pales mesurent 40 m. Quelle est la vitesse du bout d’une pale&nbsp;? Arrondis au dixième.',lab:'v =',unit:'m/s',ans:62.83,tol:.06,
  why:'ω = 2π × 15/60 ≈ 1,571 rad/s, donc v = ωR = 1,571 × 40 ≈ 62,8 m/s, soit environ 226 km/h.'},
 {h:'Règle la vitesse',p:'Sur un cercle de rayon R = 2 m, règle la vitesse pour que l’accélération (centripète) vaille 8 m/s².',
  params:[{id:'v',l:'Vitesse v',min:0,max:6,step:.5,v:2,u:' m/s'}],
  draw:v=>{ const P=plane({x:[-3.6,3.6],y:[-3.6,3.6],grid:false,axes:false,w:260}); const an=v.v**2/2;
    P.circ(0,0,2,{c:'var(--line)',w:3}).dot(0,0,{r:4,c:'var(--muted)'}); P.seg(2-8*.2,-.5,2-8*.2,.5,{c:'var(--spark)',w:2,dash:true}).text(2-8*.2,-.5,'cible',{a:'middle',dy:14,c:'var(--muted)',s:11});
    vec(P,2,0,2,v.v*.4,'var(--accent)','v'); vec(P,2,0,2-an*.2,0,'var(--bad)','a',{dy:16}); P.dot(2,0); return P.svg(); },
  info:v=>`<i>a</i> = <i>v</i>²/R = ${fmt(v.v**2/2)} m/s² (cible : 8 m/s², repère pointillé)`,
  ok:v=>v.v===4, why:'v² = a·R = 8 × 2 = 16, donc v = 4 m/s. Doubler la vitesse quadruple l’accélération centripète.'},
 {h:'Le manège',p:'Un manège fait un tour en 6,0 s. Un enfant est assis à 3,0 m de l’axe. Quelle est son accélération&nbsp;? Arrondis au centième.',unit:'m/s²',ans:3.29,tol:.011,
  why:'ω = 2π/T = 1,047 rad/s, donc a = ω²R = 1,097 × 3 ≈ 3,29 m/s².'},
 {kind:'Méthode',h:'Suivre un mobile le long d’une courbe',p:`<p><b>Quand</b> : on demande une durée, une distance ou une vitesse le long d’une trajectoire circulaire, avec une accélération tangentielle constante (ou nulle).</p><p><b>Pourquoi</b> : on repère le mobile par son <b>abscisse curviligne</b> <i>s</i>, la distance parcourue sur la courbe. Le long de la courbe, <i>v</i> = d<i>s</i>/d<i>t</i> et <i>a</i>ₜ = d<i>v</i>/d<i>t</i> : ce sont les mêmes relations que sur un axe droit. Les équations du MRUA restent donc valables pour <i>s</i>, avec <i>a</i>ₜ à la place de <i>a</i>.</p><p><b>Comment</b> : un arc d’angle θ (en radians) mesure <b><i>s</i> = Rθ</b>. Un tour vaut 2πR, un demi-tour πR, un quart de tour πR/2. Puis <i>v</i> = <i>v</i>₀ + <i>a</i>ₜ<i>t</i>, <i>s</i> = <i>v</i>₀<i>t</i> + ½<i>a</i>ₜ<i>t</i>² et <i>v</i>² − <i>v</i>₀² = 2<i>a</i>ₜ<i>s</i>.</p>`,
  demo:{enonce:'Un train aborde à 10 m/s une courbe de rayon 500 m et accélère avec <i>a</i>ₜ = 0,50 m/s² pendant 20 s. Quelle distance parcourt-il sur la courbe, de quel angle tourne-t-il, et que vaut <i>a</i>ₙ à la fin&nbsp;?',
   etapes:[
    {f:'<i>v</i> = 10 + 0,50 × 20 = 20 m/s',w:'Même équation qu’en ligne droite, le long de la courbe.'},
    {f:'<i>s</i> = 10 × 20 + ½ × 0,50 × 20² = 200 + 100 = 300 m',w:'La distance parcourue est l’abscisse curviligne.'},
    {f:'θ = <i>s</i>/R = 300/500 = 0,60 rad ≈ 34,4°',w:'<i>s</i> = Rθ, avec θ en radians.'},
    {f:'<i>a</i>ₙ = 20²/500 = 0,80 m/s²',w:'La partie normale se calcule avec la vitesse à l’instant voulu.'},
   ],
   conclusion:'300 m parcourus, 34,4° de virage, et <i>a</i>ₙ passe de 0,20 à 0,80 m/s². L’accélération tangentielle, elle, reste 0,50 m/s².'}},
 {h:'Le demi-tour',p:'Une voiture parcourt à vitesse constante 12 m/s un demi-cercle de rayon 30 m. Combien de temps dure le demi-tour&nbsp;? Arrondis au centième.',unit:'s',ans:7.854,tol:.011,
  why:'s = πR = π × 30 ≈ 94,2 m, parcourus à 12 m/s : t = 94,25/12 ≈ 7,85 s.'},
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
 {kind:'Méthode',h:'Dessiner un diagramme des forces',p:`<p><b>Quand</b> : avant toute équation de Newton, dès qu’un énoncé parle de forces, d’équilibre ou d’accélération.</p><p><b>Pourquoi</b> : Newton porte sur les forces exercées <b>sur</b> le système. En oublier une, ou en ajouter une qui n’existe pas, fausse tout le reste.</p><p><b>Comment</b> : 1. Entoure le système. 2. Forces à distance : le poids, vertical vers le bas. 3. Forces de contact : une par objet qui <b>touche</b> le système. Un support donne une réaction normale (perpendiculaire) et un frottement (parallèle, opposé au glissement). Un fil donne une tension le long du fil. 4. Dessine chaque force à son point d’application, avec une longueur qui suggère son intensité. 5. N’ajoute jamais les forces que le système exerce sur les autres, ni une « force du mouvement », ni une « force centrifuge ».</p>`,
  fig:(()=>{ const P=plane({x:[-1,10],y:[-2.4,4.2],grid:false,axes:false,w:300}); const a=rad(30);
    P.seg(-1,0,10,0,{c:'var(--muted)',w:1.5}).rect(3,0,3,.8,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2});
    vec(P,4.5,.4,4.5,-2,'var(--bad)','P',{dy:14}); vec(P,4.2,0,4.2,2.1,'var(--accent)','N',{dx:-18}); vec(P,3,.15,1.2,.15,'var(--spark)','f',{dy:16});
    vec(P,6,.6,6+3*Math.cos(a),.6+3*Math.sin(a),'var(--ok)','T'); P.text(6.9,.6,'30°',{dy:-2,s:11,c:'var(--muted)'}); return P.svg(); })(),
  demo:{enonce:'Un enfant tire un traîneau sur la neige avec une corde inclinée de 30° au-dessus de l’horizontale. Le traîneau glisse vers l’avant. Fais le bilan des forces qui s’exercent sur le traîneau.',
   etapes:[
    {f:'Système : le traîneau et ce qu’il porte.',w:'On ne s’intéresse qu’aux forces qui s’exercent sur lui.'},
    {f:'À distance : le poids <i>P</i>, vertical vers le bas.',w:'La Terre est la seule action à distance ici.'},
    {f:'Contact avec la neige : <i>N</i> perpendiculaire au sol, vers le haut, et le frottement <i>f</i> parallèle au sol, vers l’arrière.',w:'Un support exerce deux composantes : la normale, et le frottement opposé au glissement.'},
    {f:'Contact avec la corde : la tension <i>T</i>, le long de la corde, à 30° au-dessus de l’horizontale.',w:'Un fil ne peut que tirer, et toujours dans sa propre direction.'},
    {f:'Contrôle : 4 forces. Pas de « force de l’enfant » appliquée directement au traîneau.',w:'L’enfant ne touche pas le traîneau : il agit par la corde.'},
   ],
   conclusion:'<i>P</i>, <i>N</i>, <i>f</i> et <i>T</i>. La corde inclinée soulève un peu le traîneau : ici <i>N</i> est plus petite que <i>mg</i>. Seule la projection des forces dira de combien.'}},
 {h:'La balle en vol',p:'Une balle vient de quitter la main du lanceur et monte encore. On néglige l’air. Quelles forces s’exercent sur elle&nbsp;?',
  opts:['Son poids et la force du lancer, qui la fait monter','Son poids seulement','Aucune force, puisqu’elle ne touche rien','Son poids et une force vers le haut qui le compense'],ans:1,
  why:'Après le lâcher, plus rien ne la touche : seule la Terre agit, à distance. Elle monte encore grâce à sa vitesse (c’est l’inertie), pas grâce à une force. Le poids la ralentit.'},
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
 {kind:'Méthode',h:'Décomposer une force sur des axes inclinés',p:`<p><b>Quand</b> : un objet se trouve sur un plan incliné, ou une force fait un angle avec la direction du mouvement.</p><p><b>Pourquoi</b> : on prend un axe <i>x</i> le long de la pente (là où se fait le mouvement) et un axe <i>y</i> perpendiculaire. Alors <i>N</i> est sur <i>y</i>, le frottement sur <i>x</i>, et seul le poids est à décomposer. L’angle entre le poids et la perpendiculaire à la pente vaut α : deux angles dont les côtés sont perpendiculaires deux à deux sont égaux.</p><p><b>Comment</b> : axe <i>x</i> vers le bas de la pente, axe <i>y</i> vers l’extérieur du plan : <b><i>P<sub>x</sub></i> = <i>mg</i> sin α</b> et <b><i>P<sub>y</sub></i> = −<i>mg</i> cos α</b>. Contrôle avec les cas limites : pour α = 0, <i>P<sub>x</sub></i> = 0 ; pour α = 90°, <i>P<sub>x</sub></i> = <i>mg</i>. Une force qui fait un angle θ avec la pente se décompose en <i>F</i> cos θ le long de la pente et <i>F</i> sin θ perpendiculairement.</p>`,
  fig:(()=>{ const P=plane({x:[-1,10],y:[-1.5,6],grid:false,axes:false,w:300}); const a=rad(25), ca=Math.cos(a), sa=Math.sin(a), L=3.2;
    P.poly([[0,0],[9*ca,0],[0,9*sa]],{fill:'var(--line)',fo:.6,c:'var(--muted)',w:1.5}).seg(-1,0,10,0,{c:'var(--muted)',w:1.5});
    const bx=4*ca+sa*.5, by=9*sa-4*sa+ca*.5;
    P.circ(bx,by,.45,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2});
    vec(P,bx,by,bx,by-L,'var(--bad)','P',{dx:-16,dy:10}); vec(P,bx,by,bx+L*sa*ca,by-L*sa*sa,'var(--accent)','mg sin α',{dx:4,dy:4});
    vec(P,bx,by,bx-L*ca*sa,by-L*ca*ca,'var(--math)','mg cos α',{dx:-78,dy:14});
    P.seg(bx+L*sa*ca,by-L*sa*sa,bx,by-L,{c:'var(--muted)',w:1,dash:true}).seg(bx-L*ca*sa,by-L*ca*ca,bx,by-L,{c:'var(--muted)',w:1,dash:true});
    P.text(9*ca-.3,0,'α',{a:'end',dx:-14,dy:-4,c:'var(--muted)'}); return P.svg(); })(),
  demo:{enonce:'Un bloc de 5,0 kg est posé sur un plan incliné à 20°. Calcule les composantes de son poids le long de la pente et perpendiculairement à elle.',
   etapes:[
    {f:'<i>P</i> = <i>mg</i> = 5,0 × 9,81 = 49,05 N',w:'On calcule d’abord la norme.'},
    {f:'Axe <i>x</i> le long de la pente vers le bas, axe <i>y</i> perpendiculaire, vers l’extérieur du plan.',w:'Le mouvement éventuel se fait le long de <i>x</i> : l’accélération n’aura qu’une composante.'},
    {f:'<i>P<sub>x</sub></i> = <i>mg</i> sin 20° ≈ 16,8 N',w:'C’est le côté opposé à l’angle α dans le triangle des forces, d’où le sinus.'},
    {f:'<i>P<sub>y</sub></i> = −<i>mg</i> cos 20° ≈ −46,1 N',w:'C’est le côté adjacent, d’où le cosinus. Il est négatif car il presse le bloc contre le plan.'},
    {f:'Contrôle : √(16,8² + 46,1²) ≈ 49,0 N, et pour α → 0, <i>P<sub>x</sub></i> → 0.',w:'Les composantes redonnent la norme, et le cas limite est juste.'},
   ],
   conclusion:'16,8 N tirent le bloc vers le bas de la pente, 46,1 N le pressent contre le plan. Si on confond sinus et cosinus, le cas limite α = 0 le révèle aussitôt : sur un sol plat, rien ne pousse le long du sol.'}},
 {h:'La composante motrice',p:'Un bloc de 10 kg est posé sur une pente inclinée à 35°. Quelle est la composante de son poids parallèle à la pente&nbsp;? Arrondis au dixième.',unit:'N',ans:56.27,tol:.06,
  why:'P<sub>x</sub> = mg sin 35° = 98,1 × 0,574 ≈ 56,3 N. La composante perpendiculaire vaut mg cos 35° ≈ 80,4 N.'},
 {kind:'Méthode',h:'Projeter la 2e loi de Newton',p:`<p><b>Quand</b> : on cherche une accélération ou une force inconnue (tension, réaction, frottement).</p><p><b>Pourquoi</b> : Σ<i>F</i> = <i>m a</i> est une égalité de vecteurs : elle donne une équation par axe. Si un axe suit l’accélération, l’autre donne une équation d’équilibre, qui fournit souvent <i>N</i>.</p><p><b>Comment</b> : 1. Diagramme des forces. 2. Un axe dans le sens du mouvement, un axe perpendiculaire. 3. Composantes de chaque force, avec leur signe. 4. Axe perpendiculaire : somme = 0. 5. Axe du mouvement : somme = <i>m a</i>. 6. Résolution littérale, puis numérique.</p>`,
  demo:{enonce:'Un skieur de 70 kg descend une pente à 15°. Le coefficient de frottement dynamique vaut μ<sub>d</sub> = 0,10. Quelle est son accélération&nbsp;?',
   etapes:[
    {f:'Forces : poids <i>P</i>, réaction <i>N</i>, frottement <i>f</i> vers le haut de la pente.',w:'Le skieur descend : le frottement s’oppose au glissement.'},
    {f:'Axe <i>x</i> vers le bas de la pente, axe <i>y</i> perpendiculaire.',w:'L’accélération est le long de <i>x</i>.'},
    {f:'Sur <i>y</i> : <i>N</i> − <i>mg</i> cos 15° = 0, donc <i>N</i> = <i>mg</i> cos 15°',w:'Pas de mouvement perpendiculaire à la pente : <i>a<sub>y</sub></i> = 0.'},
    {f:'Sur <i>x</i> : <i>mg</i> sin 15° − μ<sub>d</sub><i>N</i> = <i>m a</i>',w:'Composante motrice du poids moins le frottement <i>f</i> = μ<sub>d</sub><i>N</i>.'},
    {f:'<i>a</i> = <i>g</i>(sin 15° − μ<sub>d</sub> cos 15°) = 9,81 × (0,259 − 0,097) ≈ 1,59 m/s²',w:'La masse se simplifie. On ne remplace par les nombres qu’à la fin.'},
   ],
   conclusion:'<i>a</i> ≈ 1,59 m/s². Unité : <i>g</i> multiplié par un nombre sans dimension donne bien des m/s². Le résultat ne dépend pas de la masse.'}},
 {kind:'Méthode',h:'Frottement : l’objet glisse-t-il&nbsp;?',p:`<p><b>Quand</b> : un objet est poussé, tiré ou posé sur une pente, et l’énoncé ne dit pas s’il bouge.</p><p><b>Pourquoi</b> : le frottement statique s’adapte. Il vaut exactement ce qu’il faut pour empêcher le glissement, jusqu’à un maximum μₛ<i>N</i>. Au-delà, l’objet glisse et le frottement prend la valeur fixe μ<sub>d</sub><i>N</i>.</p><p><b>Comment</b> : 1. Suppose l’objet immobile et calcule le frottement <i>f</i> nécessaire à l’équilibre. 2. Compare-le à μₛ<i>N</i>. 3. Si <i>f</i> ≤ μₛ<i>N</i>, l’hypothèse est juste : l’objet reste immobile avec ce <i>f</i>. 4. Sinon, l’objet glisse : prends <i>f</i> = μ<sub>d</sub><i>N</i> et applique Σ<i>F</i> = <i>m a</i>. Sur une pente sans autre force, l’équilibre exige <i>mg</i> sin α ≤ μₛ<i>mg</i> cos α, soit <b>tan α ≤ μₛ</b>.</p>`,
  demo:{enonce:'Une caisse de 20 kg repose sur un sol horizontal, avec μₛ = 0,40 et μ<sub>d</sub> = 0,30. On la pousse horizontalement avec 60 N, puis avec 120 N. Que se passe-t-il dans chaque cas&nbsp;?',
   etapes:[
    {f:'<i>N</i> = <i>mg</i> = 196,2 N, donc μₛ<i>N</i> = 78,5 N',w:'Verticalement, la caisse est en équilibre.'},
    {f:'60 N : l’équilibre demande <i>f</i> = 60 N ≤ 78,5 N. La caisse reste immobile, avec <i>f</i> = 60 N.',w:'Le frottement statique vaut ce qu’il faut, pas μₛ<i>N</i>.'},
    {f:'120 N : il faudrait <i>f</i> = 120 N &gt; 78,5 N. La caisse glisse.',w:'L’hypothèse d’équilibre est fausse : on passe au frottement dynamique.'},
    {f:'<i>f</i> = μ<sub>d</sub><i>N</i> = 58,9 N, puis <i>a</i> = (120 − 58,9)/20 ≈ 3,06 m/s²',w:'Deuxième loi sur l’axe horizontal.'},
   ],
   conclusion:'À 60 N, rien ne bouge et le frottement vaut 60 N, pas 78,5 N. À 120 N, <i>a</i> ≈ 3,06 m/s². Écrire d’emblée <i>f</i> = μ<i>N</i> sans vérifier que l’objet glisse est l’erreur classique.'}},
 {h:'La caisse résiste-t-elle&nbsp;?',p:'On pousse horizontalement une caisse de 15 kg avec une force de 80 N, sur un sol où μₛ = 0,50 et μ<sub>d</sub> = 0,40. Quelle est son accélération&nbsp;? Arrondis au centième (0 si elle ne bouge pas).',unit:'m/s²',ans:1.409,tol:.011,
  why:'N = 147,2 N et μₛN = 73,6 N &lt; 80 N : la caisse glisse. Alors f = μ<sub>d</sub>N = 58,9 N et a = (80 − 58,9)/15 ≈ 1,41 m/s².'},
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
 {kind:'Pratique',h:'Le bilan des forces',p:`1. Choisis le <b>système</b> et un <b>référentiel</b> galiléen. 2. Fais la liste de <b>toutes</b> les forces extérieures et dessine-les. 3. Écris Σ<i>F</i> = <i>m a</i> et <b>projette</b> sur des axes bien choisis.<br>Une personne de 70 kg est sur un pèse-personne dans un ascenseur qui démarre vers le haut avec <i>a</i> = 1,5 m/s². Quelle force le pèse-personne exerce-t-il sur elle&nbsp;? Arrondis au newton.`,
  fig:(()=>{ const P=plane({x:[-2,2],y:[-2.2,2.6],grid:false,axes:false,w:150});
    P.rect(-1.5,-2,3,4.4,{c:'var(--muted)',w:2}).rect(-.6,-1.8,1.2,.2,{fill:'var(--ink)',fo:.8,c:null}).circ(0,1,.3,{fill:'var(--math)',fo:.4,c:'var(--ink)',w:2}).rect(-.3,-1.6,.6,2.2,{fill:'var(--math)',fo:.4,c:'var(--ink)',w:2});
    vec(P,-.12,-.4,-.12,-1.5,'var(--bad)','P',{dx:-18,dy:10}); vec(P,.12,-1.6,.12,-.2,'var(--accent)','N',{dx:6,dy:10}); vec(P,1.1,-.5,1.1,.6,'var(--spark)','a'); return P.svg(); })(),
  lab:'N =',unit:'N',ans:791.7,tol:.6,why:'Selon l’axe vertical vers le haut : N − mg = ma, donc N = m(g + a) = 70 × 11,31 ≈ 792 N. La balance affiche plus que le poids (687 N).'},
 {kind:'Défi',h:'Tirer une caisse',p:'Une caisse de 4,0 kg est tirée horizontalement par une corde avec une tension de 20 N, sur un sol où μ<sub>d</sub> = 0,30. Quelle est son accélération&nbsp;? Arrondis au centième.',unit:'m/s²',ans:2.057,tol:.011,
  why:'Verticalement N = mg = 39,2 N, donc f = 0,30 × 39,2 = 11,8 N. Horizontalement m a = T − f, d’où a = (20 − 11,77)/4 ≈ 2,06 m/s².'},
 {kind:'Méthode',h:'Plusieurs corps reliés par un fil',p:`<p><b>Quand</b> : deux objets sont reliés par un fil, éventuellement par l’intermédiaire d’une poulie (charge suspendue, wagons attelés, machine d’Atwood).</p><p><b>Pourquoi</b> : un fil tendu qui ne s’allonge pas impose aux deux objets la même norme d’accélération. S’il est sans masse et la poulie idéale, il exerce la même tension <i>T</i> à ses deux bouts.</p><p><b>Comment</b> : 1. Un système par objet, chacun avec son diagramme des forces. 2. Pour chacun, un axe orienté dans le sens du mouvement commun : le fil « tourne » avec la poulie. 3. Newton pour chaque objet : deux équations, deux inconnues <i>a</i> et <i>T</i>. 4. Additionne les équations : <i>T</i> s’élimine. 5. Reporte <i>a</i> pour trouver <i>T</i>.</p>`,
  fig:(()=>{ const P=plane({x:[-.5,8],y:[-4.2,2.4],grid:false,axes:false,w:280});
    P.rect(-.5,-.3,6.5,.3,{fill:'var(--line)',fo:.8,c:'var(--muted)',w:1.5}).rect(1.5,0,1.6,1,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2}).text(2.3,.5,'A',{a:'middle',dy:5});
    P.circ(6.3,.3,.3,{c:'var(--ink)',w:2}).seg(3.1,.6,6.3,.6,{c:'var(--ink)',w:1.5}).seg(6.6,.3,6.6,-2.4,{c:'var(--ink)',w:1.5}).rect(6.1,-3.4,1,1,{fill:'var(--spark)',fo:.5,c:'var(--ink)',w:2}).text(6.6,-2.9,'B',{a:'middle',dy:5});
    vec(P,3.1,1.4,4.6,1.4,'var(--accent)','a',{dy:-2}); vec(P,7.6,-1.6,7.6,-3.1,'var(--accent)','a',{dx:6,dy:8}); return P.svg(); })(),
  demo:{enonce:'Un bloc A de 2,0 kg glisse sans frottement sur une table horizontale. Un fil passant par une poulie au bord de la table le relie à une masse B de 1,0 kg qui pend. Trouve l’accélération et la tension du fil.',
   etapes:[
    {f:'A, sur l’horizontale vers la poulie : <i>T</i> = <i>m</i><sub>A</sub><i>a</i>',w:'Verticalement, <i>N</i> et <i>P</i> se compensent. Seule <i>T</i> tire A.'},
    {f:'B, sur la verticale vers le bas : <i>m</i><sub>B</sub><i>g</i> − <i>T</i> = <i>m</i><sub>B</sub><i>a</i>',w:'Même <i>a</i> pour les deux, car le fil ne s’allonge pas. L’axe de B est orienté vers le bas, dans le sens du mouvement.'},
    {f:'Somme : <i>m</i><sub>B</sub><i>g</i> = (<i>m</i><sub>A</sub> + <i>m</i><sub>B</sub>)<i>a</i>, donc <i>a</i> = 1,0 × 9,81/3,0 = 3,27 m/s²',w:'La tension disparaît en additionnant : c’est une force intérieure au système A + B.'},
    {f:'<i>T</i> = <i>m</i><sub>A</sub><i>a</i> = 2,0 × 3,27 ≈ 6,54 N',w:'On revient à l’équation la plus simple.'},
   ],
   conclusion:'<i>a</i> ≈ 3,27 m/s² et <i>T</i> ≈ 6,54 N. Vérification : <i>T</i> &lt; <i>m</i><sub>B</sub><i>g</i> = 9,81 N, sinon B ne descendrait pas. La tension n’est égale au poids de B que si tout est immobile.'}},
 {h:'La machine d’Atwood',p:'Deux masses de 3,0 kg et 5,0 kg pendent de part et d’autre d’une poulie idéale, reliées par un fil sans masse. Quelle est leur accélération&nbsp;? Arrondis au centième.',lab:'a =',unit:'m/s²',ans:2.4525,tol:.011,
  why:'La masse de 5 kg descend : 5g − T = 5a et T − 3g = 3a. En additionnant, 2g = 8a, donc a = 9,81/4 ≈ 2,45 m/s². Puis T = 3(g + a) ≈ 36,8 N.'},
 {kind:'Méthode',h:'Newton dans un mouvement circulaire',p:`<p><b>Quand</b> : un objet tourne (virage, manège, satellite, pendule conique) et on cherche une force, une vitesse ou un angle.</p><p><b>Pourquoi</b> : en mouvement circulaire uniforme, l’accélération vaut <i>v</i>²/R, vers le centre. La somme des forces doit donc valoir <i>m v</i>²/R vers le centre. Ce n’est pas une force de plus : c’est le rôle que jouent les forces déjà présentes (tension, réaction, frottement, poids).</p><p><b>Comment</b> : 1. Diagramme des forces, sans « force centrifuge ». 2. Si le cercle est horizontal : un axe horizontal vers le centre, un axe vertical. 3. Vers le centre : somme = <i>m v</i>²/R. Verticalement : somme = 0. 4. Si tu obtiens <i>X</i> sin θ = … et <i>X</i> cos θ = …, divise une équation par l’autre : <i>X</i> disparaît et il reste tan θ.</p>`,
  demo:{enonce:'Une bille de masse <i>m</i>, au bout d’un fil de 1,0 m, tourne sur un cercle horizontal. Le fil fait 30° avec la verticale (pendule conique). Quelle est la vitesse de la bille&nbsp;?',
   etapes:[
    {f:'Forces : le poids <i>mg</i> et la tension <i>T</i> le long du fil. Rayon du cercle : <i>r</i> = <i>L</i> sin 30° = 0,50 m.',w:'Le centre du cercle est sur la verticale du point d’attache, à la hauteur de la bille.'},
    {f:'Vertical : <i>T</i> cos 30° = <i>mg</i>',w:'Le cercle est horizontal : aucune accélération verticale.'},
    {f:'Vers le centre : <i>T</i> sin 30° = <i>m v</i>²/<i>r</i>',w:'Seule la composante horizontale de <i>T</i> pointe vers le centre.'},
    {f:'En divisant : tan 30° = <i>v</i>²/(<i>r g</i>), donc <i>v</i> = √(0,50 × 9,81 × 0,577) ≈ 1,68 m/s',w:'<i>T</i> et <i>m</i> disparaissent dans le quotient.'},
   ],
   conclusion:'<i>v</i> ≈ 1,68 m/s, et <i>T</i> = <i>mg</i>/cos 30° ≈ 1,15 <i>mg</i>. Le schéma est le même pour un virage relevé : la réaction normale y joue le rôle de la tension.'}},
 {h:'Le virage plat',p:'Sur une route plate, une voiture prend un virage de rayon 80 m. Le coefficient de frottement statique entre les pneus et la route vaut μₛ = 0,50. Quelle est la vitesse maximale sans déraper&nbsp;? En km/h, arrondie à l’unité.',lab:'v =',unit:'km/h',ans:71.31,tol:.6,
  why:'Le frottement latéral fournit la force centripète : mv²/R ≤ μₛmg, donc v ≤ √(μₛgR) = √(0,50 × 9,81 × 80) ≈ 19,8 m/s ≈ 71 km/h.'},
 {kind:'Méthode',h:'Quand un objet quitte-t-il son support&nbsp;?',p:`<p><b>Quand</b> : un objet est posé sur un support courbe (bosse, haut d’une boucle) ou qui accélère (plateau, ascenseur), et on demande s’il reste en contact.</p><p><b>Pourquoi</b> : un support ne peut que pousser : <b><i>N</i> ≥ 0</b>. Si Newton exige <i>N</i> &lt; 0, c’est que l’objet a décollé.</p><p><b>Comment</b> : 1. Écris Newton dans la direction de <i>N</i>, avec l’accélération connue (<i>v</i>²/R vers le centre pour une courbe, <i>a</i> pour un support qui accélère). 2. Isole <i>N</i>. 3. Le contact cesse quand <i>N</i> = 0 : cela donne la vitesse ou l’accélération limite.</p>`,
  demo:{enonce:'Une voiture passe au sommet d’une bosse arrondie de rayon 20 m. Au-dessus de quelle vitesse décolle-t-elle&nbsp;?',
   etapes:[
    {f:'Au sommet, le centre de courbure est en dessous : l’accélération <i>v</i>²/R pointe vers le bas.',w:'Repère toujours où se trouve le centre.'},
    {f:'Axe vers le bas : <i>mg</i> − <i>N</i> = <i>m v</i>²/R, donc <i>N</i> = <i>m</i>(<i>g</i> − <i>v</i>²/R)',w:'Le poids pointe vers le centre, la réaction s’en éloigne.'},
    {f:'<i>N</i> ≥ 0 impose <i>v</i>² ≤ <i>g</i>R',w:'Le sol ne peut pas retenir la voiture.'},
    {f:'<i>v</i> ≤ √(9,81 × 20) ≈ 14,0 m/s ≈ 50 km/h',w:'Application numérique à la fin.'},
   ],
   conclusion:'Au-delà de 14 m/s, la voiture décolle. Au fond d’un creux, le centre est au-dessus : <i>N</i> = <i>m</i>(<i>g</i> + <i>v</i>²/R), le sol pousse plus fort que le poids.'}},
 {h:'Le cycliste sur la bosse',p:'Un cycliste franchit le sommet d’une bosse de rayon 10 m. Quelle vitesse maximale lui permet de garder le contact avec le sol&nbsp;? Arrondis au centième.',lab:'v =',unit:'m/s',ans:9.905,tol:.011,
  why:'N = m(g − v²/R) ≥ 0 donne v ≤ √(gR) = √(98,1) ≈ 9,90 m/s, environ 36 km/h.'},
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
 {kind:'Méthode',h:'Conserver la quantité de mouvement sur un axe',p:`<p><b>Quand</b> : un choc, un accrochage, une explosion ou un lancer entre objets, sur une durée assez brève pour que les forces extérieures horizontales (frottements) ne comptent pas.</p><p><b>Pourquoi</b> : les forces que les objets exercent l’un sur l’autre sont opposées (3e loi). Elles se compensent dans la somme : la quantité de mouvement totale du système ne change pas.</p><p><b>Comment</b> : 1. Système : <b>tous</b> les objets qui interagissent. 2. Oriente un axe et donne à chaque vitesse son <b>signe</b> : un objet qui va dans l’autre sens a une vitesse négative. 3. Écris <i>p</i><sub>avant</sub> = <i>p</i><sub>après</sub>, soit <i>m</i>₁<i>v</i>₁ + <i>m</i>₂<i>v</i>₂ = <i>m</i>₁<i>v</i>₁′ + <i>m</i>₂<i>v</i>₂′. 4. Résous. Le signe du résultat donne le sens du mouvement.</p>`,
  demo:{enonce:'Deux chariots roulent l’un vers l’autre sur un rail : A (2,0 kg) à 3,0 m/s vers la droite, B (1,0 kg) à 2,0 m/s vers la gauche. Ils s’accrochent. Quelle est leur vitesse commune&nbsp;?',
   etapes:[
    {f:'Axe orienté vers la droite : <i>v</i><sub>A</sub> = +3,0 m/s et <i>v</i><sub>B</sub> = −2,0 m/s',w:'B va vers la gauche : sa vitesse est négative sur cet axe.'},
    {f:'<i>p</i><sub>avant</sub> = 2,0 × 3,0 + 1,0 × (−2,0) = 4,0 kg·m/s',w:'Les quantités de mouvement opposées se retranchent.'},
    {f:'<i>p</i><sub>après</sub> = (2,0 + 1,0) <i>v</i>',w:'Accrochés, ils ont la même vitesse.'},
    {f:'<i>v</i> = 4,0/3,0 ≈ +1,33 m/s',w:'Le signe positif dit que l’ensemble part vers la droite.'},
   ],
   conclusion:'<i>v</i> ≈ 1,33 m/s vers la droite. Oublier le signe de <i>v</i><sub>B</sub> donnerait 8/3 ≈ 2,67 m/s, plus que la vitesse de A : absurde.'}},
 {h:'Le choc frontal',p:'Sur un rail horizontal, un chariot de 4,0 kg à +5,0 m/s percute un chariot de 6,0 kg qui arrive en sens inverse à 5,0 m/s. Ils restent accrochés. Quelle est leur vitesse commune, avec son signe&nbsp;?',lab:'v =',unit:'m/s',ans:-1,tol:.01,
  why:'4,0 × 5,0 + 6,0 × (−5,0) = 10 v, donc v = −10/10 = −1,0 m/s. L’ensemble part dans le sens du chariot le plus lourd.'},
 {kind:'Méthode',h:'L’énergie cinétique dans un choc',p:`<p><b>Quand</b> : on demande si un choc est élastique, ou quelle énergie il dissipe.</p><p><b>Pourquoi</b> : un corps de masse <i>m</i> à la vitesse <i>v</i> porte l’<b>énergie cinétique</b> <b><i>E</i><sub>c</sub> = ½<i>m v</i>²</b>, en joules (J). Elle sera étudiée en détail au chapitre sur l’énergie. Dans un choc, <i>p</i> est conservée, mais <i>E</i><sub>c</sub> ne l’est que si le choc est <b>élastique</b>. Sinon, une partie devient déformation et chaleur.</p><p><b>Comment</b> : 1. Trouve les vitesses après le choc par la conservation de <i>p</i>. 2. Calcule la somme des ½<i>mv</i>² avant, puis après. 3. La différence est l’énergie dissipée. Si elle est nulle, le choc est élastique.</p>`,
  demo:{enonce:'Un chariot de 2,0 kg à 3,0 m/s heurte un chariot de 1,0 kg immobile. Ils s’accrochent. Quelle énergie cinétique est perdue&nbsp;?',
   etapes:[
    {f:'<i>v</i> = 2,0 × 3,0/3,0 = 2,0 m/s',w:'Conservation de la quantité de mouvement d’abord.'},
    {f:'Avant : ½ × 2,0 × 3,0² = 9,0 J',w:'Le chariot immobile n’a pas d’énergie cinétique.'},
    {f:'Après : ½ × 3,0 × 2,0² = 6,0 J',w:'On prend la masse totale et la vitesse commune.'},
    {f:'Perte : 9,0 − 6,0 = 3,0 J, soit un tiers',w:'Cette énergie a servi à déformer l’attelage et à le chauffer.'},
   ],
   conclusion:'3,0 J dissipés. Un choc où les objets restent collés perd toujours de l’énergie cinétique : c’est le cas parfaitement inélastique.'}},
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
 {h:'L’énergie de la collision',p:'Une voiture de 1000 kg roulant à 10 m/s percute une voiture de 1500 kg à l’arrêt. Les deux restent encastrées. Quelle énergie cinétique est dissipée, en kJ&nbsp;?',lab:'E =',unit:'kJ',ans:30,tol:.05,
  why:'v = 10 000/2500 = 4,0 m/s. Avant : ½ × 1000 × 10² = 50 kJ. Après : ½ × 2500 × 4,0² = 20 kJ. Perte : 30 kJ, soit 60 %.'},
 {kind:'Méthode',h:'La force moyenne pendant un choc',p:`<p><b>Quand</b> : on connaît les vitesses avant et après un choc et sa durée, et on demande la force subie.</p><p><b>Pourquoi</b> : la 2e loi s’écrit d<i>p</i>/d<i>t</i> = Σ<i>F</i>. Sur une durée courte Δ<i>t</i>, la force moyenne vaut donc <b><i>F</i> = Δ<i>p</i>/Δ<i>t</i></b>, avec Δ<i>p</i> = <i>m</i>(<i>v</i>′ − <i>v</i>).</p><p><b>Comment</b> : 1. Choisis <b>un seul</b> objet comme système. 2. Oriente un axe, mets les signes sur <i>v</i> et <i>v</i>′. 3. Calcule Δ<i>p</i>, puis divise par Δ<i>t</i>. Le signe de <i>F</i> donne son sens. Par la 3e loi, l’autre objet subit la force opposée.</p>`,
  demo:{enonce:'Une balle de 0,40 kg arrive à 10 m/s perpendiculairement sur un mur et rebondit à 8,0 m/s. Le contact dure 0,020 s. Quelle force moyenne le mur exerce-t-il sur la balle&nbsp;?',
   etapes:[
    {f:'Axe vers le mur : <i>v</i> = +10 m/s et <i>v</i>′ = −8,0 m/s',w:'Après le rebond, la balle repart dans l’autre sens.'},
    {f:'Δ<i>p</i> = 0,40 × (−8,0 − 10) = −7,2 kg·m/s',w:'La variation est plus grande que si la balle s’arrêtait : il faut l’arrêter, puis la relancer.'},
    {f:'<i>F</i> = −7,2/0,020 = −360 N',w:'Le signe moins dit que la force est dirigée à l’opposé du mur.'},
   ],
   conclusion:'360 N, vers l’extérieur du mur, soit environ 90 fois le poids de la balle. Erreur fréquente : oublier le signe de <i>v</i>′ et trouver 0,40 × 2/0,020 = 40 N.'}},
 {h:'Le tir au but',p:'Un footballeur frappe un ballon de 0,45 kg immobile, qui part à 25 m/s. Le contact dure 8,0 ms. Quelle force moyenne le pied exerce-t-il&nbsp;? Arrondis au newton.',lab:'F =',unit:'N',ans:1406.25,tol:1,
  why:'Δp = 0,45 × 25 = 11,25 kg·m/s en 0,0080 s : F = 11,25/0,0080 ≈ 1406 N.'},
 {kind:'Méthode',h:'Choc puis mouvement : quelle loi de conservation&nbsp;?',p:`<p><b>Quand</b> : un choc est suivi d’un mouvement qui monte (pendule, rampe, ressort). C’est le cas du pendule balistique.</p><p><b>Pourquoi</b> : chaque loi ne vaut que dans sa phase. <b>Pendant le choc</b>, bref, les forces intérieures dominent : <i>p</i> est conservée, mais pas <i>E</i><sub>c</sub> (sauf choc élastique). <b>Après le choc</b>, le poids agit pendant longtemps : <i>p</i> n’est plus conservée. En revanche, si seul le poids travaille, l’<b>énergie mécanique</b> <i>E</i><sub>c</sub> + <i>m g h</i> l’est. Le terme <i>m g h</i> est l’<b>énergie potentielle de pesanteur</b>, l’énergie que le corps doit à sa hauteur <i>h</i> ; le chapitre sur l’énergie la justifie.</p><p><b>Comment</b> : 1. Découpe en deux phases. 2. Choc : conservation de <i>p</i>, qui donne la vitesse <i>V</i> juste après. 3. Montée : ½<i>MV</i>² = <i>M g h</i>, donc <b><i>h</i> = <i>V</i>²/(2<i>g</i>)</b>, quelle que soit la masse.</p>`,
  demo:{enonce:'Une boule de pâte de 50 g, lancée à 6,0 m/s, se colle à un chariot de 250 g au repos. Le chariot monte ensuite une rampe sans frottement. De quelle hauteur s’élève-t-il&nbsp;?',
   etapes:[
    {f:'Choc : 0,050 × 6,0 = 0,300 <i>V</i>, donc <i>V</i> = 1,0 m/s',w:'Phase brève : seule la quantité de mouvement est conservée.'},
    {f:'Montée : ½ × 0,300 × 1,0² = 0,300 × 9,81 × <i>h</i>',w:'Après le choc, seul le poids travaille (la rampe ne frotte pas) : l’énergie mécanique est conservée.'},
    {f:'<i>h</i> = <i>V</i>²/(2<i>g</i>) = 1/19,62 ≈ 0,051 m ≈ 5,1 cm',w:'La masse se simplifie.'},
   ],
   conclusion:'5,1 cm. Si on avait écrit directement ½ × 0,050 × 6,0² = 0,300 × <i>g h</i>, on aurait trouvé 31 cm : c’est oublier que le choc mou a dissipé 5/6 de l’énergie cinétique.'}},
 {h:'La pâte et le pendule',p:'Une boule de pâte de 0,10 kg à 8,0 m/s se colle à un bloc de 0,30 kg suspendu à un fil, au repos. De quelle hauteur le bloc s’élève-t-il&nbsp;? Donne-la en cm, arrondie au dixième.',lab:'h =',unit:'cm',ans:20.39,tol:.06,
  why:'Choc : 0,10 × 8,0 = 0,40 V, donc V = 2,0 m/s. Montée : h = V²/(2g) = 4/19,62 ≈ 0,204 m = 20,4 cm.'},
 {h:'Le centre de masse',p:`Pour un système de points, le <b>centre de masse</b> G est la moyenne des positions pondérée par les masses : <b><i>r</i><sub>G</sub> = Σ <i>m</i><sub>i</sub> <i>r</i><sub>i</sub> / Σ <i>m</i><sub>i</sub></b>. Sur une tige légère, c’est le point où elle tient en équilibre.`,
  params:[{id:'m1',l:'Masse m₁ (en x = 0)',min:1,max:5,v:1,u:' kg'},{id:'m2',l:'Masse m₂ (en x = 6 m)',min:1,max:5,v:3,u:' kg'}],
  draw:v=>{ const P=plane({x:[-1,7],y:[-1.4,1.4],grid:false,axes:false,w:300}); const xg=6*v.m2/(v.m1+v.m2);
    P.seg(0,0,6,0,{c:'var(--ink)',w:3}).circ(0,0,.25+.08*v.m1,{fill:'var(--math)',fo:.6,c:'var(--ink)',w:1.5}).circ(6,0,.25+.08*v.m2,{fill:'var(--spark)',fo:.7,c:'var(--ink)',w:1.5});
    P.poly([[xg,-.05],[xg-.3,-.6],[xg+.3,-.6]],{fill:'var(--muted)',fo:.8,c:null}).dot(xg,0,{r:5,c:'var(--bad)'}).text(xg,-.6,'G',{a:'middle',dy:16});
    for(let x=0;x<=6;x+=1) P.text(x,0,fmt(x),{a:'middle',dy:-14,c:'var(--muted)',s:10}); return P.svg(); },
  info:v=>`<i>x</i><sub>G</sub> = (${v.m1}·0 + ${v.m2}·6)/${v.m1+v.m2} = ${fmt(6*v.m2/(v.m1+v.m2))} m`},
 {kind:'Méthode',h:'Calculer un centre de masse',p:`<p><b>Quand</b> : on demande où se trouve le centre de masse d’un ensemble d’objets, d’un objet composé de morceaux simples, ou le point d’équilibre d’une tige chargée.</p><p><b>Pourquoi</b> : G est la moyenne des positions, chaque position comptant autant que sa masse. Un objet homogène et symétrique a son centre de masse sur ses axes de symétrie : au milieu d’une tige, au centre d’un carré.</p><p><b>Comment</b> : 1. Fixe une origine et des axes. 2. Remplace chaque morceau par un point placé en son propre centre de masse, avec toute sa masse. 3. Calcule séparément <b><i>x</i><sub>G</sub> = Σ<i>m</i><sub>i</sub><i>x</i><sub>i</sub>/Σ<i>m</i><sub>i</sub></b> et <b><i>y</i><sub>G</sub> = Σ<i>m</i><sub>i</sub><i>y</i><sub>i</sub>/Σ<i>m</i><sub>i</sub></b>. 4. Vérifie que G est plus près des masses lourdes.</p>`,
  demo:{enonce:'Trois masses sont posées sur un plateau léger : 1,0 kg en (0 ; 0), 2,0 kg en (4 ; 0) et 1,0 kg en (0 ; 4), coordonnées en mètres. Où est le centre de masse&nbsp;?',
   etapes:[
    {f:'Σ<i>m</i> = 1,0 + 2,0 + 1,0 = 4,0 kg',w:'Le dénominateur est la masse totale.'},
    {f:'<i>x</i><sub>G</sub> = (1,0 × 0 + 2,0 × 4 + 1,0 × 0)/4,0 = 2,0 m',w:'Chaque abscisse est pondérée par sa masse.'},
    {f:'<i>y</i><sub>G</sub> = (1,0 × 0 + 2,0 × 0 + 1,0 × 4)/4,0 = 1,0 m',w:'Même calcul, axe par axe.'},
    {f:'G = (2,0 ; 1,0) : plus près de la masse de 2 kg que des deux autres.',w:'Contrôle de vraisemblance.'},
   ],
   conclusion:'G = (2,0 m ; 1,0 m). Pour une plaque en L, on la coupe en deux rectangles, on place la masse de chacun en son centre, et on refait exactement ce calcul.'}},
 {h:'Équilibre la tige',p:'Une masse de 3 kg est en <i>x</i> = 0. Place la masse de 1 kg pour que le centre de masse soit en <i>x</i> = 1 m.',
  params:[{id:'x2',l:'Position de m₂',min:0,max:6,step:.5,v:2,u:' m'}],
  draw:v=>{ const P=plane({x:[-1,7],y:[-1.4,1.4],grid:false,axes:false,w:300}); const xg=v.x2/4;
    P.seg(0,0,Math.max(v.x2,1.2),0,{c:'var(--ink)',w:3}).circ(0,0,.49,{fill:'var(--math)',fo:.6,c:'var(--ink)',w:1.5}).circ(v.x2,0,.33,{fill:'var(--spark)',fo:.7,c:'var(--ink)',w:1.5});
    P.poly([[1,-.05],[.7,-.6],[1.3,-.6]],{fill:'var(--muted)',fo:.8,c:null}).dot(xg,0,{r:5,c:'var(--bad)'}).text(xg,0,'G',{a:'middle',dy:-12}); return P.svg(); },
  info:v=>`<i>x</i><sub>G</sub> = (3·0 + 1·${fmt(v.x2)})/4 = ${fmt(v.x2/4,3)} m (appui en 1 m)`,
  ok:v=>v.x2===4, why:'x<sub>G</sub> = 1·x₂/(3 + 1) = 1 impose x₂ = 4 m. La masse légère doit être 3 fois plus loin de G que la lourde.'},
 {h:'Le centre de masse Terre–Lune',p:'La Lune a une masse 81 fois plus petite que la Terre, et leurs centres sont à 384 000 km l’un de l’autre. À quelle distance du centre de la Terre se trouve le centre de masse du couple&nbsp;? Arrondis au km.',lab:'d =',unit:'km',ans:4682.9,tol:1,
  why:'Origine au centre de la Terre : x<sub>G</sub> = (81m × 0 + m × 384 000)/(82m) = 384 000/82 ≈ 4683 km. C’est à l’intérieur de la Terre, dont le rayon vaut 6371 km.'},
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
 {kind:'Méthode',h:'Identifier ω₀ à partir de l’équation du mouvement',p:`<p><b>Quand</b> : on demande la pulsation, la période ou la fréquence d’un système qui oscille (ressort horizontal ou vertical, pendule, flotteur).</p><p><b>Pourquoi</b> : toute équation de la forme <b><i>x</i>″ + ω₀² <i>x</i> = 0</b> a pour solutions <i>X</i><sub>m</sub> cos(ω₀<i>t</i> + φ). Il suffit donc d’amener l’équation de Newton à cette forme et de lire le coefficient de <i>x</i>.</p><p><b>Comment</b> : 1. Écris Newton sur l’axe du mouvement. 2. S’il reste un terme constant (le poids pour un ressort vertical), change de variable : <i>X</i> = <i>x</i> − <i>x</i><sub>éq</sub>, l’écart à l’équilibre. 3. Divise par le coefficient de <i>x</i>″. 4. Le coefficient de <i>x</i> est ω₀² : prends sa racine. 5. T = 2π/ω₀ et <i>f</i> = 1/T.</p>`,
  demo:{enonce:'Une masse de 0,50 kg est suspendue à un ressort vertical de raideur 50 N/m. On repère sa position par <i>z</i>, l’allongement du ressort, compté vers le bas. Trouve la position d’équilibre et la période des oscillations.',
   etapes:[
    {f:'Newton, axe vers le bas : <i>m z</i>″ = <i>mg</i> − <i>k z</i>',w:'Deux forces : le poids, vers le bas, et le rappel −<i>kz</i>.'},
    {f:'Équilibre (<i>z</i>″ = 0) : <i>z</i><sub>éq</sub> = <i>mg</i>/<i>k</i> = 4,905/50 ≈ 9,8 cm',w:'Le terme constant fixe la position d’équilibre.'},
    {f:'Avec <i>Z</i> = <i>z</i> − <i>z</i><sub>éq</sub> : <i>m Z</i>″ = −<i>k Z</i>, soit <i>Z</i>″ + (<i>k</i>/<i>m</i>) <i>Z</i> = 0',w:'<i>mg</i> − <i>kz</i> = −<i>k</i>(<i>z</i> − <i>z</i><sub>éq</sub>) : le poids disparaît, il ne fait que déplacer l’équilibre.'},
    {f:'ω₀² = 50/0,50 = 100, donc ω₀ = 10 rad/s et T = 2π/10 ≈ 0,63 s',w:'On lit le coefficient de <i>Z</i>.'},
   ],
   conclusion:'Équilibre à 9,8 cm d’allongement, période 0,63 s, la même qu’à l’horizontale. Pour un pendule, θ″ + (<i>g</i>/<i>L</i>)θ = 0 donne de même ω₀ = √(<i>g</i>/<i>L</i>).'},
  note:'Pour mesurer <i>k</i>, on accroche une masse supplémentaire Δ<i>m</i> et on mesure l’allongement supplémentaire Δ<i>x</i> : à l’équilibre, Δ<i>m g</i> = <i>k</i> Δ<i>x</i>.'},
 {h:'Lire la période',p:'Le mouvement d’un objet obéit à l’équation 0,5 <i>x</i>″ + 32 <i>x</i> = 0 (unités SI). Quelle est sa période&nbsp;? Arrondis au centième.',lab:'T =',unit:'s',ans:.7854,tol:.011,
  why:'On divise par 0,5 : x″ + 64 x = 0. Donc ω₀² = 64, ω₀ = 8 rad/s et T = 2π/8 ≈ 0,79 s.'},
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
 {kind:'Méthode',h:'Amplitude et phase à partir des conditions initiales',p:`<p><b>Quand</b> : on connaît la position et la vitesse de départ, et on veut l’amplitude <i>X</i><sub>m</sub> ou l’écriture complète de <i>x</i>(<i>t</i>).</p><p><b>Pourquoi</b> : ω₀ ne dépend que du système, mais <i>X</i><sub>m</sub> et φ dépendent de la façon dont on lance l’oscillation. Avec <i>x</i> = <i>X</i><sub>m</sub> cos(ω₀<i>t</i> + φ), on a <i>v</i> = −<i>X</i><sub>m</sub>ω₀ sin(ω₀<i>t</i> + φ).</p><p><b>Comment</b> : à <i>t</i> = 0 : <i>x</i>₀ = <i>X</i><sub>m</sub> cos φ et <i>v</i>₀ = −<i>X</i><sub>m</sub>ω₀ sin φ. En sommant les carrés : <b><i>X</i><sub>m</sub> = √(<i>x</i>₀² + (<i>v</i>₀/ω₀)²)</b>. Lâché sans vitesse : <i>X</i><sub>m</sub> = |<i>x</i>₀|. Lancé depuis l’équilibre : <i>X</i><sub>m</sub> = |<i>v</i>₀|/ω₀. Puis cos φ = <i>x</i>₀/<i>X</i><sub>m</sub> et sin φ = −<i>v</i>₀/(<i>X</i><sub>m</sub>ω₀) donnent φ.</p>`,
  demo:{enonce:'Un oscillateur de pulsation ω₀ = 10 rad/s part de <i>x</i>₀ = 3,0 cm avec la vitesse <i>v</i>₀ = 0,40 m/s. Trouve <i>X</i><sub>m</sub> et φ.',
   etapes:[
    {f:'<i>v</i>₀/ω₀ = 0,40/10 = 0,040 m',w:'On ramène la vitesse à une longueur pour pouvoir la combiner avec <i>x</i>₀.'},
    {f:'<i>X</i><sub>m</sub> = √(0,030² + 0,040²) = 0,050 m',w:'cos² φ + sin² φ = 1 élimine φ.'},
    {f:'cos φ = 0,030/0,050 = 0,6 et sin φ = −0,40/(0,050 × 10) = −0,8',w:'On utilise les deux pour connaître le signe de φ.'},
    {f:'φ ≈ −53,1° ≈ −0,93 rad',w:'Le cosinus positif et le sinus négatif placent φ entre −90° et 0.'},
   ],
   conclusion:'<i>x</i>(<i>t</i>) = 0,050 cos(10<i>t</i> − 0,93). Contrôle : <i>x</i>(0) = 0,050 × 0,6 = 0,030 m.'}},
 {h:'Lancé depuis l’équilibre',p:'Un oscillateur de pulsation ω₀ = 12 rad/s est lancé depuis sa position d’équilibre avec une vitesse de 0,60 m/s. Quelle est l’amplitude de ses oscillations, en cm&nbsp;?',lab:'Xₘ =',unit:'cm',ans:5,tol:.01,
  why:'x₀ = 0, donc X<sub>m</sub> = v₀/ω₀ = 0,60/12 = 0,050 m = 5,0 cm.'},
 {kind:'Méthode',h:'Vitesse et accélération maximales',p:`<p><b>Quand</b> : on demande la vitesse la plus grande, l’accélération la plus grande, ou la force maximale subie par un objet qui oscille.</p><p><b>Pourquoi</b> : en dérivant <i>x</i> = <i>X</i><sub>m</sub> cos(ω₀<i>t</i> + φ), on obtient une vitesse d’amplitude <i>X</i><sub>m</sub>ω₀ et une accélération <i>x</i>″ = −ω₀²<i>x</i>, d’amplitude <i>X</i><sub>m</sub>ω₀².</p><p><b>Comment</b> : <b><i>v</i><sub>max</sub> = <i>X</i><sub>m</sub>ω₀</b>, atteinte au passage par l’équilibre. <b><i>a</i><sub>max</sub> = <i>X</i><sub>m</sub>ω₀²</b>, atteinte aux extrémités, où la vitesse est nulle. La force maximale vaut <i>m a</i><sub>max</sub>.</p>`,
  demo:{enonce:'Une masse oscille avec une amplitude de 4,0 cm et une pulsation de 5,0 rad/s. Calcule sa vitesse et son accélération maximales.',
   etapes:[
    {f:'<i>v</i><sub>max</sub> = 0,040 × 5,0 = 0,20 m/s',w:'Amplitude en mètres. Cette vitesse est atteinte en <i>x</i> = 0.'},
    {f:'<i>a</i><sub>max</sub> = 0,040 × 5,0² = 1,0 m/s²',w:'Atteinte en <i>x</i> = ±<i>X</i><sub>m</sub>, où le ressort est le plus déformé.'},
    {f:'Unités : m × s⁻¹ = m/s et m × s⁻² = m/s²',w:'ω₀ est en rad/s, et le radian n’a pas de dimension.'},
   ],
   conclusion:'<i>v</i><sub>max</sub> = 0,20 m/s au centre, <i>a</i><sub>max</sub> = 1,0 m/s² aux extrémités. Un objet simplement posé sur un support qui oscille verticalement décolle si l’accélération vers le bas dépasse <i>g</i>.'}},
 {h:'Le haut-parleur',p:'La membrane d’un haut-parleur vibre avec une amplitude de 5,0 cm et une période de 0,50 s. Quelle est son accélération maximale&nbsp;? Arrondis au centième.',lab:'a =',unit:'m/s²',ans:7.896,tol:.011,
  why:'ω₀ = 2π/0,50 ≈ 12,57 rad/s, donc a<sub>max</sub> = X<sub>m</sub>ω₀² = 0,050 × 157,9 ≈ 7,90 m/s².'},
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
 {kind:'Méthode',h:'Repérer une résonance',p:`<p><b>Quand</b> : un oscillateur reçoit des impulsions régulières (chocs de la route, poussées sur une balançoire, pas d’une personne qui marche) et on demande quand l’oscillation s’emballe.</p><p><b>Pourquoi</b> : si chaque impulsion arrive au même moment du cycle, elle ajoute de l’énergie à chaque fois et l’amplitude grandit. C’est la <b>résonance</b>, quand la période des impulsions vaut la période propre T₀ = 2π/ω₀. Un <b>amortisseur</b> exerce une force opposée à la vitesse : il transforme l’énergie des oscillations en chaleur et limite l’amplitude.</p><p><b>Comment</b> : 1. Calcule T₀. 2. Exprime la période des impulsions. Pour des obstacles espacés de <i>d</i> franchis à la vitesse <i>v</i>, elle vaut <i>d</i>/<i>v</i>. 3. Égale les deux : <b><i>d</i>/<i>v</i> = T₀</b>, soit <i>v</i> = <i>d</i>/T₀ = <i>d f</i>₀.</p>`,
  demo:{enonce:'Un camion roule sur une piste ondulée dont les bosses sont espacées de 20 m. Sa suspension oscille à la fréquence propre de 1,5 Hz. À quelle vitesse la résonance se produit-elle&nbsp;?',
   etapes:[
    {f:'T₀ = 1/<i>f</i>₀ = 1/1,5 ≈ 0,667 s',w:'La fréquence donne directement la période.'},
    {f:'Durée entre deux bosses : <i>d</i>/<i>v</i>',w:'C’est la période des impulsions reçues par les roues.'},
    {f:'<i>d</i>/<i>v</i> = T₀ donne <i>v</i> = <i>d f</i>₀ = 20 × 1,5 = 30 m/s ≈ 108 km/h',w:'Les impulsions sont alors en phase avec l’oscillation propre.'},
   ],
   conclusion:'Résonance à 108 km/h. Plus lentement ou plus vite, les impulsions arrivent à contretemps et se compensent en partie.'}},
 {h:'Le seau qui déborde',p:'En portant un seau, l’eau y oscille avec une période propre de 0,60 s. Tu fais des pas de 0,75 m, et chaque pas donne une petite secousse. À quelle vitesse de marche l’eau risque-t-elle de déborder&nbsp;?',lab:'v =',unit:'m/s',ans:1.25,tol:.01,
  why:'Résonance quand la durée d’un pas égale la période propre : 0,75/v = 0,60 s, donc v = 1,25 m/s, une marche normale. Changer de rythme suffit à l’éviter.'},
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
 {kind:'Méthode',h:'Calculer une pression : tout en SI d’abord',p:`<p><b>Quand</b> : une force s’appuie sur une surface (pied, pneu, piston, couvercle) et on demande la pression, ou l’inverse.</p><p><b>Pourquoi</b> : la pression est la force par unité de surface, <b><i>p</i> = <i>F</i>/<i>S</i></b>, en pascals (1 Pa = 1 N/m²). Les surfaces sont souvent données en cm² ou en mm² : comme une surface est un carré de longueurs, on convertit avec le <b>carré</b> du facteur.</p><p><b>Comment</b> : 1. Force en newtons (un poids vaut <i>mg</i>). 2. Surface en m² : 1 cm² = (10⁻² m)² = 10⁻⁴ m², 1 mm² = 10⁻⁶ m². Pour un disque, <i>S</i> = π<i>r</i>². 3. <i>p</i> = <i>F</i>/<i>S</i> en Pa. 4. Convertis si besoin : 1 kPa = 10³ Pa, 1 MPa = 10⁶ Pa, 1 bar = 10⁵ Pa.</p>`,
  demo:{enonce:'Une voiture de 1200 kg repose sur ses quatre pneus. Chaque pneu touche le sol sur 150 cm². Quelle pression exerce-t-elle sur le sol, en bar&nbsp;?',
   etapes:[
    {f:'<i>F</i> = <i>mg</i> = 1200 × 9,81 = 11 772 N',w:'La force pressante est le poids.'},
    {f:'<i>S</i> = 4 × 150 cm² = 600 cm² = 600 × 10⁻⁴ m² = 0,060 m²',w:'On convertit avec 10⁻⁴, pas 10⁻².'},
    {f:'<i>p</i> = 11 772/0,060 = 196 200 Pa',w:'Force en N, surface en m² : le résultat est en Pa.'},
    {f:'<i>p</i> ≈ 1,96 bar',w:'1 bar = 10⁵ Pa.'},
   ],
   conclusion:'Environ 2 bar, la même valeur que la surpression de gonflage des pneus. Ce n’est pas un hasard : c’est l’air du pneu qui porte la voiture.'}},
 {h:'La pression',p:`Une force <i>F</i> répartie sur une surface <i>S</i> perpendiculaire exerce la pression <b><i>p</i> = <i>F</i>/<i>S</i></b>. Unité : le <b>pascal</b>, 1 Pa = 1 N/m². On utilise aussi 1 bar = 10⁵ Pa. La pression atmosphérique au niveau de la mer vaut environ 1,013·10⁵ Pa.<br>Une personne de 60 kg se tient sur un seul talon aiguille de 1,0 cm². Quelle pression exerce-t-elle sur le sol, en MPa&nbsp;? Arrondis au centième.`,
  lab:'p =',unit:'MPa',ans:5.886,tol:.011,why:'F = 60 × 9,81 = 589 N et S = 1,0·10⁻⁴ m², donc p = 589/10⁻⁴ ≈ 5,89·10⁶ Pa = 5,89 MPa, environ 58 fois la pression atmosphérique.'},
 {h:'La pointe du clou',p:'On enfonce un clou en appuyant avec une force de 50 N. Sa pointe touche le bois sur 0,20 mm². Quelle pression exerce-t-elle, en MPa&nbsp;?',lab:'p =',unit:'MPa',ans:250,tol:.5,
  why:'S = 0,20 × 10⁻⁶ m², donc p = 50/(0,20·10⁻⁶) = 2,5·10⁸ Pa = 250 MPa. Une petite surface multiplie l’effet d’une même force.'},
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
 {kind:'Méthode',h:'Calculer une pression en profondeur',p:`<p><b>Quand</b> : on demande la pression dans un liquide au repos, l’écart de pression entre deux points, ou la hauteur de liquide dans un tube.</p><p><b>Pourquoi</b> : une couche de liquide de hauteur Δ<i>h</i> pèse sur ce qui est dessous : <b>Δ<i>p</i> = ρ<i>g</i>Δ<i>h</i></b>. Conséquence : dans un <b>même</b> liquide au repos, deux points à la <b>même hauteur</b> ont la même pression.</p><p><b>Comment</b> : 1. Repère la surface libre et la pression qui y règne (souvent <i>p</i>₀ = 101,3 kPa). 2. Mesure <i>h</i> vers le bas depuis cette surface. 3. <i>p</i> = <i>p</i>₀ + ρ<i>g h</i> est la pression <b>absolue</b> ; ρ<i>g h</i> seul est la <b>surpression</b>, ce qu’affiche un manomètre. 4. Avec deux liquides, écris l’égalité des pressions au niveau de leur interface.</p>`,
  demo:{enonce:'a) Quelle est la pression absolue au fond d’un lac de 15 m (eau douce, <i>p</i>₀ = 101,3 kPa)&nbsp;? b) Dans un tube en U contenant de l’eau, on verse 10 cm d’huile (ρ = 800 kg/m³) dans une branche. De combien la surface de l’eau dépasse-t-elle l’interface huile–eau dans l’autre branche&nbsp;?',
   etapes:[
    {f:'a) <i>p</i> = 101 300 + 1000 × 9,81 × 15 = 248 450 Pa ≈ 2,48 bar',w:'Pression en surface plus le poids de la colonne d’eau.'},
    {f:'b) On se place au niveau de l’interface huile–eau, dans les deux branches.',w:'Sous ce niveau, il n’y a que de l’eau, continue d’une branche à l’autre : même hauteur, même pression.'},
    {f:'<i>p</i>₀ + ρ<sub>huile</sub><i>g</i> × 0,10 = <i>p</i>₀ + ρ<sub>eau</sub><i>g h</i>',w:'Côté huile, 10 cm d’huile au-dessus ; côté eau, une hauteur <i>h</i> d’eau.'},
    {f:'<i>h</i> = 800 × 0,10/1000 = 0,080 m = 8,0 cm',w:'<i>p</i>₀ et <i>g</i> se simplifient.'},
   ],
   conclusion:'2,48 bar au fond du lac. Dans le tube en U, l’huile, plus légère, monte plus haut : 10 cm d’huile équilibrent 8 cm d’eau.'}},
 {h:'Le plongeur',p:'Un plongeur descend à 20 m dans l’eau de mer (ρ = 1025 kg/m³), avec <i>p</i>₀ = 1,013 bar en surface. Quelle pression subit-il, en bar&nbsp;? Arrondis au centième.',lab:'p =',unit:'bar',ans:3.024,tol:.011,
  why:'ρgh = 1025 × 9,81 × 20 = 2,01·10⁵ Pa = 2,01 bar. Donc p = 1,013 + 2,011 ≈ 3,02 bar.'},
 {h:'Le tube en U',p:'Dans un tube en U contenant du mercure (ρ = 13 600 kg/m³), on verse de l’eau dans une branche jusqu’à ce que le mercure de l’autre branche dépasse l’interface eau–mercure de 2,0 cm. Quelle hauteur d’eau a-t-on versée, en cm&nbsp;?',lab:'h =',unit:'cm',ans:27.2,tol:.06,
  why:'Au niveau de l’interface, les pressions sont égales : ρ<sub>eau</sub> g h = ρ<sub>Hg</sub> g × 0,020, donc h = 13 600 × 0,020/1000 = 0,272 m = 27,2 cm.'},
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
 {kind:'Méthode',h:'Appliquer Archimède à l’équilibre',p:`<p><b>Quand</b> : un objet flotte, est retenu sous l’eau par un fil, ou est pesé dans l’eau (poids apparent).</p><p><b>Pourquoi</b> : c’est un équilibre des forces comme les autres. La poussée Π = ρ<sub>fluide</sub><i>V</i><sub>imm</sub><i>g</i> s’ajoute simplement au bilan.</p><p><b>Comment</b> : 1. Calcule le poids <i>P</i> = <i>mg</i> = ρ<sub>corps</sub><i>V g</i> et la poussée maximale, objet entièrement immergé. 2. Si Π<sub>max</sub> &gt; <i>P</i>, l’objet laissé libre remonte et flotte : à l’équilibre, Π = <i>P</i>, ce qui donne <i>V</i><sub>imm</sub>. 3. Si l’objet est tenu par un fil ou une main, ajoute cette force <i>T</i> au bilan : ΣF = 0 sur la verticale. 4. Le <b>poids apparent</b> est <i>P</i> − Π, la force qu’il faut pour le retenir.</p>`,
  demo:{enonce:'Un bloc de 0,50 L et de 400 g est plongé dans l’eau douce. Flotte-t-il&nbsp;? Quel volume reste immergé à l’équilibre&nbsp;? Quelle force un fil doit-il exercer pour le maintenir entièrement sous l’eau&nbsp;?',
   etapes:[
    {f:'<i>P</i> = 0,400 × 9,81 = 3,92 N et Π<sub>max</sub> = 1000 × 0,50·10⁻³ × 9,81 = 4,91 N',w:'1 L = 10⁻³ m³. On compare le poids à la poussée maximale.'},
    {f:'Π<sub>max</sub> &gt; <i>P</i> : le bloc flotte.',w:'Sa masse volumique, 800 kg/m³, est inférieure à celle de l’eau.'},
    {f:'Π = <i>P</i> : 1000 × <i>V</i><sub>imm</sub> × 9,81 = 3,92, donc <i>V</i><sub>imm</sub> = 0,40 L',w:'Équilibre en flottaison. On retrouve <i>V</i><sub>imm</sub>/<i>V</i> = 800/1000.'},
    {f:'Sous l’eau : <i>T</i> + <i>P</i> = Π<sub>max</sub>, donc <i>T</i> = 4,91 − 3,92 ≈ 0,98 N, vers le bas',w:'Trois forces : le fil tire vers le bas, la poussée vers le haut.'},
   ],
   conclusion:'Le bloc flotte avec 0,40 L immergé (80 %). Pour l’enfoncer complètement, il faut tirer 0,98 N vers le bas. Le volume émergé vaut <i>V</i> − <i>V</i><sub>imm</sub> = 0,10 L.'}},
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
 {h:'La couronne du roi',p:'Une couronne pèse 10,0 N dans l’air. Suspendue à un dynamomètre et plongée entièrement dans l’eau douce, elle ne pèse plus que 9,4 N. Quelle est sa masse volumique&nbsp;? Arrondis à la centaine de kg/m³.',lab:'ρ =',unit:'kg/m³',ans:16667,tol:60,
  why:'Π = 10,0 − 9,4 = 0,6 N = ρ<sub>eau</sub>Vg, donc V = 0,6/9810 ≈ 6,1·10⁻⁵ m³. Avec m = 10,0/9,81 ≈ 1,02 kg, ρ = m/V = 1000 × 10,0/0,6 ≈ 16 700 kg/m³. L’or pur vaut 19 300 kg/m³ : la couronne n’est pas en or pur.'},
 {kind:'Méthode',h:'La force d’un liquide sur une paroi',p:`<p><b>Quand</b> : on demande la force exercée par un liquide sur une paroi verticale (vanne, hublot, paroi d’aquarium, barrage).</p><p><b>Pourquoi</b> : la pression n’est pas la même partout sur la paroi : elle croît avec la profondeur. On ne peut donc pas écrire <i>F</i> = <i>p S</i> avec une seule valeur de <i>p</i>. Comme la surpression croît <b>linéairement</b>, on peut prendre sa valeur moyenne.</p><p><b>Comment</b> : 1. Si l’air agit des deux côtés, ne garde que la surpression ρ<i>g h</i>, car <i>p</i>₀ se compense. 2. Paroi rectangulaire de largeur <i>L</i>, entre les profondeurs <i>h</i>₁ et <i>h</i>₂ : <b><i>F</i> = ρ<i>g</i> × (<i>h</i>₁ + <i>h</i>₂)/2 × <i>S</i></b>, la surpression au milieu fois la surface. 3. Par une intégrale : <i>F</i> = ∫ ρ<i>g h L</i> d<i>h</i>, ce qui donne ρ<i>gLH</i>²/2 si la paroi part de la surface. 4. Dans ce dernier cas, le profil est un triangle : la force s’applique à <b>H/3 au-dessus du fond</b>.</p>`,
  demo:{enonce:'Une vanne rectangulaire verticale de 1,0 m de large ferme un canal. L’eau monte à 2,0 m contre elle, de l’autre côté il y a de l’air. Quelle force l’eau exerce-t-elle, et où s’applique-t-elle&nbsp;?',
   etapes:[
    {f:'<i>p</i>₀ agit des deux côtés : on ne garde que ρ<i>g h</i>.',w:'Les deux forces dues à l’air s’annulent.'},
    {f:'Surpression : 0 en haut, ρ<i>g H</i> = 19 620 Pa en bas, en moyenne 9810 Pa',w:'La pression croît linéairement : la moyenne est au milieu.'},
    {f:'<i>F</i> = 9810 × (1,0 × 2,0) = 19 620 N ≈ 19,6 kN',w:'On retrouve ρ<i>gLH</i>²/2 = 1000 × 9,81 × 1,0 × 4/2.'},
    {f:'Point d’application : <i>H</i>/3 ≈ 0,67 m au-dessus du fond',w:'Le triangle de pression est plus large en bas : la force s’y applique plus bas que le milieu.'},
   ],
   conclusion:'19,6 kN, environ le poids de 2 t, appliqués à 67 cm du fond. Si l’eau monte deux fois plus haut, la force est multipliée par 4 (<i>F</i> ∝ <i>H</i>²).'}},
 {h:'La paroi de l’aquarium',p:'Un aquarium est rempli d’eau douce sur 50 cm de hauteur. Quelle force l’eau exerce-t-elle sur une paroi verticale de 1,0 m de long&nbsp;? Arrondis au newton.',lab:'F =',unit:'N',ans:1226.25,tol:1,
  why:'F = ρgLH²/2 = 1000 × 9,81 × 1,0 × 0,50²/2 ≈ 1226 N, appliquée à H/3 ≈ 17 cm du fond.'},
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
 {kind:'Méthode',h:'Calculer le travail de chaque force',p:`<p><b>Quand</b> : avant tout bilan d’énergie, ou quand on demande le travail d’une force précise.</p><p><b>Pourquoi</b> : seule la composante de la force le long du déplacement travaille. Le poids a une propriété précieuse : son travail ne dépend que de la différence d’altitude, pas du chemin suivi.</p><p><b>Comment</b> : 1. Fais la liste des forces (diagramme). 2. Pour chacune, repère l’angle θ entre la force et le déplacement : <i>W</i> = <i>F d</i> cos θ. 3. Cas utiles : force perpendiculaire (réaction normale sans frottement), <i>W</i> = 0 ; frottement opposé au déplacement, <b><i>W</i> = −<i>f d</i></b> ; poids, <b><i>W</i> = <i>m g</i>(<i>z</i><sub>A</sub> − <i>z</i><sub>B</sub>)</b>, positif à la descente, négatif à la montée.</p>`,
  demo:{enonce:'Une caisse est tirée sur 8,0 m d’un sol horizontal par une corde inclinée de 30°, avec une tension de 50 N. Le frottement vaut 20 N. Calcule le travail de chaque force.',
   etapes:[
    {f:'Tension : <i>W<sub>T</sub></i> = 50 × 8,0 × cos 30° ≈ 346 J',w:'Angle de 30° entre la corde et le déplacement : travail moteur.'},
    {f:'Frottement : <i>W<sub>f</sub></i> = −20 × 8,0 = −160 J',w:'Il s’oppose au déplacement : θ = 180°, cos θ = −1.'},
    {f:'Poids et réaction normale : <i>W</i> = 0',w:'Les deux sont verticaux, perpendiculaires à un déplacement horizontal.'},
    {f:'Somme : 346 − 160 ≈ 186 J',w:'Ce total servira dans le théorème de l’énergie cinétique.'},
   ],
   conclusion:'Seules la tension et le frottement travaillent. Le travail total, 186 J, fait gagner autant d’énergie cinétique à la caisse.'}},
 {h:'La descente de la skieuse',p:'Une skieuse de 60 kg descend une piste sinueuse, avec 120 m de dénivelé entre le départ et l’arrivée. Quel est le travail de son poids, en kJ&nbsp;? Arrondis au dixième.',lab:'W =',unit:'kJ',ans:70.632,tol:.06,
  why:'W = mg(z<sub>A</sub> − z<sub>B</sub>) = 60 × 9,81 × 120 = 70 632 J ≈ 70,6 kJ, quels que soient les virages.'},
 {h:'Énergie cinétique et théorème',p:`Un corps de masse <i>m</i> à la vitesse <i>v</i> possède l’<b>énergie cinétique</b> <b><i>E</i><sub>c</sub> = ½ <i>m v</i>²</b>. <b>Théorème de l’énergie cinétique</b> : entre deux instants, <b>Δ<i>E</i><sub>c</sub> = Σ <i>W</i></b>, la somme des travaux de toutes les forces.<br>Quel travail total faut-il fournir à une voiture de 1200 kg pour la faire passer de 0 à 20 m/s, en kJ&nbsp;?`,
  lab:'W =',unit:'kJ',ans:240,tol:.5,why:'ΔE<sub>c</sub> = ½ × 1200 × 20² − 0 = 240 000 J = 240 kJ.'},
 {kind:'Méthode',h:'Appliquer le théorème de l’énergie cinétique',p:`<p><b>Quand</b> : on relie une vitesse à une distance (pas à une durée), et les forces sont connues : vitesse en bas d’une pente, distance de freinage, force moyenne de freinage.</p><p><b>Pourquoi</b> : Δ<i>E</i><sub>c</sub> = Σ<i>W</i> évite de calculer l’accélération et le temps. C’est une équation entre nombres, sans projection de vecteurs.</p><p><b>Comment</b> : 1. Système et deux états, A (départ) et B (arrivée). 2. Bilan des forces et travail de chacune entre A et B. 3. ½<i>mv</i><sub>B</sub>² − ½<i>mv</i><sub>A</sub>² = Σ<i>W</i>. 4. Isole l’inconnue.</p>`,
  demo:{enonce:'Un bloc de 2,0 kg part du repos et glisse sur 3,0 m le long d’une pente à 30°, avec μ<sub>d</sub> = 0,20. Quelle est sa vitesse en bas&nbsp;?',
   etapes:[
    {f:'Poids : <i>W<sub>P</sub></i> = <i>mg</i> × 3,0 sin 30° = 2,0 × 9,81 × 1,5 ≈ 29,4 J',w:'Le bloc descend de 3,0 sin 30° = 1,5 m.'},
    {f:'Frottement : <i>f</i> = μ<sub>d</sub><i>mg</i> cos 30° ≈ 3,40 N, donc <i>W<sub>f</sub></i> ≈ −10,2 J',w:'<i>N</i> = <i>mg</i> cos 30° vient de la projection perpendiculaire à la pente.'},
    {f:'Réaction normale : <i>W<sub>N</sub></i> = 0',w:'Elle est perpendiculaire au déplacement.'},
    {f:'½ × 2,0 × <i>v</i>² − 0 = 29,43 − 10,19 ≈ 19,24 J, donc <i>v</i> = √19,24 ≈ 4,39 m/s',w:'Le théorème relie directement la vitesse finale aux travaux.'},
   ],
   conclusion:'<i>v</i> ≈ 4,39 m/s. Sans frottement, on aurait trouvé √(2<i>g</i> × 1,5) ≈ 5,42 m/s.'}},
 {h:'Énergie potentielle et énergie mécanique',p:`Le poids dérive d’une <b>énergie potentielle</b> <b><i>E</i><sub>p</sub> = <i>m g h</i></b>, un ressort de <b>½ <i>k x</i>²</b>. L’énergie mécanique <b><i>E</i><sub>m</sub> = <i>E</i><sub>c</sub> + <i>E</i><sub>p</sub></b> est <b>conservée</b> si seules des forces conservatives travaillent. Une skateuse de 50 kg part sans vitesse du bord d’une rampe de 4,5 m de haut.`,
  params:[{id:'x',l:'Position x',min:-3,max:3,step:.25,v:-2,u:' m'}],
  draw:v=>{ const P=plane({x:[-3.6,6.4],y:[-.6,5.4],grid:false,axes:false,w:300}); const h=.5*v.x*v.x, H=4.5;
    P.fn(x=>.5*x*x,{from:-3.2,to:3.2,c:'var(--ink)',w:3}).seg(-3.6,H,3.4,H,{c:'var(--muted)',w:1,dash:true}).dot(v.x,h+.2,{r:8,c:'var(--math)'});
    P.rect(4.2,0,.8,h,{fill:'var(--spark)',fo:.8,c:null}).rect(5.3,0,.8,H-h,{fill:'var(--accent)',fo:.8,c:null}).seg(4,0,6.3,0,{c:'var(--muted)',w:1.5});
    P.text(4.6,0,'Ep',{a:'middle',dy:16,s:12}).text(5.7,0,'Ec',{a:'middle',dy:16,s:12}); return P.svg(); },
  info:v=>{ const h=.5*v.x*v.x, m=50; return `<i>h</i> = ${fmt(h,2)} m · <i>E</i><sub>p</sub> = ${fmt(m*g*h,0)} J · <i>E</i><sub>c</sub> = ${fmt(m*g*(4.5-h),0)} J · <i>v</i> = ${fmt(Math.sqrt(2*g*(4.5-h)),2)} m/s<br><i>E</i><sub>m</sub> = ${fmt(m*g*4.5,0)} J, constante`; },
  note:'Avec des frottements, <i>E</i><sub>m</sub> diminue : ΔE<sub>m</sub> = <i>W</i><sub>frottements</sub> &lt; 0. L’énergie n’est pas perdue, elle devient de la chaleur.'},
 {kind:'Méthode',h:'Conserver l’énergie mécanique entre deux points',p:`<p><b>Quand</b> : on cherche une vitesse ou une hauteur, et seules des forces conservatives travaillent (poids, ressort). Les autres forces sont absentes ou perpendiculaires au mouvement (réaction sans frottement, tension d’un pendule).</p><p><b>Pourquoi</b> : <i>E</i><sub>m</sub> = <i>E</i><sub>c</sub> + <i>E</i><sub>p</sub> ne change pas. On compare seulement deux états, sans se soucier du chemin entre eux.</p><p><b>Comment</b> : 1. Vérifie qu’aucune force non conservative ne travaille. 2. Choisis une altitude de référence (souvent le point le plus bas, où <i>E</i><sub>p</sub> = 0). 3. Écris <i>E</i><sub>m</sub>(A) = <i>E</i><sub>m</sub>(B) : ½<i>mv</i><sub>A</sub>² + <i>m g z</i><sub>A</sub> (+ ½<i>k x</i><sub>A</sub>²) = même chose en B. 4. Résous.</p>`,
  demo:{enonce:'Un pendule de 1,2 m est lâché sans vitesse quand le fil fait 40° avec la verticale. Quelle est la vitesse de la masse au point le plus bas&nbsp;?',
   etapes:[
    {f:'La tension du fil est toujours perpendiculaire à la vitesse : elle ne travaille pas.',w:'Seul le poids travaille : <i>E</i><sub>m</sub> est conservée.'},
    {f:'Hauteur de départ au-dessus du point bas : <i>h</i> = <i>L</i>(1 − cos 40°) = 1,2 × 0,234 ≈ 0,281 m',w:'La masse est à <i>L</i> cos 40° sous le point d’attache, au lieu de <i>L</i> au point bas.'},
    {f:'<i>m g h</i> + 0 = 0 + ½<i>m v</i>²',w:'Référence d’altitude au point bas. Au départ <i>v</i> = 0, en bas <i>E</i><sub>p</sub> = 0.'},
    {f:'<i>v</i> = √(2<i>g h</i>) = √(2 × 9,81 × 0,281) ≈ 2,35 m/s',w:'La masse se simplifie.'},
   ],
   conclusion:'<i>v</i> ≈ 2,35 m/s. Pour un ressort qui lance un objet, on écrit de même ½<i>kx</i>² = <i>mgh</i> ou ½<i>kx</i>² = ½<i>mv</i>².'}},
 {h:'La chute',p:'Un objet tombe sans vitesse initiale d’une hauteur de 5,0 m. Frottements négligés, quelle est sa vitesse en touchant le sol&nbsp;? Arrondis au centième.',unit:'m/s',ans:9.905,tol:.011,
  why:'mgh = ½mv² donne v = √(2gh) = √(98,1) ≈ 9,90 m/s. La masse ne joue aucun rôle.'},
 {h:'La balançoire',p:'Une balançoire a des chaînes de 2,0 m. On la lâche sans vitesse quand les chaînes font 60° avec la verticale. Quelle est sa vitesse au point le plus bas&nbsp;? Arrondis au centième.',lab:'v =',unit:'m/s',ans:4.429,tol:.011,
  why:'h = L(1 − cos 60°) = 2,0 × 0,5 = 1,0 m, donc v = √(2gh) = √19,62 ≈ 4,43 m/s.'},
 {h:'Le lance-bille',p:'Un ressort de raideur 200 N/m lance verticalement une bille de 100 g. Règle la compression pour que la bille monte de 2 m (à 10 cm près) au-dessus de son point de départ.',
  params:[{id:'x',l:'Compression x',min:5,max:30,v:20,u:' cm'}],
  draw:v=>{ const P=plane({x:[-1.5,3.5],y:[-.6,6.2],grid:false,axes:false,w:220,h:280}); const h=200*(v.x/100)**2/(2*.1*g);
    P.seg(-1.5,0,3.5,0,{c:'var(--muted)',w:1.5}); spring(P,0,0,0,.6,10,.25); P.seg(-.5,2,1.2,2,{c:'var(--spark)',w:2,dash:true}).text(1.3,2,'2 m',{dy:4,c:'var(--muted)',s:12});
    P.seg(0,.7,0,Math.min(h,6)+.1,{c:'var(--line)',w:2,dash:true}).dot(0,Math.min(h,6)+.1,{r:7,c:'var(--math)'}); return P.svg(); },
  info:v=>`½<i>kx</i>² = ${fmt(100*(v.x/100)**2,2)} J → <i>h</i> = <i>kx</i>²/(2<i>mg</i>) = ${fmt(200*(v.x/100)**2/(2*.1*g),2)} m`,
  ok:v=>Math.abs(200*(v.x/100)**2/(2*.1*g)-2)<.1, why:'½kx² = mgh donne x = √(2mgh/k) = √(2 × 0,1 × 9,81 × 2/200) ≈ 0,14 m = 14 cm.'},
 {kind:'Méthode',h:'Bilan d’énergie avec frottements',p:`<p><b>Quand</b> : des frottements travaillent, et on demande l’énergie dissipée, la force de frottement moyenne ou la distance parcourue avant l’arrêt.</p><p><b>Pourquoi</b> : l’énergie mécanique n’est plus conservée, mais sa variation est connue : <b>Δ<i>E</i><sub>m</sub> = <i>W</i><sub>frottements</sub></b>. Ce qui manque à l’arrivée est devenu de la chaleur.</p><p><b>Comment</b> : 1. Calcule <i>E</i><sub>m</sub> = ½<i>mv</i>² + <i>mgz</i> au départ et à l’arrivée. 2. L’énergie dissipée vaut <i>E</i><sub>m</sub>(A) − <i>E</i><sub>m</sub>(B). 3. Si le frottement <i>f</i> est constant sur une distance <i>d</i>, cette énergie vaut <i>f d</i> : on en tire <i>f</i> ou <i>d</i>.</p>`,
  demo:{enonce:'Un skieur de 70 kg part sans vitesse et descend de 50 m de dénivelé. Il arrive en bas à 25 m/s. Quelle énergie a été dissipée&nbsp;? Si la piste mesure 400 m, quelle est la force de frottement moyenne&nbsp;?',
   etapes:[
    {f:'<i>E</i><sub>m</sub>(A) = 70 × 9,81 × 50 = 34 335 J',w:'Référence d’altitude en bas, vitesse nulle au départ.'},
    {f:'<i>E</i><sub>m</sub>(B) = ½ × 70 × 25² = 21 875 J',w:'En bas, il ne reste que de l’énergie cinétique.'},
    {f:'Énergie dissipée : 34 335 − 21 875 = 12 460 J ≈ 12,5 kJ',w:'Δ<i>E</i><sub>m</sub> = −12 460 J = <i>W</i><sub>frottements</sub>.'},
    {f:'<i>f</i> = 12 460/400 ≈ 31 N',w:'Pour un frottement moyen sur toute la piste, <i>W</i> = −<i>f d</i>.'},
   ],
   conclusion:'12,5 kJ dissipés, environ 36 % de l’énergie de départ, avec une force moyenne de 31 N (air et neige).'}},
 {h:'La luge',p:'Une luge de 10 kg part sans vitesse en haut d’une pente de 12 m de dénivelé et arrive en bas à 12 m/s. Quelle énergie les frottements ont-ils dissipée&nbsp;? Arrondis au joule.',unit:'J',ans:457.2,tol:.6,
  why:'E<sub>m</sub> au départ : 10 × 9,81 × 12 = 1177,2 J. En bas : ½ × 10 × 12² = 720 J. Dissipé : 457 J.'},
 {h:'La puissance',p:`La <b>puissance</b> mesure le travail fourni par unité de temps : <b><i>P</i> = <i>W</i>/Δ<i>t</i></b>, en watts (1 W = 1 J/s). Pour une force appliquée à un corps de vitesse <i>v</i>, la puissance instantanée vaut <b><i>P</i> = <i>F</i>·<i>v</i></b>.<br>Une grue soulève à vitesse constante une charge de 500 kg sur 12 m en 20 s. Quelle puissance développe-t-elle&nbsp;?`,
  lab:'P =',unit:'W',ans:2943,tol:1,why:'À vitesse constante, F = mg. W = 500 × 9,81 × 12 = 58 860 J, donc P = 58 860/20 = 2943 W, soit près de 3 kW.',
  note:'Le kilowattheure est une unité d’énergie : 1 kWh = 1000 W × 3600 s = 3,6·10⁶ J.'},
 {kind:'Méthode',h:'Puissance et rendement',p:`<p><b>Quand</b> : un moteur, une pompe ou une personne fournit un travail pendant une durée donnée, et on demande la puissance utile ou la puissance consommée.</p><p><b>Pourquoi</b> : une machine ne rend jamais toute l’énergie qu’elle reçoit. Le <b>rendement</b> η = <i>P</i><sub>utile</sub>/<i>P</i><sub>reçue</sub> (entre 0 et 1) mesure la part utile ; le reste devient de la chaleur.</p><p><b>Comment</b> : 1. Calcule le travail utile (pour soulever à vitesse constante, <i>W</i> = <i>mgh</i>). 2. <i>P</i><sub>utile</sub> = <i>W</i>/Δ<i>t</i>, ou <i>F v</i> à vitesse constante. 3. <i>P</i><sub>reçue</sub> = <i>P</i><sub>utile</sub>/η. 4. Énergie consommée = <i>P</i><sub>reçue</sub> × Δ<i>t</i>, en J ou en kWh. Pour un système de plusieurs corps (cabine et contrepoids), additionne leurs variations d’énergie potentielle.</p>`,
  demo:{enonce:'Une pompe monte 2000 L d’eau à 15 m de hauteur en 10 min. Son rendement vaut 60 %. Quelle puissance électrique consomme-t-elle&nbsp;?',
   etapes:[
    {f:'<i>m</i> = 2000 kg ; <i>W</i> = <i>mgh</i> = 2000 × 9,81 × 15 = 294 300 J',w:'1 L d’eau a une masse de 1 kg. Le travail utile est le gain d’énergie potentielle.'},
    {f:'<i>P</i><sub>utile</sub> = 294 300/600 = 490,5 W',w:'10 min = 600 s.'},
    {f:'<i>P</i><sub>reçue</sub> = 490,5/0,60 ≈ 818 W',w:'On divise par le rendement : la puissance reçue est toujours plus grande que la puissance utile.'},
   ],
   conclusion:'Environ 818 W. Erreur fréquente : multiplier par 0,60 au lieu de diviser, ce qui donnerait une puissance reçue plus petite que la puissance utile.'}},
 {h:'Le moteur électrique',p:'Un moteur électrique de rendement 85 % fournit une puissance mécanique de 1,7 kW. Quelle puissance électrique consomme-t-il, en kW&nbsp;?',lab:'P =',unit:'kW',ans:2,tol:.01,
  why:'P<sub>reçue</sub> = P<sub>utile</sub>/η = 1,7/0,85 = 2,0 kW. Les 0,3 kW restants chauffent le moteur.'},
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
 {kind:'Méthode',h:'Utiliser pV = nRT : tout en SI',p:`<p><b>Quand</b> : on cherche une des quatre grandeurs <i>p</i>, <i>V</i>, <i>n</i>, <i>T</i> d’un gaz dans <b>un seul</b> état, connaissant les trois autres. Ou une masse de gaz.</p><p><b>Pourquoi</b> : <i>R</i> = 8,314 J/(mol·K) n’a cette valeur qu’en unités SI. Une seule unité oubliée fausse le résultat d’un facteur 1000 ou de 273.</p><p><b>Comment</b> : 1. <i>p</i> en Pa (1 bar = 10⁵ Pa, 1 kPa = 10³ Pa), et en pression <b>absolue</b>. 2. <i>V</i> en m³ (1 L = 10⁻³ m³, 1 cm³ = 10⁻⁶ m³). 3. <i>T</i> en K : <i>T</i> = θ + 273,15. 4. Isole l’inconnue, par exemple <i>n</i> = <i>pV</i>/(<i>RT</i>). 5. Pour une masse : <i>m</i> = <i>n M</i>, avec <i>M</i> en kg/mol.</p>`,
  demo:{enonce:'Une bouteille de plongée de 10 L contient de l’air à 200 bar (pression absolue) et 15 °C. Combien de moles d’air contient-elle, et quelle masse (<i>M</i> = 0,029 kg/mol)&nbsp;?',
   etapes:[
    {f:'<i>p</i> = 200 × 10⁵ = 2,0·10⁷ Pa ; <i>V</i> = 10 × 10⁻³ = 0,010 m³ ; <i>T</i> = 288,15 K',w:'Les trois conversions, avant tout calcul.'},
    {f:'<i>n</i> = <i>pV</i>/(<i>RT</i>) = 2,0·10⁷ × 0,010/(8,314 × 288,15) ≈ 83,5 mol',w:'On isole <i>n</i> dans <i>pV</i> = <i>nRT</i>.'},
    {f:'<i>m</i> = <i>n M</i> = 83,5 × 0,029 ≈ 2,42 kg',w:'La masse molaire relie moles et kilogrammes.'},
    {f:'Unités : Pa × m³ = J, et J/(J/(mol·K) × K) = mol',w:'Le contrôle d’unité confirme la formule.'},
   ],
   conclusion:'83,5 mol, soit 2,4 kg d’air comprimés dans 10 L. Sous 1 bar, cet air occuperait 2000 L.'}},
 {h:'Le ballon de baudruche',p:'Un ballon de 5,0 L contient de l’air à 1,2 bar (pression absolue) et 25 °C. Combien de moles d’air contient-il&nbsp;? Arrondis au millième.',lab:'n =',unit:'mol',ans:.2421,tol:.0011,
  why:'n = pV/(RT) = 1,2·10⁵ × 5,0·10⁻³/(8,314 × 298,15) = 600/2479 ≈ 0,242 mol.'},
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
 {kind:'Méthode',h:'La loi des gaz parfaits entre deux états',p:`<p><b>Quand</b> : une même quantité de gaz passe d’un état 1 à un état 2 (on chauffe, on comprime, une bulle remonte, un pneu chauffe).</p><p><b>Pourquoi</b> : si <i>n</i> ne change pas, <i>pV</i>/<i>T</i> = <i>nR</i> est constant : <b><i>p</i>₁<i>V</i>₁/<i>T</i>₁ = <i>p</i>₂<i>V</i>₂/<i>T</i>₂</b>. On n’a même pas besoin de <i>n</i>. Isotherme, isobare et isochore en sont des cas particuliers, où l’une des trois grandeurs se simplifie.</p><p><b>Comment</b> : 1. Fais un tableau état 1 / état 2. 2. Températures <b>toujours en kelvins</b> : la loi porte sur <i>T</i> absolue, pas sur des °C. 3. Pressions <b>absolues</b> : ajoute <i>p</i><sub>atm</sub> à une lecture de manomètre. 4. Comme on ne fait que des rapports, <i>p</i> et <i>V</i> peuvent rester en bar et en L, à condition d’utiliser la même unité des deux côtés. 5. Isole l’inconnue, puis repasse en pression relative si on la demande.</p>`,
  demo:{enonce:'Une seringue bouchée contient 20 mL d’air à 1,0 bar et 20 °C. On la comprime à 8,0 mL, et l’air s’échauffe à 40 °C. Quelle est la nouvelle pression&nbsp;?',
   etapes:[
    {f:'État 1 : 1,0 bar, 20 mL, 293,15 K. État 2 : <i>p</i>₂, 8,0 mL, 313,15 K',w:'Températures converties en kelvins.'},
    {f:'<i>p</i>₂ = <i>p</i>₁ × (<i>V</i>₁/<i>V</i>₂) × (<i>T</i>₂/<i>T</i>₁)',w:'On isole <i>p</i>₂ dans <i>p</i>₁<i>V</i>₁/<i>T</i>₁ = <i>p</i>₂<i>V</i>₂/<i>T</i>₂.'},
    {f:'<i>p</i>₂ = 1,0 × (20/8,0) × (313,15/293,15) = 2,5 × 1,068 ≈ 2,67 bar',w:'Les rapports de volumes et de températures n’ont pas d’unité.'},
   ],
   conclusion:'<i>p</i>₂ ≈ 2,67 bar. Avec les °C, on aurait écrit 40/20 = 2 et trouvé 5,0 bar : une erreur de près du double.'}},
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
 {h:'La bouteille au soleil',p:'Une bouteille de plongée est gonflée à 200 bar affichés au manomètre (pression relative, <i>p</i><sub>atm</sub> = 1,013 bar), à 15 °C. Laissée au soleil, elle monte à 40 °C. Que lit-on alors au manomètre&nbsp;? Arrondis au bar.',lab:'p =',unit:'bar',ans:217.44,tol:.6,
  why:'p<sub>abs</sub> = 201,013 bar. À volume constant : p₂ = 201,013 × 313,15/288,15 ≈ 218,45 bar absolus, soit 218,45 − 1,013 ≈ 217 bar au manomètre.'},
 {kind:'Méthode',h:'Calculer le travail reçu par un gaz',p:`<p><b>Quand</b> : on demande l’énergie fournie à un gaz qu’on comprime, ou fournie par un gaz qui se détend.</p><p><b>Pourquoi</b> : le gaz pousse sur un piston de surface <i>S</i> avec la force <i>pS</i>. Si le volume varie de d<i>V</i>, le travail <b>reçu</b> par le gaz vaut δ<i>W</i> = −<i>p</i> d<i>V</i>. Le signe moins dit qu’un gaz comprimé (d<i>V</i> &lt; 0) reçoit du travail.</p><p><b>Comment</b> : identifie la transformation. <b>Isochore</b> : <i>W</i> = 0. <b>Isobare</b> : <i>W</i> = −<i>p</i>(<i>V</i><sub>B</sub> − <i>V</i><sub>A</sub>). <b>Isotherme</b> : <i>p</i> = <i>nRT</i>/<i>V</i>, et l’intégrale donne <i>W</i> = −<i>nRT</i> ln(<i>V</i><sub>B</sub>/<i>V</i><sub>A</sub>). Sur le diagramme <i>p</i>–<i>V</i>, |<i>W</i>| est l’aire sous la courbe.</p>`,
  demo:{enonce:'a) Un gaz se détend à pression constante 100 kPa de 2,0 L à 5,0 L. b) 0,10 mol de gaz parfait à 300 K est comprimé à température constante de 3,0 L à 1,0 L. Calcule le travail reçu dans chaque cas.',
   etapes:[
    {f:'a) <i>W</i> = −100·10³ × (5,0 − 2,0)·10⁻³ = −300 J',w:'Isobare : volumes en m³, pression en Pa. Le gaz fournit 300 J.'},
    {f:'b) <i>W</i> = −<i>nRT</i> ln(<i>V</i><sub>B</sub>/<i>V</i><sub>A</sub>) = −0,10 × 8,314 × 300 × ln(1/3)',w:'Isotherme : on intègre −<i>nRT</i>/<i>V</i> d<i>V</i>. Ici, seul le rapport des volumes compte.'},
    {f:'ln(1/3) ≈ −1,099, donc <i>W</i> ≈ +274 J',w:'Compression : le gaz reçoit du travail, <i>W</i> &gt; 0.'},
   ],
   conclusion:'−300 J pour la détente isobare, +274 J pour la compression isotherme. Vérifie toujours le signe : détente, <i>W</i> &lt; 0 ; compression, <i>W</i> &gt; 0.'}},
 {h:'La détente isotherme',p:'0,20 mol de gaz parfait à 350 K se détend à température constante de 1,0 L à 4,0 L. Quel travail le gaz reçoit-il&nbsp;? Arrondis au joule, avec son signe.',lab:'W =',unit:'J',ans:-806.8,tol:.6,
  why:'W = −nRT ln(V<sub>B</sub>/V<sub>A</sub>) = −0,20 × 8,314 × 350 × ln 4 ≈ −582 × 1,386 ≈ −807 J. Le gaz fournit 807 J.'},
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
 {kind:'Méthode',h:'Le premier principe et ses signes',p:`<p><b>Quand</b> : un système échange de la chaleur et du travail, et on demande la variation de son énergie interne, ou l’un des échanges.</p><p><b>Pourquoi</b> : l’énergie se conserve. L’énergie interne <i>U</i> ne change que par ce qui entre ou sort : <b>Δ<i>U</i> = <i>Q</i> + <i>W</i></b>. Tout est compté du point de vue du système : ce qu’il <b>reçoit</b> est positif, ce qu’il <b>cède</b> ou <b>fournit</b> est négatif.</p><p><b>Comment</b> : 1. Délimite le système. 2. Traduis chaque phrase en signe : « reçoit 300 J de travail » donne <i>W</i> = +300 J, « cède 100 J de chaleur » donne <i>Q</i> = −100 J, « fournit du travail en se détendant » donne <i>W</i> &lt; 0. 3. Additionne. 4. Pour un solide ou un liquide, le volume change à peine : <i>W</i> ≈ 0 et Δ<i>U</i> = <i>Q</i>.</p>`,
  demo:{enonce:'On comprime un gaz : il reçoit 300 J de travail, et dans le même temps il cède 100 J de chaleur au cylindre. Que vaut Δ<i>U</i>, et que devient sa température&nbsp;?',
   etapes:[
    {f:'<i>W</i> = +300 J',w:'Le gaz reçoit ce travail.'},
    {f:'<i>Q</i> = −100 J',w:'Le gaz cède cette chaleur : elle sort du système.'},
    {f:'Δ<i>U</i> = −100 + 300 = +200 J',w:'Premier principe.'},
    {f:'Δ<i>U</i> &gt; 0 : la température du gaz parfait monte.',w:'Pour un gaz parfait, <i>U</i> ne dépend que de <i>T</i>.'},
   ],
   conclusion:'Δ<i>U</i> = +200 J : le gaz s’échauffe, bien qu’il perde de la chaleur. Chaleur et température ne sont pas la même chose.'}},
 {h:'Le premier principe',p:`L’énergie interne <i>U</i> d’un système (énergie des mouvements et des interactions microscopiques) ne varie que par échanges : <b>Δ<i>U</i> = <i>Q</i> + <i>W</i></b>. <i>Q</i> est la chaleur <b>reçue</b>, <i>W</i> le travail <b>reçu</b>. Pour un gaz parfait, <i>U</i> ne dépend que de <i>T</i>.<br>Un gaz reçoit 500 J de chaleur et fournit 200 J de travail en se détendant. Que vaut Δ<i>U</i>&nbsp;?`,
  opts:['700 J','−300 J','300 J','200 J'],ans:2,
  why:'Le gaz fournit 200 J de travail, donc il en reçoit W = −200 J. ΔU = 500 − 200 = 300 J.',
  note:'Signe : tout ce que le système reçoit compte en positif. Certains livres d’ingénierie utilisent ΔU = Q − W avec W fourni : c’est la même physique.'},
 {h:'Le gaz qui refroidit',p:'Un gaz reçoit 150 J de travail et cède 400 J de chaleur. Que vaut Δ<i>U</i>&nbsp;?',lab:'ΔU =',unit:'J',ans:-250,tol:.5,
  why:'W = +150 J et Q = −400 J, donc ΔU = −400 + 150 = −250 J. L’énergie interne baisse : le gaz refroidit.'},
 {h:'La chaleur spécifique',p:`Pour chauffer une masse <i>m</i> de Δ<i>T</i> sans changement d’état, il faut <b><i>Q</i> = <i>m c</i> Δ<i>T</i></b>. La <b>chaleur spécifique</b> <i>c</i> est en J/(kg·K) : 4186 pour l’eau liquide, environ 900 pour l’aluminium, 450 pour le fer.<br>Quelle énergie faut-il pour chauffer 1,5 kg d’eau de 20 °C à 100 °C, en kJ&nbsp;? Arrondis au kJ.`,
  lab:'Q =',unit:'kJ',ans:502.3,tol:.6,why:'Q = 1,5 × 4186 × 80 = 502 320 J ≈ 502 kJ. Une bouilloire de 2 kW met donc environ 4 minutes.'},
 {kind:'Méthode',h:'Le bilan calorimétrique',p:`<p><b>Quand</b> : on met en contact des corps à des températures différentes, dans un récipient isolé, et on cherche la température finale ou une masse.</p><p><b>Pourquoi</b> : le système complet est isolé : il ne reçoit ni chaleur ni travail de l’extérieur. Ce que les corps chauds cèdent, les corps froids le reçoivent. La somme des chaleurs reçues est donc nulle : <b>Σ<i>m</i><sub>i</sub><i>c</i><sub>i</sub>(<i>T</i><sub>f</sub> − <i>T</i><sub>i</sub>) = 0</b>.</p><p><b>Comment</b> : 1. Fais la liste des corps, avec <i>m</i>, <i>c</i> et la température initiale. 2. Écris pour chacun <i>Q</i> = <i>m c</i>(<i>T</i><sub>f</sub> − <i>T</i><sub>i</sub>) avec la même inconnue <i>T</i><sub>f</sub>. Les signes se règlent seuls : <i>Q</i> &lt; 0 pour un corps qui refroidit. 3. Somme nulle, puis isole <i>T</i><sub>f</sub>. 4. Vérifie que <i>T</i><sub>f</sub> est entre les températures initiales.</p>`,
  demo:{enonce:'On plonge un bloc d’aluminium de 200 g à 90 °C dans 500 g d’eau à 20 °C, dans un récipient isolé. <i>c</i><sub>alu</sub> = 900 J/(kg·K), <i>c</i><sub>eau</sub> = 4186 J/(kg·K). Quelle est la température finale&nbsp;?',
   etapes:[
    {f:'Alu : <i>Q</i>₁ = 0,200 × 900 × (<i>T</i><sub>f</sub> − 90) = 180 (<i>T</i><sub>f</sub> − 90)',w:'Même forme pour chaque corps.'},
    {f:'Eau : <i>Q</i>₂ = 0,500 × 4186 × (<i>T</i><sub>f</sub> − 20) = 2093 (<i>T</i><sub>f</sub> − 20)',w:'Les températures peuvent rester en °C, car seules des différences interviennent.'},
    {f:'<i>Q</i>₁ + <i>Q</i>₂ = 0, donc <i>T</i><sub>f</sub> = (180 × 90 + 2093 × 20)/(180 + 2093) = 58 060/2273 ≈ 25,5 °C',w:'<i>T</i><sub>f</sub> est la moyenne des températures, pondérée par les <i>mc</i>.'},
    {f:'Contrôle : 20 °C &lt; 25,5 °C &lt; 90 °C',w:'Le résultat est plausible.'},
   ],
   conclusion:'<i>T</i><sub>f</sub> ≈ 25,5 °C. L’eau, avec sa grande chaleur spécifique, impose presque sa température.'}},
 {h:'Le mélange',p:'On verse 1 kg d’eau à 80 °C dans de l’eau à 20 °C (récipient isolé, sans pertes). Règle la masse d’eau froide pour que le mélange soit à 40 °C.',
  params:[{id:'m2',l:'Eau froide m₂',min:.5,max:4,step:.5,v:1,u:' kg'}],
  draw:v=>{ const Tf=(80+v.m2*20)/(1+v.m2), P=plane({x:[-1,5],y:[-12,108],w:220,h:260,grid:false,axes:false});
    P.rect(1.6,0,.8,100,{c:'var(--ink)',w:2}).rect(1.6,0,.8,Tf,{fill:'var(--bad)',fo:.6,c:null}).rect(1.3,-10,1.4,10,{fill:'var(--bad)',fo:.6,c:'var(--ink)',w:2});
    [20,40,60,80,100].forEach(T=>P.seg(2.4,T,2.8,T,{c:'var(--muted)',w:1.5}).text(2.9,T,T+' °C',{dy:4,s:11,c:'var(--muted)'}));
    P.seg(1.2,40,2.8,40,{c:'var(--spark)',w:2,dash:true}); return P.svg(); },
  info:v=>`<i>T</i><sub>f</sub> = (1 × 80 + ${fmt(v.m2,1)} × 20)/(1 + ${fmt(v.m2,1)}) = ${fmt((80+v.m2*20)/(1+v.m2),1)} °C`,
  ok:v=>v.m2===2, why:'Chaleur cédée = chaleur reçue : 1 × c × (80 − 40) = m₂ × c × (40 − 20), donc m₂ = 40/20 = 2 kg. La chaleur spécifique se simplifie.'},
 {h:'La trempe du forgeron',p:'Un forgeron plonge une pièce de fer de 0,50 kg à 200 °C dans un seau contenant 2,0 kg d’eau à 15 °C. <i>c</i><sub>fer</sub> = 450 J/(kg·K). On néglige les pertes et l’évaporation. Quelle est la température finale&nbsp;? Arrondis au dixième.',lab:'T =',unit:'°C',ans:19.84,tol:.06,
  why:'0,50 × 450 × (T − 200) + 2,0 × 4186 × (T − 15) = 0 donne T = (225 × 200 + 8372 × 15)/(225 + 8372) = 170 580/8597 ≈ 19,8 °C.'},
 {kind:'Méthode',h:'Convertir une énergie mécanique en échauffement',p:`<p><b>Quand</b> : un mouvement s’arrête par frottement ou par un choc (freins, balle qui s’écrase, chute d’eau), et on demande l’échauffement.</p><p><b>Pourquoi</b> : l’énergie mécanique perdue ne disparaît pas. Elle devient de l’énergie interne : c’est le premier principe avec <i>Q</i> ou <i>W</i> venant du frottement.</p><p><b>Comment</b> : 1. Calcule l’énergie mécanique perdue (½<i>mv</i>², ou <i>mgh</i>). 2. Multiplie par la fraction qui chauffe le corps étudié, si l’énoncé en donne une. 3. Égale à <i>m c</i> Δ<i>T</i>, avec la masse et la chaleur spécifique du corps <b>qui chauffe</b>, pas forcément celui qui bougeait. 4. Isole Δ<i>T</i>.</p>`,
  demo:{enonce:'Au pied d’une cascade de 50 m, l’eau s’arrête dans le bassin. Si toute son énergie potentielle chauffait l’eau elle-même, de combien sa température monterait-elle&nbsp;?',
   etapes:[
    {f:'Énergie perdue par kilogramme d’eau : <i>g h</i> = 9,81 × 50 = 490,5 J/kg',w:'<i>mgh</i> pour <i>m</i> = 1 kg. La masse va se simplifier.'},
    {f:'<i>m g h</i> = <i>m c</i> Δ<i>T</i>',w:'Le corps qui chauffe est l’eau elle-même.'},
    {f:'Δ<i>T</i> = <i>g h</i>/<i>c</i> = 490,5/4186 ≈ 0,12 K',w:'Une énergie mécanique « énorme » ne chauffe l’eau que très peu.'},
   ],
   conclusion:'À peine 0,12 K. C’est l’expérience de Joule : il faut 4186 J pour chauffer 1 kg d’eau d’un kelvin, l’équivalent d’une chute de 427 m.'}},
 {h:'La balle de plomb',p:'Une balle de plomb de 10 g arrive à 300 m/s dans une cible et s’y arrête. La moitié de son énergie cinétique chauffe la balle (<i>c</i><sub>plomb</sub> = 130 J/(kg·K)). De combien sa température monte-t-elle&nbsp;? Arrondis au kelvin.',lab:'ΔT =',unit:'K',ans:173.08,tol:.6,
  why:'E<sub>c</sub> = ½ × 0,010 × 300² = 450 J, dont 225 J chauffent la balle : ΔT = 225/(0,010 × 130) ≈ 173 K.'},
 {h:'Les transferts thermiques',p:`<b>Conduction</b> : transfert de proche en proche dans la matière, sans déplacement global. À travers une paroi : <b>Φ = λ <i>S</i> Δ<i>T</i>/<i>e</i></b> (W), λ la conductivité en W/(m·K). <b>Convection</b> : le fluide lui-même se déplace et emporte la chaleur. <b>Rayonnement</b> : ondes électromagnétiques, même dans le vide, <b><i>P</i> = ε σ <i>S T</i>⁴</b> avec σ = 5,67·10⁻⁸ W/(m²·K⁴).`,
  opts:['×2','×4','×8','×16'],ans:3,fig:'<p>La température absolue d’un corps passe de 300 K à 600 K. Par combien est multipliée la puissance qu’il rayonne&nbsp;?</p>',
  why:'P ∝ T⁴ et 2⁴ = 16. C’est pourquoi le rayonnement domine aux hautes températures.',
  note:'Le Soleil chauffe la Terre par rayonnement, le radiateur chauffe la pièce surtout par convection, la poignée de la casserole chauffe par conduction.'},
 {kind:'Méthode',h:'Flux, durée et énergie',p:`<p><b>Quand</b> : on demande les pertes d’une paroi sur une journée, la durée d’une chauffe, ou une consommation en kWh.</p><p><b>Pourquoi</b> : un flux ou une puissance est une énergie <b>par seconde</b>. Pour passer de l’un à l’autre, on multiplie ou on divise par la durée : <b><i>E</i> = <i>P</i> Δ<i>t</i></b>.</p><p><b>Comment</b> : 1. Flux de conduction : Φ = λ<i>S</i>Δ<i>T</i>/<i>e</i>, avec <i>e</i> en m. 2. Énergie perdue : <i>E</i> = Φ Δ<i>t</i>. 3. Durée d’une chauffe : Δ<i>t</i> = <i>Q</i>/<i>P</i>, avec <i>Q</i> = <i>m c</i>Δ<i>T</i>. 4. Conversions : 1 kWh = 3,6·10⁶ J. En kW et en heures, <i>E</i> en kWh = <i>P</i> en kW × Δ<i>t</i> en h.</p>`,
  demo:{enonce:'Un mur de briques de 10 m² et de 20 cm d’épaisseur (λ = 0,80 W/(m·K)) sépare l’intérieur, à 20 °C, de l’extérieur, à 5 °C. Quel flux le traverse, et quelle énergie perd-on en un jour&nbsp;?',
   etapes:[
    {f:'Φ = 0,80 × 10 × 15/0,20 = 600 W',w:'Δ<i>T</i> = 15 K et <i>e</i> = 0,20 m.'},
    {f:'<i>E</i> = 600 W × 24 h = 14 400 Wh = 14,4 kWh',w:'Puissance fois durée, en gardant les heures.'},
    {f:'Soit 14,4 × 3,6·10⁶ ≈ 5,2·10⁷ J',w:'Même énergie, en joules.'},
   ],
   conclusion:'600 W et 14,4 kWh par jour. Doubler l’épaisseur, ou prendre un isolant 20 fois moins conducteur, divise ces pertes d’autant.'}},
 {h:'Le radiateur',p:'Un radiateur électrique de 1,5 kW fonctionne pendant 6,0 h. Quelle énergie consomme-t-il, en MJ&nbsp;?',lab:'E =',unit:'MJ',ans:32.4,tol:.05,
  why:'E = 1,5 kW × 6,0 h = 9,0 kWh = 9,0 × 3,6 MJ = 32,4 MJ.'},
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
 {kind:'Méthode',h:'Chauffer à travers plusieurs paliers',p:`<p><b>Quand</b> : un corps passe d’une température à une autre en changeant d’état en route (glace qui devient eau tiède, eau qui devient vapeur).</p><p><b>Pourquoi</b> : chaque morceau du trajet suit sa propre loi. Dans une phase, <i>Q</i> = <i>m c</i>Δ<i>T</i>, avec la chaleur spécifique <b>de cette phase</b>. Sur un palier, <i>Q</i> = <i>m L</i> et la température ne bouge pas.</p><p><b>Comment</b> : 1. Trace le trajet sur l’axe des températures et repère les paliers franchis (0 °C, 100 °C sous 1 atm). 2. Découpe en étapes : chauffage de la phase 1, changement d’état, chauffage de la phase 2… 3. Calcule l’énergie de chaque étape. 4. Additionne.</p>`,
  demo:{enonce:'Quelle énergie faut-il pour transformer 2,0 kg de glace à −5 °C en eau à 30 °C&nbsp;? <i>c</i><sub>glace</sub> = 2100 J/(kg·K), <i>c</i><sub>eau</sub> = 4186 J/(kg·K), <i>L</i><sub>f</sub> = 334 kJ/kg.',
   etapes:[
    {f:'Glace de −5 °C à 0 °C : 2,0 × 2100 × 5 = 21 000 J',w:'Chaleur spécifique de la glace, pas de l’eau.'},
    {f:'Fusion à 0 °C : 2,0 × 334 000 = 668 000 J',w:'Palier : <i>Q</i> = <i>m L</i><sub>f</sub>, la température reste à 0 °C.'},
    {f:'Eau de 0 °C à 30 °C : 2,0 × 4186 × 30 = 251 160 J',w:'Maintenant, la chaleur spécifique de l’eau liquide.'},
    {f:'Total : 21 000 + 668 000 + 251 160 = 940 160 J ≈ 940 kJ',w:'On additionne les étapes.'},
   ],
   conclusion:'Environ 940 kJ, dont 71 % pour la seule fusion. Oublier un palier est l’erreur la plus coûteuse.'}},
 {h:'De l’eau tiède à la vapeur',p:'Quelle énergie faut-il pour transformer 500 g d’eau à 20 °C en vapeur à 100 °C, en kJ&nbsp;? Arrondis au kJ.',lab:'Q =',unit:'kJ',ans:1295.9,tol:.6,
  why:'Chauffer : 0,5 × 4186 × 80 = 167,4 kJ. Vaporiser : 0,5 × 2257 = 1128,5 kJ. Total ≈ 1296 kJ.'},
 {h:'Du glaçon à l’eau tiède',p:'Quelle énergie faut-il pour transformer 300 g de glace à −10 °C en eau à 50 °C, en kJ&nbsp;? Arrondis au dixième.',lab:'Q =',unit:'kJ',ans:169.29,tol:.06,
  why:'Glace : 0,3 × 2100 × 10 = 6,3 kJ. Fusion : 0,3 × 334 = 100,2 kJ. Eau : 0,3 × 4186 × 50 = 62,79 kJ. Total ≈ 169,3 kJ.'},
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
 {kind:'Méthode',h:'Bilan calorimétrique avec changement d’état',p:`<p><b>Quand</b> : on mélange de la glace et de l’eau (ou de la vapeur et de l’eau), dans un récipient isolé, et on cherche la température finale.</p><p><b>Pourquoi</b> : le principe est celui du bilan calorimétrique : la somme des chaleurs reçues est nulle. Mais le corps qui change d’état reçoit aussi <i>m L</i> sur son palier, et sa chaleur spécifique change après le palier.</p><p><b>Comment</b> : 1. Fais une hypothèse sur l’état final, par exemple « toute la glace fond ». 2. Écris l’énergie reçue par la glace : chauffage jusqu’à 0 °C, fusion <i>m L</i><sub>f</sub>, puis chauffage de l’eau de fonte de 0 °C à <i>T</i><sub>f</sub>. 3. Écris l’énergie reçue par l’eau chaude : <i>m c</i>(<i>T</i><sub>f</sub> − <i>T</i><sub>i</sub>), négative. 4. Somme nulle, puis isole <i>T</i><sub>f</sub>. 5. Vérifie l’hypothèse : il faut <i>T</i><sub>f</sub> ≥ 0 °C.</p>`,
  demo:{enonce:'On met 20 g de glace à −5 °C dans 200 g d’eau à 30 °C, dans un récipient isolé. Quelle est la température finale&nbsp;?',
   etapes:[
    {f:'Glace jusqu’à 0 °C : 0,020 × 2100 × 5 = 210 J ; fusion : 0,020 × 334 000 = 6680 J',w:'Hypothèse : toute la glace fond.'},
    {f:'Eau de fonte de 0 à <i>T</i> : 0,020 × 4186 × <i>T</i> = 83,7 <i>T</i>',w:'Après le palier, c’est de l’eau liquide.'},
    {f:'Eau chaude : 0,200 × 4186 × (<i>T</i> − 30) = 837,2 <i>T</i> − 25 116',w:'Elle refroidit : sa contribution sera négative.'},
    {f:'210 + 6680 + 83,7 <i>T</i> + 837,2 <i>T</i> − 25 116 = 0, donc <i>T</i> = 18 226/920,9 ≈ 19,8 °C',w:'Somme nulle, puis on isole <i>T</i>.'},
    {f:'<i>T</i> &gt; 0 °C : l’hypothèse est vérifiée.',w:'Si on avait trouvé <i>T</i> &lt; 0, il faudrait reprendre le calcul autrement.'},
   ],
   conclusion:'<i>T</i><sub>f</sub> ≈ 19,8 °C. Sans le terme de fusion, on aurait trouvé environ 27 °C : la fusion refroidit beaucoup.'}},
 {kind:'Défi',h:'Le glaçon dans le verre',p:'On met 50 g de glace à 0 °C dans 300 g d’eau à 25 °C (verre isolé, sans pertes). Toute la glace fond. Quelle est la température finale&nbsp;? Arrondis au dixième.',unit:'°C',ans:10.03,tol:.06,
  why:'Chaleur cédée par l’eau = chaleur pour fondre puis réchauffer : 0,3 × 4186 × (25 − T) = 0,05 × 334 000 + 0,05 × 4186 × T. D’où 31 395 − 1255,8 T = 16 700 + 209,3 T, et T = 14 695/1465,1 ≈ 10,0 °C.'},
 {kind:'Méthode',h:'Toute la glace fond-elle&nbsp;?',p:`<p><b>Quand</b> : il y a beaucoup de glace, ou peu d’eau chaude, et rien ne garantit que tout fond.</p><p><b>Pourquoi</b> : l’eau liquide ne peut pas descendre sous 0 °C tant qu’il reste de la glace. Si l’énergie disponible ne suffit pas pour tout fondre, le mélange s’arrête sur le palier, à 0 °C. Le bilan habituel donnerait alors une température négative pour de l’eau liquide, ce qui est impossible.</p><p><b>Comment</b> : 1. Calcule l’énergie que l’eau chaude peut céder en descendant à 0 °C. 2. Calcule l’énergie qu’il faut pour amener la glace à 0 °C, puis pour la fondre entièrement. 3. Compare. Si l’énergie disponible est plus grande, tout fond : fais le bilan avec <i>T</i><sub>f</sub> inconnue. Sinon, <i>T</i><sub>f</sub> = 0 °C, et la masse fondue vaut (énergie restante)/<i>L</i><sub>f</sub>.</p>`,
  demo:{enonce:'On met 100 g de glace à 0 °C dans 150 g d’eau à 20 °C, dans un récipient isolé. Quel est l’état final&nbsp;?',
   etapes:[
    {f:'Énergie disponible : 0,150 × 4186 × 20 = 12 558 J',w:'Ce que l’eau cède au plus, en descendant jusqu’à 0 °C.'},
    {f:'Énergie pour tout fondre : 0,100 × 334 000 = 33 400 J',w:'La glace est déjà à 0 °C : il ne reste que la fusion.'},
    {f:'12 558 J &lt; 33 400 J : toute la glace ne fond pas, et <i>T</i><sub>f</sub> = 0 °C.',w:'Le mélange reste sur le palier de fusion.'},
    {f:'Masse fondue : 12 558/334 000 ≈ 0,0376 kg = 37,6 g',w:'Toute l’énergie disponible sert à la fusion.'},
   ],
   conclusion:'État final : 0 °C, avec 100 − 37,6 ≈ 62 g de glace et 188 g d’eau liquide.'}},
 {h:'Le verre trop glacé',p:'On met 50 g de glace à 0 °C dans 100 g d’eau à 30 °C, dans un récipient isolé. Quelle masse de glace reste-t-il à la fin&nbsp;? Arrondis au dixième de gramme.',lab:'m =',unit:'g',ans:12.4,tol:.06,
  why:'Disponible : 0,100 × 4186 × 30 = 12 558 J. Pour tout fondre : 0,050 × 334 000 = 16 700 J, c’est trop. On fond 12 558/334 000 ≈ 37,6 g, il reste 50 − 37,6 ≈ 12,4 g de glace, à 0 °C.'},
 {kind:'Méthode',h:'Lire une table : l’interpolation linéaire',p:`<p><b>Quand</b> : une grandeur n’est connue que par une table (pression de vapeur saturante, masse volumique selon la température) et la valeur cherchée tombe entre deux lignes.</p><p><b>Pourquoi</b> : entre deux points proches, on remplace la courbe par le segment qui les relie. L’erreur reste petite si les lignes sont serrées.</p><p><b>Comment</b> : entre (<i>T</i>₁ ; <i>p</i>₁) et (<i>T</i>₂ ; <i>p</i>₂), la valeur <i>p</i> correspond à <b><i>T</i> ≈ <i>T</i>₁ + (<i>T</i>₂ − <i>T</i>₁) × (<i>p</i> − <i>p</i>₁)/(<i>p</i>₂ − <i>p</i>₁)</b>. La fraction (<i>p</i> − <i>p</i>₁)/(<i>p</i>₂ − <i>p</i>₁) dit où l’on se trouve entre les deux lignes, de 0 à 1.</p>`,
  demo:{enonce:'La table donne <i>p</i><sub>sat</sub> = 70,0 kPa à 90 °C et 84,5 kPa à 95 °C. À quelle température l’eau bout-elle sous 75,0 kPa&nbsp;?',
   etapes:[
    {f:'75,0 kPa est entre 70,0 et 84,5 kPa : on encadre entre 90 °C et 95 °C.',w:'On choisit les deux lignes qui entourent la valeur.'},
    {f:'Fraction : (75,0 − 70,0)/(84,5 − 70,0) = 5,0/14,5 ≈ 0,345',w:'On est à 34,5 % du chemin entre les deux lignes.'},
    {f:'<i>T</i> ≈ 90 + 5 × 0,345 ≈ 91,7 °C',w:'On avance de la même fraction sur l’écart de température.'},
   ],
   conclusion:'<i>T</i> ≈ 91,7 °C. Contrôle : 75 kPa est plus près de 70 que de 84,5 kPa, donc <i>T</i> doit être plus près de 90 °C que de 95 °C.'}},
 {h:'Bouillir sous pression',p:'La table donne <i>p</i><sub>sat</sub> = 101,3 kPa à 100 °C et 143,5 kPa à 110 °C. À quelle température l’eau bout-elle sous 120 kPa&nbsp;? Arrondis au dixième.',lab:'T =',unit:'°C',ans:104.43,tol:.06,
  why:'Fraction : (120 − 101,3)/(143,5 − 101,3) = 18,7/42,2 ≈ 0,443. Donc T ≈ 100 + 10 × 0,443 ≈ 104,4 °C.'},
 {kind:'Méthode',h:'L’équilibre d’un piston ou d’une soupape',p:`<p><b>Quand</b> : un poids, un piston ou une soupape ferme un récipient sous pression, et on demande la surpression qu’il retient ou la masse nécessaire.</p><p><b>Pourquoi</b> : le gaz intérieur pousse vers le haut avec <i>p</i><sub>int</sub><i>S</i>, l’air extérieur vers le bas avec <i>p</i><sub>ext</sub><i>S</i>. À l’équilibre, la différence compense le poids : <b>(<i>p</i><sub>int</sub> − <i>p</i><sub>ext</sub>) <i>S</i> = <i>m g</i></b>. Le poids fixe donc un <b>écart</b> de pression, pas une pression.</p><p><b>Comment</b> : 1. Surface en m², avec <i>S</i> = π(<i>d</i>/2)² pour un trou rond. 2. Δ<i>p</i> en Pa. 3. <i>m</i> = Δ<i>p S</i>/<i>g</i>, ou Δ<i>p</i> = <i>mg</i>/<i>S</i>. 4. Pression intérieure : <i>p</i><sub>int</sub> = <i>p</i><sub>ext</sub> + Δ<i>p</i>.</p>`,
  demo:{enonce:'Une soupape ferme un trou de 2,0 mm de diamètre. Quelle masse doit-elle avoir pour retenir une surpression de 100 kPa&nbsp;?',
   etapes:[
    {f:'<i>S</i> = π × (1,0·10⁻³)² ≈ 3,14·10⁻⁶ m²',w:'Rayon 1,0 mm = 1,0·10⁻³ m.'},
    {f:'Δ<i>p S</i> = 1,0·10⁵ × 3,14·10⁻⁶ ≈ 0,314 N',w:'C’est la force nette du gaz sur la soupape.'},
    {f:'<i>m</i> = 0,314/9,81 ≈ 0,032 kg = 32 g',w:'Elle équilibre le poids de la soupape.'},
   ],
   conclusion:'32 g suffisent, car le trou est minuscule. Plus le trou est petit, plus une petite masse retient une grande surpression.'}},
 {h:'Le piston chargé',p:'Un cylindre vertical est fermé par un piston de 10 cm² qui coulisse sans frottement. Le gaz intérieur est à 150 kPa, l’air extérieur à 100 kPa. Quelle est la masse totale du piston et de sa charge&nbsp;? Arrondis au centième.',lab:'m =',unit:'kg',ans:5.097,tol:.011,
  why:'Δp = 50 kPa et S = 10·10⁻⁴ m² : m = Δp·S/g = 5,0·10⁴ × 1,0·10⁻³/9,81 ≈ 5,10 kg.'},
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
