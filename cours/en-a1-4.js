/* Déclic — Anglais A1 (unités 10 à 12). Format : docs/ANGLAIS.md */
(()=>{
// Réponses acceptées. {a|b} donne une variante par option ; « it is », « my sister is »… donnent aussi « it’s », « my sister’s »
// (le moteur accepte I’m, don’t, you’re… mais pas ’s, ambigu entre is, has et le possessif).
const V=(...ts)=>{ const out=new Set(), S=/\b(?!this\b|is\b)([a-z]+) is\b/i;
  const apo=(pre,s)=>{ const m=S.exec(s); if(!m){ out.add(pre+s); return; } const a=s.slice(0,m.index), b=s.slice(m.index+m[0].length); apo(pre+a+m[0],b); apo(pre+a+m[1]+'’s',b); };
  const rec=s=>{ const m=/\{([^{}]*)\}/.exec(s); if(m){ m[1].split('|').forEach(o=>rec(s.slice(0,m.index)+o+s.slice(m.index+m[0].length))); return; }
    apo('',s.replace(/\s+/g,' ').replace(/\s+([,.?!])/g,'$1').trim()); };
  ts.forEach(rec); return [...out]; };

COURS.push(
/* ===================================================================== 10 */
{subj:'en', sem:'a1', id:'en-a1-now', o:10, h:'Right now', p:'Dire ce qui se passe en ce moment, décrire ce que les gens portent et parler du temps qu’il fait, avec le présent continu.', steps:[
 {kind:'Écoute', h:'Un appel du dimanche',
  p:`<p>À la fin de cette unité, tu sauras dire ce que tu fais en ce moment, décrire tes vêtements et ceux des autres, parler de la météo, et choisir entre le présent simple et le présent continu.</p>
<p>Emma, à Brighton, téléphone à son frère Jack, qui passe quelques jours à Édimbourg. <b>Écoute sans lire</b>, deux fois si tu veux, puis réponds. Le texte apparaîtra après ta réponse.</p>
<p><b>Question :</b> où est Jack, et quel temps fait-il chez lui&nbsp;?</p>`,
  audio:[['Emma','Hi Jack! It’s me. What are you doing?'],['Jack','Hi Emma! I’m sitting in a café in Edinburgh. I’m waiting for my friend Sam.'],['Emma','Lucky you! What’s the weather like?'],['Jack','Terrible. It’s raining and it’s really windy. I’m wearing two jumpers!'],['Emma','Two jumpers? In May?'],['Jack','This is Scotland! What about Brighton?'],['Emma','It’s sunny and warm. I’m sitting on the beach and I’m eating an ice cream.'],['Jack','Stop it! Oh, Sam is here. Talk to you later!'],['Emma','Bye!']], cache:true,
  opts:['Il est sur la plage, et il fait beau.','Il est chez lui, et il neige.','Il est dans un café, il pleut et il y a du vent.','Il est dans un café, et il fait chaud.'], ans:2,
  why:'<i lang="en">I’m sitting in a café… It’s raining and it’s really windy</i> : il est assis dans un café, il pleut et il y a beaucoup de vent. C’est Emma qui est sur la plage, au soleil. Remarque toutes ces formes en <i lang="en">-ing</i> : c’est le présent continu, le sujet de l’unité.'},

 {kind:'Vocabulaire', h:'Les vêtements',
  p:`<p>Jack porte deux pulls&nbsp;: voici de quoi décrire ce que tu portes. Touche une ligne pour l’entendre et répète-la. Ces mots entrent dans ta révision du vocabulaire.</p>`,
  mots:[['to wear','porter (un vêtement)','I’m wearing a blue shirt.'],['to put on','mettre (un vêtement)','Put on your coat, it’s cold!'],['to take off','enlever (un vêtement)','Take off your shoes, please.'],['a coat','un manteau','Where’s my coat?'],['a jacket','une veste, un blouson','I like your leather jacket.'],['a jumper / a sweater','un pull','I’m wearing two jumpers!'],['a shirt','une chemise'],['trousers','un pantalon','My trousers are too long.'],['jeans','un jean','These jeans are new.'],['a dress','une robe'],['a skirt','une jupe'],['shoes','des chaussures'],['trainers / sneakers','des baskets','Are you wearing trainers?'],['a hat','un chapeau, un bonnet'],['a scarf','une écharpe','It’s cold, take a scarf.']],
  note:'<b>Attention :</b> <i lang="en">trousers</i>, <i lang="en">jeans</i> et <i lang="en">shorts</i> sont toujours au pluriel en anglais : <i lang="en">My jeans <b>are</b> new</i> (pas « my jean is »). Pour en compter un, on dit <i lang="en">a pair of jeans</i>. Et méfie-toi des Américains : leurs <i lang="en">pants</i> sont un pantalon, mais en Grande-Bretagne, <i lang="en">pants</i> veut dire… un slip. <i lang="en">Jumper</i> est britannique, <i lang="en">sweater</i> se dit partout ; <i lang="en">trainers</i> est britannique, <i lang="en">sneakers</i> américain.'},

 {kind:'Pratique', h:'À toi : mets ton manteau',
  p:'Il fait froid et ton ami sort en t-shirt. Dis-lui en anglais&nbsp;: « Mets ton manteau&nbsp;! » <b>Question :</b> quelle est ta phrase&nbsp;?', lab:'En anglais', txt:V('Put on your coat!','Put your coat on!','Put on your coat, it is cold!','Put your coat on, it is cold!','Put on your coat, please!','Put your coat on, please!'),
  why:'<i lang="en">Put on your coat!</i> ou <i lang="en">Put your coat on!</i> Avec un nom, le petit mot <i lang="en">on</i> peut se placer avant ou après lui. C’est un impératif, comme ceux de l’unité <i lang="en">Around town</i> : le verbe seul, sans sujet.'},

 {kind:'Vocabulaire', h:'Quel temps fait-il ?',
  p:`<p>En Grande-Bretagne, la météo est le sujet de conversation numéro un : avec un voisin, un collègue, un inconnu à l’arrêt de bus. Voici l’essentiel. On l’utilise presque toujours avec <i lang="en">It’s…</i> : <i lang="en">It’s sunny, It’s cold, It’s raining</i>.</p>`,
  mots:[['What’s the weather like? / What is the weather like?','Quel temps fait-il ?','What’s the weather like in London?'],['sunny','ensoleillé : il fait soleil','It’s sunny and warm today.'],['to rain','pleuvoir','Take an umbrella, it’s raining.'],['to snow','neiger','Look! It’s snowing!'],['cloudy','nuageux, couvert','It’s cloudy but it isn’t cold.'],['windy','venteux : il y a du vent','It’s really windy on the beach.'],['hot','chaud, très chaud','It’s too hot in here!'],['warm','doux, agréablement chaud','It’s warm for March.'],['cold','froid','It’s cold this morning.'],['an umbrella','un parapluie'],['a degree','un degré','It’s twenty degrees.']],
  note:'Le français dit « il fait beau », « il y a du vent » ; l’anglais dit presque toujours <b>It’s</b> + adjectif (<i lang="en">It’s windy</i>) ou <b>It’s</b> + verbe en <i lang="en">-ing</i> (<i lang="en">It’s raining</i>). Le sujet <i lang="en">it</i> est obligatoire : jamais « Is raining ». Et tu entendras souvent <i lang="en">Lucky you!</i> (Veinard&nbsp;!), comme Emma au téléphone. Les Britanniques donnent la température en degrés Celsius, les Américains en Fahrenheit (68&nbsp;°F = 20&nbsp;°C).'},

 {kind:'Pratique', h:'À toi : la météo',
  p:'Ton amie t’appelle de Londres. Demande-lui en anglais&nbsp;: « Quel temps fait-il à Londres&nbsp;? » <b>Question :</b> quelle est ta question&nbsp;?', lab:'Ta question', txt:V('What is the weather like in London?','How is the weather in London?'),
  why:'<i lang="en">What’s the weather like in London?</i> Le petit mot <b>like</b> à la fin est indispensable : « What is the weather? » ne se dit pas. <i lang="en">How’s the weather in London?</i> est aussi correct.'},

 {kind:'Grammaire', h:'Le présent continu : ce qui se passe maintenant',
  p:`<p>Au téléphone, Jack dit <i lang="en">I’m sitting in a café</i>, <i lang="en">I’m waiting for Sam</i>, <i lang="en">It’s raining</i>. Il décrit ce qui se passe <b>au moment où il parle</b>. Pour cela, l’anglais a un temps spécial : le <b>présent continu</b> (<i lang="en">present continuous</i>).</p>
<div class="def"><p><b>Forme :</b> sujet + <b>am / is / are</b> + verbe + <b>-ing</b>.</p><ul><li><i lang="en">I <b>am</b> working</i> (<i lang="en">I’m working</i>)</li><li><i lang="en">he / she / it <b>is</b> working</i> (<i lang="en">she’s working</i>)</li><li><i lang="en">you / we / they <b>are</b> working</i> (<i lang="en">we’re working</i>)</li></ul><p>Négation : <i lang="en">I’m <b>not</b> working, she <b>isn’t</b> working, they <b>aren’t</b> working.</i> Question : <i lang="en"><b>Are</b> you working? <b>Is</b> she working?</i> Réponses courtes : <i lang="en">Yes, I am. / No, she isn’t.</i></p></div>
<div class="idea"><p>Le verbe <i lang="en">to be</i> fait tout le travail : il porte la personne, la négation et la question, exactement comme tu l’as appris dans les premières unités. Le verbe en <i lang="en">-ing</i> ne change jamais. Le présent continu sert pour :</p><ul><li>une action <b>en cours en ce moment</b> : <i lang="en">now, right now, at the moment, Look!, Listen!</i></li><li>une situation <b>temporaire</b>, autour de maintenant : <i lang="en">I’m staying with my aunt this week.</i></li></ul><p>C’est le « être en train de » du français, mais l’anglais l’emploie beaucoup plus : là où on dit simplement « il pleut » ou « je porte un pull », l’anglais dit <i lang="en">It’s raining</i>, <i lang="en">I’m wearing a jumper</i>.</p></div>
<div class="ex"><p><i lang="en">Emma is eating an ice cream.</i> = Emma mange une glace (en ce moment).<br><i lang="en">We aren’t watching TV.</i> = Nous ne regardons pas la télé.<br><i lang="en">What are you doing? – I’m cooking.</i> = Qu’est-ce que tu fais&nbsp;? – Je cuisine.</p></div>
<div class="warn"><p>Les deux oublis typiques : oublier <i lang="en">be</i> (« I wearing a coat » ✗ → <i lang="en">I’m wearing a coat</i>) ou oublier <i lang="en">-ing</i> (« I am wear a coat » ✗). Il faut toujours les <b>deux</b> morceaux.</p></div>`,
  audio:'I’m sitting in a café. It’s raining. Are you working today? No, I’m not. She isn’t wearing a coat.'},

 {kind:'Méthode', h:'Former le verbe en -ing et la question',
  p:`<p><b>Quand :</b> chaque fois que tu construis une phrase au présent continu. <b>Pourquoi :</b> l’orthographe du <i lang="en">-ing</i> suit trois règles simples qui gardent la prononciation du verbe, et la question se forme comme avec <i lang="en">to be</i>. <b>Comment :</b></p>
<ul><li>En général, on ajoute <b>-ing</b> : <i lang="en">work → working, wear → wearing, eat → eating, see → seeing</i>.</li><li>Un <b>e muet</b> final tombe : <i lang="en">make → making, write → writing, take → taking</i>.</li><li>Verbe d’<b>une syllabe</b> terminé par consonne + voyelle + consonne : on <b>double</b> la dernière consonne. <i lang="en">sit → sitting, run → running, swim → swimming, get → getting, put → putting</i>. Mais pas de doublement après <i lang="en">w, x, y</i> : <i lang="en">play → playing</i>.</li><li><i lang="en">-ie</i> devient <i lang="en">-ying</i> : <i lang="en">lie → lying</i> (être allongé).</li><li>Question : (mot interrogatif) + <b>am / is / are</b> + sujet + verbe-<i lang="en">ing</i> ? <i lang="en">Where are you going?</i></li></ul>`,
  demo:{enonce:'Avec <i lang="en">they / sit / in the garden</i>, écris la phrase au présent continu, puis la négation, puis la question avec <i lang="en">where</i>.',
   etapes:[{f:'<i lang="en">sit → sitting</i>',w:'Une syllabe, et elle finit par consonne + voyelle + consonne (s‑i‑t) : on double le t.'},
    {f:'<i lang="en">They are sitting in the garden.</i> → <i lang="en">They’re sitting in the garden.</i>',w:'Avec <i lang="en">they</i>, le verbe <i lang="en">to be</i> est <i lang="en">are</i>.'},
    {f:'<i lang="en">They aren’t sitting in the garden.</i>',w:'<i lang="en">not</i> se colle à <i lang="en">are</i> : <i lang="en">aren’t</i>. Le verbe en <i lang="en">-ing</i> ne bouge pas.'},
    {f:'<i lang="en">Where are they sitting?</i>',w:'Mot interrogatif, puis <i lang="en">are</i>, puis le sujet, puis <i lang="en">sitting</i> : le même ordre qu’avec <i lang="en">to be</i>.'}],
   conclusion:'<i lang="en">They’re sitting in the garden. They aren’t sitting in the garden. Where are they sitting?</i>'}},

 {kind:'Pratique', h:'À toi : be + -ing',
  p:'Complète avec le verbe <i lang="en">wear</i> au présent continu, et écris la phrase entière. <b>Question :</b> <i lang="en">My sister ___ a red dress today.</i>', lab:'Ta phrase', txt:V('My sister is wearing a red dress today.','Today my sister is wearing a red dress.'),
  why:'<i lang="en">My sister</i> = <i lang="en">she</i>, donc <i lang="en">is</i> : <i lang="en">My sister is wearing a red dress today.</i> (ou <i lang="en">My sister’s wearing…</i>)'},

 {kind:'Pratique', h:'À toi : doubler ou pas ?',
  p:'Écris en anglais (être assis = <i lang="en">to sit</i>, au présent continu). <b>Question :</b> « Nous sommes assis dans le jardin. »', lab:'Ta phrase', txt:['We are sitting in the garden.'],
  why:'<i lang="en">We’re sitting in the garden.</i> <i lang="en">sit</i> finit par consonne + voyelle + consonne : on double le t. Le français dit « nous sommes assis », l’anglais « nous sommes en train de nous asseoir » : <i lang="en">sitting</i>.'},

 {kind:'Pratique', h:'À toi : une question',
  p:'Transforme la phrase en question. <b>Question :</b> <i lang="en">Your parents are watching TV.</i>', lab:'Ta question', txt:['Are your parents watching TV?','Are your parents watching television?'],
  why:'On inverse le sujet et <i lang="en">are</i> : <i lang="en">Are your parents watching TV?</i> Réponses courtes : <i lang="en">Yes, they are. / No, they aren’t.</i>'},

 {kind:'Grammaire', h:'Présent simple ou présent continu ?',
  p:`<p>Emma habite à Brighton (<i lang="en">She lives in Brighton</i>), mais aujourd’hui, elle est sur la plage (<i lang="en">She’s sitting on the beach</i>). Le français dit « elle habite » et « elle est assise » au même temps. L’anglais, lui, choisit entre deux présents selon le sens.</p>
<div class="def"><ul><li><b>Présent simple</b> (unités <i lang="en">Daily routine</i> et <i lang="en">Work and questions</i>) : les habitudes, la routine, ce qui est vrai en général. Mots typiques : <i lang="en">every day, usually, often, never, on Mondays</i>.</li><li><b>Présent continu</b> : ce qui se passe maintenant, ou en ce moment de façon temporaire. Mots typiques : <i lang="en">now, right now, at the moment, today, this week, Look!</i></li></ul></div>
<div class="ex"><p><i lang="en">I usually <b>wear</b> a suit, but today I<b>’m wearing</b> jeans.</i><br><i lang="en">It <b>rains</b> a lot in Scotland. Look, it<b>’s raining</b> now!</i><br><i lang="en">What <b>do</b> you <b>do</b>? – I’m a nurse.</i> (ton métier) / <i lang="en">What <b>are</b> you <b>doing</b>? – I’m cooking.</i> (maintenant)</p></div>
<div class="warn"><p>Les <b>verbes d’état</b> (ce qu’on pense, ressent, possède) restent au présent simple, même maintenant : <i lang="en">like, love, hate, want, need, know, understand, believe, remember</i>. On dit <i lang="en">I <b>know</b></i>, pas « I’m knowing » ; <i lang="en">I <b>want</b> a coffee</i>, pas « I’m wanting » ; <i lang="en"><b>Do</b> you <b>understand</b>?</i>, pas « Are you understanding? ». C’est une faute très fréquente chez les francophones, qui pensent « je suis en train de comprendre ».</p></div>`,
  audio:'I usually wear a suit, but today I’m wearing jeans. It rains a lot in Scotland. Look, it’s raining now! What do you do? I’m a nurse. What are you doing? I’m cooking.'},

 {kind:'Pratique', h:'À toi : habitude ou maintenant ?',
  p:'Complète avec les verbes entre parenthèses, au bon temps, et écris la phrase entière. <b>Question :</b> <i lang="en">I usually ___ (take) the bus, but today I ___ (walk).</i>', lab:'Ta phrase', txt:['I usually take the bus, but today I am walking.'],
  why:'<i lang="en">usually</i> annonce une habitude : présent simple, <i lang="en">take</i>. <i lang="en">today</i> annonce une exception, temporaire : présent continu, <i lang="en">I’m walking</i>.'},

 {kind:'Pratique', h:'Remets la phrase dans l’ordre',
  p:'Touche les mots dans le bon ordre pour dire que ton amie ne porte pas de manteau aujourd’hui.',
  ordre:['She','isn’t','wearing','a','coat','today.'], alt:['Today she isn’t wearing a coat.'],
  why:'<i lang="en">She isn’t wearing a coat today.</i> Sujet, <i lang="en">isn’t</i>, verbe en <i lang="en">-ing</i>, complément, puis le moment.'},

 {kind:'Pratique', h:'Corrige l’erreur',
  p:'Cette phrase contient une faute typique des francophones. Écris-la correctement. <b>Question :</b> <i lang="en">I am not understanding the question.</i>', lab:'Ta phrase', txt:['I do not understand the question.'],
  why:'<i lang="en">understand</i> est un verbe d’état : il reste au présent simple, même maintenant. Négation avec <i lang="en">do</i> : <i lang="en">I don’t understand the question.</i>'},

 {kind:'Prononciation', h:'Le son -ing',
  p:`<p>Tu vas prononcer des dizaines de mots en <i lang="en">-ing</i>. Les francophones disent souvent « ine » (comme dans « cuisine ») ou « in‑gue », avec un g bien audible. Les deux sont faux.</p>
<div class="def"><p>Le son <b>/ŋ/</b> de <i lang="en">-ing</i> se fait <b>au fond de la bouche</b> : l’arrière de la langue touche le palais, et l’air passe par le nez. C’est le son final de « parking » prononcé à la française, mais <b>sans</b> faire entendre le g. On le retrouve dans <i lang="en">thing, long, morning, evening</i>.</p></div>
<div class="idea"><p>La terminaison n’est jamais accentuée : on appuie sur le verbe, pas sur <i lang="en">-ing</i>. <i lang="en"><b>SIT</b>ting, <b>RAIN</b>ing, <b>WEAR</b>ing, <b>MOR</b>ning</i>. Écoute, puis répète lentement chaque mot.</p></div>`,
  audio:'sitting, raining, wearing, morning, evening, thing, long. It’s raining this morning.'},

 {kind:'Oral', h:'Répète : la pluie',
  p:`<p>Écoute la phrase, puis dis-la à voix haute en touchant « Dire la phrase ». Soigne les deux <i lang="en">-ing</i> et appuie sur les mots importants : <i lang="en">It’s <b>RAIN</b>ing and I’m <b>NOT</b> <b>WEAR</b>ing a <b>COAT</b>.</i></p>`,
  dire:'It’s raining and I’m not wearing a coat.'},

 {kind:'Lecture', h:'Une carte postale de Cornouailles',
  p:`<p>Lisa est en vacances avec sa famille. Elle écrit à sa grand-mère. Lis la carte (tu peux aussi l’écouter), puis réponds.</p>
<div class="blk" data-t="Postcard"><p lang="en">Hi Grandma! I’m writing this postcard on the beach in Cornwall. The weather is lovely today: it’s sunny and it’s about twenty-five degrees. Dad is swimming in the sea, Mum is reading a book and my little brother Leo is building a sandcastle. I’m wearing my new sunglasses and my favourite hat. It often rains here, but not this week! We usually go to France in the summer, but this year we’re staying in a small cottage near the sea. I love it here. See you soon! Love, Lisa</p></div>
<p><b>Question :</b> où la famille de Lisa passe-t-elle l’été d’habitude&nbsp;?</p>`,
  audio:'Hi Grandma! I’m writing this postcard on the beach in Cornwall. The weather is lovely today: it’s sunny and it’s about twenty-five degrees. Dad is swimming in the sea, Mum is reading a book and my little brother Leo is building a sandcastle. I’m wearing my new sunglasses and my favourite hat. It often rains here, but not this week! We usually go to France in the summer, but this year we’re staying in a small cottage near the sea. I love it here. See you soon! Love, Lisa',
  opts:['En Cornouailles','À Londres','En France','En Écosse'], ans:2,
  why:'<i lang="en">We <b>usually go</b> to France in the summer, but this year we<b>’re staying</b> in a small cottage</i> : d’habitude (présent simple) en France, cette année (présent continu, temporaire) en Cornouailles. Le texte joue exactement sur le contraste des deux présents.'},

 {kind:'Dictée', h:'Dictée : il fait froid',
  p:'Écoute et écris exactement la phrase. Tu peux réécouter autant que tu veux, et utiliser « Plus lentement ».',
  dictee:'It’s cold today, so I’m wearing a scarf.',
  why:'Vérifie <i lang="en">It’s</i> (avec l’apostrophe : <i lang="en">it is</i>), <i lang="en">wearing</i> (avec <i lang="en">ea</i>) et <i lang="en">scarf</i>.'},

 {kind:'Oral', h:'Décris ce que tu portes',
  p:`<p>À toi de parler, 30 secondes à une minute. Où es-tu, quel temps fait-il, que portes-tu, et que font les personnes autour de toi (ou chez toi) en ce moment&nbsp;? Utilise le présent continu, et le présent simple pour une habitude. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'I’m at home in my kitchen. It’s cloudy and a bit cold today, but it isn’t raining. I’m wearing jeans, a grey jumper and my old trainers. My sister is sitting next to me. She’s doing her homework, and my dad is cooking dinner. He usually cooks on Sundays. It smells good!',
   criteres:['J’ai dit où je suis','J’ai décrit la météo avec It’s…','J’ai décrit mes vêtements avec I’m wearing…','J’ai dit ce que font d’autres personnes (is / are + -ing)','J’ai prononcé -ing sans « gue » ni « ine »']}},

 {kind:'Écriture', h:'Un message depuis ton week-end',
  p:'Tu passes quelques jours ailleurs (en vacances, chez des amis…). Écris un message à un ami (au moins 35 mots) : où tu es, quel temps il fait, ce que tu fais en ce moment, ce que tu portes, et termine par une question.',
  ecrire:{min:35, modele:'Hi Tom! I’m in Edinburgh with my cousin this week. It’s cold and windy, and it’s raining again! I’m wearing my big coat and a scarf. Right now we’re sitting in a nice café and we’re drinking hot chocolate. What are you doing today?',
   criteres:[{t:'J’ai utilisé le présent continu (am / is / are + -ing)', re:"\\b(am|is|are|i['’]m|[a-z]+['’]re|[a-z]+['’]s)\\s+(not\\s+)?[a-z]+ing\\b"},{t:'J’ai parlé de la météo', re:'\\b(sunny|raining|rainy|snowing|cloudy|windy|cold|hot|warm|weather|degrees)\\b'},{t:'J’ai dit ce que je porte (wearing)', re:'\\bwearing\\b'},'J’ai laissé les verbes d’état (like, want, know…) au présent simple',{t:'J’ai posé une question', re:'\\?'}]}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>Présent continu</b> : sujet + <i lang="en">am / is / are</i> + verbe-<i lang="en">ing</i>. <i lang="en">I’m working, she isn’t working, Are they working? – Yes, they are.</i> Toujours les deux morceaux, <i lang="en">be</i> et <i lang="en">-ing</i>.</li><li>Orthographe : <i lang="en">make → making</i> (e muet tombe), <i lang="en">sit → sitting</i> (consonne doublée), <i lang="en">play → playing</i>, <i lang="en">lie → lying</i>.</li><li><b>Présent simple</b> pour les habitudes (<i lang="en">usually, every day</i>), <b>présent continu</b> pour maintenant et le temporaire (<i lang="en">now, today, this week, Look!</i>). <i lang="en">What do you do?</i> = ton métier ; <i lang="en">What are you doing?</i> = maintenant.</li><li>Verbes d’état jamais au continu : <i lang="en">I know, I want, I like, Do you understand?</i></li><li>Vêtements : <i lang="en">wear, put on, take off, a coat, a jumper, trousers, jeans, trainers, a scarf</i>. <i lang="en">My jeans are…</i> (pluriel).</li><li>Météo : <i lang="en">What’s the weather like? It’s sunny / cloudy / windy / cold / warm. It’s raining. It’s snowing.</i></li><li>Prononciation : <i lang="en">-ing</i> = /ŋ/, au fond de la bouche, sans g final.</li></ul></div>`},

 {kind:'Mission', h:'Un appel depuis la gare',
  p:'Ben attend son train à Manchester. Sa mère l’appelle. Écoute le dialogue, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Mum','Hello, darling! Where are you?'],['Ben','Hi Mum. I’m at the station in Manchester. I’m waiting for the train.'],['Mum','Is it late?'],['Ben','Yes, it’s twenty minutes late. And it’s snowing here!'],['Mum','Snow? Are you wearing your warm coat?'],['Ben','Yes, and my hat and my scarf. Don’t worry!'],['Mum','Good. So what are you doing now?'],['Ben','I’m having a coffee and I’m reading a book.'],['Mum','OK. Call me from the train!']], cache:true,
  parts:[
   {q:'a) Quel temps fait-il à Manchester&nbsp;?', opts:['Il pleut.','Il neige.','Il y a du vent.','Il fait beau.'], ans:1, hint:'Ben dit <i lang="en">It’s …ing here!</i> et sa mère répète le mot, étonnée.', why:'<i lang="en">It’s snowing here!</i> – <i lang="en">Snow?</i> : il neige.'},
   {q:'b) Combien de minutes de retard a le train&nbsp;? Écris le nombre en chiffres.', lab:'Minutes', txt:['20','twenty'], hint:'Écoute la phrase avec <i lang="en">late</i>.', why:'<i lang="en">It’s twenty minutes late</i> : 20 minutes de retard.'},
   {q:'c) Que fait Ben en ce moment&nbsp;?', opts:['Il dort sur un banc.','Il achète son billet.','Il boit un café et lit un livre.','Il téléphone à son père.'], ans:2, hint:'Écoute sa réponse à <i lang="en">What are you doing now?</i>', why:'<i lang="en">I’m having a coffee and I’m reading a book.</i> <i lang="en">have</i> se met au continu quand il veut dire manger ou boire : <i lang="en">I’m having a coffee</i>.'},
   {q:'d) Tu es Ben. Ta mère demande <i lang="en">Are you wearing your warm coat?</i> Écris la réponse courte affirmative.', lab:'Ta réponse', txt:['Yes, I am.','Yes, I am wearing my warm coat.','Yes, I am wearing it.'], hint:'Réponse courte : <i lang="en">Yes</i> + sujet + auxiliaire, sans contraction.', why:'<i lang="en">Yes, I am.</i> On reprend l’auxiliaire <i lang="en">am</i>, sans le contracter.'}],
  sol:'<p lang="en">Mum: Hello, darling! Where are you? – Ben: Hi Mum. I’m at the station in Manchester. I’m waiting for the train. – Is it late? – Yes, it’s twenty minutes late. And it’s snowing here! – Snow? Are you wearing your warm coat? – Yes, and my hat and my scarf. Don’t worry! – Good. So what are you doing now? – I’m having a coffee and I’m reading a book. – OK. Call me from the train!</p><p>Il neige, le train a 20 minutes de retard, Ben boit un café et lit. Réponse courte : <i lang="en">Yes, I am.</i></p>'},

 {kind:'Mission', h:'Une photo d’Islande',
  p:`<p>Ton amie Chloe t’envoie une photo de vacances avec ce message. Lis-le, puis réponds. Certaines questions demandent d’écrire en anglais.</p>
<div class="blk" data-t="Message"><p lang="en">Hi! Here’s a photo from our holiday in Iceland. Can you find me? I’m on the left, in the red jacket. My boyfriend Matt is standing next to me: he’s the tall guy in the black hat. He isn’t smiling because he’s really cold! It’s usually cloudy here, but today it’s sunny and we’re walking on a glacier. It’s only two degrees! What about you? Are you having a good week?</p></div>`,
  parts:[
   {q:'a) Comment reconnaître Chloe sur la photo&nbsp;?', opts:['Elle porte un bonnet noir.','Elle est à droite, en manteau bleu.','Elle sourit, au centre.','Elle est à gauche, en veste rouge.'], ans:3, hint:'Cherche <i lang="en">I’m on the…</i>', why:'<i lang="en">I’m on the left, in the red jacket</i> : à gauche, en veste rouge. Le bonnet noir, c’est Matt.'},
   {q:'b) Pourquoi Matt ne sourit-il pas&nbsp;?', opts:['Il est fatigué.','Il a très froid.','Il est triste.','Il a faim.'], ans:1, hint:'Cherche <i lang="en">because</i>.', why:'<i lang="en">He isn’t smiling because he’s really cold</i> : il a très froid. En anglais, on <b>est</b> froid : <i lang="en">I’m cold</i> = j’ai froid.'},
   {q:'c) Écris en anglais : « D’habitude il fait nuageux ici, mais aujourd’hui il fait soleil. »', lab:'Ta phrase', txt:V('It is usually cloudy here, but today it is sunny.','Usually it is cloudy here, but today it is sunny.','It is usually cloudy here, but it is sunny today.','Usually it is cloudy here, but it is sunny today.'), hint:'La phrase est dans le message. <i lang="en">usually</i> se place après <i lang="en">is</i>.', why:'<i lang="en">It’s usually cloudy here, but today it’s sunny.</i> Avec <i lang="en">to be</i>, l’adverbe de fréquence se place <b>après</b> le verbe.'},
   {q:'d) Décris Matt en anglais : « Matt porte un bonnet noir, mais il ne porte pas de manteau. »', lab:'Ta phrase', txt:V('Matt is wearing a black hat, but he is not wearing a coat.','Matt is wearing a black hat, but he is not wearing a jacket.'), hint:'Deux fois le présent continu : <i lang="en">is wearing</i>, puis <i lang="en">isn’t wearing</i>. « pas de manteau » = <i lang="en">a coat</i> après la négation.', why:'<i lang="en">Matt’s wearing a black hat, but he isn’t wearing a coat.</i> L’adjectif se place devant le nom : <i lang="en">a black hat</i>, et « pas de » devient <i lang="en">not … a</i>.'}],
  sol:'<p>Chloe est à gauche en veste rouge, Matt à côté d’elle en bonnet noir ; il ne sourit pas parce qu’il a froid (<i lang="en">he’s really cold</i>). D’habitude il fait nuageux, mais aujourd’hui il fait soleil et ils marchent sur un glacier, par 2 degrés.</p><p>Phrases attendues : <i lang="en">It’s usually cloudy here, but today it’s sunny.</i> (présent simple + adverbe de fréquence pour l’habitude) et <i lang="en">Matt’s wearing a black hat, but he isn’t wearing a coat.</i> (présent continu pour ce qu’on voit sur la photo).</p>'},
]},

/* ===================================================================== 11 */
{subj:'en', sem:'a1', id:'en-a1-past-be', o:11, h:'Where were you?', p:'Dire où on était et comment c’était, donner une date et parler du passé avec <i lang="en">was</i> et <i lang="en">were</i>, <i lang="en">yesterday</i>, <i lang="en">last</i> et <i lang="en">ago</i>.', steps:[
 {kind:'Écoute', h:'Où étais-tu vendredi ?',
  p:`<p>À la fin de cette unité, tu sauras dire où tu étais et comment c’était, poser des questions sur le passé, situer un moment (<i lang="en">yesterday, last week, two days ago</i>) et donner une date.</p>
<p>Lundi matin, au bureau. Lily parle avec son collègue Sam. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> pourquoi Sam n’était-il pas à la réunion de vendredi&nbsp;?</p>`,
  audio:[['Lily','Morning, Sam! Where were you on Friday? You weren’t at the meeting.'],['Sam','No, I wasn’t. I was at home. I was ill.'],['Lily','Oh no! Are you OK now?'],['Sam','Yes, I’m fine, thanks. Was the meeting long?'],['Lily','Yes, it was! Two hours. And it was really boring.'],['Sam','Were the new managers there?'],['Lily','Yes, they were. They were very nice, actually.'],['Sam','Good. Oh, and happy birthday for yesterday! It was the twelfth, right?'],['Lily','Yes, it was! Thank you!']], cache:true,
  opts:['Il était en vacances.','Il était chez le médecin.','Il était malade, chez lui.','Il était à un anniversaire.'], ans:2,
  why:'<i lang="en">I was at home. I was ill.</i> : il était chez lui, malade. <i lang="en">was</i> et <i lang="en">were</i>, partout dans ce dialogue, sont le passé de <i lang="en">to be</i>.'},

 {kind:'Vocabulaire', h:'Hier, la semaine dernière, il y a deux jours',
  p:`<p>Pour parler du passé, il faut d’abord savoir dire <b>quand</b>. Touche une ligne pour l’entendre et répète-la.</p>`,
  mots:[['yesterday','hier','I was at home yesterday.'],['last night','hier soir, la nuit dernière','Where were you last night?'],['the day before yesterday','avant-hier'],['last weekend','le week-end dernier','It was sunny last weekend.'],['last week','la semaine dernière'],['last year','l’année dernière'],['two days ago','il y a deux jours','I was in Paris two days ago.'],['I was born in…','Je suis né(e) en / à…','I was born in 2004.'],['How was your weekend?','Comment s’est passé ton week-end ?','How was your weekend? – It was great!'],['It was great!','C’était génial !'],['It was boring','C’était ennuyeux'],['ill','malade (sick en américain)','I was ill on Friday.'],['actually','en fait (pas « actuellement »)','They were very nice, actually.']],
  note:'<b>Faux ami :</b> <i lang="en">actually</i> veut dire « en fait, en réalité », jamais « actuellement » (qui se dit <i lang="en">at the moment</i> ou <i lang="en">currently</i>). Lily dit <i lang="en">They were very nice, actually</i> : en fait, ils étaient très sympas.'},

 {kind:'Grammaire', h:'Was et were : le passé de to be',
  p:`<p>Sam dit <i lang="en">I <b>was</b> at home. I <b>was</b> ill</i>, et Lily dit <i lang="en">They <b>were</b> very nice</i>. Pour dire « j’étais », « c’était », « ils étaient », l’anglais met simplement <i lang="en">to be</i> au passé. Il n’a que <b>deux formes</b>.</p>
<div class="def"><ul><li><i lang="en">I / he / she / it <b>was</b></i></li><li><i lang="en">you / we / they <b>were</b></i></li></ul><p>Négation : <b>wasn’t</b> (<i lang="en">was not</i>), <b>weren’t</b> (<i lang="en">were not</i>). À l’affirmatif, pas de contraction. Et <i lang="en">there is / there are</i> devient <b>there was / there were</b> : <i lang="en">There were thirty people at the meeting.</i></p></div>
<div class="idea"><p><i lang="en">was / were</i> décrit un état, un lieu, une qualité à un moment terminé du passé. Le français traduit selon le cas par « j’étais », « j’ai été », « c’était » ou « il y avait » ; l’anglais, lui, dit toujours <i lang="en">was / were</i>. <i lang="en">It was great!</i> = C’était génial ! <i lang="en">I was ill on Friday</i> = J’ai été malade vendredi.</p></div>
<div class="ex"><p><i lang="en">The meeting was long.</i> = La réunion a été longue.<br><i lang="en">We were tired last night.</i> = Nous étions fatigués hier soir.<br><i lang="en">I was ten in 2014.</i> = J’avais dix ans en 2014 (l’âge se dit avec <i lang="en">be</i>, même au passé).</p></div>
<div class="warn"><p>Trois pièges : <b>you were</b>, même pour une seule personne (« you was » ✗). « Je suis né » se dit au passé : <i lang="en">I <b>was</b> born in Lyon</i> (« I am born » ✗). Et « il y avait » se dit <i lang="en">there was / there were</i>, pas « there had ».</p></div>`,
  audio:'I was at home. Sam was ill. The meeting was long. We were tired. You were late! There were thirty people at the meeting. I was born in Lyon.'},

 {kind:'Méthode', h:'Dire non et poser une question avec was et were',
  p:`<p><b>Quand :</b> pour nier un état passé ou poser une question sur le passé avec <i lang="en">to be</i>. <b>Pourquoi ça marche :</b> <i lang="en">was / were</i> se comportent exactement comme <i lang="en">am / is / are</i> : pas besoin d’auxiliaire. <b>Comment :</b></p>
<ul><li>Négation : <i lang="en">was <b>not</b></i> → <b>wasn’t</b> ; <i lang="en">were <b>not</b></i> → <b>weren’t</b>.</li><li>Question fermée : on <b>inverse</b> : <i lang="en"><b>Was</b> he…? <b>Were</b> you…?</i></li><li>Réponse courte : <i lang="en">Yes, I was. / No, I wasn’t. Yes, they were. / No, they weren’t.</i></li><li>Question ouverte : mot interrogatif + <i lang="en">was / were</i> + sujet : <i lang="en">Where were you? How was the film? What was the weather like?</i></li></ul>`,
  demo:{enonce:'Transforme <i lang="en">They were at the cinema.</i> en négation, puis en question fermée avec ses réponses courtes, puis pose la question avec <i lang="en">where</i>.',
   etapes:[{f:'Négation : <i lang="en">They were <b>not</b> at the cinema.</i> → <i lang="en">They weren’t at the cinema.</i>',w:'<i lang="en">not</i> se place juste après <i lang="en">were</i>, et se contracte en <i lang="en">weren’t</i>.'},
    {f:'Question : <i lang="en"><b>Were they</b> at the cinema?</i>',w:'On inverse <i lang="en">they</i> et <i lang="en">were</i>, comme avec <i lang="en">Are they…?</i> au présent.'},
    {f:'Réponses courtes : <i lang="en">Yes, they were.</i> / <i lang="en">No, they weren’t.</i>',w:'On reprend le sujet et <i lang="en">were</i>, sans le reste de la phrase.'},
    {f:'Question ouverte : <i lang="en">Where were they?</i>',w:'Le mot interrogatif d’abord, puis <i lang="en">were</i>, puis le sujet.'}],
   conclusion:'<i lang="en">They weren’t at the cinema. Were they at the cinema? – Yes, they were. / No, they weren’t. Where were they?</i>'}},

 {kind:'Pratique', h:'À toi : was ou were ?',
  p:'Complète avec <i lang="en">was</i> ou <i lang="en">were</i>, et écris la phrase entière. <b>Question :</b> <i lang="en">My parents ___ in Spain last week, but my sister ___ at home.</i>', lab:'Ta phrase', txt:['My parents were in Spain last week, but my sister was at home.'],
  why:'<i lang="en">My parents</i> = <i lang="en">they</i> → <i lang="en">were</i> ; <i lang="en">my sister</i> = <i lang="en">she</i> → <i lang="en">was</i>.'},

 {kind:'Pratique', h:'À toi : la négation',
  p:'Écris la phrase à la forme négative. <b>Question :</b> <i lang="en">The museum was open on Monday.</i>', lab:'Ta phrase', txt:['The museum was not open on Monday.','On Monday the museum was not open.'],
  why:'<i lang="en">The museum wasn’t open on Monday.</i> On pourrait aussi dire <i lang="en">The museum was closed on Monday</i>, mais ici on demandait la négation.'},

 {kind:'Pratique', h:'À toi : où étais-tu ?',
  p:'Ton collègue n’était pas au bureau hier. Pose-lui la question en anglais. <b>Question :</b> « Où étais-tu hier&nbsp;? »', lab:'Ta question', txt:['Where were you yesterday?'],
  why:'<i lang="en">Where were you yesterday?</i> Mot interrogatif, puis <i lang="en">were</i>, puis le sujet. Avec <i lang="en">you</i>, toujours <i lang="en">were</i>.'},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:'Touche les mots dans le bon ordre pour demander quel temps il faisait hier.',
  ordre:['What','was','the','weather','like','yesterday?'], alt:['Yesterday what was the weather like?'],
  why:'<i lang="en">What was the weather like yesterday?</i> La même question qu’au présent (<i lang="en">What’s the weather like?</i>), avec <i lang="en">was</i>. Le <i lang="en">like</i> final reste indispensable.'},

 {kind:'Grammaire', h:'Yesterday, last et ago',
  p:`<p>Sam dit <i lang="en">on Friday</i>, Lily parle de son anniversaire <i lang="en">yesterday</i>. Pour situer un moment passé, l’anglais a trois outils, chacun avec ses règles.</p>
<div class="def"><ul><li><b>yesterday</b> (hier) : <i lang="en">yesterday morning, yesterday afternoon, yesterday evening</i>. Mais « hier soir » se dit surtout <b>last night</b>.</li><li><b>last</b> + moment, <b>sans</b> <i lang="en">the</i> : <i lang="en">last week, last month, last year, last weekend, last Monday, last summer</i>.</li><li>durée + <b>ago</b> : « il y a » + durée. <i lang="en">ten minutes ago, two days ago, three years ago, a long time ago</i>. <i lang="en">ago</i> se place <b>après</b> la durée.</li></ul></div>
<div class="idea"><p>Ces expressions se mettent à la fin de la phrase, ou au début pour insister : <i lang="en">I was in Canada last year.</i> / <i lang="en">Last year, I was in Canada.</i> Avec une date, on garde les prépositions habituelles : <i lang="en">on Friday, on 12 May, in May, in 2019</i>.</p></div>
<div class="ex"><p><i lang="en">I was at the gym two hours ago.</i> = J’étais à la salle de sport il y a deux heures.<br><i lang="en">Where were you last night?</i> = Où étais-tu hier soir&nbsp;?</p></div>
<div class="warn"><p>Piège n°1 des francophones : « il y a deux ans » ne se traduit jamais par <i lang="en">there is</i>. « There is two years I was in London » ✗ → <i lang="en">I was in London <b>two years ago</b></i>. Piège n°2 : « la semaine dernière » = <i lang="en">last week</i>, sans <i lang="en">the</i> ; <i lang="en">the last week</i> veut dire « les sept derniers jours ».</p></div>`,
  audio:'I was at the gym two hours ago. Where were you last night? I was in Canada last year. Last year, I was in Canada.'},

 {kind:'Pratique', h:'À toi : il y a…',
  p:'Écris en anglais. <b>Question :</b> « J’étais à Londres il y a trois ans. »', lab:'Ta phrase', txt:V('I was in London three years ago.','Three years ago{,|} I was in London.'),
  why:'<i lang="en">I was in London three years ago.</i> « il y a » + durée = durée + <i lang="en">ago</i>, jamais <i lang="en">there is</i>.'},

 {kind:'Vocabulaire', h:'Les mois et les nombres ordinaux',
  p:`<p>Pour donner une date, il faut les mois et les nombres <b>ordinaux</b> (premier, deuxième, troisième…). Touche une ligne pour l’entendre. Les mois prennent toujours une <b>majuscule</b> en anglais.</p>`,
  mots:[['January','janvier'],['February','février','My birthday is in February.'],['March','mars'],['April','avril'],['May','mai'],['June','juin'],['July','juillet'],['August','août'],['September','septembre'],['October','octobre'],['November','novembre'],['December','décembre','Christmas is on the twenty-fifth of December.'],['first (1st)','premier, première','It was my first day.'],['second (2nd)','deuxième'],['third (3rd)','troisième'],['When’s your birthday? / When is your birthday?','C’est quand, ton anniversaire ?','When’s your birthday? – It’s on the third of May.']],
  note:'Écoute bien <i lang="en">February</i> (« fèb‑rou‑eri », souvent « fèb‑iou‑eri ») et <i lang="en">August</i> (« ô‑gueust »). Les autres ordinaux se forment avec <i lang="en">-th</i> : c’est l’étape suivante.'},

 {kind:'Méthode', h:'Dire et écrire une date',
  p:`<p><b>Quand :</b> pour un anniversaire, un rendez-vous, un formulaire, une réservation. <b>Pourquoi :</b> le français dit « le cinq mai », mais l’anglais dit « le <b>cinquième</b> de mai » : il faut un nombre ordinal. <b>Comment :</b></p>
<ul><li><b>Ordinal</b> = nombre + <b>-th</b> : <i lang="en">fourth, sixth, seventh, tenth, thirteenth</i>. Sauf <i lang="en">first, second, third</i>. Orthographe à surveiller : <i lang="en">fifth</i> et <i lang="en">twelfth</i> (ve → f), <i lang="en">eighth</i> (un seul t), <i lang="en">ninth</i> (sans e), <i lang="en">twentieth, thirtieth</i> (y → ie).</li><li>Nombres composés : seul le dernier mot change : <i lang="en">twenty-first, twenty-second, thirty-first</i>. En chiffres : <i lang="en">1st, 2nd, 3rd, 4th, 21st, 22nd, 23rd</i>.</li><li><b>Dire</b> : <i lang="en">the fifth of May</i> ou <i lang="en">May the fifth</i>. <b>Écrire</b> (britannique) : <i lang="en">5 May</i> ou <i lang="en">5th May</i>. En américain : <i lang="en">May 5</i>, et 05/04 veut dire 4 mai… mais 5 avril au Royaume-Uni&nbsp;!</li><li>Prépositions : <b>on</b> + date ou jour, <b>in</b> + mois ou année. <i lang="en">on the fifth of May, in May, in 2019</i>.</li><li><b>Années</b> : par paires de chiffres. 1998 = <i lang="en">nineteen ninety-eight</i>, 2019 = <i lang="en">twenty nineteen</i>. Mais 2005 = <i lang="en">two thousand and five</i>.</li></ul>`,
  demo:{enonce:'Lis la date 21/03 (format européen), puis écris en anglais : « Le concert était le 21 mars. »',
   etapes:[{f:'21 → <i lang="en">twenty-first</i> (21st)',w:'Seul le dernier mot devient ordinal : <i lang="en">one → first</i>. « twenty-one of March » serait faux.'},
    {f:'03 → <i lang="en">March</i>',w:'Troisième mois, avec une majuscule.'},
    {f:'On dit : <i lang="en">the twenty-first of March</i> (ou <i lang="en">March the twenty-first</i>)',w:'Ordre britannique le plus courant : <i lang="en">the</i> + ordinal + <i lang="en">of</i> + mois.'},
    {f:'<i lang="en">The concert was <b>on</b> the twenty-first of March.</i>',w:'<i lang="en">on</i> devant une date, et <i lang="en">was</i> parce que c’est passé. À l’écrit : <i lang="en">on 21 March</i>.'}],
   conclusion:'<i lang="en">The concert was on the twenty-first of March.</i> (écrit : <i lang="en">on 21 March</i> ou <i lang="en">on 21st March</i>)'}},

 {kind:'Écoute', h:'Quelle date ?',
  p:'Écoute et écris la date en chiffres, au format jour.mois (par exemple 3.5 pour le 3 mai). <b>Question :</b> quand était le concert&nbsp;?', audio:'The concert was on the twenty-second of November.', cache:true, lab:'Date', txt:['22.11'],
  why:'<i lang="en">the twenty-second of November</i> = le 22 novembre : 22.11. <i lang="en">twenty-second</i> : seul le dernier mot devient ordinal (<i lang="en">two → second</i>).'},

 {kind:'Pratique', h:'À toi : ton anniversaire',
  p:'Écris en anglais (la date en lettres ou en chiffres). <b>Question :</b> « Mon anniversaire est le 3 juillet. »', lab:'Ta phrase', txt:V('My birthday is on the third of July.','My birthday is on {3|3rd} July.','My birthday is on the 3rd of July.','My birthday is on July the third.','My birthday is on July {third|3|3rd}.','My birthday is the third of July.','My birthday is {3|3rd} July.','My birthday is July {third|3|3rd}.'),
  why:'<i lang="en">My birthday is on the third of July</i> (écrit : <i lang="en">on 3 July</i>). <i lang="en">on</i> devant une date, et un ordinal : <i lang="en">third</i>, pas « three ».'},

 {kind:'Prononciation', h:'Le th des ordinaux',
  p:`<p>Presque tous les ordinaux finissent par <i lang="en">-th</i> : <i lang="en">fourth, fifth, sixth, tenth, twelfth</i>. Les francophones disent souvent « fourse », « fourt » ou « fif ». On ne comprend alors plus s’il s’agit de <i lang="en">four</i> ou de <i lang="en">fourth</i>.</p>
<div class="def"><p>Le son <b>/θ/</b> : pose le bout de la langue <b>entre les dents</b>, sans serrer, et souffle doucement. Pas de voix, juste de l’air, comme un s « zézayé ». Tu le retrouves dans <i lang="en">third, Thursday, thirteen, birthday</i>.</p></div>
<div class="idea"><p>Bonus : dans une phrase, <i lang="en">was</i> et <i lang="en">were</i> sont faibles, presque avalés (« wəz », « wə ») : <i lang="en">I was at HOME</i>. Ils redeviennent forts dans une réponse courte : <i lang="en">Yes, I WAS.</i></p></div>`,
  audio:'third, fourth, fifth, sixth, twelfth, thirtieth. My birthday is on the fourth of March.'},

 {kind:'Oral', h:'Répète : jeudi trois',
  p:`<p>Écoute la phrase, puis dis-la à voix haute. Trois <i lang="en">th</i> à soigner : langue entre les dents.</p>`,
  dire:'Her birthday was on Thursday, the third of March.'},

 {kind:'Lecture', h:'Une nuit à Édimbourg',
  p:`<p>Lis ce petit texte (tu peux aussi l’écouter). <i lang="en">Hogmanay</i> est le nom écossais du réveillon du Nouvel An.</p>
<div class="blk" data-t="A night to remember"><p lang="en">My grandparents live in Edinburgh. On the thirty-first of December 1999, they were in the city centre for Hogmanay, the big Scottish New Year party. It was a very special night: at midnight, it was the year 2000! There were thousands of people in the streets. The weather was terrible: it was cold and windy, and there was a little snow. But nobody was sad. The music was loud and the fireworks were amazing. “It was the best party of our lives,” says my grandma. “We were very tired the next day, but we were so happy!”</p></div>
<p><b>Question :</b> pourquoi cette nuit était-elle spéciale&nbsp;?</p>`,
  audio:'My grandparents live in Edinburgh. On the thirty-first of December 1999, they were in the city centre for Hogmanay, the big Scottish New Year party. It was a very special night: at midnight, it was the year 2000! There were thousands of people in the streets. The weather was terrible: it was cold and windy, and there was a little snow. But nobody was sad. The music was loud and the fireworks were amazing. “It was the best party of our lives,” says my grandma. “We were very tired the next day, but we were so happy!”',
  opts:['C’était l’anniversaire de la grand-mère.','C’était le passage à l’an 2000.','Il faisait très beau.','C’était le jour de leur mariage.'], ans:1,
  why:'<i lang="en">On the thirty-first of December 1999… at midnight, it was the year 2000!</i> : le passage à l’an 2000. Le temps était mauvais (<i lang="en">terrible</i>). Remarque <i lang="en">there were thousands of people</i> et <i lang="en">there was a little snow</i> : il y avait.'},

 {kind:'Dictée', h:'Dictée : au cinéma',
  p:'Écoute et écris exactement les deux phrases. Tu peux réécouter et utiliser « Plus lentement ».',
  dictee:'We weren’t at home last night. We were at the cinema.',
  why:'<i lang="en">weren’t</i> (avec l’apostrophe) puis <i lang="en">were</i> : <i lang="en">we</i> prend toujours <i lang="en">were</i>. Et « hier soir » = <i lang="en">last night</i>.'},

 {kind:'Oral', h:'Raconte où tu étais',
  p:`<p>À toi de parler, 30 secondes à une minute. Où étais-tu le week-end dernier, avec qui, comment c’était, quel temps il faisait&nbsp;? Termine en donnant la date de ton anniversaire. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'Last weekend I was in Geneva with my best friend. The weather was beautiful: it was sunny and warm. On Saturday we were in the old town, and on Sunday we were by the lake. It was great, but I was very tired on Monday! Oh, and my birthday is on the ninth of October.',
   criteres:['J’ai situé le moment (last weekend, on Saturday…)','J’ai utilisé was et were correctement (I was, we were)','J’ai dit comment c’était (It was great, boring…)','J’ai décrit la météo au passé (It was sunny…)','J’ai donné une date avec un ordinal (the ninth of October)']}},

 {kind:'Écriture', h:'Désolé, je n’étais pas là',
  p:'Tu n’étais pas au cours d’anglais (ou à l’entraînement) mardi dernier. Écris un message (au moins 35 mots) à ton professeur ou à ton entraîneur : excuse-toi, dis où tu étais et pourquoi, et pose une question sur ce que tu as manqué.',
  ecrire:{min:35, modele:'Hi Mrs Taylor, I’m sorry I wasn’t in class last Tuesday. I was ill, so I was at home in bed. I’m fine now, thanks! Was the lesson about dates? What was the homework? See you on Thursday. Best wishes, Julie',
   criteres:[{t:'J’ai utilisé was ou were', re:'\\b(was|were)\\b'},{t:'J’ai utilisé une négation (wasn’t, weren’t)', re:"\\b(wasn['’]t|weren['’]t|was not|were not)\\b"},{t:'J’ai situé le moment (last…, yesterday, ago, on + jour)', re:'\\b(last|yesterday|ago|on (monday|tuesday|wednesday|thursday|friday|saturday|sunday))\\b'},'J’ai expliqué pourquoi j’étais absent(e)',{t:'J’ai posé une question', re:'\\?'}]}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>was / were</b> : <i lang="en">I, he, she, it was</i> ; <i lang="en">you, we, they were</i>. Négation : <i lang="en">wasn’t, weren’t</i>. Question : <i lang="en">Were you…? – Yes, I was. / No, I wasn’t.</i> <i lang="en">Where were you? How was it?</i></li><li><i lang="en">there was / there were</i> = il y avait. <i lang="en">I was born in…</i> = je suis né(e)…</li><li>Moments : <i lang="en">yesterday, last night</i> (hier soir), <i lang="en">the day before yesterday, last week / month / year</i> (sans <i lang="en">the</i>), durée + <b>ago</b> (<i lang="en">two days ago</i>), jamais <i lang="en">there is</i>.</li><li>Dates : ordinaux <i lang="en">first, second, third, fourth… fifth, twelfth, twentieth, twenty-first</i>. Dire <i lang="en">the third of May</i> ; écrire <i lang="en">3 May</i>. <i lang="en">on</i> + date, <i lang="en">in</i> + mois ou année. Mois avec majuscule.</li><li>Années : 1998 = <i lang="en">nineteen ninety-eight</i>, 2005 = <i lang="en">two thousand and five</i>, 2019 = <i lang="en">twenty nineteen</i>.</li><li>Prononciation : <i lang="en">th</i> = langue entre les dents (<i lang="en">fourth, fifth, Thursday</i>). Faux ami : <i lang="en">actually</i> = en fait.</li></ul></div>`},

 {kind:'Mission', h:'Aux objets trouvés',
  p:'Helen a oublié son sac dans un train. Elle se rend au bureau des objets trouvés de la gare. Écoute le dialogue, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Clerk','Good morning. Can I help you?'],['Helen','Yes, I hope so. I’m looking for my bag. It was on a train yesterday morning.'],['Clerk','Which train were you on?'],['Helen','The eight fifteen from Oxford to London. I was in coach C.'],['Clerk','And what colour was the bag?'],['Helen','It was black. A small black backpack.'],['Clerk','Was there a name in it?'],['Helen','Yes, there was. My name is on a card: Helen Ward.'],['Clerk','One moment… Is this your bag?'],['Helen','Yes, it is! Thank you so much!']], cache:true,
  parts:[
   {q:'a) Dans quelle voiture du train était Helen&nbsp;?', opts:['A','B','C','D'], ans:2, hint:'Une voiture de train se dit <i lang="en">coach</i> (ou <i lang="en">carriage</i>).', why:'<i lang="en">I was in coach C.</i>'},
   {q:'b) À quelle heure partait le train d’Oxford&nbsp;? Écris l’heure en chiffres (par exemple 9.30).', lab:'Heure', txt:['8.15','08.15','8h15'], hint:'<i lang="en">The eight fifteen from Oxford</i> : l’heure se lit par paires de chiffres.', why:'<i lang="en">the eight fifteen</i> = le train de 8 h 15. Les Britanniques désignent souvent un train par son heure de départ.'},
   {q:'c) Réponds en anglais à la question de l’employé : <i lang="en">What colour was the bag?</i>', lab:'Ta réponse', txt:['It was black.','Black.','It was a small black backpack.','It was a black backpack.','A small black backpack.'], hint:'Passé de <i lang="en">it is</i> + la couleur.', why:'<i lang="en">It was black.</i> La question est au passé, la réponse aussi : <i lang="en">was</i>.'},
   {q:'d) Écris en anglais : « J’étais dans le train hier matin. »', lab:'Ta phrase', txt:V('I was on the train yesterday morning.','Yesterday morning{,|} I was on the train.'), hint:'Helen dit <i lang="en">It was on a train</i> : en anglais, on est <b>on</b> a train. « hier matin » = <i lang="en">yesterday morning</i>.', why:'<i lang="en">I was on the train yesterday morning.</i> On est <i lang="en">on</i> un train, un bus, un avion (mais <i lang="en">in</i> une voiture).'}],
  sol:'<p lang="en">Clerk: Good morning. Can I help you? – Helen: Yes, I hope so. I’m looking for my bag. It was on a train yesterday morning. – Which train were you on? – The eight fifteen from Oxford to London. I was in coach C. – And what colour was the bag? – It was black. A small black backpack. – Was there a name in it? – Yes, there was. My name is on a card: Helen Ward. – One moment… Is this your bag? – Yes, it is! Thank you so much!</p><p>Helen était dans la voiture C du train de 8 h 15. Le sac était noir. <i lang="en">I was on the train yesterday morning.</i></p>'},

 {kind:'Mission', h:'Une fête manquée',
  p:`<p>Tu reçois ce message de ton amie Kate. Lis-le attentivement (les dates comptent), puis réponds. Plusieurs questions demandent d’écrire en anglais.</p>
<div class="blk" data-t="Message"><p lang="en">Hi Alex! Where were you on Saturday? It was Mia’s thirtieth birthday party! All her friends were there, and her parents were there too. The food was fantastic and the music was great. Mia’s brother was the DJ! We were all sad because you weren’t there. Were you ill? Or were you at work again? Her birthday was on Saturday, the fourteenth of June. That was two days ago, and she’s still talking about it! Call me! Kate</p></div>`,
  parts:[
   {q:'a) Quel âge a Mia maintenant&nbsp;? Écris le nombre en chiffres.', lab:'Âge', txt:['30','thirty'], hint:'Cherche un nombre ordinal devant <i lang="en">birthday</i>.', why:'<i lang="en">Mia’s thirtieth birthday</i> : son trentième anniversaire, elle a 30 ans.'},
   {q:'b) Quel jour Kate écrit-elle ce message&nbsp;?', opts:['le samedi 14 juin','le lundi 16 juin','le jeudi 12 juin','le mardi 2 juin'], ans:1, hint:'La fête était le 14 juin, et Kate écrit <i lang="en">That was two days ago</i>.', why:'Samedi 14 juin + deux jours = lundi 16 juin. <i lang="en">two days ago</i> = il y a deux jours.'},
   {q:'c) Réponds à Kate en anglais : « Non, je n’étais pas malade. J’étais à Londres. »', lab:'Ta réponse', txt:['No, I was not ill. I was in London.','No, I was not sick. I was in London.'], hint:'Négation de <i lang="en">I was</i>, puis <i lang="en">in</i> + ville.', why:'<i lang="en">No, I wasn’t ill. I was in London.</i> (<i lang="en">sick</i> en américain)'},
   {q:'d) Pose une question à Kate en anglais : « Comment était la fête&nbsp;? »', lab:'Ta question', txt:['How was the party?','What was the party like?'], hint:'Comme <i lang="en">How was your weekend?</i>', why:'<i lang="en">How was the party?</i> ou <i lang="en">What was the party like?</i>'},
   {q:'e) Écris la date de l’anniversaire de Mia en anglais, comme on la dit : « le 14 juin ».', lab:'La date', txt:V('{the |}fourteenth of June','June {the |}fourteenth','{14|14th} June','the 14th of June','June {14|14th}'), hint:'Un ordinal : <i lang="en">four → fourth</i>, donc <i lang="en">fourteen → …</i>', why:'<i lang="en">the fourteenth of June</i> (écrit : <i lang="en">14 June</i>). Langue entre les dents pour le <i lang="en">th</i> final&nbsp;!'}],
  sol:'<p>Mia a fêté ses 30 ans (<i lang="en">thirtieth birthday</i>) le samedi 14 juin ; Kate écrit deux jours plus tard (<i lang="en">two days ago</i>), donc le lundi 16 juin.</p><p>Réponses possibles : <i lang="en">No, I wasn’t ill. I was in London. How was the party?</i> La date se dit <i lang="en">the fourteenth of June</i> et s’écrit <i lang="en">14 June</i>.</p>'},
]},

