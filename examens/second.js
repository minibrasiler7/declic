/* Déclic — examen de compétence : Équations du 2e degré */
(()=>{
EXAMS['second']=[
 {n:'Parabole et solutions', r:'Où la parabole coupe-t-elle l’axe&nbsp;?', qs:[
   {q:'En combien de points la parabole <i>y</i> = <i>x</i>² − 4<i>x</i> + 4 touche-t-elle l’axe horizontal&nbsp;?', lab:'points :', ans:1, why:'<i>x</i>² − 4<i>x</i> + 4 = (<i>x</i> − 2)², nul seulement en <i>x</i> = 2. Δ = 16 − 16 = 0 : une seule solution.'},
   {q:'En combien de points la parabole <i>y</i> = <i>x</i>² + <i>x</i> + 1 coupe-t-elle l’axe horizontal&nbsp;?', lab:'points :', ans:0, why:'Δ = 1 − 4 = −3 < 0 : l’équation <i>x</i>² + <i>x</i> + 1 = 0 n’a aucune solution, la parabole reste au-dessus de l’axe.'},
   {q:'En combien de points la parabole <i>y</i> = <i>x</i>² − <i>x</i> − 6 coupe-t-elle l’axe horizontal&nbsp;?', lab:'points :', ans:2, why:'<i>x</i>² − <i>x</i> − 6 = (<i>x</i> − 3)(<i>x</i> + 2) : deux solutions, 3 et −2. Δ = 1 + 24 = 25 > 0.'},
 ]},
 {n:'Résoudre en factorisant', r:'Résoudre en factorisant', qs:[
   {q:'Résous <i>x</i>² + 2<i>x</i> − 15 = 0.', opts:['<i>x</i> = 5 ou <i>x</i> = −3','<i>x</i> = −5 ou <i>x</i> = 3','<i>x</i> = 15 ou <i>x</i> = −1','Pas de solution'], ans:1, why:'Deux nombres de somme 2 et de produit −15 : 5 et −3. Donc (<i>x</i> + 5)(<i>x</i> − 3) = 0, d’où <i>x</i> = −5 ou <i>x</i> = 3.'},
   {q:'Quelle est la plus grande solution de <i>x</i>² − 7<i>x</i> + 12 = 0&nbsp;?', lab:'x =', ans:4, why:'Somme −7 et produit 12 : −3 et −4. (<i>x</i> − 3)(<i>x</i> − 4) = 0 donne 3 ou 4. La plus grande est 4.'},
   {q:'Quelle est la plus petite solution de <i>x</i>² + <i>x</i> − 20 = 0&nbsp;?', lab:'x =', ans:-5, why:'Somme 1 et produit −20 : 5 et −4. (<i>x</i> + 5)(<i>x</i> − 4) = 0 donne −5 ou 4.'},
   {q:'Quelle est la solution positive de (2<i>x</i> − 5)(<i>x</i> + 1) = 0&nbsp;?', lab:'x =', ans:2.5, tol:0.001, why:'Un produit est nul si l’un des facteurs l’est : 2<i>x</i> − 5 = 0 donne <i>x</i> = 2,5, et <i>x</i> + 1 = 0 donne <i>x</i> = −1.'},
   {q:'Résous <i>x</i>² = 5<i>x</i>.', opts:['<i>x</i> = 5','<i>x</i> = 0 ou <i>x</i> = 5','<i>x</i> = 0','<i>x</i> = √5'], ans:1, why:'<i>x</i>² − 5<i>x</i> = <i>x</i>(<i>x</i> − 5) = 0, donc <i>x</i> = 0 ou <i>x</i> = 5. Diviser par <i>x</i> ferait perdre la solution 0.'},
   {q:'Résous <i>x</i>² − 9 = 0.', opts:['<i>x</i> = 3','<i>x</i> = 9','<i>x</i> = −3 ou <i>x</i> = 3','<i>x</i> = 4,5'], ans:2, why:'<i>x</i>² − 9 = (<i>x</i> − 3)(<i>x</i> + 3) = 0 : <i>x</i> = 3 ou <i>x</i> = −3. Oublier la solution négative est l’erreur classique.'},
 ]},
 {n:'Le discriminant', r:'Utiliser le discriminant', qs:[
   {q:'Calcule le discriminant de 3<i>x</i>² − 4<i>x</i> − 4.', lab:'Δ =', ans:64, why:'Δ = <i>b</i>² − 4<i>ac</i> = (−4)² − 4·3·(−4) = 16 + 48 = 64.'},
   {q:'Calcule le discriminant de −2<i>x</i>² + 3<i>x</i> + 5.', lab:'Δ =', ans:49, why:'Δ = 3² − 4·(−2)·5 = 9 + 40 = 49. Le signe de <i>a</i> compte.'},
   {q:'Combien de solutions réelles a l’équation <i>x</i>² + 2<i>x</i> + 5 = 0&nbsp;?', lab:'solutions :', ans:0, why:'Δ = 4 − 20 = −16 < 0 : aucune solution réelle.'},
   {q:'Quelle est la plus petite solution de 2<i>x</i>² − 7<i>x</i> + 3 = 0&nbsp;?', lab:'x =', ans:0.5, tol:0.001, why:'Δ = 49 − 24 = 25, √Δ = 5. <i>x</i> = (7 − 5)/4 = 0,5 ou <i>x</i> = (7 + 5)/4 = 3.'},
   {q:'Résous 4<i>x</i>² − 12<i>x</i> + 9 = 0.', lab:'x =', ans:1.5, tol:0.001, why:'Δ = 144 − 144 = 0 : une solution double, <i>x</i> = −<i>b</i>/(2<i>a</i>) = 12/8 = 1,5.'},
   {q:'Quelle est la plus grande solution de <i>x</i>² − 2<i>x</i> − 1 = 0, arrondie au centième&nbsp;?', lab:'x =', ans:2.41, tol:0.006, why:'Δ = 4 + 4 = 8. <i>x</i> = (2 + √8)/2 = 1 + √2 ≈ 2,41. On ne voit pas de factorisation : le discriminant marche quand même.'},
   {q:'Pour 5<i>x</i>² + 2<i>x</i> − 1 = 0, que dit le signe de Δ&nbsp;?', opts:['Δ < 0 : aucune solution','Δ = 0 : une solution','Δ > 0 : deux solutions','On ne peut rien dire car <i>c</i> est négatif'], ans:2, why:'Δ = 4 − 4·5·(−1) = 4 + 20 = 24 > 0 : deux solutions. Quand <i>a</i> et <i>c</i> sont de signes contraires, −4<i>ac</i> est positif.'},
 ]},
 {n:'Sommet et forme canonique', r:'Forme canonique et sommet', qs:[
   {q:'Quelle est l’abscisse du sommet de <i>y</i> = 2<i>x</i>² − 12<i>x</i> + 7&nbsp;?', lab:'x =', ans:3, why:'α = −<i>b</i>/(2<i>a</i>) = 12/4 = 3.'},
   {q:'Quelle est l’ordonnée du sommet de <i>y</i> = 2<i>x</i>² − 12<i>x</i> + 7&nbsp;?', lab:'y =', ans:-11, why:'α = 3, puis β = 2·9 − 36 + 7 = −11. Forme canonique : 2(<i>x</i> − 3)² − 11.'},
   {q:'Quelle est la valeur maximale de <i>f</i>(<i>x</i>) = −<i>x</i>² + 6<i>x</i> − 2&nbsp;?', ans:7, why:'<i>a</i> = −1 < 0 : la parabole est tournée vers le bas. α = −6/(−2) = 3 et β = −9 + 18 − 2 = 7.'},
   {q:'Quelle est la forme canonique de <i>x</i>² + 4<i>x</i> + 1&nbsp;?', opts:['(<i>x</i> + 2)² + 1','(<i>x</i> − 2)² − 3','(<i>x</i> + 2)² − 3','(<i>x</i> + 4)² + 1'], ans:2, why:'α = −4/2 = −2 et β = 4 − 8 + 1 = −3. Donc (<i>x</i> + 2)² − 3. Contrôle : <i>x</i>² + 4<i>x</i> + 4 − 3.'},
   {q:'Que peut-on dire de <i>f</i>(<i>x</i>) = −3(<i>x</i> − 1)² + 4&nbsp;?', opts:['Son minimum vaut 4, atteint en <i>x</i> = 1','Son maximum vaut 4, atteint en <i>x</i> = 1','Son maximum vaut 4, atteint en <i>x</i> = −1','Son maximum vaut −3'], ans:1, why:'(<i>x</i> − 1)² ≥ 0 et −3 < 0, donc −3(<i>x</i> − 1)² ≤ 0 : <i>f</i>(<i>x</i>) ≤ 4, avec égalité en <i>x</i> = 1.'},
   {q:'Une balle est lancée depuis le sol. Sa hauteur en mètres après <i>t</i> secondes vaut <i>h</i>(<i>t</i>) = −5<i>t</i>² + 30<i>t</i>. Quelle hauteur maximale atteint-elle&nbsp;?', unit:'m', ans:45, why:'Le sommet est en <i>t</i> = −30/(2·(−5)) = 3 s, et <i>h</i>(3) = −45 + 90 = 45 m.'},
 ]},
 {n:'Somme et produit des racines', r:'Somme et produit des racines', qs:[
   {q:'L’équation <i>x</i>² − 11<i>x</i> + 24 = 0 a la racine 3. Quelle est l’autre&nbsp;?', lab:'x =', ans:8, why:'La somme des racines vaut 11, donc l’autre vaut 11 − 3 = 8. Contrôle : 3 × 8 = 24.'},
   {q:'L’équation 3<i>x</i>² − 12<i>x</i> − 15 = 0 a la racine 5. Quelle est l’autre&nbsp;?', lab:'x =', ans:-1, why:'On divise par 3 : <i>x</i>² − 4<i>x</i> − 5 = 0. La somme des racines vaut 4, donc l’autre vaut 4 − 5 = −1. Contrôle : 5 × (−1) = −5.'},
   {q:'Quel est le produit des racines de <i>x</i>² + 7<i>x</i> − 18 = 0&nbsp;?', lab:'produit :', ans:-18, why:'Pour <i>x</i>² + <i>px</i> + <i>q</i> = 0, le produit vaut <i>q</i> = −18. Les racines sont 2 et −9.'},
   {q:'Quelle est la somme des racines de 2<i>x</i>² − 10<i>x</i> + 3 = 0&nbsp;?', lab:'somme :', ans:5, why:'On divise par 2 : <i>x</i>² − 5<i>x</i> + 1,5 = 0. La somme vaut −<i>p</i> = 5. Δ = 100 − 24 > 0, donc les deux racines existent.'},
   {q:'Quel est le plus grand nombre <i>k</i> pour lequel <i>x</i>² + 8<i>x</i> + <i>k</i> = 0 a au moins une solution&nbsp;?', lab:'k =', ans:16, why:'Il faut Δ = 64 − 4<i>k</i> ≥ 0, soit <i>k</i> ≤ 16. Pour <i>k</i> = 16, la racine est double : <i>x</i> = −4.'},
   {q:'Pour quelle valeur de <i>c</i> l’équation <i>x</i>² − 10<i>x</i> + <i>c</i> = 0 a-t-elle exactement une solution&nbsp;?', lab:'c =', ans:25, why:'Une seule solution quand Δ = 100 − 4<i>c</i> = 0, donc <i>c</i> = 25. On obtient (<i>x</i> − 5)².'},
 ]},
];
})();
