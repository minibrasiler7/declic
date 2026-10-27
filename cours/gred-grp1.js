/* Déclic — Notions fondamentales : les groupes (1) */
(()=>{
/* ---------- helpers locaux ---------- */
// Isométries du triangle équilatéral. Places fixes du plan : 0 = haut, 1 = bas gauche, 2 = bas droite (sens direct).
// Une isométrie est la permutation des places p : la place i va en p[i].
const TP=[[0,1,2],[1,2,0],[2,0,1],[0,2,1],[2,1,0],[1,0,2]], TN=['e','r','r²','s₁','s₂','s₃'];
const tcomp=(g,f)=>f.map(i=>g[i]);                     // g ∘ f : d’abord f, puis g
const tid=p=>TP.findIndex(q=>q[0]===p[0]&&q[1]===p[1]&&q[2]===p[2]);
const D3=TP.map(g=>TP.map(f=>tid(tcomp(g,f))));          // D3[g][f] = indice de g ∘ f
const act=(p,arr)=>{ const n=[]; arr.forEach((l,i)=>{ n[p[i]]=l; }); return n; };
const VC=['var(--accent)','var(--math)','var(--spark)'];
const ang=k=>rad(90+120*k);
function tri(P,cx,cy,R,arr,o={}){
  const pts=[0,1,2].map(k=>[cx+R*Math.cos(ang(k)),cy+R*Math.sin(ang(k))]);
  if(o.axes) [0,1,2].forEach(k=>{ const a=ang(k); P.seg(cx+1.25*R*Math.cos(a),cy+1.25*R*Math.sin(a),cx-0.85*R*Math.cos(a),cy-0.85*R*Math.sin(a),{c:'var(--muted)',w:1.5,dash:true}); P.text(cx+1.25*R*Math.cos(a),cy+1.25*R*Math.sin(a),'Δ'+['₁','₂','₃'][k],{a:'middle',dy:k?14:-4,s:12,c:'var(--muted)'}); });
  P.poly(pts,{fill:'var(--accent)',fo:.12,c:'var(--ink)',w:2});
  arr.forEach((lab,k)=>{ const [x,y]=pts[k], a=ang(k); P.dot(x,y,{r:o.r||9,c:VC[lab-1]}); P.text(x+0.5*Math.cos(a),y+0.5*Math.sin(a),String(lab),{a:"middle",dy:5,s:13,c:VC[lab-1]}); });
  return P;
}
// Trois triangles : départ, après f, après g ∘ f
function tri3(f,g){
  const P=plane({x:[0,12],y:[0,5.4],grid:false,axes:false});
  const a0=[1,2,3], a1=act(TP[f],a0), a2=act(TP[g],a1);
  tri(P,2,2.6,1.45,a0,{r:8}); tri(P,6,2.6,1.45,a1,{r:8}); tri(P,10,2.6,1.45,a2,{r:8});
  P.arrow(3.5,2.6,4.5,2.6,{c:'var(--muted)',w:2,hs:8}).arrow(7.5,2.6,8.5,2.6,{c:'var(--muted)',w:2,hs:8});
  P.text(4,2.6,TN[f],{a:'middle',dy:-10,c:'var(--math)'}).text(8,2.6,TN[g],{a:'middle',dy:-10,c:'var(--spark)'});
  P.text(2,0.3,'départ',{a:'middle',s:12,c:'var(--muted)'}).text(6,0.3,'après '+TN[f],{a:'middle',s:12,c:'var(--muted)'}).text(10,0.3,TN[g]+' ∘ '+TN[f]+' = '+TN[D3[g][f]],{a:'middle',s:12});
  return P.svg();
}
// Table de Cayley colorée. T[i][j] = indice du résultat de nm[i] ∗ nm[j].
const COL=['var(--muted)','var(--accent)','var(--math)','var(--spark)','var(--ok)','var(--code)','var(--sci)','var(--other)','var(--bad)'];
function cay(nm,T,o={}){
  const n=nm.length, cs=Math.min(42,Math.floor(300/(n+1))), x0=Math.round((320-cs*(n+1))/2), y0=4, H=cs*(n+1)+8;
  const fade=i=>o.block&&!o.block.includes(i);
  let s=`<svg viewBox="0 0 320 ${H}" width="320" role="img">`;
  const tx=(x,y,str,c='var(--ink)')=>`<text x="${x}" y="${y}" font-size="${cs<34?12:14}" font-weight="700" text-anchor="middle" fill="${c}">${str}</text>`;
  s+=tx(x0+cs/2,y0+cs/2+5,o.op||'∗','var(--muted)');
  nm.forEach((m,j)=>{ s+=tx(x0+cs*(j+1.5),y0+cs/2+5,m,'var(--muted)'); s+=tx(x0+cs/2,y0+cs*(j+1.5)+5,m,'var(--muted)'); });
  for(let i=0;i<n;i++) for(let j=0;j<n;j++){ const k=T[i][j], x=x0+cs*(j+1), y=y0+cs*(i+1), f=fade(i)||fade(j);
    s+=`<rect x="${x+1}" y="${y+1}" width="${cs-2}" height="${cs-2}" rx="4" fill="${COL[k%COL.length]}" fill-opacity="${f?.06:.3}"/>`;
    s+=`<text x="${x+cs/2}" y="${y+cs/2+5}" font-size="${cs<34?12:14}" font-weight="700" text-anchor="middle" fill="var(--ink)" opacity="${f?.3:1}">${nm[k]}</text>`; }
  s+=`<line x1="${x0+cs}" x2="${x0+cs*(n+1)}" y1="${y0+cs}" y2="${y0+cs}" stroke="var(--muted)" stroke-width="1.5"/><line x1="${x0+cs}" x2="${x0+cs}" y1="${y0+cs}" y2="${y0+cs*(n+1)}" stroke="var(--muted)" stroke-width="1.5"/>`;
  if(o.row!==undefined) s+=`<rect x="${x0+1}" y="${y0+cs*(o.row+1)+1}" width="${cs*(n+1)-2}" height="${cs-2}" rx="5" fill="none" stroke="var(--ink)" stroke-width="2.5"/>`;
  if(o.col!==undefined) s+=`<rect x="${x0+cs*(o.col+1)+1}" y="${y0+1}" width="${cs-2}" height="${cs*(n+1)-2}" rx="5" fill="none" stroke="var(--ink)" stroke-width="2.5"/>`;
  (o.cells||[]).forEach(([i,j])=>{ s+=`<rect x="${x0+cs*(j+1)+2}" y="${y0+cs*(i+1)+2}" width="${cs-4}" height="${cs-4}" rx="4" fill="none" stroke="var(--spark)" stroke-width="3.5"/>`; });
  return s+'</svg>';
}
const tab=(n,f)=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>f(i,j)));
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
// Quelques groupes prêts à dessiner
const GZ4={nm:['0','1','2','3'],T:tab(4,(i,j)=>(i+j)%4),op:'+'};
const GV={nm:['e','a','b','c'],T:tab(4,(i,j)=>i^j),op:'∗'};
const U5=[1,2,3,4], GU5={nm:['1','2','3','4'],T:tab(4,(i,j)=>U5.indexOf(U5[i]*U5[j]%5)),op:'·'};
const GD3={nm:TN,T:D3,op:'∘'};
// Horloge ℤ/nℤ : 0 en haut, sens des aiguilles d’une montre
const cpt=(n,k,r=1)=>[r*Math.sin(2*Math.PI*k/n),r*Math.cos(2*Math.PI*k/n)];
function clock(n,o={}){
  const P=plane({x:[-1.55,1.55],y:[-1.45,1.45],grid:false,axes:false});
  P.circ(0,0,1,{c:'var(--line)',w:2});
  for(let k=0;k<n;k++){ const [x,y]=cpt(n,k), [lx,ly]=cpt(n,k,1.24), c=o.col?o.col(k):'var(--muted)';
    P.dot(x,y,{r:o.big&&o.big(k)?8:5,c}); P.text(lx,ly,String(k),{a:'middle',dy:5,s:12,c:o.big&&o.big(k)?'var(--ink)':'var(--muted)'}); }
  return P;
}
function arc(P,n,a,b,r,c){ if(b<=0) return; const t0=2*Math.PI*a/n, t1=2*Math.PI*(a+b)/n;
  P.curve(t=>r*Math.sin(t),t=>r*Math.cos(t),t0,t1-0.12,{c,w:3});
  const e=[r*Math.sin(t1),r*Math.cos(t1)], s=[r*Math.sin(t1-0.15),r*Math.cos(t1-0.15)]; P.arrow(s[0],s[1],e[0],e[1],{c,w:3,hs:9}); }
// Roue des multiples de k dans ℤ/nℤ, m premiers pas
function wheel(n,k,m){
  const kk=k%n, ord=n/gcd(kk,n), H=[]; for(let i=0;i<ord;i++) H.push(i*kk%n);
  const P=clock(n,{col:j=>H.includes(j)?'var(--spark)':'var(--muted)',big:j=>H.includes(j)});
  for(let i=0;i<Math.min(m,ord);i++){ const a=cpt(n,i*kk%n,.93), b=cpt(n,(i+1)*kk%n,.93); P.arrow(a[0],a[1],b[0],b[1],{c:'var(--accent)',w:2.5,hs:9}); }
  return {svg:P.svg(),H,ord,kk};
}
// Classes modulo H = ⟨k⟩ dans ℤ/nℤ (chaque classe est un polygone régulier)
const CL=['var(--accent)','var(--math)','var(--spark)','var(--ok)','var(--code)','var(--sci)','var(--other)','var(--bad)'];
function lagr(n,k){
  const kk=k%n, d=gcd(kk,n), h=n/d;
  const P=clock(n,{col:j=>CL[(j%d)%CL.length],big:j=>j%d===0});
  for(let c=0;c<d;c++){ const pts=[]; for(let i=0;i<h;i++) pts.push(cpt(n,c+i*d,1));
    if(h>=3) P.poly(pts,{fill:CL[c%CL.length],fo:.07,c:CL[c%CL.length],w:2}); else if(h===2) P.seg(pts[0][0],pts[0][1],pts[1][0],pts[1][1],{c:CL[c%CL.length],w:2}); }
  const cls=[]; for(let c=0;c<d;c++){ const e=[]; for(let i=0;i<h;i++) e.push(c+i*d); cls.push(e); }
  return {svg:P.svg(),d,h,kk,cls};
}

