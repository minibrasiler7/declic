/* Déclic — Maths au secondaire, 10e année : puissances, nombres réels, hasard */
(()=>{
/* ---------- helpers locaux ---------- */
// exposant en caractères Unicode : E(-3) → ⁻³
const E=n=>String(n).split('').map(ch=>ch==='-'?'⁻':'⁰¹²³⁴⁵⁶⁷⁸⁹'[+ch]).join('');
// grand nombre avec espaces fines entre les groupes de 3 chiffres
const sp=n=>{ const neg=n<0; const s=String(Math.abs(n)).split('.'); const i=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,' '); return (neg?'−':'')+i+(s[1]?','+s[1]:''); };
const pgcd=(a,b)=>b?pgcd(b,a%b):a;
const frac=(a,b)=>{ const g=pgcd(a,b)||1; return b/g===1?String(a/g):F(a/g,b/g); };
// rangées de cases étiquetées (un facteur par case)
function boxes(items,o={}){
  const per=o.per||8, rows=Math.max(1,Math.ceil(items.length/per));
  const P=plane({x:[0,per*1.1+.1],y:[0,rows*1.1+.1],grid:false,axes:false,w:o.w||320});
  if(!items.length) P.text(per*.55,.55,o.empty||'aucun facteur',{a:'middle',dy:5,c:'var(--muted)'});
  items.forEach((it,i)=>{ const r=Math.floor(i/per), c=i%per, x=c*1.1+.1, y=(rows-1-r)*1.1+.1, col=it.c||'var(--accent)';
    P.rect(x,y,1,1,{fill:col,fo:.22,c:col,w:2});
    P.text(x+.5,y+.5,it.t,{a:'middle',dy:5,s:o.s||14});
    if(it.x) P.seg(x+.1,y+.1,x+.9,y+.9,{c:'var(--bad)',w:2.5}); });
  return P.svg();
}
// une face de dé (n points) dans le repère P
const PIPS={1:[[.5,.5]],2:[[.27,.73],[.73,.27]],3:[[.27,.73],[.5,.5],[.73,.27]],4:[[.27,.27],[.27,.73],[.73,.27],[.73,.73]],5:[[.27,.27],[.27,.73],[.73,.27],[.73,.73],[.5,.5]],6:[[.27,.25],[.27,.5],[.27,.75],[.73,.25],[.73,.5],[.73,.75]]};
function die(P,x,y,n,q={}){ const s=q.s||1;
  P.rect(x,y,s,s,{fill:q.fill||'var(--surface)',fo:q.fo??1,c:q.c||'var(--ink)',w:q.w||2});
  PIPS[n].forEach(([a,b])=>P.dot(x+a*s,y+b*s,{r:q.r||3.5,c:q.pc||'var(--ink)'})); }
function sixFaces(hl,o={}){ // hl(n) → couleur de surlignage ou null
  const P=plane({x:[0,12.6],y:[0,2.4],grid:false,axes:false,w:o.w||320});
  for(let n=1;n<=6;n++){ const c=hl?hl(n):null; die(P,.3+(n-1)*2.07,.5,n,{s:1.6,fill:c||'var(--surface)',fo:c?.35:1,c:c||'var(--ink)',w:c?3:2,r:3.2}); }
  return P.svg(); }
// roue de loterie à n secteurs égaux ; col(i) → [couleur, opacité]
function wheel(n,col,o={}){
  const P=plane({x:[-1.25,1.25],y:[-1.2,1.4],grid:false,axes:false,w:o.w||220});
  for(let i=0;i<n;i++){ const a0=Math.PI/2-i*2*Math.PI/n, a1=a0-2*Math.PI/n, pts=[[0,0]];
    for(let j=0;j<=16;j++){ const a=a0+(a1-a0)*j/16; pts.push([Math.cos(a),Math.sin(a)]); }
    const [c,fo]=col(i); P.poly(pts,{fill:c,fo,c:'var(--ink)',w:1.5});
    if(o.lab){ const am=(a0+a1)/2; P.text(.66*Math.cos(am),.66*Math.sin(am),o.lab(i),{a:'middle',dy:4,s:11}); } }
  P.poly([[0,1.02],[-.09,1.3],[.09,1.3]],{fill:'var(--bad)',fo:1,c:'var(--bad)',w:1});
  return P.svg(); }
// générateur pseudo-aléatoire à graine fixe (mulberry32) : la simulation est toujours la même
const rng=(seed=>()=>{ seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; })(20261107);
const FLIPS=Array.from({length:500},()=>rng()<.5?1:0);
const CUM=[0]; FLIPS.forEach((f,i)=>CUM.push(CUM[i]+f));
// tableau des 36 issues de deux dés ; val(r,c) → texte, hl(r,c) → booléen
function diceGrid(val,hl){
  const P=plane({x:[0,7.1],y:[0,7.5],grid:false,axes:false,w:300});
  P.rect(0,6,1,1,{fill:'var(--line)',fo:.5,c:'var(--muted)',w:1}); P.text(.5,6.5,'+',{a:'middle',dy:5,c:'var(--muted)'});
  for(let k=1;k<=6;k++){ P.rect(k,6,1,1,{fill:'var(--spark)',fo:.2,c:'var(--muted)',w:1}).text(k+.5,6.5,String(k),{a:'middle',dy:5,c:'var(--spark)'});
    P.rect(0,6-k,1,1,{fill:'var(--accent)',fo:.2,c:'var(--muted)',w:1}).text(.5,6.5-k,String(k),{a:'middle',dy:5,c:'var(--accent)'}); }
  for(let r=1;r<=6;r++) for(let c=1;c<=6;c++){ const h=hl&&hl(r,c);
    P.rect(c,6-r,1,1,{fill:h?'var(--ok)':'var(--surface)',fo:h?.45:0,c:'var(--muted)',w:1}); P.text(c+.5,6.5-r,String(val(r,c)),{a:'middle',dy:5,s:12}); }
  P.text(4,7.2,'dé bleu →',{a:'middle',dy:4,s:11,c:'var(--spark)'}).text(.05,7.2,'dé rouge ↓',{dy:4,s:11,c:'var(--accent)'});
  return P.svg(); }
// tableau HTML simple
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;
const pct=x=>fmt(x*100,1)+' %';

COURS.push(
/* ===================== PUISSANCES ET CALCUL ===================== */
{subj:'sec', sem:'a10', id:'sec10-puissances', o:1, h:'Puissances et calcul', p:'Les priorités, les puissances et leurs règles, les carrés parfaits et la racine carrée, les nombres négatifs élevés à une puissance.', steps:[
 {kind:'Théorie',h:'Priorités et vocabulaire : le rappel',p:`<p>Dans un jeu vidéo, tu ramasses 2 pièces, puis 3² coffres de 2 pièces chacun. Ton score s’écrit 2 + 3² · 2. Est-ce 20 ? 22 ? 50 ? Tout le monde doit trouver la même chose : c’est le rôle des <b>priorités</b>.</p>
<div class="def"><p>Le résultat d’une addition est une <b>somme</b> (ses nombres sont les <b>termes</b>), celui d’une soustraction une <b>différence</b>, celui d’une multiplication un <b>produit</b> (ses nombres sont les <b>facteurs</b>), celui d’une division un <b>quotient</b>. On calcule dans cet ordre : 1) les <b>parenthèses</b> ; 2) les <b>puissances</b> ; 3) les <b>multiplications et divisions</b>, de gauche à droite ; 4) les <b>additions et soustractions</b>, de gauche à droite.</p></div>
<div class="idea"><p>Le produit « colle » plus fort que la somme : 3² · 2 forme un bloc, ce sont les coffres. Les parenthèses servent à imposer un autre ordre. La figure montre le calcul ligne par ligne.</p></div>
<div class="ex"><p>2 + 3² · 2 = 2 + 9 · 2 = 2 + 18 = 20. Avec des parenthèses : (2 + 3)² · 2 = 5² · 2 = 25 · 2 = 50.</p></div>
<div class="warn"><p>24 : 4 · 2 se calcule de gauche à droite : 6 · 2 = 12, et non 24 : 8 = 3.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,4.4],grid:false,axes:false});
    const L=[['2 + 3² · 2','',3.9],['2 + 9 · 2','puissance : 3² = 9',2.8],['2 + 18','produit : 9 · 2 = 18',1.7],['20','somme',.6]];
    L.forEach(([t,w,y],i)=>{ P.text(2.6,y,t,{a:'middle',dy:5,s:15,c:i===3?'var(--accent)':'var(--ink)'}); if(w) P.text(5.2,y+.55,w,{dy:5,s:11,c:'var(--muted)'}); if(i) P.arrow(2.6,y+.85,2.6,y+.3,{c:'var(--muted)',w:1.5,hs:7}); });
    return P.svg(); })(),
  note:'La calculatrice respecte les priorités : tape le calcul en entier, avec les touches ( et ) pour les parenthèses.'},
 {kind:'Méthode',h:'Calculer en respectant les priorités',p:'<b>Quand :</b> un calcul mélange plusieurs opérations. <b>Pourquoi ça marche :</b> les priorités sont une règle commune, tout le monde lit le calcul de la même façon. <b>Comment :</b> repère ce qu’il faut faire en premier, calcule-le, recopie le reste sans rien changer, et recommence. Une seule étape par ligne : on écrit une chaîne d’égalités, chacune vraie.',
  demo:{enonce:'Calculer 20 − 2 · (3 + 1)² : 4.',
   etapes:[
    {f:'20 − 2 · 4² : 4',w:'Les parenthèses d’abord : 3 + 1 = 4.'},
    {f:'20 − 2 · 16 : 4',w:'Puis la puissance : 4² = 4 · 4 = 16.'},
    {f:'20 − 32 : 4 = 20 − 8',w:'Multiplications et divisions de gauche à droite : 2 · 16 = 32, puis 32 : 4 = 8.'},
    {f:'20 − 8 = 12',w:'Il ne reste que la soustraction.'}],
   conclusion:'20 − 2 · (3 + 1)² : 4 = 12.'},
  note:'<b>Piège :</b> 2 · (3 + 1)² n’est pas (2 · 4)². La puissance porte seulement sur la parenthèse qu’elle touche.'},
 {h:'À toi : le score du jeu',p:'Calcule 5 + 3 · (6 − 2)² − 10 : 2.',lab:'résultat =',ans:48,
  why:'(6 − 2)² = 4² = 16 ; 3 · 16 = 48 ; 10 : 2 = 5 ; donc 5 + 48 − 5 = 48.'},
 {kind:'Théorie',h:'Les puissances : un raccourci pour les produits',p:`<p>Une vidéo circule : chaque jour, chaque personne qui la reçoit l’envoie à 2 amis. Le 5e jour, combien de nouvelles personnes la reçoivent ? 2 · 2 · 2 · 2 · 2. Écrire tous ces 2 devient vite pénible.</p>
<div class="def"><p>Pour un nombre <i>a</i> et un naturel <i>n</i> ≥ 1, la <b>puissance</b> <i>a</i><sup><i>n</i></sup> est le produit de <i>n</i> facteurs tous égaux à <i>a</i> : <i>a</i><sup><i>n</i></sup> = <i>a</i> · <i>a</i> · … · <i>a</i>. Le nombre <i>a</i> est la <b>base</b>, le petit nombre <i>n</i> en haut est l’<b>exposant</b>. On lit « <i>a</i> puissance <i>n</i> ». On dit aussi « <i>a</i> au carré » pour <i>a</i>² et « <i>a</i> au cube » pour <i>a</i>³.</p></div>
<div class="idea"><p>L’exposant compte les facteurs. Bouge les curseurs : chaque case est un facteur. Avec la base 2, ajouter une case double le résultat.</p></div>
<div class="ex"><p>2⁵ = 2 · 2 · 2 · 2 · 2 = 32. 10³ = 10 · 10 · 10 = 1000 : l’exposant de 10 compte les zéros. 1⁸ = 1, car 1 · 1 · … · 1 = 1.</p></div>
<div class="warn"><p>2⁵ n’est pas 2 · 5 = 10. L’exposant ne multiplie pas la base, il dit combien de fois elle est facteur.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Selon une légende, l’inventeur des échecs demanda 1 grain de riz sur la 1re case, 2 sur la 2e, 4 sur la 3e, et ainsi de suite en doublant. Sur la 64e case seule, il faudrait 2⁶³ grains : plus de 9 milliards de milliards, bien plus que toutes les récoltes de l’histoire.</p></div>`,
  params:[{id:'a',l:'Base a',min:1,max:10,v:2},{id:'n',l:'Exposant n',min:1,max:8,v:3}],
  draw:v=>boxes(Array.from({length:v.n},()=>({t:String(v.a)}))),
  info:v=>`${v.a}${E(v.n)} = ${Array(v.n).fill(v.a).join(' · ')} = <b>${sp(v.a**v.n)}</b> (${v.n} facteur${v.n>1?'s':''})`},
 {kind:'Théorie',h:'Multiplier et diviser des puissances de même base',p:`<p>Le premier jour, 2³ personnes voient ta vidéo, et chacune la montre ensuite à 2² amis. Combien de spectateurs au bout de la chaîne ? 2³ · 2². Pas besoin de calculer chaque puissance : il suffit de compter les facteurs.</p>
<div class="prop"><p>Pour une même base <i>a</i> : <b><i>a</i><sup><i>m</i></sup> · <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>+<i>n</i></sup></b> et, si <i>m</i> ≥ <i>n</i> et <i>a</i> ≠ 0, <b><i>a</i><sup><i>m</i></sup> : <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>−<i>n</i></sup></b>. Par convention, <b><i>a</i>⁰ = 1</b> pour tout <i>a</i> ≠ 0.</p></div>
<div class="why"><p>2³ · 2² = (2 · 2 · 2) · (2 · 2) : 3 facteurs puis 2 facteurs, cela fait 5 facteurs, donc 2⁵. Pour le quotient, on écrit une fraction et on barre les facteurs communs en haut et en bas : 2⁵ : 2² = 2³, il reste 5 − 2 = 3 facteurs. Et 2³ : 2³ = 1, alors que la règle donne 2³⁻³ = 2⁰ : voilà pourquoi on pose 2⁰ = 1.</p></div>
<div class="ex"><p>5⁴ · 5³ = 5⁷. 7⁹ : 7⁶ = 7³ = 343. 10⁶ : 10⁶ = 10⁰ = 1. Choisis « quotient » sur le curseur pour voir les facteurs barrés.</p></div>
<div class="warn"><p>Les règles ne marchent qu’avec la <b>même base</b> : 2³ · 3² = 8 · 9 = 72 ne s’écrit pas comme une seule puissance. Et 2³ + 2² = 12 n’est pas 2⁵ : les règles concernent les produits, jamais les sommes.</p></div>`,
  params:[{id:'a',l:'Base a',min:2,max:5,v:2},{id:'m',l:'Exposant m',min:1,max:6,v:3},{id:'n',l:'Exposant n',min:1,max:6,v:2},{id:'op',l:'Opération (0 produit, 1 quotient)',min:0,max:1,v:0}],
  draw:v=>{ const t=String(v.a);
    if(!v.op) return boxes([...Array.from({length:v.m},()=>({t})),...Array.from({length:v.n},()=>({t,c:'var(--spark)'}))],{per:12});
    const P=plane({x:[0,6.7],y:[0,2.6],grid:false,axes:false,w:320}), k=Math.min(v.m,v.n);
    const row=(cnt,y,col)=>{ for(let i=0;i<cnt;i++){ const x=.1+i*1.1; P.rect(x,y,1,1,{fill:col,fo:.22,c:col,w:2}).text(x+.5,y+.5,t,{a:'middle',dy:5,s:14}); if(i<k) P.seg(x+.1,y+.1,x+.9,y+.9,{c:'var(--bad)',w:2.5}); } };
    row(v.m,1.5,'var(--accent)'); row(v.n,.05,'var(--spark)'); P.seg(.05,1.3,6.65,1.3,{c:'var(--ink)',w:2});
    return P.svg(); },
  info:v=>{ const a=v.a;
    if(!v.op) return `${a}${E(v.m)} · ${a}${E(v.n)} = ${a}${E(v.m+v.n)} = ${sp(a**(v.m+v.n))} : ${v.m} + ${v.n} = ${v.m+v.n} facteurs`;
    if(v.m>v.n) return `${a}${E(v.m)} : ${a}${E(v.n)} = ${a}${E(v.m-v.n)} = ${sp(a**(v.m-v.n))} : il reste ${v.m} − ${v.n} = ${v.m-v.n} facteur${v.m-v.n>1?'s':''} en haut`;
    if(v.m===v.n) return `${a}${E(v.m)} : ${a}${E(v.n)} = ${a}⁰ = 1 : tous les facteurs se barrent`;
    return `${a}${E(v.m)} : ${a}${E(v.n)} = 1 : ${a}${E(v.n-v.m)} = 1/${sp(a**(v.n-v.m))} : il reste ${v.n-v.m} facteur${v.n-v.m>1?'s':''} en bas (ici m &lt; n)`; }},
 {kind:'Théorie',h:'Puissance d’une puissance, puissance d’un produit',p:`<p>Combien vaut (2³)², le carré de 2³ ? C’est 2³ · 2³, deux paquets de trois facteurs 2. Et 2³ · 5³ ? Les bases sont différentes, mais les exposants sont égaux : il y a aussi une règle.</p>
<div class="prop"><p><b>(<i>a</i><sup><i>m</i></sup>)<sup><i>n</i></sup> = <i>a</i><sup><i>m</i>·<i>n</i></sup></b> : la puissance d’une puissance multiplie les exposants. <b><i>a</i><sup><i>m</i></sup> · <i>b</i><sup><i>m</i></sup> = (<i>a</i> · <i>b</i>)<sup><i>m</i></sup></b> : le produit de deux puissances de même exposant est la puissance du produit.</p></div>
<div class="why"><p>(2³)² = 2³ · 2³ : 2 paquets de 3 facteurs, donc 2 · 3 = 6 facteurs, 2⁶ (en haut de la figure : 2 rangées de 3 cases). Pour la seconde règle, 2³ · 5³ = (2 · 2 · 2) · (5 · 5 · 5). On change l’ordre des facteurs pour former des paires : (2 · 5) · (2 · 5) · (2 · 5) = 10³ (en bas de la figure).</p></div>
<div class="ex"><p>(3²)⁴ = 3⁸. (10²)³ = 10⁶ = 1 000 000. 2⁴ · 5⁴ = 10⁴ = 10 000. 4³ · 25³ = 100³ = 1 000 000.</p></div>
<div class="warn"><p>(2³)² = 2⁶, pas 2⁵ : on multiplie les exposants, on ne les additionne pas. Et une somme ne se « distribue » pas : (2 + 3)² = 25, alors que 2² + 3² = 13.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>C’est René Descartes qui, en 1637, a répandu l’écriture avec un petit exposant en haut. Avant lui, on écrivait <i>aaa</i>, ou des mots comme « cube » et « carré-carré ».</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,5.4],grid:false,axes:false});
    [4.1,3.0].forEach(y=>{ for(let i=0;i<3;i++) P.rect(.3+i*1.05,y,.95,.95,{fill:'var(--accent)',fo:.22,c:'var(--accent)',w:2}).text(.775+i*1.05,y+.475,'2',{a:'middle',dy:5});
      P.text(3.55,y+.475,'= 2³',{dy:5,s:12,c:'var(--muted)'}); });
    P.text(5.2,3.95,'(2³)² = 2⁶',{dy:5,s:15,c:'var(--accent)'});
    for(let g=0;g<3;g++){ const x=.3+g*2.35; P.rect(x,.5,.95,.95,{fill:'var(--spark)',fo:.22,c:'var(--spark)',w:2}).text(x+.475,.975,'2',{a:'middle',dy:5});
      P.rect(x+1.05,.5,.95,.95,{fill:'var(--math)',fo:.22,c:'var(--math)',w:2}).text(x+1.525,.975,'5',{a:'middle',dy:5});
      P.text(x+1,1.75,'10',{a:'middle',dy:5,s:12,c:'var(--muted)'}); }
    P.text(7.4,1.1,'2³ · 5³ = 10³',{dy:5,s:14,c:'var(--spark)'});
    return P.svg(); })()},
 {kind:'Méthode',h:'Simplifier avec les règles des puissances',p:'<b>Quand :</b> un calcul contient des produits, des quotients ou des puissances de puissances. <b>Pourquoi ça marche :</b> chaque règle ne fait que compter les facteurs ; on évite ainsi de calculer de très grands nombres. <b>Comment :</b> 1) écris tout avec la même base si possible (4 = 2², 8 = 2³, 9 = 3², 25 = 5²…) ; 2) applique les règles une par une, en commençant par les puissances de puissances ; 3) calcule la puissance finale seulement à la fin.',
  demo:{enonce:'Calculer (2³)² · 4 : 2⁵.',
   etapes:[
    {f:'(2³)² = 2⁶',w:'Puissance d’une puissance : on multiplie les exposants, 3 · 2 = 6.'},
    {f:'4 = 2², donc 2⁶ · 2² = 2⁸',w:'On écrit 4 comme une puissance de 2, puis on additionne les exposants : 6 + 2 = 8.'},
    {f:'2⁸ : 2⁵ = 2³',w:'Quotient de même base : on soustrait les exposants, 8 − 5 = 3.'},
    {f:'2³ = 8',w:'On calcule seulement à la fin, avec un petit exposant.'}],
   conclusion:'(2³)² · 4 : 2⁵ = 8. Contrôle : 64 · 4 : 32 = 256 : 32 = 8.'},
  note:'Pour deux bases différentes avec le même exposant, pense à la règle du produit : 4⁵ · 25⁵ = 100⁵ = 10¹⁰.'},
 {kind:'Pratique',h:'Trouve l’exposant',p:'Règle le curseur pour que 2<sup><i>k</i></sup> soit égal à (2³)² · 2². Utilise les règles plutôt que d’essayer au hasard.',
  params:[{id:'k',l:'Exposant k',min:0,max:12,v:5}],
  draw:v=>boxes(Array.from({length:v.k},()=>({t:'2'})),{per:12,empty:'aucun facteur : 2⁰ = 1'}),
  info:v=>`2${E(v.k)} = ${sp(2**v.k)}`,
  ok:v=>v.k===8,why:'(2³)² = 2³ˣ² = 2⁶, puis 2⁶ · 2² = 2⁶⁺² = 2⁸. Donc k = 8. Contrôle : 64 · 4 = 256 = 2⁸.'},
 {kind:'Défi',h:'Le chiffre des unités de 3²⁰²⁶',p:'<p>Impossible de calculer 3²⁰²⁶ à la main : ce nombre a près de 1000 chiffres. Pourtant, on peut trouver son <b>chiffre des unités</b>. Commence par 3¹, 3², 3³, 3⁴, 3⁵… et observe le dernier chiffre.</p>',lab:'chiffre des unités =',ans:9,
  why:'3¹ = 3, 3² = 9, 3³ = 27, 3⁴ = 81, 3⁵ = 243 : les unités suivent le cycle 3, 9, 7, 1, qui se répète tous les 4 exposants. 2026 = 4 · 506 + 2, donc 3²⁰²⁶ finit comme 3² : par 9. Stratégie : commencer par des cas simples et chercher une régularité.'},
 {kind:'Théorie',h:'Carrés parfaits et racine carrée',p:`<p>Tu as 49 dalles carrées et tu veux carreler une terrasse carrée sans rien couper. Combien de dalles sur chaque côté ? Il faut le nombre qui, multiplié par lui-même, donne 49 : c’est 7.</p>
<div class="def"><p>Un <b>carré parfait</b> est le carré d’un naturel : 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225… La <b>racine carrée</b> d’un nombre positif <i>a</i>, notée √<i>a</i>, est le nombre <b>positif</b> dont le carré vaut <i>a</i>. Ainsi √49 = 7 car 7² = 49.</p></div>
<div class="idea"><p>Le mot « carré » vient de la figure : un carré de côté <i>n</i> contient <i>n</i> · <i>n</i> = <i>n</i>² petits carreaux. La racine carrée fait le chemin inverse : on connaît le nombre de carreaux, on cherche le côté. Bouge le curseur.</p></div>
<div class="ex"><p>√81 = 9 car 9² = 81. √144 = 12. √1 = 1 et √0 = 0. √10 000 = 100, car 100² = 10 000.</p></div>
<div class="warn"><p>La racine n’est pas une moitié : √16 = 4, pas 8. Et (−7)² = 49 aussi, mais √49 désigne toujours la racine positive, 7.</p></div>`,
  params:[{id:'n',l:'Côté n',min:1,max:20,v:5}],
  draw:v=>{ const n=v.n, P=plane({x:[-.02*n,n*1.02],y:[-.02*n,n*1.02],grid:false,axes:false,w:240});
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) P.rect(i,j,1,1,{fill:(i+j)%2?'var(--accent)':'var(--sci)',fo:.3,c:'var(--surface)',w:1});
    P.rect(0,0,n,n,{c:'var(--ink)',w:2}); return P.svg(); },
  info:v=>`${v.n}² = ${v.n} · ${v.n} = <b>${v.n*v.n}</b> carreaux, donc √${v.n*v.n} = <b>${v.n}</b>`},
 {kind:'Méthode',h:'Trouver la racine d’un carré parfait',p:'<b>Quand :</b> on cherche √<i>a</i> pour un grand carré parfait, sans calculatrice. <b>Pourquoi ça marche :</b> les carrés des dizaines sont faciles (30² = 900, 40² = 1600, 50² = 2500…), et le chiffre des unités d’un carré ne dépend que du chiffre des unités du nombre : 1² et 9² finissent par 1, 2² et 8² par 4, 3² et 7² par 9, 4² et 6² par 6, 5² par 5, 0² par 0. <b>Comment :</b> encadre <i>a</i> entre deux carrés de dizaines, regarde son chiffre des unités pour garder deux candidats, puis vérifie en calculant.',
  demo:{enonce:'Trouver √1764.',
   etapes:[
    {f:'40² = 1600 &lt; 1764 &lt; 2500 = 50²',w:'La racine est donc entre 40 et 50.'},
    {f:'1764 finit par 4 : la racine finit par 2 ou par 8',w:'Seuls 2² = 4 et 8² = 64 se terminent par 4.'},
    {f:'42² = 42 · 42 = 1764',w:'On teste le premier candidat : c’est le bon. (48² = 2304 serait trop grand.)'}],
   conclusion:'√1764 = 42.'}},
 {h:'À toi : la racine d’un grand carré',p:'Sans calculatrice, trouve √2304.',lab:'√2304 =',ans:48,
  why:'40² = 1600 et 50² = 2500 : la racine est entre 40 et 50. 2304 finit par 4, donc la racine finit par 2 ou 8. 42² = 1764, trop petit ; 48² = 2304. Donc √2304 = 48.'},
 {kind:'Théorie',h:'Nombres négatifs : signes, produits et puissances',p:`<p>En 9e, tu as additionné des nombres relatifs comme un ascenseur qui monte et descend : −3 + 5 = 2 et 4 − 9 = −5. Mais que vaut (−2) · (−3) ? Et (−2)⁴ ?</p>
<div class="prop"><p><b>Règle des signes</b> pour un produit ou un quotient de deux nombres : deux signes <b>égaux</b> donnent un résultat <b>positif</b>, deux signes <b>différents</b> un résultat <b>négatif</b>. Pour une puissance d’un nombre négatif : un exposant <b>pair</b> donne un résultat positif, un exposant <b>impair</b> un résultat négatif.</p></div>
<div class="why"><p>Regarde la suite (−2) · 3 = −6, (−2) · 2 = −4, (−2) · 1 = −2, (−2) · 0 = 0 : à chaque ligne, le résultat augmente de 2. Pour continuer, (−2) · (−1) = 2, puis (−2) · (−2) = 4. Pour une puissance, chaque paire de facteurs négatifs donne un produit positif : avec un nombre pair de facteurs, tous s’apparient.</p></div>
<div class="ex"><p>(−4) · (−5) = 20. 18 : (−3) = −6. (−2)⁴ = (−2) · (−2) · (−2) · (−2) = 16. (−2)³ = −8. (−1)¹⁰⁰ = 1.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Vers l’an 628, le mathématicien indien Brahmagupta écrivait déjà les règles des signes avec des « fortunes » (les positifs) et des « dettes » (les négatifs). En Europe, beaucoup se méfiaient encore des nombres négatifs mille ans plus tard.</p></div>`,
  params:[{id:'b',l:'Base −b, avec b =',min:1,max:5,v:2},{id:'n',l:'Exposant n',min:1,max:7,v:3}],
  draw:v=>boxes(Array.from({length:v.n},()=>({t:`(−${v.b})`,c:'var(--bad)'})),{s:12}),
  info:v=>{ const r=(-v.b)**v.n; return `(−${v.b})${E(v.n)} = <b>${sp(r)}</b> : ${v.n} facteurs négatifs, exposant ${v.n%2?'impair, résultat négatif':'pair, résultat positif'}`; }},
 {kind:'Méthode',h:'(−3)² ou −3² : ne pas se tromper',p:'<b>Quand :</b> un calcul contient un signe moins devant une puissance. <b>Pourquoi ça marche :</b> l’exposant porte seulement sur ce qui est juste à sa gauche. Dans (−3)², c’est la parenthèse : (−3) · (−3) = 9. Dans −3², c’est le 3 seul : on calcule 3² = 9, puis on prend l’opposé, −9. <b>Comment :</b> repère sur quoi porte chaque exposant, calcule les puissances avec la règle des signes, puis termine avec les priorités. Sur la calculatrice, tape les parenthèses : sans elles, « (−) 3 x² » donne −9.',
  demo:{enonce:'Calculer −3² + (−3)² − (−2)³ : 4.',
   etapes:[
    {f:'−3² = −9 et (−3)² = 9',w:'Le premier exposant ne porte que sur 3, le second porte sur −3.'},
    {f:'(−2)³ = −8',w:'Trois facteurs négatifs, exposant impair : le résultat est négatif.'},
    {f:'−9 + 9 − (−8) : 4 = −9 + 9 − (−2)',w:'La division passe avant la soustraction : (−8) : 4 = −2 (signes différents).'},
    {f:'0 − (−2) = 0 + 2 = 2',w:'Soustraire −2, c’est ajouter 2.'}],
   conclusion:'−3² + (−3)² − (−2)³ : 4 = 2.'}},
 {h:'À toi : attention aux signes',p:'Calcule −4² + (−3)³ : (−9).',lab:'résultat =',ans:-13,
  why:'−4² = −16 (l’exposant ne porte que sur 4) ; (−3)³ = −27 ; −27 : (−9) = 3 (signes égaux) ; −16 + 3 = −13.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Vocabulaire : somme (termes), différence, produit (facteurs), quotient. Priorités : parenthèses, puissances, × et :, puis + et −, de gauche à droite.</li>
<li><i>a</i><sup><i>n</i></sup> = <i>a</i> · <i>a</i> · … · <i>a</i> (<i>n</i> facteurs) ; <i>a</i> est la base, <i>n</i> l’exposant.</li>
<li><i>a</i><sup><i>m</i></sup> · <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>+<i>n</i></sup> ; <i>a</i><sup><i>m</i></sup> : <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>−<i>n</i></sup> ; (<i>a</i><sup><i>m</i></sup>)<sup><i>n</i></sup> = <i>a</i><sup><i>m</i>·<i>n</i></sup> ; <i>a</i><sup><i>m</i></sup> · <i>b</i><sup><i>m</i></sup> = (<i>ab</i>)<sup><i>m</i></sup> ; <i>a</i>⁰ = 1.</li>
<li>Ces règles valent pour des produits et des quotients, jamais pour des sommes.</li>
<li>Carrés parfaits : 1, 4, 9, 16, 25… ; √<i>a</i> est le nombre positif dont le carré vaut <i>a</i>. Pour un grand carré parfait : encadrer entre deux dizaines, puis regarder le chiffre des unités.</li>
<li>Règle des signes : signes égaux → +, signes différents → −. Exposant pair → positif, impair → négatif.</li>
<li>(−3)² = 9 mais −3² = −9 : l’exposant porte sur ce qui est juste à sa gauche.</li>
</ul></div>`,
  note:'Pour vérifier une règle dont tu doutes, écris les facteurs en entier sur un petit exemple : 2² · 2³ = (2 · 2) · (2 · 2 · 2), cinq facteurs, donc 2⁵.'},
 {kind:'Problème',h:'La vidéo qui fait le buzz',
  p:'Le jour 1, Zoé envoie une vidéo à 3 amis. Chaque jour suivant, chaque personne qui l’a reçue la veille l’envoie à 3 nouvelles personnes. Le jour 2, 3 · 3 = 9 personnes la reçoivent, et ainsi de suite. Le nombre de nouvelles personnes du jour <i>n</i> s’écrit donc comme une puissance de 3.',
  fig:(()=>{ const P=plane({x:[0,27],y:[0,4.2],h:150,grid:false,axes:false});
    P.dot(13.5,3.6,{r:6,c:'var(--accent)'}).text(15,3.6,'Zoé',{dy:5,s:12});
    const lv=[[3,2.5,6],[9,1.4,4.5],[27,.35,3]];
    lv.forEach(([k,y,r],i)=>{ for(let j=0;j<k;j++){ const x=27*(j+.5)/k, px=i?27*(Math.floor(j/3)+.5)/(k/3):13.5, py=i?lv[i-1][1]:3.6; P.seg(px,py,x,y,{c:'var(--line)',w:1}); P.dot(x,y,{r,c:'var(--spark)'}); } });
    P.text(.2,2.5,'jour 1',{dy:-10,s:11,c:'var(--muted)'}).text(.2,1.4,'jour 2',{dy:-10,s:11,c:'var(--muted)'}).text(.2,.35,'jour 3',{dy:-12,s:11,c:'var(--muted)'});
    return P.svg(); })(),
  parts:[
   {q:'a) Combien de nouvelles personnes reçoivent la vidéo le jour 5 ?',ans:243,hint:'Le jour 1, il y a 3¹ nouvelles personnes ; le jour 2, 3² ; le jour <i>n</i>, 3<sup><i>n</i></sup>.',why:'3⁵ = 3 · 3 · 3 · 3 · 3 = 243.'},
   {q:'b) Combien de personnes en tout ont reçu la vidéo à la fin du jour 4 (sans compter Zoé) ?',ans:120,hint:'Additionne les nouvelles personnes de chaque jour, du jour 1 au jour 4.',why:'3 + 9 + 27 + 81 = 120. Attention : 3¹ + 3² + 3³ + 3⁴ n’est pas 3¹⁰, les règles des puissances ne valent pas pour les sommes.'},
   {q:'c) Combien de fois plus de nouvelles personnes y a-t-il le jour 10 que le jour 6 ?',ans:81,hint:'Calcule le quotient 3¹⁰ : 3⁶ avec une règle des exposants.',why:'3¹⁰ : 3⁶ = 3¹⁰⁻⁶ = 3⁴ = 81.'},
   {q:'d) Le jour 6, il y a 3⁶ nouvelles personnes. Quelle écriture est aussi égale à 3⁶ ?',opts:['3³ · 3²','6³','9³','3 · 6'],ans:2,hint:'Écris 9 comme une puissance de 3, puis utilise la règle de la puissance d’une puissance.',why:'9³ = (3²)³ = 3⁶ = 729. Les autres : 3³ · 3² = 3⁵ = 243 ; 6³ = 216 ; 3 · 6 = 18.'}],
  sol:'<p>Le jour <i>n</i>, la vidéo atteint 3<sup><i>n</i></sup> nouvelles personnes, car chaque jour on multiplie par 3.</p><p>a) Jour 5 : 3⁵ = 243 personnes.</p><p>b) Du jour 1 au jour 4 : 3 + 9 + 27 + 81 = 120 personnes. Une somme de puissances se calcule terme par terme.</p><p>c) 3¹⁰ : 3⁶ = 3⁴ = 81 : il y a 81 fois plus de nouvelles personnes le jour 10 que le jour 6.</p><p>d) 9³ = (3²)³ = 3²ˣ³ = 3⁶ = 729.</p><p>Réponse : 243 personnes le jour 5, 120 en tout après 4 jours, 81 fois plus le jour 10 que le jour 6.</p>'},
 {kind:'Problème',h:'Le grand cube de Lego',
  p:'Tom possède 4096 petits cubes de Lego, tous identiques. Il veut les utiliser tous pour construire un grand cube plein, comme celui de la figure (dessiné ici avec 4 cubes par arête seulement). Sa sœur préfère faire, avec les mêmes cubes, un grand carré plat d’une seule couche. Les puissances de 2 vont tout simplifier.',
  fig:(()=>{ const P=plane({x:[-.3,6.3],y:[-.3,6.3],grid:false,axes:false,w:220}), e=4, d=1.6;
    P.poly([[0,0],[e,0],[e,e],[0,e]],{fill:'var(--accent)',fo:.25,c:'var(--ink)',w:2});
    P.poly([[0,e],[e,e],[e+d,e+d],[d,e+d]],{fill:'var(--accent)',fo:.12,c:'var(--ink)',w:2});
    P.poly([[e,0],[e+d,d],[e+d,e+d],[e,e]],{fill:'var(--accent)',fo:.4,c:'var(--ink)',w:2});
    for(let k=1;k<4;k++){ const t=k/4; P.seg(k,0,k,e,{c:'var(--ink)',w:1}).seg(0,k,e,k,{c:'var(--ink)',w:1});
      P.seg(k,e,k+d,e+d,{c:'var(--ink)',w:1}).seg(t*d,e+t*d,e+t*d,e+t*d,{c:'var(--ink)',w:1});
      P.seg(e+t*d,t*d,e+t*d,e+t*d,{c:'var(--ink)',w:1}).seg(e,k,e+d,k+d,{c:'var(--ink)',w:1}); }
    return P.svg(); })(),
  parts:[
   {q:'a) On écrit 4096 = 2<sup><i>k</i></sup>. Que vaut <i>k</i> ?',lab:'k =',ans:12,hint:'Pars de 2¹⁰ = 1024, puis multiplie par 2 jusqu’à atteindre 4096.',why:'2¹⁰ = 1024, 2¹¹ = 2048, 2¹² = 4096 : <i>k</i> = 12.'},
   {q:'b) Combien de petits cubes y a-t-il le long d’une arête du grand cube de Tom ?',ans:16,hint:'Le grand cube contient <i>n</i> · <i>n</i> · <i>n</i> = <i>n</i>³ petits cubes. Écris 2¹² comme une puissance de puissance avec l’exposant 3.',why:'2¹² = (2⁴)³ car 4 · 3 = 12. Donc 4096 = 16³ : l’arête compte 16 petits cubes.'},
   {q:'c) Combien de petits cubes y a-t-il sur un côté du carré plat de sa sœur ?',ans:64,hint:'Le carré contient <i>n</i>² cubes : on cherche √4096. Écris 2¹² comme le carré d’une puissance de 2.',why:'2¹² = (2⁶)² car 6 · 2 = 12. Donc √4096 = 2⁶ = 64 cubes par côté.'},
   {q:'d) Laquelle de ces écritures n’est pas égale à 4096 ?',opts:['2⁶ · 2⁶','8³ · 2³','2⁶ + 2⁶','(2³)⁴'],ans:2,hint:'Teste chaque règle : produit de même base, produit de même exposant, puissance d’une puissance. Une somme ne suit aucune de ces règles.',why:'2⁶ + 2⁶ = 64 + 64 = 128. Les autres valent 4096 : 2⁶ · 2⁶ = 2¹², 8³ · 2³ = (8 · 2)³ = 16³, (2³)⁴ = 2¹².'}],
  sol:'<p>a) En doublant depuis 2¹⁰ = 1024 : 2¹¹ = 2048, 2¹² = 4096. Donc 4096 = 2¹².</p><p>b) Un cube d’arête <i>n</i> contient <i>n</i>³ petits cubes. Comme 2¹² = 2⁴ˣ³ = (2⁴)³ = 16³, l’arête mesure 16 petits cubes.</p><p>c) Un carré de côté <i>n</i> contient <i>n</i>² cubes. Comme 2¹² = (2⁶)² = 64², le côté compte √4096 = 64 cubes.</p><p>d) 2⁶ + 2⁶ = 2 · 2⁶ = 2⁷ = 128 : une somme n’additionne pas les exposants. Les trois autres écritures valent 2¹² = 4096.</p><p>Réponse : 16 cubes par arête pour le cube, 64 cubes par côté pour le carré.</p>'},
]},

/* ===================== FRACTIONS, NOTATION SCIENTIFIQUE ET RACINES ===================== */
{subj:'sec', sem:'a10', id:'sec10-reels', o:4, h:'Fractions, notation scientifique et racines', p:'Multiplier et diviser des fractions, les pourcentages, les exposants négatifs et la notation scientifique, les racines carrées et cubiques, les nombres irrationnels et le binaire.', steps:[
 {kind:'Théorie',h:'Multiplier et diviser des fractions',p:`<p>Une recette de crêpes demande ${F(3,4)} de litre de lait, mais tu n’en prépares que les ${F(2,3)}. Combien de lait faut-il ? On doit calculer les ${F(2,3)} de ${F(3,4)}, c’est-à-dire ${F(2,3)} · ${F(3,4)}.</p>
<div class="prop"><p>Rappel : pour additionner deux fractions, on les met d’abord au même dénominateur. Pour <b>multiplier</b>, c’est plus simple : ${F('<i>a</i>','<i>b</i>')} · ${F('<i>c</i>','<i>d</i>')} = ${F('<i>a</i> · <i>c</i>','<i>b</i> · <i>d</i>')}. Pour <b>diviser</b> par une fraction, on multiplie par son <b>inverse</b> (la fraction retournée) : ${F('<i>a</i>','<i>b</i>')} : ${F('<i>c</i>','<i>d</i>')} = ${F('<i>a</i>','<i>b</i>')} · ${F('<i>d</i>','<i>c</i>')}.</p></div>
<div class="why"><p>Sur la tablette, on colorie ${F('<i>a</i>','<i>b</i>')} des colonnes, puis ${F('<i>c</i>','<i>d</i>')} des rangées. La partie coloriée deux fois compte <i>a</i> · <i>c</i> carrés sur <i>b</i> · <i>d</i>. Pour la division, 3 : ${F(1,4)} demande « combien de quarts dans 3 ? ». Il y en a 4 dans chaque unité, donc 3 · 4 = 12 : diviser par ${F(1,4)} revient à multiplier par 4.</p></div>
<div class="ex"><p>${F(2,3)} · ${F(3,4)} = ${F(6,12)} = ${F(1,2)} : il faut un demi-litre. ${F(2,3)} : ${F(4,5)} = ${F(2,3)} · ${F(5,4)} = ${F(10,12)} = ${F(5,6)}.</p></div>
<div class="warn"><p>Ne retourne que la fraction par laquelle on divise, jamais la première.</p></div>`,
  params:[{id:'a',l:'Numérateur a',min:1,max:6,v:2},{id:'b',l:'Dénominateur b',min:2,max:6,v:3},{id:'c',l:'Numérateur c',min:1,max:6,v:3},{id:'d',l:'Dénominateur d',min:2,max:6,v:4}],
  draw:v=>{ const A=Math.min(v.a,v.b), C=Math.min(v.c,v.d), P=plane({x:[-.03,1.03],y:[-.03,1.03],grid:false,axes:false,w:220});
    P.rect(0,0,A/v.b,1,{fill:'var(--accent)',fo:.3,c:null}); P.rect(0,1-C/v.d,1,C/v.d,{fill:'var(--spark)',fo:.3,c:null});
    for(let i=1;i<v.b;i++) P.seg(i/v.b,0,i/v.b,1,{c:'var(--muted)',w:1}); for(let j=1;j<v.d;j++) P.seg(0,j/v.d,1,j/v.d,{c:'var(--muted)',w:1});
    P.rect(0,0,1,1,{c:'var(--ink)',w:2}); return P.svg(); },
  info:v=>{ const A=Math.min(v.a,v.b), C=Math.min(v.c,v.d); return `${F(A,v.b)} · ${F(C,v.d)} = ${F(A*C,v.b*v.d)}${pgcd(A*C,v.b*v.d)>1?' = '+frac(A*C,v.b*v.d):''} : ${A*C} case${A*C>1?'s':''} coloriée${A*C>1?'s':''} deux fois sur ${v.b*v.d}${v.a>v.b||v.c>v.d?' (un numérateur est limité à son dénominateur)':''}`; }},
 {kind:'Méthode',h:'Calculer avec des fractions',p:`<b>Quand :</b> on prend une fraction d’une quantité (« les ${F(3,5)} de 45 CHF »), on multiplie ou on divise des fractions. <b>Pourquoi ça marche :</b> « les ${F(3,5)} de » veut dire « · ${F(3,5)} » : on partage en 5, puis on prend 3 parts. Diviser par une fraction, c’est compter combien de fois elle tient dans le nombre. <b>Comment :</b> pour une quantité, divise par le dénominateur puis multiplie par le numérateur ; pour un produit, simplifie avant de multiplier si possible ; pour un quotient, retourne la seconde fraction et multiplie. Termine par une fraction irréductible.`,
  demo:{enonce:`a) Les ${F(3,5)} de 45 CHF. b) ${F(4,9)} · ${F(15,8)}. c) Une bouteille de ${F(3,4)} L remplit combien de verres de ${F(1,8)} L ?`,
   etapes:[
    {f:'a) 45 : 5 = 9, puis 9 · 3 = 27 CHF',w:'Un cinquième de 45 vaut 9 ; trois cinquièmes valent trois fois plus.'},
    {f:`b) ${F(4,9)} · ${F(15,8)} = ${F('4 · 15','9 · 8')} = ${F(60,72)} = ${F(5,6)}`,w:'On multiplie les numérateurs et les dénominateurs, puis on simplifie par 12. Plus rapide : simplifier 4 avec 8 et 15 avec 9 avant de multiplier.'},
    {f:`c) ${F(3,4)} : ${F(1,8)} = ${F(3,4)} · ${F(8,1)} = ${F(24,4)} = 6`,w:'On multiplie par l’inverse de 1/8, c’est-à-dire par 8.'}],
   conclusion:`27 CHF ; ${F(5,6)} ; 6 verres.`}},
 {h:'À toi : un quotient de fractions',p:`Calcule ${F(9,10)} : ${F(3,4)}. Donne le résultat exact (tu peux écrire une fraction comme a/b).`,lab:'résultat =',ans:1.2,tol:.001,
  why:`${F(9,10)} : ${F(3,4)} = ${F(9,10)} · ${F(4,3)} = ${F(36,30)} = ${F(6,5)} = 1,2.`},
 {kind:'Méthode',h:'Pourcentages : prendre, réduire, augmenter',p:`<p>Rappel : <b><i>p</i> %</b> veut dire ${F('<i>p</i>',100)}. Prendre 30 % de 50, c’est 50 · ${F(30,100)} = 15.</p><b>Quand :</b> soldes, augmentations de prix, statistiques de classe. <b>Pourquoi ça marche :</b> « pour cent » signifie « sur 100 » : un pourcentage est une fraction de dénominateur 100, on l’utilise comme une fraction d’une quantité. <b>Comment :</b> 1) <i>p</i> % de <i>Q</i> = <i>Q</i> · <i>p</i> : 100 ; 2) après un rabais de <i>p</i> %, on paie <i>Q</i> moins le rabais ; après une augmentation, <i>Q</i> plus l’augmentation ; 3) pour savoir quel pourcentage représente une part, calcule part : total, puis écris le résultat en centièmes.`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,10],grid:false,axes:false,w:180}); for(let i=0;i<100;i++){ const x=i%10, y=9-Math.floor(i/10); P.rect(x+.05,y+.05,.9,.9,{fill:i<15?'var(--accent)':'var(--line)',fo:i<15?.7:.4,c:null}); } return P.svg(); })(),
  demo:{enonce:'Des baskets à 80 CHF sont soldées à −15 %. Quel est le nouveau prix ? Ensuite : 12 élèves sur 30 viennent à vélo, quel pourcentage cela fait-il ?',
   etapes:[
    {f:'15 % de 80 = 80 · 15 : 100 = 12 CHF',w:'Le rabais vaut 15 centièmes du prix (les 15 cases sur 100 de la figure).'},
    {f:'80 − 12 = 68 CHF',w:'Après un rabais, on retire son montant du prix de départ.'},
    {f:`12 : 30 = 0,4 = ${F(40,100)} = 40 %`,w:'Part divisée par total, puis on écrit le résultat en centièmes.'}],
   conclusion:'Les baskets coûtent 68 CHF, et 40 % des élèves viennent à vélo. Pour une augmentation de 5 % d’un abonnement à 40 CHF : 5 % de 40 = 2, donc 42 CHF.'}},
 {kind:'Pratique',h:'Le pourcentage de musiciens',p:'Dans une classe de 25 élèves, 7 jouent d’un instrument. Règle le curseur sur le pourcentage d’élèves musiciens.',
  params:[{id:'p',l:'Pourcentage',min:0,max:100,step:2,v:50,u:' %'}],
  draw:v=>{ const P=plane({x:[0,22.5],y:[0,10],grid:false,axes:false,w:320});
    for(let i=0;i<25;i++){ const x=1+2*(i%5), y=9-2*Math.floor(i/5); P.circ(x,y,.75,{fill:i<7?'var(--spark)':'var(--line)',fo:i<7?.8:.5,c:null}); }
    for(let i=0;i<100;i++){ const x=12.5+i%10, y=9-Math.floor(i/10); P.rect(x+.05,y+.05,.9,.9,{fill:i<v.p?'var(--accent)':'var(--line)',fo:i<v.p?.7:.4,c:null}); }
    return P.svg(); },
  info:v=>`${v.p} % de 25 élèves = 25 · ${v.p} : 100 = ${fmt(25*v.p/100)} élève${25*v.p/100>1?'s':''}`,
  ok:v=>v.p===28,why:'7 : 25 = 0,28 = 28/100 = 28 %. Contrôle : 28 % de 25 = 25 · 28 : 100 = 7 élèves.'},
 {kind:'Théorie',h:'Puissances de 10 et exposants négatifs',p:`<p>Ton téléphone stocke des milliards d’octets ; une bactérie mesure environ un millième de millimètre. Les puissances de 10 permettent d’écrire facilement les très grands et les très petits nombres.</p>
