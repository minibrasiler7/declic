/* Déclic — parcours de mathématiques : Université (format : voir cours/maths.js) */
MATHS.push(
{id:'complexes',br:'alg',lv:'uni',h:'Nombres complexes',p:'Le plan complexe, rotations et racines de l’unité.',
 lessons:['Le plan complexe','Forme exponentielle','Racines de l’unité','Polynômes et théorème fondamental'],
 steps:[
  {h:'Un nombre, un point',p:`<p>Les nombres réels vivent sur une droite. Pour résoudre <i>x</i>² = −1, on ajoute un nombre <i>i</i> tel que <i>i</i>² = −1 ; les nouveaux nombres <i>a</i> + <i>bi</i> ont alors besoin de deux dimensions : ils vivent dans un plan.</p>
<div class="def"><p>Le nombre complexe <i>z = a + bi</i>, avec <i>a</i> et <i>b</i> réels, est représenté par le point (<i>a</i> ; <i>b</i>). <i>a</i> est sa <b>partie réelle</b> Re <i>z</i>, <i>b</i> sa <b>partie imaginaire</b> Im <i>z</i>. Le <b>module</b> |<i>z</i>| = √(<i>a</i>² + <i>b</i>²) est la distance de 0 à <i>z</i> ; l’<b>argument</b> arg <i>z</i> est l’angle entre l’axe réel et la flèche qui va de 0 à <i>z</i>.</p></div>
<div class="ex"><p>Pour <i>z</i> = 3 + 2<i>i</i> (position de départ) : |<i>z</i>| = √(9 + 4) = √13 ≈ 3,61 et arg <i>z</i> ≈ 33,7°. Les réels sont les points de l’axe horizontal (<i>b</i> = 0), les imaginaires purs ceux de l’axe vertical (<i>a</i> = 0).</p></div>`,
   params:[{id:'a',l:'Partie réelle a',min:-4,max:4,step:.5,v:3},{id:'b',l:'Partie imaginaire b',min:-4,max:4,step:.5,v:2}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,v.a,v.b).seg(v.a,0,v.a,v.b,{c:'var(--muted)',w:1.5,dash:true}).dot(v.a,v.b,{l:'z'}).text(4.9,0,'Re',{a:'end',dy:-6,c:'var(--muted)'}).text(0,4.8,'Im',{dx:6,dy:8,c:'var(--muted)'}); return P.svg(); },
   info:v=>`|z| = ${fmt(Math.hypot(v.a,v.b))} · arg z ≈ ${fmt(Math.atan2(v.b,v.a)*180/Math.PI,1)}°`},
  {h:'Multiplier par i, c’est tourner',p:`<p>Le nombre <i>i</i> semble mystérieux tant qu’on le voit comme un calcul. Regarde plutôt ce que la multiplication par <i>i</i> fait à un point du plan.</p>
<div class="prop"><p><i>i</i>(<i>a</i> + <i>bi</i>) = <i>ai</i> + <i>bi</i>² = −<i>b</i> + <i>ai</i>. Le point (<i>a</i> ; <i>b</i>) va en (−<i>b</i> ; <i>a</i>) : c’est le point tourné de <b>90° autour de 0</b>, dans le sens trigonométrique.</p></div>
<div class="idea"><p>C’est la lecture géométrique de <i>i</i>² = −1 : tourner deux fois d’un quart de tour fait un demi-tour, qui change <i>z</i> en −<i>z</i>. Le module ne change pas, seul l’argument augmente de 90°.</p></div>
<div class="ex"><p>Pour <i>z</i> = 3 + <i>i</i> (position de départ) : <i>iz</i> = −1 + 3<i>i</i> et <i>i</i>²<i>z</i> = −3 − <i>i</i>. Les trois points sont à la même distance √10 de 0.</p></div>`,
   params:[{id:'a',l:'a',min:-4,max:4,step:.5,v:3},{id:'b',l:'b',min:-4,max:4,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,v.a,v.b).arrow(0,0,-v.b,v.a,{c:'var(--spark)'}).arrow(0,0,-v.a,-v.b,{c:'var(--math)',dash:true,w:2}).dot(v.a,v.b,{l:'z',r:4}).dot(-v.b,v.a,{l:'iz',r:4}).dot(-v.a,-v.b,{l:'i²z = −z',r:4,c:'var(--math)'}); return P.svg(); }},
  {kind:'Méthode',h:'Calculer en forme algébrique',
   p:'On calcule avec a + bi comme avec un polynôme en i, en remplaçant <b>i² par −1</b>. Somme : on ajoute les parties réelles entre elles et les parties imaginaires entre elles. Produit : double distributivité. Le <b>conjugué</b> de z = a + bi est z̄ = a − bi, et <b>z·z̄ = a² + b² = |z|²</b>. Pour diviser, on multiplie le haut et le bas par le conjugué du dénominateur : celui-ci devient réel.',
   demo:{enonce:'Calculer (2 + 3i)(1 − i), puis (1 + 2i)/(1 − i), puis |3 + 4i|.',
    etapes:[
     {f:'(2 + 3i)(1 − i) = 2 − 2i + 3i − 3i²',w:'Double distributivité.'},
     {f:'= 2 + i + 3 = 5 + i',w:'−3i² = −3·(−1) = +3.'},
     {f:'(1 + 2i)/(1 − i) = (1 + 2i)(1 + i) / ((1 − i)(1 + i)) = (1 + 3i + 2i²)/2 = (−1 + 3i)/2',w:'On multiplie par le conjugué 1 + i : en bas, on obtient 1² + 1² = 2.'},
     {f:'|3 + 4i| = √(9 + 16) = 5',w:'Le module est la distance du point (3 ; 4) à l’origine.'}],
    conclusion:'(2 + 3i)(1 − i) = 5 + i, (1 + 2i)/(1 − i) = −½ + (3/2)i et |3 + 4i| = 5.'}},
  {h:'Un produit',p:'Quelle est la partie réelle de <i>(3 + i)(2 − i)</i>&nbsp;?',lab:'Re =',ans:7,why:'6 − 3i + 2i − i² = 6 − i + 1 = 7 − i. La partie réelle vaut 7.'},
  {h:'Calcule',p:'<i>(1 + i)² = ?</i>',opts:['2i','2','0','1 + 2i'],ans:0,why:'(1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i.'},
  {kind:'Méthode',h:'Forme exponentielle et racines n-ièmes',
   p:'Tout z ≠ 0 s’écrit <b>z = r·e^{iθ}</b>, avec r = |z| et θ = arg z : c’est le point à distance r de 0, sous l’angle θ. Sous cette forme, multiplier revient à <b>multiplier les modules et ajouter les arguments</b>, et (re^{iθ})ⁿ = rⁿe^{inθ}. Pour résoudre <b>zⁿ = Re^{iφ}</b> : r = R^{1/n} et <b>θ = φ/n + k·360°/n</b>, pour k = 0, 1, …, n − 1. Les n racines forment un polygone régulier centré en 0.',
   demo:{enonce:'Résoudre z² = 4i.',
    etapes:[
     {f:'4i = 4e^{i·90°}',w:'4i est le point (0 ; 4) : module 4, argument 90°.'},
     {f:'r² = 4, donc r = 2',w:'Le module de z² est r².'},
     {f:'2θ = 90° + k·360°, donc θ = 45° ou θ = 225°',w:'Les arguments sont multipliés par 2, à un tour près : on divise par 2 et on garde deux angles.'},
     {f:'z = 2e^{i·45°} = √2 + i√2 ou z = 2e^{i·225°} = −√2 − i√2',w:'cos 45° = sin 45° = √2/2. Contrôle : (√2 + i√2)² = 2 + 4i − 2 = 4i ✓'}],
    conclusion:'Les deux racines carrées de 4i sont √2 + i√2 et −√2 − i√2, opposées sur le cercle de rayon 2.'}},
  {kind:'Défi',h:'Racine cubique de l’unité',p:'Place le point <i>e^{iθ}</i> sur le cercle pour que <i>z³ = 1</i>, avec <i>z ≠ 1</i>.',
   params:[{id:'t',l:'θ',min:0,max:345,step:15,v:30,u:'°'}],
   draw:v=>{ const P=plane({x:[-1.5,1.5],y:[-1.5,1.5],step:.5,lab:1}); P.circ(0,0,1,{c:'var(--ink)',w:2});
     [1,2,3].forEach(k=>{ const a=rad(v.t*k); P.dot(Math.cos(a),Math.sin(a),{r:k===1?7:5,c:k===1?'var(--accent)':'var(--spark)',l:k===1?'z':k===2?'z²':'z³'}); }); P.dot(1,0,{r:4,c:'var(--ink)'}); return P.svg(); },
   ok:v=>v.t===120||v.t===240,why:'z³ = e^{3iθ} vaut 1 quand 3θ est un multiple de 360° : θ = 120° ou 240°. Avec 1, ces trois racines forment un triangle équilatéral.'},
  {kind:'Méthode',h:'Tourner un point avec i',
   p:'Multiplier par i fait tourner de 90° autour de 0. Pour tourner un point B de 90° autour d’un autre point A, dans le sens trigonométrique : on ramène A en 0 en calculant <b>B − A</b>, on multiplie par i, puis on revient en A : <b>B′ = A + i(B − A)</b>. Le nombre B − A représente le vecteur de A vers B, et sa longueur vaut |B − A|.',
   demo:{enonce:'A = 2 + i et B = 5 + 2i. Trouver l’image B′ de B par la rotation de 90° de centre A.',
    etapes:[
     {f:'B − A = 3 + i',w:'C’est le vecteur de A vers B.'},
     {f:'i(3 + i) = 3i + i² = −1 + 3i',w:'On tourne ce vecteur de 90°.'},
     {f:'B′ = A + (−1 + 3i) = 1 + 4i',w:'On replace le vecteur tourné au point A.'},
     {f:'Contrôle : |B′ − A| = |−1 + 3i| = √10 = |B − A|',w:'Une rotation conserve les longueurs.'}],
    conclusion:'B′ = 1 + 4i. A, B et B′ sont trois sommets d’un carré de côté √10, donc d’aire 10.'},
   note:'Le même vecteur tourné, placé en B, donne le sommet suivant : B + i(B − A). Ici, 5 + 2i − 1 + 3i = 4 + 5i est le 4e sommet du carré.'},
  {kind:'Méthode',h:'Racines d’un polynôme : somme et produit',
   p:'Un polynôme unitaire de degré n se factorise en (z − z₁)(z − z₂)…(z − zₙ). En développant, on lit les coefficients : pour z² + bz + c, <b>z₁ + z₂ = −b</b> et <b>z₁z₂ = c</b>. Plus généralement, la somme des racines de zⁿ + aₙ₋₁zⁿ⁻¹ + … vaut <b>−aₙ₋₁</b>. Une équation du 2e degré à Δ < 0 a deux racines complexes conjuguées : <b>z = (−b ± i√(−Δ)) / (2a)</b>.',
   demo:{enonce:'Résoudre z² − 4z + 13 = 0, puis vérifier la somme et le produit des racines.',
    etapes:[
     {f:'Δ = 16 − 52 = −36 < 0',w:'Pas de racine réelle, mais deux racines complexes.'},
     {f:'√(−Δ) = 6, donc z = (4 ± 6i)/2 = 2 ± 3i',w:'On remplace √Δ par i√(−Δ).'},
     {f:'Somme : (2 + 3i) + (2 − 3i) = 4 = −(−4) ✓',w:'Les parties imaginaires s’annulent.'},
     {f:'Produit : (2 + 3i)(2 − 3i) = 4 + 9 = 13 ✓',w:'z·z̄ = a² + b².'}],
    conclusion:'Les racines sont 2 + 3i et 2 − 3i, de somme 4 et de produit 13.'}},
  {h:'Racines complexes',p:'Résous <i>z² + 2z + 5 = 0</i>. Quelle est la partie imaginaire positive d’une racine&nbsp;?',lab:'Im =',ans:2,why:'Δ = 4 − 20 = −16, donc z = (−2 ± 4i)/2 = −1 ± 2i.'},
  {kind:'Problème',h:'Construire un carré',
   p:'Dans le plan complexe, A = 1 + 2i et B = 4 + 3i sont deux sommets consécutifs d’un carré ABCD, parcouru dans le sens trigonométrique. Multiplier par i fait tourner de 90° : on s’en sert pour trouver C et D sans aucun dessin.',
   parts:[
    {q:'a) Combien vaut i(B − A) ?',opts:['3 + i','−1 + 3i','1 − 3i','−3 − i'],ans:1,hint:'B − A = 3 + i. Multiplie par i et utilise i² = −1.',why:'i(3 + i) = 3i + i² = −1 + 3i.'},
    {q:'b) C = B + i(B − A). Quelle est la partie imaginaire de C ?',lab:'Im(C) =',ans:6,hint:'Ajoute −1 + 3i à 4 + 3i.',why:'C = 4 + 3i − 1 + 3i = 3 + 6i.'},
    {q:'c) Quelle est l’aire du carré ?',ans:10,hint:'L’aire vaut |B − A|².',why:'|3 + i|² = 9 + 1 = 10.'},
   ],
   sol:'Le côté AB correspond à B − A = 3 + i. Tourner de 90° dans le sens trigonométrique, c’est multiplier par i : i(3 + i) = −1 + 3i.<br>D = A + i(B − A) = 1 + 2i − 1 + 3i = 5i et C = B + i(B − A) = 3 + 6i.<br>Aire : |B − A|² = 10.<br>Contrôle : le centre (A + C)/2 = 2 + 4i est aussi (B + D)/2.'},
  {kind:'Problème',h:'Les racines cubiques de 8i',
   p:'On résout <i>z³ = 8i</i> dans ℂ. On écrit 8i sous forme exponentielle, on en déduit les trois racines, puis on étudie leur somme, leur produit et le triangle qu’elles forment.',
   params:[{id:'k',l:'Racine k',min:0,max:2,v:0}],
   draw:v=>{ const P=plane({x:[-2.6,2.6],y:[-2.6,2.6],step:1,lab:1}); P.circ(0,0,2,{c:'var(--muted)',w:1.5}); const z=[30,150,270].map(t=>[2*Math.cos(rad(t)),2*Math.sin(rad(t))]); P.poly(z,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:2}); z.forEach((p,i)=>P.dot(p[0],p[1],{r:i===v.k?7:4,c:i===v.k?'var(--spark)':'var(--ink)'})); return P.svg(); },
   info:v=>`z<sub>${v.k}</sub> = 2·e<sup>i·${[30,150,270][v.k]}°</sup>`,
   parts:[
    {q:'a) Quel est le module commun des trois racines ?',ans:2,hint:'|z|³ = |8i| = 8.',why:'|z| = ∛8 = 2.'},
    {q:'b) Quel est le plus petit argument positif d’une racine ? (en degrés)',unit:'°',ans:30,hint:'8i = 8e^{i·90°}. Les arguments sont 90°/3 + k·120°.',why:'90° ÷ 3 = 30°. Les trois racines ont pour arguments 30°, 150° et 270°.'},
    {q:'c) Pourquoi la somme des trois racines est-elle nulle ?',opts:['Parce que 8i est imaginaire pur','Parce que z³ − 8i n’a pas de terme en z², et ce coefficient vaut −(z₀ + z₁ + z₂)','Parce que les racines sont toutes de module 2','Parce que l’une des racines vaut −2i'],ans:1,hint:'Développe (z − z₀)(z − z₁)(z − z₂).',why:'Le coefficient de z² vaut −(z₀ + z₁ + z₂). Il est nul dans z³ − 8i. On peut aussi dire que les racines forment un triangle équilatéral centré en 0.'},
    {q:'d) Quelle est l’aire du triangle formé par les trois racines ? (au centième)',ans:5.2,tol:.011,hint:'Un triangle équilatéral inscrit dans un cercle de rayon R a pour aire (3√3/4)·R².',why:'(3√3/4) · 4 = 3√3 ≈ 5,20.'},
   ],
   sol:'8i = 8e^{iπ/2}. Si z = re^{iθ}, alors r³ = 8 et 3θ = π/2 + 2kπ.<br>Donc r = 2 et θ = π/6 + 2kπ/3 : les racines sont 2e^{iπ/6} = √3 + i, 2e^{i5π/6} = −√3 + i et 2e^{i3π/2} = −2i.<br>Leur somme est nulle : (√3 + i) + (−√3 + i) + (−2i) = 0, comme le prévoit le coefficient de z².<br>Elles forment un triangle équilatéral inscrit dans le cercle de rayon 2 : aire 3√3 ≈ 5,20.'},
 ]},

