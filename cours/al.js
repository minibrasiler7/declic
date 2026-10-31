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
  {h:'Appartenir ou être inclus',p:`<p>Pour parler de nombres, de points ou de solutions d’une équation, on a besoin de les regrouper : c’est le rôle des ensembles. Toute l’algèbre linéaire s’écrit dans ce langage, il faut donc le lire sans hésiter.</p>
<div class="def"><p>Un <b>ensemble</b> est une collection d’objets, ses <b>éléments</b>. On écrit <i>x</i> ∈ <i>A</i> (« <i>x</i> appartient à <i>A</i> ») si <i>x</i> est un élément de <i>A</i>, et <i>x</i> ∉ <i>A</i> sinon. On dit que <i>A</i> est <b>inclus</b> dans <i>B</i>, noté <i>A</i> ⊂ <i>B</i>, si tout élément de <i>A</i> est aussi un élément de <i>B</i>.</p></div>
<div class="idea"><p>∈ relie un objet à une boîte ; ⊂ relie deux boîtes, la petite étant entièrement rangée dans la grande. Sur la figure, <i>A</i> ⊂ <i>B</i> : le disque <i>A</i> est entièrement contenu dans le disque <i>B</i>.</p></div>
<div class="ex"><p>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ : tout entier naturel est un entier relatif, tout entier relatif est un rationnel (3 = 3/1), tout rationnel est un réel. On a 3 ∈ ℕ, −3 ∉ ℕ mais −3 ∈ ℤ, et √2 ∈ ℝ mais √2 ∉ ℚ.</p></div>
<div class="warn"><p>Deux ensembles sont <b>égaux</b> quand ils ont exactement les mêmes éléments : l’ordre et les répétitions ne comptent pas, {1 ; 2 ; 2} = {2 ; 1}. L’ensemble vide ∅ n’a aucun élément et il est inclus dans tout ensemble : la phrase « tout élément de ∅ est dans <i>B</i> » n’a aucun contre-exemple.</p></div>`,
   fig:`<svg viewBox="0 0 320 200" width="320" role="img"><rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="var(--muted)" stroke-width="1.5"/><circle cx="160" cy="105" r="80" fill="var(--math)" fill-opacity=".15" stroke="var(--math)" stroke-width="2"/><circle cx="185" cy="105" r="40" fill="var(--spark)" fill-opacity=".35" stroke="var(--ink)" stroke-width="2"/><text x="105" y="110" font-size="15" font-weight="700" fill="var(--ink)">B</text><text x="180" y="110" font-size="15" font-weight="700" fill="var(--ink)">A</text><text x="292" y="180" font-size="14" font-weight="700" text-anchor="middle" fill="var(--muted)">E</text><text x="24" y="180" font-size="13" font-weight="700" fill="var(--muted)">A ⊂ B</text></svg>`,
   note:'<b>Piège :</b> ∈ relie un élément à un ensemble, ⊂ relie deux ensembles. On a 1 ∈ {1 ; 2} mais {1} ⊂ {1 ; 2}. Et l’ensemble vide ∅ est inclus dans tout ensemble.'},
  {h:'Le bon symbole',p:'Soit <i>A</i> = {1 ; 2 ; 3}. Quelle écriture est correcte&nbsp;?',
   opts:['{1} ∈ <i>A</i>','{1} ⊂ <i>A</i>','1 ⊂ <i>A</i>','<i>A</i> ⊂ {1 ; 2}'],ans:1,
   why:'{1} est un ensemble dont le seul élément, 1, est dans A : c’est une inclusion. 1 est un élément, donc on écrit 1 ∈ A. Enfin 3 ∈ A mais 3 ∉ {1 ; 2}.'},
  {h:'Décrire un ensemble, compter ses éléments',p:`<p>Comment écrire un ensemble sans ambiguïté&nbsp;? Il y a deux façons, et la seconde servira sans arrêt dans ce cours.</p>
<div class="def"><p><b>En extension</b> : on liste les éléments entre accolades, <i>A</i> = {1 ; 2 ; 3}. <b>En compréhension</b> : on donne la propriété qui caractérise les éléments, <i>B</i> = {<i>x</i> ∈ ℝ : <i>x</i>² = 4}, ce qui se lit « l’ensemble des réels <i>x</i> tels que <i>x</i>² = 4 ». Le nombre d’éléments d’un ensemble fini <i>A</i> est son <b>cardinal</b>, noté card <i>A</i>.</p></div>
<div class="idea"><p>L’écriture en compréhension est la plus puissante : une droite, un noyau, l’ensemble des solutions d’un système se décrivent presque toujours par une condition, pas par une liste. Pour savoir si un objet est dedans, on teste la condition sur lui.</p></div>
<div class="ex"><p>{<i>x</i> ∈ ℝ : <i>x</i>² = 4} = {−2 ; 2}, de cardinal 2. {<i>n</i> ∈ ℕ : <i>n</i> ≤ 10 et <i>n</i> pair} = {0 ; 2 ; 4 ; 6 ; 8 ; 10}, de cardinal 6. {<i>x</i> ∈ ℝ : <i>x</i>² = −1} = ∅, de cardinal 0.</p></div>
<div class="warn"><p>Un intervalle est un ensemble infini : [0 ; 1] = {<i>x</i> ∈ ℝ : 0 ≤ <i>x</i> ≤ 1} n’a pas de cardinal fini. Et {∅} n’est pas vide : il contient un élément, qui est l’ensemble vide.</p></div>`},
  {h:'Quatre opérations',p:`<p>À partir de deux ensembles <i>A</i> et <i>B</i> d’un même ensemble de référence <i>E</i>, on en fabrique de nouveaux, comme on fabrique des nombres avec + et ×.</p>
<div class="def"><p><b>Union</b> <i>A</i> ∪ <i>B</i> = {<i>x</i> : <i>x</i> ∈ <i>A</i> <b>ou</b> <i>x</i> ∈ <i>B</i>}. <b>Intersection</b> <i>A</i> ∩ <i>B</i> = {<i>x</i> : <i>x</i> ∈ <i>A</i> <b>et</b> <i>x</i> ∈ <i>B</i>}. <b>Différence</b> <i>A</i> \\ <i>B</i> = {<i>x</i> ∈ <i>A</i> : <i>x</i> ∉ <i>B</i>}. <b>Complémentaire</b> <i>A</i>ᶜ = <i>E</i> \\ <i>A</i> : tout ce qui n’est pas dans <i>A</i>.</p></div>
<div class="idea"><p>Chaque symbole traduit un mot de logique : ∪ c’est « ou », ∩ c’est « et », ᶜ c’est « non ». Le diagramme de Venn montre les quatre régions possibles pour un élément : dans <i>A</i> seul, dans les deux, dans <i>B</i> seul, dans aucun. Chaque opération allume certaines de ces régions.</p></div>
<div class="ex"><p>Ici <i>E</i> = {1, …, 7}, <i>A</i> = {1 ; 2 ; 3 ; 4} et <i>B</i> = {3 ; 4 ; 5}. Fais défiler les opérations : <i>A</i> ∪ <i>B</i> = {1 ; 2 ; 3 ; 4 ; 5}, <i>A</i> ∩ <i>B</i> = {3 ; 4}, <i>A</i> \\ <i>B</i> = {1 ; 2}, <i>A</i>ᶜ = {5 ; 6 ; 7}.</p></div>
<div class="warn"><p>Si <i>A</i> et <i>B</i> n’ont aucun élément commun, <i>A</i> ∩ <i>B</i> = ∅ : on dit qu’ils sont <b>disjoints</b>. Et <i>A</i> \\ <i>B</i> ≠ <i>B</i> \\ <i>A</i> en général : ici <i>B</i> \\ <i>A</i> = {5}.</p></div>`,
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
  {kind:'Méthode',h:'Compter une union : le principe du crible',
   p:'<b>Quand :</b> on connaît le nombre d’éléments de plusieurs ensembles et de leurs intersections, et on veut celui de leur union ou de son complémentaire. <b>Pourquoi :</b> en additionnant card <i>A</i> et card <i>B</i>, chaque élément de <i>A</i> ∩ <i>B</i> est compté deux fois ; on le retire une fois.<br><b>card(<i>A</i> ∪ <i>B</i>) = card <i>A</i> + card <i>B</i> − card(<i>A</i> ∩ <i>B</i>)</b><br><b>card(<i>A</i> ∪ <i>B</i> ∪ <i>C</i>) = card <i>A</i> + card <i>B</i> + card <i>C</i> − card(<i>A</i> ∩ <i>B</i>) − card(<i>A</i> ∩ <i>C</i>) − card(<i>B</i> ∩ <i>C</i>) + card(<i>A</i> ∩ <i>B</i> ∩ <i>C</i>)</b><br>Dans <i>E</i> fini, card(<i>A</i>ᶜ) = card <i>E</i> − card <i>A</i>.',
   demo:{enonce:'Dans <i>E</i> = {1, …, 20}, combien de nombres sont multiples de 2 ou de 5&nbsp;? Combien ne sont multiples ni de 2 ni de 5&nbsp;?',
    etapes:[{f:'<i>A</i> = multiples de 2 : card <i>A</i> = 10. <i>B</i> = multiples de 5 : card <i>B</i> = 4 (5, 10, 15, 20).',w:'On nomme les ensembles et on compte chacun séparément.'},
     {f:'<i>A</i> ∩ <i>B</i> = multiples de 10 = {10 ; 20}, de cardinal 2.',w:'Être multiple de 2 et de 5, c’est être multiple de 10 : ce sont les éléments comptés deux fois.'},
     {f:'card(<i>A</i> ∪ <i>B</i>) = 10 + 4 − 2 = 12.',w:'Formule du crible pour deux ensembles.'},
     {f:'card((<i>A</i> ∪ <i>B</i>)ᶜ) = 20 − 12 = 8 : {1 ; 3 ; 7 ; 9 ; 11 ; 13 ; 17 ; 19}.',w:'« Ni l’un ni l’autre », c’est le complémentaire de l’union. On contrôle en listant.'}],
    conclusion:'12 nombres sont multiples de 2 ou de 5, et 8 ne sont multiples ni de l’un ni de l’autre. Avec trois ensembles, on peut aussi découper le diagramme de Venn en régions disjointes : on remplit d’abord le centre (les trois), puis les régions « exactement deux », puis « un seul ».'},
   note:'Pour compter « seulement A », pars de card A et retire les régions de A qui touchent les autres ensembles, en commençant par le centre pour ne rien retirer deux fois.'},
  {h:'Compter une union',p:'Dans <i>E</i> = {1, …, 10}, <i>A</i> est l’ensemble des nombres pairs et <i>B</i> celui des multiples de 3. Combien d’éléments a <i>A</i> ∪ <i>B</i>&nbsp;?',
   lab:'card(A ∪ B) =',ans:7,
   why:'A = {2 ; 4 ; 6 ; 8 ; 10}, B = {3 ; 6 ; 9}, A ∩ B = {6}. card(A ∪ B) = 5 + 3 − 1 = 7 : on retire une fois les éléments comptés deux fois.'},
  {h:'Crible à trois ensembles',p:'Dans <i>E</i> = {1, …, 30}, combien de nombres sont multiples de 2, de 3 <b>ou</b> de 5&nbsp;?',lab:'card =',ans:22,
   why:'Multiples de 2 : 15, de 3 : 10, de 5 : 6. Multiples de 6 : 5, de 10 : 3, de 15 : 2. Multiples de 30 : 1. Crible : 15 + 10 + 6 − 5 − 3 − 2 + 1 = 22.'},
  {h:'Le produit cartésien',p:`<p>Un point du plan a deux coordonnées, une case d’un tableau a une ligne et une colonne : il faut un ensemble dont les éléments sont des paires <b>ordonnées</b>.</p>
<div class="def"><p>Le <b>produit cartésien</b> <i>A</i> × <i>B</i> est l’ensemble des <b>couples</b> (<i>a</i> ; <i>b</i>) avec <i>a</i> ∈ <i>A</i> et <i>b</i> ∈ <i>B</i>. Deux couples sont égaux quand leurs premières composantes sont égales et leurs secondes aussi. On note <i>A</i>² = <i>A</i> × <i>A</i>.</p></div>
<div class="prop"><p>Si <i>A</i> et <i>B</i> sont finis, <b>card(<i>A</i> × <i>B</i>) = card <i>A</i> · card <i>B</i></b>. Pour former un couple, on choisit <i>a</i> parmi card <i>A</i> possibilités, puis <i>b</i> parmi card <i>B</i>, indépendamment : les nombres de choix se multiplient. La grille de points de la figure le montre : une colonne par élément de <i>A</i>, une ligne par élément de <i>B</i>.</p></div>
<div class="ex"><p>{1 ; 2 ; 3} × {<i>a</i> ; <i>b</i>} = {(1 ; <i>a</i>), (1 ; <i>b</i>), (2 ; <i>a</i>), (2 ; <i>b</i>), (3 ; <i>a</i>), (3 ; <i>b</i>)} : 3 · 2 = 6 couples. Le plan ℝ² = ℝ × ℝ est l’exemple central de ce cours : un vecteur (<i>x</i> ; <i>y</i>) est un couple de réels.</p></div>`,
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
  {kind:'Méthode',h:'Lister les parties d’un ensemble',
   p:'L’ensemble des <b>parties</b> de <i>A</i>, noté 𝒫(<i>A</i>), contient tous les sous-ensembles de <i>A</i>, y compris ∅ et <i>A</i> lui-même. <b>Comment les lister sans en oublier :</b> on les range par nombre d’éléments. <b>Pourquoi il y en a 2ⁿ :</b> pour former une partie, on décide pour chaque élément s’il est dedans ou non, soit 2 choix indépendants par élément : <b>card 𝒫(<i>A</i>) = 2<sup>card <i>A</i></sup></b>.',
   demo:{enonce:'Liste les parties de <i>A</i> = {<i>a</i> ; <i>b</i> ; <i>c</i>}.',
    etapes:[{f:'0 élément : ∅.',w:'On range les parties par taille pour ne rien oublier.'},
     {f:'1 élément : {<i>a</i>}, {<i>b</i>}, {<i>c</i>}.',w:'Une partie par élément.'},
     {f:'2 éléments : {<i>a</i> ; <i>b</i>}, {<i>a</i> ; <i>c</i>}, {<i>b</i> ; <i>c</i>}.',w:'Choisir deux éléments revient à choisir celui qu’on exclut : 3 possibilités.'},
     {f:'3 éléments : {<i>a</i> ; <i>b</i> ; <i>c</i>}.',w:'A est une partie de lui-même.'},
     {f:'Total : 1 + 3 + 3 + 1 = 8 = 2³.',w:'On contrôle avec la règle des 2 choix par élément.'}],
    conclusion:'𝒫({<i>a</i> ; <i>b</i> ; <i>c</i>}) a <b>8</b> éléments. Ses éléments sont des ensembles : on écrit {<i>a</i>} ∈ 𝒫(<i>A</i>), mais {<i>a</i>} ⊂ <i>A</i>.'}},
  {h:'Parties qui contiennent 1',p:'Combien de parties de {1 ; 2 ; 3 ; 4} contiennent l’élément 1&nbsp;?',lab:'parties :',ans:8,
   why:'1 est imposé ; il reste 2 choix pour chacun des éléments 2, 3 et 4 : 2³ = 8. C’est la moitié des 2⁴ = 16 parties.'},
  {h:'Les lois de De Morgan',p:`<p>Comment nier « être dans <i>A</i> ou dans <i>B</i> »&nbsp;? Ce n’est pas « ne pas être dans <i>A</i> ou ne pas être dans <i>B</i> » : il faut une règle précise.</p>
<div class="thm"><p><b>Lois de De Morgan.</b> Pour toutes parties <i>A</i>, <i>B</i> de <i>E</i> : <b>(<i>A</i> ∪ <i>B</i>)ᶜ = <i>A</i>ᶜ ∩ <i>B</i>ᶜ</b> et <b>(<i>A</i> ∩ <i>B</i>)ᶜ = <i>A</i>ᶜ ∪ <i>B</i>ᶜ</b>. Le complémentaire échange union et intersection.</p></div>
<div class="why"><p>Un élément est hors de <i>A</i> ∪ <i>B</i> exactement quand il n’est ni dans <i>A</i>, ni dans <i>B</i> : hors de <i>A</i> <b>et</b> hors de <i>B</i>, c’est-à-dire dans <i>A</i>ᶜ ∩ <i>B</i>ᶜ. De même, être hors de <i>A</i> ∩ <i>B</i>, c’est manquer au moins l’un des deux : hors de <i>A</i> <b>ou</b> hors de <i>B</i>. En logique, c’est la règle non(P ou Q) = (non P) et (non Q).</p></div>
<div class="ex"><p>Dans <i>E</i> = {1, …, 7}, <i>A</i> = {1 ; 2 ; 3 ; 4}, <i>B</i> = {3 ; 4 ; 5} : <i>A</i> ∪ <i>B</i> = {1, …, 5}, donc (<i>A</i> ∪ <i>B</i>)ᶜ = {6 ; 7}. Par ailleurs <i>A</i>ᶜ = {5 ; 6 ; 7} et <i>B</i>ᶜ = {1 ; 2 ; 6 ; 7}, d’où <i>A</i>ᶜ ∩ <i>B</i>ᶜ = {6 ; 7}. Même résultat. Compare les deux membres de chaque loi sur la figure : les régions coloriées coïncident.</p></div>`,
   params:[{id:'l',l:'Loi',min:1,max:2,v:1},{id:'s',l:'Membre (gauche / droite)',min:0,max:1,v:0}],
   draw:v=>venn(v.l===1?{o:1}:{a:1,b:1,o:1},{c:v.s?'var(--spark)':'var(--accent)'}),
   info:v=>v.l===1?(v.s?'Aᶜ ∩ Bᶜ : ni dans A, ni dans B':'(A ∪ B)ᶜ : hors de l’union'):(v.s?'Aᶜ ∪ Bᶜ : hors de A, ou hors de B':'(A ∩ B)ᶜ : hors de l’intersection'),
   note:'Même figure à gauche et à droite : c’est la preuve visuelle. En logique, c’est la règle non(P ou Q) = (non P) et (non Q).'},
  {kind:'Méthode',h:'Prouver une égalité d’ensembles par double inclusion',
   p:'<b>Quand :</b> on doit démontrer <i>X</i> = <i>Y</i> pour des ensembles quelconques. Un diagramme convainc, mais ne prouve pas. <b>Pourquoi :</b> <i>X</i> = <i>Y</i> ⇔ (<i>X</i> ⊂ <i>Y</i> et <i>Y</i> ⊂ <i>X</i>). <b>Comment :</b> pour <i>X</i> ⊂ <i>Y</i>, on écrit « soit <i>x</i> ∈ <i>X</i> », on traduit cette appartenance avec les définitions (∪ veut dire « ou », ∩ « et », ᶜ « n’appartient pas »), et on arrive à « donc <i>x</i> ∈ <i>Y</i> ». Puis on recommence dans l’autre sens.',
   demo:{enonce:'Démontre la <b>distributivité</b> <i>A</i> ∩ (<i>B</i> ∪ <i>C</i>) = (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>C</i>).',
    etapes:[{f:'⊂ : soit <i>x</i> ∈ <i>A</i> ∩ (<i>B</i> ∪ <i>C</i>). Alors <i>x</i> ∈ <i>A</i> <b>et</b> (<i>x</i> ∈ <i>B</i> ou <i>x</i> ∈ <i>C</i>).',w:'On part d’un élément quelconque du membre de gauche et on traduit les symboles en mots.'},
     {f:'Si <i>x</i> ∈ <i>B</i> : <i>x</i> ∈ <i>A</i> ∩ <i>B</i>. Si <i>x</i> ∈ <i>C</i> : <i>x</i> ∈ <i>A</i> ∩ <i>C</i>. Dans les deux cas, <i>x</i> ∈ (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>C</i>).',w:'Un « ou » dans l’hypothèse se traite par une <b>disjonction de cas</b>.'},
     {f:'⊃ : soit <i>x</i> ∈ (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>C</i>). Dans les deux cas <i>x</i> ∈ <i>A</i>, et <i>x</i> est dans <i>B</i> ou dans <i>C</i>, donc dans <i>B</i> ∪ <i>C</i>.',w:'Même démarche, en partant cette fois du membre de droite.'},
     {f:'Donc <i>x</i> ∈ <i>A</i> ∩ (<i>B</i> ∪ <i>C</i>).',w:'La seconde inclusion est prouvée.'}],
    conclusion:'Les deux inclusions donnent <b><i>A</i> ∩ (<i>B</i> ∪ <i>C</i>) = (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>C</i>)</b>. On prouve de même <i>A</i> ∪ (<i>B</i> ∩ <i>C</i>) = (<i>A</i> ∪ <i>B</i>) ∩ (<i>A</i> ∪ <i>C</i>).'},
   note:'Pour montrer qu’une inclusion est <b>fausse</b>, un contre-exemple suffit : un élément de X qui n’est pas dans Y. Avoir le même cardinal ne prouve pas l’égalité : {1} et {2} en ont chacun un.'},
  {h:'La bonne première ligne',p:'On veut démontrer (<i>A</i> ∪ <i>B</i>)ᶜ ⊂ <i>A</i>ᶜ ∩ <i>B</i>ᶜ. Comment commence la preuve&nbsp;?',
   opts:['Soit <i>x</i> ∈ <i>A</i>ᶜ ∩ <i>B</i>ᶜ','On prend <i>A</i> = {1} et <i>B</i> = {2}','Soit <i>x</i> ∈ (<i>A</i> ∪ <i>B</i>)ᶜ : alors <i>x</i> ∉ <i>A</i> et <i>x</i> ∉ <i>B</i>','Les deux ensembles ont le même cardinal'],ans:2,
   why:'Pour prouver X ⊂ Y, on part d’un élément de X = (A ∪ B)ᶜ. Comme x n’est ni dans A ni dans B, x ∈ Aᶜ et x ∈ Bᶜ. Partir de Aᶜ ∩ Bᶜ prouverait l’autre inclusion, et un exemple ne prouve rien.'},
  {kind:'Méthode',h:'Simplifier une expression d’ensembles',
   p:'<b>Quand :</b> une expression mêle ∪, ∩ et complémentaires. <b>Comment :</b> 1) on fait « entrer » les complémentaires avec De Morgan ; 2) on supprime les doubles complémentaires : <b>(<i>X</i>ᶜ)ᶜ = <i>X</i></b> ; 3) on factorise avec la distributivité ; 4) on conclut avec <i>X</i> ∪ <i>X</i>ᶜ = <i>E</i>, <i>X</i> ∩ <i>X</i>ᶜ = ∅, <i>X</i> ∩ <i>E</i> = <i>X</i> et <i>X</i> ∪ ∅ = <i>X</i>. Chacune de ces règles se prouve par double inclusion.',
   demo:{enonce:'Simplifie (<i>A</i>ᶜ ∪ <i>B</i>)ᶜ ∪ (<i>A</i> ∩ <i>B</i>).',
    etapes:[{f:'(<i>A</i>ᶜ ∪ <i>B</i>)ᶜ = (<i>A</i>ᶜ)ᶜ ∩ <i>B</i>ᶜ = <i>A</i> ∩ <i>B</i>ᶜ',w:'De Morgan change le complémentaire d’une union en intersection des complémentaires, puis (Aᶜ)ᶜ = A.'},
     {f:'(<i>A</i> ∩ <i>B</i>ᶜ) ∪ (<i>A</i> ∩ <i>B</i>) = <i>A</i> ∩ (<i>B</i>ᶜ ∪ <i>B</i>)',w:'On met A en facteur : c’est la distributivité lue de droite à gauche.'},
     {f:'= <i>A</i> ∩ <i>E</i> = <i>A</i>',w:'Bᶜ ∪ B est tout l’ensemble de référence E.'}],
    conclusion:'(<i>A</i>ᶜ ∪ <i>B</i>)ᶜ ∪ (<i>A</i> ∩ <i>B</i>) = <b><i>A</i></b>. Contrôle sur le diagramme : « A seul » plus « A ∩ B », c’est bien A.'}},
  {h:'Simplifie',p:'À quoi est égal (<i>A</i> ∪ <i>B</i>) ∩ (<i>A</i> ∪ <i>B</i>ᶜ)&nbsp;?',
   opts:['<i>E</i>','<i>A</i> ∩ <i>B</i>','<i>A</i>','<i>B</i>'],ans:2,
   why:'On met A en facteur avec l’autre distributivité : (A ∪ B) ∩ (A ∪ Bᶜ) = A ∪ (B ∩ Bᶜ) = A ∪ ∅ = A.'},
  {kind:'Défi',h:'Complémentaire d’une intersection',p:'À quoi est égal (<i>A</i> ∩ <i>B</i>ᶜ)ᶜ&nbsp;?',
   opts:['<i>A</i>ᶜ ∩ <i>B</i>','<i>A</i> ∪ <i>B</i>ᶜ','<i>A</i>ᶜ ∪ <i>B</i>ᶜ','<i>A</i>ᶜ ∪ <i>B</i>'],ans:3,
   why:'De Morgan : (A ∩ Bᶜ)ᶜ = Aᶜ ∪ (Bᶜ)ᶜ = Aᶜ ∪ B. Le complémentaire du complémentaire redonne B.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><i>x</i> ∈ <i>A</i> : <i>x</i> est un élément de <i>A</i>. <i>A</i> ⊂ <i>B</i> : tout élément de <i>A</i> est dans <i>B</i>. On a toujours ∅ ⊂ <i>A</i>.</li>
<li>Égalité : <i>X</i> = <i>Y</i> ⇔ <i>X</i> ⊂ <i>Y</i> et <i>Y</i> ⊂ <i>X</i> (double inclusion). Une inclusion fausse se réfute par un seul contre-exemple.</li>
<li>∪ se lit « ou », ∩ se lit « et », ᶜ se lit « non » ; <i>A</i> \\ <i>B</i> = <i>A</i> ∩ <i>B</i>ᶜ.</li>
<li>Crible : card(<i>A</i> ∪ <i>B</i>) = card <i>A</i> + card <i>B</i> − card(<i>A</i> ∩ <i>B</i>). Avec trois ensembles, on retire les trois intersections doubles et on rajoute la triple. card(<i>A</i>ᶜ) = card <i>E</i> − card <i>A</i>.</li>
<li>card(<i>A</i> × <i>B</i>) = card <i>A</i> · card <i>B</i> ; un couple est ordonné, (1 ; 2) ≠ (2 ; 1).</li>
<li>card 𝒫(<i>A</i>) = 2<sup>card <i>A</i></sup> : deux choix par élément.</li>
<li>De Morgan : (<i>A</i> ∪ <i>B</i>)ᶜ = <i>A</i>ᶜ ∩ <i>B</i>ᶜ et (<i>A</i> ∩ <i>B</i>)ᶜ = <i>A</i>ᶜ ∪ <i>B</i>ᶜ. Distributivité : <i>A</i> ∩ (<i>B</i> ∪ <i>C</i>) = (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>C</i>), et de même en échangeant ∪ et ∩.</li>
<li>Simplifications : (<i>X</i>ᶜ)ᶜ = <i>X</i>, <i>X</i> ∪ <i>X</i>ᶜ = <i>E</i>, <i>X</i> ∩ <i>X</i>ᶜ = ∅, <i>X</i> ∩ <i>E</i> = <i>X</i>, <i>X</i> ∪ ∅ = <i>X</i>.</li>
</ul></div>`},
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
  {h:'Les connecteurs',p:`<p>Une démonstration enchaîne des phrases vraies. Pour raisonner sans se tromper, il faut d’abord savoir exactement quand une phrase composée est vraie.</p>
<div class="def"><p>Une <b>proposition</b> est une phrase qui est soit vraie (V), soit fausse (F). Les <b>connecteurs</b> en fabriquent de nouvelles : <b>non P</b> est vraie quand P est fausse ; <b>P et Q</b> est vraie quand les deux le sont ; <b>P ou Q</b> est vraie dès que l’une au moins l’est ; <b>P ⇒ Q</b> (« P implique Q ») n’est fausse que si P est vraie et Q fausse ; <b>P ⇔ Q</b> est vraie quand P et Q ont la même valeur.</p></div>
<div class="idea"><p>Une <b>table de vérité</b> liste les 4 cas possibles pour (P, Q) et donne la valeur de chaque formule. Choisis P et Q avec les curseurs pour surligner la ligne correspondante et lire toutes les colonnes d’un coup.</p></div>
<div class="ex"><p>P = « il pleut », Q = « je prends un parapluie ». P ⇒ Q est une promesse : elle n’est trahie que s’il pleut et que je sors sans parapluie. S’il ne pleut pas, la promesse tient quoi que je fasse. Avec des nombres : « <i>x</i> > 2 ⇒ <i>x</i>² > 4 » est vraie pour tout réel, car aucun <i>x</i> > 2 n’a un carré ≤ 4.</p></div>
<div class="warn"><p>Le « ou » mathématique est inclusif : « 2 est pair ou 2 est premier » est vraie. Et une implication dont l’hypothèse est fausse est vraie : « 1 = 2 ⇒ 3 = 5 » est une proposition vraie.</p></div>`,
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
  {kind:'Méthode',h:'Dresser une table de vérité',
   p:'<b>Quand :</b> pour connaître la valeur d’une formule dans tous les cas, ou pour prouver que deux formules sont <b>équivalentes</b> (même colonne finale). <b>Comment :</b> avec <i>n</i> propositions, on écrit les 2ⁿ lignes (4 pour P, Q ; 8 pour P, Q, R) dans un ordre systématique, puis on calcule une colonne par sous-formule, de l’intérieur vers l’extérieur.',
   demo:{enonce:'Montre que la contraposée (non <i>Q</i>) ⇒ (non <i>P</i>) est équivalente à <i>P</i> ⇒ <i>Q</i>.',
    etapes:[{f:'Lignes (P, Q) : VV, VF, FV, FF.',w:'Deux propositions : 2² = 4 cas.'},
     {f:'P ⇒ Q : V, F, V, V.',w:'L’implication n’est fausse que pour P vraie et Q fausse.'},
     {f:'non Q : F, V, F, V ; non P : F, F, V, V.',w:'On calcule les sous-formules avant la formule finale.'},
     {f:'(non Q) ⇒ (non P) : V, F, V, V.',w:'Elle n’est fausse qu’à la 2e ligne, où non Q est vraie et non P fausse.'}],
    conclusion:'Les deux colonnes finales sont identiques : <b>P ⇒ Q et (non Q) ⇒ (non P) sont équivalentes</b>. C’est ce qui justifie le raisonnement par contraposée, plus loin.'},
   note:'Avec trois propositions, écris P = VVVVFFFF, Q = VVFFVVFF et R = VFVFVFVF : les 8 cas y sont, chacun une seule fois.'},
  {h:'Une table à 8 lignes',p:'Combien de lignes de la table de vérité de (<i>P</i> ou <i>Q</i>) ⇒ <i>R</i> sont vraies&nbsp;?',lab:'lignes vraies :',ans:5,
   why:'L’implication n’est fausse que si « P ou Q » est vraie et R fausse : (P, Q) ∈ {VV, VF, FV} avec R = F, soit 3 lignes. Il reste 8 − 3 = 5 lignes vraies.'},
  {h:'Les quantificateurs',p:`<p>« <i>x</i>² ≥ 0 » n’est ni vraie ni fausse tant qu’on ne dit pas de quel <i>x</i> on parle. Les quantificateurs précisent pour combien de valeurs la propriété doit tenir.</p>
<div class="def"><p><b>∀<i>x</i> ∈ <i>E</i>, P(<i>x</i>)</b> se lit « pour tout <i>x</i> de <i>E</i>, P(<i>x</i>) » : la propriété est vraie pour chaque élément, sans exception. <b>∃<i>x</i> ∈ <i>E</i>, P(<i>x</i>)</b> se lit « il existe au moins un <i>x</i> de <i>E</i> tel que P(<i>x</i>) ». ∀ est un A renversé (« all »), ∃ un E retourné (« exists »).</p></div>
<div class="ex"><p>« ∀<i>x</i> ∈ ℝ, <i>x</i>² ≥ 0 » est vraie. « ∃<i>x</i> ∈ ℝ, <i>x</i>² = 2 » est vraie : <i>x</i> = √2 convient. « ∃<i>x</i> ∈ ℝ, <i>x</i>² = −1 » est fausse. « ∀<i>x</i> ∈ ℝ, <i>x</i>² ≥ 1 » est fausse : <i>x</i> = 0 est un contre-exemple.</p></div>
<div class="warn"><p><b>L’ordre compte.</b> « ∀<i>x</i> ∈ ℝ, ∃<i>y</i> ∈ ℝ, <i>y</i> > <i>x</i> » est vraie : pour chaque <i>x</i>, on prend <i>y</i> = <i>x</i> + 1, et ce <i>y</i> dépend de <i>x</i>. « ∃<i>y</i> ∈ ℝ, ∀<i>x</i> ∈ ℝ, <i>y</i> > <i>x</i> » est fausse : il faudrait un même <i>y</i> plus grand que tous les réels, y compris <i>y</i> lui-même. Deux quantificateurs de même nature qui se suivent, eux, s’échangent librement.</p></div>`,
   note:'Dans « ∀x, ∃y », le y peut dépendre de x. Dans « ∃y, ∀x », le même y doit marcher pour tous les x.'},
  {h:'Nier une phrase',p:`<p>Pour montrer qu’une propriété est fausse, ou pour raisonner par contraposée ou par l’absurde, il faut écrire sa négation sans erreur. C’est mécanique si on suit les règles.</p>
<div class="prop"><p><b>Négation des quantificateurs</b> : non(∀<i>x</i>, P(<i>x</i>)) ⇔ ∃<i>x</i>, non P(<i>x</i>), et non(∃<i>x</i>, P(<i>x</i>)) ⇔ ∀<i>x</i>, non P(<i>x</i>). <b>Négation des connecteurs</b> : non(P et Q) ⇔ (non P) ou (non Q) ; non(P ou Q) ⇔ (non P) et (non Q) ; <b>non(P ⇒ Q) ⇔ P et (non Q)</b> ; non(non P) ⇔ P.</p></div>
<div class="why"><p>« Tous vérifient P » est faux exactement quand au moins un ne vérifie pas P. « Au moins un vérifie P » est faux quand aucun ne le fait, c’est-à-dire quand tous vérifient non P. Pour l’implication : P ⇒ Q n’est fausse que dans le cas « P vraie et Q fausse », et sa négation décrit précisément ce cas. Pour « et » et « ou », ce sont les lois de De Morgan des ensembles, écrites en logique.</p></div>
<div class="ex"><p>Négation de « ∀<i>x</i> ∈ ℝ, <i>x</i>² > 0 » : « ∃<i>x</i> ∈ ℝ, <i>x</i>² ≤ 0 ». Elle est vraie (<i>x</i> = 0), donc la phrase de départ est fausse. Négation de « <i>n</i> est pair et <i>n</i> > 10 » : « <i>n</i> est impair ou <i>n</i> ≤ 10 ».</p></div>`,
   note:'La négation de « x > 0 » est « x ≤ 0 », pas « x < 0 ». Et les domaines (x ∈ ℝ, ε > 0) ne changent pas.'},
  {kind:'Méthode',h:'Nier une phrase quantifiée pas à pas',
   p:'<b>Quand :</b> pour montrer qu’une propriété est fausse, ou pour préparer une preuve par contraposée ou par l’absurde. <b>Comment :</b> on lit la phrase de gauche à droite. Chaque ∀ devient ∃ et chaque ∃ devient ∀, <b>sans toucher aux domaines</b>. Puis on nie la propriété finale avec non(P et Q) = (non P) ou (non Q), non(P ou Q) = (non P) et (non Q), non(P ⇒ Q) = P et (non Q). <b>Pourquoi :</b> « tous vérifient » est faux exactement quand « au moins un ne vérifie pas ».',
   demo:{enonce:'Nie « <i>f</i> est strictement croissante sur ℝ » : ∀<i>a</i> ∈ ℝ, ∀<i>b</i> ∈ ℝ, <i>a</i> < <i>b</i> ⇒ <i>f</i>(<i>a</i>) < <i>f</i>(<i>b</i>).',
    etapes:[{f:'∃<i>a</i> ∈ ℝ, non(∀<i>b</i> ∈ ℝ, …)',w:'Le premier ∀ devient ∃ ; le domaine ℝ reste.'},
     {f:'∃<i>a</i> ∈ ℝ, ∃<i>b</i> ∈ ℝ, non(<i>a</i> < <i>b</i> ⇒ <i>f</i>(<i>a</i>) < <i>f</i>(<i>b</i>))',w:'Même chose pour le second ∀.'},
     {f:'∃<i>a</i> ∈ ℝ, ∃<i>b</i> ∈ ℝ, <i>a</i> < <i>b</i> et non(<i>f</i>(<i>a</i>) < <i>f</i>(<i>b</i>))',w:'Une implication est fausse quand l’hypothèse est vraie et la conclusion fausse.'},
     {f:'∃<i>a</i> ∈ ℝ, ∃<i>b</i> ∈ ℝ, <i>a</i> < <i>b</i> et <i>f</i>(<i>a</i>) ≥ <i>f</i>(<i>b</i>)',w:'Le contraire de « < » est « ≥ ».'}],
    conclusion:'<i>f</i> n’est pas strictement croissante ⇔ <b>il existe a < b avec f(a) ≥ f(b)</b>. Pour le prouver, il suffit d’exhiber un tel couple : pour <i>f</i>(<i>x</i>) = <i>x</i>², <i>a</i> = −1 et <i>b</i> = 0 conviennent.'},
   note:'La négation d’une implication n’est jamais une implication : c’est un « et ».'},
  {h:'La négation de la convergence',p:'Quelle est la négation de « ∀ε > 0, ∃<i>n</i> ∈ ℕ*, 1/<i>n</i> < ε »&nbsp;?',
   opts:['∀ε > 0, ∃<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε','∃ε ≤ 0, ∀<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε','∃ε > 0, ∃<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε','∃ε > 0, ∀<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε'],ans:3,
   why:'On échange ∀ et ∃ en gardant les domaines (ε > 0 reste ε > 0), puis on nie 1/n < ε en 1/n ≥ ε.'},
  {h:'Nier une implication',p:'Quelle est la négation de « ∀<i>x</i> ∈ ℝ, <i>x</i> > 2 ⇒ <i>x</i>² > 4 »&nbsp;?',
   opts:['∀<i>x</i> ∈ ℝ, <i>x</i> > 2 ⇒ <i>x</i>² ≤ 4','∃<i>x</i> ∈ ℝ, <i>x</i> > 2 et <i>x</i>² ≤ 4','∃<i>x</i> ∈ ℝ, <i>x</i> ≤ 2 et <i>x</i>² ≤ 4','∃<i>x</i> ∈ ℝ, <i>x</i> > 2 ⇒ <i>x</i>² ≤ 4'],ans:1,
   why:'∀ devient ∃, et non(P ⇒ Q) = P et (non Q). La phrase de départ est vraie, donc sa négation est fausse : aucun x > 2 n’a un carré ≤ 4.'},
  {kind:'Méthode',h:'Prouver une phrase avec ∀ et ∃',
   p:'<b>Comment :</b> on suit les quantificateurs dans l’ordre.<br>• « ∀<i>x</i> » : on écrit « soit <i>x</i> quelconque » et on raisonne sans choisir sa valeur.<br>• « ∃<i>y</i> » : on <b>construit</b> un <i>y</i> qui marche, un <b>témoin</b>. Il peut dépendre des variables déjà fixées avant lui.<br>• Pour <b>réfuter</b> un « ∀ », un seul <b>contre-exemple</b> suffit.<br><b>Astuce :</b> on cherche le témoin au brouillon en partant de la conclusion voulue, puis on rédige dans l’ordre.',
   demo:{enonce:'Démontre : ∀ε > 0, ∃<i>N</i> ∈ ℕ*, ∀<i>n</i> ≥ <i>N</i>, 1/<i>n</i>² < ε.',
    etapes:[{f:'Soit ε > 0 quelconque.',w:'Le premier quantificateur est ∀ : ε est fixé, mais on ne choisit pas sa valeur.'},
     {f:'Brouillon : 1/<i>n</i>² < ε ⇔ <i>n</i>² > 1/ε ⇔ <i>n</i> > 1/√ε.',w:'On part de ce qu’on veut obtenir pour deviner N.'},
     {f:'On choisit un entier <i>N</i> > 1/√ε.',w:'C’est le témoin du ∃. Il dépend de ε, ce qui est permis car ε vient avant N.'},
     {f:'Soit <i>n</i> ≥ <i>N</i>. Alors <i>n</i>² ≥ <i>N</i>² > 1/ε, donc 1/<i>n</i>² < ε.',w:'Dernier ∀ : on vérifie pour un n quelconque au-delà de N.'}],
    conclusion:'La phrase est vraie. Exemple : pour ε = 0,01, il faut <i>n</i> > 10, et <i>N</i> = 11 est le plus petit choix.'},
   note:'Outil fréquent pour minorer ou majorer : l’<b>inégalité triangulaire</b> |a + b| ≤ |a| + |b|. Lue à l’envers, |a| + |b| ≥ |a + b| : si cette somme vaut au moins 2, l’un des deux termes vaut au moins 1.'},
  {h:'Trouve le rang N',p:'Pour ε = 0,01, quel est le plus petit entier <i>N</i> tel que 1/(2<i>n</i>) < ε pour tout <i>n</i> ≥ <i>N</i>&nbsp;?',lab:'N =',ans:51,
   why:'1/(2n) < 0,01 ⇔ 2n > 100 ⇔ n > 50. L’inégalité est stricte : n = 50 donne exactement 0,01. Donc N = 51, et tous les n suivants marchent car 1/(2n) décroît.'},
  {h:'La valeur absolue et l’inégalité triangulaire',p:`<p>Pour mesurer un écart, par exemple |<i>u</i>ₙ − ℓ| dans une définition de limite, on utilise la valeur absolue. Une inégalité sur elle revient sans cesse dans les preuves avec ∀ et ∃.</p>
<div class="def"><p>La <b>valeur absolue</b> de <i>a</i> est |<i>a</i>| = <i>a</i> si <i>a</i> ≥ 0 et |<i>a</i>| = −<i>a</i> sinon. C’est la distance de <i>a</i> à 0, et |<i>a</i> − <i>b</i>| est la distance entre <i>a</i> et <i>b</i>. Ainsi |<i>x</i> − <i>a</i>| < δ signifie <i>a</i> − δ < <i>x</i> < <i>a</i> + δ.</p></div>
<div class="thm"><p><b>Inégalité triangulaire.</b> Pour tous réels <i>a</i>, <i>b</i> : |<i>a</i> + <i>b</i>| ≤ |<i>a</i>| + |<i>b</i>|, avec égalité exactement quand <i>a</i> et <i>b</i> sont de même signe (ou nuls).</p></div>
<div class="why"><p>On a −|<i>a</i>| ≤ <i>a</i> ≤ |<i>a</i>| et de même pour <i>b</i>. En additionnant : −(|<i>a</i>| + |<i>b</i>|) ≤ <i>a</i> + <i>b</i> ≤ |<i>a</i>| + |<i>b</i>|, ce qui est exactement |<i>a</i> + <i>b</i>| ≤ |<i>a</i>| + |<i>b</i>|. Si les signes sont opposés, une partie se compense et l’inégalité est stricte.</p></div>
<div class="ex"><p><i>a</i> = 3, <i>b</i> = −5 : |3 + (−5)| = 2 < 3 + 5 = 8. <i>a</i> = 3, <i>b</i> = 5 : |8| = 8 = 3 + 5. Lue à l’envers, l’inégalité <b>minore</b> une somme : |3 − <i>x</i>| + |<i>x</i> + 1| ≥ |(3 − <i>x</i>) + (<i>x</i> + 1)| = 4 pour tout <i>x</i>. Et si une somme de deux valeurs absolues vaut au moins 4, l’un des deux termes vaut au moins 2.</p></div>`},
  {h:'L’inégalité triangulaire',p:'Pour tout réel <i>x</i>, on a |3 − <i>x</i>| + |<i>x</i> + 1| ≥ <i>k</i>. Quelle est la meilleure constante <i>k</i>&nbsp;?',lab:'k =',ans:4,
   why:'|3 − x| + |x + 1| ≥ |(3 − x) + (x + 1)| = 4, avec égalité pour x ∈ [−1 ; 3]. Par exemple x = 0 donne 3 + 1 = 4.'},
  {h:'Contraposée et réciproque',p:`<p>À partir d’une implication P ⇒ Q, on peut former d’autres phrases en échangeant ou en niant ses deux côtés. Elles n’ont pas toutes la même valeur de vérité, et les confondre est l’erreur de logique la plus fréquente.</p>
<div class="def"><p>Pour P ⇒ Q : la <b>réciproque</b> est Q ⇒ P ; la <b>contraposée</b> est (non Q) ⇒ (non P). Quand P ⇒ Q et sa réciproque sont toutes deux vraies, on a l’<b>équivalence</b> P ⇔ Q.</p></div>
<div class="prop"><p>La contraposée est <b>équivalente</b> à l’implication de départ : même table de vérité, comme la Méthode plus haut l’a montré. La réciproque, elle, est indépendante : elle peut être vraie ou fausse.</p></div>
<div class="why"><p>Si P ⇒ Q et que Q est fausse, P ne peut pas être vraie, sinon Q le serait : donc non P. Le même raisonnement ramène de la contraposée à l’implication. Rien de tel pour la réciproque : savoir que P entraîne Q ne dit rien sur ce qu’entraîne Q.</p></div>
<div class="ex"><p>P = « <i>x</i> = 2 », Q = « <i>x</i>² = 4 ». L’implication est vraie. La contraposée « <i>x</i>² ≠ 4 ⇒ <i>x</i> ≠ 2 » est vraie aussi. La réciproque « <i>x</i>² = 4 ⇒ <i>x</i> = 2 » est fausse : <i>x</i> = −2 a pour carré 4. Fais défiler les trois énoncés sur la figure.</p></div>`,
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
  {kind:'Méthode',h:'Raisonner par contraposée',
   p:'<b>Quand :</b> on doit prouver <i>P</i> ⇒ <i>Q</i>, mais l’hypothèse <i>P</i> s’exploite mal, alors que « non <i>Q</i> » donne une information concrète. C’est typique avec « pair », « ≠ » ou « irrationnel ». <b>Pourquoi :</b> (non <i>Q</i>) ⇒ (non <i>P</i>) a la même table de vérité que <i>P</i> ⇒ <i>Q</i>. <b>Comment :</b> on suppose non <i>Q</i> et on en déduit non <i>P</i>.',
   demo:{enonce:'Démontre que, pour tout entier <i>n</i> : si <i>n</i>² est pair, alors <i>n</i> est pair.',
    etapes:[{f:'Contraposée : si <i>n</i> est impair, alors <i>n</i>² est impair.',w:'« n² pair » se manipule mal, alors que « n impair » s’écrit tout de suite.'},
     {f:'Soit <i>n</i> impair : <i>n</i> = 2<i>k</i> + 1 avec <i>k</i> entier.',w:'On traduit l’hypothèse non Q en une égalité.'},
     {f:'<i>n</i>² = 4<i>k</i>² + 4<i>k</i> + 1 = 2(2<i>k</i>² + 2<i>k</i>) + 1.',w:'On développe et on fait apparaître la forme 2 × entier + 1.'},
     {f:'Donc <i>n</i>² est impair.',w:'C’est non P.'}],
    conclusion:'La contraposée est vraie, donc <b>n² pair ⇒ n pair</b>.'}},
  {h:'Choisis la bonne preuve',p:'On veut démontrer « si 5<i>n</i> + 3 est pair, alors <i>n</i> est impair » par contraposée. Quel raisonnement faut-il faire&nbsp;?',
   opts:['Supposer n impair, n = 2k + 1, et calculer 5n + 3 = 10k + 8','Supposer 5n + 3 pair et essayer n = 1','Supposer n pair, n = 2k, et montrer que 5n + 3 = 2(5k + 1) + 1 est impair','Supposer 5n + 3 impair et montrer que n est pair'],ans:2,
   why:'La contraposée de « 5n + 3 pair ⇒ n impair » est « n pair ⇒ 5n + 3 impair ». Avec n = 2k : 5n + 3 = 10k + 3 = 2(5k + 1) + 1. La dernière option est la contraposée de la réciproque.'},
  {kind:'Méthode',h:'Raisonner par l’absurde',
   p:'<b>Quand :</b> pour prouver une affirmation « négative » (n’existe pas, est irrationnel, est infini), qui ne se démontre pas directement. <b>Pourquoi :</b> si supposer le contraire mène à une contradiction, une phrase à la fois vraie et fausse, alors le contraire est faux. <b>Comment :</b> on écrit « supposons par l’absurde que … » suivi de la négation, on déduit jusqu’à une contradiction, puis on conclut.',
   demo:{enonce:'Démontre que √2 est irrationnel.',
    etapes:[{f:'Supposons √2 = <i>p</i>/<i>q</i> avec <i>p</i>, <i>q</i> entiers, <i>q</i> ≠ 0, et la fraction <b>irréductible</b>.',w:'C’est la négation de « √2 est irrationnel ». On peut toujours simplifier une fraction au maximum.'},
     {f:'Alors <i>p</i>² = 2<i>q</i>² : <i>p</i>² est pair, donc <i>p</i> est pair. On écrit <i>p</i> = 2<i>k</i>.',w:'On réutilise le résultat prouvé par contraposée : n² pair ⇒ n pair.'},
     {f:'4<i>k</i>² = 2<i>q</i>², donc <i>q</i>² = 2<i>k</i>² : <i>q</i> est pair aussi.',w:'Même argument pour q.'},
     {f:'<i>p</i> et <i>q</i> sont pairs : la fraction se simplifie par 2. Contradiction.',w:'On avait supposé la fraction irréductible.'}],
    conclusion:'L’hypothèse est fausse : <b>√2 est irrationnel</b>.'},
   note:'Ne confonds pas avec la contraposée : par contraposée, on prouve non Q ⇒ non P ; par l’absurde, on suppose P et non Q, et on cherche n’importe quelle contradiction.'},
  {h:'Le plus grand entier',p:'On veut démontrer par l’absurde qu’il n’existe pas de plus grand entier naturel. Quel raisonnement est correct&nbsp;?',
   opts:['On vérifie que 1 000 n’est pas le plus grand','Supposons qu’il existe un plus grand entier N. Alors N + 1 est un entier et N + 1 > N : contradiction','Supposons que tout entier a un successeur','On vérifie que N + 1 > N pour N = 1, 2 et 3'],ans:1,
   why:'On suppose la négation (un plus grand entier N existe) et on construit un entier plus grand que N, ce qui contredit l’hypothèse. Des exemples ne prouvent rien.'},
  {h:'Le principe de récurrence',p:`<p>Comment prouver une propriété pour <b>tous</b> les entiers, alors qu’on ne peut pas les vérifier un par un&nbsp;? L’ensemble ℕ a une structure particulière : chaque entier a un suivant, et on les atteint tous en partant du premier.</p>
<div class="thm"><p><b>Principe de récurrence.</b> Soit P(<i>n</i>) une propriété dépendant d’un entier <i>n</i>. Si P(<i>n</i>₀) est vraie (<b>initialisation</b>) et si, pour tout <i>n</i> ≥ <i>n</i>₀, P(<i>n</i>) ⇒ P(<i>n</i> + 1) (<b>hérédité</b>), alors P(<i>n</i>) est vraie pour tout <i>n</i> ≥ <i>n</i>₀.</p></div>
<div class="idea"><p>Des dominos alignés : l’initialisation renverse le premier, l’hérédité garantit que chaque domino renverse le suivant. Alors tous tombent, aussi loin qu’on aille. P(<i>n</i>₀) donne P(<i>n</i>₀ + 1), qui donne P(<i>n</i>₀ + 2), et ainsi de suite : tout entier est atteint en un nombre fini de pas.</p></div>
<div class="warn"><p>Les deux étapes sont indispensables. Hérédité sans initialisation : « <i>n</i> ≥ <i>n</i> + 1 » est héréditaire (en ajoutant 1 des deux côtés, on obtient <i>n</i> + 1 ≥ <i>n</i> + 2), mais fausse pour tout <i>n</i> : aucun domino ne tombe. Initialisation sans hérédité : « <i>n</i>² + <i>n</i> + 41 est premier » est vraie pour <i>n</i> = 0, 1, …, 39, mais fausse pour <i>n</i> = 40, car 40² + 40 + 41 = 1 681 = 41². Vérifier des cas ne prouve jamais le cas général.</p></div>
<div class="ex"><p>Prouvons 2ⁿ > <i>n</i> pour tout <i>n</i> ≥ 1. Initialisation : 2¹ = 2 > 1. Hérédité : si 2ⁿ > <i>n</i>, alors 2ⁿ⁺¹ = 2·2ⁿ > 2<i>n</i> ≥ <i>n</i> + 1, car <i>n</i> ≥ 1. Donc 2ⁿ⁺¹ > <i>n</i> + 1, et la propriété est vraie pour tout <i>n</i> ≥ 1.</p></div>`},
  {kind:'Méthode',h:'Raisonner par récurrence',
   p:'<b>Quand :</b> pour prouver une propriété <i>P</i>(<i>n</i>) pour tout entier <i>n</i> ≥ <i>n</i>₀, par exemple une formule qui dépend de <i>n</i> ou une suite définie pas à pas. <b>Pourquoi :</b> si <i>P</i>(<i>n</i>₀) est vraie et si chaque <i>P</i>(<i>n</i>) entraîne <i>P</i>(<i>n</i> + 1), la propriété se propage comme une file de dominos. <b>Comment :</b> 1) <b>initialisation</b> : vérifier <i>P</i>(<i>n</i>₀) ; 2) <b>hérédité</b> : supposer <i>P</i>(<i>n</i>) pour un <i>n</i> fixé et démontrer <i>P</i>(<i>n</i> + 1) ; 3) conclure.',
   demo:{enonce:'Démontre que 1 + 2 + … + <i>n</i> = <i>n</i>(<i>n</i> + 1)/2 pour tout <i>n</i> ≥ 1.',
    etapes:[{f:'Initialisation : pour <i>n</i> = 1, le membre de gauche vaut 1 et celui de droite 1·2/2 = 1.',w:'On vérifie que le premier domino tombe.'},
     {f:'Hérédité : on suppose 1 + … + <i>n</i> = <i>n</i>(<i>n</i> + 1)/2 pour un certain <i>n</i>.',w:'C’est l’hypothèse de récurrence, pour un n fixé, pas pour tous.'},
     {f:'1 + … + <i>n</i> + (<i>n</i> + 1) = <i>n</i>(<i>n</i> + 1)/2 + (<i>n</i> + 1) = (<i>n</i> + 1)(<i>n</i> + 2)/2.',w:'On fait apparaître la somme au rang n pour utiliser l’hypothèse, puis on factorise par n + 1.'},
     {f:'C’est la formule au rang <i>n</i> + 1.',w:'On compare avec la formule où n est remplacé par n + 1.'}],
    conclusion:'Par récurrence, <b>1 + 2 + … + n = n(n + 1)/2</b> pour tout n ≥ 1. Par exemple 1 + … + 100 = 5 050.'},
   note:'Vérifier la formule pour n = 1, 2 et 3 ne prouve rien : sans hérédité, rien ne garantit que le domino suivant tombe.'},
  {h:'L’hérédité',p:'On veut prouver par récurrence que 1 + 3 + 5 + … + (2<i>n</i> − 1) = <i>n</i>² pour tout <i>n</i> ≥ 1. Dans l’hérédité, quelle égalité faut-il établir&nbsp;?',
   opts:['n² + (2n + 1) = (n + 1)²','La formule pour n = 1','n² + (2n − 1) = (n + 1)²','La formule pour n = 1, 2 et 3'],ans:0,
   why:'On suppose 1 + … + (2n − 1) = n². Au rang n + 1, on ajoute le terme suivant 2(n + 1) − 1 = 2n + 1, et n² + 2n + 1 = (n + 1)². La 3e option ajoute le mauvais terme, la 2e est l’initialisation.'},
  {kind:'Défi',h:'Compter les lignes vraies',p:'La table de vérité de (<i>P</i> ⇒ <i>Q</i>) et (<i>Q</i> ⇒ <i>R</i>) a 8 lignes. Combien sont vraies&nbsp;?',
   lab:'lignes vraies :',ans:4,
   why:'Il ne faut jamais « V puis F » dans l’ordre P, Q, R. Les triplets possibles sont FFF, FFV, FVV et VVV : 4 lignes.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Connecteurs : non, et, ou (inclusif), ⇒, ⇔. P ⇒ Q n’est fausse que si P est vraie et Q fausse ; elle équivaut à (non P) ou Q.</li>
<li>Table de vérité : 2ⁿ lignes pour <i>n</i> propositions. Deux formules sont équivalentes quand leurs colonnes finales coïncident.</li>
<li>∀ « pour tout », ∃ « il existe ». L’ordre ∀∃ ou ∃∀ change le sens : dans « ∀<i>x</i>, ∃<i>y</i> », <i>y</i> peut dépendre de <i>x</i>.</li>
<li>Négation : on échange ∀ et ∃ sans toucher aux domaines, puis on nie la propriété finale. non(P et Q) = (non P) ou (non Q) ; non(P ⇒ Q) = P et (non Q) ; non(<i>x</i> > 0) est <i>x</i> ≤ 0.</li>
<li>Prouver « ∀<i>x</i> » : « soit <i>x</i> quelconque ». Prouver « ∃<i>y</i> » : construire un témoin. Réfuter « ∀ » : un contre-exemple.</li>
<li>La contraposée (non Q) ⇒ (non P) est équivalente à P ⇒ Q ; la réciproque Q ⇒ P ne l’est pas.</li>
<li>Par l’absurde : on suppose la négation et on aboutit à une contradiction.</li>
<li>Récurrence : initialisation P(<i>n</i>₀), puis hérédité P(<i>n</i>) ⇒ P(<i>n</i> + 1) pour un <i>n</i> fixé.</li>
<li>Valeur absolue : |<i>a</i> + <i>b</i>| ≤ |<i>a</i>| + |<i>b</i>| ; |<i>x</i> − <i>a</i>| < δ signifie que <i>x</i> est à distance moins de δ de <i>a</i>.</li>
</ul></div>`},
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
  {h:'Image et antécédents',p:`<p>Une fonction comme <i>x</i> ↦ <i>x</i>² transforme un nombre en un autre. Pour étudier plus tard les transformations du plan, il faut un vocabulaire précis : d’où l’on part, où l’on arrive, et combien de points de départ mènent au même point d’arrivée.</p>
<div class="def"><p>Une <b>application</b> <i>f</i> : <i>E</i> → <i>F</i> associe à chaque élément <i>x</i> de l’<b>ensemble de départ</b> <i>E</i> <b>exactement une</b> <b>image</b> <i>f</i>(<i>x</i>), élément de l’<b>ensemble d’arrivée</b> <i>F</i>. Un <b>antécédent</b> de <i>y</i> ∈ <i>F</i> est un <i>x</i> ∈ <i>E</i> tel que <i>f</i>(<i>x</i>) = <i>y</i>. On écrit aussi <i>x</i> ↦ <i>f</i>(<i>x</i>), qui se lit « <i>x</i> a pour image <i>f</i>(<i>x</i>) ».</p></div>
<div class="idea"><p>Image et antécédent ne jouent pas le même rôle. Chaque <i>x</i> a toujours une image, et une seule. Un <i>y</i>, lui, peut avoir zéro, un ou plusieurs antécédents. Sur la figure, les antécédents de <i>y</i> se lisent sur la droite horizontale de hauteur <i>y</i> : ce sont les abscisses des points où elle coupe la courbe.</p></div>
<div class="ex"><p>Avec <i>f</i>(<i>x</i>) = <i>x</i>² sur ℝ : l’image de −3 est 9. Les antécédents de 9 sont −3 et 3, car <i>x</i>² = 9 ⇔ <i>x</i> = ±3. Le nombre 0 a un seul antécédent, 0, et −1 n’en a aucun.</p></div>
<div class="warn"><p>Une application, c’est trois données : <i>E</i>, <i>F</i> et la règle. Changer <i>E</i> ou <i>F</i> change l’application, et parfois ses propriétés.</p></div>`,
   params:[{id:'y',l:'y',min:-1,max:4,step:.5,v:2}],
   draw:v=>{ const P=plane({x:[-3,3],y:[-1.5,4.5],lab:1}); P.fn(x=>x*x).seg(-3,v.y,3,v.y,{c:'var(--spark)',w:2,dash:1});
     if(v.y>0){ const r=Math.sqrt(v.y); P.dot(-r,v.y,{c:'var(--bad)'}).dot(r,v.y,{c:'var(--bad)'}).seg(-r,0,-r,v.y,{c:'var(--muted)',w:1,dash:1}).seg(r,0,r,v.y,{c:'var(--muted)',w:1,dash:1}); }
     else if(v.y===0) P.dot(0,0,{c:'var(--bad)'}); return P.svg(); },
   info:v=>v.y<0?`${fmt(v.y)} n’a <b>aucun</b> antécédent : un carré n’est jamais négatif`:v.y===0?'0 a <b>un seul</b> antécédent : 0':`${fmt(v.y)} a <b>deux</b> antécédents : ±${fmt(Math.sqrt(v.y))}`},
  {h:'Cherche les antécédents',p:'Soit <i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = <i>x</i>² − 2<i>x</i>. Quel est le <b>plus grand</b> antécédent de 3&nbsp;?',lab:'x =',ans:3,
   why:'x² − 2x = 3 ⇔ x² − 2x − 3 = 0 ⇔ (x − 3)(x + 1) = 0. Les antécédents sont −1 et 3.'},
  {h:'Image directe, image réciproque',p:`<p>On veut souvent savoir où arrive tout un morceau de l’ensemble de départ, ou au contraire quels points tombent dans une zone donnée. Par exemple : pour quels <i>x</i> a-t-on 1 ≤ <i>x</i>² ≤ 4&nbsp;?</p>
<div class="def"><p>Pour <i>A</i> ⊂ <i>E</i>, l’<b>image directe</b> de <i>A</i> est <i>f</i>(<i>A</i>) = {<i>f</i>(<i>x</i>) : <i>x</i> ∈ <i>A</i>}, l’ensemble des images des éléments de <i>A</i>. Pour <i>B</i> ⊂ <i>F</i>, l’<b>image réciproque</b> de <i>B</i> est <b><i>f</i>⁻¹(<i>B</i>) = {<i>x</i> ∈ <i>E</i> : <i>f</i>(<i>x</i>) ∈ <i>B</i>}</b>, l’ensemble des antécédents des éléments de <i>B</i>.</p></div>
<div class="idea"><p>L’image directe va vers l’avant : on part de <i>A</i> et on regarde où ça tombe. L’image réciproque remonte : on part d’une zone <i>B</i> de l’arrivée et on récupère tout ce qui y tombe. Sur la figure, la bande colorée est <i>B</i> = [1 ; 4] sur l’axe vertical ; les deux segments rouges de l’axe horizontal forment <i>f</i>⁻¹(<i>B</i>).</p></div>
<div class="ex"><p>Avec <i>f</i>(<i>x</i>) = <i>x</i>² : quand <i>x</i> parcourt [−1 ; 2], <i>x</i>² prend toutes les valeurs de 0 (en <i>x</i> = 0) à 4 (en <i>x</i> = 2), donc <i>f</i>([−1 ; 2]) = [0 ; 4]. Et 1 ≤ <i>x</i>² ≤ 4 ⇔ 1 ≤ |<i>x</i>| ≤ 2, donc <i>f</i>⁻¹([1 ; 4]) = [−2 ; −1] ∪ [1 ; 2].</p></div>`,
   fig:(()=>{ const P=plane({x:[-3,3],y:[-1,4.6],lab:1}); P.rect(-3,1,6,3,{fill:'var(--spark)',fo:.15,c:null}).fn(x=>x*x).seg(-2,0,-1,0,{c:'var(--bad)',w:6}).seg(1,0,2,0,{c:'var(--bad)',w:6}); P.text(2.9,2.4,'B = [1 ; 4]',{a:'end',s:12}); return P.svg(); })(),
   note:'La notation f⁻¹(B) a un sens pour <b>toute</b> application, même non bijective. Elle ne suppose pas que la réciproque existe.'},
  {kind:'Méthode',h:'Calculer une image directe ou réciproque',
   p:'<b>Image réciproque <i>f</i>⁻¹(<i>B</i>) :</b> on résout la condition « <i>f</i>(<i>x</i>) ∈ <i>B</i> » d’inconnue <i>x</i>, par une équation ou des inéquations. <b>Image directe <i>f</i>(<i>A</i>) :</b> on cherche toutes les valeurs prises quand <i>x</i> parcourt <i>A</i>, à l’aide des variations de <i>f</i>. <b>Piège :</b> si <i>f</i> n’est pas monotone sur <i>A</i>, l’image de [<i>a</i> ; <i>b</i>] n’est pas l’intervalle entre <i>f</i>(<i>a</i>) et <i>f</i>(<i>b</i>) : on découpe là où le sens de variation change.',
   demo:{enonce:'Avec <i>f</i>(<i>x</i>) = <i>x</i>² sur ℝ, calcule <i>f</i>([−3 ; 1]) et <i>f</i>⁻¹([1 ; 9]).',
    etapes:[{f:'Sur [−3 ; 0], <i>f</i> décroît de 9 à 0 ; sur [0 ; 1], elle croît de 0 à 1.',w:'f n’est pas monotone sur [−3 ; 1] : on coupe en 0.'},
     {f:'<i>f</i>([−3 ; 1]) = [0 ; 9] ∪ [0 ; 1] = [0 ; 9].',w:'On réunit les valeurs prises sur les deux morceaux. Le calcul naïf entre f(1) = 1 et f(−3) = 9 oublierait le minimum 0.'},
     {f:'<i>f</i>⁻¹([1 ; 9]) = {<i>x</i> : 1 ≤ <i>x</i>² ≤ 9} = {<i>x</i> : 1 ≤ |<i>x</i>| ≤ 3}.',w:'On écrit la condition d’appartenance, puis on prend la racine : √(x²) = |x|.'},
     {f:'= [−3 ; −1] ∪ [1 ; 3].',w:'On résout 1 ≤ |x| ≤ 3 de chaque côté de 0.'}],
    conclusion:'<b>f([−3 ; 1]) = [0 ; 9]</b> et <b>f⁻¹([1 ; 9]) = [−3 ; −1] ∪ [1 ; 3]</b>. Contrôle : f(−2) = 4 est bien dans [1 ; 9].'}},
  {h:'Une image réciproque',p:'Avec <i>f</i>(<i>x</i>) = <i>x</i>² − 1 sur ℝ, que vaut <i>f</i>⁻¹([0 ; 3])&nbsp;?',
   opts:['[−1 ; 8]','[1 ; 2]','[−2 ; −1] ∪ [1 ; 2]','[−2 ; 2]'],ans:2,
   why:'0 ≤ x² − 1 ≤ 3 ⇔ 1 ≤ x² ≤ 4 ⇔ 1 ≤ |x| ≤ 2. [−1 ; 8] est l’image directe f([0 ; 3]), et [1 ; 2] oublie les x négatifs.'},
  {h:'Injection, surjection, bijection',p:`<p>Pour pouvoir « défaire » une application, c’est-à-dire retrouver <i>x</i> à partir de <i>f</i>(<i>x</i>), il faut deux choses : qu’aucune image ne soit partagée, et qu’aucun élément de l’arrivée ne soit oublié. Ces deux exigences ont un nom.</p>
<div class="def"><p><i>f</i> : <i>E</i> → <i>F</i> est <b>injective</b> si deux éléments distincts ont toujours des images distinctes : <i>x</i> ≠ <i>x</i>′ ⇒ <i>f</i>(<i>x</i>) ≠ <i>f</i>(<i>x</i>′). Autrement dit, tout <i>y</i> ∈ <i>F</i> a <b>au plus</b> un antécédent. Elle est <b>surjective</b> si tout <i>y</i> ∈ <i>F</i> a <b>au moins</b> un antécédent. Elle est <b>bijective</b> si elle est les deux : tout <i>y</i> a <b>exactement un</b> antécédent.</p></div>
<div class="idea"><p>Sur un diagramme à flèches, l’injectivité interdit à deux flèches d’arriver au même point ; la surjectivité exige que chaque point de droite reçoive au moins une flèche. Sur la figure, les points de <i>F</i> atteints sont en couleur. Avec trois éléments de chaque côté, tu verras qu’injective et surjective vont toujours ensemble.</p></div>
<div class="ex"><p>Avec <i>f</i>(1) = a, <i>f</i>(2) = a, <i>f</i>(3) = b : a a deux antécédents, donc <i>f</i> n’est pas injective, et c n’en a aucun, donc elle n’est pas surjective. Avec <i>f</i>(1) = b, <i>f</i>(2) = c, <i>f</i>(3) = a, elle est bijective. Choisis les images avec les curseurs.</p></div>`,
   params:[{id:'f1',l:'f(1)',min:0,max:2,v:0},{id:'f2',l:'f(2)',min:0,max:2,v:0},{id:'f3',l:'f(3)',min:0,max:2,v:1}],
   draw:v=>sag(['1','2','3'],['a','b','c'],[v.f1,v.f2,v.f3]),
   info:v=>{ const f=[v.f1,v.f2,v.f3], inj=new Set(f).size===3, sur=[0,1,2].every(j=>f.includes(j));
     return `${inj?'injective':'pas injective'} · ${sur?'surjective':'pas surjective'}${inj&&sur?' · <b>bijective</b>':''}`; },
   note:'Pour prouver l’injectivité : on suppose f(x) = f(x′) et on montre x = x′.'},
  {h:'Lire l’injectivité sur un graphe',p:`<p>Pour une fonction de ℝ dans ℝ, il n’y a pas de flèches à compter, mais il y a un graphe. Comme les antécédents de <i>c</i> se lisent sur la droite horizontale de hauteur <i>c</i>, l’injectivité et la surjectivité deviennent des questions d’intersections.</p>
<div class="prop"><p>Soit <i>f</i> : <i>E</i> → <i>F</i> avec <i>E</i>, <i>F</i> ⊂ ℝ. <i>f</i> est <b>injective</b> si chaque droite <i>y</i> = <i>c</i>, pour <i>c</i> ∈ <i>F</i>, coupe le graphe <b>au plus une fois</b> ; <b>surjective</b> si elle le coupe <b>au moins une fois</b> ; bijective si elle le coupe <b>exactement une fois</b>.</p></div>
<div class="why"><p>Les points communs à la droite <i>y</i> = <i>c</i> et au graphe sont les points (<i>x</i> ; <i>f</i>(<i>x</i>)) avec <i>f</i>(<i>x</i>) = <i>c</i> : leurs abscisses sont exactement les antécédents de <i>c</i>. Compter les intersections, c’est compter les antécédents. En particulier, une fonction <b>strictement monotone</b> est injective : si <i>x</i> &lt; <i>x</i>′, alors <i>f</i>(<i>x</i>) &lt; <i>f</i>(<i>x</i>′) (ou &gt;), donc les deux images diffèrent.</p></div>
<div class="ex"><p>Sur la figure, la droite <i>y</i> = 4 coupe la parabole <i>y</i> = <i>x</i>² en −2 et en 2 : <i>x</i> ↦ <i>x</i>² n’est pas injective sur ℝ. La droite <i>y</i> = −1 ne la coupe pas : elle n’est pas surjective sur ℝ. À l’inverse, <i>x</i> ↦ <i>x</i>³ est strictement croissante et prend toutes les valeurs réelles : elle est bijective de ℝ sur ℝ.</p></div>
<div class="warn"><p>Le test dépend des ensembles choisis. Restreinte à [0 ; +∞[ au départ et à l’arrivée, <i>x</i> ↦ <i>x</i>² devient bijective : on n’a gardé qu’une moitié de parabole et retiré les hauteurs négatives.</p></div>`,
   fig:(()=>{ const P=plane({x:[-3,3],y:[-1.5,5],lab:1}); P.fn(x=>x*x).seg(-3,4,3,4,{c:'var(--spark)',w:2,dash:1}).seg(-3,-1,3,-1,{c:'var(--bad)',w:2,dash:1}); P.dot(-2,4,{c:'var(--spark)'}).dot(2,4,{c:'var(--spark)'}).text(2.9,4,'y = 4',{a:'end',dy:-8,s:12}).text(2.9,-1,'y = −1',{a:'end',dy:-8,s:12,c:'var(--bad)'}); return P.svg(); })()},
  {kind:'Méthode',h:'Prouver qu’une application est injective, ou ne l’est pas',
   p:'<b>Pour prouver l’injectivité :</b> on suppose <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>′) avec <i>x</i>, <i>x</i>′ ∈ <i>E</i>, et on démontre <i>x</i> = <i>x</i>′. Souvent, on factorise <i>f</i>(<i>x</i>) − <i>f</i>(<i>x</i>′) par (<i>x</i> − <i>x</i>′). <b>Pour prouver la non-injectivité :</b> on exhibe deux éléments distincts qui ont la même image. C’est la négation de « ∀<i>x</i>, ∀<i>x</i>′, <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>′) ⇒ <i>x</i> = <i>x</i>′ ».',
   demo:{enonce:'<i>f</i>(<i>x</i>) = <i>x</i>² + 2<i>x</i>. Est-elle injective sur ℝ&nbsp;? Sur [−1 ; +∞[&nbsp;?',
    etapes:[{f:'<i>f</i>(<i>x</i>) − <i>f</i>(<i>x</i>′) = (<i>x</i>² − <i>x</i>′²) + 2(<i>x</i> − <i>x</i>′) = (<i>x</i> − <i>x</i>′)(<i>x</i> + <i>x</i>′ + 2).',w:'On factorise par x − x′ grâce à a² − b² = (a − b)(a + b).'},
     {f:'Sur ℝ : avec <i>x</i> = 0 et <i>x</i>′ = −2, <i>f</i>(0) = <i>f</i>(−2) = 0.',w:'Le second facteur s’annule pour x′ = −2 − x : un contre-exemple explicite suffit, f n’est pas injective sur ℝ.'},
     {f:'Sur [−1 ; +∞[ : si <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>′), alors <i>x</i> = <i>x</i>′ ou <i>x</i> + <i>x</i>′ = −2.',w:'Un produit est nul si l’un de ses facteurs est nul.'},
     {f:'Or <i>x</i> ≥ −1 et <i>x</i>′ ≥ −1 donnent <i>x</i> + <i>x</i>′ ≥ −2, avec égalité seulement si <i>x</i> = <i>x</i>′ = −1. Dans tous les cas, <i>x</i> = <i>x</i>′.',w:'On utilise l’ensemble de départ pour éliminer le second cas.'}],
    conclusion:'<i>f</i> n’est <b>pas injective sur ℝ</b>, mais elle l’est <b>sur [−1 ; +∞[</b>. L’ensemble de départ fait partie de l’application.'}},
  {h:'Deux points de même image',p:'Soit <i>f</i>(<i>x</i>) = <i>x</i>² − 4<i>x</i> sur ℝ. Trouve <i>x</i>′ ≠ 1 tel que <i>f</i>(<i>x</i>′) = <i>f</i>(1).',lab:'x′ =',ans:3,
   why:'f(x) − f(x′) = (x − x′)(x + x′ − 4). Avec x = 1, le second facteur s’annule pour x′ = 3. Contrôle : f(1) = f(3) = −3. f n’est donc pas injective.'},
  {h:'Le carré sur ℝ',p:'L’application <i>f</i> : ℝ → ℝ, <i>x</i> ↦ <i>x</i>² est…',
   opts:['injective mais pas surjective','surjective mais pas injective','ni injective ni surjective','bijective'],ans:2,
   why:'f(−1) = f(1) : pas injective. −1 n’a pas d’antécédent : pas surjective. En revanche, de [0 ; +∞[ vers [0 ; +∞[, elle devient bijective.'},
  {h:'Rends-la surjective',p:'Ici <i>E</i> = {1 ; 2 ; 3 ; 4} et <i>F</i> = {a ; b ; c}. Règle les images pour que <i>f</i> soit surjective.',
   params:[{id:'f1',l:'f(1)',min:0,max:2,v:0},{id:'f2',l:'f(2)',min:0,max:2,v:0},{id:'f3',l:'f(3)',min:0,max:2,v:1},{id:'f4',l:'f(4)',min:0,max:2,v:1}],
   draw:v=>sag(['1','2','3','4'],['a','b','c'],[v.f1,v.f2,v.f3,v.f4]),
   ok:v=>[0,1,2].every(j=>[v.f1,v.f2,v.f3,v.f4].includes(j)),
   why:'Chaque élément de F doit recevoir au moins une flèche. Avec 4 éléments au départ et 3 à l’arrivée, f ne peut pas être injective : deux éléments partagent une image.'},
  {h:'Enchaîner deux applications',p:`<p>Pour calculer √(<i>x</i>² + 1), on élève au carré, on ajoute 1, puis on prend la racine : on enchaîne des applications simples. En algèbre linéaire, enchaîner deux transformations du plan donnera le produit de deux matrices.</p>
<div class="def"><p>Soit <i>f</i> : <i>E</i> → <i>F</i> et <i>g</i> : <i>F</i> → <i>G</i>. La <b>composée</b> <i>g</i> ∘ <i>f</i>, qui se lit « <i>g</i> rond <i>f</i> », est l’application de <i>E</i> dans <i>G</i> définie par <b>(<i>g</i> ∘ <i>f</i>)(<i>x</i>) = <i>g</i>(<i>f</i>(<i>x</i>))</b>.</p></div>
<div class="idea"><p>On lit de droite à gauche, comme dans <i>g</i>(<i>f</i>(<i>x</i>)) : <i>f</i> agit d’abord, <i>g</i> ensuite. Il faut que l’arrivée de <i>f</i> soit le départ de <i>g</i>, sinon <i>g</i>(<i>f</i>(<i>x</i>)) n’a pas de sens.</p></div>
<div class="ex"><p>Avec <i>f</i>(<i>x</i>) = <i>x</i> + 1 et <i>g</i>(<i>x</i>) = <i>x</i>² : (<i>g</i> ∘ <i>f</i>)(<i>x</i>) = (<i>x</i> + 1)², alors que (<i>f</i> ∘ <i>g</i>)(<i>x</i>) = <i>x</i>² + 1. En <i>x</i> = 1 : (<i>g</i> ∘ <i>f</i>)(1) = 4 mais (<i>f</i> ∘ <i>g</i>)(1) = 2.</p></div>
<div class="warn"><p>En général <i>g</i> ∘ <i>f</i> ≠ <i>f</i> ∘ <i>g</i> : la composition n’est pas commutative. Elle est en revanche <b>associative</b>, <i>h</i> ∘ (<i>g</i> ∘ <i>f</i>) = (<i>h</i> ∘ <i>g</i>) ∘ <i>f</i>, car les deux côtés envoient <i>x</i> sur <i>h</i>(<i>g</i>(<i>f</i>(<i>x</i>))). On peut donc écrire <i>h</i> ∘ <i>g</i> ∘ <i>f</i> sans parenthèses.</p></div>`},
  {h:'Composition et réciproque',p:`<p>Une bijection donne exactement un antécédent à chaque <i>y</i> : on peut donc revenir en arrière sans ambiguïté. Cette marche arrière est une application à part entière, et la composition permet de dire précisément qu’elle « défait » <i>f</i>.</p>
<div class="def"><p>Soit <i>f</i> : <i>E</i> → <i>F</i> bijective. Sa <b>réciproque</b> <i>f</i>⁻¹ : <i>F</i> → <i>E</i> associe à chaque <i>y</i> son unique antécédent : <i>f</i>⁻¹(<i>y</i>) = <i>x</i> ⇔ <i>f</i>(<i>x</i>) = <i>y</i>. Elle vérifie <b><i>f</i>⁻¹ ∘ <i>f</i> = id<sub>E</sub></b> et <b><i>f</i> ∘ <i>f</i>⁻¹ = id<sub>F</sub></b>, où id<sub>E</sub> : <i>x</i> ↦ <i>x</i> est l’<b>identité</b> de <i>E</i>.</p></div>
<div class="idea"><p>Le point (<i>x</i> ; <i>y</i>) est sur le graphe de <i>f</i> exactement quand (<i>y</i> ; <i>x</i>) est sur celui de <i>f</i>⁻¹. Échanger les deux coordonnées, c’est faire la symétrie par rapport à la droite <i>y</i> = <i>x</i> : c’est ce que montre la figure.</p></div>
<div class="ex"><p><i>f</i>(<i>x</i>) = 2<i>x</i> + 1 est bijective de ℝ sur ℝ. On résout 2<i>x</i> + 1 = <i>y</i> : <i>x</i> = (<i>y</i> − 1)/2, donc <i>f</i>⁻¹(<i>y</i>) = (<i>y</i> − 1)/2. Contrôle : <i>f</i>(3) = 7 et <i>f</i>⁻¹(7) = 3.</p></div>
<div class="warn"><p>Si <i>f</i> et <i>g</i> sont bijectives, (<i>g</i> ∘ <i>f</i>)⁻¹ = <i>f</i>⁻¹ ∘ <i>g</i>⁻¹ : on défait dans l’ordre inverse, comme on retire ses chaussures avant ses chaussettes.</p></div>`,
   fig:(()=>{ const P=plane({x:[-3,4],y:[-3,4],lab:1}); P.fn(x=>x,{c:'var(--muted)',w:1.5,dash:1}).fn(x=>2*x+1).fn(x=>(x-1)/2,{c:'var(--spark)'});
     P.text(0.6,3.4,'f(x) = 2x + 1',{s:12,c:'var(--accent)'}).text(3.9,0.9,'f⁻¹',{a:'end',dy:18,s:12,c:'var(--spark)'}); return P.svg(); })(),
   note:'Ne confonds pas f⁻¹(y), image de y par la réciproque, qui exige f bijective, et f⁻¹(B), image réciproque d’un ensemble, qui existe pour toute application.'},
  {h:'Calcule une composée',p:'Soit <i>f</i>(<i>x</i>) = <i>x</i> + 3 et <i>g</i>(<i>x</i>) = <i>x</i>². Calcule (<i>g</i> ∘ <i>f</i>)(2).',lab:'(g ∘ f)(2) =',ans:25,
   why:'f(2) = 5, puis g(5) = 25. Attention, (f ∘ g)(2) = f(4) = 7 : l’ordre compte.'},
  {kind:'Méthode',h:'Prouver la surjectivité et trouver la réciproque',
   p:'<b>Quand :</b> on veut savoir si <i>f</i> : <i>E</i> → <i>F</i> est surjective ou bijective, et calculer <i>f</i>⁻¹. <b>Comment :</b> on fixe <i>y</i> ∈ <i>F</i> et on <b>résout <i>f</i>(<i>x</i>) = <i>y</i> d’inconnue <i>x</i></b>. Si, pour chaque <i>y</i>, il y a au moins une solution dans <i>E</i>, <i>f</i> est surjective. S’il y en a exactement une, <i>f</i> est bijective et cette solution est <i>f</i>⁻¹(<i>y</i>). Les <i>y</i> pour lesquels l’équation est impossible sont à retirer de l’ensemble d’arrivée.',
   demo:{enonce:'<i>f</i>(<i>x</i>) = (3<i>x</i> − 1)/(<i>x</i> + 2) sur <i>E</i> = ℝ \\ {−2}. Trouve <i>F</i> pour que <i>f</i> : <i>E</i> → <i>F</i> soit bijective, puis <i>f</i>⁻¹.',
    etapes:[{f:'(3<i>x</i> − 1)/(<i>x</i> + 2) = <i>y</i> ⇔ 3<i>x</i> − 1 = <i>y</i>(<i>x</i> + 2) ⇔ <i>x</i>(3 − <i>y</i>) = 2<i>y</i> + 1.',w:'On chasse le dénominateur, non nul car x ≠ −2, puis on regroupe les termes en x.'},
     {f:'Si <i>y</i> = 3 : 0 = 7, aucune solution.',w:'On ne peut pas diviser par 3 − y quand il est nul : on traite ce cas à part.'},
     {f:'Si <i>y</i> ≠ 3 : <i>x</i> = (2<i>y</i> + 1)/(3 − <i>y</i>), solution unique.',w:'Exactement un antécédent.'},
     {f:'Ce <i>x</i> est bien dans <i>E</i> : <i>x</i> = −2 donnerait 2<i>y</i> + 1 = −6 + 2<i>y</i>, soit 1 = −6.',w:'On vérifie que la solution n’est pas la valeur interdite.'}],
    conclusion:'<b>f : ℝ \\ {−2} → ℝ \\ {3} est bijective</b>, de réciproque f⁻¹(y) = (2y + 1)/(3 − y). Contrôle : f(0) = −1/2 et f⁻¹(−1/2) = 0/(7/2) = 0.'}},
  {kind:'Défi',h:'Réciproque',p:'<i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = 3<i>x</i> − 6 est bijective. Combien vaut <i>f</i>⁻¹(9)&nbsp;?',lab:'f⁻¹(9) =',ans:5,
   why:'On résout 3x − 6 = 9 : x = 5. Plus généralement f⁻¹(y) = (y + 6)/3.'},
  {h:'La valeur jamais atteinte',p:'Soit <i>f</i>(<i>x</i>) = (<i>x</i> + 1)/(<i>x</i> − 2) sur ℝ \\ {2}. Quelle valeur réelle <i>y</i> n’a aucun antécédent&nbsp;?',lab:'y =',ans:1,
   why:'x + 1 = y(x − 2) ⇔ x(1 − y) = −2y − 1. Pour y = 1 : 0 = −3, impossible. Pour y ≠ 1 : x = (2y + 1)/(y − 1), unique. f est une bijection de ℝ \\ {2} sur ℝ \\ {1}.'},
  {kind:'Méthode',h:'Injectivité et surjectivité d’une composée',
   p:'<b>Quand :</b> une application est obtenue en enchaînant deux autres, et on veut savoir quelles propriétés passent de l’une à l’autre. <b>Comment :</b> on écrit la définition de la propriété voulue, puis on applique celle de <i>f</i> ou de <i>g</i>, une étape à la fois. Pour l’injectivité, on part d’une égalité d’images ; pour la surjectivité, d’un élément quelconque de l’ensemble d’arrivée.',
   demo:{enonce:'Montre que si <i>f</i> : <i>E</i> → <i>F</i> et <i>g</i> : <i>F</i> → <i>G</i> sont injectives, alors <i>g</i> ∘ <i>f</i> est injective.',
    etapes:[{f:'Soit <i>x</i>, <i>x</i>′ ∈ <i>E</i> avec <i>g</i>(<i>f</i>(<i>x</i>)) = <i>g</i>(<i>f</i>(<i>x</i>′)).',w:'C’est l’hypothèse de la définition de l’injectivité, écrite pour g ∘ f.'},
     {f:'<i>g</i> est injective, donc <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>′).',w:'On « enlève » d’abord g, appliquée en dernier.'},
     {f:'<i>f</i> est injective, donc <i>x</i> = <i>x</i>′.',w:'Puis on enlève f.'}],
    conclusion:'<b>Une composée d’injections est injective.</b> De même, une composée de surjections est surjective, et une composée de bijections est bijective, avec (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.'}},
  {h:'Composée de surjections',p:'<i>f</i> : <i>E</i> → <i>F</i> et <i>g</i> : <i>F</i> → <i>G</i> sont surjectives. Quelle preuve montre que <i>g</i> ∘ <i>f</i> est surjective&nbsp;?',
   opts:['Soit x ∈ E ; alors g(f(x)) ∈ G','Soit z ∈ G. Comme g est surjective, z = g(y) avec y ∈ F ; comme f est surjective, y = f(x) avec x ∈ E. Donc z = (g ∘ f)(x)','Si g(f(x)) = g(f(x′)), alors x = x′','Soit z ∈ G. Comme f est surjective, z = f(x) avec x ∈ E'],ans:1,
   why:'Pour la surjectivité, on part d’un z quelconque de l’arrivée G et on lui construit un antécédent, en remontant g puis f. La dernière option se trompe d’ensemble : f arrive dans F, pas dans G.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Une application <i>f</i> : <i>E</i> → <i>F</i> donne à chaque <i>x</i> ∈ <i>E</i> <b>une seule</b> image <i>f</i>(<i>x</i>). Un <i>y</i> ∈ <i>F</i> peut avoir 0, 1 ou plusieurs antécédents. <i>E</i> et <i>F</i> font partie de l’application.</li>
<li>Image directe <i>f</i>(<i>A</i>) = {<i>f</i>(<i>x</i>) : <i>x</i> ∈ <i>A</i>} : on suit les variations de <i>f</i> sur <i>A</i>, en découpant là où le sens change. Image réciproque <i>f</i>⁻¹(<i>B</i>) = {<i>x</i> : <i>f</i>(<i>x</i>) ∈ <i>B</i>} : on résout la condition <i>f</i>(<i>x</i>) ∈ <i>B</i>.</li>
<li><b>Injective</b> : au plus un antécédent. On le prouve en partant de <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>′) pour arriver à <i>x</i> = <i>x</i>′ (souvent en factorisant par <i>x</i> − <i>x</i>′) ; on le réfute avec deux points distincts de même image.</li>
<li><b>Surjective</b> : au moins un antécédent. On fixe <i>y</i> et on résout <i>f</i>(<i>x</i>) = <i>y</i>. <b>Bijective</b> : exactement une solution, qui est <i>f</i>⁻¹(<i>y</i>).</li>
<li>Sur un graphe : on compte les intersections avec les droites horizontales. Strictement monotone ⇒ injective.</li>
<li>(<i>g</i> ∘ <i>f</i>)(<i>x</i>) = <i>g</i>(<i>f</i>(<i>x</i>)) : <i>f</i> d’abord. En général <i>g</i> ∘ <i>f</i> ≠ <i>f</i> ∘ <i>g</i>.</li>
<li>Composée d’injections : injective ; de surjections : surjective ; de bijections : bijective, avec (<i>g</i> ∘ <i>f</i>)⁻¹ = <i>f</i>⁻¹ ∘ <i>g</i>⁻¹.</li>
<li><i>f</i>⁻¹ ∘ <i>f</i> = id<sub>E</sub>, <i>f</i> ∘ <i>f</i>⁻¹ = id<sub>F</sub> ; le graphe de <i>f</i>⁻¹ est le symétrique de celui de <i>f</i> par rapport à <i>y</i> = <i>x</i>.</li>
</ul></div>`},
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
  {h:'Somme et multiple',p:`<p>Un système comme 2<i>x</i> + 3<i>y</i> = 8, <i>x</i> − <i>y</i> = −1 est entièrement décrit par ses coefficients. On les range dans un tableau pour calculer avec eux d’un seul bloc : c’est une matrice.</p>
<div class="def"><p>Une <b>matrice 2 × 2</b> est un tableau de quatre nombres ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])}, avec 2 lignes et 2 colonnes. Le coefficient de la ligne <i>i</i> et de la colonne <i>j</i> se note <i>a</i><sub><i>ij</i></sub>. La <b>somme</b> de deux matrices se fait <b>terme à terme</b>, et le <b>multiple</b> λ<i>A</i> multiplie chaque coefficient par le nombre λ.</p></div>
<div class="idea"><p>Pour la somme et le multiple, une matrice se comporte comme une liste de quatre nombres : on calcule case par case, comme avec les coordonnées d’un vecteur. Les règles habituelles restent donc vraies, par exemple <i>A</i> + <i>B</i> = <i>B</i> + <i>A</i> et λ(<i>A</i> + <i>B</i>) = λ<i>A</i> + λ<i>B</i>. La matrice nulle, dont les quatre coefficients valent 0, joue le rôle du zéro.</p></div>
<div class="ex"><p>${mat([[1,2],[0,3]])} + ${M([[4,-1],[2,1]])} = ${mat([[5,1],[2,4]])}, car 1 + 4 = 5, 2 + (−1) = 1, 0 + 2 = 2 et 3 + 1 = 4. Et 3·${mat([[1,2],[0,3]])} = ${mat([[3,6],[0,9]])}.</p></div>
<div class="warn"><p>Le produit de deux matrices, lui, ne se fait <b>pas</b> case par case. Il a une règle propre, qui vient de la géométrie : c’est l’objet des deux étapes suivantes.</p></div>`,
   note:'Le coefficient a<sub>ij</sub> est sur la ligne i et la colonne j. On lit toujours ligne puis colonne.'},
  {h:'Une matrice agit sur un vecteur',p:`<p>Une matrice n’est pas qu’un tableau : elle transforme les vecteurs du plan. C’est ce point de vue qui explique la règle du produit, et il servira dans tout le reste du cours.</p>
