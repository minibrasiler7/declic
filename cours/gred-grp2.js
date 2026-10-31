/* Déclic — Notions fondamentales : les groupes (2) */
(()=>{
/* ---------- helpers locaux ---------- */
const COL=['var(--accent)','var(--spark)','var(--math)','var(--ok)','var(--code)','var(--other)','var(--sci)','var(--bad)'];
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const lcm=(a,b)=>a/gcd(a,b)*b;
// Permutations : tableaux 1-indexés, s[i-1] = s(i). Convention : (s t)(i) = s(t(i)), on applique t d’abord.
const comp=(s,t)=>t.map(x=>s[x-1]);
const ident=n=>Array.from({length:n},(_,i)=>i+1);
const pw=(s,k)=>{ let r=ident(s.length); for(let i=0;i<k;i++) r=comp(s,r); return r; };
const ninv=s=>{ let c=0; for(let i=0;i<s.length;i++) for(let j=i+1;j<s.length;j++) if(s[i]>s[j]) c++; return c; };
const cycles=s=>{ const seen=[], out=[]; for(let i=1;i<=s.length;i++){ if(seen[i]) continue; const c=[]; let j=i; while(!seen[j]){ seen[j]=1; c.push(j); j=s[j-1]; } out.push(c); } return out; };
const cycStr=s=>cycles(s).filter(c=>c.length>1).map(c=>'('+c.join(' ')+')').join('')||'id';
const ordre=s=>cycles(s).reduce((m,c)=>lcm(m,c.length),1);
const L2=b=>mat([b.map((_,i)=>i+1),b]);

// Exponentielle : (ℝ, +) → (ℝ*₊, ·)
function expFig(a,b){
  const P=plane({x:[-2.2,2.2],y:[-1.6,8],w:320,h:270,lx:1,ly:2});
  P.fn(Math.exp,{c:'var(--muted)',w:2.5});
  [[a,'var(--accent)','a'],[b,'var(--spark)','b'],[a+b,'var(--math)','a+b']].forEach(([x,c,l],k)=>{
    P.seg(x,0,x,Math.exp(x),{c,w:2,dash:true}).dot(x,0,{r:4,c}).dot(x,Math.exp(x),{c});
    P.text(x,0,l,{a:'middle',dy:16+12*k,c,s:12}); });
  return P.svg();
}
// f_k : ℤ/12ℤ → ℤ/12ℤ, x ↦ kx, en deux rangées
function homZ(k){
  const n=12, P=plane({x:[-0.8,11.8],y:[-0.75,1.75],grid:false,axes:false,w:320,h:150});
  const img=new Set(); for(let x=0;x<n;x++) img.add(k*x%n);
  for(let x=0;x<n;x++){ const y=k*x%n, ker=y===0; P.seg(x,1.12,y,0.13,{c:ker?'var(--bad)':'var(--math)',w:ker?2.5:1.6,op:ker?1:.7}); }
  for(let x=0;x<n;x++){ P.dot(x,1.25,{r:5,c:k*x%n===0?'var(--bad)':'var(--ink)'}).text(x,1.25,String(x),{a:'middle',dy:-9,s:11});
    P.dot(x,0,{r:5,c:img.has(x)?'var(--accent)':'var(--muted)'}).text(x,0,String(x),{a:'middle',dy:19,s:11}); }
  return P.svg();
}
// Table de Cayley colorée d’un groupe d’ordre 4
const G4=[
  {h:'ℤ/4ℤ, addition',val:[0,1,2,3],op:(x,y)=>(x+y)%4},
  {h:'U = {1 ; 2 ; 3 ; 4}, produit modulo 5',val:[1,2,3,4],op:(x,y)=>x*y%5},
  {h:'U, éléments rangés 1, 2, 4, 3',val:[1,2,4,3],op:(x,y)=>x*y%5},
  {h:'Klein V = {e ; a ; b ; c}',val:[0,1,2,3],nm:['e','a','b','c'],op:(x,y)=>x^y},
  {h:'{1 ; 3 ; 5 ; 7}, produit modulo 8',val:[1,3,5,7],op:(x,y)=>x*y%8}];
function cayley(g){
  const G=G4[g], nm=i=>G.nm?G.nm[i]:String(G.val[i]), c=46, x0=60, y0=20;
  let s=`<svg viewBox="0 0 320 ${y0+5*c+10}" width="320" role="img">`;
  const T=(x,y,t,col='var(--ink)')=>`<text x="${x}" y="${y}" font-size="15" font-weight="700" text-anchor="middle" fill="${col}">${t}</text>`;
  for(let i=0;i<4;i++){ s+=T(x0+c*(i+1)+c/2,y0+c/2+5,nm(i),'var(--muted)')+T(x0+c/2,y0+c*(i+1)+c/2+5,nm(i),'var(--muted)');
    for(let j=0;j<4;j++){ const r=G.val.indexOf(G.op(G.val[i],G.val[j]));
      s+=`<rect x="${x0+c*(j+1)+2}" y="${y0+c*(i+1)+2}" width="${c-4}" height="${c-4}" rx="6" fill="${COL[r]}" fill-opacity="${i===j?.75:.35}" stroke="${i===j?'var(--ink)':'none'}" stroke-width="2"/>`+T(x0+c*(j+1)+c/2,y0+c*(i+1)+c/2+5,nm(r)); } }
  return s+'</svg>';
}
// D3 : sommets 1, 2, 3 ; r = rotation (1 2 3), s = symétrie (2 3)
const D3={e:[1,2,3],r:[2,3,1],'r²':[3,1,2],s:[1,3,2],rs:comp([2,3,1],[1,3,2]),'r²s':comp([3,1,2],[1,3,2])};
const D3N=Object.keys(D3), d3nm=p=>D3N.find(k=>D3[k].join()===p.join());
const d3m=(a,b)=>d3nm(comp(D3[a],D3[b]));
const D3H=[['e','s'],['e','r','r²']];
function d3fig(h,g){
  const H=D3H[h], gN=D3N[g], L=H.map(x=>d3m(gN,x)), R=H.map(x=>d3m(x,gN)), same=L.every(x=>R.includes(x));
  const w=40, x0=62;
  let s=`<svg viewBox="0 0 320 130" width="320" role="img">`;
  const row=(y,lab,set,col)=>{ s+=`<text x="8" y="${y+26}" font-size="14" font-weight="700" fill="${col}">${lab}</text>`;
    D3N.forEach((k,i)=>{ const on=set.includes(k);
      s+=`<rect x="${x0+i*(w+2)}" y="${y}" width="${w}" height="40" rx="7" fill="${on?col:'var(--line)'}" fill-opacity="${on?.6:.4}" stroke="${on?col:'none'}" stroke-width="2"/><text x="${x0+i*(w+2)+w/2}" y="${y+26}" font-size="14" font-weight="700" text-anchor="middle" fill="var(--ink)">${k}</text>`; }); };
  row(12,gN+'H',L,'var(--accent)'); row(70,'H'+gN,R,'var(--spark)');
  s+=`<text x="316" y="126" font-size="12" font-weight="700" text-anchor="end" fill="${same?'var(--ok)':'var(--bad)'}">${same?'gH = Hg':'gH ≠ Hg'}</text>`;
  return s+'</svg>';
}
// Classes de ℤ/12ℤ modulo H = ⟨d⟩, puis le quotient
function cosetFig(d,vue){
  const m=gcd(d,12), P=plane({x:[-1.7,1.7],y:[-1.7,1.7],grid:false,axes:false,w:320});
  const pt=(i,n,r)=>[r*Math.cos(rad(90-360*i/n)),r*Math.sin(rad(90-360*i/n))];
  if(!vue){
    const Hs=[]; for(let i=0;i<12;i+=m) Hs.push(pt(i,12,1.25));
    if(Hs.length>2) P.poly(Hs,{c:'var(--accent)',w:1.5,fill:'var(--accent)',fo:.12}); else if(Hs.length===2) P.seg(Hs[0][0],Hs[0][1],Hs[1][0],Hs[1][1],{c:'var(--accent)',w:1.5});
    for(let i=0;i<12;i++){ const [x,y]=pt(i,12,1.25), [tx,ty]=pt(i,12,1.52); P.dot(x,y,{r:9,c:COL[i%m]}); P.text(tx,ty,String(i),{a:'middle',dy:5,s:12}); }
  } else {
    if(m===1){ P.dot(0,0,{r:16,c:COL[0]}); P.text(0,0,'0 + H',{a:'middle',dy:-24}); }
    else { for(let i=0;i<m;i++){ const [x,y]=pt(i,m,1), [x2,y2]=pt((i+1)%m,m,1); P.arrow(x+(x2-x)*.18,y+(y2-y)*.18,x+(x2-x)*.82,y+(y2-y)*.82,{c:'var(--muted)',w:1.5,hs:8}); }
      for(let i=0;i<m;i++){ const [x,y]=pt(i,m,1), [tx,ty]=pt(i,m,1.42); P.dot(x,y,{r:14,c:COL[i]}); P.text(tx,ty,i+' + H',{a:'middle',dy:5,s:12}); } }
  }
  return P.svg();
}
// ℝ → cercle : x ↦ rotation d’angle 360°·x
function circFig(x){
  const P=plane({x:[-2.4,2.4],y:[-2.3,1.5],grid:false,axes:false,w:320}), cy=0.2, R=1.1;
  P.circ(0,cy,R,{c:'var(--muted)',w:2}).seg(-2.35,-1.7,2.35,-1.7,{c:'var(--muted)',w:1.5});
  for(let k=-2;k<=2;k++) P.seg(k,-1.78,k,-1.62,{c:'var(--muted)',w:1.5}).text(k,-1.7,fmt(k),{a:'middle',dy:20,s:11,c:'var(--muted)'});
  for(let k=-4;k<=4;k++){ const t=+(x+k).toFixed(6); if(k&&t>=-2.3&&t<=2.3) P.dot(t,-1.7,{r:5,c:'var(--spark)'}); }
  const a=2*Math.PI*x, px=R*Math.cos(a), py2=cy+R*Math.sin(a);
  P.arrow(0,cy,px,py2,{c:'var(--accent)',w:2.5,hs:9}).dot(R,cy,{r:4,c:'var(--muted)'}).dot(px,py2,{r:7,c:'var(--accent)'}).dot(x,-1.7,{r:7,c:'var(--accent)'}).text(x,-1.7,'x',{a:'middle',dy:-11});
  return P.svg();
}
// Permutation en fils : rangée du haut i, rangée du bas b[i-1]
function fils(b){
  const n=b.length, P=plane({x:[0.4,n+0.6],y:[-0.5,1.5],grid:false,axes:false,w:320,h:170});
  const cnt=Array(n+1).fill(0); b.forEach(y=>cnt[y]++);
  b.forEach((y,i)=>P.seg(i+1,1,y,0,{c:cnt[y]>1?'var(--bad)':COL[i],w:3.5}));
  for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) if(b[i]>b[j]){ const t=(j-i)/((b[i]-b[j])+(j-i)), x=(i+1)+(b[i]-i-1)*t; P.dot(x,1-t,{r:4,c:'var(--ink)'}); }
  for(let i=1;i<=n;i++){ P.dot(i,1,{r:7,c:'var(--ink)'}).text(i,1,String(i),{a:'middle',dy:-13});
    P.dot(i,0,{r:7,c:cnt[i]?'var(--ink)':'var(--muted)'}).text(i,0,String(i),{a:'middle',dy:26}); }
  return P.svg();
}
// Cycles de s, flèches i → s^k(i)
function cycFig(s,k){
  const C=cycles(s), wd=C.map(c=>c.length>1?2.7:1.1), W=wd.reduce((a,b)=>a+b,0)+0.4;
  const P=plane({x:[0,W],y:[-1.45,1.45],grid:false,axes:false,w:320}), pos={}, sk=pw(s,k);
  let x0=0.2; C.forEach((c,ci)=>{ const cx=x0+wd[ci]/2;
    c.forEach((v,j)=>{ pos[v]=c.length>1?[cx+0.95*Math.cos(rad(90-360*j/c.length)),0.95*Math.sin(rad(90-360*j/c.length))]:[cx,0]; }); x0+=wd[ci]; });
  for(let i=1;i<=s.length;i++){ const [x,y]=pos[i], t=sk[i-1];
    if(t===i){ P.circ(x,y+0.36,0.17,{c:'var(--muted)',w:2}); continue; }
    const [x2,y2]=pos[t], L=Math.hypot(x2-x,y2-y), u=0.27/L; P.arrow(x+(x2-x)*u,y+(y2-y)*u,x2-(x2-x)*u,y2-(y2-y)*u,{c:'var(--accent)',w:2.5,hs:9}); }
  for(let i=1;i<=s.length;i++){ const [x,y]=pos[i]; P.circ(x,y,0.2,{c:'var(--ink)',w:2,fill:'var(--surface)',fo:1}); P.text(x,y,String(i),{a:'middle',dy:5}); }
  return P.svg();
}
const CYC=[[2,3,1,5,4],[2,3,4,1,6,5],[2,3,4,5,6,1],[2,1,4,5,3,6]];
// Taquin 4 × 4
function taquin(cells){
  const c=44, x0=72; let s=`<svg viewBox="0 0 320 ${4*c+16}" width="320" role="img">`;
  cells.forEach((v,i)=>{ const x=x0+(i%4)*c, y=8+Math.floor(i/4)*c, hot=v===14||v===15;
    s+=v?`<rect x="${x+2}" y="${y+2}" width="${c-4}" height="${c-4}" rx="7" fill="${hot?'var(--spark)':'var(--accent)'}" fill-opacity="${hot?.55:.25}" stroke="var(--ink)" stroke-width="1.5"/><text x="${x+c/2}" y="${y+c/2+6}" font-size="16" font-weight="700" text-anchor="middle" fill="var(--ink)">${v}</text>`
      :`<rect x="${x+2}" y="${y+2}" width="${c-4}" height="${c-4}" rx="7" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4"/>`; });
  return s+'</svg>';
}

COURS.push(
/* ===================== 1. HOMOMORPHISMES ===================== */
{subj:'gred',sem:'grp',id:'gred-morphismes',h:'Homomorphismes de groupes',p:'Les applications qui respectent la loi : noyau, image, isomorphismes, et comment reconnaître deux groupes qui ont la même structure.',steps:[
  {h:'Transformer des produits en sommes',p:`<p>Pendant des siècles, on a multiplié de grands nombres en additionnant leurs logarithmes, car ln(<i>xy</i>) = ln <i>x</i> + ln <i>y</i>. Une multiplication difficile devenait une addition facile, suivie d’une lecture dans une table. Pourquoi cela marche-t-il ?</p><div class="idea"><p>Deux groupes sont en jeu : (ℝ, +) et (ℝ*₊, ·). L’exponentielle fait passer de l’un à l’autre en <b>respectant les lois</b> :</p><div class="formula">e<sup><i>a</i>+<i>b</i></sup> = e<sup><i>a</i></sup> · e<sup><i>b</i></sup></div><p>Une somme au départ devient un produit à l’arrivée. Calculer dans (ℝ, +) puis transporter, ou transporter puis calculer dans (ℝ*₊, ·), donne le même résultat.</p></div><div class="ex"><p>Pour <i>a</i> = 0,5 et <i>b</i> = 0,3 : e<sup>0,5</sup> ≈ 1,649 et e<sup>0,3</sup> ≈ 1,350, dont le produit vaut environ 2,226 ; et e<sup>0,8</sup> ≈ 2,226 aussi. Bouge <i>a</i> et <i>b</i> : la hauteur au-dessus de <i>a</i> + <i>b</i> est toujours le produit des deux autres hauteurs.</p></div><div class="blk" data-t="Dans l’autre sens"><p>Le logarithme ln : (ℝ*₊, ·) → (ℝ, +) fait le trajet inverse et transforme les produits en sommes. C’est exactement ce qu’exploitaient les tables de logarithmes.</p></div>`,
   params:[{id:'a',l:'a',min:-1,max:1,step:0.1,v:0.5},{id:'b',l:'b',min:-1,max:1,step:0.1,v:0.3}],
   draw:v=>expFig(v.a,v.b),
   info:v=>`e<sup>a</sup> · e<sup>b</sup> = ${fmt(Math.exp(v.a),3)} · ${fmt(Math.exp(v.b),3)} = <b>${fmt(Math.exp(v.a)*Math.exp(v.b),3)}</b> &nbsp;et&nbsp; e<sup>a+b</sup> = e<sup>${fmt(v.a+v.b,1)}</sup> = <b>${fmt(Math.exp(v.a+v.b),3)}</b>`,
   note:`C’est toute l’idée d’un homomorphisme : une application entre deux groupes qui transforme la loi de l’un en la loi de l’autre.`},
  {h:'Pair, impair',p:`<p>Un autre exemple que tu connais depuis l’école : « pair + impair = impair », « impair + impair = pair ». Ces règles disent qu’on peut calculer avec les seules parités, sans connaître les nombres.</p><div class="def"><p>Notons <i>p</i>(<i>n</i>) la parité de l’entier <i>n</i>, vue comme élément de ℤ/2ℤ = {0 ; 1} : <i>p</i>(<i>n</i>) = 0 si <i>n</i> est pair, 1 s’il est impair. Alors, pour tous entiers <i>m</i> et <i>n</i> :</p><div class="formula"><i>p</i>(<i>m</i> + <i>n</i>) = <i>p</i>(<i>m</i>) + <i>p</i>(<i>n</i>).</div></div><div class="why"><p>Écris <i>m</i> = 2<i>k</i> + <i>p</i>(<i>m</i>) et <i>n</i> = 2<i>l</i> + <i>p</i>(<i>n</i>). Alors <i>m</i> + <i>n</i> = 2(<i>k</i> + <i>l</i>) + <i>p</i>(<i>m</i>) + <i>p</i>(<i>n</i>) : le reste de <i>m</i> + <i>n</i> modulo 2 est celui de <i>p</i>(<i>m</i>) + <i>p</i>(<i>n</i>), calculé dans ℤ/2ℤ où 1 + 1 = 0.</p></div><div class="ex"><p>17 + 26 = 43 est impair ; avec les parités, <i>p</i>(17) + <i>p</i>(26) = 1 + 0 = 1. Et 17 + 25 = 42 est pair : 1 + 1 = 0.</p></div><div class="idea"><p>Ici, les deux lois s’appellent +, mais elles vivent dans des groupes différents : (ℤ, +) au départ, (ℤ/2ℤ, +) à l’arrivée. <i>p</i> oublie presque tout de <i>n</i>, mais ce qu’elle garde est compatible avec l’addition.</p></div>`,
  },
  {h:'Définition',p:`<p>L’exponentielle et la parité ont un point commun : elles vont d’un groupe dans un autre, et l’image d’un composé est le composé des images. C’est la définition qu’on retient.</p><div class="def"><p>Soient (<i>G</i>, ∗) et (<i>G</i>′, ⊥) deux groupes. Une application <i>f</i> : <i>G</i> → <i>G</i>′ est un <b>homomorphisme</b> (ou <b>morphisme</b>) de groupes si</p><div class="formula"><i>f</i>(<i>a</i> ∗ <i>b</i>) = <i>f</i>(<i>a</i>) ⊥ <i>f</i>(<i>b</i>)</div><p>pour tous <i>a</i>, <i>b</i> ∈ <i>G</i>.</p></div><div class="idea"><p>À gauche, on compose dans <i>G</i>, puis on transporte. À droite, on transporte, puis on compose dans <i>G</i>′. Un homomorphisme est une application pour laquelle les deux chemins mènent au même endroit. Le mot vient du grec et signifie « même forme ».</p></div><div class="ex"><p>exp : (ℝ, +) → (ℝ*₊, ·) et <i>p</i> : (ℤ, +) → (ℤ/2ℤ, +) sont des homomorphismes. Autre exemple : <i>n</i> ↦ 3<i>n</i> de (ℤ, +) dans (ℤ, +), car 3(<i>m</i> + <i>n</i>) = 3<i>m</i> + 3<i>n</i>. En revanche <i>n</i> ↦ <i>n</i> + 1 n’en est pas un : 0 + 0 a pour image 1, alors que 1 + 1 = 2.</p></div><div class="warn"><p>Les deux lois peuvent être différentes, et chacune s’utilise de son côté : pour exp, + au départ et · à l’arrivée. Écrire e<sup><i>a</i>+<i>b</i></sup> = e<sup><i>a</i></sup> + e<sup><i>b</i></sup> serait faux.</p></div>`,
   note:'Dans la suite, on note souvent les deux lois multiplicativement : <i>f</i>(<i>ab</i>) = <i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>), avec <i>e</i> et <i>e</i>′ les neutres. Avec des lois additives, la condition devient <i>f</i>(<i>a</i> + <i>b</i>) = <i>f</i>(<i>a</i>) + <i>f</i>(<i>b</i>).'},
  {kind:'Méthode',h:'Vérifier (ou réfuter) qu’une application est un homomorphisme',
   p:'<b>Quand :</b> on te donne <i>f</i> : <i>G</i> → <i>G</i>′ et deux lois. <b>Comment :</b> 1) écris <i>f</i>(<i>a</i> ∗ <i>b</i>) en appliquant la formule de <i>f</i> au résultat calculé dans <i>G</i> ; 2) écris <i>f</i>(<i>a</i>) ⊥ <i>f</i>(<i>b</i>) en calculant dans <i>G</i>′ ; 3) compare pour <i>a</i>, <i>b</i> quelconques. <b>Pour réfuter :</b> un seul couple (<i>a</i> ; <i>b</i>) qui donne deux résultats différents suffit. Teste d’abord <i>a</i> = <i>b</i> = <i>e</i> : si <i>f</i>(<i>e</i>) ≠ <i>e</i>′, c’est fini (on verra pourquoi juste après).',
   demo:{enonce:'<i>f</i> : (ℝ*, ·) → (ℝ*, ·), <i>x</i> ↦ <i>x</i>² est-il un homomorphisme&nbsp;? Et <i>g</i> : (ℤ, +) → (ℤ, +), <i>n</i> ↦ <i>n</i> + 1&nbsp;?',
    etapes:[{f:'<i>f</i>(<i>xy</i>) = (<i>xy</i>)² = <i>x</i>²<i>y</i>².',w:'On applique f au produit calculé dans le groupe de départ.'},
     {f:'<i>f</i>(<i>x</i>) · <i>f</i>(<i>y</i>) = <i>x</i>² · <i>y</i>².',w:'On calcule dans le groupe d’arrivée, ici aussi avec le produit.'},
     {f:'Les deux sont égaux pour tous <i>x</i>, <i>y</i> : <i>f</i> est un homomorphisme.',w:'L’égalité (xy)² = x²y² utilise la commutativité de ℝ*.'},
     {f:'Pour <i>g</i> : <i>g</i>(0 + 0) = 1 alors que <i>g</i>(0) + <i>g</i>(0) = 2.',w:'On teste les neutres en premier : un seul contre-exemple suffit.'}],
    conclusion:'<i>f</i> est un homomorphisme, <i>g</i> n’en est pas un. Un calcul sur des exemples ne prouve jamais qu’une application <b>est</b> un homomorphisme, mais un contre-exemple prouve qu’elle <b>n’en est pas</b> un.'}},
  {h:'Lequel respecte l’addition&nbsp;?',p:'Laquelle de ces applications de (ℝ, +) dans (ℝ, +) est un homomorphisme&nbsp;?',
   opts:['<i>x</i> ↦ <i>x</i> + 1','<i>x</i> ↦ <i>x</i>²','<i>x</i> ↦ |<i>x</i>|','<i>x</i> ↦ −3<i>x</i>'],ans:3,
   why:'−3(x + y) = −3x + (−3y) pour tous x, y. Les autres échouent : 0 + 0 donne 1 ≠ 2 pour x ↦ x + 1 ; (1 + 1)² = 4 ≠ 1 + 1 ; |1 + (−1)| = 0 ≠ 2.'},
  {h:'L’intrus',p:'Les applications suivantes vont de (ℝ*, ·) dans (ℝ*, ·). Laquelle <b>n’est pas</b> un homomorphisme&nbsp;?',
   opts:['<i>x</i> ↦ <i>x</i>³','<i>x</i> ↦ 1/<i>x</i>','<i>x</i> ↦ 2<i>x</i>','<i>x</i> ↦ |<i>x</i>|'],ans:2,
   why:'Pour x ↦ 2x : f(1 · 1) = 2 mais f(1) · f(1) = 4. Les autres marchent : (xy)³ = x³y³, 1/(xy) = (1/x)(1/y), |xy| = |x||y|.'},
  {h:'Premières conséquences',p:`<p>La définition ne parle que de la loi. Pourtant, un homomorphisme respecte automatiquement le reste de la structure : neutre, inverses, puissances. Tu n’as jamais à le vérifier séparément.</p><div class="prop"><p>Si <i>f</i> : <i>G</i> → <i>G</i>′ est un homomorphisme, de neutres <i>e</i> et <i>e</i>′, alors :<br><b><i>f</i>(<i>e</i>) = <i>e</i>′</b>, &nbsp;<b><i>f</i>(<i>a</i>⁻¹) = <i>f</i>(<i>a</i>)⁻¹</b> &nbsp;et&nbsp; <b><i>f</i>(<i>a</i>ⁿ) = <i>f</i>(<i>a</i>)ⁿ</b> pour tout <i>n</i> ∈ ℤ.</p></div><div class="why"><p>Pour le neutre, l’exercice suivant te fait trouver la preuve. Pour l’inverse : <i>f</i>(<i>a</i>)<i>f</i>(<i>a</i>⁻¹) = <i>f</i>(<i>aa</i>⁻¹) = <i>f</i>(<i>e</i>) = <i>e</i>′, et de même dans l’autre ordre ; donc <i>f</i>(<i>a</i>⁻¹) est l’inverse de <i>f</i>(<i>a</i>). Pour les puissances : <i>f</i>(<i>a</i>ⁿ⁺¹) = <i>f</i>(<i>a</i>ⁿ<i>a</i>) = <i>f</i>(<i>a</i>ⁿ)<i>f</i>(<i>a</i>), ce qui donne le résultat par récurrence pour <i>n</i> ≥ 0, puis pour <i>n</i> &lt; 0 avec la règle de l’inverse.</p></div><div class="ex"><p>Pour exp : e⁰ = 1 (le neutre de + va sur celui de ·), e<sup>−<i>a</i></sup> = 1/e<sup><i>a</i></sup> et e<sup><i>na</i></sup> = (e<sup><i>a</i></sup>)ⁿ. En notation additive des deux côtés : <i>f</i>(0) = 0, <i>f</i>(−<i>a</i>) = −<i>f</i>(<i>a</i>) et <i>f</i>(<i>na</i>) = <i>nf</i>(<i>a</i>).</p></div><div class="warn"><p>Ces propriétés servent surtout à <b>réfuter</b> : si <i>f</i>(<i>e</i>) ≠ <i>e</i>′, <i>f</i> n’est pas un homomorphisme. Mais <i>f</i>(<i>e</i>) = <i>e</i>′ ne prouve rien : <i>x</i> ↦ <i>x</i>² de (ℝ, +) dans (ℝ, +) envoie 0 sur 0 sans être un homomorphisme.</p></div>`,
  },
  {h:'Pourquoi f(e) = e′&nbsp;?',p:'Quelle preuve de <i>f</i>(<i>e</i>) = <i>e</i>′ est correcte&nbsp;?',
   opts:['<i>f</i>(<i>e</i>) = <i>e</i>′ car <i>f</i> est bijective','<i>f</i>(<i>e</i>) = <i>f</i>(<i>ee</i>) = <i>f</i>(<i>e</i>)<i>f</i>(<i>e</i>) ; on multiplie par <i>f</i>(<i>e</i>)⁻¹ dans <i>G</i>′ et il reste <i>e</i>′ = <i>f</i>(<i>e</i>)','On le vérifie sur exp : e⁰ = 1','<i>f</i>(<i>e</i>) = <i>e</i> car <i>e</i> est neutre'],ans:1,
   why:'On part de e = ee, on applique f et la propriété d’homomorphisme : f(e) = f(e)f(e). En simplifiant par f(e) (qui a un inverse dans le groupe G′), on obtient e′ = f(e). Un homomorphisme n’est pas forcément bijectif, et un exemple ne prouve rien.'},
  {h:'Une puissance négative',p:'<i>f</i> : (ℤ, +) → (ℝ*, ·) est un homomorphisme avec <i>f</i>(1) = 2. Combien vaut <i>f</i>(−3)&nbsp;? (donne une valeur décimale)',lab:'f(−3) =',ans:0.125,tol:0.0001,
   why:'−3 = (−3)·1 dans (ℤ, +), donc f(−3) = f(1)<sup>−3</sup> = 2<sup>−3</sup> = 1/8 = 0,125. La loi additive au départ devient une puissance à l’arrivée.'},
  {kind:'Méthode',h:'Trouver tous les homomorphismes depuis ℤ/nℤ',
   p:'<b>Pourquoi :</b> tout élément de ℤ/<i>n</i>ℤ s’écrit <i>x</i> = <i>x</i>·1, donc <i>f</i>(<i>x</i>) = <i>x</i>·<i>f</i>(1) : <b>un homomorphisme depuis un groupe cyclique est déterminé par l’image d’un générateur</b>. <b>Mais attention :</b> on ne peut pas choisir <i>f</i>(1) = <i>a</i> n’importe comment. Comme 0 et <i>n</i> sont la même classe, il faut <i>n</i>·<i>a</i> = 0 dans le groupe d’arrivée. <b>Comment :</b> vers ℤ/<i>m</i>ℤ, on cherche les <i>a</i> ∈ {0, …, <i>m</i> − 1} tels que <b><i>na</i> ≡ 0 (mod <i>m</i>)</b> ; chacun donne l’homomorphisme <i>x</i> ↦ <i>ax</i> mod <i>m</i>.',
   demo:{enonce:'Trouve tous les homomorphismes de ℤ/6ℤ dans ℤ/4ℤ.',
    etapes:[{f:'<i>f</i>(<i>x</i>) = <i>ax</i> mod 4 avec <i>a</i> = <i>f</i>(1).',w:'f est déterminé par f(1).'},
     {f:'Condition : 6<i>a</i> ≡ 0 (mod 4).',w:'L’élément 6·1 = 0 de ℤ/6ℤ doit avoir pour image 0.'},
     {f:'<i>a</i> = 0 : 0 ✓ ; <i>a</i> = 1 : 6 ≡ 2 ✗ ; <i>a</i> = 2 : 12 ≡ 0 ✓ ; <i>a</i> = 3 : 18 ≡ 2 ✗.',w:'On teste les m = 4 valeurs possibles.'},
     {f:'Pour <i>a</i> = 2 : 0, 1, 2, 3, 4, 5 ont pour images 0, 2, 0, 2, 0, 2.',w:'On écrit la table de f pour la visualiser.'}],
    conclusion:'Il y a exactement <b>2</b> homomorphismes : l’application nulle et <i>x</i> ↦ 2<i>x</i> mod 4. Sans la condition, « <i>x</i> ↦ <i>x</i> mod 4 » ne serait même pas bien définie : 0 et 6 représentent la même classe de ℤ/6ℤ, mais 0 mod 4 ≠ 6 mod 4.'}},
  {h:'Compter les homomorphismes',p:'Combien y a-t-il d’homomorphismes de ℤ/6ℤ dans ℤ/9ℤ&nbsp;?',lab:'nombre :',ans:3,
   why:'f(1) = a doit vérifier 6a ≡ 0 (mod 9), c’est-à-dire 9 divise 6a, soit 3 divise 2a, soit a multiple de 3 : a ∈ {0 ; 3 ; 6}. Trois homomorphismes.'},
  {h:'Noyau et image',p:`<p>Un homomorphisme peut « écraser » des éléments différents sur un même résultat, et ne pas tout atteindre à l’arrivée. Deux ensembles mesurent ces deux défauts.</p><div class="def"><p>Pour un homomorphisme <i>f</i> : <i>G</i> → <i>G</i>′, on définit :<br>• le <b>noyau</b> <b>ker <i>f</i> = {<i>a</i> ∈ <i>G</i> : <i>f</i>(<i>a</i>) = <i>e</i>′}</b>, les éléments envoyés sur le neutre (« ker » vient de l’allemand <i>Kern</i>, noyau) ;<br>• l’<b>image</b> <b>Im <i>f</i> = <i>f</i>(<i>G</i>) = {<i>f</i>(<i>a</i>) : <i>a</i> ∈ <i>G</i>}</b>, ce qui est atteint.</p></div><div class="idea"><p>ker <i>f</i> est un sous-groupe de <i>G</i> et Im <i>f</i> un sous-groupe de <i>G</i>′ (la méthode un peu plus bas le prouve). Plus le noyau est gros, plus <i>f</i> écrase ; plus l’image est grande, plus <i>f</i> couvre.</p></div><div class="ex"><p>Pour la parité <i>p</i> : ℤ → ℤ/2ℤ, ker <i>p</i> = 2ℤ (les pairs) et Im <i>p</i> = ℤ/2ℤ. Sur la figure, <i>f</i>(<i>x</i>) = <i>kx</i> mod 12 sur ℤ/12ℤ : en rouge le noyau au départ, en couleur l’image à l’arrivée. Avec <i>k</i> = 3, ker <i>f</i> = {0 ; 4 ; 8} et Im <i>f</i> = {0 ; 3 ; 6 ; 9}. Fais varier <i>k</i>.</p></div>`,
   params:[{id:'k',l:'k',min:0,max:11,v:3}],
   draw:v=>homZ(v.k),
   info:v=>{ const K=[],I=new Set(); for(let x=0;x<12;x++){ if(v.k*x%12===0) K.push(x); I.add(v.k*x%12); } const Is=[...I].sort((a,b)=>a-b);
     return `ker f = {${K.join(' ; ')}} : <b>${K.length}</b> élément${K.length>1?'s':''}. Im f = {${Is.join(' ; ')}} : <b>${Is.length}</b> élément${Is.length>1?'s':''}. Produit : ${K.length} × ${Is.length} = 12.`; },
   note:'Remarque que card(ker f) × card(Im f) = 12 à chaque fois. Tu comprendras pourquoi au chapitre suivant.'},
  {kind:'Pratique',h:'Un noyau de 4 éléments',p:'Toujours avec <i>f</i>(<i>x</i>) = <i>kx</i> mod 12 sur ℤ/12ℤ : règle <i>k</i> pour que le noyau ait exactement 4 éléments.',
   params:[{id:'k',l:'k',min:0,max:11,v:1}],
   draw:v=>homZ(v.k),
   info:v=>{ let c=0; for(let x=0;x<12;x++) if(v.k*x%12===0) c++; return `card(ker f) = ${c}`; },
   ok:v=>{ let c=0; for(let x=0;x<12;x++) if(v.k*x%12===0) c++; return c===4; },
   why:'kx ≡ 0 (mod 12) a exactement pgcd(k, 12) solutions dans ℤ/12ℤ. Pour 4 solutions, il faut pgcd(k, 12) = 4 : k = 4 (noyau {0 ; 3 ; 6 ; 9}) ou k = 8 (même noyau).'},
  {kind:'Méthode',h:'Calculer un noyau et une image',
   p:'<b>Noyau :</b> on résout l’équation <i>f</i>(<i>a</i>) = <i>e</i>′ d’inconnue <i>a</i> ∈ <i>G</i>. <b>Image :</b> on cherche pour quels <i>y</i> ∈ <i>G</i>′ l’équation <i>f</i>(<i>a</i>) = <i>y</i> a une solution. <b>Pourquoi ce sont des sous-groupes :</b> si <i>f</i>(<i>a</i>) = <i>f</i>(<i>b</i>) = <i>e</i>′, alors <i>f</i>(<i>ab</i>⁻¹) = <i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>)⁻¹ = <i>e</i>′ ; et <i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>)⁻¹ = <i>f</i>(<i>ab</i>⁻¹) est encore dans l’image. C’est le critère de sous-groupe.',
   demo:{enonce:'Noyau et image de <i>f</i> : (ℝ*, ·) → (ℝ*, ·), <i>x</i> ↦ <i>x</i>².',
    etapes:[{f:'Le neutre d’arrivée est 1 : on résout <i>x</i>² = 1.',w:'Attention, le neutre de (ℝ*, ·) est 1, pas 0.'},
     {f:'ker <i>f</i> = {−1 ; 1}.',w:'Les deux solutions réelles non nulles.'},
     {f:'<i>x</i>² = <i>y</i> a une solution dans ℝ* si et seulement si <i>y</i> > 0.',w:'Un carré non nul est strictement positif ; et si y > 0, x = √y convient.'},
     {f:'Im <i>f</i> = ℝ*₊.',w:'On conclut.'}],
    conclusion:'ker <i>f</i> = {−1 ; 1} et Im <i>f</i> = ℝ*₊. De même, la parité <i>p</i> : ℤ → ℤ/2ℤ a pour noyau 2ℤ (les pairs) et pour image ℤ/2ℤ tout entier.'}},
  {h:'Le noyau du signe',p:'L’application signe : (ℝ*, ·) → ({1 ; −1}, ·) envoie <i>x</i> sur 1 si <i>x</i> > 0 et sur −1 si <i>x</i> < 0. C’est un homomorphisme (la règle des signes). Quel est son noyau&nbsp;?',
   opts:['{1}','{−1 ; 1}','ℝ*₊','{0}'],ans:2,
   why:'Le neutre de ({1 ; −1}, ·) est 1. signe(x) = 1 exactement quand x > 0 : ker = ℝ*₊. Et 0 n’est même pas dans ℝ*.'},
  {h:'Injective si et seulement si le noyau est trivial',p:`<p>Pour montrer qu’une application quelconque est injective, il faut vérifier que <i>f</i>(<i>a</i>) = <i>f</i>(<i>b</i>) entraîne <i>a</i> = <i>b</i>, pour <b>tous</b> les couples. Pour un homomorphisme, un seul test suffit.</p><div class="thm"><p>Un homomorphisme <i>f</i> : <i>G</i> → <i>G</i>′ est injectif si et seulement si <b>ker <i>f</i> = {<i>e</i>}</b>.</p></div><div class="why"><p>⇒ : on sait que <i>f</i>(<i>e</i>) = <i>e</i>′. Si <i>f</i> est injectif, aucun autre élément n’a pour image <i>e</i>′, donc ker <i>f</i> = {<i>e</i>}.<br>⇐ : si <i>f</i>(<i>a</i>) = <i>f</i>(<i>b</i>), alors <i>f</i>(<i>ab</i>⁻¹) = <i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>)⁻¹ = <i>e</i>′. Donc <i>ab</i>⁻¹ ∈ ker <i>f</i> = {<i>e</i>}, d’où <i>ab</i>⁻¹ = <i>e</i> et <i>a</i> = <i>b</i>.</p></div><div class="ex"><p><i>n</i> ↦ 3<i>n</i> sur (ℤ, +) : 3<i>n</i> = 0 ⇔ <i>n</i> = 0, le noyau est {0} et l’application est injective. <i>x</i> ↦ <i>x</i>² sur (ℝ*, ·) a pour noyau {−1 ; 1} : elle n’est pas injective, et en effet (−2)² = 2².</p></div><div class="idea"><p>Plus généralement, <i>f</i>(<i>a</i>) = <i>f</i>(<i>b</i>) ⇔ <i>ab</i>⁻¹ ∈ ker <i>f</i> : chaque élément de l’image a autant d’antécédents que le noyau a d’éléments. C’est ce que tu as vu sur la figure de ℤ/12ℤ.</p></div>`,
  },
  {h:'Le pas clé',p:'Dans la preuve ci-dessus, quelle propriété justifie l’égalité <i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>)⁻¹ = <i>f</i>(<i>ab</i>⁻¹)&nbsp;?',
   opts:['La commutativité de <i>G</i>′','L’injectivité de <i>f</i>','<i>f</i>(<i>b</i>)⁻¹ = <i>f</i>(<i>b</i>⁻¹), puis <i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>⁻¹) = <i>f</i>(<i>ab</i>⁻¹)','Le fait que <i>a</i> = <i>b</i>'],ans:2,
   why:'On utilise f(b⁻¹) = f(b)⁻¹, puis la définition d’un homomorphisme. Utiliser l’injectivité ou a = b serait tourner en rond : c’est ce qu’on veut prouver.'},
  {h:'Isomorphismes : la même table, renommée',p:`<p>Quand un homomorphisme est en plus bijectif, il n’écrase rien et couvre tout : il met les deux groupes en correspondance parfaite, élément par élément et calcul par calcul.</p><div class="def"><p>Un <b>isomorphisme</b> est un homomorphisme bijectif. Deux groupes <i>G</i> et <i>G</i>′ sont <b>isomorphes</b>, et on écrit <i>G</i> ≅ <i>G</i>′, s’il existe un isomorphisme de l’un sur l’autre.</p></div><div class="idea"><p>Si <i>f</i> est un isomorphisme, renomme chaque <i>a</i> en <i>f</i>(<i>a</i>) : la table de <i>G</i> devient exactement celle de <i>G</i>′, puisque la case <i>ab</i> devient <i>f</i>(<i>ab</i>) = <i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>). Deux groupes isomorphes ont <b>la même table, à un renommage près</b>.</p></div><div class="ex"><p>Compare les tables : chaque couleur représente un élément, et la diagonale encadrée contient les carrés <i>x</i>². <i>U</i> = {1 ; 2 ; 3 ; 4} avec le produit modulo 5, une fois rangé dans l’ordre 1, 2, 4, 3 (les puissances de 2), a exactement le motif de ℤ/4ℤ : <i>k</i> ↦ 2ᵏ mod 5 est un isomorphisme.</p></div><div class="warn"><p>Avoir le même nombre d’éléments ne suffit pas : il faut un renommage qui respecte <b>toute</b> la table. Rangé dans l’ordre 1, 2, 3, 4, <i>U</i> ne montre pas le motif ; le bon ordre est imposé par la loi.</p></div>`,
   params:[{id:'g',l:'Groupe',min:0,max:4,v:0}],
   draw:v=>cayley(v.g),
   info:v=>['<b>ℤ/4ℤ</b> : deux éléments vérifient x + x = 0 (0 et 2).','<b>U</b>, produit modulo 5 : les couleurs ne suivent pas le motif de ℤ/4ℤ… pour l’instant.','<b>U</b> rangé dans l’ordre 1, 2, 4, 3 (les puissances de 2) : exactement le motif de ℤ/4ℤ. L’application k ↦ 2ᵏ mod 5 est un isomorphisme.','<b>Klein</b> : toute la diagonale vaut e, chaque élément est son propre inverse. Impossible de retrouver le motif de ℤ/4ℤ.','<b>{1 ; 3 ; 5 ; 7}</b> modulo 8 : 3² = 9 ≡ 1, 5² = 25 ≡ 1, 7² = 49 ≡ 1. Même motif que Klein.'][v.g],
   note:'Un isomorphisme est une traduction parfaite : tout ce qui se dit avec la loi de G se dit dans G′. On le regarde comme « le même groupe, avec d’autres noms ».'},
  {h:'La réciproque d’un isomorphisme',p:`<p>Un isomorphisme <i>f</i> : <i>G</i> → <i>G</i>′ permet de traduire de <i>G</i> vers <i>G</i>′. Peut-on traduire dans l’autre sens avec la même fidélité ? Oui, et c’est ce qui fait de ≅ une relation symétrique.</p>
  <div class="prop"><p>Si <i>f</i> est un isomorphisme de <i>G</i> sur <i>G</i>′, sa réciproque <i>f</i>⁻¹ : <i>G</i>′ → <i>G</i> est un isomorphisme. La composée de deux isomorphismes est un isomorphisme.</p></div>
  <div class="why"><p>Soient <i>x</i>, <i>y</i> ∈ <i>G</i>′. Pose <i>a</i> = <i>f</i>⁻¹(<i>x</i>) et <i>b</i> = <i>f</i>⁻¹(<i>y</i>). Comme <i>f</i> est un homomorphisme, <i>f</i>(<i>ab</i>) = <i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>) = <i>xy</i>. En appliquant <i>f</i>⁻¹ : <i>f</i>⁻¹(<i>xy</i>) = <i>ab</i> = <i>f</i>⁻¹(<i>x</i>)<i>f</i>⁻¹(<i>y</i>). Et <i>f</i>⁻¹ est bijective. Pour une composée : <i>g</i>(<i>f</i>(<i>ab</i>)) = <i>g</i>(<i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>)) = <i>g</i>(<i>f</i>(<i>a</i>))<i>g</i>(<i>f</i>(<i>b</i>)), et une composée de bijections est bijective.</p></div>
  <div class="ex"><p>exp : (ℝ, +) → (ℝ*₊, ·) est bijective, donc c’est un isomorphisme ; sa réciproque est ln, qui vérifie bien ln(<i>xy</i>) = ln <i>x</i> + ln <i>y</i>. Ainsi (ℝ, +) ≅ (ℝ*₊, ·) : l’addition des réels et la multiplication des réels positifs sont « la même » loi.</p></div>
  <div class="idea"><p>Être isomorphe se comporte comme une égalité : <i>G</i> ≅ <i>G</i> (par l’identité) ; si <i>G</i> ≅ <i>G</i>′, alors <i>G</i>′ ≅ <i>G</i> ; si <i>G</i> ≅ <i>G</i>′ et <i>G</i>′ ≅ <i>G</i>″, alors <i>G</i> ≅ <i>G</i>″.</p></div>`},
  {kind:'Méthode',h:'Montrer que deux groupes ne sont pas isomorphes',
   p:'<b>Pourquoi :</b> un isomorphisme conserve tout ce qui s’exprime avec la loi. Si <i>f</i> est un isomorphisme, alors <i>f</i>(<i>a</i>)ⁿ = <i>f</i>(<i>a</i>ⁿ), donc <i>a</i>ⁿ = <i>e</i> ⇔ <i>f</i>(<i>a</i>)ⁿ = <i>e</i>′ : <b><i>a</i> et <i>f</i>(<i>a</i>) ont le même ordre</b>. <b>Comment :</b> on compare des <b>invariants</b> : 1) le cardinal ; 2) la commutativité ; 3) le nombre d’éléments de chaque ordre ; 4) l’existence d’un générateur. Une seule différence suffit à conclure « non isomorphes ». Des invariants égaux, en revanche, ne prouvent pas l’isomorphisme : il faut alors le construire.',
   demo:{enonce:'Montre que ℤ/4ℤ et le groupe de Klein <i>V</i> ne sont pas isomorphes, puis que ℤ/6ℤ et <i>D</i>₃ non plus.',
    etapes:[{f:'ℤ/4ℤ et <i>V</i> ont 4 éléments et sont commutatifs.',w:'Les premiers invariants ne les séparent pas.'},
     {f:'Dans ℤ/4ℤ, 1 est d’ordre 4. Dans <i>V</i>, tout élément vérifie <i>x</i>² = <i>e</i> : aucun n’est d’ordre 4.',w:'On compte les ordres des éléments.'},
     {f:'Un isomorphisme enverrait 1 sur un élément d’ordre 4 de <i>V</i> : impossible.',w:'L’ordre est conservé.'},
     {f:'ℤ/6ℤ est commutatif ; <i>D</i>₃ ne l’est pas (une rotation et une symétrie ne commutent pas).',w:'Si f était un isomorphisme, ab = ba dans ℤ/6ℤ donnerait f(a)f(b) = f(b)f(a) pour tous les éléments de D₃.'}],
    conclusion:'ℤ/4ℤ ≇ <i>V</i> (ordres des éléments) et ℤ/6ℤ ≇ <i>D</i>₃ (commutativité), bien que les cardinaux soient égaux.'}},
  {h:'Qui ressemble à Klein&nbsp;?',p:'Lequel de ces groupes est isomorphe au groupe de Klein <i>V</i>&nbsp;?',
   opts:['ℤ/4ℤ','({1 ; 2 ; 3 ; 4}, produit modulo 5)','({1 ; 3 ; 5 ; 7}, produit modulo 8)','ℤ/2ℤ'],ans:2,
   why:'Dans {1 ; 3 ; 5 ; 7} modulo 8, chaque élément est son propre inverse (3² = 9, 5² = 25, 7² = 49, tous ≡ 1). En renommant 1, 3, 5, 7 en e, a, b, c, on retrouve la table de Klein. ℤ/4ℤ et U modulo 5 ont un élément d’ordre 4, et ℤ/2ℤ n’a que 2 éléments.'},
  {h:'Compter les éléments d’ordre 4',p:'Dans <i>U</i> = ({1 ; 2 ; 3 ; 4}, produit modulo 5), combien d’éléments sont d’ordre 4&nbsp;?',lab:'nombre :',ans:2,
   why:'Puissances de 2 : 2, 4, 3, 1 (ordre 4). Puissances de 3 : 3, 4, 2, 1 (ordre 4). 4² = 16 ≡ 1 (ordre 2) et 1 est d’ordre 1. Deux éléments : comme dans ℤ/4ℤ, où 1 et 3 sont d’ordre 4.'},
  {h:'Automorphismes',p:`<p>Un groupe peut être isomorphe à lui-même de plusieurs façons. Ces « renommages internes » mesurent ses symétries.</p><div class="def"><p>Un <b>automorphisme</b> de <i>G</i> est un isomorphisme de <i>G</i> sur <i>G</i>. Muni de la composition, l’ensemble des automorphismes est un groupe, noté Aut(<i>G</i>) : la composée et la réciproque d’automorphismes en sont encore (vu plus haut), et l’identité est neutre.</p></div><div class="prop"><p>Les automorphismes de ℤ/<i>n</i>ℤ sont les applications <i>x</i> ↦ <i>kx</i> avec <b>pgcd(<i>k</i> ; <i>n</i>) = 1</b>.</p></div><div class="why"><p>Un homomorphisme de ℤ/<i>n</i>ℤ dans lui-même est <i>x</i> ↦ <i>kx</i>, avec <i>k</i> = <i>f</i>(1). Son image est ⟨<i>k</i>⟩. Il est surjectif si et seulement si ⟨<i>k</i>⟩ est tout le groupe, c’est-à-dire si <i>k</i> est un générateur : pgcd(<i>k</i> ; <i>n</i>) = 1. Pour une application d’un ensemble fini dans lui-même, surjective équivaut à bijective.</p></div><div class="ex"><p>Dans ℤ/12ℤ, ce sont <i>k</i> = 1, 5, 7, 11 : quatre automorphismes (revois la figure du noyau). Par exemple <i>x</i> ↦ 5<i>x</i> envoie 0, 1, 2, 3 sur 0, 5, 10, 3.</p></div><div class="blk" data-t="Conjugaison"><p>Dans n’importe quel groupe, la <b>conjugaison</b> <i>x</i> ↦ <i>gxg</i>⁻¹ par un élément <i>g</i> fixé est un automorphisme : (<i>gxg</i>⁻¹)(<i>gyg</i>⁻¹) = <i>g</i>(<i>xy</i>)<i>g</i>⁻¹, et sa réciproque est la conjugaison par <i>g</i>⁻¹.</p></div>`,
  },
  {h:'Les automorphismes de ℤ/8ℤ',p:'Combien le groupe ℤ/8ℤ a-t-il d’automorphismes&nbsp;?',lab:'nombre :',ans:4,
   why:'Il faut k ∈ {0, …, 7} avec pgcd(k, 8) = 1 : k = 1, 3, 5, 7. Quatre automorphismes x ↦ kx.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : homomorphismes',p:`<div class="keep"><ul>
  <li>Homomorphisme <i>f</i> : <i>G</i> → <i>G</i>′ : <i>f</i>(<i>ab</i>) = <i>f</i>(<i>a</i>)<i>f</i>(<i>b</i>), chaque loi de son côté. Exemples : exp, la parité, <i>n</i> ↦ <i>kn</i>.</li>
  <li>Conséquences : <i>f</i>(<i>e</i>) = <i>e</i>′, <i>f</i>(<i>a</i>⁻¹) = <i>f</i>(<i>a</i>)⁻¹, <i>f</i>(<i>a</i>ⁿ) = <i>f</i>(<i>a</i>)ⁿ. Pour réfuter : un couple qui échoue, en testant d’abord le neutre.</li>
  <li>Depuis ℤ/<i>n</i>ℤ : <i>f</i>(<i>x</i>) = <i>ax</i> avec <i>a</i> = <i>f</i>(1) ; vers ℤ/<i>m</i>ℤ, il faut <i>na</i> ≡ 0 (mod <i>m</i>).</li>
  <li>Noyau ker <i>f</i> = {<i>a</i> : <i>f</i>(<i>a</i>) = <i>e</i>′} et image Im <i>f</i> = <i>f</i>(<i>G</i>) : sous-groupes de <i>G</i> et de <i>G</i>′.</li>
  <li><i>f</i> injectif ⇔ ker <i>f</i> = {<i>e</i>} ; plus généralement <i>f</i>(<i>a</i>) = <i>f</i>(<i>b</i>) ⇔ <i>ab</i>⁻¹ ∈ ker <i>f</i>.</li>
  <li>Isomorphisme : homomorphisme bijectif ; sa réciproque en est un. <i>G</i> ≅ <i>G</i>′ : même table, à un renommage près.</li>
  <li>Invariants conservés par isomorphisme : cardinal, commutativité, nombre d’éléments de chaque ordre, existence d’un générateur. Une seule différence ⇒ non isomorphes.</li>
  <li>Aut(ℤ/<i>n</i>ℤ) : les <i>x</i> ↦ <i>kx</i> avec pgcd(<i>k</i> ; <i>n</i>) = 1. La conjugaison <i>x</i> ↦ <i>gxg</i>⁻¹ est un automorphisme.</li>
  </ul></div>`},
  {kind:'Problème',h:'Les homomorphismes de ℤ/12ℤ dans ℤ/8ℤ',
   p:'On cherche tous les homomorphismes <i>f</i> : ℤ/12ℤ → ℤ/8ℤ, puis on étudie l’un d’eux en détail. On rappelle qu’un tel homomorphisme est de la forme <i>x</i> ↦ <i>ax</i> mod 8, où <i>a</i> = <i>f</i>(1) doit vérifier une condition.',
   parts:[
    {q:'a) Combien y a-t-il d’homomorphismes de ℤ/12ℤ dans ℤ/8ℤ&nbsp;?',lab:'nombre :',ans:4,hint:'Il faut 12a ≡ 0 (mod 8) avec a ∈ {0, …, 7}.',why:'12a ≡ 0 (mod 8) ⇔ 8 divise 12a ⇔ 2 divise 3a ⇔ a pair : a ∈ {0 ; 2 ; 4 ; 6}.'},
    {q:'b) On prend <i>f</i>(<i>x</i>) = 2<i>x</i> mod 8. Combien d’éléments a ker <i>f</i>&nbsp;?',lab:'card(ker f) =',ans:3,hint:'Résous 2x ≡ 0 (mod 8) pour x ∈ {0, …, 11}.',why:'2x ≡ 0 (mod 8) ⇔ x ≡ 0 (mod 4) : ker f = {0 ; 4 ; 8}.'},
    {q:'c) Combien d’éléments a Im <i>f</i>&nbsp;?',lab:'card(Im f) =',ans:4,hint:'Calcule 2x mod 8 pour x = 0, 1, 2, 3, …',why:'Les valeurs de 2x mod 8 sont 0, 2, 4, 6 : Im f = {0 ; 2 ; 4 ; 6}. On a bien 3 × 4 = 12.'},
    {q:'d) <i>f</i> est-il injectif&nbsp;?',opts:['Oui, car Im f est un sous-groupe','Non, car ker f ≠ {0} : par exemple f(4) = f(0) = 0','Oui, car f(0) = 0','On ne peut pas savoir sans tester tous les couples'],ans:1,hint:'Utilise le critère du noyau.',why:'Un homomorphisme est injectif si et seulement si son noyau est réduit au neutre. Ici 4 ∈ ker f, donc f(4) = f(0) et f n’est pas injectif.'},
   ],
   sol:'Un homomorphisme f : ℤ/12ℤ → ℤ/8ℤ est déterminé par a = f(1), et f(x) = ax mod 8 n’est bien défini que si 12a ≡ 0 (mod 8), c’est-à-dire a pair : 4 homomorphismes (a = 0, 2, 4, 6).<br>Pour a = 2 : ker f est l’ensemble des x avec 2x ≡ 0 (mod 8), soit x ≡ 0 (mod 4), donc ker f = {0 ; 4 ; 8}, un sous-groupe à 3 éléments.<br>Im f = {0 ; 2 ; 4 ; 6}, un sous-groupe à 4 éléments de ℤ/8ℤ. Chaque élément de l’image a exactement 3 antécédents, d’où 3 × 4 = 12.<br>Comme ker f ≠ {0}, f n’est pas injectif ; il n’est pas surjectif non plus (1 ∉ Im f).'},
  {kind:'Problème',h:'Deux groupes à quatre éléments',
   p:'On considère <i>U</i> = {1 ; 2 ; 3 ; 4} muni du produit modulo 5 ; c’est un groupe commutatif de neutre 1. On veut montrer que <i>U</i> est isomorphe à ℤ/4ℤ, compter ces isomorphismes, puis comparer <i>U</i> au groupe de Klein <i>V</i>.',
   parts:[
    {q:'a) Quel est l’ordre de 2 dans <i>U</i>&nbsp;?',lab:'ordre :',ans:4,hint:'Calcule 2, 2², 2³, … modulo 5 jusqu’à obtenir 1.',why:'2¹ = 2, 2² = 4, 2³ = 8 ≡ 3, 2⁴ = 16 ≡ 1 : l’ordre de 2 est 4.'},
    {q:'b) On pose <i>f</i>(<i>k</i>) = 2ᵏ mod 5 pour <i>k</i> ∈ ℤ/4ℤ. Combien vaut <i>f</i>(3)&nbsp;?',lab:'f(3) =',ans:3,hint:'2³ = 8.',why:'f(3) = 8 mod 5 = 3. La définition a un sens car 2⁴ ≡ 1 : k et k + 4 donnent la même image.'},
    {q:'c) Pourquoi <i>f</i> est-il un isomorphisme&nbsp;?',opts:['Parce que U et ℤ/4ℤ ont tous deux 4 éléments','Parce que f(0) = 1','Parce que 2ᵏ⁺ˡ = 2ᵏ · 2ˡ (homomorphisme) et que 1, 2, 4, 3 sont distincts (bijection)','Parce que U est commutatif'],ans:2,hint:'Il faut deux choses : respecter la loi et être bijectif.',why:'La somme dans ℤ/4ℤ devient un produit : f(k + l) = 2ᵏ⁺ˡ = f(k)f(l). Comme 2 est d’ordre 4, ses puissances 1, 2, 4, 3 sont les 4 éléments de U, une fois chacun : f est bijectif. Avoir le même cardinal ne suffit pas (pense à Klein).'},
    {q:'d) Combien y a-t-il d’isomorphismes de ℤ/4ℤ dans <i>U</i>&nbsp;?',lab:'nombre :',ans:2,hint:'Un isomorphisme conserve l’ordre : l’image de 1 doit être d’ordre 4.',why:'f est déterminé par f(1), qui doit être d’ordre 4 comme 1 : f(1) = 2 ou f(1) = 3. Réciproquement, chacun de ces choix donne un isomorphisme. Il y en a 2.'},
    {q:'e) <i>U</i> est-il isomorphe au groupe de Klein <i>V</i>&nbsp;?',opts:['Oui, ils ont 4 éléments et sont commutatifs','Non : U possède un élément d’ordre 4, V n’en a aucun','Oui, car U ≅ ℤ/4ℤ','Non, car U n’a pas de neutre'],ans:1,hint:'Compare un invariant.',why:'Un isomorphisme conserve l’ordre des éléments. 2 est d’ordre 4 dans U, alors que tout élément de V vérifie x² = e. Donc U ≇ V (comme ℤ/4ℤ ≇ V).'},
   ],
   sol:'Dans U, les puissances de 2 sont 2, 4, 3, 1 : 2 est d’ordre 4. L’application f(k) = 2ᵏ mod 5 est bien définie sur ℤ/4ℤ puisque 2⁴ ≡ 1.<br>C’est un homomorphisme de (ℤ/4ℤ, +) dans (U, ·) car 2ᵏ⁺ˡ = 2ᵏ2ˡ, et il est bijectif car 1, 2, 4, 3 sont distincts : U ≅ ℤ/4ℤ.<br>Un isomorphisme ℤ/4ℤ → U est déterminé par l’image de 1, qui doit être d’ordre 4 : 2 ou 3. Il y a donc 2 isomorphismes (on retrouve les 2 automorphismes de ℤ/4ℤ, x ↦ x et x ↦ 3x).<br>Enfin U ≇ V : U a un élément d’ordre 4, V n’en a pas.'},
]},

/* ===================== 2. SOUS-GROUPES DISTINGUÉS ET QUOTIENT ===================== */
{subj:'gred',sem:'grp',id:'gred-quotient',h:'Sous-groupes distingués et groupe quotient',p:'Quand peut-on calculer avec des classes ? Sous-groupes distingués, groupe quotient et premier théorème d’isomorphisme.',steps:[
  {h:'Classes à gauche, classes à droite',p:`<p>Au chapitre sur les sous-groupes, on a découpé un groupe en classes à gauche <i>gH</i>. Rien n’oblige à multiplier à gauche : on peut aussi multiplier à droite. Obtient-on le même découpage ?</p><div class="def"><p>Soit <i>H</i> un sous-groupe de <i>G</i> et <i>g</i> ∈ <i>G</i>. La <b>classe à gauche</b> de <i>g</i> est <i>gH</i> = {<i>gh</i> : <i>h</i> ∈ <i>H</i>} ; la <b>classe à droite</b> est <b><i>Hg</i> = {<i>hg</i> : <i>h</i> ∈ <i>H</i>}</b>. Comme les classes à gauche, les classes à droite ont |<i>H</i>| éléments et partitionnent <i>G</i>.</p></div><div class="idea"><p>Dans un groupe commutatif, <i>gh</i> = <i>hg</i>, donc <i>gH</i> = <i>Hg</i> toujours. Dans un groupe non commutatif, les deux découpages peuvent différer, et cette différence est la clé du chapitre.</p></div><div class="ex"><p>On note ici <i>D</i>₃ avec <i>r</i>, la rotation d’un tiers de tour, et <i>s</i>, une symétrie fixée, les produits se lisant de droite à gauche. Ses six éléments sont <i>e</i>, <i>r</i>, <i>r</i>², <i>s</i>, <i>rs</i>, <i>r</i>²<i>s</i>. Avec <i>H</i> = {<i>e</i> ; <i>s</i>} et <i>g</i> = <i>s</i> : <i>sH</i> = {<i>s</i> ; <i>s</i>²} = {<i>s</i> ; <i>e</i>} = <i>H</i>, et <i>Hs</i> = <i>H</i> aussi. Dès que <i>g</i> ∈ <i>H</i>, les deux classes valent <i>H</i>. Choisis d’autres <i>g</i> pour voir si elles restent égales.</p></div>`,
   params:[{id:'h',l:'H : 0 = {e ; s}, 1 = {e ; r ; r²}',min:0,max:1,v:0},{id:'g',l:'g',min:0,max:5,v:0}],
   draw:v=>d3fig(v.h,v.g),
   info:v=>{ const H=D3H[v.h], g=D3N[v.g]; return `g = ${g} : gH = {${H.map(x=>d3m(g,x)).join(' ; ')}} et Hg = {${H.map(x=>d3m(x,g)).join(' ; ')}}`; },
   note:'Règle de calcul dans D₃ : r³ = e, s² = e et <b>s r = r² s</b> (plus généralement s rᵏ = r⁻ᵏ s). Elle permet de ramener tout produit à la forme rᵃ ou rᵃs.'},
  {kind:'Méthode',h:'Calculer gH et Hg dans D₃',
   p:'<b>Comment :</b> 1) liste les produits <i>gh</i> (pour <i>gH</i>) ou <i>hg</i> (pour <i>Hg</i>), <i>h</i> parcourant <i>H</i> ; 2) ramène chaque produit à la forme <i>r</i>ᵃ ou <i>r</i>ᵃ<i>s</i> avec <i>s r</i>ᵏ = <i>r</i>⁻ᵏ<i>s</i>, <i>r</i>³ = <i>e</i> et <i>s</i>² = <i>e</i> ; 3) compare les deux ensembles. <b>Pourquoi ça marche :</b> la règle <i>s r</i> = <i>r</i>²<i>s</i> dit qu’on peut faire passer <i>s</i> à droite d’une rotation, à condition d’inverser la rotation.',
   demo:{enonce:'Avec <i>H</i> = {<i>e</i> ; <i>s</i>}, calcule <i>rH</i> et <i>Hr</i>.',
    etapes:[{f:'<i>rH</i> = {<i>r e</i> ; <i>r s</i>} = {<i>r</i> ; <i>rs</i>}.',w:'Les produits rh sont déjà sous forme normale.'},
     {f:'<i>Hr</i> = {<i>e r</i> ; <i>s r</i>}.',w:'Cette fois, h est à gauche.'},
     {f:'<i>s r</i> = <i>r</i>⁻¹<i>s</i> = <i>r</i>²<i>s</i>, donc <i>Hr</i> = {<i>r</i> ; <i>r</i>²<i>s</i>}.',w:'On fait passer s à droite, ce qui inverse la rotation.'},
     {f:'<i>rs</i> ≠ <i>r</i>²<i>s</i>, donc <i>rH</i> ≠ <i>Hr</i>.',w:'On compare : les deux classes contiennent r, mais pas le même deuxième élément.'}],
    conclusion:'Pour <i>H</i> = {<i>e</i> ; <i>s</i>}, la classe à gauche et la classe à droite de <i>r</i> sont différentes. Le partage de <i>D</i>₃ en classes à gauche n’est pas le même que le partage en classes à droite.'}},
  {h:'À toi de calculer',p:'Avec <i>H</i> = {<i>e</i> ; <i>s</i>}, que vaut <i>Hr</i>² = {<i>r</i>² ; <i>s r</i>²}&nbsp;?',
   opts:['{<i>r</i>² ; <i>r</i>²<i>s</i>}','{<i>r</i>² ; <i>rs</i>}','{<i>r</i>² ; <i>s</i>}','{<i>r</i> ; <i>rs</i>}'],ans:1,
   why:'s r² = r⁻²s = r s (car r³ = e). Donc Hr² = {r² ; rs}, alors que r²H = {r² ; r²s}. Encore une classe à droite différente de la classe à gauche.'},
  {kind:'Pratique',h:'Trouve une classe qui diffère',p:'Sur la figure, choisis le sous-groupe <i>H</i> et un élément <i>g</i> tels que <i>gH</i> ≠ <i>Hg</i>.',
   params:[{id:'h',l:'H : 0 = {e ; s}, 1 = {e ; r ; r²}',min:0,max:1,v:1},{id:'g',l:'g',min:0,max:5,v:3}],
   draw:v=>d3fig(v.h,v.g),
   ok:v=>{ const H=D3H[v.h], g=D3N[v.g], L=H.map(x=>d3m(g,x)), R=H.map(x=>d3m(x,g)); return !L.every(x=>R.includes(x)); },
   why:'Avec H = {e ; s}, les éléments r, r², rs, r²s donnent gH ≠ Hg. Avec H = {e ; r ; r²}, gH = Hg pour tout g : ce sous-groupe est spécial, c’est la suite du chapitre.'},
  {h:'Conjuguer un élément',p:`<p>Pour comparer <i>gH</i> et <i>Hg</i>, une opération va servir sans cesse : entourer un élément par <i>g</i> et par <i>g</i>⁻¹.</p>
  <div class="def"><p>Le <b>conjugué</b> de <i>h</i> par <i>g</i> est <b><i>ghg</i>⁻¹</b>. Pour une partie <i>H</i>, on note <i>gHg</i>⁻¹ = {<i>ghg</i>⁻¹ : <i>h</i> ∈ <i>H</i>}.</p></div>
  <div class="idea"><p>Lis <i>ghg</i>⁻¹ de droite à gauche : on défait <i>g</i>, on fait <i>h</i>, puis on refait <i>g</i>. C’est « <i>h</i> vu depuis <i>g</i> ». Si <i>g</i> et <i>h</i> commutent, <i>ghg</i>⁻¹ = <i>hgg</i>⁻¹ = <i>h</i> : la conjugaison ne change rien. Elle mesure donc le défaut de commutativité.</p></div>
  <div class="ex"><p>Dans <i>D</i>₃, avec <i>s r</i>ᵏ = <i>r</i>⁻ᵏ<i>s</i> : <i>s r s</i>⁻¹ = <i>s r s</i> = <i>r</i>⁻¹<i>s s</i> = <i>r</i>². Le conjugué d’une rotation est une rotation. De même <i>r s r</i>⁻¹ = <i>r s r</i>² = <i>r</i> · <i>r</i>⁻²<i>s</i> = <i>r</i>²<i>s</i> : le conjugué d’une symétrie est une autre symétrie.</p></div>
  <div class="prop"><p><i>gH</i> = <i>Hg</i> ⇔ <i>gHg</i>⁻¹ = <i>H</i>. En effet, multiplier à droite par <i>g</i>⁻¹ envoie <i>gH</i> sur <i>gHg</i>⁻¹ et <i>Hg</i> sur <i>H</i> ; comme cette opération est bijective, les deux égalités sont équivalentes.</p></div>`},
  {h:'Sous-groupe distingué',p:`<p>Les sous-groupes pour lesquels classes à gauche et classes à droite coïncident sont spéciaux : ce sont exactement ceux avec lesquels on pourra calculer sur les classes.</p><div class="def"><p>Un sous-groupe <i>H</i> de <i>G</i> est <b>distingué</b> (ou <b>normal</b>) si <b><i>gHg</i>⁻¹ = <i>H</i> pour tout <i>g</i> ∈ <i>G</i></b>, ce qui équivaut à <b><i>gH</i> = <i>Hg</i></b> pour tout <i>g</i>. On écrit alors <i>H</i> ⊲ <i>G</i>.</p></div><div class="prop"><p>En pratique, il suffit de vérifier que <b><i>ghg</i>⁻¹ ∈ <i>H</i> pour tous <i>g</i> ∈ <i>G</i> et <i>h</i> ∈ <i>H</i></b>.</p></div><div class="why"><p>Cette condition dit <i>gHg</i>⁻¹ ⊂ <i>H</i> pour tout <i>g</i>. Appliquée à <i>g</i>⁻¹, elle donne <i>g</i>⁻¹<i>Hg</i> ⊂ <i>H</i> ; en multipliant par <i>g</i> à gauche et par <i>g</i>⁻¹ à droite, <i>H</i> ⊂ <i>gHg</i>⁻¹. Les deux inclusions donnent l’égalité.</p></div><div class="ex"><p>{<i>e</i>} et <i>G</i> sont toujours distingués. Dans <i>D</i>₃, {<i>e</i> ; <i>s</i>} ne l’est pas : le conjugué <i>rsr</i>⁻¹ = <i>r</i>²<i>s</i> sort de {<i>e</i> ; <i>s</i>}.</p></div><div class="warn"><p><i>gH</i> = <i>Hg</i> ne veut pas dire <i>gh</i> = <i>hg</i> pour chaque <i>h</i>. Dans <i>D</i>₃, <i>r</i>{<i>e</i> ; <i>r</i> ; <i>r</i>²} = {<i>e</i> ; <i>r</i> ; <i>r</i>²}<i>r</i>, et pourtant <i>rs</i> ≠ <i>sr</i>.</p></div>`,
  },
  {h:'Les groupes commutatifs',p:'Pourquoi tout sous-groupe <i>H</i> d’un groupe commutatif <i>G</i> est-il distingué&nbsp;?',
   opts:['Parce que <i>H</i> contient <i>e</i>','Parce que <i>ghg</i>⁻¹ = <i>hgg</i>⁻¹ = <i>h</i> ∈ <i>H</i> pour tous <i>g</i>, <i>h</i>','Parce que <i>G</i> est fini','Parce que <i>H</i> est cyclique'],ans:1,
   why:'Comme gh = hg, la conjugaison ne change rien : ghg⁻¹ = h. C’est vrai pour tout sous-groupe de ℤ, de ℤ/nℤ, de (ℝ*, ·)… même infini.'},
  {h:'Le noyau est toujours distingué',p:`<p>Où trouver des sous-groupes distingués ? La source la plus abondante est donnée par les homomorphismes.</p><div class="thm"><p>Si <i>f</i> : <i>G</i> → <i>G</i>′ est un homomorphisme, alors <b>ker <i>f</i> ⊲ <i>G</i></b>.</p></div><div class="why"><p>Soient <i>k</i> ∈ ker <i>f</i> et <i>g</i> ∈ <i>G</i>. On calcule l’image du conjugué :<br><i>f</i>(<i>gkg</i>⁻¹) = <i>f</i>(<i>g</i>) <i>f</i>(<i>k</i>) <i>f</i>(<i>g</i>)⁻¹ = <i>f</i>(<i>g</i>) <i>e</i>′ <i>f</i>(<i>g</i>)⁻¹ = <i>e</i>′.<br>Donc <i>gkg</i>⁻¹ ∈ ker <i>f</i>, et le critère pratique conclut. L’idée : <i>f</i> écrase <i>k</i> sur le neutre, et le neutre est invisible au milieu d’un produit.</p></div><div class="ex"><p>Le déterminant det : GL₂(ℝ) → (ℝ*, ·) est un homomorphisme, car det(<i>AB</i>) = det <i>A</i> · det <i>B</i>. Son noyau, l’ensemble des matrices de déterminant 1, est donc distingué dans GL₂(ℝ) : si det <i>K</i> = 1, alors det(<i>AKA</i>⁻¹) = det <i>A</i> · 1 · (det <i>A</i>)⁻¹ = 1.</p></div><div class="warn"><p>L’image, elle, n’a aucune raison d’être distinguée dans <i>G</i>′. L’inclusion de {<i>e</i> ; <i>s</i>} dans <i>D</i>₃ est un homomorphisme, dont l’image {<i>e</i> ; <i>s</i>} n’est pas distinguée dans <i>D</i>₃.</p></div>`,
   note:'C’est la source principale de sous-groupes distingués. On verra plus bas que, réciproquement, tout sous-groupe distingué est le noyau d’un homomorphisme.'},
  {kind:'Méthode',h:'Le critère de l’indice 2',
   p:'<b>Énoncé :</b> si <i>H</i> a exactement deux classes à gauche dans <i>G</i> (on dit que <i>H</i> est d’<b>indice 2</b>), alors <i>H</i> ⊲ <i>G</i>. <b>Pourquoi :</b> les classes forment une partition. Les deux classes à gauche sont <i>H</i> et son complémentaire <i>G</i> ∖ <i>H</i> ; de même pour les classes à droite. Si <i>g</i> ∈ <i>H</i>, <i>gH</i> = <i>H</i> = <i>Hg</i> ; sinon <i>gH</i> = <i>G</i> ∖ <i>H</i> = <i>Hg</i>. <b>Quand l’utiliser :</b> dès que card <i>G</i> = 2 card <i>H</i> (Lagrange).',
   demo:{enonce:'Montre que le sous-groupe des rotations <i>R</i> = {<i>e</i> ; <i>r</i> ; <i>r</i>²} est distingué dans <i>D</i>₃.',
    etapes:[{f:'card <i>D</i>₃ = 6 et card <i>R</i> = 3 : il y a 6/3 = 2 classes à gauche.',w:'Par Lagrange, le nombre de classes est card G / card H.'},
     {f:'Les deux classes sont <i>R</i> = {<i>e</i> ; <i>r</i> ; <i>r</i>²} et <i>D</i>₃ ∖ <i>R</i> = {<i>s</i> ; <i>rs</i> ; <i>r</i>²<i>s</i>}.',w:'Une classe est H elle-même, l’autre son complémentaire.'},
     {f:'Pour <i>g</i> = <i>s</i> : <i>sR</i> = {<i>s</i> ; <i>sr</i> ; <i>sr</i>²} = {<i>s</i> ; <i>r</i>²<i>s</i> ; <i>rs</i>} = <i>Rs</i>.',w:'Contrôle par le calcul, avec s rᵏ = r⁻ᵏ s.'}],
    conclusion:'<i>R</i> ⊲ <i>D</i>₃, sans avoir à vérifier les 18 conjugaisons <i>grg</i>⁻¹. En revanche {<i>e</i> ; <i>s</i>} est d’indice 3 et n’est pas distingué.'}},
  {h:'Lequel est distingué&nbsp;?',p:'Lequel de ces sous-groupes de <i>D</i>₃ est distingué&nbsp;?',
   opts:['{<i>e</i> ; <i>s</i>}','{<i>e</i> ; <i>rs</i>}','{<i>e</i> ; <i>r</i>²<i>s</i>}','{<i>e</i> ; <i>r</i> ; <i>r</i>²}'],ans:3,
   why:'{e ; r ; r²} est d’indice 2, donc distingué. Les trois sous-groupes d’ordre 2 ne le sont pas : par exemple r s r⁻¹ = r s r² = r · r⁻² s = r²s ∉ {e ; s}.'},
  {h:'Compter les distingués',p:'<i>D</i>₃ a 6 sous-groupes : {<i>e</i>}, les trois sous-groupes d’ordre 2, {<i>e</i> ; <i>r</i> ; <i>r</i>²} et <i>D</i>₃. Combien sont distingués&nbsp;?',lab:'nombre :',ans:3,
   why:'{e} et D₃ sont toujours distingués (geg⁻¹ = e, et gGg⁻¹ = G). On ajoute {e ; r ; r²}, d’indice 2. Les trois sous-groupes d’ordre 2 ne le sont pas. Total : 3.'},
  {h:'Calculer avec des classes',p:`<p>Dans ℤ/12ℤ, on calcule avec des heures. Plus généralement, on aimerait calculer avec les classes <i>gH</i> elles-mêmes, comme si chacune était un seul objet. L’idée naturelle est de multiplier des représentants.</p><div class="def"><p>On note <i>G</i>/<i>H</i> (lu « <i>G</i> sur <i>H</i> ») l’ensemble des classes à gauche <i>gH</i>. Un élément <i>g</i> de la classe <i>gH</i> en est un <b>représentant</b>. On voudrait poser</p><div class="formula">(<i>gH</i>)(<i>kH</i>) = (<i>gk</i>)<i>H</i>.</div></div><div class="idea"><p>Une classe a plusieurs représentants : <i>gH</i> = (<i>gh</i>)<i>H</i> pour tout <i>h</i> ∈ <i>H</i>. La formule n’a de sens que si le résultat ne dépend pas des représentants choisis. On dit alors que la loi est <b>bien définie</b>.</p></div><div class="thm"><p>Si <i>H</i> ⊲ <i>G</i>, la loi (<i>gH</i>)(<i>kH</i>) = (<i>gk</i>)<i>H</i> est bien définie.</p></div><div class="why"><p>Remplace <i>g</i> par <i>g</i>′ = <i>gh</i> et <i>k</i> par <i>k</i>′ = <i>kh</i>′, avec <i>h</i>, <i>h</i>′ ∈ <i>H</i>. En glissant <i>kk</i>⁻¹ : <i>g</i>′<i>k</i>′ = <i>ghkh</i>′ = <i>gk</i>(<i>k</i>⁻¹<i>hk</i>)<i>h</i>′. Or <i>k</i>⁻¹<i>hk</i> ∈ <i>H</i> <b>parce que <i>H</i> est distingué</b>, donc (<i>k</i>⁻¹<i>hk</i>)<i>h</i>′ ∈ <i>H</i>, et (<i>g</i>′<i>k</i>′)<i>H</i> = (<i>gk</i>)<i>H</i>.</p></div>`,
  },
  {kind:'Méthode',h:'Tester si une loi sur les classes est bien définie',
   p:'<b>Quand :</b> on veut calculer avec des classes et on doute que <i>H</i> soit distingué. <b>Comment :</b> choisis deux classes, prends <b>deux représentants différents</b> de chacune, calcule les produits et regarde dans quelle classe ils tombent. Si on obtient deux classes différentes, la « loi » n’a pas de sens. <b>Pourquoi :</b> une opération sur les classes doit donner un résultat qui ne dépend que des classes, pas du nom qu’on donne à leurs éléments.',
   demo:{enonce:'Dans <i>D</i>₃ avec <i>H</i> = {<i>e</i> ; <i>s</i>} : les classes à gauche sont <i>H</i>, <i>rH</i> = {<i>r</i> ; <i>rs</i>} et <i>r</i>²<i>H</i> = {<i>r</i>² ; <i>r</i>²<i>s</i>}. Peut-on définir (<i>rH</i>)(<i>rH</i>)&nbsp;?',
    etapes:[{f:'Avec les représentants <i>r</i> et <i>r</i> : <i>r</i> · <i>r</i> = <i>r</i>² ∈ <i>r</i>²<i>H</i>.',w:'Premier choix de représentants.'},
     {f:'Avec <i>rs</i> et <i>rs</i> : <i>rs</i> · <i>rs</i> = <i>r</i> (<i>s r</i>) <i>s</i> = <i>r</i> · <i>r</i>²<i>s</i> · <i>s</i> = <i>r</i>³<i>s</i>² = <i>e</i> ∈ <i>H</i>.',w:'Deuxième choix : on simplifie avec s r = r²s.'},
     {f:'<i>r</i>²<i>H</i> ≠ <i>H</i>.',w:'Les deux calculs ne tombent pas dans la même classe.'}],
    conclusion:'La loi n’est pas bien définie : <i>D</i>₃/{<i>e</i> ; <i>s</i>} n’est pas un groupe. C’est exactement parce que {<i>e</i> ; <i>s</i>} n’est pas distingué.'}},
  {h:'Un autre choix de représentants',p:'Toujours avec <i>H</i> = {<i>e</i> ; <i>s</i>} dans <i>D</i>₃. Dans quelle classe tombe le produit <i>rs</i> · <i>r</i> (représentants <i>rs</i> de <i>rH</i> et <i>r</i> de <i>rH</i>)&nbsp;?',
   opts:['<i>rH</i>','<i>r</i>²<i>H</i>','<i>H</i>'],ans:2,
   why:'rs · r = r (s r) = r · r²s = r³s = s, et s ∈ H. Avec les représentants r et r, on trouvait r²H : encore une preuve que la loi dépend des représentants.'},
  {h:'Le groupe quotient G/H',p:`<p>Une fois la loi bien définie, il reste à vérifier les axiomes de groupe. Tout se ramène à des calculs dans <i>G</i>, sur les représentants.</p>
  <div class="thm"><p>Si <i>H</i> ⊲ <i>G</i>, l’ensemble <i>G</i>/<i>H</i> muni de (<i>gH</i>)(<i>kH</i>) = (<i>gk</i>)<i>H</i> est un groupe, appelé <b>groupe quotient</b> de <i>G</i> par <i>H</i>. Son neutre est la classe <i>eH</i> = <i>H</i>, et (<i>gH</i>)⁻¹ = <i>g</i>⁻¹<i>H</i>. Si <i>G</i> est fini, |<i>G</i>/<i>H</i>| = |<i>G</i>|/|<i>H</i>|.</p></div>
  <div class="why"><p>Associativité : ((<i>gH</i>)(<i>kH</i>))(<i>lH</i>) = ((<i>gk</i>)<i>l</i>)<i>H</i> = (<i>g</i>(<i>kl</i>))<i>H</i> = (<i>gH</i>)((<i>kH</i>)(<i>lH</i>)), car la loi de <i>G</i> est associative. Neutre : (<i>eH</i>)(<i>gH</i>) = (<i>eg</i>)<i>H</i> = <i>gH</i>, et de même à droite. Inverse : (<i>gH</i>)(<i>g</i>⁻¹<i>H</i>) = (<i>gg</i>⁻¹)<i>H</i> = <i>H</i>. Le cardinal vient de Lagrange : il y a |<i>G</i>|/|<i>H</i>| classes.</p></div>
  <div class="ex"><p>Dans ℤ/12ℤ avec <i>H</i> = {0 ; 3 ; 6 ; 9}, le quotient a 12/4 = 3 éléments : <i>H</i>, 1 + <i>H</i> et 2 + <i>H</i>. Par exemple (2 + <i>H</i>) + (2 + <i>H</i>) = 4 + <i>H</i> = 1 + <i>H</i>, car 4 − 1 = 3 ∈ <i>H</i>. Ce quotient se comporte comme ℤ/3ℤ.</p></div>
  <div class="warn"><p>Un élément de <i>G</i>/<i>H</i> est un <b>ensemble</b> d’éléments de <i>G</i>. Le noter par un représentant est commode, mais 1 + <i>H</i> et 4 + <i>H</i> désignent le même élément du quotient.</p></div>`},
  {h:'Contracter les classes',p:`<p>Le quotient se voit très bien sur une horloge. Dans ℤ/12ℤ, qui est commutatif, tout sous-groupe est distingué : on peut quotienter par n’importe lequel.</p><div class="idea"><p>Prends <i>H</i> = ⟨<i>d</i>⟩. Vue « classes » : chaque couleur est une classe <i>x</i> + <i>H</i>, et tous les points d’une même couleur deviennent une seule chose pour le quotient. Vue « quotient » : chaque classe est <b>contractée</b> en un point, et on additionne ces points en additionnant des représentants. On obtient une horloge plus petite.</p></div><div class="prop"><p>(ℤ/12ℤ)/⟨<i>d</i>⟩ a pgcd(<i>d</i> ; 12) éléments, et il tourne comme l’horloge ℤ/pgcd(<i>d</i> ; 12)ℤ.</p></div><div class="why"><p>⟨<i>d</i>⟩ = ⟨pgcd(<i>d</i> ; 12)⟩ a 12/pgcd(<i>d</i> ; 12) éléments ; par Lagrange, il y a donc pgcd(<i>d</i> ; 12) classes. Elles sont représentées par 0, 1, …, pgcd(<i>d</i> ; 12) − 1, et ajouter 1 les parcourt dans l’ordre.</p></div><div class="ex"><p>Avec <i>d</i> = 3 : <i>H</i> = {0 ; 3 ; 6 ; 9} et 3 classes, 0 + <i>H</i>, 1 + <i>H</i>, 2 + <i>H</i>. Avec <i>d</i> = 5 : pgcd(5 ; 12) = 1, <i>H</i> est tout le groupe et le quotient n’a qu’un point.</p></div>`,
   params:[{id:'d',l:'d',min:1,max:11,v:3},{id:'q',l:'Vue : 0 = classes, 1 = quotient',min:0,max:1,v:0}],
   draw:v=>cosetFig(v.d,v.q),
   info:v=>{ const m=gcd(v.d,12), H=[]; for(let i=0;i<12;i+=m) H.push(i); return `H = ⟨${v.d}⟩ = {${H.join(' ; ')}}, ${H.length} élément${H.length>1?'s':''}. Le quotient a <b>${m}</b> classe${m>1?'s':''} : ${Array.from({length:m},(_,i)=>i+' + H').join(', ')}.`; },
   note:'De même, ℤ/nℤ est le quotient du groupe (ℤ, +) par son sous-groupe nℤ : la classe de x est x + nℤ, et on additionne les classes en additionnant des représentants. Le nom ℤ/nℤ est donc la notation du quotient.'},
  {kind:'Pratique',h:'Un quotient à 4 éléments',p:'Règle <i>d</i> pour que (ℤ/12ℤ)/⟨<i>d</i>⟩ ait exactement 4 éléments.',
   params:[{id:'d',l:'d',min:1,max:11,v:1},{id:'q',l:'Vue : 0 = classes, 1 = quotient',min:0,max:1,v:1}],
   draw:v=>cosetFig(v.d,v.q),
   ok:v=>gcd(v.d,12)===4,
   why:'Le quotient a 12/card(H) éléments. Il en faut 4, donc card H = 3 : H = {0 ; 4 ; 8}, engendré par d = 4 ou d = 8.'},
  {h:'Additionner deux classes',p:'Dans (ℤ/12ℤ)/<i>H</i> avec <i>H</i> = {0 ; 4 ; 8}, on représente chaque classe par un nombre de {0 ; 1 ; 2 ; 3}. Calcule (5 + <i>H</i>) + (10 + <i>H</i>) = <i>c</i> + <i>H</i> : combien vaut <i>c</i>&nbsp;?',lab:'c =',ans:3,
   why:'(5 + H) + (10 + H) = 15 + H, et 15 ≡ 3 (mod 12). Comme 3 ∈ {0 ; 1 ; 2 ; 3}, c = 3. On pouvait aussi réduire d’abord : 5 ∈ 1 + H et 10 ∈ 2 + H, puis 1 + 2 = 3.'},
  {h:'La surjection canonique',p:`<p>Former le quotient, c’est oublier une partie de l’information : on ne distingue plus deux éléments d’une même classe. Cet oubli est lui-même un homomorphisme.</p><div class="def"><p>Pour <i>H</i> ⊲ <i>G</i>, la <b>surjection canonique</b> est <b>π : <i>G</i> → <i>G</i>/<i>H</i>, <i>g</i> ↦ <i>gH</i></b> : elle envoie chaque élément sur sa classe.</p></div><div class="prop"><p>π est un homomorphisme surjectif, et <b>ker π = <i>H</i></b>.</p></div><div class="why"><p>Homomorphisme : π(<i>gk</i>) = (<i>gk</i>)<i>H</i> = (<i>gH</i>)(<i>kH</i>) = π(<i>g</i>)π(<i>k</i>), c’est la définition même de la loi du quotient. Surjectif : la classe <i>gH</i> est l’image de <i>g</i>. Noyau : le neutre du quotient est <i>H</i>, et <i>gH</i> = <i>H</i> ⇔ <i>g</i> ∈ <i>H</i>.</p></div><div class="ex"><p>La parité est la surjection canonique ℤ → ℤ/2ℤ : elle envoie 17 sur 1 + 2ℤ, la classe des impairs, et son noyau est 2ℤ.</p></div><div class="thm"><p>Avec l’étape sur le noyau, on obtient : <b>les sous-groupes distingués de <i>G</i> sont exactement les noyaux des homomorphismes définis sur <i>G</i></b>. Un noyau est distingué, et un sous-groupe distingué <i>H</i> est le noyau de π.</p></div>`,
  },
  {h:'Le premier théorème d’isomorphisme',p:`<p>Un homomorphisme <i>f</i> écrase des éléments (ceux qui ont la même image) et ne couvre pas forcément tout <i>G</i>′. Le théorème suivant dit qu’en corrigeant ces deux défauts, on obtient un isomorphisme.</p><div class="thm"><p>Soit <i>f</i> : <i>G</i> → <i>G</i>′ un homomorphisme, de noyau <i>K</i> = ker <i>f</i>. Alors</p><div class="formula"><i>G</i>/ker <i>f</i> ≅ Im <i>f</i>, &nbsp;par <i>f̄</i>(<i>gK</i>) = <i>f</i>(<i>g</i>).</div><p>Si <i>G</i> est fini : <b>|<i>G</i>| = |ker <i>f</i>| × |Im <i>f</i>|</b>.</p></div><div class="why"><p>Deux éléments ont la même image exactement quand ils sont dans la même classe de <i>K</i> (l’exercice suivant te le fait justifier). Lu dans un sens, cela dit que <i>f̄</i> est bien définie ; dans l’autre, qu’elle est injective. Elle est surjective sur Im <i>f</i> par construction, et c’est un homomorphisme car <i>f̄</i>((<i>gK</i>)(<i>kK</i>)) = <i>f</i>(<i>gk</i>) = <i>f</i>(<i>g</i>)<i>f</i>(<i>k</i>). Le cardinal découle de |<i>G</i>/<i>K</i>| = |<i>G</i>|/|<i>K</i>|.</p></div><div class="idea"><p><i>f</i> se <b>factorise</b> en <i>f</i> = <i>i</i> ∘ <i>f̄</i> ∘ π : π écrase chaque classe en un point, <i>f̄</i> envoie bijectivement les classes sur l’image, puis l’inclusion <i>i</i> plonge l’image dans <i>G</i>′.</p></div><div class="ex"><p><i>f</i> : ℤ/12ℤ → ℤ/12ℤ, <i>x</i> ↦ 3<i>x</i>, a pour noyau {0 ; 4 ; 8} et pour image {0 ; 3 ; 6 ; 9} : 12 = 3 × 4, et le quotient par le noyau, à 4 éléments, est isomorphe à l’image.</p></div>`,
   note:'C’est l’explication du produit égal à 12 que tu as observé sur la figure x ↦ kx de ℤ/12ℤ.'},
  {h:'Pourquoi f̄ est bien définie',p:'Pour que <i>f̄</i>(<i>gK</i>) = <i>f</i>(<i>g</i>) ait un sens, il faut que deux représentants d’une même classe aient la même image. Quel argument le prouve&nbsp;?',
   opts:['Si <i>gK</i> = <i>g</i>′<i>K</i>, alors <i>g</i>⁻¹<i>g</i>′ ∈ <i>K</i>, donc <i>f</i>(<i>g</i>)⁻¹<i>f</i>(<i>g</i>′) = <i>f</i>(<i>g</i>⁻¹<i>g</i>′) = <i>e</i>′ et <i>f</i>(<i>g</i>′) = <i>f</i>(<i>g</i>)','<i>f</i> est injective, donc <i>f</i>(<i>g</i>) = <i>f</i>(<i>g</i>′)','<i>K</i> contient <i>e</i>','Il suffit de le vérifier pour <i>g</i> = <i>e</i>'],ans:0,
   why:'Deux éléments sont dans la même classe à gauche ssi g⁻¹g′ ∈ K. On applique f : f(g⁻¹g′) = e′ donne f(g′) = f(g). La même équivalence, lue à l’envers, montre que f̄ est injective. f, elle, n’est pas supposée injective.'},
  {h:'ℝ/ℤ, c’est le cercle',p:`<p>Le premier théorème permet d’identifier des quotients infinis, impossibles à dessiner par une table. L’exemple le plus célèbre enroule la droite réelle sur un cercle.</p><div class="def"><p>Soit <i>f</i> : (ℝ, +) → (rotations du plan autour d’un point, ∘), qui envoie <i>x</i> sur la rotation d’angle 360°·<i>x</i>.</p></div><div class="why"><p>Composer deux rotations additionne les angles : <i>f</i>(<i>x</i> + <i>y</i>) = <i>f</i>(<i>x</i>) ∘ <i>f</i>(<i>y</i>), c’est un homomorphisme. Toute rotation est atteinte : l’image est le groupe de toutes les rotations, qu’on représente par un cercle (chaque rotation correspond au point où elle envoie un point de départ fixé). Noyau : la rotation d’angle 360°·<i>x</i> est l’identité si et seulement si <i>x</i> est entier, donc ker <i>f</i> = ℤ.</p></div><div class="thm"><p>Par le premier théorème d’isomorphisme, <b>ℝ/ℤ ≅ cercle</b>.</p></div><div class="ex"><p>Pour <i>x</i> = 0,3, la rotation est de 108° ; pour <i>x</i> = 1,3 ou <i>x</i> = −0,7, elle est de 468° ou de −252°, soit encore 108°. Les trois nombres sont dans la même classe 0,3 + ℤ. Bouge <i>x</i> : tous les <i>x</i> + <i>k</i> (en orange) donnent le même point.</p></div>`,
   params:[{id:'x',l:'x',min:-2,max:2,step:0.1,v:0.3}],
   draw:v=>circFig(v.x),
   info:v=>{ const fr=((v.x%1)+1)%1; return `f(x) = rotation de ${fmt(v.x*360,0)}°, c’est-à-dire de ${fmt(fr*360,0)}° : même image pour toute la classe x + ℤ.`; },
   note:'C’est pourquoi on dit qu’on « enroule » la droite réelle sur le cercle. Une fonction 1-périodique sur ℝ, c’est une fonction sur ℝ/ℤ.'},
  {kind:'Méthode',h:'Identifier un quotient grâce au premier théorème',
   p:'<b>Quand :</b> on te demande « à quoi ressemble <i>G</i>/<i>H</i> ». <b>Comment :</b> 1) cherche un homomorphisme <i>f</i> défini sur <i>G</i>, dont tu sais calculer l’image ; 2) vérifie que ker <i>f</i> = <i>H</i> ; 3) conclus <i>G</i>/<i>H</i> ≅ Im <i>f</i>. Si <i>f</i> est surjectif, Im <i>f</i> = <i>G</i>′. <b>Pourquoi :</b> c’est exactement le premier théorème d’isomorphisme, qui évite de construire à la main la loi du quotient.',
   demo:{enonce:'Identifie (ℤ/12ℤ)/⟨4⟩, puis ℝ*/{−1 ; 1}.',
    etapes:[{f:'<i>f</i> : ℤ/12ℤ → ℤ/4ℤ, <i>x</i> ↦ <i>x</i> mod 4. Bien défini car 12·1 ≡ 0 (mod 4).',w:'Condition des homomorphismes depuis ℤ/nℤ, avec a = 1.'},
     {f:'<i>f</i> est surjectif (0, 1, 2, 3 sont atteints) et ker <i>f</i> = {0 ; 4 ; 8} = ⟨4⟩.',w:'x mod 4 = 0 ⇔ x multiple de 4.'},
     {f:'Donc (ℤ/12ℤ)/⟨4⟩ ≅ ℤ/4ℤ.',w:'Premier théorème d’isomorphisme. Contrôle : 12/3 = 4 éléments.'},
     {f:'<i>g</i> : (ℝ*, ·) → (ℝ*₊, ·), <i>x</i> ↦ |<i>x</i>| : surjectif, de noyau {−1 ; 1}. Donc ℝ*/{−1 ; 1} ≅ ℝ*₊.',w:'Même démarche : on « oublie » le signe.'}],
    conclusion:'Le quotient se reconnaît sans calcul de table : il suffit d’un homomorphisme bien choisi.'}},
  {h:'Le cardinal du noyau',p:'Un groupe <i>G</i> à 24 éléments possède un homomorphisme surjectif vers un groupe à 6 éléments. Combien d’éléments a son noyau&nbsp;?',lab:'card(ker f) =',ans:4,
   why:'card G = card(ker f) × card(Im f), et Im f a 6 éléments (surjectif). Donc card(ker f) = 24/6 = 4.'},
  {h:'Quotient par les positifs',p:'À quel groupe le quotient (ℝ*, ·)/ℝ*₊ est-il isomorphe&nbsp;?',
   opts:['ℝ*₊','ℤ/2ℤ (ou {1 ; −1})','ℝ','{1}'],ans:1,
   why:'L’homomorphisme signe : ℝ* → {1 ; −1} est surjectif, de noyau ℝ*₊. Donc ℝ*/ℝ*₊ ≅ {1 ; −1} ≅ ℤ/2ℤ : il n’y a que deux classes, les positifs et les négatifs.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : sous-groupes distingués et quotients',p:`<div class="keep"><ul>
  <li>Classes à gauche <i>gH</i>, à droite <i>Hg</i> ; elles coïncident dans un groupe commutatif. Dans <i>D</i>₃ : <i>s r</i>ᵏ = <i>r</i>⁻ᵏ<i>s</i>.</li>
  <li>Conjugué de <i>h</i> par <i>g</i> : <i>ghg</i>⁻¹. <i>gH</i> = <i>Hg</i> ⇔ <i>gHg</i>⁻¹ = <i>H</i>.</li>
  <li><i>H</i> ⊲ <i>G</i> (distingué) : <i>gHg</i>⁻¹ = <i>H</i> pour tout <i>g</i> ; il suffit que <i>ghg</i>⁻¹ ∈ <i>H</i> pour tous <i>g</i> ∈ <i>G</i>, <i>h</i> ∈ <i>H</i>.</li>
  <li>Toujours distingués : {<i>e</i>}, <i>G</i>, tout sous-groupe d’un groupe commutatif, tout noyau, tout sous-groupe d’indice 2.</li>
  <li>Loi sur <i>G</i>/<i>H</i> : (<i>gH</i>)(<i>kH</i>) = (<i>gk</i>)<i>H</i>, bien définie quand <i>H</i> ⊲ <i>G</i>. Test : deux choix de représentants qui tombent dans deux classes différentes ⇒ loi mal définie.</li>
  <li>Groupe quotient : neutre <i>H</i>, (<i>gH</i>)⁻¹ = <i>g</i>⁻¹<i>H</i>, |<i>G</i>/<i>H</i>| = |<i>G</i>|/|<i>H</i>|. (ℤ/12ℤ)/⟨<i>d</i>⟩ a pgcd(<i>d</i> ; 12) éléments.</li>
  <li>Surjection canonique π : <i>g</i> ↦ <i>gH</i>, homomorphisme surjectif de noyau <i>H</i>. Sous-groupes distingués = noyaux.</li>
  <li>Premier théorème : <i>G</i>/ker <i>f</i> ≅ Im <i>f</i> et |<i>G</i>| = |ker <i>f</i>| × |Im <i>f</i>|. Pour identifier <i>G</i>/<i>H</i> : trouver un homomorphisme surjectif de noyau <i>H</i>.</li>
  <li>Exemples : ℝ/ℤ ≅ cercle ; ℝ*/ℝ*₊ ≅ {1 ; −1} ; ℤ/<i>n</i>ℤ est le quotient de ℤ par <i>n</i>ℤ.</li>
  </ul></div>`},
  {kind:'Problème',h:'De ℤ/18ℤ vers ℤ/12ℤ',
   p:'On considère <i>f</i> : ℤ/18ℤ → ℤ/12ℤ, <i>x</i> ↦ 2<i>x</i> mod 12. On veut vérifier que c’est un homomorphisme, calculer son noyau et son image, puis identifier le quotient de ℤ/18ℤ par ce noyau.',
   parts:[
    {q:'a) Pourquoi <i>f</i> est-il bien défini&nbsp;?',opts:['Parce que 2 divise 12','Parce que 18 · 2 = 36 ≡ 0 (mod 12) : x et x + 18 ont la même image','Parce que 18 > 12','Parce que ℤ/12ℤ est commutatif'],ans:1,hint:'Condition des homomorphismes depuis ℤ/nℤ : n·f(1) = 0.',why:'Avec a = f(1) = 2 et n = 18, il faut 18a ≡ 0 (mod 12) : 36 = 3 × 12. Alors f(x + 18) = 2x + 36 ≡ 2x.'},
    {q:'b) Combien d’éléments a ker <i>f</i>&nbsp;?',lab:'card(ker f) =',ans:3,hint:'Résous 2x ≡ 0 (mod 12) pour x ∈ {0, …, 17}.',why:'2x ≡ 0 (mod 12) ⇔ x ≡ 0 (mod 6) : ker f = {0 ; 6 ; 12}.'},
    {q:'c) Combien d’éléments a Im <i>f</i>&nbsp;?',lab:'card(Im f) =',ans:6,hint:'Utilise card G = card(ker f) × card(Im f), puis contrôle.',why:'18/3 = 6. En effet Im f = {0 ; 2 ; 4 ; 6 ; 8 ; 10}.'},
    {q:'d) À quel groupe (ℤ/18ℤ)/⟨6⟩ est-il isomorphe&nbsp;?',opts:['ℤ/3ℤ','ℤ/12ℤ','ℤ/6ℤ','ℤ/18ℤ'],ans:2,hint:'⟨6⟩ est le noyau de f. Que vaut l’image, et quelle est sa structure&nbsp;?',why:'ker f = ⟨6⟩, donc (ℤ/18ℤ)/⟨6⟩ ≅ Im f = {0 ; 2 ; … ; 10}, un groupe cyclique à 6 éléments engendré par 2 : il est isomorphe à ℤ/6ℤ.'},
   ],
   sol:'f est bien défini car 18 · 2 = 36 ≡ 0 (mod 12), et f(x + y) = 2x + 2y = f(x) + f(y) : c’est un homomorphisme.<br>ker f = {x : 2x ≡ 0 (mod 12)} = {x : x ≡ 0 (mod 6)} = {0 ; 6 ; 12} = ⟨6⟩.<br>Im f = {0 ; 2 ; 4 ; 6 ; 8 ; 10}, 6 éléments, et 3 × 6 = 18 comme prévu.<br>Par le premier théorème d’isomorphisme, (ℤ/18ℤ)/⟨6⟩ ≅ Im f. Ce dernier est cyclique d’ordre 6 (engendré par 2), donc isomorphe à ℤ/6ℤ par k ↦ 2k.'},
  {kind:'Problème',h:'D₃ et ses quotients',
   p:'Dans <i>D</i>₃ = {<i>e</i> ; <i>r</i> ; <i>r</i>² ; <i>s</i> ; <i>rs</i> ; <i>r</i>²<i>s</i>}, avec <i>r</i>³ = <i>e</i>, <i>s</i>² = <i>e</i> et <i>s r</i> = <i>r</i>²<i>s</i>, on compare deux sous-groupes : <i>R</i> = {<i>e</i> ; <i>r</i> ; <i>r</i>²} et <i>H</i> = {<i>e</i> ; <i>s</i>}. L’un permet de former un groupe quotient, l’autre non. On construit enfin un homomorphisme qui réalise le quotient.',
   parts:[
    {q:'a) Combien la partition de <i>D</i>₃ en classes à gauche de <i>R</i> a-t-elle de classes&nbsp;?',lab:'nombre :',ans:2,hint:'Lagrange.',why:'6/3 = 2 : R et {s ; rs ; r²s}.'},
    {q:'b) Avec <i>H</i> = {<i>e</i> ; <i>s</i>}, dans quelle classe tombe <i>rs</i> · <i>rs</i>&nbsp;?',opts:['rH = {r ; rs}','r²H = {r² ; r²s}','H = {e ; s}'],ans:2,hint:'Fais passer s à droite de r avec s r = r²s.',why:'rs · rs = r(sr)s = r · r²s · s = r³s² = e ∈ H. Or r · r = r² ∈ r²H : la loi sur D₃/H dépend des représentants, ce n’est pas un groupe.'},
    {q:'c) Pourquoi la loi sur <i>D</i>₃/<i>R</i> est-elle bien définie&nbsp;?',opts:['Parce que R est commutatif','Parce que R est d’indice 2, donc distingué : gR = Rg pour tout g','Parce que R contient e','Parce que D₃ est commutatif'],ans:1,hint:'Quelle propriété de R permet de calculer avec ses classes&nbsp;?',why:'Un sous-groupe d’indice 2 est distingué, et la loi (gR)(kR) = (gk)R est bien définie exactement quand le sous-groupe est distingué. D₃ n’est pas commutatif, et R commutatif ne suffirait pas.'},
    {q:'d) Il existe un homomorphisme ε : <i>D</i>₃ → ({1 ; −1}, ·) de noyau <i>R</i> (les rotations vont sur 1). Combien vaut ε(<i>rs</i>)&nbsp;?',lab:'ε(rs) =',ans:-1,hint:'rs n’est pas dans le noyau, et l’arrivée n’a que deux éléments.',why:'ε(rs) = ε(r)ε(s) = 1 · ε(s). Comme s ∉ R = ker ε, ε(s) ≠ 1, donc ε(s) = −1 et ε(rs) = −1.'},
    {q:'e) Par le premier théorème d’isomorphisme, à quoi <i>D</i>₃/<i>R</i> est-il isomorphe&nbsp;?',opts:['D₃','ℤ/3ℤ','ℤ/2ℤ','{e}'],ans:2,hint:'Quelle est l’image de ε&nbsp;?',why:'ε est surjectif (ε(e) = 1, ε(s) = −1) et ker ε = R, donc D₃/R ≅ {1 ; −1} ≅ ℤ/2ℤ.'},
   ],
   sol:'R = {e ; r ; r²} a 2 classes dans D₃ (6/3 = 2) : R et {s ; rs ; r²s}. Étant d’indice 2, R est distingué et D₃/R est un groupe à 2 éléments.<br>H = {e ; s} n’est pas distingué : avec les représentants r et r de rH, on obtient r² ∈ r²H, alors qu’avec rs et rs on obtient rs · rs = r³s² = e ∈ H. La loi dépend des représentants.<br>L’homomorphisme ε envoie les rotations sur 1 et les symétries sur −1 : ε(rs) = ε(r)ε(s) = −1. Il est surjectif de noyau R.<br>Le premier théorème donne D₃/R ≅ {1 ; −1} ≅ ℤ/2ℤ : on ne retient d’un élément de D₃ que « rotation ou symétrie ».'},
]},

/* ===================== 3. PERMUTATIONS ===================== */
{subj:'gred',sem:'grp',id:'gred-permutations',h:'Le groupe des permutations',p:'Sₙ, cycles, transpositions et signature : la parité d’une permutation, jusqu’au taquin impossible.',steps:[
  {h:'Des fils qui se croisent',p:`<p>Mélanger un jeu de cartes, réordonner une liste, échanger des places : toutes ces opérations sont des <b>permutations</b>. Elles forment des groupes finis très importants ; on peut même montrer que tout groupe fini se cache dans l’un d’eux.</p><div class="def"><p>Une <b>permutation</b> de {1, …, <i>n</i>} est une bijection de cet ensemble dans lui-même. On l’écrit en <b>deux lignes</b> : en haut 1, …, <i>n</i>, en bas leurs images. Par exemple σ = ${L2([3,1,4,2])} envoie 1 sur 3, 2 sur 1, 3 sur 4 et 4 sur 2.</p></div><div class="idea"><p>On la dessine avec des fils : le fil parti de <i>i</i> en haut arrive sur σ(<i>i</i>) en bas. Être une bijection, c’est avoir <b>exactement un fil</b> qui arrive sur chaque nombre du bas. La ligne du bas contient donc chaque nombre une fois et une seule.</p></div><div class="ex"><p>Choisis les images avec les curseurs. Si deux fils arrivent au même endroit, ils deviennent rouges : ce n’est plus une permutation. Les points noirs marquent les croisements de fils, qu’on apprendra à compter plus loin.</p></div>`,
   params:[{id:'a',l:'σ(1)',min:1,max:4,v:3},{id:'b',l:'σ(2)',min:1,max:4,v:1},{id:'c',l:'σ(3)',min:1,max:4,v:4},{id:'d',l:'σ(4)',min:1,max:4,v:2}],
   draw:v=>fils([v.a,v.b,v.c,v.d]),
   info:v=>{ const b=[v.a,v.b,v.c,v.d]; return new Set(b).size<4?'Ce n’est pas une permutation : deux fils arrivent au même endroit.':`Permutation ${b.join(' ')} : <b>${ninv(b)}</b> croisement${ninv(b)>1?'s':''} de fils (points noirs).`; },
   note:'L’ensemble des permutations de {1, …, n}, muni de la composition, est un groupe : le <b>groupe symétrique</b> Sₙ. Son neutre est l’identité id, où aucun fil ne se croise.'},
  {h:'Composer : dans quel ordre&nbsp;?',p:`<p>Faire une permutation puis une autre donne une troisième permutation. Mais laquelle écrit-on à gauche ? Il faut une convention, et s’y tenir.</p><div class="def"><p>Dans tout ce chapitre, <b>στ = σ ∘ τ</b> : on applique <b>τ d’abord</b>, puis σ. Ainsi</p><div class="formula">(στ)(<i>i</i>) = σ(τ(<i>i</i>)).</div></div><div class="idea"><p>C’est la convention des fonctions : dans σ(τ(<i>i</i>)), la fonction la plus proche de <i>i</i> agit la première. Sur les fils, on pose le dessin de τ au-dessus de celui de σ, et on suit chaque fil de haut en bas à travers les deux étages.</p></div><div class="ex"><p>Dans S₃, prends σ qui échange 1 et 2, et τ qui échange 2 et 3. (στ)(1) = σ(τ(1)) = σ(1) = 2 ; (στ)(2) = σ(3) = 3 ; (στ)(3) = σ(2) = 1. Dans l’autre ordre, (τσ)(1) = τ(σ(1)) = τ(2) = 3. Donc στ ≠ τσ.</p></div><div class="warn"><p>Le groupe Sₙ n’est pas commutatif dès que <i>n</i> ≥ 3. Certains livres utilisent la convention inverse (σ d’abord) : vérifie toujours la convention d’un texte avant de calculer.</p></div>`,
  },
  {kind:'Méthode',h:'Composer deux permutations en deux lignes',
   p:'<b>Comment :</b> pour chaque <i>i</i> de 1 à <i>n</i>, lis <i>j</i> = τ(<i>i</i>) dans τ, puis σ(<i>j</i>) dans σ, et écris le résultat sous <i>i</i>. <b>Contrôle :</b> la ligne du bas doit contenir chaque nombre une seule fois. <b>Pourquoi :</b> c’est la définition de la composée, une case à la fois.',
   demo:{enonce:`Avec σ = ${L2([2,3,1,4])} et τ = ${L2([1,4,2,3])}, calcule στ et τσ.`,
    etapes:[{f:'στ(1) = σ(τ(1)) = σ(1) = 2 ; στ(2) = σ(4) = 4 ; στ(3) = σ(2) = 3 ; στ(4) = σ(3) = 1.',w:'On applique τ, puis σ.'},
     {f:`στ = ${L2([2,4,3,1])}.`,w:'Chaque nombre apparaît une fois en bas : c’est bien une permutation.'},
     {f:'τσ(1) = τ(σ(1)) = τ(2) = 4 ; τσ(2) = τ(3) = 2 ; τσ(3) = τ(1) = 1 ; τσ(4) = τ(4) = 3.',w:'Cette fois σ d’abord, puis τ.'},
     {f:`τσ = ${L2([4,2,1,3])} ≠ στ.`,w:'On compare.'}],
    conclusion:'L’ordre compte : στ et τσ sont deux permutations différentes.'}},
  {h:'À toi de composer',p:`σ = ${L2([3,1,4,2])} et τ = ${L2([2,1,4,3])}. Que vaut στ (τ d’abord)&nbsp;?`,
   opts:[L2([4,2,3,1]),L2([3,2,4,1]),L2([1,3,2,4]),L2([2,3,1,4])],ans:2,
   why:'στ(1) = σ(2) = 1, στ(2) = σ(1) = 3, στ(3) = σ(4) = 2, στ(4) = σ(3) = 4. La première option est τσ : c’est l’erreur d’ordre classique.'},
  {h:'Combien de permutations&nbsp;?',p:`<p>Combien y a-t-il de façons de ranger <i>n</i> objets ? C’est le nombre d’éléments de Sₙ, et il grandit très vite.</p><div class="prop"><p><b>card Sₙ = <i>n</i>!</b> = 1 · 2 · ⋯ · <i>n</i>.</p></div><div class="why"><p>On fabrique σ image par image. Il y a <i>n</i> choix pour σ(1). Pour σ(2), il faut éviter σ(1) : <i>n</i> − 1 choix. Puis <i>n</i> − 2 pour σ(3), et ainsi de suite jusqu’à un seul choix pour σ(<i>n</i>). Le total est le produit <i>n</i>(<i>n</i> − 1)⋯1.</p></div><div class="ex"><p>S₃ a 6 éléments : ce sont les mouvements du triangle, vus comme permutations des 3 sommets. S₄ en a 24, S₅ en a 120, et S₁₀ en a 3 628 800.</p></div><div class="def"><p>La <b>réciproque</b> σ⁻¹ défait σ : σ⁻¹(<i>j</i>) = <i>i</i> quand σ(<i>i</i>) = <i>j</i>. En deux lignes, on <b>échange les deux lignes</b>, puis on remet la ligne du haut dans l’ordre. Sur les fils, on retourne le dessin.</p></div><div class="ex"><p>Pour σ = ${L2([3,1,4,2])}, échanger les lignes donne 3 ↦ 1, 1 ↦ 2, 4 ↦ 3, 2 ↦ 4, soit σ⁻¹ = ${L2([2,4,1,3])}. Contrôle : σ⁻¹(σ(1)) = σ⁻¹(3) = 1.</p></div>`,
  },
  {h:'Cycles',p:`<p>L’écriture en deux lignes est lourde et cache la structure. Suis plutôt un nombre et ses images successives : 1 → σ(1) → σ²(1) → … On finit par revenir à 1, en décrivant une boucle.</p><div class="def"><p>Soient <i>a</i>₁, …, <i>a</i><sub><i>k</i></sub> des nombres distincts. Le <b>cycle</b> (<i>a</i>₁ <i>a</i>₂ … <i>a</i><sub><i>k</i></sub>) est la permutation qui envoie <i>a</i>₁ sur <i>a</i>₂, <i>a</i>₂ sur <i>a</i>₃, …, <i>a</i><sub><i>k</i></sub> sur <i>a</i>₁, et qui fixe tous les autres nombres. <i>k</i> est sa <b>longueur</b> ; on parle de <i>k</i>-cycle.</p></div><div class="prop"><p>Deux cycles sans élément commun sont dits <b>disjoints</b>, et ils <b>commutent</b>. Toute permutation est un produit de cycles disjoints, de façon unique à l’ordre des facteurs près.</p></div><div class="why"><p>Deux cycles disjoints agissent sur des nombres différents : chacun laisse fixes les nombres de l’autre, donc l’ordre où on les applique ne change rien. Pour la décomposition, les boucles 1 → σ(1) → … ne se chevauchent pas, car un nombre n’a qu’un seul antécédent : chaque boucle donne un cycle.</p></div><div class="ex"><p>Dans S₅, σ = (1 2 3)(4 5) envoie 1 sur 2, 2 sur 3, 3 sur 1, et échange 4 et 5. La figure montre les flèches <i>i</i> → σᵏ(<i>i</i>) : augmente <i>k</i> et regarde quand tout revient en place.</p></div>`,
   params:[{id:'p',l:'σ',min:0,max:3,v:0},{id:'k',l:'puissance k',min:1,max:12,v:1}],
   draw:v=>cycFig(CYC[v.p],v.k),
   info:v=>{ const s=CYC[v.p], t=pw(s,v.k); return `σ = ${cycStr(s)}, σ<sup>${v.k}</sup> = ${cycStr(t)}${cycStr(t)==='id'?' : <b>tout est revenu en place</b>':''}. Ordre de σ : ${ordre(s)}.`; },
   note:'(1 2 3) = (2 3 1) = (3 1 2) : un cycle ne change pas si on fait tourner son écriture. Une petite boucle grise signale un point fixe.'},
  {kind:'Méthode',h:'Décomposer en cycles disjoints',
   p:'<b>Comment :</b> 1) pars du plus petit nombre pas encore utilisé ; 2) suis ses images successives jusqu’à revenir au départ : c’est un cycle ; 3) recommence avec le plus petit nombre restant ; 4) on n’écrit pas les points fixes (cycles de longueur 1). <b>Pourquoi ça s’arrête :</b> l’ensemble est fini et σ est injective, donc la suite <i>a</i>, σ(<i>a</i>), σ²(<i>a</i>), … finit par revenir à <i>a</i> (et pas à un autre terme déjà vu, qui aurait alors deux antécédents).',
   demo:{enonce:`Décompose σ = ${L2([3,5,1,8,7,6,2,4])}.`,
    etapes:[{f:'1 → 3 → 1 : cycle (1 3).',w:'σ(1) = 3, puis σ(3) = 1, on est revenu.'},
     {f:'2 → 5 → 7 → 2 : cycle (2 5 7).',w:'2 est le plus petit nombre non utilisé.'},
     {f:'4 → 8 → 4 : cycle (4 8).',w:'On continue avec 4.'},
     {f:'6 → 6 : point fixe, on ne l’écrit pas.',w:'Tous les nombres de 1 à 8 sont placés.'}],
    conclusion:'σ = (1 3)(2 5 7)(4 8). Ces cycles commutent, donc l’ordre dans lequel on les écrit n’a pas d’importance.'}},
  {h:'Décompose',p:`Quelle est la décomposition en cycles disjoints de σ = ${L2([4,6,1,3,2,5])}&nbsp;?`,
   opts:['(1 4 3)(2 6 5)','(1 4)(2 6)(3 5)','(1 3 4)(2 5 6)','(1 4 3 2 6 5)'],ans:0,
   why:'1 → 4 → 3 → 1 donne (1 4 3), puis 2 → 6 → 5 → 2 donne (2 6 5). La 3e option est σ⁻¹ (les cycles parcourus à l’envers).'},
  {h:'L’ordre d’une permutation',p:`<p>Combien de fois faut-il répéter un mélange pour retrouver l’ordre de départ ? C’est l’ordre de σ dans Sₙ, et la décomposition en cycles le donne presque sans calcul.</p><div class="prop"><p>Un <i>k</i>-cycle est d’ordre <i>k</i>. Si σ = <i>c</i>₁<i>c</i>₂⋯<i>c</i><sub><i>m</i></sub> est un produit de cycles disjoints de longueurs <i>k</i>₁, …, <i>k</i><sub><i>m</i></sub>, alors</p><div class="formula">ordre(σ) = ppcm(<i>k</i>₁, …, <i>k</i><sub><i>m</i></sub>).</div></div><div class="why"><p>Un <i>k</i>-cycle fait avancer chacun de ses nombres d’un cran sur une boucle de longueur <i>k</i> : il faut exactement <i>k</i> pas pour revenir. Comme les cycles disjoints commutent, σᵗ = <i>c</i>₁ᵗ⋯<i>c</i><sub><i>m</i></sub>ᵗ, et ces facteurs agissent sur des nombres différents. Donc σᵗ = id exactement quand chaque <i>c</i><sub><i>j</i></sub>ᵗ = id, c’est-à-dire quand <i>t</i> est un multiple de chaque <i>k</i><sub><i>j</i></sub>. Le plus petit tel <i>t</i> est leur ppcm.</p></div><div class="ex"><p>(1 2 3 4)(5 6) dans S₆ : ppcm(4 ; 2) = 4. Au bout de 4 pas, le 4-cycle est revenu, et la transposition aussi, après deux allers-retours.</p></div><div class="warn"><p>Ce n’est ni la somme ni le produit des longueurs : (1 2)(3 4) est d’ordre ppcm(2 ; 2) = 2, pas 4. Et la formule exige des cycles <b>disjoints</b> : (1 2)(2 3) = (1 2 3) est d’ordre 3, pas 2.</p></div>`,
  },
  {kind:'Pratique',h:'Retour à la case départ',p:'σ = (1 2 3)(4 5). Règle la puissance <i>k</i> sur la plus petite valeur <i>k</i> ≥ 1 telle que σᵏ = id.',
   params:[{id:'k',l:'puissance k',min:1,max:12,v:1}],
   draw:v=>cycFig(CYC[0],v.k),
   info:v=>`σ<sup>${v.k}</sup> = ${cycStr(pw(CYC[0],v.k))}`,
   ok:v=>v.k===6,
   why:'Le 3-cycle revient en place pour k multiple de 3, la transposition pour k pair. Le plus petit k qui fait les deux est ppcm(3, 2) = 6.'},
  {kind:'Défi',h:'Le record de S₅',p:'Quel est le plus grand ordre possible d’un élément de S₅&nbsp;?',lab:'ordre max :',ans:6,
   why:'On découpe 5 en longueurs de cycles : 5 (ordre 5), 4 + 1 (4), 3 + 2 (6), 3 + 1 + 1 (3), 2 + 2 + 1 (2), 2 + 1 + 1 + 1 (2), 1 + … + 1 (1). Le maximum est 6, atteint par (1 2 3)(4 5).'},
  {h:'Transpositions',p:`<p>Parmi les cycles, les plus simples échangent deux nombres et ne touchent pas aux autres. Ils suffisent à tout fabriquer : n’importe quel mélange s’obtient en échangeant des paires, l’une après l’autre.</p><div class="def"><p>Une <b>transposition</b> est un cycle de longueur 2 : (<i>a</i> <i>b</i>) échange <i>a</i> et <i>b</i> et fixe tout le reste. Elle est son propre inverse : (<i>a</i> <i>b</i>)(<i>a</i> <i>b</i>) = id.</p></div><div class="prop"><p>Avec notre convention (le facteur de droite agit d’abord) :</p><div class="formula">(<i>a</i>₁ <i>a</i>₂ … <i>a</i><sub><i>k</i></sub>) = (<i>a</i>₁ <i>a</i>₂)(<i>a</i>₂ <i>a</i>₃)⋯(<i>a</i><sub><i>k</i>−1</sub> <i>a</i><sub><i>k</i></sub>).</div><p>Un <i>k</i>-cycle est donc un produit de <i>k</i> − 1 transpositions.</p></div><div class="why"><p>Vérifie sur (1 2 3) = (1 2)(2 3), en lisant de droite à gauche. 1 : (2 3) le fixe, puis (1 2) l’envoie sur 2. 2 : (2 3) l’envoie sur 3, que (1 2) laisse. 3 : (2 3) l’envoie sur 2, puis (1 2) sur 1. On retrouve 1 → 2 → 3 → 1. Dans le cas général, chaque <i>a</i><sub><i>i</i></sub> n’est touché que par les deux facteurs qui le contiennent, et le calcul est le même.</p></div><div class="ex"><p>(1 4 2 5) = (1 4)(4 2)(2 5) : trois transpositions pour un 4-cycle. Contrôle sur 5 : (2 5) l’envoie sur 2, (4 2) sur 4, (1 4) sur 1, et le cycle envoie bien 5 sur 1.</p></div><div class="warn"><p>Comme toute permutation est un produit de cycles, <b>toute permutation est un produit de transpositions</b>. Mais la décomposition n’est pas unique : (1 2 3) = (1 3)(1 2) aussi. Même le nombre de transpositions peut changer : (1 2)(2 3)(1 2)(1 2) donne encore (1 2 3).</p></div>`,
  },
  {kind:'Méthode',h:'Écrire une permutation comme produit de transpositions',
   p:'<b>Comment :</b> 1) décompose en cycles disjoints ; 2) remplace chaque cycle (<i>a</i>₁ … <i>a</i><sub><i>k</i></sub>) par (<i>a</i>₁ <i>a</i>₂)(<i>a</i>₂ <i>a</i>₃)…(<i>a</i><sub><i>k</i>−1</sub> <i>a</i><sub><i>k</i></sub>) ; 3) contrôle en suivant un ou deux éléments de droite à gauche. Avec <i>c</i> cycles (points fixes compris), on obtient <b><i>n</i> − <i>c</i> transpositions</b>.',
   demo:{enonce:`Écris σ = ${L2([4,6,1,3,2,5])} comme produit de transpositions.`,
    etapes:[{f:'σ = (1 4 3)(2 6 5).',w:'Décomposition en cycles disjoints, vue juste avant.'},
     {f:'(1 4 3) = (1 4)(4 3) et (2 6 5) = (2 6)(6 5).',w:'Règle des transpositions qui se chevauchent.'},
     {f:'σ = (1 4)(4 3)(2 6)(6 5).',w:'On met bout à bout.'},
     {f:'Contrôle : 3 → (6 5) le fixe → (2 6) le fixe → (4 3) l’envoie sur 4 → (1 4) l’envoie sur 1. Et σ(3) = 1 ✓.',w:'On lit de droite à gauche.'}],
    conclusion:'σ est un produit de 4 transpositions : 6 éléments, 2 cycles, 6 − 2 = 4.'}},
  {h:'Inversions et signature',p:`<p>On va attacher à chaque permutation un signe, + ou −, qui dit si elle « mélange un nombre pair ou impair de fois ». Le plus simple est de compter les croisements de fils.</p><div class="def"><p>Une <b>inversion</b> de σ est une paire <i>i</i> &lt; <i>j</i> avec σ(<i>i</i>) &gt; σ(<i>j</i>). La <b>signature</b> de σ est</p><div class="formula">ε(σ) = (−1)<sup>nombre d’inversions</sup>.</div><p>σ est <b>paire</b> si ε(σ) = 1, <b>impaire</b> si ε(σ) = −1.</p></div><div class="idea"><p>Une inversion, c’est une paire de nombres mal rangés. Sur le dessin, c’est exactement <b>un croisement de fils</b> : les fils de <i>i</i> et <i>j</i> se croisent si et seulement si celui qui part à gauche arrive à droite. Une permutation sans inversion range tout dans l’ordre : c’est l’identité, qui est paire.</p></div><div class="ex"><p>σ = ${L2([2,3,1])} : les paires (1 ; 3) et (2 ; 3) sont inversées, car 2 &gt; 1 et 3 &gt; 1, mais pas (1 ; 2). Deux inversions : ε(σ) = 1, σ est paire. La transposition ${L2([2,1,3])} n’a qu’une inversion : elle est impaire.</p></div><div class="warn"><p>On compare des paires de <b>positions</b> <i>i</i> &lt; <i>j</i>, puis leurs images. Il y a <i>n</i>(<i>n</i> − 1)/2 paires en tout, donc au plus autant d’inversions : 3 au maximum dans S₃.</p></div>`,
  },
  {kind:'Méthode',h:'Compter les inversions',
   p:'<b>Comment :</b> dans la ligne du bas, pour chaque nombre, compte les nombres <b>plus petits situés à sa droite</b>, puis additionne. <b>Pourquoi :</b> chaque paire mal rangée est comptée une fois, quand on regarde le plus grand des deux, qui est à gauche.',
   demo:{enonce:`Compte les inversions de σ = ${L2([3,1,4,5,2])} et donne sa signature.`,
    etapes:[{f:'3 : à droite, 1 et 2 sont plus petits → 2.',w:'On parcourt la ligne du bas de gauche à droite.'},
     {f:'1 : rien → 0. &nbsp;4 : seul 2 → 1. &nbsp;5 : seul 2 → 1. &nbsp;2 : rien → 0.',w:'Le dernier nombre n’a personne à sa droite.'},
     {f:'Total : 2 + 0 + 1 + 1 + 0 = 4.',w:'On additionne.'},
     {f:'ε(σ) = (−1)⁴ = 1.',w:'4 est pair.'}],
    conclusion:'σ a 4 inversions et elle est <b>paire</b>.'}},
  {h:'Compte',p:`Combien d’inversions a σ = ${L2([4,2,5,1,3])}&nbsp;?`,lab:'inversions :',ans:6,
   why:'4 : (2, 1, 3) → 3 ; 2 : (1) → 1 ; 5 : (1, 3) → 2 ; 1 : 0 ; 3 : 0. Total 6, donc σ est paire.'},
  {kind:'Pratique',h:'Cinq croisements',p:'Règle les fils pour obtenir une permutation de S₄ qui a exactement <b>5 inversions</b>.',
   params:[{id:'a',l:'σ(1)',min:1,max:4,v:1},{id:'b',l:'σ(2)',min:1,max:4,v:2},{id:'c',l:'σ(3)',min:1,max:4,v:3},{id:'d',l:'σ(4)',min:1,max:4,v:4}],
   draw:v=>fils([v.a,v.b,v.c,v.d]),
   info:v=>{ const b=[v.a,v.b,v.c,v.d]; return new Set(b).size<4?'Pas une permutation.':`${ninv(b)} inversion${ninv(b)>1?'s':''}`; },
   ok:v=>{ const b=[v.a,v.b,v.c,v.d]; return new Set(b).size===4&&ninv(b)===5; },
   why:'Le maximum est 6, pour 4 3 2 1 (toutes les paires sont inversées). Pour 5, on « dé-croise » une seule paire voisine : 3 4 2 1, 4 2 3 1 ou 4 3 1 2.'},
  {h:'La signature comme produit de quotients',p:`<p>Compter les inversions définit bien ε, mais ne montre pas pourquoi la signature d’un produit est le produit des signatures. Pour le voir, on réécrit ε comme un produit de fractions.</p>
  <div class="prop"><p>Pour toute σ ∈ Sₙ :</p><div class="formula">ε(σ) = ∏<sub><i>i</i> &lt; <i>j</i></sub> (σ(<i>j</i>) − σ(<i>i</i>)) / (<i>j</i> − <i>i</i>),</div><p>le produit portant sur toutes les paires <i>i</i> &lt; <i>j</i>.</p></div>
  <div class="why"><p>Quand {<i>i</i> ; <i>j</i>} parcourt les paires, {σ(<i>i</i>) ; σ(<i>j</i>)} parcourt aussi toutes les paires, une fois chacune, car σ est une bijection. Les numérateurs sont donc, au signe près, les mêmes nombres que les dénominateurs : le produit vaut ±1. Un facteur est négatif exactement quand la paire est inversée. Le signe du produit est donc (−1)<sup>nombre d’inversions</sup>.</p></div>
  <div class="ex"><p>σ = ${L2([2,3,1])} : pour les paires (1 ; 2), (1 ; 3), (2 ; 3), les facteurs sont (3 − 2)/1 = 1, (1 − 2)/2 = −1/2 et (1 − 3)/1 = −2. Produit : 1 · (−1/2) · (−2) = 1, comme avec les 2 inversions.</p></div>
  <div class="idea"><p>Pour στ, chaque facteur (στ(<i>j</i>) − στ(<i>i</i>))/(<i>j</i> − <i>i</i>) est le produit de (σ(τ(<i>j</i>)) − σ(τ(<i>i</i>)))/(τ(<i>j</i>) − τ(<i>i</i>)) et de (τ(<i>j</i>) − τ(<i>i</i>))/(<i>j</i> − <i>i</i>). Les seconds facteurs donnent ε(τ). Les premiers donnent ε(σ), car τ ne fait que réordonner les paires, et un quotient ne change pas si on échange les deux éléments d’une paire.</p></div>`},
  {h:'La signature est un homomorphisme',p:`<p>La formule produit permet enfin de démontrer la propriété qui rend la signature si utile.</p><div class="thm"><p>Pour toutes σ, τ ∈ Sₙ, <b>ε(στ) = ε(σ) ε(τ)</b>. Autrement dit, <b>ε : Sₙ → ({1 ; −1}, ·)</b> est un homomorphisme.</p></div><div class="why"><p>C’est le calcul de l’étape précédente : on découpe chaque quotient de la formule produit en deux quotients, l’un pour σ et l’autre pour τ.</p></div><div class="prop"><p>Conséquences : 1) une transposition est <b>impaire</b> : ε((<i>a</i> <i>b</i>)) = −1 ; 2) un <i>k</i>-cycle, produit de <i>k</i> − 1 transpositions, a pour signature (−1)<sup><i>k</i>−1</sup> ; 3) si σ est un produit de <i>m</i> transpositions, ε(σ) = (−1)<sup><i>m</i></sup>.</p></div><div class="ex"><p>(1 2 3) = (1 2)(2 3), donc ε((1 2 3)) = (−1)(−1) = 1 : un 3-cycle est pair, comme le comptage des 2 inversions de ${L2([2,3,1])} l’avait montré.</p></div><div class="warn"><p>La décomposition en transpositions n’est pas unique, mais la <b>parité</b> de leur nombre l’est : si σ = <i>t</i>₁⋯<i>t</i><sub><i>m</i></sub> = <i>t</i>′₁⋯<i>t</i>′<sub><i>p</i></sub>, alors (−1)<sup><i>m</i></sup> = ε(σ) = (−1)<sup><i>p</i></sup>, donc <i>m</i> et <i>p</i> ont la même parité.</p></div>`,
   note:'Pour (a b) avec a &lt; b : les fils de a et b se croisent, et chacun des b − a − 1 fils entre eux croise les deux, d’où 2(b − a − 1) + 1 inversions, un nombre impair.'},
  {h:'Pas de 3 pour faire l’identité',p:'Pourquoi l’identité ne peut-elle pas s’écrire comme un produit de 3 transpositions&nbsp;?',
   opts:['Parce que 3 transpositions déplacent trop d’éléments','Parce qu’on aurait ε(id) = (−1)³ = −1, alors que ε(id) = 1','Parce que les transpositions ne commutent pas','C’est possible : (1 2)(1 2)(1 2) = id'],ans:1,
   why:'ε est un homomorphisme : un produit de 3 transpositions a pour signature (−1)³ = −1. L’identité n’a aucune inversion, ε(id) = 1. Et (1 2)(1 2)(1 2) = (1 2), pas id.'},
  {kind:'Méthode',h:'Calculer une signature par les cycles',
   p:'<b>Quand :</b> σ a beaucoup d’éléments ; compter les inversions serait long. <b>Comment :</b> décompose σ en cycles disjoints, puis multiplie les signatures (−1)<sup><i>k</i>−1</sup> des cycles : un cycle de longueur <b>impaire</b> est <b>pair</b>, un cycle de longueur paire est impair. Formule compacte : <b>ε(σ) = (−1)<sup><i>n</i> − <i>c</i></sup></b>, où <i>c</i> est le nombre de cycles, points fixes compris. <b>Pourquoi :</b> ε est un homomorphisme et un <i>k</i>-cycle est un produit de <i>k</i> − 1 transpositions.',
   demo:{enonce:`Signature de σ = ${L2([3,5,1,8,7,6,2,4])}.`,
    etapes:[{f:'σ = (1 3)(2 5 7)(4 8), et 6 est fixe.',w:'Décomposition en cycles disjoints.'},
     {f:'ε = (−1)¹ · (−1)² · (−1)¹ = (−1) · 1 · (−1) = 1.',w:'Une transposition est impaire, un 3-cycle est pair.'},
     {f:'Contrôle : <i>n</i> − <i>c</i> = 8 − 4 = 4, pair.',w:'4 cycles en comptant (6).'}],
    conclusion:'σ est <b>paire</b>. Le comptage direct donne 14 inversions, aussi un nombre pair : les deux méthodes concordent.'}},
  {h:'Signature',p:`Quelle est la signature de σ = ${L2([5,1,2,3,4,7,6])}&nbsp;?`,lab:'ε(σ) =',ans:-1,
   why:'1 → 5 → 4 → 3 → 2 → 1 : σ = (1 5 4 3 2)(6 7). Le 5-cycle a pour signature (−1)⁴ = 1, la transposition −1. ε(σ) = −1 : σ est impaire.'},
  {h:'Le groupe alterné',p:`<p>Les permutations paires forment un sous-groupe de Sₙ. On l’obtient sans effort grâce à ce qu’on sait des homomorphismes et des quotients.</p><div class="def"><p>Le <b>groupe alterné</b> est <b>Aₙ = {σ ∈ Sₙ : ε(σ) = 1}</b>, l’ensemble des permutations paires. C’est le noyau de la signature.</p></div><div class="prop"><p><b>Aₙ ⊲ Sₙ</b> et, pour <i>n</i> ≥ 2, <b>card Aₙ = <i>n</i>!/2</b>.</p></div><div class="why"><p>Aₙ est un noyau, donc un sous-groupe distingué. Pour <i>n</i> ≥ 2, ε est surjective : ε(id) = 1 et ε((1 2)) = −1. Le premier théorème d’isomorphisme donne Sₙ/Aₙ ≅ {1 ; −1} : le quotient a 2 éléments, donc card Aₙ = card Sₙ / 2. Concrètement, multiplier par (1 2) échange permutations paires et impaires : il y en a autant des deux sortes.</p></div><div class="ex"><p>A₃ = {id ; (1 2 3) ; (1 3 2)} : ce sont les rotations du triangle, le sous-groupe d’indice 2 de <i>D</i>₃ vu au chapitre précédent. A₄ a 24/2 = 12 éléments.</p></div><div class="warn"><p>Les permutations impaires ne forment pas un sous-groupe : elles ne contiennent pas id, et le produit de deux permutations impaires est pair.</p></div>`,
  },
  {h:'Qui est dans A₄&nbsp;?',p:'Laquelle de ces permutations appartient au groupe alterné A₄&nbsp;?',
   opts:['(1 2)','(1 2 3 4)','(2 4)','(1 3 2)'],ans:3,
   why:'Un 3-cycle a pour signature (−1)² = 1 : (1 3 2) ∈ A₄. Les transpositions sont impaires, et un 4-cycle aussi : (−1)³ = −1.'},
  {h:'Le taquin de Sam Loyd',p:`<p>Vers 1880, un taquin 4 × 4 circulait avec un défi : partir de la position ci-dessous (14 et 15 échangés, case vide en bas à droite) et revenir à la position rangée. Des milliers de joueurs ont essayé. La signature explique pourquoi personne n’y est arrivé.</p><div class="idea"><p>Numérote la case vide 16. Une position est alors une permutation des 16 cases. Un coup fait glisser une pièce voisine dans la case vide : les contenus de deux cases s’échangent, <b>c’est une transposition</b>, qui change la signature.</p></div><div class="why"><p>Colorie la grille en damier. À chaque coup, la case vide passe sur une case voisine, donc change de couleur. Si elle revient à sa place en bas à droite, elle a fait un nombre <b>pair</b> de coups : le produit de ces coups est une permutation <b>paire</b>. Or passer de la position de départ à la position rangée demande d’échanger 14 et 15, une transposition, donc une permutation <b>impaire</b> : c’est impossible.</p></div><div class="ex"><p>Après 3 coups (la case vide monte, va à gauche, redescend), elle est sur une case de l’autre couleur, juste à gauche de sa place : elle n’est pas revenue. Un quatrième coup vers la droite la ramène, après un nombre pair de coups.</p></div>`,
   fig:taquin([1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,0]),
   note:'On peut montrer que la réciproque est vraie : toute position paire avec la case vide en bas à droite est accessible. Exactement la moitié des positions le sont.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir : permutations',p:`<div class="keep"><ul>
  <li>Sₙ : permutations de {1, …, <i>n</i>}, groupe pour la composition, de cardinal <i>n</i>!. Convention : στ = σ ∘ τ, τ d’abord.</li>
  <li>Composer en deux lignes : pour chaque <i>i</i>, lire τ(<i>i</i>), puis σ(τ(<i>i</i>)). Réciproque : échanger les deux lignes.</li>
  <li>Cycle (<i>a</i>₁ … <i>a</i><sub><i>k</i></sub>) ; deux cycles disjoints commutent ; toute permutation est un produit de cycles disjoints (suivre les images du plus petit nombre restant).</li>
  <li>Ordre d’une permutation = ppcm des longueurs de ses cycles disjoints.</li>
  <li>(<i>a</i>₁ … <i>a</i><sub><i>k</i></sub>) = (<i>a</i>₁ <i>a</i>₂)(<i>a</i>₂ <i>a</i>₃)⋯(<i>a</i><sub><i>k</i>−1</sub> <i>a</i><sub><i>k</i></sub>) : toute permutation est un produit de <i>n</i> − <i>c</i> transpositions (<i>c</i> cycles, points fixes compris).</li>
  <li>Inversion : <i>i</i> &lt; <i>j</i> avec σ(<i>i</i>) &gt; σ(<i>j</i>), un croisement de fils. ε(σ) = (−1)<sup>nombre d’inversions</sup>.</li>
  <li>ε est un homomorphisme : ε(στ) = ε(σ)ε(τ) ; ε(transposition) = −1 ; ε(<i>k</i>-cycle) = (−1)<sup><i>k</i>−1</sup> ; ε(σ) = (−1)<sup><i>n</i>−<i>c</i></sup>.</li>
  <li>Aₙ = ker ε, les permutations paires : distingué dans Sₙ, de cardinal <i>n</i>!/2.</li>
  <li>Taquin : chaque coup est une transposition ; si la case vide revient, le nombre de coups est pair et la permutation obtenue est paire.</li>
  </ul></div>`},
  {kind:'Problème',h:'Étude complète d’une permutation',
   p:`On considère σ = ${L2([3,6,5,1,7,2,4])} ∈ S₇ (convention : στ = σ ∘ τ). On veut la décomposer, trouver son ordre et sa signature, puis calculer une grande puissance sans faire 23 compositions.`,
   parts:[
    {q:'a) Quelle est sa décomposition en cycles disjoints&nbsp;?',opts:['(1 3 5 7 4 2 6)','(1 4 7 5 3)(2 6)','(1 3)(2 6)(5 7 4)','(1 3 5 7 4)(2 6)'],ans:3,hint:'Pars de 1 et suis les images : σ(1) = 3, σ(3) = …',why:'1 → 3 → 5 → 7 → 4 → 1 donne (1 3 5 7 4), puis 2 → 6 → 2 donne (2 6). La 2e option est σ⁻¹.'},
    {q:'b) Quel est l’ordre de σ&nbsp;?',lab:'ordre :',ans:10,hint:'ppcm des longueurs.',why:'ppcm(5, 2) = 10.'},
    {q:'c) Quelle est la signature de σ&nbsp;?',lab:'ε(σ) =',ans:-1,hint:'Signature d’un k-cycle : (−1)ᵏ⁻¹.',why:'(−1)⁴ · (−1)¹ = −1 : σ est impaire, donc σ ∉ A₇. Contrôle : n − c = 7 − 2 = 5, impair.'},
    {q:'d) Combien vaut σ²³(1)&nbsp;?',lab:'σ²³(1) =',ans:7,hint:'σ¹⁰ = id. Et 1 se trouve dans un cycle de longueur 5.',why:'23 = 2 · 10 + 3, donc σ²³ = σ³. Dans le cycle (1 3 5 7 4), trois pas depuis 1 : 1 → 3 → 5 → 7. σ²³(1) = 7.'},
   ],
   sol:'En suivant les images, σ = (1 3 5 7 4)(2 6), produit d’un 5-cycle et d’une transposition disjoints.<br>Les cycles commutent, donc σᵏ = id ⇔ 5 | k et 2 | k : l’ordre est ppcm(5, 2) = 10.<br>ε(σ) = (−1)⁴(−1)¹ = −1 : σ est impaire (on trouve aussi 11 inversions, nombre impair).<br>Comme σ¹⁰ = id, σ²³ = σ³. Sur le cycle de 1, trois pas donnent 1 → 3 → 5 → 7, donc σ²³(1) = 7.'},
  {kind:'Problème',h:'Le taquin 3 × 3',
   p:'Un taquin 3 × 3 contient les pièces 1 à 8 et une case vide, numérotée 9. La position rangée est 1 2 3 / 4 5 6 / 7 8 9, la case vide en bas à droite. On part de la position 1 2 3 / 4 5 6 / 8 7 9 : seules les pièces 7 et 8 sont échangées. Un coup fait glisser dans la case vide une pièce voisine (horizontalement ou verticalement). On veut savoir si on peut ranger le taquin.',
   parts:[
    {q:'a) Quelle est la signature de la permutation des 9 cases qui fait passer de la position rangée à la position de départ&nbsp;?',lab:'ε =',ans:-1,hint:'Seules 7 et 8 ont bougé.',why:'C’est la transposition (7 8), de signature −1.'},
    {q:'b) Que fait un coup, vu comme une permutation des 9 cases&nbsp;?',opts:['Un 3-cycle, donc pair','Une transposition entre la case vide 9 et une voisine, qui change la signature','L’identité','Il dépend de la pièce et n’a pas de signature'],ans:1,hint:'Deux contenus s’échangent à chaque coup.',why:'La pièce et la case vide échangent leurs places : c’est une transposition. Multiplier par une transposition multiplie la signature par −1.'},
    {q:'c) Si la case vide revient à sa place après <i>m</i> coups, quelle est la signature (−1)<sup><i>m</i></sup> du produit de ces coups&nbsp;?',lab:'(−1)ᵐ =',ans:1,hint:'Colorie la grille en damier : à chaque coup, la case vide change de couleur.',why:'Pour revenir sur sa couleur de départ, la case vide fait un nombre pair de coups : m est pair et (−1)ᵐ = 1.'},
    {q:'d) Conclusion&nbsp;?',opts:['On peut ranger le taquin en un seul coup','On peut le ranger, mais il faut un nombre impair de coups','C’est impossible : il faudrait une permutation paire égale à la transposition (7 8), qui est impaire','On ne peut pas savoir sans essayer'],ans:2,hint:'Compare a) et c).',why:'Ranger le taquin demanderait un produit de coups égal à (7 8), donc de signature −1. Mais la case vide revient à sa place, donc ce produit a pour signature +1. Contradiction.'},
    {q:'e) Parmi les 8! positions avec la case vide en bas à droite, combien vérifient la condition nécessaire « permutation paire »&nbsp;?',lab:'positions :',ans:20160,hint:'Les permutations paires de 8 pièces forment A₈.',why:'card A₈ = 8!/2 = 40 320/2 = 20 160.'},
   ],
   sol:'Numérotons la case vide 9. La position de départ s’obtient à partir de la position rangée par la transposition (7 8), de signature −1.<br>Chaque coup échange la case vide avec une pièce voisine : c’est une transposition, qui multiplie la signature par −1. Après m coups, la signature a été multipliée par (−1)ᵐ.<br>En coloriant la grille en damier, la case vide change de couleur à chaque coup ; pour revenir en bas à droite, m doit être pair. Une suite de coups qui laisse la case vide en place réalise donc une permutation paire.<br>Ranger le taquin demanderait de réaliser la transposition (7 8), impaire : c’est impossible.<br>Les positions qui passent ce test sont les permutations paires des 8 pièces : 8!/2 = 20 160.'},
]},
);
})();
