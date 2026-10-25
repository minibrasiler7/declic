/* Déclic — Chimie (PREPA-012) */
(()=>{
const R=8.314, KW=1e-14;
const SUPD={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
const sup=n=>String(n).split('').map(c=>SUPD[c]||c).join('');
function sci(x,d=2){ if(x===0) return '0'; const s=x<0?'−':''; x=Math.abs(x); let e=Math.floor(Math.log10(x)), m=x/10**e;
  if(+m.toFixed(d)>=10){ m/=10; e++; } return e===0?s+fmt(m,d):`${s}${fmt(m,d)}·10${sup(e)}`; }
const pHof=h=>-Math.log10(h);
// résolution de f(h)=0 croissante en h, sur log10 h ∈ [−15 ; 1]
function solveH(f){ let a=-15,b=1; for(let i=0;i<80;i++){ const m=(a+b)/2; if(f(10**m)>0) b=m; else a=m; } return 10**((a+b)/2); }

/* ---------- Atomes ---------- */
const SYM=['','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr'];
const SUB=[['1s',1],['2s',1],['2p',3],['3s',1],['3p',3],['4s',1],['3d',5],['4p',3]];
function fill(Z){ let r=Z; const e=SUB.map(([n,m])=>{ const k=Math.min(r,2*m); r-=k; return k; });
  if(Z===24||Z===29){ e[5]=1; e[6]+=1; } return e; }
function confStr(Z){ return fill(Z).map((k,i)=>k?`${SUB[i][0]}<sup>${k}</sup>`:'').filter(Boolean).join(' '); }
function unpaired(Z){ return fill(Z).reduce((s,k,i)=>{ const m=SUB[i][1]; return s+(k<=m?k:2*m-k); },0); }
function orbDraw(Z){
  const e=fill(Z), P=plane({x:[0,10],y:[-0.3,8.3],h:250,grid:false,axes:false});
  P.text(0.1,8,'énergie ↑',{s:11,c:'var(--muted)'});
  SUB.forEach(([nm,m],i)=>{ const y=i+0.2, x0=5-m*0.55, k=e[i];
    P.text(x0-0.3,y+0.25,nm,{a:'end',s:12,c:k?'var(--ink)':'var(--muted)'});
    for(let j=0;j<m;j++){ const x=x0+j*1.1;
      P.rect(x,y,1,0.75,{c:k?'var(--ink)':'var(--muted)',w:1.5,fill:k?'var(--ok)':'none',fo:.15});
      const up=j<k, dn=j<k-m;
      if(up) P.text(x+0.33,y+0.17,'↑',{a:'middle',s:15,c:'var(--accent)'});
      if(dn) P.text(x+0.67,y+0.17,'↓',{a:'middle',s:15,c:'var(--bad)'}); } });
  return P.svg(); }
const IE=[0,13.60,24.59,5.39,9.32,8.30,11.26,14.53,13.62,17.42,21.56,5.14,7.65,5.99,8.15,10.49,10.36,12.97,15.76];
const CHI=[0,'2,20','–','0,98','1,57','2,04','2,55','3,04','3,44','3,98','–','0,93','1,31','1,61','1,90','2,19','2,58','3,16','–'];

/* ---------- VSEPR ---------- */
const c30=Math.sqrt(3)/2, t3=Math.sqrt(8)/3;
const DIRS={2:[[0,1,0],[0,-1,0]],
  3:[[0,0,1],[0,-c30,-.5],[0,c30,-.5]],
  4:[[0,0,1],[t3,0,-1/3],[-t3/2,t3*c30,-1/3],[-t3/2,-t3*c30,-1/3]],
  5:[[1,0,0],[-.5,c30,0],[-.5,-c30,0],[0,0,1],[0,0,-1]],
  6:[[0,0,1],[0,0,-1],[1,0,0],[-1,0,0],[0,1,0],[0,-1,0]]};
const GEO={'2-0':['linéaire','180°','CO₂, BeCl₂'],'3-0':['trigonale plane','120°','BF₃'],'2-1':['coudée','un peu moins de 120°','SO₂'],
  '4-0':['tétraédrique','109,5°','CH₄'],'3-1':['pyramidale à base triangulaire','≈ 107°','NH₃'],'2-2':['coudée','≈ 104,5°','H₂O'],
  '5-0':['bipyramide trigonale','90° et 120°','PCl₅'],'4-1':['en bascule','&lt; 90° et &lt; 120°','SF₄'],'3-2':['en T','&lt; 90°','ClF₃'],'2-3':['linéaire','180°','XeF₂'],
  '6-0':['octaédrique','90°','SF₆'],'5-1':['pyramide à base carrée','&lt; 90°','BrF₅'],'4-2':['plan carré','90°','XeF₄'],'3-3':['en T (rare)','&lt; 90°','—']};
function vsepr(X,E){
  const S=space({r:1.8,az:25,el:18,axes:false}), n=X+E;
  if(n>6){ S.text([0,0,0],'plus de 6 domaines',{a:'middle',c:'var(--muted)'}); return S.svg(); }
  const d=DIRS[n];
  // les doublets libres prennent d’abord les positions équatoriales (5) ou axiales (6), plus spacieuses
  d.forEach((u,i)=>{ const lone=i<E, p=u.map(c=>c*1.3);
    if(lone){ S.seg([0,0,0],u.map(c=>c*.75),{c:'var(--muted)',w:2,dash:true}); S.dot(u.map(c=>c*.8),{c:'var(--spark)',r:7}); }
    else { S.seg([0,0,0],p,{c:'var(--ink)',w:4}); S.dot(p,{c:'var(--sci)',r:9}); } });
  S.dot([0,0,0],{c:'var(--accent)',r:11});
  return S.svg(); }

/* ---------- Acides et bases ---------- */
function titr(V,weak){ const Va=20,ca=.1,cb=.1,Ka=10**-4.76, Vt=Va+V, C=ca*Va/Vt, Na=cb*V/Vt;
  return pHof(solveH(h=>h+Na-KW/h-(weak?C*Ka/(Ka+h):C))); }
function titrDraw(V,weak){ const P=plane({x:[0,40],y:[0,14],h:230,grid:false,lx:10,ly:2});
  P.seg(20,0,20,14,{c:'var(--muted)',w:1,dash:true}).text(20,13,'équivalence',{a:'middle',s:11,c:'var(--muted)'});
  if(weak){ P.seg(0,4.76,10,4.76,{c:'var(--spark)',w:1.5,dash:true}).seg(10,0,10,4.76,{c:'var(--spark)',w:1.5,dash:true}).text(1,4.76,'pKa',{dy:-5,s:11,c:'var(--spark)'}); }
  P.fn(x=>titr(x,weak),{from:0,to:40,n:200}).dot(V,titr(V,weak),{c:'var(--ink)'});
  P.text(39,0.6,'V (mL)',{a:'end',s:11,c:'var(--muted)'}).text(1,13.2,'pH',{s:11,c:'var(--muted)'});
  return P.svg(); }

CMS.push(
/* ================= 1. ATOMES ================= */
{subj:'chi', sem:'pri', id:'cms-chi-atomes', h:'Atomes', p:'Orbitales, configuration électronique, tableau périodique et raies de l’hydrogène.', steps:[
 {kind:'Théorie',h:'Quatre nombres quantiques',p:`Chaque électron d’un atome est décrit par quatre nombres : <b>n</b> (couche, n ≥ 1), <b>ℓ</b> (sous-couche, 0 ≤ ℓ ≤ n − 1), <b>m<sub>ℓ</sub></b> (orbitale, −ℓ ≤ m<sub>ℓ</sub> ≤ ℓ) et <b>m<sub>s</sub></b> = ±½ (spin). ℓ = 0, 1, 2, 3 se notent s, p, d, f. Change <i>n</i> pour voir les orbitales disponibles.`,
  params:[{id:'n',l:'n',min:1,max:4,v:2}],
  draw:v=>{ const P=plane({x:[-5,5],y:[-0.5,4.3],h:200,grid:false,axes:false});
    for(let l=0;l<v.n;l++){ const m=2*l+1, y=3-l, x0=-m*0.55+0.6;
      P.text(-4.8,y+0.2,`${v.n}${'spdf'[l]} (ℓ = ${l})`,{s:12});
      for(let j=0;j<m;j++){ P.rect(x0+j*1.1,y,1,0.7,{c:'var(--ink)',w:1.5,fill:'var(--ok)',fo:.15}); P.text(x0+j*1.1+0.5,y+0.2,fmt(j-l),{a:'middle',s:10,c:'var(--muted)'}); } }
    return P.svg(); },
  info:v=>`Couche n = ${v.n} : ${v.n} sous-couche${v.n>1?'s':''}, <b>${v.n*v.n}</b> orbitale${v.n>1?'s':''}, au plus <b>${2*v.n*v.n}</b> électrons (2n²). Les chiffres dans les cases sont les valeurs de m<sub>ℓ</sub>.`,
  note:'<b>Principe de Pauli :</b> deux électrons d’un même atome ne peuvent pas avoir les quatre mêmes nombres quantiques. Une orbitale contient donc au plus deux électrons, de spins opposés.'},
 {h:'Un quadruplet interdit',p:'Lequel de ces quadruplets (<i>n</i>, ℓ, <i>m<sub>ℓ</sub></i>, <i>m<sub>s</sub></i>) est impossible&nbsp;?',
  opts:['(3, 2, −1, +½)','(2, 2, 0, −½)','(4, 0, 0, +½)','(2, 1, −1, −½)'],ans:1,
  why:'Pour n = 2, ℓ ne peut valoir que 0 ou 1 (ℓ ≤ n − 1). Une sous-couche 2d n’existe pas.'},
 {kind:'Théorie',h:'Remplir les orbitales',p:`<b>Aufbau</b> : on remplit les sous-couches par énergie croissante (règle de Klechkowski : 1s 2s 2p 3s 3p 4s 3d 4p…). <b>Hund</b> : dans une sous-couche, les électrons occupent d’abord chaque case seuls, avec des spins parallèles, avant de s’apparier. Fais varier <i>Z</i>.`,
  params:[{id:'z',l:'Z',min:1,max:36,v:6}],
  draw:v=>orbDraw(v.z),
  info:v=>`<b>${SYM[v.z]}</b> (Z = ${v.z}) : ${confStr(v.z)} · ${unpaired(v.z)} électron${unpaired(v.z)>1?'s':''} célibataire${unpaired(v.z)>1?'s':''}`,
  note:'<b>Exceptions :</b> le chrome (Z = 24) et le cuivre (Z = 29) prennent un électron 4s pour obtenir une sous-couche 3d à moitié ou entièrement remplie : 4s¹ 3d⁵ et 4s¹ 3d¹⁰.'},
 {kind:'Pratique',h:'Trouve l’élément',p:'Règle <i>Z</i> pour obtenir l’atome dont la configuration se termine par <b>3p⁴</b>.',
  params:[{id:'z',l:'Z',min:1,max:36,v:1}],
  draw:v=>orbDraw(v.z), info:v=>`<b>${SYM[v.z]}</b> : ${confStr(v.z)}`,
  ok:v=>v.z===16,why:'1s² 2s² 2p⁶ 3s² 3p⁴ compte 2 + 2 + 6 + 2 + 4 = 16 électrons : c’est le soufre S.'},
 {h:'Règle de Hund',p:'Le fer a pour configuration [Ar] 4s² 3d⁶. Combien d’électrons célibataires possède-t-il&nbsp;?',lab:'électrons célibataires :',ans:4,
  why:'Les 5 cases 3d reçoivent d’abord un électron chacune (5 spins parallèles), puis le 6e s’apparie dans la première case : il reste 4 électrons seuls.'},
 {kind:'Théorie',h:'Tendances du tableau',p:`L’<b>énergie de première ionisation</b> (arracher un électron) augmente de gauche à droite sur une période, car la charge nucléaire effective grandit, et diminue quand on descend une colonne. Le <b>rayon atomique</b> suit la tendance inverse. L’<b>électronégativité</b> χ suit la même tendance que l’ionisation.`,
  params:[{id:'z',l:'Z',min:1,max:18,v:3}],
  draw:v=>{ const P=plane({x:[0,19],y:[0,27],h:220,grid:false,lx:2,ly:5});
    for(let z=1;z<=18;z++) P.rect(z-0.4,0,0.8,IE[z],{fill:z===v.z?'var(--spark)':([2,10,18].includes(z)?'var(--sci)':'var(--ok)'),fo:z===v.z?.9:.5,c:null});
    P.text(18.8,25.5,'E (eV)',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>`<b>${SYM[v.z]}</b> : ${confStr(v.z)} · E<sub>i</sub> = ${fmt(IE[v.z])} eV · χ = ${CHI[v.z]}`,
  note:'Les petites chutes au bore (B) et à l’oxygène (O) viennent de la configuration : l’électron 2p du bore est plus haut en énergie, et le 4e électron 2p de l’oxygène s’apparie et subit une répulsion.'},
 {h:'Rayon atomique',p:'Lequel de ces atomes a le plus grand rayon&nbsp;?',opts:['F','Na','K','Cl'],ans:2,
  why:'Le rayon augmente en descendant une colonne (une couche de plus) et diminue vers la droite. K est en période 4 à gauche : c’est le plus gros.'},
 {kind:'Théorie',h:'Les raies de l’hydrogène',p:`Les niveaux d’énergie de l’hydrogène sont <b>E<sub>n</sub> = −13,6 eV / n²</b>. Quand l’électron descend de n<sub>i</sub> à n<sub>f</sub>, il émet un photon d’énergie ΔE = E<sub>i</sub> − E<sub>f</sub> et de longueur d’onde <b>λ = hc / ΔE</b>, avec hc ≈ 1240 eV·nm.`,
  params:[{id:'i',l:'nᵢ',min:2,max:6,v:3},{id:'f',l:'n_f',min:1,max:5,v:2}],
  draw:v=>{ const P=plane({x:[0,10],y:[-14.5,1.5],h:250,grid:false,axes:false});
    for(let n=1;n<=6;n++){ const E=-13.6/n/n; P.seg(2,E,9,E,{c:'var(--muted)',w:n===v.i||n===v.f?3:1.5}); P.text(1.8,E,`n=${n}`,{a:'end',dy:4,s:11}); }
    P.text(9.8,-13.6,'−13,6 eV',{a:'end',dy:16,s:10,c:'var(--muted)'});
    if(v.i>v.f) P.arrow(5.5,-13.6/v.i/v.i,5.5,-13.6/v.f/v.f,{c:'var(--spark)',w:3});
    return P.svg(); },
  info:v=>{ if(v.i<=v.f) return 'Choisis nᵢ &gt; n<sub>f</sub> pour une émission.';
    const dE=13.6*(1/v.f**2-1/v.i**2), l=1240/dE, ser=['','Lyman','Balmer','Paschen','Brackett','Pfund'][v.f];
    return `ΔE = ${fmt(dE)} eV · λ = <b>${fmt(l,0)} nm</b> (${l<400?'ultraviolet':l<=750?'visible':'infrarouge'}) · série de ${ser}`; },
  note:'La série de Balmer (n<sub>f</sub> = 2) tombe dans le visible : 3 → 2 donne la raie rouge à 656 nm.'},
 {kind:'Défi',h:'La raie bleu-vert',p:'Calcule la longueur d’onde émise par la transition n = 4 → n = 2 de l’hydrogène (E<sub>n</sub> = −13,6/n² eV, hc = 1240 eV·nm). Arrondis au nm.',lab:'λ =',unit:'nm',ans:486,tol:1,
  why:'ΔE = 13,6·(1/4 − 1/16) = 2,55 eV, donc λ = 1240 / 2,55 ≈ 486 nm.'},
]},

/* ================= 2. MOLÉCULES ================= */
{subj:'chi', sem:'pri', id:'cms-chi-molecules', h:'Molécules', p:'Liaisons, structures de Lewis, géométrie VSEPR et forces entre molécules.', steps:[
 {kind:'Théorie',h:'Du covalent à l’ionique',p:`L’<b>électronégativité</b> χ mesure la tendance d’un atome à attirer les électrons d’une liaison. Plus la différence Δχ est grande, plus le doublet est déplacé vers l’atome le plus électronégatif. Repères usuels : Δχ &lt; 0,4 covalente apolaire, 0,4 à 1,7 covalente polaire, au-delà plutôt ionique.`,
  params:[{id:'d',l:'Δχ',min:0,max:3.2,step:.1,v:.9}],
  draw:v=>{ const P=plane({x:[-5,5],y:[-2,2],h:130,grid:false,axes:false}), s=Math.min(v.d,3.2)/3.2*1.9;
    P.circ(s,0,2.6-s*0.4,{c:null,fill:'var(--accent)',fo:.18});
    P.circ(-2,0,0.9,{c:'var(--ink)',w:2,fill:'var(--ok)',fo:.3}).circ(2,0,0.9,{c:'var(--ink)',w:2,fill:'var(--sci)',fo:.3});
    P.text(-2,0,'A',{a:'middle',dy:5,s:15}).text(2,0,'B',{a:'middle',dy:5,s:15});
    if(v.d>=0.4){ P.text(-2,1.2,v.d>1.7?'+':'δ+',{a:'middle',c:'var(--bad)'}).text(2,1.2,v.d>1.7?'−':'δ−',{a:'middle',c:'var(--accent)'}); }
    return P.svg(); },
  info:v=>v.d<0.4?'Covalente <b>apolaire</b> (ex. H–H, C–H)':v.d<=1.7?'Covalente <b>polaire</b> (ex. O–H, H–Cl)':'Liaison à fort caractère <b>ionique</b> (ex. Na⁺Cl⁻, Δχ = 2,23)',
  note:'La frontière à 1,7 est une convention : la liaison passe continûment du covalent pur à l’ionique.'},
 {h:'La plus polaire',p:'Avec χ(H) = 2,20, χ(C) = 2,55, χ(N) = 3,04, χ(Cl) = 3,16 et χ(F) = 3,98, quelle liaison est la plus polaire&nbsp;?',
  opts:['C–H','N–N','H–Cl','H–F'],ans:3,why:'Δχ(H–F) = 3,98 − 2,20 = 1,78, contre 0,96 pour H–Cl, 0,35 pour C–H et 0 pour N–N.'},
 {kind:'Théorie',h:'Le moment dipolaire',p:`Chaque liaison polaire porte un moment dipolaire <b>μ = q·d</b>, en debye (D). Le moment de la molécule est la <b>somme vectorielle</b> des moments de liaison. Pour deux liaisons identiques d’angle θ : <b>μ = 2μ<sub>liaison</sub>·cos(θ/2)</b>. Change l’angle (μ<sub>O–H</sub> ≈ 1,5 D).`,
  params:[{id:'t',l:'Angle θ',min:90,max:180,step:5,v:105,u:'°'}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-2.6,1.6],h:220,grid:false,axes:false}), a=rad(v.t/2), hx=2*Math.sin(a), hy=-2*Math.cos(a), mu=3*Math.cos(a);
    P.seg(0,0,-hx,hy,{c:'var(--ink)',w:4}).seg(0,0,hx,hy,{c:'var(--ink)',w:4});
    P.arrow(-hx*.9,hy*.9-0.25,-0.1,-0.25,{c:'var(--sci)',w:2,hs:8}).arrow(hx*.9,hy*.9-0.25,0.1,-0.25,{c:'var(--sci)',w:2,hs:8});
    if(mu>0.05) P.arrow(0,-mu*.5,0,0.05+mu*.4,{c:'var(--spark)',w:4});
    P.dot(0,0,{c:'var(--bad)',r:12}).dot(-hx,hy,{c:'var(--muted)',r:8}).dot(hx,hy,{c:'var(--muted)',r:8});
    P.text(0,0,'O',{a:'middle',dy:-16}).text(-hx,hy,'H',{a:'middle',dy:22}).text(hx,hy,'H',{a:'middle',dy:22}); return P.svg(); },
  info:v=>`μ = 2 × 1,5 × cos(${fmt(v.t/2,1)}°) = <b>${fmt(3*Math.cos(rad(v.t/2)))} D</b>${v.t===180?' : les deux moments s’annulent.':''}`,
  note:'Convention des chimistes : la flèche d’un moment de liaison pointe vers l’atome le plus électronégatif (δ−).'},
 {h:'Polaire ou pas&nbsp;?',p:'Laquelle de ces molécules est <b>apolaire</b> alors que ses liaisons sont polaires&nbsp;?',opts:['H₂O','NH₃','CO₂','HCl'],ans:2,
  why:'CO₂ est linéaire : les deux moments C=O sont opposés et s’annulent. H₂O et NH₃ ne sont pas symétriques, et HCl n’a qu’une liaison.'},
 {h:'Structure de Lewis',p:`Pour dessiner une structure de Lewis, on compte d’abord tous les <b>électrons de valence</b>, on ajoute un électron par charge négative (on en retire un par charge positive), puis on place les doublets pour satisfaire l’octet. Combien d’électrons de valence compte l’ion sulfate SO₄²⁻&nbsp;?`,lab:'électrons :',ans:32,
  why:'S apporte 6, chaque O apporte 6 (soit 24) et la charge 2− ajoute 2 électrons : 6 + 24 + 2 = 32, c’est-à-dire 16 doublets.'},
 {kind:'Théorie',h:'Le modèle VSEPR',p:`Autour de l’atome central A, les domaines électroniques (liaisons X et doublets libres E) se repoussent et s’écartent au maximum. Le nombre total X + E fixe l’arrangement, les doublets libres déforment la forme visible. En bleu les atomes liés, en jaune les doublets libres.`,
  params:[{id:'x',l:'Liaisons X',min:2,max:6,v:4},{id:'e',l:'Doublets libres E',min:0,max:3,v:0}],
  draw:v=>vsepr(v.x,v.e),
  info:v=>{ const g=GEO[`${v.x}-${v.e}`]; return g?`AX<sub>${v.x}</sub>${v.e?`E<sub>${v.e}</sub>`:''} : <b>${g[0]}</b>, angles ${g[1]} · exemple : ${g[2]}`:'X + E &gt; 6 : hors du modèle usuel.'; },
  note:'Un doublet libre prend plus de place qu’une liaison : il referme les angles (109,5° pour CH₄, 107° pour NH₃, 104,5° pour H₂O).'},
 {kind:'Pratique',h:'La forme de l’eau',p:'L’oxygène de H₂O porte deux liaisons et deux doublets libres. Règle les curseurs pour obtenir sa géométrie.',
  params:[{id:'x',l:'Liaisons X',min:2,max:6,v:4},{id:'e',l:'Doublets libres E',min:0,max:3,v:0}],
  draw:v=>vsepr(v.x,v.e), info:v=>{ const g=GEO[`${v.x}-${v.e}`]; return g?`AX<sub>${v.x}</sub>${v.e?`E<sub>${v.e}</sub>`:''} : ${g[0]}`:'hors modèle'; },
  ok:v=>v.x===2&&v.e===2,why:'H₂O est AX₂E₂ : quatre domaines en tétraèdre, dont deux doublets libres. La molécule est coudée, d’angle ≈ 104,5°.'},
 {h:'Hybridation',p:`On associe au nombre de domaines de l’atome central une <b>hybridation</b> : 2 domaines → sp, 3 → sp², 4 → sp³. Une double liaison compte pour un seul domaine. Dans l’éthène H₂C=CH₂, quelle est l’hybridation de chaque carbone&nbsp;?`,
  opts:['sp','sp³','sp²','sp³d'],ans:2,why:'Chaque carbone a trois domaines (deux C–H et la double liaison C=C) : il est sp², plan, à 120°. L’orbitale p restante forme la liaison π.'},
 {kind:'Défi',h:'Forces intermoléculaires',p:'H₂O bout à 100 °C alors que H₂S, plus lourde, bout vers −60 °C. Pourquoi&nbsp;?',
  opts:['H₂S est apolaire','Les forces de London sont plus fortes dans H₂O','H₂O est ionique','H₂O forme des liaisons hydrogène'],ans:3,
  why:'O est très électronégatif et petit : un H lié à O est attiré par un doublet libre d’une molécule voisine. Ces liaisons hydrogène sont bien plus fortes que les interactions de van der Waals de H₂S.'},
]},

/* ================= 3. QUANTITÉS ================= */
{subj:'chi', sem:'pri', id:'cms-chi-quantites', h:'Quantités de matière', p:'La mole, les masses molaires, les concentrations et les pressions partielles.', steps:[
 {kind:'Théorie',h:'La mole',p:`Une <b>mole</b> contient N<sub>A</sub> = 6,022·10²³ entités. La <b>masse molaire</b> M (g/mol) est la masse d’une mole : <b>m = n·M</b> et <b>N = n·N<sub>A</sub></b>. Avec la même quantité <i>n</i>, des substances différentes ont des masses différentes.`,
  params:[{id:'n',l:'n (mol)',min:.5,max:5,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[0,10],y:[0,300],h:200,grid:false,ly:50}), sub=[['H₂O',18],['CO₂',44],['NaCl',58.5]];
    sub.forEach(([s,M],i)=>{ const x=1.5+i*3, m=v.n*M; P.rect(x,0,1.6,Math.min(m,300),{fill:['var(--sci)','var(--muted)','var(--ok)'][i],fo:.6,c:null}).text(x+0.8,Math.min(m,280),fmt(m,1)+' g',{a:'middle',dy:-6,s:11}).text(x+0.8,0,s,{a:'middle',dy:-6,s:12}); });
    return P.svg(); },
  info:v=>`${fmt(v.n,1)} mol = ${sci(v.n*6.022e23)} entités dans chaque colonne`,
  note:'M se calcule en additionnant les masses atomiques : M(H₂O) = 2 × 1 + 16 = 18 g/mol.'},
 {h:'Masse atomique moyenne',p:'Le chlore naturel contient 75 % de ³⁵Cl (35 u) et 25 % de ³⁷Cl (37 u). Quelle est sa masse atomique moyenne&nbsp;?',lab:'M =',unit:'u',ans:35.5,tol:.01,
  why:'On pondère par l’abondance : 0,75 × 35 + 0,25 × 37 = 26,25 + 9,25 = 35,5 u. C’est la valeur du tableau périodique.'},
 {h:'Masse molaire',p:'Calcule la masse molaire de l’acide sulfurique H₂SO₄ (H : 1, S : 32, O : 16 g/mol).',lab:'M =',unit:'g/mol',ans:98,
  why:'M = 2 × 1 + 32 + 4 × 16 = 2 + 32 + 64 = 98 g/mol.'},
 {h:'De la masse à la mole',p:'Combien de moles y a-t-il dans 11 g de CO₂ (C : 12, O : 16 g/mol)&nbsp;?',lab:'n =',unit:'mol',ans:.25,tol:.001,
  why:'M(CO₂) = 12 + 2 × 16 = 44 g/mol, donc n = m/M = 11/44 = 0,25 mol.'},
 {kind:'Pratique',h:'Concentration et dilution',p:`La concentration molaire est <b>c = n/V</b> (mol/L). En diluant, la quantité de soluté ne change pas : <b>c₁V₁ = c₂V₂</b>. Prélève le bon volume de solution mère à 1,0 mol/L pour préparer 250 mL à 0,20 mol/L.`,
  params:[{id:'V',l:'Volume prélevé',min:0,max:100,step:5,v:20,u:' mL'}],
  draw:v=>{ const P=plane({x:[0,10],y:[0,6],h:190,grid:false,axes:false}), c=v.V/250;
    const beaker=(x,w,h,lvl,op,lab)=>{ P.rect(x,0.5,w,lvl,{fill:'var(--accent)',fo:op,c:null}); P.poly([[x,0.5+h],[x,0.5],[x+w,0.5],[x+w,0.5+h]],{open:true,c:'var(--ink)',w:2}); P.text(x+w/2,0.5,lab,{a:'middle',dy:16,s:11}); };
    beaker(0.5,2.5,4,3.2,.85,'mère 1,0 mol/L'); beaker(5,4,5,4.2,Math.max(.05,c*.85),'fiole 250 mL');
    P.arrow(3.2,3.5,4.8,3.5,{c:'var(--muted)',w:2}).text(4,3.5,`${v.V} mL`,{a:'middle',dy:-8,s:12});
    return P.svg(); },
  info:v=>`n = 1,0 × ${fmt(v.V/1000,3)} = ${fmt(v.V/1000,3)} mol · c = n / 0,250 L = <b>${fmt(v.V/250,2)} mol/L</b>`,
  ok:v=>v.V===50,why:'V₁ = c₂V₂/c₁ = 0,20 × 250 / 1,0 = 50 mL, qu’on complète avec de l’eau jusqu’à 250 mL.'},
 {h:'Préparer une solution',p:'Quelle masse de NaCl (M = 58,5 g/mol) faut-il dissoudre pour obtenir 500 mL de solution à 0,10 mol/L&nbsp;? Arrondis au centième de gramme.',lab:'m =',unit:'g',ans:2.925,tol:.01,
  why:'n = c·V = 0,10 × 0,500 = 0,050 mol, puis m = n·M = 0,050 × 58,5 ≈ 2,93 g.'},
 {kind:'Théorie',h:'Loi de Dalton',p:`Dans un mélange de gaz parfaits, chaque gaz exerce sa <b>pression partielle</b> p<sub>i</sub> = n<sub>i</sub>RT/V, comme s’il était seul. La pression totale est la somme : <b>p = Σ p<sub>i</sub></b>, et <b>p<sub>i</sub> = x<sub>i</sub>·p</b> avec x<sub>i</sub> = n<sub>i</sub>/n la fraction molaire. Ici V = 50 L et T = 300 K.`,
  params:[{id:'a',l:'n(N₂)',min:.5,max:4,step:.5,v:2,u:' mol'},{id:'b',l:'n(O₂)',min:.5,max:4,step:.5,v:1,u:' mol'}],
  draw:v=>{ const pa=v.a*R*300/0.05/1000, pb=v.b*R*300/0.05/1000, P=plane({x:[0,10],y:[0,420],h:220,grid:false,ly:100});
    P.rect(3,0,4,pa,{fill:'var(--sci)',fo:.6,c:null}).rect(3,pa,4,pb,{fill:'var(--bad)',fo:.5,c:null});
    P.text(5,pa/2,'N₂',{a:'middle',dy:5}).text(5,pa+pb/2,'O₂',{a:'middle',dy:5}).text(9.8,400,'p (kPa)',{a:'end',s:11,c:'var(--muted)'});
    return P.svg(); },
  info:v=>{ const pa=v.a*R*300/50, pb=v.b*R*300/50, x=v.a/(v.a+v.b); return `p(N₂) = ${fmt(pa,1)} kPa · p(O₂) = ${fmt(pb,1)} kPa · p = <b>${fmt(pa+pb,1)} kPa</b> · x(N₂) = ${fmt(x,3)}`; },
  note:'Unités SI : V en m³ (50 L = 0,050 m³), p en Pa. R = 8,314 J/(mol·K).'},
 {h:'L’oxygène de l’air',p:'L’air contient une fraction molaire x(O₂) = 0,21. Quelle est la pression partielle de O₂ quand la pression atmosphérique vaut 101,3 kPa&nbsp;? Arrondis à 0,1 kPa.',lab:'p(O₂) =',unit:'kPa',ans:21.3,tol:.06,
  why:'p(O₂) = x(O₂)·p = 0,21 × 101,3 ≈ 21,3 kPa.'},
 {kind:'Défi',h:'Un mélange en bouteille',p:'Une bouteille de 50 L contient 2,0 mol de N₂ et 1,0 mol de O₂ à 300 K. Calcule la pression partielle de O₂ en kPa, arrondie à 0,1 kPa (R = 8,314 J/(mol·K)).',lab:'p(O₂) =',unit:'kPa',ans:49.9,tol:.1,
  why:'p(O₂) = nRT/V = 1,0 × 8,314 × 300 / 0,050 = 49 884 Pa ≈ 49,9 kPa. N₂ n’y change rien : il ajoute seulement sa propre pression partielle.'},
]},

/* ================= 4. STŒCHIOMÉTRIE ================= */
{subj:'chi', sem:'pri', id:'cms-chi-stoechio', h:'Stœchiométrie', p:'Équilibrer une équation, trouver le réactif limitant et calculer un rendement.', steps:[
 {kind:'Pratique',h:'Équilibrer la combustion',p:`Une équation équilibrée conserve chaque élément : autant d’atomes de C, H et O de chaque côté. Règle les coefficients de <b>C₃H₈ + <i>b</i> O₂ → <i>c</i> CO₂ + <i>d</i> H₂O</b> jusqu’à ce que les barres coïncident.`,
  params:[{id:'b',l:'b (O₂)',min:1,max:8,v:1},{id:'c',l:'c (CO₂)',min:1,max:8,v:1},{id:'d',l:'d (H₂O)',min:1,max:8,v:1}],
  draw:v=>{ const L=[3,8,2*v.b], Rr=[v.c,2*v.d,2*v.c+v.d], P=plane({x:[0,10],y:[0,18],h:200,grid:false,ly:4});
    ['C','H','O'].forEach((e,i)=>{ const x=1+i*3; P.rect(x,0,1,L[i],{fill:'var(--sci)',fo:.6,c:null}).rect(x+1.1,0,1,Rr[i],{fill:L[i]===Rr[i]?'var(--ok)':'var(--bad)',fo:.6,c:null}).text(x+1.05,0,e,{a:'middle',dy:-6}); });
    P.text(9.9,17,'bleu : réactifs · à droite : produits',{a:'end',s:10,c:'var(--muted)'}); return P.svg(); },
  info:v=>`C : 3 → ${v.c} · H : 8 → ${2*v.d} · O : ${2*v.b} → ${2*v.c+v.d}`,
  ok:v=>v.b===5&&v.c===3&&v.d===4,why:'On équilibre C (c = 3), puis H (2d = 8, d = 4), puis O en dernier : 2b = 2·3 + 4 = 10, donc b = 5. C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.'},
 {h:'Rouille',p:'Quels coefficients équilibrent <i>a</i> Fe + <i>b</i> O₂ → <i>c</i> Fe₂O₃&nbsp;? (a, b, c)',opts:['2, 3, 1','4, 3, 2','3, 2, 1','4, 6, 2'],ans:1,
  why:'O : 2b = 3c, le plus petit choix est b = 3, c = 2. Fe : a = 2c = 4. Donc 4 Fe + 3 O₂ → 2 Fe₂O₃.'},
 {kind:'Théorie',h:'Avancement et réactif limitant',p:`L’<b>avancement</b> ξ (mol) suit la réaction : pour 2 H₂ + O₂ → 2 H₂O, on a n(H₂) = n₀(H₂) − 2ξ, n(O₂) = n₀(O₂) − ξ, n(H₂O) = 2ξ. La réaction s’arrête quand un réactif est épuisé : <b>ξ<sub>max</sub> = min(n₀(H₂)/2 ; n₀(O₂)/1)</b>. Ce réactif est le <b>réactif limitant</b>.`,
  params:[{id:'h',l:'n₀(H₂)',min:0,max:6,step:.5,v:3,u:' mol'},{id:'o',l:'n₀(O₂)',min:0,max:4,step:.5,v:2,u:' mol'}],
  draw:v=>{ const x=Math.min(v.h/2,v.o), P=plane({x:[0,10],y:[0,8],h:200,grid:false,ly:2});
    [['H₂',v.h,v.h-2*x],['O₂',v.o,v.o-x],['H₂O',0,2*x]].forEach(([s,a,b],i)=>{ const X=1+i*3;
      P.rect(X,0,1,a,{fill:'var(--muted)',fo:.4,c:null}).rect(X+1.1,0,1,b,{fill:i===2?'var(--ok)':'var(--accent)',fo:.7,c:null}).text(X+1.05,0,s,{a:'middle',dy:-6}); });
    P.text(9.9,7.5,'gris : début · couleur : fin',{a:'end',s:10,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const x=Math.min(v.h/2,v.o); const lim=v.h/2<v.o?'H₂':v.h/2>v.o?'O₂':'aucun (proportions stœchiométriques)';
    return `ξ<sub>max</sub> = ${fmt(x,2)} mol · réactif limitant : <b>${lim}</b> · H₂O formée : ${fmt(2*x,1)} mol`; }},
 {h:'Ce qui reste',p:'On fait réagir 4 mol de H₂ avec 3 mol de O₂ (2 H₂ + O₂ → 2 H₂O). Combien de moles de O₂ restent à la fin&nbsp;?',lab:'n(O₂) =',unit:'mol',ans:1,
  why:'ξ<sub>max</sub> = min(4/2 ; 3/1) = 2 mol : H₂ est limitant. Il reste 3 − 2 = 1 mol de O₂.'},
 {h:'Masse maximale',p:'Pour N₂ + 3 H₂ → 2 NH₃, on part de 28 g de N₂ et 9 g de H₂ (N : 14, H : 1 g/mol). Quelle masse maximale de NH₃ peut-on obtenir&nbsp;?',lab:'m =',unit:'g',ans:34,tol:.1,
  why:'n(N₂) = 28/28 = 1 mol, n(H₂) = 9/2 = 4,5 mol. ξ<sub>max</sub> = min(1 ; 4,5/3 = 1,5) = 1 mol, N₂ est limitant. n(NH₃) = 2 mol, soit 2 × 17 = 34 g.'},
 {kind:'Théorie',h:'Rendement et gaz',p:`Le <b>rendement</b> compare ce qu’on obtient à ce que la stœchiométrie permet : <b>η = n<sub>obtenu</sub> / n<sub>max</sub></b>. Pour un gaz formé, on passe de la quantité au volume avec <b>pV = nRT</b>. À 0 °C et 101,3 kPa, une mole de gaz parfait occupe 22,4 L ; à 25 °C et 100 kPa, environ 24,8 L.`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,4],h:110,grid:false,axes:false}); P.rect(0.5,1,9,1.6,{fill:'var(--muted)',fo:.2,c:'var(--ink)',w:1.5}).rect(0.5,1,6.75,1.6,{fill:'var(--ok)',fo:.6,c:null}).text(5,1.8,'η = 75 %',{a:'middle',dy:5}).text(0.5,2.6,'quantité obtenue / quantité maximale',{dy:-8,s:11,c:'var(--muted)'}); return P.svg(); })(),
  note:'Le rendement se calcule toujours à partir du réactif limitant, jamais du réactif en excès.'},
 {h:'Le rendement',p:'Dans l’expérience précédente (34 g de NH₃ au maximum), on recueille 25,5 g de NH₃. Quel est le rendement en %&nbsp;?',lab:'η =',unit:'%',ans:75,tol:.1,
  why:'η = 25,5 / 34 = 0,75, soit 75 %.'},
 {kind:'Défi',h:'Le gaz de la calcination',p:'On chauffe 10 g de CaCO₃ (M = 100 g/mol) : CaCO₃ → CaO + CO₂. Quel volume de CO₂ obtient-on à 298 K et 100 kPa (R = 8,314 J/(mol·K))&nbsp;? Arrondis au centième de litre.',lab:'V =',unit:'L',ans:2.48,tol:.02,
  why:'n(CO₂) = n(CaCO₃) = 10/100 = 0,10 mol. V = nRT/p = 0,10 × 8,314 × 298 / 100 000 = 2,48·10⁻³ m³ ≈ 2,48 L.'},
]},