{id:'alglin',br:'alg',lv:'uni',h:'Algèbre linéaire',p:'Vecteurs, combinaisons, matrices et déterminants.',
 lessons:['Combinaisons linéaires','Indépendance et bases','Matrices et systèmes','Le déterminant'],
 steps:[
  {h:'Combiner deux vecteurs',p:`<p>Avec deux flèches seulement, peut-on atteindre n’importe quel point du plan&nbsp;? C’est la question de départ de l’algèbre linéaire : fabriquer beaucoup d’objets à partir de quelques-uns, en les étirant et en les ajoutant.</p>
<div class="def"><p>Une <b>combinaison linéaire</b> de deux vecteurs <b>u</b> et <b>v</b> est un vecteur de la forme <i>α</i><b>u</b> + <i>β</i><b>v</b>, où les <b>coefficients</b> <i>α</i> (alpha) et <i>β</i> (bêta) sont des réels. On calcule composante par composante : <i>α</i>(<i>a</i> ; <i>b</i>) = (<i>αa</i> ; <i>αb</i>) et (<i>a</i> ; <i>b</i>) + (<i>c</i> ; <i>d</i>) = (<i>a</i> + <i>c</i> ; <i>b</i> + <i>d</i>).</p></div>
<div class="idea"><p>Sur la figure, la première flèche est <i>α</i><b>u</b>, la deuxième <i>β</i><b>v</b> mise bout à bout, et la flèche épaisse leur somme. Les curseurs déplacent l’extrémité sur une grille oblique dont les lignes suivent <b>u</b> et <b>v</b>. Comme les deux directions sont différentes, cette grille couvre tout le plan.</p></div>
<div class="ex"><p>Avec <b>u</b> = (2 ; 1) et <b>v</b> = (−1 ; 2) : 1·<b>u</b> + 1·<b>v</b> = (1 ; 3) et 2<b>u</b> − <b>v</b> = (4 − (−1) ; 2 − 2) = (5 ; 0). Vérifie ces deux points avec les curseurs.</p></div>`,
   params:[{id:'a',l:'α',min:-2,max:3,step:.5,v:1},{id:'b',l:'β',min:-2,max:3,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-5,6],y:[-4,7],lab:2}), ax=2*v.a, ay=v.a; P.arrow(0,0,ax,ay,{c:'var(--math)'}).arrow(ax,ay,ax-v.b,ay+2*v.b,{c:'var(--spark)'}).arrow(0,0,ax-v.b,ay+2*v.b,{w:4}); return P.svg(); },
   info:v=>`${fmt(v.a)}·u + ${fmt(v.b)}·v = (${fmt(2*v.a-v.b)} ; ${fmt(v.a+2*v.b)})`},
  {kind:'Méthode',h:'Écrire un vecteur comme combinaison',
   p:'Chercher α et β tels que αu + βv = w, c’est résoudre un <b>système</b> : une équation par composante. On le résout par substitution ou par combinaison. Dans ℝ³, on obtient trois équations pour deux inconnues : on en résout deux, et la troisième sert de <b>contrôle</b>. Si elle est fausse, w n’est pas une combinaison de u et v.',
   demo:{enonce:'u = (1 ; 1), v = (1 ; −1) et w = (5 ; 1). Trouver α et β tels que αu + βv = w.',
    etapes:[
     {f:'α(1 ; 1) + β(1 ; −1) = (α + β ; α − β)',w:'On calcule la combinaison composante par composante.'},
     {f:'α + β = 5 et α − β = 1',w:'On égale à w, composante par composante.'},
     {f:'En additionnant : 2α = 6, donc α = 3, puis β = 2',w:'Combinaison : les β s’éliminent.'},
     {f:'Contrôle : 3(1 ; 1) + 2(1 ; −1) = (5 ; 1) ✓',w:'On recalcule la combinaison.'}],
    conclusion:'w = 3u + 2v.'}},
  {h:'Atteins la cible',p:'Trouve α et β pour que <i>αu + βv</i> arrive sur le point (3 ; 4).',
   params:[{id:'a',l:'α',min:-2,max:3,step:.5,v:0},{id:'b',l:'β',min:-2,max:3,step:.5,v:0}],
   draw:v=>{ const P=plane({x:[-5,6],y:[-4,7],lab:2}), ax=2*v.a, ay=v.a; P.dot(3,4,{c:'var(--bad)',l:'(3 ; 4)'}).arrow(0,0,ax,ay,{c:'var(--math)'}).arrow(ax,ay,ax-v.b,ay+2*v.b,{c:'var(--spark)'}); return P.svg(); },
   ok:v=>v.a===2&&v.b===1,why:'On résout 2α − β = 3 et α + 2β = 4 : α = 2, β = 1.'},
  {h:'Tout ce qu’on peut atteindre',p:`<p>Quand <i>α</i> et <i>β</i> varient, la combinaison <i>α</i><b>u</b> + <i>β</i><b>v</b> décrit un ensemble de points. Selon les vecteurs choisis, c’est tout le plan, ou seulement une droite.</p>
<div class="def"><p>L’ensemble de toutes les combinaisons linéaires de <b>u</b> et <b>v</b> est le <b>sous-espace engendré</b> par <b>u</b> et <b>v</b>, noté <b>Vect(u, v)</b>. On dit que <b>u</b> et <b>v</b> <b>engendrent</b> ℝ² si Vect(<b>u</b>, <b>v</b>) = ℝ² : tout vecteur <b>w</b> s’écrit alors <i>α</i><b>u</b> + <i>β</i><b>v</b>.</p></div>
<div class="idea"><p>Vect(<b>u</b>, <b>v</b>) contient toujours 0 (avec <i>α</i> = <i>β</i> = 0), et la somme de deux combinaisons est encore une combinaison. Si <b>v</b> est un multiple de <b>u</b>, toutes les combinaisons restent sur la droite qui porte <b>u</b> : c’est le cas de la figure, où les flèches ne quittent jamais la droite pointillée.</p></div>
<div class="ex"><p><b>u</b> = (1 ; 2) et <b>v</b> = (2 ; 4) = 2<b>u</b>. Alors <i>α</i><b>u</b> + <i>β</i><b>v</b> = (<i>α</i> + 2<i>β</i>)<b>u</b> : on ne fabrique que des multiples de <b>u</b>. Le point (3 ; 6) = <b>u</b> + <b>v</b> est atteint, mais (1 ; 0) jamais, car (<i>t</i> ; 2<i>t</i>) = (1 ; 0) demanderait <i>t</i> = 1 et 2<i>t</i> = 0.</p></div>
<div class="warn"><p>Dans ℝ³, deux vecteurs non colinéaires engendrent seulement un plan passant par l’origine, pas tout l’espace : il faut un troisième vecteur hors de ce plan.</p></div>`,
   fig:(()=>{ const P=plane({x:[-2,4],y:[-2,7],h:260,lab:1}); P.fn(x=>2*x,{c:'var(--muted)',w:1.5,dash:true}).arrow(0,0,1,2,{c:'var(--math)'}).arrow(1,2,3,6,{c:'var(--spark)'}).text(0.5,1,'u',{dx:-16}).text(2,4,'v',{dx:-16}).dot(3,6,{r:4,l:'u + v',dx:-48}).dot(1,0,{c:'var(--bad)',r:5,l:'(1 ; 0)'}); return P.svg(); })()},
  {h:'Libre, liée, base',p:`<p>Écrire <b>w</b> = <i>α</i><b>u</b> + <i>β</i><b>v</b>, c’est bien ; savoir que cette écriture est <b>unique</b>, c’est mieux : les coefficients deviennent alors des coordonnées. L’unicité tient à une seule propriété.</p>
<div class="def"><p>Des vecteurs <b>v</b>₁, …, <b>v</b>ₖ sont <b>linéairement indépendants</b> (la famille est <b>libre</b>) si la seule combinaison nulle est la combinaison triviale : <i>α</i>₁<b>v</b>₁ + … + <i>α</i>ₖ<b>v</b>ₖ = 0 entraîne <i>α</i>₁ = … = <i>α</i>ₖ = 0. Sinon, la famille est <b>liée</b>. Une <b>base</b> de ℝⁿ est une famille libre qui engendre ℝⁿ.</p></div>
<div class="why"><p>L’indépendance donne l’unicité. Si <b>w</b> = <i>α</i><b>u</b> + <i>β</i><b>v</b> = <i>α</i>′<b>u</b> + <i>β</i>′<b>v</b>, on soustrait : (<i>α</i> − <i>α</i>′)<b>u</b> + (<i>β</i> − <i>β</i>′)<b>v</b> = 0. La famille étant libre, <i>α</i> = <i>α</i>′ et <i>β</i> = <i>β</i>′.</p></div>
<div class="ex"><p>Dans ℝ³, (1 ; 0 ; 0), (0 ; 1 ; 0) et (1 ; 1 ; 0) sont liés : 1·(1 ; 0 ; 0) + 1·(0 ; 1 ; 0) − 1·(1 ; 1 ; 0) = 0, avec des coefficients non nuls. Le troisième vecteur est la somme des deux premiers : il n’apporte aucune direction nouvelle.</p></div>
<div class="blk" data-t="Dimension"><p>Toutes les bases de ℝⁿ ont exactement <i>n</i> vecteurs : c’est la <b>dimension</b>. Trois vecteurs de ℝ² sont donc toujours liés, et deux vecteurs ne suffisent jamais à engendrer ℝ³.</p></div>
<div class="warn"><p>Deux vecteurs sont liés exactement quand l’un est multiple de l’autre. Une famille qui contient le vecteur nul est toujours liée, car 1·0 = 0.</p></div>`},
  {h:'Le déterminant, une aire signée',p:`<p>Comment savoir d’un coup d’œil si deux vecteurs du plan sont colinéaires&nbsp;? On regarde le parallélogramme qu’ils forment : il est aplati exactement quand ils sont sur une même droite. Il suffit donc de calculer son aire.</p>
<div class="def"><p>Le <b>déterminant</b> de <b>u</b> = (<i>a</i> ; <i>c</i>) et <b>v</b> = (<i>b</i> ; <i>d</i>), placés en colonnes dans ${mat([['a','b'],['c','d']])}, est <b>det(u, v) = ad − bc</b>. Sa valeur absolue est l’<b>aire du parallélogramme</b> construit sur <b>u</b> et <b>v</b> ; il est positif si l’on tourne de <b>u</b> vers <b>v</b> dans le sens trigonométrique, négatif sinon.</p></div>
<div class="why"><p>Cas où <i>a</i>, <i>b</i>, <i>c</i>, <i>d</i> sont positifs et <b>v</b> au-dessus de <b>u</b> : le parallélogramme est dans un rectangle de côtés <i>a</i> + <i>b</i> et <i>c</i> + <i>d</i>. On en retire deux triangles d’aire totale <i>ac</i>, deux triangles d’aire totale <i>bd</i> et deux rectangles <i>b</i> × <i>c</i>. Il reste (<i>a</i> + <i>b</i>)(<i>c</i> + <i>d</i>) − <i>ac</i> − <i>bd</i> − 2<i>bc</i> = <i>ad</i> − <i>bc</i>.</p></div>
<div class="ex"><p><b>u</b> = (3 ; 1) et <b>v</b> = (1 ; 2) : det = 3·2 − 1·1 = 5, le parallélogramme de la figure a une aire de 5. Dans l’autre ordre, det(<b>v</b>, <b>u</b>) = 1·1 − 3·2 = −5 : même aire, sens de rotation inverse.</p></div>
<div class="warn"><p>Un déterminant nul ne veut pas dire que les vecteurs sont nuls, seulement qu’ils sont colinéaires. Dans ℝ³, le déterminant 3 × 3 joue le même rôle avec le volume du parallélépipède : il est nul quand les trois vecteurs sont dans un même plan.</p></div>`,
   fig:(()=>{ const P=plane({x:[-1,5],y:[-1,4],lab:1}); P.poly([[0,0],[3,1],[4,3],[1,2]],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:2}).arrow(0,0,3,1,{c:'var(--math)'}).arrow(0,0,1,2,{c:'var(--spark)'}).text(3,1,'u',{dx:6,dy:12}).text(1,2,'v',{dx:-16}).text(2,1.5,'aire 5',{a:'middle'}); return P.svg(); })()},
  {kind:'Méthode',h:'Tester l’indépendance avec le déterminant',
   p:`Deux vecteurs du plan forment une <b>base</b> s’ils ne sont pas colinéaires. Test rapide : le <b>déterminant</b> de la matrice ${mat([['a','b'],['c','d']])} dont les colonnes sont u = (a ; c) et v = (b ; d) vaut <b>ad − bc</b>. S’il est nul, u et v sont colinéaires. Sinon, ils forment une base, et tout vecteur du plan s’écrit de façon unique αu + βv.`,
   demo:{enonce:'Les couples (2 ; 3), (4 ; 6) et (2 ; 3), (1 ; 4) forment-ils des bases du plan&nbsp;?',
    etapes:[
     {f:`det ${mat([[2,4],[3,6]])} = 2·6 − 4·3 = 0`,w:'On place les vecteurs en colonnes et on calcule ad − bc.'},
     {f:'Déterminant nul : (4 ; 6) = 2·(2 ; 3), les vecteurs sont colinéaires.',w:'Ils restent sur une même droite : ce n’est pas une base.'},
     {f:`det ${mat([[2,1],[3,4]])} = 2·4 − 1·3 = 5`,w:'Même calcul avec le second couple.'},
     {f:'5 ≠ 0 : (2 ; 3) et (1 ; 4) forment une base.',w:'Leurs combinaisons couvrent tout le plan.'}],
    conclusion:'Le premier couple est lié, le second est une base du plan.'}},
  {h:'Indépendance',p:'Les vecteurs (1 ; 2) et (2 ; 4) forment-ils une base du plan&nbsp;?',opts:['Oui','Non, ils sont colinéaires'],ans:1,why:'(2 ; 4) = 2·(1 ; 2). Leurs combinaisons restent sur une seule droite.'},
  {kind:'Défi',h:'Déterminant',p:`Calcule le déterminant de ${mat([[3,1],[2,4]])}.`,lab:'det =',ans:10,why:'det = ad − bc = 3·4 − 1·2 = 10.'},
  {kind:'Méthode',h:'Calculer un déterminant 3 × 3',
   p:'On <b>développe selon la première ligne</b>. Chaque coefficient de cette ligne est multiplié par le déterminant 2 × 2 obtenu en <b>barrant sa ligne et sa colonne</b>, avec les signes alternés <b>+ − +</b>. Trois vecteurs de ℝ³ forment une base si et seulement si ce déterminant est non nul. S’il est nul, l’un d’eux est combinaison des deux autres.',
   demo:{enonce:`Calculer le déterminant de ${mat([[1,2,0],[0,1,3],[2,0,1]])}.`,
    etapes:[
     {f:`+1 · det ${mat([[1,3],[0,1]])} = 1 · (1 − 0) = 1`,w:'On barre la ligne 1 et la colonne 1. Signe +.'},
     {f:`−2 · det ${mat([[0,3],[2,1]])} = −2 · (0 − 6) = 12`,w:'On barre la ligne 1 et la colonne 2. Signe −.'},
     {f:`+0 · det ${mat([[0,1],[2,0]])} = 0`,w:'Un coefficient nul supprime un terme : choisis une ligne avec des zéros quand c’est possible.'},
     {f:'det = 1 + 12 + 0 = 13',w:'On additionne les trois termes.'}],
    conclusion:'Le déterminant vaut 13 ≠ 0 : les trois lignes forment une base de ℝ³.'},
   note:'Si un coefficient contient un paramètre k, le même calcul donne une expression en k. On cherche alors les valeurs de k qui l’annulent.'},
  {h:'À toi',p:`Calcule le déterminant de ${mat([[2,0,1],[1,1,0],[0,3,1]])}.`,lab:'det =',ans:5,why:'2·(1·1 − 0·3) − 0·(1·1 − 0·0) + 1·(1·3 − 1·0) = 2 − 0 + 3 = 5.'},
  {h:'Un système, une équation matricielle',p:`<p>Résoudre 2<i>x</i> + <i>y</i> = 4 et <i>x</i> − <i>y</i> = −1, c’est chercher le point commun de deux droites. C’est aussi chercher comment combiner deux vecteurs : l’algèbre linéaire relie ces deux images.</p>
<div class="def"><p>Le produit d’une matrice par un vecteur colonne se calcule ligne par ligne : ${mat([['a','b'],['c','d']])}·(<i>x</i> ; <i>y</i>) = (<i>ax</i> + <i>by</i> ; <i>cx</i> + <i>dy</i>). Le système <i>ax</i> + <i>by</i> = <i>e</i>, <i>cx</i> + <i>dy</i> = <i>f</i> s’écrit donc <b>AX = B</b> : A est la matrice des coefficients, X = (<i>x</i> ; <i>y</i>) l’inconnue et B = (<i>e</i> ; <i>f</i>).</p></div>
<div class="idea"><p>Lu par colonnes, AX = <i>x</i>·(<i>a</i> ; <i>c</i>) + <i>y</i>·(<i>b</i> ; <i>d</i>) : résoudre le système, c’est écrire B comme combinaison des colonnes de A. Si les colonnes forment une base (det A ≠ 0), il y a exactement une façon de le faire. Si elles sont colinéaires (det A = 0), soit B est sur leur droite et il y a une infinité de solutions, soit il n’y en a aucune.</p></div>
<div class="ex"><p>2<i>x</i> + <i>y</i> = 4 et <i>x</i> − <i>y</i> = −1 : en additionnant, 3<i>x</i> = 3, donc <i>x</i> = 1 et <i>y</i> = 2. Par colonnes : 1·(2 ; 1) + 2·(1 ; −1) = (4 ; −1) ✓. Ici det A = 2·(−1) − 1·1 = −3 ≠ 0 : solution unique, les deux droites se coupent en (1 ; 2).</p></div>
<div class="warn"><p>Avec <i>x</i> + <i>y</i> = 2 et 2<i>x</i> + 2<i>y</i> = 5, det A = 0 et la 2e équation demande <i>x</i> + <i>y</i> = 2,5 : droites parallèles, aucune solution. Avec 2<i>x</i> + 2<i>y</i> = 4, c’est deux fois la même droite : une infinité de solutions.</p></div>`},
  {kind:'Méthode',h:'Résoudre avec la règle de Cramer',
   p:'Le système ax + by = e, cx + dy = f s’écrit <b>AX = B</b>, où A est la matrice des coefficients et B la colonne des seconds membres. Si <b>det A ≠ 0</b>, il a une solution unique : <b>x = det Aₓ / det A</b> et <b>y = det A_y / det A</b>, où Aₓ est A avec sa 1re colonne remplacée par B, et A_y avec sa 2e colonne remplacée par B. Si det A = 0, il n’y a pas de solution unique : soit aucune, soit une infinité.',
   demo:{enonce:'Résoudre x + 2y = 8 et 3x − y = 3.',
    etapes:[
     {f:`det A = det ${mat([[1,2],[3,'−1']])} = −1 − 6 = −7`,w:'Il est non nul : la solution est unique.'},
     {f:`x = det ${mat([[8,2],[3,'−1']])} / (−7) = (−8 − 6)/(−7) = 2`,w:'On remplace la colonne des x par les seconds membres (8 ; 3).'},
     {f:`y = det ${mat([[1,8],[3,3]])} / (−7) = (3 − 24)/(−7) = 3`,w:'On remplace la colonne des y.'},
     {f:'Contrôle : 2 + 6 = 8 et 6 − 3 = 3 ✓',w:'On vérifie dans les deux équations.'}],
    conclusion:'La solution est (x ; y) = (2 ; 3).'}},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Combinaison linéaire : <i>α</i><b>u</b> + <i>β</i><b>v</b>, calculée composante par composante. Vect(<b>u</b>, <b>v</b>) est l’ensemble de toutes ces combinaisons.</li>
<li>Famille libre : la seule combinaison nulle est celle à coefficients nuls. Base : famille libre et génératrice ; les coefficients d’un vecteur sont alors uniques. Toute base de ℝⁿ a <i>n</i> vecteurs.</li>
<li>det ${mat([['a','b'],['c','d']])} = <i>ad</i> − <i>bc</i> : aire signée du parallélogramme des colonnes. det = 0 ⟺ colonnes colinéaires.</li>
<li>Déterminant 3 × 3 : développement selon une ligne, signes + − +. Non nul ⟺ les trois vecteurs forment une base de ℝ³.</li>
<li>Système AX = B : écrire B comme combinaison des colonnes de A. Si det A ≠ 0, solution unique, donnée par Cramer : <i>x</i> = det Aₓ / det A et <i>y</i> = det A_y / det A. Si det A = 0 : aucune solution ou une infinité.</li>
</ul></div>`},
  {kind:'Problème',h:'Un système par les déterminants',
   p:`On résout le système <i>2x + y = 5</i> et <i>x − 3y = −1</i> en l’écrivant <i>AX = B</i> avec A = ${mat([[2,1],[1,-3]].map(r=>r.map(fmt)))}. On utilise ensuite les déterminants pour savoir quand un tel système a une solution unique.`,
   parts:[
    {q:'a) Combien vaut det A ?',lab:'det =',ans:-7,hint:'det = ad − bc.',why:'2 · (−3) − 1 · 1 = −7.'},
    {q:'b) Avec la règle de Cramer, combien vaut x ?',lab:'x =',ans:2,hint:'Remplace la 1re colonne de A par (5 ; −1) et divise son déterminant par det A.',why:'x = (5 · (−3) − 1 · (−1)) ÷ (−7) = −14 ÷ (−7) = 2.'},
    {q:'c) Combien vaut y ?',lab:'y =',ans:1,hint:'Remplace la 2e colonne cette fois.',why:'y = (2 · (−1) − 5 · 1) ÷ (−7) = −7 ÷ (−7) = 1.'},
    {q:'d) Pour quelle valeur de k le système 2x + y = 5, x + ky = −1 n’a-t-il pas de solution unique ?',lab:'k =',ans:.5,tol:.001,hint:'Pas de solution unique quand le déterminant est nul.',why:'det = 2k − 1 = 0 pour k = ½.'},
   ],
   sol:'det A = −7 ≠ 0 : solution unique.<br>Cramer : x = det[[5, 1], [−1, −3]] / det A = −14/−7 = 2 et y = det[[2, 5], [1, −1]] / det A = −7/−7 = 1.<br>Contrôle : 4 + 1 = 5 et 2 − 3 = −1.<br>Avec x + ky = −1, det = 2k − 1. Pour k = ½, les deux lignes de la matrice sont proportionnelles : les droites sont parallèles. Ici elles sont distinctes (la 2e équation multipliée par 2 donne 2x + y = −2, incompatible avec 2x + y = 5) : il n’y a aucune solution.'},
  {kind:'Problème',h:'Trois vecteurs, une base ?',
   p:'Dans ℝ³, on considère <b>u</b> = (1 ; 1 ; 0), <b>v</b> = (0 ; 1 ; 1) et <b>w</b> = (1 ; 0 ; k), où k est un réel. On cherche pour quelles valeurs de k ces trois vecteurs forment une base, et ce qui se passe sinon.',
   parts:[
    {q:'a) Combien vaut le déterminant de (u, v, w) pour k = 2 ?',lab:'det =',ans:3,hint:'Développe selon la première ligne de la matrice dont les lignes sont u, v, w. Tu trouves une expression en k.',why:'det = 1·(1·k − 1·0) − 1·(0·k − 1·1) + 0 = k + 1. Pour k = 2 : 3.'},
    {q:'b) Pour quelle valeur de k les vecteurs sont-ils liés ?',lab:'k =',ans:-1,hint:'Ils sont liés si et seulement si le déterminant est nul.',why:'k + 1 = 0 donne k = −1.'},
    {q:'c) Pour k = −1, on écrit w = αu + βv. Combien vaut β ?',lab:'β =',ans:-1,hint:'Compare les composantes : la 1re donne α, la 3e donne β.',why:'(1 ; 0 ; −1) = α(1 ; 1 ; 0) + β(0 ; 1 ; 1) : α = 1, β = −1, et la 2e composante vérifie 1 − 1 = 0.'},
    {q:'d) Pour k ≠ −1, que peut-on conclure ?',opts:['u, v, w sont orthogonaux','u, v, w forment une base de ℝ³','w est combinaison de u et v','u, v, w engendrent un plan'],ans:1,hint:'Trois vecteurs de ℝ³ avec un déterminant non nul…',why:'det ≠ 0 : les trois vecteurs sont linéairement indépendants. Trois vecteurs indépendants de ℝ³ forment une base.'},
   ],
   sol:'det(u, v, w) = k + 1 (développement selon la 1re ligne).<br>Si k ≠ −1, le déterminant est non nul : les vecteurs sont indépendants, donc une base de ℝ³.<br>Si k = −1 : w = u − v, car (1 ; 1 ; 0) − (0 ; 1 ; 1) = (1 ; 0 ; −1).<br>Les trois vecteurs sont alors dans le plan engendré par u et v, et n’engendrent pas ℝ³.'},
 ]},

{id:'propres',br:'alg',lv:'uni',h:'Valeurs propres',p:'Les directions qu’une matrice ne fait pas tourner.',
 lessons:['Vecteurs propres','Polynôme caractéristique','Diagonalisation','Matrices symétriques'],
 steps:[
  {h:'Une direction qui résiste',p:`<p>Une matrice transforme chaque vecteur en un autre, qui en général pointe ailleurs. Mais certaines directions sont privilégiées : la matrice s’y contente d’étirer. Les trouver, c’est comprendre la matrice d’un seul coup.</p>
<div class="def"><p>Un <b>vecteur propre</b> de A est un vecteur <b>v ≠ 0</b> tel que <b>Av = λv</b> pour un nombre λ, la <b>valeur propre</b> associée. La lettre grecque λ (lambda) désigne le facteur d’étirement.</p></div>
<div class="idea"><p>Ici A = ${mat([[2,1],[1,2]])}. La flèche fine est <b>v</b>, la flèche épaisse est A<b>v</b>. Fais tourner <b>v</b> : presque partout, les deux flèches font un angle. Cherche les positions où elles se superposent sur une même droite ; la valeur de λ s’affiche alors.</p></div>
<div class="ex"><p>Avec une autre matrice, B = ${mat([[1,2],[2,1]])} : B(1 ; 1) = (3 ; 3) = 3·(1 ; 1), donc (1 ; 1) est propre pour λ = 3. B(1 ; −1) = (1 − 2 ; 2 − 1) = (−1 ; 1) = −1·(1 ; −1) : propre pour λ = −1. Mais B(1 ; 0) = (1 ; 2) n’est pas un multiple de (1 ; 0).</p></div>
<div class="warn"><p>Une valeur propre négative retourne le vecteur, mais il reste sur <b>la même droite</b> : c’est encore une direction propre.</p></div>`,
   params:[{id:'t',l:'Direction de v',min:0,max:345,step:15,v:0,u:'°'}],
   draw:v=>{ const x=Math.cos(rad(v.t))*1.4,y=Math.sin(rad(v.t))*1.4,P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,2*x+y,x+2*y,{c:'var(--spark)',w:4}).arrow(0,0,x,y,{c:'var(--math)'}); return P.svg(); },
   info:v=>{ const t=rad(v.t),x=Math.cos(t),y=Math.sin(t),ax=2*x+y,ay=x+2*y,cr=Math.abs(x*ay-y*ax)<1e-9; return cr?`<b>Direction propre !</b> λ = ${fmt((ax*x+ay*y))}`:'Av n’est pas aligné avec v'; }},
  {h:'Trouve une direction propre',p:'Tourne <b>v</b> jusqu’à ce que <b>Av</b> soit sur la même droite.',
   params:[{id:'t',l:'Direction de v',min:0,max:345,step:15,v:15,u:'°'}],
   draw:v=>{ const x=Math.cos(rad(v.t))*1.4,y=Math.sin(rad(v.t))*1.4,P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,2*x+y,x+2*y,{c:'var(--spark)',w:4}).arrow(0,0,x,y,{c:'var(--math)'}); return P.svg(); },
   ok:v=>v.t%90===45,why:'Les directions propres sont 45° (λ = 3) et 135° (λ = 1), et leurs opposées.'},
  {h:'Espace propre : toute une droite',p:`<p>Si <b>v</b> est un vecteur propre, que dire de 2<b>v</b> ou de −<b>v</b>&nbsp;? Ils sont propres aussi, avec la même valeur propre. Les vecteurs propres viennent donc par droites entières.</p>
<div class="prop"><p>Pour une valeur propre λ, l’ensemble <b>E<sub>λ</sub> = {v : Av = λv}</b> est l’<b>espace propre</b> de λ. Il contient 0 et il est stable par combinaison linéaire : c’est une droite ou un plan passant par l’origine (ou tout l’espace).</p></div>
<div class="why"><p>Si A<b>v</b> = λ<b>v</b> et A<b>w</b> = λ<b>w</b>, alors A(<i>α</i><b>v</b> + <i>β</i><b>w</b>) = <i>α</i>A<b>v</b> + <i>β</i>A<b>w</b> = λ(<i>α</i><b>v</b> + <i>β</i><b>w</b>), car le produit par une matrice respecte les combinaisons. Le vecteur nul vérifie A0 = λ0 pour tout λ : c’est pour cela qu’on l’exclut de la définition, sinon tout nombre serait valeur propre.</p></div>
<div class="ex"><p>La projection sur l’axe des <i>x</i>, P = ${mat([[1,0],[0,0]])}, envoie (<i>x</i> ; <i>y</i>) sur (<i>x</i> ; 0). L’axe des <i>x</i> est l’espace propre de λ = 1 (rien n’y bouge), l’axe des <i>y</i> celui de λ = 0 (tout y est écrasé sur 0). Une valeur propre 0 veut dire qu’un vecteur non nul est envoyé sur 0 : alors det P = 0.</p></div>
<div class="warn"><p>Une matrice réelle n’a pas toujours de vecteur propre réel : la rotation de 90°, ${mat([[0,'−1'],[1,0]])}, fait tourner toutes les directions, aucune ne reste en place.</p></div>`},
  {kind:'Méthode',h:'Vérifier qu’un vecteur est propre',
   p:'Pour tester si un vecteur v ≠ 0 est propre pour A : calcule <b>Av</b>, chaque composante étant le produit d’une ligne de A par v. Puis regarde si Av est un multiple de v. Si Av = λv, v est un vecteur propre et λ est sa <b>valeur propre</b>. Sinon, v change de direction. Tout multiple non nul d’un vecteur propre est encore propre, avec la même λ.',
   demo:{enonce:`Avec A = ${mat([[3,1],[0,2]])}, tester les vecteurs (1 ; 0), (1 ; 1) et (1 ; −1).`,
    etapes:[
     {f:'A(1 ; 0) = (3·1 + 1·0 ; 0·1 + 2·0) = (3 ; 0) = 3·(1 ; 0)',w:'Ligne 1 de A fois v, puis ligne 2 fois v.'},
     {f:'(1 ; 0) est propre, de valeur propre 3',w:'On a Av = 3v.'},
     {f:'A(1 ; 1) = (4 ; 2)',w:'(4 ; 2) n’est pas un multiple de (1 ; 1), car 4 ≠ 2 : pas propre.'},
     {f:'A(1 ; −1) = (2 ; −2) = 2·(1 ; −1)',w:'Même test : (1 ; −1) est propre, de valeur propre 2.'}],
    conclusion:'(1 ; 0) est propre pour λ = 3, (1 ; −1) pour λ = 2, et (1 ; 1) n’est pas propre.'}},
  {h:'Lis la valeur propre',p:'Pour v = (1 ; 1), on trouve Av = (3 ; 3). Quelle est la valeur propre associée&nbsp;?',opts:['1','2','3','6'],ans:2,why:'Av = 3·v, donc λ = 3.'},
  {h:'Pourquoi det(A − λI) s’annule',p:`<p>Tester des vecteurs au hasard ne suffit pas : il faut une équation qui donne directement les valeurs propres. On l’obtient en réécrivant A<b>v</b> = λ<b>v</b>.</p>
<div class="thm"><p>λ est valeur propre de A si et seulement si <b>det(A − λI) = 0</b>, où I = ${mat([[1,0],[0,1]])} est la matrice <b>identité</b> (I<b>v</b> = <b>v</b> pour tout <b>v</b>).</p></div>
<div class="why"><p>A<b>v</b> = λ<b>v</b> s’écrit A<b>v</b> − λI<b>v</b> = 0, soit <b>(A − λI)v = 0</b>. On cherche donc un <b>v</b> non nul que la matrice A − λI envoie sur 0. Or (A − λI)<b>v</b> est une combinaison des colonnes de A − λI : une combinaison nulle à coefficients non tous nuls existe exactement quand ces colonnes sont liées, c’est-à-dire quand le déterminant est nul.</p></div>
<div class="ex"><p>A = ${mat([[2,1],[1,2]])} : A − λI = ${mat([['2 − λ',1],[1,'2 − λ']])}, de déterminant (2 − λ)² − 1 = λ² − 4λ + 3 = (λ − 1)(λ − 3). Les valeurs propres sont 1 et 3, celles que la figure du début faisait apparaître.</p></div>
<div class="blk" data-t="Le cas 2 × 2"><p>Pour A = ${mat([['a','b'],['c','d']])}, det(A − λI) = (<i>a</i> − λ)(<i>d</i> − λ) − <i>bc</i> = λ² − (<i>a</i> + <i>d</i>)λ + (<i>ad</i> − <i>bc</i>). On y lit la trace <i>a</i> + <i>d</i> et le déterminant <i>ad</i> − <i>bc</i>.</p></div>`},
  {kind:'Méthode',h:'Le polynôme caractéristique',
   p:'λ est valeur propre de A si et seulement si <b>det(A − λI) = 0</b>. Pour une matrice 2 × 2, ce déterminant vaut <b>λ² − tr(A)·λ + det A</b>, où la <b>trace</b> tr(A) est la somme des coefficients diagonaux. Ses racines sont les valeurs propres. Conséquence : leur <b>somme</b> vaut la trace et leur <b>produit</b> le déterminant.',
   demo:{enonce:`Trouver les valeurs propres de A = ${mat([[2,3],[1,4]])}.`,
    etapes:[
     {f:'tr(A) = 2 + 4 = 6 et det A = 2·4 − 3·1 = 5',w:'Ces deux nombres suffisent pour écrire le polynôme.'},
     {f:'λ² − 6λ + 5 = 0',w:'λ² − tr(A)·λ + det A.'},
     {f:'(λ − 1)(λ − 5) = 0, donc λ = 1 ou λ = 5',w:'Deux nombres de somme 6 et de produit 5.'},
     {f:'Contrôle : 1 + 5 = 6 = tr(A) et 1 · 5 = 5 = det A ✓',w:'Somme et produit redonnent la trace et le déterminant.'}],
    conclusion:'Les valeurs propres de A sont 1 et 5.'}},
  {kind:'Défi',h:'Trace',p:`La somme des valeurs propres d’une matrice égale sa trace (somme de la diagonale). Pour ${mat([[4,1],[2,3]])}, combien vaut cette somme&nbsp;?`,ans:7,why:'Trace = 4 + 3 = 7. (Les valeurs propres sont 5 et 2.)'},
  {h:'Diagonaliser, c’est changer de point de vue',p:`<p>Dans la base usuelle, A = ${mat([[2,1],[1,2]])} mélange les deux coordonnées. Dans la base de ses vecteurs propres, elle ne fait plus que multiplier chaque coordonnée par un nombre. Diagonaliser, c’est trouver ce bon point de vue.</p>
