/* Déclic — Analyse I (PREPA-003 / PREPA-004) */
(()=>{
/* ---------- helpers locaux ---------- */
// tableau (1re ligne = en-tête) : sert aux tableaux de signes et de variations
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;
// droite numérique avec un intervalle [a ; b], lo/ro = bord gauche/droit ouvert
function iline(a,b,lo,ro,col='var(--accent)'){
  const P=plane({x:[-5.6,5.6],y:[-1.1,1.1],grid:false,axes:false});
  P.seg(-5.5,0,5.5,0,{c:'var(--muted)',w:1.5});
  for(let k=-5;k<=5;k++){ P.seg(k,-.12,k,.12,{c:'var(--muted)',w:1.2}); P.text(k,0,fmt(k),{a:'middle',dy:24,s:11,c:'var(--muted)'}); }
  P.seg(a,0,b,0,{c:col,w:6});
  P.text(a,0,lo?']':'[',{a:'middle',dy:8,s:24,c:col}).text(b,0,ro?'[':']',{a:'middle',dy:8,s:24,c:col});
  return P.svg();
}
const iv=(a,b,lo,ro)=>`${lo?']':'['}${fmt(a)} ; ${fmt(b)}${ro?'[':']'}`;
const fact=n=>n<2?1:n*fact(n-1);

CMS.push(
/* ===================== AUTOMNE ===================== */
{subj:'an1', sem:'aut', id:'cms-an1-nombres', h:'Nombres et (in)équations', p:'Les ensembles de nombres, les intervalles et la résolution d’inéquations avec un tableau de signes.', steps:[
 {kind:'Théorie',h:'Des ensembles emboîtés',p:'Les <b>naturels</b> ℕ = {0, 1, 2, …}, les <b>entiers</b> ℤ, les <b>rationnels</b> ℚ (quotients <i>p</i>/<i>q</i> avec <i>q</i> ≠ 0) et les <b>réels</b> ℝ. Chaque ensemble contient le précédent : <b>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</b>.',
  fig:(()=>{ const P=plane({x:[0,10],y:[0,6],grid:false,axes:false});
    P.rect(.2,.2,9.6,5.6,{fill:'var(--sci)',fo:.12,c:'var(--ink)',w:1.5}).rect(.6,.6,7,4.5,{fill:'var(--math)',fo:.15,c:'var(--ink)',w:1.5})
     .rect(1,1,4.4,3.4,{fill:'var(--spark)',fo:.2,c:'var(--ink)',w:1.5}).rect(1.4,1.4,2,2.2,{fill:'var(--accent)',fo:.25,c:'var(--ink)',w:1.5});
    P.text(.4,5.8,'ℝ',{dy:18,s:15}).text(.8,5.1,'ℚ',{dy:18,s:15}).text(1.2,4.4,'ℤ',{dy:18,s:15}).text(1.6,3.6,'ℕ',{dy:18,s:15});
    P.text(1.9,2,'0',{a:'middle'}).text(2.8,2.6,'7',{a:'middle'}).text(4.4,2.4,'−3',{a:'middle'}).text(6.5,3,'−2/5',{a:'middle'}).text(6.5,1.6,'0,3̅',{a:'middle'})
     .text(8.8,3.2,'√2',{a:'middle'}).text(8.8,1.8,'π',{a:'middle'});
    return P.svg(); })(),
  note:'Un nombre dont l’écriture décimale est périodique est rationnel : 0,333… = 1/3. √2 et π ne le sont pas, ce sont des <b>irrationnels</b>.'},
 {h:'Le plus petit ensemble',p:`Quel est le plus petit ensemble qui contient le nombre ${F('−12','4')}&nbsp;?`,opts:['ℕ','ℤ','ℚ','ℝ'],ans:1,
  why:'−12/4 = −3. C’est un entier négatif : il est dans ℤ mais pas dans ℕ.'},
 {kind:'Théorie',h:'Intervalles',p:'Un intervalle est un « morceau » de la droite réelle. Le crochet tourné vers le nombre l’inclut, le crochet tourné vers l’extérieur l’exclut : <b>[a ; b]</b> = {<i>x</i> : <i>a</i> ≤ <i>x</i> ≤ <i>b</i>}, <b>]a ; b[</b> = {<i>x</i> : <i>a</i> &lt; <i>x</i> &lt; <i>b</i>}.',
  params:[{id:'a',l:'a',min:-5,max:0,step:.5,v:-2},{id:'b',l:'b',min:.5,max:5,step:.5,v:3},{id:'lo',l:'Bord gauche (0 fermé, 1 ouvert)',min:0,max:1,v:0},{id:'ro',l:'Bord droit (0 fermé, 1 ouvert)',min:0,max:1,v:1}],
  draw:v=>iline(v.a,v.b,v.lo,v.ro),
  info:v=>`${iv(v.a,v.b,v.lo,v.ro)} = {<i>x</i> ∈ ℝ : ${fmt(v.a)} ${v.lo?'&lt;':'≤'} <i>x</i> ${v.ro?'&lt;':'≤'} ${fmt(v.b)}}`,
  note:'Avec l’infini, le crochet est toujours ouvert : [2 ; +∞[ = {<i>x</i> : <i>x</i> ≥ 2}. ∞ n’est pas un réel.'},
 {kind:'Pratique',h:'Représente l’ensemble',p:'Règle les curseurs pour représenter {<i>x</i> ∈ ℝ : −2 &lt; <i>x</i> ≤ 3}.',
  params:[{id:'a',l:'a',min:-5,max:0,step:.5,v:-1},{id:'b',l:'b',min:.5,max:5,step:.5,v:2},{id:'lo',l:'Bord gauche (0 fermé, 1 ouvert)',min:0,max:1,v:0},{id:'ro',l:'Bord droit (0 fermé, 1 ouvert)',min:0,max:1,v:0}],
  draw:v=>iline(v.a,v.b,v.lo,v.ro), info:v=>iv(v.a,v.b,v.lo,v.ro),
  ok:v=>v.a===-2&&v.b===3&&v.lo===1&&v.ro===0,why:'−2 est exclu (inégalité stricte) et 3 est inclus : c’est ]−2 ; 3].'},
 {kind:'Théorie',h:'Résoudre une inéquation',p:'On transforme l’inéquation en une inéquation équivalente plus simple. On peut ajouter un même nombre des deux côtés, et multiplier par un nombre <b>positif</b>. <b>Multiplier ou diviser par un nombre négatif renverse le sens</b> : −3<i>x</i> &gt; −6 ⇔ <i>x</i> &lt; 2.',
  note:'<b>Piège :</b> ne multiplie jamais par une expression dont tu ne connais pas le signe, comme (<i>x</i> − 1). C’est pour ça qu’on utilise un tableau de signes.'},
 {h:'À toi',p:'Résous 2<i>x</i> − 5 ≤ 7<i>x</i> + 10. L’ensemble des solutions s’écrit [<i>a</i> ; +∞[. Donne <i>a</i>.',lab:'a =',ans:-3,
  why:'On regroupe : −5 − 10 ≤ 7x − 2x, soit −15 ≤ 5x, donc x ≥ −3. S = [−3 ; +∞[.'},
 {kind:'Méthode',h:'Le tableau de signes',p:`Pour un produit ou un quotient, on étudie le signe de chaque facteur, puis on applique la règle des signes. Exemple : ${F('<i>x</i> − 1','<i>x</i> + 2')} ≤ 0.`,
  fig:tab([['<i>x</i>','−∞','','−2','','1','','+∞'],['<i>x</i> − 1','','−','|','−','0','+',''],['<i>x</i> + 2','','−','0','+','|','+',''],['quotient','','+','‖','−','0','+','']]),
  note:'La double barre ‖ marque une <b>valeur interdite</b> : on l’exclut toujours. Ici S = ]−2 ; 1] (1 est inclus car le quotient y vaut 0).'},
 {kind:'Défi',h:'Produit et quotient',p:`Résous ${F('(<i>x</i> + 1)(3 − <i>x</i>)','<i>x</i>')} &gt; 0.`,
  opts:[']−1 ; 0[ ∪ ]3 ; +∞[',']−1 ; 3[',']−∞ ; −1[ ∪ ]0 ; 3[',']−∞ ; −1] ∪ ]0 ; 3]'],ans:2,
  why:'Zéros : −1 et 3, valeur interdite 0. Signes de gauche à droite : + (x &lt; −1), − (entre −1 et 0), + (entre 0 et 3), − (x &gt; 3). Inégalité stricte : S = ]−∞ ; −1[ ∪ ]0 ; 3[.'},
]},

{subj:'an1', sem:'aut', id:'cms-an1-trinome', h:'Valeurs absolues et trinôme', p:'La valeur absolue comme distance, puis le trinôme du second degré : discriminant, racines, signe et factorisation.', steps:[
 {kind:'Théorie',h:'La valeur absolue est une distance',p:'<b>|x| = x</b> si <i>x</i> ≥ 0 et <b>|x| = −x</b> si <i>x</i> &lt; 0. Le nombre <b>|a − b|</b> est la distance entre <i>a</i> et <i>b</i> sur la droite réelle.',
  params:[{id:'a',l:'a',min:-5,max:5,step:.5,v:-2},{id:'b',l:'b',min:-5,max:5,step:.5,v:3}],
  draw:v=>{ const P=plane({x:[-5.6,5.6],y:[-1.1,1.6],grid:false,axes:false}); P.seg(-5.5,0,5.5,0,{c:'var(--muted)',w:1.5});
    for(let k=-5;k<=5;k++){ P.seg(k,-.12,k,.12,{c:'var(--muted)',w:1.2}); P.text(k,0,fmt(k),{a:'middle',dy:24,s:11,c:'var(--muted)'}); }
    if(v.a!==v.b) P.seg(v.a,.6,v.b,.6,{c:'var(--spark)',w:3}).text((v.a+v.b)/2,.6,`${fmt(Math.abs(v.a-v.b),1)}`,{a:'middle',dy:-8});
    P.dot(v.a,0,{l:'a',c:'var(--accent)'}).dot(v.b,0,{l:'b',c:'var(--math)'}); return P.svg(); },
  info:v=>`|a − b| = |${fmt(v.a,1)} − (${fmt(v.b,1)})| = ${fmt(Math.abs(v.a-v.b),1)} = |b − a|`,
  note:'√(x²) = |x|, et pas x : √((−3)²) = 3.'},
 {h:'Équation avec valeur absolue',p:'Résous |2<i>x</i> − 3| = 7. Donne la plus petite solution.',lab:'x =',ans:-2,
  why:'|A| = 7 ⇔ A = 7 ou A = −7. Donc 2x − 3 = 7 (x = 5) ou 2x − 3 = −7 (x = −2). La plus petite est −2.'},
 {kind:'Théorie',h:'Inéquations : penser distance',p:'|<i>x</i> − <i>a</i>| &lt; <i>r</i> veut dire « <i>x</i> est à moins de <i>r</i> de <i>a</i> » : <b><i>a</i> − <i>r</i> &lt; <i>x</i> &lt; <i>a</i> + <i>r</i></b>. À l’inverse, |<i>x</i> − <i>a</i>| &gt; <i>r</i> ⇔ <b><i>x</i> &lt; <i>a</i> − <i>r</i> ou <i>x</i> &gt; <i>a</i> + <i>r</i></b>.',
  fig:iline(-2,4,0,0),note:'Ci-dessus : |<i>x</i> − 1| ≤ 3, les points à distance au plus 3 de 1, soit [−2 ; 4].'},
 {h:'À toi',p:'Quel est l’ensemble des solutions de |<i>x</i> + 2| &gt; 3&nbsp;?',opts:[']−5 ; 1[',']−∞ ; −5[ ∪ ]1 ; +∞[',']−∞ ; −1[ ∪ ]5 ; +∞[',']−∞ ; 1['],ans:1,
  why:'|x + 2| = |x − (−2)| est la distance à −2. Elle dépasse 3 si x &lt; −5 ou x &gt; 1.'},
 {kind:'Théorie',h:'Le trinôme et son discriminant',p:'Pour <i>ax² + bx + c</i> avec <i>a</i> ≠ 0, on pose <b>Δ = b² − 4ac</b>. Si Δ &gt; 0 : deux racines <b>x = (−b ± √Δ)/(2a)</b>. Si Δ = 0 : une racine double −b/(2a). Si Δ &lt; 0 : pas de racine réelle.',
  params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'b',l:'b',min:-4,max:4,v:-2},{id:'c',l:'c',min:-4,max:4,v:-3}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2}); P.fn(x=>v.a*x*x+v.b*x+v.c);
    const D=v.b*v.b-4*v.a*v.c; if(v.a!==0&&D>=0){ const s=Math.sqrt(D); [(-v.b-s)/(2*v.a),(-v.b+s)/(2*v.a)].forEach(r=>P.dot(r,0,{r:5})); } return P.svg(); },
  info:v=>{ if(v.a===0) return '<i>a</i> = 0 : ce n’est plus un trinôme, mais une fonction affine.'; const D=v.b*v.b-4*v.a*v.c;
    if(D<0) return `Δ = ${fmt(D)} &lt; 0 : aucune racine réelle, la parabole ne coupe pas l’axe.`;
    if(D===0) return `Δ = 0 : racine double x = ${fmt(-v.b/(2*v.a))}`;
    const s=Math.sqrt(D); return `Δ = ${fmt(D)} &gt; 0 : x₁ ≈ ${fmt((-v.b-s)/(2*v.a))}, x₂ ≈ ${fmt((-v.b+s)/(2*v.a))}`; }},
 {kind:'Pratique',h:'Une racine double',p:'Règle <i>c</i> pour que <i>x² + 2x + c</i> ait une racine double.',
  params:[{id:'c',l:'c',min:-4,max:4,step:.5,v:-2}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2}); P.fn(x=>x*x+2*x+v.c); return P.svg(); },
  info:v=>`Δ = 4 − 4·${fmt(v.c)} = ${fmt(4-4*v.c)}`,
  ok:v=>v.c===1,why:'Δ = 2² − 4·1·c = 4 − 4c = 0 donne c = 1. Alors x² + 2x + 1 = (x + 1)² : la parabole touche l’axe en −1.'},
 {kind:'Théorie',h:'Signe et factorisation',p:'Si Δ &gt; 0, <b><i>ax² + bx + c</i> = <i>a</i>(<i>x</i> − <i>x</i>₁)(<i>x</i> − <i>x</i>₂)</b>. Le trinôme a <b>le signe de <i>a</i> à l’extérieur des racines</b> et le signe opposé entre elles. Si Δ &lt; 0, il garde partout le signe de <i>a</i>.',
  fig:tab([['<i>x</i>','−∞','','<i>x</i>₁','','<i>x</i>₂','','+∞'],['<i>ax² + bx + c</i>','','signe de <i>a</i>','0','signe de −<i>a</i>','0','signe de <i>a</i>','']])},
 {h:'Factorise',p:'Quelle est la factorisation de 2<i>x</i>² − 2<i>x</i> − 12&nbsp;?',opts:['(2x − 6)(x − 2)','2(x + 3)(x − 2)','2(x − 6)(x + 1)','2(x − 3)(x + 2)'],ans:3,
  why:'2x² − 2x − 12 = 2(x² − x − 6). Δ = 1 + 24 = 25, racines (1 ± 5)/2, soit 3 et −2. Donc 2(x − 3)(x + 2).'},
 {kind:'Défi',h:'Les deux à la fois',p:'Résous <i>x</i>² − 2|<i>x</i>| − 3 &lt; 0. L’ensemble des solutions est un intervalle : quelle est sa longueur&nbsp;?',ans:6,
  why:'Avec t = |x| ≥ 0 (et x² = t²) : t² − 2t − 3 = (t − 3)(t + 1) &lt; 0 ⇔ −1 &lt; t &lt; 3. Donc |x| &lt; 3, S = ]−3 ; 3[, de longueur 6.'},
]},

