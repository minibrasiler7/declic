/* Déclic — Algèbre linéaire (PREPA-001 / 002) — tout le programme en dimension 2 */
(()=>{
/* ---------- helpers locaux ---------- */
let VN=0;
const circP=(cx,cy,r)=>`M${cx-r} ${cy}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0Z`;
// Diagramme de Venn : s = {a, ab, b, o} (régions coloriées), els = textes posés dans les régions
function venn(s,o={}){
  const id='vn'+(++VN), A=circP(125,100,62), B=circP(195,100,62), col=o.c||'var(--accent)', fo=.5, e=o.els||{};
  let g='';
  if(s.o) g+=`<rect x="10" y="10" width="300" height="180" rx="10" fill="${col}" fill-opacity="${fo}"/><path d="${A}${B}" fill="var(--surface)"/>`;
  if(s.a) g+=`<path d="${A}${B}" fill-rule="evenodd" clip-path="url(#${id}A)" fill="${col}" fill-opacity="${fo}"/>`;
  if(s.b) g+=`<path d="${A}${B}" fill-rule="evenodd" clip-path="url(#${id}B)" fill="${col}" fill-opacity="${fo}"/>`;
  if(s.ab) g+=`<path d="${B}" clip-path="url(#${id}A)" fill="${col}" fill-opacity="${fo}"/>`;
  const t=(x,y,str,q='')=>`<text x="${x}" y="${y}" font-size="14" font-weight="700" text-anchor="middle" fill="var(--ink)" ${q}>${str}</text>`;
  return `<svg viewBox="0 0 320 200" width="320" role="img"><defs><clipPath id="${id}A"><path d="${A}"/></clipPath><clipPath id="${id}B"><path d="${B}"/></clipPath></defs>`
    +`<rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="var(--muted)" stroke-width="1.5"/>${g}`
    +`<path d="${A}" fill="none" stroke="var(--ink)" stroke-width="2"/><path d="${B}" fill="none" stroke="var(--ink)" stroke-width="2"/>`
    +t(80,36,o.la||'A')+t(240,36,o.lb||'B')+t(292,180,o.lu||'E','fill-opacity=".7"')
    +(e.a?t(98,105,e.a):'')+(e.ab?t(160,105,e.ab):'')+(e.b?t(222,105,e.b):'')+(e.o?t(40,180,e.o):'')+'</svg>';
}
// Table de vérité (SVG) avec une ligne surlignée
function truth(P,Q){
  const V=b=>b?'V':'F', cols=['P','Q','non P','P et Q','P ou Q','P ⇒ Q','P ⇔ Q'], xs=[22,58,102,154,208,258,302];
  const rows=[[1,1],[1,0],[0,1],[0,0]];
  let s=`<svg viewBox="0 0 320 170" width="320" role="img">`;
  rows.forEach((r,i)=>{ if(r[0]===P&&r[1]===Q) s+=`<rect x="4" y="${38+i*30}" width="312" height="28" rx="6" fill="var(--accent)" fill-opacity=".25"/>`; });
  cols.forEach((c,j)=>{ s+=`<text x="${xs[j]}" y="26" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">${c}</text>`; });
  s+=`<line x1="4" x2="316" y1="34" y2="34" stroke="var(--line)" stroke-width="1.5"/>`;
  rows.forEach(([p,q],i)=>{ const val=[p,q,!p,p&&q,p||q,!p||q,p===q];
    val.forEach((b,j)=>{ s+=`<text x="${xs[j]}" y="${57+i*30}" font-size="14" font-weight="700" text-anchor="middle" fill="${b?'var(--ok)':'var(--bad)'}">${V(b)}</text>`; }); });
  return s+'</svg>';
}
// Diagramme sagittal : E (gauche) → F (droite), f[i] = indice de l’image de E[i]
function sag(E,Fs,f){
  const P=plane({x:[0,10],y:[0,6.4],grid:false,axes:false}), yE=i=>5.2-i*(4.4/Math.max(E.length-1,1)), yF=j=>5.2-j*(4.4/Math.max(Fs.length-1,1));
  P.circ(2,3,1.4,{c:'var(--muted)',w:1.5}).circ(8,3,1.4,{c:'var(--muted)',w:1.5});
  E.forEach((e,i)=>{ const j=f[i]; P.arrow(2.25,yE(i),7.7,yF(j),{c:'var(--math)',w:2,hs:9}); });
  E.forEach((e,i)=>P.dot(2,yE(i),{r:5,c:'var(--ink)'}).text(2,yE(i),e,{a:'end',dx:-9,dy:5}));
  Fs.forEach((e,j)=>{ const hit=f.includes(j); P.dot(8,yF(j),{r:5,c:hit?'var(--spark)':'var(--muted)'}).text(8,yF(j),e,{dx:9,dy:5}); });
  P.text(2,0,'E',{a:'middle',dy:-2,c:'var(--muted)'}).text(8,0,'F',{a:'middle',dy:-2,c:'var(--muted)'});
  return P.svg();
}
const mul=(A,B)=>[[A[0][0]*B[0][0]+A[0][1]*B[1][0],A[0][0]*B[0][1]+A[0][1]*B[1][1]],[A[1][0]*B[0][0]+A[1][1]*B[1][0],A[1][0]*B[0][1]+A[1][1]*B[1][1]]];
const M=A=>mat(A.map(r=>r.map(x=>fmt(x))));
// Grille déformée par la matrice [[a,b],[c,d]] + image du carré unité
function grille(P,a,b,c,d,n=3){
  const T=(x,y)=>[a*x+b*y,c*x+d*y];
  for(let i=-n;i<=n;i++){ const p=T(i,-n),q=T(i,n),r=T(-n,i),s=T(n,i); P.seg(p[0],p[1],q[0],q[1],{c:'var(--line)',w:1.2}).seg(r[0],r[1],s[0],s[1],{c:'var(--line)',w:1.2}); }
  P.poly([[0,0],T(1,0),T(1,1),T(0,1)],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2}).arrow(0,0,a,c,{c:'var(--math)'}).arrow(0,0,b,d,{c:'var(--spark)'});
  return P;
}
const ln=(P,dx,dy,q)=>P.seg(-20*dx,-20*dy,20*dx,20*dy,q);
const inR=(x,y,r)=>Math.abs(x)<=r&&Math.abs(y)<=r;

CMS.push(
/* ===================== 1. ENSEMBLES ===================== */
{subj:'al',sem:'all',id:'cms-al-ensembles',h:'Ensembles',p:'Appartenance, inclusion, opérations et lois de De Morgan, vues sur des diagrammes de Venn.',steps:[
  {h:'Appartenir ou être inclus',p:`Un <b>ensemble</b> est une collection d’objets, ses <b>éléments</b>. On écrit <i>x</i> ∈ <i>A</i> si <i>x</i> est un élément de <i>A</i>. On dit que <i>A</i> est <b>inclus</b> dans <i>B</i>, et on écrit <i>A</i> ⊂ <i>B</i>, si tout élément de <i>A</i> est aussi dans <i>B</i>.<br><b>Exemple :</b> ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ, et 3 ∈ ℕ.`,
   fig:`<svg viewBox="0 0 320 200" width="320" role="img"><rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="var(--muted)" stroke-width="1.5"/><circle cx="160" cy="105" r="80" fill="var(--math)" fill-opacity=".15" stroke="var(--math)" stroke-width="2"/><circle cx="185" cy="105" r="40" fill="var(--spark)" fill-opacity=".35" stroke="var(--ink)" stroke-width="2"/><text x="105" y="110" font-size="15" font-weight="700" fill="var(--ink)">B</text><text x="180" y="110" font-size="15" font-weight="700" fill="var(--ink)">A</text><text x="292" y="180" font-size="14" font-weight="700" text-anchor="middle" fill="var(--muted)">E</text><text x="24" y="180" font-size="13" font-weight="700" fill="var(--muted)">A ⊂ B</text></svg>`,
   note:'<b>Piège :</b> ∈ relie un élément à un ensemble, ⊂ relie deux ensembles. On a 1 ∈ {1 ; 2} mais {1} ⊂ {1 ; 2}. Et l’ensemble vide ∅ est inclus dans tout ensemble.'},
  {h:'Le bon symbole',p:'Soit <i>A</i> = {1 ; 2 ; 3}. Quelle écriture est correcte&nbsp;?',
   opts:['{1} ∈ <i>A</i>','{1} ⊂ <i>A</i>','1 ⊂ <i>A</i>','<i>A</i> ⊂ {1 ; 2}'],ans:1,
   why:'{1} est un ensemble dont le seul élément, 1, est dans A : c’est une inclusion. 1 est un élément, donc on écrit 1 ∈ A. Enfin 3 ∈ A mais 3 ∉ {1 ; 2}.'},
  {h:'Quatre opérations',p:`Dans un ensemble de référence <i>E</i>, on combine <i>A</i> et <i>B</i>. Ici <i>E</i> = {1, …, 7}, <i>A</i> = {1 ; 2 ; 3 ; 4} et <i>B</i> = {3 ; 4 ; 5}. Fais défiler les opérations.`,
   params:[{id:'k',l:'Opération',min:0,max:4,v:0}],
   draw:v=>venn([{a:1,ab:1,b:1},{ab:1},{a:1},{b:1,o:1},{o:1}][v.k],{els:{a:'1 2',ab:'3 4',b:'5',o:'6 7'}}),
   info:v=>['<b>Union</b> A ∪ B = {x : x ∈ A <b>ou</b> x ∈ B} = {1 ; 2 ; 3 ; 4 ; 5}',
            '<b>Intersection</b> A ∩ B = {x : x ∈ A <b>et</b> x ∈ B} = {3 ; 4}',
            '<b>Différence</b> A \\ B = {x ∈ A : x ∉ B} = {1 ; 2}',
            '<b>Complémentaire</b> Aᶜ = E \\ A = {5 ; 6 ; 7}',
            '(A ∪ B)ᶜ = {6 ; 7}'][v.k],
   note:'Le « ou » mathématique est <b>inclusif</b> : un élément de A ∩ B est bien dans A ∪ B.'},
  {h:'Colorie l’ensemble',p:'Allume les bonnes régions pour représenter (<i>A</i> \\ <i>B</i>)ᶜ, le complémentaire de <i>A</i> privé de <i>B</i>.',
   params:[{id:'a',l:'A seul',min:0,max:1,v:0},{id:'ab',l:'A ∩ B',min:0,max:1,v:0},{id:'b',l:'B seul',min:0,max:1,v:0},{id:'o',l:'Hors de A ∪ B',min:0,max:1,v:0}],
   draw:v=>venn(v),ok:v=>v.a===0&&v.ab===1&&v.b===1&&v.o===1,
   why:'A \\ B est la région « A seul ». Son complémentaire, c’est tout le reste : A ∩ B, B seul et l’extérieur. On a (A \\ B)ᶜ = Aᶜ ∪ B.'},
  {h:'Compter une union',p:'Dans <i>E</i> = {1, …, 10}, <i>A</i> est l’ensemble des nombres pairs et <i>B</i> celui des multiples de 3. Combien d’éléments a <i>A</i> ∪ <i>B</i>&nbsp;?',
   lab:'card(A ∪ B) =',ans:7,
   why:'A = {2 ; 4 ; 6 ; 8 ; 10}, B = {3 ; 6 ; 9}, A ∩ B = {6}. card(A ∪ B) = 5 + 3 − 1 = 7 : on retire une fois les éléments comptés deux fois.'},
  {h:'Le produit cartésien',p:`<i>A</i> × <i>B</i> est l’ensemble des <b>couples</b> (<i>a</i> ; <i>b</i>) avec <i>a</i> ∈ <i>A</i> et <i>b</i> ∈ <i>B</i>. Si <i>A</i> et <i>B</i> sont finis, card(<i>A</i> × <i>B</i>) = card(<i>A</i>) · card(<i>B</i>). Le plan ℝ² = ℝ × ℝ en est l’exemple central.`,
   params:[{id:'n',l:'card A',min:1,max:4,v:3},{id:'m',l:'card B',min:1,max:4,v:2}],
   draw:v=>{ const P=plane({x:[-0.8,4.8],y:[-0.8,4.6],grid:false,axes:false}), L=['a','b','c','d'];
     P.arrow(0,0,4.6,0,{c:'var(--muted)',w:1.5,hs:8}).arrow(0,0,0,4.4,{c:'var(--muted)',w:1.5,hs:8});
     for(let i=1;i<=v.n;i++){ P.text(i,0,String(i),{a:'middle',dy:18,c:'var(--muted)'}); for(let j=1;j<=v.m;j++) P.dot(i,j,{r:6,c:'var(--accent)'}); }
     for(let j=1;j<=v.m;j++) P.text(0,j,L[j-1],{a:'end',dx:-8,dy:5,c:'var(--muted)'});
     P.text(4.5,0,'A',{dy:-8}).text(0,4.3,'B',{dx:8}); return P.svg(); },
   info:v=>`card(A × B) = ${v.n} · ${v.m} = <b>${v.n*v.m}</b> couples, par exemple (1 ; a)`,
   note:'Un couple est <b>ordonné</b> : (1 ; 2) ≠ (2 ; 1). À ne pas confondre avec l’ensemble {1 ; 2} = {2 ; 1}.'},
  {h:'Un élément du produit',p:'Soit <i>A</i> = {1 ; 2} et <i>B</i> = {<i>x</i> ; <i>y</i> ; <i>z</i>}. Lequel est un élément de <i>A</i> × <i>B</i>&nbsp;?',
   opts:['(<i>x</i> ; 1)','{1 ; <i>x</i>}','(2 ; <i>z</i>)','(1 ; 2)'],ans:2,
   why:'Il faut un couple dont la 1re composante est dans A et la 2e dans B : (2 ; z) convient. (x ; 1) est un élément de B × A, et {1 ; x} n’est pas un couple.'},
  {h:'Les lois de De Morgan',p:`Le complémentaire échange union et intersection :<br><b>(<i>A</i> ∪ <i>B</i>)ᶜ = <i>A</i>ᶜ ∩ <i>B</i>ᶜ</b> &nbsp;et&nbsp; <b>(<i>A</i> ∩ <i>B</i>)ᶜ = <i>A</i>ᶜ ∪ <i>B</i>ᶜ</b>.<br>Compare les deux membres de chaque loi.`,
   params:[{id:'l',l:'Loi',min:1,max:2,v:1},{id:'s',l:'Membre (gauche / droite)',min:0,max:1,v:0}],
   draw:v=>venn(v.l===1?{o:1}:{a:1,b:1,o:1},{c:v.s?'var(--spark)':'var(--accent)'}),
   info:v=>v.l===1?(v.s?'Aᶜ ∩ Bᶜ : ni dans A, ni dans B':'(A ∪ B)ᶜ : hors de l’union'):(v.s?'Aᶜ ∪ Bᶜ : hors de A, ou hors de B':'(A ∩ B)ᶜ : hors de l’intersection'),
   note:'Même figure à gauche et à droite : c’est la preuve visuelle. En logique, c’est la règle non(P ou Q) = (non P) et (non Q).'},
  {kind:'Défi',h:'Complémentaire d’une intersection',p:'À quoi est égal (<i>A</i> ∩ <i>B</i>ᶜ)ᶜ&nbsp;?',
   opts:['<i>A</i>ᶜ ∩ <i>B</i>','<i>A</i> ∪ <i>B</i>ᶜ','<i>A</i>ᶜ ∪ <i>B</i>ᶜ','<i>A</i>ᶜ ∪ <i>B</i>'],ans:3,
   why:'De Morgan : (A ∩ Bᶜ)ᶜ = Aᶜ ∪ (Bᶜ)ᶜ = Aᶜ ∪ B. Le complémentaire du complémentaire redonne B.'},
]},

/* ===================== 2. LOGIQUE ===================== */
{subj:'al',sem:'all',id:'cms-al-logique',h:'Logique',p:'Connecteurs, tables de vérité, quantificateurs et l’art de nier une phrase.',steps:[
  {h:'Les connecteurs',p:`Une <b>proposition</b> est vraie (V) ou fausse (F). On la combine avec <b>non</b>, <b>et</b>, <b>ou</b>, <b>⇒</b> (implication) et <b>⇔</b> (équivalence). Une <b>table de vérité</b> donne la valeur pour chaque cas. Choisis P et Q pour surligner la ligne.`,
   params:[{id:'p',l:'P (0 = F, 1 = V)',min:0,max:1,v:1},{id:'q',l:'Q (0 = F, 1 = V)',min:0,max:1,v:0}],
   draw:v=>truth(v.p,v.q),
   info:v=>`P est ${v.p?'vraie':'fausse'}, Q est ${v.q?'vraie':'fausse'} : P ⇒ Q est <b>${(!v.p||v.q)?'vraie':'fausse'}</b>`,
   note:'P ⇒ Q est fausse <b>seulement</b> si P est vraie et Q fausse. Si P est fausse, l’implication est vraie quoi qu’il arrive.'},
  {h:'Quand l’implication est fausse',p:'Dans quel cas la proposition <i>P</i> ⇒ <i>Q</i> est-elle fausse&nbsp;?',
   opts:['P fausse, Q vraie','P fausse, Q fausse','P vraie, Q fausse','P vraie, Q vraie'],ans:2,
   why:'P ⇒ Q a la même table que (non P) ou Q. Elle n’est fausse que si P est vraie et Q fausse.'},
  {h:'Trouve la ligne',p:'Règle P et Q pour que <i>P</i> ⇒ <i>Q</i> soit <b>fausse</b> alors que <i>Q</i> ⇒ <i>P</i> est <b>vraie</b>.',
   params:[{id:'p',l:'P (0 = F, 1 = V)',min:0,max:1,v:0},{id:'q',l:'Q (0 = F, 1 = V)',min:0,max:1,v:0}],
   draw:v=>truth(v.p,v.q),
   info:v=>`P ⇒ Q : ${(!v.p||v.q)?'V':'F'} &nbsp;·&nbsp; Q ⇒ P : ${(!v.q||v.p)?'V':'F'}`,
   ok:v=>v.p===1&&v.q===0,why:'P ⇒ Q fausse impose P vraie et Q fausse. Alors Q ⇒ P s’écrit F ⇒ V, qui est vraie.'},
  {h:'Les quantificateurs',p:`<b>∀</b> se lit « pour tout » et <b>∃</b> « il existe ». « ∀<i>x</i> ∈ ℝ, <i>x</i>² ≥ 0 » est vraie. « ∃<i>x</i> ∈ ℝ, <i>x</i>² = −1 » est fausse. <b>L’ordre compte</b> : « ∀<i>x</i> ∈ ℝ, ∃<i>y</i> ∈ ℝ, <i>y</i> > <i>x</i> » est vraie (prends <i>y</i> = <i>x</i> + 1), mais « ∃<i>y</i> ∈ ℝ, ∀<i>x</i> ∈ ℝ, <i>y</i> > <i>x</i> » est fausse : aucun réel n’est plus grand que tous les autres.`,
   note:'Dans « ∀x, ∃y », le y peut dépendre de x. Dans « ∃y, ∀x », le même y doit marcher pour tous les x.'},
  {h:'Nier une phrase',p:`Pour nier, on échange ∀ et ∃, puis on nie la propriété finale :<br><b>non(∀<i>x</i>, P(<i>x</i>)) ⇔ ∃<i>x</i>, non P(<i>x</i>)</b>.<br>Pour les connecteurs : non(P et Q) ⇔ (non P) ou (non Q), et <b>non(P ⇒ Q) ⇔ P et (non Q)</b>.`,
   note:'La négation de « x > 0 » est « x ≤ 0 », pas « x < 0 ». Et les domaines (x ∈ ℝ, ε > 0) ne changent pas.'},
  {h:'La négation de la convergence',p:'Quelle est la négation de « ∀ε > 0, ∃<i>n</i> ∈ ℕ*, 1/<i>n</i> < ε »&nbsp;?',
   opts:['∀ε > 0, ∃<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε','∃ε ≤ 0, ∀<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε','∃ε > 0, ∃<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε','∃ε > 0, ∀<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε'],ans:3,
   why:'On échange ∀ et ∃ en gardant les domaines (ε > 0 reste ε > 0), puis on nie 1/n < ε en 1/n ≥ ε.'},
  {h:'Contraposée et réciproque',p:`À partir de « P ⇒ Q », on forme la <b>réciproque</b> Q ⇒ P et la <b>contraposée</b> (non Q) ⇒ (non P). La contraposée est <b>équivalente</b> à l’implication de départ, la réciproque non. Exemple : P = « <i>x</i> = 2 », Q = « <i>x</i>² = 4 ».`,
   params:[{id:'k',l:'Énoncé',min:0,max:2,v:0}],
   draw:v=>{ const L=[['x = 2','x² = 4'],['x² = 4','x = 2'],['x² ≠ 4','x ≠ 2']][v.k], ok=v.k!==1;
     return `<svg viewBox="0 0 320 90" width="320" role="img"><rect x="6" y="22" width="120" height="44" rx="10" fill="var(--math)" fill-opacity=".2" stroke="var(--math)" stroke-width="2"/><rect x="194" y="22" width="120" height="44" rx="10" fill="var(--spark)" fill-opacity=".3" stroke="var(--spark)" stroke-width="2"/>`
      +`<text x="66" y="50" font-size="16" font-weight="700" text-anchor="middle" fill="var(--ink)">${L[0]}</text><text x="254" y="50" font-size="16" font-weight="700" text-anchor="middle" fill="var(--ink)">${L[1]}</text>`
      +`<text x="160" y="52" font-size="24" font-weight="700" text-anchor="middle" fill="${ok?'var(--ok)':'var(--bad)'}">⇒</text><text x="160" y="84" font-size="12" text-anchor="middle" fill="var(--muted)">${['implication','réciproque','contraposée'][v.k]}</text></svg>`; },
   info:v=>['<b>Vraie</b> : si x = 2, alors x² = 4.','<b>Fausse</b> : x = −2 donne x² = 4 sans que x = 2.','<b>Vraie</b>, comme l’implication : si x² ≠ 4, x ne peut pas valoir 2.'][v.k],
   note:'Pour démontrer P ⇒ Q, on peut démontrer la contraposée. Démontrer la réciproque ne prouve rien.'},
  {h:'Écris la contraposée',p:'Quelle est la contraposée de « si <i>n</i>² est pair, alors <i>n</i> est pair »&nbsp;?',
   opts:['Si <i>n</i> est pair, alors <i>n</i>² est pair','Si <i>n</i> est impair, alors <i>n</i>² est impair','Si <i>n</i>² est impair, alors <i>n</i> est impair','<i>n</i>² est pair et <i>n</i> est impair'],ans:1,
   why:'La contraposée de P ⇒ Q est non Q ⇒ non P : « n impair ⇒ n² impair ». La 1re option est la réciproque, la dernière la négation.'},
  {kind:'Défi',h:'Compter les lignes vraies',p:'La table de vérité de (<i>P</i> ⇒ <i>Q</i>) et (<i>Q</i> ⇒ <i>R</i>) a 8 lignes. Combien sont vraies&nbsp;?',
   lab:'lignes vraies :',ans:4,
   why:'Il ne faut jamais « V puis F » dans l’ordre P, Q, R. Les triplets possibles sont FFF, FFV, FVV et VVV : 4 lignes.'},
]},

/* ===================== 3. APPLICATIONS ===================== */
{subj:'al',sem:'all',id:'cms-al-applications',h:'Applications',p:'Image, antécédents, injections, surjections, bijections et composition.',steps:[
  {h:'Image et antécédents',p:`Une <b>application</b> <i>f</i> : <i>E</i> → <i>F</i> associe à chaque <i>x</i> ∈ <i>E</i> <b>exactement une</b> image <i>f</i>(<i>x</i>) ∈ <i>F</i>. Un <b>antécédent</b> de <i>y</i> est un <i>x</i> tel que <i>f</i>(<i>x</i>) = <i>y</i>. Un <i>y</i> peut en avoir zéro, un ou plusieurs. Ici <i>f</i>(<i>x</i>) = <i>x</i>² sur ℝ.`,
   params:[{id:'y',l:'y',min:-1,max:4,step:.5,v:2}],
   draw:v=>{ const P=plane({x:[-3,3],y:[-1.5,4.5],lab:1}); P.fn(x=>x*x).seg(-3,v.y,3,v.y,{c:'var(--spark)',w:2,dash:1});
     if(v.y>0){ const r=Math.sqrt(v.y); P.dot(-r,v.y,{c:'var(--bad)'}).dot(r,v.y,{c:'var(--bad)'}).seg(-r,0,-r,v.y,{c:'var(--muted)',w:1,dash:1}).seg(r,0,r,v.y,{c:'var(--muted)',w:1,dash:1}); }
     else if(v.y===0) P.dot(0,0,{c:'var(--bad)'}); return P.svg(); },
   info:v=>v.y<0?`${fmt(v.y)} n’a <b>aucun</b> antécédent : un carré n’est jamais négatif`:v.y===0?'0 a <b>un seul</b> antécédent : 0':`${fmt(v.y)} a <b>deux</b> antécédents : ±${fmt(Math.sqrt(v.y))}`},
  {h:'Cherche les antécédents',p:'Soit <i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = <i>x</i>² − 2<i>x</i>. Quel est le <b>plus grand</b> antécédent de 3&nbsp;?',lab:'x =',ans:3,
   why:'x² − 2x = 3 ⇔ x² − 2x − 3 = 0 ⇔ (x − 3)(x + 1) = 0. Les antécédents sont −1 et 3.'},
  {h:'Image directe, image réciproque',p:`Pour <i>A</i> ⊂ <i>E</i>, l’<b>image</b> est <i>f</i>(<i>A</i>) = {<i>f</i>(<i>x</i>) : <i>x</i> ∈ <i>A</i>}. Pour <i>B</i> ⊂ <i>F</i>, l’<b>image réciproque</b> est <b><i>f</i>⁻¹(<i>B</i>) = {<i>x</i> ∈ <i>E</i> : <i>f</i>(<i>x</i>) ∈ <i>B</i>}</b>.<br>Avec <i>f</i>(<i>x</i>) = <i>x</i>² : <i>f</i>([−1 ; 2]) = [0 ; 4] et <i>f</i>⁻¹([1 ; 4]) = [−2 ; −1] ∪ [1 ; 2].`,
   fig:(()=>{ const P=plane({x:[-3,3],y:[-1,4.6],lab:1}); P.rect(-3,1,6,3,{fill:'var(--spark)',fo:.15,c:null}).fn(x=>x*x).seg(-2,0,-1,0,{c:'var(--bad)',w:6}).seg(1,0,2,0,{c:'var(--bad)',w:6}); P.text(2.9,2.4,'B = [1 ; 4]',{a:'end',s:12}); return P.svg(); })(),
   note:'La notation f⁻¹(B) a un sens pour <b>toute</b> application, même non bijective. Elle ne suppose pas que la réciproque existe.'},
  {h:'Injection, surjection, bijection',p:`<i>f</i> est <b>injective</b> si deux éléments distincts ont des images distinctes : tout <i>y</i> a <b>au plus</b> un antécédent. Elle est <b>surjective</b> si tout <i>y</i> ∈ <i>F</i> a <b>au moins</b> un antécédent. <b>Bijective</b> = les deux : exactement un antécédent. Choisis les images.`,
   params:[{id:'f1',l:'f(1)',min:0,max:2,v:0},{id:'f2',l:'f(2)',min:0,max:2,v:0},{id:'f3',l:'f(3)',min:0,max:2,v:1}],
   draw:v=>sag(['1','2','3'],['a','b','c'],[v.f1,v.f2,v.f3]),
   info:v=>{ const f=[v.f1,v.f2,v.f3], inj=new Set(f).size===3, sur=[0,1,2].every(j=>f.includes(j));
     return `${inj?'injective':'pas injective'} · ${sur?'surjective':'pas surjective'}${inj&&sur?' · <b>bijective</b>':''}`; },
   note:'Pour prouver l’injectivité : on suppose f(x) = f(x′) et on montre x = x′.'},
  {h:'Le carré sur ℝ',p:'L’application <i>f</i> : ℝ → ℝ, <i>x</i> ↦ <i>x</i>² est…',
   opts:['injective mais pas surjective','surjective mais pas injective','ni injective ni surjective','bijective'],ans:2,
   why:'f(−1) = f(1) : pas injective. −1 n’a pas d’antécédent : pas surjective. En revanche, de [0 ; +∞[ vers [0 ; +∞[, elle devient bijective.'},
  {h:'Rends-la surjective',p:'Ici <i>E</i> = {1 ; 2 ; 3 ; 4} et <i>F</i> = {a ; b ; c}. Règle les images pour que <i>f</i> soit surjective.',
   params:[{id:'f1',l:'f(1)',min:0,max:2,v:0},{id:'f2',l:'f(2)',min:0,max:2,v:0},{id:'f3',l:'f(3)',min:0,max:2,v:1},{id:'f4',l:'f(4)',min:0,max:2,v:1}],
   draw:v=>sag(['1','2','3','4'],['a','b','c'],[v.f1,v.f2,v.f3,v.f4]),
   ok:v=>[0,1,2].every(j=>[v.f1,v.f2,v.f3,v.f4].includes(j)),
   why:'Chaque élément de F doit recevoir au moins une flèche. Avec 4 éléments au départ et 3 à l’arrivée, f ne peut pas être injective : deux éléments partagent une image.'},
  {h:'Composition et réciproque',p:`La <b>composée</b> de <i>f</i> : <i>E</i> → <i>F</i> et <i>g</i> : <i>F</i> → <i>G</i> est <b>(<i>g</i> ∘ <i>f</i>)(<i>x</i>) = <i>g</i>(<i>f</i>(<i>x</i>))</b> : on applique <i>f</i> d’abord. Si <i>f</i> est bijective, sa <b>réciproque</b> <i>f</i>⁻¹ vérifie <i>f</i>⁻¹ ∘ <i>f</i> = id<sub>E</sub> et <i>f</i> ∘ <i>f</i>⁻¹ = id<sub>F</sub>. Son graphe est le symétrique de celui de <i>f</i> par rapport à <i>y</i> = <i>x</i>.`,
   fig:(()=>{ const P=plane({x:[-3,4],y:[-3,4],lab:1}); P.fn(x=>x,{c:'var(--muted)',w:1.5,dash:1}).fn(x=>2*x+1).fn(x=>(x-1)/2,{c:'var(--spark)'});
     P.text(0.6,3.4,'f(x) = 2x + 1',{s:12,c:'var(--accent)'}).text(3.9,0.9,'f⁻¹',{a:'end',dy:18,s:12,c:'var(--spark)'}); return P.svg(); })(),
   note:'En général g ∘ f ≠ f ∘ g. Et (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹ : on défait dans l’ordre inverse.'},
  {h:'Calcule une composée',p:'Soit <i>f</i>(<i>x</i>) = <i>x</i> + 3 et <i>g</i>(<i>x</i>) = <i>x</i>². Calcule (<i>g</i> ∘ <i>f</i>)(2).',lab:'(g ∘ f)(2) =',ans:25,
   why:'f(2) = 5, puis g(5) = 25. Attention, (f ∘ g)(2) = f(4) = 7 : l’ordre compte.'},
  {kind:'Défi',h:'Réciproque',p:'<i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = 3<i>x</i> − 6 est bijective. Combien vaut <i>f</i>⁻¹(9)&nbsp;?',lab:'f⁻¹(9) =',ans:5,
   why:'On résout 3x − 6 = 9 : x = 5. Plus généralement f⁻¹(y) = (y + 6)/3.'},
]},

/* ===================== 4. MATRICES ===================== */
{subj:'al',sem:'all',id:'cms-al-matrices',h:'Matrices 2×2',p:'Somme, produit, transposée, déterminant, inverse et systèmes linéaires.',steps:[
  {h:'Somme et multiple',p:`Une matrice 2×2 est un tableau ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])}. On additionne deux matrices <b>terme à terme</b>, et λ<i>A</i> multiplie chaque coefficient par λ.<br>${mat([[1,2],[0,3]])} + ${M([[4,-1],[2,1]])} = ${mat([[5,1],[2,4]])}.`,
   note:'Le coefficient a<sub>ij</sub> est sur la ligne i et la colonne j. On lit toujours ligne puis colonne.'},
  {h:'Le produit ne commute pas',p:`Le produit se fait <b>ligne × colonne</b> : ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])}${mat([['<i>e</i>','<i>f</i>'],['<i>g</i>','<i>h</i>']])} = ${mat([['<i>ae</i> + <i>bg</i>','<i>af</i> + <i>bh</i>'],['<i>ce</i> + <i>dg</i>','<i>cf</i> + <i>dh</i>']])}.<br>Vu géométriquement, <i>AB</i> applique <i>B</i> puis <i>A</i>. Avec <i>A</i> un cisaillement et <i>B</i> une rotation de 90°, compare <i>AB</i> et <i>BA</i>.`,
   params:[{id:'o',l:'Ordre (0 : AB, 1 : BA)',min:0,max:1,v:0}],
   draw:v=>{ const A=[[1,1],[0,1]],B=[[0,-1],[1,0]],C=v.o?mul(B,A):mul(A,B), P=plane({x:[-2.5,2.5],y:[-1.5,2.5],step:.5,lab:1});
     P.rect(0,0,1,1,{c:'var(--muted)',w:1.5,dash:1}); grille(P,C[0][0],C[0][1],C[1][0],C[1][1],0); return P.svg(); },
   info:v=>{ const A=[[1,1],[0,1]],B=[[0,-1],[1,0]]; return v.o?`BA = ${M(mul(B,A))} : cisaillement, puis rotation`:`AB = ${M(mul(A,B))} : rotation, puis cisaillement`; },
   note:`Ici <i>A</i> = ${mat([[1,1],[0,1]])} et <i>B</i> = ${M([[0,-1],[1,0]])}. Les deux carrés images sont différents : <b>AB ≠ BA</b> en général.`},
  {h:'Un coefficient du produit',p:`Soit <i>A</i> = ${M([[2,1],[3,-1]])} et <i>B</i> = ${M([[1,4],[-2,2]])}. Quel est le coefficient ligne 2, colonne 1 de <i>AB</i>&nbsp;?`,lab:'(AB)₂₁ =',ans:5,
   why:'Ligne 2 de A × colonne 1 de B : 3·1 + (−1)·(−2) = 3 + 2 = 5. En entier, AB = (0 10 ; 5 10).'},
  {h:'Transposée et déterminant',p:`La <b>transposée</b> échange lignes et colonnes : ᵗ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} = ${mat([['<i>a</i>','<i>c</i>'],['<i>b</i>','<i>d</i>']])}, et ᵗ(<i>AB</i>) = ᵗ<i>B</i> ᵗ<i>A</i>. Le <b>déterminant</b> est <b>det <i>A</i> = <i>ad</i> − <i>bc</i></b> : c’est l’aire orientée du parallélogramme formé par les colonnes. Règle les coefficients.`,
   params:[{id:'a',l:'a',min:-2,max:2,v:2},{id:'b',l:'b',min:-2,max:2,v:1},{id:'c',l:'c',min:-2,max:2,v:0},{id:'d',l:'d',min:-2,max:2,v:1}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],lab:2}); P.poly([[0,0],[v.a,v.c],[v.a+v.b,v.c+v.d],[v.b,v.d]],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2}).arrow(0,0,v.a,v.c,{c:'var(--math)'}).arrow(0,0,v.b,v.d,{c:'var(--spark)'}); return P.svg(); },
   info:v=>{ const D=v.a*v.d-v.b*v.c; return `${M([[v.a,v.b],[v.c,v.d]])} &nbsp; det = ${fmt(v.a*v.d)} − (${fmt(v.b*v.c)}) = <b>${fmt(D)}</b> ${D===0?'· colonnes colinéaires, pas inversible':D<0?'· orientation inversée':''}`; },
   note:'det(AB) = det A · det B, et det(ᵗA) = det A. Mais det(A + B) ≠ det A + det B en général.'},
  {h:'Laquelle n’est pas inversible&nbsp;?',p:'Une matrice est inversible si et seulement si son déterminant est non nul. Laquelle n’est <b>pas</b> inversible&nbsp;?',
   opts:[mat([[1,2],[3,4]]),mat([[2,3],[4,6]]),mat([[0,1],[1,0]]),mat([[1,1],[0,1]])],ans:1,
   why:'det = 2·6 − 3·4 = 0 : la 2e colonne vaut 1,5 fois la 1re. Les autres ont pour déterminant −2, −1 et 1.'},
  {h:'L’inverse',p:`Si det <i>A</i> ≠ 0, <i>A</i> a une <b>inverse</b> <i>A</i>⁻¹ telle que <i>AA</i>⁻¹ = <i>A</i>⁻¹<i>A</i> = <i>I</i>, et<br><b><i>A</i>⁻¹ = ${F(1,'<i>ad</i> − <i>bc</i>')} ${mat([['<i>d</i>','−<i>b</i>'],['−<i>c</i>','<i>a</i>']])}</b>.<br>On échange <i>a</i> et <i>d</i>, on change le signe de <i>b</i> et <i>c</i>, et on divise par le déterminant. Exemple : ${mat([[2,1],[5,3]])}⁻¹ = ${M([[3,-1],[-5,2]])} car det = 1.`,
   note:'Vérifie toujours en calculant AA⁻¹ : tu dois retrouver I. Et (AB)⁻¹ = B⁻¹A⁻¹.'},
  {h:'Calcule une inverse',p:`Soit <i>A</i> = ${mat([[4,7],[2,4]])}. Quel est le coefficient en haut à droite de <i>A</i>⁻¹&nbsp;? Donne la valeur décimale exacte.`,lab:'coefficient =',ans:-3.5,tol:.001,
   why:'det A = 16 − 14 = 2, donc A⁻¹ = ½ (4 −7 ; −2 4) = (2 −3,5 ; −1 2). Le coefficient cherché est −7/2 = −3,5.'},
  {h:'Résoudre un système',p:`Le système 2<i>x</i> + <i>y</i> = 5, <i>x</i> − <i>y</i> = 1 s’écrit <i>AX</i> = <i>B</i> avec <i>A</i> = ${M([[2,1],[1,-1]])}. Comme det <i>A</i> = −3 ≠ 0, la solution est unique : <i>X</i> = <i>A</i>⁻¹<i>B</i>. Géométriquement, c’est l’intersection de deux droites. Place le point dessus.`,
   params:[{id:'x',l:'x',min:-2,max:4,step:.5,v:0},{id:'y',l:'y',min:-2,max:4,step:.5,v:0}],
   draw:v=>{ const P=plane({x:[-2.5,4.5],y:[-2.5,4.5],lab:1}); P.fn(x=>5-2*x,{c:'var(--math)'}).fn(x=>x-1,{c:'var(--spark)'}).dot(v.x,v.y,{c:'var(--bad)',l:`(${fmt(v.x)} ; ${fmt(v.y)})`}); return P.svg(); },
   info:v=>`2x + y = ${fmt(2*v.x+v.y)} (cible 5) · x − y = ${fmt(v.x-v.y)} (cible 1)`,
   ok:v=>v.x===2&&v.y===1,why:'En additionnant les deux équations : 3x = 6, donc x = 2, puis y = x − 1 = 1.',
   note:'Si det A = 0, les droites sont parallèles (aucune solution) ou confondues (une infinité).'},
  {kind:'Défi',h:'Système par Cramer',p:'Résous 3<i>x</i> + 2<i>y</i> = 7 et <i>x</i> + 4<i>y</i> = 9. Combien vaut <i>y</i>&nbsp;?',lab:'y =',ans:2,
   why:'det = 3·4 − 2·1 = 10. Cramer : y = (3·9 − 7·1)/10 = 20/10 = 2, et x = (7·4 − 2·9)/10 = 1. Vérification : 3 + 4 = 7 et 1 + 8 = 9.'},
]},

