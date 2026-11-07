/* Déclic — Maths au secondaire, 11e année : polynômes, équations, systèmes */
(()=>{
/* ---------- helpers locaux ---------- */
const X='<i>x</i>', Y='<i>y</i>', A='<i>a</i>', B='<i>b</i>', N='<i>n</i>';
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;
// système de deux équations avec accolade
const SYS=(e1,e2)=>`<span style="display:inline-flex;align-items:center;vertical-align:middle;gap:3px;margin:2px 4px"><span style="font-size:2.3em;line-height:1;font-weight:300">{</span><span style="display:inline-flex;flex-direction:column;line-height:1.5"><span>${e1}</span><span>${e2}</span></span></span>`;
// polynôme à partir des coefficients (du plus haut degré au terme constant)
function pol(cs,v='x'){
  const n=cs.length-1; let s='';
  cs.forEach((c,i)=>{ const d=n-i; if(Math.abs(c)<1e-12) return; const ac=Math.abs(c);
    const coef=(Math.abs(ac-1)<1e-12&&d>0)?'':fmt(ac);
    const lit=d===0?'':`<i>${v}</i>`+(d===2?'²':d===3?'³':'');
    s+=s?(c<0?' − ':' + '):(c<0?'−':''); s+=coef+lit; });
  return s||'0';
}
const droite=(a,b)=>`${Y} = ${pol([a,b])}`;
const ST={c:'var(--ink)',w:1.5};
// (a + b)² : grand carré découpé en a², ab, ab, b²
function carreSomme(a,b){
  const P=plane({x:[-1.4,10.8],y:[-1.4,10.8],grid:false,axes:false});
  P.rect(0,0,a,a,{...ST,fill:'var(--accent)',fo:.3}).rect(a,0,b,a,{...ST,fill:'var(--spark)',fo:.3})
   .rect(0,a,a,b,{...ST,fill:'var(--spark)',fo:.3}).rect(a,a,b,b,{...ST,fill:'var(--math)',fo:.4});
  P.text(a/2,a/2,'a²',{a:'middle',dy:5,s:15}).text(a+b/2,a/2,'ab',{a:'middle',dy:4,s:12}).text(a/2,a+b/2,'ab',{a:'middle',dy:4,s:12}).text(a+b/2,a+b/2,'b²',{a:'middle',dy:4,s:12});
  P.text(a/2,0,'a',{a:'middle',dy:17,c:'var(--muted)'}).text(a+b/2,0,'b',{a:'middle',dy:17,c:'var(--muted)'})
   .text(0,a/2,'a',{a:'end',dx:-6,dy:4,c:'var(--muted)'}).text(0,a+b/2,'b',{a:'end',dx:-6,dy:4,c:'var(--muted)'});
  return P.svg();
}
// (a − b)² : carré a² dont on retire deux bandes ab (le coin b² est retiré deux fois)
function carreDiff(a,b){
  const P=plane({x:[-1.8,a+1],y:[-1.4,a+1],grid:false,axes:false}), c=a-b;
  P.rect(0,0,c,c,{...ST,fill:'var(--accent)',fo:.3}).rect(c,0,b,a,{...ST,fill:'var(--spark)',fo:.3})
   .rect(0,c,a,b,{...ST,fill:'var(--spark)',fo:.3}).rect(c,c,b,b,{...ST,fill:'var(--bad)',fo:.45});
  P.text(c/2,c/2,'(a − b)²',{a:'middle',dy:5,s:15}).text(c+b/2,c/2,'ab',{a:'middle',dy:4,s:12}).text(c/2,c+b/2,'ab',{a:'middle',dy:4,s:12}).text(c+b/2,c+b/2,'b²',{a:'middle',dy:4,s:12});
  P.text(c/2,0,'a − b',{a:'middle',dy:17,c:'var(--muted)'}).text(c+b/2,0,'b',{a:'middle',dy:17,c:'var(--muted)'})
   .text(0,c/2,'a − b',{a:'end',dx:-6,dy:4,c:'var(--muted)'}).text(0,c+b/2,'b',{a:'end',dx:-6,dy:4,c:'var(--muted)'});
  return P.svg();
}
// (a + b)(a − b) : le L d'aire a² − b² recoupé en rectangle (a − b) × (a + b)
function diffCarres(a,b){
  const P=plane({x:[-1.2,17.6],y:[-1.4,11.8],grid:false,axes:false}), c=a-b, o=a+1.6;
  P.rect(0,0,c,a,{...ST,fill:'var(--accent)',fo:.3}).rect(c,0,b,c,{...ST,fill:'var(--spark)',fo:.35})
   .rect(c,c,b,b,{c:'var(--muted)',w:1.2,dash:true}).text(c+b/2,c+b/2,'b²',{a:'middle',dy:4,s:11,c:'var(--muted)'});
  P.rect(o,0,c,a,{...ST,fill:'var(--accent)',fo:.3}).rect(o,a,c,b,{...ST,fill:'var(--spark)',fo:.35});
  P.arrow(c+b/2,c/2,o+c/2,a+b/2,{c:'var(--muted)',w:1.5,hs:8,dash:true});
  P.text(a/2,0,'a',{a:'middle',dy:17,c:'var(--muted)'}).text(0,a/2,'a',{a:'end',dx:-6,dy:4,c:'var(--muted)'})
   .text(o+c/2,0,'a − b',{a:'middle',dy:17,c:'var(--muted)'}).text(o+c,(a+b)/2,'a + b',{dx:6,dy:4,c:'var(--muted)'});
  return P.svg();
}
// rectangle (x + m)(x + n) fait de tuiles : un carré x², des barres x, des petits carrés 1
function tuiles(m,n){
  const T=4.5, P=plane({x:[-1.4,11.2],y:[-1.4,11.2],grid:false,axes:false}), s={c:'var(--ink)',w:1.2};
  P.rect(0,0,T,T,{...s,fill:'var(--accent)',fo:.3}).text(T/2,T/2,'x²',{a:'middle',dy:5,s:15});
  for(let i=0;i<m;i++) P.rect(T+i,0,1,T,{...s,fill:'var(--spark)',fo:.3});
  for(let j=0;j<n;j++) P.rect(0,T+j,T,1,{...s,fill:'var(--spark)',fo:.3});
  for(let i=0;i<m;i++) for(let j=0;j<n;j++) P.rect(T+i,T+j,1,1,{...s,fill:'var(--math)',fo:.4});
  P.text(T/2,0,'x',{a:'middle',dy:17,c:'var(--muted)'}).text(0,T/2,'x',{a:'end',dx:-6,dy:4,c:'var(--muted)'});
  if(m) P.text(T+m/2,0,fmt(m),{a:'middle',dy:17,c:'var(--muted)'});
  if(n) P.text(0,T+n/2,fmt(n),{a:'end',dx:-6,dy:4,c:'var(--muted)'});
  return P.svg();
}
// mise en évidence : rectangle k × (a + b) = ka + kb
function rectFacteur(){
  const P=plane({x:[-1.4,10.6],y:[-1.4,4.6],grid:false,axes:false});
  P.rect(0,0,6,3,{...ST,fill:'var(--accent)',fo:.3}).rect(6,0,3.5,3,{...ST,fill:'var(--spark)',fo:.3});
  P.text(3,1.5,'k · a',{a:'middle',dy:5,s:15}).text(7.75,1.5,'k · b',{a:'middle',dy:5,s:15});
  P.text(3,0,'a',{a:'middle',dy:17,c:'var(--muted)'}).text(7.75,0,'b',{a:'middle',dy:17,c:'var(--muted)'}).text(0,1.5,'k',{a:'end',dx:-6,dy:4,c:'var(--muted)'});
  P.text(4.75,3,'largeur totale : a + b',{a:'middle',dy:-8,s:12,c:'var(--muted)'});
  return P.svg();
}
// diagramme en barres : cible f et proposition g pour x = 0 à 4
function barres(f,g){
  const P=plane({x:[-.7,4.7],y:[-14,40],h:220,grid:false,axes:false});
  P.seg(-.7,0,4.7,0,{c:'var(--muted)',w:1.5});
  for(let x=0;x<=4;x++){ const t=f(x), s=g(x);
    P.rect(x-.36,0,.34,t,{fill:'var(--accent)',fo:.65,c:null}).rect(x+.02,0,.34,s,{fill:t===s?'var(--ok)':'var(--spark)',fo:.65,c:null});
    P.text(x,-14,'x = '+x,{a:'middle',dy:-4,s:11,c:'var(--muted)'}); }
  return P.svg();
}
// balance de l'équation 3x + 2 = 11
function balance(xv){
  const L=3*xv+2, R=11, th=Math.max(-.3,Math.min(.3,(L-R)*.04)), r=3.4, cy=2.3;
  const P=plane({x:[-5,5],y:[-1.6,4.4],grid:false,axes:false});
  P.poly([[0,cy],[-.7,-.3],[.7,-.3]],{fill:'var(--muted)',fo:.35,c:'var(--muted)',w:1.5});
  const ends=[[-r*Math.cos(th),cy-r*Math.sin(th)],[r*Math.cos(th),cy+r*Math.sin(th)]];
  P.seg(ends[0][0],ends[0][1],ends[1][0],ends[1][1],{c:'var(--ink)',w:4});
  ends.forEach(([ex,ey])=>{ P.seg(ex,ey,ex-1.1,ey-1,{c:'var(--muted)',w:1.2}).seg(ex,ey,ex+1.1,ey-1,{c:'var(--muted)',w:1.2}).seg(ex-1.3,ey-1,ex+1.3,ey-1,{c:'var(--ink)',w:3}); });
  const [lx,ly]=ends[0], [rx,ry]=ends[1];
  for(let i=0;i<3;i++){ P.rect(lx-1.2+i*.62,ly-.98,.52,.52,{fill:'var(--accent)',fo:.5,c:'var(--ink)',w:1}); P.text(lx-.94+i*.62,ly-.72,'x',{a:'middle',dy:4,s:11}); }
  P.dot(lx+.85,ly-.82,{r:4,c:'var(--spark)'}).dot(lx+1.1,ly-.82,{r:4,c:'var(--spark)'});
  for(let i=0;i<11;i++) P.dot(rx-1.05+(i%6)*.42,ry-.84+Math.floor(i/6)*.32,{r:4,c:'var(--spark)'});
  P.text(lx,ly-1,`3x + 2 = ${fmt(L)}`,{a:'middle',dy:17,s:12}).text(rx,ry-1,'11',{a:'middle',dy:17,s:12});
  return P.svg();
}
// courbe y = ax² + bx + c et ses points sur l'axe horizontal
function parab(a,b,c,o={}){
  const P=plane({x:o.x||[-6,6],y:o.y||[-6,6],h:o.h,lab:2});
  P.fn(x=>a*x*x+b*x+c);
  const D=b*b-4*a*c;
  if(a!==0){ if(D>1e-9){ const r=Math.sqrt(D); [(-b-r)/(2*a),(-b+r)/(2*a)].forEach(z=>P.dot(z,0)); } else if(Math.abs(D)<1e-9) P.dot(-b/(2*a),0); }
  else if(b!==0) P.dot(-c/b,0);
  return P.svg();
}
// solutions de ax² + bx + c = 0, en texte
function sol2(a,b,c){
  if(a===0) return 'a = 0 : ce n’est plus une équation du 2e degré.';
  const D=b*b-4*a*c;
  if(D<0) return `Δ = ${fmt(D)} &lt; 0 : aucune solution. La courbe ne touche pas l’axe.`;
  if(D===0) return `Δ = 0 : une seule solution, x = ${fmt(-b/(2*a))}.`;
  const r=Math.sqrt(D), z=[(-b-r)/(2*a),(-b+r)/(2*a)].sort((p,q)=>p-q);
  const eq=t=>Math.abs(t*100-Math.round(t*100))<1e-9?'=':'≈';
  return `Δ = ${fmt(D)} &gt; 0 : deux solutions, x ${eq(z[0])} ${fmt(z[0])} et x ${eq(z[1])} ${fmt(z[1])}.`;
}
// repère avec des droites y = ax + b
function droites(L,o={}){
  const P=plane({x:o.x||[-6,6],y:o.y||[-6,6],h:o.h,lab:o.lab||2});
  L.forEach(d=>P.fn(x=>d.a*x+d.b,{c:d.c,dash:d.dash,w:3}));
  return P;
}

COURS.push(
/* ===================== POLYNÔMES ET IDENTITÉS REMARQUABLES ===================== */
{subj:'sec', sem:'a11', id:'sec11-polynomes', o:2, h:'Polynômes et identités remarquables', p:'Réduire et calculer avec des polynômes, voir les identités remarquables dans des carrés découpés, factoriser et prouver avec des lettres.', steps:[
 {kind:'Théorie',h:'Monômes et polynômes',p:`<p>Au magasin, une boîte de Lego coûte ${X} francs et un sachet de figurines ${Y} francs. Trois boîtes et deux sachets coûtent 3${X} + 2${Y} francs. Cette écriture avec des lettres est un <b>polynôme</b>. Tu en as déjà rencontré l’an passé : on rappelle le vocabulaire et on le complète.</p>
<div class="def"><p>Un <b>monôme</b> est le produit d’un nombre et de lettres, comme −5${X}²${Y} ou ${F(1,2)}${A}${B}<i>c</i>. Le nombre est son <b>coefficient</b> (ici −5 et ${F(1,2)}). Les lettres forment sa <b>partie littérale</b>. Son <b>degré</b> est le nombre de lettres multipliées : ${X}²${Y} = ${X} · ${X} · ${Y} est de degré 3. Un <b>polynôme</b> est une somme de monômes, appelés ses <b>termes</b>. Son degré est le plus grand degré de ses termes.</p></div>
<div class="ex"><p>Dans 4${X}³ − ${F(2,3)}${X}${Y} + 7, il y a trois termes : 4${X}³ (degré 3), −${F(2,3)}${X}${Y} (degré 2, coefficient −${F(2,3)}) et 7 (degré 0 : un nombre seul n’a pas de lettre). Ce polynôme est de degré 3.</p></div>
<div class="warn"><p>Le signe fait partie du coefficient : dans ${A} − 3${B}, le coefficient de ${B} est −3. Une lettre seule, comme ${X}, a pour coefficient 1.</p></div>`,
  fig:tab([['Monôme','Coefficient','Partie littérale','Degré'],[`−5${X}²${Y}`,'−5',`${X}²${Y}`,'3'],[`${F(1,2)}${A}${B}<i>c</i>`,F(1,2),`${A}${B}<i>c</i>`,'3'],[`−${F(3,4)}${Y}²`,`−${F(3,4)}`,`${Y}²`,'2'],[X,'1',X,'1'],['7','7','aucune','0']]),
  note:`Un coefficient peut être une fraction : ${F(1,2)}${X} se lit « un demi de ${X} » et vaut ${F(X,2)}.`},
 {kind:'Méthode',h:'Réduire et ordonner un polynôme',p:`<b>Quand :</b> un polynôme contient plusieurs termes avec la même partie littérale. <b>Pourquoi ça marche :</b> deux termes <b>semblables</b> (exactement les mêmes lettres avec les mêmes exposants) comptent la même chose. 3 pommes + 5 pommes = 8 pommes, donc 3${X}² + 5${X}² = 8${X}². C’est la distributivité : 3${X}² + 5${X}² = (3 + 5)${X}². <b>Comment :</b> repère chaque famille de termes semblables (souligne-les d’une même couleur), additionne leurs coefficients sans toucher à la partie littérale, puis <b>ordonne</b> : écris les termes du plus grand degré au plus petit.`,
  demo:{enonce:`Réduire et ordonner 3${X}² − 5${X} + ${F(1,2)}${X}² + 7 − 2${X} + ${X}³.`,
   etapes:[
    {f:`En ${X}² : 3${X}² et ${F(1,2)}${X}². En ${X} : −5${X} et −2${X}. En ${X}³ : ${X}³. Nombre seul : 7`,w:'On regroupe les familles de termes semblables.'},
    {f:`3 + ${F(1,2)} = ${F(7,2)}, donc 3${X}² + ${F(1,2)}${X}² = ${F(7,2)}${X}²`,w:'On additionne les coefficients ; la partie littérale ne change pas.'},
    {f:`−5 − 2 = −7, donc −5${X} − 2${X} = −7${X}`,w:'Le signe devant chaque terme fait partie de son coefficient.'},
    {f:`${X}³ + ${F(7,2)}${X}² − 7${X} + 7`,w:'On ordonne du degré 3 au degré 0.'}],
   conclusion:`Le polynôme réduit et ordonné est ${X}³ + ${F(7,2)}${X}² − 7${X} + 7. Il est de degré 3.`},
  note:`<b>Piège :</b> 3${X}² et 3${X} ne sont pas semblables (exposants différents), 2${X}${Y} et 2${X} non plus. On ne les additionne jamais.`},
 {kind:'Méthode',h:'Additionner, soustraire et multiplier des polynômes',p:`<b>Additionner :</b> on enlève les parenthèses et on réduit. <b>Soustraire :</b> un signe − devant une parenthèse change le signe de <b>chaque</b> terme à l’intérieur, car −(<i>P</i> + <i>Q</i>) = −<i>P</i> − <i>Q</i>. <b>Multiplier :</b> on multiplie <b>chaque terme</b> du premier polynôme par <b>chaque terme</b> du second (c’est la distributivité), puis on réduit. Pour multiplier deux monômes, on multiplie les coefficients et on additionne les exposants de chaque lettre : 2${X} · 3${X}² = 6${X}³. Un tableau aide à ne rien oublier : une ligne par terme du premier polynôme, une colonne par terme du second.`,
  demo:{enonce:`Calculer (2${X} − 3)(${X}² + ${X} − 4), puis soustraire (${X}³ − 5${X} + 2).`,
   etapes:[
    {f:`2${X} · ${X}² = 2${X}³ ; 2${X} · ${X} = 2${X}² ; 2${X} · (−4) = −8${X}`,w:`Le terme 2${X} multiplie les trois termes de la seconde parenthèse.`},
    {f:`−3 · ${X}² = −3${X}² ; −3 · ${X} = −3${X} ; −3 · (−4) = +12`,w:'Puis le terme −3 fait de même. Moins par moins donne plus.'},
    {f:`2${X}³ + 2${X}² − 3${X}² − 8${X} − 3${X} + 12 = 2${X}³ − ${X}² − 11${X} + 12`,w:'On réduit : six produits, quatre termes à la fin.'},
    {f:`2${X}³ − ${X}² − 11${X} + 12 − ${X}³ + 5${X} − 2`,w:'Le signe − devant la parenthèse change le signe de chacun de ses trois termes.'},
    {f:`${X}³ − ${X}² − 6${X} + 10`,w:'On réduit encore et on ordonne.'}],
   conclusion:`(2${X} − 3)(${X}² + ${X} − 4) − (${X}³ − 5${X} + 2) = ${X}³ − ${X}² − 6${X} + 10.`},
  fig:tab([['×',`${X}²`,X,'−4'],[`2${X}`,`2${X}³`,`2${X}²`,`−8${X}`],['−3',`−3${X}²`,`−3${X}`,'+12']])},
 {h:'À toi : développe et réduis',p:`Développe et réduis (3${X} − 1)(2${X} + 4) − (${X}² − 5${X}). Quel est le coefficient de ${X} dans le résultat&nbsp;?`,lab:'coefficient =',ans:15,
  why:`(3${X} − 1)(2${X} + 4) = 6${X}² + 12${X} − 2${X} − 4 = 6${X}² + 10${X} − 4. On soustrait : 6${X}² + 10${X} − 4 − ${X}² + 5${X} = 5${X}² + 15${X} − 4. Le coefficient de ${X} est 15.`},
 {kind:'Théorie',h:'(a + b)² : le carré découpé',p:`<p>Ta chambre est un carré de côté ${A}. On l’agrandit de ${B} mètres en longueur et en largeur. Sa nouvelle aire est (${A} + ${B})². Est-ce ${A}² + ${B}²&nbsp;? La figure répond non.</p>
<div class="thm"><p><b>(${A} + ${B})² = ${A}² + 2${A}${B} + ${B}²</b>. C’est la première <b>identité remarquable</b> : une égalité vraie pour tous les nombres ${A} et ${B}.</p></div>
<div class="idea"><p>Découpe le grand carré de côté ${A} + ${B}. Tu obtiens quatre morceaux : le carré ${A}², le petit carré ${B}², et <b>deux</b> rectangles de côtés ${A} et ${B}, d’aire ${A}${B} chacun. Ces deux rectangles sont le « 2${A}${B} » qu’on oublie si souvent.</p></div>
<div class="why"><p>Par le calcul : (${A} + ${B})² = (${A} + ${B})(${A} + ${B}) = ${A}² + ${A}${B} + ${B}${A} + ${B}² = ${A}² + 2${A}${B} + ${B}².</p></div>
<div class="ex"><p>(5 + 2)² = 7² = 49, et 25 + 2 · 5 · 2 + 4 = 25 + 20 + 4 = 49. Avec une lettre : (${X} + 3)² = ${X}² + 6${X} + 9.</p></div>
<div class="warn"><p>(${A} + ${B})² n’est pas ${A}² + ${B}² : 7² = 49, mais 5² + 2² = 29. Il manque les deux rectangles.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Il y a environ 2300 ans, le Grec Euclide démontrait déjà cette égalité avec ce carré découpé. Il n’utilisait aucune lettre : l’algèbre s’écrivait alors avec des figures.</p></div>`,
  params:[{id:'a',l:'a',min:1,max:7,step:.5,v:5},{id:'b',l:'b',min:1,max:3.5,step:.5,v:2}],
  draw:v=>carreSomme(v.a,v.b),
  info:v=>`(${fmt(v.a)} + ${fmt(v.b)})² = ${fmt((v.a+v.b)**2)} et ${fmt(v.a*v.a)} + 2 · ${fmt(v.a*v.b)} + ${fmt(v.b*v.b)} = ${fmt(v.a*v.a+2*v.a*v.b+v.b*v.b)}. Sans les rectangles : ${fmt(v.a*v.a+v.b*v.b)} seulement.`},
 {kind:'Théorie',h:'(a − b)² : on retire deux bandes',p:`<p>Une tablette de chocolat carrée a pour côté ${A}. Tu croques une bande de largeur ${B} à droite, puis une bande de largeur ${B} en haut. Il reste un carré de côté ${A} − ${B}. Quelle est son aire&nbsp;?</p>
<div class="thm"><p><b>(${A} − ${B})² = ${A}² − 2${A}${B} + ${B}²</b>. C’est la deuxième identité remarquable.</p></div>
<div class="idea"><p>Pars du carré ${A}². Retire la bande de droite (aire ${A}${B}) et la bande du haut (aire ${A}${B}). Mais le petit coin ${B}², en haut à droite, appartient aux deux bandes : tu l’as retiré deux fois. Il faut le rendre une fois. D’où ${A}² − 2${A}${B} + ${B}².</p></div>
<div class="why"><p>Par le calcul : (${A} − ${B})(${A} − ${B}) = ${A}² − ${A}${B} − ${B}${A} + ${B}², car (−${B}) · (−${B}) = +${B}².</p></div>
<div class="ex"><p>(7 − 2)² = 5² = 25, et 49 − 2 · 7 · 2 + 4 = 49 − 28 + 4 = 25. Avec une lettre : (${X} − 4)² = ${X}² − 8${X} + 16.</p></div>
<div class="warn"><p>Le dernier terme est <b>+</b>${B}², jamais −${B}² : c’est le coin qu’on rend.</p></div>`,
  fig:carreDiff(7,2)},
 {kind:'Théorie',h:'(a + b)(a − b) : la différence de deux carrés',p:`<p>Défi de calcul mental : 51 × 49&nbsp;? Tes amis sortent leur calculatrice. Toi, tu réponds 2499 en deux secondes. Le secret, c’est la troisième identité.</p>
<div class="thm"><p><b>(${A} + ${B})(${A} − ${B}) = ${A}² − ${B}²</b>.</p></div>
<div class="idea"><p>À gauche, un carré ${A}² dont on a enlevé le coin ${B}² (en pointillés). Il reste une forme en L, d’aire ${A}² − ${B}². Coupe ce L en deux rectangles. Fais tourner le petit et pose-le sur le grand : tu obtiens un rectangle de largeur ${A} − ${B} et de hauteur ${A} + ${B}. Même aire, deux écritures.</p></div>
<div class="why"><p>Par le calcul : (${A} + ${B})(${A} − ${B}) = ${A}² − ${A}${B} + ${B}${A} − ${B}² = ${A}² − ${B}². Les deux termes du milieu s’annulent.</p></div>
<div class="ex"><p>51 × 49 = (50 + 1)(50 − 1) = 50² − 1² = 2500 − 1 = 2499. Avec une lettre : (${X} + 5)(${X} − 5) = ${X}² − 25.</p></div>
<p>Bouge les curseurs : les deux aires restent toujours égales.</p>`,
  params:[{id:'a',l:'a',min:4,max:8,step:.5,v:7},{id:'b',l:'b',min:1,max:3,step:.5,v:2}],
  draw:v=>diffCarres(v.a,v.b),
  info:v=>`L : ${fmt(v.a)}² − ${fmt(v.b)}² = ${fmt(v.a*v.a)} − ${fmt(v.b*v.b)} = ${fmt(v.a*v.a-v.b*v.b)}. Rectangle : ${fmt(v.a+v.b)} × ${fmt(v.a-v.b)} = ${fmt((v.a+v.b)*(v.a-v.b))}.`},
 {kind:'Méthode',h:'Développer avec une identité remarquable',p:`<b>Quand :</b> tu vois le carré d’une somme, le carré d’une différence, ou le produit d’une somme par la différence des <b>mêmes</b> termes. <b>Pourquoi ça marche :</b> les identités sont vraies pour tous les nombres, donc aussi quand ${A} et ${B} sont des monômes comme 3${X} ou ${F(1,2)}${X}. <b>Comment :</b> 1) repère ${A} et ${B} ; 2) écris la formule en mettant des parenthèses autour de ${A} et de ${B} ; 3) calcule chaque terme. Le carré de 3${X} est (3${X})² = 9${X}², et pas 3${X}².`,
  demo:{enonce:`Développer (3${X} − 2${Y})².`,
   etapes:[
    {f:`${A} = 3${X} et ${B} = 2${Y} : c’est (${A} − ${B})²`,w:'On reconnaît le carré d’une différence.'},
    {f:`(3${X})² − 2 · (3${X}) · (2${Y}) + (2${Y})²`,w:`On remplace dans ${A}² − 2${A}${B} + ${B}², avec des parenthèses.`},
    {f:`9${X}² − 12${X}${Y} + 4${Y}²`,w:`(3${X})² = 9${X}², 2 · 3${X} · 2${Y} = 12${X}${Y} et (2${Y})² = 4${Y}².`}],
   conclusion:`(3${X} − 2${Y})² = 9${X}² − 12${X}${Y} + 4${Y}². Contrôle avec ${X} = ${Y} = 1 : (3 − 2)² = 1 et 9 − 12 + 4 = 1 ✓.`},
  note:`Autres exemples : (${F(1,2)}${X} + 4)² = ${F(1,4)}${X}² + 4${X} + 16 ; (5 + 2${A})(5 − 2${A}) = 25 − 4${A}² ; 31² = (30 + 1)² = 900 + 60 + 1 = 961.`},
 {kind:'Pratique',h:'Développe (2x − 5)²',p:`On cherche ${B} et <i>c</i> pour que (2${X} − 5)² = 4${X}² + ${B}${X} + <i>c</i>, quel que soit ${X}. Règle les curseurs. Le diagramme compare les deux expressions pour ${X} = 0, 1, 2, 3 et 4 : barre de gauche pour (2${X} − 5)², barre de droite pour ta proposition. Elle devient verte quand les deux valeurs sont égales.`,
  params:[{id:'b',l:'b',min:-30,max:10,step:1,v:-10},{id:'c',l:'c',min:0,max:40,step:1,v:10}],
  draw:v=>barres(x=>(2*x-5)**2,x=>4*x*x+v.b*x+v.c),
  info:v=>`Ta proposition : ${pol([4,v.b,v.c])}<br>`+tab([[X,'0','1','2','3','4'],[`(2${X} − 5)²`,...[0,1,2,3,4].map(x=>fmt((2*x-5)**2))],['proposition',...[0,1,2,3,4].map(x=>fmt(4*x*x+v.b*x+v.c))]]),
  ok:v=>v.b===-20&&v.c===25,
  why:`(2${X} − 5)² = (2${X})² − 2 · 2${X} · 5 + 5² = 4${X}² − 20${X} + 25. Donc ${B} = −20 et <i>c</i> = 25.`},
 {kind:'Méthode',h:'Factoriser : mettre en évidence, puis reconnaître une identité',p:`<b>Factoriser</b>, c’est transformer une somme en <b>produit</b> : le contraire de développer. On en aura besoin pour résoudre des équations. <b>Étape 1, la mise en évidence :</b> cherche un facteur commun à tous les termes (un nombre, une lettre, ou les deux) et sors-le devant une parenthèse : <i>k</i>${A} + <i>k</i>${B} = <i>k</i>(${A} + ${B}). C’est la distributivité lue de droite à gauche, comme sur la figure. Exemple : 6${X}² + 9${X} = 3${X} · 2${X} + 3${X} · 3 = 3${X}(2${X} + 3). <b>Étape 2, les identités :</b> regarde la parenthèse. Deux carrés séparés par un signe − ? C’est ${A}² − ${B}² = (${A} − ${B})(${A} + ${B}). Trois termes dont deux carrés ? Vérifie si le troisième vaut 2${A}${B} : alors c’est (${A} + ${B})² ou (${A} − ${B})². Contrôle toujours en redéveloppant.`,
  demo:{enonce:`Factoriser 12${X}³ − 12${X}² + 3${X}.`,
   etapes:[
    {f:`12${X}³ = 3${X} · 4${X}² ; 12${X}² = 3${X} · 4${X} ; 3${X} = 3${X} · 1`,w:`3 divise 12, 12 et 3, et ${X} est dans chaque terme : le facteur commun est 3${X}.`},
    {f:`12${X}³ − 12${X}² + 3${X} = 3${X}(4${X}² − 4${X} + 1)`,w:`On sort 3${X}. Dans la parenthèse, le dernier terme vaut 1 et pas 0, car 3${X} = 3${X} · 1.`},
    {f:`4${X}² = (2${X})², 1 = 1², et 2 · 2${X} · 1 = 4${X}`,w:`Deux carrés et leur double produit précédé de − : c’est ${A}² − 2${A}${B} + ${B}² avec ${A} = 2${X} et ${B} = 1.`},
    {f:`3${X}(2${X} − 1)²`,w:`On remplace la parenthèse par (${A} − ${B})².`}],
   conclusion:`12${X}³ − 12${X}² + 3${X} = 3${X}(2${X} − 1)². Contrôle : 3${X}(4${X}² − 4${X} + 1) redonne bien 12${X}³ − 12${X}² + 3${X}.`},
  fig:rectFacteur(),
  note:`Avec la différence de deux carrés : 49 − 16${Y}² = 7² − (4${Y})² = (7 − 4${Y})(7 + 4${Y}).`},
 {h:'À toi : factorise complètement',p:`Factorise <b>complètement</b> 2${X}³ − 18${X}, c’est-à-dire jusqu’à ce qu’aucune parenthèse ne puisse plus être factorisée.`,
  opts:[`2${X}(${X}² − 9)`,`2(${X}³ − 9${X})`,`2${X}(${X} − 3)²`,`2${X}(${X} − 3)(${X} + 3)`],ans:3,
  why:`Facteur commun 2${X} : 2${X}³ − 18${X} = 2${X}(${X}² − 9). Puis ${X}² − 9 = ${X}² − 3² = (${X} − 3)(${X} + 3). Donc 2${X}(${X} − 3)(${X} + 3).`},
 {kind:'Méthode',h:'Factoriser x² + sx + p : la somme et le produit',p:`<b>Quand :</b> un trinôme ${X}² + <i>s</i>${X} + <i>p</i> (coefficient 1 devant ${X}²) n’a pas de facteur commun et n’est pas une identité remarquable. <b>Pourquoi ça marche :</b> développe (${X} + <i>m</i>)(${X} + ${N}) = ${X}² + <i>m</i>${X} + ${N}${X} + <i>mn</i> = ${X}² + (<i>m</i> + ${N})${X} + <i>mn</i>. Le coefficient de ${X} est la <b>somme</b> <i>m</i> + ${N}, et le nombre seul est le <b>produit</b> <i>mn</i>. Sur la figure, le rectangle (${X} + 2)(${X} + 3) contient un carré ${X}², 2 + 3 = 5 barres ${X} et 2 × 3 = 6 petits carrés. <b>Comment :</b> cherche deux entiers dont le produit vaut <i>p</i> et la somme vaut <i>s</i>. Liste les paires de diviseurs de <i>p</i> dans l’ordre. Si <i>p</i> est négatif, les deux nombres ont des signes contraires ; si <i>p</i> est positif et <i>s</i> négatif, ils sont tous deux négatifs.`,
  demo:{enonce:`Factoriser ${X}² − ${X} − 12.`,
   etapes:[
    {f:`On cherche <i>m</i> et ${N} avec <i>m</i> · ${N} = −12 et <i>m</i> + ${N} = −1`,w:'Ici, la somme vaut −1 et le produit −12.'},
    {f:'Paires de produit −12 : (1 ; −12), (2 ; −6), (3 ; −4), (4 ; −3), (6 ; −2), (12 ; −1)',w:'Le produit est négatif : un nombre positif et un négatif. On les liste dans l’ordre pour n’en oublier aucune.'},
    {f:'Sommes : −11, −4, −1, 1, 4, 11. La paire (3 ; −4) donne −1',w:'On garde la paire dont la somme convient.'},
    {f:`${X}² − ${X} − 12 = (${X} + 3)(${X} − 4)`,w:`Contrôle : ${X}² − 4${X} + 3${X} − 12 = ${X}² − ${X} − 12 ✓.`}],
   conclusion:`${X}² − ${X} − 12 = (${X} + 3)(${X} − 4).`},
  fig:tuiles(2,3)},
 {kind:'Pratique',h:'Range les tuiles',p:`Tu as un grand carré ${X}², 7 barres ${X} et 12 petits carrés. Range-les en un seul rectangle : il mesure ${X} + <i>m</i> sur ${X} + ${N}. Règle <i>m</i> et ${N} pour utiliser exactement toutes les tuiles. Tu auras factorisé ${X}² + 7${X} + 12.`,
  params:[{id:'m',l:'m',min:0,max:6,step:1,v:2},{id:'n',l:'n',min:0,max:6,step:1,v:2}],
  draw:v=>tuiles(v.m,v.n),
  info:v=>`(${X} + ${v.m})(${X} + ${v.n}) = ${pol([1,v.m+v.n,v.m*v.n])} : ${v.m+v.n} barre${v.m+v.n>1?'s':''} et ${v.m*v.n} petit${v.m*v.n>1?'s':''} carré${v.m*v.n>1?'s':''} (il en faut 7 et 12).`,
  ok:v=>v.m+v.n===7&&v.m*v.n===12,
  why:`3 + 4 = 7 et 3 × 4 = 12, donc ${X}² + 7${X} + 12 = (${X} + 3)(${X} + 4).`},
 {kind:'Méthode',h:'Prouver avec le calcul littéral',p:`<p>Tu remarques que 4 + 5 + 6 = 15, 10 + 11 + 12 = 33 et 99 + 100 + 101 = 300 : chaque fois un multiple de 3. Est-ce toujours vrai&nbsp;? Mille exemples ne prouvent rien : le 1001e pourrait rater. Une lettre, elle, représente <b>tous</b> les nombres à la fois.</p><p><b>Comment :</b> 1) nomme le nombre de départ avec une lettre (${N}, un entier quelconque) ; 2) écris les autres nombres avec cette lettre : le suivant est ${N} + 1, un nombre pair s’écrit 2${N}, un impair 2${N} + 1 ; 3) calcule et réduis ; 4) factorise pour faire apparaître la propriété : un multiple de 3 s’écrit 3 × (un entier).</p><div class="blk" data-t="Le savais-tu ?"><p>On raconte que le jeune Gauss, à 9 ans, additionna les nombres de 1 à 100 en quelques secondes. Il les groupa par paires : 1 + 100, 2 + 99, 3 + 98… Cela fait 50 paires de 101, donc 5050.</p></div>`,
  demo:{enonce:'Prouver que la somme de trois entiers consécutifs est toujours un multiple de 3.',
   etapes:[
    {f:`${N}, ${N} + 1 et ${N} + 2`,w:`Trois entiers qui se suivent, quel que soit le premier ${N}.`},
    {f:`${N} + (${N} + 1) + (${N} + 2) = 3${N} + 3`,w:`On réduit : trois fois ${N}, et 1 + 2 = 3.`},
    {f:`3${N} + 3 = 3(${N} + 1)`,w:'On met le facteur 3 en évidence.'},
    {f:`${N} + 1 est un entier, donc 3(${N} + 1) est un multiple de 3`,w:'C’est exactement la définition d’un multiple de 3.'}],
   conclusion:`La somme vaut 3(${N} + 1) : trois fois le nombre du milieu. Exemple : 99 + 100 + 101 = 3 × 100 = 300.`}},
 {kind:'Défi',h:'Le tour de magie',p:`Le magicien dit : « Choisis deux entiers qui se suivent. Multiplie-les, puis ajoute le plus grand. » Tu annonces 144 et il devine aussitôt que tu avais choisi 11 et 12. Le résultat est toujours le carré d’un des deux nombres. Lequel, et pourquoi&nbsp;?`,
  opts:[`Le carré du plus petit : ${N}(${N} + 1) + (${N} + 1) = ${N}²`,`Le carré du plus grand : ${N}(${N} + 1) + (${N} + 1) = (${N} + 1)(${N} + 1) = (${N} + 1)²`,`Le double du plus grand : ${N}(${N} + 1) + (${N} + 1) = 2(${N} + 1)`,'Aucun : ça ne marche que pour 11 et 12'],ans:1,
  why:`Avec ${N} et ${N} + 1 : ${N}(${N} + 1) + (${N} + 1) = (${N} + 1)(${N} + 1) en mettant ${N} + 1 en évidence, donc (${N} + 1)². Ici 11 × 12 + 12 = 144 = 12². Stratégie : commencer par des petits cas (2 × 3 + 3 = 9 = 3², 3 × 4 + 4 = 16 = 4²), deviner la règle, puis la prouver avec une lettre.`},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : polynômes et identités',p:`<div class="keep"><ul>
<li><b>Monôme</b> : coefficient × partie littérale ; son degré est le nombre de lettres multipliées. <b>Polynôme</b> : somme de monômes (ses termes) ; son degré est le plus grand degré de ses termes.</li>
<li><b>Réduire</b> : additionner les coefficients des termes semblables (mêmes lettres, mêmes exposants). <b>Ordonner</b> : du plus grand degré au plus petit.</li>
<li><b>Soustraire</b> : le − devant une parenthèse change le signe de chaque terme. <b>Multiplier</b> : chaque terme par chaque terme, puis réduire.</li>
<li><b>Identités remarquables</b> : (${A} + ${B})² = ${A}² + 2${A}${B} + ${B}² ; (${A} − ${B})² = ${A}² − 2${A}${B} + ${B}² ; (${A} + ${B})(${A} − ${B}) = ${A}² − ${B}². Les figures : carré découpé, deux bandes retirées, L recoupé en rectangle.</li>
<li><b>Factoriser</b> : d’abord la mise en évidence <i>k</i>${A} + <i>k</i>${B} = <i>k</i>(${A} + ${B}), puis les identités lues de droite à gauche.</li>
<li><b>Somme et produit</b> : ${X}² + <i>s</i>${X} + <i>p</i> = (${X} + <i>m</i>)(${X} + ${N}) avec <i>m</i> + ${N} = <i>s</i> et <i>mn</i> = <i>p</i>.</li>
<li><b>Prouver</b> : un entier ${N}, le suivant ${N} + 1, un pair 2${N}, un impair 2${N} + 1 ; calculer, réduire, factoriser.</li>
<li>Toujours <b>contrôler</b> en redéveloppant ou en remplaçant les lettres par des petits nombres.</li></ul></div>`},
 {kind:'Problème',h:'La boîte à pizza',
  p:`Pour fabriquer une boîte sans couvercle, tu prends un carton carré de côté ${X} cm (avec ${X} &gt; 8). Tu découpes un carré de 4 cm de côté à chaque coin, puis tu replies les quatre bords. Le fond de la boîte est un carré de côté ${X} − 8 et la hauteur vaut 4 cm. On veut exprimer le volume et l’aire de carton utilisée.`,
  fig:(()=>{ const P=plane({x:[-1,11],y:[-1,11],grid:false,axes:false});
    P.rect(0,0,10,10,{c:'var(--ink)',w:1.5,fill:'var(--accent)',fo:.15});
    [[0,0],[8.6,0],[0,8.6],[8.6,8.6]].forEach(([x,y])=>P.rect(x,y,1.4,1.4,{c:'var(--bad)',w:1.2,fill:'var(--bad)',fo:.3}));
    P.rect(1.4,1.4,7.2,7.2,{c:'var(--muted)',w:1.2,dash:true});
    P.text(5,5,'fond : (x − 8)²',{a:'middle',dy:5}).text(.7,0,'4',{a:'middle',dy:17,c:'var(--muted)'}).text(5,10,'x',{a:'middle',dy:-6,c:'var(--muted)'});
    return P.svg(); })(),
  parts:[
   {q:'a) Pour un carton de 30 cm de côté, quel est le volume de la boîte&nbsp;?',unit:'cm³',ans:1936,hint:'Le fond est un carré de côté 30 − 8. Volume = aire du fond × hauteur.',why:'Le fond mesure 22 cm de côté : V = 22² × 4 = 484 × 4 = 1936 cm³.'},
   {q:`b) En développant, V = 4(${X} − 8)² s’écrit 4${X}² + ${B}${X} + 256. Que vaut ${B}&nbsp;?`,lab:'b =',ans:-64,hint:'Développe d’abord (x − 8)² avec une identité, puis multiplie chaque terme par 4.',why:`(${X} − 8)² = ${X}² − 16${X} + 64, donc 4(${X} − 8)² = 4${X}² − 64${X} + 256 : ${B} = −64.`},
   {q:`c) L’aire de carton qui reste après les découpes vaut ${X}² − 64. Comment se factorise-t-elle&nbsp;?`,opts:[`(${X} − 8)²`,`(${X} − 8)(${X} + 8)`,`(${X} − 32)(${X} + 2)`,`${X}(${X} − 64)`],ans:1,hint:'On retire 4 carrés de 16 cm². Reconnais une différence de deux carrés.',why:`${X}² − 64 = ${X}² − 8² = (${X} − 8)(${X} + 8).`},
   {q:'d) Calcule cette aire de carton pour un carton de 30 cm, sans calculatrice, avec la forme factorisée.',unit:'cm²',ans:836,hint:'Remplace x par 30 dans chaque facteur.',why:'(30 − 8)(30 + 8) = 22 × 38 = 836 cm². Contrôle : 900 − 64 = 836 ✓.'},
  ],
  sol:`Le fond de la boîte est un carré de côté ${X} − 8 et la hauteur vaut 4, donc V = 4(${X} − 8)².<br>Pour ${X} = 30 : V = 4 × 22² = 1936 cm³.<br>Développé : V = 4(${X}² − 16${X} + 64) = 4${X}² − 64${X} + 256.<br>On a retiré quatre carrés de 4 × 4 = 16 cm², soit 64 cm² : il reste ${X}² − 64 = (${X} − 8)(${X} + 8).<br>Pour ${X} = 30 : 22 × 38 = 836 cm² de carton forment la boîte.`},
 {kind:'Problème',h:'Deux chemins vers le même résultat',
  p:`Choisis un entier ${N}. Calcule le carré de ${N} + 3, puis le carré de ${N} − 3, et soustrais le second du premier. Avec ${N} = 5 : 8² − 2² = 64 − 4 = 60. Avec ${N} = 10 : 13² − 7² = 169 − 49 = 120. On veut une formule valable pour tout ${N}, la prouver de deux façons, puis s’en servir pour calculer de tête.`,
  parts:[
   {q:`a) Développe et réduis (${N} + 3)² − (${N} − 3)². Le résultat s’écrit <i>k</i> · ${N}. Que vaut <i>k</i>&nbsp;?`,lab:'k =',ans:12,hint:'Développe chaque carré avec une identité. Le signe − devant la deuxième parenthèse change tous ses signes.',why:`(${N}² + 6${N} + 9) − (${N}² − 6${N} + 9) = ${N}² + 6${N} + 9 − ${N}² + 6${N} − 9 = 12${N}.`},
   {q:`b) Autre chemin : avec ${A} = ${N} + 3 et ${B} = ${N} − 3, on a ${A}² − ${B}² = (${A} − ${B})(${A} + ${B}). Que vaut ${A} − ${B}&nbsp;?`,lab:'a − b =',ans:6,hint:'Attention aux parenthèses : (n + 3) − (n − 3).',why:`${A} − ${B} = ${N} + 3 − ${N} + 3 = 6, et ${A} + ${B} = 2${N}. Donc ${A}² − ${B}² = 6 · 2${N} = 12${N} : même résultat.`},
   {q:'c) Sans calculatrice, combien vaut 1003² − 997²&nbsp;?',ans:12000,hint:'Quel nombre n faut-il choisir pour que n + 3 = 1003 et n − 3 = 997 ?',why:`${N} = 1000, donc 1003² − 997² = 12 × 1000 = 12 000.`},
   {q:'d) Pourquoi le résultat est-il toujours un multiple de 12&nbsp;?',opts:['Parce que 60 et 120 sont des multiples de 12','Parce qu’il vaut 12n, et n est un entier','Parce que 3 + 3 = 6 et 6 × 2 = 12','Parce que n² − n² = 0'],ans:1,hint:'Des exemples ne suffisent pas. Quelle écriture vaut pour tous les entiers ?',why:`Le calcul littéral donne 12${N} pour <b>tout</b> entier ${N}. Douze fois un entier est un multiple de 12. Les exemples, eux, ne prouvent rien.`},
  ],
  sol:`Premier chemin : (${N} + 3)² − (${N} − 3)² = (${N}² + 6${N} + 9) − (${N}² − 6${N} + 9) = 12${N}.<br>Second chemin : c’est une différence de deux carrés ${A}² − ${B}² avec ${A} = ${N} + 3 et ${B} = ${N} − 3. Comme ${A} − ${B} = 6 et ${A} + ${B} = 2${N}, on obtient 6 · 2${N} = 12${N}.<br>Comme ${N} est un entier, 12${N} est un multiple de 12 : c’est prouvé pour tous les entiers.<br>Application : 1003² − 997² correspond à ${N} = 1000, donc vaut 12 000.`},
]},

/* ===================== ÉQUATIONS DU 1er ET DU 2e DEGRÉ ===================== */
{subj:'sec', sem:'a11', id:'sec11-equations', o:3, h:'Équations du 1er et du 2e degré', p:'Revoir le 1er degré, résoudre les équations du 2e degré par factorisation ou avec le discriminant, mettre un problème en équation et isoler une lettre dans une formule.', steps:[
 {kind:'Théorie',h:'Rappel : une équation est une balance',p:`<p>Sur une balance, trois sacs de billes identiques et 2 billes seules pèsent autant que 11 billes. Combien de billes y a-t-il dans un sac&nbsp;? C’est l’équation 3${X} + 2 = 11, que tu sais résoudre depuis l’an passé.</p>
<div class="def"><p>Une <b>équation</b> est une égalité qui contient une lettre, l’<b>inconnue</b>. Une <b>solution</b> est un nombre qui, mis à la place de l’inconnue, rend l’égalité vraie. <b>Résoudre</b>, c’est trouver toutes les solutions.</p></div>
<div class="prop"><p>On ne change pas les solutions si l’on <b>ajoute</b> (ou retranche) le même nombre des deux côtés, ou si l’on <b>multiplie</b> (ou divise) les deux côtés par le même nombre <b>non nul</b>. Ce sont les <b>règles d’équivalence</b>.</p></div>
<div class="idea"><p>Une balance en équilibre le reste si tu fais la même chose sur les deux plateaux. Retire 2 billes de chaque côté : 3${X} = 9. Partage chaque plateau en trois parts égales : ${X} = 3.</p></div>
<div class="ex"><p>On vérifie : 3 · 3 + 2 = 11 ✓. Avec ${X} = 4 : 3 · 4 + 2 = 14, qui n’est pas 11, donc 4 n’est pas solution.</p></div>
<p>Bouge le curseur : la balance n’est à l’horizontale que pour la solution.</p>`,
  params:[{id:'x',l:'x (billes par sac)',min:0,max:6,step:.5,v:1}],
  draw:v=>balance(v.x),
  info:v=>{ const L=3*v.x+2; return `Gauche : 3 · ${fmt(v.x)} + 2 = ${fmt(L)}. Droite : 11. ${L===11?'Équilibre : x = 3 est la solution.':L<11?'Le plateau de gauche est trop léger.':'Le plateau de gauche est trop lourd.'}`; }},
 {kind:'Méthode',h:'Résoudre une équation du 1er degré',p:`<b>Quand :</b> l’inconnue n’apparaît qu’à la puissance 1 (pas de ${X}²) : c’est une équation du <b>1er degré</b>. <b>Pourquoi ça marche :</b> chaque geste suit une règle d’équivalence, donc les solutions ne changent pas en chemin. <b>Comment :</b> 1) développe les parenthèses ; 2) s’il y a des fractions, multiplie <b>tous les termes</b> des deux côtés par un dénominateur commun ; 3) regroupe les termes en ${X} d’un côté et les nombres de l’autre ; 4) divise par le coefficient de ${X} ; 5) vérifie dans l’équation de départ. On note l’ensemble des solutions entre accolades : S = {6} se lit « l’ensemble des solutions contient le seul nombre 6 ».`,
  demo:{enonce:`Résoudre 3(${X} − 2) − 5 = ${F(X,2)} + 4.`,
   etapes:[
    {f:`3${X} − 6 − 5 = ${F(X,2)} + 4, soit 3${X} − 11 = ${F(X,2)} + 4`,w:`On développe : 3 multiplie ${X} et −2.`},
    {f:`6${X} − 22 = ${X} + 8`,w:'On multiplie les deux côtés par 2 pour chasser la fraction. Chaque terme est multiplié.'},
    {f:`6${X} − ${X} = 8 + 22, soit 5${X} = 30`,w:`On retire ${X} et on ajoute 22 des deux côtés.`},
    {f:`${X} = 6`,w:'On divise les deux côtés par 5.'},
    {f:`Vérification : 3 · 4 − 5 = 7 et ${F(6,2)} + 4 = 7 ✓`,w:`On remplace ${X} par 6 de chaque côté.`}],
   conclusion:'S = {6}.'}},
 {h:'À toi : 1er degré',p:`Résous ${F(`${X} + 1`,3)} + 2 = ${X} − 3.`,lab:'x =',ans:8,
  why:`On multiplie tout par 3 : ${X} + 1 + 6 = 3${X} − 9. Donc 16 = 2${X} et ${X} = 8. Vérification : ${F(9,3)} + 2 = 5 = 8 − 3 ✓.`},
 {kind:'Théorie',h:'Quand l’inconnue est au carré',p:`<p>Une dalle carrée de skatepark a une aire de 49 m². Quel est son côté&nbsp;? Il faut résoudre ${X}² = 49. L’inconnue est au carré : les règles d’équivalence seules ne suffisent plus.</p>
