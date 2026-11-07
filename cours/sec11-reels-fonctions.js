/* Déclic — Maths au secondaire, 11e année : nombres réels, probabilités, fonctions */
(()=>{
/* ---------- helpers locaux ---------- */
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
// fraction simplifiée p/q (HTML)
const fr=(p,q)=>{ if(p===0) return '0'; const g=gcd(p,q)||1, a=p/g, b=q/g; return b===1?String(a):F(a,b); };
// fraction simplifiée en texte simple (pour le SVG)
const frs=(p,q)=>{ if(p===0) return '0'; const g=gcd(p,q)||1, a=p/g, b=q/g; return b===1?String(a):a+'/'+b; };
const supU=n=>String(n).replace('-','⁻').split('').map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[c]??c).join('');
const e10=n=>`10<sup>${fmt(n)}</sup>`;
// écriture décimale exacte de m · 10^e (m entier)
function decStr(m,e){
  let s=String(m);
  if(e>=0) s+= '0'.repeat(e);
  else { const k=-e; while(s.length<=k) s='0'+s; s=s.slice(0,s.length-k)+','+s.slice(s.length-k); s=s.replace(/0+$/,'').replace(/,$/,''); }
  const [ip,dp]=s.split(','); const g=ip.replace(/\B(?=(\d{3})+(?!\d))/g,' '); return dp?g+','+dp:g;
}
const OBJ=[['un atome',-10],['un virus',-7],['l’épaisseur d’un cheveu',-4],['une fourmi',-2.3],['toi',0.2],['la tour Eiffel',2.5],['le Cervin',3.65],['la largeur de la Suisse',5.5],['le diamètre de la Terre',7.1],['la distance Terre-Lune',8.6],['la distance Terre-Soleil',11.2]];
function powScale(a,n){
  const L=n+Math.log10(a);
  const P=plane({x:[-11,12.6],y:[-1.6,1.6],h:110,grid:false,axes:false});
  P.seg(-10.5,0,12.2,0,{c:'var(--muted)',w:1.5});
  for(let k=-10;k<=12;k++){ P.seg(k,-.15,k,.15,{c:'var(--muted)',w:1.2}); if(k%4===0) P.text(k,0,'10'+supU(k),{a:'middle',dy:24,s:10,c:'var(--muted)'}); }
  OBJ.forEach(o=>P.dot(o[1],0,{r:3,c:'var(--muted)'}));
  let best=OBJ[0]; OBJ.forEach(o=>{ if(Math.abs(o[1]-L)<Math.abs(best[1]-L)) best=o; });
  P.dot(best[1],0,{r:5,c:'var(--math)'});
  P.dot(L,0,{r:7,c:'var(--spark)'}); P.text(L,0,fmt(a,1)+' · 10'+supU(n)+' m',{a:'middle',dy:-14,s:12});
  return {svg:P.svg(),best};
}
function squareFig(A){
  const s=Math.sqrt(A);
  const P=plane({x:[-1,8.4],y:[-1.2,8.2],w:300,step:1,axes:false});
  P.rect(0,0,s,s,{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2.5});
  P.text(s/2,s/2,'A = '+A,{a:'middle',dy:5});
  P.text(s/2,0,'côté = √'+A+(Number.isInteger(s)?' = '+s:' ≈ '+fmt(s,2)),{a:'middle',dy:18,s:12,c:'var(--accent)'});
  return P.svg();
}
function bracketLine(n,N){
  const P=plane({x:[-8,180],y:[-1,1.4],h:110,grid:false,axes:false});
  P.seg(0,0,175,0,{c:'var(--muted)',w:1.5});
  for(let k=0;k<=13;k++){ P.seg(k*k,-.12,k*k,.12,{c:'var(--muted)',w:1.2}); }
  const lo=n*n, hi=(n+1)*(n+1), good=lo<=N&&N<hi, col=good?'var(--ok)':'var(--bad)';
  P.seg(lo,0,Math.min(hi,175),0,{c:col,w:7,op:.8});
  P.text(lo,0,n+'² = '+lo,{a:'middle',dy:24,s:11,c:col});
  if(hi<=175) P.text(hi,0,(n+1)+'² = '+hi,{a:'middle',dy:-14,s:11,c:col});
  P.dot(N,0,{r:6,c:'var(--spark)'}); P.text(N,0,String(N),{a:'middle',dy:40,s:12});
  return P.svg();
}
function sqrtBars(a,b){
  const P=plane({x:[-6,17.5],y:[0,5],h:170,grid:false,axes:false});
  const rows=[['√(a · b)',Math.sqrt(a*b),'var(--accent)'],['√a · √b',Math.sqrt(a)*Math.sqrt(b),'var(--accent)'],['√(a + b)',Math.sqrt(a+b),'var(--spark)'],['√a + √b',Math.sqrt(a)+Math.sqrt(b),'var(--bad)']];
  rows.forEach((r,i)=>{ const y=4.2-i*1.1; P.rect(0,y-.35,r[1],.7,{fill:r[2],fo:.45,c:r[2],w:1.5}); P.text(-.3,y,r[0],{a:'end',dy:4,s:12}); P.text(r[1]+.2,y,fmt(r[1],2),{dy:4,s:11}); });
  return P.svg();
}
// boîtes emboîtées des ensembles de nombres
const setsFig=(()=>{ const P=plane({x:[0,10],y:[0,6],grid:false,axes:false});
  P.rect(.2,.2,9.6,5.6,{fill:'var(--sci)',fo:.12,c:'var(--ink)',w:1.5}).rect(.6,.6,7,4.5,{fill:'var(--math)',fo:.15,c:'var(--ink)',w:1.5})
   .rect(1,1,4.4,3.4,{fill:'var(--spark)',fo:.2,c:'var(--ink)',w:1.5}).rect(1.4,1.4,2,2.2,{fill:'var(--accent)',fo:.25,c:'var(--ink)',w:1.5});
  P.text(.4,5.8,'ℝ',{dy:18,s:15}).text(.8,5.1,'ℚ',{dy:18,s:15}).text(1.2,4.4,'ℤ',{dy:18,s:15}).text(1.6,3.6,'ℕ',{dy:18,s:15});
  P.text(2.4,2.1,'7',{a:'middle'}).text(2.4,1.6,'√49',{a:'middle',s:11}).text(4.4,2.4,'−3',{a:'middle'}).text(6.5,3.2,'3/4',{a:'middle'}).text(6.5,1.7,'0,333…',{a:'middle',s:12})
   .text(8.8,3.4,'√2',{a:'middle'}).text(8.8,2.4,'π',{a:'middle'}).text(8.8,1.4,'2√2',{a:'middle',s:12});
  return P.svg(); })();

/* ---------- probabilités ---------- */
// roue de n secteurs égaux, les k premiers en rouge
function wheel(n,k){
  const P=plane({x:[-2,2],y:[-1.3,1.55],grid:false,axes:false});
  for(let i=0;i<n;i++){ const t0=Math.PI/2-i*2*Math.PI/n, t1=Math.PI/2-(i+1)*2*Math.PI/n, pts=[[0,0]];
    for(let j=0;j<=16;j++){ const t=t0+(t1-t0)*j/16; pts.push([Math.cos(t),Math.sin(t)]); }
    P.poly(pts,{fill:i<k?'var(--bad)':'var(--sci)',fo:i<k?.6:.15,c:'var(--ink)',w:1.5}); }
  P.poly([[0,1.04],[-.1,1.32],[.1,1.32]],{fill:'var(--ink)',fo:1,c:'var(--ink)',w:1});
  return P.svg();
}
const PIPS={1:[[0,0]],2:[[-1,1],[1,-1]],3:[[-1,1],[0,0],[1,-1]],4:[[-1,1],[1,1],[-1,-1],[1,-1]],5:[[-1,1],[1,1],[0,0],[-1,-1],[1,-1]],6:[[-1,1],[1,1],[-1,0],[1,0],[-1,-1],[1,-1]]};
function die(P,cx,cy,s,n,hl){ P.rect(cx-s/2,cy-s/2,s,s,{fill:hl?'var(--spark)':'var(--line)',fo:hl?.45:.4,c:'var(--ink)',w:1.5}); PIPS[n].forEach(([a,b])=>P.dot(cx+a*s*.27,cy+b*s*.27,{r:3.5,c:'var(--ink)'})); }
// tableau à double entrée de deux dés : val(i,j) dans chaque case, pred(i,j) colorie
function diceGrid(val,pred,op){
  const P=plane({x:[0,7],y:[0,7],w:280,grid:false,axes:false});
  P.text(.5,6.5,op,{a:'middle',dy:5,c:'var(--muted)'});
  for(let i=1;i<=6;i++){ P.text(i+.5,6.5,String(i),{a:'middle',dy:5,c:'var(--accent)'}); P.text(.5,6.5-i,String(i),{a:'middle',dy:5,c:'var(--bad)'}); }
  for(let i=1;i<=6;i++) for(let j=1;j<=6;j++){ const x=j, y=6-i, ok=pred(i,j); P.rect(x+.05,y+.05,.9,.9,{fill:ok?'var(--spark)':'var(--line)',fo:ok?.6:.35,c:null}); P.text(x+.5,y+.5,String(val(i,j)),{a:'middle',dy:5,s:12}); }
  return P.svg();
}
// arbre à deux niveaux : b1 = [[nom, proba]], b2[i] = branches qui partent de la i-ème, leaf(i,j) = texte en bout
function tree(b1,b2,leaf){
  const P=plane({x:[0,12.4],y:[0,6.4],grid:false,axes:false});
  const tot=b2.reduce((s,a)=>s+a.length,0); let idx=0;
  b1.forEach((b,i)=>{ const ys=b2[i].map(()=>{ const y=6.1-(idx+.5)*6/tot; idx++; return y; }), y1=(ys[0]+ys[ys.length-1])/2;
    P.seg(.4,3.1,3.4,y1,{c:'var(--accent)',w:2}); P.text(1.9,(3.1+y1)/2,b[1],{a:'middle',dy:-7,s:11,c:'var(--accent)'}); P.text(3.75,y1,b[0],{a:'middle',dy:5});
    b2[i].forEach((k,j)=>{ P.seg(4.15,y1,6.9,ys[j],{c:'var(--math)',w:2}); P.text(4.15+.72*2.75,y1+.72*(ys[j]-y1),k[1],{a:'middle',dy:-5,s:11,c:'var(--math)'}); P.text(7.1,ys[j],k[0],{dy:5}); if(leaf) P.text(9.1,ys[j],leaf(i,j),{dy:5,s:11,c:'var(--muted)'}); });
  });
  P.dot(.3,3.1,{r:4,c:'var(--ink)'});
  return P.svg();
}
// générateur pseudo-aléatoire à graine fixe : la simulation est toujours la même
function mulberry32(a){ return ()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
const SIX=[14,2,18,34].map(s=>{ const r=mulberry32(2024+101*s), c=[]; let k=0; for(let i=0;i<1000;i++){ if(Math.floor(r()*6)===5) k++; c.push(k); } return c; });
function simFig(s,n){
  const c=SIX[s-1], P=plane({x:[-90,1070],y:[-.08,.6],h:210,grid:false,axes:false});
  P.seg(0,0,1000,0,{c:'var(--muted)',w:1.5}).seg(0,0,0,.6,{c:'var(--muted)',w:1.5});
  for(let x=200;x<=1000;x+=200){ P.seg(x,-.01,x,.01,{c:'var(--muted)',w:1}); P.text(x,0,String(x),{a:'middle',dy:15,s:10,c:'var(--muted)'}); }
  for(let y=.1;y<.55;y+=.1){ P.seg(-8,y,8,y,{c:'var(--muted)',w:1}); P.text(-14,y,fmt(y,1),{a:'end',dy:4,s:10,c:'var(--muted)'}); }
  P.seg(0,1/6,1000,1/6,{c:'var(--bad)',w:1.5,dash:true}).text(1000,1/6,'1/6',{a:'end',dy:-6,s:11,c:'var(--bad)'});
  const pts=[]; for(let i=0;i<n;i++) pts.push([i+1,c[i]/(i+1)]); P.poly(pts,{open:true,c:'var(--accent)',w:2});
  P.dot(n,c[n-1]/n,{r:5});
  return P.svg();
}

/* ---------- fonctions ---------- */
const sg=(v,d=2)=>v<0?'− '+fmt(-v,d):'+ '+fmt(v,d);
// écriture lisible de ax + b
const affTxt=(a,b)=>{ const A=a===0?'':a===1?'<i>x</i>':a===-1?'−<i>x</i>':fmt(a)+'<i>x</i>'; if(!A) return fmt(b); return b===0?A:A+' '+sg(b); };
function lineFig(a,b,pts){
  const P=plane({x:[-5,5],y:[-5,5],lab:1});
  P.fn(x=>a*x+b);
  if(a!==0){ P.seg(0,b,1,b,{c:'var(--spark)',w:2.5}).seg(1,b,1,b+a,{c:'var(--spark)',w:2.5}); P.text(1,b+a/2,fmt(a),{dx:6,dy:4,s:12,c:'var(--spark)'}); }
  P.dot(0,b,{r:5,c:'var(--accent)'});
  (pts||[]).forEach(p=>P.dot(p[0],p[1],{r:6,c:'var(--bad)',l:p[2]}));
  return P.svg();
}
function paraFig(a,b,c){
  const P=plane({x:[-6,6],y:[-6,6],lab:2});
  P.fn(x=>a*x*x+b*x+c);
  P.dot(0,c,{r:4,c:'var(--accent)'});
  if(a!==0){ const xs=-b/(2*a), ys=a*xs*xs+b*xs+c, D=b*b-4*a*c;
    P.seg(xs,-6,xs,6,{c:'var(--muted)',w:1.5,dash:true}); P.dot(xs,ys,{r:6,c:'var(--spark)',l:'S'});
    if(D>=0){ const r=Math.sqrt(D); [(-b-r)/(2*a),(-b+r)/(2*a)].forEach(z=>P.dot(z,0,{r:5,c:'var(--bad)'})); } }
  return P.svg();
}
function hyperFig(a,x){
  const P=plane({x:[-.4,8.4],y:[-.4,13],h:250,step:1,lab:2});
  const y=a/x; P.rect(0,0,x,y,{fill:'var(--spark)',fo:.25,c:'var(--spark)',w:2});
  P.fn(t=>a/t,{from:a/13,to:8.4});
  P.dot(x,y,{r:6,c:'var(--bad)'}); P.text(x/2,Math.min(y,12)/2,'aire '+a,{a:'middle',dy:5,s:12});
  return P.svg();
}

COURS.push(
/* ===================== NOMBRES RÉELS ET RACINES ===================== */
{subj:'sec', sem:'a11', id:'sec11-reels', o:1, h:'Nombres réels et racines', p:'Calculer avec la notation scientifique, simplifier des racines carrées, comprendre pourquoi √2 n’est pas une fraction et réviser les fractions.', steps:[
 {kind:'Théorie',h:'Des nombres géants et minuscules',p:`<p>Une fourmi mesure environ 0,005 m. La Terre a un diamètre d’environ 12 700 000 m. Écrire tous ces zéros prend du temps, et on se trompe vite d’un rang. Tu connais déjà l’outil qui règle ce problème : la <b>notation scientifique</b>.</p>
<div class="def"><p>Un nombre positif est écrit en notation scientifique quand il a la forme <b><i>a</i> · 10<sup><i>n</i></sup></b>, avec 1 ≤ <i>a</i> &lt; 10 et <i>n</i> un entier relatif. Le nombre <i>a</i> s’appelle la <b>mantisse</b> et <i>n</i> l’<b>exposant</b>.</p></div>
<div class="idea"><p>L’exposant dit de combien de rangs la virgule se déplace : vers la droite si <i>n</i> &gt; 0, vers la gauche si <i>n</i> &lt; 0. Il donne surtout l’<b>ordre de grandeur</b>. Sur la règle ci-dessous, chaque petite graduation multiplie la taille par 10. Les petits points gris sont des objets connus.</p></div>
<div class="ex"><p>12 700 000 = 1,27 · ${e10(7)} : la virgule recule de 7 rangs. 0,005 = 5 · ${e10(-3)}, car 0,005 = 5 : 1000. Et 3,2 · ${e10(0)} = 3,2, car ${e10(0)} = 1.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Il y a plus de 2000 ans, Archimède s’est demandé combien de grains de sable il faudrait pour remplir l’Univers. Il a inventé pour cela une façon d’écrire les nombres géants. Son résultat, en notation moderne : environ 10<sup>63</sup> grains.</p></div>
<p>Bouge les curseurs : la mantisse déplace le point un peu, l’exposant le fait sauter d’une graduation entière.</p>`,
  params:[{id:'a',l:'Mantisse a',min:1,max:9.5,step:.5,v:5},{id:'n',l:'Exposant n',min:-10,max:11,v:-3}],
  draw:v=>powScale(v.a,v.n).svg,
  info:v=>`${fmt(v.a,1)} · ${e10(v.n)} m = ${decStr(Math.round(v.a*10),v.n-1)} m. Ordre de grandeur le plus proche : ${powScale(v.a,v.n).best[0]}.`,
  note:'Un nombre comme 25 · 10³ n’est pas en notation scientifique : la mantisse 25 dépasse 10. On l’écrit 2,5 · 10⁴.'},
 {kind:'Méthode',h:'Calculer et comparer en notation scientifique',p:`<b>Quand :</b> tu multiplies, divises ou compares des nombres écrits <i>a</i> · 10<sup><i>n</i></sup>. <b>Pourquoi ça marche :</b> dans un produit, on peut changer l’ordre des facteurs, et tu connais les règles des puissances : 10<sup><i>m</i></sup> · 10<sup><i>n</i></sup> = 10<sup><i>m</i> + <i>n</i></sup> et 10<sup><i>m</i></sup> : 10<sup><i>n</i></sup> = 10<sup><i>m</i> − <i>n</i></sup>. <b>Comment :</b> 1) regroupe les mantisses d’un côté et les puissances de 10 de l’autre ; 2) calcule chaque morceau ; 3) si la nouvelle mantisse n’est pas entre 1 et 10, réajuste-la. Pour <b>comparer</b> deux nombres positifs en notation scientifique, regarde d’abord les exposants : le plus grand exposant donne le plus grand nombre. Seulement si les exposants sont égaux, compare les mantisses.`,
  demo:{enonce:`Calculer (4 · ${e10(5)}) · (6 · ${e10(-2)}), puis comparer le résultat à 9,5 · ${e10(3)}.`,
   etapes:[
    {f:`(4 · 6) · (${e10(5)} · ${e10(-2)})`,w:'On regroupe les mantisses ensemble et les puissances de 10 ensemble.'},
    {f:`24 · ${e10(3)}`,w:'4 · 6 = 24, et on additionne les exposants : 5 + (−2) = 3.'},
    {f:`24 · ${e10(3)} = 2,4 · 10 · ${e10(3)} = 2,4 · ${e10(4)}`,w:'24 n’est pas entre 1 et 10. On écrit 24 = 2,4 · 10 : l’exposant augmente de 1.'},
    {f:`2,4 · ${e10(4)} &gt; 9,5 · ${e10(3)}, car 4 &gt; 3`,w:'On compare d’abord les exposants. Peu importe que 9,5 dépasse 2,4 : 24 000 est bien plus grand que 9500.'}],
   conclusion:`Le produit vaut 2,4 · ${e10(4)} = 24 000, plus grand que 9,5 · ${e10(3)} = 9500. Pour une division, on divise les mantisses et on soustrait les exposants : (8 · ${e10(6)}) : (2 · ${e10(9)}) = 4 · ${e10(-3)}.`}},
 {h:'À toi : la Terre et la Lune',p:`La Terre a une masse d’environ 6 · ${e10(24)} kg, la Lune d’environ 7,5 · ${e10(22)} kg. Combien de fois la Terre est-elle plus lourde que la Lune ? Calcule (6 · ${e10(24)}) : (7,5 · ${e10(22)}).`,lab:'environ',unit:'fois',ans:80,tol:.5,
  why:`On divise les mantisses : 6 : 7,5 = 0,8. On soustrait les exposants : 24 − 22 = 2. Donc 0,8 · ${e10(2)} = 80 : la Terre est environ 80 fois plus lourde.`},
 {kind:'Théorie',h:'Racine carrée et racine cubique',p:`<p>Un potager carré a une aire de 49 m². Quelle est la longueur de son côté ? On cherche le nombre qui, multiplié par lui-même, donne 49 : c’est 7. Cette opération, qui « défait » le carré, s’appelle la racine carrée.</p>
<div class="def"><p>Pour <i>a</i> ≥ 0, la <b>racine carrée</b> √<i>a</i> est le nombre positif dont le carré vaut <i>a</i> : (√<i>a</i>)² = <i>a</i>. La <b>racine cubique</b> ∛<i>a</i> est le nombre dont le cube vaut <i>a</i> : (∛<i>a</i>)³ = <i>a</i>.</p></div>
<div class="idea"><p>√<i>a</i> est le côté d’un carré d’aire <i>a</i>. ∛<i>a</i> est l’arête d’un cube de volume <i>a</i>. Les nombres 1, 4, 9, 16, 25, 36… sont des <b>carrés parfaits</b> : leur racine carrée est un entier. 1, 8, 27, 64, 125 sont des <b>cubes parfaits</b>.</p></div>
<div class="ex"><p>√64 = 8, car 8² = 64. ∛64 = 4, car 4³ = 4 · 4 · 4 = 64. √0,25 = 0,5, car 0,5² = 0,25. ∛(−8) = −2, car (−2)³ = −8.</p></div>
<div class="warn"><p>√(−4) n’existe pas : un carré n’est jamais négatif. La racine cubique d’un nombre négatif, elle, existe.</p></div>
<p>Choisis l’aire <i>A</i> du carré : son côté √<i>A</i> se lit sur la grille.</p>`,
  params:[{id:'A',l:'Aire A',min:1,max:50,v:20}],
  draw:v=>squareFig(v.A),
  info:v=>{ const s=Math.sqrt(v.A), c=Math.cbrt(v.A), n=Math.floor(s+1e-9); return Number.isInteger(s)?`${v.A} est un carré parfait : √${v.A} = ${s}. Et ∛${v.A} ≈ ${fmt(c,2)}.`:`√${v.A} ≈ ${fmt(s,2)}, entre ${n} et ${n+1} car ${n}² = ${n*n} et ${n+1}² = ${(n+1)*(n+1)}. Et ∛${v.A} ≈ ${fmt(c,2)}.`; }},
 {kind:'Méthode',h:'Encadrer une racine et utiliser la calculatrice',p:`<b>Quand :</b> la racine ne tombe pas juste (√50, ∛100) et tu veux savoir « à peu près combien », ou contrôler ce qu’affiche la calculatrice. <b>Pourquoi ça marche :</b> plus un nombre positif est grand, plus sa racine est grande. Si 49 &lt; 50 &lt; 64, alors √49 &lt; √50 &lt; √64, donc 7 &lt; √50 &lt; 8. <b>Comment :</b> 1) écris la liste des carrés parfaits (ou des cubes) ; 2) repère les deux qui entourent ton nombre ; 3) affine au dixième en essayant 7,1², 7,2²… ; 4) contrôle à la calculatrice. Elle a une touche √ et, pour la racine cubique, une touche ∛ (ou x^(1/3)). Tape les parenthèses : √(16 + 9).`,
  demo:{enonce:'Encadrer √50 entre deux entiers, puis au dixième, puis contrôler à la calculatrice.',
   etapes:[
    {f:'6² = 36, 7² = 49, 8² = 64',w:'On liste les carrés parfaits : 50 se trouve entre 49 et 64.'},
    {f:'7 &lt; √50 &lt; 8',w:'La racine garde l’ordre : √49 = 7 et √64 = 8.'},
    {f:'7,0² = 49 et 7,1² = 50,41',w:'50 est entre 49 et 50,41, donc 7,0 &lt; √50 &lt; 7,1.'},
    {f:'Calculatrice : √50 ≈ 7,0710678',w:'On trouve bien un nombre entre 7,0 et 7,1. Arrondi au centième : 7,07.'},
    {f:'Piège : √(16 + 9) = √25 = 5, mais √16 + 9 = 4 + 9 = 13',w:'Sans parenthèses, la calculatrice ne prend la racine que du premier nombre.'}],
   conclusion:'√50 ≈ 7,07. Même idée pour ∛100 : 4³ = 64 et 5³ = 125, donc 4 &lt; ∛100 &lt; 5 (la calculatrice donne ∛100 ≈ 4,64).'}},
 {kind:'Pratique',h:'Coince la racine',p:'Règle <i>n</i> pour que <i>n</i> ≤ √90 &lt; <i>n</i> + 1. La droite montre <i>n</i>² et (<i>n</i> + 1)² : le nombre 90 doit tomber dans la bande verte.',
  params:[{id:'n',l:'n',min:0,max:12,v:3}],
  draw:v=>bracketLine(v.n,90),
  info:v=>`${v.n}² = ${v.n*v.n} et ${v.n+1}² = ${(v.n+1)*(v.n+1)} : 90 ${v.n*v.n<=90&&90<(v.n+1)*(v.n+1)?'est bien entre les deux.':'n’est pas entre les deux.'}`,
  ok:v=>v.n===9,why:'9² = 81 ≤ 90 &lt; 100 = 10², donc 9 ≤ √90 &lt; 10. La calculatrice donne √90 ≈ 9,49.'},
 {kind:'Théorie',h:'Multiplier et diviser des racines',p:`<p>Combien vaut √4 · √9 ? C’est 2 · 3 = 6. Et √(4 · 9) = √36 = 6 aussi ! Ce n’est pas un hasard, et c’est très pratique.</p>
<div class="prop"><p>Pour <i>a</i> ≥ 0 et <i>b</i> ≥ 0 : <b>√(<i>a</i> · <i>b</i>) = √<i>a</i> · √<i>b</i></b>. Pour <i>a</i> ≥ 0 et <i>b</i> &gt; 0 : <b>√(<i>a</i>/<i>b</i>) = √<i>a</i>/√<i>b</i></b>.</p></div>
<div class="why"><p>Élève √<i>a</i> · √<i>b</i> au carré : (√<i>a</i> · √<i>b</i>)² = √<i>a</i> · √<i>b</i> · √<i>a</i> · √<i>b</i> = (√<i>a</i>)² · (√<i>b</i>)² = <i>a</i> · <i>b</i>. Donc √<i>a</i> · √<i>b</i> est un nombre positif dont le carré vaut <i>ab</i>. C’est exactement la définition de √(<i>ab</i>). Même raisonnement pour le quotient.</p></div>
<div class="ex"><p>√2 · √8 = √16 = 4. √(9/25) = √9/√25 = 3/5. √72 : √2 = √(72 : 2) = √36 = 6. Des calculs qui paraissent durs se font de tête.</p></div>
<div class="warn"><p>Il n’y a pas de règle pour la somme : √(9 + 16) = √25 = 5, alors que √9 + √16 = 3 + 4 = 7. La racine d’une somme n’est <b>pas</b> la somme des racines.</p></div>
<p>Bouge <i>a</i> et <i>b</i> : les deux barres bleues restent égales, les deux barres du bas presque jamais.</p>`,
  params:[{id:'a',l:'a',min:1,max:16,v:4},{id:'b',l:'b',min:1,max:16,v:9}],
  draw:v=>sqrtBars(v.a,v.b),
  info:v=>`√(${v.a} · ${v.b}) = √${v.a*v.b} ≈ ${fmt(Math.sqrt(v.a*v.b),3)} et √${v.a} · √${v.b} ≈ ${fmt(Math.sqrt(v.a)*Math.sqrt(v.b),3)} : égaux. Mais √(${v.a} + ${v.b}) ≈ ${fmt(Math.sqrt(v.a+v.b),3)} et √${v.a} + √${v.b} ≈ ${fmt(Math.sqrt(v.a)+Math.sqrt(v.b),3)}.`},
 {kind:'Méthode',h:'Sortir un carré parfait de la racine',p:`<b>Quand :</b> le nombre sous la racine n’est pas un carré parfait, mais il a un <b>facteur</b> qui en est un : 50 = 25 · 2, 72 = 36 · 2. <b>Pourquoi ça marche :</b> √(<i>a</i> · <i>b</i>) = √<i>a</i> · √<i>b</i>, donc √(25 · 2) = √25 · √2 = 5√2. On écrit 5√2 pour 5 · √2. <b>Comment :</b> 1) cherche le <b>plus grand</b> carré parfait qui divise le nombre (essaie 4, 9, 16, 25, 36, 49, 64, 81, 100…) ; 2) écris le nombre comme ce carré fois le reste ; 3) sors la racine du carré. La racine est <b>simplifiée</b> quand le nombre qui reste sous la racine n’a plus aucun facteur carré (autre que 1).`,
  demo:{enonce:'Simplifier √50, puis √72.',
   etapes:[
    {f:'50 = 25 · 2',w:'25 = 5² est un carré parfait qui divise 50.'},
    {f:'√50 = √25 · √2 = 5√2',w:'On applique √(ab) = √a · √b, avec √25 = 5.'},
    {f:'72 = 4 · 18 = 36 · 2',w:'4 divise 72, mais 36 aussi, et il est plus grand. On prend le plus grand pour finir en une fois.'},
    {f:'√72 = √36 · √2 = 6√2',w:'Le 2 restant n’a plus de facteur carré : c’est terminé.'},
    {f:'Contrôle : 6√2 ≈ 6 · 1,414 ≈ 8,49 et √72 ≈ 8,49 ✓',w:'La calculatrice confirme que les deux écritures donnent le même nombre.'}],
   conclusion:'√50 = 5√2 et √72 = 6√2. Si tu prends un carré trop petit, ce n’est pas faux, mais il faut continuer : √72 = √4 · √18 = 2√18 = 2 · 3√2 = 6√2.'}},
 {h:'À toi : simplifie',p:'Écris √180 sous la forme <i>a</i>√5, avec <i>a</i> entier. Donne <i>a</i>.',lab:'a =',ans:6,
  why:'180 = 36 · 5 et 36 = 6² est un carré parfait. Donc √180 = √36 · √5 = 6√5.'},
 {kind:'Méthode',h:'Additionner et simplifier des racines',p:`<b>Quand :</b> une expression contient plusieurs racines : 3√2 + √8, √3 · √12, √50 : √2. <b>Pourquoi ça marche :</b> 3√2 + 5√2, c’est « 3 fois √2 plus 5 fois √2 », donc 8 fois √2, exactement comme 3<i>x</i> + 5<i>x</i> = 8<i>x</i>. On ne peut additionner que des racines <b>semblables</b>, c’est-à-dire avec le même nombre sous la racine. Pour les produits et les quotients, on utilise les propriétés √<i>a</i> · √<i>b</i> = √(<i>ab</i>) et √<i>a</i> : √<i>b</i> = √(<i>a</i> : <i>b</i>). <b>Comment :</b> 1) simplifie chaque racine en sortant les carrés parfaits ; 2) regroupe les termes semblables ; 3) pour un produit ou un quotient, réunis tout sous une seule racine.`,
  demo:{enonce:'Simplifier A = 3√2 + √8 − √18, puis B = √3 · √12.',
   etapes:[
    {f:'√8 = √4 · √2 = 2√2 et √18 = √9 · √2 = 3√2',w:'On sort les carrés parfaits : toutes les racines deviennent des multiples de √2.'},
    {f:'A = 3√2 + 2√2 − 3√2',w:'Ce sont des termes semblables, comme 3x + 2x − 3x.'},
    {f:'A = (3 + 2 − 3)√2 = 2√2',w:'On additionne les coefficients placés devant √2.'},
    {f:'B = √(3 · 12) = √36 = 6',w:'Pour un produit, on réunit sous une seule racine : le résultat tombe juste.'}],
   conclusion:'A = 2√2 ≈ 2,83 et B = 6. Attention : √2 + √3 ne se simplifie pas, et ce n’est surtout pas √5.'}},
 {h:'Lequel est juste ?',p:'Simplifie √12 + √27.',opts:['√39','6√3','5√3','3√5'],ans:2,
  why:'√12 = √4 · √3 = 2√3 et √27 = √9 · √3 = 3√3. Ce sont des racines semblables : 2√3 + 3√3 = 5√3. Écrire √39 serait additionner sous la racine, ce qui est faux.'},
 {kind:'Théorie',h:'√2 n’est pas une fraction',p:`<p>La calculatrice affiche √2 ≈ 1,414213562. Les décimales s’arrêtent-elles un jour ? Existe-t-il une fraction, peut-être avec un énorme dénominateur, dont le carré vaut exactement 2 ? Les Grecs ont prouvé que non.</p>
<div class="def"><p>Un nombre est <b>rationnel</b> s’il peut s’écrire comme une fraction d’entiers <i>p</i>/<i>q</i> (avec <i>q</i> ≠ 0). Sinon, il est <b>irrationnel</b>. Son écriture décimale est alors infinie et ne se répète jamais.</p></div>
<div class="why"><p>Suppose que √2 = <i>p</i>/<i>q</i>, avec une fraction <b>irréductible</b> (simplifiée au maximum). Au carré : 2 = <i>p</i>²/<i>q</i>², donc <i>p</i>² = 2<i>q</i>². Ainsi <i>p</i>² est pair. Or le carré d’un nombre impair est impair (impair · impair = impair), donc <i>p</i> est pair : <i>p</i> = 2<i>k</i>. Alors 4<i>k</i>² = 2<i>q</i>², soit <i>q</i>² = 2<i>k</i>² : <i>q</i> est pair aussi. Mais alors <i>p</i>/<i>q</i> se simplifie par 2, alors qu’on l’avait choisie irréductible. C’est impossible : √2 n’est pas une fraction.</p></div>
<div class="ex"><p>La même preuve marche pour √3, √5, √7… En fait, la racine d’un naturel qui n’est pas un carré parfait est toujours irrationnelle. π est aussi irrationnel, mais sa preuve est bien plus difficile.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Selon la légende, Hippase de Métaponte, un disciple de Pythagore, aurait découvert ce résultat vers 500 av. J.-C. Les pythagoriciens croyaient que tout se mesure avec des fractions. Furieux, ils l’auraient jeté à la mer.</p></div>`,
  fig:(()=>{ const P=plane({x:[-.4,2.2],y:[-.5,1.25],grid:false,axes:false});
    P.rect(0,0,1,1,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:2}).seg(0,0,1,1,{c:'var(--spark)',w:3});
    P.curve(t=>Math.SQRT2*Math.cos(t),t=>Math.SQRT2*Math.sin(t),0,Math.PI/4,{c:'var(--muted)',w:1.5,dash:true});
    P.seg(-.3,0,2.1,0,{c:'var(--ink)',w:1.5}); [0,1,2].forEach(k=>{ P.seg(k,-.04,k,.04,{c:'var(--ink)',w:1.5}); P.text(k,0,String(k),{a:'middle',dy:20,s:12}); });
    P.text(.42,.6,'√2',{c:'var(--spark)'}).text(.5,1,'1',{a:'middle',dy:-6,s:12}).text(1,.5,'1',{dx:6,s:12});
    P.dot(Math.SQRT2,0,{r:5,c:'var(--spark)'}).text(Math.SQRT2,0,'√2 ≈ 1,414',{a:'middle',dy:-12,s:12});
    return P.svg(); })(),
  note:'La diagonale d’un carré de côté 1 mesure √2 (Pythagore : 1² + 1² = 2). En la rabattant au compas, on place √2 exactement sur la droite graduée.'},
 {kind:'Théorie',h:'Les ensembles de nombres',p:`<p>Tu connais plusieurs familles de nombres. Chacune est née d’un besoin : compter des objets, parler de dettes ou de températures négatives, partager une pizza, mesurer la diagonale d’un carré.</p>
<div class="def"><p><b>ℕ</b> (les naturels) : 0, 1, 2, 3… <b>ℤ</b> (les entiers relatifs) : on ajoute −1, −2, −3… <b>ℚ</b> (les rationnels) : toutes les fractions d’entiers. <b>ℝ</b> (les réels) : tous les points de la droite graduée, rationnels et irrationnels. On a <b>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</b>. Le symbole ⊂ se lit « est inclus dans », et ∈ se lit « appartient à ».</p></div>
<div class="idea"><p>Chaque ensemble est une boîte rangée dans la suivante, comme sur la figure. Pour classer un nombre, simplifie-le d’abord, puis cherche la plus petite boîte qui le contient.</p></div>
<div class="ex"><p>√49 = 7 ∈ ℕ. −12/4 = −3 ∈ ℤ, mais −3 ∉ ℕ. 0,75 = 3/4 ∈ ℚ. 0,333… = 1/3 ∈ ℚ : une écriture décimale qui se répète vient toujours d’une fraction. √8 = 2√2 et π sont dans ℝ, mais pas dans ℚ.</p></div>
<div class="warn"><p>Ne te fie pas à l’allure d’un nombre : √(9/4) = 3/2 est rationnel, et √2 · √8 = 4 est même un naturel. Simplifie toujours avant de classer.</p></div>`,
  fig:setsFig},
 {kind:'Défi',h:'Deux irrationnels qui donnent un entier',p:'Le produit de deux nombres irrationnels peut-il être un entier ? Dans chaque couple ci-dessous, les deux nombres sont irrationnels. Pour un seul couple, le produit est un entier. Lequel ?',opts:['√2 et √3','π et √2','√3 et √12','√5 et √6'],ans:2,
  why:'Ici, essayer des cas simples marche bien : on cherche deux racines dont le produit des nombres sous la racine est un carré parfait. 3 · 12 = 36, donc √3 · √12 = √36 = 6, alors que √3 et √12 = 2√3 sont irrationnels. Les autres produits, √6, π√2 et √30, sont irrationnels.'},
 {kind:'Méthode',h:'Les fractions : les quatre opérations',p:`<b>Quand :</b> un calcul mélange des fractions. C’est un rappel rapide de ce que tu sais déjà. <b>Pourquoi ça marche :</b> on n’additionne que des parts de même taille, d’où le <b>dénominateur commun</b>. Multiplier, c’est « prendre une fraction d’une fraction » : la moitié de ${F(3,4)}, c’est ${F(3,8)}. Diviser par une fraction revient à multiplier par son <b>inverse</b> (la fraction retournée) : combien de fois ${F(1,4)} dans 3 ? 3 · 4 = 12 fois. <b>Comment :</b> pour + et −, mets au même dénominateur puis additionne les numérateurs ; pour ×, multiplie les numérateurs entre eux et les dénominateurs entre eux ; pour :, multiplie par l’inverse. Respecte les priorités et simplifie à la fin.`,
  demo:{enonce:`Calculer (${F(2,3)} + ${F(1,4)}) : ${F(5,6)}.`,
   etapes:[
    {f:`${F(2,3)} + ${F(1,4)} = ${F(8,12)} + ${F(3,12)} = ${F(11,12)}`,w:'Les parenthèses d’abord. 12 est un multiple de 3 et de 4 : c’est le dénominateur commun.'},
    {f:`${F(11,12)} : ${F(5,6)} = ${F(11,12)} · ${F(6,5)}`,w:'Diviser par 5/6, c’est multiplier par son inverse 6/5.'},
    {f:`= ${F(66,60)} = ${F(11,10)}`,w:'On multiplie en haut et en bas, puis on simplifie par 6.'}],
   conclusion:`Le résultat est ${F(11,10)} = 1,1. Astuce : simplifier avant de multiplier (12 et 6 se simplifient par 6) évite les grands nombres.`}},
 {h:'À toi : priorités et fractions',p:`Calcule ${F(3,4)} − ${F(1,2)} · ${F(5,6)}. Attention aux priorités. Donne le résultat en fraction, ou en décimal arrondi au millième.`,lab:'résultat =',ans:1/3,tol:.001,
  why:`La multiplication d’abord : ${F(1,2)} · ${F(5,6)} = ${F(5,12)}. Puis ${F(3,4)} − ${F(5,12)} = ${F(9,12)} − ${F(5,12)} = ${F(4,12)} = ${F(1,3)} ≈ 0,333.`},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Notation scientifique</b> : <i>a</i> · 10<sup><i>n</i></sup> avec 1 ≤ <i>a</i> &lt; 10. Produit : on multiplie les mantisses et on additionne les exposants. Quotient : on divise les mantisses et on soustrait les exposants. On réajuste la mantisse si besoin.</li>
<li><b>Comparer</b> : d’abord les exposants, puis les mantisses si les exposants sont égaux.</li>
<li><b>Racines</b> : √<i>a</i> est le nombre positif dont le carré vaut <i>a</i> ; ∛<i>a</i> est le nombre dont le cube vaut <i>a</i>. On encadre une racine avec les carrés (ou les cubes) parfaits voisins.</li>
<li><b>Propriétés</b> : √(<i>ab</i>) = √<i>a</i> · √<i>b</i> et √(<i>a</i>/<i>b</i>) = √<i>a</i>/√<i>b</i>. Mais √(<i>a</i> + <i>b</i>) ≠ √<i>a</i> + √<i>b</i>.</li>
<li><b>Simplifier</b> : on sort le plus grand carré parfait (√72 = 6√2), puis on additionne les racines semblables (2√3 + 3√3 = 5√3).</li>
<li><b>Irrationnels</b> : √2 n’est pas une fraction (preuve par les nombres pairs). ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.</li>
<li><b>Fractions</b> : dénominateur commun pour + et −, « haut fois haut, bas fois bas » pour ×, multiplier par l’inverse pour :.</li>
<li><b>Calculatrice</b> : toujours des parenthèses sous la racine, √(16 + 9) = 5.</li></ul></div>`},
 {kind:'Problème',h:'Le potager carré de 72 m²',p:'Lina dessine un potager carré d’une aire de 72 m². Elle veut connaître la longueur exacte de son côté, puis l’entourer d’une clôture et poser un tuyau d’arrosage le long d’une diagonale. Elle garde les valeurs exactes le plus longtemps possible et n’arrondit qu’à la fin. Rappel : la diagonale d’un carré est l’hypoténuse d’un triangle rectangle dont les deux autres côtés sont des côtés du carré.',
  fig:(()=>{ const P=plane({x:[-1,10],y:[-1.2,9.6],w:260,grid:false,axes:false}); const s=Math.sqrt(72);
    P.rect(0,0,s,s,{fill:'var(--ok)',fo:.18,c:'var(--ok)',w:2.5}).seg(0,0,s,s,{c:'var(--sci)',w:3,dash:true});
    P.text(s/2,0,'côté = √72 m',{a:'middle',dy:18,s:12}).text(s/2+.3,s/2-.6,'tuyau',{c:'var(--sci)',s:12}).text(s/2,s/2+1.6,'A = 72 m²',{a:'middle'});
    return P.svg(); })(),
  parts:[
   {q:'a) Le côté mesure √72 m. Écris-le sous la forme <i>a</i>√2. Donne <i>a</i>.',lab:'a =',ans:6,hint:'Cherche le plus grand carré parfait qui divise 72.',why:'72 = 36 · 2, donc √72 = √36 · √2 = 6√2 m.'},
   {q:'b) Arrondis la longueur du côté au centimètre.',lab:'côté ≈',unit:'m',ans:8.49,tol:.005,hint:'√2 ≈ 1,41421. Multiplie par 6.',why:'6√2 ≈ 6 · 1,41421 ≈ 8,485, soit 8,49 m au centimètre.'},
   {q:'c) Quelle est la longueur exacte du tuyau posé sur la diagonale ?',lab:'diagonale =',unit:'m',ans:12,hint:'Pythagore : d² = côté² + côté², et côté² = 72.',why:'d² = 72 + 72 = 144, donc d = √144 = 12 m. Le résultat tombe juste.'},
   {q:'d) La clôture coûte 15 CHF le mètre. Combien coûte la clôture du tour complet, arrondie au franc ?',unit:'CHF',ans:509,tol:1,hint:'Le périmètre vaut 4 fois le côté, soit 24√2 m.',why:'Périmètre : 4 · 6√2 = 24√2 ≈ 33,94 m. Prix : 33,94 · 15 ≈ 509 CHF.'}],
  sol:'Le côté vaut √72 = √(36 · 2) = 6√2 m ≈ 8,49 m. La diagonale vérifie d² = 72 + 72 = 144 (Pythagore), donc d = 12 m : il faut 12 m de tuyau. Le périmètre vaut 4 · 6√2 = 24√2 m ≈ 33,94 m, et la clôture coûte environ 33,94 · 15 ≈ 509 CHF. On remarque que la diagonale vaut √2 fois le côté : 6√2 · √2 = 6 · 2 = 12.'},
 {kind:'Problème',h:'Un message vers Proxima du Centauri',p:`L’étoile la plus proche du Soleil, Proxima du Centauri, est à environ 4 · ${e10(13)} km de nous. Un message radio voyage à la vitesse de la lumière, 3 · ${e10(5)} km par seconde. Une année dure environ 3,15 · ${e10(7)} secondes. Une sonde spatiale très rapide vole à 6 · ${e10(5)} km par heure. Tu compares les deux voyages.`,
  parts:[
   {q:`a) Combien de secondes le message radio met-il pour arriver ? Écris le résultat sous la forme <i>a</i> · 10<sup><i>n</i></sup> et donne l’exposant <i>n</i>.`,lab:'n =',ans:8,hint:'Durée = distance : vitesse. Divise les mantisses, soustrais les exposants, puis réajuste la mantisse.',why:`(4 · ${e10(13)}) : (3 · ${e10(5)}) ≈ 1,33 · ${e10(8)} s, donc n = 8.`},
   {q:'b) Combien d’années cela fait-il ? Arrondis au dixième.',unit:'ans',ans:4.2,tol:.05,hint:'Divise le nombre de secondes par le nombre de secondes dans une année.',why:`(1,33 · ${e10(8)}) : (3,15 · ${e10(7)}) ≈ 0,423 · 10 ≈ 4,2 ans.`},
   {q:'c) Combien de fois la lumière est-elle plus rapide que la sonde ?',unit:'fois',ans:1800,tol:1,hint:'Exprime d’abord la vitesse de la lumière en km par heure : une heure compte 3600 secondes.',why:`3 · ${e10(5)} km/s = 3 · ${e10(5)} · 3600 km/h = 1,08 · ${e10(9)} km/h. Puis (1,08 · ${e10(9)}) : (6 · ${e10(5)}) = 0,18 · ${e10(4)} = 1800.`},
   {q:'d) Combien d’années la sonde mettrait-elle ? Arrondis à la centaine.',unit:'ans',ans:7600,tol:60,hint:'La sonde est 1800 fois plus lente que le message : multiplie la durée du b).',why:'4,2 · 1800 ≈ 7600 ans. Par un calcul direct : (4 · 10¹³) : (6 · 10⁵) ≈ 6,67 · 10⁷ h, et une année compte 24 · 365 = 8760 h, d’où environ 7600 ans.'}],
  sol:`Durée du message : (4 · ${e10(13)}) : (3 · ${e10(5)}) ≈ 1,33 · ${e10(8)} s, soit (1,33 · ${e10(8)}) : (3,15 · ${e10(7)}) ≈ 4,2 ans. La lumière va à 3 · ${e10(5)} · 3600 = 1,08 · ${e10(9)} km/h, donc 1800 fois plus vite que la sonde. La sonde mettrait 1800 fois plus longtemps : environ 4,2 · 1800 ≈ 7600 ans. Même la sonde la plus rapide n’est pas près d’atteindre l’étoile voisine !`},
]},
/* ===================== PROBABILITÉS ===================== */
{subj:'sec', sem:'a11', id:'sec11-probas', o:5, h:'Probabilités', p:'Mesurer la chance avec un nombre : compter les cas, passer par le contraire, dessiner des tableaux et des arbres, simuler et juger si un jeu est équitable.', steps:[
 {kind:'Théorie',h:'Le vocabulaire du hasard',p:`<p>Avant un jeu de société, tu lances un dé. Tu sais ce qui <b>peut</b> sortir, mais pas ce qui <b>va</b> sortir. C’est le hasard. Pour en parler précisément, il faut quelques mots.</p>
<div class="def"><p>Une <b>expérience aléatoire</b> est une expérience dont on connaît tous les résultats possibles, sans pouvoir prévoir lequel arrivera. Chaque résultat possible est une <b>issue</b>. L’ensemble de toutes les issues s’appelle l’<b>univers</b>, noté Ω (la lettre grecque oméga). Un <b>événement</b> est un groupe d’issues, décrit par une phrase.</p></div>
<div class="ex"><p>On lance un dé à 6 faces : Ω = {1, 2, 3, 4, 5, 6}. L’événement A « obtenir un nombre pair » est A = {2, 4, 6} (les dés colorés). Si le dé montre 4, on dit que A est <b>réalisé</b>. « Obtenir 7 » ne contient aucune issue : c’est un événement <b>impossible</b>. « Obtenir moins de 10 » contient toutes les issues : il est <b>certain</b>.</p></div>
<div class="idea"><p>Un événement, c’est une question à laquelle le résultat répond par oui ou par non. Les issues qui répondent « oui » sont les issues <b>favorables</b> à cet événement.</p></div>
<div class="warn"><p>Choisis bien tes issues. Pour la somme de deux dés, 2, 3, …, 12 sont des résultats possibles, mais ils n’ont pas tous la même chance d’arriver. On y reviendra avec le tableau à double entrée.</p></div>`,
  fig:(()=>{ const P=plane({x:[0,12.6],y:[0,2.4],grid:false,axes:false}); for(let n=1;n<=6;n++) die(P,n*2-.9,1.25,1.5,n,n%2===0); P.text(6.3,.05,'A = {2, 4, 6}',{a:'middle',dy:-2,s:12,c:'var(--spark)'}); return P.svg(); })()},
 {kind:'Théorie',h:'Probabilité d’un événement',p:`<p>Une roue de fête foraine a 8 secteurs égaux, dont 3 rouges. Tu as plus de chances de tomber sur du bleu, mais combien exactement ? On mesure la chance par un nombre : la <b>probabilité</b>.</p>
<div class="def"><p>Si toutes les issues ont la même chance d’arriver, on dit qu’elles sont <b>équiprobables</b>. La probabilité d’un événement A est alors : P(A) = ${F('nombre de cas favorables','nombre de cas possibles')}.</p></div>
<div class="idea"><p>Une probabilité est toujours entre 0 (impossible) et 1 (certain). On l’écrit en fraction, en décimal ou en pourcentage. P(A) = ${F(3,8)} veut dire : si on tourne la roue un grand nombre de fois, elle s’arrête sur le rouge environ 3 fois sur 8.</p></div>
<div class="ex"><p>Roue de 8 secteurs dont 3 rouges : P(rouge) = ${F(3,8)} = 0,375 = 37,5 %. Dé : P(pair) = ${F(3,6)} = ${F(1,2)} = 50 %. Règle les curseurs pour voir d’autres roues.</p></div>
<div class="warn"><p>La formule ne marche que si les issues sont équiprobables. Une roue avec un grand secteur rouge et un petit secteur bleu n’a pas « 1 chance sur 2 » pour chaque couleur.</p></div>`,
  params:[{id:'n',l:'Nombre de secteurs',min:2,max:12,v:8},{id:'k',l:'Secteurs rouges',min:0,max:12,v:3}],
  draw:v=>wheel(v.n,Math.min(v.k,v.n)),
  info:v=>{ const k=Math.min(v.k,v.n); return `P(rouge) = ${F(k,v.n)}${gcd(k,v.n)>1&&k?' = '+fr(k,v.n):''} ≈ ${fmt(k/v.n,3)} = ${fmt(100*k/v.n,1)} %${k===0?' : impossible':k===v.n?' : certain':''}`; }},
 {kind:'Méthode',h:'Calculer une probabilité en comptant',p:`<b>Quand :</b> toutes les issues ont la même chance : dé équilibré, carte tirée au hasard, bille prise les yeux fermés. <b>Pourquoi ça marche :</b> chaque issue reçoit la même part du total 1. Un événement reçoit donc autant de parts qu’il contient d’issues favorables. <b>Comment :</b> 1) compte les cas possibles ; 2) compte les cas favorables, en faisant une liste si besoin ; 3) divise le nombre de cas favorables par le nombre de cas possibles ; 4) simplifie la fraction et, si on le demande, écris-la en pourcentage.`,
  demo:{enonce:'On tire une carte au hasard dans un jeu de jass de 36 cartes : 4 couleurs de 9 cartes (6, 7, 8, 9, 10, valet, dame, roi, as). Quelle est la probabilité d’obtenir un as ? une figure (valet, dame ou roi) ?',
   etapes:[
    {f:'Cas possibles : 36',w:'Chaque carte a la même chance d’être tirée.'},
    {f:`As : 4 cas favorables. P(as) = ${F(4,36)} = ${F(1,9)} ≈ 11 %`,w:'Il y a un as par couleur. On simplifie par 4.'},
    {f:`Figures : 3 · 4 = 12 cas. P(figure) = ${F(12,36)} = ${F(1,3)} ≈ 33 %`,w:'Trois figures par couleur, et quatre couleurs.'}],
   conclusion:`P(as) = ${F(1,9)} et P(figure) = ${F(1,3)}. Tu tires plus souvent une figure qu’un as : c’est logique, il y en a trois fois plus.`}},
 {h:'À toi : le sac de bonbons',p:'Un sac contient 5 bonbons à la fraise, 8 au citron et 7 à la menthe. Tu en prends un au hasard. Quelle est la probabilité qu’il soit au citron ? (fraction ou décimal)',lab:'P =',ans:.4,tol:.001,
  why:`Il y a 5 + 8 + 7 = 20 bonbons, dont 8 au citron : P = ${F(8,20)} = ${F(2,5)} = 0,4 = 40 %.`},
 {kind:'Théorie',h:'L’événement contraire',p:`<p>Au lancer franc, ta probabilité de réussir est 0,7. Quelle est ta probabilité de rater ? Tu la trouves sans calcul compliqué : 0,3. Rater, c’est le contraire de réussir.</p>
