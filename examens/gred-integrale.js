/* Déclic — examen de compétence : La notion d’intégrale */
(()=>{
const x='<i>x</i>', f='<i>f</i>';
const I=(a,b,g)=>`∫<sub>${a}</sub><sup>${b}</sup> ${g} d<i>x</i>`;
EXAMS['gred-integrale']=[
 {n:'Sommes inférieures et supérieures', r:'Sommes inférieures et sommes supérieures', qs:[
   {q:`Calcule la somme inférieure <i>s</i>₄ de ${f}(${x}) = ${x}² sur [0 ; 2] (4 morceaux égaux).`, lab:'s₄ =', ans:1.75, tol:1e-6, why:'h = 0,5 ; f croissante : hauteurs aux bords gauches 0 ; 0,5 ; 1 ; 1,5. s₄ = 0,5 · (0 + 0,25 + 1 + 2,25) = 1,75.'},
   {q:`Calcule la somme supérieure <i>S</i>₃ de ${f}(${x}) = 2${x} sur [0 ; 3] (3 morceaux égaux).`, lab:'S₃ =', ans:12, tol:1e-6, why:'h = 1 ; f croissante : bords droits 1, 2, 3, hauteurs 2, 4, 6. S₃ = 1 · (2 + 4 + 6) = 12.'},
   {q:`Calcule la somme inférieure <i>s</i>₂ de ${f}(${x}) = 4 − ${x}² sur [0 ; 2] (2 morceaux égaux).`, lab:'s₂ =', ans:3, tol:1e-6, why:'h = 1 ; f est décroissante : le minimum de chaque morceau est au bord droit, 1 et 2, où f vaut 3 et 0. s₂ = 1 · (3 + 0) = 3.'},
   {q:`Calcule la somme supérieure <i>S</i>₂ de ${f}(${x}) = 4 − ${x}² sur [0 ; 2].`, lab:'S₂ =', ans:7, tol:1e-6, why:'f décroissante : maximum aux bords gauches 0 et 1, où f vaut 4 et 3. S₂ = 1 · (4 + 3) = 7.'},
   {q:'On ajoute un point à une subdivision σ pour obtenir σ′. Laquelle de ces affirmations est vraie ?', opts:['s(f, σ′) ≤ s(f, σ) et S(f, σ′) ≥ S(f, σ)','s(f, σ′) ≥ s(f, σ) et S(f, σ′) ≤ S(f, σ)','Les deux sommes augmentent','Les deux sommes sont inchangées'], ans:1, why:'Couper un morceau ne peut qu’augmenter la borne inférieure de chaque partie et diminuer la borne supérieure : la somme inférieure monte (ou stagne), la supérieure descend (ou stagne).'},
 ]},
 {n:'Définition de l’intégrale', r:'Fonction intégrable, intégrale', qs:[
   {q:`Que vaut ${I('2','5','3')} ?`, lab:'intégrale =', ans:9, why:'Pour une fonction constante, toutes les sommes valent c(b − a) = 3 · (5 − 2) = 9.'},
   {q:'Une fonction bornée <i>f</i> sur [<i>a</i> ; <i>b</i>] est intégrable quand…', opts:['elle est continue en au moins un point','la borne supérieure des sommes inférieures égale la borne inférieure des sommes supérieures','toutes ses sommes inférieures sont égales','elle est positive'], ans:1, why:'C’est la définition : s* = S*. La positivité ou la continuité en un point n’ont rien à voir.'},
   {q:'Sur [0 ; 1], la fonction qui vaut 1 aux rationnels et 0 aux irrationnels…', opts:['est intégrable d’intégrale 1','est intégrable d’intégrale 1/2','n’est pas intégrable : toutes les sommes inférieures valent 0 et toutes les supérieures valent 1','n’est pas bornée'], ans:2, why:'Tout morceau contient des rationnels et des irrationnels : mₖ = 0 et Mₖ = 1 partout, donc s* = 0 ≠ S* = 1.'},
   {q:`Laquelle de ces expressions désigne un nombre différent des autres ?`, opts:['∫₀¹ x² dx','∫₀¹ t² dt','∫₀¹ u² du','∫₀ˣ t² dt'], ans:3, why:'La variable d’intégration est muette : les trois premières valent 1/3. La dernière dépend de la borne x : c’est une fonction de x (égale à x³/3).'},
 ]},
 {n:'Fonctions intégrables et écart des sommes', r:'Les fonctions monotones et les fonctions continues sont intégrables', qs:[
   {q:`Pour ${f}(${x}) = ${x}² sur [0 ; 3] (croissante) et <i>n</i> morceaux égaux, que vaut <i>S</i>ₙ − <i>s</i>ₙ ?`, opts:['9/n','27/n','3/n','27/n²'], ans:1, why:'Sₙ − sₙ = h · (f(3) − f(0)) = (3/n) · 9 = 27/n.'},
   {q:`Pour ${f}(${x}) = ${x}³ sur [0 ; 1], quel est le plus petit <i>n</i> tel que <i>S</i>ₙ − <i>s</i>ₙ &lt; 0,02 ?`, lab:'n =', ans:51, why:'Sₙ − sₙ = (1/n)(1 − 0) = 1/n. 1/n &lt; 0,02 ⇔ n &gt; 50 : n = 51 (pour n = 50 l’écart vaut exactement 0,02).'},
   {q:`Pour ${f}(${x}) = ${x}² sur [0 ; 3], quel est le plus petit <i>n</i> tel que <i>S</i>ₙ − <i>s</i>ₙ ≤ 0,1 ?`, lab:'n =', ans:270, why:'27/n ≤ 0,1 ⇔ n ≥ 270.'},
   {q:'Laquelle de ces fonctions n’est pas forcément intégrable sur [0 ; 1] ?', opts:['Une fonction croissante','Une fonction continue','Une fonction bornée quelconque','Une fonction décroissante'], ans:2, why:'Les fonctions monotones et les fonctions continues sont intégrables. Une fonction bornée quelconque ne l’est pas toujours : exemple de la fonction qui vaut 1 aux rationnels et 0 ailleurs.'},
 ]},
 {n:'Intégrale par les sommes', r:'Calculer une intégrale par les sommes', qs:[
   {q:`Pour ${f}(${x}) = ${x}, la somme supérieure sur [0 ; <i>a</i>] vaut <i>a</i>²(<i>n</i> + 1)/(2<i>n</i>). Que vaut <i>S</i>₁₀ sur [0 ; 2] ?`, lab:'S₁₀ =', ans:2.2, tol:1e-6, why:'a = 2, n = 10 : 4 · 11/20 = 2,2. Elle dépasse la valeur exacte 2 de 2/n = 0,2.'},
   {q:`Pour ${f}(${x}) = ${x} sur [0 ; 3] avec <i>n</i> = 6, calcule la somme inférieure <i>s</i>₆.`, lab:'s₆ =', ans:3.75, tol:1e-6, why:'h = 0,5, bords gauches 0 ; 0,5 ; … ; 2,5 : somme 7,5, fois 0,5 : 3,75. Formule : a²(n − 1)/(2n) = 9 · 5/12 = 3,75.'},
   {q:'Quelle est la limite de <i>n</i>(<i>n</i> + 1)(2<i>n</i> + 1)/(6<i>n</i>³) quand <i>n</i> → ∞ (fraction acceptée) ?', lab:'limite =', ans:1/3, tol:1e-4, show:'1/3', why:'Le numérateur est équivalent à 2n³ : la limite est 2/6 = 1/3. C’est la somme supérieure de x² sur [0 ; 1], qui donne ∫₀¹ x² dx = 1/3.'},
   {q:`Que vaut ${I('0','3',x+'²')} ?`, lab:'intégrale =', ans:9, why:'Intégrale de référence a³/3 avec a = 3 : 27/3 = 9.'},
 ]},
 {n:'Linéarité et Chasles', r:'Calculer une intégrale avec les intégrales de référence', qs:[
   {q:`Calcule ${I('0','2','('+x+'² + 3'+x+')')} (fraction ou arrondi au millième).`, lab:'intégrale =', ans:26/3, tol:1e-3, show:'26/3', why:'8/3 + 3 · 4/2 = 8/3 + 6 = 26/3 ≈ 8,667.'},
   {q:`Calcule ${I('1','2','(3'+x+'² − 1)')}.`, lab:'intégrale =', ans:6, tol:1e-6, why:'3 · (8 − 1)/3 − (2 − 1) = 7 − 1 = 6.'},
   {q:`Calcule ${I('0','1','(4'+x+'³ − 2'+x+')')}.`, lab:'intégrale =', ans:0, tol:1e-6, why:'4 · 1/4 − 2 · 1/2 = 1 − 1 = 0. La fonction est négative sur ]0 ; 1/√2[ et positive ensuite : les deux parties se compensent.'},
   {q:`On sait que ${I('0','5',f+'('+x+')')} = 7 et ${I('0','2',f+'('+x+')')} = 3. Que vaut ${I('2','5',f+'('+x+')')} ?`, lab:'intégrale =', ans:4, why:'Relation de Chasles : ∫₀⁵ = ∫₀² + ∫₂⁵, donc ∫₂⁵ f = 7 − 3 = 4.'},
   {q:`Que vaut ${I('3','1',x)} (bornes dans cet ordre) ?`, lab:'intégrale =', ans:-4, why:'∫₃¹ = −∫₁³ x dx = −(9 − 1)/2 = −4.'},
   {q:`Calcule ${I('−1','2',x+'²')}.`, lab:'intégrale =', ans:3, tol:1e-6, why:'(2³ − (−1)³)/3 = (8 + 1)/3 = 3.'},
 ]},
 {n:'Encadrer une intégrale', r:'Positivité, croissance et inégalité de la moyenne', qs:[
   {q:`Sur [0 ; 1], 1/2 ≤ 1/(1 + ${x}) ≤ 1. Quel encadrement en déduit-on pour ${I('0','1','1/(1 + '+x+')')} ?`, opts:['entre 0 et 1/2','entre 1/2 et 1','entre 1 et 2','entre 1/2 et 2'], ans:1, why:'Inégalité de la moyenne : (1/2)(1 − 0) ≤ ∫ ≤ 1 · (1 − 0). La valeur exacte est ln 2 ≈ 0,693.'},
   {q:`Si 2 ≤ ${f}(${x}) ≤ 5 sur [1 ; 4], quelle est la plus grande valeur possible de ${I('1','4',f+'('+x+')')} ?`, lab:'maximum =', ans:15, why:'M(b − a) = 5 · 3 = 15. Le minimum possible est 2 · 3 = 6.'},
   {q:'Laquelle de ces affirmations est vraie ?', opts:['Si ∫₀² f = 0 alors f = 0 sur [0 ; 2]','Si f ≤ g sur [a ; b] (a &lt; b) alors ∫ₐᵇ f ≤ ∫ₐᵇ g','∫ₐᵇ (f · g) = ∫ₐᵇ f · ∫ₐᵇ g','Si f ≥ 0 alors ∫ᵇₐ f ≥ 0 quel que soit l’ordre de a et b'], ans:1, why:'C’est la croissance de l’intégrale. ∫ = 0 n’impose pas f = 0 (f(x) = x − 1 sur [0 ; 2]), le produit n’est pas linéaire, et le signe dépend de l’ordre des bornes.'},
   {q:`Sans calcul, compare ${I('0','1',x+'³')} et ${I('0','1',x+'²')}.`, opts:['∫ x³ &gt; ∫ x²','∫ x³ = ∫ x²','∫ x³ &lt; ∫ x²','On ne peut pas comparer sans calculer'], ans:2, why:'Sur [0 ; 1], x³ ≤ x² (car x ≤ 1), donc par croissance ∫₀¹ x³ ≤ ∫₀¹ x². En effet 1/4 &lt; 1/3.'},
 ]},
 {n:'Valeur moyenne', r:'La valeur moyenne d’une fonction', qs:[
   {q:`Calcule la valeur moyenne de ${f}(${x}) = ${x}² sur [0 ; 6].`, lab:'μ =', ans:12, tol:1e-6, why:'∫₀⁶ x² dx = 216/3 = 72. μ = 72/6 = 12.'},
   {q:`Calcule la valeur moyenne de ${f}(${x}) = 3${x} + 2 sur [0 ; 4].`, lab:'μ =', ans:8, tol:1e-6, why:'∫₀⁴ (3x + 2) dx = 3 · 8 + 8 = 32. μ = 32/4 = 8 (valeur au milieu x = 2, comme pour toute fonction affine).'},
   {q:`Calcule la valeur moyenne de ${f}(${x}) = ${x}³ sur [0 ; 2].`, lab:'μ =', ans:2, tol:1e-6, why:'∫₀² x³ dx = 16/4 = 4. μ = 4/2 = 2.'},
   {q:'<i>f</i> est continue sur [0 ; 3], de valeur moyenne 5. Que garantit le théorème de la moyenne ?', opts:['f(1,5) = 5','Il existe c ∈ [0 ; 3] tel que f(c) = 5','f ≤ 5 sur [0 ; 3]','∫₀³ f = 5'], ans:1, why:'Pour une fonction continue, la moyenne est une valeur prise : il existe c avec f(c) = μ = 5. L’intégrale vaut μ(b − a) = 15, et rien n’impose c = 1,5.'},
 ]},
];
})();