<div class="def"><p>Le produit de <i>A</i> = ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} par le vecteur colonne <i>X</i> = ${mat([['<i>x</i>'],['<i>y</i>']])} est <b><i>AX</i> = ${mat([['<i>ax</i> + <i>by</i>'],['<i>cx</i> + <i>dy</i>']])}</b> : chaque ligne de <i>A</i> est multipliée terme à terme par la colonne <i>X</i>, puis on additionne.</p></div>
<div class="idea"><p>On peut regrouper autrement : <i>AX</i> = <i>x</i>·(<i>a</i> ; <i>c</i>) + <i>y</i>·(<i>b</i> ; <i>d</i>). Le vecteur <i>AX</i> est une combinaison des deux <b>colonnes</b> de <i>A</i>. En particulier, <i>A</i> envoie (1 ; 0) sur sa 1re colonne et (0 ; 1) sur sa 2e. Sur la figure, le carré unité en pointillé devient le parallélogramme construit sur les deux colonnes.</p></div>
<div class="ex"><p>Avec <i>A</i> = ${M([[2,-1],[1,1]])} et <i>X</i> = (1 ; 2) : <i>AX</i> = (2·1 − 1·2 ; 1·1 + 1·2) = (0 ; 3). Par les colonnes : 1·(2 ; 1) + 2·(−1 ; 1) = (0 ; 3), c’est le point rouge.</p></div>
<div class="blk" data-t="Vers le produit"><p>Appliquer <i>B</i> puis <i>A</i> à un vecteur revient à appliquer une seule matrice, notée <i>AB</i>. Ses colonnes sont les images par <i>A</i> des colonnes de <i>B</i> : c’est de là que vient la règle « ligne × colonne ».</p></div>`,
   fig:(()=>{ const P=plane({x:[-2,3.5],y:[-1,3.8],lab:1}); P.rect(0,0,1,1,{c:'var(--muted)',w:1.5,dash:1}); grille(P,2,-1,1,1,0); P.arrow(2,1,0,3,{c:'var(--spark)',w:2,dash:1,op:.7}).dot(0,3,{c:'var(--bad)',l:'AX',dx:10,dy:4}).text(2,1,'col 1',{dx:6,dy:14,s:12}).text(-1,1,'col 2',{a:'end',dx:-6,s:12}); return P.svg(); })()},
  {h:'Le produit ne commute pas',p:`<p>Puisqu’une matrice transforme le plan, deux matrices s’enchaînent : on applique <i>B</i>, puis <i>A</i>. Le résultat est encore une matrice, le produit <i>AB</i>.</p>
