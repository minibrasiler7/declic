/* Déclic — examen de compétence : Courbes paramétrées */
(()=>{
EXAMS['parametrees']=[
 {n:'Éliminer le paramètre', r:'Éliminer le paramètre', qs:[
   {q:'La courbe x = 2 + t, y = 3 − 2t est une droite. Quelle est sa pente ?', lab:'pente =', ans:-2, why:'t = x − 2, donc y = 3 − 2(x − 2) = 7 − 2x. La pente vaut −2.'},
   {q:'La courbe x = t − 1, y = 4t + 3 est une droite y = mx + p. Combien vaut p ?', lab:'p =', ans:7, why:'t = x + 1, donc y = 4(x + 1) + 3 = 4x + 7. L’ordonnée à l’origine vaut 7.'},
   {q:'En quelle abscisse la droite x = 1 + 2t, y = 3 − t coupe-t-elle l’axe des x ?', lab:'x =', ans:7, why:'Sur l’axe des x, y = 0 : 3 − t = 0 donne t = 3, puis x = 1 + 2·3 = 7.'},
   {q:'La courbe x = 2t, y = t² − 1 passe par un point d’abscisse 6. Quelle est son ordonnée ?', lab:'y =', ans:8, why:'t = x/2, donc y = x²/4 − 1. Pour x = 6 : 36/4 − 1 = 8 (c’est t = 3).'},
   {q:'Que décrit la courbe x = 1 + 4 cos t, y = −2 + 4 sin t, pour t de 0 à 2π ?', opts:['Le cercle de centre (−1 ; 2) et de rayon 4','Le cercle de centre (1 ; −2) et de rayon 16','Le cercle de centre (1 ; −2) et de rayon 4','Une droite de pente −2'], ans:2, why:'cos t = (x − 1)/4 et sin t = (y + 2)/4. cos² t + sin² t = 1 donne (x − 1)² + (y + 2)² = 16 : centre (1 ; −2), rayon 4.'},
   {q:'Quelle relation lie x et y sur la courbe x = 3 cos t, y = 2 sin t ?', opts:['x² + y² = 13','x²/9 + y²/4 = 1','9x² + 4y² = 1','x/3 + y/2 = 1'], ans:1, why:'cos t = x/3 et sin t = y/2. cos² t + sin² t = 1 donne x²/9 + y²/4 = 1.'},
   {q:'Quelle relation lie x et y sur la courbe x = t², y = t ?', opts:['y = x²','x = y²','x = 2y','x + y = 1'], ans:1, why:'t = y, donc x = t² = y² : c’est une parabole couchée.'},
   {q:'La courbe x = 3 + cos t, y = 3 sin t est-elle un cercle ?', opts:['Oui, de rayon 3','Oui, de rayon 1','Non : (x − 3)² + y²/9 = 1, les deux coefficients diffèrent','Oui, de centre (3 ; 3)'], ans:2, why:'cos t = x − 3 et sin t = y/3, donc (x − 3)² + (y/3)² = 1. La courbe s’étire 3 fois plus en hauteur qu’en largeur : ce n’est pas un cercle.'},
 ]},
 {n:'Coordonnées polaires', r:'Éliminer le paramètre', qs:[
   {q:'Un point a pour coordonnées polaires r = 4 et θ = π/3. Quelle est son ordonnée ? (au centième)', lab:'y =', ans:3.46, tol:0.006, why:'y = r sin θ = 4 · √3/2 = 2√3 ≈ 3,46. (Et x = 4 cos(π/3) = 2.)'},
   {q:'Un point a pour coordonnées polaires r = 2 et θ = 3π/4. Quelle est son abscisse ? (au centième)', lab:'x =', ans:-1.41, tol:0.006, why:'x = r cos θ = 2 · (−√2/2) = −√2 ≈ −1,41.'},
   {q:'Sur la spirale r = 2θ, quelle est l’abscisse du point obtenu pour θ = π ? (au centième)', lab:'x =', ans:-6.28, tol:0.006, why:'r = 2π et x = r cos θ = 2π · cos π = −2π ≈ −6,28.'},
   {q:'Quelles coordonnées polaires (r ; θ), avec θ ∈ [0 ; 2π[, a le point (0 ; −3) ?', opts:['r = −3 et θ = 0','r = 3 et θ = π/2','r = 3 et θ = 3π/2','r = 3 et θ = π'], ans:2, why:'r est la distance à l’origine : 3. Il faut 3 cos θ = 0 et 3 sin θ = −3, donc θ = 3π/2.'},
   {q:'En coordonnées polaires, que décrit la courbe r = 3 ?', opts:['Une spirale','Le cercle de centre O et de rayon 3','La droite x = 3','Une rose à 3 pétales'], ans:1, why:'Tous les points sont à distance 3 de l’origine, quel que soit l’angle : x = 3 cos θ, y = 3 sin θ, le cercle de rayon 3.'},
 ]},
 {n:'Vecteur vitesse et tangentes', r:'Vecteur vitesse et tangentes', qs:[
   {q:'Un point suit x = t³, y = 2t. Quelle est sa vitesse (norme) en t = 1 ? (au centième)', ans:3.61, tol:0.006, why:'(x′ ; y′) = (3t² ; 2) vaut (3 ; 2) en t = 1. Norme √(9 + 4) = √13 ≈ 3,61.'},
   {q:'Un point suit x = 4 cos t, y = 4 sin t. Quelle est sa vitesse (norme) ?', ans:4, why:'(x′ ; y′) = (−4 sin t ; 4 cos t), de norme √(16(sin² t + cos² t)) = 4, à tout instant.'},
   {q:'Un point suit x = 3t, y = t² − 6t. Pour quelle valeur de t la tangente est-elle horizontale ?', lab:'t =', ans:3, why:'y′ = 2t − 6 = 0 pour t = 3, et x′ = 3 ≠ 0 : tangente horizontale au point (9 ; −9).'},
   {q:'Une courbe suit x = t² − 4t, y = t³. Pour quelle valeur de t la tangente est-elle verticale ?', lab:'t =', ans:2, why:'x′ = 2t − 4 = 0 pour t = 2, et y′ = 3t² = 12 ≠ 0 : tangente verticale.'},
   {q:'Une courbe suit x = t³ − 3t, y = t². Quelle est l’abscisse du point à tangente verticale obtenu pour t > 0 ?', lab:'x =', ans:-2, why:'x′ = 3t² − 3 = 0 pour t = ±1, et y′ = 2t ≠ 0. Pour t = 1 : x = 1 − 3 = −2.'},
   {q:'Un ballon suit x = 8t, y = 20t − 5t² (en m). Quelle hauteur maximale atteint-il ?', unit:'m', ans:20, why:'Au sommet, y′ = 20 − 10t = 0, soit t = 2 s. y(2) = 40 − 20 = 20 m.'},
   {q:'Un ballon suit x = 6t, y = 10t − 5t² (en m, t en s). Quelle est sa vitesse (norme) au sommet de sa trajectoire ?', unit:'m/s', ans:6, why:'Au sommet, y′ = 10 − 10t = 0 (t = 1). Le vecteur vitesse vaut (6 ; 0), de norme 6 m/s.'},
   {q:'Lequel de ces vecteurs est tangent à la courbe x = t², y = t³ au point t = 2 ?', opts:['(4 ; 8)','(1 ; 3)','(2 ; 12)','(12 ; 4)'], ans:1, why:'Le vecteur vitesse vaut (2t ; 3t²) = (4 ; 12) en t = 2. Tout multiple non nul est tangent aussi : (1 ; 3) = (4 ; 12)/4.'},
   {q:'Que se passe-t-il en t = 0 pour la courbe x = t², y = t³ ?', opts:['La courbe n’est pas définie en t = 0','La courbe passe par ce point à vitesse maximale','La courbe se coupe elle-même en ce point','La vitesse est nulle : la courbe peut former une pointe (point de rebroussement)'], ans:3, why:'(x′ ; y′) = (2t ; 3t²) vaut (0 ; 0) en t = 0. Le point s’arrête un instant : la courbe forme une pointe à l’origine.'},
 ]},
 {n:'Longueur d’arc', r:'Calculer une longueur d’arc', qs:[
   {q:'Quelle est la longueur de la courbe x = 3t, y = 4t pour t ∈ [0 ; 2] ?', ans:10, why:'x′² + y′² = 9 + 16 = 25 : la vitesse vaut 5. L = ∫₀² 5 dt = 10.'},
   {q:'Quelle est la longueur de la courbe x = 1 + 2t, y = 3 − t pour t ∈ [0 ; 3] ? (au centième)', ans:6.71, tol:0.006, why:'x′² + y′² = 4 + 1 = 5 : vitesse √5. L = 3√5 ≈ 6,71.'},
   {q:'Quelle est la longueur de la courbe x = 5 cos t, y = 5 sin t pour t ∈ [0 ; π/2] ? (au centième)', ans:7.85, tol:0.006, why:'x′² + y′² = 25(sin² t + cos² t) = 25 : vitesse 5. L = 5 · π/2 ≈ 7,85, un quart de cercle de rayon 5.'},
   {q:'Quelle est la longueur de la courbe x = 3 sin 2t, y = 3 cos 2t pour t ∈ [0 ; π/4] ? (au centième)', ans:4.71, tol:0.006, why:'x′ = 6 cos 2t et y′ = −6 sin 2t, donc x′² + y′² = 36 : vitesse 6. L = 6 · π/4 = 3π/2 ≈ 4,71.'},
   {q:'Quelle est la longueur de la courbe x = cos 2t, y = sin 2t pour t ∈ [0 ; π] ? (au centième)', ans:6.28, tol:0.006, why:'x′² + y′² = 4 sin² 2t + 4 cos² 2t = 4 : vitesse 2. L = 2π ≈ 6,28 : le cercle unité parcouru une fois.'},
   {q:'Quelle distance parcourt le point x = cos t, y = sin t pour t ∈ [0 ; 4π] ? (au centième)', ans:12.57, tol:0.006, why:'La vitesse vaut 1, donc L = ∫₀^{4π} 1 dt = 4π ≈ 12,57. Le cercle est parcouru deux fois : la longueur parcourue compte les deux tours.'},
   {q:'Quelle est la longueur de la cycloïde x = t − sin t, y = 1 − cos t pour t ∈ [0 ; π] ?', ans:4, why:'Vitesse √(2 − 2cos t) = 2|sin(t/2)|, avec sin(t/2) ≥ 0 sur [0 ; π]. L = [−4 cos(t/2)]₀^π = 0 + 4 = 4.'},
   {q:'Quelle est la longueur d’une arche de x = 2t − 2 sin t, y = 2 − 2 cos t, pour t ∈ [0 ; 2π] ?', ans:16, why:'x′² + y′² = 4(1 − cos t)² + 4 sin² t = 8 − 8 cos t = 16 sin²(t/2) : vitesse 4 sin(t/2). L = [−8 cos(t/2)]₀^{2π} = 8 + 8 = 16.'},
 ]},
];
})();