<div class="def"><p>A est <b>diagonalisable</b> s’il existe une matrice inversible P et une matrice diagonale D telles que <b>A = PDP⁻¹</b>. Les colonnes de P sont des vecteurs propres qui forment une base ; la diagonale de D porte les valeurs propres, dans le même ordre.</p></div>
<div class="idea"><p>Lis PDP⁻¹ de droite à gauche, comme une suite d’étapes : P⁻¹ calcule les coordonnées de <b>v</b> dans la base propre, D multiplie chacune par sa valeur propre, P revient à la base usuelle.</p></div>
<div class="ex"><p>Pour A = ${mat([[2,1],[1,2]])} : <b>v</b>₁ = (1 ; 1) pour λ = 3 et <b>v</b>₂ = (1 ; −1) pour λ = 1. Le vecteur (3 ; 1) = 2<b>v</b>₁ + <b>v</b>₂ a pour coordonnées propres (2 ; 1). A les change en (6 ; 1), soit 6<b>v</b>₁ + <b>v</b>₂ = (7 ; 5). Contrôle direct : A(3 ; 1) = (6 + 1 ; 3 + 2) = (7 ; 5) ✓.</p></div>
<div class="why"><p>Deux valeurs propres <b>distinctes</b> suffisent : leurs vecteurs propres ne peuvent pas être colinéaires, sinon un même vecteur serait multiplié à la fois par λ₁ et par λ₂. Contre-exemple avec une valeur propre double : le cisaillement ${mat([[1,1],[0,1]])} n’a que λ = 1, et (A − I)<b>v</b> = 0 donne <i>y</i> = 0. Un seul axe propre, pas de base : il n’est pas diagonalisable.</p></div>`},
  {kind:'Méthode',h:'Trouver les vecteurs propres et diagonaliser',
   p:'Pour chaque valeur propre λ, résous <b>(A − λI)v = 0</b>. Les deux lignes de A − λI sont proportionnelles, puisque son déterminant est nul : une seule équation suffit, et on choisit une solution simple non nulle. Avec deux vecteurs propres indépendants v₁ et v₂, on pose <b>P</b> = la matrice de colonnes v₁ et v₂, et <b>D = diag(λ₁, λ₂)</b> : alors <b>A = PDP⁻¹</b>.',
   demo:{enonce:`Trouver des vecteurs propres de A = ${mat([[2,3],[1,4]])}, de valeurs propres 5 et 1, puis diagonaliser A.`,
    etapes:[
     {f:`A − 5I = ${mat([['−3',3],[1,'−1']])} : −3x + 3y = 0, donc x = y`,w:'On retire λ sur la diagonale. Les deux lignes donnent la même équation.'},
     {f:'v₁ = (1 ; 1). Contrôle : A(1 ; 1) = (5 ; 5) ✓',w:'On choisit x = 1.'},
     {f:`A − I = ${mat([[1,3],[1,3]])} : x + 3y = 0, donc v₂ = (3 ; −1)`,w:'On choisit y = −1 pour avoir des entiers. Contrôle : A(3 ; −1) = (3 ; −1) ✓'},
     {f:`P = ${mat([[1,3],[1,'−1']])} et D = ${mat([[5,0],[0,1]])}`,w:'Les vecteurs propres en colonnes, dans le même ordre que les valeurs propres.'}],
    conclusion:'A = PDP⁻¹ : dans la base (v₁, v₂), A multiplie la 1re coordonnée par 5 et laisse la 2e inchangée.'}},
  {h:'Matrices symétriques : des axes perpendiculaires',p:`<p>Les deux directions propres de ${mat([[2,1],[1,2]])}, portées par (1 ; 1) et (1 ; −1), sont perpendiculaires. Ce n’est pas un hasard : cette matrice est symétrique par rapport à sa diagonale.</p>
<div class="def"><p>A est <b>symétrique</b> si le coefficient en ligne <i>i</i>, colonne <i>j</i> est égal à celui en ligne <i>j</i>, colonne <i>i</i>. En 2 × 2 : ${mat([['a','b'],['b','d']])}.</p></div>
<div class="thm"><p><b>Théorème spectral.</b> Une matrice symétrique réelle a toutes ses valeurs propres réelles, et elle se diagonalise dans une base de vecteurs propres <b>orthogonaux</b> deux à deux.</p></div>
<div class="why"><p>Pour une matrice symétrique, (A<b>v</b>)·<b>w</b> = <b>v</b>·(A<b>w</b>) pour tous <b>v</b>, <b>w</b> (produit scalaire). Si A<b>v</b> = λ<b>v</b> et A<b>w</b> = μ<b>w</b> avec λ ≠ μ : λ(<b>v</b>·<b>w</b>) = (A<b>v</b>)·<b>w</b> = <b>v</b>·(A<b>w</b>) = μ(<b>v</b>·<b>w</b>), donc (λ − μ)(<b>v</b>·<b>w</b>) = 0 et <b>v</b>·<b>w</b> = 0. En 2 × 2, le discriminant de λ² − (<i>a</i> + <i>d</i>)λ + <i>ad</i> − <i>b</i>² vaut (<i>a</i> − <i>d</i>)² + 4<i>b</i>² ≥ 0 : les valeurs propres sont bien réelles.</p></div>
<div class="ex"><p>(1 ; 1)·(1 ; −1) = 1 − 1 = 0 ✓. Contre-exemple non symétrique : ${mat([[2,3],[1,4]])} a pour vecteurs propres (1 ; 1) et (3 ; −1), et (1 ; 1)·(3 ; −1) = 2 ≠ 0.</p></div>`},
  {kind:'Méthode',h:'Puissances et état d’équilibre',
   p:'Pour calculer Aⁿv, on <b>décompose v</b> sur des vecteurs propres : si v = c₁v₁ + c₂v₂, alors <b>Aⁿv = c₁λ₁ⁿv₁ + c₂λ₂ⁿv₂</b>. Si |λ₂| < 1, ce terme s’éteint. Une matrice de transition, dont chaque <b>colonne a pour somme 1</b>, a toujours 1 comme valeur propre : sa transposée envoie (1 ; 1) sur (1 ; 1), et une matrice a les mêmes valeurs propres que sa transposée. L’<b>équilibre</b> est le vecteur propre de λ = 1 dont les composantes somment à 1.',
   demo:{enonce:`On pose M = ${mat([['0,8','0,3'],['0,2','0,7']])} et on part de (1 ; 0). Trouver l’équilibre et une formule pour Mⁿ(1 ; 0).`,
    etapes:[
     {f:'Les colonnes somment à 1, donc λ₁ = 1 ; et λ₂ = tr(M) − 1 = 1,5 − 1 = 0,5',w:'La somme des valeurs propres vaut la trace.'},
     {f:'(M − I)v = 0 : −0,2c + 0,3r = 0, donc c = 1,5r. Avec c + r = 1 : (0,6 ; 0,4)',w:'L’équilibre est le vecteur propre de λ = 1, normalisé pour que les parts somment à 1.'},
     {f:'(1 ; 0) = (0,6 ; 0,4) + 0,4·(1 ; −1), et M(1 ; −1) = (0,5 ; −0,5)',w:'(1 ; −1) est propre pour 0,5. Ses composantes somment à 0 : il ne change pas le total.'},
     {f:'Mⁿ(1 ; 0) = (0,6 ; 0,4) + 0,4·0,5ⁿ·(1 ; −1)',w:'À chaque étape, chaque morceau est multiplié par sa valeur propre.'}],
    conclusion:'La 1re composante vaut 0,6 + 0,4·0,5ⁿ : elle tend vers 0,6, et l’écart à l’équilibre est divisé par 2 à chaque étape.'}},
  {h:'L’équilibre',p:`Pour M = ${mat([['0,7','0,4'],['0,3','0,6']])}, quelle est la 1re composante du vecteur d’équilibre (composantes de somme 1)&nbsp;? (fraction ou décimale)`,ans:4/7,tol:.005,why:'(M − I)v = 0 donne −0,3c + 0,4r = 0, soit c = 4r/3. Avec c + r = 1 : r = 3/7 et c = 4/7 ≈ 0,571.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>v</b> ≠ 0 est propre pour λ si A<b>v</b> = λ<b>v</b> : A étire <b>v</b> sans changer sa droite (λ < 0 le retourne).</li>
<li>Espace propre E<sub>λ</sub> : droite ou plan passant par l’origine. Tout multiple non nul d’un vecteur propre est propre, avec la même λ.</li>
<li>λ est valeur propre ⟺ det(A − λI) = 0. En 2 × 2 : λ² − tr(A)·λ + det A = 0 ; somme des valeurs propres = trace, produit = déterminant.</li>
<li>Vecteurs propres : résoudre (A − λI)<b>v</b> = 0 ; en 2 × 2, une seule équation suffit.</li>
<li>A = PDP⁻¹ : vecteurs propres en colonnes de P, valeurs propres sur la diagonale de D. Des valeurs propres distinctes le garantissent ; le cisaillement ${mat([[1,1],[0,1]])} n’est pas diagonalisable.</li>
<li>Aⁿ<b>v</b> = <i>c</i>₁λ₁ⁿ<b>v</b>₁ + <i>c</i>₂λ₂ⁿ<b>v</b>₂ : la valeur propre de plus grand module domine. Une matrice de transition a la valeur propre 1, dont le vecteur propre normalisé est l’équilibre.</li>
<li>Matrice symétrique : valeurs propres réelles, vecteurs propres orthogonaux.</li>
</ul></div>`},
  {kind:'Problème',h:'Diagonaliser une matrice',
   p:`On étudie A = ${mat([[5,-2],[1,2]].map(r=>r.map(fmt)))}. On cherche ses valeurs propres à partir de la trace et du déterminant, puis un vecteur propre pour la plus grande.`,
   parts:[
    {q:'a) Combien vaut la trace de A ?',ans:7,hint:'Somme des coefficients diagonaux.',why:'5 + 2 = 7.'},
    {q:'b) Combien vaut det A ?',ans:12,hint:'ad − bc.',why:'5 · 2 − (−2) · 1 = 12.'},
    {q:'c) Quelle est la plus grande valeur propre ?',lab:'λ =',ans:4,hint:'Le polynôme caractéristique est λ² − (trace)·λ + det.',why:'λ² − 7λ + 12 = (λ − 3)(λ − 4). Les valeurs propres sont 3 et 4.'},
    {q:'d) Un vecteur propre pour λ = 4 s’écrit (2 ; y). Combien vaut y ?',lab:'y =',ans:1,hint:'Résous (A − 4I)v = 0.',why:`A − 4I = ${mat([[1,'−2'],[1,'−2']])} : il faut x − 2y = 0, donc (2 ; 1).`},
   ],
   sol:`Polynôme caractéristique : λ² − tr(A)λ + det A = λ² − 7λ + 12 = (λ − 3)(λ − 4).<br>Pour λ = 4 : A − 4I donne x − 2y = 0, d’où v₁ = (2 ; 1). Contrôle : A·(2 ; 1) = (8 ; 4).<br>Pour λ = 3 : A − 3I donne 2x − 2y = 0, d’où v₂ = (1 ; 1).<br>Avec P = ${mat([[2,1],[1,1]])}, on a A = PDP⁻¹ et D = diag(4, 3).`},
  {kind:'Problème',h:'Ville et campagne à long terme',
   p:`Chaque année, 10 % des citadins partent à la campagne et 20 % des campagnards s’installent en ville. Si (c ; r) donne les proportions en ville et à la campagne, l’année suivante vaut M·(c ; r) avec M = ${mat([['0,9','0,2'],['0,1','0,8']])}. Au départ, la population est répartie moitié-moitié.`,
   parts:[
    {q:'a) Pourquoi 1 est-il forcément valeur propre de M ?',opts:['Parce que la trace vaut 1,7','Parce que chaque colonne a une somme de 1, donc (1 ; 1) est vecteur propre de la transposée','Parce que M est symétrique','Parce que det M = 1'],ans:1,hint:'M et sa transposée ont les mêmes valeurs propres.',why:'Les colonnes somment à 1, donc Mᵀ(1 ; 1) = (1 ; 1). Mᵀ et M ont le même polynôme caractéristique. (Ici det M = 0,7.)'},
    {q:'b) Quelle est l’autre valeur propre ?',lab:'λ =',ans:.7,tol:.001,hint:'La somme des valeurs propres égale la trace.',why:'1,7 − 1 = 0,7.'},
    {q:'c) Vers quelle proportion de citadins la population tend-elle ? (fraction ou décimale)',ans:2/3,tol:.005,hint:'Cherche le vecteur propre de λ = 1 dont les composantes somment à 1.',why:'(M − I)v = 0 donne −0,1c + 0,2r = 0, soit c = 2r. Avec c + r = 1 : c = 2/3.'},
    {q:'d) L’écart à l’équilibre est multiplié par 0,7 chaque année. Après combien d’années la part des citadins dépasse-t-elle 65 % ?',unit:'ans',ans:7,hint:'Écart initial : 2/3 − 1/2 = 1/6. Il faut 1/6 · 0,7ⁿ < 2/3 − 0,65.',why:'0,7ⁿ < 0,1, donc n > ln 0,1 / ln 0,7 ≈ 6,46. Après 7 ans (65,3 %).'},
   ],
   sol:'Les colonnes de M somment à 1, donc 1 est valeur propre. La trace 1,7 donne l’autre : 0,7.<br>Équilibre : Mv = v donne c = 2r, donc (2/3 ; 1/3).<br>On décompose (½ ; ½) = (2/3 ; 1/3) + (1/6)(−1 ; 1), où (−1 ; 1) est propre pour 0,7.<br>Après n ans : c = 2/3 − (1/6)·0,7ⁿ. On veut (1/6)·0,7ⁿ < 1/60, soit 0,7ⁿ < 0,1 et n ≥ 7.<br>Contrôle : 0,55 ; 0,585 ; … ; c₆ ≈ 0,647 ; c₇ ≈ 0,653.'},
 ]},