{subj:'an1', sem:'aut', id:'cms-an1-suites', h:'Suites et limites', p:'Suites bornées et monotones, la définition ε–N de la limite, les limites infinies et les formes indéterminées.', steps:[
 {kind:'Théorie',h:'Une suite, une liste infinie',p:'Une <b>suite</b> (<i>uₙ</i>) associe un réel <i>uₙ</i> à chaque naturel <i>n</i>. Elle est <b>bornée</b> s’il existe <i>M</i> avec |<i>uₙ</i>| ≤ <i>M</i> pour tout <i>n</i>, <b>croissante</b> si <i>uₙ₊₁</i> ≥ <i>uₙ</i>, <b>décroissante</b> si <i>uₙ₊₁</i> ≤ <i>uₙ</i>.',
  params:[{id:'k',l:'Suite',min:0,max:3,v:0}],
  draw:v=>{ const u=[n=>1/n,n=>(-1)**n,n=>Math.sqrt(n),n=>(2*n+1)/(n+1)][v.k], P=plane({x:[-1,21],y:[-1.6,5],h:220,grid:false,lx:5,ly:1});
    for(let n=1;n<=20;n++) P.dot(n,u(n),{r:4,c:'var(--accent)'}); return P.svg(); },
  info:v=>['<i>uₙ</i> = 1/<i>n</i> : décroissante, bornée, tend vers 0.','<i>uₙ</i> = (−1)ⁿ : bornée, pas monotone, n’a pas de limite.','<i>uₙ</i> = √<i>n</i> : croissante, non bornée, tend vers +∞.','<i>uₙ</i> = (2<i>n</i> + 1)/(<i>n</i> + 1) : croissante, bornée par 2, tend vers 2.'][v.k]},
 {h:'Classe la suite',p:'La suite <i>uₙ</i> = (−1)ⁿ/<i>n</i> (pour <i>n</i> ≥ 1) est…',opts:['croissante et bornée','monotone et non bornée','bornée et non monotone','ni bornée, ni convergente'],ans:2,
  why:'|uₙ| = 1/n ≤ 1, donc elle est bornée. Ses termes changent de signe (−1, 1/2, −1/3, …) : elle n’est pas monotone. Elle tend tout de même vers 0.'},
 {kind:'Théorie',h:'La définition ε–N',p:'<b>uₙ → L</b> signifie : pour tout ε &gt; 0, il existe un rang <i>N</i> tel que <b><i>n</i> ≥ <i>N</i> ⇒ |<i>uₙ</i> − <i>L</i>| &lt; ε</b>. Ici <i>uₙ</i> = (2<i>n</i> + 1)/(<i>n</i> + 1) et <i>L</i> = 2. Plus ε est petit, plus <i>N</i> doit être grand.',
  params:[{id:'e',l:'ε',min:.05,max:.5,step:.05,v:.2},{id:'N',l:'N',min:1,max:30,v:2}],
  draw:v=>{ const P=plane({x:[-.5,31],y:[1.3,2.6],h:220,grid:false,lx:5});
    P.rect(0,2-v.e,31,2*v.e,{fill:'var(--ok)',fo:.15,c:null}).seg(0,2,31,2,{c:'var(--ok)',w:1.5,dash:true}).seg(v.N,1.3,v.N,2.6,{c:'var(--muted)',w:1.5});
    for(let n=1;n<=30;n++){ const u=(2*n+1)/(n+1); P.dot(n,u,{r:3.5,c:n<v.N?'var(--muted)':Math.abs(u-2)<v.e-1e-12?'var(--accent)':'var(--bad)'}); }
    P.text(v.N,2.6,'N',{dx:4,dy:14}); return P.svg(); },
  info:v=>{ const ok=1/(v.N+1)<v.e-1e-12; return `|<i>uₙ</i> − 2| = 1/(<i>n</i> + 1). ${ok?'Tous les termes à partir du rang N sont dans la bande.':'Certains termes après N sortent encore de la bande.'}`; }},
 {kind:'Pratique',h:'Trouve le rang',p:'Avec ε = 0,1 : trouve le <b>plus petit</b> <i>N</i> tel que |<i>uₙ</i> − 2| &lt; 0,1 pour tout <i>n</i> ≥ <i>N</i>.',
  params:[{id:'N',l:'N',min:1,max:30,v:3}],
  draw:v=>{ const P=plane({x:[-.5,31],y:[1.3,2.6],h:220,grid:false,lx:5});
    P.rect(0,1.9,31,.2,{fill:'var(--ok)',fo:.15,c:null}).seg(0,2,31,2,{c:'var(--ok)',w:1.5,dash:true}).seg(v.N,1.3,v.N,2.6,{c:'var(--muted)',w:1.5});
    for(let n=1;n<=30;n++){ const u=(2*n+1)/(n+1); P.dot(n,u,{r:3.5,c:n<v.N?'var(--muted)':Math.abs(u-2)<.1-1e-12?'var(--accent)':'var(--bad)'}); } return P.svg(); },
  info:v=>`Pour n = N = ${v.N} : |u − 2| = 1/${v.N+1} ≈ ${fmt(1/(v.N+1),3)}`,
  ok:v=>v.N===10,why:'1/(n + 1) &lt; 0,1 ⇔ n + 1 &gt; 10 ⇔ n &gt; 9. Le premier rang qui marche est N = 10 (pour n = 9 on a exactement 0,1, pas strictement moins).'},
 {kind:'Théorie',h:'Limites infinies et règles de calcul',p:'<b>uₙ → +∞</b> signifie : pour tout <i>A</i>, il existe <i>N</i> tel que <i>n</i> ≥ <i>N</i> ⇒ <i>uₙ</i> &gt; <i>A</i>. Les limites s’additionnent, se multiplient et se divisent comme on l’attend, avec les conventions <i>L</i> + ∞ = ∞, ∞ · ∞ = ∞, <i>L</i>/∞ = 0.',
  note:'Quatre <b>formes indéterminées</b> ne se décident pas d’avance : <b>∞ − ∞</b>, <b>0 · ∞</b>, <b>∞/∞</b> et <b>0/0</b>. Il faut transformer l’expression (factoriser, conjugué, …).'},
 {h:'Reconnais la forme',p:'Laquelle de ces situations est une forme indéterminée&nbsp;?',opts:['uₙ → +∞ et vₙ → +∞, on cherche lim (uₙ + vₙ)','uₙ → 3 et vₙ → +∞, on cherche lim uₙ/vₙ','uₙ → 0 et vₙ → +∞, on cherche lim uₙ·vₙ','uₙ → +∞ et vₙ → +∞, on cherche lim uₙ·vₙ'],ans:2,
  why:'0 · ∞ est indéterminé : 1/n · n → 1 mais 1/n · n² → +∞. Les autres cas donnent +∞, 0 et +∞.'},
 {h:'Lever l’indétermination',p:`Calcule lim ${F('3<i>n</i>² − <i>n</i> + 1','2<i>n</i>² + 5')} quand <i>n</i> → ∞.`,lab:'L =',ans:1.5,tol:1e-9,
  why:'On factorise n² en haut et en bas : (3 − 1/n + 1/n²)/(2 + 5/n²) → 3/2 = 1,5.'},
 {kind:'Défi',h:'Avec le conjugué',p:'Calcule lim (√(<i>n</i>² + 4<i>n</i>) − <i>n</i>) quand <i>n</i> → ∞.',lab:'L =',ans:2,
  why:'Forme ∞ − ∞. On multiplie par le conjugué : (n² + 4n − n²)/(√(n² + 4n) + n) = 4n/(n(√(1 + 4/n) + 1)) → 4/2 = 2.'},
]},

