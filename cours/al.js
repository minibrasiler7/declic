/* Déclic — Algèbre linéaire, dans le plan (dimension 2) */
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

COURS.push(
/* ===================== 1. ENSEMBLES ===================== */
{subj:'al',sem:'all',id:'al-ensembles',h:'Ensembles',p:'Appartenance, inclusion, opérations et lois de De Morgan, vues sur des diagrammes de Venn.',steps:[
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
  {kind:'Problème',h:'Trois langues dans une classe',
   p:'Une classe compte 40 élèves. 28 apprennent l’anglais (<i>A</i>), 15 l’allemand (<i>D</i>) et 10 l’italien (<i>I</i>). 8 élèves font anglais et allemand, 5 anglais et italien, 4 allemand et italien, et 2 font les trois langues. On veut savoir combien d’élèves n’apprennent aucune de ces langues, en découpant la classe en régions disjointes.',
   parts:[
    {q:'a) Combien d’élèves apprennent l’anglais <b>et</b> l’allemand, mais <b>pas</b> l’italien&nbsp;?',lab:'élèves :',ans:6,hint:'Dans A ∩ D, retire ceux qui sont aussi dans I, c’est-à-dire A ∩ D ∩ I.',why:'card(A ∩ D) − card(A ∩ D ∩ I) = 8 − 2 = 6.'},
    {q:'b) Combien d’élèves apprennent <b>seulement</b> l’anglais&nbsp;?',lab:'élèves :',ans:17,hint:'Pars de 28 et retire les élèves de A qui font aussi D ou I, sans retirer deux fois ceux qui font les trois.',why:'Anglais et allemand seulement : 6. Anglais et italien seulement : 5 − 2 = 3. Les trois : 2. Il reste 28 − 6 − 3 − 2 = 17.'},
    {q:'c) Combien d’élèves apprennent au moins une langue, c’est-à-dire card(<i>A</i> ∪ <i>D</i> ∪ <i>I</i>)&nbsp;?',lab:'card =',ans:38,hint:'Formule du crible : on ajoute les trois cardinaux, on retire les intersections deux à deux, puis on rajoute l’intersection des trois.',why:'28 + 15 + 10 − 8 − 5 − 4 + 2 = 38.'},
    {q:'d) Combien d’élèves n’apprennent aucune des trois langues&nbsp;?',lab:'élèves :',ans:2,hint:'C’est le cardinal de (A ∪ D ∪ I)ᶜ dans la classe.',why:'Par De Morgan, Aᶜ ∩ Dᶜ ∩ Iᶜ = (A ∪ D ∪ I)ᶜ, qui a 40 − 38 = 2 éléments.'},
   ],
   sol:'On découpe la classe en 8 régions disjointes.<br>Les trois langues : 2. Exactement deux langues : A ∩ D seul 8 − 2 = 6, A ∩ I seul 5 − 2 = 3, D ∩ I seul 4 − 2 = 2.<br>Une seule langue : anglais 28 − 6 − 3 − 2 = 17, allemand 15 − 6 − 2 − 2 = 5, italien 10 − 3 − 2 − 2 = 3.<br>Total : 17 + 5 + 3 + 6 + 3 + 2 + 2 = 38, ce que confirme le crible 28 + 15 + 10 − 8 − 5 − 4 + 2 = 38.<br>Les élèves sans langue forment (A ∪ D ∪ I)ᶜ = Aᶜ ∩ Dᶜ ∩ Iᶜ : il y en a <b>40 − 38 = 2</b>.'},
  {kind:'Problème',h:'La différence symétrique',
   p:'On note <i>A</i> Δ <i>B</i> = (<i>A</i> \\ <i>B</i>) ∪ (<i>B</i> \\ <i>A</i>) la <b>différence symétrique</b> : les éléments qui sont dans <b>exactement un</b> des deux ensembles. On veut démontrer que <i>A</i> Δ <i>B</i> = (<i>A</i> ∪ <i>B</i>) \\ (<i>A</i> ∩ <i>B</i>), puis s’en servir pour compter. La figure montre <i>A</i> Δ <i>B</i>.',
   fig:venn({a:1,b:1}),
   parts:[
    {q:'a) Pour démontrer une égalité d’ensembles <i>X</i> = <i>Y</i>, quelle méthode est correcte&nbsp;?',opts:['Trouver un élément commun à X et Y','Montrer X ⊂ Y, puis Y ⊂ X','Montrer que X et Y ont le même nombre d’éléments','Vérifier l’égalité sur un exemple'],ans:1,
     hint:'Deux ensembles sont égaux quand chacun est inclus dans l’autre.',why:'C’est la <b>double inclusion</b>. Le même cardinal ne suffit pas : {1} et {2} en ont chacun un. Un exemple ne prouve rien en général.'},
    {q:'b) Soit <i>x</i> ∈ <i>A</i> \\ <i>B</i>. Pourquoi <i>x</i> ∈ (<i>A</i> ∪ <i>B</i>) \\ (<i>A</i> ∩ <i>B</i>)&nbsp;?',opts:['Car x ∈ A ∩ B','Car x ∉ A, donc x ∉ A ∩ B','Car x ∈ B, donc x ∈ A ∪ B','Car x ∈ A donne x ∈ A ∪ B, et x ∉ B donne x ∉ A ∩ B'],ans:3,
     hint:'Écris ce que signifie x ∈ A \\ B : deux informations.',why:'x ∈ A \\ B signifie x ∈ A et x ∉ B. La première donne x ∈ A ∪ B, la seconde x ∉ A ∩ B. Le cas x ∈ B \\ A est symétrique : A Δ B ⊂ (A ∪ B) \\ (A ∩ B).'},
    {q:'c) Réciproquement, soit <i>x</i> ∈ (<i>A</i> ∪ <i>B</i>) \\ (<i>A</i> ∩ <i>B</i>) avec <i>x</i> ∈ <i>A</i>. Que peut-on conclure&nbsp;?',opts:['x ∈ B, donc x ∈ B \\ A','x ∉ B, sinon x serait dans A ∩ B : donc x ∈ A \\ B','On ne peut rien conclure sur B','x ∈ A ∩ B'],ans:1,
     hint:'Que se passerait-il si x était aussi dans B ?',why:'Si x ∈ B, alors x ∈ A ∩ B, ce qui est exclu. Donc x ∈ A \\ B ⊂ A Δ B. Si x ∈ B, même raisonnement : x ∈ B \\ A. D’où l’autre inclusion.'},
    {q:'d) Dans <i>E</i> = {1, …, 12}, <i>A</i> est l’ensemble des nombres pairs et <i>B</i> celui des multiples de 3. Combien d’éléments a <i>A</i> Δ <i>B</i>&nbsp;?',lab:'card =',ans:6,
     hint:'Avec l’égalité démontrée : card(A Δ B) = card(A ∪ B) − card(A ∩ B).',why:'A a 6 éléments, B en a 4, A ∩ B = {6 ; 12}. card(A ∪ B) = 6 + 4 − 2 = 8, donc card(A Δ B) = 8 − 2 = 6 : {2 ; 3 ; 4 ; 8 ; 9 ; 10}.'},
   ],
   sol:'On procède par double inclusion.<br>⊂ : si x ∈ A \\ B, alors x ∈ A ⊂ A ∪ B et x ∉ B, donc x ∉ A ∩ B. Même chose si x ∈ B \\ A.<br>⊃ : si x ∈ A ∪ B et x ∉ A ∩ B, alors x est dans A ou dans B, mais pas dans les deux. S’il est dans A, il n’est pas dans B : x ∈ A \\ B. Sinon x ∈ B \\ A.<br>Donc <b>A Δ B = (A ∪ B) \\ (A ∩ B)</b>, et card(A Δ B) = card(A) + card(B) − 2 card(A ∩ B).<br>Exemple : 6 + 4 − 2·2 = <b>6</b>.'},
]},

/* ===================== 2. LOGIQUE ===================== */
{subj:'al',sem:'all',id:'al-logique',h:'Logique',p:'Connecteurs, tables de vérité, quantificateurs et l’art de nier une phrase.',steps:[
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
  {kind:'Problème',h:'Prouver qu’une fonction saute',
   p:'On dit que <i>f</i> est <b>continue en <i>a</i></b> si ∀ε > 0, ∃δ > 0, ∀<i>x</i> ∈ ℝ, |<i>x</i> − <i>a</i>| < δ ⇒ |<i>f</i>(<i>x</i>) − <i>f</i>(<i>a</i>)| < ε. On étudie la fonction marche <i>H</i>, qui vaut 0 si <i>x</i> < 0 et 1 si <i>x</i> ≥ 0. Son graphe saute en 0 : on veut le prouver avec la définition, en écrivant d’abord sa négation.',
   fig:(()=>{ const P=plane({x:[-3,3],y:[-1,2],lab:1}); P.seg(-3,0,-0.1,0,{w:4}).seg(0,1,3,1,{w:4}).circ(0,0,.1,{c:'var(--accent)',w:2}).dot(0,1,{r:5,c:'var(--accent)'}); P.text(2.9,1.3,'H',{a:'end'}); return P.svg(); })(),
   parts:[
    {q:'a) Quelle est la négation de « <i>f</i> est continue en <i>a</i> »&nbsp;?',opts:['∀ε > 0, ∃δ > 0, ∀x ∈ ℝ, |x − a| < δ ⇒ |f(x) − f(a)| ≥ ε','∃ε > 0, ∀δ > 0, ∃x ∈ ℝ, |x − a| ≥ δ et |f(x) − f(a)| ≥ ε','∃ε > 0, ∀δ > 0, ∃x ∈ ℝ, |x − a| < δ et |f(x) − f(a)| ≥ ε','∃ε ≤ 0, ∀δ ≤ 0, ∃x ∈ ℝ, |x − a| < δ ⇒ |f(x) − f(a)| ≥ ε'],ans:2,
     hint:'Échange ∀ et ∃ en gardant les domaines, puis utilise non(P ⇒ Q) ⇔ P et (non Q).',why:'Les quantificateurs s’échangent (ε > 0 et δ > 0 restent tels quels), et la négation de « |x − a| < δ ⇒ |f(x) − f(a)| < ε » est « |x − a| < δ et |f(x) − f(a)| ≥ ε ».'},
    {q:'b) On prend <i>a</i> = 0 et ε = ½. Pour un δ > 0 quelconque, quel <i>x</i> sert de témoin&nbsp;?',opts:['x = δ','x = −δ/2','x = 0','x = −2δ'],ans:1,
     hint:'Il faut un x à distance moins de δ de 0, mais où H ne vaut pas H(0) = 1.',why:'x = −δ/2 vérifie |x| = δ/2 < δ et x < 0, donc |H(x) − H(0)| = 1 ≥ ½. x = δ donne H(δ) = 1, sans écart ; x = −2δ est trop loin de 0.'},
    {q:'c) Quel est le <b>plus grand</b> ε pour lequel ce raisonnement fonctionne&nbsp;?',lab:'ε =',ans:1,
     hint:'Le témoin donne toujours un écart |H(x) − H(0)| égal à 1.',why:'Il faut 1 ≥ ε. Tout ε ∈ ]0 ; 1] convient, le plus grand est ε = 1. Pour ε > 1, l’écart 1 est < ε et la négation échoue.'},
    {q:'d) En <i>a</i> = 1, <i>H</i> est continue : un même δ convient pour tout ε. Quel est le plus grand δ possible&nbsp;?',lab:'δ =',ans:1,
     hint:'Il faut que |x − 1| < δ garantisse x ≥ 0, pour avoir H(x) = H(1).',why:'|x − 1| < δ donne x > 1 − δ. Si δ ≤ 1, alors x > 0 et |H(x) − H(1)| = 0 < ε. Si δ > 1, l’intervalle contient des x < 0 où l’écart vaut 1.'},
   ],
   sol:'La négation de la continuité en a s’écrit : ∃ε > 0, ∀δ > 0, ∃x, |x − a| < δ et |f(x) − f(a)| ≥ ε.<br>Pour H en 0, on prend ε = ½. Soit δ > 0 quelconque. Le réel x = −δ/2 vérifie |x − 0| < δ et H(x) = 0, donc |H(x) − H(0)| = 1 ≥ ½.<br>La négation est vraie : <b>H n’est pas continue en 0</b>. Le raisonnement marche pour tout ε ≤ 1.<br>En revanche, en a = 1, le choix δ = 1 donne |H(x) − H(1)| = 0 < ε pour tout ε : H est continue en 1.'},
  {kind:'Problème',h:'Converger, ou pas',
   p:'Une suite (<i>u</i>ₙ) <b>converge vers ℓ</b> si ∀ε > 0, ∃<i>N</i> ∈ ℕ*, ∀<i>n</i> ≥ <i>N</i>, |<i>u</i>ₙ − ℓ| < ε. On veut montrer que <i>u</i>ₙ = 1/<i>n</i> converge vers 0, puis que <i>v</i>ₙ = (−1)ⁿ ne converge vers <b>aucun</b> réel ℓ. Les deux preuves demandent de manier les quantificateurs dans le bon ordre.',
   parts:[
    {q:'a) Pour ε = 0,01, quel est le plus petit entier <i>N</i> tel que 1/<i>n</i> < ε pour tout <i>n</i> ≥ <i>N</i>&nbsp;?',lab:'N =',ans:101,
     hint:'1/n < 0,01 ⇔ n > 100. Attention à l’inégalité stricte.',why:'1/100 = 0,01 n’est pas strictement inférieur à 0,01. Le premier entier qui marche est 101, et tous les suivants aussi car 1/n décroît.'},
    {q:'b) Pour un ε > 0 quelconque, quel <i>N</i> convient&nbsp;?',opts:['N = ε','N = 1/ε','N = 100','N = un entier strictement plus grand que 1/ε'],ans:3,
     hint:'N doit être un entier, et dépendre de ε.',why:'Si N > 1/ε et n ≥ N, alors 1/n ≤ 1/N < ε. N = 1/ε n’est pas toujours entier, et N = 100 ne marche que pour ε > 0,01.'},
    {q:'c) Quelle est la négation de « (<i>v</i>ₙ) converge vers ℓ »&nbsp;?',opts:['∃ε > 0, ∀N ∈ ℕ*, ∃n ≥ N, |vₙ − ℓ| ≥ ε','∀ε > 0, ∀N ∈ ℕ*, ∃n ≥ N, |vₙ − ℓ| ≥ ε','∃ε > 0, ∃N ∈ ℕ*, ∀n ≥ N, |vₙ − ℓ| ≥ ε','∃ε > 0, ∀N ∈ ℕ*, ∀n ≥ N, |vₙ − ℓ| ≥ ε'],ans:0,
     hint:'Trois quantificateurs à échanger, dans l’ordre, puis la propriété finale à nier.',why:'∀ε devient ∃ε, ∃N devient ∀N, ∀n ≥ N devient ∃n ≥ N, et |vₙ − ℓ| < ε devient |vₙ − ℓ| ≥ ε. Il suffit donc d’un écart qui revient au-delà de tout rang.'},
    {q:'d) Pour tout réel ℓ, l’inégalité triangulaire donne |1 − ℓ| + |1 + ℓ| ≥ <i>k</i>. Quelle est la meilleure constante <i>k</i>&nbsp;?',lab:'k =',ans:2,
     hint:'|1 − ℓ| + |1 + ℓ| ≥ |(1 − ℓ) + (1 + ℓ)|.',why:'La somme vaut au moins |2| = 2, avec égalité pour ℓ ∈ [−1 ; 1]. Donc l’un des deux écarts |1 − ℓ| ou |−1 − ℓ| est au moins 1.'},
    {q:'e) Comment conclure que (<i>v</i>ₙ) ne converge vers aucun ℓ&nbsp;?',opts:['On calcule v₁₀₀ = 1, donc la suite tend vers 1','On prend ε = 3 : les deux écarts sont toujours au moins 3','On prend N = 1 et n = 2, et on vérifie l’écart','On prend ε = 1 : l’une des valeurs 1 ou −1 est à distance au moins 1 de ℓ, et elle revient pour des n aussi grands qu’on veut'],ans:3,
     hint:'Utilise d) et le fait que vₙ vaut 1 pour n pair et −1 pour n impair.',why:'Avec ε = 1 : si |1 − ℓ| ≥ 1, pour tout N on prend n ≥ N pair ; sinon |−1 − ℓ| ≥ 1 et on prend n ≥ N impair. La négation de la convergence est vérifiée.'},
   ],
   sol:'<b>1/n → 0.</b> Soit ε > 0. On choisit un entier N > 1/ε. Pour n ≥ N : |1/n − 0| = 1/n ≤ 1/N < ε. Pour ε = 0,01, le plus petit N est 101.<br><b>(−1)ⁿ ne converge pas.</b> Il faut montrer, pour tout ℓ : ∃ε > 0, ∀N, ∃n ≥ N, |vₙ − ℓ| ≥ ε.<br>Soit ℓ ∈ ℝ. Comme |1 − ℓ| + |1 + ℓ| ≥ 2, l’un des deux termes est ≥ 1. On prend ε = 1.<br>Si |1 − ℓ| ≥ 1 : pour tout N, n = 2N ≥ N est pair et |vₙ − ℓ| = |1 − ℓ| ≥ 1.<br>Sinon |1 + ℓ| ≥ 1 : n = 2N + 1 est impair et |vₙ − ℓ| = |−1 − ℓ| ≥ 1.<br>Aucun ℓ ne convient : la suite <b>diverge</b>.'},
]},

/* ===================== 3. APPLICATIONS ===================== */
{subj:'al',sem:'all',id:'al-applications',h:'Applications',p:'Image, antécédents, injections, surjections, bijections et composition.',steps:[
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
  {kind:'Problème',h:'Une fonction homographique',
   p:`On considère <i>f</i>(<i>x</i>) = ${F('2<i>x</i> + 1','<i>x</i> − 3')}, définie sur <i>E</i> = ℝ \\ {3}. On cherche l’ensemble d’arrivée <i>F</i> qui rend <i>f</i> bijective, puis sa réciproque. La méthode : résoudre <i>f</i>(<i>x</i>) = <i>y</i> en fonction de <i>y</i>. Le graphe a deux asymptotes, en pointillé.`,
   fig:(()=>{ const P=plane({x:[-4,10],y:[-6,10],w:320,lab:2}), f=x=>(2*x+1)/(x-3); P.seg(3,-6,3,10,{c:'var(--muted)',w:1.5,dash:1}).seg(-4,2,10,2,{c:'var(--muted)',w:1.5,dash:1}).fn(f,{to:2.85}).fn(f,{from:3.15}); P.text(9.8,2,'y = 2',{a:'end',dy:-6,s:12,c:'var(--muted)'}).text(3,9.5,'x = 3',{dx:6,s:12,c:'var(--muted)'}); return P.svg(); })(),
   parts:[
    {q:'a) Calcule <i>f</i>(4).',lab:'f(4) =',ans:9,hint:'Remplace x par 4 en haut et en bas.',why:'f(4) = (8 + 1)/(4 − 3) = 9.'},
    {q:'b) Résous <i>f</i>(<i>x</i>) = 5. Tu peux répondre par une fraction.',lab:'x =',ans:16/3,tol:.01,hint:'Multiplie par x − 3 : 2x + 1 = 5(x − 3).',why:'2x + 1 = 5x − 15 donne 3x = 16, soit x = 16/3. Contrôle : f(16/3) = (35/3)/(7/3) = 5.'},
    {q:'c) Pourquoi la valeur 2 n’a-t-elle <b>aucun</b> antécédent&nbsp;?',opts:['Car f(2) n’existe pas','Car 2 est une valeur interdite de E','Car f(x) = 2 donne 2x + 1 = 2x − 6, soit 1 = −6 : impossible','Car f est décroissante'],ans:2,
     hint:'Écris l’équation f(x) = 2 et simplifie.',why:'2x + 1 = 2(x − 3) donne 1 = −6, ce qui est faux. f n’est donc pas surjective sur ℝ ; il faut prendre F = ℝ \\ {2}. f(2) = −5 existe bien, mais ce n’est pas la question.'},
    {q:'d) Pour <i>y</i> ≠ 2, résous <i>f</i>(<i>x</i>) = <i>y</i>, puis calcule <i>f</i>⁻¹(−1).',lab:'f⁻¹(−1) =',ans:2/3,tol:.01,
     hint:'2x + 1 = xy − 3y. Regroupe les termes en x d’un côté.',why:'x(y − 2) = 3y + 1, donc f⁻¹(y) = (3y + 1)/(y − 2) et f⁻¹(−1) = (−2)/(−3) = 2/3. Contrôle : f(2/3) = (7/3)/(−7/3) = −1.'},
   ],
   sol:'Soit y ∈ ℝ. On cherche x ≠ 3 tel que (2x + 1)/(x − 3) = y, soit 2x + 1 = xy − 3y, soit x(y − 2) = 3y + 1.<br>Si y = 2 : on obtient 0 = 7, aucune solution. La valeur 2 n’est jamais atteinte.<br>Si y ≠ 2 : il y a une unique solution x = (3y + 1)/(y − 2), et elle est bien ≠ 3 (sinon 3y − 6 = 3y + 1).<br>Donc <b>f : ℝ \\ {3} → ℝ \\ {2} est bijective</b>, de réciproque f⁻¹(y) = (3y + 1)/(y − 2).<br>Applications : f(4) = 9, f⁻¹(5) = 16/3, f⁻¹(−1) = 2/3.'},
  {kind:'Problème',h:'Doubler puis diviser par deux',
   p:'Sur ℕ, on pose <i>f</i>(<i>n</i>) = 2<i>n</i> et <i>g</i>(<i>n</i>) = ⌊<i>n</i>/2⌋, la partie entière de <i>n</i>/2 (par exemple <i>g</i>(7) = 3). On compare les composées <i>g</i> ∘ <i>f</i> et <i>f</i> ∘ <i>g</i>, puis on en tire un théorème général : quand une composée est injective, laquelle des deux applications l’est forcément&nbsp;?',
   parts:[
    {q:'a) Calcule (<i>g</i> ∘ <i>f</i>)(7).',lab:'(g ∘ f)(7) =',ans:7,hint:'On applique f d’abord, puis g.',why:'f(7) = 14 et g(14) = 7. Plus généralement g(f(n)) = ⌊2n/2⌋ = n : g ∘ f = id.'},
    {q:'b) Calcule (<i>f</i> ∘ <i>g</i>)(7).',lab:'(f ∘ g)(7) =',ans:6,hint:'Cette fois, g d’abord.',why:'g(7) = 3 et f(3) = 6 ≠ 7 : f ∘ g n’est pas l’identité. Elle arrondit au nombre pair inférieur.'},
    {q:'c) Quelles sont les propriétés de <i>f</i> et de <i>g</i>&nbsp;?',opts:['f et g sont bijectives','f est surjective, g est injective','f et g sont injectives','f est injective non surjective, g est surjective non injective'],ans:3,
     hint:'Cherche un entier sans antécédent par f, et deux entiers de même image par g.',why:'2n = 2m ⇒ n = m, mais 1 n’est pas pair : f injective, pas surjective. g(2k) = k : g surjective, mais g(4) = g(5) = 2.'},
    {q:'d) Combien d’antécédents le nombre 3 a-t-il par <i>g</i>&nbsp;?',lab:'antécédents :',ans:2,hint:'Quels entiers n vérifient ⌊n/2⌋ = 3 ?',why:'⌊n/2⌋ = 3 ⇔ 3 ≤ n/2 < 4 ⇔ n ∈ {6 ; 7}.'},
    {q:'e) En général, si <i>g</i> ∘ <i>f</i> est injective, que peut-on affirmer à coup sûr&nbsp;?',opts:['g est injective','f est injective','f et g sont bijectives','g est surjective'],ans:1,
     hint:'Suppose f(x) = f(x′) et applique g des deux côtés.',why:'Si f(x) = f(x′), alors g(f(x)) = g(f(x′)), donc x = x′ par injectivité de g ∘ f. L’exemple montre que g, elle, peut ne pas être injective.'},
   ],
   sol:'g ∘ f = id<sub>ℕ</sub> car ⌊2n/2⌋ = n, mais (f ∘ g)(7) = 6 : f ∘ g ≠ id.<br>f est injective (2n = 2m ⇒ n = m) mais pas surjective (1 est impair). g est surjective (g(2k) = k) mais pas injective (g(6) = g(7) = 3).<br><b>Théorème.</b> Si g ∘ f est injective, f est injective : f(x) = f(x′) ⇒ g(f(x)) = g(f(x′)) ⇒ x = x′.<br>De même, si g ∘ f est surjective, g est surjective : tout z s’écrit g(f(x)), donc z = g(y) avec y = f(x).<br>Ici g ∘ f = id est bijective, ce qui force f injective et g surjective, et rien de plus.'},
]},

/* ===================== 4. MATRICES ===================== */
{subj:'al',sem:'all',id:'al-matrices',h:'Matrices 2×2',p:'Somme, produit, transposée, déterminant, inverse et systèmes linéaires.',steps:[
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
  {kind:'Problème',h:'Ville et campagne',
   p:`Une région compte 1 000 milliers d’habitants, répartis entre la ville et la campagne. Chaque année, 10 % des citadins partent à la campagne et 20 % des ruraux partent en ville. Avec <i>X</i>ₙ = (<i>v</i>ₙ ; <i>c</i>ₙ) en milliers, on a <i>X</i>ₙ₊₁ = <i>MX</i>ₙ, où <i>M</i> = ${mat([['0,9','0,2'],['0,1','0,8']])}. Au départ, <i>X</i>₀ = (300 ; 700). Fais défiler les années : la ville en bleu, la campagne en jaune.`,
   params:[{id:'n',l:'année n',min:0,max:15,v:0}],
   draw:v=>{ const P=plane({x:[-1,16],y:[-60,1100],h:220,grid:false,lx:5,ly:200}); let x=[300,700]; const pts=[x];
     for(let k=1;k<=15;k++){ x=[.9*x[0]+.2*x[1],.1*x[0]+.8*x[1]]; pts.push(x); }
     P.seg(-1,2000/3,16,2000/3,{c:'var(--muted)',w:1.5,dash:1});
     pts.forEach((p,k)=>{ const on=k<=v.n; P.dot(k,p[0],{r:on?5:3,c:on?'var(--math)':'var(--line)'}).dot(k,p[1],{r:on?5:3,c:on?'var(--spark)':'var(--line)'}); }); return P.svg(); },
   info:v=>{ let x=[300,700]; for(let k=1;k<=v.n;k++) x=[.9*x[0]+.2*x[1],.1*x[0]+.8*x[1]]; return `Année ${v.n} : v = ${fmt(x[0],1)}, c = ${fmt(x[1],1)}, total ${fmt(x[0]+x[1],1)}`; },
   parts:[
    {q:'a) Combien vaut <i>v</i>₁ (en milliers)&nbsp;?',lab:'v₁ =',ans:410,hint:'Première ligne de M fois X₀.',why:'v₁ = 0,9·300 + 0,2·700 = 270 + 140 = 410.'},
    {q:'b) Combien vaut <i>v</i>₂&nbsp;?',lab:'v₂ =',ans:487,hint:'Calcule d’abord c₁ = 0,1·300 + 0,8·700.',why:'c₁ = 590, puis v₂ = 0,9·410 + 0,2·590 = 369 + 118 = 487.'},
    {q:'c) Pourquoi le total <i>v</i>ₙ + <i>c</i>ₙ reste-t-il égal à 1 000&nbsp;?',opts:['Car det M = 0,7','Car M est inversible','Car chaque colonne de M a pour somme 1 : chaque habitant reste quelque part','Car M est symétrique'],ans:2,
     hint:'Additionne les deux lignes de Xₙ₊₁ = MXₙ.',why:'vₙ₊₁ + cₙ₊₁ = (0,9 + 0,1)vₙ + (0,2 + 0,8)cₙ = vₙ + cₙ. Les colonnes de M somment à 1. M n’est d’ailleurs pas symétrique.'},
    {q:'d) À l’équilibre, <i>MX</i> = <i>X</i> et <i>v</i> + <i>c</i> = 1 000. Combien vaut <i>v</i>&nbsp;? Arrondis à l’unité.',lab:'v ≈',ans:667,tol:.6,
     hint:'(M − I)X = 0 donne −0,1v + 0,2c = 0.',why:'v = 2c et v + c = 1 000, donc c = 1 000/3 et v = 2 000/3 ≈ 667. det(M − I) = 0,02 − 0,02 = 0 : le système seul a une infinité de solutions, le total fixe la bonne.'},
   ],
   sol:'On itère X₁ = MX₀ = (410 ; 590), puis X₂ = (487 ; 513).<br>La somme des coefficients de chaque colonne vaut 1, donc vₙ₊₁ + cₙ₊₁ = vₙ + cₙ = 1 000 pour tout n.<br>L’équilibre vérifie (M − I)X = 0 : −0,1v + 0,2c = 0 et 0,1v − 0,2c = 0, deux équations proportionnelles (det(M − I) = 0).<br>Avec v + c = 1 000 : v = 2c, d’où c = 1 000/3 ≈ 333 et <b>v = 2 000/3 ≈ 667</b> milliers.<br>La figure montre que la suite s’en approche année après année.'},
  {kind:'Problème',h:'Fibonacci par les matrices',
   p:`La suite de Fibonacci vérifie <i>F</i>₀ = 0, <i>F</i>₁ = 1 et <i>F</i>ₙ₊₁ = <i>F</i>ₙ + <i>F</i>ₙ₋₁ : 0, 1, 1, 2, 3, 5, 8, 13, … Avec <i>Q</i> = ${mat([[1,1],[1,0]])}, on a ${mat([['<i>F</i>ₙ₊₁'],['<i>F</i>ₙ']])} = <i>Q</i> ${mat([['<i>F</i>ₙ'],['<i>F</i>ₙ₋₁']])}. On veut montrer que <i>Q</i>ⁿ = ${mat([['<i>F</i>ₙ₊₁','<i>F</i>ₙ'],['<i>F</i>ₙ','<i>F</i>ₙ₋₁']])} pour <i>n</i> ≥ 1, puis en tirer une identité grâce au déterminant.`,
   parts:[
    {q:'a) Quel est le coefficient en haut à gauche de <i>Q</i>⁵&nbsp;?',lab:'coefficient =',ans:8,hint:'Q² = (2 1 ; 1 1). Continue, ou lis la formule : en haut à gauche de Qⁿ se trouve Fₙ₊₁.',why:'Q⁵ = (8 5 ; 5 3) : on lit F₆ = 8, F₅ = 5 et F₄ = 3.'},
    {q:'b) Comment prouver la formule de <i>Q</i>ⁿ pour tout <i>n</i> ≥ 1&nbsp;?',opts:['En la vérifiant pour n = 1, 2 et 3',`Par récurrence : Qⁿ⁺¹ = QⁿQ = ${mat([['<i>F</i>ₙ₊₁ + <i>F</i>ₙ','<i>F</i>ₙ₊₁'],['<i>F</i>ₙ + <i>F</i>ₙ₋₁','<i>F</i>ₙ']])}, qui est la formule au rang n + 1`,'Car Q est symétrique','En calculant det Qⁿ'],ans:1,
     hint:'Suppose la formule vraie au rang n et multiplie à droite par Q.',why:'Pour n = 1, Q = (F₂ F₁ ; F₁ F₀). Si c’est vrai au rang n, QⁿQ a pour coefficients Fₙ₊₁ + Fₙ = Fₙ₊₂, Fₙ₊₁, Fₙ + Fₙ₋₁ = Fₙ₊₁ et Fₙ. Quelques exemples ne prouvent rien.'},
    {q:'c) Combien vaut det <i>Q</i>&nbsp;?',lab:'det Q =',ans:-1,hint:'ad − bc.',why:'det Q = 1·0 − 1·1 = −1, donc det(Qⁿ) = (det Q)ⁿ = (−1)ⁿ.'},
    {q:'d) Sans calculer de grands produits, que vaut <i>F</i>₁₁<i>F</i>₉ − <i>F</i>₁₀²&nbsp;?',lab:'valeur =',ans:1,hint:'C’est le déterminant d’une puissance de Q.',why:'C’est det(Q¹⁰) = (−1)¹⁰ = 1. Vérification : 89·34 − 55² = 3 026 − 3 025 = 1.'},
    {q:'e) Quel est le coefficient en bas à droite de <i>Q</i>⁻¹&nbsp;?',lab:'coefficient =',ans:-1,hint:'Applique la formule de l’inverse avec det Q = −1.',why:'Q⁻¹ = (1/(−1))(0 −1 ; −1 1) = (0 1 ; 1 −1). Elle fait remonter la suite : (Fₙ ; Fₙ₋₁) = Q⁻¹(Fₙ₊₁ ; Fₙ).'},
   ],
   sol:'<b>Récurrence.</b> Pour n = 1, Q = (F₂ F₁ ; F₁ F₀) = (1 1 ; 1 0). Si Qⁿ = (Fₙ₊₁ Fₙ ; Fₙ Fₙ₋₁), alors Qⁿ⁺¹ = QⁿQ = (Fₙ₊₁ + Fₙ  Fₙ₊₁ ; Fₙ + Fₙ₋₁  Fₙ) = (Fₙ₊₂ Fₙ₊₁ ; Fₙ₊₁ Fₙ).<br>Par exemple Q⁵ = (8 5 ; 5 3).<br><b>Identité de Cassini.</b> det(Qⁿ) = (det Q)ⁿ = (−1)ⁿ, et det(Qⁿ) = Fₙ₊₁Fₙ₋₁ − Fₙ². Donc Fₙ₊₁Fₙ₋₁ − Fₙ² = (−1)ⁿ.<br>Pour n = 10 : 89·34 − 55² = <b>1</b>.<br>Enfin Q⁻¹ = (0 1 ; 1 −1) permet de reculer dans la suite.'},
]},

/* ===================== 5. SOUS-ESPACES ET BASES ===================== */
{subj:'al',sem:'all',id:'al-bases',h:'Sous-espaces et bases de ℝ²',p:'Combinaisons linéaires, indépendance, droites vectorielles et coordonnées dans une base.',steps:[
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
  {kind:'Problème',h:'Mélanger deux alliages',
   p:'Une fonderie dispose de deux alliages. Un lingot de l’alliage <b>u</b> contient 2 kg de cuivre et 1 kg de zinc, un lingot de <b>v</b> contient 1 kg de cuivre et 3 kg de zinc. On décrit un mélange par le vecteur (cuivre ; zinc) : α lingots de <b>u</b> et β lingots de <b>v</b> donnent α<b>u</b> + β<b>v</b>. On veut obtenir exactement 7 kg de cuivre et 11 kg de zinc.',
   fig:(()=>{ const P=plane({x:[-1,12],y:[-1,12],lab:2}); P.arrow(0,0,2,1,{c:'var(--math)'}).arrow(2,1,4,2,{c:'var(--math)',op:.5}).arrow(4,2,5,5,{c:'var(--spark)',op:.5}).arrow(5,5,6,8,{c:'var(--spark)',op:.5}).arrow(6,8,7,11,{c:'var(--spark)',op:.5}).arrow(0,0,1,3,{c:'var(--spark)'}).dot(7,11,{c:'var(--bad)',l:'(7 ; 11)',dx:-62}); P.text(2,1,'u',{dx:4,dy:16}).text(1,3,'v',{dx:-16}); return P.svg(); })(),
   parts:[
    {q:'a) Calcule det(<b>u</b>, <b>v</b>).',lab:'det =',ans:5,hint:'u = (2 ; 1) et v = (1 ; 3) sont les colonnes.',why:'2·3 − 1·1 = 5 ≠ 0 : (u, v) est une base de ℝ². Toute cible a des coordonnées uniques dans cette base.'},
    {q:'b) Combien de lingots de <b>u</b> faut-il (α)&nbsp;?',lab:'α =',ans:2,hint:'Résous 2α + β = 7 et α + 3β = 11.',why:'β = 7 − 2α, puis α + 21 − 6α = 11, donc α = 2.'},
    {q:'c) Et combien de lingots de <b>v</b> (β)&nbsp;?',lab:'β =',ans:3,hint:'Reporte α dans la première équation.',why:'β = 7 − 4 = 3. Contrôle : 2(2 ; 1) + 3(1 ; 3) = (7 ; 11).'},
    {q:'d) Un client veut 8 kg de cuivre et 1 kg de zinc. Que se passe-t-il&nbsp;?',opts:['C’est possible avec α = 4 et β = 0','Aucune coordonnée n’existe, car la famille est liée','Les coordonnées existent, mais β = −1,2 < 0 : impossible avec de vrais lingots','C’est possible avec α = 3 et β = 2'],ans:2,
     hint:'Calcule les coordonnées de (8 ; 1) dans la base (u, v), puis regarde leur signe.',why:'2α + β = 8 et α + 3β = 1 donnent α = 4,6 et β = −1,2. Les coordonnées existent toujours (c’est une base), mais un nombre négatif de lingots n’a pas de sens.'},
   ],
   sol:'det(u, v) = 2·3 − 1·1 = 5 ≠ 0, donc (u, v) est une base : chaque vecteur (cuivre ; zinc) s’écrit de façon unique αu + βv.<br>Pour (7 ; 11) : 2α + β = 7 et α + 3β = 11. On tire β = 7 − 2α, puis −5α = −10 : <b>α = 2</b> et <b>β = 3</b>.<br>Pour (8 ; 1) : on trouve α = 23/5 = 4,6 et β = −6/5 = −1,2.<br>Les mélanges réalisables sont les vecteurs à coordonnées positives : le secteur compris entre les directions de u et de v. (8 ; 1) est en dehors.'},
  {kind:'Problème',h:'Une famille qui dépend d’un paramètre',
   p:'Pour un réel <i>k</i>, on pose <b>u</b> = (1 ; <i>k</i>) en bleu et <b>v</b> = (<i>k</i> ; <i>k</i> + 2) en jaune. On cherche pour quelles valeurs (<b>u</b>, <b>v</b>) est une base de ℝ², ce que devient Vect(<b>u</b>, <b>v</b>) sinon, puis on calcule des coordonnées et on teste des sous-espaces. Fais varier <i>k</i> : la droite verte apparaît quand la famille est liée.',
   params:[{id:'k',l:'k',min:-2,max:3,step:.5,v:0}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}), D=v.k+2-v.k*v.k; if(D===0) ln(P,1,v.k,{c:'var(--ok)',w:6,op:.4});
     P.arrow(0,0,1,v.k,{c:'var(--math)'}); if(v.k||v.k+2) P.arrow(0,0,v.k,v.k+2,{c:'var(--spark)'}); return P.svg(); },
   info:v=>{ const D=v.k+2-v.k*v.k; return `det(u, v) = (k + 2) − k² = <b>${fmt(D)}</b> : ${D?'base de ℝ²':'famille liée'}`; },
   parts:[
    {q:'a) Pour quelles valeurs de <i>k</i> la famille est-elle liée&nbsp;? Donne la plus grande.',lab:'k =',ans:2,hint:'Calcule det(u, v) et factorise.',why:'det = 1·(k + 2) − k·k = −(k² − k − 2) = −(k − 2)(k + 1). Liée pour k = 2 ou k = −1.'},
    {q:'b) Pour <i>k</i> = −1, que vaut Vect(<b>u</b>, <b>v</b>)&nbsp;?',opts:['ℝ² tout entier','La droite y = x','{0}','La droite y = −x'],ans:3,hint:'Écris u et v pour k = −1.',why:'u = (1 ; −1) et v = (−1 ; 1) = −u. Toutes les combinaisons sont sur la droite dirigée par (1 ; −1), soit y = −x.'},
    {q:'c) Pour <i>k</i> = 1, <b>u</b> = (1 ; 1) et <b>v</b> = (1 ; 3). Quelle est la coordonnée α de <b>w</b> = (3 ; 5) dans la base (<b>u</b>, <b>v</b>)&nbsp;?',lab:'α =',ans:2,hint:'α + β = 3 et α + 3β = 5.',why:'En soustrayant : 2β = 2, donc β = 1 et α = 2. Contrôle : 2(1 ; 1) + (1 ; 3) = (3 ; 5).'},
    {q:'d) Toujours pour <i>k</i> = 1, on note <i>D</i>₁ = Vect(<b>u</b>) et <i>D</i>₂ = Vect(<b>v</b>). Lequel est un sous-espace vectoriel&nbsp;?',opts:['D₁ ∪ D₂','D₁ ∩ D₂','{u ; v}','D₁ ∪ D₂ privé de 0'],ans:1,
     hint:'Teste la stabilité par addition avec u + v.',why:'Une intersection de sous-espaces est un sous-espace : ici D₁ ∩ D₂ = {0}. L’union n’est pas stable : u + v = (2 ; 4) n’est ni sur y = x, ni sur y = 3x.'},
   ],
   sol:'det(u, v) = (k + 2) − k² = −(k − 2)(k + 1). La famille est une base si et seulement si <b>k ∉ {−1 ; 2}</b>.<br>Pour k = −1 : v = −u, Vect(u, v) est la droite y = −x. Pour k = 2 : v = (2 ; 4) = 2u, Vect(u, v) est la droite y = 2x.<br>Pour k = 1 : w = (3 ; 5) = 2u + v, coordonnées (2 ; 1).<br>D₁ ∩ D₂ = {0} est un sous-espace, mais D₁ ∪ D₂ n’en est pas un, car u + v = (2 ; 4) en sort. Une union de deux droites distinctes n’est jamais stable.'},
]},

