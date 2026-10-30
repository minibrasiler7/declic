/* Déclic — examen de compétence : Aires et périmètres */
(()=>{
EXAMS['aires']=[
 {n:'Rectangle et parallélogramme', r:'Pencher sans changer l’aire', qs:[
   {q:'Un parallélogramme a une base de 9 cm et une hauteur de 5 cm. Quelle est son aire&nbsp;?', unit:'cm²', ans:45, why:'Aire = base × hauteur = 9 × 5 = 45 cm², comme le rectangle qu’on obtient en recollant le triangle coupé.'},
   {q:'Un parallélogramme a des côtés de 8 cm et 5 cm. La hauteur relative au côté de 8 cm mesure 4 cm. Quelle est son aire&nbsp;?', unit:'cm²', ans:32, why:'Aire = base × hauteur = 8 × 4 = 32 cm². Le côté penché de 5 cm n’est pas la hauteur : 8 × 5 = 40 serait faux.'},
   {q:'Un parallélogramme a une aire de 54 cm² et une base de 9 cm. Quelle est sa hauteur&nbsp;?', unit:'cm', ans:6, why:'9 × <i>h</i> = 54, donc <i>h</i> = 54 ÷ 9 = 6 cm.'},
   {q:'Un rectangle mesure 7,5 m sur 4 m. Quelle est son aire&nbsp;?', unit:'m²', ans:30, tol:0.001, why:'7,5 × 4 = 30 m².'},
 ]},
 {n:'Triangles et trapèzes', r:'Choisir la bonne formule', qs:[
   {q:'Un triangle a une base de 12 cm et une hauteur de 7 cm. Quelle est son aire&nbsp;?', unit:'cm²', ans:42, why:'Base × hauteur ÷ 2 = 12 × 7 ÷ 2 = 42 cm².'},
   {q:'Un triangle rectangle a des côtés de l’angle droit de 6 cm et 9 cm. Quelle est son aire&nbsp;?', unit:'cm²', ans:27, why:'Les deux côtés de l’angle droit sont base et hauteur : 6 × 9 ÷ 2 = 27 cm².'},
   {q:'Un triangle a une aire de 36 cm² et une base de 8 cm. Quelle est sa hauteur&nbsp;?', unit:'cm', ans:9, why:'8 × <i>h</i> ÷ 2 = 36, donc 8 × <i>h</i> = 72 et <i>h</i> = 9 cm.'},
   {q:'Un trapèze a des bases de 11 cm et 5 cm et une hauteur de 4 cm. Quelle est son aire&nbsp;?', unit:'cm²', ans:32, why:'(11 + 5) × 4 ÷ 2 = 16 × 4 ÷ 2 = 32 cm².'},
   {q:'Un trapèze a des bases de 7,5 m et 4,5 m et une hauteur de 3 m. Quelle est son aire&nbsp;?', unit:'m²', ans:18, tol:0.001, why:'(7,5 + 4,5) × 3 ÷ 2 = 12 × 3 ÷ 2 = 18 m².'},
   {q:'Un trapèze a des bases de 12 cm et 8 cm et une aire de 60 cm². Quelle est sa hauteur&nbsp;?', unit:'cm', ans:6, why:'(12 + 8) × <i>h</i> ÷ 2 = 10<i>h</i> = 60, donc <i>h</i> = 6 cm.'},
 ]},
 {n:'Le disque et le cercle', r:'Choisir la bonne formule', qs:[
   {q:'Quelle est l’aire d’un disque de rayon 5 cm, arrondie au centième&nbsp;?', unit:'cm²', ans:78.54, tol:0.006, why:'π·<i>r</i>² = π × 25 ≈ 78,54 cm².'},
   {q:'Quelle est l’aire d’un disque de diamètre 12 cm, arrondie au centième&nbsp;?', unit:'cm²', ans:113.10, tol:0.006, why:'Le rayon vaut 12 ÷ 2 = 6 cm. π × 6² = 36π ≈ 113,10 cm². Avec le diamètre au carré, on trouverait 4 fois trop.'},
   {q:'Quel est le périmètre d’un cercle de rayon 4 cm, arrondi au centième&nbsp;?', unit:'cm', ans:25.13, tol:0.006, why:'2π·<i>r</i> = 8π ≈ 25,13 cm.'},
   {q:'Une table ronde a un diamètre de 30 cm. Quelle est la longueur de son bord, arrondie au centième&nbsp;?', unit:'cm', ans:94.25, tol:0.006, why:'Périmètre = π·<i>d</i> = 30π ≈ 94,25 cm.'},
   {q:'Quelle est l’aire d’un demi-disque de rayon 6 cm, arrondie au centième&nbsp;?', unit:'cm²', ans:56.55, tol:0.006, why:'La moitié de π·<i>r</i>² : π × 36 ÷ 2 = 18π ≈ 56,55 cm².'},
   {q:'Un cercle a un périmètre de 31,4 cm. Quel est son rayon, arrondi au centième&nbsp;?', unit:'cm', ans:5.00, tol:0.006, why:'2π·<i>r</i> = 31,4, donc <i>r</i> = 31,4 ÷ (2π) ≈ 5,00 cm.'},
 ]},
 {n:'Changer d’échelle', r:'Choisir la bonne formule', qs:[
   {q:'On triple le côté d’un carré. Par combien son aire est-elle multipliée&nbsp;?', lab:'×', ans:9, why:'(3<i>c</i>)² = 9<i>c</i>² : l’aire est multipliée par 3² = 9.'},
   {q:'Une figure de 20 cm² est agrandie : toutes ses longueurs sont multipliées par 2,5. Quelle est sa nouvelle aire&nbsp;?', unit:'cm²', ans:125, tol:0.001, why:'L’aire est multipliée par 2,5² = 6,25 : 20 × 6,25 = 125 cm².'},
   {q:'Si on divise le rayon d’un disque par 2, son aire est…', opts:['divisée par 2','divisée par 4','inchangée','multipliée par 2'], ans:1, why:'π(<i>r</i>/2)² = π<i>r</i>²/4 : l’aire est divisée par 2² = 4.'},
   {q:'On réduit une figure d’aire 48 cm² en divisant toutes ses longueurs par 2. Quelle est sa nouvelle aire&nbsp;?', unit:'cm²', ans:12, why:'Les longueurs sont multipliées par 1/2, l’aire par (1/2)² = 1/4 : 48 ÷ 4 = 12 cm².'},
 ]},
 {n:'Figures composées', r:'Découper une figure composée', qs:[
   {q:'Une figure en L est un rectangle de 10 m sur 6 m auquel on a retiré un coin rectangulaire de 4 m sur 3 m. Quelle est son aire&nbsp;?', unit:'m²', ans:48, why:'On retranche le trou : 10 × 6 − 4 × 3 = 60 − 12 = 48 m².'},
   {q:'Une plaque carrée de 8 cm de côté est percée d’un trou rond de rayon 2 cm. Quelle est l’aire restante, arrondie au centième&nbsp;?', unit:'cm²', ans:51.43, tol:0.006, why:'8² − π × 2² = 64 − 4π ≈ 64 − 12,57 = 51,43 cm².'},
   {q:'Une maison dessinée est un rectangle de 6 m sur 4 m surmonté d’un triangle de base 6 m et de hauteur 3 m. Quelle est son aire&nbsp;?', unit:'m²', ans:33, why:'Rectangle : 6 × 4 = 24 m². Triangle : 6 × 3 ÷ 2 = 9 m². Total : 33 m².'},
   {q:'Une figure est un rectangle de 8 cm sur 6 cm, avec un demi-disque de diamètre 6 cm collé sur un petit côté. Quel est son périmètre, arrondi au centième&nbsp;?', unit:'cm', ans:31.42, tol:0.006, why:'Le petit côté collé est à l’intérieur et ne compte pas : 8 + 6 + 8 = 22 cm, plus le demi-cercle π × 6 ÷ 2 ≈ 9,42 cm. Total ≈ 31,42 cm.'},
   {q:'Une couronne est la partie entre deux cercles de même centre, de rayons 5 cm et 3 cm. Quelle est son aire, arrondie au centième&nbsp;?', unit:'cm²', ans:50.27, tol:0.006, why:'Grand disque moins petit disque : 25π − 9π = 16π ≈ 50,27 cm².'},
   {q:'Un terrain rectangulaire mesure 40 m sur 25 m. Une allée de 2 m de large longe un des grands côtés. Quelle aire reste-t-il pour le gazon&nbsp;?', unit:'m²', ans:920, why:'Il reste un rectangle de 40 m sur 25 − 2 = 23 m : 40 × 23 = 920 m². Ou 1000 − 80 = 920 m².'},
   {q:'Un rectangle de 9 m de large a un périmètre de 50 m. Quelle est sa longueur&nbsp;?', unit:'m', ans:16, why:'2<i>L</i> + 2 × 9 = 50, donc 2<i>L</i> = 32 et <i>L</i> = 16 m.'},
   {q:'Tu dois peindre 23 m² en deux couches. Un pot couvre 10 m². Combien de pots faut-il acheter&nbsp;?', unit:'pots', ans:5, why:'2 × 23 = 46 m², et 46 ÷ 10 = 4,6 pots. On arrondit vers le haut : 5 pots.'},
 ]},
];
})();