{subj:'an1', sem:'aut', id:'cms-an1-geometrique', h:'Série géométrique et nombre d’Euler', p:'Sommer une infinité de termes : la série géométrique, puis le nombre e vu de deux façons.', steps:[
 {kind:'Théorie',h:'Sommes partielles',p:'Pour <i>q</i> ≠ 1, la somme partielle vaut <b>Sₙ = 1 + q + q² + … + qⁿ = (1 − qⁿ⁺¹)/(1 − q)</b>. Si |<i>q</i>| &lt; 1, <i>qⁿ⁺¹</i> → 0, donc <b>Σ qᵏ = 1/(1 − q)</b>. Joue avec <i>q</i> et observe les sommes partielles.',
  params:[{id:'q',l:'q',min:-1.2,max:1.2,step:.1,v:.5},{id:'n',l:'n',min:0,max:20,v:5}],
  draw:v=>{ const P=plane({x:[-1,21],y:[-2,6],h:240,grid:false,lx:5,ly:1}); let s=0;
    if(Math.abs(v.q)<1-1e-9) P.seg(0,1/(1-v.q),21,1/(1-v.q),{c:'var(--ok)',w:1.5,dash:true});
    for(let k=0;k<=20;k++){ s+=v.q**k; if(s>-2&&s<6) P.dot(k,s,{r:k===v.n?6:3.5,c:k===v.n?'var(--spark)':'var(--accent)'}); } return P.svg(); },
  info:v=>{ let s=0; for(let k=0;k<=v.n;k++) s+=v.q**k; return `S<sub>${v.n}</sub> ≈ ${fmt(s,4)} · `+(Math.abs(v.q)<1-1e-9?`limite 1/(1 − q) ≈ ${fmt(1/(1-v.q),4)}`:'|q| ≥ 1 : la série diverge'); },
  note:'Si |<i>q</i>| ≥ 1, le terme <i>qⁿ</i> ne tend pas vers 0, la série ne peut pas converger.'},
 {h:'Somme à partir de k = 1',p:'Calcule la somme Σ<sub>k=1</sub><sup>∞</sup> (2/3)<sup>k</sup>.',lab:'S =',ans:2,
  why:'Le premier terme est 2/3 et la raison 2/3 : S = (2/3)/(1 − 2/3) = (2/3)/(1/3) = 2.'},
 {h:'Convergente ou pas&nbsp;?',p:'Laquelle de ces séries converge&nbsp;?',opts:['Σ (1,1)ⁿ','Σ (−1)ⁿ','Σ (−1,5)ⁿ','Σ (−0,9)ⁿ'],ans:3,
  why:'Seule |−0,9| &lt; 1. Sa somme vaut 1/(1 + 0,9) = 1/1,9 ≈ 0,526. Pour (−1)ⁿ, les sommes partielles oscillent entre 1 et 0.'},
 {h:'Un nombre périodique',p:'0,272727… = 27/100 + 27/100² + … Écris ce nombre comme une fraction (par exemple 3/7).',lab:'x =',ans:3/11,tol:1e-6,
  why:'Série géométrique de premier terme 27/100 et de raison 1/100 : (27/100)/(1 − 1/100) = 27/99 = 3/11.'},
 {kind:'Théorie',h:'Le nombre e, deux fois',p:'Les deux suites <b>(1 + 1/n)ⁿ</b> et <b>Σ<sub>k=0</sub><sup>n</sup> 1/k!</b> tendent vers la même limite, <b>e ≈ 2,71828</b>. La seconde converge beaucoup plus vite.',
  params:[{id:'n',l:'n',min:1,max:40,v:3}],
  draw:v=>{ const P=plane({x:[-1,41],y:[1.8,3],h:220,grid:false,lx:10}); P.seg(0,Math.E,41,Math.E,{c:'var(--ok)',w:1.5,dash:true}).text(40,Math.E,'e',{dy:-6});
    let s=0; for(let n=1;n<=40;n++){ P.dot(n,(1+1/n)**n,{r:n===v.n?6:3,c:'var(--accent)'}); }
    for(let n=0;n<=40;n++){ s+=1/fact(n); if(n>=1) P.dot(n,s,{r:n===v.n?6:3,c:'var(--spark)'}); } return P.svg(); },
  info:v=>{ let s=0; for(let k=0;k<=v.n;k++) s+=1/fact(k); return `(1 + 1/${v.n})<sup>${v.n}</sup> ≈ ${fmt((1+1/v.n)**v.n,5)} (bleu) · Σ 1/k! jusqu’à ${v.n} ≈ ${fmt(s,5)} (jaune)`; },
  note:'Plus généralement, <b>(1 + x/n)ⁿ → eˣ</b>. Attention : 1<sup>∞</sup> est une forme indéterminée, (1 + 1/n)ⁿ ne tend pas vers 1.'},
 {h:'Quatre termes',p:'Calcule 1 + 1/1! + 1/2! + 1/3!, arrondi au millième.',lab:'S ≈',ans:8/3,tol:6e-4,
  why:'1 + 1 + 1/2 + 1/6 = 8/3 ≈ 2,667. On est déjà à 0,05 de e.'},
 {kind:'Défi',h:'Une limite en 1<sup>∞</sup>',p:`Calcule lim (${F('<i>n</i> + 1','<i>n</i> − 1')})<sup><i>n</i></sup> quand <i>n</i> → ∞, arrondi au centième.`,lab:'L ≈',ans:Math.E**2,tol:.006,
  why:'(n + 1)/(n − 1) = (1 + 1/n)/(1 − 1/n). Donc la puissance n vaut (1 + 1/n)ⁿ/(1 − 1/n)ⁿ → e/e⁻¹ = e² ≈ 7,39.'},
]},

