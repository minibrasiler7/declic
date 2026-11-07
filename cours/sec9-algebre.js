/* Déclic — Maths au secondaire, 9e année : fractions, proportionnalité, premières lettres */
(()=>{
/* ---------- helpers locaux ---------- */
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;
const pgdc=(a,b)=>b?pgdc(b,a%b):a;
// barre(s) de fraction : n parts coloriées, unités coupées en d parts
function barre(n,d,col='var(--math)'){
  const nb=Math.max(1,Math.ceil(n/d)), P=plane({x:[0,10.4],y:[0,nb*1.25+.1],w:320,grid:false,axes:false});
  for(let b=0;b<nb;b++){ const y=(nb-1-b)*1.25+.2;
    for(let k=0;k<d;k++){ const i=b*d+k; P.rect(.2+k*10/d,y,10/d,1,{fill:i<n?col:'var(--surface)',fo:i<n?.55:1,c:'var(--ink)',w:1.5}); } }
  return P.svg();
}
// droite graduée de a à b, sub graduations par unité, points [{x,l,c}]
function droite(a,b,sub,pts=[]){
  const P=plane({x:[a-.3,b+.3],y:[-1,1],h:70,grid:false,axes:false});
  P.seg(a-.2,0,b+.2,0,{c:'var(--muted)',w:1.5});
  for(let k=0;k<=(b-a)*sub;k++){ const x=a+k/sub, ent=Math.abs(x-Math.round(x))<1e-9;
    P.seg(x,ent?-.25:-.13,x,ent?.25:.13,{c:'var(--muted)',w:ent?1.6:1});
    if(ent) P.text(x,0,fmt(x),{a:'middle',dy:26,s:12,c:'var(--muted)'}); }
  pts.forEach(p=>{ P.dot(p.x,0,{c:p.c||'var(--spark)',r:6}); if(p.l) P.text(p.x,0,p.l,{a:'middle',dy:-14,c:p.c||'var(--ink)'}); });
  return P.svg();
}
// carré de 100 petits carrés, k coloriés
function cent(k,col='var(--accent)'){
  const P=plane({x:[-3,13],y:[0,10],w:320,grid:false,axes:false});
  for(let i=0;i<100;i++){ const r=Math.floor(i/10), c=i%10; P.rect(c,9-r,1,1,{fill:i<k?col:'var(--surface)',fo:i<k?.6:1,c:'var(--line)',w:1}); }
  P.rect(0,0,10,10,{c:'var(--ink)',w:1.5});
  return P.svg();
}
// petits carrés : une ligne de a carrés (rows = 1) ou un carré a × a
function carres(a,rows){
  const P=plane({x:[-.5,6.5],y:[-.5,6.5],w:320,grid:false,axes:false}), x0=(6-a)/2, y0=(6-rows)/2;
  for(let r=0;r<rows;r++) for(let c=0;c<a;c++) P.rect(x0+c,y0+r,1,1,{fill:'var(--accent)',fo:.45,c:'var(--ink)',w:1.5});
  return P.svg();
}
// grand cube de a petits cubes de côté
function cube(a){
  const S=space({r:5.6,axes:false,az:35,el:25}), o=-a/2, p=(x,y,z)=>[x+o,y+o,z+o], q={c:'var(--ink)',w:.8};
  S.poly([p(0,0,a),p(a,0,a),p(a,a,a),p(0,a,a)],{fill:'var(--accent)',fo:.35,c:'var(--ink)',w:1.5});
  S.poly([p(a,0,0),p(a,a,0),p(a,a,a),p(a,0,a)],{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:1.5});
  S.poly([p(0,a,0),p(a,a,0),p(a,a,a),p(0,a,a)],{fill:'var(--accent)',fo:.5,c:'var(--ink)',w:1.5});
  for(let i=1;i<a;i++){
    S.seg(p(i,0,a),p(i,a,a),q); S.seg(p(0,i,a),p(a,i,a),q);
    S.seg(p(a,i,0),p(a,i,a),q); S.seg(p(a,0,i),p(a,a,i),q);
    S.seg(p(i,a,0),p(i,a,a),q); S.seg(p(0,a,i),p(a,a,i),q); }
  return S.svg();
}
// machine à calculer : entrée → règle → sortie
function machine(e,op,s){
  const P=plane({x:[0,10],y:[0,3.4],w:320,grid:false,axes:false});
  P.rect(2.6,.6,4.8,2.2,{fill:'var(--math)',fo:.18,c:'var(--math)',w:2.5}).text(5,1.7,op,{a:'middle',dy:5,s:15});
  P.arrow(.3,1.7,2.5,1.7,{c:'var(--muted)',w:2.5,hs:9}).arrow(7.5,1.7,9.8,1.7,{c:'var(--muted)',w:2.5,hs:9});
  P.text(1.3,1.7,String(e),{a:'middle',dy:-12,s:16,c:'var(--accent)'}).text(8.6,1.7,String(s),{a:'middle',dy:-12,s:16,c:'var(--spark)'});
  P.text(1.3,1.7,'entrée',{a:'middle',dy:22,s:11,c:'var(--muted)'}).text(8.6,1.7,'sortie',{a:'middle',dy:22,s:11,c:'var(--muted)'});
  return P.svg();
}
// repère du premier quadrant, graduations tous les xs (horizontal) et ys (vertical)
function repere(x1,y1,xs,ys,o={}){
  const P=plane({x:[-x1*.12,x1*1.06],y:[-y1*.14,y1*1.08],w:320,h:o.h||230,grid:false,axes:false});
  for(let x=xs;x<=x1+1e-9;x+=xs){ P.seg(x,0,x,y1,{c:'var(--line)',w:1}); P.text(x,0,fmt(x),{a:'middle',dy:15,s:11,c:'var(--muted)'}); }
  for(let y=ys;y<=y1+1e-9;y+=ys){ P.seg(0,y,x1,y,{c:'var(--line)',w:1}); P.text(0,y,fmt(y),{a:'end',dx:-4,dy:4,s:11,c:'var(--muted)'}); }
  P.arrow(0,0,x1*1.05,0,{c:'var(--muted)',w:1.5,hs:8}).arrow(0,0,0,y1*1.07,{c:'var(--muted)',w:1.5,hs:8});
  P.text(0,0,'0',{a:'end',dx:-4,dy:14,s:11,c:'var(--muted)'});
  if(o.xl) P.text(x1*1.05,0,o.xl,{a:'end',dy:-8,s:11,c:'var(--muted)'});
  if(o.yl) P.text(0,y1*1.07,o.yl,{dx:8,dy:10,s:11,c:'var(--muted)'});
  return P;
}
// diagramme en colonnes
function colonnes(vals,labs,o={}){
  const n=vals.length, M=o.max, P=plane({x:[-1.3,n*1.6+.2],y:[-M*.16,M*1.12],w:320,h:o.h||200,grid:false,axes:false});
  for(let y=0;y<=M+1e-9;y+=o.step){ P.seg(0,y,n*1.6,y,{c:'var(--line)',w:1}); P.text(0,y,fmt(y),{a:'end',dx:-5,dy:4,s:11,c:'var(--muted)'}); }
  vals.forEach((v,i)=>{ const x=.3+i*1.6; if(v>0) P.rect(x,0,1.1,v,{fill:o.c||'var(--accent)',fo:.6,c:'var(--ink)',w:1.2}); P.text(x+.55,0,labs[i],{a:'middle',dy:16,s:11,c:'var(--ink)'}); });
  P.seg(0,0,n*1.6,0,{c:'var(--muted)',w:1.5}).seg(0,0,0,M*1.08,{c:'var(--muted)',w:1.5});
  if(o.t) P.text(0,M*1.12,o.t,{dx:6,dy:12,s:11,c:'var(--muted)'});
  return P.svg();
}
// chaîne de calculs (tour de magie)
function chaine(vals,ops){
  const P=plane({x:[0,15],y:[0,3],w:320,grid:false,axes:false});
  vals.forEach((v,i)=>{ const x=.2+i*3.05;
    P.rect(x,.8,2.2,1.4,{fill:i===vals.length-1?'var(--spark)':'var(--math)',fo:.2,c:'var(--math)',w:2}).text(x+1.1,1.5,String(v),{a:'middle',dy:5,s:14});
    if(i<ops.length){ P.arrow(x+2.25,1.5,x+3,1.5,{c:'var(--muted)',w:2,hs:7}); P.text(x+2.62,1.5,ops[i],{a:'middle',dy:-16,s:11,c:'var(--muted)'}); } });
  return P.svg();
}
const HORAIRE=tab([['Ligne 3','bus 1','bus 2','bus 3'],['Gare','7 h 12','7 h 32','7 h 52'],['Marché','7 h 18','7 h 38','7 h 58'],['Piscine','7 h 25','7 h 45','8 h 05'],['Stade','7 h 31','7 h 51','8 h 11']]);
const MACH=[['× 6',e=>6*e],['× 6 puis + 4',e=>6*e+4],['× 2 puis + 1',e=>2*e+1]];

COURS.push(
/* ===================== FRACTIONS, POURCENTAGES ET PUISSANCES ===================== */
{subj:'sec', sem:'a9', id:'sec9-rationnels', o:8, h:'Fractions, pourcentages et puissances', p:'Partager, comparer et calculer avec des fractions, passer d’une écriture à l’autre, calculer un pourcentage et découvrir les puissances.', steps:[
 {kind:'Théorie',h:'Une fraction : un partage et une division',p:`<p>Trois pizzas pour quatre amis : combien chacun en reçoit-il&nbsp;? 3 ÷ 4 ne tombe pas juste. Pour écrire la réponse exacte, on utilise une <b>fraction</b>.</p>
<div class="def"><p>Dans la fraction ${F('<i>a</i>','<i>b</i>')}, le <b>dénominateur</b> <i>b</i> (en bas) dit en combien de parts <b>égales</b> on coupe l’unité. Le <b>numérateur</b> <i>a</i> (en haut) dit combien de parts on prend. Une fraction est aussi un <b>quotient</b> : ${F('<i>a</i>','<i>b</i>')} = <i>a</i> ÷ <i>b</i>, avec <i>b</i> ≠ 0.</p></div>
<div class="idea"><p>Coupe chaque pizza en 4. Chaque ami prend un quart de chaque pizza, donc 3 quarts en tout. Partager 3 entre 4, ou prendre 3 parts d’une unité coupée en 4, c’est la même chose.</p></div>
<div class="ex"><p>${F(3,4)} = 3 ÷ 4 = 0,75. ${F(5,4)} = 1,25 : une unité entière et encore un quart, car le numérateur dépasse le dénominateur. ${F(2,3)} = 0,666… : la division ne s’arrête jamais, la fraction est l’écriture exacte.</p></div>
<div class="warn"><p>Les parts doivent être égales. Et le dénominateur n’est jamais 0 : partager entre zéro personne n’a pas de sens.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Il y a près de 4000 ans, les Égyptiens écrivaient presque toutes leurs fractions comme des sommes de fractions de numérateur 1. Pour eux, ${F(3,4)} s’écrivait ${F(1,2)} + ${F(1,4)}.</p></div>
<p>Bouge les curseurs. Mets le numérateur égal au dénominateur : la fraction vaut 1.</p>`,
  params:[{id:'n',l:'Numérateur',min:0,max:12,v:3},{id:'d',l:'Dénominateur',min:2,max:12,v:4}],
  draw:v=>barre(v.n,v.d),
  info:v=>{ const q=v.n/v.d, ex=Math.abs(q*1000-Math.round(q*1000))<1e-9; return `${F(v.n,v.d)} = ${v.n} ÷ ${v.d} ${ex?'=':'≈'} ${fmt(q,3)}${v.n===v.d?' : une unité entière':v.n>v.d?' : plus d’une unité':''}`; }},
 {kind:'Méthode',h:'Simplifier et amplifier une fraction',p:`<p>Regarde les barres : une moitié, deux quarts, quatre huitièmes. La longueur coloriée est la même. Ces fractions sont <b>égales</b> : elles désignent le même nombre.</p><p><b>Quand :</b> pour écrire une fraction le plus simplement possible, ou pour changer son dénominateur avant de comparer ou d’additionner. <b>Pourquoi ça marche :</b> multiplier le numérateur et le dénominateur par un même nombre <i>k</i>, c’est couper chaque part en <i>k</i> morceaux. Il y a <i>k</i> fois plus de parts, mais elles sont <i>k</i> fois plus petites : la quantité ne change pas. <b>Comment :</b> pour <b>amplifier</b>, on multiplie en haut et en bas par le même nombre ; pour <b>simplifier</b>, on divise en haut et en bas par un diviseur commun. Avec le pgdc (le plus grand diviseur commun, vu avec la divisibilité), on simplifie en une seule fois et la fraction devient <b>irréductible</b> : on ne peut plus la simplifier.</p>`,
  fig:barre(1,2)+barre(2,4,'var(--spark)')+barre(4,8,'var(--accent)'),
  demo:{enonce:`Simplifier ${F(30,42)}, puis écrire ${F(2,5)} avec le dénominateur 20.`,
   etapes:[
    {f:'Diviseurs communs de 30 et de 42 : 1, 2, 3 et 6. Le pgdc vaut 6.',w:'On cherche le plus grand nombre qui divise à la fois le haut et le bas.'},
    {f:`${F(30,42)} = ${F('30 ÷ 6','42 ÷ 6')} = ${F(5,7)}`,w:'On divise le haut et le bas par 6. 5 et 7 n’ont plus de diviseur commun à part 1 : c’est fini.'},
    {f:'20 = 5 × 4',w:'Pour passer du dénominateur 5 au dénominateur 20, on multiplie par 4.'},
    {f:`${F(2,5)} = ${F('2 × 4','5 × 4')} = ${F(8,20)}`,w:'On multiplie aussi le numérateur par 4, sinon la part change.'}],
   conclusion:`${F(30,42)} = ${F(5,7)} (irréductible) et ${F(2,5)} = ${F(8,20)}.`},
  note:`<b>Piège :</b> ajouter le même nombre en haut et en bas change la part. ${F(1,2)} = 0,5 mais ${F(2,3)} ≈ 0,67.`},
 {h:'À toi : simplifier au maximum',p:`Un sondage dit que ${F(18,24)} des élèves de la classe viennent à vélo. Quelle est la forme la plus simple (irréductible) de cette fraction&nbsp;?`,opts:[F(9,12),F(2,3),F(3,4),F(6,8)],ans:2,why:`18 et 24 sont tous deux divisibles par 6 (leur plus grand diviseur commun) : ${F(18,24)} = ${F('18 : 6','24 : 6')} = ${F(3,4)}. ${F(9,12)} et ${F(6,8)} sont égales mais pas finies de simplifier ; ${F(2,3)} est une autre fraction.`},
 {kind:'Méthode',h:'Comparer des fractions et les placer sur une droite',p:`<p>Qui a mangé le plus de gâteau : celui qui a pris ${F(2,3)} ou celui qui a pris ${F(3,4)}&nbsp;? Les parts n’ont pas la même taille, on ne peut pas comparer 2 et 3 directement.</p><p><b>Quand :</b> pour ranger des fractions, ou pour les placer sur une droite graduée. <b>Pourquoi ça marche :</b> avec le même dénominateur, les parts ont la même taille ; la plus grande fraction est celle qui a le plus de parts, donc le plus grand numérateur. <b>Comment comparer :</b> on amplifie les fractions pour leur donner un dénominateur commun (un multiple commun, par exemple le ppmc), puis on compare les numérateurs. Astuce : une fraction est plus grande que 1 quand son numérateur dépasse son dénominateur. <b>Comment placer</b> ${F('<i>a</i>','<i>b</i>')} : on coupe chaque unité en <i>b</i> parts égales, puis on compte <i>a</i> petites graduations depuis 0.</p>`,
  fig:droite(0,2,4,[{x:.75,l:'3/4'},{x:1.25,l:'5/4'}]),
  demo:{enonce:`Ranger ${F(2,3)}, ${F(3,4)} et ${F(5,8)} dans l’ordre croissant, puis placer ${F(3,4)} sur une droite graduée.`,
   etapes:[
    {f:'Multiples communs de 3, 4 et 8 : 24, 48… On prend 24.',w:'24 est le plus petit nombre divisible par 3, par 4 et par 8.'},
    {f:`${F(2,3)} = ${F(16,24)}, ${F(3,4)} = ${F(18,24)} et ${F(5,8)} = ${F(15,24)}`,w:'On amplifie : × 8, × 6 et × 3.'},
    {f:`15 &lt; 16 &lt; 18, donc ${F(5,8)} &lt; ${F(2,3)} &lt; ${F(3,4)}`,w:'Même dénominateur : on compare les numérateurs.'},
    {f:`Pour ${F(3,4)} : on coupe l’unité de 0 à 1 en 4 parts, puis on compte 3 graduations depuis 0.`,w:'Le point tombe entre 0 et 1, car 3 &lt; 4.'}],
   conclusion:`Ordre croissant : ${F(5,8)} &lt; ${F(2,3)} &lt; ${F(3,4)}. Sur la droite, ${F(3,4)} est aux trois quarts du chemin entre 0 et 1.`}},
 {kind:'Pratique',h:'Place la fraction sur la droite',p:`La droite est graduée en quarts. Déplace le point A pour qu’il ait l’abscisse ${F(10,8)}. Commence par simplifier la fraction.`,
  params:[{id:'x',l:'Position de A',min:0,max:3,step:.25,v:.5}],
  draw:v=>droite(0,3,4,[{x:v.x,l:'A'}]),
  info:v=>`A est à ${Math.round(v.x*4)} quarts de 0, soit ${F(Math.round(v.x*4),4)}.`,
  ok:v=>Math.abs(v.x-1.25)<1e-6,
  why:`${F(10,8)} = ${F('10 ÷ 2','8 ÷ 2')} = ${F(5,4)} : on compte 5 quarts depuis 0, soit une unité et encore un quart. A est à 1,25.`},
 {kind:'Méthode',h:'Additionner et soustraire des fractions',p:`<p>Tu as bu ${F(1,2)} litre de jus le matin et ${F(1,3)} litre l’après-midi. Combien en tout&nbsp;? Des moitiés et des tiers ne se comptent pas ensemble : il faut des parts de même taille.</p><p><b>Quand :</b> dès qu’on additionne ou qu’on soustrait des fractions. <b>Pourquoi ça marche :</b> avec le même dénominateur, on additionne des parts de même taille, comme des pommes avec des pommes : 2 huitièmes + 3 huitièmes = 5 huitièmes. <b>Comment :</b> 1) cherche un dénominateur commun, de préférence le ppmc des dénominateurs (le plus petit multiple commun, vu avec la divisibilité) ; 2) amplifie chaque fraction ; 3) additionne (ou soustrais) les numérateurs et <b>garde</b> le dénominateur ; 4) simplifie si possible. Un nombre entier s’écrit aussi en fraction : 2 = ${F(12,6)}.</p>`,
  fig:barre(9,12)+barre(2,12,'var(--spark)'),
  demo:{enonce:`Calculer ${F(3,4)} + ${F(1,6)}, puis 2 − ${F(5,6)}.`,
   etapes:[
    {f:'Multiples de 4 : 4, 8, 12… Multiples de 6 : 6, 12… Le ppmc vaut 12.',w:'12 est le plus petit dénominateur qui convient aux deux fractions.'},
    {f:`${F(3,4)} = ${F(9,12)} et ${F(1,6)} = ${F(2,12)}`,w:'On amplifie : × 3 pour la première, × 2 pour la seconde. Ce sont les deux barres de la figure.'},
    {f:`${F(9,12)} + ${F(2,12)} = ${F(11,12)}`,w:'On additionne les numérateurs, le dénominateur reste 12. 11 et 12 n’ont pas de diviseur commun : c’est irréductible.'},
    {f:`2 = ${F(12,6)}, donc 2 − ${F(5,6)} = ${F(12,6)} − ${F(5,6)} = ${F(7,6)}`,w:'Un entier s’écrit avec le dénominateur qu’on veut : deux unités font douze sixièmes.'}],
   conclusion:`${F(3,4)} + ${F(1,6)} = ${F(11,12)} et 2 − ${F(5,6)} = ${F(7,6)}.`},
  note:`<b>Erreur fréquente :</b> ${F(1,2)} + ${F(1,3)} n’est pas ${F(2,5)}. On n’additionne jamais les dénominateurs : ${F(1,2)} + ${F(1,3)} = ${F(3,6)} + ${F(2,6)} = ${F(5,6)}.`},
 {h:'À toi : une soustraction de fractions',p:`Calcule ${F(5,6)} − ${F(1,4)}. Tu peux répondre par une fraction, en tapant par exemple 3/5.`,lab:'résultat =',ans:7/12,tol:1e-6,
  why:`Le ppmc de 6 et 4 vaut 12 : ${F(5,6)} = ${F(10,12)} et ${F(1,4)} = ${F(3,12)}. Donc ${F(10,12)} − ${F(3,12)} = ${F(7,12)}.`},
 {kind:'Théorie',h:'Trois écritures d’un même nombre',p:`<p>Ton téléphone affiche 75 % de batterie. Il reste donc ${F(3,4)} de la charge, et la jauge est remplie à 0,75. Trois écritures, un seul nombre.</p>
<div class="def"><p>Un <b>pourcentage</b> est une fraction de dénominateur 100 : <b><i>p</i> % = ${F('<i>p</i>',100)}</b>. On lit « <i>p</i> pour cent », c’est-à-dire <i>p</i> parts sur 100. Un même nombre a une écriture <b>fractionnaire</b> (${F(1,4)}), une écriture <b>décimale</b> (0,25) et une écriture en <b>pourcentage</b> (25 %).</p></div>
<div class="idea"><p>Imagine un carré découpé en 100 petits carrés. Colorier 25 petits carrés, c’est colorier un quart du grand carré, c’est 0,25 du carré, c’est 25 %. Bouge le curseur et regarde les trois écritures changer ensemble.</p></div>
<div class="ex"><p>${F(1,2)} = 0,5 = 50 %. ${F(3,5)} = ${F(60,100)} = 0,6 = 60 %. 1 = 100 % : le tout. 1,2 = 120 % : plus que le tout, comme un prix qui a augmenté.</p></div>
<div class="warn"><p>${F(1,3)} = 0,333… n’a pas d’écriture décimale exacte : on l’arrondit, ${F(1,3)} ≈ 33,3 %.</p></div>`,
  params:[{id:'k',l:'Petits carrés coloriés',min:0,max:100,step:5,v:25}],
  draw:v=>cent(v.k),
  info:v=>{ const g=pgdc(v.k,100); return `${v.k} carrés sur 100 : ${F(v.k,100)} = ${F(v.k/g,100/g)} = ${fmt(v.k/100)} = ${v.k} %`; }},
 {kind:'Méthode',h:'Calculer avec des nombres décimaux',p:`<p>À la caisse, au marché, dans une recette : on calcule tout le temps avec des nombres à virgule. Les règles sont celles des nombres entiers, il faut seulement savoir où placer la virgule.</p><p><b>Addition et soustraction :</b> on écrit les nombres en colonnes, <b>virgule sous virgule</b>, en complétant par des zéros (12,5 = 12,50). Ainsi, on additionne les centièmes avec les centièmes, les dixièmes avec les dixièmes. <b>Multiplication :</b> on multiplie sans s’occuper des virgules, puis le résultat a autant de chiffres après la virgule que les deux facteurs réunis. Pourquoi ? 0,3 = 3 ÷ 10 et 0,2 = 2 ÷ 10, donc 0,3 × 0,2 = 6 ÷ 10 ÷ 10 = 6 ÷ 100 = 0,06. <b>Division par un décimal :</b> on multiplie les deux nombres par 10, 100… pour que le diviseur devienne entier. Le quotient ne change pas, comme quand on partage deux fois plus de bonbons entre deux fois plus d’amis.</p>`,
  demo:{enonce:'Calculer 12,5 − 3,75, puis 2,4 × 0,3, puis 7,2 : 0,4.',
   etapes:[
    {f:'12,50 − 3,75 = 8,75',w:'On complète 12,5 en 12,50 pour avoir autant de chiffres après la virgule, puis on soustrait colonne par colonne.'},
    {f:'24 × 3 = 72',w:'On multiplie sans les virgules.'},
    {f:'2,4 × 0,3 = 0,72',w:'2,4 a un chiffre après la virgule, 0,3 aussi : le produit en a 1 + 1 = 2.'},
    {f:'7,2 : 0,4 = 72 : 4 = 18',w:'On multiplie les deux nombres par 10 : le diviseur devient 4, un entier. Le quotient reste le même.'},
    {f:'Contrôle : 18 × 0,4 = 7,2 ✓ et 2,4 × 0,3 ≈ 2 × 0,3 = 0,6, proche de 0,72 ✓',w:'Une estimation rapide repère une virgule mal placée.'}],
   conclusion:'12,5 − 3,75 = 8,75 ; 2,4 × 0,3 = 0,72 ; 7,2 : 0,4 = 18.'},
  note:'Multiplier par un nombre plus petit que 1 donne un résultat plus petit : 8 × 0,5 = 4. Diviser par un nombre plus petit que 1 donne un résultat plus grand : 8 : 0,5 = 16.'},
 {h:'Les pommes du marché',p:'Tu achètes 1,5 kg de pommes à 3,40 CHF le kilo et tu paies avec un billet de 10 CHF. Combien te rend-on&nbsp;?',lab:'monnaie =',unit:'CHF',ans:4.9,tol:.001,
  why:'1,5 × 3,40 = 5,10 CHF (15 × 34 = 510, puis deux chiffres après la virgule). On te rend 10 − 5,10 = 4,90 CHF.'},
 {kind:'Méthode',h:'Pourcentages : convertir et calculer',p:`<p>« −30 % sur tout le magasin ! » Combien économises-tu sur un sweat à 50 CHF&nbsp;? Il faut savoir passer d’une écriture à l’autre et prendre un pourcentage d’une quantité.</p><p><b>Convertir :</b> fraction → décimal : on divise le numérateur par le dénominateur (${F(3,8)} = 3 ÷ 8). Décimal → pourcentage : on multiplie par 100 (0,375 = 37,5 %). Pourcentage → fraction : on écrit sur 100 et on simplifie (40 % = ${F(40,100)} = ${F(2,5)}). <b>Prendre <i>p</i> % d’une quantité :</b> on divise la quantité par 100, puis on multiplie par <i>p</i>. Pourquoi ? 1 % est un centième de la quantité, et <i>p</i> % en vaut <i>p</i> fois plus. Raccourcis : 50 %, c’est la moitié ; 25 %, le quart ; 10 %, on divise par 10. <b>Rabais :</b> on calcule le pourcentage, puis on le soustrait du prix.</p>`,
  demo:{enonce:`Écrire ${F(3,8)} en nombre décimal et en pourcentage, puis calculer 35 % de 60 CHF.`,
   etapes:[
    {f:'3 ÷ 8 = 0,375',w:'Une fraction est un quotient : on effectue la division.'},
    {f:'0,375 × 100 = 37,5, donc 0,375 = 37,5 %',w:'Multiplier par 100 donne le nombre de centièmes.'},
    {f:'1 % de 60 CHF = 60 : 100 = 0,60 CHF',w:'On cherche d’abord ce que vaut 1 %.'},
    {f:'35 % de 60 CHF = 35 × 0,60 = 21 CHF',w:'35 % vaut 35 fois plus que 1 %. Contrôle : 10 % = 6 CHF, 30 % = 18 CHF, 5 % = 3 CHF, total 21 CHF ✓.'}],
   conclusion:`${F(3,8)} = 0,375 = 37,5 % et 35 % de 60 CHF valent 21 CHF. Pour le sweat : 30 % de 50 CHF = 15 CHF de rabais, il coûte 35 CHF.`}},
 {h:'Le skate en solde',p:'Un skate coûte 85 CHF. Pendant les soldes, son prix baisse de 20 %. Combien le paies-tu&nbsp;?',lab:'prix =',unit:'CHF',ans:68,
  why:'20 % de 85 CHF = 85 : 100 × 20 = 17 CHF (ou : 10 % = 8,50 CHF, donc 20 % = 17 CHF). Le prix soldé est 85 − 17 = 68 CHF.'},
 {kind:'Théorie',h:'Les puissances : multiplier un nombre par lui-même',p:`<p>Une rumeur : tu la racontes à 2 amis, qui la racontent chacun à 2 amis, et ainsi de suite. Au 5e tour, 2 × 2 × 2 × 2 × 2 personnes l’apprennent. Pour écrire court ces longs produits, on utilise les <b>puissances</b>.</p>
<div class="def"><p>Pour un nombre <i>a</i> et un nombre naturel <i>n</i> ≥ 1, <b><i>a</i><sup><i>n</i></sup></b> est le produit de <i>n</i> facteurs tous égaux à <i>a</i> : <i>a</i><sup><i>n</i></sup> = <i>a</i> × <i>a</i> × … × <i>a</i>. On lit « <i>a</i> exposant <i>n</i> ». <i>a</i> est la <b>base</b>, <i>n</i> l’<b>exposant</b>. <i>a</i>² se lit « <i>a</i> au carré », <i>a</i>³ « <i>a</i> au cube », et <i>a</i>¹ = <i>a</i>.</p></div>
<div class="idea"><p>Pourquoi « carré » et « cube » ? Un carré de 4 petits carrés de côté en contient 4 × 4 = 4² = 16. Un cube de 4 petits cubes de côté en contient 4 × 4 × 4 = 4³ = 64. Bouge les curseurs pour le voir.</p></div>
<div class="ex"><p>2⁵ = 2 × 2 × 2 × 2 × 2 = 32. 5² = 25. 10³ = 1000 : autant de zéros que l’exposant. 1⁷ = 1.</p></div>
<div class="warn"><p>2³ n’est pas 2 × 3 : 2³ = 2 × 2 × 2 = 8. Et une puissance se calcule avant une multiplication : 2 × 3² = 2 × 9 = 18.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Selon une légende, l’inventeur des échecs demanda un grain de riz sur la 1re case, 2 sur la 2e, 4 sur la 3e, en doublant à chaque case. Sur la 64e case, il faudrait 2⁶³ grains, plus de 9 milliards de milliards : bien plus que tout le riz du monde.</p></div>`,
  params:[{id:'a',l:'Base a',min:1,max:6,v:3},{id:'n',l:'Exposant n',min:1,max:3,v:2}],
  draw:v=>v.n===3?cube(v.a):carres(v.a,v.n===1?1:v.a),
  info:v=>`${v.a}<sup>${v.n}</sup> = ${Array(v.n).fill(v.a).join(' × ')} = ${Math.pow(v.a,v.n)} ${v.n===1?'petits carrés en ligne':v.n===2?'petits carrés dans le carré':'petits cubes dans le cube'}`},
 {kind:'Défi',h:'Le doublement',p:'Quel est le plus petit exposant <i>n</i> pour lequel 2<sup><i>n</i></sup> dépasse 1000&nbsp;?',lab:'n =',ans:10,
  why:'Fais un tableau en doublant à chaque fois : 2, 4, 8, 16, 32, 64, 128, 256, 512 (= 2⁹), 1024 (= 2¹⁰). 2⁹ = 512 ne dépasse pas 1000, 2¹⁰ = 1024 oui : <i>n</i> = 10. Ici, faire un tableau marche bien.'},
 {kind:'Théorie',h:'Les familles de nombres : ℕ, ℤ et ℚ',p:`<p>Pour compter des joueurs, on n’a besoin que de 0, 1, 2, 3… Pour une température de −5 °C, il faut des nombres négatifs. Pour partager 3 pizzas entre 4, il faut des fractions. Chaque besoin a sa famille de nombres.</p>
<div class="def"><p><b>ℕ</b>, les <b>nombres naturels</b> : 0, 1, 2, 3, … <b>ℤ</b>, les <b>nombres entiers relatifs</b> : …, −2, −1, 0, 1, 2, … (les naturels et leurs opposés, vus avec les nombres relatifs). <b>ℚ</b>, les <b>nombres rationnels</b> : tous les nombres qui s’écrivent comme une fraction ${F('<i>a</i>','<i>b</i>')} d’entiers relatifs, avec <i>b</i> ≠ 0. Le symbole ∈ se lit « appartient à » : −3 ∈ ℤ.</p></div>
<div class="idea"><p>Les familles sont emboîtées comme des poupées russes : tout naturel est un entier relatif, et tout entier relatif est rationnel, car 5 = ${F(5,1)} et −3 = ${F('−3',1)}. On écrit ℕ ⊂ ℤ ⊂ ℚ ; le symbole ⊂ se lit « est inclus dans ».</p></div>
<div class="ex"><p>${F(12,4)} = 3 : il est dans ℕ, donc aussi dans ℤ et dans ℚ. −7 est dans ℤ mais pas dans ℕ. 0,25 = ${F(1,4)} est dans ℚ, mais pas dans ℤ : ce n’est pas un entier.</p></div>
<div class="warn"><p>Une fraction peut cacher un entier : simplifie avant de décider. ${F('−18',6)} = −3 est dans ℤ. Il existe même des nombres qui ne s’écrivent pas en fraction : tu les découvriras plus tard.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,6],grid:false,axes:false});
    P.rect(.2,.2,9.6,5.6,{fill:'var(--sci)',fo:.12,c:'var(--ink)',w:1.5}).rect(.6,.6,6,4.2,{fill:'var(--math)',fo:.15,c:'var(--ink)',w:1.5}).rect(1,1,2.8,2.6,{fill:'var(--accent)',fo:.25,c:'var(--ink)',w:1.5});
    P.text(.4,5.8,'ℚ',{dy:18,s:15}).text(.8,4.8,'ℤ',{dy:18,s:15}).text(1.2,3.6,'ℕ',{dy:18,s:15});
    P.text(1.7,2.5,'0',{a:'middle'}).text(3.1,2.5,'7',{a:'middle'}).text(2.4,1.4,'12/4',{a:'middle'});
    P.text(5,3.6,'−3',{a:'middle'}).text(5,2,'−18/6',{a:'middle'});
    P.text(8.2,4.4,'2,5',{a:'middle'}).text(8.2,3,'−2/5',{a:'middle'}).text(8.2,1.6,'1/3',{a:'middle'});
    return P.svg(); })()},
 {h:'Range dans la bonne famille',p:'Lequel de ces nombres est dans ℚ, mais pas dans ℤ&nbsp;?',opts:['−7',F(12,4),'2,5','0'],ans:2,
  why:`2,5 = ${F(5,2)} est une fraction, mais ce n’est pas un entier. −7 et 0 sont des entiers, et ${F(12,4)} = 3 aussi.`},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : fractions, pourcentages et puissances',p:`<div class="keep"><ul><li><b>Fraction</b> ${F('<i>a</i>','<i>b</i>')} : l’unité est coupée en <i>b</i> parts égales, on en prend <i>a</i>. C’est aussi le quotient <i>a</i> ÷ <i>b</i> (<i>b</i> ≠ 0).</li><li><b>Fractions égales</b> : on multiplie (amplifier) ou on divise (simplifier) le haut et le bas par le même nombre. Avec le pgdc, on obtient la fraction irréductible.</li><li><b>Comparer</b> : même dénominateur, puis on compare les numérateurs. <b>Placer</b> ${F('<i>a</i>','<i>b</i>')} : unité coupée en <i>b</i>, on compte <i>a</i> graduations depuis 0.</li><li><b>Additionner, soustraire</b> : dénominateur commun (ppmc), on additionne les numérateurs, on garde le dénominateur. Jamais d’addition des dénominateurs.</li><li><b>Trois écritures</b> : ${F(1,4)} = 0,25 = 25 % ; <i>p</i> % = ${F('<i>p</i>',100)}.</li><li><b>Décimaux</b> : virgule sous virgule pour + et − ; pour ×, on compte les chiffres après la virgule ; pour diviser par un décimal, on multiplie les deux nombres par 10, 100…</li><li><b><i>p</i> % d’une quantité</b> : quantité : 100 × <i>p</i>. Rabais : on soustrait ce pourcentage du prix.</li><li><b>Puissance</b> <i>a</i><sup><i>n</i></sup> : <i>n</i> facteurs égaux à <i>a</i>. <i>a</i>² carré, <i>a</i>³ cube. 2³ = 8, pas 6.</li><li><b>Familles</b> : ℕ ⊂ ℤ ⊂ ℚ. Un rationnel s’écrit comme une fraction d’entiers.</li></ul></div>`},
 {kind:'Problème',h:'La soirée pizzas',
  p:`Pour une soirée jeux vidéo, vous êtes 4 amis. Vous commandez 3 pizzas à 16 CHF pièce, avec un bon de réduction de 25 % sur le total. Chaque pizza est coupée en 8 parts égales. Tom mange 5 parts, Léa mange ${F(3,4)} de pizza, Sam une demi-pizza, et toi tout le reste.`,
  fig:barre(24,8),
  parts:[
   {q:'a) Combien coûtent les 3 pizzas après la réduction&nbsp;?',lab:'prix =',unit:'CHF',ans:36,hint:'Calcule le prix total, puis 25 % de ce prix : 25 %, c’est le quart.',why:'3 × 16 = 48 CHF. 25 % de 48 CHF = 48 : 4 = 12 CHF. On paie 48 − 12 = 36 CHF.'},
   {q:'b) Quelle quantité de pizza Tom, Léa et Sam ont-ils mangée ensemble&nbsp;? Réponds en pizzas, par une fraction.',lab:'quantité =',ans:15/8,tol:1e-6,hint:`Écris tout en huitièmes : 5 parts, c’est ${F(5,8)} de pizza.`,why:`${F(5,8)} + ${F(3,4)} + ${F(1,2)} = ${F(5,8)} + ${F(6,8)} + ${F(4,8)} = ${F(15,8)} de pizza.`},
   {q:'c) Quelle quantité de pizza manges-tu&nbsp;?',lab:'quantité =',ans:9/8,tol:1e-6,hint:'3 pizzas, c’est combien de huitièmes&nbsp;?',why:`3 = ${F(24,8)}, donc ${F(24,8)} − ${F(15,8)} = ${F(9,8)} de pizza : un peu plus d’une pizza.`},
   {q:'d) Quel pourcentage des 3 pizzas as-tu mangé&nbsp;?',unit:'%',ans:37.5,tol:.01,hint:'Combien de parts as-tu mangées sur les 24 parts&nbsp;? Simplifie, puis convertis.',why:`Tu as mangé 9 parts sur 24 : ${F(9,24)} = ${F(3,8)} = 0,375 = 37,5 %.`},
  ],
  sol:`Prix : 3 × 16 = 48 CHF ; la réduction vaut 25 % de 48 = 12 CHF ; on paie 36 CHF, soit 9 CHF chacun.<br>Les trois autres : ${F(5,8)} + ${F(6,8)} + ${F(4,8)} = ${F(15,8)} de pizza.<br>Les 3 pizzas font ${F(24,8)}, donc il te reste ${F(24,8)} − ${F(15,8)} = ${F(9,8)} de pizza, soit 9 parts.<br>9 parts sur 24 : ${F(9,24)} = ${F(3,8)} = 0,375 = 37,5 % des pizzas.`},
 {kind:'Problème',h:'Plier une feuille de papier',
  p:'Une feuille de papier a une épaisseur de 0,1 mm. Chaque fois que tu la plies en deux, le nombre de couches double et la surface du dessus est coupée en deux. Au départ, il y a 1 couche. On se demande jusqu’où on pourrait monter si on pouvait plier autant qu’on veut.',
  parts:[
   {q:'a) Combien de couches y a-t-il après 5 pliages&nbsp;?',lab:'couches =',ans:32,hint:'Chaque pliage multiplie le nombre de couches par 2 : écris-le avec une puissance.',why:'1 × 2 × 2 × 2 × 2 × 2 = 2⁵ = 32 couches.'},
   {q:'b) Quelle est l’épaisseur de la pile après 10 pliages&nbsp;?',lab:'épaisseur =',unit:'mm',ans:102.4,tol:.01,hint:'Il y a 2¹⁰ couches de 0,1 mm chacune.',why:'2¹⁰ = 1024 couches, et 1024 × 0,1 = 102,4 mm : plus de 10 cm.'},
   {q:'c) Après combien de pliages l’épaisseur dépasse-t-elle 1 m (1000 mm) pour la première fois&nbsp;?',lab:'pliages =',ans:14,hint:'Il faut plus de 10 000 couches. Continue le tableau des puissances de 2 après 1024.',why:'2¹³ = 8192 couches donnent 819,2 mm, pas encore 1 m. 2¹⁴ = 16 384 couches donnent 1638,4 mm : il faut 14 pliages.'},
   {q:'d) Après 3 pliages, quel pourcentage de la surface de départ le dessus de la pile représente-t-il&nbsp;?',unit:'%',ans:12.5,tol:.01,hint:'La surface est coupée en deux à chaque pliage : 1, puis la moitié, puis…',why:`1 → ${F(1,2)} → ${F(1,4)} → ${F(1,8)}. Et ${F(1,8)} = 1 ÷ 8 = 0,125 = 12,5 %.`},
  ],
  sol:'Après <i>n</i> pliages, il y a 2<sup><i>n</i></sup> couches.<br>5 pliages : 2⁵ = 32 couches. 10 pliages : 2¹⁰ = 1024 couches, soit 1024 × 0,1 = 102,4 mm.<br>Pour dépasser 1000 mm, il faut plus de 10 000 couches : 2¹³ = 8192 ne suffit pas, 2¹⁴ = 16 384 oui. Il faut 14 pliages, et la pile mesurerait 1,64 m.<br>La surface du dessus est divisée par 2 à chaque pliage : après 3 pliages, il reste ' + F(1,8) + ' = 12,5 % de la feuille.<br>En vrai, on ne dépasse guère 7 pliages avec une feuille ordinaire. Le record, 12 pliages, a été obtenu en 2002 avec une très longue bande de papier.'},
]},

/* ===================== TABLEAUX, GRAPHIQUES ET PROPORTIONNALITÉ ===================== */
{subj:'sec', sem:'a9', id:'sec9-fonctions', o:9, h:'Tableaux, graphiques et proportionnalité', p:'Décrire le lien entre deux grandeurs avec une machine, un tableau ou un graphique, reconnaître la proportionnalité et s’en servir pour les prix, les recettes, les devises, les agrandissements et les diagrammes.', steps:[
 {kind:'Théorie',h:'Une machine à calculer',p:`<p>Au bowling, une partie coûte 6 CHF et la location des chaussures 4 CHF. Le prix à payer dépend du nombre de parties : quand l’un change, l’autre change aussi. On dit que ces deux <b>grandeurs</b> sont en <b>relation</b>.</p>
<div class="def"><p>Une <b>machine à calculer</b> (on dit aussi un <b>opérateur</b>) reçoit un nombre d’<b>entrée</b>, lui applique toujours la même règle et donne un nombre de <b>sortie</b>. Exemple : la machine « × 6 puis + 4 » calcule le prix au bowling à partir du nombre de parties.</p></div>
<div class="idea"><p>La règle est la même pour toutes les entrées : c’est ce qui permet de prévoir la sortie sans essayer. Pour retrouver l’entrée à partir de la sortie, on <b>remonte</b> la machine avec les opérations contraires, dans l’ordre inverse : « − 4 puis ÷ 6 ».</p></div>
<div class="ex"><p>3 parties : 3 × 6 + 4 = 22 CHF. Avec la machine « × 2 puis + 1 », l’entrée 5 donne 11. Dans l’autre sens, la sortie 11 vient de (11 − 1) ÷ 2 = 5.</p></div>
<div class="warn"><p>L’ordre compte : « × 2 puis + 1 » transforme 5 en 11, mais « + 1 puis × 2 » le transforme en 12.</p></div>
<p>Choisis une machine et une entrée avec les curseurs.</p>`,
  params:[{id:'e',l:'Entrée',min:0,max:10,v:3},{id:'m',l:'Machine (1, 2 ou 3)',min:1,max:3,v:2}],
  draw:v=>machine(v.e,MACH[v.m-1][0],MACH[v.m-1][1](v.e)),
  info:v=>`Machine ${v.m} : ${v.e} → ${MACH[v.m-1][0]} → ${MACH[v.m-1][1](v.e)}`},
 {kind:'Théorie',h:'Le tableau de valeurs et le graphique',p:`<p>La machine du bowling donne un prix pour chaque nombre de parties. Pour voir tous les résultats d’un coup, on les range dans un tableau, puis on les dessine.</p>
<div class="def"><p>Un <b>tableau de valeurs</b> a deux lignes : en haut les entrées, en bas les sorties correspondantes. Un <b>graphique cartésien</b> utilise un repère (vu avec les nombres relatifs) : l’axe horizontal porte les entrées, l’axe vertical les sorties. Chaque colonne du tableau devient un <b>point</b> : son <b>abscisse</b> est l’entrée, son <b>ordonnée</b> la sortie.</p></div>
<div class="idea"><p>Le tableau donne des valeurs précises ; le graphique montre l’allure : ça monte vite, ça monte lentement, ça descend… On voit tout d’un coup d’œil.</p></div>
<div class="ex"><p>Bowling : 1 partie → 10 CHF, 2 → 16, 3 → 22, 4 → 28. On place les points (1 ; 10), (2 ; 16), (3 ; 22) et (4 ; 28). Ils sont alignés : le prix monte de 6 CHF à chaque partie.</p></div>
<div class="warn"><p>On ne relie les points que si les valeurs entre deux points ont un sens. On ne joue pas 2,5 parties : on laisse les points seuls. Pour une température au fil des heures, on peut relier.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>« Cartésien » vient de René Descartes, un savant français du 17e siècle. Il a eu l’idée de repérer chaque point par deux nombres, ce qui permet de dessiner un calcul.</p></div>`,
  fig:tab([['Parties','1','2','3','4'],['Prix (CHF)','10','16','22','28']])+(()=>{ const P=repere(5,35,1,5,{xl:'parties',yl:'prix (CHF)'}); [[1,10],[2,16],[3,22],[4,28]].forEach(p=>P.dot(p[0],p[1],{r:5})); return P.svg(); })()},
 {kind:'Méthode',h:'Passer du tableau au graphique et inversement',p:'<b>Quand :</b> on connaît une règle ou un tableau et on veut un graphique, ou on a un graphique et on veut des valeurs. <b>Pourquoi ça marche :</b> chaque point du graphique est une colonne du tableau écrite autrement : abscisse = entrée, ordonnée = sortie. <b>Comment :</b> 1) calcule les sorties avec la règle et remplis le tableau ; 2) choisis une graduation pour chaque axe, assez grande pour tout contenir ; 3) pour placer le point (3 ; 11), avance de 3 sur l’axe horizontal, puis monte jusqu’à 11 ; 4) pour <b>lire</b> une valeur, pars de l’axe que tu connais, va jusqu’au point ou à la ligne, puis rejoins l’autre axe.',
  fig:(()=>{ const P=repere(6,18,1,2,{xl:'km',yl:'prix (CHF)'}); P.fn(x=>5+2*x,{from:0,to:6,w:2.5}); [0,1,2,3,4].forEach(d=>P.dot(d,5+2*d,{r:5}));
    P.seg(0,13,4,13,{c:'var(--spark)',w:2,dash:true}).seg(4,13,4,0,{c:'var(--spark)',w:2,dash:true}); return P.svg(); })(),
  demo:{enonce:'Un taxi coûte 5 CHF au départ, plus 2 CHF par kilomètre. Remplir le tableau de 0 à 4 km, faire le graphique, puis lire la distance parcourue pour 13 CHF.',
   etapes:[
    {f:'0 km → 5 CHF ; 1 km → 7 ; 2 km → 9 ; 3 km → 11 ; 4 km → 13',w:'La règle est « × 2 puis + 5 » : par exemple 3 × 2 + 5 = 11.'},
    {f:'Axe horizontal : 1 carreau = 1 km. Axe vertical : 1 carreau = 2 CHF.',w:'On doit pouvoir monter jusqu’à 13 CHF : avec un carreau pour 2 CHF, 7 carreaux suffisent.'},
    {f:'Points (0 ; 5), (1 ; 7), (2 ; 9), (3 ; 11) et (4 ; 13)',w:'Chaque colonne du tableau devient un point. On peut les relier : une distance de 2,5 km a un sens.'},
    {f:'Lecture : depuis 13 sur l’axe vertical, on va à droite jusqu’à la ligne, puis on descend : 4 km.',w:'On part de l’axe de la valeur connue (le prix) et on arrive sur l’autre axe (la distance). C’est le pointillé de la figure.'}],
   conclusion:'Pour 13 CHF, le taxi a roulé 4 km. Le point (0 ; 5) rappelle qu’on paie 5 CHF avant même de rouler.'}},
 {kind:'Pratique',h:'Place le trajet de 6 km',p:'Le graphique montre le prix du taxi : 5 CHF au départ, plus 2 CHF par kilomètre. Déplace le point P pour qu’il représente un trajet de 6 km.',
  params:[{id:'d',l:'Abscisse de P (km)',min:0,max:8,v:2},{id:'y',l:'Ordonnée de P (CHF)',min:0,max:24,v:4}],
  draw:v=>{ const P=repere(8,24,1,2,{xl:'km',yl:'prix (CHF)'}); [0,1,2,3,4].forEach(d=>P.dot(d,5+2*d,{r:4,c:'var(--muted)'})); P.dot(v.d,v.y,{r:7,l:'P'}); return P.svg(); },
  info:v=>`P(${v.d} ; ${v.y})`,
  ok:v=>v.d===6&&v.y===17,
  why:'Pour 6 km : 6 × 2 + 5 = 17 CHF. Le point est P(6 ; 17) : 6 sur l’axe horizontal, 17 sur l’axe vertical. Il est aligné avec les autres points.'},
 {kind:'Théorie',h:'Reconnaître une situation de proportionnalité',p:`<p>Un croissant coûte 1,20 CHF. Deux croissants coûtent 2,40 CHF, cinq coûtent 6 CHF. Si tu en prends deux fois plus, tu paies deux fois plus. Ce n’est pas le cas du taxi : 2 km coûtent 9 CHF, mais 4 km ne coûtent pas 18 CHF.</p>
<div class="def"><p>Deux grandeurs sont <b>proportionnelles</b> si on passe de l’une à l’autre en multipliant toujours par le <b>même nombre</b>, appelé <b>facteur de proportionnalité</b>. Dans le <b>tableau</b>, chaque sortie divisée par son entrée donne ce même nombre. Sur le <b>graphique</b>, les points sont <b>alignés sur une droite qui passe par l’origine</b> (0 ; 0).</p></div>
<div class="why"><p>Si on multiplie toujours par le même nombre, l’entrée 0 donne 0 : la droite passe par l’origine. Et chaque unité de plus ajoute toujours la même quantité : les points sont alignés.</p></div>
<div class="ex"><p>Croissants : 2,40 ÷ 2 = 1,2 et 6 ÷ 5 = 1,2. C’est proportionnel, de facteur 1,2. Taxi : 7 ÷ 1 = 7 mais 9 ÷ 2 = 4,5. Ce n’est pas proportionnel, à cause des 5 CHF du départ.</p></div>
<div class="warn"><p>Des points alignés ne suffisent pas : la droite du taxi ne passe pas par l’origine. Règle les curseurs : la droite passe par (0 ; 0) seulement quand les frais fixes valent 0.</p></div>`,
  params:[{id:'p',l:'Prix par unité (CHF)',min:1,max:4,step:.5,v:2},{id:'f',l:'Frais fixes (CHF)',min:0,max:6,v:3}],
  draw:v=>{ const P=repere(6,30,1,5,{xl:'quantité',yl:'prix (CHF)'}); P.fn(x=>v.f+v.p*x,{from:0,to:6,w:2.5,c:v.f===0?'var(--ok)':'var(--accent)'}); for(let q=0;q<=6;q++) P.dot(q,v.f+v.p*q,{r:4}); P.dot(0,0,{r:4,c:'var(--ink)'}); return P.svg(); },
  info:v=>v.f===0?`prix = quantité × ${fmt(v.p)} : <b>proportionnel</b>, de facteur ${fmt(v.p)}`:`prix = quantité × ${fmt(v.p)} + ${v.f} : <b>pas proportionnel</b>, car 0 unité coûte déjà ${v.f} CHF`},
 {kind:'Méthode',h:'Trouver le facteur de proportionnalité',p:'<b>Quand :</b> un tableau est proportionnel et il manque des valeurs. <b>Pourquoi ça marche :</b> dans une situation proportionnelle, on passe de la 1re ligne à la 2e en multipliant toujours par le même facteur ; pour remonter, on divise par ce facteur. <b>Comment :</b> 1) divise une sortie connue par son entrée : c’est le facteur ; 2) vérifie avec une autre colonne (si le quotient change, ce n’est pas proportionnel) ; 3) pour compléter la 2e ligne, multiplie par le facteur ; pour compléter la 1re, divise. Autre astuce : si une entrée est 4 fois plus grande, sa sortie aussi est 4 fois plus grande.',
  fig:tab([['Essence (L)','5','8','20','?'],['Prix (CHF)','9','14,40','?','45']]),
  demo:{enonce:'5 L d’essence coûtent 9 CHF et 8 L coûtent 14,40 CHF. Combien coûtent 20 L, et combien de litres a-t-on pour 45 CHF&nbsp;?',
   etapes:[
    {f:'9 ÷ 5 = 1,8',w:'On divise une sortie par son entrée : 1 litre coûte 1,80 CHF.'},
    {f:'14,40 ÷ 8 = 1,8 ✓',w:'Une deuxième colonne donne le même quotient : le tableau est bien proportionnel.'},
    {f:'20 × 1,8 = 36',w:'Pour descendre dans le tableau, on multiplie par le facteur. Ou bien : 20 = 4 × 5, donc 4 × 9 = 36.'},
    {f:'45 ÷ 1,8 = 25',w:'Pour remonter, on divise par le facteur. Contrôle : 25 × 1,8 = 45 ✓.'}],
   conclusion:'20 L coûtent 36 CHF, et 45 CHF achètent 25 L. Le facteur 1,8 est le prix d’un litre.'}},
 {h:'Complète le tableau',p:'Ce tableau est proportionnel. Quel prix faut-il écrire sous 10 cahiers&nbsp;?',fig:tab([['Cahiers','4','6','10'],['Prix (CHF)','7','10,50','?']]),lab:'prix =',unit:'CHF',ans:17.5,tol:.001,
  why:'7 ÷ 4 = 1,75 et 10,50 ÷ 6 = 1,75 : le facteur est 1,75. 10 × 1,75 = 17,50 CHF.'},
 {kind:'Méthode',h:'La règle de trois (passer par l’unité)',p:'<p>Ta recette de crêpes est prévue pour 4 personnes, mais vous êtes 6. Faut-il tout multiplier par 6 ? Non : il faut d’abord savoir ce qu’il faut pour 1 personne.</p><p><b>Quand :</b> dans une situation proportionnelle, on connaît une paire de valeurs et on en cherche une autre : prix, recettes, devises (changer des francs en euros). <b>Pourquoi ça marche :</b> en divisant, on trouve la valeur pour <b>une</b> unité ; en multipliant, on l’obtient pour autant d’unités qu’on veut. Les deux grandeurs restent proportionnelles à chaque pas. <b>Comment :</b> 1) écris la paire connue ; 2) divise pour revenir à 1 ; 3) multiplie pour aller à la quantité voulue ; 4) rédige : une phrase, le calcul, la réponse avec l’unité.</p>',
  demo:{enonce:'Une recette de crêpes pour 4 personnes demande 250 g de farine. Combien en faut-il pour 6 personnes&nbsp;?',
   etapes:[
    {f:'4 personnes → 250 g',w:'On écrit ce qu’on sait.'},
    {f:'1 personne → 250 : 4 = 62,5 g',w:'On divise par 4 pour revenir à une seule personne.'},
    {f:'6 personnes → 62,5 × 6 = 375 g',w:'On multiplie par 6. Contrôle : 6 personnes, c’est une fois et demie 4 personnes, et 250 × 1,5 = 375 ✓.'},
    {f:'Réponse : il faut 375 g de farine pour 6 personnes.',w:'Une phrase, le calcul, et la réponse avec son unité.'}],
   conclusion:'Même chose pour une devise : si 10 € coûtent 9,50 CHF, alors 1 € coûte 0,95 CHF et 50 € coûtent 50 × 0,95 = 47,50 CHF.'}},
 {h:'Des francs en euros',p:'En vacances, tu changes de l’argent. Ce jour-là, 4 CHF valent 4,20 €. Combien d’euros reçois-tu pour 30 CHF&nbsp;?',lab:'montant =',unit:'€',ans:31.5,tol:.001,
  why:'1 CHF vaut 4,20 ÷ 4 = 1,05 €. Pour 30 CHF : 30 × 1,05 = 31,50 €.'},
 {kind:'Théorie',h:'Agrandir et réduire une figure',p:`<p>Tu veux imprimer une photo plus grande pour ta chambre. Si tu étires seulement la largeur, les visages deviennent tout plats. Pour un vrai agrandissement, toutes les longueurs doivent grandir de la même façon.</p>
<div class="def"><p>Dans un <b>agrandissement</b> ou une <b>réduction</b> de <b>rapport</b> <i>k</i>, toutes les longueurs de la figure sont multipliées par le même nombre <i>k</i>. Si <i>k</i> &gt; 1, la figure grandit ; si <i>k</i> &lt; 1, elle rétrécit. Les angles, eux, ne changent pas.</p></div>
<div class="idea"><p>Les longueurs de l’image sont <b>proportionnelles</b> aux longueurs de départ, et le rapport <i>k</i> est le facteur de proportionnalité. Tu as déjà rencontré ce rapport avec les isométries : on le trouve en divisant une longueur de l’image par la longueur qui lui correspond.</p></div>
<div class="ex"><p>Un rectangle de 4 cm sur 6 cm, agrandi avec <i>k</i> = 1,5, devient un rectangle de 6 cm sur 9 cm. Avec <i>k</i> = 0,5, il devient un rectangle de 2 cm sur 3 cm.</p></div>
<div class="warn"><p>L’aire n’est pas multipliée par <i>k</i> : le rectangle de 4 sur 6 a une aire de 24 cm², son agrandissement de 6 sur 9 a une aire de 54 cm², bien plus que 1,5 fois 24.</p></div>`,
  params:[{id:'k',l:'Rapport k',min:.5,max:2,step:.25,v:1.5}],
  draw:v=>{ const P=plane({x:[0,17],y:[-.9,12.6],w:320,grid:false,axes:false});
    P.rect(2,0,4,6,{fill:'var(--math)',fo:.3,c:'var(--ink)',w:1.5}).text(4,0,'4 cm',{a:'middle',dy:15,s:11}).text(2,3,'6 cm',{a:'end',dx:-4,dy:4,s:11});
    P.rect(7,0,4*v.k,6*v.k,{fill:'var(--spark)',fo:.3,c:'var(--ink)',w:1.5}).text(7+2*v.k,0,`${fmt(4*v.k)} cm`,{a:'middle',dy:15,s:11}).text(7+4*v.k,3*v.k,`${fmt(6*v.k)} cm`,{dx:4,dy:4,s:11});
    return P.svg(); },
  info:v=>`Rapport ${fmt(v.k)} : 4 cm → ${fmt(4*v.k)} cm et 6 cm → ${fmt(6*v.k)} cm. Aire : 24 cm² → ${fmt(24*v.k*v.k)} cm².`},
 {h:'La photo agrandie',p:'Une photo mesure 9 cm de large et 6 cm de haut. On l’agrandit pour que sa largeur devienne 15 cm. Quelle est sa nouvelle hauteur&nbsp;?',lab:'hauteur =',unit:'cm',ans:10,tol:.001,
  why:'Les longueurs sont proportionnelles. Règle de trois : 9 cm de large → 6 cm de haut, donc 3 cm → 2 cm, et 15 cm → 5 × 2 = 10 cm.'},
 {kind:'Méthode',h:'Lire un horaire ou un diagramme',p:'<p>À quelle heure part ton bus ? Combien de livres la bibliothèque a-t-elle prêtés mardi ? Les réponses sont dans des tableaux et des diagrammes, encore faut-il savoir les lire.</p><p><b>Quand :</b> devant un horaire, un tableau de données ou un diagramme. <b>Pourquoi ça marche :</b> un horaire est un tableau à double entrée, avec une ligne par arrêt et une colonne par bus. En suivant une colonne, on suit un même bus d’arrêt en arrêt. Dans un diagramme en colonnes, la hauteur de chaque colonne se lit sur l’axe vertical, grâce à sa graduation. <b>Comment :</b> 1) lis le titre et les légendes : que représente chaque ligne, chaque axe ? 2) repère la graduation : un carreau vaut combien ? 3) va chercher l’information ligne par ligne ou colonne par colonne ; 4) calcule (différence d’heures, total) et réponds par une phrase.</p>',
  fig:HORAIRE,
  demo:{enonce:'Avec l’horaire de la ligne 3, combien de temps dure le trajet de la Gare au Stade&nbsp;? Si tu rates le bus de 7 h 32 à la Gare, combien de minutes attends-tu le suivant&nbsp;?',
   etapes:[
    {f:'1re colonne : Gare 7 h 12, Stade 7 h 31',w:'On suit un même bus en descendant sa colonne.'},
    {f:'De 7 h 12 à 7 h 31 : 31 − 12 = 19 minutes',w:'Les deux horaires sont dans la même heure : on soustrait les minutes.'},
    {f:'Le bus suivant part de la Gare à 7 h 52',w:'On avance d’une colonne sur la ligne « Gare ».'},
    {f:'De 7 h 32 à 7 h 52 : 52 − 32 = 20 minutes d’attente',w:'Même calcul, sur la ligne de la Gare.'}],
   conclusion:'Le trajet dure 19 minutes, et on attend 20 minutes le bus suivant : les bus de cette ligne passent toutes les 20 minutes.'}},
 {kind:'Méthode',h:'Construire un diagramme en colonnes',p:'<b>Quand :</b> pour montrer et comparer des quantités d’un coup d’œil : votes, ventes, sports préférés… <b>Pourquoi ça marche :</b> la hauteur de chaque colonne est proportionnelle à la quantité qu’elle représente : une quantité deux fois plus grande donne une colonne deux fois plus haute. Il faut donc la même graduation pour toutes les colonnes. <b>Comment :</b> 1) trace deux axes ; 2) sur l’axe horizontal, écris les catégories, avec des colonnes de même largeur, bien séparées ; 3) choisis une graduation pour l’axe vertical, qui commence à 0 et dépasse la plus grande valeur ; 4) dessine chaque colonne à la bonne hauteur ; 5) donne un titre et indique l’unité.',
  fig:colonnes([12,6,8,4],['foot','natation','basket','escalade'],{max:14,step:2,t:'élèves'}),
  demo:{enonce:'Sport préféré de 30 élèves : football 12, natation 6, basket 8, escalade 4. Construire le diagramme en colonnes.',
   etapes:[
    {f:'Contrôle : 12 + 6 + 8 + 4 = 30 ✓',w:'Le total doit correspondre au nombre d’élèves interrogés.'},
    {f:'Graduation : 1 carreau = 2 élèves, de 0 à 14',w:'La plus grande valeur est 12 : de 0 à 14 par pas de 2, tout tient sans être trop serré.'},
    {f:'Hauteurs : football 6 carreaux, natation 3, basket 4, escalade 2',w:'On divise chaque valeur par 2, puisqu’un carreau vaut 2 élèves.'},
    {f:'Titre : « Sport préféré des élèves » ; légende de l’axe vertical : « nombre d’élèves »',w:'Sans titre ni unité, un diagramme ne veut rien dire.'}],
   conclusion:'On voit tout de suite que le football est le plus choisi : sa colonne est deux fois plus haute que celle de la natation.'}},
 {kind:'Pratique',h:'Construis le diagramme',p:'La cafétéria a vendu 15 pizzas lundi, 25 mardi et 10 mercredi. Règle la hauteur des colonnes pour construire le diagramme.',
  params:[{id:'a',l:'Lundi',min:0,max:30,step:5,v:5},{id:'b',l:'Mardi',min:0,max:30,step:5,v:5},{id:'c',l:'Mercredi',min:0,max:30,step:5,v:5}],
  draw:v=>colonnes([v.a,v.b,v.c],['lundi','mardi','mercredi'],{max:30,step:5,t:'pizzas'}),
  ok:v=>v.a===15&&v.b===25&&v.c===10,
  why:'La graduation va de 5 en 5 : lundi monte à 15 (3 graduations), mardi à 25 (5 graduations) et mercredi à 10 (2 graduations).'},
 {kind:'Défi',h:'Ne pas rater le match',p:`Avec l’horaire de la ligne 3, tu montes à l’arrêt Piscine et tu dois arriver au Stade au plus tard à 8 h 00. Il te faut 7 minutes à pied de chez toi jusqu’à l’arrêt. À quelle heure, au plus tard, dois-tu partir de chez toi&nbsp;? Réponds par les minutes après 7 h (par exemple, 7 h 20 s’écrit 20).${HORAIRE}`,lab:'minutes après 7 h =',ans:38,
  why:'Pars de la fin : le bus qui arrive au Stade à 7 h 51 passe à la Piscine à 7 h 45 (celui de 8 h 05 arrive à 8 h 11, trop tard). Tu dois partir 7 minutes avant 7 h 45, donc à 7 h 38. Ici, partir de la fin et remonter le temps marche bien.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : tableaux, graphiques et proportionnalité',p:'<div class="keep"><ul><li><b>Machine à calculer</b> : une entrée, une règle toujours la même, une sortie. Pour remonter, opérations contraires dans l’ordre inverse. L’ordre des opérations compte.</li><li><b>Tableau de valeurs</b> : entrées en haut, sorties en bas. <b>Graphique</b> : chaque colonne devient un point (abscisse = entrée, ordonnée = sortie). On ne relie les points que si les valeurs intermédiaires ont un sens.</li><li><b>Proportionnalité</b> : on multiplie toujours par le même facteur. Tableau : quotients sortie ÷ entrée tous égaux. Graphique : points alignés sur une droite qui passe par l’origine.</li><li><b>Facteur</b> : une sortie divisée par son entrée. On multiplie pour descendre dans le tableau, on divise pour remonter.</li><li><b>Règle de trois</b> : diviser pour revenir à 1, puis multiplier. Prix, recettes, devises. Réponse : phrase, calcul, unité.</li><li><b>Agrandissement, réduction</b> : toutes les longueurs × <i>k</i>, les angles ne changent pas, l’aire n’est pas multipliée par <i>k</i>.</li><li><b>Horaire</b> : une colonne = un bus. <b>Diagramme en colonnes</b> : graduation qui part de 0, hauteurs proportionnelles aux quantités, titre et unité.</li></ul></div>'},
 {kind:'Problème',h:'Des crêpes pour le camp',
  p:'Ta classe part en camp, et tu es chargé des crêpes du dernier soir. Vous serez 18. La recette, prévue pour 4 personnes, demande 250 g de farine, 0,5 L de lait, 3 œufs et 40 g de beurre. Au magasin, le paquet de 500 g de farine coûte 1,20 CHF.',
  parts:[
   {q:'a) Combien de farine faut-il pour 18 personnes&nbsp;?',lab:'farine =',unit:'g',ans:1125,hint:'Passe par une personne : divise par 4, puis multiplie par 18.',why:'250 : 4 = 62,5 g par personne ; 62,5 × 18 = 1125 g.'},
   {q:'b) Combien de lait faut-il&nbsp;?',lab:'lait =',unit:'L',ans:2.25,tol:.001,hint:'Même méthode avec 0,5 L.',why:'0,5 : 4 = 0,125 L par personne ; 0,125 × 18 = 2,25 L.'},
   {q:'c) La règle de trois donne 13,5 œufs. Combien d’œufs achètes-tu&nbsp;?',opts:['13','13,5','14','18'],ans:2,hint:'On ne peut pas acheter un demi-œuf, et il ne faut pas en manquer.',why:'3 : 4 × 18 = 13,5. On arrondit à l’œuf supérieur : 14 œufs.'},
   {q:'d) Combien coûte la farine nécessaire&nbsp;?',lab:'prix =',unit:'CHF',ans:3.6,tol:.001,hint:'Combien de paquets de 500 g faut-il pour 1125 g&nbsp;? On n’achète que des paquets entiers.',why:'2 paquets ne font que 1000 g : il en faut 3. 3 × 1,20 = 3,60 CHF.'},
  ],
  sol:'Il y a 18 personnes au lieu de 4 : on passe par une personne.<br>Farine : 250 : 4 = 62,5 g par personne, donc 62,5 × 18 = 1125 g.<br>Lait : 0,5 : 4 = 0,125 L, donc 0,125 × 18 = 2,25 L. Œufs : 3 : 4 × 18 = 13,5, on en achète 14.<br>Beurre : 40 : 4 × 18 = 180 g.<br>Farine : 1125 g demandent 3 paquets de 500 g (2 paquets ne suffisent pas), soit 3 × 1,20 = 3,60 CHF.'},
 {kind:'Problème',h:'Deux taxis à Lisbonne',
  p:'En vacances à Lisbonne, ta famille hésite entre deux compagnies de taxi. La compagnie A demande 4 € au départ, plus 1,50 € par kilomètre. La compagnie B demande 2 € par kilomètre, sans rien au départ. Ce jour-là, 1 € vaut 0,95 CHF.',
  parts:[
   {q:'a) Combien coûte un trajet de 6 km avec la compagnie A&nbsp;?',lab:'prix =',unit:'€',ans:13,hint:'C’est la machine « × 1,50 puis + 4 ».',why:'6 × 1,50 + 4 = 9 + 4 = 13 €.'},
   {q:'b) Laquelle des deux compagnies a un prix proportionnel à la distance&nbsp;?',opts:['A, car son prix augmente avec la distance','B, car son prix est toujours la distance multipliée par 2','Les deux','Aucune des deux'],ans:1,hint:'Combien paie-t-on pour 0 km chez chacune&nbsp;?',why:'Chez B, 0 km coûte 0 € et on multiplie toujours par 2 : c’est proportionnel. Chez A, 0 km coûte déjà 4 € : ce n’est pas proportionnel.'},
   {q:'c) Pour quelle distance les deux compagnies coûtent-elles le même prix&nbsp;?',lab:'distance =',unit:'km',ans:8,hint:'Fais un tableau des deux prix pour 0, 2, 4, 6, 8 et 10 km.',why:'A : 4, 7, 10, 13, 16, 19 €. B : 0, 4, 8, 12, 16, 20 €. À 8 km, les deux coûtent 16 €.'},
   {q:'d) Pour un trajet de 12 km, tu choisis la compagnie la moins chère. Combien paies-tu, en francs&nbsp;?',lab:'prix =',unit:'CHF',ans:20.9,tol:.001,hint:'Calcule les deux prix en euros, garde le plus petit, puis convertis : 1 € = 0,95 CHF.',why:'A : 12 × 1,50 + 4 = 22 €. B : 12 × 2 = 24 €. A est moins chère : 22 × 0,95 = 20,90 CHF.'},
  ],
  sol:'Prix chez A : distance × 1,50 + 4. Prix chez B : distance × 2.<br>B est proportionnel (droite par l’origine), A ne l’est pas (4 € dès le départ).<br>Tableau de 2 en 2 km : A donne 4, 7, 10, 13, 16, 19 € ; B donne 0, 4, 8, 12, 16, 20 €. Les prix sont égaux à 8 km (16 €).<br>Avant 8 km, B est moins chère ; après 8 km, c’est A.<br>Pour 12 km : A coûte 22 €, B coûte 24 €. On choisit A : 22 × 0,95 = 20,90 CHF.'},
]},

/* ===================== PREMIÈRES LETTRES ===================== */
{subj:'sec', sem:'a9', id:'sec9-litteral', o:12, h:'Premières lettres', p:'Utiliser des lettres pour écrire des formules, calculer la valeur d’une expression, traduire une figure ou une phrase en expression et repérer deux expressions toujours égales.', steps:[
 {kind:'Théorie',h:'Pourquoi des lettres ?',p:`<p>Un tour de magie : pense à un nombre. Multiplie-le par 2, ajoute 10, divise par 2, puis enlève le nombre de départ. Tu trouves 5&nbsp;! Et ça marche avec n’importe quel nombre. Comment en être sûr sans tout essayer&nbsp;?</p>
<div class="def"><p>En maths, une <b>lettre</b> remplace un nombre qu’on ne connaît pas, ou qui peut changer. Une <b>expression</b> est un calcul écrit avec des nombres et des lettres. Une <b>formule</b> donne une grandeur à partir d’autres : l’aire du rectangle est <i>A</i> = <i>L</i> · <i>l</i>, où <i>L</i> est la longueur et <i>l</i> la largeur. Le point · veut dire « multiplié par ».</p></div>
<div class="why"><p>Appelons <i>n</i> le nombre pensé. × 2 donne 2 · <i>n</i>. + 10 donne 2 · <i>n</i> + 10. La moitié donne <i>n</i> + 5 (la moitié de 2 · <i>n</i>, c’est <i>n</i> ; la moitié de 10, c’est 5). On enlève <i>n</i> : il reste 5, quel que soit <i>n</i>.</p></div>
<div class="ex"><p>Avec 7 : 14, puis 24, puis 12, puis 12 − 7 = 5. Formule de l’aire avec <i>L</i> = 8 m et <i>l</i> = 3 m : <i>A</i> = 8 · 3 = 24 m².</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Pendant des siècles, on écrivait les calculs en phrases : « la chose multipliée par deux, plus dix… ». Vers 1590, le Français François Viète a eu l’idée de noter les nombres par des lettres. Les calculs sont devenus bien plus courts.</p></div>
<p>Choisis le nombre de départ avec le curseur : la fin est toujours 5.</p>`,
  params:[{id:'n',l:'Nombre pensé',min:0,max:20,v:7}],
  draw:v=>chaine([v.n,2*v.n,2*v.n+10,v.n+5,5],['× 2','+ 10',': 2','− '+v.n]),
  info:v=>`${v.n} → ${2*v.n} → ${2*v.n+10} → ${v.n+5} → ${v.n+5} − ${v.n} = 5`},
 {kind:'Théorie',h:'Les conventions d’écriture',p:`<p>Écrire 3 · <i>a</i> · <i>a</i> · <i>b</i> à chaque fois, c’est long. Les mathématiciens ont fixé des règles pour écrire plus court. Tout le monde les utilise : il faut bien les connaître.</p>
<div class="def"><p>On peut <b>omettre le signe ·</b> entre un nombre et une lettre, entre deux lettres, ou devant une parenthèse : 3 · <i>a</i> s’écrit <b>3<i>a</i></b>, <i>a</i> · <i>b</i> s’écrit <b><i>ab</i></b>, 2 · (<i>x</i> + 3) s’écrit 2(<i>x</i> + 3). Le nombre s’écrit devant : <i>a</i> · 3 = 3<i>a</i>. Un produit de lettres égales s’écrit avec une puissance : <i>a</i> · <i>a</i> = <b><i>a</i>²</b> et <i>x</i> · <i>x</i> · <i>x</i> = <b><i>x</i>³</b>. Enfin, 1<i>a</i> s’écrit simplement <i>a</i>.</p></div>
<div class="idea"><p>Entre deux lettres collées, ou entre un nombre et une lettre, il y a toujours une multiplication cachée. Quand tu calcules, tu la fais réapparaître.</p></div>
<div class="ex"><p>5 · <i>x</i> · <i>y</i> = 5<i>xy</i>. 2 · <i>b</i> · <i>b</i> = 2<i>b</i>². <i>a</i> · <i>b</i> · <i>c</i> = <i>abc</i>. Pour <i>a</i> = 4 : 3<i>a</i> = 3 · 4 = 12.</p></div>
<div class="warn"><p>Entre deux nombres, on garde le signe : 3 · 4 ne s’écrit pas 34. Donc 3<i>a</i> pour <i>a</i> = 4 vaut 12, pas 34. Attention aussi : <i>a</i>² = <i>a</i> · <i>a</i>, pas 2 · <i>a</i>.</p></div>`,
  fig:tab([['Écriture complète','Écriture courte'],['3 · <i>a</i>','3<i>a</i>'],['<i>a</i> · <i>b</i>','<i>ab</i>'],['<i>b</i> · 7','7<i>b</i>'],['<i>a</i> · <i>a</i>','<i>a</i>²'],['<i>x</i> · <i>x</i> · <i>x</i>','<i>x</i>³'],['1 · <i>y</i>','<i>y</i>']])},
 {kind:'Méthode',h:'Écrire une expression avec les conventions',p:'<b>Quand :</b> pour écrire une expression le plus court possible, ou au contraire pour la détailler avant de calculer. <b>Pourquoi ça marche :</b> dans un produit, on peut changer l’ordre des facteurs et les regrouper comme on veut (commutativité et associativité, vues pour calculer malin) : le résultat ne change pas. <b>Comment :</b> 1) regroupe les nombres et multiplie-les ; 2) range les lettres par ordre alphabétique ; 3) remplace les lettres répétées par une puissance ; 4) supprime les signes ·. Dans l’autre sens, on rétablit chaque · et on détaille chaque puissance.',
  demo:{enonce:'Écrire plus court 2 · <i>x</i> · <i>y</i> · 5 et <i>a</i> · 4 · <i>a</i>, puis détailler 7<i>ab</i>².',
   etapes:[
    {f:'2 · <i>x</i> · <i>y</i> · 5 = 2 · 5 · <i>x</i> · <i>y</i> = 10<i>xy</i>',w:'On regroupe les nombres devant : 2 · 5 = 10. Puis les lettres, dans l’ordre.'},
    {f:'<i>a</i> · 4 · <i>a</i> = 4 · <i>a</i> · <i>a</i> = 4<i>a</i>²',w:'Le nombre passe devant, et <i>a</i> · <i>a</i> devient <i>a</i>².'},
    {f:'7<i>ab</i>² = 7 · <i>a</i> · <i>b</i> · <i>b</i>',w:'Le carré ne porte que sur <i>b</i>, la lettre juste avant l’exposant.'}],
   conclusion:'On obtient 10<i>xy</i>, 4<i>a</i>² et 7 · <i>a</i> · <i>b</i> · <i>b</i>. Un exposant ne concerne que ce qui est juste devant lui.'}},
 {h:'Écris court',p:'Quelle est l’écriture courte de 3 · <i>m</i> · <i>m</i> · 2 · <i>n</i>&nbsp;?',opts:['32<i>mn</i>','6<i>m</i>²<i>n</i>','5<i>m</i>²<i>n</i>','6<i>mn</i>²'],ans:1,
  why:'On multiplie les nombres : 3 · 2 = 6 (pas 32, ni 5). <i>m</i> · <i>m</i> = <i>m</i>², et <i>n</i> reste seul : 6<i>m</i>²<i>n</i>.'},
 {kind:'Méthode',h:'Calculer la valeur d’une expression',p:'<b>Quand :</b> on connaît la valeur des lettres et on veut le résultat : une aire, un prix, un score. <b>Pourquoi ça marche :</b> une lettre est un nombre caché ; en la remplaçant par sa valeur, l’expression redevient un calcul ordinaire. <b>Comment :</b> 1) récris l’expression en <b>rétablissant les signes ·</b> ; 2) remplace chaque lettre par sa valeur (entre parenthèses si elle est négative) ; 3) calcule en respectant les priorités : d’abord les parenthèses, puis les puissances, puis les multiplications et divisions, enfin les additions et soustractions.',
  demo:{enonce:`Calculer 4<i>x</i> + 5 et <i>x</i>³ pour <i>x</i> = 3, puis ${F('<i>bh</i>',2)} pour <i>b</i> = 6 et <i>h</i> = 5, et enfin <i>abc</i> pour <i>a</i> = 2, <i>b</i> = 5 et <i>c</i> = 10.`,
   etapes:[
    {f:'4<i>x</i> + 5 = 4 · 3 + 5 = 12 + 5 = 17',w:'On rétablit le · entre 4 et <i>x</i>, puis la multiplication passe avant l’addition.'},
    {f:'<i>x</i>³ = 3 · 3 · 3 = 27',w:'Le cube, c’est trois facteurs égaux, et pas 3 · 3 = 9.'},
    {f:`${F('<i>bh</i>',2)} = ${F('6 · 5',2)} = ${F(30,2)} = 15`,w:'C’est la formule de l’aire d’un triangle de base 6 et de hauteur 5.'},
    {f:'<i>abc</i> = 2 · 5 · 10 = 100',w:'Trois lettres collées : trois facteurs. C’est le volume d’un pavé de 2 sur 5 sur 10.'}],
   conclusion:'On trouve 17, 27, 15 et 100. Avant de calculer, rétablis toujours les signes · : c’est là que se cachent les erreurs.'}},
 {h:'À toi : remplace la lettre',p:'Calcule 5<i>a</i>² − 2<i>a</i> pour <i>a</i> = 4.',lab:'valeur =',ans:72,
  why:'5 · 4 · 4 − 2 · 4 = 5 · 16 − 8 = 80 − 8 = 72. Le carré se calcule avant la multiplication par 5.'},
 {kind:'Défi',h:'Le nombre caché',p:'Quel nombre <i>x</i> faut-il choisir pour que 4<i>x</i> + 5 vaille 41&nbsp;? Cherche avec le curseur : la barre du bas doit avoir la même longueur que celle du haut.',
  params:[{id:'x',l:'x',min:0,max:15,v:2}],
  draw:v=>{ const val=4*v.x+5, P=plane({x:[-14,70],y:[0,3],w:320,h:90,grid:false,axes:false});
    P.rect(0,1.7,41,.9,{fill:'var(--ok)',fo:.5,c:'var(--ink)',w:1}).text(0,2.15,'41',{a:'end',dx:-6,dy:5,s:12});
    P.rect(0,.4,val,.9,{fill:'var(--accent)',fo:.5,c:'var(--ink)',w:1}).text(0,.85,'4x + 5',{a:'end',dx:-6,dy:5,s:12}).text(val,.85,String(val),{dx:5,dy:5,s:12});
    return P.svg(); },
  info:v=>{ const val=4*v.x+5; return `4 · ${v.x} + 5 = ${val}${val<41?' : trop petit':val>41?' : trop grand':' : c’est 41'}`; },
  ok:v=>v.x===9,
  why:'Avec <i>x</i> = 5, on trouve 25 : trop petit. Avec 10, on trouve 45 : un peu trop grand. Avec 9 : 4 · 9 + 5 = 36 + 5 = 41. Ici, procéder par essais et erreurs, en ajustant à chaque fois, marche bien.'},
 {kind:'Théorie',h:'Une expression pour une figure',p:`<p>Tu dois clôturer un enclos rectangulaire pour des lapins. Il fait 3 m de large, mais sa longueur n’est pas encore décidée. Combien de clôture faut-il ? Ça dépend de la longueur : on la note <i>x</i>.</p>
<div class="def"><p>Pour une figure dont certaines longueurs sont des lettres, le <b>périmètre</b> est la somme des longueurs de tous les côtés et l’<b>aire</b> se calcule avec les formules habituelles. On obtient des <b>expressions</b> qui donnent le périmètre ou l’aire pour n’importe quelle valeur de la lettre.</p></div>
<div class="idea"><p>Fais le tour de l’enclos : <i>x</i>, puis 3, puis <i>x</i>, puis 3. Le périmètre est <i>x</i> + 3 + <i>x</i> + 3. Deux fois <i>x</i>, c’est 2<i>x</i>, et 3 + 3 = 6 : le périmètre vaut 2<i>x</i> + 6. L’aire est longueur · largeur = <i>x</i> · 3 = 3<i>x</i>.</p></div>
<div class="ex"><p>Pour <i>x</i> = 5 m : périmètre 2 · 5 + 6 = 16 m, aire 3 · 5 = 15 m². Un carré de côté <i>c</i> a pour périmètre 4<i>c</i> et pour aire <i>c</i>². Un triangle de base <i>b</i> et de hauteur <i>h</i> a pour aire ${F('<i>bh</i>',2)}.</p></div>
<div class="warn"><p>Ne mélange pas périmètre et aire : 2<i>x</i> + 6 se mesure en m, 3<i>x</i> en m². Bouge le curseur et compare les deux.</p></div>`,
  params:[{id:'x',l:'Longueur x (m)',min:1,max:8,v:4}],
  draw:v=>{ const P=plane({x:[-1,10],y:[-1,4.6],w:320,grid:false,axes:false});
    P.rect(0,0,v.x,3,{fill:'var(--ok)',fo:.25,c:'var(--ink)',w:2});
    P.text(v.x/2,0,`x = ${v.x} m`,{a:'middle',dy:16,s:12}).text(v.x,1.5,'3 m',{dx:6,dy:4,s:12});
    for(let k=1;k<v.x;k++) P.seg(k,0,k,3,{c:'var(--line)',w:1}); P.seg(0,1,v.x,1,{c:'var(--line)',w:1}).seg(0,2,v.x,2,{c:'var(--line)',w:1});
    return P.svg(); },
  info:v=>`Périmètre : 2 · ${v.x} + 6 = ${2*v.x+6} m. Aire : 3 · ${v.x} = ${3*v.x} m² (compte les carrés de 1 m²).`},
 {kind:'Méthode',h:'Écrire le périmètre et l’aire d’une figure',p:'<b>Quand :</b> une figure a des longueurs inconnues, et on veut une formule pour son périmètre ou son aire. <b>Pourquoi ça marche :</b> le périmètre est la longueur du tour, et l’aire se calcule en découpant la figure en morceaux simples, exactement comme avec des nombres. La lettre ne change pas la méthode : elle reste juste dans le résultat. <b>Comment :</b> 1) écris la longueur de chaque côté, en nombre ou en lettre (certaines se déduisent des autres) ; 2) périmètre : fais le tour et additionne tous les côtés ; 3) aire : découpe en rectangles, carrés ou triangles, puis additionne ; 4) écris le résultat avec les conventions ; 5) contrôle avec une valeur de la lettre.',
  fig:(()=>{ const P=plane({x:[-1,10.5],y:[-1,4.4],w:320,grid:false,axes:false});
    P.poly([[0,0],[9,0],[9,3],[6,3],[6,2],[0,2]],{fill:'var(--math)',fo:.2,c:'var(--ink)',w:2}).seg(6,0,6,2,{c:'var(--ink)',w:1,dash:true});
    P.text(3,0,'6',{a:'middle',dy:16}).text(0,1,'2',{a:'end',dx:-6,dy:4}).text(3,2,'6',{a:'middle',dy:-6}).text(7.5,0,'x',{a:'middle',dy:16}).text(9,1.5,'x',{dx:6,dy:4}).text(7.5,3,'x',{a:'middle',dy:-6}).text(6,2.5,'x − 2',{a:'end',dx:-6,dy:4});
    return P.svg(); })(),
  demo:{enonce:'La figure est formée d’un rectangle de 6 sur 2 et d’un carré de côté <i>x</i> collé à sa droite (avec <i>x</i> plus grand que 2). Écrire son périmètre et son aire.',
   etapes:[
    {f:'Côtés en faisant le tour : 6 et <i>x</i> en bas, <i>x</i> à droite, <i>x</i> en haut du carré, <i>x</i> − 2 pour la marche, 6 en haut du rectangle, 2 à gauche',w:'La marche est la partie du côté gauche du carré qui dépasse du rectangle : <i>x</i> − 2.'},
    {f:'Périmètre = 6 + <i>x</i> + <i>x</i> + <i>x</i> + <i>x</i> − 2 + 6 + 2 = 4<i>x</i> + 12',w:'Quatre fois <i>x</i> donne 4<i>x</i>, et les nombres donnent 6 − 2 + 6 + 2 = 12.'},
    {f:'Aire = 6 · 2 + <i>x</i> · <i>x</i> = 12 + <i>x</i>²',w:'On découpe en un rectangle et un carré, puis on additionne leurs aires.'},
    {f:'Contrôle avec <i>x</i> = 3 : tour 6 + 3 + 3 + 3 + 1 + 6 + 2 = 24 et 4 · 3 + 12 = 24 ✓ ; aire 12 + 9 = 21 ✓',w:'Une valeur concrète permet de vérifier l’expression trouvée.'}],
   conclusion:'Périmètre : 4<i>x</i> + 12. Aire : 12 + <i>x</i>².'}},
 {h:'Le périmètre du rectangle',p:'Un rectangle a une longueur de 2<i>a</i> et une largeur de <i>a</i>. Quel est son périmètre&nbsp;?',
  fig:(()=>{ const P=plane({x:[-1.5,8],y:[-1,4],w:320,grid:false,axes:false}); P.rect(0,0,6,3,{fill:'var(--math)',fo:.2,c:'var(--ink)',w:2}).text(3,0,'2a',{a:'middle',dy:16}).text(0,1.5,'a',{a:'end',dx:-6,dy:4}); return P.svg(); })(),
  opts:['3<i>a</i>','6<i>a</i>','2<i>a</i>²','4<i>a</i> + 2'],ans:1,
  why:'On fait le tour : 2<i>a</i> + <i>a</i> + 2<i>a</i> + <i>a</i> = 6<i>a</i> (six fois <i>a</i>). 2<i>a</i>² serait son aire : 2<i>a</i> · <i>a</i>.'},
 {kind:'Méthode',h:'Traduire une phrase en expression',p:'<b>Quand :</b> un énoncé décrit un calcul en mots : « le double de… », « la somme de… ». <b>Pourquoi ça marche :</b> chaque mot du vocabulaire correspond à une opération : <b>somme</b> (+), <b>différence</b> (−), <b>produit</b> (·), <b>quotient</b> (:), <b>double</b> (2 ·), <b>triple</b> (3 ·), <b>moitié</b> (: 2), <b>carré</b> (²), « augmenté de » (+), « diminué de » (−). Dans « le carré de la somme de… », le premier mot nomme l’opération faite en <b>dernier</b> : on calcule la somme, puis son carré. « Augmenté de » ou « diminué de », en fin de phrase, s’applique à tout ce qui précède. <b>Comment :</b> 1) repère l’opération principale ; 2) traduis chaque morceau ; 3) ajoute des parenthèses quand une somme ou une différence doit être calculée d’abord ; 4) contrôle en relisant ton expression à voix haute.',
  demo:{enonce:'Traduire : a) le triple de <i>n</i>, diminué de 4 ; b) le carré de la somme de <i>a</i> et de <i>b</i> ; c) la moitié du produit de <i>b</i> et de <i>h</i>.',
   etapes:[
    {f:'a) 3<i>n</i> − 4',w:'On prend d’abord le triple de <i>n</i>, puis on enlève 4 à ce résultat.'},
    {f:'b) (<i>a</i> + <i>b</i>)²',w:'« Le carré de… » est la dernière opération. La somme se calcule d’abord, d’où les parenthèses.'},
    {f:`c) ${F('<i>bh</i>',2)}`,w:'Le produit de <i>b</i> et de <i>h</i> s’écrit <i>bh</i>, et on en prend la moitié : c’est l’aire d’un triangle.'}],
   conclusion:'Compare : « le double de la somme de <i>x</i> et de 3 » donne 2(<i>x</i> + 3), mais « la somme du double de <i>x</i> et de 3 » donne 2<i>x</i> + 3.'}},
 {h:'Traduis la phrase',p:'Quelle expression traduit « le triple de la somme de <i>y</i> et de 4 »&nbsp;?',opts:['3<i>y</i> + 4','<i>y</i>³ + 4','3(<i>y</i> + 4)','3 + <i>y</i> + 4'],ans:2,
  why:'« Le triple de… » est la dernière opération : on calcule d’abord la somme <i>y</i> + 4, puis on la multiplie par 3. Les parenthèses sont indispensables : 3(<i>y</i> + 4).'},
 {kind:'Théorie',h:'Deux expressions qui donnent toujours le même résultat',p:`<p>Pour le périmètre d’un rectangle, Lina calcule 2<i>L</i> + 2<i>l</i> et Max calcule 2(<i>L</i> + <i>l</i>). Qui a raison ? Les deux : prendre deux fois « une longueur plus une largeur », ou ajouter deux longueurs et deux largeurs, c’est pareil.</p>
<div class="def"><p>Deux expressions sont <b>égales</b> (on dit aussi <b>équivalentes</b>) si elles donnent le <b>même résultat pour toutes les valeurs</b> des lettres. On peut alors remplacer l’une par l’autre.</p></div>
<div class="why"><p>Pour montrer que deux expressions ne sont <b>pas</b> égales, une seule valeur qui donne deux résultats différents suffit : c’est un <b>contre-exemple</b>. Pour montrer qu’elles sont égales, quelques essais ne suffisent pas, car on ne peut pas tester tous les nombres : il faut une raison, comme <i>a</i> + <i>a</i> + <i>a</i> = 3<i>a</i>, ou la distributivité 2(<i>a</i> + 3) = 2<i>a</i> + 6 (vue pour calculer malin).</p></div>
<div class="ex"><p>2(<i>a</i> + 3) et 2<i>a</i> + 6 : pour <i>a</i> = 0, on trouve 6 et 6 ; pour <i>a</i> = 5, 16 et 16. Elles sont toujours égales, grâce à la distributivité. <i>a</i>² et 2<i>a</i> : pour <i>a</i> = 2, on trouve 4 et 4. Mais pour <i>a</i> = 3, on trouve 9 et 6 : elles ne sont pas égales.</p></div>
<div class="warn"><p>Une valeur qui marche ne prouve rien. Bouge le curseur : <i>a</i>² et 2<i>a</i> ne sont d’accord que pour <i>a</i> = 0 et <i>a</i> = 2.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Le mot « algèbre », le calcul avec des lettres, vient du titre d’un livre écrit vers l’an 820 à Bagdad par le savant al-Khwârizmî. <i>Al-jabr</i> veut dire « remettre en place ».</p></div>`,
  params:[{id:'a',l:'a',min:0,max:8,v:4}],
  draw:v=>{ const a=v.a, rows=[['2(a + 3)',2*(a+3),'var(--accent)'],['2a + 6',2*a+6,'var(--accent)'],['a²',a*a,'var(--spark)'],['2a',2*a,'var(--spark)']];
    const P=plane({x:[-14,70],y:[0,5.4],w:320,h:150,grid:false,axes:false});
    rows.forEach((r,i)=>{ const y=4.3-i*1.2-(i>1?.3:0); if(r[1]>0) P.rect(0,y,r[1],.8,{fill:r[2],fo:.5,c:'var(--ink)',w:1}); P.text(0,y+.4,r[0],{a:'end',dx:-6,dy:5,s:12}).text(r[1],y+.4,String(r[1]),{dx:5,dy:5,s:12}); });
    return P.svg(); },
  info:v=>{ const a=v.a; return `2(a + 3) = ${2*(a+3)} et 2a + 6 = ${2*a+6} : égaux. a² = ${a*a} et 2a = ${2*a} : ${a*a===2*a?'égaux pour cette valeur seulement':'différents, c’est un contre-exemple'}.`; }},
 {kind:'Méthode',h:'Tester si deux expressions sont égales',p:'<b>Quand :</b> on se demande si deux façons d’écrire un calcul donnent toujours le même résultat, par exemple pour vérifier une formule. <b>Pourquoi ça marche :</b> un seul contre-exemple suffit à prouver que deux expressions sont différentes. Pour prouver qu’elles sont égales, il faut transformer l’une en l’autre avec des règles toujours vraies : regrouper (<i>x</i> + <i>x</i> + <i>x</i> = 3<i>x</i>), changer l’ordre des termes ou des facteurs, distribuer (3(<i>a</i> + <i>b</i>) = 3<i>a</i> + 3<i>b</i>). <b>Comment :</b> 1) teste plusieurs valeurs, dont 0, 1 et une plus grande ; 2) si une valeur donne deux résultats différents, conclus : pas égales ; 3) sinon, cherche la règle qui transforme l’une en l’autre.',
  demo:{enonce:'Les expressions 4(<i>n</i> + 1) et 4<i>n</i> + 1 sont-elles égales&nbsp;? Et 4(<i>n</i> + 1) et 4<i>n</i> + 4&nbsp;?',
   etapes:[
    {f:'Pour <i>n</i> = 0 : 4 · (0 + 1) = 4 et 4 · 0 + 1 = 1',w:'On teste d’abord une valeur simple.'},
    {f:'4 ≠ 1 : 4(<i>n</i> + 1) et 4<i>n</i> + 1 ne sont pas égales',w:'Un seul contre-exemple suffit.'},
    {f:'Pour <i>n</i> = 0, 1 et 5 : 4(<i>n</i> + 1) donne 4, 8 et 24 ; 4<i>n</i> + 4 donne 4, 8 et 24',w:'Les essais sont d’accord, mais ils ne prouvent rien à eux seuls.'},
    {f:'4(<i>n</i> + 1) = 4 · <i>n</i> + 4 · 1 = 4<i>n</i> + 4',w:'La distributivité : multiplier une somme par 4, c’est multiplier chacun de ses termes par 4. C’est vrai pour tout <i>n</i>.'}],
   conclusion:'4(<i>n</i> + 1) = 4<i>n</i> + 4 pour tout <i>n</i>, mais 4(<i>n</i> + 1) ≠ 4<i>n</i> + 1. Oublier de multiplier le 1 est une erreur très fréquente.'}},
 {h:'Égales ou pas ?',p:'Laquelle de ces expressions est toujours égale à 3(<i>a</i> + 2)&nbsp;?',opts:['3<i>a</i> + 2','5<i>a</i>','3<i>a</i> + 6','<i>a</i> + 6'],ans:2,
  why:'Distributivité : 3(<i>a</i> + 2) = 3<i>a</i> + 3 · 2 = 3<i>a</i> + 6. Contre-exemple pour 3<i>a</i> + 2 : avec <i>a</i> = 0, on trouve 6 et 2.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : premières lettres',p:`<div class="keep"><ul><li>Une <b>lettre</b> remplace un nombre inconnu ou qui peut changer. Une <b>formule</b> relie des grandeurs : <i>A</i> = <i>L</i> · <i>l</i>.</li><li><b>Conventions</b> : 3 · <i>a</i> = 3<i>a</i>, <i>a</i> · <i>b</i> = <i>ab</i>, <i>a</i> · <i>a</i> = <i>a</i>², <i>x</i> · <i>x</i> · <i>x</i> = <i>x</i>³, 1<i>a</i> = <i>a</i>, nombre devant, lettres dans l’ordre. Jamais 3 · 4 = 34.</li><li><b>Valeur d’une expression</b> : rétablir les ·, remplacer les lettres, respecter les priorités (parenthèses, puissances, × et :, puis + et −).</li><li><b>Figure</b> : périmètre = somme des côtés en faisant le tour ; aire par découpage. Contrôler avec une valeur.</li><li><b>Phrase</b> : somme, différence, produit, quotient, double, moitié, carré… Le premier mot nomme l’opération faite en dernier ; parenthèses pour une somme calculée d’abord.</li><li><b>Expressions égales</b> : même résultat pour toutes les valeurs. Un contre-exemple suffit à prouver le contraire ; pour prouver l’égalité, il faut une règle (regrouper, distributivité ${'2(<i>a</i> + 3) = 2<i>a</i> + 6'}).</li></ul></div>`},
 {kind:'Problème',h:'Le potager clôturé',
  p:'Tu aides à aménager un potager rectangulaire. Sa largeur n’est pas encore fixée : on la note <i>x</i>, en mètres. Sa longueur mesure 3 m de plus que sa largeur. Il faudra une clôture tout autour, à 12 CHF le mètre, et du terreau : un sac couvre 4 m².',
  parts:[
   {q:'a) Quelle expression donne la longueur du potager&nbsp;?',opts:['3<i>x</i>','<i>x</i> + 3','<i>x</i> − 3','<i>x</i>³'],ans:1,hint:'« 3 m de plus que la largeur » : on ajoute 3.',why:'La longueur vaut la largeur plus 3 m : <i>x</i> + 3. 3<i>x</i> serait le triple de la largeur.'},
   {q:'b) Quelle expression donne le périmètre du potager&nbsp;?',opts:['2<i>x</i> + 3','<i>x</i>(<i>x</i> + 3)','4<i>x</i> + 6','4<i>x</i> + 3'],ans:2,hint:'Fais le tour : <i>x</i>, puis <i>x</i> + 3, puis <i>x</i>, puis <i>x</i> + 3.',why:'<i>x</i> + <i>x</i> + 3 + <i>x</i> + <i>x</i> + 3 = 4<i>x</i> + 6. <i>x</i>(<i>x</i> + 3) serait l’aire.'},
   {q:'c) On choisit <i>x</i> = 5 m. Combien coûte la clôture&nbsp;?',lab:'prix =',unit:'CHF',ans:312,hint:'Calcule d’abord le périmètre pour <i>x</i> = 5, puis le prix.',why:'4 · 5 + 6 = 26 m de clôture ; 26 · 12 = 312 CHF.'},
   {q:'d) Toujours avec <i>x</i> = 5 m, combien de sacs de terreau faut-il&nbsp;?',lab:'sacs =',ans:10,hint:'Aire = largeur · longueur, puis divise par 4.',why:'La longueur vaut 5 + 3 = 8 m. Aire = 5 · 8 = 40 m², et 40 : 4 = 10 sacs.'},
  ],
  sol:'Largeur : <i>x</i>. Longueur : <i>x</i> + 3.<br>Périmètre : <i>x</i> + (<i>x</i> + 3) + <i>x</i> + (<i>x</i> + 3) = 4<i>x</i> + 6. Aire : <i>x</i>(<i>x</i> + 3).<br>Pour <i>x</i> = 5 : périmètre 4 · 5 + 6 = 26 m, donc la clôture coûte 26 · 12 = 312 CHF.<br>Aire : 5 · 8 = 40 m², donc 40 : 4 = 10 sacs de terreau.<br>Contrôle du périmètre : 5 + 8 + 5 + 8 = 26 m ✓.'},
 {kind:'Problème',h:'Les carrés d’allumettes',
  p:'On aligne des carrés faits d’allumettes, côte à côte : deux carrés voisins partagent une allumette. Pour 1 carré il faut 4 allumettes, pour 2 carrés 7, pour 3 carrés 10. On note <i>n</i> le nombre de carrés.',
  fig:(()=>{ const P=plane({x:[-.5,9.5],y:[-.5,3.5],w:320,grid:false,axes:false}); for(let k=0;k<3;k++){ const x=k*3; P.seg(x,0,x+3,0,{c:'var(--spark)',w:4}).seg(x,3,x+3,3,{c:'var(--spark)',w:4}); } for(let k=0;k<=3;k++) P.seg(k*3,0,k*3,3,{c:'var(--spark)',w:4}); return P.svg(); })(),
  parts:[
   {q:'a) Combien faut-il d’allumettes pour 5 carrés&nbsp;?',lab:'allumettes =',ans:16,hint:'Chaque nouveau carré ajoute combien d’allumettes&nbsp;?',why:'4, 7, 10, 13, 16 : chaque nouveau carré en ajoute 3. Pour 5 carrés : 16 allumettes.'},
   {q:'b) Léo propose la formule 4 + 3(<i>n</i> − 1) et Zoé la formule 3<i>n</i> + 1. Qui a raison&nbsp;?',opts:['Seulement Léo','Seulement Zoé','Les deux : leurs expressions sont égales','Aucun des deux'],ans:2,hint:'Teste <i>n</i> = 1, 2 et 3, puis cherche dans le dessin ce que compte chaque formule.',why:'Léo compte 4 allumettes pour le 1er carré, puis 3 pour chacun des <i>n</i> − 1 autres. Zoé compte 1 allumette au départ, puis 3 par carré. Ils comptent la même chose : pour <i>n</i> = 3, 4 + 6 = 10 et 9 + 1 = 10.'},
   {q:'c) Combien faut-il d’allumettes pour 20 carrés&nbsp;?',lab:'allumettes =',ans:61,hint:'Utilise l’expression de Zoé.',why:'3 · 20 + 1 = 60 + 1 = 61 allumettes.'},
   {q:'d) Tu as une boîte de 100 allumettes. Combien de carrés peux-tu aligner au maximum&nbsp;?',lab:'carrés =',ans:33,hint:'Cherche <i>n</i> pour que 3<i>n</i> + 1 soit le plus proche possible de 100 sans dépasser : essaie 30, puis ajuste.',why:'3 · 33 + 1 = 100 : on utilise exactement les 100 allumettes. Avec 34 carrés, il en faudrait 103.'},
  ],
  sol:'En comptant : 4, 7, 10, 13, 16… chaque carré ajouté demande 3 allumettes de plus.<br>Zoé : une allumette verticale au début, puis 3 allumettes (haut, bas, droite) par carré : 3<i>n</i> + 1.<br>Léo : le 1er carré complet (4), puis 3 pour chacun des <i>n</i> − 1 suivants : 4 + 3(<i>n</i> − 1). Avec la distributivité, 4 + 3<i>n</i> − 3 = 3<i>n</i> + 1 : les deux formules sont égales.<br>Pour 20 carrés : 3 · 20 + 1 = 61 allumettes.<br>Avec 100 allumettes : 3 · 33 + 1 = 100, donc 33 carrés exactement (34 carrés demanderaient 103 allumettes).'},
]},
);
})();
