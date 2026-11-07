/* Déclic — Maths au secondaire, 10e année : calcul littéral, fonctions, équations */
(()=>{
/* ---------- helpers locaux ---------- */
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;
// un monôme k·lit dans une somme (first : premier terme, sans « + »)
const mono=(k,lit,first)=>{ const ab=Math.abs(k), coef=(ab===1&&lit)?'':fmt(ab); return (first?(k<0?'−':''):(k<0?' − ':' + '))+coef+lit; };
const poly=(cs,lits)=>{ let out=''; cs.forEach((k,i)=>{ if(k!==0) out+=mono(k,lits[i],out===''); }); return out||'0'; };
const LX=['<i>x</i>²','<i>x</i>',''];
const lin=(a,b)=>poly([a,b],['<i>x</i>','']);

// tuiles algébriques : a tuiles x², b bandes x, c carrés unités (rouge = négatif)
function tiles(a,b,c){
  const P=plane({x:[-.3,16.7],y:[-.9,2.4],grid:false,axes:false});
  const col=k=>k>0?'var(--math)':'var(--bad)';
  let px=0;
  if(a){ const x0=px; for(let i=0;i<Math.abs(a);i++){ P.rect(px,0,2,2,{fill:col(a),fo:.35,c:col(a),w:1.5}); P.text(px+1,1,'x²',{a:'middle',dy:5,s:12}); px+=2.25; }
    P.text((x0+px-.25)/2,0,mono(a,'x²',true),{a:'middle',dy:14,s:11,c:col(a)}); px+=.5; }
  if(b){ const x0=px; for(let i=0;i<Math.abs(b);i++){ P.rect(px,0,.5,2,{fill:col(b),fo:.35,c:col(b),w:1.5}); px+=.7; }
    P.text((x0+px-.2)/2,0,mono(b,'x',true),{a:'middle',dy:14,s:11,c:col(b)}); px+=.5; }
  if(c){ const x0=px, n=Math.abs(c); for(let i=0;i<n;i++){ const cx=x0+Math.floor(i/4)*.6, cy=(i%4)*.5; P.rect(cx,cy,.45,.45,{fill:col(c),fo:.35,c:col(c),w:1.2}); }
    const wd=Math.ceil(n/4)*.6; P.text(x0+wd/2-.08,0,mono(c,'',true),{a:'middle',dy:14,s:11,c:col(c)}); }
  if(!a&&!b&&!c) P.text(8,1,'0 : aucune tuile',{a:'middle',s:12,c:'var(--muted)'});
  return P.svg();
}

// 3 carrés de côté x, dont on barre 7 carreaux : 3x² − 7
function sqTiles(x){
  const P=plane({x:[-.5,17.5],y:[-1.3,5.5],grid:false,axes:false});
  const cells=[]; for(let s=0;s<3;s++) for(let r=0;r<x;r++) for(let c=0;c<x;c++) cells.push([s*5.8+c,r]);
  cells.forEach(([cx,cy],i)=>{ const cut=i>=cells.length-7;
    P.rect(cx,cy,1,1,{fill:cut?'var(--bad)':'var(--math)',fo:cut?.15:.35,c:'var(--surface)',w:1.5});
    if(cut){ P.seg(cx+.2,cy+.2,cx+.8,cy+.8,{c:'var(--bad)',w:1.8}).seg(cx+.2,cy+.8,cx+.8,cy+.2,{c:'var(--bad)',w:1.8}); } });
  for(let s=0;s<3;s++) P.text(s*5.8+x/2,0,`${x}² = ${x*x}`,{a:'middle',dy:16,s:11,c:'var(--muted)'});
  return P.svg();
}

// rectangle (x + b)(x + d) découpé en 4 morceaux
function cutRect(x,b,d){
  const W=x+b, H=x+d, P=plane({x:[-1.6,10.4],y:[-.6,11.4],axes:false});
  P.rect(0,d,x,x,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2}).rect(x,d,b,x,{fill:'var(--accent)',fo:.3,c:'var(--ink)',w:2})
   .rect(0,0,x,d,{fill:'var(--spark)',fo:.3,c:'var(--ink)',w:2}).rect(x,0,b,d,{fill:'var(--ok)',fo:.35,c:'var(--ink)',w:2});
  P.text(x/2,d+x/2,'x²',{a:'middle',dy:5,s:14}).text(x+b/2,d+x/2,`${b}x`,{a:'middle',dy:5,s:13})
   .text(x/2,d/2,`${d}x`,{a:'middle',dy:5,s:13}).text(x+b/2,d/2,`${b*d}`,{a:'middle',dy:5,s:13});
  P.text(x/2,H,'x',{a:'middle',dy:-8,s:13,c:'var(--math)'}).text(x+b/2,H,`${b}`,{a:'middle',dy:-8,s:13,c:'var(--accent)'})
   .text(0,d+x/2,'x',{a:'end',dx:-8,dy:5,s:13,c:'var(--math)'}).text(0,d/2,`${d}`,{a:'end',dx:-8,dy:5,s:13,c:'var(--spark)'});
  return P.svg();
}

// balance : L et R = {x: nombre de boîtes, u: nombre de poids de 1}, xv = masse cachée d’une boîte
function balance(L,R,xv){
  const P=plane({x:[0,10],y:[0,6.6],grid:false,axes:false});
  const mL=L.x*xv+L.u, mR=R.x*xv+R.u, t=Math.max(-.6,Math.min(.6,(mL-mR)*.12));
  P.poly([[4.5,.2],[5.5,.2],[5,2.6]],{fill:'var(--muted)',fo:.45,c:'var(--muted)',w:1.5});
  const yl=2.6-t, yr=2.6+t; P.seg(2,yl,8,yr,{c:'var(--ink)',w:3.5});
  const pan=(xc,yb,S)=>{ P.seg(xc,yb,xc,yb+.35,{c:'var(--ink)',w:2.5}).seg(xc-1.75,yb+.35,xc+1.75,yb+.35,{c:'var(--ink)',w:4});
    const items=[]; for(let i=0;i<S.x;i++) items.push('x'); for(let i=0;i<S.u;i++) items.push('1');
    items.forEach((it,i)=>{ const cx=xc-1.3+(i%5)*.65, cy=yb+.75+Math.floor(i/5)*.68;
      if(it==='x'){ P.rect(cx-.29,cy-.29,.58,.58,{fill:'var(--accent)',fo:.55,c:'var(--accent)',w:1.5}); P.text(cx,cy,'x',{a:'middle',dy:4,s:11}); }
      else { P.circ(cx,cy,.25,{fill:'var(--spark)',fo:.6,c:'var(--spark)',w:1.5}); P.text(cx,cy,'1',{a:'middle',dy:4,s:10}); } }); };
  pan(2,yl,L); pan(8,yr,R);
  return P.svg();
}
const side=S=>poly([S.x,S.u],['<i>x</i>','']);

// graphique d’une fonction
const grf=(o={})=>plane({x:o.x||[-5,5],y:o.y||[-5,5],h:o.h,step:o.step,lx:o.lx||1,ly:o.ly||1});

// machine à calculer
function machine(xin,out,rule){
  const P=plane({x:[0,10],y:[0,2.8],grid:false,axes:false});
  P.rect(3.3,.4,3.4,1.8,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:2});
  P.text(5,1.3,rule,{a:'middle',dy:5,s:13});
  P.arrow(1.7,1.3,3.2,1.3,{c:'var(--ink)',w:2,hs:9}).arrow(6.8,1.3,8.3,1.3,{c:'var(--ink)',w:2,hs:9});
  P.text(.9,1.3,fmt(xin),{a:'middle',dy:6,s:17,c:'var(--math)'}).text(9.1,1.3,fmt(out),{a:'middle',dy:6,s:17,c:'var(--spark)'});
  P.text(.9,2.5,'entrée x',{a:'middle',s:11,c:'var(--muted)'}).text(9.1,2.5,'sortie f(x)',{a:'middle',s:11,c:'var(--muted)'});
  return P.svg();
}

// diagramme circulaire : data = [[nom, effectif, couleur], …]
function pie(data){
  const P=plane({x:[-1.15,3.1],y:[-1.15,1.15],grid:false,axes:false});
  const tot=data.reduce((s,d)=>s+d[1],0); let a0=90;
  data.forEach(([l,n,c],k)=>{ const da=n/tot*360, pts=[[0,0]];
    for(let i=0;i<=40;i++){ const a=rad(a0-da*i/40); pts.push([Math.cos(a),Math.sin(a)]); }
    P.poly(pts,{fill:c,fo:.6,c:'var(--surface)',w:2});
    const am=rad(a0-da/2); P.text(.62*Math.cos(am),.62*Math.sin(am),Math.round(da)+'°',{a:'middle',dy:4,s:11});
    a0-=da;
    const ly=.85-k*.45; P.rect(1.35,ly-.12,.24,.24,{fill:c,fo:.6,c:null}); P.text(1.7,ly,`${l} : ${n}`,{dy:4,s:12}); });
  return P.svg();
}
// diagramme en barres : data = [[nom, valeur], …]
function bars(data,max,step,col='var(--math)'){
  const n=data.length, P=plane({x:[-1.4,n*1.4+.2],y:[-max*.16,max*1.1],h:200,grid:false,axes:false});
  for(let y=0;y<=max+1e-9;y+=step){ P.seg(-.2,y,n*1.4+.1,y,{c:'var(--line)',w:1}); P.text(-.35,y,fmt(y),{a:'end',dy:4,s:10,c:'var(--muted)'}); }
  data.forEach(([l,v],i)=>{ const x0=.3+i*1.4; P.rect(x0,0,.9,v,{fill:col,fo:.55,c:col,w:1.5}); P.text(x0+.45,0,l,{a:'middle',dy:15,s:11}); });
  return P.svg();
}

