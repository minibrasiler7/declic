/* Déclic — examen de compétence : Fonctions polynomiales et rationnelles */
(()=>{
EXAMS['gred-fonctions-pol']=[
 {n:'Polynôme formel et fonction polynomiale', r:'ℝ[T] et Pol(ℝ) sont isomorphes', qs:[
   {q:'Laquelle de ces fonctions ℝ → ℝ est polynomiale&nbsp;?', opts:['<i>x</i> ↦ |<i>x</i>³|','<i>x</i> ↦ 1/(<i>x</i>² + 1)','<i>x</i> ↦ (<i>x</i> + 2)² − (<i>x</i> − 2)²','<i>x</i> ↦ 3<sup><i>x</i></sup>'], ans:2, why:'(<i>x</i> + 2)² − (<i>x</i> − 2)² = 8<i>x</i> pour tout <i>x</i> : c’est la fonction du polynôme 8T. Les trois autres ne sont la fonction d’aucun polynôme.'},
   {q:'Lequel de ces polynômes de F₂[T] est non nul mais définit la fonction nulle sur F₂&nbsp;?', opts:['T⁴ + 1','T³ + T + 1','T⁴ + T²','T²'], ans:2, why:'T⁴ + T² vaut 0 en 0 et 1 + 1 = 0 en 1. Au contraire T⁴ + 1 et T³ + T + 1 valent 1 en 0, et T² vaut 1 en 1.'},
   {q:'Combien existe-t-il de fonctions de F₃ dans F₃&nbsp;?', lab:'fonctions :', ans:27, why:'On choisit une image parmi 3 pour chacun des 3 éléments : 3³ = 27. Il y a une infinité de polynômes dans F₃[T], donc Φ ne peut pas être injectif.'},
   {q:'Un polynôme réel <i>P</i> de degré ≤ 3 vérifie <i>P</i>(<i>x</i>) = <i>x</i>³ pour <i>x</i> = 0, 1, 2 et 3. Que peut-on conclure&nbsp;?', opts:['Rien : on ne connaît <i>P</i> qu’en quatre points','<i>P</i> = T³, car <i>P</i> − T³ est de degré ≤ 3 et a 4 racines','<i>P</i> = T³ + <i>k</i> pour un réel <i>k</i>','<i>P</i> est de degré 4'], ans:1, why:'<i>P</i> − T³ est de degré ≤ 3 et s’annule en 4 points. Un polynôme non nul de degré ≤ 3 a au plus 3 racines, donc <i>P</i> − T³ = 0.'},
 ]},
 {n:'Évaluer sans développer', r:'Évaluer sans développer', qs:[
   {q:'Quelle est la somme des coefficients de <i>P</i> = (T³ − 2T + 3)⁴(T + 1)²&nbsp;?', lab:'somme =', ans:64, why:'C’est <i>P</i>(1) = (1 − 2 + 3)⁴·(1 + 1)² = 2⁴·4 = 64.'},
   {q:'Quel est le coefficient constant de <i>P</i> = (T − 2)⁵(3T + 1)³&nbsp;?', lab:'coefficient :', ans:-32, why:'C’est <i>P</i>(0) = (−2)⁵·1³ = −32.'},
   {q:'Pour <i>P</i> = (T² + T + 1)⁶(2T + 3) = <i>a</i>₀ + <i>a</i>₁T + <i>a</i>₂T² + ⋯, que vaut <i>a</i>₀ − <i>a</i>₁ + <i>a</i>₂ − <i>a</i>₃ + ⋯&nbsp;?', lab:'somme alternée :', ans:1, why:'La somme alternée vaut <i>P</i>(−1) = (1 − 1 + 1)⁶·(−2 + 3) = 1·1 = 1.'},
   {q:'Que vaut <i>P</i>(2) pour <i>P</i> = (T + 1)³(T − 1)²&nbsp;?', lab:'P(2) =', ans:27, why:'L’évaluation respecte les produits : <i>P</i>(2) = 3³·1² = 27, sans développer.'},
 ]},
 {n:'Racines et facteur T − a', r:'Racines et facteur T − a', qs:[
   {q:'Quel est le reste de la division euclidienne de T³ − 2T + 5 par T − 2&nbsp;?', lab:'reste :', ans:9, why:'Le reste de la division par T − <i>a</i> vaut <i>P</i>(<i>a</i>) : 2³ − 2·2 + 5 = 8 − 4 + 5 = 9.'},
   {q:'Pour quelle valeur de <i>k</i> le polynôme T³ + <i>k</i>T − 4 est-il divisible par T − 2&nbsp;?', lab:'k =', ans:-2, why:'T − 2 divise <i>P</i> ⇔ <i>P</i>(2) = 0 : 8 + 2<i>k</i> − 4 = 0, donc <i>k</i> = −2.'},
   {q:'Combien de racines le polynôme T² − 1 a-t-il dans ℤ/15ℤ&nbsp;?', lab:'racines :', ans:4, why:'On cherche <i>x</i> avec <i>x</i>² ≡ 1 mod 15 : 1, 4 (16), 11 (121 = 8·15 + 1) et 14. Quatre racines pour un degré 2 : c’est possible car ℤ/15ℤ n’est pas intègre (3·5 = 0).'},
 ]},
 {n:'Factoriser avec le schéma de Horner', r:'Factoriser par T − a (schéma de Horner)', qs:[
   {q:'−1 est racine de <i>P</i> = T³ − 4T² + T + 6. Quelle est la plus grande racine de <i>P</i>&nbsp;?', lab:'racine :', ans:3, why:'Horner avec 1, −4, 1, 6 et <i>a</i> = −1 : 1 ; −5 ; 6 ; 0. Donc <i>P</i> = (T + 1)(T² − 5T + 6) = (T + 1)(T − 2)(T − 3), de racines −1, 2 et 3.'},
   {q:'Quel est le produit des trois racines de <i>P</i> = T³ + 2T² − 5T − 6&nbsp;?', lab:'produit :', ans:6, why:'<i>P</i>(−1) = −1 + 2 + 5 − 6 = 0. Horner (1, 2, −5, −6 ; <i>a</i> = −1) : 1 ; 1 ; −6 ; 0, donc <i>P</i> = (T + 1)(T² + T − 6) = (T + 1)(T + 3)(T − 2). Produit : (−1)(−3)(2) = 6.'},
   {q:'On divise 2T³ − 3T² − 11T + 6 par T − 3 avec le schéma de Horner. Quel est le quotient&nbsp;?', opts:['2T² − 9T + 16','2T² + 3T − 2','2T² − 3T − 2','T² + 3T − 2'], ans:1, why:'On recopie 2, puis 2·3 − 3 = 3, puis 3·3 − 11 = −2, puis −2·3 + 6 = 0. Le reste est nul et le quotient a pour coefficients 2, 3, −2.'},
 ]},
 {n:'Multiplicité d’une racine', r:'Multiplicité d’une racine', qs:[
   {q:'Quelle est la multiplicité de la racine 2 dans <i>P</i> = T³ − 5T² + 8T − 4&nbsp;?', lab:'m =', ans:2, why:'Horner en 2 : 1 ; −3 ; 2 ; 0, donc <i>P</i> = (T − 2)(T² − 3T + 2). En 2 encore : 1 ; −1 ; 0, donc <i>P</i> = (T − 2)²(T − 1), et 2 n’est pas racine de T − 1.'},
   {q:'Quelle est la multiplicité de la racine −1 dans <i>P</i> = T⁴ + 2T³ − 2T − 1&nbsp;?', lab:'m =', ans:3, why:'Horner en −1 trois fois : quotients T³ + T² − T − 1, puis T² − 1, puis T − 1. Donc <i>P</i> = (T + 1)³(T − 1), et −1 n’est pas racine de T − 1.'},
   {q:'Comment se comporte la courbe de <i>x</i> ↦ (<i>x</i> − 1)²(<i>x</i> + 2) au point d’abscisse 1&nbsp;?', opts:['Elle traverse l’axe','Elle touche l’axe sans le traverser','Elle a une asymptote verticale','Elle ne passe pas par l’axe'], ans:1, why:'1 est racine de multiplicité 2, paire : (<i>x</i> − 1)² ≥ 0 ne change pas de signe, et le facteur <i>x</i> + 2 garde le signe + près de 1. La courbe touche l’axe et rebrousse chemin.'},
 ]},
 {n:'Déterminer un polynôme par ses valeurs', r:'Déterminer un polynôme par ses valeurs', qs:[
   {q:'<i>P</i> est un polynôme réel de degré ≤ 2 avec <i>P</i>(0) = −1, <i>P</i>(1) = 2 et <i>P</i>(2) = 9. Que vaut <i>P</i>(3)&nbsp;?', lab:'P(3) =', ans:20, why:'<i>c</i> = −1, puis <i>a</i> + <i>b</i> = 3 et 4<i>a</i> + 2<i>b</i> = 10, d’où <i>a</i> = 2 et <i>b</i> = 1. <i>P</i> = 2T² + T − 1 et <i>P</i>(3) = 18 + 3 − 1 = 20.'},
   {q:'<i>P</i> est un polynôme réel de degré ≤ 2 avec <i>P</i>(−1) = 4, <i>P</i>(0) = 1 et <i>P</i>(1) = 2. Que vaut <i>P</i>(2)&nbsp;?', lab:'P(2) =', ans:7, why:'<i>c</i> = 1, puis <i>a</i> − <i>b</i> = 3 et <i>a</i> + <i>b</i> = 1, d’où <i>a</i> = 2 et <i>b</i> = −1. <i>P</i> = 2T² − T + 1 et <i>P</i>(2) = 8 − 2 + 1 = 7.'},
   {q:'<i>P</i> est un polynôme réel de degré 2, de racines 1 et 4, avec <i>P</i>(0) = 8. Que vaut <i>P</i>(2)&nbsp;?', lab:'P(2) =', ans:-4, why:'<i>P</i> = <i>k</i>(T − 1)(T − 4) et <i>P</i>(0) = 4<i>k</i> = 8, donc <i>k</i> = 2. <i>P</i>(2) = 2·1·(−2) = −4.'},
   {q:'<i>P</i> est un polynôme réel de degré 3, de coefficient dominant 2, qui s’annule en −1, 0 et 2. Que vaut <i>P</i>(3)&nbsp;?', lab:'P(3) =', ans:24, why:'Trois racines pour un degré 3 : <i>P</i> = 2(T + 1)T(T − 2). Donc <i>P</i>(3) = 2·4·3·1 = 24.'},
 ]},
 {n:'Étudier une fonction rationnelle', r:'Étudier une fonction rationnelle', qs:[
   {q:'La fonction <i>f</i>(<i>x</i>) = (<i>x</i>² − 4)/(<i>x</i>² − <i>x</i> − 2) a un trou en <i>x</i> = 2. Quelle est son ordonnée&nbsp;?', lab:'y =', ans:4/3, tol:0.001, show:'4/3', why:'<i>x</i>² − 4 = (<i>x</i> − 2)(<i>x</i> + 2) et <i>x</i>² − <i>x</i> − 2 = (<i>x</i> − 2)(<i>x</i> + 1), donc <i>f</i>(<i>x</i>) = (<i>x</i> + 2)/(<i>x</i> + 1) sur le domaine. En 2 : 4/3.'},
   {q:'Quelle asymptote horizontale a la fonction <i>f</i>(<i>x</i>) = (3<i>x</i>² + 1)/(<i>x</i>² − 9) en ±∞&nbsp;? Donne la valeur de <i>y</i>.', lab:'y =', ans:3, why:'Les degrés sont égaux (2 et 2) : l’asymptote est <i>y</i> = quotient des coefficients dominants = 3/1 = 3.'},
   {q:'Combien de zéros a la fonction <i>f</i>(<i>x</i>) = (<i>x</i>² − 1)/(<i>x</i>² + 3<i>x</i> + 2)&nbsp;?', lab:'zéros :', ans:1, why:'<i>x</i>² + 3<i>x</i> + 2 = (<i>x</i> + 1)(<i>x</i> + 2), donc <i>f</i>(<i>x</i>) = (<i>x</i> − 1)/(<i>x</i> + 2) sur ℝ ∖ {−2 ; −1}. Le seul zéro est 1 : −1 annule le numérateur de départ mais est hors du domaine.'},
   {q:'Que peut-on dire de <i>f</i>(<i>x</i>) = (<i>x</i> + 3)/(<i>x</i>² − 9)&nbsp;?', opts:['Deux pôles, en −3 et en 3','Un pôle en 3 et un trou en −3','Un pôle en −3 et un trou en 3','Un zéro en −3'], ans:1, why:'<i>x</i>² − 9 = (<i>x</i> − 3)(<i>x</i> + 3), donc <i>f</i>(<i>x</i>) = 1/(<i>x</i> − 3) sur ℝ ∖ {−3 ; 3}. Le facteur <i>x</i> + 3 disparaît : trou en −3 (d’ordonnée −1/6), pôle en 3. −3 n’est pas un zéro, il est hors du domaine.'},
   {q:'Soit <i>f</i>(<i>x</i>) = (<i>x</i> − 1)/(<i>x</i> + 4) et <i>g</i>(<i>x</i>) = <i>x</i>/(<i>x</i> − 5). Combien de réels sont exclus du domaine de <i>f</i>/<i>g</i>&nbsp;?', lab:'nombre :', ans:3, why:'Il faut <i>f</i> et <i>g</i> définies (<i>x</i> ≠ −4, <i>x</i> ≠ 5) et <i>g</i>(<i>x</i>) ≠ 0 (<i>x</i> ≠ 0) : on exclut −4, 0 et 5.'},
 ]},
 {n:'Asymptote oblique', r:'Asymptote oblique par division euclidienne', qs:[
   {q:'La fonction <i>f</i>(<i>x</i>) = (<i>x</i>² + 3<i>x</i> − 1)/(<i>x</i> + 1) a une asymptote oblique <i>y</i> = <i>x</i> + <i>h</i>. Que vaut <i>h</i>&nbsp;?', lab:'h =', ans:2, why:'(<i>x</i> + 1)(<i>x</i> + 2) = <i>x</i>² + 3<i>x</i> + 2, donc <i>x</i>² + 3<i>x</i> − 1 = (<i>x</i> + 1)(<i>x</i> + 2) − 3 et <i>f</i>(<i>x</i>) = <i>x</i> + 2 − 3/(<i>x</i> + 1). Asymptote <i>y</i> = <i>x</i> + 2.'},
   {q:'La fonction <i>f</i>(<i>x</i>) = (2<i>x</i>² + 5<i>x</i> + 1)/(<i>x</i> + 3) a une asymptote oblique <i>y</i> = 2<i>x</i> + <i>h</i>. Que vaut <i>h</i>&nbsp;?', lab:'h =', ans:-1, why:'(<i>x</i> + 3)(2<i>x</i> − 1) = 2<i>x</i>² + 5<i>x</i> − 3, donc 2<i>x</i>² + 5<i>x</i> + 1 = (<i>x</i> + 3)(2<i>x</i> − 1) + 4 et <i>f</i>(<i>x</i>) = 2<i>x</i> − 1 + 4/(<i>x</i> + 3).'},
   {q:'On a écrit <i>f</i>(<i>x</i>) = <i>x</i> + 1 + 3/(<i>x</i> − 2). Où la courbe est-elle au-dessus de son asymptote <i>y</i> = <i>x</i> + 1&nbsp;?', opts:['Pour <i>x</i> < 2','Pour <i>x</i> > 2','Partout','Nulle part'], ans:1, why:'L’écart <i>f</i>(<i>x</i>) − (<i>x</i> + 1) = 3/(<i>x</i> − 2) est positif exactement quand <i>x</i> − 2 > 0.'},
 ]},
];
})();