<div class="def"><p>Le <b>produit</b> se calcule <b>ligne × colonne</b> : ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])}${mat([['<i>e</i>','<i>f</i>'],['<i>g</i>','<i>h</i>']])} = ${mat([['<i>ae</i> + <i>bg</i>','<i>af</i> + <i>bh</i>'],['<i>ce</i> + <i>dg</i>','<i>cf</i> + <i>dh</i>']])}. Le coefficient (<i>i</i>, <i>j</i>) de <i>AB</i> combine la ligne <i>i</i> de <i>A</i> et la colonne <i>j</i> de <i>B</i>.</p></div>
<div class="why"><p>La 1re colonne de <i>AB</i> doit être l’image de (1 ; 0). <i>B</i> l’envoie sur sa 1re colonne (<i>e</i> ; <i>g</i>), puis <i>A</i> envoie (<i>e</i> ; <i>g</i>) sur (<i>ae</i> + <i>bg</i> ; <i>ce</i> + <i>dg</i>) : c’est bien la 1re colonne de la formule. La 2e s’obtient de même avec (<i>f</i> ; <i>h</i>).</p></div>
<div class="idea"><p>Comme pour les applications, l’ordre se lit de droite à gauche : <i>AB</i> applique <i>B</i> d’abord. Changer l’ordre change en général le résultat. Sur la figure, <i>A</i> est un cisaillement et <i>B</i> une rotation d’un quart de tour ; le curseur échange <i>AB</i> et <i>BA</i>, et les deux images du carré unité diffèrent.</p></div>
<div class="ex"><p><i>AB</i> = ${mat([[1,1],[0,1]])}${M([[0,-1],[1,0]])} = ${M([[1,-1],[1,0]])}, mais <i>BA</i> = ${M([[0,-1],[1,1]])}. Par exemple, le coefficient (1, 1) de <i>AB</i> vaut 1·0 + 1·1 = 1, celui de <i>BA</i> vaut 0·1 + (−1)·0 = 0.</p></div>
<div class="warn"><p><b>AB ≠ BA</b> en général. Autre surprise : un produit peut être nul sans qu’aucun facteur ne le soit, ${mat([[0,1],[0,0]])}² = ${mat([[0,0],[0,0]])}.</p></div>`,
   params:[{id:'o',l:'Ordre (0 : AB, 1 : BA)',min:0,max:1,v:0}],
   draw:v=>{ const A=[[1,1],[0,1]],B=[[0,-1],[1,0]],C=v.o?mul(B,A):mul(A,B), P=plane({x:[-2.5,2.5],y:[-1.5,2.5],step:.5,lab:1});
     P.rect(0,0,1,1,{c:'var(--muted)',w:1.5,dash:1}); grille(P,C[0][0],C[0][1],C[1][0],C[1][1],0); return P.svg(); },
   info:v=>{ const A=[[1,1],[0,1]],B=[[0,-1],[1,0]]; return v.o?`BA = ${M(mul(B,A))} : cisaillement, puis rotation`:`AB = ${M(mul(A,B))} : rotation, puis cisaillement`; },
   note:`Ici <i>A</i> = ${mat([[1,1],[0,1]])} et <i>B</i> = ${M([[0,-1],[1,0]])}. Les deux carrés images sont différents : <b>AB ≠ BA</b> en général.`},
  {kind:'Méthode',h:'Poser un produit matriciel',
   p:'<b>Comment :</b> le coefficient ligne <i>i</i>, colonne <i>j</i> de <i>AB</i> s’obtient en prenant la ligne <i>i</i> de <i>A</i> et la colonne <i>j</i> de <i>B</i>, en multipliant terme à terme et en additionnant. Calcule case par case, en suivant les lignes de <i>A</i> une à une. Un produit matrice × vecteur se fait de la même façon, avec une seule colonne. Les puissances se calculent de proche en proche : <i>A</i>² = <i>AA</i>, <i>A</i>³ = <i>A</i>²<i>A</i>.',
   demo:{enonce:`Calcule <i>AB</i> avec <i>A</i> = ${mat([[1,2],[3,4]])} et <i>B</i> = ${M([[0,1],[-1,2]])}.`,
    etapes:[{f:'Case (1, 1) : ligne 1 de <i>A</i> × colonne 1 de <i>B</i> = 1·0 + 2·(−1) = −2.',w:'Ligne (1 2), colonne (0 ; −1) : le 1er avec le 1er, le 2e avec le 2e.'},
     {f:'Case (1, 2) : 1·1 + 2·2 = 5.',w:'Même ligne de A, colonne 2 de B.'},
     {f:'Case (2, 1) : 3·0 + 4·(−1) = −4. Case (2, 2) : 3·1 + 4·2 = 11.',w:'On passe à la ligne 2 de A.'},
     {f:`<i>AB</i> = ${M([[-2,5],[-4,11]])}`,w:'On range chaque résultat à sa place.'}],
    conclusion:`<b>AB = ${M([[-2,5],[-4,11]])}</b>. Dans l’autre ordre, <i>BA</i> = ${mat([[3,4],[5,6]])} : le produit ne commute pas.`}},
  {h:'Un coefficient du produit',p:`Soit <i>A</i> = ${M([[2,1],[3,-1]])} et <i>B</i> = ${M([[1,4],[-2,2]])}. Quel est le coefficient ligne 2, colonne 1 de <i>AB</i>&nbsp;?`,lab:'(AB)₂₁ =',ans:5,
   why:'Ligne 2 de A × colonne 1 de B : 3·1 + (−1)·(−2) = 3 + 2 = 5. En entier, AB = (0 10 ; 5 10).'},
  {h:'Matrice fois vecteur',p:`Calcule ${M([[2,-1],[1,3]])}${mat([['4'],['1']])}. Quelle est la <b>deuxième</b> coordonnée du résultat&nbsp;?`,lab:'2e coordonnée =',ans:7,
   why:'Ligne 2 × la colonne : 1·4 + 3·1 = 7. La première vaut 2·4 − 1·1 = 7 aussi : le résultat est (7 ; 7).'},
  {h:'Transposée et déterminant',p:`<p>Quand une matrice transforme le plan, le carré unité, d’aire 1, devient le parallélogramme construit sur ses deux colonnes. Un seul nombre dit de combien les aires sont multipliées, et si le plan est retourné : le déterminant.</p>