COURS.push(
/* ===================== CALCUL LITTÉRAL ===================== */
{subj:'sec', sem:'a10', o:8, id:'sec10-litteral', h:'Calcul littéral', p:'Calculer avec des lettres : valeur d’une expression, monômes et polynômes, réduire, développer avec des rectangles découpés.', steps:[
 {kind:'Théorie',h:'Des lettres à la place des nombres',p:`<p>Ton abonnement de jeux vidéo coûte 5 CHF par mois, plus 2 CHF par partie en ligne. Combien paies-tu&nbsp;? Ça dépend du nombre de parties. Au lieu d’écrire un calcul pour 1 partie, un autre pour 2 parties, puis pour 3…, on écrit une seule formule : 5 + 2 · <i>n</i>, où la lettre <i>n</i> est le nombre de parties.</p>
<div class="def"><p>Une <b>expression littérale</b> est un calcul qui contient des lettres. Chaque lettre remplace un nombre qu’on ne connaît pas encore, ou qui peut changer. Conventions d’écriture : on peut enlever le signe · devant une lettre ou une parenthèse (2 · <i>n</i> = 2<i>n</i>, <i>a</i> · <i>b</i> = <i>ab</i>, 3 · (<i>x</i> + 1) = 3(<i>x</i> + 1)). On écrit le nombre en premier : <i>a</i> · 4 = 4<i>a</i>. On écrit 1<i>a</i> = <i>a</i>, <i>a</i> · <i>a</i> = <i>a</i>² et <i>a</i> · <i>a</i> · <i>a</i> = <i>a</i>³.</p></div>
<div class="ex"><p>Le rectangle de la figure a pour côtés <i>a</i> et <i>b</i>. Son aire vaut <i>ab</i> et son périmètre 2<i>a</i> + 2<i>b</i>. Avec <i>a</i> = 5 cm et <i>b</i> = 3 cm : aire 15 cm², périmètre 16 cm. Pour 4 parties de jeu : 5 + 2 · 4 = 13 CHF.</p></div>
<div class="warn"><p>Entre deux nombres, on garde le signe · : 2 · 3 = 6, alors que « 23 » est le nombre vingt-trois. Et 2<i>a</i> veut dire 2 · <i>a</i>, jamais 2 + <i>a</i>.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Vers 1590, le Français François Viète a eu l’idée de noter les nombres inconnus avec des lettres. Avant lui, on écrivait les calculs en phrases entières. Le <i>x</i> de l’inconnue vient de René Descartes, en 1637.</p></div>`,
  fig:(()=>{ const P=plane({x:[-1,9],y:[-1,5],grid:false,axes:false});
    P.rect(0,0,7,3.5,{fill:'var(--math)',fo:.25,c:'var(--math)',w:2.5});
    P.text(3.5,3.5,'a',{a:'middle',dy:-8,s:15}).text(7,1.75,'b',{dx:8,dy:5,s:15}).text(3.5,1.75,'aire : ab',{a:'middle',dy:5,s:14});
    return P.svg(); })()},
 {kind:'Théorie',h:'La valeur d’une expression',p:`<p>Que vaut 3<i>x</i>² − 7&nbsp;? Tant qu’on ne connaît pas <i>x</i>, on ne peut pas répondre. Mais si on choisit <i>x</i> = 4, le calcul devient un calcul ordinaire.</p>
<div class="def"><p>Calculer la <b>valeur numérique</b> d’une expression, c’est remplacer chaque lettre par le nombre donné, puis effectuer le calcul en respectant les <b>priorités</b> : d’abord les parenthèses, puis les puissances, puis les multiplications et les divisions, enfin les additions et les soustractions.</p></div>
<div class="idea"><p>Sur la figure, 3<i>x</i>² est dessiné par 3 carrés de côté <i>x</i>. On compte leurs petits carreaux, puis on en barre 7. Bouge le curseur : les carrés grandissent et la valeur change, mais la formule reste la même.</p></div>
<div class="ex"><p>Pour <i>x</i> = 4 : 3 · 4² − 7 = 3 · 16 − 7 = 48 − 7 = 41. On calcule d’abord le carré 4² = 16, puis le produit 3 · 16, puis la différence.</p></div>
<div class="warn"><p>3<i>x</i>² veut dire 3 · <i>x</i>², pas (3<i>x</i>)². Pour <i>x</i> = 4 : 3 · 16 = 48, alors que (3 · 4)² = 144.</p></div>`,
  params:[{id:'x',l:'x',min:2,max:5,v:3}],
  draw:v=>sqTiles(v.x),
  info:v=>`3 · ${v.x}² − 7 = 3 · ${v.x*v.x} − 7 = ${3*v.x*v.x} − 7 = <b>${3*v.x*v.x-7}</b>`},
 {kind:'Méthode',h:'Calculer la valeur numérique d’une expression',p:`<b>Quand :</b> on te donne une formule et la valeur de chaque lettre. <b>Pourquoi ça marche :</b> une lettre n’est qu’un nom provisoire pour un nombre ; quand on connaît le nombre, on le met à sa place. <b>Comment :</b> 1) récris l’expression en remplaçant chaque lettre par sa valeur, entre parenthèses si elle est négative ; 2) remets les signes · cachés (2<i>a</i> devient 2 · <i>a</i>) ; 3) calcule en respectant les priorités ; 4) écris une chaîne d’égalités où chaque membre est vraiment égal au précédent : c’est la règle « pas de fausse égalité ».`,
  demo:{enonce:`Calculer a) (<i>B</i> + <i>b</i>) · <i>h</i> : 2 pour <i>B</i> = 9, <i>b</i> = 5, <i>h</i> = 4 (aire d’un trapèze en cm²) ; b) 3<i>a</i>² − 7 pour <i>a</i> = −2 ; c) √(<i>a</i>² + <i>b</i>²) pour <i>a</i> = 6, <i>b</i> = 8 ; d) π<i>r</i>²<i>h</i> pour <i>r</i> = 3, <i>h</i> = 10.`,
   etapes:[
    {f:'a) (9 + 5) · 4 : 2 = 14 · 4 : 2 = 56 : 2 = 28',w:'Les parenthèses d’abord, puis les multiplications et divisions de gauche à droite. L’aire vaut 28 cm².'},
    {f:'b) 3 · (−2)² − 7 = 3 · 4 − 7 = 12 − 7 = 5',w:'La valeur négative est mise entre parenthèses : (−2)² = (−2) · (−2) = 4, un nombre positif.'},
    {f:'c) √(6² + 8²) = √(36 + 64) = √100 = 10',w:'Sous la racine : d’abord les carrés, puis la somme. La racine carrée se prend tout à la fin.'},
    {f:'d) π · 3² · 10 = π · 9 · 10 = 90π ≈ 282,7',w:'C’est le volume d’un cylindre de rayon 3 et de hauteur 10. On garde π jusqu’au bout et on arrondit seulement à la fin.'}],
   conclusion:'28 ; 5 ; 10 ; environ 282,7. Écrire « 9 + 5 = 14 · 4 = 56 » serait une fausse égalité : 9 + 5 vaut 14, pas 56.'},
  note:`<b>Piège avec les fractions :</b> pour ${F(1,'<i>a</i>')} + ${F(1,'<i>b</i>')} avec <i>a</i> = 2 et <i>b</i> = 3, on met au même dénominateur : ${F(1,2)} + ${F(1,3)} = ${F(3,6)} + ${F(2,6)} = ${F(5,6)}. Ce n’est pas ${F(2,5)}.`},
 {h:'À toi : une somme de fractions',p:`Calcule ${F(1,'<i>a</i>')} + ${F(1,'<i>b</i>')} pour <i>a</i> = 4 et <i>b</i> = 12. Tu peux répondre par une fraction (par exemple 2/7).`,lab:'valeur =',ans:1/3,tol:0.002,
  why:`${F(1,4)} + ${F(1,12)} = ${F(3,12)} + ${F(1,12)} = ${F(4,12)} = ${F(1,3)}. Le dénominateur commun 12 est un multiple de 4 et de 12.`},
 {kind:'Méthode',h:'Traduire une figure ou une phrase en expression',p:`<p>Pour écrire une expression, on se demande quel est le <b>dernier calcul</b> à faire : il donne son nom à l’expression. Une <b>somme</b> (le dernier calcul est +), une <b>différence</b> (−), un <b>produit</b> (·) ou un <b>quotient</b> (:). Petit dictionnaire : le double de <i>x</i> = 2<i>x</i> ; le triple = 3<i>x</i> ; la moitié = <i>x</i> : 2 ; le carré = <i>x</i>² ; l’opposé = −<i>x</i> ; « augmenté de 5 » = + 5 ; « diminué de 5 » = − 5.</p><p>Pour une figure, on découpe en morceaux simples (carrés, rectangles) et on additionne les aires ; pour le périmètre, on fait le tour en ajoutant chaque côté.</p><div class="warn"><p>« Le carré de la somme » (<i>a</i> + <i>b</i>)² n’est pas « la somme des carrés » <i>a</i>² + <i>b</i>². Avec <i>a</i> = 1 et <i>b</i> = 2 : 9 contre 5.</p></div>`,
  fig:(()=>{ const P=plane({x:[-1.5,9],y:[-1,6.5],grid:false,axes:false});
    P.poly([[0,0],[7.5,0],[7.5,2.4],[5.5,2.4],[5.5,5.5],[0,5.5]],{fill:'var(--math)',fo:.25,c:'var(--math)',w:2.5});
    P.seg(5.5,0,5.5,2.4,{c:'var(--muted)',w:1.5,dash:true});
    P.text(2.75,5.5,'x',{a:'middle',dy:-8,s:14}).text(0,2.75,'x',{a:'end',dx:-8,dy:5,s:14}).text(6.5,2.4,'2',{a:'middle',dy:-8,s:14}).text(7.5,1.2,'3',{dx:8,dy:5,s:14});
    return P.svg(); })(),
  demo:{enonce:'a) Écrire l’aire et le périmètre de la figure en L (un carré de côté <i>x</i> et un rectangle de 2 sur 3, avec <i>x</i> plus grand que 3). b) Traduire « le triple de la somme de <i>x</i> et de 4 ». c) Traduire « le carré de <i>a</i>, diminué de 5 ».',
   etapes:[
    {f:'Aire = <i>x</i>² + 2 · 3 = <i>x</i>² + 6',w:'On découpe le L en un carré de côté <i>x</i> et un rectangle de 2 sur 3, puis on additionne les deux aires.'},
    {f:'Périmètre = (<i>x</i> + 2) + 3 + 2 + (<i>x</i> − 3) + <i>x</i> + <i>x</i> = 4<i>x</i> + 4',w:'On fait le tour depuis le coin en bas à gauche. Le petit côté vertical du milieu vaut <i>x</i> − 3. Il y a quatre fois <i>x</i>, et 2 + 3 + 2 − 3 = 4.'},
    {f:'b) 3(<i>x</i> + 4)',w:'Le dernier calcul est « le triple » : c’est un produit. La somme se calcule avant, donc elle va entre parenthèses.'},
    {f:'c) <i>a</i>² − 5',w:'Le dernier calcul est « diminué de » : c’est une différence. Le carré se fait d’abord, sans parenthèses.'}],
   conclusion:'Aire <i>x</i>² + 6, périmètre 4<i>x</i> + 4 ; 3(<i>x</i> + 4) ; <i>a</i>² − 5. Contrôle avec <i>x</i> = 1 : « le triple de la somme de 1 et de 4 » vaut 15, et 3(1 + 4) = 15.'}},
 {h:'Quelle expression ?',p:'« Le carré de la somme de <i>a</i> et de <i>b</i> » s’écrit :',opts:['<i>a</i>² + <i>b</i>²','<i>a</i> + <i>b</i>²','(<i>a</i> + <i>b</i>)²','2(<i>a</i> + <i>b</i>)'],ans:2,
  why:'Le dernier calcul est le carré, et ce qu’on élève au carré est la somme <i>a</i> + <i>b</i> : on écrit (<i>a</i> + <i>b</i>)². <i>a</i>² + <i>b</i>² est la somme des carrés.'},
 {kind:'Théorie',h:'Des expressions équivalentes',p:`<p>Au cinéma, une place coûte 12 CHF et chacun prend une boisson à 3 CHF. Pour <i>x</i> amis, Léo écrit 12<i>x</i> + 3<i>x</i>, Mia écrit 15<i>x</i>. Qui a raison&nbsp;? Les deux !</p>
<div class="def"><p>Deux expressions sont <b>équivalentes</b> si elles donnent le même résultat <b>pour toutes</b> les valeurs des lettres. On peut alors écrire une égalité entre elles : 12<i>x</i> + 3<i>x</i> = 15<i>x</i> et 2(<i>x</i> + 3) = 2<i>x</i> + 6.</p></div>
<div class="idea"><p>Bouge le curseur. Les barres de 2(<i>x</i> + 3) et de 2<i>x</i> + 6 ont toujours la même longueur. Celle de <i>x</i>² + 6 tombe juste deux fois, pour <i>x</i> = 0 et <i>x</i> = 2, puis s’en va : ce n’est qu’une coïncidence.</p></div>
<div class="why"><p>Pour prouver que deux expressions <b>ne sont pas</b> équivalentes, un seul contre-exemple suffit : pour <i>x</i> = 1, 2<i>x</i> + 6 = 8 mais <i>x</i>² + 6 = 7. Pour prouver qu’elles <b>sont</b> équivalentes, tester des valeurs ne suffit jamais, car il y en a une infinité. Il faut une règle de calcul, comme la distributivité qu’on verra plus bas.</p></div>
<div class="ex"><p>Pour <i>x</i> = 2, les trois expressions valent 10. Pour <i>x</i> = 3 : 2(3 + 3) = 12, 2 · 3 + 6 = 12, mais 3² + 6 = 15.</p></div>`,
  params:[{id:'x',l:'x',min:-3,max:4,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[-6.5,25],y:[0,4.2],h:150,grid:false,axes:false}); const vals=[[2*(v.x+3),'2(x + 3)','var(--math)'],[2*v.x+6,'2x + 6','var(--accent)'],[v.x*v.x+6,'x² + 6','var(--spark)']];
    P.seg(0,.1,0,4.1,{c:'var(--muted)',w:1.5});
    vals.forEach(([val,l,c],i)=>{ const y=3.2-i*1.35; P.rect(0,y-.3,val,.6,{fill:c,fo:.55,c:c,w:1.5}); P.text(0,y,l,{a:'end',dx:-6,dy:5,s:12}); P.text(val,y,fmt(val),{dx:6,dy:5,s:12,c:c}); });
    return P.svg(); },
  info:v=>{ const a=2*(v.x+3), b=v.x*v.x+6; return `Pour <i>x</i> = ${fmt(v.x)} : 2(<i>x</i> + 3) = ${fmt(a)}, 2<i>x</i> + 6 = ${fmt(a)}, <i>x</i>² + 6 = ${fmt(b)}${Math.abs(a-b)<1e-9?' : les trois tombent juste ici, par hasard pour la dernière.':'.'}`; }},
 {kind:'Défi',h:'Le tour de magie',p:'Pense à un nombre. Multiplie-le par 4, ajoute 10, divise le tout par 2, puis retire le double du nombre de départ. Quel nombre obtiens-tu, quel que soit le nombre choisi au départ&nbsp;?',lab:'résultat =',ans:5,
  why:'Essaie d’abord : avec 1, (4 + 10) : 2 − 2 = 5 ; avec 7, (28 + 10) : 2 − 14 = 5. Puis on prouve avec une lettre <i>n</i> : (4<i>n</i> + 10) : 2 − 2<i>n</i> = 2<i>n</i> + 5 − 2<i>n</i> = 5. Stratégie : essayer quelques cas, puis généraliser avec une lettre.'},
 {kind:'Théorie',h:'Monômes et polynômes',p:`<p>Au marché, 3 pommes + 2 poires + 5 pommes = 8 pommes + 2 poires : on ne regroupe que les fruits de la même sorte. En algèbre, les « sortes » s’appellent des parties littérales.</p>
<div class="def"><p>Un <b>monôme</b> est le produit d’un nombre et de lettres, comme −5<i>x</i>²<i>y</i>. Le nombre −5 est son <b>coefficient</b>, <i>x</i>²<i>y</i> sa <b>partie littérale</b>. Son <b>degré</b> est le nombre de lettres multipliées : <i>x</i>²<i>y</i> = <i>x</i> · <i>x</i> · <i>y</i>, degré 3. Un nombre seul, comme 7, est un monôme de degré 0. Un <b>polynôme</b> est une somme de monômes, appelés ses <b>termes</b> ; son degré est le plus grand degré de ses termes.</p></div>
<div class="idea"><p>Les tuiles de la figure montrent 2<i>x</i>² + 3<i>x</i> + 4 : deux grands carrés <i>x</i>², trois bandes <i>x</i> et quatre petits carrés unités. Deux termes sont <b>semblables</b> s’ils ont la même partie littérale : 3<i>x</i>² et −<i>x</i>² oui ; 3<i>x</i>² et 3<i>x</i> non, un carré n’est pas une bande.</p></div>
<div class="ex"><p>4<i>x</i>³ − 2<i>x</i> + 1 a trois termes, de coefficients 4, −2 et 1 ; son degré est 3. Le monôme <i>x</i> a pour coefficient 1 et −<i>x</i> a pour coefficient −1.</p></div>
<div class="warn"><p><i>x</i>² et 2<i>x</i> ne sont pas la même chose : pour <i>x</i> = 3, <i>x</i>² = 9 et 2<i>x</i> = 6.</p></div>`,
  fig:tiles(2,3,4)},
 {h:'Le degré d’un polynôme',p:'Quel est le degré du polynôme 4<i>x</i>²<i>y</i> − 7<i>x</i>³<i>y</i>² + 2<i>xy</i>&nbsp;?',lab:'degré =',ans:5,
  why:'Les degrés des termes sont 2 + 1 = 3, 3 + 2 = 5 et 1 + 1 = 2. Le degré du polynôme est le plus grand : 5.'},
 {kind:'Méthode',h:'Supprimer les parenthèses et réduire',p:`<b>Quand :</b> un polynôme contient des termes semblables, ou on additionne et soustrait des polynômes entre parenthèses. <b>Pourquoi ça marche :</b> 3<i>x</i>² + <i>x</i>² = (3 + 1)<i>x</i>² = 4<i>x</i>², c’est la distributivité, comme 3 pommes + 1 pomme. Un signe − devant une parenthèse veut dire « retirer tout ce qu’elle contient » : chaque terme change de signe. <b>Comment :</b> 1) supprime les parenthèses : après un +, on recopie ; après un −, on change le signe de chaque terme ; 2) regroupe les termes semblables ; 3) additionne leurs coefficients ; 4) <b>ordonne</b> : du plus grand degré au plus petit.`,
  demo:{enonce:'Réduire et ordonner (4<i>x</i>² − 3<i>x</i> + 2) − (<i>x</i>² − 5<i>x</i> + 7).',
   etapes:[
    {f:'4<i>x</i>² − 3<i>x</i> + 2 − <i>x</i>² + 5<i>x</i> − 7',w:'Le − devant la deuxième parenthèse change chaque signe : <i>x</i>² devient −<i>x</i>², −5<i>x</i> devient +5<i>x</i>, +7 devient −7.'},
    {f:'(4<i>x</i>² − <i>x</i>²) + (−3<i>x</i> + 5<i>x</i>) + (2 − 7)',w:'On regroupe les termes semblables : les <i>x</i>² ensemble, les <i>x</i> ensemble, les nombres ensemble.'},
    {f:'3<i>x</i>² + 2<i>x</i> − 5',w:'On additionne les coefficients : 4 − 1 = 3, −3 + 5 = 2, 2 − 7 = −5. Le résultat est ordonné : degré 2, puis 1, puis 0.'},
    {f:'Contrôle avec <i>x</i> = 2 : (16 − 6 + 2) − (4 − 10 + 7) = 12 − 1 = 11 et 12 + 4 − 5 = 11 ✓',w:'Une valeur ne prouve pas l’équivalence, mais elle attrape la plupart des erreurs de signe.'}],
   conclusion:'(4<i>x</i>² − 3<i>x</i> + 2) − (<i>x</i>² − 5<i>x</i> + 7) = 3<i>x</i>² + 2<i>x</i> − 5.'},
  note:'<b>Piège :</b> 2<i>x</i> + 3 ne se réduit pas en 5<i>x</i>, et <i>x</i>² + <i>x</i> ne fait pas <i>x</i>³. Seuls les termes semblables se regroupent.'},
 {kind:'Pratique',h:'Réduis avec les tuiles',p:'Règle les curseurs pour que les tuiles montrent la forme réduite de (2<i>x</i>² + 3<i>x</i> + 1) − (<i>x</i>² + 5<i>x</i> − 4). Les tuiles rouges sont négatives.',
  params:[{id:'a',l:'Tuiles x²',min:-2,max:4,v:2},{id:'b',l:'Bandes x',min:-6,max:6,v:0},{id:'c',l:'Unités',min:-6,max:8,v:0}],
  draw:v=>tiles(v.a,v.b,v.c), info:v=>poly([v.a,v.b,v.c],LX),
  ok:v=>v.a===1&&v.b===-2&&v.c===5,
  why:'On change les signes de la 2e parenthèse : 2<i>x</i>² + 3<i>x</i> + 1 − <i>x</i>² − 5<i>x</i> + 4. Puis 2 − 1 = 1, 3 − 5 = −2, 1 + 4 = 5 : <i>x</i>² − 2<i>x</i> + 5.'},
 {kind:'Théorie',h:'Développer, c’est découper un rectangle',p:`<p>Une rampe de skate a une base rectangulaire de (<i>x</i> + 3) m sur (<i>x</i> + 2) m. Comment écrire son aire comme une somme, sans connaître <i>x</i>&nbsp;? On découpe le rectangle.</p>
<div class="def"><p><b>Distributivité</b> : <i>k</i>(<i>a</i> + <i>b</i>) = <i>ka</i> + <i>kb</i>. <b>Double distributivité</b> : (<i>a</i> + <i>b</i>)(<i>c</i> + <i>d</i>) = <i>ac</i> + <i>ad</i> + <i>bc</i> + <i>bd</i> : chaque terme de la première parenthèse multiplie chaque terme de la seconde. <b>Développer</b>, c’est transformer un produit en somme.</p></div>
<div class="why"><p>Un rectangle de hauteur <i>k</i> et de largeur <i>a</i> + <i>b</i> se coupe en deux rectangles d’aires <i>ka</i> et <i>kb</i>. Le rectangle de côtés (<i>x</i> + <i>b</i>) et (<i>x</i> + <i>d</i>) se coupe en quatre : <i>x</i>², <i>bx</i>, <i>dx</i> et <i>bd</i>. Les morceaux recouvrent tout le rectangle, quel que soit <i>x</i> : les deux écritures de l’aire sont donc toujours égales. Même idée pour 3<i>x</i> · 4<i>x</i> : ce rectangle contient 3 · 4 = 12 carrés <i>x</i>², donc 12<i>x</i>².</p></div>
<div class="ex"><p>(<i>x</i> + 3)(<i>x</i> + 2) = <i>x</i>² + 2<i>x</i> + 3<i>x</i> + 6 = <i>x</i>² + 5<i>x</i> + 6. Contrôle pour <i>x</i> = 4 : 7 · 6 = 42 et 16 + 20 + 6 = 42.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Il y a 2300 ans, Euclide et les Grecs faisaient déjà ce calcul… sans lettres ! Ils raisonnaient avec des rectangles découpés, exactement comme sur cette figure.</p></div>`,
  params:[{id:'x',l:'x',min:2,max:6,v:4},{id:'b',l:'b',min:1,max:4,v:3},{id:'d',l:'d',min:1,max:4,v:2}],
  draw:v=>cutRect(v.x,v.b,v.d),
  info:v=>`(<i>x</i> + ${v.b})(<i>x</i> + ${v.d}) = <i>x</i>² + ${v.b+v.d}<i>x</i> + ${v.b*v.d}. Pour <i>x</i> = ${v.x} : ${v.x+v.b} · ${v.x+v.d} = ${(v.x+v.b)*(v.x+v.d)} et ${v.x*v.x} + ${(v.b+v.d)*v.x} + ${v.b*v.d} = ${v.x*v.x+(v.b+v.d)*v.x+v.b*v.d}`},
 {kind:'Méthode',h:'Développer et réduire un produit',p:`<b>Quand :</b> une expression contient un produit avec une parenthèse, comme −2<i>x</i>(3<i>x</i> − 5) ou (<i>x</i> + 3)(2<i>x</i> − 1). <b>Pourquoi ça marche :</b> la distributivité, qu’on vient de voir avec les rectangles. <b>Comment :</b> 1) <b>monôme × monôme</b> : on multiplie les coefficients entre eux et les parties littérales entre elles ; les exposants d’une même lettre s’additionnent (<i>x</i> · <i>x</i>² = <i>x</i>³, la règle <i>a</i><sup><i>m</i></sup> · <i>a</i><sup><i>n</i></sup> = <i>a</i><sup><i>m</i>+<i>n</i></sup> des puissances) ; 2) <b>monôme × polynôme</b> : le monôme multiplie chaque terme, avec son signe ; 3) <b>polynôme × polynôme</b> : chaque terme de la première parenthèse multiplie chaque terme de la seconde, puis on réduit.`,
  demo:{enonce:'Développer et réduire : a) 3<i>x</i> · 4<i>x</i>² ; b) −2<i>x</i>(3<i>x</i> − 5) ; c) (<i>x</i> + 3)(2<i>x</i> − 1).',
   etapes:[
    {f:'a) 3<i>x</i> · 4<i>x</i>² = (3 · 4) · (<i>x</i> · <i>x</i>²) = 12<i>x</i>³',w:'Les coefficients : 3 · 4 = 12. Les lettres : <i>x</i>¹ · <i>x</i>² = <i>x</i>³.'},
    {f:'b) −2<i>x</i> · 3<i>x</i> + (−2<i>x</i>) · (−5) = −6<i>x</i>² + 10<i>x</i>',w:'−2<i>x</i> multiplie chaque terme. Règle des signes : (−) · (−) donne (+).'},
    {f:'c) <i>x</i> · 2<i>x</i> + <i>x</i> · (−1) + 3 · 2<i>x</i> + 3 · (−1)',w:'Quatre produits : chaque terme de (<i>x</i> + 3) avec chaque terme de (2<i>x</i> − 1).'},
    {f:'= 2<i>x</i>² − <i>x</i> + 6<i>x</i> − 3 = 2<i>x</i>² + 5<i>x</i> − 3',w:'On calcule chaque produit, puis on réduit les termes semblables : −<i>x</i> + 6<i>x</i> = 5<i>x</i>.'}],
   conclusion:'12<i>x</i>³ ; −6<i>x</i>² + 10<i>x</i> ; 2<i>x</i>² + 5<i>x</i> − 3. Contrôle de c) avec <i>x</i> = 1 : 4 · 1 = 4 et 2 + 5 − 3 = 4 ✓.'},
  note:'<b>Piège :</b> 3<i>x</i> + 4<i>x</i> = 7<i>x</i> (on additionne, la lettre reste <i>x</i>), mais 3<i>x</i> · 4<i>x</i> = 12<i>x</i>² (on multiplie, <i>x</i> · <i>x</i> = <i>x</i>²).'},
 {h:'À toi de développer',p:'Développe et réduis (2<i>x</i> − 3)(<i>x</i> + 4).',opts:['2<i>x</i>² − 12','2<i>x</i>² + 11<i>x</i> − 12','2<i>x</i>² + 5<i>x</i> − 12','2<i>x</i>² + 5<i>x</i> + 12'],ans:2,
  why:'2<i>x</i> · <i>x</i> + 2<i>x</i> · 4 − 3 · <i>x</i> − 3 · 4 = 2<i>x</i>² + 8<i>x</i> − 3<i>x</i> − 12 = 2<i>x</i>² + 5<i>x</i> − 12.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Conventions</b> : 3<i>a</i> = 3 · <i>a</i>, <i>ab</i> = <i>a</i> · <i>b</i>, <i>a</i> · <i>a</i> = <i>a</i>², le nombre s’écrit en premier.</li>
<li><b>Valeur numérique</b> : remplacer chaque lettre (entre parenthèses si négative), puis respecter les priorités. Jamais de fausse égalité.</li>
<li><b>Traduire</b> : le dernier calcul donne le nom (somme, différence, produit, quotient). (<i>a</i> + <i>b</i>)² n’est pas <i>a</i>² + <i>b</i>².</li>
<li><b>Expressions équivalentes</b> : même résultat pour toutes les valeurs. Un contre-exemple suffit pour prouver le contraire.</li>
<li><b>Monôme</b> : coefficient × partie littérale ; degré = nombre de lettres multipliées. <b>Polynôme</b> : somme de monômes.</li>
<li><b>Réduire</b> : regrouper les termes semblables. Un − devant une parenthèse change tous les signes. <b>Ordonner</b> : degrés décroissants.</li>
<li><b>Développer</b> : <i>k</i>(<i>a</i> + <i>b</i>) = <i>ka</i> + <i>kb</i> et (<i>a</i> + <i>b</i>)(<i>c</i> + <i>d</i>) = <i>ac</i> + <i>ad</i> + <i>bc</i> + <i>bd</i>, comme l’aire d’un rectangle découpé.</li>
</ul></div>`},
 {kind:'Problème',h:'L’enclos des lapins',
  p:'Tu construis un enclos rectangulaire pour deux lapins. Sa longueur mesure <i>x</i> + 6 mètres et sa largeur <i>x</i> + 2 mètres. Le grillage coûte 12 CHF le mètre. Tu veux des formules qui marchent pour n’importe quelle valeur de <i>x</i>, puis les utiliser pour <i>x</i> = 4.',
  fig:cutRect(4,6,2),
  parts:[
   {q:'a) Quelle expression réduite donne le périmètre de l’enclos&nbsp;?',opts:['2<i>x</i> + 8','4<i>x</i> + 16','<i>x</i>² + 8<i>x</i> + 12','4<i>x</i> + 8'],ans:1,hint:'Périmètre = 2 · longueur + 2 · largeur. Développe, puis réduis.',why:'2(<i>x</i> + 6) + 2(<i>x</i> + 2) = 2<i>x</i> + 12 + 2<i>x</i> + 4 = 4<i>x</i> + 16.'},
   {q:'b) On développe l’aire (<i>x</i> + 6)(<i>x</i> + 2). Quel est le coefficient de <i>x</i>&nbsp;?',lab:'coefficient :',ans:8,hint:'Découpe le rectangle en quatre morceaux : <i>x</i>², 6<i>x</i>, 2<i>x</i> et 12.',why:'(<i>x</i> + 6)(<i>x</i> + 2) = <i>x</i>² + 2<i>x</i> + 6<i>x</i> + 12 = <i>x</i>² + 8<i>x</i> + 12.'},
   {q:'c) Calcule l’aire de l’enclos pour <i>x</i> = 4.',unit:'m²',ans:60,hint:'Remplace <i>x</i> par 4 dans <i>x</i>² + 8<i>x</i> + 12, ou directement dans (<i>x</i> + 6)(<i>x</i> + 2).',why:'4² + 8 · 4 + 12 = 16 + 32 + 12 = 60 m². Contrôle : 10 · 6 = 60.'},
   {q:'d) Combien coûte le grillage pour <i>x</i> = 4&nbsp;?',unit:'CHF',ans:384,hint:'Calcule d’abord le périmètre 4<i>x</i> + 16 pour <i>x</i> = 4.',why:'Périmètre : 4 · 4 + 16 = 32 m. Prix : 32 · 12 = 384 CHF.'}],
  sol:'Soit <i>x</i> un nombre positif. Périmètre : 2(<i>x</i> + 6) + 2(<i>x</i> + 2) = 4<i>x</i> + 16. Aire : (<i>x</i> + 6)(<i>x</i> + 2) = <i>x</i>² + 2<i>x</i> + 6<i>x</i> + 12 = <i>x</i>² + 8<i>x</i> + 12, ce que montre le rectangle découpé en quatre morceaux. Pour <i>x</i> = 4 : l’enclos mesure 10 m sur 6 m ; aire 16 + 32 + 12 = 60 m² ; périmètre 16 + 16 = 32 m ; grillage 32 · 12 = 384 CHF. Réponse : l’enclos a une aire de 60 m² et le grillage coûte 384 CHF.'},
 {kind:'Problème',h:'Le tour du calendrier',
  p:'Sur une page de calendrier, entoure un carré de 2 sur 2 cases, par exemple 3, 4, 10 et 11. Multiplie les deux nombres d’une diagonale (4 · 10), puis ceux de l’autre (3 · 11), et fais la différence. Ton ami annonce le résultat sans regarder ! Si le plus petit nombre du carré est <i>n</i>, les quatre nombres sont <i>n</i>, <i>n</i> + 1, <i>n</i> + 7 et <i>n</i> + 8, car une semaine a 7 jours.',
  fig:(()=>{ const P=plane({x:[0,7],y:[0,2.2],grid:false,axes:false}); const nums=[['n','n + 1'],['n + 7','n + 8']];
    for(let r=0;r<2;r++) for(let c=0;c<2;c++){ const x0=1.5+c*2, y0=1.1-r*1; P.rect(x0,y0,2,1,{fill:(r+c)%2?'var(--spark)':'var(--accent)',fo:.2,c:'var(--ink)',w:1.5}); P.text(x0+1,y0+.5,nums[r][c],{a:'middle',dy:5,s:13}); }
    return P.svg(); })(),
  parts:[
   {q:'a) Calcule 4 · 10 − 3 · 11.',ans:7,hint:'Effectue les deux produits avant la différence.',why:'40 − 33 = 7.'},
   {q:'b) Quelle expression réduite donne la somme des quatre nombres&nbsp;?',opts:['4<i>n</i> + 8','<i>n</i> + 16','4<i>n</i> + 16','4<i>n</i> + 15'],ans:2,hint:'Additionne les <i>n</i> ensemble et les nombres ensemble.',why:'<i>n</i> + (<i>n</i> + 1) + (<i>n</i> + 7) + (<i>n</i> + 8) = 4<i>n</i> + 16.'},
   {q:'c) Développe (<i>n</i> + 1)(<i>n</i> + 7).',opts:['<i>n</i>² + 7','<i>n</i>² + 8<i>n</i> + 7','<i>n</i>² + 7<i>n</i> + 8','2<i>n</i> + 8'],ans:1,hint:'Double distributivité : quatre produits, puis réduis.',why:'<i>n</i>² + 7<i>n</i> + <i>n</i> + 7 = <i>n</i>² + 8<i>n</i> + 7.'},
   {q:'d) Réduis (<i>n</i> + 1)(<i>n</i> + 7) − <i>n</i>(<i>n</i> + 8). Quel nombre obtiens-tu&nbsp;?',ans:7,hint:'<i>n</i>(<i>n</i> + 8) = <i>n</i>² + 8<i>n</i>. Attention au signe − devant ce produit.',why:'<i>n</i>² + 8<i>n</i> + 7 − <i>n</i>² − 8<i>n</i> = 7 : il ne reste aucun <i>n</i>.'},
   {q:'e) Pour le carré dont le plus petit nombre est 12, quelle est la somme des quatre nombres&nbsp;?',ans:64,hint:'Utilise la formule de la question b) avec <i>n</i> = 12.',why:'4 · 12 + 16 = 64. Contrôle : 12 + 13 + 19 + 20 = 64.'}],
  sol:'Les quatre nombres sont <i>n</i>, <i>n</i> + 1, <i>n</i> + 7 et <i>n</i> + 8. Somme : 4<i>n</i> + 16. Produits des diagonales : (<i>n</i> + 1)(<i>n</i> + 7) = <i>n</i>² + 8<i>n</i> + 7 et <i>n</i>(<i>n</i> + 8) = <i>n</i>² + 8<i>n</i>. Leur différence vaut <i>n</i>² + 8<i>n</i> + 7 − <i>n</i>² − 8<i>n</i> = 7, quel que soit <i>n</i>. Voilà le secret du tour : la réponse est toujours 7. Le calcul littéral prouve ce que les essais (40 − 33 = 7) laissaient seulement deviner.'},
]},

/* ===================== FONCTIONS ===================== */
{subj:'sec', sem:'a10', o:9, id:'sec10-fonctions', h:'Fonctions', p:'Machine, tableau, graphique et expression : les fonctions x ↦ ax + b et x ↦ ax², la pente, puis la proportionnalité en action (cartes, pourcentages, routes, diagrammes).', steps:[
 {kind:'Théorie',h:'Une fonction, c’est une machine',p:`<p>Sur une appli de musique, tu paies 1 CHF d’inscription, puis 2 CHF par album. Pour 3 albums : 2 · 3 + 1 = 7 CHF. Chaque nombre d’albums donne un seul prix : c’est une fonction.</p>
<div class="def"><p>Une <b>fonction</b> est une machine qui, à chaque nombre <i>x</i> qu’on y entre, associe <b>un seul</b> nombre de sortie, appelé l’<b>image</b> de <i>x</i>. Si la fonction s’appelle <i>f</i>, l’image de <i>x</i> se note <i>f</i>(<i>x</i>) et se lit « <i>f</i> de <i>x</i> ». On écrit <i>f</i> : <i>x</i> ↦ 2<i>x</i> + 1, qui se lit « <i>f</i> associe à <i>x</i> le nombre 2<i>x</i> + 1 », ou bien <i>f</i>(<i>x</i>) = 2<i>x</i> + 1.</p></div>
<div class="idea"><p>Une même fonction se décrit de quatre façons : la <b>machine</b> en mots (« multiplie par 2, puis ajoute 1 »), l’<b>expression</b> 2<i>x</i> + 1, le <b>tableau de valeurs</b> et le <b>graphique</b>, où chaque couple (<i>x</i> ; <i>f</i>(<i>x</i>)) devient un point. Bouge le curseur : le nombre entre dans la machine, ressort, et le point se place.</p></div>
<div class="ex"><p><i>f</i>(3) = 2 · 3 + 1 = 7 : le point (3 ; 7) est sur le graphique. <i>f</i>(−2) = 2 · (−2) + 1 = −3 : le point (−2 ; −3) aussi.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>La notation <i>f</i>(<i>x</i>) a été inventée en 1734 par le Suisse Leonhard Euler, né à Bâle. C’est l’un des mathématiciens les plus productifs de l’histoire.</p></div>`,
  params:[{id:'x',l:'x',min:-3,max:3,step:.5,v:1}],
  draw:v=>{ const y=2*v.x+1, P=grf({x:[-4,4],y:[-6,8],h:260,ly:2});
    P.fn(t=>2*t+1,{c:'var(--accent)',op:.5}); P.seg(v.x,0,v.x,y,{c:'var(--math)',w:1.5,dash:true}).seg(0,y,v.x,y,{c:'var(--spark)',w:1.5,dash:true});
    P.dot(v.x,y,{l:`(${fmt(v.x)} ; ${fmt(y)})`});
    return machine(v.x,y,'× 2 puis + 1')+P.svg(); },
  info:v=>`<i>f</i>(${fmt(v.x)}) = 2 · ${v.x<0?'('+fmt(v.x)+')':fmt(v.x)} + 1 = ${fmt(2*v.x+1)}`},
 {kind:'Méthode',h:'Faire le tableau de valeurs et le graphique',p:`<b>Quand :</b> on connaît l’expression d’une fonction et on veut voir son allure. <b>Pourquoi ça marche :</b> chaque colonne du tableau est un couple (<i>x</i> ; <i>f</i>(<i>x</i>)), donc un point du graphique. <b>Comment :</b> 1) choisis quelques valeurs de <i>x</i> : des négatives, 0, des positives ; 2) calcule chaque image en remplaçant <i>x</i> (entre parenthèses s’il est négatif) ; 3) range les résultats dans un tableau à deux lignes ; 4) place les points : <i>x</i> sur l’axe horizontal, <i>f</i>(<i>x</i>) sur l’axe vertical ; 5) relie-les si les valeurs entre deux points ont un sens (pour des albums, on ne relie pas : on n’achète pas un demi-album).`,
  fig:(()=>{ const P=grf({x:[-3,5],y:[-4,8],h:260,ly:2}); P.fn(t=>4-2*t,{c:'var(--accent)'});
    [-1,0,1,2,3].forEach(t=>P.dot(t,4-2*t)); P.text(3,-2,'g',{dx:10,dy:-4,c:'var(--accent)'}); return P.svg(); })(),
  demo:{enonce:'Faire le tableau de valeurs et le graphique de <i>g</i> : <i>x</i> ↦ 4 − 2<i>x</i>, pour <i>x</i> allant de −1 à 3.',
   etapes:[
    {f:'<i>g</i>(−1) = 4 − 2 · (−1) = 4 + 2 = 6',w:'On remplace <i>x</i> par −1, entre parenthèses. Moins par moins donne plus.'},
    {f:'<i>g</i>(0) = 4 ; <i>g</i>(1) = 2 ; <i>g</i>(2) = 0 ; <i>g</i>(3) = −2',w:'Même calcul pour chaque valeur.'},
    {f:tab([['<i>x</i>','−1','0','1','2','3'],['<i>g</i>(<i>x</i>)','6','4','2','0','−2']]),w:'Le tableau range les résultats : la 1re ligne pour <i>x</i>, la 2e pour les images.'},
    {f:'Points (−1 ; 6), (0 ; 4), (1 ; 2), (2 ; 0), (3 ; −2)',w:'Chaque colonne donne un point. Ici, ils sont alignés : on trace la droite qui les relie.'}],
   conclusion:'Le graphique de <i>g</i> est la droite de la figure. Pour lire une image sur un graphique : pars de <i>x</i> sur l’axe horizontal, va verticalement jusqu’à la courbe, puis lis la hauteur sur l’axe vertical.'}},
 {kind:'Pratique',h:'Place le point',p:'Pour la fonction <i>f</i> : <i>x</i> ↦ 3<i>x</i> − 2, calcule l’image de −1, puis place avec les curseurs le point du graphique qui correspond à <i>x</i> = −1.',
  params:[{id:'px',l:'abscisse (horizontal)',min:-4,max:4,v:1},{id:'py',l:'ordonnée (vertical)',min:-8,max:8,v:1}],
  draw:v=>{ const P=grf({x:[-5,5],y:[-9,9],h:300,ly:2}); P.seg(v.px,0,v.px,v.py,{c:'var(--muted)',w:1,dash:true}).seg(0,v.py,v.px,v.py,{c:'var(--muted)',w:1,dash:true}); P.dot(v.px,v.py,{l:`(${fmt(v.px)} ; ${fmt(v.py)})`}); return P.svg(); },
  info:v=>`Point (${fmt(v.px)} ; ${fmt(v.py)})`,
  ok:v=>v.px===-1&&v.py===-5,
  why:'<i>f</i>(−1) = 3 · (−1) − 2 = −3 − 2 = −5 : le point est (−1 ; −5), 1 vers la gauche et 5 vers le bas.'},
 {kind:'Théorie',h:'La famille x ↦ ax + b',p:`<p>Un taxi demande 6 CHF de prise en charge, puis 2 CHF par kilomètre : pour <i>x</i> km, tu paies 2<i>x</i> + 6. Un autre taxi a d’autres tarifs. Comment les nombres 2 et 6 changent-ils le graphique&nbsp;?</p>