/* ===================== 5. SOUS-ESPACES ET BASES ===================== */
{subj:'al',sem:'all',id:'cms-al-bases',h:'Sous-espaces et bases de ℝ²',p:'Combinaisons linéaires, indépendance, droites vectorielles et coordonnées dans une base.',steps:[
  {h:'Combinaisons linéaires',p:`Une <b>combinaison linéaire</b> de <b>u</b> et <b>v</b> est un vecteur α<b>u</b> + β<b>v</b> avec α, β ∈ ℝ. Ici <b>u</b> = (1 ; 2) en bleu et <b>v</b> = (1 ; −1) en jaune.`,
   params:[{id:'a',l:'α',min:-2,max:3,step:.5,v:1},{id:'b',l:'β',min:-2,max:3,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-5,6],y:[-5,6],lab:2}), ax=v.a, ay=2*v.a; P.arrow(0,0,ax,ay,{c:'var(--math)'}).arrow(ax,ay,ax+v.b,ay-v.b,{c:'var(--spark)'}).arrow(0,0,ax+v.b,ay-v.b,{w:4}); return P.svg(); },
   info:v=>`${fmt(v.a)}·u + ${fmt(v.b)}·v = (${fmt(v.a+v.b)} ; ${fmt(2*v.a-v.b)})`},
  {h:'Atteins la cible',p:'Trouve α et β pour que α<b>u</b> + β<b>v</b> = (1 ; 5).',
   params:[{id:'a',l:'α',min:-2,max:3,step:.5,v:0},{id:'b',l:'β',min:-2,max:3,step:.5,v:0}],
   draw:v=>{ const P=plane({x:[-5,6],y:[-5,6],lab:2}), ax=v.a, ay=2*v.a; P.dot(1,5,{c:'var(--bad)',l:'(1 ; 5)'}).arrow(0,0,ax,ay,{c:'var(--math)'}).arrow(ax,ay,ax+v.b,ay-v.b,{c:'var(--spark)'}); return P.svg(); },
   info:v=>`(${fmt(v.a+v.b)} ; ${fmt(2*v.a-v.b)})`,
   ok:v=>v.a===2&&v.b===-1,why:'On résout α + β = 1 et 2α − β = 5. En additionnant : 3α = 6, donc α = 2 et β = −1.'},
  {h:'Libre ou liée',p:`La famille (<b>u</b>, <b>v</b>) est <b>libre</b> si α<b>u</b> + β<b>v</b> = <b>0</b> impose α = β = 0. Sinon elle est <b>liée</b> : les vecteurs sont colinéaires. Dans ℝ², <b>libre ⇔ det(<b>u</b>, <b>v</b>) ≠ 0</b>. Ici <b>u</b> = (2 ; 1) est fixé, règle <b>v</b>.`,
   params:[{id:'x',l:'v₁',min:-3,max:3,v:1},{id:'y',l:'v₂',min:-3,max:3,v:2}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],grid:false}), D=2*v.y-v.x;
     if(D!==0){ for(let i=-6;i<=6;i++){ P.seg(i*2-6*v.x,i-6*v.y,i*2+6*v.x,i+6*v.y,{c:'var(--line)',w:1}).seg(i*v.x-12,i*v.y-6,i*v.x+12,i*v.y+6,{c:'var(--line)',w:1}); } }
     else ln(P,2,1,{c:'var(--accent)',w:6,op:.3});
     P.arrow(0,0,2,1,{c:'var(--math)'}); if(v.x||v.y) P.arrow(0,0,v.x,v.y,{c:'var(--spark)'}); return P.svg(); },
   info:v=>{ const D=2*v.y-v.x; return `det(u, v) = 2·${fmt(v.y)} − 1·${fmt(v.x)} = <b>${fmt(D)}</b> : ${D?'famille <b>libre</b>, les combinaisons couvrent tout le plan':'famille <b>liée</b>, les combinaisons restent sur une droite'}`; }},
  {h:'Repère la famille liée',p:'Laquelle de ces familles est <b>liée</b>&nbsp;?',
   opts:['(1 ; 2) et (2 ; 1)','(1 ; 0) et (1 ; 1)','(3 ; −1) et (−6 ; 2)','(0 ; 1) et (1 ; 0)'],ans:2,
   why:'(−6 ; 2) = −2·(3 ; −1). Le déterminant vaut 3·2 − (−1)·(−6) = 6 − 6 = 0.'},
  {h:'Sous-espaces vectoriels',p:`Un <b>sous-espace vectoriel</b> de ℝ² est une partie <i>F</i> non vide, <b>stable par combinaison linéaire</b> : si <b>u</b>, <b>v</b> ∈ <i>F</i>, alors α<b>u</b> + β<b>v</b> ∈ <i>F</i>. Il contient toujours <b>0</b>. Dans ℝ², il n’y en a que trois sortes : {<b>0</b>}, les <b>droites passant par l’origine</b>, et ℝ² lui-même.`,
   fig:(()=>{ const P=plane({x:[-4,4],y:[-3,3],lab:1}); P.fn(x=>x/2,{c:'var(--ok)'}).fn(x=>x/2+1,{c:'var(--bad)',dash:1}); P.dot(0,0,{r:4,c:'var(--ink)'}).text(-3.9,0.4,'y = x/2 + 1 : non',{s:12,c:'var(--bad)'}).text(-3.9,-2.6,'y = x/2 : oui',{s:12,c:'var(--ok)'}); return P.svg(); })(),
   note:'Test rapide : si 0 n’est pas dans F, ce n’est pas un sous-espace. La droite y = x/2 + 1 ne passe pas par l’origine.'},
  {h:'Lequel est un sous-espace&nbsp;?',p:'Laquelle de ces parties de ℝ² est un sous-espace vectoriel&nbsp;?',
   opts:['{(<i>x</i> ; <i>y</i>) : <i>y</i> = <i>x</i> + 1}','{(<i>x</i> ; <i>y</i>) : <i>x</i> ≥ 0}','{(<i>x</i> ; <i>y</i>) : <i>xy</i> = 0}','{(<i>x</i> ; <i>y</i>) : <i>y</i> = 3<i>x</i>}'],ans:3,
   why:'y = 3x est une droite par l’origine. y = x + 1 ne contient pas 0. x ≥ 0 n’est pas stable par −1. xy = 0 (les deux axes) n’est pas stable par addition : (1 ; 0) + (0 ; 1) = (1 ; 1).'},
  {h:'Bases et coordonnées',p:`Une <b>base</b> est une famille <b>libre et génératrice</b>. Dans ℝ², deux vecteurs non colinéaires forment une base. Tout vecteur <b>w</b> s’écrit alors de façon <b>unique</b> <b>w</b> = α<b>u</b> + β<b>v</b> : (α ; β) sont ses <b>coordonnées</b> dans la base (<b>u</b>, <b>v</b>). Ci-dessous, <b>u</b> = (1 ; 1), <b>v</b> = (1 ; −1) et <b>w</b> = (3 ; 1) = 2<b>u</b> + 1<b>v</b>.`,
   fig:(()=>{ const P=plane({x:[-1,5],y:[-2.5,3.5],grid:false}); for(let i=-4;i<=6;i++){ P.seg(i-6,i+6,i+6,i-6,{c:'var(--line)',w:1}).seg(i-6,-i-6,i+6,-i+6,{c:'var(--line)',w:1}); }
     P.arrow(0,0,2,2,{c:'var(--math)',w:2,op:.5}).arrow(2,2,3,1,{c:'var(--spark)',w:2}).arrow(0,0,1,1,{c:'var(--math)'}).arrow(0,0,1,-1,{c:'var(--spark)'}).dot(3,1,{c:'var(--bad)',l:'w'}).text(1,1,'u',{dx:-14,dy:-4}).text(1,-1,'v',{dx:6,dy:14}); return P.svg(); })(),
   note:'Les coordonnées dépendent de la base : dans la base canonique, w = (3 ; 1), mais dans (u, v), w a pour coordonnées (2 ; 1).'},
  {h:'Coordonnées dans une base',p:'Dans la base <b>u</b> = (1 ; 1), <b>v</b> = (1 ; −1), quelle est la première coordonnée α de <b>w</b> = (5 ; 1)&nbsp;?',lab:'α =',ans:3,
   why:'α + β = 5 et α − β = 1, donc 2α = 6 : α = 3 et β = 2. Vérification : 3(1 ; 1) + 2(1 ; −1) = (5 ; 1).'},
  {kind:'Défi',h:'Quand la famille devient liée',p:'Pour quelle valeur <b>positive</b> de <i>k</i> les vecteurs (1 ; <i>k</i>) et (<i>k</i> ; 4) sont-ils colinéaires&nbsp;?',lab:'k =',ans:2,
   why:'det = 1·4 − k·k = 4 − k² = 0 ⇔ k = ±2. Pour k = 2 : (2 ; 4) = 2·(1 ; 2).'},
]},