<div class="def"><p>Une <b>équation du 2e degré</b> s’écrit, une fois réduite, <b>${A}${X}² + ${B}${X} + <i>c</i> = 0</b> avec ${A} ≠ 0. Les nombres ${A}, ${B} et <i>c</i> sont ses <b>coefficients</b>.</p></div>
<div class="prop"><p>L’équation ${X}² = <i>k</i> a <b>deux</b> solutions, √<i>k</i> et −√<i>k</i>, si <i>k</i> &gt; 0 ; <b>une seule</b>, 0, si <i>k</i> = 0 ; <b>aucune</b> si <i>k</i> &lt; 0.</p></div>
<div class="why"><p>7² = 49 et (−7)² = 49 : deux nombres opposés ont le même carré. Et un carré n’est jamais négatif, donc ${X}² = −4 est impossible.</p></div>
<div class="ex"><p>${X}² = 49 donne ${X} = 7 ou ${X} = −7. Pour la dalle, une longueur est positive : le côté mesure 7 m. ${X}² = 5 donne ${X} = √5 ≈ 2,24 ou ${X} = −√5.</p></div>
<p>Sur le graphique, la courbe de ${X} ↦ ${X}² et la droite horizontale à la hauteur <i>k</i> se coupent en 2, 1 ou 0 points. Bouge <i>k</i>.</p>
<div class="blk" data-t="Le savais-tu ?"><p>Il y a près de 4000 ans, les scribes de Babylone résolvaient déjà des équations du 2e degré. Ils les écrivaient sur des tablettes d’argile, en parlant de longueurs et d’aires de champs.</p></div>`,
  params:[{id:'k',l:'k',min:-3,max:9,step:.5,v:4}],
  draw:v=>{ const P=plane({x:[-4,4],y:[-3.5,9.5],h:270,lab:1}); P.fn(x=>x*x,{from:-3.2,to:3.2}).seg(-4,v.k,4,v.k,{c:'var(--spark)',w:2.5});
    if(v.k>0) P.dot(-Math.sqrt(v.k),v.k,{c:'var(--accent)'}).dot(Math.sqrt(v.k),v.k,{c:'var(--accent)'}); else if(v.k===0) P.dot(0,0,{c:'var(--accent)'}); return P.svg(); },
  info:v=>v.k>0?`${X}² = ${fmt(v.k)} : deux solutions, ${X} ${Number.isInteger(Math.sqrt(v.k))?'=':'≈'} ${fmt(Math.sqrt(v.k))} et ${X} ${Number.isInteger(Math.sqrt(v.k))?'=':'≈'} −${fmt(Math.sqrt(v.k))}.`:v.k===0?`${X}² = 0 : une seule solution, ${X} = 0.`:`${X}² = −${fmt(-v.k)} : aucune solution, un carré n’est jamais négatif.`},
 {kind:'Théorie',h:'Le produit nul',p:`<p>Énigme : je pense à deux nombres et leur produit vaut 0. Que peux-tu dire&nbsp;? L’un des deux au moins vaut 0, forcément. Cette idée toute simple va résoudre des équations du 2e degré.</p>