/* ===================== 6. APPLICATIONS LINÉAIRES ===================== */
{subj:'al',sem:'all',id:'al-applin',h:'Applications linéaires du plan',p:'Matrice, noyau, image, rang et changement de base.',steps:[
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
  {kind:'Problème',h:'Projeter sur une droite',
   p:`On note <i>p</i> la <b>projection orthogonale</b> sur la droite <i>D</i> dirigée par <b>u</b> = (1 ; 2). Pour tout vecteur <b>w</b>, <i>p</i>(<b>w</b>) = ${F('<b>w</b> · <b>u</b>','<b>u</b> · <b>u</b>')} <b>u</b>, où · est le produit scalaire. On veut la matrice <i>A</i> de <i>p</i>, son noyau, son rang, et vérifier que projeter deux fois revient à projeter une fois. Sur la figure, <b>w</b> = (3 ; 1) et son projeté.`,
   fig:(()=>{ const P=plane({x:[-2,4],y:[-1,4],lab:1}); ln(P,1,2,{c:'var(--math)',w:2}); ln(P,2,-1,{c:'var(--bad)',w:1.5,dash:1}); P.seg(3,1,1,2,{c:'var(--muted)',w:1.5,dash:1}).arrow(0,0,3,1,{c:'var(--spark)'}).arrow(0,0,1,2,{c:'var(--accent)',w:4}); P.text(3,1,'w',{dx:6}).text(1,2,'p(w)',{dx:8,dy:-4}).text(1.9,3.7,'D',{c:'var(--math)'}); return P.svg(); })(),
   parts:[
    {q:'a) Calcule <i>p</i>(<b>e₁</b>). Quelle est sa deuxième coordonnée&nbsp;?',lab:'2e coordonnée =',ans:.4,tol:.001,hint:'e₁ · u = 1 et u · u = 1 + 4 = 5.',why:'p(e₁) = (1/5)(1 ; 2) = (0,2 ; 0,4). De même p(e₂) = (2/5)(1 ; 2) = (0,4 ; 0,8), donc A = (1/5)(1 2 ; 2 4).'},
    {q:'b) Combien vaut det <i>A</i>&nbsp;?',lab:'det A =',ans:0,hint:'Les deux colonnes de A sont-elles colinéaires ?',why:'det A = 0,2·0,8 − 0,4·0,4 = 0 : p n’est pas bijective. Son image est D, de dimension 1 : rang 1.'},
    {q:'c) Quel est le noyau de <i>p</i>&nbsp;?',opts:['La droite D','{0}','La droite dirigée par (2 ; −1)','ℝ² tout entier'],ans:2,hint:'p(w) = 0 ⇔ w · u = 0.',why:'w · u = x + 2y = 0 : la droite perpendiculaire à D, dirigée par (2 ; −1). Théorème du rang : 1 + 1 = 2.'},
    {q:'d) Pourquoi <i>A</i>² = <i>A</i>&nbsp;?',opts:['Car det A = 0','Car A est symétrique','Car A est inversible','Car p(w) est déjà sur D, et un vecteur de D est son propre projeté'],ans:3,
     hint:'Que fait p sur un vecteur qui est déjà sur D ?',why:'p(u) = (5/5)u = u, donc p fixe D. Comme p(w) ∈ D, p(p(w)) = p(w) : p ∘ p = p, soit A² = A. Être symétrique ou de déterminant nul ne suffit pas.'},
   ],
   sol:'p(e₁) = (1/5)u et p(e₂) = (2/5)u, donc <b>A = (1/5)(1 2 ; 2 4)</b>.<br>det A = 0 : l’image est la droite D (rang 1) et le noyau la droite x + 2y = 0, dirigée par (2 ; −1). On a bien 1 + 1 = 2.<br>Pour w ∈ D, p(w) = w ; et p(w) ∈ D pour tout w. Donc p ∘ p = p, ce qui se vérifie : A² = (1/25)(5 10 ; 10 20) = A.<br>Exemple : w = (3 ; 1) donne w · u = 5, p(w) = (1 ; 2), et w − p(w) = (2 ; −1) est bien dans le noyau.'},
  {kind:'Problème',h:'La symétrie par changement de base',
   p:`On note <i>s</i> la <b>symétrie orthogonale</b> par rapport à la droite <i>D</i> : <i>y</i> = 2<i>x</i>. Elle fixe les vecteurs de <i>D</i> et retourne ceux de la droite perpendiculaire. Sa matrice dans la base canonique n’est pas évidente. On passe par la base adaptée <b>u</b> = (1 ; 2), <b>w</b> = (−2 ; 1), puis on revient avec <i>A</i> = <i>PA</i>′<i>P</i>⁻¹, où <i>P</i> = ${M([[1,-2],[2,1]])}.`,
   fig:(()=>{ const P=plane({x:[-4,6],y:[-2,5],lab:1}); ln(P,1,2,{c:'var(--math)',w:2}); P.seg(5,0,-3,4,{c:'var(--muted)',w:1.5,dash:1}).arrow(0,0,5,0,{c:'var(--spark)'}).arrow(0,0,-3,4,{c:'var(--accent)'}).dot(1,2,{r:4,c:'var(--ink)'}); P.text(5,0,'(5 ; 0)',{a:'end',dy:18,s:12}).text(-3,4,'s(5 ; 0)',{dx:6,s:12}).text(2.4,4.6,'D',{c:'var(--math)'}); return P.svg(); })(),
   parts:[
    {q:'a) Quelle est la matrice <i>A</i>′ de <i>s</i> dans la base (<b>u</b>, <b>w</b>)&nbsp;?',opts:[mat([[1,0],[0,1]]),M([[-1,0],[0,1]]),M([[1,0],[0,-1]]),mat([[0,1],[1,0]])],ans:2,
     hint:'Calcule s(u) et s(w), puis écris leurs coordonnées dans la base (u, w).',why:'s(u) = u et s(w) = −w : les colonnes de A′ sont (1 ; 0) et (0 ; −1).'},
    {q:'b) Calcule det <i>P</i>.',lab:'det P =',ans:5,hint:'ad − bc avec P = (1 −2 ; 2 1).',why:'1·1 − (−2)·2 = 5 ≠ 0 : (u, w) est bien une base.'},
    {q:'c) Calcule <i>A</i> = <i>PA</i>′<i>P</i>⁻¹. Quel est son coefficient en haut à gauche&nbsp;?',lab:'coefficient =',ans:-.6,tol:.001,
     hint:'P⁻¹ = (1/5)(1 2 ; −2 1). PA′ change le signe de la 2e colonne de P.',why:'PA′ = (1 2 ; 2 −1), puis A = (1/5)(1 2 ; 2 −1)(1 2 ; −2 1) = (1/5)(−3 4 ; 4 3). Le coefficient vaut −3/5 = −0,6.'},
    {q:'d) Quelle est la deuxième coordonnée de <i>s</i>(5 ; 0)&nbsp;?',lab:'2e coordonnée =',ans:4,hint:'Multiplie A par (5 ; 0).',why:'A(5 ; 0) = (−3 ; 4). Contrôle : le milieu (1 ; 2) est sur D, et (−3 ; 4) − (5 ; 0) = (−8 ; 4) est perpendiculaire à u.'},
    {q:'e) Que vaut <i>A</i>²&nbsp;?',opts:['A','La matrice nulle','I','−I'],ans:2,hint:'Que donne la symétrie appliquée deux fois ?',why:'s ∘ s = id. En base adaptée, A′² = I, donc A² = PA′²P⁻¹ = PP⁻¹ = I. Contrôle : (−3 4 ; 4 3)² = (25 0 ; 0 25).'},
   ],
   sol:'Dans la base (u, w), s(u) = u et s(w) = −w, donc <b>A′ = diag(1, −1)</b>.<br>Avec P = (1 −2 ; 2 1), det P = 5 et P⁻¹ = (1/5)(1 2 ; −2 1).<br>A = PA′P⁻¹ = (1 2 ; 2 −1)·(1/5)(1 2 ; −2 1) = <b>(1/5)(−3 4 ; 4 3)</b>.<br>Ainsi s(5 ; 0) = (−3 ; 4) : le milieu (1 ; 2) est sur D et le déplacement (−8 ; 4) est perpendiculaire à D.<br>Enfin A² = PA′²P⁻¹ = I, ce qui traduit s ∘ s = id. On note aussi det A = −1 et tr A = 0, comme pour diag(1, −1).'},
]},