{subj:'an1', sem:'aut', id:'cms-an1-limfonctions', h:'Limites de fonctions', p:'Limites en un point, à gauche et à droite, à l’infini, et les infiniment petits équivalents.', steps:[
 {kind:'Théorie',h:'À gauche, à droite',p:`<b>lim<sub>x→a</sub> f(x) = L</b> veut dire que f(x) est aussi proche de <i>L</i> qu’on veut dès que <i>x</i> ≠ <i>a</i> est assez proche de <i>a</i>. On peut n’approcher que par la gauche (<i>x</i> → <i>a</i>⁻) ou par la droite (<i>x</i> → <i>a</i>⁺). Ici f(x) = ${F('<i>x</i>² − 1','|<i>x</i> − 1|')}.`,
  params:[{id:'h',l:'Distance h à 1',min:.05,max:1,step:.05,v:.8}],
  draw:v=>{ const P=plane({x:[-1,3],y:[-3,3.4],lab:1}); P.fn(x=>-(x+1),{from:-1,to:.995}).fn(x=>x+1,{from:1.005,to:3});
    P.circ(1,-2,.07,{c:'var(--accent)',w:2,fill:'var(--surface)',fo:1}).circ(1,2,.07,{c:'var(--accent)',w:2,fill:'var(--surface)',fo:1});
    P.dot(1-v.h,-(2-v.h),{c:'var(--math)',l:'gauche',dx:-50}).dot(1+v.h,2+v.h,{c:'var(--spark)',l:'droite'}); return P.svg(); },
  info:v=>`f(1 − ${fmt(v.h)}) = ${fmt(-(2-v.h))} · f(1 + ${fmt(v.h)}) = ${fmt(2+v.h)}. Limite à gauche −2, à droite 2 : pas de limite en 1.`,
  note:'La limite existe si et seulement si les limites à gauche et à droite existent et sont égales.'},
 {h:'Une forme 0/0',p:`Calcule lim<sub>x→2</sub> ${F('<i>x</i>² − 4','<i>x</i> − 2')}.`,lab:'L =',ans:4,
  why:'Pour x ≠ 2, (x² − 4)/(x − 2) = (x − 2)(x + 2)/(x − 2) = x + 2, qui tend vers 4.'},
 {kind:'Théorie',h:'Limites à l’infini',p:'Pour une fraction rationnelle en ±∞, seuls les termes de plus haut degré comptent. Si la limite <i>L</i> est finie, la droite <b><i>y</i> = <i>L</i></b> est une asymptote horizontale. Exemple : (2<i>x</i> + 1)/(<i>x</i> − 3) → 2.',
  fig:(()=>{ const P=plane({x:[-6,10],y:[-5,9],w:300,lab:2}); P.seg(-6,2,10,2,{c:'var(--ok)',w:1.5,dash:true}).seg(3,-5,3,9,{c:'var(--muted)',w:1.5,dash:true});
    P.fn(x=>(2*x+1)/(x-3),{from:-6,to:2.9}).fn(x=>(2*x+1)/(x-3),{from:3.1,to:10}).text(9.5,2,'y = 2',{a:'end',dy:-8,c:'var(--ok)'}); return P.svg(); })()},
 {h:'À l’infini',p:`Que vaut lim<sub>x→−∞</sub> ${F('<i>x</i>³ − 2<i>x</i>','1 − 4<i>x</i>³')}&nbsp;?`,opts:['1/4','−∞','0','−1/4'],ans:3,
  why:'Les termes dominants sont x³ et −4x³ : le quotient tend vers 1/(−4) = −1/4, en +∞ comme en −∞.'},
 {kind:'Théorie',h:'Infiniment petits équivalents',p:'On dit <b>f ~ g</b> en 0 si f(x)/g(x) → 1. Les quatre à connaître, quand <i>x</i> → 0 : <b>sin x ~ x</b>, <b>ln(1 + x) ~ x</b>, <b>eˣ − 1 ~ x</b>, <b>1 − cos x ~ x²/2</b>. Rapproche <i>x</i> de 0 : les courbes se confondent.',
  params:[{id:'k',l:'Équivalent',min:0,max:3,v:0},{id:'x',l:'x',min:-.9,max:1.5,step:.1,v:1.2}],
  draw:v=>{ const f=[Math.sin,x=>Math.log(1+x),x=>Math.exp(x)-1,x=>1-Math.cos(x)][v.k], g=v.k===3?x=>x*x/2:x=>x;
    const P=plane({x:[-1,2],y:[-1.2,1.8],w:320,step:.5,lab:1}); P.fn(g,{c:'var(--muted)',w:2.5,dash:true}).fn(f,{from:v.k===1?-.95:-1});
    P.dot(v.x,f(v.x),{r:5}).dot(v.x,g(v.x),{r:5,c:'var(--muted)'}); return P.svg(); },
  info:v=>{ const n=['sin x','ln(1 + x)','eˣ − 1','1 − cos x'][v.k], m=v.k===3?'x²/2':'x', f=[Math.sin,x=>Math.log(1+x),x=>Math.exp(x)-1,x=>1-Math.cos(x)][v.k], g=v.k===3?x=>x*x/2:x=>x;
    return Math.abs(v.x)<1e-9?`${n} ~ ${m} : en x = 0 le quotient n’est pas défini, sa limite vaut 1.`:`${n} ~ ${m} · quotient en x = ${fmt(v.x,1)} : ${fmt(f(v.x)/g(v.x),4)}`; }},
 {h:'Utilise sin x ~ x',p:`Calcule lim<sub>x→0</sub> ${F('sin(3<i>x</i>)','<i>x</i>')}.`,lab:'L =',ans:3,
  why:'Quand x → 0, 3x → 0, donc sin(3x) ~ 3x. Le quotient se comporte comme 3x/x = 3.'},
 {h:'Utilise 1 − cos x ~ x²/2',p:`Calcule lim<sub>x→0</sub> ${F('1 − cos(2<i>x</i>)','<i>x</i>²')}.`,lab:'L =',ans:2,
  why:'1 − cos(2x) ~ (2x)²/2 = 2x². Le quotient tend vers 2x²/x² = 2.'},
 {kind:'Défi',h:'Combiner les équivalents',p:`Calcule lim<sub>x→0</sub> ${F('e<sup><i>x</i>²</sup> − 1','<i>x</i> · sin(4<i>x</i>)')}.`,lab:'L =',ans:.25,tol:1e-9,
  why:'En haut, eᵘ − 1 ~ u avec u = x² : ~ x². En bas, sin(4x) ~ 4x, donc x·sin(4x) ~ 4x². Limite : x²/(4x²) = 1/4.',
  note:'On peut remplacer un <b>facteur</b> par son équivalent, jamais un terme d’une somme : sin x − x n’est pas équivalent à 0.'},
]},

