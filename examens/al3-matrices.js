/* Déclic — examen de compétence : Matrices 3 × 3 */
(()=>{
const M=A=>mat(A.map(r=>r.map(x=>fmt(x))));
EXAMS['al3-matrices']=[
 {n:'Coefficients, somme et colonnes', r:'Le tableau 3 × 3', qs:[
   {q:`Avec A = ${M([[2,-1,0],[3,4,1],[0,5,-2]])} et B = ${M([[1,0,3],[-2,1,1],[4,0,-1]])}, quel est le coefficient ligne 2, colonne 3 de 2A − B&nbsp;?`, lab:'coefficient =', ans:1, tol:.001, why:'On calcule terme à terme : 2a₂₃ − b₂₃ = 2 · 1 − 1 = 1.'},
   {q:`Dans A = ${M([[4,-2,7],[1,0,3],[-5,6,2]])}, combien vaut a₃₁ + a₁₃&nbsp;?`, lab:'a₃₁ + a₁₃ =', ans:2, tol:.001, why:'a₃₁ est en ligne 3, colonne 1 : −5. a₁₃ est en ligne 1, colonne 3 : 7. Somme : 2.'},
   {q:`Quelle est l’image de e₂ = (0 ; 1 ; 0) par la matrice ${M([[1,4,7],[2,5,8],[3,6,9]])}&nbsp;?`, opts:['(2 ; 5 ; 8)','(4 ; 5 ; 6)','(1 ; 2 ; 3)','(7 ; 8 ; 9)'], ans:1, why:'L’image de e₂ est la 2e colonne de la matrice : (4 ; 5 ; 6). (2 ; 5 ; 8) est la 2e ligne.'},
   {q:`Avec A = ${M([[2,1,0],[1,3,1],[0,1,4]])}, quel est le coefficient ligne 1, colonne 2 de 3I₃ − A&nbsp;?`, lab:'coefficient =', ans:-1, tol:.001, why:'I₃ n’a que des 0 hors de la diagonale : le coefficient vaut 3 · 0 − a₁₂ = −1.'},
 ]},
 {n:'Produit de deux matrices 3 × 3', r:'Poser un produit 3 × 3', qs:[
   {q:`Avec A = ${M([[1,2,0],[0,1,3],[2,0,1]])} et B = ${M([[2,1,0],[0,1,1],[1,0,2]])}, calcule le coefficient ligne 2, colonne 3 de AB.`, lab:'(AB)₂₃ =', ans:7, tol:.001, why:'Ligne 2 de A, (0 1 3), fois colonne 3 de B, (0 ; 1 ; 2) : 0 + 1 + 6 = 7.'},
   {q:`Avec A = ${M([[1,2,0],[0,1,3],[2,0,1]])} et B = ${M([[2,1,0],[0,1,1],[1,0,2]])}, calcule le coefficient ligne 2, colonne 3 de BA.`, lab:'(BA)₂₃ =', ans:4, tol:.001, why:'Ligne 2 de B, (0 1 1), fois colonne 3 de A, (0 ; 3 ; 1) : 0 + 3 + 1 = 4. Ce n’est pas (AB)₂₃ = 7 : l’ordre compte.'},
   {q:`Avec A = ${M([[1,2,0],[0,1,3],[2,0,1]])} et B = ${M([[2,1,0],[0,1,1],[1,0,2]])}, calcule le coefficient ligne 3, colonne 1 de AB.`, lab:'(AB)₃₁ =', ans:5, tol:.001, why:'Ligne 3 de A, (2 0 1), fois colonne 1 de B, (2 ; 0 ; 1) : 4 + 0 + 1 = 5.'},
   {q:`Que vaut ${M([[1,2,0],[0,1,3],[2,0,1]])} (1 ; −1 ; 2)&nbsp;?`, opts:['(1 ; −1 ; 4)','(−1 ; 5 ; 4)','(3 ; 5 ; 2)','(−1 ; 7 ; 4)'], ans:1, why:'Chaque ligne fois le vecteur : 1 − 2 + 0 = −1 ; 0 − 1 + 6 = 5 ; 2 + 0 + 2 = 4.'},
   {q:`Que vaut le produit ${M([[1,0,0],[0,2,0],[1,0,1]])} ${M([[1,1,0],[0,1,0],[0,0,3]])}&nbsp;?`, opts:[M([[1,1,0],[0,2,0],[1,0,3]]),M([[1,1,0],[0,2,0],[1,1,3]]),M([[1,0,0],[0,2,0],[1,0,3]]),M([[1,1,0],[0,2,0],[3,1,3]])], ans:1, why:'Ligne 1 (1 0 0) : (1 1 0). Ligne 2 (0 2 0) : (0 2 0). Ligne 3 (1 0 1) : 1·(1 1 0) + 1·(0 0 3) = (1 1 3).'},
   {q:'Pour calculer le coefficient (AB)₃₁, que multiplies-tu&nbsp;?', opts:['La ligne 1 de A par la colonne 3 de B','La ligne 3 de B par la colonne 1 de A','La ligne 3 de A par la colonne 1 de B','La colonne 3 de A par la ligne 1 de B'], ans:2, why:'(AB)ᵢⱼ = ligne i de A fois colonne j de B : ici la ligne 3 de A et la colonne 1 de B.'},
 ]},
 {n:'Transposée, diagonales et triangulaires', r:'Transposée, diagonales, triangulaires', qs:[
   {q:'Soit D = diag(−2, 1, 3). Quel est le coefficient ligne 1, colonne 1 de D⁵&nbsp;?', lab:'coefficient =', ans:-32, tol:.001, why:'diag(a, b, c)ⁿ = diag(aⁿ, bⁿ, cⁿ) : le coefficient vaut (−2)⁵ = −32.'},
   {q:'Laquelle de ces égalités est vraie pour toutes matrices A et B de taille 3 × 3&nbsp;?', opts:['ᵗ(AB) = ᵗA ᵗB','ᵗ(AB) = ᵗB ᵗA','ᵗ(AB) = AB','ᵗ(AB) = B ᵗA'], ans:1, why:'La transposée d’un produit inverse l’ordre : ᵗ(AB) = ᵗB ᵗA.'},
   {q:'Laquelle de ces matrices est symétrique&nbsp;?', opts:[M([[1,2,3],[2,4,5],[3,6,6]]),M([[1,2,3],[0,4,5],[0,0,6]]),M([[0,1,2],[-1,0,3],[-2,-3,0]]),M([[1,2,3],[2,4,5],[3,5,6]])], ans:3, why:'Il faut aᵢⱼ = aⱼᵢ pour tous i, j : seule la dernière vérifie a₁₂ = a₂₁ = 2, a₁₃ = a₃₁ = 3 et a₂₃ = a₃₂ = 5.'},
   {q:`Avec T = ${M([[2,5,-1],[0,3,4],[0,0,-1]])} et U = ${M([[1,7,2],[0,-2,6],[0,0,4]])}, quel est le coefficient ligne 2, colonne 2 de TU&nbsp;?`, lab:'(TU)₂₂ =', ans:-6, tol:.001, why:'T et U sont triangulaires supérieures : la diagonale du produit est le produit des diagonales, donc 3 · (−2) = −6.'},
   {q:`Soit A = ${M([[1,2,3],[4,5,6],[7,8,9]])}. Quel est le coefficient ligne 3, colonne 1 de ᵗA&nbsp;?`, lab:'coefficient =', ans:3, tol:.001, why:'La transposée échange lignes et colonnes : (ᵗA)₃₁ = a₁₃ = 3.'},
 ]},
 {n:'Matrice d’une transformation de l’espace', r:'Écrire la matrice d’une transformation de l’espace', qs:[
   {q:'La rotation de 90° autour de (Oz) envoie e₁ sur e₂. Quelle est l’image de (1 ; 2 ; 3)&nbsp;?', opts:['(2 ; −1 ; 3)','(−2 ; 1 ; 3)','(1 ; −3 ; 2)','(−1 ; −2 ; 3)'], ans:1, why:'Avec θ = 90° : R = (0 −1 0 ; 1 0 0 ; 0 0 1). R(1 ; 2 ; 3) = (−2 ; 1 ; 3) : z ne bouge pas.'},
   {q:'Quelle est la matrice de la symétrie par rapport au plan z = 0, qui envoie (x ; y ; z) sur (x ; y ; −z)&nbsp;?', opts:['diag(1, 1, 0)','diag(−1, −1, 1)','diag(1, 1, −1)','diag(0, 0, −1)'], ans:2, why:'Les colonnes sont les images : e₁ ↦ e₁, e₂ ↦ e₂, e₃ ↦ −e₃. D’où diag(1, 1, −1). diag(1, 1, 0) est la projection.'},
   {q:'L’application linéaire f vérifie f(e₁) = e₃, f(e₂) = e₁ et f(e₃) = e₂. Quelle est sa matrice&nbsp;?', opts:[M([[0,0,1],[1,0,0],[0,1,0]]),M([[0,1,0],[0,0,1],[1,0,0]]),M([[1,0,0],[0,0,1],[0,1,0]]),M([[0,1,0],[1,0,0],[0,0,1]])], ans:1, why:'On range les images en colonnes : (0 ; 0 ; 1), (1 ; 0 ; 0) et (0 ; 1 ; 0). La 1re option les range en lignes.'},
   {q:'Dans la matrice de la rotation d’angle 60° autour de (Oz), quel est le coefficient ligne 1, colonne 2&nbsp;? Arrondis au millième.', lab:'coefficient =', ans:-.866, tol:.0006, why:'R = (cos θ −sin θ 0 ; sin θ cos θ 0 ; 0 0 1). Le coefficient vaut −sin 60° = −√3/2 ≈ −0,866.'},
   {q:'Quelle est la troisième coordonnée de l’image de (2 ; −1 ; 5) par la rotation de 180° autour de (Ox)&nbsp;?', lab:'z =', ans:-5, tol:.001, why:'Avec θ = 180° : R = (1 0 0 ; 0 −1 0 ; 0 0 −1). L’image est (2 ; 1 ; −5).'},
   {q:'R est la rotation de 90° autour de (Oz) qui envoie e₁ sur e₂, et S la symétrie par rapport au plan z = 0. Que vaut SRe₂&nbsp;?', opts:['(1 ; 0 ; 0)','(0 ; 0 ; −1)','(−1 ; 0 ; 0)','(0 ; 1 ; 0)'], ans:2, why:'On applique R d’abord : Re₂ = −e₁ = (−1 ; 0 ; 0). Ce vecteur est dans le plan z = 0, donc S le laisse fixe.'},
 ]},
 {n:'Projection orthogonale sur un plan', r:'Projeter orthogonalement sur un plan', qs:[
   {q:'Quelle est la première coordonnée du projeté orthogonal de <i>w</i> = (2 ; 1 ; −1) sur le plan <i>x</i> + 2<i>y</i> + 2<i>z</i> = 0&nbsp;?', lab:'x =', ans:16/9, tol:.001, show:'16/9', why:'n = (1 ; 2 ; 2), w · n = 2 + 2 − 2 = 2, n · n = 9. p(w) = w − (2/9)n = (16/9 ; 5/9 ; −13/9). Contrôle : 16/9 + 10/9 − 26/9 = 0.'},
   {q:'Quelle est la matrice de la projection orthogonale sur le plan <i>x</i> = 0&nbsp;?', opts:['diag(1, 0, 0)','diag(0, 1, 1)','diag(1, 1, 0)','diag(−1, 1, 1)'], ans:1, why:'La projection annule x et garde y et z : e₁ ↦ 0, e₂ ↦ e₂, e₃ ↦ e₃. D’où diag(0, 1, 1).'},
   {q:'Quelle propriété vérifie toute matrice P de projection&nbsp;?', opts:['P² = I','P² = P','ᵗP = −P','det P = 1'], ans:1, why:'Projeter deux fois revient à projeter une fois : p ∘ p = p, soit P² = P.'},
   {q:'Quelle est la deuxième coordonnée du projeté orthogonal de <i>w</i> = (4 ; 0 ; 1) sur le plan <i>x</i> − <i>y</i> = 0&nbsp;?', lab:'y =', ans:2, tol:.001, why:'n = (1 ; −1 ; 0), w · n = 4, n · n = 2. p(w) = (4 ; 0 ; 1) − 2(1 ; −1 ; 0) = (2 ; 2 ; 1). Contrôle : 2 − 2 = 0.'},
   {q:'Quel est le déterminant de la matrice de la projection orthogonale sur le plan 2<i>x</i> − <i>y</i> + 3<i>z</i> = 0&nbsp;?', lab:'det P =', ans:0, tol:.001, why:'La projection envoie la normale (2 ; −1 ; 3) sur 0 : elle n’est pas inversible, donc det P = 0.'},
 ]},
 {n:'Puissances de I + N', r:'Puissances de I + N quand N est nilpotente', qs:[
   {q:`Avec A = ${M([[1,1,1],[0,1,1],[0,0,1]])}, quel est le coefficient en haut à droite de A⁵&nbsp;?`, lab:'coefficient =', ans:15, tol:.001, why:'A = I + N, N = (0 1 1 ; 0 0 1 ; 0 0 0), N² = (0 0 1 ; 0 0 0 ; 0 0 0), N³ = 0. A⁵ = I + 5N + 10N² : le coin vaut 5 · 1 + 10 · 1 = 15.'},
   {q:`Soit N = ${M([[0,3,0],[0,0,2],[0,0,0]])}. Quel est le coefficient en haut à droite de N²&nbsp;?`, lab:'coefficient =', ans:6, tol:.001, why:'Ligne 1 de N, (0 3 0), fois colonne 3 de N, (0 ; 2 ; 0) : 3 · 2 = 6. Les autres coefficients de N² sont nuls, et N³ = 0.'},
   {q:`Avec A = ${M([[1,0,2],[0,1,0],[0,0,1]])}, quel est le coefficient en haut à droite de A¹⁰&nbsp;?`, lab:'coefficient =', ans:20, tol:.001, why:'A = I + N avec N = (0 0 2 ; 0 0 0 ; 0 0 0). Ici N² = 0 déjà, donc A¹⁰ = I + 10N : le coin vaut 20.'},
   {q:`Avec A = ${M([[2,1,0],[0,2,1],[0,0,2]])} = 2I + N, quel est le coefficient en haut à droite de A³&nbsp;?`, lab:'coefficient =', ans:6, tol:.001, why:'2I commute avec N et N³ = 0 : A³ = 8I + 3 · 4N + 3 · 2N². Seul N² = (0 0 1 ; 0 0 0 ; 0 0 0) touche le coin : 6.'},
 ]},
];
})();
