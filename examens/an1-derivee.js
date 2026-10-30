/* Déclic — examen de compétence : Continuité et dérivabilité */
(()=>{
const x='<i>x</i>', h='<i>h</i>';
EXAMS['an1-derivee']=[
 {n:'Continuité au point de raccord', r:'Continuité d’une fonction définie par morceaux', qs:[
   {q:`f(${x}) = 3${x} − <i>a</i> si ${x} &lt; 1 et f(${x}) = ${x}² + 4 si ${x} ≥ 1. Pour quelle valeur de <i>a</i> la fonction est-elle continue en 1 ?`, lab:'<i>a</i> =', ans:-2, why:'f(1) = 1 + 4 = 5. À gauche, 3x − a → 3 − a. Continuité : 3 − a = 5, donc a = −2.'},
   {q:`f(${x}) = <i>k</i>${x}² si ${x} ≤ 2 et f(${x}) = 4${x} − 2 si ${x} &gt; 2. Pour quelle valeur de <i>k</i> la fonction est-elle continue en 2 ?`, lab:'<i>k</i> =', ans:1.5, show:'3/2', why:'f(2) = 4k. À droite, 4x − 2 → 6. Continuité : 4k = 6, donc k = 3/2.'},
   {q:`f(${x}) = ${x} + 1 si ${x} &lt; 0 et f(${x}) = e<sup><i>x</i></sup> + 1 si ${x} ≥ 0. La fonction est-elle continue en 0 ?`, opts:['Oui, car les deux formules sont continues','Non : la limite à gauche vaut 1, mais f(0) = 2','Oui : les deux côtés valent 1','Non, car eˣ n’est pas un polynôme'], ans:1, why:'f(0) = e⁰ + 1 = 2, mais à gauche x + 1 → 1. Les deux côtés ne se rejoignent pas : la courbe saute en 0.'},
   {q:`f(${x}) = 2${x} + 1 si ${x} &lt; 3 et f(${x}) = ${x}² − 2 si ${x} ≥ 3. En 3, la fonction est…`, opts:['continue et dérivable','continue mais pas dérivable','ni continue ni dérivable','dérivable mais pas continue'], ans:1, why:'f(3) = 9 − 2 = 7 et à gauche 2 · 3 + 1 = 7 : continue. Mais la pente vaut 2 à gauche et 2 · 3 = 6 à droite : point anguleux, pas dérivable.'},
   {q:`f(${x}) = ${x}² + 1 si ${x} ≤ 2 et f(${x}) = <i>ax</i> + <i>b</i> si ${x} &gt; 2. On veut f dérivable en 2. Que vaut <i>b</i> ?`, lab:'<i>b</i> =', ans:-3, why:'Pentes égales : a = 2 · 2 = 4. Continuité : 2a + b = f(2) = 5, donc b = 5 − 8 = −3.'},
 ]},
 {n:'Prolonger par continuité', r:'Continuité', qs:[
   {q:`Par quelle valeur faut-il prolonger f(${x}) = ${F(x+'² − 25',x+' + 5')} en ${x} = −5 ?`, lab:'f(−5) =', ans:-10, why:'Pour x ≠ −5, f(x) = (x − 5)(x + 5)/(x + 5) = x − 5, qui tend vers −10.'},
   {q:`Par quelle valeur faut-il prolonger f(${x}) = ${F('sin(4'+x+')',x)} en 0 ?`, lab:'f(0) =', ans:4, why:'sin(4x) ~ 4x en 0, donc f(x) → 4x/x = 4. On pose f(0) = 4.'},
   {q:`Par quelle valeur faut-il prolonger f(${x}) = ${F('√'+x+' − 1',x+' − 1')} en ${x} = 1 ?`, lab:'f(1) =', ans:0.5, show:'1/2', why:'Conjugué : (√x − 1)(√x + 1) = x − 1, donc f(x) = 1/(√x + 1) pour x ≠ 1, qui tend vers 1/2.'},
 ]},
 {n:'La dérivée par la définition', r:'Dériver avec la définition', qs:[
   {q:`Pour f(${x}) = ${x}² + 3${x}, calcule f′(1) avec la limite du taux (f(1 + ${h}) − f(1))/${h}.`, lab:'f′(1) =', ans:5, why:'f(1 + h) − f(1) = 1 + 2h + h² + 3 + 3h − 4 = 5h + h². Divisé par h : 5 + h → 5.'},
   {q:`Pour f(${x}) = ${x}³, le taux (f(1 + ${h}) − f(1))/${h} se simplifie en…`, opts:['3 + 3h + h²','3 + h','3h + 3h² + h³','1 + 3h'], ans:0, why:'(1 + h)³ − 1 = 3h + 3h² + h³. On divise par h : 3 + 3h + h², qui tend vers f′(1) = 3.'},
   {q:`Pour f(${x}) = 3/${x}, calcule f′(3) avec la définition.`, lab:'f′(3) =', ans:-1/3, show:'−1/3', why:'f(3 + h) − f(3) = 3/(3 + h) − 1 = −h/(3 + h). Divisé par h : −1/(3 + h) → −1/3.'},
   {q:`Pour f(${x}) = √${x}, calcule f′(4) avec la définition.`, lab:'f′(4) =', ans:0.25, show:'1/4', why:'Taux : (√(4 + h) − 2)/h. Avec le conjugué : h/(h(√(4 + h) + 2)) = 1/(√(4 + h) + 2) → 1/4.'},
 ]},
 {n:'Dérivabilité et continuité', r:'Dérivable ⇒ continue, pas l’inverse', qs:[
   {q:'Laquelle de ces affirmations est vraie ?', opts:['Une fonction continue en a est dérivable en a','Une fonction dérivable en a est continue en a','|x| est dérivable en 0','Une fonction peut être dérivable en a sans y être continue'], ans:1, why:'f(a + h) − f(a) = h · (taux) → 0 · f′(a) = 0 : dérivable entraîne continue. La réciproque est fausse, |x| le montre.'},
   {q:`Pour f(${x}) = |${x} − 2|, que vaut la limite du taux (f(2 + ${h}) − f(2))/${h} quand ${h} → 0⁻ ?`, lab:'limite =', ans:-1, why:'f(2 + h) − f(2) = |h|. Pour h &lt; 0, |h|/h = −h/h = −1. À droite, on trouverait 1 : pas de dérivée en 2.'},
   {q:`En ${x} = 2, la fonction f(${x}) = |${x}² − 4| est…`, opts:['dérivable, avec f′(2) = 4','continue mais pas dérivable : point anguleux','pas continue','dérivable, avec f′(2) = 0'], ans:1, why:'f est continue (valeur absolue d’un polynôme). Juste à droite, f(x) = x² − 4, pente 4 ; juste à gauche, f(x) = 4 − x², pente −4. Deux demi-tangentes différentes.'},
 ]},
 {n:'Règles de dérivation', r:'Règles de dérivation', qs:[
   {q:`Soit f(${x}) = ${x}³ ln ${x}. Calcule f′(1).`, lab:'f′(1) =', ans:1, why:'Produit : f′(x) = 3x² ln x + x³ · 1/x = 3x² ln x + x². En 1 : 0 + 1 = 1.'},
   {q:`Soit f(${x}) = ${x}² e<sup><i>x</i></sup>. Calcule f′(1), arrondi au centième.`, lab:'f′(1) ≈', ans:3*Math.E, tol:0.006, show:'3e ≈ 8,15', why:'Produit : f′(x) = 2x eˣ + x² eˣ = (x² + 2x)eˣ. En 1 : 3e ≈ 8,15.'},
   {q:`Soit f(${x}) = ${F('2'+x+' + 1',x+' − 1')}. Calcule f′(2).`, lab:'f′(2) =', ans:-3, why:'Quotient : f′(x) = (2(x − 1) − (2x + 1))/(x − 1)² = −3/(x − 1)². En 2 : −3/1 = −3.'},
   {q:`Un élève dérive f(${x}) = ${x} cos ${x} et écrit f′(${x}) = −sin ${x}. Quelle est la bonne dérivée ?`, opts:['−sin x, il a raison','cos x − x sin x','cos x + x sin x','−x sin x'], ans:1, why:'(fg)′ n’est pas f′g′. Règle du produit : (x)′ cos x + x (cos x)′ = cos x − x sin x.'},
 ]},
 {n:'Dériver une expression composée', r:'Dériver une expression composée', qs:[
   {q:`Soit f(${x}) = (3${x} − 2)⁴. Calcule f′(1).`, lab:'f′(1) =', ans:12, why:'(uⁿ)′ = n u′ uⁿ⁻¹ avec u = 3x − 2 : f′(x) = 4 · 3 · (3x − 2)³. En 1 : 12 · 1³ = 12.'},
   {q:`Soit f(${x}) = e<sup><i>x</i>²</sup>. Calcule f′(1), arrondi au centième.`, lab:'f′(1) ≈', ans:2*Math.E, tol:0.006, show:'2e ≈ 5,44', why:'(eᵘ)′ = u′eᵘ avec u = x² : f′(x) = 2x e<sup>x²</sup>. En 1 : 2e ≈ 5,44.'},
   {q:`Soit f(${x}) = ln(${x}² + 3). Calcule f′(1).`, lab:'f′(1) =', ans:0.5, show:'1/2', why:'(ln u)′ = u′/u : f′(x) = 2x/(x² + 3). En 1 : 2/4 = 1/2.'},
   {q:`Quelle est la dérivée de f(${x}) = sin² ${x} = (sin ${x})² ?`, opts:['2 sin x','2 sin x cos x','cos² x','2 cos x'], ans:1, why:'(u²)′ = 2u′u avec u = sin x et u′ = cos x : f′(x) = 2 sin x cos x.'},
   {q:`Soit f(${x}) = ${x}√(${x} + 1). Calcule f′(3).`, lab:'f′(3) =', ans:2.75, show:'11/4', why:'Produit, puis (√u)′ = u′/(2√u) : f′(x) = √(x + 1) + x/(2√(x + 1)). En 3 : 2 + 3/4 = 11/4.'},
   {q:`Soit f(${x}) = ${F('e<sup>2<i>x</i></sup>',x+' + 1')}. Calcule f′(1), arrondi au centième.`, lab:'f′(1) ≈', ans:Math.exp(2)*3/4, tol:0.006, show:'3e²/4 ≈ 5,54', why:'Quotient avec u = e²ˣ, u′ = 2e²ˣ : f′(x) = (2e²ˣ(x + 1) − e²ˣ)/(x + 1)² = e²ˣ(2x + 1)/(x + 1)². En 1 : 3e²/4 ≈ 5,54.'},
 ]},
 {n:'L’équation de la tangente', r:'L’équation de la tangente', qs:[
   {q:`La tangente au graphe de f(${x}) = ${x}² − 3${x} au point d’abscisse 1 s’écrit <i>y</i> = <i>mx</i> + <i>p</i>. Que vaut <i>p</i> ?`, lab:'<i>p</i> =', ans:-1, why:'f(1) = −2 et f′(x) = 2x − 3, donc f′(1) = −1. y = −2 − (x − 1) = −x − 1 : p = −1.'},
   {q:`Quelle est la tangente au graphe de f(${x}) = √${x} au point d’abscisse 4 ?`, opts:['y = x/4 + 1','y = x/4 + 2','y = x/2','y = 4x − 14'], ans:0, why:'f(4) = 2 et f′(x) = 1/(2√x), donc f′(4) = 1/4. y = 2 + (x − 4)/4 = x/4 + 1.'},
   {q:'Avec la tangente au graphe de eˣ en 0, donne une valeur approchée de e<sup>0,1</sup>.', lab:'e<sup>0,1</sup> ≈', ans:1.1, why:'f(0) = 1 et f′(0) = e⁰ = 1 : la tangente est y = 1 + x. Près de 0, e<sup>0,1</sup> ≈ 1 + 0,1 = 1,1 (valeur exacte 1,105…).'},
   {q:`La tangente au graphe de f(${x}) = ${x}³ au point d’abscisse 2 coupe l’axe O${x}. En quelle abscisse ?`, lab:`${x} =`, ans:4/3, show:'4/3', why:'f(2) = 8 et f′(2) = 3 · 4 = 12 : y = 8 + 12(x − 2) = 12x − 16. Elle coupe Ox pour x = 16/12 = 4/3.'},
   {q:`En quelle abscisse la tangente au graphe de f(${x}) = ${x}² est-elle parallèle à la droite <i>y</i> = 6${x} + 1 ?`, lab:`${x} =`, ans:3, why:'Deux droites parallèles ont la même pente : il faut f′(a) = 2a = 6, donc a = 3.'},
 ]},
];
})();