{subj:'an1', sem:'aut', id:'cms-an1-derivee', h:'Continuité et dérivabilité', p:'Continuité et prolongement, la dérivée comme limite du taux d’accroissement, et les règles de dérivation.', steps:[
 {kind:'Théorie',h:'Continuité',p:'<i>f</i> est <b>continue en <i>a</i></b> si <b>lim<sub>x→a</sub> f(x) = f(a)</b> : on trace le graphe sans lever le crayon. Si <i>f</i> n’est pas définie en <i>a</i> mais a une limite finie <i>L</i>, on la <b>prolonge par continuité</b> en posant f(a) = L.',
  fig:(()=>{ const P=plane({x:[-10,10],y:[-.5,1.3],h:150,grid:false,lx:5}); P.fn(x=>Math.abs(x)<1e-9?1:Math.sin(x)/x).circ(0,1,.25,{c:'var(--accent)',w:2,fill:'var(--surface)',fo:1}).text(0,1,'sin x / x → 1',{dx:12,dy:-6}); return P.svg(); })(),
  note:'sin(x)/x n’est pas définie en 0, mais tend vers 1 : on la prolonge par 1. Les polynômes, sin, cos, exp sont continus partout.'},
 {kind:'Pratique',h:'Recolle les morceaux',p:'f(x) = <i>x</i>² + 1 si <i>x</i> ≤ 1 et f(x) = <i>kx</i> − 1 si <i>x</i> &gt; 1. Règle <i>k</i> pour que <i>f</i> soit continue en 1.',
  params:[{id:'k',l:'k',min:-2,max:5,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[-2.5,3.5],y:[-2,6],h:280,lab:1}); P.fn(x=>x*x+1,{from:-2.5,to:1}).fn(x=>v.k*x-1,{from:1,to:3.5,c:'var(--spark)'});
    P.dot(1,2,{r:5,c:'var(--accent)'}); if(v.k!==3) P.circ(1,v.k-1,.09,{c:'var(--spark)',w:2,fill:'var(--surface)',fo:1}); return P.svg(); },
  info:v=>`Limite à gauche : f(1) = 2 · limite à droite : ${fmt(v.k)} − 1 = ${fmt(v.k-1)}`,
  ok:v=>v.k===3,why:'À gauche, f(1) = 1² + 1 = 2. À droite, kx − 1 → k − 1. Continuité : k − 1 = 2, donc k = 3.'},
 {h:'Prolonger',p:`Par quelle valeur faut-il prolonger f(x) = ${F('<i>x</i>² − 9','<i>x</i> − 3')} en <i>x</i> = 3&nbsp;?`,lab:'f(3) =',ans:6,
  why:'Pour x ≠ 3, f(x) = x + 3, qui tend vers 6. On pose f(3) = 6.'},
 {kind:'Théorie',h:'La dérivée, limite des sécantes',p:'Le <b>taux d’accroissement</b> (f(a + h) − f(a))/h est la pente de la sécante. Sa limite quand <i>h</i> → 0 est la <b>dérivée</b> : <b>f′(a) = lim<sub>h→0</sub> (f(a + h) − f(a))/h</b>, la pente de la tangente. Ici f(x) = <i>x</i>².',
  params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'h',l:'h',min:-2,max:2,step:.25,v:1.5}],
  draw:v=>{ const f=x=>x*x, P=plane({x:[-4.5,4.5],y:[-1.5,8],h:300,lab:2}); P.fn(f);
    P.fn(x=>f(v.a)+2*v.a*(x-v.a),{c:'var(--ok)',w:2,dash:true});
    if(v.h!==0) P.fn(x=>f(v.a)+(2*v.a+v.h)*(x-v.a),{c:'var(--spark)',w:2.5}).dot(v.a+v.h,f(v.a+v.h),{r:5,c:'var(--spark)'});
    P.dot(v.a,f(v.a),{r:6,c:'var(--ink)',l:'A'}); return P.svg(); },
  info:v=>v.h===0?`h = 0 : on ne peut pas diviser par 0, on passe à la limite. Tangente de pente f′(a) = 2a = ${fmt(2*v.a)}.`:`Taux : ((a + h)² − a²)/h = 2a + h = ${fmt(2*v.a+v.h)} · tangente (pointillé) : 2a = ${fmt(2*v.a)}`},
 {h:'Par la définition',p:'Pour f(x) = <i>x</i>³, le taux en <i>a</i> = 2 vaut ((2 + h)³ − 8)/h. Calcule sa limite f′(2).',lab:'f′(2) =',ans:12,
  why:'(2 + h)³ − 8 = 12h + 6h² + h³. Divisé par h : 12 + 6h + h² → 12.'},
 {kind:'Théorie',h:'Dérivable ⇒ continue, pas l’inverse',p:'Si <i>f</i> est dérivable en <i>a</i>, alors f(a + h) − f(a) = h · (taux) → 0 · f′(a) = 0 : <i>f</i> est continue en <i>a</i>. La réciproque est fausse : <b>|x|</b> est continue en 0, mais son taux |h|/h vaut 1 à droite et −1 à gauche.',
  fig:(()=>{ const P=plane({x:[-3,3],y:[-1,3],w:280,lab:1}); P.fn(Math.abs).seg(0,0,2.6,2.6,{c:'var(--spark)',w:2,dash:true}).seg(0,0,-2.6,2.6,{c:'var(--math)',w:2,dash:true})
    .text(2,1.2,'pente 1',{c:'var(--spark)'}).text(-2.9,1.2,'pente −1',{c:'var(--math)'}).dot(0,0,{r:5}); return P.svg(); })(),
  note:'Un <b>point anguleux</b> a deux demi-tangentes différentes : la fonction n’y est pas dérivable.'},
 {kind:'Théorie',h:'Règles de dérivation',p:'<b>(f + g)′ = f′ + g′</b>, <b>(fg)′ = f′g + fg′</b>, <b>(f/g)′ = (f′g − fg′)/g²</b>, <b>(f ∘ g)′(x) = f′(g(x)) · g′(x)</b>. À combiner avec (xⁿ)′ = nxⁿ⁻¹, (sin x)′ = cos x, (cos x)′ = −sin x, (eˣ)′ = eˣ, (ln x)′ = 1/x.',
  note:'<b>Piège :</b> (fg)′ n’est pas f′g′. Teste avec f = g = x : (x²)′ = 2x, alors que f′g′ = 1.'},
 {h:'Un produit',p:'Quelle est la dérivée de f(x) = <i>x</i>² sin <i>x</i>&nbsp;?',opts:['2x cos x','2x sin x + x² cos x','2x sin x − x² cos x','x² cos x'],ans:1,
  why:'Règle du produit avec u = x² et v = sin x : u′v + uv′ = 2x sin x + x² cos x.'},
 {kind:'Défi',h:'Un quotient',p:`Soit f(x) = ${F('<i>x</i>² + 1','<i>x</i> − 2')}. Calcule f′(3).`,lab:'f′(3) =',ans:-4,
  why:'f′(x) = (2x(x − 2) − (x² + 1))/(x − 2)² = (x² − 4x − 1)/(x − 2)². En 3 : (9 − 12 − 1)/1 = −4.'},
]},

/* ===================== PRINTEMPS ===================== */
{subj:'an1', sem:'pri', id:'cms-an1-etude', h:'Extrema et étude de fonction', p:'Trouver les extrema, lire la convexité, repérer les asymptotes, et mener une étude complète.', steps:[
 {kind:'Théorie',h:'Extrema et tangente horizontale',p:'<i>f</i> a un <b>maximum local</b> en <i>a</i> si f(x) ≤ f(a) près de <i>a</i> ; il est <b>global</b> si c’est vrai sur tout le domaine. Si <i>a</i> est intérieur et <i>f</i> dérivable, un extremum local impose <b>f′(a) = 0</b>. Déplace le point sur f(x) = <i>x</i>³ − 3<i>x</i>.',
  params:[{id:'a',l:'a',min:-2.5,max:2.5,step:.25,v:1.5}],
  draw:v=>{ const f=x=>x**3-3*x, m=3*v.a*v.a-3, P=plane({x:[-3,3],y:[-4,4],lab:1}); P.fn(f).fn(x=>f(v.a)+m*(x-v.a),{c:'var(--spark)',w:2}).dot(v.a,f(v.a),{r:6,c:'var(--ink)'}); return P.svg(); },
  info:v=>`f′(${fmt(v.a)}) = 3a² − 3 = ${fmt(3*v.a*v.a-3,4)}`+(v.a===-1?' : maximum local':v.a===1?' : minimum local':'')},
 {kind:'Pratique',h:'Trouve le maximum local',p:'Place le point au maximum local de f(x) = <i>x</i>³ − 3<i>x</i>.',
  params:[{id:'a',l:'a',min:-2.5,max:2.5,step:.25,v:.5}],
  draw:v=>{ const f=x=>x**3-3*x, m=3*v.a*v.a-3, P=plane({x:[-3,3],y:[-4,4],lab:1}); P.fn(f).fn(x=>f(v.a)+m*(x-v.a),{c:'var(--spark)',w:2}).dot(v.a,f(v.a),{r:6,c:'var(--ink)'}); return P.svg(); },
  info:v=>`f′(a) = ${fmt(3*v.a*v.a-3,4)}`,
  ok:v=>v.a===-1,why:'f′(x) = 3x² − 3 = 3(x − 1)(x + 1) s’annule en ±1. f′ passe de + à − en −1 : maximum local f(−1) = 2. (En 1, minimum local.)'},
 {h:'Condition suffisante&nbsp;?',p:'f(x) = <i>x</i>³ vérifie f′(0) = 0. Que peut-on dire en 0&nbsp;?',opts:['0 est un minimum local','0 est un maximum local','0 n’est pas un extremum : f′ ne change pas de signe','f n’est pas dérivable en 0'],ans:2,
  why:'f′(x) = 3x² ≥ 0 : f est croissante, f(x) &lt; 0 à gauche et &gt; 0 à droite. f′(a) = 0 est nécessaire, pas suffisant : il faut un changement de signe de f′.'},
 {kind:'Théorie',h:'Variations et convexité',p:'Le <b>signe de f′</b> donne les variations. Le <b>signe de f″</b> donne la courbure : f″ &gt; 0, <i>f</i> est <b>convexe</b> (tournée vers le haut) ; f″ &lt; 0, <b>concave</b>. Un <b>point d’inflexion</b> est un point où f″ change de signe.',
  fig:(()=>{ const P=plane({x:[-3,3],y:[-4,4],w:280,lab:1}); P.fn(x=>x**3-3*x,{from:-3,to:0,c:'var(--math)'}).fn(x=>x**3-3*x,{from:0,to:3,c:'var(--spark)'}).dot(0,0,{r:5,c:'var(--ink)',l:'inflexion'})
    .text(-2.9,-3,'concave',{c:'var(--math)'}).text(1.2,3,'convexe',{c:'var(--spark)'}); return P.svg(); })()+
   tab([['<i>x</i>','−∞','','−1','','0','','1','','+∞'],['f′','','+','0','−','','−','0','+',''],['f″','','−','','−','0','+','','+',''],['f','','↗','2','↘','0','↘','−2','↗','']])},
 {h:'Point d’inflexion',p:'Pour f(x) = <i>x</i>³ − 6<i>x</i>² + 9<i>x</i> + 1, quelle est l’abscisse du point d’inflexion&nbsp;?',lab:'x =',ans:2,
  why:'f′(x) = 3x² − 12x + 9, f″(x) = 6x − 12. f″ s’annule et change de signe en x = 2.'},
 {kind:'Théorie',h:'Asymptotes',p:'<b>Verticale</b> <i>x</i> = <i>a</i> si f(x) → ±∞ quand <i>x</i> → <i>a</i>. <b>Oblique</b> <i>y</i> = <i>mx</i> + <i>p</i> en ±∞ si <b><i>m</i> = lim f(x)/x</b> et <b><i>p</i> = lim (f(x) − mx)</b> sont finis. Exemple : (<i>x</i>² + 1)/(<i>x</i> − 1) = <i>x</i> + 1 + 2/(<i>x</i> − 1).',
  fig:(()=>{ const f=x=>(x*x+1)/(x-1), P=plane({x:[-5,7],y:[-6,10],w:280,lab:2}); P.seg(1,-6,1,10,{c:'var(--muted)',w:1.5,dash:true}).fn(x=>x+1,{c:'var(--ok)',w:1.5,dash:true})
    .fn(f,{from:-5,to:.95}).fn(f,{from:1.05,to:7}).text(-4.8,-3,'y = x + 1',{c:'var(--ok)'}).text(1,9,'x = 1',{dx:6,c:'var(--muted)'}); return P.svg(); })()},
 {h:'Trouve l’asymptote oblique',p:`Quelle est l’asymptote oblique de f(x) = ${F('2<i>x</i>² − 3<i>x</i> + 4','<i>x</i> + 1')}&nbsp;?`,opts:['y = 2x − 3','y = 2x + 5','y = 2x − 5','y = 2x + 9'],ans:2,
  why:'Division : 2x² − 3x + 4 = (x + 1)(2x − 5) + 9. Donc f(x) = 2x − 5 + 9/(x + 1), et 9/(x + 1) → 0.'},
 {kind:'Défi',h:'Étude complète',p:'Étudie f(x) = (ln <i>x</i>)/<i>x</i> sur ]0 ; +∞[. Quelle est la valeur de son maximum global, arrondie au centième&nbsp;?',lab:'max ≈',ans:1/Math.E,tol:.006,
  fig:(()=>{ const P=plane({x:[-.5,10],y:[-1.5,1],h:180,lab:2,grid:false}); P.fn(x=>Math.log(x)/x,{from:.25,to:10}).seg(Math.E,0,Math.E,1/Math.E,{c:'var(--muted)',w:1.5,dash:true}); return P.svg(); })(),
  why:'f′(x) = (1 − ln x)/x² : positive si x &lt; e, négative si x &gt; e. Maximum en x = e, de valeur 1/e ≈ 0,37. (f → −∞ en 0⁺ et f → 0 en +∞.)'},
]},