<div class="def"><p>Le <b>contraire</b> d’un événement A, noté Ā (on lit « A barre » ou « non A »), contient toutes les issues qui ne sont pas dans A. On a toujours <b>P(Ā) = 1 − P(A)</b>.</p></div>
<div class="why"><p>Chaque issue est soit dans A, soit dans Ā, jamais dans les deux. Les cas favorables à A et ceux favorables à Ā forment donc, ensemble, tous les cas possibles. Leurs probabilités s’additionnent : P(A) + P(Ā) = 1.</p></div>
<div class="ex"><p>Dé : A « obtenir 6 », P(A) = ${F(1,6)}. Ā « ne pas obtenir 6 » = {1, 2, 3, 4, 5}, et P(Ā) = ${F(5,6)} = 1 − ${F(1,6)}. Roue : P(rouge) = ${F(3,8)}, donc P(pas rouge) = ${F(5,8)}.</p></div>
<div class="idea"><p>Sur la barre de 0 à 1, A et Ā se partagent toute la longueur. Un événement impossible a la probabilité 0, un événement certain la probabilité 1.</p></div>
<div class="warn"><p>Le contraire de « obtenir 6 » n’est pas « obtenir 1 ». C’est « obtenir 1, 2, 3, 4 ou 5 ».</p></div>`,
  fig:(()=>{ const P=plane({x:[-.6,10.6],y:[-1.3,1.6],grid:false,axes:false});
    P.rect(0,0,7,.8,{fill:'var(--ok)',fo:.5,c:'var(--ink)',w:1.5}).rect(7,0,3,.8,{fill:'var(--bad)',fo:.5,c:'var(--ink)',w:1.5});
    P.text(3.5,.4,'P(A) = 0,7',{a:'middle',dy:5}).text(8.5,.4,'P(Ā) = 0,3',{a:'middle',dy:5,s:12});
    P.text(0,0,'0',{a:'middle',dy:18,s:12}).text(10,0,'1',{a:'middle',dy:18,s:12}).text(5,1,'impossible ← → certain',{a:'middle',dy:-6,s:11,c:'var(--muted)'});
    return P.svg(); })()},
 {kind:'Méthode',h:'Passer par l’événement contraire',p:`<b>Quand :</b> les cas favorables sont nombreux et pénibles à compter, alors que les cas contraires sont peu nombreux. Les mots « au moins un », « ne… pas », « ne… jamais » sont de bons indices. <b>Pourquoi ça marche :</b> P(A) = 1 − P(Ā), donc il suffit de compter le petit groupe. <b>Comment :</b> 1) écris en mots l’événement contraire ; 2) compte ses cas ; 3) calcule P(Ā) ; 4) calcule 1 − P(Ā).`,
  demo:{enonce:'On tire au hasard un numéro de 1 à 50. Quelle est la probabilité qu’il ne soit pas un multiple de 7 ?',
   etapes:[
    {f:'Contraire : « le numéro est un multiple de 7 »',w:'Il y en a peu : c’est plus rapide à compter.'},
    {f:'7, 14, 21, 28, 35, 42, 49 : 7 cas',w:'On liste les multiples de 7 jusqu’à 50.'},
    {f:`P(multiple de 7) = ${F(7,50)}`,w:'Les 50 numéros sont équiprobables.'},
    {f:`P(pas un multiple de 7) = 1 − ${F(7,50)} = ${F(43,50)} = 0,86`,w:'On applique P(A) = 1 − P(Ā).'}],
   conclusion:'Il y a 86 % de chances. Compter directement les 43 autres numéros aurait été long, et on risquait d’en oublier.'}},
 {h:'À toi : pas un multiple de 3',p:'On tire au hasard un numéro de 1 à 40. Quelle est la probabilité qu’il ne soit pas un multiple de 3 ? (fraction ou décimal)',lab:'P =',ans:27/40,tol:.001,
  why:`Contraire : « multiple de 3 ». De 3 à 39, il y en a 13 (car 39 = 3 · 13). P(multiple de 3) = ${F(13,40)}, donc P(pas multiple de 3) = 1 − ${F(13,40)} = ${F(27,40)} = 0,675.`},
 {kind:'Méthode',h:'Le tableau à double entrée',p:`<b>Quand :</b> l’expérience a deux parties : deux dés, un dé et une pièce, deux roues. <b>Pourquoi ça marche :</b> on met une ligne par résultat de la première partie et une colonne par résultat de la seconde. Chaque case est une issue, et toutes les cases ont la même chance. Avec deux dés, il y a 6 · 6 = 36 cases. <b>Comment :</b> 1) dessine le tableau et remplis chaque case (somme, produit…) ; 2) colorie les cases favorables ; 3) P = ${F('cases coloriées','nombre total de cases')}.`,
  demo:{enonce:'On lance deux dés, un rouge et un bleu, et on multiplie les deux nombres. Quelle est la probabilité que le produit soit pair ?',
   etapes:[
    {f:'Tableau 6 × 6 : 36 cases équiprobables',w:'Dé rouge en ligne, dé bleu en colonne. (1 ; 2) et (2 ; 1) sont deux cases différentes : distinguer les deux dés est essentiel.'},
    {f:'Produit impair seulement si les deux nombres sont impairs : 3 · 3 = 9 cases',w:'impair · impair = impair ; dès qu’un facteur est pair, le produit est pair.'},
    {f:'Produit pair : 36 − 9 = 27 cases',w:'On a compté le contraire, c’est plus rapide.'},
    {f:`P(produit pair) = ${F(27,36)} = ${F(3,4)}`,w:'On simplifie par 9.'}],
   conclusion:'Il y a 75 % de chances que le produit soit pair. Le tableau évite d’oublier des issues.'},
  fig:diceGrid((i,j)=>i*j,(i,j)=>i*j%2===0,'×')},
 {kind:'Pratique',h:'Quelle somme ?',p:`On lance deux dés et on additionne les deux nombres. Le tableau colorie les cases qui donnent la somme choisie. Règle le curseur sur une somme dont la probabilité vaut ${F(1,12)}.`,
  params:[{id:'s',l:'Somme',min:2,max:12,v:7}],
  draw:v=>diceGrid((i,j)=>i+j,(i,j)=>i+j===v.s,'+'),
  info:v=>{ const c=Math.min(v.s-1,13-v.s); return `Somme ${v.s} : ${c} case${c>1?'s':''} sur 36, P = ${F(c,36)}${gcd(c,36)>1?' = '+fr(c,36):''}`; },
  ok:v=>v.s===4||v.s===10,why:`${F(1,12)} = ${F(3,36)} : il faut 3 cases. La somme 4 en a 3 (1 + 3, 2 + 2, 3 + 1), la somme 10 aussi (4 + 6, 5 + 5, 6 + 4).`},
 {kind:'Théorie',h:'L’arbre : deux épreuves à la suite',p:`<p>Tu lances une pièce, puis tu tournes une roue de 3 secteurs égaux : bleu, vert, jaune. Pour voir toutes les issues d’un coup d’œil, on dessine un <b>arbre</b>.</p>