<div class="def"><p>Une fonction <b>affine</b> s’écrit <i>x</i> ↦ <i>ax</i> + <i>b</i>. Son graphique est une <b>droite</b>. Le nombre <i>a</i> est la <b>pente</b> : quand <i>x</i> augmente de 1, l’image change de <i>a</i>. Le nombre <i>b</i> est l’<b>ordonnée à l’origine</b> : <i>f</i>(0) = <i>b</i>, la droite coupe l’axe vertical à la hauteur <i>b</i>.</p></div>
<div class="prop"><p>Deux cas particuliers. Si <i>b</i> = 0, <i>x</i> ↦ <i>ax</i> est <b>linéaire</b> : sa droite passe par l’origine (0 ; 0). C’est la <b>proportionnalité</b> que tu connais : on multiplie toujours par le même nombre <i>a</i>. Si <i>a</i> = 0, <i>x</i> ↦ <i>b</i> est <b>constante</b> : toutes les images valent <i>b</i>, la droite est horizontale.</p></div>
<div class="idea"><p>Bouge <i>a</i> : la droite tourne autour du point (0 ; <i>b</i>). Si <i>a</i> &gt; 0 elle monte, si <i>a</i> &lt; 0 elle descend, et plus <i>a</i> est loin de 0, plus elle est raide. Bouge <i>b</i> : la droite glisse vers le haut ou le bas sans tourner. Le petit escalier montre « 1 vers la droite, <i>a</i> vers le haut ».</p></div>
<div class="ex"><p><i>x</i> ↦ 2<i>x</i> − 3 : <i>f</i>(0) = −3, <i>f</i>(1) = −1, <i>f</i>(2) = 1. Chaque pas de 1 vers la droite fait monter de 2.</p></div>`,
  params:[{id:'a',l:'a (pente)',min:-3,max:3,step:.5,v:2},{id:'b',l:'b (ordonnée à l’origine)',min:-4,max:4,v:-3}],
  draw:v=>{ const P=grf(); P.fn(t=>v.a*t+v.b,{c:'var(--accent)'});
    P.seg(0,v.b,1,v.b,{c:'var(--spark)',w:2.5}); if(v.a) P.seg(1,v.b,1,v.b+v.a,{c:'var(--spark)',w:2.5}).text(1,v.b+v.a/2,fmt(v.a),{dx:6,dy:4,s:12,c:'var(--spark)'});
    P.dot(0,v.b,{c:'var(--math)'}); return P.svg(); },
  info:v=>`<i>f</i>(<i>x</i>) = ${lin(v.a,v.b)} : ${v.a===0?'fonction constante':v.b===0?'fonction linéaire (proportionnalité)':'fonction affine'}`},
 {kind:'Méthode',h:'Lire la pente et l’ordonnée à l’origine',p:`<b>Quand :</b> on a le graphique d’une droite et on cherche son expression <i>x</i> ↦ <i>ax</i> + <i>b</i>. <b>Pourquoi ça marche :</b> <i>b</i> = <i>f</i>(0) se lit là où la droite coupe l’axe vertical, et <i>a</i> est le changement de hauteur pour un pas de 1 vers la droite. <b>Comment :</b> 1) lis <i>b</i> sur l’axe vertical ; 2) choisis deux points de la droite placés sur des croisements du quadrillage ; 3) compte le déplacement horizontal et le déplacement vertical entre eux ; 4) <i>a</i> = déplacement vertical : déplacement horizontal (négatif si la droite descend) ; 5) écris <i>f</i>(<i>x</i>) = <i>ax</i> + <i>b</i> et vérifie avec un autre point.`,
  fig:(()=>{ const P=grf(); P.fn(t=>2*t-1,{c:'var(--accent)'}); P.seg(0,-1,2,-1,{c:'var(--spark)',w:2.5}).seg(2,-1,2,3,{c:'var(--spark)',w:2.5});
    P.text(1,-1,'2',{a:'middle',dy:16,s:12,c:'var(--spark)'}).text(2,1,'4',{dx:6,dy:4,s:12,c:'var(--spark)'}); P.dot(0,-1,{c:'var(--math)'}).dot(2,3); return P.svg(); })(),
  demo:{enonce:'Trouver l’expression de la fonction affine dont la droite est dessinée.',
   etapes:[
    {f:'<i>b</i> = −1',w:'La droite coupe l’axe vertical au point (0 ; −1).'},
    {f:'De (0 ; −1) à (2 ; 3) : 2 vers la droite, 4 vers le haut',w:'On choisit deux points bien placés sur le quadrillage.'},
    {f:'<i>a</i> = 4 : 2 = 2',w:'Pour un pas de 1 vers la droite, la droite monte de 2.'},
    {f:'<i>f</i>(<i>x</i>) = 2<i>x</i> − 1. Contrôle : <i>f</i>(1) = 1, et le point (1 ; 1) est bien sur la droite ✓',w:'On vérifie toujours avec un troisième point.'}],
   conclusion:'La droite est le graphique de <i>x</i> ↦ 2<i>x</i> − 1.'},
  note:'Si la droite descend de gauche à droite, la pente est négative : 1 vers la droite, 3 vers le bas, donne <i>a</i> = −3.'},
 {kind:'Pratique',h:'Retrouve la droite',p:'Règle <i>a</i> et <i>b</i> pour que ta droite (en couleur) se pose exactement sur la droite pointillée.',
  params:[{id:'a',l:'a (pente)',min:-3,max:3,step:.5,v:1},{id:'b',l:'b (ordonnée à l’origine)',min:-4,max:4,v:0}],
  draw:v=>{ const P=grf(); P.fn(t=>-2*t+3,{c:'var(--muted)',dash:true,w:3}); P.fn(t=>v.a*t+v.b,{c:'var(--accent)'}); P.dot(0,v.b,{c:'var(--math)'}); return P.svg(); },
  info:v=>`Ta droite : <i>x</i> ↦ ${lin(v.a,v.b)}`,
  ok:v=>v.a===-2&&v.b===3,
  why:'La droite pointillée coupe l’axe vertical en 3, donc <i>b</i> = 3. De (0 ; 3) à (1 ; 1), elle descend de 2 pour 1 vers la droite : <i>a</i> = −2. C’est <i>x</i> ↦ −2<i>x</i> + 3.'},
 {kind:'Défi',h:'Quel abonnement choisir ?',p:'Pour louer des films, l’offre A coûte 20 CHF par mois plus 2 CHF par film. L’offre B coûte 5 CHF par film, sans abonnement. À partir de combien de films par mois l’offre A devient-elle moins chère que l’offre B&nbsp;?',lab:'nombre de films :',ans:7,
  why:'Fais un tableau. 6 films : A = 20 + 12 = 32, B = 30, B gagne. 7 films : A = 20 + 14 = 34, B = 35, A gagne. Dès 7 films, A est moins chère. Ici, faire un tableau de valeurs marche bien ; sur un graphique, c’est là que les droites se croisent.'},
 {kind:'Théorie',h:'La parabole x ↦ ax²',p:`<p>Lâche une bille du haut d’une tour : après <i>t</i> secondes, elle est tombée d’environ 5<i>t</i>² mètres. En 1 s, 5 m ; en 2 s, 20 m ; en 3 s, 45 m. Les distances ne grandissent pas régulièrement : ce n’est pas une droite.</p>
