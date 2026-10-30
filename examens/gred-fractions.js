/* Déclic — examen de compétence : Le corps des fractions d’un anneau intègre */
(()=>{
EXAMS['gred-fractions']=[
 {n:'La relation des produits en croix', r:'La relation d’équivalence', qs:[
   {q:'Lequel de ces couples d’entiers est équivalent à (−5 ; 8)&nbsp;?', opts:['(5 ; 8)','(−8 ; 5)','(10 ; −16)','(−10 ; 24)'], ans:2, why:'On compare les produits en croix : (−5)·(−16) = 80 = 8·10. Pour (5 ; 8) : −40 ≠ 40 ; pour (−8 ; 5) : −25 ≠ −64 ; pour (−10 ; 24) : −120 ≠ −80.'},
   {q:'Quel entier <i>c</i> vérifie (6 ; 14) ~ (<i>c</i> ; 35)&nbsp;?', lab:'c =', ans:15, why:'(6 ; 14) ~ (<i>c</i> ; 35) ⇔ 6·35 = 14<i>c</i>, donc 210 = 14<i>c</i> et <i>c</i> = 15.'},
   {q:'Quel entier <i>a</i> vérifie (<i>a</i> ; 12) ~ (−9 ; 27)&nbsp;?', lab:'a =', ans:-4, why:'<i>a</i>·27 = 12·(−9) = −108, donc <i>a</i> = −4. Les deux couples représentent −1/3.'},
   {q:'Sur la figure du chapitre, le couple (<i>a</i> ; <i>b</i>) est le point (<i>b</i> ; <i>a</i>). Que signifie (<i>a</i> ; <i>b</i>) ~ (<i>c</i> ; <i>d</i>)&nbsp;?', opts:['Les deux points ont la même ordonnée','Les deux points sont à la même distance de O','Les deux points sont alignés avec O','Les deux points sont symétriques par rapport à O'], ans:2, why:'<i>ad</i> − <i>bc</i> = 0 dit que les vecteurs (<i>b</i> ; <i>a</i>) et (<i>d</i> ; <i>c</i>) sont colinéaires : les deux points sont sur une même droite passant par O, de pente <i>a</i>/<i>b</i>.'},
 ]},
 {n:'Une relation d’équivalence grâce à l’intégrité', r:'Vérifier que ~ est une relation d’équivalence', qs:[
   {q:'Dans la preuve que ~ est une relation d’équivalence, quelle propriété demande l’intégrité de <i>A</i>&nbsp;?', opts:['La réflexivité','La symétrie','La transitivité','Aucune'], ans:2, why:'La transitivité aboutit à <i>d</i>(<i>af</i> − <i>be</i>) = 0 avec <i>d</i> ≠ 0. Pour conclure <i>af</i> = <i>be</i>, il faut qu’il n’y ait pas de diviseur de zéro.'},
   {q:'La réflexivité, (<i>a</i> ; <i>b</i>) ~ (<i>a</i> ; <i>b</i>), revient à <i>ab</i> = <i>ba</i>. Sur quoi repose-t-elle&nbsp;?', opts:['Sur l’intégrité','Sur la commutativité de la multiplication','Sur l’existence d’un inverse de <i>b</i>','Sur la distributivité'], ans:1, why:'Il faut <i>ab</i> = <i>ba</i>, ce que donne la commutativité de l’anneau. Aucune simplification ni aucun inverse n’intervient.'},
   {q:'Dans ℤ/4ℤ, qui n’est pas intègre, on a (1 ; 1) ~ (2 ; 2) car 1·2 = 1·2, et (2 ; 2) ~ (0 ; 2) car 2·2 = 4 = 0 = 2·0. A-t-on (1 ; 1) ~ (0 ; 2)&nbsp;?', opts:['Oui, par transitivité','Non : 1·2 = 2 et 1·0 = 0 sont différents, la relation n’est pas transitive','Oui, car 2 = 0 dans ℤ/4ℤ','On ne peut pas comparer ces couples'], ans:1, why:'1·2 = 2 ≠ 0 = 1·0 dans ℤ/4ℤ. La transitivité échoue parce que 2 est un diviseur de zéro (2·2 = 0) : on ne peut pas simplifier par 2.'},
 ]},
 {n:'Opérations bien définies', r:'Prouver qu’une opération est bien définie', qs:[
   {q:'On essaie la règle <i>a</i>/<i>b</i> ⊕ <i>c</i>/<i>d</i> = (<i>a</i> + <i>c</i>)/(<i>b</i> + <i>d</i>). Avec le représentant (3 ; 6) de 1/2, quel nombre obtient-on pour 1/2 ⊕ 1/3&nbsp;?', ans:4/9, tol:0.0005, show:'4/9', why:'(3 + 1)/(6 + 3) = 4/9, alors que le représentant (1 ; 2) donne 2/5. Le résultat dépend du représentant : cette règle n’est pas bien définie.'},
   {q:'Laquelle de ces règles définit une application bien définie sur ℚ&nbsp;?', opts:['<i>a</i>/<i>b</i> ↦ <i>a</i> + <i>b</i>','<i>a</i>/<i>b</i> ↦ <i>a</i>','<i>a</i>/<i>b</i> ↦ <i>a</i>²/<i>b</i>²','<i>a</i>/<i>b</i> ↦ (<i>a</i> + 1)/(<i>b</i> + 1)'], ans:2, why:'Si <i>ab</i>′ = <i>a</i>′<i>b</i>, alors <i>a</i>²<i>b</i>′² = <i>a</i>′²<i>b</i>² : le résultat ne dépend pas du représentant. Les autres échouent sur 1/2 = 2/4 : 3 ≠ 6, 1 ≠ 2, 2/3 ≠ 3/5.'},
   {q:'On montre que l’addition ne dépend pas du représentant (<i>a</i> ; <i>b</i>) ~ (<i>a</i>′ ; <i>b</i>′) de la première classe. Les deux produits en croix valent <i>ab</i>′<i>d</i>² + <i>bb</i>′<i>cd</i> et <i>a</i>′<i>bd</i>² + <i>bb</i>′<i>cd</i>. Pourquoi sont-ils égaux&nbsp;?', opts:['Parce que <i>a</i> = <i>a</i>′','Parce que <i>ab</i>′ = <i>a</i>′<i>b</i>, ce qui est l’hypothèse','Parce que <i>d</i>² = 1','Parce qu’on peut diviser par <i>b</i>'], ans:1, why:'Les seconds termes sont identiques, et les premiers sont égaux par hypothèse : <i>ab</i>′ = <i>a</i>′<i>b</i>. En général <i>a</i> ≠ <i>a</i>′ (1/2 = 2/4), et on ne divise pas dans <i>A</i>.'},
   {q:'Avec la règle (<i>a</i> + <i>c</i>)/(<i>b</i> + <i>d</i>), on calcule 1/3 ⊕ 1/4 avec les représentants (1 ; 3) et (1 ; 4), puis avec (2 ; 6) et (1 ; 4). Quelle est la différence entre les deux résultats (le second moins le premier)&nbsp;?', ans:3/10-2/7, tol:0.0005, show:'1/70', why:'On obtient 2/7 puis 3/10, et 3/10 − 2/7 = 21/70 − 20/70 = 1/70 ≠ 0 : la règle dépend des représentants.'},
 ]},
 {n:'Le corps des fractions', r:'Frac(A) est un corps qui contient A', qs:[
   {q:'Quel est l’inverse de −3/7 dans ℚ&nbsp;?', opts:['3/7','−7/3','7/3','−3/7'], ans:1, why:'Pour <i>a</i> ≠ 0, (<i>a</i>/<i>b</i>)⁻¹ = <i>b</i>/<i>a</i> : l’inverse de −3/7 est 7/(−3) = −7/3. Contrôle : (−3/7)(−7/3) = 21/21 = 1.'},
   {q:'Dans Frac(<i>A</i>), quand a-t-on <i>a</i>/<i>b</i> = 0/1&nbsp;?', opts:['Quand <i>b</i> = 0','Quand <i>a</i> = <i>b</i>','Quand <i>a</i> = 0','Jamais'], ans:2, why:'(<i>a</i> ; <i>b</i>) ~ (0 ; 1) ⇔ <i>a</i>·1 = <i>b</i>·0 ⇔ <i>a</i> = 0. Le cas <i>b</i> = 0 est exclu dès le départ.'},
   {q:'Pour lequel de ces anneaux la construction du corps des fractions échoue-t-elle&nbsp;?', opts:['ℤ','ℝ[T]','ℤ/6ℤ','ℝ[T, U]'], ans:2, why:'Il faut un anneau intègre. Dans ℤ/6ℤ, 2·3 = 0 : la relation ~ n’est pas transitive et un produit de dénominateurs peut être nul.'},
   {q:'L’application ι : <i>A</i> → Frac(<i>A</i>) qui permet de voir <i>A</i> dans Frac(<i>A</i>) envoie l’élément 4 de ℤ sur…', opts:['1/4','4/1','4/4','0/4'], ans:1, why:'ι(<i>a</i>) = <i>a</i>/1. Elle est injective (<i>a</i>/1 = <i>c</i>/1 ⇔ <i>a</i> = <i>c</i>) et respecte les opérations : on identifie 4 et 4/1.'},
 ]},
 {n:'Le représentant irréductible', r:'Le corps ℚ des rationnels', qs:[
   {q:'Quel est le numérateur du représentant irréductible, avec <i>b</i> > 0, de (90 ; −126)&nbsp;?', lab:'a =', ans:-5, why:'pgcd(90, 126) = 18, d’où (5 ; −7). On rend le dénominateur positif : (−5 ; 7). La classe est −5/7.'},
   {q:'Quel est le dénominateur du représentant irréductible, avec <i>b</i> > 0, de (−48 ; −180)&nbsp;?', lab:'b =', ans:15, why:'pgcd(48, 180) = 12, d’où (−4 ; −15), puis (4 ; 15) avec un dénominateur positif.'},
   {q:'Combien de couples (<i>a</i> ; <i>b</i>) avec 1 ≤ <i>b</i> ≤ 40 sont équivalents à (6 ; 15)&nbsp;?', lab:'couples :', ans:8, why:'6/15 = 2/5 sous forme irréductible. Les couples équivalents avec <i>b</i> > 0 sont (2<i>k</i> ; 5<i>k</i>), et 5<i>k</i> ≤ 40 donne <i>k</i> = 1, …, 8.'},
 ]},
 {n:'Calculer dans ℚ avec le ppcm', r:'Calculer dans ℚ avec le ppcm', qs:[
   {q:'Quel est le ppcm de 28 et 42&nbsp;?', lab:'ppcm =', ans:84, why:'28 = 2²·7 et 42 = 2·3·7. On prend chaque facteur à sa plus grande puissance : 2²·3·7 = 84.'},
   {q:'Calcule 7/12 + 5/18 sous forme irréductible.', ans:31/36, tol:0.0005, show:'31/36', why:'ppcm(12, 18) = 36 : 7/12 = 21/36 et 5/18 = 10/36, donc la somme vaut 31/36, irréductible car 31 est premier.'},
   {q:'Calcule 11/20 − 7/30 sous forme irréductible.', ans:19/60, tol:0.0005, show:'19/60', why:'ppcm(20, 30) = 60 : 33/60 − 14/60 = 19/60, irréductible.'},
   {q:'Calcule 3/8 + 5/12 − 1/6 sous forme irréductible.', ans:5/8, tol:0.0005, show:'5/8', why:'ppcm(8, 12, 6) = 24 : 9/24 + 10/24 − 4/24 = 15/24, puis on simplifie par 3 : 5/8.'},
 ]},
 {n:'Fractions rationnelles en T', r:'Simplifier et opérer dans ℝ(T)', qs:[
   {q:'Quelle est la forme irréductible de '+F('T² − 9','T² + 3T')+'&nbsp;?', opts:[F('T − 3','T'),F('T + 3','T'),F('− 9','3T'),F('T − 3','T + 3')], ans:0, why:'T² − 9 = (T − 3)(T + 3) et T² + 3T = T(T + 3). On simplifie par le facteur T + 3. Simplifier les T² n’a pas de sens : on ne simplifie que des facteurs.'},
   {q:'Quelle est la forme irréductible de '+F('T² + 2T − 8','T² − 4')+'&nbsp;?', opts:[F('T − 4','T − 2'),F('2T − 8','− 4'),F('T + 4','T + 2'),F('T + 4','T − 2')], ans:2, why:'T² + 2T − 8 = (T + 4)(T − 2), car 2 est racine, et T² − 4 = (T − 2)(T + 2). On simplifie par T − 2.'},
   {q:'Que vaut '+F('1','T − 2')+' + '+F('1','T + 2')+'&nbsp;?', opts:[F('2','2T'),F('2T','T² − 4'),F('2','T² − 4'),F('4','T² − 4')], ans:1, why:'Dénominateur commun (T − 2)(T + 2) = T² − 4, numérateur (T + 2) + (T − 2) = 2T.'},
   {q:'Que vaut '+F('2','T')+' − '+F('1','T + 1')+'&nbsp;?', opts:[F('1','T² + T'),F('T + 2','T² + T'),F('1','−1'),F('3T + 2','T² + T')], ans:1, why:'Dénominateur commun T(T + 1) = T² + T, numérateur 2(T + 1) − T = T + 2.'},
 ]},
 {n:'Deux indéterminées', r:'Deux indéterminées : ℝ[T, U] et ℝ(T, U)', qs:[
   {q:'Quel est le degré total de T³U² − 4TU + U⁴ dans ℝ[T, U]&nbsp;?', lab:'degré :', ans:5, why:'Les monômes ont pour degrés totaux 3 + 2 = 5, 1 + 1 = 2 et 4. Le degré total est le plus grand : 5.'},
   {q:'Quel est le degré total de (T²U − U³ + T)(TU⁴ + 2) dans ℝ[T, U]&nbsp;?', lab:'degré :', ans:8, why:'Le premier facteur est de degré total 3, le second de degré total 5. ℝ[T, U] est intègre, donc le degré du produit vaut 3 + 5 = 8.'},
   {q:'Quelle est la forme irréductible de '+F('T² − 2TU + U²','T² − U²')+' dans ℝ(T, U)&nbsp;?', opts:[F('T + U','T − U'),'−1',F('T − U','T + U'),F('− 2TU + U²','− U²')], ans:2, why:'Le numérateur vaut (T − U)², le dénominateur (T − U)(T + U). On simplifie par T − U.'},
 ]},
];
})();
