/* Déclic — examen de compétence : Nombres réels et racines */
(()=>{
const e10=n=>`10<sup>${fmt(n)}</sup>`;
EXAMS['sec11-reels']=[
 {n:'Calculer en notation scientifique', r:'Calculer et comparer en notation scientifique', qs:[
   {q:`Calcule (3 · ${e10(4)}) · (5 · ${e10(-7)}) et écris le résultat en notation scientifique <i>a</i> · 10<sup><i>n</i></sup>. Donne l’exposant <i>n</i>.`, lab:'n =', ans:-2, why:`3 · 5 = 15 et 4 + (−7) = −3 : 15 · ${e10(-3)} = 1,5 · 10 · ${e10(-3)} = 1,5 · ${e10(-2)}. Donc n = −2.`},
   {q:`Calcule (9 · ${e10(8)}) : (3 · ${e10(-2)}) en notation scientifique. Donne l’exposant <i>n</i>.`, lab:'n =', ans:10, why:`9 : 3 = 3 et 8 − (−2) = 10 : le résultat est 3 · ${e10(10)}.`},
   {q:`Calcule (7 · ${e10(3)}) · (4 · ${e10(2)}) en notation scientifique <i>a</i> · 10<sup><i>n</i></sup>. Donne la mantisse <i>a</i>.`, lab:'a =', ans:2.8, why:`7 · 4 = 28 et 3 + 2 = 5 : 28 · ${e10(5)} = 2,8 · ${e10(6)}. La mantisse est 2,8.`},
   {q:'Écris 0,000 72 en notation scientifique <i>a</i> · 10<sup><i>n</i></sup>. Donne l’exposant <i>n</i>.', lab:'n =', ans:-4, why:`Pour obtenir 7,2, la virgule avance de 4 rangs vers la droite : 0,000 72 = 7,2 · ${e10(-4)}.`},
   {q:'Lequel de ces nombres est le plus grand ?', opts:[`9,9 · ${e10(5)}`,`1,2 · ${e10(6)}`,`99 · ${e10(4)}`,`8,7 · ${e10(5)}`], ans:1, why:`1,2 · ${e10(6)} = 1 200 000 a le plus grand exposant. 99 · ${e10(4)} = 990 000 = 9,9 · ${e10(5)}, et 8,7 · ${e10(5)} = 870 000.`},
   {q:'Lequel de ces nombres est écrit en notation scientifique ?', opts:[`12 · ${e10(3)}`,`0,8 · ${e10(-2)}`,`4,05 · ${e10(-7)}`,`10 · ${e10(5)}`], ans:2, why:'La mantisse doit vérifier 1 ≤ a &lt; 10. Seul 4,05 convient : 12 et 10 sont trop grands, 0,8 est trop petit.'},
   {q:`Un globule rouge mesure environ 7 · ${e10(-6)} m de diamètre. Combien de globules rouges faut-il aligner pour faire 1 cm, soit ${e10(-2)} m ? Arrondis à l’unité.`, lab:'nombre ≈', ans:1429, tol:1, why:`${e10(-2)} : (7 · ${e10(-6)}) = (1 : 7) · ${e10(4)} ≈ 0,142857 · 10 000 ≈ 1429.`},
 ]},
 {n:'Racines carrées et cubiques', r:'Racine carrée et racine cubique', qs:[
   {q:'Calcule √144.', lab:'√144 =', ans:12, why:'12² = 144, et 12 est positif : √144 = 12.'},
   {q:'Calcule ∛125.', lab:'∛125 =', ans:5, why:'5³ = 5 · 5 · 5 = 125, donc ∛125 = 5.'},
   {q:'Calcule √0,09.', lab:'√0,09 =', ans:0.3, why:'0,3² = 0,3 · 0,3 = 0,09, donc √0,09 = 0,3 (et non 0,03, dont le carré est 0,0009).'},
   {q:'Lequel de ces nombres n’existe pas ?', opts:['∛(−27)','√(−9)','√0','∛(−1)'], ans:1, why:'Un carré n’est jamais négatif, donc aucun nombre n’a −9 pour carré : √(−9) n’existe pas. En revanche ∛(−27) = −3, √0 = 0 et ∛(−1) = −1.'},
 ]},
 {n:'Encadrer une racine, calculatrice', r:'Encadrer une racine et utiliser la calculatrice', qs:[
   {q:'Quel est l’entier <i>n</i> tel que <i>n</i> ≤ √70 &lt; <i>n</i> + 1 ?', lab:'n =', ans:8, why:'8² = 64 ≤ 70 &lt; 81 = 9², donc 8 ≤ √70 &lt; 9.'},
   {q:'Quel est l’entier <i>n</i> tel que <i>n</i> ≤ ∛50 &lt; <i>n</i> + 1 ?', lab:'n =', ans:3, why:'Les cubes parfaits voisins sont 3³ = 27 et 4³ = 64. Comme 27 ≤ 50 &lt; 64, on a 3 ≤ ∛50 &lt; 4.'},
   {q:'Arrondis √30 au dixième.', lab:'√30 ≈', ans:5.5, tol:.01, why:'5,4² = 29,16 et 5,5² = 30,25 : √30 est entre 5,4 et 5,5. La calculatrice donne √30 ≈ 5,477, donc 5,5 au dixième.'},
   {q:'Que vaut √(36 + 64) ?', lab:'résultat =', ans:10, why:'On calcule d’abord sous la racine : 36 + 64 = 100, et √100 = 10. Taper « √36 + 64 » sans parenthèses donnerait 6 + 64 = 70, ce qui est faux.'},
 ]},
 {n:'Sortir un carré parfait de la racine', r:'Sortir un carré parfait de la racine', qs:[
   {q:'Écris √75 sous la forme <i>a</i>√3. Donne <i>a</i>.', lab:'a =', ans:5, why:'75 = 25 · 3, donc √75 = √25 · √3 = 5√3.'},
   {q:'Écris √98 sous la forme <i>a</i>√2. Donne <i>a</i>.', lab:'a =', ans:7, why:'98 = 49 · 2, donc √98 = √49 · √2 = 7√2.'},
   {q:'Écris √200 sous la forme <i>a</i>√2. Donne <i>a</i>.', lab:'a =', ans:10, why:'Le plus grand carré parfait qui divise 200 est 100 : √200 = √100 · √2 = 10√2. (Avec 4 : √200 = 2√50 = 2 · 5√2, même résultat.)'},
   {q:`Calcule √(${F(16,49)}).`, lab:'résultat =', ans:4/7, tol:.001, show:'4/7', why:`√(16/49) = √16/√49 = ${F(4,7)}.`},
   {q:'Laquelle de ces égalités est vraie ?', opts:['√(9 + 16) = √9 + √16','√(4 · 25) = √4 · √25','√20 = 4√5','√8 = 4√2'], ans:1, why:'√(4 · 25) = √100 = 10 et √4 · √25 = 2 · 5 = 10 : la racine d’un produit est le produit des racines. Pour la somme, c’est faux (5 ≠ 7). √20 = 2√5 et √8 = 2√2.'},
 ]},
 {n:'Additionner et simplifier des racines', r:'Additionner et simplifier des racines', qs:[
   {q:'Écris √50 + √18 sous la forme <i>a</i>√2. Donne <i>a</i>.', lab:'a =', ans:8, why:'√50 = 5√2 et √18 = 3√2. Ces racines sont semblables : 5√2 + 3√2 = 8√2.'},
   {q:'Écris 2√3 + √48 sous la forme <i>a</i>√3. Donne <i>a</i>.', lab:'a =', ans:6, why:'√48 = √16 · √3 = 4√3, donc 2√3 + 4√3 = 6√3.'},
   {q:'Écris √45 − √20 sous la forme <i>a</i>√5. Donne <i>a</i>.', lab:'a =', ans:1, why:'√45 = √9 · √5 = 3√5 et √20 = √4 · √5 = 2√5. Donc 3√5 − 2√5 = 1√5 = √5.'},
   {q:'Calcule √72 : √8.', lab:'résultat =', ans:3, why:'On réunit sous une seule racine : √72 : √8 = √(72 : 8) = √9 = 3.'},
   {q:'Calcule √5 · √20.', lab:'résultat =', ans:10, why:'√5 · √20 = √(5 · 20) = √100 = 10.'},
 ]},
 {n:'Irrationnels et ensembles de nombres', r:'Les ensembles de nombres', qs:[
   {q:'Quel est le plus petit ensemble qui contient −√16 ?', opts:['ℕ','ℤ','ℚ','ℝ'], ans:1, why:'√16 = 4, donc −√16 = −4 : un entier négatif. Il est dans ℤ mais pas dans ℕ.'},
   {q:'Lequel de ces nombres est irrationnel ?', opts:[`√(${F(25,4)})`,'0,121212…','√20','√0,04'], ans:2, why:'√(25/4) = 5/2, √0,04 = 0,2 et 0,121212… (qui se répète) sont rationnels. 20 n’est pas un carré parfait : √20 = 2√5 est irrationnel.'},
   {q:'Quel est le plus petit ensemble qui contient 0,454545… (le motif 45 se répète sans fin) ?', opts:['ℤ','ℝ seulement','ℚ','ℕ'], ans:2, why:'Une écriture décimale qui se répète vient toujours d’une fraction : 0,4545… = 5/11. Ce n’est pas un entier : le plus petit ensemble est ℚ.'},
   {q:'Dans la preuve que √2 n’est pas une fraction, on obtient <i>p</i>² = 2<i>q</i>². Pourquoi en déduit-on que <i>p</i> est pair ?', opts:['Parce que 2q² est un carré parfait','Parce que si p était impair, p² serait impair','Parce que q est pair','Parce que p² = 2q² donne p = 2q'], ans:1, why:'p² = 2q² est pair. Or impair · impair = impair : si p était impair, p² le serait aussi. Donc p est pair.'},
 ]},
 {n:'Calculer avec des fractions', r:'Les fractions : les quatre opérations', qs:[
   {q:`Calcule ${F(5,6)} − ${F(3,4)}.`, lab:'résultat =', ans:1/12, tol:.001, show:'1/12', why:`Dénominateur commun 12 : ${F(10,12)} − ${F(9,12)} = ${F(1,12)}.`},
   {q:`Calcule ${F(3,5)} : ${F(9,10)}.`, lab:'résultat =', ans:2/3, tol:.001, show:'2/3', why:`On multiplie par l’inverse : ${F(3,5)} · ${F(10,9)} = ${F(30,45)} = ${F(2,3)}.`},
   {q:`Calcule ${F(2,3)} + ${F(1,3)} · ${F(3,4)}.`, lab:'résultat =', ans:11/12, tol:.001, show:'11/12', why:`La multiplication d’abord : ${F(1,3)} · ${F(3,4)} = ${F(3,12)} = ${F(1,4)}. Puis ${F(2,3)} + ${F(1,4)} = ${F(8,12)} + ${F(3,12)} = ${F(11,12)}.`},
 ]},
];
})();