/* ===================== 6. APPLICATIONS LINÉAIRES ===================== */
{subj:'al',sem:'all',id:'cms-al-applin',h:'Applications linéaires du plan',p:'Matrice, noyau, image, rang et changement de base.',steps:[
  {h:'Linéaire, et sa matrice',p:`<i>f</i> : ℝ² → ℝ² est <b>linéaire</b> si <i>f</i>(<b>u</b> + <b>v</b>) = <i>f</i>(<b>u</b>) + <i>f</i>(<b>v</b>) et <i>f</i>(λ<b>u</b>) = λ<i>f</i>(<b>u</b>). Elle est alors entièrement donnée par <i>f</i>(<b>e₁</b>) et <i>f</i>(<b>e₂</b>), qui sont les <b>colonnes</b> de sa matrice. Toute la grille suit.`,
   params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'b',l:'b',min:-2,max:2,step:.5,v:.5},{id:'c',l:'c',min:-2,max:2,step:.5,v:0},{id:'d',l:'d',min:-2,max:2,step:.5,v:1}],
   draw:v=>grille(plane({x:[-4,4],y:[-4,4],grid:false}),v.a,v.b,v.c,v.d).svg(),
   info:v=>`${M([[v.a,v.b],[v.c,v.d]])} &nbsp; f(e₁) = (${fmt(v.a)} ; ${fmt(v.c)}) en bleu, f(e₂) = (${fmt(v.b)} ; ${fmt(v.d)}) en jaune`,
   note:'Une application linéaire envoie toujours 0 sur 0, et les droites sur des droites (ou sur un point).'},
  {h:'Laquelle est linéaire&nbsp;?',p:'Laquelle de ces applications de ℝ² dans ℝ² est linéaire&nbsp;?',
   opts:['(<i>x</i> ; <i>y</i>) ↦ (<i>x</i> + 1 ; <i>y</i>)','(<i>x</i> ; <i>y</i>) ↦ (<i>xy</i> ; <i>y</i>)','(<i>x</i> ; <i>y</i>) ↦ (<i>x</i> + <i>y</i> ; 2<i>x</i>)','(<i>x</i> ; <i>y</i>) ↦ (<i>x</i>² ; <i>y</i>)'],ans:2,
   why:'(x + y ; 2x) a pour matrice (1 1 ; 2 0). La 1re n’envoie pas 0 sur 0, et les deux autres contiennent des produits ou des carrés : f(2u) ≠ 2f(u).'},
  {h:'Image d’un vecteur',p:'<i>f</i> est linéaire avec <i>f</i>(<b>e₁</b>) = (2 ; 1) et <i>f</i>(<b>e₂</b>) = (−1 ; 3). Quelle est la <b>deuxième</b> coordonnée de <i>f</i>(3 ; 2)&nbsp;?',lab:'2e coordonnée =',ans:9,
   why:'(3 ; 2) = 3e₁ + 2e₂, donc f(3 ; 2) = 3(2 ; 1) + 2(−1 ; 3) = (4 ; 9).'},
  {h:'Noyau, image, rang',p:`Le <b>noyau</b> ker <i>f</i> = {<b>u</b> : <i>f</i>(<b>u</b>) = <b>0</b>} et l’<b>image</b> Im <i>f</i> = {<i>f</i>(<b>u</b>)} sont des sous-espaces. Le <b>rang</b> est la dimension de l’image. <b>Théorème du rang</b> : <b>dim ker <i>f</i> + rg <i>f</i> = 2</b>. En rouge pointillé, le noyau, en vert l’image.`,
   params:[{id:'a',l:'a',min:-2,max:2,v:1},{id:'b',l:'b',min:-2,max:2,v:2},{id:'c',l:'c',min:-2,max:2,v:1},{id:'d',l:'d',min:-2,max:2,v:1}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],grid:false}), D=v.a*v.d-v.b*v.c, z=!v.a&&!v.b&&!v.c&&!v.d;
     grille(P,v.a,v.b,v.c,v.d);
     if(D===0&&!z){ const im=(v.a||v.c)?[v.a,v.c]:[v.b,v.d], ke=(v.a||v.b)?[-v.b,v.a]:[-v.d,v.c]; ln(P,im[0],im[1],{c:'var(--ok)',w:6,op:.45}); ln(P,ke[0],ke[1],{c:'var(--bad)',w:2.5,dash:1}); }
     return P.svg(); },
   info:v=>{ const D=v.a*v.d-v.b*v.c, z=!v.a&&!v.b&&!v.c&&!v.d;
     return z?'Matrice nulle : ker f = ℝ², Im f = {0}, rang 0 (2 + 0 = 2)':D?`det = ${fmt(D)} ≠ 0 : ker f = {0}, Im f = ℝ², <b>rang 2</b> (0 + 2 = 2)`:'det = 0 : ker f et Im f sont des droites, <b>rang 1</b> (1 + 1 = 2)'; },
   note:'En dimension 2 : f est bijective ⇔ ker f = {0} ⇔ rg f = 2 ⇔ det ≠ 0.'},
  {h:'Fabrique un noyau',p:'Règle la matrice pour que le noyau soit la droite <i>y</i> = <i>x</i> et l’image l’<b>axe des abscisses</b>.',
   params:[{id:'a',l:'a',min:-2,max:2,v:1},{id:'b',l:'b',min:-2,max:2,v:0},{id:'c',l:'c',min:-2,max:2,v:0},{id:'d',l:'d',min:-2,max:2,v:1}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],grid:false}); ln(P,1,1,{c:'var(--muted)',w:1.5,dash:1}); grille(P,v.a,v.b,v.c,v.d); return P.svg(); },
   info:v=>`${M([[v.a,v.b],[v.c,v.d]])} &nbsp; f(1 ; 1) = (${fmt(v.a+v.b)} ; ${fmt(v.c+v.d)})`,
   ok:v=>v.c===0&&v.d===0&&v.a!==0&&v.a+v.b===0,
   why:'Image sur l’axe des x : la 2e ligne est nulle (c = d = 0). Noyau y = x : f(1 ; 1) = 0, donc a + b = 0, avec a ≠ 0 pour ne pas tout écraser. Par exemple (1 −1 ; 0 0).'},
  {h:'Lis le noyau',p:`Quel est le noyau de l’application de matrice ${mat([[1,2],[2,4]])}&nbsp;?`,
   opts:['La droite dirigée par (2 ; −1)','La droite dirigée par (1 ; 2)','{<b>0</b>}','ℝ² tout entier'],ans:0,
   why:'det = 4 − 4 = 0 et la matrice n’est pas nulle : rang 1, donc le noyau est une droite. x + 2y = 0 est vérifiée par (2 ; −1). L’image est la droite dirigée par (1 ; 2).'},
  {h:'Changement de base',p:`Si <i>A</i> est la matrice de <i>f</i> dans la base canonique et <i>P</i> la matrice dont les colonnes sont une nouvelle base (<b>u</b>, <b>v</b>), alors la matrice de <i>f</i> dans (<b>u</b>, <b>v</b>) est <b><i>A</i>′ = <i>P</i>⁻¹<i>AP</i></b>.<br>Exemple : <i>A</i> = ${mat([[2,1],[1,2]])}, <b>u</b> = (1 ; 1), <b>v</b> = (−1 ; 1). Comme <i>A</i><b>u</b> = 3<b>u</b> et <i>A</i><b>v</b> = <b>v</b>, on trouve <i>A</i>′ = ${mat([[3,0],[0,1]])}.`,
   fig:(()=>{ const P=plane({x:[-3.5,4],y:[-1,4],lab:1}); P.arrow(0,0,3,3,{c:'var(--math)',w:2,op:.45}).arrow(0,0,1,1,{c:'var(--math)'}).arrow(0,0,-1,1,{c:'var(--spark)',w:5}).text(3,3,'Au = 3u',{dx:-70,dy:4,s:12}).text(-1,1,'Av = v',{dx:-10,dy:-10,s:12}); return P.svg(); })(),
   note:'A et A′ représentent la même application : elles ont même déterminant, même trace et même rang. On dit qu’elles sont <b>semblables</b>.'},
  {h:'Calcule P⁻¹AP',p:`Soit <i>A</i> = ${mat([[1,2],[0,3]])} et <i>P</i> = ${mat([[1,1],[1,2]])}. Quel est le coefficient en haut à droite de <i>P</i>⁻¹<i>AP</i>&nbsp;?`,lab:'coefficient =',ans:4,
   why:'det P = 1, P⁻¹ = (2 −1 ; −1 1). AP = (3 5 ; 3 6), puis P⁻¹(AP) = (3 4 ; 0 1). Contrôle : trace 4 et det 3, comme pour A.'},
  {kind:'Défi',h:'Rang 1',p:`Pour quelle valeur de <i>k</i> la matrice ${mat([['<i>k</i>','6'],['2','3']])} est-elle de rang 1&nbsp;?`,lab:'k =',ans:4,
   why:'Rang 1 ⇔ det = 0 (la matrice n’est jamais nulle) : 3k − 12 = 0, donc k = 4. Par le théorème du rang, le noyau est alors une droite.'},
]},

