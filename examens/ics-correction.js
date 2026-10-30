/* Déclic — examen de compétence : Correction et terminaison */
(()=>{
const cc=s=>`<code class="code">${esc(s)}</code>`;
EXAMS['ics-correction']=[
 {n:'Reconnaître un invariant de boucle', r:'L’invariant reste vrai à chaque tour', qs:[
   {q:'Un invariant de boucle est une propriété…', opts:['vraie seulement à la sortie de la boucle','qui décroît strictement à chaque tour','vraie avant la boucle et après chaque tour','vraie avant la boucle, mais pas forcément après les tours'], ans:2,
    why:'Un invariant est vrai avant le premier tour et reste vrai après chaque tour. C’est le variant, pas l’invariant, qui décroît.'},
   {q:'Quelle propriété est un invariant de cette boucle&nbsp;?', fig:py(`
s, k = 0, 0
while k < n:
    k = k + 1
    s = s + 3`),
    opts:['s = 3k','s = 3n','s = k + 3','s = 3(k + 1)'], ans:0,
    why:'Au départ, 0 = 3 · 0. Si s = 3k au début d’un tour, après le tour s + 3 = 3(k + 1) et k vaut k + 1 : s = 3k est conservé. s = 3n n’est vrai qu’à la sortie.'},
   {q:'Dans cette boucle, quelle relation lie <i>a</i> et <i>k</i> à chaque tour&nbsp;?', fig:py(`
a, k = 5, 0
while k < n:
    a = a + 4
    k = k + 1`),
    opts:['a = 4k','a = 5 + 4k','a = 5 + 4n','a = 9k'], ans:1,
    why:'Au départ, a = 5 = 5 + 4 · 0. Chaque tour ajoute 4 à a et 1 à k, donc 5 + 4k suit a exactement.'},
   {q:'À la sortie d’une boucle <code class="code">while</code>, qu’est-ce qui permet de conclure sur le résultat&nbsp;?', opts:['L’invariant seul','La négation de la condition seule','Le variant','L’invariant et la négation de la condition'], ans:3,
    why:'L’invariant dit ce qui relie les variables, la condition devenue fausse dit où on s’est arrêté. C’est leur combinaison qui donne le résultat.'},
   {q:'Quelle propriété reste vraie avant et après chaque tour de cette boucle&nbsp;?', fig:py(`
x, y = 0, 10
while x < y:
    x = x + 1
    y = y - 1`),
    opts:['x &lt; y','x = y','x + y = 10','y = 10 − 2x'], ans:2,
    why:'Au départ 0 + 10 = 10, et chaque tour fait +1 sur x et −1 sur y : la somme reste 10. x &lt; y est faux à la sortie, et y = 10 − 2x est faux dès le premier tour (9 ≠ 8).'},
   {q:'Que vaut <i>x</i> à la sortie de cette boucle&nbsp;?', fig:py(`
x, y = 0, 10
while x < y:
    x = x + 1
    y = y - 1`),
    lab:'x =', ans:5,
    why:'Invariant : x + y = 10. À la sortie, x ≥ y. Comme x et y bougent d’une unité chacun, on s’arrête dès que x = y, donc 2x = 10 et x = 5.'},
 ]},
 {n:'Prouver avec un invariant', r:'Une preuve en trois temps', qs:[
   {q:'Dans quel ordre fait-on la preuve d’un invariant de boucle&nbsp;?', opts:['Conservation, puis sortie, puis initialisation','Initialisation, puis conservation, puis sortie','Sortie, puis initialisation','Seulement la conservation'], ans:1,
    why:'On vérifie qu’il est vrai avant la boucle (initialisation), qu’un tour le préserve (conservation), puis on le combine avec la condition fausse (sortie).'},
   {q:'On veut prouver que <b>r = 3ᵏ</b> est conservé par cette boucle. On suppose r = 3ᵏ au début d’un tour. Que faut-il vérifier&nbsp;?', fig:py(`
r, k = 1, 0
while k < n:
    r = 3 * r
    k = k + 1`),
    opts:['Que 3r = 3ᵏ','Que r = 3ⁿ','Que 3r = 3ᵏ⁺¹, puisque k devient k + 1','Seulement que k + 1 ≤ n'], ans:2,
    why:'Après le tour, r vaut 3r et k vaut k + 1. Il faut donc 3r = 3ᵏ⁺¹, ce qui découle de r = 3ᵏ.'},
   {q:'Pour la boucle (<code class="code">r, k = 1, 0</code>, puis <code class="code">r = 3 * r</code> et <code class="code">k = k + 1</code>), un élève propose l’invariant <b>r = 3ᵏ⁺¹</b>. Quelle étape de la preuve échoue&nbsp;?', opts:['La conservation','La sortie','L’initialisation','Aucune, l’invariant est correct'], ans:2,
    why:'Avant la boucle, r = 1 et 3⁰⁺¹ = 3 : c’est faux. La conservation, elle, marche (3 · 3ᵏ⁺¹ = 3ᵏ⁺²), mais un invariant doit d’abord être vrai au départ.'},
   {q:'La boucle est <code class="code">while k &lt; n</code> et <i>k</i> augmente de 1 à chaque tour, en partant de 0. Pourquoi ajoute-t-on « k ≤ n » à l’invariant&nbsp;?', opts:['Pour prouver la terminaison','Parce que k est un entier','Pour conclure k = n à la sortie, avec k ≥ n','Ce n’est jamais utile'], ans:2,
    why:'À la sortie, la condition fausse donne k ≥ n. Avec k ≤ n venant de l’invariant, on obtient k = n, et on peut remplacer k par n dans le reste de l’invariant.'},
   {q:'L’invariant de cette boucle est « s = 5i et i ≤ n ». Que vaut <i>s</i> à la sortie, pour un entier n ≥ 0&nbsp;?', fig:py(`
s, i = 0, 0
while i < n:
    i = i + 1
    s = s + 5`),
    opts:['5i, sans plus de précision','5n','5(n − 1)','n'], ans:1,
    why:'À la sortie, i ≥ n (condition fausse) et i ≤ n (invariant), donc i = n et s = 5n.'},
   {q:'Un élève teste sa fonction pour n = 1, 2, …, 20 et obtient toujours le bon résultat. Que peut-il en conclure&nbsp;?', opts:['La fonction est prouvée correcte','Elle est correcte pour tout n ≤ 1000','Rien n’est prouvé pour les autres valeurs : une preuve doit couvrir toutes les entrées','Elle termine forcément pour tout n'], ans:2,
    why:'Des tests peuvent trouver une erreur, jamais prouver l’absence d’erreur. Seule une preuve (invariant et variant) couvre toutes les entrées d’un coup.'},
 ]},
 {n:'Prouver l’arrêt avec un variant', r:'Le variant garantit l’arrêt', qs:[
   {q:'Un variant de boucle est…', opts:['un réel positif qui diminue à chaque tour','une quantité qui reste constante pendant la boucle','une quantité qui augmente à chaque tour','une quantité entière, ≥ 0, qui décroît strictement à chaque tour'], ans:3,
    why:'Il faut un <b>entier</b> ≥ 0 qui décroît strictement : une telle suite est finie. Un réel peut diminuer indéfiniment (1, 1/2, 1/4…) sans jamais atteindre 0.'},
   {q:'Avec <i>n</i> entier ≥ 1, quel est un variant de cette boucle&nbsp;?', fig:py(`
i = 1
while i < n:
    i = 3 * i`),
    opts:['i','n − i','n','3i'], ans:1,
    why:'Dans la boucle, i &lt; n, donc n − i est un entier &gt; 0, et il baisse strictement car i augmente. i et 3i augmentent, n ne bouge pas.'},
   {q:'On part de i = 0. Pour combien de valeurs de <i>n</i> entre 0 et 20 (inclus) cette boucle s’arrête-t-elle&nbsp;?', fig:py(`
i = 0
while i != n:
    i = i + 3`),
    lab:'valeurs =', ans:7,
    why:'i prend les valeurs 0, 3, 6, … Elle s’arrête seulement si n est un multiple de 3 : 0, 3, 6, 9, 12, 15, 18, soit 7 valeurs. Sinon i saute par-dessus n.'},
   {q:'Pour quels entiers <i>n</i> ≥ 0 cette boucle s’arrête-t-elle&nbsp;?', fig:py(`
x = n
while x > 0:
    x = x - 2`),
    opts:['Pour n pair seulement','Pour tout n','Pour n impair seulement','Pour aucun n'], ans:1,
    why:'La condition est x &gt; 0 et non x ≠ 0. Dans la boucle x est un entier &gt; 0 qui baisse de 2 : c’est un variant. Pour n impair, x passe de 1 à −1 et la boucle s’arrête aussi.'},
   {q:'Que fait cette boucle&nbsp;?', fig:py(`
i = 10
while i > 0:
    if i % 2 == 0:
        i = i - 1
    else:
        i = i + 1`),
    opts:['Elle fait 10 tours','Elle fait 5 tours','Elle fait 1 tour','Elle ne s’arrête jamais'], ans:3,
    why:'i passe de 10 à 9 (pair, on retire 1), puis de 9 à 10 (impair, on ajoute 1), et ainsi de suite. i ne décroît pas strictement : ce n’est pas un variant, et la boucle tourne sans fin.'},
   {q:'Avec n = 50 au départ, combien de tours fait cette boucle&nbsp;?', fig:py(`
k = 0
while n > 0:
    n = n - 7
    k = k + 1`),
    lab:'tours =', ans:8,
    why:'n prend les valeurs 50, 43, 36, 29, 22, 15, 8, 1, puis −6. Il y a un tour par valeur &gt; 0 : 8 tours.'},
 ]},
 {n:'L’algorithme d’Euclide', r:'Compte les tours', qs:[
   {q:'Combien de tours de boucle fait '+cc('pgcd(1260, 198)')+' (algorithme d’Euclide du cours)&nbsp;?', lab:'tours =', ans:4,
    why:'1260 mod 198 = 72, 198 mod 72 = 54, 72 mod 54 = 18, 54 mod 18 = 0. Quatre tours : (1260, 198) → (198, 72) → (72, 54) → (54, 18) → (18, 0).'},
   {q:'Que renvoie '+cc('pgcd(391, 299)')+'&nbsp;?', lab:'pgcd =', ans:23,
    why:'391 mod 299 = 92, 299 mod 92 = 23, 92 mod 23 = 0. On s’arrête sur (23, 0) et on renvoie 23.'},
   {q:'Combien de tours fait '+cc('pgcd(30, 84)')+', où le premier nombre est le plus petit&nbsp;?', lab:'tours =', ans:4,
    why:'Premier tour : 30 mod 84 = 30, donc (30, 84) → (84, 30) : les nombres sont simplement échangés. Puis (30, 24), (24, 6), (6, 0). Quatre tours en tout.'},
   {q:'Quel invariant prouve que l’algorithme d’Euclide renvoie le bon résultat&nbsp;?', opts:['a &gt; b','pgcd(a, b) = pgcd(a₀, b₀), où a₀ et b₀ sont les valeurs de départ','b divise a','a + b reste constant'], ans:1,
    why:'pgcd(a, b) = pgcd(b, a mod b), donc le pgcd ne change pas d’un tour à l’autre. À la sortie b = 0 et pgcd(a, 0) = a.'},
   {q:'Pourquoi <i>b</i> est-il un variant de l’algorithme d’Euclide&nbsp;?', opts:['Car b est toujours pair','Car a diminue à chaque tour','Car b ne change jamais','Car le nouveau b vaut a mod b, qui est un entier ≥ 0 strictement inférieur à b'], ans:3,
    why:'Le reste de la division par b vérifie 0 ≤ a mod b &lt; b. b est donc un entier ≥ 0 qui baisse strictement à chaque tour : la boucle s’arrête.'},
   {q:'On calcule '+cc('pgcd(144, b)')+' pour b entre 1 et 100. Quelle valeur de b donne le plus de tours&nbsp;?', opts:['72','99','55','89'], ans:3,
    why:'89 et 144 sont deux nombres de Fibonacci consécutifs : tous les quotients valent 1 et b décroît le plus lentement possible. (144, 89) → (89, 55) → … → (1, 0) : 10 tours, contre 1 pour b = 72 et 3 pour b = 99.'},
 ]},
 {n:'Trouver un invariant avec un tableau', r:'Trouver un invariant avec un tableau', qs:[
   {q:'Que renvoie <code class="code">g(10)</code>&nbsp;?', fig:py(`
def g(n):
    s, k = 0, 0
    while k < n:
        k = k + 1
        s = s + 4 * k
    return s`),
    lab:'g(10) =', ans:220,
    why:'Tableau : k = 0, 1, 2, 3 donne s = 0, 4, 12, 24, soit s = 2k(k + 1). La conservation marche : 2k(k + 1) + 4(k + 1) = 2(k + 1)(k + 2). À la sortie k = 10, donc s = 2 · 10 · 11 = 220.'},
   {q:'Que renvoie <code class="code">h(9)</code>&nbsp;?', fig:py(`
def h(n):
    s, k = 1, 0
    while k < n:
        k = k + 1
        s = 2 * s + 1
    return s`),
    lab:'h(9) =', ans:1023,
    why:'Tableau : s = 1, 3, 7, 15 pour k = 0, 1, 2, 3, d’où l’invariant s = 2ᵏ⁺¹ − 1. Conservation : 2(2ᵏ⁺¹ − 1) + 1 = 2ᵏ⁺² − 1. À la sortie k = 9, s = 2¹⁰ − 1 = 1023.'},
   {q:'Fais tourner cette boucle à la main. Quel invariant relie <i>s</i> et <i>k</i>&nbsp;?', fig:py(`
s, k = 0, 0
while k < n:
    k = k + 1
    s = s + k * k * k`),
    opts:['s = k³','s = (k(k + 1)/2)²','s = k²(k + 1)','s = k⁴/4'], ans:1,
    why:'Tableau : s = 0, 1, 9, 36, 100 pour k = 0 à 4. Ce sont les carrés de 0, 1, 3, 6, 10, c’est-à-dire de k(k + 1)/2. Les autres formules échouent dès k = 1 ou k = 2.'},
   {q:'Quel invariant permet de prouver ce que renvoie <i>f</i>&nbsp;?', fig:py(`
def f(n):
    a, b = 0, n
    while b > 0:
        a = a + 3
        b = b - 1
    return a`),
    opts:['a = 3b','a + b = n','a + 3b = 3n','a = 3n'], ans:2,
    why:'Au départ 0 + 3n = 3n. Un tour fait +3 sur a et −1 sur b, donc a + 3b ne change pas. À la sortie b = 0, d’où a = 3n. a = 3n n’est vrai qu’à la fin.'},
   {q:'Que renvoie <code class="code">q(20)</code>&nbsp;?', fig:py(`
def q(n):
    s, k = 0, 0
    while k < n:
        k = k + 1
        s = s + k + 1
    return s`),
    lab:'q(20) =', ans:230,
    why:'Tableau : s = 0, 2, 5, 9, 14, soit s = k(k + 3)/2 (la somme 1 + … + k, plus k). Conservation : k(k + 3)/2 + k + 2 = (k + 1)(k + 4)/2. À la sortie, q(20) = 20 · 23 / 2 = 230.'},
   {q:'Ici <i>k</i> part de 1. Quel est un invariant de la boucle&nbsp;?', fig:py(`
s, k = 0, 1
while k <= n:
    s = s + k
    k = k + 1`),
    opts:['s = k(k + 1)/2','s = n(n + 1)/2','s = k(k − 1)/2','s = k²/2'], ans:2,
    why:'Tableau : (k, s) = (1, 0), (2, 1), (3, 3), (4, 6). s est la somme des entiers &lt; k, soit k(k − 1)/2. À la sortie k = n + 1, et on retrouve s = n(n + 1)/2. Le piège : k(k + 1)/2 est faux au départ (1 ≠ 0).'},
 ]},
];
})();
