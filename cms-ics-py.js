/* Déclic — Informatique, Programmation Python (PREPA-025 / 026) */
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

CMS.push(

/* ===================== 1. SYNTAXE, TYPES, VARIABLES ===================== */
{subj:'ics',sem:'py',id:'cms-ics-syntaxe',h:'Syntaxe, types et variables',p:'Les types de base, les opérateurs et leurs priorités, les conversions et l’affectation.',steps:[
 {h:'Quatre types de base',p:`Chaque valeur a un <b>type</b>. Les entiers sont des ${cd('int')}, les nombres à virgule des ${cd('float')}, le texte des ${cd('str')} et les valeurs de vérité des ${cd('bool')}. La fonction ${cd('type()')} donne le type d’une valeur.`,
  fig:py(`n = 42          # int
x = 3.14        # float (point, pas virgule)
nom = 'Ada'     # str, entre ' ' ou " "
ok = True       # bool : True ou False
print(type(x))  # affiche <class 'float'>`),
  note:'Le séparateur décimal est le <b>point</b> : 3.14. Écrire 3,14 crée un tuple de deux entiers.'},
 {h:'Division et type',p:`Que valent ${cd('type(7 / 2)')} et ${cd('type(7 // 2)')}&nbsp;?`,
  opts:[`${cd('int')} et ${cd('int')}`,`${cd('float')} et ${cd('float')}`,`${cd('float')} et ${cd('int')}`,`${cd('int')} et ${cd('float')}`],ans:2,
  why:`${cd('/')} est la division exacte : elle rend toujours un float (7 / 2 = 3.5, et même 6 / 2 = 3.0). ${cd('//')} est la division entière : entre deux int, elle rend un int (7 // 2 = 3).`},
 {h:'Quotient entier et reste',p:`${cd('a // b')} est le quotient entier <i>q</i>, ${cd('a % b')} le reste <i>r</i>. Python arrondit le quotient <b>vers le bas</b>, si bien que pour <i>b</i> &gt; 0 le reste vérifie toujours 0 ≤ <i>r</i> &lt; <i>b</i> et <b><i>a</i> = <i>b</i>·<i>q</i> + <i>r</i></b>. Essaie un <i>a</i> négatif.`,
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
 {h:'Priorités des opérateurs',p:`Du plus prioritaire au moins prioritaire : les parenthèses, puis ${cd('**')}, puis le signe moins unaire, puis ${cd('* / // %')} (de gauche à droite), puis ${cd('+ -')}. La puissance ${cd('**')} se lit de <b>droite à gauche</b>.`,
  fig:py(`print(2 ** 3 ** 2)   # 2 ** 9 = 512
print(-2 ** 2)       # -(2 ** 2) = -4
print(10 - 4 - 3)    # (10 - 4) - 3 = 3
print(2 * 3 % 4)     # (2 * 3) % 4 = 2`),
  note:`Piège : ${cd('-2 ** 2')} vaut −4, pas 4. Pour élever −2 au carré, écris ${cd('(-2) ** 2')}.`},
 {h:'Dans quel ordre&nbsp;?',p:'Qu’affiche ce code&nbsp;?',fig:py(`print(2 + 3 * 4 ** 2 // 5)`),
  opts:[cd('16'),cd('80'),cd('10'),cd('11')],ans:3,
  why:`D’abord 4 ** 2 = 16. Puis de gauche à droite : 3 * 16 = 48 et 48 // 5 = 9. Enfin 2 + 9 = 11.`},
 {h:'Conversions et affectation',p:`${cd('int()')}, ${cd('float()')}, ${cd('str()')} et ${cd('bool()')} convertissent une valeur. ${cd('int(3.9)')} <b>tronque</b> vers 0. L’affectation ${cd('x = expr')} évalue d’abord la droite, puis attache le nom <i>x</i> au résultat : ${cd('x = x + 1')} a donc un sens.`,
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
]},

/* ===================== 2. RÉFÉRENCES ET MUTABILITÉ ===================== */
{subj:'ics',sem:'py',id:'cms-ics-references',h:'Références et mutabilité',p:'Un nom n’est qu’une étiquette sur un objet : aliasing, objets mutables, is contre ==, copies.',steps:[
 {h:'Des noms et des objets',p:`En Python, une variable est un <b>nom</b> qui <b>référence</b> un objet en mémoire. ${cd('x = [1, 2]')} crée un objet liste, puis attache le nom <i>x</i> à cet objet. Chaque objet a une identité, donnée par ${cd('id(x)')}.`,
  fig:memFig(2.6,P=>{ nameAt(P,1.4,1.9,'x'); cells(P,4.5,1.9,[1,2]); ref(P,1.75,1.9,4.45,1.9);
    nameAt(P,1.4,0.6,'n'); box(P,4.5,0.6,0.9,'5','var(--math)'); ref(P,1.75,0.6,4.45,0.6); P.text(6.6,1.9,'objet list',{s:12,c:'var(--muted)'}); P.text(6.6,0.6,'objet int',{s:12,c:'var(--muted)'}); }),
  note:'Une flèche représente une référence. Plusieurs noms peuvent pointer vers le même objet.'},
 {h:'Deux noms, une seule liste',p:`Avance ligne par ligne. ${cd('b = a')} ne copie rien : <i>b</i> devient un deuxième nom pour la <b>même</b> liste. C’est l’<b>aliasing</b>.`,
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
 {h:'Mutable ou immuable',p:`Un objet <b>mutable</b> peut être modifié sur place : ${cd('list')}, ${cd('dict')}, ${cd('set')}. Un objet <b>immuable</b> ne change jamais : ${cd('int')}, ${cd('float')}, ${cd('bool')}, ${cd('str')}, ${cd('tuple')}. Avec un immuable, ${cd('y += 1')} crée un nouvel objet et y attache <i>y</i>.`,
  fig:py(`x = 5
y = x
y += 1
print(x, y)   # 5 6 : x n'a pas bougé`)+memFig(2.4,P=>{ nameAt(P,1.4,1.8,'x'); nameAt(P,1.4,0.6,'y'); box(P,4.5,1.8,0.9,'5','var(--math)'); box(P,4.5,0.6,0.9,'6','var(--math)'); ref(P,1.75,1.8,4.45,1.8); ref(P,1.75,0.6,4.45,0.6); P.text(5.8,1.8,'5 n’a pas changé',{s:12,c:'var(--muted)'}); }),
  note:`Piège : sur une <b>liste</b>, ${cd('b += [3]')} modifie l’objet sur place (comme extend), alors que ${cd('b = b + [3]')} crée une nouvelle liste.`},
 {h:'Une chaîne se modifie-t-elle&nbsp;?',p:'Que se passe-t-il&nbsp;?',fig:py(`s = 'abc'
s[0] = 'z'`),
  opts:[`<i>s</i> devient ${cd("'zbc'")}`,`<i>s</i> devient ${cd("'z'")}`,`Une erreur ${cd('TypeError')}`,'Rien, la ligne est ignorée'],ans:2,
  why:`Une chaîne est immuable : on ne peut pas changer une de ses lettres. Python lève TypeError (« 'str' object does not support item assignment »). Il faut construire une nouvelle chaîne : ${cd("s = 'z' + s[1:]")}.`},
 {h:'is contre ==',p:`${cd('a == b')} compare les <b>valeurs</b>. ${cd('a is b')} teste si les deux noms référencent le <b>même objet</b>. Deux listes peuvent être égales sans être le même objet.`,
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
 {kind:'Défi',h:'+= ou + ?',p:'Qu’affiche ce code&nbsp;?',fig:py(`a = [1, 2]
b = a
b += [3]
b = b + [4]
print(a, b)`),
  opts:[cd('[1, 2] [1, 2, 3, 4]'),cd('[1, 2, 3] [1, 2, 3, 4]'),cd('[1, 2, 3, 4] [1, 2, 3, 4]'),cd('[1, 2, 3] [1, 2, 3]')],ans:1,
  why:`${cd('b += [3]')} modifie sur place la liste partagée : a et b valent [1, 2, 3]. Puis ${cd('b + [4]')} crée une nouvelle liste, attachée à b seul. a reste [1, 2, 3].`},
]},

/* ===================== 3. FONCTIONS ===================== */
{subj:'ics',sem:'py',id:'cms-ics-fonctions',h:'Fonctions',p:'Définir une fonction, passer des arguments, renvoyer un résultat, comprendre la portée et importer des bibliothèques.',steps:[
 {h:'Définir et appeler',p:`${cd('def')} définit une fonction : un nom, des <b>paramètres</b> entre parenthèses, puis un bloc indenté. ${cd('return')} renvoie une valeur et termine la fonction. À l’appel, on passe des <b>arguments</b>.`,
  fig:py(`def aire_rectangle(l, h):
    return l * h

a = aire_rectangle(3, 4)   # a vaut 12
print(a + 1)               # 13`),
  note:`Une fonction sans ${cd('return')} renvoie ${cd('None')}. Afficher avec print n’est pas renvoyer.`},
 {h:'print ou return',p:'Qu’affiche ce code&nbsp;?',fig:py(`def f(x):
    print(x + 1)

r = f(2)
print(r)`),
  opts:[cd('3') +' puis '+cd('3'),cd('3')+' puis '+cd('None'),cd('None')+' seulement',cd('3')+' seulement'],ans:1,
  why:'L’appel f(2) affiche 3. Mais f n’a pas de return : elle renvoie None, donc r vaut None et la deuxième ligne affiche None.'},
 {h:'Positionnels, nommés, par défaut',p:`Les arguments <b>positionnels</b> remplissent les paramètres dans l’ordre. Un argument <b>nommé</b> (${cd('c=3')}) vise un paramètre par son nom. Un paramètre avec <b>valeur par défaut</b> peut être omis. Choisis un appel.`,
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
 {h:'Portée locale et globale',p:`Un nom affecté <b>dans</b> une fonction est <b>local</b> : il n’existe que pendant l’appel et masque un éventuel nom global identique. Pour réaffecter une variable globale, il faut déclarer ${cd('global x')}.`,
  fig:py(`x = 10
def f():
    x = 5        # x local, le x global n'est pas touché
    return x

print(f(), x)    # 5 10

compteur = 0
def incr():
    global compteur
    compteur += 1`),
  note:'Un paramètre est une variable locale qui référence l’objet passé. Si cet objet est une liste, la modifier sur place (append) se voit à l’extérieur. Réaffecter le paramètre, non.'},
 {h:'Une liste passée en argument',p:'Qu’affiche ce code&nbsp;?',fig:py(`def ajoute(L):
    L.append(0)
    L = [9]

a = [1]
ajoute(a)
print(a)`),
  opts:[cd('[1]'),cd('[9]'),cd('[1, 0, 9]'),cd('[1, 0]')],ans:3,
  why:'Au début, L et a référencent la même liste : append(0) la modifie, a vaut [1, 0]. Ensuite L = [9] attache seulement le nom local L à une nouvelle liste. a n’est pas touchée.'},
 {h:'Importer une bibliothèque',p:`${cd('import math')} donne accès à ${cd('math.sqrt')}, ${cd('math.pi')}, ${cd('math.floor')}, ${cd('math.ceil')}… On peut aussi écrire ${cd('from math import sqrt')}. Le module ${cd('random')} tire des nombres au hasard.`,
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
 {kind:'Défi',h:'Deux appels',p:'Qu’affiche ce code&nbsp;?',fig:py(`def f(a, b=2, c=3):
    return a * 100 + b * 10 + c

print(f(1, c=5) + f(c=1, a=2, b=0))`),lab:'affichage :',ans:326,
  why:'f(1, c=5) : a = 1, b = 2, c = 5, soit 100 + 20 + 5 = 125. f(c=1, a=2, b=0) : 200 + 0 + 1 = 201. Somme : 326.'},
]},

/* ===================== 4. STRUCTURES DE CONTRÔLE ===================== */
{subj:'ics',sem:'py',id:'cms-ics-controle',h:'Structures de contrôle',p:'Choisir avec if, répéter avec while et for, sortir d’une boucle, imbriquer des boucles.',steps:[
 {h:'if, elif, else',p:`Python teste les conditions <b>dans l’ordre</b> et exécute le premier bloc dont la condition est vraie, puis saute les autres. Les blocs sont délimités par l’<b>indentation</b> (4 espaces). On combine les conditions avec ${cd('and')}, ${cd('or')} et ${cd('not')}.`,
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
 {h:'La boucle while',p:`${cd('while condition:')} répète son bloc <b>tant que</b> la condition est vraie. Le corps doit faire évoluer la condition, sinon la boucle ne s’arrête jamais. Ici, la suite de Syracuse : choisis le départ, puis avance tour par tour.`+py(`n = n0
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
 {h:'Compte les tours',p:'Qu’affiche ce code&nbsp;?',fig:py(`n = 100
k = 0
while n > 1:
    n = n // 3
    k += 1
print(k)`),lab:'k =',ans:4,
  why:'n prend les valeurs 100, 33, 11, 3, 1. Quatre divisions, puis n > 1 est faux : k = 4.'},
 {h:'for et range',p:`${cd('for x in sequence:')} donne à <i>x</i> chaque élément de la séquence, dans l’ordre. ${cd('range(debut, fin, pas)')} produit les entiers de <i>debut</i> inclus à <i>fin</i> <b>exclue</b>, de <i>pas</i> en <i>pas</i>. ${cd('break')} quitte la boucle, ${cd('continue')} passe directement au tour suivant.`,
  fig:py(`range(5)          # 0, 1, 2, 3, 4
range(2, 6)       # 2, 3, 4, 5
range(10, 0, -3)  # 10, 7, 4, 1
for lettre in 'abc':
    print(lettre)  # a, puis b, puis c`),
  note:`${cd('range(n)')} fait exactement <i>n</i> tours, de 0 à <i>n</i> − 1.`},
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
 {h:'break et continue',p:'Qu’affiche ce code&nbsp;?',fig:py(`for i in range(10):
    if i % 3 == 0:
        continue
    if i > 7:
        break
    print(i, end=' ')`),
  opts:[cd('1 2 4 5 7 8'),cd('1 2 4 5 7'),cd('0 1 2 4 5 7'),cd('1 2')],ans:1,
  why:'Les multiples de 3 (0, 3, 6) sont sautés par continue. On affiche 1, 2, 4, 5, 7. À i = 8, la condition i > 7 déclenche break avant le print.'},
 {h:'Boucles imbriquées',p:`Une boucle dans une boucle : pour <b>chaque</b> tour de la boucle extérieure, la boucle intérieure fait <b>tous</b> ses tours. Si l’intérieure dépend de <i>i</i>, le nombre de tours varie.`,
  fig:py(`for i in range(3):
    for j in range(i, 3):
        print(i, j)
# 3 + 2 + 1 = 6 tours`)+(()=>{ const P=plane({x:[-1,4],y:[-1,4],w:200,grid:false,axes:false});
    for(let i=0;i<3;i++) for(let j=0;j<3;j++) P.dot(j,2-i,{r:8,c:j>=i?'var(--code)':'var(--line)'});
    [0,1,2].forEach(k=>{ P.text(k,3,'j='+k,{a:'middle',s:11,c:'var(--muted)'}); P.text(-0.4,2-k,'i='+k,{a:'end',dy:4,s:11,c:'var(--muted)'}); }); return P.svg(); })(),
  note:'Deux boucles de n tours chacune, sans dépendance, font n·n tours au total.'},
 {kind:'Défi',h:'Somme imbriquée',p:'Qu’affiche ce code&nbsp;?',fig:py(`s = 0
for i in range(1, 4):
    for j in range(i):
        s += i * j
print(s)`),lab:'s =',ans:11,
  why:'i = 1 : j = 0, on ajoute 0. i = 2 : j = 0, 1, on ajoute 0 + 2. i = 3 : j = 0, 1, 2, on ajoute 0 + 3 + 6. Total : 2 + 9 = 11.'},
]},

/* ===================== 5. CHAÎNES ET LISTES ===================== */
{subj:'ics',sem:'py',id:'cms-ics-listes',h:'Chaînes et listes',p:'Accéder par indice, découper en tranches, utiliser les méthodes courantes, parcourir et modifier une liste.',steps:[
 {h:'Indices',p:`Une chaîne ou une liste de longueur <i>n</i> a des indices de 0 à <i>n</i> − 1. ${cd('s[0]')} est le premier élément. Les indices <b>négatifs</b> partent de la fin : ${cd('s[-1]')} est le dernier. ${cd('len(s)')} donne la longueur.`,
  fig:(()=>{ const s='PYTHON', P=plane({x:[0,7],y:[0,2.6],grid:false,axes:false}); const c=cells(P,0.5,1.3,s.split(''),'var(--code)',1);
    c.forEach((p,i)=>{ P.text(p[0],2.2,String(i),{a:'middle',s:12,c:'var(--accent)'}); P.text(p[0],0.4,String(i-6).replace('-','−'),{a:'middle',s:12,c:'var(--spark)'}); }); return P.svg(); })(),
  note:`${cd('s[6]')} sur 'PYTHON' lève IndexError : le dernier indice valide est 5.`},
 {h:'Les tranches',p:`${cd('s[a:b:c]')} prend les éléments d’indice <i>a</i> inclus à <i>b</i> <b>exclu</b>, de <i>c</i> en <i>c</i>. Si on omet <i>a</i>, on part du début. Si on omet <i>b</i>, on va jusqu’à la fin. ${cd('s[::-1]')} renverse.`,
  params:[{id:'a',l:'a',min:0,max:9,v:1},{id:'b',l:'b',min:0,max:9,v:5},{id:'c',l:'c',min:1,max:3,v:1}],
  draw:v=>{ const s='PROGRAMME', P=plane({x:[0,10],y:[0,2.8],grid:false,axes:false}); const sel=new Set(); for(let i=v.a;i<v.b;i+=v.c) sel.add(i);
    s.split('').forEach((ch,i)=>{ P.rect(0.5+i,0.9,1,0.8,{fill:sel.has(i)?'var(--spark)':'var(--surface)',fo:sel.has(i)?.5:1,c:'var(--code)',w:2}); P.text(1+i,1.3,ch,{a:'middle',dy:5,s:14}); P.text(1+i,2.15,String(i),{a:'middle',s:11,c:'var(--muted)'}); });
    P.seg(0.5+v.a,0.6,0.5+v.a,2,{c:'var(--ok)',w:3}); P.seg(0.5+v.b,0.6,0.5+v.b,2,{c:'var(--bad)',w:3,dash:true});
    P.text(0.5+v.a,0.6,'a',{a:'middle',dy:14,s:12,c:'var(--ok)'}); P.text(0.5+v.b,0.6,'b',{a:'middle',dy:14,s:12,c:'var(--bad)'}); return P.svg(); },
  info:v=>{ let r=''; for(let i=v.a;i<v.b;i+=v.c) r+='PROGRAMME'[i]; return `${cd(`s[${v.a}:${v.b}:${v.c}]`)} = ${cd(`'${r}'`)}`+(r?'':' (tranche vide)'); },
  note:'Une tranche ne lève jamais d’erreur : si a ≥ b, elle est simplement vide. Et len(s[a:b]) = b − a quand 0 ≤ a ≤ b ≤ len(s).'},
 {h:'La fin du mot',p:`Avec ${cd("s = 'ingenieur'")}, que vaut ${cd('s[-3:]')}&nbsp;?`,
  opts:[cd("'ieur'"),cd("'r'"),cd("'eur'"),cd("'nie'")],ans:2,
  why:`${cd('s[-3:]')} part de l’indice −3 (le e de « eur ») et va jusqu’à la fin : 'eur'. Les trois derniers caractères.`},
 {h:'Méthodes des chaînes',p:`Une chaîne est immuable : ses méthodes <b>renvoient une nouvelle chaîne</b> sans modifier l’originale. ${cd('split')} découpe en liste de mots, ${cd('join')} recolle une liste avec un séparateur.`,
  fig:py(`s = '  Bonjour le monde  '
s.strip()                # 'Bonjour le monde'
s.split()                # ['Bonjour', 'le', 'monde']
'-'.join(['a', 'b'])     # 'a-b'
'banane'.replace('a', 'o')   # 'bonone'
'banane'.find('n')       # 2 : premier indice trouvé
'nan' in 'banane'        # True
'Abc'.upper()            # 'ABC'`),
  note:`${cd('s.upper()')} seul ne sert à rien : il faut récupérer le résultat, par exemple ${cd('s = s.upper()')}.`},
 {h:'Enchaîner les méthodes',p:'Qu’affiche ce code&nbsp;?',fig:py(`print('-'.join('a b c'.split()).upper())`),
  opts:[cd('a-b-c'),cd('A-B-C'),cd('A B C'),cd("['A', 'B', 'C']")],ans:1,
  why:`'a b c'.split() donne ['a', 'b', 'c']. join les recolle avec '-' : 'a-b-c'. upper met en majuscules : A-B-C.`},
 {h:'Modifier une liste',p:`Une liste est mutable. ${cd('L[i] = x')} remplace un élément. ${cd('append')} ajoute à la fin, ${cd('insert(i, x)')} insère avant l’indice <i>i</i>, ${cd('pop()')} retire et renvoie le dernier, ${cd('remove(x)')} retire la première occurrence de <i>x</i>.`,
  fig:py(`L = [5, 3, 8]
L.append(1)       # [5, 3, 8, 1]
L.insert(0, 7)    # [7, 5, 3, 8, 1]
x = L.pop()       # x = 1, L = [7, 5, 3, 8]
L.remove(3)       # [7, 5, 8]
for i, v in enumerate(L):
    print(i, v)   # 0 7, puis 1 5, puis 2 8`),
  note:`${cd('L.sort()')} trie sur place et renvoie None. ${cd('sorted(L)')} renvoie une nouvelle liste triée. Donc ${cd('L = L.sort()')} perd la liste.`},
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
 {kind:'Défi',h:'Parcourir et filtrer',p:'Qu’affiche ce code&nbsp;?',fig:py(`mots = ['chat', 'Ours', 'zèbre', 'Ane']
res = []
for m in mots:
    if m[0].isupper():
        res.append(m.lower())
print(sorted(res))`),
  opts:[cd("['Ane', 'Ours']"),cd("['ours', 'ane']"),cd("['ane', 'ours']"),cd('None')],ans:2,
  why:`Seuls 'Ours' et 'Ane' commencent par une majuscule. On ajoute 'ours' puis 'ane'. sorted renvoie une nouvelle liste triée : ['ane', 'ours'].`},
]},

/* ===================== 6. TUPLES, DICTIONNAIRES, COMPRÉHENSIONS ===================== */
{subj:'ics',sem:'py',id:'cms-ics-dicos',h:'Tuples, dictionnaires et compréhensions',p:'Regrouper avec les tuples, associer clés et valeurs avec les dictionnaires, construire en une ligne avec les compréhensions.',steps:[
 {h:'Tuples et déballage',p:`Un <b>tuple</b> ${cd('(3, 4)')} est une séquence <b>immuable</b>. On le <b>déballe</b> en plusieurs noms : ${cd('x, y = t')}. C’est ainsi qu’une fonction renvoie plusieurs valeurs, et qu’on échange deux variables.`,
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
 {h:'Dictionnaires',p:`Un <b>dictionnaire</b> associe des <b>clés</b> à des <b>valeurs</b> : ${cd("{'Ana': 19, 'Ben': 20}")}. On lit ${cd("d['Ana']")}, on ajoute ou modifie par ${cd("d['Zoé'] = 21")}. Les clés sont uniques et doivent être immuables (int, str, tuple…).`,
  fig:py(`age = {'Ana': 19, 'Ben': 20}
age['Ana']          # 19
age.get('Zoé', 0)   # 0 : valeur par défaut si la clé manque
'Ben' in age        # True : in teste les clés
del age['Ben']      # retire la clé
for nom, a in age.items():   # couples (clé, valeur)
    print(nom, a)`),
  note:`${cd("age['Zoé']")} sur une clé absente lève KeyError. ${cd('keys()')}, ${cd('values()')} et ${cd('items()')} donnent les clés, les valeurs et les couples.`},
 {h:'Compter avec un dictionnaire',p:`Le motif classique pour compter : ${cd('d[c] = d.get(c, 0) + 1')}. Avance lettre par lettre dans ${cd("'abracadabra'")}.`+py(`d = {}
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
 {h:'Parcourir items()',p:'Qu’affiche ce code&nbsp;?',fig:py(`d = {'a': 3, 'b': 1, 'c': 2}
for k, v in d.items():
    if v > 1:
        print(k * v, end=' ')`),
  opts:[cd('aaa cc'),cd('a c'),cd('3 2'),cd('aaa b cc')],ans:0,
  why:`On parcourt les couples ('a', 3), ('b', 1), ('c', 2). Seuls a et c ont une valeur &gt; 1. 'a' * 3 = 'aaa' et 'c' * 2 = 'cc'.`},
 {h:'Compréhensions',p:`Une <b>compréhension</b> construit une liste en une ligne : ${cd('[expr for x in iterable if condition]')}. Elle équivaut à une boucle qui fait ${cd('append(expr)')}. Avec des accolades et ${cd('clé: valeur')}, on construit un dictionnaire.`,
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
 {kind:'Défi',h:'Dictionnaire de listes',p:'Qu’affiche ce code&nbsp;?',fig:py(`notes = {'Ana': [5, 6, 4], 'Ben': [3, 4], 'Léo': [6, 6, 5, 5]}
print(sum([len(L) for n, L in notes.items() if sum(L) / len(L) >= 5]))`),lab:'affichage :',ans:7,
  why:'Moyennes : Ana 5, Ben 3,5, Léo 5,5. On garde Ana et Léo, et on additionne leurs nombres de notes : 3 + 4 = 7.'},
]},

);
})();