{subj:'an1', sem:'pri', id:'cms-an1-arcs', h:'Arcs paramétrés', p:'Une courbe décrite par un point qui bouge : vitesse, tangente, points singuliers, le folium de Descartes et le limaçon de Pascal.', steps:[
 {kind:'Théorie',h:'Vitesse et tangente',p:'Un arc paramétré est <b>γ(t) = (x(t) ; y(t))</b>. Son vecteur <b>vitesse</b> est <b>γ′(t) = (x′(t) ; y′(t))</b>. S’il est non nul, il dirige la tangente. S’il est nul, le point est <b>singulier</b>. Exemple : la cycloïde <i>x</i> = <i>t</i> − sin <i>t</i>, <i>y</i> = 1 − cos <i>t</i>.',
  params:[{id:'t',l:'t',min:0,max:720,step:15,v:90,u:'°'}],
  draw:v=>{ const t=rad(v.t), P=plane({x:[-.6,13.2],y:[-1.3,3.6],lab:2,step:1}); P.curve(s=>s-Math.sin(s),s=>1-Math.cos(s),0,4*Math.PI);
    const x=t-Math.sin(t), y=1-Math.cos(t); P.circ(t,1,1,{c:'var(--muted)',w:1.2}).arrow(x,y,x+1-Math.cos(t),y+Math.sin(t),{c:'var(--spark)',w:3}).dot(x,y,{r:5,c:'var(--ink)'}); return P.svg(); },
  info:v=>{ const t=rad(v.t), vx=1-Math.cos(t), vy=Math.sin(t); return `γ′(t) = (1 − cos t ; sin t) = (${fmt(vx)} ; ${fmt(vy)}) · vitesse ${fmt(Math.hypot(vx,vy))}`; }},
 {kind:'Pratique',h:'Trouve un point singulier',p:'Place le point sur un point singulier de la cycloïde, avec 0° &lt; <i>t</i> &lt; 720°.',
  params:[{id:'t',l:'t',min:0,max:720,step:15,v:90,u:'°'}],
  draw:v=>{ const t=rad(v.t), P=plane({x:[-.6,13.2],y:[-1.3,3.6],lab:2,step:1}); P.curve(s=>s-Math.sin(s),s=>1-Math.cos(s),0,4*Math.PI);
    const x=t-Math.sin(t), y=1-Math.cos(t); P.arrow(x,y,x+1-Math.cos(t),y+Math.sin(t),{c:'var(--spark)',w:3}).dot(x,y,{r:5,c:'var(--ink)'}); return P.svg(); },
  info:v=>`|γ′(t)| = ${fmt(Math.hypot(1-Math.cos(rad(v.t)),Math.sin(rad(v.t))))}`,
  ok:v=>v.t===360,why:'γ′(t) = 0 demande 1 − cos t = 0 et sin t = 0, soit t = 0°, 360°, 720°… Entre les deux bornes : t = 360°. La courbe y forme un point de rebroussement.'},
 {h:'Calcule',p:'Pour γ(t) = (<i>t</i>² − 2<i>t</i> ; <i>t</i>³ − 3<i>t</i>), pour quelle valeur de <i>t</i> le point est-il singulier&nbsp;?',lab:'t =',ans:1,
  why:'x′(t) = 2t − 2 s’annule en t = 1 seulement, et y′(1) = 3·1² − 3 = 0. Les deux s’annulent ensemble en t = 1.'},
 {kind:'Théorie',h:'Le folium de Descartes',p:'<b><i>x</i> = 3<i>at</i>/(1 + <i>t</i>³)</b>, <b><i>y</i> = 3<i>at</i>²/(1 + <i>t</i>³)</b>, <i>t</i> ≠ −1. Pour <i>t</i> ≥ 0, le point parcourt une boucle qui part de l’origine et y revient quand <i>t</i> → ∞. Quand <i>t</i> → −1, il file vers l’asymptote <b><i>x</i> + <i>y</i> + <i>a</i> = 0</b>.',
  params:[{id:'a',l:'a',min:.5,max:2,step:.5,v:1.5},{id:'t',l:'t',min:0,max:4,step:.2,v:.6}],
  draw:v=>{ const a=v.a, X=t=>3*a*t/(1+t**3), Y=t=>3*a*t*t/(1+t**3), P=plane({x:[-4,4],y:[-4,4],lab:2});
    P.fn(x=>-x-a,{c:'var(--muted)',w:1.5,dash:true});
    P.curve(s=>X(Math.tan(s)),s=>Y(Math.tan(s)),0,Math.PI/2-.005,{n:400}).curve(X,Y,-.97,0).curve(s=>X(-1/s),s=>Y(-1/s),.02,.97);
    const t=v.t, d=(1+t**3)**2, vx=3*a*(1-2*t**3)/d, vy=3*a*(2*t-t**4)/d;
    P.arrow(X(t),Y(t),X(t)+vx/2,Y(t)+vy/2,{c:'var(--spark)',w:2.5}).dot(X(t),Y(t),{r:5,c:'var(--ink)'}); return P.svg(); },
  info:v=>{ const a=v.a,t=v.t,d=1+t**3; return `γ(${fmt(t,1)}) = (${fmt(3*a*t/d)} ; ${fmt(3*a*t*t/d)})`+(t===1?' : sommet de la boucle, sur la droite y = x':''); },
  note:'La vitesse vaut γ′(t) = 3a/(1 + t³)² · (1 − 2t³ ; 2t − t⁴). Elle ne s’annule jamais : le folium n’a pas de point singulier, l’origine est un <b>point double</b>.'},
 {h:'Tangente au sommet',p:'Au point du folium obtenu pour <i>t</i> = 1, quelle est la pente de la tangente&nbsp;?',opts:['1','0','−1','La tangente est verticale'],ans:2,
  why:'En t = 1 : x′ = 3a(1 − 2)/4 = −3a/4 et y′ = 3a(2 − 1)/4 = 3a/4. Pente y′/x′ = −1, perpendiculaire à l’axe de symétrie y = x.'},
 {kind:'Théorie',h:'Le limaçon de Pascal',p:'En coordonnées polaires <b><i>r</i> = <i>b</i> + <i>a</i> cos θ</b>, soit <i>x</i> = <i>r</i> cos θ, <i>y</i> = <i>r</i> sin θ. Selon le rapport <i>b</i>/<i>a</i>, la forme change : boucle intérieure, cardioïde, fossette ou ovale convexe.',
  params:[{id:'a',l:'a',min:.5,max:3,step:.5,v:2},{id:'b',l:'b',min:0,max:4,step:.5,v:1}],
  draw:v=>{ const r=t=>v.b+v.a*Math.cos(t), P=plane({x:[-5,7.5],y:[-5.5,5.5],lab:2}); P.curve(t=>r(t)*Math.cos(t),t=>r(t)*Math.sin(t),0,2*Math.PI,{n:360}).dot(0,0,{r:4,c:'var(--ink)'}); return P.svg(); },
  info:v=>{ const a=v.a,b=v.b; return b===0?'b = 0 : r = a cos θ, un cercle de diamètre a.':b<a?'b &lt; a : r s’annule deux fois, d’où une <b>boucle intérieure</b>.':b===a?'b = a : <b>cardioïde</b>, point singulier à l’origine.':b<2*a?'a &lt; b &lt; 2a : limaçon à <b>fossette</b>.':'b ≥ 2a : ovale <b>convexe</b>.'; }},
 {kind:'Pratique',h:'Fabrique une cardioïde',p:'Avec <i>a</i> = 2, règle <i>b</i> pour que la courbe ait un point singulier (une pointe).',
  params:[{id:'b',l:'b',min:0,max:4,step:.5,v:3}],
  draw:v=>{ const r=t=>v.b+2*Math.cos(t), P=plane({x:[-5,7.5],y:[-5.5,5.5],lab:2}); P.curve(t=>r(t)*Math.cos(t),t=>r(t)*Math.sin(t),0,2*Math.PI,{n:360}).dot(0,0,{r:4,c:'var(--ink)'}); return P.svg(); },
  ok:v=>v.b===2,why:'|γ′(θ)|² = r′² + r². Il est nul si r = 0 et r′ = −a sin θ = 0, donc θ = π et b − a = 0. Avec a = 2 : b = 2, la cardioïde r = 2(1 + cos θ).'},
 {kind:'Défi',h:'Passages par l’origine',p:'Pour <i>r</i> = 1 + 2 cos θ, combien de fois la courbe passe-t-elle par l’origine quand θ parcourt [0 ; 2π[&nbsp;?',ans:2,
  why:'r = 0 ⇔ cos θ = −1/2 ⇔ θ = 2π/3 ou 4π/3. Deux passages, ce qui ferme la boucle intérieure (b = 1 &lt; a = 2).'},
]},

