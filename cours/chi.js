/* Déclic — Chimie */
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

COURS.push(
/* ================= 1. ATOMES ================= */
{subj:'chi', sem:'pri', id:'chi-atomes', h:'Atomes', p:'Orbitales, configuration électronique, tableau périodique et raies de l’hydrogène.', steps:[
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
 {kind:'Problème',h:'L’élément mystère',
  p:'Un élément X de la <b>3e période</b> a pour énergies d’ionisation successives E₁ = 738, E₂ = 1451, E₃ = 7733 et E₄ = 10 543 kJ/mol. On veut l’identifier et prévoir l’ion qu’il forme. Donnée : 1 eV par atome correspond à 96,485 kJ/mol.',
  fig:(()=>{ const P=plane({x:[0,5],y:[0,12],h:180,grid:false,ly:2}), E=[0.738,1.451,7.733,10.543];
    E.forEach((e,i)=>P.rect(i+0.6,0,0.8,e,{fill:i<2?'var(--ok)':'var(--bad)',fo:.6,c:null}).text(i+1,0,`E${'₁₂₃₄'[i]}`,{a:'middle',dy:-6,s:11}));
    P.text(4.9,11.2,'10³ kJ/mol',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) Combien d’électrons de valence X possède-t-il&nbsp;?',lab:'électrons :',ans:2,hint:'Cherche le grand saut entre deux énergies successives : il signale qu’on attaque une couche interne.',why:'E₃/E₂ ≈ 5,3 alors que E₂/E₁ ≈ 2 : les deux premiers électrons sont faciles à arracher, le 3e appartient à la couche n = 2. X a 2 électrons de valence.'},
   {q:'b) Quel est son numéro atomique Z&nbsp;?',lab:'Z =',ans:12,hint:'3e période et 2 électrons de valence : la configuration se termine par 3s².',why:'1s² 2s² 2p⁶ 3s² compte 12 électrons : Z = 12, c’est le magnésium Mg.'},
   {q:'c) Convertis E₁ en eV par atome, au centième.',lab:'E₁ =',unit:'eV',ans:7.65,tol:.01,hint:'Divise par 96,485.',why:'738 / 96,485 ≈ 7,65 eV, la valeur du tableau pour Mg.'},
   {q:'d) Quel ion X forme-t-il le plus facilement&nbsp;?',opts:['X⁺, car E₁ est la plus petite','X²⁻, pour compléter l’octet','X²⁺, car le 3e électron coûte beaucoup plus cher','X³⁺, comme l’aluminium'],ans:2,hint:'Regarde jusqu’où l’on peut ioniser sans entamer la couche complète n = 2.',why:'Perdre deux électrons donne la configuration du néon. Le 3e coûte environ 5 fois plus : on forme Mg²⁺ (l’énergie de réseau compense E₂ dans les solides ioniques).'},
  ],
  sol:'Les énergies d’ionisation croissent régulièrement tant qu’on retire des électrons de la même couche, puis font un bond quand on attaque une couche interne. Ici E₃/E₂ ≈ 5,3 contre E₂/E₁ ≈ 2 : X a <b>2 électrons de valence</b>.<br>En 3e période, la configuration est donc [Ne] 3s², soit <b>Z = 12</b> : le magnésium.<br>E₁ = 738 / 96,485 ≈ <b>7,65 eV</b> par atome.<br>Mg perd ses deux électrons 3s pour prendre la configuration du néon : il forme l’ion <b>Mg²⁺</b>.'},
 {kind:'Problème',h:'Une raie violette',
  p:'Un tube à hydrogène émet, entre autres, une raie visible à <b>λ = 434 nm</b>. On veut savoir de quelle transition elle provient, puis jusqu’où s’étend la série. Données : E<sub>n</sub> = −13,6 eV / n², hc = 1240 eV·nm. Toutes les raies visibles de l’hydrogène aboutissent au niveau n = 2.',
  parts:[
   {q:'a) Quelle est l’énergie du photon émis, au centième d’eV&nbsp;?',lab:'ΔE =',unit:'eV',ans:2.86,tol:.01,hint:'ΔE = hc/λ.',why:'ΔE = 1240 / 434 ≈ 2,86 eV.'},
   {q:'b) De quel niveau n<sub>i</sub> l’électron est-il parti&nbsp;?',lab:'nᵢ =',ans:5,hint:'Écris 13,6·(1/2² − 1/n<sub>i</sub>²) = ΔE et isole 1/n<sub>i</sub>².',why:'1/n<sub>i</sub>² = 0,25 − 2,857/13,6 = 0,0399, donc n<sub>i</sub>² ≈ 25 et n<sub>i</sub> = 5. C’est la transition 5 → 2.'},
   {q:'c) Quelle énergie faut-il pour ioniser un atome dont l’électron est sur n = 2&nbsp;? Au dixième d’eV.',lab:'E =',unit:'eV',ans:3.4,tol:.01,hint:'Ioniser, c’est amener l’électron de E₂ jusqu’à E = 0.',why:'E = 0 − E₂ = 13,6 / 4 = 3,4 eV.'},
   {q:'d) La série de Balmer a une limite : la plus courte longueur d’onde possible quand n<sub>i</sub> devient très grand. Que vaut-elle, au nm&nbsp;?',lab:'λ<sub>lim</sub> =',unit:'nm',ans:365,tol:1,hint:'Quand n<sub>i</sub> → ∞, E<sub>i</sub> → 0 : le photon emporte l’énergie trouvée en c).',why:'λ<sub>lim</sub> = 1240 / 3,4 ≈ 365 nm, dans le proche ultraviolet. Toutes les raies de Balmer sont entre 365 et 656 nm.'},
  ],
  sol:'Le photon a pour énergie ΔE = hc/λ = 1240/434 ≈ <b>2,86 eV</b>.<br>La raie est visible, donc n<sub>f</sub> = 2 : 13,6·(1/4 − 1/n<sub>i</sub>²) = 2,857, d’où 1/n<sub>i</sub>² ≈ 0,0399 et <b>n<sub>i</sub> = 5</b>. Vérification : 1240 / (13,6 × 0,21) ≈ 434 nm.<br>Depuis n = 2, l’ionisation coûte −E₂ = <b>3,4 eV</b>.<br>Quand n<sub>i</sub> → ∞, ΔE → 3,4 eV : la limite de la série est λ = 1240/3,4 ≈ <b>365 nm</b>. Les raies se resserrent vers cette limite.'},
]},

/* ================= 2. MOLÉCULES ================= */
{subj:'chi', sem:'pri', id:'chi-molecules', h:'Molécules', p:'Liaisons, structures de Lewis, géométrie VSEPR et forces entre molécules.', steps:[
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
 {kind:'Problème',h:'Une molécule inconnue',
  p:'Le trifluorure d’azote NF₃ sert à graver les puces électroniques. L’azote (5 électrons de valence) est l’atome central, lié à trois fluors (7 électrons de valence chacun). On veut sa structure de Lewis, sa géométrie et sa polarité. Données : χ(N) = 3,04, χ(F) = 3,98.',
  parts:[
   {q:'a) Combien d’électrons de valence compte la molécule&nbsp;?',lab:'électrons :',ans:26,hint:'Additionne les électrons de valence de chaque atome.',why:'5 + 3 × 7 = 26 électrons, soit 13 doublets.'},
   {q:'b) Combien de doublets libres porte l’azote&nbsp;?',lab:'doublets libres :',ans:1,hint:'Place les 3 liaisons N–F, complète l’octet des fluors (3 doublets chacun), puis répartis ce qui reste.',why:'3 liaisons (3 doublets) + 3 × 3 doublets sur les F = 12 doublets. Il en reste 1, sur l’azote, qui a alors son octet.'},
   {q:'c) Quelle est la géométrie de NF₃&nbsp;?',opts:['Trigonale plane','Pyramidale à base triangulaire','En T','Tétraédrique'],ans:1,hint:'Compte les domaines X + E autour de N.',why:'AX₃E₁ : quatre domaines en tétraèdre, dont un doublet libre. La forme visible est une pyramide à base triangulaire, comme NH₃.'},
   {q:'d) NF₃ est-elle polaire&nbsp;?',opts:['Non, car ses trois liaisons sont identiques','Non, car Δχ est inférieur à 1,7','Oui, car les trois moments N–F pointent vers le même côté de la pyramide et ne s’annulent pas','Oui, mais seulement à cause du doublet libre'],ans:2,hint:'Une molécule est apolaire si ses moments de liaison s’annulent par symétrie. Est-ce le cas d’une pyramide&nbsp;?',why:'Δχ = 0,94 : chaque liaison est polaire. Dans une pyramide, les trois moments ont tous une composante vers la base : la somme n’est pas nulle et NF₃ est polaire (μ ≈ 0,2 D).'},
  ],
  sol:'NF₃ compte 5 + 3 × 7 = <b>26 électrons</b> de valence, soit 13 doublets : 3 liaisons N–F, 3 doublets libres sur chaque F et <b>1 doublet libre</b> sur N.<br>L’azote est AX₃E₁ : 4 domaines en tétraèdre, la molécule est <b>pyramidale à base triangulaire</b> (angle un peu inférieur à 109,5°).<br>Les liaisons N–F sont polaires (Δχ = 0,94) et la pyramide n’est pas assez symétrique pour annuler leurs moments : NF₃ est <b>polaire</b>. Par contraste, BF₃ (AX₃, plane) est apolaire.'},
 {kind:'Problème',h:'Les charges partielles de l’eau',
  p:'Le moment dipolaire mesuré de l’eau vaut <b>μ = 1,85 D</b>, l’angle H–O–H est de 104,5° et la longueur d’une liaison O–H est d = 0,958·10⁻¹⁰ m. On veut en déduire le moment de chaque liaison, puis la charge partielle portée par chaque H. Données : 1 D = 3,336·10⁻³⁰ C·m, e = 1,602·10⁻¹⁹ C.',
  parts:[
   {q:'a) Quel est le type VSEPR de l’oxygène dans H₂O&nbsp;?',opts:['AX₂','AX₂E₁','AX₂E₂','AX₄'],ans:2,hint:'O a 6 électrons de valence, dont 2 sont engagés dans les liaisons.',why:'Il reste 4 électrons non liants, soit 2 doublets libres : AX₂E₂, coudée.'},
   {q:'b) Calcule le moment d’une liaison O–H, au centième de debye.',lab:'μ<sub>O–H</sub> =',unit:'D',ans:1.51,tol:.01,hint:'μ = 2μ<sub>O–H</sub>·cos(θ/2). Isole μ<sub>O–H</sub>.',why:'μ<sub>O–H</sub> = 1,85 / (2 cos 52,25°) = 1,85 / 1,224 ≈ 1,51 D.'},
   {q:'c) En modélisant la liaison par deux charges ±δ·e séparées de d, que vaut δ&nbsp;? Au centième.',lab:'δ =',ans:.33,tol:.01,hint:'μ = q·d en C·m, puis δ = q/e.',why:'q = 1,511 × 3,336·10⁻³⁰ / 0,958·10⁻¹⁰ ≈ 5,26·10⁻²⁰ C, soit δ = q/e ≈ 0,33.'},
   {q:'d) Que dit ce résultat de la liaison O–H&nbsp;?',opts:['Elle est ionique : H porte une charge +1','Elle est covalente polaire : environ un tiers de charge sur chaque H','Elle est apolaire, puisque δ &lt; 1','On ne peut rien conclure sans connaître la masse de l’eau'],ans:1,hint:'Compare δ à 0 (covalent pur) et à 1 (ionique pur).',why:'δ ≈ 0,33 est entre les deux extrêmes : la liaison est covalente polaire, en accord avec Δχ = 1,24.'},
  ],
  sol:'L’oxygène est AX₂E₂ : la molécule est coudée et ses deux moments de liaison s’additionnent.<br>Par la somme vectorielle, μ = 2μ<sub>O–H</sub>·cos(52,25°), d’où μ<sub>O–H</sub> = 1,85 / 1,224 ≈ <b>1,51 D</b>.<br>En unités SI : 1,511 × 3,336·10⁻³⁰ ≈ 5,04·10⁻³⁰ C·m. Avec μ = q·d : q = 5,04·10⁻³⁰ / 0,958·10⁻¹⁰ ≈ 5,26·10⁻²⁰ C, soit <b>δ ≈ 0,33</b> charge élémentaire.<br>La liaison O–H est donc <b>covalente polaire</b> : le doublet est nettement déplacé vers O, sans transfert complet d’électron.'},
]},

/* ================= 3. QUANTITÉS ================= */
{subj:'chi', sem:'pri', id:'chi-quantites', h:'Quantités de matière', p:'La mole, les masses molaires, les concentrations et les pressions partielles.', steps:[
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
 {kind:'Problème',h:'Une solution de sulfate de cuivre',
  p:'Au laboratoire, tu dois préparer <b>250 mL</b> d’une solution de sulfate de cuivre à <b>0,100 mol/L</b> à partir de cristaux bleus de CuSO₄·5H₂O (chaque unité contient 5 molécules d’eau). Tu dilueras ensuite cette solution mère. Masses molaires : Cu 63,5 ; S 32 ; O 16 ; H 1 g/mol. N<sub>A</sub> = 6,022·10²³ mol⁻¹.',
  parts:[
   {q:'a) Quelle est la masse molaire de CuSO₄·5H₂O&nbsp;?',lab:'M =',unit:'g/mol',ans:249.5,tol:.05,hint:'N’oublie pas les 5 molécules d’eau (18 g/mol chacune).',why:'M = 63,5 + 32 + 4 × 16 + 5 × 18 = 159,5 + 90 = 249,5 g/mol.'},
   {q:'b) Quelle masse de cristaux faut-il peser&nbsp;? Au centième de gramme.',lab:'m =',unit:'g',ans:6.24,tol:.01,hint:'n = c·V, puis m = n·M.',why:'n = 0,100 × 0,250 = 0,0250 mol, m = 0,0250 × 249,5 ≈ 6,24 g.'},
   {q:'c) On prélève 10,0 mL de cette solution, qu’on verse dans une fiole de 100 mL complétée à l’eau. Quelle est la nouvelle concentration&nbsp;?',lab:'c =',unit:'mol/L',ans:.01,tol:.0001,hint:'c₁V₁ = c₂V₂.',why:'c₂ = 0,100 × 10,0 / 100 = 0,0100 mol/L : on a dilué 10 fois.'},
   {q:'d) Combien d’ions Cu²⁺ contient 1,0 mL de la solution diluée&nbsp;? Donne le résultat en 10¹⁸ ions, au centième.',lab:'N =',unit:'·10¹⁸ ions',ans:6.02,tol:.01,hint:'n = c·V avec V en litres, puis N = n·N<sub>A</sub>.',why:'n = 0,0100 × 1,0·10⁻³ = 1,0·10⁻⁵ mol, N = 1,0·10⁻⁵ × 6,022·10²³ ≈ 6,02·10¹⁸ ions.'},
  ],
  sol:'La masse molaire du sel hydraté inclut l’eau de cristallisation : M = 159,5 + 5 × 18 = <b>249,5 g/mol</b>.<br>Il faut n = cV = 0,100 × 0,250 = 0,0250 mol, soit m = 0,0250 × 249,5 ≈ <b>6,24 g</b>. On les dissout dans un peu d’eau dans la fiole jaugée de 250 mL, puis on complète jusqu’au trait.<br>La dilution conserve la quantité de soluté : c₂ = c₁V₁/V₂ = <b>0,0100 mol/L</b>.<br>Dans 1,0 mL : n = 1,0·10⁻⁵ mol, soit N = n·N<sub>A</sub> ≈ <b>6,02·10¹⁸ ions</b> Cu²⁺. Même une solution diluée contient un nombre immense d’ions.'},
 {kind:'Problème',h:'L’acide chlorhydrique du commerce',
  p:'Une bouteille d’acide chlorhydrique concentré indique : <b>37 % en masse de HCl</b>, masse volumique <b>1,19 g/mL</b>. On veut connaître sa concentration molaire, puis préparer <b>500 mL</b> d’acide à <b>0,50 mol/L</b>. Masse molaire : M(HCl) = 36,5 g/mol.',
  parts:[
   {q:'a) Quelle est la masse d’un litre de cette solution&nbsp;?',lab:'m =',unit:'g',ans:1190,tol:.5,hint:'Masse = masse volumique × volume, avec 1 L = 1000 mL.',why:'m = 1,19 × 1000 = 1190 g.'},
   {q:'b) Quelle masse de HCl ce litre contient-il&nbsp;? Au dixième de gramme.',lab:'m(HCl) =',unit:'g',ans:440.3,tol:.1,hint:'37 % de la masse totale est du HCl.',why:'m(HCl) = 0,37 × 1190 = 440,3 g.'},
   {q:'c) Quelle est la concentration molaire de l’acide concentré&nbsp;? Au centième.',lab:'c =',unit:'mol/L',ans:12.06,tol:.02,hint:'n = m/M dans 1 L.',why:'n = 440,3 / 36,5 ≈ 12,06 mol dans 1 L : c ≈ 12,06 mol/L.'},
   {q:'d) Quel volume d’acide concentré faut-il prélever pour la dilution&nbsp;? Au dixième de mL.',lab:'V =',unit:'mL',ans:20.7,tol:.1,hint:'Calcule d’abord la quantité de HCl voulue dans 500 mL.',why:'n = 0,50 × 0,500 = 0,25 mol, V = 0,25 / 12,06 ≈ 0,0207 L = 20,7 mL.'},
  ],
  sol:'On raisonne sur 1 L de solution commerciale : sa masse vaut 1,19 × 1000 = <b>1190 g</b>, dont 37 % de HCl, soit <b>440,3 g</b>.<br>Cela fait n = 440,3 / 36,5 ≈ 12,06 mol, donc <b>c ≈ 12,1 mol/L</b>.<br>Pour 500 mL à 0,50 mol/L il faut 0,25 mol de HCl, contenus dans V = 0,25 / 12,06 ≈ <b>20,7 mL</b> d’acide concentré.<br>En pratique, on verse cet acide dans environ 300 mL d’eau, puis on complète à 500 mL : on verse toujours l’acide dans l’eau, jamais l’inverse.'},
]},

/* ================= 4. STŒCHIOMÉTRIE ================= */
{subj:'chi', sem:'pri', id:'chi-stoechio', h:'Stœchiométrie', p:'Équilibrer une équation, trouver le réactif limitant et calculer un rendement.', steps:[
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
 {kind:'Problème',h:'Le coussin gonflable',
  p:'Un coussin gonflable de voiture se remplit d’azote en quelques millisecondes grâce à la décomposition de l’azoture de sodium : <b>2 NaN₃ → 2 Na + 3 N₂</b>. Le coussin doit contenir <b>60 L</b> de gaz à 298 K et 100 kPa. Le sodium formé, dangereux, est ensuite neutralisé par du nitrate de potassium : 10 Na + 2 KNO₃ → K₂O + 5 Na₂O + N₂. Données : R = 8,314 J/(mol·K), Na 23, N 14, K 39, O 16 g/mol.',
  parts:[
   {q:'a) Quelle quantité de N₂ faut-il produire&nbsp;? Au centième de mole.',lab:'n(N₂) =',unit:'mol',ans:2.42,tol:.01,hint:'pV = nRT, avec V en m³ et p en Pa.',why:'n = pV/RT = 100 000 × 0,060 / (8,314 × 298) ≈ 2,42 mol.'},
   {q:'b) Quelle masse d’azoture de sodium faut-il&nbsp;? Au gramme près.',lab:'m(NaN₃) =',unit:'g',ans:105,tol:.6,hint:'2 NaN₃ donnent 3 N₂. M(NaN₃) = 23 + 3 × 14.',why:'n(NaN₃) = (2/3) × 2,422 ≈ 1,615 mol, et M = 65 g/mol : m ≈ 105 g.'},
   {q:'c) Quelle masse de KNO₃ neutralise tout le sodium formé&nbsp;? Au gramme près.',lab:'m(KNO₃) =',unit:'g',ans:33,tol:.6,hint:'n(Na) = n(NaN₃). Il faut 2 KNO₃ pour 10 Na, et M(KNO₃) = 101 g/mol.',why:'n(Na) = 1,615 mol, n(KNO₃) = 1,615 / 5 ≈ 0,323 mol, soit 0,323 × 101 ≈ 33 g.'},
  ],
  sol:'Le volume fixe la quantité de gaz : n(N₂) = pV/RT = 6000 / 2477,6 ≈ <b>2,42 mol</b>.<br>D’après l’équation, n(NaN₃) = (2/3)·n(N₂) ≈ 1,615 mol. Avec M(NaN₃) = 65 g/mol : m ≈ <b>105 g</b> : une petite charge suffit pour 60 L de gaz.<br>Cette décomposition libère aussi 1,615 mol de sodium. La seconde réaction consomme 2 KNO₃ pour 10 Na : n(KNO₃) = 0,323 mol, soit <b>33 g</b> (M = 39 + 14 + 48 = 101 g/mol). Elle libère au passage un peu plus de N₂ (0,16 mol), que l’on néglige ici.'},
 {kind:'Problème',h:'Le CO₂ d’une voiture',
  p:'On assimile l’essence à de l’octane C₈H₁₈ (M = 114 g/mol, masse volumique 0,70 kg/L). Une voiture consomme <b>6,0 L aux 100 km</b>. La combustion complète s’écrit C₈H₁₈ + <i>b</i> O₂ → 8 CO₂ + 9 H₂O. L’air contient 21 % de O₂ en moles. Données : M(CO₂) = 44 g/mol, R = 8,314 J/(mol·K), gaz à 298 K et 100 kPa.',
  parts:[
   {q:'a) Que vaut le coefficient <i>b</i>&nbsp;?',lab:'b =',ans:12.5,tol:.01,hint:'Compte les atomes d’oxygène à droite : 8 CO₂ et 9 H₂O.',why:'À droite : 8 × 2 + 9 = 25 atomes de O, donc b = 25/2 = 12,5 (ou 2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O).'},
   {q:'b) Quelle masse de CO₂ la voiture émet-elle par kilomètre&nbsp;? Au gramme près.',lab:'m(CO₂) =',unit:'g/km',ans:130,tol:.6,hint:'Masse d’essence aux 100 km, puis moles d’octane, puis 8 CO₂ par octane.',why:'6,0 L pèsent 4,2 kg, soit 4200/114 ≈ 36,8 mol d’octane, qui donnent 8 × 36,8 = 294,7 mol de CO₂ = 12 968 g aux 100 km, environ 130 g/km.'},
   {q:'c) Dans un cylindre, on injecte 0,0400 g d’octane avec 0,50 L d’air (298 K, 100 kPa). Quel est le réactif limitant&nbsp;?',opts:['L’octane, car sa masse est bien plus petite que celle de l’air','L’octane, car il faut 12,5 fois plus de O₂ que d’octane et il y en a assez','Le dioxygène : il en faudrait 4,39·10⁻³ mol et il n’y en a que 4,24·10⁻³','Aucun, les proportions sont exactement stœchiométriques'],ans:2,hint:'Calcule n(octane), n(O₂) = 0,21·pV/RT, puis compare n(O₂) à 12,5·n(octane).',why:'n(octane) = 0,0400/114 = 3,51·10⁻⁴ mol, qui demande 12,5 × 3,51·10⁻⁴ = 4,39·10⁻³ mol de O₂. L’air n’en apporte que 0,21 × 0,0202 = 4,24·10⁻³ mol : O₂ est limitant, le mélange est trop riche et produit du CO.'},
   {q:'d) Quel volume d’air faut-il pour brûler l’essence de 100 km&nbsp;? Au dixième de m³.',lab:'V(air) =',unit:'m³',ans:54.3,tol:.1,hint:'n(O₂) = 12,5 × n(octane), puis n(air) = n(O₂)/0,21, puis pV = nRT.',why:'n(O₂) = 12,5 × 36,84 = 460,5 mol, n(air) = 460,5/0,21 ≈ 2193 mol, V = 2193 × 8,314 × 298 / 100 000 ≈ 54,3 m³.'},
  ],
  sol:'On équilibre C, puis H, puis O : <b>b = 12,5</b>.<br>Aux 100 km : 6,0 × 0,70 = 4,2 kg d’octane, soit 36,84 mol, qui produisent 8 × 36,84 = 294,7 mol de CO₂, soit 12,97 kg. Cela fait <b>≈ 130 g de CO₂ par km</b> : la voiture rejette trois fois plus de CO₂ (en masse) qu’elle ne brûle d’essence, car elle fixe de l’oxygène de l’air.<br>Dans le cylindre, l’octane réclame 4,39·10⁻³ mol de O₂ pour 4,24·10⁻³ mol disponibles : <b>O₂ est limitant</b>.<br>Pour 100 km, il faut 460,5 mol de O₂, donc 2193 mol d’air : V = nRT/p ≈ <b>54,3 m³</b> d’air.'},
]},

/* ================= 5. ÉQUILIBRES ================= */
{subj:'chi', sem:'pri', id:'chi-equilibres', h:'Équilibres chimiques', p:'Quotient réactionnel, enthalpie libre, constante d’équilibre et principe de Le Chatelier.', steps:[
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
 {kind:'Problème',h:'La synthèse de l’ammoniac',
  p:'L’ammoniac des engrais se fabrique par la réaction <b>N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)</b>, exothermique (ΔH° = −92 kJ/mol). À 298 K, ΔG° = −32,9 kJ/mol. Les activités des gaz sont p/p° avec p° = 1 bar. Donnée : R = 8,314 J/(mol·K).',
  parts:[
   {q:'a) Calcule log₁₀ K à 298 K, au centième.',lab:'log₁₀ K =',ans:5.77,tol:.01,hint:'K = exp(−ΔG°/RT), puis log₁₀ K = ln K / ln 10.',why:'ln K = 32 900 / (8,314 × 298) ≈ 13,28, donc K ≈ 5,8·10⁵ et log₁₀ K ≈ 5,77.'},
   {q:'b) Un réacteur contient p(N₂) = 1,0 bar, p(H₂) = 3,0 bar et p(NH₃) = 0,50 bar à 298 K. Calcule ΔG, au dixième de kJ/mol.',lab:'ΔG =',unit:'kJ/mol',ans:-44.5,tol:.1,hint:'Q = p(NH₃)² / (p(N₂)·p(H₂)³), puis ΔG = ΔG° + RT ln Q.',why:'Q = 0,25 / 27 ≈ 9,26·10⁻³, ln Q ≈ −4,68. ΔG = −32,9 + 2,478 × (−4,68) ≈ −44,5 kJ/mol : la réaction avance dans le sens direct.'},
   {q:'c) On divise brusquement le volume par 2 à température constante : toutes les pressions partielles doublent. Par quel facteur Q est-il multiplié&nbsp;?',lab:'facteur :',ans:.25,tol:.001,hint:'Remplace chaque p par 2p dans l’expression de Q.',why:'Q′ = (2p<sub>NH₃</sub>)² / (2p<sub>N₂</sub>·(2p<sub>H₂</sub>)³) = Q × 4/16 = Q/4. Q s’éloigne de K par le bas : le système évolue vers NH₃, comme le prévoit Le Chatelier.'},
   {q:'d) Pourtant, l’industrie travaille vers 450 °C alors que la réaction est exothermique. Pourquoi&nbsp;?',opts:['Parce que K augmente avec la température','Parce qu’à basse température la réaction est beaucoup trop lente, même avec un catalyseur','Parce que chauffer augmente la pression, ce qui déplace l’équilibre','Parce que le catalyseur déplace l’équilibre vers NH₃ à haute température'],ans:1,hint:'Le Chatelier dit où va l’équilibre, pas à quelle vitesse on l’atteint.',why:'Chauffer diminue K (sens endothermique favorisé), donc le rendement. Mais à température ambiante la vitesse est quasi nulle : 450 °C, une pression de 150 à 300 bar et un catalyseur au fer réalisent un compromis entre rendement et vitesse.'},
  ],
  sol:'À 298 K, K = exp(32 900 / 2477,6) = e<sup>13,28</sup> ≈ 5,8·10⁵, soit <b>log₁₀ K ≈ 5,77</b> : l’équilibre est très favorable à NH₃.<br>Dans le réacteur, Q = 0,5² / (1 × 3³) ≈ 9,3·10⁻³ ≪ K, et ΔG = −32,9 + RT ln Q ≈ <b>−44,5 kJ/mol</b> &lt; 0 : sens direct.<br>Doubler toutes les pressions multiplie Q par 2² / 2⁴ = <b>1/4</b> : 4 moles de gaz deviennent 2, la compression favorise NH₃.<br>Chauffer défavorise l’équilibre (ΔH &lt; 0) mais accélère la réaction : le procédé Haber-Bosch choisit <b>un compromis cinétique</b>, haute pression pour le rendement, 450 °C et catalyseur pour la vitesse.'},
 {kind:'Problème',h:'Le gaz roux N₂O₄ ⇌ 2 NO₂',
  p:'Dans un ballon de volume fixe à 298 K, on introduit du tétraoxyde de diazote incolore sous <b>1,00 bar</b>. Il se dissocie partiellement en dioxyde d’azote roux : <b>N₂O₄(g) ⇌ 2 NO₂(g)</b>, avec K = 0,15 (activités p/p°, p° = 1 bar). On note <i>x</i> la pression de N₂O₄ qui a disparu à l’équilibre. Donnée : R = 8,314 J/(mol·K).',
  parts:[
   {q:'a) Quelle équation <i>x</i> vérifie-t-il&nbsp;?',opts:[`${F('2x','1 − x')} = 0,15`,`${F('x²','1 − x')} = 0,15`,`${F('4x²','1 − x')} = 0,15`,`${F('1 − x','4x²')} = 0,15`],ans:2,hint:'À l’équilibre, p(N₂O₄) = 1 − x et p(NO₂) = 2x. Le coefficient 2 apparaît en exposant dans K.',why:'K = p(NO₂)² / p(N₂O₄) = (2x)² / (1 − x) = 4x² / (1 − x).'},
   {q:'b) Résous : que vaut <i>x</i>, au millième de bar&nbsp;?',lab:'x =',unit:'bar',ans:.176,tol:.002,hint:'4x² + 0,15x − 0,15 = 0. Garde la racine positive.',why:'x = (−0,15 + √(0,0225 + 2,4)) / 8 = (−0,15 + 1,556) / 8 ≈ 0,176 bar.'},
   {q:'c) Quelle est la pression totale à l’équilibre&nbsp;? Au centième.',lab:'p =',unit:'bar',ans:1.18,tol:.01,hint:'p = p(N₂O₄) + p(NO₂).',why:'p = (1 − x) + 2x = 1 + x ≈ 1,18 bar : la dissociation crée des molécules et fait monter la pression.'},
   {q:'d) Que vaut ΔG° de la dissociation, au centième de kJ/mol&nbsp;?',lab:'ΔG° =',unit:'kJ/mol',ans:4.7,tol:.02,hint:'ΔG° = −RT ln K.',why:'ΔG° = −8,314 × 298 × ln 0,15 / 1000 ≈ +4,70 kJ/mol. ΔG° &gt; 0 veut dire K &lt; 1, pas que la réaction est impossible.'},
   {q:'e) On comprime le mélange jusqu’à diviser son volume par 2. Le nouvel équilibre est celui qu’on obtiendrait en partant de 2,00 bar de N₂O₄. Quel pourcentage du N₂O₄ est alors dissocié&nbsp;? Au dixième.',lab:'α =',unit:'%',ans:12.8,tol:.1,hint:'Résous 4y² / (2 − y) = 0,15, puis α = y / 2.',why:'4y² + 0,15y − 0,30 = 0 donne y ≈ 0,256 bar, soit α = 0,256 / 2 ≈ 12,8 % contre 17,6 % avant : la compression favorise le côté qui compte le moins de moles de gaz.'},
  ],
  sol:'Tableau d’avancement en pressions : p(N₂O₄) = 1 − x, p(NO₂) = 2x, donc <b>4x²/(1 − x) = 0,15</b>.<br>L’équation 4x² + 0,15x − 0,15 = 0 a pour racine positive <b>x ≈ 0,176 bar</b> : 17,6 % du N₂O₄ est dissocié et la pression totale monte à <b>1,18 bar</b>.<br>ΔG° = −RT ln K ≈ <b>+4,70 kJ/mol</b>, cohérent avec K &lt; 1 : à l’équilibre, il reste plus de N₂O₄ que de NO₂.<br>Après compression, 4y²/(2 − y) = 0,15 donne y ≈ 0,256 bar, soit une dissociation de <b>12,8 %</b> seulement. Le ballon devient d’abord plus foncé (NO₂ plus concentré), puis s’éclaircit un peu : c’est Le Chatelier.'},
]},

/* ================= 6. SOLUTIONS ================= */
{subj:'chi', sem:'pri', id:'chi-solutions', h:'Solutions', p:'Solubilité, produit de solubilité et propriétés colligatives.', steps:[
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
 {kind:'Problème',h:'Saler les routes en hiver',
  p:'Les services de voirie répandent du sel pour empêcher la neige fondue de regeler. On veut que <b>1,0 kg d’eau</b> reste liquide jusqu’à <b>−5,0 °C</b>. On compare le chlorure de sodium NaCl (M = 58,5 g/mol, i = 2) et le chlorure de calcium CaCl₂ (M = 111 g/mol, i = 3). Donnée : K<sub>f</sub>(eau) = 1,86 K·kg/mol.',
  parts:[
   {q:'a) Quelle molalité de NaCl faut-il&nbsp;? Au centième.',lab:'b =',unit:'mol/kg',ans:1.34,tol:.01,hint:'ΔT = i·K<sub>f</sub>·b avec ΔT = 5,0 K.',why:'b = 5,0 / (2 × 1,86) ≈ 1,34 mol/kg.'},
   {q:'b) Quelle masse de NaCl faut-il dissoudre dans 1,0 kg d’eau&nbsp;? Au gramme près.',lab:'m =',unit:'g',ans:79,tol:.6,hint:'m = b × (masse d’eau en kg) × M.',why:'m = 1,344 × 1,0 × 58,5 ≈ 79 g.'},
   {q:'c) Même question avec CaCl₂. Au gramme près.',lab:'m =',unit:'g',ans:99,tol:.6,hint:'Recommence avec i = 3 et M = 111 g/mol.',why:'b = 5,0 / (3 × 1,86) ≈ 0,896 mol/kg, m = 0,896 × 111 ≈ 99 g.'},
   {q:'d) À masse égale, quel sel abaisse le plus la température de fusion&nbsp;?',opts:['CaCl₂, car il libère 3 ions au lieu de 2','NaCl, car il libère plus de particules par gramme','Les deux sont équivalents, seul compte le nombre de moles de sel','CaCl₂, car sa masse molaire est plus grande'],ans:1,hint:'Compare le nombre de moles de particules par gramme : i/M.',why:'NaCl donne 2/58,5 ≈ 0,034 mol de particules par gramme, CaCl₂ seulement 3/111 ≈ 0,027. Par gramme, NaCl est plus efficace. CaCl₂ sert quand il fait très froid, car il reste très soluble et sa dissolution dégage de la chaleur.'},
  ],
  sol:'La cryoscopie ne dépend que du nombre de particules : ΔT = i·K<sub>f</sub>·b.<br>Pour NaCl : b = 5,0 / 3,72 ≈ <b>1,34 mol/kg</b>, soit m ≈ 1,344 × 58,5 ≈ <b>79 g</b> par kg d’eau.<br>Pour CaCl₂ : b = 5,0 / 5,58 ≈ 0,896 mol/kg, soit m ≈ <b>99 g</b>.<br>CaCl₂ libère plus d’ions par unité, mais chaque unité est presque deux fois plus lourde : <b>par gramme, NaCl gagne</b> (0,034 contre 0,027 mol de particules). Le modèle suppose une solution idéale, ce qui surestime un peu l’effet à ces concentrations.'},
 {kind:'Problème',h:'Le calcaire de l’eau dure',
  p:'Le calcaire est du carbonate de calcium : <b>CaCO₃(s) ⇌ Ca²⁺ + CO₃²⁻</b>, K<sub>s</sub> = 3,4·10⁻⁹ à 25 °C. Une eau du robinet « dure » contient [Ca²⁺] = 2,0·10⁻³ mol/L. On néglige les réactions acide-base des ions carbonate. Donnée : M(CaCO₃) = 100 g/mol.',
  parts:[
   {q:'a) Quelle masse de CaCO₃ se dissout au plus dans 1 L d’eau pure&nbsp;? Au dixième de mg.',lab:'m =',unit:'mg',ans:5.8,tol:.05,hint:'K<sub>s</sub> = s², puis m = s·M pour 1 L.',why:'s = √(3,4·10⁻⁹) ≈ 5,83·10⁻⁵ mol/L, soit 5,83·10⁻³ g ≈ 5,8 mg par litre.'},
   {q:'b) Dans l’eau dure, quelle concentration de CO₃²⁻ suffit à faire précipiter le calcaire&nbsp;? Donne-la en 10⁻⁶ mol/L, au dixième.',lab:'[CO₃²⁻] =',unit:'·10⁻⁶ mol/L',ans:1.7,tol:.01,hint:'Le précipité apparaît dès que [Ca²⁺][CO₃²⁻] dépasse K<sub>s</sub>.',why:'[CO₃²⁻] = K<sub>s</sub> / [Ca²⁺] = 3,4·10⁻⁹ / 2,0·10⁻³ = 1,7·10⁻⁶ mol/L.'},
   {q:'c) On verse 1,0 mL de Na₂CO₃ à 0,010 mol/L dans 99 mL de cette eau. Que se passe-t-il&nbsp;?',opts:['Rien : 1 mL est une quantité négligeable','Un précipité se forme, car Q ≈ 2·10⁻⁷ dépasse K<sub>s</sub>','Rien, car Q ≈ 2·10⁻⁹ est inférieur à K<sub>s</sub>','Le calcaire déjà présent se dissout'],ans:1,hint:'Calcule les concentrations après mélange dans 100 mL, puis Q = [Ca²⁺][CO₃²⁻].',why:'[CO₃²⁻] = 0,010 × 1/100 = 1,0·10⁻⁴ et [Ca²⁺] = 2,0·10⁻³ × 99/100 = 1,98·10⁻³ mol/L. Q = 1,98·10⁻⁷ ≈ 58 K<sub>s</sub> : CaCO₃ précipite.'},
   {q:'d) Pour adoucir 1 L de cette eau, on y ajoute 1,0·10⁻³ mol de CO₃²⁻ (volume inchangé). Quelle masse de calcaire précipite&nbsp;? Au dixième de mg.',lab:'m =',unit:'mg',ans:99.7,tol:.1,hint:'Si x mol/L précipitent : (2,0·10⁻³ − x)(1,0·10⁻³ − x) = K<sub>s</sub>. Les carbonates sont presque tous consommés.',why:'Presque tout le carbonate part : x ≈ 1,0·10⁻³ − K<sub>s</sub>/(1,0·10⁻³) = 0,9966·10⁻³ mol, soit 99,7 mg. Il reste [Ca²⁺] ≈ 1,0·10⁻³ mol/L.'},
  ],
  sol:'Dans l’eau pure, s = √K<sub>s</sub> ≈ 5,8·10⁻⁵ mol/L : à peine <b>5,8 mg</b> de calcaire par litre.<br>Dans l’eau dure, le calcium est déjà présent : il suffit de [CO₃²⁻] = K<sub>s</sub>/[Ca²⁺] = <b>1,7·10⁻⁶ mol/L</b> pour précipiter (effet d’ion commun).<br>Après le mélange, Q = 1,98·10⁻³ × 1,0·10⁻⁴ ≈ 2·10⁻⁷ &gt; K<sub>s</sub> : <b>précipité</b>.<br>Pour l’adoucissement, (2,0·10⁻³ − x)(1,0·10⁻³ − x) = 3,4·10⁻⁹. La racine physique est x ≈ 9,966·10⁻⁴ mol/L, soit <b>99,7 mg</b> de CaCO₃ par litre : le carbonate ajouté est presque entièrement consommé et la dureté est divisée par deux.'},
]},

/* ================= 7. ACIDES ET BASES ================= */
{subj:'chi', sem:'pri', id:'chi-acides', h:'Acides et bases', p:'pH, pKa, acides forts et faibles, titrages et solutions tampons.', steps:[
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
 {kind:'Problème',h:'Le titrage d’un vinaigre',
  p:'On veut mesurer l’acidité d’un vinaigre (acide acétique CH₃COOH, pKa = 4,76). On le dilue d’abord <b>10 fois</b>. On titre ensuite <b>10,0 mL</b> du vinaigre dilué par de la soude à <b>0,100 mol/L</b> : l’équivalence est atteinte pour <b>14,0 mL</b>. Réaction : CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O. Donnée : M(CH₃COOH) = 60 g/mol.',
  parts:[
   {q:'a) Quelle est la concentration du vinaigre dilué&nbsp;? Au centième.',lab:'c =',unit:'mol/L',ans:.14,tol:.001,hint:'À l’équivalence, n(acide) = n(OH⁻ versé).',why:'n = 0,100 × 0,0140 = 1,40·10⁻³ mol dans 10,0 mL : c = 1,40·10⁻³ / 0,0100 = 0,140 mol/L.'},
   {q:'b) Quelle masse d’acide acétique contient un litre de vinaigre pur&nbsp;?',lab:'m =',unit:'g/L',ans:84,tol:.2,hint:'N’oublie pas la dilution d’un facteur 10.',why:'Vinaigre pur : c = 1,40 mol/L, soit 1,40 × 60 = 84 g/L.'},
   {q:'c) Quel est le pH du mélange après ajout de 7,0 mL de soude&nbsp;? Au centième.',lab:'pH =',ans:4.76,tol:.01,hint:'7,0 mL, c’est la moitié du volume équivalent.',why:'À la demi-équivalence, la moitié de l’acide est devenue CH₃COO⁻ : [A⁻] = [HA] et pH = pKa = 4,76.'},
   {q:'d) Quel indicateur coloré choisir pour repérer l’équivalence&nbsp;?',opts:['L’hélianthine (virage 3,1 à 4,4), car le vinaigre est acide','Le bleu de bromothymol (virage 6,0 à 7,6), car l’équivalence est à pH 7','La phénolphtaléine (virage 8,2 à 10), car à l’équivalence la solution d’acétate est basique','N’importe lequel, le saut de pH est assez grand'],ans:2,hint:'Quelle espèce reste en solution à l’équivalence, et est-elle acide, neutre ou basique&nbsp;?',why:'À l’équivalence, il ne reste que de l’acétate, une base faible : le pH vaut environ 8,8. La zone de virage de la phénolphtaléine tombe dans le saut.'},
  ],
  sol:'À l’équivalence, n(CH₃COOH) = n(OH⁻) = 0,100 × 14,0·10⁻³ = 1,40·10⁻³ mol, contenus dans 10,0 mL : <b>c = 0,140 mol/L</b> pour le vinaigre dilué.<br>Le vinaigre pur est 10 fois plus concentré, 1,40 mol/L, soit 1,40 × 60 = <b>84 g/L</b> d’acide acétique (environ 8 % en masse, un vinaigre fort).<br>À 7,0 mL, on est à la demi-équivalence : <b>pH = pKa = 4,76</b>.<br>À l’équivalence, la solution contient la base faible CH₃COO⁻, pH ≈ 8,8 : on choisit la <b>phénolphtaléine</b>.'},
 {kind:'Problème',h:'Le tampon du sang',
  p:'Le pH du sang est maintenu près de 7,40 par le couple <b>CO₂ / HCO₃⁻</b> (CO₂ + H₂O ⇌ HCO₃⁻ + H⁺), de pKa = 6,1 à 37 °C. Dans un sang normal, [HCO₃⁻] = 24 mmol/L et [CO₂] = 1,2 mmol/L. Pendant un effort intense, les muscles libèrent de l’acide lactique, qu’on traite comme un acide fort apportant <b>3,0 mmol/L</b> de H⁺.',
  parts:[
   {q:'a) Vérifie le pH du sang normal, au centième.',lab:'pH =',ans:7.4,tol:.01,hint:'Henderson-Hasselbalch : pH = pKa + log([HCO₃⁻]/[CO₂]).',why:'pH = 6,1 + log(24/1,2) = 6,1 + log 20 = 6,1 + 1,30 = 7,40.'},
   {q:'b) Si le CO₂ formé restait dans le sang (système fermé), quel serait le pH après l’arrivée de l’acide&nbsp;? Au centième.',lab:'pH =',ans:6.8,tol:.01,hint:'Chaque H⁺ transforme un HCO₃⁻ en CO₂.',why:'[HCO₃⁻] = 24 − 3 = 21 et [CO₂] = 1,2 + 3 = 4,2 mmol/L : pH = 6,1 + log 5 ≈ 6,80.'},
   {q:'c) En réalité, la respiration évacue le CO₂ en excès et maintient [CO₂] = 1,2 mmol/L. Quel est alors le pH&nbsp;? Au centième.',lab:'pH =',ans:7.34,tol:.01,hint:'Seul HCO₃⁻ change par rapport à la situation normale.',why:'pH = 6,1 + log(21/1,2) = 6,1 + 1,24 ≈ 7,34 : la baisse est bien plus faible.'},
   {q:'d) Une personne angoissée hyperventile : elle rejette trop de CO₂, dont la concentration tombe à 0,9 mmol/L (HCO₃⁻ reste à 24 mmol/L). Que se passe-t-il&nbsp;?',opts:['Le pH baisse vers 7,2 : acidose','Le pH ne change pas, le tampon compense tout','Le pH monte vers 7,53 : alcalose','Le pH monte au-dessus de 8'],ans:2,hint:'Calcule le nouveau rapport [HCO₃⁻]/[CO₂].',why:'pH = 6,1 + log(24/0,9) = 6,1 + 1,43 ≈ 7,53 : le sang devient trop basique (alcalose respiratoire), d’où vertiges et fourmillements.'},
  ],
  sol:'Le sang normal a pH = 6,1 + log(24/1,2) = <b>7,40</b>.<br>L’acide lactique est neutralisé par HCO₃⁻ : H⁺ + HCO₃⁻ → CO₂. En système fermé, le rapport passe de 20 à 21/4,2 = 5 et le pH tombe à <b>6,80</b>, une valeur mortelle.<br>Les poumons rejettent le CO₂ en excès : [CO₂] reste à 1,2 mmol/L et pH = 6,1 + log(21/1,2) ≈ <b>7,34</b>. Le tampon est efficace parce que l’une de ses deux espèces est un gaz que la respiration régule.<br>À l’inverse, trop expirer de CO₂ fait monter le pH à ≈ <b>7,53</b> : c’est l’alcalose respiratoire.'},
]},

/* ================= 8. CINÉTIQUE ================= */
{subj:'chi', sem:'pri', id:'chi-cinetique', h:'Cinétique chimique', p:'Vitesse de réaction, lois de vitesse, demi-vie et loi d’Arrhenius.', steps:[
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
 {kind:'Problème',h:'La datation au carbone 14',
  p:'Un être vivant échange du carbone avec l’atmosphère : son carbone a une activité de <b>0,250 Bq par gramme</b>, due au ¹⁴C. À sa mort, les échanges cessent et le ¹⁴C se désintègre selon une cinétique d’ordre 1, de demi-vie <b>t<sub>½</sub> = 5730 ans</b>. Un os retrouvé dans une grotte a une activité de <b>0,080 Bq par gramme</b> de carbone. L’activité est proportionnelle au nombre de noyaux de ¹⁴C.',
  fig:(()=>{ const P=plane({x:[0,25],y:[0,1.1],w:320,h:180,grid:false,lx:5}); P.fn(t=>0.5**(t/5.73),{from:0,to:25});
    P.seg(0,0.32,9.42,0.32,{c:'var(--spark)',w:1.5,dash:true}).seg(9.42,0,9.42,0.32,{c:'var(--spark)',w:1.5,dash:true}).dot(9.42,0.32,{c:'var(--ink)',l:'os'});
    P.text(24.8,0.1,'t (milliers d’années)',{a:'end',s:11,c:'var(--muted)'}).text(0.4,1.02,'A / A₀',{s:11,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) Calcule la constante de désintégration k, en 10⁻⁴ an⁻¹, au centième.',lab:'k =',unit:'·10⁻⁴ an⁻¹',ans:1.21,tol:.01,hint:'Ordre 1 : t<sub>½</sub> = ln 2 / k.',why:'k = 0,693 / 5730 ≈ 1,21·10⁻⁴ an⁻¹.'},
   {q:'b) Quelle fraction de l’activité initiale reste-t-il dans l’os&nbsp;? En %.',lab:'A/A₀ =',unit:'%',ans:32,tol:.1,hint:'Divise l’activité mesurée par celle d’un être vivant.',why:'0,080 / 0,250 = 0,32, soit 32 %.'},
   {q:'c) Quel est l’âge de l’os&nbsp;? À la centaine d’années près.',lab:'t =',unit:'ans',ans:9400,tol:60,hint:'A = A₀·e<sup>−kt</sup>, donc t = ln(A₀/A) / k.',why:'t = ln(1/0,32) / 1,21·10⁻⁴ = 1,139 / 1,2097·10⁻⁴ ≈ 9420 ans, soit environ 9400 ans.'},
   {q:'d) Pourquoi la méthode ne permet-elle pas de dater un fossile de dinosaure (65 millions d’années)&nbsp;?',opts:['Parce que les dinosaures ne contenaient pas de carbone','Parce qu’après plus de 10 000 demi-vies il ne reste plus aucun ¹⁴C mesurable','Parce que la demi-vie du ¹⁴C change avec le temps','Parce que la cinétique devient d’ordre 2 pour les vieux échantillons'],ans:1,hint:'Combien de demi-vies représentent 65 millions d’années&nbsp;?',why:'65·10⁶ / 5730 ≈ 11 000 demi-vies : la fraction restante est 2<sup>−11 000</sup>, rigoureusement nulle en pratique. Au-delà d’environ 50 000 ans (moins de 0,2 %), la mesure n’est plus fiable.'},
  ],
  sol:'La désintégration est d’ordre 1 : <b>k = ln 2 / t<sub>½</sub> ≈ 1,21·10⁻⁴ an⁻¹</b>.<br>L’os a gardé A/A₀ = 0,080/0,250 = <b>32 %</b> de son activité, soit entre une et deux demi-vies (50 % et 25 %).<br>De A = A₀·e<sup>−kt</sup> on tire t = ln(A₀/A)/k = ln(3,125) / 1,2097·10⁻⁴ ≈ <b>9400 ans</b>.<br>La méthode ne sert que jusqu’à quelques dizaines de milliers d’années : pour les dinosaures, il faut des isotopes de demi-vie bien plus longue (potassium 40, uranium 238).'},
 {kind:'Problème',h:'Le lait au réfrigérateur',
  p:'Un lait entamé tourne au bout de <b>3 jours</b> à 20 °C (293 K) et de <b>12 jours</b> au réfrigérateur à 5 °C (278 K). On suppose que la durée de conservation est inversement proportionnelle à la constante de vitesse k du développement des bactéries, et que k suit la loi d’Arrhenius k = A·e<sup>−E<sub>a</sub>/RT</sup>. Donnée : R = 8,314 J/(mol·K).',
  parts:[
   {q:'a) Que vaut le rapport k(293 K) / k(278 K)&nbsp;?',lab:'rapport :',ans:4,tol:.01,hint:'Si la durée est divisée par un facteur, la vitesse est multipliée par ce même facteur.',why:'La durée passe de 12 à 3 jours : k est multipliée par 12/3 = 4.'},
   {q:'b) Déduis-en l’énergie d’activation, au dixième de kJ/mol.',lab:'E<sub>a</sub> =',unit:'kJ/mol',ans:62.6,tol:.1,hint:'ln(k₂/k₁) = (E<sub>a</sub>/R)·(1/T₁ − 1/T₂).',why:'E<sub>a</sub> = R ln 4 / (1/278 − 1/293) = 8,314 × 1,386 / 1,842·10⁻⁴ ≈ 62 600 J/mol = 62,6 kJ/mol.'},
   {q:'c) Combien d’heures le lait tient-il par une journée de canicule à 30 °C (303 K)&nbsp;? À l’heure près.',lab:'durée :',unit:'h',ans:31,tol:.6,hint:'Calcule k(303)/k(293) avec E<sub>a</sub>, puis divise 72 h par ce facteur.',why:'k(303)/k(293) = exp[(62 587/8,314)(1/293 − 1/303)] = exp(0,848) ≈ 2,33. Durée = 72 / 2,33 ≈ 31 h.'},
   {q:'d) Et dans un réfrigérateur mieux réglé à 0 °C (273 K)&nbsp;? Au jour près.',lab:'durée :',unit:'jours',ans:20,tol:.6,hint:'Même méthode en partant des 3 jours à 293 K, avec 1/273 − 1/293.',why:'k(293)/k(273) = exp[7528 × (1/273 − 1/293)] = exp(1,882) ≈ 6,57. Durée ≈ 3 × 6,57 ≈ 20 jours.'},
  ],
  sol:'La durée de conservation varie comme 1/k : passer de 12 à 3 jours signifie <b>k multiplié par 4</b> entre 278 K et 293 K.<br>Arrhenius donne ln 4 = (E<sub>a</sub>/R)(1/278 − 1/293), d’où <b>E<sub>a</sub> ≈ 62,6 kJ/mol</b>.<br>À 303 K : k est multipliée par exp(7528 × 1,126·10⁻⁴) ≈ 2,33 par rapport à 293 K, le lait tient 72/2,33 ≈ <b>31 h</b>.<br>À 273 K : k est divisée par exp(7528 × 2,50·10⁻⁴) ≈ 6,57, le lait tient ≈ <b>20 jours</b>.<br>Quelques degrés comptent beaucoup : c’est l’exponentielle d’Arrhenius qui fait l’efficacité du froid. Le modèle reste approché, la croissance bactérienne ne suit Arrhenius que sur un domaine limité.'},
]},
);
})();
