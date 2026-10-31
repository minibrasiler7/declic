/* Déclic — examen de compétence : Théorèmes sur les dérivées */
(()=>{
const x='<i>x</i>';
EXAMS['gred-theoremes-derivees']=[
 {n:'Dériver un produit ou un quotient', r:'Dériver un quotient', qs:[
   {q:`f(${x}) = (${x}² + 3)(2${x} − 1). Calcule f′(1).`, lab:'f′(1) =', ans:10, why:'Produit : f′(x) = 2x(2x − 1) + 2(x² + 3) = 6x² − 2x + 6. En 1 : 6 − 2 + 6 = 10.'},
   {q:`f(${x}) = ${F(x+' + 1',x+'² + 1')}. Calcule f′(1).`, lab:'f′(1) =', ans:-.5, tol:1e-9, why:'Quotient : f′(x) = (1 · (x² + 1) − (x + 1) · 2x)/(x² + 1)². En 1 : (2 − 4)/4 = −1/2.'},
   {q:`Quelle est la dérivée de f(${x}) = ${F(x+'²',x+' − 1')} ?`, opts:['2<i>x</i>/1 = 2<i>x</i>',F('<i>x</i>² − 2<i>x</i>','(<i>x</i> − 1)²'),F('2<i>x</i> − <i>x</i>²','(<i>x</i> − 1)²'),F('2<i>x</i>','(<i>x</i> − 1)²')], ans:1, why:'(u/v)′ = (u′v − uv′)/v² avec u = x², v = x − 1 : (2x(x − 1) − x²)/(x − 1)² = (x² − 2x)/(x − 1)². Dériver haut et bas séparément (première option) est l’erreur classique.'},
   {q:`Un élève écrit : « (${x} √${x})′ = 1 · ${F('1','2√<i>x</i>')} ». Qu’en penses-tu ?`, opts:['C’est juste : on dérive chaque facteur','C’est faux : (fg)′ = f′g + fg′, et la dérivée est √<i>x</i> + <i>x</i>/(2√<i>x</i>) = (3/2)√<i>x</i>','C’est faux : la dérivée est 1/(2√<i>x</i>) seulement','C’est faux : il manque un signe moins'], ans:1, why:'La dérivée d’un produit n’est pas le produit des dérivées. Contrôle : x√x = x^(3/2) a pour dérivée (3/2)x^(1/2) = (3/2)√x.'},
   {q:`f(${x}) = ${F('1',x+'² + 1')}. Calcule f′(2).`, lab:'f′(2) =', ans:-.16, tol:1e-9, why:'(1/g)′ = −g′/g² : f′(x) = −2x/(x² + 1)². En 2 : −4/25 = −0,16.'},
 ]},
 {n:'Dériver une composée', r:'Dériver une fonction composée', qs:[
   {q:`f(${x}) = (2${x} + 1)⁶. Calcule f′(0).`, lab:'f′(0) =', ans:12, why:'(uⁿ)′ = n u′ uⁿ⁻¹ : f′(x) = 6 · 2 · (2x + 1)⁵. En 0 : 12 · 1 = 12.'},
   {q:`f(${x}) = √(3${x} + 1). Calcule f′(1).`, lab:'f′(1) =', ans:.75, tol:1e-9, why:'(√u)′ = u′/(2√u) : f′(x) = 3/(2√(3x + 1)). En 1 : 3/(2 · 2) = 0,75.'},
   {q:`f(${x}) = √(${x}² + 16). Calcule f′(3).`, lab:'f′(3) =', ans:.6, tol:1e-9, why:'f′(x) = 2x/(2√(x² + 16)) = x/√(x² + 16). En 3 : 3/√25 = 3/5 = 0,6.'},
   {q:`Quelle est la dérivée de (${x}² + 1)⁵ ?`, opts:['5(<i>x</i>² + 1)⁴','10<i>x</i>(<i>x</i>² + 1)⁴','5 · 2<i>x</i> · (<i>x</i>² + 1)⁵','10<i>x</i>⁴'], ans:1, why:'Extérieur u⁵ → 5u⁴, intérieur x² + 1 → 2x. Produit : 10x(x² + 1)⁴. Oublier la dérivée de l’intérieur donne la première option.'},
   {q:`f(${x}) = ${F('1','(2'+x+' − 3)²')}. Calcule f′(2).`, lab:'f′(2) =', ans:-4, why:'f = u⁻² avec u = 2x − 3 : f′ = −2 · 2 · u⁻³ = −4/(2x − 3)³. En 2 : −4/1 = −4.'},
 ]},
 {n:'Dérivée de la réciproque', r:'La dérivée de la fonction réciproque', qs:[
   {q:`f(${x}) = ${x}³ + 2${x} est une bijection de ℝ sur ℝ. Calcule (<i>f</i>⁻¹)′(3).`, lab:'(f⁻¹)′(3) =', ans:.2, tol:1e-9, why:'f(1) = 3, donc f⁻¹(3) = 1 ; f′(1) = 3 + 2 = 5. (f⁻¹)′(3) = 1/5 = 0,2.'},
   {q:`f(${x}) = ${x}⁵ + ${x} + 1 est une bijection de ℝ sur ℝ. Calcule (<i>f</i>⁻¹)′(3) (fraction acceptée).`, lab:'(f⁻¹)′(3) =', ans:1/6, tol:1e-4, show:'1/6', why:'f(1) = 3 et f′(1) = 5 + 1 = 6, donc (f⁻¹)′(3) = 1/6.'},
   {q:'Pourquoi le théorème exige-t-il f′(<i>a</i>) ≠ 0 ?', opts:['Pour que <i>f</i> soit continue en <i>a</i>','Parce qu’une tangente horizontale de <i>f</i> devient une tangente verticale de <i>f</i>⁻¹, qui n’a pas de dérivée','Pour que <i>f</i> soit une bijection','Ce n’est qu’une convention'], ans:1, why:'La symétrie par rapport à y = x échange pentes m et 1/m. Si m = 0, la pente 1/m n’existe pas : f⁻¹ a une tangente verticale, comme √ en 0.'},
   {q:'La racine cubique est la réciproque de <i>x</i> ↦ <i>x</i>³. Que vaut sa dérivée en 27 ? (fraction acceptée)', lab:'(∛)′(27) =', ans:1/27, tol:1e-4, show:'1/27', why:'∛27 = 3 et (x³)′ = 3x² vaut 27 en 3. Donc (∛)′(27) = 1/27.'},
 ]},
 {n:'Extremum local et dérivée nulle', r:'Un extremum local annule la dérivée', qs:[
   {q:`f(${x}) = ${x}³ − 3${x}². Quelle est la somme des abscisses où f′ s’annule ?`, lab:'somme =', ans:2, why:'f′(x) = 3x² − 6x = 3x(x − 2) s’annule en 0 et 2 : somme 2.'},
   {q:`f(${x}) = 2${x}³ − 9${x}² + 12${x}. Quelle est la valeur de son maximum local ?`, lab:'max local =', ans:5, why:'f′(x) = 6x² − 18x + 12 = 6(x − 1)(x − 2). En 1, f′ passe de + à − : maximum local f(1) = 2 − 9 + 12 = 5.'},
   {q:`f(${x}) = ${x} sur [0 ; 2] atteint son maximum en 2, et pourtant f′(2) = 1 ≠ 0. Pourquoi n’y a-t-il pas de contradiction ?`, opts:['Le théorème est faux pour les fonctions affines','2 est une borne de l’intervalle, pas un point intérieur : le théorème ne s’applique pas','f n’est pas dérivable en 2','Le maximum n’est pas un extremum local'], ans:1, why:'Le théorème suppose un point intérieur, où l’on peut regarder des deux côtés. Au bord, le taux n’existe que d’un côté.'},
   {q:`f(${x}) = ${x}⁴. Que se passe-t-il en 0 ?`, opts:['f′(0) = 0 et 0 est un minimum local','f′(0) = 0 mais 0 n’est pas un extremum, comme pour <i>x</i>³','f′(0) ≠ 0 donc pas d’extremum','f n’est pas dérivable en 0'], ans:0, why:'f′(x) = 4x³ s’annule en 0 et change de signe (− puis +) : minimum local, et même global, f(0) = 0 ≤ x⁴.'},
 ]},
 {n:'Rolle et accroissements finis', r:'Le théorème des accroissements finis', qs:[
   {q:`f(${x}) = ${x}² − 4${x} sur [0 ; 4]. Quel est le point <i>c</i> fourni par le théorème de Rolle ?`, lab:'c =', ans:2, why:'f(0) = f(4) = 0 et f′(x) = 2x − 4 s’annule en c = 2.'},
   {q:`f(${x}) = √${x} sur [1 ; 9]. Trouve <i>c</i> tel que f′(<i>c</i>) soit égal au taux d’accroissement de <i>f</i> entre 1 et 9.`, lab:'c =', ans:4, why:'Taux : (3 − 1)/8 = 1/4. f′(c) = 1/(2√c) = 1/4 ⇔ √c = 2 ⇔ c = 4.'},
   {q:`f(${x}) = ${x}³ sur [1 ; 3]. Trouve le <i>c</i> des accroissements finis, arrondi au millième.`, lab:'c ≈', ans:Math.sqrt(13/3), tol:6e-4, show:'√(13/3) ≈ 2,082', why:'Taux : (27 − 1)/2 = 13. f′(c) = 3c² = 13 ⇔ c = √(13/3) ≈ 2,082, bien dans ]1 ; 3[.'},
   {q:`f(${x}) = |${x} − 1| sur [0 ; 2] vérifie f(0) = f(2) = 1, mais aucune tangente n’est horizontale. Quelle hypothèse de Rolle manque ?`, opts:['La continuité sur [0 ; 2]','La dérivabilité sur ]0 ; 2[ : f n’est pas dérivable en 1','L’égalité f(0) = f(2)','Aucune : Rolle est en défaut'], ans:1, why:'|x − 1| a un point anguleux en 1, où elle n’est pas dérivable. Rolle exige la dérivabilité sur tout l’intervalle ouvert.'},
   {q:'Un train parcourt 150 km en 1 h 30. Quel théorème garantit qu’à un instant au moins sa vitesse instantanée a été exactement 100 km/h ?', opts:['Le théorème de Rolle','Le théorème des valeurs intermédiaires','Le théorème des accroissements finis appliqué à la position','Aucun : la vitesse peut toujours être différente de 100 km/h'], ans:2, why:'La position s est dérivable ; s(1,5) − s(0) = s′(c) · 1,5 pour un certain c, donc s′(c) = 150/1,5 = 100 km/h.'},
 ]},
 {n:'Signe de la dérivée et variations', r:'Dérivée nulle, signe de la dérivée : les conséquences', qs:[
   {q:`Combien de solutions réelles a l’équation ${x}³ + 3${x} + 1 = 0 ?`, lab:'solutions :', ans:1, why:'g(x) = x³ + 3x + 1 a pour dérivée 3x² + 3 > 0 : strictement croissante, donc au plus une racine. g(−1) = −3 < 0 < g(0) = 1 : exactement une.'},
   {q:`Combien de solutions réelles a l’équation ${x}⁵ + 2${x} = 10 ?`, lab:'solutions :', ans:1, why:'x ↦ x⁵ + 2x − 10 a pour dérivée 5x⁴ + 2 > 0, strictement croissante ; elle vaut −10 en 0 et 25 en 1,5 : une seule racine.'},
   {q:`<i>f</i> vérifie f′(${x}) = (${x} − 2)² pour tout réel ${x}. Que peut-on dire de <i>f</i> ?`, opts:['f a un extremum local en 2','f est croissante sur ℝ','f est décroissante sur ℝ','f est constante'], ans:1, why:'f′ ≥ 0 sur l’intervalle ℝ, donc f est croissante. En 2, f′ s’annule sans changer de signe : pas d’extremum (comme x³ en 0).'},
   {q:`f(${x}) = 1/${x} a une dérivée −1/${x}² strictement négative sur ℝ*. Peut-on conclure que <i>f</i> est décroissante sur ℝ* ?`, opts:['Oui, dérivée négative ⇒ décroissante','Non : ℝ* n’est pas un intervalle ; f(−1) = −1 &lt; f(1) = 1','Non : la dérivée s’annule en 0','Oui, car f est continue'], ans:1, why:'Le théorème « f′ < 0 ⇒ décroissante » exige un intervalle. f est décroissante sur ]−∞ ; 0[ et sur ]0 ; +∞[ séparément, pas sur leur réunion.'},
   {q:`Pour prouver que ${x}³ ≥ 3${x} − 2 pour tout ${x} ≥ 1, quel raisonnement est correct ?`, opts:['On vérifie pour <i>x</i> = 1, 2, 3 : c’est vrai','d(<i>x</i>) = <i>x</i>³ − 3<i>x</i> + 2 vérifie d(1) = 0 et d′(<i>x</i>) = 3<i>x</i>² − 3 ≥ 0 pour <i>x</i> ≥ 1, donc d croît et d ≥ 0','d′(<i>x</i>) = 3<i>x</i>² − 3 s’annule en 1, donc d a un maximum en 1','<i>x</i>³ croît plus vite que 3<i>x</i>, donc c’est vrai partout'], ans:1, why:'Fonction auxiliaire d = grand côté − petit côté, nulle en 1 et croissante sur [1 ; +∞[ : d(x) ≥ d(1) = 0. Des exemples ne prouvent rien, et l’inégalité est fausse pour x = −3.'},
 ]},
 {n:'Inégalité des accroissements finis', r:'L’inégalité des accroissements finis', qs:[
   {q:'Avec <i>a</i> = 64, quel majorant l’inégalité des accroissements finis donne-t-elle pour √65 − 8 ? (fraction acceptée)', lab:'√65 − 8 ≤', ans:1/16, tol:1e-4, show:'1/16', why:'Sur [64 ; 65], f′(x) = 1/(2√x) ≤ 1/(2 · 8) = 1/16. Donc √65 − 8 ≤ 1/16 = 0,0625 (valeur réelle 0,0623).'},
   {q:'Avec <i>a</i> = 9, quel majorant obtient-on pour √10 ? Arrondis au millième.', lab:'√10 ≤', ans:3+1/6, tol:6e-4, show:'3 + 1/6 ≈ 3,167', why:'√10 − 3 ≤ (10 − 9)/(2√9) = 1/6, donc √10 ≤ 3 + 1/6 ≈ 3,167 (valeur réelle 3,162).'},
   {q:'<i>f</i> est dérivable sur [0 ; 2] avec |f′| ≤ 3, et f(0) = 1. Que peut-on affirmer sur f(2) ?', opts:['f(2) = 7','−5 ≤ f(2) ≤ 7','f(2) ≤ 3','0 ≤ f(2) ≤ 6'], ans:1, why:'|f(2) − f(0)| ≤ 3 · 2 = 6, donc f(2) ∈ [1 − 6 ; 1 + 6] = [−5 ; 7].'},
   {q:'<i>f</i> est dérivable sur [1 ; 4] avec 2 ≤ f′ ≤ 5, et f(1) = 0. Quelle est la plus petite valeur possible de f(4) ?', lab:'min f(4) =', ans:6, why:'f(4) − f(1) ≥ 2 · (4 − 1) = 6, donc f(4) ≥ 6 (et f(4) ≤ 15).'},
 ]},
];
})();
