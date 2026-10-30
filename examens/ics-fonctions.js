/* Déclic — examen de compétence : Fonctions */
(()=>{
const cd=s=>`<code>${esc(s)}</code>`;
const Q='Qu’affiche ce programme&nbsp;?';
EXAMS['ics-fonctions']=[
 {n:'Définir, appeler, renvoyer',r:'Définir et appeler',qs:[
   {q:Q+py(`def f(x):
    return 2 * x - 1

print(f(4) + f(1))`),lab:'affichage :',ans:8,
    why:'f(4) renvoie 2 · 4 − 1 = 7 et f(1) renvoie 1. On affiche 7 + 1 = 8.'},
   {q:Q+py(`def g(x):
    print(x * 3)

y = g(2)
print(y)`),opts:[`${cd('6')} puis ${cd('6')}`,`${cd('None')} seulement`,`${cd('6')} puis ${cd('None')}`,`${cd('6')} seulement`],ans:2,
    why:'L’appel g(2) affiche 6. Mais g n’a pas de return : elle renvoie None, que y reçoit et que la dernière ligne affiche.'},
   {q:Q+py(`def h(n):
    return n + 1
    print(n * 10)

print(h(4))`),opts:[cd('5'),`${cd('5')} puis ${cd('40')}`,`${cd('40')} puis ${cd('5')}`,cd('None')],ans:0,
    why:'return renvoie 5 et termine la fonction tout de suite : la ligne print(n * 10) n’est jamais exécutée. On affiche seulement 5.'},
   {q:Q+py(`def f(a, b):
    return a - b

print(f(f(10, 3), 2))`),lab:'affichage :',ans:5,
    why:'On calcule d’abord l’argument intérieur : f(10, 3) = 7. Puis f(7, 2) = 5.'},
   {q:Q+py(`def carre(x):
    x * x

print(carre(3))`),opts:[cd('9'),cd('0'),cd('None'),`Une erreur ${cd('NameError')}`],ans:2,
    why:'La fonction calcule x * x mais ne le renvoie pas : sans return, elle renvoie None.'},
 ]},
 {n:'Arguments positionnels, nommés, par défaut',r:'Positionnels, nommés, par défaut',qs:[
   {q:'Que renvoie l’appel ci-dessous&nbsp;?'+py(`def f(a, b=4, c=1):
    return a * b + c

print(f(2))`),lab:'résultat =',ans:9,
    why:'a = 2, et b, c gardent leurs valeurs par défaut 4 et 1 : 2 · 4 + 1 = 9.'},
   {q:'Que renvoie l’appel ci-dessous&nbsp;?'+py(`def g(x, y=2, z=10):
    return x + y * z

print(g(1, z=3))`),lab:'résultat =',ans:7,
    why:'x = 1 (positionnel), y garde sa valeur par défaut 2, z = 3 (nommé) : 1 + 2 · 3 = 7.'},
   {q:'Que renvoie l’appel ci-dessous&nbsp;?'+py(`def p(a, b=1, c=2):
    return a * 100 + b * 10 + c

print(p(c=7, a=3))`),lab:'résultat =',ans:317,
    why:'Les arguments nommés visent les paramètres par leur nom, dans n’importe quel ordre : a = 3, b = 1 par défaut, c = 7. On obtient 300 + 10 + 7 = 317.'},
   {q:`Avec ${cd('def f(a, b=0):')}, lequel de ces appels est une erreur de syntaxe&nbsp;?`,opts:[cd('f(1)'),cd('f(b=2, a=1)'),cd('f(a=1, 2)'),cd('f(1, b=2)')],ans:2,
    why:'Un argument positionnel ne peut pas venir après un argument nommé. Les trois autres appels sont corrects.'},
   {q:Q+py(`def f(a, b=3, c=5):
    return a + b - c

print(f(1, 2) + f(c=1, a=4))`),lab:'affichage :',ans:4,
    why:'f(1, 2) : a = 1, b = 2, c = 5, soit −2. f(c=1, a=4) : a = 4, b = 3, c = 1, soit 6. Total : 4.'},
 ]},
 {n:'Portée locale et globale',r:'Portée locale et globale',qs:[
   {q:Q+py(`n = 4

def f():
    n = 9
    return n * 2

print(f(), n)`),opts:[cd('18 9'),cd('8 4'),cd('18 4'),cd('8 9')],ans:2,
    why:'n = 9 crée un n local à f, qui renvoie 18. Le n global n’est pas touché : il vaut toujours 4.'},
   {q:Q+py(`total = 0

def ajoute(k):
    global total
    total += k

ajoute(5)
ajoute(3)
print(total)`),lab:'affichage :',ans:8,
    why:'Avec global total, la fonction réaffecte la variable globale : 0 + 5 = 5, puis 5 + 3 = 8.'},
   {q:Q+py(`x = 2

def f(x):
    x = x + 10
    return x

y = f(x)
print(x + y)`),lab:'affichage :',ans:14,
    why:'Le paramètre x est local : il vaut 2 puis 12, et f renvoie 12. Le x global vaut toujours 2. On affiche 2 + 12 = 14.'},
   {q:Q+py(`def vide(L):
    L.append(1)
    L = []
    L.append(2)

a = [0]
vide(a)
print(a)`),opts:[cd('[0, 1, 2]'),cd('[2]'),cd('[0]'),cd('[0, 1]')],ans:3,
    why:'Au début, L et a référencent la même liste : append(1) la modifie. Puis L = [] attache le nom local L à une nouvelle liste, qui reçoit le 2. a vaut [0, 1].'},
   {q:Q+py(`def f(L):
    L[0] = L[0] * 2
    return L[0]

a = [3, 4]
b = f(a)
print(a[0] + b)`),lab:'affichage :',ans:12,
    why:'L référence la liste de a : L[0] = 6 modifie cette liste sur place, et f renvoie 6. a[0] vaut donc 6 et b aussi : 12.'},
 ]},
 {n:'Tracer des appels',r:'Tracer des appels de fonction',qs:[
   {q:Q+py(`def f(a):
    b = a * 3
    return b - 1

def g(b):
    return f(b) + b

b = 2
print(g(4), b)`),opts:[cd('15 2'),cd('15 4'),cd('11 2'),cd('7 2')],ans:0,
    why:'Cadre de g : b = 4. f(4) calcule un b local égal à 12 et renvoie 11. g renvoie 11 + 4 = 15. Le b global vaut toujours 2.'},
   {q:Q+py(`def h(x, y):
    return x * y - y

def k(n):
    m = h(n, 3)
    return h(m, n)

print(k(2))`),lab:'affichage :',ans:4,
    why:'k(2) : h(2, 3) = 6 − 3 = 3, donc m = 3. Puis h(3, 2) = 6 − 2 = 4.'},
   {q:Q+py(`def a(x):
    return x + 1

def b(x):
    return a(a(x)) * 2

print(b(a(1)))`),lab:'affichage :',ans:8,
    why:'On calcule l’argument : a(1) = 2. Puis b(2) : a(a(2)) = a(3) = 4, et 4 · 2 = 8.'},
   {q:Q+py(`def f(n):
    n = n * 2
    return n + 1

n = 5
m = f(n)
print(n, m)`),opts:[cd('10 11'),cd('5 11'),cd('5 6'),cd('10 6')],ans:1,
    why:'Le n de f est un paramètre local : il passe à 10 et f renvoie 11. Le n global n’est pas réaffecté : 5 11.'},
   {q:Q+py(`def u(x, y):
    x = x - y
    return x * y

def v(t):
    return u(t, 2) + u(2, t)

print(v(5))`),lab:'affichage :',ans:-9,
    why:'u(5, 2) : x = 3, renvoie 3 · 2 = 6. u(2, 5) : x = −3, renvoie −3 · 5 = −15. v(5) = 6 − 15 = −9.'},
 ]},
 {n:'Bibliothèques math et random',r:'Importer une bibliothèque',qs:[
   {q:`Après ${cd('import math')}, que vaut ${cd('math.floor(9.99) + math.ceil(0.1)')}&nbsp;?`,lab:'résultat =',ans:10,
    why:'math.floor arrondit vers le bas : 9. math.ceil arrondit vers le haut : 1. Total : 10.'},
   {q:Q+py(`import math
print(math.sqrt(81))`),opts:[cd('9'),cd('3'),cd('9.0'),cd('81.0')],ans:2,
    why:'math.sqrt renvoie toujours un float, même pour un carré parfait : 9.0.'},
   {q:`Combien de valeurs différentes ${cd('random.randint(2, 5)')} peut-il renvoyer&nbsp;?`,lab:'valeurs :',ans:4,
    why:'randint inclut les deux bornes : 2, 3, 4 et 5, soit 4 valeurs.'},
   {q:`Après ${cd('import math')}, que vaut ${cd('math.ceil(math.sqrt(20)) * math.floor(math.pi)')}&nbsp;?`,lab:'résultat =',ans:15,
    why:'√20 ≈ 4,47, arrondi vers le haut : 5. π ≈ 3,14, arrondi vers le bas : 3. Produit : 15.'},
   {q:`Laquelle de ces valeurs ${cd('random.random()')} peut-il renvoyer&nbsp;?`,opts:[cd('1.0'),cd('0.0'),cd('-0.5'),cd('2')],ans:1,
    why:'random.random() renvoie un float dans [0 ; 1[ : 0 est possible, 1 est exclu.'},
 ]},
 {n:'Découper en fonctions',r:'Découper un problème en fonctions',qs:[
   {q:Q+py(`import math

def distance(xa, ya, xb, yb):
    return math.sqrt((xb - xa) ** 2 + (yb - ya) ** 2)

print(distance(1, 1, 4, 5))`),opts:[cd('5.0'),cd('5'),cd('25'),cd('7.0')],ans:0,
    why:'Les écarts sont 3 et 4 : √(9 + 16) = √25 = 5. math.sqrt renvoie un float : 5.0.'},
   {q:Q+py(`def aire(l, h):
    return l * h

def aire_totale(l, h, n):
    return n * aire(l, h) + 2

print(aire_totale(3, 2, 4))`),lab:'affichage :',ans:26,
    why:'aire(3, 2) renvoie 6, puis aire_totale calcule 4 · 6 + 2 = 26.'},
   {q:'Que se passe-t-il à l’exécution&nbsp;?'+py(`def moyenne(a, b):
    print((a + b) / 2)

m = moyenne(4, 6) + 1`),opts:[`Il affiche ${cd('6.0')}`,`Il affiche ${cd('5.0')}, puis s’arrête sur une erreur ${cd('TypeError')}`,`Il affiche ${cd('5.0')} puis ${cd('6.0')}`,`Il s’arrête sur une erreur ${cd('NameError')}`],ans:1,
    why:'L’appel affiche 5.0, mais moyenne renvoie None car elle n’a pas de return. None + 1 est impossible : TypeError. Il fallait return (a + b) / 2.'},
   {q:Q+py(`def perimetre_rect(l, h):
    return 2 * (l + h)

def cout(l, h, prix):
    return perimetre_rect(l, h) * prix

print(cout(3, 5, 4))`),lab:'affichage :',ans:64,
    why:'perimetre_rect(3, 5) = 2 · 8 = 16, puis cout renvoie 16 · 4 = 64.'},
   {q:`Avec la fonction ${cd('distance')} de la méthode, que vaut le périmètre du triangle de sommets (0 ; 0), (5 ; 0) et (5 ; 12), soit ${cd('distance(0, 0, 5, 0) + distance(5, 0, 5, 12) + distance(5, 12, 0, 0)')}&nbsp;?`,lab:'périmètre =',ans:30,
    why:'Les côtés valent 5, 12 et √(25 + 144) = √169 = 13. Le périmètre vaut 30 (Python affiche 30.0).'},
 ]},
];
})();
