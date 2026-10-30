/* Déclic — examen de compétence : Intégrales */
(()=>{
EXAMS['integrales']=[
 {n:'Aire sous une courbe', r:'Des rectangles de plus en plus fins', qs:[
   {q:'Combien vaut ∫₀⁴ 3 d<i>x</i> ?', ans:12, why:'Sous la droite horizontale <i>y</i> = 3, le domaine est un rectangle de base 4 et de hauteur 3 : aire 12.'},
   {q:'Combien vaut ∫₀² (<i>x</i> + 1) d<i>x</i> ?', ans:4, why:'Le domaine est un trapèze de bases <i>f</i>(0) = 1 et <i>f</i>(2) = 3, de largeur 2 : (1 + 3) × 2 ÷ 2 = 4.'},
   {q:'Combien vaut ∫₀⁴ (4 − <i>x</i>) d<i>x</i> ?', ans:8, why:'Le domaine est un triangle de base 4 et de hauteur <i>f</i>(0) = 4 : 4 × 4 ÷ 2 = 8.'},
   {q:'On approche l’aire sous <i>y</i> = <i>x</i>² entre 0 et 2 par 4 rectangles de largeur 0,5, dont la hauteur est prise au bord gauche. Que vaut cette somme ?', ans:1.75, tol:.001, why:'Hauteurs <i>f</i>(0), <i>f</i>(0,5), <i>f</i>(1), <i>f</i>(1,5) = 0 ; 0,25 ; 1 ; 2,25. Somme : 0,5 × 3,5 = 1,75, en dessous de l’aire exacte 8/3 ≈ 2,67.'},
 ]},
 {n:'Trouver une primitive', r:'Trouver une primitive', qs:[
   {q:'Quelles sont les primitives de 4<i>x</i>³ ?', opts:['12<i>x</i>² + <i>C</i>','<i>x</i>⁴ + <i>C</i>','4<i>x</i>⁴ + <i>C</i>','<i>x</i>⁴/4 + <i>C</i>'], ans:1, why:'4 · <i>x</i>⁴/4 = <i>x</i>⁴. Contrôle : (<i>x</i>⁴)′ = 4<i>x</i>³.'},
   {q:'Quelles sont les primitives de <i>x</i>² + <i>x</i> ?', opts:['2<i>x</i> + 1 + <i>C</i>','<i>x</i>³ + <i>x</i>² + <i>C</i>','<i>x</i>³/3 + <i>x</i>²/2 + <i>C</i>','<i>x</i>³/2 + <i>x</i>²/3 + <i>C</i>'], ans:2, why:'On augmente chaque exposant de 1 et on divise par le nouvel exposant : <i>x</i>³/3 et <i>x</i>²/2.'},
   {q:'Quelles sont les primitives de 1/<i>x</i>² ?', opts:['−1/<i>x</i> + <i>C</i>','1/<i>x</i> + <i>C</i>','−2/<i>x</i>³ + <i>C</i>','1/(3<i>x</i>³) + <i>C</i>'], ans:0, why:'1/<i>x</i>² = <i>x</i>⁻² → <i>x</i>⁻¹/(−1) = −1/<i>x</i>. Contrôle : (−<i>x</i>⁻¹)′ = <i>x</i>⁻². −2/<i>x</i>³ est la dérivée, pas la primitive.'},
   {q:'Laquelle de ces fonctions n’est <b>pas</b> une primitive de 2<i>x</i> ?', opts:['<i>x</i>² + 5','<i>x</i>² − 3','2<i>x</i>²','<i>x</i>²'], ans:2, why:'(2<i>x</i>²)′ = 4<i>x</i> ≠ 2<i>x</i>. Les autres diffèrent de <i>x</i>² par une constante : leur dérivée vaut 2<i>x</i>.'},
   {q:'<i>F</i> est la primitive de 8<i>x</i> − 3 telle que <i>F</i>(1) = 5. Combien vaut la constante <i>C</i> dans <i>F</i>(<i>x</i>) = 4<i>x</i>² − 3<i>x</i> + <i>C</i> ?', lab:'C =', ans:4, why:'<i>F</i>(1) = 4 − 3 + <i>C</i> = 1 + <i>C</i> = 5, donc <i>C</i> = 4.'},
   {q:'<i>F</i> est la primitive de 6<i>x</i>² + 2 telle que <i>F</i>(0) = −1. Combien vaut <i>F</i>(1) ?', ans:3, why:'<i>F</i>(<i>x</i>) = 2<i>x</i>³ + 2<i>x</i> + <i>C</i> et <i>F</i>(0) = <i>C</i> = −1. Donc <i>F</i>(1) = 2 + 2 − 1 = 3.'},
   {q:'<i>F</i>(<i>x</i>) = <i>x</i>⁴ − <i>x</i> est une primitive de quelle fonction ?', opts:['<i>x</i>⁵/5 − <i>x</i>²/2','4<i>x</i>³ − 1','4<i>x</i>³ − <i>x</i>','4<i>x</i>³'], ans:1, why:'<i>F</i> est une primitive de <i>f</i> si <i>F</i>′ = <i>f</i> : <i>F</i>′(<i>x</i>) = 4<i>x</i>³ − 1.'},
 ]},
 {n:'Calculer une intégrale', r:'Calculer une intégrale avec une primitive', qs:[
   {q:'Combien vaut ∫₀² (3<i>x</i>² + 1) d<i>x</i> ?', ans:10, why:'Primitive <i>x</i>³ + <i>x</i>. [<i>x</i>³ + <i>x</i>]₀² = (8 + 2) − 0 = 10.'},
   {q:'Combien vaut ∫₁⁴ 2<i>x</i> d<i>x</i> ?', ans:15, why:'Primitive <i>x</i>². 4² − 1² = 16 − 1 = 15.'},
   {q:'Combien vaut ∫₋₁¹ <i>x</i>³ d<i>x</i> ?', ans:0, why:'Primitive <i>x</i>⁴/4. 1/4 − 1/4 = 0 : la partie négative compense exactement la partie positive.'},
   {q:'Combien vaut ∫₁² 1/<i>x</i>² d<i>x</i> ?', ans:0.5, tol:.001, why:'Primitive −1/<i>x</i>. (−1/2) − (−1) = 1/2.'},
   {q:'Combien vaut ∫₀¹ (<i>x</i> + 1)² d<i>x</i> ? (fraction ou au centième)', ans:7/3, tol:.006, show:'7/3 ≈ 2,33', why:'On développe : <i>x</i>² + 2<i>x</i> + 1, de primitive <i>x</i>³/3 + <i>x</i>² + <i>x</i>. En 1 : 1/3 + 1 + 1 = 7/3 ; en 0 : 0.'},
   {q:'Combien vaut ∫₀³ (<i>x</i>² − 2<i>x</i>) d<i>x</i> ?', ans:0, why:'Primitive <i>x</i>³/3 − <i>x</i>². En 3 : 9 − 9 = 0 ; en 0 : 0. La fonction est négative sur ]0 ; 2[ et positive après : les deux parts se compensent.'},
   {q:'Un mobile roule à la vitesse <i>v</i>(<i>t</i>) = 3<i>t</i>² + 2 (m/s). Quelle distance parcourt-il entre <i>t</i> = 0 et <i>t</i> = 2 s ?', unit:'m', ans:12, why:'Distance = ∫₀² (3<i>t</i>² + 2) d<i>t</i> = [<i>t</i>³ + 2<i>t</i>]₀² = 8 + 4 = 12 m.'},
   {q:'Un cycliste roule à la vitesse <i>v</i>(<i>t</i>) = 10 + 2<i>t</i> (m/s). Au bout de combien de secondes a-t-il parcouru 24 m depuis <i>t</i> = 0 ?', unit:'s', ans:2, why:'Distance <i>F</i>(<i>t</i>) − <i>F</i>(0) = 10<i>t</i> + <i>t</i>² = 24, soit <i>t</i>² + 10<i>t</i> − 24 = 0 = (<i>t</i> + 12)(<i>t</i> − 2). La solution positive est <i>t</i> = 2 s.'},
 ]},
 {n:'Aire entre deux courbes et valeur moyenne', r:'Aire entre deux courbes, moyenne, volume', qs:[
   {q:'Quelle est l’aire comprise entre la parabole <i>y</i> = 4 − <i>x</i>² et l’axe des <i>x</i> ? (au centième)', ans:32/3, tol:.006, show:'32/3 ≈ 10,67', why:'Les zéros sont ±2. ∫₋₂² (4 − <i>x</i>²) d<i>x</i> = [4<i>x</i> − <i>x</i>³/3]₋₂² = (8 − 8/3) − (−8 + 8/3) = 32/3 ≈ 10,67.'},
   {q:'Quelle est l’aire comprise entre <i>y</i> = 3<i>x</i> et <i>y</i> = <i>x</i>² ?', ans:4.5, tol:.001, why:'<i>x</i>² = 3<i>x</i> donne <i>x</i> = 0 ou 3, et 3<i>x</i> ≥ <i>x</i>² entre les deux. ∫₀³ (3<i>x</i> − <i>x</i>²) d<i>x</i> = 27/2 − 9 = 4,5.'},
   {q:'Quelle est l’aire comprise entre <i>y</i> = <i>x</i>² et <i>y</i> = 2 − <i>x</i>² ? (au centième)', ans:8/3, tol:.006, show:'8/3 ≈ 2,67', why:'<i>x</i>² = 2 − <i>x</i>² donne <i>x</i> = ±1. Haut moins bas : ∫₋₁¹ (2 − 2<i>x</i>²) d<i>x</i> = [2<i>x</i> − 2<i>x</i>³/3]₋₁¹ = 4/3 + 4/3 = 8/3.'},
   {q:'Quelle est la valeur moyenne de <i>x</i>² sur [0 ; 3] ?', ans:3, why:'∫₀³ <i>x</i>² d<i>x</i> = 27/3 = 9, puis on divise par la longueur 3 : 9/3 = 3.'},
   {q:'Un train freine avec la vitesse <i>v</i>(<i>t</i>) = 30 − 6<i>t</i> (m/s) entre <i>t</i> = 0 et <i>t</i> = 5 s. Quelle est sa vitesse moyenne sur ce freinage ?', unit:'m/s', ans:15, why:'∫₀⁵ (30 − 6<i>t</i>) d<i>t</i> = [30<i>t</i> − 3<i>t</i>²]₀⁵ = 150 − 75 = 75 m, puis 75 ÷ 5 = 15 m/s.'},
   {q:'Quelle est la valeur moyenne de 2<i>x</i> + 1 sur [1 ; 5] ?', ans:7, why:'∫₁⁵ (2<i>x</i> + 1) d<i>x</i> = [<i>x</i>² + <i>x</i>]₁⁵ = 30 − 2 = 28, puis 28 ÷ 4 = 7.'},
 ]},
 {n:'Volume de révolution', r:'Aire entre deux courbes, moyenne, volume', qs:[
   {q:'On fait tourner <i>y</i> = <i>x</i>, pour <i>x</i> entre 0 et 3, autour de l’axe des <i>x</i>. Quel volume obtient-on ? (au centième)', ans:9*Math.PI, tol:.011, show:'9π ≈ 28,27', why:'<i>V</i> = π∫₀³ <i>x</i>² d<i>x</i> = π · 27/3 = 9π ≈ 28,27. C’est un cône de rayon 3 et de hauteur 3.'},
   {q:'On fait tourner <i>y</i> = √<i>x</i>, pour <i>x</i> entre 0 et 4, autour de l’axe des <i>x</i>. Quel volume obtient-on ? (au centième)', ans:8*Math.PI, tol:.011, show:'8π ≈ 25,13', why:'<i>f</i>(<i>x</i>)² = <i>x</i>, donc <i>V</i> = π∫₀⁴ <i>x</i> d<i>x</i> = π · 16/2 = 8π ≈ 25,13.'},
   {q:'On fait tourner <i>y</i> = <i>x</i>², pour <i>x</i> entre 0 et 1, autour de l’axe des <i>x</i>. Quel volume obtient-on ? (au centième)', ans:Math.PI/5, tol:.006, show:'π/5 ≈ 0,63', why:'<i>f</i>(<i>x</i>)² = <i>x</i>⁴, donc <i>V</i> = π∫₀¹ <i>x</i>⁴ d<i>x</i> = π · [<i>x</i>⁵/5]₀¹ = π/5 ≈ 0,63.'},
   {q:'Le domaine entre <i>y</i> = 2 et <i>y</i> = 1, pour <i>x</i> entre 0 et 1, tourne autour de l’axe des <i>x</i>. Quel calcul donne le volume ?', opts:['π∫₀¹ (2 − 1)² d<i>x</i> = π','π∫₀¹ (2² − 1²) d<i>x</i> = 3π','∫₀¹ (2 − 1) d<i>x</i> = 1','π∫₀¹ 2² d<i>x</i> = 4π'], ans:1, why:'Chaque tranche est un anneau de rayons 2 et 1 : <i>V</i> = π∫(<i>R</i>² − <i>r</i>²) d<i>x</i> = 3π. On soustrait les carrés, pas le carré de la différence.'},
 ]},
];
})();