/* ================= 5. ÉQUILIBRES ================= */
{subj:'chi', sem:'pri', id:'cms-chi-equilibres', h:'Équilibres chimiques', p:'Quotient réactionnel, enthalpie libre, constante d’équilibre et principe de Le Chatelier.', steps:[
 {kind:'Théorie',h:'Le quotient réactionnel',p:`Pour <i>a</i>A + <i>b</i>B ⇌ <i>c</i>C + <i>d</i>D, le <b>quotient réactionnel</b> est <b>Q = (a<sub>C</sub><sup>c</sup>·a<sub>D</sub><sup>d</sup>) / (a<sub>A</sub><sup>a</sup>·a<sub>B</sub><sup>b</sup>)</b>, où a désigne l’activité : c/c° pour un soluté (c° = 1 mol/L), p/p° pour un gaz (p° = 1 bar), 1 pour un solide pur ou le solvant. À l’équilibre, Q prend une valeur fixe : la <b>constante d’équilibre K</b>.`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,3],h:90,grid:false,axes:false}); P.text(5,1.5,'Q &lt; K → sens direct · Q = K → équilibre · Q &gt; K → sens inverse',{a:'middle',dy:5,s:11}); return P.svg(); })(),
  note:'K ne dépend que de la température. Les concentrations à l’équilibre, elles, dépendent des conditions initiales.'},
 {h:'Écrire K',p:'Quelle est l’expression de K pour N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g), avec p° = 1 bar&nbsp;?',
  opts:[`${F('2 p(NH₃)','p(N₂) + 3 p(H₂)')}`,`${F('p(N₂)·p(H₂)³','p(NH₃)²')}`,`${F('p(NH₃)²','p(N₂) + p(H₂)³')}`,`${F('(p(NH₃)/p°)²','(p(N₂)/p°)·(p(H₂)/p°)³')}`],ans:3,
  why:'Produits au numérateur, réactifs au dénominateur, chaque activité élevée à son coefficient stœchiométrique, et on multiplie (on n’additionne pas).'},
 {kind:'Théorie',h:'ΔG = ΔG° + RT ln Q',p:`L’<b>enthalpie libre de réaction</b> ΔG dit dans quel sens la réaction évolue spontanément : ΔG &lt; 0 sens direct, ΔG &gt; 0 sens inverse, ΔG = 0 équilibre. Elle dépend de Q par <b>ΔG = ΔG° + RT ln Q</b>. À l’équilibre, ΔG = 0 et Q = K, d’où <b>K = exp(−ΔG°/RT)</b>. Ici ΔG° = −20 kJ/mol et T = 298 K.`,
  params:[{id:'q',l:'log₁₀ Q',min:-6,max:8,step:.5,v:-2}],
  draw:v=>{ const g=x=>-20+R*298*Math.LN10/1000*x, P=plane({x:[-6.5,8.5],y:[-60,30],h:230,grid:false,lx:2,ly:20});
    P.fn(g,{from:-6.5,to:8.5}).dot(v.q,g(v.q),{c:g(v.q)<0?'var(--ok)':'var(--bad)'}).dot(3.506,0,{c:'var(--ink)',r:4,l:'K',dy:16});
    P.text(8.3,26,'ΔG (kJ/mol)',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const g=-20+R*298*Math.LN10/1000*v.q; return `Q = ${sci(10**v.q)} · ΔG = <b>${fmt(g,1)} kJ/mol</b> → ${Math.abs(g)<0.5?'équilibre':g<0?'évolution dans le sens direct':'évolution dans le sens inverse'}`; }},
 {kind:'Pratique',h:'Atteindre l’équilibre',p:'Avec la même réaction (ΔG° = −20 kJ/mol, 298 K), place Q à la valeur où la réaction n’évolue plus.',
  params:[{id:'q',l:'log₁₀ Q',min:-6,max:8,step:.5,v:0}],
  draw:v=>{ const g=x=>-20+R*298*Math.LN10/1000*x, P=plane({x:[-6.5,8.5],y:[-60,30],h:230,grid:false,lx:2,ly:20});
    P.fn(g,{from:-6.5,to:8.5}).dot(v.q,g(v.q),{c:'var(--spark)'}); return P.svg(); },
  info:v=>`ΔG = ${fmt(-20+R*298*Math.LN10/1000*v.q,1)} kJ/mol`,
  ok:v=>Math.abs(-20+R*298*Math.LN10/1000*v.q)<0.5,
  why:'ΔG = 0 quand ln Q = −ΔG°/RT = 20 000 / (8,314 × 298) ≈ 8,07, soit log₁₀ Q ≈ 3,5 : c’est log₁₀ K, K ≈ 3,2·10³.'},
 {kind:'Théorie',h:'Q tend vers K',p:`Pour A ⇌ B partant de [A]₀ = 1 mol/L et [B]₀ = 0, Q = [B]/[A] vaut 0 au départ puis augmente jusqu’à K. Plus K est grand, plus l’équilibre est déplacé vers B. Fais avancer le temps.`,
  params:[{id:'K',l:'K',min:.5,max:4,step:.5,v:2},{id:'t',l:'t',min:0,max:5,step:.25,v:.5,u:' s'}],
  draw:v=>{ const be=v.K/(1+v.K), B=t=>be*(1-Math.exp(-t)), Q=t=>B(t)/(1-B(t)), P=plane({x:[0,5.2],y:[0,4.5],h:220,lab:1});
    P.seg(0,v.K,5.2,v.K,{c:'var(--spark)',w:2,dash:true}).text(5.1,v.K,'K',{a:'end',dy:-6,c:'var(--spark)'});
    P.fn(Q,{from:0,to:5.2}).dot(v.t,Q(v.t),{c:'var(--ink)'}); return P.svg(); },
  info:v=>{ const be=v.K/(1+v.K), b=be*(1-Math.exp(-v.t)); return `[A] = ${fmt(1-b,3)} · [B] = ${fmt(b,3)} mol/L · Q = <b>${fmt(b/(1-b),2)}</b> (K = ${fmt(v.K,1)})`; }},
 {h:'Calculer K',p:'Une réaction a ΔG° = −10 kJ/mol à 298 K. Calcule K (R = 8,314 J/(mol·K)), arrondi à l’unité.',lab:'K =',ans:56.6,tol:.6,
  why:'K = exp(−ΔG°/RT) = exp(10 000 / (8,314 × 298)) = exp(4,036) ≈ 57.'},
 {h:'Dans quel sens&nbsp;?',p:'Pour cette même réaction (ΔG° = −10 kJ/mol, 298 K), le mélange a Q = 100. Calcule ΔG en kJ/mol, arrondi au centième.',lab:'ΔG =',unit:'kJ/mol',ans:1.41,tol:.02,
  why:'ΔG = −10 + 8,314 × 298 × ln 100 / 1000 = −10 + 11,41 = +1,41 kJ/mol &gt; 0 : Q &gt; K, la réaction évolue dans le sens inverse.'},
 {h:'Principe de Le Chatelier',p:`Un système à l’équilibre qu’on perturbe évolue de façon à <b>s’opposer</b> à la perturbation. Pour N₂ + 3 H₂ ⇌ 2 NH₃, exothermique (ΔH &lt; 0), quelle action augmente la quantité de NH₃ à l’équilibre&nbsp;?`,
  opts:['Augmenter la température','Diminuer la pression','Augmenter la pression','Ajouter un catalyseur'],ans:2,
  why:'4 mol de gaz donnent 2 mol : augmenter la pression favorise le côté qui a moins de moles de gaz, donc NH₃. Chauffer favorise le sens endothermique (inverse), et un catalyseur ne déplace pas l’équilibre.'},
 {kind:'Défi',h:'Composition à l’équilibre',p:'Pour A ⇌ B en solution, K = 4. On part de [A]₀ = 1,0 mol/L et [B]₀ = 0. Quelle est [B] à l’équilibre&nbsp;?',lab:'[B] =',unit:'mol/L',ans:.8,tol:.005,
  why:'Avec [B] = x et [A] = 1 − x : x/(1 − x) = 4, donc x = 4 − 4x et x = 0,8 mol/L.'},
]},

