/* Déclic — Analyse I */
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

COURS.push(
/* ===================== CALCUL DIFFÉRENTIEL ===================== */
{subj:'an1', sem:'aut', id:'an1-nombres', h:'Nombres et (in)équations', p:'Les ensembles de nombres, les intervalles et la résolution d’inéquations avec un tableau de signes.', steps:[
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
 {kind:'Problème',h:'Quelle agence de location&nbsp;?',
  p:'Pour louer une camionnette une journée, l’agence A facture 30 CHF plus 0,50 CHF par kilomètre. L’agence B facture 18 CHF plus 0,80 CHF par kilomètre. On note <i>x</i> ≥ 0 la distance parcourue, en km. On cherche quand chaque agence est la plus avantageuse.',
  parts:[
   {q:'a) Pour quelle distance les deux agences coûtent-elles le même prix&nbsp;?',lab:'x =',unit:'km',ans:40,hint:'Écris les deux prix, 30 + 0,5<i>x</i> et 18 + 0,8<i>x</i>, puis résous leur égalité.',why:'30 + 0,5x = 18 + 0,8x ⇔ 12 = 0,3x ⇔ x = 40 km. Les deux coûtent alors 50 CHF.'},
   {q:'b) Pour quelles distances l’agence A est-elle strictement moins chère&nbsp;?',opts:['[0 ; 40[','[40 ; +∞[',']40 ; +∞[',']0 ; 40]'],ans:2,hint:'Résous 30 + 0,5<i>x</i> &lt; 18 + 0,8<i>x</i>. Diviser par un nombre positif garde le sens.',why:'30 + 0,5x &lt; 18 + 0,8x ⇔ 12 &lt; 0,3x ⇔ x &gt; 40. L’inégalité est stricte : 40 est exclu.'},
   {q:'c) Tu as 45 CHF. En choisissant la meilleure agence, quelle distance maximale peux-tu parcourir&nbsp;?',lab:'x =',unit:'km',ans:33.75,tol:1e-6,hint:'Résous 30 + 0,5<i>x</i> ≤ 45 et 18 + 0,8<i>x</i> ≤ 45, puis compare.',why:'Chez A : 0,5x ≤ 15, soit x ≤ 30. Chez B : 0,8x ≤ 27, soit x ≤ 33,75. B permet d’aller jusqu’à 33,75 km.'},
  ],
  sol:'Les prix sont A(x) = 30 + 0,5x et B(x) = 18 + 0,8x.<br>A(x) − B(x) = 12 − 0,3x : nul en x = 40, positif pour x &lt; 40, négatif pour x &gt; 40.<br>Donc B est moins chère sous 40 km, A au-delà, et les deux coûtent 50 CHF à 40 km.<br>Avec 45 CHF, on reste sous 50 CHF, donc dans la zone où B est la moins chère : 18 + 0,8x ≤ 45 ⇔ x ≤ 33,75. On peut parcourir au plus 33,75 km (contre 30 km chez A).'},
 {kind:'Problème',h:'L’erreur du camarade',
  p:`Un camarade veut résoudre ${F('2<i>x</i> − 1','<i>x</i> + 3')} ≤ 1. Il multiplie les deux membres par <i>x</i> + 3, obtient 2<i>x</i> − 1 ≤ <i>x</i> + 3, et conclut <i>x</i> ≤ 4. Sa réponse est fausse. On cherche la bonne solution, puis on localise l’erreur.`,
  parts:[
   {q:`a) En passant tout du même côté, l’inéquation devient ${F('<i>x</i> − <i>a</i>','<i>x</i> + 3')} ≤ 0. Que vaut <i>a</i>&nbsp;?`,lab:'a =',ans:4,hint:'Soustrais 1 et mets tout sur le dénominateur <i>x</i> + 3.',why:'(2x − 1)/(x + 3) − 1 = (2x − 1 − x − 3)/(x + 3) = (x − 4)/(x + 3).'},
   {q:'b) Quel est l’ensemble des solutions&nbsp;?',opts:[']−∞ ; 4]',']−3 ; 4]','[−3 ; 4]',']−∞ ; −3[ ∪ [4 ; +∞['],ans:1,hint:'Fais un tableau de signes avec les zéros 4 et −3. N’oublie pas la valeur interdite.',why:'Le quotient est négatif entre −3 et 4, nul en 4, interdit en −3 : S = ]−3 ; 4].'},
   {q:'c) Où est l’erreur du camarade&nbsp;?',opts:['Il aurait dû remplacer 1 par 0 avant de multiplier','On n’a pas le droit de multiplier une inéquation','Pour <i>x</i> &lt; −3, <i>x</i> + 3 est négatif : multiplier par <i>x</i> + 3 renverse alors le sens','Il a oublié que 4 est exclu'],ans:2,hint:'Le sens d’une inéquation dépend du signe du nombre par lequel on multiplie.',why:'Le signe de x + 3 n’est pas connu. Pour x &lt; −3 il est négatif et le sens s’inverse : sa réponse garde à tort ]−∞ ; −3].'},
   {q:'d) Combien de nombres entiers vérifient l’inéquation&nbsp;?',ans:7,hint:'Liste les entiers de ]−3 ; 4].',why:'−2, −1, 0, 1, 2, 3, 4 : sept entiers. −3 est exclu.'},
  ],
  sol:'On ne multiplie pas par x + 3, dont le signe est inconnu. On écrit plutôt (2x − 1)/(x + 3) − 1 ≤ 0, soit (x − 4)/(x + 3) ≤ 0.<br>Tableau de signes : x − 4 s’annule en 4, x + 3 en −3 (valeur interdite).<br>Le quotient est positif pour x &lt; −3, négatif entre −3 et 4, positif pour x &gt; 4, et nul en 4.<br>Donc S = ]−3 ; 4]. Le camarade a inclus à tort ]−∞ ; −3] : pour ces x, multiplier par x + 3 &lt; 0 aurait dû renverser le sens (et −3 est interdit).<br>Les entiers solutions sont −2, −1, 0, 1, 2, 3, 4 : il y en a 7.'},
]},

{subj:'an1', sem:'aut', id:'an1-trinome', h:'Valeurs absolues et trinôme', p:'La valeur absolue comme distance, puis le trinôme du second degré : discriminant, racines, signe et factorisation.', steps:[
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
 {kind:'Problème',h:'Une tolérance de fabrication',
  p:'Une tige d’acier doit mesurer 50 mm, avec une tolérance de 0,2 mm : elle est acceptée si |<i>L</i> − 50| ≤ 0,2. Sa longueur dépend de la température <i>T</i> de l’atelier (en °C) : <i>L</i>(<i>T</i>) = 49,9 + 0,004 <i>T</i>. On cherche les températures pour lesquelles la tige est acceptée.',
  parts:[
   {q:'a) Quelle est la plus petite longueur acceptée&nbsp;?',lab:'L =',unit:'mm',ans:49.8,tol:1e-6,hint:'|<i>L</i> − 50| ≤ 0,2 veut dire que <i>L</i> est à au plus 0,2 de 50.',why:'|L − 50| ≤ 0,2 ⇔ 49,8 ≤ L ≤ 50,2. La plus petite longueur acceptée est 49,8 mm.'},
   {q:'b) La condition s’écrit |0,004 <i>T</i> − <i>c</i>| ≤ 0,2. Que vaut <i>c</i>&nbsp;?',lab:'c =',ans:.1,tol:1e-9,hint:'Remplace <i>L</i> par 49,9 + 0,004 <i>T</i> dans <i>L</i> − 50.',why:'L − 50 = 49,9 + 0,004T − 50 = 0,004T − 0,1. Donc c = 0,1.'},
   {q:'c) Quelle est la température maximale admise&nbsp;?',lab:'T =',unit:'°C',ans:75,hint:'Écris −0,2 ≤ 0,004 <i>T</i> − 0,1 ≤ 0,2 et isole <i>T</i>.',why:'0,004T − 0,1 ≤ 0,2 ⇔ 0,004T ≤ 0,3 ⇔ T ≤ 75 °C.'},
   {q:'d) Et la température minimale&nbsp;?',lab:'T =',unit:'°C',ans:-25,hint:'Utilise l’autre moitié de l’encadrement.',why:'−0,2 ≤ 0,004T − 0,1 ⇔ −0,1 ≤ 0,004T ⇔ T ≥ −25 °C.'},
  ],
  sol:'La tige est acceptée si |L − 50| ≤ 0,2, c’est-à-dire 49,8 ≤ L ≤ 50,2.<br>Avec L = 49,9 + 0,004T, on a L − 50 = 0,004T − 0,1, d’où |0,004T − 0,1| ≤ 0,2.<br>Penser distance : −0,2 ≤ 0,004T − 0,1 ≤ 0,2, soit −0,1 ≤ 0,004T ≤ 0,3.<br>On divise par 0,004 &gt; 0, le sens ne change pas : −25 ≤ T ≤ 75.<br>La tige est acceptée pour T ∈ [−25 ; 75] °C.'},
 {kind:'Problème',h:'Le jardin clôturé',
  p:'Avec 40 m de clôture, tu entoures un jardin rectangulaire. On note <i>x</i> sa largeur en m, avec 0 &lt; <i>x</i> &lt; 20 : la longueur vaut alors 20 − <i>x</i> et l’aire A(<i>x</i>) = <i>x</i>(20 − <i>x</i>). Tu veux savoir quelles largeurs donnent une aire suffisante.',
  parts:[
   {q:'a) A(<i>x</i>) ≥ 96 équivaut à <i>x</i>² − 20<i>x</i> + 96 ≤ 0. Que vaut le discriminant de ce trinôme&nbsp;?',lab:'Δ =',ans:16,hint:'Δ = b² − 4ac avec a = 1, b = −20, c = 96.',why:'Δ = 400 − 384 = 16. Les racines sont (20 ± 4)/2, soit 8 et 12.'},
   {q:'b) Quelles largeurs donnent une aire d’au moins 96 m²&nbsp;?',opts:[']−∞ ; 8] ∪ [12 ; +∞[',']8 ; 12[','[8 ; 12]','[6 ; 14]'],ans:2,hint:'Le trinôme a le signe de a = 1 à l’extérieur des racines.',why:'x² − 20x + 96 = (x − 8)(x − 12) ≤ 0 entre les racines, bornes comprises : x ∈ [8 ; 12].'},
   {q:'c) On vérifie que A(<i>x</i>) = 100 − (<i>x</i> − 10)². Une aire d’au moins 91 m² s’écrit alors |<i>x</i> − 10| ≤ <i>r</i>. Que vaut <i>r</i>&nbsp;?',lab:'r =',unit:'m',ans:3,hint:'100 − (<i>x</i> − 10)² ≥ 91 ⇔ (<i>x</i> − 10)² ≤ 9. Et √(<i>u</i>²) = |<i>u</i>|.',why:'(x − 10)² ≤ 9 ⇔ |x − 10| ≤ 3, soit x ∈ [7 ; 13].'},
   {q:'d) Quelle est la plus grande aire possible&nbsp;?',lab:'A =',unit:'m²',ans:100,hint:'Un carré n’est jamais négatif.',why:'(x − 10)² ≥ 0 donne A(x) ≤ 100, avec égalité pour x = 10 : le carré de 10 m de côté.'},
  ],
  sol:'A(x) = x(20 − x) = 20x − x² = 100 − (x − 10)².<br>A(x) ≥ 96 ⇔ x² − 20x + 96 ≤ 0. Δ = 16, racines 8 et 12, donc (x − 8)(x − 12) ≤ 0 ⇔ x ∈ [8 ; 12].<br>Même résultat avec la forme canonique : (x − 10)² ≤ 4 ⇔ |x − 10| ≤ 2.<br>De même, A(x) ≥ 91 ⇔ |x − 10| ≤ 3, soit x ∈ [7 ; 13].<br>Enfin A(x) ≤ 100 pour tout x, avec égalité seulement en x = 10 : à périmètre fixé, le carré a la plus grande aire.'},
]},

{subj:'an1', sem:'aut', id:'an1-suites', h:'Suites et limites', p:'Suites bornées et monotones, la définition ε–N de la limite, les limites infinies et les formes indéterminées.', steps:[
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
 {kind:'Problème',h:'Le stock de poissons',
  p:'Un lac contient 100 tonnes de poissons. Chaque année, la pêche prélève 20 % du stock, puis on relâche 10 tonnes d’alevins. On note <i>uₙ</i> le stock (en tonnes) après <i>n</i> années : <i>u</i>₀ = 100 et <b><i>uₙ</i>₊₁ = 0,8 <i>uₙ</i> + 10</b>. On veut savoir vers quoi tend le stock, et à partir de quand il en est proche.',
  fig:(()=>{ const P=plane({x:[-1,25],y:[40,105],h:200,grid:false,lx:5,ly:10}); P.seg(0,50,25,50,{c:'var(--ok)',w:1.5,dash:true}).text(24,50,'50',{dy:-6,c:'var(--ok)'});
    let u=100; for(let n=0;n<=24;n++){ P.dot(n,u,{r:3.5,c:'var(--accent)'}); u=.8*u+10; } return P.svg(); })(),
  parts:[
   {q:'a) Que vaut <i>u</i>₁&nbsp;?',lab:'u₁ =',unit:'t',ans:90,hint:'Applique la relation avec <i>u</i>₀ = 100.',why:'u₁ = 0,8 · 100 + 10 = 90 t.'},
   {q:'b) Si (<i>uₙ</i>) converge vers <i>L</i>, alors <i>L</i> = 0,8<i>L</i> + 10. Que vaut <i>L</i>&nbsp;?',lab:'L =',unit:'t',ans:50,hint:'Passe à la limite des deux côtés de la relation, puis résous.',why:'L = 0,8L + 10 ⇔ 0,2L = 10 ⇔ L = 50 t.'},
   {q:'c) On pose <i>vₙ</i> = <i>uₙ</i> − 50. Que peut-on dire de (<i>vₙ</i>)&nbsp;?',opts:['<i>vₙ</i>₊₁ = <i>vₙ</i> − 10 : elle perd 10 par an','<i>vₙ</i>₊₁ = 0,8 <i>vₙ</i> + 10 : même relation que (<i>uₙ</i>)','<i>vₙ</i> est constante, égale à 50','<i>vₙ</i>₊₁ = 0,8 <i>vₙ</i> : elle est multipliée par 0,8 chaque année et tend vers 0'],ans:3,hint:'Calcule <i>vₙ</i>₊₁ = <i>uₙ</i>₊₁ − 50 et fais apparaître <i>uₙ</i> − 50.',why:'vₙ₊₁ = 0,8uₙ + 10 − 50 = 0,8uₙ − 40 = 0,8(uₙ − 50) = 0,8vₙ. Donc vₙ = 50 · 0,8ⁿ → 0, et uₙ → 50.'},
   {q:'d) À partir de quel rang <i>N</i> a-t-on |<i>uₙ</i> − 50| &lt; 1 pour tout <i>n</i> ≥ <i>N</i>&nbsp;?',lab:'N =',ans:18,hint:'|<i>uₙ</i> − 50| = 50 · 0,8ⁿ diminue avec <i>n</i>. Teste quelques valeurs à la calculatrice.',why:'50 · 0,8¹⁷ ≈ 1,13 et 50 · 0,8¹⁸ ≈ 0,90. Comme la suite 50 · 0,8ⁿ décroît, N = 18.'},
  ],
  sol:'u₁ = 0,8 · 100 + 10 = 90.<br>Le seul candidat limite vérifie L = 0,8L + 10, donc L = 50.<br>Avec vₙ = uₙ − 50 : vₙ₊₁ = 0,8uₙ − 40 = 0,8vₙ, donc vₙ = v₀ · 0,8ⁿ = 50 · 0,8ⁿ.<br>Comme 0 &lt; 0,8 &lt; 1, 0,8ⁿ → 0 et uₙ = 50 + 50 · 0,8ⁿ → 50. Le stock décroît vers 50 t.<br>|uₙ − 50| = 50 · 0,8ⁿ &lt; 1 dès n = 18 (50 · 0,8¹⁷ ≈ 1,13 ; 50 · 0,8¹⁸ ≈ 0,90). C’est le N de la définition ε–N avec ε = 1.'},
 {kind:'Problème',h:'La méthode de Héron',
  p:'Pour approcher √2, on calcule <i>u</i>₀ = 2 et <b><i>uₙ</i>₊₁ = (<i>uₙ</i> + 2/<i>uₙ</i>)/2</b>. Chaque terme est la moyenne de <i>uₙ</i> et de 2/<i>uₙ</i>, deux nombres dont le produit vaut 2 : l’un est au-dessus de √2, l’autre en dessous. On admet que (<i>uₙ</i>) est décroissante et minorée par √2, donc qu’elle converge vers un réel <i>L</i> &gt; 0.',
  parts:[
   {q:'a) Que vaut <i>u</i>₁&nbsp;?',lab:'u₁ =',ans:1.5,tol:1e-9,hint:'Remplace <i>uₙ</i> par 2.',why:'u₁ = (2 + 2/2)/2 = 3/2 = 1,5.'},
   {q:'b) Que vaut <i>u</i>₂&nbsp;? Donne une fraction ou un arrondi à 10⁻⁵.',lab:'u₂ =',ans:17/12,tol:1e-5,hint:'2/(3/2) = 4/3.',why:'u₂ = (3/2 + 4/3)/2 = (17/6)/2 = 17/12 ≈ 1,41667.'},
   {q:'c) Pourquoi la limite <i>L</i> vaut-elle √2&nbsp;?',opts:['Parce que <i>u</i>₂ est déjà très proche de √2','Parce que la suite est décroissante','En passant à la limite dans la relation : <i>L</i> = (<i>L</i> + 2/<i>L</i>)/2, donc <i>L</i>² = 2, et <i>L</i> &gt; 0','Parce que 2/<i>uₙ</i> tend vers 0'],ans:2,hint:'Si <i>uₙ</i> → <i>L</i>, alors <i>uₙ</i>₊₁ → <i>L</i> aussi.',why:'L = (L + 2/L)/2 ⇔ 2L = L + 2/L ⇔ L = 2/L ⇔ L² = 2. Comme L ≥ √2 &gt; 0, L = √2. Être proche ou décroissante ne suffit pas à identifier la limite.'},
   {q:'d) On trouve <i>u</i>₃ = 577/408. Combien de décimales de √2 = 1,4142135… sont exactes dans <i>u</i>₃&nbsp;?',ans:5,hint:'Calcule 577/408 avec 7 décimales et compare chiffre par chiffre.',why:'577/408 ≈ 1,4142157 : les décimales 4, 1, 4, 2, 1 sont justes, la 6e (5 au lieu de 3) ne l’est pas.'},
  ],
  sol:'u₁ = (2 + 1)/2 = 3/2, puis u₂ = (3/2 + 4/3)/2 = 17/12 ≈ 1,41667, et u₃ = 577/408 ≈ 1,4142157.<br>La suite est décroissante et minorée par √2, donc elle converge vers un réel L ≥ √2.<br>En passant à la limite dans uₙ₊₁ = (uₙ + 2/uₙ)/2, on obtient L = (L + 2/L)/2, soit L² = 2, donc L = √2.<br>La convergence est très rapide : l’erreur passe de 0,086 (u₁) à 0,0025 (u₂) puis à 0,000002 (u₃). Elle est à peu près élevée au carré à chaque étape, ce qui double le nombre de décimales exactes.'},
]},

{subj:'an1', sem:'aut', id:'an1-geometrique', h:'Série géométrique et nombre d’Euler', p:'Sommer une infinité de termes : la série géométrique, puis le nombre e vu de deux façons.', steps:[
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
 {kind:'Problème',h:'La balle qui rebondit',
  p:'Tu lâches une balle d’une hauteur de 2 m. À chaque rebond, elle remonte aux 3/4 de la hauteur précédente. On suppose qu’elle rebondit indéfiniment. On veut la hauteur des rebonds et la distance totale parcourue.',
  fig:(()=>{ const P=plane({x:[-.3,8],y:[-.2,2.2],h:160,grid:false,lx:1,ly:.5}); let h=2,x=0;
    P.seg(0,2,0,0,{c:'var(--accent)',w:2});
    for(let k=1;k<=7;k++){ h*=.75; const H=h,x0=x; P.curve(t=>x0+t,t=>4*H*t*(1-t),0,1,{c:'var(--accent)',w:2}); x+=1; }
    P.text(.1,2,'2 m',{dx:6,dy:4}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle hauteur atteint-elle après le 3e rebond&nbsp;? Arrondis au centième.',lab:'h₃ ≈',unit:'m',ans:.84375,tol:.006,hint:'Chaque rebond multiplie la hauteur par 3/4.',why:'h₃ = 2 · (3/4)³ = 2 · 27/64 = 0,84375 ≈ 0,84 m.'},
   {q:'b) Quelle distance verticale totale parcourt-elle&nbsp;?',lab:'D =',unit:'m',ans:14,hint:'Une descente de 2 m, puis pour chaque rebond <i>k</i> ≥ 1 une montée et une descente de hₖ = 2 · (3/4)ᵏ.',why:'D = 2 + 2 · Σ<sub>k≥1</sub> 2 · (3/4)ᵏ = 2 + 4 · (3/4)/(1 − 3/4) = 2 + 4 · 3 = 14 m.'},
   {q:'c) Après combien de rebonds la hauteur passe-t-elle pour la première fois sous 1 cm&nbsp;?',ans:19,hint:'Cherche le plus petit <i>n</i> avec 2 · 0,75ⁿ &lt; 0,01, en testant à la calculatrice.',why:'2 · 0,75¹⁸ ≈ 0,0113 m et 2 · 0,75¹⁹ ≈ 0,0085 m : c’est au 19e rebond.'},
  ],
  sol:'Après le k-ième rebond, la hauteur vaut hₖ = 2 · (3/4)ᵏ : c’est une suite géométrique de raison 3/4. Donc h₃ = 54/64 ≈ 0,84 m.<br>Distance : la première chute (2 m), puis chaque rebond se parcourt deux fois (montée et descente).<br>D = 2 + 2 Σ<sub>k=1</sub><sup>∞</sup> 2(3/4)ᵏ. La série a pour premier terme 3/2 et raison 3/4, sa somme vaut (3/2)/(1/4) = 6.<br>D = 2 + 2 · 6 = 14 m : une infinité de rebonds, mais une distance finie.<br>Enfin 2 · 0,75ⁿ &lt; 0,01 ⇔ 0,75ⁿ &lt; 0,005, vrai pour la première fois en n = 19.'},
 {kind:'Problème',h:'Rembourser un emprunt',
  p:'Tu empruntes 10 000 CHF au taux de 1 % par mois. Tu rembourses en 12 mensualités égales <i>M</i>, la première un mois après l’emprunt. Le principe : au bout de 12 mois, la valeur de tes versements (avec leurs intérêts) doit égaler la dette (avec ses intérêts). On compare ensuite avec des intérêts calculés en continu.',
  parts:[
   {q:'a) Sans aucun versement, combien devrais-tu au bout de 12 mois&nbsp;? Arrondis au centime.',lab:'D =',unit:'CHF',ans:10000*1.01**12,tol:.006,hint:'Chaque mois, la dette est multipliée par 1,01.',why:'10 000 · 1,01¹² ≈ 11 268,25 CHF.'},
   {q:'b) Le versement du mois <i>k</i> rapporte des intérêts pendant 12 − <i>k</i> mois. La valeur finale des versements vaut <i>M</i>(1 + 1,01 + 1,01² + … + 1,01¹¹) = <i>M</i> · <i>S</i>. Que vaut <i>S</i>&nbsp;? Arrondis au millième.',lab:'S ≈',ans:(1.01**12-1)/.01,tol:6e-4,hint:'Somme géométrique de raison <i>q</i> = 1,01 : (1 − <i>q</i>¹²)/(1 − <i>q</i>).',why:'S = (1,01¹² − 1)/0,01 ≈ 12,683.'},
   {q:'c) Que vaut la mensualité <i>M</i>&nbsp;? Arrondis au centime.',lab:'M =',unit:'CHF',ans:10000*1.01**12*.01/(1.01**12-1),tol:.006,hint:'Écris l’égalité <i>M</i> · <i>S</i> = 10 000 · 1,01¹².',why:'M = 11 268,25/12,6825 ≈ 888,49 CHF. Tu paies au total 12M ≈ 10 661,85 CHF, soit 661,85 CHF d’intérêts.'},
   {q:'d) Une banque qui capitaliserait en continu au taux annuel de 12 % ferait passer la dette, en un an, à lim 10 000 (1 + 0,12/<i>n</i>)ⁿ. Combien vaut cette dette&nbsp;? Arrondis au centime.',lab:'D =',unit:'CHF',ans:10000*Math.exp(.12),tol:.006,hint:'(1 + <i>x</i>/<i>n</i>)ⁿ → eˣ.',why:'10 000 · e<sup>0,12</sup> ≈ 11 274,97 CHF, à peine plus que les 11 268,25 CHF de la capitalisation mensuelle.'},
  ],
  sol:'Sans versement, la dette vaut 10 000 · 1,01¹² ≈ 11 268,25 CHF après un an.<br>Le versement du mois k vaut M · 1,01¹²⁻ᵏ au mois 12. En sommant de k = 1 à 12 : M(1 + 1,01 + … + 1,01¹¹) = M · (1,01¹² − 1)/0,01 ≈ 12,6825 M.<br>On égale : 12,6825 M = 11 268,25, d’où M ≈ 888,49 CHF.<br>Total payé : 12M ≈ 10 661,85 CHF, dont 661,85 CHF d’intérêts.<br>En continu, (1 + 0,12/n)ⁿ → e<sup>0,12</sup> ≈ 1,1275 : la dette deviendrait 11 274,97 CHF. Capitaliser plus souvent coûte un peu plus, mais la limite reste finie : c’est le rôle du nombre e.'},
]},

{subj:'an1', sem:'aut', id:'an1-limfonctions', h:'Limites de fonctions', p:'Limites en un point, à gauche et à droite, à l’infini, et les infiniment petits équivalents.', steps:[
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
 {kind:'Problème',h:'La flèche d’un pont en arc',
  p:'Un pont suit un arc de cercle de rayon <i>R</i> = 40 m, qui intercepte un angle au centre θ (en radians). L’arc mesure <i>R</i>θ, la corde qui joint ses extrémités mesure 2<i>R</i> sin(θ/2), et la <b>flèche</b> (hauteur de l’arc au-dessus de la corde) vaut <i>h</i> = <i>R</i>(1 − cos(θ/2)). Pour un arc très plat, θ est petit : on utilise les équivalents.',
  fig:(()=>{ const P=plane({x:[-4,4],y:[-2.8,2],h:220,grid:false,axes:false}), a=rad(50), ex=4*Math.sin(a), ey=-2.5+4*Math.cos(a);
    P.curve(t=>4*Math.sin(t),t=>-2.5+4*Math.cos(t),-a,a,{c:'var(--accent)',w:3}).seg(-ex,ey,ex,ey,{c:'var(--spark)',w:2})
     .seg(0,-2.5,-ex,ey,{c:'var(--muted)',w:1.2,dash:true}).seg(0,-2.5,ex,ey,{c:'var(--muted)',w:1.2,dash:true}).seg(0,ey,0,1.5,{c:'var(--math)',w:2.5})
     .dot(0,-2.5,{r:3,c:'var(--ink)'}).text(0,-2.5,'θ',{a:'middle',dy:-14}).text(0,.8,'h',{dx:6,c:'var(--math)'}).text(1.6,ey,'corde',{dy:16,c:'var(--spark)'}).text(2.2,1.2,'arc Rθ',{c:'var(--accent)'}); return P.svg(); })(),
  parts:[
   {q:'a) Que vaut la limite de corde/arc = 2<i>R</i> sin(θ/2)/(<i>R</i>θ) quand θ → 0&nbsp;?',lab:'L =',ans:1,hint:'sin <i>u</i> ~ <i>u</i> avec <i>u</i> = θ/2.',why:'2R sin(θ/2) ~ 2R · θ/2 = Rθ, donc le quotient tend vers 1 : pour un arc plat, la corde et l’arc ont presque la même longueur.'},
   {q:'b) Avec <i>R</i> = 40 m, que vaut lim <i>h</i>/θ² quand θ → 0&nbsp;?',lab:'L =',unit:'m',ans:5,hint:'1 − cos <i>u</i> ~ <i>u</i>²/2 avec <i>u</i> = θ/2.',why:'h = R(1 − cos(θ/2)) ~ R(θ/2)²/2 = Rθ²/8. Donc h/θ² → R/8 = 40/8 = 5 m.'},
   {q:'c) Pour θ = 0,1 rad, estime la flèche <i>h</i> avec cet équivalent, en cm.',lab:'h ≈',unit:'cm',ans:5,tol:.011,hint:'<i>h</i> ≈ 5θ² (en m).',why:'h ≈ 5 · 0,1² = 0,05 m = 5 cm. La valeur exacte 40(1 − cos 0,05) ≈ 4,999 cm confirme l’approximation.'},
  ],
  sol:'Quand θ → 0, u = θ/2 → 0, donc sin u ~ u et 1 − cos u ~ u²/2.<br>Corde : 2R sin(θ/2) ~ Rθ, donc corde/arc → 1.<br>Flèche : h = R(1 − cos(θ/2)) ~ R · (θ/2)²/2 = Rθ²/8. Avec R = 40 m, h ~ 5θ², donc h/θ² → 5 m.<br>Pour θ = 0,1 : h ≈ 5 · 0,01 = 0,05 m = 5 cm. L’arc mesure alors 4 m : un arc de 4 m sur un cercle de 40 m ne s’élève que de 5 cm au-dessus de sa corde.<br>La flèche est un infiniment petit d’ordre 2 en θ, alors que l’arc et la corde sont d’ordre 1.'},
 {kind:'Problème',h:'Quatre limites, un piège',
  p:'Les équivalents marchent aussi en +∞ : si <i>u</i>(<i>x</i>) → 0, on peut remplacer sin <i>u</i> par <i>u</i>, e<sup><i>u</i></sup> − 1 par <i>u</i>, etc. On calcule trois limites en repérant les facteurs à remplacer. Puis on examine le raisonnement d’un élève qui a utilisé les équivalents trop vite.',
  parts:[
   {q:`a) Calcule lim<sub>x→0</sub> ${F('ln(1 + 3<i>x</i>) · sin(2<i>x</i>)','1 − cos <i>x</i>')}.`,lab:'L =',ans:12,hint:'Remplace chacun des trois facteurs par son équivalent.',why:'ln(1 + 3x) ~ 3x, sin(2x) ~ 2x, 1 − cos x ~ x²/2. Le quotient ~ 6x²/(x²/2) = 12.'},
   {q:'b) Calcule lim<sub>x→+∞</sub> <i>x</i>²(1 − cos(1/<i>x</i>)).',lab:'L =',ans:.5,tol:1e-9,hint:'Pose <i>u</i> = 1/<i>x</i>, qui tend vers 0.',why:'1 − cos(1/x) ~ (1/x)²/2 = 1/(2x²). Donc x² · 1/(2x²) = 1/2.'},
   {q:'c) Calcule lim<sub>x→+∞</sub> <i>x</i>(e<sup>2/<i>x</i></sup> − 1).',lab:'L =',ans:2,hint:'Forme ∞ · 0. Avec <i>u</i> = 2/<i>x</i> → 0, e<sup><i>u</i></sup> − 1 ~ <i>u</i>.',why:'e<sup>2/x</sup> − 1 ~ 2/x, donc x · 2/x = 2.'},
   {q:'d) Un élève écrit : « e<sup><i>x</i></sup> − 1 ~ <i>x</i>, donc (e<sup><i>x</i></sup> − 1 − <i>x</i>)/<i>x</i>² ~ (<i>x</i> − <i>x</i>)/<i>x</i>² = 0 ». Qu’en penses-tu&nbsp;?',opts:['C’est juste : la limite vaut 0','C’est faux, car e<sup><i>x</i></sup> − 1 n’est pas équivalent à <i>x</i>','C’est juste, mais la limite vaut +∞','C’est faux : il a remplacé un terme d’une somme. L’équivalent ne dit rien de e<sup><i>x</i></sup> − 1 − <i>x</i> (la vraie limite vaut 1/2)'],ans:3,hint:'Relis la règle : on remplace un facteur, jamais un terme d’une somme.',why:'eˣ − 1 ~ x est vrai, mais eˣ − 1 − x est une différence de deux quantités équivalentes : son comportement dépend du terme suivant (x²/2). Numériquement, en x = 0,001, le quotient vaut environ 0,5002.'},
  ],
  sol:'a) Trois facteurs, trois équivalents : ln(1 + 3x) ~ 3x, sin 2x ~ 2x, 1 − cos x ~ x²/2. Limite : 6x²/(x²/2) = 12.<br>b) Avec u = 1/x → 0⁺ : 1 − cos u ~ u²/2, donc x²(1 − cos(1/x)) ~ x² · 1/(2x²) → 1/2.<br>c) Avec u = 2/x → 0 : eᵘ − 1 ~ u, donc x(e<sup>2/x</sup> − 1) ~ x · 2/x = 2.<br>d) L’élève remplace un terme d’une somme : eˣ − 1 − x est la différence de deux quantités équivalentes, elle est « plus petite » que chacune et les équivalents d’ordre 1 ne la voient pas. Il faut un développement plus fin (eˣ = 1 + x + x²/2 + …), qui donne la limite 1/2.'},
]},

{subj:'an1', sem:'aut', id:'an1-derivee', h:'Continuité et dérivabilité', p:'Continuité et prolongement, la dérivée comme limite du taux d’accroissement, et les règles de dérivation.', steps:[
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
 {kind:'Problème',h:'Raccorder une voie ferrée',
  p:'Une voie ferrée suit la courbe <i>y</i> = <i>x</i>² pour <i>x</i> ≤ 1 (unités en km), puis continue en ligne droite <i>y</i> = <i>ax</i> + <i>b</i> pour <i>x</i> &gt; 1. Pour que les rails ne soient pas coupés, le raccord doit être <b>continu</b>. Pour éviter un choc latéral, il ne doit pas faire d’angle : la fonction doit être <b>dérivable</b> en 1.',
  fig:(()=>{ const P=plane({x:[-1.5,3],y:[-1,5],h:240,lab:1}); P.fn(x=>x*x,{from:-1.5,to:1}).fn(x=>2*x-1,{from:1,to:3,c:'var(--spark)'}).dot(1,1,{r:5,c:'var(--ink)',l:'raccord'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle condition impose la continuité en 1&nbsp;?',opts:['<i>a</i> = 1','<i>b</i> = 1','<i>a</i> + <i>b</i> = 1','<i>a</i> + <i>b</i> = 2'],ans:2,hint:'Compare la limite à droite <i>a</i> · 1 + <i>b</i> avec f(1).',why:'f(1) = 1² = 1 et la limite à droite vaut a + b. Continuité : a + b = 1.'},
   {q:'b) La dérivabilité en 1 impose l’égalité des pentes à gauche et à droite. Que vaut <i>a</i>&nbsp;?',lab:'a =',ans:2,hint:'À gauche, la pente est la dérivée de <i>x</i>² en 1. À droite, c’est la pente de la droite.',why:'(x²)′ = 2x vaut 2 en 1. La droite a pour pente a. Donc a = 2.'},
   {q:'c) Que vaut alors <i>b</i>&nbsp;?',lab:'b =',ans:-1,hint:'Utilise la condition de continuité.',why:'a + b = 1 avec a = 2 donne b = −1.'},
   {q:'d) La partie droite de la voie, prolongée, coupe l’axe O<i>x</i>. En quelle abscisse&nbsp;?',lab:'x =',unit:'km',ans:.5,tol:1e-9,hint:'Résous 2<i>x</i> − 1 = 0.',why:'2x − 1 = 0 ⇔ x = 0,5. C’est aussi là que la tangente à y = x² en 1 coupe l’axe : la droite est cette tangente.'},
  ],
  sol:'Continuité en 1 : f(1) = 1 et lim<sub>x→1⁺</sub> (ax + b) = a + b, donc a + b = 1.<br>Dérivabilité : à gauche, le taux (f(1 + h) − f(1))/h = 2 + h → 2 ; à droite, il vaut a. Donc a = 2.<br>Puis b = 1 − a = −1. La droite est y = 2x − 1, qui coupe Ox en x = 0,5.<br>C’est exactement la tangente à la parabole au point (1 ; 1) : un raccord sans angle prolonge la courbe par sa tangente.<br>(Il reste un saut de courbure, car f″ passe de 2 à 0 : en vrai, on intercale une courbe de transition.)'},
 {kind:'Problème',h:'Prolonger, puis dériver',
  p:`On considère f(x) = ${F('1 − cos <i>x</i>','<i>x</i>')} pour <i>x</i> ≠ 0. Elle n’est pas définie en 0. On veut la prolonger par continuité, vérifier que le prolongement est dérivable en 0, trouver sa tangente, puis calculer une dérivée ailleurs avec les règles.`,
  fig:(()=>{ const P=plane({x:[-7,7],y:[-1,1],h:160,grid:false,lx:2,ly:.5}); P.fn(x=>Math.abs(x)<1e-9?0:(1-Math.cos(x))/x).fn(x=>x/2,{from:-2,to:2,c:'var(--spark)',w:2,dash:true}).dot(0,0,{r:4,c:'var(--ink)'}); return P.svg(); })(),
  parts:[
   {q:'a) Par quelle valeur faut-il prolonger <i>f</i> en 0&nbsp;?',lab:'f(0) =',ans:0,hint:'1 − cos <i>x</i> ~ <i>x</i>²/2.',why:'f(x) ~ (x²/2)/x = x/2 → 0. On pose f(0) = 0.'},
   {q:'b) Avec f(0) = 0, calcule f′(0) à l’aide du taux d’accroissement.',lab:'f′(0) =',ans:.5,tol:1e-9,hint:'Le taux vaut (f(<i>h</i>) − 0)/<i>h</i> = (1 − cos <i>h</i>)/<i>h</i>².',why:'(1 − cos h)/h² ~ (h²/2)/h² = 1/2. Donc f′(0) = 1/2.'},
   {q:'c) Quelle est la tangente au graphe en 0&nbsp;?',opts:['<i>y</i> = 0','<i>y</i> = <i>x</i>','<i>y</i> = 2<i>x</i>','<i>y</i> = <i>x</i>/2'],ans:3,hint:'<i>y</i> = f(0) + f′(0)(<i>x</i> − 0).',why:'y = 0 + (1/2)x = x/2.'},
   {q:'d) Calcule f′(π), arrondi au centième.',lab:'f′(π) ≈',ans:-2/Math.PI**2,tol:.006,hint:'Règle du quotient avec <i>u</i> = 1 − cos <i>x</i> et <i>v</i> = <i>x</i>.',why:'f′(x) = (x sin x − (1 − cos x))/x². En π : (0 − 2)/π² = −2/π² ≈ −0,20.'},
  ],
  sol:'Comme 1 − cos x ~ x²/2 en 0, f(x) ~ x/2 → 0 : on prolonge par f(0) = 0, et f devient continue en 0.<br>Taux en 0 : (f(h) − f(0))/h = (1 − cos h)/h² → 1/2. Donc f est dérivable en 0 et f′(0) = 1/2.<br>La tangente en 0 est y = x/2.<br>Pour x ≠ 0, la règle du quotient donne f′(x) = (x sin x − (1 − cos x))/x².<br>En π : sin π = 0 et cos π = −1, donc f′(π) = −2/π² ≈ −0,20.'},
]},

/* ===================== APPLICATIONS ET INTÉGRALES ===================== */
{subj:'an1', sem:'pri', id:'an1-etude', h:'Extrema et étude de fonction', p:'Trouver les extrema, lire la convexité, repérer les asymptotes, et mener une étude complète.', steps:[
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
 {kind:'Problème',h:'La canette la plus économique',
  p:'Une canette cylindrique doit contenir <i>V</i> = 330 cm³. Pour économiser l’aluminium, on veut minimiser sa surface totale : le fond, le couvercle et la paroi. On note <i>r</i> le rayon et <i>h</i> la hauteur, en cm. On cherche les dimensions optimales.',
  parts:[
   {q:'a) Exprime la surface en fonction de <i>r</i> seul.',opts:['S(r) = πr² + 330/r','S(r) = 2πr² + 660/r','S(r) = 2πr² + 330/r','S(r) = 2πr · 330'],ans:1,hint:'Le volume impose <i>h</i> = 330/(π<i>r</i>²). La paroi déroulée est un rectangle de côtés 2π<i>r</i> et <i>h</i>.',why:'Fond et couvercle : 2πr². Paroi : 2πr · h = 2πr · 330/(πr²) = 660/r.'},
   {q:'b) Pour quel rayon la surface est-elle minimale&nbsp;? Arrondis au centième.',lab:'r ≈',unit:'cm',ans:Math.cbrt(330/(2*Math.PI)),tol:.006,hint:'Résous S′(<i>r</i>) = 4π<i>r</i> − 660/<i>r</i>² = 0.',why:'4πr³ = 660 ⇔ r³ = 165/π ⇔ r ≈ 3,74 cm. S′ &lt; 0 avant et S′ &gt; 0 après : c’est un minimum.'},
   {q:'c) Que vaut alors le rapport <i>h</i>/<i>r</i>&nbsp;?',lab:'h/r =',ans:2,hint:'Au minimum, π<i>r</i>³ = 165 = <i>V</i>/2. Remplace dans <i>h</i> = <i>V</i>/(π<i>r</i>²).',why:'h = V/(πr²) = 2πr³/(πr²) = 2r. La hauteur égale le diamètre.'},
   {q:'d) Quelle est la surface minimale&nbsp;? Arrondis au cm².',lab:'S ≈',unit:'cm²',ans:6*Math.PI*Math.cbrt(330/(2*Math.PI))**2,tol:.5,hint:'Avec <i>h</i> = 2<i>r</i>, S = 2π<i>r</i>² + 2π<i>r</i> · 2<i>r</i>.',why:'S = 6πr² ≈ 6π · 3,745² ≈ 264 cm².'},
  ],
  sol:'Le volume donne h = 330/(πr²). Surface : S(r) = 2πr² + 2πrh = 2πr² + 660/r, pour r &gt; 0.<br>S′(r) = 4πr − 660/r² = (4πr³ − 660)/r². Elle s’annule pour r³ = 165/π, soit r ≈ 3,74 cm.<br>S′ &lt; 0 avant, S′ &gt; 0 après, et S → +∞ en 0⁺ et en +∞ : c’est le minimum global.<br>Alors h = 330/(πr²) = 2r ≈ 7,49 cm : la canette optimale est aussi haute que large.<br>S<sub>min</sub> = 6πr² ≈ 264 cm². (Les vraies canettes sont plus hautes : la prise en main et l’épaisseur du fond comptent aussi.)'},
 {kind:'Problème',h:'Étude complète d’une fraction',
  p:`On étudie f(x) = ${F('<i>x</i>² + 3','<i>x</i> − 1')} sur ℝ \\ {1}. On cherche ses asymptotes et ses extrema. On veut ensuite savoir pour quelles valeurs de <i>k</i> l’équation f(x) = <i>k</i> a des solutions.`,
  fig:(()=>{ const f=x=>(x*x+3)/(x-1), P=plane({x:[-6,8],y:[-8,14],w:300,lab:2}); P.seg(1,-8,1,14,{c:'var(--muted)',w:1.5,dash:true}).fn(x=>x+1,{c:'var(--ok)',w:1.5,dash:true})
    .fn(f,{from:-6,to:.8}).fn(f,{from:1.25,to:8}).dot(-1,-2,{r:4,c:'var(--ink)'}).dot(3,6,{r:4,c:'var(--ink)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’asymptote oblique&nbsp;?',opts:['<i>y</i> = <i>x</i>','<i>y</i> = <i>x</i> − 1','<i>y</i> = <i>x</i> + 1','<i>y</i> = <i>x</i> + 4'],ans:2,hint:'Divise <i>x</i>² + 3 par <i>x</i> − 1.',why:'x² + 3 = (x − 1)(x + 1) + 4, donc f(x) = x + 1 + 4/(x − 1), et 4/(x − 1) → 0.'},
   {q:'b) En quelle abscisse <i>f</i> a-t-elle un minimum local&nbsp;?',lab:'x =',ans:3,hint:'f′(<i>x</i>) = 1 − 4/(<i>x</i> − 1)². Où s’annule-t-elle, et comment change son signe&nbsp;?',why:'f′(x) = 0 ⇔ (x − 1)² = 4 ⇔ x = 3 ou x = −1. En 3, f′ passe de − à + : minimum local f(3) = 12/2 = 6.'},
   {q:'c) Quelle est la valeur du maximum local&nbsp;?',lab:'f =',ans:-2,hint:'Calcule f en l’autre zéro de f′.',why:'En x = −1, f′ passe de + à − : maximum local f(−1) = 4/(−2) = −2.'},
   {q:'d) Pour quelles valeurs de <i>k</i> l’équation f(x) = <i>k</i> n’a-t-elle aucune solution&nbsp;?',opts:[']−2 ; 6[','[−2 ; 6]',']−∞ ; −2[ ∪ ]6 ; +∞[','Aucune : <i>f</i> prend toutes les valeurs'],ans:0,hint:'Lis le tableau de variations sur chacun des deux intervalles ]−∞ ; 1[ et ]1 ; +∞[.',why:'Sur ]−∞ ; 1[, f monte jusqu’à −2 puis redescend vers −∞ : elle prend les valeurs de ]−∞ ; −2]. Sur ]1 ; +∞[, elle descend de +∞ à 6 puis remonte : valeurs [6 ; +∞[. Rien entre −2 et 6.'},
  ],
  sol:'Division : f(x) = x + 1 + 4/(x − 1). Asymptote verticale x = 1 (f → −∞ en 1⁻, +∞ en 1⁺) et oblique y = x + 1 en ±∞.<br>f′(x) = 1 − 4/(x − 1)² = ((x − 3)(x + 1))/(x − 1)², du signe de (x − 3)(x + 1).<br>Variations : f croît sur ]−∞ ; −1], décroît sur [−1 ; 1[ et sur ]1 ; 3], croît sur [3 ; +∞[.<br>Maximum local f(−1) = −2, minimum local f(3) = 6. Le maximum local est plus petit que le minimum local : ces extrema ne sont pas globaux.<br>Image : ]−∞ ; −2] ∪ [6 ; +∞[. L’équation f(x) = k n’a aucune solution si k ∈ ]−2 ; 6[, une seule si k = −2 ou k = 6, deux sinon.<br>f″(x) = 8/(x − 1)³ : f est concave à gauche de 1 et convexe à droite, sans point d’inflexion.'},
]},

{subj:'an1', sem:'pri', id:'an1-arcs', h:'Arcs paramétrés', p:'Une courbe décrite par un point qui bouge : vitesse, tangente, points singuliers, le folium de Descartes et le limaçon de Pascal.', steps:[
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
 {kind:'Problème',h:'La trajectoire d’un ballon',
  p:'Un ballon est lancé depuis le sol. Sa position (en m) au temps <i>t</i> (en s) est <b>γ(<i>t</i>) = (20<i>t</i> ; 15<i>t</i> − 5<i>t</i>²)</b>, de <i>t</i> = 0 jusqu’à l’instant où il retombe. On étudie la trajectoire avec le vecteur vitesse.',
  params:[{id:'t',l:'t',min:0,max:3,step:.25,v:.5,u:' s'}],
  draw:v=>{ const P=plane({x:[-4,64],y:[-3,14],w:320,grid:false,lx:10,ly:5}); P.curve(s=>20*s,s=>15*s-5*s*s,0,3);
    const x=20*v.t, y=15*v.t-5*v.t*v.t; P.arrow(x,y,x+20*.4,y+(15-10*v.t)*.4,{c:'var(--spark)',w:2.5}).dot(x,y,{r:5,c:'var(--ink)'}); return P.svg(); },
  info:v=>`γ(${fmt(v.t)}) = (${fmt(20*v.t)} ; ${fmt(15*v.t-5*v.t*v.t)}) · γ′(t) = (20 ; ${fmt(15-10*v.t)})`,
  parts:[
   {q:'a) À quel instant le ballon retombe-t-il au sol&nbsp;?',lab:'t =',unit:'s',ans:3,hint:'Résous <i>y</i>(<i>t</i>) = 0 avec <i>t</i> &gt; 0.',why:'15t − 5t² = 5t(3 − t) = 0 ⇔ t = 0 ou t = 3. Il retombe en t = 3 s.'},
   {q:'b) À quelle distance du point de lancer&nbsp;?',lab:'x =',unit:'m',ans:60,hint:'Calcule <i>x</i>(3).',why:'x(3) = 20 · 3 = 60 m.'},
   {q:'c) Quelle est la pente de la tangente à la trajectoire en <i>t</i> = 1&nbsp;?',lab:'pente =',ans:.25,tol:1e-9,hint:'La pente vaut <i>y</i>′(<i>t</i>)/<i>x</i>′(<i>t</i>).',why:'γ′(t) = (20 ; 15 − 10t). En t = 1 : (20 ; 5), pente 5/20 = 0,25.'},
   {q:'d) Quelle est la hauteur maximale atteinte&nbsp;?',lab:'y =',unit:'m',ans:11.25,tol:1e-9,hint:'Au sommet, la tangente est horizontale : <i>y</i>′(<i>t</i>) = 0.',why:'y′(t) = 15 − 10t = 0 ⇔ t = 1,5 s. y(1,5) = 22,5 − 11,25 = 11,25 m.'},
  ],
  sol:'y(t) = 5t(3 − t) s’annule en t = 3 s : le ballon retombe à x(3) = 60 m.<br>Vitesse : γ′(t) = (20 ; 15 − 10t). Elle ne s’annule jamais (x′ = 20), donc la trajectoire n’a pas de point singulier.<br>Pente de la tangente : (15 − 10t)/20. En t = 1, elle vaut 0,25.<br>La tangente est horizontale quand y′(t) = 0, soit t = 1,5 s : sommet (30 ; 11,25).<br>En éliminant t (t = x/20), on trouve y = 0,75x − x²/80 : la trajectoire est une parabole.'},
 {kind:'Problème',h:'L’échelle qui glisse',
  p:'L’<b>astroïde</b> est l’arc γ(<i>t</i>) = (cos³ <i>t</i> ; sin³ <i>t</i>), <i>t</i> ∈ [0 ; 2π[. Elle a la forme d’une étoile à quatre pointes. On cherche ses points singuliers, puis on découvre une propriété surprenante de ses tangentes. Déplace le point avec le curseur.',
  params:[{id:'t',l:'t',min:0,max:90,step:5,v:35,u:'°'}],
  draw:v=>{ const t=rad(v.t), P=plane({x:[-1.3,1.3],y:[-1.3,1.3],w:300,step:.5,lab:1}); P.curve(s=>Math.cos(s)**3,s=>Math.sin(s)**3,0,2*Math.PI,{n:400});
    P.seg(Math.cos(t),0,0,Math.sin(t),{c:'var(--spark)',w:2.5}).dot(Math.cos(t),0,{r:4,c:'var(--spark)',l:'A'}).dot(0,Math.sin(t),{r:4,c:'var(--spark)',l:'B'}).dot(Math.cos(t)**3,Math.sin(t)**3,{r:5,c:'var(--ink)'}); return P.svg(); },
  info:v=>{ const t=rad(v.t); return `A = (${fmt(Math.cos(t))} ; 0), B = (0 ; ${fmt(Math.sin(t))}) · AB = ${fmt(Math.hypot(Math.cos(t),Math.sin(t)))}`; },
  parts:[
   {q:'a) Combien l’astroïde a-t-elle de points singuliers sur [0 ; 2π[&nbsp;?',ans:4,hint:'Calcule γ′(<i>t</i>) et mets 3 sin <i>t</i> cos <i>t</i> en facteur.',why:'γ′(t) = (−3cos²t sin t ; 3sin²t cos t) = 3 sin t cos t (−cos t ; sin t). Il est nul ssi sin t cos t = 0 : t = 0, π/2, π, 3π/2. Ce sont les quatre pointes.'},
   {q:'b) Quelle est la pente de la tangente en <i>t</i> = π/3&nbsp;? Arrondis au centième.',lab:'pente ≈',ans:-Math.sqrt(3),tol:.006,hint:'La pente vaut <i>y</i>′/<i>x</i>′ ; simplifie avant de remplacer.',why:'y′/x′ = 3sin²t cos t/(−3cos²t sin t) = −tan t. En π/3 : −√3 ≈ −1,73.'},
   {q:'c) En <i>t</i> = π/3, la tangente coupe O<i>x</i> en A et O<i>y</i> en B. Calcule la longueur AB.',lab:'AB =',ans:1,tol:1e-6,hint:'La tangente passe par (cos³ <i>t</i> ; sin³ <i>t</i>) avec la direction (−cos <i>t</i> ; sin <i>t</i>). Cherche où <i>y</i> = 0, puis où <i>x</i> = 0.',why:'On trouve A = (cos t ; 0) et B = (0 ; sin t), donc AB = √(cos²t + sin²t) = 1. En π/3 : A = (0,5 ; 0), B = (0 ; 0,866).'},
   {q:'d) Que montre ce calcul, fait pour un <i>t</i> quelconque de ]0 ; π/2[&nbsp;?',opts:['Le segment AB rétrécit vers les pointes','Le segment AB garde la longueur 1 : c’est une échelle de longueur 1 qui glisse contre un mur, et l’astroïde est tangente à toutes ses positions','Le segment AB passe toujours par l’origine','Le segment AB est toujours parallèle à <i>y</i> = −<i>x</i>'],ans:1,hint:'Le calcul de c) ne dépend pas de la valeur π/3.',why:'Pour tout t, A = (cos t ; 0) et B = (0 ; sin t) : AB = 1. L’astroïde est l’enveloppe des positions d’une échelle de longueur 1 qui glisse entre le sol et le mur.'},
  ],
  sol:'γ′(t) = 3 sin t cos t (−cos t ; sin t). Il s’annule pour t = 0, π/2, π, 3π/2 : quatre points singuliers, les pointes.<br>Ailleurs, la tangente a la direction (−cos t ; sin t) et la pente −tan t (−√3 en π/3).<br>Tangente : (x ; y) = (cos³t − s cos t ; sin³t + s sin t). y = 0 pour s = −sin²t, d’où x = cos³t + sin²t cos t = cos t. x = 0 pour s = cos²t, d’où y = sin t.<br>Donc A = (cos t ; 0), B = (0 ; sin t), et AB = 1 pour tout t.<br>Interprétation : une échelle de longueur 1 qui glisse le long d’un mur touche toujours l’astroïde. La courbe est l’enveloppe de ces segments.'},
]},

{subj:'an1', sem:'pri', id:'an1-riemann', h:'Sommes de Riemann et théorème fondamental', p:'Encadrer une aire par des rectangles, définir l’intégrale, puis la relier à la dérivée.', steps:[
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
 {kind:'Problème',h:'Encadrer ln 2',
  p:'Sans calculatrice, on veut encadrer ln 2 = ∫₁² d<i>x</i>/<i>x</i>. La fonction f(x) = 1/<i>x</i> est <b>décroissante</b> sur [1 ; 2] : sur chaque morceau, son minimum est au bord droit et son maximum au bord gauche. On découpe [1 ; 2] en <i>n</i> morceaux égaux.',
  params:[{id:'n',l:'n',min:1,max:20,v:4}],
  draw:v=>{ const d=1/v.n, P=plane({x:[.8,2.2],y:[-.1,1.15],h:220,step:.25,lab:1});
    for(let k=0;k<v.n;k++){ const a=1+k*d; P.rect(a,0,d,1/a,{fill:'var(--spark)',fo:.3,c:'var(--spark)',w:1}).rect(a,0,d,1/(a+d),{fill:'var(--math)',fo:.5,c:'var(--math)',w:1}); }
    P.fn(x=>1/x,{from:.9,to:2.15}); return P.svg(); },
  info:v=>{ const d=1/v.n; let s=0,S=0; for(let k=0;k<v.n;k++){ s+=d/(1+(k+1)*d); S+=d/(1+k*d); } return `sₙ ≈ ${fmt(s,4)} ≤ ln 2 ≤ Sₙ ≈ ${fmt(S,4)}`; },
  parts:[
   {q:'a) Calcule la somme inférieure <i>s</i>₄, arrondie au millième.',lab:'s₄ ≈',ans:.25*(1/1.25+1/1.5+1/1.75+1/2),tol:6e-4,hint:'Δ<i>x</i> = 1/4. Prends les bords droits 1,25 ; 1,5 ; 1,75 ; 2.',why:'s₄ = (1/4)(4/5 + 2/3 + 4/7 + 1/2) ≈ (1/4) · 2,5381 ≈ 0,635.'},
   {q:'b) Calcule la somme supérieure <i>S</i>₄, arrondie au millième.',lab:'S₄ ≈',ans:.25*(1+1/1.25+1/1.5+1/1.75),tol:6e-4,hint:'Cette fois, les bords gauches 1 ; 1,25 ; 1,5 ; 1,75.',why:'S₄ = (1/4)(1 + 4/5 + 2/3 + 4/7) ≈ 0,760. Donc 0,634 &lt; ln 2 &lt; 0,760.'},
   {q:'c) L’écart <i>Sₙ</i> − <i>sₙ</i> vaut <i>c</i>/<i>n</i>. Que vaut <i>c</i>&nbsp;?',lab:'c =',ans:.5,tol:1e-9,hint:'Pour une fonction monotone, les rectangles se décalent d’un cran : seul le premier et le dernier comptent.',why:'Sₙ − sₙ = |f(1) − f(2)| · (2 − 1)/n = (1 − 1/2)/n = 0,5/n.'},
   {q:'d) Quel est le plus petit <i>n</i> qui garantit <i>Sₙ</i> − <i>sₙ</i> &lt; 0,01&nbsp;?',lab:'n =',ans:51,hint:'Résous 0,5/<i>n</i> &lt; 0,01. Attention au cas d’égalité.',why:'0,5/n &lt; 0,01 ⇔ n &gt; 50. Pour n = 50 l’écart vaut exactement 0,01 : il faut n = 51.'},
  ],
  sol:'f(x) = 1/x décroît sur [1 ; 2] : la somme inférieure utilise les bords droits, la supérieure les bords gauches.<br>Avec n = 4 : s₄ = (1/4)(4/5 + 2/3 + 4/7 + 1/2) ≈ 0,6345 et S₄ = (1/4)(1 + 4/5 + 2/3 + 4/7) ≈ 0,7595.<br>Donc 0,634 &lt; ln 2 &lt; 0,760 (en fait ln 2 ≈ 0,6931).<br>En général, Sₙ − sₙ = (f(1) − f(2))/n = 1/(2n), qui tend vers 0 : f est intégrable.<br>Pour garantir un écart &lt; 0,01, il faut 1/(2n) &lt; 0,01, soit n ≥ 51.'},
 {kind:'Problème',h:'Le volume d’une citerne',
  p:'Une citerne reçoit de l’eau avec un débit <b>d(t) = 6<i>t</i> − <i>t</i>²</b> (en L/min), où <i>t</i> est en minutes, pour <i>t</i> ∈ [0 ; 10]. Quand d(t) &lt; 0, la citerne se vide. Le volume ajouté depuis <i>t</i> = 0 vaut V(x) = ∫₀ˣ d(t) d<i>t</i>. On utilise le théorème fondamental pour étudier V.',
  params:[{id:'x',l:'x',min:0,max:10,step:.5,v:2,u:' min'}],
  draw:v=>{ const d=t=>6*t-t*t, P=plane({x:[-.5,10.5],y:[-17,40],w:320,h:260,grid:false,lx:2,ly:10});
    P.area(d,0,Math.min(v.x,6)); if(v.x>6) P.area(d,6,v.x,{fill:'var(--bad)'});
    P.fn(d,{from:0,to:10}).fn(t=>3*t*t-t**3/3,{from:0,to:10,c:'var(--spark)',w:2.5}).dot(v.x,3*v.x*v.x-v.x**3/3,{r:5,c:'var(--spark)',l:'V(x)'}); return P.svg(); },
  info:v=>`d(${fmt(v.x)}) = ${fmt(6*v.x-v.x*v.x)} L/min · V(${fmt(v.x)}) = ${fmt(3*v.x*v.x-v.x**3/3)} L`,
  parts:[
   {q:'a) À quel instant le volume ajouté V est-il maximal, et pourquoi&nbsp;?',opts:['En <i>t</i> = 3, car le débit y est maximal','En <i>t</i> = 6, car V′ = d passe de positif à négatif','En <i>t</i> = 10, car c’est la fin de l’intervalle','En <i>t</i> = 0, car V(0) = 0'],ans:1,hint:'Par le théorème fondamental, V′ = d. Étudie le signe de d.',why:'V′(t) = d(t) = t(6 − t) est positif sur ]0 ; 6[ et négatif sur ]6 ; 10]. V croît puis décroît : maximum en t = 6. En t = 3, c’est V′ qui est maximal, pas V.'},
   {q:'b) Que vaut ce volume maximal V(6)&nbsp;?',lab:'V(6) =',unit:'L',ans:36,hint:'Une primitive de 6<i>t</i> − <i>t</i>² est 3<i>t</i>² − <i>t</i>³/3.',why:'V(6) = 3 · 36 − 216/3 = 108 − 72 = 36 L.'},
   {q:'c) À quel instant la citerne retrouve-t-elle son volume de départ&nbsp;?',lab:'t =',unit:'min',ans:9,hint:'Résous V(<i>x</i>) = 0 avec <i>x</i> &gt; 0 et factorise <i>x</i>².',why:'V(x) = 3x² − x³/3 = x²(3 − x/3) = 0 ⇔ x = 9 min. Les 36 L entrés ont été vidés entre 6 et 9 minutes.'},
   {q:'d) Quel est le débit moyen sur [0 ; 6]&nbsp;?',lab:'d̄ =',unit:'L/min',ans:6,hint:'La moyenne d’une fonction sur [<i>a</i> ; <i>b</i>] vaut (1/(<i>b</i> − <i>a</i>)) ∫ₐᵇ.',why:'36 L en 6 minutes : 36/6 = 6 L/min, alors que le débit maximal (en t = 3) vaut 9 L/min.'},
  ],
  sol:'Par le théorème fondamental, V est dérivable et V′ = d, puisque d est continue.<br>d(t) = t(6 − t) &gt; 0 sur ]0 ; 6[ et &lt; 0 sur ]6 ; 10] : V croît sur [0 ; 6], décroît ensuite. Maximum en t = 6.<br>Avec la primitive 3t² − t³/3 : V(6) = 108 − 72 = 36 L.<br>V(x) = x²(3 − x/3) s’annule en x = 9 : à 9 min, la citerne a retrouvé son niveau initial. À 10 min, V(10) = 300 − 1000/3 ≈ −33,3 L, elle est sous son niveau de départ.<br>Débit moyen sur [0 ; 6] : V(6)/6 = 6 L/min.'},
]},

{subj:'an1', sem:'pri', id:'an1-primitives', h:'Recherche de primitives', p:'Les primitives à connaître, puis les deux grandes techniques : substitution et intégration par parties.', steps:[
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
 {kind:'Problème',h:'L’exposition à un médicament',
  p:'Après une prise de médicament, la concentration dans le sang vaut <b>c(t) = <i>t</i> e<sup>−<i>t</i></sup></b> (en mg/L), où <i>t</i> est en heures. L’« aire sous la courbe » ∫₀² c(t) d<i>t</i> mesure l’exposition au médicament pendant les deux premières heures. On la calcule par parties.',
  fig:(()=>{ const P=plane({x:[-.3,5],y:[-.05,.45],h:180,grid:false,lx:1,ly:.1}); P.area(t=>t*Math.exp(-t),0,2).fn(t=>t*Math.exp(-t),{from:0,to:5}).dot(1,Math.exp(-1),{r:4,c:'var(--ink)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est une primitive de <i>t</i> e<sup>−<i>t</i></sup>&nbsp;?',opts:['(<i>t</i> − 1) e<sup>−<i>t</i></sup>','(1 − <i>t</i>) e<sup>−<i>t</i></sup>','−(<i>t</i> + 1) e<sup>−<i>t</i></sup>','−<i>t</i> e<sup>−<i>t</i></sup>'],ans:2,hint:'Par parties avec <i>u</i> = <i>t</i> et <i>v</i>′ = e<sup>−<i>t</i></sup>, donc <i>v</i> = −e<sup>−<i>t</i></sup>. Vérifie en dérivant.',why:'∫ t e<sup>−t</sup> dt = −t e<sup>−t</sup> + ∫ e<sup>−t</sup> dt = −t e<sup>−t</sup> − e<sup>−t</sup> = −(t + 1) e<sup>−t</sup>. (1 − t) e<sup>−t</sup> est la dérivée de c, pas sa primitive.'},
   {q:'b) Calcule ∫₀² c(t) d<i>t</i>, arrondi au millième.',lab:'≈',unit:'mg·h/L',ans:1-3*Math.exp(-2),tol:6e-4,hint:'Évalue −(<i>t</i> + 1) e<sup>−<i>t</i></sup> en 2 et en 0.',why:'[−(t + 1)e<sup>−t</sup>]₀² = −3e<sup>−2</sup> + 1 ≈ 0,594.'},
   {q:'c) À quel instant la concentration est-elle maximale&nbsp;?',lab:'t =',unit:'h',ans:1,hint:'Annule c′(t) = (1 − <i>t</i>) e<sup>−<i>t</i></sup>.',why:'c′(t) = (1 − t)e<sup>−t</sup> est positive avant 1 et négative après : maximum en t = 1 h, c(1) = 1/e ≈ 0,37 mg/L.'},
   {q:'d) Quelle est la concentration moyenne sur les deux premières heures&nbsp;? Arrondis au millième.',lab:'c̄ ≈',unit:'mg/L',ans:(1-3*Math.exp(-2))/2,tol:6e-4,hint:'Moyenne = intégrale divisée par la durée.',why:'(1 − 3e<sup>−2</sup>)/2 ≈ 0,297 mg/L.'},
  ],
  sol:'Par parties, avec u = t et v′ = e<sup>−t</sup> (u′ = 1, v = −e<sup>−t</sup>) : ∫ t e<sup>−t</sup> dt = −t e<sup>−t</sup> + ∫ e<sup>−t</sup> dt = −(t + 1) e<sup>−t</sup> + C.<br>On vérifie : (−(t + 1)e<sup>−t</sup>)′ = −e<sup>−t</sup> + (t + 1)e<sup>−t</sup> = t e<sup>−t</sup>.<br>∫₀² t e<sup>−t</sup> dt = [−(t + 1)e<sup>−t</sup>]₀² = 1 − 3e<sup>−2</sup> ≈ 0,594 mg·h/L.<br>c′(t) = (1 − t)e<sup>−t</sup> : la concentration culmine en t = 1 h à 1/e ≈ 0,368 mg/L.<br>La moyenne sur [0 ; 2] vaut (1 − 3e<sup>−2</sup>)/2 ≈ 0,297 mg/L.'},
 {kind:'Problème',h:'Une oscillation amortie',
  p:'Le déplacement d’un ressort amorti vaut e<sup>−<i>x</i></sup> sin <i>x</i>. On veut l’aire de la première bosse, <b>I = ∫₀<sup>π</sup> e<sup>−<i>x</i></sup> sin <i>x</i> d<i>x</i></b>. Une seule intégration par parties ne suffit pas : il en faut deux, et l’intégrale cherchée réapparaît. On compare ensuite avec la deuxième bosse.',
  fig:(()=>{ const f=x=>Math.exp(-x)*Math.sin(x), P=plane({x:[-.3,6.6],y:[-.1,.4],h:160,grid:false,lx:1,ly:.1}); P.area(f,0,Math.PI).area(f,Math.PI,2*Math.PI,{fill:'var(--bad)'}).fn(f,{from:0,to:6.5}); return P.svg(); })(),
  parts:[
   {q:'a) Une première intégration par parties, avec <i>u</i> = sin <i>x</i> et <i>v</i>′ = e<sup>−<i>x</i></sup>, donne ∫ e<sup>−<i>x</i></sup> sin <i>x</i> d<i>x</i> = …',opts:['−e<sup>−<i>x</i></sup> sin <i>x</i> + ∫ e<sup>−<i>x</i></sup> cos <i>x</i> d<i>x</i>','e<sup>−<i>x</i></sup> sin <i>x</i> − ∫ e<sup>−<i>x</i></sup> cos <i>x</i> d<i>x</i>','−e<sup>−<i>x</i></sup> cos <i>x</i> − ∫ e<sup>−<i>x</i></sup> sin <i>x</i> d<i>x</i>','−e<sup>−<i>x</i></sup> sin <i>x</i> − ∫ e<sup>−<i>x</i></sup> cos <i>x</i> d<i>x</i>'],ans:0,hint:'<i>v</i> = −e<sup>−<i>x</i></sup>, <i>u</i>′ = cos <i>x</i>. Attention aux deux signes moins.',why:'uv − ∫ u′v = −e<sup>−x</sup> sin x − ∫ cos x · (−e<sup>−x</sup>) dx = −e<sup>−x</sup> sin x + ∫ e<sup>−x</sup> cos x dx.'},
   {q:'b) Une seconde intégration par parties donne I = [−e<sup>−<i>x</i></sup>(sin <i>x</i> + cos <i>x</i>)]₀<sup>π</sup> − I. Que fait-on&nbsp;?',opts:['On a tourné en rond : il faut une autre méthode','On en déduit I = 0','On passe I à gauche : 2I = [−e<sup>−<i>x</i></sup>(sin <i>x</i> + cos <i>x</i>)]₀<sup>π</sup>','On recommence une troisième fois'],ans:2,hint:'I est un nombre inconnu qui apparaît des deux côtés d’une égalité.',why:'C’est une équation en I : 2I = [−e<sup>−x</sup>(sin x + cos x)]₀<sup>π</sup> = e<sup>−π</sup> + 1.'},
   {q:'c) Que vaut I&nbsp;? Arrondis au millième.',lab:'I ≈',ans:(1+Math.exp(-Math.PI))/2,tol:6e-4,hint:'En π : sin π + cos π = −1. En 0 : sin 0 + cos 0 = 1.',why:'2I = e<sup>−π</sup> · 1 − (−1) = 1 + e<sup>−π</sup>, donc I = (1 + e<sup>−π</sup>)/2 ≈ 0,522.'},
   {q:'d) La deuxième bosse, sur [π ; 2π], est sous l’axe. Que vaut le rapport |∫<sub>π</sub><sup>2π</sup> e<sup>−<i>x</i></sup> sin <i>x</i> d<i>x</i>| / I&nbsp;? Arrondis au millième.',lab:'rapport ≈',ans:Math.exp(-Math.PI),tol:6e-4,hint:'Utilise la primitive F(x) = −e<sup>−<i>x</i></sup>(sin <i>x</i> + cos <i>x</i>)/2 entre π et 2π.',why:'∫<sub>π</sub><sup>2π</sup> = F(2π) − F(π) = −(e<sup>−2π</sup> + e<sup>−π</sup>)/2 = −e<sup>−π</sup>(1 + e<sup>−π</sup>)/2 = −e<sup>−π</sup> I. Le rapport vaut e<sup>−π</sup> ≈ 0,043.'},
  ],
  sol:'1re IPP (u = sin x, v′ = e<sup>−x</sup>) : ∫ e<sup>−x</sup> sin x dx = −e<sup>−x</sup> sin x + ∫ e<sup>−x</sup> cos x dx.<br>2e IPP (u = cos x, v′ = e<sup>−x</sup>) : ∫ e<sup>−x</sup> cos x dx = −e<sup>−x</sup> cos x − ∫ e<sup>−x</sup> sin x dx.<br>En reportant : ∫ e<sup>−x</sup> sin x dx = −e<sup>−x</sup>(sin x + cos x) − ∫ e<sup>−x</sup> sin x dx, d’où la primitive F(x) = −e<sup>−x</sup>(sin x + cos x)/2.<br>I = F(π) − F(0) = e<sup>−π</sup>/2 + 1/2 = (1 + e<sup>−π</sup>)/2 ≈ 0,522.<br>Sur [π ; 2π] : F(2π) − F(π) = −e<sup>−π</sup>(1 + e<sup>−π</sup>)/2 = −e<sup>−π</sup> I.<br>Chaque bosse est e<sup>−π</sup> ≈ 0,043 fois la précédente, au signe près : l’amortissement est très rapide.'},
]},

{subj:'an1', sem:'pri', id:'an1-applications', h:'Applications de l’intégrale', p:'Aires entre courbes, volumes de révolution, longueurs d’arc et aires de surfaces de révolution.', steps:[
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
  why:'f′(x) = √x, donc √(1 + f′²) = √(1 + x). L = [(2/3)(1 + x)<sup>3/2</sup>]₀³ = (2/3)(8 − 1) = 14/3 ≈ 4,667.'},
 {kind:'Théorie',h:'Aire d’une surface de révolution',p:'Chaque petit bout d’arc de longueur √(1 + f′²) dx, en tournant, balaie une bande de rayon f(x). L’aire latérale vaut <b>S = 2π ∫ₐᵇ f(x) √(1 + f′(x)²) dx</b>.',
  note:'Pour la sphère, f(x)√(1 + f′(x)²) = R tout le long : S = 2π · R · 2R = 4πR².'},
 {kind:'Défi',h:'L’aire d’un cône',p:'On fait tourner le segment <i>y</i> = <i>x</i>, <i>x</i> ∈ [0 ; 1], autour de O<i>x</i>. Calcule l’aire de la surface obtenue, arrondie au centième.',ans:Math.SQRT2*Math.PI,tol:.006,
  why:'f′ = 1 : S = 2π ∫₀¹ x√2 dx = 2π√2 · 1/2 = π√2 ≈ 4,44. C’est bien πrℓ avec r = 1 et ℓ = √2.'},
 {kind:'Problème',h:'La contenance d’un seau',
  p:'Un seau a la forme d’un tronc de cône : rayon 10 cm au fond, 15 cm en haut, hauteur 30 cm. On le voit comme le solide obtenu en faisant tourner autour de l’axe O<i>x</i> le segment <i>y</i> = r(<i>x</i>), <i>x</i> ∈ [0 ; 30], où <i>x</i> est la hauteur mesurée depuis le fond (en cm).',
  fig:(()=>{ const P=plane({x:[-3,34],y:[-17,17],w:300,grid:false,lx:10,ly:5}); P.poly([[0,10],[30,15],[30,-15],[0,-10]],{fill:'var(--sci)',fo:.15,c:'var(--muted)',w:1.2,dash:true});
    P.seg(0,10,30,15,{c:'var(--accent)',w:3}).seg(13,-(10+13/6),13,10+13/6,{c:'var(--spark)',w:2}).text(13,12.5,'eau',{a:'middle',dy:-10,c:'var(--spark)'}).text(20,13.5,'y = r(x)',{dy:-10,c:'var(--accent)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la fonction r&nbsp;?',opts:['r(<i>x</i>) = 10 + <i>x</i>/2','r(<i>x</i>) = 15 − <i>x</i>/6','r(<i>x</i>) = 10 + 5<i>x</i>','r(<i>x</i>) = 10 + <i>x</i>/6'],ans:3,hint:'r est affine, avec r(0) = 10 et r(30) = 15.',why:'La pente vaut (15 − 10)/30 = 1/6, donc r(x) = 10 + x/6.'},
   {q:'b) Quelle est la contenance du seau, en litres&nbsp;? Arrondis au centième.',lab:'V ≈',unit:'L',ans:4.75*Math.PI,tol:.006,hint:'V = π ∫₀³⁰ (10 + <i>x</i>/6)² d<i>x</i>. Une primitive de (10 + <i>x</i>/6)² est 2(10 + <i>x</i>/6)³. Et 1 L = 1000 cm³.',why:'V = 2π(15³ − 10³) = 2π · 2375 = 4750π ≈ 14 923 cm³ ≈ 14,92 L.'},
   {q:'c) Tu verses 5 L d’eau. Jusqu’à quelle hauteur monte-t-elle&nbsp;? Arrondis au dixième.',lab:'h ≈',unit:'cm',ans:6*(Math.cbrt(1000+2500/Math.PI)-10),tol:.06,hint:'Résous π ∫₀ʰ r(<i>x</i>)² d<i>x</i> = 5000, soit 2π((10 + <i>h</i>/6)³ − 1000) = 5000.',why:'(10 + h/6)³ = 1000 + 2500/π ≈ 1795,8, donc 10 + h/6 ≈ 12,155 et h ≈ 12,9 cm.'},
  ],
  sol:'r est affine : r(x) = 10 + x/6. Chaque tranche à la hauteur x est un disque d’aire π r(x)².<br>V = π ∫₀³⁰ (10 + x/6)² dx = π [2(10 + x/6)³]₀³⁰ = 2π(3375 − 1000) = 4750π ≈ 14 923 cm³, soit 14,92 L.<br>(Contrôle avec la formule du tronc de cône πh(R² + Rr + r²)/3 = 10π(225 + 150 + 100) = 4750π.)<br>Pour 5 L : 2π((10 + h/6)³ − 1000) = 5000 ⇔ (10 + h/6)³ = 1000 + 2500/π ≈ 1795,8 ⇔ h ≈ 12,9 cm.<br>Le tiers du volume occupe moins de la moitié de la hauteur, car le seau s’élargit vers le haut.'},
 {kind:'Problème',h:'Le caillou dans le pneu',
  p:'Un petit caillou est coincé dans le pneu d’une roue de rayon <i>R</i>. Quand la roue roule sans glisser, il décrit une cycloïde : <b>γ(<i>t</i>) = (<i>R</i>(<i>t</i> − sin <i>t</i>) ; <i>R</i>(1 − cos <i>t</i>))</b>. Pendant un tour de roue (<i>t</i> de 0 à 2π), le vélo avance de 2π<i>R</i>. On veut la distance réellement parcourue par le caillou.',
  fig:(()=>{ const P=plane({x:[-.5,6.8],y:[-.3,2.4],w:320,grid:false,lx:1,ly:1}); P.curve(t=>t-Math.sin(t),t=>1-Math.cos(t),0,2*Math.PI,{c:'var(--accent)',w:2.5});
    const t=2; P.circ(t,1,1,{c:'var(--muted)',w:1.2}).seg(-.5,0,6.8,0,{c:'var(--muted)',w:1.5}).dot(t-Math.sin(t),1-Math.cos(t),{r:5,c:'var(--ink)'}); return P.svg(); })(),
  parts:[
   {q:'a) Que vaut |γ′(<i>t</i>)|²&nbsp;?',opts:['<i>R</i>²(1 − cos <i>t</i>)²','2<i>R</i>²','<i>R</i>²(2 − 2 cos <i>t</i>) = 4<i>R</i>² sin²(<i>t</i>/2)','<i>R</i>²(2 + 2 cos <i>t</i>)'],ans:2,hint:'γ′(<i>t</i>) = (<i>R</i>(1 − cos <i>t</i>) ; <i>R</i> sin <i>t</i>). Développe, puis utilise 1 − cos <i>t</i> = 2 sin²(<i>t</i>/2).',why:'R²((1 − cos t)² + sin²t) = R²(1 − 2cos t + cos²t + sin²t) = R²(2 − 2cos t) = 4R² sin²(t/2).'},
   {q:'b) Pour <i>R</i> = 1, quelle est la longueur d’une arche (<i>t</i> de 0 à 2π)&nbsp;?',lab:'L =',ans:8,tol:1e-6,hint:'Sur [0 ; 2π], sin(<i>t</i>/2) ≥ 0, donc |γ′(<i>t</i>)| = 2 sin(<i>t</i>/2).',why:'L = ∫₀<sup>2π</sup> 2 sin(t/2) dt = [−4 cos(t/2)]₀<sup>2π</sup> = 4 + 4 = 8.'},
   {q:'c) Pour une roue de rayon <i>R</i> = 0,35 m, quelle distance le caillou parcourt-il pendant un tour&nbsp;?',lab:'L =',unit:'m',ans:2.8,tol:1e-6,hint:'Toutes les longueurs sont multipliées par <i>R</i>.',why:'L = 8R = 8 · 0,35 = 2,8 m.'},
   {q:'d) Quel est le rapport entre cette distance et l’avancée du vélo&nbsp;? Arrondis au centième.',lab:'rapport ≈',ans:4/Math.PI,tol:.006,hint:'Le vélo avance de 2π<i>R</i>.',why:'8R/(2πR) = 4/π ≈ 1,27. Le caillou parcourt 27 % de chemin en plus, quel que soit le rayon.'},
  ],
  sol:'γ′(t) = R(1 − cos t ; sin t), donc |γ′(t)|² = R²(2 − 2cos t) = 4R² sin²(t/2).<br>Sur [0 ; 2π], t/2 ∈ [0 ; π] et sin(t/2) ≥ 0 : |γ′(t)| = 2R sin(t/2), sans valeur absolue.<br>L = ∫₀<sup>2π</sup> 2R sin(t/2) dt = 2R [−2 cos(t/2)]₀<sup>2π</sup> = 2R(2 + 2) = 8R.<br>Pour R = 0,35 m : L = 2,8 m, contre 2πR ≈ 2,20 m pour le vélo.<br>Le rapport 8/(2π) = 4/π ≈ 1,27 ne dépend pas de R. En t = 0 et t = 2π, la vitesse du caillou est nulle : il touche le sol sans glisser, c’est un point de rebroussement.'},
]},
);
})();