<div class="def"><p>Le <b>déterminant</b> de <i>A</i> = ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} est <b>det <i>A</i> = <i>ad</i> − <i>bc</i></b> : produit d’une diagonale moins produit de l’autre. Sa valeur absolue est l’aire du parallélogramme formé par les colonnes. Il est positif si l’on tourne dans le sens direct pour aller de la 1re colonne à la 2e, négatif sinon : on parle d’<b>aire orientée</b>.</p></div>
<div class="idea"><p>Règle les coefficients. Quand les deux colonnes deviennent colinéaires, le parallélogramme s’aplatit : son aire est nulle, et det = 0. Quand la 2e colonne passe de l’autre côté de la 1re, le déterminant change de signe : la matrice retourne le plan, comme un miroir.</p></div>
<div class="ex"><p>Pour ${mat([[2,1],[0,1]])}, det = 2·1 − 1·0 = 2 : les colonnes (2 ; 0) et (1 ; 1) forment un parallélogramme de base 2 et de hauteur 1, d’aire 2. Pour ${mat([[1,2],[2,4]])}, det = 4 − 4 = 0 : la 2e colonne vaut deux fois la 1re.</p></div>
<div class="blk" data-t="La transposée"><p>La <b>transposée</b> échange lignes et colonnes : ᵗ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} = ${mat([['<i>a</i>','<i>c</i>'],['<i>b</i>','<i>d</i>']])}. On a det(ᵗ<i>A</i>) = <i>ad</i> − <i>cb</i> = det <i>A</i>, et ᵗ(<i>AB</i>) = ᵗ<i>B</i> ᵗ<i>A</i> : l’ordre s’inverse.</p></div>`,
   params:[{id:'a',l:'a',min:-2,max:2,v:2},{id:'b',l:'b',min:-2,max:2,v:1},{id:'c',l:'c',min:-2,max:2,v:0},{id:'d',l:'d',min:-2,max:2,v:1}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],lab:2}); P.poly([[0,0],[v.a,v.c],[v.a+v.b,v.c+v.d],[v.b,v.d]],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2}).arrow(0,0,v.a,v.c,{c:'var(--math)'}).arrow(0,0,v.b,v.d,{c:'var(--spark)'}); return P.svg(); },
   info:v=>{ const D=v.a*v.d-v.b*v.c; return `${M([[v.a,v.b],[v.c,v.d]])} &nbsp; det = ${fmt(v.a*v.d)} − (${fmt(v.b*v.c)}) = <b>${fmt(D)}</b> ${D===0?'· colonnes colinéaires, pas inversible':D<0?'· orientation inversée':''}`; },
   note:'Pour retenir la formule, lis en croix : la diagonale qui descend (a puis d) moins celle qui monte (c puis b).'},
  {h:'Ce que dit le déterminant',p:`<p>Le déterminant tient en une formule, mais il répond à deux questions importantes : la matrice écrase-t-elle le plan&nbsp;? Et que devient l’aire quand on enchaîne deux matrices&nbsp;?</p>
<div class="thm"><p><b>1.</b> det <i>A</i> = 0 ⇔ les colonnes de <i>A</i> sont colinéaires ⇔ <i>A</i> écrase tout le plan sur une droite, ou sur le seul point 0.<br><b>2.</b> Pour toutes matrices <i>A</i> et <i>B</i> : <b>det(<i>AB</i>) = det <i>A</i> · det <i>B</i></b>.</p></div>
<div class="why"><p><b>1.</b> Un parallélogramme a une aire nulle exactement quand ses deux côtés sont portés par une même droite. Alors toutes les combinaisons <i>x</i>·(colonne 1) + <i>y</i>·(colonne 2), c’est-à-dire tous les vecteurs <i>AX</i>, restent sur cette droite. <b>2.</b> <i>B</i> multiplie les aires par det <i>B</i>, puis <i>A</i> les multiplie par det <i>A</i> : les deux facteurs se multiplient. En développant les coefficients de <i>AB</i>, on vérifie l’égalité, signe compris.</p></div>
<div class="ex"><p><i>A</i> = ${mat([[1,1],[0,1]])} et <i>B</i> = ${M([[0,-1],[1,0]])} ont pour déterminant 1 et 1 : <i>AB</i> = ${M([[1,-1],[1,0]])} a bien pour déterminant 1·0 − (−1)·1 = 1. Et <i>C</i> = ${mat([[2,0],[0,3]])}, de déterminant 6, étire de 2 en largeur et de 3 en hauteur : le carré unité devient un rectangle d’aire 6.</p></div>
<div class="warn"><p>Le déterminant n’est pas additif. Avec la matrice <b>identité</b> <i>I</i> = ${mat([[1,0],[0,1]])}, det(<i>I</i> + <i>I</i>) = det(2<i>I</i>) = 4, alors que det <i>I</i> + det <i>I</i> = 2. De même det(λ<i>A</i>) = λ² det <i>A</i>, car chacune des deux colonnes est multipliée par λ.</p></div>`},
  {h:'Laquelle n’est pas inversible&nbsp;?',p:'Une matrice est inversible si et seulement si son déterminant est non nul. Laquelle n’est <b>pas</b> inversible&nbsp;?',
   opts:[mat([[1,2],[3,4]]),mat([[2,3],[4,6]]),mat([[0,1],[1,0]]),mat([[1,1],[0,1]])],ans:1,
   why:'det = 2·6 − 3·4 = 0 : la 2e colonne vaut 1,5 fois la 1re. Les autres ont pour déterminant −2, −1 et 1.'},
  {h:'L’inverse',p:`<p>Pour résoudre 3<i>x</i> = 6, on multiplie par 1/3, l’inverse de 3. Pour résoudre <i>AX</i> = <i>B</i>, on aimerait de même une matrice qui « défait » <i>A</i>.</p>
<div class="def"><p>La <b>matrice identité</b> <i>I</i> = ${mat([[1,0],[0,1]])} vérifie <i>IX</i> = <i>X</i> pour tout vecteur et <i>AI</i> = <i>IA</i> = <i>A</i> : c’est le 1 des matrices. <i>A</i> est <b>inversible</b> s’il existe une matrice <i>A</i>⁻¹ telle que <i>AA</i>⁻¹ = <i>A</i>⁻¹<i>A</i> = <i>I</i>.</p></div>
<div class="thm"><p><i>A</i> est inversible si et seulement si det <i>A</i> ≠ 0, et alors <b><i>A</i>⁻¹ = ${F(1,'<i>ad</i> − <i>bc</i>')} ${mat([['<i>d</i>','−<i>b</i>'],['−<i>c</i>','<i>a</i>']])}</b>.</p></div>
<div class="why"><p>Un calcul ligne × colonne donne ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])}${mat([['<i>d</i>','−<i>b</i>'],['−<i>c</i>','<i>a</i>']])} = (<i>ad</i> − <i>bc</i>)<i>I</i>. Si det ≠ 0, on divise par det : c’est la formule. Si det = 0, aucune inverse n’existe : on aurait 1 = det <i>I</i> = det(<i>AA</i>⁻¹) = det <i>A</i> · det <i>A</i>⁻¹ = 0. Géométriquement, <i>A</i> a écrasé le plan sur une droite, et rien ne peut le « déplier ».</p></div>
<div class="ex"><p>Pour ${mat([[2,1],[5,3]])}, det = 6 − 5 = 1 : on échange 2 et 3, on change le signe de 1 et de 5, et on divise par 1. L’inverse est ${M([[3,-1],[-5,2]])}. Contrôle : ligne 1 × colonne 1 = 2·3 + 1·(−5) = 1, ligne 1 × colonne 2 = 2·(−1) + 1·2 = 0.</p></div>`,
   note:'Vérifie toujours en calculant AA⁻¹ : tu dois retrouver I. Et (AB)⁻¹ = B⁻¹A⁻¹.'},
  {kind:'Méthode',h:'Inverser une matrice 2 × 2 avec la formule',
   p:`<b>Quand :</b> pour une matrice 2 × 2 dont on veut l’inverse, par exemple pour résoudre <i>AX</i> = <i>B</i>. <b>Comment :</b> 1) calcule det <i>A</i> = <i>ad</i> − <i>bc</i> ; s’il est nul, il n’y a pas d’inverse ; 2) échange <i>a</i> et <i>d</i>, change le signe de <i>b</i> et de <i>c</i> ; 3) divise par det <i>A</i> ; 4) vérifie <i>AA</i>⁻¹ = <i>I</i>. <b>Pourquoi ça marche :</b> ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])}${mat([['<i>d</i>','−<i>b</i>'],['−<i>c</i>','<i>a</i>']])} = (<i>ad</i> − <i>bc</i>)<i>I</i>.`,
   demo:{enonce:`Inverse <i>A</i> = ${mat([[3,4],[1,2]])}.`,
    etapes:[{f:'det <i>A</i> = 3·2 − 4·1 = 2 ≠ 0.',w:'A est inversible.'},
     {f:`${M([[2,-4],[-1,3]])}`,w:'On échange 3 et 2 sur la diagonale, et on change le signe de 4 et de 1.'},
     {f:`<i>A</i>⁻¹ = ${F(1,2)} ${M([[2,-4],[-1,3]])} = ${M([[1,-2],[-0.5,1.5]])}`,w:'On divise par le déterminant.'},
     {f:'Contrôle : ligne 1 de <i>A</i> × colonne 1 de <i>A</i>⁻¹ = 3·1 + 4·(−0,5) = 1 ; ligne 1 × colonne 2 = 3·(−2) + 4·1,5 = 0.',w:'On vérifie au moins une ligne de AA⁻¹ = I. La ligne 2 donne 0 et 1.'}],
    conclusion:`<b>A⁻¹ = ${M([[1,-2],[-0.5,1.5]])}</b>.`}},
  {h:'Calcule une inverse',p:`Soit <i>A</i> = ${mat([[4,7],[2,4]])}. Quel est le coefficient en haut à droite de <i>A</i>⁻¹&nbsp;? Donne la valeur décimale exacte.`,lab:'coefficient =',ans:-3.5,tol:.001,
   why:'det A = 16 − 14 = 2, donc A⁻¹ = ½ (4 −7 ; −2 4) = (2 −3,5 ; −1 2). Le coefficient cherché est −7/2 = −3,5.'},
  {kind:'Méthode',h:'Inverser par la méthode de Gauss-Jordan',
   p:'<b>Quand :</b> c’est la méthode qui marche en toute dimension, alors que la formule est propre au 2 × 2. <b>Comment :</b> on écrit côte à côte [<i>A</i> | <i>I</i>], puis on applique aux <b>lignes entières</b> trois opérations : échanger deux lignes, multiplier une ligne par un nombre non nul, ajouter à une ligne un multiple d’une autre. On vise <i>I</i> à gauche, et on lit alors <i>A</i>⁻¹ à droite. <b>Pourquoi :</b> chaque opération revient à multiplier à gauche par une matrice inversible. Si leur produit <i>E</i> vérifie <i>EA</i> = <i>I</i>, alors <i>E</i> = <i>A</i>⁻¹, et c’est <i>EI</i> = <i>A</i>⁻¹ qui apparaît à droite.',
   demo:{enonce:`Inverse <i>A</i> = ${mat([[1,2],[3,5]])}.`,
    etapes:[{f:`[<i>A</i> | <i>I</i>] = ${mat([['1','2','|','1','0'],['3','5','|','0','1']])}`,w:'On accole l’identité à droite.'},
     {f:`<i>L</i>₂ ← <i>L</i>₂ − 3<i>L</i>₁ : ${M([[1,2,'|',1,0],[0,-1,'|',-3,1]])}`,w:'On annule le coefficient sous le premier pivot.'},
     {f:`<i>L</i>₂ ← −<i>L</i>₂ : ${M([[1,2,'|',1,0],[0,1,'|',3,-1]])}`,w:'On rend le second pivot égal à 1.'},
     {f:`<i>L</i>₁ ← <i>L</i>₁ − 2<i>L</i>₂ : ${M([[1,0,'|',-5,2],[0,1,'|',3,-1]])}`,w:'On annule le coefficient au-dessus du second pivot : I est à gauche.'}],
    conclusion:`<b>A⁻¹ = ${M([[-5,2],[3,-1]])}</b>. Contrôle avec la formule : det A = −1, et (1/(−1))·${M([[5,-2],[-3,1]])} donne la même matrice.`}},
  {h:'Gauss-Jordan pas à pas',p:`On inverse <i>A</i> = ${mat([[2,4],[1,3]])} par Gauss-Jordan : <i>L</i>₁ ← <i>L</i>₁/2, puis <i>L</i>₂ ← <i>L</i>₂ − <i>L</i>₁, puis <i>L</i>₁ ← <i>L</i>₁ − 2<i>L</i>₂. Quel est le coefficient en bas à gauche de <i>A</i>⁻¹&nbsp;? Donne la valeur décimale.`,lab:'coefficient =',ans:-0.5,tol:.001,
   why:'[2 4 | 1 0 ; 1 3 | 0 1] → L₁/2 : [1 2 | 0,5 0] → L₂ − L₁ : [0 1 | −0,5 1] → L₁ − 2L₂ : [1 0 | 1,5 −2]. Donc A⁻¹ = (1,5 −2 ; −0,5 1), ce que confirme la formule avec det A = 2.'},
  {h:'Un système, deux droites',p:`<p>Un système de deux équations à deux inconnues peut avoir une solution, aucune, ou une infinité. Les matrices permettent de savoir dans quel cas on est avant même de calculer.</p>
