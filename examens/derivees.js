/* Déclic — examen de compétence : Dérivées */
(()=>{
EXAMS['derivees']=[
 {n:'Dériver avec les règles', r:'Dériver avec les règles', qs:[
   {q:'On pose <i>f</i>(<i>x</i>) = 2<i>x</i>⁵. Combien vaut <i>f</i>′(1) ?', lab:'f′(1) =', ans:10, why:'<i>f</i>′(<i>x</i>) = 2 · 5<i>x</i>⁴ = 10<i>x</i>⁴, donc <i>f</i>′(1) = 10.'},
   {q:'Quelle est la dérivée de 7<i>x</i> − 3<i>x</i>⁴ ?', opts:['7 − 12<i>x</i>³','7<i>x</i> − 12<i>x</i>³','7 − 3<i>x</i>³','−12<i>x</i>³'], ans:0, why:'On dérive terme à terme : (7<i>x</i>)′ = 7 et (−3<i>x</i>⁴)′ = −3 · 4<i>x</i>³ = −12<i>x</i>³.'},
   {q:'On pose <i>f</i>(<i>x</i>) = <i>x</i>³ − 4<i>x</i>² + 6<i>x</i> − 1. Combien vaut <i>f</i>′(2) ?', lab:'f′(2) =', ans:2, why:'<i>f</i>′(<i>x</i>) = 3<i>x</i>² − 8<i>x</i> + 6, donc <i>f</i>′(2) = 12 − 16 + 6 = 2.'},
   {q:'Quelle est la dérivée de 4/<i>x</i> ?', opts:['4','4/<i>x</i>²','−4/<i>x</i>','−4/<i>x</i>²'], ans:3, why:'4/<i>x</i> = 4<i>x</i>⁻¹, dont la dérivée vaut 4 · (−1)<i>x</i>⁻² = −4/<i>x</i>².'},
   {q:'On pose <i>f</i>(<i>x</i>) = 5/<i>x</i>². Combien vaut <i>f</i>′(2) ?', lab:'f′(2) =', ans:-1.25, tol:.001, why:'<i>f</i>(<i>x</i>) = 5<i>x</i>⁻², donc <i>f</i>′(<i>x</i>) = −10<i>x</i>⁻³ = −10/<i>x</i>³ et <i>f</i>′(2) = −10/8 = −1,25.'},
   {q:'On pose <i>f</i>(<i>x</i>) = 3<i>x</i>² − 1/<i>x</i>. Combien vaut <i>f</i>′(1) ?', lab:'f′(1) =', ans:7, why:'(3<i>x</i>²)′ = 6<i>x</i> et (−<i>x</i>⁻¹)′ = <i>x</i>⁻² = 1/<i>x</i>². Donc <i>f</i>′(1) = 6 + 1 = 7.'},
   {q:'On pose <i>f</i>(<i>x</i>) = 2/<i>x</i>³. Combien vaut <i>f</i>′(1) ?', lab:'f′(1) =', ans:-6, why:'<i>f</i>(<i>x</i>) = 2<i>x</i>⁻³, donc <i>f</i>′(<i>x</i>) = 2 · (−3)<i>x</i>⁻⁴ = −6/<i>x</i>⁴ et <i>f</i>′(1) = −6.'},
   {q:'On pose <i>f</i>(<i>x</i>) = (<i>x</i> + 1)². Combien vaut <i>f</i>′(3) ?', lab:'f′(3) =', ans:8, why:'On développe d’abord : <i>f</i>(<i>x</i>) = <i>x</i>² + 2<i>x</i> + 1, donc <i>f</i>′(<i>x</i>) = 2<i>x</i> + 2 et <i>f</i>′(3) = 8.'},
 ]},
 {n:'Pente et vitesse instantanée', r:'Zoomer sur une pente', qs:[
   {q:'Quelle est la pente de la tangente à <i>f</i>(<i>x</i>) = <i>x</i>² − 3<i>x</i> au point d’abscisse 4 ?', ans:5, why:'<i>f</i>′(<i>x</i>) = 2<i>x</i> − 3, donc <i>f</i>′(4) = 5.'},
   {q:'En quel <i>x</i> la tangente à <i>f</i>(<i>x</i>) = <i>x</i>² + 6<i>x</i> est-elle horizontale ?', lab:'x =', ans:-3, why:'Tangente horizontale : <i>f</i>′(<i>x</i>) = 2<i>x</i> + 6 = 0, donc <i>x</i> = −3.'},
   {q:'Quelle est la pente de la sécante à <i>y</i> = <i>x</i>² entre <i>x</i> = 1 et <i>x</i> = 3 ?', ans:4, why:'(<i>f</i>(3) − <i>f</i>(1)) / (3 − 1) = (9 − 1)/2 = 4. La tangente en 1 aurait la pente 2 : la sécante n’est qu’une approximation.'},
   {q:'Un objet est à la position <i>s</i>(<i>t</i>) = 2<i>t</i>³ mètres à l’instant <i>t</i> secondes. Quelle est sa vitesse instantanée à <i>t</i> = 2 s ?', unit:'m/s', ans:24, why:'La vitesse est la dérivée de la position : <i>s</i>′(<i>t</i>) = 6<i>t</i>², donc <i>s</i>′(2) = 24 m/s.'},
   {q:'Quelle est la pente de la tangente à <i>f</i>(<i>x</i>) = 1/<i>x</i> au point d’abscisse −1 ?', ans:-1, why:'<i>f</i>′(<i>x</i>) = −1/<i>x</i>², donc <i>f</i>′(−1) = −1/1 = −1.'},
   {q:'Le coût de production de <i>q</i> pièces vaut <i>C</i>(<i>q</i>) = <i>q</i>² + 10<i>q</i> francs. Vers <i>q</i> = 20, de combien augmente environ le coût pour une pièce de plus ?', unit:'CHF', ans:50, why:'La dérivée est le taux de variation : <i>C</i>′(<i>q</i>) = 2<i>q</i> + 10, donc <i>C</i>′(20) = 50 CHF par pièce supplémentaire.'},
   {q:'Que signifie <i>f</i>′(<i>a</i>) = 0 ?', opts:['<i>f</i>(<i>a</i>) = 0','La tangente en <i>a</i> est horizontale','La tangente en <i>a</i> est verticale','<i>f</i> a forcément un extremum en <i>a</i>'], ans:1, why:'<i>f</i>′(<i>a</i>) est la pente de la tangente en <i>a</i> : une pente nulle, c’est une tangente horizontale. Il n’y a pas forcément d’extremum (pense à <i>x</i>³ en 0).'},
 ]},
 {n:'Variations et extremums', r:'Étudier les variations avec la dérivée', qs:[
   {q:'Quelle est la valeur du maximum local de <i>f</i>(<i>x</i>) = <i>x</i>³ − 12<i>x</i> ?', ans:16, why:'<i>f</i>′(<i>x</i>) = 3<i>x</i>² − 12 = 3(<i>x</i> − 2)(<i>x</i> + 2). <i>f</i>′ passe de + à − en −2 : maximum local <i>f</i>(−2) = −8 + 24 = 16.'},
   {q:'Quelle est la valeur minimale de <i>f</i>(<i>x</i>) = <i>x</i>² − 8<i>x</i> + 3 ?', ans:-13, why:'<i>f</i>′(<i>x</i>) = 2<i>x</i> − 8 s’annule en 4, passant de − à + : minimum <i>f</i>(4) = 16 − 32 + 3 = −13.'},
   {q:'Quelle est la valeur maximale de <i>f</i>(<i>x</i>) = −<i>x</i>² + 6<i>x</i> − 5 ?', ans:4, why:'<i>f</i>′(<i>x</i>) = −2<i>x</i> + 6 s’annule en 3, passant de + à − : maximum <i>f</i>(3) = −9 + 18 − 5 = 4.'},
   {q:'En quel <i>x</i> la fonction <i>f</i>(<i>x</i>) = 2<i>x</i>³ − 3<i>x</i>² − 12<i>x</i> a-t-elle un minimum local ?', lab:'x =', ans:2, why:'<i>f</i>′(<i>x</i>) = 6<i>x</i>² − 6<i>x</i> − 12 = 6(<i>x</i> − 2)(<i>x</i> + 1). <i>f</i>′ passe de − à + en 2 : minimum local en <i>x</i> = 2 (maximum local en −1).'},
   {q:'Sur quel intervalle <i>f</i>(<i>x</i>) = <i>x</i>³ − 3<i>x</i>² est-elle décroissante ?', opts:[']−∞ ; 0]','[0 ; 2]','[2 ; +∞[','[−2 ; 0]'], ans:1, why:'<i>f</i>′(<i>x</i>) = 3<i>x</i>² − 6<i>x</i> = 3<i>x</i>(<i>x</i> − 2), négative entre ses racines 0 et 2 (par exemple <i>f</i>′(1) = −3).'},
   {q:'La fonction <i>f</i>(<i>x</i>) = <i>x</i>³ + 3<i>x</i>…', opts:['a un maximum en 0','a un minimum en 0','décroît puis croît','croît sur tout ℝ'], ans:3, why:'<i>f</i>′(<i>x</i>) = 3<i>x</i>² + 3 ≥ 3 > 0 pour tout <i>x</i> : elle croît partout et n’a aucun extremum.'},
   {q:'Combien d’extremums locaux a <i>f</i>(<i>x</i>) = <i>x</i>⁴ − 2<i>x</i>² ?', ans:3, why:'<i>f</i>′(<i>x</i>) = 4<i>x</i>³ − 4<i>x</i> = 4<i>x</i>(<i>x</i> − 1)(<i>x</i> + 1) change de signe en −1, 0 et 1 : deux minimums (en ±1) et un maximum (en 0).'},
   {q:'On pose <i>f</i>(<i>x</i>) = <i>x</i>³. On a <i>f</i>′(0) = 0. Que peut-on dire en 0 ?', opts:['<i>f</i> a un minimum en 0','<i>f</i> a un maximum en 0','<i>f</i> n’a pas d’extremum en 0','On ne peut rien calculer'], ans:2, why:'<i>f</i>′(<i>x</i>) = 3<i>x</i>² est positive des deux côtés de 0 : pas de changement de signe, donc pas d’extremum. <i>f</i> croît partout.'},
 ]},
 {n:'Optimiser une grandeur', r:'Optimiser une grandeur', qs:[
   {q:'Avec 36 m de clôture, on entoure un terrain rectangulaire. Quelle est l’aire maximale ?', unit:'m²', ans:81, why:'Largeur <i>x</i>, longueur 18 − <i>x</i>. <i>A</i>(<i>x</i>) = 18<i>x</i> − <i>x</i>², <i>A</i>′(<i>x</i>) = 18 − 2<i>x</i> = 0 pour <i>x</i> = 9. Maximum <i>A</i>(9) = 81 m².'},
   {q:'Deux nombres positifs ont pour somme 12. Quel est leur plus grand produit possible ?', ans:36, why:'<i>P</i>(<i>x</i>) = <i>x</i>(12 − <i>x</i>) = 12<i>x</i> − <i>x</i>². <i>P</i>′(<i>x</i>) = 12 − 2<i>x</i> = 0 pour <i>x</i> = 6, puis <i>P</i> décroît : maximum 36.'},
   {q:'Contre un mur, on clôture un enclos rectangulaire sur 3 côtés avec 40 m de grillage. Quelle est l’aire maximale ?', unit:'m²', ans:200, why:'Deux côtés <i>x</i> perpendiculaires au mur, un côté 40 − 2<i>x</i>. <i>A</i>(<i>x</i>) = 40<i>x</i> − 2<i>x</i>², <i>A</i>′ = 40 − 4<i>x</i> = 0 pour <i>x</i> = 10. <i>A</i>(10) = 10 · 20 = 200 m².'},
   {q:'Une balle lancée vers le haut est à la hauteur <i>h</i>(<i>t</i>) = 20<i>t</i> − 5<i>t</i>² mètres. Quelle hauteur maximale atteint-elle ?', unit:'m', ans:20, why:'<i>h</i>′(<i>t</i>) = 20 − 10<i>t</i> = 0 pour <i>t</i> = 2 s, puis <i>h</i>′ < 0. <i>h</i>(2) = 40 − 20 = 20 m.'},
   {q:'Dans une feuille carrée de 12 cm de côté, on découpe un carré de côté <i>x</i> à chaque coin et on replie pour former une boîte sans couvercle. Quel est le volume maximal ?', unit:'cm³', ans:128, why:'<i>V</i>(<i>x</i>) = <i>x</i>(12 − 2<i>x</i>)² = 4<i>x</i>³ − 48<i>x</i>² + 144<i>x</i>. <i>V</i>′ = 12(<i>x</i> − 2)(<i>x</i> − 6) s’annule en 2 dans ]0 ; 6[, avec un changement de + à −. <i>V</i>(2) = 2 · 8² = 128 cm³.'},
   {q:'Deux nombres ont pour somme 10. Quelle est la plus petite valeur possible de la somme de leurs carrés ?', ans:50, why:'<i>S</i>(<i>x</i>) = <i>x</i>² + (10 − <i>x</i>)² = 2<i>x</i>² − 20<i>x</i> + 100. <i>S</i>′ = 4<i>x</i> − 20 = 0 pour <i>x</i> = 5, de − à + : minimum 25 + 25 = 50.'},
 ]},
];
})();