<div class="def"><p>Pour un nombre <i>a</i> non nul, la fonction <i>x</i> ↦ <i>ax</i>² a pour graphique une <b>parabole</b>. Son <b>sommet</b> est l’origine (0 ; 0) et l’axe vertical est son <b>axe de symétrie</b>.</p></div>
<div class="why"><p>La symétrie vient de (−<i>x</i>)² = <i>x</i>² : un nombre et son opposé ont la même image, par exemple <i>f</i>(−3) = <i>f</i>(3). Sur la figure, les deux points ont toujours la même hauteur.</p></div>
<div class="idea"><p>Si <i>a</i> &gt; 0, la parabole est ouverte vers le haut, comme un U ; si <i>a</i> &lt; 0, vers le bas. Plus <i>a</i> est loin de 0, plus elle est étroite. Bouge les curseurs pour le voir.</p></div>
<div class="ex"><p><i>f</i>(<i>x</i>) = 2<i>x</i>² : <i>f</i>(0) = 0, <i>f</i>(1) = 2, <i>f</i>(2) = 8, <i>f</i>(3) = 18 et <i>f</i>(−2) = 8. Quand <i>x</i> double, l’image est multipliée par 4 : ce n’est pas de la proportionnalité.</p></div>
<div class="warn"><p>−2<i>x</i>² pour <i>x</i> = 3 vaut −2 · 9 = −18, pas (−6)² = 36. Le carré se calcule avant la multiplication.</p></div>`,
  params:[{id:'a',l:'a',min:-3,max:3,step:.5,v:1},{id:'x',l:'x',min:0,max:3,step:.5,v:2}],
  draw:v=>{ const P=grf({x:[-4,4],y:[-10,10],h:300,ly:2}); const y=v.a*v.x*v.x;
    P.fn(t=>v.a*t*t,{c:'var(--accent)'}); P.seg(-v.x,y,v.x,y,{c:'var(--spark)',w:1.5,dash:true});
    P.dot(v.x,y,{l:`(${fmt(v.x)} ; ${fmt(y)})`}).dot(-v.x,y,{c:'var(--math)'}); return P.svg(); },
  info:v=>v.a===0?'<i>a</i> = 0 : <i>f</i>(<i>x</i>) = 0 pour tout <i>x</i>, ce n’est plus une parabole mais l’axe horizontal.':`<i>f</i>(${fmt(v.x)}) = <i>f</i>(−${fmt(v.x)}) = ${fmt(v.a)} · ${fmt(v.x*v.x)} = ${fmt(v.a*v.x*v.x)}`},
 {h:'Sur la parabole ?',p:'Lequel de ces points est sur le graphique de <i>f</i> : <i>x</i> ↦ 2<i>x</i>²&nbsp;?',opts:['(3 ; 12)','(−3 ; −18)','(3 ; 18)','(2 ; 16)'],ans:2,
  why:'<i>f</i>(3) = 2 · 3² = 2 · 9 = 18, donc (3 ; 18). Par symétrie <i>f</i>(−3) = 18 aussi, pas −18. Et <i>f</i>(2) = 2 · 4 = 8, pas 16.'},
 {kind:'Méthode',h:'Échelle de carte et pente d’une route',p:`<p>Sur une carte au <b>1 : 25 000</b>, 1 cm représente 25 000 cm, soit 250 m, dans la réalité. Un panneau « <b>10 %</b> » au bord d’une route veut dire que la route monte de 10 m pour 100 m parcourus à l’horizontale. Ce sont deux <b>proportionnalités</b> : on multiplie toujours par le même nombre, comme avec une fonction linéaire <i>x</i> ↦ <i>ax</i>.</p><p><b>Comment :</b> 1) échelle 1 : <i>n</i> : distance réelle = <i>n</i> · distance sur la carte (et distance sur la carte = distance réelle : <i>n</i>) ; 2) travaille dans une seule unité, puis convertis (100 cm = 1 m, 1000 m = 1 km) ; 3) pente de <i>p</i> % : montée = <i>p</i>/100 · distance horizontale ; 4) pente en % = montée : distance horizontale · 100, les deux dans la même unité.</p><div class="blk" data-t="Le savais-tu ?"><p>Le train à crémaillère du Pilate, près de Lucerne, grimpe avec une pente allant jusqu’à 48 % : presque un demi-mètre de montée par mètre d’horizontale. C’est le plus raide du monde.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,10],y:[0,3.6],grid:false,axes:false});
    P.poly([[.3,.5],[8.4,.5],[8.4,2.3]],{fill:'var(--sci)',fo:.25,c:'var(--ink)',w:2});
    P.text(4.4,.5,'100 m à l’horizontale',{a:'middle',dy:16,s:12}).text(8.4,1.4,'10 m',{dx:6,dy:4,s:12}).text(4,1.6,'pente 10 %',{a:'middle',s:13,c:'var(--accent)'});
    return P.svg(); })(),
  demo:{enonce:'a) Sur une carte au 1 : 25 000, deux refuges sont à 6 cm l’un de l’autre. Quelle est la distance réelle&nbsp;? b) Une route de pente 8 % parcourt 1,5 km à l’horizontale. De combien monte-t-elle&nbsp;? c) Une rampe monte de 0,6 m sur 5 m d’horizontale. Quelle est sa pente&nbsp;?',
   etapes:[
    {f:'a) 6 · 25 000 = 150 000 cm = 1500 m = 1,5 km',w:'Chaque cm de la carte vaut 25 000 cm en vrai. On convertit : 100 cm = 1 m, 1000 m = 1 km.'},
    {f:'b) 1,5 km = 1500 m et 8 % de 1500 m : 0,08 · 1500 = 120 m',w:'8 % veut dire 8 m de montée pour 100 m d’horizontale : on multiplie par 8/100 = 0,08.'},
    {f:'c) 0,6 : 5 = 0,12 = 12 %',w:'Pente = montée : distance horizontale, les deux en mètres. On écrit le résultat en pour cent.'}],
   conclusion:'1,5 km ; 120 m ; 12 %. Rédige toujours ainsi : une phrase, le calcul, la réponse avec l’unité.'}},
 {h:'À toi : la carte de randonnée',p:'Sur une carte au 1 : 50 000, un sentier mesure 7 cm. Quelle est sa longueur réelle en kilomètres&nbsp;?',unit:'km',ans:3.5,tol:0.001,
  why:'7 · 50 000 = 350 000 cm = 3500 m = 3,5 km.'},
 {kind:'Méthode',h:'Augmenter ou baisser d’un pourcentage',p:`<p><b>Quand :</b> soldes, rabais, hausse d’un prix ou d’un salaire. <b>Pourquoi ça marche :</b> baisser de 20 %, c’est garder 100 % − 20 % = 80 % du prix, donc multiplier par 0,8. Augmenter de 15 %, c’est passer à 115 %, donc multiplier par 1,15. Le nouveau prix est une fonction linéaire de l’ancien : <i>x</i> ↦ 0,8<i>x</i> ou <i>x</i> ↦ 1,15<i>x</i> (les deux droites de la figure). Rappel : <i>p</i> % d’une quantité, c’est <i>p</i>/100 fois cette quantité.</p><p><b>Comment :</b> 1) trouve le <b>coefficient multiplicateur</b> : 1 + <i>p</i>/100 pour une hausse, 1 − <i>p</i>/100 pour une baisse ; 2) multiplie l’ancien prix par ce coefficient ; 3) pour enchaîner deux changements, multiplie par les deux coefficients.</p>`,
  fig:(()=>{ const P=grf({x:[-10,110],y:[-15,135],lx:20,ly:20,step:10,h:300}); P.fn(t=>.8*t,{from:0,c:'var(--ok)'}).fn(t=>1.15*t,{from:0,c:'var(--bad)'});
    P.text(100,80,'× 0,8',{dx:-8,dy:18,a:'end',c:'var(--ok)'}).text(95,109,'× 1,15',{dx:-8,dy:-4,a:'end',c:'var(--bad)'}); return P.svg(); })(),
  demo:{enonce:'a) Un jeu vidéo à 75 CHF est soldé à −20 %. b) Un abonnement à 40 CHF augmente de 15 %. c) Un prix baisse de 20 %, puis remonte de 20 %. Revient-il au prix de départ&nbsp;?',
   etapes:[
    {f:'a) 75 · 0,8 = 60 CHF',w:'Rabais de 20 % : on paie 80 % du prix. Vérification : le rabais vaut 0,2 · 75 = 15 CHF et 75 − 15 = 60.'},
    {f:'b) 40 · 1,15 = 46 CHF',w:'Hausse de 15 % : le nouveau prix vaut 115 % de l’ancien.'},
    {f:'c) Avec 100 CHF : 100 · 0,8 = 80, puis 80 · 1,2 = 96',w:'La hausse de 20 % se calcule sur 80 CHF, pas sur 100 : elle rapporte seulement 16 CHF.'}],
   conclusion:'60 CHF ; 46 CHF ; non : −20 % puis +20 %, c’est × 0,8 · 1,2 = × 0,96, soit 96 % du prix de départ.'}},
 {h:'À toi : les soldes',p:'Une veste coûte 120 CHF. Elle est soldée à −35 %. Quel est son nouveau prix&nbsp;?',unit:'CHF',ans:78,
  why:'On paie 100 % − 35 % = 65 % : 120 · 0,65 = 78 CHF. Le rabais vaut 42 CHF.'},
 {kind:'Méthode',h:'Lire et construire un diagramme',p:`<p>Un <b>diagramme en barres</b> montre des effectifs par la hauteur des barres : on lit la hauteur sur l’axe gradué. Un <b>diagramme circulaire</b> montre comment un tout se partage : chaque part est un secteur du disque. L’angle du secteur est <b>proportionnel</b> à l’effectif, car le disque entier (360°) représente le total.</p><p><b>Comment construire un diagramme circulaire :</b> 1) calcule le total ; 2) pour chaque catégorie, calcule sa part : effectif : total ; 3) angle = part · 360° ; 4) vérifie que les angles font 360° au total, puis trace au rapporteur.</p><div class="blk" data-t="Le savais-tu ?"><p>L’Écossais William Playfair a inventé le diagramme en barres en 1786 et le diagramme circulaire en 1801. Avant lui, les données ne se présentaient qu’en tableaux.</p></div>`,
  fig:pie([['football',14,'var(--math)'],['natation',10,'var(--accent)'],['basket',6,'var(--spark)'],['escalade',10,'var(--ok)']])+bars([['foot',14],['natation',10],['basket',6],['escalade',10]],16,4),
  demo:{enonce:'On a demandé à 40 jeunes leur sport préféré : football 14, natation 10, basket 6, escalade 10. Construire le diagramme circulaire.',
   etapes:[
    {f:'Total : 14 + 10 + 6 + 10 = 40',w:'Le total correspond au disque entier, 360°.'},
    {f:'Football : 14 : 40 = 0,35 ; angle 0,35 · 360° = 126°',w:'La part du football est 35 % : son secteur fait 35 % du tour.'},
    {f:'Natation et escalade : 10 : 40 = 0,25, soit 90° chacune ; basket : 6 : 40 = 0,15, soit 54°',w:'Même calcul pour chaque sport.'},
    {f:'126° + 90° + 54° + 90° = 360° ✓',w:'Les angles doivent faire un tour complet : c’est le contrôle.'}],
   conclusion:'Le diagramme a quatre secteurs de 126°, 90°, 54° et 90°. Le diagramme en barres montre les mêmes données par des hauteurs.'}},
 {h:'À toi : le diagramme circulaire',p:'Dans un sondage auprès de 60 jeunes, 18 préfèrent le cinéma. Quel angle faut-il donner au secteur « cinéma » dans un diagramme circulaire&nbsp;?',unit:'°',ans:108,
  why:'La part est 18 : 60 = 0,3. Angle : 0,3 · 360° = 108°.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Fonction</b> : à chaque <i>x</i>, une seule image <i>f</i>(<i>x</i>). Quatre façons de la décrire : machine, expression, tableau, graphique (points (<i>x</i> ; <i>f</i>(<i>x</i>))).</li>
<li><b>Affine</b> <i>x</i> ↦ <i>ax</i> + <i>b</i> : une droite ; <i>a</i> = pente (changement pour un pas de 1), <i>b</i> = ordonnée à l’origine (<i>f</i>(0)).</li>
<li><b>Linéaire</b> <i>x</i> ↦ <i>ax</i> : droite par l’origine, proportionnalité. <b>Constante</b> <i>x</i> ↦ <i>b</i> : droite horizontale.</li>
<li><b>Parabole</b> <i>x</i> ↦ <i>ax</i>² : sommet (0 ; 0), symétrique, ouverte vers le haut si <i>a</i> &gt; 0, vers le bas si <i>a</i> &lt; 0.</li>
<li><b>Échelle</b> 1 : <i>n</i> : réel = <i>n</i> · carte. <b>Pente</b> en % = montée : horizontale · 100.</li>
<li><b>Pourcentages</b> : hausse de <i>p</i> % → × (1 + <i>p</i>/100) ; baisse → × (1 − <i>p</i>/100).</li>
<li><b>Diagramme circulaire</b> : angle = effectif : total · 360°.</li>
</ul></div>`},
 {kind:'Problème',h:'La location de vélos',
  p:'Pour une balade, deux magasins louent des vélos. Le magasin A demande 4 CHF par heure : son prix est <i>A</i>(<i>x</i>) = 4<i>x</i> pour <i>x</i> heures. Le magasin B demande 6 CHF au départ, puis 2 CHF par heure : <i>B</i>(<i>x</i>) = 2<i>x</i> + 6. Les deux droites sont dessinées ci-dessous.',
  fig:(()=>{ const P=grf({x:[-.5,6.5],y:[-2,26],h:260,ly:4}); P.fn(t=>4*t,{from:0,c:'var(--accent)'}).fn(t=>2*t+6,{from:0,c:'var(--spark)'});
    P.text(6,24,'A',{dx:-14,c:'var(--accent)'}).text(6,18,'B',{dx:-4,dy:-8,c:'var(--spark)'}); return P.svg(); })(),
  parts:[
   {q:'a) Combien coûte une location de 5 heures chez A&nbsp;?',unit:'CHF',ans:20,hint:'Calcule <i>A</i>(5).',why:'<i>A</i>(5) = 4 · 5 = 20 CHF.'},
   {q:'b) Que représente le nombre 6 dans <i>B</i>(<i>x</i>) = 2<i>x</i> + 6&nbsp;?',opts:['Le prix par heure, c’est la pente','Un montant payé même pour 0 heure : l’ordonnée à l’origine','Le nombre d’heures de location','Le prix d’une location de 6 heures'],ans:1,hint:'Calcule <i>B</i>(0) et regarde où la droite B coupe l’axe vertical.',why:'<i>B</i>(0) = 6 : c’est un prix fixe, l’ordonnée à l’origine. La pente 2 est le prix par heure.'},
   {q:'c) Pour quelle durée les deux magasins coûtent-ils la même chose&nbsp;?',unit:'h',ans:3,hint:'Fais un tableau pour <i>x</i> = 1, 2, 3, 4, ou cherche où les droites se croisent.',why:'<i>A</i>(3) = 12 et <i>B</i>(3) = 2 · 3 + 6 = 12. Avant 3 h, A est moins cher ; après, B est moins cher.'},
   {q:'d) Quatre amis louent chacun un vélo pendant 5 heures chez B. Le magasin fait 25 % de rabais sur le total. Combien paient-ils en tout&nbsp;?',unit:'CHF',ans:48,hint:'Calcule <i>B</i>(5), multiplie par 4, puis applique le coefficient d’une baisse de 25 %.',why:'<i>B</i>(5) = 16 CHF par vélo, 4 · 16 = 64 CHF, puis 64 · 0,75 = 48 CHF.'}],
  sol:'A est une fonction linéaire (proportionnalité, droite par l’origine) ; B est affine, de pente 2 et d’ordonnée à l’origine 6, son prix fixe. A(5) = 20 CHF. Les prix sont égaux pour 3 heures : A(3) = B(3) = 12 CHF, c’est le point où les droites se croisent. Pour 5 heures, B est plus avantageux : B(5) = 16 CHF par vélo. Pour quatre vélos : 4 · 16 = 64 CHF, et avec 25 % de rabais on paie 75 % : 64 · 0,75 = 48 CHF. Réponse : les quatre amis paient 48 CHF.'},
 {kind:'Problème',h:'L’ascension du col',
  p:'Tu prépares une montée à vélo vers un col. Sur ta carte au 1 : 50 000, la route mesure 9 cm. Un panneau annonce une pente moyenne de 7 %. Le départ est à 1200 m d’altitude. On considère que la distance mesurée sur la carte est la distance horizontale.',
  fig:(()=>{ const P=plane({x:[0,10],y:[0,3.4],grid:false,axes:false});
    P.poly([[.5,.6],[9.5,.6],[9.5,2.6]],{fill:'var(--ok)',fo:.25,c:'var(--ink)',w:2}); P.dot(.5,.6,{l:'départ 1200 m',dx:4,dy:-12}).dot(9.5,2.6,{l:'col',dx:-30,dy:-10});
    P.text(5,.6,'distance horizontale',{a:'middle',dy:16,s:12}).text(5,1.8,'pente 7 %',{a:'middle',s:13,c:'var(--accent)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la distance horizontale réelle de la montée&nbsp;?',unit:'km',ans:4.5,tol:0.001,hint:'1 cm sur la carte représente 50 000 cm en vrai.',why:'9 · 50 000 = 450 000 cm = 4500 m = 4,5 km.'},
   {q:'b) De combien de mètres la route monte-t-elle en tout&nbsp;?',unit:'m',ans:315,hint:'7 % de la distance horizontale, en mètres.',why:'0,07 · 4500 = 315 m.'},
   {q:'c) Quelle fonction donne l’altitude <i>h</i>(<i>d</i>) après <i>d</i> mètres à l’horizontale&nbsp;?',opts:['<i>h</i>(<i>d</i>) = 1200<i>d</i> + 0,07','<i>h</i>(<i>d</i>) = 7<i>d</i> + 1200','<i>h</i>(<i>d</i>) = 0,07<i>d</i> + 1200','<i>h</i>(<i>d</i>) = 0,07(<i>d</i> + 1200)'],ans:2,hint:'On part de 1200 m (ordonnée à l’origine), et chaque mètre d’horizontale fait monter de 0,07 m (pente).',why:'Fonction affine : pente 0,07 m par mètre, ordonnée à l’origine 1200 m. Donc <i>h</i>(<i>d</i>) = 0,07<i>d</i> + 1200.'},
   {q:'d) À quelle altitude es-tu après 3 km à l’horizontale&nbsp;?',unit:'m',ans:1410,hint:'Attention aux unités : <i>d</i> est en mètres.',why:'<i>h</i>(3000) = 0,07 · 3000 + 1200 = 210 + 1200 = 1410 m.'},
   {q:'e) Quelle est l’altitude du col&nbsp;?',unit:'m',ans:1515,hint:'Le col est au bout des 4,5 km.',why:'<i>h</i>(4500) = 315 + 1200 = 1515 m.'}],
  sol:'Échelle : 9 cm sur la carte représentent 9 · 50 000 = 450 000 cm = 4,5 km. Pente de 7 % : montée totale 0,07 · 4500 = 315 m. L’altitude est une fonction affine de la distance horizontale : <i>h</i>(<i>d</i>) = 0,07<i>d</i> + 1200 (pente 0,07, ordonnée à l’origine 1200). Après 3 km : <i>h</i>(3000) = 1410 m. Au col : <i>h</i>(4500) = 1515 m. Réponse : le col est à 1515 m d’altitude, 315 m au-dessus du départ.'},
]},

/* ===================== ÉQUATIONS ===================== */
{subj:'sec', sem:'a10', o:11, id:'sec10-equations', h:'Équations du premier degré', p:'Trouver l’inconnue avec une balance : règles d’équivalence, résolution pas à pas, parenthèses et fractions, puis mise en équation de vrais problèmes.', steps:[
 {kind:'Théorie',h:'Une équation, une inconnue, une solution',p:`<p>Sur la balance, 3 boîtes mystère de même masse et 2 poids de 1 kg équilibrent 11 poids de 1 kg. Combien pèse une boîte&nbsp;? Tu le trouves peut-être de tête : 3 kg. Pour des énigmes plus dures, les maths ont un outil : l’équation.</p>
<div class="def"><p>Une <b>équation</b> est une égalité qui contient une lettre, l’<b>inconnue</b>, par exemple 3<i>x</i> + 2 = 11. Ce qui est à gauche et à droite du signe = sont les deux <b>membres</b>. Une <b>solution</b> est un nombre qui, mis à la place de l’inconnue, rend l’égalité vraie. <b>Résoudre</b> une équation, c’est trouver toutes ses solutions.</p></div>
<div class="idea"><p>Une équation est une balance en équilibre : le membre de gauche sur le plateau de gauche, celui de droite sur l’autre. Avec <i>x</i> = 3, 3 · 3 + 2 = 11 : équilibre. Avec <i>x</i> = 4, 14 ≠ 11 : la balance penche.</p></div>
<div class="ex"><p><i>x</i> + 5 = 12 a pour solution 7. 2<i>x</i> = 18 a pour solution 9. 3<i>x</i> + 2 = 11 a pour solution 3.</p></div>
<div class="warn"><p>Une équation n’est vraie que pour certaines valeurs. Ce n’est pas comme deux expressions équivalentes (chapitre de calcul littéral), qui sont égales pour toutes les valeurs.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Vers l’an 820, à Bagdad, le savant al-Khwarizmi écrit un livre sur la résolution des équations. Son titre contient le mot « al-jabr », qui a donné notre mot <b>algèbre</b>. Et son nom a donné le mot <b>algorithme</b>.</p></div>`,
  fig:balance({x:3,u:2},{x:0,u:11},3)},
 {kind:'Méthode',h:'Vérifier qu’un nombre est solution',p:`<b>Quand :</b> on te propose un nombre, ou tu viens de résoudre une équation et tu veux contrôler. <b>Pourquoi ça marche :</b> c’est la définition : un nombre est solution s’il rend l’égalité vraie. <b>Comment :</b> 1) calcule le membre de gauche avec ce nombre ; 2) calcule le membre de droite, <b>séparément</b> ; 3) compare : s’ils sont égaux, le nombre est solution, sinon il ne l’est pas. On calcule chaque membre à part pour ne pas écrire de fausse égalité.`,
  demo:{enonce:'Les nombres 2 et 5 sont-ils solutions de 4<i>x</i> − 3 = 2<i>x</i> + 7&nbsp;?',
   etapes:[
    {f:'Pour <i>x</i> = 2 : à gauche 4 · 2 − 3 = 5 ; à droite 2 · 2 + 7 = 11',w:'On remplace <i>x</i> par 2 dans chaque membre, séparément.'},
    {f:'5 ≠ 11, donc 2 n’est pas solution',w:'La balance penche : les deux membres ne sont pas égaux.'},
    {f:'Pour <i>x</i> = 5 : à gauche 4 · 5 − 3 = 17 ; à droite 2 · 5 + 7 = 17',w:'Même travail avec 5.'},
    {f:'17 = 17, donc 5 est solution',w:'Les deux membres sont égaux : équilibre.'}],
   conclusion:'5 est solution de 4<i>x</i> − 3 = 2<i>x</i> + 7, mais 2 ne l’est pas.'}},
 {h:'Lequel est solution ?',p:'Quel nombre est solution de 3<i>x</i> − 4 = <i>x</i> + 6&nbsp;?',opts:['2','4','5','10'],ans:2,
  why:'Pour <i>x</i> = 5 : à gauche 15 − 4 = 11, à droite 5 + 6 = 11. Égalité. Pour <i>x</i> = 4 : 8 contre 10, ce n’est pas une solution.'},
 {kind:'Théorie',h:'La balance et les règles d’équivalence',p:`<p>Pour trouver la masse d’une boîte, on simplifie la balance pas à pas, sans jamais la déséquilibrer. Chaque geste donne une nouvelle équation, plus simple, qui a la même solution.</p>
