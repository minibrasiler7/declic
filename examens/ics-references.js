/* Déclic — examen de compétence : Références et mutabilité */
(()=>{
const cd=s=>`<code>${esc(s)}</code>`;
const Q='Qu’affiche ce programme&nbsp;?';
EXAMS['ics-references']=[
 {n:'Fabriquer et lire une liste',r:'Fabriquer et lire une liste',qs:[
   {q:Q+py(`L = [2, 5] * 2 + [1]
print(len(L), sum(L))`),opts:[cd('5 15'),cd('3 8'),cd('5 8'),cd('4 14')],ans:0,
    why:'* passe avant + : [2, 5] * 2 = [2, 5, 2, 5], puis + [1] donne [2, 5, 2, 5, 1]. 5 éléments, de somme 15.'},
   {q:Q+py(`L = [4, 0, 6]
L[2] = L[0] + L[1]
L.append(L[2])
print(sum(L))`),lab:'affichage :',ans:12,
    why:'L[2] reçoit 4 + 0 = 4 : [4, 0, 4]. append ajoute L[2] = 4 à la fin : [4, 0, 4, 4]. Somme : 12.'},
   {q:'Que se passe-t-il à l’exécution de ce programme&nbsp;?'+py(`L = [7, 3, 9]
print(L[len(L)])`),opts:[`Il affiche ${cd('9')}`,`Il affiche ${cd('7')}`,'Il s’arrête sur une erreur : la case d’indice 3 n’existe pas',`Il affiche ${cd('None')}`],ans:2,
    why:'len(L) = 3, mais les indices vont de 0 à 2. La dernière case est L[len(L) − 1] = L[2] = 9 ; L[3] n’existe pas.'},
   {q:Q+py(`a = [1, 2, 3]
b = a + [4] * 2
print(len(a), len(b))`),opts:[cd('5 5'),cd('3 4'),cd('3 5'),cd('3 8')],ans:2,
    why:'[4] * 2 = [4, 4], et a + [4, 4] crée une nouvelle liste de 5 éléments. + ne modifie pas a, qui garde ses 3 éléments.'},
   {q:Q+py(`L = [3, 1]
L = L * 2
L[3] = 5
print(L)`),opts:[cd('[3, 1, 5, 1]'),cd('[3, 1, 3, 5]'),cd('[3, 5]'),cd('[3, 1, 5]')],ans:1,
    why:'L * 2 = [3, 1, 3, 1]. L’indice 3 est la quatrième case, qui passe de 1 à 5 : [3, 1, 3, 5].'},
 ]},
 {n:'Aliasing : deux noms, une liste',r:'Deux noms, une seule liste',qs:[
   {q:Q+py(`a = [5, 6]
b = a
b.append(7)
print(len(a))`),lab:'affichage :',ans:3,
    why:'b = a ne copie rien : a et b référencent la même liste. append(7) la modifie, donc a contient [5, 6, 7], de longueur 3.'},
   {q:Q+py(`a = [1, 2, 3]
b = a
b[0] = 10
print(sum(a))`),lab:'affichage :',ans:15,
    why:'b[0] = 10 modifie la liste partagée : a vaut [10, 2, 3], de somme 15.'},
   {q:Q+py(`a = [1, 2]
b = a
a = [0]
b.append(5)
print(a, b)`),opts:[cd('[0, 5] [1, 2]'),cd('[0] [0, 5]'),cd('[1, 2, 5] [1, 2, 5]'),cd('[0] [1, 2, 5]')],ans:3,
    why:'a = [0] attache seulement le nom a à une nouvelle liste. b référence toujours l’ancienne, qui devient [1, 2, 5].'},
   {q:Q+py(`x = [4]
y = x
z = y
z.append(1)
y = [9]
print(x)`),opts:[cd('[4]'),cd('[9]'),cd('[4, 1]'),cd('[9, 1]')],ans:2,
    why:'x, y et z référencent la même liste, et z.append(1) la change en [4, 1]. Puis y = [9] déplace seulement le nom y : x voit toujours [4, 1].'},
   {q:Q+py(`L = [1, 2]
M = L
M.append(M[0] + M[1])
L.append(L[2] * 2)
print(sum(M))`),lab:'affichage :',ans:12,
    why:'L et M sont la même liste. Elle devient [1, 2, 3], puis on ajoute 3 · 2 = 6 : [1, 2, 3, 6]. Somme : 12.'},
 ]},
 {n:'Mutable ou immuable',r:'Mutable ou immuable',qs:[
   {q:Q+py(`x = 10
y = x
y += 5
print(x, y)`),opts:[cd('15 15'),cd('10 15'),cd('10 10'),cd('15 10')],ans:1,
    why:'Un entier est immuable : y += 5 crée un nouvel objet 15 et y attache y. x référence toujours 10.'},
   {q:Q+py(`s = 'chat'
t = s
t = t + 's'
print(s)`),opts:[cd('chats'),cd('chat'),cd('s'),`Une erreur ${cd('TypeError')}`],ans:1,
    why:'t + \'s\' fabrique une nouvelle chaîne, attachée au nom t seul. La chaîne de s n’a pas changé : chat.'},
   {q:'Que se passe-t-il&nbsp;?'+py(`mot = 'lune'
mot[0] = 'd'
print(mot)`),opts:[`Il affiche ${cd('dune')}`,`Une erreur ${cd('TypeError')}`,`Il affiche ${cd('lune')}`,`Il affiche ${cd('d')}`],ans:1,
    why:'Une chaîne est immuable : on ne peut pas remplacer une de ses lettres. L’affectation mot[0] = … lève TypeError.'},
   {q:'Lequel de ces types est <b>mutable</b>&nbsp;?',opts:[cd('str'),cd('tuple'),cd('list'),cd('int')],ans:2,
    why:'Une liste se modifie sur place (append, L[i] = x). Les chaînes, les tuples et les entiers ne changent jamais.'},
   {q:Q+py(`a = [1]
b = a
b = b + [2]
b += [3]
print(a, b)`),opts:[cd('[1, 2, 3] [1, 2, 3]'),cd('[1] [1, 2, 3]'),cd('[1, 3] [1, 2, 3]'),cd('[1] [1, 2]')],ans:1,
    why:'b + [2] crée une nouvelle liste [1, 2], attachée à b seul. Ensuite b += [3] modifie sur place cette nouvelle liste. a n’a jamais été touchée : [1].'},
 ]},
 {n:'is contre ==',r:'is contre ==',qs:[
   {q:Q+py(`a = [1, 2]
b = [1, 2]
print(a == b, a is b)`),opts:[cd('True True'),cd('False False'),cd('False True'),cd('True False')],ans:3,
    why:'Les valeurs sont égales, donc a == b vaut True. Mais ce sont deux listes écrites séparément, deux objets distincts : a is b vaut False.'},
   {q:Q+py(`a = [1]
b = a
b.append(2)
print(a is b, a == [1, 2])`),opts:[cd('True True'),cd('True False'),cd('False True'),cd('False False')],ans:0,
    why:'b est un alias de a : a is b vaut True. Le append se voit par les deux noms, donc a vaut [1, 2] et a == [1, 2] vaut True.'},
   {q:'Quelle est la bonne façon de tester si <i>x</i> vaut None&nbsp;?',opts:[cd('x = None'),cd("x == 'None'"),cd('x is None'),cd('None in x')],ans:2,
    why:'Pour None, on teste l’identité avec is. x = None est une affectation, et \'None\' est une chaîne, pas la valeur None.'},
   {q:Q+py(`a = [1, 2]
b = a
a = a + [3]
print(a is b, a == b)`),opts:[cd('True True'),cd('False True'),cd('False False'),cd('True False')],ans:2,
    why:'a + [3] crée une nouvelle liste [1, 2, 3], et a s’y attache. b garde [1, 2]. Deux objets différents, de valeurs différentes : False False.'},
   {q:'Combien de fois ce programme affiche-t-il True&nbsp;?'+py(`a = [5]
b = [5]
c = b
print(a == b, a is b, b is c, a is c)`),lab:'nombre de True :',ans:2,
    why:'a == b est vrai (mêmes valeurs), b is c est vrai (alias). a is b et a is c sont faux : a est un objet à part. Deux True.'},
 ]},
 {n:'Copies superficielles et profondes',r:'Copier une liste de listes',qs:[
   {q:Q+py(`m = [[1, 2], [3, 4]]
c = m[:]
c[0][0] = 9
print(m)`),opts:[cd('[[1, 2], [3, 4]]'),cd('[[9, 2], [3, 4]]'),cd('[[9, 2], [9, 4]]'),cd('[9, [3, 4]]')],ans:1,
    why:'m[:] copie seulement la liste extérieure : c[0] et m[0] sont la même sous-liste. La modifier se voit dans m.'},
   {q:Q+py(`m = [[1, 2], [3, 4]]
c = m.copy()
c[1] = [0, 0]
print(m)`),opts:[cd('[[1, 2], [0, 0]]'),cd('[[0, 0], [3, 4]]'),cd('[[1, 2], [3, 4]]'),cd('[[0, 0], [0, 0]]')],ans:2,
    why:'c[1] = [0, 0] remplace une case de la nouvelle liste extérieure c, sans toucher aux sous-listes. m ne change pas.'},
   {q:Q+py(`import copy
m = [[5], [6]]
c = copy.deepcopy(m)
c[0].append(7)
print(len(m[0]))`),lab:'affichage :',ans:1,
    why:'deepcopy copie aussi les sous-listes : c[0] est une nouvelle liste. Le append ne touche pas m[0], qui vaut toujours [5].'},
   {q:Q+py(`L = [1, 2, 3]
M = list(L)
M.append(4)
print(len(L))`),lab:'affichage :',ans:3,
    why:'list(L) fabrique une nouvelle liste avec les mêmes éléments. Ajouter à M ne change pas L, qui garde 3 éléments.'},
   {q:Q+py(`m = [[0, 0], [0, 0]]
c = list(m)
c[0][1] = 4
c[1] = [7, 7]
print(sum(m[0]) + sum(m[1]))`),lab:'affichage :',ans:4,
    why:'c[0] et m[0] sont la même sous-liste, qui devient [0, 4]. c[1] = [7, 7] change seulement une case de c. m vaut [[0, 4], [0, 0]] : total 4.'},
 ]},
 {n:'Modifier ou réaffecter',r:'Suivre la mémoire : modifier ou réaffecter',qs:[
   {q:Q+py(`p = [2]
q = p
p.append(3)
q = q + [4]
p[0] = 0
print(p, q)`),opts:[cd('[0, 3] [0, 3, 4]'),cd('[0, 3] [2, 3, 4]'),cd('[2, 3] [2, 3, 4]'),cd('[0, 3, 4] [0, 3, 4]')],ans:1,
    why:'append modifie la liste partagée : [2, 3]. q + [4] crée une nouvelle liste [2, 3, 4] pour q seul. Puis p[0] = 0 ne touche que l’ancienne : [0, 3].'},
   {q:Q+py(`a = [1, 1]
b = [a] * 3
a[0] = 5
print(b)`),opts:[cd('[[1, 1], [1, 1], [1, 1]]'),cd('[[5, 1], [1, 1], [1, 1]]'),cd('[5, 1, 1, 1]'),cd('[[5, 1], [5, 1], [5, 1]]')],ans:3,
    why:'[a] * 3 contient trois flèches vers la même liste. a[0] = 5 modifie cette liste, que b voit trois fois.'},
   {q:Q+py(`a = [1, 1]
b = [a] * 2
a = [2, 2]
b[1][0] = 8
print(sum(b[0]))`),lab:'affichage :',ans:9,
    why:'b contient deux fois l’ancienne liste [1, 1]. a = [2, 2] déplace seulement le nom a. b[1][0] = 8 modifie l’ancienne liste, qui est aussi b[0] : [8, 1], somme 9.'},
   {q:`Après ${cd('M = L')}, laquelle de ces lignes change aussi ce que voit <i>M</i>&nbsp;?`,opts:[cd('L = L + [1]'),cd('L = [0]'),cd('L = L * 2'),cd('L.append(1)')],ans:3,
    why:'append modifie l’objet sur place, partagé par L et M. Les trois autres lignes réaffectent L à un nouvel objet et laissent M intacte.'},
   {q:Q+py(`x = [1, 2]
y = x
x += [3]
x = x + [4]
y.append(5)
print(sum(x) + sum(y))`),lab:'affichage :',ans:21,
    why:'x += [3] modifie la liste partagée : [1, 2, 3]. x + [4] crée une nouvelle liste [1, 2, 3, 4] pour x. y.append(5) change l’ancienne en [1, 2, 3, 5]. Total : 10 + 11 = 21.'},
 ]},
];
})();