<div class="def"><p>Pour <i>a</i> ≠ 0 et <i>n</i> naturel : <b><i>a</i><sup>−<i>n</i></sup> = ${F('1','<i>a</i><sup><i>n</i></sup>')}</b>. En particulier 10⁻¹ = ${F(1,10)} = 0,1 ; 10⁻² = ${F(1,100)} = 0,01 ; 10⁻³ = 0,001.</p></div>
<div class="why"><p>Descends l’escalier : 10³ = 1000, 10² = 100, 10¹ = 10, 10⁰ = 1. À chaque marche, l’exposant baisse de 1 et on divise par 10. En continuant : 10⁻¹ = 1 : 10 = 0,1, puis 10⁻² = 0,01. Avec cette définition, les règles des puissances restent vraies : 10⁵ · 10⁻³ = 10⁵⁻³ = 10².</p></div>
<div class="ex"><p>10⁶ = 1 000 000 (un million, 6 zéros). 10⁻⁴ = 0,0001 (le 1 est au 4e rang après la virgule). 2⁻³ = ${F(1,'2³')} = ${F(1,8)} = 0,125.</p></div>
<div class="warn"><p>10⁻² n’est pas un nombre négatif : c’est 0,01, un petit nombre positif. Le signe moins de l’exposant veut dire « diviser », pas « négatif ».</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Les préfixes des unités sont des puissances de 10 : kilo = 10³ (1 km = 1000 m), méga = 10⁶, giga = 10⁹, milli = 10⁻³ (1 mm = 0,001 m), micro = 10⁻⁶.</p></div>`,
  params:[{id:'n',l:'Exposant n',min:-6,max:6,v:3}],
  draw:v=>{ const P=plane({x:[0,13],y:[0,2.3],grid:false,axes:false,w:320});
    for(let k=6;k>=-6;k--){ const x=6-k, on=k===v.n, z=v.n>=0?(k>=0&&k<v.n):(k<=0&&k>v.n);
      P.rect(x+.04,.4,.92,.9,{fill:on?'var(--accent)':z?'var(--sci)':'var(--line)',fo:on?.5:z?.25:.25,c:null});
      if(on||z) P.text(x+.5,.85,on?'1':'0',{a:'middle',dy:5,s:14});
      P.text(x+.5,1.75,'10'+E(k),{a:'middle',dy:4,s:9,c:'var(--muted)'}); }
    P.text(7,.4,',',{a:'middle',dy:2,s:22,c:'var(--bad)'});
    return P.svg(); },
  info:v=>{ const n=v.n, val=n>=0?sp(10**n):'0,'+'0'.repeat(-n-1)+'1', pre={6:'méga',3:'kilo',2:'hecto',1:'déca',[-1]:'déci',[-2]:'centi',[-3]:'milli',[-6]:'micro'}[n];
    return `10${E(n)} = <b>${val}</b>${n<0?` = ${F(1,'10'+E(-n))} = ${F(1,sp(10**-n))}`:''}${pre?` (préfixe ${pre})`:''}`; }},
 {kind:'Théorie',h:'La notation scientifique',p:`<p>La Terre est à environ 150 000 000 km du Soleil. Le rayon d’un atome d’hydrogène vaut environ 0,000 000 000 05 m. Compter tous ces zéros, c’est risquer l’erreur : les scientifiques utilisent une écriture plus courte.</p>