/* ===================== 7. VALEURS PROPRES ===================== */
{subj:'al',sem:'all',id:'cms-al-propres',h:'Valeurs et vecteurs propres',p:'Les directions qu’une matrice étire sans les tourner.',steps:[
  {h:'Une direction qui résiste',p:`Un <b>vecteur propre</b> de <i>A</i> est un vecteur <b>v ≠ 0</b> tel que <b><i>A</i>v = λv</b> : <i>A</i> l’étire d’un facteur λ, la <b>valeur propre</b>, sans changer sa direction. Ici <i>A</i> = ${mat([[3,1],[0,2]])}, <b>v</b> en bleu et <i>A</i><b>v</b> en jaune.`,
   params:[{id:'t',l:'Direction de v',min:0,max:345,step:15,v:30,u:'°'}],
   draw:v=>{ const x=Math.cos(rad(v.t))*1.2,y=Math.sin(rad(v.t))*1.2,P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,3*x+y,2*y,{c:'var(--spark)',w:4}).arrow(0,0,x,y,{c:'var(--math)'}); return P.svg(); },
   info:v=>{ const x=Math.cos(rad(v.t)),y=Math.sin(rad(v.t)),ax=3*x+y,ay=2*y; return Math.abs(x*ay-y*ax)<1e-9?`<b>Direction propre</b> : Av = ${fmt(ax*x+ay*y)}·v`:'Av n’est pas aligné avec v'; }},
  {h:'Trouve l’autre direction',p:'L’axe horizontal est une direction propre (λ = 3). Tourne <b>v</b> pour trouver l’<b>autre</b> direction propre.',
   params:[{id:'t',l:'Direction de v',min:0,max:345,step:15,v:60,u:'°'}],
   draw:v=>{ const x=Math.cos(rad(v.t))*1.2,y=Math.sin(rad(v.t))*1.2,P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,3*x+y,2*y,{c:'var(--spark)',w:4}).arrow(0,0,x,y,{c:'var(--math)'}); return P.svg(); },
   ok:v=>v.t===135||v.t===315,why:'A(1 ; −1) = (3 − 1 ; −2) = (2 ; −2) = 2·(1 ; −1). La direction 135° (ou 315°) est propre, avec λ = 2.'},
  {h:'Le polynôme caractéristique',p:`λ est valeur propre ⇔ (<i>A</i> − λ<i>I</i>)<b>v</b> = <b>0</b> a une solution <b>v ≠ 0</b> ⇔ det(<i>A</i> − λ<i>I</i>) = 0. Pour une matrice 2×2, cela donne<br><b>λ² − tr(<i>A</i>) λ + det(<i>A</i>) = 0</b>,<br>où tr(<i>A</i>) = <i>a</i> + <i>d</i> est la <b>trace</b>.`,
   note:'Conséquence : la somme des valeurs propres vaut tr(A), leur produit vaut det(A). Pratique pour vérifier.'},
  {h:'Calcule les valeurs propres',p:`Quelle est la plus grande valeur propre de ${mat([[1,2],[3,2]])}&nbsp;?`,lab:'λ =',ans:4,
   why:'tr = 3 et det = 2 − 6 = −4. λ² − 3λ − 4 = (λ − 4)(λ + 1) = 0 : les valeurs propres sont 4 et −1.'},
  {h:'Trace, déterminant et racines',p:`Les valeurs propres sont les racines de <i>p</i>(λ) = λ² − <i>t</i>λ + <i>δ</i>, avec <i>t</i> = tr <i>A</i> et <i>δ</i> = det <i>A</i>. Le discriminant Δ = <i>t</i>² − 4<i>δ</i> décide de tout.`,
   params:[{id:'t',l:'trace t',min:-4,max:4,v:3},{id:'d',l:'déterminant δ',min:-4,max:5,v:2}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-9,7],h:300,step:1,lab:2}); P.fn(x=>x*x-v.t*x+v.d); const D=v.t*v.t-4*v.d;
     if(D>=0){ const r=Math.sqrt(D); P.dot((v.t-r)/2,0,{c:'var(--bad)'}); if(D>0) P.dot((v.t+r)/2,0,{c:'var(--bad)'}); } return P.svg(); },
   info:v=>{ const D=v.t*v.t-4*v.d, r=Math.sqrt(Math.abs(D)); return D>0?`Δ = ${fmt(D)} > 0 : deux valeurs propres réelles ${fmt((v.t-r)/2)} et ${fmt((v.t+r)/2)}`
     :D===0?`Δ = 0 : une valeur propre <b>double</b> λ = ${fmt(v.t/2)}`:`Δ = ${fmt(D)} < 0 : pas de valeur propre réelle, mais λ = ${fmt(v.t/2)} ± ${fmt(r/2)}i dans ℂ`; }},
  {h:'Les espaces propres',p:`Pour chaque valeur propre λ, l’<b>espace propre</b> est <b><i>E</i><sub>λ</sub> = ker(<i>A</i> − λ<i>I</i>)</b>. En dimension 2, c’est une droite par l’origine, sauf si <i>A</i> = λ<i>I</i> (alors <i>E</i><sub>λ</sub> = ℝ²).<br>Méthode : on écrit <i>A</i> − λ<i>I</i>, ses deux lignes sont proportionnelles, et une seule équation suffit.`,
   note:'Si les lignes de A − λI ne sont pas proportionnelles, tu t’es trompé·e sur λ : det(A − λI) devrait valoir 0.'},
  {h:'Trouve un vecteur propre',p:`Pour <i>A</i> = ${mat([[1,2],[3,2]])} et λ = 4, quel vecteur engendre <i>E</i><sub>4</sub>&nbsp;?`,
   opts:['(1 ; 1)','(3 ; 2)','(2 ; 3)','(1 ; −1)'],ans:2,
   why:`A − 4I = ${M([[-3,2],[3,-2]])} donne −3x + 2y = 0, vérifiée par (2 ; 3). Contrôle : A(2 ; 3) = (8 ; 12) = 4·(2 ; 3). Le vecteur (1 ; −1) est propre pour λ = −1.`},
  {h:'Le cas triangulaire',p:`Quelles sont les valeurs propres de ${M([[2,5],[0,-3]])}&nbsp;?`,
   opts:['2 et 5','−3 et 5','0 et 2','2 et −3'],ans:3,
   why:'det(A − λI) = (2 − λ)(−3 − λ). Pour une matrice triangulaire, les valeurs propres sont les coefficients diagonaux. Contrôle : somme −1 = trace, produit −6 = det.'},
  {kind:'Défi',h:'Vecteur propre normalisé',p:`Soit <i>A</i> = ${M([[0,1],[-6,5]])}. Ses valeurs propres sont 2 et 3. Pour λ = 3, on cherche un vecteur propre de la forme (1 ; <i>k</i>). Combien vaut <i>k</i>&nbsp;?`,lab:'k =',ans:3,
   why:'A(1 ; k) = (k ; −6 + 5k). On veut (3 ; 3k) : k = 3, et −6 + 15 = 9 = 3·3 confirme.'},
]},

