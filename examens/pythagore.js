/* Déclic — examen de compétence : Théorème de Pythagore */
(()=>{
EXAMS['pythagore']=[
 {n:'Le théorème avec des carrés', r:'a² + b² = c²', qs:[
   {q:'Dans un triangle rectangle, les carrés construits sur les deux côtés de l’angle droit ont pour aires 49 cm² et 576 cm². Quelle est l’aire du carré construit sur l’hypoténuse&nbsp;?', unit:'cm²', ans:625, why:'L’aire du grand carré est la somme des deux autres : 49 + 576 = 625 cm². L’hypoténuse mesure donc 25 cm.'},
   {q:'Dans un triangle rectangle, le carré sur l’hypoténuse a une aire de 100 cm² et le carré sur un des côtés de l’angle droit une aire de 36 cm². Quelle est l’aire du troisième carré&nbsp;?', unit:'cm²', ans:64, why:'100 = 36 + ?, donc le troisième carré a une aire de 100 − 36 = 64 cm² : son côté mesure 8 cm.'},
   {q:'Le triangle KLM est rectangle en K. Quel côté est l’hypoténuse&nbsp;?', opts:['[KL]','[KM]','[LM]','On ne peut pas savoir sans les longueurs'], ans:2, why:'L’hypoténuse est le côté en face de l’angle droit, donc celui qui ne passe pas par K : [LM].'},
 ]},
 {n:'Calculer l’hypoténuse', r:'Calculer un côté avec Pythagore', qs:[
   {q:'Les côtés de l’angle droit mesurent 9 cm et 12 cm. Quelle est la longueur de l’hypoténuse&nbsp;?', unit:'cm', ans:15, why:'9² + 12² = 81 + 144 = 225, et √225 = 15 cm.'},
   {q:'Les côtés de l’angle droit mesurent 20 cm et 21 cm. Quelle est la longueur de l’hypoténuse&nbsp;?', unit:'cm', ans:29, why:'20² + 21² = 400 + 441 = 841, et √841 = 29 cm.'},
   {q:'Les côtés de l’angle droit mesurent 5 cm et 7 cm. Quelle est la longueur de l’hypoténuse, arrondie au centième&nbsp;?', unit:'cm', ans:8.60, tol:0.006, why:'5² + 7² = 25 + 49 = 74, et √74 ≈ 8,60 cm.'},
   {q:'Une plaque rectangulaire mesure 1,2 m sur 0,5 m. Quelle est la longueur de sa diagonale&nbsp;?', unit:'m', ans:1.3, tol:0.001, why:'La diagonale est l’hypoténuse : 1,2² + 0,5² = 1,44 + 0,25 = 1,69, et √1,69 = 1,3 m.'},
   {q:'Un écran mesure 48 cm de large et 36 cm de haut. Quelle est la longueur de sa diagonale&nbsp;?', unit:'cm', ans:60, why:'48² + 36² = 2304 + 1296 = 3600, et √3600 = 60 cm.'},
 ]},
 {n:'Calculer un côté de l’angle droit', r:'Calculer un côté avec Pythagore', qs:[
   {q:'Un triangle est rectangle. Son hypoténuse mesure 25 cm et un côté de l’angle droit 7 cm. Combien mesure l’autre côté&nbsp;?', unit:'cm', ans:24, why:'On soustrait : 25² − 7² = 625 − 49 = 576, et √576 = 24 cm.'},
   {q:'Un triangle est rectangle. Son hypoténuse mesure 17 cm et un côté de l’angle droit 8 cm. Combien mesure l’autre côté&nbsp;?', unit:'cm', ans:15, why:'17² − 8² = 289 − 64 = 225, et √225 = 15 cm.'},
   {q:'Une échelle de 6,5 m est appuyée contre un mur. Son pied est à 2,5 m du mur. À quelle hauteur touche-t-elle le mur&nbsp;?', unit:'m', ans:6, tol:0.001, why:'L’échelle est l’hypoténuse : <i>h</i>² = 6,5² − 2,5² = 42,25 − 6,25 = 36, donc <i>h</i> = 6 m.'},
   {q:'Un cerf-volant est retenu par un fil tendu de 25 m. Il se trouve à la verticale d’un point situé à 15 m de la main. À quelle hauteur au-dessus de la main vole-t-il&nbsp;?', unit:'m', ans:20, why:'Le fil est l’hypoténuse : <i>h</i>² = 25² − 15² = 625 − 225 = 400, donc <i>h</i> = 20 m.'},
   {q:'Un triangle est rectangle. Son hypoténuse mesure 12 cm et un côté de l’angle droit 5 cm. Combien mesure l’autre côté, arrondi au centième&nbsp;?', unit:'cm', ans:10.91, tol:0.006, why:'12² − 5² = 144 − 25 = 119, et √119 ≈ 10,91 cm.'},
   {q:'ABC est rectangle en B, avec AC = 13 et BC = 5. Un élève écrit AB² = 13² + 5². Quelle est son erreur&nbsp;?', opts:['Aucune','Il cherche un côté de l’angle droit : il faut soustraire, AB² = 13² − 5²','Il faut écrire AB = 13 + 5','Il faut écrire AB² = 5² − 13²'], ans:1, why:'[AC] est l’hypoténuse : AC² = AB² + BC², donc AB² = 169 − 25 = 144 et AB = 12. En additionnant, on trouverait un côté plus long que l’hypoténuse.'},
 ]},
 {n:'Prouver qu’un triangle est rectangle', r:'Prouver qu’un triangle est rectangle', qs:[
   {q:'Un triangle a des côtés de 20, 21 et 29 cm. Est-il rectangle&nbsp;?', opts:['Oui','Non','On ne peut pas savoir sans mesurer un angle'], ans:0, why:'Le plus grand côté est 29 : 29² = 841 et 20² + 21² = 400 + 441 = 841. Égalité : il est rectangle (réciproque de Pythagore).'},
   {q:'Un triangle a des côtés de 7, 8 et 11 cm. Est-il rectangle&nbsp;?', opts:['Oui','Non','On ne peut pas savoir sans mesurer un angle'], ans:1, why:'11² = 121 mais 7² + 8² = 49 + 64 = 113. 121 ≠ 113 : il n’est pas rectangle.'},
   {q:'Un triangle a des côtés de 1,5 m, 2 m et 2,5 m. Est-il rectangle&nbsp;?', opts:['Non, car les côtés ne sont pas entiers','Oui','On ne peut pas savoir sans mesurer un angle'], ans:1, why:'2,5² = 6,25 et 1,5² + 2² = 2,25 + 4 = 6,25. Égalité : il est rectangle. Les longueurs n’ont pas besoin d’être entières.'},
   {q:'Dans le triangle DEF, DE = 9, EF = 40 et DF = 41. En quel sommet est l’angle droit&nbsp;?', opts:['En D','En E','En F','Le triangle n’est pas rectangle'], ans:1, why:'41² = 1681 et 9² + 40² = 81 + 1600 = 1681 : le triangle est rectangle. L’angle droit est en face du plus grand côté [DF], donc en E.'},
   {q:'Un triangle a des côtés de 12 cm, 16 cm et <i>x</i> cm, où <i>x</i> est le plus grand côté. Pour quelle valeur de <i>x</i> est-il rectangle&nbsp;?', unit:'cm', ans:20, why:'Il faut <i>x</i>² = 12² + 16² = 144 + 256 = 400, donc <i>x</i> = 20 cm.'},
 ]},
 {n:'Distance dans un repère', r:'Pythagore dans un repère et dans l’espace', qs:[
   {q:'Quelle est la distance entre A(1 ; −2) et B(9 ; 4)&nbsp;?', lab:'AB =', ans:10, why:'Écarts : 9 − 1 = 8 et 4 − (−2) = 6. AB² = 64 + 36 = 100, donc AB = 10.'},
   {q:'Quelle est la distance entre A(−3 ; 1) et B(2 ; 13)&nbsp;?', lab:'AB =', ans:13, why:'Écarts : 2 − (−3) = 5 et 13 − 1 = 12. AB² = 25 + 144 = 169, donc AB = 13.'},
   {q:'Quelle est la distance entre O(0 ; 0) et B(4 ; 5), arrondie au centième&nbsp;?', lab:'OB =', ans:6.40, tol:0.006, why:'OB² = 4² + 5² = 16 + 25 = 41, et √41 ≈ 6,40.'},
   {q:'Que vaut AB² pour A(2 ; 3) et B(−1 ; 7)&nbsp;?', lab:'AB² =', ans:25, why:'Écarts : −1 − 2 = −3 et 7 − 3 = 4. AB² = (−3)² + 4² = 9 + 16 = 25. Un écart négatif donne un carré positif.'},
   {q:'Quelle est la distance entre A(−4 ; −3) et l’origine O(0 ; 0)&nbsp;?', lab:'OA =', ans:5, why:'OA² = (−4)² + (−3)² = 16 + 9 = 25, donc OA = 5.'},
 ]},
 {n:'Dans l’espace et pour les aires', r:'Pythagore dans un repère et dans l’espace', qs:[
   {q:'Quelle est la grande diagonale d’un pavé de 3 cm × 4 cm × 12 cm&nbsp;?', unit:'cm', ans:13, why:'Diagonale du sol : 3² + 4² = 25. Puis D² = 25 + 12² = 25 + 144 = 169, donc D = 13 cm.'},
   {q:'Quelle est la grande diagonale d’un pavé de 1 m × 2 m × 2 m&nbsp;?', unit:'m', ans:3, why:'D² = 1² + 2² + 2² = 1 + 4 + 4 = 9, donc D = 3 m.'},
   {q:'Quelle est la grande diagonale d’un cube de 5 cm d’arête, arrondie au centième&nbsp;?', unit:'cm', ans:8.66, tol:0.006, why:'D² = 5² + 5² + 5² = 75, et √75 ≈ 8,66 cm.'},
   {q:'Une baguette rigide de 60 cm peut-elle entrer dans une boîte de 30 cm × 40 cm × 20 cm (couvercle fermé)&nbsp;?', opts:['Oui, en diagonale du fond','Oui, en grande diagonale','Non, la plus grande longueur possible est d’environ 53,9 cm','Oui, debout'], ans:2, why:'Diagonale du fond : √(30² + 40²) = 50 cm. Grande diagonale : √(50² + 20²) = √2900 ≈ 53,9 cm < 60 cm. Elle ne rentre pas.'},
   {q:'Un triangle rectangle a une hypoténuse de 13 cm et un côté de l’angle droit de 5 cm. Quelle est son aire&nbsp;?', unit:'cm²', ans:30, why:'L’autre côté vaut √(169 − 25) = √144 = 12 cm. Aire = 5 × 12 ÷ 2 = 30 cm².'},
 ]},
];
})();