{id:'limites',br:'ana',lv:'uni',h:'Limites et continuité',p:'La définition ε–δ, enfin rendue visible.',
 lessons:['Le jeu ε–δ','Limites remarquables','Continuité','Valeurs intermédiaires'],
 steps:[
  {h:'Le jeu ε–δ',p:`<p>Dire que <i>f</i>(<i>x</i>) « se rapproche » de L quand <i>x</i> se rapproche de <i>a</i> est trop vague pour une preuve : à quel point, et à quelle condition&nbsp;? La définition ε–δ transforme cette idée en un jeu à deux joueurs.</p>
<div class="def"><p><b>Le jeu.</b> Le premier joueur choisit une tolérance <b>ε > 0</b> (epsilon) : une bande horizontale de demi-hauteur ε autour de L. Le second répond par une marge <b>δ > 0</b> (delta) autour de <i>a</i>, telle que pour tout <i>x</i> de la marge, <i>f</i>(<i>x</i>) reste dans la bande. La limite vaut L si le second joueur gagne <b>quel que soit ε</b>.</p></div>
<div class="idea"><p>Ici <i>f</i>(<i>x</i>) = 2<i>x</i> + 1, <i>a</i> = 1 et L = 3. La bande horizontale est la tolérance, la bande verticale la marge ; le morceau de courbe au-dessus de la marge devient vert s’il reste dans la tolérance, rouge sinon. Réduis ε : il faut alors réduire δ, mais il existe toujours une marge qui marche.</p></div>
<div class="ex"><p>Pour <i>x</i> dans la marge, |<i>f</i>(<i>x</i>) − 3| = |2<i>x</i> − 2| = 2|<i>x</i> − 1| < 2δ. Le second joueur gagne dès que 2δ ≤ ε. Avec ε = 0,6, la marge δ = 0,3 convient ; avec ε = 0,2, il faut δ ≤ 0,1.</p></div>`,
   params:[{id:'e',l:'ε',min:.1,max:1,step:.1,v:.6},{id:'d',l:'δ',min:.05,max:1,step:.05,v:.5}],
   draw:v=>{ const f=x=>2*x+1,P=plane({x:[-1,3],y:[0,6],h:300,lab:1}), ok=2*v.d<=v.e+1e-9;
     P.rect(-1,3-v.e,4,2*v.e,{fill:'var(--spark)',fo:.25,c:null}).rect(1-v.d,0,2*v.d,6,{fill:'var(--math)',fo:.15,c:null});
     P.fn(f,{c:'var(--muted)',w:2}).fn(f,{from:1-v.d,to:1+v.d,c:ok?'var(--ok)':'var(--bad)',w:5}).dot(1,3,{c:'var(--ink)',r:4}); return P.svg(); },
   info:v=>2*v.d<=v.e+1e-9?'Gagné : sur toute la marge δ, f(x) reste dans la bande ε.':'Perdu : le morceau rouge sort de la bande. Réduis δ.'},
  {h:'La définition, symbole par symbole',p:`<p>Le jeu s’écrit en une ligne avec des quantificateurs. Il faut savoir la lire sans hésiter, car toute preuve de limite suit sa structure.</p>
<div class="def"><p><i>f</i>(<i>x</i>) tend vers L quand <i>x</i> tend vers <i>a</i>, noté <b>lim<sub><i>x</i>→<i>a</i></sub> <i>f</i>(<i>x</i>) = L</b>, si : <b>∀ε > 0, ∃δ > 0, ∀<i>x</i>, 0 < |<i>x</i> − <i>a</i>| < δ ⟹ |<i>f</i>(<i>x</i>) − L| < ε</b>.</p></div>
<div class="idea"><p>∀ se lit « pour tout », ∃ « il existe », ⟹ « entraîne ». |<i>x</i> − <i>a</i>| est la distance entre <i>x</i> et <i>a</i> : |<i>x</i> − <i>a</i>| < δ veut dire que <i>x</i> est dans ]<i>a</i> − δ ; <i>a</i> + δ[. La condition 0 < |<i>x</i> − <i>a</i>| exclut <i>x</i> = <i>a</i> : la limite décrit ce qui se passe <b>près</b> de <i>a</i>, que <i>f</i> soit définie en <i>a</i> ou non.</p></div>
<div class="ex"><p>Pour <i>f</i>(<i>x</i>) = 5 − 3<i>x</i> en <i>a</i> = 1, avec L = 2 : |<i>f</i>(<i>x</i>) − 2| = |3 − 3<i>x</i>| = 3|<i>x</i> − 1|. Pour ε = 0,03, δ = 0,01 marche : si |<i>x</i> − 1| < 0,01, alors |<i>f</i>(<i>x</i>) − 2| < 0,03. En général, δ = ε/3 convient.</p></div>
<div class="warn"><p>L’ordre des quantificateurs compte. « ∀ε ∃δ » permet à δ de dépendre de ε. « ∃δ ∀ε » exigerait une seule marge valable pour toutes les tolérances : cela forcerait <i>f</i> à valoir exactement L près de <i>a</i>.</p></div>`},
  {kind:'Méthode',h:'Écrire une preuve ε–δ',
   p:'Pour prouver que f(x) → L quand x → a : 1) Pars de <b>|f(x) − L|</b> et transforme-le jusqu’à faire apparaître <b>|x − a|</b>. 2) Lis quelle marge δ rend cette quantité plus petite que ε. 3) Rédige : « Soit ε > 0. Posons δ = … Si |x − a| < δ, alors |f(x) − L| < ε. » Le δ peut dépendre de ε, jamais de x.',
   demo:{enonce:'Prouver que 3x − 1 → 5 quand x → 2.',
    etapes:[
     {f:'|f(x) − 5| = |3x − 1 − 5| = |3x − 6| = 3|x − 2|',w:'On factorise pour faire apparaître |x − a|.'},
     {f:'3|x − 2| < ε ⟺ |x − 2| < ε/3',w:'On lit la marge nécessaire.'},
     {f:'Soit ε > 0. Posons δ = ε/3.',w:'δ ne dépend que de ε.'},
     {f:'Si |x − 2| < δ, alors |f(x) − 5| = 3|x − 2| < 3 · ε/3 = ε ✓',w:'On vérifie que ce δ marche pour tous les x de la marge.'}],
    conclusion:'Pour tout ε > 0, δ = ε/3 convient : 3x − 1 tend vers 5 quand x → 2.'}},
  {h:'Trouve un δ',p:'Avec ε = 0,5, règle δ pour que la courbe reste dans la bande.',
   params:[{id:'d',l:'δ',min:.05,max:1,step:.05,v:.6}],
   draw:v=>{ const f=x=>2*x+1,e=.5,P=plane({x:[-1,3],y:[0,6],h:300,lab:1}), ok=2*v.d<=e+1e-9;
     P.rect(-1,3-e,4,2*e,{fill:'var(--spark)',fo:.25,c:null}).rect(1-v.d,0,2*v.d,6,{fill:'var(--math)',fo:.15,c:null}).fn(f,{c:'var(--muted)',w:2}).fn(f,{from:1-v.d,to:1+v.d,c:'var(--accent)',w:5}); return P.svg(); },
   ok:v=>v.d<=.25+1e-9,why:'|f(x) − 3| = 2|x − 1|. Il faut 2δ ≤ ε, donc δ ≤ ε/2 = 0,25. Ce raisonnement marche pour tout ε : la limite est prouvée.'},
  {h:'Calculer avec les limites',p:`<p>Refaire une preuve ε–δ pour chaque fonction serait épuisant. Heureusement, les limites se combinent comme les fonctions : on les prouve une fois pour toutes sur les opérations de base.</p>
<div class="prop"><p>Si <i>f</i>(<i>x</i>) → L et <i>g</i>(<i>x</i>) → M quand <i>x</i> → <i>a</i>, alors <b><i>f</i> + <i>g</i> → L + M</b>, <b><i>f</i>·<i>g</i> → L·M</b> et, si M ≠ 0, <b><i>f</i>/<i>g</i> → L/M</b>. En particulier, la limite d’un polynôme, ou d’une fraction de polynômes dont le dénominateur ne s’annule pas en <i>a</i>, est sa valeur en <i>a</i>.</p></div>
<div class="why"><p>Pour la somme : on demande à chaque fonction d’être à moins de ε/2 de sa limite, ce qui donne deux marges δ₁ et δ₂, puis on prend δ = min(δ₁ ; δ₂). Alors |(<i>f</i> + <i>g</i>) − (L + M)| ≤ |<i>f</i> − L| + |<i>g</i> − M| < ε/2 + ε/2 = ε.</p></div>
<div class="ex"><p>Quand <i>x</i> → 1 : <i>x</i>² + 1 → 2 et <i>x</i> + 2 → 3 ≠ 0, donc (<i>x</i>² + 1)/(<i>x</i> + 2) → 2/3.</p></div>
<div class="warn"><p>La règle du quotient exige M ≠ 0. Si le haut et le bas tendent tous deux vers 0, on a une <b>forme indéterminée 0/0</b> : la limite peut valoir n’importe quoi. En 0, <i>x</i>/<i>x</i> → 1, <i>x</i>²/<i>x</i> → 0, 3<i>x</i>/<i>x</i> → 3, et <i>x</i>/<i>x</i>² = 1/<i>x</i> n’a pas de limite finie. Il faut transformer l’expression.</p></div>`},
  {h:'Pourquoi sin x / x tend vers 1',p:`<p>En 0, sin <i>x</i> / <i>x</i> est une forme 0/0 qu’aucune factorisation ne lève. On l’encadre par la géométrie, puis on conclut avec un outil nouveau : le théorème des gendarmes.</p>
<div class="thm"><p><b>Théorème des gendarmes.</b> Si <i>g</i>(<i>x</i>) ≤ <i>f</i>(<i>x</i>) ≤ <i>h</i>(<i>x</i>) près de <i>a</i>, et si <i>g</i> et <i>h</i> tendent vers la même limite L, alors <i>f</i>(<i>x</i>) → L aussi.</p></div>
<div class="why"><p>Sur le cercle unité, pour 0 < <i>x</i> < π/2 (en radians), compare trois aires sur la figure : le petit triangle OAM (sin <i>x</i>/2), le secteur d’angle <i>x</i> (<i>x</i>/2) et le grand triangle de hauteur tan <i>x</i> (tan <i>x</i>/2). Ils sont emboîtés, donc <b>sin <i>x</i> ≤ <i>x</i> ≤ tan <i>x</i></b>. En divisant par sin <i>x</i> > 0 et en passant aux inverses : <b>cos <i>x</i> ≤ sin <i>x</i> / <i>x</i> ≤ 1</b>. Comme cos <i>x</i> → 1, le quotient est coincé entre deux gendarmes qui tendent vers 1. Pour <i>x</i> < 0, sin(−<i>x</i>)/(−<i>x</i>) = sin <i>x</i> / <i>x</i> : même conclusion.</p></div>
<div class="ex"><p><i>x</i> = 0,5 : sin 0,5 / 0,5 ≈ 0,9589, et on a bien cos 0,5 ≈ 0,8776 ≤ 0,9589 ≤ 1. Pour <i>x</i> = 0,1 : sin 0,1 / 0,1 ≈ 0,9983.</p></div>
<div class="warn"><p>Ce résultat suppose <i>x</i> en radians. Avec un angle en degrés, sin(<i>x</i>°)/<i>x</i> tend vers π/180 ≈ 0,0175.</p></div>`,
   fig:(()=>{ const x=0.7,c=Math.cos(x),s=Math.sin(x),t=Math.tan(x),P=plane({x:[-0.15,1.45],y:[-0.15,1.0],grid:false}); P.curve(u=>Math.cos(u),u=>Math.sin(u),0,Math.PI/2,{c:'var(--muted)',w:1.5}).poly([[0,0],[1,0],[1,t]],{fill:'var(--spark)',fo:.15,c:'var(--spark)',w:1.5}).poly([[0,0],[1,0],[c,s]],{fill:'var(--math)',fo:.3,c:'var(--math)',w:1.5}).curve(u=>Math.cos(u),u=>Math.sin(u),0,x,{c:'var(--accent)',w:3.5}).seg(c,0,c,s,{c:'var(--ink)',w:2.5}).text(c,s/2,'sin x',{a:'end',dx:-4}).text(1,t/2,'tan x',{dx:6}).text(Math.cos(.35),Math.sin(.35),'x',{c:'var(--accent)',a:'end',dx:-4}).dot(0,0,{r:3,c:'var(--ink)',l:'O',dx:-6,dy:16}).dot(1,0,{r:3,c:'var(--ink)',l:'A',dy:16}).dot(c,s,{r:3,c:'var(--ink)',l:'M'}); return P.svg(); })()},
  {kind:'Méthode',h:'Lever une forme 0/0',
   p:'Si remplacer x par a donne <b>0/0</b>, on ne peut rien conclure : il faut transformer l’expression. <b>Fraction de polynômes</b> : factorise le numérateur et le dénominateur par (x − a), simplifie, puis remplace. <b>Avec un sinus</b> : utilise la limite remarquable <b>sin u / u → 1 quand u → 0</b>, en faisant apparaître le même u en haut et en bas : sin(kx)/x = k · sin(kx)/(kx).',
   demo:{enonce:'Calculer la limite de (x² − 9)/(x − 3) quand x → 3, puis celle de sin(5x)/x quand x → 0.',
    etapes:[
     {f:'En x = 3 : (9 − 9)/(3 − 3) = 0/0',w:'Forme indéterminée : il faut transformer.'},
     {f:'(x² − 9)/(x − 3) = (x − 3)(x + 3)/(x − 3) = x + 3 → 6',w:'Identité a² − b², puis on simplifie par x − 3, qui n’est pas nul car x ≠ 3.'},
     {f:'sin(5x)/x = 5 · sin(5x)/(5x)',w:'On multiplie et on divise par 5 pour avoir le même 5x en haut et en bas.'},
     {f:'u = 5x → 0, donc sin(5x)/(5x) → 1 et la limite vaut 5',w:'Limite remarquable.'}],
    conclusion:'Les deux limites valent 6 et 5.'}},
  {h:'Une limite célèbre',p:'Combien vaut la limite de <i>sin(x)/x</i> quand x → 0&nbsp;?',
   fig:(()=>{ const P=plane({x:[-10,10],y:[-0.5,1.3],h:160,grid:false,lx:5,ly:1}); P.fn(x=>Math.abs(x)<1e-6?1:Math.sin(x)/x,{n:400}); return P.svg(); })(),
   opts:['0','1','+∞','Elle n’existe pas'],ans:1,why:'Près de 0, sin x ≈ x. Le quotient tend vers 1, même si la fonction n’est pas définie en 0.'},
  {h:'Avec un sinus',p:'Combien vaut la limite de <i>sin(4x)/(2x)</i> quand x → 0&nbsp;?',ans:2,why:'sin(4x)/(2x) = 2 · sin(4x)/(4x) → 2 · 1 = 2.'},
  {h:'Continuité, limites à gauche et à droite',p:`<p>Une fonction continue est une fonction dont on trace le graphe sans lever le crayon. Pour en faire une définition utilisable, on dit simplement : la limite en <i>a</i> est la valeur en <i>a</i>.</p>
<div class="def"><p><i>f</i> est <b>continue en <i>a</i></b> si elle est définie en <i>a</i> et si <b>lim<sub><i>x</i>→<i>a</i></sub> <i>f</i>(<i>x</i>) = <i>f</i>(<i>a</i>)</b>. La <b>limite à droite</b>, notée lim<sub><i>x</i>→<i>a</i>⁺</sub>, ne regarde que les <i>x</i> > <i>a</i> ; la <b>limite à gauche</b>, lim<sub><i>x</i>→<i>a</i>⁻</sub>, que les <i>x</i> < <i>a</i>. La limite existe si et seulement si les deux existent et sont égales.</p></div>
<div class="idea"><p>Un saut dans le graphe, c’est deux limites latérales différentes : aucune valeur <i>f</i>(<i>a</i>) ne peut recoller les deux morceaux. Un trou isolé, au contraire, se bouche en posant <i>f</i>(<i>a</i>) égal à la limite.</p></div>
<div class="ex"><p>La partie entière ⌊<i>x</i>⌋, le plus grand entier ≤ <i>x</i>, vaut 0 sur [0 ; 1[ et 1 sur [1 ; 2[ (figure : point plein, valeur prise ; rond vide, valeur non prise). En 1, la limite à gauche vaut 0 et la limite à droite 1 : ⌊<i>x</i>⌋ n’a pas de limite en 1 et n’y est pas continue. Par contre, polynômes, sin, cos et exp sont continus partout ; sommes, produits, quotients (là où le bas ne s’annule pas) et composées de fonctions continues le sont aussi, par les règles de calcul des limites.</p></div>
<div class="warn"><p>sin(1/<i>x</i>) n’a pas de limite en 0, même d’un seul côté : elle oscille entre −1 et 1 de plus en plus vite. Une limite peut manquer sans qu’il y ait de saut net.</p></div>`,
   fig:(()=>{ const P=plane({x:[-1.5,3.5],y:[-1.5,2.5],lab:1}); for(let k=-1;k<=2;k++){ P.seg(k,k,Math.min(k+1,3.5),k,{w:3}); if(k<2) P.circ(k+1,k,.08,{c:'var(--accent)',w:2,fill:'var(--surface)',fo:1}); P.dot(k,k,{r:4,c:'var(--accent)'}); } return P.svg(); })()},
  {h:'Le théorème des valeurs intermédiaires',p:`<p>L’équation <i>x</i>³ + <i>x</i> − 1 = 0 n’a pas de solution évidente. Peut-on au moins être sûr qu’elle en a une, sans la calculer&nbsp;? La continuité répond oui.</p>
<div class="thm"><p><b>Théorème des valeurs intermédiaires.</b> Si <i>f</i> est <b>continue sur [<i>a</i> ; <i>b</i>]</b>, elle prend toute valeur comprise entre <i>f</i>(<i>a</i>) et <i>f</i>(<i>b</i>). En particulier, si <i>f</i>(<i>a</i>) et <i>f</i>(<i>b</i>) sont de signes contraires, il existe <i>c</i> ∈ [<i>a</i> ; <i>b</i>] tel que <i>f</i>(<i>c</i>) = 0.</p></div>
<div class="why"><p>Idée de preuve, la <b>dichotomie</b> : on coupe [<i>a</i> ; <i>b</i>] en son milieu <i>m</i> et, selon le signe de <i>f</i>(<i>m</i>), on garde la moitié où le signe change encore. Les intervalles emboîtés rétrécissent vers un point <i>c</i>. Si <i>f</i>(<i>c</i>) était > 0, par continuité <i>f</i> serait > 0 tout près de <i>c</i>, donc aux deux bords d’un intervalle assez petit, alors que chaque intervalle a un bord où <i>f</i> est ≤ 0 : impossible. De même pour <i>f</i>(<i>c</i>) < 0.</p></div>
<div class="ex"><p><i>g</i>(<i>x</i>) = <i>x</i>³ + <i>x</i> − 1 : <i>g</i>(0) = −1 et <i>g</i>(1) = 1, une racine est dans [0 ; 1]. <i>g</i>(0,5) = −0,375 < 0 : elle est dans [0,5 ; 1]. <i>g</i>(0,75) ≈ 0,172 > 0 : elle est dans [0,5 ; 0,75]. On continue jusqu’à la précision voulue ; la racine vaut environ 0,682.</p></div>
<div class="warn"><p>Sans continuité, le théorème tombe : 1/<i>x</i> vaut −1 en −1 et 1 en 1, mais ne s’annule jamais, car elle saute en 0. Et le théorème garantit <b>au moins</b> une solution, pas une seule.</p></div>`},
  {kind:'Méthode',h:'Prolonger par continuité, valeurs intermédiaires',
   p:'f est <b>continue en a</b> si f(x) → f(a) quand x → a. Si f n’est pas définie en a mais y a une limite finie ℓ, on la <b>prolonge par continuité</b> en posant f(a) = ℓ. Si les <b>limites à gauche et à droite</b> diffèrent, il n’y a pas de limite, donc pas de prolongement. <b>Théorème des valeurs intermédiaires</b> : si f est continue sur [a ; b] et que f(a) et f(b) sont de signes contraires, f s’annule au moins une fois entre a et b.',
   demo:{enonce:'Prolonger f(x) = (x² − 1)/(x − 1) en 1. Étudier h(x) = |x − 1|/(x − 1) en 1. Montrer que x³ + x − 1 = 0 a une solution dans [0 ; 1].',
    etapes:[
     {f:'f(x) = x + 1 pour x ≠ 1, qui tend vers 2 : on pose f(1) = 2',w:'On lève la forme 0/0, puis on choisit la valeur manquante.'},
     {f:'h(x) vaut 1 si x > 1 et −1 si x < 1',w:'On étudie chaque côté séparément, car la valeur absolue change d’expression en 1.'},
     {f:'Limite à droite 1, limite à gauche −1 : pas de prolongement',w:'Une limite exige que les deux côtés soient d’accord.'},
     {f:'g(x) = x³ + x − 1 : g(0) = −1 < 0 et g(1) = 1 > 0',w:'g est un polynôme, donc continue sur [0 ; 1], et elle change de signe : elle s’annule entre 0 et 1.'}],
    conclusion:'f se prolonge par f(1) = 2, h ne se prolonge pas, et x³ + x − 1 = 0 a au moins une solution dans [0 ; 1].'}},
  {kind:'Défi',h:'Valeurs intermédiaires',p:'f est continue sur [0 ; 2], f(0) = −1 et f(2) = 3. Que peut-on affirmer à coup sûr&nbsp;?',
   opts:['f s’annule au moins une fois entre 0 et 2','f est croissante','f(1) = 1','f s’annule exactement une fois'],ans:0,
   why:'Une fonction continue ne saute pas de valeurs : pour passer de −1 à 3, elle prend la valeur 0 au moins une fois. Rien n’empêche qu’elle le fasse plusieurs fois.'},
  {kind:'Méthode',h:'ε–δ quand un facteur varie',
   p:'Pour une fonction non affine, |f(x) − L| s’écrit souvent |x − a| · |g(x)|, où le facteur |g(x)| dépend de x. 1) Impose d’abord <b>|x − a| ≤ 1</b> pour <b>borner</b> |g(x)| par une constante C. 2) Il suffit alors que |x − a| < ε/C. 3) Pose <b>δ = min(1 ; ε/C)</b>, qui respecte les deux conditions à la fois.',
   demo:{enonce:'Prouver que x² → 4 quand x → 2.',
    etapes:[
     {f:'|x² − 4| = |x − 2| · |x + 2|',w:'Identité a² − b² : on fait apparaître |x − a|.'},
     {f:'Si |x − 2| ≤ 1, alors 1 ≤ x ≤ 3, donc |x + 2| ≤ 5',w:'On borne le facteur variable par une constante : C = 5.'},
     {f:'Soit ε > 0. Posons δ = min(1 ; ε/5).',w:'Le min garantit à la fois |x − 2| ≤ 1 et |x − 2| < ε/5.'},
     {f:'Si |x − 2| < δ : |x² − 4| ≤ 5 · |x − 2| < 5 · ε/5 = ε ✓',w:'On combine la borne et la marge.'}],
    conclusion:'δ = min(1 ; ε/5) convient pour tout ε > 0 : x² tend vers 4 quand x → 2.'}},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>lim<sub><i>x</i>→<i>a</i></sub> <i>f</i>(<i>x</i>) = L : ∀ε > 0, ∃δ > 0, 0 < |<i>x</i> − <i>a</i>| < δ ⟹ |<i>f</i>(<i>x</i>) − L| < ε. δ peut dépendre de ε, jamais de <i>x</i>.</li>
<li>Preuve ε–δ : partir de |<i>f</i>(<i>x</i>) − L|, faire apparaître |<i>x</i> − <i>a</i>| ; si un facteur varie, le borner par C en imposant |<i>x</i> − <i>a</i>| ≤ 1, puis δ = min(1 ; ε/C).</li>
<li>Les limites passent aux sommes, produits et quotients (limite du bas non nulle). 0/0 est indéterminé : factoriser par (<i>x</i> − <i>a</i>) et simplifier.</li>
<li>Gendarmes : <i>g</i> ≤ <i>f</i> ≤ <i>h</i> et <i>g</i>, <i>h</i> → L, alors <i>f</i> → L. D’où sin <i>u</i> / <i>u</i> → 1 quand <i>u</i> → 0 (en radians), et sin(<i>kx</i>)/<i>x</i> → <i>k</i>.</li>
<li>Continuité en <i>a</i> : lim <i>f</i> = <i>f</i>(<i>a</i>). La limite existe ⟺ les limites à gauche et à droite existent et sont égales. Trou isolé : prolongement par continuité ; saut : aucun prolongement.</li>
<li>Valeurs intermédiaires : <i>f</i> continue sur [<i>a</i> ; <i>b</i>] avec <i>f</i>(<i>a</i>) et <i>f</i>(<i>b</i>) de signes contraires ⟹ au moins un zéro dans [<i>a</i> ; <i>b</i>]. La dichotomie l’approche.</li>
</ul></div>`},
  {kind:'Problème',h:'Boucher les trous',
   p:'Certaines fonctions ne sont pas définies en un point, mais on peut parfois les prolonger par continuité en choisissant bien la valeur manquante. On étudie <i>f(x) = sin(3x)/x</i> en 0, <i>g(x) = (x² − 4)/(x − 2)</i> en 2 et <i>h(x) = |x|/x</i> en 0.',
   parts:[
    {q:'a) Combien vaut la limite de sin(3x)/x quand x → 0 ?',ans:3,hint:'Écris sin(3x)/x = 3 · sin(3x)/(3x).',why:'sin(3x)/(3x) → 1 quand x → 0, donc la limite vaut 3.'},
    {q:'b) Quelle valeur g(2) faut-il choisir pour que g soit continue en 2 ?',lab:'g(2) =',ans:4,hint:'Factorise x² − 4.',why:'(x² − 4)/(x − 2) = x + 2 pour x ≠ 2, qui tend vers 4.'},
    {q:'c) Peut-on prolonger h(x) = |x|/x par continuité en 0 ?',opts:['Oui, avec h(0) = 0','Oui, avec h(0) = 1','Non : la limite à gauche vaut −1 et à droite 1','Non, car h n’est pas définie en 0'],ans:2,hint:'Regarde séparément x > 0 et x < 0.',why:'h vaut 1 pour x > 0 et −1 pour x < 0. Les limites à gauche et à droite diffèrent : pas de limite, donc pas de prolongement.'},
   ],
   sol:'f : sin(3x)/x = 3 · sin(3x)/(3x) → 3 · 1 = 3. On prolonge par f(0) = 3.<br>g : pour x ≠ 2, g(x) = (x − 2)(x + 2)/(x − 2) = x + 2 → 4. On prolonge par g(2) = 4.<br>h : h(x) = 1 si x > 0 et −1 si x < 0. Les limites à gauche (−1) et à droite (1) diffèrent.<br>Un prolongement par continuité exige une limite : h ne peut pas être prolongée.<br>Ne pas être défini en un point ne dit rien à lui seul : tout dépend de la limite.'},
  {kind:'Problème',h:'Prouver que x² tend vers 9',
   p:'On veut prouver avec la définition ε–δ que <i>x² → 9</i> quand <i>x → 3</i>. On écrit |x² − 9| = |x − 3| · |x + 3|. Le facteur |x − 3| est petit, mais |x + 3| dépend de x : il faut le borner.',
   params:[{id:'e',l:'ε',min:.5,max:3,step:.5,v:2},{id:'d',l:'δ',min:.05,max:1,step:.05,v:.6}],
   draw:v=>{ const P=plane({x:[1,5],y:[0,18],w:300,h:240,grid:false,lx:1,ly:3}), ok=v.d*(6+v.d)<=v.e+1e-9;
     P.rect(1,9-v.e,4,2*v.e,{fill:'var(--spark)',fo:.25,c:null}).rect(3-v.d,0,2*v.d,18,{fill:'var(--math)',fo:.15,c:null}).fn(x=>x*x,{c:'var(--muted)',w:2}).fn(x=>x*x,{from:3-v.d,to:3+v.d,c:ok?'var(--ok)':'var(--bad)',w:5}).dot(3,9,{c:'var(--ink)',r:4}); return P.svg(); },
   info:v=>`sur la marge, |x² − 9| ≤ ${fmt(v.d*(6+v.d),3)} : ${v.d*(6+v.d)<=v.e+1e-9?'dans la bande ε':'sort de la bande ε'}`,
   parts:[
    {q:'a) Si |x − 3| ≤ 1, quelle est la plus grande valeur possible de |x + 3| ?',ans:7,hint:'Alors x est entre 2 et 4.',why:'x ∈ [2 ; 4], donc x + 3 ∈ [5 ; 7] et |x + 3| ≤ 7.'},
    {q:'b) On choisit δ = min(1 ; ε/7). Pour ε = 0,7, combien vaut δ ?',lab:'δ =',ans:.1,tol:.001,hint:'Compare 1 et 0,7/7.',why:'min(1 ; 0,1) = 0,1. Alors |x² − 9| ≤ 7 · 0,1 = 0,7.'},
    {q:'c) Pourquoi le min avec 1 est-il nécessaire ?',opts:['Pour que δ soit positif','Pour que la borne |x + 3| ≤ 7 soit valable','Parce que ε est toujours plus petit que 1','Il n’est pas nécessaire, δ = ε/7 suffit toujours'],ans:1,hint:'Essaie ε = 70 avec δ = ε/7 = 10.',why:'La borne |x + 3| ≤ 7 n’est vraie que si |x − 3| ≤ 1. Avec ε = 70 et δ = 10, x = 13 donne |x² − 9| = 160 > 70.'},
    {q:'d) Pour ε = 14, combien vaut δ = min(1 ; ε/7) ?',lab:'δ =',ans:1,tol:.001,hint:'Compare 1 et 14/7.',why:'min(1 ; 2) = 1. Et en effet |x − 3| ≤ 1 donne |x² − 9| ≤ 7 ≤ 14.'},
   ],
   sol:'Soit ε > 0. On pose δ = min(1 ; ε/7).<br>Si |x − 3| < δ, alors |x − 3| < 1, donc 2 < x < 4 et |x + 3| < 7.<br>D’où |x² − 9| = |x − 3| · |x + 3| < (ε/7) · 7 = ε.<br>Comme ε est quelconque, lim x² = 9 quand x → 3.<br>Le « 1 » est arbitraire : il sert seulement à borner le facteur |x + 3|. Tout autre choix fixe marcherait, avec une autre constante.'},
 ]},

{id:'series',br:'ana',lv:'uni',h:'Séries et Taylor',p:'Approcher les fonctions par des polynômes.',
 lessons:['Polynômes de Taylor','Séries géométriques','Critères de convergence','Rayon de convergence'],
 steps:[
  {h:'Imiter sin x avec un polynôme',p:`<p>Une calculatrice ne sait faire que des additions et des multiplications. Pour calculer sin 0,3, elle évalue un polynôme qui imite le sinus. Quels coefficients choisir, et jusqu’où l’imitation tient-elle&nbsp;?</p>
<div class="def"><p>Le <b>polynôme de Taylor</b> de degré <i>n</i> (impair) de sin <i>x</i> en 0 est <b><i>x</i> − <i>x</i>³/3! + <i>x</i>⁵/5! − … ± <i>x</i>ⁿ/<i>n</i>!</b>. La notation <i>n</i>! (« factorielle <i>n</i> ») désigne 1·2·3·…·<i>n</i> : 3! = 6 et 5! = 120.</p></div>
<div class="idea"><p>Augmente le degré. La courbe fine du polynôme colle à la courbe épaisse de sin <i>x</i> sur une zone de plus en plus large autour de 0, puis s’en écarte brutalement. Chaque nouveau terme corrige l’erreur du précédent un peu plus loin de 0.</p></div>
<div class="ex"><p>Pour <i>x</i> = 0,3 : 0,3 − 0,3³/6 = 0,3 − 0,0045 = 0,2955, alors que sin 0,3 ≈ 0,29552. Avec un seul terme correctif, on a déjà 4 décimales justes.</p></div>
<div class="warn"><p>L’approximation n’est bonne que <b>près de 0</b>. Pour <i>x</i> = 6, le degré 3 donne 6 − 216/6 = −30, très loin de sin 6 ≈ −0,28 : il faut monter beaucoup plus haut en degré.</p></div>`,
   params:[{id:'n',l:'Degré',min:1,max:13,step:2,v:1}],
   draw:v=>{ const T=x=>{ let s=0,t=x; for(let k=1;k<=v.n;k+=2){ s+=t; t*=-x*x/((k+1)*(k+2)); } return s; };
     const P=plane({x:[-7,7],y:[-3,3],h:200,grid:false,lx:2,ly:1}); P.fn(Math.sin,{c:'var(--muted)',w:5,op:.6}).fn(T,{n:400}); return P.svg(); },
   info:v=>{ const t=['x']; for(let k=3;k<=v.n;k+=2) t.push(`${k%4===3?'−':'+'} x${['','','','³','','⁵','','⁷','','⁹','','¹¹','','¹³'][k]}/${k}!`); return t.join(' '); }},
  {h:'Une somme infinie est une limite',p:`<p>Que veut dire additionner une infinité de nombres&nbsp;? On ne peut pas tout ajouter, mais on peut ajouter de plus en plus de termes et regarder où vont les totaux.</p>
<div class="def"><p>La <b>série</b> Σ <i>a</i>ₙ est la suite de ses <b>sommes partielles</b> Sₙ = <i>a</i>₀ + <i>a</i>₁ + … + <i>a</i>ₙ. Elle <b>converge</b> vers S si Sₙ → S quand <i>n</i> → ∞ ; on écrit alors <b>Σₙ₌₀^∞ <i>a</i>ₙ = S</b>. Sinon, elle <b>diverge</b>. Le symbole Σ (sigma majuscule) se lit « somme de ».</p></div>
<div class="why"><p>Pour la <b>série géométrique</b> <i>a</i>ₙ = <i>q</i>ⁿ : Sₙ = 1 + <i>q</i> + … + <i>q</i>ⁿ et <i>q</i>Sₙ = <i>q</i> + <i>q</i>² + … + <i>q</i>ⁿ⁺¹. En soustrayant, presque tout se simplifie : (1 − <i>q</i>)Sₙ = 1 − <i>q</i>ⁿ⁺¹, d’où <b>Sₙ = (1 − <i>q</i>ⁿ⁺¹)/(1 − <i>q</i>)</b> pour <i>q</i> ≠ 1. Si |<i>q</i>| < 1, <i>q</i>ⁿ⁺¹ → 0 et Sₙ → 1/(1 − <i>q</i>).</p></div>
<div class="ex"><p><i>q</i> = 1/3 : S₂ = 1 + 1/3 + 1/9 = 13/9, et la formule donne (1 − 1/27)/(2/3) = (26/27)·(3/2) = 13/9 ✓. Les sommes partielles 1 ; 1,333 ; 1,444 ; 1,481 ; … s’approchent de 1/(1 − 1/3) = 1,5 (figure).</p></div>
<div class="warn"><p>Si |<i>q</i>| ≥ 1, <i>q</i>ⁿ⁺¹ ne tend pas vers 0 : avec <i>q</i> = 1, Sₙ = <i>n</i> + 1 → ∞ ; avec <i>q</i> = −1, Sₙ vaut 1, 0, 1, 0, … sans limite.</p></div>`,
   fig:(()=>{ const P=plane({x:[-0.5,7],y:[0,1.8],h:170,grid:false,lx:1,ly:.5}); P.seg(0,1.5,7,1.5,{c:'var(--muted)',w:1.5,dash:true}).text(7,1.5,'1,5',{a:'end',dy:-6,c:'var(--muted)'}); let s=0; const pts=[]; for(let n=0;n<=6;n++){ s+=Math.pow(1/3,n); pts.push([n,s]); } P.poly(pts,{open:true,c:'var(--accent)',w:2}); pts.forEach(p=>P.dot(p[0],p[1],{r:4})); return P.svg(); })()},
  {kind:'Méthode',h:'Série géométrique et convergence',
   p:'<b>Σₙ₌₀^∞ qⁿ = 1/(1 − q)</b> si |q| < 1, et la série diverge si |q| ≥ 1. Une série Σ (x/R)ⁿ converge donc si |x| < R : R est son <b>rayon de convergence</b>. Test de base : si le <b>terme général ne tend pas vers 0</b>, la série diverge. L’inverse est faux : 1/n → 0, mais la série harmonique Σ 1/n diverge.',
   demo:{enonce:'Calculer Σₙ₌₀^∞ (2/5)ⁿ et Σₙ₌₁^∞ (2/5)ⁿ. Puis trouver où Σ (x/4)ⁿ converge, et sa somme.',
    etapes:[
     {f:'Σₙ₌₀^∞ (2/5)ⁿ = 1/(1 − 2/5) = 5/3',w:'Raison 2/5, de valeur absolue < 1.'},
     {f:'Σₙ₌₁^∞ (2/5)ⁿ = 5/3 − 1 = 2/3',w:'On retire le terme n = 0, qui vaut 1.'},
     {f:'Σ (x/4)ⁿ converge si |x/4| < 1 ⟺ |x| < 4',w:'La raison est x/4 : le rayon de convergence vaut 4.'},
     {f:'Somme : 1/(1 − x/4) = 4/(4 − x)',w:'On multiplie le haut et le bas par 4.'}],
    conclusion:'Les sommes valent 5/3 et 2/3. La série Σ (x/4)ⁿ converge pour |x| < 4, vers 4/(4 − x).'}},
  {h:'Série géométrique',p:'Combien vaut 1 + ½ + ¼ + ⅛ + …&nbsp;?',ans:2,why:'Σ qⁿ = 1/(1 − q) pour |q| < 1. Avec q = ½ : 1/(1 − ½) = 2.'},
  {h:'D’où viennent les coefficients de Taylor',p:`<p>Pour imiter <i>f</i> près de 0 avec un polynôme P, on demande à P d’avoir la même valeur que <i>f</i> en 0, la même pente, la même courbure, et ainsi de suite. Cette exigence fixe tous les coefficients.</p>
<div class="prop"><p>Si P(<i>x</i>) = <i>c</i>₀ + <i>c</i>₁<i>x</i> + <i>c</i>₂<i>x</i>² + … + <i>c</i>ₙ<i>x</i>ⁿ a les mêmes dérivées que <i>f</i> en 0 jusqu’à l’ordre <i>n</i>, alors <b><i>c</i>ₖ = <i>f</i>⁽ᵏ⁾(0)/<i>k</i>!</b>, où <i>f</i>⁽ᵏ⁾ est la dérivée <i>k</i>-ième (<i>f</i>⁽⁰⁾ = <i>f</i>).</p></div>
<div class="why"><p>Dérive <i>x</i>ᵏ <i>k</i> fois : on obtient <i>k</i>·(<i>k</i> − 1)·…·1 = <i>k</i>!, une constante. Les puissances plus petites ont disparu, et les plus grandes valent encore 0 en <i>x</i> = 0. Donc P⁽ᵏ⁾(0) = <i>k</i>!·<i>c</i>ₖ, et l’égalité avec <i>f</i>⁽ᵏ⁾(0) donne <i>c</i>ₖ.</p></div>
<div class="ex"><p><i>f</i>(<i>x</i>) = eˣ : toutes les dérivées sont eˣ, qui vaut 1 en 0, donc <i>c</i>ₖ = 1/<i>k</i>!. À l’ordre 3 : eˣ ≈ 1 + <i>x</i> + <i>x</i>²/2 + <i>x</i>³/6. En <i>x</i> = 0,5 : 1 + 0,5 + 0,125 + 0,0208 ≈ 1,6458, contre e^{0,5} ≈ 1,6487.</p></div>
<div class="blk" data-t="L’erreur"><p>Près de 0, l’écart <i>f</i>(<i>x</i>) − Pₙ(<i>x</i>) est de l’ordre de <i>x</i>ⁿ⁺¹ : plus <i>x</i> est petit, plus chaque degré supplémentaire est efficace. La <b>série de Taylor</b> prolonge le polynôme à l’infini ; pour eˣ, sin <i>x</i> et cos <i>x</i>, elle converge vers la fonction pour tout <i>x</i>.</p></div>`},
  {kind:'Méthode',h:'Écrire un polynôme de Taylor',
   p:'Le polynôme de Taylor d’ordre n de f en 0 est <b>f(0) + f′(0)x + f″(0)x²/2! + … + f⁽ⁿ⁾(0)xⁿ/n!</b>. À connaître : <b>eˣ = Σ xⁿ/n!</b>, sin x = x − x³/3! + x⁵/5! − …, cos x = 1 − x²/2! + x⁴/4! − …, et 1/(1 − x) = Σ xⁿ. Pour une composée comme e^{2x} ou e^{−x²}, on <b>remplace</b> la variable par l’expression dans la série connue.',
   demo:{enonce:'Écrire le polynôme de Taylor d’ordre 4 de cos x, puis celui d’ordre 3 de e^{2x}.',
    etapes:[
     {f:'cos 0 = 1, cos′(0) = −sin 0 = 0, cos″(0) = −1, cos‴(0) = 0, cos⁽⁴⁾(0) = 1',w:'Les dérivées de cos reviennent tous les 4 crans.'},
     {f:'cos x ≈ 1 − x²/2 + x⁴/24',w:'On divise chaque dérivée par k! : 2! = 2 et 4! = 24.'},
     {f:'eᵘ ≈ 1 + u + u²/2 + u³/6, avec u = 2x',w:'On part de la série connue de l’exponentielle.'},
     {f:'e^{2x} ≈ 1 + 2x + 2x² + 4x³/3',w:'(2x)²/2 = 2x² et (2x)³/6 = 8x³/6 = 4x³/3.'}],
    conclusion:'Près de 0 : cos x ≈ 1 − x²/2 + x⁴/24 et e^{2x} ≈ 1 + 2x + 2x² + 4x³/3.'}},
  {h:'Taylor de eˣ',p:'Le développement de <i>eˣ</i> en 0 à l’ordre 2 est…',opts:['1 + x + x²','1 + x + x²/2','x + x²/2','1 + 2x'],ans:1,why:'Toutes les dérivées de eˣ valent 1 en 0, donc eˣ ≈ 1 + x + x²/2! .'},
  {h:'Des termes qui tendent vers 0 ne suffisent pas',p:`<p>Une série qui converge ajoute des quantités de plus en plus petites. Mais des termes qui deviennent petits garantissent-ils la convergence&nbsp;? Non, et c’est le piège principal du chapitre.</p>
<div class="prop"><p><b>Condition nécessaire.</b> Si Σ <i>a</i>ₙ converge, alors <b><i>a</i>ₙ → 0</b>. Autrement dit, si <i>a</i>ₙ ne tend pas vers 0, la série diverge.</p></div>
<div class="why"><p><i>a</i>ₙ = Sₙ − Sₙ₋₁. Si Sₙ → S, alors Sₙ₋₁ → S aussi, et <i>a</i>ₙ → S − S = 0.</p></div>
<div class="ex"><p>La <b>série harmonique</b> 1 + ½ + ⅓ + ¼ + … a des termes qui tendent vers 0. On les groupe : ⅓ + ¼ ≥ ¼ + ¼ = ½, puis ⅕ + ⅙ + ⅐ + ⅛ ≥ 4·⅛ = ½, puis les 8 termes suivants dépassent 8·1/16 = ½, et ainsi de suite. La somme des 2ᵏ premiers termes vaut donc au moins 1 + <i>k</i>/2, qui dépasse toute borne : la série <b>diverge</b>. Par exemple, la somme des 8 premiers termes vaut environ 2,72, et 1 + 3/2 = 2,5.</p></div>
<div class="warn"><p>Σ 1/<i>n</i>² converge, vers π²/6 ≈ 1,645 : ses termes tendent vers 0 beaucoup plus vite. Ce n’est pas le fait de tendre vers 0 qui décide, c’est la <b>vitesse</b>.</p></div>`},
  {kind:'Défi',h:'La série harmonique',p:'1 + ½ + ⅓ + ¼ + …',opts:['converge vers 2','converge vers ln 2','diverge','converge vers π²/6'],ans:2,why:'Elle grandit sans limite, très lentement (comme ln n). C’est Σ 1/n² qui vaut π²/6.'},
  {h:'Séries entières et rayon de convergence',p:`<p>Une série de Taylor est une somme infinie de puissances de <i>x</i>. Pour quelles valeurs de <i>x</i> cette somme a-t-elle un sens&nbsp;? La réponse a toujours la même forme : un intervalle centré en 0.</p>
<div class="def"><p>Une <b>série entière</b> est une série Σ <i>c</i>ₙ<i>x</i>ⁿ. Il existe un nombre <b>R</b> entre 0 et +∞, son <b>rayon de convergence</b>, tel que la série converge pour |<i>x</i>| < R et diverge pour |<i>x</i>| > R.</p></div>
<div class="idea"><p>On compare à une série géométrique. Le rapport de deux termes successifs, |<i>c</i>ₙ₊₁/<i>c</i>ₙ|·|<i>x</i>|, joue le rôle de la raison. S’il finit par rester sous un nombre < 1, les termes décroissent au moins aussi vite qu’une série géométrique convergente ; s’il dépasse 1, les termes grossissent et ne tendent pas vers 0. Si |<i>c</i>ₙ₊₁/<i>c</i>ₙ| tend vers ℓ, on obtient <b>R = 1/ℓ</b> (et R = +∞ si ℓ = 0).</p></div>
<div class="ex"><p>Σ <i>x</i>ⁿ/<i>n</i>! : le rapport des coefficients vaut 1/(<i>n</i> + 1) → 0, donc R = +∞ : la série de eˣ converge partout. Σ <i>n</i>·<i>x</i>ⁿ : (<i>n</i> + 1)/<i>n</i> → 1, donc R = 1. Σ 2ⁿ<i>x</i>ⁿ : rapport 2, donc R = ½.</p></div>
<div class="warn"><p>Sur le bord |<i>x</i>| = R, le théorème ne dit rien : il faut étudier chaque cas. Σ <i>x</i>ⁿ/<i>n</i> diverge en <i>x</i> = 1 (série harmonique) mais converge en <i>x</i> = −1 (série alternée).</p></div>`},
  {kind:'Méthode',h:'Dériver ou intégrer terme à terme',
   p:'À l’intérieur de son disque de convergence (|x| < R), une série entière se <b>dérive</b> et s’<b>intègre terme à terme</b>, avec le même rayon. On part d’une somme connue, on dérive ou on intègre des deux côtés, puis on évalue en une valeur de x bien choisie pour obtenir une nouvelle somme.',
   demo:{enonce:'Calculer Σₙ₌₁^∞ n/2ⁿ.',
    etapes:[
     {f:'Σₙ₌₀^∞ xⁿ = 1/(1 − x) pour |x| < 1',w:'Somme connue, de rayon 1.'},
     {f:'Σₙ₌₁^∞ n·xⁿ⁻¹ = 1/(1 − x)²',w:'On dérive terme à terme des deux côtés.'},
     {f:'Σₙ₌₁^∞ n·xⁿ = x/(1 − x)²',w:'On multiplie par x pour retrouver la puissance xⁿ.'},
     {f:'En x = ½ : Σ n/2ⁿ = (½)/(½)² = 2',w:'½ est bien dans le disque de convergence.'}],
    conclusion:'Σₙ₌₁^∞ n/2ⁿ = 2.'},
   note:'Intégrer marche de la même façon : ∫₀¹ x²ⁿ dx = 1/(2n + 1). C’est ainsi qu’on intègre une série de Taylor terme à terme.'},
  {h:'À toi',p:'Calcule Σₙ₌₁^∞ n/4ⁿ. (fraction ou décimale)',ans:4/9,tol:.003,why:'Σ n·xⁿ = x/(1 − x)², évalué en x = ¼ : (¼)/(¾)² = (¼)·(16/9) = 4/9 ≈ 0,444.'},
  {h:'Pourquoi une série alternée converge',p:`<p>Les termes de 1 − ½ + ⅓ − ¼ + … ne décroissent pas assez vite pour converger sans les signes : sans eux, c’est la série harmonique. C’est l’alternance des signes qui sauve la convergence.</p>
<div class="thm"><p><b>Critère des séries alternées.</b> Si <i>a</i>ₙ ≥ 0 <b>décroît</b> et <b>tend vers 0</b>, la série Σ (−1)ⁿ<i>a</i>ₙ converge, et sa somme S est toujours comprise entre deux sommes partielles consécutives. Par conséquent <b>|S − Sₙ| ≤ <i>a</i>ₙ₊₁</b>.</p></div>
<div class="why"><p>On ajoute, on retire un peu moins, on ajoute encore un peu moins… Les sommes partielles font des allers-retours de plus en plus courts (figure) : une sur deux descend, l’autre monte, et l’écart entre deux consécutives vaut <i>a</i>ₙ₊₁, qui tend vers 0. Elles se resserrent sur une limite S, coincée dans chaque intervalle entre Sₙ et Sₙ₊₁.</p></div>
<div class="ex"><p>Pour 1 − ½ + ⅓ − ¼ + ⅕ − … : les sommes partielles valent 1 ; 0,5 ; 0,833 ; 0,583 ; 0,783. La somme, ln 2 ≈ 0,693, est bien entre 0,583 et 0,783, et son écart à 0,583 est inférieur au terme suivant, ⅕ = 0,2.</p></div>
<div class="warn"><p>Les deux hypothèses comptent. Avec <i>a</i>ₙ = 1, qui ne tend pas vers 0, les sommes partielles valent 1, 0, 1, 0, … et la série diverge.</p></div>`,
   fig:(()=>{ const P=plane({x:[-0.5,10],y:[0.4,1.1],h:180,grid:false,lx:1,ly:.1}); P.seg(-0.5,Math.LN2,10,Math.LN2,{c:'var(--muted)',w:1.5,dash:true}).text(10,Math.LN2,'ln 2',{a:'end',dy:-6,c:'var(--muted)'}); let s=0; const pts=[]; for(let n=0;n<=9;n++){ s+=(n%2?-1:1)/(n+1); pts.push([n,s]); } P.poly(pts,{open:true,c:'var(--accent)',w:2}); pts.forEach(p=>P.dot(p[0],p[1],{r:4})); return P.svg(); })()},
  {kind:'Méthode',h:'Séries alternées : contrôler l’erreur',
   p:'Une série <b>alternée</b> s’écrit Σ (−1)ⁿaₙ avec aₙ ≥ 0. Si aₙ <b>décroît</b> et tend vers 0, elle converge (critère des séries alternées), et l’erreur commise en s’arrêtant est <b>plus petite que le premier terme omis</b>. Pour une précision voulue, cherche le premier terme plus petit que cette précision : c’est le premier qu’on peut omettre.',
   demo:{enonce:'S = 1 − 1/2 + 1/3 − 1/4 + … Approcher S avec 4 termes, puis trouver combien de termes garantissent une erreur < 0,01.',
    etapes:[
     {f:'Les termes 1/k décroissent vers 0, avec des signes alternés',w:'Le critère s’applique.'},
     {f:'S₄ = 1 − 1/2 + 1/3 − 1/4 = 7/12 ≈ 0,583',w:'Somme des 4 premiers termes.'},
     {f:'Erreur ≤ 1/5 = 0,2',w:'Le premier terme omis est 1/5.'},
     {f:'1/(N + 1) < 0,01 ⟺ N + 1 > 100 ⟺ N ≥ 100',w:'Avec N termes, le premier omis est 1/(N + 1). Avec 99 termes, il vaudrait 1/100, qui n’est pas strictement plus petit.'}],
    conclusion:'Avec 4 termes, S ≈ 0,583 à 0,2 près. Il faut 100 termes pour garantir une erreur < 0,01. (En fait, S = ln 2 ≈ 0,693.)'}},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Σ <i>a</i>ₙ converge si ses sommes partielles Sₙ ont une limite finie S.</li>
<li>Géométrique : Sₙ = (1 − <i>q</i>ⁿ⁺¹)/(1 − <i>q</i>) ; Σₙ₌₀^∞ <i>q</i>ⁿ = 1/(1 − <i>q</i>) si |<i>q</i>| < 1, divergence si |<i>q</i>| ≥ 1.</li>
<li>Si <i>a</i>ₙ ne tend pas vers 0, la série diverge. La réciproque est fausse : Σ 1/<i>n</i> diverge, alors que Σ 1/<i>n</i>² converge.</li>
<li>Taylor en 0 : <i>c</i>ₖ = <i>f</i>⁽ᵏ⁾(0)/<i>k</i>!. eˣ = Σ <i>x</i>ⁿ/<i>n</i>!, sin <i>x</i> = <i>x</i> − <i>x</i>³/3! + …, cos <i>x</i> = 1 − <i>x</i>²/2! + …, 1/(1 − <i>x</i>) = Σ <i>x</i>ⁿ. Pour une composée, on remplace la variable.</li>
<li>Série entière : convergence pour |<i>x</i>| < R, divergence pour |<i>x</i>| > R, avec R = 1/lim |<i>c</i>ₙ₊₁/<i>c</i>ₙ| ; le bord s’étudie à part.</li>
<li>Pour |<i>x</i>| < R, on dérive ou on intègre terme à terme, avec le même rayon : par exemple Σ <i>n</i><i>x</i>ⁿ = <i>x</i>/(1 − <i>x</i>)².</li>
<li>Série alternée à termes décroissant vers 0 : elle converge, et l’erreur est plus petite que le premier terme omis.</li>
</ul></div>`},
  {kind:'Problème',h:'Une série et sa dérivée',
   p:'On pose <i>f(x) = Σₙ₌₀^∞ (x/3)ⁿ</i>. C’est une série géométrique. On cherche où elle converge, sa somme, puis on la dérive terme à terme pour calculer une autre somme.',
   parts:[
    {q:'a) Quel est le rayon de convergence de cette série ?',lab:'R =',ans:3,hint:'Une série géométrique converge si et seulement si |raison| < 1.',why:'|x/3| < 1 ⟺ |x| < 3. Le rayon vaut 3.'},
    {q:'b) Combien vaut f(1) ?',ans:1.5,tol:.001,hint:'Σ qⁿ = 1/(1 − q).',why:'1/(1 − 1/3) = 3/2.'},
    {q:'c) Que se passe-t-il en x = −3 ?',opts:['La série vaut 1/2','La série vaut 0','La série diverge : ses termes (−1)ⁿ ne tendent pas vers 0','La série converge, car |x| = R'],ans:2,hint:'Regarde le terme général.',why:'Le terme général (−1)ⁿ ne tend pas vers 0 : condition nécessaire violée, la série diverge.'},
    {q:'d) En dérivant f terme à terme, calcule Σₙ₌₁^∞ n/3ⁿ.',ans:.75,tol:.001,hint:'f(x) = 3/(3 − x) et f′(x) = Σ n xⁿ⁻¹/3ⁿ. Évalue en x = 1.',why:'f′(x) = 3/(3 − x)², donc f′(1) = 3/4 = Σ n/3ⁿ.'},
   ],
   sol:'f(x) = Σ (x/3)ⁿ converge si |x| < 3, et vaut 1/(1 − x/3) = 3/(3 − x).<br>f(1) = 3/2. En x = ±3, le terme général ne tend pas vers 0 : divergence.<br>Une série entière se dérive terme à terme dans son disque de convergence : f′(x) = Σₙ≥₁ n xⁿ⁻¹/3ⁿ = 3/(3 − x)².<br>En x = 1 : Σ n/3ⁿ = 3/4.'},
  {kind:'Problème',h:'L’intégrale de la cloche',
   p:'L’intégrale <i>I = ∫₀¹ e^{−x²} dx</i> n’a pas de primitive élémentaire. On remplace e^{−x²} par sa série de Taylor, on intègre terme à terme et on contrôle l’erreur avec le critère des séries alternées.',
   parts:[
    {q:'a) Quelle est la série de e^{−x²} ?',opts:['Σ x²ⁿ/n!','Σ (−1)ⁿ x²ⁿ/n!','Σ (−1)ⁿ x²ⁿ/(2n)!','Σ (−1)ⁿ xⁿ/n!'],ans:1,hint:'Remplace u par −x² dans eᵘ = Σ uⁿ/n!.',why:'(−x²)ⁿ = (−1)ⁿ x²ⁿ, donc e^{−x²} = Σ (−1)ⁿ x²ⁿ/n!.'},
    {q:'b) En intégrant de 0 à 1, I = Σ (−1)ⁿ/((2n + 1)·n!). Que vaut la somme des 4 premiers termes (n = 0 à 3) ? (4 décimales)',ans:.7429,tol:.0002,hint:'1 − 1/3 + 1/10 − 1/42.',why:'1 − 0,3333 + 0,1 − 0,0238 ≈ 0,7429.'},
    {q:'c) Que garantit le critère des séries alternées sur cette approximation ?',opts:['L’erreur est inférieure au premier terme omis, 1/216 ≈ 0,0046','L’erreur est nulle','L’erreur est inférieure au dernier terme gardé, 1/42','On ne peut rien dire sans calculer I'],ans:0,hint:'Les termes décroissent et tendent vers 0, avec des signes alternés.',why:'Pour une série alternée à termes décroissants vers 0, l’erreur est majorée par la valeur absolue du premier terme omis : 1/(9 · 24) = 1/216.'},
    {q:'d) Combien de termes faut-il garder pour que ce critère garantisse une erreur inférieure à 10⁻⁴ ?',unit:'termes',ans:7,hint:'Calcule 1/((2n + 1)·n!) pour n = 5, 6, 7.',why:'n = 6 : 1/9360 ≈ 1,07·10⁻⁴, encore trop grand. n = 7 : 1/75 600 ≈ 1,3·10⁻⁵. Le premier terme omis doit être n = 7 : on garde n = 0 à 6, soit 7 termes.'},
   ],
   sol:'e^{−x²} = Σ (−1)ⁿ x²ⁿ/n!, série qui converge uniformément sur [0 ; 1] : on peut intégrer terme à terme.<br>I = Σ (−1)ⁿ / ((2n + 1) n!) = 1 − 1/3 + 1/10 − 1/42 + 1/216 − …<br>Avec 4 termes : 0,7429, à moins de 1/216 ≈ 0,0046 près.<br>Pour garantir 10⁻⁴, le premier terme omis doit être < 10⁻⁴ : c’est le terme n = 7 (≈ 1,3·10⁻⁵). On garde 7 termes et I ≈ 0,74684.'},
 ]},

