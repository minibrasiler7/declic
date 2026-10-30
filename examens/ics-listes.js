/* Déclic — examen de compétence : Chaînes et listes */
(()=>{
const cd=s=>`<code>${esc(s)}</code>`;
const Q='Qu’affiche ce programme&nbsp;?';
EXAMS['ics-listes']=[
 {n:'Indices positifs et négatifs',r:'Indices',qs:[
   {q:`Avec ${cd("s = 'ALGORITHME'")}, que vaut ${cd('s[-2]')}&nbsp;?`,opts:[cd("'H'"),cd("'M'"),cd("'E'"),cd("'L'")],ans:1,
    why:'s a 10 caractères. L’indice −2 vaut 10 − 2 = 8, l’avant-dernier caractère : M.'},
   {q:`Quel est le plus grand indice positif valide pour la chaîne ${cd("'bonjour'")}&nbsp;?`,lab:'indice :',ans:6,
    why:'La chaîne a 7 caractères, numérotés de 0 à 7 − 1 = 6.'},
   {q:Q+py(`L = [10, 20, 30, 40, 50]
print(L[-1] - L[1])`),lab:'affichage :',ans:30,
    why:'L[−1] est le dernier élément, 50, et L[1] le deuxième, 20. 50 − 20 = 30.'},
   {q:'Que se passe-t-il&nbsp;?'+py(`s = 'python'
print(s[6])`),opts:[`Il affiche ${cd('n')}`,`Une erreur ${cd('IndexError')}`,`Il affiche ${cd('p')}`,'Il n’affiche rien'],ans:1,
    why:'\'python\' a 6 caractères, d’indices 0 à 5. L’indice 6 n’existe pas : IndexError. Le dernier caractère est s[5] ou s[−1].'},
 ]},
 {n:'Calculer une tranche',r:'Calculer une tranche',qs:[
   {q:`Avec ${cd("s = 'informatique'")}, que vaut ${cd('s[2:6]')}&nbsp;?`,opts:[cd("'nfor'"),cd("'forma'"),cd("'form'"),cd("'orma'")],ans:2,
    why:'On prend les indices 2, 3, 4, 5 (6 exclu) : f, o, r, m. Soit 6 − 2 = 4 caractères.'},
   {q:`Avec ${cd("s = 'informatique'")}, que vaut ${cd('s[-5:]')}&nbsp;?`,opts:[cd("'tique'"),cd("'atique'"),cd("'ique'"),cd("'q'")],ans:0,
    why:'s a 12 caractères, donc −5 vaut 12 − 5 = 7. De l’indice 7 jusqu’au bout : tique.'},
   {q:`Avec ${cd("s = 'informatique'")}, que vaut ${cd('s[::3]')}&nbsp;?`,opts:[cd("'ifmtq'"),cd("'ioaq'"),cd("'nrae'"),cd("'ioai'")],ans:1,
    why:'On parcourt tout, de 3 en 3 : indices 0, 3, 6, 9, soit i, o, a, q. L’indice 12 dépasserait la fin, qui est l’indice 11.'},
   {q:`Avec ${cd("s = 'informatique'")}, que vaut ${cd('len(s[3:10])')}&nbsp;?`,lab:'longueur =',ans:7,
    why:'Quand 0 ≤ a ≤ b ≤ len(s), la tranche s[a:b] a b − a caractères : 10 − 3 = 7.'},
   {q:`Avec ${cd("s = 'informatique'")}, que vaut ${cd('s[5:2]')}&nbsp;?`,opts:[cd("'rof'"),`Une erreur ${cd('IndexError')}`,cd("'for'"),cd("''")],ans:3,
    why:'Le début 5 est après la fin 2, avec un pas positif : la tranche est simplement vide. Une tranche ne lève jamais d’erreur.'},
 ]},
 {n:'Méthodes des chaînes',r:'Méthodes des chaînes',qs:[
   {q:Q+py(`print('Le Ciel Bleu'.lower().split())`),opts:[cd("['Le', 'Ciel', 'Bleu']"),cd("'le ciel bleu'"),cd("['le', 'ciel', 'bleu']"),cd("['le ciel bleu']")],ans:2,
    why:'lower() donne \'le ciel bleu\', puis split() coupe aux espaces : une liste de trois mots.'},
   {q:Q+py(`print(len('-'.join(['ab', 'cde', 'f'])))`),lab:'affichage :',ans:8,
    why:'join recolle les mots avec un tiret entre deux voisins : \'ab-cde-f\'. 6 lettres et 2 tirets : 8 caractères.'},
   {q:Q+py(`m = 'mississippi'
print(m.count('s') + m.find('p'))`),lab:'affichage :',ans:12,
    why:'Il y a 4 lettres s. Le premier p est à l’indice 8 (m-i-s-s-i-s-s-i occupent 0 à 7). 4 + 8 = 12.'},
   {q:Q+py(`s = 'banane'
s.upper()
print(s)`),opts:[cd('BANANE'),cd('banane'),cd('Banane'),cd('None')],ans:1,
    why:'Une chaîne est immuable : upper() renvoie une nouvelle chaîne, ici jetée. s n’a pas changé. Il fallait écrire s = s.upper().'},
   {q:Q+py(`print('carotte'.replace('t', 'l').upper())`),opts:[cd('CAROTTE'),cd('carolle'),cd('CAROLTE'),cd('CAROLLE')],ans:3,
    why:'replace remplace tous les t : \'carolle\'. Puis upper met en majuscules : CAROLLE.'},
 ]},
 {n:'Modifier une liste',r:'Modifier une liste',qs:[
   {q:Q+py(`L = [4, 7, 1]
L.insert(1, 9)
L.append(L.pop(0))
print(L)`),opts:[cd('[9, 7, 1, 4]'),cd('[4, 9, 7, 1]'),cd('[9, 7, 1]'),cd('[7, 1, 4, 9]')],ans:0,
    why:'insert(1, 9) place 9 avant l’indice 1 : [4, 9, 7, 1]. pop(0) retire et renvoie 4, que append remet à la fin : [9, 7, 1, 4].'},
   {q:Q+py(`L = [2, 5, 2, 8, 2]
L.remove(2)
L.remove(2)
print(L)`),opts:[cd('[5, 8]'),cd('[5, 2, 8, 2]'),cd('[5, 8, 2]'),cd('[2, 5, 8]')],ans:2,
    why:'remove retire la première occurrence seulement. Deux appels retirent les deux premiers 2 : [5, 8, 2].'},
   {q:Q+py(`L = [6, 3, 9]
L = L.sort()
print(L)`),opts:[cd('[3, 6, 9]'),cd('None'),cd('[6, 3, 9]'),cd('[9, 6, 3]')],ans:1,
    why:'sort() trie sur place et renvoie None. L = L.sort() attache donc le nom L à None, et la liste triée est perdue.'},
   {q:Q+py(`L = [5, 1, 4]
M = sorted(L)
L.append(0)
print(M[0] + L[-1])`),lab:'affichage :',ans:1,
    why:'sorted renvoie une nouvelle liste [1, 4, 5], qui ne voit pas le append. M[0] = 1 et L[−1] = 0 : on affiche 1.'},
   {q:Q+py(`L = [1, 2, 3, 4]
x = L.pop()
y = L.pop(1)
print(x * 10 + y)`),lab:'affichage :',ans:42,
    why:'pop() retire le dernier : x = 4 et L = [1, 2, 3]. pop(1) retire l’indice 1 : y = 2. 4 · 10 + 2 = 42.'},
 ]},
 {n:'Parcourir par valeur, par indice, avec enumerate',r:'Parcourir par valeur, par indice ou avec enumerate',qs:[
   {q:Q+py(`L = [3, 6, 2]
s = 0
for i, x in enumerate(L):
    if i % 2 == 0:
        s += x
print(s)`),lab:'s =',ans:5,
    why:'On garde les éléments d’indice pair, 0 et 2 : 3 + 2 = 5.'},
   {q:Q+py(`L = [1, 2, 3]
for x in L:
    x = x * 10
print(L)`),opts:[cd('[10, 20, 30]'),cd('[1, 2, 3]'),cd('30'),cd('[1, 2, 30]')],ans:1,
    why:'x est un nom qui reçoit chaque valeur. Le réaffecter ne change pas les cases de L. Il faut passer par les indices : L[i] = L[i] * 10.'},
   {q:Q+py(`L = [1, 2, 3]
for i in range(len(L)):
    L[i] = L[i] * L[i]
print(sum(L))`),lab:'affichage :',ans:14,
    why:'Par les indices, on modifie vraiment chaque case : L = [1, 4, 9], de somme 14.'},
   {q:Q+py(`L = [2, 8, 5, 8, 1]
im = 0
for i, x in enumerate(L):
    if x >= L[im]:
        im = i
print(im)`),lab:'im =',ans:3,
    why:'Avec ≥, chaque égalité remplace le meilleur : im passe à 1 (8), puis à 3 (le second 8). Le dernier ex æquo gagne.'},
 ]},
 {n:'Construire une nouvelle liste',r:'Construire une nouvelle liste',qs:[
   {q:Q+py(`mots = ['sol', 'arbre', 'ciel', 'eau']
res = []
for m in mots:
    if 'e' in m:
        res.append(len(m))
print(res)`),opts:[cd('[5, 4]'),cd("['arbre', 'ciel', 'eau']"),cd('[3, 5, 4, 3]'),cd('[5, 4, 3]')],ans:3,
    why:'Le filtre garde les mots qui contiennent e : arbre, ciel, eau. La transformation ajoute leur longueur : [5, 4, 3].'},
   {q:Q+py(`L = [3, -1, 4, -5, 2]
res = []
for x in L:
    if x > 0:
        res.append(2 * x)
print(sum(res))`),lab:'affichage :',ans:18,
    why:'On garde 3, 4 et 2, doublés : [6, 8, 4]. Somme : 18.'},
   {q:Q+py(`ini = ''
for m in 'tout va tres bien'.split():
    ini = ini + m[0]
print(ini.upper())`),opts:[cd('TVTB'),cd('tvtb'),cd('TOUT VA TRES BIEN'),cd('TB')],ans:0,
    why:'On part de la chaîne vide et on colle la première lettre de chaque mot : \'tvtb\'. upper() la met en majuscules.'},
   {q:Q+py(`res = []
for c in 'abcabc':
    if c != 'b':
        res.append(c.upper())
print(''.join(res))`),opts:[cd('AC'),cd('ABCABC'),cd('ACAC'),cd("['A', 'C', 'A', 'C']")],ans:2,
    why:'On garde a, c, a, c en majuscules : [\'A\', \'C\', \'A\', \'C\']. join avec la chaîne vide les recolle sans séparateur.'},
 ]},
 {n:'Comparer des voisins',r:'Comparer des voisins',qs:[
   {q:`Pour ${cd('L = [5, 3, 8, 8, 10, 2]')}, combien d’indices <i>i</i> vérifient ${cd('L[i] > L[i + 1]')}&nbsp;?`,lab:'baisses :',ans:2,
    why:'On compare les 5 couples voisins : 5 &gt; 3 oui, 3 &gt; 8 non, 8 &gt; 8 non, 8 &gt; 10 non, 10 &gt; 2 oui. Deux baisses.'},
   {q:'Pour une liste de 7 éléments, combien de comparaisons entre voisins fait la boucle ' + cd('for i in range(len(L) - 1):') + '&nbsp;?',lab:'comparaisons :',ans:6,
    why:'i va de 0 à len(L) − 2 = 5 : 6 tours, un par couple de voisins.'},
   {q:Q+py(`L = [3, 7, 6, 12, 10]
e = 0
for i in range(len(L) - 1):
    d = L[i + 1] - L[i]
    if d > e:
        e = d
print(e)`),lab:'e =',ans:6,
    why:'Les écarts successifs valent 4, −1, 6, −2. La plus forte hausse entre voisins est 6 (de 6 à 12).'},
   {q:'Que se passe-t-il à l’exécution&nbsp;?'+py(`def est_triee(L):
    for i in range(len(L)):
        if L[i] > L[i + 1]:
            return False
    return True

print(est_triee([1, 4, 9]))`),opts:[cd('True'),cd('False'),`Une erreur ${cd('IndexError')}`,cd('None')],ans:2,
    why:'La liste est triée, donc aucun return False. Au dernier tour, i = 2 et la fonction lit L[3], qui n’existe pas : IndexError. Il fallait range(len(L) − 1).'},
 ]},
];
})();