<div class="def"><p>Le système <i>ax</i> + <i>by</i> = <i>p</i>, <i>cx</i> + <i>dy</i> = <i>q</i> s’écrit <b><i>AX</i> = <i>B</i></b>, avec <i>A</i> = ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} la matrice des coefficients, <i>X</i> = (<i>x</i> ; <i>y</i>) l’inconnue et <i>B</i> = (<i>p</i> ; <i>q</i>) le <b>second membre</b>.</p></div>
<div class="thm"><p>Si det <i>A</i> ≠ 0, le système a une <b>solution unique</b> : <i>X</i> = <i>A</i>⁻¹<i>B</i>. Si det <i>A</i> = 0, il a soit <b>aucune</b> solution, soit une <b>infinité</b>.</p></div>
<div class="why"><p>Si <i>A</i>⁻¹ existe, on multiplie <i>AX</i> = <i>B</i> à gauche par <i>A</i>⁻¹ et il reste <i>X</i> = <i>A</i>⁻¹<i>B</i> : la solution est forcée. Géométriquement, chaque équation décrit une droite du plan. det <i>A</i> ≠ 0 dit que les lignes (<i>a</i> <i>b</i>) et (<i>c</i> <i>d</i>) ne sont pas proportionnelles : les deux droites n’ont pas la même direction, donc elles se coupent en un seul point. Si det <i>A</i> = 0, elles sont parallèles : disjointes, ou confondues.</p></div>
<div class="ex"><p><i>x</i> + <i>y</i> = 5 et <i>x</i> − 2<i>y</i> = −1 : det = −2 − 1 = −3 ≠ 0. En soustrayant, 3<i>y</i> = 6, donc <i>y</i> = 2 et <i>x</i> = 3 : une seule solution, (3 ; 2). Au contraire, <i>x</i> + <i>y</i> = 1 et 2<i>x</i> + 2<i>y</i> = 3 : det = 2 − 2 = 0, et la 2e équation dit <i>x</i> + <i>y</i> = 1,5. Les deux droites sont parallèles : aucune solution.</p></div>`},
  {kind:'Méthode',h:'Résoudre un système 2 × 2',
   p:'Trois façons, à choisir selon le système. <b>Combinaison :</b> on multiplie les équations par des nombres choisis pour qu’en les ajoutant une inconnue disparaisse. <b>Inverse :</b> <i>AX</i> = <i>B</i> donne <i>X</i> = <i>A</i>⁻¹<i>B</i> si det <i>A</i> ≠ 0. <b>Cramer :</b> si det <i>A</i> ≠ 0, <b><i>x</i> = det <i>A<sub>x</sub></i> / det <i>A</i></b> et <b><i>y</i> = det <i>A<sub>y</sub></i> / det <i>A</i></b>, où <i>A<sub>x</sub></i> est <i>A</i> dont la 1re colonne est remplacée par <i>B</i> (la 2e pour <i>A<sub>y</sub></i>). Cramer, c’est <i>X</i> = <i>A</i>⁻¹<i>B</i> écrit avec la formule de l’inverse.',
   demo:{enonce:'Résous 2<i>x</i> + 3<i>y</i> = 8 et <i>x</i> − <i>y</i> = −1.',
    etapes:[{f:`<i>A</i> = ${M([[2,3],[1,-1]])}, det <i>A</i> = 2·(−1) − 3·1 = −5 ≠ 0.`,w:'Le déterminant non nul garantit une solution unique.'},
     {f:`<i>x</i> = ${F('det '+M([[8,3],[-1,-1]]),'−5')} = ${F('−8 + 3','−5')} = 1`,w:'On remplace la 1re colonne, celle de x, par le second membre (8 ; −1).'},
     {f:`<i>y</i> = ${F('det '+M([[2,8],[1,-1]]),'−5')} = ${F('−2 − 8','−5')} = 2`,w:'Pour y, on remplace la 2e colonne.'},
     {f:'Par combinaison : <i>L</i>₁ + 3<i>L</i>₂ donne 5<i>x</i> = 5, donc <i>x</i> = 1, puis <i>y</i> = <i>x</i> + 1 = 2.',w:'Autre méthode, pour contrôler : on élimine y.'},
     {f:'Vérification : 2 + 6 = 8 et 1 − 2 = −1.',w:'On remplace dans les deux équations de départ.'}],
    conclusion:'La solution est <b>(x ; y) = (1 ; 2)</b>.'},
   note:'Avec Cramer, le dénominateur est toujours det A ; seul le numérateur change, selon l’inconnue cherchée.'},
  {h:'Résoudre un système',p:`Le système 2<i>x</i> + <i>y</i> = 5, <i>x</i> − <i>y</i> = 1 s’écrit <i>AX</i> = <i>B</i> avec <i>A</i> = ${M([[2,1],[1,-1]])}. Comme det <i>A</i> = −3 ≠ 0, la solution est unique : <i>X</i> = <i>A</i>⁻¹<i>B</i>. Géométriquement, c’est l’intersection de deux droites. Place le point dessus.`,
   params:[{id:'x',l:'x',min:-2,max:4,step:.5,v:0},{id:'y',l:'y',min:-2,max:4,step:.5,v:0}],
   draw:v=>{ const P=plane({x:[-2.5,4.5],y:[-2.5,4.5],lab:1}); P.fn(x=>5-2*x,{c:'var(--math)'}).fn(x=>x-1,{c:'var(--spark)'}).dot(v.x,v.y,{c:'var(--bad)',l:`(${fmt(v.x)} ; ${fmt(v.y)})`}); return P.svg(); },
   info:v=>`2x + y = ${fmt(2*v.x+v.y)} (cible 5) · x − y = ${fmt(v.x-v.y)} (cible 1)`,
   ok:v=>v.x===2&&v.y===1,why:'En additionnant les deux équations : 3x = 6, donc x = 2, puis y = x − 1 = 1.',
   note:'Si det A = 0, les droites sont parallèles (aucune solution) ou confondues (une infinité).'},
  {kind:'Défi',h:'Système par Cramer',p:'Résous 3<i>x</i> + 2<i>y</i> = 7 et <i>x</i> + 4<i>y</i> = 9. Combien vaut <i>y</i>&nbsp;?',lab:'y =',ans:2,
   why:'det = 3·4 − 2·1 = 10. Cramer : y = (3·9 − 7·1)/10 = 20/10 = 2, et x = (7·4 − 2·9)/10 = 1. Vérification : 3 + 4 = 7 et 1 + 8 = 9.'},
  {kind:'Méthode',h:'Un système dont le déterminant est nul',
   p:'<b>Quand :</b> det <i>A</i> = 0, par exemple quand on cherche un équilibre (<i>M</i> − <i>I</i>)<i>X</i> = 0. Les deux lignes de <i>A</i> sont alors proportionnelles. <b>Comment :</b> on combine les équations pour éliminer une inconnue, ce qui donne « 0 = <i>k</i> ». Si <i>k</i> ≠ 0 : <b>aucune solution</b> (droites parallèles). Si <i>k</i> = 0 : une seule équation suffit, et il y a <b>une infinité de solutions</b> (une droite), qu’on écrit avec un paramètre. Une condition supplémentaire, comme un total imposé, peut alors fixer une solution.',
   demo:{enonce:'Résous 2<i>x</i> − 4<i>y</i> = 2 et −<i>x</i> + 2<i>y</i> = −1, puis trouve la solution qui vérifie aussi <i>x</i> + <i>y</i> = 7.',
    etapes:[{f:'det = 2·2 − (−4)·(−1) = 0.',w:'Pas de solution unique : on regarde si le système est compatible.'},
     {f:'<i>L</i>₁ + 2<i>L</i>₂ : 0 = 2 − 2 = 0.',w:'La 1re équation vaut −2 fois la 2e : elles décrivent la même droite.'},
     {f:'Il reste <i>x</i> = 1 + 2<i>y</i> : les solutions sont (1 + 2<i>t</i> ; <i>t</i>), <i>t</i> ∈ ℝ.',w:'y est libre ; on l’appelle t.'},
     {f:'Avec <i>x</i> + <i>y</i> = 7 : 1 + 3<i>t</i> = 7, donc <i>t</i> = 2 et (<i>x</i> ; <i>y</i>) = (5 ; 2).',w:'La condition supplémentaire choisit un point sur la droite. Contrôle : 10 − 8 = 2 et −5 + 4 = −1.'}],
    conclusion:'Infinité de solutions (1 + 2t ; t), et <b>(5 ; 2)</b> avec la condition x + y = 7. Si le second membre de L₂ avait été 3, on aurait obtenu 0 = 8 : aucune solution.'}},
  {h:'Parallèles ou confondues',p:'Pour quelle valeur de <i>k</i> le système <i>x</i> + 2<i>y</i> = 3, 2<i>x</i> + 4<i>y</i> = <i>k</i> a-t-il une infinité de solutions&nbsp;?',lab:'k =',ans:6,
   why:'det = 4 − 4 = 0. L₂ − 2L₁ donne 0 = k − 6. Infinité de solutions si k = 6 (droites confondues), aucune sinon (droites parallèles).'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Somme et multiple : terme à terme. Le coefficient <i>a</i><sub><i>ij</i></sub> est ligne <i>i</i>, colonne <i>j</i>.</li>
<li><i>AX</i> = <i>x</i>·(colonne 1) + <i>y</i>·(colonne 2) : les colonnes de <i>A</i> sont les images de (1 ; 0) et (0 ; 1).</li>
<li>Produit <b>ligne × colonne</b> ; <i>AB</i> applique <i>B</i> puis <i>A</i>. En général <i>AB</i> ≠ <i>BA</i>. Puissances de proche en proche : <i>A</i>² = <i>AA</i>.</li>
<li>det <i>A</i> = <i>ad</i> − <i>bc</i>, aire orientée du parallélogramme des colonnes. det = 0 ⇔ colonnes colinéaires. det(<i>AB</i>) = det <i>A</i> · det <i>B</i>, det(ᵗ<i>A</i>) = det <i>A</i>, mais det(<i>A</i> + <i>B</i>) ≠ det <i>A</i> + det <i>B</i> en général.</li>
<li>ᵗ<i>A</i> échange lignes et colonnes ; ᵗ(<i>AB</i>) = ᵗ<i>B</i> ᵗ<i>A</i>.</li>
<li><i>A</i> inversible ⇔ det <i>A</i> ≠ 0, et <i>A</i>⁻¹ = (1/det <i>A</i>)(<i>d</i> −<i>b</i> ; −<i>c</i> <i>a</i>). Contrôle : <i>AA</i>⁻¹ = <i>I</i>. (<i>AB</i>)⁻¹ = <i>B</i>⁻¹<i>A</i>⁻¹.</li>
<li>Gauss-Jordan : on transforme [<i>A</i> | <i>I</i>] par opérations sur les lignes jusqu’à [<i>I</i> | <i>A</i>⁻¹].</li>
<li>Système <i>AX</i> = <i>B</i> : si det <i>A</i> ≠ 0, solution unique <i>X</i> = <i>A</i>⁻¹<i>B</i>, ou par Cramer <i>x</i> = det <i>A<sub>x</sub></i>/det <i>A</i>, <i>y</i> = det <i>A<sub>y</sub></i>/det <i>A</i>. Si det <i>A</i> = 0 : en combinant, on obtient 0 = <i>k</i> ; aucune solution si <i>k</i> ≠ 0, une droite de solutions (avec un paramètre) si <i>k</i> = 0.</li>
</ul></div>`},
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
  {h:'Combinaisons linéaires',p:`<p>Avec deux vecteurs et les deux opérations sur les vecteurs, l’addition et la multiplication par un nombre, on fabrique beaucoup d’autres vecteurs. Question centrale du chapitre : lesquels&nbsp;? Tous ceux du plan, ou seulement certains&nbsp;?</p>
<div class="def"><p>Une <b>combinaison linéaire</b> de <b>u</b> et <b>v</b> est un vecteur de la forme α<b>u</b> + β<b>v</b>, où α et β sont des réels appelés <b>coefficients</b>. Dans ℝ², on calcule coordonnée par coordonnée : α(<i>u</i>₁ ; <i>u</i>₂) + β(<i>v</i>₁ ; <i>v</i>₂) = (α<i>u</i>₁ + β<i>v</i>₁ ; α<i>u</i>₂ + β<i>v</i>₂).</p></div>
<div class="idea"><p>On marche α fois le long de <b>u</b>, puis β fois le long de <b>v</b>, et on regarde où l’on arrive. Sur la figure, <b>u</b> = (1 ; 2) est en bleu, <b>v</b> = (1 ; −1) en jaune, et le résultat est la flèche épaisse. Un coefficient négatif fait marcher à reculons.</p></div>
<div class="ex"><p>Avec α = 1 et β = 1 : <b>u</b> + <b>v</b> = (1 + 1 ; 2 − 1) = (2 ; 1). Avec α = −1 et β = 2 : −<b>u</b> + 2<b>v</b> = (−1 + 2 ; −2 − 2) = (1 ; −4).</p></div>
<div class="warn"><p>Le vecteur nul est toujours une combinaison linéaire : 0<b>u</b> + 0<b>v</b> = <b>0</b>. La vraie question est de savoir s’il existe une autre façon de l’obtenir : c’est l’indépendance, deux étapes plus loin.</p></div>`,
   params:[{id:'a',l:'α',min:-2,max:3,step:.5,v:1},{id:'b',l:'β',min:-2,max:3,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-5,6],y:[-5,6],lab:2}), ax=v.a, ay=2*v.a; P.arrow(0,0,ax,ay,{c:'var(--math)'}).arrow(ax,ay,ax+v.b,ay-v.b,{c:'var(--spark)'}).arrow(0,0,ax+v.b,ay-v.b,{w:4}); return P.svg(); },
   info:v=>`${fmt(v.a)}·u + ${fmt(v.b)}·v = (${fmt(v.a+v.b)} ; ${fmt(2*v.a-v.b)})`},
  {h:'Atteins la cible',p:'Trouve α et β pour que α<b>u</b> + β<b>v</b> = (1 ; 5).',
   params:[{id:'a',l:'α',min:-2,max:3,step:.5,v:0},{id:'b',l:'β',min:-2,max:3,step:.5,v:0}],
   draw:v=>{ const P=plane({x:[-5,6],y:[-5,6],lab:2}), ax=v.a, ay=2*v.a; P.dot(1,5,{c:'var(--bad)',l:'(1 ; 5)'}).arrow(0,0,ax,ay,{c:'var(--math)'}).arrow(ax,ay,ax+v.b,ay-v.b,{c:'var(--spark)'}); return P.svg(); },
   info:v=>`(${fmt(v.a+v.b)} ; ${fmt(2*v.a-v.b)})`,
   ok:v=>v.a===2&&v.b===-1,why:'On résout α + β = 1 et 2α − β = 5. En additionnant : 3α = 6, donc α = 2 et β = −1.'},
  {h:'Libre ou liée',p:`<p>Peut-on fabriquer le vecteur nul autrement qu’avec des coefficients nuls&nbsp;? Si oui, l’un des deux vecteurs est superflu : il est déjà un multiple de l’autre, et toutes les combinaisons restent sur une droite.</p>
<div class="def"><p>La famille (<b>u</b>, <b>v</b>) est <b>libre</b>, ou <b>linéairement indépendante</b>, si α<b>u</b> + β<b>v</b> = <b>0</b> impose α = β = 0. Sinon elle est <b>liée</b>. Le <b>déterminant</b> de deux vecteurs est det(<b>u</b>, <b>v</b>) = <i>u</i>₁<i>v</i>₂ − <i>u</i>₂<i>v</i>₁ : c’est celui de la matrice dont ils sont les colonnes.</p></div>
<div class="thm"><p>Dans ℝ², (<b>u</b>, <b>v</b>) est liée ⇔ l’un des vecteurs est multiple de l’autre (ils sont <b>colinéaires</b>) ⇔ <b>det(<b>u</b>, <b>v</b>) = 0</b>.</p></div>
<div class="why"><p>Si α<b>u</b> + β<b>v</b> = <b>0</b> avec β ≠ 0, alors <b>v</b> = −(α/β)<b>u</b> : <b>v</b> est un multiple de <b>u</b>. On raisonne de même si α ≠ 0. Le déterminant est l’aire orientée du parallélogramme construit sur <b>u</b> et <b>v</b> : elle est nulle exactement quand les deux vecteurs sont sur une même droite.</p></div>
<div class="ex"><p>Avec <b>u</b> = (2 ; 1) et <b>v</b> = (1 ; 2) : det = 2·2 − 1·1 = 3 ≠ 0, la famille est libre. Avec <b>v</b> = (−2 ; −1) = −<b>u</b> : det = 2·(−1) − 1·(−2) = 0, la famille est liée, et <b>u</b> + <b>v</b> = <b>0</b>. Règle <b>v</b> sur la figure : quand la famille est libre, la grille de ses combinaisons recouvre tout le plan.</p></div>`,
   params:[{id:'x',l:'v₁',min:-3,max:3,v:1},{id:'y',l:'v₂',min:-3,max:3,v:2}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],grid:false}), D=2*v.y-v.x;
     if(D!==0){ for(let i=-6;i<=6;i++){ P.seg(i*2-6*v.x,i-6*v.y,i*2+6*v.x,i+6*v.y,{c:'var(--line)',w:1}).seg(i*v.x-12,i*v.y-6,i*v.x+12,i*v.y+6,{c:'var(--line)',w:1}); } }
     else ln(P,2,1,{c:'var(--accent)',w:6,op:.3});
     P.arrow(0,0,2,1,{c:'var(--math)'}); if(v.x||v.y) P.arrow(0,0,v.x,v.y,{c:'var(--spark)'}); return P.svg(); },
   info:v=>{ const D=2*v.y-v.x; return `det(u, v) = 2·${fmt(v.y)} − 1·${fmt(v.x)} = <b>${fmt(D)}</b> : ${D?'famille <b>libre</b>, les combinaisons couvrent tout le plan':'famille <b>liée</b>, les combinaisons restent sur une droite'}`; }},
  {kind:'Méthode',h:'Tester l’indépendance linéaire',
   p:'<b>Dans ℝ², pour deux vecteurs :</b> calcule det(<b>u</b>, <b>v</b>) = <i>u</i>₁<i>v</i>₂ − <i>u</i>₂<i>v</i>₁. S’il est non nul, la famille est libre ; s’il est nul, elle est liée, et on cherche λ tel que <b>v</b> = λ<b>u</b>. <b>En général</b>, en toute dimension : on résout α<b>u</b> + β<b>v</b> = <b>0</b> ; si la seule solution est α = β = 0, la famille est libre. <b>Pourquoi le déterminant :</b> le système α<b>u</b> + β<b>v</b> = <b>0</b> a pour matrice (<b>u</b> | <b>v</b>), et sa solution est unique, donc nulle, exactement quand ce déterminant est non nul.',
   demo:{enonce:'Les familles ((2 ; −3), (−4 ; 6)) et ((1 ; 2), (3 ; 4)) sont-elles libres&nbsp;?',
    etapes:[{f:'det((2 ; −3), (−4 ; 6)) = 2·6 − (−3)·(−4) = 12 − 12 = 0.',w:'Produit en croix des coordonnées.'},
     {f:'(−4 ; 6) = −2·(2 ; −3) : la 1re famille est liée.',w:'On exhibe la relation, ce qui confirme le calcul.'},
     {f:'det((1 ; 2), (3 ; 4)) = 1·4 − 2·3 = −2 ≠ 0.',w:'Déterminant non nul.'},
     {f:'Contrôle par la définition : α + 3β = 0 et 2α + 4β = 0. En retranchant 2 fois la 1re de la 2e : −2β = 0, donc β = 0, puis α = 0.',w:'La seule combinaison nulle est la combinaison triviale.'}],
    conclusion:'La 1re famille est <b>liée</b>, la 2e est <b>libre</b> : c’est donc une base de ℝ².'}},
  {h:'Repère la famille liée',p:'Laquelle de ces familles est <b>liée</b>&nbsp;?',
   opts:['(1 ; 2) et (2 ; 1)','(1 ; 0) et (1 ; 1)','(3 ; −1) et (−6 ; 2)','(0 ; 1) et (1 ; 0)'],ans:2,
   why:'(−6 ; 2) = −2·(3 ; −1). Le déterminant vaut 3·2 − (−1)·(−6) = 6 − 6 = 0.'},
  {h:'Sous-espaces vectoriels',p:`<p>Certaines parties du plan sont « fermées » pour les opérations sur les vecteurs : on peut additionner deux de leurs vecteurs et les multiplier par des nombres sans jamais en sortir. Ce sont elles qui joueront plus tard le rôle de noyaux, d’images et d’espaces propres.</p>
<div class="def"><p>Un <b>sous-espace vectoriel</b> de ℝ² est une partie <i>F</i> non vide, <b>stable par combinaison linéaire</b> : si <b>u</b>, <b>v</b> ∈ <i>F</i> et α, β ∈ ℝ, alors α<b>u</b> + β<b>v</b> ∈ <i>F</i>.</p></div>
<div class="prop"><p>Un sous-espace contient toujours <b>0</b>. Dans ℝ², il n’y en a que trois sortes : {<b>0</b>}, les <b>droites passant par l’origine</b>, et ℝ² lui-même.</p></div>
<div class="why"><p>Si <b>u</b> ∈ <i>F</i>, alors 0·<b>u</b> = <b>0</b> ∈ <i>F</i>. Si <i>F</i> contient un vecteur <b>u</b> ≠ <b>0</b>, il contient tous ses multiples <i>t</i><b>u</b> : toute une droite par l’origine. S’il contient en plus un vecteur non colinéaire à <b>u</b>, il contient toutes leurs combinaisons, donc tout le plan, comme on l’a vu avec les familles libres.</p></div>
<div class="ex"><p>La droite <i>y</i> = <i>x</i>/2, en vert, est un sous-espace : si <i>y</i> = <i>x</i>/2 et <i>y</i>′ = <i>x</i>′/2, alors α<i>y</i> + β<i>y</i>′ = (α<i>x</i> + β<i>x</i>′)/2. La droite <i>y</i> = <i>x</i>/2 + 1, en rouge, n’en est pas un : elle ne passe pas par l’origine.</p></div>`,
   fig:(()=>{ const P=plane({x:[-4,4],y:[-3,3],lab:1}); P.fn(x=>x/2,{c:'var(--ok)'}).fn(x=>x/2+1,{c:'var(--bad)',dash:1}); P.dot(0,0,{r:4,c:'var(--ink)'}).text(-3.9,0.4,'y = x/2 + 1 : non',{s:12,c:'var(--bad)'}).text(-3.9,-2.6,'y = x/2 : oui',{s:12,c:'var(--ok)'}); return P.svg(); })(),
   note:'Test rapide : si 0 n’est pas dans F, ce n’est pas un sous-espace. La droite y = x/2 + 1 ne passe pas par l’origine.'},
  {kind:'Méthode',h:'Montrer qu’une partie est un sous-espace, ou non',
   p:'<b>Pour prouver que <i>F</i> est un sous-espace :</b> 1) vérifie <b>0</b> ∈ <i>F</i> ; 2) prends <b>u</b>, <b>v</b> ∈ <i>F</i> et α, β réels quelconques, et montre α<b>u</b> + β<b>v</b> ∈ <i>F</i> à l’aide de l’équation qui définit <i>F</i>. <b>Pour prouver que ce n’en est pas un :</b> un seul contre-exemple suffit : <b>0</b> ∉ <i>F</i>, ou deux vecteurs de <i>F</i> dont la somme sort de <i>F</i>, ou un vecteur dont un multiple sort de <i>F</i>.',
   demo:{enonce:'<i>F</i> = {(<i>x</i> ; <i>y</i>) : 2<i>x</i> − <i>y</i> = 0} et <i>G</i> = {(<i>x</i> ; <i>y</i>) : <i>y</i> = <i>x</i>²} sont-ils des sous-espaces&nbsp;?',
    etapes:[{f:'(0 ; 0) ∈ <i>F</i>, car 2·0 − 0 = 0.',w:'Premier test, le plus rapide.'},
     {f:'Si 2<i>x</i> − <i>y</i> = 0 et 2<i>x</i>′ − <i>y</i>′ = 0, alors 2(α<i>x</i> + β<i>x</i>′) − (α<i>y</i> + β<i>y</i>′) = α(2<i>x</i> − <i>y</i>) + β(2<i>x</i>′ − <i>y</i>′) = 0.',w:'On regroupe pour faire apparaître les deux équations connues, qui valent 0.'},
     {f:'<i>F</i> est un sous-espace : c’est la droite <i>y</i> = 2<i>x</i>.',w:'Les deux conditions sont vérifiées.'},
     {f:'(1 ; 1) ∈ <i>G</i>, mais 2·(1 ; 1) = (2 ; 2) ∉ <i>G</i>, car 2 ≠ 2².',w:'G contient 0, donc ce test ne suffit pas : on cherche un contre-exemple à la stabilité.'}],
    conclusion:'<b>F est un sous-espace, G n’en est pas un.</b> Retiens aussi : l’intersection de deux sous-espaces en est toujours un, mais l’union de deux droites distinctes n’en est jamais un, car la somme de leurs vecteurs directeurs en sort.'}},
  {h:'Lequel est un sous-espace&nbsp;?',p:'Laquelle de ces parties de ℝ² est un sous-espace vectoriel&nbsp;?',
   opts:['{(<i>x</i> ; <i>y</i>) : <i>y</i> = <i>x</i> + 1}','{(<i>x</i> ; <i>y</i>) : <i>x</i> ≥ 0}','{(<i>x</i> ; <i>y</i>) : <i>xy</i> = 0}','{(<i>x</i> ; <i>y</i>) : <i>y</i> = 3<i>x</i>}'],ans:3,
   why:'y = 3x est une droite par l’origine. y = x + 1 ne contient pas 0. x ≥ 0 n’est pas stable par −1. xy = 0 (les deux axes) n’est pas stable par addition : (1 ; 0) + (0 ; 1) = (1 ; 1).'},
  {h:'Le sous-espace engendré',p:`<p>À partir d’un ou deux vecteurs, quel est le plus petit sous-espace qui les contient&nbsp;? Il doit contenir toutes leurs combinaisons linéaires, et on va voir que cela suffit.</p>
<div class="def"><p>Le <b>sous-espace engendré</b> par <b>u</b> et <b>v</b> est <b>Vect(<b>u</b>, <b>v</b>) = {α<b>u</b> + β<b>v</b> : α, β ∈ ℝ}</b>, l’ensemble de toutes leurs combinaisons linéaires. Pour un seul vecteur, Vect(<b>u</b>) = {<i>t</i><b>u</b> : <i>t</i> ∈ ℝ}. La famille (<b>u</b>, <b>v</b>) est <b>génératrice</b> de ℝ² si Vect(<b>u</b>, <b>v</b>) = ℝ².</p></div>
<div class="why"><p>Vect(<b>u</b>, <b>v</b>) est un sous-espace : une combinaison de combinaisons de <b>u</b> et <b>v</b> en est encore une, par exemple 2(<b>u</b> + <b>v</b>) + 3(<b>u</b> − <b>v</b>) = 5<b>u</b> − <b>v</b>. Et tout sous-espace qui contient <b>u</b> et <b>v</b> contient leurs combinaisons : Vect(<b>u</b>, <b>v</b>) est donc le plus petit.</p></div>
<div class="idea"><p>Vect(<b>u</b>) est la droite dirigée par <b>u</b>, si <b>u</b> ≠ <b>0</b>. Vect(<b>u</b>, <b>v</b>) est cette même droite si <b>v</b> est colinéaire à <b>u</b>, comme sur la figure, et tout le plan sinon.</p></div>
<div class="ex"><p>Vect((1 ; 2)) est la droite <i>y</i> = 2<i>x</i>. Vect((1 ; 2), (−2 ; −4)) est encore cette droite, car (−2 ; −4) = −2·(1 ; 2). En revanche Vect((1 ; 0), (1 ; 1)) = ℝ², car tout (<i>x</i> ; <i>y</i>) s’écrit (<i>x</i> − <i>y</i>)(1 ; 0) + <i>y</i>(1 ; 1).</p></div>`,
   fig:(()=>{ const P=plane({x:[-4,4],y:[-4.5,3.5],lab:1}); ln(P,1,2,{c:'var(--ok)',w:6,op:.35}); P.arrow(0,0,1,2,{c:'var(--math)'}).arrow(0,0,-2,-4,{c:'var(--spark)'}).text(1,2,'(1 ; 2)',{dx:8}).text(-2,-4,'(−2 ; −4)',{dx:8,dy:4}).text(-3.9,3,'Vect = droite y = 2x',{s:12,c:'var(--ok)'}); return P.svg(); })()},
  {h:'Bases et coordonnées',p:`<p>Quand une famille est à la fois libre et génératrice, chaque vecteur du plan s’obtient d’une seule façon à partir d’elle. Les coefficients deviennent alors des <b>coordonnées</b>, comme <i>x</i> et <i>y</i> pour la grille habituelle.</p>
<div class="def"><p>Une <b>base</b> de ℝ² est une famille <b>libre et génératrice</b>. Si (<b>u</b>, <b>v</b>) est une base, tout vecteur <b>w</b> s’écrit de façon <b>unique</b> <b>w</b> = α<b>u</b> + β<b>v</b> ; (α ; β) sont les <b>coordonnées</b> de <b>w</b> dans la base (<b>u</b>, <b>v</b>). La <b>base canonique</b> est (<b>e₁</b>, <b>e₂</b>), avec <b>e₁</b> = (1 ; 0) et <b>e₂</b> = (0 ; 1).</p></div>
<div class="thm"><p>Dans ℝ², deux vecteurs forment une base ⇔ ils ne sont pas colinéaires ⇔ det(<b>u</b>, <b>v</b>) ≠ 0.</p></div>
<div class="why"><p>Chercher α et β, c’est résoudre un système 2 × 2 de matrice (<b>u</b> | <b>v</b>). Si son déterminant est non nul, ce système a une solution unique pour tout <b>w</b> : la famille est génératrice. L’unicité traduit la liberté : si α<b>u</b> + β<b>v</b> = α′<b>u</b> + β′<b>v</b>, alors (α − α′)<b>u</b> + (β − β′)<b>v</b> = <b>0</b>, donc α = α′ et β = β′.</p></div>
<div class="ex"><p>Avec <b>u</b> = (1 ; 1) et <b>v</b> = (1 ; −1), det = −1 − 1 = −2 ≠ 0 : c’est une base. Pour <b>w</b> = (3 ; 1), on résout α + β = 3 et α − β = 1 : α = 2 et β = 1. Sur la figure, on fait 2 pas le long de <b>u</b>, puis 1 pas le long de <b>v</b>, dans la grille oblique.</p></div>`,
   fig:(()=>{ const P=plane({x:[-1,5],y:[-2.5,3.5],grid:false}); for(let i=-4;i<=6;i++){ P.seg(i-6,i+6,i+6,i-6,{c:'var(--line)',w:1}).seg(i-6,-i-6,i+6,-i+6,{c:'var(--line)',w:1}); }
     P.arrow(0,0,2,2,{c:'var(--math)',w:2,op:.5}).arrow(2,2,3,1,{c:'var(--spark)',w:2}).arrow(0,0,1,1,{c:'var(--math)'}).arrow(0,0,1,-1,{c:'var(--spark)'}).dot(3,1,{c:'var(--bad)',l:'w'}).text(1,1,'u',{dx:-14,dy:-4}).text(1,-1,'v',{dx:6,dy:14}); return P.svg(); })(),
   note:'Les coordonnées dépendent de la base : dans la base canonique, w = (3 ; 1), mais dans (u, v), w a pour coordonnées (2 ; 1).'},
  {kind:'Méthode',h:'Trouver les coordonnées dans une base',
   p:'<b>Quand :</b> on veut écrire <b>w</b> = α<b>u</b> + β<b>v</b> dans une base (<b>u</b>, <b>v</b>). <b>Comment :</b> 1) vérifie que c’est une base (det ≠ 0) ; 2) écris l’égalité coordonnée par coordonnée : c’est un système 2 × 2 d’inconnues α et β ; 3) résous-le ; 4) contrôle en recalculant α<b>u</b> + β<b>v</b>. En termes de matrices, avec <i>P</i> = (<b>u</b> | <b>v</b>), les coordonnées sont <i>P</i>⁻¹<b>w</b>.',
   demo:{enonce:'Coordonnées de <b>w</b> = (5 ; 5) dans la base <b>u</b> = (1 ; 2), <b>v</b> = (3 ; 1).',
    etapes:[{f:'det(<b>u</b>, <b>v</b>) = 1·1 − 2·3 = −5 ≠ 0 : c’est une base.',w:'Sans cela, les coordonnées pourraient ne pas exister, ou ne pas être uniques.'},
     {f:'α(1 ; 2) + β(3 ; 1) = (5 ; 5) ⇔ α + 3β = 5 et 2α + β = 5.',w:'Une équation par coordonnée.'},
     {f:'La 2e donne β = 5 − 2α ; dans la 1re : α + 15 − 6α = 5, donc α = 2, puis β = 1.',w:'Substitution.'},
     {f:'Contrôle : 2(1 ; 2) + 1(3 ; 1) = (5 ; 5).',w:'On recalcule toujours.'}],
    conclusion:'Dans la base (u, v), <b>w a pour coordonnées (2 ; 1)</b>.'}},
  {h:'Coordonnées dans une base',p:'Dans la base <b>u</b> = (1 ; 1), <b>v</b> = (1 ; −1), quelle est la première coordonnée α de <b>w</b> = (5 ; 1)&nbsp;?',lab:'α =',ans:3,
   why:'α + β = 5 et α − β = 1, donc 2α = 6 : α = 3 et β = 2. Vérification : 3(1 ; 1) + 2(1 ; −1) = (5 ; 1).'},
  {h:'La dimension',p:`<p>Toutes les bases de ℝ² ont deux vecteurs, et une droite vectorielle est dirigée par un seul. Ce nombre de vecteurs nécessaires mesure la « taille » d’un sous-espace : c’est sa dimension. Elle servira à compter les solutions dans le chapitre suivant.</p>
<div class="def"><p>La <b>dimension</b> d’un sous-espace <i>F</i>, notée dim <i>F</i>, est le nombre de vecteurs d’une base de <i>F</i>, c’est-à-dire d’une famille libre qui engendre <i>F</i>. Par convention, dim{<b>0</b>} = 0.</p></div>
<div class="prop"><p>dim ℝ² = 2 et toute droite vectorielle est de dimension 1. Dans ℝ², trois vecteurs forment toujours une famille liée, et un seul vecteur n’engendre jamais tout le plan.</p></div>
<div class="why"><p>Une droite Vect(<b>u</b>), avec <b>u</b> ≠ <b>0</b>, a pour base (<b>u</b>) : un seul vecteur non nul est libre. Pour trois vecteurs <b>u</b>, <b>v</b>, <b>w</b> : si (<b>u</b>, <b>v</b>) est libre, c’est une base, donc <b>w</b> = α<b>u</b> + β<b>v</b>, et α<b>u</b> + β<b>v</b> − <b>w</b> = <b>0</b> est une relation dont un coefficient vaut −1 ; sinon <b>u</b> et <b>v</b> sont déjà liés.</p></div>
<div class="ex"><p>(1 ; 0), (0 ; 1) et (2 ; 3) sont liés : (2 ; 3) = 2(1 ; 0) + 3(0 ; 1). La droite 2<i>x</i> − <i>y</i> = 0 a pour base ((1 ; 2)) : elle est de dimension 1.</p></div>
<div class="warn"><p>Une base n’est pas unique : ((1 ; 0), (0 ; 1)) et ((1 ; 1), (1 ; −1)) sont deux bases de ℝ². Ce qui ne change pas, c’est leur nombre de vecteurs.</p></div>`},
  {kind:'Méthode',h:'Passer d’un vecteur directeur à une équation',
   p:'Une droite vectorielle se donne de deux façons : Vect(<b>u</b>), l’ensemble des <i>t</i><b>u</b>, ou une équation <i>ax</i> + <i>by</i> = 0. <b>Du vecteur à l’équation :</b> (<i>x</i> ; <i>y</i>) ∈ Vect(<b>u</b>) ⇔ la famille (<b>u</b>, (<i>x</i> ; <i>y</i>)) est liée ⇔ <b><i>u</i>₁<i>y</i> − <i>u</i>₂<i>x</i> = 0</b>. <b>De l’équation au vecteur :</b> la droite <i>ax</i> + <i>by</i> = 0 est dirigée par <b>(−<i>b</i> ; <i>a</i>)</b>, qui vérifie l’équation.',
   demo:{enonce:'Donne une équation de Vect((2 ; −1)), puis un vecteur directeur de la droite 3<i>x</i> − <i>y</i> = 0.',
    etapes:[{f:'det((2 ; −1), (<i>x</i> ; <i>y</i>)) = 2<i>y</i> − (−1)<i>x</i> = <i>x</i> + 2<i>y</i>.',w:'Un point est sur la droite exactement quand il est colinéaire à u.'},
     {f:'Vect((2 ; −1)) : <i>x</i> + 2<i>y</i> = 0. Contrôle : 2 + 2·(−1) = 0.',w:'On vérifie que u lui-même satisfait l’équation.'},
     {f:'3<i>x</i> − <i>y</i> = 0 : <i>a</i> = 3 et <i>b</i> = −1, donc (−<i>b</i> ; <i>a</i>) = (1 ; 3).',w:'Contrôle : 3·1 − 3 = 0. C’est la droite y = 3x.'}],
    conclusion:'<b>Vect((2 ; −1)) a pour équation x + 2y = 0</b>, et la droite <b>3x − y = 0 est Vect((1 ; 3))</b>.'}},
  {h:'L’équation d’une droite',p:'Quelle est une équation de la droite Vect((3 ; 2))&nbsp;?',
   opts:['3<i>x</i> + 2<i>y</i> = 0','2<i>x</i> − 3<i>y</i> = 0','3<i>x</i> − 2<i>y</i> = 0','<i>x</i> + <i>y</i> = 5'],ans:1,
   why:'det((3 ; 2), (x ; y)) = 3y − 2x, d’où 2x − 3y = 0. Contrôle : 2·3 − 3·2 = 0. La dernière ne passe même pas par 0.'},
  {kind:'Défi',h:'Quand la famille devient liée',p:'Pour quelle valeur <b>positive</b> de <i>k</i> les vecteurs (1 ; <i>k</i>) et (<i>k</i> ; 4) sont-ils colinéaires&nbsp;?',lab:'k =',ans:2,
   why:'det = 1·4 − k·k = 4 − k² = 0 ⇔ k = ±2. Pour k = 2 : (2 ; 4) = 2·(1 ; 2).'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Combinaison linéaire : α<b>u</b> + β<b>v</b>, calculée coordonnée par coordonnée. Vect(<b>u</b>, <b>v</b>) est l’ensemble de toutes ces combinaisons, le plus petit sous-espace qui contient <b>u</b> et <b>v</b>.</li>
<li>(<b>u</b>, <b>v</b>) libre ⇔ α<b>u</b> + β<b>v</b> = <b>0</b> impose α = β = 0. Dans ℝ² : libre ⇔ non colinéaires ⇔ det(<b>u</b>, <b>v</b>) = <i>u</i>₁<i>v</i>₂ − <i>u</i>₂<i>v</i>₁ ≠ 0. Si det = 0, on exhibe λ avec <b>v</b> = λ<b>u</b>.</li>
<li>Sous-espace : partie non vide stable par combinaison linéaire ; il contient <b>0</b>. Dans ℝ² : {<b>0</b>}, les droites par l’origine, ℝ². Pour le prouver : <b>0</b> ∈ <i>F</i> et stabilité ; pour le réfuter : un contre-exemple. Une intersection de sous-espaces en est un, l’union de deux droites distinctes non.</li>
<li>Base : famille libre et génératrice. Dans ℝ², deux vecteurs de déterminant non nul. Les coordonnées (α ; β) de <b>w</b> sont uniques : on résout le système, ou on calcule <i>P</i>⁻¹<b>w</b> avec <i>P</i> = (<b>u</b> | <b>v</b>).</li>
<li>Dimension : nombre de vecteurs d’une base. dim{<b>0</b>} = 0, droite : 1, ℝ² : 2. Trois vecteurs de ℝ² sont toujours liés.</li>
<li>Droite vectorielle : Vect(<b>u</b>) a pour équation <i>u</i>₁<i>y</i> − <i>u</i>₂<i>x</i> = 0 ; la droite <i>ax</i> + <i>by</i> = 0 est dirigée par (−<i>b</i> ; <i>a</i>).</li>
</ul></div>`},
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
  {h:'Linéaire, et sa matrice',p:`<p>Rotations, symétries, projections, étirements : beaucoup de transformations du plan respectent les combinaisons de vecteurs. Elles envoient une somme sur la somme des images, et un double sur le double de l’image. Ce sont exactement celles que les matrices décrivent.</p>
<div class="def"><p><i>f</i> : ℝ² → ℝ² est <b>linéaire</b> si, pour tous vecteurs <b>u</b>, <b>v</b> et tout réel λ : <i>f</i>(<b>u</b> + <b>v</b>) = <i>f</i>(<b>u</b>) + <i>f</i>(<b>v</b>) et <i>f</i>(λ<b>u</b>) = λ<i>f</i>(<b>u</b>).</p></div>
<div class="thm"><p>Une application linéaire est entièrement déterminée par <i>f</i>(<b>e₁</b>) et <i>f</i>(<b>e₂</b>) : <i>f</i>(<i>x</i> ; <i>y</i>) = <i>A</i>(<i>x</i> ; <i>y</i>), où la <b>matrice</b> <i>A</i> de <i>f</i> a pour colonnes <i>f</i>(<b>e₁</b>) et <i>f</i>(<b>e₂</b>).</p></div>
<div class="why"><p>(<i>x</i> ; <i>y</i>) = <i>x</i><b>e₁</b> + <i>y</i><b>e₂</b>, donc par linéarité <i>f</i>(<i>x</i> ; <i>y</i>) = <i>x</i> <i>f</i>(<b>e₁</b>) + <i>y</i> <i>f</i>(<b>e₂</b>). C’est exactement le produit de la matrice par (<i>x</i> ; <i>y</i>), qui combine ses colonnes.</p></div>
<div class="ex"><p>Avec la position de départ des curseurs, <i>f</i>(<b>e₁</b>) = (1 ; 0) et <i>f</i>(<b>e₂</b>) = (0,5 ; 1). Alors <i>f</i>(2 ; 2) = 2(1 ; 0) + 2(0,5 ; 1) = (3 ; 2). Le carré unité devient un parallélogramme penché : c’est un <b>cisaillement</b>. Change les curseurs : toute la grille suit les deux flèches.</p></div>`,
   params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'b',l:'b',min:-2,max:2,step:.5,v:.5},{id:'c',l:'c',min:-2,max:2,step:.5,v:0},{id:'d',l:'d',min:-2,max:2,step:.5,v:1}],
   draw:v=>grille(plane({x:[-4,4],y:[-4,4],grid:false}),v.a,v.b,v.c,v.d).svg(),
   info:v=>`${M([[v.a,v.b],[v.c,v.d]])} &nbsp; f(e₁) = (${fmt(v.a)} ; ${fmt(v.c)}) en bleu, f(e₂) = (${fmt(v.b)} ; ${fmt(v.d)}) en jaune`,
   note:'Une application linéaire envoie toujours 0 sur 0, et les droites sur des droites (ou sur un point).'},
  {kind:'Méthode',h:'Prouver qu’une application est linéaire, ou non',
   p:'<b>Pour prouver la linéarité :</b> on prend <b>u</b>, <b>v</b> et λ quelconques et on vérifie <i>f</i>(<b>u</b> + λ<b>v</b>) = <i>f</i>(<b>u</b>) + λ<i>f</i>(<b>v</b>), ce qui contient les deux règles d’un coup. <b>Raccourci dans ℝ² :</b> si chaque coordonnée de <i>f</i>(<i>x</i> ; <i>y</i>) s’écrit <i>ax</i> + <i>by</i>, sans constante, sans produit ni carré, <i>f</i> est linéaire. <b>Pour prouver la non-linéarité :</b> un contre-exemple : <i>f</i>(<b>0</b>) ≠ <b>0</b>, ou <i>f</i>(2<b>u</b>) ≠ 2<i>f</i>(<b>u</b>) pour un <b>u</b> bien choisi.',
   demo:{enonce:'<i>f</i>(<i>x</i> ; <i>y</i>) = (<i>x</i> − 2<i>y</i> ; 3<i>x</i>) et <i>g</i>(<i>x</i> ; <i>y</i>) = (<i>x</i> + <i>y</i> ; <i>xy</i>) sont-elles linéaires&nbsp;?',
    etapes:[{f:'Avec <b>u</b> = (<i>x</i> ; <i>y</i>) et <b>v</b> = (<i>x</i>′ ; <i>y</i>′) : <i>f</i>(<b>u</b> + λ<b>v</b>) = (<i>x</i> + λ<i>x</i>′ − 2<i>y</i> − 2λ<i>y</i>′ ; 3<i>x</i> + 3λ<i>x</i>′).',w:'On calcule l’image de u + λv.'},
     {f:'= (<i>x</i> − 2<i>y</i> ; 3<i>x</i>) + λ(<i>x</i>′ − 2<i>y</i>′ ; 3<i>x</i>′) = <i>f</i>(<b>u</b>) + λ<i>f</i>(<b>v</b>).',w:'On sépare les termes sans λ et ceux avec λ : f est linéaire.'},
     {f:'<i>g</i>(1 ; 1) = (2 ; 1), mais <i>g</i>(2 ; 2) = (4 ; 4) ≠ 2·(2 ; 1).',w:'Le produit xy est multiplié par 4 quand on double le vecteur : c’est le contre-exemple.'}],
    conclusion:'<b>f est linéaire, g ne l’est pas.</b> Note que g(0) = 0 : ce test-là ne suffisait pas.'}},
  {h:'Laquelle est linéaire&nbsp;?',p:'Laquelle de ces applications de ℝ² dans ℝ² est linéaire&nbsp;?',
   opts:['(<i>x</i> ; <i>y</i>) ↦ (<i>x</i> + 1 ; <i>y</i>)','(<i>x</i> ; <i>y</i>) ↦ (<i>xy</i> ; <i>y</i>)','(<i>x</i> ; <i>y</i>) ↦ (<i>x</i> + <i>y</i> ; 2<i>x</i>)','(<i>x</i> ; <i>y</i>) ↦ (<i>x</i>² ; <i>y</i>)'],ans:2,
   why:'(x + y ; 2x) a pour matrice (1 1 ; 2 0). La 1re n’envoie pas 0 sur 0, et les deux autres contiennent des produits ou des carrés : f(2u) ≠ 2f(u).'},
  {h:'Image d’un vecteur',p:'<i>f</i> est linéaire avec <i>f</i>(<b>e₁</b>) = (2 ; 1) et <i>f</i>(<b>e₂</b>) = (−1 ; 3). Quelle est la <b>deuxième</b> coordonnée de <i>f</i>(3 ; 2)&nbsp;?',lab:'2e coordonnée =',ans:9,
   why:'(3 ; 2) = 3e₁ + 2e₂, donc f(3 ; 2) = 3(2 ; 1) + 2(−1 ; 3) = (4 ; 9).'},
  {kind:'Méthode',h:'Écrire la matrice d’une application à partir des images de la base',
   p:'<b>Principe :</b> la 1re colonne de la matrice est <i>f</i>(<b>e₁</b>) = <i>f</i>(1 ; 0), la 2e est <i>f</i>(<b>e₂</b>) = <i>f</i>(0 ; 1). <b>Pourquoi :</b> (<i>x</i> ; <i>y</i>) = <i>x</i><b>e₁</b> + <i>y</i><b>e₂</b>, donc <i>f</i>(<i>x</i> ; <i>y</i>) = <i>x</i> <i>f</i>(<b>e₁</b>) + <i>y</i> <i>f</i>(<b>e₂</b>), et c’est exactement le produit de la matrice par (<i>x</i> ; <i>y</i>). Pour une transformation géométrique, on dessine où vont <b>e₁</b> et <b>e₂</b>.',
   demo:{enonce:'Matrice de la rotation <i>r</i> d’angle 90° dans le sens direct, puis image de (3 ; 1).',
    etapes:[{f:'<i>r</i>(<b>e₁</b>) = (0 ; 1).',w:'Le vecteur horizontal tourne d’un quart de tour vers le haut.'},
     {f:'<i>r</i>(<b>e₂</b>) = (−1 ; 0).',w:'Le vecteur vertical tourne vers la gauche.'},
     {f:`Matrice : ${M([[0,-1],[1,0]])}`,w:'On range r(e₁) en 1re colonne et r(e₂) en 2e colonne.'},
     {f:`${M([[0,-1],[1,0]])}${mat([['3'],['1']])} = ${M([[-1],[3]])}`,w:'Contrôle : (3 ; 1) et (−1 ; 3) ont même longueur, et leur produit scalaire −3 + 3 vaut 0 : ils sont perpendiculaires.'}],
    conclusion:`La rotation de 90° a pour matrice <b>${M([[0,-1],[1,0]])}</b> et envoie (3 ; 1) sur (−1 ; 3).`},
   note:'Rappel : le produit scalaire de (x ; y) et (x′ ; y′) vaut xx′ + yy′. Il est nul exactement quand les deux vecteurs sont perpendiculaires.'},
  {h:'La matrice d’une symétrie',p:'Quelle est la matrice de la symétrie orthogonale par rapport à la droite <i>y</i> = −<i>x</i>&nbsp;?',
   opts:[mat([[0,1],[1,0]]),M([[-1,0],[0,1]]),M([[0,-1],[-1,0]]),M([[1,0],[0,-1]])],ans:2,
   why:'La symétrie envoie e₁ = (1 ; 0) sur (0 ; −1), et e₂ sur (−1 ; 0). Ce sont les deux colonnes. Contrôle : (1 ; −1), qui est sur la droite, reste fixe.'},
  {h:'Noyau et image',p:`<p>Une application linéaire peut écraser des vecteurs sur <b>0</b>, et elle peut ne pas atteindre tout le plan. Deux ensembles mesurent ces deux défauts : ce qui est perdu, et ce qui est atteint.</p>
<div class="def"><p>Le <b>noyau</b> de <i>f</i> est ker <i>f</i> = {<b>u</b> ∈ ℝ² : <i>f</i>(<b>u</b>) = <b>0</b>}, l’ensemble des vecteurs envoyés sur <b>0</b>. L’<b>image</b> de <i>f</i> est Im <i>f</i> = {<i>f</i>(<b>u</b>) : <b>u</b> ∈ ℝ²}, l’ensemble des vecteurs atteints. La notation ker vient de l’allemand <i>Kern</i>, qui veut dire noyau.</p></div>
<div class="prop"><p>ker <i>f</i> et Im <i>f</i> sont des sous-espaces vectoriels de ℝ². De plus, <b><i>f</i> est injective ⇔ ker <i>f</i> = {<b>0</b>}</b>.</p></div>
<div class="why"><p>Si <i>f</i>(<b>u</b>) = <i>f</i>(<b>v</b>) = <b>0</b>, alors <i>f</i>(α<b>u</b> + β<b>v</b>) = α<b>0</b> + β<b>0</b> = <b>0</b> : le noyau est stable. De même α<i>f</i>(<b>u</b>) + β<i>f</i>(<b>v</b>) = <i>f</i>(α<b>u</b> + β<b>v</b>) est encore une image. Enfin <i>f</i>(<b>u</b>) = <i>f</i>(<b>v</b>) ⇔ <i>f</i>(<b>u</b> − <b>v</b>) = <b>0</b> ⇔ <b>u</b> − <b>v</b> ∈ ker <i>f</i> : deux vecteurs distincts ont la même image exactement quand le noyau contient un vecteur non nul.</p></div>
<div class="ex"><p>Pour <i>A</i> = ${M([[1,-1],[2,-2]])} : <i>A</i>(1 ; 1) = (1 − 1 ; 2 − 2) = (0 ; 0), donc (1 ; 1) ∈ ker <i>f</i>, et <i>f</i> n’est pas injective : (0 ; 0) et (1 ; 1) ont la même image. Toute image s’écrit <i>A</i>(<i>x</i> ; <i>y</i>) = (<i>x</i> − <i>y</i>)(1 ; 2) : Im <i>f</i> est la droite dirigée par (1 ; 2).</p></div>`},
  {h:'Noyau, image, rang',p:`<p>Le noyau et l’image sont des sous-espaces, de dimension 0, 1 ou 2. Ces deux dimensions ne sont pas indépendantes : plus <i>f</i> écrase de vecteurs, moins elle en atteint.</p>
<div class="def"><p>Le <b>rang</b> de <i>f</i>, noté rg <i>f</i>, est la dimension de son image : rg <i>f</i> = dim Im <i>f</i>. C’est aussi le nombre maximal de colonnes indépendantes de sa matrice, puisque l’image est engendrée par les colonnes.</p></div>
<div class="thm"><p><b>Théorème du rang</b> : pour <i>f</i> : ℝ² → ℝ² linéaire, <b>dim ker <i>f</i> + rg <i>f</i> = 2</b>.</p></div>
<div class="why"><p>Il n’y a que trois cas. Si det <i>A</i> ≠ 0, seul <b>0</b> est envoyé sur <b>0</b> et les colonnes forment une base : 0 + 2 = 2. Si <i>A</i> est la matrice nulle, tout part sur <b>0</b> : 2 + 0 = 2. Sinon, det <i>A</i> = 0 sans que <i>A</i> soit nulle : l’image est la droite d’une colonne non nulle, et le noyau est la droite des solutions d’une seule équation <i>px</i> + <i>qy</i> = 0 : 1 + 1 = 2. Chaque direction du plan est soit perdue dans le noyau, soit transmise à l’image.</p></div>
<div class="ex"><p>Pour ${mat([[1,2],[1,1]])}, position de départ, det = 1 − 2 = −1 ≠ 0 : ker <i>f</i> = {<b>0</b>}, Im <i>f</i> = ℝ², rang 2. Mets <i>d</i> = 2 : det = 2 − 2 = 0, l’image, en vert, est la droite dirigée par (1 ; 1), et le noyau, en rouge pointillé, celle dirigée par (2 ; −1).</p></div>`,
   params:[{id:'a',l:'a',min:-2,max:2,v:1},{id:'b',l:'b',min:-2,max:2,v:2},{id:'c',l:'c',min:-2,max:2,v:1},{id:'d',l:'d',min:-2,max:2,v:1}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],grid:false}), D=v.a*v.d-v.b*v.c, z=!v.a&&!v.b&&!v.c&&!v.d;
     grille(P,v.a,v.b,v.c,v.d);
     if(D===0&&!z){ const im=(v.a||v.c)?[v.a,v.c]:[v.b,v.d], ke=(v.a||v.b)?[-v.b,v.a]:[-v.d,v.c]; ln(P,im[0],im[1],{c:'var(--ok)',w:6,op:.45}); ln(P,ke[0],ke[1],{c:'var(--bad)',w:2.5,dash:1}); }
     return P.svg(); },
   info:v=>{ const D=v.a*v.d-v.b*v.c, z=!v.a&&!v.b&&!v.c&&!v.d;
     return z?'Matrice nulle : ker f = ℝ², Im f = {0}, rang 0 (2 + 0 = 2)':D?`det = ${fmt(D)} ≠ 0 : ker f = {0}, Im f = ℝ², <b>rang 2</b> (0 + 2 = 2)`:'det = 0 : ker f et Im f sont des droites, <b>rang 1</b> (1 + 1 = 2)'; },
   note:'En dimension 2 : f est bijective ⇔ ker f = {0} ⇔ rg f = 2 ⇔ det ≠ 0.'},
  {kind:'Méthode',h:'Calculer le noyau et l’image',
   p:'<b>Noyau :</b> on résout <i>A</i>(<i>x</i> ; <i>y</i>) = <b>0</b>. Si det <i>A</i> ≠ 0, ker = {<b>0</b>}. Sinon, les deux équations sont proportionnelles : on en garde une non nulle et on en tire un vecteur directeur. <b>Image :</b> elle est engendrée par les <b>colonnes</b> de <i>A</i>, car <i>A</i>(<i>x</i> ; <i>y</i>) = <i>x</i>·(colonne 1) + <i>y</i>·(colonne 2). Si det = 0 (et <i>A</i> ≠ 0), c’est la droite dirigée par une colonne non nulle. <b>Contrôle :</b> théorème du rang, dim ker + rg = 2.',
   demo:{enonce:`Noyau et image de <i>A</i> = ${M([[2,-4],[-1,2]])}.`,
    etapes:[{f:'det <i>A</i> = 2·2 − (−4)·(−1) = 0 et <i>A</i> ≠ 0 : rang 1.',w:'On sait d’avance que le noyau et l’image sont des droites.'},
     {f:'ker : 2<i>x</i> − 4<i>y</i> = 0 ⇔ <i>x</i> = 2<i>y</i>, dirigé par (2 ; 1).',w:'La 2e équation −x + 2y = 0 est la même, multipliée par −1/2.'},
     {f:'Contrôle : <i>A</i>(2 ; 1) = (4 − 4 ; −2 + 2) = (0 ; 0).',w:'On vérifie le vecteur trouvé.'},
     {f:'Im : les colonnes sont (2 ; −1) et (−4 ; 2) = −2·(2 ; −1), donc Im = Vect((2 ; −1)).',w:'Les colonnes sont colinéaires : une seule suffit.'}],
    conclusion:'<b>ker A = Vect((2 ; 1))</b> et <b>Im A = Vect((2 ; −1))</b> ; on a bien 1 + 1 = 2.'}},
  {h:'Fabrique un noyau',p:'Règle la matrice pour que le noyau soit la droite <i>y</i> = <i>x</i> et l’image l’<b>axe des abscisses</b>.',
   params:[{id:'a',l:'a',min:-2,max:2,v:1},{id:'b',l:'b',min:-2,max:2,v:0},{id:'c',l:'c',min:-2,max:2,v:0},{id:'d',l:'d',min:-2,max:2,v:1}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],grid:false}); ln(P,1,1,{c:'var(--muted)',w:1.5,dash:1}); grille(P,v.a,v.b,v.c,v.d); return P.svg(); },
   info:v=>`${M([[v.a,v.b],[v.c,v.d]])} &nbsp; f(1 ; 1) = (${fmt(v.a+v.b)} ; ${fmt(v.c+v.d)})`,
   ok:v=>v.c===0&&v.d===0&&v.a!==0&&v.a+v.b===0,
   why:'Image sur l’axe des x : la 2e ligne est nulle (c = d = 0). Noyau y = x : f(1 ; 1) = 0, donc a + b = 0, avec a ≠ 0 pour ne pas tout écraser. Par exemple (1 −1 ; 0 0).'},
  {h:'Lis le noyau',p:`Quel est le noyau de l’application de matrice ${mat([[1,2],[2,4]])}&nbsp;?`,
   opts:['La droite dirigée par (2 ; −1)','La droite dirigée par (1 ; 2)','{<b>0</b>}','ℝ² tout entier'],ans:0,
   why:'det = 4 − 4 = 0 et la matrice n’est pas nulle : rang 1, donc le noyau est une droite. x + 2y = 0 est vérifiée par (2 ; −1). L’image est la droite dirigée par (1 ; 2).'},
  {h:'Un vecteur du noyau',p:`Le noyau de ${mat([[3,6],[1,2]])} est dirigé par un vecteur de la forme (<i>k</i> ; 1). Combien vaut <i>k</i>&nbsp;?`,lab:'k =',ans:-2,
   why:'det = 6 − 6 = 0. La 2e ligne donne x + 2y = 0, donc x = −2y : (−2 ; 1). Contrôle : 3·(−2) + 6·1 = 0. L’image est dirigée par la colonne (3 ; 1).'},
  {h:'Changement de base',p:`<p>La matrice d’une application dépend de la base dans laquelle on écrit les vecteurs. Une base bien choisie, adaptée à la géométrie de <i>f</i>, peut rendre sa matrice beaucoup plus simple, par exemple diagonale.</p>
<div class="def"><p>La <b>matrice de <i>f</i> dans la base</b> (<b>u</b>, <b>v</b>) a pour colonnes les <b>coordonnées</b> de <i>f</i>(<b>u</b>) et de <i>f</i>(<b>v</b>) dans cette base. La <b>matrice de passage</b> <i>P</i> = (<b>u</b> | <b>v</b>) a pour colonnes les nouveaux vecteurs, écrits dans la base canonique.</p></div>
<div class="thm"><p>Si <i>A</i> est la matrice de <i>f</i> dans la base canonique, sa matrice dans (<b>u</b>, <b>v</b>) est <b><i>A</i>′ = <i>P</i>⁻¹<i>AP</i></b>.</p></div>
<div class="why"><p>Si <i>X</i>′ = (α ; β) sont les coordonnées d’un vecteur dans (<b>u</b>, <b>v</b>), ses coordonnées canoniques sont <i>X</i> = <i>PX</i>′ = α<b>u</b> + β<b>v</b>. On applique <i>f</i> : on obtient <i>APX</i>′. Puis on revient en coordonnées dans (<b>u</b>, <b>v</b>) en multipliant par <i>P</i>⁻¹. Au total, <i>X</i>′ ↦ <i>P</i>⁻¹<i>APX</i>′.</p></div>
<div class="ex"><p><i>A</i> = ${mat([[2,1],[1,2]])}, <b>u</b> = (1 ; 1), <b>v</b> = (−1 ; 1). On calcule <i>A</i><b>u</b> = (3 ; 3) = 3<b>u</b> et <i>A</i><b>v</b> = (−1 ; 1) = <b>v</b>. Les coordonnées de ces images dans (<b>u</b>, <b>v</b>) sont (3 ; 0) et (0 ; 1), donc <i>A</i>′ = ${mat([[3,0],[0,1]])} : dans cette base, <i>f</i> triple <b>u</b> et laisse <b>v</b> fixe, comme sur la figure.</p></div>`,
   fig:(()=>{ const P=plane({x:[-3.5,4],y:[-1,4],lab:1}); P.arrow(0,0,3,3,{c:'var(--math)',w:2,op:.45}).arrow(0,0,1,1,{c:'var(--math)'}).arrow(0,0,-1,1,{c:'var(--spark)',w:5}).text(3,3,'Au = 3u',{dx:-70,dy:4,s:12}).text(-1,1,'Av = v',{dx:-10,dy:-10,s:12}); return P.svg(); })(),
   note:'Retiens l’ordre : P⁻¹ à gauche, P à droite. Pour revenir à la base canonique, A = PA′P⁻¹.'},
  {h:'Matrices semblables, trace et déterminant',p:`<p>Deux matrices différentes peuvent décrire la même application, vue dans deux bases. Certains nombres ne dépendent pas de la base : ils servent à contrôler un changement de base, et à montrer que deux matrices ne peuvent pas représenter la même application.</p>
<div class="def"><p><i>A</i> et <i>A</i>′ sont <b>semblables</b> s’il existe <i>P</i> inversible telle que <i>A</i>′ = <i>P</i>⁻¹<i>AP</i>. La <b>trace</b> de <i>A</i> = ${mat([['<i>a</i>','<i>b</i>'],['<i>c</i>','<i>d</i>']])} est la somme de ses coefficients diagonaux : <b>tr <i>A</i> = <i>a</i> + <i>d</i></b>. On note diag(λ, μ) la matrice diagonale ${mat([['λ','0'],['0','μ']])}.</p></div>
<div class="prop"><p>Deux matrices semblables ont <b>même déterminant</b>, <b>même trace</b> et <b>même rang</b>.</p></div>
<div class="why"><p>Déterminant : det(<i>P</i>⁻¹<i>AP</i>) = det <i>P</i>⁻¹ · det <i>A</i> · det <i>P</i> = det <i>A</i>, car det <i>P</i>⁻¹ · det <i>P</i> = det <i>I</i> = 1. Trace : un calcul direct montre que tr(<i>MN</i>) = tr(<i>NM</i>) ; avec <i>M</i> = <i>P</i>⁻¹ et <i>N</i> = <i>AP</i>, tr(<i>P</i>⁻¹<i>AP</i>) = tr(<i>APP</i>⁻¹) = tr <i>A</i>. Rang : c’est la dimension de l’image de la même application <i>f</i>.</p></div>
<div class="ex"><p>Pour <i>A</i> = ${mat([[2,1],[1,2]])} et <i>A</i>′ = diag(3, 1) de l’étape précédente : tr <i>A</i> = 4 = 3 + 1 et det <i>A</i> = 4 − 1 = 3 = 3·1. En revanche diag(1, 2) et diag(1, 3) ne sont pas semblables : leurs traces 3 et 4 diffèrent.</p></div>
<div class="warn"><p>La réciproque est fausse : <i>I</i> et ${mat([[1,1],[0,1]])} ont même trace 2 et même déterminant 1, mais elles ne sont pas semblables, car <i>P</i>⁻¹<i>IP</i> = <i>I</i> pour toute <i>P</i>.</p></div>`},
  {kind:'Méthode',h:'Changer de base avec P⁻¹AP',
   p:'<b>Quand :</b> on connaît la matrice <i>A</i> de <i>f</i> dans la base canonique et on la veut dans une base (<b>u</b>, <b>v</b>), souvent pour la rendre plus simple. <b>Comment :</b> 1) <i>P</i> = (<b>u</b> | <b>v</b>), les nouveaux vecteurs en colonnes ; 2) calcule <i>P</i>⁻¹ ; 3) calcule <i>AP</i>, puis <i>P</i>⁻¹(<i>AP</i>). <b>Pourquoi :</b> <i>P</i> traduit des coordonnées dans (<b>u</b>, <b>v</b>) en coordonnées canoniques, <i>A</i> applique <i>f</i>, puis <i>P</i>⁻¹ retraduit le résultat dans (<b>u</b>, <b>v</b>). <b>Sens inverse :</b> si on connaît la matrice <i>A</i>′ dans (<b>u</b>, <b>v</b>), on revient avec <i>A</i> = <i>PA</i>′<i>P</i>⁻¹.',
   demo:{enonce:`<i>A</i> = ${M([[4,-2],[1,1]])}, <b>u</b> = (1 ; 1), <b>v</b> = (2 ; 1). Calcule la matrice <i>A</i>′ de <i>f</i> dans (<b>u</b>, <b>v</b>).`,
    etapes:[{f:`<i>P</i> = ${mat([[1,2],[1,1]])}, det <i>P</i> = 1 − 2 = −1, <i>P</i>⁻¹ = ${M([[-1,2],[1,-1]])}.`,w:'Formule de l’inverse : on échange la diagonale, on change les signes, on divise par −1.'},
     {f:`<i>AP</i> = ${mat([[2,6],[2,3]])}`,w:'Ses colonnes sont Au = (2 ; 2) et Av = (6 ; 3).'},
     {f:`<i>A</i>′ = <i>P</i>⁻¹<i>AP</i> = ${mat([[2,0],[0,3]])}`,w:'Ligne 1 de P⁻¹ : −2 + 4 = 2 et −6 + 6 = 0. Ligne 2 : 2 − 2 = 0 et 6 − 3 = 3.'},
     {f:'Contrôle : tr <i>A</i> = 5 = tr <i>A</i>′ et det <i>A</i> = 4 + 2 = 6 = det <i>A</i>′.',w:'Des matrices semblables ont même trace et même déterminant.'}],
    conclusion:'Dans la base (u, v), <b>A′ = diag(2, 3)</b> : f double u et triple v. On pouvait le lire sur AP : Au = 2u et Av = 3v.'}},
  {h:'Calcule P⁻¹AP',p:`Soit <i>A</i> = ${mat([[1,2],[0,3]])} et <i>P</i> = ${mat([[1,1],[1,2]])}. Quel est le coefficient en haut à droite de <i>P</i>⁻¹<i>AP</i>&nbsp;?`,lab:'coefficient =',ans:4,
   why:'det P = 1, P⁻¹ = (2 −1 ; −1 1). AP = (3 5 ; 3 6), puis P⁻¹(AP) = (3 4 ; 0 1). Contrôle : trace 4 et det 3, comme pour A.'},
  {h:'Revenir à la base canonique',p:`Dans la base <b>u</b> = (1 ; 0), <b>v</b> = (1 ; 1), une application a pour matrice <i>A</i>′ = diag(2, 3). Avec <i>P</i> = ${mat([[1,1],[0,1]])}, calcule <i>A</i> = <i>PA</i>′<i>P</i>⁻¹. Quel est son coefficient en haut à droite&nbsp;?`,lab:'coefficient =',ans:1,
   why:'P⁻¹ = (1 −1 ; 0 1) et PA′ = (2 3 ; 0 3), puis A = PA′P⁻¹ = (2 −2 + 3 ; 0 3) = (2 1 ; 0 3). Contrôle : A(1 ; 1) = (3 ; 3) = 3v.'},
  {kind:'Défi',h:'Rang 1',p:`Pour quelle valeur de <i>k</i> la matrice ${mat([['<i>k</i>','6'],['2','3']])} est-elle de rang 1&nbsp;?`,lab:'k =',ans:4,
   why:'Rang 1 ⇔ det = 0 (la matrice n’est jamais nulle) : 3k − 12 = 0, donc k = 4. Par le théorème du rang, le noyau est alors une droite.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><i>f</i> linéaire : <i>f</i>(<b>u</b> + λ<b>v</b>) = <i>f</i>(<b>u</b>) + λ<i>f</i>(<b>v</b>). Alors <i>f</i>(<b>0</b>) = <b>0</b>. Dans ℝ², chaque coordonnée de l’image s’écrit <i>ax</i> + <i>by</i>, sans constante, ni produit, ni carré. Pour réfuter : un contre-exemple, comme <i>f</i>(2<b>u</b>) ≠ 2<i>f</i>(<b>u</b>).</li>
<li>Matrice de <i>f</i> : ses colonnes sont <i>f</i>(<b>e₁</b>) et <i>f</i>(<b>e₂</b>), et <i>f</i>(<i>x</i> ; <i>y</i>) = <i>x</i> <i>f</i>(<b>e₁</b>) + <i>y</i> <i>f</i>(<b>e₂</b>). Pour une transformation géométrique, on dessine où vont <b>e₁</b> et <b>e₂</b>.</li>
<li>ker <i>f</i> = {<b>u</b> : <i>f</i>(<b>u</b>) = <b>0</b>} : on résout <i>AX</i> = <b>0</b>, une équation <i>px</i> + <i>qy</i> = 0 donne le vecteur (−<i>q</i> ; <i>p</i>). Im <i>f</i> est engendrée par les colonnes. Ce sont des sous-espaces, et <i>f</i> injective ⇔ ker <i>f</i> = {<b>0</b>}.</li>
<li>rg <i>f</i> = dim Im <i>f</i>, et <b>dim ker <i>f</i> + rg <i>f</i> = 2</b>. En dimension 2 : bijective ⇔ ker = {<b>0</b>} ⇔ rang 2 ⇔ det ≠ 0.</li>
<li>Changement de base : <i>P</i> = (<b>u</b> | <b>v</b>), <b><i>A</i>′ = <i>P</i>⁻¹<i>AP</i></b>, et dans l’autre sens <i>A</i> = <i>PA</i>′<i>P</i>⁻¹. Les colonnes de <i>A</i>′ sont les coordonnées de <i>f</i>(<b>u</b>) et <i>f</i>(<b>v</b>) dans (<b>u</b>, <b>v</b>).</li>
<li>Matrices semblables : même trace (tr = <i>a</i> + <i>d</i>), même déterminant, même rang. C’est le contrôle de tout changement de base, mais pas une condition suffisante.</li>
</ul></div>`},
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
  {h:'Une direction qui résiste',p:`<p>Une matrice fait en général tourner les vecteurs en même temps qu’elle les étire. Mais certaines directions sont épargnées : le vecteur image reste sur la même droite que le vecteur de départ. Dans ces directions, la matrice agit comme une simple multiplication par un nombre, et tous les calculs deviennent faciles.</p>
<div class="def"><p>Un <b>vecteur propre</b> de <i>A</i> est un vecteur <b>v ≠ 0</b> tel que <b><i>A</i>v = λv</b> pour un réel λ. Ce nombre λ est la <b>valeur propre</b> associée à <b>v</b> : <i>A</i> étire <b>v</b> d’un facteur λ sans changer sa direction.</p></div>
<div class="idea"><p>Sur la figure, <b>v</b> est en bleu et <i>A</i><b>v</b> en jaune, avec <i>A</i> = ${mat([[3,1],[0,2]])}. Tourne <b>v</b> : presque toujours, <i>A</i><b>v</b> part dans une autre direction. Pour quelques angles seulement, les deux flèches s’alignent : ce sont les directions propres.</p></div>
<div class="ex"><p><i>A</i>(1 ; 0) = (3 ; 0) = 3·(1 ; 0) : <b>e₁</b> est un vecteur propre, de valeur propre 3. Mais <i>A</i>(0 ; 1) = (1 ; 2), qui n’est pas un multiple de (0 ; 1) : <b>e₂</b> n’est pas propre. Tout multiple non nul d’un vecteur propre est encore propre, pour la même valeur : <i>A</i>(5 ; 0) = 3·(5 ; 0).</p></div>
<div class="warn"><p>On exige <b>v ≠ 0</b>, car <i>A</i><b>0</b> = λ<b>0</b> est vrai pour tout λ et ne dirait rien. En revanche, une valeur propre peut valoir 0 : <i>A</i><b>v</b> = <b>0</b> avec <b>v</b> ≠ <b>0</b> veut dire que <b>v</b> est dans le noyau de <i>A</i>.</p></div>`,
   params:[{id:'t',l:'Direction de v',min:0,max:345,step:15,v:30,u:'°'}],
   draw:v=>{ const x=Math.cos(rad(v.t))*1.2,y=Math.sin(rad(v.t))*1.2,P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,3*x+y,2*y,{c:'var(--spark)',w:4}).arrow(0,0,x,y,{c:'var(--math)'}); return P.svg(); },
   info:v=>{ const x=Math.cos(rad(v.t)),y=Math.sin(rad(v.t)),ax=3*x+y,ay=2*y; return Math.abs(x*ay-y*ax)<1e-9?`<b>Direction propre</b> : Av = ${fmt(ax*x+ay*y)}·v`:'Av n’est pas aligné avec v'; }},
  {h:'Trouve l’autre direction',p:'L’axe horizontal est une direction propre (λ = 3). Tourne <b>v</b> pour trouver l’<b>autre</b> direction propre.',
   params:[{id:'t',l:'Direction de v',min:0,max:345,step:15,v:60,u:'°'}],
   draw:v=>{ const x=Math.cos(rad(v.t))*1.2,y=Math.sin(rad(v.t))*1.2,P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,3*x+y,2*y,{c:'var(--spark)',w:4}).arrow(0,0,x,y,{c:'var(--math)'}); return P.svg(); },
   ok:v=>v.t===135||v.t===315,why:'A(1 ; −1) = (3 − 1 ; −2) = (2 ; −2) = 2·(1 ; −1). La direction 135° (ou 315°) est propre, avec λ = 2.'},
  {h:'Le polynôme caractéristique',p:`<p>Tourner un vecteur jusqu’à tomber sur une direction propre ne marche que sur une figure, et pas avec des valeurs exactes. Il faut un calcul qui donne directement les valeurs propres, sans connaître les vecteurs.</p>
<div class="thm"><p>λ est valeur propre de <i>A</i> ⇔ <b>det(<i>A</i> − λ<i>I</i>) = 0</b>. Pour une matrice 2 × 2, cela s’écrit <b>λ² − tr(<i>A</i>) λ + det(<i>A</i>) = 0</b>, où tr(<i>A</i>) = <i>a</i> + <i>d</i> est la <b>trace</b>. Le polynôme <i>p</i>(λ) = λ² − tr(<i>A</i>)λ + det(<i>A</i>) est le <b>polynôme caractéristique</b> de <i>A</i>.</p></div>
<div class="why"><p><i>A</i><b>v</b> = λ<b>v</b> ⇔ <i>A</i><b>v</b> − λ<i>I</i><b>v</b> = <b>0</b> ⇔ (<i>A</i> − λ<i>I</i>)<b>v</b> = <b>0</b>. On cherche donc un vecteur <b>v ≠ 0</b> dans le noyau de <i>A</i> − λ<i>I</i>. Cela arrive exactement quand cette matrice n’est pas inversible, c’est-à-dire quand son déterminant est nul. Enfin det(<i>A</i> − λ<i>I</i>) = (<i>a</i> − λ)(<i>d</i> − λ) − <i>bc</i> = λ² − (<i>a</i> + <i>d</i>)λ + (<i>ad</i> − <i>bc</i>).</p></div>
<div class="ex"><p>Pour <i>A</i> = ${mat([[3,1],[0,2]])} : tr <i>A</i> = 5 et det <i>A</i> = 6, donc λ² − 5λ + 6 = (λ − 2)(λ − 3) = 0. Les valeurs propres sont 3, pour <b>e₁</b>, et 2, pour la direction que tu as trouvée sur la figure.</p></div>
<div class="warn"><p>On écrit <i>A</i> − λ<i>I</i>, et non <i>A</i> − λ : on ne soustrait pas un nombre à une matrice. Retirer λ<i>I</i>, c’est retirer λ sur la diagonale seulement.</p></div>`,
   note:'Conséquence : la somme des valeurs propres vaut tr(A), leur produit vaut det(A). Pratique pour vérifier ; la raison est donnée deux étapes plus loin.'},
  {kind:'Méthode',h:'Calculer les valeurs propres d’une matrice 2 × 2',
   p:'<b>Comment :</b> 1) calcule tr <i>A</i> = <i>a</i> + <i>d</i> et det <i>A</i> = <i>ad</i> − <i>bc</i> ; 2) écris λ² − (tr <i>A</i>)λ + det <i>A</i> = 0 ; 3) résous, par factorisation ou avec le discriminant Δ ; 4) contrôle : somme des racines = trace, produit = déterminant. <b>Pourquoi :</b> det(<i>A</i> − λ<i>I</i>) = (<i>a</i> − λ)(<i>d</i> − λ) − <i>bc</i> = λ² − (<i>a</i> + <i>d</i>)λ + (<i>ad</i> − <i>bc</i>).',
   demo:{enonce:`Valeurs propres de <i>A</i> = ${M([[5,-2],[1,2]])}.`,
    etapes:[{f:'tr <i>A</i> = 7 et det <i>A</i> = 10 − (−2) = 12.',w:'Deux nombres suffisent pour écrire le polynôme.'},
     {f:'λ² − 7λ + 12 = 0.',w:'C’est le polynôme caractéristique.'},
     {f:'Δ = 49 − 48 = 1, donc λ = (7 ± 1)/2 : 3 et 4.',w:'On peut aussi chercher deux nombres de somme 7 et de produit 12.'},
     {f:'Contrôle : 3 + 4 = 7 = tr <i>A</i> et 3·4 = 12 = det <i>A</i>.',w:'Ce contrôle détecte presque toutes les erreurs de calcul.'}],
    conclusion:'Les valeurs propres de A sont <b>3 et 4</b>.'}},
  {h:'Calcule les valeurs propres',p:`Quelle est la plus grande valeur propre de ${mat([[1,2],[3,2]])}&nbsp;?`,lab:'λ =',ans:4,
   why:'tr = 3 et det = 2 − 6 = −4. λ² − 3λ − 4 = (λ − 4)(λ + 1) = 0 : les valeurs propres sont 4 et −1.'},
  {h:'Trace, déterminant et racines',p:`<p>Le polynôme caractéristique ne dépend que de deux nombres, la trace et le déterminant. Ils suffisent pour savoir combien de valeurs propres réelles possède la matrice, et pour vérifier un calcul.</p>
<div class="prop"><p>Les valeurs propres sont les racines de <i>p</i>(λ) = λ² − <i>t</i>λ + <i>δ</i>, avec <i>t</i> = tr <i>A</i> et <i>δ</i> = det <i>A</i>. Selon le discriminant <b>Δ = <i>t</i>² − 4<i>δ</i></b> : si Δ &gt; 0, deux valeurs propres réelles distinctes ; si Δ = 0, une valeur propre <b>double</b>, <i>t</i>/2 ; si Δ &lt; 0, aucune valeur propre réelle. Quand les racines λ₁ et λ₂ existent, <b>λ₁ + λ₂ = tr <i>A</i></b> et <b>λ₁λ₂ = det <i>A</i></b>.</p></div>
<div class="why"><p>Si <i>p</i> a pour racines λ₁ et λ₂, il se factorise : <i>p</i>(λ) = (λ − λ₁)(λ − λ₂) = λ² − (λ₁ + λ₂)λ + λ₁λ₂. On identifie les coefficients avec ceux de λ² − <i>t</i>λ + <i>δ</i>.</p></div>
<div class="ex"><p>Position de départ : <i>t</i> = 3 et <i>δ</i> = 2, donc Δ = 9 − 8 = 1 &gt; 0, et les racines sont 1 et 2 : on a bien 1 + 2 = 3 et 1·2 = 2. Règle <i>t</i> = 0 et <i>δ</i> = 1, comme pour la rotation d’un quart de tour ${M([[0,-1],[1,0]])} : Δ = −4 &lt; 0, la parabole ne coupe plus l’axe, et aucune direction n’est épargnée par la rotation.</p></div>`,
   params:[{id:'t',l:'trace t',min:-4,max:4,v:3},{id:'d',l:'déterminant δ',min:-4,max:5,v:2}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-9,7],h:300,step:1,lab:2}); P.fn(x=>x*x-v.t*x+v.d); const D=v.t*v.t-4*v.d;
     if(D>=0){ const r=Math.sqrt(D); P.dot((v.t-r)/2,0,{c:'var(--bad)'}); if(D>0) P.dot((v.t+r)/2,0,{c:'var(--bad)'}); } return P.svg(); },
   info:v=>{ const D=v.t*v.t-4*v.d, r=Math.sqrt(Math.abs(D)); return D>0?`Δ = ${fmt(D)} > 0 : deux valeurs propres réelles ${fmt((v.t-r)/2)} et ${fmt((v.t+r)/2)}`
     :D===0?`Δ = 0 : une valeur propre <b>double</b> λ = ${fmt(v.t/2)}`:`Δ = ${fmt(D)} < 0 : pas de valeur propre réelle, mais λ = ${fmt(v.t/2)} ± ${fmt(r/2)}i dans ℂ`; }},
  {h:'Les espaces propres',p:`<p>Une valeur propre étant trouvée, il reste à trouver ses vecteurs propres. Il n’y en a jamais un seul, puisque tous les multiples non nuls conviennent : on les regroupe en un sous-espace.</p>
<div class="def"><p>Pour une valeur propre λ, l’<b>espace propre</b> associé est <b><i>E</i><sub>λ</sub> = ker(<i>A</i> − λ<i>I</i>)</b> = {<b>v</b> : <i>A</i><b>v</b> = λ<b>v</b>} : les vecteurs propres pour λ, plus le vecteur nul.</p></div>
<div class="prop"><p><i>E</i><sub>λ</sub> est un sous-espace. En dimension 2, c’est une droite par l’origine, sauf si <i>A</i> = λ<i>I</i>, auquel cas <i>E</i><sub>λ</sub> = ℝ².</p></div>
<div class="why"><p>C’est un noyau, donc un sous-espace. Comme det(<i>A</i> − λ<i>I</i>) = 0, la matrice <i>A</i> − λ<i>I</i> est de rang 1 ou 0. Par le théorème du rang, son noyau est de dimension 1, sauf si <i>A</i> − λ<i>I</i> est la matrice nulle. En pratique, ses deux lignes sont proportionnelles et une seule équation suffit.</p></div>
<div class="ex"><p>Pour <i>A</i> = ${mat([[3,1],[0,2]])} et λ = 3 : <i>A</i> − 3<i>I</i> = ${M([[0,1],[0,-1]])}, d’où <i>y</i> = 0. Donc <i>E</i>₃ est l’axe des abscisses, Vect((1 ; 0)). Contrôle : <i>A</i>(1 ; 0) = (3 ; 0) = 3·(1 ; 0).</p></div>`,
   note:'Si les lignes de A − λI ne sont pas proportionnelles, tu t’es trompé·e sur λ : det(A − λI) devrait valoir 0.'},
  {kind:'Méthode',h:'Trouver un vecteur propre',
   p:'<b>Comment :</b> pour chaque valeur propre λ : 1) écris <i>A</i> − λ<i>I</i>, en retirant λ sur la diagonale ; 2) ses lignes sont proportionnelles : garde une ligne non nulle (<i>p</i> <i>q</i>), qui donne <i>px</i> + <i>qy</i> = 0 ; 3) le vecteur (−<i>q</i> ; <i>p</i>), ou un multiple plus simple, est solution ; 4) vérifie <i>A</i><b>v</b> = λ<b>v</b>.',
   demo:{enonce:`Vecteurs propres de <i>A</i> = ${M([[5,-2],[1,2]])}, dont les valeurs propres sont 3 et 4.`,
    etapes:[{f:`λ = 3 : <i>A</i> − 3<i>I</i> = ${M([[2,-2],[1,-1]])}, d’où <i>x</i> − <i>y</i> = 0.`,w:'Les deux lignes sont proportionnelles : la 2e suffit.'},
     {f:'<b>v₁</b> = (1 ; 1). Contrôle : <i>A</i>(1 ; 1) = (3 ; 3).',w:'On choisit y = 1, puis on vérifie.'},
     {f:`λ = 4 : <i>A</i> − 4<i>I</i> = ${M([[1,-2],[1,-2]])}, d’où <i>x</i> = 2<i>y</i>.`,w:'Même méthode.'},
     {f:'<b>v₂</b> = (2 ; 1). Contrôle : <i>A</i>(2 ; 1) = (8 ; 4) = 4·(2 ; 1).',w:'La vérification est indispensable.'}],
    conclusion:'<b>E₃ = Vect((1 ; 1))</b> et <b>E₄ = Vect((2 ; 1))</b>. Ces deux vecteurs forment une base de ℝ².'}},
  {h:'Trouve un vecteur propre',p:`Pour <i>A</i> = ${mat([[1,2],[3,2]])} et λ = 4, quel vecteur engendre <i>E</i><sub>4</sub>&nbsp;?`,
   opts:['(1 ; 1)','(3 ; 2)','(2 ; 3)','(1 ; −1)'],ans:2,
   why:`A − 4I = ${M([[-3,2],[3,-2]])} donne −3x + 2y = 0, vérifiée par (2 ; 3). Contrôle : A(2 ; 3) = (8 ; 12) = 4·(2 ; 3). Le vecteur (1 ; −1) est propre pour λ = −1.`},
  {kind:'Méthode',h:'Valeurs propres d’une matrice triangulaire',
   p:'<b>Quand :</b> la matrice n’a que des 0 sous la diagonale, ou au-dessus. <b>Pourquoi :</b> <i>A</i> − λ<i>I</i> est encore triangulaire, et son déterminant est le produit de sa diagonale, (<i>a</i> − λ)(<i>d</i> − λ). <b>Les valeurs propres se lisent donc sur la diagonale</b>, sans calcul. Les vecteurs propres se cherchent ensuite comme d’habitude.',
   demo:{enonce:`Éléments propres de <i>A</i> = ${M([[3,7],[0,-1]])}.`,
    etapes:[{f:'det(<i>A</i> − λ<i>I</i>) = (3 − λ)(−1 − λ) : λ = 3 ou λ = −1.',w:'Le coefficient 7 n’intervient pas dans le déterminant.'},
     {f:`λ = 3 : <i>A</i> − 3<i>I</i> = ${M([[0,7],[0,-4]])}, d’où <i>y</i> = 0 : <b>v</b> = (1 ; 0).`,w:'Pour une matrice triangulaire supérieure, e₁ est toujours propre.'},
     {f:`λ = −1 : <i>A</i> + <i>I</i> = ${M([[4,7],[0,0]])}, d’où 4<i>x</i> + 7<i>y</i> = 0 : <b>v</b> = (7 ; −4).`,w:'On prend (−q ; p) = (−7 ; 4), ou son opposé.'},
     {f:'Contrôle : <i>A</i>(7 ; −4) = (21 − 28 ; 4) = (−7 ; 4) = −1·(7 ; −4).',w:'On vérifie.'}],
    conclusion:'Valeurs propres <b>3 et −1</b>, de vecteurs propres (1 ; 0) et (7 ; −4).'}},
  {h:'Le cas triangulaire',p:`Quelles sont les valeurs propres de ${M([[2,5],[0,-3]])}&nbsp;?`,
   opts:['2 et 5','−3 et 5','0 et 2','2 et −3'],ans:3,
   why:'det(A − λI) = (2 − λ)(−3 − λ). Pour une matrice triangulaire, les valeurs propres sont les coefficients diagonaux. Contrôle : somme −1 = trace, produit −6 = det.'},
  {kind:'Défi',h:'Vecteur propre normalisé',p:`Soit <i>A</i> = ${M([[0,1],[-6,5]])}. Ses valeurs propres sont 2 et 3. Pour λ = 3, on cherche un vecteur propre de la forme (1 ; <i>k</i>). Combien vaut <i>k</i>&nbsp;?`,lab:'k =',ans:3,
   why:'A(1 ; k) = (k ; −6 + 5k). On veut (3 ; 3k) : k = 3, et −6 + 15 = 9 = 3·3 confirme.'},
  {h:'Deux valeurs propres, une base',p:`<p>Pour découper un vecteur selon des directions propres, il faut que ces directions forment une base du plan. Bonne nouvelle : c’est automatique dès que les deux valeurs propres sont distinctes.</p>
<div class="thm"><p>Si <b>v₁</b> et <b>v₂</b> sont des vecteurs propres de <i>A</i> associés à des valeurs propres <b>distinctes</b> λ₁ ≠ λ₂, alors la famille (<b>v₁</b>, <b>v₂</b>) est libre : c’est une base de ℝ², appelée <b>base propre</b>.</p></div>
<div class="why"><p>Supposons α<b>v₁</b> + β<b>v₂</b> = <b>0</b>. On applique <i>A</i> : αλ₁<b>v₁</b> + βλ₂<b>v₂</b> = <b>0</b>. On retranche λ₁ fois la première égalité : β(λ₂ − λ₁)<b>v₂</b> = <b>0</b>. Comme λ₂ ≠ λ₁ et <b>v₂</b> ≠ <b>0</b>, on obtient β = 0, puis α<b>v₁</b> = <b>0</b> donne α = 0.</p></div>
<div class="ex"><p>Pour <i>A</i> = ${M([[5,-2],[1,2]])}, de valeurs propres 3 et 4, on a trouvé <b>v₁</b> = (1 ; 1) et <b>v₂</b> = (2 ; 1) : det(<b>v₁</b>, <b>v₂</b>) = 1·1 − 1·2 = −1 ≠ 0, c’est bien une base. Tout vecteur s’écrit α<b>v₁</b> + β<b>v₂</b>, et <i>A</i> agit sur chaque morceau par simple multiplication : <i>A</i>(α<b>v₁</b> + β<b>v₂</b>) = 3α<b>v₁</b> + 4β<b>v₂</b>.</p></div>
<div class="warn"><p>Avec une valeur propre double, il peut n’y avoir qu’une seule direction propre. Pour ${mat([[1,1],[0,1]])}, λ = 1 et <i>A</i> − <i>I</i> = ${mat([[0,1],[0,0]])} donne <i>y</i> = 0 : seul l’axe des abscisses est propre, et il n’existe pas de base propre.</p></div>`},
  {kind:'Méthode',h:'Appliquer Aⁿ grâce aux vecteurs propres',
   p:'<b>Quand :</b> on veut <i>A</i>ⁿ<b>x</b>, une évolution répétée <i>n</i> fois, sans multiplier de matrices. <b>Pourquoi :</b> si <i>A</i><b>v</b> = λ<b>v</b>, alors <i>A</i>²<b>v</b> = λ<i>A</i><b>v</b> = λ²<b>v</b>, et par récurrence <b><i>A</i>ⁿ<b>v</b> = λⁿ<b>v</b></b>. <b>Comment :</b> 1) trouve deux vecteurs propres <b>v₁</b>, <b>v₂</b> formant une base ; 2) écris <b>x</b> = α<b>v₁</b> + β<b>v₂</b> ; 3) par linéarité, <b><i>A</i>ⁿ<b>x</b> = αλ₁ⁿ<b>v₁</b> + βλ₂ⁿ<b>v₂</b></b>.',
   demo:{enonce:`Avec <i>A</i> = ${M([[5,-2],[1,2]])}, <b>v₁</b> = (1 ; 1) pour λ = 3 et <b>v₂</b> = (2 ; 1) pour λ = 4, calcule <i>A</i>³<b>x</b> pour <b>x</b> = (3 ; 2).`,
    etapes:[{f:'α(1 ; 1) + β(2 ; 1) = (3 ; 2) : α + 2β = 3 et α + β = 2, donc β = 1 et α = 1.',w:'Coordonnées de x dans la base propre : on retranche les deux équations.'},
     {f:'<i>A</i>³<b>x</b> = 1·3³<b>v₁</b> + 1·4³<b>v₂</b> = 27(1 ; 1) + 64(2 ; 1).',w:'Chaque composante est multipliée par sa valeur propre à la puissance 3.'},
     {f:'= (155 ; 91).',w:'27 + 128 = 155 et 27 + 64 = 91.'},
     {f:'Contrôle direct : <i>A</i><b>x</b> = (11 ; 7), <i>A</i>²<b>x</b> = (41 ; 25), <i>A</i>³<b>x</b> = (155 ; 91).',w:'Trois produits matrice × vecteur confirment le résultat.'}],
    conclusion:'<b>A³x = (155 ; 91)</b>. Pour n grand, la composante de plus grande valeur propre (ici 4ⁿ) domine. Si |λ| < 1, alors λⁿ → 0 et sa composante disparaît à la limite.'}},
  {h:'Une puissance par les vecteurs propres',p:`<i>A</i> = ${mat([[2,1],[1,2]])} a pour vecteurs propres (1 ; 1), pour λ = 3, et (1 ; −1), pour λ = 1. Avec <b>x</b> = (5 ; 1), quelle est la <b>première</b> coordonnée de <i>A</i>²<b>x</b>&nbsp;?`,lab:'1re coordonnée =',ans:29,
   why:'x = 3(1 ; 1) + 2(1 ; −1). Donc A²x = 3·9(1 ; 1) + 2·1(1 ; −1) = (29 ; 25). Contrôle : Ax = (11 ; 7), puis A(11 ; 7) = (29 ; 25).'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>v</b> ≠ <b>0</b> est vecteur propre de valeur propre λ si <i>A</i><b>v</b> = λ<b>v</b> : <i>A</i> l’étire sans changer sa direction. Tout multiple non nul de <b>v</b> est encore propre. λ = 0 est valeur propre ⇔ ker <i>A</i> ≠ {<b>0</b>}.</li>
<li>λ valeur propre ⇔ det(<i>A</i> − λ<i>I</i>) = 0 ⇔ <b>λ² − tr(<i>A</i>)λ + det(<i>A</i>) = 0</b>, avec tr <i>A</i> = <i>a</i> + <i>d</i>.</li>
<li>Δ = (tr <i>A</i>)² − 4 det <i>A</i> : deux valeurs propres réelles si Δ &gt; 0, une double si Δ = 0, aucune si Δ &lt; 0. Contrôle : λ₁ + λ₂ = tr <i>A</i> et λ₁λ₂ = det <i>A</i>.</li>
<li>Matrice triangulaire : les valeurs propres sont sur la diagonale.</li>
<li><i>E</i><sub>λ</sub> = ker(<i>A</i> − λ<i>I</i>), une droite sauf si <i>A</i> = λ<i>I</i>. On garde une ligne non nulle (<i>p</i> <i>q</i>) de <i>A</i> − λ<i>I</i>, le vecteur (−<i>q</i> ; <i>p</i>) convient, et on vérifie <i>A</i><b>v</b> = λ<b>v</b>.</li>
<li>Deux valeurs propres distinctes ⇒ les vecteurs propres forment une base. Si <b>x</b> = α<b>v₁</b> + β<b>v₂</b>, alors <b><i>A</i>ⁿ<b>x</b> = αλ₁ⁿ<b>v₁</b> + βλ₂ⁿ<b>v₂</b></b> ; la valeur propre la plus grande en valeur absolue finit par dominer.</li>
</ul></div>`},
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
  {h:'Diagonaliser',p:`<p>Une matrice diagonale est la plus simple qui soit : elle étire l’axe des <i>x</i> d’un facteur et l’axe des <i>y</i> d’un autre, et ses puissances se calculent coefficient par coefficient. Diagonaliser <i>A</i>, c’est trouver une base dans laquelle elle agit de cette façon.</p>
<div class="def"><p><i>A</i> est <b>diagonalisable</b> s’il existe une base (<b>v₁</b>, <b>v₂</b>) de vecteurs propres de <i>A</i>. Avec <i>A</i><b>v₁</b> = λ₁<b>v₁</b>, <i>A</i><b>v₂</b> = λ₂<b>v₂</b>, <i>P</i> = (<b>v₁</b> | <b>v₂</b>) et <i>D</i> = diag(λ₁, λ₂), on a alors <b><i>A</i> = <i>PDP</i>⁻¹</b>, ou encore <i>D</i> = <i>P</i>⁻¹<i>AP</i>.</p></div>
<div class="why"><p>Les colonnes de <i>AP</i> sont <i>A</i><b>v₁</b> = λ₁<b>v₁</b> et <i>A</i><b>v₂</b> = λ₂<b>v₂</b>. Celles de <i>PD</i> sont aussi λ₁<b>v₁</b> et λ₂<b>v₂</b>, car multiplier à droite par une matrice diagonale multiplie chaque colonne de <i>P</i> par le coefficient correspondant. Donc <i>AP</i> = <i>PD</i>. Comme <i>P</i> est inversible, ses colonnes formant une base, on multiplie à droite par <i>P</i>⁻¹.</p></div>
<div class="idea"><p>C’est le changement de base du chapitre précédent : <i>D</i> est la matrice de la même application, écrite dans la base propre.</p></div>
<div class="ex"><p><i>A</i> = ${mat([[2,1],[1,2]])} a pour vecteurs propres (1 ; 1), pour 3, et (−1 ; 1), pour 1. Avec <i>P</i> = ${M([[1,-1],[1,1]])} et <i>D</i> = diag(3, 1) : <i>AP</i> = ${M([[3,-1],[3,1]])} et <i>PD</i> = ${M([[3,-1],[3,1]])}. Donc <i>A</i> = <i>PDP</i>⁻¹.</p></div>`,
   note:'L’ordre compte : la 1re colonne de P doit être un vecteur propre pour λ₁, la 1re valeur de D.'},
  {h:'Quand peut-on diagonaliser',p:`<p>Toutes les matrices ne sont pas diagonalisables : il faut assez de directions propres pour former une base. En dimension 2, les valeurs propres permettent presque toujours de trancher sans chercher les vecteurs.</p>
<div class="thm"><p>Soit <i>A</i> une matrice 2 × 2. <b>1.</b> Si <i>A</i> a deux valeurs propres réelles <b>distinctes</b>, elle est diagonalisable. <b>2.</b> Si elle a une valeur propre <b>double</b> λ, elle est diagonalisable seulement si <i>A</i> = λ<i>I</i>. <b>3.</b> Si ses valeurs propres ne sont pas réelles (Δ &lt; 0), elle n’est pas diagonalisable dans ℝ.</p></div>
<div class="why"><p><b>1.</b> Deux vecteurs propres associés à des valeurs propres distinctes forment une base, on l’a démontré au chapitre précédent. <b>2.</b> Si <i>A</i> = <i>PDP</i>⁻¹ avec <i>D</i> = diag(λ, λ) = λ<i>I</i>, alors <i>A</i> = <i>P</i>(λ<i>I</i>)<i>P</i>⁻¹ = λ<i>PP</i>⁻¹ = λ<i>I</i>. <b>3.</b> Sans valeur propre réelle, il n’y a aucun vecteur propre réel.</p></div>
<div class="ex"><p>${M([[2,3],[0,-1]])} : valeurs propres 2 et −1, distinctes, donc diagonalisable. ${mat([[3,0],[2,3]])} : valeur propre double 3 mais ce n’est pas 3<i>I</i>, donc non diagonalisable ; en effet <i>A</i> − 3<i>I</i> = ${mat([[0,0],[2,0]])} donne <i>x</i> = 0, une seule droite propre. ${M([[1,-2],[1,1]])} : trace 2, déterminant 3, Δ = 4 − 12 = −8 &lt; 0, aucune valeur propre réelle.</p></div>
<div class="warn"><p>Une valeur propre double n’empêche pas tout : 5<i>I</i> est déjà diagonale. Ce qui compte, c’est le nombre de directions propres indépendantes, pas le nombre de valeurs propres.</p></div>`},
  {kind:'Méthode',h:'Diagonaliser une matrice 2 × 2',
   p:'<b>Comment :</b> 1) valeurs propres par λ² − (tr <i>A</i>)λ + det <i>A</i> = 0 ; 2) décide avec le critère (deux valeurs distinctes : diagonalisable) ; 3) un vecteur propre par valeur propre ; 4) <i>P</i> = (<b>v₁</b> | <b>v₂</b>) et <i>D</i> = diag(λ₁, λ₂), <b>dans le même ordre</b> ; 5) contrôle <i>AP</i> = <i>PD</i>, plus rapide que de calculer <i>P</i>⁻¹. <b>Pourquoi :</b> <i>AP</i> = (<i>A</i><b>v₁</b> | <i>A</i><b>v₂</b>) = (λ₁<b>v₁</b> | λ₂<b>v₂</b>) = <i>PD</i>, et <i>P</i> est inversible car ses colonnes forment une base.',
   demo:{enonce:`Diagonalise <i>A</i> = ${mat([[3,1],[2,2]])}.`,
    etapes:[{f:'tr <i>A</i> = 5 et det <i>A</i> = 4 : λ² − 5λ + 4 = (λ − 1)(λ − 4).',w:'Deux valeurs propres distinctes, 4 et 1 : A est diagonalisable.'},
     {f:`λ = 4 : <i>A</i> − 4<i>I</i> = ${M([[-1,1],[2,-2]])}, d’où −<i>x</i> + <i>y</i> = 0 : <b>v₁</b> = (1 ; 1).`,w:'Une ligne suffit.'},
     {f:`λ = 1 : <i>A</i> − <i>I</i> = ${mat([[2,1],[2,1]])}, d’où 2<i>x</i> + <i>y</i> = 0 : <b>v₂</b> = (1 ; −2).`,w:'Même méthode.'},
     {f:`<i>P</i> = ${M([[1,1],[1,-2]])}, <i>D</i> = diag(4, 1), et <i>P</i>⁻¹ = ${F(1,3)} ${M([[2,1],[1,-1]])}.`,w:'1re colonne de P avec la 1re valeur de D. det P = −3.'},
     {f:`Contrôle : <i>AP</i> = ${M([[4,1],[4,-2]])} = <i>PD</i>.`,w:'A(1 ; 1) = (4 ; 4) et A(1 ; −2) = (1 ; −2).'}],
    conclusion:`<b>A = PDP⁻¹</b>, avec P = ${M([[1,1],[1,-2]])} et D = diag(4, 1).`}},
  {h:'Choisis P et D',p:`Pour <i>A</i> = ${mat([[2,0],[1,3]])}, quel couple vérifie <i>A</i> = <i>PDP</i>⁻¹&nbsp;?`,
   opts:[`<i>P</i> = ${M([[1,0],[-1,1]])}, <i>D</i> = diag(3, 2)`,`<i>P</i> = ${mat([[1,0],[1,1]])}, <i>D</i> = diag(2, 3)`,`<i>P</i> = ${M([[1,0],[-1,1]])}, <i>D</i> = diag(2, 3)`,`<i>P</i> = ${mat([[1,1],[0,1]])}, <i>D</i> = diag(2, 3)`],ans:2,
   why:'Valeurs propres 2 et 3, car A est triangulaire. E₂ : A − 2I = (0 0 ; 1 1), x + y = 0, v = (1 ; −1). E₃ : A − 3I = (−1 0 ; 1 0), x = 0, v = (0 ; 1). La colonne (1 ; −1) va avec 2, la colonne (0 ; 1) avec 3. La 1re option inverse l’ordre de D.'},
  {h:'Suivre les puissances',p:`<p>Pourquoi diagonaliser&nbsp;? Parce que les évolutions répétées <i>X</i>ₙ₊₁ = <i>AX</i>ₙ deviennent lisibles. Dans la base propre, chaque coordonnée est simplement multipliée par sa valeur propre à chaque pas.</p>
<div class="prop"><p>Si <b>x₀</b> = α<b>u</b> + β<b>v</b> avec <i>A</i><b>u</b> = λ₁<b>u</b> et <i>A</i><b>v</b> = λ₂<b>v</b>, alors <b><i>A</i>ⁿ<b>x₀</b> = αλ₁ⁿ<b>u</b> + βλ₂ⁿ<b>v</b></b>.</p></div>
<div class="why"><p>Par linéarité, <i>A</i>(α<b>u</b> + β<b>v</b>) = αλ₁<b>u</b> + βλ₂<b>v</b> : les deux coefficients sont multipliés par λ₁ et λ₂. En recommençant <i>n</i> fois, ils sont multipliés par λ₁ⁿ et λ₂ⁿ.</p></div>
<div class="idea"><p>Si |λ| &lt; 1, λⁿ tend vers 0 : la composante correspondante s’éteint. Si |λ| &gt; 1, elle grandit sans limite. Si λ = 1, elle reste fixe. La trajectoire finit donc par se ranger le long de la droite propre qui l’emporte.</p></div>
<div class="ex"><p>Ici <b>u</b> = (2 ; 1), <b>v</b> = (−1 ; 1) et <b>x₀</b> = <b>u</b> + <b>v</b> = (1 ; 2). En position de départ, λ₁ = 1 et λ₂ = 0,5 : <i>A</i>⁴<b>x₀</b> = <b>u</b> + 0,5⁴<b>v</b> = <b>u</b> + 0,0625<b>v</b> = (1,9375 ; 1,0625), déjà tout près de <b>u</b>. Fais varier les valeurs propres et le nombre de pas.</p></div>`,
   params:[{id:'l1',l:'λ₁',min:.5,max:1.25,step:.25,v:1},{id:'l2',l:'λ₂',min:.5,max:1.25,step:.25,v:.5},{id:'n',l:'n',min:0,max:8,v:4}],
   draw:v=>{ const P=plane({x:[-6,8],y:[-4,7],lab:2}), pt=k=>[2*v.l1**k-v.l2**k, v.l1**k+v.l2**k]; ln(P,2,1,{c:'var(--math)',w:1.5,dash:1}); ln(P,-1,1,{c:'var(--spark)',w:1.5,dash:1});
     const pts=[]; for(let k=0;k<=v.n;k++) pts.push(pt(k)); P.poly(pts,{open:1,c:'var(--accent)',w:2});
     pts.forEach((p,k)=>{ if(p[0]>=-6&&p[0]<=8&&p[1]>=-4&&p[1]<=7) P.dot(p[0],p[1],{r:k===v.n?6:4,c:k===v.n?'var(--bad)':'var(--accent)'}); }); return P.svg(); },
   info:v=>{ const a=v.l1**v.n,b=v.l2**v.n; return `Aⁿx₀ = ${fmt(a,3)}·u + ${fmt(b,3)}·v = (${fmt(2*a-b)} ; ${fmt(a+b)})`; },
   note:'La plus grande valeur propre (en valeur absolue) l’emporte : la trajectoire se range le long de sa droite propre.'},
  {h:'Diagonalisable ou pas&nbsp;?',p:'Laquelle de ces matrices est diagonalisable dans ℝ&nbsp;?',
   opts:[mat([[2,1],[0,2]]),M([[0,-1],[1,0]]),mat([[1,4],[0,3]]),mat([[3,1],[0,3]])],ans:2,
   why:'(1 4 ; 0 3) a deux valeurs propres distinctes, 1 et 3. Les 1re et 4e ont une valeur propre double sans être λI. La 2e (rotation de 90°) a pour valeurs propres ±i.'},
  {h:'Puissances par diagonalisation',p:`<p>Calculer <i>A</i>¹⁰ en multipliant dix fois est long et propice aux erreurs. Une matrice diagonale, elle, s’élève à la puissance <i>n</i> en un instant : la diagonalisation transporte cette facilité jusqu’à <i>A</i>.</p>
<div class="thm"><p>Si <i>A</i> = <i>PDP</i>⁻¹ avec <i>D</i> = diag(λ₁, λ₂), alors pour tout entier <i>n</i> ≥ 0 : <b><i>A</i>ⁿ = <i>PD</i>ⁿ<i>P</i>⁻¹</b>, avec <b><i>D</i>ⁿ = diag(λ₁ⁿ, λ₂ⁿ)</b>.</p></div>
<div class="why"><p><i>A</i>² = <i>PDP</i>⁻¹<i>PDP</i>⁻¹ = <i>PD</i>(<i>P</i>⁻¹<i>P</i>)<i>DP</i>⁻¹ = <i>PD</i>²<i>P</i>⁻¹, car le <i>P</i>⁻¹<i>P</i> du milieu vaut <i>I</i> ; on continue par récurrence. Et deux matrices diagonales se multiplient sur la diagonale : diag(λ₁, λ₂)·diag(μ₁, μ₂) = diag(λ₁μ₁, λ₂μ₂).</p></div>
<div class="ex"><p>Pour <i>A</i> = ${mat([[2,1],[1,2]])}, <i>P</i> = ${M([[1,-1],[1,1]])}, <i>D</i> = diag(3, 1) et <i>P</i>⁻¹ = ${F(1,2)} ${M([[1,1],[-1,1]])} : <i>PD</i>ⁿ = ${mat([['3ⁿ','−1'],['3ⁿ','1']])}, puis on multiplie par <i>P</i>⁻¹ :<br><b><i>A</i>ⁿ = ${F(1,2)} ${mat([['3ⁿ + 1','3ⁿ − 1'],['3ⁿ − 1','3ⁿ + 1']])}</b>.</p></div>
<div class="warn"><p>L’ordre des facteurs compte : <i>PD</i>ⁿ<i>P</i>⁻¹, et non <i>P</i>⁻¹<i>D</i>ⁿ<i>P</i>. Contrôle toujours avec <i>n</i> = 0, qui doit donner <i>I</i>, et <i>n</i> = 1, qui doit donner <i>A</i>.</p></div>`,
   note:'Contrôle avec n = 1 : ½(4 2 ; 2 4) = A. Avec n = 0, on retrouve bien I.'},
  {h:'Une puissance quatrième',p:`Avec la formule précédente, quel est le coefficient en haut à gauche de ${mat([[2,1],[1,2]])}⁴&nbsp;?`,lab:'coefficient =',ans:41,
   why:'(3⁴ + 1)/2 = 82/2 = 41. Contrôle : A² = (5 4 ; 4 5), puis A⁴ = (25 + 16 …) = (41 40 ; 40 41).'},
  {kind:'Méthode',h:'Calculer Aⁿ par diagonalisation',
   p:'<b>Pourquoi :</b> <i>A</i>ⁿ = (<i>PDP</i>⁻¹)(<i>PDP</i>⁻¹)…(<i>PDP</i>⁻¹). Les <i>P</i>⁻¹<i>P</i> du milieu valent <i>I</i>, et il reste <b><i>A</i>ⁿ = <i>PD</i>ⁿ<i>P</i>⁻¹</b>, avec <i>D</i>ⁿ = diag(λ₁ⁿ, λ₂ⁿ). <b>Comment :</b> 1) diagonalise ; 2) calcule <i>PD</i>ⁿ : chaque colonne de <i>P</i> est multipliée par sa valeur propre à la puissance <i>n</i> ; 3) multiplie par <i>P</i>⁻¹ ; 4) contrôle avec <i>n</i> = 0, qui doit donner <i>I</i>, et <i>n</i> = 1, qui doit donner <i>A</i>.',
   demo:{enonce:`Calcule <i>A</i>ⁿ pour <i>A</i> = ${mat([[3,1],[2,2]])} = <i>PDP</i>⁻¹, avec <i>P</i> = ${M([[1,1],[1,-2]])}, <i>D</i> = diag(4, 1).`,
    etapes:[{f:`<i>PD</i>ⁿ = ${mat([['4ⁿ','1'],['4ⁿ','−2']])}`,w:'La 1re colonne (1 ; 1) est multipliée par 4ⁿ, la 2e par 1ⁿ = 1.'},
     {f:`<i>A</i>ⁿ = ${mat([['4ⁿ','1'],['4ⁿ','−2']])} · ${F(1,3)} ${M([[2,1],[1,-1]])}`,w:'On multiplie à droite par P⁻¹.'},
     {f:`<i>A</i>ⁿ = ${F(1,3)} ${mat([['2·4ⁿ + 1','4ⁿ − 1'],['2·4ⁿ − 2','4ⁿ + 2']])}`,w:'Ligne 1 : 2·4ⁿ + 1 et 4ⁿ − 1. Ligne 2 : 2·4ⁿ − 2 et 4ⁿ + 2.'},
     {f:'Contrôle : <i>n</i> = 1 donne (1/3)(9 3 ; 6 6) = <i>A</i>, et <i>n</i> = 0 donne (1/3)(3 0 ; 0 3) = <i>I</i>.',w:'Deux contrôles rapides.'}],
    conclusion:'Cette formule donne n’importe quelle puissance de A d’un coup.'}},
  {h:'Avec la formule',p:`Avec la formule de <i>A</i>ⁿ trouvée pour <i>A</i> = ${mat([[3,1],[2,2]])}, quel est le coefficient en haut à droite de <i>A</i>³&nbsp;?`,lab:'coefficient =',ans:21,
   why:'(4³ − 1)/3 = 63/3 = 21. Contrôle : A² = (11 5 ; 10 6) et A³ = (43 21 ; 42 22).'},
  {h:'Le cas non diagonalisable',p:`<p>Que faire d’une matrice qui n’a qu’une direction propre, comme ${mat([[2,1],[0,2]])}&nbsp;? On ne peut pas la rendre diagonale, mais on peut la rendre <b>presque</b> diagonale, et ses puissances restent faciles à calculer.</p>
<div class="thm"><p>Si λ est valeur propre double de <i>A</i> et <i>A</i> ≠ λ<i>I</i>, il n’y a qu’<b>une</b> droite propre, et <i>A</i> est semblable à la <b>forme de Jordan</b> <b><i>J</i> = ${mat([['λ','1'],['0','λ']])}</b>. Ses puissances sont <b><i>J</i>ⁿ = ${mat([['λⁿ','<i>n</i>λⁿ⁻¹'],['0','λⁿ']])}</b>.</p></div>
<div class="why"><p>Le seul vecteur propre de <i>J</i>, à un multiple près, est <b>e₁</b>. Et <i>J</i><b>e₂</b> = <b>e₁</b> + λ<b>e₂</b> : <b>e₂</b> est étiré par λ, mais aussi poussé le long de la direction propre. La formule de <i>J</i>ⁿ se prouve par récurrence : dans <i>J</i>ⁿ<i>J</i>, le coefficient en haut à droite vaut λⁿ·1 + <i>n</i>λⁿ⁻¹·λ = (<i>n</i> + 1)λⁿ, et la diagonale devient λⁿ⁺¹.</p></div>
<div class="ex"><p>Pour λ = 1, <i>J</i>ⁿ = ${mat([['1','<i>n</i>'],['0','1']])} : un cisaillement de plus en plus fort. Sur la figure, l’axe des <i>x</i>, en vert, reste fixe, et le carré unité penche davantage à chaque pas. Pour λ = 3, <i>J</i>² = ${mat([[9,6],[0,9]])} : le terme hors diagonale vaut 2·3¹ = 6.</p></div>`,
   params:[{id:'n',l:'n',min:0,max:5,v:1}],
   draw:v=>{ const P=plane({x:[-1,7],y:[-1,2.5],lab:1}); P.seg(-1,0,7,0,{c:'var(--ok)',w:5,op:.4}); grille(P,1,v.n,0,1,0); return P.svg(); },
   info:v=>`Jⁿ = ${mat([[1,v.n],[0,1]])} : seul l’axe des x (en vert) reste fixe, le terme n croît sans fin`,
   note:'La partie hors diagonale croît comme nλⁿ⁻¹ : c’est la signature du cas non diagonalisable.'},
  {kind:'Méthode',h:'Puissances d’un bloc de Jordan par le binôme',
   p:`<b>Quand :</b> <i>A</i> = λ<i>I</i> + <i>N</i> avec <i>N</i>² = 0, comme <i>J</i> = λ<i>I</i> + ${mat([['0','1'],['0','0']])}. <b>Pourquoi :</b> λ<i>I</i> commute avec <i>N</i>, donc la formule du binôme (<i>a</i> + <i>b</i>)ⁿ = <i>a</i>ⁿ + <i>n</i><i>a</i>ⁿ⁻¹<i>b</i> + ${F('<i>n</i>(<i>n</i> − 1)','2')}<i>a</i>ⁿ⁻²<i>b</i>² + … s’applique, et tous les termes contenant <i>N</i>² sont nuls : <b>(λ<i>I</i> + <i>N</i>)ⁿ = λⁿ<i>I</i> + <i>n</i>λⁿ⁻¹<i>N</i></b>.`,
   demo:{enonce:`Calcule <i>J</i>⁴ pour <i>J</i> = ${mat([[3,1],[0,3]])}.`,
    etapes:[{f:`<i>J</i> = 3<i>I</i> + <i>N</i> avec <i>N</i> = ${mat([[0,1],[0,0]])}, et <i>N</i>² = 0.`,w:'On sépare la diagonale du reste. N² = 0 se vérifie en un produit.'},
     {f:'<i>J</i>⁴ = 3⁴<i>I</i> + 4·3³<i>N</i> = 81<i>I</i> + 108<i>N</i>.',w:'Binôme : seuls les deux premiers termes restent.'},
     {f:`<i>J</i>⁴ = ${mat([[81,108],[0,81]])}`,w:'On assemble.'},
     {f:`Contrôle : <i>J</i>² = ${mat([[9,6],[0,9]])}, puis <i>J</i>⁴ = (<i>J</i>²)², dont le coefficient en haut à droite vaut 9·6 + 6·9 = 108.`,w:'Calcul direct.'}],
    conclusion:'<b>J⁴ = (81 108 ; 0 81)</b>. Attention : le binôme ne s’applique qu’à des matrices qui commutent. En général, (A + B)² ≠ A² + 2AB + B².'}},
  {h:'Puissance d’un bloc de Jordan',p:`Soit <i>J</i> = ${mat([[2,1],[0,2]])}. Quel est le coefficient en haut à droite de <i>J</i>³&nbsp;?`,lab:'coefficient =',ans:12,
   why:'nλⁿ⁻¹ = 3·2² = 12. Contrôle : J² = (4 4 ; 0 4) et J³ = (8 12 ; 0 8).'},
  {h:'Valeurs propres complexes',p:`<p>La rotation d’un quart de tour n’a aucune direction propre réelle : elle fait tourner tous les vecteurs. Quand Δ &lt; 0, on ne peut donc pas diagonaliser dans ℝ, mais on peut quand même décrire la matrice très simplement : une rotation et un agrandissement.</p>
<div class="def"><p>La <b>rotation</b> d’angle θ a pour matrice <i>R</i><sub>θ</sub> = ${mat([['cos θ','−sin θ'],['sin θ','cos θ']])}. Pour <i>r</i> &gt; 0, la matrice <i>r</i>·<i>R</i><sub>θ</sub> = ${mat([['<i>a</i>','−<i>b</i>'],['<i>b</i>','<i>a</i>']])}, avec <i>a</i> = <i>r</i> cos θ et <i>b</i> = <i>r</i> sin θ, est une <b>rotation-dilatation</b> : la rotation d’angle θ suivie d’une <b>dilatation</b> de rapport <i>r</i> = √(<i>a</i>² + <i>b</i>²).</p></div>
<div class="prop"><p>Ses valeurs propres sont les nombres complexes <i>a</i> ± <i>ib</i>, non réels si <i>b</i> ≠ 0. Réciproquement, toute matrice réelle 2 × 2 de valeurs propres <i>a</i> ± <i>ib</i>, avec <i>b</i> ≠ 0, est semblable à cette matrice.</p></div>
<div class="why"><p>Sa trace vaut 2<i>a</i> et son déterminant <i>a</i>² + <i>b</i>² : le polynôme λ² − 2<i>a</i>λ + <i>a</i>² + <i>b</i>² a pour discriminant −4<i>b</i>² &lt; 0 et pour racines <i>a</i> ± <i>ib</i>. La réciproque est admise ici.</p></div>
<div class="ex"><p>Position de départ : <i>a</i> = 0,75 et <i>b</i> = 0,5, donc <i>r</i> = √(0,5625 + 0,25) ≈ 0,901 &lt; 1 et θ ≈ 33,7°. Chaque pas fait tourner le point d’environ 33,7° et le rapproche de l’origine : les itérés tournent en spirale vers 0.</p></div>`,
   params:[{id:'a',l:'a',min:-1,max:1,step:.25,v:.75},{id:'b',l:'b',min:-1,max:1,step:.25,v:.5}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}), pts=[]; let x=3,y=0; for(let k=0;k<=12;k++){ pts.push([x,y]); [x,y]=[v.a*x-v.b*y,v.b*x+v.a*y]; }
     P.circ(0,0,3,{c:'var(--muted)',w:1,dash:1}).poly(pts,{open:1,c:'var(--accent)',w:2}); pts.forEach((p,k)=>{ if(inR(p[0],p[1],5)) P.dot(p[0],p[1],{r:k?4:6,c:k?'var(--accent)':'var(--bad)'}); }); return P.svg(); },
   info:v=>{ const r=Math.hypot(v.a,v.b), th=Math.atan2(v.b,v.a)*180/Math.PI;
     return v.b===0?`b = 0 : A = ${fmt(v.a)}·I, valeur propre réelle double`:`λ = ${fmt(v.a)} ± ${fmt(Math.abs(v.b))}i · r = ${fmt(r,3)} · θ = ${fmt(th,1)}° · ${r>1?'spirale qui s’éloigne':r<1?'spirale qui se resserre':'cercle'}`; },
   note:'r > 1 : les itérés s’éloignent ; r < 1 : ils tendent vers 0 ; r = 1 : rotation pure.'},
  {kind:'Méthode',h:'Puissances d’une rotation-dilatation',
   p:`<b>Quand :</b> <i>A</i> = ${mat([['<i>a</i>','−<i>b</i>'],['<i>b</i>','<i>a</i>']])}. <b>Comment :</b> 1) calcule <i>r</i> = √(<i>a</i>² + <i>b</i>²) ; 2) trouve θ tel que cos θ = <i>a</i>/<i>r</i> et sin θ = <i>b</i>/<i>r</i> ; 3) <i>A</i> = <i>r</i>·<i>R</i><sub>θ</sub>, donc <b><i>A</i>ⁿ = <i>r</i>ⁿ<i>R</i><sub><i>n</i>θ</sub></b> : on tourne <i>n</i> fois de θ et on dilate <i>n</i> fois par <i>r</i>. <b>Pourquoi :</b> la dilatation <i>rI</i> commute avec tout, et deux rotations s’enchaînent en ajoutant les angles : <i>R</i><sub>θ</sub><i>R</i><sub>φ</sub> = <i>R</i><sub>θ+φ</sub>.`,
   demo:{enonce:`Calcule <i>A</i>³ pour <i>A</i> = ${mat([['1','−√3'],['√3','1']])}.`,
    etapes:[{f:'<i>r</i> = √(1 + 3) = 2.',w:'C’est le rapport de dilatation.'},
     {f:'cos θ = 1/2 et sin θ = √3/2 : θ = 60°.',w:'On reconnaît les valeurs de l’angle 60°.'},
     {f:'<i>A</i>³ = 2³<i>R</i><sub>180°</sub> = 8·(−<i>I</i>) = −8<i>I</i>.',w:'Trois fois 60° font un demi-tour, de matrice −I.'},
     {f:`Contrôle : <i>A</i>² = ${mat([['−2','−2√3'],['2√3','−2']])}, puis <i>A</i>²<i>A</i> = ${M([[-8,0],[0,-8]])}.`,w:'−2 − 2√3·√3 = −8 et −2√3 + 2√3 = 0.'}],
    conclusion:'<b>A³ = −8I</b>, et donc A⁶ = 64I.'}},
  {kind:'Défi',h:'Une puissance qui tourne',p:`Soit <i>A</i> = ${M([[1,-1],[1,1]])}. Quel est le coefficient en haut à gauche de <i>A</i>⁸&nbsp;?`,lab:'coefficient =',ans:16,
   why:'A = √2·R₄₅°, donc A⁸ = (√2)⁸·R₃₆₀° = 16·I. Contrôle : A² = (0 −2 ; 2 0), A⁴ = −4I, A⁸ = 16I.'},
  {kind:'Méthode',h:'Résoudre une récurrence linéaire d’ordre 2',
   p:`<b>Quand :</b> <i>u</i>ₙ₊₂ = <i>a</i><i>u</i>ₙ₊₁ + <i>b</i><i>u</i>ₙ, avec <i>u</i>₀ et <i>u</i>₁ donnés. <b>Pourquoi :</b> <i>X</i>ₙ = (<i>u</i>ₙ₊₁ ; <i>u</i>ₙ) vérifie <i>X</i>ₙ₊₁ = <i>AX</i>ₙ avec <i>A</i> = ${mat([['<i>a</i>','<i>b</i>'],['1','0']])}, de trace <i>a</i> et de déterminant −<i>b</i>, donc de polynôme caractéristique λ² − <i>a</i>λ − <i>b</i>. Si ses racines <i>r</i>₁ ≠ <i>r</i>₂, <i>A</i> est diagonalisable et chaque coefficient de <i>A</i>ⁿ combine <i>r</i>₁ⁿ et <i>r</i>₂ⁿ. <b>Comment :</b> 1) résous <i>r</i>² = <i>ar</i> + <i>b</i> ; 2) écris <i>u</i>ₙ = α<i>r</i>₁ⁿ + β<i>r</i>₂ⁿ ; 3) trouve α et β avec <i>u</i>₀ et <i>u</i>₁ ; 4) contrôle sur <i>u</i>₂.`,
   demo:{enonce:'<i>u</i>₀ = 0, <i>u</i>₁ = 1 et <i>u</i>ₙ₊₂ = 5<i>u</i>ₙ₊₁ − 6<i>u</i>ₙ.',
    etapes:[{f:'<i>r</i>² = 5<i>r</i> − 6 ⇔ <i>r</i>² − 5<i>r</i> + 6 = 0 ⇔ <i>r</i> = 2 ou <i>r</i> = 3.',w:'C’est le polynôme caractéristique de A = (5 −6 ; 1 0), de trace 5 et de déterminant 6.'},
     {f:'<i>u</i>ₙ = α·2ⁿ + β·3ⁿ.',w:'Deux racines distinctes.'},
     {f:'<i>n</i> = 0 : α + β = 0. <i>n</i> = 1 : 2α + 3β = 1. Donc β = 1 et α = −1.',w:'Deux conditions initiales pour deux inconnues.'},
     {f:'<i>u</i>ₙ = 3ⁿ − 2ⁿ. Contrôle : la récurrence donne <i>u</i>₂ = 5·1 − 6·0 = 5, et 9 − 4 = 5.',w:'On vérifie sur un terme qu’on n’a pas utilisé.'}],
    conclusion:'<b>uₙ = 3ⁿ − 2ⁿ</b>. Par exemple u₃ = 27 − 8 = 19, comme 5·5 − 6·1.'}},
  {h:'Une récurrence à résoudre',p:'On pose <i>u</i>₀ = 2, <i>u</i>₁ = 3 et <i>u</i>ₙ₊₂ = 3<i>u</i>ₙ₊₁ − 2<i>u</i>ₙ. Trouve la formule explicite, puis calcule <i>u</i>₈.',lab:'u₈ =',ans:257,
   why:'r² − 3r + 2 = (r − 1)(r − 2). Donc uₙ = α + β·2ⁿ avec α + β = 2 et α + 2β = 3 : β = 1 et α = 1. Ainsi uₙ = 1 + 2ⁿ et u₈ = 257.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><i>A</i> diagonalisable ⇔ il existe une base de vecteurs propres. Alors <b><i>A</i> = <i>PDP</i>⁻¹</b>, <i>P</i> = (<b>v₁</b> | <b>v₂</b>) et <i>D</i> = diag(λ₁, λ₂) dans le <b>même ordre</b>. Contrôle : <i>AP</i> = <i>PD</i>.</li>
<li>Critère en dimension 2 : deux valeurs propres réelles distinctes ⇒ diagonalisable ; valeur propre double λ ⇒ diagonalisable seulement si <i>A</i> = λ<i>I</i> ; Δ &lt; 0 ⇒ pas diagonalisable dans ℝ.</li>
<li><b><i>A</i>ⁿ = <i>PD</i>ⁿ<i>P</i>⁻¹</b>, <i>D</i>ⁿ = diag(λ₁ⁿ, λ₂ⁿ). Contrôles : <i>n</i> = 0 donne <i>I</i>, <i>n</i> = 1 donne <i>A</i>.</li>
<li>Si <b>x₀</b> = α<b>u</b> + β<b>v</b> dans une base propre, <i>A</i>ⁿ<b>x₀</b> = αλ₁ⁿ<b>u</b> + βλ₂ⁿ<b>v</b> : une composante avec |λ| &lt; 1 s’éteint, la plus grande |λ| domine.</li>
<li>Cas non diagonalisable : <i>A</i> semblable à <i>J</i> = λ<i>I</i> + <i>N</i>, avec <i>N</i> = (0 1 ; 0 0) et <i>N</i>² = 0. Binôme : <b><i>J</i>ⁿ = λⁿ<i>I</i> + <i>n</i>λⁿ⁻¹<i>N</i></b>.</li>
<li>Valeurs propres <i>a</i> ± <i>ib</i> : rotation-dilatation (<i>a</i> −<i>b</i> ; <i>b</i> <i>a</i>) = <i>rR</i><sub>θ</sub>, <i>r</i> = √(<i>a</i>² + <i>b</i>²). <b>(<i>rR</i><sub>θ</sub>)ⁿ = <i>r</i>ⁿ<i>R</i><sub><i>n</i>θ</sub></b> : spirale qui s’éloigne si <i>r</i> &gt; 1, qui se resserre si <i>r</i> &lt; 1.</li>
<li>Récurrence <i>u</i>ₙ₊₂ = <i>au</i>ₙ₊₁ + <i>bu</i>ₙ : on résout <i>r</i>² = <i>ar</i> + <i>b</i> ; si <i>r</i>₁ ≠ <i>r</i>₂, <i>u</i>ₙ = α<i>r</i>₁ⁿ + β<i>r</i>₂ⁿ, et <i>u</i>₀, <i>u</i>₁ fixent α et β.</li>
</ul></div>`},
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
