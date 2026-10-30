/* Déclic — examen de compétence : Quantités de matière */
(()=>{
EXAMS['chi-quantites']=[
 {n:'Masse atomique moyenne', r:'Masse atomique moyenne d’un élément', qs:[
   {q:'Le rubidium naturel contient 72,17 % de ⁸⁵Rb (85 u) et 27,83 % de ⁸⁷Rb (87 u). Quelle est sa masse atomique moyenne, au centième&nbsp;?', unit:'u', ans:85.56, tol:0.01, why:'M = 0,7217 × 85 + 0,2783 × 87 ≈ 61,34 + 24,21 = 85,56 u, plus près de 85, l’isotope le plus abondant.'},
   {q:'Le cuivre naturel contient 69,17 % de ⁶³Cu (62,93 u) et 30,83 % de ⁶⁵Cu (64,93 u). Quelle est sa masse atomique moyenne, au centième&nbsp;?', unit:'u', ans:63.55, tol:0.01, why:'M = 0,6917 × 62,93 + 0,3083 × 64,93 ≈ 43,53 + 20,02 = 63,55 u.'},
   {q:'Le silicium naturel contient 92,2 % de ²⁸Si (28 u), 4,7 % de ²⁹Si (29 u) et 3,1 % de ³⁰Si (30 u). Quelle est sa masse atomique moyenne, au centième&nbsp;?', unit:'u', ans:28.11, tol:0.01, why:'M = 0,922 × 28 + 0,047 × 29 + 0,031 × 30 = 25,816 + 1,363 + 0,930 ≈ 28,11 u.'},
   {q:'Le gallium a deux isotopes, ⁶⁹Ga (69 u) et ⁷¹Ga (71 u), et une masse atomique moyenne de 69,72 u. Quel pourcentage des atomes sont des ⁶⁹Ga&nbsp;?', unit:'%', ans:64, tol:0.5, why:'Avec x la fraction de ⁶⁹Ga : 69x + 71(1 − x) = 69,72, donc 71 − 2x = 69,72 et x = 0,64, soit 64 %.'},
   {q:'Un élément a deux isotopes de masses 79 u et 81 u, et sa masse moyenne vaut 79,90 u. Que peux-tu dire sans calcul&nbsp;?', opts:['L’isotope 81 est le plus abondant','Les deux isotopes sont présents à peu près à parts égales, avec un peu plus de 79','L’isotope 79 représente plus de 90 % des atomes','C’est impossible, la moyenne devrait valoir 80'], ans:1, why:'79,90 est juste sous le milieu 80 : l’isotope 79 est un peu plus abondant. Le calcul donne 79x + 81(1 − x) = 79,90, soit x = 0,55.'},
 ]},
 {n:'Masse molaire', r:'Calculer une masse molaire', qs:[
   {q:'Calcule la masse molaire de l’hydroxyde de magnésium Mg(OH)₂ (Mg : 24, O : 16, H : 1 g/mol).', unit:'g/mol', ans:58, why:'L’indice 2 multiplie O et H : M = 24 + 2 × (16 + 1) = 24 + 34 = 58 g/mol.'},
   {q:'Calcule la masse molaire du phosphate de calcium Ca₃(PO₄)₂ (Ca : 40, P : 31, O : 16 g/mol).', unit:'g/mol', ans:310, why:'Ca : 3, P : 2, O : 4 × 2 = 8. M = 3 × 40 + 2 × 31 + 8 × 16 = 120 + 62 + 128 = 310 g/mol.'},
   {q:'Calcule la masse molaire du sulfate de fer(III) Fe₂(SO₄)₃ (Fe : 56, S : 32, O : 16 g/mol).', unit:'g/mol', ans:400, why:'Fe : 2, S : 3, O : 12. M = 2 × 56 + 3 × 32 + 12 × 16 = 112 + 96 + 192 = 400 g/mol.'},
   {q:'Calcule la masse molaire du chlorure de calcium dihydraté CaCl₂·2H₂O (Ca : 40, Cl : 35,5, O : 16, H : 1 g/mol).', unit:'g/mol', ans:147, why:'CaCl₂ : 40 + 2 × 35,5 = 111 g/mol, plus 2 × 18 = 36 g/mol d’eau : M = 147 g/mol.'},
 ]},
 {n:'Masse, moles et entités', r:'Convertir masse, moles et nombre d’entités', qs:[
   {q:'Combien de moles y a-t-il dans 8,5 g d’ammoniac NH₃ (N : 14, H : 1 g/mol)&nbsp;?', unit:'mol', ans:0.5, why:'M(NH₃) = 14 + 3 = 17 g/mol, donc n = m/M = 8,5/17 = 0,50 mol.'},
   {q:'Combien de molécules contiennent 2,0 g de méthane CH₄ (M = 16 g/mol, N<sub>A</sub> = 6,022·10²³ mol⁻¹)&nbsp;? Donne le résultat en 10²² molécules, au centième.', unit:'·10²² molécules', ans:7.53, tol:0.01, why:'n = 2,0/16 = 0,125 mol, puis N = 0,125 × 6,022·10²³ ≈ 7,53·10²² molécules.'},
   {q:'Quelle est la masse de 1,204·10²³ molécules de CO₂ (M = 44 g/mol, N<sub>A</sub> = 6,022·10²³ mol⁻¹)&nbsp;? Au dixième de gramme.', unit:'g', ans:8.8, tol:0.05, why:'On passe par n : n = 1,204·10²³ / 6,022·10²³ = 0,200 mol, puis m = 0,200 × 44 = 8,8 g.'},
   {q:'Combien d’atomes d’hydrogène contiennent 3,6 g d’eau (M = 18 g/mol, N<sub>A</sub> = 6,022·10²³ mol⁻¹)&nbsp;? Donne le résultat en 10²³ atomes, au centième.', unit:'·10²³ atomes', ans:2.41, tol:0.01, why:'n(H₂O) = 3,6/18 = 0,20 mol. Chaque molécule a 2 H : n(H) = 0,40 mol, soit 0,40 × 6,022·10²³ ≈ 2,41·10²³ atomes.'},
   {q:'Quelle quantité de soluté contiennent 250 mL d’une solution à 0,40 mol/L&nbsp;?', unit:'mol', ans:0.1, why:'n = c·V = 0,40 × 0,250 = 0,10 mol (V en litres).'},
   {q:'Une solution de soude NaOH (M = 40 g/mol) est à 0,20 mol/L. Quelle est sa concentration massique&nbsp;?', unit:'g/L', ans:8, why:'t = c·M = 0,20 × 40 = 8,0 g/L.'},
 ]},
 {n:'Dilution', r:'Faire une dilution', qs:[
   {q:'Quel volume de solution mère à 1,5 mol/L faut-il prélever pour préparer 500 mL à 0,25 mol/L&nbsp;? Au dixième de mL.', unit:'mL', ans:83.3, tol:0.1, why:'c₁V₁ = c₂V₂ donne V₁ = 0,25 × 500 / 1,5 ≈ 83,3 mL.'},
   {q:'On prélève 40 mL d’une solution à 0,80 mol/L et on complète à 200 mL avec de l’eau. Quelle est la nouvelle concentration&nbsp;?', unit:'mol/L', ans:0.16, why:'c₂ = c₁V₁/V₂ = 0,80 × 40 / 200 = 0,16 mol/L (facteur de dilution 5).'},
   {q:'On veut passer d’une solution à 2,0 mol/L à une solution à 0,050 mol/L. Quel est le facteur de dilution&nbsp;?', lab:'F =', ans:40, why:'F = c₁/c₂ = 2,0 / 0,050 = 40 : par exemple 2,5 mL complétés à 100 mL.'},
   {q:'On ajoute 150 mL d’eau à 50 mL d’une solution à 0,60 mol/L. Quelle est la nouvelle concentration&nbsp;?', unit:'mol/L', ans:0.15, why:'Le volume final est V₂ = 50 + 150 = 200 mL, pas 150 mL. c₂ = 0,60 × 50 / 200 = 0,15 mol/L.'},
 ]},
 {n:'Préparer une solution par dissolution', r:'Préparer une solution par dissolution', qs:[
   {q:'Quelle masse de chlorure de potassium KCl (M = 74,5 g/mol) faut-il pour préparer 250 mL d’une solution à 0,150 mol/L&nbsp;? Au centième de gramme.', unit:'g', ans:2.79, tol:0.01, why:'n = 0,150 × 0,250 = 0,0375 mol, puis m = 0,0375 × 74,5 ≈ 2,79 g.'},
   {q:'Quelle masse de cristaux de Na₂CO₃·10H₂O (M = 286 g/mol) faut-il pour préparer 100 mL d’une solution de carbonate de sodium à 0,050 mol/L&nbsp;? Au centième de gramme.', unit:'g', ans:1.43, tol:0.01, why:'n = 0,050 × 0,100 = 0,0050 mol. Chaque unité d’hydrate apporte un Na₂CO₃ : m = 0,0050 × 286 = 1,43 g.'},
   {q:'On dissout 5,85 g de NaCl (M = 58,5 g/mol) et on complète à 250 mL dans une fiole jaugée. Quelle est la concentration obtenue&nbsp;?', unit:'mol/L', ans:0.4, why:'n = 5,85/58,5 = 0,100 mol, c = n/V = 0,100 / 0,250 = 0,40 mol/L.'},
 ]},
 {n:'Du pourcentage massique à la concentration', r:'Du pourcentage massique à la concentration', qs:[
   {q:'L’eau oxygénée concentrée contient 30 % en masse de H₂O₂ (M = 34 g/mol) et a une masse volumique de 1,11 g/mL. Quelle est sa concentration molaire, au dixième&nbsp;?', unit:'mol/L', ans:9.8, tol:0.05, why:'1 L pèse 1110 g, dont 0,30 × 1110 = 333 g de H₂O₂, soit 333/34 ≈ 9,8 mol : c ≈ 9,8 mol/L.'},
   {q:'L’acide nitrique du commerce contient 65 % en masse de HNO₃ (M = 63 g/mol) et a une masse volumique de 1,40 g/mL. Quelle est sa concentration molaire, au dixième&nbsp;?', unit:'mol/L', ans:14.4, tol:0.05, why:'1 L pèse 1400 g, dont 0,65 × 1400 = 910 g de HNO₃, soit 910/63 ≈ 14,4 mol/L.'},
   {q:'Quel volume de cet acide nitrique à 65 % (ρ = 1,40 g/mL, M = 63 g/mol) faut-il prélever pour préparer 500 mL d’acide à 2,0 mol/L&nbsp;? Au dixième de mL.', unit:'mL', ans:69.2, tol:0.1, why:'c = 1000 × 1,40 × 0,65 / 63 ≈ 14,44 mol/L. Il faut n = 2,0 × 0,500 = 1,0 mol, donc V = 1,0 / 14,44 ≈ 0,0692 L = 69,2 mL.'},
 ]},
 {n:'Gaz parfait et pressions partielles', r:'Gaz parfait et pressions partielles', qs:[
   {q:'Quelle pression exercent 0,25 mol de gaz dans 5,0 L à 290 K (R = 8,314 J/(mol·K))&nbsp;? Au dixième de kPa.', unit:'kPa', ans:120.6, tol:0.1, why:'V = 5,0·10⁻³ m³. p = nRT/V = 0,25 × 8,314 × 290 / 0,0050 ≈ 120 553 Pa ≈ 120,6 kPa.'},
   {q:'Quel volume occupent 2,0 mol de gaz à 27 °C sous 101,3 kPa (R = 8,314 J/(mol·K))&nbsp;? Au dixième de litre.', unit:'L', ans:49.2, tol:0.1, why:'T = 27 + 273 = 300 K. V = nRT/p = 2,0 × 8,314 × 300 / 101 300 ≈ 0,04924 m³ = 49,2 L.'},
   {q:'Combien de moles de gaz contient une bouteille de 3,0 L à 25 °C sous 200 kPa (R = 8,314 J/(mol·K))&nbsp;? Au millième.', unit:'mol', ans:0.242, tol:0.001, why:'n = pV/RT = 200 000 × 0,0030 / (8,314 × 298) ≈ 0,242 mol.'},
   {q:'Un mélange contient 0,30 mol de N₂ et 0,10 mol de CO₂ sous une pression totale de 200 kPa. Quelle est la pression partielle de CO₂&nbsp;?', unit:'kPa', ans:50, why:'x(CO₂) = 0,10 / 0,40 = 0,25, donc p(CO₂) = 0,25 × 200 = 50 kPa.'},
   {q:'Un récipient de 10 L à 300 K contient 4,0 g d’hélium (M = 4 g/mol) et 16 g de dioxygène (M = 32 g/mol). Quelle est la pression totale, au dixième de kPa (R = 8,314 J/(mol·K))&nbsp;?', unit:'kPa', ans:374.1, tol:0.1, why:'n(He) = 1,0 mol et n(O₂) = 0,50 mol, soit 1,5 mol en tout. p = 1,5 × 8,314 × 300 / 0,010 = 374 130 Pa ≈ 374,1 kPa.'},
 ]},
];
})();