<div class="thm"><p><b>Un produit est nul si et seulement si l’un de ses facteurs au moins est nul</b> : <i>P</i> · <i>Q</i> = 0 ⇔ <i>P</i> = 0 ou <i>Q</i> = 0. Le symbole ⇔ se lit « équivaut à » : les deux écritures ont les mêmes solutions.</p></div>
<div class="why"><p>Si <i>P</i> n’est pas 0, on peut diviser les deux côtés de <i>P</i> · <i>Q</i> = 0 par <i>P</i> : il reste <i>Q</i> = 0. Donc si un facteur n’est pas nul, c’est l’autre qui l’est. Le tableau le montre : les zéros n’apparaissent que dans la ligne et la colonne du 0.</p></div>
<div class="ex"><p>(${X} − 3)(2${X} + 5) = 0 ⇔ ${X} − 3 = 0 ou 2${X} + 5 = 0 ⇔ ${X} = 3 ou ${X} = −${F(5,2)}. Deux petites équations du 1er degré remplacent l’équation du 2e degré. S = {−${F(5,2)} ; 3}.</p></div>
<div class="warn"><p>Ça ne marche qu’avec 0 ! (${X} − 1)(${X} − 2) = 6 ne donne pas ${X} − 1 = 6, car 6 = 2 · 3 = 1 · 6 = 0,5 · 12… Il faut d’abord tout ramener à 0.</p></div>`,
  fig:tab([['×','0','1','2','3'],...[0,1,2,3].map(r=>[`<b>${r}</b>`,...[0,1,2,3].map(c=>r*c===0?'<b style="color:var(--bad)">0</b>':String(r*c))])])},
 {kind:'Méthode',h:'Résoudre en factorisant',p:`<b>Quand :</b> une équation du 2e degré (ou plus) dont tu sais factoriser un côté. <b>Pourquoi ça marche :</b> une fois l’équation écrite « produit = 0 », la règle du produit nul la coupe en équations du 1er degré. <b>Comment :</b> 1) ramène tout du même côté, pour avoir « … = 0 » ; 2) factorise avec les outils du chapitre précédent : mise en évidence, identités remarquables, somme et produit ; 3) applique le produit nul ; 4) résous chaque petite équation et vérifie.`,
  demo:{enonce:`Résoudre ${X}² = 5${X}.`,
   etapes:[
    {f:`${X}² − 5${X} = 0`,w:`On retire 5${X} des deux côtés : un côté vaut 0.`},
    {f:`${X}(${X} − 5) = 0`,w:`On met ${X} en évidence.`},
    {f:`${X} = 0 ou ${X} − 5 = 0`,w:'Produit nul : l’un des facteurs vaut 0.'},
    {f:`${X} = 0 ou ${X} = 5`,w:'Contrôle : 0² = 5 · 0 ✓ et 5² = 25 = 5 · 5 ✓.'}],
   conclusion:'S = {0 ; 5}.'},
  note:`<b>Piège :</b> diviser ${X}² = 5${X} par ${X} donne ${X} = 5 et fait perdre la solution 0. On ne divise jamais par ${X}, qui peut valoir 0. Autres exemples : ${X}² − 9 = 0 ⇔ (${X} − 3)(${X} + 3) = 0 ⇔ ${X} = 3 ou ${X} = −3 ; ${X}² + ${X} − 6 = 0 ⇔ (${X} + 3)(${X} − 2) = 0 ⇔ ${X} = −3 ou ${X} = 2.`},
 {h:'À toi : factorise, puis conclus',p:`Résous ${X}² − 2${X} − 15 = 0.`,opts:['S = {3 ; −5}','S = {−3 ; 5}','S = {2 ; 15}','S = {15}'],ans:1,
  why:`Produit −15 et somme −2 : 3 et −5. Donc ${X}² − 2${X} − 15 = (${X} + 3)(${X} − 5) = 0, et ${X} = −3 ou ${X} = 5.`},
 {kind:'Théorie',h:'Le discriminant : 0, 1 ou 2 solutions',p:`<p>Et si tu ne trouves pas de factorisation, comme pour ${X}² + 3${X} + 1 = 0&nbsp;? Il existe une formule qui marche toujours. Elle commence par un nombre qui annonce combien il y a de solutions.</p>
