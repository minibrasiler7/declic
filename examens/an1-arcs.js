/* Déclic — examen de compétence : Arcs paramétrés */
(()=>{
const t='<i>t</i>', g='γ(<i>t</i>)';
const fol=a=>`Le folium de Descartes avec <i>a</i> = ${a} est l’arc <i>x</i> = ${F(3*a===3?'3'+t:3*a+t,'1 + '+t+'³')}, <i>y</i> = ${F((3*a===3?'3':3*a)+t+'²','1 + '+t+'³')}.`;
EXAMS['an1-arcs']=[
 {n:'Vitesse, tangentes et points singuliers', r:'Vitesse, tangentes et points singuliers', qs:[
   {q:`Pour ${g} = (${t}³ − 3${t} ; ${t}²), pour quelle valeur de ${t} la tangente est-elle horizontale ?`, lab:`${t} =`, ans:0, why:'γ′(t) = (3t² − 3 ; 2t). y′ = 0 ⇔ t = 0, et alors x′ = −3 ≠ 0 : tangente horizontale en γ(0) = (0 ; 0).'},
   {q:`Pour ${g} = (${t}³ − 12${t} ; ${t}² + 1), combien de points ont une tangente verticale ?`, lab:'nombre =', ans:2, why:'x′(t) = 3t² − 12 = 0 ⇔ t = ±2, et y′(±2) = 2t = ±4 ≠ 0. Deux tangentes verticales.'},
   {q:`Pour ${g} = (${t}² + ${t} ; ${t}³), quelle est la pente de la tangente en ${t} = 1 ?`, lab:'pente =', ans:1, why:'γ′(t) = (2t + 1 ; 3t²), donc γ′(1) = (3 ; 3). Pente y′/x′ = 3/3 = 1.'},
   {q:`Pour ${g} = (2${t} + 1 ; ${t}² − 3${t}), quelle est la pente de la tangente en ${t} = 2 ?`, lab:'pente =', ans:0.5, show:'1/2', why:'γ′(t) = (2 ; 2t − 3), donc γ′(2) = (2 ; 1). La pente vaut y′/x′ = 1/2 (et non x′/y′ = 2).'},
   {q:`Pour la cycloïde ${g} = (${t} − sin ${t} ; 1 − cos ${t}), quelle est la pente de la tangente en ${t} = 2π/3 ? Arrondis au centième.`, lab:'pente ≈', ans:1/Math.sqrt(3), tol:0.006, show:'√3/3 ≈ 0,58', why:'γ′(t) = (1 − cos t ; sin t). En 2π/3 : (1 + 1/2 ; √3/2) = (3/2 ; √3/2). Pente (√3/2)/(3/2) = √3/3 ≈ 0,58.'},
   {q:`Pour ${g} = (${t}² − 4${t} ; ${t}³ − 12${t}), pour quelle valeur de ${t} le point est-il singulier ?`, lab:`${t} =`, ans:2, why:'x′(t) = 2t − 4 s’annule seulement en t = 2, et y′(2) = 3 · 4 − 12 = 0. Les deux s’annulent ensemble en t = 2.'},
   {q:`Pour ${g} = (${t}² ; ${t}³), le point γ(0) = (0 ; 0) est…`, opts:['régulier, à tangente horizontale','régulier, à tangente verticale','singulier, car γ′(0) = (0 ; 0)','un point double'], ans:2, why:'γ′(t) = (2t ; 3t²) vaut (0 ; 0) en t = 0 : les deux coordonnées de la vitesse s’annulent ensemble, le point est singulier (une pointe).'},
 ]},
 {n:'Équation de la tangente', r:'L’équation de la tangente à un arc', qs:[
   {q:`La tangente à ${g} = (${t}² ; ${t}³) en ${t} = 2 s’écrit <i>y</i> = <i>mx</i> + <i>p</i>. Que vaut <i>p</i> ?`, lab:'<i>p</i> =', ans:-4, why:'γ(2) = (4 ; 8) et γ′(2) = (4 ; 12), pente 3. y = 8 + 3(x − 4) = 3x − 4.'},
   {q:`La tangente à ${g} = (${t} + 1 ; ${t}²) en ${t} = 1 coupe l’axe O<i>x</i>. En quelle abscisse ?`, lab:'<i>x</i> =', ans:1.5, why:'γ(1) = (2 ; 1) et γ′(1) = (1 ; 2), pente 2. y = 1 + 2(x − 2) = 2x − 3, nul en x = 1,5.'},
   {q:`La tangente au cercle ${g} = (cos ${t} ; sin ${t}) en ${t} = π/4 coupe l’axe O<i>x</i>. En quelle abscisse ? Arrondis au centième.`, lab:'<i>x</i> ≈', ans:Math.SQRT2, tol:0.006, show:'√2 ≈ 1,41', why:'γ(π/4) = (√2/2 ; √2/2) et γ′ = (−sin t ; cos t) = (−√2/2 ; √2/2), pente −1. y = √2/2 − (x − √2/2) s’annule en x = √2 ≈ 1,41.'},
   {q:`Quelle est une représentation paramétrique de la tangente à ${g} = (${t}² ; 2${t}) en ${t} = 1 ?`, opts:['(x ; y) = (1 ; 2) + s(2 ; 2)','(x ; y) = (2 ; 2) + s(1 ; 2)','(x ; y) = (1 ; 2) + s(1 ; 0)','(x ; y) = (0 ; 0) + s(1 ; 2)'], ans:0, why:'Elle passe par γ(1) = (1 ; 2) et a pour direction γ′(1) = (2t ; 2) = (2 ; 2).'},
   {q:`En ${t} = 1, l’arc ${g} = (${t}² − 2${t} ; ${t}³) a une tangente verticale <i>x</i> = <i>c</i>. Que vaut <i>c</i> ?`, lab:'<i>c</i> =', ans:-1, why:'γ′(1) = (2 − 2 ; 3) = (0 ; 3) : tangente verticale. Elle passe par γ(1) = (1 − 2 ; 1) = (−1 ; 1), donc x = −1.'},
   {q:`La tangente à ${g} = (${t}³ ; ${t}² − 1) en ${t} = −1 coupe l’axe O<i>y</i>. En quelle ordonnée ? (fraction acceptée)`, lab:'<i>y</i> =', ans:-2/3, show:'−2/3', why:'γ(−1) = (−1 ; 0) et γ′(−1) = (3 ; −2), pente −2/3. y = −(2/3)(x + 1), qui vaut −2/3 en x = 0.'},
 ]},
 {n:'Le folium de Descartes', r:'Le folium de Descartes', qs:[
   {q:`${fol(1)} Quelle est l’abscisse du point obtenu pour ${t} = 1 ?`, lab:'<i>x</i> =', ans:1.5, why:'x = 3 · 1/(1 + 1) = 3/2 = 1,5 (et y = 1,5 aussi : c’est le sommet de la boucle, sur l’axe y = x).'},
   {q:`${fol(2)} Quelle est son asymptote ?`, opts:['x + y + 2 = 0','x + y − 2 = 0','x = −2','y = x + 2'], ans:0, why:'Quand t → −1, le point file vers l’asymptote x + y + a = 0, ici x + y + 2 = 0.'},
   {q:`Pour le folium, la vitesse vaut γ′(${t}) = 3<i>a</i>/(1 + ${t}³)² · (1 − 2${t}³ ; 2${t} − ${t}⁴). Quelle est la pente de la tangente en ${t} = 2 ?`, lab:'pente =', ans:0.8, show:'4/5', why:'Le facteur commun se simplifie : pente = (2t − t⁴)/(1 − 2t³) = (4 − 16)/(1 − 16) = −12/(−15) = 4/5.'},
   {q:'Laquelle de ces affirmations sur le folium de Descartes est vraie ?', opts:['Il a un point singulier à l’origine','L’origine est un point double, et il n’a aucun point singulier','Il a une asymptote verticale','Il n’a pas de boucle'], ans:1, why:'La vitesse ne s’annule jamais (1 − 2t³ et 2t − t⁴ ne sont jamais nuls ensemble) : pas de point singulier. La courbe passe deux fois par l’origine (t = 0 et t → ∞) : point double.'},
 ]},
 {n:'Courbes polaires et origine', r:'Courbe polaire : passages par l’origine', qs:[
   {q:'Pour <i>r</i> = 1 − 2 cos θ, quel est le plus petit θ de [0 ; 2π[ pour lequel la courbe passe par l’origine ? Donne-le en radians, arrondi au centième.', lab:'θ ≈', ans:Math.PI/3, tol:0.006, show:'π/3 ≈ 1,05', why:'r = 0 ⇔ cos θ = 1/2 ⇔ θ = π/3 ou θ = 2π − π/3 = 5π/3. Le plus petit est π/3 ≈ 1,05.'},
   {q:'Pour <i>r</i> = √2 − 2 cos θ, quel est le plus grand θ de [0 ; 2π[ pour lequel la courbe passe par l’origine ? Donne-le en degrés.', lab:'θ =', unit:'°', ans:315, why:'r = 0 ⇔ cos θ = √2/2 ⇔ θ = 45° ou θ = 360° − 45° = 315°.'},
   {q:'Combien de fois la courbe <i>r</i> = 2 + 3 sin θ passe-t-elle par l’origine quand θ parcourt [0 ; 2π[ ?', lab:'nombre =', ans:2, why:'r = 0 ⇔ sin θ = −2/3. Comme −1 &lt; −2/3 &lt; 1, il y a deux angles θ₀ et π − θ₀ dans [0 ; 2π[ : deux passages.'},
   {q:'Combien de fois la courbe <i>r</i> = 3 + 2 cos θ passe-t-elle par l’origine quand θ parcourt [0 ; 2π[ ?', lab:'nombre =', ans:0, why:'r = 0 ⇔ cos θ = −3/2, impossible car cos θ ≥ −1. La courbe ne passe jamais par l’origine.'},
   {q:'La courbe <i>r</i> = 1 + sin θ passe par l’origine…', opts:['jamais','une seule fois, en un point singulier (une pointe)','deux fois','une seule fois, en un point régulier'], ans:1, why:'r = 0 ⇔ sin θ = −1 ⇔ θ = 3π/2, une seule solution. Là, r′ = cos θ = 0 aussi : r = r′ = 0, le point est singulier.'},
 ]},
 {n:'Le limaçon de Pascal', r:'Le limaçon de Pascal', qs:[
   {q:'Le limaçon <i>r</i> = 2 + cos θ donne le point (<i>r</i> cos θ ; <i>r</i> sin θ). Quelle est son abscisse pour θ = π/3 ?', lab:'<i>x</i> =', ans:1.25, show:'5/4', why:'r = 2 + cos(π/3) = 2,5, puis x = r cos θ = 2,5 · 1/2 = 1,25.'},
   {q:'Pour quelle valeur de <i>b</i> le limaçon <i>r</i> = <i>b</i> + 3 cos θ a-t-il un point singulier (une cardioïde) ?', lab:'<i>b</i> =', ans:3, why:'Il faut r = 0 et r′ = −3 sin θ = 0 ensemble : θ = π (θ = 0 donnerait b = −3) et b − 3 = 0, donc b = 3.'},
   {q:'Quelle forme a le limaçon <i>r</i> = 1 + 3 cos θ ?', opts:['Il a une boucle intérieure','C’est une cardioïde','C’est un ovale convexe','C’est un cercle'], ans:0, why:'r = 0 ⇔ cos θ = −1/3 : deux passages par l’origine, avec r′ ≠ 0. La courbe se recoupe en formant une boucle intérieure (b = 1 &lt; a = 3).'},
 ]},
 {n:'Éliminer le paramètre', r:'Éliminer le paramètre', qs:[
   {q:`Quelle est l’équation cartésienne de ${g} = (${t} − 2 ; ${t}² + 1) ?`, opts:['y = x² + 4x + 5','y = x² − 4x + 5','y = x² + 1','y = (x − 2)² + 1'], ans:0, why:'t = x + 2, donc y = (x + 2)² + 1 = x² + 4x + 5.'},
   {q:`L’arc ${g} = (3${t} ; 6${t} − 1) est une droite. Quelle est sa pente ?`, lab:'pente =', ans:2, why:'t = x/3, donc y = 6 · x/3 − 1 = 2x − 1 : une droite de pente 2.'},
   {q:`L’arc ${g} = (2 cos ${t} ; 2 sin ${t}) est un cercle. Quel est son rayon ?`, lab:'rayon =', ans:2, why:'x² + y² = 4 cos² t + 4 sin² t = 4(cos² t + sin² t) = 4 : cercle de centre O et de rayon 2.'},
   {q:`Quelle est l’équation cartésienne de ${g} = (1 + 3 cos ${t} ; −2 + 3 sin ${t}) ?`, opts:['(x + 1)² + (y − 2)² = 9','(x − 1)² + (y + 2)² = 9','(x − 1)² + (y + 2)² = 3','x² + y² = 9'], ans:1, why:'cos t = (x − 1)/3 et sin t = (y + 2)/3. Avec cos² t + sin² t = 1 : (x − 1)² + (y + 2)² = 9, cercle de centre (1 ; −2) et de rayon 3.'},
   {q:`Quelle équation vérifient les points de ${g} = (${t}² ; ${t}⁴ − 3${t}²) ?`, opts:['y = x⁴ − 3x²','y = x² − 3x','y = x² − 3','y = x − 3x²'], ans:1, why:'x = t², donc t⁴ = x² : y = x² − 3x (avec x ≥ 0). C’est un morceau de parabole.'},
 ]},
];
})();