/* ===================== 8. DIAGONALISATION ===================== */
{subj:'al',sem:'all',id:'cms-al-diag',h:'Diagonalisation et réduction',p:'A = PDP⁻¹, puissances de matrices, forme de Jordan et rotations-dilatations.',steps:[
  {h:'Diagonaliser',p:`<i>A</i> est <b>diagonalisable</b> s’il existe une base de vecteurs propres. Avec <i>P</i> = (<b>u</b> | <b>v</b>) ses colonnes et <i>D</i> = diag(λ₁, λ₂) :<br><b><i>A</i> = <i>PDP</i>⁻¹</b>.<br><b>Critère en dimension 2</b> : deux valeurs propres réelles distinctes ⇒ diagonalisable. Une valeur propre double λ : diagonalisable seulement si <i>A</i> = λ<i>I</i>. Valeurs propres non réelles : pas diagonalisable dans ℝ.`,
   note:'L’ordre compte : la 1re colonne de P doit être un vecteur propre pour λ₁, la 1re valeur de D.'},
  {h:'Suivre les puissances',p:`Si <b>x₀</b> = <b>u</b> + <b>v</b> avec <b>u</b>, <b>v</b> propres, alors <b><i>A</i>ⁿx₀ = λ₁ⁿ<b>u</b> + λ₂ⁿ<b>v</b></b>. Ici <b>u</b> = (2 ; 1) et <b>v</b> = (−1 ; 1). Fais varier les valeurs propres et le nombre de pas.`,
   params:[{id:'l1',l:'λ₁',min:.5,max:1.25,step:.25,v:1},{id:'l2',l:'λ₂',min:.5,max:1.25,step:.25,v:.5},{id:'n',l:'n',min:0,max:8,v:4}],
   draw:v=>{ const P=plane({x:[-6,8],y:[-4,7],lab:2}), pt=k=>[2*v.l1**k-v.l2**k, v.l1**k+v.l2**k]; ln(P,2,1,{c:'var(--math)',w:1.5,dash:1}); ln(P,-1,1,{c:'var(--spark)',w:1.5,dash:1});
     const pts=[]; for(let k=0;k<=v.n;k++) pts.push(pt(k)); P.poly(pts,{open:1,c:'var(--accent)',w:2});
     pts.forEach((p,k)=>{ if(p[0]>=-6&&p[0]<=8&&p[1]>=-4&&p[1]<=7) P.dot(p[0],p[1],{r:k===v.n?6:4,c:k===v.n?'var(--bad)':'var(--accent)'}); }); return P.svg(); },
   info:v=>{ const a=v.l1**v.n,b=v.l2**v.n; return `Aⁿx₀ = ${fmt(a,3)}·u + ${fmt(b,3)}·v = (${fmt(2*a-b)} ; ${fmt(a+b)})`; },
   note:'La plus grande valeur propre (en valeur absolue) l’emporte : la trajectoire se range le long de sa droite propre.'},
  {h:'Diagonalisable ou pas&nbsp;?',p:'Laquelle de ces matrices est diagonalisable dans ℝ&nbsp;?',
   opts:[mat([[2,1],[0,2]]),M([[0,-1],[1,0]]),mat([[1,4],[0,3]]),mat([[3,1],[0,3]])],ans:2,
   why:'(1 4 ; 0 3) a deux valeurs propres distinctes, 1 et 3. Les 1re et 4e ont une valeur propre double sans être λI. La 2e (rotation de 90°) a pour valeurs propres ±i.'},
  {h:'Puissances par diagonalisation',p:`Comme <i>A</i>ⁿ = <i>PD</i>ⁿ<i>P</i>⁻¹ et <i>D</i>ⁿ = diag(λ₁ⁿ, λ₂ⁿ), les puissances deviennent faciles. Pour <i>A</i> = ${mat([[2,1],[1,2]])}, <i>P</i> = ${M([[1,-1],[1,1]])}, <i>D</i> = diag(3, 1) :<br><b><i>A</i>ⁿ = ${F(1,2)} ${mat([['3ⁿ + 1','3ⁿ − 1'],['3ⁿ − 1','3ⁿ + 1']])}</b>.`,
   note:'Contrôle avec n = 1 : ½(4 2 ; 2 4) = A. Avec n = 0, on retrouve bien I.'},
  {h:'Une puissance quatrième',p:`Avec la formule précédente, quel est le coefficient en haut à gauche de ${mat([[2,1],[1,2]])}⁴&nbsp;?`,lab:'coefficient =',ans:41,
   why:'(3⁴ + 1)/2 = 82/2 = 41. Contrôle : A² = (5 4 ; 4 5), puis A⁴ = (25 + 16 …) = (41 40 ; 40 41).'},
  {h:'Le cas non diagonalisable',p:`Si λ est valeur propre double et <i>A</i> ≠ λ<i>I</i>, il n’y a qu’<b>une</b> droite propre. <i>A</i> est alors semblable à la <b>forme de Jordan</b> <b><i>J</i> = ${mat([['λ','1'],['0','λ']])}</b>, et <i>J</i>ⁿ = ${mat([['λⁿ','<i>n</i>λⁿ⁻¹'],['0','λⁿ']])}. Pour λ = 1, regarde <i>J</i>ⁿ cisailler le carré unité.`,
   params:[{id:'n',l:'n',min:0,max:5,v:1}],
   draw:v=>{ const P=plane({x:[-1,7],y:[-1,2.5],lab:1}); P.seg(-1,0,7,0,{c:'var(--ok)',w:5,op:.4}); grille(P,1,v.n,0,1,0); return P.svg(); },
   info:v=>`Jⁿ = ${mat([[1,v.n],[0,1]])} : seul l’axe des x (en vert) reste fixe, le terme n croît sans fin`,
   note:'La partie hors diagonale croît comme nλⁿ⁻¹ : c’est la signature du cas non diagonalisable.'},
  {h:'Puissance d’un bloc de Jordan',p:`Soit <i>J</i> = ${mat([[2,1],[0,2]])}. Quel est le coefficient en haut à droite de <i>J</i>³&nbsp;?`,lab:'coefficient =',ans:12,
   why:'nλⁿ⁻¹ = 3·2² = 12. Contrôle : J² = (4 4 ; 0 4) et J³ = (8 12 ; 0 8).'},
  {h:'Valeurs propres complexes',p:`Si Δ < 0, les valeurs propres sont <i>a</i> ± <i>ib</i>. Une telle matrice est semblable à ${mat([['<i>a</i>','−<i>b</i>'],['<i>b</i>','<i>a</i>']])} = <i>r</i>·<i>R</i><sub>θ</sub> : une <b>rotation</b> d’angle θ suivie d’une <b>dilatation</b> de rapport <i>r</i> = √(<i>a</i>² + <i>b</i>²). Les itérés d’un point tournent en spirale.`,
   params:[{id:'a',l:'a',min:-1,max:1,step:.25,v:.75},{id:'b',l:'b',min:-1,max:1,step:.25,v:.5}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}), pts=[]; let x=3,y=0; for(let k=0;k<=12;k++){ pts.push([x,y]); [x,y]=[v.a*x-v.b*y,v.b*x+v.a*y]; }
     P.circ(0,0,3,{c:'var(--muted)',w:1,dash:1}).poly(pts,{open:1,c:'var(--accent)',w:2}); pts.forEach((p,k)=>{ if(inR(p[0],p[1],5)) P.dot(p[0],p[1],{r:k?4:6,c:k?'var(--accent)':'var(--bad)'}); }); return P.svg(); },
   info:v=>{ const r=Math.hypot(v.a,v.b), th=Math.atan2(v.b,v.a)*180/Math.PI;
     return v.b===0?`b = 0 : A = ${fmt(v.a)}·I, valeur propre réelle double`:`λ = ${fmt(v.a)} ± ${fmt(Math.abs(v.b))}i · r = ${fmt(r,3)} · θ = ${fmt(th,1)}° · ${r>1?'spirale qui s’éloigne':r<1?'spirale qui se resserre':'cercle'}`; },
   note:'r > 1 : les itérés s’éloignent ; r < 1 : ils tendent vers 0 ; r = 1 : rotation pure.'},
  {kind:'Défi',h:'Une puissance qui tourne',p:`Soit <i>A</i> = ${M([[1,-1],[1,1]])}. Quel est le coefficient en haut à gauche de <i>A</i>⁸&nbsp;?`,lab:'coefficient =',ans:16,
   why:'A = √2·R₄₅°, donc A⁸ = (√2)⁸·R₃₆₀° = 16·I. Contrôle : A² = (0 −2 ; 2 0), A⁴ = −4I, A⁸ = 16I.'},
]},
);
})();