<div class="def"><p>Le <b>discriminant</b> de ${A}${X}² + ${B}${X} + <i>c</i> = 0 est <b>Δ = ${B}² − 4${A}<i>c</i></b> (Δ est la lettre grecque « delta »). Si Δ &gt; 0 : <b>deux</b> solutions. Si Δ = 0 : <b>une</b> seule. Si Δ &lt; 0 : <b>aucune</b>.</p></div>
<div class="thm"><p>Si Δ ≥ 0, les solutions sont <b>${X} = ${F(`−${B} + √Δ`,`2${A}`)}</b> et <b>${X} = ${F(`−${B} − √Δ`,`2${A}`)}</b>. On écrit les deux d’un coup : ${X} = ${F(`−${B} ± √Δ`,`2${A}`)}.</p></div>
<div class="why"><p>L’idée : on transforme l’équation pour arriver à la forme « (${X} + un nombre)² = <i>k</i> », qu’on sait résoudre. On trouve (${X} + ${F(B,`2${A}`)})² = ${F('Δ',`4${A}²`)}. Le côté droit a le signe de Δ : deux solutions s’il est positif, une s’il est nul, aucune s’il est négatif, exactement comme pour ${X}² = <i>k</i>.</p></div>
<div class="ex"><p>Pour ${X}² + 3${X} + 1 = 0 : Δ = 3² − 4 · 1 · 1 = 5 &gt; 0. Deux solutions, ${F('−3 ± √5',2)}, soit environ −0,38 et −2,62.</p></div>
<p>Sur le graphique, les solutions sont les points où la courbe <i>y</i> = ${A}${X}² + ${B}${X} + <i>c</i> coupe l’axe horizontal. Change les coefficients et observe Δ.</p>
<div class="blk" data-t="Le savais-tu ?"><p>Vers l’an 820, à Bagdad, le savant al-Khwarizmi résolvait ces équations en complétant des carrés dessinés. Le mot <b>algèbre</b> vient d’un mot de son titre, « al-jabr », et son nom a donné le mot <b>algorithme</b>.</p></div>`,
  params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'b',l:'b',min:-4,max:4,step:1,v:3},{id:'c',l:'c',min:-4,max:4,step:1,v:1}],
  draw:v=>parab(v.a,v.b,v.c),
  info:v=>`${pol([v.a,v.b,v.c])} = 0. ${sol2(v.a,v.b,v.c)}`},
 {kind:'Méthode',h:'La formule du discriminant',p:`<b>Quand :</b> elle marche pour toute équation ${A}${X}² + ${B}${X} + <i>c</i> = 0, et elle est indispensable quand tu ne trouves pas de factorisation. <b>Pourquoi ça marche :</b> elle vient de la mise sous la forme d’un carré, vue à l’étape précédente. <b>Comment :</b> 1) ramène l’équation à la forme ${A}${X}² + ${B}${X} + <i>c</i> = 0 et lis ${A}, ${B}, <i>c</i> <b>avec leurs signes</b> ; 2) calcule Δ = ${B}² − 4${A}<i>c</i> ; 3) selon le signe de Δ, conclus : aucune solution, une solution ${X} = ${F(`−${B}`,`2${A}`)}, ou deux solutions ${F(`−${B} ± √Δ`,`2${A}`)} ; 4) vérifie une solution dans l’équation.`,
  demo:{enonce:`Résoudre 2${X}² − 3${X} − 2 = 0.`,
   etapes:[
    {f:`${A} = 2, ${B} = −3, <i>c</i> = −2`,w:'On lit les coefficients avec leurs signes.'},
    {f:'Δ = (−3)² − 4 · 2 · (−2) = 9 + 16 = 25',w:'Attention : (−3)² = 9 et −4 · 2 · (−2) = +16.'},
    {f:'Δ = 25 &gt; 0 : deux solutions, et √25 = 5',w:'Δ est positif.'},
    {f:`${X} = ${F('3 + 5',4)} = 2 ou ${X} = ${F('3 − 5',4)} = −${F(1,2)}`,w:`−${B} = 3 et 2${A} = 4.`},
    {f:'Contrôle : 2 · 2² − 3 · 2 − 2 = 8 − 6 − 2 = 0 ✓',w:`On remplace ${X} par 2.`}],
   conclusion:`S = {−${F(1,2)} ; 2}.`},
  note:`Si Δ = 0, la formule donne deux fois la même valeur, ${X} = ${F(`−${B}`,`2${A}`)}. Exemple : ${X}² − 6${X} + 9 = 0 a pour discriminant 36 − 36 = 0, et ${X} = 3. En effet ${X}² − 6${X} + 9 = (${X} − 3)².`},
 {kind:'Pratique',h:'Une seule solution',p:`Règle <i>c</i> pour que l’équation ${X}² − 6${X} + <i>c</i> = 0 ait <b>exactement une</b> solution. Observe la courbe et la valeur de Δ.`,
  params:[{id:'c',l:'c',min:-5,max:15,step:1,v:2}],
  draw:v=>parab(1,-6,v.c,{x:[-2,8],y:[-8,10],h:290}),
  info:v=>`Δ = (−6)² − 4 · 1 · ${v.c<0?`(${fmt(v.c)})`:fmt(v.c)} = ${fmt(36-4*v.c)}. ${sol2(1,-6,v.c)}`,
  ok:v=>v.c===9,
  why:`Une seule solution quand Δ = 0 : 36 − 4<i>c</i> = 0, donc <i>c</i> = 9. Alors ${X}² − 6${X} + 9 = (${X} − 3)² et la courbe touche l’axe en ${X} = 3.`},
 {h:'À toi : la formule',p:`Résous 3${X}² + 5${X} − 2 = 0 avec le discriminant. Donne la plus grande solution (tu peux écrire une fraction).`,lab:'x =',ans:1/3,tol:.005,
  why:`Δ = 5² − 4 · 3 · (−2) = 25 + 24 = 49 et √49 = 7. ${X} = ${F('−5 + 7',6)} = ${F(1,3)} ou ${X} = ${F('−5 − 7',6)} = −2. La plus grande est ${F(1,3)}.`},
 {kind:'Méthode',h:'Mettre un problème en équation',p:`<p>Un problème en mots devient une équation en quatre temps. 1) <b>Choisir l’inconnue</b> : écris « Soit ${X} … » avec l’unité. 2) <b>Traduire</b> chaque phrase de l’énoncé avec ${X}. 3) <b>Résoudre</b> : règles d’équivalence au 1er degré ; factorisation ou discriminant au 2e degré. 4) <b>Vérifier et répondre</b> : une longueur, un âge ou un nombre d’objets doivent avoir du sens ; on rejette les solutions qui n’en ont pas. On rédige toujours : <b>phrase, calcul, réponse avec l’unité</b>.</p><div class="ex"><p>Au 1er degré. Léa a trois fois l’âge de son frère. Dans 4 ans, elle aura le double de son âge à lui. Soit ${X} l’âge du frère : 3${X} + 4 = 2(${X} + 4), donc 3${X} + 4 = 2${X} + 8 et ${X} = 4. Le frère a 4 ans et Léa 12 ans. Contrôle : dans 4 ans, 16 = 2 · 8 ✓.</p></div>`,
  demo:{enonce:'Un jardin rectangulaire a une longueur de 3 m de plus que sa largeur. Son aire vaut 40 m². Quelles sont ses dimensions ?',
   etapes:[
    {f:`Soit ${X} la largeur, en mètres. La longueur vaut ${X} + 3`,w:'On choisit l’inconnue et on traduit la première phrase.'},
    {f:`${X}(${X} + 3) = 40, soit ${X}² + 3${X} − 40 = 0`,w:'Aire = largeur × longueur. On développe et on ramène à 0.'},
    {f:`Produit −40 et somme 3 : 8 et −5. Donc (${X} + 8)(${X} − 5) = 0`,w:'Somme et produit. Le discriminant marche aussi : Δ = 9 + 160 = 169.'},
    {f:`${X} = −8 ou ${X} = 5. Une largeur est positive : ${X} = 5`,w:'On rejette la solution qui n’a pas de sens.'},
    {f:'Contrôle : 5 × 8 = 40 ✓',w:'Largeur 5 m, longueur 5 + 3 = 8 m.'}],
   conclusion:'Le jardin mesure 5 m de large et 8 m de long.'}},
 {kind:'Défi',h:'Deux pages qui se suivent',p:'Tu ouvres un livre au hasard. Le produit des numéros des deux pages que tu vois vaut 156. Quel est le plus petit des deux numéros&nbsp;?',lab:'page',ans:12,
  why:`Soit ${N} le plus petit numéro : ${N}(${N} + 1) = 156, soit ${N}² + ${N} − 156 = 0. Δ = 1 + 624 = 625 et √625 = 25, donc ${N} = ${F('−1 + 25',2)} = 12 (l’autre solution, −13, n’est pas un numéro de page). Autre stratégie, estimer puis essayer : ${N}² est un peu moins que 156, donc ${N} est proche de √156 ≈ 12,5. On essaie 12 × 13 = 156 ✓.`},
 {kind:'Méthode',h:'Isoler une variable dans une formule',p:`<b>Quand :</b> une formule donne une grandeur, mais tu en cherches une autre. Exemple : <i>d</i> = <i>vt</i> donne la distance, et tu veux le temps <i>t</i>. <b>Pourquoi ça marche :</b> une formule est une équation ; les autres lettres sont des nombres connus, donc les règles d’équivalence s’appliquent. <b>Comment :</b> repère la lettre à isoler, puis « défais » les opérations qui l’entourent, de l’extérieur vers l’intérieur, en faisant la même chose des deux côtés. Exemples : <i>d</i> = <i>vt</i> ⇔ <i>t</i> = ${F('<i>d</i>','<i>v</i>')} ; <i>A</i> = ${F('<i>bh</i>',2)} ⇔ 2<i>A</i> = <i>bh</i> ⇔ <i>h</i> = ${F('2<i>A</i>','<i>b</i>')} ; <i>p</i> = 2(${A} + ${B}) ⇔ ${F('<i>p</i>',2)} = ${A} + ${B} ⇔ ${A} = ${F('<i>p</i>',2)} − ${B} ; <i>A</i> = π<i>r</i>² ⇔ <i>r</i>² = ${F('<i>A</i>','π')} ⇔ <i>r</i> = √(<i>A</i>/π), en gardant la racine positive car c’est une longueur.`,
  demo:{enonce:`Dans la formule de l’aire du trapèze, <i>A</i> = ${F('(<i>B</i> + <i>b</i>)<i>h</i>',2)}, isoler la hauteur <i>h</i>.`,
   etapes:[
    {f:'2<i>A</i> = (<i>B</i> + <i>b</i>)<i>h</i>',w:'On multiplie les deux côtés par 2.'},
    {f:`<i>h</i> = ${F('2<i>A</i>','<i>B</i> + <i>b</i>')}`,w:'On divise les deux côtés par la parenthèse entière (<i>B</i> + <i>b</i>).'},
    {f:`Test : <i>B</i> = 7, <i>b</i> = 3, <i>h</i> = 4 donnent <i>A</i> = ${F('10 · 4',2)} = 20, et ${F('2 · 20','7 + 3')} = 4 ✓`,w:'On contrôle avec des nombres simples.'}],
   conclusion:`<i>h</i> = ${F('2<i>A</i>','<i>B</i> + <i>b</i>')}. De même pour le volume du cône, <i>V</i> = ${F('π<i>r</i>²<i>h</i>',3)} : 3<i>V</i> = π<i>r</i>²<i>h</i>, donc <i>h</i> = ${F('3<i>V</i>','π<i>r</i>²')}.`}},
 {h:'À toi : isole le rayon',p:`Le volume d’un cône est <i>V</i> = ${F('π<i>r</i>²<i>h</i>',3)}. Isole le rayon <i>r</i>.`,
  opts:[`<i>r</i> = √(${F('3<i>V</i>','π<i>h</i>')})`,`<i>r</i> = ${F('3<i>V</i>','π<i>h</i>')}`,`<i>r</i> = √(${F('<i>V</i>','3π<i>h</i>')})`,`<i>r</i> = ${F('√(3<i>V</i>)','π<i>h</i>')}`],ans:0,
  why:`On multiplie par 3 : 3<i>V</i> = π<i>r</i>²<i>h</i>. On divise par π<i>h</i> : <i>r</i>² = ${F('3<i>V</i>','π<i>h</i>')}. Puis on prend la racine positive : <i>r</i> = √(${F('3<i>V</i>','π<i>h</i>')}).`},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : équations',p:`<div class="keep"><ul>
