/* Déclic — examen de compétence : Le groupe des permutations */
(()=>{
// Écriture en deux lignes : en haut 1, …, n, en bas les images
const L2=b=>mat([b.map((_,i)=>i+1),b]);
const CONV=' (convention : στ = σ ∘ τ, on applique τ d’abord)';
EXAMS['gred-permutations']=[
 {n:'Composer et inverser', r:'Composer deux permutations en deux lignes', qs:[
   {q:'σ = '+L2([2,4,1,3])+' et τ = '+L2([3,2,4,1])+'. Que vaut στ'+CONV+'&nbsp;?', opts:[L2([2,1,3,4]),L2([1,4,3,2]),L2([4,2,1,3]),L2([3,4,2,1])], ans:1, why:'στ(1) = σ(3) = 1, στ(2) = σ(2) = 4, στ(3) = σ(4) = 3, στ(4) = σ(1) = 2. La première option est τσ : c’est l’erreur d’ordre.'},
   {q:'σ = '+L2([4,1,3,5,2])+' et τ = '+L2([2,3,1,5,4])+'. Que vaut (τσ)(1)'+CONV+'&nbsp;?', lab:'(τσ)(1) =', ans:5, why:'Dans τσ, on applique σ d’abord : σ(1) = 4, puis τ(4) = 5.'},
   {q:'Quelle est la réciproque de σ = '+L2([3,1,4,2])+'&nbsp;?', opts:[L2([3,1,4,2]),L2([2,4,3,1]),L2([2,4,1,3]),L2([4,2,3,1])], ans:2, why:'σ(2) = 1 donne σ⁻¹(1) = 2, σ(4) = 2 donne σ⁻¹(2) = 4, σ(1) = 3 donne σ⁻¹(3) = 1, σ(3) = 4 donne σ⁻¹(4) = 3 : on échange les lignes et on remet le haut dans l’ordre.'},
   {q:'Combien d’éléments a le groupe symétrique S₆&nbsp;?', lab:'card S₆ =', ans:720, why:'6 choix pour σ(1), puis 5, 4, 3, 2, 1 : 6! = 720.'},
 ]},
 {n:'Cycles disjoints', r:'Décomposer en cycles disjoints', qs:[
   {q:'Quelle est la décomposition en cycles disjoints de σ = '+L2([5,3,2,6,1,4])+'&nbsp;?', opts:['(1 5 3 2 6 4)','(1 5)(2 3)(4 6)','(1 5)(2 3 6 4)','(1 2)(3 5)(4 6)'], ans:1, why:'1 → 5 → 1, puis 2 → 3 → 2, puis 4 → 6 → 4 : σ = (1 5)(2 3)(4 6).'},
   {q:'Quelle est la décomposition en cycles disjoints de σ = '+L2([4,1,6,2,5,3,8,7])+'&nbsp;?', opts:['(1 2 4)(3 6)(7 8)','(1 4 2)(3 6)(5)(7 8 5)','(1 4 2)(3 6)(7 8)','(1 4)(2 1)(3 6)(7 8)'], ans:2, why:'1 → 4 → 2 → 1 donne (1 4 2), puis 3 → 6 → 3, 5 est fixe, 7 → 8 → 7. (1 2 4) serait σ⁻¹ sur ces trois éléments.'},
   {q:'σ = (1 3 5)(2 4) ∈ S₅. Que vaut σ(5)&nbsp;?', lab:'σ(5) =', ans:1, why:'Le cycle (1 3 5) envoie 5 sur le premier élément, 1. En deux lignes : σ = '+L2([3,4,5,2,1])+'.'},
   {q:'Que vaut le produit (1 2 3)(2 3 4)'+CONV+'&nbsp;?', opts:['(1 3)(2 4)','(1 2)(3 4)','(1 2 3 4)','(1 3 4 2)'], ans:1, why:'On applique (2 3 4) d’abord. 1 → 1 → 2 ; 2 → 3 → 1 ; 3 → 4 → 4 ; 4 → 2 → 3. Donc 1 ↦ 2, 2 ↦ 1, 3 ↦ 4, 4 ↦ 3 : (1 2)(3 4). Dans l’autre ordre, on trouverait (1 3)(2 4).'},
 ]},
 {n:'Ordre d’une permutation', r:'L’ordre d’une permutation', qs:[
   {q:'Quel est l’ordre de σ = (1 2 3 4)(5 6 7)&nbsp;?', lab:'ordre =', ans:12, why:'ppcm(4 ; 3) = 12. Ce n’est pas 4 + 3 = 7.'},
   {q:'Quel est l’ordre de σ = '+L2([2,1,4,5,6,3])+'&nbsp;?', lab:'ordre =', ans:4, why:'σ = (1 2)(3 4 5 6), donc l’ordre vaut ppcm(2 ; 4) = 4.'},
   {q:'Quel est le plus grand ordre possible d’un élément de S₇&nbsp;?', lab:'ordre max =', ans:12, why:'On découpe 7 en longueurs de cycles : 4 + 3 donne ppcm 12, mieux que 7 (un 7-cycle), 5 + 2 (10) ou 3 + 2 + 2 (6). Exemple : (1 2 3 4)(5 6 7).'},
   {q:'σ = (1 2 3)(4 5). Que vaut σ¹⁰⁰(1)&nbsp;?', lab:'σ¹⁰⁰(1) =', ans:2, why:'Le 3-cycle revient en place tous les 3 pas : 100 = 33 × 3 + 1, donc (1 2 3)¹⁰⁰ = (1 2 3) et σ¹⁰⁰(1) = 2. La transposition (4 5) ne touche pas 1.'},
 ]},
 {n:'Produits de transpositions', r:'Écrire une permutation comme produit de transpositions', qs:[
   {q:'Comment s’écrit le cycle (1 4 2 5) comme produit de transpositions'+CONV+'&nbsp;?', opts:['(1 4)(4 2)(2 5)','(2 5)(4 2)(1 4)','(1 4)(2 5)','(1 5)(4 2)'], ans:0, why:'(<i>a</i>₁ <i>a</i>₂ … <i>a<sub>k</sub></i>) = (<i>a</i>₁ <i>a</i>₂)(<i>a</i>₂ <i>a</i>₃)…. Contrôle sur 5 : (2 5) l’envoie sur 2, (4 2) sur 4, (1 4) sur 1. Et le cycle envoie bien 5 sur 1.'},
   {q:'Que vaut le produit (1 3)(1 2)'+CONV+'&nbsp;?', opts:['(1 3 2)','(1 2 3)','(1 2)(1 3)','(2 3)'], ans:1, why:'(1 2) d’abord : 1 → 2 → 2 ; 2 → 1 → 3 ; 3 → 3 → 1. Donc 1 ↦ 2, 2 ↦ 3, 3 ↦ 1 : (1 2 3).'},
   {q:'Que vaut le produit (2 4)(1 2)'+CONV+'&nbsp;?', opts:['(1 2 4)','(1 4)','(1 4 2)','(1 2)(2 4)'], ans:2, why:'(1 2) d’abord : 1 → 2 → 4 ; 2 → 1 → 1 ; 4 → 4 → 2. Donc 1 ↦ 4, 4 ↦ 2, 2 ↦ 1 : (1 4 2).'},
   {q:'σ = (1 5 3)(2 7 4 6) ∈ S₇. Avec la méthode du cours, combien de transpositions obtient-on&nbsp;?', lab:'nombre :', ans:5, why:'Le 3-cycle donne 2 transpositions et le 4-cycle 3, soit 5. Formule : <i>n</i> − <i>c</i> = 7 − 2 = 5 (aucun point fixe).'},
 ]},
 {n:'Inversions', r:'Compter les inversions', qs:[
   {q:'Combien d’inversions a σ = '+L2([3,5,1,4,2])+'&nbsp;?', lab:'inversions =', ans:6, why:'3 : (1, 2) → 2 ; 5 : (1, 4, 2) → 3 ; 1 : 0 ; 4 : (2) → 1 ; 2 : 0. Total 6.'},
   {q:'Combien d’inversions a σ = '+L2([2,4,1,5,3,6])+'&nbsp;?', lab:'inversions =', ans:4, why:'2 : (1) → 1 ; 4 : (1, 3) → 2 ; 1 : 0 ; 5 : (3) → 1 ; 3 : 0 ; 6 : 0. Total 4 : σ est paire.'},
   {q:'Combien d’inversions a σ = '+L2([5,4,3,2,1])+'&nbsp;?', lab:'inversions =', ans:10, why:'Toutes les paires sont inversées : 4 + 3 + 2 + 1 + 0 = 10.'},
   {q:'Combien d’inversions a la transposition (2 5) dans S₅&nbsp;?', lab:'inversions =', ans:5, why:'En deux lignes : '+L2([1,5,3,4,2])+'. 5 : (3, 4, 2) → 3 ; 3 : (2) → 1 ; 4 : (2) → 1. Total 5 = 2(5 − 2 − 1) + 1, un nombre impair.'},
 ]},
 {n:'Signature', r:'Calculer une signature par les cycles', qs:[
   {q:'Quelle est la signature de σ = (1 2 3 4)(5 6)&nbsp;?', lab:'ε(σ) =', ans:1, why:'Le 4-cycle a pour signature (−1)³ = −1, la transposition −1. Produit : 1, σ est paire.'},
   {q:'Quelle est la signature de σ = '+L2([6,1,4,3,2,5])+'&nbsp;?', lab:'ε(σ) =', ans:1, why:'1 → 6 → 5 → 2 → 1 et 3 → 4 → 3 : σ = (1 6 5 2)(3 4). ε = (−1)³ · (−1) = 1. Contrôle : <i>n</i> − <i>c</i> = 6 − 2 = 4, pair.'},
   {q:'Quelle est la signature d’un cycle de longueur 6&nbsp;?', lab:'ε =', ans:-1, why:'Un <i>k</i>-cycle est un produit de <i>k</i> − 1 transpositions : (−1)⁵ = −1. Un cycle de longueur paire est impair.'},
   {q:'ε(σ) = −1 et ε(τ) = 1. Que vaut ε(σ³τ)&nbsp;?', lab:'ε(σ³τ) =', ans:-1, why:'ε est un homomorphisme : ε(σ³τ) = ε(σ)³ ε(τ) = (−1)³ · 1 = −1.'},
   {q:'Peut-on écrire l’identité comme produit de 7 transpositions&nbsp;?', opts:['Oui, en répétant 7 fois la même','Non : un tel produit a pour signature (−1)⁷ = −1, alors que ε(id) = 1','Oui, si elles sont disjointes','Non, car 7 est premier'], ans:1, why:'La parité du nombre de transpositions ne dépend pas de la décomposition. (1 2) répétée 7 fois donne (1 2), pas id.'},
 ]},
 {n:'Le groupe alterné', r:'Le groupe alterné', qs:[
   {q:'Combien d’éléments a le groupe alterné A₅&nbsp;?', lab:'card A₅ =', ans:60, why:'card A<sub><i>n</i></sub> = <i>n</i>!/2 = 120/2 = 60, car S₅/A₅ ≅ {1 ; −1}.'},
   {q:'Laquelle de ces permutations appartient à A₅&nbsp;?', opts:['(1 2 3 4)','(1 2)(3 4)','(1 2)','(1 2 3)(4 5)'], ans:1, why:'(1 2)(3 4) : (−1) · (−1) = 1, paire. (1 2 3 4) : (−1)³ = −1 ; (1 2) : −1 ; (1 2 3)(4 5) : 1 · (−1) = −1.'},
   {q:'Pourquoi A<sub><i>n</i></sub> est-il distingué dans S<sub><i>n</i></sub>&nbsp;?', opts:['Parce que S<sub><i>n</i></sub> est commutatif','Parce que c’est le noyau de l’homomorphisme signature','Parce qu’il contient l’identité','Parce qu’il contient toutes les transpositions'], ans:1, why:'A<sub><i>n</i></sub> = ker ε, et un noyau est toujours distingué. S<sub><i>n</i></sub> n’est pas commutatif pour <i>n</i> ≥ 3, et A<sub><i>n</i></sub> ne contient aucune transposition.'},
   {q:'Dans un taquin 3 × 3, la case vide est à sa place et seules les pièces 1, 2, 3 ont tourné : 1 est à la place de 2, 2 à celle de 3, 3 à celle de 1. La condition nécessaire « permutation paire » est-elle satisfaite&nbsp;?', opts:['Non, car trois pièces ont bougé','Oui : c’est un 3-cycle, de signature (−1)² = 1','Non : un 3-cycle est impair','On ne peut pas savoir'], ans:1, why:'La permutation des cases est un 3-cycle, produit de 2 transpositions : elle est paire. La condition nécessaire est satisfaite (contrairement à l’échange de deux pièces).'},
 ]},
];
})();
