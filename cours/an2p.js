/* Déclic — Analyse II, complexes et équations différentielles */
(()=>{
const ch=Math.cosh, sh=Math.sinh;
const sup=s=>`<sup>${s}</sup>`;
const E=s=>`e<sup>${s}</sup>`;
// blocs de théorie : bk('def', 'paragraphe 1', 'paragraphe 2'), keep([...]) pour le récapitulatif, ov pour le conjugué
const bk=(c,...ps)=>`<div class="blk ${c}">${ps.map(s=>`<p>${s}</p>`).join('')}</div>`;
const keep=items=>`<div class="blk keep"><ul>${items.map(s=>`<li>${s}</li>`).join('')}</ul></div>`;
const ov=s=>`<span style="text-decoration:overline">${s}</span>`;
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
 {kind:'Théorie',h:'aˣ, c’est e déguisé',p:`<p>Tu sais ce que vaut 2³ = 2·2·2, et même 2${sup('1/2')} = √2. Mais 2${sup('π')} ? On ne peut pas multiplier 2 par lui-même « π fois ». Il faut une définition qui marche pour tout exposant réel et qui garde les règles connues.</p>`
  +bk('def',`Pour <i>a</i> &gt; 0 et <i>x</i> réel : <b>aˣ = ${E('x ln a')}</b>. On lit « a puissance x ». La base doit être strictement positive, car ln <i>a</i> doit exister.`)
  +bk('idea',`Toute exponentielle de base <i>a</i> n’est que eˣ avec l’axe des abscisses dilaté par le facteur ln <i>a</i>. Si tu sais tout sur eˣ, tu sais tout sur aˣ. Le signe de ln <i>a</i> décide du sens de variation : ln <i>a</i> &gt; 0 pour <i>a</i> &gt; 1 (croissante), ln <i>a</i> &lt; 0 pour 0 &lt; <i>a</i> &lt; 1 (décroissante), ln 1 = 0 (fonction constante égale à 1).`)
  +bk('why',`Cette définition prolonge bien les entiers : pour <i>x</i> = 3, ${E('3 ln 2')} = (${E('ln 2')})³ = 2³. Et elle garde la règle ${'a'+sup('x+y')} = aˣ·a${sup('y')}, car ${E('(x+y) ln a')} = ${E('x ln a')}·${E('y ln a')}.`)
  +bk('ex',`2${sup('0,5')} = ${E('0,5 · ln 2')} = ${E('0,3466')} ≈ 1,414 : c’est bien √2. Et 2${sup('π')} = ${E('π ln 2')} = ${E('2,1776')} ≈ 8,82, un nombre parfaitement défini.`),
  params:[{id:'a',l:'Base a',min:.2,max:3,step:.2,v:2}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-.5,6],h:260,lab:1}); P.fn(Math.exp,{c:'var(--muted)',w:2,dash:true}).fn(x=>Math.pow(v.a,x)).dot(0,1,{r:5,l:'(0 ; 1)'}).dot(1,v.a,{r:5,c:'var(--math)',l:'(1 ; a)'}); return P.svg(); },
  info:v=>`${fmt(v.a,1)}${sup('x')} = ${E(fmt(Math.log(v.a),3)+'·x')} car ln ${fmt(v.a,1)} ≈ ${fmt(Math.log(v.a),3)}${Math.abs(v.a-1)<1e-9?' : la fonction est constante.':v.a<1?' : ln a &lt; 0, la fonction décroît.':' : ln a &gt; 0, la fonction croît.'} (pointillés : eˣ)`,
  note:'Toutes les courbes passent par (0 ; 1), car a⁰ = e⁰ = 1. La base a = e est celle dont la tangente en 0 a une pente exactement 1.'},
 {h:'Réécrire avec e',p:'Laquelle de ces écritures est égale à <i>5ˣ</i> pour tout réel <i>x</i>&nbsp;?',
  opts:[E('5x'),E('x ln 5'),'x·ln 5',E('ln(5x)')],ans:1,why:`Par définition 5ˣ = ${E('x ln 5')}. Attention, ${E('ln(5x)')} = 5x : ce n’est pas une puissance.`},
 {kind:'Théorie',h:'Les règles des exposants, justifiées',p:`<p>Avec les entiers, tu connais 2³·2⁴ = 2⁷. Ces règles restent-elles vraies avec des exposants réels ? Oui, et la définition par e les démontre toutes d’un coup.</p>`
  +bk('prop',`Pour <i>a</i>, <i>b</i> &gt; 0 et <i>x</i>, <i>y</i> réels : <b>a${sup('x+y')} = aˣ·a${sup('y')}</b>, <b>(aˣ)${sup('y')} = a${sup('xy')}</b>, <b>(ab)ˣ = aˣ·bˣ</b>, <b>a${sup('−x')} = 1/aˣ</b>, et <b>ln(aˣ) = x ln a</b>.`)
  +bk('why',`Chaque règle se lit dans l’exposant de e. Produit : ${E('x ln a')}·${E('y ln a')} = ${E('(x+y) ln a')}. Puissance de puissance : (aˣ)${sup('y')} = ${E('y ln(aˣ)')} = ${E('y · x ln a')} = a${sup('xy')}, parce que ln(aˣ) = ln(${E('x ln a')}) = x ln a. Produit des bases : ln(ab) = ln a + ln b, donc ${E('x ln(ab)')} = ${E('x ln a')}·${E('x ln b')}. Inverse : ${E('−x ln a')} = 1/${E('x ln a')}.`)
  +bk('ex',`(2${sup('1/2')})² = 2${sup('(1/2)·2')} = 2¹ = 2 : c’est pour ça que 2${sup('1/2')} = √2. Et 8${sup('4/3')} = (8${sup('1/3')})⁴ = 2⁴ = 16.`)
  +bk('warn',`Ces règles supposent <i>a</i> &gt; 0. Et il n’existe aucune règle pour une somme aˣ + a${sup('y')} : 2³ + 2⁴ = 24 n’est pas une puissance simple de 2.`)},
 {kind:'Méthode',h:'Résoudre aˣ = b',p:`<b>Quand</b> : l’inconnue est dans l’exposant (doublement d’un capital, demi-vie, seuil à atteindre). <b>Pourquoi ça marche</b> : aˣ = ${E('x ln a')} et ln est la réciproque de exp, donc ln(aˣ) = x ln a. Le logarithme fait « descendre » l’exposant. <b>Comment</b> : on prend ln des deux côtés (possible si b &gt; 0), puis on divise par ln a ≠ 0 : <b>x = ${F('ln b','ln a')}</b>.`,
  demo:{enonce:'Résous 2ˣ = 10.',etapes:[
   {f:'ln(2ˣ) = ln 10',w:'Les deux membres sont strictement positifs : on peut leur appliquer ln.'},
   {f:'x · ln 2 = ln 10',w:'ln(aˣ) = ln(e^(x ln a)) = x ln a : l’exposant devient un facteur.'},
   {f:'x = ln 10 / ln 2 ≈ 2,3026 / 0,6931 ≈ 3,32',w:'ln 2 ≠ 0, on peut diviser.'},
   {f:'Contrôle : 2³ = 8 &lt; 10 &lt; 16 = 2⁴',w:'Le résultat doit tomber entre 3 et 4 : c’est le cas.'}],
   conclusion:'2ˣ = 10 ⇔ x = ln 10/ln 2 ≈ 3,32.'},
  note:'Si 0 &lt; a &lt; 1, ln a &lt; 0 : attention au sens des inégalités quand tu divises par ln a. Et aˣ = b n’a aucune solution si b ≤ 0, car aˣ &gt; 0.'},
 {h:'Tripler un capital',p:'À 5 % d’intérêts composés, un capital est multiplié par 1,05ˣ en <i>x</i> années. Au bout de combien d’années est-il triplé&nbsp;? Résous 1,05ˣ = 3 et arrondis au centième.',lab:'x =',unit:'ans',ans:22.52,tol:.006,
  why:'x ln 1,05 = ln 3, donc x = ln 3/ln 1,05 ≈ 1,0986/0,04879 ≈ 22,52 ans.'},
 {kind:'Théorie',h:'Puissance généralisée x^α',p:`<p>Tu sais dériver x², x³ ou 1/x = x⁻¹ avec la règle (xⁿ)′ = n xⁿ⁻¹. Mais √x = x${sup('1/2')} ou x${sup('0,75')} ? Cette fois c’est la base qui varie et l’exposant qui est fixe.</p>`
  +bk('def',`Pour <i>x</i> &gt; 0 et α réel : <b>x${sup('α')} = ${E('α ln x')}</b>. C’est la <b>fonction puissance</b> d’exposant α.`)
  +bk('prop',`<b>(x${sup('α')})′ = α·x${sup('α−1')}</b> : la règle des entiers reste vraie pour tout exposant réel.`)
  +bk('why',`On dérive la composée ${E('α ln x')} : l’exposant α ln x a pour dérivée α/x, donc (x${sup('α')})′ = (α/x)·${E('α ln x')} = (α/x)·x${sup('α')} = α·x${sup('α−1')}, puisque x${sup('α')}/x = x${sup('α−1')}.`)
  +bk('ex',`Pour f(x) = x${sup('1/3')} : f′(x) = (1/3)·x${sup('−2/3')}, et f′(8) = (1/3)·8${sup('−2/3')} = (1/3)·(1/4) = 1/12 ≈ 0,083. Sur la figure, la pente en x = 1 vaut toujours α, car 1${sup('α−1')} = 1.`)
  +bk('warn',`Pour α &lt; 0, la courbe descend et explose près de 0 ; pour 0 &lt; α &lt; 1, elle part verticalement de l’origine (pente infinie), comme √x. Toutes passent par (1 ; 1), car 1${sup('α')} = ${E('0')} = 1.`),
  params:[{id:'al',l:'Exposant α',min:-2,max:3,step:.5,v:.5}],
  draw:v=>{ const P=plane({x:[0,4],y:[0,4],lab:1}); P.fn(x=>Math.pow(x,v.al),{from:.01,n:400}).seg(0,0,4,4,{c:'var(--muted)',w:1,dash:true}).dot(1,1,{r:5,l:'(1 ; 1)'}); return P.svg(); },
  info:v=>`f(x) = x${sup(fmt(v.al,1))}, f′(x) = ${fmt(v.al,1)}·x${sup(fmt(v.al-1,1))}, pente en x = 1 : ${fmt(v.al,1)}`,
  note:'x^α n’est définie pour tout α que si x &gt; 0. Pour x ≤ 0, ln x n’existe pas : (−8)^(1/3) n’est pas défini par cette formule.'},
 {kind:'Théorie',h:'La dérivée de aˣ',p:`<p>Pour f(x) = 2ˣ, la variable est dans l’exposant. Que vaut f′ ? Surtout pas x·2${sup('x−1')} : cette règle-là est réservée aux puissances à exposant fixe.</p>`
  +bk('prop',`Pour <i>a</i> &gt; 0 : <b>(aˣ)′ = ln a · aˣ</b>. La dérivée est proportionnelle à la fonction, avec le coefficient ln <i>a</i>.`)
  +bk('why',`aˣ = ${E('x ln a')} est une composée : l’exposant u(x) = x ln a a pour dérivée la constante ln a, et (${E('u')})′ = u′·${E('u')}. Donc (aˣ)′ = ln a · ${E('x ln a')} = ln a · aˣ. Pour <i>a</i> = e, ln e = 1 et on retrouve (eˣ)′ = eˣ : e est la base dont la dérivée se contente de recopier la fonction.`)
  +bk('ex',`f(x) = 3ˣ : f′(x) = ln 3 · 3ˣ, donc f′(0) = ln 3 ≈ 1,099 : la tangente en (0 ; 1) est plus raide que celle de eˣ (pente 1). Pour g(x) = 5ˣ, g′(2) = ln 5 · 25 ≈ 40,24.`)
  +bk('idea',`Le facteur ln <i>a</i> est le taux de croissance instantané. Une population multipliée par 1,03 chaque année suit 1,03${sup('t')} et croît à chaque instant au taux ln 1,03 ≈ 0,0296, un peu moins que 3 % : les intérêts gagnés en cours d’année produisent eux-mêmes des intérêts.`)},
 {h:'Dériver 2ˣ',p:'Soit <i>f(x) = 2ˣ</i>. Calcule <i>f′(2)</i>, arrondi au centième.',lab:'f′(2) =',ans:2.77,tol:.006,
  why:`f′(x) = ln 2 · 2ˣ, donc f′(2) = 4 ln 2 ≈ 4 × 0,6931 ≈ 2,77.`},
 {kind:'Méthode',h:'Dériver a^u(x) : passer à la forme e^(u ln a)',p:`<b>Quand</b> : la base est fixe mais l’exposant est une fonction, comme ${'3'+sup('x²')} ou ${'5'+sup('√x')}. La règle (aˣ)′ = ln a · aˣ ne suffit plus. <b>Pourquoi ça marche</b> : <b>a${sup('u(x)')} = ${E('u(x)·ln a')}</b> est une exponentielle de fonction, et (${E('v')})′ = v′·${E('v')}. <b>Comment</b> : réécris avec e, dérive l’exposant, puis reviens à la forme a${sup('u')} : <b>(a${sup('u')})′ = u′ · ln a · a${sup('u')}</b>.`,
  demo:{enonce:`Calcule la dérivée de f(x) = 5${sup('√x')} en x = 4.`,etapes:[
   {f:`f(x) = ${E('√x · ln 5')}`,w:'On passe à la forme e^(u ln a) avec u(x) = √x et a = 5.'},
   {f:`f′(x) = (√x · ln 5)′ · ${E('√x · ln 5')} = ${F('ln 5','2√x')} · 5${sup('√x')}`,w:'Règle de la chaîne : on dérive l’exposant, ln 5 est une constante et (√x)′ = 1/(2√x).'},
   {f:`f′(4) = ${F('ln 5','4')} · 5² = ${F('25 ln 5','4')} ≈ 10,06`,w:'√4 = 2, donc 2√4 = 4 et 5^√4 = 25.'}],
   conclusion:'f′(4) = 25 ln 5/4 ≈ 10,06.'},
  note:'Erreur classique : écrire (5^√x)′ = √x · 5^(√x − 1). La règle des puissances ne vaut que si l’exposant est constant.'},
 {h:'Dériver 3 puissance x²',p:`Soit <i>f(x) = 3${sup('x²')}</i>. Calcule <i>f′(1)</i>, arrondi au centième.`,lab:'f′(1) =',ans:6.59,tol:.006,
  why:'f(x) = e^(x² ln 3), donc f′(x) = 2x ln 3 · 3^(x²) et f′(1) = 2 ln 3 · 3 = 6 ln 3 ≈ 6,59.'},
 {kind:'Méthode',h:'Résoudre x^α = c',p:`<b>Quand</b> : l’inconnue est la base et l’exposant est un réel fixe (loi d’échelle, volume en fonction du côté…). <b>Pourquoi ça marche</b> : pour x &gt; 0, les règles des entiers restent vraies : <b>(x${sup('α')})${sup('β')} = x${sup('αβ')}</b>, x${sup('α')}·x${sup('β')} = x${sup('α+β')}, <b>(xy)${sup('α')} = x${sup('α')}y${sup('α')}</b>, car elles découlent de ${E('α ln x')} et des propriétés de ln et exp. <b>Comment</b> : élève les deux membres à la puissance 1/α, puisque (x${sup('α')})${sup('1/α')} = x.`,
  demo:{enonce:`Résous x${sup('0,75')} = 8 pour x &gt; 0.`,etapes:[
   {f:'0,75 = 3/4, donc 1/α = 4/3',w:'On repère l’exposant inverse, celui qui annule α.'},
   {f:`x = (x${sup('3/4')})${sup('4/3')} = 8${sup('4/3')}`,w:'On élève les deux membres à la puissance 4/3 : (x^α)^(1/α) = x^1.'},
   {f:`8${sup('4/3')} = (8${sup('1/3')})⁴ = 2⁴ = 16`,w:'On découpe 4/3 = (1/3)·4 : la racine cubique d’abord, plus simple à calculer.'},
   {f:`Contrôle : 16${sup('3/4')} = (16${sup('1/4')})³ = 2³ = 8`,w:'On vérifie dans l’équation de départ.'}],
   conclusion:'x = 8^(4/3) = 16.'},
  note:'Ces règles supposent x &gt; 0. Pour un rapport, (2M)^α/M^α = 2^α : le facteur ne dépend pas de M.'},
 {h:'Une puissance à inverser',p:`Résous <i>x${sup('1,5')} = 27</i> pour <i>x</i> &gt; 0.`,lab:'x =',ans:9,tol:.001,
  why:'1,5 = 3/2, donc x = 27^(2/3) = (27^(1/3))² = 3² = 9. Contrôle : 9^1,5 = 3³ = 27.'},
 {kind:'Méthode',h:'Le cas xˣ',p:`Ni puissance (exposant fixe) ni exponentielle (base fixe) : la base <b>et</b> l’exposant varient. On repasse par e : <i>xˣ = ${E('x ln x')}</i>, puis la règle de la chaîne donne <b>(xˣ)′ = xˣ·(ln x + 1)</b>. Même idée pour toute forme u(x)${sup('v(x)')} = ${E('v(x)·ln u(x)')}, avec u &gt; 0.`,
  demo:{enonce:`Trouve le maximum de f(x) = x${sup('1/x')} sur ]0 ; +∞[.`,etapes:[
   {f:`f(x) = ${E('(ln x)/x')}`,w:'Base et exposant varient : on écrit u^v = e^(v ln u), avec u = x et v = 1/x.'},
   {f:`f′(x) = ((ln x)/x)′ · f(x) = ${F('1 − ln x','x²')} · f(x)`,w:'Règle de la chaîne, puis règle du quotient : (ln x/x)′ = (1/x · x − ln x)/x².'},
   {f:'f′(x) = 0 ⇔ ln x = 1 ⇔ x = e',w:'f(x) &gt; 0 et x² &gt; 0 : le signe de f′ est celui de 1 − ln x.'},
   {f:`f′ &gt; 0 avant e, f′ &lt; 0 après : maximum f(e) = e${sup('1/e')} ≈ 1,445`,w:'Tableau de signes : 1 − ln x est positif pour x &lt; e.'}],
   conclusion:'x^(1/x) est maximal en x = e, où il vaut e^(1/e) ≈ 1,445.'},
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
 {kind:'Théorie',h:'L’équivalent ln(1 + h) ~ h',p:`<p>Pour calculer des limites comme (1 + 3/x)ˣ, on a besoin de savoir comment ln(1 + h) se comporte quand <i>h</i> est tout petit. La réponse tient en une ligne.</p>`
  +bk('prop',`Quand h → 0 : <b>ln(1 + h)/h → 1</b>. On écrit <b>ln(1 + h) ~ h</b> et on lit « ln(1 + h) est équivalent à h ». De même <b>${E('h')} − 1 ~ h</b>.`)
  +bk('why',`Par définition de la dérivée, (ln(1 + h) − ln 1)/h tend vers ln′(1) = 1/1 = 1. Comme ln 1 = 0, cela donne exactement ln(1 + h)/h → 1. Pour l’exponentielle, (${E('h')} − ${E('0')})/h → exp′(0) = ${E('0')} = 1.`)
  +bk('ex',`ln(1,01) ≈ 0,00995 pour h = 0,01, et ln(1,001) ≈ 0,0009995 pour h = 0,001 : le rapport ln(1 + h)/h vaut 0,995 puis 0,9995, il se rapproche de 1.`)
  +bk('idea',`Un équivalent remplace une fonction compliquée par une fonction simple <b>dans un produit ou un quotient</b> sans changer la limite : si f ~ g, alors f·u et g·u ont la même limite. C’est ce qui permet d’écrire x · ln(1 + 3/x) ~ x · 3/x = 3.`)
  +bk('warn',`Interdit dans une somme ou une différence : ln(1 + h) − h n’est pas « équivalent à 0 », il vaut environ −h²/2. Les développements limités, plus loin dans le cours, règlent ce cas.`)},
 {kind:'Méthode',h:'Limite d’une puissance variable : la forme 1^∞',p:`<b>Quand</b> : on cherche la limite de u(x)${sup('v(x)')} avec u → 1 et v → ∞, comme (1 + 3/x)ˣ. On ne peut pas conclure « 1 puissance quelque chose = 1 » : la base n’est jamais exactement 1. <b>Pourquoi ça marche</b> : u${sup('v')} = ${E('v·ln u')} et exp est continue, il suffit donc de trouver la limite de l’exposant v·ln u. <b>Comment</b> : réécris avec e, puis utilise l’équivalent <b>ln(1 + h) ~ h</b> quand h → 0.`,
  demo:{enonce:'Calcule la limite de (1 + 3/x)ˣ quand x → +∞.',etapes:[
   {f:`(1 + 3/x)ˣ = ${E('x · ln(1 + 3/x)')}`,w:'Forme 1^∞ : on passe à l’exponentielle pour faire descendre l’exposant.'},
   {f:'ln(1 + 3/x) ~ 3/x',w:'h = 3/x tend vers 0, et ln(1 + h) ~ h.'},
   {f:'x · ln(1 + 3/x) ~ x · 3/x = 3',w:'Un produit d’équivalents est équivalent au produit : l’exposant tend vers 3.'},
   {f:`(1 + 3/x)ˣ → ${E('3')} ≈ 20,09`,w:'exp est continue : on passe à la limite dans l’exposant.'}],
   conclusion:'lim (1 + 3/x)ˣ = e³. Plus généralement, (1 + a/x)ˣ → eᵃ.'},
  note:'C’est ainsi qu’apparaît le taux « continu » des banques : placer à r % en n versements par an donne (1 + r/n)ⁿ, qui tend vers eʳ.'},
 {h:'Une limite 1^∞',p:'Que vaut la limite de <i>(1 − 1/x)</i><sup>2<i>x</i></sup> quand <i>x</i> → +∞&nbsp;? Arrondis au centième.',lab:'limite =',ans:.14,tol:.006,
  why:'(1 − 1/x)^(2x) = e^(2x ln(1 − 1/x)) et ln(1 − 1/x) ~ −1/x, donc l’exposant tend vers −2. La limite vaut e^(−2) ≈ 0,135, soit 0,14 au centième.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Tout le chapitre repose sur une seule idée : ramener chaque puissance à l’exponentielle de base e, dont on connaît la dérivée et la réciproque ln.</p>`
  +keep([`<b>Définitions</b> : aˣ = ${E('x ln a')} pour a &gt; 0 ; x${sup('α')} = ${E('α ln x')} pour x &gt; 0.`,
   `<b>Règles</b> : a${sup('x+y')} = aˣa${sup('y')}, (aˣ)${sup('y')} = a${sup('xy')}, (ab)ˣ = aˣbˣ, ln(aˣ) = x ln a. Toutes viennent des propriétés de exp et ln.`,
   `<b>Dérivées</b> : (aˣ)′ = ln a · aˣ ; (x${sup('α')})′ = α x${sup('α−1')} ; (a${sup('u')})′ = u′ · ln a · a${sup('u')} ; (xˣ)′ = xˣ(ln x + 1). Base fixe : facteur ln a. Exposant fixe : règle des puissances. Les deux varient : on repasse par e.`,
   `<b>Résoudre</b> aˣ = b (b &gt; 0) : x = ln b / ln a. Résoudre x${sup('α')} = c : x = c${sup('1/α')}.`,
   `<b>Forme 1^∞</b> : u${sup('v')} = ${E('v ln u')}, puis ln(1 + h) ~ h. En particulier (1 + a/x)ˣ → ${E('a')}.`,
   `<b>Piège</b> : (5${sup('√x')})′ n’est pas √x · 5${sup('√x − 1')}. Avant de dériver, demande-toi qui varie, la base ou l’exposant.`])},
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
 {kind:'Théorie',h:'Partie paire et partie impaire d’une fonction',p:`<p>Avant de définir ch et sh, une idée simple sur les fonctions. cos est paire, sin est impaire, et eˣ n’est ni l’un ni l’autre. Peut-on quand même découper eˣ en un morceau pair et un morceau impair ?</p>`
  +bk('prop',`Toute fonction f définie sur ℝ s’écrit d’une seule façon f = g + u avec g paire et u impaire : <b>g(x) = ${F('f(x) + f(−x)',2)}</b> et <b>u(x) = ${F('f(x) − f(−x)',2)}</b>.`)
  +bk('why',`g(−x) = (f(−x) + f(x))/2 = g(x) : g est paire. u(−x) = (f(−x) − f(x))/2 = −u(x) : u est impaire. Et g + u = f, car les f(−x) se simplifient. Unicité : si f = g₁ + u₁ aussi, alors g − g₁ = u₁ − u est à la fois paire et impaire, donc égale à son opposée, donc nulle.`)
  +bk('ex',`Pour f(x) = (x + 1)² = x² + 2x + 1 : partie paire x² + 1, partie impaire 2x. Contrôle : ((x + 1)² + (−x + 1)²)/2 = (2x² + 2)/2 = x² + 1.`)
  +bk('idea',`Appliquée à eˣ, cette découpe produit deux fonctions nouvelles, aussi importantes que cos et sin : ce sont ch et sh de l’étape suivante.`),
  fig:(()=>{ const P=plane({x:[-3,3],y:[-2,6],h:220,lab:1}); P.fn(Math.exp,{c:'var(--muted)',w:2,dash:true}).fn(ch,{c:'var(--math)'}).fn(sh,{c:'var(--spark)'}).text(1.2,4.2,'eˣ',{c:'var(--muted)'}).text(-2.3,4,'paire',{c:'var(--math)',s:11}).text(-2.3,-1.7,'impaire',{c:'var(--spark)',s:11}); return P.svg(); })(),
  note:'En pointillés eˣ, en bleu sa partie paire, en jaune sa partie impaire. Leur somme redonne exactement eˣ.'},
 {kind:'Théorie',h:'ch et sh',p:`<p>Appliquons la découpe à eˣ. Sa partie paire et sa partie impaire reçoivent un nom.</p>`
  +bk('def',`<b>ch x = ${F(E('x')+' + '+E('−x'),2)}</b> (cosinus hyperbolique) et <b>sh x = ${F(E('x')+' − '+E('−x'),2)}</b> (sinus hyperbolique), pour tout <i>x</i> réel. On note aussi cosh et sinh. Par construction, <b>ch x + sh x = eˣ</b> et ch x − sh x = e⁻ˣ.`)
  +bk('idea',`Pour <i>x</i> grand, e⁻ˣ devient négligeable : ch x et sh x se collent tous deux à eˣ/2 (pointillés). Pour <i>x</i> très négatif, c’est eˣ qui disparaît : ch x ≈ e⁻ˣ/2 remonte, sh x ≈ −e⁻ˣ/2 plonge. Entre les deux, ch dessine un U posé sur le point (0 ; 1), et sh traverse l’origine en montant.`)
  +bk('ex',`ch 1 = (e + 1/e)/2 = (2,718 + 0,368)/2 ≈ 1,543 et sh 1 = (2,718 − 0,368)/2 ≈ 1,175. Somme : 2,718 = e. En x = 3 : ch 3 ≈ 10,068 et e³/2 ≈ 10,043, déjà très proches.`)
  +bk('warn',`ch et sh ne sont ni périodiques ni bornées, contrairement à cos et sin. Le nom vient d’une autre ressemblance, celle de l’étape suivante.`),
  params:[{id:'x',l:'x',min:-2,max:2,step:.25,v:1}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-3.5,4.5],h:320,lab:1}); P.fn(x=>Math.exp(x)/2,{c:'var(--muted)',w:1.5,dash:true}).fn(ch,{c:'var(--math)'}).fn(sh,{c:'var(--spark)'})
    .dot(v.x,ch(v.x),{c:'var(--math)',l:'ch'}).dot(v.x,sh(v.x),{c:'var(--spark)',l:'sh',dy:16}); return P.svg(); },
  info:v=>`ch ${fmt(v.x)} ≈ ${fmt(ch(v.x),3)} · sh ${fmt(v.x)} ≈ ${fmt(sh(v.x),3)} · somme = e${sup(fmt(v.x))} ≈ ${fmt(Math.exp(v.x),3)}`,
  note:'ch est paire et vaut au moins 1 (minimum ch 0 = 1). sh est impaire, strictement croissante, et sh 0 = 0. La chaînette, forme d’un câble suspendu, est le graphe de ch.'},
 {kind:'Théorie',h:'ch² − sh² = 1',p:`<p>cos et sin vérifient cos² + sin² = 1, ce qui place le point (cos t ; sin t) sur le cercle unité. Quelle relation lie ch et sh ?</p>`
  +bk('prop',`Pour tout <i>x</i> : <b>ch² x − sh² x = 1</b>.`)
  +bk('why',`(ch x)² − (sh x)² = (ch x − sh x)(ch x + sh x) = e⁻ˣ · eˣ = 1. On peut aussi développer : (eˣ + e⁻ˣ)² − (eˣ − e⁻ˣ)² = (e²ˣ + 2 + e⁻²ˣ) − (e²ˣ − 2 + e⁻²ˣ) = 4, puis diviser par 4.`)
  +bk('idea',`Le point (ch t ; sh t) vérifie x² − y² = 1 : il parcourt la branche droite de l’<b>hyperbole</b> équilatère, comme (cos t ; sin t) parcourt le cercle x² + y² = 1. C’est l’origine du nom « hyperbolique ». Quand <i>t</i> croît, le point monte le long de la branche ; les pointillés y = ±x sont les asymptotes de l’hyperbole.`)
  +bk('ex',`Pour t = 2 : ch 2 ≈ 3,762 et sh 2 ≈ 3,627 ; 3,762² − 3,627² ≈ 14,154 − 13,154 = 1,000.`)
  +bk('warn',`Le signe moins est la grande différence avec la trigonométrie : ch² + sh² ne vaut pas 1 (c’est ch 2x). En revanche ch x = √(1 + sh² x) sans hésitation sur le signe, puisque ch &gt; 0.`),
  params:[{id:'t',l:'t',min:-1.8,max:1.8,step:.2,v:.8}],
  draw:v=>{ const P=plane({x:[-1,5],y:[-3.5,3.5],lab:1}); P.seg(-1,-1,3.5,3.5,{c:'var(--muted)',w:1,dash:true}).seg(-1,1,3.5,-3.5,{c:'var(--muted)',w:1,dash:true})
    .curve(ch,sh,-2,2,{c:'var(--math)'}).circ(0,0,1,{c:'var(--muted)',w:1.5}).seg(ch(v.t),0,ch(v.t),sh(v.t),{c:'var(--spark)',w:2,dash:true}).arrow(0,0,ch(v.t),sh(v.t),{c:'var(--accent)',w:2.5}).dot(ch(v.t),sh(v.t),{l:'(ch t ; sh t)'}); return P.svg(); },
  info:v=>`ch² − sh² = ${fmt(ch(v.t)**2,3)} − ${fmt(sh(v.t)**2,3)} = ${fmt(ch(v.t)**2-sh(v.t)**2,3)}`},
 {h:'Valeurs en 0',p:'Que valent <i>ch 0</i> et <i>sh 0</i>&nbsp;?',opts:['ch 0 = 0 et sh 0 = 1','ch 0 = 1 et sh 0 = 1','ch 0 = 1 et sh 0 = 0','ch 0 = ½ et sh 0 = ½'],ans:2,
  why:'ch 0 = (1 + 1)/2 = 1 et sh 0 = (1 − 1)/2 = 0. On vérifie : 1² − 0² = 1.'},
 {kind:'Théorie',h:'Parité, signe et croissance',p:`<p>Les graphes suggèrent que ch est paire et ne descend jamais sous 1, que sh est impaire et strictement croissante. Ces propriétés se démontrent en trois lignes avec les définitions.</p>`
  +bk('prop',`<b>ch est paire</b>, <b>sh est impaire</b>. <b>ch x ≥ 1</b> pour tout <i>x</i>, avec égalité seulement en 0. <b>sh x a le signe de x</b>, et sh est strictement croissante, bijective de ℝ sur ℝ.`)
  +bk('why',`Parité : remplacer <i>x</i> par −<i>x</i> échange eˣ et e⁻ˣ, ce qui ne change pas la somme et change le signe de la différence. Minoration : ch x − 1 = (eˣ − 2 + e⁻ˣ)/2 = (${E('x/2')} − ${E('−x/2')})²/2 ≥ 0, nul seulement si ${E('x/2')} = ${E('−x/2')}, c’est-à-dire x = 0. Croissance de sh : eˣ croît et −e⁻ˣ croît aussi, donc leur somme croît strictement ; les limites ±∞ en ±∞ donnent la bijectivité.`)
  +bk('ex',`ch 0,5 − 1 ≈ 0,1276, et (${E('0,25')} − ${E('−0,25')})²/2 ≈ 0,1276 : la formule est juste. sh(−2) = −sh 2 ≈ −3,627.`)
  +bk('idea',`Retiens l’image : près de 0, ch ressemble à la parabole 1 + x²/2 (même valeur, même tangente horizontale) et sh à la droite y = x. Loin de 0, les deux rejoignent eˣ/2.`),
  fig:(()=>{ const P=plane({x:[-2.5,2.5],y:[-2,4],h:220,lab:1}); P.fn(x=>1+x*x/2,{c:'var(--muted)',w:1.5,dash:true}).seg(-2,-2,2,2,{c:'var(--muted)',w:1.5,dash:true}).fn(ch,{c:'var(--math)'}).fn(sh,{c:'var(--spark)'}).dot(0,1,{r:4,l:'(0 ; 1)'}); return P.svg(); })(),
  note:'Pointillés : la parabole 1 + x²/2 et la droite y = x, qui épousent ch et sh près de 0.'},
 {kind:'Théorie',h:'Dérivées et tangente hyperbolique',p:`<p>Dériver ch et sh est immédiat avec les exponentielles, et le résultat est plus simple qu’en trigonométrie : aucun signe moins n’apparaît.</p>`
  +bk('prop',`<b>(sh x)′ = ch x</b> et <b>(ch x)′ = sh x</b>.`)
  +bk('why',`(eˣ)′ = eˣ et (e⁻ˣ)′ = −e⁻ˣ. Donc (sh x)′ = (eˣ + e⁻ˣ)/2 = ch x, et (ch x)′ = (eˣ − e⁻ˣ)/2 = sh x. Comparé à (cos x)′ = −sin x, le signe moins a disparu. Conséquence : ch décroît pour <i>x</i> &lt; 0 (sh &lt; 0) et croît pour <i>x</i> &gt; 0, avec son minimum 1 en 0.`)
  +bk('def',`La <b>tangente hyperbolique</b> est <b>th x = ${F('sh x','ch x')} = ${F('eˣ − e⁻ˣ','eˣ + e⁻ˣ')}</b>, définie sur tout ℝ puisque ch ne s’annule jamais.`)
  +bk('prop',`<b>(th x)′ = ${F(1,'ch² x')} = 1 − th² x</b>. Règle du quotient : (sh′·ch − sh·ch′)/ch² = (ch² − sh²)/ch² = 1/ch² ; puis en divisant ch² − sh² = 1 par ch², on obtient 1 − th² = 1/ch².`)
  +bk('ex',`th 0 = 0 et th′(0) = 1 : th part de l’origine avec la pente 1, comme sh. Mais th 2 ≈ 0,964 et th 3 ≈ 0,995 : la courbe s’aplatit vite, comme le montre la figure.`),
  fig:(()=>{ const P=plane({x:[-4,4],y:[-1.5,1.5],h:160,lab:1}); P.seg(-4,1,4,1,{c:'var(--muted)',w:1,dash:true}).seg(-4,-1,4,-1,{c:'var(--muted)',w:1,dash:true}).fn(Math.tanh).text(-3.8,1,'y = 1',{dy:-6,c:'var(--muted)',s:11}); return P.svg(); })(),
  note:'th est impaire, strictement croissante, à valeurs dans ]−1 ; 1[, avec deux asymptotes horizontales y = ±1.'},
 {kind:'Théorie',h:'Pourquoi th reste entre −1 et 1',p:`<p>La figure précédente montre th coincée entre les droites y = −1 et y = 1. Pourquoi ? Et pourquoi sa dérivée 1 − th² devient-elle presque nulle pour <i>x</i> grand ?</p>`
  +bk('prop',`Pour tout <i>x</i> : <b>−1 &lt; th x &lt; 1</b>. th est impaire, strictement croissante, et <b>th x → 1</b> quand x → +∞, th x → −1 quand x → −∞.`)
  +bk('why',`|sh x| &lt; ch x, car ch² = 1 + sh² &gt; sh². Donc |th x| &lt; 1. Croissance : th′ = 1/ch² &gt; 0. Limite : en divisant haut et bas par eˣ, th x = ${F('1 − e⁻²ˣ','1 + e⁻²ˣ')}, et e⁻²ˣ → 0 quand x → +∞, d’où th x → 1. L’imparité donne la limite −1 en −∞.`)
  +bk('ex',`th 1 = 1,175/1,543 ≈ 0,762 ; th 2 ≈ 0,964 ; th 3 ≈ 0,995. À partir de x = 3, th x vaut 1 à 0,5 % près.`)
  +bk('idea',`th envoie ℝ tout entier sur l’intervalle ]−1 ; 1[ de façon lisse et croissante : c’est une fonction de <b>saturation</b>. La vitesse d’un corps freiné par l’air suit une th : elle tend vers une vitesse limite sans jamais la dépasser (problème de fin de chapitre).`),
  fig:(()=>{ const P=plane({x:[-4,4],y:[-1.5,1.5],h:160,lab:1}); P.seg(-4,1,4,1,{c:'var(--muted)',w:1,dash:true}).seg(-4,-1,4,-1,{c:'var(--muted)',w:1,dash:true}).fn(Math.tanh).fn(x=>1-Math.tanh(x)**2,{c:'var(--spark)',w:1.5}).text(2.2,.4,'th′ = 1 − th²',{c:'var(--spark)',s:11}); return P.svg(); })(),
  note:'En jaune, la dérivée 1 − th² x : elle vaut 1 en 0 et s’écrase vers 0 des deux côtés.'},
 {kind:'Méthode',h:'Calculer ch, sh, th en x = ln a',p:`<b>Quand</b> : l’argument est un logarithme, comme ch(ln 3) ou th(ln 2). <b>Pourquoi ça marche</b> : ${E('ln a')} = a et ${E('−ln a')} = 1/a, donc les exponentielles de la définition disparaissent. <b>Comment</b> : remplace ${E('x')} par a et ${E('−x')} par 1/a dans les définitions : <b>ch(ln a) = ${F('a + 1/a','2')}</b>, <b>sh(ln a) = ${F('a − 1/a','2')}</b>, puis th = sh/ch.`,
  demo:{enonce:'Calcule ch(ln 3), sh(ln 3) et th(ln 3).',etapes:[
   {f:`${E('ln 3')} = 3 et ${E('−ln 3')} = 1/3`,w:'exp et ln sont réciproques, et e^(−y) = 1/e^y.'},
   {f:'ch(ln 3) = (3 + 1/3)/2 = (10/3)/2 = 5/3',w:'On applique la définition ch x = (eˣ + e⁻ˣ)/2.'},
   {f:'sh(ln 3) = (3 − 1/3)/2 = (8/3)/2 = 4/3',w:'Même chose avec sh x = (eˣ − e⁻ˣ)/2.'},
   {f:'th(ln 3) = (4/3)/(5/3) = 4/5',w:'th = sh/ch : les dénominateurs 3 se simplifient.'},
   {f:'Contrôle : (5/3)² − (4/3)² = (25 − 16)/9 = 1',w:'ch² − sh² = 1 doit toujours être vérifié.'}],
   conclusion:'ch(ln 3) = 5/3, sh(ln 3) = 4/3, th(ln 3) = 4/5.'},
  note:'Raccourci : th(ln a) = (a² − 1)/(a² + 1), en multipliant haut et bas par 2a.'},
 {h:'th(ln 2)',p:'Calcule <i>th(ln 2)</i> exactement (donne une valeur décimale).',lab:'th(ln 2) =',ans:.6,tol:.001,
  why:'e^(ln 2) = 2 et e^(−ln 2) = ½. Donc sh(ln 2) = (2 − ½)/2 = ¾, ch(ln 2) = (2 + ½)/2 = 5/4, et th(ln 2) = (3/4)/(5/4) = 3/5 = 0,6.'},
 {kind:'Méthode',h:'Identités hyperboliques',p:`<b>Quand</b> : on connaît ch x ou sh x et on veut l’autre, ou une valeur en 2x. <b>Pourquoi ça marche</b> : tout se ramène à ${E('x')} et ${E('−x')}. En développant, on obtient <b>sh 2x = 2 sh x ch x</b> et <b>ch 2x = ch² x + sh² x</b>, et on sait que ch² x − sh² x = 1. <b>Comment</b> : passe de ch à sh avec ch² − sh² = 1, en choisissant le signe : <b>ch x = √(1 + sh² x)</b> toujours (ch &gt; 0), mais sh x a le signe de x.`,
  demo:{enonce:'Sachant que ch x = 5/4 et x &gt; 0, calcule sh x et sh 2x.',etapes:[
   {f:`2 sh x ch x = 2 · ${F('eˣ − e⁻ˣ','2')} · ${F('eˣ + e⁻ˣ','2')} = ${F('e²ˣ − e⁻²ˣ','2')} = sh 2x`,w:'On prouve la formule en revenant aux exponentielles : (a − b)(a + b) = a² − b².'},
   {f:'sh² x = ch² x − 1 = 25/16 − 1 = 9/16',w:'ch² − sh² = 1.'},
   {f:'sh x = 3/4',w:'x &gt; 0 et sh est impaire, croissante, nulle en 0 : sh x &gt; 0, on garde la racine positive.'},
   {f:'sh 2x = 2 · 3/4 · 5/4 = 15/8',w:'On applique la formule démontrée à la première étape.'}],
   conclusion:'sh x = 3/4 et sh 2x = 15/8 = 1,875.'},
  note:'Les formules ressemblent à celles de la trigonométrie, mais sans les signes moins : cos 2x = cos² x − sin² x devient ch 2x = ch² x + sh² x.'},
 {h:'ch 2x à partir de sh x',p:'On sait que <i>sh x = 12/5</i>. Calcule <i>ch 2x</i> (donne une valeur décimale).',lab:'ch 2x =',ans:12.52,tol:.001,
  why:'ch² x = 1 + sh² x = 1 + 144/25 = 169/25. Puis ch 2x = ch² x + sh² x = 169/25 + 144/25 = 313/25 = 12,52.'},
 {kind:'Méthode',h:'Résoudre ch x = a : poser u = eˣ',p:`<b>Quand</b> : une équation contient ch x, sh x, ou un mélange de ${E('x')} et ${E('−x')}. <b>Pourquoi ça marche</b> : avec <b>u = ${E('x')} &gt; 0</b>, on a ${E('−x')} = 1/u, et en multipliant par u l’équation devient un <b>trinôme en u</b>. <b>Comment</b> : pose u, multiplie par u, résous le trinôme, garde les racines u &gt; 0, puis reviens à x = ln u.`,
  demo:{enonce:'Résous ch x = 5/4.',etapes:[
   {f:'(u + 1/u)/2 = 5/4, avec u = eˣ &gt; 0',w:'On remplace eˣ par u et e⁻ˣ par 1/u.'},
   {f:'2u² − 5u + 2 = 0',w:'On multiplie par 4u ≠ 0 : 2u² + 2 = 5u.'},
   {f:'Δ = 25 − 16 = 9, u = (5 ± 3)/4 : u = 2 ou u = 1/2',w:'Trinôme habituel. Les deux racines sont positives, elles conviennent.'},
   {f:'x = ln 2 ou x = ln(1/2) = −ln 2',w:'On revient à x = ln u. ch est paire : les solutions sont opposées.'}],
   conclusion:'ch x = 5/4 ⇔ x = ±ln 2.'},
  note:'Une racine u ≤ 0 est à rejeter : eˣ est toujours strictement positif. Et ch x = a n’a pas de solution si a &lt; 1.'},
 {h:'Résoudre ch x = 5/3',p:'Quelle est la solution positive de <i>ch x = 5/3</i>&nbsp;? Arrondis au centième.',lab:'x =',ans:1.1,tol:.006,
  why:'Avec u = eˣ : u + 1/u = 10/3, soit 3u² − 10u + 3 = 0, donc u = 3 ou u = 1/3. La solution positive est x = ln 3 ≈ 1,10.'},
 {kind:'Théorie',h:'Les réciproques',p:`<p>sh est une bijection de ℝ sur ℝ : chaque réel <i>x</i> est atteint par un seul <i>y</i>. On peut donc définir la fonction réciproque et, chance des hyperboliques, l’écrire avec un logarithme.</p>`
  +bk('def',`<b>argsh</b> (argument sinus hyperbolique) est la réciproque de sh : y = argsh x ⇔ x = sh y. De même <b>argch</b> est la réciproque de ch restreinte à [0 ; +∞[, définie sur [1 ; +∞[, et <b>argth</b> la réciproque de th, définie sur ]−1 ; 1[.`)
  +bk('why',`Résolvons sh y = x. Avec u = ${E('y')} &gt; 0 : (u − 1/u)/2 = x, soit u² − 2xu − 1 = 0, de discriminant 4x² + 4 &gt; 0. Les racines sont x ± √(x² + 1) ; comme √(x² + 1) &gt; |x|, seule x + √(x² + 1) est positive. Donc <b>argsh x = ln(x + √(x² + 1))</b>. Le même calcul donne <b>argch x = ln(x + √(x² − 1))</b> pour x ≥ 1, et <b>argth x = ½ ln${F('1 + x','1 − x')}</b> pour |x| &lt; 1.`)
  +bk('ex',`argsh 1 = ln(1 + √2) ≈ 0,881. Contrôle : sh(0,881) = (${E('0,881')} − ${E('−0,881')})/2 ≈ (2,413 − 0,414)/2 ≈ 1,00.`)
  +bk('warn',`Pour argch, il faut restreindre ch à [0 ; +∞[ car ch est paire : ch y = 2 a deux solutions opposées, et argch 2 désigne la positive, ln(2 + √3) ≈ 1,317.`),
  fig:(()=>{ const P=plane({x:[-3,3],y:[-3,3],lab:1}); P.seg(-3,-3,3,3,{c:'var(--muted)',w:1,dash:true}).fn(sh,{c:'var(--spark)'}).fn(x=>Math.log(x+Math.sqrt(x*x+1)),{c:'var(--math)'}).text(1.5,2.6,'sh',{c:'var(--spark)'}).text(2.2,1.0,'argsh',{c:'var(--math)'}); return P.svg(); })(),
  note:'Les graphes de sh et argsh sont symétriques par rapport à la droite y = x, comme pour toute bijection et sa réciproque. Et (argsh x)′ = 1/√(x² + 1).'},
 {h:'Un argsh exact',p:'Calcule <i>argsh(4/3)</i>, arrondi au centième.',lab:'argsh(4/3) =',ans:1.1,tol:.006,
  why:'√(16/9 + 1) = √(25/9) = 5/3. Donc argsh(4/3) = ln(4/3 + 5/3) = ln 3 ≈ 1,10.'},
 {kind:'Méthode',h:'Dériver une réciproque hyperbolique',p:`<b>Quand</b> : on veut la dérivée de argsh, argch ou argth sans dériver un logarithme compliqué. <b>Pourquoi ça marche</b> : si y = f⁻¹(x), alors x = f(y) et <b>(f⁻¹)′(x) = ${F(1,'f′(y)')}</b>. Il reste à exprimer f′(y) avec x, grâce à <b>ch² − sh² = 1</b>. <b>Comment</b> : pose y, écris x = f(y), dérive, puis élimine y.`,
  demo:{enonce:'Calcule la dérivée de argch x pour x &gt; 1.',etapes:[
   {f:'y = argch x ⇔ x = ch y, avec y ≥ 0',w:'argch est la réciproque de ch restreint à [0 ; +∞[.'},
   {f:`(argch)′(x) = ${F(1,'ch′(y)')} = ${F(1,'sh y')}`,w:'Dérivée d’une réciproque, et (ch y)′ = sh y.'},
   {f:'sh y = √(ch² y − 1) = √(x² − 1)',w:'ch² − sh² = 1, et sh y ≥ 0 car y ≥ 0 : on garde la racine positive.'},
   {f:`(argch x)′ = ${F(1,'√(x² − 1)')}`,w:'On remplace ch y par x.'}],
   conclusion:'(argch x)′ = 1/√(x² − 1) pour x &gt; 1. De même, (argth x)′ = 1/(1 − th² y) = 1/(1 − x²).'},
  note:'Contrôle possible : dériver ln(x + √(x² − 1)) donne le même résultat, avec plus de calculs.'},
 {kind:'Défi',h:'Dérivée de argsh',p:'Quelle est la dérivée de <i>argsh x</i>&nbsp;?',opts:['1/√(1 − x²)','1/(1 + x²)','1/√(x² + 1)','1/√(x² − 1)'],ans:2,
  why:'Si y = argsh x, alors x = sh y et dx/dy = ch y = √(1 + sh² y) = √(1 + x²). Donc y′ = 1/√(x² + 1). Les autres sont les dérivées d’arcsin, arctan et argch.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Les fonctions hyperboliques se calculent toutes avec eˣ et e⁻ˣ : en cas de doute, reviens aux définitions.</p>`
  +keep([`<b>Définitions</b> : ch x = (eˣ + e⁻ˣ)/2 (paire, ≥ 1), sh x = (eˣ − e⁻ˣ)/2 (impaire, croissante), th x = sh x/ch x (impaire, à valeurs dans ]−1 ; 1[). ch x + sh x = eˣ.`,
   `<b>Relation fondamentale</b> : ch² x − sh² x = 1, d’où ch x = √(1 + sh² x). Identités : sh 2x = 2 sh x ch x, ch 2x = ch² x + sh² x.`,
   `<b>Dérivées</b> : (sh)′ = ch, (ch)′ = sh, (th)′ = 1/ch² = 1 − th². Pas de signe moins.`,
   `<b>En x = ln a</b> : eˣ = a et e⁻ˣ = 1/a, donc ch(ln a) = (a + 1/a)/2, sh(ln a) = (a − 1/a)/2.`,
   `<b>Équation</b> ch x = a ou sh x = a : poser u = eˣ &gt; 0, multiplier par u, résoudre le trinôme, garder u &gt; 0, revenir à x = ln u.`,
   `<b>Réciproques</b> : argsh x = ln(x + √(x² + 1)) sur ℝ, argch x = ln(x + √(x² − 1)) sur [1 ; +∞[, argth x = ½ ln((1 + x)/(1 − x)) sur ]−1 ; 1[. Dérivées : 1/√(x² + 1), 1/√(x² − 1), 1/(1 − x²).`,
   `<b>Piège</b> : ch² + sh² ≠ 1, et une racine u ≤ 0 d’un trinôme en u = eˣ est toujours à rejeter.`])},
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
 {kind:'Théorie',h:'Pourquoi inventer un nombre i',p:`<p>Dans ℝ, l’équation x² = −1 n’a pas de solution : un carré n’est jamais négatif. Pendant longtemps on s’en est contenté. Puis, au 16e siècle, des algébristes qui résolvaient des équations de degré 3 ont remarqué qu’en calculant « comme si » un nombre de carré −1 existait, ils obtenaient des solutions réelles justes. L’outil marchait : il fallait lui donner un statut.</p>`
  +bk('def',`On introduit un nouveau nombre, noté <b>i</b>, avec une seule règle : <b>i² = −1</b>. L’ensemble ℂ des <b>nombres complexes</b> est formé des expressions a + bi avec <i>a</i>, <i>b</i> réels, qu’on additionne et multiplie avec les règles habituelles (commutativité, distributivité), en remplaçant i² par −1 dès qu’il apparaît.`)
  +bk('idea',`Rien d’autre ne change : tout ce que tu sais faire avec des lettres reste valable. ℝ est inclus dans ℂ (ce sont les a + 0i). Le prix à payer est léger : on perd l’ordre (il n’y a pas de « i &lt; 2 ») mais on gagne la résolution de toutes les équations polynomiales.`)
  +bk('ex',`(2 + i)(2 − i) = 4 − i² = 4 + 1 = 5 : un produit de deux non-réels peut être réel. Et (1 + i)² = 1 + 2i + i² = 2i : le carré de 1 + i est un imaginaire pur.`)
  +bk('warn',`N’écris pas √(−1) : la racine carrée est réservée aux réels positifs, et dans ℂ il y a deux nombres de carré −1, i et −i, sans moyen de préférer l’un à l’autre.`)},
 {kind:'Théorie',h:'z = a + bi',p:`<p>Un complexe est donné par deux réels. Donnons-leur un nom et une image.</p>`
  +bk('def',`Tout complexe s’écrit <b>d’une seule façon</b> <i>z = a + bi</i> avec <i>a</i>, <i>b</i> réels : <i>a</i> est la <b>partie réelle</b> Re <i>z</i>, <i>b</i> la <b>partie imaginaire</b> Im <i>z</i> (un réel, sans le i). Si b = 0, <i>z</i> est réel ; si a = 0, <i>z</i> est <b>imaginaire pur</b>. Le <b>conjugué</b> est <b>z̄ = a − bi</b>, le <b>module</b> est <b>|z| = √(a² + b²)</b>.`)
  +bk('idea',`On représente <i>z</i> par le point (ou le vecteur) de coordonnées (a ; b) : l’axe horizontal porte les réels, l’axe vertical les imaginaires purs. |z| est la longueur de la flèche (Pythagore), et z̄ est le symétrique de <i>z</i> par rapport à l’axe réel : on garde <i>a</i>, on change le signe de <i>b</i>.`)
  +bk('why',`L’unicité de l’écriture vient de ceci : si a + bi = c + di avec b ≠ d, alors i = (c − a)/(b − d) serait un réel, dont le carré ne pourrait pas valoir −1. Donc b = d, puis a = c.`)
  +bk('ex',`z = 3 + 2i : Re z = 3, Im z = 2, z̄ = 3 − 2i, |z| = √(9 + 4) = √13 ≈ 3,606. Le conjugué a le même module, √(9 + 4) encore.`)
  +bk('warn',`Im(3 + 2i) vaut 2, pas 2i. Et |z| est un réel positif : on ne compare pas des complexes entre eux, mais on peut comparer leurs modules.`),
  params:[{id:'a',l:'Partie réelle a',min:-4,max:4,v:3},{id:'b',l:'Partie imaginaire b',min:-4,max:4,v:2}],
  draw:v=>{ const P=cpl(); P.seg(v.a,v.b,v.a,-v.b,{c:'var(--muted)',w:1.5,dash:true}).arrow(0,0,v.a,v.b).arrow(0,0,v.a,-v.b,{c:'var(--math)',w:2}).dot(v.a,v.b,{l:'z'}).dot(v.a,-v.b,{c:'var(--math)',l:'z̄',dy:16}); return P.svg(); },
  info:v=>`z = ${cz(v.a,v.b)} · z̄ = ${cz(v.a,-v.b)} · |z| = √${v.a*v.a+v.b*v.b} ≈ ${fmt(Math.hypot(v.a,v.b))}`,
  note:'Le conjugué est le symétrique de z par rapport à l’axe réel. z est réel si et seulement si z = z̄.'},
 {kind:'Méthode',h:'Calculer en forme algébrique',p:'<b>Quand</b> : sommes, produits et puissances de nombres a + bi. <b>Pourquoi ça marche</b> : on calcule avec i comme avec une lettre (mêmes règles de distributivité), puis on utilise <b>i² = −1</b>. Les puissances de i tournent en boucle : <b>i⁰ = 1, i¹ = i, i² = −1, i³ = −i</b>, puis i⁴ = 1 et ça recommence. <b>Comment</b> : développe, remplace chaque i² par −1, puis regroupe partie réelle et partie imaginaire. Pour iⁿ, prends le reste de n dans la division par 4.',
  demo:{enonce:'Calcule (1 + 2i)² − (3 − i)(2 + i), puis i⁵⁰.',etapes:[
   {f:'(1 + 2i)² = 1 + 4i + 4i² = 1 + 4i − 4 = −3 + 4i',w:'Identité (a + b)² = a² + 2ab + b², puis i² = −1.'},
   {f:'(3 − i)(2 + i) = 6 + 3i − 2i − i² = 6 + i + 1 = 7 + i',w:'On distribue les quatre produits, puis −i² = +1.'},
   {f:'(−3 + 4i) − (7 + i) = −10 + 3i',w:'On soustrait parties réelles et parties imaginaires séparément.'},
   {f:'50 = 4 · 12 + 2, donc i⁵⁰ = (i⁴)¹² · i² = −1',w:'i⁴ = 1 : seul le reste de la division par 4 compte.'}],
   conclusion:'(1 + 2i)² − (3 − i)(2 + i) = −10 + 3i et i⁵⁰ = −1.'},
  note:'Piège : (a + bi)² n’est pas a² + b²i². Le double produit 2abi ne disparaît pas.'},
 {h:'Multiplier',p:'Calcule <i>(2 + 3i)(1 − i)</i>.',opts:['2 − 3i','−1 + i','5 + i','5 − i'],ans:2,
  why:'On développe : 2 − 2i + 3i − 3i² = 2 + i + 3 = 5 + i, car −3i² = +3.'},
 {h:'Puissances de i',p:'Calcule la partie imaginaire de <i>i²⁰²⁷ + (1 + i)²</i>.',lab:'Im =',ans:1,
  why:'2027 = 4 · 506 + 3, donc i²⁰²⁷ = i³ = −i. Et (1 + i)² = 1 + 2i − 1 = 2i. La somme vaut i, de partie imaginaire 1.'},
 {kind:'Théorie',h:'Le module est une distance',p:`<p>Le module mesure la longueur de la flèche de 0 à <i>z</i>. Il mesure aussi la distance entre deux points quelconques du plan, ce qui en fait l’outil géométrique de base des complexes.</p>`
  +bk('prop',`Pour deux complexes <i>z</i> et <i>w</i>, <b>|z − w| est la distance</b> entre les points <i>z</i> et <i>w</i>. En particulier, l’ensemble des <i>z</i> tels que |z − w| = r est le <b>cercle</b> de centre <i>w</i> et de rayon <i>r</i>.`)
  +bk('why',`Si z = a + bi et w = c + di, alors z − w = (a − c) + (b − d)i et |z − w| = √((a − c)² + (b − d)²) : c’est la formule de la distance entre les points (a ; b) et (c ; d).`)
  +bk('prop',`<b>Inégalité triangulaire</b> : |z + w| ≤ |z| + |w|. La flèche de z + w (z et w mis bout à bout) est plus courte que le chemin qui passe par z puis par w : un côté d’un triangle est plus court que la somme des deux autres.`)
  +bk('ex',`Distance entre 3 + 2i et 1 − i : |(3 + 2i) − (1 − i)| = |2 + 3i| = √13 ≈ 3,61. Et |(3 + 4i) + (3 − 4i)| = |6| = 6 &lt; 5 + 5 = 10.`)
  +bk('warn',`Il n’existe pas de formule |z + w| = |z| + |w| : l’égalité n’a lieu que si <i>z</i> et <i>w</i> pointent dans la même direction. Pour les produits, en revanche, tout est simple (étape suivante).`),
  fig:(()=>{ const P=cpl(5,2); P.circ(1,-1,Math.sqrt(13),{c:'var(--muted)',w:1,dash:true}).seg(1,-1,3,2,{c:'var(--spark)',w:2.5}).dot(3,2,{l:'3 + 2i'}).dot(1,-1,{c:'var(--math)',l:'1 − i',dy:16}).text(2.4,.2,'√13',{c:'var(--spark)',s:12}); return P.svg(); })(),
  note:'Le cercle en pointillés est l’ensemble des z tels que |z − (1 − i)| = √13 : il passe par 3 + 2i.'},
 {kind:'Théorie',h:'z·z̄ = |z|²',p:`<p>Multiplier un complexe par son conjugué fait disparaître i. C’est la clé de la division, et la raison pour laquelle le module se comporte si bien avec les produits.</p>`
  +bk('prop',`<b>z·z̄ = |z|²</b>, un réel positif. Et <b>|zw| = |z|·|w|</b> : le module d’un produit est le produit des modules.`)
  +bk('why',`(a + bi)(a − bi) = a² − (bi)² = a² − b²i² = a² + b² = |z|². Pour le produit : |zw|² = zw·${ov('zw')} = z z̄ · w w̄ = |z|²|w|², en utilisant que le conjugué d’un produit est le produit des conjugués (démontré deux étapes plus loin). On prend la racine : |zw| = |z||w|.`)
  +bk('ex',`(3 + 4i)(3 − 4i) = 9 + 16 = 25 = 5². Et (2 + i)(1 + 3i) = 2 + 6i + i + 3i² = −1 + 7i, de module √50 ≈ 7,07, qui vaut bien √5 · √10 = √50.`)
  +bk('idea',`Sur la figure, <i>z</i> et z̄ sont sur le même cercle centré en 0 : même module 5. Leur produit tombe sur l’axe réel, au point 25 = |z|².`),
  fig:(()=>{ const P=cpl(5,2); P.circ(0,0,Math.hypot(3,4),{c:'var(--muted)',w:1.5,dash:true}).arrow(0,0,3,4).arrow(0,0,3,-4,{c:'var(--math)'}).dot(3,4,{l:'3 + 4i'}).dot(3,-4,{c:'var(--math)',l:'3 − 4i',dy:16}).text(-4.6,4,'|z| = 5',{s:12}); return P.svg(); })(),
  note:'Piège : |z + w| n’est pas |z| + |w| en général. On a seulement l’inégalité triangulaire |z + w| ≤ |z| + |w|.'},
 {h:'Un module',p:'Calcule <i>|−5 + 12i|</i>.',lab:'|z| =',ans:13,why:'|−5 + 12i| = √(25 + 144) = √169 = 13.'},
 {kind:'Théorie',h:'Le conjugué passe aux opérations',p:`<p>Conjuguer, c’est changer i en −i. Comme la règle i² = −1 vaut aussi pour −i, tout calcul fait avec i reste juste avec −i : c’est pourquoi la conjugaison est compatible avec toutes les opérations.</p>`
  +bk('prop',`Pour tous <i>z</i>, <i>w</i> : <b>${ov('z + w')} = z̄ + w̄</b>, <b>${ov('zw')} = z̄·w̄</b>, ${ov('z/w')} = z̄/w̄, ${ov('zⁿ')} = (z̄)ⁿ, et ${ov('z̄')} = z. De plus <b>Re z = ${F('z + z̄',2)}</b> et <b>Im z = ${F('z − z̄','2i')}</b>.`)
  +bk('why',`Pour le produit : avec z = a + bi et w = c + di, zw = (ac − bd) + (ad + bc)i, donc ${ov('zw')} = (ac − bd) − (ad + bc)i. Et z̄·w̄ = (a − bi)(c − di) = (ac − bd) − (ad + bc)i : c’est pareil. Pour la somme, on conjugue chaque partie. Enfin z + z̄ = 2a et z − z̄ = 2bi, d’où les formules de Re et Im.`)
  +bk('ex',`z = 1 + 2i, w = 3 − i : zw = 3 − i + 6i − 2i² = 5 + 5i, et z̄·w̄ = (1 − 2i)(3 + i) = 3 + i − 6i − 2i² = 5 − 5i, qui est bien le conjugué de 5 + 5i.`)
  +bk('idea',`Conséquence importante : si P est un polynôme à coefficients <b>réels</b>, ${ov('P(z)')} = P(z̄), car conjuguer chaque terme aₖzᵏ donne aₖ(z̄)ᵏ. Les racines non réelles d’un tel polynôme vont donc par paires conjuguées, comme 2 + 3i et 2 − 3i.`)
  +bk('warn',`<i>z</i> est réel si et seulement si z = z̄, imaginaire pur si et seulement si z̄ = −z. Ces critères remplacent souvent un calcul de parties réelle et imaginaire.`)},
 {kind:'Méthode',h:'Un module sans développer',p:`<b>Quand</b> : on veut le module d’un produit, d’un quotient ou d’une puissance. <b>Pourquoi ça marche</b> : |zw|² = zw·<span style="text-decoration:overline">zw</span> = z z̄ · w w̄ = |z|²|w|², donc <b>|zw| = |z|·|w|</b>, et par suite <b>|z/w| = |z|/|w|</b> et <b>|zⁿ| = |z|ⁿ</b>. <b>Comment</b> : calcule le module de chaque morceau, puis combine. Et <b>|z − w|</b> est la <b>distance</b> entre les points z et w du plan.`,
  demo:{enonce:'Calcule |(3 + 4i)²/(1 − i)|.',etapes:[
   {f:'|3 + 4i| = √(9 + 16) = 5, donc |(3 + 4i)²| = 25',w:'|zⁿ| = |z|ⁿ : inutile de développer le carré.'},
   {f:'|1 − i| = √(1 + 1) = √2',w:'Module du dénominateur.'},
   {f:'|(3 + 4i)²/(1 − i)| = 25/√2 ≈ 17,68',w:'|z/w| = |z|/|w|.'}],
   conclusion:'Le module vaut 25/√2 ≈ 17,68, sans avoir calculé le quotient.'},
  note:'Il n’y a pas de règle pour la somme : |z + w| ≤ |z| + |w| seulement.'},
 {h:'Module d’un quotient',p:'Calcule <i>|(1 + 2i)³/(2 − i)|</i>.',lab:'module =',ans:5,tol:.001,
  why:'|1 + 2i| = |2 − i| = √5. Le module vaut (√5)³/√5 = (√5)² = 5.'},
 {kind:'Méthode',h:'Inverser et diviser',p:`<b>Quand</b> : un complexe non réel est au dénominateur. <b>Pourquoi ça marche</b> : z·z̄ = |z|² est réel, donc multiplier haut et bas par le conjugué rend le dénominateur réel. <b>Comment</b> : pour <i>z ≠ 0</i>, <b>${F(1,'z')} = ${F('z̄','|z|²')}</b>. Exemple : ${F(1,'1 + i')} = ${F('1 − i','2')} = ½ − ½i. Pour diviser, même idée : ${F('z','w')} = ${F('z·w̄','|w|²')}. Le dénominateur devient réel.`,
  demo:{enonce:'Écris (3 + i)/(1 + 2i) sous la forme a + bi.',etapes:[
   {f:`${F('3 + i','1 + 2i')} = ${F('(3 + i)(1 − 2i)','(1 + 2i)(1 − 2i)')}`,w:'On multiplie haut et bas par le conjugué du dénominateur, 1 − 2i.'},
   {f:'(1 + 2i)(1 − 2i) = 1 + 4 = 5',w:'z z̄ = a² + b² : le dénominateur est réel.'},
   {f:'(3 + i)(1 − 2i) = 3 − 6i + i − 2i² = 5 − 5i',w:'On développe le numérateur, avec −2i² = +2.'},
   {f:'(5 − 5i)/5 = 1 − i',w:'On divise parties réelle et imaginaire par le réel 5.'},
   {f:'Contrôle : (1 − i)(1 + 2i) = 1 + 2i − i − 2i² = 3 + i',w:'On remultiplie pour vérifier.'}],
   conclusion:'(3 + i)/(1 + 2i) = 1 − i.'},
  note:'Vérifie toujours : (1 + i)(½ − ½i) = ½ − ½i + ½i − ½i² = ½ + ½ = 1. Une équation (1 + i)z = 3 − i se résout de la même façon : z = (3 − i)/(1 + i).'},
 {h:'Un inverse',p:'Que vaut <i>1/(3 + 4i)</i>&nbsp;?',opts:['1/3 + i/4','(3 − 4i)/25','(3 − 4i)/5','(−3 + 4i)/25'],ans:1,
  why:'1/(3 + 4i) = (3 − 4i)/((3 + 4i)(3 − 4i)) = (3 − 4i)/(9 + 16) = (3 − 4i)/25.'},
 {h:'Additionner, c’est translater',p:'Dans le plan, <i>z + w</i> s’obtient par la règle du parallélogramme : on met les flèches bout à bout. Ici <i>z = 2 + i</i> est fixe. Règle <i>w</i> pour que <i>z + w</i> tombe sur le point rouge <i>−1 + 3i</i>.',
  params:[{id:'c',l:'Re w',min:-4,max:4,v:0},{id:'d',l:'Im w',min:-4,max:4,v:0}],
  draw:v=>{ const P=cpl(); P.dot(-1,3,{c:'var(--bad)',l:'−1 + 3i'}).arrow(0,0,2,1,{c:'var(--math)'}).arrow(0,0,v.c,v.d,{c:'var(--spark)'}).arrow(2,1,2+v.c,1+v.d,{c:'var(--spark)',w:1.5,dash:true}).arrow(0,0,2+v.c,1+v.d,{w:3.5}).dot(2,1,{c:'var(--math)',r:4,l:'z'}).dot(2+v.c,1+v.d,{r:5,l:'z + w'}); return P.svg(); },
  info:v=>`w = ${cz(v.c,v.d)} · z + w = ${cz(2+v.c,1+v.d)}`,
  ok:v=>v.c===-3&&v.d===2,why:'w = (−1 + 3i) − (2 + i) = −3 + 2i. On soustrait partie réelle et partie imaginaire séparément.'},
 {kind:'Défi',h:'Un quotient',p:'Calcule la partie imaginaire de <i>(1 + 2i)/(1 − i)</i>.',lab:'Im =',ans:1.5,tol:.001,
  why:'(1 + 2i)/(1 − i) = (1 + 2i)(1 + i)/2 = (1 + i + 2i + 2i²)/2 = (−1 + 3i)/2. La partie imaginaire vaut 3/2 = 1,5.'},
 {kind:'Méthode',h:'Identifier parties réelle et imaginaire',p:'<b>Quand</b> : une équation mélange z et z̄, ou on cherche un complexe dont on connaît le carré. <b>Pourquoi ça marche</b> : l’écriture a + bi est <b>unique</b>, donc <b>a + bi = c + di ⇔ a = c et b = d</b>. Une équation complexe vaut deux équations réelles. <b>Comment</b> : pose z = x + iy avec x, y réels, développe, regroupe, puis identifie : tu obtiens un système en x et y.',
  demo:{enonce:'Résous 2z + i z̄ = 3.',etapes:[
   {f:'z = x + iy, z̄ = x − iy',w:'On introduit les deux inconnues réelles.'},
   {f:'2x + 2iy + i(x − iy) = 2x + 2iy + ix + y = (2x + y) + i(x + 2y)',w:'On développe avec i · (−iy) = −i²y = y, puis on regroupe.'},
   {f:'2x + y = 3 et x + 2y = 0',w:'On identifie avec 3 = 3 + 0i : parties réelles, puis parties imaginaires.'},
   {f:'x = −2y, donc −3y = 3 : y = −1 et x = 2',w:'On résout le système par substitution.'},
   {f:'Contrôle : 2(2 − i) + i(2 + i) = 4 − 2i + 2i − 1 = 3',w:'On vérifie dans l’équation de départ.'}],
   conclusion:'La solution est z = 2 − i.'},
  note:'Ne divise pas par z̄ : z et z̄ ne sont pas indépendants, poser z = x + iy est la voie sûre.'},
 {h:'Une équation avec z̄',p:'Résous <i>z + 2z̄ = 6 − i</i>, puis donne <i>|z|²</i>.',lab:'|z|² =',ans:5,
  why:'Avec z = x + iy : x + iy + 2x − 2iy = 3x − iy = 6 − i, donc x = 2 et y = 1. z = 2 + i et |z|² = 4 + 1 = 5.'},
 {kind:'Méthode',h:'La racine carrée d’un complexe',p:'<b>Quand</b> : on cherche δ tel que δ² = Δ, avec Δ = a + bi non réel (typiquement le discriminant d’un trinôme). <b>Pourquoi ça marche</b> : avec δ = x + iy, l’identification de δ² = Δ donne x² − y² = a et 2xy = b, et l’égalité des modules |δ|² = |Δ| ajoute <b>x² + y² = √(a² + b²)</b>. Les deux équations en x² et y² se résolvent par simple addition. <b>Comment</b> : écris les trois équations, trouve x² et y², puis choisis les signes grâce au signe de xy (celui de b).',
  demo:{enonce:'Trouve les racines carrées de 3 + 4i.',etapes:[
   {f:'(x + iy)² = x² − y² + 2ixy = 3 + 4i',w:'On développe δ² et on identifie.'},
   {f:'x² − y² = 3, 2xy = 4, x² + y² = √(9 + 16) = 5',w:'La troisième équation vient des modules : |δ|² = |δ²| = |3 + 4i|.'},
   {f:'2x² = 8 et 2y² = 2 : x² = 4, y² = 1',w:'On additionne puis on soustrait les équations 1 et 3.'},
   {f:'xy = 2 &gt; 0 : x et y de même signe, δ = ±(2 + i)',w:'Sans cette condition, on aurait aussi 2 − i, qui est faux.'},
   {f:'Contrôle : (2 + i)² = 4 + 4i − 1 = 3 + 4i',w:'On vérifie.'}],
   conclusion:'Les racines carrées de 3 + 4i sont 2 + i et −2 − i.'},
  note:'N’écris jamais √(3 + 4i) : pour un complexe, il y a deux racines carrées opposées et aucune n’est « la » racine.'},
 {h:'Racines carrées de 8 − 6i',p:'Quelles sont les racines carrées de <i>8 − 6i</i>&nbsp;?',opts:['±(3 + i)','±(3 − i)','±(1 − 3i)','±(2√2 − i√6)'],ans:1,
  why:'x² − y² = 8, xy = −3 et x² + y² = √(64 + 36) = 10. Donc x² = 9, y² = 1, et xy &lt; 0 : δ = ±(3 − i). Contrôle : (3 − i)² = 9 − 6i − 1 = 8 − 6i.'},
 {kind:'Méthode',h:'Équation du 2e degré dans ℂ',p:`<b>Quand</b> : az² + bz + c = 0 avec a ≠ 0, coefficients réels ou complexes. <b>Pourquoi ça marche</b> : la mise sous forme canonique a(z + b/2a)² = Δ/4a fonctionne dans ℂ comme dans ℝ, et dans ℂ <b>tout Δ a deux racines carrées</b> ±δ. <b>Comment</b> : calcule Δ = b² − 4ac, trouve δ avec δ² = Δ, puis <b>z = ${F('−b ± δ','2a')}</b>. Si les coefficients sont réels et Δ &lt; 0, prends simplement δ = i√(−Δ).`,
  demo:{enonce:'Résous z² − 3z + (3 − i) = 0.',etapes:[
   {f:'Δ = (−3)² − 4(3 − i) = 9 − 12 + 4i = −3 + 4i',w:'Discriminant habituel, calculé en forme algébrique.'},
   {f:'δ = x + iy : x² − y² = −3, 2xy = 4, x² + y² = 5, donc x² = 1, y² = 4 et δ = 1 + 2i',w:'Racine carrée d’un complexe par identification ; xy &gt; 0.'},
   {f:'z = (3 ± (1 + 2i))/2 : z₁ = 2 + i et z₂ = 1 − i',w:'Formule habituelle avec −b = 3 et 2a = 2.'},
   {f:'Contrôle : z₁ + z₂ = 3 et z₁z₂ = (2 + i)(1 − i) = 2 − 2i + i + 1 = 3 − i',w:'Somme = −b/a et produit = c/a : on retrouve les coefficients.'}],
   conclusion:'Les solutions sont 2 + i et 1 − i. Exemple à coefficients réels : z² + 2z + 5 = 0 a Δ = −16, δ = 4i et z = −1 ± 2i.'},
  note:'Avec des coefficients complexes, les deux racines ne sont pas conjuguées en général.'},
 {h:'Coefficients réels, Δ négatif',p:'Résous <i>z² − 4z + 13 = 0</i>. Quelle est la partie imaginaire de la solution qui a une partie imaginaire positive&nbsp;?',lab:'Im z =',ans:3,
  why:'Δ = 16 − 52 = −36, δ = 6i, donc z = (4 ± 6i)/2 = 2 ± 3i. La partie imaginaire positive vaut 3.'},
 {h:'Coefficients complexes',p:'Quelles sont les solutions de <i>z² − (1 + i)z + (2 − i) = 0</i>&nbsp;?',opts:['1 + i et −i','2 + i et −1','1 + 2i et −i','1 − 2i et i'],ans:2,
  why:'Δ = (1 + i)² − 4(2 − i) = 2i − 8 + 4i = −8 + 6i = (1 + 3i)². Donc z = ((1 + i) ± (1 + 3i))/2 : 1 + 2i ou −i. Contrôle : somme 1 + i, produit (1 + 2i)(−i) = 2 − i.'},
 {kind:'Méthode',h:'Somme et produit de deux nombres',p:'<b>Quand</b> : on connaît la somme S et le produit P de deux nombres, réels ou complexes, et on veut les nombres eux-mêmes. Ou on veut contrôler les racines d’un trinôme. <b>Pourquoi ça marche</b> : (t − u)(t − v) = t² − (u + v)t + uv. Donc <b>u et v sont les racines de t² − St + P = 0</b>, et inversement les racines de az² + bz + c ont pour somme −b/a et pour produit c/a. <b>Comment</b> : écris le trinôme t² − St + P et résous-le.',
  demo:{enonce:'Trouve deux nombres complexes de somme 2 et de produit 5.',etapes:[
   {f:'u et v sont racines de t² − 2t + 5 = 0',w:'On applique t² − St + P avec S = 2 et P = 5.'},
   {f:'Δ = 4 − 20 = −16, δ = 4i',w:'Coefficients réels et Δ &lt; 0.'},
   {f:'t = (2 ± 4i)/2 = 1 ± 2i',w:'Formule du 2e degré.'},
   {f:'Contrôle : (1 + 2i) + (1 − 2i) = 2 et (1 + 2i)(1 − 2i) = 1 + 4 = 5',w:'On vérifie somme et produit.'}],
   conclusion:'Les deux nombres sont 1 + 2i et 1 − 2i.'}},
 {h:'Retrouver le trinôme',p:'De quelle équation <i>3 + i</i> et <i>3 − i</i> sont-ils les deux solutions&nbsp;?',opts:['t² + 6t + 10 = 0','t² − 6t + 8 = 0','t² − 6t + 10 = 0','t² − 3t + 1 = 0'],ans:2,
  why:'S = 6 et P = (3 + i)(3 − i) = 9 + 1 = 10, donc t² − 6t + 10 = 0.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Avec les complexes, on calcule comme avec des lettres, plus la règle i² = −1. Le conjugué et le module font le reste.</p>`
  +keep([`<b>Écriture</b> : z = a + bi unique, a = Re z, b = Im z réels. a + bi = c + di ⇔ a = c et b = d : une équation complexe vaut deux équations réelles.`,
   `<b>Puissances de i</b> : i, −1, −i, 1, puis ça recommence ; pour iⁿ, regarde le reste de n modulo 4.`,
   `<b>Conjugué</b> z̄ = a − bi : ${ov('z + w')} = z̄ + w̄, ${ov('zw')} = z̄ w̄, Re z = (z + z̄)/2, Im z = (z − z̄)/2i. z réel ⇔ z = z̄.`,
   `<b>Module</b> |z| = √(a² + b²) : z z̄ = |z|², |zw| = |z||w|, |z/w| = |z|/|w|, |zⁿ| = |z|ⁿ. |z − w| est la distance entre z et w. Pas de formule pour |z + w|, seulement |z + w| ≤ |z| + |w|.`,
   `<b>Inverse et quotient</b> : 1/z = z̄/|z|², z/w = z w̄/|w|² : on multiplie haut et bas par le conjugué du dénominateur.`,
   `<b>Racine carrée de Δ = a + bi</b> : poser δ = x + iy, puis x² − y² = a, 2xy = b et x² + y² = |Δ|. Choisir les signes avec celui de b.`,
   `<b>Degré 2 dans ℂ</b> : z = (−b ± δ)/2a avec δ² = Δ ; coefficients réels et Δ &lt; 0 : δ = i√(−Δ), racines conjuguées. Somme −b/a, produit c/a.`])},
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
 {kind:'Théorie',h:'Forme polaire',p:`<p>Un point du plan se repère par ses coordonnées (a ; b), mais aussi par sa distance à l’origine et la direction dans laquelle on le voit. Pour les complexes, cette seconde description rend les produits et les puissances presque évidents.</p>`
  +bk('def',`Pour z ≠ 0, le <b>module</b> r = |z| est la distance à l’origine, et un <b>argument</b> θ = arg <i>z</i> est l’angle orienté entre l’axe réel et la flèche de <i>z</i>, en radians. La <b>forme trigonométrique</b> est <b>z = r(cos θ + i sin θ)</b>, qu’on écrit aussi <b>z = r·${E('iθ')}</b> (forme exponentielle, expliquée à l’étape suivante).`)
  +bk('idea',`La figure montre le triangle rectangle : <b>a = r cos θ</b> et <b>b = r sin θ</b>. Le module dit « à quelle distance », l’argument dit « dans quelle direction ». Le nombre 0 n’a pas d’argument : toutes les directions se valent.`)
  +bk('ex',`z = 1 + i : r = √2 et θ = π/4 (45°), car cos 45° = sin 45° = √2/2. Donc 1 + i = √2·${E('iπ/4')}. Inversement, 2${E('iπ/3')} = 2(cos 60° + i sin 60°) = 1 + i√3.`)
  +bk('warn',`L’argument n’est défini qu’à 2π près : θ et θ + 2π désignent la même direction. On choisit souvent la valeur dans ]−π ; π], l’<b>argument principal</b>. Ainsi arg(−i) = −π/2 plutôt que 3π/2, même si les deux sont corrects.`),
  params:[{id:'r',l:'Module r',min:.5,max:4,step:.5,v:3},{id:'t',l:'Argument θ',min:0,max:345,step:15,v:45,u:'°'}],
  draw:v=>{ const a=v.r*Math.cos(rad(v.t)), b=v.r*Math.sin(rad(v.t)), P=cpl(); P.circ(0,0,v.r,{c:'var(--muted)',w:1,dash:true}).curve(t=>.8*Math.cos(t),t=>.8*Math.sin(t),0,rad(v.t),{c:'var(--spark)',w:2})
    .seg(a,0,a,b,{c:'var(--muted)',w:1.5,dash:true}).arrow(0,0,a,b).dot(a,b,{l:'z'}); return P.svg(); },
  info:v=>`z = ${fmt(v.r,1)}·e${sup('i·'+v.t+'°')} = ${cz(v.r*Math.cos(rad(v.t)),v.r*Math.sin(rad(v.t)))}`,
  note:'L’argument n’est défini qu’à 2π près : θ et θ + 360° donnent le même point. On choisit souvent θ dans ]−π ; π].'},
 {kind:'Théorie',h:'Pourquoi écrire e^(iθ)',p:`<p>Écrire cos θ + i sin θ sous la forme ${E('iθ')} ressemble à un abus : qu’est-ce que l’exponentielle d’un imaginaire ? C’est une notation, mais elle est choisie parce qu’elle a toutes les propriétés d’une exponentielle.</p>`
  +bk('def',`<b>Formule d’Euler</b> : pour θ réel, <b>${E('iθ')} = cos θ + i sin θ</b>. C’est un complexe de module 1 (car cos² θ + sin² θ = 1) : le point du cercle unité d’angle θ.`)
  +bk('why',`La propriété fondamentale d’une exponentielle est ${E('a+b')} = ${E('a')}${E('b')}. Vérifions-la : (cos α + i sin α)(cos β + i sin β) = (cos α cos β − sin α sin β) + i(sin α cos β + cos α sin β) = cos(α + β) + i sin(α + β), par les formules d’addition. Donc <b>${E('iα')}·${E('iβ')} = ${E('i(α+β)')}</b>. Autre indice : f(θ) = cos θ + i sin θ vérifie f′(θ) = −sin θ + i cos θ = i·f(θ), exactement comme ${E('kθ')} vérifie (${E('kθ')})′ = k·${E('kθ')}, avec k = i.`)
  +bk('ex',`${E('iπ/2')} = i, ${E('iπ')} = −1 (la célèbre identité ${E('iπ')} + 1 = 0), ${E('2iπ')} = 1, ${E('iπ/3')} = ½ + i√3/2. Et (${E('iπ/6')})³ = ${E('iπ/2')} = i.`)
  +bk('idea',`Avec cette notation, les formules trigonométriques deviennent des règles d’exposants. Un produit de complexes se calcule comme un produit de puissances : on multiplie les modules et on ajoute les exposants, c’est-à-dire les angles.`),
  fig:(()=>{ const P=cpl(1.4,1,{step:.5}); const a=Math.PI/3; P.circ(0,0,1,{c:'var(--muted)',w:1.5}).curve(t=>.4*Math.cos(t),t=>.4*Math.sin(t),0,a,{c:'var(--spark)',w:2}).seg(Math.cos(a),0,Math.cos(a),Math.sin(a),{c:'var(--muted)',w:1.5,dash:true}).seg(0,Math.sin(a),Math.cos(a),Math.sin(a),{c:'var(--muted)',w:1.5,dash:true}).arrow(0,0,Math.cos(a),Math.sin(a)).dot(Math.cos(a),Math.sin(a),{l:'e^(iπ/3)'}).text(.45,.15,'θ',{c:'var(--spark)'}).text(Math.cos(a),0,'cos θ',{dy:14,s:11}).text(0,Math.sin(a),'sin θ',{a:'end',dx:-4,dy:4,s:11}); return P.svg(); })(),
  note:'Sur le cercle unité, e^(iθ) est le point d’angle θ : son abscisse est cos θ, son ordonnée sin θ.'},
 {kind:'Méthode',h:'De a + bi à la forme polaire',p:'<b>Quand</b> : pour multiplier, élever à une puissance ou extraire une racine, la forme polaire est bien plus commode. <b>Pourquoi ça marche</b> : a = r cos θ et b = r sin θ, donc <b>r = √(a² + b²)</b>, puis <b>cos θ = a/r</b> et <b>sin θ = b/r</b>. Il faut les <b>deux</b> : cos θ seul donne deux angles possibles, le signe de sin θ (donc de b) tranche. <b>Comment</b> : calcule r, écris cos θ et sin θ, repère le quadrant avec les signes de a et b, puis reconnais un angle connu.',
  demo:{enonce:'Écris z = −1 − i√3 sous forme polaire.',etapes:[
   {f:'r = √(1 + 3) = 2',w:'Module.'},
   {f:'cos θ = −1/2 et sin θ = −√3/2',w:'On divise a et b par r.'},
   {f:'a &lt; 0 et b &lt; 0 : z est dans le 3e quadrant',w:'Le cosinus seul donnerait 2π/3 ou −2π/3 ; le sinus négatif impose l’angle du bas.'},
   {f:'θ = −2π/3 (ou 4π/3, c’est le même point)',w:'cos(2π/3) = −1/2 et sin(−2π/3) = −√3/2.'}],
   conclusion:'−1 − i√3 = 2e^(−2iπ/3).'},
  note:'Avec la calculatrice, arctan(b/a) donne un angle dans ]−90° ; 90°[ : si a &lt; 0, il faut ajouter 180°. Exemple : −1 + i donne arctan(−1) = −45°, mais l’argument est 135°.'},
 {h:'Place −√3 + i',p:'Règle <i>r</i> et θ pour que <i>z</i> tombe sur le point rouge <i>−√3 + i</i>.',
  params:[{id:'r',l:'Module r',min:.5,max:4,step:.5,v:1},{id:'t',l:'Argument θ',min:0,max:345,step:15,v:0,u:'°'}],
  draw:v=>{ const a=v.r*Math.cos(rad(v.t)), b=v.r*Math.sin(rad(v.t)), P=cpl(3,1); P.dot(-Math.sqrt(3),1,{c:'var(--bad)',l:'−√3 + i',dx:-60}).arrow(0,0,a,b).dot(a,b,{r:5,l:'z'}); return P.svg(); },
  info:v=>`z = ${cz(v.r*Math.cos(rad(v.t)),v.r*Math.sin(rad(v.t)))}`,
  ok:v=>v.r===2&&v.t===150,why:'r = √(3 + 1) = 2. Puis cos θ = −√3/2 et sin θ = ½, donc θ = 150° = 5π/6. Ainsi −√3 + i = 2e^(5iπ/6).'},
 {h:'Un argument dans le 3e quadrant',p:'Quel est l’argument de <i>−2 − 2i</i>, en degrés, choisi dans ]−180° ; 180°]&nbsp;?',lab:'θ =',unit:'°',ans:-135,
  why:'r = 2√2, cos θ = sin θ = −√2/2 : 3e quadrant, donc θ = −135°. La calculatrice donne arctan(1) = 45°, qu’il faut corriger de −180°.'},
 {kind:'Théorie',h:'Euler et Moivre',p:`<p>Maintenant que ${E('iα')}${E('iβ')} = ${E('i(α+β)')}, le produit de deux complexes en forme polaire est immédiat.</p>`
  +bk('prop',`<b>r${E('iα')}·s${E('iβ')} = rs·${E('i(α+β)')}</b> : les modules se multiplient, les arguments s’additionnent. Pour le quotient : r${E('iα')}/(s${E('iβ')}) = (r/s)·${E('i(α−β)')}.`)
  +bk('thm',`<b>Formule de Moivre</b> : pour tout entier <i>n</i>, <b>(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ</b>, c’est-à-dire (${E('iθ')})ⁿ = ${E('inθ')}. Plus généralement <b>(r${E('iθ')})ⁿ = rⁿ·${E('inθ')}</b>.`)
  +bk('why',`On multiplie <i>n</i> fois ${E('iθ')} par lui-même : les arguments s’ajoutent <i>n</i> fois, θ + θ + … + θ = nθ, et les modules 1 se multiplient en 1. Pour <i>n</i> négatif, 1/${E('iθ')} = ${E('−iθ')}, car ${E('iθ')}·${E('−iθ')} = ${E('0')} = 1.`)
  +bk('ex',`(1 + i)² : 1 + i = √2·${E('iπ/4')}, donc (1 + i)² = 2·${E('iπ/2')} = 2i. Directement : 1 + 2i + i² = 2i. Et i·i = ${E('iπ/2')}·${E('iπ/2')} = ${E('iπ')} = −1 : la règle i² = −1 se lit « deux quarts de tour font un demi-tour ».`)
  +bk('idea',`La figure enchaîne z, z², z³… : chaque point s’obtient du précédent en tournant de θ et en multipliant la distance à l’origine par <i>r</i>. Pour r = 1, les puissances restent sur le cercle unité.`),
  params:[{id:'r',l:'Module r',min:.8,max:1.2,step:.1,v:1.1},{id:'t',l:'θ',min:15,max:90,step:15,v:30,u:'°'},{id:'n',l:'Puissance n',min:1,max:8,v:4}],
  draw:v=>{ const P=cpl(4.5,1); P.circ(0,0,1,{c:'var(--muted)',w:1.5,dash:true}); let px=1,py=0;
    for(let k=1;k<=v.n;k++){ const R=v.r**k, x=R*Math.cos(rad(k*v.t)), y=R*Math.sin(rad(k*v.t)); P.seg(px,py,x,y,{c:'var(--muted)',w:1.5}); P.dot(x,y,{r:k===v.n?7:4,c:k===v.n?'var(--accent)':'var(--spark)',l:k===1?'z':k===v.n?'zⁿ':''}); px=x; py=y; }
    return P.svg(); },
  info:v=>`zⁿ = ${fmt(v.r,1)}${sup(v.n)}·e${sup('i·'+(v.n*v.t)+'°')} : module ${fmt(v.r**v.n,3)}, argument ${v.n*v.t}°${v.n*v.t>=360?' (≡ '+(v.n*v.t%360)+'°)':''}`,
  note:'Si r &gt; 1 les puissances spiralent vers l’extérieur, si r &lt; 1 vers l’origine, si r = 1 elles restent sur le cercle.'},
 {kind:'Méthode',h:'Multiplier et diviser en forme polaire',p:`<b>Quand</b> : on cherche le module ou l’argument d’un produit ou d’un quotient. <b>Pourquoi ça marche</b> : ${E('iα')}·${E('iβ')} = ${E('i(α+β)')} et ${E('iα')}/${E('iβ')} = ${E('i(α−β)')}. <b>Comment</b> : mets chaque facteur sous forme polaire, puis <b>multiplie (ou divise) les modules</b> et <b>additionne (ou soustrais) les arguments</b>.`,
  demo:{enonce:'Trouve le module et l’argument de (1 + i)/(√3 + i).',etapes:[
   {f:'1 + i = √2·e^(iπ/4)',w:'r = √2, cos θ = sin θ = √2/2.'},
   {f:'√3 + i = 2·e^(iπ/6)',w:'r = 2, cos θ = √3/2, sin θ = 1/2.'},
   {f:'Quotient : module √2/2, argument π/4 − π/6 = π/12',w:'Les modules se divisent, les arguments se soustraient.'}],
   conclusion:'(1 + i)/(√3 + i) = (√2/2)·e^(iπ/12), soit un argument de 15°.'},
  note:'C’est souvent la seule façon simple d’obtenir des valeurs exactes comme cos 15° : en forme algébrique, (1 + i)/(√3 + i) = ((√3 + 1) + i(√3 − 1))/4.'},
 {h:'Argument d’un produit',p:'Quel est l’argument de <i>(1 + i)(√3 + i)</i>, en degrés&nbsp;?',lab:'θ =',unit:'°',ans:75,
  why:'arg(1 + i) = 45° et arg(√3 + i) = 30°. Les arguments s’additionnent : 75°. Le module vaut √2 · 2 = 2√2.'},
 {kind:'Théorie',h:'Multiplier par e^(iθ), c’est tourner',p:`<p>La règle « les arguments s’additionnent » a une traduction géométrique très concrète, qui fait des complexes l’outil naturel des rotations.</p>`
  +bk('prop',`Multiplier un complexe <i>z</i> par ${E('iθ')} <b>fait tourner</b> le point <i>z</i> de l’angle θ autour de l’origine, sans changer sa distance. Multiplier par un réel r &gt; 0 <b>dilate</b> d’un facteur <i>r</i>. Multiplier par w = r${E('iθ')} fait les deux : c’est une <b>similitude</b> de rapport <i>r</i> et d’angle θ.`)
  +bk('why',`Si z = ρ${E('iφ')}, alors ${E('iθ')}·z = ρ${E('i(φ+θ)')} : même module ρ, argument augmenté de θ. C’est exactement la définition d’une rotation de centre 0 et d’angle θ.`)
  +bk('ex',`Multiplier par i = ${E('iπ/2')} est un quart de tour : i(2 + i) = 2i + i² = −1 + 2i, et le point (2 ; 1) est devenu (−1 ; 2), tourné de 90° dans le sens direct. Multiplier par −1 = ${E('iπ')} est un demi-tour. Multiplier par 1 + i = √2·${E('iπ/4')} tourne de 45° et agrandit d’un facteur √2.`)
  +bk('idea',`Pour tourner un point <i>z</i> autour d’un centre <i>c</i> plutôt que de l’origine : z ↦ c + ${E('iθ')}(z − c). On se ramène au centre, on tourne, on revient. Le problème du bras articulé, en fin de chapitre, repose sur ce principe.`),
  params:[{id:'t',l:'Angle θ',min:0,max:345,step:15,v:90,u:'°'}],
  draw:v=>{ const a=rad(v.t), x=2*Math.cos(a)-Math.sin(a), y=2*Math.sin(a)+Math.cos(a), P=cpl(3,1); P.circ(0,0,Math.sqrt(5),{c:'var(--muted)',w:1,dash:true}).curve(t=>.8*Math.cos(t),t=>.8*Math.sin(t),Math.atan2(1,2),Math.atan2(1,2)+a,{c:'var(--spark)',w:2}).arrow(0,0,2,1,{c:'var(--math)'}).arrow(0,0,x,y).dot(2,1,{c:'var(--math)',r:4,l:'z = 2 + i'}).dot(x,y,{l:'e^(iθ)·z'}); return P.svg(); },
  info:v=>{ const a=rad(v.t); return `${E('i·'+v.t+'°')}·(2 + i) = ${cz(2*Math.cos(a)-Math.sin(a),2*Math.sin(a)+Math.cos(a))} : même module √5 ≈ 2,236, argument augmenté de ${v.t}°`; }},
 {kind:'Méthode',h:'Une puissance avec Moivre',p:'<b>Quand</b> : on doit calculer zⁿ pour n grand. Développer serait très long. <b>Pourquoi ça marche</b> : <b>(r·e^(iθ))ⁿ = rⁿ·e^(inθ)</b> : on élève le module à la puissance n et on multiplie l’argument par n. <b>Comment</b> : mets z sous forme polaire, applique la formule, <b>ramène nθ dans ]−π ; π]</b> en retirant des multiples de 2π, puis repasse en a + bi.',
  demo:{enonce:'Calcule (1 − i)⁶.',etapes:[
   {f:'1 − i = √2·e^(−iπ/4)',w:'r = √2, cos θ = √2/2, sin θ = −√2/2 : 4e quadrant.'},
   {f:'(1 − i)⁶ = (√2)⁶·e^(−6iπ/4) = 8·e^(−3iπ/2)',w:'Moivre : module puissance 6, argument fois 6.'},
   {f:'−3π/2 + 2π = π/2',w:'On ramène l’argument dans ]−π ; π].'},
   {f:'8·e^(iπ/2) = 8i',w:'cos(π/2) = 0 et sin(π/2) = 1.'},
   {f:'Contrôle : (1 − i)² = −2i, puis (−2i)³ = −8i³ = 8i',w:'Un calcul direct confirme.'}],
   conclusion:'(1 − i)⁶ = 8i.'},
  note:'zⁿ est réel quand nθ est un multiple de π, et réel positif quand nθ est un multiple de 2π.'},
 {h:'Une grande puissance',p:'Calcule <i>(1 + i)⁸</i> grâce à la forme polaire.',lab:'(1 + i)⁸ =',ans:16,
  why:'1 + i = √2·e^(iπ/4). Donc (1 + i)⁸ = (√2)⁸·e^(8iπ/4) = 16·e^(2iπ) = 16.'},
 {kind:'Méthode',h:'Des formules trigonométriques par Moivre',p:'<b>Quand</b> : on veut exprimer cos nθ ou sin nθ avec cos θ et sin θ. <b>Pourquoi ça marche</b> : Moivre dit (cos θ + i sin θ)ⁿ = cos nθ + i sin nθ. En développant le membre de gauche, la partie réelle donne cos nθ et la partie imaginaire sin nθ. <b>Comment</b> : développe avec le binôme (ou le triangle de Pascal), sépare réel et imaginaire, puis utilise sin² θ = 1 − cos² θ si besoin.',
  demo:{enonce:'Exprime cos 3θ en fonction de cos θ.',etapes:[
   {f:'On note c = cos θ et s = sin θ. (c + is)³ = c³ + 3c²(is) + 3c(is)² + (is)³',w:'Binôme avec les coefficients 1, 3, 3, 1.'},
   {f:'= c³ + 3ic²s − 3cs² − is³',w:'i² = −1 et i³ = −i.'},
   {f:'cos 3θ = c³ − 3cs²',w:'Moivre : la partie réelle est cos 3θ.'},
   {f:'= c³ − 3c(1 − c²) = 4c³ − 3c',w:'On remplace s² par 1 − c².'}],
   conclusion:'cos 3θ = 4cos³ θ − 3cos θ, et la partie imaginaire donne sin 3θ = 3sin θ − 4sin³ θ.'}},
 {h:'Moivre au travail',p:'En développant <i>(cos θ + i sin θ)²</i> et en identifiant avec Moivre, la partie réelle donne…',
  opts:['cos 2θ = 2 cos θ','cos 2θ = cos²θ + sin²θ','sin 2θ = cos²θ − sin²θ','cos 2θ = cos²θ − sin²θ'],ans:3,
  why:'(cos θ + i sin θ)² = cos²θ − sin²θ + 2i sin θ cos θ. Moivre dit que c’est aussi cos 2θ + i sin 2θ. Parties réelles : cos 2θ = cos²θ − sin²θ (et sin 2θ = 2 sin θ cos θ).'},
 {kind:'Méthode',h:'Linéariser avec les formules d’Euler',p:`<b>Quand</b> : on veut transformer une puissance comme cos³ θ en somme de cos kθ (pour l’intégrer, par exemple). C’est le chemin inverse de Moivre. <b>Pourquoi ça marche</b> : en ajoutant et en retranchant ${E('iθ')} et ${E('−iθ')}, on obtient les <b>formules d’Euler</b> : <b>cos θ = ${F(E('iθ')+' + '+E('−iθ'),2)}</b> et <b>sin θ = ${F(E('iθ')+' − '+E('−iθ'),'2i')}</b>. <b>Comment</b> : remplace, développe avec le binôme, puis regroupe les termes ${E('ikθ')} + ${E('−ikθ')} = 2 cos kθ.`,
  demo:{enonce:'Linéarise cos³ θ.',etapes:[
   {f:`cos³ θ = ${F('('+E('iθ')+' + '+E('−iθ')+')³',8)}`,w:'Formule d’Euler, et 2³ = 8.'},
   {f:`= ${F(E('3iθ')+' + 3'+E('iθ')+' + 3'+E('−iθ')+' + '+E('−3iθ'),8)}`,w:'Binôme 1, 3, 3, 1 : par exemple 3·e^(2iθ)·e^(−iθ) = 3e^(iθ).'},
   {f:`= ${F('2 cos 3θ + 6 cos θ',8)}`,w:'On regroupe les exponentielles opposées : e^(ikθ) + e^(−ikθ) = 2 cos kθ.'}],
   conclusion:'cos³ θ = (cos 3θ + 3 cos θ)/4.'},
  note:'Contrôle rapide en θ = 0 : 1 = (1 + 3)/4. Pour sin, attention au facteur (2i)ⁿ du dénominateur.'},
 {h:'Linéariser sin³ θ',p:'Laquelle de ces égalités est vraie pour tout θ&nbsp;?',opts:['sin³ θ = (sin 3θ + 3 sin θ)/4','sin³ θ = (3 sin θ − sin 3θ)/4','sin³ θ = (3 sin θ − sin 3θ)/8','sin³ θ = sin 3θ/3'],ans:1,
  why:'sin³ θ = (e^(iθ) − e^(−iθ))³/(2i)³ = (e^(3iθ) − 3e^(iθ) + 3e^(−iθ) − e^(−3iθ))/(−8i) = (2i sin 3θ − 6i sin θ)/(−8i) = (3 sin θ − sin 3θ)/4. Contrôle en θ = π/2 : 1 = (3 + 1)/4.'},
 {kind:'Méthode',h:'Le module d’une somme d’exponentielles',p:`<b>Quand</b> : on cherche |a + b${E('iβ')}| ou la distance d’un point défini par des rotations successives. Le module d’une somme ne se calcule pas morceau par morceau. <b>Pourquoi ça marche</b> : un facteur commun ${E('iα')} a pour module 1, on peut donc le sortir sans rien changer au module. Ensuite, |x + iy|² = x² + y² avec ${E('iβ')} = cos β + i sin β. <b>Comment</b> : mets en facteur l’exponentielle commune, passe en forme algébrique, puis développe le carré du module avec cos² + sin² = 1.`,
  demo:{enonce:`Calcule |z| pour z = 2${E('iα')} + ${E('i(α+β)')}.`,etapes:[
   {f:`z = ${E('iα')}(2 + ${E('iβ')})`,w:'e^(i(α+β)) = e^(iα)·e^(iβ) : on met e^(iα) en facteur.'},
   {f:`|z| = |${E('iα')}|·|2 + ${E('iβ')}| = |2 + ${E('iβ')}|`,w:'|zw| = |z||w| et |e^(iα)| = 1.'},
   {f:'|2 + cos β + i sin β|² = (2 + cos β)² + sin² β',w:'Forme algébrique : partie réelle 2 + cos β, partie imaginaire sin β.'},
   {f:'= 4 + 4 cos β + cos² β + sin² β = 5 + 4 cos β',w:'On développe, puis cos² + sin² = 1.'}],
   conclusion:'|z| = √(5 + 4 cos β), qui ne dépend pas de α et varie de 1 (β = π) à 3 (β = 0).'},
  note:'Astuce de l’angle moitié : 1 + e^(iθ) = e^(iθ/2)(e^(−iθ/2) + e^(iθ/2)) = 2 cos(θ/2)·e^(iθ/2), donc |1 + e^(iθ)| = 2|cos(θ/2)|.'},
 {h:'Une somme d’exponentielles',p:'Calcule <i>|1 + e<sup>iπ/3</sup>|</i>, arrondi au millième.',lab:'module =',ans:1.732,tol:.0006,
  why:'|1 + cos θ + i sin θ|² = 2 + 2 cos θ = 2 + 1 = 3 pour θ = π/3, donc le module vaut √3 ≈ 1,732. L’angle moitié donne aussi 2 cos(π/6) = √3.'},
 {kind:'Théorie',h:'Des complexes en matrices',p:`<p>Multiplier par z = a + bi transforme le plan (rotation suivie d’une dilatation). Toute transformation linéaire du plan a une matrice 2 × 2. Quelle est celle de la multiplication par <i>z</i> ?</p>`
  +bk('def',`À z = a + bi on associe <b>M(z) = ${mat([['a','−b'],['b','a']])}</b>. Multiplier x + iy par <i>z</i> donne (ax − by) + i(bx + ay) : c’est exactement M(z) appliquée au vecteur (x ; y).`)
  +bk('prop',`<b>M(z + w) = M(z) + M(w)</b> et <b>M(zw) = M(z)·M(w)</b> : calculer avec ces matrices, c’est calculer avec les complexes. De plus <b>det M(z) = a² + b² = |z|²</b>, et M(z̄) est la transposée de M(z).`)
  +bk('why',`M(zw) et M(z)M(w) représentent la même transformation (multiplier par <i>w</i> puis par <i>z</i>, ou directement par <i>zw</i>), donc ce sont les mêmes matrices. On peut aussi vérifier à la main : M(i) = ${mat([[0,'−1'],[1,0]])} est la rotation de 90°, et M(i)² = ${mat([['−1',0],[0,'−1']])} = −I, traduction matricielle de i² = −1.`)
  +bk('ex',`z = 1 + i : M(z) = ${mat([[1,'−1'],[1,1]])}, et M(z)² = ${mat([[0,'−2'],[2,0]])} = M(2i). On retrouve (1 + i)² = 2i, avec det M(z) = 2 = |1 + i|².`),
  fig:`<p>En polaire, M(r${E('iθ')}) = r·${mat([['cos θ','−sin θ'],['sin θ','cos θ']])} : une rotation d’angle θ suivie d’une homothétie de rapport r. Et det M(z) = a² + b² = |z|².</p>`,
  note:'M(z̄) est la transposée de M(z). Multiplier par z agit sur le plan exactement comme la matrice M(z) agit sur le vecteur (x ; y).'},
 {h:'La bonne matrice',p:'Quelle matrice représente <i>z = 3 − 2i</i>&nbsp;?',
  opts:[mat([[3,'−2'],[2,3]]),mat([[3,2],['−2',3]]),mat([[3,'−2'],['−2',3]]),mat([['−2',3],[3,2]])],ans:1,
  why:'Avec a = 3 et b = −2, la forme [[a, −b], [b, a]] donne [[3, 2], [−2, 3]].'},
 {kind:'Défi',h:'Produit matriciel',p:`Soient <i>z = 1 + 2i</i> et <i>w = 3 − i</i>. Quel est le coefficient en haut à droite de M(z)·M(w)&nbsp;?`,lab:'coefficient =',ans:-5,
  why:'M(z)M(w) = M(zw) et zw = 3 − i + 6i − 2i² = 5 + 5i. La matrice est [[5, −5], [5, 5]] : le coefficient en haut à droite est −b = −5.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Forme algébrique pour additionner, forme polaire pour multiplier : savoir passer de l’une à l’autre est la compétence centrale du chapitre.</p>`
  +keep([`<b>Forme polaire</b> : z = r(cos θ + i sin θ) = r${E('iθ')}, avec r = |z| = √(a² + b²), cos θ = a/r et sin θ = b/r (les deux, pour le quadrant). L’argument est défini à 2π près.`,
   `<b>Euler</b> : ${E('iθ')} = cos θ + i sin θ, de module 1 ; ${E('iα')}${E('iβ')} = ${E('i(α+β)')}. Valeurs clés : ${E('iπ/2')} = i, ${E('iπ')} = −1, ${E('2iπ')} = 1.`,
   `<b>Produit et quotient</b> : modules multipliés (divisés), arguments additionnés (soustraits). Multiplier par ${E('iθ')} = tourner de θ ; par i = quart de tour.`,
   `<b>Moivre</b> : (r${E('iθ')})ⁿ = rⁿ${E('inθ')} ; développer (cos θ + i sin θ)ⁿ donne cos nθ et sin nθ. Ramène nθ dans ]−π ; π].`,
   `<b>Formules d’Euler</b> : cos θ = (${E('iθ')} + ${E('−iθ')})/2, sin θ = (${E('iθ')} − ${E('−iθ')})/2i, pour linéariser cosⁿ θ et sinⁿ θ.`,
   `<b>Module d’une somme</b> : mets en facteur l’exponentielle commune (module 1), passe en algébrique, utilise cos² + sin² = 1. |1 + ${E('iθ')}| = 2|cos(θ/2)|.`,
   `<b>Matrices</b> : M(a + bi) = ${mat([['a','−b'],['b','a']])}, M(zw) = M(z)M(w), det M(z) = |z|², M(r${E('iθ')}) = r × rotation d’angle θ.`])},
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
 {kind:'Théorie',h:'Les racines n-ièmes de l’unité',p:`<p>Dans ℝ, x² = 1 a deux solutions et x³ = 1 une seule. Dans ℂ, l’équation zⁿ = 1 a toujours exactement <i>n</i> solutions, et elles dessinent une figure parfaite.</p>`
  +bk('def',`Les <b>racines n-ièmes de l’unité</b> sont les solutions de <b>zⁿ = 1</b>. Ce sont les <i>n</i> nombres <b>ω<sub>k</sub> = ${E('2ikπ/n')}</b>, pour k = 0, 1, …, n − 1.`)
  +bk('why',`Cherchons z = r${E('iθ')}. Alors zⁿ = rⁿ${E('inθ')} doit valoir 1 = 1·${E('i·0')}. Égalité des modules : rⁿ = 1, donc r = 1. Égalité des arguments à 2π près : nθ = 2kπ, donc θ = 2kπ/n avec <i>k</i> entier. Pour k = 0, …, n − 1 on obtient <i>n</i> directions différentes ; pour k = n on retombe sur θ = 2π, le même point que k = 0. Il y a donc exactement <i>n</i> solutions, pas une de plus.`)
  +bk('ex',`n = 4 : les angles sont 0°, 90°, 180°, 270°, soit 1, i, −1, −i. On vérifie i⁴ = (i²)² = 1 et (−i)⁴ = i⁴ = 1. n = 2 : 1 et −1, comme dans ℝ.`)
  +bk('idea',`Toutes ont un module 1 et sont espacées de 360°/n : ce sont les sommets d’un <b>polygone régulier</b> inscrit dans le cercle unité, avec 1 comme sommet. En notant ω = ${E('2iπ/n')} la racine d’angle minimal, les autres sont ses puissances ω⁰, ω¹, …, ω${sup('n−1')} : on tourne de 2π/n à chaque multiplication.`),
  params:[{id:'n',l:'n',min:2,max:12,v:5}],
  draw:v=>{ const P=cpl(1.5,1,{step:.5}), pts=[]; for(let k=0;k<v.n;k++) pts.push([Math.cos(2*Math.PI*k/v.n),Math.sin(2*Math.PI*k/v.n)]);
    P.circ(0,0,1,{c:'var(--muted)',w:1.5,dash:true}).poly(pts,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:2}); pts.forEach((p,k)=>P.dot(p[0],p[1],{r:5,l:k===0?'1':k===1?'ω':''})); return P.svg(); },
  info:v=>`${v.n} racines, angle entre deux voisines : ${fmt(360/v.n,1)}°. ω = e${sup('2iπ/'+v.n)} et ω${sup('k')} parcourt toutes les racines.`},
 {h:'Racines réelles',p:'Parmi les 6 solutions complexes de <i>z⁶ = 1</i>, combien sont réelles&nbsp;?',opts:['0','1','2','6'],ans:2,
  why:'Les racines sont aux angles 0°, 60°, 120°, 180°, 240°, 300°. Seules 0° et 180° tombent sur l’axe réel : z = 1 et z = −1.'},
 {kind:'Théorie',h:'Les racines cubiques de l’unité et le nombre j',p:`<p>Le cas n = 3 revient si souvent que sa racine principale a reçu un nom : j.</p>`
  +bk('def',`<b>j = ${E('2iπ/3')} = −½ + i√3/2</b>. Les racines cubiques de l’unité sont 1, j et j² = ${E('4iπ/3')} = −½ − i√3/2.`)
  +bk('prop',`<b>j³ = 1</b>, <b>j² = j̄ = 1/j</b>, et <b>1 + j + j² = 0</b>.`)
  +bk('why',`j³ = ${E('2iπ')} = 1. Le conjugué de j a pour argument −2π/3, qui est la même direction que 4π/3 : c’est j². Et comme |j| = 1, j̄ = 1/j. Pour la somme : 1 + j + j² = 1 + (−½ + i√3/2) + (−½ − i√3/2) = 0. Autre vue : (j − 1)(1 + j + j²) = j³ − 1 = 0 et j ≠ 1.`)
  +bk('ex',`j⁷ = j⁶·j = (j³)²·j = j. Et (1 + j)² = (−j²)² = j⁴ = j. Contrôle numérique : 1 + j = ½ + i√3/2 = ${E('iπ/3')}, dont le carré est ${E('2iπ/3')} = j.`)
  +bk('idea',`1, j et j² sont les sommets d’un triangle équilatéral inscrit dans le cercle unité. Les trois règles ci-dessus suffisent à réduire n’importe quelle expression en j à la forme a + bj, comme le fera la méthode suivante.`),
  fig:(()=>{ const P=cpl(1.5,1,{step:.5}), pts=[0,120,240].map(t=>[Math.cos(rad(t)),Math.sin(rad(t))]); P.circ(0,0,1,{c:'var(--muted)',w:1.5,dash:true}).poly(pts,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:2}); P.dot(1,0,{r:5,l:'1'}).dot(pts[1][0],pts[1][1],{r:5,l:'j',dx:-14}).dot(pts[2][0],pts[2][1],{r:5,l:'j² = j̄',dx:-30,dy:16}); return P.svg(); })()},
 {kind:'Théorie',h:'Leur somme est nulle',p:`<p>Place les <i>n</i> racines sur le cercle et calcule leur centre de gravité : il tombe sur l’origine, par symétrie. Algébriquement, cela signifie que leur somme est nulle.</p>`
  +bk('prop',`Pour <i>n</i> ≥ 2 et ω = ${E('2iπ/n')} : <b>1 + ω + ω² + … + ω${sup('n−1')} = 0</b>.`)
  +bk('why',`C’est une somme géométrique de raison ω ≠ 1 : 1 + ω + … + ω${sup('n−1')} = ${F('ωⁿ − 1','ω − 1')}. Or ωⁿ = 1, donc le numérateur est nul. Il faut n ≥ 2 pour avoir ω ≠ 1 et pouvoir diviser.`)
  +bk('idea',`Géométriquement : mets les <i>n</i> flèches 1, ω, ω², … bout à bout. Chacune a la longueur 1 et tourne de 360°/n par rapport à la précédente. Elles referment un polygone régulier et la dernière pointe revient au point de départ : le déplacement total est 0. La figure le montre pour chaque <i>n</i>.`)
  +bk('ex',`n = 4 : 1 + i + (−1) + (−i) = 0. n = 3 : 1 + j + j² = 0, donc j + j² = −1, une égalité qu’on utilise sans arrêt. n = 6 : les racines sont ±1, ±j, ±j², et les paires opposées s’annulent deux à deux.`)
  +bk('warn',`La somme des racines n-ièmes d’un autre nombre <i>w</i> est aussi nulle (ce sont les ω<sub>k</sub> multipliées par une racine fixe z₀). Mais la somme des <b>modules</b> ne l’est pas : elle vaut <i>n</i>.`),
  params:[{id:'n',l:'n',min:2,max:12,v:6}],
  draw:v=>{ const P=plane({x:[-1.6,2.6],y:[-.6,4],lab:1}); let x=0,y=0;
    for(let k=0;k<v.n;k++){ const a=2*Math.PI*k/v.n, nx=x+Math.cos(a), ny=y+Math.sin(a); P.arrow(x,y,nx,ny,{c:k%2?'var(--spark)':'var(--accent)',w:2.5,hs:9}); x=nx; y=ny; }
    P.dot(0,0,{c:'var(--ink)',r:5,l:'0',dy:16}); return P.svg(); },
  info:v=>`Flèches 1, ω, …, ω${sup(v.n-1)} bout à bout : on finit en ${cz(0,0)}.`},
 {h:'Une somme partielle',p:'Soit <i>ω = e^(2iπ/5)</i>. Combien vaut <i>ω + ω² + ω³ + ω⁴</i>&nbsp;?',lab:'somme =',ans:-1,
  why:'La somme des 5 racines cinquièmes vaut 0 : 1 + ω + ω² + ω³ + ω⁴ = 0. Donc ω + ω² + ω³ + ω⁴ = −1.'},
 {kind:'Méthode',h:'Calculer avec les racines de l’unité',p:`<b>Quand</b> : une expression contient ω = ${E('2iπ/n')} et ses puissances. <b>Pourquoi ça marche</b> : trois règles suffisent. <b>ωⁿ = 1</b>, donc seuls les exposants modulo n comptent. <b>ω̄ = ω${sup('n−1')}</b> = 1/ω, car |ω| = 1. Et <b>1 + ω + … + ω${sup('n−1')} = 0</b>. <b>Comment</b> : développe, réduis chaque exposant modulo n, puis remplace les sommes de racines grâce à la somme nulle. Pour n = 3, on note souvent <b>j = ${E('2iπ/3')}</b> : j³ = 1, j̄ = j² et 1 + j + j² = 0.`,
  demo:{enonce:'Avec j = e^(2iπ/3), calcule j¹⁰⁰ puis (1 + j)⁶.',etapes:[
   {f:'100 = 3 · 33 + 1, donc j¹⁰⁰ = (j³)³³ · j = j',w:'j³ = 1 : on réduit l’exposant modulo 3.'},
   {f:'1 + j = −j²',w:'La somme 1 + j + j² est nulle.'},
   {f:'(1 + j)⁶ = (−j²)⁶ = j¹²',w:'(−1)⁶ = 1 et (j²)⁶ = j¹².'},
   {f:'j¹² = (j³)⁴ = 1',w:'12 est un multiple de 3.'}],
   conclusion:'j¹⁰⁰ = j et (1 + j)⁶ = 1.'},
  note:'Contrôle géométrique : 1 + j = ½ + i√3/2 = e^(iπ/3), dont la puissance 6 a pour argument 2π.'},
 {h:'Un produit avec j',p:'Avec <i>j = e^(2iπ/3)</i>, calcule <i>(2 + j)(2 + j²)</i>.',lab:'produit =',ans:3,
  why:'(2 + j)(2 + j²) = 4 + 2j² + 2j + j³ = 4 + 2(j + j²) + 1. Or j + j² = −1, donc le produit vaut 4 − 2 + 1 = 3.'},
 {kind:'Méthode',h:'Racines n-ièmes de w quelconque',p:`<b>Quand</b> : on résout zⁿ = w avec w quelconque. <b>Pourquoi ça marche</b> : on écrit <i>w = ρ${E('iφ')}</i> et on cherche <i>z = r${E('iθ')}</i>. Deux complexes non nuls sont égaux si leurs modules sont égaux et leurs arguments égaux à 2π près : zⁿ = w donne rⁿ = ρ et nθ = φ + 2kπ. <b>Comment</b> : <b>z<sub>k</sub> = ρ${sup('1/n')}·${E('i(φ + 2kπ)/n')}</b>, k = 0, …, n − 1. Encore un polygone régulier, sur le cercle de rayon ρ${sup('1/n')}, tourné de φ/n.`,
  demo:{enonce:'Résous z³ = −27i.',etapes:[
   {f:'−27i = 27·e^(−iπ/2)',w:'On met w sous forme polaire : module 27, point sur l’axe imaginaire négatif.'},
   {f:'r³ = 27 donc r = 3',w:'Les modules sont égaux.'},
   {f:'3θ = −π/2 + 2kπ, donc θ = −π/6 + 2kπ/3',w:'Les arguments sont égaux à 2π près : on divise tout par 3, y compris le 2kπ.'},
   {f:'k = 0, 1, 2 : θ = −π/6, π/2, 7π/6',w:'Au-delà, on retombe sur les mêmes points.'},
   {f:'z = 3√3/2 − 3i/2, z = 3i, z = −3√3/2 − 3i/2',w:'On repasse en forme algébrique avec cos et sin.'},
   {f:'Contrôle : (3i)³ = 27i³ = −27i',w:'On vérifie au moins une solution.'}],
   conclusion:'Les trois racines cubiques de −27i forment un triangle équilatéral sur le cercle de rayon 3.'},
  note:'Piège : il faut diviser l’angle par n, pas seulement prendre la racine du module. Et ne pas oublier les n − 1 autres solutions obtenues en ajoutant 2π/n. Deux racines voisines sont à distance |z₁ − z₀| = 2ρ^(1/n) sin(π/n).'},
 {h:'Une racine cubique de 8i',p:'Règle <i>z</i> pour que <i>z³</i> (flèche jaune) tombe sur le point rouge <i>8i</i>.',
  params:[{id:'r',l:'Module r',min:.5,max:2.5,step:.25,v:1},{id:'t',l:'Argument θ',min:0,max:345,step:15,v:0,u:'°'}],
  draw:v=>{ const P=cpl(10,4,{step:2}), a=rad(v.t), R=v.r**3, Rc=Math.min(R,9.6);
    P.dot(0,8,{c:'var(--bad)',l:'8i'}).arrow(0,0,Rc*Math.cos(3*a),Rc*Math.sin(3*a),{c:'var(--spark)',w:3}).arrow(0,0,v.r*Math.cos(a),v.r*Math.sin(a),{w:3,hs:9}).dot(v.r*Math.cos(a),v.r*Math.sin(a),{r:4,l:'z'});
    if(R>9.6) P.text(-9.5,-9,'z³ sort du cadre',{s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>`z = ${fmt(v.r)}·e${sup('i·'+v.t+'°')} donc z³ = ${fmt(v.r**3,3)}·e${sup('i·'+(3*v.t%360)+'°')}`,
  ok:v=>v.r===2&&[30,150,270].includes(v.t),why:'8i = 8e^(iπ/2). Donc r = 8^(1/3) = 2 et θ = 30° + k·120° : 30°, 150° ou 270°. Les trois racines sont √3 + i, −√3 + i et −2i.'},
 {h:'Racines carrées de i',p:'Quelles sont les deux racines carrées de <i>i</i>&nbsp;?',opts:['±i','±(1 + i)','±(1 − i)/√2','±(1 + i)/√2'],ans:3,
  why:'i = e^(iπ/2), donc z = ±e^(iπ/4) = ±(√2/2)(1 + i) = ±(1 + i)/√2. Vérification : ((1 + i)/√2)² = 2i/2 = i.'},
 {kind:'Théorie',h:'Factoriser zⁿ − w grâce aux racines',p:`<p>Connaître les <i>n</i> racines de <i>w</i>, c’est aussi factoriser le polynôme zⁿ − w, qui n’a souvent aucune racine réelle évidente (par exemple z⁴ + 1).</p>`
  +bk('prop',`Si z₀, z₁, …, z<sub>n−1</sub> sont les <i>n</i> racines n-ièmes de <i>w</i>, alors <b>zⁿ − w = (z − z₀)(z − z₁)…(z − z<sub>n−1</sub>)</b>. En particulier <b>zⁿ − 1 = (z − 1)(z − ω)…(z − ω${sup('n−1')})</b>.`)
  +bk('why',`Chaque z<sub>k</sub> annule zⁿ − w, donc chaque facteur (z − z<sub>k</sub>) le divise. Les <i>n</i> facteurs sont distincts, et leur produit est un polynôme de degré <i>n</i> de coefficient dominant 1, comme zⁿ − w : les deux polynômes sont égaux.`)
  +bk('ex',`z⁴ − 1 = (z − 1)(z + 1)(z − i)(z + i). En regroupant les deux facteurs conjugués, (z − i)(z + i) = z² + 1, on retrouve z⁴ − 1 = (z² − 1)(z² + 1). De même z³ + 8 = (z + 2)(z − 1 − i√3)(z − 1 + i√3) = (z + 2)(z² − 2z + 4), car (z − 1)² + 3 = z² − 2z + 4.`)
  +bk('idea',`Regrouper chaque racine avec sa conjuguée donne des facteurs réels de degré 2 : c’est ainsi qu’on factorise sur ℝ un polynôme sans racine réelle. Le chapitre sur les polynômes développe cette idée.`)},
 {kind:'Défi',h:'Le carré de −16',p:'Les quatre racines quatrièmes de <i>−16</i> forment un carré. Quelle est la longueur de son côté, arrondie au centième&nbsp;?',lab:'côté =',ans:2.83,tol:.006,
  why:'−16 = 16e^(iπ). Les racines ont pour module 16^(1/4) = 2 et pour arguments 45°, 135°, 225°, 315°. Deux sommets voisins, comme √2 + i√2 et −√2 + i√2, sont à distance 2√2 ≈ 2,83.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Résoudre zⁿ = w, c’est égaler les modules et les arguments à 2π près : une racine du module, et <i>n</i> angles régulièrement espacés.</p>`
  +keep([`<b>Racines n-ièmes de l’unité</b> : ω<sub>k</sub> = ${E('2ikπ/n')}, k = 0, …, n − 1 ; module 1, sommets d’un polygone régulier, avec 1 comme sommet. Toutes sont des puissances de ω = ${E('2iπ/n')}.`,
   `<b>Le nombre j</b> = ${E('2iπ/3')} = −½ + i√3/2 : j³ = 1, j² = j̄ = 1/j, 1 + j + j² = 0.`,
   `<b>Somme nulle</b> : 1 + ω + … + ω${sup('n−1')} = 0 pour n ≥ 2 (somme géométrique, ωⁿ = 1). Pour calculer : réduis les exposants modulo n, puis remplace les sommes grâce à la somme nulle.`,
   `<b>Racines de w = ρ${E('iφ')}</b> : z<sub>k</sub> = ρ${sup('1/n')}·${E('i(φ + 2kπ)/n')}. Divise l’angle par n <b>et</b> ajoute les 2kπ/n : n solutions, sur le cercle de rayon ρ${sup('1/n')}.`,
   `<b>Géométrie</b> : deux racines voisines sont à distance 2ρ${sup('1/n')} sin(π/n) ; racines carrées de w : ±√ρ·${E('iφ/2')}.`,
   `<b>Factorisation</b> : zⁿ − w = ∏(z − z<sub>k</sub>) ; en regroupant les paires conjuguées, on obtient des facteurs réels de degré 2.`])},
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
 {kind:'Théorie',h:'Polynômes, degré et coefficient dominant',p:`<p>Tu manipules des polynômes depuis longtemps : x² − 3x + 2, 2x³ + 1… Avant de les diviser et de les factoriser, fixons le vocabulaire, car tout le chapitre repose sur une seule grandeur : le <b>degré</b>.</p>`
  +bk('def',`Un <b>polynôme</b> à coefficients dans 𝕂 (𝕂 = ℝ ou ℂ) est une expression <b>P = aₙxⁿ + … + a₁x + a₀</b>, où les a<sub>k</sub> sont des nombres de 𝕂. Si aₙ ≠ 0, <i>n</i> est le <b>degré</b> de P, noté deg P, et aₙ son <b>coefficient dominant</b>. P est <b>unitaire</b> si aₙ = 1. On note 𝕂[x] l’ensemble de ces polynômes.`)
  +bk('prop',`<b>deg(PQ) = deg P + deg Q</b> et <b>deg(P + Q) ≤ max(deg P, deg Q)</b>.`)
  +bk('why',`Le terme de plus haut degré de PQ est aₙxⁿ · b<sub>m</sub>x${sup('m')} = aₙb<sub>m</sub>x${sup('n+m')}, et aₙb<sub>m</sub> ≠ 0 car un produit de deux nombres non nuls n’est jamais nul. Pour une somme, les termes dominants peuvent se détruire : (x² + x) + (−x² + 1) = x + 1, de degré 1 seulement.`)
  +bk('ex',`P = 2x³ − x + 5 : degré 3, coefficient dominant 2, terme constant 5. (x² + 1)(3x − 2) = 3x³ − 2x² + 3x − 2 : degré 2 + 1 = 3, coefficient dominant 1 · 3 = 3.`)
  +bk('warn',`Une constante non nulle, comme 7, est de degré 0. Le polynôme nul n’a pas de degré au sens usuel : par convention, deg 0 = −∞, ce qui garde la formule du produit vraie.`)},
 {kind:'Théorie',h:'Division euclidienne',p:`<p>Avec les entiers, 17 = 5 · 3 + 2 : on divise 17 par 5, le quotient est 3 et le reste 2 est plus petit que le diviseur. Les polynômes se divisent de la même façon, le <b>degré</b> jouant le rôle de la taille.</p>`
  +bk('thm',`Pour deux polynômes <i>A</i> et <i>B ≠ 0</i>, il existe un <b>unique</b> couple (Q, R) tel que <b>A = B·Q + R</b> avec <b>deg R &lt; deg B</b>. Q est le <b>quotient</b>, R le <b>reste</b>. Si R = 0, on dit que B <b>divise</b> A.`)
  +bk('why',`Existence : tant que deg A ≥ deg B, on retranche à A le monôme (terme dominant de A ÷ terme dominant de B) multiplié par B. Le terme de plus haut degré disparaît, le degré baisse strictement, donc on finit par passer sous deg B. Unicité : si BQ + R = BQ′ + R′, alors B(Q − Q′) = R′ − R. À droite le degré est &lt; deg B ; à gauche il serait ≥ deg B si Q ≠ Q′. Donc Q = Q′, puis R = R′.`)
  +bk('idea',`Chaque étape tue le terme de plus haut degré du reste partiel, comme on « abaisse » les chiffres dans une division posée d’entiers. L’exemple ci-dessous le fait pas à pas.`)
  +bk('warn',`Le quotient a pour degré deg A − deg B. Ses coefficients peuvent être des fractions même si ceux de A et B sont entiers : x² + 1 = (2x)·(x/2) + 1.`),
  fig:`<p>Exemple : <i>A = x³ − 2x² + 4</i> divisé par <i>B = x − 1</i>.</p><p>x³ ÷ x = <b>x²</b> : il reste A − x²(x − 1) = −x² + 4.<br>−x² ÷ x = <b>−x</b> : il reste −x² + 4 − (−x)(x − 1) = −x + 4.<br>−x ÷ x = <b>−1</b> : il reste −x + 4 − (−1)(x − 1) = <b>3</b>.</p><p>Donc x³ − 2x² + 4 = (x − 1)(x² − x − 1) + 3.</p>`,
  note:'Quand B = x − a, le reste est une constante, et il vaut A(a). Ici A(1) = 1 − 2 + 4 = 3. C’est le théorème du reste.'},
 {kind:'Méthode',h:'Poser une division euclidienne',p:'<b>Quand</b> : pour factoriser, simplifier une fraction rationnelle ou trouver un reste. <b>Pourquoi ça marche</b> : à chaque étape, on retranche un multiple de B qui tue le terme de plus haut degré du reste partiel. Le degré baisse strictement, donc on s’arrête dès que deg R &lt; deg B. <b>Comment</b> : ordonne A et B par puissances décroissantes, en écrivant les termes manquants avec un coefficient 0. Divise le terme dominant du reste par celui de B, multiplie B par ce monôme, soustrais, recommence.',
  demo:{enonce:'Divise A = x⁴ + 2x³ − x + 3 par B = x² + x + 1.',etapes:[
   {f:'A = x⁴ + 2x³ + 0x² − x + 3',w:'On écrit le terme manquant en x² pour ne pas mélanger les colonnes.'},
   {f:'x⁴ ÷ x² = <b>x²</b> ; A − x²B = x³ − x² − x + 3',w:'x²B = x⁴ + x³ + x² : le terme x⁴ disparaît.'},
   {f:'x³ ÷ x² = <b>x</b> ; (x³ − x² − x + 3) − xB = −2x² − 2x + 3',w:'xB = x³ + x² + x.'},
   {f:'−2x² ÷ x² = <b>−2</b> ; (−2x² − 2x + 3) + 2B = 5',w:'−2B = −2x² − 2x − 2, qu’on soustrait.'},
   {f:'deg 5 = 0 &lt; 2 = deg B : on s’arrête',w:'Le reste a un degré strictement inférieur à celui de B.'},
   {f:'Contrôle en x = 1 : A(1) = 5 et B(1)Q(1) + R = 3 · 0 + 5 = 5',w:'Une égalité de polynômes se vérifie en une valeur simple.'}],
   conclusion:'x⁴ + 2x³ − x + 3 = (x² + x + 1)(x² + x − 2) + 5 : Q = x² + x − 2 et R = 5.'},
  note:'Si le reste est nul, B divise A. Avec B = x − a, on peut aussi utiliser le théorème du reste : R = A(a).'},
 {h:'Diviser par x² + 1',p:'Quel est le reste de la division de <i>x³ + 2x² + 3x + 4</i> par <i>x² + 1</i>&nbsp;?',opts:['2','x + 2','2x + 2','3x + 4'],ans:2,
  why:'x³ ÷ x² = x : il reste 2x² + 2x + 4. Puis 2x² ÷ x² = 2 : il reste 2x + 2. Donc x³ + 2x² + 3x + 4 = (x² + 1)(x + 2) + 2x + 2.'},
 {kind:'Théorie',h:'Le théorème du reste',p:`<p>Diviser par x − a est le cas le plus fréquent, car c’est lui qui sert à chercher les racines. Il y a un raccourci : on connaît le reste sans poser la division.</p>`
  +bk('thm',`Le reste de la division de P par <b>x − a</b> est le nombre <b>P(a)</b> : P = (x − a)Q + P(a).`)
  +bk('why',`x − a est de degré 1, donc le reste est de degré &lt; 1 : c’est une constante <i>r</i>. Dans l’égalité P(x) = (x − a)Q(x) + r, remplace x par a : le premier terme s’annule, et il reste P(a) = r.`)
  +bk('ex',`P = x³ − 2x² + 4 et a = 1 : P(1) = 1 − 2 + 4 = 3, le reste trouvé plus haut en posant la division. Pour diviser par x + 2 = x − (−2), on évalue en −2 : P(−2) = −8 − 8 + 4 = −12. En effet x³ − 2x² + 4 = (x + 2)(x² − 4x + 8) − 12.`)
  +bk('warn',`Le raccourci ne vaut que pour un diviseur de degré 1. Divisé par x² + 1, le reste est de degré ≤ 1, de la forme αx + β, pas un simple nombre : il faut alors poser la division. Et attention au signe : x + 2 se traite avec a = −2.`)},
 {h:'Le reste sans diviser',p:'Quel est le reste de la division de <i>x⁴ + 3x − 5</i> par <i>x − 2</i>&nbsp;?',lab:'reste =',ans:17,
  why:'Le reste de la division par x − 2 vaut P(2) = 16 + 6 − 5 = 17.'},
 {kind:'Théorie',h:'Racines et facteurs',p:`<p>Résoudre P(x) = 0 et factoriser P sont en fait le même problème. Le lien vient tout droit du théorème du reste.</p>`
  +bk('def',`<i>a</i> est une <b>racine</b> de P si P(a) = 0. Si (x − a)ᵐ divise P mais pas (x − a)ᵐ⁺¹, <i>a</i> est racine de <b>multiplicité m</b> : simple si m = 1, double si m = 2, triple si m = 3.`)
  +bk('thm',`<i>a</i> est racine de <i>P</i> si et seulement si <b>(x − a) divise P</b>.`)
  +bk('why',`Le théorème du reste donne P = (x − a)Q + P(a). Le reste est nul, c’est-à-dire x − a divise P, exactement quand P(a) = 0.`)
  +bk('ex',`x³ − 3x + 2 s’annule en 1, donc x − 1 le divise : x³ − 3x + 2 = (x − 1)(x² + x − 2) = (x − 1)²(x + 2). 1 est racine double, −2 racine simple, et 2 + 1 = 3 redonne le degré.`)
  +bk('idea',`Sur le graphe, une racine simple est un point où la courbe <b>traverse</b> l’axe. Une racine double est un point où elle le <b>touche</b> sans changer de signe, car (x − a)² ≥ 0 : la courbe y est tangente à l’axe. Fais varier <i>c</i> : le graphe de x³ − 3x + c coupe l’axe 3 fois, ou 1 fois, ou le touche en une racine double pour c = ±2.`),
  params:[{id:'c',l:'c',min:-4,max:4,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-6,6],h:240,lab:1,step:1}); P.fn(x=>x**3-3*x+v.c,{n:300});
    let rs=[]; if(Math.abs(v.c)<2-1e-9){ const t=Math.acos(-v.c/2)/3; rs=[0,1,2].map(k=>2*Math.cos(t-2*Math.PI*k/3)); }
    else if(Math.abs(Math.abs(v.c)-2)<1e-9){ rs=v.c>0?[1,-2]:[-1,2]; }
    else { const s=Math.sqrt(v.c*v.c/4-1); rs=[Math.cbrt(-v.c/2+s)+Math.cbrt(-v.c/2-s)]; }
    rs.forEach(x=>P.dot(x,0,{r:5})); return P.svg(); },
  info:v=>Math.abs(v.c)<2-1e-9?'3 racines réelles simples.':Math.abs(Math.abs(v.c)-2)<1e-9?`Une racine double (x = ${v.c>0?1:-1}) et une simple (x = ${v.c>0?-2:2}) : 2 + 1 = 3.`:'1 racine réelle et 2 racines complexes non réelles conjuguées.',
  note:'Dans tous les cas, en comptant les multiplicités et les racines complexes, il y a exactement 3 racines : le degré.'},
 {kind:'Théorie',h:'Pas plus de racines que le degré',p:`<p>Une droite non horizontale coupe l’axe une fois, une parabole au plus deux fois. Ce n’est pas un hasard : le degré borne le nombre de racines.</p>`
  +bk('thm',`Un polynôme <b>non nul</b> de degré <i>n</i> a <b>au plus n racines</b>, et même au plus <i>n</i> en comptant chacune avec sa multiplicité.`)
  +bk('why',`Si a₁, …, a<sub>k</sub> sont des racines distinctes, on les sort une à une. P(a₁) = 0 donne P = (x − a₁)Q₁. Puis P(a₂) = (a₂ − a₁)Q₁(a₂) = 0 avec a₂ ≠ a₁, donc Q₁(a₂) = 0 et Q₁ = (x − a₂)Q₂. On arrive à P = (x − a₁)…(x − a<sub>k</sub>)Q avec Q ≠ 0, et le degré donne k ≤ n.`)
  +bk('ex',`x³ − x = x(x − 1)(x + 1) a trois racines, 0, 1 et −1 : c’est le maximum pour le degré 3. x² + 1 n’en a aucune dans ℝ : « au plus » ne veut pas dire « exactement ».`)
  +bk('prop',`<b>Conséquence</b> : si deux polynômes de degré ≤ n prennent les mêmes valeurs en n + 1 points, ils sont égaux : leur différence, de degré ≤ n, a n + 1 racines, donc elle est nulle. C’est ce qui justifie qu’on <b>identifie les coefficients</b> de deux écritures d’un même polynôme, comme dans la méthode suivante.`)},
 {kind:'Méthode',h:'Factoriser avec une racine évidente',p:'<b>Quand</b> : un polynôme de degré 3 ou plus, sans formule directe. <b>Pourquoi ça marche</b> : si P a des coefficients entiers et une racine entière a, alors a divise le terme constant (car P(a) = 0 donne a₀ = −a(…)). Et P(a) = 0 garantit que (x − a) divise P. <b>Comment</b> : teste P(±1), P(±2)… parmi les diviseurs du terme constant. Dès que P(a) = 0, divise P par x − a (ou identifie P = (x − a)(x² + bx + c)), puis factorise le quotient.',
  demo:{enonce:'Factorise P = x³ − 6x² + 11x − 6.',etapes:[
   {f:'Candidats : ±1, ±2, ±3, ±6. P(1) = 1 − 6 + 11 − 6 = 0',w:'Les racines entières divisent −6 ; on commence par le plus simple.'},
   {f:'P = (x − 1)(x² + bx + c) = x³ + (b − 1)x² + (c − b)x − c',w:'On identifie plutôt que de poser la division.'},
   {f:'b − 1 = −6, c − b = 11, −c = −6 : b = −5, c = 6',w:'On égale les coefficients ; la 2e équation sert de contrôle : 6 + 5 = 11.'},
   {f:'x² − 5x + 6 = (x − 2)(x − 3)',w:'Trinôme : Δ = 1, racines 2 et 3.'}],
   conclusion:'x³ − 6x² + 11x − 6 = (x − 1)(x − 2)(x − 3).'},
  note:'Si aucun candidat ne marche, le polynôme n’a pas de racine entière : il faut une autre méthode.'},
 {h:'Une racine évidente',p:'Factorise <i>x³ − 2x² − 5x + 6</i>. Quelle est sa plus grande racine&nbsp;?',lab:'x =',ans:3,
  why:'P(1) = 1 − 2 − 5 + 6 = 0, donc P = (x − 1)(x² − x − 6) = (x − 1)(x − 3)(x + 2). Les racines sont 1, 3 et −2 : la plus grande est 3.'},
 {kind:'Méthode',h:'La multiplicité par les dérivées',p:'<b>Quand</b> : on veut savoir si a est racine simple, double, triple… sans factoriser complètement. <b>Pourquoi ça marche</b> : si P = (x − a)ᵐQ avec Q(a) ≠ 0, chaque dérivation abaisse l’exposant de 1. Donc <b>P(a) = P′(a) = … = P⁽ᵐ⁻¹⁾(a) = 0 et P⁽ᵐ⁾(a) ≠ 0</b>. <b>Comment</b> : évalue P, P′, P″… en a jusqu’à la première valeur non nulle. Son rang est la multiplicité.',
  demo:{enonce:'Quelle est la multiplicité de 1 comme racine de P = x⁴ − 2x³ + 2x − 1&nbsp;?',etapes:[
   {f:'P(1) = 1 − 2 + 2 − 1 = 0',w:'1 est racine.'},
   {f:'P′ = 4x³ − 6x² + 2, P′(1) = 0',w:'Au moins double.'},
   {f:'P″ = 12x² − 12x, P″(1) = 0',w:'Au moins triple.'},
   {f:'P‴ = 24x − 12, P‴(1) = 12 ≠ 0',w:'La première dérivée non nulle est la 3e.'}],
   conclusion:'1 est racine triple : x⁴ − 2x³ + 2x − 1 = (x − 1)³(x + 1).'}},
 {h:'Multiplicité',p:'On a <i>x³ − 3x + 2 = (x − 1)²(x + 2)</i>. Quelle est la multiplicité de la racine 1&nbsp;?',opts:['1','2','3','0'],ans:1,
  why:'Le facteur (x − 1) apparaît au carré : 1 est racine double. On le voit aussi avec P(1) = 0 et P′(1) = 3·1² − 3 = 0, mais P″(1) = 6 ≠ 0.'},
 {kind:'Théorie',h:'Le théorème fondamental de l’algèbre',p:`<p>Sur ℝ, x² + 1 n’a aucune racine : un polynôme de degré <i>n</i> peut en avoir moins que <i>n</i>. Les nombres complexes comblent entièrement ce manque, et c’est l’une des grandes raisons de leur importance.</p>`
  +bk('thm',`<b>Théorème de d’Alembert-Gauss.</b> Tout polynôme <b>non constant</b> à coefficients complexes (en particulier réels) a <b>au moins une racine dans ℂ</b>.`)
  +bk('prop',`Tout P de degré n ≥ 1 se <b>factorise sur ℂ</b> en <b>P = a(x − z₁)(x − z₂)…(x − zₙ)</b>, où <i>a</i> est le coefficient dominant et les z<sub>k</sub> les racines, répétées selon leur multiplicité. P a donc exactement <i>n</i> racines complexes, multiplicités comptées.`)
  +bk('why',`La preuve du théorème dépasse ce chapitre : elle montre, avec de l’analyse, que |P(z)| atteint un minimum, et que ce minimum ne peut être que 0. La factorisation, elle, se déduit par récurrence : une racine z₁ donne P = (x − z₁)Q avec deg Q = n − 1, puis Q a lui-même une racine tant qu’il n’est pas constant.`)
  +bk('ex',`x² + 1 = (x − i)(x + i). x³ − 1 = (x − 1)(x − j)(x − j²) avec j = ${E('2iπ/3')}. 2x² − 2 = 2(x − 1)(x + 1) : n’oublie pas le coefficient dominant <i>a</i> = 2 devant.`)
  +bk('warn',`Le théorème garantit que les racines <b>existent</b>, il ne dit pas comment les calculer. À partir du degré 5, il n’existe en général aucune formule avec des radicaux. Conséquence sur ℂ : les seuls polynômes impossibles à factoriser davantage (les <b>irréductibles</b>) sont ceux de degré 1.`),
  note:'Sur ℝ, c’est faux : x² + 1 n’a pas de racine réelle. Mais il se factorise sur ℂ en (x − i)(x + i).'},
 {kind:'Théorie',h:'Sur ℝ : les racines vont par paires',p:`Si P est à coefficients <b>réels</b> et P(z) = 0, alors P(z̄) = ${'<span style="text-decoration:overline">P(z)</span>'} = 0 : les racines non réelles viennent par <b>paires conjuguées</b>. Chaque paire donne un facteur réel <b>(x − z)(x − z̄) = x² − 2 Re(z)·x + |z|²</b>, de discriminant négatif. Les irréductibles sur ℝ sont les degrés 1 et les degrés 2 avec Δ &lt; 0.`,
  params:[{id:'p',l:'p',min:-6,max:6,v:0},{id:'q',l:'q',min:-4,max:10,v:1}],
  draw:v=>{ const P=cpl(), D=v.p*v.p-4*v.q; P.dot(2,1,{c:'var(--bad)',r:4,l:'2 + i'}).dot(2,-1,{c:'var(--bad)',r:4,l:'2 − i',dy:16});
    if(D>=0){ [(-v.p+Math.sqrt(D))/2,(-v.p-Math.sqrt(D))/2].forEach(x=>P.dot(x,0,{r:6})); } else { const re=-v.p/2, im=Math.sqrt(-D)/2; P.seg(re,im,re,-im,{c:'var(--muted)',w:1,dash:true}).dot(re,im,{r:6}).dot(re,-im,{r:6}); }
    return P.svg(); },
  info:v=>{ const D=v.p*v.p-4*v.q; return `x² ${v.p<0?'−':'+'} ${Math.abs(v.p)}x ${v.q<0?'−':'+'} ${Math.abs(v.q)} : Δ = ${fmt(D,0)}, ${D>0?'deux racines réelles':D===0?'une racine double réelle':'deux racines conjuguées '+cz(-v.p/2,Math.sqrt(-D)/2)+' et '+cz(-v.p/2,-Math.sqrt(-D)/2)}`; },
  ok:v=>v.p===-4&&v.q===5,why:'(x − (2 + i))(x − (2 − i)) = x² − 2·2·x + |2 + i|² = x² − 4x + 5. Donc p = −4 et q = 5 ; Δ = 16 − 20 = −4 &lt; 0.'},
 {kind:'Méthode',h:'Factoriser sur ℝ : associer les racines conjuguées',p:'<b>Quand</b> : on connaît (ou on sait calculer) les racines complexes d’un polynôme réel et on veut sa factorisation sur ℝ. <b>Pourquoi ça marche</b> : les racines non réelles vont par paires z, z̄, et <b>(x − z)(x − z̄) = x² − 2 Re(z) x + |z|²</b> est à coefficients réels. <b>Comment</b> : trouve toutes les racines, garde les facteurs x − a pour les racines réelles, et regroupe chaque paire conjuguée en un trinôme réel.',
  demo:{enonce:'Factorise x³ + 8 sur ℂ puis sur ℝ.',etapes:[
   {f:'Racines de z³ = −8 = 8e^(iπ) : 2e^(iπ/3), −2, 2e^(−iπ/3)',w:'Racines cubiques : module 2, arguments (π + 2kπ)/3.'},
   {f:'2e^(±iπ/3) = 1 ± i√3',w:'cos(π/3) = 1/2 et sin(π/3) = √3/2.'},
   {f:'Sur ℂ : x³ + 8 = (x + 2)(x − 1 − i√3)(x − 1 + i√3)',w:'Un facteur de degré 1 par racine.'},
   {f:'(x − 1 − i√3)(x − 1 + i√3) = x² − 2x + 4',w:'−2 Re z = −2 et |z|² = 1 + 3 = 4.'}],
   conclusion:'Sur ℝ : x³ + 8 = (x + 2)(x² − 2x + 4), avec x² − 2x + 4 irréductible (Δ = −12).'},
  note:'Contrôle en x = 0 : 8 = 2 · 4.'},
 {h:'Factoriser x⁴ − 1 sur ℝ',p:'Quelle est la factorisation de <i>x⁴ − 1</i> en irréductibles sur ℝ&nbsp;?',
  opts:['(x − 1)(x + 1)(x − i)(x + i)','(x² − 1)(x² + 1)','(x − 1)(x + 1)(x² + 1)','(x − 1)²(x + 1)²'],ans:2,
  why:'x⁴ − 1 = (x² − 1)(x² + 1) = (x − 1)(x + 1)(x² + 1). x² + 1 a Δ = −4 &lt; 0 : il est irréductible sur ℝ. La première écriture est la factorisation sur ℂ, la deuxième n’est pas complète.'},
 {kind:'Défi',h:'Reconstruire un polynôme',p:'<i>P</i> est un polynôme réel unitaire de degré 3. Il admet les racines 1 et 1 + 2i. Calcule <i>P(0)</i>.',lab:'P(0) =',ans:-5,
  why:'Coefficients réels, donc 1 − 2i est aussi racine. P = (x − 1)(x² − 2x + 5), car |1 + 2i|² = 5. Donc P(0) = (−1)·5 = −5.'},
 {kind:'Méthode',h:'Faire apparaître une différence de carrés',p:'<b>Quand</b> : un polynôme réel sans racine réelle, comme x⁴ + 4, qu’on veut factoriser sur ℝ sans passer par les complexes. <b>Pourquoi ça marche</b> : <b>A² − B² = (A − B)(A + B)</b>. Si on ajoute et retranche le bon terme, x⁴ + c devient le carré d’un trinôme moins un carré. <b>Comment</b> : complète le carré, (x² + k)² = x⁴ + 2kx² + k², avec k² égal au terme constant, puis retranche le 2kx² en trop. Il faut que 2kx² soit un carré.',
  demo:{enonce:'Factorise x⁴ + 4 sur ℝ.',etapes:[
   {f:'(x² + 2)² = x⁴ + 4x² + 4',w:'On choisit k = 2 pour retrouver le terme constant 4.'},
   {f:'x⁴ + 4 = (x² + 2)² − 4x² = (x² + 2)² − (2x)²',w:'On retranche le 4x² ajouté, qui est le carré de 2x.'},
   {f:'= (x² − 2x + 2)(x² + 2x + 2)',w:'A² − B² = (A − B)(A + B) avec A = x² + 2 et B = 2x.'},
   {f:'Δ = 4 − 8 = −4 &lt; 0 pour les deux facteurs',w:'Les deux trinômes sont irréductibles sur ℝ : la factorisation est complète.'}],
   conclusion:'x⁴ + 4 = (x² − 2x + 2)(x² + 2x + 2). Leurs racines 1 ± i et −1 ± i sont bien les racines quatrièmes de −4.'}},
 {h:'Factoriser x⁴ + 64',p:'Quelle est la factorisation de <i>x⁴ + 64</i> sur ℝ&nbsp;?',opts:['(x² + 8)²','(x² − 4x + 8)(x² + 4x + 8)','(x² − 8x + 8)(x² + 8x + 8)','(x − 2√2)²(x + 2√2)²'],ans:1,
  why:'(x² + 8)² = x⁴ + 16x² + 64, donc x⁴ + 64 = (x² + 8)² − (4x)² = (x² − 4x + 8)(x² + 4x + 8).'},
 {kind:'Méthode',h:'Relations entre coefficients et racines',p:'<b>Quand</b> : on connaît certaines racines et on cherche les autres, ou on veut contrôler une factorisation. <b>Pourquoi ça marche</b> : on développe a(x − x₁)(x − x₂)(x − x₃) et on identifie avec ax³ + bx² + cx + d. <b>Comment</b> : pour le degré 3, <b>x₁ + x₂ + x₃ = −b/a</b>, <b>x₁x₂ + x₁x₃ + x₂x₃ = c/a</b>, <b>x₁x₂x₃ = −d/a</b>. Au degré 2 : somme −b/a et produit c/a.',
  demo:{enonce:'Vérifie la factorisation x³ − 6x² + 11x − 6 = (x − 1)(x − 2)(x − 3).',etapes:[
   {f:'Somme : 1 + 2 + 3 = 6 = −(−6)/1',w:'Le coefficient de x² est −(x₁ + x₂ + x₃).'},
   {f:'Produits deux à deux : 2 + 3 + 6 = 11 = 11/1',w:'Coefficient de x.'},
   {f:'Produit : 1 · 2 · 3 = 6 = −(−6)/1',w:'Le terme constant est −x₁x₂x₃.'}],
   conclusion:'Les trois relations sont vérifiées : la factorisation est juste.'},
  note:'Pratique pour trouver la dernière racine : si un polynôme n’a pas de terme en x², la somme de ses racines est nulle.'},
 {h:'La troisième racine',p:'Le polynôme <i>x³ + px + q</i> (pas de terme en x²) a pour racines 1 et 2. Quelle est sa troisième racine&nbsp;?',lab:'x₃ =',ans:-3,
  why:'La somme des racines vaut −b/a = 0, donc x₃ = −(1 + 2) = −3. On trouve x³ − 7x + 6 = (x − 1)(x − 2)(x + 3).'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Chercher les racines d’un polynôme et le factoriser, c’est le même travail : chaque racine <i>a</i> fournit un facteur x − a.</p>`
  +keep([`<b>Degré</b> : deg(PQ) = deg P + deg Q. Le terme dominant décide de tout.`,
   `<b>Division euclidienne</b> : A = BQ + R avec deg R &lt; deg B, couple unique. On élimine le terme dominant à chaque étape, en écrivant à 0 les termes manquants.`,
   `<b>Théorème du reste</b> : le reste de P par x − a vaut P(a). Donc <i>a</i> racine ⇔ (x − a) divise P.`,
   `<b>Multiplicité m</b> : P(a) = P′(a) = … = P⁽ᵐ⁻¹⁾(a) = 0 et P⁽ᵐ⁾(a) ≠ 0. Une racine double est un point où le graphe touche l’axe sans le traverser.`,
   `<b>Nombre de racines</b> : au plus <i>n</i> pour un degré <i>n</i> ; sur ℂ, exactement <i>n</i> avec multiplicités (d’Alembert-Gauss) : P = a(x − z₁)…(x − zₙ).`,
   `<b>Polynôme réel</b> : les racines non réelles vont par paires conjuguées, et (x − z)(x − z̄) = x² − 2 Re(z)x + |z|². Irréductibles sur ℝ : degré 1, et degré 2 avec Δ &lt; 0.`,
   `<b>Outils de factorisation</b> : une racine entière divise le terme constant ; une différence de carrés, comme x⁴ + 4 = (x² + 2)² − (2x)².`,
   `<b>Racines et coefficients</b> (degré 3) : somme −b/a, produits deux à deux c/a, produit −d/a.`])},
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
 {kind:'Théorie',h:'Négligeable devant xⁿ : la notation o',p:`<p>Près de 0, sin x ressemble beaucoup à x : sin 0,1 ≈ 0,09983. Mais « ressembler » est vague. Pour approcher une fonction par un polynôme, il faut une façon précise de dire qu’une erreur est négligeable.</p>`
  +bk('def',`On écrit <b>g(x) = o(xⁿ)</b> quand x → 0, et on lit « petit o de xⁿ », si <b>g(x)/xⁿ → 0</b> : g tend vers 0 plus vite que xⁿ. Un <b>développement limité</b> (DL) de <i>f</i> à l’ordre <i>n</i> en 0 est une écriture <b>f(x) = a₀ + a₁x + … + aₙxⁿ + o(xⁿ)</b>.`)
  +bk('idea',`Le o(xⁿ) est un reste dont on ignore la valeur exacte : on sait seulement qu’il est tout petit devant xⁿ près de 0. Plus l’ordre <i>n</i> est grand, plus ce reste est petit, et plus le polynôme colle à la fonction.`)
  +bk('ex',`x³ = o(x²), car x³/x² = x → 0. La dérivée donne le DL d’ordre 1 : f(x) = f(0) + f′(0)x + o(x), puisque (f(x) − f(0))/x − f′(0) → 0. Pour eˣ : eˣ = 1 + x + o(x). En x = 0,1 : e${sup('0,1')} ≈ 1,10517 et 1 + 0,1 = 1,1. L’erreur 0,00517 ne vaut qu’environ 5 % de x = 0,1.`)
  +bk('warn',`o(xⁿ) ne désigne pas une fonction précise : o(x²) − o(x²) vaut o(x²), pas 0. Les règles utiles : xᵏ · o(xⁿ) = o(x${sup('n+k')}), et o(xⁿ) + o(x${sup('m')}) = o(xⁿ) si n ≤ m. Tout terme en x${sup('m')} avec m &gt; n est aussi un o(xⁿ) : on peut l’oublier.`)},
 {kind:'Théorie',h:'La formule de Taylor',p:`<p>La tangente est la meilleure droite près de <i>a</i>. Pour faire mieux, on cherche le polynôme de degré <i>n</i> qui a, en <i>a</i>, la même valeur et les mêmes <i>n</i> premières dérivées que <i>f</i>.</p>`
  +bk('thm',`<b>Taylor-Young.</b> Si <i>f</i> est n fois dérivable en <i>a</i>, son <b>polynôme de Taylor</b> d’ordre n est <b>Pₙ(x) = f(a) + f′(a)(x − a) + ${F('f″(a)','2!')}(x − a)² + … + ${F('f⁽ⁿ⁾(a)','n!')}(x − a)ⁿ</b>, et <b>f(x) = Pₙ(x) + o((x − a)ⁿ)</b> quand x → a : c’est le DL de <i>f</i> à l’ordre n en <i>a</i>.`)
  +bk('why',`D’où viennent les factorielles : dérive k fois (x − a)ᵏ, tu obtiens k! = 1 · 2 · … · k (avec 0! = 1). Les autres puissances donnent 0 en x = a. Si P = Σ c<sub>k</sub>(x − a)ᵏ, alors P⁽ᵏ⁾(a) = c<sub>k</sub> · k!, et pour que ce soit f⁽ᵏ⁾(a), il faut c<sub>k</sub> = f⁽ᵏ⁾(a)/k!.`)
  +bk('ex',`eˣ en 0 : toutes ses dérivées valent e⁰ = 1, donc Pₙ(x) = 1 + x + x²/2! + … + xⁿ/n!. En x = 1 : P₃(1) = 1 + 1 + 0,5 + 0,1667 ≈ 2,6667, contre e ≈ 2,7183. La figure montre Pₙ (trait fin) qui suit eˣ (trait épais gris) de plus en plus loin quand n grandit.`)
  +bk('warn',`Le DL est un énoncé <b>local</b> : il décrit f quand x → a, pas loin de a. Pour chiffrer l’erreur en un point donné, il faudra le reste de Lagrange, plus bas.`),
  params:[{id:'n',l:'Ordre n',min:0,max:8,v:1}],
  draw:v=>{ const T=x=>{ let s=0,t=1; for(let k=0;k<=v.n;k++){ s+=t; t*=x/(k+1); } return s; }; const P=plane({x:[-4,3],y:[-2,8],h:300,lab:1});
    P.fn(Math.exp,{c:'var(--muted)',w:5,op:.6}).fn(T,{n:300}).dot(0,1,{r:4}); return P.svg(); },
  info:v=>{ const T=x=>{ let s=0,t=1; for(let k=0;k<=v.n;k++){ s+=t; t*=x/(k+1); } return s; }; return `P${['₀','₁','₂','₃','₄','₅','₆','₇','₈'][v.n]}(1) ≈ ${fmt(T(1),5)} contre e ≈ ${fmt(Math.E,5)} (écart ${sci(Math.E-T(1))})`; },
  note:'Pour a = 0, on parle aussi de formule de Mac-Laurin : Pₙ(x) = f(0) + f′(0)x + … + f⁽ⁿ⁾(0)xⁿ/n!.'},
 {kind:'Théorie',h:'Les DL usuels en 0',p:`<p>Presque tous les DL se fabriquent à partir de quelques développements de base. Chacun sort de la formule de Taylor en 0 : il suffit de connaître les dérivées en 0. Ceux-ci sont à connaître par cœur.</p>`
  +bk('prop',`eˣ = 1 + x + ${F('x²','2')} + ${F('x³','6')} + … + ${F('xⁿ','n!')} + o(xⁿ)<br>sin x = x − ${F('x³','6')} + ${F('x⁵','120')} − … <br>cos x = 1 − ${F('x²','2')} + ${F('x⁴','24')} − … <br>ln(1 + x) = x − ${F('x²','2')} + ${F('x³','3')} − … + (−1)ⁿ⁺¹${F('xⁿ','n')} + o(xⁿ)<br>(1 + x)${sup('α')} = 1 + αx + ${F('α(α − 1)','2')}x² + … + o(xⁿ)<br>${F(1,'1 − x')} = 1 + x + x² + … + xⁿ + o(xⁿ)`)
  +bk('why',`sin : les dérivées sin, cos, −sin, −cos valent en 0 : 0, 1, 0, −1, puis le cycle recommence. D’où les coefficients 0, 1, 0, −1/3!, 0, 1/5!… Pour cos, le cycle part de 1. Pour ln(1 + x), la dérivée k-ième en 0 vaut (−1)${sup('k−1')}(k − 1)! ; divisée par k!, elle donne (−1)${sup('k−1')}/k : la factorielle se simplifie. Pour (1 + x)${sup('α')}, elle vaut α(α − 1)…(α − k + 1). Enfin 1/(1 − x) est le cas α = −1 avec x changé en −x.`)
  +bk('ex',`α = −1/2 : ${F('α(α − 1)','2')} = ${F('(−1/2)(−3/2)','2')} = 3/8, donc 1/√(1 + x) = 1 − x/2 + 3x²/8 + o(x²). En x = 0,1 : 1 − 0,05 + 0,00375 = 0,95375, et la vraie valeur est 0,95346.`)
  +bk('warn',`Tous ces DL sont <b>en 0</b>. ln x n’a pas de DL en 0, il n’y est même pas défini : c’est ln(1 + x) qu’on développe. Et ln(1 + x) a des dénominateurs 1, 2, 3, …, pas 1!, 2!, 3!.`),
  note:'sin est impaire : seules les puissances impaires apparaissent. cos est paire : seulement les paires. ln(1 + x) n’a pas de factorielles au dénominateur.'},
 {h:'DL de cos',p:'Quel est le DL de <i>cos x</i> à l’ordre 4 en 0&nbsp;?',
  opts:['1 − x² + x⁴','x − x³/6','1 + x²/2 + x⁴/24','1 − x²/2 + x⁴/24'],ans:3,
  why:'Les dérivées de cos en 0 valent 1, 0, −1, 0, 1. Donc cos x = 1 − x²/2! + x⁴/4! + o(x⁴) = 1 − x²/2 + x⁴/24 + o(x⁴).'},
 {h:'Un coefficient',p:'Quel est le coefficient de <i>x²</i> dans le DL de <i>√(1 + x)</i> en 0&nbsp;? (Une fraction comme 1/3 est acceptée.)',lab:'coefficient =',ans:-.125,tol:.0001,
  why:'√(1 + x) = (1 + x)^(1/2). Le coefficient de x² est α(α − 1)/2 = (½)(−½)/2 = −1/8. Donc √(1 + x) = 1 + x/2 − x²/8 + o(x²).'},
 {kind:'Théorie',h:'Un seul DL possible : unicité et parité',p:`<p>Les méthodes qui suivent fabriquent des DL par des calculs, produits ou compositions, sans jamais dériver. Pourquoi le résultat est-il le bon ? Parce qu’à un ordre donné, il n’y a qu’un DL.</p>`
  +bk('thm',`Si f(x) = a₀ + a₁x + … + aₙxⁿ + o(xⁿ) et aussi f(x) = b₀ + b₁x + … + bₙxⁿ + o(xⁿ), alors a<sub>k</sub> = b<sub>k</sub> pour tout k : le DL d’ordre n, quand il existe, est <b>unique</b>.`)
  +bk('why',`Soustrais les deux écritures : (a₀ − b₀) + (a₁ − b₁)x + … + (aₙ − bₙ)xⁿ = o(xⁿ). Quand x → 0, la gauche tend vers a₀ − b₀ et la droite vers 0 : a₀ = b₀. Divise ensuite par x et recommence : a₁ = b₁, et ainsi de suite jusqu’à aₙ = bₙ.`)
  +bk('prop',`Si <i>f</i> est <b>paire</b>, son DL en 0 ne contient que des puissances paires. Si <i>f</i> est <b>impaire</b>, que des puissances impaires.`)
  +bk('why',`Si f est paire, f(−x) = f(x). Changer x en −x dans le DL change le signe des termes de degré impair. Par unicité, a<sub>k</sub> = −a<sub>k</sub> pour k impair, donc a<sub>k</sub> = 0.`)
  +bk('ex',`cos est paire : son DL n’a ni x, ni x³. Ainsi cos x = 1 − x²/2 + x⁴/24 + o(x⁵), car le coefficient de x⁵ est nul. De même tan est impaire, donc son DL n’a que x, x³, x⁵…`)
  +bk('idea',`En pratique, n’importe quelle méthode correcte, dériver, multiplier, composer, donne le même DL. Tu choisis la plus rapide, et la parité te dit d’avance quels coefficients sont nuls.`)},
 {kind:'Méthode',h:'Additionner et multiplier des DL',p:'<b>Quand</b> : la fonction est une somme ou un produit de fonctions usuelles, comme eˣ sin x. <b>Pourquoi ça marche</b> : les DL se manipulent comme des polynômes, et tout terme de degré &gt; n est absorbé par le o(xⁿ). <b>Comment</b> : écris chaque DL au même ordre n, multiplie comme des polynômes, mais <b>ne garde que les termes de degré ≤ n</b>. Inutile de calculer les autres.',
  demo:{enonce:'Trouve le DL de eˣ sin x à l’ordre 3 en 0.',etapes:[
   {f:'eˣ = 1 + x + x²/2 + o(x²) et sin x = x − x³/6 + o(x³)',w:'sin x commence en x : pour un produit d’ordre 3, eˣ à l’ordre 2 suffit.'},
   {f:'(1 + x + x²/2)(x − x³/6) = x + x² + x³/2 − x³/6 + (termes de degré ≥ 4)',w:'On développe en ne gardant que les degrés ≤ 3.'},
   {f:'x³/2 − x³/6 = x³/3',w:'On regroupe les termes de même degré.'}],
   conclusion:'eˣ sin x = x + x² + x³/3 + o(x³).'},
  note:'Ordre utile : si un facteur commence par xᵏ, l’autre n’a besoin que de l’ordre n − k.'},
 {h:'Un produit de DL',p:'Quel est le coefficient de <i>x³</i> dans le DL de <i>eˣ cos x</i> en 0&nbsp;? (Une fraction comme 1/3 est acceptée.)',lab:'coefficient =',ans:-1/3,tol:.001,
  why:'eˣ = 1 + x + x²/2 + x³/6 et cos x = 1 − x²/2. Termes en x³ : 1 · x³/6 et x · (−x²/2), soit 1/6 − 1/2 = −1/3.'},
 {kind:'Méthode',h:'Composer des DL',p:'<b>Quand</b> : la fonction est de la forme f(u(x)), comme ln(cos x) ou e^(sin x). <b>Pourquoi ça marche</b> : si <b>u(x) → 0</b> quand x → 0, on peut remplacer la variable du DL de f par u(x) : un o(uⁿ) est alors un o(xⁿ) dès que u est d’ordre ≥ 1. <b>Comment</b> : vérifie que u(0) = 0 (sinon, mets une constante en facteur), écris le DL de f(u), remplace u par son DL, développe les puissances de u en tronquant à l’ordre voulu.',
  demo:{enonce:'Trouve le DL de ln(cos x) à l’ordre 4 en 0.',etapes:[
   {f:'cos x = 1 + u, avec u = −x²/2 + x⁴/24 + o(x⁴)',w:'On écrit cos x sous la forme 1 + u avec u → 0, pour utiliser ln(1 + u).'},
   {f:'ln(1 + u) = u − u²/2 + o(u²)',w:'u est d’ordre 2 : u³ est d’ordre 6, inutile pour l’ordre 4.'},
   {f:'u² = x⁴/4 + o(x⁴)',w:'On ne garde que le terme de plus bas degré du carré.'},
   {f:'ln(cos x) = −x²/2 + x⁴/24 − x⁴/8 + o(x⁴)',w:'On remplace u et u² dans le DL de ln(1 + u).'},
   {f:'x⁴/24 − x⁴/8 = x⁴/24 − 3x⁴/24 = −x⁴/12',w:'On regroupe.'}],
   conclusion:'ln(cos x) = −x²/2 − x⁴/12 + o(x⁴).'},
  note:'Erreur classique : composer ln avec cos x directement. cos x → 1, pas 0 : il faut d’abord écrire cos x = 1 + u.'},
 {h:'Une composée',p:'Quel est le coefficient de <i>x³</i> dans le DL de <i>ln(1 + sin x)</i> en 0&nbsp;? (Une fraction est acceptée.)',lab:'coefficient =',ans:1/6,tol:.001,
  why:'u = sin x = x − x³/6. ln(1 + u) = u − u²/2 + u³/3 + o(u³), avec u² = x² + o(x³) et u³ = x³ + o(x³). Termes en x³ : −1/6 + 1/3 = 1/6.'},
 {kind:'Méthode',h:'Diviser des DL',p:`<b>Quand</b> : la fonction est un quotient, comme tan x = sin x/cos x. <b>Pourquoi ça marche</b> : le DL usuel (1 + x)${sup('α')} avec α = −1 donne <b>${F(1,'1 + u')} = 1 − u + u² − u³ + o(u³)</b>. Diviser par un DL qui commence par 1, c’est donc multiplier par un DL obtenu par composition. <b>Comment</b> : écris le dénominateur sous la forme c(1 + u) avec u → 0, développe 1/(1 + u), puis multiplie par le numérateur.`,
  demo:{enonce:'Trouve le DL de tan x à l’ordre 3 en 0.',etapes:[
   {f:'cos x = 1 + u avec u = −x²/2 + o(x³)',w:'Le dénominateur commence par 1.'},
   {f:'1/cos x = 1 − u + o(x³) = 1 + x²/2 + o(x³)',w:'u² est d’ordre 4 : à l’ordre 3, seul −u compte.'},
   {f:'tan x = (x − x³/6)(1 + x²/2) + o(x³)',w:'On multiplie le numérateur par l’inverse du dénominateur.'},
   {f:'= x + x³/2 − x³/6 + o(x³) = x + x³/3 + o(x³)',w:'Produit tronqué à l’ordre 3.'}],
   conclusion:'tan x = x + x³/3 + o(x³).'},
  note:'Si le dénominateur commence par xᵏ, mets xᵏ en facteur en haut et en bas d’abord, puis divise.'},
 {h:'Un quotient',p:'Quel est le coefficient de <i>x²</i> dans le DL de <i>x/(eˣ − 1)</i> en 0&nbsp;? (Une fraction est acceptée.)',lab:'coefficient =',ans:1/12,tol:.0005,
  why:'(eˣ − 1)/x = 1 + u avec u = x/2 + x²/6. Alors 1/(1 + u) = 1 − u + u² = 1 − x/2 − x²/6 + x²/4 + o(x²), et −1/6 + 1/4 = 1/12.'},
 {kind:'Méthode',h:'Un DL en a ≠ 0',p:'<b>Quand</b> : on veut approcher f près d’un point a différent de 0, par exemple √x près de 4. Les DL usuels ne sont donnés qu’en 0. <b>Pourquoi ça marche</b> : en posant <b>x = a + h</b>, h tend vers 0 quand x tend vers a, et on se ramène à un DL en 0 de la variable h. <b>Comment</b> : pose x = a + h, mets en facteur pour faire apparaître une forme usuelle 1 + (petit), développe en h, puis remplace h par x − a.',
  demo:{enonce:'Trouve le DL de √x à l’ordre 2 en 4, puis une valeur approchée de √4,2.',etapes:[
   {f:'√(4 + h) = 2√(1 + h/4)',w:'On met 4 en facteur pour retrouver (1 + u)^(1/2) avec u = h/4 → 0.'},
   {f:'√(1 + u) = 1 + u/2 − u²/8 + o(u²)',w:'DL usuel avec α = 1/2.'},
   {f:'√(4 + h) = 2(1 + h/8 − h²/128) + o(h²) = 2 + h/4 − h²/64 + o(h²)',w:'On remplace u par h/4, puis on distribue le 2.'},
   {f:'h = 0,2 : 2 + 0,05 − 0,000625 ≈ 2,04938',w:'√4,2 ≈ 2,04939 : l’approximation est très bonne.'}],
   conclusion:'√x = 2 + (x − 4)/4 − (x − 4)²/64 + o((x − 4)²).'}},
 {h:'Approcher √4,1',p:'Avec le DL <i>√(4 + h) ≈ 2 + h/4 − h²/64</i>, donne une valeur approchée de <i>√4,1</i> arrondie à 4 décimales.',lab:'√4,1 ≈',ans:2.0248,tol:.00006,
  why:'h = 0,1 : 2 + 0,025 − 0,01/64 ≈ 2,02484. La vraie valeur est 2,024846…'},
 {kind:'Théorie',h:'Le reste de Lagrange',p:`<p>Le o(xⁿ) dit seulement que l’erreur devient petite quand x → 0. Si tu remplaces e par P₄(1), de combien te trompes-tu au plus ? Pour <b>chiffrer</b> l’erreur, il faut une autre forme du reste.</p>`
  +bk('thm',`<b>Taylor-Lagrange.</b> Si <i>f</i> est n + 1 fois dérivable sur un intervalle contenant 0 et <i>x</i>, il existe un nombre <b>ξ entre 0 et x</b> tel que <b>f(x) − Pₙ(x) = ${F('f⁽ⁿ⁺¹⁾(ξ)','(n + 1)!')}xⁿ⁺¹</b>. Pour eˣ avec x &gt; 0, cela donne <b>|Rₙ(x)| ≤ ${E('x')}·${F('xⁿ⁺¹','(n + 1)!')}</b>.`)
  +bk('idea',`Pour n = 0, c’est le théorème des accroissements finis : f(x) − f(0) = f′(ξ)x. Lagrange en est la version d’ordre n : le reste ressemble au terme suivant du DL, mais avec la dérivée prise en un point ξ inconnu (on lit « ksi »).`)
  +bk('ex',`eˣ en x = 1 avec n = 4 : la dérivée 5e est eᵗ ≤ e &lt; 3 entre 0 et 1, donc |e − P₄(1)| ≤ 3/5! = 0,025. Vérification : P₄(1) = 1 + 1 + 0,5 + 0,16667 + 0,04167 ≈ 2,70833 et e ≈ 2,71828, soit une erreur de 0,00995, bien sous le majorant.`)
  +bk('warn',`On ne connaît jamais ξ, qui dépend de x et de n. On ne calcule donc pas f⁽ⁿ⁺¹⁾(ξ) : on la <b>majore</b> sur tout l’intervalle entre 0 et x. Sur la figure, en échelle logarithmique, l’erreur réelle (bleu) reste toujours sous le majorant (jaune), quel que soit n.`),
  params:[{id:'x',l:'x',min:.25,max:2,step:.25,v:1},{id:'n',l:'Ordre n',min:1,max:10,v:3}],
  draw:v=>{ const err=n=>{ let s=0,t=1; for(let k=0;k<=n+40;k++){ if(k>n) s+=t; t*=v.x/(k+1); } return s; }; const fact=m=>{ let p=1; for(let k=2;k<=m;k++) p*=k; return p; };
    const P=plane({x:[0,11],y:[-12,1],h:260,grid:false,lx:1,ly:2}); for(let y=-12;y<=0;y+=2) P.seg(0,y,11,y,{c:'var(--line)',w:1});
    for(let n=1;n<=10;n++){ const b=Math.exp(v.x)*v.x**(n+1)/fact(n+1); P.dot(n,Math.log10(b),{c:'var(--spark)',r:n===v.n?7:4}).dot(n,Math.log10(err(n)),{c:'var(--math)',r:n===v.n?7:4}); }
    P.text(10.9,0,'n',{a:'end',dy:-6,c:'var(--muted)'}).text(.2,.6,'log₁₀(erreur)',{s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ let s=0,t=1; for(let k=0;k<=v.n+40;k++){ if(k>v.n) s+=t; t*=v.x/(k+1); } let f=1; for(let k=2;k<=v.n+1;k++) f*=k; return `x = ${fmt(v.x)}, n = ${v.n} : erreur réelle ${sci(s)}, majorant de Lagrange ${sci(Math.exp(v.x)*v.x**(v.n+1)/f)}`; },
  note:'La factorielle finit toujours par écraser xⁿ⁺¹ : le DL de eˣ converge pour tout x. Plus x est grand, plus il faut monter en ordre.'},
 {kind:'Méthode',h:'Majorer le reste',p:`<b>Quand</b> : on remplace f(x) par Pₙ(x) et on veut une erreur <b>garantie</b>, pas seulement « petite ». <b>Pourquoi ça marche</b> : Lagrange donne f(x) − Pₙ(x) = ${F('f⁽ⁿ⁺¹⁾(ξ)','(n + 1)!')}xⁿ⁺¹ avec ξ entre 0 et x inconnu. On ne connaît pas ξ, mais on peut <b>majorer |f⁽ⁿ⁺¹⁾| sur tout l’intervalle</b>. <b>Comment</b> : trouve M avec |f⁽ⁿ⁺¹⁾(t)| ≤ M entre 0 et x, puis <b>|erreur| ≤ M·${F('|x|ⁿ⁺¹','(n + 1)!')}</b>. Pour chercher n, augmente n jusqu’à passer sous la précision voulue.`,
  demo:{enonce:'On approche cos(0,2) par 1 − x²/2. Majore l’erreur.',etapes:[
   {f:'1 − x²/2 = P₂(x), mais aussi P₃(x)',w:'Le terme en x³ du DL de cos est nul : le polynôme d’ordre 2 est aussi celui d’ordre 3. On prend le reste d’ordre 3, plus petit.'},
   {f:'Reste : cos⁽⁴⁾(ξ)·x⁴/4! avec cos⁽⁴⁾ = cos',w:'Lagrange à l’ordre n = 3 : on dérive 4 fois.'},
   {f:'|cos ξ| ≤ 1, donc |erreur| ≤ 0,2⁴/24 = 0,0016/24 ≈ 6,7·10⁻⁵',w:'M = 1 convient sur tout ℝ.'},
   {f:'1 − 0,02 = 0,98 et cos(0,2) ≈ 0,980067',w:'Contrôle : l’erreur réelle, 6,66·10⁻⁵, est bien sous le majorant.'}],
   conclusion:'cos(0,2) = 0,98 à moins de 6,7·10⁻⁵ près.'},
  note:'Pour eˣ avec x &gt; 0, la dérivée eᵗ est maximale en t = x : on prend M = eˣ, majoré par un entier simple (e &lt; 3, e^0,5 &lt; 2).'},
 {h:'Combien de termes&nbsp;?',p:'On approche <i>e = e¹</i> par Pₙ(1) = 1 + 1 + 1/2! + … + 1/n!. En utilisant e &lt; 3, quel est le plus petit <i>n</i> pour lequel le majorant de Lagrange 3/(n + 1)! garantit une erreur inférieure à 10⁻³&nbsp;?',lab:'n =',ans:6,
  why:'Il faut (n + 1)! &gt; 3000. Or 6! = 720 &lt; 3000 et 7! = 5040 &gt; 3000. Donc n + 1 = 7, soit n = 6.'},
 {h:'Trigonométrie approchée',p:'Approche <i>sin(0,5)</i> par le DL <i>x − x³/6</i>. Donne le résultat arrondi à 4 décimales.',lab:'sin(0,5) ≈',ans:.4792,tol:.00006,
  why:'0,5 − 0,125/6 = 0,5 − 0,020833 ≈ 0,4792. Comme le terme en x⁴ est nul, Lagrange à l’ordre 4 borne l’erreur par 0,5⁵/120 ≈ 2,6·10⁻⁴. La vraie valeur est 0,47943.'},
 {kind:'Méthode',h:'Une limite par DL',p:'<b>Quand</b> : une forme indéterminée 0/0 en 0 avec des fonctions usuelles, où les équivalents simples se compensent (comme x − sin x, où x ~ sin x ne dit rien). <b>Pourquoi ça marche</b> : le DL donne le <b>premier terme non nul</b> de la différence, qui est un équivalent. <b>Comment</b> : développe numérateur et dénominateur jusqu’au premier terme qui ne s’annule pas, garde ce terme, simplifie la puissance de x.',
  demo:{enonce:'Calcule la limite de (x − sin x)/x³ quand x → 0.',etapes:[
   {f:'sin x = x − x³/6 + o(x³)',w:'Le dénominateur est x³ : il faut le DL du numérateur à l’ordre 3.'},
   {f:'x − sin x = x³/6 + o(x³)',w:'Les termes en x se compensent : le premier terme non nul est en x³.'},
   {f:'(x − sin x)/x³ = 1/6 + o(1)',w:'On divise par x³ : o(x³)/x³ tend vers 0.'}],
   conclusion:'La limite vaut 1/6.'},
  note:'Si tu développes à un ordre trop bas (sin x = x + o(x)), tu obtiens o(x)/x³ et tu ne peux pas conclure : monte d’un ordre.'},
 {h:'Une limite avec ln',p:'Que vaut la limite de <i>(ln(1 + x) − x)/x²</i> quand x → 0&nbsp;?',lab:'limite =',ans:-.5,tol:.001,
  why:'ln(1 + x) = x − x²/2 + o(x²), donc ln(1 + x) − x = −x²/2 + o(x²). Le quotient tend vers −1/2.'},
 {kind:'Défi',h:'Une limite par DL',p:'Que vaut la limite de <i>(eˣ − 1 − x)/x²</i> quand x → 0&nbsp;?',opts:['0','½','1','+∞'],ans:1,
  why:'eˣ = 1 + x + x²/2 + o(x²), donc eˣ − 1 − x = x²/2 + o(x²). Le quotient vaut ½ + o(1) et tend vers ½.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Un DL remplace une fonction par un polynôme près d’un point, avec un reste qu’on sait négliger (o) ou chiffrer (Lagrange).</p>`
  +keep([`<b>Notation o</b> : g = o(xⁿ) si g(x)/xⁿ → 0. Tout terme de degré &gt; n est absorbé par le o(xⁿ).`,
   `<b>Taylor-Young</b> : f(x) = f(a) + f′(a)(x − a) + … + f⁽ⁿ⁾(a)(x − a)ⁿ/n! + o((x − a)ⁿ).`,
   `<b>DL usuels en 0</b> : eˣ, sin x, cos x, ln(1 + x), (1 + x)${sup('α')}, 1/(1 − x). Le DL est unique ; une fonction paire n’a que des puissances paires, une impaire que des impaires.`,
   `<b>Somme, produit</b> : calcule comme avec des polynômes et tronque à l’ordre n ; si un facteur commence par xᵏ, l’autre suffit à l’ordre n − k.`,
   `<b>Composée f(u)</b> : il faut u → 0 ; écris par exemple cos x = 1 + u avant d’utiliser ln(1 + u). <b>Quotient</b> : mets le dénominateur sous la forme c(1 + u) et utilise 1/(1 + u) = 1 − u + u² − …`,
   `<b>DL en a ≠ 0</b> : pose x = a + h et développe en h → 0.`,
   `<b>Lagrange</b> : f(x) − Pₙ(x) = f⁽ⁿ⁺¹⁾(ξ)xⁿ⁺¹/(n + 1)!, ξ entre 0 et x ; majore |f⁽ⁿ⁺¹⁾| par M, puis |erreur| ≤ M|x|ⁿ⁺¹/(n + 1)!.`,
   `<b>Limites</b> : développe numérateur et dénominateur jusqu’au premier terme non nul ; il donne un équivalent.`])},
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
 {kind:'Théorie',h:'Une équation dont l’inconnue est une fonction',p:`<p>Un café refroidit d’autant plus vite qu’il est chaud ; une population grandit d’autant plus vite qu’elle est nombreuse. Dans ces situations, on connaît une relation entre une grandeur y et sa dérivée y′, et on cherche la fonction y elle-même.</p>`
  +bk('def',`Une <b>équation différentielle</b> (ED) relie une fonction inconnue y, sa variable x et ses dérivées. Elle est <b>du 1er ordre</b> si seule y′ apparaît. Une <b>solution</b> sur un intervalle I est une fonction dérivable sur I qui vérifie l’égalité en tout point de I. L’ED est <b>linéaire</b> si elle s’écrit <b>y′ + a(x)y = b(x)</b>, et <b>homogène</b> si de plus b = 0.`)
  +bk('ex',`y = ${E('2x')} est solution de y′ = 2y : y′ = 2${E('2x')} = 2y. En revanche y = x² ne l’est pas : y′ = 2x, et en x = 2 on trouve 4 ≠ 2 · 4 = 8. Pour vérifier une solution, on dérive et on remplace : pas besoin de savoir résoudre.`)
  +bk('idea',`Une ED a en général une <b>infinité</b> de solutions : 3${E('2x')} ou −${E('2x')} conviennent aussi. Il faut une information de plus, la valeur au départ, pour en choisir une seule.`)
  +bk('warn',`y′ = y² ou y′ = sin y ne sont <b>pas linéaires</b> : y apparaît au carré ou à l’intérieur d’une fonction. Les méthodes des équations linéaires ne s’y appliquent pas ; pour certaines, on utilisera la séparation des variables.`)},
 {kind:'Théorie',h:'L’équation homogène',p:`<p>Commençons par le cas le plus simple, y′ = ky : la vitesse de variation est proportionnelle à la grandeur elle-même, comme pour un capital placé à intérêts continus.</p>`
  +bk('thm',`Sur un intervalle où <i>a</i> est continue, les solutions de <i>y′ + a(x)·y = 0</i> sont les fonctions <b>y = C·${E('−A(x)')}</b>, où A est une primitive de a et C ∈ ℝ. Pour a constant, <i>y′ = ky</i> donne <b>y = C${E('kx')}</b>.`)
  +bk('why',`Multiplie y par ${E('A(x)')} et dérive : (y${E('A')})′ = (y′ + a·y)${E('A')} = 0. Une fonction de dérivée nulle sur un intervalle est constante : y${E('A')} = C, donc y = C${E('−A')}. Ce calcul prouve aussi qu’il n’y a <b>pas d’autre</b> solution.`)
  +bk('ex',`y′ + 2xy = 0 : a(x) = 2x, A(x) = x², donc y = C${E('−x²')}. Contrôle : y′ = −2xC${E('−x²')} = −2xy.`)
  +bk('def',`Imposer en plus y(x₀) = y₀ s’appelle un <b>problème de Cauchy</b>. Pour y′ = ky avec y(0) = y₀, on trouve C = y₀, donc y = y₀${E('kx')} : une seule solution.`)
  +bk('idea',`La figure trace en chaque point un petit trait de pente k·y, celle que l’équation impose à une solution qui passe par là. Une solution est une courbe qui suit ces traits ; le curseur y₀ choisit laquelle.`),
  params:[{id:'k',l:'k',min:-1.5,max:1.5,step:.25,v:.5},{id:'y',l:'y₀',min:-3,max:3,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],lab:2});
    for(let x=-3.5;x<=3.5;x+=1) for(let y=-3.5;y<=3.5;y+=1){ const m=v.k*y, L=.3/Math.hypot(1,m); P.seg(x-L,y-L*m,x+L,y+L*m,{c:'var(--muted)',w:1.5}); }
    P.fn(x=>v.y*Math.exp(v.k*x)).dot(0,v.y,{r:5,l:'y₀'}); return P.svg(); },
  info:v=>`y = ${fmt(v.y)}·e${sup(fmt(v.k)+'x')} · chaque petit trait a la pente k·y imposée par l’équation`,
  note:'Une solution qui vaut 0 en un point est nulle partout : deux courbes solutions distinctes ne se croisent jamais (unicité de Cauchy-Lipschitz).'},
 {h:'Un problème de Cauchy',p:'Quelle est la solution de <i>y′ = −2y</i> avec <i>y(0) = 3</i>&nbsp;?',opts:['y = 3e^(2x)','y = −2e^(3x)','y = 3e^(−2x)','y = 3 − 2x'],ans:2,
  why:'Les solutions sont C·e^(−2x), et y(0) = C = 3. Vérification : y′ = −6e^(−2x) = −2y.'},
 {kind:'Théorie',h:'Homogène plus particulière',p:`<p>Avec un second membre, comme y′ + y = 2, une exponentielle seule ne suffit plus. Heureusement, il suffit de trouver <b>une</b> solution pour les obtenir toutes.</p>`
  +bk('thm',`Si y<sub>p</sub> est une solution de <i>y′ + a(x)y = b(x)</i>, alors les solutions sont exactement <b>y = y<sub>p</sub> + C${E('−A(x)')}</b>, C ∈ ℝ : une solution <b>particulière</b> plus la solution générale de l’équation <b>homogène</b>.`)
  +bk('why',`Si y est une solution, la différence d = y − y<sub>p</sub> vérifie d′ + a·d = b − b = 0 : c’est une solution homogène, donc d = C${E('−A')}. Réciproquement, ajouter une solution homogène à y<sub>p</sub> ne change pas le second membre. C’est la <b>linéarité</b> qui permet ce découpage.`)
  +bk('ex',`y′ + y = 2 : la constante y<sub>p</sub> = 2 convient, car 0 + 2 = 2. L’homogène y′ + y = 0 donne C${E('−x')}. Donc y = 2 + C${E('−x')}. Toutes les solutions tendent vers 2 : le terme homogène s’éteint.`)
  +bk('idea',`Chaque solution s’obtient en décalant y<sub>p</sub> d’une solution homogène. Reste à trouver y<sub>p</sub> : la deviner quand le second membre est simple, ou faire varier la constante, comme dans la méthode suivante.`)
  +bk('warn',`Ce découpage n’existe que pour une équation linéaire. Pour y′ = y², la somme de deux solutions n’est pas une solution.`)},
 {kind:'Méthode',h:'Inhomogène : variation de la constante',p:`<b>Quand</b> : une équation linéaire <i>y′ + a(x)y = b(x)</i> avec un second membre b ≠ 0, surtout si a n’est pas constant ou si b n’a pas une forme simple. Pour <i>y′ + a(x)y = b(x)</i>, la solution générale est <b>y = y<sub>h</sub> + y<sub>p</sub></b> : homogène plus <b>une</b> solution particulière (la différence de deux solutions vérifie l’équation homogène). <b>Comment</b> : pour trouver y<sub>p</sub>, on cherche y = C(x)${E('−A(x)')} : en reportant, les termes en C(x) s’annulent et il reste <b>C′(x) = b(x)${E('A(x)')}</b>, qu’on intègre.`,
  fig:`<p>Exemple : y′ + y = x. Ici A(x) = x, donc C′(x) = x${E('x')} et C(x) = (x − 1)${E('x')} (par parties). D’où y<sub>p</sub> = x − 1 et <b>y = C${E('−x')} + x − 1</b>.</p>`,
  demo:{enonce:'Résous y′ + y/x = 3x sur ]0 ; +∞[.',etapes:[
   {f:`a(x) = 1/x, A(x) = ln x, y<sub>h</sub> = C${E('−ln x')} = C/x`,w:'On résout d’abord l’équation homogène y′ + y/x = 0.'},
   {f:'On cherche y = C(x)/x : y′ = C′(x)/x − C(x)/x²',w:'On fait « varier » la constante : C devient une fonction.'},
   {f:'y′ + y/x = C′(x)/x = 3x, donc C′(x) = 3x²',w:'Les termes en C(x) se simplifient toujours : c’est ce qui rend la méthode efficace.'},
   {f:'C(x) = x³ + K, donc y = x² + K/x',w:'On intègre ; la constante K redonne la solution homogène.'},
   {f:'Contrôle : (x²)′ + x²/x = 2x + x = 3x',w:'y_p = x² vérifie bien l’équation.'}],
   conclusion:'Les solutions sont y = x² + K/x, K ∈ ℝ.'},
  note:'Vérifie toujours : (x − 1)′ + (x − 1) = 1 + x − 1 = x. Pour un second membre simple, on peut aussi deviner y_p de la même forme que b(x).'},
 {kind:'Méthode',h:'Appliquer la condition initiale',p:'<b>Quand</b> : on demande <b>la</b> solution qui vérifie y(x₀) = y₀ (problème de Cauchy). <b>Pourquoi ça marche</b> : la solution générale y = y<sub>p</sub> + C·y₁ contient une seule constante, et une seule équation y(x₀) = y₀ la détermine. <b>Comment</b> : écris d’abord la solution générale <b>complète</b> (homogène + particulière), puis seulement remplace x par x₀ et résous en C.',
  demo:{enonce:'Résous y′ = −2y + 6 avec y(0) = 1.',etapes:[
   {f:'y′ + 2y = 6 : y<sub>h</sub> = Ce^(−2x)',w:'Forme standard y′ + ay = b, avec a = 2.'},
   {f:'y<sub>p</sub> = 3',w:'Second membre constant : on essaie une constante, 2y = 6.'},
   {f:'y = Ce^(−2x) + 3',w:'Solution générale complète.'},
   {f:'y(0) = C + 3 = 1, donc C = −2',w:'Maintenant seulement, on utilise la condition initiale.'}],
   conclusion:'y = 3 − 2e^(−2x). Elle part de 1 et tend vers l’équilibre 3.'},
  note:'Erreur classique : fixer C dans y_h = Ce^(−2x) avant d’ajouter y_p. On trouverait C = 1, ce qui est faux.'},
 {h:'Trouver la constante',p:'Avec <i>y′ + y = x</i> et <i>y(0) = 2</i>, calcule <i>y(1)</i>, arrondi au centième.',lab:'y(1) =',ans:1.1,tol:.006,
  why:'y = Ce^(−x) + x − 1 et y(0) = C − 1 = 2, donc C = 3. Alors y(1) = 3/e + 0 ≈ 1,10.'},
 {h:'Un coefficient non constant',p:'Résous <i>y′ − y/x = x</i> sur ]0 ; +∞[ avec <i>y(1) = 3</i>, puis calcule <i>y(2)</i>.',lab:'y(2) =',ans:8,tol:.001,
  why:'A(x) = −ln x, donc y_h = Cx. Avec y = C(x)·x : C′(x)·x = x, C′ = 1, C = x + K. Donc y = x² + Kx, et y(1) = 1 + K = 3 donne K = 2. y(2) = 4 + 4 = 8.'},
 {kind:'Méthode',h:'Deviner la solution particulière',p:'<b>Quand</b> : y′ + ay = b(x) avec a constant et b(x) constant, polynôme ou exponentielle. C’est plus rapide que la variation de la constante. <b>Pourquoi ça marche</b> : dériver un polynôme donne un polynôme, dériver Be^(mx) donne une exponentielle de même m. Une solution de la même forme que b peut donc convenir. <b>Comment</b> : b polynôme de degré d → y<sub>p</sub> polynôme de degré d. b = Ae^(mx) → y<sub>p</sub> = Be^(mx) si m ≠ −a, et <b>y<sub>p</sub> = Bxe^(mx) si m = −a</b> (résonance : e^(mx) est déjà solution homogène). Reporte et identifie.',
  demo:{enonce:'Trouve une solution particulière de y′ + 2y = e^(3x), puis de y′ − 2y = e^(2x).',etapes:[
   {f:'y = Be^(3x) : 3Be^(3x) + 2Be^(3x) = 5Be^(3x) = e^(3x), donc B = 1/5',w:'3 ≠ −2 : l’essai de même forme fonctionne.'},
   {f:'y = Be^(2x) dans y′ − 2y : 2B − 2B = 0 ≠ 1',w:'e^(2x) est solution de l’homogène y′ − 2y = 0 : l’essai donne toujours 0.'},
   {f:'y = Bxe^(2x) : y′ = B(1 + 2x)e^(2x), y′ − 2y = Be^(2x), donc B = 1',w:'On multiplie l’essai par x.'}],
   conclusion:'y_p = e^(3x)/5 pour la première, y_p = xe^(2x) pour la seconde.'}},
 {h:'Un second membre polynôme',p:'On cherche une solution particulière de <i>y′ + 3y = 6x</i> sous la forme <i>ax + b</i>. Combien vaut <i>b</i>&nbsp;? (Une fraction est acceptée.)',lab:'b =',ans:-2/3,tol:.001,
  why:'(ax + b)′ + 3(ax + b) = 3ax + (a + 3b) = 6x. Donc a = 2 et a + 3b = 0, soit b = −2/3 : y_p = 2x − 2/3.'},
 {kind:'Méthode',h:'Séparation des variables',p:`<b>Quand</b> : l’équation s’écrit <i>y′ = g(x)·h(y)</i>, même non linéaire (y², 1/y…). <b>Pourquoi ça marche</b> : si h(y) ≠ 0, y′/h(y) = g(x). Avec H une primitive de 1/h, le membre de gauche est la dérivée de H(y(x)) : il suffit d’intégrer les deux côtés. <b>Comment</b> : on sépare, <b>${F('dy','h(y)')} = g(x) dx</b>, puis on intègre chaque côté, on ajoute une seule constante, et on isole y. Exemple : y′ = xy donne ∫dy/y = ∫x dx, ln|y| = x²/2 + c, et <b>y = C${E('x²/2')}</b>.`,
  demo:{enonce:'Résous y′ = 2xy² avec y(0) = 1.',etapes:[
   {f:'dy/y² = 2x dx',w:'g(x) = 2x et h(y) = y², non nul près de y = 1.'},
   {f:'−1/y = x² + c',w:'Une primitive de 1/y² est −1/y ; une primitive de 2x est x².'},
   {f:'y(0) = 1 : −1 = c',w:'On fixe la constante avant d’isoler y, c’est plus simple.'},
   {f:'y = −1/(x² − 1) = 1/(1 − x²)',w:'On isole y.'},
   {f:'Contrôle : y′ = 2x/(1 − x²)² = 2x·y²',w:'On vérifie l’équation.'}],
   conclusion:'y = 1/(1 − x²), définie seulement sur ]−1 ; 1[ : une équation non linéaire peut « exploser » en temps fini.'},
  note:'Piège : diviser par h(y) suppose h(y) ≠ 0. Les zéros de h donnent des solutions constantes à ne pas oublier (ici y = 0, qui correspond à C = 0).'},
 {h:'Séparer et intégrer',p:'Quelle est la solution de <i>y′ = x/y</i> avec <i>y(0) = 1</i>&nbsp;?',opts:['y = x + 1','y = e^(x²/2)','y = 1 + x²/2','y = √(x² + 1)'],ans:3,
  why:'y dy = x dx donne y²/2 = x²/2 + c. Avec y(0) = 1 : c = ½, donc y² = x² + 1 et, comme y(0) &gt; 0, y = √(x² + 1).'},
 {kind:'Méthode',h:'Écart à l’équilibre et deux mesures',p:'<b>Quand</b> : une grandeur tend vers une valeur d’équilibre L à une vitesse proportionnelle à l’écart : <i>y′ = −k(y − L)</i> (refroidissement, charge d’un condensateur, mélange). Souvent k est inconnu et on dispose de mesures. <b>Pourquoi ça marche</b> : l’écart E = y − L vérifie E′ = −kE, donc <b>E(t) = E(0)e^(−kt)</b> : il est multiplié par le même facteur e^(−kΔt) sur chaque durée Δt. <b>Comment</b> : passe à l’écart, écris le rapport de deux mesures pour trouver e^(−kΔt), prends ln, puis prédis.',
  demo:{enonce:'y′ = −k(y − 20), y(0) = 80 et y(5) = 50. Trouve k et y(10).',etapes:[
   {f:'E = y − 20 : E(0) = 60 et E(5) = 30',w:'On passe à l’écart, qui suit une exponentielle pure.'},
   {f:'E(5)/E(0) = e^(−5k) = 1/2',w:'Le rapport élimine E(0).'},
   {f:'−5k = ln(1/2), donc k = ln 2/5 ≈ 0,139',w:'On prend ln des deux côtés.'},
   {f:'E(10) = 60 · (e^(−5k))² = 60/4 = 15, donc y(10) = 35',w:'Sur 10 = 2 × 5 unités de temps, l’écart est divisé par 2 deux fois.'}],
   conclusion:'k = ln 2/5 ≈ 0,139 et y(10) = 35. L’écart a une demi-vie de 5 unités.'}},
 {h:'Refroidir un café',p:`Loi de Newton : <i>T′ = −k(T − T<sub>a</sub>)</i>, donc <b>T(t) = T<sub>a</sub> + (T₀ − T<sub>a</sub>)${E('−kt')}</b>. Un café à 90 °C refroidit dans une pièce à 20 °C. Règle <i>k</i> (en min⁻¹) pour qu’il soit à 50 °C au bout de 10 min.`,
  params:[{id:'k',l:'k',min:.02,max:.2,step:.005,v:.05}],
  draw:v=>{ const T=t=>20+70*Math.exp(-v.k*t), P=plane({x:[0,40],y:[0,100],h:240,grid:false,lx:10,ly:20});
    for(let y=20;y<=100;y+=20) P.seg(0,y,40,y,{c:'var(--line)',w:1}); P.seg(0,20,40,20,{c:'var(--muted)',w:1.5,dash:true}).fn(T).dot(10,50,{c:'var(--bad)',r:5,l:'(10 ; 50)'}).dot(10,T(10),{r:5}).text(39,0,'t (min)',{a:'end',dy:-6,c:'var(--muted)',s:11}); return P.svg(); },
  info:v=>`k = ${fmt(v.k,3)} : T(10) ≈ ${fmt(20+70*Math.exp(-10*v.k),1)} °C`,
  ok:v=>Math.abs(20+70*Math.exp(-10*v.k)-50)<.5,why:'50 = 20 + 70e^(−10k) donne e^(−10k) = 3/7, donc k = ln(7/3)/10 ≈ 0,085 min⁻¹.'},
 {kind:'Défi',h:'Charge d’un condensateur',p:`Dans un circuit RC branché sur une tension E, <i>RC·u′ + u = E</i> avec u(0) = 0 donne <i>u(t) = E(1 − ${E('−t/RC')})</i>. Avec R = 10 kΩ et C = 100 µF, au bout de combien de secondes u atteint-elle 90 % de E&nbsp;? Arrondis au centième.`,unit:'s',ans:2.3,tol:.006,
  why:'τ = RC = 10⁴ × 10⁻⁴ = 1 s. 1 − e^(−t) = 0,9 donne e^(−t) = 0,1, soit t = ln 10 ≈ 2,30 s.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Pour une équation linéaire, la solution générale est toujours homogène plus particulière ; la condition initiale vient en dernier.</p>`
  +keep([`<b>ED linéaire du 1er ordre</b> : y′ + a(x)y = b(x). Une solution se vérifie en dérivant et en remplaçant.`,
   `<b>Homogène</b> : y = C${E('−A(x)')} avec A une primitive de a ; y′ = ky donne C${E('kx')}.`,
   `<b>Structure</b> : y = y<sub>p</sub> + y<sub>h</sub>. Une seule solution particulière suffit.`,
   `<b>Variation de la constante</b> : y = C(x)${E('−A(x)')} donne C′(x) = b(x)${E('A(x)')}, qu’on intègre.`,
   `<b>Deviner y<sub>p</sub></b> (a constant) : même forme que b ; pour b = A${E('mx')} avec m = −a, essaie Bx${E('mx')}.`,
   `<b>Problème de Cauchy</b> : écris la solution générale complète, puis seulement fixe C avec y(x₀) = y₀.`,
   `<b>Séparation des variables</b> : y′ = g(x)h(y) donne ∫dy/h(y) = ∫g(x)dx ; les zéros de h donnent des solutions constantes.`,
   `<b>Équilibre</b> : y′ = −k(y − L) donne y = L + (y₀ − L)${E('−kt')} ; l’écart est multiplié par ${E('−kΔt')} sur chaque durée Δt.`])},
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
 {kind:'Théorie',h:'Linéarité et deux constantes',p:`<p>Pour une masse accrochée à un ressort sans frottement, la loi de Newton donne m·y″ = −k·y : l’accélération ramène la masse vers l’équilibre. C’est une équation du <b>2e ordre</b>, car la dérivée seconde y″ y apparaît.</p>`
  +bk('def',`Une ED <b>linéaire du 2e ordre à coefficients constants</b> s’écrit <b>ay″ + by′ + cy = f(x)</b>, avec a, b, c réels et a ≠ 0. Elle est <b>homogène</b> si f = 0.`)
  +bk('prop',`<b>Superposition.</b> Si y₁ et y₂ sont solutions de l’équation homogène, toute combinaison <b>C₁y₁ + C₂y₂</b> l’est aussi.`)
  +bk('why',`La dérivée d’une somme est la somme des dérivées : a(C₁y₁ + C₂y₂)″ + b(C₁y₁ + C₂y₂)′ + c(C₁y₁ + C₂y₂) = C₁(ay₁″ + by₁′ + cy₁) + C₂(ay₂″ + by₂′ + cy₂) = 0 + 0.`)
  +bk('thm',`Si y₁ et y₂ sont deux solutions homogènes <b>non proportionnelles</b>, les solutions homogènes sont exactement les C₁y₁ + C₂y₂. Avec une solution particulière y<sub>p</sub>, la solution générale est <b>y = y<sub>p</sub> + C₁y₁ + C₂y₂</b>.`)
  +bk('ex',`y″ + y = 0 : cos x et sin x sont solutions, car (cos x)″ = −cos x et (sin x)″ = −sin x. Donc y = C₁ cos x + C₂ sin x. Avec y(0) = 2 et y′(0) = 3, on trouve C₁ = 2 et C₂ = 3.`)
  +bk('idea',`Deux constantes, parce qu’il faut deux informations pour fixer un mouvement : la position et la vitesse de départ. Reste à trouver y₁ et y₂ : c’est le rôle de l’équation caractéristique.`)},
 {kind:'Théorie',h:'L’équation caractéristique',p:`<p>Au 1er ordre, y′ = ky avait pour solutions des exponentielles. Essayons la même idée au 2e ordre : cherchons des solutions de la forme y = ${E('rx')}, avec r à trouver.</p>`
  +bk('def',`Pour <i>ay″ + by′ + cy = 0</i> (a ≠ 0), l’<b>équation caractéristique</b> est <b>ar² + br + c = 0</b>. On l’obtient en remplaçant y″ par r², y′ par r et y par 1.`)
  +bk('why',`Avec y = ${E('rx')} : y′ = r${E('rx')} et y″ = r²${E('rx')}. L’équation devient (ar² + br + c)${E('rx')} = 0. Comme ${E('rx')} ne s’annule jamais, ${E('rx')} est solution exactement quand ar² + br + c = 0.`)
  +bk('ex',`y″ − y′ − 6y = 0 : r² − r − 6 = (r − 3)(r + 2), racines 3 et −2. Les exponentielles ${E('3x')} et ${E('−2x')} ne sont pas proportionnelles, donc y = C₁${E('3x')} + C₂${E('−2x')}. Contrôle avec ${E('3x')} : 9 − 3 − 6 = 0.`)
  +bk('idea',`Tout se joue sur le discriminant Δ = b² − 4ac. Si Δ &gt; 0, deux racines réelles donnent deux exponentielles, et c’est fini. Si Δ = 0, il manque une solution ; si Δ &lt; 0, les racines sont complexes. L’étape suivante règle ces deux cas ; le tableau résume les trois formes :`),
  fig:`<p><b>Δ &gt; 0</b>, deux racines réelles r₁, r₂ : y = C₁${E('r₁x')} + C₂${E('r₂x')}.<br><b>Δ = 0</b>, racine double r : y = (C₁ + C₂x)${E('rx')}.<br><b>Δ &lt; 0</b>, racines α ± iβ : y = ${E('αx')}(C₁ cos βx + C₂ sin βx).</p>`,
  note:'Deux constantes, donc deux conditions pour un problème de Cauchy : y(0) et y′(0).'},
 {kind:'Théorie',h:'Racine double et racines complexes',p:`<p>Si Δ = 0, l’équation caractéristique n’a qu’une racine r, donc une seule exponentielle ${E('rx')} : il manque une deuxième solution. Si Δ &lt; 0, les racines sont complexes et ${E('rx')} n’est pas une fonction réelle. Voici comment on s’en sort.</p>`
  +bk('prop',`<b>Δ = 0</b>, racine double r : <b>x${E('rx')}</b> est aussi solution, et <b>y = (C₁ + C₂x)${E('rx')}</b>.`)
  +bk('why',`Racine double : r = −b/(2a), donc 2ar + b = 0. Avec y = x${E('rx')} : y′ = (1 + rx)${E('rx')} et y″ = (2r + r²x)${E('rx')}. Alors ay″ + by′ + cy = [x(ar² + br + c) + (2ar + b)]${E('rx')} = 0, car les deux parenthèses sont nulles.`)
  +bk('prop',`<b>Δ &lt; 0</b>, racines α ± iβ avec β &gt; 0 : <b>y = ${E('αx')}(C₁ cos βx + C₂ sin βx)</b>.`)
  +bk('why',`Par la formule d’Euler, ${E('(α + iβ)x')} = ${E('αx')}(cos βx + i sin βx) est une solution à valeurs complexes. Comme a, b, c sont réels, l’équation agit séparément sur la partie réelle et sur la partie imaginaire : ${E('αx')} cos βx et ${E('αx')} sin βx sont chacune solution.`)
  +bk('ex',`y″ − 4y′ + 4y = 0 : (r − 2)² = 0, donc y = (C₁ + C₂x)${E('2x')}. y″ + 2y′ + 2y = 0 : Δ = 4 − 8 = −4, r = −1 ± i, donc y = ${E('−x')}(C₁ cos x + C₂ sin x).`)
  +bk('idea',`Dans le cas complexe, α règle l’enveloppe : décroissance si α &lt; 0, croissance si α &gt; 0. β règle la pulsation des oscillations, de période 2π/β.`)},
 {kind:'Méthode',h:'Résoudre l’équation homogène',p:`<b>Quand</b> : ay″ + by′ + cy = 0 avec a, b, c constants. <b>Pourquoi ça marche</b> : (${E('rx')})′ = r${E('rx')} et (${E('rx')})″ = r²${E('rx')}, donc ${E('rx')} est solution exactement quand ar² + br + c = 0. Si r = α ± iβ, les parties réelle et imaginaire de ${E('(α + iβ)x')} = ${E('αx')}(cos βx + i sin βx) sont des solutions réelles. <b>Comment</b> : écris l’équation caractéristique (y″ → r², y′ → r, y → 1), calcule Δ, puis choisis la forme selon le signe de Δ.`,
  demo:{enonce:'Résous y″ + 2y′ + 5y = 0.',etapes:[
   {f:'r² + 2r + 5 = 0',w:'Équation caractéristique.'},
   {f:'Δ = 4 − 20 = −16 &lt; 0, r = (−2 ± 4i)/2 = −1 ± 2i',w:'Racines complexes conjuguées : α = −1, β = 2.'},
   {f:'y = e^(−x)(C₁ cos 2x + C₂ sin 2x)',w:'Forme du cas Δ &lt; 0 : la partie réelle α donne l’amortissement, β la pulsation.'}],
   conclusion:'Les solutions sont e^(−x)(C₁ cos 2x + C₂ sin 2x), C₁, C₂ ∈ ℝ.'},
  note:'Ne confonds pas : si Δ = 0, la racine double r donne (C₁ + C₂x)e^(rx), pas C₁e^(rx) + C₂e^(rx), qui n’a qu’une constante utile.'},
 {h:'Deux racines réelles',p:'Quelles sont les solutions de <i>y″ − 3y′ + 2y = 0</i>&nbsp;?',opts:['C₁e^(−x) + C₂e^(−2x)','C₁eˣ + C₂e^(2x)','(C₁ + C₂x)eˣ','C₁ cos 2x + C₂ sin 2x'],ans:1,
  why:'r² − 3r + 2 = (r − 1)(r − 2) = 0 donne r = 1 et r = 2. D’où y = C₁eˣ + C₂e^(2x).'},
 {h:'Une racine double',p:'Quelles sont les solutions de <i>y″ − 6y′ + 9y = 0</i>&nbsp;?',opts:['C₁e^(3x) + C₂e^(−3x)','C e^(3x)','(C₁ + C₂x)e^(3x)','e^(3x)(C₁ cos 3x + C₂ sin 3x)'],ans:2,
  why:'r² − 6r + 9 = (r − 3)² : Δ = 0 et r = 3 est racine double. Les solutions sont (C₁ + C₂x)e^(3x).'},
 {kind:'Théorie',h:'L’oscillateur amorti',p:`<p>Une masse accrochée à un ressort, freinée par un frottement proportionnel à sa vitesse, est l’exemple type d’équation du 2e ordre. On l’écrit sous une forme qui fait apparaître deux nombres physiques.</p>`
  +bk('def',`<b>x″ + 2λx′ + ω₀²x = 0</b>, où <b>ω₀</b> (« oméga zéro ») est la <b>pulsation propre</b>, celle du ressort sans frottement, et <b>λ ≥ 0</b> le coefficient d’<b>amortissement</b>.`)
  +bk('why',`Équation caractéristique r² + 2λr + ω₀² = 0, de discriminant Δ = 4(λ² − ω₀²). Si <b>λ &lt; ω₀</b> : r = −λ ± iω₁ avec ω₁ = √(ω₀² − λ²), régime <b>pseudo-périodique</b>, x = ${E('−λt')}(C₁ cos ω₁t + C₂ sin ω₁t). Si <b>λ = ω₀</b> : racine double −λ, régime <b>critique</b>. Si <b>λ &gt; ω₀</b> : deux racines réelles négatives, régime <b>apériodique</b>.`)
  +bk('ex',`ω₀ = 2 et λ = 0,5 : ω₁ = √(4 − 0,25) ≈ 1,936, d’où une pseudo-période 2π/ω₁ ≈ 3,245. λ = 2 : régime critique. λ = 3 : r = −3 ± √5, soit environ −0,764 et −5,236 ; c’est la racine −0,764, proche de 0, qui rend le retour lent.`)
  +bk('idea',`Fais varier λ, avec ω₀ = 2, x(0) = 1 et x′(0) = 0. Sans frottement, l’oscillation ne s’arrête pas. Avec un peu de frottement, elle reste dans l’enveloppe ±${E('−λt')}. Au régime critique, la masse revient le plus vite possible sans dépasser l’équilibre. Au-delà, le frottement est si fort qu’elle revient lentement.`),
  params:[{id:'l',l:'Amortissement λ',min:0,max:4,step:.25,v:.5}],
  draw:v=>oscFig(v.l,2),
  info:v=>`λ = ${fmt(v.l)} : régime ${regime(v.l,2)}${v.l<2&&v.l>0?`, pseudo-pulsation √(ω₀² − λ²) ≈ ${fmt(Math.sqrt(4-v.l*v.l),3)}`:''}`,
  note:'Les pointillés sont l’enveloppe ±e^(−λt) : en régime pseudo-périodique, l’amplitude décroît exponentiellement.'},
 {h:'Pseudo-pulsation',p:'Pour <i>y″ + 4y′ + 13y = 0</i>, les solutions sont de la forme e^(αx)(C₁ cos βx + C₂ sin βx). Combien vaut β&nbsp;?',lab:'β =',ans:3,
  why:'r² + 4r + 13 = 0 : Δ = 16 − 52 = −36, donc r = (−4 ± 6i)/2 = −2 ± 3i. α = −2 et β = 3.'},
 {kind:'Méthode',h:'Second membre simple',p:'Pour <i>ay″ + by′ + cy = f(x)</i>, encore <b>y = y<sub>h</sub> + y<sub>p</sub></b>. On cherche y<sub>p</sub> de la même forme que f :',
  fig:`<p><b>f polynôme</b> de degré d : y<sub>p</sub> polynôme de degré d (si c ≠ 0).<br><b>f = A${E('mx')}</b> : y<sub>p</sub> = B${E('mx')}, si m n’est pas racine caractéristique.<br><b>f = A cos ωx</b> ou <b>A sin ωx</b> : y<sub>p</sub> = B cos ωx + D sin ωx, si iω n’est pas racine.</p><p>Si m (ou iω) est racine, on multiplie l’essai par x, et par x² si la racine est double : c’est la <b>résonance</b>.</p>`,
  demo:{enonce:'Trouve une solution particulière de y″ + y′ − 2y = 2x.',etapes:[
   {f:'f(x) = 2x est un polynôme de degré 1 et c = −2 ≠ 0 : y<sub>p</sub> = ax + b',w:'On choisit la forme dans le tableau.'},
   {f:'y<sub>p</sub>′ = a, y<sub>p</sub>″ = 0',w:'On dérive l’essai.'},
   {f:'0 + a − 2(ax + b) = −2ax + (a − 2b) = 2x',w:'On reporte dans l’équation et on ordonne.'},
   {f:'−2a = 2 et a − 2b = 0 : a = −1, b = −1/2',w:'On identifie les coefficients de x et les constantes.'}],
   conclusion:'y_p = −x − 1/2, et la solution générale est C₁eˣ + C₂e^(−2x) − x − 1/2.'},
  note:'Exemple : y″ − y = e^(2x). On essaie Be^(2x) : 4B − B = 1, donc B = 1/3.'},
 {h:'Trouver B',p:'On cherche une solution particulière de <i>y″ − y′ − 2y = e^(3x)</i> sous la forme <i>Be^(3x)</i>. Combien vaut B&nbsp;?',lab:'B =',ans:.25,tol:.0001,
  why:'y_p″ − y_p′ − 2y_p = (9 − 3 − 2)Be^(3x) = 4Be^(3x). Il faut 4B = 1, donc B = 1/4. Ça marche car 3 n’est pas racine de r² − r − 2 = (r − 2)(r + 1).'},
 {h:'Un second membre en cosinus',p:'On cherche une solution particulière de <i>y″ + y′ + 2y = 3 cos x</i> sous la forme <i>B cos x + D sin x</i>. Combien vaut <i>B</i>&nbsp;?',lab:'B =',ans:1.5,tol:.001,
  why:'y′ = −B sin x + D cos x et y″ = −y. On obtient (B + D) cos x + (D − B) sin x = 3 cos x, donc D = B et 2B = 3 : B = D = 1,5. i n’est pas racine de r² + r + 2.'},
 {kind:'Méthode',h:'La résonance',p:'<b>Quand</b> : le second membre est Ae^(mx) (ou A cos ωx) et m (ou iω) est <b>racine de l’équation caractéristique</b>. L’essai habituel Be^(mx) donne alors 0 : il est solution homogène, il ne peut rien produire. <b>Pourquoi ça marche</b> : multiplier par x crée de nouveaux termes en dérivant (règle du produit), qui ne s’annulent plus. <b>Comment</b> : essaie <b>Bxe^(mx)</b> si m est racine simple, <b>Bx²e^(mx)</b> si m est racine double. Pour cos ωx, essaie x(B cos ωx + D sin ωx).',
  demo:{enonce:'Trouve une solution particulière de y″ − 3y′ + 2y = eˣ.',etapes:[
   {f:'r² − 3r + 2 = (r − 1)(r − 2) : 1 est racine simple',w:'On vérifie d’abord si m = 1 est racine caractéristique : oui.'},
   {f:'y = Bxeˣ, y′ = B(1 + x)eˣ, y″ = B(2 + x)eˣ',w:'Essai multiplié par x, dérivé avec la règle du produit.'},
   {f:'B[(2 + x) − 3(1 + x) + 2x]eˣ = B(−1)eˣ',w:'Les termes en x se compensent : il ne reste qu’une constante.'},
   {f:'−B = 1, donc B = −1',w:'On identifie avec eˣ.'}],
   conclusion:'y_p = −xeˣ.'},
  note:'En physique, c’est le phénomène de résonance : un oscillateur non amorti forcé à sa propre pulsation voit son amplitude croître comme t.'},
 {h:'Une racine double',p:'On cherche une solution particulière de <i>y″ − 4y′ + 4y = e^(2x)</i> sous la forme <i>Bx²e^(2x)</i>. Combien vaut <i>B</i>&nbsp;?',lab:'B =',ans:.5,tol:.001,
  why:'2 est racine double de (r − 2)². Avec y = Bx²e^(2x) : y′ = B(2x + 2x²)e^(2x), y″ = B(2 + 8x + 4x²)e^(2x). Alors y″ − 4y′ + 4y = 2Be^(2x), donc B = 1/2.'},
 {h:'Amortissement critique',p:'Pour <i>x″ + b·x′ + 9x = 0</i>, avec x(0) = 1 et x′(0) = 0, règle <i>b</i> pour obtenir le régime <b>critique</b>.',
  params:[{id:'b',l:'b',min:0,max:10,step:.5,v:2}],
  draw:v=>oscFig(v.b/2,3),
  info:v=>`b² − 36 = ${fmt(v.b*v.b-36)} : régime ${regime(v.b/2,3)}`,
  ok:v=>v.b===6,why:'Équation caractéristique r² + br + 9 = 0. Régime critique quand Δ = b² − 36 = 0, soit b = 6. Alors r = −3 est racine double et x = (1 + 3t)e^(−3t).'},
 {kind:'Défi',h:'Résonance',p:'Quelle fonction est une solution particulière de <i>y″ + y = cos x</i>&nbsp;?',opts:['½ cos x','(x/2)·sin x','x·cos x','sin x'],ans:1,
  why:'i est racine de r² + 1 = 0 : un essai B cos x + D sin x donne 0, il faut multiplier par x. Avec y = (x/2) sin x : y″ = cos x − (x/2) sin x, donc y″ + y = cos x.'},
 {kind:'Méthode',h:'Les deux conditions initiales',p:'<b>Quand</b> : on impose y(0) = y₀ et y′(0) = v₀ (position et vitesse de départ). <b>Pourquoi ça marche</b> : la solution générale contient deux constantes C₁, C₂, et les deux conditions donnent un système de deux équations linéaires. <b>Comment</b> : écris la solution générale <b>complète</b> y = y<sub>h</sub> + y<sub>p</sub>, dérive-la, puis remplace x par 0 dans y et dans y′, et résous le système.',
  demo:{enonce:'Résous y″ + y = 2 avec y(0) = 0 et y′(0) = 1.',etapes:[
   {f:'r² + 1 = 0, r = ±i : y<sub>h</sub> = C₁ cos x + C₂ sin x',w:'Cas Δ &lt; 0 avec α = 0 et β = 1.'},
   {f:'y<sub>p</sub> = 2',w:'Second membre constant : y = c donne c = 2.'},
   {f:'y = C₁ cos x + C₂ sin x + 2 et y′ = −C₁ sin x + C₂ cos x',w:'Solution générale complète, puis sa dérivée.'},
   {f:'y(0) = C₁ + 2 = 0 et y′(0) = C₂ = 1',w:'cos 0 = 1 et sin 0 = 0 simplifient tout.'}],
   conclusion:'y = 2 − 2 cos x + sin x.'},
  note:'Pour une racine double, y = (C₁ + C₂x)e^(rx) donne y′(0) = C₂ + rC₁ : n’oublie pas le terme rC₁.'},
 {h:'Un problème de Cauchy',p:'Résous <i>y″ − 3y′ + 2y = 0</i> avec <i>y(0) = 1</i> et <i>y′(0) = 0</i>. Que vaut <i>y(1)</i>&nbsp;? Arrondis au centième.',lab:'y(1) =',ans:-1.95,tol:.006,
  why:'y = C₁eˣ + C₂e^(2x). y(0) = C₁ + C₂ = 1 et y′(0) = C₁ + 2C₂ = 0, donc C₂ = −1 et C₁ = 2. y(1) = 2e − e² ≈ 5,437 − 7,389 ≈ −1,95.'},
 {kind:'Méthode',h:'Amplitude et phase : B cos t + D sin t = A cos(t − φ)',p:'<b>Quand</b> : un régime oscillant s’écrit B cos ωt + D sin ωt et on veut son amplitude (la plus grande valeur atteinte) et son déphasage. <b>Pourquoi ça marche</b> : A cos(t − φ) = A cos φ cos t + A sin φ sin t. Il suffit donc que <b>B = A cos φ</b> et <b>D = A sin φ</b> : (A ; φ) sont le module et l’argument du complexe B + iD. <b>Comment</b> : <b>A = √(B² + D²)</b>, puis φ tel que cos φ = B/A et sin φ = D/A (attention au quadrant).',
  demo:{enonce:'Écris 3 cos t + 4 sin t sous la forme A cos(t − φ).',etapes:[
   {f:'A = √(9 + 16) = 5',w:'Module de 3 + 4i.'},
   {f:'cos φ = 3/5 et sin φ = 4/5',w:'Les deux sont positifs : φ est dans ]0 ; π/2[.'},
   {f:'φ = arctan(4/3) ≈ 0,927 rad ≈ 53,1°',w:'Premier quadrant : l’arctangente donne directement le bon angle.'}],
   conclusion:'3 cos t + 4 sin t = 5 cos(t − φ) avec φ ≈ 53,1° : l’oscillation a une amplitude 5.'}},
 {h:'Amplitude et déphasage',p:'On écrit <i>cos t + √3 sin t = A cos(t − φ)</i>. Que vaut φ, en degrés&nbsp;?',lab:'φ =',unit:'°',ans:60,
  why:'A = √(1 + 3) = 2, cos φ = 1/2 et sin φ = √3/2, donc φ = 60°. Ainsi cos t + √3 sin t = 2 cos(t − 60°).'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Au 2e ordre, tout passe par l’équation caractéristique : ses racines donnent la forme des solutions homogènes, et deux conditions fixent les deux constantes.</p>`
  +keep([`<b>Structure</b> : ay″ + by′ + cy = f, solution y = y<sub>p</sub> + C₁y₁ + C₂y₂ (superposition, deux solutions non proportionnelles).`,
   `<b>Équation caractéristique</b> : ar² + br + c = 0 (essai y = ${E('rx')}).`,
   `<b>Δ &gt; 0</b> : C₁${E('r₁x')} + C₂${E('r₂x')}. <b>Δ = 0</b> : (C₁ + C₂x)${E('rx')}. <b>Δ &lt; 0</b>, r = α ± iβ : ${E('αx')}(C₁ cos βx + C₂ sin βx).`,
   `<b>Second membre simple</b> : y<sub>p</sub> de la même forme que f (polynôme, B${E('mx')}, B cos ωx + D sin ωx).`,
   `<b>Résonance</b> : si m (ou iω) est racine caractéristique, multiplie l’essai par x, par x² si la racine est double.`,
   `<b>Conditions initiales</b> : solution générale complète d’abord, puis y(0) et y′(0) donnent un système en C₁, C₂.`,
   `<b>Oscillateur</b> x″ + 2λx′ + ω₀²x = 0 : pseudo-périodique si λ &lt; ω₀ (pseudo-pulsation √(ω₀² − λ²)), critique si λ = ω₀, apériodique si λ &gt; ω₀.`,
   `<b>Amplitude et phase</b> : B cos t + D sin t = A cos(t − φ) avec A = √(B² + D²), cos φ = B/A, sin φ = D/A.`])},
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
