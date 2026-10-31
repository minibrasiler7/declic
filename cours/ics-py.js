/* Déclic — Informatique, Programmation Python */
(()=>{
// ---------- helpers locaux ----------
const cd=s=>`<code>${esc(s)}</code>`;
const pyv=x=>typeof x==='string'?`'${x}'`:Array.isArray(x)?'['+x.map(pyv).join(', ')+']':String(x);
// code avec la ligne k marquée (k = -1 : aucune)
const stepCode=(lines,k)=>py(lines.map((l,i)=>i===k?l+'   # ← ici':l).join('\n'));
// figure « mémoire » : noms à gauche, objets à droite, flèches = références
const memFig=(h,f)=>{ const P=plane({x:[0,10],y:[0,h],grid:false,axes:false}); f(P); return P.svg(); };
const nameAt=(P,x,y,n)=>{ P.text(x,y,n,{a:'end',dy:5,s:16,c:'var(--ink)'}); P.dot(x+0.25,y,{r:4,c:'var(--ink)'}); };
const box=(P,x,y,w,t,c='var(--code)')=>{ P.rect(x,y-0.4,w,0.8,{fill:c,fo:.16,c,w:2}); P.text(x+w/2,y,t,{a:'middle',dy:5,s:13}); };
// liste dessinée case par case, renvoie les centres des cases
const cells=(P,x,y,vals,c='var(--code)',cw=0.8)=>{ P.rect(x,y-0.4,cw*vals.length,0.8,{fill:c,fo:.16,c,w:2});
  vals.forEach((v,i)=>{ if(i) P.seg(x+i*cw,y-0.4,x+i*cw,y+0.4,{c,w:1.5}); if(v!==null) P.text(x+(i+.5)*cw,y,String(v),{a:'middle',dy:5,s:13}); });
  return vals.map((_,i)=>[x+(i+.5)*cw,y]); };
const ref=(P,x1,y1,x2,y2,c='var(--ink)')=>P.arrow(x1,y1,x2,y2,{c,w:2,hs:9});
// petit tableau HTML (traces de variables)
const tab=(h,rows)=>`<table style="margin:6px auto;border-collapse:collapse;text-align:center"><tr>${h.map(x=>`<th style="padding:2px 10px;border-bottom:1px solid var(--line)">${x}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td style="padding:2px 10px">${x}</td>`).join('')}</tr>`).join('')}</table>`;
// sortie d’un programme (texte brut) et exemple « programme + sortie exacte » (vérifiée avec python3)
const out=s=>`<pre class="code">${esc(s)}</pre>`;
const exe=(code,o,txt='')=>`<div class="ex"><p>Ce programme :</p>${py(code)}<p>affiche exactement :</p>${out(o)}${txt}</div>`;

COURS.push(

/* ===================== 1. SYNTAXE, TYPES, VARIABLES ===================== */
{subj:'ics',sem:'py',id:'ics-syntaxe',h:'Syntaxe, types et variables',p:'Les types de base, les opérateurs et leurs priorités, les conversions et l’affectation.',steps:[
 {h:'Quatre types de base',p:`<p>Quand tu écris 7, 3.5 ou 'Ada', Python doit savoir quelles opérations ont un sens. On peut diviser 7 par 2, mais pas le texte 'Ada' par 2. C’est le rôle du <b>type</b>.</p>
<div class="def"><p>Chaque valeur a un <b>type</b>. Les quatre types de base sont : ${cd('int')}, les entiers (sans limite de taille) ; ${cd('float')}, les nombres à virgule, écrits avec un point ; ${cd('str')}, le texte (une <i>chaîne</i> de caractères), entre ' ' ou " " ; ${cd('bool')}, les deux valeurs de vérité ${cd('True')} et ${cd('False')}. ${cd('type(v)')} donne le type de la valeur <i>v</i>.</p></div>
<div class="idea"><p>Le type est collé à la valeur, pas au nom qui la désigne. C’est lui qui décide de ce que fait un opérateur : ${cd('+')} additionne deux int, mais colle deux str. Python ne devine jamais : 5 et '5' sont deux valeurs différentes, l’une se calcule, l’autre s’écrit.</p></div>
${exe(`print(type(5), type(5.0), type('5'))
print(5 == 5.0, 5 == '5')`,`<class 'int'> <class 'float'> <class 'str'>
True False`,`<p>5 et 5.0 n’ont pas le même type mais la même valeur numérique, donc ${cd('==')} répond True. Un nombre n’est jamais égal à un texte.</p>`)}
<div class="warn"><p>Les guillemets changent tout : ${cd("'42'")} est un texte de deux caractères, pas un nombre. Et la virgule ne sert pas de séparateur décimal (voir la remarque).</p></div>`,
  fig:py(`n = 42          # int
