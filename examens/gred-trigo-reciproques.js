/* Déclic — examen de compétence : Fonctions trigonométriques réciproques */
(()=>{
const x='<i>x</i>';
const I=(a,b,g)=>`∫<sub>${a}</sub><sup>${b}</sup> ${g} d<i>x</i>`;
EXAMS['gred-trigo-reciproques']=[
 {n:'La fonction arcsin', r:'La fonction arcsin', qs:[
   {q:'Calcule arcsin(−√3/2), en radians, arrondi au millième.', lab:'=', ans:-Math.PI/3, tol:.002, why:'On cherche θ ∈ [−π/2 ; π/2] avec sin θ = −√3/2 : c’est −π/3 ≈ −1,047 (arcsin est impaire et arcsin(√3/2) = π/3).'},
   {q:'Calcule arcsin(sin(2π/3)), en radians, arrondi au millième.', lab:'=', ans:Math.PI/3, tol:.002, why:'2π/3 ∉ [−π/2 ; π/2]. sin(2π/3) = √3/2, et l’angle de [−π/2 ; π/2] qui a ce sinus est π/3 ≈ 1,047.'},
   {q:'Calcule arcsin(sin(−3)), où −3 est en radians. Arrondis au millième.', lab:'=', ans:3-Math.PI, tol:.002, why:'−3 ∉ [−π/2 ; π/2]. Avec sin(π − <i>y</i>) = sin <i>y</i> et l’imparité : sin(−3) = −sin 3 = −sin(π − 3) = sin(3 − π). Or 3 − π ≈ −0,142 est dans [−π/2 ; π/2], donc arcsin(sin(−3)) = 3 − π ≈ −0,142.'},
   {q:'Laquelle de ces affirmations est vraie pour <b>tout</b> réel <i>x</i> ?', opts:['arcsin(sin <i>x</i>) = <i>x</i>','arcsin(sin <i>x</i>) ∈ [−π/2 ; π/2]','sin(arcsin <i>x</i>) = <i>x</i>','arcsin(sin <i>x</i>) = <i>x</i> ou π − <i>x</i>'], ans:1, why:'arcsin prend ses valeurs dans [−π/2 ; π/2], quel que soit le sinus de départ. arcsin(sin <i>x</i>) = <i>x</i> seulement si <i>x</i> ∈ [−π/2 ; π/2], et sin(arcsin <i>x</i>) n’a de sens que pour <i>x</i> ∈ [−1 ; 1]. La dernière échoue pour <i>x</i> = 2π.'},
 ]},
 {n:'arccos et arctan', r:'arccos et arctan', qs:[
   {q:'Calcule arccos(−√2/2), en radians, arrondi au millième.', lab:'=', ans:3*Math.PI/4, tol:.002, why:'arccos(−<i>y</i>) = π − arccos <i>y</i> : π − π/4 = 3π/4 ≈ 2,356. Contrôle : 3π/4 ∈ [0 ; π] et cos(3π/4) = −√2/2.'},
   {q:'Calcule arctan(−√3), en radians, arrondi au millième.', lab:'=', ans:-Math.PI/3, tol:.002, why:'arctan est impaire et arctan √3 = π/3 : arctan(−√3) = −π/3 ≈ −1,047.'},
   {q:'Calcule arccos(cos(−π/4)), arrondi au millième.', lab:'=', ans:Math.PI/4, tol:.002, why:'cos(−π/4) = √2/2, et l’unique angle de [0 ; π] de cosinus √2/2 est π/4 ≈ 0,785. Ce n’est pas −π/4, qui sort de [0 ; π].'},
   {q:'Que vaut arctan(tan(3π/4)) ?', opts:['3π/4','−π/4','π/4','−3π/4'], ans:1, why:'tan(3π/4) = −1, et l’angle de ]−π/2 ; π/2[ de tangente −1 est −π/4.'},
 ]},
 {n:'L’identité arcsin x + arccos x = π/2', r:'L’identité arcsin x + arccos x = π/2', qs:[
   {q:'Calcule arcsin(0,6) + arccos(0,6), arrondi au millième.', lab:'=', ans:Math.PI/2, tol:.002, why:'Pour tout <i>x</i> ∈ [−1 ; 1], arcsin <i>x</i> + arccos <i>x</i> = π/2 ≈ 1,571. Pas besoin de calculer chaque terme.'},
   {q:'On sait que arcsin <i>a</i> = 0,4. Calcule arccos <i>a</i>, arrondi au millième.', lab:'arccos a =', ans:Math.PI/2-.4, tol:.002, why:'arccos <i>a</i> = π/2 − arcsin <i>a</i> = 1,5708 − 0,4 ≈ 1,171.'},
   {q:'Que vaut arctan(−2) + arctan(−1/2) ?', opts:['π/2','−π/2','0','π'], ans:1, why:'Pour <i>x</i> &gt; 0, arctan <i>x</i> + arctan(1/<i>x</i>) = π/2. Par imparité, arctan(−2) + arctan(−1/2) = −(arctan 2 + arctan(1/2)) = −π/2.'},
   {q:'Résous arcsin <i>x</i> = arccos <i>x</i>. Donne <i>x</i> arrondi au millième.', lab:'x =', ans:Math.SQRT2/2, tol:.002, why:'arcsin <i>x</i> + arccos <i>x</i> = π/2, donc l’égalité impose arcsin <i>x</i> = π/4, soit <i>x</i> = sin(π/4) = √2/2 ≈ 0,707.'},
 ]},
 {n:'Composées croisées', r:'Calculer cos(arcsin x), tan(arccos x) et les composées croisées', qs:[
   {q:'Calcule sin(arccos(−0,8)).', lab:'=', ans:.6, tol:1e-3, why:'θ = arccos(−0,8) ∈ [0 ; π], où sin θ ≥ 0 : sin θ = √(1 − 0,64) = 0,6. Le signe de −0,8 ne change pas celui du sinus.'},
   {q:'Calcule cos(arctan(3/4)).', lab:'=', ans:.8, tol:1e-3, why:'θ = arctan(3/4), cos θ &gt; 0 : 1/cos² θ = 1 + 9/16 = 25/16, donc cos θ = 4/5 = 0,8.'},
   {q:'Calcule tan(arccos(1/3)), arrondi au millième.', lab:'=', ans:2*Math.SQRT2, tol:.002, why:'θ = arccos(1/3) ∈ [0 ; π] : cos θ = 1/3, sin θ = √(1 − 1/9) = √8/3 ≥ 0. tan θ = sin θ/cos θ = √8 = 2√2 ≈ 2,828.'},
   {q:'Que vaut cos(arcsin(−5/13)) ?', opts:['−12/13','12/13','5/12','−5/13'], ans:1, why:'θ = arcsin(−5/13) ∈ [−π/2 ; π/2], où cos θ ≥ 0 : cos θ = √(1 − 25/169) = 12/13, positif même si le sinus est négatif.'},
 ]},
 {n:'Dérivée d’une réciproque', r:'Dériver une fonction réciproque', qs:[
   {q:'<i>f</i>(<i>x</i>) = <i>x</i>³ + <i>x</i> est une bijection strictement croissante de ℝ sur ℝ. Calcule (<i>f</i>⁻¹)′(2).', lab:'(f⁻¹)′(2) =', ans:.25, tol:1e-4, why:'<i>f</i>(1) = 2, donc <i>f</i>⁻¹(2) = 1. <i>f</i>′(<i>x</i>) = 3<i>x</i>² + 1, <i>f</i>′(1) = 4, et (<i>f</i>⁻¹)′(2) = 1/<i>f</i>′(1) = 1/4.'},
   {q:'<i>g</i>(<i>x</i>) = 2<i>x</i> + ln <i>x</i> est une bijection strictement croissante de ]0 ; +∞[ sur ℝ. Calcule (<i>g</i>⁻¹)′(2) (valeur exacte).', lab:'(g⁻¹)′(2) =', ans:1/3, tol:1e-3, show:'1/3', why:'<i>g</i>(1) = 2 + 0 = 2, donc <i>g</i>⁻¹(2) = 1. <i>g</i>′(<i>x</i>) = 2 + 1/<i>x</i>, <i>g</i>′(1) = 3, donc (<i>g</i>⁻¹)′(2) = 1/3.'},
   {q:'<i>h</i>(<i>x</i>) = e<sup><i>x</i></sup> + <i>x</i> est une bijection strictement croissante de ℝ sur ℝ. Calcule (<i>h</i>⁻¹)′(1).', lab:'(h⁻¹)′(1) =', ans:.5, tol:1e-4, why:'<i>h</i>(0) = 1 + 0 = 1, donc <i>h</i>⁻¹(1) = 0. <i>h</i>′(0) = e<sup>0</sup> + 1 = 2, donc (<i>h</i>⁻¹)′(1) = 1/2. Il faut évaluer <i>h</i>′ en <i>h</i>⁻¹(1) = 0, pas en 1.'},
   {q:'<i>f</i>(<i>x</i>) = <i>x</i>³ est bijective sur ℝ. Pourquoi ∛ n’est-elle pas dérivable en 0 ?', opts:['Parce que ∛ n’est pas continue en 0','Parce que <i>x</i>³ n’est pas monotone','Parce que <i>f</i>′(0) = 0 : la tangente horizontale de <i>x</i>³ devient une tangente verticale','Parce que 0 n’a pas d’antécédent'], ans:2, why:'Le théorème exige <i>f</i>′(<i>x</i>₀) ≠ 0. Ici <i>f</i>′(0) = 0 ; par symétrie par rapport à <i>y</i> = <i>x</i>, la pente 0 devient une pente infinie. ∛ est pourtant continue en 0.'},
 ]},
 {n:'Dérivées de arcsin, arccos, arctan', r:'Dérivées de arcsin, arccos, arctan', qs:[
   {q:'Calcule la dérivée de arctan en <i>x</i> = 3.', lab:'dérivée =', ans:.1, tol:1e-4, why:'(arctan <i>x</i>)′ = 1/(1 + <i>x</i>²) = 1/(1 + 9) = 0,1.'},
   {q:'Calcule la dérivée de arccos en <i>x</i> = 0,6.', lab:'dérivée =', ans:-1.25, tol:1e-3, why:'(arccos <i>x</i>)′ = −1/√(1 − <i>x</i>²) = −1/√0,64 = −1/0,8 = −1,25. Négative : arccos décroît.'},
   {q:'Que peut-on dire de arcsin en <i>x</i> = 1 ?', opts:['Sa dérivée vaut 1','Sa dérivée vaut 0','Elle n’est pas définie en 1','Elle n’est pas dérivable en 1 : sa tangente y est verticale'], ans:3, why:'En θ = π/2, sin′(θ) = cos θ = 0 : le théorème de la réciproque ne s’applique pas, et 1/√(1 − <i>x</i>²) n’existe pas en 1. arcsin(1) = π/2 existe, mais la tangente est verticale.'},
 ]},
 {n:'Composées et identités', r:'Dériver une composée avec arctan ou arcsin, et prouver une identité', qs:[
   {q:'Soit <i>f</i>(<i>x</i>) = arctan(<i>x</i>²). Calcule <i>f</i>′(1).', lab:'f′(1) =', ans:1, tol:1e-4, why:'(arctan <i>u</i>)′ = <i>u</i>′/(1 + <i>u</i>²) avec <i>u</i> = <i>x</i>² : <i>f</i>′(<i>x</i>) = 2<i>x</i>/(1 + <i>x</i>⁴). En 1 : 2/2 = 1.'},
   {q:'Soit <i>f</i>(<i>x</i>) = arcsin(2<i>x</i>). Calcule <i>f</i>′(1/4), arrondi au millième.', lab:'f′(1/4) =', ans:4/Math.sqrt(3), tol:.002, why:'<i>f</i>′(<i>x</i>) = 2/√(1 − 4<i>x</i>²). En 1/4 : 2/√(3/4) = 2/(√3/2) = 4/√3 ≈ 2,309.'},
   {q:'Soit <i>f</i>(<i>x</i>) = arctan(ln <i>x</i>) sur ]0 ; +∞[. Calcule <i>f</i>′(e), arrondi au millième.', lab:'f′(e) =', ans:1/(2*Math.E), tol:.002, why:'<i>u</i> = ln <i>x</i>, <i>u</i>′ = 1/<i>x</i> : <i>f</i>′(<i>x</i>) = (1/<i>x</i>)/(1 + ln² <i>x</i>). En e : (1/e)/2 = 1/(2e) ≈ 0,184.'},
   {q:'Sur ]−∞ ; 1[, la fonction <i>g</i>(<i>x</i>) = arctan((1 + <i>x</i>)/(1 − <i>x</i>)) − arctan <i>x</i> a une dérivée nulle. Que vaut-elle ? Arrondis au millième.', lab:'g =', ans:Math.PI/4, tol:.002, why:'Dérivée nulle sur un intervalle : <i>g</i> est constante. On l’évalue en 0 : <i>g</i>(0) = arctan 1 − arctan 0 = π/4 ≈ 0,785.'},
 ]},
 {n:'Primitives en arcsin et arctan', r:'Les primitives qui en découlent', qs:[
   {q:`Calcule ${I('−1',1,`1/(1 + ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.PI/2, tol:.002, why:'[arctan <i>x</i>]<sub>−1</sub><sup>1</sup> = π/4 − (−π/4) = π/2 ≈ 1,571.'},
   {q:`Calcule ${I(0,1,`1/√(4 − ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.PI/6, tol:.002, why:'<i>a</i> = 2 : primitive arcsin(<i>x</i>/2). Entre 0 et 1 : arcsin(1/2) − 0 = π/6 ≈ 0,524.'},
   {q:`Calcule ${I(0,3,`1/(3 + ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.PI/(3*Math.sqrt(3)), tol:.002, why:'<i>a</i> = √3 : primitive (1/√3) arctan(<i>x</i>/√3). En 3 : (1/√3) arctan √3 = (1/√3)(π/3) = π/(3√3) ≈ 0,605.'},
   {q:`Calcule ${I(0,'1/2',`1/√(1 − 4${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.PI/4, tol:.002, why:'Pose <i>u</i> = 2<i>x</i>, d<i>x</i> = d<i>u</i>/2 : primitive (1/2) arcsin(2<i>x</i>). Entre 0 et 1/2 : (1/2) arcsin 1 = (1/2)(π/2) = π/4 ≈ 0,785.'},
   {q:`Calcule ${I(0,1,`(1 + ${x})/(1 + ${x}²)`)}, arrondi au millième.`, lab:'I =', ans:Math.PI/4+Math.log(2)/2, tol:.002, why:'On sépare : 1/(1 + <i>x</i>²) donne arctan <i>x</i>, et <i>x</i>/(1 + <i>x</i>²) donne ½ ln(1 + <i>x</i>²) (forme <i>u</i>′/<i>u</i>). I = π/4 + ½ ln 2 ≈ 0,785 + 0,347 = 1,132.'},
 ]},
];
})();