<div class="def"><p>Un <b>arbre de probabilités</b> part d’un point. Chaque branche du 1er niveau est un résultat de la 1re épreuve ; au bout de chacune repartent les branches de la 2e épreuve. On écrit sur chaque branche sa probabilité. Un <b>chemin</b> qui va du départ à un bout est une issue.</p></div>
<div class="prop"><p>Le long d’un chemin, on <b>multiplie</b> les probabilités. Si un événement regroupe plusieurs chemins, on <b>additionne</b> leurs probabilités. Les branches qui partent d’un même point ont toujours une somme de 1.</p></div>
<div class="why"><p>La pièce donne pile une fois sur 2. Parmi ces fois-là, la roue donne bleu une fois sur 3. Donc « pile puis bleu » arrive dans un tiers de la moitié des cas : ${F(1,2)} · ${F(1,3)} = ${F(1,6)}.</p></div>
<div class="ex"><p>P(pile et bleu) = ${F(1,2)} · ${F(1,3)} = ${F(1,6)}. P(vert, peu importe la pièce) = P(pile, vert) + P(face, vert) = ${F(1,6)} + ${F(1,6)} = ${F(1,3)}.</p></div>`,
  fig:tree([['P','1/2'],['F','1/2']],[[['bleu','1/3'],['vert','1/3'],['jaune','1/3']],[['bleu','1/3'],['vert','1/3'],['jaune','1/3']]],()=>'  1/6'),
  note:'P veut dire pile et F face. Les 6 chemins valent chacun 1/6, et leur somme fait bien 1.'},
 {kind:'Méthode',h:'Tirer avec ou sans remise',p:`<b>Quand :</b> on tire deux objets l’un après l’autre dans un sac. <b>Avec remise</b> : on remet le premier objet avant le second tirage, le sac est le même les deux fois. <b>Sans remise</b> : on garde le premier objet, il en reste un de moins pour le second tirage. <b>Pourquoi ça change tout :</b> sans remise, les probabilités du 2e niveau de l’arbre dépendent de ce qui est sorti au 1er. <b>Comment :</b> 1) dessine l’arbre ; 2) au 2e niveau, recompte ce qui reste dans le sac ; 3) multiplie le long des chemins ; 4) additionne les chemins utiles.`,
  demo:{enonce:'Un sac contient 3 billes rouges et 2 bleues. On en tire deux. Quelle est la probabilité d’obtenir deux rouges, avec remise, puis sans remise ?',
   etapes:[
    {f:`1er tirage : P(R) = ${F(3,5)}`,w:'3 rouges sur 5 billes.'},
    {f:`Avec remise : P(R puis R) = ${F(3,5)} · ${F(3,5)} = ${F(9,25)} = 0,36`,w:'La bille est remise : le sac contient de nouveau 3 rouges sur 5.'},
    {f:'Sans remise : après une rouge, il reste 2 rouges sur 4 billes',w:'On recompte le sac après le premier tirage (l’arbre ci-dessous).'},
    {f:`P(R puis R) = ${F(3,5)} · ${F(2,4)} = ${F(6,20)} = ${F(3,10)} = 0,3`,w:'On multiplie le long du chemin rouge-rouge.'}],
   conclusion:'Avec remise : 36 %. Sans remise : 30 %. Sans remise, une rouge déjà sortie rend la deuxième rouge moins probable.'},
  fig:tree([['R','3/5'],['B','2/5']],[[['R','2/4'],['B','2/4']],[['R','3/4'],['B','1/4']]],(i,j)=>['RR : 6/20','RB : 6/20','BR : 6/20','BB : 2/20'][2*i+j])},
 {h:'À toi : deux chaussettes',p:'Dans un tiroir sombre, il y a 4 chaussettes noires et 6 blanches. Tu en prends deux, sans remise. Quelle est la probabilité d’avoir deux blanches ? (fraction ou décimal arrondi au centième)',lab:'P =',ans:1/3,tol:.005,
  why:`1re chaussette blanche : ${F(6,10)}. Il reste 5 blanches sur 9 : ${F(5,9)}. P = ${F(6,10)} · ${F(5,9)} = ${F(30,90)} = ${F(1,3)} ≈ 0,33.`},
 {kind:'Théorie',h:'Fréquence et loi des grands nombres',p:`<p>Une pièce a 1 chance sur 2 de tomber sur pile. Pourtant, si tu la lances 10 fois, tu n’obtiens pas toujours 5 piles. Alors à quoi sert une probabilité ?</p>