<div class="def"><p>Un nombre est écrit en <b>notation scientifique</b> s’il s’écrit <b><i>a</i> · 10<sup><i>n</i></sup></b>, avec 1 ≤ <i>a</i> &lt; 10 (un seul chiffre non nul avant la virgule) et <i>n</i> un entier relatif.</p></div>
<div class="idea"><p>L’exposant <i>n</i> donne l’<b>ordre de grandeur</b> : il dit de combien de rangs la virgule a bougé. <i>n</i> est positif pour les grands nombres, négatif pour les nombres plus petits que 1. La figure place quelques objets sur l’échelle des puissances de 10, en mètres.</p></div>
<div class="ex"><p>150 000 000 km = 1,5 · 10⁸ km. 0,000 000 000 05 m = 5 · 10⁻¹¹ m. 3200 = 3,2 · 10³. 0,07 = 7 · 10⁻².</p></div>
<div class="warn"><p>45 · 10⁶ a la bonne valeur, mais n’est pas en notation scientifique, car 45 ≥ 10 : on écrit 4,5 · 10⁷.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Il y a environ 2250 ans, Archimède a voulu compter les grains de sable qu’il faudrait pour remplir tout l’Univers connu. Il a inventé pour cela une façon d’écrire des nombres gigantesques, et a trouvé environ 10⁶³ grains.</p></div>`,
  fig:(()=>{ const P=plane({x:[-12,13],y:[-2.6,2.6],h:140,grid:false,axes:false,w:320});
    P.arrow(-11.8,0,12.8,0,{c:'var(--muted)',w:1.5,hs:8});
    for(let k=-10;k<=12;k+=2){ P.seg(k,-.25,k,.25,{c:'var(--muted)',w:1.2}); P.text(k,0,'10'+E(k),{a:'middle',dy:k%4?-10:22,s:9,c:'var(--muted)'}); }
    const it=[[-10.3,'atome',1],[-5,'cellule',-1],[-2.3,'fourmi',1],[.2,'toi',-1],[3.65,'Cervin',1],[7.1,'Terre',-1],[11.18,'Terre–Soleil',1]];
    it.forEach(([x,t,s])=>{ P.dot(x,0,{r:4.5,c:'var(--accent)'}); P.text(x>10?x+.6:x,s*1.6,t,{a:x>10?'end':'middle',dy:5,s:10}); P.seg(x,s*.25,x,s*1.15,{c:'var(--accent)',w:1}); });
    return P.svg(); })(),
  note:'Sur l’échelle, chaque graduation multiplie par 100 : de l’atome à la distance Terre–Soleil, il y a 21 puissances de 10.'},
 {kind:'Méthode',h:'Écrire et calculer en notation scientifique',p:'<b>Quand :</b> un nombre a beaucoup de zéros, ou on multiplie et divise de tels nombres. <b>Pourquoi ça marche :</b> multiplier par 10 déplace la virgule d’un rang vers la droite, diviser par 10 d’un rang vers la gauche. Pour un produit, on regroupe les nombres d’un côté et les puissances de 10 de l’autre (l’ordre des facteurs ne compte pas), puis 10<sup><i>m</i></sup> · 10<sup><i>n</i></sup> = 10<sup><i>m</i>+<i>n</i></sup>. <b>Comment :</b> place la virgule juste après le premier chiffre non nul et compte de combien de rangs elle a bougé : c’est l’exposant, positif si le nombre est grand, négatif s’il est plus petit que 1. Sur la calculatrice, la touche ×10<sup>x</sup> (ou EXP, EE) tape la puissance de 10.',
  demo:{enonce:'Écrire 45 000 000 et 0,000 32 en notation scientifique, puis calculer (3 · 10⁵) · (4 · 10³) et (6 · 10⁸) : (2 · 10³).',
   etapes:[
    {f:'45 000 000 = 4,5 · 10⁷',w:'La virgule vient se placer derrière le 4 : elle a reculé de 7 rangs. Le nombre est grand, l’exposant est 7.'},
    {f:'0,000 32 = 3,2 · 10⁻⁴',w:'La virgule vient se placer derrière le 3 : elle a avancé de 4 rangs. Le nombre est plus petit que 1, l’exposant est −4.'},
    {f:'(3 · 10⁵) · (4 · 10³) = (3 · 4) · 10⁵⁺³ = 12 · 10⁸',w:'On regroupe les nombres et les puissances de 10.'},
    {f:'12 · 10⁸ = 1,2 · 10¹ · 10⁸ = 1,2 · 10⁹',w:'12 n’est pas entre 1 et 10 : on écrit 12 = 1,2 · 10.'},
    {f:'(6 · 10⁸) : (2 · 10³) = (6 : 2) · 10⁸⁻³ = 3 · 10⁵',w:'Même idée pour un quotient : on divise les nombres et on soustrait les exposants.'}],
   conclusion:'4,5 · 10⁷ ; 3,2 · 10⁻⁴ ; 1,2 · 10⁹ ; 3 · 10⁵.'},
  note:'Si le nombre devant est plus petit que 1, comme dans 0,5 · 10³, on écrit 0,5 = 5 · 10⁻¹ : 0,5 · 10³ = 5 · 10².'},
 {h:'À toi : l’épaisseur d’un cheveu',p:'Un cheveu a une épaisseur d’environ 0,000 07 m. Quelle est son écriture en notation scientifique ?',
  opts:['7 · 10⁵ m','0,7 · 10⁻⁴ m','7 · 10⁻⁵ m','7 · 10⁻⁶ m'],ans:2,
  why:'La virgule avance de 5 rangs pour se placer derrière le 7 : 0,000 07 = 7 · 10⁻⁵ m. 0,7 · 10⁻⁴ a la même valeur, mais n’est pas en notation scientifique car 0,7 &lt; 1.'},
 {kind:'Théorie',h:'Racine carrée et racine cubique',p:`<p>Un jardin carré a une aire de 20 m². Combien mesure son côté ? 4² = 16, trop petit ; 5² = 25, trop grand. Le côté est entre 4 et 5 : ce n’est pas un nombre entier. Même question avec un aquarium cubique de 27 litres.</p>