{subj:'an1', sem:'pri', id:'cms-an1-riemann', h:'Sommes de Riemann et théorème fondamental', p:'Encadrer une aire par des rectangles, définir l’intégrale, puis la relier à la dérivée.', steps:[
 {kind:'Théorie',h:'Sommes inférieures et supérieures',p:'On coupe [<i>a</i> ; <i>b</i>] en <i>n</i> morceaux de largeur Δx = (b − a)/n. Sur chacun, on prend le minimum de <i>f</i> (somme <b>inférieure</b> <i>sₙ</i>) ou le maximum (somme <b>supérieure</b> <i>Sₙ</i>). L’aire est coincée : <b>sₙ ≤ aire ≤ Sₙ</b>. Ici f(x) = <i>x</i>² sur [0 ; 2].',
  params:[{id:'n',l:'n',min:1,max:40,v:4}],
  draw:v=>{ const f=x=>x*x, d=2/v.n, P=plane({x:[-.3,2.3],y:[-.4,4.3],h:260,step:.5,lab:1});
    for(let k=0;k<v.n;k++){ P.rect(k*d,0,d,f((k+1)*d),{fill:'var(--spark)',fo:.3,c:'var(--spark)',w:1}); P.rect(k*d,0,d,f(k*d),{fill:'var(--math)',fo:.5,c:'var(--math)',w:1}); }
    P.fn(f,{from:0,to:2.1}); return P.svg(); },
  info:v=>{ const d=2/v.n; let s=0,S=0; for(let k=0;k<v.n;k++){ s+=d*(k*d)**2; S+=d*((k+1)*d)**2; } return `sₙ ≈ ${fmt(s,4)} ≤ 8/3 ≈ 2,6667 ≤ Sₙ ≈ ${fmt(S,4)} · écart Sₙ − sₙ = ${fmt(S-s,4)}`; }},
 {h:'Une somme inférieure',p:'Calcule la somme inférieure <i>s</i>₄ de f(x) = <i>x</i> sur [0 ; 1].',lab:'s₄ =',ans:.375,tol:1e-9,
  why:'Δx = 1/4 et f croissante : on prend les bords gauches 0, 1/4, 2/4, 3/4. s₄ = (1/4)(0 + 1/4 + 1/2 + 3/4) = (1/4)(3/2) = 3/8 = 0,375.'},
 {kind:'Théorie',h:'L’intégrale de Riemann',p:'<i>f</i> est <b>intégrable</b> si le sup des sommes inférieures égale l’inf des sommes supérieures. Cette valeur commune est <b>∫ₐᵇ f(x) dx</b>. Toute fonction continue (ou monotone) sur [<i>a</i> ; <i>b</i>] est intégrable.',
  note:'Pour <i>f</i> croissante, les rectangles se décalent d’un cran : <b>Sₙ − sₙ = (f(b) − f(a)) · (b − a)/n</b>, qui tend vers 0.'},
 {h:'L’écart',p:'Pour f(x) = <i>x</i>² sur [0 ; 2], que vaut <i>Sₙ</i> − <i>sₙ</i>&nbsp;?',opts:['4/n','2/n','8/n²','8/n'],ans:3,
  why:'f est croissante : Sₙ − sₙ = (f(2) − f(0)) · (2 − 0)/n = 4 · 2/n = 8/n.'},
 {kind:'Pratique',h:'Assez de rectangles',p:'Trouve le <b>plus petit</b> <i>n</i> pour lequel <i>Sₙ</i> − <i>sₙ</i> &lt; 0,25 (toujours f(x) = <i>x</i>² sur [0 ; 2]).',
  params:[{id:'n',l:'n',min:1,max:40,v:5}],
  draw:v=>{ const f=x=>x*x, d=2/v.n, P=plane({x:[-.3,2.3],y:[-.4,4.3],h:260,step:.5,lab:1});
    for(let k=0;k<v.n;k++){ P.rect(k*d,0,d,f((k+1)*d),{fill:'var(--spark)',fo:.3,c:'var(--spark)',w:1}); P.rect(k*d,0,d,f(k*d),{fill:'var(--math)',fo:.5,c:'var(--math)',w:1}); }
    P.fn(f,{from:0,to:2.1}); return P.svg(); },
  info:v=>`Sₙ − sₙ = 8/${v.n} ≈ ${fmt(8/v.n,4)}`,
  ok:v=>v.n===33,why:'8/n &lt; 0,25 ⇔ n &gt; 32. Pour n = 32 l’écart vaut exactement 0,25 : il faut n = 33.'},
 {kind:'Théorie',h:'Le théorème fondamental',p:'Si <i>f</i> est continue, <b>F(x) = ∫ₐˣ f(t) dt</b> est dérivable et <b>F′ = f</b>. Conséquence : si <i>G</i> est une primitive de <i>f</i>, <b>∫ₐᵇ f = G(b) − G(a)</b>. Ici f(t) = 2 − t et F(x) = 2x − x²/2 (en jaune).',
  params:[{id:'x',l:'x',min:0,max:4,step:.25,v:1}],
  draw:v=>{ const f=t=>2-t, P=plane({x:[-.5,4.5],y:[-2.5,2.6],lab:1});
    P.area(f,0,Math.min(v.x,2)); if(v.x>2) P.area(f,2,v.x,{fill:'var(--bad)'});
    P.fn(f,{from:0,to:4.4}).fn(t=>2*t-t*t/2,{from:0,to:4.4,c:'var(--spark)',w:2.5}).dot(v.x,2*v.x-v.x*v.x/2,{r:5,c:'var(--spark)',l:'F(x)'}); return P.svg(); },
  info:v=>`F(${fmt(v.x)}) = ${fmt(2*v.x-v.x*v.x/2,4)} · F′(x) = f(x) = ${fmt(2-v.x)}`,
  note:'L’aire sous l’axe compte négativement (en rouge). F est maximale en x = 2, là où f = F′ change de signe.'},
 {h:'Calcule l’intégrale',p:'Calcule ∫₁³ (3<i>x</i>² − 2<i>x</i>) d<i>x</i>.',ans:18,
  why:'Une primitive est x³ − x². Donc (27 − 9) − (1 − 1) = 18.'},
 {h:'Borne variable',p:'Soit G(x) = ∫₀<sup><i>x</i>²</sup> cos <i>t</i> d<i>t</i>. Que vaut G′(x)&nbsp;?',opts:['cos(x²)','2x cos(x²)','sin(x²)','2x sin(x²)'],ans:1,
  why:'G(x) = F(x²) avec F′ = cos. Par la règle de chaîne : G′(x) = cos(x²) · 2x.'},
 {kind:'Défi',h:'Une somme devenue intégrale',p:'Calcule lim (1/<i>n</i>) Σ<sub>k=1</sub><sup>n</sup> (k/n)² quand <i>n</i> → ∞. Donne une fraction ou un arrondi au millième.',lab:'L =',ans:1/3,tol:6e-4,
  why:'C’est une somme de Riemann de f(x) = x² sur [0 ; 1] avec Δx = 1/n. Elle tend vers ∫₀¹ x² dx = 1/3.'},
]},