COURS.push(
/* ===================== 1. PROLÉGOMÈNES : LOIS INTERNES ===================== */
{subj:'gred',sem:'grp',id:'gred-lci',h:'Prolégomènes : lois internes',p:'Cinq situations où l’on « compose » deux objets pour en obtenir un troisième, et les propriétés qu’on y repère : associativité, commutativité, neutre, symétrique, éléments réguliers, distributivité.',steps:[
  {h:'Rappel : une loi interne',p:'Une <b>loi de composition interne</b> sur un ensemble <i>E</i> est une application <i>E</i> × <i>E</i> → <i>E</i> : à chaque couple (<i>a</i> ; <i>b</i>) elle associe un élément noté <i>a</i> ∗ <i>b</i>, <b>qui reste dans <i>E</i></b>.<br><b>Exemples :</b> + et · sur ℕ, la soustraction sur ℤ, ∪ et ∩ sur les parties d’un ensemble.<br><b>Contre-exemple :</b> la soustraction n’est pas interne sur ℕ, car 2 − 5 = −3 ∉ ℕ.',
   note:'Deux choses à vérifier : <i>a</i> ∗ <i>b</i> est défini pour <b>tous</b> les couples, et le résultat tombe <b>dans</b> <i>E</i>. La division n’est pas une loi interne sur ℚ, car <i>a</i>/0 n’existe pas ; elle l’est sur ℚ*.'},
  {h:'Interne ou pas ?',p:'Laquelle de ces opérations est une loi de composition interne sur ℕ&nbsp;?',
   opts:['(<i>a</i> ; <i>b</i>) ↦ <i>a</i> − <i>b</i>','(<i>a</i> ; <i>b</i>) ↦ (<i>a</i> + <i>b</i>)/2','(<i>a</i> ; <i>b</i>) ↦ max(<i>a</i> ; <i>b</i>)','(<i>a</i> ; <i>b</i>) ↦ <i>a</i>/<i>b</i>'],ans:2,
   why:'Le plus grand de deux entiers naturels est un entier naturel. En revanche 1 − 2 = −1 ∉ ℕ, (1 + 2)/2 = 1,5 ∉ ℕ, et 1/0 n’est pas défini.'},
  {h:'Situation 1 : retourner un triangle',p:'Un triangle équilatéral en carton occupe trois <b>places</b> fixes du plan. Six mouvements le remettent dans son contour : l’identité <i>e</i>, la rotation <i>r</i> de 120° dans le sens direct, la rotation <i>r</i>² de 240°, et les trois symétries <i>s</i>₁, <i>s</i>₂, <i>s</i>₃ d’axes Δ₁, Δ₂, Δ₃ (fixes, passant par les places 1, 2, 3). <b><i>g</i> ∘ <i>f</i></b> veut dire : d’abord <i>f</i>, puis <i>g</i>. Choisis <i>f</i> et <i>g</i> et lis le résultat.',
   params:[{id:'f',l:'f (premier mouvement)',min:0,max:5,v:1},{id:'g',l:'g (second mouvement)',min:0,max:5,v:3}],
   draw:v=>tri3(v.f,v.g),
   info:v=>`On fait <b>${TN[v.f]}</b>, puis <b>${TN[v.g]}</b> : le triangle est dans la même position qu’après le seul mouvement <b>${TN[D3[v.g][v.f]]}</b>. Donc ${TN[v.g]} ∘ ${TN[v.f]} = <b>${TN[D3[v.g][v.f]]}</b>.`,
   note:'Composer deux de ces six mouvements donne toujours l’un des six : ∘ est une loi interne sur l’ensemble {<i>e</i>, <i>r</i>, <i>r</i>², <i>s</i>₁, <i>s</i>₂, <i>s</i>₃}. Compare <i>r</i> ∘ <i>s</i>₁ et <i>s</i>₁ ∘ <i>r</i> : l’ordre compte.'},
  {kind:'Pratique',h:'Deux retournements font un tour',p:'Choisis deux <b>symétries</b> <i>f</i> et <i>g</i> (parmi <i>s</i>₁, <i>s</i>₂, <i>s</i>₃) telles que <i>g</i> ∘ <i>f</i> soit la rotation <i>r</i>.',
   params:[{id:'f',l:'f',min:0,max:5,v:3},{id:'g',l:'g',min:0,max:5,v:3}],
   draw:v=>tri3(v.f,v.g),
   ok:v=>v.f>=3&&v.g>=3&&D3[v.g][v.f]===1,
   why:'Par exemple s₁ ∘ s₂ = r, s₂ ∘ s₃ = r et s₃ ∘ s₁ = r. Deux retournements remettent le triangle « à l’endroit » : leur composée est toujours une rotation.'},
  {h:'Situation 2 et 3 : carré et horloge',p:'Les quatre rotations d’un carré autour de son centre (0°, 90°, 180°, 270°) se composent en <b>additionnant les angles</b>, puis en retirant 360° si on dépasse : 270° puis 180°, c’est 90°.<br>C’est exactement l’addition sur une <b>horloge</b> à <i>n</i> heures, c’est-à-dire dans ℤ/<i>n</i>ℤ. On écrit simplement <i>k</i> pour la classe de <i>k</i>. Avance de <i>a</i>, puis de <i>b</i>.',
   params:[{id:'n',l:'n (heures)',min:2,max:12,v:12},{id:'a',l:'a',min:0,max:11,v:9},{id:'b',l:'b',min:0,max:11,v:5}],
   draw:v=>{ const a=v.a%v.n, b=v.b%v.n, s=(a+b)%v.n; const P=clock(v.n,{col:j=>j===s?'var(--spark)':j===a?'var(--math)':'var(--muted)',big:j=>j===s||j===a});
     arc(P,v.n,0,a,.55,'var(--math)'); arc(P,v.n,a,b,.8,'var(--spark)'); return P.svg(); },
   info:v=>{ const a=v.a%v.n, b=v.b%v.n; return `${v.a>=v.n||v.b>=v.n?`Modulo ${v.n} : ${v.a} ≡ ${a} et ${v.b} ≡ ${b}. `:''}Dans ℤ/${v.n}ℤ : ${a} + ${b} = ${a+b} ≡ <b>${(a+b)%v.n}</b>.`; },
   note:'Avec <i>n</i> = 4, l’horloge est le carré : 1 représente 90°, 2 représente 180°, 3 représente 270°.'},
  {h:'Situation 4 et 5 : bijections et réels non nuls',p:'<b>Bijections.</b> Une bijection de {1 ; 2 ; 3} sur lui-même mélange les trois nombres. Il y en a 3! = 6, et la composée de deux bijections est une bijection : ∘ est interne. On note par exemple σ : 1 ↦ 2, 2 ↦ 3, 3 ↦ 1.<br><b>Réels non nuls.</b> Sur ℝ* = ℝ \\ {0}, le produit de deux réels non nuls est non nul : · est interne.<br>Point commun des cinq situations : la loi est <b>associative</b>, il y a un élément « qui ne fait rien », et chaque élément peut être <b>défait</b> (mouvement inverse, −<i>a</i>, bijection réciproque, 1/<i>x</i>).',
   fig:(()=>{ const P=plane({x:[0,12],y:[0,5],grid:false,axes:false}); const y=k=>4.2-1.5*k;
     const s=[1,2,0], t=[1,0,2];
     [0,1,2].forEach(k=>{ P.arrow(1.4,y(k),5.3,y(s[k]),{c:'var(--math)',w:2,hs:8}); P.arrow(6.7,y(k),10.6,y(t[k]),{c:'var(--spark)',w:2,hs:8}); });
     [1,6,11].forEach(x=>[0,1,2].forEach(k=>{ P.dot(x,y(k),{r:5,c:'var(--ink)'}); P.text(x,y(k),String(k+1),{a:x===1?'end':'start',dx:x===1?-9:9,dy:5}); }));
     P.text(3.4,4.75,'σ',{a:'middle',c:'var(--math)'}).text(8.6,4.75,'τ',{a:'middle',c:'var(--spark)'}); return P.svg(); })(),
   note:'Sur la figure : σ envoie 1 sur 2, 2 sur 3, 3 sur 1 ; τ échange 1 et 2 et fixe 3. Pour τ ∘ σ, on suit les flèches de gauche à droite.'},
  {h:'Composer deux bijections',p:'Avec la figure ci-dessus, que vaut (τ ∘ σ)(3)&nbsp;?',lab:'(τ ∘ σ)(3) =',ans:2,
   why:'On applique d’abord σ : σ(3) = 1. Puis τ : τ(1) = 2. Donc (τ ∘ σ)(3) = 2.'},
  {h:'Associativité, commutativité',p:'Une loi ∗ sur <i>E</i> est :<br>• <b>associative</b> si (<i>a</i> ∗ <i>b</i>) ∗ <i>c</i> = <i>a</i> ∗ (<i>b</i> ∗ <i>c</i>) pour tous <i>a</i>, <i>b</i>, <i>c</i> ; on peut alors écrire <i>a</i> ∗ <i>b</i> ∗ <i>c</i> sans parenthèses ;<br>• <b>commutative</b> si <i>a</i> ∗ <i>b</i> = <i>b</i> ∗ <i>a</i> pour tous <i>a</i>, <i>b</i>.<br><b>Exemples :</b> + et · sur ℝ sont les deux. La composition des applications est toujours associative, mais pas commutative : dans le triangle, <i>r</i> ∘ <i>s</i>₁ = <i>s</i>₃ alors que <i>s</i>₁ ∘ <i>r</i> = <i>s</i>₂.<br><b>Contre-exemple :</b> la soustraction n’est ni l’une ni l’autre : (5 − 3) − 1 = 1 mais 5 − (3 − 1) = 3.',
   note:'« Pour tous » : une seule exception suffit à détruire la propriété. À l’inverse, quelques exemples qui marchent ne prouvent rien.'},
  {kind:'Méthode',h:'Prouver ou réfuter associativité et commutativité',
   p:'<b>Quand :</b> une loi est donnée par une formule, par exemple <i>a</i> ∗ <i>b</i> = 2<i>a</i> + <i>b</i>. <b>Comment prouver :</b> on développe <i>a</i> ∗ <i>b</i> et <i>b</i> ∗ <i>a</i> (commutativité), puis (<i>a</i> ∗ <i>b</i>) ∗ <i>c</i> et <i>a</i> ∗ (<i>b</i> ∗ <i>c</i>) (associativité), avec des lettres, et on compare. <b>Comment réfuter :</b> la comparaison littérale montre où ça coince ; on choisit alors des <b>nombres précis</b> qui donnent deux résultats différents. C’est le contre-exemple qu’on écrit.',
   demo:{enonce:'Étudie les lois <i>a</i> ∗ <i>b</i> = <i>a</i> + <i>b</i> + <i>ab</i> et <i>a</i> ⋆ <i>b</i> = 2<i>a</i> + <i>b</i> sur ℝ.',
    etapes:[{f:'<i>b</i> ∗ <i>a</i> = <i>b</i> + <i>a</i> + <i>ba</i> = <i>a</i> ∗ <i>b</i> : ∗ est commutative.',w:'Addition et multiplication des réels sont commutatives.'},
     {f:'(<i>a</i> ∗ <i>b</i>) ∗ <i>c</i> = (<i>a</i> + <i>b</i> + <i>ab</i>) + <i>c</i> + (<i>a</i> + <i>b</i> + <i>ab</i>)<i>c</i> = <i>a</i> + <i>b</i> + <i>c</i> + <i>ab</i> + <i>ac</i> + <i>bc</i> + <i>abc</i>.',w:'On applique la formule avec « a ∗ b » à la place de a, puis on développe.'},
     {f:'<i>a</i> ∗ (<i>b</i> ∗ <i>c</i>) = <i>a</i> + (<i>b</i> + <i>c</i> + <i>bc</i>) + <i>a</i>(<i>b</i> + <i>c</i> + <i>bc</i>) = la même somme.',w:'Même expression symétrique : ∗ est associative.'},
     {f:'(<i>a</i> ⋆ <i>b</i>) ⋆ <i>c</i> = 2(2<i>a</i> + <i>b</i>) + <i>c</i> = 4<i>a</i> + 2<i>b</i> + <i>c</i> ; <i>a</i> ⋆ (<i>b</i> ⋆ <i>c</i>) = 2<i>a</i> + 2<i>b</i> + <i>c</i>.',w:'Les deux diffèrent dès que a ≠ 0.'},
     {f:'Contre-exemple : (1 ⋆ 0) ⋆ 0 = 4 et 1 ⋆ (0 ⋆ 0) = 2. Et 1 ⋆ 0 = 2 ≠ 0 ⋆ 1 = 1.',w:'On choisit a = 1 pour faire apparaître l’écart.'}],
    conclusion:'∗ est associative et commutative ; ⋆ n’est ni associative ni commutative. Une astuce pour ∗ : 1 + <i>a</i> ∗ <i>b</i> = (1 + <i>a</i>)(1 + <i>b</i>), ce qui rend l’associativité évidente.'}},
  {h:'La moyenne',p:'Sur ℝ, on pose <i>a</i> ⊤ <i>b</i> = (<i>a</i> + <i>b</i>)/2. Que peut-on dire de ⊤&nbsp;?',
   opts:['Associative et commutative','Commutative, mais pas associative','Associative, mais pas commutative','Ni associative ni commutative'],ans:1,
   why:'(a + b)/2 = (b + a)/2 : commutative. Mais (0 ⊤ 0) ⊤ 4 = 0 ⊤ 4 = 2 alors que 0 ⊤ (0 ⊤ 4) = 0 ⊤ 2 = 1 : pas associative.'},
  {h:'Élément neutre : il est unique',p:'<i>e</i> ∈ <i>E</i> est <b>neutre</b> pour ∗ si <b><i>e</i> ∗ <i>a</i> = <i>a</i> ∗ <i>e</i> = <i>a</i></b> pour tout <i>a</i>. Exemples : 0 pour +, 1 pour ·, l’identité pour ∘, ∅ pour ∪.<br><b>Unicité.</b> Si <i>e</i> et <i>e</i>′ sont neutres, alors <i>e</i> = <i>e</i> ∗ <i>e</i>′ (car <i>e</i>′ est neutre) et <i>e</i> ∗ <i>e</i>′ = <i>e</i>′ (car <i>e</i> est neutre). Donc <i>e</i> = <i>e</i>′.<br><b>Contre-exemple :</b> pour − sur ℤ, <i>a</i> − 0 = <i>a</i> mais 0 − <i>a</i> = −<i>a</i> : 0 n’est neutre qu’à droite, et − n’a pas de neutre.',
   note:'Sur une table, le neutre se voit tout de suite : sa ligne recopie la ligne d’en-tête et sa colonne recopie la colonne d’en-tête.'},
  {h:'Élément symétrique : unique si la loi est associative',p:'Si ∗ a un neutre <i>e</i>, l’élément <i>a</i>′ est un <b>symétrique</b> de <i>a</i> si <b><i>a</i> ∗ <i>a</i>′ = <i>a</i>′ ∗ <i>a</i> = <i>e</i></b>. Exemples : −<i>a</i> pour +, 1/<i>a</i> pour · sur ℝ*, la bijection réciproque pour ∘.<br><b>Unicité (si ∗ est associative).</b> Si <i>a</i>′ et <i>a</i>″ sont deux symétriques de <i>a</i> :<br><i>a</i>′ = <i>a</i>′ ∗ <i>e</i> = <i>a</i>′ ∗ (<i>a</i> ∗ <i>a</i>″) = (<i>a</i>′ ∗ <i>a</i>) ∗ <i>a</i>″ = <i>e</i> ∗ <i>a</i>″ = <i>a</i>″.',
   note:'<b>Contre-exemple :</b> dans (ℤ, ·), le neutre est 1 et seuls 1 et −1 ont un symétrique : 2 · <i>x</i> = 1 n’a pas de solution entière. Et sans associativité, un élément peut avoir deux symétriques (tu le verras sur une table).'},
  {kind:'Méthode',h:'Trouver le neutre et les symétriques d’une loi donnée par une formule',
   p:'<b>Neutre :</b> on cherche <i>e</i> tel que <i>a</i> ∗ <i>e</i> = <i>a</i> <b>pour tout</b> <i>a</i> (on résout en <i>e</i>, la réponse ne doit pas dépendre de <i>a</i>), puis on vérifie aussi <i>e</i> ∗ <i>a</i> = <i>a</i>. <b>Symétrique de <i>a</i> :</b> on résout <i>a</i> ∗ <i>x</i> = <i>e</i> en <i>x</i>, puis on vérifie <i>x</i> ∗ <i>a</i> = <i>e</i> (inutile si la loi est commutative). Les valeurs de <i>a</i> pour lesquelles l’équation n’a pas de solution n’ont pas de symétrique.',
   demo:{enonce:'Sur ℝ, <i>a</i> ∗ <i>b</i> = <i>a</i> + <i>b</i> + <i>ab</i>. Trouve le neutre et le symétrique de chaque réel.',
    etapes:[{f:'<i>a</i> ∗ <i>e</i> = <i>a</i> ⇔ <i>a</i> + <i>e</i> + <i>ae</i> = <i>a</i> ⇔ <i>e</i>(1 + <i>a</i>) = 0.',w:'On isole e. Il faut que ce soit vrai pour tout a, y compris a = 0.'},
     {f:'Avec <i>a</i> = 0 : <i>e</i> = 0. Et 0 convient pour tout <i>a</i> : <i>a</i> ∗ 0 = <i>a</i>.',w:'La loi est commutative, donc 0 ∗ a = a aussi : 0 est le neutre.'},
     {f:'<i>a</i> ∗ <i>x</i> = 0 ⇔ <i>a</i> + <i>x</i> + <i>ax</i> = 0 ⇔ <i>x</i>(1 + <i>a</i>) = −<i>a</i>.',w:'On résout l’équation du symétrique en x.'},
     {f:'Si <i>a</i> ≠ −1 : <i>x</i> = −<i>a</i>/(1 + <i>a</i>). Si <i>a</i> = −1 : l’équation devient 0 = 1, impossible.',w:'On ne divise par 1 + a que s’il est non nul ; le cas a = −1 se traite à part.'}],
    conclusion:'Le neutre est 0. Tout réel <i>a</i> ≠ −1 a pour symétrique −<i>a</i>/(1 + <i>a</i>) ; −1 n’en a pas. D’ailleurs −1 ∗ <i>b</i> = −1 pour tout <i>b</i> : −1 « absorbe » tout.'}},
  {h:'Symétrique pour a + b + ab',p:'Toujours avec <i>a</i> ∗ <i>b</i> = <i>a</i> + <i>b</i> + <i>ab</i>, quel est le symétrique de 3&nbsp;?',lab:'x =',ans:-0.75,tol:0.001,
   why:'x = −3/(1 + 3) = −0,75. Vérification : 3 + (−0,75) + 3 · (−0,75) = 3 − 0,75 − 2,25 = 0.'},
  {h:'Une addition décalée',p:'Sur ℤ, on pose <i>a</i> ∗ <i>b</i> = <i>a</i> + <i>b</i> − 2. Le neutre est 2. Quel est le symétrique de 5&nbsp;?',lab:'x =',ans:-1,
   why:'Neutre : a + e − 2 = a donne e = 2. Symétrique : 5 + x − 2 = 2 donne x = −1. Vérification : 5 ∗ (−1) = 5 − 1 − 2 = 2.'},
  {h:'Lire une table de Cayley',p:'Pour un ensemble fini, on range tous les résultats dans une <b>table de Cayley</b> : la case à la ligne <i>a</i> et à la colonne <i>b</i> contient <i>a</i> ∗ <i>b</i>. Voici les rotations du carré (on compose les angles). Choisis une ligne et une colonne.',
   params:[{id:'i',l:'ligne a',min:0,max:3,v:1},{id:'j',l:'colonne b',min:0,max:3,v:3}],
   draw:v=>cay(['0°','90°','180°','270°'],GZ4.T,{op:'∘',row:v.i,col:v.j,cells:[[v.i,v.j]]}),
   info:v=>{ const A=[0,90,180,270]; return `${A[v.i]}° puis ${A[v.j]}° : ${A[v.i]+A[v.j]}°${A[v.i]+A[v.j]>=360?` − 360° = ${(A[v.i]+A[v.j])%360}°`:''}. Les couleurs repèrent les résultats égaux.`; },
   note:'Ce que la table montre d’un coup d’œil : <b>commutativité</b> = table symétrique par rapport à la diagonale ; <b>neutre</b> = ligne et colonne qui recopient l’en-tête ; <b>symétrique de <i>a</i></b> = la case où le neutre apparaît dans la ligne <i>a</i>. L’associativité, elle, ne se voit pas : il faut tester des triplets.'},
  {kind:'Méthode',h:'Analyser une loi donnée par sa table',
   p:'<b>Quand :</b> la loi est donnée par une table finie. <b>Dans l’ordre :</b> 1) neutre : chercher une ligne identique à l’en-tête, et contrôler sa colonne ; 2) commutativité : comparer chaque case (<i>a</i>, <i>b</i>) à la case (<i>b</i>, <i>a</i>) ; 3) symétriques : dans la ligne de <i>a</i>, repérer les colonnes où apparaît le neutre ; 4) associativité : si un élément a <b>deux</b> symétriques, la loi n’est pas associative (par l’unicité vue plus haut) ; on cherche alors un triplet qui le prouve.',
   demo:{enonce:'Analyse la loi ∗ sur {<i>a</i> ; <i>b</i> ; <i>c</i>} donnée par la table.',
    etapes:[{f:cay(['a','b','c'],[[0,1,2],[1,0,0],[2,0,1]]),w:'On lit la table ligne par ligne.'},
     {f:'Ligne <i>a</i> = (<i>a</i>, <i>b</i>, <i>c</i>) et colonne <i>a</i> = (<i>a</i>, <i>b</i>, <i>c</i>) : <i>a</i> est neutre.',w:'Elles recopient l’en-tête.'},
     {f:'<i>b</i> ∗ <i>c</i> = <i>a</i> = <i>c</i> ∗ <i>b</i>, et la table est symétrique : ∗ est commutative.',w:'On compare les cases placées en miroir par rapport à la diagonale.'},
     {f:'Ligne <i>b</i> : <i>b</i> ∗ <i>b</i> = <i>a</i> et <i>b</i> ∗ <i>c</i> = <i>a</i>. Donc <i>b</i> a deux symétriques, <i>b</i> et <i>c</i>.',w:'Le neutre a apparaît deux fois dans la ligne b.'},
     {f:'(<i>b</i> ∗ <i>b</i>) ∗ <i>c</i> = <i>a</i> ∗ <i>c</i> = <i>c</i>, mais <i>b</i> ∗ (<i>b</i> ∗ <i>c</i>) = <i>b</i> ∗ <i>a</i> = <i>b</i>.',w:'Deux symétriques impossibles avec une loi associative : on cherche le triplet en imitant la preuve d’unicité.'}],
    conclusion:'La loi a un neutre <i>a</i>, est commutative, mais <b>n’est pas associative</b> : (<i>b</i> ∗ <i>b</i>) ∗ <i>c</i> ≠ <i>b</i> ∗ (<i>b</i> ∗ <i>c</i>).'}},
  {h:'Trouver le neutre',p:'Voici la table d’une loi ∗ sur {<i>a</i> ; <i>b</i> ; <i>c</i> ; <i>d</i>}. Quel est son élément neutre&nbsp;?',
   fig:cay(['a','b','c','d'],tab(4,(i,j)=>{ const v=[1,3,0,2]; return v.indexOf((v[i]+v[j])%4); })),
   opts:['<i>a</i>','<i>b</i>','<i>c</i>','<i>d</i>'],ans:2,
   why:'La ligne de c est (a, b, c, d), comme l’en-tête, et sa colonne aussi : c est neutre.'},
  {kind:'Pratique',h:'Prendre la loi en défaut',p:'Voici la table des six mouvements du triangle (case ligne <i>g</i>, colonne <i>f</i> = <i>g</i> ∘ <i>f</i>). Place les curseurs sur une case qui prouve que ∘ <b>n’est pas commutative</b>.',
   params:[{id:'i',l:'ligne g',min:0,max:5,v:0},{id:'j',l:'colonne f',min:0,max:5,v:0}],
   draw:v=>cay(TN,D3,{op:'∘',cells:[[v.i,v.j],[v.j,v.i]]}),
   info:v=>`${TN[v.i]} ∘ ${TN[v.j]} = <b>${TN[D3[v.i][v.j]]}</b> et ${TN[v.j]} ∘ ${TN[v.i]} = <b>${TN[D3[v.j][v.i]]}</b>`,
   ok:v=>D3[v.i][v.j]!==D3[v.j][v.i],
   why:'Par exemple r ∘ s₁ = s₃ mais s₁ ∘ r = s₂ : les deux cases symétriques par rapport à la diagonale diffèrent, la table n’est pas symétrique.'},
  {h:'Éléments réguliers',p:'<i>a</i> est <b>régulier</b> (ou <b>simplifiable</b>) si on peut le « barrer » des deux côtés : <i>a</i> ∗ <i>x</i> = <i>a</i> ∗ <i>y</i> ⇒ <i>x</i> = <i>y</i>, et <i>x</i> ∗ <i>a</i> = <i>y</i> ∗ <i>a</i> ⇒ <i>x</i> = <i>y</i>. Sur une table, la ligne et la colonne de <i>a</i> n’ont <b>aucune répétition</b>.<br><b>Contre-exemples :</b> 0 n’est pas régulier pour · dans ℤ (0 · 2 = 0 · 5) ; dans ℤ/6ℤ, 2 · 1 = 2 · 4 = 2, donc 2 n’est pas régulier.<br><b>Fait :</b> si ∗ est associative, tout élément symétrisable est régulier.',
   note:'C’est pour cela qu’on « simplifie » par un réel non nul : il a un inverse. Dans ℤ/6ℤ, on ne peut pas simplifier par 2.'},
  {h:'Pourquoi un symétrisable est régulier',p:'∗ est associative, <i>a</i> a un symétrique <i>a</i>′ et <i>a</i> ∗ <i>x</i> = <i>a</i> ∗ <i>y</i>. Quelle étape mène à <i>x</i> = <i>y</i>&nbsp;?',
   opts:['On soustrait <i>a</i> des deux côtés','On compose à gauche par <i>a</i>′ : <i>a</i>′ ∗ (<i>a</i> ∗ <i>x</i>) = <i>a</i>′ ∗ (<i>a</i> ∗ <i>y</i>), puis on regroupe (<i>a</i>′ ∗ <i>a</i>) ∗ <i>x</i> = (<i>a</i>′ ∗ <i>a</i>) ∗ <i>y</i>, soit <i>e</i> ∗ <i>x</i> = <i>e</i> ∗ <i>y</i>','On compose à droite par <i>a</i>′ : <i>a</i> ∗ <i>x</i> ∗ <i>a</i>′ = <i>a</i> ∗ <i>y</i> ∗ <i>a</i>′','On divise par <i>a</i>'],ans:1,
   why:'On compose du même côté que a, à gauche, puis l’associativité permet de regrouper a′ ∗ a = e. « Soustraire » ou « diviser » n’ont pas de sens pour une loi quelconque, et composer à droite laisse a collé à x.'},
  {h:'Réguliers dans ℤ/6ℤ',p:'Pour la multiplication dans ℤ/6ℤ, quels éléments non nuls sont réguliers&nbsp;?',
   opts:['1, 2, 3, 4 et 5','1 et 5 seulement','1, 3 et 5','1 seulement'],ans:1,
   why:'Ligne de 1 : 1, 2, 3, 4, 5 ; ligne de 5 : 5, 4, 3, 2, 1 (sans répétition). Ligne de 2 : 2, 4, 0, 2, 4 ; ligne de 3 : 3, 0, 3, 0, 3 ; ligne de 4 : 4, 2, 0, 4, 2. Ces trois-là se répètent.'},
  {h:'Distributivité',p:'Avec deux lois ∗ et ⊕ sur <i>E</i>, ∗ est <b>distributive</b> sur ⊕ si <b><i>a</i> ∗ (<i>b</i> ⊕ <i>c</i>) = (<i>a</i> ∗ <i>b</i>) ⊕ (<i>a</i> ∗ <i>c</i>)</b> et (<i>b</i> ⊕ <i>c</i>) ∗ <i>a</i> = (<i>b</i> ∗ <i>a</i>) ⊕ (<i>c</i> ∗ <i>a</i>).<br><b>Exemples :</b> · est distributive sur + ; ∩ est distributive sur ∪ et ∪ sur ∩.<br><b>Contre-exemple :</b> + n’est pas distributive sur · : 1 + (2 · 3) = 7 mais (1 + 2) · (1 + 3) = 12.',
   note:'La distributivité relie <b>deux</b> lois. Elle sera centrale dans les anneaux, où l’on additionne et multiplie.'},
  {h:'Qui se distribue ?',p:'Laquelle de ces égalités est vraie pour <b>tous</b> les réels <i>a</i>, <i>b</i>, <i>c</i>&nbsp;?',
   opts:['<i>a</i> · max(<i>b</i> ; <i>c</i>) = max(<i>ab</i> ; <i>ac</i>)','<i>a</i> + max(<i>b</i> ; <i>c</i>) = max(<i>a</i> + <i>b</i> ; <i>a</i> + <i>c</i>)','max(<i>a</i> ; <i>b</i> + <i>c</i>) = max(<i>a</i> ; <i>b</i>) + max(<i>a</i> ; <i>c</i>)','<i>a</i> + <i>bc</i> = (<i>a</i> + <i>b</i>)(<i>a</i> + <i>c</i>)'],ans:1,
   why:'Ajouter a ne change pas lequel de b et c est le plus grand : + est distributive sur max. Les autres échouent : pour a = −1, b = 0, c = 1, on a −1 · 1 = −1 mais max(0 ; −1) = 0 ; pour a = 1, b = c = 0, max(1 ; 0) = 1 mais 1 + 1 = 2 ; pour a = b = c = 1, 1 + 1 = 2 mais 2 · 2 = 4.'},
  {kind:'Problème',h:'La loi a + b − ab',
   p:'Sur ℝ, on définit <i>a</i> ∗ <i>b</i> = <i>a</i> + <i>b</i> − <i>ab</i>. Elle est clairement commutative. On veut trouver son neutre, ses symétriques, et prouver qu’elle est associative grâce à une astuce. Un élément joue un rôle à part : on va le débusquer.',
   parts:[
    {q:'a) Calcule 2 ∗ 3.',lab:'2 ∗ 3 =',ans:-1,hint:'Remplace a par 2 et b par 3 dans la formule.',why:'2 + 3 − 6 = −1.'},
    {q:'b) Quel est l’élément neutre&nbsp;?',lab:'e =',ans:0,hint:'Résous a + e − ae = a, c’est-à-dire e(1 − a) = 0, pour tout a.',why:'e(1 − a) = 0 pour tout a impose e = 0 (prends a = 0), et a ∗ 0 = a.'},
    {q:'c) Quel est le symétrique de 3&nbsp;?',lab:'x =',ans:1.5,tol:0.001,hint:'Résous 3 + x − 3x = 0.',why:'3 − 2x = 0 donne x = 1,5. Vérification : 3 + 1,5 − 4,5 = 0.'},
    {q:'d) Quel réel n’a pas de symétrique&nbsp;?',lab:'a =',ans:1,hint:'L’équation a + x − ax = 0 s’écrit x(1 − a) = −a. Quand ne peut-on pas diviser&nbsp;?',why:'Pour a = 1 l’équation devient 0 = −1. D’ailleurs 1 ∗ b = 1 + b − b = 1 pour tout b : 1 absorbe tout.'},
    {q:'e) Quelle remarque prouve l’associativité le plus vite&nbsp;?',opts:['2 ∗ 3 = 3 ∗ 2','1 − (<i>a</i> ∗ <i>b</i>) = (1 − <i>a</i>)(1 − <i>b</i>), et le produit des réels est associatif','La loi a un neutre','(0 ∗ 1) ∗ 2 = 0 ∗ (1 ∗ 2)'],ans:1,
     hint:'Développe (1 − a)(1 − b) et compare avec 1 − (a + b − ab).',why:'(1 − a)(1 − b) = 1 − a − b + ab = 1 − (a ∗ b). Alors 1 − ((a ∗ b) ∗ c) = (1 − a)(1 − b)(1 − c) = 1 − (a ∗ (b ∗ c)). Un exemple numérique, lui, ne prouve rien.'},
   ],
   sol:'Commutativité : a + b − ab est symétrique en a et b.<br>Neutre : a + e − ae = a ⇔ e(1 − a) = 0 pour tout a, d’où e = 0.<br>Symétrique : a + x − ax = 0 ⇔ x(1 − a) = −a. Si a ≠ 1, x = a/(a − 1) (pour a = 3, x = 1,5). Si a = 1, pas de solution.<br>Associativité : on remarque 1 − (a ∗ b) = (1 − a)(1 − b). Donc 1 − ((a ∗ b) ∗ c) = (1 − a)(1 − b)(1 − c) = 1 − (a ∗ (b ∗ c)), ce qui donne (a ∗ b) ∗ c = a ∗ (b ∗ c).<br>Bilan : ∗ est associative, commutative, de neutre 0, et tout réel sauf 1 a un symétrique.'},
  {kind:'Problème',h:'Symétrique, mais pas simplifiable',
   p:'Sur <i>E</i> = {0 ; 1 ; 2 ; 3}, on pose <i>a</i> ∗ <i>b</i> = |<i>a</i> − <i>b</i>|, l’écart entre <i>a</i> et <i>b</i>. La table est ci-dessous. On a vu que, pour une loi <b>associative</b>, tout élément symétrisable est régulier. On va voir ce qui se passe ici.',
   fig:cay(['0','1','2','3'],tab(4,(i,j)=>Math.abs(i-j))),
   parts:[
    {q:'a) Quel est le neutre de ∗&nbsp;?',lab:'e =',ans:0,hint:'Cherche la ligne qui recopie l’en-tête.',why:'|a − 0| = a = |0 − a| pour tout a ∈ E : 0 est neutre.'},
    {q:'b) Quel est le symétrique de 3&nbsp;?',lab:'x =',ans:3,hint:'Cherche le neutre 0 dans la ligne de 3.',why:'|3 − x| = 0 donne x = 3. En fait, chaque élément est son propre symétrique.'},
    {q:'c) Calcule (1 ∗ 2) ∗ 3.',lab:'(1 ∗ 2) ∗ 3 =',ans:2,hint:'Calcule d’abord 1 ∗ 2, puis compose avec 3.',why:'1 ∗ 2 = 1, puis 1 ∗ 3 = 2. Or 1 ∗ (2 ∗ 3) = 1 ∗ 1 = 0 : la loi n’est pas associative.'},
    {q:'d) Combien d’éléments de <i>E</i> sont réguliers&nbsp;?',lab:'réguliers :',ans:2,hint:'La loi est commutative : il suffit de chercher les lignes sans répétition.',why:'Lignes : 0 → (0, 1, 2, 3) et 3 → (3, 2, 1, 0) sans répétition ; 1 → (1, 0, 1, 2) et 2 → (2, 1, 0, 1) répètent. Seuls 0 et 3 sont réguliers.'},
    {q:'e) 1 est symétrisable mais pas régulier. Pourquoi n’est-ce pas contradictoire&nbsp;?',opts:['Parce que E est fini','Parce que la loi n’est pas commutative','Parce que la loi n’est pas associative, et la preuve « symétrisable ⇒ régulier » regroupe a′ ∗ (a ∗ x) en (a′ ∗ a) ∗ x','Parce que 0 n’est pas vraiment neutre'],ans:2,
     hint:'Relis la preuve : quelle propriété utilise-t-elle pour regrouper ?',why:'La preuve utilise l’associativité. Ici 1 ∗ 0 = 1 ∗ 2 = 1 avec 0 ≠ 2 : sans associativité, avoir un symétrique ne suffit plus à simplifier.'},
   ],
   sol:'La table est symétrique : ∗ est commutative. 0 est neutre car |a − 0| = a. Chaque élément est son propre symétrique, car |a − a| = 0.<br>Mais (1 ∗ 2) ∗ 3 = 1 ∗ 3 = 2 alors que 1 ∗ (2 ∗ 3) = 1 ∗ 1 = 0 : ∗ n’est pas associative.<br>Régularité : les lignes de 0 et de 3 sont des permutations de E, celles de 1 et 2 contiennent des répétitions (1 ∗ 0 = 1 ∗ 2). Seuls <b>0 et 3</b> sont réguliers.<br>Il n’y a pas de contradiction avec « symétrisable ⇒ régulier » : ce résultat suppose la loi associative, ce qui n’est pas le cas ici.'},
]},

/* ===================== 2. NOTION DE GROUPE ===================== */
{subj:'gred',sem:'grp',id:'gred-groupes',h:'Notion de groupe',p:'Les quatre axiomes d’un groupe, leurs premières conséquences (simplification, équations, carré latin), les puissances, et une galerie d’exemples et de contre-exemples.',steps:[
  {h:'Définition',p:'Un <b>groupe</b> est un ensemble <i>G</i> muni d’une loi ∗ telle que :<br>1) ∗ est <b>interne</b> : <i>a</i> ∗ <i>b</i> ∈ <i>G</i> ;<br>2) ∗ est <b>associative</b> ;<br>3) il existe un <b>neutre</b> <i>e</i> ;<br>4) tout élément <i>a</i> a un <b>symétrique</b> dans <i>G</i>.<br>Si de plus ∗ est commutative, le groupe est <b>abélien</b> (ou commutatif). Les cinq situations du chapitre précédent sont des groupes ; seul le triangle (et les bijections de {1 ; 2 ; 3}) n’est pas abélien.',
   note:'Par le chapitre précédent, le neutre et le symétrique sont <b>uniques</b> dans un groupe. On peut donc dire « <b>le</b> symétrique ».'},
  {h:'Deux notations',p:'<b>Notation multiplicative</b> : on écrit <i>ab</i> pour <i>a</i> ∗ <i>b</i>, le neutre est <i>e</i> (ou 1), le symétrique s’appelle l’<b>inverse</b> et se note <i>a</i>⁻¹.<br><b>Notation additive</b>, réservée aux groupes abéliens : <i>a</i> + <i>b</i>, neutre 0, symétrique l’<b>opposé</b> −<i>a</i>.<br>Par défaut, on raisonne en notation multiplicative. Dans le triangle, <i>ab</i> veut dire <i>a</i> ∘ <i>b</i> : d’abord <i>b</i>, puis <i>a</i>.',
   note:'Un groupe se note (<i>G</i>, ∗) : l’ensemble <b>et</b> la loi. Le même ensemble peut être un groupe pour une loi et pas pour une autre : ℤ avec + oui, ℤ avec · non.'},
  {h:'Groupe ou pas ?',p:'Lequel de ces couples est un groupe&nbsp;?',
   opts:['(ℕ, +)','(ℤ, −)','(ℚ*, ·)','(ℤ, ·)'],ans:2,
   why:'Dans ℚ*, le produit de deux rationnels non nuls est non nul, · est associative, 1 est neutre et l’inverse de p/q est q/p. (ℕ, +) : 1 n’a pas d’opposé dans ℕ. (ℤ, −) : pas associative. (ℤ, ·) : 2 n’a pas d’inverse entier.'},
  {kind:'Méthode',h:'Vérifier qu’on a un groupe',
   p:'<b>Quand :</b> on te donne un ensemble et une loi. <b>Comment :</b> tu coches les quatre axiomes <b>dans l’ordre</b>, en prouvant chacun pour des éléments quelconques. Le piège est souvent au point 1 (le résultat sort de l’ensemble) ou au point 4 (le symétrique existe dans un ensemble plus grand, mais pas dans <i>G</i>). <b>Pour réfuter :</b> un seul axiome en défaut suffit, avec un contre-exemple précis.',
   demo:{enonce:'<i>G</i> = ℝ \\ {−1} avec <i>a</i> ∗ <i>b</i> = <i>a</i> + <i>b</i> + <i>ab</i>. Est-ce un groupe&nbsp;?',
    etapes:[{f:'Interne : 1 + <i>a</i> ∗ <i>b</i> = (1 + <i>a</i>)(1 + <i>b</i>) ≠ 0 si <i>a</i>, <i>b</i> ≠ −1. Donc <i>a</i> ∗ <i>b</i> ≠ −1.',w:'Il faut vérifier que le résultat ne vaut jamais la valeur exclue.'},
     {f:'Associative et commutative : vu au chapitre précédent.',w:'On réutilise ce qu’on a déjà prouvé.'},
     {f:'Neutre : 0, et 0 ∈ <i>G</i>.',w:'Le neutre doit appartenir à G.'},
     {f:'Symétrique : <i>a</i>′ = −<i>a</i>/(1 + <i>a</i>). Est-il ≠ −1 ? −<i>a</i>/(1 + <i>a</i>) = −1 ⇔ −<i>a</i> = −1 − <i>a</i> ⇔ 0 = −1 : impossible.',w:'Le symétrique doit lui aussi rester dans G.'}],
    conclusion:'(ℝ \\ {−1}, ∗) est un <b>groupe abélien</b>. Sur ℝ tout entier, ce n’en est pas un : −1 n’a pas de symétrique.'}},
  {h:'Quel axiome tombe ?',p:'Pourquoi (ℤ, ·) n’est-il pas un groupe&nbsp;?',
   opts:['La multiplication n’est pas associative','Il n’y a pas d’élément neutre','La loi n’est pas interne','2 n’a pas de symétrique dans ℤ'],ans:3,
   why:'· est interne, associative, de neutre 1. Mais 2 · x = 1 n’a pas de solution entière : 2 n’a pas d’inverse dans ℤ (seuls 1 et −1 en ont).'},
  {h:'Retirer le zéro ne suffit pas',p:'On essaie de faire de (ℤ/6ℤ \\ {0}, ·) un groupe. Quel axiome échoue en premier&nbsp;?',
   opts:['La loi n’est pas interne : 2 · 3 = 0 sort de l’ensemble','Il n’y a pas de neutre','La loi n’est pas associative','5 n’a pas d’inverse'],ans:0,
   why:'Dans ℤ/6ℤ, 2 · 3 = 6 ≡ 0, qu’on a justement retiré. Le neutre 1 existe, la loi est associative, et 5 · 5 = 25 ≡ 1 : 5 est son propre inverse.'},
  {h:'Premières règles de calcul',p:'Dans un groupe <i>G</i>, pour tous <i>a</i>, <i>b</i>, <i>x</i>, <i>y</i> :<br>• <b>simplification</b> : <i>ax</i> = <i>ay</i> ⇒ <i>x</i> = <i>y</i>, et <i>xa</i> = <i>ya</i> ⇒ <i>x</i> = <i>y</i> (tout élément est régulier) ;<br>• <b>(<i>a</i>⁻¹)⁻¹ = <i>a</i></b> ;<br>• <b>(<i>ab</i>)⁻¹ = <i>b</i>⁻¹<i>a</i>⁻¹</b>, avec l’ordre <b>inversé</b>.',
   note:'Pour défaire « chaussettes puis chaussures », on enlève d’abord les chaussures. Dans un groupe abélien, (ab)⁻¹ = a⁻¹b⁻¹, mais pas en général.'},
  {h:'Preuve guidée : l’inverse d’un produit',p:'Pour prouver que (<i>ab</i>)⁻¹ = <i>b</i>⁻¹<i>a</i>⁻¹, que suffit-il de faire&nbsp;?',
   opts:['Vérifier sur un exemple numérique','Calculer (<i>ab</i>)(<i>b</i>⁻¹<i>a</i>⁻¹) = <i>a</i>(<i>bb</i>⁻¹)<i>a</i>⁻¹ = <i>aa</i>⁻¹ = <i>e</i>, et de même (<i>b</i>⁻¹<i>a</i>⁻¹)(<i>ab</i>) = <i>e</i>','Calculer (<i>ab</i>)(<i>a</i>⁻¹<i>b</i>⁻¹) = <i>e</i>','Utiliser la commutativité'],ans:1,
   why:'L’inverse est unique : il suffit de montrer que b⁻¹a⁻¹ joue le rôle d’inverse de ab, des deux côtés. L’associativité permet de regrouper bb⁻¹ = e au milieu. Le groupe n’a pas besoin d’être abélien.'},
  {h:'Inverse dans le triangle',p:'Dans le groupe du triangle, <i>r</i>⁻¹ = <i>r</i>² et chaque symétrie est son propre inverse. Que vaut (<i>r</i> ∘ <i>s</i>₁)⁻¹&nbsp;?',
   fig:cay(TN,D3,{op:'∘'}),
   opts:['<i>s</i>₂','<i>r</i>²','<i>s</i>₃','<i>e</i>'],ans:2,
   why:'(r ∘ s₁)⁻¹ = s₁⁻¹ ∘ r⁻¹ = s₁ ∘ r² = s₃ (ligne s₁, colonne r²). Contrôle : r ∘ s₁ = s₃ est une symétrie, donc son propre inverse. Le piège r⁻¹ ∘ s₁⁻¹ = r² ∘ s₁ donne s₂ : faux.'},
  {h:'Les équations ont une solution unique',p:'Dans un groupe, l’équation <b><i>ax</i> = <i>b</i></b> a une unique solution <b><i>x</i> = <i>a</i>⁻¹<i>b</i></b>, et <b><i>xa</i> = <i>b</i></b> a l’unique solution <b><i>x</i> = <i>ba</i>⁻¹</b>.<br>Conséquence sur la table d’un groupe fini : dans chaque ligne (et chaque colonne), chaque élément apparaît <b>exactement une fois</b>. La table est un <b>carré latin</b>, comme une grille de sudoku. Parcours les lignes.',
   params:[{id:'i',l:'ligne',min:0,max:5,v:0}],
   draw:v=>cay(TN,D3,{op:'∘',row:v.i}),
   info:v=>`Ligne de ${TN[v.i]} : ${D3[v.i].map(k=>TN[k]).join(', ')}. Les six éléments, chacun une fois : x ↦ ${TN[v.i]} ∘ x est une bijection.`,
   note:'Existence : a(a⁻¹b) = b. Unicité : si ax = ax′, on simplifie par a. Attention : a⁻¹b et ba⁻¹ sont en général différents.'},
  {kind:'Méthode',h:'Résoudre une équation dans un groupe',
   p:'<b>Quand :</b> l’inconnue <i>x</i> est collée à un élément connu. <b>Comment :</b> on compose les deux membres par l’inverse de cet élément, <b>du même côté</b> que lui. <i>ax</i> = <i>b</i> : on compose à gauche par <i>a</i>⁻¹. <i>xa</i> = <i>b</i> : on compose à droite par <i>a</i>⁻¹. Puis on vérifie en remplaçant.',
   demo:{enonce:'Dans le groupe du triangle, résous <i>r</i> ∘ <i>x</i> = <i>s</i>₂, puis <i>x</i> ∘ <i>r</i> = <i>s</i>₂. Dans ((ℤ/7ℤ)*, ·), résous 3<i>x</i> = 5.',
    etapes:[{f:'<i>r</i> ∘ <i>x</i> = <i>s</i>₂ ⇒ <i>x</i> = <i>r</i>⁻¹ ∘ <i>s</i>₂ = <i>r</i>² ∘ <i>s</i>₂ = <i>s</i>₃.',w:'r est à gauche : on compose à gauche par r⁻¹ = r², puis on lit la table (ligne r², colonne s₂).'},
     {f:'Vérification : <i>r</i> ∘ <i>s</i>₃ = <i>s</i>₂ (ligne <i>r</i>, colonne <i>s</i>₃).',w:'On remplace x dans l’équation de départ.'},
     {f:'<i>x</i> ∘ <i>r</i> = <i>s</i>₂ ⇒ <i>x</i> = <i>s</i>₂ ∘ <i>r</i>² = <i>s</i>₁. Vérification : <i>s</i>₁ ∘ <i>r</i> = <i>s</i>₂.',w:'Cette fois r est à droite. La solution change : le groupe n’est pas abélien.'},
     {f:'Dans (ℤ/7ℤ)* : 3 · 5 = 15 ≡ 1, donc 3⁻¹ = 5, et <i>x</i> = 5 · 5 = 25 ≡ 4.',w:'On cherche d’abord l’inverse de 3 en parcourant 3 · 1, 3 · 2, … jusqu’à obtenir 1.'},
     {f:'Vérification : 3 · 4 = 12 ≡ 5.',w:'On contrôle toujours.'}],
    conclusion:'<i>r</i> ∘ <i>x</i> = <i>s</i>₂ ⇔ <i>x</i> = <i>s</i>₃ ; <i>x</i> ∘ <i>r</i> = <i>s</i>₂ ⇔ <i>x</i> = <i>s</i>₁ ; 3<i>x</i> = 5 dans (ℤ/7ℤ)* ⇔ <i>x</i> = 4.'}},
  {h:'Une équation modulo 7',p:'Dans ((ℤ/7ℤ)*, ·), résous 4<i>x</i> = 6 (donne le représentant entre 1 et 6).',lab:'x =',ans:5,
   why:'4 · 2 = 8 ≡ 1, donc 4⁻¹ = 2 et x = 2 · 6 = 12 ≡ 5. Vérification : 4 · 5 = 20 ≡ 6.'},
  {kind:'Pratique',h:'Trouve le mouvement manquant',p:'Dans le groupe du triangle, on fait d’abord <i>s</i>₁, puis un mouvement <i>x</i>. Règle <i>x</i> pour que le résultat soit la rotation <i>r</i>, c’est-à-dire <i>x</i> ∘ <i>s</i>₁ = <i>r</i>.',
   params:[{id:'g',l:'x',min:0,max:5,v:0}],
   draw:v=>tri3(3,v.g),
   ok:v=>D3[v.g][3]===1,
   why:'x ∘ s₁ = r ⇒ x = r ∘ s₁⁻¹ = r ∘ s₁ = s₃. On compose à droite par s₁⁻¹ = s₁, du côté où se trouve s₁.'},
  {h:'Puissances',p:'Pour <i>n</i> ∈ ℕ*, <i>a</i>ⁿ = <i>a</i> <i>a</i> ⋯ <i>a</i> (<i>n</i> facteurs), <i>a</i>⁰ = <i>e</i> et <i>a</i>⁻ⁿ = (<i>a</i>⁻¹)ⁿ. On a, pour tous <i>m</i>, <i>n</i> ∈ ℤ :<br><b><i>a</i>ᵐ<i>a</i>ⁿ = <i>a</i>ᵐ⁺ⁿ</b> et <b>(<i>a</i>ᵐ)ⁿ = <i>a</i>ᵐⁿ</b>.<br>En notation additive, <i>a</i>ⁿ devient <b><i>n</i> · <i>a</i></b> = <i>a</i> + ⋯ + <i>a</i>, et −<i>n</i> · <i>a</i> = <i>n</i> · (−<i>a</i>).',
   note:'<b>Piège :</b> (<i>ab</i>)ⁿ = <i>a</i>ⁿ<i>b</i>ⁿ est faux en général. Dans le triangle, (<i>r</i> ∘ <i>s</i>₁)² = <i>s</i>₃ ∘ <i>s</i>₃ = <i>e</i>, mais <i>r</i>² ∘ <i>s</i>₁² = <i>r</i>². C’est vrai si <i>a</i> et <i>b</i> commutent.'},
  {h:'Une puissance additive',p:'Dans (ℤ/12ℤ, +), calcule 5 · 7 = 7 + 7 + 7 + 7 + 7 (représentant entre 0 et 11).',lab:'5 · 7 =',ans:11,
   why:'7 + 7 + 7 + 7 + 7 = 35 = 2 · 12 + 11, donc 5 · 7 ≡ 11 dans ℤ/12ℤ.'},
  {h:'Galerie de groupes finis',p:'Fais défiler quatre groupes et observe leur table :<br>• (ℤ/4ℤ, +), l’horloge à 4 heures ;<br>• le <b>groupe de Klein</b> <i>V</i> = {<i>e</i>, <i>a</i>, <i>b</i>, <i>c</i>} : les isométries d’un rectangle non carré (identité, deux symétries d’axe, demi-tour) ;<br>• ((ℤ/5ℤ)*, ·), les classes non nulles modulo 5 ;<br>• <i>D</i>₃, le groupe du triangle (<b>groupe diédral</b>).',
   params:[{id:'g',l:'groupe',min:0,max:3,v:0}],
   draw:v=>{ const G=[GZ4,GV,GU5,GD3][v.g]; return cay(G.nm,G.T,{op:G.op}); },
   info:v=>['(ℤ/4ℤ, +) : abélien, d’ordre 4. 1 + 1 = 2 ≠ 0 : un élément n’est pas son propre opposé.',
     'Klein : abélien, d’ordre 4. La diagonale ne contient que e : chaque élément est son propre inverse. Le produit de deux éléments distincts non neutres est le troisième.',
     '((ℤ/5ℤ)*, ·) : abélien, d’ordre 4. Même motif de couleurs que ℤ/4ℤ, une fois ses éléments rangés comme 1, 2, 4, 3.',
     'D₃ : d’ordre 6 et <b>non abélien</b> : la table n’est pas symétrique par rapport à la diagonale.'][v.g],
   note:'Les groupes infinis à connaître : (ℤ, +), (ℚ, +), (ℝ, +), (ℚ*, ·), (ℝ*, ·), et le groupe 𝔖(<i>E</i>) des bijections d’un ensemble <i>E</i> muni de ∘.'},
  {kind:'Méthode',h:'Compléter la table d’un groupe',
   p:'<b>Quand :</b> on connaît une partie de la table d’un groupe fini. <b>Outils :</b> 1) la ligne et la colonne du neutre recopient l’en-tête ; 2) carré latin : chaque élément apparaît une seule fois par ligne et par colonne. On remplit d’abord les cases où il ne reste qu’un seul candidat.',
   demo:{enonce:'Un groupe a trois éléments <i>e</i>, <i>a</i>, <i>b</i>, de neutre <i>e</i>. Remplis sa table.',
    etapes:[{f:'Ligne et colonne de <i>e</i> : <i>e</i>, <i>a</i>, <i>b</i>.',w:'Propriété du neutre.'},
     {f:'Case <i>a</i> ∗ <i>a</i> : pas <i>a</i> (déjà dans la ligne <i>a</i>). Si c’était <i>e</i>, alors <i>a</i> ∗ <i>b</i> = <i>b</i>, mais <i>b</i> est déjà dans la colonne <i>b</i> (<i>e</i> ∗ <i>b</i> = <i>b</i>). Donc <i>a</i> ∗ <i>a</i> = <i>b</i>.',w:'On teste les candidats et on élimine ceux qui créent une répétition.'},
     {f:'Puis <i>a</i> ∗ <i>b</i> = <i>e</i> (dernier élément libre de la ligne <i>a</i>).',w:'Il ne reste qu’un candidat.'},
     {f:'Ligne <i>b</i> : <i>b</i> ∗ <i>a</i> = <i>e</i> (colonne <i>a</i> contient déjà <i>a</i> et <i>b</i>) et <i>b</i> ∗ <i>b</i> = <i>a</i>.',w:'On complète par les colonnes.'},
     {f:cay(['e','a','b'],tab(3,(i,j)=>(i+j)%3)),w:'Table obtenue : c’est celle de ℤ/3ℤ, avec e = 0, a = 1, b = 2.'}],
    conclusion:'Il n’y a qu’<b>une</b> table possible pour un groupe à 3 éléments : à un changement de noms près, c’est (ℤ/3ℤ, +).'}},
  {h:'Sudoku d’un groupe d’ordre 4',p:'Un groupe a quatre éléments <i>e</i>, <i>a</i>, <i>b</i>, <i>c</i>, de neutre <i>e</i>, et l’on sait que <i>a</i> ∗ <i>a</i> = <i>b</i>. Que vaut <i>a</i> ∗ <i>c</i>&nbsp;?',
   opts:['<i>a</i>','<i>b</i>','<i>c</i>','<i>e</i>'],ans:3,
   why:'Dans la ligne a, a et b sont déjà placés (a ∗ e = a, a ∗ a = b). Il reste c et e pour a ∗ b et a ∗ c. Or a ∗ c ≠ c, car c est déjà dans la colonne c (e ∗ c = c). Donc a ∗ c = e (et a ∗ b = c).'},
  {kind:'Méthode',h:'Inverser modulo un nombre premier',
   p:'Soit <i>p</i> premier. On veut voir que ((ℤ/<i>p</i>ℤ)*, ·) est un groupe, et savoir y calculer un inverse. <b>Pourquoi ça marche :</b> si <i>a</i> ≢ 0 et <i>ab</i> ≡ <i>ac</i>, alors <i>p</i> divise <i>a</i>(<i>b</i> − <i>c</i>) ; comme <i>p</i> est premier et ne divise pas <i>a</i>, il divise <i>b</i> − <i>c</i> (lemme d’Euclide). Donc <i>x</i> ↦ <i>ax</i> est injective sur l’ensemble fini (ℤ/<i>p</i>ℤ)*, donc bijective : la valeur 1 est atteinte une fois. <b>Comment calculer :</b> on parcourt <i>a</i> · 1, <i>a</i> · 2, … jusqu’à tomber sur 1 (ou on repère un multiple de <i>p</i> plus 1).',
   demo:{enonce:'Trouve l’inverse de 3 dans (ℤ/11ℤ)*.',
    etapes:[{f:'3 · 1 = 3, 3 · 2 = 6, 3 · 3 = 9, 3 · 4 = 12 ≡ 1.',w:'On parcourt la ligne de 3 jusqu’à trouver 1.'},
     {f:'Autre voie : on cherche un nombre ≡ 1 modulo 11 et divisible par 3 : 12 = 3 · 4.',w:'Les candidats sont 1, 12, 23, 34, … : le premier multiple de 3 donne l’inverse.'},
     {f:'Vérification : 4 · 3 = 12 = 11 + 1.',w:'Le produit est commutatif, une seule vérification suffit.'}],
    conclusion:'3⁻¹ = <b>4</b> dans (ℤ/11ℤ)*. Le groupe est abélien d’ordre <i>p</i> − 1. Si <i>n</i> n’est pas premier, (ℤ/<i>n</i>ℤ \\ {0}, ·) n’est <b>pas</b> un groupe (6 = 2 · 3 donne 2 · 3 ≡ 0).'}},
  {h:'Inverse modulo 13',p:'Quel est l’inverse de 5 dans (ℤ/13ℤ)* (représentant entre 1 et 12)&nbsp;?',lab:'5⁻¹ =',ans:8,
   why:'Les nombres ≡ 1 modulo 13 sont 1, 14, 27, 40, … ; 40 = 5 · 8. Donc 5 · 8 ≡ 1 et 5⁻¹ = 8.'},
  {h:'Matrices inversibles et bijections',p:'<b>Bijections :</b> pour tout ensemble <i>E</i>, les bijections de <i>E</i> sur <i>E</i> forment un groupe pour ∘, noté 𝔖(<i>E</i>) : la composée de deux bijections est une bijection, ∘ est associative, l’identité est neutre, la réciproque est l’inverse.<br><b>Matrices :</b> le produit de deux matrices 2 × 2 se calcule « ligne par colonne » : '+mat([['a','b'],['c','d']])+' '+mat([["a′","b′"],["c′","d′"]])+' = '+mat([["aa′ + bc′","ab′ + bd′"],["ca′ + dc′","cb′ + dd′"]])+'. Une matrice est inversible si son <b>déterminant</b> <i>ad</i> − <i>bc</i> est non nul. Comme det(<i>AB</i>) = det <i>A</i> · det <i>B</i>, les matrices inversibles forment un groupe, noté GL₂(ℝ), de neutre '+mat([[1,0],[0,1]])+'.',
   note:'GL₂(ℝ) et 𝔖(<i>E</i>) (dès que <i>E</i> a au moins 3 éléments) ne sont <b>pas</b> abéliens. Les matrices 2 × 2 seront étudiées en détail dans la partie « Anneaux et corps ».'},
  {h:'Deux matrices qui ne commutent pas',p:'Soit <i>A</i> = '+mat([[1,1],[0,1]])+' et <i>B</i> = '+mat([[1,0],[1,1]])+'. Calcule le coefficient en haut à gauche de <i>AB</i>.',lab:'(AB)₁₁ =',ans:2,
   why:'AB = '+mat([[2,1],[1,1]])+' : 1 · 1 + 1 · 1 = 2. Mais BA = '+mat([[1,1],[1,2]])+', de coefficient 1 en haut à gauche : AB ≠ BA.'},
  {h:'Ordre d’un groupe',p:'Si <i>G</i> est fini, son <b>ordre</b> est son nombre d’éléments, noté |<i>G</i>| (ou card <i>G</i>). Exemples : |ℤ/<i>n</i>ℤ| = <i>n</i>, |<i>V</i>| = 4, |<i>D</i>₃| = 6, |(ℤ/<i>p</i>ℤ)*| = <i>p</i> − 1, et |𝔖(<i>E</i>)| = <i>n</i>! si <i>E</i> a <i>n</i> éléments. Les groupes ℤ, ℚ*, GL₂(ℝ) sont d’ordre infini.',
   note:'On verra au chapitre suivant que l’ordre d’un groupe impose de fortes contraintes sur ce qu’il peut contenir.'},
  {h:'Combien de bijections ?',p:'Quel est l’ordre du groupe 𝔖({1 ; 2 ; 3 ; 4}) des bijections de {1 ; 2 ; 3 ; 4}&nbsp;?',lab:'ordre =',ans:24,
   why:'Il y a 4 choix pour l’image de 1, puis 3 pour celle de 2, 2 pour celle de 3 et 1 pour celle de 4 : 4! = 24.'},
  {kind:'Problème',h:'Le groupe des inversibles modulo 10',
   p:'Modulo 10, ℤ/10ℤ \\ {0} n’est pas un groupe pour ·, car 2 · 5 ≡ 0. On garde seulement <i>U</i> = {1 ; 3 ; 7 ; 9}, les chiffres premiers avec 10. On admet que · est interne sur <i>U</i> (le produit de deux nombres premiers avec 10 l’est encore) et associative. Sa table est ci-dessous. On veut montrer que (<i>U</i>, ·) est un groupe et le comparer aux deux groupes d’ordre 4 de la galerie.',
   fig:cay(['1','3','7','9'],tab(4,(i,j)=>{ const u=[1,3,7,9]; return u.indexOf(u[i]*u[j]%10); }),{op:'·'}),
   parts:[
    {q:'a) Quel est l’inverse de 3 dans <i>U</i>&nbsp;?',lab:'3⁻¹ =',ans:7,hint:'Cherche 1 dans la ligne de 3.',why:'3 · 7 = 21 ≡ 1 modulo 10.'},
    {q:'b) Que vaut 3² dans <i>U</i>&nbsp;?',lab:'3² =',ans:9,hint:'3 · 3, puis réduis modulo 10.',why:'3 · 3 = 9.'},
    {q:'c) Résous 7<i>x</i> = 9 dans <i>U</i>.',lab:'x =',ans:7,hint:'Compose à gauche par 7⁻¹, que tu connais par la question a).',why:'7⁻¹ = 3, donc x = 3 · 9 = 27 ≡ 7. Vérification : 7 · 7 = 49 ≡ 9.'},
    {q:'d) La table de <i>U</i> ressemble-t-elle à celle de Klein ou à celle de ℤ/4ℤ&nbsp;?',opts:['À Klein : chaque élément est son propre inverse','À ℤ/4ℤ : 3² = 9 ≠ 1, et les puissances de 3 parcourent 3, 9, 7, 1 comme 1, 2, 3, 0 sur l’horloge','Aux deux à la fois','À aucune des deux : U n’est pas un groupe'],ans:1,
     hint:'Regarde la diagonale : dans le groupe de Klein, elle ne contient que le neutre.',why:'3² = 9 ≠ 1, donc ce n’est pas Klein. 3¹ = 3, 3² = 9, 3³ = 27 ≡ 7, 3⁴ = 21 ≡ 1 : en renommant 3ᵏ en k, on retrouve exactement l’horloge ℤ/4ℤ.'},
   ],
   sol:'On admet interne et associative. Le neutre est 1 (sa ligne recopie l’en-tête). Inverses : 1⁻¹ = 1, 3⁻¹ = 7 (21 ≡ 1), 7⁻¹ = 3, 9⁻¹ = 9 (81 ≡ 1). Donc (U, ·) est un groupe abélien d’ordre 4.<br>Équation : 7x = 9 ⇒ x = 7⁻¹ · 9 = 3 · 9 = 27 ≡ 7.<br>Comparaison : la diagonale contient 1, 9, 9, 1, pas seulement le neutre, donc U n’a pas la structure de Klein. Les puissances de 3 valent 3, 9, 7, 1 : tout élément est une puissance de 3, et 3ᵃ · 3ᵇ = 3ᵃ⁺ᵇ avec a + b lu modulo 4. U se comporte <b>exactement comme ℤ/4ℤ</b>.'},
  {kind:'Problème',h:'Le groupe des fonctions affines',
   p:'Pour <i>a</i> ≠ 0 et <i>b</i> réels, on note <i>f</i><sub><i>a</i>,<i>b</i></sub> la fonction <i>x</i> ↦ <i>ax</i> + <i>b</i>. Ce sont des bijections de ℝ. L’ensemble <i>A</i> de ces fonctions, muni de la composition ∘, est un groupe. On va calculer dedans, en particulier résoudre une équation, et constater qu’il n’est pas abélien.',
   parts:[
    {q:'a) <i>f</i><sub>2,1</sub> ∘ <i>f</i><sub>3,−1</sub> s’écrit <i>f</i><sub>6,<i>b</i></sub>. Que vaut <i>b</i>&nbsp;?',lab:'b =',ans:-1,hint:'Calcule 2(3x − 1) + 1.',why:'2(3x − 1) + 1 = 6x − 1 : b = −1. En général f<sub>a,b</sub> ∘ f<sub>c,d</sub> = f<sub>ac, ad + b</sub>, et ac ≠ 0 : la loi est interne.'},
    {q:'b) <i>f</i><sub>3,−1</sub> ∘ <i>f</i><sub>2,1</sub> s’écrit <i>f</i><sub>6,<i>b</i></sub>. Que vaut <i>b</i>&nbsp;?',lab:'b =',ans:2,hint:'Calcule 3(2x + 1) − 1.',why:'3(2x + 1) − 1 = 6x + 2 : b = 2 ≠ −1. Le groupe n’est pas abélien.'},
    {q:'c) L’inverse de <i>f</i><sub>2,1</sub> est <i>f</i><sub>1/2,<i>b</i></sub>. Que vaut <i>b</i>&nbsp;?',lab:'b =',ans:-0.5,tol:0.001,hint:'Résous y = 2x + 1 en x.',why:'x = (y − 1)/2 = ½ y − ½ : b = −0,5. Contrôle : 2(½x − ½) + 1 = x, l’identité f<sub>1,0</sub>, qui est le neutre.'},
    {q:'d) On cherche <i>g</i> ∈ <i>A</i> tel que <i>f</i><sub>2,1</sub> ∘ <i>g</i> = <i>f</i><sub>4,5</sub>. Que vaut <i>g</i>(0)&nbsp;?',lab:'g(0) =',ans:2,hint:'g est à droite de f<sub>2,1</sub> : compose à gauche par l’inverse trouvé en c).',why:'g = f<sub>1/2, −1/2</sub> ∘ f<sub>4,5</sub> : x ↦ ½(4x + 5) − ½ = 2x + 2. Donc g(0) = 2. Vérification : 2(2x + 2) + 1 = 4x + 5.'},
    {q:'e) Et si l’on cherche <i>h</i> avec <i>h</i> ∘ <i>f</i><sub>2,1</sub> = <i>f</i><sub>4,5</sub>, que vaut <i>h</i>(0)&nbsp;?',lab:'h(0) =',ans:3,hint:'h = f<sub>4,5</sub> ∘ f<sub>2,1</sub>⁻¹ : compose à droite.',why:'h(x) = 4(½x − ½) + 5 = 2x + 3, donc h(0) = 3 ≠ g(0). Vérification : 2(2x + 1) + 3 = 4x + 5.'},
   ],
   sol:'Composition : f<sub>a,b</sub> ∘ f<sub>c,d</sub> (x) = a(cx + d) + b = acx + (ad + b), donc f<sub>a,b</sub> ∘ f<sub>c,d</sub> = f<sub>ac, ad + b</sub>, avec ac ≠ 0 : la loi est interne. Elle est associative (composition), de neutre f<sub>1,0</sub> = id, et f<sub>a,b</sub>⁻¹ = f<sub>1/a, −b/a</sub>.<br>f<sub>2,1</sub> ∘ f<sub>3,−1</sub> = f<sub>6,−1</sub> mais f<sub>3,−1</sub> ∘ f<sub>2,1</sub> = f<sub>6,2</sub> : le groupe n’est pas abélien.<br>f<sub>2,1</sub> ∘ g = f<sub>4,5</sub> ⇔ g = f<sub>2,1</sub>⁻¹ ∘ f<sub>4,5</sub> = f<sub>1/2,−1/2</sub> ∘ f<sub>4,5</sub> = f<sub>2,2</sub>.<br>h ∘ f<sub>2,1</sub> = f<sub>4,5</sub> ⇔ h = f<sub>4,5</sub> ∘ f<sub>1/2,−1/2</sub> = f<sub>2,3</sub>.<br>Les deux équations ont des solutions différentes : dans un groupe non abélien, il faut composer par l’inverse <b>du bon côté</b>.'},
]},

/* ===================== 3. SOUS-GROUPES ===================== */
{subj:'gred',sem:'grp',id:'gred-sous-groupes',h:'Sous-groupes',p:'Les groupes cachés dans un groupe : critère pratique, sous-groupes de ℤ, sous-groupe engendré, ordre d’un élément, groupes cycliques et théorème de Lagrange.',steps:[
  {h:'Des groupes dans un groupe',p:'Dans <i>D</i>₃, regarde seulement les rotations <i>R</i> = {<i>e</i>, <i>r</i>, <i>r</i>²}. Composer deux rotations donne une rotation, et l’inverse d’une rotation est une rotation : <i>R</i> est un groupe à lui tout seul. Sur la table, le bloc en haut à gauche est un carré latin complet.<br>De même, dans (ℤ, +), les multiples de 3 : la somme et l’opposé d’un multiple de 3 restent des multiples de 3.',
   fig:cay(TN,D3,{op:'∘',block:[0,1,2]}),
   note:'Les symétries {<i>s</i>₁, <i>s</i>₂, <i>s</i>₃}, elles, ne forment pas un groupe : <i>s</i>₁ ∘ <i>s</i>₂ = <i>r</i> n’est pas une symétrie, et le neutre <i>e</i> manque.'},
  {h:'Définition',p:'Soit (<i>G</i>, ·) un groupe. Une partie <i>H</i> ⊂ <i>G</i> est un <b>sous-groupe</b> de <i>G</i> si :<br>• <i>e</i> ∈ <i>H</i> ;<br>• <i>H</i> est <b>stable</b> : <i>a</i>, <i>b</i> ∈ <i>H</i> ⇒ <i>ab</i> ∈ <i>H</i> ;<br>• <i>H</i> est stable par inverse : <i>a</i> ∈ <i>H</i> ⇒ <i>a</i>⁻¹ ∈ <i>H</i>.<br>Alors <i>H</i>, muni de la même loi, est lui-même un groupe (l’associativité est héritée de <i>G</i>). Tout groupe a deux sous-groupes <b>triviaux</b> : {<i>e</i>} et <i>G</i>.',
   note:'Le neutre d’un sous-groupe est forcément celui de <i>G</i> : si <i>e</i>′ ∈ <i>H</i> vérifie <i>e</i>′<i>e</i>′ = <i>e</i>′ = <i>e</i>′<i>e</i>, on simplifie par <i>e</i>′ et <i>e</i>′ = <i>e</i>.'},
  {h:'Lequel est un sous-groupe ?',p:'Laquelle de ces parties est un sous-groupe de (ℤ, +)&nbsp;?',
   opts:['ℕ','L’ensemble des entiers impairs','5ℤ = {5<i>k</i> : <i>k</i> ∈ ℤ}','{−1 ; 0 ; 1}'],ans:2,
   why:'5k + 5l = 5(k + l) et −5k = 5(−k) : 5ℤ est stable et contient 0. ℕ ne contient pas l’opposé de 1 ; 1 + 1 = 2 n’est pas impair (et 0 n’est pas impair) ; 1 + 1 = 2 ∉ {−1 ; 0 ; 1}.'},
  {kind:'Méthode',h:'Le critère du sous-groupe',
   p:'<b>Critère :</b> <i>H</i> est un sous-groupe de <i>G</i> si et seulement si <b><i>H</i> ≠ ∅</b> et <b><i>a</i>, <i>b</i> ∈ <i>H</i> ⇒ <i>ab</i>⁻¹ ∈ <i>H</i></b>. En notation additive : <i>a</i> − <i>b</i> ∈ <i>H</i>.<br><b>Pourquoi :</b> avec <i>a</i> ∈ <i>H</i>, on prend <i>b</i> = <i>a</i> : <i>aa</i>⁻¹ = <i>e</i> ∈ <i>H</i>. Puis (<i>e</i>, <i>b</i>) donne <i>b</i>⁻¹ ∈ <i>H</i>. Enfin (<i>a</i>, <i>b</i>⁻¹) donne <i>a</i>(<i>b</i>⁻¹)⁻¹ = <i>ab</i> ∈ <i>H</i>. <b>Comment :</b> on montre un élément de <i>H</i> (souvent <i>e</i>), puis on prend <i>a</i>, <i>b</i> quelconques dans <i>H</i> et on vérifie que <i>ab</i>⁻¹ a la propriété qui définit <i>H</i>.',
   demo:{enonce:'Montre que ℝ₊* = {<i>x</i> ∈ ℝ : <i>x</i> > 0} est un sous-groupe de (ℝ*, ·), et que 3ℤ est un sous-groupe de (ℤ, +).',
    etapes:[{f:'1 > 0, donc 1 ∈ ℝ₊* : il n’est pas vide.',w:'On exhibe le neutre, c’est souvent le plus simple.'},
     {f:'Si <i>a</i> > 0 et <i>b</i> > 0, alors <i>ab</i>⁻¹ = <i>a</i>/<i>b</i> > 0.',w:'En multiplicatif, ab⁻¹ est le quotient a/b. Un quotient de positifs est positif.'},
     {f:'0 = 3 · 0 ∈ 3ℤ.',w:'Le neutre additif est 0.'},
     {f:'Si <i>a</i> = 3<i>k</i> et <i>b</i> = 3<i>l</i>, alors <i>a</i> − <i>b</i> = 3(<i>k</i> − <i>l</i>) ∈ 3ℤ.',w:'En additif, le critère porte sur a − b. On écrit a et b avec la définition de 3ℤ.'}],
    conclusion:'Les deux parties sont des sous-groupes. Le même calcul montre que <i>n</i>ℤ est un sous-groupe de ℤ pour tout <i>n</i> ∈ ℕ.'}},
  {h:'Preuve guidée : le neutre est dedans',p:'Dans la preuve du critère, comment obtient-on <i>e</i> ∈ <i>H</i>&nbsp;?',
   opts:['C’est une hypothèse du critère','On applique le critère au couple (<i>a</i>, <i>a</i>), avec <i>a</i> ∈ <i>H</i>, ce qui existe car <i>H</i> ≠ ∅','On applique le critère au couple (<i>e</i>, <i>e</i>)','On prend <i>a</i> = <i>b</i>⁻¹'],ans:1,
   why:'H non vide fournit un a ∈ H, et le critère avec b = a donne aa⁻¹ = e ∈ H. Utiliser le couple (e, e) suppose déjà e ∈ H : c’est un raisonnement circulaire.'},
  {h:'L’intrus',p:'Laquelle de ces parties <b>n’est pas</b> un sous-groupe de (ℚ*, ·)&nbsp;?',
   opts:['{1 ; −1}','{2ᵏ : <i>k</i> ∈ ℤ}','ℚ₊*','ℤ \\ {0}'],ans:3,
   why:'2 ∈ ℤ \\ {0} mais son inverse ½ n’est pas entier. Les autres passent le critère : (±1)/(±1) = ±1, 2ᵏ/2ˡ = 2ᵏ⁻ˡ, et un quotient de rationnels positifs est positif.'},
  {h:'Les sous-groupes de ℤ',p:'<b>Théorème :</b> les sous-groupes de (ℤ, +) sont exactement les <i>n</i>ℤ, avec <i>n</i> ∈ ℕ.<br><b>Idée de preuve.</b> Soit <i>H</i> un sous-groupe, <i>H</i> ≠ {0}. Il contient un entier non nul, donc aussi son opposé : il a des éléments positifs. Soit <i>n</i> le <b>plus petit</b> d’entre eux. Alors <i>n</i>ℤ ⊂ <i>H</i>. Pour <i>h</i> ∈ <i>H</i>, on fait la division euclidienne <i>h</i> = <i>qn</i> + <i>r</i>, 0 ≤ <i>r</i> < <i>n</i>. Alors <i>r</i> = <i>h</i> − <i>qn</i> ∈ <i>H</i>, et <i>r</i> < <i>n</i> force <i>r</i> = 0. Donc <i>h</i> ∈ <i>n</i>ℤ.',
   note:'Ainsi un sous-groupe de ℤ est entièrement décrit par un seul nombre : son plus petit élément strictement positif.'},
  {h:'Le cœur de la preuve',p:'Dans la preuve ci-dessus, pourquoi <i>r</i> = <i>h</i> − <i>qn</i> appartient-il à <i>H</i>&nbsp;?',
   opts:['Parce que 0 ≤ <i>r</i> < <i>n</i>','Parce que <i>h</i> ∈ <i>H</i>, <i>qn</i> ∈ <i>H</i> (somme de <i>q</i> copies de <i>n</i> ou de −<i>n</i>) et <i>H</i> est stable par différence','Parce que tout entier est dans <i>H</i>','Parce que <i>n</i> divise <i>h</i>'],ans:1,
   why:'qn est une somme de copies de n (ou de −n), donc dans H ; puis le critère donne h − qn ∈ H. Que n divise h, c’est la conclusion : on ne peut pas l’utiliser.'},
  {h:'Intersection et réunion',p:'<b>L’intersection</b> de deux sous-groupes <i>H</i> et <i>K</i> est un sous-groupe : <i>e</i> est dans les deux, et si <i>a</i>, <i>b</i> ∈ <i>H</i> ∩ <i>K</i>, alors <i>ab</i>⁻¹ est dans <i>H</i> et dans <i>K</i>.<br><b>La réunion</b>, en général, <b>n’en est pas un</b>. Choisis <i>a</i> et <i>b</i> : en haut les multiples de <i>a</i>, en bas ceux de <i>b</i>, et en orange leurs multiples communs.',
   params:[{id:'a',l:'a',min:2,max:6,v:2},{id:'b',l:'b',min:2,max:6,v:3}],
   draw:v=>{ const P=plane({x:[-0.6,24.6],y:[-1.6,1.6],h:120,grid:false,axes:false});
     P.seg(-0.5,0,24.5,0,{c:'var(--muted)',w:1.5});
     for(let x=0;x<=24;x++){ P.seg(x,-0.12,x,0.12,{c:'var(--muted)',w:1}); if(x%6===0) P.text(x,0,String(x),{a:'middle',dy:-6,s:10,c:'var(--muted)'}); }
     for(let x=0;x<=24;x++){ const A=x%v.a===0, B=x%v.b===0;
       if(A&&B) P.seg(x,-1.05,x,1.05,{c:'var(--spark)',w:3,op:.5});
       if(A) P.dot(x,0.85,{r:5,c:'var(--accent)'}); if(B) P.dot(x,-0.85,{r:5,c:'var(--math)'}); }
     const s=v.a+v.b; if(s<=24&&s%v.a&&s%v.b) P.dot(s,0,{r:7,c:'var(--bad)'});
     return P.svg(); },
   info:v=>{ const l=v.a*v.b/gcd(v.a,v.b), s=v.a+v.b;
     return `${v.a}ℤ ∩ ${v.b}ℤ = <b>${l}ℤ</b> (multiples communs). `+((v.a%v.b===0||v.b%v.a===0)?`Ici l’un contient l’autre : la réunion est ${Math.min(v.a,v.b)}ℤ, un sous-groupe.`:`Réunion : ${v.a} et ${v.b} y sont, mais ${v.a} + ${v.b} = ${s} n’est multiple ni de ${v.a} ni de ${v.b} (point rouge) : <b>pas un sous-groupe</b>.`); },
   note:'La réunion de deux sous-groupes n’est un sous-groupe que si l’un est inclus dans l’autre.'},
  {h:'Une intersection',p:'L’intersection 6ℤ ∩ 4ℤ est un sous-groupe de ℤ, donc de la forme <i>n</i>ℤ. Que vaut <i>n</i>&nbsp;?',lab:'n =',ans:12,
   why:'Les entiers multiples de 6 et de 4 sont les multiples de leur ppcm, 12 : 6ℤ ∩ 4ℤ = 12ℤ. Le plus petit élément positif est 12.'},
  {h:'Pourquoi la réunion échoue',p:'Pourquoi 2ℤ ∪ 3ℤ n’est-il pas un sous-groupe de ℤ&nbsp;?',
   opts:['Il ne contient pas 0','Il n’est pas stable par opposé','2 et 3 y sont, mais 3 − 2 = 1 n’y est pas','Il est infini'],ans:2,
   why:'Le critère échoue : 3 − 2 = 1 n’est multiple ni de 2 ni de 3. Il contient bien 0 et les opposés de ses éléments.'},
  {h:'Sous-groupe engendré, ordre d’un élément',p:'Pour <i>a</i> ∈ <i>G</i>, l’ensemble de ses puissances <b>⟨<i>a</i>⟩ = {<i>a</i>ᵏ : <i>k</i> ∈ ℤ}</b> est un sous-groupe (<i>a</i>ᵏ(<i>a</i>ˡ)⁻¹ = <i>a</i>ᵏ⁻ˡ), le plus petit qui contient <i>a</i> : c’est le <b>sous-groupe engendré</b> par <i>a</i>. En additif, ⟨<i>a</i>⟩ = {<i>ka</i>}.<br>L’<b>ordre</b> de <i>a</i> est le plus petit <i>n</i> ≥ 1 tel que <i>a</i>ⁿ = <i>e</i>. Alors ⟨<i>a</i>⟩ = {<i>e</i>, <i>a</i>, …, <i>a</i>ⁿ⁻¹} a exactement <i>n</i> éléments. Fais tourner la roue de <i>k</i> dans ℤ/<i>n</i>ℤ.',
   params:[{id:'n',l:'n',min:2,max:12,v:12},{id:'k',l:'k (lu modulo n)',min:0,max:11,v:8},{id:'m',l:'pas',min:0,max:12,v:1}],
   draw:v=>wheel(v.n,v.k,v.m).svg,
   info:v=>{ const w=wheel(v.n,v.k,v.m); return `⟨${w.kk}⟩ = {${w.H.slice().sort((x,y)=>x-y).join(' ; ')}}. On revient à 0 après <b>${w.ord}</b> pas : ${w.kk} est d’ordre <b>${w.ord}</b> = ${v.n}/pgcd(${v.n} ; ${w.kk}).`; },
   note:'Les points atteints forment un polygone régulier : dans ℤ/<i>n</i>ℤ, ⟨<i>k</i>⟩ est formé des multiples de pgcd(<i>n</i> ; <i>k</i>). Si <i>a</i>ᵏ ≠ <i>e</i> pour tout <i>k</i> ≥ 1 (comme 2 dans ℤ), <i>a</i> est d’ordre <b>infini</b>.'},
  {kind:'Méthode',h:'Calculer l’ordre d’un élément',
   p:'<b>Dans un petit groupe :</b> on calcule <i>a</i>, <i>a</i>², <i>a</i>³, … jusqu’à tomber sur <i>e</i> ; le nombre de pas est l’ordre. Astuce : <i>a</i>ᵏ⁺¹ = <i>a</i>ᵏ · <i>a</i>, on réutilise toujours la puissance précédente. <b>Dans ℤ/<i>n</i>ℤ :</b> <i>m</i> · <i>k</i> ≡ 0 signifie que <i>mk</i> est un multiple commun de <i>k</i> et <i>n</i> ; le premier est le ppcm, d’où <b>ordre de <i>k</i> = <i>n</i>/pgcd(<i>n</i> ; <i>k</i>)</b>.',
   demo:{enonce:'Trouve l’ordre de 2 dans (ℤ/7ℤ)*, de 8 dans (ℤ/12ℤ, +), et des éléments de <i>D</i>₃.',
    etapes:[{f:'2¹ = 2, 2² = 4, 2³ = 8 ≡ 1 : 2 est d’ordre 3 dans (ℤ/7ℤ)*, et ⟨2⟩ = {1 ; 2 ; 4}.',w:'On multiplie par 2 à chaque pas et on réduit modulo 7.'},
     {f:'8, 8 + 8 = 16 ≡ 4, 4 + 8 = 12 ≡ 0 : 8 est d’ordre 3 dans ℤ/12ℤ.',w:'En additif, les « puissances » sont les multiples.'},
     {f:'Formule : 12/pgcd(12 ; 8) = 12/4 = 3.',w:'Même résultat sans calculer la liste.'},
     {f:'Dans <i>D</i>₃ : <i>r</i>, <i>r</i>², <i>r</i>³ = <i>e</i>, donc <i>r</i> et <i>r</i>² sont d’ordre 3 ; <i>s</i>ᵢ ∘ <i>s</i>ᵢ = <i>e</i>, donc les symétries sont d’ordre 2 ; <i>e</i> est d’ordre 1.',w:'On lit la diagonale de la table.'}],
    conclusion:'Ordres : 3, 3, et dans <i>D</i>₃ : 1, 3, 3, 2, 2, 2. Aucun élément de <i>D</i>₃ n’est d’ordre 6.'}},
  {h:'Ordre de 3 modulo 7',p:'Quel est l’ordre de 3 dans ((ℤ/7ℤ)*, ·)&nbsp;?',lab:'ordre =',ans:6,
   why:'3, 3² = 9 ≡ 2, 3³ ≡ 6, 3⁴ ≡ 18 ≡ 4, 3⁵ ≡ 12 ≡ 5, 3⁶ ≡ 15 ≡ 1. Il faut 6 pas : ⟨3⟩ est le groupe entier.'},
  {h:'Ordre dans ℤ/15ℤ',p:'Quel est l’ordre de 9 dans (ℤ/15ℤ, +)&nbsp;?',lab:'ordre =',ans:5,
   why:'pgcd(15 ; 9) = 3, donc l’ordre est 15/3 = 5. Contrôle : 9, 18 ≡ 3, 12, 21 ≡ 6, 15 ≡ 0.'},
  {h:'Groupes cycliques',p:'Un groupe <i>G</i> est <b>cyclique</b> s’il existe <i>a</i> avec <i>G</i> = ⟨<i>a</i>⟩ ; <i>a</i> est alors un <b>générateur</b>. Exemples : ℤ = ⟨1⟩, ℤ/<i>n</i>ℤ = ⟨1⟩, (ℤ/7ℤ)* = ⟨3⟩. Contre-exemples : <i>D</i>₃ et Klein (aucun élément d’ordre 6, resp. 4).<br><b>Générateurs de ℤ/<i>n</i>ℤ :</b> <i>k</i> engendre tout le groupe ⇔ son ordre vaut <i>n</i> ⇔ <b>pgcd(<i>k</i> ; <i>n</i>) = 1</b>. Plus généralement, si <i>a</i> est d’ordre <i>n</i>, l’élément <i>a</i>ᵏ est d’ordre <i>n</i>/pgcd(<i>n</i> ; <i>k</i>).',
   note:'Un groupe cyclique est toujours abélien : <i>a</i>ᵏ<i>a</i>ˡ = <i>a</i>ᵏ⁺ˡ = <i>a</i>ˡ<i>a</i>ᵏ. Les rotations d’un polygone régulier à <i>n</i> côtés forment un groupe cyclique engendré par la rotation de 360°/<i>n</i> : c’est l’horloge vue géométriquement.'},
  {kind:'Pratique',h:'Un autre générateur',p:'Dans ℤ/12ℤ, choisis <i>k</i> ≠ 1 tel que les multiples de <i>k</i> parcourent les 12 heures.',
   params:[{id:'k',l:'k',min:0,max:11,v:2}],
   draw:v=>wheel(12,v.k,12).svg,
   info:v=>{ const w=wheel(12,v.k,12); return `⟨${v.k}⟩ a ${w.ord} élément${w.ord>1?'s':''} ; pgcd(12 ; ${v.k}) = ${gcd(12,v.k)}.`; },
   ok:v=>v.k!==1&&gcd(v.k,12)===1,
   why:'Il faut pgcd(k ; 12) = 1 : k = 5, 7 ou 11 (en plus de 1). Par exemple les multiples de 5 donnent 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 0.'},
  {kind:'Méthode',h:'Générateurs et sous-groupes de ℤ/nℤ',
   p:'<b>Générateurs :</b> on garde les <i>k</i> ∈ {1, …, <i>n</i> − 1} avec pgcd(<i>k</i> ; <i>n</i>) = 1. <b>Sous-groupes :</b> on admet (la preuve copie celle faite pour ℤ) que tout sous-groupe de ℤ/<i>n</i>ℤ est engendré par un élément. Comme ⟨<i>k</i>⟩ = ⟨pgcd(<i>n</i> ; <i>k</i>)⟩, il y a <b>un sous-groupe par diviseur <i>d</i> de <i>n</i></b> : ⟨<i>d</i>⟩, d’ordre <i>n</i>/<i>d</i>.',
   demo:{enonce:'Liste les générateurs et les sous-groupes de ℤ/12ℤ.',
    etapes:[{f:'pgcd(<i>k</i> ; 12) = 1 pour <i>k</i> = 1, 5, 7, 11 : quatre générateurs.',w:'On élimine les multiples de 2 et de 3, les facteurs premiers de 12.'},
     {f:'Diviseurs de 12 : 1, 2, 3, 4, 6, 12.',w:'Un sous-groupe par diviseur.'},
     {f:'⟨1⟩ = ℤ/12ℤ (12 éléments), ⟨2⟩ = {0, 2, 4, 6, 8, 10} (6), ⟨3⟩ = {0, 3, 6, 9} (4), ⟨4⟩ = {0, 4, 8} (3), ⟨6⟩ = {0, 6} (2), ⟨12⟩ = ⟨0⟩ = {0} (1).',w:'⟨d⟩ a 12/d éléments.'},
     {f:'Exemple : ⟨8⟩ = ⟨4⟩ car pgcd(12 ; 8) = 4.',w:'Deux éléments différents peuvent engendrer le même sous-groupe.'}],
    conclusion:'ℤ/12ℤ a <b>4 générateurs</b> et <b>6 sous-groupes</b>, d’ordres 12, 6, 4, 3, 2, 1 : tous des diviseurs de 12. Ce n’est pas un hasard (Lagrange, juste après).'}},
  {h:'Compter les générateurs',p:'Combien d’éléments de ℤ/18ℤ sont des générateurs&nbsp;?',lab:'générateurs :',ans:6,
   why:'Il faut k premier avec 18 = 2 · 3², donc ni pair ni multiple de 3 : 1, 5, 7, 11, 13, 17. Il y en a 6.'},
  {h:'Classes à gauche et théorème de Lagrange',p:'Soit <i>H</i> un sous-groupe de <i>G</i> fini. La <b>classe à gauche</b> de <i>a</i> est <b><i>aH</i> = {<i>ah</i> : <i>h</i> ∈ <i>H</i>}</b> (en additif : <i>a</i> + <i>H</i>).<br>• Chaque classe a |<i>H</i>| éléments : <i>h</i> ↦ <i>ah</i> est injective (simplification).<br>• Deux classes sont égales ou disjointes, et <i>a</i> ∈ <i>aH</i> : les classes <b>découpent</b> <i>G</i>.<br>Donc |<i>G</i>| = (nombre de classes) × |<i>H</i>| : <b>l’ordre d’un sous-groupe divise l’ordre du groupe</b>. Observe le découpage de ℤ/<i>n</i>ℤ par <i>H</i> = ⟨<i>k</i>⟩ : chaque couleur est une classe.',
   params:[{id:'n',l:'n',min:2,max:12,v:12},{id:'k',l:'k (lu modulo n)',min:0,max:11,v:3}],
   draw:v=>lagr(v.n,v.k).svg,
   info:v=>{ const L=lagr(v.n,v.k); return `H = ⟨${L.kk}⟩ a ${L.h} élément${L.h>1?'s':''}. Classes : ${L.cls.map(c=>'{'+c.join(' ; ')+'}').join(', ')}. Bilan : ${v.n} = <b>${L.d} × ${L.h}</b>.`; },
   note:'Les gros points sont les éléments de <i>H</i> = 0 + <i>H</i>. Chaque autre classe est le même polygone, tourné : <i>a</i> + <i>H</i> est <i>H</i> décalé de <i>a</i>.'},
  {kind:'Méthode',h:'Utiliser le théorème de Lagrange',
   p:'<b>Conséquences à connaître</b> (<i>G</i> fini d’ordre <i>n</i>) : 1) l’ordre de tout élément divise <i>n</i> (c’est l’ordre de ⟨<i>a</i>⟩) ; 2) donc <i>a</i>ⁿ = <i>e</i> pour tout <i>a</i> ; 3) si <i>n</i> est <b>premier</b>, <i>G</i> est cyclique : tout <i>a</i> ≠ <i>e</i> est d’ordre <i>n</i>. <b>Pour lister les classes à gauche :</b> on prend un élément <i>a</i> pas encore rangé, on calcule <i>aH</i>, et on recommence jusqu’à épuisement.',
   demo:{enonce:'Dans <i>D</i>₃, découpe le groupe en classes à gauche selon <i>H</i> = {<i>e</i>, <i>s</i>₁}.',
    etapes:[{f:'<i>eH</i> = <i>H</i> = {<i>e</i>, <i>s</i>₁}.',w:'La classe du neutre est H lui-même.'},
     {f:'<i>r</i> n’est pas rangé : <i>rH</i> = {<i>r</i> ∘ <i>e</i>, <i>r</i> ∘ <i>s</i>₁} = {<i>r</i>, <i>s</i>₃}.',w:'On lit r ∘ s₁ = s₃ dans la table (ligne r, colonne s₁).'},
     {f:'<i>r</i>² n’est pas rangé : <i>r</i>²<i>H</i> = {<i>r</i>², <i>r</i>² ∘ <i>s</i>₁} = {<i>r</i>², <i>s</i>₂}.',w:'Ligne r², colonne s₁ : s₂.'},
     {f:'Les 6 éléments sont rangés en 3 classes de 2 : 6 = 3 × 2.',w:'On contrôle avec Lagrange.'}],
    conclusion:'Classes : {<i>e</i>, <i>s</i>₁}, {<i>r</i>, <i>s</i>₃}, {<i>r</i>², <i>s</i>₂}. Lagrange dit aussi que <i>D</i>₃ ne peut pas avoir de sous-groupe d’ordre 4 ou 5.'}},
  {h:'Ordres possibles',p:'Un groupe <i>G</i> a 15 éléments. Quels sont les ordres possibles de ses éléments&nbsp;?',
   opts:['1, 2, 3, 5 ou 15','Seulement 15','1, 3, 5 ou 15','N’importe quel entier de 1 à 15'],ans:2,
   why:'L’ordre d’un élément est l’ordre du sous-groupe qu’il engendre, donc un diviseur de 15 : 1, 3, 5 ou 15. Lagrange ne dit pas lesquels apparaissent vraiment ; seul e est d’ordre 1.'},
  {h:'Une classe dans D₃',p:'Avec <i>H</i> = {<i>e</i>, <i>s</i>₁}, quelle est la classe à gauche <i>s</i>₂<i>H</i>&nbsp;?',
   fig:cay(TN,D3,{op:'∘',row:4,col:3}),
   opts:['{<i>s</i>₂, <i>s</i>₃}','{<i>s</i>₂, <i>r</i>}','{<i>s</i>₂, <i>e</i>}','{<i>s</i>₂, <i>r</i>²}'],ans:3,
   why:'s₂H = {s₂ ∘ e, s₂ ∘ s₁} = {s₂, r²} (ligne s₂, colonne s₁). C’est bien la classe r²H trouvée dans la méthode : deux classes qui se touchent sont égales.'},
  {kind:'Pratique',h:'Découper en trois',p:'Dans ℤ/12ℤ, choisis <i>k</i> pour que <i>H</i> = ⟨<i>k</i>⟩ découpe le groupe en exactement <b>3 classes</b>.',
   params:[{id:'k',l:'k',min:0,max:11,v:1}],
   draw:v=>lagr(12,v.k).svg,
   info:v=>{ const L=lagr(12,v.k); return `|H| = ${L.h}, ${L.d} classe${L.d>1?'s':''}.`; },
   ok:v=>lagr(12,v.k).d===3,
   why:'3 classes ⇔ |H| = 12/3 = 4 ⇔ H = ⟨3⟩ = {0 ; 3 ; 6 ; 9}. Les deux générateurs de ce sous-groupe sont k = 3 et k = 9.'},
  {kind:'Problème',h:'Le groupe (ℤ/13ℤ)*',
   p:'Le groupe ((ℤ/13ℤ)*, ·) a 12 éléments. On veut savoir s’il est cyclique, trouver ses générateurs et découper le groupe selon un petit sous-groupe. Calcule les puissances successives de 2 modulo 13 en multipliant chaque fois par 2.',
   parts:[
    {q:'a) Quel est l’ordre de 2 dans (ℤ/13ℤ)*&nbsp;?',lab:'ordre =',ans:12,hint:'2, 4, 8, 16 ≡ 3, 6, … continue jusqu’à 1.',why:'2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, 1 : il faut 12 pas. 2 engendre tout le groupe, qui est donc cyclique.'},
    {q:'b) Quel est l’ordre de 4 = 2²&nbsp;?',lab:'ordre =',ans:6,hint:'Si a est d’ordre n, aᵏ est d’ordre n/pgcd(n ; k).',why:'12/pgcd(12 ; 2) = 6. Contrôle : 4, 3, 12, 9, 10, 1.'},
    {q:'c) Le sous-groupe ⟨3⟩ a combien d’éléments&nbsp;?',lab:'|⟨3⟩| =',ans:3,hint:'Calcule 3, 3², 3³ modulo 13.',why:'3, 9, 27 ≡ 1 : ⟨3⟩ = {1 ; 3 ; 9}, d’ordre 3.'},
    {q:'d) En combien de classes à gauche ⟨3⟩ découpe-t-il le groupe&nbsp;?',lab:'classes :',ans:4,hint:'Lagrange : 12 = (nombre de classes) × |H|.',why:'12/3 = 4 classes, par exemple {1, 3, 9}, {2, 6, 5}, {4, 12, 10}, {8, 11, 7}.'},
    {q:'e) Combien d’éléments engendrent tout le groupe&nbsp;?',lab:'générateurs :',ans:4,hint:'Tout élément s’écrit 2ᵏ. Lesquels sont d’ordre 12 ?',why:'2ᵏ est d’ordre 12 ⇔ pgcd(12 ; k) = 1 ⇔ k ∈ {1, 5, 7, 11}. Les générateurs sont 2, 6, 11 et 7.'},
   ],
   sol:'Puissances de 2 modulo 13 : 2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, 1. Elles parcourent les 12 éléments : 2 est d’ordre 12 et le groupe est cyclique, engendré par 2.<br>Comme 2 est d’ordre 12, 2ᵏ est d’ordre 12/pgcd(12 ; k). Ainsi 4 = 2² est d’ordre 6 et 3 = 2⁴ est d’ordre 3 : ⟨3⟩ = {1 ; 3 ; 9}.<br>Lagrange : 12 = 4 × 3, d’où 4 classes : {1, 3, 9}, 2⟨3⟩ = {2, 6, 5}, 4⟨3⟩ = {4, 12, 10}, 8⟨3⟩ = {8, 11, 7}.<br>Générateurs : 2ᵏ avec k ∈ {1, 5, 7, 11}, soit 2, 2⁵ ≡ 6, 2⁷ ≡ 11, 2¹¹ ≡ 7 : <b>4 générateurs</b>.'},
  {kind:'Problème',h:'Tous les sous-groupes de D₃',
   p:'On veut la liste complète des sous-groupes du groupe du triangle <i>D</i>₃ = {<i>e</i>, <i>r</i>, <i>r</i>², <i>s</i>₁, <i>s</i>₂, <i>s</i>₃}, d’ordre 6. On combine le théorème de Lagrange, les ordres des éléments et un argument de stabilité. La table est rappelée ci-dessous.',
   fig:cay(TN,D3,{op:'∘'}),
   parts:[
    {q:'a) Quels ordres un sous-groupe de <i>D</i>₃ peut-il avoir&nbsp;?',opts:['1, 2, 3, 4, 5 ou 6','1, 2, 3 ou 6','2 ou 3 seulement','1 ou 6 seulement'],ans:1,hint:'Lagrange : l’ordre d’un sous-groupe divise 6.',why:'Les diviseurs de 6 sont 1, 2, 3 et 6. Un sous-groupe d’ordre 4 ou 5 est impossible.'},
    {q:'b) Combien <i>D</i>₃ a-t-il de sous-groupes d’ordre 2&nbsp;?',lab:'nombre :',ans:3,hint:'Un sous-groupe d’ordre 2 est {e, x} avec x d’ordre 2.',why:'Les éléments d’ordre 2 sont s₁, s₂, s₃ : {e, s₁}, {e, s₂}, {e, s₃}.'},
    {q:'c) Combien a-t-il de sous-groupes d’ordre 3&nbsp;?',lab:'nombre :',ans:1,hint:'3 est premier : un tel sous-groupe est cyclique, engendré par un élément d’ordre 3.',why:'Les éléments d’ordre 3 sont r et r², et ⟨r⟩ = ⟨r²⟩ = {e, r, r²}. Un seul.'},
    {q:'d) {<i>e</i>, <i>s</i>₁, <i>s</i>₂} a 3 éléments, et 3 divise 6. Est-ce un sous-groupe&nbsp;?',opts:['Oui, d’après Lagrange','Oui, car chaque élément est son propre inverse','Non : s₁ ∘ s₂ = r n’est pas dans l’ensemble','Non, car 3 ne divise pas 6'],ans:2,hint:'Lagrange donne une condition nécessaire, pas suffisante. Vérifie la stabilité.',why:'s₁ ∘ s₂ = r ∉ {e, s₁, s₂} : pas stable. Lagrange interdit certains ordres mais n’assure pas qu’une partie du bon cardinal soit un sous-groupe.'},
    {q:'e) Au total, combien <i>D</i>₃ a-t-il de sous-groupes&nbsp;?',lab:'total :',ans:6,hint:'Ajoute les sous-groupes triviaux. Un sous-groupe qui contient deux symétries contient leur composée, une rotation d’ordre 3.',why:'{e}, trois d’ordre 2, un d’ordre 3, et D₃ : 1 + 3 + 1 + 1 = 6.'},
   ],
   sol:'Par Lagrange, un sous-groupe H de D₃ est d’ordre 1, 2, 3 ou 6.<br>Ordre 1 : {e}. Ordre 6 : D₃.<br>Ordre 2 : H = {e, x} avec x² = e, x ≠ e, donc x est une symétrie : {e, s₁}, {e, s₂}, {e, s₃}.<br>Ordre 3 : 3 est premier, donc H est engendré par un élément d’ordre 3, r ou r² ; dans les deux cas H = {e, r, r²}.<br>Une partie comme {e, s₁, s₂} a le bon cardinal mais n’est pas stable (s₁ ∘ s₂ = r). Plus généralement, un sous-groupe qui contient deux symétries contient une rotation d’ordre 3, donc au moins 4 éléments, donc 6 : c’est D₃.<br>Bilan : <b>6 sous-groupes</b>.'},
]},
);
})();