<div class="prop"><p><b>Règles d’équivalence.</b> On obtient une équation qui a les mêmes solutions, une équation <b>équivalente</b>, si on : 1) <b>ajoute ou retire</b> le même nombre, ou le même terme comme <i>x</i>, aux deux membres ; 2) <b>multiplie ou divise</b> les deux membres par le même nombre <b>non nul</b>.</p></div>
<div class="why"><p>Une balance en équilibre le reste si on retire 1 kg de chaque côté. Elle le reste aussi si on partage chaque plateau en 3 tas égaux et qu’on garde un seul tas de chaque côté. Multiplier par 0 est interdit : on obtiendrait 0 = 0, vrai pour tous les nombres, et on perdrait l’information.</p></div>
<div class="ex"><p>4<i>x</i> + 1 = <i>x</i> + 10. On retire <i>x</i> : 3<i>x</i> + 1 = 10. On retire 1 : 3<i>x</i> = 9. On divise par 3 : <i>x</i> = 3.</p></div>
<div class="idea"><p>Avec le curseur, essaie différentes masses pour une boîte de la balance 4<i>x</i> + 1 = <i>x</i> + 10. Elle n’est en équilibre que pour <i>x</i> = 3.</p></div>`,
  params:[{id:'x',l:'masse d’une boîte x',min:0,max:6,step:.5,v:1}],
  draw:v=>balance({x:4,u:1},{x:1,u:10},v.x),
  info:v=>{ const g=4*v.x+1, d=v.x+10; return `À gauche : 4 · ${fmt(v.x)} + 1 = ${fmt(g)} ; à droite : ${fmt(v.x)} + 10 = ${fmt(d)}. ${g===d?'<b>Équilibre : x = 3 est la solution.</b>':g<d?'La balance penche à droite.':'La balance penche à gauche.'}`; }},
 {kind:'Pratique',h:'Simplifie la balance',p:'La balance représente 5<i>x</i> + 3 = 2<i>x</i> + 9. Retire le même nombre de boîtes et de poids des deux côtés, puis partage chaque plateau en tas égaux, jusqu’à ce qu’il reste <b>une seule boîte à gauche</b> et seulement des poids à droite.',
  params:[{id:'k',l:'boîtes retirées de chaque côté',min:0,max:2,v:0},{id:'m',l:'poids retirés de chaque côté',min:0,max:3,v:0},{id:'d',l:'partager chaque plateau en … tas égaux',min:1,max:3,v:1}],
  draw:v=>{ const L={x:5-v.k,u:3-v.m}, R={x:2-v.k,u:9-v.m}; const ok=[L.x,L.u,R.x,R.u].every(n=>n%v.d===0);
    return ok?balance({x:L.x/v.d,u:L.u/v.d},{x:R.x/v.d,u:R.u/v.d},2):balance(L,R,2); },
  info:v=>{ const L={x:5-v.k,u:3-v.m}, R={x:2-v.k,u:9-v.m}; const ok=[L.x,L.u,R.x,R.u].every(n=>n%v.d===0);
    if(!ok) return `${side(L)} = ${side(R)} : impossible de partager chaque plateau en ${v.d} tas égaux. Simplifie d’abord.`;
    const L2={x:L.x/v.d,u:L.u/v.d}, R2={x:R.x/v.d,u:R.u/v.d}; return `Équation : ${side(L2)} = ${side(R2)}`; },
  ok:v=>v.k===2&&v.m===3&&v.d===3,
  why:'On retire 2 boîtes de chaque côté : 3<i>x</i> + 3 = 9. On retire 3 poids : 3<i>x</i> = 6. On partage en 3 : <i>x</i> = 2. Une boîte pèse 2.'},
 {kind:'Méthode',h:'Résoudre une équation pas à pas',p:`<b>Quand :</b> l’inconnue apparaît sans carré, dans un membre ou dans les deux. <b>Pourquoi ça marche :</b> chaque étape applique une règle d’équivalence, donc la solution ne change pas. <b>Comment :</b> 1) regroupe les termes en <i>x</i> dans un membre, en ajoutant ou retirant le même terme des deux côtés ; 2) regroupe les nombres dans l’autre membre ; 3) divise les deux membres par le coefficient de <i>x</i> ; 4) vérifie la solution dans l’équation de départ ; 5) conclus par une phrase. On dit souvent « faire passer de l’autre côté en changeant le signe » : c’est un raccourci de la règle 1.`,
  demo:{enonce:'Résoudre 5<i>x</i> − 7 = 2<i>x</i> + 8.',
   etapes:[
    {f:'5<i>x</i> − 7 − 2<i>x</i> = 2<i>x</i> + 8 − 2<i>x</i>, soit 3<i>x</i> − 7 = 8',w:'On retire 2<i>x</i> aux deux membres : les <i>x</i> sont maintenant seulement à gauche.'},
    {f:'3<i>x</i> − 7 + 7 = 8 + 7, soit 3<i>x</i> = 15',w:'On ajoute 7 aux deux membres : il ne reste que le terme en <i>x</i> à gauche.'},
    {f:'3<i>x</i> : 3 = 15 : 3, soit <i>x</i> = 5',w:'On divise les deux membres par 3, le coefficient de <i>x</i>.'},
    {f:'Vérification : 5 · 5 − 7 = 18 et 2 · 5 + 8 = 18 ✓',w:'On calcule chaque membre de l’équation de départ.'}],
   conclusion:'La solution de 5<i>x</i> − 7 = 2<i>x</i> + 8 est 5.'},
  note:'Coefficient négatif : −2<i>x</i> = 6 donne <i>x</i> = 6 : (−2) = −3. Cas spéciaux : si les <i>x</i> disparaissent et qu’il reste une égalité fausse comme 0 = 7, il n’y a <b>aucune solution</b> ; s’il reste 0 = 0, <b>tous les nombres</b> sont solutions.'},
 {h:'À toi de résoudre',p:'Résous 7<i>x</i> + 4 = 3<i>x</i> − 12.',lab:'x =',ans:-4,
  why:'On retire 3<i>x</i> : 4<i>x</i> + 4 = −12. On retire 4 : 4<i>x</i> = −16. On divise par 4 : <i>x</i> = −4. Vérification : −28 + 4 = −24 et −12 − 12 = −24.'},
 {kind:'Méthode',h:'Équations avec des parenthèses',p:`<b>Quand :</b> l’équation contient des parenthèses, comme 3(<i>x</i> − 2) = 5 − (<i>x</i> + 3). <b>Pourquoi :</b> tant que les <i>x</i> sont enfermés dans des parenthèses, on ne peut pas les regrouper. On les libère en <b>développant</b>, comme au chapitre de calcul littéral : <i>k</i>(<i>a</i> + <i>b</i>) = <i>ka</i> + <i>kb</i>, et un signe − devant une parenthèse change le signe de chaque terme. <b>Comment :</b> 1) développe chaque membre ; 2) réduis chaque membre ; 3) résous comme d’habitude ; 4) vérifie dans l’équation de départ.`,
  demo:{enonce:'Résoudre 3(<i>x</i> − 2) = 5 − (<i>x</i> + 3).',
   etapes:[
    {f:'3<i>x</i> − 6 = 5 − <i>x</i> − 3',w:'On développe à gauche. À droite, le − devant la parenthèse change les signes de <i>x</i> et de 3.'},
    {f:'3<i>x</i> − 6 = 2 − <i>x</i>',w:'On réduit le membre de droite : 5 − 3 = 2.'},
    {f:'4<i>x</i> − 6 = 2, puis 4<i>x</i> = 8',w:'On ajoute <i>x</i> aux deux membres, puis on ajoute 6.'},
    {f:'<i>x</i> = 2. Vérification : 3(2 − 2) = 0 et 5 − (2 + 3) = 0 ✓',w:'On divise par 4, puis on contrôle.'}],
   conclusion:'La solution est 2.'}},
 {h:'À toi : avec des parenthèses',p:'Résous 4(<i>x</i> + 1) − 2(<i>x</i> − 3) = 20.',lab:'x =',ans:5,
  why:'4<i>x</i> + 4 − 2<i>x</i> + 6 = 20, soit 2<i>x</i> + 10 = 20, donc 2<i>x</i> = 10 et <i>x</i> = 5. Attention : −2 · (−3) = +6. Vérification : 4 · 6 − 2 · 2 = 20.'},
 {kind:'Méthode',h:'Équations avec des fractions simples',p:`<b>Quand :</b> l’équation contient des fractions avec des nombres en bas, comme ${F('<i>x</i>',3)} + ${F('<i>x</i>',4)} = 7. <b>Pourquoi ça marche :</b> on a le droit de multiplier les deux membres par un même nombre non nul (règle 2). Si ce nombre est un multiple commun des dénominateurs, toutes les fractions disparaissent. <b>Comment :</b> 1) trouve le plus petit multiple commun des dénominateurs (le ppmc) ; 2) multiplie <b>chaque terme</b> des deux membres par ce nombre ; 3) simplifie chaque fraction ; 4) résous et vérifie.`,
  demo:{enonce:`Résoudre ${F('<i>x</i>',3)} + ${F('<i>x</i>',4)} = 7.`,
   etapes:[
    {f:'ppmc(3 ; 4) = 12',w:'12 est le plus petit nombre divisible par 3 et par 4.'},
    {f:`12 · ${F('<i>x</i>',3)} + 12 · ${F('<i>x</i>',4)} = 12 · 7`,w:'On multiplie chaque terme des deux membres par 12.'},
    {f:'4<i>x</i> + 3<i>x</i> = 84, soit 7<i>x</i> = 84',w:'12 : 3 = 4 et 12 : 4 = 3 : les fractions disparaissent.'},
    {f:`<i>x</i> = 12. Vérification : ${F(12,3)} + ${F(12,4)} = 4 + 3 = 7 ✓`,w:'On divise par 7, puis on contrôle.'}],
   conclusion:'La solution est 12.'},
  note:`<b>Piège :</b> on multiplie <b>tous</b> les termes, même ceux sans fraction. ${F('<i>x</i>',2)} + 1 = 4 devient <i>x</i> + 2 = 8, pas <i>x</i> + 1 = 8.`},
 {h:'À toi : avec des fractions',p:`Résous ${F('<i>x</i>',2)} − 3 = ${F('<i>x</i>',5)}.`,lab:'x =',ans:10,
  why:`On multiplie tout par 10 : 5<i>x</i> − 30 = 2<i>x</i>. Puis 3<i>x</i> = 30 et <i>x</i> = 10. Vérification : ${F(10,2)} − 3 = 2 et ${F(10,5)} = 2.`},
 {kind:'Théorie',h:'Mettre un problème en équation',p:`<p>Avec 36 m de grillage, tu veux faire un enclos rectangulaire dont la longueur dépasse la largeur de 4 m. Quelles dimensions choisir&nbsp;? On pourrait essayer au hasard. L’équation, elle, trouve la réponse à coup sûr.</p>