<div class="def"><p>Si on répète une expérience <i>n</i> fois et que l’événement A se réalise <i>k</i> fois, la <b>fréquence</b> de A est ${F('<i>k</i>','<i>n</i>')}.</p></div>
<div class="thm"><p><b>Loi des grands nombres</b> : quand on répète une expérience un très grand nombre de fois, la fréquence d’un événement se rapproche de sa probabilité.</p></div>
<div class="idea"><p>Sur peu d’essais, la fréquence saute dans tous les sens. Plus <i>n</i> grandit, plus elle se stabilise près de la probabilité. La simulation lance un dé jusqu’à 1000 fois et suit la fréquence du 6. La ligne pointillée marque ${F(1,6)} ≈ 0,167. Change de série : le début change beaucoup, la fin se ressemble.</p></div>
<div class="ex"><p>Sur 600 lancers, on s’attend à environ 600 · ${F(1,6)} = 100 six. En obtenir 93 ou 108 est normal. En obtenir 300 serait très suspect : le dé serait sans doute truqué.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Au 18e siècle, le naturaliste Buffon a lancé une pièce 4040 fois et obtenu 2048 piles, une fréquence de 0,507. Plus tard, le statisticien Karl Pearson est allé jusqu’à 24 000 lancers, pour 12 012 piles : 0,5005.</p></div>`,
  params:[{id:'s',l:'Série de lancers',min:1,max:4,v:1},{id:'k',l:'Nombre de lancers (× 20)',min:1,max:50,v:5}],
  draw:v=>simFig(v.s,20*v.k),
  info:v=>{ const n=20*v.k, c=SIX[v.s-1][n-1]; return `${n} lancers : ${c} fois le 6. Fréquence ${F(c,n)} ≈ ${fmt(c/n,3)}, probabilité ${F(1,6)} ≈ 0,167 (écart ${fmt(Math.abs(c/n-1/6),3)}).`; }},
 {kind:'Méthode',h:'Décider si un jeu est équitable',p:`<b>Quand :</b> deux joueurs, ou un joueur et un stand, s’affrontent dans un jeu de hasard. Un jeu est <b>équitable</b> si chaque joueur a la même probabilité de gagner. Quand il y a de l’argent en jeu, il est équitable si, en moyenne, personne ne gagne ni ne perd. <b>Pourquoi :</b> d’après la loi des grands nombres, sur beaucoup de parties, chacun gagne à peu près en proportion de sa probabilité. <b>Comment :</b> 1) calcule la probabilité de gagner de chaque joueur (tableau ou arbre) ; 2) compare-les ; 3) s’il y a des mises, imagine un nombre de parties bien choisi (36 avec deux dés) et fais le bilan : ce qu’on paie, ce qu’on reçoit en moyenne.`,
  demo:{enonce:'Léa et Tom lancent deux dés. Léa gagne si la somme vaut 6, 7 ou 8 ; Tom gagne sinon. Le jeu est-il équitable ? Et au stand de la foire : tu paies 1 CHF, tu reçois 5 CHF si tu fais un double ?',
   etapes:[
    {f:'Somme 6 : 5 cases ; somme 7 : 6 cases ; somme 8 : 5 cases',w:'On lit le tableau des sommes de deux dés.'},
    {f:`P(Léa gagne) = ${F(16,36)} = ${F(4,9)} ≈ 0,44`,w:'16 cases favorables sur 36.'},
    {f:`P(Tom gagne) = 1 − ${F(16,36)} = ${F(20,36)} = ${F(5,9)} ≈ 0,56`,w:'Tom gagne dans tous les autres cas : on passe par le contraire.'},
    {f:`${F(4,9)} ≠ ${F(5,9)} : le jeu n’est pas équitable, il avantage Tom`,w:'Il fallait comparer les deux probabilités, pas seulement regarder les sommes « fréquentes ».'},
    {f:'Stand, sur 36 parties : tu paies 36 CHF ; tu fais en moyenne 6 doubles et reçois 6 · 5 = 30 CHF',w:`P(double) = ${F(6,36)} : en moyenne 6 doubles sur 36 parties.`}],
   conclusion:'Le jeu de dés avantage Tom. Au stand, tu perds en moyenne 6 CHF en 36 parties : le jeu n’est pas équitable. Il le serait avec un prix de 6 CHF, car 6 · 6 = 36.'}},
 {h:'Ce jeu est-il équitable ?',p:'Tu lances une pièce et un dé. Tu gagnes si tu obtiens pile <b>et</b> un nombre pair, ou face <b>et</b> un 6. Ton amie gagne dans tous les autres cas. Le jeu est-il équitable ?',
  opts:['Oui, chacun a 1 chance sur 2','Non, tu as 1 chance sur 3 de gagner','Non, tu as 2 chances sur 3 de gagner','Oui, car il y a autant de cas pile que de cas face'],ans:1,
  why:`Avec un arbre : P(pile et pair) = ${F(1,2)} · ${F(1,2)} = ${F(1,4)} et P(face et 6) = ${F(1,2)} · ${F(1,6)} = ${F(1,12)}. Tu gagnes avec P = ${F(3,12)} + ${F(1,12)} = ${F(4,12)} = ${F(1,3)}, ton amie avec ${F(2,3)} : pas équitable.`},
 {kind:'Défi',h:'Le sac à remplir',p:`Un sac contient des billes rouges et des billes bleues. On tire deux billes sans remise. Trouve un sac pour lequel la probabilité d’obtenir deux rouges vaut exactement ${F(1,2)}. Les curseurs règlent le nombre de billes de chaque couleur.`,
  params:[{id:'r',l:'Billes rouges',min:1,max:20,v:2},{id:'b',l:'Billes bleues',min:1,max:10,v:2}],
  draw:v=>{ const P=plane({x:[0,10.4],y:[0,3.4],grid:false,axes:false}); const n=v.r+v.b; for(let i=0;i<n;i++){ const x=.5+(i%10), y=2.8-Math.floor(i/10)*1; P.circ(x,y,.38,{fill:i<v.r?'var(--bad)':'var(--sci)',fo:.75,c:'var(--ink)',w:1}); } return P.svg(); },
  info:v=>{ const n=v.r+v.b, p=v.r*(v.r-1), q=n*(n-1); return `P(deux rouges) = ${F(v.r,n)} · ${F(v.r-1,n-1)} = ${F(p,q)}${p&&gcd(p,q)>1?' = '+fr(p,q):''} ≈ ${fmt(p/q,3)}`; },
  ok:v=>2*v.r*(v.r-1)===(v.r+v.b)*(v.r+v.b-1),
  why:`Ici, faire un tableau d’essais marche bien : on commence par une seule bleue et on augmente les rouges. Avec 3 rouges et 1 bleue : ${F(3,4)} · ${F(2,3)} = ${F(6,12)} = ${F(1,2)}. Il existe une autre solution : 15 rouges et 6 bleues, car ${F(15,21)} · ${F(14,20)} = ${F(210,420)} = ${F(1,2)}.`},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Vocabulaire</b> : expérience aléatoire, issue, univers Ω, événement (un groupe d’issues), événement impossible (P = 0) et certain (P = 1).</li>
<li><b>Issues équiprobables</b> : P(A) = cas favorables / cas possibles. Une probabilité est toujours entre 0 et 1.</li>
<li><b>Contraire</b> : P(Ā) = 1 − P(A). Très utile pour « au moins un » ou « ne… pas ».</li>
<li><b>Tableau à double entrée</b> pour deux épreuves comme deux dés : 36 cases équiprobables.</li>
<li><b>Arbre</b> : on multiplie le long d’un chemin, on additionne les chemins. <b>Sans remise</b>, on recompte le sac au 2e niveau.</li>
<li><b>Loi des grands nombres</b> : sur beaucoup d’essais, la fréquence se rapproche de la probabilité.</li>
<li><b>Jeu équitable</b> : mêmes probabilités de gagner, ou, avec de l’argent, bilan moyen nul sur un grand nombre de parties.</li>
<li>Rédaction d’un problème : une phrase, le calcul, la réponse.</li></ul></div>`},
 {kind:'Problème',h:'Le stand de la fête du village',p:'Tu tiens un stand à la fête du village. Le joueur paie 2 CHF et lance deux dés. Si la somme vaut 10 ou plus, il gagne un prix de 10 CHF ; sinon, il ne reçoit rien. Le comité veut savoir si le jeu est équitable, puis choisir un prix qui rapporte un peu d’argent au stand sans décourager les joueurs.',
  fig:diceGrid((i,j)=>i+j,(i,j)=>i+j>=10,'+'),
  parts:[
   {q:'a) Quelle est la probabilité de gagner ? (fraction ou décimal arrondi au centième)',lab:'P =',ans:1/6,tol:.005,hint:'Compte les cases coloriées du tableau des sommes.',why:`Somme 10 : 3 cases, 11 : 2 cases, 12 : 1 case. P = ${F(6,36)} = ${F(1,6)} ≈ 0,17.`},
   {q:'b) Sur 36 parties, combien le stand gagne-t-il en moyenne (mises encaissées moins prix payés) ?',unit:'CHF',ans:12,hint:'Sur 36 parties, il y a en moyenne 6 gagnants.',why:'Mises : 36 · 2 = 72 CHF. Prix : 6 · 10 = 60 CHF. Le stand gagne en moyenne 72 − 60 = 12 CHF : le jeu n’est pas équitable.'},
   {q:'c) Quel prix rendrait le jeu équitable ?',unit:'CHF',ans:12,hint:'Les 6 prix moyens doivent compenser exactement les 72 CHF de mises.',why:'Il faut 6 · prix = 72, donc prix = 12 CHF.'},
   {q:'d) Le comité veut que le stand gagne en moyenne 0,50 CHF par partie. Quel prix faut-il choisir ?',unit:'CHF',ans:9,hint:'Sur 36 parties, le stand doit gagner 36 · 0,50 = 18 CHF.',why:'72 − 6 · prix = 18, donc 6 · prix = 54 et prix = 9 CHF.'}],
  sol:`On gagne si la somme vaut 10, 11 ou 12 : 3 + 2 + 1 = 6 cases sur 36, donc P = ${F(1,6)}. Sur 36 parties, le stand encaisse 72 CHF et paie en moyenne 6 prix. Avec un prix de 10 CHF, il garde 72 − 60 = 12 CHF : le jeu n’est pas équitable. Il le serait avec un prix de 12 CHF (6 · 12 = 72). Pour gagner 0,50 CHF par partie, soit 18 CHF sur 36 parties, il faut 72 − 6 · prix = 18, donc un prix de 9 CHF.`},
 {kind:'Problème',h:'Deux billes sans remise',p:'Un sac opaque contient 4 billes rouges et 6 billes vertes. Tu tires une bille, tu la gardes, puis tu en tires une deuxième. Tu veux connaître les chances d’obtenir deux billes de la même couleur, puis comparer avec un tirage où l’on remet la première bille dans le sac.',
  fig:tree([['R','4/10'],['V','6/10']],[[['R','3/9'],['V','6/9']],[['R','4/9'],['V','5/9']]]),
  parts:[
   {q:'a) Quelle est la probabilité de tirer deux rouges ? (fraction ou décimal arrondi au millième)',lab:'P =',ans:2/15,tol:.001,hint:'Après une rouge, il reste 3 rouges sur 9 billes.',why:`${F(4,10)} · ${F(3,9)} = ${F(12,90)} = ${F(2,15)} ≈ 0,133.`},
   {q:'b) Quelle est la probabilité de tirer deux billes de la même couleur ? (arrondi au millième)',lab:'P =',ans:7/15,tol:.001,hint:'Additionne les chemins rouge-rouge et vert-vert.',why:`P(VV) = ${F(6,10)} · ${F(5,9)} = ${F(30,90)}. P(même couleur) = ${F(12,90)} + ${F(30,90)} = ${F(42,90)} = ${F(7,15)} ≈ 0,467.`},
   {q:'c) Quelle est la probabilité d’obtenir au moins une bille verte ? (arrondi au millième)',lab:'P =',ans:13/15,tol:.001,hint:'Quel est le contraire de « au moins une verte » ?',why:`Le contraire est « deux rouges ». P = 1 − ${F(2,15)} = ${F(13,15)} ≈ 0,867.`},
   {q:'d) Si l’on remet la première bille, la probabilité de deux rouges…',opts:['diminue','augmente','ne change pas','devient 1/2'],ans:1,hint:'Calcule le chemin rouge-rouge avec un sac qui ne change pas.',why:`Avec remise : ${F(4,10)} · ${F(4,10)} = ${F(16,100)} = 0,16, plus grand que ${F(2,15)} ≈ 0,133. Sans remise, une rouge déjà sortie rend la seconde moins probable.`}],
  sol:`Arbre sans remise : P(RR) = ${F(4,10)} · ${F(3,9)} = ${F(2,15)} et P(VV) = ${F(6,10)} · ${F(5,9)} = ${F(1,3)}. Deux billes de même couleur : ${F(2,15)} + ${F(5,15)} = ${F(7,15)} ≈ 47 %. « Au moins une verte » est le contraire de « deux rouges » : 1 − ${F(2,15)} = ${F(13,15)} ≈ 87 %. Avec remise, P(RR) = 0,4 · 0,4 = 0,16 : c’est un peu plus que sans remise, car le sac reste plein de rouges au second tirage.`},
]},