<div class="def"><p>Rappel : √<i>a</i> (pour <i>a</i> ≥ 0) est le nombre positif dont le carré vaut <i>a</i>. La <b>racine cubique</b> ∛<i>a</i> est le nombre dont le <b>cube</b> vaut <i>a</i> : ∛27 = 3 car 3³ = 27.</p></div>
<div class="idea"><p>√ donne le côté d’un carré dont on connaît l’aire ; ∛ donne l’arête d’un cube dont on connaît le volume. Bouge les curseurs : la figure dessine le carré ou le cube, et la légende montre entre quels entiers tombe la racine.</p></div>
<div class="ex"><p>√20 ≈ 4,47 (calculatrice), et 4 &lt; √20 &lt; 5 car 16 &lt; 20 &lt; 25. ∛64 = 4 car 4 · 4 · 4 = 64. Un cube de 1000 cm³ (1 litre) a une arête de ∛1000 = 10 cm.</p></div>
<div class="warn"><p>∛27 n’est pas 27 : 3 = 9. Et ∛ existe aussi pour un nombre négatif : ∛(−8) = −2, car (−2)³ = −8, alors que √(−4) n’existe pas (aucun carré n’est négatif).</p></div>`,
  params:[{id:'x',l:'Aire ou volume',min:1,max:60,v:20},{id:'m',l:'Figure (0 carré, 1 cube)',min:0,max:1,v:0}],
  draw:v=>{ const P=plane({x:[-.3,9],y:[-.3,9],grid:false,axes:false,w:220});
    if(!v.m){ const s=Math.sqrt(v.x); P.rect(0,0,s,s,{fill:'var(--accent)',fo:.3,c:'var(--ink)',w:2}); for(let k=1;k<=8;k++) if(k<s) P.seg(k,0,k,s,{c:'var(--surface)',w:1}).seg(0,k,s,k,{c:'var(--surface)',w:1}); }
    else { const e=1.7*Math.cbrt(v.x), d=.45*e;
      P.poly([[0,0],[e,0],[e,e],[0,e]],{fill:'var(--sci)',fo:.3,c:'var(--ink)',w:2}).poly([[0,e],[e,e],[e+d,e+d],[d,e+d]],{fill:'var(--sci)',fo:.15,c:'var(--ink)',w:2}).poly([[e,0],[e+d,d],[e+d,e+d],[e,e]],{fill:'var(--sci)',fo:.45,c:'var(--ink)',w:2}); }
    return P.svg(); },
  info:v=>{ const x=v.x;
    if(!v.m){ const k=Math.floor(Math.sqrt(x)+1e-9); return k*k===x?`aire ${x} : côté √${x} = <b>${k}</b> exactement (${x} est un carré parfait)`:`aire ${x} : côté √${x} ≈ <b>${fmt(Math.sqrt(x))}</b> ; ${k}² = ${k*k} &lt; ${x} &lt; ${(k+1)**2} = ${k+1}², donc ${k} &lt; √${x} &lt; ${k+1}`; }
    const k=Math.floor(Math.cbrt(x)+1e-9); return k**3===x?`volume ${x} : arête ∛${x} = <b>${k}</b> exactement (${k}³ = ${x})`:`volume ${x} : arête ∛${x} ≈ <b>${fmt(Math.cbrt(x))}</b> ; ${k}³ = ${k**3} &lt; ${x} &lt; ${(k+1)**3} = ${k+1}³, donc ${k} &lt; ∛${x} &lt; ${k+1}`; }},
 {kind:'Méthode',h:'Encadrer une racine',p:'<b>Quand :</b> la racine n’est pas un nombre entier et on veut savoir où elle se trouve, ou contrôler l’affichage de la calculatrice. <b>Pourquoi ça marche :</b> entre deux nombres positifs, le plus grand a le plus grand carré (et le plus grand cube). Si 25 &lt; 30 &lt; 36, alors √25 &lt; √30 &lt; √36. <b>Comment :</b> cherche les deux carrés parfaits (ou les deux cubes) qui entourent le nombre ; pour être plus précis, essaie des dixièmes et compare leurs carrés au nombre.',
  demo:{enonce:'Encadrer √30 entre deux entiers, puis entre deux dixièmes. Encadrer ∛100 entre deux entiers.',
   etapes:[
    {f:'5² = 25 &lt; 30 &lt; 36 = 6², donc 5 &lt; √30 &lt; 6',w:'25 et 36 sont les carrés parfaits voisins de 30.'},
    {f:'5,4² = 29,16 &lt; 30 &lt; 30,25 = 5,5²',w:'On essaie des dixièmes entre 5 et 6. 30 est à peu près au milieu de 25 et 36, on commence vers 5,5.'},
    {f:'donc 5,4 &lt; √30 &lt; 5,5',w:'La calculatrice confirme : √30 ≈ 5,477.'},
    {f:'4³ = 64 &lt; 100 &lt; 125 = 5³, donc 4 &lt; ∛100 &lt; 5',w:'Même idée avec les cubes : 1, 8, 27, 64, 125, 216…'}],
   conclusion:'5,4 &lt; √30 &lt; 5,5 et 4 &lt; ∛100 &lt; 5 (∛100 ≈ 4,64).'}},
 {h:'À toi : encadre √55',p:'Sans calculatrice, encadre √55 entre deux dixièmes consécutifs : … &lt; √55 &lt; … Donne la borne de gauche.',lab:'borne de gauche =',ans:7.4,tol:.001,
  why:'7² = 49 &lt; 55 &lt; 64 = 8², donc √55 est entre 7 et 8. Puis 7,4² = 54,76 &lt; 55 &lt; 56,25 = 7,5². Donc 7,4 &lt; √55 &lt; 7,5 (√55 ≈ 7,416).'},
 {kind:'Théorie',h:'Nombres irrationnels et ensembles de nombres',p:`<p>La calculatrice affiche √2 ≈ 1,414213562. Les chiffres s’arrêtent parce que l’écran est plein, mais en réalité ils continuent pour toujours, sans jamais se répéter en boucle : √2 ne peut pas s’écrire comme une fraction.</p>