<div class="def"><p><b>Mettre en équation</b>, c’est traduire l’énoncé : 1) choisir l’inconnue et dire ce qu’elle représente (« soit <i>x</i> la largeur, en m ») ; 2) exprimer les autres grandeurs avec <i>x</i> (longueur <i>x</i> + 4) ; 3) écrire une égalité entre deux façons de calculer la même grandeur (le périmètre : 2<i>x</i> + 2(<i>x</i> + 4) = 36).</p></div>
<div class="ex"><p>2<i>x</i> + 2<i>x</i> + 8 = 36, donc 4<i>x</i> = 28 et <i>x</i> = 7. La largeur vaut 7 m et la longueur 11 m. Contrôle : 2 · 7 + 2 · 11 = 36. Bouge le curseur : seul <i>x</i> = 7 utilise exactement tout le grillage.</p></div>
<div class="idea"><p>Quelques traductions utiles. <b>Âges</b> : dans <i>n</i> ans, chacun a <i>n</i> ans de plus. <b>Nombres consécutifs</b> : <i>n</i>, <i>n</i> + 1, <i>n</i> + 2. <b>Achats</b> : prix total = prix d’un article · quantité. <b>Périmètre</b> : la somme de tous les côtés.</p></div>`,
  params:[{id:'w',l:'largeur x (m)',min:1,max:10,step:.5,v:4}],
  draw:v=>{ const P=plane({x:[-1,15.5],y:[-1.5,11],grid:false,axes:false}); P.rect(0,0,v.w+4,v.w,{fill:'var(--ok)',fo:.25,c:'var(--ok)',w:2.5});
    P.text((v.w+4)/2,v.w,`x + 4 = ${fmt(v.w+4)} m`,{a:'middle',dy:-8,s:12}).text(v.w+4,v.w/2,`x = ${fmt(v.w)} m`,{dx:6,dy:4,s:12}); return P.svg(); },
  info:v=>{ const p=4*v.w+8; return `Périmètre : 2 · ${fmt(v.w)} + 2 · ${fmt(v.w+4)} = ${fmt(p)} m. ${p===36?'<b>Pile 36 m : c’est la solution.</b>':p<36?'Il reste du grillage.':'Il manque du grillage.'}`; }},
 {kind:'Méthode',h:'Résoudre un problème avec une équation',p:`<b>Quand :</b> un problème cherche un nombre qu’on ne peut pas calculer directement. <b>Pourquoi ça marche :</b> l’équation traduit l’énoncé ; la résoudre, c’est résoudre le problème. <b>Comment :</b> 1) choisis l’inconnue et écris ce qu’elle représente, avec l’unité ; 2) exprime les autres grandeurs avec elle ; 3) écris l’équation ; 4) résous-la ; 5) vérifie dans l’<b>énoncé</b>, pas seulement dans l’équation ; 6) réponds par une phrase avec l’unité. La présentation reste : phrase, calcul, réponse.`,
  demo:{enonce:'Léa a 12 ans de plus que son frère Tom. Dans 3 ans, Léa aura le triple de l’âge de Tom. Quel âge ont-ils aujourd’hui&nbsp;?',
   etapes:[
    {f:'Soit <i>x</i> l’âge de Tom aujourd’hui, en années. Léa a <i>x</i> + 12 ans.',w:'On choisit l’inconnue et on exprime l’autre âge avec elle.'},
    {f:'Dans 3 ans : Tom aura <i>x</i> + 3 ans, Léa <i>x</i> + 15 ans.',w:'Chacun vieillit de 3 ans.'},
    {f:'<i>x</i> + 15 = 3(<i>x</i> + 3)',w:'« Le triple de l’âge de Tom » : 3 fois toute l’expression, donc des parenthèses.'},
    {f:'<i>x</i> + 15 = 3<i>x</i> + 9, puis 6 = 2<i>x</i>, donc <i>x</i> = 3',w:'On développe, on retire <i>x</i> et 9 aux deux membres, puis on divise par 2.'},
    {f:'Contrôle : Tom 3 ans, Léa 15 ans. Dans 3 ans : 6 ans et 18 ans, et 18 = 3 · 6 ✓',w:'On vérifie avec les phrases de l’énoncé.'}],
   conclusion:'Tom a 3 ans et Léa a 15 ans.'}},
 {h:'À toi : trois nombres qui se suivent',p:'La somme de trois nombres entiers consécutifs vaut 87. Quel est le plus petit des trois&nbsp;?',lab:'plus petit :',ans:28,
  why:'Soit <i>n</i> le plus petit : <i>n</i> + (<i>n</i> + 1) + (<i>n</i> + 2) = 87, soit 3<i>n</i> + 3 = 87, donc 3<i>n</i> = 84 et <i>n</i> = 28. Les nombres sont 28, 29 et 30 : leur somme vaut bien 87.'},
 {kind:'Défi',h:'Poules et lapins',p:'Dans une ferme, on compte 20 têtes et 56 pattes. Il n’y a que des poules (2 pattes) et des lapins (4 pattes). Combien y a-t-il de lapins&nbsp;?',lab:'lapins :',ans:8,
  why:'Commence par un cas simple : 20 poules donnent 40 pattes. Chaque lapin à la place d’une poule ajoute 2 pattes ; il en manque 16, donc 8 lapins. Avec une équation : soit <i>x</i> le nombre de lapins, 4<i>x</i> + 2(20 − <i>x</i>) = 56, soit 2<i>x</i> + 40 = 56 et <i>x</i> = 8. Contrôle : 8 lapins (32 pattes) et 12 poules (24 pattes) font 56 pattes.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Équation</b> : égalité avec une inconnue. <b>Solution</b> : nombre qui rend l’égalité vraie. Pour vérifier, calcule chaque membre séparément.</li>
<li><b>Règles d’équivalence</b> (la balance) : ajouter ou retirer le même terme aux deux membres ; multiplier ou diviser les deux membres par le même nombre non nul.</li>
<li><b>Résoudre</b> : les <i>x</i> d’un côté, les nombres de l’autre, diviser par le coefficient de <i>x</i>, vérifier.</li>
<li><b>Parenthèses</b> : développer et réduire chaque membre d’abord. Un − devant une parenthèse change tous les signes.</li>
<li><b>Fractions</b> : multiplier chaque terme des deux membres par le ppmc des dénominateurs.</li>
<li><b>Problème</b> : choisir l’inconnue, traduire, écrire l’équation, résoudre, vérifier dans l’énoncé, répondre par une phrase avec l’unité.</li>
<li>Cas spéciaux : 0 = 7, aucune solution ; 0 = 0, tous les nombres sont solutions.</li>
</ul></div>`},
 {kind:'Problème',h:'La sortie au parc d’attractions',
  p:'Un club de jeunes organise une sortie au parc d’attractions. La location du car coûte 360 CHF pour tout le groupe, et chaque entrée coûte 32 CHF. Le club dispose d’un budget de 1128 CHF, qu’il veut utiliser exactement. On note <i>n</i> le nombre de jeunes.',
  parts:[
   {q:'a) Quelle expression donne le coût total de la sortie pour <i>n</i> jeunes&nbsp;?',opts:['360<i>n</i> + 32','32<i>n</i> + 360','(32 + 360)<i>n</i>','32 + 360<i>n</i>'],ans:1,hint:'Le car se paie une seule fois, les entrées autant de fois qu’il y a de jeunes.',why:'Les entrées coûtent 32<i>n</i> CHF, le car 360 CHF : coût total 32<i>n</i> + 360.'},
   {q:'b) Combien de jeunes peuvent participer avec ce budget&nbsp;?',lab:'n =',ans:24,hint:'Résous 32<i>n</i> + 360 = 1128.',why:'32<i>n</i> = 1128 − 360 = 768, donc <i>n</i> = 768 : 32 = 24. Contrôle : 32 · 24 + 360 = 1128.'},
   {q:'c) Le club trouve un car à 280 CHF. Combien de jeunes, au maximum, peuvent alors venir avec le même budget&nbsp;?',lab:'n =',ans:26,hint:'Résous 32<i>n</i> + 280 = 1128, puis réfléchis : on ne peut pas emmener une moitié de personne.',why:'32<i>n</i> = 848 donne <i>n</i> = 26,5. Avec 27 jeunes, on dépasse le budget (1144 CHF) ; avec 26, on dépense 1112 CHF. Au maximum 26 jeunes.'},
   {q:'d) Avec le premier car et 24 jeunes, chacun paie la même part du coût total. Combien paie chaque jeune&nbsp;?',unit:'CHF',ans:47,hint:'Partage le budget total entre les 24 jeunes.',why:'1128 : 24 = 47 CHF par jeune.'}],
  sol:'Soit <i>n</i> le nombre de jeunes. Coût total : 32<i>n</i> + 360 CHF. Avec le budget de 1128 CHF : 32<i>n</i> + 360 = 1128, donc 32<i>n</i> = 768 et <i>n</i> = 24. Contrôle : 32 · 24 + 360 = 768 + 360 = 1128. Avec un car à 280 CHF : 32<i>n</i> + 280 = 1128 donne <i>n</i> = 26,5, qui n’est pas un nombre de personnes ; on garde 26 jeunes, pour 1112 CHF. Avec le premier car, chacun paie 1128 : 24 = 47 CHF. Réponse : 24 jeunes peuvent partir, 26 avec le car moins cher.'},
 {kind:'Problème',h:'L’énigme de Diophante',
  p:'Une énigme ancienne raconte la vie du mathématicien grec Diophante. Son enfance dura un sixième de sa vie, sa jeunesse un douzième de plus. Après encore un septième de sa vie, il se maria. Cinq ans plus tard naquit son fils, qui vécut la moitié de l’âge final de son père. Diophante mourut 4 ans après son fils. On note <i>x</i> l’âge de Diophante à sa mort, en années.',
  parts:[
   {q:'a) Quelle équation traduit l’énigme&nbsp;?',opts:[`${F('<i>x</i>',6)} + ${F('<i>x</i>',12)} + ${F('<i>x</i>',7)} + 5 + ${F('<i>x</i>',2)} + 4 = <i>x</i>`,`${F('<i>x</i>',6)} + ${F('<i>x</i>',12)} + ${F('<i>x</i>',7)} + ${F('<i>x</i>',2)} = <i>x</i>`,`6 + 12 + 7 + 5 + 2 + 4 = <i>x</i>`,`${F('<i>x</i>',6)} + ${F('<i>x</i>',12)} + ${F('<i>x</i>',7)} + 5 + ${F('<i>x</i>',2)} + 4 = 0`],ans:0,hint:'La somme de toutes les périodes de sa vie est égale à toute sa vie.',why:'Enfance, jeunesse, avant le mariage, 5 ans, la vie du fils (<i>x</i>/2), puis 4 ans : la somme vaut <i>x</i>.'},
   {q:'b) Par quel plus petit nombre faut-il multiplier chaque terme pour supprimer toutes les fractions&nbsp;?',ans:84,hint:'Cherche le plus petit multiple commun de 6, 12, 7 et 2.',why:'12 est un multiple de 6 et de 2 ; 12 et 7 n’ont pas de diviseur commun : ppmc = 12 · 7 = 84.'},
   {q:'c) Résous l’équation. À quel âge Diophante est-il mort&nbsp;?',lab:'x =',unit:'ans',ans:84,hint:'Après multiplication par 84 : 14<i>x</i> + 7<i>x</i> + 12<i>x</i> + 420 + 42<i>x</i> + 336 = 84<i>x</i>.',why:'75<i>x</i> + 756 = 84<i>x</i>, donc 756 = 9<i>x</i> et <i>x</i> = 84.'},
   {q:'d) À quel âge s’est-il marié&nbsp;?',unit:'ans',ans:33,hint:'Additionne l’enfance, la jeunesse et le septième de sa vie.',why:'84/6 + 84/12 + 84/7 = 14 + 7 + 12 = 33 ans.'},
   {q:'e) Combien d’années son fils a-t-il vécu&nbsp;?',unit:'ans',ans:42,hint:'La moitié de l’âge final de Diophante.',why:'84 : 2 = 42 ans. Contrôle : 33 + 5 + 42 + 4 = 84.'}],
  sol:`Soit <i>x</i> l’âge de Diophante à sa mort. L’énigme donne ${F('<i>x</i>',6)} + ${F('<i>x</i>',12)} + ${F('<i>x</i>',7)} + 5 + ${F('<i>x</i>',2)} + 4 = <i>x</i>. Le ppmc des dénominateurs est 84 ; en multipliant chaque terme par 84 : 14<i>x</i> + 7<i>x</i> + 12<i>x</i> + 420 + 42<i>x</i> + 336 = 84<i>x</i>, soit 75<i>x</i> + 756 = 84<i>x</i>. On retire 75<i>x</i> : 756 = 9<i>x</i>, donc <i>x</i> = 84. Contrôle dans l’énoncé : enfance 14 ans, jeunesse 7 ans, mariage à 14 + 7 + 12 = 33 ans, fils né à 38 ans, qui vit 42 ans, mort de Diophante 4 ans plus tard : 38 + 42 + 4 = 84. Réponse : Diophante est mort à 84 ans.`},
]},
);
})();