/* ===================== FONCTIONS ===================== */
{subj:'sec', sem:'a11', id:'sec11-fonctions', o:7, h:'Fonctions', p:'Retrouver l’expression d’une droite, découvrir les paraboles, l’hyperbole de la proportionnalité inverse, les courbes de x³ et de √x, et calculer avec des vitesses, des masses volumiques et des débits.', steps:[
 {kind:'Théorie',h:'Rappel : la fonction affine',p:`<p>Ton abonnement de téléphone coûte 10 CHF par mois, plus 2 CHF par gigaoctet consommé. Pour <i>x</i> gigaoctets, tu paies 2<i>x</i> + 10 francs. C’est une fonction affine, que tu as rencontrée l’an passé.</p>
<div class="def"><p>Une <b>fonction affine</b> s’écrit <i>f</i>(<i>x</i>) = <i>ax</i> + <i>b</i>. Son graphique est une droite. Le nombre <i>a</i> est la <b>pente</b> : quand <i>x</i> augmente de 1, <i>f</i>(<i>x</i>) augmente de <i>a</i>. Le nombre <i>b</i> est l’<b>ordonnée à l’origine</b> : c’est <i>f</i>(0), la hauteur où la droite coupe l’axe vertical.</p></div>
<div class="idea"><p>Imagine un escalier posé contre la droite : chaque marche avance de 1 et monte de <i>a</i> (le petit escalier orange). Si <i>a</i> &gt; 0, la droite monte ; si <i>a</i> &lt; 0, elle descend ; si <i>a</i> = 0, elle est horizontale. Si <i>b</i> = 0, elle passe par l’origine : c’est la proportionnalité.</p></div>
<div class="ex"><p><i>f</i>(<i>x</i>) = 2<i>x</i> + 10 : <i>f</i>(0) = 10 et <i>f</i>(3) = 2 · 3 + 10 = 16. La pente 2 est le prix d’un gigaoctet, l’ordonnée à l’origine 10 est le prix fixe. Règle les curseurs pour voir d’autres droites.</p></div>`,
  params:[{id:'a',l:'Pente a',min:-3,max:3,step:.5,v:1},{id:'b',l:'Ordonnée à l’origine b',min:-4,max:4,v:2}],
  draw:v=>lineFig(v.a,v.b),
  info:v=>`<i>f</i>(<i>x</i>) = ${affTxt(v.a,v.b)} : ${v.a>0?'la droite monte':v.a<0?'la droite descend':'la droite est horizontale'} et coupe l’axe vertical en (0 ; ${fmt(v.b)}).`},
 {kind:'Méthode',h:'Trouver l’expression d’une droite',p:`<b>Quand :</b> on te donne le graphique d’une droite, ou deux de ses points, et tu cherches son expression <i>f</i>(<i>x</i>) = <i>ax</i> + <i>b</i>. <b>Pourquoi ça marche :</b> sur une droite, la pente est la même partout. Entre deux points A(<i>x</i>₁ ; <i>y</i>₁) et B(<i>x</i>₂ ; <i>y</i>₂), elle vaut <b><i>a</i> = ${F('<i>y</i>₂ − <i>y</i>₁','<i>x</i>₂ − <i>x</i>₁')}</b> : ce qu’on monte divisé par ce qu’on avance. <b>Comment :</b> 1) sur un graphique, lis <i>b</i> là où la droite coupe l’axe vertical ; 2) choisis deux points bien lisibles (sur des nœuds de la grille) et calcule <i>a</i> ; 3) si <i>b</i> n’est pas lisible, remplace <i>x</i> et <i>y</i> par les coordonnées d’un point dans <i>y</i> = <i>ax</i> + <i>b</i> et isole <i>b</i> ; 4) contrôle avec l’autre point.`,
  demo:{enonce:'Trouver l’expression de la droite qui passe par A(1 ; 5) et B(4 ; 11).',
   etapes:[
    {f:`<i>a</i> = ${F('11 − 5','4 − 1')} = ${F(6,3)} = 2`,w:'De A à B, on avance de 3 et on monte de 6.'},
    {f:'5 = 2 · 1 + <i>b</i>',w:'A est sur la droite : ses coordonnées vérifient y = 2x + b.'},
    {f:'<i>b</i> = 5 − 2 = 3',w:'On isole b.'},
    {f:'Contrôle avec B : 2 · 4 + 3 = 11 ✓',w:'Le second point doit aussi vérifier l’expression.'}],
   conclusion:'f(x) = 2x + 3. Sur un graphique, on aurait pu lire directement b = 3 : la droite coupe l’axe vertical en (0 ; 3).'},
  fig:(()=>{ const P=plane({x:[-1,6],y:[-1,12],w:240,h:300,lab:2}); P.fn(x=>2*x+3); P.seg(1,5,4,5,{c:'var(--spark)',w:2.5}).seg(4,5,4,11,{c:'var(--spark)',w:2.5});
    P.text(2.5,5,'avance 3',{a:'middle',dy:16,s:11,c:'var(--spark)'}).text(4,8,'monte 6',{dx:6,s:11,c:'var(--spark)'}); P.dot(1,5,{l:'A',dx:-18}).dot(4,11,{l:'B',dx:-18}).dot(0,3,{r:5,c:'var(--accent)',l:'b = 3'}); return P.svg(); })()},
 {kind:'Pratique',h:'Fais passer la droite',p:'Règle <i>a</i> et <i>b</i> pour que la droite passe par les deux points rouges P(−1 ; 4) et Q(2 ; −2).',
  params:[{id:'a',l:'Pente a',min:-3,max:3,step:.5,v:1},{id:'b',l:'Ordonnée à l’origine b',min:-4,max:4,v:0}],
  draw:v=>lineFig(v.a,v.b,[[-1,4,'P'],[2,-2,'Q']]),
  info:v=>`<i>f</i>(<i>x</i>) = ${affTxt(v.a,v.b)} ; <i>f</i>(−1) = ${fmt(-v.a+v.b)} et <i>f</i>(2) = ${fmt(2*v.a+v.b)}`,
  ok:v=>v.a===-2&&v.b===2,why:`<i>a</i> = ${F('−2 − 4','2 − (−1)')} = ${F('−6','3')} = −2. Puis 4 = −2 · (−1) + <i>b</i>, soit 4 = 2 + <i>b</i>, donc <i>b</i> = 2 : <i>f</i>(<i>x</i>) = −2<i>x</i> + 2.`},
 {h:'À toi : lis la pente',p:'Quelle est la pente <i>a</i> de la droite dessinée ? Choisis deux points sur les nœuds de la grille.',
  fig:(()=>{ const P=plane({x:[-4,4],y:[-4,4],lab:1}); P.fn(x=>1.5*x-2); P.dot(0,-2,{r:5}).dot(2,1,{r:5}); return P.svg(); })(),
  lab:'a =',ans:1.5,tol:.001,why:`La droite passe par (0 ; −2) et (2 ; 1). De l’un à l’autre, on avance de 2 et on monte de 3 : <i>a</i> = ${F(3,2)} = 1,5. Son expression est <i>f</i>(<i>x</i>) = 1,5<i>x</i> − 2.`},
 {kind:'Théorie',h:'La parabole y = ax²',p:`<p>Lâche une balle du haut d’une tour : après 1 s, elle a parcouru environ 5 m, après 2 s environ 20 m, après 3 s environ 45 m. La distance n’est pas proportionnelle au temps : elle vaut environ 5<i>t</i>². Ce genre de fonction donne une courbe nouvelle.</p>
<div class="def"><p>La fonction <i>f</i>(<i>x</i>) = <i>ax</i>² (avec <i>a</i> ≠ 0) a pour graphique une <b>parabole</b>. Son <b>sommet</b> est l’origine (0 ; 0), et l’axe vertical est son <b>axe de symétrie</b>.</p></div>
<div class="idea"><p>Si <i>a</i> &gt; 0, la parabole est ouverte vers le haut, comme un sourire, et son sommet est le point le plus bas. Si <i>a</i> &lt; 0, elle est tournée vers le bas. Plus <i>a</i> est loin de 0, plus elle est étroite. La symétrie vient de (−<i>x</i>)² = <i>x</i>² : <i>f</i>(−3) = <i>f</i>(3).</p></div>
<div class="ex"><p><i>f</i>(<i>x</i>) = 2<i>x</i>² : <i>f</i>(1) = 2, <i>f</i>(−1) = 2, <i>f</i>(3) = 18. Doubler <i>x</i> multiplie <i>f</i>(<i>x</i>) par 4 : <i>f</i>(6) = 72 = 4 · 18.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Vers 1600, Galilée a fait rouler des billes sur des plans inclinés. Il a découvert que la distance parcourue grandit comme le carré du temps, et compris que la trajectoire d’un objet lancé est une parabole.</p></div>`,
  params:[{id:'a',l:'a',min:-3,max:3,step:.25,v:.5}],
  draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:1}); P.fn(x=>x*x,{c:'var(--muted)',w:1.5,dash:true}); P.fn(x=>v.a*x*x); P.dot(0,0,{r:5,c:'var(--spark)'}); return P.svg(); },
  info:v=>v.a===0?'a = 0 : f(x) = 0, c’est une droite horizontale, plus une parabole.':`<i>f</i>(<i>x</i>) = ${fmt(v.a)}<i>x</i>² : ouverte vers ${v.a>0?'le haut':'le bas'}, ${Math.abs(v.a)>1?'plus étroite':Math.abs(v.a)<1?'plus large':'aussi large'} que <i>y</i> = <i>x</i>² (en pointillé). <i>f</i>(2) = ${fmt(4*v.a)}.`},
 {kind:'Théorie',h:'La proportionnalité inverse : y = a/x',p:`<p>Une pizza de 12 parts pour une bande d’amis : à 2, chacun en a 6 ; à 3, chacun 4 ; à 4, chacun 3. Plus on est nombreux, moins on en a. Mais ce qui reste fixe, c’est le <b>produit</b> : 2 · 6 = 3 · 4 = 4 · 3 = 12.</p>
<div class="def"><p>Deux grandeurs <i>x</i> et <i>y</i> sont <b>inversement proportionnelles</b> si leur produit est constant : <i>x</i> · <i>y</i> = <i>a</i>. Alors <i>y</i> = ${F('<i>a</i>','<i>x</i>')}. Le graphique de la fonction <i>f</i>(<i>x</i>) = ${F('<i>a</i>','<i>x</i>')} (avec <i>x</i> ≠ 0) est une <b>hyperbole</b>.</p></div>
<div class="idea"><p>Un point (<i>x</i> ; <i>y</i>) de la courbe forme avec les axes un rectangle d’aire <i>x</i> · <i>y</i> = <i>a</i>. Bouge le curseur <i>x</i> : le rectangle s’allonge et s’aplatit, mais son aire ne change pas. Quand <i>x</i> double, <i>y</i> est divisé par 2.</p></div>
<div class="ex"><p>Un trajet de 120 km : à 60 km/h il dure 2 h, à 40 km/h 3 h, à 120 km/h 1 h. Vitesse · durée = 120, donc durée = ${F(120,'<i>v</i>')}.</p></div>
<div class="warn"><p>« Quand l’un augmente, l’autre diminue » ne suffit pas. <i>y</i> = 10 − <i>x</i> diminue aussi, mais 1 · 9 ≠ 2 · 8 : ce n’est pas de la proportionnalité inverse.</p></div>`,
  params:[{id:'a',l:'Produit a',min:2,max:12,step:2,v:12},{id:'x',l:'x',min:1,max:8,step:.5,v:2}],
  draw:v=>hyperFig(v.a,v.x),
  info:v=>`<i>x</i> = ${fmt(v.x)}, <i>y</i> = ${F(v.a,fmt(v.x))} ≈ ${fmt(v.a/v.x)} et <i>x</i> · <i>y</i> = ${v.a} : l’aire du rectangle reste ${v.a}.`},
 {kind:'Méthode',h:'Reconnaître et utiliser la proportionnalité inverse',p:`<b>Quand :</b> un tableau ou un énoncé met en jeu deux grandeurs dont l’une diminue quand l’autre augmente : nombre d’ouvriers et durée d’un travail, vitesse et durée d’un trajet, nombre de parts et taille des parts. <b>Pourquoi ça marche :</b> si <i>x</i> · <i>y</i> = <i>a</i> dans toutes les colonnes, alors <i>y</i> = <i>a</i>/<i>x</i>, et il suffit de trouver <i>a</i>. <b>Comment :</b> 1) multiplie <i>x</i> par <i>y</i> dans chaque colonne ; 2) si le produit est toujours le même, c’est de la proportionnalité inverse et ce produit est <i>a</i> ; 3) calcule la valeur cherchée avec <i>y</i> = <i>a</i>/<i>x</i>.`,
  demo:{enonce:'Le tableau donne la durée d’un chantier de peinture selon le nombre de peintres. Combien de jours faut-il à 8 peintres ? à 5 peintres ?',
   etapes:[
    {f:'2 · 12 = 24, 3 · 8 = 24, 4 · 6 = 24',w:'Le produit est toujours 24 : la durée est inversement proportionnelle au nombre de peintres.'},
    {f:`jours = ${F(24,'peintres')}`,w:'a = 24 : c’est la quantité totale de travail, en « jours de peintre ».'},
    {f:`8 peintres : ${F(24,8)} = 3 jours`,w:'Deux fois plus de peintres qu’avec 4 : deux fois moins de jours.'},
    {f:`5 peintres : ${F(24,5)} = 4,8 jours`,w:'La formule marche même quand le résultat ne tombe pas juste.'}],
   conclusion:'3 jours avec 8 peintres, 4,8 jours avec 5, à condition que tous travaillent au même rythme.'},
  fig:tab([['peintres','2','3','4','8','5'],['jours','12','8','6','?','?']])},
 {h:'À toi : le voyage à vélo',p:'À 18 km/h, Noé met 2,5 h pour aller chez sa grand-mère. Combien de temps mettrait-il à 15 km/h ?',lab:'durée =',unit:'h',ans:3,tol:.001,
  why:'Vitesse et durée sont inversement proportionnelles : 18 · 2,5 = 45 (c’est la distance, 45 km). À 15 km/h : durée = 45 : 15 = 3 h.'},
 {kind:'Théorie',h:'Le cube et la racine : y = x³ et y = √x',p:`<p>Un cube d’arête <i>x</i> cm a un volume de <i>x</i>³ cm³. Un carré d’aire <i>x</i> m² a un côté de √<i>x</i> m. Ces deux formules donnent deux nouvelles courbes, à comparer avec la parabole <i>y</i> = <i>x</i>².</p>
<div class="def"><p>La fonction <i>f</i>(<i>x</i>) = <i>x</i>³ est définie pour tous les nombres <i>x</i>. La fonction <i>g</i>(<i>x</i>) = √<i>x</i> n’est définie que pour <i>x</i> ≥ 0, car la racine carrée d’un nombre négatif n’existe pas.</p></div>
<div class="idea"><p>La courbe de <i>x</i>³ passe par (−1 ; −1), (0 ; 0), (1 ; 1) et (2 ; 8). Elle monte toujours, de plus en plus vite, et elle est symétrique par rapport à l’origine, car (−<i>x</i>)³ = −<i>x</i>³. La courbe de √<i>x</i> ressemble à une demi-parabole couchée : elle part de (0 ; 0), passe par (1 ; 1), (4 ; 2), (9 ; 3) et monte de plus en plus lentement.</p></div>
<div class="ex"><p>Arête 3 cm : volume 27 cm³. Doubler l’arête multiplie le volume par 2³ = 8. Pour √<i>x</i> : il faut une aire de 100 m² pour un côté de 10 m, mais de 400 m² pour un côté de 20 m.</p></div>
<div class="warn"><p>Pour <i>x</i> entre 0 et 1, l’ordre s’inverse : 0,5³ = 0,125 &lt; 0,5² = 0,25 &lt; 0,5 &lt; √0,5 ≈ 0,71.</p></div>`,
  fig:(()=>{ const P=plane({x:[-3,5],y:[-3,5],lab:1}); P.fn(x=>x*x,{c:'var(--muted)',w:2,dash:true}); P.fn(x=>x*x*x,{c:'var(--bad)'}); P.fn(x=>Math.sqrt(x),{from:0,to:5,c:'var(--ok)'});
    P.text(1.7,4.4,'y = x³',{c:'var(--bad)',s:12}).text(3.2,1.3,'y = √x',{c:'var(--ok)',s:12}).text(-2.9,3.6,'y = x²',{c:'var(--muted)',s:12}); P.dot(1,1,{r:4,c:'var(--ink)'}); return P.svg(); })()},
 {kind:'Théorie',h:'La parabole y = ax² + bx + c',p:`<p>Au basket, le ballon monte, ralentit, puis redescend vers le panier. Sa hauteur suit une parabole, mais son sommet n’est pas à l’origine. Il faut une expression plus riche que <i>ax</i>².</p>
<div class="def"><p>Une <b>fonction du 2e degré</b> s’écrit <i>f</i>(<i>x</i>) = <i>ax</i>² + <i>bx</i> + <i>c</i>, avec <i>a</i> ≠ 0. Son graphique est une parabole. Son <b>sommet</b> S a pour abscisse <b><i>x</i><sub>S</sub> = −${F('<i>b</i>','2<i>a</i>')}</b>, et son ordonnée est <i>f</i>(<i>x</i><sub>S</sub>). Ses <b>zéros</b>, là où elle coupe l’axe horizontal, sont les solutions de l’équation <i>ax</i>² + <i>bx</i> + <i>c</i> = 0.</p></div>
<div class="why"><p>Tu as vu dans le chapitre sur les équations que les solutions sont ${F('−<i>b</i> − √Δ','2<i>a</i>')} et ${F('−<i>b</i> + √Δ','2<i>a</i>')}, avec Δ = <i>b</i>² − 4<i>ac</i>. La parabole est symétrique, donc son sommet est juste au milieu des deux zéros : la moyenne des deux solutions vaut −<i>b</i>/(2<i>a</i>).</p></div>
<div class="idea"><p><i>a</i> règle l’ouverture, comme pour <i>ax</i>². <i>c</i> = <i>f</i>(0) est l’ordonnée à l’origine. Le discriminant Δ dit combien de fois la parabole coupe l’axe horizontal : 2 fois si Δ &gt; 0, 1 fois (le sommet le touche) si Δ = 0, jamais si Δ &lt; 0.</p></div>
<div class="ex"><p><i>f</i>(<i>x</i>) = <i>x</i>² − 4<i>x</i> + 3 : <i>x</i><sub>S</sub> = 4/2 = 2 et <i>f</i>(2) = −1, donc S(2 ; −1). Δ = 16 − 12 = 4, zéros (4 ± 2)/2, soit 1 et 3. Leur milieu est bien 2.</p></div>`,
  params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'b',l:'b',min:-4,max:4,v:-4},{id:'c',l:'c',min:-4,max:4,v:3}],
  draw:v=>paraFig(v.a,v.b,v.c),
  info:v=>{ if(v.a===0) return 'a = 0 : ce n’est plus une fonction du 2e degré, le graphique devient une droite.'; const xs=-v.b/(2*v.a), ys=v.a*xs*xs+v.b*xs+v.c, D=v.b*v.b-4*v.a*v.c;
    const z=D<0?'aucun zéro':D===0?`un seul zéro, ${fmt(xs)}`:`deux zéros, ${[(-v.b-Math.sqrt(D))/(2*v.a),(-v.b+Math.sqrt(D))/(2*v.a)].sort((p,q)=>p-q).map(z=>fmt(z)).join(' et ')}`;
    return `Sommet S(${fmt(xs)} ; ${fmt(ys)}), Δ = ${fmt(D)} : ${z}. Ordonnée à l’origine ${v.c}.`; }},
 {kind:'Méthode',h:'Étudier une parabole',p:`<b>Quand :</b> on te donne <i>f</i>(<i>x</i>) = <i>ax</i>² + <i>bx</i> + <i>c</i> et tu veux son allure : où est le sommet, où la courbe coupe les axes, si elle est tournée vers le haut ou vers le bas. <b>Pourquoi ça marche :</b> tout se lit dans les coefficients. Le signe de <i>a</i> donne l’ouverture, <i>c</i> l’intersection avec l’axe vertical, −<i>b</i>/(2<i>a</i>) l’axe de symétrie, et l’équation <i>f</i>(<i>x</i>) = 0 les zéros. <b>Comment :</b> 1) regarde le signe de <i>a</i> ; 2) calcule <i>f</i>(0) = <i>c</i> ; 3) calcule le sommet ; 4) trouve les zéros par factorisation ou avec Δ ; 5) fais un croquis.`,
  demo:{enonce:'Étudier f(x) = x² − 2x − 3.',
   etapes:[
    {f:'<i>a</i> = 1 &gt; 0 : parabole tournée vers le haut',w:'Le sommet sera le point le plus bas.'},
    {f:'<i>f</i>(0) = −3 : elle coupe l’axe vertical en (0 ; −3)',w:'On remplace x par 0 : il ne reste que c.'},
    {f:'<i>x</i><sub>S</sub> = −(−2)/(2 · 1) = 1 et <i>f</i>(1) = 1 − 2 − 3 = −4, donc S(1 ; −4)',w:'Attention au signe : b = −2, donc −b = 2.'},
    {f:'Δ = (−2)² − 4 · 1 · (−3) = 16, <i>x</i> = (2 ± 4)/2, donc <i>x</i> = −1 ou <i>x</i> = 3',w:'Les zéros sont les solutions de x² − 2x − 3 = 0. Contrôle : (x + 1)(x − 3) = x² − 2x − 3.'},
    {f:'Le milieu de −1 et 3 est 1 = <i>x</i><sub>S</sub> ✓',w:'La symétrie permet de vérifier les calculs.'}],
   conclusion:'Parabole tournée vers le haut, sommet S(1 ; −4), zéros −1 et 3, elle passe par (0 ; −3). La plus petite valeur de f est −4.'},
  fig:paraFig(1,-2,-3)},
 {h:'À toi : le sommet',p:'Quelle est la plus grande valeur de <i>f</i>(<i>x</i>) = −<i>x</i>² + 6<i>x</i> − 5, c’est-à-dire l’ordonnée de son sommet ?',lab:'y_S =',ans:4,
  why:'a = −1 &lt; 0 : la parabole est tournée vers le bas, le sommet est le point le plus haut. x_S = −6/(2 · (−1)) = 3 et f(3) = −9 + 18 − 5 = 4.'},
 {kind:'Théorie',h:'Les grandeurs composées',p:`<p>À la piscine, au marché ou en voiture, on rencontre des grandeurs qui en combinent deux autres : des kilomètres par heure, des grammes par cm³, des litres par minute. On les appelle des <b>grandeurs composées</b>.</p>
<div class="def"><p><b>Vitesse moyenne</b> : <i>v</i> = ${F('<i>d</i>','<i>t</i>')} (km/h, m/s). <b>Masse volumique</b> : ρ = ${F('<i>m</i>','<i>V</i>')} (g/cm³, kg/m³) ; la lettre grecque ρ se lit « rhô ». <b>Débit</b> : <i>Q</i> = ${F('<i>V</i>','<i>t</i>')} (L/min, m³/h).</p></div>
<div class="idea"><p>Chacune est une pente ! Sur un diagramme distance-temps, la vitesse moyenne est la pente du segment qui relie le départ à l’arrivée. Le diagramme montre une balade à vélo : 30 km en 2 h, avec une pause. La vitesse a changé en route, mais la moyenne vaut 30 : 2 = 15 km/h.</p></div>
<div class="ex"><p>Fer : 79 g pour 10 cm³, donc ρ = 7,9 g/cm³. Robinet : 36 L en 3 min, donc <i>Q</i> = 12 L/min.</p></div>
<div class="warn"><p>Les unités vont ensemble : 1 m/s = 3600 m/h = 3,6 km/h. Pour passer de km/h à m/s, divise par 3,6.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Selon la légende, Archimède a vérifié qu’une couronne était en or pur en la plongeant dans l’eau : il obtenait son volume, donc sa masse volumique, sans l’abîmer. L’or vaut environ 19,3 g/cm³, l’argent seulement 10,5.</p></div>`,
  fig:(()=>{ const P=plane({x:[-.3,2.3],y:[-4,34],w:300,h:220,grid:false,axes:false});
    for(let t=0;t<=2;t+=.5){ P.seg(t,0,t,32,{c:'var(--line)',w:1}); P.text(t,0,fmt(t)+' h',{a:'middle',dy:15,s:10,c:'var(--muted)'}); }
    for(let d=10;d<=30;d+=10){ P.seg(0,d,2.2,d,{c:'var(--line)',w:1}); P.text(0,d,d+' km',{dx:3,dy:-3,s:10,c:'var(--muted)'}); }
    P.seg(0,0,2.2,0,{c:'var(--muted)',w:1.5}).seg(0,0,0,33,{c:'var(--muted)',w:1.5});
    P.poly([[0,0],[1,18],[1.25,18],[2,30]],{open:true,c:'var(--accent)',w:3}).seg(0,0,2,30,{c:'var(--spark)',w:2,dash:true});
    P.text(1.12,18,'pause',{a:'middle',dy:-8,s:11}).text(1.5,11,'moyenne : 15 km/h',{a:'middle',s:11,c:'var(--spark)'}); return P.svg(); })()},
 {kind:'Méthode',h:'Calculer avec une grandeur composée',p:`<b>Quand :</b> un problème parle de vitesse, de masse volumique ou de débit et donne deux des trois grandeurs. <b>Pourquoi ça marche :</b> <i>v</i> = <i>d</i>/<i>t</i> se retourne comme toute égalité : <i>d</i> = <i>v</i> · <i>t</i> et <i>t</i> = <i>d</i>/<i>v</i>. De même, <i>m</i> = ρ · <i>V</i> et <i>V</i> = <i>Q</i> · <i>t</i>. <b>Comment :</b> 1) écris la formule ; 2) convertis les données dans des unités qui vont ensemble (km et heures, ou m et secondes, g et cm³) ; 3) calcule ; 4) rédige : une phrase, le calcul, la réponse avec l’unité.`,
  demo:{enonce:'Un train parcourt 150 km en 1 h 15 min. Quelle est sa vitesse moyenne, en km/h puis en m/s ?',
   etapes:[
    {f:'1 h 15 min = 1 h + 15/60 h = 1,25 h',w:'15 min, c’est un quart d’heure. Surtout pas 1,15 h !'},
    {f:'<i>v</i> = 150 : 1,25 = 120 km/h',w:'On applique v = d/t avec des km et des heures.'},
    {f:'120 km/h = 120 000 m : 3600 s ≈ 33,3 m/s',w:'1 km = 1000 m et 1 h = 3600 s. On peut aussi diviser directement 120 par 3,6.'}],
   conclusion:'Le train roule en moyenne à 120 km/h, soit environ 33,3 m/s. Même démarche pour une baignoire de 180 L remplie à 12 L/min : t = V/Q = 180 : 12 = 15 min.'}},
 {h:'À toi : la masse volumique',p:'Un lingot d’aluminium de 270 g a un volume de 100 cm³. Quelle est la masse d’un bloc d’aluminium de 2,5 dm³ ? (en kg)',lab:'m =',unit:'kg',ans:6.75,tol:.001,
  why:'ρ = 270 : 100 = 2,7 g/cm³. 2,5 dm³ = 2500 cm³, donc m = 2,7 · 2500 = 6750 g = 6,75 kg.'},
 {kind:'Défi',h:'L’enclos le plus grand',p:'Tu as 20 m de grillage pour fermer un enclos rectangulaire à lapins, adossé à un mur : le grillage ne fait que trois côtés. Si les deux côtés perpendiculaires au mur mesurent <i>x</i> m, le côté parallèle mesure 20 − 2<i>x</i> m. Quelle est la plus grande aire possible ?',
  fig:(()=>{ const P=plane({x:[-1,11],y:[-1.4,6.4],grid:false,axes:false}); P.seg(-.5,5.5,10.5,5.5,{c:'var(--ink)',w:6}); P.text(5,5.5,'mur',{a:'middle',dy:-8,s:12});
    P.poly([[0,5.5],[0,1],[10,1],[10,5.5]],{open:true,c:'var(--ok)',w:3}); P.text(0,3.2,'x',{dx:-14,dy:4}).text(10,3.2,'x',{dx:6,dy:4}).text(5,1,'20 − 2x',{a:'middle',dy:18}); return P.svg(); })(),
  lab:'aire max =',unit:'m²',ans:50,
  why:'Ici, faire un tableau marche bien : x = 3 donne 3 · 14 = 42, x = 4 donne 48, x = 5 donne 50, x = 6 donne 48. L’aire A(x) = x(20 − 2x) = −2x² + 20x est une parabole tournée vers le bas, de sommet x_S = −20/(2 · (−2)) = 5. L’aire maximale vaut 5 · 10 = 50 m².'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Fonction affine</b> <i>f</i>(<i>x</i>) = <i>ax</i> + <i>b</i> : une droite de pente <i>a</i> et d’ordonnée à l’origine <i>b</i> = <i>f</i>(0).</li>
<li><b>Droite par deux points</b> : <i>a</i> = (<i>y</i>₂ − <i>y</i>₁)/(<i>x</i>₂ − <i>x</i>₁), puis on trouve <i>b</i> en remplaçant les coordonnées d’un point, et on contrôle avec l’autre.</li>
<li><b><i>y</i> = <i>ax</i>²</b> : parabole de sommet (0 ; 0), vers le haut si <i>a</i> &gt; 0, vers le bas si <i>a</i> &lt; 0.</li>
<li><b>Proportionnalité inverse</b> : <i>x</i> · <i>y</i> = <i>a</i> constant, <i>y</i> = <i>a</i>/<i>x</i>, une hyperbole.</li>
<li><b><i>y</i> = <i>x</i>³</b> est définie partout et symétrique par rapport à l’origine ; <b><i>y</i> = √<i>x</i></b> n’existe que pour <i>x</i> ≥ 0.</li>
<li><b><i>y</i> = <i>ax</i>² + <i>bx</i> + <i>c</i></b> : sommet en <i>x</i><sub>S</sub> = −<i>b</i>/(2<i>a</i>), ordonnée à l’origine <i>c</i>, zéros = solutions de <i>ax</i>² + <i>bx</i> + <i>c</i> = 0 (0, 1 ou 2 selon le signe de Δ).</li>
<li><b>Grandeurs composées</b> : <i>v</i> = <i>d</i>/<i>t</i>, ρ = <i>m</i>/<i>V</i>, <i>Q</i> = <i>V</i>/<i>t</i>. Convertis d’abord (1 h 15 min = 1,25 h ; km/h : 3,6 = m/s).</li>
<li>Rédaction : une phrase, le calcul, la réponse avec l’unité.</li></ul></div>`},
 {kind:'Problème',h:'Le jet d’eau de la fontaine',p:'Sur la place du village, un jet d’eau sort d’un tuyau placé sur un muret. La hauteur de l’eau, en mètres, est donnée par h(x) = −0,5x² + 2x + 2,5, où x est la distance horizontale en mètres depuis le tuyau. Le sol correspond à h = 0. Tu veux savoir à quelle hauteur l’eau sort, jusqu’où elle monte et où elle retombe.',
  fig:(()=>{ const P=plane({x:[-1,6],y:[-.5,5.5],w:300,lab:1}); P.fn(x=>-.5*x*x+2*x+2.5,{from:0,to:5,c:'var(--sci)'}); P.rect(-.6,0,.6,2.5,{fill:'var(--muted)',fo:.4,c:'var(--ink)',w:1}); P.dot(2,4.5,{r:5,c:'var(--spark)'}); return P.svg(); })(),
  parts:[
   {q:'a) À quelle hauteur l’eau sort-elle du tuyau ?',unit:'m',ans:2.5,tol:.001,hint:'Le tuyau est en x = 0.',why:'h(0) = 2,5 : c’est l’ordonnée à l’origine c.'},
   {q:'b) Quelle hauteur maximale l’eau atteint-elle ?',unit:'m',ans:4.5,tol:.001,hint:'Calcule d’abord x_S = −b/(2a), puis h(x_S).',why:'x_S = −2/(2 · (−0,5)) = 2 et h(2) = −2 + 4 + 2,5 = 4,5 m.'},
   {q:'c) À quelle distance du tuyau l’eau touche-t-elle le sol ?',unit:'m',ans:5,tol:.001,hint:'Résous h(x) = 0 : multiplie d’abord par −2 pour obtenir x² − 4x − 5 = 0.',why:'x² − 4x − 5 = 0, Δ = 16 + 20 = 36, x = (4 ± 6)/2, soit x = 5 ou x = −1. Seul x = 5 m a un sens ici.'},
   {q:'d) À quelle autre distance l’eau est-elle de nouveau à 2,5 m de haut ?',unit:'m',ans:4,tol:.001,hint:'Utilise la symétrie de la parabole autour de x = 2.',why:'Le point (0 ; 2,5) a un symétrique par rapport à l’axe x = 2 : c’est (4 ; 2,5). Contrôle : h(4) = −8 + 8 + 2,5 = 2,5.'}],
  sol:'L’eau sort à h(0) = 2,5 m. La parabole est tournée vers le bas (a = −0,5) ; son sommet est en x = −2/(2 · (−0,5)) = 2, à la hauteur h(2) = 4,5 m. Les zéros vérifient −0,5x² + 2x + 2,5 = 0, soit x² − 4x − 5 = 0 : Δ = 36, x = 5 ou x = −1. L’eau retombe à 5 m du tuyau. Par symétrie autour de x = 2, elle repasse à 2,5 m de haut en x = 4.'},
 {kind:'Problème',h:'Remplir la piscine',p:'Une piscine contient déjà 12 m³ d’eau. On la remplit avec un tuyau qui débite 30 litres par minute. Elle est pleine à 75 m³. Rappel : 1 m³ = 1000 L, et 1 m³ d’eau a une masse de 1000 kg. Tu veux prévoir la durée du remplissage, puis voir ce que change un second tuyau.',
  fig:(()=>{ const P=plane({x:[-4,40],y:[-8,82],w:300,h:220,grid:false,axes:false});
    for(let t=10;t<=35;t+=10){ P.seg(t,0,t,80,{c:'var(--line)',w:1}); P.text(t,0,t+' h',{a:'middle',dy:15,s:10,c:'var(--muted)'}); }
    for(let v=25;v<=75;v+=25){ P.seg(0,v,38,v,{c:'var(--line)',w:1}); P.text(0,v,v+' m³',{dx:3,dy:-3,s:10,c:'var(--muted)'}); }
    P.seg(0,0,38,0,{c:'var(--muted)',w:1.5}).seg(0,0,0,80,{c:'var(--muted)',w:1.5}); P.fn(t=>1.8*t+12,{from:0,to:35}); P.dot(0,12,{r:5,c:'var(--spark)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quel est le débit du tuyau en m³ par heure ?',unit:'m³/h',ans:1.8,tol:.001,hint:'En une heure il y a 60 minutes, et 1000 L font 1 m³.',why:'30 · 60 = 1800 L par heure, soit 1,8 m³/h.'},
   {q:'b) Le volume après t heures est V(t) = 1,8t + 12. Que vaut V(5) ?',unit:'m³',ans:21,tol:.001,hint:'Remplace t par 5.',why:'V(5) = 1,8 · 5 + 12 = 9 + 12 = 21 m³. C’est une fonction affine : pente 1,8 (le débit), ordonnée à l’origine 12 (l’eau déjà présente).'},
   {q:'c) Combien d’heures faut-il pour que la piscine soit pleine ?',unit:'h',ans:35,tol:.001,hint:'Résous 1,8t + 12 = 75.',why:'1,8t = 63, donc t = 63 : 1,8 = 35 h.'},
   {q:'d) Quelle est la masse de l’eau quand la piscine est pleine ? (en tonnes, 1 t = 1000 kg)',unit:'t',ans:75,tol:.001,hint:'m = ρ · V avec ρ = 1000 kg/m³.',why:'m = 1000 · 75 = 75 000 kg = 75 t.'},
   {q:'e) On ajoute dès le début un second tuyau de 20 L/min. Combien d’heures faut-il alors ?',unit:'h',ans:21,tol:.001,hint:'Le débit total est 50 L/min. La durée est inversement proportionnelle au débit.',why:'50 L/min = 3 m³/h, donc t = 63 : 3 = 21 h. Contrôle par la proportionnalité inverse : 30 · 35 = 1050 = 50 · 21.'}],
  sol:'Le tuyau débite 30 · 60 = 1800 L/h = 1,8 m³/h, donc V(t) = 1,8t + 12 (fonction affine). Il manque 75 − 12 = 63 m³, d’où t = 63 : 1,8 = 35 h. Pleine, la piscine contient 75 m³ d’eau, soit 75 000 kg = 75 t. Avec deux tuyaux, le débit passe à 50 L/min = 3 m³/h et la durée à 63 : 3 = 21 h. La durée est inversement proportionnelle au débit : 30 · 35 = 50 · 21 = 1050.'},
]},

);
})();
