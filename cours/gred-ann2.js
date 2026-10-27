/* Déclic — Notions fondamentales : anneaux et corps (2) */
(()=>{
/* ---------- helpers locaux ---------- */
const mod=(a,n)=>((a%n)+n)%n;
const gcd=(a,b)=>{ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a; };
const unites=n=>[...Array(n).keys()].filter(a=>a>0&&gcd(a,n)===1);
const divz=n=>[...Array(n).keys()].filter(a=>a>0&&gcd(a,n)>1);
const premier=n=>n>1&&[...Array(n).keys()].every(d=>d<2||n%d!==0);
const inv=(a,n)=>{ for(let x=1;x<n;x++) if(mod(a*x,n)===1) return x; return -1; };
const txt=(x,y,s,q={})=>`<text x="${x}" y="${y}" font-size="${q.s||12}" font-weight="${q.w||700}" text-anchor="${q.a||'middle'}" fill="${q.c||'var(--ink)'}">${s}</text>`;
const lst=a=>a.length?'{'+a.join(' ; ')+'}':'∅';

// Table d’addition (op = 0) ou de multiplication (op = 1) de ℤ/nℤ
function tableZ(n,op){
  const c=Math.min(36,Math.floor(312/(n+1))), x0=Math.round((320-c*(n+1))/2), H=c*(n+1)+8, fs=c<26?10:13;
  let s=`<svg viewBox="0 0 320 ${H}" width="320" role="img">`;
  for(let i=0;i<n;i++) for(let j=0;j<n;j++){
    const v=op?mod(i*j,n):mod(i+j,n), x=x0+c*(j+1), y=4+c*(i+1);
    let fill='none';
    if(op&&v===1) fill='var(--ok)'; else if(op&&v===0&&i>0&&j>0) fill='var(--bad)'; else if(!op&&v===0) fill='var(--accent)';
    s+=`<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="${fill}" fill-opacity="${fill==='none'?0:.35}" stroke="var(--line)"/>`;
    s+=txt(x+c/2,y+c/2+fs/2.8,v,{s:fs,w:500});
  }
  s+=txt(x0+c/2,4+c/2+fs/2.8,op?'·':'+',{s:fs+2,c:'var(--muted)'});
  for(let k=0;k<n;k++){ s+=txt(x0+c*(k+1.5),4+c/2+fs/2.8,k,{s:fs,c:'var(--muted)'}); s+=txt(x0+c/2,4+c*(k+1.5)+fs/2.8,k,{s:fs,c:'var(--muted)'}); }
  s+=`<line x1="${x0+c}" x2="${x0+c}" y1="4" y2="${H-4}" stroke="var(--muted)" stroke-width="1.5"/><line x1="${x0}" x2="${x0+c*(n+1)}" y1="${4+c}" y2="${4+c}" stroke="var(--muted)" stroke-width="1.5"/>`;
  return s+'</svg>';
}
// Multiplication par a dans ℤ/nℤ : colonne x → colonne a·x
function colonnes(n,a){
  const P=plane({x:[0,10],y:[-0.8,n-0.2],h:Math.max(170,22*n+20),grid:false,axes:false}), Y=k=>n-1-k, hit=new Set();
  for(let x=0;x<n;x++){ const y=mod(a*x,n); hit.add(y); P.arrow(2.4,Y(x),7.6,Y(y),{c:'var(--math)',w:1.8,hs:8}); }
  for(let k=0;k<n;k++){ P.dot(2,Y(k),{r:4.5,c:'var(--ink)'}).text(2,Y(k),k,{a:'end',dx:-9,dy:4,s:12});
    P.dot(8,Y(k),{r:4.5,c:hit.has(k)?'var(--spark)':'var(--muted)'}).text(8,Y(k),k,{dx:9,dy:4,s:12}); }
  P.text(2,-0.6,'x',{a:'middle',c:'var(--muted)'}).text(8,-0.6,'a·x',{a:'middle',c:'var(--muted)'});
  return P.svg();
}
// Horloge de ℤ/nℤ : points sur un cercle, marques colorées, flèche éventuelle
function horloge(n,marks,fl){
  const P=plane({x:[-1.5,1.5],y:[-1.45,1.45],grid:false,axes:false}), pt=k=>[Math.sin(2*Math.PI*k/n),Math.cos(2*Math.PI*k/n)];
  P.circ(0,0,1,{c:'var(--line)',w:1.5});
  if(fl&&fl[0]!==fl[1]){ const p=pt(fl[0]),q=pt(fl[1]); P.arrow(p[0]*.93,p[1]*.93,q[0]*.93,q[1]*.93,{c:'var(--math)',w:2.2,hs:10}); }
  for(let k=0;k<n;k++){ const [x,y]=pt(k); P.dot(x,y,{r:marks[k]?7:4.5,c:marks[k]||'var(--muted)'}); P.text(x*1.22,y*1.22-0.06,k,{a:'middle',s:12}); }
  return P.svg();
}
// Diagramme de Venn avec 5 éléments placés et leurs fonctions caractéristiques
const circP=(cx,cy,r)=>`M${cx-r} ${cy}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0Z`;
let VN=0;
const SLOTS=[[[28,70],[28,110],[28,150],[292,80],[292,120]],[[90,62],[108,82],[90,102],[108,122],[90,142]],[[230,62],[212,82],[230,102],[212,122],[230,142]],[[160,60],[160,80],[160,100],[160,120],[160,140]]];
const sub=s=>`<tspan dy="3" font-size="9">${s}</tspan>`;
const OPS=[
  {n:'A ∩ B',t:'χ'+sub('A∩B'),h:'χ<sub>A</sub> · χ<sub>B</sub>',f:(x,y)=>x*y},
  {n:'A Δ B',t:'χ'+sub('AΔB'),h:'χ<sub>A</sub> + χ<sub>B</sub>',f:(x,y)=>(x+y)%2},
  {n:'A ∪ B',t:'χ'+sub('A∪B'),h:'χ<sub>A</sub> + χ<sub>B</sub> + χ<sub>A</sub>χ<sub>B</sub>',f:(x,y)=>(x+y+x*y)%2},
  {n:'Aᶜ',t:'χ'+sub('Aᶜ'),h:'1 + χ<sub>A</sub>',f:(x,y)=>(1+x)%2},
  {n:'A \\ B',t:'χ'+sub('A∖B'),h:'χ<sub>A</sub>(1 + χ<sub>B</sub>)',f:(x,y)=>(x*(1+y))%2}];
function vennF2(pos,ops){
  const id='gv'+(++VN), A=circP(125,100,62), B=circP(195,100,62), col='var(--accent)', fo=.45, g=OPS[ops[0]].f;
  const a=pos.map(r=>r===1||r===3?1:0), b=pos.map(r=>r===2||r===3?1:0), H=212+25*(2+ops.length)+6;
  let s=`<svg viewBox="0 0 320 ${H}" width="320" role="img"><defs><clipPath id="${id}A"><path d="${A}"/></clipPath><clipPath id="${id}B"><path d="${B}"/></clipPath></defs>`;
  s+=`<rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="var(--muted)" stroke-width="1.5"/>`;
  if(g(0,0)) s+=`<rect x="10" y="10" width="300" height="180" rx="10" fill="${col}" fill-opacity="${fo}"/><path d="${A}${B}" fill="var(--surface)"/>`;
  if(g(1,0)) s+=`<path d="${A}${B}" fill-rule="evenodd" clip-path="url(#${id}A)" fill="${col}" fill-opacity="${fo}"/>`;
  if(g(0,1)) s+=`<path d="${A}${B}" fill-rule="evenodd" clip-path="url(#${id}B)" fill="${col}" fill-opacity="${fo}"/>`;
  if(g(1,1)) s+=`<path d="${B}" clip-path="url(#${id}A)" fill="${col}" fill-opacity="${fo}"/>`;
  s+=`<path d="${A}" fill="none" stroke="var(--ink)" stroke-width="2"/><path d="${B}" fill="none" stroke="var(--ink)" stroke-width="2"/>`;
  s+=txt(72,34,'A',{s:14})+txt(248,34,'B',{s:14})+txt(292,182,'E',{s:13,c:'var(--muted)'});
  const used=[0,0,0,0];
  pos.forEach((r,k)=>{ const [x,y]=SLOTS[r][used[r]++]; s+=`<circle cx="${x}" cy="${y}" r="9" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5"/>`+txt(x,y+4,k+1,{s:11}); });
  const X=k=>150+34*k, rows=[['χ'+sub('A'),a],['χ'+sub('B'),b]].concat(ops.map(o=>[OPS[o].t,a.map((x,k)=>OPS[o].f(x,b[k]))]));
  s+=txt(20,212,'élément',{a:'start',s:11,c:'var(--muted)'});
  for(let k=0;k<5;k++) s+=txt(X(k),212,k+1,{s:11,c:'var(--muted)'});
  rows.forEach(([lab,bits],i)=>{ const y=237+25*i;
    if(i===2) s+=`<line x1="14" x2="306" y1="${y-17}" y2="${y-17}" stroke="var(--line)" stroke-width="1.5"/>`;
    s+=txt(20,y,lab,{a:'start',s:13});
    bits.forEach((v,k)=>{ s+=`<rect x="${X(k)-12}" y="${y-15}" width="24" height="21" rx="4" fill="${v?'var(--ok)':'var(--line)'}" fill-opacity="${v?.4:.5}"/>`+txt(X(k),y,v,{s:13}); }); });
  return s+'</svg>';
}
const posOf=v=>[v.e1,v.e2,v.e3,v.e4,v.e5];
const word=a=>a.join('');
// Tables de F₂
function tablesF2(){
  let s=`<svg viewBox="0 0 320 120" width="320" role="img">`;
  [[40,'+',(x,y)=>(x+y)%2],[190,'·',(x,y)=>x*y]].forEach(([x0,o,f])=>{
    s+=txt(x0+20,38,o,{s:16,c:'var(--muted)'});
    [0,1].forEach(k=>{ s+=txt(x0+60+40*k,38,k,{s:14,c:'var(--muted)'})+txt(x0+20,78+34*k,k,{s:14,c:'var(--muted)'}); });
    [0,1].forEach(i=>[0,1].forEach(j=>{ const v=f(i,j), hl=o==='+'&&i===1&&j===1;
      s+=`<rect x="${x0+44+40*j}" y="${52+34*i}" width="32" height="30" rx="5" fill="${hl?'var(--spark)':'var(--line)'}" fill-opacity="${hl?.45:.4}"/>`+txt(x0+60+40*j,73+34*i,v,{s:15}); }));
    s+=`<line x1="${x0+38}" x2="${x0+38}" y1="22" y2="118" stroke="var(--muted)" stroke-width="1.5"/><line x1="${x0+4}" x2="${x0+124}" y1="48" y2="48" stroke="var(--muted)" stroke-width="1.5"/>`;
  });
  return s+'</svg>';
}
// Réseau des fractions : le couple (a ; b) est le point (b ; a)
function reseau(a,b,o={}){
  const P=plane({x:[-0.5,12.5],y:[-6.5,6.5],grid:false,axes:true,lab:2});
  for(let x=0;x<=12;x++) for(let y=-6;y<=6;y++) P.circ(x,y,0.07,{c:null,fill:'var(--muted)',fo:.7});
  const g=gcd(a,b)||1, ar=a/g, br=b/g;
  P.seg(-0.5,-0.5*a/b,12.5,12.5*a/b,{c:'var(--math)',w:2.5,op:.8});
  for(let k=1;k*br<=12&&Math.abs(k*ar)<=6;k++) P.dot(k*br,k*ar,{r:5,c:'var(--accent)'});
  if(o.ref) P.dot(o.ref[1],o.ref[0],{r:6,c:'var(--ok)'});
  P.dot(b,a,{r:7,c:'var(--spark)'}).text(b,a,`(${fmt(a)} ; ${b})`,{dx:a>=0?-8:8,dy:a>=0?-12:20,a:'middle',s:12});
  P.dot(0,0,{r:4,c:'var(--ink)'}).text(0,0,'O',{dx:6,dy:16,s:12});
  return P.svg();
}
// Fonction rationnelle f(x) = (x − z) / ((x − p)(x − q))
const lin=z=>z===0?'x':z>0?`x − ${z}`:`x + ${-z}`;
function ratInfo(z,p,q){
  const ex=[...new Set([p,q])].sort((u,w)=>u-w);
  let simp, zeros=[], poles=[], holes=[];
  if(z!==p&&z!==q){ simp=F(lin(z),p===q?`(${lin(p)})²`:`(${lin(p)})(${lin(q)})`); zeros=[z]; poles=ex; }
  else if(p===q){ simp=F('1',lin(p)); poles=[p]; }
  else { const r=z===p?q:p; simp=F('1',lin(r)); poles=[r]; holes=[[z,1/(z-r)]]; }
  return {ex,simp,zeros,poles,holes};
}
function ratFig(z,p,q){
  const P=plane({x:[-5,5],y:[-5,5],lab:1}), f=x=>(x-z)/((x-p)*(x-q)), I=ratInfo(z,p,q), e=I.ex;
  P.seg(-5,0,5,0,{c:'var(--muted)',w:1.5,dash:1});
  I.poles.forEach(r=>P.seg(r,-5,r,5,{c:'var(--bad)',w:2,dash:1}));
  const b=[-5].concat(e,[5]);
  for(let i=0;i+1<b.length;i++){ const u=b[i]+(i?0.01:0), w=b[i+1]-(i+2<b.length?0.01:0); if(w>u) P.fn(f,{from:u,to:w,n:300}); }
  I.zeros.forEach(x=>P.dot(x,0,{r:6,c:'var(--ok)'}));
  I.holes.forEach(([x,y])=>P.circ(x,y,0.15,{c:'var(--accent)',w:2.5,fill:'var(--surface)',fo:1}));
  return P.svg();
}
const lst2=a=>a.length?'{'+a.map(x=>fmt(x)).join(' ; ')+'}':'aucun';
const ratTxt=(z,p,q)=>{ const I=ratInfo(z,p,q);
  return `Domaine : ℝ \\ ${lst2(I.ex)} · forme simplifiée : f(x) = ${I.simp}<br>Zéros : ${lst2(I.zeros)} · pôles : ${lst2(I.poles)}`+(I.holes.length?` · <b>trou</b> en (${fmt(I.holes[0][0])} ; ${fmt(I.holes[0][1],3)})`:'')+' · asymptote horizontale y = 0'; };
// Polynôme (x − a)^m (x − b)
const sup=['','','²','³','⁴'];

COURS.push(
/* ===================== 1. ANNEAUX ET CORPS ===================== */
{subj:'gred',sem:'ann',id:'gred-anneaux',h:'Notions d’anneau et de corps',p:'Ce que ℤ, ℝ[T], M₂(ℝ) et ℤ/nℤ ont en commun : les axiomes d’anneau, leurs conséquences, les unités, les diviseurs de zéro et les corps.',steps:[
  {h:'Qu’est-ce qu’un anneau ?',p:`Tu connais déjà plusieurs ensembles où l’on additionne et multiplie : ℤ, ℝ[T], M₂(ℝ). On isole ce qu’ils ont en commun. Un <b>anneau</b> (<i>A</i>, +, ·) est un ensemble muni de deux lois internes telles que :<ol><li>(<i>A</i>, +) est un <b>groupe commutatif</b>, de neutre noté 0 ; l’opposé de <i>a</i> se note −<i>a</i> ;</li><li>la multiplication est <b>associative</b> et possède un <b>neutre</b> noté 1 : 1·<i>a</i> = <i>a</i>·1 = <i>a</i> ;</li><li>la multiplication est <b>distributive</b> des deux côtés : <i>a</i>(<i>b</i> + <i>c</i>) = <i>ab</i> + <i>ac</i> et (<i>a</i> + <i>b</i>)<i>c</i> = <i>ac</i> + <i>bc</i>.</li></ol>Si de plus <i>ab</i> = <i>ba</i> pour tous <i>a</i>, <i>b</i>, l’anneau est <b>commutatif</b>.`,
   note:'On écrit <i>ab</i> pour <i>a</i>·<i>b</i> et <i>a</i> − <i>b</i> pour <i>a</i> + (−<i>b</i>). On demande en général 1 ≠ 0 : si 1 = 0, on verra que tout élément est nul, et l’anneau se réduit à {0}.'},
  {h:'Une galerie d’anneaux',p:`Voici les exemples à garder en tête, avec leur zéro et leur un :<ul><li><b>ℤ, ℚ, ℝ</b> : commutatifs, 0 et 1 usuels.</li><li><b>ℝ[T]</b> : commutatif ; 0 = polynôme nul, 1 = polynôme constant 1.</li><li><b>M₂(ℝ)</b> : <b>non commutatif</b> ; 0 = matrice nulle, 1 = matrice unité <i>I</i>.</li><li><b>ℤ/nℤ</b> (<i>n</i> ≥ 2) : commutatif ; on note simplement 0, 1, …, <i>n</i> − 1 les classes.</li><li><b>ℱ(ℝ, ℝ)</b>, les fonctions ℝ → ℝ, avec (<i>f</i> + <i>g</i>)(<i>x</i>) = <i>f</i>(<i>x</i>) + <i>g</i>(<i>x</i>) et (<i>fg</i>)(<i>x</i>) = <i>f</i>(<i>x</i>)<i>g</i>(<i>x</i>) ; 0 = fonction nulle, 1 = fonction constante 1.</li><li><b>(𝒫(<i>E</i>), Δ, ∩)</b> : la différence symétrique joue le rôle de +, l’intersection celui de · ; 0 = ∅ et 1 = <i>E</i>. On le démontre au chapitre suivant.</li></ul>`,
   note:'<b>Piège :</b> (𝒫(<i>E</i>), ∪, ∩) n’est <b>pas</b> un anneau. Pour ∪, le neutre est ∅, et <i>A</i> ∪ <i>X</i> = ∅ impose <i>A</i> = ∅ : une partie non vide n’a pas d’opposé.'},
  {h:'Qui n’est pas un anneau ?',p:'Une seule de ces structures n’est pas un anneau. Laquelle&nbsp;?',
   opts:['(ℤ, +, ·)','(ℝ[T], +, ·)','(ℕ, +, ·)','(M₂(ℝ), +, ·)'],ans:2,
   why:'Dans ℕ, 3 n’a pas d’opposé : aucun n ∈ ℕ ne vérifie 3 + n = 0. Donc (ℕ, +) n’est pas un groupe, et le premier axiome tombe.'},
  {kind:'Méthode',h:'Vérifier les axiomes sur une structure nouvelle',
   p:'<b>Quand :</b> on te donne un ensemble muni de deux lois inhabituelles et on demande si c’est un anneau. <b>Comment :</b> on passe les axiomes en revue dans l’ordre. 1) Pour la première loi : associativité, commutativité, <b>neutre</b> (on le trouve en résolvant <i>a</i> ⊕ <i>e</i> = <i>a</i>), <b>symétriques</b> (on résout <i>a</i> ⊕ <i>a</i>′ = <i>e</i>). 2) Pour la seconde : associativité et neutre. 3) La distributivité (un seul côté suffit si la seconde loi est commutative). <b>Pour réfuter</b>, un seul contre-exemple numérique suffit.',
   demo:{enonce:'Sur ℤ, on pose <i>a</i> ⊕ <i>b</i> = <i>a</i> + <i>b</i> − 1 et <i>a</i> ⊗ <i>b</i> = <i>a</i> + <i>b</i> − <i>ab</i>. Montre que (ℤ, ⊕, ⊗) est un anneau commutatif.',
    etapes:[{f:'(<i>a</i> ⊕ <i>b</i>) ⊕ <i>c</i> = <i>a</i> + <i>b</i> + <i>c</i> − 2 = <i>a</i> ⊕ (<i>b</i> ⊕ <i>c</i>), et <i>a</i> ⊕ <i>b</i> = <i>b</i> ⊕ <i>a</i>.',w:'Associativité et commutativité de ⊕ : on développe les deux membres.'},
     {f:'<i>a</i> ⊕ <i>e</i> = <i>a</i> ⇔ <i>a</i> + <i>e</i> − 1 = <i>a</i> ⇔ <i>e</i> = 1. Le « zéro » de cet anneau est l’entier 1.',w:'On cherche le neutre en résolvant une équation.'},
     {f:'<i>a</i> ⊕ <i>a</i>′ = 1 ⇔ <i>a</i> + <i>a</i>′ − 1 = 1 ⇔ <i>a</i>′ = 2 − <i>a</i>.',w:'Chaque entier a un symétrique : (ℤ, ⊕) est un groupe commutatif.'},
     {f:'(<i>a</i> ⊗ <i>b</i>) ⊗ <i>c</i> = <i>a</i> + <i>b</i> + <i>c</i> − <i>ab</i> − <i>ac</i> − <i>bc</i> + <i>abc</i>.',w:'Cette expression est symétrique en a, b, c : elle vaut aussi a ⊗ (b ⊗ c). La loi ⊗ est associative (et visiblement commutative).'},
     {f:'<i>a</i> ⊗ <i>e</i> = <i>a</i> ⇔ <i>e</i> − <i>ae</i> = 0 ⇔ <i>e</i>(1 − <i>a</i>) = 0 pour tout <i>a</i> ⇔ <i>e</i> = 0.',w:'Le « un » de cet anneau est l’entier 0.'},
     {f:'<i>a</i> ⊗ (<i>b</i> ⊕ <i>c</i>) = 2<i>a</i> + <i>b</i> + <i>c</i> − 1 − <i>ab</i> − <i>ac</i> = (<i>a</i> ⊗ <i>b</i>) ⊕ (<i>a</i> ⊗ <i>c</i>).',w:'Distributivité, en développant chaque membre. Comme ⊗ est commutative, l’autre côté suit.'}],
    conclusion:'(ℤ, ⊕, ⊗) est un anneau commutatif, de zéro 1 et d’unité 0. Les noms « 0 » et « 1 » désignent les <b>neutres</b>, pas forcément les entiers 0 et 1.'},
   note:'Ce n’est pas un hasard : avec φ(<i>x</i>) = 1 − <i>x</i>, on a φ(<i>a</i> ⊕ <i>b</i>) = φ(<i>a</i>) + φ(<i>b</i>) et φ(<i>a</i> ⊗ <i>b</i>) = φ(<i>a</i>)φ(<i>b</i>). C’est l’anneau ℤ « déguisé ».'},
  {h:'Un opposé déguisé',p:'Dans l’anneau (ℤ, ⊕, ⊗) de la méthode, quel est l’opposé de 5, c’est-à-dire son symétrique pour ⊕&nbsp;?',lab:'opposé :',ans:-3,
   why:'Le symétrique de a est 2 − a, donc 2 − 5 = −3. Contrôle : 5 ⊕ (−3) = 5 − 3 − 1 = 1, qui est bien le zéro de cet anneau.'},
  {h:'Quel axiome tombe ?',p:'Sur ℤ, on garde l’addition usuelle + et on pose <i>a</i> ∗ <i>b</i> = <i>a</i> + <i>b</i>. Pourquoi (ℤ, +, ∗) n’est-il pas un anneau&nbsp;?',
   opts:['∗ n’est pas associative','∗ n’a pas de neutre','+ n’est pas commutative','∗ n’est pas distributive sur + : 1 ∗ (0 + 0) = 1 mais (1 ∗ 0) + (1 ∗ 0) = 2'],ans:3,
   why:'∗ est associative et a pour neutre 0. Mais la distributivité échoue, et un seul contre-exemple suffit : 1 ∗ (0 + 0) = 1 ≠ 2 = (1 ∗ 0) + (1 ∗ 0).'},
  {h:'Règles de calcul : ce que les axiomes imposent',p:`Dans <b>tout</b> anneau, on a :<br><b><i>a</i>·0 = 0·<i>a</i> = 0</b>, &nbsp; <b>(−<i>a</i>)<i>b</i> = <i>a</i>(−<i>b</i>) = −(<i>ab</i>)</b>, &nbsp; <b>(−<i>a</i>)(−<i>b</i>) = <i>ab</i></b>.<br>En particulier (−1)<i>a</i> = −<i>a</i> et <b>(−1)(−1) = 1</b>. Ces règles, évidentes dans ℝ, valent donc aussi dans M₂(ℝ), dans ℤ/nℤ ou dans 𝒫(<i>E</i>), parce qu’elles se déduisent des seuls axiomes.`,
   note:'« Moins par moins donne plus » n’est pas une convention : la distributivité l’impose. Et si 1 = 0, alors <i>a</i> = <i>a</i>·1 = <i>a</i>·0 = 0 pour tout <i>a</i>.'},
  {kind:'Méthode',h:'Déduire une règle des axiomes',
   p:'<b>Quand :</b> on veut prouver une propriété valable dans tout anneau. <b>Comment :</b> on n’utilise que les axiomes, jamais une propriété « connue » de ℝ. Deux astuces : 1) pour montrer <i>x</i> = 0, on établit <i>x</i> + <i>x</i> = <i>x</i>, puis on ajoute −<i>x</i> ; 2) pour montrer <i>y</i> = −<i>z</i>, on vérifie <i>y</i> + <i>z</i> = 0, car l’opposé est <b>unique</b> dans un groupe.',
   demo:{enonce:'Prouve <i>a</i>·0 = 0, puis (−<i>a</i>)<i>b</i> = −(<i>ab</i>), puis (−<i>a</i>)(−<i>b</i>) = <i>ab</i>.',
    etapes:[{f:'<i>a</i>·0 = <i>a</i>·(0 + 0) = <i>a</i>·0 + <i>a</i>·0',w:'0 + 0 = 0, puis distributivité.'},
     {f:'On ajoute −(<i>a</i>·0) aux deux membres : 0 = <i>a</i>·0.',w:'Astuce 1 : dans un groupe, x + x = x entraîne x = 0. De même 0·b = 0.'},
     {f:'(−<i>a</i>)<i>b</i> + <i>ab</i> = (−<i>a</i> + <i>a</i>)<i>b</i> = 0·<i>b</i> = 0',w:'Distributivité à droite, puis le résultat précédent.'},
     {f:'Donc (−<i>a</i>)<i>b</i> = −(<i>ab</i>).',w:'Astuce 2 : (−a)b ajouté à ab donne 0, c’est donc l’opposé de ab.'},
     {f:'(−<i>a</i>)(−<i>b</i>) = −(<i>a</i>(−<i>b</i>)) = −(−(<i>ab</i>)) = <i>ab</i>',w:'On applique deux fois la règle, puis −(−x) = x, vrai dans tout groupe.'}],
    conclusion:'Avec <i>a</i> = <i>b</i> = 1, on obtient <b>(−1)(−1) = 1</b> dans tout anneau. Par exemple dans ℤ/7ℤ : 6·6 = 36 = 5·7 + 1, donc 6·6 = 1, et en effet 6 = −1.'}},
  {h:'Une preuve guidée',p:'On veut prouver (−<i>a</i>)<i>b</i> = −(<i>ab</i>). Quel argument est correct et n’utilise que les axiomes&nbsp;?',
   opts:['C’est la règle des signes, vraie pour les nombres','(−a)b + ab = (−a + a)b = 0·b = 0, et l’opposé de ab est unique','(−a)b = −a·b, on enlève les parenthèses','(−a)b = (−1)ab, par définition de −a'],ans:1,
   why:'On montre que (−a)b ajouté à ab donne 0 (distributivité puis 0·b = 0). Comme l’opposé de ab est unique dans le groupe (A, +), (−a)b = −(ab). Les autres réponses supposent ce qu’il faut prouver.'},
  {h:'Le binôme exige la commutativité',p:`Dans tout anneau, la distributivité donne (<i>a</i> + <i>b</i>)² = <i>a</i>² + <i>ab</i> + <i>ba</i> + <i>b</i>². On ne peut écrire <i>ab</i> + <i>ba</i> = 2<i>ab</i> que si <i>ab</i> = <i>ba</i>. Quand <i>a</i> et <i>b</i> <b>commutent</b>, on retrouve les identités remarquables et la formule du binôme (<i>a</i> + <i>b</i>)ⁿ = Σ C(<i>n</i>, <i>k</i>) <i>a</i>ᵏ<i>b</i>ⁿ⁻ᵏ.<br><b>Contre-exemple</b> dans M₂(ℝ) : <i>A</i> = ${mat([[1,0],[0,0]])}, <i>B</i> = ${mat([[0,1],[0,0]])}. Alors <i>AB</i> = ${mat([[0,1],[0,0]])} mais <i>BA</i> = ${mat([[0,0],[0,0]])}, et (<i>A</i> + <i>B</i>)² = ${mat([[1,1],[0,0]])} ≠ <i>A</i>² + 2<i>AB</i> + <i>B</i>² = ${mat([[1,2],[0,0]])}.`,
   note:'Dans un anneau commutatif comme ℤ/nℤ ou ℝ[T], toutes les identités remarquables restent vraies. Dans M₂(ℝ), elles valent pour deux matrices qui commutent, par exemple <i>A</i> et <i>I</i>.'},
  {h:'Unités et diviseurs de zéro',p:`Un élément <i>a</i> est <b>inversible</b> (on dit aussi une <b>unité</b>) s’il existe <i>b</i> avec <i>ab</i> = <i>ba</i> = 1. Les unités forment un groupe pour ·, noté <i>A</i><sup>×</sup>. Exemples : ℤ<sup>×</sup> = {−1 ; 1} ; ℝ[T]<sup>×</sup> = les constantes non nulles (le degré s’ajoute dans un produit) ; M₂(ℝ)<sup>×</sup> = les matrices de déterminant non nul.<br>Un élément <i>a</i> ≠ 0 est un <b>diviseur de zéro</b> s’il existe <i>b</i> ≠ 0 avec <i>ab</i> = 0 ou <i>ba</i> = 0. Exemples : ${mat([[1,0],[0,0]])}·${mat([[0,0],[0,1]])} = 0 dans M₂(ℝ) ; dans ℱ(ℝ, ℝ), <i>f</i>(<i>x</i>) = <i>x</i> + |<i>x</i>| et <i>g</i>(<i>x</i>) = <i>x</i> − |<i>x</i>| sont non nulles, mais <i>fg</i> = <i>x</i>² − <i>x</i>² = 0.`,
   note:'Un diviseur de zéro n’est <b>jamais</b> inversible : si <i>ab</i> = 0 avec <i>b</i> ≠ 0 et <i>a</i> inversible, alors <i>b</i> = <i>a</i>⁻¹<i>ab</i> = <i>a</i>⁻¹·0 = 0, contradiction.'},
  {h:'Les tables de ℤ/nℤ',p:'Voici la table de multiplication (ou d’addition) de ℤ/nℤ. Dans la table de multiplication, une case <b>verte</b> contient 1 : sa ligne et sa colonne sont inverses l’une de l’autre. Une case <b>rouge</b> contient 0 alors que ni la ligne ni la colonne ne valent 0 : ce sont des diviseurs de zéro. Fais varier <i>n</i> et compare 7, 8, 11 et 12.',
   params:[{id:'n',l:'n',min:2,max:12,v:6},{id:'op',l:'Table (0 = addition, 1 = multiplication)',min:0,max:1,v:1}],
   draw:v=>tableZ(v.n,v.op),
   info:v=>v.op?`Unités : ${lst(unites(v.n))} · diviseurs de zéro : ${lst(divz(v.n))}<br>${premier(v.n)?`<b>${v.n} est premier : chaque ligne non nulle contient un 1, ℤ/${v.n}ℤ est un corps.</b>`:`${v.n} n’est pas premier : ℤ/${v.n}ℤ n’est pas un corps.`}`:`Table d’addition : chaque ligne contient exactement un 0 (en turquoise), car tout élément a un opposé. L’opposé de 1 est ${v.n-1}.`,
   note:'Les unités sont exactement les <i>a</i> premiers avec <i>n</i>. Chaque élément non nul est <b>soit</b> une unité, <b>soit</b> un diviseur de zéro : il n’y a pas de troisième cas dans ℤ/nℤ.'},
  {h:'Multiplier par a : bijection ou collisions',p:'Chaque flèche envoie <i>x</i> sur <i>a</i>·<i>x</i> dans ℤ/nℤ. Si toutes les cibles sont atteintes (points jaunes), la multiplication par <i>a</i> est une bijection, et le point qui arrive sur 1 donne l’inverse de <i>a</i>. Si deux flèches arrivent au même point, <i>ax</i> = <i>ay</i> avec <i>x</i> ≠ <i>y</i>, donc <i>a</i>(<i>x</i> − <i>y</i>) = 0.',
   params:[{id:'n',l:'n',min:2,max:12,v:8},{id:'a',l:'a',min:0,max:11,v:6}],
   draw:v=>colonnes(v.n,mod(v.a,v.n)),
   info:v=>{ const a=mod(v.a,v.n), d=gcd(a,v.n); return `a = ${v.a}${v.a>=v.n?` ≡ ${a}`:''} dans ℤ/${v.n}ℤ, pgcd(a, n) = ${d}<br>`+(d===1?`<b>Bijection</b> : ${a} est inversible, d’inverse ${inv(a,v.n)} car ${a} · ${inv(a,v.n)} = ${a*inv(a,v.n)} ≡ 1.`:a===0?'Tout part sur 0.':`<b>Collisions</b> : ${a} · ${v.n/d} = ${a*v.n/d} ≡ 0, donc ${a} est un diviseur de zéro.`); }},
  {kind:'Méthode',h:'Unités et diviseurs de zéro de ℤ/nℤ par le pgcd',
   p:'<b>Quand :</b> on cherche si <i>a</i> est inversible dans ℤ/nℤ, ou un <i>b</i> ≠ 0 avec <i>ab</i> = 0. <b>Pourquoi ça marche :</b> soit <i>d</i> = pgcd(<i>a</i>, <i>n</i>). Si <i>d</i> = 1, Bézout donne <i>au</i> + <i>nv</i> = 1, donc <i>a</i>·<i>u</i> = 1 dans ℤ/nℤ. Si <i>d</i> > 1, alors <i>a</i>·(<i>n</i>/<i>d</i>) = (<i>a</i>/<i>d</i>)·<i>n</i> = 0 avec 0 < <i>n</i>/<i>d</i> < <i>n</i>.<br><b>Pour 0 < <i>a</i> < <i>n</i> : <i>a</i> inversible ⇔ pgcd(<i>a</i>, <i>n</i>) = 1 ; sinon <i>a</i> est un diviseur de zéro, annulé par <i>n</i>/<i>d</i>.</b>',
   demo:{enonce:'Trouve les unités et les diviseurs de zéro de ℤ/12ℤ.',
    etapes:[{f:'pgcd(<i>a</i>, 12) = 1 pour <i>a</i> ∈ {1 ; 5 ; 7 ; 11}.',w:'On élimine les multiples de 2 et de 3, les facteurs premiers de 12.'},
     {f:'5·5 = 25 = 2·12 + 1, 7·7 = 49 = 4·12 + 1, 11·11 = 121 = 10·12 + 1.',w:'Chacune de ces unités est ici son propre inverse.'},
     {f:'2·6 = 0, 3·4 = 0, 4·3 = 0, 6·2 = 0, 8·3 = 0, 9·4 = 0, 10·6 = 0.',w:'Pour a avec d = pgcd(a, 12) > 1, on multiplie par 12/d : par exemple d = 2 pour 10, donc 10·6 = 60 = 5·12.'}],
    conclusion:'Unités : {1 ; 5 ; 7 ; 11} ; diviseurs de zéro : {2 ; 3 ; 4 ; 6 ; 8 ; 9 ; 10}. Compte : 4 + 7 = 11 éléments non nuls.'}},
  {h:'Combien d’unités ?',p:'Combien l’anneau ℤ/15ℤ a-t-il d’éléments inversibles&nbsp;?',lab:'unités :',ans:8,
   why:'Il faut pgcd(a, 15) = 1, donc a non multiple de 3 ni de 5 : {1 ; 2 ; 4 ; 7 ; 8 ; 11 ; 13 ; 14}, soit 8 unités.'},
  {kind:'Pratique',h:'Annuler 6 dans ℤ/14ℤ',p:'Sur l’horloge de ℤ/14ℤ, le point turquoise est <i>b</i> et le point jaune est 6·<i>b</i>. Règle <i>b</i> ≠ 0 pour que 6·<i>b</i> = 0.',
   params:[{id:'b',l:'b',min:0,max:13,v:1}],
   draw:v=>{ const m={}; m[v.b]='var(--accent)'; m[mod(6*v.b,14)]=v.b===0?'var(--accent)':'var(--spark)'; return horloge(14,m,[v.b,mod(6*v.b,14)]); },
   info:v=>`6 · ${v.b} = ${6*v.b} ≡ <b>${mod(6*v.b,14)}</b> (mod 14)`,
   ok:v=>v.b!==0&&mod(6*v.b,14)===0,
   why:'pgcd(6, 14) = 2, donc on multiplie par 14/2 = 7 : 6·7 = 42 = 3·14 ≡ 0. Ainsi 6 et 7 sont des diviseurs de zéro de ℤ/14ℤ.'},
  {h:'Anneaux d’intégrité et corps',p:`Un anneau commutatif (avec 1 ≠ 0) est <b>intègre</b> s’il n’a aucun diviseur de zéro : <b><i>ab</i> = 0 ⇒ <i>a</i> = 0 ou <i>b</i> = 0</b>. On peut alors <b>simplifier</b> : <i>ab</i> = <i>ac</i> et <i>a</i> ≠ 0 donnent <i>a</i>(<i>b</i> − <i>c</i>) = 0, donc <i>b</i> = <i>c</i>.<br>Un <b>corps</b> est un anneau commutatif où tout élément non nul est inversible. ℚ et ℝ sont des corps ; ℤ et ℝ[T] sont intègres mais ne sont pas des corps ; M₂(ℝ) et ℤ/6ℤ ne sont pas intègres.<br><b>ℤ/nℤ est un corps ⇔ <i>n</i> est premier.</b>`,
   note:'Pourquoi : si <i>n</i> est premier, tout <i>a</i> ∈ {1, …, <i>n</i> − 1} est premier avec <i>n</i>, donc inversible. Si <i>n</i> = <i>rs</i> avec 1 < <i>r</i>, <i>s</i> < <i>n</i>, alors <i>r</i>·<i>s</i> = 0 : <i>r</i> est un diviseur de zéro.'},
  {h:'Un corps est intègre',p:'Dans un corps <i>K</i>, on suppose <i>ab</i> = 0 et <i>a</i> ≠ 0. Quel argument prouve <i>b</i> = 0&nbsp;?',
   opts:['On divise par a des deux côtés, comme dans ℝ','b = 1·b = (a⁻¹a)b = a⁻¹(ab) = a⁻¹·0 = 0','Si b ≠ 0, alors ab ≠ 0 car un produit de non nuls est non nul','Comme K est commutatif, ba = 0 aussi'],ans:1,
   why:'a ≠ 0 est inversible dans un corps. On écrit b = (a⁻¹a)b, on regroupe par associativité, et on utilise x·0 = 0. La 3e réponse suppose ce qu’on veut prouver ; la 1re n’est qu’une image.'},
  {kind:'Méthode',h:'Inverser a modulo n par l’algorithme d’Euclide étendu',
   p:'<b>Quand :</b> pgcd(<i>a</i>, <i>n</i>) = 1 et <i>n</i> est trop grand pour essayer toutes les valeurs. <b>Comment :</b> 1) on enchaîne les divisions euclidiennes de <i>n</i> par <i>a</i>, puis du diviseur par le reste, jusqu’au reste 1 ; 2) on remonte les égalités pour écrire 1 = <i>nv</i> + <i>au</i> ; 3) dans ℤ/nℤ, <i>nv</i> = 0, donc <b><i>a</i>⁻¹ = <i>u</i> mod <i>n</i></b>, ramené entre 0 et <i>n</i> − 1. 4) On contrôle en calculant <i>a</i>·<i>u</i>.',
   demo:{enonce:'Trouve l’inverse de 11 dans ℤ/26ℤ.',
    etapes:[{f:'26 = 2·11 + 4 ; 11 = 2·4 + 3 ; 4 = 1·3 + 1.',w:'Divisions successives jusqu’au reste 1 : le pgcd vaut 1, donc 11 est inversible.'},
     {f:'1 = 4 − 3 = 4 − (11 − 2·4) = 3·4 − 11',w:'On remonte : on remplace 3 par son expression tirée de la 2e division.'},
     {f:'1 = 3·(26 − 2·11) − 11 = 3·26 − 7·11',w:'On remplace 4 par 26 − 2·11 (1re division) et on regroupe.'},
     {f:'Dans ℤ/26ℤ : 11·(−7) = 1, et −7 ≡ 19.',w:'Le terme 3·26 est nul modulo 26. On ramène −7 entre 0 et 25.'},
     {f:'Contrôle : 11·19 = 209 = 8·26 + 1.',w:'Toujours vérifier.'}],
    conclusion:'11⁻¹ = <b>19</b> dans ℤ/26ℤ. Pour résoudre une équation <i>ax</i> = <i>c</i> dans ℤ/nℤ avec <i>a</i> inversible, on multiplie par <i>a</i>⁻¹ : <i>x</i> = <i>a</i>⁻¹<i>c</i>. Par exemple 11<i>x</i> = 2 donne <i>x</i> = 19·2 = 38 ≡ 12.'}},
  {h:'Inverse de 7 modulo 26',p:'Trouve l’inverse de 7 dans ℤ/26ℤ (entre 0 et 25).',lab:'7⁻¹ =',ans:15,
   why:'26 = 3·7 + 5, 7 = 1·5 + 2, 5 = 2·2 + 1. On remonte : 1 = 5 − 2·2 = 5 − 2(7 − 5) = 3·5 − 2·7 = 3(26 − 3·7) − 2·7 = 3·26 − 11·7. Donc 7⁻¹ ≡ −11 ≡ 15. Contrôle : 7·15 = 105 = 4·26 + 1.'},
  {kind:'Pratique',h:'L’inverse de 5 dans le corps ℤ/17ℤ',p:'17 est premier, donc ℤ/17ℤ est un corps et 5 y a un inverse. Le point turquoise est <i>x</i>, le point jaune est 5·<i>x</i>. Règle <i>x</i> pour que 5·<i>x</i> = 1.',
   params:[{id:'x',l:'x',min:0,max:16,v:1}],
   draw:v=>{ const m={}; m[v.x]='var(--accent)'; const r=mod(5*v.x,17); m[r]=r===1?'var(--ok)':'var(--spark)'; if(r===v.x) m[r]='var(--accent)'; return horloge(17,m,[v.x,r]); },
   info:v=>`5 · ${v.x} = ${5*v.x} ≡ <b>${mod(5*v.x,17)}</b> (mod 17)`,
   ok:v=>mod(5*v.x,17)===1,
   why:'17 = 3·5 + 2 et 5 = 2·2 + 1, donc 1 = 5 − 2·2 = 5 − 2(17 − 3·5) = 7·5 − 2·17. Ainsi 5⁻¹ = 7 : 5·7 = 35 = 2·17 + 1.'},
  {h:'Sous-anneaux, homomorphismes, caractéristique',p:`Une partie <i>B</i> de <i>A</i> est un <b>sous-anneau</b> si elle contient 1 et est stable par +, par −, et par ·. Exemple : ℤ[√2] = {<i>a</i> + <i>b</i>√2 : <i>a</i>, <i>b</i> ∈ ℤ} est un sous-anneau de ℝ, car (<i>a</i> + <i>b</i>√2)(<i>c</i> + <i>d</i>√2) = (<i>ac</i> + 2<i>bd</i>) + (<i>ad</i> + <i>bc</i>)√2.<br>Une application <i>f</i> : <i>A</i> → <i>B</i> est un <b>homomorphisme d’anneaux</b> si <b><i>f</i>(<i>x</i> + <i>y</i>) = <i>f</i>(<i>x</i>) + <i>f</i>(<i>y</i>), <i>f</i>(<i>xy</i>) = <i>f</i>(<i>x</i>)<i>f</i>(<i>y</i>) et <i>f</i>(1) = 1</b>. Exemples : ℤ → ℤ/nℤ qui envoie <i>x</i> sur sa classe ; la conjugaison <i>a</i> + <i>b</i>√2 ↦ <i>a</i> − <i>b</i>√2 de ℤ[√2]. Contre-exemple : det : M₂(ℝ) → ℝ est multiplicatif mais pas additif.`,
   note:'La <b>caractéristique</b> d’un anneau est le plus petit <i>n</i> ≥ 1 tel que 1 + 1 + ⋯ + 1 (<i>n</i> termes) = 0, et 0 si un tel <i>n</i> n’existe pas. ℤ, ℚ, ℝ : caractéristique 0 ; ℤ/nℤ : <i>n</i> ; (𝒫(<i>E</i>), Δ, ∩) : 2, car <i>E</i> Δ <i>E</i> = ∅.'},
  {h:'Un vrai sous-anneau de ℝ',p:'Laquelle de ces parties de ℝ est un sous-anneau de (ℝ, +, ·)&nbsp;?',
   opts:['2ℤ, les entiers pairs','ℕ','[0 ; +∞[','ℤ[√2] = {a + b√2 : a, b ∈ ℤ}'],ans:3,
   why:'ℤ[√2] contient 1, est stable par +, − et par produit. 2ℤ ne contient pas 1 ; ℕ et [0 ; +∞[ ne sont pas stables par passage à l’opposé.'},
  {h:'Un anneau intègre fini est un corps',p:'<b>Théorème :</b> tout anneau intègre <b>fini</b> est un corps. Soit <i>a</i> ≠ 0 et <i>m</i> : <i>A</i> → <i>A</i>, <i>x</i> ↦ <i>ax</i>. Si <i>m</i> est injective, elle est bijective (<i>A</i> est fini), donc un <i>x</i> vérifie <i>ax</i> = 1. Pourquoi <i>m</i> est-elle injective&nbsp;?',
   opts:['Parce que A est fini','Parce que a est inversible','ax = ay donne a(x − y) = 0, et comme a ≠ 0 et A intègre, x − y = 0','Parce que A est commutatif'],ans:2,
   why:'On simplifie par a ≠ 0 grâce à l’intégrité. Dire « a est inversible » serait circulaire, c’est ce qu’on veut prouver. La finitude sert ensuite : une injection d’un ensemble fini dans lui-même est une bijection.'},
  {kind:'Problème',h:'Résoudre dans ℤ/21ℤ',
   p:'On travaille dans l’anneau ℤ/21ℤ, avec 21 = 3·7. Ce n’est pas un corps, mais certains éléments y sont inversibles, et on veut résoudre l’équation 10<i>x</i> = 4. On cherche aussi les éléments qui annulent 6.',
   parts:[
    {q:'a) Combien ℤ/21ℤ a-t-il d’éléments inversibles&nbsp;?',lab:'unités :',ans:12,hint:'Compte les a entre 1 et 20 qui ne sont multiples ni de 3 ni de 7.',why:'Multiples de 3 : 6 ; multiples de 7 : 2 ; aucun multiple de 21 entre 1 et 20. Il reste 20 − 6 − 2 = 12 unités.'},
    {q:'b) Quel est l’inverse de 10 dans ℤ/21ℤ (entre 0 et 20)&nbsp;?',lab:'10⁻¹ =',ans:19,hint:'Euclide étendu : 21 = 2·10 + 1.',why:'1 = 21 − 2·10, donc 10·(−2) = 1 et 10⁻¹ ≡ −2 ≡ 19. Contrôle : 10·19 = 190 = 9·21 + 1.'},
    {q:'c) Résous 10<i>x</i> = 4 dans ℤ/21ℤ.',lab:'x =',ans:13,hint:'Multiplie les deux membres par l’inverse de 10.',why:'x = 19·4 = 76 = 3·21 + 13, donc x = 13. Contrôle : 10·13 = 130 = 6·21 + 4.'},
    {q:'d) Quel est le plus petit <i>b</i> ≥ 1 tel que 6·<i>b</i> = 0 dans ℤ/21ℤ&nbsp;?',lab:'b =',ans:7,hint:'Calcule d = pgcd(6, 21) et multiplie par 21/d.',why:'pgcd(6, 21) = 3, donc 6·7 = 42 = 2·21 ≡ 0. Et 6b ≡ 0 impose 7 | 2b, donc 7 | b : 7 est le plus petit.'},
   ],
   sol:'Les unités de ℤ/21ℤ sont les classes premières avec 21 : il y en a 20 − 6 − 2 = <b>12</b>.<br>Comme 21 = 2·10 + 1, on a 1 = 21 − 2·10, donc 10⁻¹ = −2 = <b>19</b>.<br>L’équation 10<i>x</i> = 4 se résout en multipliant par 19 : <i>x</i> = 76 mod 21 = <b>13</b>, et 10·13 = 130 ≡ 4.<br>Enfin pgcd(6, 21) = 3 : 6 n’est pas inversible, c’est un diviseur de zéro, annulé par <b>7</b> (6·7 = 42 ≡ 0). On voit au passage que 6<i>x</i> = 4 n’a aucune solution : 6<i>x</i> est toujours un multiple de 3 modulo 21, et 4 ne l’est pas.'},
  {kind:'Problème',h:'Les unités de ℤ[√2]',
   p:'Dans le sous-anneau ℤ[√2] = {<i>a</i> + <i>b</i>√2 : <i>a</i>, <i>b</i> ∈ ℤ} de ℝ, on note σ(<i>a</i> + <i>b</i>√2) = <i>a</i> − <i>b</i>√2 la conjugaison, qui est un homomorphisme d’anneaux, et <i>N</i>(<i>x</i>) = <i>x</i>·σ(<i>x</i>) = <i>a</i>² − 2<i>b</i>², un entier. On veut décrire les unités de ℤ[√2] grâce à <i>N</i>. On admet que <i>a</i> + <i>b</i>√2 = 0 avec <i>a</i>, <i>b</i> entiers impose <i>a</i> = <i>b</i> = 0.',
   parts:[
    {q:'a) On écrit (1 + √2)(3 − √2) = <i>a</i> + <i>b</i>√2. Que vaut <i>b</i>&nbsp;?',lab:'b =',ans:2,hint:'Utilise la formule du produit (ac + 2bd) + (ad + bc)√2.',why:'(1 + √2)(3 − √2) = 3 − √2 + 3√2 − 2 = 1 + 2√2, donc b = 2.'},
    {q:'b) Pourquoi <i>N</i>(<i>xy</i>) = <i>N</i>(<i>x</i>)<i>N</i>(<i>y</i>)&nbsp;?',opts:['Parce que N est additive','Parce que a² − 2b² est toujours positif','N(xy) = xy·σ(xy) = xy·σ(x)σ(y) = (xσ(x))(yσ(y)), car σ est un homomorphisme et ℝ est commutatif','Parce que N(1) = 1'],ans:2,hint:'Écris N(xy) avec la définition et utilise σ(xy) = σ(x)σ(y).',why:'σ respecte les produits, et on peut réordonner les facteurs dans ℝ, anneau commutatif.'},
    {q:'c) Si <i>x</i> est une unité de ℤ[√2], que peut valoir <i>N</i>(<i>x</i>)&nbsp;?',opts:['N’importe quel entier non nul','Seulement 1','1 ou −1, car N(x)N(x⁻¹) = N(1) = 1 dans ℤ','0'],ans:2,hint:'Applique b) à x·x⁻¹ = 1, puis cherche les unités de ℤ.',why:'N(x)·N(x⁻¹) = N(1) = 1 avec deux entiers : leur produit vaut 1, donc N(x) ∈ ℤ× = {−1 ; 1}.'},
    {q:'d) <i>N</i>(3 + 2√2) = 9 − 8 = 1. Son inverse s’écrit <i>a</i> + <i>b</i>√2 : que vaut <i>b</i>&nbsp;?',lab:'b =',ans:-2,hint:'Si N(x) = 1, alors x·σ(x) = 1.',why:'(3 + 2√2)(3 − 2√2) = 9 − 8 = 1, donc l’inverse est 3 − 2√2 et b = −2.'},
   ],
   sol:'Le produit se calcule par distributivité : (1 + √2)(3 − √2) = 1 + 2√2.<br>Comme σ est un homomorphisme et ℝ est commutatif, <i>N</i>(<i>xy</i>) = <i>xy</i>σ(<i>x</i>)σ(<i>y</i>) = <i>N</i>(<i>x</i>)<i>N</i>(<i>y</i>).<br>Si <i>x</i> est inversible, <i>N</i>(<i>x</i>)<i>N</i>(<i>x</i>⁻¹) = <i>N</i>(1) = 1, donc <i>N</i>(<i>x</i>) = ±1. Réciproquement, si <i>N</i>(<i>x</i>) = ±1, alors <i>x</i>·(±σ(<i>x</i>)) = 1 et <i>x</i> est inversible.<br>Ainsi 3 + 2√2 a pour inverse <b>3 − 2√2</b>. Comme 1 + √2 > 1 est une unité (<i>N</i> = −1), ses puissances, toutes distinctes, sont des unités : ℤ[√2] en a une infinité, alors que ℤ n’en a que deux.'},
]},

/* ===================== 2. LE CORPS F₂ ET LES PARTIES ===================== */
{subj:'gred',sem:'ann',id:'gred-f2',h:'Le corps F₂ et l’anneau des parties',p:'Une utilisation remarquable d’un corps fini : coder chaque partie par sa fonction caractéristique et prouver des identités ensemblistes par un simple calcul.',steps:[
  {h:'Le plus petit des corps',p:'Le corps <b>F₂</b> est ℤ/2ℤ : deux éléments, 0 et 1, et deux tables. 2 est premier, donc c’est un corps. La seule surprise est la case jaune : <b>1 + 1 = 0</b>. Penses-y comme à la parité : 0 = « pair », 1 = « impair », et impair + impair = pair.',
   fig:tablesF2(),
   note:'Dans F₂, chaque élément est son propre opposé : −1 = 1. Soustraire, c’est donc additionner.'},
  {h:'Une longue somme',p:'Dans F₂, combien vaut 1 + 1 + 1 + 1 + 1 + 1 + 1 (sept termes)&nbsp;?',lab:'somme =',ans:1,
   why:'Les termes s’annulent deux par deux (1 + 1 = 0). Avec sept termes, il en reste un : la somme vaut 1. Une somme de 1 dans F₂ dit si leur nombre est impair.'},
  {h:'Trois règles et un dictionnaire',p:`Pour tout <i>x</i> de F₂ : <b><i>x</i> + <i>x</i> = 0</b>, <b>−<i>x</i> = <i>x</i></b> et <b><i>x</i>² = <i>x</i></b> (0² = 0, 1² = 1). Lis 1 comme « vrai » et 0 comme « faux » :<ul><li><i>xy</i> = 1 ⇔ <i>x</i> = 1 <b>et</b> <i>y</i> = 1 ;</li><li><i>x</i> + <i>y</i> = 1 ⇔ exactement un des deux vaut 1 (<b>ou exclusif</b>) ;</li><li>1 + <i>x</i> = 1 ⇔ <i>x</i> = 0 (<b>non</b>) ;</li><li><i>x</i> + <i>y</i> + <i>xy</i> = 1 ⇔ au moins un des deux vaut 1 (<b>ou</b>).</li></ul>`,
   note:'Ces quatre traductions se vérifient sur les 4 cas (<i>x</i> ; <i>y</i>) ∈ {0 ; 1}². C’est tout ce qu’il faudra pour la suite.'},
  {h:'Le « ou » dans F₂',p:'Pour <i>x</i> = <i>y</i> = 1 dans F₂, que vaut <i>x</i> + <i>y</i> + <i>xy</i>&nbsp;?',
   opts:['0, comme le ou exclusif','2','1, comme « vrai ou vrai » qui est vrai','On ne peut pas calculer dans F₂'],ans:2,
   why:'1 + 1 + 1·1 = 1 + 1 + 1 = 1. Le ou exclusif x + y donnerait 0 ; le terme xy corrige exactement ce cas.'},
  {h:'La fonction caractéristique',p:`Soit <i>E</i> un ensemble et <i>A</i> ⊂ <i>E</i>. La <b>fonction caractéristique</b> de <i>A</i> est χ<sub>A</sub> : <i>E</i> → F₂, avec <b>χ<sub>A</sub>(<i>x</i>) = 1 si <i>x</i> ∈ <i>A</i>, 0 sinon</b>.<br>L’application <i>A</i> ↦ χ<sub>A</sub> est une <b>bijection</b> de 𝒫(<i>E</i>) sur F₂<sup>E</sup>, l’ensemble des fonctions <i>E</i> → F₂ : la réciproque envoie <i>f</i> sur <i>f</i>⁻¹({1}). En particulier, <b><i>A</i> = <i>B</i> ⇔ χ<sub>A</sub> = χ<sub>B</sub></b>.<br>Si <i>E</i> = {1, …, <i>n</i>}, χ<sub>A</sub> est un mot de <i>n</i> chiffres 0 ou 1 : pour <i>E</i> = {1, …, 5}, <i>A</i> = {2 ; 3} est codé 01100.`,
   note:'On retrouve card 𝒫(<i>E</i>) = 2ⁿ : il y a 2ⁿ mots de <i>n</i> chiffres binaires.'},
  {h:'Venn et rangées de 0 et 1',p:'<i>E</i> = {1, …, 5}. Chaque curseur d’élément le place : 0 = hors de <i>A</i> ∪ <i>B</i>, 1 = dans <i>A</i> seulement, 2 = dans <i>B</i> seulement, 3 = dans <i>A</i> ∩ <i>B</i>. Sous le diagramme, les rangées χ<sub>A</sub> et χ<sub>B</sub>, puis la fonction caractéristique de l’opération choisie, calculée <b>case par case</b> dans F₂. Compare la zone coloriée et la dernière rangée.',
   params:[{id:'e1',l:'élément 1',min:0,max:3,v:1},{id:'e2',l:'élément 2',min:0,max:3,v:3},{id:'e3',l:'élément 3',min:0,max:3,v:2},{id:'e4',l:'élément 4',min:0,max:3,v:0},{id:'e5',l:'élément 5',min:0,max:3,v:3},
     {id:'op',l:'Opération (∩, Δ, ∪, Aᶜ, A \\ B)',min:0,max:4,v:0}],
   draw:v=>vennF2(posOf(v),[v.op]),
   info:v=>{ const p=posOf(v), a=p.map(r=>r===1||r===3?1:0), b=p.map(r=>r===2||r===3?1:0), o=OPS[v.op]; return `χ<sub>A</sub> = ${word(a)}, χ<sub>B</sub> = ${word(b)}<br><b>${o.n}</b> ↔ ${o.h} = ${word(a.map((x,k)=>o.f(x,b[k])))}`; },
   note:'∩ correspond au <b>produit</b> et Δ à la <b>somme</b> dans F₂. C’est toute l’idée du chapitre.'},
  {h:'Coder une partie',p:'Dans <i>E</i> = {1, …, 6}, quel mot code la partie <i>A</i> = {2 ; 3 ; 6}&nbsp;?',
   opts:['100110','110010','011001','011010'],ans:2,
   why:'On lit les éléments 1 à 6 dans l’ordre : 1 ∉ A (0), 2 ∈ A (1), 3 ∈ A (1), 4 ∉ A (0), 5 ∉ A (0), 6 ∈ A (1) : 011001. Le mot 100110 code le complémentaire.'},
  {h:'Le dictionnaire ensembles ↔ F₂',p:`Pour <i>A</i>, <i>B</i> ⊂ <i>E</i>, en notant <i>a</i> = χ<sub>A</sub> et <i>b</i> = χ<sub>B</sub>, les opérations se calculent point par point :<br><b>χ<sub>A∩B</sub> = <i>ab</i></b> &nbsp; <b>χ<sub>AΔB</sub> = <i>a</i> + <i>b</i></b> &nbsp; <b>χ<sub>Aᶜ</sub> = 1 + <i>a</i></b> &nbsp; <b>χ<sub>A∪B</sub> = <i>a</i> + <i>b</i> + <i>ab</i></b><br>avec χ<sub>∅</sub> = 0 (fonction nulle) et χ<sub>E</sub> = 1 (fonction constante 1).`,
   note:'L’union est la seule opération qui demande trois termes. C’est pourquoi on préfère Δ à ∪ pour faire de l’algèbre.'},
  {kind:'Méthode',h:'Vérifier une traduction par les quatre cas',
   p:'<b>Quand :</b> on veut prouver une formule χ<sub>X</sub> = (expression en <i>a</i>, <i>b</i>). <b>Pourquoi :</b> deux fonctions de <i>E</i> dans F₂ sont égales si elles prennent la même valeur en chaque <i>x</i>. Or en un point <i>x</i>, seuls comptent <i>a</i>(<i>x</i>) et <i>b</i>(<i>x</i>), qui valent 0 ou 1 : il n’y a que <b>4 cas</b>, qui correspondent aux 4 régions du diagramme de Venn. Avec trois parties, il y a 8 cas.',
   demo:{enonce:'Prouve χ<sub>A∪B</sub> = <i>a</i> + <i>b</i> + <i>ab</i>.',
    etapes:[{f:'<i>x</i> hors de <i>A</i> et de <i>B</i> : <i>a</i> = <i>b</i> = 0, donc <i>a</i> + <i>b</i> + <i>ab</i> = 0, et <i>x</i> ∉ <i>A</i> ∪ <i>B</i>.',w:'Région extérieure : les deux membres valent 0.'},
     {f:'<i>x</i> dans <i>A</i> seulement : 1 + 0 + 0 = 1, et <i>x</i> ∈ <i>A</i> ∪ <i>B</i>.',w:'Région « A seul ».'},
     {f:'<i>x</i> dans <i>B</i> seulement : 0 + 1 + 0 = 1, et <i>x</i> ∈ <i>A</i> ∪ <i>B</i>.',w:'Région « B seul ».'},
     {f:'<i>x</i> ∈ <i>A</i> ∩ <i>B</i> : 1 + 1 + 1 = 1, et <i>x</i> ∈ <i>A</i> ∪ <i>B</i>.',w:'Le cas délicat : 1 + 1 = 0, puis + 1 donne 1.'}],
    conclusion:'Les deux fonctions coïncident en tout point : <b>χ<sub>A∪B</sub> = <i>a</i> + <i>b</i> + <i>ab</i></b>. Avec la même méthode, χ<sub>A∖B</sub> = <i>a</i>(1 + <i>b</i>).'}},
  {kind:'Pratique',h:'Placer les éléments',p:'Place les cinq éléments pour que <b><i>A</i> Δ <i>B</i> = {1 ; 2}</b> et <b><i>A</i> ∩ <i>B</i> = {3}</b>, les éléments 4 et 5 n’étant ni dans <i>A</i> ni dans <i>B</i>. Les deux dernières rangées affichent χ<sub>AΔB</sub> et χ<sub>A∩B</sub>.',
   params:[{id:'e1',l:'élément 1',min:0,max:3,v:0},{id:'e2',l:'élément 2',min:0,max:3,v:0},{id:'e3',l:'élément 3',min:0,max:3,v:0},{id:'e4',l:'élément 4',min:0,max:3,v:0},{id:'e5',l:'élément 5',min:0,max:3,v:0}],
   draw:v=>vennF2(posOf(v),[1,0]),
   info:v=>{ const p=posOf(v), a=p.map(r=>r===1||r===3?1:0), b=p.map(r=>r===2||r===3?1:0); return `χ<sub>AΔB</sub> = ${word(a.map((x,k)=>(x+b[k])%2))} (cible 11000) · χ<sub>A∩B</sub> = ${word(a.map((x,k)=>x*b[k]))} (cible 00100)`; },
   ok:v=>{ const p=posOf(v); return (p[0]===1||p[0]===2)&&(p[1]===1||p[1]===2)&&p[2]===3&&p[3]===0&&p[4]===0; },
   why:'χ<sub>A∩B</sub> = ab vaut 1 seulement en 3 : 3 est dans les deux. χ<sub>AΔB</sub> = a + b vaut 1 en 1 et 2 : chacun est dans exactement une des deux parties (peu importe laquelle). En 4 et 5, a = b = 0 : dehors.'},
  {h:'Traduire la différence',p:'Quelle est la fonction caractéristique de <i>A</i> \\ <i>B</i>&nbsp;?',
   opts:['<i>a</i> + <i>b</i>','<i>ab</i>','1 + <i>b</i>','<i>a</i> + <i>ab</i>'],ans:3,
   why:'A \\ B = A ∩ Bᶜ, donc χ = a(1 + b) = a + ab. Contrôle sur le cas a = b = 1 : 1 + 1 = 0, et en effet un élément de A ∩ B n’est pas dans A \\ B.'},
  {h:'(𝒫(E), Δ, ∩) est un anneau',p:`L’ensemble F₂<sup>E</sup> des fonctions <i>E</i> → F₂, avec somme et produit <b>point par point</b>, est un anneau commutatif, exactement comme ℱ(ℝ, ℝ) : chaque axiome se vérifie en chaque point, où il est vrai dans le corps F₂.<br>La bijection <i>A</i> ↦ χ<sub>A</sub> change Δ en + et ∩ en · : les axiomes se <b>transportent</b>. Donc <b>(𝒫(<i>E</i>), Δ, ∩) est un anneau commutatif</b>, de zéro ∅, d’unité <i>E</i>, où chaque partie est son propre opposé (<i>A</i> Δ <i>A</i> = ∅).`,
   note:'C’est un anneau <b>booléen</b> : <i>A</i> ∩ <i>A</i> = <i>A</i>, ce qui se lit <i>a</i>² = <i>a</i>. Sa caractéristique est 2.'},
  {kind:'Méthode',h:'Prouver une identité ensembliste par le calcul',
   p:'<b>Quand :</b> on doit démontrer une égalité entre expressions de parties construites avec Δ, ∩, ᶜ, ∪. <b>Comment :</b> 1) on note <i>a</i>, <i>b</i>, <i>c</i> les fonctions caractéristiques ; 2) on traduit chaque membre avec le dictionnaire ; 3) on développe dans F₂ avec <b><i>x</i> + <i>x</i> = 0</b> et <b><i>x</i>² = <i>x</i></b> ; 4) si on obtient la même expression, les parties sont égales, car <i>A</i> ↦ χ<sub>A</sub> est injective. Plus besoin de double inclusion ni de disjonction de cas.',
   demo:{enonce:'Prouve l’associativité de Δ et la distributivité de ∩ sur Δ.',
    etapes:[{f:'χ<sub>(AΔB)ΔC</sub> = (<i>a</i> + <i>b</i>) + <i>c</i> = <i>a</i> + (<i>b</i> + <i>c</i>) = χ<sub>AΔ(BΔC)</sub>',w:'On traduit Δ par + deux fois ; l’addition de F₂ est associative.'},
     {f:'Donc (<i>A</i> Δ <i>B</i>) Δ <i>C</i> = <i>A</i> Δ (<i>B</i> Δ <i>C</i>).',w:'Mêmes fonctions caractéristiques, mêmes parties.'},
     {f:'χ<sub>A∩(BΔC)</sub> = <i>a</i>(<i>b</i> + <i>c</i>) = <i>ab</i> + <i>ac</i> = χ<sub>(A∩B)Δ(A∩C)</sub>',w:'∩ devient ·, Δ devient +, et on distribue dans F₂.'},
     {f:'χ<sub>AΔBΔC</sub> = <i>a</i> + <i>b</i> + <i>c</i> vaut 1 ⇔ un nombre <b>impair</b> de ces trois valeurs vaut 1.',w:'Bonus : une somme de 0 et de 1 dans F₂ dit si le nombre de 1 est impair.'}],
    conclusion:'(<i>A</i> Δ <i>B</i>) Δ <i>C</i> = <i>A</i> Δ (<i>B</i> Δ <i>C</i>) et <i>A</i> ∩ (<i>B</i> Δ <i>C</i>) = (<i>A</i> ∩ <i>B</i>) Δ (<i>A</i> ∩ <i>C</i>). De plus, <i>A</i> Δ <i>B</i> Δ <i>C</i> est l’ensemble des éléments qui appartiennent à un nombre impair des trois parties.'}},
  {h:'De Morgan en une ligne',p:'On calcule χ<sub>(A∪B)ᶜ</sub> = 1 + (<i>a</i> + <i>b</i> + <i>ab</i>). Quelle factorisation conclut&nbsp;?',
   opts:['1 + a + b, donc (A ∪ B)ᶜ = Aᶜ Δ B','1 + a + b + ab = (1 + a)(1 + b), donc (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ','(1 + a) + (1 + b), donc (A ∪ B)ᶜ = Aᶜ Δ Bᶜ','ab, donc (A ∪ B)ᶜ = A ∩ B'],ans:1,
   why:'En développant, (1 + a)(1 + b) = 1 + a + b + ab. C’est le produit de χ<sub>Aᶜ</sub> et χ<sub>Bᶜ</sub>, donc la fonction caractéristique de Aᶜ ∩ Bᶜ : c’est la loi de De Morgan.'},
  {kind:'Méthode',h:'Résoudre une équation ensembliste',
   p:'<b>Quand :</b> on cherche une partie <i>X</i> telle que <i>A</i> Δ <i>X</i> = <i>B</i>, ou on veut tester une égalité. <b>Pourquoi :</b> dans F₂<sup>E</sup>, <i>a</i> + <i>x</i> = <i>b</i> ⇔ <i>x</i> = <i>b</i> − <i>a</i> = <i>b</i> + <i>a</i>, car −<i>a</i> = <i>a</i>. Donc :<br><b><i>A</i> Δ <i>X</i> = <i>B</i> ⇔ <i>X</i> = <i>A</i> Δ <i>B</i></b> &nbsp;et&nbsp; <b><i>A</i> Δ <i>B</i> = ∅ ⇔ <i>A</i> = <i>B</i></b>.',
   demo:{enonce:'Dans <i>E</i> = {1, …, 8}, <i>A</i> = {1 ; 2 ; 3 ; 4} et <i>B</i> = {2 ; 4 ; 6 ; 8}. Trouve <i>X</i> tel que <i>A</i> Δ <i>X</i> = <i>B</i>.',
    etapes:[{f:'<i>a</i> + <i>x</i> = <i>b</i> ⇔ <i>x</i> = <i>a</i> + <i>b</i>',w:'On ajoute a aux deux membres : a + a = 0.'},
     {f:'<i>X</i> = <i>A</i> Δ <i>B</i> = {1 ; 3 ; 6 ; 8}',w:'Les éléments dans exactement une des deux parties.'},
     {f:'Contrôle : <i>A</i> Δ <i>X</i> = {2 ; 4 ; 6 ; 8} = <i>B</i>.',w:'2 et 4 sont dans A seul, 6 et 8 dans X seul ; 1 et 3 sont dans les deux, donc disparaissent.'}],
    conclusion:'La solution est <b>unique</b> : <i>X</i> = <i>A</i> Δ <i>B</i>. Avec <i>B</i> = ∅, on retrouve que <i>A</i> Δ <i>X</i> = ∅ impose <i>X</i> = <i>A</i>.'}},
  {h:'Une équation à résoudre',p:'Dans <i>E</i> = {1, …, 10}, <i>A</i> = {1 ; 2 ; 3 ; 4 ; 5} et <i>B</i> est l’ensemble des nombres pairs de <i>E</i>. La partie <i>X</i> vérifie <i>X</i> Δ <i>A</i> = <i>B</i>. Quelle est la somme des éléments de <i>X</i>&nbsp;?',lab:'somme =',ans:33,
   why:'X = A Δ B = {1 ; 3 ; 5 ; 6 ; 8 ; 10} : 2 et 4 sont dans les deux et disparaissent. Somme : 1 + 3 + 5 + 6 + 8 + 10 = 33.'},
  {h:'Les anneaux booléens',p:`Un anneau est <b>booléen</b> si <b><i>x</i>² = <i>x</i></b> pour tout <i>x</i>. Exemples : F₂, F₂<sup>E</sup>, (𝒫(<i>E</i>), Δ, ∩). <b>Théorème :</b> dans un anneau booléen, <i>x</i> + <i>x</i> = 0 pour tout <i>x</i>, et l’anneau est commutatif. Les identités ensemblistes deviennent donc des calculs de polynômes où les carrés disparaissent et où les doubles s’annulent.`,
   note:'Dans un anneau booléen, le seul élément inversible est 1 : si <i>xy</i> = 1, alors <i>x</i> = <i>x</i>·1 = <i>x</i>²<i>y</i> = <i>xy</i> = 1.'},
  {h:'Pourquoi x + x = 0',p:'Dans un anneau booléen, quel calcul prouve <i>x</i> + <i>x</i> = 0&nbsp;?',
   opts:['x + x = 2x et 2 = 0','x + x = (x + x)² = x² + x² + x² + x² = x + x + x + x, puis on ajoute −(x + x)','x + x = x² + x² = x(x + x)','x + x = 0 parce que −x = x par définition'],ans:1,
   why:'On applique y² = y à y = x + x, on développe par distributivité et on remplace x² par x. On obtient x + x = (x + x) + (x + x), et dans le groupe (A, +) cela force x + x = 0. Dire « 2 = 0 » ou « −x = x » suppose le résultat.'},
  {kind:'Méthode',h:'Simplifier une expression de parties',
   p:'<b>Quand :</b> une expression mêle ∪, ∩, Δ et complémentaires et on veut sa forme la plus simple. <b>Comment :</b> 1) on traduit en polynôme en <i>a</i>, <i>b</i>, … ; 2) on développe ; 3) on remplace chaque carré <i>a</i>² par <i>a</i> et on supprime les termes en double (<i>t</i> + <i>t</i> = 0) ; 4) on relit le résultat avec le dictionnaire : <i>a</i> + <i>ab</i> = <i>a</i>(1 + <i>b</i>) est <i>A</i> \\ <i>B</i>, etc.',
   demo:{enonce:'Simplifie (<i>A</i> ∪ <i>B</i>) ∩ <i>A</i> puis (<i>A</i> Δ <i>B</i>) ∩ <i>A</i>.',
    etapes:[{f:'(<i>a</i> + <i>b</i> + <i>ab</i>)<i>a</i> = <i>a</i>² + <i>ab</i> + <i>a</i>²<i>b</i> = <i>a</i> + <i>ab</i> + <i>ab</i>',w:'On distribue et on remplace a² par a.'},
     {f:'= <i>a</i>, donc (<i>A</i> ∪ <i>B</i>) ∩ <i>A</i> = <i>A</i>.',w:'ab + ab = 0 : c’est la loi d’absorption.'},
     {f:'(<i>a</i> + <i>b</i>)<i>a</i> = <i>a</i>² + <i>ab</i> = <i>a</i> + <i>ab</i> = <i>a</i>(1 + <i>b</i>)',w:'Même technique.'},
     {f:'Donc (<i>A</i> Δ <i>B</i>) ∩ <i>A</i> = <i>A</i> ∩ <i>B</i>ᶜ = <i>A</i> \\ <i>B</i>.',w:'On relit 1 + b comme χ de Bᶜ.'}],
    conclusion:'Deux lignes de calcul remplacent deux preuves par double inclusion. Contrôle sur un diagramme de Venn : la partie de <i>A</i> Δ <i>B</i> qui est dans <i>A</i> est bien « <i>A</i> seul ».'}},
  {h:'Simplifie',p:'À quoi est égal (<i>A</i> ∪ <i>B</i>) Δ <i>A</i>&nbsp;?',
   opts:['<i>A</i>','<i>B</i> \\ <i>A</i>','<i>A</i> ∩ <i>B</i>','<i>A</i> \\ <i>B</i>'],ans:1,
   why:'(a + b + ab) + a = b + ab = b(1 + a), car a + a = 0. C’est χ de B ∩ Aᶜ = B \\ A.'},
  {h:'Différence symétrique de trois parties',p:'Dans <i>E</i> = {1, …, 10}, <i>A</i> est l’ensemble des nombres pairs, <i>B</i> celui des multiples de 3 et <i>C</i> = {1 ; 2 ; 3 ; 4 ; 5}. Combien d’éléments a <i>A</i> Δ <i>B</i> Δ <i>C</i>&nbsp;?',lab:'card =',ans:5,
   why:'On garde les éléments présents dans un nombre impair de parties. 1 (C), 5 (C), 8 (A), 9 (B), 10 (A) : une fois chacun. 2, 3, 4, 6 sont dans deux parties, 7 dans aucune. Donc A Δ B Δ C = {1 ; 5 ; 8 ; 9 ; 10}, 5 éléments.'},
  {kind:'Problème',h:'∩ distribue sur Δ, mais ∪ non',
   p:'On sait que ∩ est distributive sur Δ. On se demande si ∪ l’est aussi, c’est-à-dire si <i>A</i> ∪ (<i>B</i> Δ <i>C</i>) = (<i>A</i> ∪ <i>B</i>) Δ (<i>A</i> ∪ <i>C</i>) pour toutes parties. On note <i>a</i>, <i>b</i>, <i>c</i> les fonctions caractéristiques et on calcule dans F₂.',
   parts:[
    {q:'a) Quelle est la fonction caractéristique de <i>A</i> ∪ (<i>B</i> Δ <i>C</i>)&nbsp;?',opts:['a + b + c','a + b + c + ab + ac','a(b + c)','a + b + c + abc'],ans:1,hint:'Remplace b par b + c dans la formule de l’union, x + y + xy.',why:'a + (b + c) + a(b + c) = a + b + c + ab + ac.'},
    {q:'b) Celle de (<i>A</i> ∪ <i>B</i>) Δ (<i>A</i> ∪ <i>C</i>) est (<i>a</i> + <i>b</i> + <i>ab</i>) + (<i>a</i> + <i>c</i> + <i>ac</i>). Quelle est la différence entre les deux membres&nbsp;?',opts:['0 : les deux membres sont égaux','a : les deux membres diffèrent exactement sur A','b + c','1'],ans:1,hint:'Simplifie le second membre avec a + a = 0, puis ajoute les deux expressions.',why:'Le second membre vaut b + c + ab + ac. La somme des deux membres vaut a, donc A ∪ (B Δ C) = ((A ∪ B) Δ (A ∪ C)) Δ A.'},
    {q:'c) Dans <i>E</i> = {1, …, 6}, avec <i>A</i> = {1 ; 2}, <i>B</i> = {2 ; 3} et <i>C</i> = {3 ; 4}, combien d’éléments a (<i>A</i> ∪ <i>B</i>) Δ (<i>A</i> ∪ <i>C</i>)&nbsp;?',lab:'card =',ans:1,hint:'Calcule A ∪ B et A ∪ C, puis garde les éléments qui sont dans exactement une des deux.',why:'A ∪ B = {1 ; 2 ; 3}, A ∪ C = {1 ; 2 ; 3 ; 4}, leur différence symétrique est {4}.'},
    {q:'d) Et <i>A</i> ∪ (<i>B</i> Δ <i>C</i>)&nbsp;?',lab:'card =',ans:3,hint:'B Δ C, puis l’union avec A.',why:'B Δ C = {2 ; 4}, donc A ∪ (B Δ C) = {1 ; 2 ; 4}. Les deux membres diffèrent de {1 ; 2} = A, comme prévu.'},
   ],
   sol:'χ de <i>A</i> ∪ (<i>B</i> Δ <i>C</i>) : <i>a</i> + <i>b</i> + <i>c</i> + <i>ab</i> + <i>ac</i>.<br>χ de (<i>A</i> ∪ <i>B</i>) Δ (<i>A</i> ∪ <i>C</i>) : (<i>a</i> + <i>b</i> + <i>ab</i>) + (<i>a</i> + <i>c</i> + <i>ac</i>) = <i>b</i> + <i>c</i> + <i>ab</i> + <i>ac</i>.<br>Les deux expressions diffèrent de <i>a</i> : l’égalité n’est vraie que si <i>A</i> = ∅. L’union n’est donc <b>pas</b> distributive sur Δ.<br>Exemple : <i>A</i> = {1 ; 2}, <i>B</i> = {2 ; 3}, <i>C</i> = {3 ; 4} donne {1 ; 2 ; 4} d’un côté et {4} de l’autre, qui diffèrent exactement de <i>A</i>.'},
  {kind:'Problème',h:'Unités et diviseurs de zéro de 𝒫(E)',
   p:'On regarde (𝒫(<i>E</i>), Δ, ∩) avec les outils du chapitre précédent : unités, diviseurs de zéro. On prend <i>E</i> = {1 ; 2 ; 3 ; 4}, de sorte que l’anneau a 16 éléments. On rappelle que le zéro est ∅ et que l’unité est <i>E</i>.',
   parts:[
    {q:'a) Dans un anneau booléen, on sait déjà que <i>x</i> + <i>x</i> = 0. Que donne (<i>a</i> + <i>b</i>)² = <i>a</i> + <i>b</i>&nbsp;?',opts:['a² + b² = 0','ab + ba = 0, donc ab = −ba = ba : l’anneau est commutatif','2ab = 0, ce qui ne dit rien','a = b'],ans:1,hint:'Développe (a + b)² sans supposer ab = ba, puis remplace a² et b².',why:'(a + b)² = a + ab + ba + b = a + b donne ab + ba = 0, donc ab = −ba, et −ba = ba car y + y = 0.'},
    {q:'b) Quelles parties <i>A</i> sont inversibles, c’est-à-dire telles qu’il existe <i>X</i> avec <i>A</i> ∩ <i>X</i> = <i>E</i>&nbsp;?',opts:['Toutes les parties non vides','Seulement E, car A ∩ X ⊂ A impose A = E','∅ et E','Aucune'],ans:1,hint:'A ∩ X est toujours inclus dans A.',why:'Si A ∩ X = E, alors E ⊂ A, donc A = E. Et E ∩ E = E : seule E est une unité.'},
    {q:'c) Avec <i>A</i> = {1 ; 2}, combien de parties <i>X</i> vérifient <i>A</i> ∩ <i>X</i> = ∅&nbsp;?',lab:'parties :',ans:4,hint:'A ∩ X = ∅ signifie X ⊂ Aᶜ.',why:'X doit être une partie de Aᶜ = {3 ; 4}, qui a 2² = 4 parties.'},
    {q:'d) Combien d’éléments de 𝒫(<i>E</i>) sont des diviseurs de zéro&nbsp;?',lab:'diviseurs :',ans:14,hint:'Pour A ≠ ∅, essaie le produit de A par son complémentaire.',why:'Si A ≠ ∅ et A ≠ E, alors A ∩ Aᶜ = ∅ avec Aᶜ ≠ ∅ : A est un diviseur de zéro. E est inversible, ∅ est le zéro. Il en reste 16 − 2 = 14.'},
   ],
   sol:'Dans un anneau booléen, (<i>a</i> + <i>b</i>)² = <i>a</i> + <i>ab</i> + <i>ba</i> + <i>b</i> = <i>a</i> + <i>b</i> donne <i>ab</i> + <i>ba</i> = 0, d’où <i>ab</i> = <i>ba</i> : il est commutatif.<br>Dans 𝒫(<i>E</i>), <i>A</i> ∩ <i>X</i> ⊂ <i>A</i>, donc <i>A</i> ∩ <i>X</i> = <i>E</i> force <i>A</i> = <i>E</i> : <b>E est la seule unité</b>.<br>Les <i>X</i> tels que {1 ; 2} ∩ <i>X</i> = ∅ sont les parties de {3 ; 4} : <b>4</b> parties.<br>Toute partie <i>A</i> autre que ∅ et <i>E</i> vérifie <i>A</i> ∩ <i>A</i>ᶜ = ∅ avec <i>A</i>ᶜ ≠ ∅ : il y a <b>14</b> diviseurs de zéro. Comme dans ℤ/nℤ, chaque élément non nul est soit une unité, soit un diviseur de zéro.'},
]},

/* ===================== 3. CORPS DES FRACTIONS ===================== */
{subj:'gred',sem:'ann',id:'gred-fractions',h:'Le corps des fractions d’un anneau intègre',p:'Comment construire ℚ à partir de ℤ, et ℝ(T) à partir de ℝ[T] : des couples, une relation d’équivalence, puis des opérations bien définies.',steps:[
  {h:'Pourquoi construire des fractions ?',p:'Dans ℤ, l’équation 2<i>x</i> = 3 n’a pas de solution : 2 n’est pas inversible. On veut un <b>corps</b> qui contienne ℤ, et le plus petit possible. L’idée : un nombre rationnel est « nommé » par un couple (<i>a</i> ; <i>b</i>) avec <i>b</i> ≠ 0, qu’on pense comme <i>a</i>/<i>b</i>. Mais un même nombre a beaucoup de noms : (1 ; 2), (2 ; 4), (−3 ; −6)… Il faut donc <b>regrouper</b> les couples qui désignent la même fraction.',
   note:'On fait cette construction pour un anneau <b>intègre</b> <i>A</i> quelconque : ℤ, ℝ[T], ℝ[T, U]… On verra précisément où l’intégrité sert.'},
  {h:'Les fractions vues comme des points',p:'On dessine le couple (<i>a</i> ; <i>b</i>) comme le point de coordonnées (<i>b</i> ; <i>a</i>) : le dénominateur en abscisse, le numérateur en ordonnée. Le quotient <i>a</i>/<i>b</i> est alors la <b>pente</b> de la droite qui joint O au point. Les couples qui désignent la même fraction sont les points du réseau (en turquoise) situés sur cette droite.',
   params:[{id:'a',l:'numérateur a',min:-6,max:6,v:2},{id:'b',l:'dénominateur b',min:1,max:12,v:3}],
   draw:v=>reseau(v.a,v.b),
   info:v=>{ const g=gcd(v.a,v.b)||1, ar=v.a/g, br=v.b/g, l=[]; for(let k=1;k*br<=12&&Math.abs(k*ar)<=6;k++) l.push(`(${fmt(k*ar)} ; ${k*br})`); return `${F(fmt(v.a),v.b)} = ${F(fmt(ar),br)} (forme irréductible) · pente ${fmt(v.a/v.b,3)}<br>Couples équivalents visibles : ${l.join(', ')}`; },
   note:'Les points de l’axe vertical (<i>b</i> = 0) sont interdits : aucune droite par O ne les distingue.'},
  {h:'La relation d’équivalence',p:`Soit <i>A</i> un anneau intègre et <i>A</i>* = <i>A</i> \\ {0}. Sur <i>A</i> × <i>A</i>*, on pose<br><b>(<i>a</i> ; <i>b</i>) ~ (<i>c</i> ; <i>d</i>) ⇔ <i>ad</i> = <i>bc</i></b>.<br>C’est l’égalité des « produits en croix », sans aucune division. Sur la figure, <i>ad</i> − <i>bc</i> = 0 signifie que les vecteurs (<i>b</i> ; <i>a</i>) et (<i>d</i> ; <i>c</i>) sont colinéaires : les deux points sont alignés avec O.`,
   note:'La définition n’utilise que l’addition et la multiplication de <i>A</i> : elle a donc un sens dans tout anneau commutatif.'},
  {h:'Le bon représentant',p:'Lequel de ces couples d’entiers est équivalent à (3 ; 4)&nbsp;?',
   opts:['(4 ; 3)','(6 ; 4)','(9 ; 12)','(3 ; 8)'],ans:2,
   why:'On compare les produits en croix : 3·12 = 36 = 4·9. Pour (4 ; 3) : 3·3 = 9 ≠ 16 ; pour (6 ; 4) : 12 ≠ 24 ; pour (3 ; 8) : 24 ≠ 12.'},
  {kind:'Méthode',h:'Vérifier que ~ est une relation d’équivalence',
   p:'<b>Quand :</b> avant de parler de « la classe <i>a</i>/<i>b</i> », il faut prouver que ~ est réflexive, symétrique et transitive. <b>Comment :</b> on traduit chaque propriété en égalités de produits, et on n’utilise que les axiomes d’anneau commutatif, plus l’<b>intégrité</b> pour simplifier par un élément non nul.',
   demo:{enonce:'Montre que ~ est une relation d’équivalence sur <i>A</i> × <i>A</i>*.',
    etapes:[{f:'Réflexivité : (<i>a</i> ; <i>b</i>) ~ (<i>a</i> ; <i>b</i>) car <i>ab</i> = <i>ba</i>.',w:'L’anneau est commutatif.'},
     {f:'Symétrie : <i>ad</i> = <i>bc</i> ⇒ <i>cb</i> = <i>da</i>, c’est-à-dire (<i>c</i> ; <i>d</i>) ~ (<i>a</i> ; <i>b</i>).',w:'Même argument, en lisant l’égalité de droite à gauche.'},
     {f:'Transitivité : on suppose <i>ad</i> = <i>bc</i> et <i>cf</i> = <i>de</i>. Alors <i>adf</i> = <i>bcf</i> = <i>bde</i>.',w:'On multiplie la 1re égalité par f, puis on remplace cf par de.'},
     {f:'Donc <i>d</i>(<i>af</i> − <i>be</i>) = 0 avec <i>d</i> ≠ 0, d’où <i>af</i> = <i>be</i> : (<i>a</i> ; <i>b</i>) ~ (<i>e</i> ; <i>f</i>).',w:'C’est ici que sert l’intégrité : on simplifie par d ≠ 0.'}],
    conclusion:'~ est une relation d’équivalence. L’ensemble quotient (<i>A</i> × <i>A</i>*)/~ se note <b>Frac(<i>A</i>)</b>, et la classe de (<i>a</i> ; <i>b</i>) se note <i>a</i>/<i>b</i>.'}},
  {h:'Où sert l’intégrité ?',p:'Dans la preuve de la transitivité, à quel moment utilise-t-on que <i>A</i> est intègre&nbsp;?',
   opts:['Pour écrire ab = ba','Pour passer de d(af − be) = 0, avec d ≠ 0, à af − be = 0','Pour multiplier une égalité par f','Pour la symétrie'],ans:1,
   why:'Simplifier par d ≠ 0 exige qu’il n’y ait pas de diviseur de zéro. Les autres étapes n’utilisent que la commutativité et la distributivité.'},
  {h:'Un contre-exemple dans ℤ/6ℤ',p:'Dans ℤ/6ℤ, qui n’est pas intègre, on définit la même relation sur les couples (<i>a</i> ; <i>b</i>) avec <i>b</i> ≠ 0. Alors (2 ; 1) ~ (0 ; 3) car 2·3 = 6 = 0 = 1·0, et (0 ; 3) ~ (0 ; 1) car 0·1 = 0 = 3·0. A-t-on (2 ; 1) ~ (0 ; 1)&nbsp;?',
   opts:['Oui, par transitivité','Oui, car 2·1 = 1·0','Non, car 2·1 = 2 ≠ 0 = 1·0 : la relation n’est pas transitive','On ne peut pas savoir'],ans:2,
   why:'2·1 = 2 et 1·0 = 0 sont différents dans ℤ/6ℤ. La transitivité échoue parce que 3 est un diviseur de zéro : on ne peut pas simplifier par d = 3. C’est pourquoi la construction exige un anneau intègre.'},
  {h:'Additionner et multiplier des classes',p:`On définit sur Frac(<i>A</i>) :<br><b>${F('<i>a</i>','<i>b</i>')} + ${F('<i>c</i>','<i>d</i>')} = ${F('<i>ad</i> + <i>bc</i>','<i>bd</i>')}</b> &nbsp; et &nbsp; <b>${F('<i>a</i>','<i>b</i>')} · ${F('<i>c</i>','<i>d</i>')} = ${F('<i>ac</i>','<i>bd</i>')}</b>.<br>Ces formules ont un sens car <i>bd</i> ≠ 0 (intégrité encore). Mais il reste un point délicat : le résultat ne doit pas dépendre des couples choisis pour représenter les classes. On dit que l’opération doit être <b>bien définie</b>.`,
   note:'Exemple de danger : la « règle » <i>a</i>/<i>b</i> ⊕ <i>c</i>/<i>d</i> = (<i>a</i> + <i>c</i>)/(<i>b</i> + <i>d</i>) n’est pas bien définie. 1/2 ⊕ 1/3 donnerait 2/5, mais 2/4 ⊕ 1/3 donnerait 3/7 ≠ 2/5.'},
  {kind:'Méthode',h:'Prouver qu’une opération est bien définie',
   p:'<b>Quand :</b> on définit une opération sur des classes à l’aide de représentants. <b>Comment :</b> 1) on prend deux représentants de chaque classe : (<i>a</i> ; <i>b</i>) ~ (<i>a</i>′ ; <i>b</i>′), c’est-à-dire <i>ab</i>′ = <i>a</i>′<i>b</i> ; 2) on calcule le résultat avec chacun ; 3) on vérifie que les deux résultats sont équivalents, en remplaçant <i>ab</i>′ par <i>a</i>′<i>b</i>. Il suffit de changer un représentant à la fois.',
   demo:{enonce:'Montre que l’addition ne dépend pas du représentant de la première classe.',
    etapes:[{f:'On suppose <i>ab</i>′ = <i>a</i>′<i>b</i>. Il faut montrer (<i>ad</i> + <i>bc</i> ; <i>bd</i>) ~ (<i>a</i>′<i>d</i> + <i>b</i>′<i>c</i> ; <i>b</i>′<i>d</i>).',w:'On écrit précisément le but.'},
     {f:'(<i>ad</i> + <i>bc</i>)·<i>b</i>′<i>d</i> = <i>ab</i>′<i>d</i>² + <i>bb</i>′<i>cd</i>',w:'Premier produit en croix, développé.'},
     {f:'<i>bd</i>·(<i>a</i>′<i>d</i> + <i>b</i>′<i>c</i>) = <i>a</i>′<i>bd</i>² + <i>bb</i>′<i>cd</i>',w:'Second produit en croix.'},
     {f:'Comme <i>ab</i>′ = <i>a</i>′<i>b</i>, les deux expressions sont égales.',w:'Seuls les premiers termes diffèrent, et ils sont égaux par hypothèse.'}],
    conclusion:'L’addition est bien définie ; par symétrie, changer le représentant de la seconde classe ne change rien non plus. On vérifie de même la multiplication.'}},
  {h:'Le produit est bien défini',p:'On suppose <i>ab</i>′ = <i>a</i>′<i>b</i>. Pour montrer (<i>ac</i> ; <i>bd</i>) ~ (<i>a</i>′<i>c</i> ; <i>b</i>′<i>d</i>), quel calcul suffit&nbsp;?',
   opts:['ac + bd = a′c + b′d','(ac)(b′d) = (ab′)cd = (a′b)cd = (a′c)(bd)','ac = a′c, car a = a′','On divise par b et b′'],ans:1,
   why:'On regroupe les facteurs (anneau commutatif), on remplace ab′ par a′b, puis on regroupe autrement. On n’a pas a = a′ en général (1/2 = 2/4), et on ne peut pas diviser dans A.'},
  {h:'Frac(A) est un corps qui contient A',p:`Avec ces opérations, Frac(<i>A</i>) est un anneau commutatif : zéro 0/1, unité 1/1, opposé −<i>a</i>/<i>b</i>. De plus <i>a</i>/<i>b</i> = 0/1 ⇔ <i>a</i> = 0, et si <i>a</i> ≠ 0, <b>(<i>a</i>/<i>b</i>)⁻¹ = <i>b</i>/<i>a</i></b> car <i>ab</i>/<i>ba</i> = 1/1. C’est donc un <b>corps</b>, le <b>corps des fractions</b> de <i>A</i>.<br>L’application ι : <i>A</i> → Frac(<i>A</i>), <i>a</i> ↦ <i>a</i>/1, est un homomorphisme d’anneaux injectif : <i>a</i>/1 = <i>c</i>/1 ⇔ <i>a</i> = <i>c</i>. On <b>identifie</b> <i>a</i> et <i>a</i>/1, et <i>A</i> devient un sous-anneau de Frac(<i>A</i>).`,
   note:'Chaque élément de Frac(<i>A</i>) s’écrit <i>a</i>/<i>b</i> = <i>a</i> · <i>b</i>⁻¹ : c’est un quotient de deux éléments de <i>A</i>. C’est en ce sens le plus petit corps contenant <i>A</i>.'},
  {h:'Le corps ℚ des rationnels',p:`<b>ℚ = Frac(ℤ)</b>. Chaque rationnel a un unique représentant <b>irréductible</b> (<i>a</i> ; <i>b</i>) avec <i>b</i> > 0 et pgcd(<i>a</i>, <i>b</i>) = 1 : on divise par le pgcd et on rend le dénominateur positif. Sur la figure, c’est le point du réseau le plus proche de O sur la droite, du côté <i>b</i> > 0.<br>Exemple : (−42 ; −56) a pour pgcd 14, d’où (−3 ; −4), puis (3 ; 4) : la classe est 3/4.`,
   note:'Les entiers sont les rationnels <i>a</i>/1. 2 a maintenant un inverse : 1/2, et 2<i>x</i> = 3 a la solution <i>x</i> = 3/2.'},
  {kind:'Méthode',h:'Calculer dans ℚ avec le ppcm',
   p:'<b>Quand :</b> on additionne des fractions et on veut un résultat irréductible sans grands nombres. <b>Pourquoi :</b> la formule (<i>ad</i> + <i>bc</i>)/<i>bd</i> est correcte mais produit souvent un représentant non réduit. <b>Comment :</b> 1) on prend pour dénominateur commun le <b>ppcm</b> des dénominateurs ; 2) on amplifie chaque fraction ; 3) on additionne les numérateurs ; 4) on simplifie par le pgcd final.',
   demo:{enonce:'Calcule 5/12 + 7/18.',
    etapes:[{f:'ppcm(12, 18) = 36',w:'12 = 2²·3 et 18 = 2·3² : on prend chaque facteur premier à la plus grande puissance.'},
     {f:`${F(5,12)} = ${F(15,36)} et ${F(7,18)} = ${F(14,36)}`,w:'On amplifie par 3 et par 2 : ce sont d’autres représentants des mêmes classes.'},
     {f:`${F(15,36)} + ${F(14,36)} = ${F(29,36)}`,w:'Même dénominateur : on ajoute les numérateurs.'},
     {f:'pgcd(29, 36) = 1',w:'29 est premier et ne divise pas 36 : la fraction est irréductible.'}],
    conclusion:'5/12 + 7/18 = <b>29/36</b>. La formule brute aurait donné (5·18 + 12·7)/216 = 174/216, qu’il faut ensuite réduire par 6.'}},
  {h:'Une différence de fractions',p:'Calcule 7/15 − 4/9 sous forme irréductible.',lab:'7/15 − 4/9 =',ans:1/45,tol:0.00005,
   why:'ppcm(15, 9) = 45 : 7/15 = 21/45 et 4/9 = 20/45, donc la différence vaut 1/45.'},
  {kind:'Pratique',h:'Sur la même droite',p:'Le point vert représente (−2 ; 3), c’est-à-dire −2/3. Déplace le point jaune (<i>a</i> ; <i>b</i>) sur un <b>autre</b> représentant de la même classe.',
   params:[{id:'a',l:'numérateur a',min:-6,max:6,v:1},{id:'b',l:'dénominateur b',min:1,max:12,v:3}],
   draw:v=>reseau(v.a,v.b,{ref:[-2,3]}),
   info:v=>`Produits en croix : a·3 = ${fmt(3*v.a)} et b·(−2) = ${fmt(-2*v.b)}`,
   ok:v=>3*v.a===-2*v.b&&v.b!==3,
   why:'Il faut 3a = −2b, donc (a ; b) = (−4 ; 6) ou (−6 ; 9) dans la fenêtre : les points du réseau alignés avec O et (3 ; −2).'},
  {h:'Le corps ℝ(T) des fractions rationnelles',p:`ℝ[T] est intègre (deg(<i>PQ</i>) = deg <i>P</i> + deg <i>Q</i>), donc il a un corps des fractions : <b>ℝ(T) = Frac(ℝ[T])</b>. Ses éléments sont les <b>fractions rationnelles</b> <i>P</i>/<i>Q</i>, avec <i>Q</i> ≠ 0, et <b><i>P</i>/<i>Q</i> = <i>R</i>/<i>S</i> ⇔ <i>PS</i> = <i>QR</i></b>.<br>Comme dans ℚ, on obtient un représentant irréductible en divisant <i>P</i> et <i>Q</i> par leur pgcd, puis en rendant <i>Q</i> unitaire (coefficient dominant 1).`,
   note:'T est un élément de ℝ(T), et il y est inversible : T⁻¹ = 1/T. Pourtant 1/T n’est pas un polynôme. Une fraction rationnelle est un objet <b>formel</b> : on ne parle pas encore de valeurs interdites.'},
  {kind:'Méthode',h:'Simplifier et opérer dans ℝ(T)',
   p:'<b>Quand :</b> on doit réduire une fraction rationnelle ou en additionner plusieurs. <b>Comment :</b> 1) on <b>factorise</b> numérateur et dénominateur (facteur commun, identités remarquables, racines évidentes) ; 2) on simplifie les facteurs communs ; 3) pour une somme, on prend comme dénominateur commun le produit des facteurs distincts, chacun à sa plus grande puissance, comme un ppcm.',
   demo:{enonce:'Simplifie (T² − 1)/(T² + T), puis calcule 1/(T − 1) − 1/(T + 1).',
    etapes:[{f:`${F('T² − 1','T² + T')} = ${F('(T − 1)(T + 1)','T(T + 1)')}`,w:'Identité remarquable en haut, mise en facteur de T en bas.'},
     {f:`= ${F('T − 1','T')}`,w:'On simplifie par T + 1 : (T² − 1)·T = (T² + T)(T − 1), les produits en croix sont égaux.'},
     {f:`${F(1,'T − 1')} − ${F(1,'T + 1')} = ${F('(T + 1) − (T − 1)','(T − 1)(T + 1)')}`,w:'Dénominateur commun (T − 1)(T + 1).'},
     {f:`= ${F(2,'T² − 1')}`,w:'Le numérateur se réduit à 2.'}],
    conclusion:'(T² − 1)/(T² + T) = <b>(T − 1)/T</b> et 1/(T − 1) − 1/(T + 1) = <b>2/(T² − 1)</b>.'}},
  {h:'Simplifie la fraction rationnelle',p:`Quelle est la forme irréductible de ${F('T² − 4','T² − 3T + 2')}&nbsp;?`,
   opts:[F('T + 2','T − 1'),F('T − 2','T − 1'),F('T + 2','T + 1'),F('− 4','− 3T + 2')],ans:0,
   why:'T² − 4 = (T − 2)(T + 2) et T² − 3T + 2 = (T − 1)(T − 2), car 1 et 2 sont racines. On simplifie par T − 2. Simplifier les T² est une erreur grossière : on ne simplifie que des facteurs.'},
  {h:'Additionner dans ℝ(T)',p:`Que vaut ${F(1,'T')} + ${F(1,'T + 1')}&nbsp;?`,
   opts:[F(2,'2T + 1'),F(2,'T² + T'),F('2T + 1','T² + T'),F(1,'T² + T')],ans:2,
   why:'Dénominateur commun T(T + 1) = T² + T, numérateur (T + 1) + T = 2T + 1. Additionner numérateurs et dénominateurs séparément n’est pas bien défini.'},
  {h:'Deux indéterminées : ℝ[T, U] et ℝ(T, U)',p:`On construit <b>ℝ[T, U]</b> = (ℝ[T])[U] : les polynômes en U dont les coefficients sont des polynômes en T. Chaque élément est une somme finie de <b>monômes</b> <i>c</i>·Tⁱ Uʲ, de <b>degré total</b> <i>i</i> + <i>j</i>. Le degré total d’un polynôme est le plus grand degré de ses monômes non nuls : T²U + 3TU³ − 5 est de degré total 4.<br>ℝ[T, U] est intègre, et <b>deg(<i>PQ</i>) = deg <i>P</i> + deg <i>Q</i></b> pour <i>P</i>, <i>Q</i> ≠ 0. Il a donc un corps des fractions <b>ℝ(T, U)</b>, avec par exemple (T² − U²)/(T − U) = T + U.`,
   note:'Pour prévoir le degré total d’un produit, il suffit d’ajouter les degrés totaux des facteurs : les termes de plus haut degré ne peuvent pas tous s’annuler.'},
  {h:'Degré total d’un produit',p:'Quel est le degré total de (T U² + T³)(T² − U + 1) dans ℝ[T, U]&nbsp;?',lab:'degré :',ans:5,
   why:'Le premier facteur est de degré total 3, le second de degré total 2 : le produit est de degré 3 + 2 = 5. Par exemple T³·T² = T⁵ et TU²·T² = T³U² sont de degré 5.'},
  {h:'Simplifier dans ℝ(T, U)',p:`Que vaut ${F('T²U − TU²','TU')} dans ℝ(T, U)&nbsp;?`,
   opts:['T − U','TU','T + U',F('T − U','TU')],ans:0,
   why:'T²U − TU² = TU(T − U), puis on simplifie par TU. Les produits en croix confirment : (T²U − TU²)·1 = TU·(T − U).'},
  {kind:'Problème',h:'Le réseau des fractions',
   p:'On représente chaque couple (<i>a</i> ; <i>b</i>) de ℤ × ℤ* par le point <i>M</i>(<i>b</i> ; <i>a</i>) du plan, comme dans ce chapitre. La figure montre la droite passant par O et par <i>M</i>(6 ; 4), et les points du réseau qui s’y trouvent. On veut relier la relation ~ à la géométrie, puis s’en servir pour compter et calculer.',
   fig:reseau(4,6),
   parts:[
    {q:'a) Pourquoi (<i>a</i> ; <i>b</i>) ~ (<i>c</i> ; <i>d</i>) équivaut-il à « O, <i>M</i>(<i>b</i> ; <i>a</i>) et <i>N</i>(<i>d</i> ; <i>c</i>) sont alignés »&nbsp;?',opts:['Parce que M et N ont la même abscisse','Parce que OM = ON','Parce que ad − bc = 0 est le déterminant des vecteurs OM et ON, nul exactement quand ils sont colinéaires','Parce que MN est horizontal'],ans:2,hint:'Écris le déterminant de la matrice dont les colonnes sont (b ; a) et (d ; c).',why:'det = b·c − a·d. Il est nul ⇔ ad = bc ⇔ les vecteurs sont colinéaires ⇔ O, M, N alignés.'},
    {q:'b) Combien de couples (<i>a</i> ; <i>b</i>) avec 1 ≤ <i>b</i> ≤ 30 sont équivalents à (4 ; 6)&nbsp;?',lab:'couples :',ans:10,hint:'Mets (4 ; 6) sous forme irréductible : les couples équivalents en sont des multiples.',why:'4/6 = 2/3 : les couples équivalents avec b > 0 sont (2k ; 3k). La condition 3k ≤ 30 donne k = 1, …, 10.'},
    {q:'c) Quel est le numérateur du représentant irréductible (avec <i>b</i> > 0) de (−84 ; 120)&nbsp;?',lab:'a =',ans:-7,hint:'Divise par pgcd(84, 120).',why:'pgcd(84, 120) = 12, donc (−84 ; 120) ~ (−7 ; 10).'},
    {q:'d) Calcule 5/6 + 7/10 − 8/15.',lab:'résultat :',ans:1,hint:'Le ppcm de 6, 10 et 15 est 30.',why:'25/30 + 21/30 − 16/30 = 30/30 = 1.'},
   ],
   sol:'Le déterminant des vecteurs (<i>b</i> ; <i>a</i>) et (<i>d</i> ; <i>c</i>) vaut <i>bc</i> − <i>ad</i> : il est nul exactement quand (<i>a</i> ; <i>b</i>) ~ (<i>c</i> ; <i>d</i>). Une classe de fractions est donc l’ensemble des points du réseau (avec <i>b</i> ≠ 0) d’une droite passant par O.<br>La classe de (4 ; 6) est celle de 2/3 : ses points avec <i>b</i> > 0 sont (2<i>k</i> ; 3<i>k</i>), dont <b>10</b> vérifient 3<i>k</i> ≤ 30.<br>pgcd(84, 120) = 12 donne −84/120 = <b>−7/10</b>, le point du réseau le plus proche de O sur sa droite.<br>Enfin 5/6 + 7/10 − 8/15 = (25 + 21 − 16)/30 = <b>1</b>.'},
  {kind:'Problème',h:'Calculer dans ℝ(T) et ℝ(T, U)',
   p:'On pratique les opérations du corps des fractions de ℝ[T] et de ℝ[T, U]. Toutes les égalités sont des égalités de fractions rationnelles, au sens de la relation <i>P</i>/<i>Q</i> = <i>R</i>/<i>S</i> ⇔ <i>PS</i> = <i>QR</i>. On termine par une question sur les éléments inversibles.',
   parts:[
    {q:`a) Quelle est la forme irréductible de ${F(1,'T − 1')} − ${F(2,'T² − 1')}&nbsp;?`,opts:[F(1,'T + 1'),F(1,'T − 1'),F('−1','T² − 1'),F('T − 3','T² − 1')],ans:0,hint:'Dénominateur commun T² − 1 = (T − 1)(T + 1), puis simplifie.',why:'(T + 1 − 2)/(T² − 1) = (T − 1)/((T − 1)(T + 1)) = 1/(T + 1).'},
    {q:`b) Quelle est la forme irréductible de ${F('T² − U²','T² + 2TU + U²')}&nbsp;?`,opts:[F('T − U','T + U'),'−1',F('T + U','T − U'),F('− U²','2TU + U²')],ans:0,hint:'Deux identités remarquables.',why:'(T − U)(T + U)/(T + U)² = (T − U)/(T + U).'},
    {q:`c) On multiplie ${F('T − U','T + U')} par ${F('(T + U)²','TU')} et on simplifie. Quel est le degré total du numérateur obtenu&nbsp;?`,lab:'degré :',ans:2,hint:'Simplifie par T + U avant de développer.',why:'Le produit vaut (T − U)(T + U)/(TU) = (T² − U²)/(TU), de numérateur de degré total 2.'},
    {q:'d) T est-il inversible dans ℝ[T]&nbsp;? dans ℝ(T)&nbsp;?',opts:['Oui dans les deux','Non dans ℝ[T], car deg(T·Q) ≥ 1 ≠ 0 = deg 1 ; oui dans ℝ(T), d’inverse 1/T','Oui dans ℝ[T], non dans ℝ(T)','Non dans les deux'],ans:1,hint:'Compare les degrés dans ℝ[T] ; dans un corps, tout élément non nul est inversible.',why:'Dans ℝ[T], T·Q a un degré au moins 1 et ne peut valoir 1. Dans le corps ℝ(T), T ≠ 0 est inversible : T·(1/T) = T/T = 1.'},
   ],
   sol:'a) 1/(T − 1) − 2/(T² − 1) = (T + 1 − 2)/(T² − 1) = (T − 1)/((T − 1)(T + 1)) = <b>1/(T + 1)</b>.<br>b) (T² − U²)/(T + U)² = (T − U)(T + U)/(T + U)² = <b>(T − U)/(T + U)</b>.<br>c) (T − U)/(T + U) · (T + U)²/(TU) = (T − U)(T + U)/(TU) = (T² − U²)/(TU) : numérateur de degré total <b>2</b>.<br>d) Les unités de ℝ[T] sont les constantes non nulles, donc T n’en est pas une. Dans le corps ℝ(T), T a pour inverse 1/T : en passant au corps des fractions, on a rendu inversibles tous les éléments non nuls.'},
]},

/* ===================== 4. FONCTIONS POLYNOMIALES ET RATIONNELLES ===================== */
{subj:'gred',sem:'ann',id:'gred-fonctions-pol',h:'Fonctions polynomiales et rationnelles',p:'Du polynôme formel à la fonction : l’évaluation, les racines, pourquoi ℝ[T] et Pol(ℝ) se confondent, et l’étude des fonctions rationnelles avec leurs pôles et asymptotes.',steps:[
  {h:'Un polynôme n’est pas une fonction',p:`Un polynôme <i>P</i> = <i>a</i>₀ + <i>a</i>₁T + ⋯ + <i>a</i>ₙTⁿ de ℝ[T] est un objet <b>formel</b> : au fond, la suite de ses coefficients. On lui associe la <b>fonction polynomiale</b> <i>P̃</i> : ℝ → ℝ, <i>x</i> ↦ <i>P</i>(<i>x</i>) = <i>a</i>₀ + <i>a</i>₁<i>x</i> + ⋯ + <i>a</i>ₙ<i>x</i>ⁿ.<br>L’ensemble <b>Pol(ℝ)</b> des fonctions polynomiales est un <b>sous-anneau</b> de ℱ(ℝ, ℝ) : il contient la constante 1, et sommes, opposés et produits de fonctions polynomiales sont polynomiales.`,
   note:'La question de ce chapitre : deux polynômes différents peuvent-ils donner la même fonction ? Sur ℝ, non. Sur un corps fini, oui.'},
  {h:'Polynomiale ou pas ?',p:'Laquelle de ces fonctions ℝ → ℝ est polynomiale&nbsp;?',
   opts:['<i>x</i> ↦ |<i>x</i>|','<i>x</i> ↦ √(<i>x</i>²)','<i>x</i> ↦ (<i>x</i> + 1)² − <i>x</i>²','<i>x</i> ↦ 2<sup><i>x</i></sup>'],ans:2,
   why:'(x + 1)² − x² = 2x + 1 pour tout x : c’est la fonction de 2T + 1. |x| = √(x²) n’est pas polynomiale (non dérivable en 0), et 2^x croît plus vite que tout polynôme.'},
  {h:'L’évaluation est un homomorphisme',p:`Pour <i>a</i> ∈ ℝ, l’<b>évaluation en <i>a</i></b>, ev<sub>a</sub> : ℝ[T] → ℝ, <i>P</i> ↦ <i>P</i>(<i>a</i>), vérifie<br><b>(<i>P</i> + <i>Q</i>)(<i>a</i>) = <i>P</i>(<i>a</i>) + <i>Q</i>(<i>a</i>), &nbsp;(<i>PQ</i>)(<i>a</i>) = <i>P</i>(<i>a</i>)<i>Q</i>(<i>a</i>), &nbsp;1(<i>a</i>) = 1</b> :<br>c’est un homomorphisme d’anneaux. Il envoie de plus chaque constante λ sur λ, donc (λ<i>P</i>)(<i>a</i>) = λ<i>P</i>(<i>a</i>) : on parle de <b>ℝ-homomorphisme</b>. De même, Φ : ℝ[T] → Pol(ℝ), <i>P</i> ↦ <i>P̃</i>, est un ℝ-homomorphisme surjectif.`,
   note:'La règle du produit est la seule qui demande un vrai calcul : on développe <i>PQ</i>, puis on remplace T par <i>a</i>. Cela marche parce que ℝ est commutatif : <i>a</i> commute avec tous les coefficients.'},
  {kind:'Méthode',h:'Évaluer sans développer',
   p:'<b>Quand :</b> on veut une valeur de <i>P</i> donné comme produit ou puissance, ou une combinaison de ses coefficients. <b>Pourquoi :</b> ev<sub>a</sub> est un homomorphisme, donc (<i>P</i>ᵏ<i>Q</i>)(<i>a</i>) = <i>P</i>(<i>a</i>)ᵏ<i>Q</i>(<i>a</i>). <b>Astuces :</b> la <b>somme des coefficients</b> de <i>P</i> vaut <i>P</i>(1) ; le <b>coefficient constant</b> vaut <i>P</i>(0) ; la somme alternée <i>a</i>₀ − <i>a</i>₁ + <i>a</i>₂ − ⋯ vaut <i>P</i>(−1).',
   demo:{enonce:'Trouve la somme des coefficients et le coefficient constant de <i>P</i> = (2T − 1)⁷(T + 1)².',
    etapes:[{f:'Somme des coefficients = <i>P</i>(1)',w:'En x = 1, chaque monôme aₖ·1ᵏ vaut aₖ.'},
     {f:'<i>P</i>(1) = (2 − 1)⁷·(1 + 1)² = 1·4 = 4',w:'On évalue chaque facteur, puis on multiplie : ev₁ respecte les produits.'},
     {f:'<i>P</i>(0) = (−1)⁷·1² = −1',w:'Le coefficient constant est la valeur en 0.'}],
    conclusion:'Les 10 coefficients de <i>P</i> (degré 9) ont pour somme <b>4</b> et le coefficient constant vaut <b>−1</b>, sans rien développer.'}},
  {h:'Somme des coefficients',p:'Quelle est la somme des coefficients de <i>P</i> = (3T² − 2)⁴(T − 2)³&nbsp;?',lab:'somme =',ans:-1,
   why:'C’est P(1) = (3 − 2)⁴·(1 − 2)³ = 1·(−1) = −1.'},
  {h:'Racines et facteur T − a',p:`La division euclidienne de <i>P</i> par T − <i>a</i> donne <i>P</i> = (T − <i>a</i>)<i>Q</i> + <i>r</i>, avec <i>r</i> constant. En évaluant en <i>a</i> : <i>r</i> = <i>P</i>(<i>a</i>). D’où :<br><b><i>a</i> est racine de <i>P</i> ⇔ T − <i>a</i> divise <i>P</i></b>.<br><b>Conséquence :</b> un polynôme non nul de degré <i>n</i> a <b>au plus <i>n</i> racines</b>. En effet, si <i>P</i> = (T − <i>a</i>)<i>Q</i> et <i>P</i>(<i>b</i>) = 0 avec <i>b</i> ≠ <i>a</i>, alors (<i>b</i> − <i>a</i>)<i>Q</i>(<i>b</i>) = 0, donc <i>Q</i>(<i>b</i>) = 0 : les autres racines de <i>P</i> sont des racines de <i>Q</i>, de degré <i>n</i> − 1, et on conclut par récurrence.`,
   note:'L’argument utilise que ℝ est <b>intègre</b> : on a simplifié par <i>b</i> − <i>a</i> ≠ 0. Dans ℤ/8ℤ, T² − 1 a quatre racines : 1, 3, 5, 7.'},
  {kind:'Méthode',h:'Factoriser par T − a (schéma de Horner)',
   p:'<b>Quand :</b> on cherche toutes les racines d’un polynôme de degré 3 ou plus. <b>Comment :</b> 1) on cherche une racine « évidente » : si <i>P</i> est à coefficients entiers et unitaire, une racine entière divise le coefficient constant ; 2) on divise par T − <i>a</i> avec le <b>schéma de Horner</b> : on recopie le premier coefficient, puis chaque nouveau nombre = (précédent)·<i>a</i> + coefficient suivant ; le dernier nombre est le reste <i>P</i>(<i>a</i>), qui doit valoir 0 ; 3) on recommence sur le quotient.',
   demo:{enonce:'Factorise <i>P</i> = T³ − 2T² − 5T + 6.',
    etapes:[{f:'<i>P</i>(1) = 1 − 2 − 5 + 6 = 0',w:'On teste les diviseurs de 6 : ±1, ±2, ±3, ±6. 1 marche.'},
     {f:'Coefficients 1, −2, −5, 6 avec <i>a</i> = 1 : 1 ; 1·1 − 2 = −1 ; −1·1 − 5 = −6 ; −6·1 + 6 = 0.',w:'Schéma de Horner : le reste 0 confirme la racine.'},
     {f:'<i>P</i> = (T − 1)(T² − T − 6)',w:'Les nombres 1, −1, −6 sont les coefficients du quotient.'},
     {f:'T² − T − 6 = (T − 3)(T + 2)',w:'Deux nombres de somme 1 et de produit −6 : 3 et −2.'}],
    conclusion:'<i>P</i> = <b>(T − 1)(T − 3)(T + 2)</b> : trois racines 1, 3, −2, le maximum possible pour le degré 3.'}},
  {h:'La plus petite racine',p:'1 est racine de <i>P</i> = T³ − 7T + 6. Quelle est la plus petite racine de <i>P</i>&nbsp;?',lab:'racine :',ans:-3,
   why:'Horner avec 1, 0, −7, 6 et a = 1 : 1 ; 1 ; −6 ; 0. Donc P = (T − 1)(T² + T − 6) = (T − 1)(T − 2)(T + 3). Les racines sont 1, 2 et −3.'},
  {h:'Multiplicité d’une racine',p:`<i>a</i> est racine de <b>multiplicité</b> <i>m</i> de <i>P</i> si (T − <i>a</i>)<sup><i>m</i></sup> divise <i>P</i> mais pas (T − <i>a</i>)<sup><i>m</i>+1</sup>. Pour la trouver, on divise par T − <i>a</i> tant que <i>a</i> reste racine du quotient. Sur le graphe de <i>x</i> ↦ (<i>x</i> − <i>a</i>)<sup><i>m</i></sup>(<i>x</i> − <i>b</i>) : en une racine de multiplicité <b>impaire</b>, la courbe <b>traverse</b> l’axe ; de multiplicité <b>paire</b>, elle le <b>touche</b> et rebrousse chemin.`,
   params:[{id:'a',l:'a',min:-2,max:2,v:-1},{id:'m',l:'multiplicité m',min:1,max:4,v:2},{id:'b',l:'b',min:-3,max:3,v:2}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],lab:1}), f=x=>Math.pow(x-v.a,v.m)*(x-v.b);
     P.fn(f,{n:400}); if(v.a===v.b) P.dot(v.a,0,{r:7,c:'var(--spark)'}); else { P.dot(v.a,0,{r:7,c:'var(--spark)'}).dot(v.b,0,{r:6,c:'var(--ok)'}); } return P.svg(); },
   info:v=>{ const m=v.a===v.b?v.m+1:v.m; return `P(x) = (${lin(v.a)})${sup[v.m]}(${lin(v.b)})<br>`+(v.a===v.b?`Une seule racine ${v.a}, de multiplicité ${m}`:`Racine ${v.a} de multiplicité ${m} (${m%2?'traverse':'touche'}), racine ${v.b} simple (traverse)`); }},
  {h:'Trouver une multiplicité',p:'Quelle est la multiplicité de la racine 1 dans <i>P</i> = T³ − 3T + 2&nbsp;?',lab:'m =',ans:2,
   why:'Horner (1, 0, −3, 2 ; a = 1) : 1 ; 1 ; −2 ; 0, donc P = (T − 1)(T² + T − 2). Le quotient s’annule encore en 1 : T² + T − 2 = (T − 1)(T + 2). Donc P = (T − 1)²(T + 2), et 1 n’est pas racine de T + 2 : m = 2.'},
  {h:'ℝ[T] et Pol(ℝ) sont isomorphes',p:`Le noyau de Φ : <i>P</i> ↦ <i>P̃</i> est formé des polynômes dont la fonction est nulle, c’est-à-dire qui s’annulent en <b>tout</b> réel. Comme ℝ est <b>infini</b>, un tel polynôme a une infinité de racines : il est nul. Donc Φ est injectif, et c’est un <b>isomorphisme</b> d’anneaux ℝ[T] → Pol(ℝ).<br>On peut alors <b>identifier</b> un polynôme réel et sa fonction. En particulier, deux polynômes de degré ≤ <i>n</i> qui prennent les mêmes valeurs en <i>n</i> + 1 points sont égaux, et ont donc les mêmes coefficients.`,
   note:'Pour un homomorphisme, « injectif » équivaut à « noyau réduit à 0 » : Φ(<i>P</i>) = Φ(<i>Q</i>) ⇔ Φ(<i>P</i> − <i>Q</i>) = 0. Tu l’as vu pour les groupes, et la preuve est la même.'},
  {h:'La preuve d’injectivité',p:'On suppose <i>P̃</i> = 0, c’est-à-dire <i>P</i>(<i>x</i>) = 0 pour tout <i>x</i> ∈ ℝ. Quel argument montre <i>P</i> = 0&nbsp;?',
   opts:['P(0) = 0 donc tous les coefficients sont nuls','Si P ≠ 0, P a au plus deg P racines ; or tous les réels, en nombre infini, sont racines : contradiction','P̃ = 0 signifie par définition que P = 0','P(1) = 0 donc la somme des coefficients est nulle'],ans:1,
   why:'Un polynôme non nul de degré n a au plus n racines. Ici l’ensemble des racines est ℝ, infini. P(0) = 0 ou P(1) = 0 ne donnent qu’une information chacun.'},
  {h:'Contre-exemple : sur F₂, le formel et le fonctionnel divergent',p:`Sur le corps fini F₂, prends <i>P</i> = T² + T. C’est un polynôme <b>non nul</b> (ses coefficients sont 1, 1, 0). Pourtant <i>P</i>(0) = 0 et <i>P</i>(1) = 1 + 1 = 0 : la fonction <i>P̃</i> : F₂ → F₂ est <b>nulle</b>. L’application Φ n’est donc pas injective sur F₂[T].<br>De même, sur F₃ = ℤ/3ℤ, T³ − T s’annule en 0, 1 et 2. Le théorème « au plus <i>n</i> racines » reste vrai ; ce qui manque, c’est l’infinité des points.`,
   note:'Sur un corps fini à <i>q</i> éléments, il n’y a que <i>q</i><sup><i>q</i></sup> fonctions, mais une infinité de polynômes : Φ ne peut pas être injectif.'},
  {h:'Un polynôme qui se cache',p:'Lequel de ces polynômes de F₂[T] est non nul mais définit la fonction nulle sur F₂&nbsp;?',
   opts:['T + 1','T²','T² + 1','T³ + T'],ans:3,
   why:'T³ + T vaut 0 en 0 et 1 + 1 = 0 en 1. Au contraire T + 1 vaut 1 en 0, T² vaut 1 en 1, et T² + 1 vaut 1 en 0.'},
  {kind:'Méthode',h:'Déterminer un polynôme par ses valeurs',
   p:'<b>Quand :</b> on connaît le degré maximal <i>n</i> d’un polynôme réel et ses valeurs en <i>n</i> + 1 points. <b>Pourquoi :</b> il est <b>unique</b>, car la différence de deux solutions est de degré ≤ <i>n</i> avec <i>n</i> + 1 racines, donc nulle. <b>Comment :</b> on écrit <i>P</i> avec des coefficients inconnus, on traduit chaque valeur en une équation, et on résout le système. Si on connaît des racines, on factorise plutôt : <i>P</i> = <i>k</i>(T − <i>r</i>₁)⋯(T − <i>r</i>ₙ).',
   demo:{enonce:'Trouve <i>P</i> de degré ≤ 2 avec <i>P</i>(0) = 1, <i>P</i>(1) = 2 et <i>P</i>(2) = 5.',
    etapes:[{f:'<i>P</i> = <i>a</i>T² + <i>b</i>T + <i>c</i>, et <i>P</i>(0) = <i>c</i> = 1.',w:'La valeur en 0 donne directement le coefficient constant.'},
     {f:'<i>P</i>(1) = <i>a</i> + <i>b</i> + 1 = 2 et <i>P</i>(2) = 4<i>a</i> + 2<i>b</i> + 1 = 5.',w:'Deux équations pour deux inconnues.'},
     {f:'<i>a</i> + <i>b</i> = 1 et 2<i>a</i> + <i>b</i> = 2, d’où <i>a</i> = 1, <i>b</i> = 0.',w:'On soustrait la première équation de la seconde (divisée par 2).'}],
    conclusion:'<i>P</i> = <b>T² + 1</b>, et c’est le seul polynôme de degré ≤ 2 qui convienne.'}},
  {h:'Retrouver un polynôme',p:'<i>P</i> est un polynôme réel de degré ≤ 2 avec <i>P</i>(0) = 3, <i>P</i>(1) = 2 et <i>P</i>(−1) = 6. Que vaut <i>P</i>(3)&nbsp;?',lab:'P(3) =',ans:6,
   why:'c = 3 ; a + b = −1 et a − b = 3, donc a = 1, b = −2 : P = T² − 2T + 3 et P(3) = 9 − 6 + 3 = 6.'},
  {h:'Fonctions rationnelles : domaine, zéros, pôles',p:'Une <b>fonction rationnelle</b> est <i>f</i>(<i>x</i>) = <i>P</i>(<i>x</i>)/<i>Q</i>(<i>x</i>), définie là où <i>Q</i>(<i>x</i>) ≠ 0. Après simplification par les facteurs communs, une racine du nouveau dénominateur est un <b>pôle</b> (asymptote verticale, en rouge) ; une valeur interdite qui disparaît est un <b>trou</b> (cercle vide) ; une racine du nouveau numérateur, dans le domaine, est un <b>zéro</b> (en vert). Ici <i>f</i>(<i>x</i>) = (<i>x</i> − <i>z</i>)/((<i>x</i> − <i>p</i>)(<i>x</i> − <i>q</i>)). Essaie <i>z</i> = <i>p</i>, puis <i>p</i> = <i>q</i>.',
   params:[{id:'z',l:'zéro z du numérateur',min:-3,max:3,v:-2},{id:'p',l:'p',min:-3,max:3,v:-1},{id:'q',l:'q',min:-3,max:3,v:2}],
   draw:v=>ratFig(v.z,v.p,v.q),
   info:v=>ratTxt(v.z,v.p,v.q),
   note:'Quand le degré du numérateur est inférieur à celui du dénominateur, <i>f</i>(<i>x</i>) tend vers 0 en ±∞ : la droite <i>y</i> = 0 est asymptote horizontale.'},
  {kind:'Méthode',h:'Étudier une fonction rationnelle',
   p:'<b>Comment :</b> 1) <b>domaine</b> : on retire les racines du dénominateur <i>de départ</i> ; 2) on <b>factorise</b> et on <b>simplifie</b> ; 3) <b>zéros</b> : racines du numérateur simplifié qui sont dans le domaine ; 4) <b>pôles</b> : racines du dénominateur simplifié, avec une asymptote verticale ; les autres valeurs interdites sont des <b>trous</b>, d’ordonnée donnée par la forme simplifiée ; 5) <b>en ±∞</b> : si deg <i>P</i> < deg <i>Q</i>, asymptote <i>y</i> = 0 ; si deg <i>P</i> = deg <i>Q</i>, asymptote <i>y</i> = (quotient des coefficients dominants).',
   demo:{enonce:'Étudie <i>f</i>(<i>x</i>) = (2<i>x</i>² − 2)/(<i>x</i>² − <i>x</i> − 2).',
    etapes:[{f:'<i>x</i>² − <i>x</i> − 2 = (<i>x</i> − 2)(<i>x</i> + 1) : domaine ℝ \\ {−1 ; 2}.',w:'Racines évidentes 2 et −1 (somme 1, produit −2).'},
     {f:'<i>f</i>(<i>x</i>) = 2(<i>x</i> − 1)(<i>x</i> + 1)/((<i>x</i> − 2)(<i>x</i> + 1)) = 2(<i>x</i> − 1)/(<i>x</i> − 2) sur le domaine.',w:'On simplifie par x + 1, qui ne s’annule pas sur le domaine.'},
     {f:'Zéro : <i>x</i> = 1. Pôle : <i>x</i> = 2. Trou en <i>x</i> = −1, d’ordonnée 2(−2)/(−3) = 4/3.',w:'−1 annulait le numérateur de départ, mais il est hors du domaine : ce n’est pas un zéro.'},
     {f:'Degrés égaux (2 et 2) : asymptote horizontale <i>y</i> = 2/1 = 2.',w:'Pour x grand, f(x) se comporte comme 2x²/x².'}],
    conclusion:'Domaine ℝ \\ {−1 ; 2}, zéro 1, pôle 2 (asymptote <i>x</i> = 2), trou en (−1 ; 4/3), asymptote horizontale <i>y</i> = 2.'}},
  {h:'L’ordonnée du trou',p:'La fonction <i>f</i>(<i>x</i>) = (<i>x</i>² − 9)/(<i>x</i>² + <i>x</i> − 6) a un trou en <i>x</i> = −3. Quelle est son ordonnée&nbsp;?',lab:'y =',ans:1.2,tol:0.001,
   why:'x² − 9 = (x − 3)(x + 3) et x² + x − 6 = (x + 3)(x − 2), donc f(x) = (x − 3)/(x − 2) sur le domaine. En −3 : (−6)/(−5) = 6/5 = 1,2.'},
  {kind:'Pratique',h:'Fabriquer une fonction rationnelle',p:'Avec <i>f</i>(<i>x</i>) = (<i>x</i> − <i>z</i>)/((<i>x</i> − <i>p</i>)(<i>x</i> − <i>q</i>)), règle les curseurs pour que <i>f</i> s’annule en <i>x</i> = −2 et ait <b>un seul pôle</b>, situé en <i>x</i> = 1.',
   params:[{id:'z',l:'z',min:-3,max:3,v:0},{id:'p',l:'p',min:-3,max:3,v:-1},{id:'q',l:'q',min:-3,max:3,v:2}],
   draw:v=>ratFig(v.z,v.p,v.q),
   info:v=>ratTxt(v.z,v.p,v.q),
   ok:v=>v.z===-2&&v.p===1&&v.q===1,
   why:'Le zéro impose z = −2, et ce zéro ne doit pas être simplifié, donc p, q ≠ −2. Un seul pôle en 1 impose p = q = 1 : f(x) = (x + 2)/(x − 1)², pôle double en 1.'},
  {kind:'Méthode',h:'Asymptote oblique par division euclidienne',
   p:'<b>Quand :</b> deg <i>P</i> = deg <i>Q</i> + 1. <b>Comment :</b> on fait la division euclidienne <i>P</i> = <i>Q</i>·(<i>mx</i> + <i>h</i>) + <i>R</i> avec deg <i>R</i> < deg <i>Q</i>. Alors <i>f</i>(<i>x</i>) = <i>mx</i> + <i>h</i> + <i>R</i>(<i>x</i>)/<i>Q</i>(<i>x</i>), et le dernier terme tend vers 0 en ±∞. <b>La droite <i>y</i> = <i>mx</i> + <i>h</i> est asymptote oblique.</b>',
   demo:{enonce:'Trouve l’asymptote de <i>f</i>(<i>x</i>) = (<i>x</i>² + 1)/(<i>x</i> − 1) en ±∞.',
    etapes:[{f:'<i>x</i>² + 1 = (<i>x</i> − 1)(<i>x</i> + 1) + 2',w:'Division euclidienne de x² + 1 par x − 1 : quotient x + 1, reste 2.'},
     {f:'<i>f</i>(<i>x</i>) = <i>x</i> + 1 + 2/(<i>x</i> − 1)',w:'On divise par x − 1 sur le domaine ℝ \\ {1}.'},
     {f:'<i>f</i>(<i>x</i>) − (<i>x</i> + 1) = 2/(<i>x</i> − 1) → 0 quand <i>x</i> → ±∞',w:'L’écart entre la courbe et la droite tend vers 0.'}],
    conclusion:'La droite <b><i>y</i> = <i>x</i> + 1</b> est asymptote oblique ; la courbe est au-dessus pour <i>x</i> > 1 (écart positif) et au-dessous pour <i>x</i> < 1.'}},
  {h:'Une asymptote oblique',p:'La fonction <i>f</i>(<i>x</i>) = (2<i>x</i>² − 3<i>x</i> + 4)/(<i>x</i> − 2) a une asymptote oblique <i>y</i> = 2<i>x</i> + <i>h</i>. Que vaut <i>h</i>&nbsp;?',lab:'h =',ans:1,
   why:'(x − 2)(2x + 1) = 2x² − 3x − 2, donc 2x² − 3x + 4 = (x − 2)(2x + 1) + 6 et f(x) = 2x + 1 + 6/(x − 2). Asymptote y = 2x + 1.'},
  {h:'Opérations : attention au domaine',p:`On additionne, multiplie et divise des fonctions rationnelles point par point, sur l’<b>intersection des domaines</b> ; pour <i>f</i>/<i>g</i>, on retire en plus les zéros de <i>g</i>. Exemple : <i>f</i>(<i>x</i>) = 1/(<i>x</i> − 1) et <i>g</i>(<i>x</i>) = (<i>x</i> − 1)/<i>x</i> donnent <i>fg</i>(<i>x</i>) = 1/<i>x</i>, mais seulement sur ℝ \\ {0 ; 1}.<br><b>Bilan du passage du formel au fonctionnel :</b> ℝ[T] et Pol(ℝ) sont isomorphes, car ℝ est infini. Une fraction rationnelle <i>P</i>/<i>Q</i> de ℝ(T) définit une fonction sur ℝ privé des racines de <i>Q</i>, et deux fractions égales donnent des fonctions qui coïncident là où elles sont toutes deux définies.`,
   note:'Les fonctions rationnelles ne forment pas exactement un corps, à cause des domaines ; c’est ℝ(T), le corps formel, qui porte l’algèbre. Sur un corps fini, en revanche, même l’étape polynomiale échoue.'},
  {h:'Le domaine d’un quotient',p:'Soit <i>f</i>(<i>x</i>) = <i>x</i>/(<i>x</i> − 2) et <i>g</i>(<i>x</i>) = (<i>x</i> + 1)/(<i>x</i> − 3). Quel est le domaine de <i>f</i>/<i>g</i>&nbsp;?',
   opts:['ℝ \\ {2 ; 3}','ℝ \\ {−1 ; 2 ; 3}','ℝ \\ {−1 ; 2}','ℝ \\ {0 ; −1}'],ans:1,
   why:'Il faut f et g définies (x ≠ 2, x ≠ 3) et g(x) ≠ 0 (x ≠ −1). La formule simplifiée x(x − 3)/((x − 2)(x + 1)) semble définie en 3, mais f/g ne l’est pas : g n’y existe pas.'},
  {kind:'Problème',h:'Étude complète d’une fonction rationnelle',
   p:'On étudie <i>f</i>(<i>x</i>) = (<i>x</i>³ − <i>x</i>)/(<i>x</i>² − 3<i>x</i> + 2). On veut son domaine, sa forme simplifiée, ses zéros, son trou, son pôle et son comportement en ±∞. La figure montre la courbe (le trou n’y est pas visible).',
   fig:(()=>{ const P=plane({x:[-6,8],y:[-6,16],w:320,h:300,lab:2}); const f=x=>x*(x+1)/(x-2);
     P.fn(f,{from:-6,to:1.99,n:300}).fn(f,{from:2.01,to:8,n:300}).seg(2,-6,2,16,{c:'var(--bad)',w:2,dash:1}).fn(x=>x+3,{c:'var(--muted)',w:2,dash:1});
     return P.svg(); })(),
   parts:[
    {q:'a) Combien de réels sont exclus du domaine de <i>f</i>&nbsp;?',lab:'nombre :',ans:2,hint:'Factorise le dénominateur : cherche deux racines évidentes.',why:'x² − 3x + 2 = (x − 1)(x − 2) : on exclut 1 et 2.'},
    {q:'b) Quelle est l’ordonnée du trou de la courbe&nbsp;?',lab:'y =',ans:-2,hint:'Factorise x³ − x = x(x − 1)(x + 1), simplifie, puis évalue la forme simplifiée au point qui disparaît.',why:'f(x) = x(x + 1)/(x − 2) sur le domaine ; en x = 1 : 1·2/(−1) = −2.'},
    {q:'c) Combien <i>f</i> a-t-elle de zéros&nbsp;?',lab:'zéros :',ans:2,hint:'Racines du numérateur simplifié, à condition d’être dans le domaine.',why:'x(x + 1) = 0 donne 0 et −1, tous deux dans le domaine. Le 1 du numérateur de départ n’est pas un zéro : il est hors du domaine.'},
    {q:'d) La courbe a une asymptote oblique <i>y</i> = <i>x</i> + <i>h</i>. Que vaut <i>h</i>&nbsp;?',lab:'h =',ans:3,hint:'Divise x² + x par x − 2.',why:'x² + x = (x − 2)(x + 3) + 6, donc f(x) = x + 3 + 6/(x − 2) et l’asymptote est y = x + 3.'},
   ],
   sol:'Le dénominateur vaut (<i>x</i> − 1)(<i>x</i> − 2) : domaine ℝ \\ {1 ; 2}, soit <b>2</b> réels exclus.<br>Le numérateur vaut <i>x</i>(<i>x</i> − 1)(<i>x</i> + 1), donc <i>f</i>(<i>x</i>) = <i>x</i>(<i>x</i> + 1)/(<i>x</i> − 2) sur le domaine.<br>En 1, le facteur disparaît : <b>trou</b> en (1 ; −2). En 2 reste un <b>pôle</b>, avec asymptote verticale <i>x</i> = 2.<br>Zéros : 0 et −1, soit <b>2</b> zéros.<br>Enfin <i>x</i>² + <i>x</i> = (<i>x</i> − 2)(<i>x</i> + 3) + 6 donne <i>f</i>(<i>x</i>) = <i>x</i> + 3 + 6/(<i>x</i> − 2) : asymptote oblique <b><i>y</i> = <i>x</i> + 3</b>, courbe au-dessus pour <i>x</i> > 2, au-dessous pour <i>x</i> < 2.'},
  {kind:'Problème',h:'Quand le formel et le fonctionnel se séparent',
   p:'Sur ℝ, un polynôme est déterminé par sa fonction ; sur un corps fini, non. On compare les deux situations. On travaille d’abord dans F₃ = ℤ/3ℤ avec <i>P</i> = T³ − T, puis dans ℝ[T].',
   parts:[
    {q:'a) Combien d’éléments <i>x</i> de F₃ vérifient <i>x</i>³ − <i>x</i> = 0&nbsp;?',lab:'racines :',ans:3,hint:'Teste 0, 1 et 2, en calculant modulo 3.',why:'0 − 0 = 0 ; 1 − 1 = 0 ; 8 − 2 = 6 ≡ 0. Les trois éléments sont racines.'},
    {q:'b) Que montre ce calcul&nbsp;?',opts:['Que le théorème « au plus n racines » est faux dans F₃','Que T³ − T est le polynôme nul de F₃[T]','Que Φ : F₃[T] → fonctions de F₃ dans F₃ n’est pas injective, car F₃ est fini','Que F₃ n’est pas un corps'],ans:2,hint:'T³ − T a-t-il des coefficients non nuls ? Combien de racines a-t-il pour un degré 3 ?',why:'T³ − T est non nul et sa fonction est nulle. Il a 3 racines pour un degré 3 : le théorème tient. C’est l’argument « infinité de racines » qui manque, car F₃ n’a que 3 éléments.'},
    {q:'c) Dans ℝ[T], <i>P</i> est de degré 4, de coefficient dominant 1, et s’annule en 0, 1, 2 et 3. Que vaut <i>P</i>(5)&nbsp;?',lab:'P(5) =',ans:120,hint:'Chaque racine a donne un facteur T − a ; compare les degrés.',why:'P = T(T − 1)(T − 2)(T − 3) : quatre facteurs pour un degré 4, et le coefficient dominant vaut 1. P(5) = 5·4·3·2 = 120.'},
    {q:'d) Un polynôme réel <i>P</i> vérifie <i>P</i>(<i>n</i>) = <i>n</i>² pour tout entier <i>n</i>. Que peut-on conclure&nbsp;?',opts:['Rien, car P n’est connu qu’aux entiers','P = T², car P − T² a une infinité de racines, donc est nul','P = T² + k pour un réel k','P est de degré au moins 3'],ans:1,hint:'Regarde le polynôme P − T² et compte ses racines.',why:'P − T² s’annule en chaque entier : une infinité de racines, donc P − T² = 0. Il suffit d’une infinité de points, pas de tout ℝ.'},
   ],
   sol:'Dans F₃, T³ − T s’annule en 0, 1 et 2 : c’est un polynôme <b>non nul</b> dont la fonction est nulle. Le théorème « au plus 3 racines » n’est pas contredit ; c’est l’injectivité de Φ qui tombe, parce que F₃ est fini.<br>Dans ℝ[T], quatre racines 0, 1, 2, 3 donnent quatre facteurs : <i>P</i> = T(T − 1)(T − 2)(T − 3), et <i>P</i>(5) = <b>120</b>.<br>Si <i>P</i>(<i>n</i>) = <i>n</i>² pour tout entier <i>n</i>, le polynôme <i>P</i> − T² a une infinité de racines, donc il est nul : <b><i>P</i> = T²</b>. C’est ce principe qui permet, sur ℝ, de confondre un polynôme et sa fonction.'},
]},
);
})();
