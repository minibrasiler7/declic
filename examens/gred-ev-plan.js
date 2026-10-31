/* Déclic — examen de compétence : Le plan ℝ², premier espace vectoriel */
(()=>{
EXAMS['gred-ev-plan']=[
 {n:'Calculer dans ℝ²', r:'ℝ² : addition et multiplication par un réel', qs:[
   {q:'Quelle est la première coordonnée de (3 ; −2) + (−5 ; 4)&nbsp;?', lab:'première coordonnée =', ans:-2, why:'On additionne coordonnée par coordonnée : (3 − 5 ; −2 + 4) = (−2 ; 2).'},
   {q:'Quelle est la deuxième coordonnée de 4 · (−1 ; 3)&nbsp;?', lab:'deuxième coordonnée =', ans:12, why:'4 · (−1 ; 3) = (−4 ; 12) : chaque coordonnée est multipliée par 4.'},
   {q:'Quelle est la première coordonnée de 2(1 ; −3) − 3(2 ; 1)&nbsp;?', lab:'première coordonnée =', ans:-4, why:'2(1 ; −3) = (2 ; −6) et 3(2 ; 1) = (6 ; 3). Différence : (2 − 6 ; −6 − 3) = (−4 ; −9).'},
   {q:'Quel est l’opposé du vecteur (−2 ; 5)&nbsp;?', opts:['(2 ; 5)','(−2 ; −5)','(2 ; −5)','(5 ; −2)'], ans:2, why:'L’opposé change le signe de chaque coordonnée : (2 ; −5). Contrôle : (−2 ; 5) + (2 ; −5) = (0 ; 0).'},
   {q:'Quel vecteur <b>x</b> vérifie (2 ; 1) + <b>x</b> = (5 ; −3)&nbsp;?', opts:['(7 ; −2)','(3 ; −4)','(−3 ; 4)','(3 ; −2)'], ans:1, why:'x = (5 ; −3) − (2 ; 1) = (3 ; −4). Contrôle : (2 ; 1) + (3 ; −4) = (5 ; −3).'},
 ]},
 {n:'Le groupe abélien (ℝ², +)', r:'(ℝ², +) est un groupe abélien', qs:[
   {q:'Soit <b>u</b> = (4 ; −1) et <b>v</b> = (1 ; 2). L’équation <b>u</b> + <b>x</b> = <b>v</b> a une unique solution. Quelle est sa première coordonnée&nbsp;?', lab:'première coordonnée =', ans:-3, why:'x = v − u = v + (−u) = (1 − 4 ; 2 + 1) = (−3 ; 3).'},
   {q:'Quel est l’élément neutre de l’addition dans ℝ²&nbsp;?', opts:['(1 ; 1)','(0 ; 0)','Le nombre 0','(1 ; 0)'], ans:1, why:'(x ; y) + (0 ; 0) = (x ; y) pour tout couple. Le neutre est un vecteur, pas un nombre.'},
   {q:'Pourquoi l’addition de ℝ² est-elle associative&nbsp;?', opts:['Parce que ℝ² est infini','Parce que (<i>x</i> + <i>x</i>′) + <i>x</i>″ = <i>x</i> + (<i>x</i>′ + <i>x</i>″) pour les réels, et que l’addition se fait coordonnée par coordonnée','Parce qu’elle est commutative','Parce que tout vecteur a un opposé'], ans:1, why:'Chaque règle de ℝ² se ramène à la règle correspondante dans ℝ, appliquée à chaque coordonnée. Commutativité et opposés sont d’autres propriétés, indépendantes.'},
   {q:'Laquelle de ces affirmations est <b>fausse</b>&nbsp;?', opts:['Tout vecteur de ℝ² a un opposé','Si <b>u</b> + <b>w</b> = <b>v</b> + <b>w</b>, alors <b>u</b> = <b>v</b>','(ℝ², +) n’est pas commutatif','(ℝ², +) a un seul élément neutre'], ans:2, why:'(x ; y) + (x′ ; y′) = (x + x′ ; y + y′) = (x′ ; y′) + (x ; y) : l’addition est commutative. Les trois autres sont des propriétés de tout groupe abélien.'},
 ]},
 {n:'Les règles de la loi externe', r:'Les règles de la multiplication par un réel', qs:[
   {q:'Quelle est la deuxième coordonnée de (2 + 5) · (1 ; −2)&nbsp;?', lab:'deuxième coordonnée =', ans:-14, why:'(2 + 5) · (1 ; −2) = 7 · (1 ; −2) = (7 ; −14). On peut aussi calculer 2(1 ; −2) + 5(1 ; −2) = (2 ; −4) + (5 ; −10) = (7 ; −14).'},
   {q:'Quelle est la première coordonnée de 2 · (3 · (1 ; 2))&nbsp;?', lab:'première coordonnée =', ans:6, why:'(λμ)u = λ(μu) : 2 · (3 · (1 ; 2)) = 6 · (1 ; 2) = (6 ; 12).'},
   {q:'Pour écrire 3(<b>u</b> + <b>v</b>) = 3<b>u</b> + 3<b>v</b>, on utilise…', opts:['la distributivité par rapport à l’addition des nombres','la distributivité par rapport à l’addition des vecteurs','la règle (λμ)<b>u</b> = λ(μ<b>u</b>)','la règle 1 · <b>u</b> = <b>u</b>'], ans:1, why:'Le même scalaire 3 se distribue sur une somme de deux vecteurs : c’est λ(u + v) = λu + λv.'},
   {q:'Quelle est la deuxième coordonnée de (−3) · (2 ; −1)&nbsp;?', lab:'deuxième coordonnée =', ans:3, why:'(−3) · (2 ; −1) = (−6 ; 3). Un scalaire négatif retourne la flèche.'},
 ]},
 {n:'Combinaisons linéaires', r:'La combinaison a·u + b·v', qs:[
   {q:'Soit <b>u</b> = (1 ; 3) et <b>v</b> = (2 ; −1). Quelle est la deuxième coordonnée de 2<b>u</b> − <b>v</b>&nbsp;?', lab:'deuxième coordonnée =', ans:7, why:'2u = (2 ; 6), puis (2 − 2 ; 6 + 1) = (0 ; 7).'},
   {q:'Soit <b>u</b> = (1 ; 2) et <b>v</b> = (3 ; 1). Quelle est la première coordonnée de 3<b>u</b> − 2<b>v</b>&nbsp;?', lab:'première coordonnée =', ans:-3, why:'3u = (3 ; 6), 2v = (6 ; 2) : 3u − 2v = (3 − 6 ; 6 − 2) = (−3 ; 4).'},
   {q:'Que vaut la combinaison <i>a</i><b>u</b> + <i>b</i><b>v</b> lorsque <i>a</i> = <i>b</i> = 0&nbsp;?', opts:['Le vecteur <b>u</b> + <b>v</b>','Le vecteur nul (0 ; 0)','Le nombre 0','Cela dépend de <b>u</b> et <b>v</b>'], ans:1, why:'0 · u + 0 · v = 0 + 0 = (0 ; 0), quels que soient u et v.'},
   {q:'Pour quelle valeur de <i>a</i> le vecteur <i>a</i>(2 ; 1) + 1 · (−1 ; 2) a-t-il une première coordonnée nulle&nbsp;?', lab:'a =', ans:0.5, tol:0.001, why:'Première coordonnée : 2a − 1 = 0, donc a = 0,5. Le vecteur obtenu est (0 ; 2,5).'},
 ]},
 {n:'Écrire un vecteur comme combinaison', r:'Écrire un vecteur comme combinaison de deux autres', qs:[
   {q:'On écrit (6 ; 2) = <i>a</i>(1 ; 1) + <i>b</i>(1 ; −1). Que vaut <i>a</i>&nbsp;?', lab:'a =', ans:4, why:'a + b = 6 et a − b = 2. En additionnant : 2a = 8, a = 4, puis b = 2. Contrôle : 4(1 ; 1) + 2(1 ; −1) = (6 ; 2).'},
   {q:'On écrit (5 ; 7) = <i>a</i>(2 ; 3) + <i>b</i>(1 ; 1). Que vaut <i>b</i>&nbsp;?', lab:'b =', ans:1, why:'2a + b = 5 et 3a + b = 7. En soustrayant : a = 2, puis b = 5 − 4 = 1. Contrôle : 2(2 ; 3) + (1 ; 1) = (5 ; 7).'},
   {q:'On écrit (5 ; 6) = <i>a</i>(1 ; 2) + <i>b</i>(3 ; 4). Que vaut <i>a</i>&nbsp;?', lab:'a =', ans:-1, why:'a + 3b = 5 et 2a + 4b = 6. De la première, a = 5 − 3b ; dans la seconde : 10 − 6b + 4b = 6, donc b = 2 et a = −1. Contrôle : −(1 ; 2) + 2(3 ; 4) = (5 ; 6).'},
   {q:'On cherche <i>a</i>, <i>b</i> tels que <i>a</i>(1 ; 2) + <i>b</i>(2 ; 4) = (3 ; 5). Que se passe-t-il&nbsp;?', opts:['<i>a</i> = 1 et <i>b</i> = 1','Il n’y a aucune solution : (2 ; 4) = 2(1 ; 2), et (3 ; 5) n’est pas sur la droite ℝ(1 ; 2)','Il y a une infinité de solutions','<i>a</i> = 3 et <i>b</i> = 0'], ans:1, why:'Le système a + 2b = 3, 2a + 4b = 5 est contradictoire : la seconde ligne est le double de la première, mais 5 ≠ 6. Les combinaisons de (1 ; 2) et (2 ; 4) restent sur la droite ℝ(1 ; 2), et 3 · 2 ≠ 5 · 1.'},
   {q:'On cherche <i>a</i>, <i>b</i> tels que <i>a</i>(1 ; 2) + <i>b</i>(2 ; 4) = (3 ; 6). Que se passe-t-il&nbsp;?', opts:['Aucune solution','Une seule solution : <i>a</i> = 3, <i>b</i> = 0','Une infinité de solutions, par exemple (<i>a</i> ; <i>b</i>) = (3 ; 0) ou (1 ; 1)','Une seule solution : <i>a</i> = 1, <i>b</i> = 1'], ans:2, why:'(3 ; 6) = 3(1 ; 2) est sur la droite ℝ(1 ; 2), comme (2 ; 4). Le système se réduit à a + 2b = 3 : tout couple (3 − 2b ; b) convient.'},
 ]},
 {n:'Droites vectorielles et colinéarité', r:'Droites vectorielles', qs:[
   {q:'Le vecteur (−6 ; 9) appartient à ℝ(2 ; −3) : il s’écrit λ(2 ; −3). Que vaut λ&nbsp;?', lab:'λ =', ans:-3, why:'2λ = −6 donne λ = −3, et −3 · (−3) = 9 confirme.'},
   {q:'Lequel de ces vecteurs appartient à la droite vectorielle ℝ(1 ; −4)&nbsp;?', opts:['(−2 ; 8)','(4 ; −1)','(1 ; 4)','(2 ; −6)'], ans:0, why:'(−2 ; 8) = −2 · (1 ; −4). Pour les autres, les deux coordonnées imposent des λ différents : (4 ; −1) donnerait 4 puis 1/4 ; (1 ; 4) donnerait 1 puis −1 ; (2 ; −6) donnerait 2 puis 1,5.'},
   {q:'Pour quelle valeur de <i>k</i> le vecteur (<i>k</i> ; 6) appartient-il à ℝ(2 ; 3)&nbsp;?', lab:'k =', ans:4, why:'Il faut (k ; 6) = λ(2 ; 3) : 3λ = 6 donne λ = 2, puis k = 4. Ou bien : k · 3 = 6 · 2.'},
   {q:'Pourquoi la somme de deux vecteurs de ℝ<b>u</b> reste-t-elle dans ℝ<b>u</b>&nbsp;?', opts:['Parce que ℝ<b>u</b> contient le vecteur nul','Parce que λ<b>u</b> + λ′<b>u</b> = (λ + λ′)<b>u</b>, qui est encore un multiple de <b>u</b>','Parce que l’addition est commutative','Parce que <b>u</b> ≠ <b>0</b>'], ans:1, why:'C’est la règle (λ + λ′)u = λu + λ′u lue à l’envers. De même μ(λu) = (μλ)u : la droite est stable par les scalaires.'},
   {q:'Lequel de ces ensembles n’est <b>pas</b> une droite vectorielle&nbsp;?', opts:['{(<i>x</i> ; <i>y</i>) : <i>y</i> = 2<i>x</i>}','{(<i>x</i> ; <i>y</i>) : <i>y</i> = −<i>x</i>}','{(<i>x</i> ; <i>y</i>) : <i>x</i> = 0}','{(<i>x</i> ; <i>y</i>) : <i>y</i> = 2<i>x</i> + 1}'], ans:3, why:'La droite y = 2x + 1 ne passe pas par l’origine : (0 ; 0) ne la vérifie pas, elle n’est pas de la forme ℝu. Les trois autres sont ℝ(1 ; 2), ℝ(1 ; −1) et ℝ(0 ; 1).'},
 ]},
 {n:'Deux vecteurs non colinéaires', r:'Deux vecteurs non colinéaires engendrent le plan', qs:[
   {q:'Pour <b>u</b> = (3 ; 1) et <b>v</b> = (1 ; 2), calcule <i>D</i> = <i>u</i>₁<i>v</i>₂ − <i>u</i>₂<i>v</i>₁.', lab:'D =', ans:5, why:'D = 3 · 2 − 1 · 1 = 5 ≠ 0 : u et v ne sont pas colinéaires, tout vecteur du plan s’écrit d’une seule façon au + bv.'},
   {q:'Pour quelle valeur de <i>k</i> les vecteurs (1 ; <i>k</i>) et (2 ; 6) sont-ils colinéaires&nbsp;?', lab:'k =', ans:3, why:'D = 1 · 6 − k · 2 = 6 − 2k = 0 donne k = 3. Alors (2 ; 6) = 2(1 ; 3).'},
   {q:'Si <i>u</i>₁<i>v</i>₂ − <i>u</i>₂<i>v</i>₁ ≠ 0, que peut-on affirmer&nbsp;?', opts:['<b>u</b> et <b>v</b> sont colinéaires','Tout vecteur <b>w</b> du plan s’écrit d’une seule façon <b>w</b> = <i>a</i><b>u</b> + <i>b</i><b>v</b>','Certains vecteurs du plan ne sont pas atteints par les combinaisons de <b>u</b> et <b>v</b>','<b>u</b> + <b>v</b> = <b>0</b>'], ans:1, why:'C’est le théorème du chapitre : le système au + bv = w a une solution unique, obtenue en divisant par D ≠ 0.'},
 ]},
];
})();