{subj:'an1', sem:'pri', id:'cms-an1-primitives', h:'Recherche de primitives', p:'Les primitives à connaître, puis les deux grandes techniques : substitution et intégration par parties.', steps:[
 {kind:'Théorie',h:'Une famille de primitives',p:'<i>F</i> est une <b>primitive</b> de <i>f</i> si F′ = f. Deux primitives diffèrent d’une constante : on écrit <b>∫ f(x) dx = F(x) + C</b>. Une condition comme F(1) = 3 fixe <i>C</i>. Ici f(x) = 2<i>x</i>.',
  params:[{id:'C',l:'C',min:-3,max:3,step:.5,v:0}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-4,6],h:300,lab:1}); for(let c=-3;c<=3;c++) P.fn(x=>x*x+c,{c:'var(--line)',w:1.5});
    P.fn(x=>x*x+v.C).dot(1,3,{c:'var(--bad)',l:'(1 ; 3)'}); return P.svg(); },
  info:v=>`F(x) = x² + ${fmt(v.C)} · F(1) = ${fmt(1+v.C)}`},
 {kind:'Pratique',h:'Passe par le point',p:'Choisis <i>C</i> pour que la primitive <i>x</i>² + <i>C</i> de 2<i>x</i> passe par (1 ; 3).',
  params:[{id:'C',l:'C',min:-3,max:3,step:.5,v:-1}],
  draw:v=>{ const P=plane({x:[-3,3],y:[-4,6],h:300,lab:1}); P.fn(x=>x*x+v.C).dot(1,3,{c:'var(--bad)',l:'(1 ; 3)'}); return P.svg(); },
  info:v=>`F(1) = ${fmt(1+v.C)}`,
  ok:v=>v.C===2,why:'F(1) = 1 + C = 3, donc C = 2 et F(x) = x² + 2.'},
 {kind:'Théorie',h:'Le tableau de base',p:'On lit le tableau des dérivées à l’envers.',
  fig:tab([['f(x)','primitive F(x)'],['xⁿ (n ≠ −1)','xⁿ⁺¹/(n + 1)'],['1/x','ln|x|'],['eˣ','eˣ'],['cos x','sin x'],['sin x','−cos x'],['1/cos² x','tan x'],['1/(1 + x²)','arctan x'],['1/√(1 − x²)','arcsin x']]),
  note:'N’oublie pas le <b>+ C</b>, et le signe moins de −cos x.'},
 {h:'Applique le tableau',p:'Une primitive de 3<i>x</i>² − 4/<i>x</i> + eˣ est…',opts:['6x + 4/x² + eˣ','x³ − 4 ln|x| + eˣ','x³ − 4/x² + eˣ','x³ + 4 ln|x| + eˣ'],ans:1,
  why:'On intègre terme à terme : x³, puis −4 ln|x|, puis eˣ. Vérifie en dérivant : 3x² − 4/x + eˣ.'},
 {kind:'Théorie',h:'Substitution',p:'Si tu reconnais une composée multipliée par la dérivée de l’intérieur : <b>∫ f(g(x)) g′(x) dx = F(g(x)) + C</b>. On pose <i>u</i> = g(x), d<i>u</i> = g′(x) dx. Exemple : ∫ 2<i>x</i> cos(<i>x</i>²) d<i>x</i> = sin(<i>x</i>²) + C.',
  note:'Dans une intégrale définie, change aussi les bornes : <i>x</i> = <i>a</i> devient <i>u</i> = g(a).'},
 {h:'À toi',p:'Calcule ∫₀¹ <i>x</i> e<sup><i>x</i>²</sup> d<i>x</i>, arrondi au millième.',ans:(Math.E-1)/2,tol:6e-4,
  why:'u = x², du = 2x dx, bornes 0 et 1 : (1/2)∫₀¹ eᵘ du = (e − 1)/2 ≈ 0,859.'},
 {h:'Reconnais la forme',p:'∫ tan <i>x</i> d<i>x</i> = ∫ sin <i>x</i>/cos <i>x</i> d<i>x</i> vaut…',opts:['ln|cos x| + C','1/cos² x + C','−ln|sin x| + C','−ln|cos x| + C'],ans:3,
  why:'Avec u = cos x, du = −sin x dx : ∫ −du/u = −ln|u| + C = −ln|cos x| + C.'},
 {kind:'Théorie',h:'Intégration par parties',p:'De (uv)′ = u′v + uv′ on tire <b>∫ u v′ dx = u v − ∫ u′ v dx</b>. On choisit pour <i>u</i> ce qui se simplifie en dérivant (un polynôme, ln x). Exemple : ∫ <i>x</i> eˣ d<i>x</i> = <i>x</i> eˣ − ∫ eˣ d<i>x</i> = (<i>x</i> − 1) eˣ + C.',
  note:'Astuce : ∫ ln x dx = ∫ 1 · ln x dx, avec v′ = 1 et u = ln x.'},
 {h:'Le logarithme',p:'Calcule ∫₁<sup>e</sup> ln <i>x</i> d<i>x</i>.',ans:1,
  why:'Par parties : ∫ ln x dx = x ln x − ∫ x · (1/x) dx = x ln x − x. De 1 à e : (e − e) − (0 − 1) = 1.'},
 {kind:'Défi',h:'Par parties, encore',p:'Calcule ∫₀<sup>π</sup> <i>x</i> sin <i>x</i> d<i>x</i>, arrondi au centième.',ans:Math.PI,tol:.006,
  why:'u = x, v′ = sin x, v = −cos x : ∫ x sin x dx = −x cos x + sin x. De 0 à π : (−π · (−1) + 0) − 0 = π ≈ 3,14.'},
]},

{subj:'an1', sem:'pri', id:'cms-an1-applications', h:'Applications de l’intégrale', p:'Aires entre courbes, volumes de révolution, longueurs d’arc et aires de surfaces de révolution.', steps:[
 {kind:'Théorie',h:'Aire entre deux courbes',p:'Si f ≥ g sur [<i>a</i> ; <i>b</i>], l’aire entre les deux courbes vaut <b>A = ∫ₐᵇ (f(x) − g(x)) dx</b>. On trouve les bornes en résolvant f(x) = g(x). Ici entre <i>y</i> = <i>kx</i> et <i>y</i> = <i>x</i>², qui se coupent en 0 et <i>k</i>.',
  params:[{id:'k',l:'k',min:.5,max:3,step:.5,v:3}],
  draw:v=>{ const k=v.k, P=plane({x:[-.5,3.5],y:[-.5,9.5],h:300,lab:1,step:1}); const pts=[];
    for(let i=0;i<=60;i++){ const x=k*i/60; pts.push([x,k*x]); } for(let i=60;i>=0;i--){ const x=k*i/60; pts.push([x,x*x]); }
    P.poly(pts,{fill:'var(--accent)',fo:.25,c:null}).fn(x=>x*x,{from:-.5,to:3.2}).fn(x=>k*x,{c:'var(--spark)',w:2.5}); return P.svg(); },
  info:v=>`A = ∫₀ᵏ (kx − x²) dx = k³/6 = ${fmt(v.k**3/6,4)}`},
 {kind:'Pratique',h:'Règle l’aire',p:'Choisis <i>k</i> pour que l’aire entre <i>y</i> = <i>kx</i> et <i>y</i> = <i>x</i>² vaille 4/3.',
  params:[{id:'k',l:'k',min:.5,max:3,step:.5,v:1}],
  draw:v=>{ const k=v.k, P=plane({x:[-.5,3.5],y:[-.5,9.5],h:300,lab:1,step:1}); const pts=[];
    for(let i=0;i<=60;i++){ const x=k*i/60; pts.push([x,k*x]); } for(let i=60;i>=0;i--){ const x=k*i/60; pts.push([x,x*x]); }
    P.poly(pts,{fill:'var(--accent)',fo:.25,c:null}).fn(x=>x*x,{from:-.5,to:3.2}).fn(x=>k*x,{c:'var(--spark)',w:2.5}); return P.svg(); },
  info:v=>`A = ${fmt(v.k**3/6,4)}`,
  ok:v=>v.k===2,why:'k³/6 = 4/3 ⇔ k³ = 8 ⇔ k = 2.'},
 {h:'Calcule une aire',p:'Calcule l’aire comprise entre <i>y</i> = 4 − <i>x</i>² et <i>y</i> = <i>x</i> + 2.',ans:4.5,tol:1e-9,
  why:'4 − x² = x + 2 ⇔ x² + x − 2 = 0 ⇔ x = −2 ou 1. A = ∫₋₂¹ (2 − x − x²) dx = [2x − x²/2 − x³/3]₋₂¹ = 7/6 + 10/3 = 9/2.'},
 {kind:'Théorie',h:'Volume de révolution',p:'Quand le graphe de <i>f</i> ≥ 0 tourne autour de l’axe O<i>x</i>, chaque tranche d’épaisseur d<i>x</i> est un disque de rayon f(x). Le volume vaut <b>V = π ∫ₐᵇ f(x)² dx</b>.',
  fig:(()=>{ const P=plane({x:[-.5,4.5],y:[-2.5,2.5],w:300,lab:1}); P.fn(Math.sqrt,{from:0,to:4}).fn(x=>-Math.sqrt(x),{from:0,to:4,c:'var(--accent)',dash:true,w:2});
    [1,2,3,4].forEach(x=>P.seg(x,-Math.sqrt(x),x,Math.sqrt(x),{c:'var(--spark)',w:2})); P.text(2.2,1.9,'y = √x'); return P.svg(); })(),
  note:'La sphère de rayon <i>R</i> s’obtient avec f(x) = √(R² − x²) : π ∫₋ᴿᴿ (R² − x²) dx = 4πR³/3.'},
 {h:'Le paraboloïde',p:'On fait tourner <i>y</i> = √<i>x</i>, <i>x</i> ∈ [0 ; 4], autour de O<i>x</i>. Calcule le volume, arrondi au centième.',ans:8*Math.PI,tol:.006,
  why:'V = π ∫₀⁴ (√x)² dx = π ∫₀⁴ x dx = π · 16/2 = 8π ≈ 25,13.'},
 {kind:'Théorie',h:'Longueur d’arc',p:'Un petit bout de courbe mesure √(dx² + dy²). En sommant : <b>L = ∫ₐᵇ √(1 + f′(x)²) dx</b> pour un graphe, et <b>L = ∫ √(x′(t)² + y′(t)²) dt</b> pour un arc paramétré.',
  note:'Contrôle : pour f(x) = mx, on trouve (b − a)√(1 + m²), la longueur du segment.'},
 {h:'Une longueur exacte',p:'Calcule la longueur du graphe de f(x) = (2/3)<i>x</i><sup>3/2</sup> pour <i>x</i> ∈ [0 ; 3]. Donne une fraction ou un arrondi au millième.',lab:'L =',ans:14/3,tol:6e-4,
  why:'f′(x) = √x, donc √(1 + f′²) = √(1 + x). L = [(2/3)(1 + x)^{3/2}]₀³ = (2/3)(8 − 1) = 14/3 ≈ 4,667.'},
 {kind:'Théorie',h:'Aire d’une surface de révolution',p:'Chaque petit bout d’arc de longueur √(1 + f′²) dx, en tournant, balaie une bande de rayon f(x). L’aire latérale vaut <b>S = 2π ∫ₐᵇ f(x) √(1 + f′(x)²) dx</b>.',
  note:'Pour la sphère, f(x)√(1 + f′(x)²) = R tout le long : S = 2π · R · 2R = 4πR².'},
 {kind:'Défi',h:'L’aire d’un cône',p:'On fait tourner le segment <i>y</i> = <i>x</i>, <i>x</i> ∈ [0 ; 1], autour de O<i>x</i>. Calcule l’aire de la surface obtenue, arrondie au centième.',ans:Math.SQRT2*Math.PI,tol:.006,
  why:'f′ = 1 : S = 2π ∫₀¹ x√2 dx = 2π√2 · 1/2 = π√2 ≈ 4,44. C’est bien πrℓ avec r = 1 et ℓ = √2.'},
]},
);
})();
