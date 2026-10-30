/* Déclic — examen de compétence : Structures de contrôle */
(()=>{
const cd=s=>`<code>${esc(s)}</code>`;
const Q='Qu’affiche ce programme&nbsp;?';
EXAMS['ics-controle']=[
 {n:'Conditions if, elif, else',r:'if, elif, else',qs:[
   {q:Q+py(`x = 12
if x % 5 == 0:
    print('A')
elif x % 3 == 0:
    print('B')
elif x % 2 == 0:
    print('C')
else:
    print('D')`),opts:[`${cd('B')} puis ${cd('C')}`,cd('C'),cd('B'),cd('D')],ans:2,
    why:'12 % 5 = 2 : premier test faux. 12 % 3 = 0 : on affiche B, et les branches suivantes sont sautées, même si 12 est pair.'},
   {q:Q+py(`n = 4
print(0 < n <= 4 and not n % 2 == 1)`),opts:[cd('False'),cd('True'),cd('4'),`Une erreur ${cd('SyntaxError')}`],ans:1,
    why:'0 < 4 <= 4 est vrai. 4 % 2 == 1 est faux, donc not … est vrai. True and True donne True.'},
   {q:Q+py(`x = 8
r = 0
if x > 5:
    r = r + 1
if x > 7:
    r = r + 10
elif x > 2:
    r = r + 100
print(r)`),lab:'affichage :',ans:11,
    why:'Il y a deux if indépendants. Le premier ajoute 1. Dans le second bloc, x > 7 est vrai : on ajoute 10 et le elif est sauté. r = 11.'},
 ]},
 {n:'Tracer une boucle while',r:'Tracer une boucle avec un tableau des tours',qs:[
   {q:Q+py(`n = 50
k = 0
while n > 0:
    n = n - 12
    k += 1
print(k, n)`),opts:[cd('4 2'),cd('5 2'),cd('4 -10'),cd('5 -10')],ans:3,
    why:'n prend les valeurs 50, 38, 26, 14, 2, −10. Après le passage à 2, le test 2 > 0 est encore vrai : un tour de plus. On sort avec k = 5 et n = −10.'},
   {q:Q+py(`s = 1
k = 0
while s < 100:
    s = s * 3
    k += 1
print(k)`),lab:'k =',ans:5,
    why:'s vaut 3, 9, 27, 81, puis 243. Le test 81 < 100 est vrai, d’où un cinquième tour ; 243 < 100 est faux : k = 5.'},
   {q:'Dans ce programme, combien de fois la condition ' + cd('s < 100') + ' est-elle évaluée&nbsp;?'+py(`s = 1
while s < 100:
    s = s * 3`),lab:'évaluations :',ans:6,
    why:'s vaut 1, 3, 9, 27, 81 au moment des 5 tests vrais, donc 5 tours. Le 6e test, 243 < 100, est faux et fait sortir.'},
   {q:Q+py(`n = 6
pas = 0
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    pas += 1
print(pas)`),lab:'pas =',ans:8,
    why:'n passe par 6, 3, 10, 5, 16, 8, 4, 2, 1 : huit tours avant que n != 1 devienne faux.'},
   {q:Q+py(`x = 1
while x < 40:
    x = 2 * x + 1
print(x)`),lab:'affichage :',ans:63,
    why:'x vaut 1, 3, 7, 15, 31, puis 63. Le test 31 < 40 est vrai, donc on calcule encore 2 · 31 + 1 = 63 avant de sortir.'},
 ]},
 {n:'for, range, break et continue',r:'for et range',qs:[
   {q:`Que vaut ${cd('list(range(3, 15, 4))')}&nbsp;?`,opts:[cd('[3, 7, 11, 15]'),cd('[3, 7, 11]'),cd('[4, 8, 12]'),cd('[3, 4, 5, 6]')],ans:1,
    why:'On part de 3 et on avance de 4 : 3, 7, 11. La valeur suivante, 15, est la fin, qui est exclue.'},
   {q:Q+py(`for i in range(12, 0, -5):
    print(i, end=' ')`),opts:[cd('12 7 2'),cd('12 7 2 -3'),cd('12 7'),cd('0 5 10')],ans:0,
    why:'Avec un pas de −5, on descend : 12, 7, 2. La valeur suivante, −3, est en dessous de la fin 0 : la boucle s’arrête.'},
   {q:Q+py(`for i in range(1, 12):
    if i % 4 == 0:
        continue
    if i > 9:
        break
    print(i, end=' ')`),opts:[cd('1 2 3 5 6 7 9 10 11'),cd('1 2 3 5 6 7 9'),cd('1 2 3'),cd('1 2 3 4 5 6 7 8 9')],ans:1,
    why:'continue saute 4 et 8 sans rien afficher. À i = 10, i > 9 déclenche break avant le print : on affiche 1 2 3 5 6 7 9.'},
   {q:`Combien de tours fait la boucle ${cd('for k in range(5, 30, 5):')}&nbsp;?`,lab:'tours :',ans:5,
    why:'k prend les valeurs 5, 10, 15, 20, 25 : 30 est exclu. Cinq tours.'},
 ]},
 {n:'Accumulateur et compteur',r:'Accumulateur et compteur',qs:[
   {q:Q+py(`s = 0
for k in range(1, 11):
    if k % 2 == 0:
        s = s + k
print(s)`),lab:'s =',ans:30,
    why:'On additionne les pairs de 1 à 10 : 2 + 4 + 6 + 8 + 10 = 30.'},
   {q:Q+py(`c = 0
for k in range(1, 31):
    if k % 4 == 0 or k % 6 == 0:
        c = c + 1
print(c)`),lab:'c =',ans:10,
    why:'Multiples de 4 : 4, 8, …, 28 (7). Multiples de 6 : 6, 12, …, 30 (5). 12 et 24 sont dans les deux mais comptés une fois : 7 + 5 − 2 = 10.'},
   {q:Q+py(`mot = ''
for c in 'python':
    mot = c + mot
print(mot)`),opts:[cd('python'),cd('n'),cd('nohtyp'),cd('p')],ans:2,
    why:'Chaque lettre est collée devant ce qui est déjà construit : p, yp, typ, … L’accumulateur finit par contenir le mot renversé.'},
   {q:Q+py(`for k in range(1, 5):
    s = 0
    s = s + k
print(s)`),lab:'affichage :',ans:4,
    why:'s = 0 est à l’intérieur de la boucle : la somme repart de 0 à chaque tour. Au dernier tour, s = 0 + 4 = 4, au lieu de 10.'},
 ]},
 {n:'Chercher le maximum ou le minimum',r:'Chercher le maximum',qs:[
   {q:Q+py(`L = [-5, -8, -3, -6]
m = L[0]
for x in L:
    if x < m:
        m = x
print(m)`),lab:'m =',ans:-8,
    why:'C’est la recherche du minimum : on part de −5, puis −8 &lt; −5 le remplace. −3 et −6 ne sont pas plus petits que −8.'},
   {q:Q+py(`L = [4, 9, 9, 2]
m = L[0]
c = 0
for x in L:
    if x >= m:
        m = x
        c += 1
print(m + c)`),lab:'affichage :',ans:12,
    why:'Avec ≥, le test réussit pour 4 (4 ≥ 4), pour 9, et encore pour le second 9 : c = 3. 2 échoue. On affiche 9 + 3 = 12.'},
   {q:Q+py(`L = [-7, -2, -9]
m = 0
for x in L:
    if x > m:
        m = x
print(m)`),opts:[cd('-2'),cd('-7'),cd('-9'),cd('0')],ans:3,
    why:'Aucun nombre ne dépasse 0, donc m garde sa valeur de départ 0, absente de la liste. Il fallait initialiser avec m = L[0].'},
   {q:Q+py(`L = [15, 20, 13, 27]
m = L[0] % 7
for x in L:
    if x % 7 > m:
        m = x % 7
print(m)`),lab:'m =',ans:6,
    why:'Les restes par 7 sont 1, 6, 6, 6. On part de 1, et 6 &gt; 1 remplace le meilleur. Le plus grand reste vaut 6.'},
 ]},
 {n:'Drapeau et sortie anticipée',r:'Drapeau et sortie anticipée',qs:[
   {q:Q+py(`def premier_multiple(L, k):
    for x in L:
        if x % k == 0:
            return x
    return -1

print(premier_multiple([7, 11, 15, 20], 5) + premier_multiple([1, 2], 7))`),lab:'affichage :',ans:14,
    why:'Dans la première liste, 15 est le premier multiple de 5 : return 15 sort aussitôt. Dans la seconde, aucun multiple de 7 : on atteint return −1. 15 − 1 = 14.'},
   {q:Q+py(`def contient(L, v):
    for x in L:
        if x == v:
            return True
        else:
            return False

print(contient([3, 8, 5], 8), contient([], 8))`),opts:[cd('True False'),cd('False False'),cd('True None'),cd('False None')],ans:3,
    why:'Le else: return False décide dès le premier élément : 3 ≠ 8 donne False. Pour la liste vide, la boucle ne tourne pas et la fonction se termine sans return : None.'},
   {q:'Combien de tests ' + cd('x % 4 == 0') + ' ce programme fait-il&nbsp;?'+py(`trouve = False
t = 0
for x in [5, 9, 12, 4, 15]:
    t += 1
    if x % 4 == 0:
        trouve = True
        break
print(t)`),lab:'tests :',ans:3,
    why:'5 et 9 échouent. 12 est multiple de 4 : le drapeau passe à True et break arrête la boucle. 4 et 15 ne sont jamais testés : t = 3.'},
   {q:Q+py(`def tous_positifs(L):
    for x in L:
        if x <= 0:
            return False
    return True

print(tous_positifs([3, 0, 2]), tous_positifs([]))`),opts:[cd('False True'),cd('True True'),cd('False False'),cd('True False')],ans:0,
    why:'0 est un contre-exemple (0 ≤ 0) : False. Pour la liste vide, aucun contre-exemple, on atteint return True.'},
 ]},
 {n:'Boucles imbriquées',r:'Dérouler deux boucles imbriquées',qs:[
   {q:Q+py(`c = 0
for i in range(4):
    for j in range(3):
        c += 1
print(c)`),lab:'c =',ans:12,
    why:'Pour chacun des 4 tours extérieurs, la boucle intérieure fait 3 tours : 4 · 3 = 12.'},
   {q:Q+py(`c = 0
for i in range(5):
    for j in range(i):
        c += 1
print(c)`),lab:'c =',ans:10,
    why:'La ligne i fait i tours : 0 + 1 + 2 + 3 + 4 = 10.'},
   {q:Q+py(`s = 0
for i in range(1, 4):
    for j in range(i, 4):
        s += j
print(s)`),lab:'s =',ans:14,
    why:'i = 1 : j = 1, 2, 3, on ajoute 6. i = 2 : j = 2, 3, on ajoute 5. i = 3 : j = 3, on ajoute 3. Total : 14.'},
   {q:Q+py(`c = 0
for i in range(6):
    for j in range(i + 1, 6):
        if (i + j) % 2 == 0:
            c += 1
print(c)`),lab:'c =',ans:6,
    why:'On compte les paires i &lt; j de même parité parmi 0 à 5. Pairs : (0, 2), (0, 4), (2, 4). Impairs : (1, 3), (1, 5), (3, 5). Six paires.'},
 ]},
 {n:'Déboguer et tester',r:'Tester sur des cas limites',qs:[
   {q:'Ce programme doit calculer la somme des entiers de 1 à 10. Qu’affiche-t-il en réalité&nbsp;?'+py(`s = 0
for k in range(1, 10):
    s = s + k
print(s)`),lab:'affichage :',ans:45,
    why:'range(1, 10) s’arrête à 9 : on calcule 1 + 2 + … + 9 = 45. Il manque le 10.'},
   {q:'Quelle boucle fait prendre à <i>k</i> toutes les valeurs de 1 à 10 inclus&nbsp;?',opts:[cd('for k in range(10):'),cd('for k in range(1, 11):'),cd('for k in range(0, 10):'),cd('for k in range(1, 10, 1):')],ans:1,
    why:'range(a, b) va de a inclus à b exclu : pour finir à 10, il faut b = 11. range(10) commence à 0 et finit à 9.'},
   {q:'Cette fonction doit renvoyer le plus petit élément d’une liste non vide. Quel test échoue&nbsp;?'+py(`def mini(L):
    m = 0
    for x in L:
        if x < m:
            m = x
    return m`),opts:[cd('assert mini([-3, 5]) == -3'),cd('assert mini([-1]) == -1'),cd('assert mini([4, 2, 7]) == 2'),cd('assert mini([-5, -9]) == -9')],ans:2,
    why:'Si tous les nombres sont positifs, aucun n’est plus petit que 0 : la fonction renvoie 0 au lieu de 2. Il faut partir de m = L[0].'},
   {q:'Que se passe-t-il à l’exécution&nbsp;?'+py(`x = 7
assert x % 2 == 0
print('ok')`),opts:[`Il affiche ${cd('ok')}`,`Il s’arrête sur ${cd('AssertionError')} sans rien afficher`,`Il affiche ${cd('False')}`,`Il affiche ${cd('ok')} puis lève ${cd('AssertionError')}`],ans:1,
    why:'7 % 2 == 0 est faux : assert arrête le programme avec AssertionError avant d’atteindre le print.'},
 ]},
];
})();
