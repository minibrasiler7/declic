/* Déclic — examen de compétence : Séries et Taylor */
(()=>{
EXAMS['series']=[
 {n:'Séries géométriques et rayon de convergence', r:'Série géométrique et convergence', qs:[
   {q:'Combien vaut Σₙ₌₀^∞ (1/3)ⁿ ?', ans:1.5, tol:0.001, show:'3/2', why:'Raison 1/3, de valeur absolue < 1 : 1/(1 − 1/3) = 1/(2/3) = 3/2.'},
   {q:'Combien vaut Σₙ₌₀^∞ (−1/2)ⁿ ? (fraction ou décimale)', ans:2/3, tol:0.003, show:'2/3', why:'Raison −1/2, |q| < 1 : 1/(1 − (−1/2)) = 1/(3/2) = 2/3.'},
   {q:'Combien vaut Σₙ₌₁^∞ (3/4)ⁿ ?', ans:3, why:'Σₙ₌₀^∞ (3/4)ⁿ = 1/(1 − 3/4) = 4. On retire le terme n = 0, qui vaut 1 : 4 − 1 = 3.'},
   {q:'Combien vaut Σₙ₌₂^∞ (1/2)ⁿ ?', ans:0.5, tol:0.001, show:'1/2', why:'Σₙ₌₀^∞ (1/2)ⁿ = 2. On retire les termes n = 0 et n = 1 : 2 − 1 − 1/2 = 1/2.'},
   {q:'Combien vaut Σₙ₌₀^∞ 5·(0,2)ⁿ ?', ans:6.25, tol:0.001, why:'5 · 1/(1 − 0,2) = 5/0,8 = 6,25.'},
   {q:'Quel est le rayon de convergence de Σ (2x)ⁿ ?', lab:'R =', ans:0.5, tol:0.001, show:'1/2', why:'La raison est 2x. La série converge si |2x| < 1, soit |x| < 1/2. Le rayon vaut 1/2.'},
   {q:'Que dire de Σₙ₌₀^∞ (5/4)ⁿ ?', opts:['Elle vaut 1/(1 − 5/4) = −4','Elle diverge, car |5/4| ≥ 1','Elle converge vers 5','Elle converge, car 5/4 est proche de 1'], ans:1, why:'La formule 1/(1 − q) ne vaut que si |q| < 1. Ici les termes (5/4)ⁿ grandissent : la série diverge.'},
   {q:'Les termes d’une série tendent vers 0. Que peut-on conclure ?', opts:['La série converge','La série converge vers 0','La série diverge','Rien à coup sûr : Σ 1/n a des termes qui tendent vers 0 mais diverge'], ans:3, why:'Un terme général qui tend vers 0 est nécessaire, pas suffisant. La série harmonique Σ 1/n le montre.'},
 ]},
 {n:'Polynômes de Taylor', r:'Écrire un polynôme de Taylor', qs:[
   {q:'Quel est le coefficient de x³ dans le polynôme de Taylor de e^{3x} en 0 ?', ans:4.5, tol:0.001, show:'9/2', why:'eᵘ ≈ 1 + u + u²/2 + u³/6 avec u = 3x : (3x)³/6 = 27x³/6 = 4,5x³.'},
   {q:'Quel est le coefficient de x⁴ dans le polynôme de Taylor de e^{−x²} en 0 ?', ans:0.5, tol:0.001, show:'1/2', why:'eᵘ ≈ 1 + u + u²/2 avec u = −x² : (−x²)²/2 = x⁴/2.'},
   {q:'Quel est le coefficient de x² dans le polynôme de Taylor de cos(3x) en 0 ?', ans:-4.5, tol:0.001, show:'−9/2', why:'cos u ≈ 1 − u²/2 avec u = 3x : −(3x)²/2 = −9x²/2 = −4,5x².'},
   {q:'Quel est le coefficient de x³ dans le polynôme de Taylor de 1/(1 − 2x) en 0 ?', ans:8, why:'1/(1 − u) = Σ uⁿ avec u = 2x : le terme en x³ est (2x)³ = 8x³.'},
   {q:'Quel est le polynôme de Taylor d’ordre 3 de sin(2x) en 0 ?', opts:['2x − 2x³/3','2x − x³/6','2x − 4x³/3','x − 8x³/6'], ans:2, why:'sin u ≈ u − u³/6 avec u = 2x : 2x − 8x³/6 = 2x − 4x³/3.'},
   {q:'Par quoi commence le développement de e^{x²} en 0 ?', opts:['1 + x² + x⁴/2','1 + x + x²/2','1 + x² + x⁴/4','1 + 2x + 2x²'], ans:0, why:'On remplace u par x² dans 1 + u + u²/2 : 1 + x² + (x²)²/2 = 1 + x² + x⁴/2.'},
   {q:'Avec le polynôme de Taylor d’ordre 2 de eˣ, quelle valeur approchée obtiens-tu pour e^{0,1} ? (3 décimales)', ans:1.105, tol:0.0005, why:'eˣ ≈ 1 + x + x²/2 : 1 + 0,1 + 0,01/2 = 1,105. (La vraie valeur est 1,10517…)'},
   {q:'Avec le polynôme de Taylor d’ordre 2 de cos x, quelle valeur approchée obtiens-tu pour cos(0,2) ?', ans:0.98, tol:0.0005, why:'cos x ≈ 1 − x²/2 : 1 − 0,04/2 = 0,98. (La vraie valeur est 0,98007…)'},
 ]},
 {n:'Dériver ou intégrer terme à terme', r:'Dériver ou intégrer terme à terme', qs:[
   {q:'Calcule Σₙ₌₁^∞ n/5ⁿ. (fraction ou décimale)', ans:5/16, tol:0.002, show:'5/16', why:'Σ n·xⁿ = x/(1 − x)² en x = 1/5 : (1/5)/(4/5)² = (1/5)·(25/16) = 5/16 = 0,3125.'},
   {q:'Calcule Σₙ₌₁^∞ n·(1/2)ⁿ⁻¹.', ans:4, why:'En dérivant Σ xⁿ = 1/(1 − x), on obtient Σ n·xⁿ⁻¹ = 1/(1 − x)². En x = 1/2 : 1/(1/2)² = 4.'},
   {q:'Calcule Σₙ₌₁^∞ n·(2/3)ⁿ.', ans:6, why:'Σ n·xⁿ = x/(1 − x)² en x = 2/3 : (2/3)/(1/3)² = (2/3)·9 = 6.'},
   {q:'Calcule Σₙ₌₁^∞ n·(−1/2)ⁿ. (fraction ou décimale)', ans:-2/9, tol:0.002, show:'−2/9', why:'Σ n·xⁿ = x/(1 − x)² en x = −1/2, qui est dans le disque |x| < 1 : (−1/2)/(3/2)² = (−1/2)·(4/9) = −2/9.'},
   {q:'En dérivant terme à terme Σₙ₌₀^∞ xⁿ = 1/(1 − x), qu’obtient-on pour |x| < 1 ?', opts:['Σ xⁿ⁻¹ = 1/(1 − x)²','Σ n·xⁿ⁻¹ = 1/(1 − x)²','Σ n·xⁿ⁻¹ = −1/(1 − x)²','Σ n·xⁿ = 1/(1 − x)²'], ans:1, why:'(xⁿ)′ = n·xⁿ⁻¹ et (1/(1 − x))′ = 1/(1 − x)². Pour avoir Σ n·xⁿ, il faut encore multiplier par x.'},
   {q:'On approche ∫₀¹ e^{x²} dx en intégrant terme à terme 1 + x² + x⁴/2. Quelle valeur obtiens-tu ? (4 décimales)', ans:43/30, tol:0.0002, show:'43/30 ≈ 1,4333', why:'∫₀¹ 1 dx + ∫₀¹ x² dx + ∫₀¹ x⁴/2 dx = 1 + 1/3 + 1/10 = 43/30 ≈ 1,4333.'},
   {q:'Un élève applique Σ n·xⁿ = x/(1 − x)² en x = 2 et annonce Σ n·2ⁿ = 2. Qu’en penses-tu ?', opts:['C’est juste','La somme vaut −2','La formule ne vaut pas en x = 2, hors du disque |x| < 1 : la série diverge','La somme vaut 1/2'], ans:2, why:'La dérivation terme à terme ne vaut qu’à l’intérieur du disque de convergence, ici |x| < 1. Les termes n·2ⁿ tendent vers +∞ : la série diverge.'},
 ]},
 {n:'Séries alternées et erreur', r:'Séries alternées : contrôler l’erreur', qs:[
   {q:'S = 1 − 1/3 + 1/5 − 1/7 + … On l’approche par ses 3 premiers termes. Quelle majoration de l’erreur le critère des séries alternées donne-t-il ? (fraction ou décimale)', ans:1/7, tol:0.002, show:'1/7', why:'Les termes 1/(2n + 1) décroissent vers 0 avec des signes alternés. Le premier terme omis est 1/7 ≈ 0,143.'},
   {q:'Calcule 1 − 1/2² + 1/3² − 1/4², approximation de Σ (−1)ⁿ⁺¹/n². (4 décimales)', ans:115/144, tol:0.0002, show:'115/144 ≈ 0,7986', why:'1 − 0,25 + 0,1111 − 0,0625 = 115/144 ≈ 0,7986. L’erreur est au plus 1/25 = 0,04.'},
   {q:'Combien de termes de Σₙ₌₁^∞ (−1)ⁿ⁺¹/n² faut-il garder pour que le critère garantisse une erreur < 0,001 ?', unit:'termes', ans:31, why:'Avec N termes, le premier omis est 1/(N + 1)². Il faut (N + 1)² > 1000. 31² = 961 ne suffit pas, 32² = 1024 oui : N + 1 = 32, donc N = 31.'},
   {q:'Combien de termes de 1 − 1/3 + 1/5 − 1/7 + … faut-il garder pour que le critère garantisse une erreur < 0,01 ?', unit:'termes', ans:50, why:'Avec N termes (n = 0 à N − 1), le premier omis est 1/(2N + 1). Il faut 2N + 1 > 100, soit N ≥ 50. Avec 49 termes, il vaudrait 1/99 > 0,01.'},
   {q:'e^{−1} = Σ (−1)ⁿ/n!. Que vaut la somme des termes n = 0 à 4 ?', ans:0.375, tol:0.0005, show:'3/8', why:'1 − 1 + 1/2 − 1/6 + 1/24 = 9/24 = 0,375. L’erreur est au plus 1/5! = 1/120 ≈ 0,0083 (e^{−1} ≈ 0,3679).'},
   {q:'Approche sin(0,5) par x − x³/6. (4 décimales)', ans:0.4792, tol:0.0002, why:'0,5 − 0,125/6 = 0,5 − 0,02083 = 0,47917. Série alternée : l’erreur est au plus 0,5⁵/120 ≈ 0,00026.'},
   {q:'La série Σ (−1)ⁿ · n/(n + 1) est alternée. Converge-t-elle ?', opts:['Oui, d’après le critère des séries alternées','Oui, vers 0','Oui, vers 1/2','Non : ses termes n/(n + 1) tendent vers 1 et non vers 0'], ans:3, why:'Le critère exige des aₙ qui décroissent vers 0. Ici n/(n + 1) → 1 : le terme général ne tend pas vers 0, la série diverge.'},
 ]},
];
})();
