/* Déclic — examen de compétence : Racines de l’unité et racines n-ièmes */
(()=>{
EXAMS['an2-racines']=[
 {n:'Les racines n-ièmes de l’unité', r:'Les racines n-ièmes de l’unité', qs:[
   {q:'Parmi les 5 solutions complexes de <i>z</i>⁵ = 1, combien sont réelles&nbsp;?', opts:['0','1','2','5'], ans:1, why:'Les racines sont aux angles 0°, 72°, 144°, 216°, 288°. Seul l’angle 0° est sur l’axe réel : <i>z</i> = 1. L’angle 180° n’en fait pas partie, car 5 est impair.'},
   {q:'Les racines 8-ièmes de l’unité sont ω<sub><i>k</i></sub> = e<sup>2i<i>k</i>π/8</sup>. Quel est l’argument de ω₃, en degrés&nbsp;?', lab:'θ =', unit:'°', ans:135, tol:.001, why:'Les racines sont espacées de 360°/8 = 45°, donc ω₃ a pour argument 3 × 45° = 135°.'},
   {q:'Calcule la partie réelle de ω₂ = e<sup>2i · 2π/6</sup>, racine 6-ième de l’unité.', lab:'Re =', ans:-.5, tol:.001, why:'L’argument vaut 2 × 60° = 120°, et cos 120° = −1/2.'},
   {q:'Calcule la partie imaginaire de ω₁ = e<sup>2iπ/12</sup>, racine 12-ième de l’unité (valeur décimale).', lab:'Im =', ans:.5, tol:.001, why:'L’argument vaut 360°/12 = 30°, et sin 30° = 1/2.'},
   {q:'Lequel de ces nombres est une racine 12-ième de l’unité&nbsp;?', opts:['2','1 + i','e<sup>iπ/7</sup>','i'], ans:3, why:'i¹² = (i⁴)³ = 1. Les autres n’ont pas un module 1 (2 et 1 + i) ou ont un argument π/7 qui n’est pas un multiple de 2π/12 = π/6.'},
   {q:'Calcule la distance entre deux racines quatrièmes de l’unité voisines, 1 et i. Arrondis au centième.', lab:'distance =', ans:1.41, tol:.006, why:'|i − 1| = √(1 + 1) = √2 ≈ 1,41 : c’est le côté du carré formé par 1, i, −1, −i.'},
   {q:'Combien de racines 9-ièmes de l’unité sont aussi des racines cubiques de l’unité&nbsp;?', lab:'nombre =', ans:3, tol:.001, why:'ω<sub><i>k</i></sub> = e<sup>2i<i>k</i>π/9</sup> vérifie ω<sub><i>k</i></sub>³ = e<sup>2i<i>k</i>π/3</sup> = 1 si et seulement si <i>k</i> est multiple de 3 : <i>k</i> = 0, 3, 6. Ce sont 1, j et j².'},
 ]},
 {n:'Somme des racines de l’unité', r:'Leur somme est nulle', qs:[
   {q:'Calcule la somme des 10 racines 10-ièmes de l’unité.', lab:'somme =', ans:0, tol:.001, why:'1 + ω + … + ω⁹ = (ω¹⁰ − 1)/(ω − 1) = 0 avec ω = e<sup>2iπ/10</sup> ≠ 1. Les 10 flèches bout à bout referment un décagone.'},
   {q:'Avec ω = e<sup>2iπ/<i>n</i></sup> et <i>n</i> ≥ 2, pourquoi a-t-on 1 + ω + … + ω<sup><i>n</i>−1</sup> = 0&nbsp;?', opts:['Parce que chaque ω<sup><i>k</i></sup> est nul','Parce que c’est une somme géométrique égale à (ω<sup><i>n</i></sup> − 1)/(ω − 1), avec ω<sup><i>n</i></sup> = 1 et ω ≠ 1','Parce que les racines sont toutes réelles et se compensent deux à deux','Parce que |ω| = 1'], ans:1, why:'Pour ω ≠ 1, 1 + ω + … + ω<sup><i>n</i>−1</sup> = (ω<sup><i>n</i></sup> − 1)/(ω − 1), et ω<sup><i>n</i></sup> = 1 annule le numérateur. Les racines ne sont pas toutes réelles, et |ω| = 1 ne suffit pas.'},
   {q:'Soit ω = e<sup>iπ/3</sup> (racine 6-ième de l’unité). Calcule ω + ω² + ω⁴ + ω⁵.', lab:'somme =', ans:0, tol:.001, why:'1 + ω + ω² + ω³ + ω⁴ + ω⁵ = 0 et ω³ = e<sup>iπ</sup> = −1. Donc ω + ω² + ω⁴ + ω⁵ = 0 − 1 − (−1) = 0.'},
   {q:'Soit ω = e<sup>2iπ/9</sup>. Calcule ω³ + ω⁶.', lab:'somme =', ans:-1, tol:.001, why:'ω³ = e<sup>2iπ/3</sup> = j et ω⁶ = j² sont des racines cubiques de l’unité : 1 + j + j² = 0, donc ω³ + ω⁶ = −1.'},
   {q:'En prenant la partie réelle de la somme des racines cinquièmes de l’unité, calcule cos 72° + cos 144° (valeur décimale).', lab:'somme =', ans:-.5, tol:.001, why:'Les parties réelles donnent 1 + cos 72° + cos 144° + cos 216° + cos 288° = 0. Or cos 216° = cos 144° et cos 288° = cos 72°, donc 1 + 2(cos 72° + cos 144°) = 0 et la somme vaut −1/2.'},
 ]},
 {n:'Calculer avec ω et j', r:'Calculer avec les racines de l’unité', qs:[
   {q:'Avec j = e<sup>2iπ/3</sup>, que vaut j⁵⁰&nbsp;?', opts:['1','j','j²','−1'], ans:2, why:'50 = 3 · 16 + 2, donc j⁵⁰ = (j³)¹⁶ · j² = j².'},
   {q:'Avec j = e<sup>2iπ/3</sup>, à quoi est égal le conjugué j̄&nbsp;?', opts:['−j','j²','1/j²','−j²'], ans:1, why:'|j| = 1, donc j̄ = 1/j = j³/j = j². On peut aussi le voir : j a pour argument 120°, j̄ a pour argument −120° ≡ 240°, celui de j².'},
   {q:'Avec j = e<sup>2iπ/3</sup>, calcule (1 + j²)³.', lab:'(1 + j²)³ =', ans:-1, tol:.001, why:'1 + j + j² = 0 donne 1 + j² = −j, donc (1 + j²)³ = (−j)³ = −j³ = −1.'},
   {q:'Avec j = e<sup>2iπ/3</sup>, calcule (3 + j)(3 + j²).', lab:'produit =', ans:7, tol:.001, why:'(3 + j)(3 + j²) = 9 + 3j² + 3j + j³ = 9 + 3(j + j²) + 1 = 9 − 3 + 1 = 7.'},
   {q:'Avec j = e<sup>2iπ/3</sup>, calcule j + j² + j³ + … + j²⁰.', lab:'somme =', ans:-1, tol:.001, why:'Les 18 premiers termes forment 6 blocs j<sup>3<i>m</i>+1</sup> + j<sup>3<i>m</i>+2</sup> + j<sup>3<i>m</i>+3</sup> = j<sup>3<i>m</i></sup>(j + j² + 1) = 0. Il reste j¹⁹ + j²⁰ = j + j² = −1.'},
   {q:'Soit ω = e<sup>2iπ/5</sup>. Calcule ω¹² · ω̄².', lab:'résultat =', ans:1, tol:.001, why:'ω̄ = ω⁴ (car |ω| = 1 et ω⁵ = 1), donc ω̄² = ω⁸ et ω¹² · ω⁸ = ω²⁰ = (ω⁵)⁴ = 1.'},
 ]},
 {n:'Résoudre zⁿ = w', r:'Racines n-ièmes de w quelconque', qs:[
   {q:'Quel est le module commun des solutions de <i>z</i>⁴ = 81i&nbsp;?', lab:'r =', ans:3, tol:.001, why:'<i>r</i>⁴ = |81i| = 81, donc <i>r</i> = 81<sup>1/4</sup> = 3.'},
   {q:'Les solutions non réelles de <i>z</i>³ = 27 ont la même partie réelle. Laquelle&nbsp;? (valeur décimale)', lab:'Re z =', ans:-1.5, tol:.001, why:'Les solutions sont 3e<sup>2i<i>k</i>π/3</sup> : 3, 3e<sup>±2iπ/3</sup>. Partie réelle des deux dernières : 3 cos 120° = −1,5.'},
   {q:'Une solution de <i>z</i>⁴ = −81 est dans le premier quadrant. Quelle est sa partie réelle&nbsp;? Arrondis au centième.', lab:'Re z =', ans:2.12, tol:.006, why:'−81 = 81e<sup>iπ</sup>, donc <i>r</i> = 3 et θ = π/4 + <i>k</i>π/2. La solution du premier quadrant est 3e<sup>iπ/4</sup>, de partie réelle 3√2/2 ≈ 2,12.'},
   {q:'L’équation <i>z</i>⁵ = 32i a une solution d’argument strictement compris entre 0° et 90°. Quel est cet argument, en degrés&nbsp;?', lab:'θ =', unit:'°', ans:18, tol:.001, why:'32i = 32e<sup>iπ/2</sup>, donc 5θ = 90° + 360°<i>k</i> et θ = 18° + 72°<i>k</i> : 18°, 90°, 162°, 234°, 306°. Seul 18° est strictement entre 0° et 90°.'},
   {q:'Quels sont les arguments des solutions de <i>z</i>³ = −8i&nbsp;?', opts:['−90°, 30°, 150°','−30°, 90°, 210°','−30° seulement','0°, 120°, 240°'], ans:1, why:'−8i = 8e<sup>−iπ/2</sup>, donc 3θ = −90° + 360°<i>k</i> et θ = −30° + 120°<i>k</i> : −30°, 90°, 210°. Contrôle : (2i)³ = 8i³ = −8i, et 2i a bien l’argument 90°.'},
 ]},
 {n:'Le polygone des racines', r:'Racines n-ièmes de w quelconque', qs:[
   {q:'Les 6 solutions de <i>z</i>⁶ = 64 forment un hexagone régulier. Quelle est la longueur de son côté&nbsp;?', lab:'côté =', ans:2, tol:.001, why:'Le rayon vaut 64<sup>1/6</sup> = 2. Deux racines voisines sont à distance 2 · 2 sin(π/6) = 2 : dans un hexagone régulier, le côté est égal au rayon.'},
   {q:'Quelle est la distance entre deux solutions voisines de <i>z</i>⁵ = 32&nbsp;? Arrondis au centième.', lab:'distance =', ans:2.35, tol:.006, why:'Le rayon vaut 32<sup>1/5</sup> = 2 et l’écart angulaire 72°. La distance vaut 2 · 2 sin(36°) ≈ 4 × 0,5878 ≈ 2,35.'},
   {q:'Les 4 solutions de <i>z</i>⁴ = 16i forment un carré. Quelle est son aire&nbsp;?', lab:'aire =', ans:8, tol:.001, why:'Le rayon vaut 16<sup>1/4</sup> = 2. Deux sommets voisins sont à distance 2 · 2 sin(π/4) = 2√2, donc l’aire vaut (2√2)² = 8.'},
   {q:'Quel est le périmètre du triangle formé par les solutions de <i>z</i>³ = 27&nbsp;? Arrondis au centième.', lab:'périmètre =', ans:15.59, tol:.006, why:'Rayon 3, côté 2 · 3 sin(π/3) = 3√3. Le périmètre vaut 9√3 ≈ 15,59.'},
   {q:'Pour <i>n</i> ≥ 2 et <i>w</i> ≠ 0, que vaut la somme des <i>n</i> solutions de <i>z</i><sup><i>n</i></sup> = <i>w</i>&nbsp;?', opts:['<i>w</i>','0','<i>n</i> · <i>w</i><sup>1/<i>n</i></sup>','Elle dépend de <i>w</i>'], ans:1, why:'Les solutions s’écrivent <i>z</i>₀ω<sup><i>k</i></sup> avec ω = e<sup>2iπ/<i>n</i></sup>. Leur somme vaut <i>z</i>₀(1 + ω + … + ω<sup><i>n</i>−1</sup>) = <i>z</i>₀ · 0 = 0 : le centre du polygone est l’origine.'},
 ]},
];
})();
