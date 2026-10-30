/* Déclic — examen de compétence : Équations différentielles */
(()=>{
EXAMS['edo']=[
 {n:'Résoudre y′ = ky et y′ = k(y − a)', r:'Résoudre y′ = ky et y′ = k(y − a)', qs:[
   {q:'Résous y′ = 0,3y avec y(0) = 4. Combien vaut y(2) ? (au centième)', lab:'y(2) =', ans:7.29, tol:0.006, why:'y = 4e^{0,3x}, donc y(2) = 4e^{0,6} ≈ 4 · 1,8221 ≈ 7,29.'},
   {q:'Résous y′ = −2y avec y(0) = 10. Combien vaut y(1) ? (au centième)', lab:'y(1) =', ans:1.35, tol:0.006, why:'y = 10e^{−2x}, donc y(1) = 10e^{−2} ≈ 10 · 0,1353 ≈ 1,35.'},
   {q:'Une solution de y′ = 2y vérifie y(1) = 6. Combien vaut y(0) ? (au centième)', lab:'y(0) =', ans:0.81, tol:0.006, why:'y = C·e^{2x} et y(1) = C·e² = 6, donc y(0) = C = 6/e² ≈ 0,81.'},
   {q:'Quelles sont les solutions de y′ = −y/2 ?', opts:['y = C·e^{−2x}','y = −x/2 + C','y = C·e^{2x}','y = C·e^{−x/2}'], ans:3, why:'Ici k = −1/2 : y = C·e^{−x/2}. Contrôle : (C·e^{−x/2})′ = −½·C·e^{−x/2} = −y/2.'},
   {q:'Un objet vérifie T′ = −0,2(T − 20) avec T(0) = 80. Combien vaut T(5) ? (au centième)', lab:'T(5) =', ans:42.07, tol:0.006, why:'u = T − 20 vérifie u′ = −0,2u avec u(0) = 60, donc T = 20 + 60e^{−0,2t}. T(5) = 20 + 60e^{−1} ≈ 42,07.'},
   {q:'Résous y′ = 0,5(y − 10) avec y(0) = 12. Combien vaut y(2) ? (au centième)', lab:'y(2) =', ans:15.44, tol:0.006, why:'y = 10 + (12 − 10)e^{0,5x} = 10 + 2e^{0,5x}. y(2) = 10 + 2e ≈ 15,44. Comme k > 0, y s’éloigne de 10.'},
   {q:'Une solution de y′ = −3(y − 7) part de y(0) = 1. Vers quelle valeur tend-elle quand x → +∞ ?', ans:7, why:'y = 7 + (1 − 7)e^{−3x} = 7 − 6e^{−3x}. Comme k = −3 < 0, e^{−3x} → 0 et y → 7.'},
   {q:'Quelle est la solution de y′ = 2y + 6 avec y(0) = 1 ?', opts:['y = 1 + 3e^{2x}','y = −3 + 4e^{2x}','y = 3 − 2e^{2x}','y = e^{2x} + 6x'], ans:1, why:'y′ = 2y + 6 = 2(y + 3) : c’est y′ = k(y − a) avec a = −3. y = −3 + (1 + 3)e^{2x} = −3 + 4e^{2x}.'},
 ]},
 {n:'Trouver k, demi-vie', r:'Trouver k avec une mesure', qs:[
   {q:'Une quantité qui suit y′ = ky passe de 500 à 400 en 3 h. Combien vaut k ? (en h⁻¹, 4 décimales)', lab:'k =', ans:-0.0744, tol:0.00006, why:'500e^{3k} = 400 donne e^{3k} = 0,8, donc k = ln 0,8 / 3 ≈ −0,0744 h⁻¹.'},
   {q:'Une population qui suit y′ = ky passe de 1000 à 3000 en 2 h. Combien vaut k ? (en h⁻¹, 3 décimales)', lab:'k =', ans:0.549, tol:0.0006, why:'e^{2k} = 3, donc k = ln 3 / 2 ≈ 0,549 h⁻¹.'},
   {q:'Une substance se désintègre selon y′ = −0,05y (t en ans). Quelle est sa demi-vie ? (au centième)', unit:'ans', ans:13.86, tol:0.006, why:'T = ln 2 / |k| = ln 2 / 0,05 ≈ 13,86 ans.'},
   {q:'Une quantité qui suit y′ = ky passe de 60 à 45 en 2 h. Quelle est sa demi-vie ? (au centième)', unit:'h', ans:4.82, tol:0.006, why:'e^{2k} = 0,75, donc k = ln 0,75 / 2 ≈ −0,1438. T = ln 2 / 0,1438 ≈ 4,82 h.'},
   {q:'Un isotope a une demi-vie de 8 jours. Il en reste combien après 24 jours, si l’on part de 120 g ?', unit:'g', ans:15, why:'24 jours font 3 demi-vies : 120/2³ = 120/8 = 15 g.'},
   {q:'Une substance a une demi-vie de 6 ans. Après combien d’années n’en reste-t-il que 1/16 ?', unit:'ans', ans:24, why:'1/16 = 1/2⁴ : il faut 4 demi-vies, soit 4 × 6 = 24 ans.'},
   {q:'Un isotope a une demi-vie de 10 ans. Quelle part en reste-t-il après 5 ans ?', opts:['75 %','environ 70,7 %','50 %','25 %'], ans:1, why:'k = −ln 2 / 10, donc après 5 ans il reste e^{5k} = e^{−ln 2 / 2} = 1/√2 ≈ 0,707 de la quantité initiale. La décroissance est exponentielle, pas linéaire : ce n’est pas 75 %.'},
 ]},
 {n:'L’oscillateur y″ + ω²y = 0', r:'L’oscillateur y″ + ω²y = 0', qs:[
   {q:'Quelle est la période des solutions de y″ + 25y = 0 ? (au centième)', ans:1.26, tol:0.006, why:'r² + 25 = 0 donne r = ±5i, donc ω = 5 et la période vaut 2π/5 ≈ 1,26.'},
   {q:'Pour quelle valeur de b les solutions de y″ + by = 0 ont-elles une période de π ?', lab:'b =', ans:4, why:'Période 2π/ω = π donne ω = 2, et l’équation est y″ + ω²y = 0, donc b = ω² = 4.'},
   {q:'Quelle est la forme générale des solutions de y″ + 7y = 0 ?', opts:['A e^{√7 t} + B e^{−√7 t}','A cos 7t + B sin 7t','A cos(√7 t) + B sin(√7 t)','A cos(49t) + B sin(49t)'], ans:2, why:'r² + 7 = 0 donne r = ±i√7. Donc ω = √7 et y = A cos(√7 t) + B sin(√7 t).'},
   {q:'Résous y″ + 4y = 0 avec y(0) = 3 et y′(0) = −4. Combien vaut B dans y = A cos 2t + B sin 2t ?', lab:'B =', ans:-2, why:'y′(0) = 2B = −4, donc B = −2 (et A = y(0) = 3).'},
   {q:'Résous y″ + 9y = 0 avec y(0) = 3 et y′(0) = 12. Quelle est l’amplitude ?', ans:5, why:'y = A cos 3t + B sin 3t avec A = 3 et 3B = 12, soit B = 4. Amplitude √(3² + 4²) = 5.'},
   {q:'Résous y″ + y = 0 avec y(0) = −1 et y′(0) = 1. Quelle est l’amplitude ? (au centième)', ans:1.41, tol:0.006, why:'ω = 1 : A = −1 et B = 1. Amplitude √((−1)² + 1²) = √2 ≈ 1,41. Le signe de A ne change rien à l’amplitude.'},
   {q:'Résous y″ + 16y = 0 avec y(0) = 0 et y′(0) = 8. Combien vaut y(π/8) ?', ans:2, why:'A = 0 et 4B = 8, donc y = 2 sin 4t. y(π/8) = 2 sin(π/2) = 2.'},
   {q:'y″ + 4y = 0 avec y(0) = 1 et y′(0) = 2√3. À quel instant t > 0 la solution s’annule-t-elle pour la première fois ? (au centième)', lab:'t =', ans:1.31, tol:0.006, why:'A = 1, B = √3 : y = 2 sin(2t + φ) avec tan φ = A/B = 1/√3, soit φ = π/6. 2t + π/6 = π donne t = 5π/12 ≈ 1,31.'},
 ]},
 {n:'Équation caractéristique à racines réelles', r:'L’oscillateur y″ + ω²y = 0', qs:[
   {q:'Quelle est la forme générale des solutions de y″ − 5y′ + 6y = 0 ?', opts:['A e^{2t} + B e^{3t}','A cos 2t + B sin 3t','A e^{−2t} + B e^{−3t}','A e^{5t} + B e^{6t}'], ans:0, why:'r² − 5r + 6 = (r − 2)(r − 3) = 0 donne r = 2 et r = 3, d’où y = A e^{2t} + B e^{3t}.'},
   {q:'Quelle est la racine négative de l’équation caractéristique de y″ − y′ − 6y = 0 ?', lab:'r =', ans:-2, why:'r² − r − 6 = (r − 3)(r + 2) : les racines sont 3 et −2.'},
   {q:'La fonction e^{−3t} est solution de y″ + y′ − 6y = 0. Pour quelle autre valeur de r la fonction e^{rt} est-elle solution ?', lab:'r =', ans:2, why:'r² + r − 6 = (r + 3)(r − 2). L’autre racine est 2 : e^{2t} est aussi solution.'},
   {q:'Quelle est la plus grande racine de l’équation caractéristique de y″ + 2y′ − 8y = 0 ?', lab:'r =', ans:2, why:'r² + 2r − 8 = (r − 2)(r + 4) : les racines sont 2 et −4.'},
   {q:'Résous y″ − 4y = 0 avec y(0) = 3 et y′(0) = 2. Combien vaut A dans y = A e^{2t} + B e^{−2t} ?', lab:'A =', ans:2, why:'y(0) = A + B = 3 et y′(0) = 2A − 2B = 2, soit A − B = 1. En additionnant : 2A = 4, donc A = 2 et B = 1.'},
   {q:'Que deviennent les solutions de y″ + 3y′ + 2y = 0 quand t → +∞ ?', opts:['Elles oscillent','Elles tendent vers +∞','Elles tendent vers 0','Elles tendent vers 2'], ans:2, why:'r² + 3r + 2 = (r + 1)(r + 2) : r = −1 et r = −2. y = A e^{−t} + B e^{−2t}, et les deux exponentielles tendent vers 0.'},
   {q:'Laquelle de ces équations a des solutions qui oscillent ?', opts:['y″ − 6y = 0','y″ + 6y = 0','y″ − 5y′ + 6y = 0','y′ = 6y'], ans:1, why:'r² + 6 = 0 donne r = ±i√6 : y = A cos(√6 t) + B sin(√6 t). Pour y″ − 6y = 0, r = ±√6 est réel : des exponentielles, pas d’oscillation.'},
 ]},
];
})();