<li><b>Règles d’équivalence</b> : ajouter le même nombre des deux côtés, multiplier les deux côtés par le même nombre non nul. Toujours vérifier la solution.</li>
<li><b>1er degré</b> : développer, chasser les fractions, regrouper, diviser par le coefficient de ${X}.</li>
<li><b>${X}² = <i>k</i></b> : deux solutions ±√<i>k</i> si <i>k</i> &gt; 0, une (0) si <i>k</i> = 0, aucune si <i>k</i> &lt; 0.</li>
<li><b>Produit nul</b> : <i>P</i> · <i>Q</i> = 0 ⇔ <i>P</i> = 0 ou <i>Q</i> = 0. Seulement avec 0 ! On ramène tout à 0, on factorise, puis on coupe en petites équations. On ne divise jamais par ${X}.</li>
<li><b>Discriminant</b> de ${A}${X}² + ${B}${X} + <i>c</i> = 0 : Δ = ${B}² − 4${A}<i>c</i>. Deux solutions ${F(`−${B} ± √Δ`,`2${A}`)} si Δ &gt; 0, une (${F(`−${B}`,`2${A}`)}) si Δ = 0, aucune si Δ &lt; 0.</li>
<li><b>Mettre en équation</b> : choisir l’inconnue avec son unité, traduire, résoudre, garder les solutions qui ont du sens, répondre par une phrase.</li>
<li><b>Isoler une variable</b> : défaire les opérations de l’extérieur vers l’intérieur ; pour un carré, prendre la racine positive d’une longueur.</li></ul></div>`},
 {kind:'Problème',h:'Le cadre de l’affiche',
  p:`Tu veux encadrer l’affiche de ton film préféré. Elle mesure 30 cm sur 20 cm. Le cadre a partout la même largeur ${X} cm, si bien que l’ensemble (affiche et cadre) mesure (30 + 2${X}) cm sur (20 + 2${X}) cm. Le magasin propose un cadre tel que l’ensemble occupe 1200 cm² sur le mur. On cherche la largeur du cadre.`,
  fig:(()=>{ const P=plane({x:[-1,11],y:[-1,8],grid:false,axes:false});
    P.rect(0,0,10,7,{c:'var(--ink)',w:1.5,fill:'var(--spark)',fo:.3}).rect(1.2,1.2,7.6,4.6,{c:'var(--ink)',w:1.5,fill:'var(--accent)',fo:.2});
    P.text(5,3.5,'affiche 30 × 20',{a:'middle',dy:5}).text(.6,3.5,'x',{a:'middle',dy:4,c:'var(--muted)'}).text(5,.6,'x',{a:'middle',dy:4,c:'var(--muted)'}).text(5,0,'30 + 2x',{a:'middle',dy:17,c:'var(--muted)'});
    return P.svg(); })(),
  parts:[
   {q:'a) Avec un cadre de 2 cm de large, quelle est l’aire du cadre seul&nbsp;?',unit:'cm²',ans:216,hint:'Aire de l’ensemble moins aire de l’affiche.',why:'L’ensemble mesure 34 cm sur 24 cm : 816 cm². On retire l’affiche (600 cm²) : il reste 216 cm².'},
   {q:`b) L’équation (30 + 2${X})(20 + 2${X}) = 1200, développée, ramenée à 0 puis divisée par 4, devient ${X}² + 25${X} + <i>c</i> = 0. Que vaut <i>c</i>&nbsp;?`,lab:'c =',ans:-150,hint:'Développe : 600 + 60x + 40x + 4x². Retire 1200 des deux côtés.',why:`4${X}² + 100${X} + 600 = 1200 ⇔ 4${X}² + 100${X} − 600 = 0 ⇔ ${X}² + 25${X} − 150 = 0. Donc <i>c</i> = −150.`},
   {q:`c) Calcule le discriminant de ${X}² + 25${X} − 150 = 0.`,lab:'Δ =',ans:1225,hint:'Δ = b² − 4ac avec a = 1, b = 25, c = −150.',why:'Δ = 625 − 4 · 1 · (−150) = 625 + 600 = 1225 = 35².'},
   {q:'d) Quelle est la largeur du cadre&nbsp;?',lab:'x =',unit:'cm',ans:5,hint:'Applique la formule et garde la solution qui a du sens.',why:`${X} = ${F('−25 + 35',2)} = 5 ou ${X} = ${F('−25 − 35',2)} = −30. Une largeur est positive : 5 cm.`},
  ],
  sol:`Soit ${X} la largeur du cadre, en cm. L’ensemble mesure (30 + 2${X}) sur (20 + 2${X}).<br>(30 + 2${X})(20 + 2${X}) = 1200 ⇔ 4${X}² + 100${X} − 600 = 0 ⇔ ${X}² + 25${X} − 150 = 0.<br>Δ = 625 + 600 = 1225 et √1225 = 35, donc ${X} = 5 ou ${X} = −30.<br>On garde ${X} = 5. Contrôle : 40 × 30 = 1200 ✓.<br>Réponse : le cadre a une largeur de 5 cm.`},
 {kind:'Problème',h:'Le tournoi de ping-pong',
  p:`Pour la fête de la classe, tu organises un tournoi de ping-pong : chaque joueur affronte chaque autre joueur une seule fois. Avec ${N} joueurs, chacun joue ${N} − 1 matchs. Si l’on compte ainsi, chaque match est compté deux fois (une fois par joueur). Le nombre de matchs est donc <i>M</i> = ${F(`${N}(${N} − 1)`,2)}.`,
  parts:[
   {q:'a) Combien de matchs faut-il prévoir avec 6 joueurs&nbsp;?',unit:'matchs',ans:15,hint:'Remplace n par 6 dans la formule.',why:`<i>M</i> = ${F('6 · 5',2)} = 15 matchs.`},
   {q:'b) Le programme de la fête annonce 45 matchs. Combien y a-t-il de joueurs&nbsp;?',lab:'n =',ans:10,hint:'Écris n(n − 1) = 90, ramène à 0, puis utilise le discriminant.',why:`${N}² − ${N} − 90 = 0 : Δ = 1 + 360 = 361 = 19², donc ${N} = ${F('1 + 19',2)} = 10 (l’autre solution, −9, est impossible).`},
   {q:'c) Peut-on organiser un tel tournoi avec exactement 50 matchs&nbsp;?',opts:['Oui, avec 10 joueurs','Oui, avec 11 joueurs','Non : Δ = 401 n’est pas un carré parfait, la solution positive (environ 10,5) n’est pas un nombre entier','Non, car le discriminant est négatif'],ans:2,hint:'Écris l’équation n² − n − 100 = 0 et regarde si sa solution est un entier.',why:`${N}² − ${N} − 100 = 0 : Δ = 1 + 400 = 401, et √401 ≈ 20,02. ${N} ≈ 10,51 n’est pas un entier. D’ailleurs 10 joueurs font 45 matchs et 11 joueurs en font 55.`},
   {q:'d) Il n’y a qu’une table et chaque match dure 10 minutes. Le tournoi doit durer au plus 4 heures. Combien de joueurs peut-on inviter au maximum&nbsp;?',lab:'n =',ans:7,hint:'4 heures permettent combien de matchs ? Puis essaie quelques valeurs de n dans la formule.',why:`4 h = 240 min, soit au plus 24 matchs. 7 joueurs : ${F('7 · 6',2)} = 21 matchs ✓. 8 joueurs : ${F('8 · 7',2)} = 28 matchs, c’est trop. Au maximum 7 joueurs.`},
  ],
  sol:`<i>M</i> = ${F(`${N}(${N} − 1)`,2)}. Pour 6 joueurs : 15 matchs.<br>45 matchs : ${N}(${N} − 1) = 90 ⇔ ${N}² − ${N} − 90 = 0. Δ = 361, √Δ = 19, ${N} = 10 ou ${N} = −9 : il y a 10 joueurs.<br>50 matchs : ${N}² − ${N} − 100 = 0 a pour discriminant 401, qui n’est pas un carré parfait ; la solution positive vaut environ 10,51, ce n’est pas un nombre de joueurs. Impossible.<br>En 4 h, on joue au plus 240 : 10 = 24 matchs. 7 joueurs donnent 21 matchs, 8 joueurs 28 : on invite au plus 7 joueurs.`},
]},

/* ===================== SYSTÈMES D’ÉQUATIONS ===================== */
{subj:'sec', sem:'a11', id:'sec11-systemes', o:9, h:'Systèmes d’équations', p:'Deux inconnues, deux équations : lire la solution au croisement de deux droites, la calculer par substitution ou par combinaison, et mettre un problème en système.', steps:[
 {kind:'Théorie',h:'Une équation, deux inconnues',p:`<p>Au marché, un pot de miel coûte ${X} francs et un pot de confiture ${Y} francs. Deux pots de miel et trois pots de confiture coûtent 24 CHF : 2${X} + 3${Y} = 24. Peux-tu trouver les deux prix&nbsp;?</p>
