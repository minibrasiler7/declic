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
);
})();