/* ================= 6. SOLUTIONS ================= */
{subj:'chi', sem:'pri', id:'cms-chi-solutions', h:'Solutions', p:'Solubilité, produit de solubilité et propriétés colligatives.', steps:[
 {kind:'Théorie',h:'Produit de solubilité',p:`Pour un sel peu soluble, AgCl(s) ⇌ Ag⁺ + Cl⁻, l’équilibre est décrit par <b>K<sub>s</sub> = [Ag⁺]·[Cl⁻]</b> = 1,8·10⁻¹⁰. Si le produit ionique Q = [Ag⁺][Cl⁻] dépasse K<sub>s</sub>, un précipité se forme. Déplace le point dans le plan des logarithmes.`,
  params:[{id:'a',l:'log₁₀ [Ag⁺]',min:-7,max:-2,step:.25,v:-6},{id:'c',l:'log₁₀ [Cl⁻]',min:-7,max:-2,step:.25,v:-5}],
  draw:v=>{ const lk=Math.log10(1.8e-10), P=plane({x:[-7.5,-1.5],y:[-7.5,-1.5],h:260,lab:1});
    P.poly([[-7.5,lk+7.5],[-1.5,lk+1.5],[-1.5,-1.5],[-7.5,-1.5]],{fill:'var(--bad)',fo:.15,c:null});
    P.fn(x=>lk-x,{c:'var(--ink)',w:2.5}).text(-2,-2.3,'précipité',{a:'end',c:'var(--bad)',s:12}).text(-7.3,-7,'solution limpide',{s:12,c:'var(--ok)'});
    P.dot(v.a,v.c,{c:v.a+v.c>lk?'var(--bad)':'var(--ok)'}); return P.svg(); },
  info:v=>{ const lk=Math.log10(1.8e-10), q=v.a+v.c; return `Q = ${sci(10**q)} ${q>lk?'&gt;':'&lt;'} K<sub>s</sub> → ${q>lk?'<b>AgCl précipite</b>':'pas de précipité'}`; },
  note:'Pour un sel A<sub>x</sub>B<sub>y</sub> de solubilité <i>s</i> : K<sub>s</sub> = (x·s)<sup>x</sup>·(y·s)<sup>y</sup>.'},
 {h:'Solubilité de AgCl',p:'Calcule la solubilité <i>s</i> de AgCl dans l’eau pure (K<sub>s</sub> = 1,8·10⁻¹⁰). Donne la réponse en 10⁻⁵ mol/L, au centième.',lab:'s =',unit:'·10⁻⁵ mol/L',ans:1.34,tol:.01,
  why:'[Ag⁺] = [Cl⁻] = s, donc K<sub>s</sub> = s² et s = √(1,8·10⁻¹⁰) ≈ 1,34·10⁻⁵ mol/L.'},
 {h:'Un sel 1 : 2',p:'Calcule la solubilité de CaF₂ (K<sub>s</sub> = 3,9·10⁻¹¹). Donne la réponse en 10⁻⁴ mol/L, au centième.',lab:'s =',unit:'·10⁻⁴ mol/L',ans:2.14,tol:.02,
  why:'CaF₂ ⇌ Ca²⁺ + 2 F⁻ : [Ca²⁺] = s, [F⁻] = 2s, donc K<sub>s</sub> = s·(2s)² = 4s³ et s = ∛(3,9·10⁻¹¹ / 4) ≈ 2,14·10⁻⁴ mol/L.'},
 {h:'Effet d’ion commun',p:'On dissout AgCl dans une solution de NaCl à 0,10 mol/L. Que devient la solubilité de AgCl&nbsp;?',
  opts:['Elle augmente','Elle ne change pas','Elle tombe à environ 1,8·10⁻⁹ mol/L','Elle devient nulle'],ans:2,
  why:'[Cl⁻] ≈ 0,10 mol/L est imposé, donc s = [Ag⁺] = K<sub>s</sub>/0,10 = 1,8·10⁻⁹ mol/L : environ 7 000 fois moins que dans l’eau pure (Le Chatelier).'},
 {kind:'Théorie',h:'Propriétés colligatives',p:`Un soluté abaisse la température de fusion et élève celle d’ébullition du solvant, quelle que soit sa nature : seul compte le <b>nombre de particules</b>. <b>ΔT<sub>fus</sub> = i·K<sub>f</sub>·b</b> et <b>ΔT<sub>éb</sub> = i·K<sub>éb</sub>·b</b>, avec b la molalité (mol/kg de solvant) et i le facteur de van ’t Hoff (1 pour le glucose, 2 pour NaCl). Pour l’eau : K<sub>f</sub> = 1,86 et K<sub>éb</sub> = 0,512 K·kg/mol.`,
  params:[{id:'b',l:'molalité b',min:0,max:3,step:.25,v:1,u:' mol/kg'},{id:'i',l:'i',min:1,max:3,v:1}],
  draw:v=>{ const df=v.i*1.86*v.b, de=v.i*0.512*v.b, P=plane({x:[0,10],y:[0,18],h:200,grid:false,ly:4});
    P.rect(2,0,2,df,{fill:'var(--sci)',fo:.6,c:null}).rect(6,0,2,de,{fill:'var(--bad)',fo:.6,c:null});
    P.text(3,0,'ΔT fusion',{a:'middle',dy:-6,s:11}).text(7,0,'ΔT ébullition',{a:'middle',dy:-6,s:11}).text(9.9,17,'K',{a:'end',s:11,c:'var(--muted)'});
    return P.svg(); },
  info:v=>`L’eau gèle à <b>${fmt(-v.i*1.86*v.b,2)} °C</b> et bout à <b>${fmt(100+v.i*0.512*v.b,2)} °C</b> · pression osmotique (c ≈ b) : Π = icRT ≈ ${fmt(v.i*v.b*R*298/100,1)} bar à 298 K`,
  note:'La <b>pression osmotique</b> Π = i·c·RT est la pression qu’il faut exercer pour empêcher le solvant de traverser une membrane semi-perméable vers la solution concentrée.'},
 {h:'Saler la route',p:'On dissout du NaCl dans l’eau à la molalité 1,0 mol/kg (i = 2, K<sub>f</sub> = 1,86 K·kg/mol). À quelle température l’eau gèle-t-elle&nbsp;? Au centième.',lab:'T =',unit:'°C',ans:-3.72,tol:.02,
  why:'ΔT = i·K<sub>f</sub>·b = 2 × 1,86 × 1,0 = 3,72 K. L’eau gèle à −3,72 °C.'},
 {h:'Pression osmotique',p:'Quelle est la pression osmotique d’une solution de glucose à 0,10 mol/L à 298 K (R = 8,314 J/(mol·K))&nbsp;? Arrondis au kPa.',lab:'Π =',unit:'kPa',ans:248,tol:1,
  why:'Π = cRT avec c = 0,10 mol/L = 100 mol/m³ : Π = 100 × 8,314 × 298 ≈ 247 800 Pa ≈ 248 kPa, soit près de 2,5 bar.'},
 {kind:'Défi',h:'Ébullioscopie',p:'On dissout 18 g de glucose (M = 180 g/mol) dans 500 g d’eau (K<sub>éb</sub> = 0,512 K·kg/mol). De combien la température d’ébullition augmente-t-elle&nbsp;? Au millième de kelvin.',lab:'ΔT =',unit:'K',ans:.102,tol:.001,
  why:'n = 18/180 = 0,10 mol, b = 0,10 / 0,500 kg = 0,20 mol/kg. ΔT = 1 × 0,512 × 0,20 ≈ 0,102 K.'},
]},

