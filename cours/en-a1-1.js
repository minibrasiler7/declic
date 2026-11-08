/* Déclic — Anglais A1 (unités 1 à 3). Format : docs/ANGLAIS.md */
(()=>{
COURS.push(
{subj:'en', sem:'a1', id:'en-a1-hello', o:1, h:'Hello!', p:'Saluer, se présenter, épeler son nom et donner un numéro : les toutes premières phrases, avec le verbe <i lang="en">to be</i>.', steps:[
 {kind:'Écoute', h:'Une première rencontre',
  p:`<p>À la fin de cette unité, tu sauras saluer quelqu’un, te présenter, épeler ton nom et donner un numéro de téléphone en anglais.</p>
<p>Commence par écouter. Anna rencontre Tom, un nouveau venu. <b>Écoute sans lire</b>, deux fois si tu veux, puis réponds. Le texte apparaîtra après ta réponse : c’est ainsi qu’on entraîne l’oreille.</p>
<p><b>Question :</b> quel est le nom de famille de Tom&nbsp;?</p>`,
  audio:[['Anna','Hi! I’m Anna. What’s your name?'],['Tom','Hello, Anna. My name is Tom. Nice to meet you.'],['Anna','Nice to meet you too. Are you new here?'],['Tom','Yes, I am. It’s my first day.'],['Anna','How do you spell your surname?'],['Tom','Baker. B, A, K, E, R.'],['Anna','Great. See you later, Tom!'],['Tom','Bye!']], cache:true,
  opts:['Barker','Baker','Becker','Parker'], ans:1,
  why:'Tom épelle son nom : B, A, K, E, R. Son nom de famille est <i lang="en">Baker</i> (« boulanger », un nom très courant en Angleterre).'},

 {kind:'Vocabulaire', h:'Saluer et se présenter',
  p:`<p>Voici les expressions du dialogue et quelques autres. Touche une ligne pour l’entendre, puis répète-la à voix haute. Ces mots entrent dans ta <b>révision du vocabulaire</b> : elle te les redemandera demain, puis dans quelques jours, juste avant que tu les oublies.</p>`,
  mots:[['Hello / Hi','Bonjour, salut','Hi, I’m Anna.'],['Good morning','Bonjour (le matin)','Good morning, Mr Baker.'],['Good afternoon','Bonjour (l’après-midi)'],['Good evening','Bonsoir (en arrivant)'],['Goodbye / Bye','Au revoir','Bye, see you tomorrow!'],['See you later','À plus tard'],['What’s your name?','Comment t’appelles-tu ?'],['My name is…','Je m’appelle…','My name is Tom.'],['Nice to meet you','Enchanté(e)','Nice to meet you too.'],['How are you?','Comment vas-tu ?'],['I’m fine, thanks','Je vais bien, merci','I’m fine, thanks. And you?'],['first name','prénom'],['surname','nom de famille','My surname is Baker.'],['phone number','numéro de téléphone'],['How do you spell it?','Comment ça s’écrit ?']],
  note:'<b>Attention :</b> <i lang="en">Good night</i> ne sert qu’à dire bonne nuit, en partant ou en allant dormir. Pour saluer quelqu’un le soir, on dit <i lang="en">Good evening</i>.'},

 {kind:'Pratique', h:'À toi : enchanté',
  p:'Quelqu’un te dit <i lang="en">Hi, I’m Sara.</i> Comment réponds-tu « Enchanté » en anglais&nbsp;?', lab:'En anglais', txt:['Nice to meet you','Nice to meet you, Sara','Hi Sara, nice to meet you','Hello Sara, nice to meet you','Hi, nice to meet you','Hello, nice to meet you'],
  why:'<i lang="en">Nice to meet you</i> se dit à la première rencontre. L’autre répond souvent <i lang="en">Nice to meet you too</i>.'},

 {kind:'Grammaire', h:'Le verbe to be : I am, you are',
  p:`<p>Dans le dialogue, Anna dit <i lang="en">I’m Anna</i> et demande <i lang="en">Are you new here?</i> Ces deux phrases utilisent le verbe le plus important de l’anglais : <b>to be</b>, « être ».</p>
<div class="def"><p><b>I am</b> = je suis. <b>You are</b> = tu es, et aussi vous êtes (l’anglais n’a qu’un seul <i lang="en">you</i>, pour une ou plusieurs personnes, poli ou familier).</p><p>À l’oral et dans les messages, on <b>contracte</b> : <b>I’m</b> = I am, <b>you’re</b> = you are. L’apostrophe remplace la lettre disparue.</p></div>
<div class="idea"><p><i lang="en">To be</i> sert pour dire qui on est, comment on va, d’où on vient, son âge ou son métier : <i lang="en">I’m Tom. I’m fine. I’m new. You’re late!</i> Là où le français dit « avoir » pour l’âge ou la faim, l’anglais dit souvent « être » : <i lang="en">I’m 25</i> (j’ai 25 ans), <i lang="en">I’m hungry</i> (j’ai faim).</p></div>
<div class="ex"><p><i lang="en">I am Anna.</i> → <i lang="en">I’m Anna.</i><br><i lang="en">You are new here.</i> → <i lang="en">You’re new here.</i><br><i lang="en">I’m tired.</i> = Je suis fatigué.</p></div>
<div class="warn"><p>Le pronom <b>I</b> (je) s’écrit toujours avec une majuscule, même au milieu d’une phrase : <i lang="en">Yes, I am.</i> Et on ne supprime jamais le sujet : pas de « Am Anna », mais <i lang="en">I’m Anna</i>.</p></div>`,
  audio:'I am Anna. I’m Anna. You are new here. You’re new here.'},

 {kind:'Méthode', h:'Dire non et poser une question avec to be',
  p:`<p><b>Quand :</b> pour dire que quelque chose n’est pas vrai, ou pour poser une question fermée (réponse oui ou non). <b>Pourquoi ça marche :</b> avec <i lang="en">to be</i>, pas besoin de mot en plus : on ajoute <b>not</b> pour la négation, et on <b>inverse</b> le sujet et le verbe pour la question. <b>Comment :</b></p>
<ul><li>Négation : <i lang="en">I am <b>not</b></i> (<b>I’m not</b>), <i lang="en">you are <b>not</b></i> (<b>you aren’t</b> ou <b>you’re not</b>).</li><li>Question : <b>Am I…? Are you…?</b> Le verbe passe devant.</li><li>Réponse courte : <i lang="en">Yes, I am.</i> / <i lang="en">No, I’m not.</i> On reprend le verbe, sans le reste. Pas de contraction dans <i lang="en">Yes, I am</i>.</li></ul>`,
  demo:{enonce:'Transforme la phrase <i lang="en">You are a student.</i> en négation, puis en question, et donne les deux réponses courtes.',
   etapes:[{f:'Négation : <i lang="en">You are <b>not</b> a student.</i> → <i lang="en">You aren’t a student.</i>',w:'<i lang="en">not</i> se place juste après le verbe <i lang="en">are</i>.'},
    {f:'Question : <i lang="en"><b>Are you</b> a student?</i>',w:'On inverse <i lang="en">you</i> et <i lang="en">are</i>, et on ajoute un point d’interrogation.'},
    {f:'Réponses courtes : <i lang="en">Yes, I am.</i> / <i lang="en">No, I’m not.</i>',w:'On répond avec <i lang="en">I</i> (je), puisque la question porte sur moi.'}],
   conclusion:'<i lang="en">You aren’t a student. Are you a student? Yes, I am. / No, I’m not.</i>'}},

 {kind:'Pratique', h:'À toi : une négation',
  p:'Écris en anglais : « Je ne suis pas fatigué. » (<i lang="en">tired</i> = fatigué)', lab:'Ta phrase', txt:['I am not tired.'],
  why:'<i lang="en">I am not tired</i>, ou en contractant <i lang="en">I’m not tired</i>. Attention : <i lang="en">I amn’t</i> n’existe pas.'},

 {kind:'Pratique', h:'À toi : une question',
  p:'Transforme en question : <i lang="en">You are new here.</i>', lab:'Ta question', txt:['Are you new here?'],
  why:'On inverse le sujet et le verbe : <i lang="en">Are you new here?</i> Réponses : <i lang="en">Yes, I am</i> ou <i lang="en">No, I’m not</i>.'},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:'Touche les mots dans le bon ordre pour demander le numéro de téléphone de quelqu’un.',
  ordre:['What’s','your','phone','number?'],
  why:'<i lang="en">What’s your phone number?</i> Le mot interrogatif <i lang="en">What</i> vient en premier, puis le verbe (<i lang="en">’s</i> = <i lang="en">is</i>).'},

 {kind:'Grammaire', h:'My et your : mon, ton',
  p:`<p>Tom dit <i lang="en">My name is Tom</i> et Anna demande <i lang="en">What’s your name?</i> Comment dit-on « mon » et « ton » en anglais&nbsp;?</p>
<div class="def"><p><b>my</b> = mon, ma, mes. <b>your</b> = ton, ta, tes, et aussi votre, vos.</p></div>
<div class="idea"><p>En anglais, le possessif ne change jamais : il ne dépend ni du genre ni du nombre de l’objet. <i lang="en">my brother</i> (mon frère), <i lang="en">my sister</i> (ma sœur), <i lang="en">my friends</i> (mes amis). C’est beaucoup plus simple qu’en français : un seul mot à retenir par personne.</p></div>
<div class="ex"><p><i lang="en">My first name is Léa. My surname is Martin.</i><br><i lang="en">What’s your phone number?</i> = Quel est ton (votre) numéro de téléphone&nbsp;?</p></div>
<div class="warn"><p>Ne confonds pas <b>your</b> (ton) et <b>you’re</b> (tu es) : ils se prononcent presque pareil. <i lang="en">You’re late</i> = tu es en retard ; <i lang="en">your bag</i> = ton sac.</p></div>`,
  audio:'My first name is Léa. My surname is Martin. What’s your phone number?'},

 {kind:'Pratique', h:'À toi : ton prénom',
  p:'Écris en anglais : « Mon prénom est Léa et mon nom de famille est Martin. »', lab:'Ta phrase', txt:['My first name is Léa and my surname is Martin.','My first name’s Léa and my surname’s Martin.','My first name is Léa and my last name is Martin.','My first name is Léa and my family name is Martin.'],
  why:'<i lang="en">My first name is Léa and my surname is Martin.</i> On peut aussi dire <i lang="en">last name</i> ou <i lang="en">family name</i>.'},

 {kind:'Prononciation', h:'L’alphabet anglais',
  p:`<p>Au téléphone, à l’hôtel, au travail, on te demandera sans cesse <i lang="en">How do you spell it?</i> Il faut donc savoir épeler, et comprendre quand on t’épelle un nom.</p>
<div class="def"><p>Les lettres se rangent en familles qui riment :</p><ul><li><b>A, H, J, K</b> riment avec <i lang="en">day</i>.</li><li><b>B, C, D, E, G, P, T, V</b> riment avec <i lang="en">see</i>.</li><li><b>F, L, M, N, S, X, Z</b> commencent par le son « è ». Z se dit « zed » en anglais britannique et « zee » en américain.</li><li><b>I, Y</b> riment avec <i lang="en">my</i>. <b>O</b> comme dans <i lang="en">no</i>. <b>Q, U, W</b> riment avec <i lang="en">you</i>. <b>R</b> comme dans <i lang="en">car</i>.</li></ul></div>
<div class="warn"><p>Les pièges des francophones : le <b>E</b> anglais se dit « i », et le <b>I</b> se dit « aï » ; le <b>G</b> se dit « dji » et le <b>J</b> « djèï » ; le <b>A</b> se dit « èï ». Pour une lettre doublée, on dit <i lang="en">double</i> : <i lang="en">Anna = A, double N, A</i>.</p></div>`,
  audio:'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.'},

 {kind:'Écoute', h:'On t’épelle un nom',
  p:'Écoute : quelqu’un épelle son nom de famille. Écris-le.', audio:'My surname is Wilson. W, I, L, S, O, N.', cache:true, lab:'Le nom', txt:['Wilson'],
  why:'W (<i lang="en">double you</i>), I (« aï »), L, S, O, N : <i lang="en">Wilson</i>.'},

 {kind:'Vocabulaire', h:'Les nombres de 0 à 20',
  p:`<p>Pour un numéro de téléphone, une chambre d’hôtel ou un âge, il faut les nombres. Touche chaque ligne pour l’entendre.</p>`,
  mots:[['zero / oh','zéro','My number is oh seven nine…'],['one, two, three','un, deux, trois'],['four, five, six','quatre, cinq, six'],['seven, eight, nine','sept, huit, neuf'],['ten','dix'],['eleven','onze'],['twelve','douze'],['thirteen','treize'],['fifteen','quinze'],['twenty','vingt']],
  note:'Dans un numéro de téléphone, on lit les chiffres un par un, et 0 se dit souvent <i lang="en">oh</i>. Deux chiffres identiques : <i lang="en">double</i>. 077 se dit <i lang="en">oh double seven</i>. Les nombres de 13 à 19 finissent en <i lang="en">-teen</i>, accentué : thir<b>teen</b>, four<b>teen</b>.'},

 {kind:'Écoute', h:'Quel numéro ?',
  p:'Écoute le numéro de chambre et écris-le en chiffres.', audio:'Your room is number fourteen.', cache:true, lab:'Chambre n°', txt:['14','fourteen'],
  why:'<i lang="en">Fourteen</i> = 14. Les nombres en <i lang="en">-teen</i> (13 à 19) ont l’accent sur la fin.'},

 {kind:'Lecture', h:'Lire un profil',
  p:`<p>Lis ce message posté sur le forum d’un cours de langue, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Forum : Say hello!"><p lang="en">Hi everyone! My name is Sofia. My surname is Costa, C, O, S, T, A. I’m new here. I’m twenty and I’m a student. My English isn’t very good, but I’m not shy! What about you? What’s your name? See you in class on Monday. Bye!</p></div>`,
  audio:'Hi everyone! My name is Sofia. My surname is Costa, C, O, S, T, A. I’m new here. I’m twenty and I’m a student. My English isn’t very good, but I’m not shy! What about you? What’s your name? See you in class on Monday. Bye!',
  opts:['Sofia a 20 ans et elle est étudiante.','Sofia est professeure d’anglais.','Sofia est timide et parle bien anglais.','Sofia s’appelle Costa de prénom.'], ans:0,
  why:'<i lang="en">I’m twenty and I’m a student</i> : elle a 20 ans et elle est étudiante. Elle dit aussi que son anglais n’est pas très bon (<i lang="en">isn’t very good</i>) mais qu’elle n’est pas timide (<i lang="en">I’m not shy</i>).'},

 {kind:'Dictée', h:'Dictée : se présenter',
  p:'Écoute et écris exactement la phrase. Tu peux réécouter autant que tu veux, et utiliser « Plus lentement ».',
  dictee:'Hello, my name is Sam. Nice to meet you.',
  why:'Vérifie les majuscules de <i lang="en">Sam</i> et le petit mot <i lang="en">to</i> dans <i lang="en">Nice to meet you</i>.'},

 {kind:'Oral', h:'Répète après le modèle',
  p:`<p>Écoute la phrase, puis dis-la à voix haute en touchant « Dire la phrase ». Imite le rythme : en anglais, certains mots sont plus forts que d’autres. Ici : <i lang="en">Hi, I’m <b>Tom</b>. <b>Nice</b> to <b>meet</b> you.</i></p>`,
  dire:'Hi, I’m Tom. Nice to meet you.',
  note:'La reconnaissance vocale a besoin d’autoriser le micro la première fois. Si un mot reste en rouge, réécoute-le lentement, puis recommence.'},

 {kind:'Oral', h:'De mémoire',
  p:'Cette fois, la phrase n’est pas écrite. Écoute-la, puis redis-la de mémoire. C’est la question qu’on te posera le plus souvent quand tu donnes ton nom.',
  dire:{t:'How do you spell your surname?', cache:true}},

 {kind:'Oral', h:'Présente-toi',
  p:`<p>À toi de parler, pendant 20 à 30 secondes. Salue, dis ton prénom et ton nom de famille, épelle ton nom de famille, dis comment tu vas et termine par une formule pour partir. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'Hello! My name is Léa Martin. My first name is Léa, and my surname is Martin, M, A, R, T, I, N. I’m fine, thanks. I’m new here. Nice to meet you! See you later.',
   criteres:['J’ai salué (Hello, Hi, Good morning…)','J’ai dit mon prénom et mon nom avec My name is… ou I’m…','J’ai épelé mon nom de famille lettre par lettre','J’ai dit comment je vais','J’ai terminé par Nice to meet you, See you later ou Bye']}},

 {kind:'Écriture', h:'Écris ton message de présentation',
  p:'Tu rejoins un groupe de discussion en anglais. Écris un court message pour te présenter (au moins 25 mots) : salue, donne ton prénom et ton nom, épelle ton nom, dis si tu es nouveau ou nouvelle, donne ton âge, et termine par une question au lecteur.',
  ecrire:{min:25, modele:'Hi everyone! My name is Marc Dubois. My surname is Dubois, D, U, B, O, I, S. I’m new here. I’m thirty and I’m from Lausanne. My English isn’t very good, but I’m happy to be here! And you? What’s your name?',
   criteres:[{t:'J’ai salué', re:'\\b(hi|hello|good (morning|afternoon|evening))\\b'},{t:'J’ai donné mon nom avec My name is ou I’m', re:'\\b(my name|my first name|i am|i\'m|i’m)\\b'},{t:'J’ai utilisé le verbe to be (am, are, ’m, ’re)', re:'\\b(am|are)\\b|[\'’](m|re)\\b'},'J’ai épelé mon nom de famille','J’ai mis une majuscule à I et aux noms propres',{t:'J’ai posé une question au lecteur', re:'\\?'}]}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li>Saluer : <i lang="en">Hello / Hi, Good morning, Good afternoon, Good evening</i>. Partir : <i lang="en">Goodbye, Bye, See you later</i>. <i lang="en">Good night</i> seulement pour la nuit.</li><li>Se présenter : <i lang="en">My name is… / I’m… Nice to meet you. – Nice to meet you too.</i></li><li><b>to be</b> : <i lang="en">I am (I’m), you are (you’re)</i>. Négation : <i lang="en">I’m not, you aren’t</i>. Question : <i lang="en">Are you…? – Yes, I am. / No, I’m not.</i></li><li><b>my</b> = mon, ma, mes ; <b>your</b> = ton, ta, tes, votre, vos. Ne pas confondre <i lang="en">your</i> et <i lang="en">you’re</i>.</li><li>Épeler : <i lang="en">How do you spell it?</i> E se dit « i », I se dit « aï », G « dji », J « djèï », lettre doublée = <i lang="en">double</i>.</li><li>Nombres 0 à 20, numéro de téléphone chiffre par chiffre, 0 = <i lang="en">oh</i>.</li></ul></div>`},

 {kind:'Mission', h:'À la réception de l’hôtel',
  p:'Tu arrives dans un hôtel à Londres. Écoute le dialogue entre le réceptionniste et un client, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Receptionist','Good evening! Welcome to the Park Hotel.'],['Guest','Good evening. I have a reservation. My name is Lopez.'],['Receptionist','How do you spell that, please?'],['Guest','L, O, P, E, Z.'],['Receptionist','Thank you, Mr Lopez. You’re in room eighteen.'],['Guest','Eighteen. Thank you very much.'],['Receptionist','You’re welcome. Breakfast is at seven.']], cache:true,
  parts:[
   {q:'a) Comment s’écrit le nom du client&nbsp;?', opts:['Lopes','Lopaz','Lopez','Lopèz'], ans:2, hint:'Écoute l’avant-dernière lettre : le son « i » correspond à la lettre E.', why:'L, O, P, E, Z : <i lang="en">Lopez</i>. Le E anglais se prononce « i ».'},
   {q:'b) Quel est son numéro de chambre&nbsp;? Écris-le en chiffres.', lab:'Chambre', txt:['18','eighteen'], hint:'C’est un nombre en <i lang="en">-teen</i>, donc entre 13 et 19.', why:'<i lang="en">Room eighteen</i> : chambre 18.'},
   {q:'c) Le client remercie. Que répond le réceptionniste pour dire « Je vous en prie »&nbsp;? Écris l’expression.', lab:'En anglais', txt:['You’re welcome'], hint:'Elle contient <i lang="en">you’re</i> (tu es, vous êtes).', why:'<i lang="en">You’re welcome</i> répond à <i lang="en">Thank you</i>.'},
   {q:'d) Tu es à la place du client. Écris en anglais : « Je ne suis pas M. Lopez. »', lab:'Ta phrase', txt:['I am not Mr Lopez.','I am not Mr. Lopez.'], hint:'Négation de <i lang="en">I am</i> : on ajoute <i lang="en">not</i>.', why:'<i lang="en">I’m not Mr Lopez.</i> (en américain, on met un point : <i lang="en">Mr.</i>)'}],
  sol:'<p lang="en">Receptionist: Good evening! Welcome to the Park Hotel. Guest: Good evening. I have a reservation. My name is Lopez. – How do you spell that, please? – L, O, P, E, Z. – Thank you, Mr Lopez. You’re in room eighteen. – Eighteen. Thank you very much. – You’re welcome. Breakfast is at seven.</p><p>Le client s’appelle Lopez, il est dans la chambre 18 et le petit-déjeuner est à 7 heures. <i lang="en">You’re welcome</i> = je vous en prie. <i lang="en">I’m not Mr Lopez</i> = je ne suis pas M. Lopez.</p>'},

 {kind:'Mission', h:'Premier jour au bureau',
  p:`<p>C’est ton premier jour dans une entreprise internationale. Tu trouves ce message sur ton bureau. Lis-le, puis réponds.</p>
<div class="blk" data-t="Message"><p lang="en">Hi! Welcome to the team! I’m Priya, your new colleague. My surname is Shah, S, H, A, H. My phone number is oh seven seven, one four five, nine eight two. Are you free for a coffee at ten? See you later! Priya</p></div>`,
  parts:[
   {q:'a) Que te propose Priya&nbsp;?', opts:['Un déjeuner à midi','Un café à dix heures','Une réunion à dix-huit heures','Un appel téléphonique à deux heures'], ans:1, hint:'Cherche le mot <i lang="en">coffee</i> et l’heure.', why:'<i lang="en">Are you free for a coffee at ten?</i> : es-tu libre pour un café à dix heures&nbsp;?'},
   {q:'b) Écris son numéro de téléphone en chiffres, sans espaces.', lab:'Numéro', txt:['077145982'], hint:'<i lang="en">oh</i> = 0, <i lang="en">seven seven</i> = 77.', why:'<i lang="en">oh seven seven, one four five, nine eight two</i> = 077 145 982.'},
   {q:'c) Réponds à sa question en anglais : « Oui, je suis libre. »', lab:'Ta réponse', txt:['Yes, I am free.','Yes, I am.','Yes, I am free at ten.'], hint:'<i lang="en">free</i> = libre. Commence par <i lang="en">Yes, I…</i>', why:'<i lang="en">Yes, I’m free.</i> ou la réponse courte <i lang="en">Yes, I am.</i>'},
   {q:'d) Pose-lui une question pour vérifier l’orthographe de son nom : « Comment ça s’écrit ? »', lab:'Ta question', txt:['How do you spell it?','How do you spell that?','How do you spell your name?','How do you spell your surname?'], hint:'C’est une expression du vocabulaire de l’unité, avec <i lang="en">spell</i>.', why:'<i lang="en">How do you spell it?</i> (ou <i lang="en">…your surname?</i>)'}],
  sol:'<p>Priya Shah, ta nouvelle collègue, te souhaite la bienvenue et te propose un café à 10 heures. Son numéro : 077 145 982. Tu peux répondre <i lang="en">Yes, I’m free</i> (ou <i lang="en">Yes, I am</i>) et lui demander <i lang="en">How do you spell it?</i> pour vérifier son nom.</p>'},
]},
{subj:'en', sem:'a1', id:'en-a1-family', o:2, h:'Family and friends', p:'Présenter sa famille, dire l’âge de chacun et parler des autres : le verbe <i lang="en">to be</i> à toutes les personnes, les possessifs et le <i lang="en">’s</i>, les nombres jusqu’à 100.', steps:[
 {kind:'Écoute', h:'Une photo de famille',
  p:`<p>À la fin de cette unité, tu sauras présenter ta famille, dire l’âge de chacun, poser des questions sur les proches de quelqu’un et compter jusqu’à 100.</p>
<p>Emma montre une photo à Jack, un collègue. <b>Écoute sans lire</b>, deux fois si tu veux, puis réponds. Le texte apparaîtra après ta réponse.</p>
<p><b>Question :</b> Emma a-t-elle des frères et sœurs&nbsp;?</p>`,
  audio:[['Jack','Nice photo, Emma! Is this your family?'],['Emma','Yes, it is. This is my mum, Susan. She’s fifty-two. And this is my dad, Peter. He’s fifty-five.'],['Jack','And is this your brother?'],['Emma','No, he isn’t. He’s my cousin, Oliver. He’s my aunt’s son.'],['Jack','So, are you an only child?'],['Emma','Yes, I am. And you?'],['Jack','No, I’m not. I’ve got two sisters.'],['Emma','And this is Max, our dog. He’s eight.']], cache:true,
  opts:['Oui, un frère : Oliver.','Non, elle est enfant unique.','Oui, deux sœurs.','Oui, un frère et une sœur.'], ans:1,
  why:'Jack demande <i lang="en">Are you an only child?</i> et Emma répond <i lang="en">Yes, I am</i> : elle est enfant unique. Oliver est son cousin, le fils de sa tante (<i lang="en">my aunt’s son</i>). Ce sont les sœurs de Jack qui sont deux.'},

 {kind:'Vocabulaire', h:'La famille',
  p:`<p>Les mots de la famille, avec un exemple chacun. Touche une ligne pour l’entendre, puis répète-la à voix haute. Ils entrent dans ta <b>révision du vocabulaire</b>.</p>`,
  mots:[['mother / mum','la mère, maman','My mum is fifty-two.'],['father / dad','le père, papa','My dad is a teacher.'],['parents','les parents (le père et la mère)','My parents are in Spain.'],['brother','le frère','My brother is nineteen.'],['sister','la sœur','Her sister is a nurse.'],['son','le fils','Their son is six.'],['daughter','la fille (de quelqu’un)','Our daughter is at school.'],['husband','le mari','Her husband is very nice.'],['wife','la femme, l’épouse','His wife is a doctor.'],['a child / children','un enfant, des enfants','They’ve got three children.'],['grandmother / grandma','la grand-mère, mamie','My grandma is eighty.'],['grandfather / grandpa','le grand-père, papi','My grandpa is a funny man.'],['uncle','l’oncle','My uncle is my mum’s brother.'],['aunt','la tante','My aunt is my dad’s sister.'],['cousin','le cousin, la cousine','Oliver is my cousin.'],['married','marié(e)','Is your sister married?'],['an only child','un enfant unique','I’m an only child.'],['This is my…','Voici mon, ma… (pour présenter quelqu’un)','This is my wife, Sarah.']],
  note:'<i lang="en">Parents</i> veut dire seulement le père et la mère. Pour toute la famille (oncles, cousins…), on dit <i lang="en">my family</i> ou <i lang="en">my relatives</i>. Les grands-parents : <i lang="en">my grandparents</i>. Pour dire qu’on a des frères et sœurs, retiens la formule <i lang="en">I’ve got two sisters</i> (britannique) ou <i lang="en">I have two sisters</i>. En américain, maman se dit <i lang="en">mom</i>.'},

 {kind:'Pratique', h:'À toi : qui est-ce ?',
  p:'Le fils de ta tante est ton cousin, <i lang="en">your cousin</i>. <b>Question :</b> et le frère de ta mère, qui est-il pour toi&nbsp;? Écris le mot anglais.', lab:'En anglais', txt:['uncle','my uncle','an uncle','He is my uncle.','He’s my uncle.'],
  why:'Le frère de ta mère (ou de ton père) est ton oncle : <i lang="en">my uncle</i>. Sa femme est ta tante : <i lang="en">my aunt</i>.'},

 {kind:'Grammaire', h:'Le verbe to be au complet',
  p:`<p>Dans le dialogue, Emma dit <i lang="en">She’s fifty-two</i> et <i lang="en">He’s my cousin</i>. Tu connais déjà <i lang="en">I am</i> et <i lang="en">you are</i> ; pour parler de ta famille, il faut le verbe <b>to be</b> à toutes les personnes.</p>
<div class="def"><p><b>I am</b> (I’m) · <b>you are</b> (you’re) · <b>he is</b> (he’s) · <b>she is</b> (she’s) · <b>it is</b> (it’s)<br><b>we are</b> (we’re) · <b>you are</b> (you’re) · <b>they are</b> (they’re)</p><p>Trois formes seulement : <b>am</b> avec <i lang="en">I</i> ; <b>is</b> avec une seule personne ou une seule chose (<i lang="en">he, she, it</i>, ou un nom au singulier) ; <b>are</b> avec <i lang="en">you</i>, <i lang="en">we</i>, <i lang="en">they</i> et tous les pluriels.</p></div>
<div class="idea"><p><b>he</b> = il, pour un homme ou un garçon ; <b>she</b> = elle, pour une femme ou une fille ; <b>it</b> = il ou elle, pour une chose ou un animal (pour son propre animal, on dit souvent <i lang="en">he</i> ou <i lang="en">she</i> : <i lang="en">Max is our dog. He’s eight.</i>). <b>they</b> = ils <b>et</b> elles, pour des personnes comme pour des choses. <b>we</b> = nous, et aussi le « on » de « on est cousins ».</p></div>
<div class="ex"><p><i lang="en">My brother is nineteen. He’s a student.</i><br><i lang="en">My parents are teachers. They’re very nice.</i><br><i lang="en">My sister and I are in London. We’re happy.</i></p></div>
<div class="warn"><p>Les pièges des francophones : un nom au pluriel prend <b>are</b> (<i lang="en">My parents <b>are</b>…</i>, pas « my parents is »). <i lang="en">My sister and I</i>, c’est <i lang="en">we</i>, donc <b>are</b>. On ne répète pas le sujet : <i lang="en">My sister is 20</i>, pas « My sister she is 20 ». Et l’âge se dit toujours avec <i lang="en">to be</i> : <i lang="en">He’s 19</i>, jamais « He has 19 years ».</p></div>`,
  audio:'He is my cousin. He’s my cousin. She is fifty-two. She’s fifty-two. We are happy. We’re happy. They are teachers. They’re teachers.'},

 {kind:'Méthode', h:'Négation, questions et réponses courtes',
  p:`<p><b>Quand :</b> pour dire que quelque chose n’est pas vrai, poser une question fermée ou y répondre brièvement, à toutes les personnes. <b>Pourquoi ça marche :</b> comme avec <i lang="en">I am</i> et <i lang="en">you are</i>, <i lang="en">to be</i> se débrouille seul : <b>not</b> après le verbe pour la négation, le verbe <b>devant</b> le sujet pour la question. <b>Comment :</b></p>
<ul><li>Négation : <i lang="en">is not</i> → <b>isn’t</b>, <i lang="en">are not</i> → <b>aren’t</b>, <i lang="en">am not</i> → <b>I’m not</b>. On peut aussi dire <i lang="en">he’s not, they’re not</i>.</li><li>Question : <b>Is</b> <i lang="en">she…?</i> <b>Are</b> <i lang="en">they…?</i> Avec un nom, le verbe passe devant tout le groupe : <i lang="en"><b>Is</b> your brother married?</i></li><li>Réponse courte : <i lang="en">Yes</i> ou <i lang="en">No</i> + <b>pronom</b> + verbe : <i lang="en">Yes, she is. / No, she isn’t.</i> On reprend avec un pronom (<i lang="en">she</i>, pas <i lang="en">your sister</i>), et on ne contracte jamais une réponse courte positive : <i lang="en">Yes, he is</i>, pas « Yes, he’s ».</li></ul>`,
  demo:{enonce:'Transforme <i lang="en">Your parents are at home.</i> en négation, puis en question, et donne les deux réponses courtes.',
   etapes:[{f:'Négation : <i lang="en">Your parents are <b>not</b> at home.</i> → <i lang="en">Your parents aren’t at home.</i>',w:'<i lang="en">not</i> se place juste après <i lang="en">are</i>, et <i lang="en">are not</i> se contracte en <i lang="en">aren’t</i>.'},
    {f:'Question : <i lang="en"><b>Are</b> your parents at home?</i>',w:'<i lang="en">are</i> passe devant tout le sujet, <i lang="en">your parents</i>.'},
    {f:'Réponses courtes : <i lang="en">Yes, they are.</i> / <i lang="en">No, they aren’t.</i>',w:'<i lang="en">your parents</i> devient le pronom <i lang="en">they</i>. Pas de contraction dans <i lang="en">Yes, they are</i>.'}],
   conclusion:'<i lang="en">Your parents aren’t at home. Are your parents at home? Yes, they are. / No, they aren’t.</i>'}},

 {kind:'Pratique', h:'À toi : is ou are ?',
  p:'Complète avec la bonne forme de <i lang="en">to be</i> (<i lang="en">am</i>, <i lang="en">is</i> ou <i lang="en">are</i>). <b>Question :</b> quel mot manque dans <i lang="en">My sister and I ___ students.</i>&nbsp;?', lab:'Le mot', txt:['are'],
  why:'<i lang="en">My sister and I</i> = <i lang="en">we</i>, un pluriel : <i lang="en">My sister and I are students.</i>'},

 {kind:'Pratique', h:'À toi : une négation',
  p:'<b>Question :</b> comment écrit-on cette phrase à la forme négative&nbsp;? <i lang="en">My brother is married.</i>', lab:'Ta phrase', txt:['My brother is not married.','My brother’s not married.'],
  why:'<i lang="en">My brother is not married</i>, ou en contractant <i lang="en">My brother isn’t married</i>.'},

 {kind:'Pratique', h:'À toi : une question',
  p:'<b>Question :</b> comment transforme-t-on cette phrase en question&nbsp;? <i lang="en">Your sister is at home.</i>', lab:'Ta question', txt:['Is your sister at home?'],
  why:'<i lang="en">is</i> passe devant le sujet entier : <i lang="en">Is your sister at home?</i>'},

 {kind:'Pratique', h:'À toi : une réponse courte',
  p:'Une amie te demande : <i lang="en">Is your mother a teacher?</i> Ta mère n’est pas professeure. <b>Question :</b> quelle est ta réponse courte&nbsp;?', lab:'Ta réponse', txt:['No, she is not.','No, she’s not.','No, she is not a teacher.','No, she’s not a teacher.'],
  why:'On reprend avec le pronom : <i lang="en">your mother</i> → <i lang="en">she</i>. <i lang="en">No, she isn’t.</i> (ou <i lang="en">No, she’s not.</i>)'},

 {kind:'Grammaire', h:'Les possessifs : my, his, her, our, their',
  p:`<p>Emma dit <i lang="en">my mum</i> et <i lang="en">our dog</i>. Pour parler de la famille des autres, il faut tous les possessifs.</p>
<div class="def"><p>I → <b>my</b> (mon, ma, mes) · you → <b>your</b> (ton, ta, tes, votre, vos)<br>he → <b>his</b> (son, sa, ses, à lui) · she → <b>her</b> (son, sa, ses, à elle) · it → <b>its</b> (son, sa, ses, pour une chose ou un animal)<br>we → <b>our</b> (notre, nos) · they → <b>their</b> (leur, leurs)</p></div>
<div class="idea"><p>En français, « son » ou « sa » s’accorde avec ce qu’on possède : <i>sa</i> mère, <i>son</i> père. En anglais, on regarde <b>le possesseur</b> : si c’est un homme, <b>his</b> ; si c’est une femme, <b>her</b>. Et le possessif ne change jamais selon le nom qui suit, singulier ou pluriel.</p></div>
<div class="ex"><p><i lang="en">Paul and <b>his</b> mother</i> = Paul et sa mère<br><i lang="en">Julie and <b>her</b> father</i> = Julie et son père<br><i lang="en">Julie and <b>her</b> brothers</i> = Julie et ses frères<br><i lang="en">Ben and Lucy are married. <b>Their</b> son is six.</i></p></div>
<div class="warn"><p>« Sa sœur » se traduit <b>his sister</b> ou <b>her sister</b> selon que c’est la sœur d’un homme ou d’une femme. Ne confonds pas <b>its</b> (son, sa) et <b>it’s</b> (= <i lang="en">it is</i>), ni <b>their</b> (leur) et <b>they’re</b> (= <i lang="en">they are</i>) : ils se prononcent pareil.</p></div>`,
  audio:'Paul and his mother. Julie and her father. Julie and her brothers. Ben and Lucy are married. Their son is six.'},

 {kind:'Pratique', h:'À toi : his ou her ?',
  p:'<b>Question :</b> comment dit-on en anglais « Marc et sa sœur sont en vacances. »&nbsp;? (<i lang="en">on holiday</i> = en vacances)', lab:'Ta phrase', txt:['Marc and his sister are on holiday.','Marc and his sister are on vacation.'],
  why:'Le possesseur est Marc, un homme : <i lang="en">his sister</i>. Le sujet est pluriel (Marc et sa sœur) : <i lang="en">are</i>. En américain : <i lang="en">on vacation</i>.'},

 {kind:'Grammaire', h:'Le ’s possessif',
  p:`<p>Emma dit <i lang="en">He’s my aunt’s son</i> : c’est le fils de ma tante. Pour dire « le … de quelqu’un », l’anglais n’utilise presque jamais <i lang="en">of</i> avec les personnes : il utilise <b>’s</b>.</p>
<div class="def"><p><b>possesseur + ’s + ce qui lui appartient</b> : <i lang="en">Emma’s cousin</i> = le cousin d’Emma ; <i lang="en">my father’s name</i> = le nom de mon père.</p><p>Si le possesseur est un pluriel en <b>-s</b>, on ajoute seulement l’apostrophe : <i lang="en">my parents’ house</i> (la maison de mes parents). Si le pluriel est irrégulier, on ajoute <b>’s</b> : <i lang="en">the children’s room</i> (la chambre des enfants).</p></div>
<div class="idea"><p>L’ordre est l’inverse du français : on nomme d’abord la personne, puis ce qui lui appartient. Lis <i lang="en">Tom’s sister</i> comme « Tom, sa sœur ». On peut enchaîner : <i lang="en">my brother’s wife</i> = la femme de mon frère.</p></div>
<div class="ex"><p>la femme de Paul → <i lang="en">Paul’s wife</i><br>la voiture de mes grands-parents → <i lang="en">my grandparents’ car</i><br>Le mari de ma sœur est professeur. → <i lang="en">My sister’s husband is a teacher.</i></p></div>
<div class="warn"><p>Pas de « the sister of Tom » : on dit <b>Tom’s sister</b>. Et <b>’s</b> a deux sens : <i lang="en">Tom’s twelve</i> = Tom <b>is</b> twelve (Tom a douze ans), <i lang="en">Tom’s sister</i> = la sœur de Tom. Si un nom suit, c’est le possessif.</p></div>`,
  audio:'Emma’s cousin. My father’s name. My parents’ house. My sister’s husband is a teacher.'},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:'Touche les mots dans le bon ordre. <b>Question :</b> comment demande-t-on « Comment s’appelle ton frère ? » (mot à mot : quel est le nom de ton frère)&nbsp;?',
  ordre:['What’s','your','brother’s','name?'],
  why:'<i lang="en">What’s your brother’s name?</i> Le possesseur (<i lang="en">your brother</i>) vient avant ce qu’il possède (<i lang="en">name</i>), relié par <i lang="en">’s</i>.'},

 {kind:'Pratique', h:'À toi : le ’s possessif',
  p:'<b>Question :</b> comment dit-on en anglais « Le mari de ma sœur est médecin. »&nbsp;? (<i lang="en">doctor</i> = médecin ; devant un métier, l’anglais met <i lang="en">a</i>, comme dans <i lang="en">I’m a student</i>.)', lab:'Ta phrase', txt:['My sister’s husband is a doctor.'],
  why:'<i lang="en">My sister’s husband</i> = le mari de ma sœur. Puis <i lang="en">is a doctor</i>, avec l’article <i lang="en">a</i> devant le métier.'},

 {kind:'Vocabulaire', h:'Les nombres jusqu’à 100 et l’âge',
  p:`<p>Pour dire l’âge de tes parents ou de tes grands-parents, il faut aller plus loin que 20. Touche chaque ligne pour l’entendre.</p>`,
  mots:[['twenty-one, twenty-two','vingt et un, vingt-deux','My cousin is twenty-two.'],['thirty, forty, fifty','trente, quarante, cinquante','My dad is fifty.'],['sixty, seventy','soixante, soixante-dix (septante)','My grandma is seventy.'],['eighty, ninety','quatre-vingts (huitante), quatre-vingt-dix (nonante)','My grandpa is ninety.'],['a hundred / one hundred','cent','She’s a hundred today!'],['How old are you?','Quel âge as-tu ?','How old are you? – I’m thirty-four.'],['I’m 34 / I’m 34 years old','J’ai 34 ans','I’m thirty-four years old.']],
  note:'De 21 à 99 : la dizaine, un trait d’union, puis l’unité : <i lang="en">twenty-one, forty-five, ninety-nine</i>. Comme en Suisse romande, 70, 80 et 90 sont réguliers : <i lang="en">seventy, eighty, ninety</i>. Attention : <i lang="en">four</i>, mais <b>forty</b> sans <i>u</i>. Pour l’âge : <i lang="en">How old is he? – He’s 45</i> ou <i lang="en">He’s 45 years old</i>, jamais « He has 45 years », ni « He’s 45 years » sans <i lang="en">old</i>.'},

 {kind:'Prononciation', h:'Thirteen ou thirty ?',
  p:`<p>Au téléphone ou dans un magasin, les francophones confondent souvent <i lang="en">thirteen</i> (13) et <i lang="en">thirty</i> (30), <i lang="en">fifteen</i> (15) et <i lang="en">fifty</i> (50). La différence ne tient pas seulement à la fin du mot : elle tient surtout à <b>l’accent tonique</b>, la syllabe qu’on dit plus fort et plus longtemps.</p>
<div class="def"><p><b>-teen</b> (13 à 19) : l’accent est sur la fin, avec un « i » long : thir<b>TEEN</b>, fif<b>TEEN</b>.<br><b>-ty</b> (20 à 90) : l’accent est sur le début, la fin est courte et faible : <b>THIR</b>ty, <b>FIF</b>ty.</p></div>
<div class="warn"><p>En français, l’accent tombe sur la dernière syllabe : on a donc tendance à dire « thirTY ». Appuie sur le début&nbsp;! En anglais américain, le <i>t</i> de <i lang="en">-ty</i> sonne presque comme un <i>d</i> rapide : <i lang="en">forty</i> ressemble à « fordi ». En cas de doute, on précise les chiffres : <i lang="en">fifteen, one five</i>.</p></div>
<p>Écoute les paires, puis dis la phrase à voix haute en touchant « Dire la phrase ».</p>`,
  audio:'thirteen, thirty. fourteen, forty. fifteen, fifty. sixteen, sixty. seventeen, seventy. eighteen, eighty. nineteen, ninety.',
  dire:'My cousin is fifteen and my uncle is fifty.'},

 {kind:'Écoute', h:'Quel âge ?',
  p:'Écoute sans lire. <b>Question :</b> quel âge a Sam&nbsp;? Écris le nombre en chiffres.', audio:'This is my aunt, Julia. She’s forty-three. And this is her son, Sam. He’s thirteen.', cache:true, lab:'Âge de Sam', txt:['13','thirteen'],
  why:'<i lang="en">He’s thir<b>teen</b></i> : l’accent est sur la fin, c’est 13. Sa mère Julia a 43 ans (<i lang="en"><b>for</b>ty-three</i>).'},

 {kind:'Lecture', h:'Lire : la famille de Daniel',
  p:`<p>Lis ce message, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Message : My family"><p lang="en">Hi, I’m Daniel and this is my family. I’m twenty-six and I’m a nurse. My parents are Mark and Helen. My dad is fifty-nine and my mum is fifty-seven. They’re teachers, but they aren’t at the same school. My sister’s name is Laura. She’s thirty-one and she’s married. Her husband’s name is Pablo. He’s a doctor. Their children are Lucas and Mia. Lucas is four and Mia is two, so I’m their uncle! My grandmother Rose is eighty-three. She isn’t very tall, but she’s very funny. Our family is big and noisy, but we’re very happy together.</p></div>
<p><b>Question :</b> qui est Pablo pour Daniel&nbsp;?</p>`,
  audio:'Hi, I’m Daniel and this is my family. I’m twenty-six and I’m a nurse. My parents are Mark and Helen. My dad is fifty-nine and my mum is fifty-seven. They’re teachers, but they aren’t at the same school. My sister’s name is Laura. She’s thirty-one and she’s married. Her husband’s name is Pablo. He’s a doctor. Their children are Lucas and Mia. Lucas is four and Mia is two, so I’m their uncle! My grandmother Rose is eighty-three. She isn’t very tall, but she’s very funny. Our family is big and noisy, but we’re very happy together.',
  opts:['Son frère','Son oncle','Le mari de sa sœur','Son cousin'], ans:2,
  why:'<i lang="en">My sister’s name is Laura… Her husband’s name is Pablo</i> : Pablo est le mari de Laura, la sœur de Daniel. Daniel est l’oncle de leurs enfants, Lucas et Mia.'},

 {kind:'Dictée', h:'Dictée : présenter sa famille',
  p:'Écoute et écris exactement les deux phrases. Tu peux réécouter autant que tu veux, et utiliser « Plus lentement ».',
  dictee:'This is my brother, Tom. His wife’s name is Kate.',
  why:'<i lang="en">His</i> car c’est la femme de Tom, un homme. <i lang="en">wife’s name</i> : le nom de sa femme, avec le <i lang="en">’s</i> possessif.'},

 {kind:'Oral', h:'Présente ta famille',
  p:`<p>À toi de parler, pendant 30 à 45 secondes. Présente au moins trois personnes de ta famille (ou de tes proches) : leur nom, leur âge et un détail (métier, marié ou pas…). Utilise <i lang="en">his</i>, <i lang="en">her</i>, <i lang="en">their</i> et le <i lang="en">’s</i> possessif. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'My family is small. My dad’s name is Luc. He’s fifty-six and he’s a teacher. My mum’s name is Anne. She’s fifty-four. I’ve got one brother, Hugo. He’s twenty-two and he’s a student. His girlfriend is very nice. And our cat? Her name is Mimi and she’s ten!',
   criteres:['J’ai présenté au moins trois personnes','J’ai donné leur âge avec he’s ou she’s, sans « have »','J’ai utilisé his, her ou their selon le possesseur','J’ai utilisé le ’s possessif (my dad’s name…)','J’ai accentué le début des nombres en -ty (FIFty-six)']}},

 {kind:'Écriture', h:'Écris à propos de ta famille',
  p:'Un ami anglophone te demande de lui parler de ta famille. Écris-lui un message (au moins 40 mots) : présente au moins trois personnes, donne leur âge, utilise <i lang="en">his</i>, <i lang="en">her</i> ou <i lang="en">their</i> et le <i lang="en">’s</i> possessif, et termine par une question sur sa famille.',
  ecrire:{min:40, modele:'Hi Jake! My family isn’t very big. My mum’s name is Claire. She’s forty-nine and she’s a nurse. My dad is fifty-one. His name is Paul and he’s a teacher. I’ve got a sister, Inès. She’s seventeen. My grandparents are seventy-eight. Their house is in the mountains. What about you? Are you an only child?',
   criteres:[{t:'J’ai utilisé he’s, she’s, he is ou she is', re:'\\b(he|she)( is|[\'’]s)\\b'},{t:'J’ai utilisé his, her ou their', re:'\\b(his|her|their)\\b'},{t:'J’ai utilisé le ’s possessif', re:'\\w[\'’]s? (mum|mother|dad|father|name|wife|husband|brother|sister|son|daughter|parents|children|house|dog|cat|car)\\b'},{t:'J’ai donné un âge', re:'\\b(\\d+|ten|eleven|twelve|\\w+teen|(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)(-\\w+)?)\\b'},'J’ai mis are avec les pluriels (my parents are…)',{t:'J’ai terminé par une question', re:'\\?'}]}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li>La famille : <i lang="en">mother/mum, father/dad, parents, brother, sister, son, daughter, husband, wife, child/children, grandmother, grandfather, uncle, aunt, cousin</i>. <i lang="en">I’m an only child. This is my…</i></li><li><b>to be</b> : <i lang="en">I am, you are, he/she/it is, we are, they are</i>. Un nom pluriel prend <b>are</b> : <i lang="en">My parents are…</i></li><li>Négation : <i lang="en">isn’t, aren’t, I’m not</i>. Question : <i lang="en">Is your brother…? Are they…?</i> Réponse courte avec un pronom : <i lang="en">Yes, she is. / No, they aren’t.</i> Jamais « Yes, he’s ».</li><li>Possessifs : <i lang="en">my, your, his, her, its, our, their</i>. <b>his</b> ou <b>her</b> selon le possesseur : <i lang="en">Paul and his mother, Julie and her father</i>.</li><li><b>’s</b> possessif : <i lang="en">Emma’s cousin, my father’s name</i> ; pluriel en -s : <i lang="en">my parents’ house</i>. Pas de « the sister of Tom ».</li><li>Nombres : <i lang="en">twenty-one… forty (sans u)… ninety-nine, a hundred</i>. <b>-teen</b> accentué à la fin, <b>-ty</b> au début.</li><li>L’âge : <i lang="en">How old are you? – I’m 34 (years old).</i> Jamais « I have 34 years ».</li></ul></div>`},

 {kind:'Mission', h:'La fête d’anniversaire',
  p:'Tu es à une fête de famille chez des amis anglais. Écoute la conversation entre Ryan et Lisa, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Ryan','Hi, I’m Ryan. I’m Jake’s friend.'],['Lisa','Nice to meet you, Ryan. I’m Lisa, Jake’s sister.'],['Ryan','Is this your grandmother’s party?'],['Lisa','Yes, it is. She’s ninety today!'],['Ryan','Ninety? Wow! And are your parents here?'],['Lisa','Yes and no. My mum is in the garden with my aunts, but my dad isn’t here. He’s in Spain for work.'],['Ryan','Oh, that’s a shame.'],['Lisa','And this is my husband, Dan, and our son, Leo. He’s fifteen.']], cache:true,
  parts:[
   {q:'a) Qui est Lisa pour Jake&nbsp;?', opts:['Sa femme','Sa sœur','Sa cousine','Sa mère'], ans:1, hint:'Écoute la façon dont Lisa se présente, avec un <i lang="en">’s</i>.', why:'<i lang="en">I’m Lisa, Jake’s sister</i> : Lisa est la sœur de Jake.'},
   {q:'b) Quel âge a la grand-mère&nbsp;? Écris le nombre en chiffres.', lab:'Âge', txt:['90','ninety'], hint:'C’est une dizaine en <i lang="en">-ty</i>, accentuée au début.', why:'<i lang="en">She’s ninety today!</i> : elle a 90 ans aujourd’hui.'},
   {q:'c) Ryan demande : <i lang="en">Is Lisa’s dad at the party?</i> Écris la réponse courte correcte.', lab:'Ta réponse', txt:['No, he is not.','No, he’s not.','No, he is not at the party.','No, he’s not at the party.','No, he is not. He is in Spain.','No, he’s not. He’s in Spain.'], hint:'<i lang="en">Lisa’s dad</i> devient un pronom. Lisa dit que son père est en Espagne.', why:'<i lang="en">No, he isn’t.</i> Son père est en Espagne pour son travail.'},
   {q:'d) Écris en anglais : « Le fils de Lisa a 15 ans. »', lab:'Ta phrase', txt:['Lisa’s son is 15.','Lisa’s son is fifteen.','Lisa’s son is 15 years old.','Lisa’s son is fifteen years old.'], hint:'Le possesseur d’abord, avec <i lang="en">’s</i>, puis <i lang="en">to be</i> pour l’âge.', why:'<i lang="en">Lisa’s son is fifteen.</i> Pas de « The son of Lisa », et l’âge avec <i lang="en">is</i>, pas <i lang="en">has</i>.'}],
  sol:'<p lang="en">Ryan: Hi, I’m Ryan. I’m Jake’s friend. – Lisa: Nice to meet you, Ryan. I’m Lisa, Jake’s sister. – Is this your grandmother’s party? – Yes, it is. She’s ninety today! – Ninety? Wow! And are your parents here? – Yes and no. My mum is in the garden with my aunts, but my dad isn’t here. He’s in Spain for work. – Oh, that’s a shame. – And this is my husband, Dan, and our son, Leo. He’s fifteen.</p><p>Lisa est la sœur de Jake. Sa grand-mère a 90 ans. Son père n’est pas là : <i lang="en">No, he isn’t.</i> Son fils Leo a 15 ans : <i lang="en">Lisa’s son is fifteen.</i></p>'},

 {kind:'Mission', h:'Ta famille d’accueil',
  p:`<p>Tu pars un mois en Angleterre pour apprendre l’anglais, et tu vas loger dans une famille. Tu reçois cet e-mail. Lis-le attentivement, puis réponds.</p>
<div class="blk" data-t="E-mail"><p lang="en">Hi Léa! Welcome to our family! I’m Karen and my husband’s name is Steve. We’re both forty-six. Our children are Josh and Amy. Josh is sixteen and Amy is thirteen. Steve’s mother, Margaret, is with us too. She’s seventy-nine and she’s very funny. Our dog’s name is Biscuit. He’s three and he’s very friendly. See you on Saturday! Karen</p></div>`,
  parts:[
   {q:'a) Qui est Margaret&nbsp;?', opts:['La mère de Karen','La fille de Karen et Steve','La mère de Steve, donc la grand-mère de Josh et Amy','La sœur de Steve'], ans:2, hint:'Lis bien : <i lang="en">Steve’s mother</i>.', why:'<i lang="en">Steve’s mother, Margaret</i> : la mère de Steve. C’est donc la grand-mère de Josh et Amy.'},
   {q:'b) Réponds par une réponse courte : <i lang="en">Are Josh and Amy Steve’s children?</i>', lab:'Ta réponse', txt:['Yes, they are.'], hint:'<i lang="en">Josh and Amy</i> deviennent un pronom pluriel. Pas de contraction dans une réponse positive.', why:'Karen et Steve sont mariés et <i lang="en">Our children are Josh and Amy</i> : <i lang="en">Yes, they are.</i>'},
   {q:'c) Tu veux demander à Karen : « Josh et Amy sont-ils à la maison samedi ? » Écris la question. (samedi = <i lang="en">on Saturday</i>)', lab:'Ta question', txt:['Are Josh and Amy at home on Saturday?','Will Josh and Amy be at home on Saturday?','Are Josh and Amy home on Saturday?'], hint:'Le verbe <i lang="en">are</i> passe devant tout le sujet.', why:'<i lang="en">Are Josh and Amy at home on Saturday?</i> Le verbe passe devant le sujet <i lang="en">Josh and Amy</i>.'},
   {q:'d) Écris en anglais : « La grand-mère d’Amy a 79 ans. »', lab:'Ta phrase', txt:['Amy’s grandmother is 79.','Amy’s grandmother is seventy-nine.','Amy’s grandmother is 79 years old.','Amy’s grandmother is seventy-nine years old.','Amy’s grandma is 79.','Amy’s grandma is seventy-nine.','Amy’s grandma is 79 years old.','Amy’s grandma is seventy-nine years old.'], hint:'Possesseur + <i lang="en">’s</i>, puis l’âge avec <i lang="en">to be</i>.', why:'<i lang="en">Amy’s grandmother is seventy-nine.</i> 79 = <i lang="en">seventy-nine</i>, accentué au début : <b>SEV</b>enty-nine.'},
   {q:'e) Réponds à Karen : « Mon frère a 16 ans aussi. » (aussi = <i lang="en">too</i>, en fin de phrase)', lab:'Ta phrase', txt:['My brother is 16 too.','My brother is sixteen too.','My brother is 16 years old too.','My brother is sixteen years old too.','My brother is also 16.','My brother is also sixteen.','My brother is also 16 years old.','My brother is also sixteen years old.'], hint:'Commence par <i lang="en">My brother</i>, puis <i lang="en">to be</i> et l’âge, puis <i lang="en">too</i>.', why:'<i lang="en">My brother is sixteen too.</i> Seize se dit <i lang="en">six<b>teen</b></i>, avec l’accent sur la fin.'}],
  sol:'<p>Karen et Steve ont 46 ans. Leurs enfants : Josh (16 ans) et Amy (13 ans). Margaret est la mère de Steve (<i lang="en">Steve’s mother</i>), donc la grand-mère des enfants : <i lang="en">Amy’s grandmother is seventy-nine.</i> Réponse courte : <i lang="en">Yes, they are.</i> Question : <i lang="en">Are Josh and Amy at home on Saturday?</i> Ta réponse : <i lang="en">My brother is sixteen too.</i></p>'},
]},
{subj:'en', sem:'a1', id:'en-a1-countries', o:3, h:'Where are you from?', p:'Dire d’où l’on vient, donner sa nationalité et poser des questions pour faire connaissance : pays et nationalités, questions en <i lang="en">wh-</i>, <i lang="en">a</i> ou <i lang="en">an</i>, les pluriels.', steps:[
 {kind:'Écoute', h:'Une rencontre internationale',
  p:`<p>À la fin de cette unité, tu sauras dire d’où tu viens, donner ta nationalité et celle des autres, et poser les questions pour faire connaissance : où, qui, quoi, quel âge.</p>
<p>Premier jour dans une école de langues en Angleterre. Maya et Luca font connaissance. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> d’où vient Maya&nbsp;?</p>`,
  audio:[['Maya','Hi! I’m Maya. Where are you from?'],['Luca','I’m from Italy, from Milan. And you?'],['Maya','I’m Canadian. I’m from Toronto.'],['Luca','Cool! Who’s that?'],['Maya','That’s Kenji. He’s a student here. He’s from Japan.'],['Luca','How old is he?'],['Maya','He’s nineteen, I think.'],['Luca','And what’s the teacher’s name?'],['Maya','Mrs Jones. She’s an English teacher, but she isn’t English. She’s Welsh!']], cache:true,
  opts:['De Milan, en Italie','Du Japon','De Toronto, au Canada','Du pays de Galles'], ans:2,
  why:'<i lang="en">I’m Canadian. I’m from Toronto.</i> Maya est canadienne, de Toronto. Luca vient de Milan, Kenji du Japon, et la professeure, Mrs Jones, est galloise (<i lang="en">Welsh</i>) : elle enseigne l’anglais mais n’est pas anglaise.'},

 {kind:'Vocabulaire', h:'Pays et nationalités',
  p:`<p>Des pays, leurs nationalités et les questions pour faire connaissance. Touche une ligne pour l’entendre, puis répète-la. Remarque la <b>majuscule</b> des nationalités : en anglais, on écrit <i lang="en">Swiss</i>, <i lang="en">French</i>, même au milieu d’une phrase.</p>`,
  mots:[['Switzerland','la Suisse','Geneva is in Switzerland.'],['Swiss','suisse','My parents are Swiss.'],['France','la France','Lyon is in France.'],['French','français(e)','Is she French?'],['Germany','l’Allemagne','Berlin is in Germany.'],['German','allemand(e)','My aunt is German.'],['Italy','l’Italie','Rome is in Italy.'],['Italian','italien(ne)','Luca is Italian.'],['Spain','l’Espagne','Madrid is in Spain.'],['Spanish','espagnol(e)','Our teacher is Spanish.'],['the United Kingdom / the UK','le Royaume-Uni','London is in the UK.'],['British','britannique','Is he British or American?'],['the United States / the USA','les États-Unis','New York is in the USA.'],['American','américain(e)','Her husband is American.'],['China','la Chine','Beijing is in China.'],['Chinese','chinois(e)','Chen is Chinese.'],['Where are you from?','D’où viens-tu ? D’où êtes-vous ?','Where are you from? – I’m from Spain.'],['I’m from…','Je viens de…','I’m from Lausanne.'],['What nationality are you?','Quelle est ta nationalité ?','What nationality are you? – I’m Swiss.'],['a language','une langue','English is an international language.'],['a city','une (grande) ville','Zurich is a big city.'],['Who’s that?','Qui est-ce ? (en montrant quelqu’un)','Who’s that? – That’s my teacher.']],
  note:'Certains pays prennent <i lang="en">the</i> : <i lang="en">the UK, the USA, the Netherlands</i>. La plupart n’en prennent pas : <i lang="en">Switzerland, France, Spain</i>. <i lang="en">England</i> (l’Angleterre) n’est qu’une partie du Royaume-Uni, avec l’Écosse (<i lang="en">Scotland</i>), le pays de Galles (<i lang="en">Wales</i>) et l’Irlande du Nord.'},

 {kind:'Pratique', h:'À toi : une nationalité',
  p:'<b>Question :</b> comment dit-on en anglais « Elle est allemande. »&nbsp;?', lab:'Ta phrase', txt:['She is German.','She’s German.'],
  why:'<i lang="en">She’s German.</i> Avec une majuscule à <i lang="en">German</i>, et sans article devant la nationalité.'},

 {kind:'Grammaire', h:'Pays, nationalités et langues',
  p:`<p>Maya dit <i lang="en">I’m Canadian. I’m from Toronto.</i> Il y a deux façons de dire d’où on vient : avec le lieu ou avec la nationalité.</p>
<div class="def"><p><b>be from + pays ou ville</b> : <i lang="en">I’m from Canada. She’s from Milan.</i><br><b>be + nationalité</b> (un adjectif) : <i lang="en">I’m Canadian. She’s Italian.</i></p><p>Les nationalités forment des familles : <b>-an / -ian</b> (<i lang="en">American, Italian, Canadian, Brazilian, Australian</i>), <b>-ish</b> (<i lang="en">British, English, Spanish, Irish, Scottish</i>), <b>-ese</b> (<i lang="en">Chinese, Japanese, Portuguese</i>). D’autres s’apprennent seules : <i lang="en">Swiss, French, German, Greek, Dutch</i> (néerlandais), <i lang="en">Welsh</i> (gallois).</p></div>
<div class="idea"><p>Souvent, la langue porte le même nom que la nationalité : <i lang="en">French, Spanish, German, Chinese</i>. Mais pas toujours : il n’existe pas de langue « Swiss ». En Suisse, on parle <i lang="en">German, French, Italian and Romansh</i>. Au Royaume-Uni, <i lang="en">British</i> désigne tous les habitants : un Écossais est <i lang="en">Scottish</i> et <i lang="en">British</i>, mais pas <i lang="en">English</i>.</p></div>
<div class="ex"><p><i lang="en">Where are you from? – I’m from Portugal. I’m Portuguese.</i><br><i lang="en">Luca isn’t Spanish. He’s Italian.</i></p></div>
<div class="warn"><p>Les pièges des francophones : la <b>majuscule</b> est obligatoire (<i lang="en">French</i>, alors qu’on écrit « il est français »). Pas d’article devant la nationalité seule : <i lang="en">She’s French</i>, pas « She’s a French ». Et ne mélange pas les deux tournures : <i lang="en">I’m from France</i> ou <i lang="en">I’m French</i>, mais jamais « I’m from French ».</p></div>`,
  audio:'I’m from Canada. I’m Canadian. She’s from Italy. She’s Italian. He’s from Japan. He’s Japanese.'},

 {kind:'Pratique', h:'À toi : du pays à la nationalité',
  p:'Dis la même chose avec la nationalité. <b>Question :</b> comment réécris-tu <i lang="en">My grandparents are from Portugal.</i>&nbsp;?', lab:'Ta phrase', txt:['My grandparents are Portuguese.'],
  why:'Portugal → <i lang="en">Portuguese</i>, de la famille en <i lang="en">-ese</i>. Sans <i lang="en">from</i> et sans article : <i lang="en">My grandparents are Portuguese.</i>'},

 {kind:'Grammaire', h:'Les questions en wh-',
  p:`<p>Dans le dialogue : <i lang="en">Where are you from? Who’s that? How old is he? What’s the teacher’s name?</i> Ces questions ne demandent pas oui ou non : elles demandent une information. Elles commencent par un <b>mot interrogatif</b>, souvent en <i lang="en">wh-</i>.</p>
<div class="def"><p><b>What</b> = que, quoi, quel (une chose, un nom) · <b>Where</b> = où (un lieu) · <b>Who</b> = qui (une personne) · <b>How old</b> = quel âge.</p><p>Avec <i lang="en">to be</i> : <b>mot interrogatif + be + sujet (+ reste)&nbsp;?</b></p></div>
<div class="idea"><p>C’est la question fermée (<i lang="en">Is she from Spain?</i>) avec un mot interrogatif ajouté devant : <i lang="en"><b>Where</b> is she from?</i> Le verbe reste avant le sujet. À l’oral, on contracte souvent <i lang="en">is</i> : <i lang="en">What’s, Where’s, Who’s</i>.</p></div>
<div class="ex"><p><i lang="en">What’s your name? – Lucy.</i><br><i lang="en">Where are your parents from? – They’re from Dublin.</i><br><i lang="en">Who is she? – She’s my cousin.</i><br><i lang="en">How old are you? – I’m sixteen.</i></p></div>
<div class="warn"><p>Les pièges des francophones : « D’où viens-tu ? » se dit <i lang="en">Where are you <b>from</b>?</i>, avec <i lang="en">from</i> à la fin (« From where are you? » sonne très étrange). « Quel âge as-tu ? » se dit <i lang="en">How old are you?</i>, pas « What age have you? ». Ne confonds pas <i lang="en">How are you?</i> (comment vas-tu) et <i lang="en">How old are you?</i> (quel âge as-tu). Et garde l’inversion : <i lang="en">Where <b>is she</b> from?</i>, pas « Where she is from? ».</p></div>`,
  audio:'What’s your name? Where are you from? Who is she? How old are you?'},

 {kind:'Méthode', h:'Former une question en wh-',
  p:`<p><b>Quand :</b> pour demander une information précise : un lieu, une personne, un nom, un âge. <b>Pourquoi ça marche :</b> on part de la réponse qu’on attend, on choisit le mot interrogatif qui la remplace, puis on construit la question comme une question fermée. <b>Comment :</b></p>
<ol><li>Repère l’information cherchée : un lieu → <b>Where</b> ; une personne → <b>Who</b> ; un nom ou une chose → <b>What</b> ; un âge → <b>How old</b>.</li><li>Mets le mot interrogatif en premier.</li><li>Ajoute <i lang="en">to be</i> : <b>is</b> pour un singulier, <b>are</b> pour <i lang="en">you</i> et les pluriels.</li><li>Ajoute le sujet, puis le reste (<i lang="en">from</i> va à la fin).</li><li>Si tu parles à la personne, change les pronoms : <i lang="en">I</i> → <i lang="en">you</i>, <i lang="en">my</i> → <i lang="en">your</i>.</li></ol>`,
  demo:{enonce:'Trouve la question qui correspond à la réponse <i lang="en">My parents are from Lisbon.</i>',
   etapes:[{f:'Information cherchée : <i lang="en">Lisbon</i>, un lieu → <b>Where</b>.',w:'Un lieu se demande avec <i lang="en">Where</i>.'},
    {f:'Sujet : <i lang="en">my parents</i>, un pluriel → <b>are</b>. Tu parles à la personne : <i lang="en">my</i> devient <b>your</b>.',w:'Le verbe s’accorde avec le sujet, et le possessif change de point de vue.'},
    {f:'<i lang="en"><b>Where are</b> your parents <b>from</b>?</i>',w:'Mot interrogatif, verbe, sujet, puis <i lang="en">from</i> à la fin.'}],
   conclusion:'<i lang="en">Where are your parents from? – They’re from Lisbon.</i>'}},

 {kind:'Pratique', h:'À toi : trouve la question',
  p:'Ta collègue te répond : <i lang="en">My husband is from Brazil.</i> <b>Question :</b> quelle question lui as-tu posée&nbsp;? Écris-la en anglais.', lab:'Ta question', txt:['Where is your husband from?','Where’s your husband from?'],
  why:'Un lieu → <i lang="en">Where</i> ; <i lang="en">my husband</i>, singulier → <i lang="en">is</i> ; tu lui parles → <i lang="en">your husband</i> ; <i lang="en">from</i> à la fin : <i lang="en">Where is your husband from?</i>'},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:'Touche les mots dans le bon ordre. <b>Question :</b> comment demande-t-on l’âge de la sœur de quelqu’un&nbsp;?',
  ordre:['How','old','is','your','sister?'],
  why:'<i lang="en">How old is your sister?</i> <i lang="en">How old</i> reste groupé en tête, puis le verbe, puis le sujet.'},

 {kind:'Pratique', h:'À toi : qui est-ce ?',
  p:'Tu montres une photo à un ami. Il te pose une question sur la femme de la photo, et tu réponds : <i lang="en">She’s my aunt.</i> <b>Question :</b> quelle était sa question, avec <i lang="en">who</i> et <i lang="en">she</i>&nbsp;?', lab:'Sa question', txt:['Who is she?','Who’s she?'],
  why:'Une personne → <i lang="en">Who</i>, puis le verbe et le sujet : <i lang="en">Who is she?</i>'},

 {kind:'Grammaire', h:'A ou an ?',
  p:`<p>Dans le dialogue, Kenji est <i lang="en"><b>a</b> student</i> et Mrs Jones est <i lang="en"><b>an</b> English teacher</i>. Pourquoi deux formes pour « un, une »&nbsp;?</p>
<div class="def"><p><b>a</b> devant un mot qui commence par un <b>son</b> de consonne : <i lang="en">a student, a British student, a doctor</i>.<br><b>an</b> devant un mot qui commence par un <b>son</b> de voyelle : <i lang="en">an English teacher, an Italian student, an engineer, an uncle</i>.</p></div>
<div class="idea"><p><i lang="en">an</i> évite de coller deux voyelles : « a English » se dit mal, <i lang="en">an English</i> coule tout seul. C’est donc le <b>son</b> qui compte, pas la lettre : <i lang="en">an hour</i> (le <i>h</i> est muet), mais <i lang="en">a university</i> et <i lang="en">a European city</i> (ces mots commencent par le son « you »).</p></div>
<div class="ex"><p><i lang="en">She’s an architect. He’s a nurse. It’s an old city. Zurich is a big city.</i></p></div>
<div class="warn"><p>Les pièges des francophones : devant un métier, l’anglais met l’article, le français non. « Elle est architecte » → <i lang="en">She’s <b>an</b> architect</i>. Mais pas d’article devant une nationalité seule : <i lang="en">She’s Italian</i> ; avec un nom, oui : <i lang="en">She’s an Italian student</i>. Au pluriel, <i lang="en">a/an</i> disparaît : <i lang="en">They’re students</i>, pas « They’re a students ».</p></div>`,
  audio:'a doctor, an engineer. a British student, an Italian student. an hour, a university.'},

 {kind:'Pratique', h:'À toi : a ou an ?',
  p:'<b>Question :</b> comment dit-on en anglais « Mon oncle est ingénieur. »&nbsp;? (<i lang="en">engineer</i> = ingénieur)', lab:'Ta phrase', txt:['My uncle is an engineer.','My uncle’s an engineer.'],
  why:'Un métier prend l’article en anglais, et <i lang="en">engineer</i> commence par un son de voyelle : <i lang="en">My uncle is an engineer.</i>'},

 {kind:'Grammaire', h:'Les pluriels',
  p:`<p>Comme en français, on forme le pluriel d’un nom avec un <b>s</b>. Mais l’orthographe change parfois, et quelques noms très courants sont irréguliers.</p>
<div class="def"><ul><li>En général <b>+ s</b> : <i lang="en">student → students, brother → brothers, day → days</i>.</li><li><b>+ es</b> après <i>s, ss, sh, ch, x</i> : <i lang="en">bus → buses, class → classes, watch → watches, box → boxes</i>.</li><li>Consonne + <b>y</b> → <b>ies</b> : <i lang="en">city → cities, country → countries, family → families</i>. Mais voyelle + y → + s : <i lang="en">boy → boys</i>.</li><li><b>f / fe</b> → <b>ves</b> : <i lang="en">wife → wives, life → lives</i>.</li><li>Irréguliers : <i lang="en">man → men, woman → women</i> (prononcé « wimin »), <i lang="en">child → children, person → people</i>.</li></ul></div>
<div class="idea"><p>Le <i>s</i> du pluriel se prononce toujours, jamais muet comme en français : « s » dans <i lang="en">students</i>, « z » dans <i lang="en">brothers</i>, et une syllabe en plus, « iz », dans <i lang="en">buses, watches</i>.</p></div>
<div class="warn"><p>Les pièges des francophones : en anglais, l’<b>adjectif ne prend jamais de s</b>, même les nationalités : <i lang="en">two Italian students</i>, pas « two Italians students ». <i lang="en">people</i> est un pluriel : <i lang="en">People <b>are</b> nice here</i>. Et un sujet pluriel prend <b>are</b> : <i lang="en">The children are…</i></p></div>`,
  audio:'one student, two students. one city, two cities. one bus, two buses. one child, three children. one woman, two women.'},

 {kind:'Pratique', h:'À toi : des pluriels',
  p:'<b>Question :</b> comment dit-on en anglais « deux femmes et trois enfants »&nbsp;?', lab:'En anglais', txt:['two women and three children','2 women and 3 children'],
  why:'Deux pluriels irréguliers : <i lang="en">woman → women</i>, <i lang="en">child → children</i>. Jamais « womans » ni « childs ».'},

 {kind:'Pratique', h:'À toi : toute la phrase au pluriel',
  p:'Mets toute la phrase au pluriel. <b>Question :</b> que devient <i lang="en">The Italian student is in my class.</i> quand on parle de plusieurs étudiants&nbsp;?', lab:'Ta phrase', txt:['The Italian students are in my class.'],
  why:'<i lang="en">student → students</i>, <i lang="en">is → are</i>, et l’adjectif <i lang="en">Italian</i> ne change pas : <i lang="en">The Italian students are in my class.</i>'},

 {kind:'Prononciation', h:'Italy, Italian : l’accent qui bouge',
  p:`<p>Les francophones disent souvent les noms de pays « à la française », avec toutes les syllabes de même force et la voix qui monte à la fin. En anglais, chaque mot a une syllabe <b>accentuée</b>, plus forte et plus longue, et elle <b>change souvent de place</b> entre le pays et la nationalité.</p>
<div class="def"><p><b>I</b>taly → I<b>ta</b>lian · <b>Ca</b>nada → Ca<b>na</b>dian · Ja<b>pan</b> → Japa<b>nese</b> · <b>Chi</b>na → Chi<b>nese</b> · <b>Ger</b>many → <b>Ger</b>man · A<b>me</b>rica → A<b>me</b>rican</p></div>
<div class="warn"><p>Les nationalités en <b>-ese</b> sont accentuées sur la fin : Japa<b>nese</b>, Chi<b>nese</b>, Portu<b>guese</b>. Les syllabes sans accent s’affaiblissent : dans <i lang="en">Canada</i>, les deux <i>a</i> de la fin deviennent un petit « e » rapide. Exagère d’abord la syllabe forte, puis laisse filer les autres.</p></div>
<p>Écoute les paires, puis dis la phrase à voix haute.</p>`,
  audio:'Italy, Italian. Canada, Canadian. Japan, Japanese. China, Chinese.',
  dire:'I’m from Italy, but my mother is Canadian.'},

 {kind:'Écoute', h:'Une famille internationale',
  p:'Écoute sans lire. <b>Question :</b> quelle est la nationalité du mari d’Aiko&nbsp;?', audio:'Hi, I’m Aiko. I’m Japanese, from Osaka, but my husband isn’t Japanese. He’s Canadian. Our children are Japanese and Canadian!', cache:true,
  opts:['Japonais','Chinois','Canadien','Américain'], ans:2,
  why:'<i lang="en">My husband isn’t Japanese. He’s Canadian.</i> Écoute l’accent : Ca<b>na</b>dian. Leurs enfants ont les deux nationalités.'},

 {kind:'Lecture', h:'Lire : une classe internationale',
  p:`<p>Lis ce message posté par une étudiante, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Message : Hello from Brighton!"><p lang="en">Hello from Brighton! My name is Inês and I’m Portuguese, from Porto. I’m in an English class, and the students are from eight countries! Kenji and Yuki are Japanese, but they aren’t from the same city: Kenji is from Tokyo and Yuki is from Osaka. Marta and Diego are Spanish, from Madrid. Lukas is German, and Chloé is French, but her father is Swiss. The other students are from Brazil, China and Italy. Our teacher, Mr Davies, isn’t English. He’s Welsh, from Cardiff. He’s an excellent teacher and he’s very patient. Our class is like a small United Nations!</p></div>
<p><b>Question :</b> laquelle de ces phrases est vraie&nbsp;?</p>`,
  audio:'Hello from Brighton! My name is Inês and I’m Portuguese, from Porto. I’m in an English class, and the students are from eight countries! Kenji and Yuki are Japanese, but they aren’t from the same city: Kenji is from Tokyo and Yuki is from Osaka. Marta and Diego are Spanish, from Madrid. Lukas is German, and Chloé is French, but her father is Swiss. The other students are from Brazil, China and Italy. Our teacher, Mr Davies, isn’t English. He’s Welsh, from Cardiff. He’s an excellent teacher and he’s very patient. Our class is like a small United Nations!',
  opts:['Le professeur est anglais.','Kenji et Yuki viennent de la même ville.','Chloé est française et son père est suisse.','Inês est espagnole.'], ans:2,
  why:'<i lang="en">Chloé is French, but her father is Swiss.</i> Le professeur est gallois (<i lang="en">He’s Welsh</i>), Kenji vient de Tokyo et Yuki d’Osaka, et Inês est portugaise.'},

 {kind:'Dictée', h:'Dictée : d’où viens-tu ?',
  p:'Écoute et écris exactement la question et la réponse. Attention aux majuscules des pays et des nationalités.',
  dictee:'Where are you from? I’m from Germany, but my wife is Spanish.',
  why:'<i lang="en">from</i> à la fin de la question, et une majuscule à <i lang="en">Germany</i> et à <i lang="en">Spanish</i>.'},

 {kind:'Oral', h:'Présente-toi au groupe',
  p:`<p>Premier jour dans un groupe international. Parle pendant 30 à 45 secondes : dis d’où tu viens (pays et ville), ta nationalité, la nationalité ou l’origine d’une personne de ta famille ou d’un ami, puis pose deux questions en <i lang="en">wh-</i> au groupe. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'Hi everyone! I’m Nina. I’m from Switzerland, from Fribourg. I’m Swiss, but my mother is Italian. She’s from Turin. My best friend is from Spain. She’s Spanish and she’s an engineer. And you? Where are you from? How old are you?',
   criteres:['J’ai dit d’où je viens avec I’m from…','J’ai donné ma nationalité sans article (I’m Swiss)','J’ai parlé de la nationalité d’une autre personne (he’s, she’s)','J’ai posé au moins deux questions en wh- (Where, What, Who, How old)','J’ai accentué la bonne syllabe (Iˈtalian, Japaˈnese)']}},

 {kind:'Écriture', h:'Ton profil d’échange linguistique',
  p:'Tu t’inscris sur un site d’échange linguistique pour trouver un correspondant. Écris ton profil (au moins 40 mots) : ton prénom, ton âge, d’où tu viens, ta nationalité, ton métier ou tes études, une personne de ta famille ou un ami avec sa nationalité, et deux questions pour ton futur correspondant.',
  ecrire:{min:40, modele:'Hi! My name is Julien and I’m twenty-four. I’m from Switzerland, from Neuchâtel. I’m Swiss, but my father is French. I’m an engineer. My best friend is Brazilian. Her name is Camila and she’s a teacher in Geneva. What about you? Where are you from? How old are you?',
   criteres:[{t:'J’ai dit d’où je viens avec from', re:'\\bfrom\\b'},{t:'J’ai donné au moins une nationalité', re:'\\b(swiss|french|german|italian|spanish|portuguese|british|english|american|canadian|chinese|japanese|brazilian|irish|scottish|welsh|australian|greek|dutch)\\b'},'J’ai mis une majuscule aux pays et aux nationalités',{t:'J’ai utilisé a ou an devant un métier', re:'\\b(a|an) [a-z]+'},'J’ai accordé le verbe : is au singulier, are au pluriel',{t:'J’ai posé une question en wh-', re:'\\b(what|where|who|how old)\\b[^.!?]*\\?'}]}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li>D’où on vient : <i lang="en">I’m from + pays ou ville</i> (<i lang="en">I’m from Spain</i>) ou <i lang="en">I’m + nationalité</i> (<i lang="en">I’m Spanish</i>). Jamais « I’m from Spanish » ni « I’m a Spanish ».</li><li>Nationalités avec une <b>majuscule</b> : <i lang="en">Swiss, French, German, Italian, Spanish, British, American, Chinese</i>. Familles <i lang="en">-an/-ian, -ish, -ese</i>. Pays avec <i lang="en">the</i> : <i lang="en">the UK, the USA</i>.</li><li>Questions en <b>wh-</b> : <i lang="en">What</i> (chose, nom), <i lang="en">Where</i> (lieu), <i lang="en">Who</i> (personne), <i lang="en">How old</i> (âge). Mot interrogatif + <i lang="en">be</i> + sujet : <i lang="en">Where are your parents from?</i> avec <i lang="en">from</i> à la fin.</li><li><b>a</b> devant un son de consonne, <b>an</b> devant un son de voyelle : <i lang="en">a doctor, an engineer, an hour, a university</i>. Article obligatoire devant un métier.</li><li>Pluriels : <i lang="en">+s</i> ; <i lang="en">+es</i> après s, sh, ch, x ; <i lang="en">city → cities</i> ; <i lang="en">wife → wives</i> ; <i lang="en">man → men, woman → women, child → children, person → people</i>. L’adjectif reste invariable : <i lang="en">two Italian students</i>.</li><li>Accent : I<b>ta</b>lian, Ca<b>na</b>dian, Japa<b>nese</b>, Chi<b>nese</b>.</li></ul></div>`},

 {kind:'Mission', h:'À l’accueil de l’école de langues',
  p:'Tu travailles à l’accueil d’une école de langues à Londres. Une nouvelle étudiante arrive. Écoute le dialogue, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Receptionist','Hello! Are you a new student?'],['Nadia','Yes, I am. My name is Nadia Haddad.'],['Receptionist','How do you spell your surname, please?'],['Nadia','H, A, double D, A, D.'],['Receptionist','Thank you. And where are you from, Nadia?'],['Nadia','I’m from Switzerland, from Lausanne. My mother is French and my father is Italian.'],['Receptionist','Lovely. And how old are you?'],['Nadia','I’m twenty-three.'],['Receptionist','Great. Your teacher is Mr Evans. He’s Irish, from Dublin. You’re in room twelve.']], cache:true,
  parts:[
   {q:'a) Laquelle de ces phrases est vraie&nbsp;?', opts:['Nadia est française.','Le père de Nadia est irlandais.','Nadia vient de Suisse et sa mère est française.','Le professeur est anglais.'], ans:2, hint:'Écoute la réponse à <i lang="en">Where are you from?</i> et la phrase sur ses parents.', why:'<i lang="en">I’m from Switzerland, from Lausanne. My mother is French and my father is Italian.</i> C’est le professeur, Mr Evans, qui est irlandais.'},
   {q:'b) Quel âge a Nadia&nbsp;? Écris le nombre en chiffres.', lab:'Âge', txt:['23','twenty-three'], hint:'Une dizaine en <i lang="en">-ty</i>, puis un chiffre.', why:'<i lang="en">I’m twenty-three</i> : 23 ans.'},
   {q:'c) Écris la question que le réceptionniste a posée pour connaître l’âge de Nadia.', lab:'Sa question', txt:['How old are you?','And how old are you?'], hint:'Deux mots pour « quel âge », puis le verbe et le sujet.', why:'<i lang="en">How old are you?</i> Pas « What age have you? ».'},
   {q:'d) Écris en anglais : « Son père est italien. » (le père de Nadia)', lab:'Ta phrase', txt:['Her father is Italian.','Her dad is Italian.','Nadia’s father is Italian.','Nadia’s dad is Italian.'], hint:'Nadia est une femme : quel possessif&nbsp;? Et la nationalité prend une majuscule, sans article.', why:'<i lang="en">Her father is Italian.</i> <i lang="en">her</i> car le possesseur est Nadia ; <i lang="en">Italian</i> sans article.'}],
  sol:'<p lang="en">Receptionist: Hello! Are you a new student? – Nadia: Yes, I am. My name is Nadia Haddad. – How do you spell your surname, please? – H, A, double D, A, D. – Thank you. And where are you from, Nadia? – I’m from Switzerland, from Lausanne. My mother is French and my father is Italian. – Lovely. And how old are you? – I’m twenty-three. – Great. Your teacher is Mr Evans. He’s Irish, from Dublin. You’re in room twelve.</p><p>Nadia vient de Lausanne, en Suisse ; sa mère est française et son père italien : <i lang="en">Her father is Italian.</i> Elle a 23 ans, réponse à <i lang="en">How old are you?</i> Son professeur est irlandais.</p>'},

 {kind:'Mission', h:'L’équipe du projet',
  p:`<p>Tu participes à un projet d’été à Édimbourg. Le coordinateur envoie ce message à toute l’équipe. Lis-le attentivement, puis réponds.</p>
<div class="blk" data-t="Message"><p lang="en">Hi everyone! Welcome to the summer project in Edinburgh. Here’s our team. Ana and Pedro are Brazilian, from São Paulo. They’re engineers. Chen is from Shanghai, in China. He’s an architect and he’s twenty-eight. Fiona is Scottish, from Glasgow. She’s a nurse. And me? I’m Tom, from Leeds. I’m British and I’m your coordinator. Our boss is Kate Miller. She’s from Boston and she’s very nice. See you on Monday! Tom</p></div>`,
  parts:[
   {q:'a) Qui est Kate Miller&nbsp;?', opts:['Une infirmière écossaise','La coordinatrice britannique','Une ingénieure brésilienne','La cheffe, qui vient de Boston'], ans:3, hint:'Cherche <i lang="en">boss</i> dans le message.', why:'<i lang="en">Our boss is Kate Miller. She’s from Boston</i> : c’est la cheffe, elle vient de Boston (aux États-Unis). Le coordinateur, c’est Tom.'},
   {q:'b) Écris en anglais : « Ce sont deux ingénieurs brésiliens. » (Ana et Pedro)', lab:'Ta phrase', txt:['They are two Brazilian engineers.','They are Brazilian engineers.'], hint:'Au pluriel, pas de <i lang="en">a</i>. Et l’adjectif ne prend pas de s.', why:'<i lang="en">They’re two Brazilian engineers.</i> <i lang="en">Brazilian</i> reste invariable, avec une majuscule, et se place avant le nom.'},
   {q:'c) Tu veux savoir la nationalité de Kate. Écris la question avec <i lang="en">What nationality</i> et <i lang="en">she</i>.', lab:'Ta question', txt:['What nationality is she?','What is her nationality?','What’s her nationality?'], hint:'Mot interrogatif (<i lang="en">What nationality</i>), puis le verbe, puis le sujet.', why:'<i lang="en">What nationality is she?</i> Elle vient de Boston, donc elle est sans doute <i lang="en">American</i>.'},
   {q:'d) Écris en anglais : « Chen est architecte. »', lab:'Ta phrase', txt:['Chen is an architect.','Chen’s an architect.'], hint:'Un métier prend l’article. <i lang="en">architect</i> commence par un son de voyelle.', why:'<i lang="en">Chen is an architect.</i> Article obligatoire devant le métier, et <i lang="en">an</i> devant le son de voyelle.'},
   {q:'e) Quelle phrase est correcte&nbsp;?', opts:['Fiona is a Scottish.','Fiona is an Scottish nurse.','Fiona is from Scottish.','Fiona is Scottish.'], ans:3, hint:'Nationalité seule : pas d’article, pas de <i lang="en">from</i>.', why:'<i lang="en">Fiona is Scottish.</i> On pourrait aussi dire <i lang="en">Fiona is a Scottish nurse</i> (avec <i lang="en">a</i>, car <i lang="en">Scottish</i> commence par un son de consonne) ou <i lang="en">Fiona is from Scotland</i>.'}],
  sol:'<p>L’équipe : Ana et Pedro, ingénieurs brésiliens (<i lang="en">They’re two Brazilian engineers</i>) ; Chen, architecte chinois de 28 ans (<i lang="en">Chen is an architect</i>) ; Fiona, infirmière écossaise (<i lang="en">Fiona is Scottish</i>) ; Tom, le coordinateur britannique ; Kate Miller, la cheffe, de Boston. Pour connaître sa nationalité : <i lang="en">What nationality is she?</i></p>'},
]},
);
})();
