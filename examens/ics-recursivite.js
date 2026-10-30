/* Déclic — examen de compétence : Récursivité */
(()=>{
EXAMS['ics-recursivite']=[
 {n:'Cas de base et appel récursif', r:'Une fonction qui s’appelle', qs:[
   {q:'Une fonction récursive correcte doit avoir…', opts:['au moins deux appels récursifs','une boucle while en plus des appels','un cas de base traité sans appel, et des appels qui s’en rapprochent','un return à chaque ligne'], ans:2,
    why:'Le cas de base arrête la descente, et chaque appel doit s’en approcher. Un seul appel récursif suffit souvent (fact, nb_chiffres).'},
   {q:'Que se passe-t-il quand on appelle <code class="code">s(4)</code>&nbsp;?'+py(`
def s(n):
    return n + s(n - 1)`),
    opts:['Elle renvoie 10','Elle renvoie 4','Python refuse de définir la fonction','Les appels ne s’arrêtent jamais et Python lève une RecursionError'], ans:3,
    why:'Il n’y a aucun cas de base : s(4) appelle s(3), s(2), s(1), s(0), s(−1)… jusqu’à la limite de la pile, et Python lève RecursionError.'},
   {q:'Que renvoie <code class="code">f(6)</code>&nbsp;?'+py(`
def f(n):
    if n == 0:
        return 0
    return 1 + f(n - 2)`),
    lab:'f(6) =', ans:3,
    why:'f(6) = 1 + f(4) = 2 + f(2) = 3 + f(0) = 3 + 0 = 3.'},
   {q:'Que se passe-t-il pour <code class="code">f(7)</code>&nbsp;?'+py(`
def f(n):
    if n == 0:
        return 0
    return 1 + f(n - 2)`),
    opts:['Elle renvoie 3','Elle renvoie 4','Elle lève une RecursionError','Elle renvoie 0'], ans:2,
    why:'n prend les valeurs 7, 5, 3, 1, −1, −3… : il saute par-dessus 0 et n’atteint jamais le cas de base. Les appels s’empilent jusqu’à RecursionError.'},
   {q:'On garde <code class="code">return 1 + f(n - 2)</code>. Quel cas de base rend <i>f</i> correcte (elle s’arrête) pour <b>tout</b> entier n ≥ 0&nbsp;?', opts:['<code class="code">if n == 0: return 0</code>','<code class="code">if n == 1: return 0</code>','<code class="code">if n &lt;= 0: return 0</code>','<code class="code">if n == 2: return 0</code>'], ans:2,
    why:'Avec n ≤ 0, un n impair s’arrête aussi en arrivant à −1. Les tests d’égalité n == 0, n == 1 ou n == 2 laissent passer la moitié des entiers.'},
 ]},
 {n:'Écrire une fonction récursive', r:'Écrire une fonction récursive', qs:[
   {q:'On veut <code class="code">longueur(L)</code>, le nombre d’éléments d’une liste, avec le cas de base <code class="code">if L == []: return 0</code>. Quelle ligne de réduction convient&nbsp;?', opts:['<code class="code">return longueur(L[1:])</code>','<code class="code">return 1 + longueur(L[1:])</code>','<code class="code">return 1 + longueur(L)</code>','<code class="code">return L[0] + longueur(L[1:])</code>'], ans:1,
    why:'L[1:] a un élément de moins : on lui fait confiance et on ajoute 1 pour L[0]. Sans le 1 on renvoie 0, avec longueur(L) on ne progresse pas, et L[0] + … fait une somme.'},
   {q:'Quelle ligne complète cette fonction qui renvoie le plus grand élément d’une liste non vide&nbsp;?'+py(`
def maxi(L):
    if len(L) == 1:
        return L[0]
    m = maxi(L[1:])
    ...`),
    opts:['<code class="code">return m</code>','<code class="code">return L[0] + m</code>','<code class="code">return min(L[0], m)</code>','<code class="code">return max(L[0], m)</code>'], ans:3,
    why:'On suppose que m est le maximum de L[1:]. Le maximum de L est alors le plus grand de L[0] et m.'},
   {q:'Le cas de base est <code class="code">if n == 0</code>. Quel appel récursif garantit l’arrêt pour <b>tout</b> entier n ≥ 0&nbsp;?', opts:['<code class="code">f(n - 2)</code>','<code class="code">f(n // 2)</code>','<code class="code">f(n + 1)</code>','<code class="code">f(n)</code>'], ans:1,
    why:'Pour n ≥ 1, 0 ≤ n // 2 &lt; n : l’entrée diminue strictement en restant ≥ 0, donc on atteint 0 (1 // 2 = 0). f(n − 2) saute 0 pour n impair, f(n) et f(n + 1) ne progressent pas.'},
   {q:'Que renvoie <code class="code">nb_bits(100)</code>&nbsp;?'+py(`
def nb_bits(n):
    if n < 2:
        return 1
    return 1 + nb_bits(n // 2)`),
    lab:'nb_bits(100) =', ans:7,
    why:'n prend les valeurs 100, 50, 25, 12, 6, 3, 1 : six appels ajoutent 1, et le cas de base renvoie 1. Total 7, le nombre de chiffres de 100 en binaire (1100100).'},
   {q:'Que renvoie <code class="code">p(3725)</code>&nbsp;?'+py(`
def p(n):
    if n < 10:
        return n
    return p(n // 10) * (n % 10)`),
    lab:'p(3725) =', ans:210,
    why:'n % 10 est le dernier chiffre et n // 10 enlève ce chiffre : p fait le produit des chiffres. p(3725) = 3 × 7 × 2 × 5 = 210.'},
 ]},
 {n:'Dérouler une récursion', r:'Dérouler une récursion par substitution', qs:[
   {q:'Que renvoie <code class="code">g(4)</code>&nbsp;?'+py(`
def g(n):
    if n <= 0:
        return 0
    return n * n + g(n - 1)`),
    lab:'g(4) =', ans:30,
    why:'g(4) = 16 + g(3) = 16 + 9 + g(2) = 16 + 9 + 4 + 1 + g(0) = 30.'},
   {q:'Que renvoie <code class="code">h(20)</code>&nbsp;?'+py(`
def h(n):
    if n == 1:
        return 1
    return h(n // 2) + n`),
    lab:'h(20) =', ans:38,
    why:'h(20) = 20 + h(10) = 20 + 10 + h(5) = 20 + 10 + 5 + h(2) = 20 + 10 + 5 + 2 + h(1) = 37 + 1 = 38.'},
   {q:'Que renvoie <code class="code">m(7, 4)</code>&nbsp;?'+py(`
def m(a, b):
    if b == 0:
        return 0
    return a + m(a, b - 1)`),
    lab:'m(7, 4) =', ans:28,
    why:'m(7, 4) = 7 + m(7, 3) = 7 + 7 + m(7, 2) = … = 7 + 7 + 7 + 7 + m(7, 0) = 28. La fonction calcule a × b.'},
   {q:'Qu’affiche <code class="code">f(3)</code>&nbsp;?'+py(`
def f(n):
    if n == 0:
        return
    f(n - 1)
    print(n)`),
    opts:['3, puis 2, puis 1','1, puis 2, puis 3','Seulement 3','Seulement 1'], ans:1,
    why:'f(3) attend f(2), qui attend f(1), qui attend f(0). En remontant, f(1) affiche 1 en premier, puis f(2) affiche 2, puis f(3) affiche 3 : le print est après l’appel.'},
   {q:'Que renvoie <code class="code">g(5)</code>&nbsp;?'+py(`
def g(n):
    if n <= 1:
        return n
    return n - g(n - 1)`),
    lab:'g(5) =', ans:3,
    why:'On descend : g(5) = 5 − g(4), g(4) = 4 − g(3), g(3) = 3 − g(2), g(2) = 2 − g(1) et g(1) = 1. On remonte : g(2) = 1, g(3) = 2, g(4) = 2, g(5) = 3.'},
   {q:'Que renvoie <code class="code">f(7)</code>&nbsp;?'+py(`
def f(n):
    if n < 3:
        return n
    return f(n - 1) - f(n - 3)`),
    lab:'f(7) =', ans:-4,
    why:'f(0), f(1), f(2) valent 0, 1, 2. Puis f(3) = 2 − 0 = 2, f(4) = 2 − 1 = 1, f(5) = 1 − 2 = −1, f(6) = −1 − 2 = −3, f(7) = −3 − 1 = −4.'},
 ]},
 {n:'Compter les appels avec une récurrence', r:'Écrire la récurrence du coût', qs:[
   {q:'Combien d’appels à <code class="code">deux</code> (le premier compris) pour calculer <code class="code">deux(5)</code>&nbsp;?'+py(`
def deux(n):
    if n == 0:
        return 1
    return deux(n - 1) + deux(n - 1)`),
    lab:'appels =', ans:63,
    why:'A(0) = 1 et A(n) = 1 + 2A(n − 1) : A(1) = 3, A(2) = 7, A(3) = 15, A(4) = 31, A(5) = 63. En général A(n) = 2ⁿ⁺¹ − 1.'},
   {q:'Combien d’appels à <code class="code">s</code> (le premier compris) pour <code class="code">s(10)</code>&nbsp;?'+py(`
def s(n):
    if n <= 1:
        return 0
    return s(n - 2)`),
    lab:'appels =', ans:6,
    why:'n vaut 10, 8, 6, 4, 2, puis 0 (cas de base) : 6 appels.'},
   {q:'Combien d’appels à <code class="code">r</code> (le premier compris) pour <code class="code">r(100)</code>&nbsp;?'+py(`
def r(n):
    if n == 0:
        return 0
    return 1 + r(n // 2)`),
    lab:'appels =', ans:8,
    why:'n vaut 100, 50, 25, 12, 6, 3, 1, puis 0 : 8 appels. Un appel sur n // 2 donne un coût en O(log n).'},
   {q:'Combien d’appels à <code class="code">fib</code> (version naïve du cours, le premier compris) pour calculer <code class="code">fib(8)</code>&nbsp;?', lab:'appels =', ans:67,
    why:'A(0) = A(1) = 1 et A(n) = 1 + A(n − 1) + A(n − 2) : 3, 5, 9, 15, 25, 41, puis A(8) = 1 + 41 + 25 = 67.'},
   {q:'Combien d’appels à <code class="code">t</code> (le premier compris) pour <code class="code">t(5)</code>&nbsp;?'+py(`
def t(n):
    if n <= 1:
        return 1
    return t(n - 1) + t(n - 2) + t(n - 2)`),
    lab:'appels =', ans:31,
    why:'A(0) = A(1) = 1 et A(n) = 1 + A(n − 1) + 2A(n − 2). A(2) = 1 + 1 + 2 = 4, A(3) = 1 + 4 + 2 = 7, A(4) = 1 + 7 + 8 = 16, A(5) = 1 + 16 + 14 = 31.'},
   {q:'Laquelle de ces fonctions a un nombre d’appels exponentiel en <i>n</i>&nbsp;?', opts:['Un seul appel sur n − 1','Un seul appel sur n // 2','Un seul appel sur n − 2','Deux appels sur n − 1'], ans:3,
    why:'Deux appels sur n − 1 donnent A(n) = 1 + 2A(n − 1), soit environ 2ⁿ. Un seul appel sur n − 1 ou n − 2 donne O(n), un seul appel sur n // 2 donne O(log n).'},
 ]},
 {n:'La pile d’appels', r:'La pile d’appels', qs:[
   {q:'Pendant le calcul de <code class="code">fact(6)</code>, au moment où <code class="code">fact(2)</code> s’exécute, combien d’appels sont en attente <b>sous</b> lui dans la pile&nbsp;?', lab:'appels =', ans:4,
    why:'fact(6), fact(5), fact(4) et fact(3) attendent chacun le résultat de l’appel au-dessus : 4 appels en attente.'},
   {q:'Combien d’appels sont empilés au maximum en même temps pendant <code class="code">r(1000)</code>&nbsp;?'+py(`
def r(n):
    if n == 0:
        return 0
    return 1 + r(n // 2)`),
    lab:'appels =', ans:11,
    why:'n vaut 1000, 500, 250, 125, 62, 31, 15, 7, 3, 1, 0. Aucun appel ne se termine avant le cas de base, donc les 11 appels sont tous sur la pile à ce moment.'},
   {q:'Quelle mémoire la pile utilise-t-elle au maximum pour cette somme récursive&nbsp;?'+py(`
def somme(n):
    if n == 0:
        return 0
    return n + somme(n - 1)`),
    opts:['O(1)','O(log n)','O(n²)','O(n)'], ans:3,
    why:'Au moment du cas de base, somme(n), somme(n − 1), …, somme(0) sont tous en attente : n + 1 appels, O(n). Une boucle ferait le même calcul en O(1) de mémoire.'},
   {q:'Que donne <code class="code">fact(5000)</code> avec la version récursive du cours, sans réglage particulier de Python&nbsp;?', opts:['Le bon résultat, juste un peu lentement','Une RecursionError, car la pile dépasse la limite d’environ 1000 appels','0','Une boucle infinie'], ans:1,
    why:'fact(5000) empile 5001 appels avant le cas de base. Python limite la pile à environ 1000 appels et lève RecursionError. La version itérative n’a pas ce problème.'},
 ]},
 {n:'Récursion ou itération', r:'Récursion ou itération', qs:[
   {q:'Que renvoie <code class="code">fib_iter(12)</code>&nbsp;?'+py(`
def fib_iter(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`),
    lab:'fib_iter(12) =', ans:144,
    why:'a prend les valeurs 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 : après 12 tours, a = F(12) = 144.'},
   {q:'Combien de fois <code class="code">fib(2)</code> est-il appelé pendant le calcul naïf de <code class="code">fib(7)</code>&nbsp;?', lab:'appels =', ans:8,
    why:'Notons N(n) ce nombre : N(2) = 1, N(3) = 1 et N(n) = N(n − 1) + N(n − 2). Donc N(4) = 2, N(5) = 3, N(6) = 5, N(7) = 8. Toujours le même calcul, refait 8 fois.'},
   {q:'Pourquoi la version récursive naïve de Fibonacci est-elle si lente&nbsp;?', opts:['Parce que toute fonction récursive est lente','Parce que les additions de grands nombres coûtent cher','Parce qu’elle recalcule sans cesse les mêmes valeurs, avec deux appels par niveau','Parce que la pile est limitée à 1000 appels'], ans:2,
    why:'Le danger vient des sous-problèmes recalculés : l’arbre des appels grossit comme 1,618ⁿ. La récursion elle-même n’est pas en cause (le tri fusion est récursif et rapide).'},
   {q:'Quelle est la complexité de <code class="code">fib_iter(n)</code> en nombre d’opérations&nbsp;?', opts:['O(log n)','O(n)','O(n²)','O(2ⁿ)'], ans:1,
    why:'La boucle fait n tours, chacun en temps constant (une affectation double) : O(n), avec une mémoire O(1).'},
 ]},
];
})();
