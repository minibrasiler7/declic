/* Déclic — examen de compétence : Syntaxe, types et variables */
(()=>{
const cd=s=>`<code>${esc(s)}</code>`;
const Q='Qu’affiche ce programme&nbsp;?';
EXAMS['ics-syntaxe']=[
 {n:'Types et conversions',r:'Conversions et affectation',qs:[
   {q:`Quel est le type de ${cd('12 / 4')}&nbsp;?`,opts:[cd('int'),cd('float'),cd('str'),cd('bool')],ans:1,
    why:`${cd('/')} est la division exacte : elle rend toujours un float, même quand elle tombe juste. 12 / 4 vaut 3.0.`},
   {q:Q+py(`print(int('7') + int(2.9) * 2)`),lab:'affichage :',ans:11,
    why:`int('7') vaut l’entier 7 et int(2.9) tronque vers 0 : 2. Puis 2 * 2 = 4 passe avant l’addition : 7 + 4 = 11.`},
   {q:Q+py(`a = '4'
b = a * 3
c = int(b) + 1
print(c)`),lab:'affichage :',ans:445,
    why:`a est la chaîne '4', donc a * 3 répète la chaîne : b = '444'. int(b) vaut 444, et c = 445.`},
   {q:`Que vaut ${cd('int(-5.7)')}&nbsp;?`,lab:'résultat =',ans:-5,
    why:'int() tronque vers 0 : il efface la partie décimale sans arrondir vers le bas. int(−5.7) vaut −5, pas −6.'},
   {q:Q+py(`a, b = 5, 9
a, b = b, a
a += b
print(a, b)`),opts:[cd('14 5'),cd('14 9'),cd('5 14'),cd('9 5')],ans:0,
    why:'L’échange donne a = 9 et b = 5. Puis a += b remplace a par 9 + 5 = 14. On affiche 14 5.'},
 ]},
 {n:'Quotient entier et reste, même négatif',r:'Quotient entier et reste',qs:[
   {q:`Que vaut ${cd('47 % 6')}&nbsp;?`,lab:'résultat =',ans:5,
    why:'47 = 6 · 7 + 5 : le quotient entier est 7 et le reste 5.'},
   {q:`Que vaut ${cd('-13 // 4')}&nbsp;?`,lab:'résultat =',ans:-4,
    why:'−13 / 4 = −3,25 et // arrondit vers le bas, donc vers −∞ : −4, pas −3.'},
   {q:`Que vaut ${cd('-13 % 4')}&nbsp;?`,lab:'résultat =',ans:3,
    why:'Avec q = −13 // 4 = −4, on a −13 = 4 · (−4) + r, donc r = −13 + 16 = 3. Le reste est bien entre 0 et 3.'},
   {q:`Quel entier <i>a</i> vérifie ${cd('a // 5 == -2')} et ${cd('a % 5 == 4')}&nbsp;?`,lab:'a =',ans:-6,
    why:'On recolle avec a = b·q + r : a = 5 · (−2) + 4 = −6. Contrôle : −6 / 5 = −1,2 arrondi vers le bas donne −2.'},
   {q:Q+py(`print(-20 // 6 + -20 % 6)`),lab:'affichage :',ans:0,
    why:'Le moins unaire passe avant // et %. −20 // 6 = −4 (car −3,33 arrondi vers le bas), et −20 = 6 · (−4) + 4 donne −20 % 6 = 4. Total : −4 + 4 = 0.'},
 ]},
 {n:'Priorités des opérateurs',r:'Priorités des opérateurs',qs:[
   {q:`Que vaut ${cd('3 + 2 ** 3 * 2')}&nbsp;?`,lab:'résultat =',ans:19,
    why:'D’abord 2 ** 3 = 8, puis 8 * 2 = 16, enfin 3 + 16 = 19.'},
   {q:`Que vaut ${cd('-3 ** 2 + 10')}&nbsp;?`,lab:'résultat =',ans:1,
    why:'** passe avant le moins unaire : −3 ** 2 = −(3 ** 2) = −9. Puis −9 + 10 = 1.'},
   {q:`Que vaut ${cd('2 ** 2 ** 3')}&nbsp;?`,lab:'résultat =',ans:256,
    why:'La puissance se lit de droite à gauche : 2 ** (2 ** 3) = 2 ** 8 = 256, et non (2 ** 2) ** 3 = 64.'},
   {q:`Que vaut ${cd('20 - 6 // 4 * 3')}&nbsp;?`,lab:'résultat =',ans:17,
    why:'// et * ont la même priorité, de gauche à droite : 6 // 4 = 1, puis 1 * 3 = 3. Enfin 20 − 3 = 17.'},
   {q:Q+py(`print(100 / 10 / 5)`),opts:[cd('50.0'),cd('2'),cd('2.0'),cd('0.2')],ans:2,
    why:'De gauche à droite : 100 / 10 = 10.0, puis 10.0 / 5 = 2.0. La division / rend un float, d’où 2.0 et pas 2.'},
 ]},
 {n:'Découper un nombre avec // et %',r:'Découper un nombre avec // et %',qs:[
   {q:`Un trajet dure 500 secondes. Combien de secondes restent une fois les minutes complètes comptées, c’est-à-dire que vaut ${cd('500 % 60')}&nbsp;?`,lab:'secondes :',ans:20,
    why:'500 = 60 · 8 + 20 : 8 minutes complètes et 20 secondes.'},
   {q:`Que vaut ${cd('93746 // 1000 % 10')}&nbsp;?`,lab:'résultat =',ans:3,
    why:'93746 // 1000 = 93 efface les trois derniers chiffres, puis 93 % 10 = 3 : c’est le chiffre des milliers.'},
   {q:'Quelle expression donne le chiffre des dizaines d’un entier positif <i>n</i>&nbsp;?',opts:[cd('n % 10'),cd('n % 100'),cd('n // 10'),cd('n // 10 % 10')],ans:3,
    why:'n // 10 efface le chiffre des unités, et % 10 garde le dernier chiffre restant. n % 100 garde deux chiffres, et n // 10 en garde trop.'},
   {q:Q+py(`n = 4567
print(n % 10 + n // 10 % 10 + n // 100 % 10 + n // 1000)`),lab:'affichage :',ans:22,
    why:'Les quatre termes sont les chiffres 7, 6, 5 et 4. Leur somme vaut 22.'},
   {q:`Quel entier <i>t</i> vérifie ${cd('t // 60 == 7')} et ${cd('t % 60 == 15')}&nbsp;?`,lab:'t =',ans:435,
    why:'On recolle les morceaux : t = 60 · 7 + 15 = 435. Ce sont 7 min 15 s.'},
 ]},
 {n:'Lire un message d’erreur',r:'Lire un message d’erreur',qs:[
   {q:'Quelle erreur provoque ce programme&nbsp;?'+py(`points = 12
print('Score : ' + points)`),opts:[cd('NameError'),cd('TypeError'),cd('ValueError'),cd('SyntaxError')],ans:1,
    why:'On colle une chaîne et un entier avec + : les types sont incompatibles, d’où TypeError.'},
   {q:'Quelle erreur provoque cette ligne&nbsp;?'+py(`n = int('douze')`),opts:[cd('TypeError'),cd('NameError'),cd('ValueError'),'Aucune : <i>n</i> vaut 12'],ans:2,
    why:'int() reçoit bien une chaîne, le bon type, mais cette chaîne n’est pas l’écriture d’un entier : la valeur est impossible, d’où ValueError.'},
   {q:'Quelle erreur provoque ce programme&nbsp;?'+py(`total = 5
print(totl * 2)`),opts:[cd('NameError'),cd('TypeError'),cd('SyntaxError'),'Aucune : il affiche 10'],ans:0,
    why:'totl est une faute de frappe : ce nom n’a jamais été créé. Python lève NameError à la ligne 2.'},
   {q:'Quelle erreur provoque ce programme&nbsp;?'+py(`n = 10
print(n / (n - 10))`),opts:[cd('ValueError'),cd('TypeError'),'Aucune : il affiche 0',cd('ZeroDivisionError')],ans:3,
    why:'n − 10 vaut 0 : on divise par zéro, d’où ZeroDivisionError.'},
   {q:`La ligne ${cd("print('Total : ' + 3 * 4)")} lève TypeError. Quelle correction affiche Total : 12&nbsp;?`,opts:[cd("print('Total : ' + int(3 * 4))"),cd("print('Total : ' + '3 * 4')"),cd("print('Total : ' + str(3 * 4))"),cd("print(str('Total : ') + 3 * 4)")],ans:2,
    why:'Il faut convertir le nombre 12 en chaîne avant de coller : str(3 * 4) vaut \'12\'. Avec \'3 * 4\' entre guillemets, on afficherait le texte 3 * 4.'},
 ]},
 {n:'Tracer un programme',r:'Tracer un programme avec un tableau',qs:[
   {q:Q+py(`a = 6
b = a // 4
a = a * b + b
b = a % b
print(a, b)`),opts:[cd('7 1'),cd('6 1'),cd('7 0'),cd('6 0')],ans:2,
    why:'b = 6 // 4 = 1, puis a = 6 · 1 + 1 = 7. Enfin b = 7 % 1 = 0, avec le nouveau a. On affiche 7 0.'},
   {q:Q+py(`x = 4
x = x * x
x = x - 5
y = x // 3
x += y
print(x)`),lab:'affichage :',ans:14,
    why:'x vaut 16, puis 11. y = 11 // 3 = 3, et x devient 11 + 3 = 14.'},
   {q:Q+py(`a, b = 2, 7
a = a + b
b = a - b
a = a - b
print(a, b)`),opts:[cd('2 7'),cd('7 2'),cd('9 2'),cd('7 9')],ans:1,
    why:'a = 9, puis b = 9 − 7 = 2, puis a = 9 − 2 = 7. Les deux valeurs ont été échangées : 7 2.'},
   {q:Q+py(`s = '5'
t = s + '2'
n = int(t) // 4
print(n)`),lab:'affichage :',ans:13,
    why:'+ colle les chaînes : t = \'52\'. int(t) vaut 52 et 52 // 4 = 13.'},
   {q:Q+py(`a = 10
b = 3
a = a % b
b = b - a
a = a * 10 + b
print(a)`),lab:'affichage :',ans:12,
    why:'a = 10 % 3 = 1, puis b = 3 − 1 = 2, puis a = 1 · 10 + 2 = 12.'},
 ]},
];
})();