{id:'edo',br:'ana',lv:'uni',h:'Équations différentielles',p:'Quand le taux de variation dépend de l’état.',
 lessons:['Croissance et décroissance','Équations linéaires d’ordre 1','L’oscillateur harmonique','Champs de directions'],
 steps:[
  {h:'Suivre les petites flèches',p:`<p>Une population, une somme placée, une substance radioactive : leur vitesse de variation dépend de leur taille actuelle. L’équation <i>y</i>′ = <i>k</i>·<i>y</i> traduit cette idée. Comment voir ses solutions avant même de les calculer&nbsp;?</p>
<div class="def"><p>Le <b>champ de directions</b> de l’équation <i>y</i>′ = <i>f</i>(<i>x</i>, <i>y</i>) place, en chaque point (<i>x</i> ; <i>y</i>) du plan, un petit segment de pente <i>f</i>(<i>x</i>, <i>y</i>). Pour <i>y</i>′ = <i>ky</i>, la pente vaut <i>ky</i> : elle ne dépend que de la hauteur <i>y</i>.</p></div>
<div class="idea"><p>Une solution est une courbe qui suit en tout point la pente indiquée, comme une feuille portée par le courant. Les curseurs fixent <i>k</i> et le point de départ (0 ; <i>y</i>₀) ; la courbe tracée est la solution qui passe par ce point, <i>y</i> = <i>y</i>₀·e^{<i>kx</i>}.</p></div>
<div class="ex"><p>Avec <i>k</i> = 0,5 : au point (0 ; 1), la pente vaut 0,5 ; au point (0 ; 2), elle vaut 1 ; sur l’axe <i>y</i> = 0, elle est nulle, et la solution <i>y</i> = 0 y reste. La solution qui part de <i>y</i>₀ = 1 vaut e^{0,5} ≈ 1,65 en <i>x</i> = 1.</p></div>
<div class="warn"><p>Deux solutions différentes ne se croisent jamais : si elles passaient par un même point, elles suivraient ensuite les mêmes flèches et seraient confondues. Les courbes s’empilent sans se toucher.</p></div>`,
   params:[{id:'k',l:'k',min:-1,max:1,step:.1,v:.5},{id:'y',l:'y₀',min:-2,max:2,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-3,3],y:[-3,3],lab:1});
     for(let x=-2.5;x<=2.5;x+=.5) for(let y=-2.5;y<=2.5;y+=.5){ const m=v.k*y,L=.18/Math.hypot(1,m); P.seg(x-L,y-L*m,x+L,y+L*m,{c:'var(--muted)',w:1.5}); }
     P.fn(x=>v.y*Math.exp(v.k*x),{c:'var(--accent)',w:3.5}).dot(0,v.y,{r:5}); return P.svg(); },
   info:v=>`y = ${fmt(v.y)}·e^(${fmt(v.k)}x)`},
  {h:'Une équation dont l’inconnue est une fonction',p:`<p>Dans <i>x</i>² = 4, l’inconnue est un nombre. Dans <i>y</i>′ = 2<i>y</i>, l’inconnue est une <b>fonction</b> <i>y</i>(<i>x</i>) : on cherche toutes les fonctions dont la dérivée vaut, en chaque <i>x</i>, deux fois la fonction elle-même.</p>
<div class="def"><p>Une <b>équation différentielle</b> relie une fonction inconnue <i>y</i>, sa variable et ses dérivées <i>y</i>′, <i>y</i>″, … Son <b>ordre</b> est celui de la dérivée la plus haute. Une <b>solution</b> est une fonction qui rend l’égalité vraie pour <b>tout</b> <i>x</i> de l’intervalle étudié. Une <b>condition initiale</b>, comme <i>y</i>(0) = 3, choisit une solution particulière parmi toutes.</p></div>
<div class="ex"><p><i>y</i> = 3e^{2<i>x</i>} est solution de <i>y</i>′ = 2<i>y</i> : <i>y</i>′ = 3·2e^{2<i>x</i>} = 6e^{2<i>x</i>} = 2·(3e^{2<i>x</i>}) ✓, et <i>y</i>(0) = 3. En revanche <i>y</i> = e^{2<i>x</i>} + 1 ne l’est pas : <i>y</i>′ = 2e^{2<i>x</i>}, alors que 2<i>y</i> = 2e^{2<i>x</i>} + 2.</p></div>
<div class="idea"><p>Vérifier une solution est toujours facile : on dérive et on remplace. Trouver toutes les solutions demande un argument, car une équation différentielle a en général une infinité de solutions, une par condition initiale.</p></div>
<div class="warn"><p>Une équation d’ordre 1 demande une condition initiale ; une équation d’ordre 2, comme celle d’un ressort, en demande deux : la position et la vitesse de départ.</p></div>`},
  {h:'Les seules solutions de y′ = ky',p:`<p>On vérifie facilement que C·e^{<i>kx</i>} est solution de <i>y</i>′ = <i>ky</i>. Mais pourrait-il exister une autre fonction, plus exotique, qui marche aussi&nbsp;? Non, et la preuve tient en deux lignes.</p>
<div class="thm"><p>Les solutions de <b><i>y</i>′ = <i>ky</i></b> sur ℝ sont exactement les fonctions <b><i>y</i> = C·e^{<i>kx</i>}</b>, C réel. Celle qui vérifie <i>y</i>(0) = <i>y</i>₀ est <i>y</i>₀·e^{<i>kx</i>}.</p></div>
<div class="why"><p>Soit <i>y</i> une solution. On pose <i>z</i>(<i>x</i>) = <i>y</i>(<i>x</i>)·e^{−<i>kx</i>}. Alors <i>z</i>′ = <i>y</i>′e^{−<i>kx</i>} − <i>k</i>·<i>y</i>·e^{−<i>kx</i>} = (<i>y</i>′ − <i>ky</i>)e^{−<i>kx</i>} = 0. Une fonction de dérivée nulle sur un intervalle est constante : <i>z</i> = C, donc <i>y</i> = C·e^{<i>kx</i>}.</p></div>
<div class="idea"><p><i>k</i> est le <b>taux de croissance relatif</b> : <i>y</i>′/<i>y</i> = <i>k</i>. Si <i>k</i> > 0, <i>y</i> croît de façon exponentielle ; si <i>k</i> < 0, elle décroît vers 0. Le temps pour doubler (ou pour diviser par 2) vaut ln 2/|<i>k</i>|, quelle que soit la valeur de départ.</p></div>
<div class="ex"><p>Une population de 1000 bactéries avec <i>k</i> = 0,03 par heure : <i>y</i>(<i>t</i>) = 1000·e^{0,03<i>t</i>}. Après 10 h, <i>y</i>(10) = 1000·e^{0,3} ≈ 1350. Elle double en ln 2/0,03 ≈ 23,1 h.</p></div>`},
  {kind:'Méthode',h:'Résoudre y′ = ky et y′ = k(y − a)',
   p:'Les solutions de <b>y′ = ky</b> sont <b>y = C·e^{kx}</b> : la dérivée redonne k fois la fonction. La constante C se fixe avec une <b>condition initiale</b>, car y(0) = C. Pour <b>y′ = k(y − a)</b>, pose u = y − a : alors u′ = y′ = ku, donc u = u₀e^{kx} et <b>y = a + (y₀ − a)e^{kx}</b>. Si k < 0, y tend vers a.',
   demo:{enonce:'Résoudre y′ = −0,2y avec y(0) = 50, et calculer y(5). Puis résoudre T′ = −0,1(T − 15) avec T(0) = 75.',
    etapes:[
     {f:'y = C·e^{−0,2t}, et y(0) = C = 50',w:'e⁰ = 1 : la condition initiale donne directement C.'},
     {f:'y(5) = 50·e^{−1} ≈ 18,39',w:'−0,2 × 5 = −1.'},
     {f:'u = T − 15 vérifie u′ = −0,1u, avec u(0) = 75 − 15 = 60',w:'Le changement de variable ramène au cas y′ = ky.'},
     {f:'T(t) = 15 + 60·e^{−0,1t}, qui tend vers 15',w:'e^{−0,1t} → 0 : T se rapproche de 15.'}],
    conclusion:'y = 50e^{−0,2t} avec y(5) ≈ 18,39, et T(t) = 15 + 60e^{−0,1t}.'}},
  {h:'Reconnaître la solution',p:'Les solutions de <i>y′ = 3y</i> sont…',opts:['y = 3x + C','y = C·e^{3x}','y = e^{x/3}','y = C·x³'],ans:1,why:'(C·e^{3x})′ = 3·C·e^{3x} = 3y.'},
  {h:'Équilibre : vers où vont les solutions',p:`<p>Un café chaud refroidit vers la température de la pièce, une boisson froide se réchauffe vers elle. Les deux obéissent à <i>y</i>′ = <i>k</i>(<i>y</i> − <i>a</i>), et la valeur <i>a</i> y joue un rôle spécial.</p>
<div class="def"><p>Une <b>solution d’équilibre</b> est une solution constante. Pour <i>y</i>′ = <i>k</i>(<i>y</i> − <i>a</i>), c’est <b><i>y</i> = <i>a</i></b> : sa dérivée est nulle, et <i>k</i>(<i>a</i> − <i>a</i>) = 0 aussi. L’équilibre est <b>stable</b> si les solutions voisines s’en rapprochent, <b>instable</b> si elles s’en éloignent.</p></div>
<div class="idea"><p>L’écart <i>u</i> = <i>y</i> − <i>a</i> vérifie <i>u</i>′ = <i>ku</i> : il est multiplié par e^{<i>kt</i>}. Si <b><i>k</i> < 0</b>, l’écart s’éteint, au-dessus comme en dessous de <i>a</i> : équilibre stable. La figure le montre avec <i>a</i> = 2 (droite pointillée) et <i>k</i> = −0,5, pour quatre départs. Si <b><i>k</i> > 0</b>, le moindre écart explose : équilibre instable.</p></div>
<div class="ex"><p><i>T</i>′ = −0,1(<i>T</i> − 20) avec <i>T</i>(0) = 80 : <i>T</i>(<i>t</i>) = 20 + 60e^{−0,1<i>t</i>}. Après 10 min, l’écart à 20 °C est passé de 60 à 60e^{−1} ≈ 22,1, donc <i>T</i>(10) ≈ 42,1 °C. Avec <i>T</i>(0) = 5, <i>T</i>(<i>t</i>) = 20 − 15e^{−0,1<i>t</i>} monte vers 20.</p></div>
<div class="warn"><p>La solution n’atteint jamais exactement <i>a</i> en un temps fini, car e^{<i>kt</i>} ne s’annule pas. Elle s’en approche autant qu’on veut.</p></div>`,
   fig:(()=>{ const P=plane({x:[-0.2,6],y:[-0.5,4.5],h:200,grid:false,lx:1,ly:1}); P.seg(-0.2,2,6,2,{c:'var(--muted)',w:2,dash:true}); [0,1,3,4].forEach(y0=>P.fn(x=>2+(y0-2)*Math.exp(-0.5*x),{from:0,to:6}).dot(0,y0,{r:4})); return P.svg(); })()},
  {kind:'Méthode',h:'Trouver k avec une mesure',
   p:'Si k est inconnu mais qu’on connaît la valeur à un autre instant t₁, on écrit <b>y(t₁) = y₀e^{kt₁}</b>, on isole l’exponentielle, puis on prend le ln : <b>k = ln(y(t₁)/y₀) / t₁</b>. La <b>demi-vie</b> est la durée qui divise la quantité par 2 : T = ln 2 / |k|. Après n demi-vies, il reste y₀/2ⁿ.',
   demo:{enonce:'Une quantité qui décroît selon y′ = ky passe de 200 à 150 en 4 h. Trouver k et la demi-vie.',
    etapes:[
     {f:'200·e^{4k} = 150 ⟺ e^{4k} = 0,75',w:'On divise par la valeur initiale.'},
     {f:'4k = ln 0,75, donc k = ln 0,75 / 4 ≈ −0,0719 h⁻¹',w:'On prend le ln des deux côtés. k < 0 : c’est une décroissance.'},
     {f:'Demi-vie : T = ln 2 / 0,0719 ≈ 9,64 h',w:'On résout e^{kT} = ½, soit kT = −ln 2.'},
     {f:'Contrôle : 200·e^{−0,0719 × 9,64} ≈ 100 ✓',w:'Après une demi-vie, il reste la moitié.'}],
    conclusion:'k ≈ −0,0719 h⁻¹ et la demi-vie vaut environ 9,64 h.'}},
  {h:'Demi-vie',p:'Un échantillon radioactif de 80 g a une demi-vie de 5 ans. Combien en reste-t-il après 15 ans&nbsp;?',unit:'g',ans:10,why:'15 ans font 3 demi-vies : 80 → 40 → 20 → 10 g.'},
  {h:'D’où vient l’équation du ressort',p:`<p>Écarte une masse accrochée à un ressort, puis lâche-la : elle oscille. Pourquoi des sinus et des cosinus apparaissent-ils&nbsp;? Ils sortent directement des lois de la physique.</p>
<div class="def"><p>Le ressort exerce une force de rappel proportionnelle à l’écart <i>y</i> : F = −K<i>y</i> (loi de Hooke, la <b>raideur</b> K est positive). La loi de Newton <i>m</i>·<i>y</i>″ = F donne <b><i>y</i>″ + ω²<i>y</i> = 0</b>, avec <b>ω = √(K/<i>m</i>)</b>, la <b>pulsation</b>.</p></div>
<div class="why"><p><i>y</i> = cos ω<i>t</i> convient : <i>y</i>′ = −ω sin ω<i>t</i> et <i>y</i>″ = −ω² cos ω<i>t</i> = −ω²<i>y</i>. De même pour sin ω<i>t</i>. L’équation est <b>linéaire</b> : une somme de solutions, ou un multiple d’une solution, est encore une solution. Donc A cos ω<i>t</i> + B sin ω<i>t</i> aussi, et on montre que ce sont toutes les solutions. Les deux constantes A et B correspondent aux deux conditions initiales : la position <i>y</i>(0) et la vitesse <i>y</i>′(0).</p></div>
<div class="ex"><p><i>m</i> = 1 kg et K = 25 N/m : ω = √25 = 5 rad/s. Le mouvement se répète quand 5<i>t</i> augmente de 2π : la période vaut 2π/5 ≈ 1,26 s.</p></div>
<div class="warn"><p>La période ne dépend pas de l’amplitude : qu’on écarte la masse de 1 cm ou de 5 cm, elle met le même temps pour un aller-retour. En revanche, une masse plus lourde oscille plus lentement, car ω diminue quand <i>m</i> augmente.</p></div>`},
  {h:'L’équation caractéristique, trois cas',p:`<p>Pour <i>y</i>″ + <i>ay</i>′ + <i>by</i> = 0, par exemple un ressort avec frottement, on essaie <i>y</i> = e^{<i>rt</i>}, la fonction qui se reproduit en se dérivant. Cela ramène l’équation différentielle à une équation du second degré.</p>
<div class="def"><p>Avec <i>y</i> = e^{<i>rt</i>} : <i>y</i>′ = <i>r</i>e^{<i>rt</i>} et <i>y</i>″ = <i>r</i>²e^{<i>rt</i>}, donc (<i>r</i>² + <i>ar</i> + <i>b</i>)e^{<i>rt</i>} = 0. Comme e^{<i>rt</i>} ≠ 0, il faut <b><i>r</i>² + <i>ar</i> + <i>b</i> = 0</b> : c’est l’<b>équation caractéristique</b>.</p></div>
<div class="prop"><p>Selon le discriminant Δ = <i>a</i>² − 4<i>b</i> : si <b>Δ > 0</b>, deux racines <i>r</i>₁, <i>r</i>₂ et <i>y</i> = Ae^{<i>r</i>₁<i>t</i>} + Be^{<i>r</i>₂<i>t</i>} ; si <b>Δ = 0</b>, une racine double <i>r</i> et <i>y</i> = (A + B<i>t</i>)e^{<i>rt</i>} ; si <b>Δ < 0</b>, des racines α ± <i>i</i>ω et <i>y</i> = e^{α<i>t</i>}(A cos ω<i>t</i> + B sin ω<i>t</i>), une oscillation dont l’amplitude est multipliée par e^{α<i>t</i>}.</p></div>
<div class="ex"><p><i>y</i>″ + 3<i>y</i>′ + 2<i>y</i> = 0 : <i>r</i>² + 3<i>r</i> + 2 = (<i>r</i> + 1)(<i>r</i> + 2), donc <i>y</i> = Ae^{−<i>t</i>} + Be^{−2<i>t</i>}, qui s’éteint sans osciller. <i>y</i>″ + 2<i>y</i>′ + 5<i>y</i> = 0 : Δ = 4 − 20 = −16, <i>r</i> = −1 ± 2<i>i</i>, donc <i>y</i> = e^{−<i>t</i>}(A cos 2<i>t</i> + B sin 2<i>t</i>) : une oscillation amortie.</p></div>
<div class="warn"><p>Pour <i>y</i>″ + ω²<i>y</i> = 0, <i>a</i> = 0 et les racines sont ±<i>i</i>ω : α = 0, aucun amortissement, on retrouve le ressort idéal.</p></div>`},
  {kind:'Méthode',h:'L’oscillateur y″ + ω²y = 0',
   p:'Pour <b>y″ + ay′ + by = 0</b>, on cherche des solutions e^{rt} : r vérifie l’<b>équation caractéristique r² + ar + b = 0</b>. Deux racines réelles r₁ et r₂ : y = Ae^{r₁t} + Be^{r₂t}. Racines <b>±iω</b>, comme pour y″ + ω²y = 0 : <b>y = A cos ωt + B sin ωt</b>, de période 2π/ω. On trouve A et B avec y(0) = A et y′(0) = Bω. L’<b>amplitude</b> vaut √(A² + B²), car A cos ωt + B sin ωt = √(A² + B²) · sin(ωt + φ), avec tan φ = A/B quand A et B sont positifs.',
   demo:{enonce:'Résoudre y″ + 9y = 0 avec y(0) = 2 et y′(0) = 3. Donner l’amplitude, la période et le premier instant où y = 0.',
    etapes:[
     {f:'r² + 9 = 0 ⟹ r = ±3i, donc y = A cos 3t + B sin 3t',w:'Ici ω = 3.'},
     {f:'y(0) = A = 2 et y′(0) = 3B = 3, donc B = 1',w:'y′ = −3A sin 3t + 3B cos 3t vaut 3B en t = 0.'},
     {f:'Amplitude √(4 + 1) = √5 ≈ 2,24 ; période 2π/3 ≈ 2,09',w:'On écrit y = √5 · sin(3t + φ), avec tan φ = A/B = 2, soit φ ≈ 1,107.'},
     {f:'Premier zéro : 3t + φ = π, donc t = (π − 1,107)/3 ≈ 0,68',w:'3t + φ part de φ, entre 0 et π : le sinus s’annule d’abord en π.'}],
    conclusion:'y = 2 cos 3t + sin 3t : amplitude √5, période 2π/3, premier passage par 0 vers t ≈ 0,68.'}},
  {h:'La période',p:'Quelle est la période des solutions de <i>y″ + 16y = 0</i>&nbsp;? (au centième)',ans:1.57,tol:.011,why:'r² + 16 = 0 donne r = ±4i, donc y = A cos 4t + B sin 4t, de période 2π/4 = π/2 ≈ 1,57.'},
  {kind:'Défi',h:'Le ressort',p:'Quelles fonctions vérifient <i>y″ = −y</i>&nbsp;?',opts:['eˣ et e⁻ˣ','sin x et cos x','x² et x','ln x'],ans:1,why:'(sin x)″ = −sin x et (cos x)″ = −cos x. C’est l’équation d’un ressort sans frottement.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Une solution est une fonction qui vérifie l’équation pour tout <i>x</i>. Il faut une condition initiale par ordre de dérivation.</li>
<li><i>y</i>′ = <i>ky</i> ⟺ <i>y</i> = C·e^{<i>kx</i>}, avec C = <i>y</i>(0). Preuve : <i>y</i>·e^{−<i>kx</i>} a une dérivée nulle.</li>
<li><i>y</i>′ = <i>k</i>(<i>y</i> − <i>a</i>) : <i>y</i> = <i>a</i> + (<i>y</i>₀ − <i>a</i>)e^{<i>kx</i>}. L’équilibre <i>y</i> = <i>a</i> est stable si <i>k</i> < 0.</li>
<li>Avec une mesure : <i>k</i> = ln(<i>y</i>(<i>t</i>₁)/<i>y</i>₀)/<i>t</i>₁. Demi-vie ou temps de doublement : ln 2/|<i>k</i>|.</li>
<li><i>y</i>″ + <i>ay</i>′ + <i>by</i> = 0 : équation caractéristique <i>r</i>² + <i>ar</i> + <i>b</i> = 0. Deux racines réelles : Ae^{<i>r</i>₁<i>t</i>} + Be^{<i>r</i>₂<i>t</i>} ; racine double : (A + B<i>t</i>)e^{<i>rt</i>} ; α ± <i>i</i>ω : e^{α<i>t</i>}(A cos ω<i>t</i> + B sin ω<i>t</i>).</li>
<li>Ressort <i>y</i>″ + ω²<i>y</i> = 0, ω = √(K/<i>m</i>) : <i>y</i> = A cos ω<i>t</i> + B sin ω<i>t</i>, avec A = <i>y</i>(0) et B = <i>y</i>′(0)/ω ; période 2π/ω, amplitude √(A² + B²).</li>
</ul></div>`},
  {kind:'Problème',h:'Le café qui refroidit',
   p:'Un café à 90 °C est posé dans une pièce à 20 °C. Selon la loi de Newton, sa température vérifie <i>T′ = −k(T − 20)</i>. Après 10 minutes, il est à 60 °C. On veut savoir quand il sera à 30 °C.',
   parts:[
    {q:'a) La solution est T(t) = 20 + 70e^{−kt}. Combien vaut k ? (en min⁻¹, 3 décimales)',lab:'k =',ans:.056,tol:.0006,hint:'T(10) = 60 donne e^{−10k} = 40/70.',why:'k = ln(70/40)/10 = ln(1,75)/10 ≈ 0,056.'},
    {q:'b) Quelle est la température après 20 minutes ? (au centième)',unit:'°C',ans:42.86,tol:.011,hint:'e^{−20k} = (e^{−10k})² = (4/7)².',why:'20 + 70 · 16/49 = 20 + 160/7 ≈ 42,86 °C.'},
    {q:'c) Quand le café atteint-il 30 °C ? (au dixième de minute)',unit:'min',ans:34.8,tol:.051,hint:'Résous 70e^{−kt} = 10.',why:'t = ln 7 / k = 10 ln 7 / ln 1,75 ≈ 34,8 min.'},
    {q:'d) Vers quoi tend T(t) quand t → +∞ ?',opts:['0 °C','20 °C','60 °C','−∞'],ans:1,hint:'Que devient e^{−kt} avec k > 0 ?',why:'e^{−kt} → 0, donc T → 20 °C : le café prend la température de la pièce.'},
   ],
   sol:'On pose u = T − 20. Alors u′ = −ku, donc u = u₀e^{−kt} avec u₀ = 70.<br>T(10) = 60 donne e^{−10k} = 4/7, soit k = ln(7/4)/10 ≈ 0,056 min⁻¹.<br>T(20) = 20 + 70 · (4/7)² ≈ 42,86 °C.<br>T = 30 ⟺ e^{−kt} = 1/7 ⟺ t = 10 ln 7 / ln(7/4) ≈ 34,8 min.<br>À long terme, T → 20 °C.'},
  {kind:'Problème',h:'Un ressort lancé',
   p:'Une masse au bout d’un ressort vérifie <i>y″ + 4y = 0</i>. Au départ, elle est à la position y(0) = 1 et on la lance avec la vitesse y′(0) = 2. On veut l’amplitude, la période et le premier passage par la position d’équilibre.',
   params:[{id:'t',l:'Temps t',min:0,max:6.25,step:.25,v:0}],
   draw:v=>{ const y=t=>Math.cos(2*t)+Math.sin(2*t), P=plane({x:[-0.3,6.6],y:[-1.8,1.8],w:320,h:180,grid:false,lx:1,ly:1}); P.fn(y,{from:0,to:6.5}).seg(v.t,-1.8,v.t,1.8,{c:'var(--muted)',w:1,dash:true}).dot(v.t,y(v.t)); return P.svg(); },
   info:v=>`y(${fmt(v.t)}) ≈ ${fmt(Math.cos(2*v.t)+Math.sin(2*v.t),3)}`,
   parts:[
    {q:'a) Quelle est la forme générale des solutions ?',opts:['A e^{2t} + B e^{−2t}','A cos 2t + B sin 2t','A cos 4t + B sin 4t','(A + Bt) e^{2t}'],ans:1,hint:'L’équation caractéristique r² + 4 = 0 a pour racines ±2i.',why:'r = ±2i donne des oscillations de pulsation 2 : y = A cos 2t + B sin 2t.'},
    {q:'b) Avec les conditions initiales, combien vaut B ?',lab:'B =',ans:1,hint:'y(0) = A et y′(0) = 2B.',why:'A = 1 et 2B = 2, donc B = 1 : y = cos 2t + sin 2t.'},
    {q:'c) Quelle est l’amplitude du mouvement ? (au centième)',ans:1.41,tol:.011,hint:'A cos ωt + B sin ωt = √(A² + B²) · sin(ωt + φ).',why:'√(1 + 1) = √2 ≈ 1,41.'},
    {q:'d) À quel instant t > 0 la masse passe-t-elle pour la première fois par y = 0 ? (au centième)',lab:'t =',unit:'s',ans:1.18,tol:.011,hint:'cos 2t + sin 2t = √2 sin(2t + π/4).',why:'2t + π/4 = π donne t = 3π/8 ≈ 1,18 s.'},
   ],
   sol:'Équation caractéristique : r² + 4 = 0, r = ±2i. Donc y = A cos 2t + B sin 2t.<br>y(0) = A = 1 et y′(0) = 2B = 2, d’où y = cos 2t + sin 2t.<br>On écrit y = √2 sin(2t + π/4) : amplitude √2 ≈ 1,41, période 2π/2 = π ≈ 3,14 s.<br>Premier zéro : 2t + π/4 = π, soit t = 3π/8 ≈ 1,18 s.<br>Lancer la masse augmente l’amplitude : sans vitesse initiale, elle serait de 1.'},
 ]},

{id:'transfo',br:'geo',lv:'uni',h:'Transformations linéaires',p:'Les matrices comme déformations du plan.',
 lessons:['Matrices qui déforment le plan','Rotations et symétries','Déterminant et aire','Composer des transformations'],
 steps:[
  {h:'Une matrice déforme la grille',p:`<p>Comment décrire d’un coup une déformation de tout le plan, qui étire, tourne ou cisaille&nbsp;? Quatre nombres suffisent, rangés dans une matrice ${mat([['a','b'],['c','d']])}.</p>
<div class="def"><p>La matrice M envoie le point (<i>x</i> ; <i>y</i>) sur <b>M(<i>x</i> ; <i>y</i>) = (<i>ax</i> + <i>by</i> ; <i>cx</i> + <i>dy</i>)</b>. En particulier, <b>e</b>₁ = (1 ; 0) va sur (<i>a</i> ; <i>c</i>), la 1re colonne, et <b>e</b>₂ = (0 ; 1) va sur (<i>b</i> ; <i>d</i>), la 2e colonne.</p></div>
<div class="idea"><p>Fais varier les curseurs : une flèche suit la 1re colonne, l’autre la 2e, et toute la grille suit, en restant formée de droites parallèles régulièrement espacées. Le carré unité devient le parallélogramme construit sur les deux colonnes.</p></div>
<div class="ex"><p>Avec <i>a</i> = 1, <i>b</i> = 0,5, <i>c</i> = 0 et <i>d</i> = 1 (position de départ) : <b>e</b>₁ reste en place et <b>e</b>₂ va en (0,5 ; 1). Le point (2 ; 2) va en (2 + 1 ; 2) = (3 ; 2) : chaque point glisse vers la droite de la moitié de sa hauteur.</p></div>
<div class="warn"><p>L’origine ne bouge jamais : M(0 ; 0) = (0 ; 0). Une translation ne peut donc pas s’écrire avec une matrice 2 × 2.</p></div>`,
   params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'b',l:'b',min:-2,max:2,step:.5,v:.5},{id:'c',l:'c',min:-2,max:2,step:.5,v:0},{id:'d',l:'d',min:-2,max:2,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],grid:false}), T=(x,y)=>[v.a*x+v.b*y,v.c*x+v.d*y];
     for(let i=-3;i<=3;i++){ const p=T(i,-3),q=T(i,3),r=T(-3,i),s=T(3,i); P.seg(p[0],p[1],q[0],q[1],{c:'var(--line)',w:1.2}).seg(r[0],r[1],s[0],s[1],{c:'var(--line)',w:1.2}); }
     P.poly([[0,0],T(1,0),T(1,1),T(0,1)],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2}).arrow(0,0,v.a,v.c,{c:'var(--math)'}).arrow(0,0,v.b,v.d,{c:'var(--spark)'}); return P.svg(); },
   info:v=>`${mat([[fmt(v.a),fmt(v.b)],[fmt(v.c),fmt(v.d)]])} &nbsp; det = ad − bc = ${fmt(v.a*v.d-v.b*v.c)}`},
  {h:'Linéaire : ce que ça veut dire',p:`<p>Pourquoi les images de <b>e</b>₁ et <b>e</b>₂ suffisent-elles à connaître toute la transformation&nbsp;? Parce qu’une transformation linéaire respecte les combinaisons de vecteurs.</p>
<div class="def"><p>Une application <i>f</i> du plan dans lui-même est <b>linéaire</b> si, pour tous vecteurs <b>u</b>, <b>v</b> et tout réel λ : <b><i>f</i>(u + v) = <i>f</i>(u) + <i>f</i>(v)</b> et <b><i>f</i>(λu) = λ<i>f</i>(u)</b>.</p></div>
<div class="why"><p>Tout vecteur s’écrit (<i>x</i> ; <i>y</i>) = <i>x</i>·<b>e</b>₁ + <i>y</i>·<b>e</b>₂. Par linéarité, <i>f</i>(<i>x</i> ; <i>y</i>) = <i>x</i>·<i>f</i>(<b>e</b>₁) + <i>y</i>·<i>f</i>(<b>e</b>₂). Connaître <i>f</i>(<b>e</b>₁) et <i>f</i>(<b>e</b>₂), les deux colonnes de la matrice, c’est donc connaître <i>f</i> partout. Inversement, toute matrice définit une application linéaire.</p></div>
<div class="ex"><p>Si <i>f</i>(<b>e</b>₁) = (2 ; 1) et <i>f</i>(<b>e</b>₂) = (−1 ; 1), alors <i>f</i>(3 ; 2) = 3·(2 ; 1) + 2·(−1 ; 1) = (6 − 2 ; 3 + 2) = (4 ; 5). Avec la matrice ${mat([[2,'−1'],[1,1]])} : (2·3 − 1·2 ; 1·3 + 1·2) = (4 ; 5) ✓.</p></div>
<div class="warn"><p>La translation (<i>x</i> ; <i>y</i>) ↦ (<i>x</i> + 1 ; <i>y</i>) n’est pas linéaire : elle déplace l’origine, alors que <i>f</i>(0) = <i>f</i>(0·<b>u</b>) = 0·<i>f</i>(<b>u</b>) = 0 pour toute application linéaire. (<i>x</i> ; <i>y</i>) ↦ (<i>x</i>² ; <i>y</i>) non plus : <i>f</i>(2<b>e</b>₁) = (4 ; 0) ≠ 2<i>f</i>(<b>e</b>₁) = (2 ; 0).</p></div>`},
  {h:'Rotations, symétries, projections',p:`<p>Quelques transformations reviennent sans cesse. Pour chacune, on retrouve la matrice en suivant <b>e</b>₁ et <b>e</b>₂, sans rien apprendre par cœur.</p>
<div class="prop"><p><b>Rotation</b> d’angle θ autour de 0 : ${mat([['cos θ','−sin θ'],['sin θ','cos θ']])}. <b>Symétrie</b> d’axe (O<i>x</i>) : ${mat([[1,0],[0,'−1']])}. <b>Projection</b> sur (O<i>x</i>) : ${mat([[1,0],[0,0]])}. <b>Homothétie</b> de rapport <i>k</i> : ${mat([['k',0],[0,'k']])}.</p></div>
<div class="why"><p>La rotation envoie <b>e</b>₁ sur le point du cercle unité d’angle θ, (cos θ ; sin θ) : c’est la 1re colonne. <b>e</b>₂ est à l’angle 90° ; il va à l’angle θ + 90°, au point (cos(θ + 90°) ; sin(θ + 90°)) = (−sin θ ; cos θ) : c’est la 2e colonne. La symétrie garde <b>e</b>₁ et retourne <b>e</b>₂ ; la projection garde <b>e</b>₁ et écrase <b>e</b>₂ sur 0.</p></div>
<div class="ex"><p>Rotation de 30° : cos 30° = √3/2 et sin 30° = ½. Sur la figure, les flèches fines sont <b>e</b>₁ et <b>e</b>₂, les flèches épaisses leurs images. Le point (2 ; 0) va en (2·√3/2 ; 2·½) = (√3 ; 1) ≈ (1,73 ; 1).</p></div>
<div class="warn"><p>Le signe − de la rotation se place en 1re ligne, 2e colonne. Si tu le mets en bas, tu obtiens la rotation d’angle −θ.</p></div>`,
   fig:(()=>{ const c=Math.cos(Math.PI/6),s=Math.sin(Math.PI/6),P=plane({x:[-1.2,2.4],y:[-0.4,2],step:.5,lab:1}); P.circ(0,0,1,{c:'var(--line)',w:1}).curve(u=>2*Math.cos(u),u=>2*Math.sin(u),0,Math.PI/6,{c:'var(--muted)',w:1.5,dash:true}).arrow(0,0,1,0,{c:'var(--muted)',w:1.5}).arrow(0,0,0,1,{c:'var(--muted)',w:1.5}).arrow(0,0,c,s,{c:'var(--math)',w:3.5}).arrow(0,0,-s,c,{c:'var(--spark)',w:3.5}).dot(2,0,{r:4,c:'var(--muted)',l:'(2 ; 0)',dx:-20,dy:18}).dot(2*c,2*s,{r:5,l:'(√3 ; 1)',dx:-14,dy:-12}); return P.svg(); })()},
  {kind:'Méthode',h:'Écrire la matrice d’une transformation',
   p:`Une transformation linéaire est entièrement fixée par les images de e₁ = (1 ; 0) et e₂ = (0 ; 1). Sa matrice a pour <b>1re colonne l’image de e₁</b> et pour <b>2e colonne l’image de e₂</b>. Pour transformer un point, on multiplie : ${mat([['a','b'],['c','d']])}·(x ; y) = (ax + by ; cx + dy). La rotation d’angle θ a pour matrice ${mat([['cos θ','−sin θ'],['sin θ','cos θ']])}.`,
   demo:{enonce:'Écrire la matrice de la symétrie par rapport à la droite y = x, puis calculer l’image du point (2 ; 5).',
    etapes:[
     {f:'e₁ = (1 ; 0) va sur (0 ; 1), et e₂ = (0 ; 1) va sur (1 ; 0)',w:'La symétrie d’axe y = x échange les deux coordonnées.'},
     {f:`Matrice : ${mat([[0,1],[1,0]])}`,w:'Les images de e₁ et de e₂, en colonnes.'},
     {f:`${mat([[0,1],[1,0]])}·(2 ; 5) = (0·2 + 1·5 ; 1·2 + 0·5) = (5 ; 2)`,w:'Chaque ligne de la matrice multiplie le vecteur.'}],
    conclusion:'La symétrie d’axe y = x envoie (2 ; 5) sur (5 ; 2).'}},
  {h:'Fabrique une rotation',p:'Règle la matrice pour qu’elle fasse tourner le plan de 90° dans le sens inverse des aiguilles d’une montre.',
   params:[{id:'a',l:'a',min:-1,max:1,v:1},{id:'b',l:'b',min:-1,max:1,v:0},{id:'c',l:'c',min:-1,max:1,v:0},{id:'d',l:'d',min:-1,max:1,v:1}],
   draw:v=>{ const P=plane({x:[-2.5,2.5],y:[-2.5,2.5],step:.5,lab:1}); P.poly([[0,0],[v.a,v.c],[v.a+v.b,v.c+v.d],[v.b,v.d]],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2}).arrow(0,0,v.a,v.c,{c:'var(--math)'}).arrow(0,0,v.b,v.d,{c:'var(--spark)'}).dot(0,1,{r:4,c:'var(--muted)'}).dot(-1,0,{r:4,c:'var(--muted)'}); return P.svg(); },
   info:v=>mat([[v.a,v.b],[v.c,v.d]]),ok:v=>v.a===0&&v.b===-1&&v.c===1&&v.d===0,why:'e₁ = (1 ; 0) doit aller sur (0 ; 1), et e₂ = (0 ; 1) sur (−1 ; 0). Ce sont les deux colonnes.'},
  {h:'Le déterminant mesure les aires',p:`<p>Une transformation linéaire change les aires, mais toutes dans la même proportion. Ce facteur est un seul nombre, que l’on calcule directement sur la matrice.</p>
<div class="thm"><p>Pour M = ${mat([['a','b'],['c','d']])}, l’image de toute figure d’aire S a pour aire <b>|det M|·S</b>, où det M = <i>ad</i> − <i>bc</i>. Si det M < 0, l’image est retournée, comme dans un miroir.</p></div>
<div class="why"><p>Le carré unité devient le parallélogramme construit sur (<i>a</i> ; <i>c</i>) et (<i>b</i> ; <i>d</i>), dont l’aire vaut |<i>ad</i> − <i>bc</i>| : c’est le déterminant de ces deux vecteurs. Une figure quelconque se remplit de petits carrés ; chacun devient un petit parallélogramme dont l’aire est multipliée par le même facteur, car la grille est déformée partout de la même façon.</p></div>
<div class="ex"><p>M = ${mat([[1,2],[3,1]])} : det M = 1·1 − 2·3 = −5. Le carré unité (pointillé) devient le parallélogramme de la figure, d’aire 5. Un disque de rayon 1, d’aire π, devient une ellipse d’aire 5π ≈ 15,7. Le signe − se voit : pour aller de l’image de <b>e</b>₁, (1 ; 3), à celle de <b>e</b>₂, (2 ; 1), on tourne dans le sens des aiguilles d’une montre.</p></div>
<div class="warn"><p>Si det M = 0, le parallélogramme est aplati : tout le plan est écrasé sur une droite, ou sur 0. On ne peut plus revenir en arrière, car deux points différents ont la même image.</p></div>`,
   fig:(()=>{ const P=plane({x:[-1,4],y:[-0.5,4.5],lab:1}); P.rect(0,0,1,1,{c:'var(--muted)',w:1.5,dash:true}).poly([[0,0],[1,3],[3,4],[2,1]],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:2}).arrow(0,0,1,3,{c:'var(--math)'}).arrow(0,0,2,1,{c:'var(--spark)'}).text(1.5,2,'aire 5',{a:'middle'}); return P.svg(); })()},
  {kind:'Méthode',h:'Lire le déterminant',
   p:'Le déterminant <b>ad − bc</b> dit comment la transformation change les aires : toute aire est multipliée par <b>|det|</b>. Si det < 0, l’orientation est renversée, comme dans un miroir. Si det = 0, le plan est écrasé sur une droite. Pour une composée : <b>det(AB) = det A · det B</b>.',
   demo:{enonce:`Avec A = ${mat([[3,1],[1,2]])}, quelle est l’aire de l’image d’un triangle d’aire 2&nbsp;? Puis, avec la symétrie S = ${mat([[1,0],[0,'−1']])} d’axe horizontal, que vaut det(AS)&nbsp;?`,
    etapes:[
     {f:'det A = 3·2 − 1·1 = 5',w:'ad − bc.'},
     {f:'Aire de l’image : 2 × |5| = 10',w:'Toutes les aires sont multipliées par |det|, quelle que soit la forme.'},
     {f:'det S = 1·(−1) − 0·0 = −1',w:'Une symétrie conserve les aires mais retourne les figures.'},
     {f:'det(AS) = 5 · (−1) = −5',w:'Les déterminants se multiplient : AS multiplie les aires par 5 et renverse l’orientation.'}],
    conclusion:'L’image du triangle a une aire de 10, et det(AS) = −5.'}},
  {h:'Symétrie',p:'Le déterminant d’une symétrie axiale vaut…',opts:['1','−1','0','2'],ans:1,why:'Elle conserve les aires (|det| = 1) mais inverse l’orientation (signe −).'},
  {kind:'Défi',h:'Aire de l’image',p:`Quelle est l’aire de l’image du carré unité par ${mat([[2,1],[0,3]])}&nbsp;?`,ans:6,why:'L’aire est multipliée par |det| = |2·3 − 1·0| = 6.'},
  {h:'Composer, c’est multiplier',p:`<p>Faire une rotation puis un étirement donne encore une transformation linéaire. Quelle est sa matrice&nbsp;? La règle du produit de matrices est justement construite pour répondre.</p>
<div class="def"><p>Si B s’applique d’abord, puis A, la composée s’écrit A∘B et a pour matrice le <b>produit AB</b>. Sa <i>j</i>-ième colonne est <b>A × (<i>j</i>-ième colonne de B)</b>.</p></div>
<div class="why"><p>La 1re colonne de la composée est l’image de <b>e</b>₁. B envoie <b>e</b>₁ sur la 1re colonne de B, puis A envoie celle-ci sur A·(1re colonne de B). Même chose pour <b>e</b>₂. Calculer A fois une colonne, c’est multiplier chaque ligne de A par cette colonne : d’où la règle « ligne × colonne ».</p></div>
<div class="ex"><p>Deux rotations de 45° font une rotation de 90°. Avec <i>c</i> = √2/2, donc <i>c</i>² = ½ : ${mat([['c','−c'],['c','c']])}·${mat([['c','−c'],['c','c']])} = ${mat([['c² − c²','−c² − c²'],['c² + c²','−c² + c²']])} = ${mat([[0,'−1'],[1,0]])} ✓.</p></div>
<div class="warn"><p>On écrit AB mais on applique B en premier : la matrice de droite agit d’abord, comme dans <i>f</i>(<i>g</i>(<i>x</i>)). Et en général AB ≠ BA : l’ordre des étapes change le résultat.</p></div>`},
  {kind:'Méthode',h:'Composer avec un produit de matrices',
   p:'Appliquer B puis A revient à appliquer la matrice <b>AB</b> : la transformation faite en premier est écrite <b>à droite</b>. Le coefficient de AB en ligne i et colonne j est la ligne i de A multipliée par la colonne j de B. En général, <b>AB ≠ BA</b>. Pour reconnaître une symétrie axiale : det = −1 et M² = I ; son axe est formé des points fixes, solutions de Mv = v.',
   demo:{enonce:`A = ${mat([[1,1],[0,1]])} (un cisaillement) et B = ${mat([[2,0],[0,1]])} (un étirement horizontal). Calculer AB et BA.`,
    etapes:[
     {f:`AB = ${mat([['1·2 + 1·0','1·0 + 1·1'],['0·2 + 1·0','0·0 + 1·1']])} = ${mat([[2,1],[0,1]])}`,w:'Ligne de A fois colonne de B, pour chaque case.'},
     {f:`BA = ${mat([['2·1 + 0·0','2·1 + 0·1'],['0·1 + 1·0','0·1 + 1·1']])} = ${mat([[2,2],[0,1]])}`,w:'Même calcul dans l’autre ordre.'},
     {f:'AB·(1 ; 1) = (3 ; 1) mais BA·(1 ; 1) = (4 ; 1)',w:'Un seul point suffit pour voir que les deux transformations diffèrent.'}],
    conclusion:'AB ≠ BA : étirer puis cisailler ne donne pas la même chose que cisailler puis étirer.'},
   note:`Exemple de symétrie : M = ${mat([[0,1],[1,0]])} vérifie det M = −1 et M² = I. Ses points fixes vérifient (y ; x) = (x ; y), soit y = x : c’est son axe.`},
  {h:'Un produit',p:`Quel est le coefficient en haut à gauche du produit ${mat([[1,2],[3,4]])}·${mat([[0,1],[1,0]])}&nbsp;?`,ans:2,why:`Ligne 1 de la première fois colonne 1 de la seconde : 1·0 + 2·1 = 2. Le produit vaut ${mat([[2,1],[4,3]])}.`},
  {h:'Défaire une transformation : l’inverse',p:`<p>Si M déforme le plan, peut-on revenir en arrière avec une autre matrice&nbsp;? Oui, sauf si M a tout écrasé.</p>
<div class="def"><p>M⁻¹ est l’<b>inverse</b> de M si M⁻¹M = MM⁻¹ = I, l’identité. Pour M = ${mat([['a','b'],['c','d']])} avec det M ≠ 0 : <b>M⁻¹ = (1/det M)·</b>${mat([['d','−b'],['−c','a']])}.</p></div>
<div class="why"><p>On vérifie : ${mat([['d','−b'],['−c','a']])}·${mat([['a','b'],['c','d']])} = ${mat([['da − bc','db − bd'],['−ca + ac','−cb + ad']])} = (<i>ad</i> − <i>bc</i>)·I. En divisant par det M, on obtient I. Si det M = 0, les aires sont écrasées à 0 et aucune matrice ne peut les regonfler : M n’a pas d’inverse.</p></div>
<div class="ex"><p>M = ${mat([[2,1],[1,1]])}, det M = 1, donc M⁻¹ = ${mat([[1,'−1'],['−1',2]])}. M envoie (1 ; 2) sur (4 ; 3), et M⁻¹(4 ; 3) = (4 − 3 ; −4 + 6) = (1 ; 2) ✓.</p></div>
<div class="idea"><p>Pour une transformation connue, l’inverse se devine : celle de la rotation d’angle θ est la rotation d’angle −θ, une symétrie est sa propre inverse, et l’inverse du cisaillement ${mat([[1,'k'],[0,1]])} est ${mat([[1,'−k'],[0,1]])}.</p></div>`},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Linéaire : <i>f</i>(<b>u</b> + <b>v</b>) = <i>f</i>(<b>u</b>) + <i>f</i>(<b>v</b>) et <i>f</i>(λ<b>u</b>) = λ<i>f</i>(<b>u</b>) ; l’origine reste fixe.</li>
<li>Les colonnes de la matrice sont les images de <b>e</b>₁ et <b>e</b>₂ ; M(<i>x</i> ; <i>y</i>) = (<i>ax</i> + <i>by</i> ; <i>cx</i> + <i>dy</i>).</li>
<li>Rotation d’angle θ : ${mat([['cos θ','−sin θ'],['sin θ','cos θ']])} ; symétrie d’axe (O<i>x</i>) : ${mat([[1,0],[0,'−1']])} ; projection sur (O<i>x</i>) : ${mat([[1,0],[0,0]])}.</li>
<li>Les aires sont multipliées par |det M| ; det M < 0 retourne l’orientation ; det M = 0 écrase le plan.</li>
<li>B puis A : matrice AB, dont la colonne <i>j</i> est A × (colonne <i>j</i> de B). det(AB) = det A · det B, et AB ≠ BA en général.</li>
<li>Si det M ≠ 0 : M⁻¹ = (1/det M)·${mat([['d','−b'],['−c','a']])}.</li>
<li>Symétrie axiale : det = −1 et M² = I ; son axe est l’ensemble des points fixes.</li>
</ul></div>`},
  {kind:'Problème',h:'Le cisaillement',
   p:`La matrice C = ${mat([[1,2],[0,1]])} fait « glisser » le plan horizontalement : chaque point est poussé vers la droite d’autant plus qu’il est haut. On étudie l’image du carré unité, l’aire, et ce que donne C appliquée deux fois.`,
   params:[{id:'k',l:'Fraction de la transformation',min:0,max:1,step:.25,v:1}],
   draw:v=>{ const s=2*v.k, P=plane({x:[-0.5,4],y:[-0.5,2],w:300,lab:1}); P.rect(0,0,1,1,{c:'var(--muted)',w:1.5,dash:true}).poly([[0,0],[1,0],[1+s,1],[s,1]],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2}).dot(1+s,1,{l:'image de (1 ; 1)',r:4}); return P.svg(); },
   parts:[
    {q:'a) Quelle est l’abscisse de l’image du point (1 ; 1) ?',lab:'x =',ans:3,hint:'Multiplie C par le vecteur (1 ; 1).',why:'C·(1 ; 1) = (1 + 2 ; 1) = (3 ; 1).'},
    {q:'b) Quelle est l’aire de l’image d’un triangle d’aire 4 ?',ans:4,hint:'L’aire est multipliée par |det C|.',why:'det C = 1 · 1 − 2 · 0 = 1 : les aires sont conservées.'},
    {q:'c) C² = C·C est encore un cisaillement. Quel est son coefficient en haut à droite ?',ans:4,hint:'Calcule le produit, ou pense à ce que fait C appliquée deux fois.',why:`C² = ${mat([[1,4],[0,1]])} : deux glissements de 2 font un glissement de 4.`},
   ],
   sol:`C·(1 ; 0) = (1 ; 0) et C·(0 ; 1) = (2 ; 1) : le carré unité devient le parallélogramme (0 ; 0), (1 ; 0), (3 ; 1), (2 ; 1).<br>det C = 1 : même base 1, même hauteur 1, donc même aire. Toute aire est conservée.<br>C² = ${mat([[1,4],[0,1]])} et plus généralement Cⁿ = ${mat([[1,'2n'],[0,1]])}.<br>L’inverse est le cisaillement de coefficient −2.`},
  {kind:'Problème',h:'Rotation puis symétrie',
   p:`On note R la rotation de 90° (sens trigonométrique) et S la symétrie par rapport à l’axe des x : R = ${mat([[0,'−1'],[1,0]])} et S = ${mat([[1,0],[0,'−1']])}. On étudie la composée S∘R (d’abord R, puis S), qui s’écrit SR, et on la compare à R∘S.`,
   parts:[
    {q:'a) Combien vaut det(SR) ?',lab:'det =',ans:-1,hint:'det(SR) = det S · det R.',why:'(−1) · 1 = −1 : SR renverse l’orientation et conserve les aires.'},
    {q:'b) Quelle est l’ordonnée de l’image du point (2 ; 5) par S∘R ?',lab:'y =',ans:-2,hint:'Applique d’abord R, puis S.',why:'R(2 ; 5) = (−5 ; 2), puis S(−5 ; 2) = (−5 ; −2).'},
    {q:'c) Quelle est la nature de S∘R ?',opts:['Une rotation de −90°','La symétrie par rapport à la droite y = x','La symétrie par rapport à la droite y = −x','Une rotation de 180°'],ans:2,hint:`Calcule SR = ${mat([[0,'−1'],['−1',0]])} et cherche les vecteurs fixes.`,why:'SR envoie (x ; y) sur (−y ; −x). Les points de y = −x sont fixes et det = −1 : c’est la symétrie d’axe y = −x.'},
    {q:'d) Et R∘S ?',opts:['C’est la même transformation','C’est la symétrie par rapport à y = x','C’est la rotation de 90°','C’est l’identité'],ans:1,hint:'Calcule RS.',why:`RS = ${mat([[0,1],[1,0]])} échange x et y : symétrie d’axe y = x. Donc RS ≠ SR : la composition n’est pas commutative.`},
   ],
   sol:`SR = ${mat([[1,0],[0,'−1']])}${mat([[0,'−1'],[1,0]])} = ${mat([[0,'−1'],['−1',0]])}, soit (x ; y) ↦ (−y ; −x).<br>det(SR) = −1 et (SR)² = I : c’est une symétrie axiale. Son axe est formé des points fixes : y = −x.<br>RS = ${mat([[0,1],[1,0]])}, soit (x ; y) ↦ (y ; x) : la symétrie d’axe y = x.<br>Les deux composées sont des symétries, mais d’axes différents : l’ordre compte.`},
 ]},