<div class="def"><p>Une équation à <b>deux inconnues</b>, comme 2${X} + 3${Y} = 24, a pour solutions des <b>couples</b> de nombres, notés (${X} ; ${Y}) : d’abord la valeur de ${X}, puis celle de ${Y}. L’ordre compte.</p></div>
<div class="ex"><p>(6 ; 4) est solution, car 2 · 6 + 3 · 4 = 12 + 12 = 24. (3 ; 6) aussi : 6 + 18 = 24. Mais (4 ; 6) ne l’est pas : 8 + 18 = 26. Une seule équation a une <b>infinité</b> de solutions : tu choisis ${X}, et ${Y} s’en déduit.</p></div>
<div class="idea"><p>Place chaque couple solution comme un point dans un repère : tous ces points sont alignés sur une <b>droite</b>. Bouge le curseur : le point glisse sur la droite et l’égalité reste vraie.</p></div>
<div class="warn"><p>Avec une seule équation, impossible de connaître les deux prix : miel à 6 CHF et confiture à 4 CHF, ou miel à 3 CHF et confiture à 6 CHF ? Il faudra une deuxième information.</p></div>`,
  params:[{id:'x',l:'x (prix du miel)',min:0,max:12,step:1.5,v:3}],
  draw:v=>{ const P=droites([{a:-2/3,b:8}],{x:[-1,13],y:[-1,9.5]}); P.dot(v.x,(24-2*v.x)/3,{l:`(${fmt(v.x)} ; ${fmt((24-2*v.x)/3)})`}); return P.svg(); },
  info:v=>`2 · ${fmt(v.x)} + 3 · ${fmt((24-2*v.x)/3)} = ${fmt(2*v.x)} + ${fmt(24-2*v.x)} = 24 ✓ : le couple (${fmt(v.x)} ; ${fmt((24-2*v.x)/3)}) est solution.`},
 {kind:'Méthode',h:'Isoler une variable',p:`<b>Quand :</b> pour dessiner la droite d’une équation comme 2${X} + 3${Y} = 24, pour calculer ${Y} quand on connaît ${X}, ou pour la méthode de substitution (plus loin). C’est aussi ce que tu fais avec une formule de géométrie ou de physique. <b>Pourquoi ça marche :</b> on applique les règles d’équivalence en traitant l’autre lettre comme un nombre connu. <b>Comment :</b> 1) laisse seul le terme qui contient ${Y} d’un côté, en passant le reste de l’autre côté ; 2) divise <b>chaque terme</b> par le coefficient de ${Y}. On obtient ${Y} = ${A}${X} + ${B} : la droite de pente ${A} et d’ordonnée à l’origine ${B}, vue avec les fonctions.`,
  demo:{enonce:`Isoler ${Y} dans 4${X} − 2${Y} = 6.`,
   etapes:[
    {f:`−2${Y} = 6 − 4${X}`,w:`On retire 4${X} des deux côtés.`},
    {f:`${Y} = ${F('6','−2')} − ${F(`4${X}`,'−2')} = −3 + 2${X}`,w:'On divise chaque terme par −2. Attention aux signes.'},
    {f:`${Y} = 2${X} − 3`,w:'On ordonne : pente 2, ordonnée à l’origine −3.'},
    {f:`Contrôle avec ${X} = 1 : ${Y} = −1, et 4 · 1 − 2 · (−1) = 4 + 2 = 6 ✓`,w:'Un couple de la droite vérifie l’équation de départ.'}],
   conclusion:`4${X} − 2${Y} = 6 ⇔ ${Y} = 2${X} − 3. Même idée pour une formule : le périmètre d’un rectangle <i>P</i> = 2(<i>L</i> + <i>l</i>) donne <i>l</i> = ${F('<i>P</i>',2)} − <i>L</i>.`}},
 {h:'À toi : isole y',p:`Isole ${Y} dans 3${X} + 5${Y} = 10.`,opts:[`${Y} = 10 − 3${X}`,`${Y} = 2 − ${F(3,5)}${X}`,`${Y} = 2 − 3${X}`,`${Y} = ${F(3,5)}${X} + 2`],ans:1,
  why:`5${Y} = 10 − 3${X}, puis on divise <b>chaque</b> terme par 5 : ${Y} = 2 − ${F(3,5)}${X}.`},
 {kind:'Théorie',h:'Un système : deux conditions à la fois',p:`<p>Énigme : je pense à deux nombres. Leur somme vaut 10 et leur différence vaut 4. Avec une seule de ces deux informations, il y a une infinité de couples. Avec les deux ensemble, un seul couple convient : 7 et 3.</p>
