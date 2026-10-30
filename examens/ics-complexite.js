/* Déclic — examen de compétence : Complexité et notation grand-O */
(()=>{
EXAMS['ics-complexite']=[
 {n:'Compter les tours de boucles imbriquées', r:'Compter les tours d’une double boucle dépendante', qs:[
   {q:'Combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 40&nbsp;?'+py(`
c = 0
for i in range(n):
    for j in range(5):
        c += 1`),
    lab:'c =', ans:200,
    why:'La boucle intérieure fait toujours 5 tours, quel que soit i : on multiplie, 40 × 5 = 200.'},
   {q:'Combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 50&nbsp;?'+py(`
c = 0
for i in range(n):
    for j in range(i + 1, n):
        c += 1`),
    lab:'c =', ans:1225,
    why:'Pour i fixé, j fait n − 1 − i tours : (n − 1) + (n − 2) + … + 0 = n(n − 1)/2. Pour n = 50 : 50 × 49 / 2 = 1225.'},
   {q:'Combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 15&nbsp;?'+py(`
c = 0
for i in range(1, n + 1):
    for j in range(2 * i):
        c += 1`),
    lab:'c =', ans:240,
    why:'Pour i fixé, 2i tours. Total 2(1 + 2 + … + n) = n(n + 1). Pour n = 15 : 15 × 16 = 240.'},
   {q:'Que vaut <i>c</i> à la fin pour <i>n</i> = 10&nbsp;?'+py(`
c = 0
for i in range(n):
    for j in range(i):
        c += 3`),
    lab:'c =', ans:135,
    why:'La ligne c += 3 s’exécute 0 + 1 + … + 9 = 10 × 9 / 2 = 45 fois, et ajoute 3 à chaque fois : c = 3 × 45 = 135.'},
   {q:'Combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 100&nbsp;?'+py(`
c = 0
for i in range(n):
    c += 1
for j in range(n):
    c += 1`),
    lab:'c =', ans:200,
    why:'Les deux boucles sont l’une après l’autre, pas imbriquées : on additionne, 100 + 100 = 200. C’est O(n), pas O(n²).'},
 ]},
 {n:'Simplifier en grand-O', r:'Simplifier en grand-O', qs:[
   {q:'Quelle est la complexité de f(n) = 5n + 3 n log₂ n + 20&nbsp;?', opts:['O(n)','O(n log n)','O(3 n log n)','O(n²)'], ans:1,
    why:'Sur l’échelle, n &lt; n log n : le terme dominant est 3 n log₂ n, et on enlève la constante 3. f(n) = O(n log n).'},
   {q:'Quelle est la complexité de f(n) = (n + 1)(n + 2)(n + 3)/6&nbsp;?', opts:['O(n)','O(n²)','O(n³)','O(n⁴)'], ans:2,
    why:'En développant, le terme de plus haut degré est n³/6. On enlève la constante 1/6 : O(n³).'},
   {q:'Quelle est la complexité de f(n) = 50 n³ + 2ⁿ&nbsp;?', opts:['O(n³)','O(50 n³)','O(n³ + 2ⁿ)','O(2ⁿ)'], ans:3,
    why:'Sur l’échelle, n³ &lt; 2ⁿ : l’exponentielle finit par écraser n’importe quel polynôme, même multiplié par 50. f(n) = O(2ⁿ).'},
   {q:'Quelle est la complexité de f(n) = 1000 + 4 log₂ n&nbsp;?', opts:['O(1)','O(log n)','O(n)','O(1000)'], ans:1,
    why:'La constante 1000 ne grandit pas, alors que log₂ n tend vers l’infini. Le terme dominant est 4 log₂ n : O(log n).'},
   {q:'D’après la définition (f(n) ≤ C·g(n) pour n assez grand), laquelle de ces affirmations est vraie&nbsp;?', opts:['n³ = O(n²)','2ⁿ = O(n²)','n log n = O(n)','n² = O(n³)'], ans:3,
    why:'n² ≤ 1 · n³ pour tout n ≥ 1, donc n² = O(n³) : le grand-O est une borne supérieure. Les trois autres fonctions grandissent plus vite que la borne proposée.'},
   {q:'On veut 3n + 5 ≤ C·n pour <b>tout</b> entier n ≥ 1. Quelle est la plus petite constante entière <i>C</i> qui convient&nbsp;?', lab:'C =', ans:8,
    why:'Il faut C ≥ 3 + 5/n pour tout n ≥ 1. Le cas le plus exigeant est n = 1 : C ≥ 8. Avec C = 8, 3n + 5 ≤ 8n dès n ≥ 1, donc 3n + 5 = O(n).'},
   {q:'Quel est le plus petit entier <i>n</i> pour lequel n² &gt; 100 n&nbsp;?', lab:'n =', ans:101,
    why:'n² &gt; 100n équivaut à n &gt; 100 (pour n &gt; 0). Le terme dominant n² ne gagne qu’à partir de n = 101 : avant, la constante 100 l’emporte.'},
 ]},
 {n:'Prévoir un temps de calcul', r:'Prévoir un temps par proportionnalité', qs:[
   {q:'Un algorithme en O(<i>n</i>) met 4 s pour n = 10⁶. Combien de temps environ pour n = 5 · 10⁶&nbsp;?', lab:'t ≈', unit:'s', ans:20, tol:0.01,
    why:'n est multiplié par 5, et le temps aussi pour un algorithme linéaire : 4 × 5 = 20 s.'},
   {q:'Un algorithme en O(<i>n</i>³) met 2 s pour n = 100. Combien de temps environ pour n = 300&nbsp;?', lab:'t ≈', unit:'s', ans:54, tol:0.01,
    why:'n est multiplié par 3, donc n³ par 3³ = 27 : t ≈ 2 × 27 = 54 s.'},
   {q:'Un algorithme en O(<i>n</i>²) met 50 s pour n = 10 000. Combien de temps environ pour n = 2000&nbsp;?', lab:'t ≈', unit:'s', ans:2, tol:0.01,
    why:'n est divisé par 5, donc n² par 25 : t ≈ 50 / 25 = 2 s.'},
   {q:'Un algorithme en O(2ⁿ) met 1 s pour n = 30. Combien de temps environ pour n = 35&nbsp;?', lab:'t ≈', unit:'s', ans:32, tol:0.01,
    why:'Chaque unité ajoutée à n double le temps. On ajoute 5 : t ≈ 1 × 2⁵ = 32 s.'},
   {q:'Une boucle qui divise <i>n</i> par 2 à chaque tour en fait 20 pour n ≈ 10⁶. Environ combien en fait-elle si n est multiplié par 8&nbsp;?', lab:'tours ≈', ans:23,
    why:'En O(log n), multiplier n par 8 = 2³ n’ajoute que log₂ 8 = 3 tours : environ 20 + 3 = 23.'},
 ]},
 {n:'Meilleur cas et pire cas', r:'Meilleur cas, pire cas', qs:[
   {q:'La fonction <code class="code">contient</code> du cours cherche <i>x</i> dans une liste de 80 éléments. <i>x</i> est à l’indice 24 et nulle part ailleurs. Combien de comparaisons <code class="code">y == x</code> fait-elle&nbsp;?', lab:'comparaisons =', ans:25,
    why:'Elle compare les éléments d’indices 0, 1, …, 24, puis renvoie True : 25 comparaisons.'},
   {q:'Avec <code class="code">contient(L, x)</code>, <i>x</i> apparaît deux fois dans L, aux indices 6 et 13. Combien de comparaisons sont faites&nbsp;?', lab:'comparaisons =', ans:7,
    why:'La fonction s’arrête à la première occurrence, à l’indice 6 : comparaisons aux indices 0 à 6, soit 7. La seconde occurrence n’est jamais vue.'},
   {q:'Sauf mention contraire, la complexité annoncée pour un algorithme est celle…', opts:['du meilleur cas','du cas moyen','du pire cas','du premier appel'], ans:2,
    why:'Le pire cas est une garantie : l’algorithme ne fera jamais plus d’opérations, quelles que soient les données.'},
   {q:'Quelles sont les complexités dans le meilleur et dans le pire cas de cette fonction, pour une liste de taille <i>n</i>&nbsp;?'+py(`
def compte_pairs(L):
    c = 0
    for y in L:
        if y % 2 == 0:
            c += 1
    return c`),
    opts:['Meilleur O(1), pire O(n)','Meilleur O(n), pire O(n²)','Les deux O(1)','Les deux O(n)'], ans:3,
    why:'Il n’y a aucun return dans la boucle : la fonction parcourt toujours toute la liste. Meilleur et pire cas sont O(n).'},
 ]},
 {n:'Reconnaître O(log n)', r:'Reconnaître O(log n)', qs:[
   {q:'Combien de tours fait cette boucle pour <i>n</i> = 300&nbsp;?'+py(`
while n > 1:
    n = n // 2`),
    lab:'tours =', ans:8,
    why:'2⁸ = 256 ≤ 300 &lt; 512 = 2⁹, donc ⌊log₂ 300⌋ = 8. Trace : 300, 150, 75, 37, 18, 9, 4, 2, 1.'},
   {q:'Combien de tours fait cette boucle pour <i>n</i> = 300&nbsp;?'+py(`
i = 1
while i < n:
    i = 2 * i`),
    lab:'tours =', ans:9,
    why:'C’est le plus petit k tel que 2ᵏ ≥ 300 : 2⁸ = 256 &lt; 300 ≤ 512 = 2⁹, donc 9 tours.'},
   {q:'Combien de tours fait cette boucle pour <i>n</i> = 64&nbsp;? Attention à la condition.'+py(`
while n >= 1:
    n = n // 2`),
    lab:'tours =', ans:7,
    why:'n prend les valeurs 64, 32, 16, 8, 4, 2, 1, puis 0. La condition n ≥ 1 est vraie pour 7 valeurs : 7 tours, un de plus qu’avec n &gt; 1.'},
   {q:'Combien de tours fait cette boucle pour <i>n</i> = 1000&nbsp;?'+py(`
i = 1
while i <= n:
    i = 2 * i`),
    lab:'tours =', ans:10,
    why:'i prend les valeurs 1, 2, 4, …, 512, toutes ≤ 1000, puis 1024. Cela fait 10 valeurs (2⁰ à 2⁹) : 10 tours.'},
   {q:'Quelle est la complexité de cette boucle&nbsp;?'+py(`
i = 1
while i < n:
    i = i + 2`),
    opts:['O(log n)','O(1)','O(n)','O(n²)'], ans:2,
    why:'i augmente de 2, il n’est pas doublé : il faut environ n/2 tours pour atteindre n. C’est O(n), pas O(log n).'},
 ]},
 {n:'Compter de l’intérieur vers l’extérieur', r:'Compter de l’intérieur vers l’extérieur', qs:[
   {q:'Combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 5&nbsp;?'+py(`
c = 0
for i in range(n):
    for j in range(i):
        for k in range(i):
            c += 1`),
    lab:'c =', ans:30,
    why:'Pour i fixé, la boucle sur k fait i tours, répétés i fois par la boucle sur j : i² passages. Total 0 + 1 + 4 + 9 + 16 = 30.'},
   {q:'Combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 6&nbsp;?'+py(`
c = 0
for i in range(n):
    for j in range(n):
        for k in range(j):
            c += 1`),
    lab:'c =', ans:90,
    why:'Pour i fixé, la boucle sur j donne 0 + 1 + … + 5 = 15 passages. Cela ne dépend pas de i, donc on multiplie par 6 : 90.'},
   {q:'Combien de fois <code class="code">c += 1</code> est-il exécuté pour <i>n</i> = 8&nbsp;?'+py(`
c = 0
for i in range(1, n):
    for j in range(i, n):
        for k in range(3):
            c += 1`),
    lab:'c =', ans:84,
    why:'La boucle sur k fait 3 tours. Pour i fixé, j fait n − i tours. Total 3(7 + 6 + … + 1) = 3 × 28 = 84.'},
   {q:'Quelle est la complexité de cette fonction&nbsp;?'+py(`
c = 0
for i in range(n):
    for j in range(i):
        for k in range(10):
            c += 1`),
    opts:['O(n³)','O(n)','O(n²)','O(10ⁿ)'], ans:2,
    why:'Trois boucles, mais la plus intérieure fait toujours 10 tours, une constante. Total 10 · n(n − 1)/2 = O(n²).'},
 ]},
];
})();
