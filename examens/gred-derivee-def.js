/* Déclic — examen de compétence : La dérivée, définition et interprétation */
(()=>{
const x='<i>x</i>', h='<i>h</i>';
EXAMS['gred-derivee-def']=[
 {n:'Taux d’accroissement et pente d’une sécante', r:'Taux d’accroissement et sécantes', qs:[
   {q:`Quel est le taux d’accroissement de f(${x}) = ${x}³ entre 1 et 3 ?`, lab:'taux =', ans:13, why:'τ = (f(3) − f(1))/(3 − 1) = (27 − 1)/2 = 13 : c’est la pente de la sécante entre les points (1 ; 1) et (3 ; 27).'},
   {q:'Un objet parcourt <i>s</i>(<i>t</i>) = 4<i>t</i>² mètres en <i>t</i> secondes. Quelle est sa vitesse moyenne entre <i>t</i> = 2 et <i>t</i> = 3 ?', lab:'v =', unit:'m/s', ans:20, why:'Vitesse moyenne = (s(3) − s(2))/(3 − 2) = (36 − 16)/1 = 20 m/s.'},
   {q:`Pour f(${x}) = 3${x}² en <i>a</i> = 1, que vaut le taux d’accroissement τ(${h}), pour ${h} ≠ 0 ?`, opts:['6<i>h</i> + 3<i>h</i>²','6','3 + 6<i>h</i>','6 + 3<i>h</i>'], ans:3, why:'f(1 + h) − f(1) = 3(1 + 2h + h²) − 3 = 6h + 3h². On divise par h : τ(h) = 6 + 3h. La première option est le numérateur, pas le taux.'},
   {q:`Quelle est la pente de la sécante à la courbe de f(${x}) = 1/${x} entre <i>a</i> = 2 et <i>a</i> + ${h} avec ${h} = −1 ?`, lab:'pente =', ans:-.5, tol:1e-9, why:'a + h = 1. τ = (f(1) − f(2))/(−1) = (1 − 1/2)/(−1) = −1/2. Un h négatif place M à gauche de A, la formule est la même.'},
 ]},
 {n:'Calculer un nombre dérivé par la définition', r:'Dériver avec la définition', qs:[
   {q:`f(${x}) = 2${x}² + ${x}. Calcule f′(1) à partir du taux d’accroissement.`, lab:'f′(1) =', ans:5, why:'f(1 + h) − f(1) = 2(1 + 2h + h²) + 1 + h − 3 = 5h + 2h². Le taux vaut 5 + 2h, qui tend vers 5.'},
   {q:`f(${x}) = ${x}² − 4${x}. Que vaut le taux d’accroissement de f en 3, pour ${h} ≠ 0 ?`, opts:['−2 + <i>h</i>','2 + <i>h</i>','2<i>h</i> + <i>h</i>²','6 + <i>h</i>'], ans:1, why:'f(3 + h) = 9 + 6h + h² − 12 − 4h = −3 + 2h + h² et f(3) = −3. La différence vaut 2h + h², et le taux 2 + h. Donc f′(3) = 2.'},
   {q:`f(${x}) = ${F('1',x+' + 1')}. Calcule f′(1) par la définition.`, lab:'f′(1) =', ans:-.25, tol:1e-9, why:'f(1 + h) − f(1) = 1/(2 + h) − 1/2 = (2 − (2 + h))/(2(2 + h)) = −h/(2(2 + h)). Le taux vaut −1/(2(2 + h)) → −1/4.'},
   {q:`f(${x}) = √(${x} + 3). Calcule f′(1) par la définition.`, lab:'f′(1) =', ans:.25, tol:1e-9, why:'τ(h) = (√(4 + h) − 2)/h. Avec le conjugué : ((4 + h) − 4)/(h(√(4 + h) + 2)) = 1/(√(4 + h) + 2) → 1/4.'},
   {q:`Pour f(${x}) = ${x}² en 2, un élève remplace ${h} par 0 dans ((2 + ${h})² − 4)/${h}, obtient 0/0 et conclut que f n’est pas dérivable en 2. Qu’en penses-tu ?`, opts:['Il a raison : 0/0 n’existe pas','Il a raison, car f(2) = 4 ≠ 0','Il a tort : il faut simplifier d’abord, le taux vaut 4 + <i>h</i> → 4','Il a tort : la limite vaut 0'], ans:2, why:'Le taux est toujours une forme 0/0 en h = 0. (2 + h)² − 4 = 4h + h², donc τ(h) = 4 + h → 4 : f′(2) = 4.'},
 ]},
 {n:'Équation de la tangente', r:'Écrire l’équation de la tangente', qs:[
   {q:`Quelle est l’ordonnée à l’origine de la tangente à la courbe de f(${x}) = ${x}³ au point d’abscisse 1 ?`, lab:'p =', ans:-2, why:'f(1) = 1 et f′(1) = 3 · 1² = 3. Tangente : y = 1 + 3(x − 1) = 3x − 2. Contrôle : 3 · 1 − 2 = 1.'},
   {q:`Quelle est l’ordonnée à l’origine de la tangente à la courbe de f(${x}) = 1/${x} au point d’abscisse 2 ?`, lab:'p =', ans:1, why:'f(2) = 1/2 et f′(2) = −1/2² = −1/4. Tangente : y = 1/2 − (x − 2)/4 = −x/4 + 1.'},
   {q:`La tangente à la courbe de f(${x}) = √${x} au point d’abscisse 4 coupe l’axe des abscisses en quel point ?`, lab:'x =', ans:-4, why:'f(4) = 2 et f′(4) = 1/(2 · 2) = 1/4. Tangente : y = 2 + (x − 4)/4 = x/4 + 1, nulle pour x = −4.'},
   {q:`En quel point <i>a</i> la tangente à la courbe de f(${x}) = ${x}² − 2${x} est-elle horizontale ?`, lab:'a =', ans:1, why:'f(a + h) − f(a) = 2ah + h² − 2h, donc τ(h) = 2a − 2 + h → 2a − 2. Tangente horizontale : f′(a) = 2a − 2 = 0, soit a = 1.'},
 ]},
 {n:'Dérivable implique continue', r:'Dérivable implique continue, pas l’inverse', qs:[
   {q:'Laquelle de ces affirmations est vraie ?', opts:['Toute fonction continue en <i>a</i> est dérivable en <i>a</i>','Une fonction non dérivable en <i>a</i> n’est pas continue en <i>a</i>','Une fonction non continue en <i>a</i> n’est pas dérivable en <i>a</i>','Être continue et être dérivable, c’est la même chose'], ans:2, why:'Dérivable ⇒ continue, donc par contraposée : non continue ⇒ non dérivable. La réciproque est fausse : |x| est continue en 0 sans y être dérivable.'},
   {q:`f(${x}) = |${x} − 3|. Que dire de f en 3 ?`, opts:['Continue et dérivable, f′(3) = 0','Ni continue ni dérivable','Dérivable mais pas continue','Continue mais pas dérivable : le taux vaut 1 à droite et −1 à gauche'], ans:3, why:'f(3 + h) − f(3) = |h| → 0 : f est continue. Le taux |h|/h vaut 1 pour h > 0 et −1 pour h < 0 : pas de limite, f n’est pas dérivable en 3 (angle).'},
   {q:`Dans la preuve, on écrit f(<i>a</i> + ${h}) − f(<i>a</i>) = ${h} · τ(${h}). Pourquoi ce produit tend-il vers 0 ?`, opts:['Parce que τ(<i>h</i>) tend vers 0','Parce que <i>h</i> → 0 et que τ(<i>h</i>) tend vers le nombre fini f′(<i>a</i>)','Parce que f(<i>a</i>) = 0','Parce que <i>h</i> · τ(<i>h</i>) = f′(<i>a</i>)'], ans:1, why:'Le produit tend vers 0 · f′(a) = 0. Le point clé est que la limite du taux est finie : si elle était infinie, on aurait une forme 0 · ∞.'},
   {q:'<i>E</i> est la partie entière. Est-elle dérivable en 2,5 ?', opts:['Non, car <i>E</i> saute','Non, car <i>E</i> n’est pas continue','Oui, et <i>E</i>′(2,5) = 0','Oui, et <i>E</i>′(2,5) = 1'], ans:2, why:'Sur [2 ; 3[, E vaut constamment 2. Pour |h| < 0,5, E(2,5 + h) − E(2,5) = 0, le taux est nul et tend vers 0. E ne saute qu’aux entiers, où elle n’est ni continue ni dérivable.'},
 ]},
 {n:'Dérivées à gauche et à droite', r:'Dérivées à gauche et à droite, points anguleux', qs:[
   {q:`f(${x}) = |${x}² − 4|. Calcule son nombre dérivé à droite en 2.`, lab:'f′d(2) =', ans:4, why:'Pour h > 0 petit, (2 + h)² − 4 = 4h + h² > 0, donc τ(h) = (4h + h²)/h = 4 + h → 4.'},
   {q:`f(${x}) = |${x}² − 9|. Calcule son nombre dérivé à gauche en 3.`, lab:'f′g(3) =', ans:-6, why:'Pour h < 0 petit, (3 + h)² − 9 = 6h + h² < 0 ; la valeur absolue change le signe : τ(h) = −(6h + h²)/h = −6 − h → −6.'},
   {q:`f(${x}) = ${x}² pour ${x} ≤ 1 et f(${x}) = 2${x} − 1 pour ${x} &gt; 1. Est-elle dérivable en 1 ?`, opts:['Non : point anguleux','Oui, et f′(1) = 2','Non, car f est définie par morceaux','Oui, et f′(1) = 1'], ans:1, why:'f(1) = 1. À gauche, ((1 + h)² − 1)/h = 2 + h → 2. À droite, (2(1 + h) − 1 − 1)/h = 2. Les deux dérivées latérales valent 2 : f est dérivable et f′(1) = 2.'},
   {q:`f(${x}) = √(${x} − 1), définie pour ${x} ≥ 1. Que dire du taux d’accroissement en 1 quand ${h} → 0⁺ ?`, opts:['Il tend vers 0 : tangente horizontale','Il tend vers 1/2','Il tend vers +∞ : tangente verticale, f n’est pas dérivable en 1','Il n’existe pas car f n’est pas continue en 1'], ans:2, why:'τ(h) = √h/h = 1/√h → +∞. La limite n’est pas finie : pas de nombre dérivé, la courbe a une tangente verticale en (1 ; 0).'},
 ]},
 {n:'Dérivées de référence', r:'Les dérivées de référence : √x et xⁿ', qs:[
   {q:`f(${x}) = ${x}⁶. Calcule f′(−1).`, lab:'f′(−1) =', ans:-6, why:'(xⁿ)′ = nxⁿ⁻¹ : f′(x) = 6x⁵ et f′(−1) = 6 · (−1)⁵ = −6.'},
   {q:`f(${x}) = √${x}. Calcule f′(1/4).`, lab:'f′(1/4) =', ans:1, why:'(√x)′ = 1/(2√x) et √(1/4) = 1/2, donc f′(1/4) = 1/(2 · 1/2) = 1.'},
   {q:`f(${x}) = 1/${x}. Calcule f′(−2).`, lab:'f′(−2) =', ans:-.25, tol:1e-9, why:'(1/x)′ = −1/x², donc f′(−2) = −1/4. Le carré rend x² positif : la dérivée est négative partout.'},
   {q:`Quelle est la dérivée de ${x}⁷ ?`, opts:['6<i>x</i>⁷','7<i>x</i>⁸','7<i>x</i>⁶','<i>x</i>⁶/7'], ans:2, why:'(xⁿ)′ = nxⁿ⁻¹ avec n = 7 : 7x⁶. L’exposant baisse de 1 et descend en facteur.'},
   {q:`En quel point <i>a</i> &gt; 0 la tangente à la courbe de ${x}³ a-t-elle une pente égale à 12 ?`, lab:'a =', ans:2, why:'f′(a) = 3a² = 12 ⇔ a² = 4 ⇔ a = 2 (on veut a > 0).'},
 ]},
 {n:'Approximation affine', r:'Estimer une valeur avec la tangente', qs:[
   {q:'Estime √36,3 avec l’approximation affine en <i>a</i> = 36. Donne le résultat de la formule.', lab:'√36,3 ≈', ans:6.025, tol:1e-6, why:'f(36) = 6, f′(36) = 1/(2 · 6) = 1/12 et h = 0,3. Donc √36,3 ≈ 6 + 0,3/12 = 6,025 (valeur exacte 6,02495…).'},
   {q:'Estime 1/4,1 avec l’approximation affine de 1/<i>x</i> en <i>a</i> = 4. Donne le résultat de la formule.', lab:'1/4,1 ≈', ans:.24375, tol:1e-7, why:'f(4) = 1/4 et f′(4) = −1/16, h = 0,1. Donc 1/4,1 ≈ 0,25 − 0,1/16 = 0,25 − 0,00625 = 0,24375 (valeur exacte 0,2439…).'},
   {q:'Estime 3,98² avec l’approximation affine en <i>a</i> = 4.', lab:'3,98² ≈', ans:15.84, tol:1e-6, why:'f(x) = x², f(4) = 16, f′(4) = 8, h = −0,02. Donc 3,98² ≈ 16 + 8 · (−0,02) = 15,84 (valeur exacte 15,8404, erreur h² = 0,0004).'},
   {q:'On estime √50 ≈ 7 + 1/14 avec la tangente en 49. Cette estimation est…', opts:['par défaut, car la courbe de √<i>x</i> est au-dessus de sa tangente','exacte','par excès, car la courbe de √<i>x</i> est en dessous de sa tangente','impossible à situer'], ans:2, why:'La courbe de √x est sous ses tangentes : la tangente surestime. 7 + 1/14 ≈ 7,0714 alors que √50 ≈ 7,0711.'},
   {q:'Le côté d’un cube passe de 2 cm à 2,05 cm. Avec l’approximation affine de <i>V</i>(<i>x</i>) = <i>x</i>³ en 2, de combien son volume augmente-t-il environ ?', lab:'ΔV ≈', unit:'cm³', ans:.6, tol:1e-6, why:'V′(x) = 3x², V′(2) = 12 et h = 0,05 : ΔV ≈ 12 · 0,05 = 0,6 cm³ (valeur exacte 0,615 cm³).'},
 ]},
];
})();
