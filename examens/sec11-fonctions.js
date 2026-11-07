/* Déclic — examen de compétence : Fonctions */
(()=>{
const x='<i>x</i>';
EXAMS['sec11-fonctions']=[
 {n:'Trouver l’expression d’une droite', r:'Trouver l’expression d’une droite', qs:[
   {q:'Une droite passe par (0 ; 4) et (2 ; 10). Quelle est sa pente <i>a</i> ?', lab:'a =', ans:3, why:`<i>a</i> = ${F('10 − 4','2 − 0')} = ${F(6,2)} = 3. Son expression est <i>f</i>(${x}) = 3${x} + 4.`},
   {q:`Une droite passe par A(1 ; −1) et B(3 ; 5). Son expression est <i>f</i>(${x}) = <i>a</i>${x} + <i>b</i>. Donne <i>b</i>.`, lab:'b =', ans:-4, why:`<i>a</i> = ${F('5 − (−1)','3 − 1')} = 3. Avec A : −1 = 3 · 1 + <i>b</i>, donc <i>b</i> = −4. Contrôle avec B : 3 · 3 − 4 = 5.`},
   {q:`Une droite passe par (−3 ; 2) et (1 ; −6). Que vaut <i>f</i>(2) ?`, lab:'f(2) =', ans:-8, why:`<i>a</i> = ${F('−6 − 2','1 − (−3)')} = ${F('−8','4')} = −2. Puis 2 = −2 · (−3) + <i>b</i>, donc <i>b</i> = −4. <i>f</i>(2) = −2 · 2 − 4 = −8.`},
   {q:'Quelle est la pente de la droite dessinée ?', fig:(()=>{ const P=plane({x:[-4,5],y:[-4,4],lab:1}); P.fn(t=>1-.5*t); P.dot(0,1,{r:5}).dot(4,-1,{r:5}); return P.svg(); })(), lab:'a =', ans:-.5, tol:.001, why:'La droite passe par (0 ; 1) et (4 ; −1) : on avance de 4 et on descend de 2. a = −2/4 = −0,5.'},
   {q:'Quelle est l’expression de la droite horizontale qui passe par le point (2 ; 3) ?', opts:[`<i>f</i>(${x}) = 3${x}`,`<i>f</i>(${x}) = 3`,`<i>f</i>(${x}) = 2${x} + 3`,`<i>f</i>(${x}) = ${x} + 1`], ans:1, why:'Une droite horizontale a une pente nulle : a = 0. Elle passe à la hauteur 3, donc f(x) = 3 pour tout x.'},
   {q:'Un abonnement coûte 25 CHF par mois pour 5 Go et 37 CHF pour 11 Go. Le prix est une fonction affine du nombre de Go. Quel est le prix fixe (l’ordonnée à l’origine) ?', unit:'CHF', ans:15, why:'Pente : (37 − 25)/(11 − 5) = 12/6 = 2 CHF par Go. Puis 25 = 2 · 5 + b, donc b = 15 CHF.'},
 ]},
 {n:'La parabole y = ax²', r:'La parabole y = ax²', qs:[
   {q:`Pour <i>f</i>(${x}) = 3${x}², calcule <i>f</i>(−2).`, lab:'f(−2) =', ans:12, why:'f(−2) = 3 · (−2)² = 3 · 4 = 12. Le carré se calcule avant la multiplication par 3.'},
   {q:`La parabole <i>y</i> = <i>a</i>${x}² passe par le point (2 ; 12). Que vaut <i>a</i> ?`, lab:'a =', ans:3, why:'12 = a · 2² = 4a, donc a = 3.'},
   {q:`Que peut-on dire de la parabole <i>y</i> = −0,5${x}² ?`, opts:['Tournée vers le haut, plus étroite que y = x²','Tournée vers le bas, plus large que y = x²','Tournée vers le bas, plus étroite que y = x²','Ce n’est pas une parabole'], ans:1, why:'a = −0,5 &lt; 0 : elle est tournée vers le bas. Et 0,5 &lt; 1 : elle monte (ou descend) moins vite que x², elle est plus large.'},
   {q:`Pour <i>f</i>(${x}) = 0,5${x}², quel nombre positif ${x} donne <i>f</i>(${x}) = 8 ?`, lab:'x =', ans:4, why:'0,5x² = 8 donne x² = 16, et le nombre positif dont le carré vaut 16 est 4.'},
 ]},
 {n:'Proportionnalité inverse', r:'Reconnaître et utiliser la proportionnalité inverse', qs:[
   {q:'Quel tableau décrit une proportionnalité inverse ?', opts:['x : 1, 2, 4 ; y : 12, 6, 3','x : 1, 2, 4 ; y : 3, 6, 12','x : 1, 2, 4 ; y : 9, 8, 6','x : 1, 2, 4 ; y : 12, 10, 8'], ans:0, why:'1 · 12 = 2 · 6 = 4 · 3 = 12 : le produit est constant. Le 2e tableau est une proportionnalité ordinaire (quotient constant), les autres n’ont ni produit ni quotient constant.'},
   {q:'Avec 6 robinets identiques, une cuve se remplit en 10 h. Combien d’heures faut-il avec 4 robinets ?', unit:'h', ans:15, why:'Le produit robinets · heures est constant : 6 · 10 = 60. Avec 4 robinets : 60 : 4 = 15 h.'},
   {q:`La fonction <i>f</i>(${x}) = ${F('<i>a</i>',x)} vérifie <i>f</i>(4) = 5. Que vaut <i>f</i>(10) ?`, lab:'f(10) =', ans:2, why:'a = 4 · 5 = 20, donc f(10) = 20/10 = 2.'},
   {q:'Un trajet de 240 km dure 3 h à 80 km/h. Combien d’heures dure-t-il à 96 km/h ?', unit:'h', ans:2.5, tol:.001, why:'Vitesse · durée = 240. À 96 km/h : 240 : 96 = 2,5 h, soit 2 h 30 min.'},
   {q:'Laquelle de ces situations n’est pas une proportionnalité inverse ?', opts:['Le nombre d’amis et la part de pizza de chacun','La vitesse et la durée d’un trajet de longueur fixée','L’âge d’un enfant et le nombre d’années qui lui restent avant ses 18 ans','Le nombre de peintres et la durée du chantier'], ans:2, why:'Âge + années restantes = 18 : c’est la somme qui est constante, pas le produit (par exemple 2 · 16 ≠ 6 · 12). Dans les trois autres cas, le produit est constant.'},
 ]},
 {n:'Les courbes de x³ et de √x', r:'Le cube et la racine : y = x³ et y = √x', qs:[
   {q:`Pour <i>f</i>(${x}) = ${x}³, calcule <i>f</i>(−3).`, lab:'f(−3) =', ans:-27, why:'(−3)³ = (−3) · (−3) · (−3) = 9 · (−3) = −27. Un cube garde le signe du nombre.'},
   {q:`Pour quelle valeur de ${x} a-t-on √${x} = 7 ?`, lab:'x =', ans:49, why:'√x = 7 veut dire que x est le nombre dont la racine vaut 7 : x = 7² = 49.'},
   {q:`Lequel de ces points est sur la courbe de <i>y</i> = √${x} ?`, opts:['(4 ; 16)','(16 ; 4)','(−4 ; 2)','(9 ; 81)'], ans:1, why:'√16 = 4, donc (16 ; 4) est sur la courbe. (4 ; 16) et (9 ; 81) sont sur la parabole y = x², et √(−4) n’existe pas.'},
   {q:`Pour quelles valeurs de ${x} la fonction <i>g</i>(${x}) = √${x} est-elle définie ?`, opts:['Pour tous les nombres','Seulement pour x ≥ 0','Seulement pour x &gt; 1','Seulement pour les carrés parfaits'], ans:1, why:'La racine carrée d’un nombre négatif n’existe pas. Pour x ≥ 0, √x existe toujours, même si ce n’est pas un carré parfait (√2 ≈ 1,41).'},
 ]},
 {n:'Étudier une parabole', r:'Étudier une parabole', qs:[
   {q:`Quelle est l’abscisse du sommet de la parabole <i>f</i>(${x}) = ${x}² − 6${x} + 5 ?`, lab:'x_S =', ans:3, why:'x_S = −b/(2a) = −(−6)/(2 · 1) = 3.'},
   {q:`Quelle est l’ordonnée du sommet de <i>f</i>(${x}) = 2${x}² + 8${x} + 1 ?`, lab:'y_S =', ans:-7, why:'x_S = −8/(2 · 2) = −2, puis f(−2) = 2 · 4 − 16 + 1 = −7.'},
   {q:`La parabole <i>f</i>(${x}) = ${x}² − ${x} − 6 coupe l’axe horizontal en deux points. Donne le zéro positif.`, lab:'x =', ans:3, why:'Δ = 1 + 24 = 25, x = (1 ± 5)/2, soit −2 ou 3. Contrôle : (x + 2)(x − 3) = x² − x − 6.'},
   {q:`Combien de fois la parabole <i>f</i>(${x}) = ${x}² + 2${x} + 5 coupe-t-elle l’axe horizontal ?`, lab:'nombre =', ans:0, why:'Δ = 4 − 20 = −16 &lt; 0 : l’équation x² + 2x + 5 = 0 n’a pas de solution. La parabole, tournée vers le haut, a son sommet (−1 ; 4) au-dessus de l’axe.'},
   {q:`En quel point la parabole <i>f</i>(${x}) = −${x}² + 4${x} + 5 coupe-t-elle l’axe vertical ? Donne son ordonnée.`, lab:'y =', ans:5, why:'Sur l’axe vertical, x = 0 : f(0) = 5, c’est le coefficient c.'},
   {q:`Que peut-on dire de la parabole <i>f</i>(${x}) = −2${x}² + 3 ?`, opts:['Tournée vers le haut, sommet (0 ; 3)','Tournée vers le bas, sommet (0 ; 3), deux zéros','Tournée vers le bas, sommet (3 ; 0), aucun zéro','Tournée vers le bas, sommet (0 ; 3), aucun zéro'], ans:1, why:'a = −2 &lt; 0 : vers le bas. b = 0, donc x_S = 0 et f(0) = 3. Le sommet est au-dessus de l’axe et la courbe descend : Δ = 0 − 4 · (−2) · 3 = 24 &gt; 0, deux zéros.'},
   {q:`La parabole <i>f</i>(${x}) = 2${x}² − 10${x} + 3 a deux zéros. Que vaut leur somme ?`, lab:'somme =', ans:5, why:'Le sommet est au milieu des deux zéros. x_S = 10/4 = 2,5, donc la somme des zéros vaut 2 · 2,5 = 5.'},
 ]},
 {n:'Grandeurs composées', r:'Calculer avec une grandeur composée', qs:[
   {q:'Convertis 90 km/h en m/s.', unit:'m/s', ans:25, why:'90 km/h = 90 000 m en 3600 s, soit 90 : 3,6 = 25 m/s.'},
   {q:'Un cycliste parcourt 36 km en 45 min. Quelle est sa vitesse moyenne en km/h ?', unit:'km/h', ans:48, why:'45 min = 0,75 h. v = 36 : 0,75 = 48 km/h.'},
   {q:'Le cuivre a une masse volumique de 8,9 g/cm³. Quelle est la masse d’une pièce de cuivre de 20 cm³ ?', unit:'g', ans:178, tol:.01, why:'m = ρ · V = 8,9 · 20 = 178 g.'},
   {q:'Un robinet débite 15 L/min. Combien de minutes faut-il pour remplir une cuve de 600 L ?', unit:'min', ans:40, why:'t = V/Q = 600 : 15 = 40 min.'},
   {q:'Une voiture roule 2 h 24 min à la vitesse moyenne de 75 km/h. Quelle distance parcourt-elle ?', unit:'km', ans:180, tol:.01, why:'2 h 24 min = 2 + 24/60 = 2,4 h. d = v · t = 75 · 2,4 = 180 km.'},
 ]},
];
})();