x = 3.14        # float (point, pas virgule)
nom = 'Ada'     # str, entre ' ' ou " "
ok = True       # bool : True ou False
print(type(x))  # affiche <class 'float'>`),
  note:'Le séparateur décimal est le <b>point</b> : 3.14. Écrire 3,14 crée un tuple de deux entiers.'},
 {kind:'Théorie',h:'Deux divisions : / et //',p:`<p>Combien font 6 divisé par 2 ? En maths, 3. En Python, la réponse dépend de l’opérateur que tu choisis, et même son type change.</p>
<div class="def"><p>${cd('a / b')} est la <b>division exacte</b> : son résultat est <b>toujours un float</b>, même quand la division tombe juste. ${cd('a // b')} est la <b>division entière</b> : elle garde seulement le quotient entier. Entre deux int, elle rend un int ; si l’un des deux est un float, elle rend un float sans partie décimale.</p></div>
<div class="idea"><p>Un float est stocké en binaire avec environ 16 chiffres significatifs. La plupart des nombres décimaux, comme 0.1, n’ont pas d’écriture binaire finie : la machine garde une approximation très proche. Les int, eux, sont toujours exacts.</p></div>
${exe(`print(6 / 2, 7 / 2, 7 // 2, 7.0 // 2)
print(0.1 + 0.2)
print(0.1 + 0.2 == 0.3)`,`3.0 3.5 3 3.0
0.30000000000000004
False`)}
<div class="warn"><p>Ne compare jamais deux float avec ${cd('==')}. Teste plutôt qu’ils sont très proches : ${cd('abs(x - y) < 1e-9')}. Et si tu veux un entier, utilise ${cd('//')}, pas ${cd('/')}.</p></div>`},
 {h:'Division et type',p:`Que valent ${cd('type(7 / 2)')} et ${cd('type(7 // 2)')}&nbsp;?`,
  opts:[`${cd('int')} et ${cd('int')}`,`${cd('float')} et ${cd('float')}`,`${cd('float')} et ${cd('int')}`,`${cd('int')} et ${cd('float')}`],ans:2,
  why:`${cd('/')} est la division exacte : elle rend toujours un float (7 / 2 = 3.5, et même 6 / 2 = 3.0). ${cd('//')} est la division entière : entre deux int, elle rend un int (7 // 2 = 3).`},
 {h:'Quotient entier et reste',p:`<p>Pour répartir 17 bonbons entre 5 enfants, il faut deux nombres : combien chacun en reçoit, et combien il en reste. Python les donne avec deux opérateurs.</p>
<div class="def"><p>${cd('a // b')} est le <b>quotient entier</b> <i>q</i>, ${cd('a % b')} le <b>reste</b> <i>r</i> (on lit « <i>a</i> modulo <i>b</i> »). Pour <i>b</i> &gt; 0, ils vérifient toujours <b><i>a</i> = <i>b</i>·<i>q</i> + <i>r</i></b> avec <b>0 ≤ <i>r</i> &lt; <i>b</i></b>.</p></div>
<div class="idea"><p>Python arrondit le quotient <b>vers le bas</b>, c’est-à-dire vers −∞. Ainsi <i>b</i>·<i>q</i> est le plus grand multiple de <i>b</i> inférieur ou égal à <i>a</i>, et le reste est la distance de ce multiple à <i>a</i> : la flèche orange de la figure. Elle est toujours positive, même quand <i>a</i> est négatif.</p></div>
${exe(`print(17 // 5, 17 % 5)
print(-7 // 2, -7 % 2, int(-7 / 2))`,`3 2
-4 1 -3`,`<p>17 = 5 · 3 + 2. Pour −7, le multiple de 2 juste en dessous est −8 : −7 = 2 · (−4) + 1.</p>`)}
<div class="warn"><p>${cd('int(-7 / 2)')} vaut −3, car int() coupe vers 0, alors que ${cd('-7 // 2')} vaut −4. Avec des négatifs, ces deux écritures ne sont pas interchangeables. Essaie un <i>a</i> négatif sur la figure.</p></div>`,
  params:[{id:'a',l:'a',min:-12,max:12,v:7},{id:'b',l:'b',min:1,max:5,v:3}],
  draw:v=>{ const q=Math.floor(v.a/v.b), r=v.a-v.b*q, P=plane({x:[-13,13],y:[-3.6,3.6],grid:false,axes:false});
    P.seg(-12.6,0,12.6,0,{c:'var(--muted)',w:1.5});
    for(let k=Math.ceil(-12/v.b);k*v.b<=12;k++) P.seg(k*v.b,-0.3,k*v.b,0.3,{c:'var(--muted)',w:2});
    for(let x=-12;x<=12;x+=4) P.text(x,0,fmt(x),{a:'middle',dy:18,s:11,c:'var(--muted)'});
    if(r>0){ P.arrow(q*v.b,2.2,v.a,2.2,{c:'var(--spark)',w:3,hs:8}); P.text((q*v.b+v.a)/2,2.2,'r = '+r,{a:'middle',dy:-8,s:12,c:'var(--spark)'}); }
    P.dot(q*v.b,0,{c:'var(--code)'}); P.text(q*v.b,0,'b·q',{a:'middle',dy:36,s:12,c:'var(--code)'});
    P.dot(v.a,0,{c:'var(--accent)'}); P.text(v.a,0,'a',{a:'middle',dy:-12,s:13,c:'var(--accent)'});
    return P.svg(); },
  info:v=>{ const q=Math.floor(v.a/v.b), r=v.a-v.b*q; return `${cd(v.a+' // '+v.b)} = <b>${fmt(q)}</b> et ${cd(v.a+' % '+v.b)} = <b>${r}</b> : ${fmt(v.a)} = ${v.b}·(${fmt(q)}) + ${r}`; },
  note:`Les traits marquent les multiples de <i>b</i>. <i>b</i>·${cd('(a // b)')} est le plus grand multiple de <i>b</i> inférieur ou égal à <i>a</i>. Ainsi −7 // 2 = −4 et −7 % 2 = 1.`},
 {h:'Calcule',p:`Que vaut ${cd('17 // 5 * 2 + 17 % 5')}&nbsp;?`,lab:'résultat =',ans:8,
  why:`17 // 5 = 3 et 17 % 5 = 2. Puis 3 * 2 = 6 (même priorité, de gauche à droite), et 6 + 2 = 8.`},
 {h:'Priorités des opérateurs',p:`<p>2 + 3 * 4 vaut-il 14 ou 20 ? La machine ne peut pas hésiter : elle suit des règles fixes de priorité, proches de celles des maths.</p>
<div class="def"><p>Du plus prioritaire au moins prioritaire : les <b>parenthèses</b> ; la puissance ${cd('**')} ; le <b>moins unaire</b> (le signe de −3) ; ${cd('* / // %')} ; enfin ${cd('+ -')}. À priorité égale, Python calcule <b>de gauche à droite</b>, sauf ${cd('**')}, qui se lit <b>de droite à gauche</b>.</p></div>
<div class="idea"><p>Avant de calculer, Python place des parenthèses invisibles autour des opérations les plus fortes. ${cd('2 + 3 * 4 ** 2')} se lit ${cd('2 + (3 * (4 ** 2))')}. Pour ${cd('**')}, la lecture de droite à gauche suit la convention des maths : 2<sup>3<sup>2</sup></sup> = 2<sup>9</sup>.</p></div>
${exe(`print(2 + 3 * 4, (2 + 3) * 4)
print(7 - 2 - 1, 2 ** 3 ** 2)
print(-3 ** 2, 17 // 5 * 2)`,`14 20
4 512
-9 6`,`<p>7 − 2 − 1 = (7 − 2) − 1 = 4. ${cd('17 // 5 * 2')} = (17 // 5) * 2 = 3 * 2, et non 17 // 10.</p>`)}
<div class="warn"><p>Dans le doute, ajoute des parenthèses : elles ne coûtent rien et rendent le calcul lisible.</p></div>`,
  fig:py(`print(2 ** 3 ** 2)   # 2 ** 9 = 512
print(-2 ** 2)       # -(2 ** 2) = -4
print(10 - 4 - 3)    # (10 - 4) - 3 = 3
print(2 * 3 % 4)     # (2 * 3) % 4 = 2`),
  note:`Piège : ${cd('-2 ** 2')} vaut −4, pas 4. Pour élever −2 au carré, écris ${cd('(-2) ** 2')}.`},
 {h:'Dans quel ordre&nbsp;?',p:'Qu’affiche ce code&nbsp;?',fig:py(`print(2 + 3 * 4 ** 2 // 5)`),
  opts:[cd('16'),cd('80'),cd('10'),cd('11')],ans:3,
  why:`D’abord 4 ** 2 = 16. Puis de gauche à droite : 3 * 16 = 48 et 48 // 5 = 9. Enfin 2 + 9 = 11.`},
 {kind:'Méthode',h:'Découper un nombre avec // et %',
  p:`<p>Dès qu’il faut répartir une quantité en paquets (des secondes en minutes, des francs en billets, un nombre en chiffres), pense au couple ${cd('//')} et ${cd('%')}. ${cd('n // k')} compte les paquets complets de taille <i>k</i>, et ${cd('n % k')} donne ce qui reste.</p><p>Pour les chiffres d’un entier positif : ${cd('n % 10')} est le chiffre des unités, et ${cd('n // 10')} efface ce chiffre. Le chiffre des dizaines est donc ${cd('n // 10 % 10')}, celui des centaines ${cd('n // 100 % 10')}.</p>`,
  demo:{enonce:'Convertir 200 minutes en heures et minutes, puis trouver le chiffre des centaines de 4725.',
   etapes:[
    {f:`${cd('200 // 60')} = 3`,w:'Une heure est un paquet de 60 minutes : on compte les paquets complets.'},
    {f:`${cd('200 % 60')} = 20, car 200 = 60 · 3 + 20`,w:'Le reste est ce qui ne remplit pas une heure de plus. Contrôle toujours avec a = b·q + r.'},
    {f:`${cd('4725 // 100')} = 47`,w:'Diviser par 100 efface les deux derniers chiffres, 2 et 5.'},
    {f:`${cd('47 % 10')} = 7`,w:'Le chiffre des unités de 47 est le chiffre des centaines de 4725. Comme // et % ont la même priorité, on écrit d’un coup 4725 // 100 % 10, lu de gauche à droite.'}],
   conclusion:'200 minutes font 3 h 20 min, et le chiffre des centaines de 4725 est 7.'},
  note:'Pour revenir en arrière, on recolle les morceaux : 3 h 20 min = 3 · 60 + 20 = 200 min.'},
 {h:'Le chiffre des centaines',p:`Que vaut ${cd('58372 // 100 % 10')}&nbsp;?`,lab:'résultat =',ans:3,
  why:'58372 // 100 = 583 (on efface 7 et 2), puis 583 % 10 = 3 : c’est le chiffre des centaines.'},
 {kind:'Théorie',h:'L’affectation : la droite d’abord',p:`<p>En maths, <i>x</i> = <i>x</i> + 1 est une équation sans solution. En Python, ${cd('x = x + 1')} est une instruction parfaitement normale. Le signe ${cd('=')} n’y veut pas dire « est égal à ».</p>
<div class="def"><p>L’<b>affectation</b> ${cd('nom = expression')} se fait en deux temps : 1) Python <b>évalue</b> la partie droite avec les valeurs <b>actuelles</b> des variables ; 2) il <b>attache</b> le nom au résultat. Si le nom existait, il désigne désormais la nouvelle valeur. Un nom contient des lettres, des chiffres et _, ne commence pas par un chiffre, et ${cd('Age')} n’est pas ${cd('age')}.</p></div>
<div class="idea"><p>Une affectation est un ordre, pas une relation. ${cd('y = x * 2')} range dans <i>y</i> un <b>nombre</b>, pas la formule : si <i>x</i> change ensuite, <i>y</i> ne bouge pas. ${cd('x += 2')} est un raccourci pour ${cd('x = x + 2')} (de même ${cd('-=')}, ${cd('*=')}, ${cd('//=')}). Dans ${cd('a, b = b, a + b')}, toute la droite est calculée avant la moindre affectation.</p></div>
${exe(`x = 5
y = x * 2
x = x + 1
print(x, y)
a, b = 1, 2
a, b = b, a + b
print(a, b)`,`6 10
2 3`,`<p><i>y</i> a reçu 10 quand <i>x</i> valait 5. Ensuite, la droite (2, 1 + 2) est calculée avec les anciennes valeurs.</p>`)}
<div class="warn"><p>Lire un nom qui n’a encore jamais été affecté provoque ${cd('NameError')}. L’ordre des lignes compte.</p></div>`},
 {h:'Conversions et affectation',p:`<p>${cd('input()')} renvoie toujours du texte, et ${cd("'3' + 4")} est une erreur. Pour mélanger texte et nombres, il faut <b>convertir</b>.</p>
<div class="def"><p>${cd('int(v)')}, ${cd('float(v)')}, ${cd('str(v)')} et ${cd('bool(v)')} fabriquent une valeur du type demandé à partir de <i>v</i>. ${cd('int(3.9)')} <b>tronque</b> vers 0 ; ${cd("int('42')")} lit l’écriture d’un entier ; ${cd('str(7)')} écrit un nombre en texte ; ${cd('bool(v)')} vaut False pour 0, 0.0 et la chaîne vide '', True pour tout le reste.</p></div>
<div class="idea"><p>Convertir ne modifie pas la valeur de départ : on obtient une <b>nouvelle</b> valeur, qu’il faut ranger avec une affectation. Après ${cd('n = int(s)')}, <i>s</i> est toujours un texte. La figure rappelle aussi l’affectation de l’étape précédente.</p></div>
${exe(`s = '12'
n = int(s)
print(n + 1, s + '1')
print(int(-3.9), float('2.5') * 2, str(3) + '3')
print(bool(0), bool(''), bool('0'))`,`13 121
-3 5.0 33
False False True`,`<p>'0' n’est pas la chaîne vide : il contient un caractère, donc bool('0') vaut True.</p>`)}
<div class="warn"><p>${cd('int()')} refuse un texte qui n’est pas l’écriture d’un entier : ${cd("int('3.5')")} et ${cd("int('abc')")} lèvent ${cd('ValueError')}.</p></div>`,
  fig:py(`int('42') + 1     # 43
str(7) + '7'      # '77' : + colle deux chaînes
'3' * 3           # '333'
int(-3.9)         # -3 (troncature)
bool(0), bool('') # False, False : 0 et '' sont « faux »
x = 5
x += 2            # raccourci de x = x + 2, x vaut 7
a, b = 1, 2
a, b = b, a       # échange : a vaut 2, b vaut 1`),
  note:`${cd('input()')} renvoie toujours une <b>chaîne</b>. Pour lire un nombre, écris ${cd('int(input())')}.`},
 {kind:'Théorie',h:'Coller et répéter des chaînes',p:`<p>Les opérateurs ${cd('+')} et ${cd('*')} existent aussi pour le texte, mais ils n’y font pas un calcul : ils construisent une nouvelle chaîne.</p>
<div class="def"><p>${cd('s + t')} <b>concatène</b> deux chaînes : elle les met bout à bout. ${cd('s * n')}, avec <i>n</i> entier, <b>répète</b> <i>s</i> <i>n</i> fois. ${cd('len(s)')} donne le nombre de caractères de <i>s</i>.</p></div>
<div class="idea"><p>Un opérateur regarde les types de ses deux côtés avant d’agir. Deux int : ${cd('*')} multiplie. Un str et un int : ${cd('*')} répète. Deux str : ${cd('+')} colle. Un str et un int : ${cd('+')} ne sait que faire, et Python refuse plutôt que de deviner.</p></div>
${exe(`a = '3'
print(a * 2, int(a) * 2, a + a)
print(len('Bonjour'), '-' * 5)
print('Total :', 5)`,`33 6 33
7 -----
Total : 5`,`<p>print sépare ses arguments par une espace : c’est la façon simple d’afficher un texte suivi d’un nombre.</p>`)}
<div class="warn"><p>${cd("'Total : ' + 5")} lève ${cd('TypeError')}. Convertis d’abord : ${cd("'Total : ' + str(5)")}. Et ${cd("'ab' * 2.0")} est aussi une erreur : on ne répète pas un texte 2,0 fois.</p></div>`},
 {kind:'Méthode',h:'Lire un message d’erreur',
  p:`<p>Quand Python ne peut pas exécuter une ligne, il s’arrête et affiche un message (une <i>traceback</i>). Lis-le <b>par le bas</b> : la dernière ligne donne le <b>type</b> d’erreur et une explication, la ligne au-dessus montre l’instruction fautive et son numéro.</p><ul><li>${cd('SyntaxError')} ou ${cd('IndentationError')} : le code est mal écrit (parenthèse ou deux-points oubliés, mauvais décalage).</li><li>${cd('NameError')} : nom inconnu (faute de frappe, variable pas encore créée).</li><li>${cd('TypeError')} : opération impossible entre ces types, comme une chaîne + un entier.</li><li>${cd('ValueError')} : bon type mais valeur impossible, comme ${cd("int('abc')")}.</li><li>${cd('ZeroDivisionError')} : division par zéro.</li></ul>`,
  demo:{enonce:'Ce programme plante. Trouver pourquoi et le corriger.'+py(`age = 17
print('Tu as ' + age + ' ans')`)+py(`Traceback (most recent call last):
  File "prog.py", line 2, in <module>
    print('Tu as ' + age + ' ans')
TypeError: can only concatenate str (not "int") to str`),
   etapes:[
    {f:`Dernière ligne : ${cd('TypeError')}`,w:'Le type d’erreur dit déjà la famille du problème : deux valeurs de types incompatibles.'},
    {f:'Message : on ne peut coller (<i>concatenate</i>) à une str qu’une autre str, pas un int.',w:'L’explication dit quelle opération a échoué et avec quels types.'},
    {f:`Ligne 2 : ${cd("'Tu as ' + age")}, où <i>age</i> vaut l’entier 17.`,w:'On repère dans la ligne indiquée l’opération qui mélange les types.'},
    {f:`Correction : ${cd("print('Tu as ' + str(age) + ' ans')")}`,w:'On convertit l’entier en chaîne avant de coller. On aurait aussi pu écrire print(\'Tu as\', age, \'ans\').'}],
   conclusion:'Le programme corrigé affiche « Tu as 17 ans ». Retiens le réflexe : type d’erreur, message, puis ligne.'},
  note:'Le numéro de ligne indique où Python s’est arrêté. La vraie cause est parfois juste avant, par exemple une parenthèse non fermée à la ligne précédente.'},
 {h:'Quelle erreur&nbsp;?',p:'Que se passe-t-il quand on exécute cette ligne&nbsp;?',fig:py(`n = int('3.5')`),
  opts:[`Une erreur ${cd('TypeError')}`,`Aucune erreur : <i>n</i> vaut 3`,`Une erreur ${cd('SyntaxError')}`,`Une erreur ${cd('ValueError')}`],ans:3,
  why:`'3.5' est bien une chaîne, le type accepté par int(). Mais int() ne sait lire que l’écriture d’un entier : la valeur est impossible, d’où ValueError: invalid literal for int(). Il faudrait int(float('3.5')).`},
 {kind:'Méthode',h:'Tracer un programme avec un tableau',
  p:`<p>Pour prévoir ce qu’affiche un programme, ne le lis pas d’un bloc : exécute-le comme la machine, <b>une ligne à la fois</b>. Fais un tableau avec une colonne par variable. À chaque affectation, calcule la partie droite avec les valeurs <b>actuelles</b>, puis écris la nouvelle valeur dans la colonne. Une variable garde sa valeur tant qu’on ne la réaffecte pas.</p><p>${cd('print(a, b)')} affiche les valeurs dans l’ordre, séparées par une espace.</p>`,
  demo:{enonce:'Qu’affiche ce programme&nbsp;?'+py(`a = 7
b = a // 2
a = a + b
b = a % b
print(a, b)`),
   etapes:[
    {f:'Ligne 1 : a = 7.',w:'On ouvre une colonne a et une colonne b. b n’existe pas encore.'},
    {f:'Ligne 2 : b = 7 // 2 = 3.',w:'On remplace a par sa valeur actuelle, 7.'},
    {f:'Ligne 3 : a = 7 + 3 = 10.',w:'La droite est calculée avec l’ancien a, puis a reçoit le résultat.'},
    {f:'Ligne 4 : b = 10 % 3 = 1.',w:'a vaut maintenant 10, pas 7. Oublier une mise à jour est l’erreur la plus fréquente.'},
    {f:'Ligne 5 : print affiche 10 1.',w:'On lit la dernière ligne du tableau.'}],
   conclusion:'Le tableau complet :'+tab(['ligne','a','b'],[[1,7,'–'],[2,7,3],[3,10,3],[4,10,1]])+'Le programme affiche 10 1.'},
  note:'Une ligne du tableau par instruction : c’est plus long à écrire, mais tu ne mélanges jamais l’ancienne et la nouvelle valeur.'},
 {h:'Trace à toi',p:'Qu’affiche ce programme&nbsp;?',fig:py(`x = 4
y = x * 3
x = y - x
y = y // x + x
print(x + y)`),lab:'affichage :',ans:17,
  why:'y = 12, puis x = 12 − 4 = 8. Ensuite y = 12 // 8 + 8 = 1 + 8 = 9. On affiche 8 + 9 = 17.'},
 {h:'Paquets de 4',p:`Règle <i>x</i> pour que ${cd('x // 4')} vaille 3 et ${cd('x % 4')} vaille 2. Chaque rangée complète contient 4 points.`,
  params:[{id:'x',l:'x',min:0,max:30,v:9}],
  draw:v=>{ const P=plane({x:[0,10],y:[0,4.4],grid:false,axes:false});
    for(let i=0;i<v.x;i++){ const row=Math.floor(i/4), col=i%4, full=row<Math.floor(v.x/4);
      P.dot(0.6+col*0.55+(row>=4?2.6:0),3.9-(row%4)*0.9,{r:7,c:full?'var(--code)':'var(--spark)'}); }
    P.text(5.6,3.0,'x // 4 = '+Math.floor(v.x/4),{s:15}); P.text(5.6,1.8,'x % 4 = '+v.x%4,{s:15,c:'var(--spark)'}); return P.svg(); },
  info:v=>`${cd('x = '+v.x)} : ${Math.floor(v.x/4)} rangée(s) complète(s), reste ${v.x%4}`,
  ok:v=>v.x===14,why:'Il faut x = 4·3 + 2 = 14 : trois rangées pleines et deux points en plus.'},
 {kind:'Défi',h:'Chaîne ou nombre&nbsp;?',p:'Qu’affiche ce code&nbsp;?',fig:py(`a = '3'
b = int(a) * 2
c = a * 2
print(b, c)`),
  opts:[cd('6 6'),cd('33 33'),cd('6 33'),cd('33 6')],ans:2,
  why:`${cd('int(a)')} vaut l’entier 3, donc b = 6. Mais <i>a</i> reste la chaîne '3', et une chaîne multipliée par 2 est répétée : c = '33'. print affiche 6 33.`},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Ce chapitre pose le vocabulaire de base : des valeurs typées, des opérateurs, des noms.</p>
<div class="keep"><ul><li>Quatre types : ${cd('int')}, ${cd('float')} (point décimal), ${cd('str')}, ${cd('bool')}. Le type décide de ce que fait un opérateur.</li><li>${cd('/')} rend toujours un float ; ${cd('//')} donne le quotient entier, arrondi vers le bas ; ${cd('%')} le reste. Pour <i>b</i> &gt; 0 : <i>a</i> = <i>b</i>·(<i>a</i> // <i>b</i>) + <i>a</i> % <i>b</i> et 0 ≤ <i>a</i> % <i>b</i> &lt; <i>b</i>.</li><li>Les float sont approchés : pas de ${cd('==')} entre float.</li><li>Priorités : parenthèses, ${cd('**')} (de droite à gauche), moins unaire, ${cd('* / // %')}, ${cd('+ -')} ; à égalité, de gauche à droite.</li><li>Affectation : la droite est évaluée d’abord, puis le nom est attaché au résultat. ${cd('x += 1')} = ${cd('x = x + 1')}.</li><li>Conversions ${cd('int()')}, ${cd('float()')}, ${cd('str()')}, ${cd('bool()')} : elles fabriquent une nouvelle valeur. ${cd('input()')} renvoie un str.</li><li>Chaînes : ${cd('+')} colle, ${cd('*')} répète, ${cd('len')} compte ; str + int lève TypeError.</li><li>Méthodes : découper avec // et % (chiffres : ${cd('n // 10**k % 10')}) ; lire une erreur par le bas (type, message, ligne) ; tracer un programme avec un tableau, une ligne par instruction.</li></ul></div>`},
 {kind:'Problème',h:'Le rendu de monnaie',p:`Une caisse rend la monnaie avec des billets de 20 et de 10, puis des pièces de 2 et de 1 (en francs). Le programme ci-dessous compte combien il en faut de chaque sorte, en commençant par les plus grosses. Trace-le ligne par ligne.`+py(`prix = 37
paye = 100
rendu = paye - prix
b20 = rendu // 20
rendu = rendu % 20
b10 = rendu // 10
rendu = rendu % 10
p2 = rendu // 2
p1 = rendu % 2
print(b20, b10, p2, p1)`),
  parts:[
   {q:'a) Que vaut <i>b20</i> après la ligne 4&nbsp;?',lab:'b20 =',ans:3,hint:'Calcule d’abord rendu = 100 − 37, puis le quotient entier par 20.',why:'rendu = 63 et 63 // 20 = 3 : trois billets de 20 font 60.'},
   {q:'b) Que vaut <i>rendu</i> juste après la ligne 5&nbsp;?',lab:'rendu =',ans:3,hint:'La ligne 5 garde ce qui reste une fois les billets de 20 donnés.',why:'63 % 20 = 3, car 63 = 20 · 3 + 3.'},
   {q:'c) Combien de billets et de pièces la caisse rend-elle au total&nbsp;?',lab:'total =',ans:5,hint:'Termine la trace : 3 // 10, puis 3 // 2 et 3 % 2.',why:'b10 = 3 // 10 = 0 et rendu reste 3. Puis p2 = 3 // 2 = 1 et p1 = 3 % 2 = 1. Total : 3 + 0 + 1 + 1 = 5.'},
   {q:`d) On change seulement la ligne 1. Quelle valeur de <i>prix</i> (entier entre 1 et 99) fait afficher ${cd('2 1 1 1')}&nbsp;?`,lab:'prix =',ans:47,hint:'Reconstruis le rendu à partir de l’affichage : deux billets de 20, un de 10, une pièce de 2 et une de 1.',why:'Le rendu vaut 2 · 20 + 10 + 2 + 1 = 53, donc prix = 100 − 53 = 47. Le programme découpe chaque rendu d’une seule façon, donc 47 est la seule valeur.'},
  ],
  sol:`<p>Avec prix = 37, rendu = 63. Ligne 4 : b20 = 63 // 20 = 3. Ligne 5 : rendu = 63 % 20 = 3.</p><p>Ligne 6 : b10 = 3 // 10 = 0. Ligne 7 : rendu = 3 % 10 = 3. Lignes 8 et 9 : p2 = 1 et p1 = 1. Le programme affiche 3 0 1 1, soit 5 billets et pièces.</p><p>Pour obtenir 2 1 1 1, il faut rendu = 2 · 20 + 1 · 10 + 1 · 2 + 1 = 53. Comme 53 = 100 − prix, on trouve prix = 47. On vérifie : 53 // 20 = 2, 53 % 20 = 13, 13 // 10 = 1, 13 % 10 = 3, 3 // 2 = 1, 3 % 2 = 1.</p>`},
 {kind:'Problème',h:'Heures, minutes et temps négatif',p:`Un chronomètre compte <i>t</i> secondes. Le programme convertit <i>t</i> en heures, minutes et secondes, puis fait deux calculs avec −<i>t</i>. Rappel : ${cd('%')} et ${cd('//')} ont la même priorité et se lisent de gauche à droite, et le moins unaire passe avant eux.`+py(`t = 7384
h = t // 3600
m = t % 3600 // 60
s = t % 60
texte = str(h) + ':' + str(m) + ':' + str(s)
moy = t / 4
print(texte)
print(type(moy), int(moy) // 60)
print(-t // 3600, -t % 3600)`),
  parts:[
   {q:'a) Que vaut <i>m</i> après la ligne 3&nbsp;?',lab:'m =',ans:3,hint:'De gauche à droite : calcule d’abord t % 3600, puis divise par 60.',why:'7384 % 3600 = 184 (car 2 · 3600 = 7200), puis 184 // 60 = 3.'},
   {q:'b) Qu’affiche la ligne 7&nbsp;?',opts:[cd('2:3:4'),cd('2:03:04'),cd('7384'),`Une erreur ${cd('TypeError')}`],ans:0,hint:'h = 2 et s = 7384 % 60. Que fait str() d’un petit entier&nbsp;?',why:'h = 2, m = 3 et s = 4. str() ne complète pas avec des zéros. Les trois morceaux sont des chaînes, donc + les colle sans erreur : 2:3:4.'},
   {q:'c) Qu’affiche la ligne 8&nbsp;?',opts:[cd("<class 'int'> 30"),cd("<class 'float'> 30.0"),cd("<class 'float'> 30"),cd("<class 'int'> 1846")],ans:2,hint:'Quel type rend toujours la division / ? Et int() change le type avant //.',why:'t / 4 = 1846.0 est un float. int(1846.0) = 1846 est un int, et 1846 // 60 = 30 reste un int.'},
   {q:'d) Quelle est la première valeur affichée par la ligne 9, ' + cd('-t // 3600') + '&nbsp;?',lab:'valeur =',ans:-3,hint:'−7384 / 3600 ≈ −2,05. Dans quel sens // arrondit-il&nbsp;?',why:'// arrondit vers le bas, donc vers −∞ : −2,05 devient −3, pas −2.'},
   {q:'e) Et la seconde, ' + cd('-t % 3600') + '&nbsp;?',lab:'valeur =',ans:3416,hint:'Utilise a = b·q + r avec le q de la question d).',why:'−7384 = 3600 · (−3) + r, donc r = −7384 + 10 800 = 3416. Le reste est bien entre 0 et 3599.'},
  ],
  sol:`<p>h = 7384 // 3600 = 2. Pour m, on lit (t % 3600) // 60 = 184 // 60 = 3, et s = 7384 % 60 = 4. La ligne 7 affiche 2:3:4 : str() ne met pas de zéro devant un chiffre.</p><p>moy = 7384 / 4 = 1846.0 est un float, même si la division tombe juste. int(moy) // 60 = 1846 // 60 = 30.</p><p>Le moins unaire s’applique d’abord : on calcule (−7384) // 3600. Le quotient exact vaut environ −2,05 et // arrondit vers le bas : −3. Le reste vérifie −7384 = 3600 · (−3) + r, d’où r = 3416, compris entre 0 et 3599.</p><p>La ligne 9 affiche donc −3 3416. Retiens : pour un diviseur positif, le reste Python est toujours positif ou nul.</p>`},
]},

/* ===================== 2. RÉFÉRENCES ET MUTABILITÉ ===================== */
{subj:'ics',sem:'py',id:'ics-references',h:'Références et mutabilité',p:'Un nom n’est qu’une étiquette sur un objet : aliasing, objets mutables, is contre ==, copies.',steps:[
 {h:'Des noms et des objets',p:`<p>Après ${cd('b = a')}, si on modifie <i>b</i>, est-ce que <i>a</i> change ? Pour répondre sans deviner, il faut savoir ce qu’est vraiment une variable.</p>
<div class="def"><p>Un <b>objet</b> est une valeur rangée en mémoire. Il a un type, un contenu et une <b>identité</b>, un numéro unique pendant toute sa vie, donné par ${cd('id()')}. Une <b>variable</b> est un <b>nom</b> qui <b>référence</b> un objet. ${cd('x = [1, 2]')} crée d’abord un objet liste, puis attache le nom <i>x</i> à cet objet.</p></div>
<div class="idea"><p>Pense à des <b>étiquettes</b> accrochées à des objets, pas à des boîtes qui portent un nom. Un objet peut porter plusieurs étiquettes. Un nom, lui, désigne un seul objet à la fois. Sur la figure, chaque flèche est une référence.</p></div>
${exe(`x = [1, 2]
y = x
z = [1, 2]
print(id(x) == id(y), id(x) == id(z))`,`True False`,`<p><i>y</i> est une deuxième étiquette sur l’objet de <i>x</i>. <i>z</i> désigne un autre objet, créé par la troisième ligne, qui a seulement le même contenu.</p>`)}
<div class="warn"><p>La valeur de ${cd('id(x)')} change d’une exécution à l’autre : elle ne sert qu’à comparer deux identités dans un même programme.</p></div>`,
  fig:memFig(2.6,P=>{ nameAt(P,1.4,1.9,'x'); cells(P,4.5,1.9,[1,2]); ref(P,1.75,1.9,4.45,1.9);
    nameAt(P,1.4,0.6,'n'); box(P,4.5,0.6,0.9,'5','var(--math)'); ref(P,1.75,0.6,4.45,0.6); P.text(6.6,1.9,'objet list',{s:12,c:'var(--muted)'}); P.text(6.6,0.6,'objet int',{s:12,c:'var(--muted)'}); }),
  note:'Une flèche représente une référence. Plusieurs noms peuvent pointer vers le même objet.'},
 {kind:'Méthode',h:'Fabriquer et lire une liste',
  p:`<p>Une liste s’écrit entre crochets : ${cd('[3, 1, 4]')}. Les cases sont numérotées <b>à partir de 0</b> : ${cd('L[0]')} est la première, et ${cd('L[i] = x')} remplace la case <i>i</i>. ${cd('len(L)')} donne le nombre d’éléments et ${cd('sum(L)')} leur somme.</p><p>${cd('L + M')} crée une <b>nouvelle</b> liste qui met L et M bout à bout. ${cd('L * k')} crée une nouvelle liste qui répète k fois le contenu de L. ${cd('L.append(x)')} ajoute x à la fin de L elle-même.</p>`,
  demo:{enonce:'Qu’affiche ce programme&nbsp;?'+py(`a = [1, 2]
b = a * 2 + [5]
b[0] = 7
print(b, len(b), sum(b))`),
   etapes:[
    {f:`${cd('a * 2')} = [1, 2, 1, 2]`,w:'* répète le contenu de la liste : deux copies de 1, 2 à la suite.'},
    {f:`${cd('[1, 2, 1, 2] + [5]')} = [1, 2, 1, 2, 5]`,w:'* passe avant +, comme pour les nombres. + colle les deux listes.'},
    {f:`${cd('b[0] = 7')} : b = [7, 2, 1, 2, 5]`,w:'La case d’indice 0 est la première. On la remplace, les autres ne bougent pas.'},
    {f:'len(b) = 5 et sum(b) = 7 + 2 + 1 + 2 + 5 = 17',w:'On compte les cases, puis on additionne leur contenu.'}],
   conclusion:'Le programme affiche [7, 2, 1, 2, 5] 5 17. La liste a n’a pas changé : * et + fabriquent de nouvelles listes.'},
  note:`Le dernier élément d’une liste de longueur n a l’indice n − 1. ${cd('L[len(L)]')} n’existe pas.`},
 {h:'Somme d’une liste',p:'Qu’affiche ce programme&nbsp;?',fig:py(`L = [3, 1] * 3 + [4]
L[1] = 0
print(sum(L))`),lab:'affichage :',ans:15,
  why:'L = [3, 1, 3, 1, 3, 1, 4], puis la case d’indice 1 devient 0 : [3, 0, 3, 1, 3, 1, 4]. Somme : 15.'},
 {h:'Deux noms, une seule liste',p:`<p>Que fait exactement ${cd('b = a')} quand <i>a</i> désigne une liste ? Avance ligne par ligne avec le curseur et regarde les flèches.</p>
<div class="def"><p>On parle d’<b>aliasing</b> quand deux noms référencent le <b>même</b> objet. ${cd('b = a')} ne copie rien : Python évalue <i>a</i>, trouve l’objet, et attache le nom <i>b</i> à ce même objet.</p></div>
<div class="idea"><p>Il n’y a qu’une liste et deux étiquettes. Une modification faite par un nom (étape 3, ${cd('b.append(4)')}) se voit donc par l’autre. Mais réaffecter un nom (étape 4, ${cd('a = [7]')}) déplace seulement son étiquette vers un nouvel objet : l’ancienne liste reste là, toujours désignée par <i>b</i>.</p></div>
<div class="ex"><p>Après l’étape 3, ${cd('print(a)')} affiche [1, 2, 3, 4], alors qu’on n’a jamais écrit <i>a</i> dans la ligne 3. Après l’étape 4, ${cd('print(a, b)')} affiche [7] [1, 2, 3, 4].</p></div>
<div class="warn"><p>On ne voit cet effet qu’avec les objets qu’on peut modifier, comme les listes. Avec des entiers, il est invisible : c’est l’objet de l’étape « Mutable ou immuable ».</p></div>`,
  params:[{id:'e',l:'Étape',min:1,max:4,v:1}],
  draw:v=>{ const L=['a = [1, 2, 3]','b = a','b.append(4)','a = [7]'];
    const fig=memFig(3,P=>{ const big=v.e>=3?[1,2,3,4]:[1,2,3];
      nameAt(P,1.4,2.3,'a'); if(v.e>=2) nameAt(P,1.4,0.7,'b');
      const yB=v.e>=4?0.7:1.5; cells(P,5,yB,big);
      if(v.e<4) ref(P,1.75,2.3,4.95,yB+0.2); else { cells(P,5,2.3,[7],'var(--spark)'); ref(P,1.75,2.3,4.95,2.3); }
      if(v.e>=2) ref(P,1.75,0.7,4.95,v.e>=4?0.7:yB-0.2); });
    return stepCode(L,v.e-1)+fig; },
  info:v=>['<i>a</i> référence une nouvelle liste.','<i>b</i> référence la même liste que <i>a</i> : ' + cd('a is b') + ' vaut True.','On modifie l’objet par <i>b</i> : ' + cd('print(a)') + ' affiche [1, 2, 3, 4].','Nouvelle liste pour <i>a</i>. <i>b</i> garde l’ancienne : réaffecter un nom ne touche pas l’objet.'][v.e-1]},
 {h:'À toi',p:'Qu’affiche ce code&nbsp;?',fig:py(`a = [1, 2]
b = a
b.append(3)
print(a)`),
  opts:[cd('[1, 2]'),cd('[1, 2, 3]'),cd('[3]'),'Une erreur'],ans:1,
  why:'<i>a</i> et <i>b</i> référencent la même liste. append la modifie sur place, donc on voit le 3 par les deux noms : [1, 2, 3].'},
 {h:'Mutable ou immuable',p:`<p>Avec des entiers, ${cd('y = x')} puis ${cd('y += 1')} ne change pas <i>x</i>. Avec des listes, l’équivalent change les deux noms. La différence ne vient pas de l’affectation, mais des objets.</p>
<div class="def"><p>Un objet <b>mutable</b> peut être modifié sur place : ${cd('list')}, ${cd('dict')}, ${cd('set')}. Un objet <b>immuable</b> ne change jamais après sa création : ${cd('int')}, ${cd('float')}, ${cd('bool')}, ${cd('str')}, ${cd('tuple')}.</p></div>
<div class="idea"><p>Toute « modification » d’un immuable fabrique en réalité un <b>nouvel</b> objet. ${cd('y += 1')} calcule y + 1 = 6, crée l’objet 6 et y attache <i>y</i>. L’objet 5 n’a pas bougé et <i>x</i> le désigne toujours (figure). Sur une liste, ${cd('L += [2]')} modifie l’objet lui-même, et tous ses noms le voient.</p></div>
${exe(`s = 'abc'
t = s
s = s + 'd'
print(s, t)
L = [1]
M = L
L += [2]
print(L, M)`,`abcd abc
[1, 2] [1, 2]`)}
<div class="warn"><p>Un tuple est immuable, mais il contient des références. Dans ${cd('t = (1, [2])')}, on ne peut pas remplacer t[1], mais ${cd('t[1].append(3)')} est permis : la liste change, le tuple garde la même référence.</p></div>`,
  fig:py(`x = 5
y = x
y += 1
print(x, y)   # 5 6 : x n'a pas bougé`)+memFig(2.4,P=>{ nameAt(P,1.4,1.8,'x'); nameAt(P,1.4,0.6,'y'); box(P,4.5,1.8,0.9,'5','var(--math)'); box(P,4.5,0.6,0.9,'6','var(--math)'); ref(P,1.75,1.8,4.45,1.8); ref(P,1.75,0.6,4.45,0.6); P.text(5.8,1.8,'5 n’a pas changé',{s:12,c:'var(--muted)'}); }),
  note:`Piège : sur une <b>liste</b>, ${cd('b += [3]')} modifie l’objet sur place (comme extend), alors que ${cd('b = b + [3]')} crée une nouvelle liste.`},
 {h:'Une chaîne se modifie-t-elle&nbsp;?',p:'Que se passe-t-il&nbsp;?',fig:py(`s = 'abc'
s[0] = 'z'`),
  opts:[`<i>s</i> devient ${cd("'zbc'")}`,`<i>s</i> devient ${cd("'z'")}`,`Une erreur ${cd('TypeError')}`,'Rien, la ligne est ignorée'],ans:2,
  why:`Une chaîne est immuable : on ne peut pas changer une de ses lettres. Python lève TypeError (« 'str' object does not support item assignment »). Il faut construire une nouvelle chaîne : ${cd("s = 'z' + s[1:]")}.`},
 {h:'is contre ==',p:`<p>Deux listes [1, 2] écrites séparément sont-elles « la même chose » ? Cette question en cache deux : ont-elles le même contenu, et sont-elles le même objet ?</p>
<div class="def"><p>${cd('a == b')} compare les <b>valeurs</b> : pour deux listes, même longueur et cases égales une à une. ${cd('a is b')} vaut True si et seulement si les deux noms référencent le <b>même objet</b>, c’est-à-dire ${cd('id(a) == id(b)')}.</p></div>
<div class="idea"><p>Deux vrais jumeaux se ressemblent trait pour trait (==) sans être la même personne (is). Si ${cd('a is b')}, alors forcément ${cd('a == b')}. La réciproque est fausse. La différence compte dès qu’on modifie : modifier <i>a</i> modifie <i>b</i> seulement si ${cd('a is b')}.</p></div>
${exe(`a = [0] * 2
b = [0, 0]
print(a == b, a is b)
b[0] = 1
print(a == b, a)`,`True False
False [0, 0]`)}
<div class="warn"><p>N’utilise pas ${cd('is')} pour comparer des nombres ou des chaînes : le résultat dépend de détails internes de Python. Réserve-le à ${cd('x is None')} et aux questions d’identité.</p></div>`,
  fig:py(`a = [1, 2]
c = [1, 2]
print(a == c)   # True : mêmes valeurs
print(a is c)   # False : deux objets distincts
x = None
print(x is None)   # True : la bonne façon de tester None`),
  note:`Réserve ${cd('is')} à ${cd('None')} et aux questions d’identité. Pour comparer des nombres ou des chaînes, utilise toujours ${cd('==')}.`},
 {h:'Identité ou égalité',p:'Qu’affiche ce code&nbsp;?',fig:py(`a = [1, 2]
b = a
c = [1, 2]
print(a is b, a is c, a == c)`),
  opts:[cd('True True True'),cd('True False False'),cd('False False True'),cd('True False True')],ans:3,
  why:'<i>b</i> est un alias de <i>a</i> : a is b vaut True. <i>c</i> est une autre liste : a is c vaut False. Mais ses valeurs sont les mêmes : a == c vaut True.'},
 {kind:'Théorie',h:'Une liste range des références',p:`<p>Que contient vraiment une liste de listes comme ${cd('m = [[0, 0], [0, 0]]')} ? Pas des listes rangées l’une dans l’autre, mais des flèches.</p>
<div class="def"><p>Chaque case d’une liste contient une <b>référence</b> vers un objet, exactement comme un nom. ${cd('L[i] = x')} fait pointer la case <i>i</i> vers l’objet <i>x</i>, sans rien copier.</p></div>
<div class="idea"><p>Deux cases peuvent donc pointer vers le même objet. C’est ce que fait ${cd('[L] * 3')} : il répète trois fois <b>la même flèche</b> vers L. Écrire dans ${cd('m[0][0]')}, c’est suivre la flèche de la case 0 puis modifier l’objet trouvé au bout : tous ceux qui pointent vers lui le voient.</p></div>
${exe(`L = [0, 0]
m = [L, L]
m[0][0] = 5
print(m, L)
P = [0] * 3
P[0] = 1
print(P)`,`[[5, 0], [5, 0]] [5, 0]
[1, 0, 0]`,`<p>Dans P, les trois cases pointent vers le même entier 0. Mais un entier ne se modifie pas : ${cd('P[0] = 1')} redirige seulement la case 0, et les autres gardent leur 0.</p>`)}
<div class="warn"><p>Le piège ne concerne que les cases qui pointent vers un objet <b>mutable</b>. Pour une grille, crée chaque ligne à part : ${cd('[[0] * 3, [0] * 3, [0] * 3]')}.</p></div>`},
 {kind:'Théorie',h:'Copie superficielle et copie profonde',p:`<p>Tu veux travailler sur une copie d’une liste sans abîmer l’original. Selon ce que contient la liste, une copie « simple » suffit ou non.</p>
<div class="def"><p>${cd('m[:]')}, ${cd('list(m)')} et ${cd('m.copy()')} font une <b>copie superficielle</b> : une nouvelle liste extérieure, dont les cases pointent vers les <b>mêmes</b> objets que celles de <i>m</i>. ${cd('copy.deepcopy(m)')}, après ${cd('import copy')}, fait une <b>copie profonde</b> : elle recopie aussi, de proche en proche, chaque objet contenu.</p></div>
<div class="idea"><p>Pour une liste de nombres ou de chaînes, la copie superficielle suffit : les cases pointent vers des immuables, que personne ne peut modifier. Pour une liste de listes, les sous-listes restent partagées : seule la copie profonde les sépare.</p></div>
${exe(`import copy
m = [[1, 2], [3, 4]]
s = m[:]
d = copy.deepcopy(m)
s[0][0] = 9
s.append([5])
print(m)
print(d)`,`[[9, 2], [3, 4]]
[[1, 2], [3, 4]]`,`<p>${cd('s.append([5])')} ne touche pas <i>m</i>, car la liste extérieure de <i>s</i> est neuve. Mais ${cd('s[0][0] = 9')} modifie une sous-liste partagée avec <i>m</i>.</p>`)}
<div class="warn"><p>Une copie a toujours un coût : la copie profonde parcourt tout. Ne copie que si tu dois vraiment modifier sans toucher l’original.</p></div>`},
 {h:'Copier une liste de listes',p:`${cd('m[:]')}, ${cd('list(m)')} et ${cd('m.copy()')} font une copie <b>superficielle</b> : nouvelle liste extérieure, mais mêmes sous-listes. ${cd('copy.deepcopy(m)')} (après ${cd('import copy')}) copie tout. Choisis la ligne pour que ${cd('b[0][0] = 9')} ne change pas <i>m</i>.`,
  params:[{id:'k',l:'Instruction',min:0,max:3,v:0}],
  draw:v=>{ const opt=['b = m','b = m[:]','b = m.copy()','b = copy.deepcopy(m)'][v.k];
    const fig=memFig(5.4,P=>{ nameAt(P,1,4.3,'m'); nameAt(P,1,1.1,'b');
      if(v.k===0){ const o=cells(P,2.6,2.7,[null,null]); ref(P,1.35,4.3,2.7,3.05); ref(P,1.35,1.1,2.7,2.35);
        cells(P,6.5,3.9,[9,0],'var(--math)'); cells(P,6.5,1.5,[0,0],'var(--math)');
        P.dot(o[0][0],o[0][1],{r:4,c:'var(--ink)'}); P.dot(o[1][0],o[1][1],{r:4,c:'var(--ink)'}); ref(P,o[0][0],o[0][1],6.45,3.9); ref(P,o[1][0],o[1][1],6.45,1.5); }
      else if(v.k<3){ const o1=cells(P,2.6,4.3,[null,null]), o2=cells(P,2.6,1.1,[null,null]); ref(P,1.35,4.3,2.55,4.3); ref(P,1.35,1.1,2.55,1.1);
        cells(P,6.5,3.6,[9,0],'var(--math)'); cells(P,6.5,1.8,[0,0],'var(--math)');
        [o1,o2].forEach(o=>{ P.dot(o[0][0],o[0][1],{r:4,c:'var(--ink)'}); P.dot(o[1][0],o[1][1],{r:4,c:'var(--ink)'}); ref(P,o[0][0],o[0][1],6.45,3.6); ref(P,o[1][0],o[1][1],6.45,1.8); }); }
      else { const o1=cells(P,2.6,4.3,[null,null]), o2=cells(P,2.6,1.1,[null,null]); ref(P,1.35,4.3,2.55,4.3); ref(P,1.35,1.1,2.55,1.1);
        cells(P,6.5,4.8,[0,0],'var(--math)'); cells(P,6.5,3.6,[0,0],'var(--math)'); cells(P,6.5,1.8,[9,0],'var(--spark)'); cells(P,6.5,0.6,[0,0],'var(--spark)');
        [[o1,4.8,3.6],[o2,1.8,0.6]].forEach(([o,y1,y2])=>{ P.dot(o[0][0],o[0][1],{r:4,c:'var(--ink)'}); P.dot(o[1][0],o[1][1],{r:4,c:'var(--ink)'}); ref(P,o[0][0],o[0][1],6.45,y1); ref(P,o[1][0],o[1][1],6.45,y2); }); } });
    return py(`m = [[0, 0], [0, 0]]\n${opt}\nb[0][0] = 9`)+fig; },
  info:v=>`${cd('print(m)')} affiche <b>${v.k===3?'[[0, 0], [0, 0]]':'[[9, 0], [0, 0]]'}</b>`,
  ok:v=>v.k===3,why:'Seule la copie profonde crée de nouvelles sous-listes. Avec m[:] ou m.copy(), b[0] et m[0] restent la même sous-liste, donc le 9 apparaît aussi dans m.'},
 {kind:'Méthode',h:'Suivre la mémoire : modifier ou réaffecter',
  p:`<p>Pour chaque ligne, pose-toi une seule question : <b>modifie-t-elle un objet, ou déplace-t-elle une flèche&nbsp;?</b></p><ul><li><b>Réaffecter</b> : ${cd('nom = expression')}. On calcule l’expression, puis on attache le nom au résultat. Aucun objet n’est modifié. Si l’expression est un autre nom (${cd('b = a')}), la flèche pointe vers le même objet. Si c’est ${cd('a + [3]')}, ${cd('a * 2')}, ${cd('a[:]')} ou une liste écrite entre crochets, c’est un nouvel objet.</li><li><b>Modifier sur place</b> : ${cd('append')}, ${cd('remove')}, ${cd('L[i] = x')}, ${cd('L += [x]')}… L’objet change, et <b>tous</b> les noms qui pointent vers lui voient le changement.</li></ul><p>Piège : ${cd('[L] * 3')} répète trois fois la même flèche vers L, sans copier L.</p>`,
  demo:{enonce:'Qu’affiche ce programme&nbsp;?'+py(`p = [1]
q = p
q.append(2)
p = p + [3]
q[0] = 9
print(p, q)`),
   etapes:[
    {f:'Ligne 1 : un objet L₁ = [1], et p → L₁.',w:'Une liste écrite entre crochets crée un objet.'},
    {f:'Ligne 2 : q → L₁ aussi.',w:'Réaffectation par un nom : pas de copie, juste une deuxième flèche.'},
    {f:'Ligne 3 : L₁ devient [1, 2].',w:'append modifie l’objet sur place : p et q le voient tous les deux.'},
    {f:'Ligne 4 : p + [3] crée L₂ = [1, 2, 3], et p → L₂.',w:'+ fabrique un nouvel objet. Seule la flèche de p bouge, q pointe toujours vers L₁.'},
    {f:'Ligne 5 : L₁ devient [9, 2].',w:'On modifie l’objet de q, qui n’est plus celui de p.'}],
   conclusion:'Le programme affiche [1, 2, 3] [9, 2] : deux noms, deux objets à la fin.'},
  note:'Dessine les flèches dès qu’un programme a deux noms pour des listes. Une ligne mal classée suffit à tout fausser.'},
 {h:'Une liste de références',p:'Qu’affiche ce programme&nbsp;?',fig:py(`a = [0, 0]
b = [a] * 2
a = [5, 5]
b[0][1] = 7
print(b)`),
  opts:[cd('[[0, 7], [0, 0]]'),cd('[[5, 7], [5, 5]]'),cd('[[0, 7], [0, 7]]'),cd('[[5, 5], [5, 5]]')],ans:2,
  why:'[a] * 2 contient deux flèches vers la même liste L = [0, 0]. a = [5, 5] déplace seulement le nom a. b[0][1] = 7 modifie L, que b voit deux fois : [[0, 7], [0, 7]].'},
 {kind:'Défi',h:'+= ou + ?',p:'Qu’affiche ce code&nbsp;?',fig:py(`a = [1, 2]
b = a
b += [3]
b = b + [4]
print(a, b)`),
  opts:[cd('[1, 2] [1, 2, 3, 4]'),cd('[1, 2, 3] [1, 2, 3, 4]'),cd('[1, 2, 3, 4] [1, 2, 3, 4]'),cd('[1, 2, 3] [1, 2, 3]')],ans:1,
  why:`${cd('b += [3]')} modifie sur place la liste partagée : a et b valent [1, 2, 3]. Puis ${cd('b + [4]')} crée une nouvelle liste, attachée à b seul. a reste [1, 2, 3].`},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Tout ce chapitre tient en une image : des noms (et des cases de liste) qui pointent vers des objets.</p>
<div class="keep"><ul><li>Une variable est un nom qui <b>référence</b> un objet ; un objet a un type, un contenu et une identité (${cd('id')}).</li><li>${cd('b = a')} ne copie pas : deux noms, un seul objet (aliasing).</li><li>Mutables : list, dict, set. Immuables : int, float, bool, str, tuple. « Modifier » un immuable crée un nouvel objet.</li><li>${cd('==')} compare les contenus, ${cd('is')} les identités ; ${cd('is')} seulement pour None.</li><li>Une case de liste contient une référence : ${cd('[L] * 3')} répète la même flèche.</li><li>Copie superficielle (${cd('m[:]')}, ${cd('list(m)')}, ${cd('m.copy()')}) : nouvelle liste extérieure, mêmes objets dedans. Copie profonde : ${cd('copy.deepcopy(m)')}.</li><li>Méthode : pour chaque ligne, se demander si elle <b>modifie un objet</b> (append, L[i] = x, +=) ou si elle <b>déplace une flèche</b> (nom = expression).</li><li>Listes : indices à partir de 0, ${cd('len')}, ${cd('sum')} ; ${cd('+')} et ${cd('*')} fabriquent de nouvelles listes, ${cd('append')} modifie.</li></ul></div>`},
 {kind:'Problème',h:'Trois noms, combien de listes&nbsp;?',p:`Suis l’état de la mémoire ligne par ligne. Pour chaque instruction, demande-toi si elle <b>modifie un objet</b> sur place ou si elle <b>attache un nom</b> à un nouvel objet. Dessine les flèches si besoin.`+py(`a = [1, 2, 3]
b = a
c = a[:]
b.append(4)
c.append(5)
a = a + [6]
b[0] = 0
print(a)
print(b)
print(c)`),
  parts:[
   {q:'a) Qu’affiche ' + cd('print(a)') + '&nbsp;?',opts:[cd('[0, 2, 3, 4, 6]'),cd('[1, 2, 3, 4, 6]'),cd('[1, 2, 3, 6]'),cd('[0, 2, 3, 4]')],ans:1,hint:'Au moment de la ligne 6, que contient la liste partagée par a et b&nbsp;? Et la ligne 6 crée-t-elle un nouvel objet&nbsp;?',why:'La ligne 4 modifie la liste partagée : [1, 2, 3, 4]. La ligne 6 crée une nouvelle liste [1, 2, 3, 4, 6] et y attache a seul. La ligne 7 ne la touche donc pas.'},
   {q:'b) Que vaut ' + cd('sum(b)') + ' à la fin&nbsp;?',lab:'somme =',ans:9,hint:'b référence toujours l’ancienne liste, celle que a a quittée à la ligne 6.',why:'b référence [1, 2, 3, 4], et b[0] = 0 la change en [0, 2, 3, 4]. Somme : 9.'},
   {q:'c) Qu’affiche ' + cd('print(c)') + '&nbsp;?',opts:[cd('[1, 2, 3, 4, 5]'),cd('[1, 2, 3]'),cd('[0, 2, 3, 4, 5]'),cd('[1, 2, 3, 5]')],ans:3,hint:'a[:] fait une copie au moment de la ligne 3. Que contenait la liste à ce moment&nbsp;?',why:'c est une copie de [1, 2, 3], faite avant le append(4). Seul append(5) la touche : [1, 2, 3, 5].'},
   {q:'d) À la fin, que valent ' + cd('a is b') + ' et ' + cd('a == b') + '&nbsp;?',opts:[cd('True True'),cd('False True'),cd('False False'),cd('True False')],ans:2,hint:'Compare les deux contenus trouvés en a) et b).',why:'a et b référencent deux objets différents depuis la ligne 6, donc a is b vaut False. Leurs contenus [1, 2, 3, 4, 6] et [0, 2, 3, 4] diffèrent aussi : a == b vaut False.'},
  ],
  sol:`<p>Ligne 1 : une liste L₁ = [1, 2, 3], référencée par a. Ligne 2 : b référence aussi L₁. Ligne 3 : c référence une copie L₂ = [1, 2, 3].</p><p>Ligne 4 : L₁ devient [1, 2, 3, 4], visible par a et b. Ligne 5 : L₂ devient [1, 2, 3, 5].</p><p>Ligne 6 : a + [6] construit une <b>nouvelle</b> liste L₃ = [1, 2, 3, 4, 6], et a s’y attache. b garde L₁. Ligne 7 : L₁ devient [0, 2, 3, 4].</p><p>Affichage : [1, 2, 3, 4, 6], puis [0, 2, 3, 4], puis [1, 2, 3, 5]. Trois noms, trois objets distincts, et a is b vaut False.</p>`},
 {kind:'Problème',h:'Grilles, copies et tuple',p:`Trois petits programmes indépendants. Le premier veut une grille 3 × 3 de zéros et changer une seule case. Le deuxième copie une liste de listes. Le troisième modifie ce qu’il y a dans un tuple.`+py(`# Programme 1
grille = [[0] * 3] * 3
grille[0][1] = 5
print(grille)

# Programme 2
m = [[1, 2], [3, 4]]
n = m[:]
n[0] = [9, 9]
n[1][0] = 7
print(m)

# Programme 3
t = (1, [2])
t[1].append(3)
print(t)`),
  parts:[
   {q:'a) Combien de 5 le programme 1 affiche-t-il&nbsp;?',lab:'nombre de 5 =',ans:3,hint:'[L] * 3 répète trois fois la même référence L, sans copier L.',why:'[[0] * 3] * 3 contient trois fois la même sous-liste. Changer grille[0][1] change cette sous-liste unique : [[0, 5, 0], [0, 5, 0], [0, 5, 0]].'},
   {q:'b) Par quelle ligne faut-il remplacer la ligne 2 pour qu’un seul 5 apparaisse&nbsp;?',opts:[cd('grille = [[0, 0, 0]] * 3'),cd('grille = list([[0] * 3] * 3)'),cd('grille = [[0] * 3, [0] * 3, [0] * 3]'),cd('grille = ([0] * 3) * 3')],ans:2,hint:'Il faut que l’expression [0] * 3 soit évaluée trois fois, et pas recopiée.',why:'Chaque [0] * 3 crée une nouvelle liste : trois sous-listes distinctes. [[0, 0, 0]] * 3 répète encore la même. list(...) ne copie que la liste extérieure. ([0] * 3) * 3 donne une liste plate de 9 entiers, et grille[0][1] = 5 lève TypeError.'},
   {q:'c) Programme 2 : quelle est la somme de tous les nombres affichés par ' + cd('print(m)') + '&nbsp;?',lab:'somme =',ans:14,hint:'m[:] copie la liste extérieure seulement. Que fait n[0] = …, et que fait n[1][0] = …&nbsp;?',why:'n[0] = [9, 9] réaffecte une case de n seulement. Mais n[1] et m[1] sont la même sous-liste, donc n[1][0] = 7 se voit dans m : [[1, 2], [7, 4]]. Somme : 14.'},
   {q:'d) Que fait le programme 3&nbsp;?',opts:[`Il lève ${cd('TypeError')} : un tuple est immuable`,`Il affiche ${cd('(1, [2])')}`,`Il affiche ${cd('(1, [2, 3])')}`,`Il affiche ${cd('(1, 2, 3)')}`],ans:2,hint:'Le tuple change-t-il de références, ou est-ce l’objet référencé qui change&nbsp;?',why:'Le tuple garde les mêmes références : l’entier 1 et une liste. append modifie cette liste sur place, ce qui est permis. Le tuple affiche donc (1, [2, 3]).'},
  ],
  sol:`<p><b>Programme 1.</b> [0] * 3 crée une liste L, et [L] * 3 donne [L, L, L]. Écrire dans grille[0] écrit dans L, donc dans les trois lignes : trois 5. La correction évalue [0] * 3 trois fois : [[0] * 3, [0] * 3, [0] * 3].</p><p><b>Programme 2.</b> n = m[:] crée une nouvelle liste extérieure qui contient les mêmes sous-listes. n[0] = [9, 9] change seulement la case 0 de n. n[1][0] = 7 modifie la sous-liste partagée. m vaut [[1, 2], [7, 4]], de somme 14.</p><p><b>Programme 3.</b> L’immuabilité du tuple porte sur ses références, pas sur les objets qu’elles désignent. La liste [2] devient [2, 3] et t affiche (1, [2, 3]).</p>`},
]},

/* ===================== 3. FONCTIONS ===================== */
{subj:'ics',sem:'py',id:'ics-fonctions',h:'Fonctions',p:'Définir une fonction, passer des arguments, renvoyer un résultat, comprendre la portée et importer des bibliothèques.',steps:[
 {h:'Définir et appeler',p:`<p>Tu dois calculer l’aire de dix rectangles. Plutôt que de recopier dix fois la formule, tu l’écris une fois, tu lui donnes un nom, et tu l’utilises quand tu veux : c’est une fonction.</p>
<div class="def"><p>${cd('def nom(p1, p2):')} suivi d’un bloc indenté <b>définit</b> une fonction. Les noms entre parenthèses sont ses <b>paramètres</b>. Un <b>appel</b> ${cd('nom(a1, a2)')} lui passe des <b>arguments</b> : chaque paramètre reçoit la valeur de l’argument correspondant, puis le corps s’exécute. ${cd('return v')} termine l’appel et renvoie <i>v</i>.</p></div>
<div class="idea"><p>${cd('def')} ne calcule rien : il range la recette sous un nom. Le corps ne s’exécute qu’au moment d’un appel, et à <b>chaque</b> appel. Lors d’un appel, l’expression ${cd('nom(…)')} est remplacée par la valeur renvoyée, qu’on peut utiliser dans un calcul.</p></div>
${exe(`def carre(x):
    print('calcul de', x)
    return x * x

print('début')
y = carre(3) + carre(4)
print(y)`,`début
calcul de 3
calcul de 4
25`,`<p>Rien ne s’affiche à la définition. Les deux appels exécutent le corps l’un après l’autre, puis 9 + 16 est rangé dans <i>y</i>.</p>`)}
<div class="warn"><p>Sans parenthèses, ${cd('carre')} désigne la fonction elle-même, sans l’appeler : ${cd('print(carre)')} affiche une description de la fonction, pas un nombre.</p></div>`,
  fig:py(`def aire_rectangle(l, h):
    return l * h

a = aire_rectangle(3, 4)   # a vaut 12
print(a + 1)               # 13`),
  note:`Une fonction sans ${cd('return')} renvoie ${cd('None')}. Afficher avec print n’est pas renvoyer.`},
 {kind:'Théorie',h:'Renvoyer ou afficher',p:`<p>Une fonction qui affiche son résultat semble marcher : on voit le bon nombre à l’écran. Le problème apparaît quand on veut se servir de ce nombre dans un calcul.</p>
<div class="def"><p>${cd('return expr')} termine l’appel <b>immédiatement</b> et donne la valeur de <i>expr</i> à l’endroit qui a appelé. Une fonction qui se termine sans ${cd('return')} (ou avec un ${cd('return')} seul) renvoie ${cd('None')}, une valeur spéciale qui veut dire « rien ».</p></div>
<div class="idea"><p>${cd('print')} montre une valeur à l’humain qui regarde l’écran ; ${cd('return')} la donne au programme, qui peut la stocker ou la combiner. Les lignes placées après un ${cd('return')} exécuté ne sont jamais atteintes.</p></div>
${exe(`def double_affiche(x):
    print(2 * x)

def double(x):
    return 2 * x
    print('jamais affiché')

a = double(5) + 1
b = double_affiche(5)
print(a, b)`,`10
11 None`,`<p>Le 10 vient du print à l’intérieur de double_affiche. Cette fonction renvoie None, que <i>b</i> reçoit.</p>`)}
<div class="warn"><p>${cd('double_affiche(5) + 1')} affiche 10, puis lève ${cd('TypeError')} : on ne peut pas ajouter 1 à None.</p></div>`},
 {h:'print ou return',p:'Qu’affiche ce code&nbsp;?',fig:py(`def f(x):
    print(x + 1)

r = f(2)
print(r)`),
  opts:[cd('3') +' puis '+cd('3'),cd('3')+' puis '+cd('None'),cd('None')+' seulement',cd('3')+' seulement'],ans:1,
  why:'L’appel f(2) affiche 3. Mais f n’a pas de return : elle renvoie None, donc r vaut None et la deuxième ligne affiche None.'},
 {h:'Positionnels, nommés, par défaut',p:`<p>Une fonction a parfois plusieurs paramètres, dont certains prennent presque toujours la même valeur. Python offre trois façons de les remplir.</p>
<div class="def"><p>Un argument <b>positionnel</b> remplit les paramètres dans l’ordre de la définition. Un argument <b>nommé</b>, comme ${cd('c=3')}, vise un paramètre par son nom, quelle que soit sa place. Un paramètre écrit ${cd('b=10')} dans le ${cd('def')} a une <b>valeur par défaut</b> : on peut l’omettre à l’appel.</p></div>
<div class="idea"><p>À l’appel, Python remplit d’abord les positionnels de gauche à droite, puis les nommés par leur nom, puis complète les paramètres restants avec leurs défauts. Un paramètre qui reste vide, ou qui est rempli deux fois, provoque ${cd('TypeError')}. Choisis un appel avec le curseur : la couleur dit comment chaque paramètre a été rempli.</p></div>
${exe(`def f(a, b=10, c=100):
    return a + b + c

print(f(1, c=3), f(2, 5))`,`14 107`,`<p>f(1, c=3) : a = 1, b garde 10, c = 3. f(2, 5) : a = 2, b = 5, c garde 100.</p>`)}
<div class="warn"><p>${cd('f(1, a=2)')} lève TypeError : <i>a</i> reçoit deux valeurs. Et une valeur par défaut est calculée une seule fois, quand Python exécute la ligne ${cd('def')} : avec un défaut mutable comme ${cd('[]')}, tous les appels partagent la même liste (dernier problème).</p></div>`,
  params:[{id:'k',l:'Appel',min:0,max:5,v:0}],
  draw:v=>{ const C=[['f(1)',[1,'p'],[10,'d'],[100,'d']],['f(1, 2)',[1,'p'],[2,'p'],[100,'d']],['f(1, c=3)',[1,'p'],[10,'d'],[3,'n']],['f(c=3, a=1)',[1,'n'],[10,'d'],[3,'n']],['f(1, 2, 3)',[1,'p'],[2,'p'],[3,'p']],['f(b=5, a=2)',[2,'n'],[5,'n'],[100,'d']]][v.k];
    const col={p:'var(--accent)',n:'var(--spark)',d:'var(--muted)'};
    const fig=memFig(3.4,P=>{ ['a','b','c'].forEach((n,i)=>{ const x=1.2+i*3.1, s=C[i+1]; P.text(x,2.6,n,{a:'middle',s:16}); box(P,x-0.8,1.6,1.6,String(s[0]),col[s[1]]); });
      P.text(0.2,0.4,'positionnel',{s:12,c:'var(--accent)'}); P.text(3.6,0.4,'nommé',{s:12,c:'var(--spark)'}); P.text(6.2,0.4,'par défaut',{s:12,c:'var(--muted)'}); });
    return py(`def f(a, b=10, c=100):\n    return a + b + c\n\nprint(${C[0]})`)+fig; },
  info:v=>{ const r=[111,103,14,14,6,107][v.k]; return `L’appel renvoie <b>${r}</b>.`; },
  note:`Règles : les positionnels viennent avant les nommés, et les paramètres sans défaut se placent avant ceux qui en ont. ${cd('f(a=1, 2)')} est une erreur de syntaxe.`},
 {h:'Calcule l’appel',p:'Que renvoie l’appel ci-dessous&nbsp;?',fig:py(`def g(x, y=3, z=1):
    return x * y - z

print(g(4, z=2))`),lab:'résultat =',ans:10,
  why:'x = 4 (positionnel), y garde sa valeur par défaut 3, z = 2 (nommé). Donc 4 · 3 − 2 = 10.'},
 {h:'Portée locale et globale',p:`<p>Dans une fonction, tu écris ${cd('x = 5')} alors qu’il existe déjà un <i>x</i> dans le programme principal. Lequel change ? La réponse s’appelle la <b>portée</b> d’un nom.</p>
<div class="def"><p>Un nom <b>affecté</b> dans le corps d’une fonction (paramètres compris) est <b>local</b> : il naît au début de l’appel, disparaît au ${cd('return')}, et masque un nom global identique. Un nom seulement <b>lu</b> dans la fonction, jamais affecté, est cherché parmi les noms <b>globaux</b>. Pour réaffecter un nom global depuis une fonction, il faut déclarer ${cd('global x')} au début du corps.</p></div>
<div class="idea"><p>Chaque appel reçoit son propre tableau de noms, son <b>cadre</b>. Python décide qu’un nom est local en lisant tout le corps avant de l’exécuter : s’il y a une affectation à ce nom n’importe où dans la fonction, il est local partout dans la fonction.</p></div>
${exe(`taux = 2
def f(x):
    return x * taux      # taux est lu : global

def g(x):
    taux = 10            # taux est affecté : local
    return x * taux

print(f(3), g(3), taux)`,`6 30 2`)}
<div class="warn"><p>${cd('def incr(): n = n + 1')} avec un <i>n</i> global lève ${cd('UnboundLocalError')} : <i>n</i> est local, car affecté, et on le lit avant de lui avoir donné une valeur.</p></div>`,
  fig:py(`x = 10
def f():
    x = 5        # x local, le x global n'est pas touché
    return x

print(f(), x)    # 5 10

compteur = 0
def incr():
    global compteur
    compteur += 1`),
  note:'Évite global quand tu peux : une fonction qui reçoit ses données en paramètres et renvoie son résultat se teste et se réutilise bien plus facilement.'},
 {kind:'Théorie',h:'Un paramètre reçoit l’objet, pas une copie',p:`<p>Si on passe une liste à une fonction et que la fonction la modifie, l’appelant le voit-il ? Il suffit de savoir ce que fait Python au moment de l’appel.</p>
<div class="def"><p>À l’appel ${cd('f(a)')}, Python évalue l’argument <i>a</i>, puis attache le paramètre local <i>L</i> à l’objet obtenu, exactement comme ${cd('L = a')}. Aucune copie n’est faite : pendant l’appel, <i>L</i> et <i>a</i> sont deux noms pour le même objet.</p></div>
<div class="idea"><p>On retrouve les règles du chapitre sur les références. <b>Modifier</b> l’objet par le paramètre (${cd('L.append(…)')}, ${cd('L[i] = …')}) se voit dehors. <b>Réaffecter</b> le paramètre (${cd('L = …')}, ${cd('n = n + 1')}) déplace seulement l’étiquette locale, que l’appelant ne voit pas. Avec un entier, seule la seconde chose est possible.</p></div>
${exe(`def f(L, n):
    L.append(n)
    n = n + 1
    L = [0]

a = [1]
k = 5
f(a, k)
print(a, k)`,`[1, 5] 5`,`<p>append a modifié la liste de <i>a</i>. Les deux réaffectations n’ont touché que les noms locaux, effacés à la fin de l’appel.</p>`)}
<div class="warn"><p>Pour qu’une fonction ne touche pas la liste reçue, fais-lui travailler sur une copie : ${cd('L = L[:]')} en première ligne du corps.</p></div>`},
 {h:'Une liste passée en argument',p:'Qu’affiche ce code&nbsp;?',fig:py(`def ajoute(L):
    L.append(0)
    L = [9]

a = [1]
ajoute(a)
print(a)`),
  opts:[cd('[1]'),cd('[9]'),cd('[1, 0, 9]'),cd('[1, 0]')],ans:3,
  why:'Au début, L et a référencent la même liste : append(0) la modifie, a vaut [1, 0]. Ensuite L = [9] attache seulement le nom local L à une nouvelle liste. a n’est pas touchée.'},
 {kind:'Méthode',h:'Tracer des appels de fonction',
  p:`<p>Chaque appel crée un <b>cadre</b> neuf : un petit tableau à part pour ses paramètres et ses variables locales. Pour tracer un appel :</p><ol><li>Calcule les arguments avec les valeurs de l’endroit qui appelle.</li><li>Ouvre un tableau pour cet appel et range chaque argument dans son paramètre.</li><li>Exécute le corps dans ce tableau. Un appel à l’intérieur ouvre un nouveau tableau, posé au-dessus.</li><li>Au ${cd('return')}, ferme le tableau et remplace l’appel par la valeur renvoyée.</li></ol><p>Les noms d’un cadre ne touchent pas ceux des autres cadres, sauf avec ${cd('global')}.</p>`,
  demo:{enonce:'Qu’affiche ce programme&nbsp;?'+py(`def f(a):
    b = a + 1
    return b * 2

def g(b):
    return f(b) - b

b = 10
print(g(3), b)`),
   etapes:[
    {f:'Global : b = 10. On appelle g(3).',w:'Les deux def ne font que définir les fonctions. Le programme commence vraiment à b = 10.'},
    {f:'Cadre de g : b = 3. Il faut f(b), donc f(3).',w:'Dans g, le nom b désigne le paramètre local, qui vaut 3, pas le b global.'},
    {f:'Cadre de f : a = 3, puis b = 4. f renvoie 4 · 2 = 8.',w:'Ce b est local à f. Il n’a rien à voir avec celui de g ni avec le global.'},
    {f:'Retour dans g : 8 − 3 = 5. g renvoie 5.',w:'L’appel f(b) est remplacé par 8, et le b de g vaut toujours 3.'},
    {f:'print affiche 5 10.',w:'Aucun cadre n’a réaffecté le b global, qui vaut encore 10.'}],
   conclusion:'Le programme affiche 5 10. Trois b différents ont existé, un par cadre.'},
  note:'Écris les cadres les uns au-dessus des autres, comme une pile : le dernier ouvert est le premier fermé.'},
 {h:'Deux cadres',p:'Qu’affiche ce programme&nbsp;?',fig:py(`def h(x, y):
    x = x + y
    return x * y

def k(n):
    m = h(n, 2)
    return h(m, n)

x = 1
print(k(x + 2))`),lab:'affichage :',ans:39,
  why:'k(3) : h(3, 2) met x = 5 dans son cadre et renvoie 10, donc m = 10. Puis h(10, 3) : x = 13, et on renvoie 13 · 3 = 39. Le x global vaut toujours 1.'},
 {h:'Importer une bibliothèque',p:`<p>Racine carrée, arrondis, tirages au hasard : ces fonctions ont déjà été écrites et rangées dans des <b>modules</b>. Il suffit de les charger.</p>
<div class="def"><p>${cd('import math')} charge le module <i>math</i> et crée le nom ${cd('math')}. On atteint son contenu avec un point : ${cd('math.sqrt')}, ${cd('math.pi')}, ${cd('math.floor')} (arrondi vers le bas), ${cd('math.ceil')} (vers le haut). ${cd('from math import sqrt')} importe seulement <i>sqrt</i>, qu’on écrit alors sans préfixe. Le module ${cd('random')} tire des nombres au hasard.</p></div>
<div class="idea"><p>Le point se lit « dans » : ${cd('math.floor')} est « floor dans math ». Ce préfixe évite les conflits de noms : ta propre fonction floor et celle de math peuvent coexister.</p></div>
${exe(`import math
from math import sqrt
print(math.sqrt(16), sqrt(2) ** 2 == 2)
print(math.floor(-2.5), math.ceil(-2.5), math.pi)`,`4.0 False
-3 -2 3.141592653589793`,`<p>math.sqrt renvoie toujours un float, même pour un carré parfait. √2 est approché, donc son carré n’est pas exactement 2.</p>`)}
<div class="warn"><p>Appeler ${cd('sqrt(2)')} sans l’avoir importé lève ${cd('NameError')}. Et les résultats de random changent à chaque exécution : on ne peut pas prévoir leur sortie exacte.</p></div>`,
  fig:py(`import math
import random

math.sqrt(16)            # 4.0 (un float)
math.floor(2.7)          # 2 : arrondi vers le bas
math.ceil(2.1)           # 3 : arrondi vers le haut
random.randint(1, 6)     # entier de 1 à 6, bornes incluses
random.random()          # float dans [0 ; 1[
random.choice(['a', 'b', 'c'])`),
  note:`Piège : ${cd('random.randint(1, 6)')} inclut 6, alors que ${cd('range(1, 6)')} s’arrête à 5.`},
 {h:'Avec math',p:`Que vaut ${cd('math.floor(math.sqrt(50)) + math.ceil(2.1)')}&nbsp;?`,lab:'résultat =',ans:10,
  why:'√50 ≈ 7,07, donc math.floor donne 7. math.ceil(2.1) = 3. Total : 7 + 3 = 10.'},
 {kind:'Méthode',h:'Découper un problème en fonctions',
  p:`<p>Quand un calcul revient plusieurs fois, ou qu’un problème a plusieurs étapes, écris <b>une petite fonction par tâche</b>. Chacune porte un nom clair, reçoit ce dont elle a besoin en paramètres et <b>renvoie</b> son résultat avec ${cd('return')} (pas ${cd('print')}). La fonction principale appelle les autres.</p><p>Tu écris ainsi chaque calcul une seule fois, et tu peux tester chaque morceau à part.</p>`,
  demo:{enonce:'Calculer le périmètre du triangle de sommets A(0 ; 0), B(3 ; 0) et C(3 ; 4).',
   etapes:[
    {f:'Sous-problème qui se répète : la distance entre deux points, trois fois (AB, BC, CA).',w:'On cherche le calcul qu’on écrirait sinon trois fois.'},
    {f:py(`import math

def distance(xa, ya, xb, yb):
    return math.sqrt((xb - xa) ** 2 + (yb - ya) ** 2)`),w:'Une fonction pour ce calcul, qui renvoie la distance (théorème de Pythagore).'},
    {f:py(`def perimetre(xa, ya, xb, yb, xc, yc):
    return (distance(xa, ya, xb, yb) + distance(xb, yb, xc, yc)
            + distance(xc, yc, xa, ya))`),w:'La fonction principale ne fait qu’assembler. Parce que distance renvoie un nombre, on peut additionner ses résultats.'},
    {f:'perimetre(0, 0, 3, 0, 3, 4) = 3.0 + 4.0 + 5.0 = 12.0',w:'On teste : AB = 3, BC = 4 et CA = √(9 + 16) = 5. math.sqrt renvoie un float, d’où 12.0.'}],
   conclusion:'Le périmètre vaut 12. distance resservira dans tout autre calcul de géométrie.'},
  note:'Si une fonction affiche au lieu de renvoyer, on ne peut rien faire de son résultat : distance(…) + distance(…) donnerait une erreur, car None + None est impossible.'},
 {h:'Réutiliser une fonction',p:`Avec les fonctions ${cd('distance')} et ${cd('perimetre')} de la méthode, que vaut ${cd('perimetre(0, 0, 6, 0, 6, 8)')}&nbsp;?`,lab:'périmètre =',ans:24,
  why:'AB = 6, BC = 8 et CA = √(36 + 64) = 10. Le périmètre vaut 6 + 8 + 10 = 24 (Python affiche 24.0).'},
 {kind:'Défi',h:'Deux appels',p:'Qu’affiche ce code&nbsp;?',fig:py(`def f(a, b=2, c=3):
    return a * 100 + b * 10 + c

print(f(1, c=5) + f(c=1, a=2, b=0))`),lab:'affichage :',ans:326,
  why:'f(1, c=5) : a = 1, b = 2, c = 5, soit 100 + 20 + 5 = 125. f(c=1, a=2, b=0) : 200 + 0 + 1 = 201. Somme : 326.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Une fonction est une recette nommée, exécutée dans son propre cadre à chaque appel.</p>
<div class="keep"><ul><li>${cd('def nom(params):')} définit sans exécuter ; ${cd('nom(args)')} exécute le corps et vaut la valeur renvoyée.</li><li>${cd('return')} termine l’appel et renvoie une valeur ; sans return, la fonction renvoie ${cd('None')}. print affiche, return renvoie.</li><li>Arguments positionnels (dans l’ordre), nommés (${cd('c=3')}), valeurs par défaut (calculées une seule fois, à la ligne def).</li><li>Un nom affecté dans la fonction est local ; un nom seulement lu est cherché dans le global ; ${cd('global x')} pour réaffecter un global.</li><li>Un paramètre est attaché à l’objet passé, sans copie : modifier l’objet se voit dehors, réaffecter le paramètre non.</li><li>${cd('import math')} puis ${cd('math.sqrt')} ; ${cd('from math import sqrt')} ; ${cd('random.randint(a, b)')} inclut <i>b</i>.</li><li>Méthodes : tracer les appels avec un cadre par appel, empilés ; découper un problème en petites fonctions qui renvoient leur résultat.</li></ul></div>`},
 {kind:'Problème',h:'Un x peut en cacher un autre',p:`Deux fonctions utilisent un nom <i>x</i> qui existe aussi au niveau global. Suis chaque appel en séparant bien les variables locales de la variable globale. N’oublie pas que le paramètre de <i>g</i> s’appelle lui aussi <i>x</i>.`+py(`x = 3

def f(y):
    x = y * 2
    return x + 1

def g(x):
    return f(x) + x

a = f(x)
b = g(a)
print(x, a, b)`),
  parts:[
   {q:'a) Que vaut <i>a</i>&nbsp;?',lab:'a =',ans:7,hint:'f reçoit y = 3. Le x de la ligne 4 est local à f.',why:'f(3) : le x local vaut 6 et f renvoie 6 + 1 = 7.'},
   {q:'b) Que vaut <i>b</i>&nbsp;?',lab:'b =',ans:22,hint:'Dans g, x est le paramètre, qui vaut a. Calcule f(x), puis ajoute x.',why:'g(7) : f(7) renvoie 7 · 2 + 1 = 15, puis 15 + 7 = 22.'},
   {q:'c) Quelle est la première valeur affichée par ' + cd('print') + '&nbsp;?',opts:[cd('6'),cd('3'),cd('14'),cd('7')],ans:1,hint:'Une ligne de f ou de g a-t-elle réaffecté le x global&nbsp;?',why:'x = y * 2 crée un x local à f, et le x de g est un paramètre local. Le x global n’a jamais été réaffecté : il vaut toujours 3.'},
   {q:'d) On ajoute ' + cd('global x') + ' comme première ligne du corps de <i>f</i>. Quelle est alors la première valeur affichée&nbsp;?',lab:'x =',ans:14,hint:'f modifie maintenant le x global à chaque appel. Combien de fois f est-elle appelée, et avec quel argument la dernière fois&nbsp;?',why:'f(3) met le x global à 6 et renvoie 7. Puis g(7) appelle f(7), qui met le x global à 14 et renvoie 15. Le x de g reste son paramètre local (7), donc b = 22. On affiche 14 7 22.'},
  ],
  sol:`<p>Sans global : f(3) crée un x local égal à 6 et renvoie 7, donc a = 7. g(7) a un paramètre local x = 7. Elle calcule f(7) = 15, puis 15 + 7 = 22. Le x global n’a pas bougé : on affiche 3 7 22.</p><p>Avec global x dans f : la ligne x = y * 2 réaffecte cette fois la variable globale. f(3) la met à 6 et renvoie 7. Dans g(7), le nom x désigne le paramètre local, qui vaut 7. L’appel f(7) met le x global à 14 et renvoie 15, donc b = 15 + 7 = 22.</p><p>On affiche 14 7 22. Seule la première valeur change : c’est tout l’effet de global.</p>`},
 {kind:'Problème',h:'Le piège de la liste par défaut',p:`Cette fonction veut ajouter <i>x</i> à la liste <i>L</i>, et partir d’une liste vide si on n’en donne pas. Mais la valeur par défaut d’un paramètre est évaluée <b>une seule fois</b>, quand Python exécute la ligne ${cd('def')}. Tous les appels sans second argument partagent donc le même objet.`+py(`def ajoute(x, L=[]):
    L.append(x)
    return L

a = ajoute(1)
b = ajoute(2)
c = ajoute(3, [])
d = ajoute(4)
print(a, len(b), c, len(d))`),
  parts:[
   {q:'a) Que vaut ' + cd('len(d)') + '&nbsp;?',lab:'len(d) =',ans:3,hint:'Quels appels utilisent la liste par défaut&nbsp;? L’appel avec c en utilise-t-il une autre&nbsp;?',why:'Les appels de a, b et d utilisent la même liste par défaut, qui reçoit 1, 2 puis 4. L’appel de c reçoit sa propre liste neuve. d vaut [1, 2, 4], de longueur 3.'},
   {q:'b) Quelle est la première chose affichée, la valeur de <i>a</i>&nbsp;?',opts:[cd('[1]'),cd('[1, 2, 4]'),cd('[1, 2, 3, 4]'),cd('[4]')],ans:1,hint:'a référence-t-il un objet à part, ou la liste par défaut&nbsp;? print lit l’objet à la fin.',why:'a référence la liste par défaut elle-même. Au moment du print, elle contient [1, 2, 4]. Le 3 est allé dans la liste passée par l’appel de c.'},
   {q:'c) Quelle modification corrige la fonction (chaque appel sans second argument part d’une liste vide)&nbsp;?',opts:[`Remplacer ${cd('return L')} par ${cd('return L[:]')}`,`Ajouter ${cd('global L')} au début du corps`,`Écrire ${cd('def ajoute(x, L=None):')}, puis commencer le corps par ${cd('if L is None:')} ${cd('L = []')}`,`Écrire ${cd('L = []')} après la ligne ${cd('def')}, au niveau global`],ans:2,hint:'Il faut une expression [] évaluée à chaque appel, pas une seule fois.',why:'Avec None, la liste vide est créée dans le corps, donc à chaque appel. return L[:] renvoie une copie, mais la liste par défaut grossit toujours. global L avec un paramètre L est une SyntaxError. Une variable globale L ne change rien au paramètre.'},
   {q:'d) Avec la version corrigée, que vaut ' + cd('len(a) + len(b) + len(c) + len(d)') + '&nbsp;?',lab:'total =',ans:4,hint:'Chaque appel part maintenant d’une liste neuve.',why:'a = [1], b = [2], c = [3] et d = [4] : chaque liste a un seul élément. Total : 4.'},
  ],
  sol:`<p>Python évalue [] une seule fois, à la définition. Appelons D cette liste. ajoute(1) ajoute 1 à D et renvoie D : a référence D. ajoute(2) renvoie encore D, qui vaut [1, 2]. ajoute(3, []) travaille sur une liste neuve et renvoie [3]. ajoute(4) renvoie D = [1, 2, 4].</p><p>a, b et d sont trois noms pour D. Le print affiche [1, 2, 4] 3 [3] 3.</p><p>La correction classique utilise une sentinelle immuable : L=None dans l’en-tête, puis if L is None: L = [] dans le corps. La liste vide est alors créée à chaque appel. On obtient a = [1], b = [2], c = [3], d = [4].</p>`},
]},

/* ===================== 4. STRUCTURES DE CONTRÔLE ===================== */
{subj:'ics',sem:'py',id:'ics-controle',h:'Structures de contrôle',p:'Choisir avec if, répéter avec while et for, sortir d’une boucle, imbriquer des boucles.',steps:[
 {h:'if, elif, else',p:`<p>Un programme doit souvent réagir différemment selon les données : afficher « suffisant » ou « insuffisant » selon une note. Il lui faut un aiguillage.</p>
<div class="def"><p>${cd('if c1:')} suivi d’un bloc, puis éventuellement des ${cd('elif c2:')} et un ${cd('else:')}, chacun avec son bloc. Python évalue les conditions <b>dans l’ordre</b>, exécute le bloc de la <b>première</b> condition vraie, puis saute tous les autres. Si aucune n’est vraie, il exécute le bloc ${cd('else')}, s’il existe. Un <b>bloc</b> est l’ensemble des lignes indentées (4 espaces) qui suivent les deux-points.</p></div>
<div class="idea"><p>Une chaîne if / elif / else choisit <b>un seul</b> chemin. Plusieurs ${cd('if')} à la suite, eux, sont indépendants : chacun est testé, et plusieurs blocs peuvent s’exécuter. L’indentation n’est pas décorative : c’est elle qui dit où un bloc s’arrête.</p></div>
${exe(`n = 15
if n % 3 == 0:
    print('fizz')
elif n % 5 == 0:
    print('buzz')
if n % 5 == 0:
    print('cinq')`,`fizz
cinq`,`<p>15 est multiple de 3 : le elif est sauté, bien que 15 soit aussi multiple de 5. Le second if est un nouveau test, indépendant du premier.</p>`)}
<div class="warn"><p>Oublier les deux-points donne ${cd('SyntaxError')}, une ligne mal décalée ${cd('IndentationError')} ou, pire, un bloc qui s’arrête au mauvais endroit sans aucune erreur.</p></div>`,
  fig:py(`note = 4.5
if note >= 5.5:
    print('très bien')
elif note >= 4:
    print('suffisant')     # c'est ce bloc qui s'exécute
else:
    print('insuffisant')

x = 7
print(0 <= x < 10 and not x == 3)   # True`),
  note:`${cd('=')} affecte, ${cd('==')} compare. Et ${cd('0 <= x < 10')} s’écrit directement en Python : c’est ${cd('0 <= x and x < 10')}.`},
 {h:'Quelle branche&nbsp;?',p:'Qu’affiche ce code&nbsp;?',fig:py(`x = 7
if x > 5:
    print('A')
elif x > 3:
    print('B')
else:
    print('C')`),
  opts:[cd('A')+' puis '+cd('B'),cd('B'),cd('A'),cd('C')],ans:2,
  why:'7 > 5 est vrai : on affiche A, et les branches elif et else sont sautées, même si 7 > 3 est vrai aussi.'},
 {kind:'Théorie',h:'Comparer et combiner des conditions',p:`<p>« Entre 0 et 10, mais pas égal à 3 » : une vraie condition combine souvent plusieurs comparaisons.</p>
<div class="def"><p>Les comparaisons ${cd('==')}, ${cd('!=')}, ${cd('<')}, ${cd('<=')}, ${cd('>')}, ${cd('>=')} donnent un bool. ${cd('A and B')} est vrai si les deux le sont ; ${cd('A or B')} si au moins une l’est ; ${cd('not A')} inverse. Priorités : les comparaisons, puis ${cd('not')}, puis ${cd('and')}, puis ${cd('or')}. ${cd('0 <= x < 10')} s’écrit directement et signifie ${cd('0 <= x and x < 10')}.</p></div>
<div class="idea"><p>Python évalue ${cd('and')} et ${cd('or')} <b>de gauche à droite, et s’arrête dès qu’il connaît la réponse</b>. Si A est faux, ${cd('A and B')} est faux sans regarder B ; si A est vrai, ${cd('A or B')} est vrai sans regarder B. On s’en sert pour protéger un calcul : ${cd('x != 0 and 10 / x > 2')} ne divise jamais par zéro.</p></div>
${exe(`x = 0
print(x != 0 and 10 / x > 2)
print(x == 0 or 10 / x > 2)
print(not x > 3 and x < 5)`,`False
True
True`,`<p>Dans les deux premières lignes, 10 / x n’est jamais calculé. La troisième se lit (not (x &gt; 3)) and (x &lt; 5).</p>`)}
<div class="warn"><p>${cd('x == 1 or 2')} ne teste pas « x vaut 1 ou 2 » : il se lit ${cd('(x == 1) or 2')}, et 2 compte comme vrai. Le test passe toujours. Écris ${cd('x == 1 or x == 2')}.</p></div>`},
 {h:'La boucle while',p:`<p>Il faut parfois répéter un calcul sans savoir à l’avance combien de fois : diviser par 2 tant que c’est possible, attendre qu’une somme dépasse 100.</p>
<div class="def"><p>${cd('while condition:')} suivi d’un bloc. Python teste la condition. Si elle est vraie, il exécute <b>tout</b> le bloc, puis revient au test. Dès que le test est faux, il saute le bloc et passe à la suite du programme. Un passage dans le bloc s’appelle un <b>tour</b>.</p></div>
<div class="idea"><p>Le test a lieu au <b>début</b> de chaque tour, jamais au milieu du bloc. Si la condition est fausse dès le départ, la boucle fait zéro tour. Le corps doit modifier une variable de la condition, sinon la condition reste vraie et la boucle ne s’arrête jamais.</p></div>
<div class="ex"><p>Avec n0 = 6, la boucle ci-dessous (suite de Syracuse) donne n = 3, 10, 5, 16, 8, 4, 2, 1 : après 8 tours, n != 1 est faux et la boucle s’arrête avec pas = 8. Vérifie-le sur la figure.</p></div>
<div class="warn"><p>Une boucle infinie ne produit pas d’erreur : le programme tourne sans fin. On l’interrompt avec Ctrl+C. Choisis le départ, puis avance tour par tour.</p></div>`+py(`n = n0
pas = 0
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    pas += 1`),
  params:[{id:'n0',l:'n0',min:2,max:20,v:7},{id:'k',l:'Tours',min:0,max:20,v:3}],
  draw:v=>{ const t=[v.n0]; while(t[t.length-1]!==1) { const n=t[t.length-1]; t.push(n%2===0?n/2:3*n+1); }
    const m=Math.min(v.k,t.length-1), P=plane({x:[-1,21],y:[-12,172],h:200,grid:false,lx:5,ly:40});
    P.poly(t.slice(0,m+1).map((y,i)=>[i,y]),{open:true,c:'var(--code)',w:2.5});
    t.slice(0,m+1).forEach((y,i)=>P.dot(i,y,{r:i===m?6:3.5,c:i===m?'var(--spark)':'var(--code)'}));
    P.text(m,t[m],'n = '+t[m],{dx:8,dy:-8,s:12}); return P.svg(); },
  info:v=>{ const t=[v.n0]; while(t[t.length-1]!==1){ const n=t[t.length-1]; t.push(n%2===0?n/2:3*n+1); }
    const m=Math.min(v.k,t.length-1); return `Après ${m} tour(s) : n = ${t[m]}, pas = ${m}. `+(t[m]===1?`La condition ${cd('n != 1')} est fausse : la boucle s’arrête après <b>${t.length-1}</b> tours.`:`${cd('n != 1')} est vraie : on refait un tour.`); },
  note:'Personne ne sait démontrer que cette boucle s’arrête pour tout n0. C’est la conjecture de Syracuse.'},
 {kind:'Méthode',h:'Tracer une boucle avec un tableau des tours',
  p:`<p>Pour une boucle, fais un tableau avec une colonne pour le <b>test</b> et une colonne par variable. À chaque tour : évalue la condition avec les valeurs actuelles, puis, si elle est vraie, exécute le corps et écris une nouvelle ligne. Dès que le test est faux, on sort et on passe à la suite.</p><p>Pour compter : la boucle fait autant de <b>tours</b> que de tests vrais, et la condition est évaluée <b>une fois de plus</b>, la fois où elle est fausse.</p>`,
  demo:{enonce:'Qu’affiche ce programme, combien de tours fait la boucle et combien de fois la condition est-elle évaluée&nbsp;?'+py(`s = 0
i = 1
while s < 20:
    s = s + i
    i = i + 2
print(i, s)`),
   etapes:[
    {f:'Départ : s = 0, i = 1.',w:'Première ligne du tableau, avant tout test.'},
    {f:tab(['test','s','i'],[['0 &lt; 20 vrai',1,3],['1 &lt; 20 vrai',4,5],['4 &lt; 20 vrai',9,7],['9 &lt; 20 vrai',16,9],['16 &lt; 20 vrai',25,11]]),w:'Chaque ligne est un tour : on teste avec les anciennes valeurs, puis on écrit les nouvelles.'},
    {f:'Test suivant : 25 &lt; 20 est faux, on sort.',w:'La condition est vérifiée au début de chaque tour, pas au milieu du corps.'},
    {f:'5 tests vrais, donc 5 tours. Avec le test faux, la condition est évaluée 6 fois.',w:'On compte les lignes du tableau, plus le dernier test.'}],
   conclusion:'Le programme affiche 11 25, après 5 tours et 6 évaluations de la condition.'},
  note:`${cd("print(x, end=' ')")} écrit x suivi d’une espace au lieu d’aller à la ligne : les affichages successifs d’une boucle restent alors sur une seule ligne.`},
 {h:'Compte les tours',p:'Qu’affiche ce code&nbsp;?',fig:py(`n = 100
k = 0
while n > 1:
    n = n // 3
    k += 1
print(k)`),lab:'k =',ans:4,
  why:'n prend les valeurs 100, 33, 11, 3, 1. Quatre divisions, puis n > 1 est faux : k = 4.'},
 {h:'for et range',p:`<p>Quand on sait d’avance ce qu’on parcourt (les nombres de 1 à 100, les lettres d’un mot, les éléments d’une liste), une boucle ${cd('while')} avec un compteur à gérer soi-même est inutilement risquée.</p>
<div class="def"><p>${cd('for x in sequence:')} suivi d’un bloc : <i>x</i> prend successivement <b>chaque élément</b> de la séquence, dans l’ordre, et le bloc s’exécute une fois par élément. ${cd('range(fin)')}, ${cd('range(debut, fin)')} et ${cd('range(debut, fin, pas)')} produisent les entiers de <i>debut</i> (0 par défaut) <b>inclus</b> à <i>fin</i> <b>exclue</b>, de <i>pas</i> en <i>pas</i> (1 par défaut, négatif pour descendre).</p></div>
<div class="idea"><p>La fin exclue n’est pas un caprice : ${cd('range(a, b)')} contient exactement <i>b</i> − <i>a</i> entiers, et ${cd('range(len(L))')} parcourt exactement les indices de L. La boucle for gère seule sa variable : pas de ${cd('i += 1')} à oublier.</p></div>
${exe(`s = 0
for k in range(1, 5):
    s = s + k
print(s, list(range(10, 0, -3)), list(range(3, 3)))`,`10 [10, 7, 4, 1] []`,`<p>k vaut 1, 2, 3, 4 : 5 est exclu. ${cd('list()')} sert seulement à afficher les entiers d’un range. range(3, 3) est vide : la boucle ferait zéro tour.</p>`)}
<div class="warn"><p>Réaffecter la variable de boucle dans le bloc ne change pas la suite : au tour suivant, for lui redonne l’élément suivant. ${cd('for i in range(3): i = 10')} fait quand même ses 3 tours.</p></div>`,
  fig:py(`range(5)          # 0, 1, 2, 3, 4
range(2, 6)       # 2, 3, 4, 5
range(10, 0, -3)  # 10, 7, 4, 1
for lettre in 'abc':
    print(lettre)  # a, puis b, puis c`),
  note:`${cd('range(n)')} fait exactement <i>n</i> tours, de 0 à <i>n</i> − 1.`},
 {kind:'Méthode',h:'Accumulateur et compteur',
  p:`<p>Pour une <b>somme</b> (ou un produit, ou une chaîne construite morceau par morceau), utilise un <b>accumulateur</b> : une variable créée <b>avant</b> la boucle avec la valeur neutre (0 pour une somme, 1 pour un produit, ${cd("''")} pour une chaîne), puis mise à jour à chaque tour.</p><p>Pour <b>compter</b> les éléments qui vérifient une condition, utilise un <b>compteur</b> : il part de 0 et on lui ajoute 1 seulement quand la condition est vraie.</p>`,
  demo:{enonce:'Combien y a-t-il d’entiers de 1 à 15 multiples de 3 ou de 5, et quelle est leur somme&nbsp;?'+py(`s = 0
c = 0
for k in range(1, 16):
    if k % 3 == 0 or k % 5 == 0:
        s = s + k
        c = c + 1
print(c, s)`),
   etapes:[
    {f:'s = 0 et c = 0 avant la boucle.',w:'0 est neutre pour l’addition : la somme vide vaut 0, et on n’a encore rien compté.'},
    {f:'range(1, 16) donne k = 1, 2, …, 15.',w:'La fin 16 est exclue, donc 15 est bien inclus.'},
    {f:'Passent le test : 3, 5, 6, 9, 10, 12, 15.',w:'k % 3 == 0 teste « multiple de 3 ». Avec or, une seule des deux conditions suffit, et 15 n’est compté qu’une fois.'},
    {f:'c = 7 et s = 3 + 5 + 6 + 9 + 10 + 12 + 15 = 60.',w:'Le compteur gagne 1 par élément retenu, l’accumulateur gagne l’élément lui-même.'}],
   conclusion:'Le programme affiche 7 60.'},
  note:'Erreur classique : écrire s = 0 à l’intérieur de la boucle. La somme repart alors de 0 à chaque tour.'},
 {h:'Un produit',p:'Qu’affiche ce programme&nbsp;?',fig:py(`p = 1
for k in range(1, 6):
    if k % 2 == 1:
        p = p * k
print(p)`),lab:'p =',ans:15,
  why:'k vaut 1, 2, 3, 4, 5, et seuls les impairs 1, 3, 5 sont multipliés. Le produit part de 1, valeur neutre : 1 · 1 · 3 · 5 = 15.'},
 {h:'Fabrique la séquence',p:`Règle ${cd('range(a, b, c)')} pour obtenir exactement 3, 7, 11, 15.`,
  params:[{id:'a',l:'a (début)',min:0,max:10,v:0},{id:'b',l:'b (fin)',min:0,max:20,v:10},{id:'c',l:'c (pas)',min:1,max:5,v:1}],
  draw:v=>{ const P=plane({x:[-1,21],y:[-2,1.8],grid:false,axes:false}); P.seg(-0.5,0,20.5,0,{c:'var(--muted)',w:1.5});
    for(let x=0;x<=20;x++) P.seg(x,-0.15,x,0.15,{c:'var(--muted)',w:1}); for(let x=0;x<=20;x+=5) P.text(x,0,String(x),{a:'middle',dy:24,s:11,c:'var(--muted)'});
    [3,7,11,15].forEach(x=>P.circ(x,0,0.55,{c:'var(--ok)',w:2}));
    for(let x=v.a;x<v.b;x+=v.c) P.dot(x,0,{r:6,c:'var(--code)'});
    P.seg(v.b,-0.9,v.b,0.9,{c:'var(--bad)',w:2,dash:true}); P.text(v.b,0.9,'fin',{a:'middle',dy:-4,s:11,c:'var(--bad)'}); return P.svg(); },
  info:v=>{ const r=[]; for(let x=v.a;x<v.b;x+=v.c) r.push(x); return `${cd(`list(range(${v.a}, ${v.b}, ${v.c}))`)} = ${esc(pyv(r))}`; },
  ok:v=>{ const r=[]; for(let x=v.a;x<v.b;x+=v.c) r.push(x); return r.join()==='3,7,11,15'; },
  why:'Début 3, pas 4. La fin est exclue : toute valeur de 16 à 19 convient, par exemple range(3, 16, 4). Avec 20, on obtiendrait aussi 19.'},
 {kind:'Méthode',h:'Chercher le maximum',
  p:`<p>Pour le plus grand élément d’une liste, garde <b>le meilleur vu jusqu’ici</b>. Initialise-le avec le <b>premier élément</b> ${cd('L[0]')}, puis compare chaque élément au meilleur : s’il est plus grand, il le remplace. Le minimum se cherche de la même façon avec ${cd('<')}.</p><p>N’initialise pas avec 0 : si tous les nombres sont négatifs, 0 resterait le « maximum » alors qu’il n’est pas dans la liste.</p>`,
  demo:{enonce:'Que vaut <i>m</i> à la fin&nbsp;?'+py(`L = [-4, -9, -2, -7]
m = L[0]
for x in L:
    if x > m:
        m = x`),
   etapes:[
    {f:'m = −4.',w:'Le premier élément est un candidat honnête : il est dans la liste.'},
    {f:'x = −4 : −4 &gt; −4 est faux. x = −9 : faux.',w:'On ne remplace que par un élément strictement plus grand.'},
    {f:'x = −2 : −2 &gt; −4 est vrai, m = −2.',w:'Nouveau meilleur.'},
    {f:'x = −7 : −7 &gt; −2 est faux.',w:'Le meilleur ne change plus.'}],
   conclusion:'m = −2. Avec m = 0 au départ, on aurait obtenu 0, faux.'},
  note:`Avec ${cd('x > m')}, en cas d’égalité, le <b>premier</b> ex æquo reste le meilleur. Avec ${cd('x >= m')}, c’est le <b>dernier</b> qui gagne.`},
 {h:'Maximum et égalité',p:'Qu’affiche ce programme&nbsp;?',fig:py(`L = [3, 8, -1, 8, 5]
m = L[0]
k = 0
for x in L:
    if x > m:
        m = x
        k = k + 1
print(m + k)`),lab:'affichage :',ans:9,
  why:'m change une seule fois, quand x = 8 (k = 1). Le second 8 ne passe pas le test 8 &gt; 8. On affiche 8 + 1 = 9.'},
 {kind:'Méthode',h:'Drapeau et sortie anticipée',
  p:`<p>Pour savoir si <b>au moins un</b> élément vérifie une condition, utilise un <b>drapeau</b> : une variable booléenne mise à ${cd('False')} avant la boucle et passée à ${cd('True')} dès qu’on trouve. ${cd('break')} arrête alors la boucle, car la réponse est connue.</p><p>Dans une fonction, ${cd('return')} placé dans la boucle fait les deux d’un coup : il sort de la boucle <b>et</b> de la fonction. Le ${cd('return')} placé après la boucle n’est atteint que si aucun tour n’a trouvé. Pour « <b>tous</b> les éléments vérifient… », on cherche un contre-exemple de la même façon.</p>`,
  demo:{enonce:'La liste [4, 7, −2, 5] contient-elle un nombre négatif&nbsp;? Combien de tests x &lt; 0 sont faits&nbsp;?'+py(`def a_un_negatif(L):
    for x in L:
        if x < 0:
            return True
    return False

trouve = False             # même idée avec un drapeau
for x in [4, 7, -2, 5]:
    if x < 0:
        trouve = True
        break`),
   etapes:[
    {f:'x = 4 puis x = 7 : test faux, on continue.',w:'Un élément qui ne convient pas ne permet pas encore de conclure.'},
    {f:'x = −2 : test vrai. La fonction renvoie True, et le drapeau passe à True avant le break.',w:'Un seul exemple suffit pour « au moins un » : inutile de regarder la suite.'},
    {f:'x = 5 n’est jamais testé.',w:'return et break ont arrêté la boucle.'}],
   conclusion:'La réponse est True, après 3 tests seulement. Pour une liste sans négatif, les 4 tests seraient faits, puis return False.'},
  note:`Piège : écrire ${cd('else: return False')} dans la boucle. La fonction décide alors dès le premier élément, sans regarder les autres.`},
 {h:'Tous pairs&nbsp;?',p:'Qu’affiche ce programme&nbsp;?',fig:py(`def tous_pairs(L):
    for x in L:
        if x % 2 == 1:
            return False
    return True

print(tous_pairs([2, 4, 7, 8]), tous_pairs([]))`),
  opts:[cd('False False'),cd('True True'),cd('False True'),cd('True False')],ans:2,
  why:'Dans [2, 4, 7, 8], 7 est un contre-exemple : False. Pour la liste vide, la boucle ne tourne pas et on atteint return True : aucun élément ne contredit « tous pairs ».'},
 {kind:'Théorie',h:'Sortir d’une boucle ou sauter un tour',p:`<p>Tu cherches le plus petit diviseur de 91. Dès que tu l’as trouvé, continuer la boucle ne sert à rien. Et parfois, certains tours ne t’intéressent pas du tout.</p>
<div class="def"><p>${cd('break')} arrête <b>immédiatement</b> la boucle qui le contient : le programme reprend à la première ligne après la boucle. ${cd('continue')} abandonne le reste du tour en cours et passe au tour suivant : élément suivant pour un for, nouveau test pour un while.</p></div>
<div class="idea"><p>${cd('break')} est une porte de sortie, ${cd('continue')} un « passe ton tour ». On les place presque toujours dans un ${cd('if')}. Dans deux boucles imbriquées, ${cd('break')} ne quitte que la boucle <b>intérieure</b>. Après un break, la variable de boucle garde la valeur qu’elle avait.</p></div>
${exe(`for d in range(2, 100):
    if 91 % d == 0:
        break
print(d)
for k in range(6):
    if k % 2 == 0:
        continue
    print(k, end=' ')`,`7
1 3 5`,`<p>La première boucle s’arrête à d = 7, car 91 = 7 · 13. Dans la seconde, les k pairs sautent le print.</p>`)}
<div class="warn"><p>Dans un while, un ${cd('continue')} placé avant la mise à jour du compteur saute cette mise à jour : la condition ne change plus et la boucle devient infinie.</p></div>`},
 {h:'break et continue',p:'Qu’affiche ce code&nbsp;?',fig:py(`for i in range(10):
    if i % 3 == 0:
        continue
    if i > 7:
        break
    print(i, end=' ')`),
  opts:[cd('1 2 4 5 7 8'),cd('1 2 4 5 7'),cd('0 1 2 4 5 7'),cd('1 2')],ans:1,
  why:'Les multiples de 3 (0, 3, 6) sont sautés par continue. On affiche 1, 2, 4, 5, 7. À i = 8, la condition i > 7 déclenche break avant le print.'},
 {h:'Boucles imbriquées',p:`<p>Pour parcourir toutes les cases d’un tableau, ou tous les couples (<i>i</i>, <i>j</i>), une seule boucle ne suffit pas : il en faut une dans l’autre.</p>
<div class="def"><p>Deux boucles sont <b>imbriquées</b> quand la boucle intérieure est dans le bloc de la boucle extérieure. Pour <b>chaque</b> tour de la boucle extérieure, la boucle intérieure fait <b>tous</b> ses tours. Le nombre total de tours intérieurs est la somme, sur les valeurs de <i>i</i>, des longueurs des boucles intérieures.</p></div>
<div class="idea"><p>Pense à un compteur kilométrique : le chiffre de droite fait un tour complet avant que celui de gauche avance d’un cran. Si la boucle intérieure dépend de <i>i</i>, comme ${cd('range(i, 3)')} sur la figure, ses lignes ont des longueurs différentes : on compte ligne par ligne.</p></div>
${exe(`for i in range(1, 3):
    for j in range(1, 4):
        print(i * j, end=' ')
    print()`,`1 2 3
2 4 6`,`<p>Le ${cd('print()')} vide est dans la boucle extérieure, hors de l’intérieure : il passe à la ligne une fois par valeur de <i>i</i>. 2 × 3 = 6 tours intérieurs.</p>`)}
<div class="warn"><p>Donne des noms différents aux deux variables de boucle. Si les deux s’appellent <i>i</i>, la boucle intérieure écrase la valeur de l’extérieure.</p></div>`,
  fig:py(`for i in range(3):
    for j in range(i, 3):
        print(i, j)
# 3 + 2 + 1 = 6 tours`)+(()=>{ const P=plane({x:[-1,4],y:[-1,4],w:200,grid:false,axes:false});
    for(let i=0;i<3;i++) for(let j=0;j<3;j++) P.dot(j,2-i,{r:8,c:j>=i?'var(--code)':'var(--line)'});
    [0,1,2].forEach(k=>{ P.text(k,3,'j='+k,{a:'middle',s:11,c:'var(--muted)'}); P.text(-0.4,2-k,'i='+k,{a:'end',dy:4,s:11,c:'var(--muted)'}); }); return P.svg(); })(),
  note:'Deux boucles de n tours chacune, sans dépendance, font n·n tours au total.'},
 {kind:'Méthode',h:'Dérouler deux boucles imbriquées',
  p:'Écris <b>une ligne par valeur de la boucle extérieure</b>, et sur cette ligne toutes les valeurs que prend la boucle intérieure. Le nombre total de tours est la somme des longueurs des lignes. Pour une somme, additionne d’abord chaque ligne, puis les lignes entre elles.',
  demo:{enonce:'Que valent <i>c</i> et le nombre de tours de la boucle intérieure&nbsp;?'+py(`c = 0
for i in range(4):
    for j in range(i + 1, 4):
        c = c + i + j`),
   etapes:[
    {f:'i = 0 : j = 1, 2, 3. On ajoute 1 + 2 + 3 = 6.',w:'range(i + 1, 4) dépend de i : on le recalcule pour chaque ligne.'},
    {f:'i = 1 : j = 2, 3. On ajoute 3 + 4 = 7.',w:'Chaque terme vaut i + j.'},
    {f:'i = 2 : j = 3. On ajoute 5.',w:'La ligne raccourcit d’un élément à chaque fois.'},
    {f:'i = 3 : range(4, 4) est vide, rien.',w:'Une ligne vide compte pour 0 tour.'},
    {f:'Tours : 3 + 2 + 1 + 0 = 6. c = 6 + 7 + 5 = 18.',w:'On additionne les lignes.'}],
   conclusion:'La boucle intérieure fait 6 tours et c vaut 18.'}},
 {kind:'Défi',h:'Somme imbriquée',p:'Qu’affiche ce code&nbsp;?',fig:py(`s = 0
for i in range(1, 4):
    for j in range(i):
        s += i * j
print(s)`),lab:'s =',ans:11,
  why:'i = 1 : j = 0, on ajoute 0. i = 2 : j = 0, 1, on ajoute 0 + 2. i = 3 : j = 0, 1, 2, on ajoute 0 + 3 + 6. Total : 2 + 9 = 11.'},
 {kind:'Méthode',h:'Déboguer une boucle',
  p:`<p>Quand un programme donne un mauvais résultat, ne devine pas : <b>regarde</b>. Ajoute un ${cd('print')} dans la boucle pour afficher les variables à chaque tour, et compare avec ce que tu attendais.</p><p>Vérifie surtout le <b>premier</b> et le <b>dernier</b> tour. La plupart des erreurs de boucle sont des <b>erreurs d’une unité</b> : un range qui s’arrête un cran trop tôt, ${cd('<')} au lieu de ${cd('<=')}, un départ à 0 au lieu de 1.</p>`,
  demo:{enonce:'Ce programme doit calculer 1 + 2 + 3 + 4 + 5 = 15, mais il affiche 10. Trouver l’erreur.'+py(`s = 0
for k in range(5):
    s = s + k
    print('k =', k, 's =', s)   # ligne ajoutée pour voir
print(s)`),
   etapes:[
    {f:'Affichage : k = 0 s = 0, k = 1 s = 1, …, k = 4 s = 10.',w:'Le print montre ce que fait vraiment la boucle, tour par tour.'},
    {f:'Premier tour : k = 0 au lieu de 1. Dernier tour : k = 4, donc 5 n’est jamais ajouté.',w:'On compare les deux bouts avec ce qu’on voulait : de 1 à 5.'},
    {f:`Correction : ${cd('for k in range(1, 6):')}`,w:'range(a, b) va de a inclus à b exclu : pour finir à 5, il faut b = 6.'},
    {f:'Nouvel affichage : s vaut 1, 3, 6, 10, 15.',w:'On relance pour vérifier, puis on retire le print de débogage.'}],
   conclusion:'L’erreur était sur les deux bornes du range. Le programme corrigé affiche 15.'}},
 {h:'Les bonnes bornes',p:`On veut compter les entiers de 10 à 20 <b>inclus</b> qui sont multiples de 4 (il y en a 3 : 12, 16, 20). Le corps de la boucle est ${cd('if k % 4 == 0: c = c + 1')}. Quelle boucle convient&nbsp;?`,
  opts:[cd('for k in range(10, 20):'),cd('for k in range(10, 21):'),cd('for k in range(0, 20, 4):'),cd('for k in range(12, 20, 4):')],ans:1,
  why:'Il faut que k prenne toutes les valeurs de 10 à 20, donc range(10, 21). range(10, 20) et range(12, 20, 4) s’arrêtent avant 20 et comptent 2. range(0, 20, 4) compte 0, 4, 8, 12, 16 : 5.'},
 {kind:'Méthode',h:'Tester sur des cas limites',
  p:`<p>Une fonction peut marcher sur ton exemple et échouer ailleurs. Avant de la déclarer juste, essaie les <b>cas limites</b> : liste vide ou à un seul élément, nombres négatifs ou nuls, égalité exacte dans une condition, réponse tout au début ou tout à la fin.</p><p>${cd('assert condition')} ne fait rien si la condition est vraie, et arrête le programme avec ${cd('AssertionError')} sinon. C’est un test automatique qu’on relance après chaque modification.</p>`,
  demo:{enonce:'Cette fonction doit renvoyer le plus grand élément d’une liste non vide. La tester.'+py(`def maxi(L):
    m = 0
    for x in L:
        if x > m:
            m = x
    return m

assert maxi([3, 8, 2]) == 8
assert maxi([5]) == 5
assert maxi([-3, -1]) == -1`),
   etapes:[
    {f:'maxi([3, 8, 2]) renvoie 8 : le test passe.',w:'Le cas « normal » ne suffit jamais à conclure.'},
    {f:'maxi([5]) renvoie 5 : le test passe.',w:'Liste à un seul élément : le plus petit cas permis.'},
    {f:'maxi([-3, -1]) renvoie 0 : AssertionError.',w:'Tous négatifs : aucun x ne dépasse 0, et m garde une valeur absente de la liste.'},
    {f:`Correction : ${cd('m = L[0]')}, puis on relance les trois tests.`,w:'On part d’un vrai élément de la liste, comme dans la méthode du maximum. Les trois tests passent.'}],
   conclusion:'Le troisième test a révélé l’erreur. La liste vide reste interdite : L[0] lèverait IndexError, c’est pourquoi l’énoncé dit « non vide ».'}},
 {h:'Quel test révèle l’erreur&nbsp;?',p:`Cette fonction doit compter les éléments de <i>L</i> compris entre <i>a</i> et <i>b</i>, <b>bornes incluses</b>. Quel test échoue&nbsp;?`+py(`def compte_entre(L, a, b):
    c = 0
    for x in L:
        if a < x < b:
            c = c + 1
    return c`),
  opts:[cd('assert compte_entre([2, 5, 7], 1, 9) == 3'),cd('assert compte_entre([], 0, 10) == 0'),cd('assert compte_entre([4, 6], 4, 6) == 2'),cd('assert compte_entre([1, 20], 5, 10) == 0')],ans:2,
  why:'Le cas limite est l’égalité avec une borne : 4 &lt; 4 et 6 &lt; 6 sont faux, donc la fonction renvoie 0 au lieu de 2. Il faut écrire a &lt;= x &lt;= b. Les trois autres tests passent et ne voient rien.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Choisir et répéter : avec ces outils, un programme ne suit plus seulement ses lignes de haut en bas.</p>
<div class="keep"><ul><li>${cd('if / elif / else')} : la première condition vraie gagne, les autres sont sautées. Les blocs sont définis par l’indentation.</li><li>${cd('and')}, ${cd('or')}, ${cd('not')} ; évaluation de gauche à droite qui s’arrête dès que la réponse est connue ; ${cd('x == 1 or x == 2')}, jamais ${cd('x == 1 or 2')}.</li><li>${cd('while c:')} teste au début de chaque tour ; <i>n</i> tours = <i>n</i> tests vrais + 1 test faux.</li><li>${cd('for x in seq:')} ; ${cd('range(a, b, p)')} va de <i>a</i> inclus à <i>b</i> exclu, et range(a, b) a b − a éléments.</li><li>${cd('break')} sort de la boucle intérieure, ${cd('continue')} saute au tour suivant.</li><li>Boucles imbriquées : l’intérieure fait tous ses tours pour chaque tour de l’extérieure.</li><li>Motifs : accumulateur (valeur neutre avant la boucle), compteur, maximum initialisé avec L[0], drapeau ou return dans la boucle pour « au moins un », contre-exemple pour « tous ».</li><li>Méthodes : tableau des tours, déroulé ligne par ligne des boucles imbriquées, print de débogage, cas limites testés avec ${cd('assert')}.</li></ul></div>`},
 {kind:'Problème',h:'Quand la somme dépasse 100',p:`On additionne les carrés 1², 2², 3²… tant que la somme ne dépasse pas 100. Il faut trouver la valeur qui fait sortir de la boucle, puis voir ce que change une petite modification de la condition.`+py(`n = 0
s = 0
while s <= 100:
    n += 1
    s += n * n
print(n, s)`),
  parts:[
   {q:'a) Quelle valeur de <i>n</i> est affichée&nbsp;?',lab:'n =',ans:7,hint:'Écris les sommes successives : 1, 5, 14, 30… et arrête-toi à la première qui dépasse 100.',why:'s prend les valeurs 1, 5, 14, 30, 55, 91, 140. La première somme qui dépasse 100 est atteinte pour n = 7.'},
   {q:'b) Quelle valeur de <i>s</i> est affichée&nbsp;?',lab:'s =',ans:140,hint:'La condition est testée au début de chaque tour, après l’ajout de n².',why:'Après le tour n = 6, s = 91 ≤ 100 : on refait un tour. n = 7 et s = 91 + 49 = 140 &gt; 100 : on sort.'},
   {q:'c) Combien de fois la condition ' + cd('s <= 100') + ' est-elle évaluée en tout&nbsp;?',lab:'évaluations =',ans:8,hint:'Elle est vraie une fois par tour, puis fausse une dernière fois.',why:'7 tours, donc 7 évaluations vraies, plus 1 évaluation fausse qui fait sortir : 8.'},
   {q:'d) On remplace la condition par ' + cd('s < 91') + '. Quelle valeur de <i>n</i> est alors affichée&nbsp;?',lab:'n =',ans:6,hint:'Que se passe-t-il quand s vaut exactement 91&nbsp;?',why:'Après le tour n = 6, s = 91. La condition 91 &lt; 91 est fausse, donc on sort avec n = 6 et s = 91.'},
  ],
  sol:`<p>Les sommes successives sont 1, 5, 14, 30, 55, 91, 140, pour n = 1 à 7. La boucle continue tant que s ≤ 100.</p><p>Après n = 6, s = 91 ≤ 100 : un tour de plus. n = 7, s = 140 : la condition devient fausse et on affiche 7 140. La condition a été évaluée 8 fois (7 fois vraie, 1 fois fausse).</p><p>Avec s &lt; 91, la boucle s’arrête dès que s atteint 91, c’est-à-dire pour n = 6. Entre ≤ et &lt;, le cas d’égalité décide du nombre de tours : c’est une source classique d’erreur d’une unité.</p>`},
 {kind:'Problème',h:'Un test de primalité presque juste',p:`Un entier <i>n</i> ≥ 2 est premier s’il n’a aucun diviseur entre 2 et <i>n</i> − 1. Il suffit de tester les diviseurs <i>d</i> tels que <i>d</i>² ≤ <i>n</i> : si <i>n</i> = <i>d</i>·<i>e</i> avec 2 ≤ <i>d</i> ≤ <i>e</i>, alors <i>d</i>² ≤ <i>n</i>. Le programme compte les nombres premiers de 1 à 49.`+py(`def est_premier(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True

compte = 0
for k in range(1, 50):
    if est_premier(k):
        compte += 1
print(compte)`),
  parts:[
   {q:'a) Quelle valeur de <i>compte</i> est affichée&nbsp;?',lab:'compte =',ans:15,hint:'Liste les nombres premiers inférieurs à 50 : 2, 3, 5, 7, 11…',why:'2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 : il y en a 15.'},
   {q:'b) Pour l’appel ' + cd('est_premier(97)') + ', combien de fois le test ' + cd('n % d == 0') + ' est-il évalué&nbsp;?',lab:'tests =',ans:8,hint:'97 est premier, donc on ne sort jamais par return False. Jusqu’à quel d a-t-on d² ≤ 97&nbsp;?',why:'9² = 81 ≤ 97 et 10² = 100 &gt; 97. On teste d = 2, 3, …, 9 : 8 tests, puis on renvoie True.'},
   {q:'c) Un élève écrit ' + cd('while d * d < n:') + ' à la ligne 5. Quel est le plus petit entier <i>n</i> ≥ 2 alors déclaré premier à tort&nbsp;?',lab:'n =',ans:4,hint:'Cherche un nombre dont le seul petit diviseur d vérifie exactement d² = n.',why:'Pour n = 4, le premier test est 2 · 2 &lt; 4, faux : la boucle ne tourne pas et la fonction renvoie True. 2 et 3 restent bien premiers.'},
   {q:'d) Avec cette version fautive, quelle valeur de <i>compte</i> est affichée&nbsp;?',lab:'compte =',ans:19,hint:'Quels nombres non premiers ont pour seul diviseur testable d avec d² = n&nbsp;? Ce sont les carrés de nombres premiers.',why:'La version fautive ne teste jamais d = √n. Elle se trompe sur les carrés de nombres premiers : 4, 9, 25 et 49. Les autres composés ont un diviseur d avec d² &lt; n. Le compte passe de 15 à 19.'},
  ],
  sol:`<p>La boucle while teste d = 2, 3, … tant que d² ≤ n et sort par return False au premier diviseur trouvé. Pour un premier comme 97, elle va jusqu’à d = 9 (81 ≤ 97 &lt; 100) : 8 tests.</p><p>De 1 à 49, on trouve 15 nombres premiers.</p><p>Avec d * d &lt; n, le diviseur d = √n n’est jamais testé. Un composé n = d·e avec d &lt; e a un diviseur d tel que d² &lt; n : il est toujours détecté. Seuls les carrés p² de nombres premiers échappent au test, car leur unique diviseur propre p vérifie p² = n. Sous 50 : 4, 9, 25, 49.</p><p>La version fautive affiche donc 15 + 4 = 19. Le plus petit faux positif est 4.</p>`},
]},

/* ===================== 5. CHAÎNES ET LISTES ===================== */
{subj:'ics',sem:'py',id:'ics-listes',h:'Chaînes et listes',p:'Accéder par indice, découper en tranches, utiliser les méthodes courantes, parcourir et modifier une liste.',steps:[
 {h:'Indices',p:`<p>Une chaîne ou une liste est une suite d’éléments rangés dans un ordre. Pour lire « la troisième lettre » ou « le dernier élément », il faut une façon de désigner une position.</p>
<div class="def"><p>Une séquence <i>s</i> de longueur <i>n</i> = ${cd('len(s)')} a des <b>indices</b> de 0 à <i>n</i> − 1, et ${cd('s[i]')} est son élément d’indice <i>i</i>. Les <b>indices négatifs</b> comptent depuis la fin : ${cd('s[-k]')} désigne ${cd('s[n - k]')}, donc ${cd('s[-1]')} est le dernier élément.</p></div>
<div class="idea"><p>L’indice dit combien d’éléments on saute depuis le début : ${cd('s[0]')} n’en saute aucun, d’où le départ à 0. Sur la figure, chaque case porte ses deux indices : le positif en haut, le négatif en bas. Ils désignent la même case.</p></div>
${exe(`s = 'PYTHON'
L = [10, 20, 30]
print(s[0], s[5], s[-1], s[-6])
print(L[1] + L[-1], len(s))`,`P N N P
50 6`)}
<div class="warn"><p>Lire, oui ; écrire, pas toujours. ${cd('L[0] = 7')} est permis car une liste est mutable, mais ${cd("s[0] = 'J'")} lève TypeError : une chaîne est immuable.</p></div>`,
  fig:(()=>{ const s='PYTHON', P=plane({x:[0,7],y:[0,2.6],grid:false,axes:false}); const c=cells(P,0.5,1.3,s.split(''),'var(--code)',1);
    c.forEach((p,i)=>{ P.text(p[0],2.2,String(i),{a:'middle',s:12,c:'var(--accent)'}); P.text(p[0],0.4,String(i-6).replace('-','−'),{a:'middle',s:12,c:'var(--spark)'}); }); return P.svg(); })(),
  note:`${cd('s[6]')} sur 'PYTHON' lève IndexError : le dernier indice valide est 5.`},
 {h:'Les tranches',p:`<p>Extraire un morceau, comme les trois premières lettres ou la fin d’un mot, sans écrire de boucle : c’est le rôle des tranches.</p>
<div class="def"><p>${cd('s[a:b:c]')} est la <b>tranche</b> formée des éléments d’indices <i>a</i>, <i>a</i> + <i>c</i>, <i>a</i> + 2<i>c</i>… strictement avant <i>b</i>. Valeurs par défaut : <i>a</i> = début, <i>b</i> = fin, <i>c</i> = 1. Le résultat est une <b>nouvelle</b> chaîne ou une nouvelle liste.</p></div>
<div class="idea"><p>Imagine les indices <i>a</i> et <i>b</i> posés sur les bords gauches des cases, comme les traits vert et rouge de la figure. ${cd('s[a:b]')} prend ce qui est entre les deux traits, soit <i>b</i> − <i>a</i> éléments. Ainsi ${cd('s[:k]')} et ${cd('s[k:]')} se recollent exactement en <i>s</i>.</p></div>
${exe(`s = 'PROGRAMME'
print(s[1:5], s[:3], s[5:])
print(s[::2], s[::-1], len(s[4:2]))`,`ROGR PRO AMME
PORME EMMARGORP 0`,`<p>s[4:2] est vide, car 4 ≥ 2 avec un pas positif. Avec un pas de −1, on part de la fin et on avance vers la gauche.</p>`)}
<div class="warn"><p>Sur une liste, une tranche est une <b>copie superficielle</b> : après ${cd('M = L[1:3]')}, ${cd('M[0] = 9')} ne modifie pas L. Règle les curseurs pour voir chaque tranche.</p></div>`,
  params:[{id:'a',l:'a',min:0,max:9,v:1},{id:'b',l:'b',min:0,max:9,v:5},{id:'c',l:'c',min:1,max:3,v:1}],
  draw:v=>{ const s='PROGRAMME', P=plane({x:[0,10],y:[0,2.8],grid:false,axes:false}); const sel=new Set(); for(let i=v.a;i<v.b;i+=v.c) sel.add(i);
    s.split('').forEach((ch,i)=>{ P.rect(0.5+i,0.9,1,0.8,{fill:sel.has(i)?'var(--spark)':'var(--surface)',fo:sel.has(i)?.5:1,c:'var(--code)',w:2}); P.text(1+i,1.3,ch,{a:'middle',dy:5,s:14}); P.text(1+i,2.15,String(i),{a:'middle',s:11,c:'var(--muted)'}); });
    P.seg(0.5+v.a,0.6,0.5+v.a,2,{c:'var(--ok)',w:3}); P.seg(0.5+v.b,0.6,0.5+v.b,2,{c:'var(--bad)',w:3,dash:true});
    P.text(0.5+v.a,0.6,'a',{a:'middle',dy:14,s:12,c:'var(--ok)'}); P.text(0.5+v.b,0.6,'b',{a:'middle',dy:14,s:12,c:'var(--bad)'}); return P.svg(); },
  info:v=>{ let r=''; for(let i=v.a;i<v.b;i+=v.c) r+='PROGRAMME'[i]; return `${cd(`s[${v.a}:${v.b}:${v.c}]`)} = ${cd(`'${r}'`)}`+(r?'':' (tranche vide)'); },
  note:'Une tranche ne lève jamais d’erreur : si a ≥ b, elle est simplement vide. Et len(s[a:b]) = b − a quand 0 ≤ a ≤ b ≤ len(s).'},
 {kind:'Méthode',h:'Calculer une tranche',
  p:`<p>Pour lire ${cd('s[a:b:c]')} sans te tromper, écris les indices sous chaque caractère. Un indice négatif −<i>k</i> se remplace par len(s) − <i>k</i>. Puis pars de <i>a</i>, avance de <i>c</i> en <i>c</i>, et arrête-toi <b>avant</b> <i>b</i>.</p><p>Bornes omises : ${cd('s[:b]')} part du début, ${cd('s[a:]')} va jusqu’au bout. Avec un pas négatif, on avance vers la gauche : ${cd('s[::-1]')} renverse.</p>`,
  demo:{enonce:`Avec ${cd("s = 'ordinateur'")}, calculer ${cd('s[2:5]')}, ${cd('s[-4:]')} et ${cd('s[::2]')}.`,
   etapes:[
    {f:tab(['o','r','d','i','n','a','t','e','u','r'],[[0,1,2,3,4,5,6,7,8,9]]),w:'On numérote de 0 à len(s) − 1 = 9.'},
    {f:`${cd('s[2:5]')} : indices 2, 3, 4, soit 'din'.`,w:'5 est exclu : on prend 5 − 2 = 3 caractères.'},
    {f:`${cd('s[-4:]')} = ${cd('s[6:]')} : indices 6 à 9, soit 'teur'.`,w:'−4 vaut 10 − 4 = 6. Sans fin, on va jusqu’au dernier caractère.'},
    {f:`${cd('s[::2]')} : indices 0, 2, 4, 6, 8, soit 'odntu'.`,w:'Sans début ni fin, on parcourt tout, de 2 en 2.'}],
   conclusion:'On obtient \'din\', \'teur\' et \'odntu\'. Et s[::-1] vaut \'ruetanidro\'.'}},
 {h:'La fin du mot',p:`Avec ${cd("s = 'ingenieur'")}, que vaut ${cd('s[-3:]')}&nbsp;?`,
  opts:[cd("'ieur'"),cd("'r'"),cd("'eur'"),cd("'nie'")],ans:2,
  why:`${cd('s[-3:]')} part de l’indice −3 (le e de « eur ») et va jusqu’à la fin : 'eur'. Les trois derniers caractères.`},
 {h:'Méthodes des chaînes',p:`<p>Nettoyer un texte, le couper en mots, compter une lettre : ces opérations reviennent sans cesse, et Python les fournit toutes faites.</p>
<div class="def"><p>Une <b>méthode</b> est une fonction attachée à un objet, appelée avec un point : ${cd('s.upper()')}. Pour une chaîne : ${cd('strip')} retire les espaces aux bouts, ${cd('split(sep)')} découpe en <b>liste</b> de morceaux (aux espaces si on ne donne pas de séparateur), ${cd('sep.join(L)')} recolle une liste de chaînes avec <i>sep</i> entre deux, ${cd('replace')}, ${cd('find')} (indice, ou −1 si absent), ${cd('count')}, ${cd('upper')}, ${cd('lower')}.</p></div>
<div class="idea"><p>Une chaîne est immuable : aucune méthode ne la modifie. Chacune <b>renvoie</b> un résultat neuf (une chaîne, une liste ou un nombre), qu’il faut ranger dans une variable pour le garder.</p></div>
${exe(`s = ' a-b-c '
t = s.strip()
mots = t.split('-')
print(mots, '+'.join(mots))
print(len(s), len(t), 'banane'.find('z'), 'banane'.count('a'))`,`['a', 'b', 'c'] a+b+c
7 5 -1 2`,`<p>s n’a pas changé : il a toujours 7 caractères, espaces compris.</p>`)}
<div class="warn"><p>${cd('join')} ne prend que des chaînes : ${cd("'-'.join([1, 2])")} lève TypeError. Convertis d’abord chaque nombre avec str.</p></div>`,
  fig:py(`s = '  Bonjour le monde  '
s.strip()                # 'Bonjour le monde'
s.split()                # ['Bonjour', 'le', 'monde']
'-'.join(['a', 'b'])     # 'a-b'
'banane'.replace('a', 'o')   # 'bonone'
'banane'.find('n')       # 2 : premier indice trouvé
'nan' in 'banane'        # True
'Abc'.upper()            # 'ABC'
'Abc'.lower()            # 'abc'
'A'.isupper()            # True : est-ce une majuscule ?
'banane'.count('an')     # 2 : nombre d'apparitions`),
  note:`${cd('s.upper()')} seul ne sert à rien : il faut récupérer le résultat, par exemple ${cd('s = s.upper()')}.`},
 {h:'Enchaîner les méthodes',p:'Qu’affiche ce code&nbsp;?',fig:py(`print('-'.join('a b c'.split()).upper())`),
  opts:[cd('a-b-c'),cd('A-B-C'),cd('A B C'),cd("['A', 'B', 'C']")],ans:1,
  why:`'a b c'.split() donne ['a', 'b', 'c']. join les recolle avec '-' : 'a-b-c'. upper met en majuscules : A-B-C.`},
 {h:'Modifier une liste',p:`<p>Une liste de courses grandit, rétrécit et change. Contrairement à une chaîne, une liste se modifie <b>sur place</b>.</p>
<div class="def"><p>${cd('L[i] = x')} remplace l’élément d’indice <i>i</i>. ${cd('L.append(x)')} ajoute <i>x</i> à la fin. ${cd('L.insert(i, x)')} insère <i>x</i> à l’indice <i>i</i> et décale la suite vers la droite. ${cd('L.pop()')} retire le dernier élément et le <b>renvoie</b> ; ${cd('L.pop(i)')} fait de même pour l’indice <i>i</i>. ${cd('L.remove(x)')} retire la <b>première</b> occurrence de <i>x</i>.</p></div>
<div class="idea"><p>Ces méthodes changent l’objet lui-même : tous les noms qui le référencent voient le changement. Elles renvoient ${cd('None')}, sauf pop, qui renvoie l’élément retiré. Après un insert ou un remove, les indices des éléments suivants changent.</p></div>
${exe(`L = [4, 2, 4]
r = L.append(1)
L.remove(4)
x = L.pop(0)
print(L, x, r)`,`[4, 1] 2 None`,`<p>remove(4) retire seulement le premier 4 : [2, 4, 1]. pop(0) retire et renvoie 2.</p>`)}
<div class="warn"><p>${cd('L = L.append(1)')} range None dans L : la liste est perdue. Une méthode qui modifie s’appelle seule sur sa ligne.</p></div>`,
  fig:py(`L = [5, 3, 8]
L.append(1)       # [5, 3, 8, 1]
L.insert(0, 7)    # [7, 5, 3, 8, 1]
x = L.pop()       # x = 1, L = [7, 5, 3, 8]
L.remove(3)       # [7, 5, 8]
for i, v in enumerate(L):
    print(i, v)   # 0 7, puis 1 5, puis 2 8`),
  note:`Retirer un élément absent, comme ${cd('L.remove(7)')} quand 7 n’est pas dans L, lève ValueError. Teste d’abord avec ${cd('7 in L')}.`},
 {kind:'Théorie',h:'Trier : sort ou sorted',p:`<p>Ranger des notes dans l’ordre, des noms par ordre alphabétique : Python sait trier, de deux façons qui ne font pas la même chose.</p>
<div class="def"><p>${cd('L.sort()')} trie la liste L <b>sur place</b>, dans l’ordre croissant, et renvoie None. ${cd('sorted(seq)')} renvoie une <b>nouvelle</b> liste triée et laisse <i>seq</i> intacte ; elle accepte aussi une chaîne ou un tuple. Avec ${cd('reverse=True')}, l’ordre devient décroissant.</p></div>
<div class="idea"><p>C’est la distinction du chapitre sur les références : modifier l’objet, ou en fabriquer un nouveau. Les chaînes se comparent lettre à lettre, comme dans un dictionnaire, et les majuscules passent avant les minuscules.</p></div>
${exe(`L = [3, 1, 2]
M = sorted(L)
print(L, M)
r = L.sort()
print(L, r, sorted('bca'), sorted(['ours', 'Ane', 'chat']))`,`[3, 1, 2] [1, 2, 3]
[1, 2, 3] None ['a', 'b', 'c'] ['Ane', 'chat', 'ours']`,`<p>sorted d’une chaîne donne la liste de ses lettres triées. 'Ane' passe devant 'chat' parce que A majuscule passe avant toutes les minuscules.</p>`)}
<div class="warn"><p>${cd('L = L.sort()')} met None dans L. Et on ne peut pas trier un mélange de nombres et de chaînes : ${cd("sorted([1, 'a'])")} lève TypeError.</p></div>`},
 {h:'Insère au bon endroit',p:`${cd('L = [1, 3, 8, 9]')}. Choisis <i>k</i> pour que ${cd('L.insert(k, 6)')} laisse la liste triée. Plusieurs <i>k</i> conviennent, y compris un négatif.`,
  params:[{id:'k',l:'k',min:-5,max:5,v:0}],
  draw:v=>{ const L=[1,3,8,9]; let i=v.k<0?v.k+L.length:v.k; i=Math.max(0,Math.min(i,L.length)); L.splice(i,0,6);
    const P=plane({x:[0,6],y:[0,1.6],grid:false,axes:false});
    L.forEach((x,j)=>{ const ins=j===i; P.rect(0.5+j,0.4,1,0.8,{fill:ins?'var(--spark)':'var(--surface)',fo:ins?.5:1,c:'var(--code)',w:2}); P.text(1+j,0.8,String(x),{a:'middle',dy:5,s:14}); });
    return P.svg(); },
  info:v=>{ const L=[1,3,8,9]; let i=v.k<0?v.k+L.length:v.k; i=Math.max(0,Math.min(i,L.length)); L.splice(i,0,6);
    return `${cd(`L.insert(${v.k}, 6)`)} → ${cd(pyv(L))}`; },
  ok:v=>v.k===2||v.k===-2,why:'Le 6 doit aller avant le 8, qui est à l’indice 2. insert(2, 6) convient, et aussi insert(−2, 6), car −2 désigne le même indice 4 − 2 = 2.'},
 {h:'Suis les modifications',p:'Qu’affiche ce code&nbsp;?',fig:py(`L = [3, 1, 4, 1, 5]
L.append(9)
L.remove(1)
x = L.pop()
L[0] = x
print(sum(L))`),lab:'somme =',ans:19,
  why:'append : [3, 1, 4, 1, 5, 9]. remove(1) retire le premier 1 : [3, 4, 1, 5, 9]. pop renvoie 9 : [3, 4, 1, 5]. L[0] = 9 : [9, 4, 1, 5]. Somme : 19.'},
 {kind:'Méthode',h:'Parcourir par valeur, par indice ou avec enumerate',
  p:`<p>Trois façons de parcourir une liste, selon ce dont tu as besoin :</p><ul><li>${cd('for x in L:')} quand seule la <b>valeur</b> compte (somme, test).</li><li>${cd('for i in range(len(L)):')} quand il faut l’<b>indice</b>, par exemple pour modifier ${cd('L[i]')} ou regarder un voisin.</li><li>${cd('for i, x in enumerate(L):')} pour avoir <b>les deux</b> : à chaque tour, i est l’indice et x vaut L[i].</li></ul>`,
  demo:{enonce:'À quel indice se trouve le premier maximum de [4, 9, 2, 9]&nbsp;?'+py(`L = [4, 9, 2, 9]
im = 0
for i, x in enumerate(L):
    if x > L[im]:
        im = i
print(im)`),
   etapes:[
    {f:'On a besoin de la position, pas seulement de la valeur : enumerate.',w:'Avec for x in L, on saurait que le maximum vaut 9, mais pas où il est.'},
    {f:'im = 0 : le meilleur provisoire est L[0] = 4.',w:'On garde l’indice du meilleur, et sa valeur se lit dans L[im].'},
    {f:'i = 0, x = 4 : non. i = 1, x = 9 &gt; 4 : im = 1. i = 2, x = 2 : non.',w:'C’est la méthode du maximum, appliquée aux indices.'},
    {f:'i = 3, x = 9 : 9 &gt; 9 est faux, im reste 1.',w:'Avec &gt;, le premier ex æquo est conservé.'}],
   conclusion:'Le programme affiche 1.'},
  note:`Piège : ${cd('for x in L: x = 2 * x')} ne change pas L, car x est un nom qui reçoit une copie de la valeur. Pour doubler chaque case, écris ${cd('for i in range(len(L)): L[i] = 2 * L[i]')}.`},
 {h:'Indice fois valeur',p:'Qu’affiche ce programme&nbsp;?',fig:py(`L = [5, 3, 4]
s = 0
for i, x in enumerate(L):
    s = s + i * x
print(s)`),lab:'s =',ans:11,
  why:'Les couples (i, x) sont (0, 5), (1, 3) et (2, 4). s = 0 · 5 + 1 · 3 + 2 · 4 = 11.'},
 {kind:'Méthode',h:'Construire une nouvelle liste',
  p:`Pour <b>filtrer</b> (garder certains éléments) ou <b>transformer</b> (changer chaque élément), ne modifie pas la liste que tu parcours. Pars d’une liste vide ${cd('res = []')} et ajoute avec ${cd('append')} ce que tu gardes, transformé si besoin. Pour une chaîne, même idée : pars de ${cd("''")} et colle avec ${cd('+')}.`,
  demo:{enonce:'Garder en majuscules les mots de plus de 3 lettres, et former le mot des initiales.'+py(`mots = ['un', 'arbre', 'est', 'vert']
res = []
ini = ''
for m in mots:
    if len(m) > 3:
        res.append(m.upper())
    ini = ini + m[0]`),
   etapes:[
    {f:'res = [] et ini = \'\' avant la boucle.',w:'Ce sont des accumulateurs : la liste vide et la chaîne vide sont les valeurs neutres.'},
    {f:'\'un\' et \'est\' ont au plus 3 lettres : ils ne vont pas dans res.',w:'Le filtre est la condition du if.'},
    {f:'\'arbre\' et \'vert\' passent : res = [\'ARBRE\', \'VERT\'].',w:'La transformation est l’expression passée à append.'},
    {f:'ini reçoit chaque première lettre : \'u\', \'ua\', \'uae\', \'uaev\'.',w:'Cette ligne est hors du if : elle s’exécute pour chaque mot.'}],
   conclusion:'res = [\'ARBRE\', \'VERT\'] et ini = \'uaev\'. La liste mots n’a pas changé.'}},
 {kind:'Défi',h:'Parcourir et filtrer',p:'Qu’affiche ce code&nbsp;?',fig:py(`mots = ['chat', 'Ours', 'zèbre', 'Ane']
res = []
for m in mots:
    if m[0].isupper():
        res.append(m.lower())
print(sorted(res))`),
  opts:[cd("['Ane', 'Ours']"),cd("['ours', 'ane']"),cd("['ane', 'ours']"),cd('None')],ans:2,
  why:`Seuls 'Ours' et 'Ane' commencent par une majuscule. On ajoute 'ours' puis 'ane'. sorted renvoie une nouvelle liste triée : ['ane', 'ours'].`},
 {kind:'Méthode',h:'Comparer des voisins',
  p:`<p>Pour comparer chaque élément à son <b>suivant</b>, parcours les indices de 0 à len(L) − 2 : ${cd('for i in range(len(L) - 1):')}, puis compare ${cd('L[i]')} et ${cd('L[i + 1]')}. On fait ainsi len(L) − 1 comparaisons.</p><p>Avec ${cd('range(len(L))')}, le dernier tour lirait ${cd('L[len(L)]')}, qui n’existe pas : IndexError. Ce motif sert à tester si une liste est triée, à compter les hausses, à trouver le plus grand écart entre voisins.</p>`,
  demo:{enonce:'La liste [2, 5, 5, 9, 4] est-elle triée dans l’ordre croissant&nbsp;? Combien de comparaisons faut-il&nbsp;?'+py(`def est_triee(L):
    for i in range(len(L) - 1):
        if L[i] > L[i + 1]:
            return False
    return True`),
   etapes:[
    {f:'len(L) − 1 = 4 : i prend les valeurs 0, 1, 2, 3.',w:'Le dernier voisin comparé est L[3] avec L[4], le dernier élément.'},
    {f:'2 &gt; 5 ? non. 5 &gt; 5 ? non. 5 &gt; 9 ? non.',w:'Deux voisins égaux sont dans l’ordre : on teste &gt;, pas ≥.'},
    {f:'9 &gt; 4 ? oui : return False.',w:'Un seul couple mal rangé suffit (méthode du contre-exemple).'}],
   conclusion:'La liste n’est pas triée, et on l’a su après 4 comparaisons.'}},
 {h:'Compter les hausses',p:`Pour ${cd('L = [3, 5, 2, 8, 9, 1]')}, combien d’indices <i>i</i> vérifient ${cd('L[i] < L[i + 1]')}&nbsp;?`,lab:'hausses =',ans:3,
  why:'On compare les 5 couples voisins : 3 &lt; 5 oui, 5 &lt; 2 non, 2 &lt; 8 oui, 8 &lt; 9 oui, 9 &lt; 1 non. Trois hausses.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Chaînes et listes sont deux séquences : mêmes indices, mêmes tranches, mais l’une est immuable et l’autre non.</p>
<div class="keep"><ul><li>Indices de 0 à len(s) − 1 ; ${cd('s[-k]')} = ${cd('s[len(s) - k]')} ; un indice trop grand lève IndexError.</li><li>Tranche ${cd('s[a:b:c]')} : de <i>a</i> inclus à <i>b</i> exclu, de <i>c</i> en <i>c</i> ; b − a éléments ; jamais d’erreur ; ${cd('s[::-1]')} renverse.</li><li>Méthodes de chaîne (strip, split, join, replace, find, count, upper, lower) : elles renvoient un résultat neuf, la chaîne ne change pas.</li><li>Liste mutable : ${cd('L[i] = x')}, append, insert, pop (renvoie l’élément), remove (première occurrence) ; elles renvoient None.</li><li>${cd('L.sort()')} trie sur place et renvoie None ; ${cd('sorted(L)')} renvoie une nouvelle liste.</li><li>Parcours : par valeur (${cd('for x in L')}), par indice (${cd('range(len(L))')}), les deux (${cd('enumerate')}). Réaffecter x ne change pas L.</li><li>Méthodes : écrire les indices sous la chaîne pour une tranche ; construire une nouvelle liste plutôt que modifier celle qu’on parcourt ; ${cd('range(len(L) - 1)')} pour comparer des voisins.</li></ul></div>`},
 {kind:'Problème',h:'Transformer une phrase',p:`Ce programme découpe une phrase en mots. Il met une majuscule aux mots de plus de 3 lettres et renverse les autres, puis recolle le tout. Trace-le mot par mot.`+py(`phrase = 'le chat dort sur le tapis'
mots = phrase.split()
res = []
for m in mots:
    if len(m) > 3:
        res.append(m[0].upper() + m[1:])
    else:
        res.append(m[::-1])
sortie = ' '.join(res)
print(sortie)
print(len(mots), len(sortie), sortie.count('el'))`),
  parts:[
   {q:'a) Que vaut ' + cd('len(mots)') + '&nbsp;?',lab:'len(mots) =',ans:6,hint:'split() sans argument coupe aux espaces.',why:'mots = [\'le\', \'chat\', \'dort\', \'sur\', \'le\', \'tapis\'] : 6 mots.'},
   {q:'b) Qu’affiche ' + cd('print(sortie)') + '&nbsp;?',opts:[cd('el Chat Dort sur el Tapis'),cd('El Chat Dort Rus El Tapis'),cd('el Chat Dort rus el Tapis'),cd('le tahc trod rus le sipat')],ans:2,hint:'« sur » a exactement 3 lettres : quelle branche prend-il&nbsp;?',why:'chat, dort et tapis ont plus de 3 lettres : majuscule initiale. le et sur en ont au plus 3 : renversés en el et rus.'},
   {q:'c) Que vaut ' + cd('len(sortie)') + '&nbsp;?',lab:'len(sortie) =',ans:25,hint:'Aucune transformation ne change la longueur d’un mot. Compte les lettres, puis les espaces ajoutés par join.',why:'Les mots ont 2 + 4 + 4 + 3 + 2 + 5 = 20 lettres. join ajoute un espace entre deux mots voisins, soit 5 espaces : 25.'},
   {q:'d) Que vaut ' + cd("sortie.count('el')") + '&nbsp;?',lab:'compte =',ans:2,hint:'Cherche la suite de lettres « el » dans la sortie, y compris à l’intérieur des mots.',why:'On la trouve dans les deux « el » issus de « le », et nulle part ailleurs : 2.'},
  ],
  sol:`<p>split() donne 6 mots. On parcourt : le (2 lettres) → el ; chat → Chat ; dort → Dort ; sur (3 lettres, pas plus de 3) → rus ; le → el ; tapis → Tapis.</p><p>m[0].upper() + m[1:] fabrique une nouvelle chaîne, car une chaîne est immuable. m[::-1] renverse.</p><p>' '.join(res) donne 'el Chat Dort rus el Tapis'. Sa longueur : 20 lettres et 5 espaces, soit 25. La sous-chaîne 'el' apparaît 2 fois.</p><p>La deuxième ligne affichée est donc 6 25 2.</p>`},
 {kind:'Problème',h:'Supprimer pendant qu’on parcourt',p:`On veut retirer tous les nombres pairs d’une liste. Ce programme semble naturel, mais il modifie la liste <b>pendant</b> qu’il la parcourt. La boucle for avance avec un indice caché 0, 1, 2… et s’arrête quand cet indice atteint la longueur <b>actuelle</b> de la liste.`+py(`L = [2, 4, 4, 5, 6, 8]
for x in L:
    if x % 2 == 0:
        L.remove(x)
print(L)`),
  parts:[
   {q:'a) Qu’affiche ce programme&nbsp;?',opts:[cd('[5]'),cd('[4, 5, 8]'),cd('[4, 4, 5, 8]'),cd('[5, 8]')],ans:1,hint:'Au tour d’indice 0, on retire 2 et tout se décale à gauche. Quel élément est à l’indice 1 au tour suivant&nbsp;?',why:'Indice 0 : x = 2, retiré → [4, 4, 5, 6, 8]. Indice 1 : x = 4, on retire le premier 4 → [4, 5, 6, 8]. Indice 2 : x = 6, retiré → [4, 5, 8]. L’indice 3 atteint la longueur : fin. On affiche [4, 5, 8].'},
   {q:'b) Combien de tours fait la boucle for&nbsp;?',lab:'tours =',ans:3,hint:'Reprends la trace de a) et compte les valeurs prises par x.',why:'x prend les valeurs 2, 4 et 6 : 3 tours, alors que la liste de départ a 6 éléments.'},
   {q:'c) Laquelle de ces versions ne donne <b>pas</b> ' + cd('[5]') + '&nbsp;?',opts:[`Parcourir une copie : ${cd('for x in L[:]:')}`,`Parcourir une copie triée : ${cd('for x in sorted(L):')}`,`Parcourir les indices avec ${cd('for i in range(len(L)):')} et faire ${cd('L.pop(i)')} quand ${cd('L[i]')} est pair`,`Parcourir une copie : ${cd('for x in list(L):')}`],ans:2,hint:'range(len(L)) est calculé une seule fois, au début. Que devient L[i] quand la liste raccourcit&nbsp;?',why:'Les trois copies parcourent des valeurs qui ne bougent pas, et remove retire bien chaque pair de L. Avec les indices, la liste se décale comme en a), puis L[3] n’existe plus : IndexError.'},
  ],
  sol:`<p>La boucle for lit L[0], L[1], L[2]… dans la liste <b>actuelle</b>. Chaque remove décale vers la gauche tout ce qui suit, si bien que l’élément suivant est sauté.</p><p>Trace : indice 0, x = 2, L devient [4, 4, 5, 6, 8]. Indice 1, x = 4 : c’est le second 4, car le premier a glissé à l’indice 0 et ne sera jamais lu. remove retire la première occurrence, et L devient [4, 5, 6, 8]. Indice 2, x = 6, L devient [4, 5, 8]. Indice 3 = len(L) : fin après 3 tours. On affiche [4, 5, 8].</p><p>Règle : ne modifie jamais la longueur d’une liste pendant que tu la parcours. Parcours une copie (L[:], list(L), sorted(L)), ou construis une nouvelle liste qui ne garde que les impairs. La version par indices échoue : range(6) a été fixé au départ et L[3] finit par lever IndexError.</p>`},
]},

/* ===================== 6. TUPLES, DICTIONNAIRES, COMPRÉHENSIONS ===================== */
{subj:'ics',sem:'py',id:'ics-dicos',h:'Tuples, dictionnaires et compréhensions',p:'Regrouper avec les tuples, associer clés et valeurs avec les dictionnaires, construire en une ligne avec les compréhensions.',steps:[
 {h:'Tuples et déballage',p:`<p>Un point du plan a deux coordonnées ; une fonction veut parfois renvoyer deux résultats, un minimum et un maximum. Il faut un objet qui regroupe quelques valeurs, sans qu’on puisse le modifier par erreur.</p>
<div class="def"><p>Un <b>tuple</b> est une séquence <b>immuable</b>. Il s’écrit avec des virgules, souvent entre parenthèses : ${cd('t = (3, 4)')} ou ${cd('t = 3, 4')}. Indices, tranches, ${cd('len')} et ${cd('in')} marchent comme pour une liste, mais aucune modification n’est possible. Le <b>déballage</b> ${cd('x, y = t')} affecte les éléments un par un, dans l’ordre, à autant de noms.</p></div>
<div class="idea"><p>${cd('return a, b')} renvoie <b>un seul</b> objet : un tuple à deux éléments, que l’appelant déballe. Dans ${cd('a, b = b, a')}, la droite fabrique d’abord le tuple (b, a) avec les valeurs actuelles, puis le déballe : c’est un échange sans variable intermédiaire.</p></div>
${exe(`t = 3, 4
x, y = t
print(t, t[0] + t[1], type(t))
a, b = 5, 8
a, b = b, a - b
print(a, b)`,`(3, 4) 7 <class 'tuple'>
8 -3`,`<p>a − b est calculé avec les anciennes valeurs 5 et 8 avant toute affectation.</p>`)}
<div class="warn"><p>C’est la virgule qui fait le tuple, pas les parenthèses : ${cd('(5,)')} est un tuple, ${cd('(5)')} est l’entier 5.</p></div>`,
  fig:py(`t = (3, 4)
x, y = t          # x = 3, y = 4
u = (5,)          # tuple à un élément : la virgule compte
v = (5)           # juste l'entier 5

def min_max(L):
    return min(L), max(L)   # renvoie un tuple

lo, hi = min_max([4, 1, 7])   # lo = 1, hi = 7`),
  note:`Le déballage exige le bon nombre de noms : ${cd('a, b = (1, 2, 3)')} lève ValueError.`},
 {h:'Affectation simultanée',p:'Qu’affiche ce code&nbsp;?',fig:py(`a, b = 1, 2
a, b = b, a + b
a, b = b, a + b
print(a, b)`),
  opts:[cd('2 4'),cd('4 8'),cd('5 8'),cd('3 5')],ans:3,
  why:'Toute la partie droite est évaluée avant d’affecter. (1, 2) devient (2, 1 + 2) = (2, 3), puis (3, 2 + 3) = (3, 5). Ce sont les termes de Fibonacci.'},
 {h:'Dictionnaires',p:`<p>Pour retrouver l’âge d’Ana dans une liste de couples (nom, âge), il faut parcourir la liste jusqu’à tomber sur Ana. On voudrait écrire directement « l’âge de Ana ».</p>
<div class="def"><p>Un <b>dictionnaire</b> est un ensemble de couples <b>clé : valeur</b>, écrit ${cd("{'Ana': 19, 'Ben': 20}")}. ${cd('d[k]')} lit la valeur de la clé <i>k</i> ; ${cd('d[k] = v')} ajoute le couple, ou remplace la valeur si <i>k</i> existe déjà ; ${cd('del d[k]')} le retire ; ${cd('k in d')} teste si <i>k</i> est une clé ; ${cd('d.get(k, defaut)')} lit sans risque d’erreur ; ${cd('len(d)')} compte les couples.</p></div>
<div class="idea"><p>Un dictionnaire est une table de correspondance : à chaque clé, une seule valeur. Les clés sont donc uniques, les valeurs peuvent se répéter et être de n’importe quel type (nombres, listes, autres dictionnaires). On n’y accède pas par position mais par clé.</p></div>
${exe(`age = {'Ana': 19, 'Ben': 20}
age['Ana'] = 21
age['Zoé'] = 18
print(age, len(age))
print('Ben' in age, 20 in age, age.get('Max', -1))`,`{'Ana': 21, 'Ben': 20, 'Zoé': 18} 3
True False -1`)}
<div class="warn"><p>${cd('in')} teste les <b>clés</b>, pas les valeurs : ${cd('20 in age')} est faux alors que Ben a 20 ans. Pour les valeurs, écris ${cd('20 in age.values()')}.</p></div>`,
  fig:py(`age = {'Ana': 19, 'Ben': 20}
age['Ana']          # 19
age.get('Zoé', 0)   # 0 : valeur par défaut si la clé manque
'Ben' in age        # True : in teste les clés
del age['Ben']      # retire la clé
for nom, a in age.items():   # couples (clé, valeur)
    print(nom, a)`),
  note:`${cd("age['Zoé']")} sur une clé absente lève KeyError. ${cd('keys()')}, ${cd('values()')} et ${cd('items()')} donnent les clés, les valeurs et les couples.`},
 {kind:'Théorie',h:'Pourquoi les clés sont immuables',p:`<p>${cd("d['Ana']")} trouve la valeur aussitôt, même dans un dictionnaire d’un million de clés. Python ne parcourt pas les clés une à une : il sait où chercher.</p>
<div class="def"><p>Pour ranger une clé, Python calcule à partir d’elle un nombre, son <b>hachage</b> (${cd('hash(k)')}), qui désigne directement l’emplacement du couple en mémoire. Une clé doit donc être <b>hachable</b> : un objet immuable, comme int, float, str, bool, ou un tuple d’immuables.</p></div>
<div class="blk" data-t="Pourquoi"><p>Si une clé pouvait changer après avoir été rangée, son hachage changerait, et Python chercherait ensuite au mauvais endroit : le couple serait perdu. C’est pourquoi une liste, un dictionnaire ou un ensemble ne peuvent pas servir de clé.</p></div>
${exe(`d = {}
d[(1, 2)] = 'point'
d['ab'] = 3
print(d[(1, 2)], len(d))`,`point 2`,`<p>Le tuple (1, 2) est une clé valable, pratique pour des coordonnées. Mais une ligne ${cd('d[[1, 2]] = 0')} arrêterait le programme sur ${cd('TypeError')}, avec un message qui contient « unhashable type: 'list' » : une liste n’est pas hachable.</p>`)}
<div class="warn"><p>La rapidité se voit dans les tests d’appartenance : ${cd('x in L')} parcourt toute la liste, alors que ${cd('k in d')} va directement à la bonne case. Pour des recherches fréquentes, préfère un dictionnaire.</p></div>`},
 {h:'Compter avec un dictionnaire',p:`<p>Compter les lettres d’un mot : on ne sait pas à l’avance quelles lettres apparaîtront, donc on ne peut pas prévoir une variable par lettre. Un dictionnaire lettre → compteur crée ses clés au fur et à mesure.</p>
<div class="def"><p>Le motif de comptage est ${cd('d[c] = d.get(c, 0) + 1')}. ${cd('d.get(c, 0)')} vaut le compteur actuel de <i>c</i> s’il existe, 0 sinon ; on ajoute 1 et on range le résultat sous la clé <i>c</i>.</p></div>
<div class="idea"><p>La première fois qu’une lettre apparaît, sa clé est créée avec la valeur 1 ; les fois suivantes, son compteur augmente. Sur la figure, chaque barre est un compteur, dans l’ordre où les clés sont apparues.</p></div>
${exe(`d = {}
for c in 'banane':
    d[c] = d.get(c, 0) + 1
print(d)`,`{'b': 1, 'a': 2, 'n': 2, 'e': 1}`)}
<div class="warn"><p>${cd('d[c] += 1')} seul lève KeyError à la première rencontre de <i>c</i>, car la clé n’existe pas encore. Avance lettre par lettre dans ${cd("'abracadabra'")}.</p></div>`+py(`d = {}
for c in 'abracadabra':
    d[c] = d.get(c, 0) + 1`),
  params:[{id:'e',l:'Lettres lues',min:0,max:11,v:2}],
  draw:v=>{ const w='abracadabra', d={}, ord=[]; for(let i=0;i<v.e;i++){ const c=w[i]; if(!(c in d)){ d[c]=0; ord.push(c); } d[c]++; }
    const P=plane({x:[0,11.5],y:[-1,7.6],grid:false,axes:false});
    w.split('').forEach((c,i)=>{ const cur=i===v.e-1; P.rect(0.25+i,6.4,1,0.9,{fill:cur?'var(--spark)':i<v.e?'var(--code)':'var(--surface)',fo:cur?.55:i<v.e?.18:1,c:'var(--code)',w:1.5}); P.text(0.75+i,6.85,c,{a:'middle',dy:5,s:14}); });
    P.seg(0.5,0,11,0,{c:'var(--muted)',w:1.5});
    ord.forEach((c,j)=>{ const x=1+j*2; P.rect(x,0,1.2,d[c],{fill:'var(--code)',fo:.4,c:'var(--code)',w:2}); P.text(x+0.6,0,"'"+c+"'",{a:'middle',dy:16,s:12}); P.text(x+0.6,d[c],String(d[c]),{a:'middle',dy:-5,s:12}); });
    return P.svg(); },
  info:v=>{ const w='abracadabra', d={}, ord=[]; for(let i=0;i<v.e;i++){ const c=w[i]; if(!(c in d)){ d[c]=0; ord.push(c); } d[c]++; }
    return `d = ${cd('{'+ord.map(c=>`'${c}': ${d[c]}`).join(', ')+'}')}`; },
  note:'Un dictionnaire garde l’ordre d’insertion des clés (depuis Python 3.7).'},
 {h:'Inventaire',p:'Qu’affiche ce code&nbsp;?',fig:py(`stock = {'pommes': 4, 'poires': 2}
stock['kiwis'] = 5
stock['pommes'] += 3
del stock['poires']
print(sum(stock.values()))`),lab:'affichage :',ans:12,
  why:"On ajoute 'kiwis': 5, pommes passe à 7, on retire les poires. Il reste {'pommes': 7, 'kiwis': 5}, dont la somme des valeurs vaut 12."},
 {kind:'Méthode',h:'Parcourir un dictionnaire',
  p:`<p>${cd('for k in d:')} parcourt les <b>clés</b>, dans l’ordre où elles ont été ajoutées, et ${cd('d[k]')} donne la valeur. ${cd('for k, v in d.items():')} donne directement chaque couple (clé, valeur). ${cd('d.values()')} donne seulement les valeurs, par exemple pour ${cd('sum(d.values())')}.</p><p>Pour la clé de plus grande valeur, applique la méthode du maximum aux couples : garde la meilleure clé et sa valeur.</p>`,
  demo:{enonce:'Quel jour a les meilleures ventes, et quel est le total&nbsp;?'+py(`ventes = {'lun': 12, 'mar': 17, 'mer': 9, 'jeu': 17}
jour, best = '', 0
for j, v in ventes.items():
    if v > best:
        jour, best = j, v
total = 0
for j in ventes:
    total = total + ventes[j]`),
   etapes:[
    {f:'Couples dans l’ordre : (\'lun\', 12), (\'mar\', 17), (\'mer\', 9), (\'jeu\', 17).',w:'items() suit l’ordre d’insertion des clés.'},
    {f:'lun : 12 &gt; 0, meilleur lun. mar : 17 &gt; 12, meilleur mar. mer : non. jeu : 17 &gt; 17 est faux.',w:'Toutes les ventes sont positives, donc partir de 0 est sans danger ici. Avec &gt;, le premier ex æquo reste.'},
    {f:'for j in ventes : j vaut \'lun\', \'mar\', \'mer\', \'jeu\'. total = 12 + 17 + 9 + 17 = 55.',w:'Parcourir le dictionnaire donne les clés. On lit chaque valeur avec ventes[j]. sum(ventes.values()) donnerait la même chose.'}],
   conclusion:'Le meilleur jour est \'mar\' (17), et le total vaut 55.'}},
 {h:'Parcourir items()',p:'Qu’affiche ce code&nbsp;?',fig:py(`d = {'a': 3, 'b': 1, 'c': 2}
for k, v in d.items():
    if v > 1:
        print(k * v, end=' ')`),
  opts:[cd('aaa cc'),cd('a c'),cd('3 2'),cd('aaa b cc')],ans:0,
  why:`On parcourt les couples ('a', 3), ('b', 1), ('c', 2). Seuls a et c ont une valeur &gt; 1. 'a' * 3 = 'aaa' et 'c' * 2 = 'cc'.`},
 {kind:'Méthode',h:'Regrouper dans un dictionnaire de listes',
  p:`Pour ranger des éléments par catégorie, utilise un dictionnaire dont chaque valeur est une <b>liste</b>. Pour chaque élément : calcule sa catégorie <i>c</i> ; si <i>c</i> n’est pas encore une clé, crée ${cd('d[c] = []')} ; puis ${cd('d[c].append(x)')}. Sans la création, le premier ${cd('d[c]')} lèverait KeyError.`,
  demo:{enonce:'Regrouper les mots par première lettre.'+py(`mots = ['ane', 'bus', 'arc', 'cle', 'bol']
gr = {}
for m in mots:
    c = m[0]
    if c not in gr:
        gr[c] = []
    gr[c].append(m)`),
   etapes:[
    {f:'\'ane\' : la clé \'a\' n’existe pas, on crée gr[\'a\'] = [] puis on ajoute : {\'a\': [\'ane\']}.',w:'La catégorie est la première lettre, m[0].'},
    {f:'\'bus\' : nouvelle clé \'b\' : {\'a\': [\'ane\'], \'b\': [\'bus\']}.',w:'Chaque nouvelle catégorie commence par une liste vide.'},
    {f:'\'arc\' : la clé \'a\' existe, on ajoute seulement : [\'ane\', \'arc\'].',w:'On ne recrée pas la liste, sinon on perdrait \'ane\'.'},
    {f:'\'cle\' puis \'bol\' : gr = {\'a\': [\'ane\', \'arc\'], \'b\': [\'bus\', \'bol\'], \'c\': [\'cle\']}.',w:'Dans chaque liste, les mots gardent l’ordre du parcours.'}],
   conclusion:'Trois clés, et chaque mot est dans la liste de sa lettre.'}},
 {h:'Regrouper par reste',p:'Que vaut ' + cd('sum(g[1])') + ' à la fin&nbsp;?',fig:py(`L = [4, 7, 2, 9, 5, 1]
g = {}
for x in L:
    r = x % 3
    if r not in g:
        g[r] = []
    g[r].append(x)`),lab:'somme =',ans:12,
  why:'Les restes par 3 sont 1, 1, 2, 0, 2, 1. g = {1: [4, 7, 1], 2: [2, 5], 0: [9]}, donc sum(g[1]) = 4 + 7 + 1 = 12.'},
 {h:'Compréhensions',p:`<p>Le motif « liste vide, boucle for, append » revient sans cesse pour filtrer ou transformer. Python a une écriture courte qui dit la même chose en une ligne.</p>
<div class="def"><p>Une <b>compréhension de liste</b> s’écrit ${cd('[expr for x in iterable]')} ou ${cd('[expr for x in iterable if condition]')}. Elle construit une <b>nouvelle</b> liste : pour chaque <i>x</i> du parcours (qui vérifie la condition, s’il y en a une), elle ajoute la valeur de <i>expr</i>, dans l’ordre du parcours.</p></div>
<div class="idea"><p>Lis-la comme une phrase : « la liste des x * x, pour x dans range(6), si x est pair ». La figure montre la boucle équivalente : même ordre, mêmes éléments. La variable <i>x</i> n’existe qu’à l’intérieur des crochets.</p></div>
${exe(`L = [3, -1, 4, -5]
print([2 * x for x in L])
print([x for x in L if x > 0], [len(m) for m in ['le', 'chat']])`,`[6, -2, 8, -10]
[3, 4] [2, 4]`,`<p>La première transforme chaque élément, la deuxième filtre sans transformer, la troisième transforme des mots en nombres. L n’a pas changé.</p>`)}
<div class="warn"><p>Une compréhension sert à <b>construire</b> une liste. Pour seulement afficher ou cumuler, une boucle ordinaire est plus claire. La figure montre aussi une compréhension de dictionnaire, détaillée plus loin.</p></div>`,
  fig:py(`carres = [x * x for x in range(6) if x % 2 == 0]
# [0, 4, 16]

# équivaut à :
carres = []
for x in range(6):
    if x % 2 == 0:
        carres.append(x * x)

longueurs = {m: len(m) for m in ['le', 'chat']}
# {'le': 2, 'chat': 4}`),
  note:'Le filtre if se place à la fin. Pour transformer selon un cas, mets une expression conditionnelle au début : [x if x > 0 else 0 for x in L].'},
 {h:'Compter avec une compréhension',p:`Que vaut ${cd('len([x for x in range(20) if x % 3 == 0])')}&nbsp;?`,lab:'longueur =',ans:7,
  why:'Les multiples de 3 de 0 à 19 sont 0, 3, 6, 9, 12, 15, 18 : il y en a 7. Attention à ne pas oublier 0.'},
 {kind:'Théorie',h:'Compréhension de dictionnaire',p:`<p>Construire en une ligne une table « mot → longueur », ou inverser un dictionnaire : les compréhensions existent aussi avec des accolades.</p>
<div class="def"><p>${cd('{cle: valeur for x in iterable if condition}')} construit un <b>nouveau dictionnaire</b>. Pour chaque <i>x</i> retenu, Python calcule <i>cle</i> et <i>valeur</i>, puis fait l’équivalent de ${cd('d[cle] = valeur')}.</p></div>
<div class="idea"><p>Puisque c’est une suite d’affectations, une clé qui revient <b>écrase</b> la valeur précédente : le dernier couple gagne, et la clé garde la place de sa première apparition. Le dictionnaire peut donc avoir moins de clés que d’éléments parcourus.</p></div>
${exe(`mots = ['le', 'chat', 'et', 'la', 'souris']
lg = {m: len(m) for m in mots}
par_long = {len(m): m for m in mots}
print(lg['chat'], par_long)`,`4 {2: 'la', 4: 'chat', 6: 'souris'}`,`<p>Trois mots ont 2 lettres : 'le', puis 'et', puis 'la' s’écrivent tour à tour sous la clé 2, et seul 'la' reste.</p>`)}
<div class="warn"><p>${cd('{}')} est un dictionnaire vide, pas un ensemble. Pour garder tous les mots d’une même longueur, il faut un dictionnaire de listes, construit avec une boucle (méthode « Regrouper »).</p></div>`},
 {kind:'Méthode',h:'Compréhension à deux for, et ordre des chaînes',
  p:`<p>${cd('[e for a in A for b in B if cond]')} équivaut à deux boucles imbriquées, dans le <b>même ordre</b> que les for : la première est l’extérieure. Pour chaque couple (a, b), on ajoute e si la condition est vraie.</p><p>Les chaînes se comparent avec ${cd('<')} dans l’ordre du dictionnaire : on compare lettre à lettre, et la première différence décide. ${cd("'chat' < 'chien'")} est vrai car a vient avant i. Un préfixe passe devant (${cd("'ab' < 'abc'")}), et les majuscules passent avant les minuscules (${cd("'Zoé' < 'ana'")}). Pour former des paires sans doublon, on garde seulement a &lt; b.</p>`,
  demo:{enonce:'Que vaut <i>P</i>&nbsp;?'+py(`L = ['x', 'y', 'z']
P = [(a, b) for a in L for b in L if a < b]`),
   etapes:[
    {f:py(`P = []
for a in L:
    for b in L:
        if a < b:
            P.append((a, b))`),w:'On réécrit la compréhension en boucles : c’est la façon sûre de la lire.'},
    {f:'a = \'x\' : b = \'x\' non, \'y\' oui, \'z\' oui.',w:'a &lt; b exclut (x, x) et ne garde qu’un des deux ordres.'},
    {f:'a = \'y\' : seul b = \'z\' convient. a = \'z\' : aucun.',w:'On a examiné 3 × 3 = 9 couples.'}],
   conclusion:'P = [(\'x\', \'y\'), (\'x\', \'z\'), (\'y\', \'z\')] : les 3 paires distinctes, chacune une fois.'}},
 {h:'Paires de même parité',p:`Que vaut ${cd('len([(a, b) for a in range(5) for b in range(5) if a < b and (a + b) % 2 == 0])')}&nbsp;?`,lab:'longueur =',ans:4,
  why:'a + b est pair quand a et b ont la même parité. Avec a &lt; b : (0, 2), (0, 4), (2, 4) et (1, 3). Il y en a 4.'},
 {kind:'Théorie',h:'Les ensembles',p:`<p>Pour savoir qui a déjà voté, une seule question compte : « ce nom est-il dedans ? ». L’ordre et les doublons n’ont aucun intérêt.</p>
<div class="def"><p>Un <b>ensemble</b> (${cd('set')}) est une collection <b>sans ordre et sans doublon</b> d’objets hachables. On l’écrit ${cd('{1, 2, 3}')} ou ${cd('set(seq)')} ; ${cd('set()')} est l’ensemble vide. ${cd('s.add(x)')} ajoute, ${cd('s.remove(x)')} retire, ${cd('x in s')} teste, ${cd('len(s)')} compte. ${cd('s | t')}, ${cd('s & t')} et ${cd('s - t')} donnent la réunion, l’intersection et la différence.</p></div>
<div class="idea"><p>Un ensemble fonctionne comme un dictionnaire qui n’aurait que des clés : même hachage, donc test ${cd('x in s')} immédiat et éléments immuables. Ajouter un élément déjà présent ne fait rien : c’est ce qui élimine les doublons.</p></div>
${exe(`s = set('mississippi')
print(len(s), 's' in s, 'z' in s)
t = {1, 2, 3}
t.add(2)
t.add(4)
print(t, t & {3, 4, 5})`,`4 True False
{1, 2, 3, 4} {3, 4}`,`<p>'mississippi' n’a que 4 lettres distinctes : m, i, s, p. Le deuxième add(2) ne change rien.</p>`)}
<div class="warn"><p>Un ensemble n’a pas d’indices : ${cd('s[0]')} lève TypeError. Et ne compte pas sur l’ordre d’affichage de ses éléments.</p></div>`},
 {kind:'Méthode',h:'Choisir la bonne structure de données',
  p:`<ul><li><b>Liste</b> : des éléments dans un <b>ordre</b>, doublons permis, accès par position ${cd('L[i]')}.</li><li><b>Tuple</b> : un petit groupe fixe (des coordonnées, plusieurs valeurs renvoyées). Immuable, il peut servir de clé.</li><li><b>Dictionnaire</b> : associer une <b>clé</b> à une valeur (nom → note), et retrouver vite la valeur d’une clé.</li><li><b>Ensemble</b> (${cd('set')}) : des éléments <b>sans doublon</b>, sans ordre, avec un test ${cd('x in s')} rapide. ${cd('set()')} est l’ensemble vide, ${cd('s.add(x)')} ajoute, et ${cd('len(set(L))')} compte les valeurs distinctes de L.</li></ul>`,
  demo:{enonce:'Pour un vote, on doit (1) savoir qui a déjà voté, (2) compter les voix de chaque candidat, (3) garder l’ordre d’arrivée des bulletins. Quelle structure pour chaque besoin&nbsp;?',
   etapes:[
    {f:`(1) un ensemble : ${cd('votants = set()')}, puis ${cd('if nom in votants')} et ${cd('votants.add(nom)')}.`,w:'On ne pose qu’une question, « est-il dedans ? », et un votant ne doit pas apparaître deux fois.'},
    {f:`(2) un dictionnaire : ${cd('voix[c] = voix.get(c, 0) + 1')}.`,w:'On associe à chaque candidat (la clé) un nombre (la valeur).'},
    {f:`(3) une liste : ${cd('bulletins.append(c)')}.`,w:'Seule la liste garde l’ordre et accepte les doublons : deux bulletins pour le même candidat.'}],
   conclusion:'Ensemble pour l’appartenance, dictionnaire pour associer, liste pour l’ordre.'}},
 {h:'Valeurs distinctes',p:`Que vaut ${cd("len(set('abracadabra'))")}&nbsp;?`,lab:'longueur =',ans:5,
  why:'set garde chaque lettre une seule fois : {a, b, r, c, d}. Il y en a 5.'},
 {h:'Quelle structure&nbsp;?',p:'Tu dois retrouver très souvent le numéro de téléphone d’une personne à partir de son nom. Que choisis-tu&nbsp;?',
  opts:['Une liste de numéros','Un ensemble de noms','Un dictionnaire nom → numéro','Un tuple de noms'],ans:2,
  why:'On associe une valeur (le numéro) à une clé (le nom) : c’est un dictionnaire, et annuaire[nom] répond directement. Un ensemble ne stocke pas de valeur associée.'},
 {kind:'Défi',h:'Dictionnaire de listes',p:'Qu’affiche ce code&nbsp;?',fig:py(`notes = {'Ana': [5, 6, 4], 'Ben': [3, 4], 'Léo': [6, 6, 5, 5]}
print(sum([len(L) for n, L in notes.items() if sum(L) / len(L) >= 5]))`),lab:'affichage :',ans:7,
  why:'Moyennes : Ana 5, Ben 3,5, Léo 5,5. On garde Ana et Léo, et on additionne leurs nombres de notes : 3 + 4 = 7.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Quatre structures, chacune pour un besoin : la liste pour l’ordre, le tuple pour un petit groupe fixe, le dictionnaire pour associer, l’ensemble pour l’appartenance.</p>
<div class="keep"><ul><li>Tuple : séquence immuable, faite par la virgule ; déballage ${cd('x, y = t')} ; ${cd('return a, b')} renvoie un tuple ; dans ${cd('a, b = b, a')}, la droite est calculée d’abord.</li><li>Dictionnaire : ${cd('d[k]')} (KeyError si absente), ${cd('d[k] = v')} ajoute ou remplace, ${cd('del')}, ${cd('d.get(k, defaut)')} ; ${cd('in')} teste les clés ; ordre d’insertion conservé.</li><li>Clés hachables donc immuables (int, str, tuple…) : c’est le hachage qui rend ${cd('k in d')} immédiat.</li><li>Compter : ${cd('d[c] = d.get(c, 0) + 1')}. Regrouper : créer ${cd('d[c] = []')} si la clé manque, puis append.</li><li>Parcours : ${cd('for k in d')} (clés), ${cd('d.items()')} (couples), ${cd('d.values()')} (valeurs).</li><li>Compréhensions : ${cd('[e for x in it if c]')} ; ${cd('{k: v for x in it}')}, où une clé répétée écrase la précédente ; deux for se lisent comme deux boucles, la première étant l’extérieure.</li><li>Ensemble : sans ordre ni doublon, ${cd('set()')} vide, add, ${cd('in')}, | & −.</li></ul></div>`},
 {kind:'Problème',h:'Le mot le plus fréquent',p:`On compte les mots d’un texte avec un dictionnaire, puis on cherche le mot le plus fréquent et les mots qui n’apparaissent qu’une fois. Deux mots sont à égalité : regarde bien quel test les départage.`+py(`texte = 'pomme kiwi pomme poire kiwi figue'
freq = {}
for m in texte.split():
    freq[m] = freq.get(m, 0) + 1

meilleur, nb = '', 0
for m, c in freq.items():
    if c > nb:
        meilleur, nb = m, c

rares = [m for m in freq if freq[m] == 1]
print(len(freq), meilleur, rares)`),
  parts:[
   {q:'a) Que vaut ' + cd('len(freq)') + '&nbsp;?',lab:'len(freq) =',ans:4,hint:'Une clé n’apparaît qu’une fois dans un dictionnaire, même si le mot revient.',why:"freq = {'pomme': 2, 'kiwi': 2, 'poire': 1, 'figue': 1} : 4 clés."},
   {q:'b) Que vaut <i>meilleur</i>&nbsp;?',opts:[cd("'kiwi'"),cd("'pomme'"),cd("'figue'"),cd("'poire'")],ans:1,hint:'items() suit l’ordre d’insertion. Le test c &gt; nb est-il vrai quand c = nb&nbsp;?',why:'pomme arrive en premier avec 2 : meilleur = pomme, nb = 2. Pour kiwi, 2 &gt; 2 est faux, donc pomme reste.'},
   {q:'c) Et si on écrit ' + cd('c >= nb') + ' à la place de ' + cd('c > nb') + '&nbsp;?',opts:[cd("'pomme'"),cd("'figue'"),cd("'kiwi'"),cd("'poire'")],ans:2,hint:'Avec ≥, une égalité remplace l’ancien meilleur. Après kiwi, nb vaut encore 2 : poire et figue passent-elles le test&nbsp;?',why:'kiwi : 2 ≥ 2 est vrai, meilleur devient kiwi. poire et figue : 1 ≥ 2 est faux. Le dernier mot à égalité gagne : kiwi.'},
   {q:'d) Que vaut <i>rares</i>&nbsp;?',opts:[cd("['figue', 'poire']"),cd("['poire', 'figue']"),cd("['poire']"),cd("[1, 1]")],ans:1,hint:'for m in freq parcourt les clés, dans l’ordre où elles ont été ajoutées.',why:'Les clés de valeur 1 sont poire et figue, dans l’ordre d’insertion : [\'poire\', \'figue\'].'},
  ],
  sol:`<p>Le motif freq[m] = freq.get(m, 0) + 1 donne {'pomme': 2, 'kiwi': 2, 'poire': 1, 'figue': 1}, avec les clés dans l’ordre de première apparition.</p><p>Recherche du maximum : on part de nb = 0. pomme (2 &gt; 0) devient le meilleur. kiwi : 2 &gt; 2 est faux. poire et figue : 1 &gt; 2 est faux. meilleur vaut pomme : avec &gt;, le premier ex æquo gagne.</p><p>Avec ≥, kiwi remplace pomme (2 ≥ 2), puis poire et figue échouent : le dernier ex æquo gagne.</p><p>La compréhension garde les clés de valeur 1, dans l’ordre d’insertion. Le programme affiche 4 pomme ['poire', 'figue'].</p>`},
 {kind:'Problème',h:'Inverser un dictionnaire',p:`On range des élèves par note de trois façons. On regroupe les noms par note dans un dictionnaire de listes. On inverse le dictionnaire avec une compréhension. Enfin on liste les paires d’élèves ex æquo. Attention : deux élèves peuvent avoir la même note, mais une clé est unique.`+py(`notes = {'Ana': 5, 'Ben': 4, 'Léo': 5, 'Zoé': 6, 'Max': 4}

par_note = {}
for nom, n in notes.items():
    if n not in par_note:
        par_note[n] = []
    par_note[n].append(nom)

inv = {n: nom for nom, n in notes.items()}

paires = [(a, b) for a in notes for b in notes
          if a < b and notes[a] == notes[b]]
print(par_note[5], inv[4], len(inv), len(paires))`),
  parts:[
   {q:'a) Que vaut ' + cd('par_note[5]') + '&nbsp;?',opts:[cd("'Léo'"),cd("['Léo', 'Ana']"),cd("['Ana', 'Léo']"),cd("['Ana']")],ans:2,hint:'Chaque nom est ajouté à la fin de la liste de sa note, dans l’ordre du parcours.',why:'Ana (5) crée la liste [\'Ana\'], puis Léo (5) s’y ajoute : [\'Ana\', \'Léo\'].'},
   {q:'b) Que vaut ' + cd('inv[4]') + '&nbsp;?',opts:[cd("'Ben'"),cd("'Max'"),cd("['Ben', 'Max']"),`Une erreur ${cd('KeyError')}`],ans:1,hint:'Dans une compréhension de dictionnaire, que se passe-t-il quand la même clé revient&nbsp;?',why:'La clé 4 est d’abord associée à Ben, puis Max l’écrase, car il vient plus tard. inv[4] vaut \'Max\'.'},
   {q:'c) Que vaut ' + cd('len(inv)') + '&nbsp;?',lab:'len(inv) =',ans:3,hint:'Combien de notes différentes&nbsp;?',why:'Les clés de inv sont les notes distinctes 5, 4 et 6 : 3 clés. Deux noms ont été perdus.'},
   {q:'d) Que vaut ' + cd('len(paires)') + '&nbsp;?',lab:'len(paires) =',ans:2,hint:'Le test a &lt; b compare les noms par ordre alphabétique : il évite (a, a) et compte chaque paire une seule fois.',why:'Les ex æquo sont Ana et Léo (5), puis Ben et Max (4). Avec a &lt; b, on garde (\'Ana\', \'Léo\') et (\'Ben\', \'Max\') : 2 paires.'},
  ],
  sol:`<p><b>Regroupement.</b> On crée une liste vide la première fois qu’une note apparaît, puis on y ajoute chaque nom : par_note = {5: ['Ana', 'Léo'], 4: ['Ben', 'Max'], 6: ['Zoé']}.</p><p><b>Inversion.</b> {n: nom for nom, n in notes.items()} écrit les couples dans l’ordre. Quand une note revient, la nouvelle valeur écrase l’ancienne : 5 → 'Léo', 4 → 'Max', 6 → 'Zoé'. Il ne reste que 3 clés. Inverser n’est sans perte que si les valeurs sont toutes différentes.</p><p><b>Paires.</b> La double compréhension parcourt les 25 couples (a, b). La condition a &lt; b retire (a, a) et l’un des deux ordres. Il reste les paires d’égalité ('Ana', 'Léo') et ('Ben', 'Max').</p><p>Affichage : ['Ana', 'Léo'] Max 3 2.</p>`},
]},

);
})();