/* ===================================================================== 12 */
{subj:'en', sem:'a1', id:'en-a1-weekend', o:12, h:'Last weekend', p:'Raconter son week-end au prétérit : verbes réguliers en <i lang="en">-ed</i> et leur prononciation, verbes irréguliers courants, questions et négations avec <i lang="en">did</i>.', steps:[
 {kind:'Écoute', h:'Lundi matin, au café',
  p:`<p>À la fin de cette unité, tu sauras raconter ton week-end ou une journée passée, prononcer les verbes en <i lang="en">-ed</i>, utiliser les verbes irréguliers les plus fréquents, et poser des questions au passé.</p>
<p>Lundi matin, Chloe et Dan prennent un café avant le travail. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> qu’a fait Chloe pendant le week-end&nbsp;?</p>`,
  audio:[['Chloe','Hi Dan! How was your weekend?'],['Dan','Really good, thanks. On Saturday I played football with my brother, and in the evening we watched a film.'],['Chloe','Nice. What did you watch?'],['Dan','An old horror film. It was terrible! And on Sunday I visited my grandparents. We had lunch in a little restaurant by the river. What about you? Did you go out?'],['Chloe','No, I didn’t. I stayed at home. I cleaned the flat and I cooked.'],['Dan','That sounds boring!'],['Chloe','Not at all! I had a lie-in, I read a good book and I slept a lot. It was perfect!']], cache:true,
  opts:['Elle a joué au football avec son frère.','Elle est restée chez elle et s’est reposée.','Elle est sortie avec des amis.','Elle a rendu visite à ses grands-parents.'], ans:1,
  why:'<i lang="en">I stayed at home. I cleaned the flat and I cooked… I had a lie-in, I read a good book and I slept a lot.</i> Elle est restée chez elle, a fait le ménage, cuisiné, lu et dormi. Le football et les grands-parents, c’est Dan.'},

 {kind:'Vocabulaire', h:'Le week-end : sortir ou rester chez soi',
  p:`<p>Les expressions pour raconter un week-end. Elles sont données à l’infinitif : tu apprendras juste après à les mettre au passé. Touche une ligne pour l’entendre et répète-la.</p>`,
  mots:[['What did you do at the weekend?','Qu’est-ce que tu as fait ce week-end ?','What did you do at the weekend? – Not much.'],['Not much.','Pas grand-chose.'],['to go out','sortir (le soir, avec des amis)','We go out on Friday nights.'],['to stay in / to stay at home','rester à la maison','I want to stay in tonight.'],['to have a lie-in','faire la grasse matinée','I always have a lie-in on Sundays.'],['to go for a walk','aller se promener','Let’s go for a walk by the river.'],['to go shopping','faire les magasins, faire des achats'],['to have dinner','dîner','We have dinner at seven.'],['to tidy my room','ranger ma chambre'],['to meet friends','retrouver des amis','I often meet friends in town.'],['to have a good time','passer un bon moment','Have a good time!'],['That sounds great!','Ça a l’air super !']],
  note:'<i lang="en">at the weekend</i> est britannique ; les Américains disent <i lang="en">on the weekend</i>. Et <i lang="en">a lie-in</i> (la grasse matinée) est une expression typiquement britannique : un Américain dira <i lang="en">I slept in</i>.'},

 {kind:'Pratique', h:'À toi : la grasse matinée',
  p:'Écris en anglais, au présent simple (c’est une habitude). <b>Question :</b> « Le dimanche, je fais la grasse matinée. »', lab:'Ta phrase', txt:V('On Sundays{,|} I have a lie-in.','I have a lie-in on Sundays.','On Sunday{,|} I have a lie-in.','I have a lie-in on Sunday.','On Sundays{,|} I always have a lie-in.','I always have a lie-in on Sundays.'),
  why:'<i lang="en">On Sundays I have a lie-in.</i> « faire la grasse matinée » = <i lang="en">have a lie-in</i> : le verbe est <i lang="en">have</i>, pas <i lang="en">make</i> ni <i lang="en">do</i>.'},

 {kind:'Grammaire', h:'Le prétérit des verbes réguliers',
  p:`<p>Dan raconte : <i lang="en">I <b>played</b> football, we <b>watched</b> a film, I <b>visited</b> my grandparents</i>. Chloe : <i lang="en">I <b>stayed</b> at home, I <b>cleaned</b> the flat</i>. Ces verbes sont au <b>prétérit</b> (<i lang="en">past simple</i>), le temps du récit en anglais.</p>
<div class="def"><p><b>Emploi :</b> une action <b>terminée</b>, à un moment passé précis ou évident : <i lang="en">yesterday, last weekend, on Saturday, in 2010, two days ago</i>.</p><p><b>Forme des verbes réguliers :</b> base verbale + <b>-ed</b>, <b>la même à toutes les personnes</b>. <i lang="en">I played, you played, she played, they played.</i> Pas de <i lang="en">-s</i>, pas d’auxiliaire.</p></div>
<div class="idea"><p>Orthographe, avec les mêmes réflexes que pour <i lang="en">-ing</i> :</p><ul><li>verbe en <b>-e</b> : on ajoute seulement <b>-d</b> : <i lang="en">like → liked, live → lived</i>.</li><li><b>consonne + y</b> → <b>-ied</b> : <i lang="en">study → studied, tidy → tidied, try → tried</i>. Mais voyelle + y : <i lang="en">play → played, stay → stayed</i>.</li><li>une syllabe, consonne + voyelle + consonne : on <b>double</b> : <i lang="en">stop → stopped, plan → planned</i>.</li></ul></div>
<div class="ex"><p><i lang="en">We watched a film on Saturday.</i> = Nous avons regardé un film samedi.<br><i lang="en">She tidied her room yesterday.</i> = Elle a rangé sa chambre hier.</p></div>
<div class="warn"><p>Le prétérit traduit le plus souvent notre <b>passé composé</b> (« j’ai joué »). Mais n’imite pas sa forme : « I have played football yesterday » ✗. Avec un moment passé précis, l’anglais veut le prétérit : <i lang="en">I played football yesterday.</i> Et pas de <i lang="en">be</i> devant : « I was played » ✗.</p></div>`,
  audio:'I played football. We watched a film. She visited her grandparents. They stayed at home. He studied all weekend.'},

 {kind:'Pratique', h:'À toi : un verbe régulier',
  p:'Mets la phrase au prétérit en remplaçant <i lang="en">every Saturday</i> par <i lang="en">last Saturday</i>. <b>Question :</b> <i lang="en">We play tennis every Saturday.</i>', lab:'Ta phrase', txt:V('We played tennis last Saturday.','Last Saturday{,|} we played tennis.'),
  why:'<i lang="en">We played tennis last Saturday.</i> <i lang="en">play</i> finit par voyelle + y : on ajoute simplement <i lang="en">-ed</i>.'},

 {kind:'Pratique', h:'À toi : l’orthographe en -ed',
  p:'Écris en anglais (<i lang="en">to tidy</i> = ranger, <i lang="en">to study</i> = étudier). <b>Question :</b> « Elle a rangé sa chambre et elle a étudié. »', lab:'Ta phrase', txt:['She tidied her room and she studied.','She tidied her room and studied.','She tidied her bedroom and she studied.','She tidied her bedroom and studied.'],
  why:'<i lang="en">She tidied her room and studied.</i> Consonne + y → <i lang="en">-ied</i> : <i lang="en">tidied, studied</i>. Et « elle a rangé » = un seul mot, <i lang="en">tidied</i> : pas de <i lang="en">has</i>.'},

 {kind:'Prononciation', h:'Trois façons de dire -ed',
  p:`<p>C’est LA faute de prononciation des francophones au passé : dire « watch‑èd », « cook‑èd », en ajoutant une syllabe. En réalité, <i lang="en">-ed</i> ne fait une syllabe en plus que dans un cas sur trois.</p>
<div class="def"><ul><li><b>/t/</b> après un son sourd (p, k, s, f, ch, sh) : <i lang="en">watched</i> (« watcht »), <i lang="en">cooked, stopped, helped, washed, liked</i>. Une seule syllabe.</li><li><b>/d/</b> après un son sonore ou une voyelle : <i lang="en">played</i> (« pléïd »), <i lang="en">stayed, cleaned, lived, called, tidied</i>. Une seule syllabe.</li><li><b>/ɪd/</b> seulement après <b>t</b> ou <b>d</b> : <i lang="en">wanted, visited, needed, waited, started</i>. Là, une syllabe en plus : <i lang="en">vis‑i‑ted</i>.</li></ul></div>
<div class="idea"><p>Pourquoi : après t ou d, on ne pourrait pas entendre un deuxième t ou d collé (« wantd »), alors on ajoute une voyelle. Partout ailleurs, le <i lang="en">-ed</i> se colle au verbe.</p></div>`,
  audio:'watched, cooked, stopped. played, cleaned, stayed. wanted, visited, needed. I watched a film, I cleaned the flat and I visited my aunt.'},

 {kind:'Pratique', h:'Une syllabe en plus ?',
  p:'Dans un seul de ces verbes, la terminaison <i lang="en">-ed</i> forme une syllabe en plus. <b>Question :</b> lequel&nbsp;?', opts:['liked','played','started','washed'], ans:2,
  why:'<i lang="en">started</i> finit par t avant <i lang="en">-ed</i> : /ɪd/, « star‑tid ». <i lang="en">liked</i> et <i lang="en">washed</i> se disent /t/, <i lang="en">played</i> /d/, en une syllabe.'},

 {kind:'Oral', h:'Répète : trois sons',
  p:`<p>Écoute, puis dis la phrase à voix haute. Trois verbes, trois sons : <i lang="en">stayed</i> (/d/), <i lang="en">cooked</i> (/t/), <i lang="en">visited</i> (/ɪd/). Ne rajoute pas de syllabe à <i lang="en">stayed</i> ni à <i lang="en">cooked</i>.</p>`,
  dire:'I stayed in, cooked dinner and visited my aunt.'},

 {kind:'Grammaire', h:'Les verbes irréguliers les plus courants',
  p:`<p>Chloe dit <i lang="en">I <b>had</b> a lie-in, I <b>read</b> a good book and I <b>slept</b> a lot.</i> Ces verbes ne prennent pas <i lang="en">-ed</i> : ils sont <b>irréguliers</b>. Il y en a une centaine, mais une quinzaine suffit pour raconter presque tout un week-end.</p>
<div class="def"><p>Un verbe irrégulier a une forme de prétérit à apprendre par cœur : <i lang="en">go → <b>went</b>, have → <b>had</b>, do → <b>did</b>, see → <b>saw</b>, eat → <b>ate</b></i>… Comme pour les réguliers, elle est <b>la même à toutes les personnes</b> : <i lang="en">I went, she went, they went</i>.</p></div>
<div class="idea"><p>Les plus fréquents sont aussi les plus irréguliers : ce sont les verbes de tous les jours (aller, avoir, faire, voir). Apprends-les avec une petite phrase, pas en liste sèche : <i lang="en">We went to the beach. I had a shower.</i> La révision du vocabulaire te les redemandera. Dans les expressions, seul le verbe change : <i lang="en">go out → went out, have a lie-in → had a lie-in, go shopping → went shopping</i>.</p></div>
<div class="warn"><p>Pas de <i lang="en">-ed</i> en plus : « goed », « buyed », « wented » ✗. Et <i lang="en">read</i> s’écrit pareil au passé mais se prononce « rèd », comme la couleur <i lang="en">red</i>.</p></div>`,
  mots:[['went','passé de go (aller)','We went to the beach.'],['had','passé de have (avoir, prendre)','I had a shower.'],['did','passé de do (faire)','I did my homework.'],['got','passé de get (obtenir, arriver)','I got home at ten.'],['saw','passé de see (voir)','I saw Tom in town.'],['made','passé de make (fabriquer, préparer)','She made a cake.'],['ate','passé de eat (manger)','We ate pizza.'],['drank','passé de drink (boire)','He drank a lot of coffee.'],['bought','passé de buy (acheter)','I bought a new jacket.'],['met','passé de meet (rencontrer, retrouver)','We met at the station.'],['came','passé de come (venir)','My cousins came for lunch.'],['took','passé de take (prendre)','I took the bus.'],['slept','passé de sleep (dormir)','I slept for ten hours!'],['read','passé de read (lire), prononcé « rèd »','I read a good book.']]},

 {kind:'Pratique', h:'À toi : les irréguliers',
  p:'Écris en anglais. <b>Question :</b> « Samedi, je suis allé au cinéma et j’ai mangé une pizza. »', lab:'Ta phrase', txt:V('On Saturday{,|} I went to the cinema and {I |}ate a pizza.','I went to the cinema on Saturday and {I |}ate a pizza.','On Saturday{,|} I went to the cinema and {I |}had a pizza.','I went to the cinema on Saturday and {I |}had a pizza.','On Saturday{,|} I went to the movies and {I |}ate a pizza.','I went to the movies on Saturday and {I |}ate a pizza.'),
  why:'<i lang="en">On Saturday I went to the cinema and ate a pizza.</i> « je suis allé » = <i lang="en">went</i>, « j’ai mangé » = <i lang="en">ate</i> (ou <i lang="en">had</i>). Pas de <i lang="en">am</i> ni de <i lang="en">have</i> : un seul mot suffit.'},

 {kind:'Méthode', h:'Négation et questions au prétérit : did',
  p:`<p><b>Quand :</b> pour dire qu’une chose n’a pas eu lieu, ou demander ce qui s’est passé. <b>Pourquoi ça marche :</b> exactement comme <i lang="en">do / does</i> au présent (unité <i lang="en">Work and questions</i>) ; ici l’auxiliaire <b>did</b> porte le passé, donc le verbe principal revient à sa <b>base</b>. Le passé n’est marqué qu’une fois. <b>Comment :</b></p>
<ul><li>Négation : sujet + <b>didn’t</b> (<i lang="en">did not</i>) + base : <i lang="en">I didn’t go out. She didn’t watch the film.</i></li><li>Question : (mot interrogatif) + <b>did</b> + sujet + base ? <i lang="en">Did you go out? What did you do? Where did they go?</i></li><li>Réponses courtes : <i lang="en">Yes, I did. / No, I didn’t.</i></li><li>Exception : <i lang="en">to be</i> n’utilise jamais <i lang="en">did</i>. <i lang="en">Were you tired? I wasn’t at home.</i> (« Did you be » ✗)</li></ul>`,
  demo:{enonce:'À partir de <i lang="en">Sam went to the beach on Sunday.</i>, écris la négation, la question fermée avec ses réponses courtes, puis la question avec <i lang="en">where</i>.',
   etapes:[{f:'Repère le verbe : <i lang="en">went</i> = prétérit de <i lang="en">go</i>.',w:'Avec <i lang="en">did</i>, il faudra la base verbale : <i lang="en">go</i>.'},
    {f:'Négation : <i lang="en">Sam <b>didn’t go</b> to the beach on Sunday.</i>',w:'<i lang="en">did</i> porte déjà le passé, donc <i lang="en">went</i> redevient <i lang="en">go</i>. « didn’t went » est faux.'},
    {f:'Question : <i lang="en"><b>Did</b> Sam <b>go</b> to the beach on Sunday?</i> – <i lang="en">Yes, he did. / No, he didn’t.</i>',w:'<i lang="en">did</i> passe devant le sujet. La réponse courte reprend <i lang="en">did</i>.'},
    {f:'Question ouverte : <i lang="en"><b>Where did</b> Sam <b>go</b> on Sunday?</i>',w:'Mot interrogatif + <i lang="en">did</i> + sujet + base verbale.'}],
   conclusion:'<i lang="en">Sam didn’t go to the beach. Did Sam go to the beach? – Yes, he did. Where did Sam go on Sunday?</i>'}},

 {kind:'Pratique', h:'À toi : la négation avec didn’t',
  p:'Écris la phrase à la forme négative. <b>Question :</b> <i lang="en">They bought a new car.</i>', lab:'Ta phrase', txt:['They did not buy a new car.'],
  why:'<i lang="en">They didn’t buy a new car.</i> <i lang="en">bought</i> redevient <i lang="en">buy</i> après <i lang="en">didn’t</i>.'},

 {kind:'Pratique', h:'À toi : qu’as-tu fait ?',
  p:'Pose la question en anglais. <b>Question :</b> « Qu’est-ce que tu as fait samedi&nbsp;? »', lab:'Ta question', txt:['What did you do on Saturday?','What did you do last Saturday?','On Saturday, what did you do?'],
  why:'<i lang="en">What did you do on Saturday?</i> Le premier <i lang="en">do</i> est l’auxiliaire au passé (<i lang="en">did</i>), le second est le verbe « faire » à la base.'},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:'Touche les mots dans le bon ordre pour demander à quelqu’un s’il a passé un bon moment.',
  ordre:['Did','you','have','a','good','time?'],
  why:'<i lang="en">Did you have a good time?</i> <i lang="en">Did</i> + sujet + base (<i lang="en">have</i>, pas <i lang="en">had</i>). Réponse : <i lang="en">Yes, I did!</i>'},

 {kind:'Pratique', h:'Corrige l’erreur',
  p:'Cette question contient une faute très fréquente. Écris-la correctement. <b>Question :</b> <i lang="en">Did you saw the match yesterday?</i>', lab:'Ta question', txt:['Did you see the match yesterday?','Did you watch the match yesterday?','Yesterday, did you see the match?'],
  why:'Après <i lang="en">did</i>, la base verbale : <i lang="en">Did you see the match yesterday?</i> Le passé est déjà dans <i lang="en">did</i>.'},

 {kind:'Lecture', h:'Un week-end à la ferme',
  p:`<p>Lis ce récit tiré d’un blog (tu peux aussi l’écouter), puis réponds. Repère les verbes au prétérit, réguliers et irréguliers.</p>
<div class="blk" data-t="Our weekend in Wales"><p lang="en">Last weekend my friends and I visited a farm in Wales. We left London early on Saturday morning and we arrived at about eleven. The farmer, a funny old man called Gareth, showed us his animals. The children played with the lambs and we collected eggs for breakfast. In the afternoon it rained, so we stayed in and played cards by the fire. On Sunday morning we had a big breakfast, then we walked in the hills and took lots of photos. We didn’t want to leave! We got home at nine in the evening, tired but very happy.</p></div>
<p><b>Question :</b> que s’est-il passé le samedi après-midi&nbsp;?</p>`,
  audio:'Last weekend my friends and I visited a farm in Wales. We left London early on Saturday morning and we arrived at about eleven. The farmer, a funny old man called Gareth, showed us his animals. The children played with the lambs and we collected eggs for breakfast. In the afternoon it rained, so we stayed in and played cards by the fire. On Sunday morning we had a big breakfast, then we walked in the hills and took lots of photos. We didn’t want to leave! We got home at nine in the evening, tired but very happy.',
  opts:['Ils se sont promenés dans les collines.','Ils sont rentrés à Londres.','Il a plu : ils sont restés à l’intérieur et ont joué aux cartes.','Ils ont ramassé des œufs.'], ans:2,
  why:'<i lang="en">In the afternoon it rained, so we stayed in and played cards by the fire.</i> La promenade dans les collines, c’était dimanche. Irréguliers du texte : <i lang="en">left</i> (leave), <i lang="en">had, took, got</i>.'},

 {kind:'Dictée', h:'Dictée : un dimanche tranquille',
  p:'Écoute et écris exactement les deux phrases. Attention aux terminaisons en <i lang="en">-ed</i> : on ne les entend presque pas.',
  dictee:'We didn’t go out on Sunday. We stayed at home and watched a film.',
  why:'<i lang="en">didn’t go</i> (base après <i lang="en">didn’t</i>), puis <i lang="en">stayed</i> et <i lang="en">watched</i> : le <i lang="en">-ed</i> s’écrit toujours, même quand il se prononce /d/ ou /t/.'},

 {kind:'Oral', h:'Raconte ton week-end',
  p:`<p>À toi de parler, 30 secondes à une minute. Raconte ton dernier week-end : ce que tu as fait samedi et dimanche, avec qui, ce que tu n’as pas fait, et comment c’était. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'Last weekend was quite quiet. On Saturday morning I had a lie-in, and in the afternoon I went shopping with my sister. I bought a new jacket. In the evening we didn’t go out: we cooked pasta and watched a film. On Sunday I visited my grandparents and we went for a walk. It was a nice weekend!',
   criteres:['J’ai utilisé des verbes réguliers en -ed, sans ajouter de syllabe à watched ou cooked','J’ai utilisé au moins trois verbes irréguliers (went, had, bought…)','J’ai dit ce que je n’ai pas fait avec didn’t + base verbale','J’ai organisé mon récit (On Saturday, in the evening, on Sunday…)','J’ai dit comment c’était (It was…)']}},

 {kind:'Écriture', h:'Un e-mail : mon week-end',
  p:'Une amie anglophone te demande <i lang="en">What did you do at the weekend?</i> Réponds-lui par un e-mail (au moins 50 mots) : raconte ton samedi et ton dimanche, utilise des verbes réguliers et irréguliers, une négation avec <i lang="en">didn’t</i>, et termine par une question sur son week-end.',
  ecrire:{min:50, modele:'Hi Emma, Thanks for your email! My weekend was great. On Saturday I got up late, then I met my friend Paul in town. We had lunch in a small Italian restaurant and we visited the new museum. In the evening I didn’t go out because I was tired. On Sunday I tidied my room and I cooked a big dinner for my parents. What did you do? Did you have a good time? Love, Marie',
   criteres:[{t:'J’ai utilisé des verbes réguliers au prétérit (-ed)', re:'\\b[a-z]{2,}ed\\b'},{t:'J’ai utilisé des verbes irréguliers (went, had, met…)', re:'\\b(went|had|did|got|saw|made|ate|drank|bought|met|came|took|slept|left)\\b'},{t:'J’ai écrit une négation avec didn’t + base verbale', re:"\\b(didn['’]t|did not)\\s+[a-z]+"},{t:'J’ai situé les moments (On Saturday, in the evening…)', re:'\\b(on (saturday|sunday)|in the (morning|afternoon|evening)|last (weekend|night))\\b'},{t:'J’ai posé une question avec did', re:'\\bdid\\b[^.!?]*\\?'}]}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>Prétérit</b> = action terminée à un moment passé (<i lang="en">yesterday, last weekend, on Saturday, two days ago</i>). Même forme à toutes les personnes. Pas « I have played yesterday ».</li><li>Réguliers : <b>-ed</b>. <i lang="en">like → liked, study → studied, play → played, stop → stopped</i>.</li><li>Prononciation de <i lang="en">-ed</i> : /t/ (<i lang="en">watched, cooked</i>), /d/ (<i lang="en">played, cleaned</i>), /ɪd/ seulement après t ou d (<i lang="en">wanted, visited</i>).</li><li>Irréguliers à connaître : <i lang="en">went, had, did, got, saw, made, ate, drank, bought, met, came, took, slept, read</i> (« rèd »).</li><li><b>did</b> + base verbale : <i lang="en">I didn’t go. Did you go? – Yes, I did. / No, I didn’t. What did you do?</i> Jamais « didn’t went », « did you saw ».</li><li><i lang="en">to be</i> sans <i lang="en">did</i> : <i lang="en">Were you tired? I wasn’t there.</i></li><li>Week-end : <i lang="en">go out, stay in, have a lie-in, go for a walk, go shopping, meet friends, have a good time. What did you do at the weekend? – Not much.</i></li></ul></div>`},

 {kind:'Mission', h:'Le week-end de Rosie',
  p:'Tom demande à sa collègue Rosie comment s’est passé son week-end. Écoute le dialogue, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Tom','Hi Rosie! Did you have a good weekend?'],['Rosie','Yes, I did, thanks! I went to Bath with my parents.'],['Tom','Bath? Did you go by train?'],['Rosie','No, we didn’t. We went by car. The journey was two hours.'],['Tom','What did you do there?'],['Rosie','We visited the old Roman baths and we walked around the town. And we had tea and cakes in a lovely café.'],['Tom','Sounds great. Did you buy anything?'],['Rosie','Yes, I bought a book about Roman Britain. What about you?'],['Tom','Oh, I didn’t do much. I worked on Saturday and I watched football on Sunday.']], cache:true,
  parts:[
   {q:'a) Avec qui Rosie est-elle allée à Bath&nbsp;?', opts:['Avec Tom','Avec ses parents','Avec des amis','Seule'], ans:1, hint:'Écoute la fin de sa première réponse : <i lang="en">with my…</i>', why:'<i lang="en">I went to Bath with my parents.</i>'},
   {q:'b) Comment sont-ils allés à Bath&nbsp;?', opts:['En train','En car','En voiture','À vélo'], ans:2, hint:'Tom propose le train ; Rosie répond <i lang="en">No, we didn’t</i>, puis précise.', why:'<i lang="en">No, we didn’t. We went by car.</i> : en voiture, deux heures de route.'},
   {q:'c) Qu’a acheté Rosie&nbsp;? Réponds en anglais par une phrase complète, avec <i lang="en">She…</i>', lab:'Ta réponse', txt:['She bought a book.','She bought a book about Roman Britain.','She bought a book about Britain.'], hint:'Prétérit irrégulier de <i lang="en">buy</i>.', why:'<i lang="en">She bought a book about Roman Britain.</i> <i lang="en">buy → bought</i>, et pas de <i lang="en">-s</i> au passé.'},
   {q:'d) Écris la question de Tom qui veut dire « Tu as acheté quelque chose&nbsp;? »', lab:'Ta question', txt:['Did you buy anything?','Did you buy something?'], hint:'<i lang="en">Did</i> + sujet + base verbale. Dans une question, « quelque chose » se dit souvent <i lang="en">anything</i>.', why:'<i lang="en">Did you buy anything?</i> Comme <i lang="en">any</i> dans les questions (unité <i lang="en">Food and drink</i>), on dit <i lang="en">anything</i>.'}],
  sol:'<p lang="en">Tom: Hi Rosie! Did you have a good weekend? – Rosie: Yes, I did, thanks! I went to Bath with my parents. – Bath? Did you go by train? – No, we didn’t. We went by car. The journey was two hours. – What did you do there? – We visited the old Roman baths and we walked around the town. And we had tea and cakes in a lovely café. – Sounds great. Did you buy anything? – Yes, I bought a book about Roman Britain. What about you? – Oh, I didn’t do much. I worked on Saturday and I watched football on Sunday.</p><p>Rosie est allée à Bath en voiture avec ses parents ; elle a acheté un livre (<i lang="en">She bought a book</i>). Question de Tom : <i lang="en">Did you buy anything?</i></p>'},

 {kind:'Mission', h:'Réponds à Mark',
  p:`<p>Ton ami Mark t’a écrit ce message lundi. Lis-le, puis aide-toi des questions pour écrire ta réponse en anglais, phrase par phrase.</p>
<div class="blk" data-t="Message"><p lang="en">Hi! I tried to call you on Saturday, but you didn’t answer. What did you do? Did you go to Sophie’s party? I didn’t go because I was ill. I stayed in bed all weekend and I watched old films. Boring! Write soon, Mark</p></div>`,
  parts:[
   {q:'a) Pourquoi Mark n’est-il pas allé à la fête de Sophie&nbsp;?', opts:['Il travaillait.','Il n’était pas invité.','Il était en vacances.','Il était malade.'], ans:3, hint:'Cherche <i lang="en">because</i>.', why:'<i lang="en">I didn’t go because I was ill.</i> : il était malade. Remarque <i lang="en">was</i> (état) à côté de <i lang="en">didn’t go</i> (action).'},
   {q:'b) Réponds à sa question : « Non, je ne suis pas allé(e) à la fête de Sophie. »', lab:'Ta réponse', txt:['No, I did not go to Sophie’s party.','No, I did not.','No, I did not go to the party.','No, I did not go to her party.'], hint:'<i lang="en">didn’t</i> + base verbale de <i lang="en">went</i>.', why:'<i lang="en">No, I didn’t go to Sophie’s party.</i> Après <i lang="en">didn’t</i>, <i lang="en">go</i> et pas <i lang="en">went</i>.'},
   {q:'c) Écris : « Je suis allé(e) à Londres avec ma sœur. »', lab:'Ta phrase', txt:['I went to London with my sister.','With my sister I went to London.'], hint:'Un seul mot pour « je suis allé » : le prétérit de <i lang="en">go</i>.', why:'<i lang="en">I went to London with my sister.</i> Pas de <i lang="en">am</i> : « I am went » est faux.'},
   {q:'d) Écris : « Nous avons visité un musée et nous avons mangé dans un restaurant indien. »', lab:'Ta phrase', txt:V('We visited a museum and {we |}{ate|had dinner|had lunch|had a meal} in an Indian restaurant.'), hint:'Un verbe régulier (<i lang="en">visit</i>), puis un irrégulier (<i lang="en">eat</i> ou <i lang="en">have</i>). Les nationalités prennent une majuscule.', why:'<i lang="en">We visited a museum and ate in an Indian restaurant.</i> (ou <i lang="en">had dinner</i>). <i lang="en">visited</i> se prononce en trois syllabes.'},
   {q:'e) Pose une question à Mark : « Quels films as-tu regardés&nbsp;? »', lab:'Ta question', txt:['What films did you watch?','Which films did you watch?','What movies did you watch?','Which movies did you watch?'], hint:'Mot interrogatif + nom, puis <i lang="en">did</i> + sujet + base verbale.', why:'<i lang="en">What films did you watch?</i> (ou <i lang="en">Which films…</i>). Base <i lang="en">watch</i> après <i lang="en">did</i>, jamais « did you watched ».'}],
  sol:'<p>Mark n’est pas allé à la fête parce qu’il était malade (<i lang="en">I was ill</i>). Une réponse possible :</p><p lang="en">Hi Mark! Sorry, I didn’t answer because I was busy. No, I didn’t go to Sophie’s party. I went to London with my sister. We visited a museum and ate in an Indian restaurant. What films did you watch? I hope you’re better now!</p><p>Retiens la règle : prétérit seul à l’affirmatif (<i lang="en">went, visited, ate</i>), <i lang="en">did / didn’t</i> + base verbale dans les questions et les négations.</p>'},
]},
);
})();
