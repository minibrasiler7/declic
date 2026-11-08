/* Déclic — Anglais A2 (unités 1 à 3). Format : docs/ANGLAIS.md */
(()=>{
// Toutes les combinaisons de morceaux : V('I ',['am','was'],' here.') → ['I am here.','I was here.']
const V=(...p)=>p.reduce((a,x)=>a.flatMap(s=>[].concat(x).map(y=>s+y)),['']);
const TEN=['ten','10','ten o’clock','10 am','10am','10 a.m.','10:00','10.00'];

COURS.push(
/* ============================================================ 1. Life stories */
{subj:'en', sem:'a2', id:'en-a2-stories', o:1, h:'Life stories', p:'Raconter sa vie ou celle de quelqu’un : le prétérit consolidé (verbes irréguliers, questions, négations), <i lang="en">ago</i>, les dates et les mots qui relient un récit.', steps:[
 {kind:'Écoute', h:'Une vie racontée',
  p:`<p>À la fin de cette unité, tu sauras raconter ta vie ou celle d’une autre personne, dans l’ordre, avec des dates, et poser des questions sur le passé de quelqu’un.</p>
<p>Jack, un collègue, interroge Nadia, qui tient un café à Londres. <b>Écoute sans lire</b>, deux fois si tu veux. Le texte apparaîtra après ta réponse.</p>
<p><b>Question :</b> que s’est-il passé il y a deux ans&nbsp;?</p>`,
  audio:[['Jack','So, Nadia, where did you grow up?'],['Nadia','In a small town near Lyon. I went to school there, and then I studied cooking in Paris.'],['Jack','When did you move to London?'],['Nadia','Six years ago. I got a job in a restaurant in Soho.'],['Jack','Did you speak English then?'],['Nadia','Not really! The first year was hard. I didn’t understand the jokes in the kitchen.'],['Jack','And after that?'],['Nadia','After that, things got better. I met my husband, and two years ago we opened our own café.'],['Jack','Wow. That’s a great story.']], cache:true,
  opts:['Nadia est arrivée à Londres.','Nadia a rencontré son mari.','Nadia et son mari ont ouvert leur café.','Nadia a commencé ses études de cuisine.'], ans:2,
  why:'<i lang="en">Two years ago we opened our own café</i> : il y a deux ans, ils ont ouvert leur propre café. Nadia est arrivée à Londres il y a six ans (<i lang="en">six years ago</i>), et elle a étudié la cuisine à Paris avant.'},

 {kind:'Vocabulaire', h:'Les étapes d’une vie',
  p:`<p>Voici les verbes pour raconter une vie, avec leur prétérit dans l’exemple. Touche une ligne pour l’entendre, puis répète-la. Ces expressions entrent dans ta <b>révision du vocabulaire</b>.</p>`,
  mots:[['to be born','naître','I was born in Lyon in 1998.'],['to grow up','grandir (enfance)','She grew up in a small village.'],['to go to school','aller à l’école','I went to school in Geneva.'],['to leave school','quitter l’école, finir sa scolarité','He left school at sixteen.'],['to study','étudier, faire des études','She studied law in Lausanne.'],['to get a job','trouver un emploi','I got my first job in a hotel.'],['to move (to)','déménager (à)','We moved to Zurich in 2015.'],['to meet','rencontrer, faire la connaissance de','I met my wife at university.'],['to fall in love (with)','tomber amoureux (de)','They fell in love in Paris.'],['to get married','se marier','They got married in 2010.'],['to have a baby','avoir un bébé','She had a baby last year.'],['to start a business','créer une entreprise','He started his own business at thirty.'],['to become','devenir','She became a doctor.'],['to retire','prendre sa retraite','My father retired two years ago.'],['a turning point','un tournant','That trip was a turning point in my life.']],
  note:'<b>Attention :</b> pour sa naissance, l’anglais dit <i lang="en">I was born</i> (prétérit de <i lang="en">be</i>), jamais <i lang="en">I am born</i>. Et <i lang="en">to grow up</i> (grandir, passer son enfance) n’est pas <i lang="en">to grow</i> (pousser, grandir en taille).'},

 {kind:'Pratique', h:'À toi : ta naissance',
  p:'Écris en anglais : « Je suis né en 1998 à Lyon. » Tu peux écrire l’année en chiffres. <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase',
  txt:V('I was born ',['in 1998 in Lyon','in Lyon in 1998','in nineteen ninety-eight in Lyon','in Lyon in nineteen ninety-eight'],'.'),
  why:'<i lang="en">I was born in Lyon in 1998.</i> Naître est un événement passé : on utilise <i lang="en">was born</i>. L’année se lit <i lang="en">nineteen ninety-eight</i>.'},

 {kind:'Grammaire', h:'Le prétérit : un seul passé pour les faits terminés',
  p:`<p>Nadia raconte : <i lang="en">I went to school there… I got a job… we opened our own café.</i> Pour des événements terminés, l’anglais utilise le <b>prétérit</b> (<i lang="en">past simple</i>). Tu l’as découvert en A1 ; ici, on le consolide pour raconter une vie entière.</p>
<div class="def"><p><b>Forme.</b> Verbes réguliers : base + <b>-ed</b> (<i lang="en">work → worked, live → lived, study → studied, stop → stopped</i>). Verbes irréguliers : une forme à apprendre (<i lang="en">go → went, get → got, meet → met</i>). La même forme pour toutes les personnes : <i lang="en">I went, she went, they went</i>.</p><p><b>Négation :</b> <b>did not</b> (<b>didn’t</b>) + base verbale. <b>Question :</b> <b>Did</b> + sujet + base verbale&nbsp;? Le verbe <i lang="en">be</i> fait exception : <i lang="en">was/were</i>, sans <i lang="en">did</i> (<i lang="en">I wasn’t there. Were you tired?</i>).</p></div>
<div class="idea"><p>Le prétérit sert pour une action <b>terminée</b>, située à un moment passé connu ou sous-entendu : <i lang="en">yesterday, in 2015, when I was ten, six years ago</i>. Le français utilise le passé composé là où l’anglais met le prétérit : « J’ai déménagé en 2015 » = <i lang="en">I moved in 2015</i>. Le passé composé français ne se traduit donc pas par <i lang="en">I have moved</i> quand on donne le moment.</p></div>
<div class="ex"><p><i lang="en">She grew up in Bern. She didn’t study at university. Did she get a job? – Yes, she did.</i></p></div>
<div class="warn"><p>Les pièges des francophones : après <i lang="en">did</i> ou <i lang="en">didn’t</i>, le verbe revient à la base : <s>I didn’t went</s> → <i lang="en">I didn’t go</i> ; <s>Did you saw…?</s> → <i lang="en">Did you see…?</i> Pas de <i lang="en">did</i> avec <i lang="en">was/were</i> : <s>Did you were…?</s> → <i lang="en">Were you…?</i> Et « hier, j’ai vu Marc » = <i lang="en">I saw Marc yesterday</i>, pas <s>I have seen Marc yesterday</s>.</p></div>`,
  audio:'She grew up in Bern. She didn’t study at university. Did she get a job? Yes, she did.'},

 {kind:'Grammaire', h:'Les verbes irréguliers par familles',
  p:`<p>Une centaine de verbes courants ont un prétérit irrégulier. Les apprendre par ordre alphabétique est pénible ; il est plus facile de les regrouper par <b>familles qui se ressemblent</b>, et de les dire à voix haute.</p>
<div class="def"><ul><li>Son « ô » long et <i>-ought</i>/<i>-aught</i> : <i lang="en">buy → bought, bring → brought, think → thought, fight → fought, teach → taught, catch → caught</i>.</li><li><i>i</i> devient <i>a</i> : <i lang="en">begin → began, drink → drank, swim → swam, sing → sang, ring → rang</i>.</li><li>Finale en <i>-ew</i> : <i lang="en">know → knew, grow → grew, fly → flew, throw → threw, draw → drew</i>.</li><li>Voyelle qui devient <i>o</i> : <i lang="en">write → wrote, drive → drove, ride → rode, speak → spoke, break → broke, choose → chose, wake → woke</i>.</li><li>Finale en <i>-t</i> : <i lang="en">sleep → slept, keep → kept, feel → felt, meet → met, leave → left, lose → lost, spend → spent, send → sent, build → built</i>.</li><li>Rien ne change : <i lang="en">put, cut, cost, hit, let, shut, read</i> (mais <i lang="en">read</i> au passé se prononce « rèd »).</li><li>Les très fréquents, à part : <i lang="en">be → was/were, have → had, do → did, go → went, get → got, make → made, say → said, see → saw, come → came, become → became, give → gave, take → took, find → found, tell → told, sell → sold, win → won, fall → fell, eat → ate, pay → paid</i>.</li></ul></div>
<div class="idea"><p>La forme irrégulière ne sert qu’à l’<b>affirmative</b> : <i lang="en">She bought a car.</i> Dès que <i lang="en">did</i> apparaît, le verbe reprend sa base : <i lang="en">She didn’t buy a car. Did she buy a car?</i></p></div>
<div class="warn"><p>Ne confonds pas <i lang="en">thought</i> (<i lang="en">think</i>, penser) et <i lang="en">taught</i> (<i lang="en">teach</i>, enseigner), ni <i lang="en">bought</i> (<i lang="en">buy</i>, acheter) et <i lang="en">brought</i> (<i lang="en">bring</i>, apporter). Le prétérit de <i lang="en">leave</i> (partir, quitter) est <i lang="en">left</i>, comme « gauche ».</p></div>`,
  audio:'buy, bought. think, thought. teach, taught. begin, began. know, knew. write, wrote. sleep, slept. meet, met. leave, left. put, put.'},

 {kind:'Pratique', h:'À toi : mets le récit au passé',
  p:'Mets cette phrase au prétérit : <i lang="en">I meet my wife at a party, and we get married a year later.</i> <b>Question :</b> quelle est la phrase au passé&nbsp;?', lab:'Ta phrase', long:true,
  txt:V('I met my wife at a party',[' and',', and'],' we got married ',['a year','one year'],' later.'),
  why:'<i lang="en">I met my wife at a party, and we got married a year later.</i> Deux irréguliers : <i lang="en">meet → met</i>, <i lang="en">get → got</i>. <i lang="en">A year later</i> = un an plus tard.'},

 {kind:'Méthode', h:'Poser une question au prétérit',
  p:`<p><b>Quand :</b> pour interroger quelqu’un sur son passé (<i lang="en">Where did you grow up? When did you move?</i>). <b>Pourquoi ça marche :</b> comme au présent avec <i lang="en">do/does</i>, l’anglais ajoute un auxiliaire, <b>did</b>, qui porte le passé ; le verbe principal reste à la base. <b>Comment :</b></p>
<ul><li>Mot interrogatif + <b>did</b> + sujet + base verbale + reste&nbsp;? <i lang="en">Where did you grow up?</i></li><li>Question fermée : <i lang="en">Did you like it?</i> Réponses courtes : <i lang="en">Yes, I did. / No, I didn’t.</i></li><li>Avec <i lang="en">be</i>, pas de <i lang="en">did</i> : <i lang="en">Where were you born? How old was she?</i></li><li>Si <i lang="en">Who</i> ou <i lang="en">What</i> est le <b>sujet</b> (celui qui fait l’action), pas de <i lang="en">did</i> non plus : <i lang="en">Who won the match? What happened?</i></li></ul>`,
  demo:{enonce:'Voici une information : <i lang="en">She moved to Canada <u>in 2015</u>.</i> Pose la question dont la partie soulignée est la réponse.',
   etapes:[{f:'La partie soulignée est une date : le mot interrogatif est <b>When</b>.',w:'<i lang="en">in 2015</i> répond à la question « quand ».'},
    {f:'<i lang="en">When</i> + <b>did</b> + <i lang="en">she</i>',w:'<i lang="en">did</i> porte le passé et se place avant le sujet.'},
    {f:'<i lang="en">moved</i> → <b>move</b>, puis le reste : <i lang="en">to Canada?</i>',w:'Après <i lang="en">did</i>, le verbe revient à la base : jamais <s>did she moved</s>.'}],
   conclusion:'<i lang="en">When did she move to Canada?</i>'}},

 {kind:'Pratique', h:'À toi : la bonne question',
  p:'Pose la question dont la partie soulignée est la réponse : <i lang="en">He grew up <u>in Scotland</u>.</i> <b>Question :</b> quelle question poses-tu&nbsp;?', lab:'Ta question',
  txt:['Where did he grow up?'],
  why:'Un lieu → <i lang="en">Where</i>. Puis <i lang="en">did</i> + <i lang="en">he</i> + la base <i lang="en">grow up</i> : <i lang="en">Where did he grow up?</i>'},

 {kind:'Pratique', h:'Qui a gagné ? Les questions sans did',
  p:'Quand <i lang="en">Who</i> est le sujet de l’action, on n’ajoute pas <i lang="en">did</i> et le verbe reste au prétérit. Écris en anglais : « Qui a gagné le match&nbsp;? » <b>Question :</b> quelle est la question en anglais&nbsp;?', lab:'Ta question',
  txt:['Who won the match?','Who won the game?'],
  why:'<i lang="en">Who won the match?</i> <i lang="en">Who</i> remplace le gagnant, qui est le sujet : pas de <i lang="en">did</i>. Compare avec <i lang="en">Who did you meet?</i> (qui as-tu rencontré&nbsp;?), où <i lang="en">you</i> est le sujet.'},

 {kind:'Pratique', h:'Corrige l’erreur',
  p:'Cette phrase contient une erreur : <i lang="en">I didn’t went to the party because I was tired.</i> <b>Question :</b> quelle est la phrase corrigée&nbsp;?', lab:'Ta phrase', long:true,
  txt:['I didn’t go to the party because I was tired.','I did not go to the party because I was tired.'],
  why:'Après <i lang="en">didn’t</i>, la base : <i lang="en">go</i>, pas <i lang="en">went</i>. <i lang="en">Was</i> reste correct, car <i lang="en">be</i> se met au passé sans <i lang="en">did</i>.'},

 {kind:'Grammaire', h:'Ago, in, on, at : situer un événement',
  p:`<p>Nadia dit : <i lang="en">I moved to London six years ago.</i> Comment dire « il y a six ans », « en 2015 », « à vingt ans »&nbsp;? Une biographie en a besoin à chaque phrase.</p>
<div class="def"><ul><li>Durée + <b>ago</b> = il y a (dans le passé) : <i lang="en">six years ago, two days ago, a long time ago</i>. <i lang="en">Ago</i> se place <b>après</b> la durée, avec un prétérit.</li><li><b>in</b> + année, mois, saison : <i lang="en">in 2015, in May, in the summer</i>. <b>on</b> + jour ou date : <i lang="en">on Monday, on 3 May</i>. <b>at the age of</b> + âge : <i lang="en">at the age of twenty</i> (ou <i lang="en">at twenty</i>). <b>when</b> + phrase : <i lang="en">when I was ten</i>.</li><li>Lire les années : 1998 = <i lang="en">nineteen ninety-eight</i> (deux paires) ; 2005 = <i lang="en">two thousand and five</i> (en américain, sans <i lang="en">and</i>) ; 2024 = <i lang="en">twenty twenty-four</i> ; 1900 = <i lang="en">nineteen hundred</i>.</li></ul></div>
<div class="idea"><p><i lang="en">Ago</i> part d’aujourd’hui et regarde en arrière : il fait le calcul à ta place. En 2026, <i lang="en">ten years ago</i> renvoie à 2016.</p></div>
<div class="ex"><p><i lang="en">My grandparents got married fifty years ago. I started university in 2019. She learned to drive at the age of seventeen.</i></p></div>
<div class="warn"><p>« Il y a » a deux traductions : <i lang="en">there is / there are</i> (ce qui existe) et <i lang="en">ago</i> (le temps écoulé). <s>There are six years, I moved</s> → <i lang="en">I moved six years ago.</i> Ne mets jamais <i lang="en">ago</i> devant la durée (<s>ago six years</s>), et ne le confonds pas avec <i lang="en">for</i> : <i lang="en">I lived there for three years</i> = j’y ai vécu pendant trois ans.</p></div>`,
  audio:'nineteen ninety-eight. two thousand and five. twenty twenty-four. My grandparents got married fifty years ago.'},

 {kind:'Écoute', h:'Quelle année ?',
  p:'Écoute une phrase sur la mère de quelqu’un. <b>Question :</b> en quelle année est-elle arrivée en Suisse&nbsp;? Écris l’année en chiffres.', audio:'My mother was born in nineteen sixty-seven, and she moved to Switzerland in nineteen ninety-two.', cache:true, lab:'Année', txt:['1992','nineteen ninety-two'],
  why:'<i lang="en">She moved to Switzerland in nineteen ninety-two</i> : 1992. L’année de naissance, <i lang="en">nineteen sixty-seven</i>, est 1967.'},

 {kind:'Pratique', h:'À toi : il y a',
  p:'Écris en anglais : « J’ai commencé ce travail il y a trois mois. » <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase',
  txt:[...V('I ',['started','began','got'],' this job ',['three','3'],' months ago.'),...V(['Three','3'],' months ago I ',['started','began','got'],' this job.')],
  why:'Prétérit + durée + <i lang="en">ago</i> : <i lang="en">I started this job three months ago.</i> Jamais <s>there are three months</s>.'},

 {kind:'Vocabulaire', h:'Les mots du récit',
  p:`<p>Un récit clair relie les événements par des <b>marqueurs de temps</b>. Pour commencer : <i lang="en">First, At first</i>. Pour continuer : <i lang="en">Then, After that, Later, The next day</i>. Pour finir : <i lang="en">Finally, In the end, Eventually</i>. On les place en général en tête de phrase, suivis d’une virgule. Touche chaque ligne pour l’entendre.</p>`,
  mots:[['first','d’abord, en premier','First, we visited the castle.'],['at first','au début (puis ça a changé)','At first, I didn’t like the city.'],['then','ensuite, puis','Then we had lunch.'],['after that','après ça','After that, we went home.'],['later','plus tard','Two years later, she moved to Rome.'],['the next day','le lendemain','The next day, it rained.'],['when I was ten','quand j’avais dix ans','When I was ten, we moved to Bern.'],['suddenly','soudain','Suddenly, the lights went out.'],['meanwhile','pendant ce temps','Meanwhile, his sister was in Paris.'],['finally','enfin, pour finir','Finally, we arrived at the hotel.'],['in the end','finalement, au bout du compte','In the end, we stayed at home.'],['eventually','finalement (après longtemps)','He eventually found a job.']],
  note:'<b>Faux ami :</b> <i lang="en">eventually</i> veut dire « finalement, au bout d’un moment », jamais « éventuellement » (= <i lang="en">possibly</i>). <b>After</b> seul ne commence pas une phrase comme « Après, … » : dis <i lang="en">After that</i> ou <i lang="en">Then</i>. Enfin, <i lang="en">at the end</i> = à la fin de quelque chose (<i lang="en">at the end of the film</i>), alors que <i lang="en">in the end</i> = finalement.'},

 {kind:'Pratique', h:'Remets le récit dans l’ordre',
  p:'Touche les morceaux dans le bon ordre pour raconter la suite de la vie de Clara. Commence par le marqueur de temps. <b>Question :</b> quelle est la phrase&nbsp;?',
  ordre:['Two years later','she','left','her job','and','started','her own business'],
  alt:['She left her job two years later and started her own business','She left her job and started her own business two years later'],
  why:'<i lang="en">Two years later, she left her job and started her own business.</i> Le marqueur de temps ouvre la phrase, puis sujet + verbes au prétérit (<i lang="en">left, started</i>).'},

 {kind:'Prononciation', h:'Said, read, bought : les pièges du passé',
  p:`<p>Quelques prétérits très fréquents ne se prononcent pas comme ils s’écrivent. Les francophones les déforment souvent.</p>
<div class="def"><ul><li><b>said</b> se dit « sèd », comme <i lang="en">bed</i>, et non « sèïd ».</li><li><b>read</b> au passé se dit « rèd », comme la couleur <i lang="en">red</i> ; au présent, « riid ».</li><li><b>bought, brought, thought, taught, caught</b> ont tous le même son long « ô » (comme <i>sport</i> sans le r) ; le <i>gh</i> ne se prononce jamais.</li><li><b>knew</b> : le <i>k</i> est muet, on dit « niou ».</li><li>Rappel pour <b>-ed</b> : « t » après un son sourd (<i lang="en">worked</i>), « d » après un son sonore (<i lang="en">lived</i>), et une syllabe en plus seulement après t ou d (<i lang="en">started, ended</i>).</li></ul></div>
<p>Écoute, puis répète chaque mot à voix haute, deux fois.</p>`,
  audio:'said. read. bought. thought. taught. caught. knew. She said she read the book. I thought he bought it.'},

 {kind:'Oral', h:'Répète : une vie en deux phrases',
  p:'Écoute, puis dis les phrases à voix haute en touchant « Dire la phrase ». Attention au <i lang="en">born</i> sans r prononcé en anglais britannique et au <i lang="en">grew</i> (« grou »).',
  dire:'I was born in Lyon, but I grew up in Geneva. I moved to London six years ago.'},

 {kind:'Lecture', h:'Mary Anning, chasseuse de fossiles',
  p:`<p>Lis cette courte biographie, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Mary Anning (1799–1847)"><p lang="en">Mary Anning was born in 1799 in Lyme Regis, a small town on the south coast of England. Her family was poor. Her father made furniture, but he also collected fossils on the beach and sold them to tourists. He died when Mary was eleven. After that, Mary and her brother Joseph continued the business. In 1811, Joseph found a strange skull in the rocks. The next year, Mary found the rest of the skeleton. It was an ichthyosaur, a sea animal that lived about 200 million years ago. Mary didn’t go to university, because women couldn’t study there at that time, but she taught herself geology. In 1823, she found the first complete skeleton of a plesiosaur. Scientists bought her fossils, but they often forgot to mention her name. She died in 1847. Today, she is famous all over the world.</p></div>
<p><b>Question :</b> pourquoi Mary n’est-elle pas allée à l’université&nbsp;?</p>`,
  audio:'Mary Anning was born in seventeen ninety-nine in Lyme Regis, a small town on the south coast of England. Her family was poor. Her father made furniture, but he also collected fossils on the beach and sold them to tourists. He died when Mary was eleven. After that, Mary and her brother Joseph continued the business. In eighteen eleven, Joseph found a strange skull in the rocks. The next year, Mary found the rest of the skeleton. It was an ichthyosaur, a sea animal that lived about two hundred million years ago. Mary didn’t go to university, because women couldn’t study there at that time, but she taught herself geology. In eighteen twenty-three, she found the first complete skeleton of a plesiosaur. Scientists bought her fossils, but they often forgot to mention her name. She died in eighteen forty-seven. Today, she is famous all over the world.',
  opts:['Parce que sa famille était trop pauvre pour payer.','Parce qu’elle devait travailler avec son père.','Parce qu’elle n’aimait pas étudier.','Parce que les femmes ne pouvaient pas y étudier à l’époque.'], ans:3,
  why:'<i lang="en">Women couldn’t study there at that time</i> : les femmes ne pouvaient pas y étudier à cette époque. Sa famille était pauvre (<i lang="en">poor</i>), mais ce n’est pas la raison donnée. Elle a appris la géologie seule (<i lang="en">she taught herself geology</i>).'},

 {kind:'Dictée', h:'Dictée : un départ',
  p:'Écoute et écris exactement la phrase. Réécoute autant que tu veux, et utilise « Plus lentement ».',
  dictee:'After that, she moved to London and found a job in a hotel.',
  why:'Deux prétérits : <i lang="en">moved</i> (régulier) et <i lang="en">found</i> (de <i lang="en">find</i>). <i lang="en">After that</i> s’écrit en deux mots.'},

 {kind:'Oral', h:'Raconte une vie',
  p:`<p>Parle 45 secondes à 1 minute de la vie d’une personne de ta famille (ou de la tienne) : où et quand elle est née, où elle a grandi, puis trois ou quatre événements importants dans l’ordre, reliés par des marqueurs de temps. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'My grandmother was born in 1950 in a small village in Portugal. She grew up on a farm with five brothers and sisters. She left school at fourteen and worked in a shop. Then, when she was twenty, she moved to Switzerland. At first, she didn’t speak French, and life was hard. After that, she met my grandfather at a dance, and they got married two years later. She retired ten years ago, and now she has a big garden.',
   criteres:['J’ai dit où et quand la personne est née (was born)','J’ai utilisé au moins cinq verbes au prétérit, dont des irréguliers','J’ai relié les événements avec First, Then, After that, Later…','J’ai situé un événement avec ago ou une année','Je n’ai jamais mis un verbe au passé après did ou didn’t']}},

 {kind:'Écriture', h:'Écris une courte biographie',
  p:'Pour le site de ton club ou de ton entreprise, écris la courte biographie d’une personne que tu admires ou d’un membre de ta famille (au moins 60 mots). Raconte dans l’ordre : naissance, enfance, études ou travail, un tournant, puis où en est cette personne aujourd’hui.',
  ecrire:{min:60, modele:'My uncle Pierre was born in 1965 in Neuchâtel. He grew up near the lake, and he loved boats. He left school at sixteen and worked in a garage. Then, in 1990, he moved to Australia. At first, he didn’t speak English well, but he learned fast. After that, he started his own business: he repaired boats. He got married in 1995 and had two children. Five years ago, he sold his business and came back to Switzerland. Now he lives in a small house by the lake.',
   criteres:[{t:'J’ai dit où ou quand la personne est née (was born)', re:'\\b(was|were) born\\b'},{t:'J’ai utilisé des verbes irréguliers au prétérit', re:'\\b(went|grew|left|got|met|became|had|made|came|began|bought|found|took|sold|won|knew|wrote|built|taught|gave|saw)\\b'},{t:'J’ai relié les événements (then, after that, later…)', re:'\\b(then|after that|later|finally|in the end|eventually|at first|the next)\\b'},{t:'J’ai situé un événement avec ago ou une année', re:'\\bago\\b|\\b(1[89]|20)\\d\\d\\b'},'J’ai mis le verbe à la base après did ou didn’t','J’ai raconté les événements dans l’ordre']}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>Prétérit</b> pour une action terminée à un moment passé : régulier en <i lang="en">-ed</i>, irréguliers à apprendre par familles (<i lang="en">bought, thought, taught</i> ; <i lang="en">began, drank</i> ; <i lang="en">knew, grew</i> ; <i lang="en">wrote, drove</i> ; <i lang="en">slept, met, left</i>).</li><li>Négation : <i lang="en">didn’t</i> + base. Question : (mot interrogatif) + <i lang="en">did</i> + sujet + base. Jamais <s>didn’t went</s> ni <s>did you saw</s>.</li><li><i lang="en">be</i> : <i lang="en">was/were</i>, sans <i lang="en">did</i>. Naître : <i lang="en">I was born</i>.</li><li>Si <i lang="en">Who/What</i> est le sujet, pas de <i lang="en">did</i> : <i lang="en">Who won? What happened?</i></li><li>Durée + <i lang="en">ago</i> = il y a. <i lang="en">in</i> 2015, <i lang="en">on</i> 3 May, <i lang="en">at the age of</i> twenty. Années : <i lang="en">nineteen ninety-eight, two thousand and five</i>.</li><li>Récit : <i lang="en">First / At first, Then, After that, Later, The next day, Finally, In the end</i>. <i lang="en">Eventually</i> = finalement.</li><li>Prononciation : <i lang="en">said</i> « sèd », <i lang="en">read</i> « rèd », <i lang="en">-ought/-aught</i> = « ô ».</li></ul></div>`},

 {kind:'Mission', h:'Un portrait à la radio',
  p:'Tu écoutes une émission de radio britannique. La présentatrice présente son invité avant l’interview. Écoute, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Presenter','Today our guest is Tom Reid. Tom grew up in a small town in Wales. He left school at sixteen and worked in a supermarket for four years. Then, at the age of twenty, he bought an old bike and cycled across Europe. The trip took eight months. After that, he wrote a book about it, and it sold fifty thousand copies. Three years ago, he started a cycling school for children. Welcome, Tom!'],['Tom','Thanks. I’m happy to be here.']], cache:true,
  parts:[
   {q:'a) Qu’a fait Tom juste après avoir quitté l’école&nbsp;?', opts:['Il a traversé l’Europe à vélo.','Il a travaillé dans un supermarché.','Il a écrit un livre.','Il a ouvert une école de vélo.'], ans:1, hint:'Écoute la phrase qui suit <i lang="en">He left school at sixteen</i>.', why:'<i lang="en">He left school at sixteen and worked in a supermarket for four years.</i> Le voyage à vélo vient ensuite, à vingt ans.'},
   {q:'b) Combien de mois a duré son voyage&nbsp;? Écris le nombre en chiffres.', lab:'Mois', txt:['8','eight'], hint:'Cherche <i lang="en">The trip took…</i>', why:'<i lang="en">The trip took eight months</i> : 8 mois. <i lang="en">took</i> est le prétérit de <i lang="en">take</i>.'},
   {q:'c) Écris en anglais : « Il a créé une école de vélo il y a trois ans. »', lab:'Ta phrase', txt:[...V('He ',['started','opened','set up','created','founded'],' a cycling school',['',' for children'],[' three',' 3'],' years ago.'),...V(['Three','3'],' years ago he ',['started','opened','set up','created','founded'],' a cycling school',['',' for children'],'.')], hint:'Prétérit de <i lang="en">start</i>, puis la durée suivie de <i lang="en">ago</i>.', why:'<i lang="en">He started a cycling school three years ago.</i> <i lang="en">Ago</i> se place après la durée.'},
   {q:'d) Pose à Tom la question : « Pourquoi as-tu traversé l’Europe à vélo&nbsp;? »', lab:'Ta question', txt:V('Why did you ',['cycle across Europe','cycle through Europe','cross Europe by bike','cross Europe on a bike','cross Europe by bicycle','travel across Europe by bike','go across Europe by bike','ride across Europe','ride a bike across Europe','ride your bike across Europe'],'?'), hint:'<i lang="en">Why</i> + <i lang="en">did</i> + <i lang="en">you</i> + la base du verbe (<i lang="en">cycle</i>, pas <i lang="en">cycled</i>).', why:'<i lang="en">Why did you cycle across Europe?</i> Après <i lang="en">did</i>, la base : <i lang="en">cycle</i>.'}],
  sol:'<p lang="en">Today our guest is Tom Reid. Tom grew up in a small town in Wales. He left school at sixteen and worked in a supermarket for four years. Then, at the age of twenty, he bought an old bike and cycled across Europe. The trip took eight months. After that, he wrote a book about it, and it sold fifty thousand copies. Three years ago, he started a cycling school for children.</p><p>Tom a quitté l’école à 16 ans, a travaillé 4 ans dans un supermarché, puis a traversé l’Europe à vélo pendant 8 mois. Il a écrit un livre, puis a créé une école de vélo il y a trois ans : <i lang="en">He started a cycling school three years ago.</i> Question : <i lang="en">Why did you cycle across Europe?</i></p>'},

 {kind:'Mission', h:'Au bureau des objets trouvés',
  p:'Tu es au bureau des objets trouvés d’une gare londonienne. Avant ton tour, tu entends une femme raconter comment elle a perdu son sac. Écoute, puis réponds. La dernière question te concerne.',
  audio:[['Agent','Good morning. How can I help you?'],['Woman','I lost my bag yesterday. I think I left it on a train.'],['Agent','OK. Which train did you take?'],['Woman','The eight fifteen from Brighton. I got off here at Victoria at about quarter past nine.'],['Agent','And what did you do after that?'],['Woman','I went to a café near the station. Then I noticed that my bag wasn’t there.'],['Agent','What does it look like?'],['Woman','It’s a small black bag. My keys and my glasses were in it, but not my wallet, luckily.'],['Agent','Let me check… Yes! Someone found a small black bag on the eight fifteen yesterday.'],['Woman','Oh, thank goodness!']], cache:true,
  parts:[
   {q:'a) Où la femme a-t-elle oublié son sac&nbsp;?', opts:['Dans un café près de la gare.','À la gare de Brighton.','Dans le train de 8 h 15.','Dans un taxi.'], ans:2, hint:'Elle le pense dès le début, et l’agent le confirme à la fin.', why:'<i lang="en">I think I left it on a train</i>, et l’agent trouve un sac noir <i lang="en">on the eight fifteen</i>. Elle est allée au café après, sans son sac.'},
   {q:'b) Qu’est-ce qui n’était PAS dans le sac&nbsp;?', opts:['Ses clés.','Son portefeuille.','Ses lunettes.'], ans:1, hint:'Écoute <i lang="en">but not…</i>', why:'<i lang="en">My keys and my glasses were in it, but not my wallet</i> : ses clés et ses lunettes y étaient, pas son portefeuille.'},
   {q:'c) L’agent écrit son rapport au passé. Mets au prétérit : <i lang="en">She gets off the train at Victoria and goes to a café.</i>', lab:'Ta phrase', txt:['She got off the train at Victoria and went to a café.','She got off the train at Victoria and went to a cafe.'], hint:'<i lang="en">get → got</i>, <i lang="en">go → went</i>.', why:'<i lang="en">She got off the train at Victoria and went to a café.</i> Deux irréguliers : <i lang="en">got</i> et <i lang="en">went</i>.'},
   {q:'d) C’est ton tour. Tu as perdu ton téléphone. Écris en anglais : « J’ai perdu mon téléphone dans le bus il y a deux heures. »', lab:'Ta phrase', txt:[...V('I lost my ',['phone','mobile','mobile phone','cell phone'],[' on the bus two hours ago.',' two hours ago on the bus.',' on the bus 2 hours ago.',' 2 hours ago on the bus.']),...V(['Two','2'],' hours ago I lost my ',['phone','mobile','mobile phone','cell phone'],' on the bus.')], hint:'<i lang="en">lose → lost</i>. Dans un bus ou un train, l’anglais dit <i lang="en">on</i> : <i lang="en">on the bus</i>.', why:'<i lang="en">I lost my phone on the bus two hours ago.</i> Prétérit + <i lang="en">ago</i> ; on dit <i lang="en">on the bus</i>, <i lang="en">on the train</i>.'},
   {q:'e) L’agent veut savoir ce que tu as fait ensuite. Écris sa question : « Qu’avez-vous fait après ça&nbsp;? »', lab:'Sa question', txt:['What did you do after that?','What did you do next?','What did you do then?','What did you do afterwards?','What did you do after?'], hint:'<i lang="en">What</i> + <i lang="en">did</i> + <i lang="en">you</i> + <i lang="en">do</i>…', why:'<i lang="en">What did you do after that?</i> Le premier <i lang="en">do</i> est l’auxiliaire au passé (<i lang="en">did</i>), le second est le verbe « faire ».'}],
  sol:'<p>La femme a pris le train de 8 h 15 depuis Brighton, est descendue à Victoria vers 9 h 15 (<i lang="en">quarter past nine</i>), puis est allée dans un café. Son petit sac noir, avec ses clés et ses lunettes mais sans son portefeuille, était resté dans le train : quelqu’un l’a trouvé.</p><p>Rapport : <i lang="en">She got off the train at Victoria and went to a café.</i> Toi : <i lang="en">I lost my phone on the bus two hours ago.</i> Question de l’agent : <i lang="en">What did you do after that?</i></p>'},
]},

/* ============================================================ 2. Comparing */
{subj:'en', sem:'a2', id:'en-a2-compare', o:2, h:'Comparing', p:'Comparer des villes, des logements et des personnes : comparatifs et superlatifs (courts, longs, irréguliers), <i lang="en">as … as</i>, et les adjectifs pour décrire.', steps:[
 {kind:'Écoute', h:'Deux villes, deux emplois',
  p:`<p>À la fin de cette unité, tu sauras comparer deux villes, deux logements ou deux personnes, dire ce qui est le meilleur ou le pire, et donner ta préférence.</p>
<p>Lily a reçu deux offres d’emploi, l’une à Édimbourg, l’autre à Manchester. Elle en parle avec son ami Sam. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> quelle ville Lily choisit-elle, et pour quelle raison principale&nbsp;?</p>`,
  audio:[['Sam','So, Edinburgh or Manchester? Which job do you prefer?'],['Lily','I don’t know! Edinburgh is more beautiful, and it’s smaller and quieter.'],['Sam','But Manchester is bigger and livelier. There’s more to do in the evening.'],['Lily','That’s true. And flats in Manchester are cheaper.'],['Sam','What about the weather?'],['Lily','It rains a lot in both cities! But Edinburgh is colder and windier.'],['Sam','And the jobs?'],['Lily','Well, the salary in Manchester is a bit higher, but the job in Edinburgh is much more interesting.'],['Sam','So?'],['Lily','So, Edinburgh. For me, an interesting job is more important than money.']], cache:true,
  opts:['Manchester, parce que le salaire y est plus élevé.','Manchester, parce que la ville est plus animée.','Édimbourg, parce que le travail y est plus intéressant.','Édimbourg, parce que les appartements y sont moins chers.'], ans:2,
  why:'<i lang="en">So, Edinburgh. For me, an interesting job is more important than money.</i> Le salaire est un peu plus élevé à Manchester (<i lang="en">a bit higher</i>), et les appartements y sont moins chers (<i lang="en">cheaper</i>), mais le travail à Édimbourg est bien plus intéressant.'},

 {kind:'Vocabulaire', h:'Décrire une ville',
  p:`<p>Les adjectifs pour décrire une ville ou un quartier, par paires de contraires quand c’est possible. Touche une ligne pour l’entendre, puis répète-la.</p>`,
  mots:[['lively','animé, vivant','Manchester is a lively city.'],['quiet','calme, tranquille','We live in a quiet street.'],['noisy','bruyant','My street is very noisy at night.'],['crowded','bondé, plein de monde','The beach is crowded in August.'],['busy','animé, fréquenté (lieu) ; occupé (personne)','Oxford Street is always busy.'],['safe','sûr, sans danger','Is this area safe at night?'],['dangerous','dangereux','This road is dangerous.'],['expensive','cher','London is very expensive.'],['cheap','bon marché, pas cher','The buses here are cheap.'],['clean','propre','The streets are very clean.'],['dirty','sale','The river was dirty.'],['polluted','pollué','The air is often polluted in big cities.'],['historic','historique, chargé d’histoire','York is a historic city.'],['modern','moderne','The station is very modern.'],['boring','ennuyeux','My town is a bit boring.'],['There’s a lot to do','il y a beaucoup à faire','There’s a lot to do in the evening.']],
  note:'<b>Faux ami :</b> <i lang="en">a large city</i> = une grande ville ; <i lang="en">large</i> veut dire « grand », pas « large » (= <i lang="en">wide</i>). <i lang="en">Historic</i> (qui a une histoire importante : <i lang="en">a historic building</i>) n’est pas <i lang="en">historical</i> (qui concerne l’histoire : <i lang="en">a historical novel</i>).'},

 {kind:'Pratique', h:'À toi : décris ta ville',
  p:'Écris en anglais : « Ma ville est calme et propre, mais un peu ennuyeuse. » <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase', long:true,
  txt:V('My ',['town','city'],' is ',['quiet and clean','clean and quiet'],' but ',['a bit','a little','a little bit','slightly'],' boring.'),
  why:'<i lang="en">My town is quiet and clean, but a bit boring.</i> Une petite ville = <i lang="en">town</i>, une grande = <i lang="en">city</i>. « Un peu » devant un adjectif : <i lang="en">a bit</i> ou <i lang="en">a little</i>.'},

 {kind:'Grammaire', h:'Le comparatif des adjectifs courts',
  p:`<p>Lily dit : <i lang="en">Edinburgh is smaller and quieter. Flats in Manchester are cheaper.</i> Pour dire « plus … que » avec un adjectif court, l’anglais ne met pas de mot devant : il ajoute une terminaison.</p>
<div class="def"><p>Adjectif court (une syllabe : <i lang="en">small, cheap, old, fast</i>) + <b>-er</b> + <b>than</b> : <i lang="en">Manchester is bigger than Edinburgh.</i> <b>than</b> = que.</p><p>Orthographe : en général + <i>-er</i> (<i lang="en">cheap → cheaper</i>) ; finale en <i>-e</i> : + <i>-r</i> (<i lang="en">nice → nicer, large → larger</i>) ; une voyelle + une consonne : on double la consonne (<i lang="en">big → bigger, hot → hotter, wet → wetter</i>) ; deux syllabes en <i>-y</i> : <i>y</i> → <i>-ier</i> (<i lang="en">easy → easier, busy → busier, noisy → noisier, funny → funnier</i>). <i lang="en">Quiet</i> fait aussi <i lang="en">quieter</i>.</p></div>
<div class="idea"><p>Le <i>-er</i> joue le rôle de « plus », collé à l’adjectif. Après <i lang="en">than</i>, on met un nom (<i lang="en">than Paris</i>), un pronom (<i lang="en">than me</i>, à l’oral) ou une phrase (<i lang="en">than I am, than it was</i>).</p></div>
<div class="ex"><p><i lang="en">My flat is cheaper than yours. Today is hotter than yesterday. Is the train faster than the bus?</i></p></div>
<div class="warn"><p>Les pièges des francophones : « que » se dit <b>than</b>, pas <i lang="en">that</i> (<s>bigger that</s>). Pas de <i lang="en">more</i> devant un adjectif court (<s>more big</s>, <s>more cheap</s>), et jamais les deux à la fois (<s>more bigger</s>).</p></div>`,
  audio:'My flat is cheaper than yours. Today is hotter than yesterday. Is the train faster than the bus?'},

 {kind:'Grammaire', h:'Adjectifs longs, irréguliers et nuances',
  p:`<p>Lily dit aussi : <i lang="en">Edinburgh is more beautiful.</i> Avec un adjectif long, impossible d’ajouter <i>-er</i> : « beautifuller » serait imprononçable.</p>
<div class="def"><p>Adjectif de deux syllabes ou plus (sauf ceux en <i>-y</i>) : <b>more</b> + adjectif + <b>than</b> : <i lang="en">more expensive, more interesting, more beautiful, more crowded, more modern</i>. Le contraire : <b>less</b> + adjectif (<i lang="en">less expensive</i>).</p><p>Irréguliers à connaître par cœur : <b>good → better</b>, <b>bad → worse</b>, <b>far → further</b> (ou <i lang="en">farther</i>).</p></div>
<div class="idea"><p>Pour <b>nuancer</b> : <i lang="en">much, a lot, far</i> + comparatif = beaucoup plus (<i lang="en">much bigger, a lot more expensive</i>) ; <i lang="en">a bit, a little, slightly</i> = un peu (<i lang="en">a bit cheaper</i>). Quelques adjectifs de deux syllabes acceptent les deux formes : <i lang="en">quieter / more quiet, cleverer / more clever</i>.</p></div>
<div class="ex"><p><i lang="en">The job in Edinburgh is much more interesting. The weather was worse than last year. My new school is further from home.</i></p></div>
<div class="warn"><p><i lang="en">very</i> ne se met jamais devant un comparatif : <s>very bigger</s> → <i lang="en">much bigger</i>. <s>more better</s> et <s>more good</s> n’existent pas : <i lang="en">better</i>. Ne confonds pas <i lang="en">worse</i> (pire, comparatif) et <i lang="en">worst</i> (le pire, superlatif).</p></div>`,
  audio:'The job in Edinburgh is much more interesting. The weather was worse than last year. My new school is further from home.'},

 {kind:'Méthode', h:'Former le comparatif en trois questions',
  p:`<p><b>Quand :</b> dès que tu compares deux choses ou deux personnes. <b>Pourquoi ça marche :</b> la forme dépend seulement de l’adjectif ; trois questions, dans l’ordre, suffisent à trancher. <b>Comment :</b></p>
<ol><li>L’adjectif est-il <b>irrégulier</b> (<i lang="en">good, bad, far</i>)&nbsp;? → <i lang="en">better, worse, further</i>.</li><li>A-t-il <b>une syllabe</b>, ou deux syllabes finissant par <i>-y</i>&nbsp;? → <b>-er</b>, avec l’orthographe (doubler, <i>y → ier</i>).</li><li>Sinon → <b>more</b> + adjectif.</li></ol><p>Puis <b>than</b> devant ce à quoi on compare.</p>`,
  demo:{enonce:'Complète : <i lang="en">The train is ___ (fast) than the bus, but it is ___ (expensive).</i>',
   etapes:[{f:'<i lang="en">fast</i> : pas irrégulier, une syllabe → <b>faster</b>',w:'On ajoute <i>-er</i>. Pas de consonne doublée : <i lang="en">fast</i> finit déjà par deux consonnes.'},
    {f:'<i lang="en">expensive</i> : trois syllabes (ex-pen-sive) → <b>more expensive</b>',w:'Un adjectif long prend <i lang="en">more</i> devant, sans <i>-er</i>.'},
    {f:'<i lang="en">faster <b>than</b> the bus</i> ; dans la 2e moitié, <i lang="en">than the bus</i> est sous-entendu.',w:'<i lang="en">than</i> introduit l’élément comparé ; inutile de le répéter.'}],
   conclusion:'<i lang="en">The train is faster than the bus, but it is more expensive.</i>'}},

 {kind:'Pratique', h:'À toi : un adjectif long',
  p:'Complète avec le comparatif de <i lang="en">expensive</i> : <i lang="en">Zurich is ___ than Lisbon.</i> <b>Question :</b> quels mots manquent&nbsp;?', lab:'Les mots manquants',
  txt:['more expensive','Zurich is more expensive than Lisbon.'],
  why:'<i lang="en">expensive</i> a trois syllabes : <i lang="en">more expensive</i>. Jamais <s>expensiver</s>.'},

 {kind:'Pratique', h:'Grand : tall ou big ?',
  p:'Pour la taille d’une personne, « grand » se dit <i lang="en">tall</i> ; <i lang="en">big</i> veut plutôt dire « gros, costaud ». Écris en anglais : « Mon frère est plus grand que moi. » <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase',
  txt:V('My brother is taller than ',['me','I am','I'],'.'),
  why:'<i lang="en">My brother is taller than me</i> (ou, plus soutenu, <i lang="en">than I am</i>). <i lang="en">tall → taller</i>. Le contraire de <i lang="en">tall</i> est <i lang="en">short</i>.'},

 {kind:'Grammaire', h:'Le superlatif : le plus, le moins',
  p:`<p>Quand une chose dépasse <b>toutes</b> les autres d’un groupe, on utilise le superlatif : « la ville la plus chère », « le pire jour ».</p>
<div class="def"><p>Adjectif court : <b>the</b> + adjectif + <b>-est</b> (même orthographe que <i>-er</i>) : <i lang="en">the cheapest, the biggest, the nicest, the easiest</i>.</p><p>Adjectif long : <b>the most</b> + adjectif : <i lang="en">the most expensive, the most beautiful</i>. Le moins : <b>the least</b> (<i lang="en">the least expensive</i>).</p><p>Irréguliers : <b>good → the best</b>, <b>bad → the worst</b>, <b>far → the furthest</b>.</p></div>
<div class="idea"><p>On précise souvent le groupe : <b>in</b> + lieu ou groupe (<i lang="en">the tallest building in the world, the best player in the team</i>) ; <b>of</b> + période ou nombre (<i lang="en">the best day of my life, the cheapest of the three</i>). Formule très fréquente : <b>one of the</b> + superlatif + nom au <b>pluriel</b> (<i lang="en">one of the oldest cities in Europe</i>).</p></div>
<div class="ex"><p><i lang="en">This is the cheapest hotel in town. It was the worst day of the year. Edinburgh is one of the most beautiful cities in Europe.</i></p></div>
<div class="warn"><p>« du monde » = <i lang="en">in the world</i>, pas <s>of the world</s>. N’oublie pas <i lang="en">the</i> : <s>It’s best restaurant</s>. Le plus = <i lang="en">the most</i>, pas <s>the more</s> ; et <s>the most big</s> → <i lang="en">the biggest</i>.</p></div>`,
  audio:'This is the cheapest hotel in town. It was the worst day of the year. Edinburgh is one of the most beautiful cities in Europe.'},

 {kind:'Pratique', h:'À toi : le meilleur',
  p:'Écris en anglais : « C’est le meilleur restaurant de la ville. » <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase',
  txt:V(['It is','It’s','This is'],' the best restaurant in ',['town','the city','the town'],'.'),
  why:'<i lang="en">It’s the best restaurant in town.</i> <i lang="en">good → the best</i>, et « de la ville » se dit avec <i lang="en">in</i>.'},

 {kind:'Pratique', h:'Remets la phrase dans l’ordre',
  p:'Touche les mots dans le bon ordre. <b>Question :</b> comment dit-on « C’était le pire jour de ma vie »&nbsp;?',
  ordre:['It was','the worst','day','of','my life'],
  why:'<i lang="en">It was the worst day of my life.</i> <i lang="en">bad → the worst</i> ; avec une période (<i lang="en">my life, the year</i>), on dit <i lang="en">of</i>.'},

 {kind:'Grammaire', h:'Aussi… que : as … as',
  p:`<p>Pour dire que deux choses sont égales, ou qu’une chose n’atteint pas le niveau d’une autre, l’anglais encadre l’adjectif avec <b>as … as</b>.</p>
<div class="def"><p><b>as</b> + adjectif (forme de base) + <b>as</b> = aussi … que : <i lang="en">My bike is as fast as yours.</i></p><p><b>not as … as</b> = pas aussi … que, donc moins … que : <i lang="en">Lyon isn’t as big as Paris.</i> C’est la façon la plus naturelle de dire « moins … que », plus courante que <i lang="en">less … than</i>.</p><p>Aussi : <b>the same as</b> = le même que ; <b>different from</b> = différent de.</p></div>
<div class="idea"><p>L’adjectif ne change pas entre les deux <i lang="en">as</i> : pas de <i>-er</i>, pas de <i lang="en">more</i>. Pour nuancer : <i lang="en">just as</i> (tout aussi), <i lang="en">nearly as</i> (presque aussi), <i lang="en">twice as</i> (deux fois plus) : <i lang="en">This flat is twice as big as mine.</i></p></div>
<div class="ex"><p><i lang="en">The film is as good as the book. My street isn’t as noisy as yours. Your phone is the same as mine.</i></p></div>
<div class="warn"><p>Les pièges : <s>as big than</s>, <s>as bigger as</s> → <i lang="en">as big as</i>. « Le même que » = <i lang="en">the same as</i>, pas <s>the same that</s>. « Différent de » = <i lang="en">different from</i>, pas <s>different of</s>.</p></div>`,
  audio:'The film is as good as the book. My street isn’t as noisy as yours. Your phone is the same as mine.'},

 {kind:'Pratique', h:'À toi : not as … as',
  p:'Réécris la phrase avec <i lang="en">not as … as</i>, sans changer le sens : <i lang="en">Paris is bigger than Lyon.</i> Commence par <i lang="en">Lyon</i>. <b>Question :</b> quelle est la nouvelle phrase&nbsp;?', lab:'Ta phrase',
  txt:['Lyon is not as big as Paris.','Lyon is not so big as Paris.','Lyon is not as large as Paris.'],
  why:'<i lang="en">Lyon isn’t as big as Paris.</i> L’adjectif reste à la forme de base entre les deux <i lang="en">as</i>.'},

 {kind:'Vocabulaire', h:'Décrire une personne',
  p:`<p>Pour comparer des personnes : l’apparence d’abord, puis le caractère. Touche une ligne pour l’entendre.</p>`,
  mots:[['tall','grand (taille)','My brother is very tall.'],['short','petit (taille)','She’s shorter than her sister.'],['slim','mince','He’s tall and slim.'],['friendly','aimable, sympathique','The people here are very friendly.'],['nice','gentil, sympa','Your neighbour is really nice.'],['shy','timide','I was very shy at school.'],['confident','sûr de soi','She’s more confident than before.'],['funny','drôle','He’s the funniest person in my family.'],['clever','intelligent, malin','Clara is cleverer than me.'],['hard-working','travailleur','My boss is very hard-working.'],['lazy','paresseux','I’m lazy on Sundays.'],['kind','gentil, bienveillant','It was very kind of you.'],['patient','patient','You’re more patient than me.'],['rude','impoli, grossier','The waiter was really rude.'],['easy-going','facile à vivre, décontracté','My dad is very easy-going.']],
  note:'<b>Faux ami :</b> <i lang="en">sympathetic</i> veut dire « compatissant ». « Il est sympa » = <i lang="en">He’s nice</i> ou <i lang="en">He’s friendly</i>. Pour quelqu’un de mince, dis <i lang="en">slim</i> (flatteur) plutôt que <i lang="en">thin</i> (maigre).'},

 {kind:'Pratique', h:'À toi : compare deux personnes',
  p:'Écris en anglais : « Ma sœur est plus timide que moi, mais elle est plus drôle. » <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase', long:true,
  txt:V('My sister is ',['shyer','more shy'],' than ',['me','I am'],' but ',['she is','she’s'],' funnier',['',' than me',' than I am'],'.'),
  why:'<i lang="en">My sister is shyer than me, but she’s funnier.</i> <i lang="en">shy</i> fait <i lang="en">shyer</i> (on entend aussi <i lang="en">more shy</i>) ; <i lang="en">funny</i> fait <i lang="en">funnier</i> (<i>y → ier</i>).'},

 {kind:'Prononciation', h:'Than, as, -er : les formes faibles',
  p:`<p>Dans une phrase, les petits mots anglais sont <b>faibles</b> : on les dit vite, avec une voyelle neutre (« eu » très bref, le <i>schwa</i>). Les francophones les prononcent souvent trop fort, ce qui rend la phrase hachée.</p>
<div class="def"><ul><li><b>than</b> se dit « dheun », très court. Le <i>th</i> est sonore : langue entre les dents, en faisant vibrer la voix, ni « z » ni « d ».</li><li><b>as</b> se dit « euz » : <i lang="en">as old as</i> ≈ « euz-old-euz ».</li><li>Le <b>-er</b> final ne fait pas entendre de r en anglais britannique : <i lang="en">bigger</i> ≈ « bigueu », <i lang="en">cheaper</i> ≈ « tchipeu ».</li><li>L’accent tombe sur l’adjectif et sur ce qu’on compare : <i lang="en">It’s <b>big</b>ger than <b>mine</b>.</i></li></ul></div>
<p>Écoute, puis répète en gardant les petits mots légers.</p>`,
  audio:'bigger than mine. cheaper than London. as old as my father. It’s much bigger than my flat.'},

 {kind:'Oral', h:'Répète : deux appartements',
  p:'Écoute, puis dis la phrase à voix haute. Garde <i lang="en">than</i> léger et accentue <i lang="en">smaller</i>, <i lang="en">old</i> et <i lang="en">quieter</i>.',
  dire:'My new flat is smaller than the old one, but it’s much quieter.'},

 {kind:'Lecture', h:'Quitter Londres pour le pays de Galles',
  p:`<p>Lis ce billet de blog, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Blog : From London to Wales"><p lang="en">Two years ago, I left London and moved to a small village in Wales. People often ask me: “Is life better there?” Well, it’s different. My village is much quieter than London, and the air is cleaner. Houses are cheaper too: my cottage was less expensive than my old flat, and it’s twice as big. The people are friendlier, and everybody knows your name. But it isn’t all perfect. The buses are not as frequent as in London. There are only three a day, so I need a car. The winters are longer and darker, and the nearest cinema is forty minutes away. The most difficult thing for me is the internet: it’s the slowest internet in the world! So, is my life easier? No. But I’m happier.</p></div>
<p><b>Question :</b> qu’est-ce qui est moins pratique au village qu’à Londres&nbsp;?</p>`,
  audio:'Two years ago, I left London and moved to a small village in Wales. People often ask me: Is life better there? Well, it’s different. My village is much quieter than London, and the air is cleaner. Houses are cheaper too: my cottage was less expensive than my old flat, and it’s twice as big. The people are friendlier, and everybody knows your name. But it isn’t all perfect. The buses are not as frequent as in London. There are only three a day, so I need a car. The winters are longer and darker, and the nearest cinema is forty minutes away. The most difficult thing for me is the internet: it’s the slowest internet in the world! So, is my life easier? No. But I’m happier.',
  opts:['Les transports en commun.','Le prix du logement.','Les relations avec les voisins.','La qualité de l’air.'], ans:0,
  why:'<i lang="en">The buses are not as frequent as in London. There are only three a day, so I need a car.</i> Les maisons sont moins chères, les gens plus aimables et l’air plus propre : ce sont des avantages du village.'},

 {kind:'Dictée', h:'Dictée : le nouvel appartement',
  p:'Écoute et écris exactement la phrase. Réécoute autant que tu veux, et utilise « Plus lentement ».',
  dictee:'Her new flat is bigger and much quieter than the old one.',
  why:'<i lang="en">bigger</i> double le g ; <i lang="en">quieter</i> s’écrit avec <i>-ie-</i> au milieu. <i lang="en">than</i>, pas <i lang="en">then</i> (ensuite).'},

 {kind:'Oral', h:'Compare deux endroits',
  p:`<p>Parle 45 secondes à 1 minute : compare deux villes ou deux quartiers que tu connais (où tu as habité, où tu passes tes vacances). Utilise plusieurs comparatifs, un superlatif et <i lang="en">as … as</i>, puis dis lequel tu préfères et pourquoi.</p>`,
  oral:{modele:'I grew up in Geneva, but now I live in Fribourg. Fribourg is much smaller than Geneva, and it’s quieter. Rents are cheaper, so my flat is bigger than my old one. Geneva is more international, and there’s more to do in the evening. Fribourg isn’t as lively as Geneva, but the old town is the most beautiful place I know. For me, Fribourg is better: people are friendlier and life is less stressful.',
   criteres:['J’ai utilisé au moins trois comparatifs (-er than, more … than)','J’ai utilisé un superlatif (the …est, the most …)','J’ai utilisé as … as ou not as … as','J’ai nuancé avec much, a lot ou a bit','J’ai donné ma préférence et une raison']}},

 {kind:'Écriture', h:'Conseille un ami',
  p:'Un ami anglophone hésite entre deux endroits que tu connais pour un week-end. Écris-lui un message (au moins 60 mots) : compare les deux endroits sur trois ou quatre points (prix, ambiance, paysage, gens), utilise un superlatif et une comparaison avec <i lang="en">as … as</i>, puis donne ton conseil.',
  ecrire:{min:60, modele:'Hi Josh! You asked me about Lausanne and Montreux. Both are lovely, but they’re very different. Lausanne is bigger and livelier than Montreux, and there are more bars and restaurants. Montreux is quieter and a bit more expensive, but the views of the lake and the mountains are amazing. Restaurants in Lausanne aren’t as expensive as in Montreux. For me, the best place for a weekend with friends is Lausanne. See you soon! Léa',
   criteres:[{t:'J’ai utilisé un comparatif avec than', re:'\\b(\\w+er|more \\w+|less \\w+|better|worse|further) than\\b'},{t:'J’ai utilisé un superlatif', re:'\\bthe (most|least|best|worst|\\w+est)\\b'},{t:'J’ai utilisé as … as', re:'\\bas \\w+ as\\b'},{t:'J’ai nuancé (much, a lot, a bit…)', re:'\\b(much|a lot|a bit|a little|far|slightly) (\\w+er|more|less|better|worse)\\b'},'J’ai donné un conseil clair à la fin']}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li>Adjectif court : <i lang="en">-er than</i> (<i lang="en">cheaper, bigger, nicer, easier</i>) ; superlatif <i lang="en">the -est</i> (<i lang="en">the cheapest, the biggest</i>).</li><li>Adjectif long : <i lang="en">more … than</i>, <i lang="en">the most …</i> ; le contraire : <i lang="en">less</i>, <i lang="en">the least</i>.</li><li>Irréguliers : <i lang="en">good, better, the best</i> ; <i lang="en">bad, worse, the worst</i> ; <i lang="en">far, further, the furthest</i>.</li><li>« que » = <i lang="en">than</i>. Jamais <s>more bigger</s>, <s>very bigger</s> : <i lang="en">much bigger, a bit cheaper</i>.</li><li>Superlatif + <i lang="en">in</i> pour un lieu ou un groupe (<i lang="en">in the world</i>), <i lang="en">of</i> pour une période (<i lang="en">of my life</i>) ; <i lang="en">one of the</i> + pluriel.</li><li><i lang="en">as … as</i> = aussi … que ; <i lang="en">not as … as</i> = moins … que ; <i lang="en">the same as, different from</i>.</li><li>Une personne grande : <i lang="en">tall</i>. Sympa : <i lang="en">nice, friendly</i> (pas <i lang="en">sympathetic</i>).</li><li>Prononciation : <i lang="en">than</i> et <i lang="en">as</i> faibles, <i lang="en">-er</i> final sans r.</li></ul></div>`},

 {kind:'Mission', h:'Trois hôtels à Bath',
  p:'Tu prépares un week-end à Bath, une ville historique du sud-ouest de l’Angleterre. Au téléphone, une employée de l’office du tourisme compare trois hôtels. Écoute, puis réponds aux questions une par une.',
  audio:[['Agent','There are three hotels near the centre. The Crown is the cheapest: it’s eighty pounds a night, but it’s a bit noisy, because it’s on the main street. The Abbey is a hundred and ten pounds. It’s quieter than the Crown, and the rooms are bigger. The Royal is the most expensive: a hundred and sixty pounds. It’s the most beautiful, and it has a spa, but it’s further from the station.'],['Customer','And which one is the closest to the station?'],['Agent','The Crown. It’s only five minutes on foot.']], cache:true,
  parts:[
   {q:'a) Quel hôtel est le plus proche de la gare&nbsp;?', opts:['The Abbey','The Royal','The Crown'], ans:2, hint:'Écoute la dernière réplique, après <i lang="en">the closest to the station</i>.', why:'<i lang="en">The Crown. It’s only five minutes on foot.</i> Le Royal, lui, est <i lang="en">further from the station</i>.'},
   {q:'b) Combien de livres de plus coûte une nuit au Royal qu’à l’Abbey&nbsp;? Écris le nombre.', lab:'Livres', txt:['50','£50','fifty','50 pounds','fifty pounds'], hint:'<i lang="en">a hundred and sixty</i> moins <i lang="en">a hundred and ten</i>.', why:'160 − 110 = 50 : le Royal coûte 50 livres de plus par nuit.'},
   {q:'c) Combien paies-tu pour trois nuits au Crown&nbsp;? Écris le nombre de livres.', lab:'Livres', txt:['240','£240','240 pounds'], hint:'<i lang="en">eighty pounds a night</i>, trois fois.', why:'3 × 80 = 240 livres.'},
   {q:'d) Écris en anglais : « L’Abbey est plus calme que le Crown, mais il est plus cher. »', lab:'Ta phrase', txt:V('The Abbey is ',['quieter','more quiet'],' than the Crown but ',['it is','it’s'],' more expensive',['',' than the Crown'],'.'), hint:'<i lang="en">quiet → quieter</i> ; <i lang="en">expensive</i> est long. Un hôtel se reprend par <i lang="en">it</i>.', why:'<i lang="en">The Abbey is quieter than the Crown, but it’s more expensive.</i> (110 livres contre 80)'},
   {q:'e) Écris en anglais : « Le Royal est le plus cher, mais c’est le plus beau. »', lab:'Ta phrase', txt:V('The Royal is the most expensive',['',' hotel',' one'],' but ',['it is','it’s'],' the most beautiful',['',' hotel',' one'],'.'), hint:'Deux adjectifs longs : <i lang="en">the most</i> + adjectif. « c’est » se dit ici <i lang="en">it’s</i>.', why:'<i lang="en">The Royal is the most expensive, but it’s the most beautiful.</i>'}],
  sol:'<p lang="en">There are three hotels near the centre. The Crown is the cheapest: it’s eighty pounds a night, but it’s a bit noisy. The Abbey is a hundred and ten pounds. It’s quieter than the Crown, and the rooms are bigger. The Royal is the most expensive: a hundred and sixty pounds. It’s the most beautiful, but it’s further from the station. The Crown is the closest: five minutes on foot.</p><p>Le Crown est le moins cher (80 £) et le plus proche de la gare ; 3 nuits coûtent 3 × 80 = 240 £. Le Royal coûte 160 − 110 = 50 £ de plus que l’Abbey. <i lang="en">The Abbey is quieter than the Crown, but it’s more expensive. The Royal is the most expensive, but it’s the most beautiful.</i></p>'},

 {kind:'Mission', h:'Choisir un appartement à Londres',
  p:`<p>Tu commences un travail à Londres et tu compares trois annonces d’appartements. Lis-les, puis réponds.</p>
<div class="blk" data-t="Flats to rent"><p lang="en"><b>Flat A, Camden.</b> 2 bedrooms, 65 m². £1,900 a month. 10 minutes from your office by bike. Busy, noisy street.</p><p lang="en"><b>Flat B, Hackney.</b> 2 bedrooms, 80 m², small garden. £1,750 a month. 25 minutes from your office by bike. Quiet street.</p><p lang="en"><b>Flat C, Islington.</b> 1 bedroom, 50 m². £1,900 a month. 5 minutes from your office on foot. New building.</p></div>`,
  parts:[
   {q:'a) Quel appartement est le plus grand&nbsp;?', opts:['Flat A','Flat B','Flat C'], ans:1, hint:'Compare les surfaces en m².', why:'80 m² contre 65 et 50 : <i lang="en">Flat B is the biggest</i>.'},
   {q:'b) Complète avec un adjectif : <i lang="en">Flat A is as ___ as Flat C.</i>', lab:'Le mot', txt:['expensive','pricey','dear'], hint:'Regarde les loyers : ils sont identiques.', why:'Les deux coûtent 1 900 £ : <i lang="en">Flat A is as expensive as Flat C.</i>'},
   {q:'c) Combien de livres économises-tu en un an avec B plutôt qu’avec A&nbsp;? Écris le nombre.', lab:'Livres par an', txt:['1800','1 800','1,800','1’800','£1800','£1,800','1800 pounds'], hint:'Différence par mois, puis × 12.', why:'1 900 − 1 750 = 150 £ par mois, et 150 × 12 = 1 800 £ par an.'},
   {q:'d) Écris en anglais, avec <i lang="en">not as … as</i> : « L’appartement C est moins grand que l’appartement A. »', lab:'Ta phrase', txt:V('Flat C is not ',['as','so'],' ',['big','large'],' as Flat A.'), hint:'<i lang="en">Flat C</i> + <i lang="en">is not as</i> + adjectif de base + <i lang="en">as</i>…', why:'<i lang="en">Flat C isn’t as big as Flat A.</i> (50 m² contre 65 m²)'},
   {q:'e) Écris en anglais : « L’appartement B est le moins cher et le plus grand, mais il est plus loin de mon bureau. »', lab:'Ta phrase', long:true, txt:V('Flat B is the ',['cheapest and the biggest','biggest and the cheapest','cheapest and biggest','biggest and cheapest','cheapest and the largest','largest and the cheapest','least expensive and the biggest','least expensive and the largest'],' but ',['it is','it’s'],' ',['further from','farther from','further away from','farther away from'],' my office.'), hint:'« le moins cher » = <i lang="en">the cheapest</i> ; « plus loin » = comparatif irrégulier de <i lang="en">far</i>.', why:'<i lang="en">Flat B is the cheapest and the biggest, but it’s further from my office.</i> <i lang="en">far → further</i>.'}],
  sol:'<p>B est le plus grand (80 m²) et le moins cher (1 750 £), mais le plus loin (25 minutes à vélo). A et C coûtent le même prix : <i lang="en">Flat A is as expensive as Flat C</i>. Avec B, tu économises 150 £ par mois, soit 150 × 12 = 1 800 £ par an. <i lang="en">Flat C isn’t as big as Flat A. Flat B is the cheapest and the biggest, but it’s further from my office.</i></p>'},
]},

/* ============================================================ 3. Plans */
{subj:'en', sem:'a2', id:'en-a2-plans', o:3, h:'Plans', p:'Parler de ses projets et de ses rendez-vous : <i lang="en">be going to</i>, le présent continu pour l’avenir, et inviter, accepter ou refuser poliment.', steps:[
 {kind:'Écoute', h:'Un coup de fil pour samedi',
  p:`<p>À la fin de cette unité, tu sauras parler de tes projets et de ton agenda, inviter quelqu’un, et accepter ou refuser une invitation poliment.</p>
<p>Mia appelle son ami Leo. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> quand et où vont-ils finalement se voir&nbsp;?</p>`,
  audio:[['Mia','Hi Leo! Are you doing anything on Saturday evening?'],['Leo','Saturday? Why?'],['Mia','It’s my birthday, and I’m having a few friends over for dinner. Would you like to come?'],['Leo','Oh, I’d love to, but I’m afraid I can’t. I’m visiting my parents in Brighton this weekend. I’m taking the train on Saturday morning.'],['Mia','Oh, what a shame! When are you coming back?'],['Leo','On Sunday afternoon. How about a drink on Sunday evening?'],['Mia','Sounds great. I’m going to stay at home and do nothing on Sunday anyway!'],['Leo','Perfect. Let’s meet at the Red Lion at seven.'],['Mia','See you then!']], cache:true,
  opts:['Samedi soir, chez Mia.','Samedi matin, à la gare.','Dimanche à 19 heures, au Red Lion.','Dimanche après-midi, à Brighton.'], ans:2,
  why:'<i lang="en">How about a drink on Sunday evening? … Let’s meet at the Red Lion at seven.</i> Leo ne peut pas venir samedi : il rend visite à ses parents à Brighton.'},

 {kind:'Vocabulaire', h:'Les mots pour inviter',
  p:`<p>Les expressions toutes faites pour inviter, accepter et refuser. Apprends-les en bloc, comme des mots : c’est ce qui rend ton anglais naturel. Touche une ligne pour l’entendre.</p>`,
  mots:[['Are you free on…?','Es-tu libre … ?','Are you free on Friday?'],['Are you doing anything on…?','Tu fais quelque chose … ?','Are you doing anything on Saturday?'],['Would you like to…?','Voudrais-tu… ? (inviter)','Would you like to come for dinner?'],['How about…? / What about…?','Et si… ? Que dirais-tu de… ?','How about a drink on Sunday?'],['Why don’t we…?','Pourquoi ne pas… ?','Why don’t we go to the beach?'],['Let’s…','Allons…, faisons…','Let’s meet at seven.'],['I’d love to.','Avec plaisir, j’adorerais.','I’d love to! Thanks.'],['That sounds great.','Ça a l’air super.','A picnic? That sounds great.'],['I’m afraid I can’t.','Je crains de ne pas pouvoir.','I’m afraid I can’t. I’m working.'],['What a shame!','Quel dommage !','You can’t come? What a shame!'],['Maybe another time.','Une autre fois peut-être.','Not this week, but maybe another time.'],['to have people over','recevoir des amis chez soi','I’m having some friends over tonight.'],['to go out','sortir','Do you want to go out tonight?'],['to cancel','annuler','Sorry, I have to cancel our meeting.'],['See you then!','À tout à l’heure, à ce moment-là !','Seven o’clock? OK, see you then!']],
  note:'<b>Attention :</b> <i lang="en">I’m afraid</i> ne veut pas dire « j’ai peur » ici : c’est une formule polie pour annoncer une mauvaise nouvelle. Et dans <i lang="en">I’d love to</i>, le <i lang="en">to</i> final est obligatoire : <s>I’d love.</s>'},

 {kind:'Pratique', h:'À toi : refuser poliment',
  p:'Un ami t’invite, mais tu n’es pas libre. Écris en anglais : « J’aimerais beaucoup, mais je crains de ne pas pouvoir. » <b>Question :</b> quelle est ta réponse en anglais&nbsp;?', lab:'Ta réponse', long:true,
  txt:V(['I’d love to','I would love to'],' but ',['I am afraid I cannot','unfortunately I cannot','I cannot'],'.'),
  why:'<i lang="en">I’d love to, but I’m afraid I can’t.</i> On montre d’abord qu’on aimerait, puis on refuse avec <i lang="en">I’m afraid</i>, qui adoucit le « non ».'},

 {kind:'Grammaire', h:'Be going to : ce qu’on a décidé de faire',
  p:`<p>Mia dit : <i lang="en">I’m going to stay at home and do nothing on Sunday.</i> Elle a déjà pris sa décision. Pour parler d’un projet, l’anglais utilise très souvent <b>be going to</b>.</p>
<div class="def"><p><b>Forme :</b> sujet + <b>am/is/are</b> + <b>going to</b> + base verbale. <i lang="en">I’m going to call her. She’s going to study medicine. They’re going to move.</i></p><p><b>Négation :</b> <i lang="en">I’m not going to…, he isn’t going to…, we aren’t going to…</i> <b>Question :</b> <i lang="en">Are you going to…? What are you going to do?</i> Réponses courtes : <i lang="en">Yes, I am. / No, I’m not.</i></p></div>
<div class="idea"><p><i lang="en">Going to</i> exprime une <b>intention</b> : la décision est prise <b>avant</b> de parler. C’est l’équivalent de « je vais + infinitif ». Deuxième emploi : une <b>prédiction</b> fondée sur ce qu’on voit maintenant : <i lang="en">Look at those clouds! It’s going to rain.</i></p></div>
<div class="ex"><p><i lang="en">We’re going to paint the kitchen. Are you going to apply for the job? Be careful! You’re going to fall!</i></p></div>
<div class="warn"><p>Les pièges : ne pas oublier <i lang="en">be</i> (<s>I going to</s> → <i lang="en">I’m going to</i>) ; après <i lang="en">to</i>, la base (<s>she’s going to called</s>). « Je vais à Londres » (un déplacement) = <i lang="en">I’m going to London</i> : ici <i lang="en">to</i> introduit un lieu. Avec <i lang="en">go</i>, on évite souvent <i lang="en">going to go</i> : <i lang="en">I’m going to London next week.</i> Enfin, « je vais bien » = <i lang="en">I’m fine</i>, sans <i lang="en">go</i>.</p></div>`,
  audio:'We’re going to paint the kitchen. Are you going to apply for the job? Be careful! You’re going to fall!'},

 {kind:'Méthode', h:'Construire une phrase avec going to',
  p:`<p><b>Quand :</b> pour un projet décidé ou une prédiction évidente. <b>Pourquoi ça marche :</b> c’est <i lang="en">be</i> qui porte la personne, la négation et la question ; <i lang="en">going to</i> + base ne bouge jamais. <b>Comment :</b></p>
<ol><li>Choisis la forme de <i lang="en">be</i> selon le sujet : <i lang="en">I am, he/she/it is, we/you/they are</i>.</li><li>Ajoute <b>going to</b>, puis la <b>base</b> du verbe.</li><li>Négation : <i lang="en">not</i> après <i lang="en">be</i>. Question : <i lang="en">be</i> passe devant le sujet. Réponse courte : on reprend <i lang="en">be</i>.</li></ol>`,
  demo:{enonce:'Traduis : « Est-ce que ta sœur va vendre sa voiture&nbsp;? – Non. »',
   etapes:[{f:'Sujet : <i lang="en">your sister</i> → <b>is</b>',w:'Troisième personne du singulier.'},
    {f:'Question : <b>Is</b> <i lang="en">your sister</i> <b>going to</b>…',w:'On inverse <i lang="en">be</i> et le sujet ; <i lang="en">going to</i> reste après le sujet.'},
    {f:'Base : <b>sell</b> <i lang="en">her car?</i>',w:'Ni <i>-s</i> ni passé après <i lang="en">to</i>. « sa voiture » (à elle) = <i lang="en">her car</i>.'},
    {f:'Réponse courte : <b>No, she isn’t.</b>',w:'On reprend <i lang="en">be</i> ; <i lang="en">your sister</i> devient <i lang="en">she</i>.'}],
   conclusion:'<i lang="en">Is your sister going to sell her car? – No, she isn’t.</i>'}},

 {kind:'Pratique', h:'À toi : un projet',
  p:'Écris en anglais : « Nous allons repeindre la cuisine ce week-end. » (repeindre = <i lang="en">paint</i>) <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase',
  txt:[...V('We are going to ',['paint','repaint'],' the kitchen ',['this weekend','at the weekend','on the weekend'],'.'),...V('This weekend we are going to ',['paint','repaint'],' the kitchen.')],
  why:'<i lang="en">We’re going to paint the kitchen this weekend.</i> <i lang="en">We are</i> + <i lang="en">going to</i> + base. En américain, on dit aussi <i lang="en">on the weekend</i>.'},

 {kind:'Pratique', h:'À toi : la négation',
  p:'Écris en anglais : « Elle ne va pas accepter ce travail. » <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase',
  txt:V(['She is not','She’s not'],' going to ',['accept','take'],' ',['this','that','the'],' job.'),
  why:'<i lang="en">She isn’t going to accept this job</i> (ou <i lang="en">She’s not going to…</i>). <i lang="en">not</i> se place juste après <i lang="en">is</i>.'},

 {kind:'Pratique', h:'Il va pleuvoir : prédire avec going to',
  p:'Ton ami regarde le ciel tout noir. Tu lui dis : « Regarde ces nuages&nbsp;! Il va pleuvoir. » <b>Question :</b> comment le dis-tu en anglais&nbsp;?', lab:'Ta phrase', long:true,
  txt:V('Look at ',['those','these','the'],' clouds ',['It is','It’s'],' going to rain.'),
  why:'<i lang="en">Look at those clouds! It’s going to rain.</i> On voit déjà les signes : c’est une prédiction avec <i lang="en">going to</i>. Pour des nuages un peu éloignés, l’anglais dit <i lang="en">those</i>.'},

 {kind:'Grammaire', h:'Le présent continu pour les rendez-vous',
  p:`<p>Leo dit : <i lang="en">I’m visiting my parents this weekend. I’m taking the train on Saturday morning.</i> Le verbe est au présent continu, et pourtant il parle de l’avenir.</p>
<div class="def"><p>Présent continu (<i lang="en">am/is/are</i> + verbe en <b>-ing</b>) + moment futur = un <b>rendez-vous</b> ou un <b>arrangement</b> déjà organisé : billet acheté, heure fixée, d’autres personnes au courant. <i lang="en">I’m meeting Sarah at six. We’re flying to Rome on Friday. What are you doing tonight?</i></p></div>
<div class="idea"><p><i lang="en">Going to</i> = une intention, dans ma tête ; présent continu = c’est <b>dans l’agenda</b>. Souvent les deux vont : <i lang="en">I’m going to see / I’m seeing the dentist tomorrow.</i> Mais une simple envie sans organisation prend <i lang="en">going to</i> : <i lang="en">I’m going to learn Spanish one day</i>. Le moment futur est indispensable, sinon on comprend « maintenant ». Les horaires officiels (trains, films, cours) prennent le présent simple : <i lang="en">The train leaves at 8.15. The film starts at nine.</i></p></div>
<div class="ex"><p><i lang="en">Are you doing anything on Saturday? – Yes, I’m playing tennis with Tom.</i></p></div>
<div class="warn"><p>Le français dit « Je vois Paul demain » au présent simple ; en anglais, <s>I see Paul tomorrow</s> → <i lang="en">I’m seeing Paul tomorrow</i>. Et <s>What do you do tonight?</s> → <i lang="en">What are you doing tonight?</i> (<i lang="en">What do you do?</i> veut dire « Que fais-tu dans la vie&nbsp;? »).</p></div>`,
  audio:'I’m meeting Sarah at six. We’re flying to Rome on Friday. Are you doing anything on Saturday? Yes, I’m playing tennis with Tom.'},

 {kind:'Pratique', h:'À toi : un rendez-vous',
  p:'Le rendez-vous est noté dans ton agenda. Écris en anglais : « Je vois le dentiste jeudi à 10 heures. » <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase', long:true,
  txt:V(['I am seeing the dentist','I am going to the dentist','I am going to see the dentist','I have an appointment with the dentist','I have a dentist appointment'],' ',[...TEN.map(t=>'on Thursday at '+t),...TEN.map(t=>'at '+t+' on Thursday')],'.'),
  why:'<i lang="en">I’m seeing the dentist on Thursday at ten.</i> Un rendez-vous fixé : présent continu + moment. <i lang="en">I have an appointment with the dentist…</i> est aussi très naturel. Jamais <s>I see the dentist on Thursday</s>.'},

 {kind:'Écoute', h:'Un message vocal',
  p:'Ton collègue Ben t’a laissé un message vocal. <b>Question :</b> à quelle heure voit-il les nouveaux clients&nbsp;? Écris l’heure (par exemple 9:15).', audio:'Hi, it’s Ben. Just a quick message about tomorrow. I’m meeting the new clients at half past two, so I’m not having lunch with you. Sorry! Are you free on Friday instead?', cache:true, lab:'Heure',
  txt:['2:30','14:30','14h30','2h30','2.30','14.30','half past two','two thirty','2:30 pm','2.30 pm','2:30pm','2.30pm'],
  why:'<i lang="en">Half past two</i> = 2 h 30, donc 14 h 30. Ben utilise le présent continu pour son agenda : <i lang="en">I’m meeting… I’m not having lunch with you.</i>'},

 {kind:'Vocabulaire', h:'Quand ? Les repères du futur',
  p:`<p>Pour situer un projet, il faut les expressions de temps. « Dans + durée » se dit <b>in</b> : <i lang="en">in two weeks</i> (dans deux semaines), à ne pas confondre avec <i lang="en">two weeks ago</i> (il y a deux semaines). Touche une ligne pour l’entendre.</p>`,
  mots:[['tonight','ce soir, cette nuit','What are you doing tonight?'],['tomorrow morning','demain matin','I’m leaving tomorrow morning.'],['the day after tomorrow','après-demain','We’re flying the day after tomorrow.'],['this weekend','ce week-end','Are you doing anything this weekend?'],['next week','la semaine prochaine','I’m starting a new job next week.'],['next month','le mois prochain','They’re getting married next month.'],['in two weeks / in a fortnight','dans deux semaines','I’m going on holiday in two weeks.'],['in three days','dans trois jours','The concert is in three days.'],['soon','bientôt','I’m going to call her soon.'],['at the end of the month','à la fin du mois','I’m moving at the end of the month.'],['one day','un jour (dans le futur)','I’m going to visit Japan one day.'],['I’m free','je suis libre','I’m free on Thursday afternoon.'],['I’m busy','je suis pris, occupé','Sorry, I’m busy tonight.']],
  note:'<b>Pièges :</b> « dans trois jours » = <i lang="en">in three days</i>, jamais <s>after three days</s> ni <s>since three days</s>. On dit <i lang="en">this weekend, next week, tomorrow</i> sans préposition : <s>on next week</s>. <i lang="en">A fortnight</i> (quinze jours) est britannique ; les Américains disent <i lang="en">two weeks</i>.'},

 {kind:'Pratique', h:'À toi : dans trois semaines',
  p:'Écris en anglais : « Je pars en Écosse dans trois semaines. » <b>Question :</b> quelle est la phrase en anglais&nbsp;?', lab:'Ta phrase',
  txt:V(['I am going to Scotland','I am leaving for Scotland','I am going to go to Scotland','I am travelling to Scotland','I am traveling to Scotland','I am flying to Scotland'],[' in three weeks',' in three weeks’ time',' in 3 weeks',' in 3 weeks’ time'],'.'),
  why:'<i lang="en">I’m going to Scotland in three weeks.</i> Un voyage organisé : présent continu. « Dans + durée » = <i lang="en">in</i> (en britannique aussi <i lang="en">in three weeks’ time</i>).'},

 {kind:'Méthode', h:'Inviter et répondre poliment',
  p:`<p><b>Quand :</b> pour proposer une sortie ou répondre à une invitation. <b>Pourquoi ça marche :</b> en anglais, un « non » sec paraît impoli. On l’adoucit en trois temps : une formule aimable, une raison (souvent au présent continu, puisque c’est un engagement déjà pris), puis une autre proposition. <b>Comment :</b></p>
<ul><li>Inviter : <i lang="en">Would you like to</i> + base&nbsp;? (poli) ; <i lang="en">Do you want to</i> + base&nbsp;? (familier) ; <i lang="en">How about</i> + nom ou verbe en <b>-ing</b>&nbsp;? ; <i lang="en">Why don’t we</i> + base&nbsp;? ; <i lang="en">Let’s</i> + base.</li><li>Accepter : <i lang="en">I’d love to! That sounds great. Good idea! Why not?</i></li><li>Refuser : <i lang="en">I’d love to, but… / I’m afraid I can’t. / Sorry, I’m busy.</i> + raison + <i lang="en">Maybe another time? How about Sunday?</i></li></ul>
<p>Les pièges : <s>Would you like coming</s> → <i lang="en">to come</i> ; <s>How about to go</s> → <i lang="en">How about going</i> ; <s>Let’s to go</s> → <i lang="en">Let’s go</i>.</p>`,
  demo:{enonce:'Ta collègue te demande : <i lang="en">Would you like to come to the cinema on Friday?</i> Tu travailles tard vendredi, mais tu es libre samedi. Réponds poliment.',
   etapes:[{f:'<i lang="en">I’d love to, but I’m afraid I can’t.</i>',w:'On montre que l’invitation fait plaisir avant de dire non.'},
    {f:'<i lang="en">I’m working late on Friday.</i>',w:'La raison : un engagement déjà prévu, donc présent continu + moment.'},
    {f:'<i lang="en">How about Saturday?</i>',w:'On propose une autre date : la porte reste ouverte.'}],
   conclusion:'<i lang="en">I’d love to, but I’m afraid I can’t. I’m working late on Friday. How about Saturday?</i>'}},

 {kind:'Pratique', h:'À toi : proposer une sortie',
  p:'Écris en anglais, avec <i lang="en">How about</i> : « Et si on allait au cinéma vendredi&nbsp;? » <b>Question :</b> quelle est ta proposition&nbsp;?', lab:'Ta question',
  txt:V('How about ',['going to the cinema','going to the movies','the cinema'],' ',['on Friday','on Friday evening','on Friday night','this Friday','Friday'],'?'),
  why:'<i lang="en">How about going to the cinema on Friday?</i> Après <i lang="en">How about</i>, un verbe prend <i lang="en">-ing</i> (ou on met juste un nom : <i lang="en">How about the cinema?</i>).'},

 {kind:'Prononciation', h:'Going to, want to : l’anglais rapide',
  p:`<p>À l’oral rapide, les anglophones réduisent les petits mots. Tu dois les <b>comprendre</b>, même si tu n’es pas obligé de les imiter.</p>
<div class="def"><ul><li><b>going to</b> + verbe se réduit souvent à « gonna » : <i lang="en">I’m gonna call her</i>. À l’écrit, écris toujours <i lang="en">going to</i> : <i lang="en">gonna</i> est très familier. Pas de réduction quand <i lang="en">to</i> introduit un lieu : <i lang="en">I’m going to London</i>.</li><li><b>want to</b> devient « wanna » de la même façon.</li><li>Devant un verbe, <b>to</b> est faible : « teu ». Mais en fin de phrase, il redevient fort : <i lang="en">I’d love <b>to</b></i> (« tou »).</li><li>Le <b>’d</b> de <i lang="en">I’d</i> s’entend à peine : <i lang="en">I’d love to</i> ≈ « aïd lav tou ». Ne le supprime pas pour autant.</li></ul></div>
<p>Écoute la forme lente, puis la forme rapide, et répète la forme lente.</p>`,
  audio:'I’m going to call her. I’m gonna call her. Are you going to come? I’d love to.'},

 {kind:'Oral', h:'Répète : un refus poli',
  p:'Écoute, puis dis les deux phrases à voix haute. Mets l’accent sur <i lang="en">love</i>, <i lang="en">can’t</i> et <i lang="en">parents</i>, et garde <i lang="en">I’m afraid</i> léger et rapide.',
  dire:'I’d love to, but I’m afraid I can’t. I’m visiting my parents this weekend.'},

 {kind:'Lecture', h:'Les projets d’été de Chloé',
  p:`<p>Lis ce message de Chloé à son ami Sam, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Message"><p lang="en">Hi Sam, thanks for your message! Big news: I’m not staying in Geneva this summer. I’m going to work in a hostel in Edinburgh for two months. I’m flying there on 1 July, and my first day at work is on the 3rd. I’m going to share a flat with two other volunteers. In August, my brother is coming to visit me, and we’re going to walk part of the West Highland Way. It’s a long walk, about 150 kilometres, so we’re only going to do the first half! What about you? Are you doing anything special? If you’re free in August, come and see us! We’re having a party at the hostel on 15 August. Love, Chloé</p></div>
<p><b>Question :</b> que va faire Chloé en août&nbsp;?</p>`,
  audio:'Hi Sam, thanks for your message! Big news: I’m not staying in Geneva this summer. I’m going to work in a hostel in Edinburgh for two months. I’m flying there on the first of July, and my first day at work is on the third. I’m going to share a flat with two other volunteers. In August, my brother is coming to visit me, and we’re going to walk part of the West Highland Way. It’s a long walk, about a hundred and fifty kilometres, so we’re only going to do the first half! What about you? Are you doing anything special? If you’re free in August, come and see us! We’re having a party at the hostel on the fifteenth of August. Love, Chloé.',
  opts:['Rentrer à Genève pour le reste de l’été.','Faire tout le West Highland Way seule.','Commencer son travail dans une auberge de jeunesse.','Marcher une partie du West Highland Way avec son frère.'], ans:3,
  why:'<i lang="en">In August, my brother is coming to visit me, and we’re going to walk part of the West Highland Way</i> : seulement la première moitié (<i lang="en">the first half</i>). Elle commence son travail le 3 juillet.'},

 {kind:'Dictée', h:'Dictée : des vacances',
  p:'Écoute et écris exactement la phrase. Réécoute autant que tu veux, et utilise « Plus lentement ».',
  dictee:'We’re going to rent a small flat near the beach in July.',
  why:'<i lang="en">We’re</i> (= <i lang="en">we are</i>) + <i lang="en">going to</i> + base <i lang="en">rent</i>. <i lang="en">July</i> prend une majuscule, comme tous les mois en anglais.'},

 {kind:'Oral', h:'Laisse un message vocal',
  p:`<p>Tu laisses un message vocal (30 à 45 secondes) à un ami pour l’inviter ce week-end : demande s’il est libre, dis ce que tu vas faire, quand et où, propose une heure de rendez-vous et demande-lui de te rappeler.</p>`,
  oral:{modele:'Hi Max, it’s Julie. Are you doing anything on Saturday? I’m going to the lake with some friends. We’re taking the train at ten, and we’re going to have a picnic and swim. Would you like to come? Let’s meet at the station at quarter to ten. Call me back tonight. Bye!',
   criteres:['J’ai demandé si mon ami est libre (Are you free…? Are you doing anything…?)','J’ai utilisé going to pour un projet','J’ai utilisé le présent continu pour quelque chose d’organisé','J’ai invité avec Would you like to… ou How about…','J’ai donné un jour, une heure et un lieu']}},

 {kind:'Écriture', h:'Réponds à deux invitations',
  p:'Samedi soir, tu es invité à l’anniversaire d’Emma, et tu as accepté. Paul t’écrit pour t’inviter à un concert le même soir. Réponds-lui par écrit (au moins 50 mots) : remercie-le, refuse poliment en donnant ta raison, dis ce que tu vas faire ce week-end, et propose-lui un autre moment.',
  ecrire:{min:50, modele:'Hi Paul, thanks for the invitation! I’d love to come to the concert, but I’m afraid I can’t. It’s Emma’s birthday on Saturday and I’m going to her party. I’m helping her with the cooking in the afternoon. What a shame! Are you free on Sunday? How about a coffee in town at three? I’m going to be at the market in the morning, so I can meet you after that. Let me know! Anna',
   criteres:[{t:'J’ai remercié pour l’invitation', re:'\\bthank'},{t:'J’ai refusé poliment', re:'afraid|love to|sorry|unfortunately'},{t:'J’ai utilisé going to + verbe', re:'going to (be|have|do|see|go|make|stay|take|meet|buy|visit|watch|play|work|help|cook|call|spend|get|come|try|leave|start|eat|clean|study|travel)\\b'},{t:'J’ai utilisé le présent continu pour un projet organisé', re:"(\\bam|\\bis|\\bare|[’']m|[’']re|[’']s) (?!going)\\w+ing\\b"},{t:'J’ai proposé un autre moment', re:"how about|what about|why don[’']t we|are you free|let[’']s|another time"}]}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>be going to</b> + base = intention déjà décidée (<i lang="en">I’m going to paint the kitchen</i>) ou prédiction fondée sur ce qu’on voit (<i lang="en">It’s going to rain</i>). Négation : <i lang="en">I’m not / she isn’t going to</i> ; question : <i lang="en">Are you going to…?</i> ; réponse : <i lang="en">Yes, I am</i>.</li><li><b>Présent continu</b> + moment futur = rendez-vous organisé : <i lang="en">I’m meeting Sarah at six. What are you doing tonight?</i> Jamais <s>I see Paul tomorrow</s>.</li><li>Horaires officiels : présent simple (<i lang="en">The train leaves at 8.15</i>).</li><li>Temps : <i lang="en">tonight, tomorrow morning, the day after tomorrow, next week, in two weeks</i> (dans), <i lang="en">soon, one day</i>.</li><li>Inviter : <i lang="en">Would you like to…? How about + -ing? Why don’t we…? Let’s…</i></li><li>Accepter : <i lang="en">I’d love to! That sounds great.</i> Refuser : <i lang="en">I’d love to, but I’m afraid I can’t</i> + raison + autre proposition.</li><li>À l’oral rapide, <i lang="en">going to</i> devient « gonna » : à comprendre, pas à écrire.</li></ul></div>`},

 {kind:'Mission', h:'Une sortie à organiser',
  p:'Jake appelle Priya pour lui proposer une sortie avec des amis samedi. Écoute leur conversation, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Jake','Hi Priya. A few of us are going to the climbing centre on Saturday. Would you like to come?'],['Priya','Sounds fun! What time are you going?'],['Jake','We’re meeting at the bus station at half past nine. The session starts at ten and finishes at twelve.'],['Priya','Oh, I’m having breakfast with my grandmother at nine. Can I meet you there at ten?'],['Jake','Sure. And after that, we’re going to have lunch at the pizza place next door.'],['Priya','Perfect. How much is the session?'],['Jake','Fifteen pounds, and you can rent shoes for three pounds.'],['Priya','Great. See you on Saturday!']], cache:true,
  parts:[
   {q:'a) Où et quand Priya va-t-elle retrouver le groupe&nbsp;?', opts:['À la gare routière, à 9 h 30.','Au centre d’escalade, à 10 heures.','Chez sa grand-mère, à 9 heures.','À la pizzeria, à midi.'], ans:1, hint:'Priya ne peut pas être à la gare routière à l’heure prévue. Que propose-t-elle&nbsp;?', why:'<i lang="en">Can I meet you there at ten?</i> <i lang="en">there</i> = au centre d’escalade, où la séance commence à 10 heures.'},
   {q:'b) Combien Priya va-t-elle payer en tout si elle loue des chaussures&nbsp;? Écris le nombre de livres.', lab:'Livres', txt:['18','£18','eighteen','18 pounds','eighteen pounds'], hint:'La séance plus la location des chaussures.', why:'15 + 3 = 18 livres.'},
   {q:'c) Pourquoi ne peut-elle pas venir à 9 h 30&nbsp;? Écris sa phrase en anglais : « Je prends le petit-déjeuner avec ma grand-mère à 9 heures. »', lab:'Ta phrase', long:true, txt:V(['I am having','I am going to have'],' breakfast with my ',['grandmother','grandma','granny','gran'],' at ',['nine','9','nine o’clock','9:00','9.00','9 am','9am'],'.'), hint:'C’est un rendez-vous déjà fixé : présent continu de <i lang="en">have breakfast</i>.', why:'<i lang="en">I’m having breakfast with my grandmother at nine.</i> Un engagement organisé : présent continu.'},
   {q:'d) Écris en anglais ce que le groupe va faire ensuite : « Après ça, nous allons déjeuner à la pizzeria. »', lab:'Ta phrase', long:true, txt:V(['After that we are going to ','We are going to '],['have lunch','eat'],' at the ',['pizza place','pizzeria','pizza restaurant'],['',' next door'],['',' after that'],'.'), hint:'<i lang="en">we are going to</i> + <i lang="en">have lunch</i> ; la pizzeria = <i lang="en">the pizza place</i>.', why:'<i lang="en">After that, we’re going to have lunch at the pizza place.</i>'}],
  sol:'<p lang="en">Jake: A few of us are going to the climbing centre on Saturday. Would you like to come? – Priya: Sounds fun! – Jake: We’re meeting at the bus station at half past nine. The session starts at ten. – Priya: I’m having breakfast with my grandmother at nine. Can I meet you there at ten? – Jake: Sure. After that, we’re going to have lunch at the pizza place next door. The session is fifteen pounds, and shoes are three pounds.</p><p>Priya retrouve le groupe directement au centre d’escalade à 10 heures et paie 15 + 3 = 18 £. Le présent continu décrit l’organisation (<i lang="en">We’re meeting…, I’m having breakfast…</i>), <i lang="en">going to</i> le projet (<i lang="en">we’re going to have lunch</i>).</p>'},

 {kind:'Mission', h:'Un week-end trop chargé',
  p:`<p>Voici ton agenda du week-end et trois messages reçus ce matin. Lis tout, puis réponds.</p>
<div class="blk" data-t="Ton agenda"><p><b>Samedi :</b> 10 h, leçon de conduite ; 19 h 30, dîner chez Emma.<br><b>Dimanche :</b> rien de prévu.</p></div>
<div class="blk" data-t="Messages"><p lang="en"><b>Tom:</b> Hey! I’m going to the market on Saturday morning. Do you want to come? Let’s meet at 10.</p><p lang="en"><b>Lisa:</b> Are you free on Saturday evening? We’re going to see a film at 8. Would you like to come?</p><p lang="en"><b>Max:</b> My band is playing at the Blue Café on Sunday at 6! Would you like to come?</p></div>`,
  parts:[
   {q:'a) Quelle invitation peux-tu accepter&nbsp;?', opts:['Celle de Tom.','Celle de Lisa.','Celle de Max.','Aucune.'], ans:2, hint:'Compare chaque heure avec ton agenda.', why:'Samedi à 10 h, tu as ta leçon de conduite (Tom) ; samedi soir, tu dînes chez Emma (Lisa). Dimanche est libre : tu peux aller au concert de Max.'},
   {q:'b) Réponds à Tom en donnant ta raison : « J’ai une leçon de conduite à 10 heures. »', lab:'Ta phrase', txt:V(['I am having','I am taking','I have','I have got','I’ve got'],' a driving lesson at ',TEN,'.'), hint:'Un rendez-vous fixé : présent continu (<i lang="en">I’m having…</i>) ou simplement <i lang="en">I have…</i>', why:'<i lang="en">I’m having a driving lesson at ten.</i> (ou <i lang="en">I have a driving lesson at ten.</i>) Une leçon de conduite = <i lang="en">a driving lesson</i>.'},
   {q:'c) Accepte l’invitation de Max avec enthousiasme : « J’adorerais (venir)&nbsp;! »', lab:'Ta réponse', txt:V(['I’d love to','I would love to'],['',' come'],'!'), hint:'L’expression contient <i lang="en">love</i> et se termine par <i lang="en">to</i> (ou <i lang="en">to come</i>).', why:'<i lang="en">I’d love to!</i> Le <i lang="en">to</i> final est obligatoire.'},
   {q:'d) Lisa te demande : <i lang="en">What are you doing on Saturday evening?</i> Réponds : « Je dîne chez Emma. »', lab:'Ta réponse', txt:[...V('I am ',['having dinner','eating'],' at ',['Emma’s','Emma’s place','Emma’s house','Emma’s flat'],'.'),...V('I am going to Emma’s ',['for dinner','place for dinner','house for dinner','flat for dinner'],'.')], hint:'Présent continu de <i lang="en">have dinner</i> ; « chez Emma » = <i lang="en">at Emma’s</i>.', why:'<i lang="en">I’m having dinner at Emma’s.</i> « Chez quelqu’un » se dit avec le <i lang="en">’s</i> possessif : <i lang="en">at Emma’s (place)</i>.'},
   {q:'e) Propose une autre sortie à Lisa avec <i lang="en">Why don’t we</i> : « Et si on allait voir le film dimanche après-midi&nbsp;? »', lab:'Ta question', long:true, txt:V('Why don’t we ',['see the film','go to see the film','go and see the film','watch the film','see the movie','go to the cinema'],' ',['on Sunday afternoon','Sunday afternoon'],'?'), hint:'<i lang="en">Why don’t we</i> + base verbale (sans <i lang="en">to</i>).', why:'<i lang="en">Why don’t we see the film on Sunday afternoon?</i> Max joue à 18 heures : l’après-midi est libre.'}],
  sol:'<p>Samedi est complet (leçon de conduite à 10 h, dîner chez Emma à 19 h 30) : tu refuses Tom et Lisa, et tu acceptes Max dimanche à 18 h. À Tom : <i lang="en">Sorry, I’m having a driving lesson at ten.</i> À Max : <i lang="en">I’d love to!</i> À Lisa : <i lang="en">I’m having dinner at Emma’s. Why don’t we see the film on Sunday afternoon?</i> Le refus s’adoucit toujours par une raison et une autre proposition.</p>'},
]},
);
})();