/* ===================== 7. VALEURS PROPRES ===================== */
{subj:'al',sem:'all',id:'al-propres',h:'Valeurs et vecteurs propres',p:'Les directions qu’une matrice étire sans les tourner.',steps:[
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
  {kind:'Problème',h:'Calculer A²x sans multiplier',
   p:`Soit <i>A</i> = ${mat([[4,1],[2,3]])} et <b>x</b> = (3 ; 0). On veut les valeurs propres et les vecteurs propres de <i>A</i>, puis s’en servir pour calculer <i>A</i>²<b>x</b> sans aucun produit de matrices. C’est l’idée centrale de la réduction : dans une base de vecteurs propres, <i>A</i> agit coordonnée par coordonnée.`,
   parts:[
    {q:'a) Quelle est la plus grande valeur propre de <i>A</i>&nbsp;?',lab:'λ =',ans:5,hint:'tr A = 7 et det A = 10. Résous λ² − 7λ + 10 = 0.',why:'λ² − 7λ + 10 = (λ − 2)(λ − 5) : les valeurs propres sont 2 et 5.'},
    {q:'b) Pour λ = 2, on cherche un vecteur propre de la forme (1 ; <i>k</i>). Combien vaut <i>k</i>&nbsp;?',lab:'k =',ans:-2,hint:'Écris A − 2I et garde une seule équation.',why:'A − 2I = (2 1 ; 2 1) donne 2x + y = 0 : (1 ; −2). Pour λ = 5, A − 5I = (−1 1 ; 2 −2) donne (1 ; 1).'},
    {q:'c) Comment s’écrit <b>x</b> = (3 ; 0) dans la base <b>a</b> = (1 ; 1), <b>b</b> = (1 ; −2)&nbsp;?',opts:['x = 1·a + 2·b','x = 3·a + 0·b','x = 2·a + 1·b','x = 2·a − 1·b'],ans:2,hint:'Résous α + β = 3 et α − 2β = 0.',why:'α = 2β, puis 3β = 3 : β = 1 et α = 2. Contrôle : 2(1 ; 1) + (1 ; −2) = (3 ; 0).'},
    {q:'d) En déduire la deuxième coordonnée de <i>A</i>²<b>x</b>.',lab:'2e coordonnée =',ans:42,hint:'A²a = 5²a et A²b = 2²b.',why:'A²x = 2·25a + 1·4b = (50 ; 50) + (4 ; −8) = (54 ; 42). Contrôle : Ax = (12 ; 6), puis A(12 ; 6) = (54 ; 42).'},
   ],
   sol:'tr A = 7, det A = 10 : λ² − 7λ + 10 = (λ − 2)(λ − 5), donc <b>λ = 2 et λ = 5</b>.<br>E₂ : 2x + y = 0, dirigé par b = (1 ; −2). E₅ : −x + y = 0, dirigé par a = (1 ; 1).<br>Dans la base (a, b) : x = (3 ; 0) = 2a + b.<br>Comme Aⁿa = 5ⁿa et Aⁿb = 2ⁿb, on a Aⁿx = 2·5ⁿa + 2ⁿb.<br>Pour n = 2 : A²x = 50(1 ; 1) + 4(1 ; −2) = <b>(54 ; 42)</b>, ce que confirme le calcul direct.'},
  {kind:'Problème',h:'Matrice symétrique et maximum',
   p:`Une matrice <b>symétrique</b> ${mat([['<i>a</i>','<i>b</i>'],['<i>b</i>','<i>d</i>']])} a toujours des valeurs propres réelles. On le prouve, puis on étudie <i>A</i> = ${mat([[3,2],[2,0]])} et la quantité <i>q</i>(<i>x</i> ; <i>y</i>) = 3<i>x</i>² + 4<i>xy</i>. On cherche le maximum et le minimum de <i>q</i> sur le cercle unité. Fais tourner le point : les pointillés sont les directions propres.`,
   params:[{id:'t',l:'angle',min:0,max:345,step:15,v:90,u:'°'}],
   draw:v=>{ const P=plane({x:[-1.6,1.6],y:[-1.6,1.6],grid:false}), c=Math.cos(rad(v.t)), s=Math.sin(rad(v.t));
     P.circ(0,0,1,{c:'var(--muted)',w:1.5}); ln(P,2,1,{c:'var(--math)',w:1.5,dash:1}); ln(P,1,-2,{c:'var(--spark)',w:1.5,dash:1});
     P.arrow(0,0,c,s,{c:'var(--accent)'}).dot(c,s,{r:5,c:'var(--bad)'}); return P.svg(); },
   info:v=>{ const c=Math.cos(rad(v.t)), s=Math.sin(rad(v.t)); return `q(${fmt(c)} ; ${fmt(s)}) = <b>${fmt(3*c*c+4*c*s)}</b>`; },
   parts:[
    {q:'a) Pour une matrice symétrique, le discriminant Δ = (<i>a</i> + <i>d</i>)² − 4(<i>ad</i> − <i>b</i>²) s’écrit…',opts:['(a − d)² − 4b²','(a + d)² + 4b²','(a − d)² + 4b², donc Δ ≥ 0','a² + d² − 4b²'],ans:2,
     hint:'Développe (a + d)² − 4ad.',why:'(a + d)² − 4ad = (a − d)², donc Δ = (a − d)² + 4b² ≥ 0 : les racines sont réelles.'},
    {q:'b) Quelle est la plus grande valeur propre de <i>A</i>&nbsp;?',lab:'λ =',ans:4,hint:'tr A = 3 et det A = −4.',why:'λ² − 3λ − 4 = (λ − 4)(λ + 1) : les valeurs propres sont 4 et −1.'},
    {q:'c) (2 ; 1) est propre pour λ = 4, et (1 ; −2) pour λ = −1. Calcule leur produit scalaire.',lab:'produit scalaire =',ans:0,hint:'x₁x₂ + y₁y₂.',why:'2·1 + 1·(−2) = 0 : les directions propres d’une matrice symétrique sont perpendiculaires.'},
    {q:'d) Dans la base orthonormée des vecteurs propres, on admet que <i>q</i> = 4<i>s</i>² − <i>t</i>², avec <i>s</i>² + <i>t</i>² = 1 sur le cercle. Quel est le maximum de <i>q</i> sur le cercle unité&nbsp;?',lab:'max =',ans:4,
     hint:'4s² − t² = 4 − 5t² quand s² + t² = 1.',why:'q = 4 − 5t² ≤ 4, atteint pour t = 0, c’est-à-dire en (2 ; 1)/√5. Contrôle : q = (3·4 + 4·2)/5 = 4.'},
    {q:'e) Et quel est son minimum&nbsp;?',lab:'min =',ans:-1,hint:'Écris cette fois q = 5s² − 1.',why:'q = 5s² − 1 ≥ −1, atteint en (1 ; −2)/√5 : q = (3 − 8)/5 = −1. Max et min sont les valeurs propres.'},
   ],
   sol:'Pour (a b ; b d) : Δ = (a + d)² − 4(ad − b²) = (a − d)² + 4b² ≥ 0, donc <b>les valeurs propres sont réelles</b>.<br>Pour A = (3 2 ; 2 0) : λ² − 3λ − 4 = 0 donne 4 et −1, de vecteurs propres (2 ; 1) et (1 ; −2), orthogonaux.<br>On a q(X) = ᵗXAX. Dans la base orthonormée e = (2 ; 1)/√5, f = (1 ; −2)/√5, avec X = se + tf : q = 4s² − t².<br>Sur le cercle, s² + t² = 1, donc −1 ≤ q ≤ 4.<br>Le <b>maximum 4</b> est atteint en ±(2 ; 1)/√5, le <b>minimum −1</b> en ±(1 ; −2)/√5.'},
]},

