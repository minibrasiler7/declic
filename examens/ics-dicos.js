/* Déclic — examen de compétence : Tuples, dictionnaires et compréhensions */
(()=>{
const cd=s=>`<code>${esc(s)}</code>`;
const Q='Qu’affiche ce programme&nbsp;?';
EXAMS['ics-dicos']=[
 {n:'Tuples et déballage',r:'Tuples et déballage',qs:[
   {q:Q+py(`a, b = 3, 5
a, b = a + b, a * b
print(a - b)`),lab:'affichage :',ans:-7,
    why:'Toute la partie droite est évaluée avant d’affecter : (3 + 5, 3 · 5) = (8, 15). Donc a = 8, b = 15 et a − b = −7.'},
   {q:Q+py(`u = (4)
v = (4,)
print(u * 2, v * 2)`),opts:[cd('8 8'),cd('(4, 4) (4, 4)'),cd('8 (4, 4)'),cd('(4, 4) 8')],ans:2,
    why:'(4) est juste l’entier 4, donc u * 2 = 8. (4,) est un tuple à un élément, et le répéter donne (4, 4).'},
   {q:'Que se passe-t-il&nbsp;?'+py(`a, b = (1, 2, 3)`),opts:[`a = 1 et b = 2`,`a = 1 et b = (2, 3)`,`Une erreur ${cd('ValueError')}`,`a = (1, 2) et b = 3`],ans:2,
    why:'Le déballage exige autant de noms que d’éléments. Trois valeurs pour deux noms : ValueError.'},
   {q:Q+py(`def bornes(L):
    return min(L), max(L)

lo, hi = bornes([6, 2, 9, 4])
print(hi - lo)`),lab:'affichage :',ans:7,
    why:'La fonction renvoie le tuple (2, 9), déballé en lo = 2 et hi = 9. 9 − 2 = 7.'},
 ]},
 {n:'Lire et modifier un dictionnaire',r:'Dictionnaires',qs:[
   {q:Q+py(`d = {'x': 3, 'y': 5}
d['z'] = d['x'] * 2
d['x'] = 0
print(sum(d.values()))`),lab:'affichage :',ans:11,
    why:'On ajoute \'z\': 6, puis x passe à 0. Il reste {\'x\': 0, \'y\': 5, \'z\': 6}, de somme 11.'},
   {q:Q+py(`d = {'x': 3, 'y': 5}
print(d.get('w', 10) + d.get('y', 0))`),lab:'affichage :',ans:15,
    why:'La clé \'w\' manque : get renvoie la valeur par défaut 10. La clé \'y\' existe : get renvoie 5. Total : 15.'},
   {q:'Que se passe-t-il&nbsp;?'+py(`d = {'a': 1}
print(d['b'])`),opts:[`Il affiche ${cd('None')}`,`Il affiche ${cd('0')}`,`Une erreur ${cd('IndexError')}`,`Une erreur ${cd('KeyError')}`],ans:3,
    why:'Lire une clé absente avec des crochets lève KeyError. Pour avoir une valeur par défaut, on écrit d.get(\'b\', 0).'},
   {q:Q+py(`prix = {'pain': 3, 'lait': 2}
print('lait' in prix, 2 in prix)`),opts:[cd('True True'),cd('True False'),cd('False True'),cd('False False')],ans:1,
    why:'in teste les clés, pas les valeurs. \'lait\' est une clé : True. 2 n’est qu’une valeur : False.'},
 ]},
 {n:'Compter et parcourir un dictionnaire',r:'Parcourir un dictionnaire',qs:[
   {q:Q+py(`d = {}
for c in 'banana':
    d[c] = d.get(c, 0) + 1
print(d)`),opts:[cd("{'b': 1, 'a': 3, 'n': 2}"),cd("{'a': 3, 'b': 1, 'n': 2}"),cd("{'b': 1, 'a': 1, 'n': 1}"),cd("{'banana': 1}")],ans:0,
    why:'Chaque lettre ajoute 1 à son compteur, créé à 0 par get la première fois. Les clés gardent l’ordre de première apparition : b, a, n.'},
   {q:Q+py(`d = {}
for m in 'le chat et le chien et le loup'.split():
    d[m] = d.get(m, 0) + 1
print(d['le'] * len(d))`),lab:'affichage :',ans:15,
    why:'le apparaît 3 fois. Les mots distincts sont le, chat, et, chien, loup : 5 clés. 3 · 5 = 15.'},
   {q:Q+py(`v = {'A': 4, 'B': 9, 'C': 9, 'D': 2}
cle, best = '', 0
for k, x in v.items():
    if x > best:
        cle, best = k, x
print(cle)`),opts:[cd('B'),cd('C'),cd('9'),cd('D')],ans:0,
    why:'B prend la tête avec 9. Pour C, 9 &gt; 9 est faux : avec &gt;, le premier ex æquo reste le meilleur.'},
   {q:Q+py(`d = {'a': 2, 'b': 5, 'c': 1}
t = ''
for k in d:
    t = t + k * d[k]
print(len(t))`),lab:'affichage :',ans:8,
    why:'for k in d parcourt les clés. t = \'aa\' + \'bbbbb\' + \'c\' = \'aabbbbbc\' : 2 + 5 + 1 = 8 caractères.'},
   {q:Q+py(`d = {'u': 3, 'v': 4, 'w': 7}
for k, x in d.items():
    if x % 2 == 1:
        print(k, end='')`),opts:[cd('v'),cd('uw'),cd('37'),cd('uvw')],ans:1,
    why:'items() donne les couples (\'u\', 3), (\'v\', 4), (\'w\', 7). Seules les valeurs 3 et 7 sont impaires : on affiche u puis w.'},
 ]},
 {n:'Regrouper dans un dictionnaire de listes',r:'Regrouper dans un dictionnaire de listes',qs:[
   {q:'Que vaut ' + cd("len(gr['p'])") + ' à la fin&nbsp;?'+py(`mots = ['pomme', 'poire', 'kiwi', 'prune', 'kaki']
gr = {}
for m in mots:
    c = m[0]
    if c not in gr:
        gr[c] = []
    gr[c].append(m)`),lab:'longueur =',ans:3,
    why:'gr = {\'p\': [\'pomme\', \'poire\', \'prune\'], \'k\': [\'kiwi\', \'kaki\']}. La liste de la lettre p a 3 mots.'},
   {q:'Que vaut ' + cd('sum(g[0])') + ' à la fin&nbsp;?'+py(`L = [12, 7, 15, 20, 9, 4]
g = {}
for x in L:
    r = x % 4
    if r not in g:
        g[r] = []
    g[r].append(x)`),lab:'somme =',ans:36,
    why:'Les restes par 4 sont 0, 3, 3, 0, 1, 0. g[0] = [12, 20, 4], de somme 36.'},
   {q:Q+py(`L = [1, 2, 3, 4, 5]
g = {}
for x in L:
    r = x % 2
    g[r] = []
    g[r].append(x)
print(g)`),opts:[cd('{1: [1, 3, 5], 0: [2, 4]}'),cd('{1: [5], 0: [4]}'),cd('{1: [1], 0: [2]}'),`Une erreur ${cd('KeyError')}`],ans:1,
    why:'g[r] = [] est exécuté à chaque tour, sans test : la liste est recréée vide et perd ce qu’elle contenait. Il ne reste que le dernier nombre de chaque catégorie.'},
   {q:Q+py(`mots = ['un', 'deux', 'trois', 'six', 'dix']
gr = {}
for m in mots:
    n = len(m)
    if n not in gr:
        gr[n] = []
    gr[n].append(m)
print(len(gr), gr[3])`),opts:[cd("5 ['six', 'dix']"),cd("4 ['six', 'dix']"),cd("4 ['dix', 'six']"),cd("4 ['six']")],ans:1,
    why:'Les longueurs sont 2, 4, 5, 3, 3 : quatre clés. La liste de la clé 3 reçoit six puis dix, dans l’ordre du parcours.'},
 ]},
 {n:'Compréhensions',r:'Compréhensions',qs:[
   {q:`Que vaut ${cd('[x * 2 for x in range(5) if x % 2 == 1]')}&nbsp;?`,opts:[cd('[0, 4, 8]'),cd('[1, 3]'),cd('[2, 6]'),cd('[2, 4, 6, 8]')],ans:2,
    why:'Le filtre garde les impairs 1 et 3 de range(5), puis l’expression les double : [2, 6].'},
   {q:`Que vaut ${cd('len([x for x in range(30) if x % 4 == 0])')}&nbsp;?`,lab:'longueur =',ans:8,
    why:'Les multiples de 4 de 0 à 29 sont 0, 4, 8, 12, 16, 20, 24, 28 : il y en a 8, sans oublier 0.'},
   {q:`Que vaut ${cd('sum([x * x for x in range(1, 5)])')}&nbsp;?`,lab:'somme =',ans:30,
    why:'La liste des carrés vaut [1, 4, 9, 16], de somme 30.'},
   {q:`Que vaut ${cd("{m[0]: m for m in ['ane', 'bol', 'arc']}")}&nbsp;?`,opts:[cd("{'a': 'ane', 'b': 'bol'}"),cd("{'a': ['ane', 'arc'], 'b': ['bol']}"),cd("{'a': 'arc', 'b': 'bol'}"),cd("{'ane': 'a', 'bol': 'b', 'arc': 'a'}")],ans:2,
    why:'La clé \'a\' reçoit d’abord \'ane\', puis \'arc\' l’écrase, car une clé est unique. Il reste deux clés.'},
   {q:`Que vaut ${cd('sum([x if x > 0 else 0 for x in [3, -2, 5, -1]])')}&nbsp;?`,lab:'somme =',ans:8,
    why:'L’expression conditionnelle remplace les négatifs par 0 : [3, 0, 5, 0], de somme 8.'},
 ]},
 {n:'Deux for et ordre des chaînes',r:'Compréhension à deux for, et ordre des chaînes',qs:[
   {q:`Que vaut ${cd('len([(a, b) for a in range(4) for b in range(4) if a < b])')}&nbsp;?`,lab:'longueur =',ans:6,
    why:'On garde les couples a &lt; b parmi 0 à 3 : (0, 1), (0, 2), (0, 3), (1, 2), (1, 3), (2, 3). Six paires.'},
   {q:`Que vaut ${cd("[a + b for a in 'xy' for b in '12']")}&nbsp;?`,opts:[cd("['x1', 'y1', 'x2', 'y2']"),cd("['x1', 'x2', 'y1', 'y2']"),cd("['xy12']"),cd("['1x', '2x', '1y', '2y']")],ans:1,
    why:'Le premier for est la boucle extérieure : pour a = x, b vaut 1 puis 2 ; puis pour a = y. Ordre : x1, x2, y1, y2.'},
   {q:'Laquelle de ces comparaisons vaut True&nbsp;?',opts:[cd("'chien' < 'chat'"),cd("'ourson' < 'ours'"),cd("'Zoe' < 'ana'"),cd("'b' < 'abc'")],ans:2,
    why:'Les majuscules passent avant les minuscules : Z &lt; a. Pour chien et chat, i vient après a. ours est un préfixe de ourson, donc passe devant. b vient après a.'},
   {q:`Que vaut ${cd("sorted(['pomme', 'Poire', 'abricot'])")}&nbsp;?`,opts:[cd("['abricot', 'Poire', 'pomme']"),cd("['abricot', 'pomme', 'Poire']"),cd("['pomme', 'Poire', 'abricot']"),cd("['Poire', 'abricot', 'pomme']")],ans:3,
    why:'On compare la première lettre : P majuscule passe avant toutes les minuscules, puis a vient avant p. Ordre : Poire, abricot, pomme.'},
 ]},
 {n:'Choisir la bonne structure',r:'Choisir la bonne structure de données',qs:[
   {q:`Que vaut ${cd('len(set([3, 1, 3, 2, 1, 3]))')}&nbsp;?`,lab:'longueur =',ans:3,
    why:'set garde chaque valeur une seule fois : {1, 2, 3}. Trois valeurs distinctes.'},
   {q:Q+py(`s = set()
for c in 'cocotte':
    s.add(c)
print(len(s))`),lab:'affichage :',ans:4,
    why:'add n’ajoute pas une lettre déjà présente. Les lettres distinctes sont c, o, t, e : 4.'},
   {q:'Tu dois savoir très vite si un nom figure parmi les inscrits, chaque nom n’étant inscrit qu’une fois. Que choisis-tu&nbsp;?',opts:['Une liste de noms','Un tuple de noms','Un ensemble de noms','Un dictionnaire nombre → nom'],ans:2,
    why:'On ne pose qu’une question, « est-il dedans ? », sans doublon : un ensemble, avec le test nom in inscrits.'},
   {q:'Tu notes les numéros des coureurs dans l’ordre où ils passent à un point de contrôle. Un coureur peut passer plusieurs fois. Que choisis-tu&nbsp;?',opts:['Un dictionnaire','Une liste','Un ensemble','Un tuple de deux éléments'],ans:1,
    why:'Il faut garder l’ordre et accepter les doublons : seule la liste fait les deux, avec append à chaque passage.'},
   {q:'On veut associer à chaque point du plan, repéré par ses coordonnées, le nom d’une ville. Lequel peut servir de clé de dictionnaire&nbsp;?',opts:[cd('[2, 5]'),cd('(2, 5)'),cd("{'x': 2, 'y': 5}"),'Aucun des trois'],ans:1,
    why:'Une clé doit être immuable. Le tuple (2, 5) l’est ; une liste et un dictionnaire sont mutables et ne peuvent pas servir de clé.'},
 ]},
];
})();
