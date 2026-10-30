/* Déclic — examen de compétence : Fonctions et graphes */
(()=>{
EXAMS['graphes']=[
 {n:'Lire la forme a(x − h)² + k', r:'Lire y = a(x − h)² + k', qs:[
   {q:'Quel est le sommet de la parabole <i>y</i> = 3(<i>x</i> − 4)² − 7 ?', opts:['(−4 ; −7)','(4 ; −7)','(4 ; 7)','(−7 ; 4)'], ans:1, why:'La forme <i>a</i>(<i>x</i> − <i>h</i>)² + <i>k</i> donne <i>h</i> = 4 et <i>k</i> = −7 : sommet (4 ; −7).'},
   {q:'Quelle est l’abscisse du sommet de <i>y</i> = −(<i>x</i> + 5)² + 2 ?', lab:'h =', ans:-5, why:'(<i>x</i> + 5)² = (<i>x</i> − (−5))², donc <i>h</i> = −5. Le sommet est (−5 ; 2).'},
   {q:'Par rapport à <i>y</i> = <i>x</i>², la parabole <i>y</i> = 0,5(<i>x</i> − 1)² + 3 est…', opts:['aplatie, ouverte vers le haut, de sommet (1 ; 3)','étirée, ouverte vers le haut, de sommet (−1 ; 3)','aplatie, ouverte vers le bas, de sommet (1 ; 3)','étirée, ouverte vers le haut, de sommet (1 ; 3)'], ans:0, why:'|<i>a</i>| = 0,5 < 1 aplatit, <i>a</i> > 0 garde l’ouverture vers le haut, et <i>h</i> = 1, <i>k</i> = 3.'},
   {q:'Quel est le sommet de <i>y</i> = 2(3 − <i>x</i>)² + 1 ?', opts:['(−3 ; 1)','(3 ; 2)','(3 ; 1)','(−3 ; 2)'], ans:2, why:'(3 − <i>x</i>)² = (<i>x</i> − 3)², car un nombre et son opposé ont le même carré. Donc <i>h</i> = 3, <i>k</i> = 1.'},
   {q:'Une parabole a pour sommet (−1 ; 4) et passe par (1 ; −4). Combien vaut <i>a</i> dans <i>y</i> = <i>a</i>(<i>x</i> − <i>h</i>)² + <i>k</i> ?', lab:'a =', ans:-2, why:'<i>y</i> = <i>a</i>(<i>x</i> + 1)² + 4. Le point (1 ; −4) donne −4 = 4<i>a</i> + 4, donc <i>a</i> = −2.'},
   {q:'Une parabole a pour sommet (3 ; −2) et passe par (5 ; 6). En quelle ordonnée coupe-t-elle l’axe vertical ?', lab:'y =', ans:16, why:'<i>y</i> = <i>a</i>(<i>x</i> − 3)² − 2 et 6 = 4<i>a</i> − 2 donnent <i>a</i> = 2. En <i>x</i> = 0 : 2 · 9 − 2 = 16.'},
 ]},
 {n:'Décaler, étirer, retourner', r:'y = a·(x − h)² + k', qs:[
   {q:'Par rapport à <i>y</i> = <i>x</i>², le graphe de <i>y</i> = (<i>x</i> − 2)² est…', opts:['décalé de 2 vers la gauche','décalé de 2 vers le bas','décalé de 2 vers la droite','étiré d’un facteur 2'], ans:2, why:'Il faut <i>x</i> = 2 pour retrouver 0² : tout arrive 2 unités plus tard, donc à droite.'},
   {q:'Le point (1 ; 1) de <i>y</i> = <i>x</i>² devient quel point de <i>y</i> = (<i>x</i> + 4)² + 3 ?', opts:['(5 ; 4)','(−3 ; 4)','(−3 ; −2)','(5 ; −2)'], ans:1, why:'Le graphe est décalé de 4 vers la gauche et de 3 vers le haut : (1 − 4 ; 1 + 3) = (−3 ; 4). Contrôle : (−3 + 4)² + 3 = 4.'},
   {q:'Quelle est la plus grande valeur prise par <i>y</i> = −<i>x</i>² + 1 ?', ans:1, why:'<i>a</i> = −1 retourne la parabole : elle s’ouvre vers le bas et son sommet (0 ; 1) est un maximum.'},
   {q:'Quelle est la plus petite valeur prise par <i>y</i> = 5(<i>x</i> + 2)² − 9 ?', ans:-9, why:'<i>a</i> = 5 > 0 : la parabole s’ouvre vers le haut et son sommet (−2 ; −9) est un minimum, de valeur −9.'},
 ]},
 {n:'Enchaîner des transformations', r:'Enchaîner des transformations', qs:[
   {q:'À partir de <i>y</i> = <i>x</i>², on décale de 2 vers la droite, on étire par 4, puis on monte de 1. Quelle fonction obtient-on ?', opts:['4(<i>x</i> + 2)² + 1','4(<i>x</i> − 2)² + 4','(4<i>x</i> − 2)² + 1','4(<i>x</i> − 2)² + 1'], ans:3, why:'(<i>x</i> − 2)², puis 4(<i>x</i> − 2)², puis 4(<i>x</i> − 2)² + 1. On monte après l’étirement, donc le 1 n’est pas multiplié.'},
   {q:'À partir de <i>y</i> = <i>x</i>², on descend de 2, <b>puis</b> on étire verticalement par 3. Combien vaut la nouvelle fonction en <i>x</i> = 0 ?', ans:-6, why:'On obtient 3(<i>x</i>² − 2) = 3<i>x</i>² − 6 : l’étirement multiplie aussi le décalage fait avant lui. En 0 : −6.'},
   {q:'Quel est le plus grand zéro de <i>g</i>(<i>x</i>) = 2(<i>x</i> − 1)² − 18 ?', lab:'x =', ans:4, why:'(<i>x</i> − 1)² = 9, donc <i>x</i> − 1 = 3 ou <i>x</i> − 1 = −3 : <i>x</i> = 4 ou <i>x</i> = −2.'},
   {q:'Quel est le plus petit zéro de <i>g</i>(<i>x</i>) = −(<i>x</i> + 2)² + 5 ? (au centième)', lab:'x =', ans:-4.24, tol:.011, why:'(<i>x</i> + 2)² = 5, donc <i>x</i> = −2 ± √5. Le plus petit est −2 − √5 ≈ −4,24.'},
   {q:'Combien de zéros a la fonction 3(<i>x</i> − 4)² + 2 ?', opts:['Aucun','Un','Deux','Une infinité'], ans:0, why:'Il faudrait (<i>x</i> − 4)² = −2/3, or un carré n’est jamais négatif. La parabole a son minimum 2 au-dessus de l’axe.'},
   {q:'À partir de <i>f</i>(<i>x</i>) = <i>x</i>³, on décale de 1 vers la gauche, puis de 2 vers le haut. Combien vaut la fonction obtenue en <i>x</i> = 1 ?', ans:10, why:'On obtient (<i>x</i> + 1)³ + 2. En 1 : 2³ + 2 = 10.'},
 ]},
 {n:'Fonctions paires et impaires', r:'Étudier la parité', qs:[
   {q:'La fonction <i>f</i>(<i>x</i>) = <i>x</i>⁴ − 3<i>x</i>² est…', opts:['paire','impaire','ni paire ni impaire','paire et impaire'], ans:0, why:'<i>f</i>(−<i>x</i>) = (−<i>x</i>)⁴ − 3(−<i>x</i>)² = <i>x</i>⁴ − 3<i>x</i>² = <i>f</i>(<i>x</i>) : les puissances paires perdent le signe moins.'},
   {q:'La fonction <i>f</i>(<i>x</i>) = 2<i>x</i>³ + <i>x</i> est…', opts:['paire','ni paire ni impaire','impaire','constante'], ans:2, why:'<i>f</i>(−<i>x</i>) = −2<i>x</i>³ − <i>x</i> = −(2<i>x</i>³ + <i>x</i>) = −<i>f</i>(<i>x</i>).'},
   {q:'La fonction <i>f</i>(<i>x</i>) = <i>x</i>³ + 1 est…', opts:['paire','impaire','ni paire ni impaire','paire car elle contient une constante'], ans:2, why:'<i>f</i>(1) = 2 et <i>f</i>(−1) = 0. On n’a ni <i>f</i>(−1) = <i>f</i>(1), ni <i>f</i>(−1) = −<i>f</i>(1) : un contre-exemple suffit.'},
   {q:'La fonction <i>f</i>(<i>x</i>) = (<i>x</i> − 1)² est…', opts:['ni paire ni impaire','paire car c’est un carré','impaire','paire et impaire'], ans:0, why:'<i>f</i>(1) = 0 et <i>f</i>(−1) = 4. Ni égaux, ni opposés : elle n’est ni paire ni impaire. Son axe de symétrie est <i>x</i> = 1, pas l’axe vertical.'},
   {q:'<i>f</i> est impaire et <i>f</i>(3) = 7. Combien vaut <i>f</i>(−3) ?', ans:-7, why:'Impaire : <i>f</i>(−<i>x</i>) = −<i>f</i>(<i>x</i>), donc <i>f</i>(−3) = −7.'},
   {q:'<i>f</i> est paire et <i>f</i>(2) = −4. Combien vaut <i>f</i>(−2) ?', ans:-4, why:'Paire : <i>f</i>(−<i>x</i>) = <i>f</i>(<i>x</i>), donc <i>f</i>(−2) = <i>f</i>(2) = −4.'},
 ]},
 {n:'Composer deux fonctions', r:'Composer et inverser', qs:[
   {q:'On pose <i>f</i>(<i>x</i>) = <i>x</i> + 4 et <i>g</i>(<i>x</i>) = 3<i>x</i>². Combien vaut (<i>g</i>∘<i>f</i>)(1) ?', ans:75, why:'<i>f</i>(1) = 5, puis <i>g</i>(5) = 3 · 25 = 75.'},
   {q:'On pose <i>f</i>(<i>x</i>) = 2<i>x</i> − 1 et <i>g</i>(<i>x</i>) = <i>x</i>² + 1. Combien vaut (<i>f</i>∘<i>g</i>)(3) ?', ans:19, why:'D’abord <i>g</i> : <i>g</i>(3) = 10. Puis <i>f</i>(10) = 19.'},
   {q:'On pose <i>f</i>(<i>x</i>) = 3<i>x</i> − 1. Combien vaut (<i>f</i>∘<i>f</i>)(2) ?', ans:14, why:'<i>f</i>(2) = 5, puis <i>f</i>(5) = 14.'},
   {q:'On pose <i>f</i>(<i>x</i>) = <i>x</i> − 3 et <i>g</i>(<i>x</i>) = <i>x</i>². Que vaut (<i>g</i>∘<i>f</i>)(<i>x</i>) ?', opts:['<i>x</i>² − 3','(<i>x</i> − 3)²','<i>x</i>² − 9','<i>x</i>³ − 3<i>x</i>²'], ans:1, why:'(<i>g</i>∘<i>f</i>)(<i>x</i>) = <i>g</i>(<i>f</i>(<i>x</i>)) = <i>g</i>(<i>x</i> − 3) = (<i>x</i> − 3)². <i>x</i>² − 3 serait <i>f</i>∘<i>g</i>.'},
 ]},
 {n:'Trouver une réciproque', r:'Composer et inverser', qs:[
   {q:'On pose <i>f</i>(<i>x</i>) = 5<i>x</i> + 2. Combien vaut <i>f</i>⁻¹(17) ?', ans:3, why:'<i>y</i> = 5<i>x</i> + 2 donne <i>x</i> = (<i>y</i> − 2)/5, donc <i>f</i>⁻¹(17) = 15/5 = 3. Contrôle : <i>f</i>(3) = 17.'},
   {q:'On pose <i>f</i>(<i>x</i>) = (<i>x</i> − 4)/3. Combien vaut <i>f</i>⁻¹(2) ?', ans:10, why:'<i>y</i> = (<i>x</i> − 4)/3 donne <i>x</i> = 3<i>y</i> + 4, donc <i>f</i>⁻¹(2) = 10. Contrôle : (10 − 4)/3 = 2.'},
   {q:'On pose <i>f</i>(<i>x</i>) = 7 − 2<i>x</i>. Combien vaut <i>f</i>⁻¹(1) ?', ans:3, why:'<i>y</i> = 7 − 2<i>x</i> donne <i>x</i> = (7 − <i>y</i>)/2, donc <i>f</i>⁻¹(1) = 3. Contrôle : 7 − 6 = 1.'},
   {q:'On pose <i>f</i>(<i>x</i>) = 2<i>x</i> + 6. Quelle est la réciproque ?', opts:['<i>f</i>⁻¹(<i>y</i>) = 1/(2<i>y</i> + 6)','<i>f</i>⁻¹(<i>y</i>) = 2<i>y</i> − 6','<i>f</i>⁻¹(<i>y</i>) = (<i>y</i> − 6)/2','<i>f</i>⁻¹(<i>y</i>) = <i>y</i>/2 + 6'], ans:2, why:'On résout <i>y</i> = 2<i>x</i> + 6 en <i>x</i> : on retire 6, puis on divise par 2. La réciproque n’est pas l’inverse 1/<i>f</i>.'},
 ]},
];
})();