/* ===================== 8. DIAGONALISATION ===================== */
{subj:'al',sem:'all',id:'al-diag',h:'Diagonalisation et réduction',p:'A = PDP⁻¹, puissances de matrices, forme de Jordan et rotations-dilatations.',steps:[
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
  {kind:'Problème',h:'Une suite récurrente linéaire',
   p:`La suite (<i>u</i>ₙ) vérifie <i>u</i>₀ = 1, <i>u</i>₁ = 5 et <i>u</i>ₙ₊₂ = <i>u</i>ₙ₊₁ + 2<i>u</i>ₙ. Avec <i>X</i>ₙ = (<i>u</i>ₙ₊₁ ; <i>u</i>ₙ), on a <i>X</i>ₙ₊₁ = <i>AX</i>ₙ, où <i>A</i> = ${mat([[1,2],[1,0]])}. On diagonalise <i>A</i> pour obtenir une formule explicite de <i>u</i>ₙ, puis on calcule un terme lointain d’un seul coup.`,
   parts:[
    {q:'a) Calcule <i>u</i>₃ avec la relation de récurrence.',lab:'u₃ =',ans:17,hint:'Calcule d’abord u₂ = u₁ + 2u₀.',why:'u₂ = 5 + 2 = 7, puis u₃ = 7 + 2·5 = 17.'},
    {q:'b) Quelle est la plus grande valeur propre de <i>A</i>&nbsp;?',lab:'λ =',ans:2,hint:'tr A = 1 et det A = −2.',why:'λ² − λ − 2 = (λ − 2)(λ + 1) : les valeurs propres sont 2 et −1, distinctes, donc A est diagonalisable.'},
    {q:'c) On en déduit <i>u</i>ₙ = α·2ⁿ + β·(−1)ⁿ. Quelles conditions fixent α et β&nbsp;?',opts:['α + β = 5 et 2α − β = 1','α = 1 et β = 5','α + β = 1 et 2α − β = 5','α − β = 1 et 2α + β = 5'],ans:2,
     hint:'Écris la formule pour n = 0 et pour n = 1.',why:'n = 0 : α + β = u₀ = 1. n = 1 : 2α − β = u₁ = 5.'},
    {q:'d) Combien vaut α&nbsp;?',lab:'α =',ans:2,hint:'Additionne les deux équations.',why:'3α = 6, donc α = 2 et β = −1. Ainsi uₙ = 2ⁿ⁺¹ − (−1)ⁿ. Contrôle : u₃ = 16 + 1 = 17.'},
    {q:'e) En déduire <i>u</i>₁₀.',lab:'u₁₀ =',ans:2047,hint:'2¹¹ = 2 048.',why:'u₁₀ = 2¹¹ − (−1)¹⁰ = 2 048 − 1 = 2 047.'},
   ],
   sol:'Avec Xₙ = (uₙ₊₁ ; uₙ), la récurrence s’écrit Xₙ₊₁ = AX<sub>n</sub>, A = (1 2 ; 1 0), donc Xₙ = AⁿX₀.<br>Polynôme caractéristique : λ² − λ − 2 = (λ − 2)(λ + 1). Deux valeurs propres distinctes : A = PDP⁻¹ avec D = diag(2, −1).<br>Chaque coordonnée de Aⁿ est donc une combinaison de 2ⁿ et (−1)ⁿ : uₙ = α2ⁿ + β(−1)ⁿ.<br>u₀ = 1 et u₁ = 5 donnent α + β = 1, 2α − β = 5, d’où α = 2, β = −1.<br><b>uₙ = 2ⁿ⁺¹ − (−1)ⁿ</b>, et u₁₀ = 2 047.'},
  {kind:'Problème',h:'Deux opérateurs téléphoniques',
   p:`Deux opérateurs se partagent les abonnés d’un pays. Chaque année, 20 % des clients de l’opérateur 1 passent chez l’opérateur 2, et 30 % des clients de 2 passent chez 1. Les parts de marché <i>X</i>ₙ = (<i>a</i>ₙ ; <i>b</i>ₙ) vérifient <i>X</i>ₙ₊₁ = <i>MX</i>ₙ, avec <i>M</i> = ${mat([['0,8','0,3'],['0,2','0,7']])}. Au départ, l’opérateur 1 a tous les clients : <i>X</i>₀ = (1 ; 0). On cherche la part limite et la vitesse d’approche.`,
   params:[{id:'n',l:'année n',min:0,max:12,v:0}],
   draw:v=>{ const P=plane({x:[-1,13],y:[-.1,1.1],h:200,grid:false,lx:2,ly:.2}); P.seg(-1,.6,13,.6,{c:'var(--muted)',w:1.5,dash:1});
     for(let k=0;k<=12;k++){ const a=.6+.4*.5**k, on=k<=v.n; P.dot(k,a,{r:on?5:3,c:on?'var(--math)':'var(--line)'}); } return P.svg(); },
   info:v=>`a<sub>${v.n}</sub> = ${fmt(.6+.4*.5**v.n,4)} (pointillé : 0,6)`,
   parts:[
    {q:'a) 1 est valeur propre de <i>M</i>, car ses colonnes ont pour somme 1. Quelle est l’autre valeur propre&nbsp;?',lab:'λ =',ans:.5,tol:.001,hint:'La somme des valeurs propres vaut la trace.',why:'tr M = 1,5, donc λ₂ = 0,5. Contrôle : 1·0,5 = det M = 0,56 − 0,06.'},
    {q:'b) Quels vecteurs propres choisir&nbsp;?',opts:['(2 ; 3) pour 1 et (1 ; −1) pour 0,5','(1 ; 1) pour 1 et (3 ; −2) pour 0,5','(3 ; 2) pour 1 et (1 ; −1) pour 0,5','(3 ; 2) pour 0,5 et (1 ; −1) pour 1'],ans:2,
     hint:'Pour λ = 1, M − I = (−0,2 0,3 ; 0,2 −0,3).',why:'−0,2x + 0,3y = 0 donne (3 ; 2). Pour 0,5 : M − 0,5I = (0,3 0,3 ; 0,2 0,2) donne (1 ; −1). Contrôle : M(3 ; 2) = (3 ; 2).'},
    {q:'c) On écrit <i>X</i>₀ = α(3 ; 2) + β(1 ; −1). Quelle est la part limite lim <i>a</i>ₙ&nbsp;?',lab:'lim aₙ =',ans:.6,tol:.001,hint:'3α + β = 1 et 2α − β = 0. Puis Xₙ = α(3 ; 2) + β·0,5ⁿ(1 ; −1).',why:'α = 1/5 et β = 2/5. Donc aₙ = 3/5 + (2/5)·0,5ⁿ → 0,6.'},
    {q:'d) Combien vaut <i>a</i>₃&nbsp;?',lab:'a₃ =',ans:.65,tol:.001,hint:'Utilise la formule de c) avec 0,5³ = 0,125.',why:'a₃ = 0,6 + 0,4·0,125 = 0,65. Contrôle direct : a₁ = 0,8, a₂ = 0,7, a₃ = 0,65.'},
    {q:'e) À partir de quelle année <i>n</i> a-t-on <i>a</i>ₙ < 0,601&nbsp;?',lab:'n =',ans:9,hint:'0,4·0,5ⁿ < 0,001 ⇔ 2ⁿ > 400.',why:'2⁸ = 256 < 400 < 512 = 2⁹ : n = 9. On a a₈ ≈ 0,6016 et a₉ ≈ 0,6008.'},
   ],
   sol:'tr M = 1,5 et det M = 0,5 : les valeurs propres sont 1 et 0,5, de vecteurs propres (3 ; 2) et (1 ; −1).<br>X₀ = (1 ; 0) = (1/5)(3 ; 2) + (2/5)(1 ; −1), donc Xₙ = MⁿX₀ = (1/5)(3 ; 2) + (2/5)·0,5ⁿ(1 ; −1).<br>Ainsi <b>aₙ = 0,6 + 0,4·0,5ⁿ</b> et bₙ = 0,4 − 0,4·0,5ⁿ.<br>La part limite de l’opérateur 1 est <b>60 %</b>, quel que soit le départ (seul le terme en 0,5ⁿ dépend de X₀).<br>L’écart à la limite est divisé par 2 chaque année : il passe sous 0,001 à partir de n = 9.<br>Mⁿ tend vers la matrice dont les deux colonnes valent (0,6 ; 0,4).'},
]},
);
})();
