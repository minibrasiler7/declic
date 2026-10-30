/* Déclic — examen de compétence : Géométrie analytique */
(()=>{
EXAMS['analytique']=[
 {n:'Distance entre deux points', r:'Distance et équation d’un cercle', qs:[
   {q:'Quelle est la distance entre (−2 ; 3) et (4 ; −5) ?', ans:10, why:'√((4 + 2)² + (−5 − 3)²) = √(36 + 64) = √100 = 10.'},
   {q:'Quelle est la distance entre l’origine et (−7 ; 24) ?', ans:25, why:'√(49 + 576) = √625 = 25.'},
   {q:'Quelle est la distance entre (−3 ; −1) et (2 ; 4) ? (au centième)', ans:7.07, tol:.011, why:'√(5² + 5²) = √50 ≈ 7,07.'},
   {q:'Le point P(<i>x</i> ; 0) est à la même distance de A(1 ; 3) et de B(5 ; 1). Combien vaut <i>x</i> ?', lab:'x =', ans:2, why:'PA² = PB² : (<i>x</i> − 1)² + 9 = (<i>x</i> − 5)² + 1. On développe : −2<i>x</i> + 10 = −10<i>x</i> + 26, donc 8<i>x</i> = 16 et <i>x</i> = 2.'},
 ]},
 {n:'Équation d’un cercle', r:'Le cercle en équation', qs:[
   {q:'Quelle est l’équation du cercle de centre (−3 ; 2) et de rayon 4 ?', opts:['(<i>x</i> − 3)² + (<i>y</i> + 2)² = 16','(<i>x</i> + 3)² + (<i>y</i> − 2)² = 4','(<i>x</i> + 3)² + (<i>y</i> − 2)² = 16','(<i>x</i> − 3)² + (<i>y</i> − 2)² = 16'], ans:2, why:'(<i>x</i> − (−3))² + (<i>y</i> − 2)² = 4², soit (<i>x</i> + 3)² + (<i>y</i> − 2)² = 16. À droite, c’est <i>r</i>², pas <i>r</i>.'},
   {q:'Quel est le rayon du cercle (<i>x</i> − 5)² + (<i>y</i> + 1)² = 49 ?', lab:'r =', ans:7, why:'<i>r</i>² = 49, donc <i>r</i> = 7. Le centre est (5 ; −1).'},
   {q:'Quel est le centre du cercle (<i>x</i> + 1)² + <i>y</i>² = 2 ?', opts:['(1 ; 0)','(−1 ; 0)','(0 ; −1)','(−1 ; 2)'], ans:1, why:'(<i>x</i> + 1)² = (<i>x</i> − (−1))² et <i>y</i>² = (<i>y</i> − 0)² : centre (−1 ; 0), rayon √2.'},
   {q:'Pour quelle valeur <i>k</i> > 0 le point (<i>k</i> ; 1) est-il sur le cercle <i>x</i>² + <i>y</i>² = 10 ?', lab:'k =', ans:3, why:'<i>k</i>² + 1 = 10, donc <i>k</i>² = 9 et <i>k</i> = 3.'},
 ]},
 {n:'Écrire un cercle et situer un point', r:'Distance et équation d’un cercle', qs:[
   {q:'Un cercle a pour centre (2 ; −1) et passe par (5 ; 3). Quel est son rayon ?', lab:'r =', ans:5, why:'Le rayon est la distance du centre au point : √(3² + 4²) = 5. Équation : (<i>x</i> − 2)² + (<i>y</i> + 1)² = 25.'},
   {q:'Un cercle de centre l’origine passe par (−5 ; 12). Quel est son rayon ?', lab:'r =', ans:13, why:'<i>r</i> = √(25 + 144) = √169 = 13.'},
   {q:'Où est le point M(3 ; 4) par rapport au cercle (<i>x</i> − 1)² + (<i>y</i> − 1)² = 10 ?', opts:['À l’intérieur','Sur le cercle','À l’extérieur','Au centre'], ans:2, why:'(3 − 1)² + (4 − 1)² = 4 + 9 = 13 > 10 : M est à l’extérieur.'},
   {q:'Où est l’origine par rapport au cercle (<i>x</i> − 2)² + (<i>y</i> + 1)² = 9 ?', opts:['À l’intérieur','Sur le cercle','À l’extérieur','On ne peut pas savoir'], ans:0, why:'(0 − 2)² + (0 + 1)² = 4 + 1 = 5 < 9 : l’origine est à l’intérieur.'},
 ]},
 {n:'Compléter le carré', r:'Compléter le carré', qs:[
   {q:'Comment s’écrit <i>x</i>² + 6<i>x</i> en complétant le carré ?', opts:['(<i>x</i> + 6)² − 36','(<i>x</i> + 3)² + 9','(<i>x</i> + 3)² − 9','(<i>x</i> − 3)² − 9'], ans:2, why:'La moitié de 6 est 3 : (<i>x</i> + 3)² = <i>x</i>² + 6<i>x</i> + 9, on retire donc 9.'},
   {q:'Quel est le rayon du cercle <i>x</i>² + <i>y</i>² − 8<i>x</i> + 2<i>y</i> + 8 = 0 ?', lab:'r =', ans:3, why:'(<i>x</i> − 4)² − 16 + (<i>y</i> + 1)² − 1 + 8 = 0, donc (<i>x</i> − 4)² + (<i>y</i> + 1)² = 9 et <i>r</i> = 3.'},
   {q:'Quel est le centre du cercle <i>x</i>² + <i>y</i>² + 10<i>x</i> − 4<i>y</i> + 20 = 0 ?', opts:['(5 ; −2)','(−5 ; 2)','(10 ; −4)','(−10 ; 4)'], ans:1, why:'(<i>x</i> + 5)² − 25 + (<i>y</i> − 2)² − 4 + 20 = 0, soit (<i>x</i> + 5)² + (<i>y</i> − 2)² = 9 : centre (−5 ; 2), rayon 3.'},
   {q:'Quel est le rayon du cercle <i>x</i>² + <i>y</i>² − 2<i>x</i> − 6<i>y</i> − 15 = 0 ?', lab:'r =', ans:5, why:'(<i>x</i> − 1)² + (<i>y</i> − 3)² = 1 + 9 + 15 = 25, donc <i>r</i> = 5.'},
   {q:'Quel est le rayon du cercle <i>x</i>² + <i>y</i>² − 12<i>y</i> = 0 ?', lab:'r =', ans:6, why:'<i>y</i>² − 12<i>y</i> = (<i>y</i> − 6)² − 36, donc <i>x</i>² + (<i>y</i> − 6)² = 36 et <i>r</i> = 6. Ce cercle passe par l’origine.'},
   {q:'Quel est le rayon du cercle <i>x</i>² + <i>y</i>² + 2<i>x</i> = 3 ?', lab:'r =', ans:2, why:'<i>x</i>² + 2<i>x</i> = (<i>x</i> + 1)² − 1, donc (<i>x</i> + 1)² + <i>y</i>² = 4 : centre (−1 ; 0), rayon 2.'},
   {q:'Que représente l’équation <i>x</i>² + <i>y</i>² + 4<i>x</i> + 6<i>y</i> + 20 = 0 ?', opts:['Un cercle de rayon √7','Un cercle de centre (2 ; 3)','Aucun point','Un seul point'], ans:2, why:'(<i>x</i> + 2)² + (<i>y</i> + 3)² = 4 + 9 − 20 = −7. Une somme de carrés ne peut pas être négative : aucun point.'},
 ]},
 {n:'Distance d’un point à une droite', r:'Une droite et un cercle', qs:[
   {q:'Quelle est la distance du point (2 ; −1) à la droite 4<i>x</i> − 3<i>y</i> + 4 = 0 ?', ans:3, why:'|4 · 2 − 3 · (−1) + 4| / √(16 + 9) = 15/5 = 3.'},
   {q:'Quelle est la distance de l’origine à la droite 5<i>x</i> + 12<i>y</i> − 26 = 0 ?', ans:2, why:'|0 + 0 − 26| / √(25 + 144) = 26/13 = 2.'},
   {q:'Quel rayon doit avoir un cercle de centre (1 ; 1) pour être tangent à la droite 3<i>x</i> + 4<i>y</i> + 3 = 0 ?', lab:'r =', ans:2, why:'Tangent : le rayon égale la distance du centre à la droite, |3 + 4 + 3| / √(9 + 16) = 10/5 = 2.'},
   {q:'Quelle est la distance du point (−1 ; 3) à la droite <i>y</i> = 2<i>x</i> + 1 ? (au centième)', ans:1.79, tol:.011, why:'On écrit la droite 2<i>x</i> − <i>y</i> + 1 = 0. Distance : |−2 − 3 + 1| / √(4 + 1) = 4/√5 ≈ 1,79.'},
 ]},
 {n:'Une droite et un cercle', r:'Une droite et un cercle', qs:[
   {q:'Quelle est la position de la droite 3<i>x</i> + 4<i>y</i> + 4 = 0 par rapport au cercle (<i>x</i> − 1)² + (<i>y</i> − 2)² = 9 ?', opts:['Elle coupe le cercle en deux points','Elle est tangente au cercle','Elle passe à côté du cercle','Elle passe par le centre'], ans:1, why:'Distance du centre (1 ; 2) : |3 + 8 + 4| / 5 = 15/5 = 3, égale au rayon 3 : tangente.'},
   {q:'Quelle est la position de la droite <i>x</i> + <i>y</i> − 4 = 0 par rapport au cercle <i>x</i>² + <i>y</i>² = 4 ?', opts:['Elle passe à côté du cercle','Elle est tangente au cercle','Elle coupe le cercle en deux points','Elle passe par le centre'], ans:0, why:'Distance de l’origine : |−4| / √2 ≈ 2,83 > 2 = <i>r</i>. La droite ne touche pas le cercle.'},
   {q:'Quelle est la position de la droite <i>x</i> = 2 par rapport au cercle de centre (3 ; 1) et de rayon 2 ?', opts:['Elle passe à côté du cercle','Elle est tangente au cercle','Elle coupe le cercle en deux points','Elle passe par le centre'], ans:2, why:'La droite s’écrit <i>x</i> − 2 = 0. Distance du centre : |3 − 2| / √1 = 1 < 2 : elle coupe le cercle en deux points.'},
   {q:'La droite <i>y</i> = <i>x</i> + 1 coupe le cercle <i>x</i>² + <i>y</i>² = 25 en deux points. Quelle est la plus grande des deux abscisses ?', lab:'x =', ans:3, why:'<i>x</i>² + (<i>x</i> + 1)² = 25 donne 2<i>x</i>² + 2<i>x</i> − 24 = 0, soit <i>x</i>² + <i>x</i> − 12 = (<i>x</i> − 3)(<i>x</i> + 4) = 0. Points (3 ; 4) et (−4 ; −3).'},
   {q:'Quelle est la longueur de la corde que la droite <i>y</i> = 6 découpe dans le cercle <i>x</i>² + <i>y</i>² = 100 ?', ans:16, why:'<i>x</i>² + 36 = 100 donne <i>x</i> = ±8 : les points (−8 ; 6) et (8 ; 6) sont à 16 l’un de l’autre.'},
   {q:'La droite 3<i>x</i> + 4<i>y</i> − 25 = 0 est tangente au cercle <i>x</i>² + <i>y</i>² = 25. Quel est le point de contact ?', opts:['(4 ; 3)','(−3 ; −4)','(3 ; 4)','(5 ; 0)'], ans:2, why:'En O, 3<i>x</i> + 4<i>y</i> − 25 = −25 < 0 : on avance de <i>r</i> = 5 dans le sens de (3 ; 4)/5. T = 5 · (0,6 ; 0,8) = (3 ; 4). Contrôle : 9 + 16 − 25 = 0.'},
 ]},
];
})();
