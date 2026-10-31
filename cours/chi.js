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
 {kind:'Théorie',h:'L’électron, une onde autour du noyau',p:`<p>Un atome, c’est un noyau minuscule, chargé positivement, et des électrons retenus autour de lui par l’attraction électrique. On aimerait dire « l’électron tourne sur une orbite », mais ce modèle échoue : un électron en orbite rayonnerait et tomberait sur le noyau en une fraction de seconde, et il ne produirait pas les raies de lumière bien séparées qu’on observe.</p>
<div class="def"><p>Une <b>orbitale</b> est une région de l’espace où la probabilité de trouver l’électron est grande (on prend souvent 90 %). Elle est décrite par une fonction d’onde ψ ; |ψ|² donne la densité de probabilité de présence.</p></div>
<div class="idea"><p>L’électron se comporte comme une onde stationnaire, un peu comme la corde d’une guitare : une corde fixée aux deux bouts ne peut vibrer qu’avec un nombre entier de ventres. De même, autour du noyau, seules certaines ondes « tiennent », et chacune a une énergie précise. Les énergies sont donc <b>quantifiées</b> : l’électron ne peut pas avoir n’importe quelle énergie.</p></div>
<div class="ex"><p>Dans l’hydrogène, l’orbitale la plus basse (1s) est une sphère de rayon typique 0,053 nm ; son énergie vaut −13,6 eV. L’orbitale suivante (2s) est quatre fois plus large, 0,21 nm, et son énergie n’est plus que −3,4 eV. Entre les deux, rien : aucune énergie intermédiaire n’est permise.</p></div>
<div class="warn"><p>Une orbitale n’est pas une trajectoire. Un électron 1s ne tourne pas sur un cercle de 0,053 nm : il a simplement de fortes chances de se trouver à cette distance du noyau.</p></div>`,
  fig:(()=>{ const P=plane({x:[-5,5],y:[-3.2,3],h:180,grid:false,axes:false});
    P.circ(0,0,2.6,{c:'var(--sci)',w:1.5,fill:'var(--sci)',fo:.12}).circ(0,0,0.65,{c:'var(--accent)',w:1.5,fill:'var(--accent)',fo:.35});
    P.dot(0,0,{c:'var(--bad)',r:5}); P.text(0.9,0.4,'1s',{s:12,c:'var(--accent)'}).text(2.0,2.1,'2s',{s:12,c:'var(--sci)'});
    P.text(0,-2.95,'zones où l’électron a 90 % de chances d’être',{a:'middle',s:11,c:'var(--muted)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Quatre nombres quantiques',p:`<p>Comment désigner chaque orbitale et chaque électron sans ambiguïté&nbsp;? La résolution de l’équation d’onde impose à chaque état trois entiers, et le spin en ajoute un quatrième.</p>
<div class="def"><p>Chaque électron d’un atome est repéré par quatre <b>nombres quantiques</b> :</p><ul><li><b>n</b> = 1, 2, 3… la <b>couche</b> : il fixe l’énergie et la taille de l’orbitale ;</li><li><b>ℓ</b>, avec 0 ≤ ℓ ≤ n − 1, la <b>sous-couche</b> : il fixe la forme (ℓ = 0, 1, 2, 3 se lisent s, p, d, f) ;</li><li><b>m<sub>ℓ</sub></b>, avec −ℓ ≤ m<sub>ℓ</sub> ≤ ℓ, l’<b>orbitale</b> : son orientation dans l’espace ;</li><li><b>m<sub>s</sub></b> = +½ ou −½, le <b>spin</b>, noté ↑ ou ↓.</li></ul></div>
<div class="idea"><p>Ces nombres s’emboîtent comme des poupées russes. La couche n contient n sous-couches (ℓ de 0 à n − 1), la sous-couche ℓ contient 2ℓ + 1 orbitales, et chaque orbitale accepte deux électrons de spins opposés. Au total, la couche n contient n² orbitales et au plus 2n² électrons.</p></div>
<div class="ex"><p>n = 2 : ℓ vaut 0 (une orbitale 2s, m<sub>ℓ</sub> = 0) ou 1 (trois orbitales 2p, m<sub>ℓ</sub> = −1, 0, 1). Cela fait 4 orbitales et 8 électrons au maximum : exactement le nombre d’éléments de la deuxième période, du lithium au néon.</p></div>
<div class="warn"><p>Les bornes sont strictes : ℓ = 2 exige n ≥ 3. Il n’existe donc ni sous-couche 2d ni sous-couche 3f.</p></div>
<p>Change <i>n</i> pour voir les orbitales disponibles.</p>`,
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
 {kind:'Théorie',h:'Remplir les orbitales',p:`<p>Un atome à Z électrons les range dans ses orbitales comme on remplit un immeuble en commençant par le bas : l’état fondamental est celui d’énergie minimale. Trois règles suffisent.</p>
<div class="def"><p><b>Pauli</b> : au plus deux électrons par orbitale, de spins opposés. <b>Aufbau</b> : on remplit les sous-couches par énergie croissante, dans l’ordre 1s 2s 2p 3s 3p 4s 3d 4p (règle de Klechkowski : n + ℓ croissant, puis n croissant). <b>Hund</b> : dans une sous-couche, les électrons occupent d’abord chaque orbitale seuls, avec des spins parallèles, avant de s’apparier.</p></div>
<div class="why"><p>L’ordre d’énergie vient de l’<b>écrantage</b> : dans un atome à plusieurs électrons, un électron 3d, qui reste loin du noyau, est masqué par les électrons internes et voit une charge réduite ; un électron 4s, dont l’onde pénètre près du noyau, est mieux retenu. Voilà pourquoi 4s se remplit avant 3d. La règle de Hund s’explique par la répulsion : deux électrons dans la même orbitale sont proches et se repoussent, alors que deux électrons de même spin dans des orbitales différentes se tiennent naturellement à distance.</p></div>
<div class="ex"><p>Carbone, Z = 6 : 1s² 2s² 2p². Les deux électrons 2p vont dans deux cases différentes, spins parallèles : [↑][↑][ ], soit 2 électrons célibataires. Azote, Z = 7 : [↑][↑][↑], 3 célibataires. Oxygène, Z = 8 : le quatrième électron p doit s’apparier, [↑↓][↑][↑], il reste 2 célibataires.</p></div>
<p>Fais varier <i>Z</i> et vérifie l’ordre de remplissage.</p>`,
  params:[{id:'z',l:'Z',min:1,max:36,v:6}],
  draw:v=>orbDraw(v.z),
  info:v=>`<b>${SYM[v.z]}</b> (Z = ${v.z}) : ${confStr(v.z)} · ${unpaired(v.z)} électron${unpaired(v.z)>1?'s':''} célibataire${unpaired(v.z)>1?'s':''}`,
  note:'<b>Exceptions :</b> le chrome (Z = 24) et le cuivre (Z = 29) prennent un électron 4s pour obtenir une sous-couche 3d à moitié ou entièrement remplie : 4s¹ 3d⁵ et 4s¹ 3d¹⁰.'},
 {kind:'Théorie',h:'Cœur, valence et blocs du tableau',p:`<p>Pourquoi le sodium et le potassium se ressemblent-ils autant, alors qu’ils n’ont pas le même nombre d’électrons&nbsp;? Parce que la chimie ne voit que les électrons les plus externes.</p>
<div class="def"><p>Les <b>électrons de valence</b> sont ceux de la couche de plus grand n (plus les électrons d en cours de remplissage pour les métaux de transition). Les autres forment le <b>cœur</b>, qu’on abrège par le gaz noble précédent entre crochets : [Ne] pour 1s² 2s² 2p⁶.</p></div>
<div class="idea"><p>Le tableau périodique est la configuration électronique mise en tableau. La <b>période</b> (ligne) est la valeur de n de la couche externe ; la <b>colonne</b> compte les électrons de valence. Les deux premières colonnes remplissent une sous-couche s (bloc s), les six dernières une sous-couche p (bloc p), les dix du milieu une sous-couche d (bloc d). Deux éléments d’une même colonne ont la même configuration externe, donc des propriétés voisines.</p></div>
<div class="ex"><p>Na : [Ne] 3s¹, K : [Ar] 4s¹. Tous deux ont un seul électron de valence sur une sous-couche s : colonne 1, et tous deux forment un ion +1. Cl : [Ne] 3s² 3p⁵ a 7 électrons de valence, colonne 17, et complète son octet en gagnant un électron : Cl⁻.</p></div>
<div class="warn"><p>Le cœur n’est pas inerte en tout : il écrante le noyau. Mais il ne participe pas aux liaisons, et il faut une énergie énorme pour lui arracher un électron, ce qui se voit dans les énergies d’ionisation successives.</p></div>`,
  fig:(()=>{ const P=plane({x:[-0.2,18.2],y:[-0.3,5],h:140,grid:false,axes:false});
    for(let r=0;r<4;r++) for(let c=0;c<18;c++){ const per=r+1; if(per===1&&c>0&&c<17) continue; if((per===2||per===3)&&c>=2&&c<12) continue;
      const blk=per===1?'s':c<2?'s':c<12?'d':'p'; P.rect(c,3.5-r,0.92,0.88,{fill:blk==='s'?'var(--accent)':blk==='d'?'var(--muted)':'var(--sci)',fo:.5,c:null}); }
    P.text(1,4.55,'bloc s',{a:'middle',s:11,c:'var(--accent)'}).text(7,4.55,'bloc d',{a:'middle',s:11,c:'var(--muted)'}).text(15,4.55,'bloc p',{a:'middle',s:11,c:'var(--sci)'});
    P.text(18.1,-0.1,'périodes 1 à 4',{a:'end',s:10,c:'var(--muted)'}); return P.svg(); })()},
 {kind:'Méthode',h:'Écrire une configuration électronique',p:`<b>Quand :</b> on te donne Z (ou un élément) et on te demande sa configuration, ses électrons de valence, ses électrons célibataires ou sa place dans le tableau. <b>Pourquoi ça marche :</b> les électrons occupent les sous-couches de plus basse énergie d’abord (Aufbau), au plus 2 par orbitale (Pauli), seuls dans les cases tant que c’est possible (Hund). <b>Comment :</b><ol><li>Écris Z électrons en suivant l’ordre 1s 2s 2p 3s 3p 4s 3d 4p ; capacités s : 2, p : 6, d : 10.</li><li>Vérifie que la somme des exposants vaut Z.</li><li>Abrège avec le gaz noble précédent entre crochets : [He], [Ne], [Ar].</li><li>Lis le tableau : la <b>période</b> est le plus grand n ; les <b>électrons de valence</b> sont ceux de la couche n la plus haute (plus les d en cours de remplissage pour les métaux de transition).</li><li>Pour les célibataires, dessine les cases de la dernière sous-couche et remplis-les une par une avant d’apparier.</li></ol>`,
  demo:{enonce:'Écris la configuration du phosphore P (Z = 15), puis donne sa période, ses électrons de valence et ses électrons célibataires.',
   etapes:[{f:'1s² 2s² 2p⁶ 3s² 3p³',w:'On suit l’ordre de remplissage : 2 + 2 + 6 + 2 = 12, il reste 3 électrons pour 3p.'},
    {f:'2 + 2 + 6 + 2 + 3 = 15 ✓',w:'La somme des exposants doit redonner Z, sinon on a sauté ou doublé une sous-couche.'},
    {f:'[Ne] 3s² 3p³',w:'Le cœur 1s² 2s² 2p⁶ est la configuration du néon : on l’abrège.'},
    {f:'période 3 · 2 + 3 = 5 électrons de valence',w:'Le plus grand n vaut 3. La couche n = 3 contient 3s² et 3p³.'},
    {f:'3p : [↑] [↑] [↑] → 3 célibataires',w:'Hund : les 3 électrons p occupent chacun une case avec des spins parallèles avant de s’apparier.'}],
   conclusion:'P = [Ne] 3s² 3p³ : période 3, 5 électrons de valence (colonne 15), 3 électrons célibataires.'},
  note:'Le nombre d’électrons de valence d’un élément des blocs s et p donne sa colonne : 1 ou 2 pour s, 10 + (s + p) pour p (13 à 18).'},
 {kind:'Pratique',h:'Trouve l’élément',p:'Règle <i>Z</i> pour obtenir l’atome dont la configuration se termine par <b>3p⁴</b>.',
  params:[{id:'z',l:'Z',min:1,max:36,v:1}],
  draw:v=>orbDraw(v.z), info:v=>`<b>${SYM[v.z]}</b> : ${confStr(v.z)}`,
  ok:v=>v.z===16,why:'1s² 2s² 2p⁶ 3s² 3p⁴ compte 2 + 2 + 6 + 2 + 4 = 16 électrons : c’est le soufre S.'},
 {h:'Règle de Hund',p:'Le fer a pour configuration [Ar] 4s² 3d⁶. Combien d’électrons célibataires possède-t-il&nbsp;?',lab:'électrons célibataires :',ans:4,
  why:'Les 5 cases 3d reçoivent d’abord un électron chacune (5 spins parallèles), puis le 6e s’apparie dans la première case : il reste 4 électrons seuls.'},
 {kind:'Méthode',h:'Configurations des ions et exceptions',p:`<b>Quand :</b> on te demande la configuration d’un ion, ou celle du chrome et du cuivre. <b>Pourquoi :</b> un ion a simplement plus ou moins d’électrons que l’atome ; mais une fois la 3d occupée, la 4s est la couche la plus externe, c’est donc elle qui perd ses électrons en premier. <b>Comment :</b><ol><li>Écris la configuration de l’atome neutre.</li><li><b>Anion</b> X<sup>n−</sup> : ajoute n électrons à la suite (Cl⁻ : [Ne] 3s² 3p⁶ = [Ar]).</li><li><b>Cation</b> X<sup>n+</sup> : retire n électrons de la couche de plus grand n d’abord, donc <b>4s avant 3d</b>.</li><li>Exceptions à connaître : Cr = [Ar] 4s¹ 3d⁵ et Cu = [Ar] 4s¹ 3d¹⁰, car une sous-couche d à moitié ou entièrement remplie est plus stable.</li></ol>`,
  demo:{enonce:'Écris la configuration de l’ion Fe³⁺ (Z = 26) et compte ses électrons célibataires.',
   etapes:[{f:'Fe : [Ar] 4s² 3d⁶',w:'18 électrons dans le cœur [Ar], puis 4s² et les 6 derniers en 3d : 18 + 2 + 6 = 26.'},
    {f:'Fe²⁺ : [Ar] 3d⁶',w:'Les deux premiers électrons partent de 4s, la couche n = 4 étant la plus externe.'},
    {f:'Fe³⁺ : [Ar] 3d⁵',w:'Le troisième électron sort ensuite de 3d : il reste 26 − 3 = 23 électrons.'},
    {f:'3d : [↑] [↑] [↑] [↑] [↑] → 5 célibataires',w:'Cinq électrons dans cinq cases : chacun reste seul (Hund).'}],
   conclusion:'Fe³⁺ = [Ar] 3d⁵, avec 5 électrons célibataires. Sa sous-couche à moitié pleine explique sa grande stabilité.'},
  note:'Piège classique : écrire Fe²⁺ = [Ar] 4s² 3d⁴. C’est faux, les électrons 4s partent toujours les premiers.'},
 {h:'L’ion cuivre(II)',p:'Le cuivre (Z = 29) forme l’ion Cu²⁺. Combien d’électrons célibataires possède cet ion&nbsp;?',lab:'électrons célibataires :',ans:1,
  why:'Cu = [Ar] 4s¹ 3d¹⁰ (exception). Cu²⁺ perd l’électron 4s puis un électron 3d : [Ar] 3d⁹, soit 4 cases pleines et 1 case avec un seul électron.'},
 {kind:'Théorie',h:'La charge nucléaire effective',p:`<p>Un électron de valence ne ressent pas toute la charge +Z du noyau : les électrons situés entre lui et le noyau le repoussent, et masquent en partie l’attraction. C’est la clé de toutes les tendances du tableau.</p>
<div class="def"><p>La <b>charge nucléaire effective</b> vue par un électron est <b>Z<sub>eff</sub> = Z − σ</b>, où σ est la constante d’<b>écrantage</b> : à peu près le nombre d’électrons plus proches du noyau que lui (un électron de cœur écrante presque entièrement, un électron de la même couche seulement un tiers environ).</p></div>
<div class="why"><p>Le long d’une période, chaque élément ajoute un proton au noyau et un électron dans la <b>même couche</b>. Le proton compte pour +1 dans Z<sub>eff</sub>, le nouvel électron n’écrante qu’environ 0,35 : Z<sub>eff</sub> augmente donc de gauche à droite, les électrons externes sont plus attirés, l’atome se contracte et il est plus difficile de lui arracher un électron. En descendant une colonne, Z<sub>eff</sub> change peu, mais la couche externe a un n plus grand : elle est plus loin, donc moins liée.</p></div>
<div class="ex"><p>Lithium, Z = 3 : l’électron 2s est écranté par deux électrons 1s (σ ≈ 1,7), Z<sub>eff</sub> ≈ 1,3. Fluor, Z = 9 : un électron 2p est écranté par 2 électrons 1s et 6 autres électrons de la couche 2 (σ ≈ 1,7 + 2,1 = 3,8), Z<sub>eff</sub> ≈ 5,2. Quatre fois plus de charge effective : le fluor est bien plus petit (rayon 0,06 nm contre 0,13 nm) et bien plus avide d’électrons.</p></div>`,
  fig:(()=>{ const P=plane({x:[-5,5],y:[-3,3],h:170,grid:false,axes:false});
    P.circ(0,0,2.5,{c:'var(--muted)',w:1.5,dash:true}); P.circ(0,0,1,{c:'var(--sci)',w:1.5,fill:'var(--sci)',fo:.25});
    P.dot(0,0,{c:'var(--bad)',r:9}); P.text(0,0,'+Z',{a:'middle',dy:4,s:10,c:'var(--surface)'});
    P.dot(0.7,0.7,{c:'var(--sci)',r:4}).dot(-0.7,-0.7,{c:'var(--sci)',r:4}); P.dot(2.5,0,{c:'var(--accent)',r:6});
    P.text(2.7,0.3,'électron externe : voit Z − σ',{s:11}); P.text(-0.4,1.3,'cœur : écran σ',{a:'end',s:11,c:'var(--sci)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Tendances du tableau',p:`<p>Avec la charge effective en main, on peut lire le tableau périodique comme une carte des propriétés. Trois grandeurs reviennent partout.</p>
<div class="def"><p>L’<b>énergie de première ionisation</b> E<sub>i</sub> est l’énergie minimale pour arracher un électron à l’atome gazeux : X → X⁺ + e⁻. Le <b>rayon atomique</b> est la taille du nuage externe. L’<b>électronégativité</b> χ (échelle de Pauling, sans unité, de 0,7 à 4,0) mesure la tendance d’un atome engagé dans une liaison à attirer les électrons de cette liaison.</p></div>
<div class="prop"><p>Sur une période, de gauche à droite : E<sub>i</sub> et χ <b>augmentent</b>, le rayon <b>diminue</b>. Dans une colonne, de haut en bas : E<sub>i</sub> et χ <b>diminuent</b>, le rayon <b>augmente</b>.</p></div>
<div class="why"><p>C’est Z<sub>eff</sub> qui parle : vers la droite, un électron externe plus attiré est plus proche du noyau (rayon plus petit) et plus difficile à arracher (E<sub>i</sub> plus grande) ; un atome qui retient fort ses propres électrons attire aussi ceux d’une liaison (χ plus grande). Vers le bas, la couche externe s’éloigne : tout s’inverse. Les gaz nobles, à couche complète, ont les E<sub>i</sub> les plus élevées de leur période.</p></div>
<div class="ex"><p>Période 3 : Na 5,14 eV, Mg 7,65 eV, Al 5,99 eV, Si 8,15 eV, P 10,49 eV, S 10,36 eV, Cl 12,97 eV, Ar 15,76 eV. La montée est nette, avec deux petites chutes (Al, S) expliquées dans la note.</p></div>
<p>Déplace <i>Z</i> sur la figure.</p>`,
  params:[{id:'z',l:'Z',min:1,max:18,v:3}],
  draw:v=>{ const P=plane({x:[0,19],y:[0,27],h:220,grid:false,lx:2,ly:5});
    for(let z=1;z<=18;z++) P.rect(z-0.4,0,0.8,IE[z],{fill:z===v.z?'var(--spark)':([2,10,18].includes(z)?'var(--sci)':'var(--ok)'),fo:z===v.z?.9:.5,c:null});
    P.text(18.8,25.5,'E (eV)',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>`<b>${SYM[v.z]}</b> : ${confStr(v.z)} · E<sub>i</sub> = ${fmt(IE[v.z])} eV · χ = ${CHI[v.z]}`,
  note:'Les petites chutes au bore et à l’aluminium (premier électron p, plus haut en énergie que les s) et à l’oxygène et au soufre (quatrième électron p, qui s’apparie et subit une répulsion) viennent de la configuration.'},
 {kind:'Méthode',h:'Comparer deux atomes avec les tendances',p:`<b>Quand :</b> on te demande de classer des atomes par rayon, énergie d’ionisation ou électronégativité. <b>Pourquoi :</b> descendre d’une période ajoute une couche, donc les électrons externes sont plus loin du noyau ; avancer vers la droite ajoute des protons dans la même couche, donc ils sont plus attirés. <b>Comment :</b><ol><li>Place chaque atome : période (plus grand n) et colonne.</li><li>Rayon : il <b>augmente vers le bas</b> et <b>vers la gauche</b>.</li><li>Énergie d’ionisation et électronégativité : l’inverse, elles augmentent <b>vers le haut</b> et <b>vers la droite</b>.</li><li>Si deux atomes diffèrent à la fois de période et de colonne dans des sens opposés, la tendance ne tranche pas toujours : consulte les valeurs.</li></ol>`,
  demo:{enonce:'Classe Mg, Ca et S par rayon atomique décroissant.',
   etapes:[{f:'Mg : période 3, colonne 2 · S : période 3, colonne 16 · Ca : période 4, colonne 2',w:'On situe d’abord chaque atome à partir de sa configuration : Mg [Ne] 3s², S [Ne] 3s² 3p⁴, Ca [Ar] 4s².'},
    {f:'r(Mg) &gt; r(S)',w:'Même période : S a 4 protons de plus pour la même couche n = 3, ses électrons sont plus attirés.'},
    {f:'r(Ca) &gt; r(Mg)',w:'Même colonne : Ca a une couche de plus, ses électrons externes sont plus loin.'}],
   conclusion:'r(Ca) &gt; r(Mg) &gt; r(S). Pour l’énergie d’ionisation, l’ordre serait inversé : S &gt; Mg &gt; Ca.'}},
 {h:'Rayon atomique',p:'Lequel de ces atomes a le plus grand rayon&nbsp;?',opts:['F','Na','K','Cl'],ans:2,
  why:'Le rayon augmente en descendant une colonne (une couche de plus) et diminue vers la droite. K est en période 4 à gauche : c’est le plus gros.'},
 {h:'Le plus difficile à ioniser',p:'Lequel de ces atomes a la plus grande énergie de première ionisation&nbsp;?',opts:['Na','K','Mg','Cl'],ans:3,
  why:'L’énergie d’ionisation augmente vers la droite et vers le haut. Na, Mg et Cl sont en période 3 et Cl est le plus à droite ; K est plus bas que Na. Cl l’emporte (12,97 eV).'},
 {kind:'Méthode',h:'Lire les énergies d’ionisation successives',p:`<b>Quand :</b> on te donne E₁, E₂, E₃… d’un même élément et on te demande ses électrons de valence ou l’ion qu’il forme. <b>Pourquoi :</b> chaque électron arraché coûte un peu plus que le précédent (l’ion est plus chargé), mais quand on attaque une <b>couche interne</b>, plus proche du noyau, le coût fait un bond. <b>Comment :</b><ol><li>Calcule les rapports successifs E₂/E₁, E₃/E₂, E₄/E₃…</li><li>Repère le rapport nettement plus grand que les autres (souvent 4 à 10, contre 1,3 à 3).</li><li>Si le saut a lieu entre E<sub>k</sub> et E<sub>k+1</sub>, l’élément a <b>k électrons de valence</b> et forme facilement l’ion X<sup>k+</sup>.</li></ol>`,
  demo:{enonce:'Un élément de la 3e période a E₁ = 578, E₂ = 1817, E₃ = 2745 et E₄ = 11 577 kJ/mol. Identifie-le.',
   etapes:[{f:'E₂/E₁ ≈ 3,1 · E₃/E₂ ≈ 1,5 · E₄/E₃ ≈ 4,2',w:'On compare les rapports plutôt que les écarts : un rapport de 4 se repère facilement.'},
    {f:'le saut est entre E₃ et E₄ → 3 électrons de valence',w:'Les trois premiers électrons viennent de la couche n = 3, le quatrième de la couche n = 2, bien plus liée.'},
    {f:'[Ne] 3s² 3p¹ → Z = 13',w:'3e période et 3 électrons de valence : 10 + 3 = 13.'}],
   conclusion:'C’est l’aluminium, qui forme l’ion Al³⁺.'},
  note:'Pour passer de kJ/mol à eV par atome, divise par 96,485 (1 eV par atome = 96,485 kJ/mol).'},
 {h:'Un saut après le premier',p:'Un élément de la 3e période a E₁ = 496, E₂ = 4562, E₃ = 6910 et E₄ = 9543 kJ/mol. Combien d’électrons de valence possède-t-il&nbsp;?',lab:'électrons de valence :',ans:1,
  why:'E₂/E₁ ≈ 9,2 alors que E₃/E₂ ≈ 1,5 et E₄/E₃ ≈ 1,4 : le saut est juste après le 1er électron. C’est le sodium, [Ne] 3s¹, qui forme Na⁺.'},
 {kind:'Théorie',h:'Niveaux d’énergie et photons',p:`<p>Quand on fait passer un courant dans de l’hydrogène, le gaz émet de la lumière, mais pas un arc-en-ciel continu : seulement quelques couleurs très précises, des <b>raies</b>. C’est la quantification rendue visible.</p>
<div class="def"><p>Dans l’atome d’hydrogène, l’électron ne peut occuper que des <b>niveaux d’énergie</b> <b>E<sub>n</sub> = −13,6 eV / n²</b>, n = 1, 2, 3… Le niveau n = 1 est l’<b>état fondamental</b> ; E = 0 correspond à l’électron arraché, à l’infini et au repos. Un <b>photon</b> de longueur d’onde λ transporte l’énergie <b>E = hc/λ</b>, avec hc ≈ 1240 eV·nm.</p></div>
<div class="why"><p>Les énergies sont négatives parce qu’un électron lié a moins d’énergie qu’un électron libre : il faut en fournir pour le détacher. Le facteur 1/n² sort du calcul de l’onde stationnaire (ou du modèle de Bohr) : plus n est grand, plus l’orbitale est large et moins l’électron est retenu. L’atome n’émet ou n’absorbe que lorsque l’électron saute d’un niveau à un autre, et le photon emporte exactement la différence : d’où des raies et non un continu.</p></div>
<div class="ex"><p>Ioniser l’hydrogène depuis l’état fondamental demande 0 − (−13,6) = 13,6 eV, soit un photon de λ = 1240/13,6 ≈ 91 nm (ultraviolet lointain). Pour la transition 2 → 1, ΔE = 13,6 × (1 − 1/4) = 10,2 eV et λ = 1240/10,2 ≈ 122 nm : la raie Lyman α.</p></div>
<div class="warn"><p>L’électronvolt n’est pas une unité SI mais il est commode : 1 eV = 1,602·10⁻¹⁹ J. La constante hc = 1240 eV·nm résume h = 6,63·10⁻³⁴ J·s et c = 3,00·10⁸ m/s en une seule valeur.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[-14.5,1.5],h:200,grid:false,axes:false});
    for(let n=1;n<=5;n++){ const E=-13.6/n/n; P.seg(2,E,8,E,{c:'var(--muted)',w:1.5}); P.text(1.8,E,`n=${n}`,{a:'end',dy:4,s:11}); P.text(8.2,E,`${fmt(E,2)} eV`,{dy:4,s:10,c:'var(--muted)'}); }
    P.seg(2,0,8,0,{c:'var(--ink)',w:1,dash:true}); P.text(8.2,0,'E = 0 : ionisé',{dy:4,s:10});
    P.arrow(4,-13.6,4,0,{c:'var(--spark)',w:3}); P.text(4.2,-7,'13,6 eV',{s:11,c:'var(--spark)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Les raies de l’hydrogène',p:`<p>Mettons les niveaux en mouvement. L’électron, excité par la décharge électrique sur un niveau n<sub>i</sub>, retombe sur un niveau n<sub>f</sub> plus bas et émet un photon.</p>
<div class="prop"><p>Pour une émission de n<sub>i</sub> vers n<sub>f</sub> &lt; n<sub>i</sub> : <b>ΔE = E<sub>i</sub> − E<sub>f</sub> = 13,6 eV × (1/n<sub>f</sub>² − 1/n<sub>i</sub>²)</b> et <b>λ = hc/ΔE = 1240/ΔE</b> (λ en nm, ΔE en eV). Toutes les raies qui aboutissent sur le même n<sub>f</sub> forment une <b>série</b> : Lyman (n<sub>f</sub> = 1, ultraviolet), Balmer (n<sub>f</sub> = 2, visible), Paschen (n<sub>f</sub> = 3, infrarouge).</p></div>
<div class="idea"><p>Sur la figure, les niveaux se resserrent vers le haut : E₁ = −13,6, E₂ = −3,4, E₃ = −1,51, E₄ = −0,85 eV. Un saut vers n = 1 traverse un grand écart (photon ultraviolet, très énergétique), un saut vers n = 2 un écart moyen (visible), vers n = 3 un petit écart (infrarouge). Dans une même série, plus n<sub>i</sub> est grand, plus ΔE se rapproche de la limite 13,6/n<sub>f</sub>² et plus les raies se tassent.</p></div>
<div class="ex"><p>Transition 3 → 2 : ΔE = 13,6 × (1/4 − 1/9) = 13,6 × 0,1389 ≈ 1,89 eV, λ = 1240/1,89 ≈ 656 nm : la raie rouge Hα, la plus brillante du visible. Transition 3 → 1 : ΔE = 13,6 × (1 − 1/9) ≈ 12,09 eV, λ = 1240/12,09 ≈ 103 nm, ultraviolet (Lyman β).</p></div>
<div class="warn"><p>Une absorption suit la même formule en sens inverse : l’atome ne peut absorber que les photons dont l’énergie correspond exactement à un écart entre niveaux. C’est ce qui crée les raies sombres du spectre solaire.</p></div>
<p>Choisis n<sub>i</sub> et n<sub>f</sub> et lis λ.</p>`,
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
 {kind:'Méthode',h:'De la transition à la longueur d’onde',p:`<b>Quand :</b> on connaît les niveaux de départ n<sub>i</sub> et d’arrivée n<sub>f</sub> d’un électron de l’hydrogène et on cherche le photon émis. <b>Pourquoi :</b> l’énergie est conservée, le photon emporte exactement la différence d’énergie entre les deux niveaux. <b>Comment :</b><ol><li>ΔE = E<sub>i</sub> − E<sub>f</sub> = 13,6·(1/n<sub>f</sub>² − 1/n<sub>i</sub>²) en eV, positif pour une émission.</li><li>λ = hc/ΔE = 1240/ΔE en nm.</li><li>Situe λ : moins de 400 nm ultraviolet, 400 à 750 nm visible, au-delà infrarouge.</li></ol>`,
  demo:{enonce:'Quelle est la longueur d’onde émise par la transition n = 3 → n = 2&nbsp;?',
   etapes:[{f:'ΔE = 13,6 × (1/2² − 1/3²) = 13,6 × (0,25 − 0,111) ≈ 1,889 eV',w:'On soustrait l’énergie d’arrivée de celle de départ ; avec E<sub>n</sub> = −13,6/n², cela donne cette forme toujours positive.'},
    {f:'λ = 1240 / 1,889 ≈ 656 nm',w:'hc = 1240 eV·nm permet d’obtenir directement des nanomètres à partir d’électronvolts.'},
    {f:'400 &lt; 656 &lt; 750 → visible (rouge)',w:'On vérifie la vraisemblance : les raies qui finissent sur n = 2 sont visibles ou proches du visible.'}],
   conclusion:'La transition 3 → 2 émet la raie rouge Hα à 656 nm.'},
  note:'Garde au moins 3 chiffres dans ΔE : arrondir trop tôt décale λ de plusieurs nanomètres.'},
 {kind:'Défi',h:'La raie bleu-vert',p:'Calcule la longueur d’onde émise par la transition n = 4 → n = 2 de l’hydrogène (E<sub>n</sub> = −13,6/n² eV, hc = 1240 eV·nm). Arrondis au nm.',lab:'λ =',unit:'nm',ans:486,tol:1,
  why:'ΔE = 13,6·(1/4 − 1/16) = 2,55 eV, donc λ = 1240 / 2,55 ≈ 486 nm.'},
 {kind:'Méthode',h:'Remonter de la raie au niveau de départ',p:`<b>Quand :</b> on mesure une raie λ et on connaît n<sub>f</sub> (par exemple n<sub>f</sub> = 2 pour les raies visibles) ; on cherche n<sub>i</sub>. Même idée pour l’énergie d’ionisation depuis un niveau n. <b>Pourquoi :</b> c’est la méthode précédente lue à l’envers ; ioniser, c’est envoyer l’électron à E = 0 (n → ∞). <b>Comment :</b><ol><li>ΔE = 1240/λ.</li><li>Isole : 1/n<sub>i</sub>² = 1/n<sub>f</sub>² − ΔE/13,6.</li><li>n<sub>i</sub> = 1/√(…) doit tomber sur un entier : sinon, il y a une erreur de calcul ou de n<sub>f</sub>.</li><li>Ionisation depuis n : E = 0 − E<sub>n</sub> = 13,6/n² eV ; c’est aussi l’énergie de la limite de la série qui aboutit à n.</li></ol>`,
  demo:{enonce:'L’hydrogène émet une raie violette à 410 nm qui aboutit à n = 2. De quel niveau part l’électron&nbsp;?',
   etapes:[{f:'ΔE = 1240 / 410 ≈ 3,024 eV',w:'On repasse de la longueur d’onde à l’énergie du photon.'},
    {f:'1/n<sub>i</sub>² = 0,25 − 3,024/13,6 ≈ 0,25 − 0,2224 = 0,0276',w:'On isole 1/n<sub>i</sub>² dans ΔE = 13,6·(1/2² − 1/n<sub>i</sub>²).'},
    {f:'n<sub>i</sub>² ≈ 36,2 → n<sub>i</sub> = 6',w:'L’écart à 36 vient des arrondis de λ ; n est forcément entier.'},
    {f:'vérification : 1240 / (13,6 × (1/4 − 1/36)) ≈ 410 nm ✓',w:'On recalcule λ avec l’entier trouvé pour s’assurer qu’on retombe sur la mesure.'}],
   conclusion:'La raie à 410 nm vient de la transition 6 → 2.'}},
 {h:'Une raie infrarouge',p:'L’hydrogène émet une raie à 1875 nm qui aboutit au niveau n = 3. De quel niveau l’électron est-il parti&nbsp;?',lab:'nᵢ =',ans:4,
  why:'ΔE = 1240/1875 ≈ 0,661 eV, 1/n<sub>i</sub>² = 1/9 − 0,661/13,6 ≈ 0,0625, donc n<sub>i</sub>² = 16 et n<sub>i</sub> = 4.'},
 {h:'Ioniser depuis n = 3',p:'Quelle énergie faut-il pour arracher l’électron d’un atome d’hydrogène excité au niveau n = 3&nbsp;? Au centième d’eV.',lab:'E =',unit:'eV',ans:1.51,tol:.01,
  why:'E = 0 − E₃ = 13,6/9 ≈ 1,51 eV, neuf fois moins que depuis l’état fondamental.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : atomes',p:`<div class="keep"><ul>
<li>Un électron est une onde stationnaire autour du noyau : ses énergies sont <b>quantifiées</b>, une orbitale est une zone de probabilité, pas une trajectoire.</li>
<li>Quatre nombres quantiques : n (couche), ℓ ≤ n − 1 (sous-couche s, p, d, f), m<sub>ℓ</sub> de −ℓ à ℓ (orbitale), m<sub>s</sub> = ±½ (spin). La couche n contient n² orbitales, 2n² électrons.</li>
<li>Remplissage : Pauli (2 par orbitale, spins opposés), Aufbau (1s 2s 2p 3s 3p 4s 3d 4p), Hund (un électron par case avant d’apparier). Exceptions : Cr 4s¹ 3d⁵, Cu 4s¹ 3d¹⁰. Les cations perdent 4s avant 3d.</li>
<li>Période = plus grand n ; électrons de valence = couche externe ; cœur abrégé par le gaz noble entre crochets.</li>
<li>Z<sub>eff</sub> = Z − σ augmente vers la droite : rayon qui diminue, énergie d’ionisation et électronégativité qui augmentent ; l’inverse en descendant une colonne.</li>
<li>Énergies d’ionisation successives : un grand saut après le k-ième électron signale k électrons de valence et l’ion X<sup>k+</sup>. 1 eV par atome = 96,485 kJ/mol.</li>
<li>Hydrogène : E<sub>n</sub> = −13,6/n² eV ; ΔE = 13,6(1/n<sub>f</sub>² − 1/n<sub>i</sub>²) ; λ = 1240/ΔE nm. Lyman n<sub>f</sub> = 1 (UV), Balmer n<sub>f</sub> = 2 (visible), Paschen n<sub>f</sub> = 3 (IR). Ioniser depuis n coûte 13,6/n² eV.</li>
</ul></div>`},
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
 {kind:'Théorie',h:'Pourquoi les atomes se lient',p:`<p>Deux atomes d’hydrogène isolés forment spontanément H₂ en libérant de l’énergie. Pourquoi&nbsp;? Parce qu’à la bonne distance, chaque électron est attiré par <b>deux</b> noyaux au lieu d’un seul.</p>
<div class="def"><p>Une <b>liaison covalente</b> est la mise en commun d’une paire d’électrons (un <b>doublet liant</b>) entre deux atomes. L’<b>énergie de liaison</b> est l’énergie qu’il faut fournir pour la rompre ; la <b>longueur de liaison</b> est la distance d’équilibre entre les noyaux.</p></div>
<div class="why"><p>Quand les atomes se rapprochent, l’attraction des électrons par les deux noyaux fait baisser l’énergie ; trop près, les noyaux se repoussent et l’énergie remonte. Entre les deux, il existe un minimum : c’est la molécule stable. Les atomes partagent des électrons tant que cela remplit leur couche externe (règle de l’<b>octet</b>, 2 électrons pour H) : au-delà, les électrons supplémentaires devraient aller dans des orbitales plus hautes et ne stabilisent plus rien. C’est pourquoi l’hélium, à couche complète, ne forme pas He₂.</p></div>
<div class="ex"><p>H₂ : énergie de liaison 436 kJ/mol, longueur 0,074 nm. Avec 2 électrons partagés, chaque H « voit » la configuration de l’hélium. Dans N₂, trois doublets sont partagés (triple liaison) : 945 kJ/mol et 0,110 nm. Plus une liaison est multiple, plus elle est courte et solide.</p></div>
<div class="warn"><p>Une liaison ne se forme que si elle abaisse l’énergie. Former une liaison <b>libère</b> de l’énergie, la rompre en <b>coûte</b> : ne confonds jamais les deux sens.</p></div>`,
  fig:(()=>{ const P=plane({x:[0.2,4],y:[-1.3,1.2],h:180,grid:false,axes:false}), E=r=>(1-Math.exp(-1.6*(r-1)))**2-1;
    P.seg(0.2,0,4,0,{c:'var(--muted)',w:1,dash:true}); P.fn(E,{from:0.45,to:4}); P.dot(1,-1,{c:'var(--ok)',l:'liaison',dx:-48,dy:14});
    P.text(3.9,0.1,'atomes séparés',{a:'end',s:11,c:'var(--muted)'}).text(0.3,1.05,'énergie',{s:11,c:'var(--muted)'}).text(3.9,-1.2,'distance r →',{a:'end',s:11,c:'var(--muted)'});
    P.arrow(2.4,-1,2.4,-0.03,{c:'var(--spark)',w:2}); P.text(2.5,-0.5,'énergie de liaison',{s:11,c:'var(--spark)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Du covalent à l’ionique',p:`<p>Dans H₂, le doublet est partagé à égalité. Mais dans H–Cl, les deux atomes n’attirent pas les électrons avec la même force : le doublet penche vers le chlore. Il faut une grandeur pour mesurer ce déséquilibre.</p>
<div class="def"><p>L’<b>électronégativité</b> χ d’un atome (échelle de Pauling, sans unité) mesure sa tendance à attirer vers lui les électrons d’une liaison. Elle croît vers la droite et vers le haut du tableau : F vaut 3,98, O 3,44, Cl 3,16, N 3,04, C 2,55, H 2,20, Na 0,93. La <b>différence Δχ</b> entre les deux atomes liés classe la liaison : Δχ &lt; 0,4 covalente <b>apolaire</b>, 0,4 à 1,7 covalente <b>polaire</b>, au-delà à caractère <b>ionique</b>.</p></div>
<div class="idea"><p>Il n’y a pas trois sortes de liaisons mais une seule famille, avec un curseur. Au bout « apolaire », le doublet est au milieu ; au bout « ionique », il est passé presque entièrement sur l’atome le plus électronégatif, qui devient un anion face à un cation. Entre les deux, l’atome le plus électronégatif porte une charge partielle δ− et l’autre δ+ : la liaison est un petit <b>dipôle</b>.</p></div>
<div class="ex"><p>C–H : Δχ = 2,55 − 2,20 = 0,35, apolaire ; c’est pourquoi les hydrocarbures sont peu polaires. O–H : Δχ = 3,44 − 2,20 = 1,24, nettement polaire, O porte δ−. Na–Cl : Δχ = 3,16 − 0,93 = 2,23, le chlorure de sodium est un solide ionique Na⁺Cl⁻.</p></div>
<p>Fais glisser Δχ et observe la déformation du nuage.</p>`,
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
 {kind:'Théorie',h:'Le moment dipolaire',p:`<p>Comment chiffrer la polarité d’une liaison, puis d’une molécule entière&nbsp;? Par le moment dipolaire, qu’on mesure en plaçant la substance dans un champ électrique.</p>
<div class="def"><p>Deux charges +q et −q séparées de la distance d forment un <b>dipôle</b> de <b>moment dipolaire μ = q·d</b>. C’est un vecteur, que les chimistes dessinent de δ+ vers δ− (flèche vers l’atome le plus électronégatif). L’unité pratique est le <b>debye</b> : 1 D = 3,336·10⁻³⁰ C·m. Le moment d’une molécule est la <b>somme vectorielle</b> des moments de ses liaisons.</p></div>
<div class="why"><p>Un électron entier déplacé de 0,1 nm donnerait μ = 1,602·10⁻¹⁹ × 10⁻¹⁰ = 1,6·10⁻²⁹ C·m, soit 4,8 D. Les liaisons réelles ont des moments de 0,3 à 2 D : le transfert de charge n’est que partiel, δ de l’ordre de 0,1 à 0,4. Comme les moments sont des vecteurs, deux liaisons identiques opposées s’annulent exactement, et deux liaisons d’angle θ donnent, par la règle du parallélogramme, <b>μ = 2μ<sub>liaison</sub>·cos(θ/2)</b>.</p></div>
<div class="ex"><p>Eau : μ<sub>O–H</sub> ≈ 1,5 D et θ = 104,5°. μ = 2 × 1,5 × cos(52,25°) = 3 × 0,612 ≈ 1,84 D, proche de la valeur mesurée 1,85 D. Si l’eau était linéaire (θ = 180°), cos 90° = 0 et μ serait nul : elle ne dissoudrait pas le sel.</p></div>
<p>Change l’angle et regarde la résultante.</p>`,
  params:[{id:'t',l:'Angle θ',min:90,max:180,step:5,v:105,u:'°'}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-2.6,1.6],h:220,grid:false,axes:false}), a=rad(v.t/2), hx=2*Math.sin(a), hy=-2*Math.cos(a), mu=3*Math.cos(a);
    P.seg(0,0,-hx,hy,{c:'var(--ink)',w:4}).seg(0,0,hx,hy,{c:'var(--ink)',w:4});
    P.arrow(-hx*.9,hy*.9-0.25,-0.1,-0.25,{c:'var(--sci)',w:2,hs:8}).arrow(hx*.9,hy*.9-0.25,0.1,-0.25,{c:'var(--sci)',w:2,hs:8});
    if(mu>0.05) P.arrow(0,-mu*.5,0,0.05+mu*.4,{c:'var(--spark)',w:4});
    P.dot(0,0,{c:'var(--bad)',r:12}).dot(-hx,hy,{c:'var(--muted)',r:8}).dot(hx,hy,{c:'var(--muted)',r:8});
    P.text(0,0,'O',{a:'middle',dy:-16}).text(-hx,hy,'H',{a:'middle',dy:22}).text(hx,hy,'H',{a:'middle',dy:22}); return P.svg(); },
  info:v=>`μ = 2 × 1,5 × cos(${fmt(v.t/2,1)}°) = <b>${fmt(3*Math.cos(rad(v.t/2)))} D</b>${v.t===180?' : les deux moments s’annulent.':''}`,
  note:'Convention des chimistes : la flèche d’un moment de liaison pointe vers l’atome le plus électronégatif (δ−).'},
 {kind:'Méthode',h:'Du moment dipolaire à la charge partielle',p:`<b>Quand :</b> on connaît le moment dipolaire mesuré d’une molécule et on veut le moment d’une liaison, puis la charge partielle δ portée par les atomes. <b>Pourquoi :</b> une liaison polaire se modélise par deux charges +δe et −δe séparées de la longueur de liaison d, donc μ = δe·d ; dans une molécule coudée, μ = 2μ<sub>liaison</sub>·cos(θ/2). <b>Comment :</b><ol><li>Molécule coudée : μ<sub>liaison</sub> = μ / (2 cos(θ/2)). Molécule diatomique : μ<sub>liaison</sub> = μ.</li><li>Convertis en unités SI : μ (C·m) = μ (D) × 3,336·10⁻³⁰.</li><li>q = μ/d, avec d en mètres.</li><li>δ = q/e, avec e = 1,602·10⁻¹⁹ C. δ = 0 : covalente pure ; δ = 1 : ionique pure.</li></ol>`,
  demo:{enonce:'H₂S a un moment dipolaire de 0,97 D, un angle H–S–H de 92° et des liaisons S–H de 1,34·10⁻¹⁰ m. Quelle charge partielle porte chaque H&nbsp;?',
   etapes:[{f:'μ<sub>S–H</sub> = 0,97 / (2 cos 46°) = 0,97 / 1,389 ≈ 0,698 D',w:'Le moment total est la somme vectorielle des deux moments de liaison : on divise par 2 cos(θ/2) pour isoler un seul moment.'},
    {f:'μ<sub>S–H</sub> = 0,698 × 3,336·10⁻³⁰ ≈ 2,33·10⁻³⁰ C·m',w:'Le debye n’est pas une unité SI ; il faut des C·m pour diviser par une longueur en mètres.'},
    {f:'q = 2,33·10⁻³⁰ / 1,34·10⁻¹⁰ ≈ 1,74·10⁻²⁰ C',w:'μ = q·d, donc q = μ/d.'},
    {f:'δ = 1,74·10⁻²⁰ / 1,602·10⁻¹⁹ ≈ 0,11',w:'On exprime la charge en fraction de la charge élémentaire pour la comparer à 0 et à 1.'}],
   conclusion:'Chaque H porte environ +0,11 e : la liaison S–H est faiblement polaire, bien moins que O–H.'}},
 {h:'La charge partielle de HF',p:'Le fluorure d’hydrogène HF a un moment dipolaire de 1,82 D et une longueur de liaison de 0,917·10⁻¹⁰ m. Calcule la charge partielle δ portée par H, au centième (1 D = 3,336·10⁻³⁰ C·m, e = 1,602·10⁻¹⁹ C).',lab:'δ =',ans:.41,tol:.01,
  why:'Molécule diatomique : μ<sub>liaison</sub> = μ. q = 1,82 × 3,336·10⁻³⁰ / 0,917·10⁻¹⁰ ≈ 6,62·10⁻²⁰ C, δ = q/e ≈ 0,41.'},
 {kind:'Théorie',h:'L’octet et la notation de Lewis',p:`<p>Pour prévoir la forme et la polarité d’une molécule, il faut d’abord savoir où sont ses électrons de valence. La notation de Lewis les dessine tous.</p>
<div class="def"><p>Dans une <b>structure de Lewis</b>, on représente chaque atome par son symbole, chaque <b>doublet liant</b> par un trait entre deux atomes et chaque <b>doublet non liant</b> (ou libre) par un trait ou deux points sur l’atome qui le porte. Les atomes des périodes 2 et 3 cherchent à s’entourer de <b>8 électrons</b> (quatre doublets, liants ou non) : c’est la <b>règle de l’octet</b> ; l’hydrogène se contente de 2.</p></div>
<div class="why"><p>Huit électrons, c’est une configuration ns² np⁶ complète, celle d’un gaz noble : toutes les orbitales de valence sont pleines, aucune place disponible pour une liaison de plus, et aucun électron facile à céder. Un atome y parvient en partageant autant de doublets qu’il lui manque d’électrons : O (6 électrons de valence) en partage 2, N (5) en partage 3, C (4) en partage 4.</p></div>
<div class="ex"><p>Eau : 2 × 1 + 6 = 8 électrons, 4 doublets. Deux doublets lient O à chaque H, les deux autres restent libres sur O : H–O–H avec deux traits sur O. O a 2 + 2 × 2 = 8 électrons ✓, chaque H en a 2 ✓. Ammoniac NH₃ : 8 électrons, 3 liaisons N–H et 1 doublet libre sur N.</p></div>
<div class="warn"><p>L’octet est une règle, pas une loi. Le bore de BF₃ se contente de 6 électrons ; le soufre de SF₆ en porte 12, grâce aux orbitales 3d disponibles à partir de la période 3. Et un électron célibataire peut subsister : NO a un nombre impair d’électrons.</p></div>`},
 {kind:'Méthode',h:'Dessiner une structure de Lewis pas à pas',p:`<b>Quand :</b> avant toute question de géométrie, de polarité ou de charges, il faut savoir où sont les doublets. <b>Pourquoi :</b> les atomes des périodes 2 et 3 tendent à s’entourer de 8 électrons (l’<b>octet</b>, 2 pour H) en partageant des doublets. <b>Comment :</b><ol><li><b>Compte</b> les électrons de valence de tous les atomes, ajoute un électron par charge négative, retire-en un par charge positive. Divise par 2 : nombre de doublets.</li><li><b>Squelette</b> : l’atome central est le moins électronégatif (jamais H). Relie-le aux autres par des liaisons simples.</li><li><b>Complète l’octet</b> des atomes périphériques avec des doublets libres (H n’en a pas).</li><li>Place les doublets restants sur l’atome central.</li><li>Si l’atome central n’a pas son octet, transforme un doublet libre d’un voisin en <b>liaison double</b> (ou triple).</li></ol>`,
  demo:{enonce:'Dessine la structure de Lewis du dioxyde de carbone CO₂.',
   etapes:[{f:'4 + 2 × 6 = 16 électrons → 8 doublets',w:'C apporte 4 électrons de valence, chaque O en apporte 6 ; la molécule est neutre.'},
    {f:'O–C–O',w:'C est moins électronégatif que O : il est au centre. Deux liaisons simples utilisent 2 doublets.'},
    {f:'3 doublets libres sur chaque O → 2 + 6 = 8 doublets utilisés',w:'On complète d’abord l’octet des atomes périphériques. Il ne reste aucun doublet pour C.'},
    {f:'C n’a que 4 électrons → O=C=O',w:'On rabat un doublet libre de chaque O en liaison : C a alors 2 liaisons doubles, soit 8 électrons.'},
    {f:'chaque O : 2 liaisons + 2 doublets libres = 8 ✓ · C : 8 ✓',w:'On vérifie l’octet de chaque atome et le total de 8 doublets.'}],
   conclusion:'CO₂ s’écrit O=C=O, chaque oxygène portant deux doublets libres.'},
  note:'À partir de la période 3 (P, S, Cl…), l’atome central peut dépasser l’octet : c’est le cas de S dans SF₆ ou de P dans PCl₅.'},
 {h:'Structure de Lewis',p:`Pour dessiner une structure de Lewis, on compte d’abord tous les <b>électrons de valence</b>, on ajoute un électron par charge négative (on en retire un par charge positive), puis on place les doublets pour satisfaire l’octet. Combien d’électrons de valence compte l’ion sulfate SO₄²⁻&nbsp;?`,lab:'électrons :',ans:32,
  why:'S apporte 6, chaque O apporte 6 (soit 24) et la charge 2− ajoute 2 électrons : 6 + 24 + 2 = 32, c’est-à-dire 16 doublets.'},
 {h:'Le cyanure d’hydrogène',p:'Dessine la structure de Lewis de HCN (C est l’atome central). Combien de liaisons relient C et N&nbsp;?',lab:'liaisons C–N :',ans:3,
  why:'1 + 4 + 5 = 10 électrons, 5 doublets. Squelette H–C–N (2 doublets), 3 doublets libres sur N : il n’en reste aucun et C n’a que 4 électrons. On rabat deux doublets de N : H–C≡N, avec un doublet libre sur N.'},
 {kind:'Méthode',h:'Calculer les charges formelles',p:`<b>Quand :</b> pour un ion (où se trouve la charge&nbsp;?) ou pour choisir entre plusieurs structures de Lewis possibles. <b>Pourquoi :</b> on compare les électrons que l’atome « possède » dans la structure (ses doublets libres, plus la moitié de ses liaisons) à ceux qu’il a quand il est isolé. <b>Comment :</b><ol><li>Pour chaque atome : <b>CF = V − L − B/2</b>, avec V ses électrons de valence, L ses électrons non liants, B ses électrons de liaison.</li><li>Vérifie que la somme des charges formelles vaut la charge de l’espèce.</li><li>La meilleure structure a des charges formelles les plus petites possible, et une charge négative plutôt sur l’atome le plus électronégatif.</li></ol>`,
  demo:{enonce:'Le monoxyde de carbone s’écrit :C≡O: (un doublet libre sur chaque atome, une triple liaison). Calcule les charges formelles.',
   etapes:[{f:'4 + 6 = 10 électrons = 5 doublets : 3 dans la triple liaison, 1 libre sur C, 1 libre sur O ✓',w:'On vérifie d’abord que la structure utilise le bon nombre d’électrons.'},
    {f:'CF(C) = 4 − 2 − 6/2 = −1',w:'C a 4 électrons de valence, 2 électrons non liants et 6 électrons de liaison.'},
    {f:'CF(O) = 6 − 2 − 6/2 = +1',w:'Même calcul pour O, qui a 6 électrons de valence.'},
    {f:'somme : −1 + 1 = 0 ✓',w:'La molécule est neutre, la somme doit être nulle.'}],
   conclusion:'Dans CO, C porte −1 et O porte +1. C’est inhabituel, mais c’est la seule structure où les deux atomes ont leur octet.'}},
 {h:'L’ion ammonium',p:'Dans l’ion NH₄⁺, l’azote est lié à quatre hydrogènes et ne porte aucun doublet libre. Quelle est la charge formelle de l’azote&nbsp;?',lab:'CF(N) =',ans:1,
  why:'CF(N) = 5 − 0 − 8/2 = +1. Chaque H a CF = 1 − 0 − 1 = 0 : la charge +1 de l’ion est portée par N.'},
 {kind:'Théorie',h:'Le modèle VSEPR',p:`<p>Une structure de Lewis est plate ; la molécule, elle, vit en trois dimensions. Comment deviner sa forme sans la mesurer&nbsp;? Avec une idée simple : les électrons se fuient.</p>
<div class="def"><p>Le modèle <b>VSEPR</b> (répulsion des paires électroniques de la couche de valence) considère autour de l’atome central A ses <b>domaines électroniques</b> : chaque atome lié compte pour un domaine X (qu’il soit lié par une liaison simple, double ou triple), chaque doublet libre pour un domaine E. On note la molécule <b>AX<sub>n</sub>E<sub>m</sub></b>.</p></div>
<div class="prop"><p>Les n + m domaines se placent le plus loin possible les uns des autres : 2 domaines à 180° (linéaire), 3 à 120° (trigonal plan), 4 à 109,5° (tétraèdre), 5 en bipyramide trigonale, 6 en octaèdre. La <b>forme</b> de la molécule est celle des seuls atomes ; les doublets libres, invisibles, la déforment.</p></div>
<div class="why"><p>Des doublets d’électrons portent la même charge et se repoussent : l’arrangement d’énergie minimale est celui qui maximise leurs distances, exactement comme des ballons noués ensemble. Un doublet libre n’est attiré que par un seul noyau : il s’étale davantage qu’un doublet liant, partagé entre deux noyaux, et pousse les liaisons voisines, ce qui <b>referme</b> leurs angles.</p></div>
<div class="ex"><p>CH₄, NH₃ et H₂O ont toutes quatre domaines en tétraèdre. CH₄ (AX₄) est un tétraèdre parfait, 109,5°. NH₃ (AX₃E) est une pyramide, 107°. H₂O (AX₂E₂) est coudée, 104,5° : chaque doublet libre rogne environ 2,5°.</p></div>
<p>En bleu les atomes liés, en jaune les doublets libres : règle X et E.</p>`,
  params:[{id:'x',l:'Liaisons X',min:2,max:6,v:4},{id:'e',l:'Doublets libres E',min:0,max:3,v:0}],
  draw:v=>vsepr(v.x,v.e),
  info:v=>{ const g=GEO[`${v.x}-${v.e}`]; return g?`AX<sub>${v.x}</sub>${v.e?`E<sub>${v.e}</sub>`:''} : <b>${g[0]}</b>, angles ${g[1]} · exemple : ${g[2]}`:'X + E &gt; 6 : hors du modèle usuel.'; },
  note:'Un doublet libre prend plus de place qu’une liaison : il referme les angles (109,5° pour CH₄, 107° pour NH₃, 104,5° pour H₂O).'},
 {kind:'Méthode',h:'Prévoir la géométrie avec VSEPR',p:`<b>Quand :</b> on te demande la forme d’une molécule, ses angles ou l’hybridation de son atome central. <b>Pourquoi :</b> les domaines électroniques se repoussent ; leur nombre fixe l’arrangement, mais on ne « voit » que les atomes. <b>Comment :</b><ol><li>Dessine la structure de Lewis.</li><li>Autour de l’atome central, compte <b>X</b> (atomes liés) et <b>E</b> (doublets libres). Une liaison double ou triple compte pour <b>un seul</b> domaine.</li><li>X + E donne l’arrangement : 2 linéaire, 3 trigonal plan, 4 tétraédrique, 5 bipyramide, 6 octaèdre.</li><li>Nomme la forme d’après les seuls atomes (tableau AX<sub>n</sub>E<sub>m</sub>) ; chaque doublet libre referme un peu les angles.</li><li>Hybridation : X + E = 2, 3, 4 donne sp, sp², sp³.</li></ol>`,
  demo:{enonce:'Quelle est la géométrie du méthanal H₂CO (formaldéhyde), avec C central&nbsp;?',
   etapes:[{f:'2 × 1 + 4 + 6 = 12 électrons → 6 doublets',w:'Première étape de Lewis : le décompte.'},
    {f:'H–C(–H)–O, 3 doublets libres sur O → 6 doublets, C n’a que 6 électrons',w:'Squelette et octet de O ; il ne reste rien pour C.'},
    {f:'on forme C=O : C a 8 électrons, O garde 2 doublets libres',w:'On rabat un doublet de O en liaison double pour compléter l’octet de C.'},
    {f:'autour de C : X = 3 (H, H, O), E = 0 → AX₃',w:'La double liaison C=O compte pour un seul domaine.'},
    {f:'trigonale plane, angles ≈ 120°, C hybridé sp²',w:'Trois domaines s’écartent dans un plan à 120°.'}],
   conclusion:'H₂CO est plane et triangulaire autour du carbone.'}},
 {kind:'Pratique',h:'La forme de l’eau',p:'L’oxygène de H₂O porte deux liaisons et deux doublets libres. Règle les curseurs pour obtenir sa géométrie.',
  params:[{id:'x',l:'Liaisons X',min:2,max:6,v:4},{id:'e',l:'Doublets libres E',min:0,max:3,v:0}],
  draw:v=>vsepr(v.x,v.e), info:v=>{ const g=GEO[`${v.x}-${v.e}`]; return g?`AX<sub>${v.x}</sub>${v.e?`E<sub>${v.e}</sub>`:''} : ${g[0]}`:'hors modèle'; },
  ok:v=>v.x===2&&v.e===2,why:'H₂O est AX₂E₂ : quatre domaines en tétraèdre, dont deux doublets libres. La molécule est coudée, d’angle ≈ 104,5°.'},
 {h:'L’ion oxonium',p:'Quelle est la géométrie de l’ion oxonium H₃O⁺&nbsp;?',opts:['Trigonale plane','Tétraédrique','Pyramidale à base triangulaire','En T'],ans:2,
  why:'6 + 3 − 1 = 8 électrons, 4 doublets : 3 liaisons O–H et 1 doublet libre sur O. AX₃E₁ : arrangement tétraédrique, forme pyramidale comme NH₃.'},
 {kind:'Méthode',h:'Décider si une molécule est polaire',p:`<b>Quand :</b> on te demande si une molécule a un moment dipolaire, ou on compare des solubilités et des températures d’ébullition. <b>Pourquoi :</b> le moment de la molécule est la somme vectorielle des moments de liaison ; une géométrie symétrique peut les annuler. <b>Comment :</b><ol><li>Repère les liaisons polaires (Δχ ≥ 0,4).</li><li>Trouve la géométrie par VSEPR.</li><li>Si tous les atomes autour du centre sont identiques <b>et</b> que la forme est l’une des formes symétriques (linéaire AX₂, trigonale plane AX₃, tétraédrique AX₄, bipyramide AX₅, octaèdre AX₆, plan carré AX₄E₂, linéaire AX₂E₃), les moments s’annulent : apolaire.</li><li>Sinon (doublets libres qui cassent la symétrie, ou voisins différents), elle est polaire.</li></ol>`,
  demo:{enonce:'Le dichlorométhane CH₂Cl₂ est-il polaire&nbsp;? Et le tétrachlorométhane CCl₄&nbsp;?',
   etapes:[{f:'Δχ(C–Cl) = 3,16 − 2,55 = 0,61 : polaire · Δχ(C–H) = 0,35 : presque apolaire',w:'On regarde d’abord s’il existe des moments de liaison.'},
    {f:'C : 4 liaisons, 0 doublet libre → AX₄, tétraédrique',w:'Les deux molécules ont la même géométrie.'},
    {f:'CCl₄ : quatre C–Cl identiques en tétraèdre → somme nulle',w:'Un tétraèdre régulier à quatre voisins identiques est symétrique : les moments se compensent.'},
    {f:'CH₂Cl₂ : deux C–Cl du même côté, deux C–H de l’autre → somme non nulle',w:'Les voisins ne sont pas identiques, la symétrie est rompue.'}],
   conclusion:'CCl₄ est apolaire, CH₂Cl₂ est polaire (μ ≈ 1,6 D), malgré la même forme tétraédrique.'}},
 {h:'Polaire ou pas&nbsp;?',p:'Laquelle de ces molécules est <b>apolaire</b> alors que ses liaisons sont polaires&nbsp;?',opts:['H₂O','NH₃','CO₂','HCl'],ans:2,
  why:'CO₂ est linéaire : les deux moments C=O sont opposés et s’annulent. H₂O et NH₃ ne sont pas symétriques, et HCl n’a qu’une liaison.'},
 {kind:'Théorie',h:'Les orbitales hybrides',p:`<p>Le carbone a pour configuration 2s² 2p² : deux électrons célibataires seulement, et des orbitales p à 90° l’une de l’autre. Pourtant il forme quatre liaisons identiques à 109,5° dans CH₄. Comment&nbsp;?</p>
<div class="def"><p>L’<b>hybridation</b> est le mélange d’une orbitale s avec une, deux ou trois orbitales p du même atome pour donner autant d’orbitales <b>hybrides</b> équivalentes, pointant dans les directions prévues par VSEPR : <b>sp</b> (2 hybrides à 180°), <b>sp²</b> (3 hybrides à 120°, une p intacte), <b>sp³</b> (4 hybrides à 109,5°). Le nombre d’hybrides est égal au nombre de domaines X + E.</p></div>
<div class="why"><p>Promouvoir un électron 2s vers 2p coûte de l’énergie, mais permet de former quatre liaisons au lieu de deux, et chaque liaison en rapporte bien plus (environ 410 kJ/mol pour C–H). Les hybrides, allongées dans une direction, recouvrent mieux les orbitales des voisins que les orbitales s ou p pures : les liaisons sont plus fortes. Une orbitale p laissée intacte, perpendiculaire au plan des hybrides sp², peut recouvrir latéralement une p voisine : c’est la <b>liaison π</b> d’une double liaison, qui s’ajoute à la liaison <b>σ</b> frontale.</p></div>
<div class="ex"><p>Méthanal H₂CO : C a 3 domaines, donc sp², plan à 120° ; la p restante forme la liaison π de C=O. Éthyne HC≡CH : 2 domaines, sp, linéaire ; deux liaisons π. Méthane : 4 domaines, sp³.</p></div>
<div class="warn"><p>L’hybridation ne crée pas la géométrie : c’est VSEPR qui la donne, l’hybridation est la description des orbitales qui la réalise.</p></div>`},
 {h:'Hybridation',p:`On associe au nombre de domaines de l’atome central une <b>hybridation</b> : 2 domaines → sp, 3 → sp², 4 → sp³. Une double liaison compte pour un seul domaine. Dans l’éthène H₂C=CH₂, quelle est l’hybridation de chaque carbone&nbsp;?`,
  opts:['sp','sp³','sp²','sp³d'],ans:2,why:'Chaque carbone a trois domaines (deux C–H et la double liaison C=C) : il est sp², plan, à 120°. L’orbitale p restante forme la liaison π.'},
 {kind:'Théorie',h:'Les forces entre molécules',p:`<p>Pourquoi l’eau est-elle liquide à 20 °C alors que le méthane, de masse voisine, bout à −162 °C&nbsp;? Les liaisons covalentes ne sont pas en cause : elles restent intactes quand on bout. Ce qui diffère, ce sont les forces <b>entre</b> molécules.</p>
<div class="def"><p>Trois forces intermoléculaires, par ordre de force croissante :</p><ul><li><b>London</b> (dispersion) : attraction entre dipôles instantanés, présente entre toutes les molécules, d’autant plus forte que le nuage électronique est gros et déformable ;</li><li><b>dipôle-dipôle</b> : entre molécules polaires, qui s’orientent δ+ face à δ− ;</li><li><b>liaison hydrogène</b> : un H lié à N, O ou F attiré par un doublet libre d’un N, O ou F d’une molécule voisine ; 10 à 40 kJ/mol, dix fois moins qu’une covalente mais bien plus que London.</li></ul></div>
<div class="why"><p>Même dans une molécule apolaire, les électrons bougent : à chaque instant, le nuage est un peu décalé et forme un dipôle fugace, qui induit un dipôle dans la voisine. Plus il y a d’électrons et plus ils sont loin du noyau, plus ces fluctuations sont grandes : d’où London croissante avec la taille. La liaison hydrogène est si forte parce que H, minuscule et dépouillé de son électron par O, N ou F, laisse son noyau presque nu approcher très près du doublet voisin.</p></div>
<div class="ex"><p>CH₄ (M = 16 g/mol) : London seulement, T<sub>éb</sub> = −162 °C. H₂O (M = 18 g/mol) : London + dipôle + jusqu’à quatre liaisons hydrogène par molécule, T<sub>éb</sub> = 100 °C. Dans la famille des alcanes, sans dipôle, la taille décide : méthane CH₄ −162 °C, hexane C₆H₁₄ +69 °C.</p></div>`},
 {kind:'Méthode',h:'Comparer des forces intermoléculaires',p:`<b>Quand :</b> on compare des températures d’ébullition ou de fusion, ou des solubilités. <b>Pourquoi :</b> bouillir, c’est séparer les molécules ; plus elles s’attirent, plus il faut chauffer. <b>Comment :</b> pour chaque molécule, liste les forces présentes.<ol><li><b>London</b> (dispersion) : toujours présentes, d’autant plus fortes que la molécule est grosse (beaucoup d’électrons, grande masse molaire).</li><li><b>Dipôle-dipôle</b> : seulement entre molécules polaires.</li><li><b>Liaison hydrogène</b> : H lié à N, O ou F, face au doublet libre d’un N, O ou F voisin. C’est la plus forte des trois.</li></ol>Compare d’abord la présence de liaisons hydrogène, puis, à taille voisine, la polarité ; entre molécules de même famille, la plus grosse l’emporte.`,
  demo:{enonce:'Classe F₂ (M = 38 g/mol), HCl (36,5 g/mol) et HF (20 g/mol) par température d’ébullition croissante.',
   etapes:[{f:'F₂ : apolaire → London seulement',w:'Deux atomes identiques : Δχ = 0.'},
    {f:'HCl : polaire (Δχ = 0,96) → London + dipôle-dipôle',w:'Taille voisine de F₂, mais une attraction en plus.'},
    {f:'HF : H lié à F → liaisons hydrogène',w:'F est petit et très électronégatif : le H de HF est attiré par un doublet libre du F voisin.'},
    {f:'T<sub>éb</sub>(F₂) &lt; T<sub>éb</sub>(HCl) &lt; T<sub>éb</sub>(HF)',w:'Les valeurs réelles confirment : −188 °C, −85 °C et +20 °C, alors que HF est la plus légère.'}],
   conclusion:'Les liaisons hydrogène l’emportent sur la masse : HF bout le plus haut.'}},
 {kind:'Défi',h:'Forces intermoléculaires',p:'H₂O bout à 100 °C alors que H₂S, plus lourde, bout vers −60 °C. Pourquoi&nbsp;?',
  opts:['H₂S est apolaire','Les forces de London sont plus fortes dans H₂O','H₂O est ionique','H₂O forme des liaisons hydrogène'],ans:3,
  why:'O est très électronégatif et petit : un H lié à O est attiré par un doublet libre d’une molécule voisine. Ces liaisons hydrogène sont bien plus fortes que les interactions de van der Waals de H₂S.'},
 {h:'Les alcanes',p:'Les alcanes sont apolaires. Lequel bout à la plus haute température&nbsp;?',opts:['Le méthane CH₄','L’éthane C₂H₆','Le propane C₃H₈','Le butane C₄H₁₀'],ans:3,
  why:'Sans dipôle ni liaison hydrogène, seules restent les forces de London, qui croissent avec la taille. Le butane, le plus gros, bout le plus haut (−0,5 °C contre −162 °C pour le méthane).'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : molécules',p:`<div class="keep"><ul>
<li>Une liaison covalente est un doublet partagé qui abaisse l’énergie ; la former libère de l’énergie, la rompre en coûte.</li>
<li>Électronégativité χ : Δχ &lt; 0,4 apolaire, 0,4 à 1,7 polaire (δ+/δ−), au-delà ionique.</li>
<li>Moment dipolaire μ = q·d (1 D = 3,336·10⁻³⁰ C·m), somme vectorielle ; deux liaisons d’angle θ : μ = 2μ<sub>liaison</sub>cos(θ/2) ; charge partielle δ = μ/(e·d).</li>
<li>Lewis : compter les électrons de valence (± charge), squelette, octet des périphériques, doublets restants sur le centre, liaisons multiples si besoin. Charge formelle CF = V − L − B/2.</li>
<li>VSEPR : X atomes liés + E doublets libres ; 2 linéaire, 3 trigonal plan, 4 tétraèdre, 5 bipyramide, 6 octaèdre ; un doublet libre referme les angles. Hybridation sp, sp², sp³ pour 2, 3, 4 domaines.</li>
<li>Molécule apolaire si les moments s’annulent par symétrie (AX₂, AX₃, AX₄, AX₂E₃, AX₄E₂ à voisins identiques), polaire sinon.</li>
<li>Forces intermoléculaires : London (toujours, croît avec la taille) &lt; dipôle-dipôle &lt; liaison hydrogène (H sur N, O, F). Elles fixent les températures d’ébullition.</li>
</ul></div>`},
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
 {kind:'Théorie',h:'La mole',p:`<p>Une goutte d’eau contient plus de molécules qu’il n’y a de secondes depuis le début de l’univers. Pour compter des atomes, il faut une unité à leur échelle : la mole, comme la douzaine pour les œufs, mais gigantesque.</p>
<div class="def"><p>Une <b>mole</b> est un paquet de <b>N<sub>A</sub> = 6,022·10²³</b> entités (atomes, molécules, ions…) ; N<sub>A</sub> est la <b>constante d’Avogadro</b>. La <b>quantité de matière</b> n se mesure en moles. La <b>masse molaire</b> M (g/mol) est la masse d’une mole : <b>m = n·M</b> et <b>N = n·N<sub>A</sub></b>.</p></div>
<div class="why"><p>Le nombre N<sub>A</sub> a été choisi pour que la masse molaire en grammes coïncide avec la masse atomique en unités u : un atome de carbone 12 pèse 12 u, une mole de carbone 12 pèse 12 g. Ainsi, les masses du tableau périodique sont directement des masses molaires. C’est pourquoi la mole est le pont entre le monde microscopique (atomes qu’on compte) et la balance (grammes qu’on pèse).</p></div>
<div class="ex"><p>M(H₂O) = 2 × 1,0 + 16,0 = 18 g/mol. Un verre de 180 g d’eau contient n = 180/18 = 10 mol, soit N = 10 × 6,022·10²³ = 6,0·10²⁴ molécules. Une seule molécule pèse 18 / 6,022·10²³ = 3,0·10⁻²³ g.</p></div>
<div class="warn"><p>Même quantité n ne veut pas dire même masse : 1 mol d’eau pèse 18 g, 1 mol de CO₂ 44 g, 1 mol de NaCl 58,5 g. La figure le montre : à n fixé, les colonnes n’ont pas la même hauteur.</p></div>
<p>Fais varier <i>n</i>.</p>`,
  params:[{id:'n',l:'n (mol)',min:.5,max:5,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[0,10],y:[0,300],h:200,grid:false,ly:50}), sub=[['H₂O',18],['CO₂',44],['NaCl',58.5]];
    sub.forEach(([s,M],i)=>{ const x=1.5+i*3, m=v.n*M; P.rect(x,0,1.6,Math.min(m,300),{fill:['var(--sci)','var(--muted)','var(--ok)'][i],fo:.6,c:null}).text(x+0.8,Math.min(m,280),fmt(m,1)+' g',{a:'middle',dy:-6,s:11}).text(x+0.8,0,s,{a:'middle',dy:-6,s:12}); });
    return P.svg(); },
  info:v=>`${fmt(v.n,1)} mol = ${sci(v.n*6.022e23)} entités dans chaque colonne`,
  note:'M se calcule en additionnant les masses atomiques : M(H₂O) = 2 × 1 + 16 = 18 g/mol.'},
 {kind:'Méthode',h:'Masse atomique moyenne d’un élément',p:`<b>Quand :</b> on connaît les isotopes d’un élément et leurs abondances, et on veut la masse molaire du tableau périodique (ou l’inverse). <b>Pourquoi :</b> un échantillon naturel mélange les isotopes ; sa masse moyenne est une <b>moyenne pondérée</b> par la proportion de chaque isotope. <b>Comment :</b><ol><li>Convertis chaque abondance en fraction (80 % → 0,80) ; leur somme vaut 1.</li><li>M = Σ (fraction × masse de l’isotope).</li><li>Vérifie que M tombe entre la plus petite et la plus grande masse, plus près de l’isotope le plus abondant.</li></ol>`,
  demo:{enonce:'Le bore naturel contient 20 % de ¹⁰B (10,0 u) et 80 % de ¹¹B (11,0 u). Quelle est sa masse atomique moyenne&nbsp;?',
   etapes:[{f:'fractions : 0,20 et 0,80',w:'Les pourcentages deviennent des coefficients de pondération qui somment à 1.'},
    {f:'M = 0,20 × 10,0 + 0,80 × 11,0 = 2,0 + 8,8 = 10,8 u',w:'Chaque isotope pèse dans la moyenne selon sa proportion.'},
    {f:'10,0 &lt; 10,8 &lt; 11,0, plus près de 11 ✓',w:'Contrôle de vraisemblance : ¹¹B est le plus abondant.'}],
   conclusion:'M(B) = 10,8 u, soit 10,8 g/mol : la valeur du tableau périodique.'}},
 {h:'Masse atomique moyenne',p:'Le chlore naturel contient 75 % de ³⁵Cl (35 u) et 25 % de ³⁷Cl (37 u). Quelle est sa masse atomique moyenne&nbsp;?',lab:'M =',unit:'u',ans:35.5,tol:.01,
  why:'On pondère par l’abondance : 0,75 × 35 + 0,25 × 37 = 26,25 + 9,25 = 35,5 u. C’est la valeur du tableau périodique.'},
 {kind:'Méthode',h:'Calculer une masse molaire',p:`<b>Quand :</b> dès qu’il faut passer d’une masse à une quantité de matière, ou l’inverse. <b>Pourquoi :</b> une mole de molécules contient une mole de chaque atome multipliée par son indice ; les masses s’additionnent. <b>Comment :</b><ol><li>Compte les atomes de chaque élément. Un indice <b>après une parenthèse</b> multiplie tout son contenu.</li><li>Pour un <b>hydrate</b> (·5H₂O), ajoute 5 × M(H₂O) = 5 × 18 g/mol.</li><li>M = Σ (nombre d’atomes × masse molaire atomique).</li></ol>`,
  demo:{enonce:'Calcule la masse molaire du sulfate d’aluminium Al₂(SO₄)₃ (Al : 27, S : 32, O : 16 g/mol).',
   etapes:[{f:'Al : 2 · S : 3 · O : 4 × 3 = 12',w:'L’indice 3 après la parenthèse multiplie le S et les 4 O du groupe sulfate.'},
    {f:'M = 2 × 27 + 3 × 32 + 12 × 16',w:'On multiplie chaque nombre d’atomes par la masse molaire de l’élément.'},
    {f:'M = 54 + 96 + 192 = 342 g/mol',w:'On additionne les contributions.'}],
   conclusion:'M(Al₂(SO₄)₃) = 342 g/mol.'}},
 {h:'Masse molaire',p:'Calcule la masse molaire de l’acide sulfurique H₂SO₄ (H : 1, S : 32, O : 16 g/mol).',lab:'M =',unit:'g/mol',ans:98,
  why:'M = 2 × 1 + 32 + 4 × 16 = 2 + 32 + 64 = 98 g/mol.'},
 {h:'Un sel hydraté',p:'Calcule la masse molaire du carbonate de sodium décahydraté Na₂CO₃·10H₂O (Na : 23, C : 12, O : 16, H : 1 g/mol).',lab:'M =',unit:'g/mol',ans:286,
  why:'Na₂CO₃ : 2 × 23 + 12 + 3 × 16 = 106 g/mol, plus 10 × 18 = 180 g/mol d’eau : M = 286 g/mol.'},
 {kind:'Méthode',h:'Convertir masse, moles et nombre d’entités',p:`<b>Quand :</b> presque à chaque exercice de chimie : la mole est la monnaie d’échange entre ce qu’on pèse, ce qu’on compte et ce qu’on dissout. <b>Pourquoi :</b> M est la masse d’une mole, N<sub>A</sub> le nombre d’entités dans une mole, c la quantité par litre. <b>Comment :</b> passe toujours par <i>n</i>.<ol><li>Masse → moles : <b>n = m/M</b>.</li><li>Moles → entités : <b>N = n·N<sub>A</sub></b>.</li><li>Solution : <b>n = c·V</b>, avec V en litres ; concentration massique <b>t = c·M</b> (g/L).</li><li>Gaz : <b>n = pV/RT</b> (unités SI).</li></ol>`,
  demo:{enonce:'Combien de molécules contient un verre de 9,0 g d’eau (M = 18 g/mol)&nbsp;?',
   etapes:[{f:'n = 9,0 / 18 = 0,50 mol',w:'On convertit d’abord la masse en moles : on ne passe jamais directement de la masse au nombre de molécules.'},
    {f:'N = 0,50 × 6,022·10²³ ≈ 3,01·10²³ molécules',w:'Une mole contient N<sub>A</sub> molécules.'}],
   conclusion:'9,0 g d’eau contiennent environ 3,0·10²³ molécules.'},
  note:'Vérifie les unités à chaque ligne : mL → L (÷ 1000), L → m³ (÷ 1000), kPa → Pa (× 1000).'},
 {h:'De la masse à la mole',p:'Combien de moles y a-t-il dans 11 g de CO₂ (C : 12, O : 16 g/mol)&nbsp;?',lab:'n =',unit:'mol',ans:.25,tol:.001,
  why:'M(CO₂) = 12 + 2 × 16 = 44 g/mol, donc n = m/M = 11/44 = 0,25 mol.'},
 {h:'Compter les molécules',p:'Combien de molécules contiennent 4,4 g de CO₂ (M = 44 g/mol, N<sub>A</sub> = 6,022·10²³ mol⁻¹)&nbsp;? Donne le résultat en 10²² molécules, au centième.',lab:'N =',unit:'·10²² molécules',ans:6.02,tol:.01,
  why:'n = 4,4/44 = 0,10 mol, N = 0,10 × 6,022·10²³ = 6,02·10²² molécules.'},
 {kind:'Théorie',h:'La concentration molaire',p:`<p>En solution, on ne pèse pas le soluté à chaque fois : on prélève un volume. Il faut donc savoir combien de moles contient chaque litre.</p>
<div class="def"><p>La <b>concentration molaire</b> d’un soluté est <b>c = n/V</b>, en mol/L, où V est le volume de la <b>solution</b> (pas du solvant ajouté). La <b>concentration massique</b> t = m/V, en g/L, s’en déduit par <b>t = c·M</b>. Inversement, un volume V prélevé contient n = c·V moles.</p></div>
<div class="idea"><p>La concentration est une densité de particules : si la solution est homogène, chaque millilitre contient la même quantité. Ajouter de l’eau répartit les mêmes moles dans un plus grand volume : la concentration baisse, la quantité n ne change pas. C’est tout le principe de la <b>dilution</b> : n₁ = c₁V₁ (prélevé) = n₂ = c₂V₂ (après ajout d’eau), d’où <b>c₁V₁ = c₂V₂</b>.</p></div>
<div class="ex"><p>On dissout 5,85 g de NaCl (M = 58,5 g/mol) dans assez d’eau pour obtenir 250 mL. n = 5,85/58,5 = 0,100 mol, c = 0,100 / 0,250 = 0,400 mol/L, t = 0,400 × 58,5 = 23,4 g/L. Si l’on verse 50 mL de cette solution et qu’on complète à 200 mL, c₂ = 0,400 × 50/200 = 0,100 mol/L : diluée 4 fois.</p></div>
<div class="warn"><p>V est en litres dans n = c·V : 50 mL = 0,050 L. Et « 250 mL de solution » n’est pas « 250 mL d’eau ajoutés » : le soluté occupe un peu de place, on complète jusqu’au trait de la fiole.</p></div>`},
 {kind:'Méthode',h:'Faire une dilution',p:`<b>Quand :</b> on prépare une solution moins concentrée à partir d’une solution mère, ou on cherche la concentration après ajout d’eau. <b>Pourquoi :</b> ajouter de l’eau ne crée ni ne détruit de soluté : la quantité prélevée n₁ = c₁V₁ se retrouve entière dans la fille, n₂ = c₂V₂. <b>Comment :</b><ol><li>Écris <b>c₁V₁ = c₂V₂</b> (1 : mère prélevée, 2 : solution finale).</li><li>Isole l’inconnue ; V₁ et V₂ peuvent rester en mL s’ils ont la même unité.</li><li>Contrôle : le <b>facteur de dilution</b> F = c₁/c₂ = V₂/V₁ est supérieur à 1.</li></ol>`,
  demo:{enonce:'Quel volume de solution mère à 2,0 mol/L faut-il prélever pour préparer 100 mL à 0,50 mol/L&nbsp;?',
   etapes:[{f:'c₁V₁ = c₂V₂ → V₁ = c₂V₂ / c₁',w:'La quantité de soluté prélevée est celle qu’on veut dans la fiole.'},
    {f:'V₁ = 0,50 × 100 / 2,0 = 25 mL',w:'Les mL se simplifient de part et d’autre : inutile de convertir en litres.'},
    {f:'F = 2,0 / 0,50 = 4 = 100 / 25 ✓',w:'On dilue 4 fois en concentration, donc on multiplie le volume par 4.'}],
   conclusion:'On prélève 25 mL à la pipette, on les verse dans une fiole jaugée de 100 mL et on complète avec de l’eau jusqu’au trait.'}},
 {kind:'Pratique',h:'Concentration et dilution',p:`La concentration molaire est <b>c = n/V</b> (mol/L). En diluant, la quantité de soluté ne change pas : <b>c₁V₁ = c₂V₂</b>. Prélève le bon volume de solution mère à 1,0 mol/L pour préparer 250 mL à 0,20 mol/L.`,
  params:[{id:'V',l:'Volume prélevé',min:0,max:100,step:5,v:20,u:' mL'}],
  draw:v=>{ const P=plane({x:[0,10],y:[0,6],h:190,grid:false,axes:false}), c=v.V/250;
    const beaker=(x,w,h,lvl,op,lab)=>{ P.rect(x,0.5,w,lvl,{fill:'var(--accent)',fo:op,c:null}); P.poly([[x,0.5+h],[x,0.5],[x+w,0.5],[x+w,0.5+h]],{open:true,c:'var(--ink)',w:2}); P.text(x+w/2,0.5,lab,{a:'middle',dy:16,s:11}); };
    beaker(0.5,2.5,4,3.2,.85,'mère 1,0 mol/L'); beaker(5,4,5,4.2,Math.max(.05,c*.85),'fiole 250 mL');
    P.arrow(3.2,3.5,4.8,3.5,{c:'var(--muted)',w:2}).text(4,3.5,`${v.V} mL`,{a:'middle',dy:-8,s:12});
    return P.svg(); },
  info:v=>`n = 1,0 × ${fmt(v.V/1000,3)} = ${fmt(v.V/1000,3)} mol · c = n / 0,250 L = <b>${fmt(v.V/250,2)} mol/L</b>`,
  ok:v=>v.V===50,why:'V₁ = c₂V₂/c₁ = 0,20 × 250 / 1,0 = 50 mL, qu’on complète avec de l’eau jusqu’à 250 mL.'},
 {kind:'Méthode',h:'Préparer une solution par dissolution',p:`<b>Quand :</b> on doit fabriquer une solution de concentration donnée à partir d’un solide. <b>Pourquoi :</b> la concentration voulue et le volume fixent la quantité de soluté, la masse molaire la convertit en masse à peser. <b>Comment :</b><ol><li>n = c·V, avec V en litres.</li><li>m = n·M.</li><li>Pèse m, dissous dans un peu d’eau dans la fiole jaugée, complète jusqu’au trait.</li></ol>`,
  demo:{enonce:'Quelle masse de glucose (M = 180 g/mol) faut-il pour préparer 200 mL d’une solution à 0,25 mol/L&nbsp;?',
   etapes:[{f:'n = 0,25 × 0,200 = 0,050 mol',w:'200 mL = 0,200 L : la concentration est en mol par litre.'},
    {f:'m = 0,050 × 180 = 9,0 g',w:'On convertit la quantité de matière en masse.'}],
   conclusion:'On pèse 9,0 g de glucose et on complète à 200 mL.'}},
 {h:'Préparer une solution',p:'Quelle masse de NaCl (M = 58,5 g/mol) faut-il dissoudre pour obtenir 500 mL de solution à 0,10 mol/L&nbsp;? Arrondis au centième de gramme.',lab:'m =',unit:'g',ans:2.925,tol:.01,
  why:'n = c·V = 0,10 × 0,500 = 0,050 mol, puis m = n·M = 0,050 × 58,5 ≈ 2,93 g.'},
 {kind:'Méthode',h:'Du pourcentage massique à la concentration',p:`<b>Quand :</b> une étiquette donne un pourcentage en masse et une masse volumique (acides et bases du commerce), et on veut la concentration molaire. <b>Pourquoi :</b> le pourcentage porte sur des masses, la concentration sur des moles par litre : on raisonne sur <b>1 L de solution</b> pour passer de l’un à l’autre. <b>Comment :</b><ol><li>Masse de 1 L : m = ρ × 1000 mL.</li><li>Masse de soluté : m<sub>s</sub> = w × m (w = pourcentage / 100).</li><li>n = m<sub>s</sub>/M dans 1 L : c = n.</li></ol>`,
  demo:{enonce:'L’acide sulfurique concentré contient 96 % en masse de H₂SO₄ (M = 98 g/mol), masse volumique 1,84 g/mL. Quelle est sa concentration&nbsp;?',
   etapes:[{f:'m(1 L) = 1,84 × 1000 = 1840 g',w:'On fixe un volume commode, 1 L, pour transformer la masse volumique en masse.'},
    {f:'m(H₂SO₄) = 0,96 × 1840 ≈ 1766 g',w:'Le pourcentage massique dit quelle part de cette masse est du soluté.'},
    {f:'n = 1766 / 98 ≈ 18,0 mol → c ≈ 18,0 mol/L',w:'Ces moles sont dans 1 L, c’est donc directement la concentration.'}],
   conclusion:'L’acide sulfurique concentré est à environ 18 mol/L. Formule compacte : c = 1000·ρ·w / M.'}},
 {h:'L’ammoniaque du commerce',p:'Une solution d’ammoniaque contient 25 % en masse de NH₃ (M = 17 g/mol) et a une masse volumique de 0,91 g/mL. Quelle est sa concentration molaire&nbsp;? Au dixième.',lab:'c =',unit:'mol/L',ans:13.4,tol:.05,
  why:'1 L pèse 910 g, dont 0,25 × 910 = 227,5 g de NH₃, soit 227,5/17 ≈ 13,4 mol : c ≈ 13,4 mol/L.'},
 {kind:'Théorie',h:'Le gaz parfait',p:`<p>Pour un gaz, on ne mesure ni masse ni volume de solution, mais une pression, un volume et une température. Comment en tirer le nombre de moles&nbsp;?</p>
<div class="def"><p>Un <b>gaz parfait</b> est un gaz dont les molécules, ponctuelles, n’interagissent qu’en se choquant. Il obéit à <b>pV = nRT</b> : p en pascals, V en m³, T en kelvins (T = θ°C + 273,15), n en moles, avec <b>R = 8,314 J/(mol·K)</b>. Le <b>volume molaire</b> V<sub>m</sub> = V/n = RT/p est le même pour tous les gaz aux mêmes p et T.</p></div>
<div class="why"><p>La pression, c’est le martèlement des molécules sur les parois. Deux fois plus de molécules (n × 2) dans le même volume : deux fois plus de chocs, p × 2. Même nombre dans un volume deux fois plus petit : les molécules frappent deux fois plus souvent, p × 2 (loi de Boyle, p ∝ 1/V). Chauffer augmente leur vitesse, donc la force et la fréquence des chocs : p ∝ T. Comme les molécules sont minuscules par rapport aux distances qui les séparent, leur nature ne compte pas : seul leur nombre importe. D’où une seule constante R pour tous les gaz.</p></div>
<div class="ex"><p>À 0 °C et 101,3 kPa : V<sub>m</sub> = 8,314 × 273,15 / 101 300 = 0,02242 m³ = 22,4 L/mol. À 25 °C et 100 kPa : 8,314 × 298,15 / 100 000 = 0,02479 m³ = 24,8 L/mol. Une bouteille de 1,0 L d’air à 20 °C et 101,3 kPa contient n = 101 300 × 0,0010 / (8,314 × 293,15) = 0,042 mol.</p></div>
<div class="warn"><p>Les unités font 90 % des erreurs : 1 L = 10⁻³ m³, 1 kPa = 1000 Pa, 1 bar = 10⁵ Pa, et jamais de °C dans pV = nRT.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,6],h:170,grid:false,axes:false});
    P.rect(1,1,8,4,{fill:'var(--muted)',fo:.1,c:'var(--ink)',w:2}); const pts=[[2,2],[3.5,4],[5,1.8],[6.5,3.6],[8,2.4],[4.2,2.9],[7.2,4.4]];
    pts.forEach(([x,y],i)=>{ P.dot(x,y,{c:'var(--sci)',r:5}); const a=i*0.9; P.arrow(x,y,x+0.7*Math.cos(a),y+0.7*Math.sin(a),{c:'var(--sci)',w:1.5,hs:6}); });
    P.arrow(8.5,3,9.4,3,{c:'var(--bad)',w:2.5}).arrow(1.5,3,0.6,3,{c:'var(--bad)',w:2.5}); P.text(5,5.5,'p = chocs des molécules sur les parois',{a:'middle',s:11,c:'var(--muted)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Loi de Dalton',p:`<p>L’air n’est pas un gaz mais un mélange : 78 % de N₂, 21 % de O₂, un peu d’argon et de CO₂. Que vaut la pression de chacun&nbsp;?</p>
<div class="def"><p>Dans un mélange de gaz parfaits, la <b>pression partielle</b> p<sub>i</sub> d’un gaz est la pression qu’il exercerait s’il occupait seul tout le volume : <b>p<sub>i</sub> = n<sub>i</sub>RT/V</b>. La <b>fraction molaire</b> x<sub>i</sub> = n<sub>i</sub>/n<sub>total</sub> est sa part des moles (la somme des x<sub>i</sub> vaut 1).</p></div>
<div class="prop"><p><b>Loi de Dalton</b> : la pression totale est la somme des pressions partielles, <b>p = Σ p<sub>i</sub></b>, et chaque gaz en prend sa part molaire : <b>p<sub>i</sub> = x<sub>i</sub>·p</b>.</p></div>
<div class="why"><p>Dans un gaz parfait, les molécules s’ignorent : les chocs de N₂ sur la paroi ne dépendent pas de la présence de O₂. La pression totale compte tous les chocs, donc elle additionne les contributions. En divisant p<sub>i</sub> = n<sub>i</sub>RT/V par p = nRT/V, RT/V se simplifie : p<sub>i</sub>/p = n<sub>i</sub>/n = x<sub>i</sub>. La pression partielle est une « pression comptée en molécules ».</p></div>
<div class="ex"><p>V = 10 L = 0,010 m³, T = 300 K, 0,30 mol de N₂ et 0,10 mol de O₂. p(N₂) = 0,30 × 8,314 × 300 / 0,010 = 74 826 Pa ≈ 74,8 kPa, p(O₂) ≈ 24,9 kPa, p ≈ 99,8 kPa. Avec les fractions : x(N₂) = 0,30/0,40 = 0,75, et 0,75 × 99,8 = 74,8 kPa ✓.</p></div>
<p>Règle les quantités de N₂ et de O₂ (V = 50 L, T = 300 K).</p>`,
  params:[{id:'a',l:'n(N₂)',min:.5,max:4,step:.5,v:2,u:' mol'},{id:'b',l:'n(O₂)',min:.5,max:4,step:.5,v:1,u:' mol'}],
  draw:v=>{ const pa=v.a*R*300/0.05/1000, pb=v.b*R*300/0.05/1000, P=plane({x:[0,10],y:[0,420],h:220,grid:false,ly:100});
    P.rect(3,0,4,pa,{fill:'var(--sci)',fo:.6,c:null}).rect(3,pa,4,pb,{fill:'var(--bad)',fo:.5,c:null});
    P.text(5,pa/2,'N₂',{a:'middle',dy:5}).text(5,pa+pb/2,'O₂',{a:'middle',dy:5}).text(9.8,400,'p (kPa)',{a:'end',s:11,c:'var(--muted)'});
    return P.svg(); },
  info:v=>{ const pa=v.a*R*300/50, pb=v.b*R*300/50, x=v.a/(v.a+v.b); return `p(N₂) = ${fmt(pa,1)} kPa · p(O₂) = ${fmt(pb,1)} kPa · p = <b>${fmt(pa+pb,1)} kPa</b> · x(N₂) = ${fmt(x,3)}`; },
  note:'Unités SI : V en m³ (50 L = 0,050 m³), p en Pa. R = 8,314 J/(mol·K).'},
 {kind:'Méthode',h:'Gaz parfait et pressions partielles',p:`<b>Quand :</b> on cherche une pression, un volume ou une quantité de gaz, seul ou dans un mélange. <b>Pourquoi :</b> dans un gaz parfait, chaque molécule contribue à la pression indépendamment de sa nature ; un gaz du mélange se comporte comme s’il était seul. <b>Comment :</b><ol><li>Passe en unités SI : p en Pa, V en m³ (1 L = 10⁻³ m³), T en K (θ + 273).</li><li>Un gaz : <b>pV = nRT</b>, isole l’inconnue.</li><li>Mélange : p<sub>i</sub> = n<sub>i</sub>RT/V pour chaque gaz, ou p<sub>i</sub> = x<sub>i</sub>·p avec x<sub>i</sub> = n<sub>i</sub>/n<sub>total</sub>.</li><li>p<sub>total</sub> = Σ p<sub>i</sub>.</li></ol>`,
  demo:{enonce:'Un récipient de 10 L à 300 K contient 0,50 mol d’hélium et 1,50 mol d’argon. Calcule p(He) et la pression totale.',
   etapes:[{f:'V = 10 L = 0,010 m³',w:'Avec R = 8,314 J/(mol·K), il faut des m³ pour obtenir des Pa.'},
    {f:'p(He) = 0,50 × 8,314 × 300 / 0,010 ≈ 124 700 Pa = 124,7 kPa',w:'L’hélium exerce la pression qu’il aurait seul dans le récipient.'},
    {f:'x(He) = 0,50 / 2,00 = 0,25 → p = p(He)/x(He) ≈ 498,8 kPa',w:'L’hélium représente un quart des moles, donc un quart de la pression totale.'},
    {f:'contrôle : p = 2,00 × 8,314 × 300 / 0,010 ≈ 498,8 kPa ✓',w:'On retrouve la même valeur avec la quantité totale de gaz.'}],
   conclusion:'p(He) ≈ 124,7 kPa et p ≈ 499 kPa ; l’argon apporte les 374 kPa restants.'}},
 {h:'L’oxygène de l’air',p:'L’air contient une fraction molaire x(O₂) = 0,21. Quelle est la pression partielle de O₂ quand la pression atmosphérique vaut 101,3 kPa&nbsp;? Arrondis à 0,1 kPa.',lab:'p(O₂) =',unit:'kPa',ans:21.3,tol:.06,
  why:'p(O₂) = x(O₂)·p = 0,21 × 101,3 ≈ 21,3 kPa.'},
 {kind:'Défi',h:'Un mélange en bouteille',p:'Une bouteille de 50 L contient 2,0 mol de N₂ et 1,0 mol de O₂ à 300 K. Calcule la pression partielle de O₂ en kPa, arrondie à 0,1 kPa (R = 8,314 J/(mol·K)).',lab:'p(O₂) =',unit:'kPa',ans:49.9,tol:.1,
  why:'p(O₂) = nRT/V = 1,0 × 8,314 × 300 / 0,050 = 49 884 Pa ≈ 49,9 kPa. N₂ n’y change rien : il ajoute seulement sa propre pression partielle.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : quantités de matière',p:`<div class="keep"><ul>
<li>1 mol = 6,022·10²³ entités ; n = m/M = N/N<sub>A</sub>. La masse molaire M se lit dans le tableau (moyenne pondérée des isotopes) et s’additionne pour une formule, eau d’hydratation comprise.</li>
<li>Toujours passer par les moles : masse → n → entités, masse → n → volume de gaz, masse → n → concentration.</li>
<li>Concentration c = n/V (V en litres), concentration massique t = c·M ; dissolution : m = c·V·M.</li>
<li>Dilution : la quantité de soluté se conserve, c₁V₁ = c₂V₂ ; facteur de dilution F = c₁/c₂ = V₂/V₁.</li>
<li>Pourcentage massique : raisonner sur 1 L de solution, c = 1000·ρ·w/M.</li>
<li>Gaz parfait : pV = nRT en unités SI (Pa, m³, K), R = 8,314 J/(mol·K) ; V<sub>m</sub> = 22,4 L à 0 °C et 101,3 kPa, 24,8 L à 25 °C et 100 kPa.</li>
<li>Mélange de gaz : p<sub>i</sub> = n<sub>i</sub>RT/V = x<sub>i</sub>·p, avec x<sub>i</sub> = n<sub>i</sub>/n ; p = Σ p<sub>i</sub> (Dalton).</li>
</ul></div>`},
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
 {kind:'Théorie',h:'Ce que dit une équation chimique',p:`<p>« Le méthane brûle dans l’air et donne du gaz carbonique et de l’eau. » Cette phrase ne dit ni combien d’oxygène il faut, ni combien d’eau on obtient. L’équation chimique, elle, le dit.</p>
<div class="def"><p>Une <b>équation chimique</b> équilibrée, comme <b>CH₄ + 2 O₂ → CO₂ + 2 H₂O</b>, indique les réactifs (à gauche), les produits (à droite) et, par ses <b>coefficients stœchiométriques</b>, les proportions dans lesquelles ils réagissent : 1 molécule de CH₄ pour 2 de O₂, ou tout aussi bien 1 mole pour 2 moles.</p></div>
<div class="why"><p>Une réaction ne fait que réarranger les atomes : les liaisons se cassent et se reforment autrement, mais aucun atome n’apparaît ni ne disparaît (<b>conservation des éléments</b>, Lavoisier). Chaque élément doit donc apparaître en nombre égal des deux côtés : ici 1 C, 4 H et 4 O. Comme les atomes se conservent, la masse aussi : 16 g + 64 g = 44 g + 36 g = 80 g. Et parce qu’une mole est un nombre fixe de molécules, la proportion vraie pour les molécules l’est pour les moles.</p></div>
<div class="ex"><p>2 H₂ + O₂ → 2 H₂O se lit : 2 mol de H₂ (4,0 g) réagissent avec 1 mol de O₂ (32,0 g) pour donner 2 mol d’eau (36,0 g). Les masses ne sont pas dans le rapport 2 : 1 : 2, mais les moles oui. C’est toujours en moles qu’on raisonne.</p></div>
<div class="warn"><p>On ajuste les <b>coefficients</b>, jamais les indices : écrire H₂O₂ pour équilibrer l’oxygène changerait l’eau en eau oxygénée, une autre substance.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,12],y:[0,4],h:120,grid:false,axes:false}); const mol=(x,y,at)=>at.forEach(([dx,dy,c,r])=>P.dot(x+dx,y+dy,{c,r}));
    const C='var(--ink)',H='var(--muted)',O='var(--bad)';
    mol(1.2,2,[[0,0,C,9],[-0.5,0.5,H,5],[0.5,0.5,H,5],[-0.5,-0.5,H,5],[0.5,-0.5,H,5]]); P.text(2.3,2,'+',{a:'middle',dy:5});
    mol(3.3,2.6,[[-0.35,0,O,7],[0.35,0,O,7]]); mol(3.3,1.4,[[-0.35,0,O,7],[0.35,0,O,7]]); P.arrow(4.4,2,5.6,2,{c:'var(--ink)',w:2});
    mol(6.8,2,[[0,0,C,9],[-0.75,0,O,7],[0.75,0,O,7]]); P.text(8.1,2,'+',{a:'middle',dy:5});
    mol(9.4,2.6,[[0,0,O,7],[-0.5,-0.35,H,5],[0.5,-0.35,H,5]]); mol(9.4,1.3,[[0,0,O,7],[-0.5,-0.35,H,5],[0.5,-0.35,H,5]]);
    P.text(6,0.4,'1 C, 4 H, 4 O de chaque côté',{a:'middle',s:11,c:'var(--muted)'}); return P.svg(); })()},
 {kind:'Méthode',h:'Équilibrer une équation',p:`<b>Quand :</b> avant tout calcul de quantités, l’équation doit être équilibrée. <b>Pourquoi :</b> une réaction réarrange les atomes sans en créer ni en détruire : chaque élément doit apparaître autant de fois de chaque côté. On ne change que les <b>coefficients</b>, jamais les indices des formules. <b>Comment :</b><ol><li>Commence par l’élément qui n’apparaît que dans une espèce de chaque côté (pour une combustion : C, puis H).</li><li>Garde pour la fin l’élément présent seul (O₂, H₂, Fe…) : son coefficient s’ajuste librement.</li><li>Un coefficient fractionnaire est permis en cours de route ; multiplie ensuite tout par le dénominateur pour avoir des entiers.</li><li>Recompte chaque élément des deux côtés.</li></ol>`,
  demo:{enonce:'Équilibre la combustion de l’éthane : C₂H₆ + O₂ → CO₂ + H₂O.',
   etapes:[{f:'C₂H₆ + O₂ → 2 CO₂ + H₂O',w:'2 C à gauche : il faut 2 CO₂.'},
    {f:'C₂H₆ + O₂ → 2 CO₂ + 3 H₂O',w:'6 H à gauche : il faut 3 H₂O (2 H chacune).'},
    {f:'O à droite : 2 × 2 + 3 = 7 → 7/2 O₂',w:'O₂ est seul à gauche, on l’équilibre en dernier : 7 atomes d’O, soit 7/2 molécules d’O₂.'},
    {f:'2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O',w:'On multiplie tout par 2 pour supprimer la fraction.'},
    {f:'C : 4 = 4 · H : 12 = 12 · O : 14 = 8 + 6 ✓',w:'Le recomptage final évite les erreurs d’étourderie.'}],
   conclusion:'2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O.'},
  note:'Si le combustible contient lui-même de l’oxygène (un alcool, un sucre), retire ses atomes d’O avant de calculer le coefficient de O₂.'},
 {kind:'Pratique',h:'Équilibrer la combustion',p:`Une équation équilibrée conserve chaque élément : autant d’atomes de C, H et O de chaque côté. Règle les coefficients de <b>C₃H₈ + <i>b</i> O₂ → <i>c</i> CO₂ + <i>d</i> H₂O</b> jusqu’à ce que les barres coïncident.`,
  params:[{id:'b',l:'b (O₂)',min:1,max:8,v:1},{id:'c',l:'c (CO₂)',min:1,max:8,v:1},{id:'d',l:'d (H₂O)',min:1,max:8,v:1}],
  draw:v=>{ const L=[3,8,2*v.b], Rr=[v.c,2*v.d,2*v.c+v.d], P=plane({x:[0,10],y:[0,18],h:200,grid:false,ly:4});
    ['C','H','O'].forEach((e,i)=>{ const x=1+i*3; P.rect(x,0,1,L[i],{fill:'var(--sci)',fo:.6,c:null}).rect(x+1.1,0,1,Rr[i],{fill:L[i]===Rr[i]?'var(--ok)':'var(--bad)',fo:.6,c:null}).text(x+1.05,0,e,{a:'middle',dy:-6}); });
    P.text(9.9,17,'bleu : réactifs · à droite : produits',{a:'end',s:10,c:'var(--muted)'}); return P.svg(); },
  info:v=>`C : 3 → ${v.c} · H : 8 → ${2*v.d} · O : ${2*v.b} → ${2*v.c+v.d}`,
  ok:v=>v.b===5&&v.c===3&&v.d===4,why:'On équilibre C (c = 3), puis H (2d = 8, d = 4), puis O en dernier : 2b = 2·3 + 4 = 10, donc b = 5. C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.'},
 {h:'Rouille',p:'Quels coefficients équilibrent <i>a</i> Fe + <i>b</i> O₂ → <i>c</i> Fe₂O₃&nbsp;? (a, b, c)',opts:['2, 3, 1','4, 3, 2','3, 2, 1','4, 6, 2'],ans:1,
  why:'O : 2b = 3c, le plus petit choix est b = 3, c = 2. Fe : a = 2c = 4. Donc 4 Fe + 3 O₂ → 2 Fe₂O₃.'},
 {h:'La combustion de l’éthanol',p:'Équilibre C₂H₅OH + <i>b</i> O₂ → 2 CO₂ + 3 H₂O. Que vaut <i>b</i>&nbsp;?',lab:'b =',ans:3,
  why:'À droite : 2 × 2 + 3 = 7 atomes de O. L’éthanol en apporte déjà 1, il en faut 6 de O₂ : b = 3.'},
 {kind:'Théorie',h:'Avancement et réactif limitant',p:`<p>On mélange 3 mol de H₂ et 2 mol de O₂. Tout ne peut pas réagir : les proportions ne sont pas celles de l’équation. Qui s’arrête le premier, et combien d’eau obtient-on&nbsp;? Il faut une variable qui suit la réaction.</p>
<div class="def"><p>L’<b>avancement</b> ξ (xi, en mol) compte combien de fois « l’équation a eu lieu ». Pour 2 H₂ + O₂ → 2 H₂O, après un avancement ξ : n(H₂) = n₀(H₂) − 2ξ, n(O₂) = n₀(O₂) − ξ, n(H₂O) = 2ξ. Chaque espèce varie de son coefficient × ξ, en moins pour un réactif, en plus pour un produit. Le <b>réactif limitant</b> est celui qui s’épuise le premier ; il fixe <b>ξ<sub>max</sub> = min(n₀<sub>i</sub>/ν<sub>i</sub>)</b> sur les réactifs.</p></div>
<div class="why"><p>Une quantité de matière ne peut pas devenir négative. Le réactif i atteint zéro quand ξ = n₀<sub>i</sub>/ν<sub>i</sub> ; la réaction s’arrête au premier zéro, donc au plus petit de ces rapports. L’autre réactif est <b>en excès</b> : il en reste. Diviser par le coefficient est indispensable, car un réactif dont il faut deux molécules par « tour » s’use deux fois plus vite.</p></div>
<div class="ex"><p>3 mol de H₂ et 2 mol de O₂ : H₂ s’épuiserait à ξ = 3/2 = 1,5 mol, O₂ à ξ = 2/1 = 2 mol. ξ<sub>max</sub> = 1,5 mol, H₂ est limitant bien qu’on en ait plus de moles. Bilan final : H₂ 0, O₂ 2 − 1,5 = 0,5 mol, H₂O 2 × 1,5 = 3,0 mol.</p></div>
<p>Fais varier les quantités initiales et observe qui limite.</p>`,
  params:[{id:'h',l:'n₀(H₂)',min:0,max:6,step:.5,v:3,u:' mol'},{id:'o',l:'n₀(O₂)',min:0,max:4,step:.5,v:2,u:' mol'}],
  draw:v=>{ const x=Math.min(v.h/2,v.o), P=plane({x:[0,10],y:[0,8],h:200,grid:false,ly:2});
    [['H₂',v.h,v.h-2*x],['O₂',v.o,v.o-x],['H₂O',0,2*x]].forEach(([s,a,b],i)=>{ const X=1+i*3;
      P.rect(X,0,1,a,{fill:'var(--muted)',fo:.4,c:null}).rect(X+1.1,0,1,b,{fill:i===2?'var(--ok)':'var(--accent)',fo:.7,c:null}).text(X+1.05,0,s,{a:'middle',dy:-6}); });
    P.text(9.9,7.5,'gris : début · couleur : fin',{a:'end',s:10,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const x=Math.min(v.h/2,v.o); const lim=v.h/2<v.o?'H₂':v.h/2>v.o?'O₂':'aucun (proportions stœchiométriques)';
    return `ξ<sub>max</sub> = ${fmt(x,2)} mol · réactif limitant : <b>${lim}</b> · H₂O formée : ${fmt(2*x,1)} mol`; }},
 {kind:'Méthode',h:'Tableau d’avancement et réactif limitant',p:`<b>Quand :</b> on connaît les quantités initiales de plusieurs réactifs et on cherche ce qui reste ou ce qui se forme. <b>Pourquoi :</b> les coefficients fixent les proportions : quand ξ mol de « réaction » ont lieu, chaque espèce varie de son coefficient × ξ. La réaction s’arrête au premier réactif épuisé. <b>Comment :</b><ol><li>Équilibre l’équation et convertis les données en moles.</li><li>Écris le tableau : état initial n₀, en cours n₀ − ν·ξ pour un réactif, ν·ξ pour un produit.</li><li>Pour chaque réactif, calcule n₀/ν. Le plus petit donne <b>ξ<sub>max</sub></b> et désigne le <b>réactif limitant</b>.</li><li>Remplace ξ par ξ<sub>max</sub> dans la ligne finale.</li></ol>`,
  demo:{enonce:'On fait réagir 0,40 mol d’aluminium avec 0,45 mol de dichlore : 2 Al + 3 Cl₂ → 2 AlCl₃. Que contient le mélange final&nbsp;?',
   etapes:[{f:'n(Al) = 0,40 − 2ξ · n(Cl₂) = 0,45 − 3ξ · n(AlCl₃) = 2ξ',w:'Chaque espèce varie de son coefficient multiplié par l’avancement.'},
    {f:'Al : 0,40/2 = 0,20 · Cl₂ : 0,45/3 = 0,15',w:'Chaque rapport n₀/ν est l’avancement qui épuiserait ce réactif.'},
    {f:'ξ<sub>max</sub> = 0,15 mol → Cl₂ limitant',w:'La réaction s’arrête dès qu’un réactif est épuisé : on garde le plus petit.'},
    {f:'final : Al 0,40 − 0,30 = 0,10 mol · Cl₂ 0 · AlCl₃ 0,30 mol',w:'On remplace ξ par 0,15 dans chaque case de la dernière ligne.'}],
   conclusion:'Il se forme 0,30 mol de AlCl₃ et il reste 0,10 mol d’aluminium en excès.'},
  note:'Le réactif limitant n’est pas forcément celui dont on a le moins de moles : il faut diviser par les coefficients.'},
 {h:'Ce qui reste',p:'On fait réagir 4 mol de H₂ avec 3 mol de O₂ (2 H₂ + O₂ → 2 H₂O). Combien de moles de O₂ restent à la fin&nbsp;?',lab:'n(O₂) =',unit:'mol',ans:1,
  why:'ξ<sub>max</sub> = min(4/2 ; 3/1) = 2 mol : H₂ est limitant. Il reste 3 − 2 = 1 mol de O₂.'},
 {kind:'Méthode',h:'De la masse d’un réactif à la masse d’un produit',p:`<b>Quand :</b> on donne la masse (ou le volume) d’une espèce et on cherche la masse d’une autre espèce de la réaction. <b>Pourquoi :</b> l’équation parle en moles, pas en grammes : 1 g de réactif ne donne pas 1 g de produit. <b>Comment :</b> la chaîne <b>m₁ → n₁ → n₂ → m₂</b>.<ol><li>n₁ = m₁/M₁.</li><li>Rapport des coefficients : <b>n₂ = n₁ × ν₂/ν₁</b> (car n₁/ν₁ = n₂/ν₂ = ξ).</li><li>m₂ = n₂·M₂ (ou V = n₂RT/p pour un gaz).</li></ol>`,
  demo:{enonce:'Quelle masse de CO₂ produit la combustion complète de 22 g de propane (M = 44 g/mol) : C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O&nbsp;?',
   etapes:[{f:'n(C₃H₈) = 22 / 44 = 0,50 mol',w:'On passe en moles pour pouvoir utiliser l’équation.'},
    {f:'n(CO₂) = 0,50 × 3/1 = 1,5 mol',w:'Une molécule de propane donne 3 molécules de CO₂.'},
    {f:'m(CO₂) = 1,5 × 44 = 66 g',w:'On revient à la masse avec M(CO₂) = 44 g/mol.'}],
   conclusion:'22 g de propane donnent 66 g de CO₂ : trois fois plus, car le carbone se combine à l’oxygène de l’air.'}},
 {h:'L’eau de la combustion',p:'Quelle masse d’eau produit la combustion de ces mêmes 22 g de propane (C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O, M(H₂O) = 18 g/mol)&nbsp;?',lab:'m =',unit:'g',ans:36,tol:.1,
  why:'n(C₃H₈) = 0,50 mol, n(H₂O) = 0,50 × 4 = 2,0 mol, m = 2,0 × 18 = 36 g.'},
 {h:'Masse maximale',p:'Pour N₂ + 3 H₂ → 2 NH₃, on part de 28 g de N₂ et 9 g de H₂ (N : 14, H : 1 g/mol). Quelle masse maximale de NH₃ peut-on obtenir&nbsp;?',lab:'m =',unit:'g',ans:34,tol:.1,
  why:'n(N₂) = 28/28 = 1 mol, n(H₂) = 9/2 = 4,5 mol. ξ<sub>max</sub> = min(1 ; 4,5/3 = 1,5) = 1 mol, N₂ est limitant. n(NH₃) = 2 mol, soit 2 × 17 = 34 g.'},
 {kind:'Théorie',h:'Rendement et gaz',p:`<p>La stœchiométrie prédit une masse maximale. Au laboratoire, on en recueille presque toujours moins. Et si le produit est un gaz, on mesure un volume plutôt qu’une masse.</p>
<div class="def"><p>Le <b>rendement</b> compare ce qu’on obtient réellement à ce que l’équation permettait : <b>η = n<sub>obtenu</sub> / n<sub>max</sub> = m<sub>obtenue</sub> / m<sub>max</sub></b>, entre 0 et 1 (ou 0 et 100 %), où n<sub>max</sub> se calcule avec le <b>réactif limitant</b>.</p></div>
<div class="why"><p>Trois raisons font chuter η : la réaction peut être <b>incomplète</b> (elle s’arrête à un équilibre), des <b>réactions parasites</b> consomment une partie des réactifs (combustion qui donne un peu de CO), et on <b>perd</b> du produit au filtrage, au transvasement, au séchage. En revanche, η ne peut jamais dépasser 100 % : si c’est le cas, le produit est impur ou mal séché.</p></div>
<div class="ex"><p>On brûle 12 g de Mg (0,50 mol) dans un excès d’oxygène : 2 Mg + O₂ → 2 MgO. Maximum : 0,50 mol de MgO, soit 0,50 × 40 = 20 g. On en pèse 15 g : η = 15/20 = 0,75, soit 75 %, comme sur la figure.</p></div>
<div class="blk" data-t="Gaz"><p>Pour un gaz formé, on passe des moles au volume par <b>pV = nRT</b> : V = nRT/p. À 0 °C et 101,3 kPa, une mole occupe 22,4 L ; à 25 °C et 100 kPa, 24,8 L. Ainsi 0,25 mol de CO₂ à 25 °C et 100 kPa occupent 0,25 × 24,8 ≈ 6,2 L.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,4],h:110,grid:false,axes:false}); P.rect(0.5,1,9,1.6,{fill:'var(--muted)',fo:.2,c:'var(--ink)',w:1.5}).rect(0.5,1,6.75,1.6,{fill:'var(--ok)',fo:.6,c:null}).text(5,1.8,'η = 75 %',{a:'middle',dy:5}).text(0.5,2.6,'quantité obtenue / quantité maximale',{dy:-8,s:11,c:'var(--muted)'}); return P.svg(); })(),
  note:'Le rendement se calcule toujours à partir du réactif limitant, jamais du réactif en excès.'},
 {kind:'Méthode',h:'Calculer un rendement',p:`<b>Quand :</b> on compare la quantité réellement obtenue à celle que l’équation permettait, ou on prévoit une masse réelle à partir d’un rendement connu. <b>Pourquoi :</b> réactions incomplètes, pertes au filtrage, réactions parasites : on obtient presque toujours moins que le maximum théorique. <b>Comment :</b><ol><li>Trouve le réactif limitant et ξ<sub>max</sub>.</li><li>Calcule la quantité (ou masse) maximale du produit : n<sub>max</sub>.</li><li><b>η = n<sub>obtenu</sub>/n<sub>max</sub> = m<sub>obtenue</sub>/m<sub>max</sub></b>, entre 0 et 100 %.</li><li>À l’inverse, m<sub>obtenue</sub> = η × m<sub>max</sub>.</li></ol>`,
  demo:{enonce:'On brûle 12 g de magnésium (M = 24 g/mol) dans un excès de dioxygène : 2 Mg + O₂ → 2 MgO (M = 40 g/mol). On recueille 16 g de MgO. Quel est le rendement&nbsp;?',
   etapes:[{f:'n(Mg) = 12/24 = 0,50 mol, limitant',w:'O₂ est en excès : c’est le magnésium qui fixe le maximum.'},
    {f:'n<sub>max</sub>(MgO) = 0,50 mol → m<sub>max</sub> = 0,50 × 40 = 20 g',w:'2 Mg donnent 2 MgO : même nombre de moles.'},
    {f:'η = 16 / 20 = 0,80 = 80 %',w:'On compare l’obtenu au maximum, jamais au réactif en excès.'}],
   conclusion:'Le rendement vaut 80 %.'}},
 {h:'Le rendement',p:'Dans l’expérience précédente (34 g de NH₃ au maximum), on recueille 25,5 g de NH₃. Quel est le rendement en %&nbsp;?',lab:'η =',unit:'%',ans:75,tol:.1,
  why:'η = 25,5 / 34 = 0,75, soit 75 %.'},
 {h:'Prévoir avec le rendement',p:'On brûle 6,0 g de magnésium (M = 24 g/mol) : 2 Mg + O₂ → 2 MgO (M = 40 g/mol). Le rendement est de 80 %. Quelle masse de MgO recueille-t-on&nbsp;?',lab:'m =',unit:'g',ans:8,tol:.05,
  why:'n(Mg) = 0,25 mol, donc 0,25 mol de MgO au maximum, soit 10 g. Avec η = 0,80 : m = 0,80 × 10 = 8,0 g.'},
 {kind:'Défi',h:'Le gaz de la calcination',p:'On chauffe 10 g de CaCO₃ (M = 100 g/mol) : CaCO₃ → CaO + CO₂. Quel volume de CO₂ obtient-on à 298 K et 100 kPa (R = 8,314 J/(mol·K))&nbsp;? Arrondis au centième de litre.',lab:'V =',unit:'L',ans:2.48,tol:.02,
  why:'n(CO₂) = n(CaCO₃) = 10/100 = 0,10 mol. V = nRT/p = 0,10 × 8,314 × 298 / 100 000 = 2,48·10⁻³ m³ ≈ 2,48 L.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : stœchiométrie',p:`<div class="keep"><ul>
<li>Une équation équilibrée conserve chaque élément (et la masse) ; ses coefficients sont des proportions en molécules comme en moles. On ajuste les coefficients, jamais les indices.</li>
<li>Équilibrer : d’abord les éléments présents dans une seule espèce de chaque côté, l’élément seul (O₂) en dernier ; fractions permises puis multipliées.</li>
<li>Avancement ξ : réactif n₀ − ν·ξ, produit ν·ξ. Réactif limitant : le plus petit n₀/ν, qui donne ξ<sub>max</sub>. Ce n’est pas forcément celui dont on a le moins de moles.</li>
<li>Chaîne m₁ → n₁ → n₂ → m₂ : n₂ = n₁ × ν₂/ν₁, puis m₂ = n₂·M₂ ou V₂ = n₂RT/p pour un gaz.</li>
<li>Rendement η = n<sub>obtenu</sub>/n<sub>max</sub>, toujours calculé depuis le réactif limitant, jamais supérieur à 100 %.</li>
<li>Volume molaire : 22,4 L à 0 °C et 101,3 kPa, 24,8 L à 25 °C et 100 kPa ; sinon pV = nRT en unités SI.</li>
</ul></div>`},
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
 {kind:'Théorie',h:'Une réaction qui s’arrête avant la fin',p:`<p>En stœchiométrie, on supposait qu’une réaction avance jusqu’à épuiser le réactif limitant. Ce n’est pas toujours vrai. Dans un ballon fermé, le tétraoxyde de diazote N₂O₄ (incolore) donne du dioxyde d’azote NO₂ (roux) ; la couleur se fonce, puis se fige alors qu’il reste beaucoup de N₂O₄. Pourquoi la réaction s’arrête-t-elle sans manquer de rien&nbsp;?</p>
<div class="def"><p>Une réaction est <b>renversable</b> quand les produits peuvent aussi réagir entre eux pour redonner les réactifs. On l’écrit avec une double flèche : <b>N₂O₄ ⇌ 2 NO₂</b>. Le système atteint un <b>équilibre chimique</b> quand sa composition ne varie plus, alors que les deux réactions continuent.</p></div>
<div class="idea"><p>Deux réactions se font concurrence. La réaction directe ralentit à mesure que N₂O₄ s’épuise ; la réaction inverse accélère à mesure que NO₂ s’accumule, car deux NO₂ se rencontrent plus souvent. Quand les deux vitesses deviennent égales, chaque seconde il se forme autant de NO₂ qu’il en disparaît : la composition ne bouge plus. L’équilibre est <b>dynamique</b>, pas un arrêt.</p></div>
<div class="ex"><p>À 298 K, partant de 1,00 bar de N₂O₄, on mesure à l’équilibre p(N₂O₄) = 0,824 bar et p(NO₂) = 0,352 bar. Si l’on part plutôt de 2,00 bar de NO₂ pur dans le même ballon (le même nombre d’atomes), on aboutit au même mélange, par l’autre côté.</p></div>
<div class="warn"><p>À l’équilibre, réactifs et produits n’ont pas des concentrations égales : ce sont les <b>vitesses</b> des deux réactions qui sont égales.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,6],y:[0,1.1],h:170,grid:false,lx:1}); const vd=t=>1-0.6*(1-Math.exp(-t)), vi=t=>0.4*(1-Math.exp(-t));
    P.fn(vd,{from:0,to:6,c:'var(--sci)'}).fn(vi,{from:0,to:6,c:'var(--bad)'}).seg(3.5,0,3.5,1.05,{c:'var(--muted)',w:1,dash:true});
    P.text(0.2,0.95,'vitesse directe',{s:11,c:'var(--sci)'}).text(0.6,0.12,'vitesse inverse',{s:11,c:'var(--bad)'}).text(3.6,0.75,'équilibre : vitesses égales',{s:11,c:'var(--muted)'}).text(5.9,0.05,'t',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Le quotient réactionnel',p:`<p>Comment savoir, à partir d’une composition mesurée, si un mélange est à l’équilibre, et sinon dans quel sens il va évoluer&nbsp;? Il faut un nombre calculé à partir des concentrations qui prenne <b>toujours la même valeur</b> à l’équilibre, quel que soit le point de départ.</p>
<div class="def"><p>Pour <i>a</i>A + <i>b</i>B ⇌ <i>c</i>C + <i>d</i>D, le <b>quotient réactionnel</b> est <b>Q = (a<sub>C</sub><sup>c</sup>·a<sub>D</sub><sup>d</sup>) / (a<sub>A</sub><sup>a</sup>·a<sub>B</sub><sup>b</sup>)</b>. L’<b>activité</b> a vaut c/c° pour un soluté (c° = 1 mol/L), p/p° pour un gaz (p° = 1 bar), 1 pour un solide pur ou le solvant. À l’équilibre, Q prend une valeur fixe à une température donnée : la <b>constante d’équilibre K</b>.</p></div>
<div class="idea"><p>Les produits sont en haut : Q grandit quand la réaction avance. Diviser par c° ou p° rend Q sans unité. Un solide pur reste pur quelle que soit sa quantité : il ne déplace rien, son activité vaut 1. L’exposant compte chaque molécule : 2 HI, c’est HI + HI, donc deux facteurs [HI].</p></div>
<div class="ex"><p>H₂ + I₂ ⇌ 2 HI, K = 50. Partant de 1,0 mol/L de H₂ et 0,50 mol/L de I₂, on trouve à l’équilibre 0,533, 0,033 et 0,934 mol/L : Q = 0,934² / (0,533 × 0,033) ≈ 50. Partant de 1,0 mol/L de HI pur, on trouve [H₂] = [I₂] = 0,110 et [HI] = 0,780 mol/L : Q = 0,780² / 0,110² ≈ 50. Deux compositions très différentes, un seul K.</p></div>
<div class="warn"><p>Q &lt; K : il manque des produits, sens direct. Q &gt; K : il y en a trop, sens inverse. Q = K : équilibre.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,3],h:90,grid:false,axes:false}); P.text(5,1.5,'Q &lt; K → sens direct · Q = K → équilibre · Q &gt; K → sens inverse',{a:'middle',dy:5,s:11}); return P.svg(); })(),
  note:'K ne dépend que de la température. Les concentrations à l’équilibre, elles, dépendent des conditions initiales.'},
 {kind:'Méthode',h:'Écrire l’expression de K ou de Q',p:`<b>Quand :</b> au début de tout exercice d’équilibre. <b>Pourquoi :</b> chaque espèce intervient par son activité, élevée à la puissance de son coefficient ; les espèces dont l’activité vaut 1 disparaissent de l’expression. <b>Comment :</b><ol><li>Produits au numérateur, réactifs au dénominateur, en <b>produit</b> (jamais en somme).</li><li>Chaque terme est élevé à la puissance de son coefficient stœchiométrique.</li><li>Soluté : [X]/c° ; gaz : p(X)/p° ; <b>solide pur et solvant : 1</b>, on ne les écrit pas.</li></ol>`,
  demo:{enonce:'Écris K pour Zn(s) + 2 H₃O⁺(aq) ⇌ Zn²⁺(aq) + H₂(g) + 2 H₂O(l).',
   etapes:[{f:'numérateur : a(Zn²⁺)·a(H₂)·a(H₂O)² · dénominateur : a(Zn)·a(H₃O⁺)²',w:'On écrit d’abord la forme générale, avec les exposants.'},
    {f:'a(Zn) = 1 (solide) · a(H₂O) = 1 (solvant)',w:'Un solide pur ou le solvant ont une activité égale à 1.'},
    {f:`K = ${F('([Zn²⁺]/c°)·(p(H₂)/p°)','([H₃O⁺]/c°)²')}`,w:'Soluté en concentration sur c°, gaz en pression sur p°.'}],
   conclusion:'Le zinc et l’eau n’apparaissent pas dans K, et H₃O⁺ est au carré.'}},
 {h:'Écrire K',p:'Quelle est l’expression de K pour N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g), avec p° = 1 bar&nbsp;?',
  opts:[`${F('2 p(NH₃)','p(N₂) + 3 p(H₂)')}`,`${F('p(N₂)·p(H₂)³','p(NH₃)²')}`,`${F('p(NH₃)²','p(N₂) + p(H₂)³')}`,`${F('(p(NH₃)/p°)²','(p(N₂)/p°)·(p(H₂)/p°)³')}`],ans:3,
  why:'Produits au numérateur, réactifs au dénominateur, chaque activité élevée à son coefficient stœchiométrique, et on multiplie (on n’additionne pas).'},
 {kind:'Méthode',h:'Calculer Q et prévoir le sens d’évolution',p:`<b>Quand :</b> on connaît la composition d’un mélange hors équilibre et K, et on demande dans quel sens il va évoluer. <b>Pourquoi :</b> le système évolue toujours de façon que Q se rapproche de K. Si Q &lt; K, il manque des produits ; si Q &gt; K, il y en a trop. <b>Comment :</b><ol><li>Écris l’expression de Q (même forme que K).</li><li>Remplace par les concentrations ou pressions <b>actuelles</b>.</li><li>Compare : Q &lt; K sens direct, Q &gt; K sens inverse, Q = K équilibre.</li></ol>`,
  demo:{enonce:'Pour H₂(g) + I₂(g) ⇌ 2 HI(g), K = 50. Un mélange contient [H₂] = [I₂] = 0,10 mol/L et [HI] = 0,50 mol/L. Dans quel sens évolue-t-il&nbsp;?',
   etapes:[{f:`Q = ${F('[HI]²','[H₂]·[I₂]')}`,w:'Même expression que K, mais avec les valeurs du moment.'},
    {f:'Q = 0,50² / (0,10 × 0,10) = 0,25 / 0,010 = 25',w:'On remplace et on calcule.'},
    {f:'Q = 25 &lt; K = 50 → sens direct',w:'Q doit augmenter pour atteindre K : il faut former du HI.'}],
   conclusion:'Le mélange forme encore du HI jusqu’à ce que Q atteigne 50.'}},
 {h:'Le mélange roux',p:'Pour N₂O₄(g) ⇌ 2 NO₂(g), K = 0,15 (pressions en bar, p° = 1 bar). Un ballon contient p(N₂O₄) = 0,50 bar et p(NO₂) = 0,40 bar. Que se passe-t-il&nbsp;?',
  opts:['Q = 0,80 &gt; K : NO₂ se forme','Q = 0,32 &gt; K : NO₂ se recombine en N₂O₄','Q = 0,32 &gt; K : N₂O₄ se dissocie','Le mélange est à l’équilibre'],ans:1,
  why:'Q = p(NO₂)²/p(N₂O₄) = 0,16/0,50 = 0,32 &gt; 0,15 : il y a trop de produit, la réaction va dans le sens inverse, 2 NO₂ → N₂O₄.'},
 {kind:'Théorie',h:'ΔG = ΔG° + RT ln Q',p:`<p>Comparer Q à K donne le sens d’évolution. Mais d’où vient la valeur de K, et peut-on la prévoir sans faire l’expérience&nbsp;? La thermodynamique répond avec une seule grandeur.</p>
<div class="def"><p>L’<b>enthalpie libre de réaction</b> ΔG (en J/mol) mesure l’énergie « utilisable » que libère la réaction par mole d’avancement. Une réaction évolue spontanément dans le sens qui fait baisser l’enthalpie libre : <b>ΔG &lt; 0</b> sens direct, <b>ΔG &gt; 0</b> sens inverse, <b>ΔG = 0</b> équilibre. Elle dépend de la composition par <b>ΔG = ΔG° + RT ln Q</b>, où ΔG° (lire « delta G standard ») est sa valeur quand toutes les activités valent 1, donc Q = 1.</p></div>
<div class="idea"><p>Le terme RT ln Q traduit la composition. Un mélange riche en réactifs a Q petit, ln Q très négatif : il pousse vers l’avant. À mesure que la réaction avance, Q grandit et ΔG remonte jusqu’à 0. Sur la figure, ΔG est une droite en log₁₀ Q : il gagne RT ln 10 ≈ 5,7 kJ/mol par puissance de 10.</p></div>
<div class="why"><p>À l’équilibre, ΔG = 0 et Q = K : 0 = ΔG° + RT ln K, d’où <b>K = exp(−ΔG°/RT)</b>. Un ΔG° négatif donne K &gt; 1.</p></div>
<div class="ex"><p>Ici ΔG° = −20 kJ/mol et T = 298 K, donc RT = 2,478 kJ/mol. ln K = 20 / 2,478 ≈ 8,07 : K ≈ 3,2·10³ (log₁₀ K ≈ 3,5). Pour Q = 10⁻² : ΔG = −20 + 2,478 × ln 0,01 ≈ −31,4 kJ/mol, la réaction avance.</p></div>
<div class="warn"><p>Ne confonds pas ΔG° (un nombre fixe, qui donne K) et ΔG (qui change pendant la réaction). ΔG° &gt; 0 ne veut pas dire « impossible », seulement K &lt; 1.</p></div>`,
  params:[{id:'q',l:'log₁₀ Q',min:-6,max:8,step:.5,v:-2}],
  draw:v=>{ const g=x=>-20+R*298*Math.LN10/1000*x, P=plane({x:[-6.5,8.5],y:[-60,30],h:230,grid:false,lx:2,ly:20});
    P.fn(g,{from:-6.5,to:8.5}).dot(v.q,g(v.q),{c:g(v.q)<0?'var(--ok)':'var(--bad)'}).dot(3.506,0,{c:'var(--ink)',r:4,l:'K',dy:16});
    P.text(8.3,26,'ΔG (kJ/mol)',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const g=-20+R*298*Math.LN10/1000*v.q; return `Q = ${sci(10**v.q)} · ΔG = <b>${fmt(g,1)} kJ/mol</b> → ${Math.abs(g)<0.5?'équilibre':g<0?'évolution dans le sens direct':'évolution dans le sens inverse'}`; }},
 {kind:'Méthode',h:'Passer de ΔG° à K, et de Q à ΔG',p:`<b>Quand :</b> on donne une enthalpie libre standard et on demande K, ou on donne un mélange et on demande ΔG. <b>Pourquoi :</b> ΔG = ΔG° + RT ln Q s’annule à l’équilibre, ce qui relie ΔG° et K. <b>Comment :</b><ol><li>Convertis ΔG° en <b>J/mol</b> (R = 8,314 J/(mol·K)). Garde RT = 8,314 × 298 ≈ 2478 J/mol à 25 °C.</li><li><b>K = exp(−ΔG°/RT)</b> ; à l’inverse <b>ΔG° = −RT ln K</b>. Si on veut log₁₀ K : ln K / ln 10.</li><li>Pour un mélange : calcule Q, puis <b>ΔG = ΔG° + RT ln Q</b>.</li><li>Signe de ΔG : négatif sens direct, positif sens inverse.</li></ol>`,
  demo:{enonce:'Une réaction a ΔG° = +5,0 kJ/mol à 298 K. Calcule K, puis ΔG pour un mélange où Q = 0,010.',
   etapes:[{f:'ΔG°/RT = 5000 / 2478 ≈ 2,018',w:'On met ΔG° en J/mol pour qu’il ait la même unité que RT.'},
    {f:'K = e<sup>−2,018</sup> ≈ 0,133 · log₁₀ K = −2,018 / 2,303 ≈ −0,88',w:'ΔG° &gt; 0 donne K &lt; 1 : l’équilibre est du côté des réactifs, sans que la réaction soit impossible.'},
    {f:'RT ln Q = 2,478 × ln 0,010 ≈ 2,478 × (−4,605) ≈ −11,41 kJ/mol',w:'On revient en kJ/mol pour additionner à ΔG°.'},
    {f:'ΔG = 5,0 − 11,41 ≈ −6,41 kJ/mol &lt; 0 → sens direct',w:'Q = 0,010 &lt; K = 0,133 : le résultat est cohérent avec la comparaison de Q et K.'}],
   conclusion:'K ≈ 0,133 ; avec si peu de produits, la réaction avance pourtant dans le sens direct.'},
  note:'Erreur fréquente : mélanger kJ et J. ΔG° = −10 kJ/mol donne −ΔG°/RT = 10 000 / 2478, pas 10 / 2478.'},
 {kind:'Pratique',h:'Atteindre l’équilibre',p:'Avec la même réaction (ΔG° = −20 kJ/mol, 298 K), place Q à la valeur où la réaction n’évolue plus.',
  params:[{id:'q',l:'log₁₀ Q',min:-6,max:8,step:.5,v:0}],
  draw:v=>{ const g=x=>-20+R*298*Math.LN10/1000*x, P=plane({x:[-6.5,8.5],y:[-60,30],h:230,grid:false,lx:2,ly:20});
    P.fn(g,{from:-6.5,to:8.5}).dot(v.q,g(v.q),{c:'var(--spark)'}); return P.svg(); },
  info:v=>`ΔG = ${fmt(-20+R*298*Math.LN10/1000*v.q,1)} kJ/mol`,
  ok:v=>Math.abs(-20+R*298*Math.LN10/1000*v.q)<0.5,
  why:'ΔG = 0 quand ln Q = −ΔG°/RT = 20 000 / (8,314 × 298) ≈ 8,07, soit log₁₀ Q ≈ 3,5 : c’est log₁₀ K, K ≈ 3,2·10³.'},
 {kind:'Théorie',h:'Q tend vers K',p:`<p>Que fait Q au cours du temps&nbsp;? Prenons la réaction la plus simple, A ⇌ B en solution, partant de [A]₀ = 1 mol/L et [B]₀ = 0.</p>
<div class="def"><p>Chaque sens a sa vitesse : <b>v<sub>d</sub> = k<sub>d</sub>[A]</b> pour A → B et <b>v<sub>i</sub> = k<sub>i</sub>[B]</b> pour B → A. L’équilibre est atteint quand v<sub>d</sub> = v<sub>i</sub>, soit k<sub>d</sub>[A] = k<sub>i</sub>[B], donc <b>Q = [B]/[A] = k<sub>d</sub>/k<sub>i</sub> = K</b>.</p></div>
<div class="idea"><p>Au départ Q = 0 &lt; K : seule la réaction directe tourne. B s’accumule, la réaction inverse démarre, et Q monte sans jamais dépasser K : la montée ralentit à mesure que les deux vitesses se rapprochent. Plus K est grand, plus l’équilibre penche vers B. C’est le pont entre les deux visages de K : rapport de concentrations, et rapport de deux constantes de vitesse.</p></div>
<div class="ex"><p>Ici k<sub>d</sub> + k<sub>i</sub> = 1 s⁻¹. Avec K = 2, l’équilibre est [B] = 2/3 ≈ 0,667 et [A] ≈ 0,333 mol/L. À t = 0,5 s, [B] = 0,667 × (1 − e<sup>−0,5</sup>) ≈ 0,262 mol/L et Q ≈ 0,262 / 0,738 ≈ 0,36. À t = 3 s, Q ≈ 1,73, déjà proche de 2.</p></div>
<div class="warn"><p>L’approche est exponentielle : en théorie Q n’atteint jamais K, mais après 5 s l’écart à l’équilibre n’est plus que de 0,7 %. Fais avancer le temps et change K.</p></div>`,
  params:[{id:'K',l:'K',min:.5,max:4,step:.5,v:2},{id:'t',l:'t',min:0,max:5,step:.25,v:.5,u:' s'}],
  draw:v=>{ const be=v.K/(1+v.K), B=t=>be*(1-Math.exp(-t)), Q=t=>B(t)/(1-B(t)), P=plane({x:[0,5.2],y:[0,4.5],h:220,lab:1});
    P.seg(0,v.K,5.2,v.K,{c:'var(--spark)',w:2,dash:true}).text(5.1,v.K,'K',{a:'end',dy:-6,c:'var(--spark)'});
    P.fn(Q,{from:0,to:5.2}).dot(v.t,Q(v.t),{c:'var(--ink)'}); return P.svg(); },
  info:v=>{ const be=v.K/(1+v.K), b=be*(1-Math.exp(-v.t)); return `[A] = ${fmt(1-b,3)} · [B] = ${fmt(b,3)} mol/L · Q = <b>${fmt(b/(1-b),2)}</b> (K = ${fmt(v.K,1)})`; }},
 {h:'Calculer K',p:'Une réaction a ΔG° = −10 kJ/mol à 298 K. Calcule K (R = 8,314 J/(mol·K)), arrondi à l’unité.',lab:'K =',ans:56.6,tol:.6,
  why:'K = exp(−ΔG°/RT) = exp(10 000 / (8,314 × 298)) = exp(4,036) ≈ 57.'},
 {h:'Dans quel sens&nbsp;?',p:'Pour cette même réaction (ΔG° = −10 kJ/mol, 298 K), le mélange a Q = 100. Calcule ΔG en kJ/mol, arrondi au centième.',lab:'ΔG =',unit:'kJ/mol',ans:1.41,tol:.02,
  why:'ΔG = −10 + 8,314 × 298 × ln 100 / 1000 = −10 + 11,41 = +1,41 kJ/mol &gt; 0 : Q &gt; K, la réaction évolue dans le sens inverse.'},
 {kind:'Théorie',h:'Pourquoi un équilibre se déplace',p:`<p>Un équilibre installé ne bouge plus. Mais si l’on ajoute un réactif, comprime le mélange ou chauffe, la composition se remet à changer. Dans quel sens, et pourquoi&nbsp;?</p>
<div class="thm"><p><b>Principe de Le Chatelier.</b> Un système à l’équilibre qu’on perturbe évolue dans le sens qui <b>s’oppose</b> à la perturbation, jusqu’à un nouvel équilibre.</p></div>
<div class="why"><p>Ce n’est pas une loi de plus : c’est Q qui revient vers K. Il y a deux cas.</p>
<ul><li>Ajouter une espèce ou comprimer change <b>Q</b> sans changer K. Ajouter un réactif fait baisser Q : sens direct, ce qui consomme l’ajout. Multiplier toutes les pressions par f multiplie Q par f<sup>Δn</sup>, où Δn est le nombre de moles de gaz produites moins consommées.</li>
<li>Chauffer change <b>K</b> lui-même. La relation de van ’t Hoff, admise ici, donne ln(K₂/K₁) = (ΔH°/R)(1/T₁ − 1/T₂) : K augmente avec T si la réaction directe est endothermique (ΔH° &gt; 0).</li></ul></div>
<div class="ex"><p>N₂O₄ ⇌ 2 NO₂, K = 0,15 à 298 K, équilibre à 0,824 et 0,352 bar. On divise le volume par 2 : les pressions doublent, Q = 0,704² / 1,648 = 0,30 = 2K. Q &gt; K : NO₂ se recombine, le nombre de molécules de gaz baisse et la pression monte moins que prévu. On chauffe à 318 K (ΔH° ≈ +57 kJ/mol) : K est multiplié par exp[(57 000/8,314)(1/298 − 1/318)] ≈ 4,3 et passe à 0,64, le mélange rougit.</p></div>
<div class="warn"><p>Un catalyseur accélère les deux sens autant : il ne change ni Q ni K, et ne déplace rien. Ajouter un solide pur ne change pas Q non plus.</p></div>`},
 {kind:'Méthode',h:'Appliquer le principe de Le Chatelier',p:`<b>Quand :</b> on modifie un équilibre (ajout d’une espèce, pression, température, catalyseur) et on demande dans quel sens il se déplace. <b>Pourquoi :</b> la perturbation éloigne Q de K (ou change K si on chauffe) ; le système évolue pour ramener Q à K, ce qui revient à s’opposer à la perturbation. <b>Comment :</b><ol><li><b>Ajout</b> d’un réactif : Q diminue, sens direct. Ajout d’un produit : sens inverse. Un solide pur ne compte pas.</li><li><b>Compression</b> : compte les moles de gaz de chaque côté. Multiplier toutes les pressions par f multiplie Q par f<sup>Δn</sup>, avec Δn = n(gaz produits) − n(gaz réactifs). Le système va vers le côté qui a le moins de moles de gaz.</li><li><b>Chauffer</b> favorise le sens endothermique (ΔH &gt; 0) : K augmente si la réaction directe est endothermique, diminue si elle est exothermique.</li><li><b>Catalyseur</b> : aucun déplacement, l’équilibre est seulement atteint plus vite.</li></ol>`,
  demo:{enonce:'2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g), ΔH &lt; 0. Que fait l’équilibre si on ajoute du O₂, si on divise le volume par 2, puis si on chauffe&nbsp;?',
   etapes:[{f:'ajout de O₂ → Q diminue → sens direct',w:'O₂ est au dénominateur de Q.'},
    {f:'volume ÷ 2 : pressions × 2 → Q × 2<sup>2 − 3</sup> = Q/2 → sens direct',w:'3 moles de gaz donnent 2 moles : Δn = −1, Q passe sous K.'},
    {f:'chauffer → sens endothermique = sens inverse',w:'La réaction directe est exothermique, la réaction inverse absorbe donc la chaleur apportée ; K diminue.'}],
   conclusion:'Ajouter O₂ et comprimer favorisent SO₃ ; chauffer le défavorise.'}},
 {h:'Principe de Le Chatelier',p:`Un système à l’équilibre qu’on perturbe évolue de façon à <b>s’opposer</b> à la perturbation. Pour N₂ + 3 H₂ ⇌ 2 NH₃, exothermique (ΔH &lt; 0), quelle action augmente la quantité de NH₃ à l’équilibre&nbsp;?`,
  opts:['Augmenter la température','Diminuer la pression','Augmenter la pression','Ajouter un catalyseur'],ans:2,
  why:'4 mol de gaz donnent 2 mol : augmenter la pression favorise le côté qui a moins de moles de gaz, donc NH₃. Chauffer favorise le sens endothermique (inverse), et un catalyseur ne déplace pas l’équilibre.'},
 {h:'Le four à chaux',p:'CaCO₃(s) ⇌ CaO(s) + CO₂(g) est endothermique (ΔH &gt; 0). Quelle action augmente la quantité de CO₂ à l’équilibre&nbsp;?',
  opts:['Ajouter du CaCO₃ solide','Augmenter la pression','Chauffer','Ajouter un catalyseur'],ans:2,
  why:'Chauffer favorise le sens endothermique, ici le sens direct : K = p(CO₂)/p° augmente. Un solide pur n’apparaît pas dans K, comprimer favorise le côté sans gaz, et un catalyseur ne déplace rien.'},
 {kind:'Méthode',h:'Tableau ICE pour un équilibre',p:`<b>Quand :</b> on connaît K et l’état initial, on cherche la composition à l’équilibre. <b>Pourquoi :</b> les variations sont liées par les coefficients (comme en stœchiométrie) : une seule inconnue x suffit ; K fournit l’équation qui la fixe. <b>Comment :</b> trois lignes, <b>I</b>nitial, <b>C</b>hangement, <b>É</b>quilibre.<ol><li>I : concentrations (ou pressions) de départ.</li><li>C : −ν·x pour les réactifs, +ν·x pour les produits (dans le sens où la réaction avance, d’après Q et K).</li><li>É : I + C. Remplace dans l’expression de K.</li><li>Résous. Une équation du second degré ax² + bx + c = 0 a pour racines x = (−b ± √(b² − 4ac)) / (2a) : garde la seule qui donne des quantités positives.</li></ol>`,
  demo:{enonce:'H₂(g) + I₂(g) ⇌ 2 HI(g), K = 50. On part de [H₂]₀ = 1,0 mol/L, [I₂]₀ = 0,50 mol/L, sans HI. Trouve la composition à l’équilibre.',
   etapes:[{f:'I : 1,0 | 0,50 | 0 · C : −x | −x | +2x · É : 1,0 − x | 0,50 − x | 2x',w:'Q = 0 &lt; K : la réaction avance dans le sens direct. HI a le coefficient 2, il gagne 2x.'},
    {f:`${F('(2x)²','(1,0 − x)(0,50 − x)')} = 50`,w:'On remplace les concentrations d’équilibre dans K.'},
    {f:'4x² = 50(0,50 − 1,5x + x²) → 46x² − 75x + 25 = 0',w:'On développe et on regroupe pour obtenir la forme ax² + bx + c = 0.'},
    {f:'x = (75 ± √1025) / 92 → x ≈ 0,467 ou x ≈ 1,163',w:'Discriminant : 75² − 4 × 46 × 25 = 1025, √1025 ≈ 32,02.'},
    {f:'x = 1,163 donnerait [I₂] &lt; 0 → x ≈ 0,467',w:'On rejette la racine sans sens physique : x ne peut pas dépasser 0,50.'},
    {f:'[H₂] ≈ 0,533 · [I₂] ≈ 0,033 · [HI] ≈ 0,934 mol/L',w:'Contrôle : 0,934² / (0,533 × 0,033) ≈ 50 ✓.'}],
   conclusion:'Presque tout l’iode (le réactif en défaut) est transformé en HI.'}},
 {kind:'Défi',h:'Composition à l’équilibre',p:'Pour A ⇌ B en solution, K = 4. On part de [A]₀ = 1,0 mol/L et [B]₀ = 0. Quelle est [B] à l’équilibre&nbsp;?',lab:'[B] =',unit:'mol/L',ans:.8,tol:.005,
  why:'Avec [B] = x et [A] = 1 − x : x/(1 − x) = 4, donc x = 4 − 4x et x = 0,8 mol/L.'},
 {h:'La dissociation de PCl₅',p:'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), K = 0,040 (concentrations en mol/L). On part de [PCl₅]₀ = 0,20 mol/L. Quelle est [Cl₂] à l’équilibre&nbsp;? Au millième.',lab:'[Cl₂] =',unit:'mol/L',ans:.072,tol:.001,
  why:'ICE : x² / (0,20 − x) = 0,040, soit x² + 0,040x − 0,0080 = 0. x = (−0,040 + √(0,0016 + 0,032)) / 2 ≈ 0,0717 mol/L (l’autre racine est négative).'},
 {kind:'Méthode',h:'L’approximation de x petit',p:`<b>Quand :</b> dans un tableau ICE, K est très petit devant la concentration initiale (en pratique K/c₀ &lt; 10⁻³ environ). <b>Pourquoi :</b> la réaction avance à peine, donc c₀ − x ≈ c₀ ; on évite l’équation du second degré. Mais une approximation doit toujours être <b>vérifiée</b>. <b>Comment :</b><ol><li>Écris l’équation exacte, par exemple x²/(c₀ − x) = K.</li><li>Remplace c₀ − x par c₀ : x ≈ √(K·c₀).</li><li>Vérifie : x/c₀ &lt; 5 %. Si oui, l’approximation est acceptée.</li><li>Sinon, reviens à l’équation exacte et résous le second degré.</li></ol>`,
  demo:{enonce:'COCl₂(g) ⇌ CO(g) + Cl₂(g), K = 1,0·10⁻⁵ (concentrations en mol/L). On part de [COCl₂]₀ = 0,10 mol/L. Trouve [CO] à l’équilibre.',
   etapes:[{f:`${F('x²','0,10 − x')} = 1,0·10⁻⁵`,w:'Tableau ICE : COCl₂ perd x, CO et Cl₂ gagnent x chacun.'},
    {f:'x ≈ √(1,0·10⁻⁵ × 0,10) = √(1,0·10⁻⁶) = 1,0·10⁻³ mol/L',w:'K est 10 000 fois plus petit que c₀ : on néglige x devant 0,10.'},
    {f:'x/c₀ = 1,0·10⁻³ / 0,10 = 1 % &lt; 5 % ✓',w:'La vérification justifie l’approximation après coup.'},
    {f:'valeur exacte : 9,95·10⁻⁴ mol/L',w:'Le second degré donne un écart de 0,5 %, sans importance.'}],
   conclusion:'[CO] ≈ 1,0·10⁻³ mol/L : 1 % seulement du phosgène est dissocié.'},
  note:'Si la vérification donne plus de 5 %, l’approximation est refusée : il faut résoudre l’équation exacte.'},
 {h:'Un équilibre très peu avancé',p:'A ⇌ B + C en solution, K = 4,0·10⁻⁶. On part de [A]₀ = 0,25 mol/L. Quelle est [B] à l’équilibre&nbsp;? Donne-la en 10⁻³ mol/L, au dixième.',lab:'[B] =',unit:'·10⁻³ mol/L',ans:1,tol:.01,
  why:'x ≈ √(4,0·10⁻⁶ × 0,25) = √(1,0·10⁻⁶) = 1,0·10⁻³ mol/L. Vérification : x/c₀ = 0,4 % &lt; 5 %, l’approximation tient.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : équilibres',p:`<div class="keep"><ul>
<li>Une réaction renversable (⇌) atteint un équilibre dynamique : les vitesses directe et inverse sont égales, la composition ne varie plus.</li>
<li>Q = produit des activités des produits / produit des activités des réactifs, chacune à la puissance de son coefficient. Soluté c/c°, gaz p/p°, solide pur et solvant 1.</li>
<li>À l’équilibre Q = K, qui ne dépend que de T. Q &lt; K sens direct, Q &gt; K sens inverse.</li>
<li>ΔG = ΔG° + RT ln Q ; ΔG &lt; 0 sens direct. K = exp(−ΔG°/RT), ΔG° = −RT ln K, avec ΔG° en J/mol et RT ≈ 2478 J/mol à 298 K.</li>
<li>Le Chatelier : le système s’oppose à la perturbation. Ajout d’un réactif ou d’un produit, compression (Q × f<sup>Δn</sup>) : Q change. Chauffer : K change, en faveur du sens endothermique. Catalyseur : aucun effet sur l’équilibre.</li>
<li>Tableau ICE : une inconnue x, les variations ±ν·x, puis K donne l’équation ; garder la racine qui laisse toutes les quantités positives.</li>
<li>x petit : si K ≪ c₀, c₀ − x ≈ c₀, puis vérifier x/c₀ &lt; 5 %.</li>
</ul></div>`},
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
 {kind:'Théorie',h:'Dissoudre un sel : jusqu’où&nbsp;?',p:`<p>Verse du sel de cuisine dans un verre d’eau en remuant : il disparaît, puis à partir d’un moment les cristaux restent au fond. Avec du chlorure d’argent, presque rien ne se dissout. Qu’est-ce qui fixe cette limite&nbsp;?</p>
<div class="def"><p>La <b>solubilité</b> <i>s</i> d’un solide est la quantité maximale qu’on peut en dissoudre dans un litre de solution, à une température donnée, en mol/L (ou en g/L : s × M). Une solution qui a atteint cette limite, en contact avec du solide non dissous, est <b>saturée</b>.</p></div>
<div class="idea"><p>Pour dissoudre un cristal ionique, l’eau doit arracher les ions au réseau. Ses molécules polaires entourent chaque ion (l’extrémité O, négative, vers les cations ; les H vers les anions) : c’est l’<b>hydratation</b>, qui libère de l’énergie. Si elle compense l’énergie qui tient le réseau, le sel est soluble ; sinon, il l’est très peu.</p></div>
<div class="why"><p>La solution saturée est un <b>équilibre dynamique</b>, comme au chapitre précédent : des ions quittent le cristal et d’autres s’y redéposent, au même rythme. Ajouter du solide ne change rien, car un solide pur a une activité 1.</p></div>
<div class="ex"><p>À 25 °C, un litre d’eau dissout environ 360 g de NaCl, mais seulement 1,9 mg de AgCl (s = 1,34·10⁻⁵ mol/L, M = 143,4 g/mol) : près de 200 000 fois moins.</p></div>
<div class="warn"><p>« Insoluble » veut dire « très peu soluble » : il passe toujours un peu d’ions en solution, et c’est ce peu que la suite permet de calculer.</p></div>`},
 {kind:'Théorie',h:'Produit de solubilité',p:`<p>Pour un sel très peu soluble, la solubilité varie selon ce que contient déjà l’eau. Il faut la constante de l’équilibre de dissolution, qui, elle, ne bouge pas.</p>
<div class="def"><p>Pour AgCl(s) ⇌ Ag⁺ + Cl⁻, la constante d’équilibre s’appelle le <b>produit de solubilité</b> : <b>K<sub>s</sub> = [Ag⁺]·[Cl⁻] = 1,8·10⁻¹⁰</b> à 25 °C (concentrations en mol/L divisées par c°). Le <b>produit ionique</b> Q = [Ag⁺][Cl⁻] se calcule pour n’importe quel mélange.</p></div>
<div class="why"><p>Le solide n’apparaît pas dans K<sub>s</sub>, car son activité vaut 1. Si Q &lt; K<sub>s</sub>, la solution n’est pas saturée : le solide ajouté se dissout. Si Q &gt; K<sub>s</sub>, il y a trop d’ions : la réaction inverse l’emporte, un <b>précipité</b> se forme jusqu’à ce que Q retombe à K<sub>s</sub>.</p></div>
<div class="idea"><p>En logarithmes, la frontière log[Ag⁺] + log[Cl⁻] = log K<sub>s</sub> ≈ −9,74 est une droite de pente −1. Au-dessus : précipité ; en dessous : solution limpide.</p></div>
<div class="ex"><p>[Ag⁺] = 10⁻⁶ et [Cl⁻] = 10⁻⁵ mol/L : Q = 10⁻¹¹ &lt; 1,8·10⁻¹⁰, rien ne précipite. [Ag⁺] = 10⁻⁴ et [Cl⁻] = 10⁻⁵ : Q = 10⁻⁹ &gt; K<sub>s</sub>, AgCl précipite.</p></div>
<div class="warn"><p>Les exposants suivent la formule : pour PbCl₂, K<sub>s</sub> = [Pb²⁺][Cl⁻]². On ne compare deux K<sub>s</sub> que pour des sels de même type (1 : 1 avec 1 : 1). Déplace le point.</p></div>`,
  params:[{id:'a',l:'log₁₀ [Ag⁺]',min:-7,max:-2,step:.25,v:-6},{id:'c',l:'log₁₀ [Cl⁻]',min:-7,max:-2,step:.25,v:-5}],
  draw:v=>{ const lk=Math.log10(1.8e-10), P=plane({x:[-7.5,-1.5],y:[-7.5,-1.5],h:260,lab:1});
    P.poly([[-7.5,lk+7.5],[-1.5,lk+1.5],[-1.5,-1.5],[-7.5,-1.5]],{fill:'var(--bad)',fo:.15,c:null});
    P.fn(x=>lk-x,{c:'var(--ink)',w:2.5}).text(-2,-2.3,'précipité',{a:'end',c:'var(--bad)',s:12}).text(-7.3,-7,'solution limpide',{s:12,c:'var(--ok)'});
    P.dot(v.a,v.c,{c:v.a+v.c>lk?'var(--bad)':'var(--ok)'}); return P.svg(); },
  info:v=>{ const lk=Math.log10(1.8e-10), q=v.a+v.c; return `Q = ${sci(10**q)} ${q>lk?'&gt;':'&lt;'} K<sub>s</sub> → ${q>lk?'<b>AgCl précipite</b>':'pas de précipité'}`; },
  note:'Pour un sel A<sub>x</sub>B<sub>y</sub> de solubilité <i>s</i> : K<sub>s</sub> = (x·s)<sup>x</sup>·(y·s)<sup>y</sup>.'},
 {kind:'Méthode',h:'Calculer une solubilité à partir de K<sub>s</sub>',p:`<b>Quand :</b> on donne le K<sub>s</sub> d’un sel peu soluble et on demande sa solubilité <i>s</i> dans l’eau pure (en mol/L, ou en g/L avec la masse molaire). <b>Pourquoi :</b> chaque mole de sel dissous libère des ions dans les proportions de sa formule ; K<sub>s</sub> relie leurs concentrations. <b>Comment :</b><ol><li>Écris la dissolution : A<sub>x</sub>B<sub>y</sub>(s) ⇌ x A + y B.</li><li>Exprime les ions en fonction de s : [A] = x·s, [B] = y·s.</li><li>K<sub>s</sub> = (x·s)<sup>x</sup>·(y·s)<sup>y</sup> : n’oublie pas d’élever le coefficient aussi.</li><li>Isole s (racine carrée, cubique…). En g/L : s × M.</li></ol>`,
  demo:{enonce:'Calcule la solubilité du chromate d’argent Ag₂CrO₄ (K<sub>s</sub> = 1,1·10⁻¹²).',
   etapes:[{f:'Ag₂CrO₄(s) ⇌ 2 Ag⁺ + CrO₄²⁻',w:'Chaque unité dissoute libère deux ions argent et un ion chromate.'},
    {f:'[Ag⁺] = 2s · [CrO₄²⁻] = s',w:'On traduit les coefficients en concentrations.'},
    {f:'K<sub>s</sub> = (2s)²·s = 4s³',w:'Le 2 est élevé au carré avec s : c’est l’oubli le plus courant.'},
    {f:'s = ∛(1,1·10⁻¹² / 4) = ∛(2,75·10⁻¹³) ≈ 6,5·10⁻⁵ mol/L',w:'On isole s par une racine cubique.'}],
   conclusion:'s ≈ 6,5·10⁻⁵ mol/L. Ag₂CrO₄ est plus soluble que AgCl, alors que son K<sub>s</sub> est plus petit : on ne compare des K<sub>s</sub> que pour des sels de même formule type.'}},
 {h:'Solubilité de AgCl',p:'Calcule la solubilité <i>s</i> de AgCl dans l’eau pure (K<sub>s</sub> = 1,8·10⁻¹⁰). Donne la réponse en 10⁻⁵ mol/L, au centième.',lab:'s =',unit:'·10⁻⁵ mol/L',ans:1.34,tol:.01,
  why:'[Ag⁺] = [Cl⁻] = s, donc K<sub>s</sub> = s² et s = √(1,8·10⁻¹⁰) ≈ 1,34·10⁻⁵ mol/L.'},
 {h:'Un sel 1 : 2',p:'Calcule la solubilité de CaF₂ (K<sub>s</sub> = 3,9·10⁻¹¹). Donne la réponse en 10⁻⁴ mol/L, au centième.',lab:'s =',unit:'·10⁻⁴ mol/L',ans:2.14,tol:.02,
  why:'CaF₂ ⇌ Ca²⁺ + 2 F⁻ : [Ca²⁺] = s, [F⁻] = 2s, donc K<sub>s</sub> = s·(2s)² = 4s³ et s = ∛(3,9·10⁻¹¹ / 4) ≈ 2,14·10⁻⁴ mol/L.'},
 {kind:'Méthode',h:'Solubilité avec un ion commun',p:`<b>Quand :</b> on dissout un sel peu soluble dans une solution qui contient déjà l’un de ses ions. <b>Pourquoi :</b> l’ion déjà présent augmente Q ; d’après Le Chatelier, l’équilibre de dissolution recule et la solubilité baisse. <b>Comment :</b><ol><li>Écris les concentrations : l’ion commun vaut c + (coefficient)·s, l’autre ion (coefficient)·s.</li><li>Comme s est minuscule, approxime c + y·s ≈ c.</li><li>Résous l’équation simplifiée, puis <b>vérifie</b> que y·s est bien négligeable devant c.</li></ol>`,
  demo:{enonce:'Quelle est la solubilité de CaF₂ (K<sub>s</sub> = 3,9·10⁻¹¹) dans une solution de NaF à 0,10 mol/L&nbsp;?',
   etapes:[{f:'[Ca²⁺] = s · [F⁻] = 0,10 + 2s',w:'Les ions F⁻ viennent à la fois de NaF et de la dissolution de CaF₂.'},
    {f:'K<sub>s</sub> = s·(0,10 + 2s)² ≈ s × 0,010',w:'Dans l’eau pure s ≈ 2·10⁻⁴ mol/L ; ici il sera encore plus petit, donc 2s ≪ 0,10.'},
    {f:'s = 3,9·10⁻¹¹ / 0,010 = 3,9·10⁻⁹ mol/L',w:'L’équation est maintenant du premier degré.'},
    {f:'2s = 7,8·10⁻⁹ ≪ 0,10 ✓',w:'L’approximation est largement justifiée.'}],
   conclusion:'s = 3,9·10⁻⁹ mol/L, environ 55 000 fois moins que dans l’eau pure (2,1·10⁻⁴ mol/L).'}},
 {h:'Effet d’ion commun',p:'On dissout AgCl dans une solution de NaCl à 0,10 mol/L. Que devient la solubilité de AgCl&nbsp;?',
  opts:['Elle augmente','Elle ne change pas','Elle tombe à environ 1,8·10⁻⁹ mol/L','Elle devient nulle'],ans:2,
  why:'[Cl⁻] ≈ 0,10 mol/L est imposé, donc s = [Ag⁺] = K<sub>s</sub>/0,10 = 1,8·10⁻⁹ mol/L : environ 7 000 fois moins que dans l’eau pure (Le Chatelier).'},
 {h:'Dans le nitrate d’argent',p:'Calcule la solubilité de AgCl (K<sub>s</sub> = 1,8·10⁻¹⁰) dans une solution de nitrate d’argent AgNO₃ à 0,010 mol/L. Donne-la en 10⁻⁸ mol/L, au dixième.',lab:'s =',unit:'·10⁻⁸ mol/L',ans:1.8,tol:.01,
  why:'[Ag⁺] ≈ 0,010 mol/L et [Cl⁻] = s : s = K<sub>s</sub>/0,010 = 1,8·10⁻⁸ mol/L. Vérification : s ≪ 0,010.'},
 {kind:'Méthode',h:'Prévoir un précipité en mélangeant deux solutions',p:`<b>Quand :</b> on mélange deux solutions qui contiennent chacune un ion d’un sel peu soluble. <b>Pourquoi :</b> le précipité apparaît si le produit ionique Q dépasse K<sub>s</sub> ; mais le mélange <b>dilue</b> chaque ion, il faut en tenir compte. <b>Comment :</b><ol><li>Volume total V = V₁ + V₂.</li><li>Concentration de chaque ion juste après mélange : c = c<sub>initiale</sub> × V<sub>apporté</sub>/V (c’est une dilution).</li><li>Q = [A]<sup>x</sup>[B]<sup>y</sup>, avec les mêmes exposants que K<sub>s</sub>.</li><li>Q &gt; K<sub>s</sub> : précipité ; Q ≤ K<sub>s</sub> : solution limpide.</li></ol>`,
  demo:{enonce:'On mélange 50 mL de Pb(NO₃)₂ à 0,010 mol/L et 50 mL de NaCl à 0,010 mol/L. PbCl₂ (K<sub>s</sub> = 1,7·10⁻⁵) précipite-t-il&nbsp;?',
   etapes:[{f:'V = 100 mL',w:'Chaque ion se retrouve dans le volume total.'},
    {f:'[Pb²⁺] = 0,010 × 50/100 = 0,0050 · [Cl⁻] = 0,0050 mol/L',w:'Chaque solution est diluée deux fois par l’autre.'},
    {f:'Q = [Pb²⁺][Cl⁻]² = 0,0050 × 0,0050² = 1,25·10⁻⁷',w:'K<sub>s</sub> = [Pb²⁺][Cl⁻]² car PbCl₂ libère deux Cl⁻ : même exposant dans Q.'},
    {f:'Q = 1,25·10⁻⁷ &lt; K<sub>s</sub> = 1,7·10⁻⁵ → pas de précipité',w:'On compare Q au produit de solubilité.'}],
   conclusion:'La solution reste limpide : PbCl₂ est assez soluble à ces concentrations.'}},
 {h:'Deux gouttes de trop',p:'On mélange 10 mL de AgNO₃ à 1,0·10⁻⁴ mol/L et 10 mL de NaCl à 1,0·10⁻⁴ mol/L. AgCl (K<sub>s</sub> = 1,8·10⁻¹⁰) précipite-t-il&nbsp;?',
  opts:['Non, car Q = 1,0·10⁻⁸ est inférieur à K<sub>s</sub>','Oui, car Q = 2,5·10⁻⁹ dépasse K<sub>s</sub>','Non, car les solutions sont trop diluées pour précipiter','Oui, car Q = 1,0·10⁻⁴ dépasse K<sub>s</sub>'],ans:1,
  why:'Après mélange, [Ag⁺] = [Cl⁻] = 1,0·10⁻⁴ × 10/20 = 5,0·10⁻⁵ mol/L. Q = (5,0·10⁻⁵)² = 2,5·10⁻⁹ &gt; 1,8·10⁻¹⁰ : AgCl précipite.'},
 {kind:'Méthode',h:'Calculer la quantité qui précipite',p:`<b>Quand :</b> Q dépasse largement K<sub>s</sub> et on demande la masse de précipité ou ce qui reste en solution. <b>Pourquoi :</b> K<sub>s</sub> est si petit que la précipitation est presque totale : c’est un réactif limitant comme en stœchiométrie, à une correction près. <b>Comment :</b><ol><li>Repère l’ion en défaut (le « limitant ») : il précipite presque entièrement.</li><li>L’ion en excès garde sa concentration moins la quantité précipitée.</li><li>L’ion limitant restant vaut K<sub>s</sub> / [ion en excès] (pour un sel 1 : 1).</li><li>Quantité précipitée = quantité initiale de l’ion limitant − ce qui reste ; masse = n × M.</li></ol>`,
  demo:{enonce:'1,0 L de solution contient [Ag⁺] = 1,0·10⁻² mol/L. On y ajoute 4,0·10⁻³ mol de Cl⁻ sans changer le volume. Quelle masse de AgCl (M = 143,4 g/mol) précipite&nbsp;?',
   etapes:[{f:'Cl⁻ en défaut : 4,0·10⁻³ &lt; 1,0·10⁻² mol',w:'C’est lui qui limite la précipitation.'},
    {f:'[Ag⁺] restant ≈ 1,0·10⁻² − 4,0·10⁻³ = 6,0·10⁻³ mol/L',w:'Chaque Cl⁻ qui précipite emporte un Ag⁺.'},
    {f:'[Cl⁻] restant = 1,8·10⁻¹⁰ / 6,0·10⁻³ = 3,0·10⁻⁸ mol/L',w:'La solution reste saturée : [Ag⁺][Cl⁻] = K<sub>s</sub>.'},
    {f:'n(AgCl) = 4,0·10⁻³ − 3,0·10⁻⁸ ≈ 4,0·10⁻³ mol → m ≈ 0,574 g',w:'La correction est négligeable : la précipitation est quasi totale.'}],
   conclusion:'Il précipite 0,574 g de AgCl et il ne reste que 3,0·10⁻⁸ mol/L de chlorure.'}},
 {h:'Ce qui reste en solution',p:'1,0 L de solution contient [Cl⁻] = 5,0·10⁻³ mol/L. On y ajoute 2,0·10⁻³ mol de Ag⁺ (volume inchangé). Quelle concentration de Ag⁺ reste-t-il après précipitation de AgCl (K<sub>s</sub> = 1,8·10⁻¹⁰)&nbsp;? Donne-la en 10⁻⁸ mol/L, au dixième.',lab:'[Ag⁺] =',unit:'·10⁻⁸ mol/L',ans:6,tol:.05,
  why:'Ag⁺ est en défaut et précipite presque entièrement : [Cl⁻] ≈ 5,0·10⁻³ − 2,0·10⁻³ = 3,0·10⁻³ mol/L, donc [Ag⁺] = 1,8·10⁻¹⁰ / 3,0·10⁻³ = 6,0·10⁻⁸ mol/L.'},
 {kind:'Théorie',h:'Pourquoi un soluté retarde le gel',p:`<p>L’eau de mer gèle vers −2 °C, et le sel répandu sur une route fait fondre la glace. Le sel ne réchauffe rien : comment peut-il déplacer la température de fusion&nbsp;?</p>
<div class="idea"><p>À 0 °C, glace et eau pure coexistent : chaque seconde, autant de molécules quittent la glace qu’il en rejoint. Dissous un soluté dans le liquide : à la surface de la glace, une partie des places voisines est occupée par des particules dissoutes, qui ne rejoignent pas le cristal. Moins de molécules d’eau s’y fixent, alors que la glace, restée pure, fond toujours au même rythme : elle fond. Pour retrouver l’équilibre, il faut ralentir la fonte, donc refroidir. Le même argument vaut pour l’évaporation : le soluté gêne le départ des molécules d’eau, la vapeur est moins abondante et il faut chauffer plus pour bouillir.</p></div>
<div class="def"><p>Une propriété est <b>colligative</b> quand elle ne dépend que du <b>nombre</b> de particules dissoutes, pas de leur nature. La <b>loi de Raoult</b> en donne le principe : la pression de vapeur du solvant vaut <b>p = x<sub>solvant</sub>·p*</b>, où x<sub>solvant</sub> est sa fraction molaire et p* la pression de vapeur du solvant pur.</p></div>
<div class="ex"><p>1 mol de glucose dans 1 kg d’eau (55,5 mol) : x<sub>eau</sub> = 55,5 / 56,5 ≈ 0,982. À 25 °C, p* = 3,17 kPa, donc p ≈ 0,982 × 3,17 ≈ 3,11 kPa, soit 1,8 % de moins.</p></div>
<div class="warn"><p>On compte les <b>particules</b>, pas les unités de formule : 1 mol de NaCl libère 2 mol d’ions et agit deux fois plus que 1 mol de glucose.</p></div>`},
 {kind:'Théorie',h:'Propriétés colligatives',p:`<p>L’idée précédente donne le sens de l’effet. Pour calculer de combien la température change, il faut une loi chiffrée et la bonne façon de compter le soluté.</p>
<div class="def"><p>Pour une solution diluée : <b>ΔT<sub>fus</sub> = i·K<sub>f</sub>·b</b> (abaissement de la température de fusion) et <b>ΔT<sub>éb</sub> = i·K<sub>éb</sub>·b</b> (élévation de la température d’ébullition). La <b>molalité</b> b est la quantité de soluté par kilogramme de <b>solvant</b> (mol/kg). Le <b>facteur de van ’t Hoff</b> i est le nombre de particules libérées par unité dissoute : 1 pour le glucose, 2 pour NaCl, 3 pour CaCl₂. Pour l’eau : K<sub>f</sub> = 1,86 et K<sub>éb</sub> = 0,512 K·kg/mol.</p></div>
<div class="why"><p>Aux faibles concentrations, l’abaissement de pression de vapeur est proportionnel à la fraction de particules dissoutes, elle-même proportionnelle à i·b. Les constantes K<sub>f</sub> et K<sub>éb</sub> ne dépendent que du solvant. On utilise la molalité plutôt que la concentration, car une masse de solvant ne varie pas avec la température.</p></div>
<div class="ex"><p>Glucose à b = 1 mol/kg : ΔT<sub>fus</sub> = 1,86 K, l’eau gèle à −1,86 °C et bout à 100,51 °C. NaCl à la même molalité (i = 2) : gel à −3,72 °C, ébullition à 101,02 °C.</p></div>
<div class="warn"><p>Ces lois supposent une solution diluée et idéale ; au-delà de 1 mol/kg environ, l’effet réel est un peu plus faible. Fais varier b et i.</p></div>`,
  params:[{id:'b',l:'molalité b',min:0,max:3,step:.25,v:1,u:' mol/kg'},{id:'i',l:'i',min:1,max:3,v:1}],
  draw:v=>{ const df=v.i*1.86*v.b, de=v.i*0.512*v.b, P=plane({x:[0,10],y:[0,18],h:200,grid:false,ly:4});
    P.rect(2,0,2,df,{fill:'var(--sci)',fo:.6,c:null}).rect(6,0,2,de,{fill:'var(--bad)',fo:.6,c:null});
    P.text(3,0,'ΔT fusion',{a:'middle',dy:-6,s:11}).text(7,0,'ΔT ébullition',{a:'middle',dy:-6,s:11}).text(9.9,17,'K',{a:'end',s:11,c:'var(--muted)'});
    return P.svg(); },
  info:v=>`L’eau gèle à <b>${fmt(-v.i*1.86*v.b,2)} °C</b> et bout à <b>${fmt(100+v.i*0.512*v.b,2)} °C</b> · pression osmotique (c ≈ b) : Π = icRT ≈ ${fmt(v.i*v.b*R*298/100,1)} bar à 298 K`,
  note:'La <b>pression osmotique</b> Π = i·c·RT est la pression qu’il faut exercer pour empêcher le solvant de traverser une membrane semi-perméable vers la solution concentrée.'},
 {kind:'Méthode',h:'Calculer un abaissement cryoscopique',p:`<b>Quand :</b> on cherche la température de fusion ou d’ébullition d’une solution, ou la quantité de soluté qui la fixe. <b>Pourquoi :</b> l’effet est proportionnel au nombre de particules dissoutes par kilogramme de solvant, quelle que soit leur nature. <b>Comment :</b><ol><li><b>Facteur i</b> : nombre de particules libérées par unité dissoute (glucose 1, NaCl 2, CaCl₂ 3, Al₂(SO₄)₃ 5).</li><li><b>Molalité</b> b = n(soluté) / m(solvant en kg) ; attention, c’est la masse du solvant, pas de la solution.</li><li>ΔT = i·K·b, avec K<sub>f</sub> (fusion) ou K<sub>éb</sub> (ébullition).</li><li>Fusion : T = 0 °C − ΔT. Ébullition : T = 100 °C + ΔT. Pour l’inverse : b = ΔT/(i·K), puis m = b × m<sub>solvant</sub> × M.</li></ol>`,
  demo:{enonce:'Quelle masse d’éthylène glycol (antigel, M = 62 g/mol, i = 1) faut-il dissoudre dans 1,0 kg d’eau pour qu’elle gèle à −10 °C&nbsp;? (K<sub>f</sub> = 1,86 K·kg/mol)',
   etapes:[{f:'ΔT = 10 K',w:'On passe de 0 °C à −10 °C.'},
    {f:'b = ΔT / (i·K<sub>f</sub>) = 10 / 1,86 ≈ 5,38 mol/kg',w:'On isole la molalité dans ΔT = i·K<sub>f</sub>·b ; le glycol ne se dissocie pas (i = 1).'},
    {f:'n = 5,38 × 1,0 = 5,38 mol',w:'La molalité se rapporte à 1,0 kg de solvant.'},
    {f:'m = 5,38 × 62 ≈ 333 g',w:'On convertit en masse.'}],
   conclusion:'Il faut environ 333 g de glycol par kilogramme d’eau.'}},
 {h:'Le facteur de van ’t Hoff',p:'Quel est le facteur <i>i</i> du sulfate d’aluminium Al₂(SO₄)₃, supposé totalement dissocié&nbsp;?',opts:['2','3','5','17'],ans:2,
  why:'Al₂(SO₄)₃ → 2 Al³⁺ + 3 SO₄²⁻ : 2 + 3 = 5 particules par unité dissoute.'},
 {h:'Saler la route',p:'On dissout du NaCl dans l’eau à la molalité 1,0 mol/kg (i = 2, K<sub>f</sub> = 1,86 K·kg/mol). À quelle température l’eau gèle-t-elle&nbsp;? Au centième.',lab:'T =',unit:'°C',ans:-3.72,tol:.02,
  why:'ΔT = i·K<sub>f</sub>·b = 2 × 1,86 × 1,0 = 3,72 K. L’eau gèle à −3,72 °C.'},
 {kind:'Théorie',h:'L’osmose',p:`<p>Une tranche de concombre dans de l’eau salée ramollit ; un globule rouge dans de l’eau pure gonfle et éclate. Dans les deux cas, de l’eau traverse une paroi. Qu’est-ce qui la pousse&nbsp;?</p>
<div class="def"><p>Une <b>membrane semi-perméable</b> laisse passer les molécules de solvant mais pas les particules dissoutes. L’<b>osmose</b> est le passage du solvant à travers elle, du côté le moins concentré vers le côté le plus concentré. La <b>pression osmotique</b> Π est la surpression qu’il faut appliquer à la solution pour arrêter ce passage : <b>Π = i·c·R·T</b>, avec c en mol/m³ et Π en Pa.</p></div>
<div class="idea"><p>C’est le même mécanisme que pour le gel : côté solution, une partie des molécules qui frappent la membrane sont des particules dissoutes qui ne passent pas. Le flux d’eau du côté pur vers la solution l’emporte donc sur le flux inverse. Une pression sur la solution pousse ses molécules d’eau plus fort et rétablit l’égalité.</p></div>
<div class="why"><p>La formule a la forme du gaz parfait, p = (n/V)·RT : les particules dissoutes, très diluées, se comportent comme les molécules d’un gaz dans le volume de solvant.</p></div>
<div class="ex"><p>Saccharose à 0,020 mol/L = 20 mol/m³ à 298 K : Π = 20 × 8,314 × 298 ≈ 49 600 Pa, soit 49,6 kPa. C’est la pression au pied d’une colonne d’eau de 49 600 / (1000 × 9,81) ≈ 5,1 m : une solution à peine sucrée peut faire monter l’eau de plusieurs mètres dans un tube.</p></div>
<div class="warn"><p>Le solvant va vers la solution la plus <b>concentrée</b>, pas l’inverse. En appliquant une pression supérieure à Π, on inverse le flux : c’est l’osmose inverse, qui dessale l’eau de mer.</p></div>`},
 {kind:'Méthode',h:'Calculer une pression osmotique',p:`<b>Quand :</b> membranes, cellules, perfusions, dessalement. <b>Pourquoi :</b> les particules dissoutes se comportent comme un gaz parfait : Π = i·c·RT a la même forme que p = (n/V)RT. <b>Comment :</b><ol><li>Détermine i.</li><li>Convertis c en <b>mol/m³</b> : 1 mol/L = 1000 mol/m³.</li><li>Π = i·c·R·T, en Pa ; divise par 1000 pour des kPa, par 10⁵ pour des bar.</li></ol>`,
  demo:{enonce:'Quelle est la pression osmotique d’un sérum physiologique, NaCl à 0,15 mol/L, à 37 °C&nbsp;?',
   etapes:[{f:'i = 2 · T = 37 + 273 = 310 K',w:'NaCl libère Na⁺ et Cl⁻ ; la température doit être en kelvins.'},
    {f:'c = 0,15 mol/L = 150 mol/m³',w:'Avec R en J/(mol·K), on obtient des Pa seulement si c est en mol/m³.'},
    {f:'Π = 2 × 150 × 8,314 × 310 ≈ 773 000 Pa ≈ 773 kPa',w:'On applique la formule.'}],
   conclusion:'Π ≈ 773 kPa, soit 7,7 bar : la même que celle du sang, d’où le nom de solution isotonique.'}},
 {h:'Pression osmotique',p:'Quelle est la pression osmotique d’une solution de glucose à 0,10 mol/L à 298 K (R = 8,314 J/(mol·K))&nbsp;? Arrondis au kPa.',lab:'Π =',unit:'kPa',ans:248,tol:1,
  why:'Π = cRT avec c = 0,10 mol/L = 100 mol/m³ : Π = 100 × 8,314 × 298 ≈ 247 800 Pa ≈ 248 kPa, soit près de 2,5 bar.'},
 {kind:'Défi',h:'Ébullioscopie',p:'On dissout 18 g de glucose (M = 180 g/mol) dans 500 g d’eau (K<sub>éb</sub> = 0,512 K·kg/mol). De combien la température d’ébullition augmente-t-elle&nbsp;? Au millième de kelvin.',lab:'ΔT =',unit:'K',ans:.102,tol:.001,
  why:'n = 18/180 = 0,10 mol, b = 0,10 / 0,500 kg = 0,20 mol/kg. ΔT = 1 × 0,512 × 0,20 ≈ 0,102 K.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : solutions',p:`<div class="keep"><ul>
<li>Solubilité s : quantité maximale dissoute par litre (mol/L, ou g/L = s × M). Une solution saturée est un équilibre dynamique avec le solide.</li>
<li>Produit de solubilité : pour A<sub>x</sub>B<sub>y</sub>(s) ⇌ x A + y B, K<sub>s</sub> = [A]<sup>x</sup>[B]<sup>y</sup> = (x·s)<sup>x</sup>(y·s)<sup>y</sup> dans l’eau pure. Le solide n’apparaît pas.</li>
<li>Q &gt; K<sub>s</sub> : précipité ; Q ≤ K<sub>s</sub> : solution limpide. Après un mélange, calculer d’abord les concentrations diluées dans le volume total.</li>
<li>Ion commun : la solubilité baisse fortement (Le Chatelier) ; on approxime c + y·s ≈ c et on vérifie.</li>
<li>Précipitation : l’ion en défaut précipite presque entièrement ; ce qui en reste vaut K<sub>s</sub> / [ion en excès].</li>
<li>Propriétés colligatives : seul compte le nombre de particules. ΔT<sub>fus</sub> = i·K<sub>f</sub>·b, ΔT<sub>éb</sub> = i·K<sub>éb</sub>·b, b en mol par kg de solvant ; eau : K<sub>f</sub> = 1,86 et K<sub>éb</sub> = 0,512 K·kg/mol.</li>
<li>Osmose : le solvant va vers la solution la plus concentrée ; Π = i·c·RT avec c en mol/m³ et T en K.</li>
</ul></div>`},
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
 {kind:'Théorie',h:'Acides et bases selon Brønsted',p:`<p>Le vinaigre, le jus de citron et l’acide chlorhydrique ont un goût aigre et attaquent le calcaire ; la soude et l’ammoniac sont glissants et neutralisent les acides. Qu’ont en commun toutes ces substances, au niveau des molécules&nbsp;?</p>
<div class="def"><p>Selon <b>Brønsted</b>, un <b>acide</b> est une espèce qui peut céder un proton H⁺, une <b>base</b> une espèce qui peut en capter un. Un acide HA et la base A⁻ qu’il donne en perdant son proton forment un <b>couple acide-base</b>, noté HA/A⁻ ; A⁻ est la <b>base conjuguée</b> de HA.</p></div>
<div class="idea"><p>Un proton nu n’existe pas en solution : il passe toujours d’une molécule à une autre. Une réaction acide-base est un <b>transfert de proton</b> entre deux couples. Dans l’eau, c’est l’eau qui sert de partenaire : avec un acide, elle capte le proton et devient l’ion <b>oxonium H₃O⁺</b> ; avec une base, elle le cède et devient l’ion <b>hydroxyde OH⁻</b>.</p></div>
<div class="ex"><p>CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺ : l’acide acétique (couple CH₃COOH/CH₃COO⁻) donne son proton à l’eau (couple H₃O⁺/H₂O). NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ : l’ammoniac (couple NH₄⁺/NH₃) arrache un proton à l’eau (couple H₂O/OH⁻).</p></div>
<div class="why"><p>L’eau joue l’acide dans un cas, la base dans l’autre : elle est <b>amphotère</b>. Elle réagit même sur elle-même, 2 H₂O ⇌ H₃O⁺ + OH⁻ (autoprotolyse), très peu : il y a donc toujours un peu de H₃O⁺ et de OH⁻ dans l’eau.</p></div>
<div class="warn"><p>Pour trouver la base conjuguée, on retire un H⁺ : la charge baisse de 1 (NH₄⁺ → NH₃, H₂O → OH⁻). On n’enlève pas un H, ni un OH.</p></div>`},
 {kind:'Théorie',h:'L’échelle de pH',p:`<p>La concentration en H₃O⁺ va de 1 mol/L dans un acide concentré à 10⁻¹⁴ mol/L dans une base concentrée. Comparer 0,000 000 1 et 0,000 000 000 01 est malcommode : on utilise une échelle logarithmique.</p>
<div class="def"><p>Le <b>pH</b> d’une solution aqueuse est <b>pH = −log₁₀[H₃O⁺]</b>, avec [H₃O⁺] en mol/L. Inversement, [H₃O⁺] = 10<sup>−pH</sup>. L’autoprotolyse de l’eau a pour constante le <b>produit ionique</b> <b>K<sub>e</sub> = [H₃O⁺][OH⁻] = 10⁻¹⁴</b> à 25 °C, valable dans toute solution aqueuse.</p></div>
<div class="idea"><p>Le signe moins rend le pH positif ; le logarithme compte les puissances de 10. Un pH plus petit veut dire plus de H₃O⁺. Comme le produit [H₃O⁺][OH⁻] est fixé, quand l’un monte, l’autre descend.</p></div>
<div class="why"><p>Dans l’eau pure, l’autoprotolyse forme autant de H₃O⁺ que de OH⁻ : [H₃O⁺]² = 10⁻¹⁴, [H₃O⁺] = 10⁻⁷ mol/L, pH = 7. Une solution est <b>neutre</b> si [H₃O⁺] = [OH⁻], <b>acide</b> si [H₃O⁺] &gt; [OH⁻] (pH &lt; 7), <b>basique</b> sinon.</p></div>
<div class="ex"><p>À pH 3 : [H₃O⁺] = 10⁻³ mol/L et [OH⁻] = 10⁻¹⁴ / 10⁻³ = 10⁻¹¹ mol/L. Un jus à pH 3 contient 10 000 fois plus de H₃O⁺ qu’une eau à pH 7.</p></div>
<div class="warn"><p>Une unité de pH, c’est un facteur 10. Et « neutre = pH 7 » ne vaut qu’à 25 °C : K<sub>e</sub> change avec la température. Déplace le curseur.</p></div>`,
  params:[{id:'p',l:'pH',min:0,max:14,step:.5,v:3}],
  draw:v=>{ const P=plane({x:[-0.5,14.5],y:[0,4],h:110,grid:false,axes:false});
    for(let k=0;k<14;k++) P.rect(k,1.2,1,1,{fill:k<7?'var(--bad)':'var(--sci)',fo:Math.abs(k+0.5-7)/7*.8+.08,c:null});
    for(let k=0;k<=14;k+=2) P.text(k,1.2,String(k),{a:'middle',dy:15,s:10,c:'var(--muted)'});
    P.dot(v.p,1.7,{c:'var(--ink)'}).text(0,3.3,'acide',{s:11,c:'var(--bad)'}).text(14,3.3,'basique',{a:'end',s:11,c:'var(--sci)'}).text(7,3.3,'neutre',{a:'middle',s:11,c:'var(--muted)'});
    return P.svg(); },
  info:v=>`[H₃O⁺] = ${sci(10**-v.p)} mol/L · [OH⁻] = ${sci(10**(v.p-14))} mol/L`,
  note:'Un pH qui baisse de 1 correspond à 10 fois plus d’ions H₃O⁺.'},
 {kind:'Méthode',h:'pH d’un acide fort ou d’une base forte',p:`<b>Quand :</b> le soluté est un acide fort (HCl, HNO₃…) ou une base forte (NaOH, KOH…). <b>Pourquoi :</b> ils réagissent totalement avec l’eau : chaque mole d’acide fort donne une mole de H₃O⁺, chaque mole de base forte une mole de OH⁻. <b>Comment :</b><ol><li>Acide fort de concentration c : [H₃O⁺] = c, <b>pH = −log c</b>.</li><li>Base forte : [OH⁻] = c, puis [H₃O⁺] = K<sub>e</sub>/[OH⁻], soit <b>pH = 14 + log c</b> (à 25 °C).</li><li>Inverse : [H₃O⁺] = 10<sup>−pH</sup>.</li><li>Contrôle : un acide donne pH &lt; 7, une base pH &gt; 7. Ces formules valent pour c ≥ 10⁻⁶ mol/L environ.</li></ol>`,
  demo:{enonce:'Quel est le pH d’une solution de soude NaOH à 0,020 mol/L&nbsp;?',
   etapes:[{f:'[OH⁻] = 0,020 mol/L',w:'NaOH est totalement dissociée en Na⁺ et OH⁻.'},
    {f:'[H₃O⁺] = 10⁻¹⁴ / 0,020 = 5,0·10⁻¹³ mol/L',w:'Le produit ionique de l’eau relie les deux concentrations.'},
    {f:'pH = −log(5,0·10⁻¹³) ≈ 12,30',w:'Même résultat avec pH = 14 + log 0,020 = 14 − 1,70.'}],
   conclusion:'pH ≈ 12,3, une solution nettement basique.'}},
 {h:'Base conjuguée',p:'Quelle est la base conjuguée de l’ion ammonium NH₄⁺&nbsp;?',opts:['NH₂⁻','NH₃','NH₄OH','N₂'],ans:1,
  why:'NH₄⁺ cède un proton H⁺ et devient NH₃ : le couple est NH₄⁺/NH₃.'},
 {h:'Acide fort',p:'Un acide fort est totalement dissocié. Quel est le pH d’une solution de HCl à 0,010 mol/L&nbsp;?',lab:'pH =',ans:2,tol:.01,
  why:'[H₃O⁺] = c = 10⁻² mol/L, donc pH = −log(10⁻²) = 2.'},
 {h:'Base forte',p:'Quel est le pH d’une solution de potasse KOH à 0,0050 mol/L&nbsp;? Au centième.',lab:'pH =',ans:11.7,tol:.01,
  why:'[OH⁻] = 5,0·10⁻³ mol/L, donc pH = 14 + log(5,0·10⁻³) = 14 − 2,30 = 11,70.'},
 {kind:'Théorie',h:'Acides forts, acides faibles',p:`<p>Une solution d’acide chlorhydrique et une solution d’acide acétique à la même concentration de 0,020 mol/L n’ont pas le même pH : 1,70 pour la première, 3,24 pour la seconde. Les deux sont des acides, mais l’un donne ses protons bien plus volontiers.</p>
<div class="def"><p>Un <b>acide fort</b> réagit totalement avec l’eau : HCl + H₂O → Cl⁻ + H₃O⁺. Un <b>acide faible</b> ne réagit que partiellement et atteint un équilibre, de constante d’<b>acidité</b> <b>K<sub>a</sub> = [A⁻][H₃O⁺] / [HA]</b> (l’eau, solvant, n’y figure pas). On utilise <b>pKa = −log₁₀ K<sub>a</sub></b> : plus le pKa est petit, plus l’acide est fort. De même, une base forte (NaOH) libère totalement ses OH⁻, une base faible (NH₃) partiellement.</p></div>
<div class="idea"><p>Céder un proton, c’est casser la liaison H–A. Si A⁻ est stable seul dans l’eau (grand ion bien hydraté comme Cl⁻, charge répartie comme dans CH₃COO⁻), la liaison se rompt facilement et K<sub>a</sub> est grand.</p></div>
<div class="why"><p>Dans un couple, K<sub>a</sub>·K<sub>b</sub> = K<sub>e</sub> : multiplier les deux constantes fait apparaître [H₃O⁺][OH⁻]. Donc pKa + pK<sub>b</sub> = 14 : plus l’acide est fort, plus sa base conjuguée est faible.</p></div>
<div class="ex"><p>Acide acétique, pKa = 4,76, à 0,020 mol/L : seulement 2,9 % des molécules sont dissociées, [H₃O⁺] ≈ 5,8·10⁻⁴ mol/L, pH ≈ 3,24. Pour l’acétate, pK<sub>b</sub> = 14 − 4,76 = 9,24.</p></div>
<div class="warn"><p>Faible ne veut pas dire dilué : la force dépend de K<sub>a</sub>, la concentration est une autre affaire.</p></div>`},
 {kind:'Théorie',h:'Acide faible et pKa',p:`<p>Dans une solution qui contient un couple HA/A⁻, qui domine, l’acide ou sa base&nbsp;? La réponse ne dépend que de l’écart entre le pH et le pKa.</p>
<div class="prop"><p>En prenant le logarithme de K<sub>a</sub> = [A⁻][H₃O⁺]/[HA], on obtient <b>pH = pKa + log([A⁻]/[HA])</b>. Donc si pH &lt; pKa, <b>HA prédomine</b> ; si pH &gt; pKa, <b>A⁻ prédomine</b> ; à pH = pKa, il y en a autant.</p></div>
<div class="idea"><p>Un pH bas veut dire beaucoup de H₃O⁺ : l’équilibre HA + H₂O ⇌ A⁻ + H₃O⁺ est repoussé vers HA. Chaque unité de pH au-dessus du pKa multiplie le rapport [A⁻]/[HA] par 10. Sur la figure, les deux courbes se croisent à pH = pKa.</p></div>
<div class="why"><p>Pour un acide faible seul à la concentration c, la réaction avance de x = [H₃O⁺] et K<sub>a</sub> = x²/(c − x). Si l’acide est peu dissocié, c − x ≈ c, d’où x ≈ √(K<sub>a</sub>·c) et <b>pH ≈ ½(pKa − log c)</b>.</p></div>
<div class="ex"><p>Couple acétique, pKa = 4,76, à pH 5,76 : [A⁻]/[HA] = 10, donc 91 % d’acétate. Acide de pKa 4,5 à c = 0,10 mol/L (réglage de départ) : pH ≈ ½(4,5 + 1) = 2,75, et le calcul exact donne 2,75, avec 1,8 % de dissociation.</p></div>
<div class="warn"><p>La formule approchée n’est valable que si l’acide est peu dissocié (moins de 5 % environ) : pKa petit et c faible la mettent en défaut. Le trait marque le pH de la solution.</p></div>`,
  params:[{id:'k',l:'pKa',min:2,max:10,step:.5,v:4.5},{id:'c',l:'log₁₀ c',min:-4,max:-1,step:.5,v:-1}],
  draw:v=>{ const Ka=10**-v.k, c=10**v.c, h=solveH(h=>h-c*Ka/(Ka+h)-KW/h), pH=pHof(h), P=plane({x:[0,14],y:[0,1.2],w:320,h:180,grid:false,lx:2});
    P.fn(p=>1/(1+10**(p-v.k)),{c:'var(--bad)',from:0,to:14}).fn(p=>1/(1+10**(v.k-p)),{c:'var(--sci)',from:0,to:14});
    P.seg(pH,0,pH,1.1,{c:'var(--ink)',w:2,dash:true}).text(pH,1.1,'pH',{a:'middle',dy:-3,s:11});
    P.text(0.3,1.05,'HA',{c:'var(--bad)',s:12}).text(13.7,1.05,'A⁻',{a:'end',c:'var(--sci)',s:12}); return P.svg(); },
  info:v=>{ const Ka=10**-v.k, c=10**v.c, h=solveH(h=>h-c*Ka/(Ka+h)-KW/h), a=(h-KW/h)/c;
    return `pH exact = <b>${fmt(pHof(h),2)}</b> · formule ½(pKa − log c) = ${fmt((v.k-v.c)/2,2)} · fraction dissociée : ${fmt(100*a,1)} %`; },
  note:'La formule approchée n’est valable que si l’acide est peu dissocié (moins de 5 % environ). Compare-la au pH exact quand pKa est petit et c faible.'},
 {kind:'Méthode',h:'pH d’un acide faible',p:`<b>Quand :</b> le soluté est un acide faible (pKa connu, par exemple un acide carboxylique). <b>Pourquoi :</b> il ne se dissocie qu’un peu ; un tableau ICE et l’approximation de x petit donnent [H₃O⁺]. <b>Comment :</b><ol><li>ICE pour HA + H₂O ⇌ A⁻ + H₃O⁺ : [HA] = c − x, [A⁻] = [H₃O⁺] = x.</li><li>K<sub>a</sub> = x²/(c − x) ≈ x²/c, d’où <b>x ≈ √(K<sub>a</sub>·c)</b>.</li><li>pH = −log x, ce qui revient à <b>pH ≈ ½(pKa − log c)</b>.</li><li>Vérifie : x/c &lt; 5 %. Sinon, résous x² + K<sub>a</sub>x − K<sub>a</sub>c = 0.</li></ol>`,
  demo:{enonce:'Calcule le pH d’une solution d’acide lactique à 0,10 mol/L (pKa = 3,86).',
   etapes:[{f:'K<sub>a</sub> = 10<sup>−3,86</sup> ≈ 1,38·10⁻⁴',w:'On repasse du pKa à la constante.'},
    {f:'x ≈ √(1,38·10⁻⁴ × 0,10) ≈ 3,72·10⁻³ mol/L',w:'On néglige x devant c = 0,10 dans le dénominateur.'},
    {f:'x/c ≈ 3,7 % &lt; 5 % ✓',w:'L’approximation est acceptable.'},
    {f:'pH = −log(3,72·10⁻³) ≈ 2,43 = ½(3,86 + 1)',w:'Les deux écritures donnent le même résultat.'}],
   conclusion:'pH ≈ 2,43 (le calcul exact donne 2,44).'}},
 {h:'L’acide acétique',p:'Calcule le pH d’une solution d’acide acétique à 0,10 mol/L (pKa = 4,76). Au centième.',lab:'pH =',ans:2.88,tol:.02,
  why:'pH ≈ ½(pKa − log c) = ½(4,76 + 1) = 2,88. Seulement 1,3 % de l’acide est dissocié, l’approximation est justifiée.'},
 {kind:'Méthode',h:'pH d’une base faible',p:`<b>Quand :</b> le soluté est une base faible : l’ammoniac, ou la base conjuguée d’un acide faible (acétate, carbonate…). <b>Pourquoi :</b> elle capte un peu de H⁺ à l’eau, A⁻ + H₂O ⇌ HA + OH⁻, de constante K<sub>b</sub> = K<sub>e</sub>/K<sub>a</sub>. C’est le calcul de l’acide faible, appliqué à OH⁻. <b>Comment :</b><ol><li>pK<sub>b</sub> = 14 − pKa (pKa du couple).</li><li>[OH⁻] ≈ √(K<sub>b</sub>·c), puis pOH = −log[OH⁻] et pH = 14 − pOH.</li><li>Formule équivalente : <b>pH ≈ 7 + ½(pKa + log c)</b>.</li><li>Vérifie que [OH⁻]/c &lt; 5 %.</li></ol>`,
  demo:{enonce:'Calcule le pH d’une solution d’ammoniac NH₃ à 0,10 mol/L (pKa(NH₄⁺/NH₃) = 9,25).',
   etapes:[{f:'pK<sub>b</sub> = 14 − 9,25 = 4,75 → K<sub>b</sub> ≈ 1,78·10⁻⁵',w:'On a besoin de la constante de la base, K<sub>b</sub> = K<sub>e</sub>/K<sub>a</sub>.'},
    {f:'[OH⁻] ≈ √(1,78·10⁻⁵ × 0,10) ≈ 1,33·10⁻³ mol/L',w:'Même approximation que pour un acide faible ; 1,3 % &lt; 5 % ✓.'},
    {f:'pOH ≈ 2,87 → pH ≈ 14 − 2,87 = 11,13',w:'On repasse de OH⁻ au pH.'},
    {f:'contrôle : 7 + ½(9,25 − 1) = 11,125 ✓',w:'La formule directe donne la même valeur.'}],
   conclusion:'pH ≈ 11,1 : une solution d’ammoniac est nettement basique.'}},
 {h:'Une solution d’acétate',p:'Calcule le pH d’une solution d’acétate de sodium CH₃COONa à 0,10 mol/L (pKa(CH₃COOH/CH₃COO⁻) = 4,76). Au centième.',lab:'pH =',ans:8.88,tol:.01,
  why:'L’acétate est une base faible : pH ≈ 7 + ½(4,76 + log 0,10) = 7 + ½ × 3,76 = 8,88.'},
 {kind:'Théorie',h:'La courbe de titrage',p:`<p>Pour connaître la concentration d’un acide, on le fait réagir avec une base de concentration connue, versée peu à peu, et on suit le pH. La courbe obtenue dit où s’arrêter, et elle révèle aussi le pKa.</p>
<div class="def"><p>Un <b>titrage</b> utilise une réaction totale et rapide, ici HA + OH⁻ → A⁻ + H₂O. L’<b>équivalence</b> est atteinte quand on a versé exactement la quantité de base qui consomme tout l’acide : n(OH⁻ versé) = n(acide initial). La <b>demi-équivalence</b> est le volume moitié.</p></div>
<div class="idea"><p>On verse de la soude à 0,10 mol/L dans 20 mL d’acide à 0,10 mol/L ; l’équivalence est à 20 mL. Avant, chaque OH⁻ versé est aussitôt consommé et le pH bouge peu. Autour de l’équivalence, une goutte fait passer d’un léger excès d’acide à un léger excès de base : c’est le <b>saut de pH</b>. Après, la base en excès fixe le pH.</p></div>
<div class="why"><p>Pour un acide faible, le mélange avant l’équivalence contient HA et A⁻ : pH = pKa + log(n(A⁻)/n(HA)). À la demi-équivalence, n(A⁻) = n(HA), donc <b>pH = pKa</b>. À l’équivalence, il ne reste que la base A⁻ : <b>pH &gt; 7</b>. Pour un acide fort, il ne reste que de l’eau salée : pH = 7.</p></div>
<div class="ex"><p>Acide acétique (pKa = 4,76) : pH 2,88 au départ ; à 12 mL, n(A⁻)/n(HA) = 12/8 et pH = 4,76 + log 1,5 ≈ 4,94 ; à 10 mL, pH = 4,76 ; à 20 mL, pH ≈ 8,73 ; à 30 mL, pH ≈ 12,3.</p></div>
<div class="warn"><p>L’équivalence n’est pas « le point où pH = 7 » : pour un acide faible, elle est en zone basique. Bascule entre acide fort et faible.</p></div>`,
  params:[{id:'V',l:'V(NaOH)',min:0,max:40,v:12,u:' mL'},{id:'w',l:'0 : acide fort · 1 : acide faible',min:0,max:1,v:1}],
  draw:v=>titrDraw(v.V,v.w===1),
  info:v=>`${v.w?'CH₃COOH':'HCl'} · V = ${v.V} mL · pH = <b>${fmt(titr(v.V,v.w===1),2)}</b>`,
  note:'Le saut de pH autour de l’équivalence permet de la repérer avec un indicateur coloré dont la zone de virage tombe dans le saut.'},
 {kind:'Méthode',h:'Exploiter l’équivalence d’un titrage',p:`<b>Quand :</b> on a versé une solution titrante de concentration connue jusqu’à l’équivalence, et on cherche la concentration de la solution titrée. <b>Pourquoi :</b> à l’équivalence, les réactifs ont été introduits dans les proportions de l’équation : pour HA + OH⁻ → A⁻ + H₂O, n(acide) = n(OH⁻ versé). <b>Comment :</b><ol><li>Écris la réaction de titrage et ses coefficients.</li><li>n(titrant) = c<sub>titrant</sub> × V<sub>éq</sub>.</li><li>n(titré) = n(titrant) × (rapport des coefficients) ; 1 : 1 ici.</li><li>c<sub>titré</sub> = n(titré) / V<sub>titré</sub>. Si on a dilué l’échantillon avant, multiplie par le facteur de dilution.</li><li>À la <b>demi-équivalence</b> (V<sub>éq</sub>/2), [HA] = [A⁻] et pH = pKa.</li></ol>`,
  demo:{enonce:'On titre 25,0 mL d’acide chlorhydrique par de la soude à 0,200 mol/L. L’équivalence est atteinte à 12,5 mL. Quelle est la concentration de l’acide&nbsp;?',
   etapes:[{f:'H₃O⁺ + OH⁻ → 2 H₂O : 1 pour 1',w:'La réaction de titrage fixe le rapport des quantités à l’équivalence.'},
    {f:'n(OH⁻) = 0,200 × 0,0125 = 2,50·10⁻³ mol',w:'On convertit le volume équivalent en litres.'},
    {f:'c = 2,50·10⁻³ / 0,0250 = 0,100 mol/L',w:'Cette quantité d’acide était contenue dans 25,0 mL.'}],
   conclusion:'L’acide est à 0,100 mol/L.'}},
 {h:'Un dosage',p:'On titre 20,0 mL d’une solution d’acide par de la soude à 0,050 mol/L (réaction 1 : 1). L’équivalence est atteinte à 16,0 mL. Quelle est la concentration de l’acide&nbsp;? Au millième.',lab:'c =',unit:'mol/L',ans:.04,tol:.0005,
  why:'n(OH⁻) = 0,050 × 0,0160 = 8,0·10⁻⁴ mol = n(acide), donc c = 8,0·10⁻⁴ / 0,0200 = 0,040 mol/L.'},
 {kind:'Pratique',h:'Lire le pKa',p:'Sur le titrage de l’acide acétique, place-toi au volume où le pH est égal au pKa.',
  params:[{id:'V',l:'V(NaOH)',min:0,max:40,v:0,u:' mL'}],
  draw:v=>titrDraw(v.V,true), info:v=>`V = ${v.V} mL · pH = ${fmt(titr(v.V,true),2)}`,
  ok:v=>v.V===10,why:'À la demi-équivalence (10 mL), la moitié de CH₃COOH est devenue CH₃COO⁻ : [A⁻] = [HA], donc pH = pKa = 4,76.'},
 {kind:'Méthode',h:'pH à l’équivalence et choix de l’indicateur',p:`<b>Quand :</b> on demande le pH au point d’équivalence d’un titrage, ou l’indicateur coloré adapté. <b>Pourquoi :</b> à l’équivalence, l’acide et la base ont réagi ; il ne reste que le <b>produit</b> de la réaction, dont la nature fixe le pH. <b>Comment :</b><ol><li>Acide fort + base forte : il reste de l’eau salée, pH = 7.</li><li>Acide faible + base forte : il reste la base conjuguée A⁻, de quantité n₀ dans le volume total V<sub>a</sub> + V<sub>éq</sub>. Calcule sa concentration, puis le pH d’une base faible : pH &gt; 7.</li><li>Base faible + acide fort : il reste l’acide conjugué, pH d’un acide faible : pH &lt; 7.</li><li>Choisis un indicateur dont la zone de virage contient ce pH.</li></ol>`,
  demo:{enonce:'On titre 20,0 mL d’acide acétique à 0,100 mol/L (pKa = 4,76) par de la soude à 0,100 mol/L. Quel est le pH à l’équivalence&nbsp;?',
   etapes:[{f:'V<sub>éq</sub> = 20,0 mL → n(CH₃COO⁻) = 0,100 × 0,0200 = 2,00·10⁻³ mol',w:'Tout l’acide est devenu acétate.'},
    {f:'c = 2,00·10⁻³ / 0,0400 L = 0,0500 mol/L',w:'Le volume total est 20,0 + 20,0 = 40,0 mL : l’acétate est dilué.'},
    {f:'pH ≈ 7 + ½(4,76 + log 0,0500) = 7 + ½(4,76 − 1,30) ≈ 8,73',w:'On applique la formule de la base faible.'},
    {f:'phénolphtaléine (virage 8,2 à 10)',w:'Sa zone de virage contient 8,73, contrairement au bleu de bromothymol (6,0 à 7,6).'}],
   conclusion:'pH ≈ 8,7 à l’équivalence, repérée par la phénolphtaléine.'}},
 {h:'Titrer l’ammoniac',p:'On titre 20,0 mL d’ammoniac à 0,100 mol/L (pKa(NH₄⁺/NH₃) = 9,25) par de l’acide chlorhydrique à 0,100 mol/L. Quel est le pH à l’équivalence&nbsp;? Au centième.',lab:'pH =',ans:5.28,tol:.01,
  why:'À l’équivalence (20,0 mL), il reste 2,00·10⁻³ mol de NH₄⁺ dans 40,0 mL, soit 0,0500 mol/L. C’est un acide faible : pH ≈ ½(9,25 − log 0,0500) = ½(9,25 + 1,30) ≈ 5,28.'},
 {kind:'Théorie',h:'Pourquoi un tampon résiste',p:`<p>Le sang, les cellules, beaucoup de réactions de laboratoire ne supportent qu’une variation de pH de quelques dixièmes. Pourtant on y ajoute sans cesse des acides et des bases. Comment garder un pH presque fixe&nbsp;?</p>
<div class="def"><p>Une <b>solution tampon</b> contient un acide faible HA et sa base conjuguée A⁻ en quantités comparables. Son pH suit l’équation de <b>Henderson-Hasselbalch</b> : <b>pH = pKa + log(n(A⁻)/n(HA))</b>, et il varie peu quand on ajoute un peu d’acide fort, de base forte, ou d’eau.</p></div>
<div class="why"><p>Le tampon contient de quoi neutraliser les deux attaques. Un H₃O⁺ ajouté est capté par A⁻ (A⁻ + H₃O⁺ → HA + H₂O), un OH⁻ ajouté par HA (HA + OH⁻ → A⁻ + H₂O). Ces réactions sont totales : l’ion ajouté disparaît, et seul le <b>rapport</b> n(A⁻)/n(HA) change un peu. Le pH dépend de ce rapport à travers un logarithme, qui écrase les variations. Diluer ne change pas le rapport, donc pas le pH.</p></div>
<div class="ex"><p>Tampon acétique : 0,10 mol de CH₃COOH et 0,10 mol de CH₃COO⁻ dans 1 L, pH = 4,76. On ajoute 0,010 mol de NaOH : n(HA) = 0,09 et n(A⁻) = 0,11 mol, pH = 4,76 + log(0,11/0,09) ≈ 4,85. La même soude dans 1 L d’eau pure ferait passer le pH de 7 à 12.</p></div>
<div class="warn"><p>Un tampon a des limites. Il est efficace entre pKa − 1 et pKa + 1, et seulement tant que l’ajout reste petit devant les quantités de HA et de A⁻ : au-delà, l’une des deux espèces est épuisée et le pH s’effondre. Pour viser un pH, on choisit un couple de pKa proche.</p></div>`},
 {kind:'Méthode',h:'pH d’un tampon, avant et après un ajout',p:`<b>Quand :</b> la solution contient à la fois un acide faible HA et sa base conjuguée A⁻ en quantités comparables, éventuellement après ajout d’un peu d’acide ou de base forte. <b>Pourquoi :</b> K<sub>a</sub> = [A⁻][H₃O⁺]/[HA] donne, en passant au logarithme, l’équation de <b>Henderson-Hasselbalch</b> : pH = pKa + log([A⁻]/[HA]). Un ajout ne change que le rapport, qui varie peu. <b>Comment :</b><ol><li>Fais le bilan de l’ajout : H⁺ fort + A⁻ → HA, ou OH⁻ fort + HA → A⁻ (réactions totales).</li><li>Calcule les nouvelles quantités de HA et de A⁻ (même volume : on peut garder les moles).</li><li>pH = pKa + log(n(A⁻)/n(HA)).</li><li>Pour fabriquer un tampon à un pH voulu : [A⁻]/[HA] = 10<sup>pH − pKa</sup>.</li></ol>`,
  demo:{enonce:'Un tampon contient 0,10 mol d’acide acétique et 0,10 mol d’acétate (pKa = 4,76). On y ajoute 0,010 mol de HCl. Quel est le nouveau pH&nbsp;?',
   etapes:[{f:'avant : pH = 4,76 + log(0,10/0,10) = 4,76',w:'Quantités égales : le pH vaut le pKa.'},
    {f:'H₃O⁺ + CH₃COO⁻ → CH₃COOH + H₂O, totale',w:'L’acide fort ajouté est consommé par la base du tampon.'},
    {f:'n(A⁻) = 0,10 − 0,010 = 0,090 · n(HA) = 0,10 + 0,010 = 0,110 mol',w:'Chaque H⁺ transforme un A⁻ en HA.'},
    {f:'pH = 4,76 + log(0,090/0,110) ≈ 4,76 − 0,09 = 4,67',w:'Le rapport a peu changé, le pH aussi.'}],
   conclusion:'Le pH ne baisse que de 0,09. Dans l’eau pure, la même quantité de HCl dans 1 L ferait passer le pH de 7 à 2.'}},
 {h:'Solution tampon',p:`Un <b>tampon</b> mélange un acide faible et sa base conjuguée : son pH varie peu quand on ajoute un peu d’acide ou de base. Il suit l’équation de <b>Henderson-Hasselbalch</b> : pH = pKa + log([A⁻]/[HA]). Quel est le pH d’un mélange de 0,10 mol d’acide acétique et 0,20 mol d’acétate (pKa = 4,76)&nbsp;? Au centième.`,lab:'pH =',ans:5.06,tol:.01,
  why:'pH = 4,76 + log(0,20/0,10) = 4,76 + 0,30 = 5,06.'},
 {kind:'Défi',h:'Fabriquer un tampon',p:'On veut un tampon NH₄⁺/NH₃ (pKa = 9,25) à pH 9,55. Quel rapport [NH₃]/[NH₄⁺] faut-il&nbsp;? Au dixième.',lab:'[NH₃]/[NH₄⁺] =',ans:2,tol:.05,
  why:'log([NH₃]/[NH₄⁺]) = pH − pKa = 0,30, donc le rapport vaut 10<sup>0,30</sup> ≈ 2,0.'},
 {h:'Un peu de soude dans le tampon',p:'Un tampon contient 0,10 mol d’acide acétique et 0,10 mol d’acétate (pKa = 4,76). On y ajoute 0,020 mol de NaOH. Quel est le nouveau pH&nbsp;? Au centième.',lab:'pH =',ans:4.94,tol:.01,
  why:'OH⁻ + CH₃COOH → CH₃COO⁻ + H₂O : n(HA) = 0,080 mol et n(A⁻) = 0,120 mol. pH = 4,76 + log(0,120/0,080) = 4,76 + 0,18 ≈ 4,94.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : acides et bases',p:`<div class="keep"><ul>
<li>Brønsted : un acide cède un proton H⁺, une base le capte ; HA/A⁻ est un couple. L’eau est amphotère : H₃O⁺/H₂O et H₂O/OH⁻.</li>
<li>pH = −log[H₃O⁺], [H₃O⁺] = 10<sup>−pH</sup> ; K<sub>e</sub> = [H₃O⁺][OH⁻] = 10⁻¹⁴ à 25 °C, neutre à pH 7. Une unité de pH = un facteur 10.</li>
<li>Acide fort : pH = −log c. Base forte : pH = 14 + log c.</li>
<li>Acide faible : K<sub>a</sub> = [A⁻][H₃O⁺]/[HA], pKa = −log K<sub>a</sub>, pKa + pK<sub>b</sub> = 14. pH ≈ ½(pKa − log c), base faible pH ≈ 7 + ½(pKa + log c), à vérifier (moins de 5 % de dissociation).</li>
<li>Prédominance : pH &lt; pKa, HA domine ; pH &gt; pKa, A⁻ domine.</li>
<li>Titrage : à l’équivalence n(titrant) = n(titré) selon les coefficients ; demi-équivalence pH = pKa ; pH à l’équivalence fixé par l’espèce qui reste (7, &gt; 7 ou &lt; 7), d’où le choix de l’indicateur.</li>
<li>Tampon : pH = pKa + log(n(A⁻)/n(HA)) ; un ajout modéré ne change que le rapport ; efficace entre pKa − 1 et pKa + 1.</li>
</ul></div>`},
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
 {kind:'Théorie',h:'La vitesse de réaction',p:`<p>Une explosion dure une milliseconde, la rouille met des mois, le diamant se transforme en graphite en des milliards d’années. La constante d’équilibre dit jusqu’où va une réaction, jamais en combien de temps. Pour comparer des rapidités, il faut une mesure.</p>
<div class="def"><p>Pour <i>a</i>A → produits, la <b>vitesse de réaction</b> est <b>v = −(1/a)·d[A]/dt</b>, en mol/(L·s). La notation <b>d[A]/dt</b> (lire « d A sur d t ») est la dérivée de la concentration par rapport au temps : la limite du taux Δ[A]/Δt quand l’intervalle Δt devient très court.</p></div>
<div class="idea"><p>Sur la courbe [A](t), d[A]/dt est la <b>pente de la tangente</b>. Elle est négative, car A disparaît : le signe moins rend v positive. On divise par le coefficient a pour que la vitesse soit la même quelle que soit l’espèce suivie. Au début, beaucoup de molécules réagissent : la pente est raide. Puis A se raréfie, les rencontres se font rares, la vitesse baisse.</p></div>
<div class="ex"><p>Ici [A] = e<sup>−0,5t</sup> mol/L. À t = 1 s, [A] ≈ 0,607 mol/L et la tangente a une pente de −0,303 mol/(L·s) : v ≈ 0,303 mol/(L·s). La vitesse <b>moyenne</b> entre 0 et 2 s vaut (1 − 0,368)/2 ≈ 0,316 mol/(L·s), c’est la pente de la corde, pas de la tangente.</p></div>
<div class="warn"><p>Ne confonds pas vitesse moyenne sur un intervalle et vitesse instantanée à un instant. Déplace t et regarde la tangente s’aplatir.</p></div>`,
  params:[{id:'t',l:'t',min:0,max:6,step:.5,v:1,u:' s'}],
  draw:v=>{ const A=t=>Math.exp(-0.5*t), m=-0.5*A(v.t), P=plane({x:[0,7],y:[0,1.15],h:200,grid:false,lx:1});
    P.fn(A,{from:0,to:7}).fn(x=>A(v.t)+m*(x-v.t),{c:'var(--spark)',w:2.5}).dot(v.t,A(v.t),{c:'var(--ink)'});
    P.text(6.9,1.05,'[A] (mol/L)',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>`[A] = ${fmt(Math.exp(-0.5*v.t),3)} mol/L · pente = ${fmt(-0.5*Math.exp(-0.5*v.t),3)} · v = <b>${fmt(0.5*Math.exp(-0.5*v.t),3)} mol/(L·s)</b>`},
 {kind:'Méthode',h:'Relier les vitesses des différentes espèces',p:`<b>Quand :</b> on connaît la vitesse d’apparition ou de disparition d’une espèce et on demande celle d’une autre, ou la vitesse de réaction. <b>Pourquoi :</b> les espèces sont consommées et formées dans les proportions des coefficients ; diviser chaque variation par son coefficient donne une seule vitesse v, la même pour toutes. <b>Comment :</b><ol><li>Écris v = −(1/a)·d[A]/dt = (1/c)·d[C]/dt pour chaque espèce (signe − pour les réactifs).</li><li>Égalise les expressions et isole la vitesse cherchée.</li><li>Raccourci : vitesse de X = v × coefficient de X.</li></ol>`,
  demo:{enonce:'Pour N₂ + 3 H₂ → 2 NH₃, H₂ disparaît à 0,030 mol/(L·s). Calcule v et la vitesse de formation de NH₃.',
   etapes:[{f:'v = −(1/3)·d[H₂]/dt = 0,030/3 = 0,010 mol/(L·s)',w:'On divise la vitesse de disparition de H₂ par son coefficient 3.'},
    {f:'d[NH₃]/dt = 2 × v = 0,020 mol/(L·s)',w:'NH₃ a le coefficient 2 : il se forme deux fois plus vite que v.'},
    {f:'−d[N₂]/dt = 1 × v = 0,010 mol/(L·s)',w:'Même raisonnement pour N₂, de coefficient 1.'}],
   conclusion:'v = 0,010 mol/(L·s) ; NH₃ apparaît à 0,020 mol/(L·s).'}},
 {h:'Vitesses des espèces',p:'Pour 2 N₂O₅ → 4 NO₂ + O₂, O₂ se forme à 1,0·10⁻³ mol/(L·s). À quelle vitesse NO₂ se forme-t-il&nbsp;?',
  opts:['1,0·10⁻³ mol/(L·s)','2,0·10⁻³ mol/(L·s)','2,5·10⁻⁴ mol/(L·s)','4,0·10⁻³ mol/(L·s)'],ans:3,
  why:'v = d[O₂]/dt = (1/4)·d[NO₂]/dt, donc d[NO₂]/dt = 4 × 1,0·10⁻³ = 4,0·10⁻³ mol/(L·s).'},
 {kind:'Théorie',h:'La loi de vitesse',p:`<p>La vitesse baisse quand les réactifs se raréfient. Mais de combien&nbsp;? Si l’on double une concentration, la vitesse double-t-elle, quadruple-t-elle, ou ne change-t-elle pas&nbsp;?</p>
<div class="def"><p>Pour beaucoup de réactions, la vitesse suit une <b>loi de vitesse</b> <b>v = k[A]<sup>m</sup>[B]<sup>n</sup></b>. Les exposants m et n sont les <b>ordres partiels</b> par rapport à A et B, leur somme est l’<b>ordre global</b>. La <b>constante de vitesse</b> k ne dépend que de la température ; son unité dépend de l’ordre : s⁻¹ à l’ordre 1, L/(mol·s) à l’ordre 2.</p></div>
<div class="idea"><p>Deux molécules doivent se rencontrer pour réagir. Le nombre de chocs entre A et B par seconde est proportionnel à [A] et à [B] : doubler [A] double les chocs. Si l’étape décisive est un choc entre deux A, elle varie comme [A]² : ordre 2.</p></div>
<div class="ex"><p>2 NO + O₂ → 2 NO₂ suit v = k[NO]²[O₂] : ordre 2 en NO, 1 en O₂, 3 au total. Doubler [NO] multiplie v par 2² = 4 ; doubler [O₂] la multiplie par 2.</p></div>
<div class="warn"><p>Les ordres se <b>mesurent</b>, ils ne se lisent pas sur l’équation. La décomposition 2 N₂O₅ → 4 NO₂ + O₂ est d’ordre 1, pas 2 : elle passe par une étape lente où une seule molécule N₂O₅ se casse. Les ordres égalent les coefficients seulement pour une réaction qui se fait en un seul choc.</p></div>`},
 {kind:'Théorie',h:'Ordre 0, 1 et 2',p:`<p>La loi de vitesse dit comment v dépend de [A]. Mais ce qu’on veut souvent, c’est [A] à un instant donné, ou le temps qu’il faut pour en consommer la moitié. Il faut « intégrer » la loi.</p>
<div class="def"><p>Pour A → produits avec <b>v = −d[A]/dt = k[A]<sup>n</sup></b>, les <b>lois intégrées</b> sont : ordre 0, <b>[A] = [A]₀ − kt</b> ; ordre 1, <b>[A] = [A]₀·e<sup>−kt</sup></b> ; ordre 2, <b>1/[A] = 1/[A]₀ + kt</b>. La <b>demi-vie</b> t<sub>½</sub> est le temps pour que [A] soit divisé par 2 : [A]₀/(2k), ln 2 / k et 1/(k[A]₀).</p></div>
<div class="why"><p>Ordre 0 : la pente est constante, [A] baisse en ligne droite. Ordre 1 : la quantité qui disparaît par seconde est une <b>fraction fixe</b> k de ce qui reste ; c’est la définition d’une décroissance exponentielle, dont la dérivée k·[A]₀e<sup>−kt</sup> redonne bien k[A]. Chaque demi-vie a donc la même durée : e<sup>−kt</sup> = ½ donne t = ln 2/k, sans [A]₀. Ordre 2 : on vérifie en dérivant 1/[A] que sa pente vaut k ; la réaction ralentit beaucoup en fin de course.</p></div>
<div class="ex"><p>Avec k = 0,3 et [A]₀ = 1 mol/L (réglage de départ) : ordre 0, t<sub>½</sub> = 1/0,6 ≈ 1,67 s ; ordre 1, t<sub>½</sub> = 0,693/0,3 ≈ 2,31 s ; ordre 2, t<sub>½</sub> = 1/0,3 ≈ 3,33 s. À l’ordre 1, après 1 s il reste e<sup>−0,3</sup> ≈ 74 %.</p></div>
<div class="warn"><p>k n’a pas la même unité selon l’ordre : on ne compare pas les k de deux ordres différents. Change l’ordre et k.</p></div>`,
  params:[{id:'o',l:'ordre',min:0,max:2,v:1},{id:'k',l:'k',min:.1,max:1,step:.1,v:.3}],
  draw:v=>{ const A=[t=>Math.max(0,1-v.k*t),t=>Math.exp(-v.k*t),t=>1/(1+v.k*t)][v.o], th=[1/(2*v.k),Math.LN2/v.k,1/v.k][v.o], P=plane({x:[0,12],y:[0,1.15],h:200,grid:false,lx:2});
    P.seg(0,0.5,12,0.5,{c:'var(--muted)',w:1,dash:true}).fn(A,{from:0,to:12});
    if(th<=12) P.dot(th,0.5,{c:'var(--spark)',l:'t½'}); return P.svg(); },
  info:v=>{ const th=[1/(2*v.k),Math.LN2/v.k,1/v.k][v.o], f=['[A]₀/(2k)','ln 2 / k','1/(k[A]₀)'][v.o]; return `ordre ${v.o} · t<sub>½</sub> = ${f} = <b>${fmt(th,2)} s</b>`; },
  note:'Seule la demi-vie d’ordre 1 ne dépend pas de [A]₀ : c’est le cas de la désintégration radioactive.'},
 {kind:'Méthode',h:'Utiliser la loi intégrée d’ordre 1',p:`<b>Quand :</b> la réaction est d’ordre 1 (désintégration radioactive, beaucoup de décompositions) et on cherche une concentration, une durée, k ou t<sub>½</sub>. <b>Pourquoi :</b> v = k[A] s’intègre en [A] = [A]₀·e<sup>−kt</sup> ; la fraction restante ne dépend que de kt. <b>Comment :</b><ol><li>Concentration à t : [A] = [A]₀·e<sup>−kt</sup>.</li><li>Durée pour atteindre [A] : <b>t = ln([A]₀/[A]) / k</b>.</li><li>Demi-vie : <b>t<sub>½</sub> = ln 2 / k</b>, et réciproquement k = ln 2 / t<sub>½</sub>.</li><li>Après n demi-vies, il reste (1/2)<sup>n</sup> de la quantité initiale.</li></ol>`,
  demo:{enonce:'Une décomposition d’ordre 1 a k = 0,010 s⁻¹ et [A]₀ = 0,80 mol/L. Que vaut [A] après 100 s&nbsp;? Combien de temps faut-il pour descendre à 0,10 mol/L&nbsp;?',
   etapes:[{f:'[A] = 0,80 × e<sup>−0,010 × 100</sup> = 0,80 × e<sup>−1</sup> ≈ 0,294 mol/L',w:'On applique la loi intégrée avec kt = 1 (sans unité).'},
    {f:'t = ln(0,80/0,10) / 0,010 = ln 8 / 0,010 ≈ 208 s',w:'On isole t en prenant le logarithme de [A]₀/[A].'},
    {f:'t<sub>½</sub> = 0,693 / 0,010 ≈ 69,3 s et 208 ≈ 3 × 69,3 ✓',w:'0,80 → 0,40 → 0,20 → 0,10 : trois demi-vies, cohérent.'}],
   conclusion:'[A] ≈ 0,294 mol/L après 100 s ; il faut environ 208 s pour atteindre 0,10 mol/L.'}},
 {h:'Demi-vie d’ordre 1',p:'Une réaction d’ordre 1 a pour constante k = 0,0231 s⁻¹. Calcule sa demi-vie, à la seconde près.',lab:'t½ =',unit:'s',ans:30,tol:.5,
  why:'t<sub>½</sub> = ln 2 / k = 0,693 / 0,0231 ≈ 30 s.'},
 {h:'Le temps d’une décomposition',p:'Une réaction d’ordre 1 a k = 0,050 s⁻¹. En combien de temps [A] passe-t-elle de 0,60 à 0,15 mol/L&nbsp;? Au dixième de seconde.',lab:'t =',unit:'s',ans:27.7,tol:.1,
  why:'t = ln(0,60/0,15) / 0,050 = ln 4 / 0,050 ≈ 27,7 s, soit deux demi-vies de 13,9 s.'},
 {kind:'Méthode',h:'Utiliser les lois d’ordre 0 et d’ordre 2',p:`<b>Quand :</b> la réaction est d’ordre 0 (vitesse constante, par exemple une catalyse saturée) ou d’ordre 2 (v = k[A]², rencontre de deux molécules A). <b>Pourquoi :</b> chaque loi de vitesse s’intègre en une forme différente ; la demi-vie dépend alors de [A]₀. <b>Comment :</b><ol><li>Ordre 0 : [A] = [A]₀ − kt, t<sub>½</sub> = [A]₀/(2k). k en mol/(L·s).</li><li>Ordre 2 : <b>1/[A] = 1/[A]₀ + kt</b>, t<sub>½</sub> = 1/(k[A]₀). k en L/(mol·s).</li><li>Calcule d’abord 1/[A] (ordre 2), puis inverse à la fin.</li></ol>`,
  demo:{enonce:'Une réaction d’ordre 2 a k = 0,50 L/(mol·s) et [A]₀ = 0,40 mol/L. Que vaut [A] après 10 s&nbsp;?',
   etapes:[{f:'1/[A]₀ = 1/0,40 = 2,5 L/mol',w:'La forme intégrée d’ordre 2 est linéaire en 1/[A], pas en [A].'},
    {f:'1/[A] = 2,5 + 0,50 × 10 = 7,5 L/mol',w:'On ajoute kt, en L/mol.'},
    {f:'[A] = 1/7,5 ≈ 0,133 mol/L',w:'On n’oublie pas d’inverser à la fin.'},
    {f:'t<sub>½</sub> = 1/(0,50 × 0,40) = 5 s : 10 s = 2 t<sub>½</sub>, mais [A] ≠ [A]₀/4',w:'À l’ordre 2, chaque demi-vie dure deux fois plus que la précédente : l’astuce des demi-vies successives ne marche qu’à l’ordre 1.'}],
   conclusion:'[A] ≈ 0,133 mol/L après 10 s.'}},
 {h:'Ordre 0',p:'Une réaction d’ordre 0 a k = 0,010 mol/(L·s) et [A]₀ = 0,50 mol/L. Quelle est sa demi-vie&nbsp;?',lab:'t½ =',unit:'s',ans:25,tol:.1,
  why:'t<sub>½</sub> = [A]₀/(2k) = 0,50 / 0,020 = 25 s : la concentration baisse de 0,25 mol/L à vitesse constante.'},
 {kind:'Méthode',h:'Déterminer l’ordre par linéarisation',p:`<b>Quand :</b> on dispose d’un tableau de mesures [A] en fonction de t et on cherche l’ordre et k. <b>Pourquoi :</b> chaque loi intégrée devient une <b>droite</b> pour une bonne variable : [A] (ordre 0), ln[A] (ordre 1), 1/[A] (ordre 2). Seul le bon ordre aligne les points. <b>Comment :</b><ol><li>Calcule ln[A] et 1/[A] pour chaque mesure.</li><li>Cherche quelle grandeur varie de la même quantité à chaque intervalle de temps égal (ou trace les trois graphes).</li><li>La pente donne k : −k pour [A] et ln[A], +k pour 1/[A].</li></ol>`,
  demo:{enonce:'On mesure [A] = 1,00 ; 0,50 ; 0,25 ; 0,125 mol/L à t = 0, 10, 20, 30 s. Ordre et k&nbsp;?',
   etapes:[{f:'[A] : écarts −0,50, −0,25, −0,125 → pas une droite',w:'Les écarts ne sont pas constants : ce n’est pas l’ordre 0.'},
    {f:'1/[A] = 1, 2, 4, 8 : écarts +1, +2, +4 → pas une droite',w:'Ce n’est pas l’ordre 2.'},
    {f:'ln[A] = 0 ; −0,693 ; −1,386 ; −2,079 : écart constant −0,693',w:'ln[A] diminue de la même quantité toutes les 10 s : droite, ordre 1.'},
    {f:'k = 0,693 / 10 = 0,0693 s⁻¹',w:'La pente de ln[A] en fonction de t vaut −k.'}],
   conclusion:'Ordre 1, k ≈ 0,0693 s⁻¹ (t<sub>½</sub> = 10 s, ce qui se voyait aussi : [A] est divisée par 2 toutes les 10 s).'}},
 {kind:'Pratique',h:'Trouver l’ordre',p:'Ces mesures suivent un seul ordre. Choisis le graphique où les points s’alignent : [A] (ordre 0), ln[A] (ordre 1) ou 1/[A] (ordre 2) en fonction de t.',
  params:[{id:'g',l:'0 : [A] · 1 : ln[A] · 2 : 1/[A]',min:0,max:2,v:0}],
  draw:v=>{ const ts=[0,1,2,3,4,5,6,7,8], A=ts.map(t=>1/(1+0.5*t)), f=[a=>a,a=>Math.log(a),a=>1/a][v.g], ys=A.map(f);
    const lo=Math.min(...ys), hi=Math.max(...ys), P=plane({x:[-0.5,8.5],y:[lo-(hi-lo)*.1,hi+(hi-lo)*.15],h:200,grid:false,axes:false});
    P.seg(0,ys[0],8,ys[8],{c:'var(--muted)',w:1.5,dash:true}); ts.forEach((t,i)=>P.dot(t,ys[i],{c:'var(--accent)',r:5}));
    P.text(8.4,hi+(hi-lo)*.05,['[A]','ln[A]','1/[A]'][v.g]+' en fonction de t',{a:'end',s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const ts=[0,1,2,3,4,5,6,7,8], ys=ts.map(t=>[a=>a,a=>Math.log(a),a=>1/a][v.g](1/(1+0.5*t))), n=9, mx=4, my=ys.reduce((s,y)=>s+y,0)/n;
    let sxy=0,sxx=0,syy=0; ts.forEach((t,i)=>{ sxy+=(t-mx)*(ys[i]-my); sxx+=(t-mx)**2; syy+=(ys[i]-my)**2; }); return `coefficient de détermination R² = ${fmt(sxy*sxy/(sxx*syy),4)}`; },
  ok:v=>v.g===2,why:'1/[A] est une droite de pente k = 0,5 L/(mol·s) : la réaction est d’ordre 2. Les autres graphes sont courbés.'},
 {h:'Lire k sur des mesures',p:'On mesure [A] = 0,50 ; 0,25 ; 0,167 mol/L à t = 0, 20, 40 s. Trouve l’ordre par linéarisation, puis donne k (dans l’unité de cet ordre), au centième.',lab:'k =',ans:.1,tol:.005,
  why:'1/[A] = 2, 4, 6 L/mol augmente de 2 toutes les 20 s : droite, ordre 2, de pente k = 2/20 = 0,10 L/(mol·s). [A] et ln[A] ne varient pas régulièrement.'},
 {kind:'Méthode',h:'L’ordre par les vitesses initiales',p:`<b>Quand :</b> on a mesuré la vitesse initiale v₀ pour plusieurs concentrations initiales [A]₀. <b>Pourquoi :</b> v₀ = k[A]₀<sup>n</sup> ; le rapport de deux expériences élimine k : v₂/v₁ = ([A]₂/[A]₁)<sup>n</sup>. <b>Comment :</b><ol><li>Choisis deux expériences où seule [A]₀ change.</li><li>Calcule les rapports des vitesses et des concentrations.</li><li><b>n = ln(v₂/v₁) / ln([A]₂/[A]₁)</b> (concentration × 2 et vitesse × 4 : n = 2).</li><li>k = v₀ / [A]₀<sup>n</sup> avec l’une des expériences.</li></ol>`,
  demo:{enonce:'Avec [A]₀ = 0,10 mol/L, v₀ = 2,0·10⁻⁴ mol/(L·s) ; avec [A]₀ = 0,20 mol/L, v₀ = 8,0·10⁻⁴ mol/(L·s). Ordre et k&nbsp;?',
   etapes:[{f:'[A]₀ × 2 → v₀ × 4',w:'On compare les deux expériences.'},
    {f:'2<sup>n</sup> = 4 → n = 2',w:'n = ln 4 / ln 2 = 2.'},
    {f:'k = 2,0·10⁻⁴ / 0,10² = 0,020 L/(mol·s)',w:'On reporte une expérience dans v₀ = k[A]₀².'}],
   conclusion:'La réaction est d’ordre 2 en A, avec k = 0,020 L/(mol·s).'}},
 {h:'Tripler la concentration',p:'Avec [A]₀ = 0,050 mol/L, v₀ = 1,5·10⁻³ mol/(L·s) ; avec [A]₀ = 0,15 mol/L, v₀ = 4,5·10⁻³ mol/(L·s). Quel est l’ordre de la réaction&nbsp;?',lab:'ordre n =',ans:1,
  why:'[A]₀ est multipliée par 3 et v₀ aussi : 3<sup>n</sup> = 3, donc n = 1.'},
 {h:'Trois demi-vies',p:'Pour une réaction d’ordre 1, quel pourcentage du réactif reste-t-il après trois demi-vies&nbsp;?',lab:'reste :',unit:'%',ans:12.5,tol:.05,
  why:'À chaque demi-vie la quantité est divisée par 2 : 100 → 50 → 25 → 12,5 %.'},
 {kind:'Théorie',h:'La barrière d’énergie',p:`<p>Dans l’air, le bois et le dioxygène se touchent sans cesse, et pourtant le bois ne brûle pas tout seul : il faut une allumette. Pourquoi tant de chocs restent-ils sans effet, et pourquoi chauffer change-t-il tout&nbsp;?</p>
<div class="def"><p>Pour réagir, deux molécules doivent se choquer avec assez d’énergie pour casser des liaisons et passer par un arrangement instable, l’<b>état de transition</b>. L’énergie minimale nécessaire, par mole, est l’<b>énergie d’activation E<sub>a</sub></b> : c’est la hauteur de la barrière sur le profil d’énergie.</p></div>
<div class="idea"><p>Les molécules n’ont pas toutes la même énergie : quelques-unes sont bien plus rapides que la moyenne. La fraction des chocs qui dépassent E<sub>a</sub> vaut à peu près <b>e<sup>−E<sub>a</sub>/RT</sup></b>. Elle est minuscule, mais elle croît très vite avec T : chauffer un peu peuple beaucoup la « queue » des molécules énergiques.</p></div>
<div class="ex"><p>Pour E<sub>a</sub> = 50 kJ/mol à 300 K : e<sup>−50 000/(8,314 × 300)</sup> ≈ 2,0·10⁻⁹, deux chocs sur un milliard. À 310 K : 3,8·10⁻⁹. Dix degrés de plus, soit 3 % de température en plus, presque deux fois plus de chocs efficaces.</p></div>
<div class="blk" data-t="Catalyseur"><p>Un <b>catalyseur</b> ouvre un autre chemin, de barrière plus basse, sans être consommé. Abaisser E<sub>a</sub> de 75 à 50 kJ/mol à 298 K multiplie la vitesse par e<sup>25 000/(8,314 × 298)</sup> ≈ 2,4·10⁴. Il abaisse la barrière dans les deux sens : il ne change pas l’équilibre.</p></div>
<div class="warn"><p>E<sub>a</sub> n’a rien à voir avec ΔH : une réaction très exothermique peut avoir une barrière élevée, comme la combustion du bois.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,6],h:170,grid:false,axes:false}); const E=x=>1.5+3.5*Math.exp(-((x-4.5)**2)/1.6)-0.8/(1+Math.exp(-(x-4.5)*1.5));
    P.fn(E,{from:0.3,to:9.7}).seg(1,1.5,4.5,1.5,{c:'var(--muted)',w:1,dash:true}).arrow(2.2,1.5,2.2,E(4.5),{c:'var(--bad)',w:1.5}).text(2.4,3.3,'Eₐ',{c:'var(--bad)'});
    P.text(0.4,1.1,'réactifs',{s:11,c:'var(--muted)'}).text(9.6,0.3,'produits',{a:'end',s:11,c:'var(--muted)'}).text(4.5,E(4.5)+0.25,'état de transition',{a:'middle',s:11,c:'var(--muted)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Loi d’Arrhenius',p:`<p>L’idée de barrière explique pourquoi la chaleur accélère les réactions. Pour prévoir de combien, il faut une loi qui relie k à la température.</p>
<div class="thm"><p><b>Loi d’Arrhenius</b> : <b>k = A·e<sup>−E<sub>a</sub>/RT</sup></b>, avec T en kelvins, E<sub>a</sub> en J/mol et R = 8,314 J/(mol·K). Le <b>facteur préexponentiel</b> A (même unité que k) compte les chocs bien orientés ; l’exponentielle est la fraction de ceux qui franchissent la barrière.</p></div>
<div class="why"><p>En prenant le logarithme : <b>ln k = ln A − (E<sub>a</sub>/R)·(1/T)</b>. Tracé en fonction de 1/T, ln k est une <b>droite</b> de pente −E<sub>a</sub>/R : c’est ainsi qu’on mesure E<sub>a</sub>. Avec deux températures, ln A disparaît dans la différence.</p></div>
<div class="ex"><p>Ici A = 10¹³ s⁻¹. Pour E<sub>a</sub> = 50 kJ/mol à 300 K : k = 10¹³ × 1,97·10⁻⁹ ≈ 2,0·10⁴ s⁻¹. À 310 K, k est multipliée par exp[(50 000/8,314)(1/300 − 1/310)] ≈ 1,91.</p></div>
<div class="idea"><p>Plus E<sub>a</sub> est grande, plus la droite est raide : la réaction est lente à froid, mais très sensible à la température. Monte E<sub>a</sub> et regarde le facteur affiché pour 10 K de plus grandir.</p></div>
<div class="warn"><p>T en kelvins, toujours : avec des degrés Celsius, 1/T n’a aucun sens (1/0 à 0 °C).</p></div>`,
  params:[{id:'E',l:'Eₐ',min:20,max:120,step:10,v:50,u:' kJ/mol'},{id:'T',l:'T',min:280,max:380,step:10,v:300,u:' K'}],
  draw:v=>{ const lk=x=>Math.log(1e13)-v.E*1000/R*x/1000, P=plane({x:[2.5,3.7],y:[-25,32],h:220,grid:false,axes:false});
    P.fn(lk,{from:2.5,to:3.7}).dot(1000/v.T,lk(1000/v.T),{c:'var(--ink)'});
    P.text(3.68,-23,'1000/T (K⁻¹)',{a:'end',s:11,c:'var(--muted)'}).text(2.52,29,'ln k',{s:11,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const k=T=>1e13*Math.exp(-v.E*1000/(R*T)); return `k(${v.T} K) = ${sci(k(v.T))} s⁻¹ · passer à ${v.T+10} K multiplie k par <b>${fmt(k(v.T+10)/k(v.T),2)}</b>`; },
  note:'Plus E<sub>a</sub> est grande, plus la droite est raide et plus la réaction est sensible à la température.'},
 {kind:'Méthode',h:'Arrhenius avec deux températures',p:`<b>Quand :</b> on connaît E<sub>a</sub> et on cherche comment k change entre deux températures. <b>Pourquoi :</b> en divisant k(T₂) = A·e<sup>−E<sub>a</sub>/RT₂</sup> par k(T₁), le facteur A inconnu disparaît : <b>ln(k₂/k₁) = (E<sub>a</sub>/R)·(1/T₁ − 1/T₂)</b>. <b>Comment :</b><ol><li>Températures en kelvins, E<sub>a</sub> en J/mol.</li><li>Calcule E<sub>a</sub>/R (en K), puis 1/T₁ − 1/T₂.</li><li>Multiplie, puis prends l’exponentielle : k₂/k₁ = e<sup>…</sup>.</li><li>Contrôle : si T₂ &gt; T₁, le rapport est supérieur à 1.</li></ol>`,
  demo:{enonce:'Une réaction a E<sub>a</sub> = 75 kJ/mol. Par combien k est-elle multipliée de 300 K à 320 K&nbsp;?',
   etapes:[{f:'E<sub>a</sub>/R = 75 000 / 8,314 ≈ 9021 K',w:'On met E<sub>a</sub> en J/mol pour l’accorder avec R.'},
    {f:'1/300 − 1/320 ≈ 2,083·10⁻⁴ K⁻¹',w:'Garde 4 chiffres : cette différence est petite et sensible aux arrondis.'},
    {f:'ln(k₂/k₁) = 9021 × 2,083·10⁻⁴ ≈ 1,879',w:'On multiplie les deux facteurs.'},
    {f:'k₂/k₁ = e<sup>1,879</sup> ≈ 6,55',w:'On repasse à l’exponentielle.'}],
   conclusion:'Vingt degrés de plus rendent la réaction 6,5 fois plus rapide.'}},
 {h:'Dix degrés de plus',p:'Une réaction a E<sub>a</sub> = 50 kJ/mol. Par combien k est-elle multipliée quand T passe de 298 K à 308 K&nbsp;? Au centième.',lab:'k₃₀₈/k₂₉₈ =',ans:1.93,tol:.02,
  why:'k₃₀₈/k₂₉₈ = exp[(E<sub>a</sub>/R)(1/298 − 1/308)] = exp[6014 × 1,09·10⁻⁴] = exp(0,655) ≈ 1,93.'},
 {kind:'Méthode',h:'Trouver l’énergie d’activation',p:`<b>Quand :</b> on a mesuré k (ou une durée, qui varie comme 1/k) à deux températures et on cherche E<sub>a</sub>. <b>Pourquoi :</b> c’est la même relation d’Arrhenius, résolue pour E<sub>a</sub>. <b>Comment :</b><ol><li>Calcule le rapport k₂/k₁ (si on donne des durées : k₂/k₁ = durée₁/durée₂).</li><li><b>E<sub>a</sub> = R·ln(k₂/k₁) / (1/T₁ − 1/T₂)</b>.</li><li>Convertis en kJ/mol. Une valeur entre 20 et 200 kJ/mol est vraisemblable.</li></ol>`,
  demo:{enonce:'La constante de vitesse double entre 300 K et 310 K. Que vaut E<sub>a</sub>&nbsp;?',
   etapes:[{f:'k₂/k₁ = 2 → ln 2 ≈ 0,693',w:'Seul le rapport compte : on n’a pas besoin des valeurs de k.'},
    {f:'1/300 − 1/310 ≈ 1,075·10⁻⁴ K⁻¹',w:'Températures en kelvins.'},
    {f:'E<sub>a</sub> = 8,314 × 0,693 / 1,075·10⁻⁴ ≈ 53 600 J/mol',w:'On isole E<sub>a</sub> dans ln(k₂/k₁) = (E<sub>a</sub>/R)(1/T₁ − 1/T₂).'}],
   conclusion:'E<sub>a</sub> ≈ 53,6 kJ/mol : c’est l’origine de la règle « 10 degrés de plus doublent la vitesse » autour de la température ambiante.'}},
 {h:'Une vitesse qui triple',p:'La constante de vitesse d’une réaction triple quand la température passe de 290 K à 300 K. Calcule E<sub>a</sub>, au dixième de kJ/mol (R = 8,314 J/(mol·K)).',lab:'E<sub>a</sub> =',unit:'kJ/mol',ans:79.5,tol:.1,
  why:'E<sub>a</sub> = 8,314 × ln 3 / (1/290 − 1/300) = 8,314 × 1,0986 / 1,149·10⁻⁴ ≈ 79 500 J/mol = 79,5 kJ/mol.'},
 {kind:'Défi',h:'Ordre 2',p:'Une réaction d’ordre 2 a k = 0,20 L/(mol·s) et [A]₀ = 0,50 mol/L. Que vaut [A] après 10 s&nbsp;?',lab:'[A] =',unit:'mol/L',ans:.25,tol:.002,
  why:'1/[A] = 1/0,50 + 0,20 × 10 = 2 + 2 = 4 L/mol, donc [A] = 0,25 mol/L. C’est exactement une demi-vie : t<sub>½</sub> = 1/(k[A]₀) = 10 s.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : cinétique',p:`<div class="keep"><ul>
<li>Vitesse : v = −(1/a)·d[A]/dt = (1/c)·d[C]/dt, la même pour toutes les espèces ; vitesse d’une espèce = v × son coefficient. Instantanée : pente de la tangente.</li>
<li>Loi de vitesse v = k[A]<sup>m</sup>[B]<sup>n</sup> : les ordres se mesurent, ils ne se lisent pas sur l’équation.</li>
<li>Ordre 0 : [A] = [A]₀ − kt, t<sub>½</sub> = [A]₀/(2k). Ordre 1 : [A] = [A]₀e<sup>−kt</sup>, t = ln([A]₀/[A])/k, t<sub>½</sub> = ln 2/k indépendante de [A]₀. Ordre 2 : 1/[A] = 1/[A]₀ + kt, t<sub>½</sub> = 1/(k[A]₀).</li>
<li>Trouver l’ordre : la grandeur [A], ln[A] ou 1/[A] qui varie linéairement avec t ; ou les vitesses initiales, n = ln(v₂/v₁)/ln([A]₂/[A]₁).</li>
<li>Énergie d’activation : barrière à franchir ; fraction de chocs efficaces ≈ e<sup>−E<sub>a</sub>/RT</sup>. Un catalyseur abaisse E<sub>a</sub> sans déplacer l’équilibre.</li>
<li>Arrhenius : k = A·e<sup>−E<sub>a</sub>/RT</sup> ; ln(k₂/k₁) = (E<sub>a</sub>/R)(1/T₁ − 1/T₂), T en K et E<sub>a</sub> en J/mol. Une durée varie comme 1/k.</li>
</ul></div>`},
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