<div class="def"><p>ℕ = {0 ; 1 ; 2 ; 3 ; …} : les <b>naturels</b>. ℤ : les <b>entiers relatifs</b> (… ; −2 ; −1 ; 0 ; 1 ; 2 ; …). ℚ : les <b>rationnels</b>, qui s’écrivent comme une fraction d’entiers ; leur écriture décimale s’arrête (0,25) ou se répète (0,333…). Un nombre <b>irrationnel</b> ne s’écrit pas comme une fraction : √2, √3, π… ℝ : les <b>réels</b>, tous les nombres de la droite graduée, rationnels et irrationnels. On a <b>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</b> (⊂ se lit « est inclus dans »).</p></div>
<div class="idea"><p>Chaque ensemble contient le précédent, comme des poupées russes (la figure). La racine carrée d’un naturel qui n’est pas un carré parfait est toujours irrationnelle : √5, √10 et √50 le sont ; √49 = 7 ne l’est pas.</p></div>
<div class="ex"><p>−4 ∈ ℤ (∈ se lit « appartient à ») mais −4 ∉ ℕ. ${F(3,8)} = 0,375 ∈ ℚ. ${F(22,7)} = 3,142857… est rationnel : ce n’est qu’une valeur approchée de π = 3,14159…</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Pour les pythagoriciens, en Grèce antique, « tout est nombre » : toute longueur devait s’écrire avec des fractions. Découvrir que la diagonale d’un carré de côté 1, qui mesure √2, n’en est pas une les aurait profondément troublés. Une légende raconte qu’Hippase, qui l’aurait révélé, fut jeté à la mer.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,6],grid:false,axes:false});
    P.rect(.2,.2,9.6,5.6,{fill:'var(--sci)',fo:.12,c:'var(--ink)',w:1.5}).rect(.6,.6,6.8,4.5,{fill:'var(--math)',fo:.15,c:'var(--ink)',w:1.5})
     .rect(1,1,4.2,3.4,{fill:'var(--spark)',fo:.2,c:'var(--ink)',w:1.5}).rect(1.4,1.4,1.9,2.2,{fill:'var(--accent)',fo:.25,c:'var(--ink)',w:1.5});
    P.text(.4,5.8,'ℝ',{dy:18,s:15}).text(.8,5.1,'ℚ',{dy:18,s:15}).text(1.2,4.4,'ℤ',{dy:18,s:15}).text(1.6,3.6,'ℕ',{dy:18,s:15});
    P.text(2.3,2,'0',{a:'middle'}).text(2.3,2.8,'7',{a:'middle'}).text(4.2,2.5,'−4',{a:'middle'}).text(6.3,3.2,'3/8',{a:'middle'}).text(6.3,1.8,'0,333…',{a:'middle'})
     .text(8.6,3.6,'√2',{a:'middle'}).text(8.6,2.4,'π',{a:'middle'}).text(8.6,1.2,'√5',{a:'middle'});
    return P.svg(); })()},
 {kind:'Méthode',h:'Compter en binaire',p:'<p>Un ordinateur ne connaît que deux états : le courant passe (1) ou ne passe pas (0). Il écrit donc tous les nombres avec seulement deux chiffres : c’est le <b>binaire</b>, ou base 2.</p><b>Quand :</b> on veut lire ou écrire un nombre comme un ordinateur. <b>Pourquoi ça marche :</b> en base 10, les rangs valent 1, 10, 100, 1000 (10⁰, 10¹, 10², 10³). En base 2, ils valent 1, 2, 4, 8, 16… (2⁰, 2¹, 2², 2³, 2⁴) et chaque rang ne contient que 0 ou 1. <b>Comment :</b> du binaire au décimal, additionne les valeurs des rangs où il y a un 1. Du décimal au binaire, prends la plus grande puissance de 2 qui tient dans le nombre, retire-la, et recommence avec le reste. Allume les lampes avec les curseurs pour t’entraîner.',
  params:[{id:'b4',l:'Lampe 16',min:0,max:1,v:0},{id:'b3',l:'Lampe 8',min:0,max:1,v:1},{id:'b2',l:'Lampe 4',min:0,max:1,v:0},{id:'b1',l:'Lampe 2',min:0,max:1,v:1},{id:'b0',l:'Lampe 1',min:0,max:1,v:1}],
  draw:v=>{ const P=plane({x:[0,10],y:[0,3.2],grid:false,axes:false,w:320}), b=[v.b4,v.b3,v.b2,v.b1,v.b0];
    b.forEach((on,i)=>{ const x=1+2*i; P.circ(x,2,.7,{fill:on?'var(--spark)':'var(--line)',fo:on?.85:.4,c:'var(--ink)',w:1.5}); P.text(x,2,String(on),{a:'middle',dy:5,s:15}); P.text(x,.6,String(2**(4-i)),{a:'middle',dy:5,s:12,c:'var(--muted)'}); });
    return P.svg(); },
  info:v=>{ const b=[v.b4,v.b3,v.b2,v.b1,v.b0], val=b.reduce((s,x,i)=>s+x*2**(4-i),0), parts=b.map((x,i)=>x?2**(4-i):0).filter(x=>x);
    return `${b.join('')} en binaire = ${parts.length?parts.join(' + '):'0'} = <b>${val}</b>`; },
  demo:{enonce:'Écrire 1011 (binaire) en décimal, puis 13 en binaire.',
   etapes:[
    {f:'1011 → rangs 8, 4, 2, 1 → 8 + 0 + 2 + 1 = 11',w:'De droite à gauche, les rangs valent 1, 2, 4, 8. On additionne ceux qui portent un 1.'},
    {f:'13 = 8 + 5',w:'La plus grande puissance de 2 qui tient dans 13 est 8 (16 est trop grand).'},
    {f:'5 = 4 + 1',w:'Avec le reste 5 : on prend 4, il reste 1, qu’on prend aussi. Le rang 2 n’est pas utilisé.'},
    {f:'13 = 8 + 4 + 0 + 1 → 1101',w:'On écrit 1 pour chaque rang utilisé, 0 sinon, du plus grand au plus petit.'}],
   conclusion:'1011 en binaire vaut 11 ; 13 s’écrit 1101 en binaire.'}},
 {kind:'Défi',h:'Six lampes',p:'Chaque lampe est allumée (1) ou éteinte (0). Avec <b>6 lampes</b> (rangs 32, 16, 8, 4, 2, 1), quel est le plus grand nombre que l’on peut écrire ? Si tu hésites, regarde d’abord ce qui se passe avec 1, 2, puis 3 lampes.',lab:'plus grand nombre =',ans:63,
  why:'Le plus grand nombre s’obtient avec toutes les lampes allumées : 111111 = 32 + 16 + 8 + 4 + 2 + 1 = 63. Cas plus simples : 1 lampe → 1, 2 lampes → 3, 3 lampes → 7, 5 lampes → 31. À chaque fois, c’est la puissance de 2 suivante moins 1 : avec 6 lampes, 2⁶ − 1 = 63. Stratégie : commencer par des cas simples et chercher une régularité.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>${F('<i>a</i>','<i>b</i>')} · ${F('<i>c</i>','<i>d</i>')} = ${F('<i>ac</i>','<i>bd</i>')} ; diviser par une fraction, c’est multiplier par son inverse. Les ${F(3,5)} de <i>Q</i> : <i>Q</i> : 5 · 3.</li>
<li><i>p</i> % = ${F('<i>p</i>',100)}. Rabais : prix moins le rabais. Augmentation : prix plus l’augmentation. Pourcentage d’une part : part : total, écrit en centièmes.</li>
<li><i>a</i><sup>−<i>n</i></sup> = 1/<i>a</i><sup><i>n</i></sup> ; 10⁻³ = 0,001. Un exposant négatif donne un petit nombre positif.</li>
<li>Notation scientifique : <i>a</i> · 10<sup><i>n</i></sup> avec 1 ≤ <i>a</i> &lt; 10. Pour calculer : nombres ensemble, puissances de 10 ensemble.</li>
<li>√<i>a</i> : côté d’un carré d’aire <i>a</i> ; ∛<i>a</i> : arête d’un cube de volume <i>a</i>. On encadre avec les carrés (ou cubes) voisins, puis avec des dixièmes.</li>
<li>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Les irrationnels (√2, π, √5…) ne s’écrivent pas comme des fractions.</li>
<li>Binaire : rangs 1, 2, 4, 8, 16… ; on additionne les rangs qui portent un 1.</li>
</ul></div>`,
  note:'Avant de taper un calcul à la calculatrice, estime l’ordre de grandeur : si l’écran affiche un résultat très différent, tu as sans doute oublié une parenthèse ou un exposant.'},
 {kind:'Problème',h:'Le potager de la classe',
  p:'La classe reçoit un terrain carré de 180 m² pour faire un potager. Les 2/3 du terrain seront plantés de légumes, et les 3/8 de la surface des légumes seront des tomates. Pour acheter les graines, la classe profite d’un rabais de 15 % sur un sac qui coûte normalement 24 CHF.',
  fig:(()=>{ const P=plane({x:[0,10],y:[0,10],grid:false,axes:false,w:200});
    P.rect(0,0,10,10,{fill:'var(--ok)',fo:.12,c:'var(--ink)',w:2}).rect(0,0,10*2/3,10,{fill:'var(--ok)',fo:.3,c:null}).rect(0,0,10*2/3,10*3/8,{fill:'var(--bad)',fo:.35,c:null});
    P.text(10/3,1.9,'tomates',{a:'middle',dy:5,s:12}).text(10/3,6.5,'légumes',{a:'middle',dy:5,s:12}).text(8.33,5,'reste',{a:'middle',dy:5,s:11,c:'var(--muted)'});
    return P.svg(); })(),
  parts:[
   {q:'a) Entre quels entiers consécutifs se trouve le côté du terrain ? Donne le plus petit.',ans:13,hint:'Le côté vaut √180. Cherche les carrés parfaits voisins de 180.',why:'13² = 169 &lt; 180 &lt; 196 = 14², donc 13 &lt; √180 &lt; 14.'},
   {q:'b) Le côté est-il un nombre rationnel ?',opts:['Oui, car 180 est un nombre entier','Non, car 180 n’est pas un carré parfait','Oui, car la calculatrice affiche un nombre décimal','On ne peut pas savoir'],ans:1,hint:'Rappelle-toi ce qui se passe pour la racine d’un naturel qui n’est pas un carré parfait.',why:'180 n’est pas un carré parfait (il est entre 169 et 196), donc √180 est irrationnel. La calculatrice n’affiche qu’une valeur approchée.'},
   {q:'c) Quelle est l’aire plantée de tomates ?',unit:'m²',ans:45,hint:'Calcule d’abord les 2/3 de 180, puis les 3/8 du résultat (ou multiplie 180 par 2/3 · 3/8).',why:'2/3 · 3/8 = 6/24 = 1/4, et 1/4 de 180 = 45 m². Par étapes : 180 : 3 · 2 = 120 m² de légumes, puis 120 : 8 · 3 = 45 m².'},
   {q:'d) Combien la classe paie-t-elle le sac de graines ?',unit:'CHF',ans:20.4,tol:.001,hint:'Calcule 15 % de 24 CHF, puis retire-le du prix.',why:'15 % de 24 = 24 · 15 : 100 = 3,60 CHF. Prix payé : 24 − 3,60 = 20,40 CHF.'}],
  sol:'<p>a) Le côté vaut √180. Comme 13² = 169 &lt; 180 &lt; 196 = 14², on a 13 &lt; √180 &lt; 14 (√180 ≈ 13,4 m).</p><p>b) 180 n’est pas un carré parfait, donc √180 est irrationnel : aucune fraction ne vaut exactement ce côté.</p><p>c) Légumes : les 2/3 de 180 = 120 m². Tomates : les 3/8 de 120 = 45 m². En une fois : 180 · 2/3 · 3/8 = 180 · 1/4 = 45 m².</p><p>d) Rabais : 15 % de 24 = 3,60 CHF. Prix payé : 24 − 3,60 = 20,40 CHF.</p><p>Réponse : un côté entre 13 m et 14 m, irrationnel ; 45 m² de tomates ; 20,40 CHF pour les graines.</p>'},
 {kind:'Problème',h:'La lumière des étoiles',
  p:'La lumière voyage à environ 3 · 10⁵ km par seconde. Le Soleil est à environ 1,5 · 10⁸ km de la Terre. L’étoile la plus proche après lui, Proxima du Centaure, est à environ 4 · 10¹³ km. Une année compte environ 3,15 · 10⁷ secondes. Tu vas calculer combien de temps la lumière met pour nous parvenir. Temps = distance : vitesse.',
  parts:[
   {q:'a) Combien de secondes la lumière du Soleil met-elle pour atteindre la Terre ?',unit:'s',ans:500,hint:'Calcule (1,5 · 10⁸) : (3 · 10⁵) : divise les nombres et soustrais les exposants.',why:'(1,5 : 3) · 10⁸⁻⁵ = 0,5 · 10³ = 500 s.'},
   {q:'b) Convertis ce temps en minutes, arrondi au dixième.',unit:'min',ans:8.3,tol:.05,hint:'Une minute compte 60 secondes.',why:'500 : 60 ≈ 8,33, soit environ 8,3 minutes.'},
   {q:'c) Combien de secondes la lumière de Proxima met-elle pour nous parvenir ?',opts:['1,3 · 10⁸ s','1,3 · 10¹⁸ s','7,5 · 10⁻⁹ s','1,2 · 10¹⁹ s'],ans:0,hint:'Calcule (4 · 10¹³) : (3 · 10⁵) et écris le résultat en notation scientifique.',why:'(4 : 3) · 10¹³⁻⁵ ≈ 1,33 · 10⁸ s. Multiplier au lieu de diviser donnerait 1,2 · 10¹⁹ ; inverser la division donnerait un nombre minuscule.'},
   {q:'d) Combien d’années cela fait-il ? Arrondis au dixième.',unit:'ans',ans:4.2,tol:.05,hint:'Divise le nombre de secondes par le nombre de secondes d’une année, 3,15 · 10⁷.',why:'(1,333 · 10⁸) : (3,15 · 10⁷) = (1,333 : 3,15) · 10¹ ≈ 0,423 · 10 ≈ 4,2 ans.'}],
  sol:'<p>On utilise temps = distance : vitesse, et les règles des puissances de 10.</p><p>a) Soleil : (1,5 · 10⁸) : (3 · 10⁵) = 0,5 · 10³ = 500 s.</p><p>b) 500 : 60 ≈ 8,3 min : la lumière du Soleil a environ 8 minutes de « retard ».</p><p>c) Proxima : (4 · 10¹³) : (3 · 10⁵) ≈ 1,33 · 10⁸ s.</p><p>d) (1,33 · 10⁸) : (3,15 · 10⁷) ≈ 4,2 ans.</p><p>Réponse : environ 8,3 minutes pour le Soleil, environ 4,2 ans pour Proxima du Centaure. Quand tu regardes cette étoile, tu la vois telle qu’elle était il y a plus de 4 ans.</p>'},
]},

/* ===================== LE HASARD ===================== */
{subj:'sec', sem:'a10', id:'sec10-hasard', o:5, h:'Le hasard', p:'Expériences aléatoires, issues et événements, fréquences, probabilités avec des dés, des cartes et des roues, événement contraire et tableaux pour deux dés.', steps:[
 {kind:'Théorie',h:'Expérience aléatoire et issues',p:`<p>Avant un match de foot, l’arbitre lance une pièce pour choisir le camp. Personne ne sait si elle tombera sur pile ou sur face : c’est le <b>hasard</b>. Pourtant, on sait exactement ce qui <b>peut</b> arriver.</p>
<div class="def"><p>Une <b>expérience aléatoire</b> est une expérience dont on connaît tous les résultats possibles, mais dont on ne peut pas prévoir le résultat à l’avance. Chaque résultat possible s’appelle une <b>issue</b>.</p></div>
<div class="idea"><p>Pour décrire une expérience aléatoire, commence toujours par faire la liste de toutes ses issues, comme sur la figure pour un dé. Si on recommence l’expérience dans les mêmes conditions, le résultat peut changer.</p></div>
<div class="ex"><p>Lancer un dé à 6 faces : 6 issues, 1, 2, 3, 4, 5 et 6. Lancer une pièce : 2 issues, pile et face. Tirer une carte dans un jeu de 52 cartes : 52 issues. Faire tourner une roue à 8 secteurs numérotés : 8 issues.</p></div>
<div class="warn"><p>Ce n’est pas une expérience aléatoire si le résultat est connu d’avance : mesurer la longueur de ta table, ou calculer 3 · 4, donne toujours la même chose.</p></div>`,
  fig:sixFaces(null),
  note:'Un jeu de 52 cartes a 4 couleurs (cœur, carreau, pique, trèfle) de 13 cartes chacune : as, 2 à 10, valet, dame et roi. Valet, dame et roi sont les 12 figures.'},
 {kind:'Théorie',h:'Les événements',p:`<p>Au jeu de l’oie, tu avances si tu obtiens un nombre pair. Ce qui t’intéresse n’est pas une issue précise, mais un groupe d’issues : 2, 4 ou 6.</p>
<div class="def"><p>Un <b>événement</b> est une condition sur le résultat d’une expérience aléatoire. On le décrit par une phrase (« obtenir un nombre pair ») ou par la liste de ses issues entre accolades : {2 ; 4 ; 6}. Ces issues sont les <b>issues favorables</b>. L’événement est <b>réalisé</b> si l’issue obtenue en fait partie.</p></div>
<div class="idea"><p>Choisis un événement avec le curseur : les faces surlignées sont ses issues favorables. Un événement peut contenir une seule issue, plusieurs, toutes (c’est un événement <b>certain</b>), ou aucune (c’est un événement <b>impossible</b>).</p></div>
<div class="ex"><p>Avec un dé, « obtenir plus que 4 » = {5 ; 6}. Si tu lances un 5, l’événement est réalisé ; si tu lances un 3, il ne l’est pas. « Obtenir 7 » est impossible : aucune issue. « Obtenir moins que 7 » est certain.</p></div>
<div class="warn"><p>« Plus que 4 » exclut 4 ; « au moins 4 » l’inclut : {4 ; 5 ; 6}. Lis bien l’énoncé avant de faire la liste.</p></div>`,
  params:[{id:'e',l:'Événement (0 à 5)',min:0,max:5,v:0}],
  draw:v=>{ const tests=[n=>n%2===0,n=>n>4,n=>n%3===0,n=>n===2||n===3||n===5,n=>n<7,n=>n===7]; return sixFaces(n=>tests[v.e](n)?'var(--ok)':null); },
  info:v=>{ const L=[['obtenir un nombre pair','{2 ; 4 ; 6}'],['obtenir plus que 4','{5 ; 6}'],['obtenir un multiple de 3','{3 ; 6}'],['obtenir un nombre premier','{2 ; 3 ; 5}'],['obtenir moins que 7','{1 ; 2 ; 3 ; 4 ; 5 ; 6}, événement certain'],['obtenir 7','aucune issue, événement impossible']][v.e]; return `« ${L[0]} » = ${L[1]}`; }},
 {h:'À toi : les issues favorables',p:'On tire au hasard une carte parmi 10 cartes numérotées de 1 à 10. Quelles issues réalisent l’événement A : « obtenir un nombre plus grand que 7 » ?',
  opts:['{7 ; 8 ; 9 ; 10}','{8 ; 9}','{1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7}','{8 ; 9 ; 10}'],ans:3,
  why:'« Plus grand que 7 » exclut 7 : les issues favorables sont 8, 9 et 10, donc A = {8 ; 9 ; 10}.'},
 {kind:'Théorie',h:'Fréquence : lancer une pièce 100 fois',p:`<p>Si tu lances une pièce 10 fois, tu peux très bien obtenir 7 piles. Et si tu la lances 100 fois, ou 500 fois ? L’ordinateur l’a fait pour toi : bouge le curseur.</p>
<div class="def"><p>Quand on répète une expérience aléatoire, la <b>fréquence</b> d’un résultat est le quotient : ${F('nombre de fois où il est apparu','nombre total de répétitions')}. C’est un nombre entre 0 et 1, qu’on écrit aussi en pourcentage.</p></div>
<div class="idea"><p>Au début, la fréquence de pile saute dans tous les sens. Plus on fait de lancers, plus elle se stabilise près de 0,5, la ligne pointillée. Le hasard est imprévisible pour un lancer, mais très régulier sur un grand nombre de lancers.</p></div>
<div class="ex"><p>Dans la simulation, après 20 lancers : 7 piles, fréquence ${F(7,20)} = 0,35 = 35 %. Après 500 lancers : 249 piles, fréquence ${F(249,500)} = 0,498, beaucoup plus près de 0,5.</p></div>
<div class="warn"><p>Après 5 faces de suite, pile n’est pas « dû » : la pièce n’a pas de mémoire. Chaque lancer repart à zéro.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Au 18e siècle, le naturaliste Buffon a lancé une pièce 4040 fois. Il a obtenu 2048 piles, une fréquence d’environ 0,507.</p></div>`,
  params:[{id:'N',l:'Nombre de lancers',min:10,max:500,step:10,v:20}],
  draw:v=>{ const P=plane({x:[-30,510],y:[-.12,1.08],w:320,h:190,grid:false,axes:false});
    P.seg(0,0,500,0,{c:'var(--muted)',w:1.5}).seg(0,0,0,1,{c:'var(--muted)',w:1.5}).seg(0,.5,500,.5,{c:'var(--muted)',w:1.2,dash:true});
    [0,.5,1].forEach(y=>P.text(-6,y,fmt(y),{a:'end',dy:4,s:10,c:'var(--muted)'})); [100,200,300,400,500].forEach(x=>P.text(x,0,String(x),{a:'middle',dy:14,s:10,c:'var(--muted)'}));
    const pts=[]; for(let i=1;i<=v.N;i++) pts.push([i,CUM[i]/i]); P.poly(pts,{open:true,c:'var(--accent)',w:2});
    P.dot(v.N,CUM[v.N]/v.N,{r:5}); return P.svg(); },
  info:v=>`Après ${v.N} lancers : ${CUM[v.N]} piles, fréquence ${F(CUM[v.N],v.N)} ≈ <b>${fmt(CUM[v.N]/v.N,3)}</b> (${pct(CUM[v.N]/v.N)})`},
 {kind:'Méthode',h:'Calculer une fréquence',p:'<b>Quand :</b> on a répété une expérience et compté combien de fois un résultat est apparu. <b>Pourquoi ça marche :</b> la fréquence compare l’effectif (le nombre d’apparitions) au total ; elle permet de comparer des séries de tailles différentes. <b>Comment :</b> 1) compte l’effectif du résultat ; 2) divise par le nombre total de répétitions ; 3) écris le résultat en décimal, puis en pourcentage (multiplie par 100). Termine par une phrase de réponse.',
  demo:{enonce:'Léa lance un dé 50 fois et obtient 11 fois le 6. Quelle est la fréquence du 6 ?',
   etapes:[
    {f:'effectif du 6 : 11 ; total : 50',w:'On repère les deux nombres de la fraction.'},
    {f:`fréquence = ${F(11,50)} = 11 : 50 = 0,22`,w:'Effectif divisé par total.'},
    {f:`0,22 = ${F(22,100)} = 22 %`,w:'En centièmes, on lit directement le pourcentage.'}],
   conclusion:'Le 6 est sorti avec une fréquence de 0,22, soit 22 % des lancers. C’est un peu plus que 1/6 ≈ 0,17 : sur 50 lancers seulement, un tel écart est normal.'}},
 {h:'À toi : la roue de la kermesse',p:'On a fait tourner une roue 80 fois ; elle s’est arrêtée 28 fois sur le bleu. Quelle est la fréquence du bleu, en pourcentage ?',lab:'fréquence =',unit:'%',ans:35,
  why:'28 : 80 = 0,35 = 35/100, soit 35 %.'},
 {kind:'Théorie',h:'Probabilité quand les issues ont la même chance',p:`<p>Avec un dé bien équilibré, chaque face a autant de chances de sortir. On peut alors <b>calculer</b> la chance d’un événement sans lancer le dé.</p>
<div class="def"><p>Des issues sont <b>équiprobables</b> si elles ont toutes la même chance d’arriver. Dans ce cas, la <b>probabilité</b> d’un événement A est : <b>P(A) = ${F('nombre d’issues favorables','nombre d’issues possibles')}</b>.</p></div>
<div class="idea"><p>La probabilité est la fréquence qu’on attend « en moyenne » sur un très grand nombre d’essais. Sur la roue, tous les secteurs ont la même taille : la probabilité de tomber sur la couleur, c’est le nombre de secteurs colorés sur le nombre total de secteurs.</p></div>
<div class="ex"><p>Dé : P(pair) = ${F(3,6)} = ${F(1,2)}. Jeu de 52 cartes : P(as) = ${F(4,52)} = ${F(1,13)} ; P(cœur) = ${F(13,52)} = ${F(1,4)}. Roue de 8 secteurs dont 3 rouges : P(rouge) = ${F(3,8)}.</p></div>
<div class="warn"><p>La formule ne marche que si les issues sont équiprobables. Une roue dont le secteur rouge occupe la moitié n’a pas « une chance sur 4 » de tomber sur rouge, même si elle a 4 secteurs.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Le calcul des probabilités est né en 1654, dans des lettres entre Blaise Pascal et Pierre de Fermat. Un joueur leur demandait comment partager équitablement les mises d’une partie de dés interrompue.</p></div>`,
  params:[{id:'n',l:'Nombre de secteurs',min:2,max:12,v:8},{id:'k',l:'Secteurs colorés',min:0,max:12,v:3}],
  draw:v=>{ const k=Math.min(v.k,v.n); return wheel(v.n,i=>i<k?['var(--accent)',.6]:['var(--line)',.4]); },
  info:v=>{ const k=Math.min(v.k,v.n); return `P(couleur) = ${F(k,v.n)}${pgcd(k,v.n)>1&&k?' = '+frac(k,v.n):''} ≈ ${fmt(k/v.n,3)} (${pct(k/v.n)})${v.k>v.n?' ; il n’y a que '+v.n+' secteurs':''}`; }},
 {kind:'Théorie',h:'Une probabilité est toujours entre 0 et 1',p:`<p>« Il y a 150 % de chances que je gagne ! » Cette phrase n’a pas de sens. Pourquoi ? Parce qu’une probabilité a des bornes.</p>
<div class="prop"><p>Pour tout événement A : <b>0 ≤ P(A) ≤ 1</b>. Un événement <b>impossible</b> a une probabilité de 0, un événement <b>certain</b> une probabilité de 1.</p></div>
<div class="why"><p>Le nombre d’issues favorables est au moins 0 et au plus égal au nombre d’issues possibles. Le quotient ${F('favorables','possibles')} est donc entre ${F(0,'possibles')} = 0 et ${F('possibles','possibles')} = 1.</p></div>
<div class="idea"><p>Imagine une échelle de 0 à 1 (la figure). Plus un événement est proche de 1, plus il est probable. À 0,5, il a autant de chances d’arriver que de ne pas arriver : « une chance sur deux ».</p></div>
<div class="ex"><p>Avec un dé : P(7) = ${F(0,6)} = 0, impossible. P(6) = ${F(1,6)} ≈ 0,17, peu probable. P(pair) = 0,5. P(au moins 2) = ${F(5,6)} ≈ 0,83, très probable. P(moins que 7) = ${F(6,6)} = 1, certain.</p></div>
<div class="warn"><p>Une probabilité peut s’écrire en fraction, en décimal ou en pourcentage : ${F(1,4)} = 0,25 = 25 %. Si tu trouves plus que 1 ou un nombre négatif, il y a une erreur.</p></div>`,
  fig:(()=>{ const P=plane({x:[-.12,1.12],y:[-.5,.55],w:320,grid:false,axes:false});
    P.seg(0,0,1,0,{c:'var(--muted)',w:4});
    [[0,'0','impossible : 7',1],[1/6,'1/6','un 6',-1],[.5,'1/2','pair',1],[5/6,'5/6','au moins 2',-1],[1,'1','certain : moins que 7',1]].forEach(([x,t,l,s])=>{ P.dot(x,0,{r:6,c:'var(--accent)'}); P.text(x,0,t,{a:'middle',dy:s>0?24:-14,s:12}); P.text(x,s*.35,l,{a:x<.05?'start':x>.95?'end':'middle',dy:s>0?14:-2,s:10,c:'var(--muted)'}); });
    return P.svg(); })()},
 {kind:'Théorie',h:'L’événement contraire',p:`<p>Au jeu des petits chevaux, tu dois faire un 6 pour sortir. Quelle est la probabilité de <b>ne pas</b> y arriver ? Plutôt que de compter 1, 2, 3, 4, 5, il y a plus rapide.</p>
<div class="def"><p>L’<b>événement contraire</b> de A, noté « non A » (ou A̅, « A barre »), est réalisé exactement quand A ne l’est pas. Ses issues sont toutes celles qui ne sont pas dans A.</p></div>
<div class="prop"><p><b>P(non A) = 1 − P(A)</b>.</p></div>
<div class="why"><p>Chaque issue est soit dans A, soit dans non A, jamais dans les deux (la figure : faces vertes pour A, rouges pour non A). Les issues favorables de A et de non A font donc, ensemble, toutes les issues possibles : P(A) + P(non A) = 1.</p></div>
<div class="ex"><p>A = « obtenir 6 » : P(A) = ${F(1,6)}, donc P(non A) = 1 − ${F(1,6)} = ${F(5,6)}. Une carte au hasard parmi 52 : P(figure) = ${F(12,52)} = ${F(3,13)}, donc P(pas une figure) = 1 − ${F(3,13)} = ${F(10,13)}.</p></div>
<div class="warn"><p>Le contraire de « obtenir plus que 4 » n’est pas « obtenir moins que 4 » : c’est « obtenir 4 ou moins », {1 ; 2 ; 3 ; 4}.</p></div>`,
  fig:sixFaces(n=>n===6?'var(--ok)':'var(--bad)')},
 {kind:'Méthode',h:'Calculer une probabilité',p:'<b>Quand :</b> une expérience a des issues équiprobables (dé équilibré, carte tirée au hasard, billes identiques au toucher, roue à secteurs égaux). <b>Pourquoi ça marche :</b> chaque issue a la même chance, donc la probabilité d’un événement est la part des issues qui lui sont favorables. <b>Comment :</b> 1) compte toutes les issues possibles ; 2) compte les issues favorables ; 3) fais le quotient et simplifie ; 4) si l’événement a beaucoup d’issues, calcule plutôt son contraire et utilise 1 − P. Contrôle : le résultat est entre 0 et 1.',
  fig:(()=>{ const P=plane({x:[0,10.4],y:[0,1.4],grid:false,axes:false,w:300}); const c=['var(--bad)','var(--bad)','var(--bad)','var(--bad)','var(--bad)','var(--math)','var(--math)','var(--math)','var(--ok)','var(--ok)'];
    c.forEach((col,i)=>P.circ(.7+i,.7,.42,{fill:col,fo:.7,c:'var(--ink)',w:1})); return P.svg(); })(),
  demo:{enonce:'Un sac contient 5 billes rouges, 3 bleues et 2 vertes. On tire une bille au hasard. Calculer P(rouge), P(bleue) et P(pas verte).',
   etapes:[
    {f:'issues possibles : 5 + 3 + 2 = 10 billes',w:'Les billes sont identiques au toucher : les 10 issues sont équiprobables.'},
    {f:`P(rouge) = ${F(5,10)} = ${F(1,2)}`,w:'5 billes favorables sur 10, puis on simplifie par 5.'},
    {f:`P(bleue) = ${F(3,10)} = 0,3`,w:'3 billes favorables sur 10.'},
    {f:`P(verte) = ${F(2,10)}, donc P(pas verte) = 1 − ${F(2,10)} = ${F(8,10)} = ${F(4,5)}`,w:'On passe par le contraire : une seule couleur à compter au lieu de deux.'}],
   conclusion:`P(rouge) = ${F(1,2)}, P(bleue) = 0,3 et P(pas verte) = ${F(4,5)} = 0,8. Contrôle : 0,5 + 0,3 + 0,2 = 1.`}},
 {kind:'Pratique',h:'Construis la roue',p:'Règle la roue pour que la probabilité de tomber sur la couleur soit égale à <b>2/3</b>. Plusieurs réponses sont possibles.',
  params:[{id:'n',l:'Nombre de secteurs',min:2,max:12,v:6},{id:'k',l:'Secteurs colorés',min:0,max:12,v:3}],
  draw:v=>{ const k=Math.min(v.k,v.n); return wheel(v.n,i=>i<k?['var(--spark)',.6]:['var(--line)',.4]); },
  info:v=>{ const k=Math.min(v.k,v.n); return `P(couleur) = ${F(k,v.n)} ≈ ${fmt(k/v.n,3)}`; },
  ok:v=>v.k<=v.n&&3*v.k===2*v.n,why:'Il faut que les secteurs colorés soient les 2/3 du total : 2 sur 3, 4 sur 6, 6 sur 9 ou 8 sur 12. Ce sont des fractions égales à 2/3.'},
 {h:'À toi : pas de cœur',p:'On tire une carte au hasard dans un jeu de 52 cartes, qui compte 13 cœurs. Quelle est la probabilité de ne <b>pas</b> tirer un cœur ? Donne-la en fraction ou en décimal.',lab:'P(pas cœur) =',ans:.75,tol:.001,
  why:`P(cœur) = ${F(13,52)} = ${F(1,4)}, donc P(pas cœur) = 1 − ${F(1,4)} = ${F(3,4)} = 0,75. Directement : 39 cartes ne sont pas des cœurs, ${F(39,52)} = ${F(3,4)}.`},
 {kind:'Théorie',h:'Deux dés : le tableau à double entrée',p:`<p>Au Monopoly, on lance deux dés et on additionne. Les sommes vont de 2 à 12. A-t-on autant de chances de faire 2 que 7 ? Non ! Pour le voir, il faut lister toutes les issues.</p>
<div class="def"><p>Un <b>tableau à double entrée</b> range les issues de deux épreuves : chaque ligne correspond à un résultat du dé rouge, chaque colonne à un résultat du dé bleu. Pour deux dés, il y a 6 · 6 = <b>36 cases</b>, et ces 36 issues sont équiprobables.</p></div>
<div class="idea"><p>Choisis une somme avec le curseur : les cases vertes donnent cette somme. Les sommes du milieu ont beaucoup de cases, celles des bords très peu. Les 11 sommes ne sont donc <b>pas</b> équiprobables.</p></div>
<div class="ex"><p>Somme 2 : une seule case (1 et 1), P = ${F(1,36)}. Somme 7 : six cases (1-6, 2-5, 3-4, 4-3, 5-2, 6-1), P = ${F(6,36)} = ${F(1,6)}, la plus probable.</p></div>
<div class="warn"><p>Rouge 2 et bleu 5 n’est pas la même issue que rouge 5 et bleu 2 : ce sont deux cases différentes. Les oublier fausse tout.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Vers 1620, des joueurs demandèrent à Galilée pourquoi, avec trois dés, la somme 10 sort plus souvent que 9, alors que chacune s’obtient de 6 façons. Il compta toutes les issues, ordre compris : 27 pour 10, seulement 25 pour 9.</p></div>`,
  params:[{id:'s',l:'Somme cherchée',min:2,max:12,v:9}],
  draw:v=>diceGrid((r,c)=>r+c,(r,c)=>r+c===v.s),
  info:v=>{ const k=6-Math.abs(v.s-7); return `Somme ${v.s} : ${k} case${k>1?'s':''} sur 36, P = ${F(k,36)}${pgcd(k,36)>1?' = '+frac(k,36):''} ≈ ${fmt(k/36,3)}`; }},
 {kind:'Méthode',h:'Utiliser un tableau à double entrée',p:'<b>Quand :</b> l’expérience se fait en deux temps (deux dés, deux pièces, deux roues), et on s’intéresse à une somme, un produit ou une condition sur les deux résultats. <b>Pourquoi ça marche :</b> le tableau liste toutes les issues une seule fois et sans en oublier ; avec deux dés équilibrés, ses 36 cases sont équiprobables. <b>Comment :</b> 1) dessine le tableau et remplis chaque case (somme, produit…) ; 2) colorie les cases favorables et compte-les ; 3) divise par 36 et simplifie.',
  fig:diceGrid((r,c)=>r+c,(r,c)=>r===6||c===6),
  demo:{enonce:'On lance un dé rouge et un dé bleu. Calculer P(somme = 8), P(faire un double) et P(au moins un 6).',
   etapes:[
    {f:`somme 8 : 2-6, 3-5, 4-4, 5-3, 6-2 → P = ${F(5,36)}`,w:'On lit dans le tableau les cases qui contiennent 8 : il y en a 5.'},
    {f:`doubles : 1-1, 2-2, … , 6-6 → P = ${F(6,36)} = ${F(1,6)}`,w:'Les doubles sont sur la diagonale du tableau : 6 cases.'},
    {f:'au moins un 6 : la ligne du 6 rouge (6 cases) et la colonne du 6 bleu (6 cases)',w:'Les cases vertes de la figure.'},
    {f:`6 + 6 − 1 = 11 cases → P = ${F(11,36)}`,w:'La case 6-6 est dans la ligne et dans la colonne : on ne la compte qu’une fois.'}],
   conclusion:`P(somme 8) = ${F(5,36)}, P(double) = ${F(1,6)}, P(au moins un 6) = ${F(11,36)} ≈ 0,31.`}},
 {kind:'Défi',h:'Le jeu de Léo et Mia',p:'Léo et Mia lancent deux dés. Léo gagne si l’écart entre les deux dés (le plus grand moins le plus petit) vaut 0 ou 1. Sinon, c’est Mia qui gagne. Qui a le plus de chances de gagner ?',
  opts:['Léo, car 0 et 1 sont les écarts les plus fréquents','Mia, avec une probabilité de 20/36','Léo et Mia ont exactement la même chance','Mia, avec une probabilité de 4/6, car il y a 6 écarts possibles et Léo n’en a que 2'],ans:1,
  why:'Fais le tableau des écarts : écart 0 dans 6 cases (les doubles), écart 1 dans 10 cases. Léo gagne dans 16 cases sur 36, Mia dans 36 − 16 = 20. Mia a plus de chances : 20/36 = 5/9. Stratégie : faire un tableau. Les 6 écarts possibles (0 à 5) ne sont pas équiprobables.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Expérience aléatoire : on connaît les issues possibles, pas le résultat. Commence par la liste des issues.</li>
<li>Événement : une condition, ou un ensemble d’issues {…} ; ses issues sont favorables. Certain : toutes les issues ; impossible : aucune.</li>
<li>Fréquence = effectif : nombre de répétitions. Sur beaucoup d’essais, elle se rapproche de la probabilité.</li>
<li>Issues équiprobables : P(A) = favorables : possibles.</li>
<li>0 ≤ P(A) ≤ 1 ; P(impossible) = 0, P(certain) = 1.</li>
<li>P(non A) = 1 − P(A) : pratique quand le contraire est plus simple à compter.</li>
<li>Deux dés : tableau à double entrée de 36 cases équiprobables ; les sommes, elles, ne sont pas équiprobables.</li>
</ul></div>`,
  note:'Une probabilité ne prédit jamais un résultat isolé. Elle dit ce qui se passe en moyenne quand on répète l’expérience un grand nombre de fois.'},
 {kind:'Problème',h:'La roue de la fête foraine',
  p:'À la fête foraine, une roue a 12 secteurs égaux. Un secteur fait gagner 10 CHF, trois secteurs font gagner 2 CHF, et les huit autres ne font rien gagner. On fait tourner la roue une fois ; elle s’arrête au hasard sur un secteur.',
  fig:wheel(12,i=>i===0?['var(--ok)',.7]:i<4?['var(--accent)',.5]:['var(--line)',.4],{lab:i=>i===0?'10':i<4?'2':'0'}),
  parts:[
   {q:'a) Quelle est la probabilité de gagner 10 CHF ?',lab:'P =',ans:1/12,tol:.001,hint:'Combien de secteurs sur 12 font gagner 10 CHF ?',why:'1 secteur favorable sur 12 : P = 1/12 ≈ 0,083.'},
   {q:'b) Quelle est la probabilité de gagner quelque chose ?',lab:'P =',ans:1/3,tol:.001,hint:'Compte tous les secteurs qui font gagner, 10 CHF ou 2 CHF.',why:'1 + 3 = 4 secteurs favorables : P = 4/12 = 1/3.'},
   {q:'c) Quelle est la probabilité de ne rien gagner ?',lab:'P =',ans:2/3,tol:.001,hint:'C’est l’événement contraire de la question b).',why:'P(rien) = 1 − 1/3 = 2/3. Contrôle : 8 secteurs sur 12, 8/12 = 2/3.'},
   {q:'d) Pendant la fête, la roue tourne 600 fois. Environ combien de fois tombera-t-elle sur 10 CHF ?',ans:50,tol:.5,hint:'Sur un grand nombre de parties, la fréquence est proche de la probabilité.',why:'La fréquence du 10 CHF devrait être proche de 1/12 : 600 · 1/12 = 600 : 12 = 50 fois environ.'}],
  sol:'<p>Les 12 secteurs sont égaux : les issues sont équiprobables.</p><p>a) P(10 CHF) = 1/12.</p><p>b) Secteurs gagnants : 1 + 3 = 4, donc P(gagner) = 4/12 = 1/3.</p><p>c) Ne rien gagner est l’événement contraire : 1 − 1/3 = 2/3 (8 secteurs sur 12).</p><p>d) Sur 600 tours, la fréquence du 10 CHF sera proche de 1/12 : environ 600 : 12 = 50 fois. Ce n’est qu’une estimation : le hasard peut donner un peu plus ou un peu moins.</p>'},
 {kind:'Problème',h:'Le jeu du produit au camp',
  p:'Au camp, Sam et Noé inventent un jeu : on lance deux dés et on <b>multiplie</b> les deux nombres obtenus. Sam gagne un point si le produit est impair, Noé si le produit est pair. Avant de jouer, ils veulent savoir à quoi s’attendre. Fais le tableau à double entrée des 36 produits.',
  parts:[
   {q:'a) Dans combien des 36 cases le produit est-il impair ?',ans:9,hint:'Un produit est impair seulement si les deux facteurs sont impairs. Combien de dés rouges impairs ? de dés bleus impairs ?',why:'Il faut un nombre impair sur chaque dé : 3 possibilités (1, 3, 5) pour chacun, donc 3 · 3 = 9 cases.'},
   {q:'b) Quelle est la probabilité que le produit soit pair ?',lab:'P =',ans:.75,tol:.001,hint:'Utilise l’événement contraire de a).',why:'P(impair) = 9/36 = 1/4, donc P(pair) = 1 − 1/4 = 3/4 = 0,75.'},
   {q:'c) Quelle est la probabilité d’obtenir un produit égal à 12 ?',lab:'P =',ans:1/9,tol:.001,hint:'Cherche toutes les cases du tableau qui contiennent 12, en tenant compte de l’ordre des dés.',why:'12 = 2 · 6 = 6 · 2 = 3 · 4 = 4 · 3 : 4 cases. P = 4/36 = 1/9.'},
   {q:'d) Quelle est la probabilité d’obtenir un produit au moins égal à 20 ?',lab:'P =',ans:2/9,tol:.001,hint:'Les produits 20, 24, 25, 30 et 36 conviennent. Compte leurs cases une par une.',why:'20 : 4-5, 5-4 ; 24 : 4-6, 6-4 ; 25 : 5-5 ; 30 : 5-6, 6-5 ; 36 : 6-6. Cela fait 8 cases : P = 8/36 = 2/9.'},
   {q:'e) Que penser de ce jeu ?',opts:['Il est juste : pair et impair ont chacun une chance sur deux','Noé a trois fois plus de chances que Sam de gagner un point','Sam a plus de chances, car il y a plus de nombres impairs que pairs sur un dé','On ne peut rien dire sans jouer'],ans:1,hint:'Compare P(pair) et P(impair).',why:'P(pair) = 3/4 et P(impair) = 1/4 : Noé a 3 fois plus de chances que Sam. Sur un dé, il y a autant de pairs que d’impairs, mais un seul facteur pair suffit à rendre le produit pair.'}],
  sol:'<p>Le tableau a 36 cases équiprobables.</p><p>a) Un produit est impair seulement si les deux nombres sont impairs : 3 · 3 = 9 cases.</p><p>b) P(pair) = 1 − 9/36 = 27/36 = 3/4.</p><p>c) Produit 12 : 2-6, 6-2, 3-4, 4-3, soit 4 cases, P = 4/36 = 1/9.</p><p>d) Produit ≥ 20 : 4-5, 5-4, 4-6, 6-4, 5-5, 5-6, 6-5, 6-6, soit 8 cases, P = 8/36 = 2/9.</p><p>e) Noé gagne avec probabilité 3/4, Sam avec 1/4 : le jeu avantage Noé, qui a 3 fois plus de chances. Pour l’équilibrer, on pourrait donner 3 points à Sam quand il gagne.</p>'},
]},
);
})();