<div class="def"><p>Un <b>système de deux équations à deux inconnues</b> s’écrit avec une accolade : ${SYS(`${X} + ${Y} = 10`,`${X} − ${Y} = 4`)}. Une <b>solution</b> du système est un couple (${X} ; ${Y}) qui vérifie <b>les deux</b> équations en même temps. <b>Résoudre</b> le système, c’est trouver tous ces couples.</p></div>
<div class="ex"><p>(7 ; 3) : 7 + 3 = 10 ✓ et 7 − 3 = 4 ✓. C’est une solution. (6 ; 4) vérifie la première équation (6 + 4 = 10) mais pas la seconde (6 − 4 = 2) : ce n’est pas une solution du système.</p></div>
<div class="idea"><p>Chaque équation est une droite. Une solution du système est sur les deux droites à la fois : c’est un <b>point d’intersection</b>. Sur la figure, les droites ${Y} = 10 − ${X} et ${Y} = ${X} − 4 se croisent en (7 ; 3).</p></div>
<div class="warn"><p>Pour vérifier un couple, teste <b>les deux</b> équations. Une seule ne suffit pas.</p></div>`,
  fig:(()=>{ const P=droites([{a:-1,b:10},{a:1,b:-4,c:'var(--spark)'}],{x:[-1,11],y:[-5,11],lab:2}); P.dot(7,3,{l:'(7 ; 3)',c:'var(--ok)'}).text(2.4,9.4,'x + y = 10',{c:'var(--accent)'}).text(7.6,1.2,'x − y = 4',{c:'var(--spark)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Résolution graphique : deux droites qui se croisent',p:`<p>Deux trottinettes roulent sur la même piste. On trace la position de chacune en fonction du temps : deux droites. Le moment où elles se croisent, c’est le point d’intersection. Résoudre un système, c’est trouver ce point.</p>
<div class="prop"><p>Si les deux équations s’écrivent ${Y} = <i>a</i>₁${X} + <i>b</i>₁ et ${Y} = <i>a</i>₂${X} + <i>b</i>₂, la solution du système est le <b>point d’intersection</b> des deux droites. Ses coordonnées (${X} ; ${Y}) forment le couple solution.</p></div>
<div class="idea"><p>Un point de la première droite vérifie la première équation, un point de la seconde vérifie la seconde. Le point commun vérifie les deux. Si les pentes <i>a</i>₁ et <i>a</i>₂ sont différentes, les droites se coupent en <b>un seul</b> point.</p></div>
<div class="ex"><p>${Y} = ${X} + 1 et ${Y} = −${X} + 5 se croisent en (2 ; 3) : 3 = 2 + 1 ✓ et 3 = −2 + 5 ✓.</p></div>
<div class="warn"><p>Un graphique est parfois imprécis : si le croisement tombe entre deux carreaux, tu ne lis qu’une valeur approchée. Le calcul (méthodes suivantes) donne la valeur exacte.</p></div>
<p>Bouge les curseurs des deux droites et suis le point de croisement.</p>`,
  params:[{id:'a1',l:'pente a₁',min:-3,max:3,step:.5,v:1},{id:'b1',l:'ordonnée b₁',min:-5,max:5,step:1,v:1},{id:'a2',l:'pente a₂',min:-3,max:3,step:.5,v:-1},{id:'b2',l:'ordonnée b₂',min:-5,max:5,step:1,v:5}],
  draw:v=>{ const P=droites([{a:v.a1,b:v.b1},{a:v.a2,b:v.b2,c:'var(--spark)'}]);
    if(v.a1!==v.a2){ const x=(v.b2-v.b1)/(v.a1-v.a2), y=v.a1*x+v.b1; if(Math.abs(x)<6&&Math.abs(y)<6) P.dot(x,y,{c:'var(--ok)'}); } return P.svg(); },
  info:v=>{ const d=`${droite(v.a1,v.b1)} et ${droite(v.a2,v.b2)} : `;
    if(v.a1===v.a2) return d+(v.b1===v.b2?'la même droite, une infinité de points communs.':'droites parallèles, aucun point commun.');
    const x=(v.b2-v.b1)/(v.a1-v.a2), y=v.a1*x+v.b1, e=t=>Math.abs(t*100-Math.round(t*100))<1e-9?'=':'≈';
    return d+`elles se croisent en ${X} ${e(x)} ${fmt(x)}, ${Y} ${e(y)} ${fmt(y)}.`; }},
 {kind:'Méthode',h:'Résoudre graphiquement',p:`<b>Quand :</b> pour voir la situation d’un coup d’œil, ou pour trouver la solution quand les nombres sont simples. <b>Pourquoi ça marche :</b> la solution est le point commun aux deux droites. <b>Comment :</b> 1) isole ${Y} dans chaque équation ; 2) pour chaque droite, calcule deux points (par exemple pour ${X} = 0 et pour un autre ${X} simple) et trace la droite ; 3) lis les coordonnées du point d’intersection ; 4) vérifie le couple dans les <b>deux</b> équations de départ, car une lecture peut être fausse.`,
  demo:{enonce:`Résoudre graphiquement ${SYS(`${X} + ${Y} = 5`,`2${X} − ${Y} = 1`)}.`,
   etapes:[
    {f:`${Y} = 5 − ${X} et ${Y} = 2${X} − 1`,w:`On isole ${Y} dans chaque équation.`},
    {f:'1re droite : (0 ; 5) et (5 ; 0). 2e droite : (0 ; −1) et (2 ; 3)',w:'Deux points suffisent pour tracer une droite.'},
    {f:'Les droites se croisent en (2 ; 3)',w:'On lit les coordonnées sur le graphique.'},
    {f:'2 + 3 = 5 ✓ et 2 · 2 − 3 = 1 ✓',w:'Le couple vérifie les deux équations : la lecture est juste.'}],
   conclusion:'La solution du système est le couple (2 ; 3).'},
  fig:(()=>{ const P=droites([{a:-1,b:5},{a:2,b:-1,c:'var(--spark)'}]); P.dot(0,5,{r:4,c:'var(--accent)'}).dot(5,0,{r:4,c:'var(--accent)'}).dot(0,-1,{r:4,c:'var(--spark)'}).dot(2,3,{l:'(2 ; 3)',c:'var(--ok)'}); return P.svg(); })()},
 {kind:'Pratique',h:'Pose le point au croisement',p:`Les droites ${Y} = −${X} + 4 et ${Y} = 2${X} − 5 sont tracées. Déplace le point avec les curseurs jusqu’à leur intersection.`,
  params:[{id:'px',l:'x du point',min:-5,max:5,step:1,v:0},{id:'py',l:'y du point',min:-5,max:5,step:1,v:0}],
  draw:v=>{ const P=droites([{a:-1,b:4},{a:2,b:-5,c:'var(--spark)'}]); P.dot(v.px,v.py,{c:'var(--ok)',l:`(${fmt(v.px)} ; ${fmt(v.py)})`}); return P.svg(); },
  info:v=>{ const p=t=>t<0?`(${fmt(t)})`:fmt(t); return `Avec ${X} = ${fmt(v.px)} : 1re droite ${Y} = −${p(v.px)} + 4 = ${fmt(-v.px+4)} ${-v.px+4===v.py?'✓':'✗'} ; 2e droite ${Y} = 2 · ${p(v.px)} − 5 = ${fmt(2*v.px-5)} ${2*v.px-5===v.py?'✓':'✗'}. Ton point a ${Y} = ${fmt(v.py)}.`; },
  ok:v=>v.px===3&&v.py===1,
  why:`Le point (3 ; 1) est sur les deux droites : −3 + 4 = 1 et 2 · 3 − 5 = 1. C’est la solution du système ${SYS(`${Y} = −${X} + 4`,`${Y} = 2${X} − 5`)}.`},
 {kind:'Méthode',h:'La méthode de substitution',p:`<b>Quand :</b> une des équations donne déjà une inconnue seule (${Y} = … ou ${X} = …), ou une inconnue a le coefficient 1 et s’isole facilement. <b>Pourquoi ça marche :</b> dans une solution, ${Y} et l’expression qui lui est égale sont le même nombre : on peut <b>remplacer</b> (substituer) l’un par l’autre. Il ne reste qu’une équation à une seule inconnue, du 1er degré, que tu sais résoudre. <b>Comment :</b> 1) isole une inconnue dans une équation ; 2) remplace-la dans l’<b>autre</b> équation, entre parenthèses ; 3) résous ; 4) reviens à l’expression isolée pour trouver la seconde inconnue ; 5) vérifie dans les deux équations.`,
  demo:{enonce:`Résoudre ${SYS(`${Y} = 2${X} − 1`,`3${X} + 2${Y} = 12`)}.`,
   etapes:[
    {f:`3${X} + 2(2${X} − 1) = 12`,w:`On remplace ${Y} par 2${X} − 1 dans la 2e équation, avec des parenthèses.`},
    {f:`3${X} + 4${X} − 2 = 12, soit 7${X} = 14, donc ${X} = 2`,w:'Une équation à une inconnue, du 1er degré.'},
    {f:`${Y} = 2 · 2 − 1 = 3`,w:`On revient à l’expression de ${Y}.`},
    {f:'Contrôle : 3 = 4 − 1 ✓ et 3 · 2 + 2 · 3 = 12 ✓',w:'Les deux équations sont vérifiées.'}],
   conclusion:'La solution est le couple (2 ; 3). On écrit S = {(2 ; 3)}.'}},
 {h:'À toi : substitue',p:`Résous ${SYS(`${X} = 3${Y} + 1`,`2${X} − 5${Y} = 4`)} et donne la valeur de ${X}.`,lab:'x =',ans:7,
  why:`On remplace ${X} : 2(3${Y} + 1) − 5${Y} = 4, soit 6${Y} + 2 − 5${Y} = 4, donc ${Y} = 2. Puis ${X} = 3 · 2 + 1 = 7. Contrôle : 14 − 10 = 4 ✓.`},
 {kind:'Méthode',h:'La méthode de combinaison (addition)',p:`<p><b>Quand :</b> aucune inconnue n’est seule et les coefficients ne valent pas 1, ou une inconnue a des coefficients opposés dans les deux équations (comme +2${Y} et −2${Y}). <b>Pourquoi ça marche :</b> si <i>P</i> = <i>Q</i> et <i>R</i> = <i>S</i>, alors <i>P</i> + <i>R</i> = <i>Q</i> + <i>S</i> : additionner deux égalités vraies donne une égalité vraie. Si les termes en ${Y} sont opposés, ils s’annulent et ${Y} disparaît. <b>Comment :</b> 1) si nécessaire, multiplie une équation (ou les deux) par un nombre, <b>tous les termes</b>, pour obtenir des coefficients opposés devant une inconnue ; 2) additionne les équations membre à membre ; 3) résous l’équation obtenue ; 4) remplace dans une équation de départ pour trouver l’autre inconnue ; 5) vérifie.</p><div class="blk" data-t="Le savais-tu ?"><p>Il y a plus de 2000 ans, des savants chinois résolvaient déjà des systèmes en posant des baguettes à calculer sur une table. Leur méthode, qui combine les lignes entre elles, ressemble beaucoup à celle-ci.</p></div>`,
  demo:{enonce:`Résoudre ${SYS(`2${X} + 3${Y} = 8`,`3${X} − 2${Y} = −1`)}.`,
   etapes:[
    {f:`× 2 : 4${X} + 6${Y} = 16 ; × 3 : 9${X} − 6${Y} = −3`,w:`On veut +6${Y} et −6${Y} : on multiplie la 1re équation par 2 et la 2e par 3.`},
    {f:`13${X} = 13, donc ${X} = 1`,w:`On additionne membre à membre : les ${Y} s’annulent.`},
    {f:`2 · 1 + 3${Y} = 8, soit 3${Y} = 6, donc ${Y} = 2`,w:`On remplace ${X} par 1 dans la 1re équation.`},
    {f:'Contrôle : 3 · 1 − 2 · 2 = −1 ✓',w:'On vérifie la 2e équation.'}],
   conclusion:'S = {(1 ; 2)}.'}},
 {h:'À toi : combine',p:`Résous ${SYS(`5${X} + 2${Y} = 4`,`3${X} − 4${Y} = 18`)} et donne la valeur de ${Y}.`,lab:'y =',ans:-3,
  why:`On multiplie la 1re par 2 : 10${X} + 4${Y} = 8. On additionne avec la 2e : 13${X} = 26, donc ${X} = 2. Puis 10 + 2${Y} = 4, donc ${Y} = −3. Contrôle : 6 + 12 = 18 ✓.`},
 {kind:'Théorie',h:'Aucune solution ou une infinité',p:`<p>Énigme piège : « Deux nombres ont une somme de 5, et aussi une somme de 8. » Impossible ! Autre énigme : « Deux nombres ont une somme de 5, et le double de leur somme vaut 10. » La deuxième phrase ne dit rien de nouveau.</p>