/* ================= 7. ACIDES ET BASES ================= */
{subj:'chi', sem:'pri', id:'cms-chi-acides', h:'Acides et bases', p:'pH, pKa, acides forts et faibles, titrages et solutions tampons.', steps:[
 {kind:'Théorie',h:'L’échelle de pH',p:`Selon <b>Brønsted</b>, un acide cède un proton H⁺ et une base le capte : HA + H₂O ⇌ A⁻ + H₃O⁺, HA/A⁻ forme un <b>couple acide-base</b>. On définit <b>pH = −log₁₀[H₃O⁺]</b>. L’eau s’autoprotolyse : <b>K<sub>e</sub> = [H₃O⁺][OH⁻] = 10⁻¹⁴</b> à 25 °C.`,
  params:[{id:'p',l:'pH',min:0,max:14,step:.5,v:3}],
  draw:v=>{ const P=plane({x:[-0.5,14.5],y:[0,4],h:110,grid:false,axes:false});
    for(let k=0;k<14;k++) P.rect(k,1.2,1,1,{fill:k<7?'var(--bad)':'var(--sci)',fo:Math.abs(k+0.5-7)/7*.8+.08,c:null});
    for(let k=0;k<=14;k+=2) P.text(k,1.2,String(k),{a:'middle',dy:15,s:10,c:'var(--muted)'});
    P.dot(v.p,1.7,{c:'var(--ink)'}).text(0,3.3,'acide',{s:11,c:'var(--bad)'}).text(14,3.3,'basique',{a:'end',s:11,c:'var(--sci)'}).text(7,3.3,'neutre',{a:'middle',s:11,c:'var(--muted)'});
    return P.svg(); },
  info:v=>`[H₃O⁺] = ${sci(10**-v.p)} mol/L · [OH⁻] = ${sci(10**(v.p-14))} mol/L`,
  note:'Un pH qui baisse de 1 correspond à 10 fois plus d’ions H₃O⁺.'},
 {h:'Base conjuguée',p:'Quelle est la base conjuguée de l’ion ammonium NH₄⁺&nbsp;?',opts:['NH₂⁻','NH₃','NH₄OH','N₂'],ans:1,
  why:'NH₄⁺ cède un proton H⁺ et devient NH₃ : le couple est NH₄⁺/NH₃.'},
 {h:'Acide fort',p:'Un acide fort est totalement dissocié. Quel est le pH d’une solution de HCl à 0,010 mol/L&nbsp;?',lab:'pH =',ans:2,tol:.01,
  why:'[H₃O⁺] = c = 10⁻² mol/L, donc pH = −log(10⁻²) = 2.'},
 {kind:'Théorie',h:'Acide faible et pKa',p:`Un acide faible ne se dissocie que partiellement : <b>K<sub>a</sub> = [A⁻][H₃O⁺]/[HA]</b> et <b>pKa = −log K<sub>a</sub></b>. Si pH &lt; pKa, HA prédomine, sinon A⁻. Pour un acide faible peu dissocié : <b>pH ≈ ½(pKa − log c)</b>. La courbe montre les fractions de HA et de A⁻, le trait marque le pH de la solution.`,
  params:[{id:'k',l:'pKa',min:2,max:10,step:.5,v:4.5},{id:'c',l:'log₁₀ c',min:-4,max:-1,step:.5,v:-1}],
  draw:v=>{ const Ka=10**-v.k, c=10**v.c, h=solveH(h=>h-c*Ka/(Ka+h)-KW/h), pH=pHof(h), P=plane({x:[0,14],y:[0,1.2],w:320,h:180,grid:false,lx:2});
    P.fn(p=>1/(1+10**(p-v.k)),{c:'var(--bad)',from:0,to:14}).fn(p=>1/(1+10**(v.k-p)),{c:'var(--sci)',from:0,to:14});
    P.seg(pH,0,pH,1.1,{c:'var(--ink)',w:2,dash:true}).text(pH,1.1,'pH',{a:'middle',dy:-3,s:11});
    P.text(0.3,1.05,'HA',{c:'var(--bad)',s:12}).text(13.7,1.05,'A⁻',{a:'end',c:'var(--sci)',s:12}); return P.svg(); },
  info:v=>{ const Ka=10**-v.k, c=10**v.c, h=solveH(h=>h-c*Ka/(Ka+h)-KW/h), a=(h-KW/h)/c;
    return `pH exact = <b>${fmt(pHof(h),2)}</b> · formule ½(pKa − log c) = ${fmt((v.k-v.c)/2,2)} · fraction dissociée : ${fmt(100*a,1)} %`; },
  note:'La formule approchée n’est valable que si l’acide est peu dissocié (moins de 5 % environ). Compare-la au pH exact quand pKa est petit et c faible.'},
 {h:'L’acide acétique',p:'Calcule le pH d’une solution d’acide acétique à 0,10 mol/L (pKa = 4,76). Au centième.',lab:'pH =',ans:2.88,tol:.02,
  why:'pH ≈ ½(pKa − log c) = ½(4,76 + 1) = 2,88. Seulement 1,3 % de l’acide est dissocié, l’approximation est justifiée.'},
 {kind:'Théorie',h:'La courbe de titrage',p:`On verse de la soude à 0,10 mol/L dans 20 mL d’acide à 0,10 mol/L. À l’<b>équivalence</b> (V = 20 mL), les quantités d’acide et de base introduites sont égales. Acide fort : pH 7 à l’équivalence. Acide faible (acide acétique) : pH &gt; 7, et à la <b>demi-équivalence</b> pH = pKa.`,
  params:[{id:'V',l:'V(NaOH)',min:0,max:40,v:12,u:' mL'},{id:'w',l:'0 : acide fort · 1 : acide faible',min:0,max:1,v:1}],
  draw:v=>titrDraw(v.V,v.w===1),
  info:v=>`${v.w?'CH₃COOH':'HCl'} · V = ${v.V} mL · pH = <b>${fmt(titr(v.V,v.w===1),2)}</b>`,
  note:'Le saut de pH autour de l’équivalence permet de la repérer avec un indicateur coloré dont la zone de virage tombe dans le saut.'},
 {kind:'Pratique',h:'Lire le pKa',p:'Sur le titrage de l’acide acétique, place-toi au volume où le pH est égal au pKa.',
  params:[{id:'V',l:'V(NaOH)',min:0,max:40,v:0,u:' mL'}],
  draw:v=>titrDraw(v.V,true), info:v=>`V = ${v.V} mL · pH = ${fmt(titr(v.V,true),2)}`,
  ok:v=>v.V===10,why:'À la demi-équivalence (10 mL), la moitié de CH₃COOH est devenue CH₃COO⁻ : [A⁻] = [HA], donc pH = pKa = 4,76.'},
 {h:'Solution tampon',p:`Un <b>tampon</b> mélange un acide faible et sa base conjuguée : son pH varie peu quand on ajoute un peu d’acide ou de base. Il suit l’équation de <b>Henderson-Hasselbalch</b> : pH = pKa + log([A⁻]/[HA]). Quel est le pH d’un mélange de 0,10 mol d’acide acétique et 0,20 mol d’acétate (pKa = 4,76)&nbsp;? Au centième.`,lab:'pH =',ans:5.06,tol:.01,
  why:'pH = 4,76 + log(0,20/0,10) = 4,76 + 0,30 = 5,06.'},
 {kind:'Défi',h:'Fabriquer un tampon',p:'On veut un tampon NH₄⁺/NH₃ (pKa = 9,25) à pH 9,55. Quel rapport [NH₃]/[NH₄⁺] faut-il&nbsp;? Au dixième.',lab:'[NH₃]/[NH₄⁺] =',ans:2,tol:.05,
  why:'log([NH₃]/[NH₄⁺]) = pH − pKa = 0,30, donc le rapport vaut 10<sup>0,30</sup> ≈ 2,0.'},
]},

