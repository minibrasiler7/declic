/* Déclic — examen de compétence : Fonctions hyperboliques */
(()=>{
EXAMS['an2-hyperboliques']=[
 {n:'Définitions de ch et sh', r:'ch et sh', qs:[
   {q:'Calcule ch 1, arrondi au centième.', lab:'ch 1 ≈', ans:1.54, tol:.006, why:'ch 1 = (e + e<sup>−1</sup>)/2 ≈ (2,7183 + 0,3679)/2 ≈ 1,54.'},
   {q:'Calcule sh(−2), arrondi au centième.', lab:'sh(−2) ≈', ans:-3.63, tol:.006, why:'sh(−2) = (e<sup>−2</sup> − e²)/2 ≈ (0,1353 − 7,3891)/2 ≈ −3,63. sh est impaire : sh(−2) = −sh 2.'},
   {q:'Laquelle de ces affirmations est vraie pour tout réel <i>x</i>&nbsp;?', opts:['ch est impaire','sh <i>x</i> ≥ 1','ch <i>x</i> + sh <i>x</i> = e<sup><i>x</i></sup>','ch <i>x</i> − sh <i>x</i> = e<sup><i>x</i></sup>'], ans:2, why:'(e<sup><i>x</i></sup> + e<sup>−<i>x</i></sup>)/2 + (e<sup><i>x</i></sup> − e<sup>−<i>x</i></sup>)/2 = e<sup><i>x</i></sup>. La différence ch <i>x</i> − sh <i>x</i> vaut e<sup>−<i>x</i></sup>, ch est paire et c’est ch (pas sh) qui vaut au moins 1.'},
   {q:'Calcule ch 3 − sh 3, arrondi au millième.', lab:'ch 3 − sh 3 ≈', ans:.050, tol:.0006, why:'ch <i>x</i> − sh <i>x</i> = (e<sup><i>x</i></sup> + e<sup>−<i>x</i></sup> − e<sup><i>x</i></sup> + e<sup>−<i>x</i></sup>)/2 = e<sup>−<i>x</i></sup>, donc ch 3 − sh 3 = e<sup>−3</sup> ≈ 0,050.'},
 ]},
 {n:'Identités hyperboliques', r:'Identités hyperboliques', qs:[
   {q:'On sait que ch <i>x</i> = 13/5 et <i>x</i> &lt; 0. Calcule sh <i>x</i> (valeur décimale).', lab:'sh x =', ans:-2.4, tol:.001, why:'sh² <i>x</i> = ch² <i>x</i> − 1 = 169/25 − 1 = 144/25, donc |sh <i>x</i>| = 12/5. Comme <i>x</i> &lt; 0, sh <i>x</i> &lt; 0 : sh <i>x</i> = −2,4.'},
   {q:'On sait que ch <i>x</i> = 2,6 et sh <i>x</i> = −2,4. Calcule sh 2<i>x</i>.', lab:'sh 2x =', ans:-12.48, tol:.001, why:'sh 2<i>x</i> = 2 sh <i>x</i> ch <i>x</i> = 2 × (−2,4) × 2,6 = −12,48.'},
   {q:'On sait que ch <i>x</i> = 3. Calcule ch 2<i>x</i>.', lab:'ch 2x =', ans:17, tol:.001, why:'sh² <i>x</i> = ch² <i>x</i> − 1 = 8, puis ch 2<i>x</i> = ch² <i>x</i> + sh² <i>x</i> = 9 + 8 = 17.'},
   {q:'Laquelle de ces expressions est égale à ch 2<i>x</i>&nbsp;?', opts:['ch² <i>x</i> − sh² <i>x</i>','2 ch <i>x</i> sh <i>x</i>','ch² <i>x</i> + sh² <i>x</i>','1 − 2 sh² <i>x</i>'], ans:2, why:'En revenant aux exponentielles, ch² <i>x</i> + sh² <i>x</i> = (e<sup>2<i>x</i></sup> + e<sup>−2<i>x</i></sup>)/2 = ch 2<i>x</i>. ch² − sh² vaut 1, et 2 sh ch vaut sh 2<i>x</i>.'},
   {q:'Le point (ch <i>t</i> ; sh <i>t</i>) se trouve, pour tout <i>t</i>, sur la courbe d’équation…', opts:['<i>x</i>² + <i>y</i>² = 1','<i>x</i>² − <i>y</i>² = 1','<i>y</i>² − <i>x</i>² = 1','<i>y</i> = e<sup><i>x</i></sup>'], ans:1, why:'ch² <i>t</i> − sh² <i>t</i> = 1 : les coordonnées vérifient <i>x</i>² − <i>y</i>² = 1, une hyperbole.'},
 ]},
 {n:'Dérivées de ch, sh et th', r:'Dérivées et tangente hyperbolique', qs:[
   {q:'Quelle est la dérivée de ch <i>x</i>&nbsp;?', opts:['−sh <i>x</i>','1/ch² <i>x</i>','ch <i>x</i>','sh <i>x</i>'], ans:3, why:'(ch <i>x</i>)′ = (e<sup><i>x</i></sup> − e<sup>−<i>x</i></sup>)/2 = sh <i>x</i>. Contrairement à cos, pas de signe moins.'},
   {q:'Soit <i>f</i>(<i>x</i>) = sh(3<i>x</i>). Calcule <i>f</i>′(0).', lab:'f′(0) =', ans:3, tol:.001, why:'<i>f</i>′(<i>x</i>) = 3 ch(3<i>x</i>), donc <i>f</i>′(0) = 3 ch 0 = 3.'},
   {q:'Soit <i>f</i>(<i>x</i>) = ch(<i>x</i>²). Calcule <i>f</i>′(1), arrondi au centième.', lab:'f′(1) =', ans:2.35, tol:.006, why:'Règle de la chaîne : <i>f</i>′(<i>x</i>) = 2<i>x</i> sh(<i>x</i>²), donc <i>f</i>′(1) = 2 sh 1 ≈ 2 × 1,1752 ≈ 2,35.'},
   {q:'On sait que th <i>a</i> = 0,8. Que vaut la dérivée de th en <i>a</i>&nbsp;?', lab:'th′(a) =', ans:.36, tol:.001, why:'(th <i>x</i>)′ = 1 − th² <i>x</i>, donc th′(<i>a</i>) = 1 − 0,64 = 0,36.'},
 ]},
 {n:'Valeurs en x = ln a', r:'Calculer ch, sh, th en x = ln a', qs:[
   {q:'Calcule ch(ln 4) (valeur décimale).', lab:'ch(ln 4) =', ans:2.125, tol:.001, why:'e<sup>ln 4</sup> = 4 et e<sup>−ln 4</sup> = 1/4, donc ch(ln 4) = (4 + 1/4)/2 = 17/8 = 2,125.'},
   {q:'Calcule sh(ln 5) (valeur décimale).', lab:'sh(ln 5) =', ans:2.4, tol:.001, why:'sh(ln 5) = (5 − 1/5)/2 = (24/5)/2 = 12/5 = 2,4.'},
   {q:'Calcule th(ln 4), arrondi au millième.', lab:'th(ln 4) =', ans:.882, tol:.0006, show:'15/17 ≈ 0,882', why:'sh(ln 4) = (4 − 1/4)/2 = 15/8 et ch(ln 4) = 17/8, donc th(ln 4) = 15/17 ≈ 0,882. Raccourci : (4² − 1)/(4² + 1) = 15/17.'},
   {q:'Calcule sh(−ln 2) (valeur décimale).', lab:'sh(−ln 2) =', ans:-.75, tol:.001, why:'e<sup>−ln 2</sup> = 1/2 et e<sup>ln 2</sup> = 2, donc sh(−ln 2) = (1/2 − 2)/2 = −3/4 = −0,75.'},
 ]},
 {n:'Équations en ch et sh', r:'Résoudre ch x = a : poser u = eˣ', qs:[
   {q:'Quelle est la solution positive de ch <i>x</i> = 13/12&nbsp;? Arrondis au centième.', lab:'x =', ans:.41, tol:.006, why:'Avec <i>u</i> = e<sup><i>x</i></sup> : <i>u</i> + 1/<i>u</i> = 13/6, soit 6<i>u</i>² − 13<i>u</i> + 6 = 0, Δ = 169 − 144 = 25, <i>u</i> = 3/2 ou 2/3. La solution positive est <i>x</i> = ln 1,5 ≈ 0,41.'},
   {q:'Résous sh <i>x</i> = 15/8. Arrondis au centième.', lab:'x =', ans:1.39, tol:.006, why:'<i>u</i> − 1/<i>u</i> = 15/4 donne 4<i>u</i>² − 15<i>u</i> − 4 = 0, Δ = 225 + 64 = 289, <i>u</i> = (15 ± 17)/8 : 4 ou −1/4. On rejette −1/4 car e<sup><i>x</i></sup> &gt; 0, donc <i>x</i> = ln 4 ≈ 1,39.'},
   {q:'Résous e<sup><i>x</i></sup> − 6e<sup>−<i>x</i></sup> = 1. Arrondis au centième.', lab:'x =', ans:1.10, tol:.006, why:'Avec <i>u</i> = e<sup><i>x</i></sup> et en multipliant par <i>u</i> : <i>u</i>² − <i>u</i> − 6 = 0, donc <i>u</i> = 3 ou <i>u</i> = −2. Seul <i>u</i> = 3 &gt; 0 convient : <i>x</i> = ln 3 ≈ 1,10.'},
   {q:'Combien de solutions réelles l’équation ch <i>x</i> = 1/2 a-t-elle&nbsp;?', opts:['Deux, opposées','Une seule, <i>x</i> = 0','Aucune','Une seule, <i>x</i> = ln 2'], ans:2, why:'ch <i>x</i> ≥ 1 pour tout <i>x</i>. Avec <i>u</i> = e<sup><i>x</i></sup> : <i>u</i>² − <i>u</i> + 1 = 0 a un discriminant 1 − 4 &lt; 0. Aucune solution.'},
 ]},
 {n:'Les fonctions réciproques', r:'Les réciproques', qs:[
   {q:'Calcule argsh(3/4), arrondi au centième.', lab:'argsh(3/4) =', ans:.69, tol:.006, why:'√(9/16 + 1) = √(25/16) = 5/4, donc argsh(3/4) = ln(3/4 + 5/4) = ln 2 ≈ 0,69.'},
   {q:'Calcule argch(13/5), arrondi au centième.', lab:'argch(13/5) =', ans:1.61, tol:.006, why:'√(169/25 − 1) = √(144/25) = 12/5, donc argch(13/5) = ln(13/5 + 12/5) = ln 5 ≈ 1,61.'},
   {q:'Calcule argth(0,5), arrondi au centième.', lab:'argth(0,5) =', ans:.55, tol:.006, why:'argth <i>x</i> = ½ ln((1 + <i>x</i>)/(1 − <i>x</i>)), donc argth 0,5 = ½ ln(1,5/0,5) = ½ ln 3 ≈ 0,55.'},
   {q:'Sur quel ensemble la formule argch <i>x</i> = ln(<i>x</i> + √(<i>x</i>² − 1)) est-elle définie&nbsp;?', opts:['ℝ','[1 ; +∞[',']−1 ; 1[',']0 ; +∞['], ans:1, why:'ch prend ses valeurs dans [1 ; +∞[, et √(<i>x</i>² − 1) demande <i>x</i>² ≥ 1 : argch est définie sur [1 ; +∞[.'},
 ]},
 {n:'Dériver une réciproque', r:'Dériver une réciproque hyperbolique', qs:[
   {q:'Calcule la dérivée de argsh en <i>x</i> = √3.', lab:'dérivée =', ans:.5, tol:.001, why:'(argsh <i>x</i>)′ = 1/√(<i>x</i>² + 1), donc en √3 : 1/√4 = 1/2 = 0,5.'},
   {q:'Calcule la dérivée de argch en <i>x</i> = 3, arrondie au centième.', lab:'dérivée =', ans:.35, tol:.006, why:'(argch <i>x</i>)′ = 1/√(<i>x</i>² − 1), donc en 3 : 1/√8 ≈ 0,35.'},
   {q:'Calcule la dérivée de argth en <i>x</i> = 0,5, arrondie au centième.', lab:'dérivée =', ans:1.33, tol:.006, show:'4/3', why:'Si <i>y</i> = argth <i>x</i>, alors <i>x</i> = th <i>y</i> et (argth)′(<i>x</i>) = 1/(1 − th² <i>y</i>) = 1/(1 − <i>x</i>²). En 0,5 : 1/0,75 = 4/3 ≈ 1,33.'},
   {q:'Quelle est la dérivée de argth <i>x</i> sur ]−1 ; 1[&nbsp;?', opts:['1/(1 + <i>x</i>²)','1/(1 − <i>x</i>²)','1/√(1 − <i>x</i>²)','1/√(<i>x</i>² − 1)'], ans:1, why:'<i>x</i> = th <i>y</i> donne d<i>x</i>/d<i>y</i> = 1 − th² <i>y</i> = 1 − <i>x</i>², donc (argth <i>x</i>)′ = 1/(1 − <i>x</i>²). Les autres sont les dérivées d’arctan, d’arcsin et d’argch.'},
 ]},
];
})();