<div class="prop"><p>Un système de deux équations du 1er degré a :</p><ul><li><b>une seule</b> solution si les droites ont des pentes différentes : elles se coupent ;</li><li><b>aucune</b> solution si elles sont <b>parallèles</b> et distinctes (même pente, ordonnées à l’origine différentes) ;</li><li>une <b>infinité</b> de solutions si elles sont <b>confondues</b>, c’est-à-dire si c’est la même droite.</li></ul></div>
<div class="ex"><p>${SYS(`${X} + ${Y} = 5`,`${X} + ${Y} = 8`)} : ${Y} = 5 − ${X} et ${Y} = 8 − ${X} ont la même pente −1. Aucune solution. En soustrayant, on obtient 0 = 3, une égalité fausse.</p><p>${SYS(`${X} + ${Y} = 5`,`2${X} + 2${Y} = 10`)} : la 2e équation est la 1re multipliée par 2, c’est la même droite. En combinant, on obtient 0 = 0, toujours vrai : tous les couples de la droite conviennent.</p></div>
<div class="idea"><p>Quand le calcul fait disparaître les deux inconnues, regarde ce qui reste : une égalité fausse (0 = 3) signifie aucune solution, une égalité toujours vraie (0 = 0) une infinité.</p></div>
<p>La droite ${X} + ${Y} = 5 est fixe. Règle la seconde pour la rendre parallèle, puis confondue.</p>`,
  params:[{id:'a',l:'pente de la 2e droite',min:-3,max:1,step:.5,v:.5},{id:'b',l:'ordonnée à l’origine',min:-2,max:8,step:1,v:1}],
  draw:v=>{ const P=droites([{a:-1,b:5},{a:v.a,b:v.b,c:'var(--spark)',dash:v.a===-1&&v.b===5}]);
    if(v.a!==-1){ const x=(5-v.b)/(v.a+1), y=5-x; if(Math.abs(x)<6&&Math.abs(y)<6) P.dot(x,y,{c:'var(--ok)'}); } return P.svg(); },
  info:v=>`${Y} = −${X} + 5 et ${droite(v.a,v.b)} : `+(v.a!==-1?'pentes différentes, une seule solution.':v.b===5?'même droite, une infinité de solutions.':'droites parallèles, aucune solution.')},
 {h:'Combien de solutions ?',p:`Combien de solutions le système ${SYS(`2${X} − ${Y} = 3`,`−4${X} + 2${Y} = 6`)} a-t-il&nbsp;?`,opts:['Une seule','Aucune','Une infinité','Deux'],ans:1,
  why:`On isole ${Y} : ${Y} = 2${X} − 3 et ${Y} = 2${X} + 3. Même pente 2, ordonnées à l’origine différentes : droites parallèles, aucune solution. Par combinaison (1re × 2, plus la 2e), on obtient 0 = 12, une égalité fausse.`},
 {kind:'Méthode',h:'Mettre un problème en système',p:`<b>Quand :</b> un problème parle de deux quantités inconnues liées par deux informations : deux prix, deux sortes de pièces, deux ingrédients d’un mélange. <b>Pourquoi ça marche :</b> chaque information devient une équation ; ensemble, elles fixent les deux inconnues. <b>Comment :</b> 1) choisis deux lettres et écris ce qu’elles représentent, avec l’unité ; 2) traduis chaque information par une équation ; 3) choisis la méthode : substitution si une inconnue est presque seule, combinaison sinon ; 4) vérifie avec l’énoncé et rédige : <b>phrase, calcul, réponse avec l’unité</b>.`,
  demo:{enonce:'Au cinéma, 3 billets adulte et 2 billets enfant coûtent 62 CHF. 2 billets adulte et 5 billets enfant coûtent 67 CHF. Quel est le prix de chaque billet ?',
   etapes:[
    {f:'Soit <i>a</i> le prix d’un billet adulte et <i>e</i> celui d’un billet enfant, en CHF',w:'On nomme les inconnues, avec l’unité.'},
    {f:SYS('3<i>a</i> + 2<i>e</i> = 62','2<i>a</i> + 5<i>e</i> = 67'),w:'Chaque phrase donne une équation.'},
    {f:'× 2 : 6<i>a</i> + 4<i>e</i> = 124 ; × (−3) : −6<i>a</i> − 15<i>e</i> = −201',w:'On cherche des coefficients opposés devant <i>a</i>.'},
    {f:'−11<i>e</i> = −77, donc <i>e</i> = 7',w:'On additionne : les <i>a</i> disparaissent.'},
    {f:'3<i>a</i> + 14 = 62, donc 3<i>a</i> = 48 et <i>a</i> = 16',w:'On remplace <i>e</i> par 7 dans la 1re équation.'},
    {f:'Contrôle : 2 · 16 + 5 · 7 = 32 + 35 = 67 ✓',w:'On vérifie avec l’autre information.'}],
   conclusion:'Un billet adulte coûte 16 CHF et un billet enfant 7 CHF.'}},
 {kind:'Défi',h:'Poules et lapins',p:'Dans une ferme, on compte 20 têtes et 56 pattes. Il n’y a que des poules (2 pattes) et des lapins (4 pattes). Combien y a-t-il de lapins&nbsp;?',lab:'lapins',ans:8,
  why:`Système : ${SYS('<i>p</i> + <i>l</i> = 20','2<i>p</i> + 4<i>l</i> = 56')}. On multiplie la 1re par −2 et on additionne : 2<i>l</i> = 16, donc <i>l</i> = 8 lapins (et 12 poules : 24 + 32 = 56 ✓). Autre stratégie, sans lettres : imagine que les 20 animaux sont des poules, soit 40 pattes. Il manque 16 pattes, et chaque lapin en apporte 2 de plus : 8 lapins. Cette énigme se trouve déjà dans un livre chinois vieux d’environ 1500 ans.`},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir : systèmes',p:`<div class="keep"><ul>
<li>Une équation à deux inconnues a une infinité de solutions, des <b>couples</b> (${X} ; ${Y}) qui forment une droite.</li>
<li>Une solution d’un <b>système</b> vérifie les <b>deux</b> équations à la fois ; on teste toujours les deux.</li>
<li><b>Isoler</b> ${Y} : passer les autres termes de l’autre côté, puis diviser chaque terme par le coefficient de ${Y}. On obtient ${Y} = ${A}${X} + ${B}.</li>
<li><b>Graphiquement</b> : la solution est le point d’intersection des deux droites. Lecture parfois approchée, on vérifie par le calcul.</li>
<li><b>Substitution</b> : isoler une inconnue, la remplacer (entre parenthèses) dans l’autre équation, résoudre, revenir à l’autre inconnue.</li>
<li><b>Combinaison</b> : multiplier pour obtenir des coefficients opposés, additionner, une inconnue disparaît.</li>
<li><b>Cas particuliers</b> : droites parallèles, aucune solution (0 = 3) ; droites confondues, une infinité (0 = 0).</li>
<li><b>Problèmes</b> : deux lettres avec leur unité, deux équations, une méthode, vérification, phrase de réponse.</li></ul></div>`},
 {kind:'Problème',h:'Le mélange de fruits secs',
  p:'Pour une randonnée, tu prépares 5 kg d’un mélange d’amandes et de noix de cajou. Les amandes coûtent 12 CHF le kilo et les noix de cajou 20 CHF le kilo. Tu veux que le mélange revienne à 15,20 CHF le kilo. On note <i>x</i> la masse d’amandes et <i>y</i> la masse de noix de cajou, en kilos.',
  parts:[
   {q:'a) Combien coûtent les 5 kg de mélange&nbsp;?',unit:'CHF',ans:76,hint:'Prix au kilo × nombre de kilos.',why:'5 × 15,20 = 76 CHF.'},
   {q:'b) Quel système traduit le problème&nbsp;?',opts:[SYS(`${X} + ${Y} = 5`,`12${X} + 20${Y} = 76`),SYS(`${X} + ${Y} = 5`,`12${X} + 20${Y} = 15,2`),SYS(`${X} + ${Y} = 76`,`12${X} + 20${Y} = 5`),SYS(`${X} + ${Y} = 5`,`20${X} + 12${Y} = 76`)],ans:0,hint:'Une équation pour les masses, une pour les prix. x kg d’amandes coûtent 12x CHF.',why:`Masses : ${X} + ${Y} = 5. Prix : 12${X} + 20${Y} = 76, le prix total trouvé en a).`},
   {q:'c) Quelle masse de noix de cajou faut-il&nbsp;?',lab:'y =',unit:'kg',ans:2,hint:'Multiplie la 1re équation par −12 et additionne.',why:`−12${X} − 12${Y} = −60, plus 12${X} + 20${Y} = 76 : 8${Y} = 16, donc ${Y} = 2 kg.`},
   {q:'d) Et quelle masse d’amandes&nbsp;?',lab:'x =',unit:'kg',ans:3,hint:'Reviens à la première équation.',why:`${X} = 5 − 2 = 3 kg. Contrôle : 12 · 3 + 20 · 2 = 36 + 40 = 76 ✓.`},
  ],
  sol:`Soit ${X} la masse d’amandes et ${Y} celle de noix de cajou, en kg.<br>Masse : ${X} + ${Y} = 5. Prix : 12${X} + 20${Y} = 5 × 15,20 = 76.<br>Combinaison : la 1re multipliée par −12 donne −12${X} − 12${Y} = −60 ; on additionne : 8${Y} = 16, donc ${Y} = 2.<br>Puis ${X} = 5 − 2 = 3. Contrôle : 36 + 40 = 76 ✓.<br>Réponse : il faut 3 kg d’amandes et 2 kg de noix de cajou.`},
 {kind:'Problème',h:'Quel abonnement pour la piscine ?',
  p:`La piscine propose deux formules. Formule A : une carte à 30 CHF pour la saison, puis 5 CHF par entrée. Formule B : pas de carte, 10 CHF par entrée. On note ${N} le nombre d’entrées et <i>p</i> le prix total en CHF. Bouge le curseur pour comparer les prix ; la droite en pointillés est une formule C dont on parle à la fin.`,
  params:[{id:'n',l:'nombre d’entrées n',min:0,max:15,step:1,v:2}],
  draw:v=>{ const P=plane({x:[-1,16],y:[-12,135],h:240,grid:false,lx:5,ly:20});
    P.fn(n=>30+5*n,{from:0,to:16}).fn(n=>10*n,{from:0,to:16,c:'var(--spark)'}).fn(n=>50+5*n,{from:0,to:16,c:'var(--muted)',dash:true});
    P.dot(v.n,30+5*v.n,{c:'var(--accent)'}).dot(v.n,10*v.n,{c:'var(--spark)'}).text(13.5,30+5*13.5,'A',{dy:22}).text(11.5,115,'B',{c:'var(--spark)',dx:4}).text(1,55,'C',{c:'var(--muted)',dy:-8});
    return P.svg(); },
  info:v=>`Pour ${v.n} entrée${v.n>1?'s':''} : A coûte ${30+5*v.n} CHF, B coûte ${10*v.n} CHF.`,
  parts:[
   {q:'a) Pour combien d’entrées les deux formules coûtent-elles le même prix&nbsp;?',lab:'n =',ans:6,hint:'Résous le système p = 30 + 5n et p = 10n, par exemple par substitution.',why:`10${N} = 30 + 5${N} ⇔ 5${N} = 30 ⇔ ${N} = 6.`},
   {q:'b) Quel est alors ce prix commun&nbsp;?',lab:'p =',unit:'CHF',ans:60,hint:'Remplace n par 6 dans une des deux équations.',why:'<i>p</i> = 10 · 6 = 60 CHF, et 30 + 5 · 6 = 60 ✓.'},
   {q:'c) Tu prévois d’aller 10 fois à la piscine. Quelle formule choisis-tu&nbsp;?',opts:['A, qui coûte 80 CHF contre 100 CHF','B, qui coûte 80 CHF contre 100 CHF','Les deux coûtent le même prix','B, car il n’y a pas de carte à payer'],ans:0,hint:'Calcule les deux prix pour n = 10, ou regarde quelle droite est en dessous après le croisement.',why:'A : 30 + 50 = 80 CHF. B : 100 CHF. Après 6 entrées, la droite A passe sous la droite B.'},
   {q:'d) Une formule C coûte 50 CHF de carte puis 5 CHF par entrée. Combien de solutions le système formé par A et C a-t-il&nbsp;?',opts:['Une seule, n = 4','Une infinité','Aucune : les droites sont parallèles, C coûte toujours 20 CHF de plus que A','Une seule, n = 0'],ans:2,hint:'Compare les pentes et les ordonnées à l’origine des deux droites.',why:`30 + 5${N} = 50 + 5${N} donne 0 = 20, une égalité fausse. Même pente 5, ordonnées à l’origine différentes : droites parallèles, aucune solution.`},
  ],
  sol:`Formule A : <i>p</i> = 30 + 5${N}. Formule B : <i>p</i> = 10${N}.<br>Par substitution : 10${N} = 30 + 5${N}, donc ${N} = 6 et <i>p</i> = 60 CHF. Les droites se croisent en (6 ; 60).<br>Avant 6 entrées, B est moins chère ; après, c’est A. Pour 10 entrées : A coûte 80 CHF, B 100 CHF, on choisit A.<br>Avec C : 30 + 5${N} = 50 + 5${N} mène à 0 = 20, faux. Les droites A et C sont parallèles (même pente 5) : aucune solution, C est toujours 20 CHF plus chère que A.`},
]},
);
})();
