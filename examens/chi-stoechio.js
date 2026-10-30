/* Déclic — examen de compétence : Stœchiométrie */
(()=>{
EXAMS['chi-stoechio']=[
 {n:'Équilibrer une équation', r:'Équilibrer une équation', qs:[
   {q:'Équilibre la combustion du butane avec les plus petits coefficients entiers : a C₄H₁₀ + b O₂ → c CO₂ + d H₂O. Que vaut b&nbsp;?', lab:'b =', ans:13, why:'C : 4 CO₂, H : 5 H₂O, O : 2 × 4 + 5 = 13 atomes, soit 13/2 O₂. On multiplie tout par 2 : 2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O.'},
   {q:'Équilibre a NH₃ + b O₂ → c NO + d H₂O avec les plus petits entiers. Que vaut b&nbsp;?', lab:'b =', ans:5, why:'N : c = a ; H : 3a = 2d. Avec a = 2 : d = 3, c = 2 et O : 2 + 3 = 5 atomes, b = 5/2. On double : 4 NH₃ + 5 O₂ → 4 NO + 6 H₂O.'},
   {q:'Équilibre la combustion du propan-1-ol avec les plus petits entiers : a C₃H₇OH + b O₂ → c CO₂ + d H₂O. Que vaut b&nbsp;?', lab:'b =', ans:9, why:'Pour un C₃H₇OH : 3 CO₂ et 4 H₂O, soit 6 + 4 = 10 atomes d’O ; l’alcool en apporte 1, il en faut 9 de O₂, soit 9/2. On double : 2 C₃H₇OH + 9 O₂ → 6 CO₂ + 8 H₂O.'},
   {q:'Équilibre Fe₂O₃ + b CO → 2 Fe + c CO₂. Que vaut b&nbsp;?', lab:'b =', ans:3, why:'Chaque CO gagne un O pour devenir CO₂ : les 3 O de Fe₂O₃ demandent 3 CO, qui donnent 3 CO₂. Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂.'},
   {q:'Pour « équilibrer » H₂ + O₂ → H₂O, un élève écrit H₂ + O₂ → H₂O₂. Que penser&nbsp;?', opts:['C’est juste, chaque élément est conservé','C’est faux : on ne change jamais les indices, seulement les coefficients ; il faut 2 H₂ + O₂ → 2 H₂O','C’est faux : il faut écrire H₂ + O → H₂O','C’est juste si on multiplie ensuite tout par 2'], ans:1, why:'Changer un indice change la substance : H₂O₂ est l’eau oxygénée, pas l’eau. On ajuste les coefficients : 2 H₂ + O₂ → 2 H₂O.'},
 ]},
 {n:'Avancement', r:'Avancement et réactif limitant', qs:[
   {q:'Pour 2 CO + O₂ → 2 CO₂, on part de 3,0 mol de CO et 2,0 mol de O₂. Combien de moles de CO reste-t-il quand l’avancement vaut ξ = 0,50 mol&nbsp;?', unit:'mol', ans:2, why:'n(CO) = n₀ − 2ξ = 3,0 − 2 × 0,50 = 2,0 mol : le coefficient 2 multiplie l’avancement.'},
   {q:'Pour 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O, quelle expression donne n(H₂O) en cours de réaction (sans eau au départ)&nbsp;?', opts:['ξ','6ξ','6 − ξ','ξ/6'], ans:1, why:'Un produit apparaît à raison de son coefficient fois l’avancement : n(H₂O) = 6ξ.'},
   {q:'Pour 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O, on part de 1,0 mol d’éthane et de 2,8 mol de O₂. Que vaut ξ<sub>max</sub>&nbsp;?', unit:'mol', ans:0.4, why:'Éthane : 1,0/2 = 0,50 ; O₂ : 2,8/7 = 0,40. Le plus petit l’emporte : ξ<sub>max</sub> = 0,40 mol, O₂ est limitant.'},
 ]},
 {n:'Réactif limitant et bilan final', r:'Tableau d’avancement et réactif limitant', qs:[
   {q:'Pour N₂ + 3 H₂ → 2 NH₃, on part de 2,0 mol de N₂ et 4,5 mol de H₂. Quel est le réactif limitant&nbsp;?', opts:['N₂, car il y en a moins','H₂, car 4,5/3 = 1,5 &lt; 2,0/1','Aucun, les proportions sont stœchiométriques'], ans:1, why:'On compare n₀/ν : N₂ donne 2,0 et H₂ donne 4,5/3 = 1,5. H₂ est limitant même s’il y en a plus en moles.'},
   {q:'Pour 2 SO₂ + O₂ → 2 SO₃, on part de 0,60 mol de SO₂ et 0,20 mol de O₂. Quelle quantité de SO₃ se forme au maximum&nbsp;?', unit:'mol', ans:0.4, why:'SO₂ : 0,60/2 = 0,30 ; O₂ : 0,20/1 = 0,20. ξ<sub>max</sub> = 0,20 mol (O₂ limitant), donc n(SO₃) = 2 × 0,20 = 0,40 mol.'},
   {q:'Pour 2 SO₂ + O₂ → 2 SO₃, on part de 0,60 mol de SO₂ et 0,20 mol de O₂. Combien de moles de SO₂ restent à la fin&nbsp;?', unit:'mol', ans:0.2, why:'ξ<sub>max</sub> = min(0,30 ; 0,20) = 0,20 mol. n(SO₂) = 0,60 − 2 × 0,20 = 0,20 mol.'},
   {q:'Pour 4 Fe + 3 O₂ → 2 Fe₂O₃, on part de 1,0 mol de Fe et de 1,0 mol de O₂. Combien de moles de O₂ restent à la fin&nbsp;?', unit:'mol', ans:0.25, why:'Fe : 1,0/4 = 0,25 ; O₂ : 1,0/3 ≈ 0,33. ξ<sub>max</sub> = 0,25 mol, Fe limitant. n(O₂) = 1,0 − 3 × 0,25 = 0,25 mol.'},
   {q:'On fait réagir 5,4 g d’aluminium (27 g/mol) avec 21,3 g de dichlore (71 g/mol) : 2 Al + 3 Cl₂ → 2 AlCl₃. Quel réactif est limitant&nbsp;?', opts:['Al','Cl₂','Aucun : les deux sont épuisés en même temps'], ans:2, why:'n(Al) = 0,20 mol et n(Cl₂) = 0,30 mol. Al : 0,20/2 = 0,10 ; Cl₂ : 0,30/3 = 0,10. Les rapports sont égaux : mélange stœchiométrique, tout est consommé.'},
 ]},
 {n:'De la masse d’un réactif à celle d’un produit', r:'De la masse d’un réactif à la masse d’un produit', qs:[
   {q:'Quelle masse de CO₂ (44 g/mol) produit la combustion de 8,0 g de méthane CH₄ (16 g/mol) : CH₄ + 2 O₂ → CO₂ + 2 H₂O&nbsp;?', unit:'g', ans:22, why:'n(CH₄) = 8,0/16 = 0,50 mol, donc n(CO₂) = 0,50 mol et m = 0,50 × 44 = 22 g.'},
   {q:'Quelle masse de dioxygène (32 g/mol) faut-il pour brûler 10 g de dihydrogène (2 g/mol) : 2 H₂ + O₂ → 2 H₂O&nbsp;?', unit:'g', ans:80, why:'n(H₂) = 10/2 = 5,0 mol, n(O₂) = 5,0 × 1/2 = 2,5 mol, m = 2,5 × 32 = 80 g.'},
   {q:'Quelle masse de fer (56 g/mol) peut-on obtenir à partir de 40 g de Fe₂O₃ (160 g/mol) : Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂&nbsp;?', unit:'g', ans:28, why:'n(Fe₂O₃) = 40/160 = 0,25 mol, n(Fe) = 2 × 0,25 = 0,50 mol, m = 0,50 × 56 = 28 g.'},
   {q:'Quelle masse de O₂ (32 g/mol) libère la décomposition de 24,5 g de chlorate de potassium KClO₃ (122,5 g/mol) : 2 KClO₃ → 2 KCl + 3 O₂&nbsp;? Au dixième de gramme.', unit:'g', ans:9.6, tol:0.05, why:'n(KClO₃) = 24,5/122,5 = 0,200 mol, n(O₂) = 0,200 × 3/2 = 0,300 mol, m = 0,300 × 32 = 9,6 g.'},
   {q:'On fait brûler 4,8 g de magnésium (24 g/mol) avec 4,8 g de dioxygène (32 g/mol) : 2 Mg + O₂ → 2 MgO (40 g/mol). Quelle masse maximale de MgO obtient-on&nbsp;?', unit:'g', ans:8, why:'n(Mg) = 0,20 mol (rapport 0,10), n(O₂) = 0,15 mol (rapport 0,15) : Mg est limitant. n(MgO) = 0,20 mol, soit 0,20 × 40 = 8,0 g.'},
 ]},
 {n:'Rendement', r:'Calculer un rendement', qs:[
   {q:'On fait réagir 4,6 g de sodium (23 g/mol) avec un excès de dichlore : 2 Na + Cl₂ → 2 NaCl (58,5 g/mol). On recueille 9,36 g de NaCl. Quel est le rendement&nbsp;?', unit:'%', ans:80, tol:0.5, why:'n(Na) = 0,20 mol, donc m<sub>max</sub>(NaCl) = 0,20 × 58,5 = 11,7 g. η = 9,36 / 11,7 = 0,80 = 80 %.'},
   {q:'On mélange 0,50 mol d’acide acétique et 0,50 mol d’éthanol, qui réagissent mole à mole pour former un ester. On obtient 0,335 mol d’ester. Quel est le rendement&nbsp;?', unit:'%', ans:67, tol:0.5, why:'n<sub>max</sub> = 0,50 mol (ξ<sub>max</sub> = 0,50). η = 0,335 / 0,50 = 0,67, soit 67 %.'},
   {q:'On réduit 80 g de Fe₂O₃ (160 g/mol) : Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂, avec un rendement de 90 %. Quelle masse de fer (56 g/mol) recueille-t-on, au dixième de gramme&nbsp;?', unit:'g', ans:50.4, tol:0.05, why:'n(Fe₂O₃) = 0,50 mol, n<sub>max</sub>(Fe) = 1,0 mol, m<sub>max</sub> = 56 g. m = 0,90 × 56 = 50,4 g.'},
   {q:'On veut recueillir 10 g de MgO (40 g/mol) par 2 Mg + O₂ → 2 MgO, avec un rendement de 80 %. Quelle masse de magnésium (24 g/mol) faut-il brûler&nbsp;?', unit:'g', ans:7.5, tol:0.05, why:'m<sub>obtenue</sub> = η × m<sub>max</sub>, donc m<sub>max</sub> = 10 / 0,80 = 12,5 g de MgO, soit 12,5/40 = 0,3125 mol. Il faut autant de Mg : 0,3125 × 24 = 7,5 g.'},
   {q:'On fait réagir 0,10 mol de H₂ et 0,10 mol de O₂ (2 H₂ + O₂ → 2 H₂O) et on obtient 0,090 mol d’eau. Quel est le rendement&nbsp;?', unit:'%', ans:90, tol:0.5, why:'H₂ : 0,10/2 = 0,050 ; O₂ : 0,10. H₂ est limitant et n<sub>max</sub>(H₂O) = 2 × 0,050 = 0,10 mol. η = 0,090 / 0,10 = 90 %. Calculer à partir de O₂ (en excès) donnerait un faux 45 %.'},
 ]},
 {n:'Quantités de gaz', r:'Rendement et gaz', qs:[
   {q:'Le zinc réagit avec l’acide chlorhydrique : Zn + 2 HCl → ZnCl₂ + H₂. Quel volume de H₂ libèrent 6,5 g de zinc (65 g/mol) à 293 K et 101,3 kPa (R = 8,314 J/(mol·K))&nbsp;? Au centième de litre.', unit:'L', ans:2.40, tol:0.01, why:'n(H₂) = n(Zn) = 6,5/65 = 0,10 mol. V = nRT/p = 0,10 × 8,314 × 293 / 101 300 ≈ 2,40·10⁻³ m³ = 2,40 L.'},
   {q:'Quel volume occupent 0,25 mol de gaz parfait à 0 °C et 101,3 kPa&nbsp;? Au dixième de litre.', unit:'L', ans:5.6, tol:0.05, why:'Dans ces conditions, une mole occupe 22,4 L : V = 0,25 × 22,4 = 5,6 L.'},
   {q:'Quelle masse de CaCO₃ (100 g/mol) faut-il calciner (CaCO₃ → CaO + CO₂) pour obtenir 1,12 L de CO₂ mesurés à 0 °C et 101,3 kPa&nbsp;?', unit:'g', ans:5, tol:0.05, why:'n(CO₂) = 1,12 / 22,4 = 0,050 mol, donc n(CaCO₃) = 0,050 mol et m = 0,050 × 100 = 5,0 g.'},
   {q:'Quel volume de CO₂ produit la combustion de 4,4 g de propane (44 g/mol) : C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O, à 298 K et 100 kPa (R = 8,314 J/(mol·K))&nbsp;? Au centième de litre.', unit:'L', ans:7.43, tol:0.01, why:'n(C₃H₈) = 0,10 mol, n(CO₂) = 0,30 mol. V = 0,30 × 8,314 × 298 / 100 000 ≈ 7,43·10⁻³ m³ = 7,43 L.'},
   {q:'Pour CH₄ + 2 O₂ → CO₂ + 2 H₂O, quel volume de O₂ faut-il pour brûler 1,5 L de méthane, les deux gaz étant mesurés à la même température et à la même pression&nbsp;?', unit:'L', ans:3, why:'Avec pV = nRT, à <i>T</i> et <i>p</i> égales, le volume est proportionnel à <i>n</i>. Il faut 2 fois plus de moles de O₂, donc 2 × 1,5 = 3,0 L.'},
 ]},
];
})();