{id:'parametrees',br:'geo',lv:'uni',h:'Courbes paramétrées',p:'Dessiner en fonction du temps, des Lissajous aux spirales.',
 lessons:['Tracer en fonction du temps','Vitesse et tangente','Coordonnées polaires','Longueur d’arc'],
 steps:[
  {h:'Les figures de Lissajous',p:`<p>Sur un oscilloscope, on envoie un signal sinusoïdal sur l’axe horizontal et un autre sur l’axe vertical. Le point lumineux dessine alors des boucles étonnantes : ce sont des courbes décrites par deux fonctions du temps.</p>
<div class="def"><p>Au temps <i>t</i>, le point est en (<i>x</i>(<i>t</i>) ; <i>y</i>(<i>t</i>)) avec <b><i>x</i>(<i>t</i>) = sin(<i>a</i>·<i>t</i> + π/2)</b>, qui vaut cos(<i>a</i>·<i>t</i>), et <b><i>y</i>(<i>t</i>) = sin(<i>b</i>·<i>t</i>)</b>. La variable <i>t</i> s’appelle le <b>paramètre</b> ; quand <i>t</i> parcourt [0 ; 2π], le point trace la courbe.</p></div>
<div class="idea"><p>Pendant que <i>t</i> fait un tour, <i>x</i> fait <i>a</i> allers-retours et <i>y</i> en fait <i>b</i>. Le rapport <i>a</i>/<i>b</i> fixe le dessin : pendant un tour, le point atteint <i>a</i> fois le bord droit et <i>b</i> fois le bord du haut. Pour <i>a</i> = 2 et <i>b</i> = 1, <i>x</i> = cos 2<i>t</i> = 1 − 2 sin² <i>t</i> = 1 − 2<i>y</i>² : un arc de parabole couchée, parcouru en aller-retour.</p></div>
<div class="ex"><p>Avec <i>a</i> = 3 et <i>b</i> = 2 (position de départ) : en <i>t</i> = 0, le point est en (cos 0 ; sin 0) = (1 ; 0). En <i>t</i> = π/4, il est en (cos(3π/4) ; sin(π/2)) ≈ (−0,71 ; 1), sur le bord du haut.</p></div>`,
   params:[{id:'a',l:'a',min:1,max:5,v:3},{id:'b',l:'b',min:1,max:5,v:2}],
   draw:v=>{ const P=plane({x:[-1.3,1.3],y:[-1.3,1.3],step:.5,lab:1}); P.curve(t=>Math.sin(v.a*t+Math.PI/2),t=>Math.sin(v.b*t),0,2*Math.PI,{n:600}); return P.svg(); },
   info:v=>`a/b = ${v.a}/${v.b}`},
  {h:'Une courbe et une façon de la parcourir',p:`<p>Une trajectoire dit où passe le point ; une paramétrisation dit en plus <b>quand</b> il passe à chaque endroit. Deux mouvements différents peuvent dessiner la même courbe.</p>
<div class="def"><p>Une <b>courbe paramétrée</b> est une fonction <i>t</i> ↦ M(<i>t</i>) = (<i>x</i>(<i>t</i>) ; <i>y</i>(<i>t</i>)), définie sur un intervalle. L’ensemble des points M(<i>t</i>) est son <b>support</b>, ou trajectoire. Le sens de parcours est celui des <i>t</i> croissants.</p></div>
<div class="idea"><p>Pense à un film : chaque valeur de <i>t</i> est une image, et le point s’y trouve en (<i>x</i>(<i>t</i>) ; <i>y</i>(<i>t</i>)). Une courbe paramétrée peut se recouper (comme les figures de Lissajous), revenir en arrière ou s’arrêter, ce que le graphe d’une fonction <i>y</i> = <i>f</i>(<i>x</i>) ne fait jamais.</p></div>
<div class="ex"><p><i>x</i> = <i>t</i>, <i>y</i> = <i>t</i>² décrit la parabole <i>y</i> = <i>x</i>² : <i>t</i> = −1 donne (−1 ; 1), <i>t</i> = 0 donne (0 ; 0), <i>t</i> = 2 donne (2 ; 4). <i>x</i> = 2<i>t</i>, <i>y</i> = 4<i>t</i>² a le même support, la même parabole, mais le point la parcourt deux fois plus vite horizontalement.</p></div>
<div class="warn"><p>Éliminer le paramètre peut faire perdre de l’information. <i>x</i> = <i>t</i>², <i>y</i> = <i>t</i>⁴ vérifie bien <i>y</i> = <i>x</i>², mais <i>x</i> = <i>t</i>² ≥ 0 : on n’obtient que la moitié droite de la parabole, parcourue en aller-retour.</p></div>`},
  {kind:'Méthode',h:'Éliminer le paramètre',
   p:'Pour reconnaître une courbe x(t), y(t), on cherche une relation entre x et y sans t. Si une coordonnée est simple, comme x = 1 + t, on <b>isole t</b> et on remplace. Avec des cosinus et des sinus, on utilise <b>cos² t + sin² t = 1</b>. En <b>polaires</b>, un point est repéré par sa distance r à l’origine et son angle θ : x = r cos θ et y = r sin θ.',
   demo:{enonce:'Reconnaître la courbe x = 1 + t, y = 2t, puis la courbe x = 2 + 3 cos t, y = −1 + 3 sin t.',
    etapes:[
     {f:'t = x − 1, donc y = 2(x − 1) = 2x − 2',w:'On isole t dans l’équation la plus simple, puis on remplace.'},
     {f:'C’est la droite y = 2x − 2.',w:'On obtient une relation affine entre x et y.'},
     {f:'cos t = (x − 2)/3 et sin t = (y + 1)/3',w:'On isole le cosinus et le sinus.'},
     {f:'((x − 2)/3)² + ((y + 1)/3)² = 1, soit (x − 2)² + (y + 1)² = 9',w:'cos² t + sin² t = 1, puis on multiplie par 9.'}],
    conclusion:'La première courbe est une droite, la seconde le cercle de centre (2 ; −1) et de rayon 3.'}},
  {h:'Reconnais la courbe',p:'<i>x = cos t</i>, <i>y = sin t</i> pour t de 0 à 2π décrit…',opts:['une droite','le cercle unité','une parabole','une spirale'],ans:1,why:'cos² t + sin² t = 1 : chaque point est à distance 1 de l’origine.'},
  {h:'Les coordonnées polaires',p:`<p>Pour une spirale ou une fleur, donner <i>x</i> et <i>y</i> est maladroit. Il est plus naturel de dire à quelle distance du centre se trouve le point, et dans quelle direction.</p>
<div class="def"><p>Les <b>coordonnées polaires</b> (<i>r</i> ; θ) d’un point M sont sa distance <b><i>r</i></b> à l’origine et l’angle <b>θ</b> entre l’axe des <i>x</i> et la demi-droite [OM). On passe aux coordonnées cartésiennes par <b><i>x</i> = <i>r</i> cos θ</b> et <b><i>y</i> = <i>r</i> sin θ</b> ; inversement, <i>r</i> = √(<i>x</i>² + <i>y</i>²).</p></div>
<div class="idea"><p>Une <b>courbe polaire</b> <i>r</i> = <i>f</i>(θ) donne la distance en fonction de la direction. C’est une courbe paramétrée de paramètre θ : <i>x</i> = <i>f</i>(θ) cos θ, <i>y</i> = <i>f</i>(θ) sin θ. Pour la tracer, on tourne autour de l’origine et on reporte, dans chaque direction θ, la distance <i>f</i>(θ).</p></div>
<div class="ex"><p>Le point (<i>r</i> ; θ) = (2 ; 60°) est en (2 cos 60° ; 2 sin 60°) = (1 ; √3) (figure). La courbe <i>r</i> = 2 est le cercle de rayon 2. Pour <i>r</i> = 2 cos θ, on multiplie par <i>r</i> : <i>r</i>² = 2<i>r</i> cos θ, soit <i>x</i>² + <i>y</i>² = 2<i>x</i>, ou (<i>x</i> − 1)² + <i>y</i>² = 1 : le cercle de centre (1 ; 0) et de rayon 1.</p></div>
<div class="warn"><p>Un même point a plusieurs écritures polaires : (2 ; 60°) et (2 ; 420°) désignent le même point, car 420° = 60° + 360°.</p></div>`,
   fig:(()=>{ const t=Math.PI/3,P=plane({x:[-0.6,2.6],y:[-0.4,2.2],step:.5,lab:1}); P.curve(u=>0.5*Math.cos(u),u=>0.5*Math.sin(u),0,t,{c:'var(--spark)',w:2.5}).seg(0,0,1,Math.sqrt(3),{c:'var(--accent)',w:3}).seg(1,0,1,Math.sqrt(3),{c:'var(--muted)',w:1.5,dash:true}).dot(1,Math.sqrt(3),{l:'M (1 ; √3)'}).text(0.55,0.3,'θ = 60°',{c:'var(--spark)'}).text(0.5,0.9,'r = 2',{a:'end',dx:-6}); return P.svg(); })()},
  {h:'En polaires',p:'En coordonnées polaires, la courbe <i>r = θ</i> (le rayon grandit avec l’angle) est…',opts:['un cercle','une droite','une spirale','une rose à 4 pétales'],ans:2,why:'À chaque tour, la distance au centre augmente de 2π : c’est la spirale d’Archimède.'},
  {h:'Le vecteur vitesse est tangent',p:`<p>Sur une trajectoire, dans quelle direction le point file-t-il à l’instant <i>t</i>, et à quelle vitesse&nbsp;? On répond comme pour la dérivée d’une fonction : on regarde ce qui se passe pendant un temps très court.</p>
<div class="def"><p>Le <b>vecteur vitesse</b> en <i>t</i> est la limite de (M(<i>t</i> + <i>h</i>) − M(<i>t</i>))/<i>h</i> quand <i>h</i> → 0, c’est-à-dire <b>M′(<i>t</i>) = (<i>x</i>′(<i>t</i>) ; <i>y</i>′(<i>t</i>))</b>. Sa norme <b>√(<i>x</i>′(<i>t</i>)² + <i>y</i>′(<i>t</i>)²)</b> est la vitesse du point.</p></div>
<div class="idea"><p>M(<i>t</i> + <i>h</i>) − M(<i>t</i>) est une petite corde de la courbe. Divisée par <i>h</i>, elle garde sa direction ; quand <i>h</i> → 0, la corde devient tangente. Si <i>x</i>′(<i>t</i>) ≠ 0, la pente de la tangente vaut donc <b><i>y</i>′(<i>t</i>)/<i>x</i>′(<i>t</i>)</b>.</p></div>
<div class="ex"><p>Sur l’ellipse <i>x</i> = 2 cos <i>t</i>, <i>y</i> = sin <i>t</i> : M′(<i>t</i>) = (−2 sin <i>t</i> ; cos <i>t</i>). En <i>t</i> = π/4, M ≈ (1,41 ; 0,71) et M′ = (−√2 ; √2/2) ≈ (−1,41 ; 0,71) : pente 0,71/(−1,41) = −½ et vitesse √(2 + 0,5) ≈ 1,58 (figure).</p></div>
<div class="blk" data-t="Remarque"><p>Sur le cercle <i>x</i> = 3 cos <i>t</i>, <i>y</i> = 3 sin <i>t</i>, M′(<i>t</i>) = (−3 sin <i>t</i> ; 3 cos <i>t</i>) est perpendiculaire au rayon (produit scalaire −9 sin <i>t</i> cos <i>t</i> + 9 sin <i>t</i> cos <i>t</i> = 0) et de norme 3. La vitesse est constante, mais le vecteur vitesse change sans cesse de direction.</p></div>`,
   fig:(()=>{ const t=Math.PI/4,x=2*Math.cos(t),y=Math.sin(t),P=plane({x:[-2.5,2.5],y:[-1.5,1.7],step:.5,lab:1}); P.curve(u=>2*Math.cos(u),u=>Math.sin(u),0,2*Math.PI,{c:'var(--muted)',w:2}).fn(z=>y-0.5*(z-x),{c:'var(--muted)',w:1,dash:true}).arrow(x,y,x-2*Math.sin(t),y+Math.cos(t),{c:'var(--spark)'}).dot(x,y,{l:'M(π/4)'}); return P.svg(); })()},
  {kind:'Méthode',h:'Vecteur vitesse et tangentes',
   p:'Le <b>vecteur vitesse</b> en t est <b>(x′(t) ; y′(t))</b> : il est tangent à la courbe, et sa norme √(x′² + y′²) est la <b>vitesse</b>. Tangente <b>horizontale</b> : y′ = 0 et x′ ≠ 0. Tangente <b>verticale</b> : x′ = 0 et y′ ≠ 0. Si x′ = y′ = 0, le point s’arrête un instant : la courbe peut former une pointe, un <b>point de rebroussement</b>. Le point le plus haut d’une trajectoire est atteint quand y′ = 0.',
   demo:{enonce:'Pour x = t², y = t³ − 3t : trouver les tangentes horizontales, la vitesse en t = 2 et la tangente en t = 0.',
    etapes:[
     {f:'(x′ ; y′) = (2t ; 3t² − 3)',w:'On dérive chaque coordonnée.'},
     {f:'y′ = 0 ⟺ t = ±1 : points (1 ; −2) et (1 ; 2)',w:'En t = ±1, x′ = ±2 ≠ 0 : les tangentes y sont horizontales.'},
     {f:'En t = 2 : (4 ; 9), vitesse √(16 + 81) = √97 ≈ 9,85',w:'Norme du vecteur vitesse.'},
     {f:'En t = 0 : (0 ; −3), tangente verticale',w:'x′ = 0 mais y′ ≠ 0.'}],
    conclusion:'Tangentes horizontales en (1 ; −2) et (1 ; 2), tangente verticale à l’origine, vitesse ≈ 9,85 en t = 2.'}},
  {h:'Le point le plus bas',p:'Un point suit <i>x = 3t</i>, <i>y = t² − 4t</i>. Pour quelle valeur de t la tangente est-elle horizontale&nbsp;?',lab:'t =',ans:2,why:'y′ = 2t − 4 = 0 pour t = 2, et x′ = 3 ≠ 0 : la tangente est horizontale au point (6 ; −4).'},
  {h:'Pourquoi la longueur est une intégrale',p:`<p>Comment mesurer la longueur d’une courbe&nbsp;? On l’approche par une ligne brisée, dont on sait mesurer les segments, puis on raffine le découpage.</p>
<div class="idea"><p>Entre <i>t</i> et <i>t</i> + Δ<i>t</i>, le point avance d’environ (<i>x</i>′(<i>t</i>)Δ<i>t</i> ; <i>y</i>′(<i>t</i>)Δ<i>t</i>) : le petit segment mesure √(<i>x</i>′² + <i>y</i>′²)·Δ<i>t</i>, c’est-à-dire vitesse × durée. En additionnant ces morceaux et en faisant tendre Δ<i>t</i> vers 0, la somme devient une intégrale.</p></div>
<div class="def"><p>La <b>longueur</b> d’une courbe parcourue une seule fois pour <i>t</i> ∈ [<i>a</i> ; <i>b</i>] est <b>L = ∫ₐᵇ √(<i>x</i>′(<i>t</i>)² + <i>y</i>′(<i>t</i>)²) d<i>t</i></b>.</p></div>
<div class="ex"><p>La parabole <i>x</i> = <i>t</i>, <i>y</i> = <i>t</i>², pour <i>t</i> ∈ [0 ; 1]. Avec deux segments (figure), de (0 ; 0) à (0,5 ; 0,25) puis à (1 ; 1) : √(0,25 + 0,0625) + √(0,25 + 0,5625) ≈ 0,559 + 0,901 = 1,460. L’intégrale ∫₀¹ √(1 + 4<i>t</i>²) d<i>t</i> vaut environ 1,479 : la ligne brisée est un peu plus courte, comme toujours, car un segment est le plus court chemin entre deux points.</p></div>
<div class="warn"><p>Si le point repasse au même endroit, l’intégrale compte chaque passage : <i>x</i> = cos <i>t</i>, <i>y</i> = sin <i>t</i> sur [0 ; 4π] donne 4π, deux tours du cercle unité. Par contre, la vitesse du parcours ne change pas la longueur : aller plus vite dure moins longtemps.</p></div>`,
   fig:(()=>{ const P=plane({x:[-0.2,1.2],y:[-0.1,1.1],step:.25,lx:.5,ly:.5}); P.fn(x=>x*x,{from:0,to:1,c:'var(--accent)',w:3}).poly([[0,0],[.5,.25],[1,1]],{open:true,c:'var(--spark)',w:2,dash:true}); [[0,0],[.5,.25],[1,1]].forEach(p=>P.dot(p[0],p[1],{r:4})); return P.svg(); })()},
  {kind:'Méthode',h:'Calculer une longueur d’arc',
   p:'La longueur parcourue entre t = a et t = b vaut <b>L = ∫ₐᵇ √(x′(t)² + y′(t)²) dt</b> : on additionne vitesse × petite durée. 1) Dérive x et y. 2) Calcule x′² + y′² et <b>simplifie</b> avant de prendre la racine, avec cos² + sin² = 1 ou <b>1 − cos t = 2 sin²(t/2)</b>. 3) Intègre, en vérifiant le signe de ce qui sort de la racine.',
   demo:{enonce:'Calculer la longueur de x = 3 cos t, y = 3 sin t pour t ∈ [0 ; π]. Puis simplifier la vitesse de x = t − sin t, y = 1 − cos t.',
    etapes:[
     {f:'x′ = −3 sin t et y′ = 3 cos t',w:'On dérive.'},
     {f:'x′² + y′² = 9(sin² t + cos² t) = 9, donc la vitesse vaut 3',w:'On simplifie avec cos² + sin² = 1.'},
     {f:'L = ∫₀^π 3 dt = 3π ≈ 9,42',w:'Contrôle : c’est un demi-cercle de rayon 3, de longueur π × 3 ✓'},
     {f:'(1 − cos t)² + sin² t = 1 − 2 cos t + cos² t + sin² t = 2 − 2 cos t = 4 sin²(t/2)',w:'On développe, puis on utilise 1 − cos t = 2 sin²(t/2). La vitesse vaut 2|sin(t/2)|.'}],
    conclusion:'Le demi-cercle mesure 3π ≈ 9,42. La vitesse de la seconde courbe vaut 2|sin(t/2)|.'}},
  {kind:'Défi',h:'Longueur d’arc',p:'Quelle est la longueur de la courbe <i>x = 2 cos t</i>, <i>y = 2 sin t</i> pour t ∈ [0 ; 2π]&nbsp;? (arrondie au centième)',ans:12.57,tol:.011,why:'L = ∫ √(x′² + y′²) dt = ∫₀^{2π} 2 dt = 4π ≈ 12,57.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Courbe paramétrée : <i>t</i> ↦ (<i>x</i>(<i>t</i>) ; <i>y</i>(<i>t</i>)). Son support est la trajectoire ; un même support peut être parcouru de plusieurs façons.</li>
<li>Éliminer <i>t</i> : l’isoler dans une coordonnée simple, ou utiliser cos² <i>t</i> + sin² <i>t</i> = 1. Attention aux restrictions, comme <i>x</i> = <i>t</i>² ≥ 0.</li>
<li>Polaires : <i>x</i> = <i>r</i> cos θ, <i>y</i> = <i>r</i> sin θ, <i>r</i> = √(<i>x</i>² + <i>y</i>²). La courbe <i>r</i> = <i>f</i>(θ) est paramétrée par θ.</li>
<li>Vecteur vitesse (<i>x</i>′ ; <i>y</i>′), tangent à la courbe ; vitesse √(<i>x</i>′² + <i>y</i>′²) ; pente de la tangente <i>y</i>′/<i>x</i>′.</li>
<li>Tangente horizontale : <i>y</i>′ = 0 et <i>x</i>′ ≠ 0. Verticale : <i>x</i>′ = 0 et <i>y</i>′ ≠ 0. Si <i>x</i>′ = <i>y</i>′ = 0, le point s’arrête : pointe possible.</li>
<li>Longueur : L = ∫ₐᵇ √(<i>x</i>′² + <i>y</i>′²) d<i>t</i>, en simplifiant sous la racine (cos² + sin² = 1, 1 − cos <i>t</i> = 2 sin²(<i>t</i>/2)).</li>
</ul></div>`},
  {kind:'Problème',h:'Le tir au but',
   p:'Un ballon est frappé depuis le sol. Sa position (en m) après <i>t</i> secondes est <i>x(t) = 12t</i>, <i>y(t) = 16t − 5t²</i>. On cherche quand et où il retombe, sa hauteur maximale et sa vitesse au sommet.',
   params:[{id:'t',l:'Temps t',min:0,max:3.2,step:.2,v:.8}],
   draw:v=>{ const P=plane({x:[-2,42],y:[-2,16],w:320,grid:false,lx:10,ly:5}); P.curve(t=>12*t,t=>16*t-5*t*t,0,3.2,{c:'var(--muted)',w:2,dash:true}).arrow(12*v.t,16*v.t-5*v.t*v.t,12*v.t+12*.25,16*v.t-5*v.t*v.t+(16-10*v.t)*.25,{c:'var(--spark)',w:2.5}).dot(12*v.t,16*v.t-5*v.t*v.t); return P.svg(); },
   info:v=>`vitesse (${fmt(12)} ; ${fmt(16-10*v.t)}) · norme ${fmt(Math.hypot(12,16-10*v.t))} m/s`,
   parts:[
    {q:'a) À quel instant le ballon retombe-t-il au sol ?',lab:'t =',unit:'s',ans:3.2,tol:.001,hint:'Résous y(t) = 0 avec t > 0.',why:'t(16 − 5t) = 0 donne t = 16/5 = 3,2 s.'},
    {q:'b) À quelle distance retombe-t-il ?',unit:'m',ans:38.4,tol:.001,hint:'Calcule x(3,2).',why:'12 × 3,2 = 38,4 m.'},
    {q:'c) Quelle hauteur maximale atteint-il ?',unit:'m',ans:12.8,tol:.001,hint:'Au sommet, y′(t) = 0.',why:'y′(t) = 16 − 10t = 0 en t = 1,6 s, et y(1,6) = 25,6 − 12,8 = 12,8 m.'},
    {q:'d) Quelle est sa vitesse (norme) au sommet ?',unit:'m/s',ans:12,tol:.001,hint:'Le vecteur vitesse est (x′(t) ; y′(t)).',why:'Au sommet, (x′ ; y′) = (12 ; 0), de norme 12 m/s : seule la composante horizontale reste.'},
   ],
   sol:'y(t) = t(16 − 5t) = 0 pour t = 3,2 s, et x(3,2) = 38,4 m.<br>Vitesse : (x′ ; y′) = (12 ; 16 − 10t). Le sommet est atteint quand y′ = 0, en t = 1,6 s.<br>Hauteur maximale : y(1,6) = 12,8 m, à x = 19,2 m, au milieu de la portée.<br>Au sommet, la vitesse est horizontale : 12 m/s, la plus petite du vol.'},
  {kind:'Problème',h:'L’arche de la cycloïde',
   p:'Un point collé sur une roue de rayon 1 qui roule sans glisser décrit la <b>cycloïde</b> <i>x(t) = t − sin t</i>, <i>y(t) = 1 − cos t</i>. On étudie sa vitesse et la longueur d’une arche, pour t ∈ [0 ; 2π].',
   params:[{id:'t',l:'Paramètre t',min:0,max:6.25,step:.25,v:1.5}],
   draw:v=>{ const P=plane({x:[-0.5,7],y:[-0.5,2.8],w:320,grid:false,lx:1,ly:1}); P.curve(t=>t-Math.sin(t),t=>1-Math.cos(t),0,2*Math.PI,{c:'var(--muted)',w:2}).circ(v.t,1,1,{c:'var(--math)',w:1.5}).seg(v.t,1,v.t-Math.sin(v.t),1-Math.cos(v.t),{c:'var(--math)',w:1.5}).curve(t=>t-Math.sin(t),t=>1-Math.cos(t),0,v.t,{c:'var(--accent)',w:3.5}).dot(v.t-Math.sin(v.t),1-Math.cos(v.t)); return P.svg(); },
   info:v=>`longueur parcourue : ${fmt(4-4*Math.cos(v.t/2),3)} · vitesse ${fmt(2*Math.abs(Math.sin(v.t/2)),3)}`,
   parts:[
    {q:'a) Quelle est la vitesse (norme) du point en t = π ?',ans:2,tol:.001,hint:'Vitesse : (1 − cos t ; sin t). Calcule sa norme en π.',why:'(1 − cos π ; sin π) = (2 ; 0), de norme 2. Au sommet, le point va deux fois plus vite que le centre de la roue.'},
    {q:'b) Que se passe-t-il en t = 0 ?',opts:['La vitesse est maximale','La vitesse est nulle : la courbe a un point de rebroussement','La courbe a une tangente horizontale','La courbe n’est pas définie'],ans:1,hint:'Évalue le vecteur vitesse en 0.',why:'(1 − cos 0 ; sin 0) = (0 ; 0). Le point touche le sol et s’arrête un instant : la cycloïde forme une pointe.'},
    {q:'c) Quelle est la longueur d’une arche ?',ans:8,tol:.001,hint:'(1 − cos t)² + sin² t = 2 − 2cos t = 4 sin²(t/2).',why:'L = ∫₀^{2π} 2 sin(t/2) dt = [−4 cos(t/2)]₀^{2π} = 4 + 4 = 8.'},
   ],
   sol:'Vecteur vitesse : (1 − cos t ; sin t), de norme √(2 − 2 cos t) = 2|sin(t/2)|.<br>En t = 0 et t = 2π, la vitesse est nulle : la cycloïde a des points de rebroussement au contact du sol.<br>En t = π, la vitesse vaut 2, le maximum.<br>Longueur : sur [0 ; 2π], sin(t/2) ≥ 0, donc L = ∫₀^{2π} 2 sin(t/2) dt = 8.<br>Résultat remarquable : une arche mesure exactement 4 fois le diamètre de la roue, sans aucun π.'},
 ]},
);