/* ================= 8. CINÉTIQUE ================= */
{subj:'chi', sem:'pri', id:'cms-chi-cinetique', h:'Cinétique chimique', p:'Vitesse de réaction, lois de vitesse, demi-vie et loi d’Arrhenius.', steps:[
 {kind:'Théorie',h:'La vitesse de réaction',p:`Pour <i>a</i>A → produits, la <b>vitesse</b> est <b>v = −(1/a)·d[A]/dt</b>, en mol/(L·s). Graphiquement, c’est l’opposé de la pente de la tangente à la courbe [A](t), divisé par a. Elle diminue en général au fil de la réaction.`,
  params:[{id:'t',l:'t',min:0,max:6,step:.5,v:1,u:' s'}],
  draw:v=>{ const A=t=>Math.exp(-0.5*t), m=-0.5*A(v.t), P=plane({x:[0,7],y:[0,1.15],h:200,grid:false,lx:1});
    P.fn(A,{from:0,to:7}).fn(x=>A(v.t)+m*(x-v.t),{c:'var(--spark)',w:2.5}).dot(v.t,A(v.t),{c:'var(--ink)'});
    P.text(6.9,1.05,'[A] (mol/L)',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>`[A] = ${fmt(Math.exp(-0.5*v.t),3)} mol/L · pente = ${fmt(-0.5*Math.exp(-0.5*v.t),3)} · v = <b>${fmt(0.5*Math.exp(-0.5*v.t),3)} mol/(L·s)</b>`},
 {h:'Vitesses des espèces',p:'Pour 2 N₂O₅ → 4 NO₂ + O₂, O₂ se forme à 1,0·10⁻³ mol/(L·s). À quelle vitesse NO₂ se forme-t-il&nbsp;?',
  opts:['1,0·10⁻³ mol/(L·s)','2,0·10⁻³ mol/(L·s)','2,5·10⁻⁴ mol/(L·s)','4,0·10⁻³ mol/(L·s)'],ans:3,
  why:'v = d[O₂]/dt = (1/4)·d[NO₂]/dt, donc d[NO₂]/dt = 4 × 1,0·10⁻³ = 4,0·10⁻³ mol/(L·s).'},
 {kind:'Théorie',h:'Ordre 0, 1 et 2',p:`La loi de vitesse s’écrit <b>v = k[A]<sup>n</sup></b>, n est l’ordre. Formes intégrées : ordre 0, [A] = [A]₀ − kt ; ordre 1, [A] = [A]₀·e<sup>−kt</sup> ; ordre 2, 1/[A] = 1/[A]₀ + kt. La <b>demi-vie</b> t<sub>½</sub> est le temps pour que [A] soit divisé par 2. Ici [A]₀ = 1 mol/L.`,
  params:[{id:'o',l:'ordre',min:0,max:2,v:1},{id:'k',l:'k',min:.1,max:1,step:.1,v:.3}],
  draw:v=>{ const A=[t=>Math.max(0,1-v.k*t),t=>Math.exp(-v.k*t),t=>1/(1+v.k*t)][v.o], th=[1/(2*v.k),Math.LN2/v.k,1/v.k][v.o], P=plane({x:[0,12],y:[0,1.15],h:200,grid:false,lx:2});
    P.seg(0,0.5,12,0.5,{c:'var(--muted)',w:1,dash:true}).fn(A,{from:0,to:12});
    if(th<=12) P.dot(th,0.5,{c:'var(--spark)',l:'t½'}); return P.svg(); },
  info:v=>{ const th=[1/(2*v.k),Math.LN2/v.k,1/v.k][v.o], f=['[A]₀/(2k)','ln 2 / k','1/(k[A]₀)'][v.o]; return `ordre ${v.o} · t<sub>½</sub> = ${f} = <b>${fmt(th,2)} s</b>`; },
  note:'Seule la demi-vie d’ordre 1 ne dépend pas de [A]₀ : c’est le cas de la désintégration radioactive.'},
 {h:'Demi-vie d’ordre 1',p:'Une réaction d’ordre 1 a pour constante k = 0,0231 s⁻¹. Calcule sa demi-vie, à la seconde près.',lab:'t½ =',unit:'s',ans:30,tol:.5,
  why:'t<sub>½</sub> = ln 2 / k = 0,693 / 0,0231 ≈ 30 s.'},
 {kind:'Pratique',h:'Trouver l’ordre',p:'Ces mesures suivent un seul ordre. Choisis le graphique où les points s’alignent : [A] (ordre 0), ln[A] (ordre 1) ou 1/[A] (ordre 2) en fonction de t.',
  params:[{id:'g',l:'0 : [A] · 1 : ln[A] · 2 : 1/[A]',min:0,max:2,v:0}],
  draw:v=>{ const ts=[0,1,2,3,4,5,6,7,8], A=ts.map(t=>1/(1+0.5*t)), f=[a=>a,a=>Math.log(a),a=>1/a][v.g], ys=A.map(f);
    const lo=Math.min(...ys), hi=Math.max(...ys), P=plane({x:[-0.5,8.5],y:[lo-(hi-lo)*.1,hi+(hi-lo)*.15],h:200,grid:false,axes:false});
    P.seg(0,ys[0],8,ys[8],{c:'var(--muted)',w:1.5,dash:true}); ts.forEach((t,i)=>P.dot(t,ys[i],{c:'var(--accent)',r:5}));
    P.text(8.4,hi+(hi-lo)*.05,['[A]','ln[A]','1/[A]'][v.g]+' en fonction de t',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const ts=[0,1,2,3,4,5,6,7,8], ys=ts.map(t=>[a=>a,a=>Math.log(a),a=>1/a][v.g](1/(1+0.5*t))), n=9, mx=4, my=ys.reduce((s,y)=>s+y,0)/n;
    let sxy=0,sxx=0,syy=0; ts.forEach((t,i)=>{ sxy+=(t-mx)*(ys[i]-my); sxx+=(t-mx)**2; syy+=(ys[i]-my)**2; }); return `coefficient de détermination R² = ${fmt(sxy*sxy/(sxx*syy),4)}`; },
  ok:v=>v.g===2,why:'1/[A] est une droite de pente k = 0,5 L/(mol·s) : la réaction est d’ordre 2. Les autres graphes sont courbés.'},
 {h:'Trois demi-vies',p:'Pour une réaction d’ordre 1, quel pourcentage du réactif reste-t-il après trois demi-vies&nbsp;?',lab:'reste :',unit:'%',ans:12.5,tol:.05,
  why:'À chaque demi-vie la quantité est divisée par 2 : 100 → 50 → 25 → 12,5 %.'},
 {kind:'Théorie',h:'Loi d’Arrhenius',p:`La constante de vitesse croît avec la température : <b>k = A·e<sup>−E<sub>a</sub>/RT</sup></b>, où E<sub>a</sub> est l’<b>énergie d’activation</b>. Le graphe de ln k en fonction de 1/T est une droite de pente −E<sub>a</sub>/R. Ici A = 10¹³ s⁻¹.`,
  params:[{id:'E',l:'Eₐ',min:20,max:120,step:10,v:50,u:' kJ/mol'},{id:'T',l:'T',min:280,max:380,step:10,v:300,u:' K'}],
  draw:v=>{ const lk=x=>Math.log(1e13)-v.E*1000/R*x/1000, P=plane({x:[2.5,3.7],y:[-25,32],h:220,grid:false,axes:false});
    P.fn(lk,{from:2.5,to:3.7}).dot(1000/v.T,lk(1000/v.T),{c:'var(--ink)'});
    P.text(3.68,-23,'1000/T (K⁻¹)',{a:'end',s:11,c:'var(--muted)'}).text(2.52,29,'ln k',{s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const k=T=>1e13*Math.exp(-v.E*1000/(R*T)); return `k(${v.T} K) = ${sci(k(v.T))} s⁻¹ · passer à ${v.T+10} K multiplie k par <b>${fmt(k(v.T+10)/k(v.T),2)}</b>`; },
  note:'Plus E<sub>a</sub> est grande, plus la droite est raide et plus la réaction est sensible à la température.'},
 {h:'Dix degrés de plus',p:'Une réaction a E<sub>a</sub> = 50 kJ/mol. Par combien k est-elle multipliée quand T passe de 298 K à 308 K&nbsp;? Au centième.',lab:'k₃₀₈/k₂₉₈ =',ans:1.93,tol:.02,
  why:'k₃₀₈/k₂₉₈ = exp[(E<sub>a</sub>/R)(1/298 − 1/308)] = exp[6014 × 1,09·10⁻⁴] = exp(0,655) ≈ 1,93.'},
 {kind:'Défi',h:'Ordre 2',p:'Une réaction d’ordre 2 a k = 0,20 L/(mol·s) et [A]₀ = 0,50 mol/L. Que vaut [A] après 10 s&nbsp;?',lab:'[A] =',unit:'mol/L',ans:.25,tol:.002,
  why:'1/[A] = 1/0,50 + 0,20 × 10 = 2 + 2 = 4 L/mol, donc [A] = 0,25 mol/L. C’est exactement une demi-vie : t<sub>½</sub> = 1/(k[A]₀) = 10 s.'},
]},
);
})();
