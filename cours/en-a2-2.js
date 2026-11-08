/* Déclic — Anglais A2 (unités 4 à 6). Format : docs/ANGLAIS.md */
(()=>{
// Toutes les combinaisons de morceaux de phrase : X('a',['b','c']) → ['ab','ac']
const X=(...parts)=>parts.reduce((acc,p)=>acc.flatMap(a=>[].concat(p).map(b=>a+b)),['']);
COURS.push(
{subj:'en', sem:'a2', id:'en-a2-future', o:4, h:'Predictions and promises', p:'Prédire, rassurer, proposer son aide, promettre et décider sur le moment : tous les emplois de <i lang="en">will</i> et <i lang="en">won’t</i>.', steps:[
 {kind:'Écoute', h:'La veille de l’entretien',
  p:`<p>À la fin de cette unité, tu sauras faire des prédictions, donner ton avis sur l’avenir, proposer ton aide, faire une promesse et prendre une décision sur le moment, avec <i lang="en">will</i> et <i lang="en">won’t</i>.</p>
<p>Leo et Mia partagent un appartement. Demain matin, Leo passe un entretien d’embauche. <b>Écoute sans lire</b>, deux fois si tu veux, puis réponds.</p>
<p><b>Question :</b> que propose Mia pour la soirée&nbsp;?</p>`,
  audio:[['Leo','I’ve got my job interview tomorrow morning. I’m so nervous!'],['Mia','Don’t worry, you’ll be fine. You’re perfect for that job.'],['Leo','I don’t think they’ll choose me. There are twenty other people.'],['Mia','Of course they will! Look, I’m not busy tonight. I’ll help you prepare. Shall I ask you some typical questions?'],['Leo','Yes, please. That’s really kind of you.'],['Mia','Oh, someone’s at the door. Stay there, I’ll get it.'],['Leo','Thanks, Mia. I promise I’ll buy you dinner if I get the job.'],['Mia','Deal! And I won’t forget that promise!']], cache:true,
  opts:['Lui offrir à dîner au restaurant.','L’accompagner à l’entretien.','L’aider à se préparer en lui posant des questions.','Appeler l’entreprise à sa place.'], ans:2,
  why:'Mia dit <i lang="en">I’ll help you prepare. Shall I ask you some typical questions?</i> : elle l’aidera à se préparer en lui posant des questions typiques. C’est Leo qui promet un dîner, s’il obtient le poste.'},

 {kind:'Vocabulaire', h:'Rassurer, proposer, promettre',
  p:`<p>Les expressions du dialogue et d’autres, très courantes. Ce sont des <b>blocs tout faits</b> : apprends-les entiers, avec leur exemple. Touche une ligne pour l’entendre, puis répète-la à voix haute.</p>`,
  mots:[['Don’t worry','Ne t’inquiète pas','Don’t worry, it’s not a problem.'],['You’ll be fine','Ça va bien se passer (pour toi)','It’s only an interview. You’ll be fine.'],['I’ll get it','J’y vais, je réponds (porte, téléphone)','The phone’s ringing! – I’ll get it.'],['Shall I…?','Veux-tu que je… ? (proposer son aide)','Shall I open the window?'],['to give someone a hand','donner un coup de main à quelqu’un','I’ll give you a hand with your bags.'],['I promise','Je (te) le promets','I promise I’ll call you tonight.'],['to keep a promise','tenir une promesse','He always keeps his promises.'],['to break a promise','ne pas tenir une promesse','Don’t break your promise!'],['I won’t tell anyone','Je ne le dirai à personne','Your secret is safe. I won’t tell anyone.'],['I’ll do my best','Je ferai de mon mieux','I can’t promise, but I’ll do my best.'],['Good luck!','Bonne chance !','Good luck with your exam!'],['Deal!','Marché conclu ! D’accord !','You cook, I’ll wash up. – Deal!']],
  note:'<i lang="en">Shall I…?</i> est surtout britannique. Les Américains disent plutôt <i lang="en">Should I…?</i> ou <i lang="en">Do you want me to…?</i>'},

 {kind:'Pratique', h:'À toi : rassurer quelqu’un',
  p:'Ton amie passe son permis de conduire demain et elle panique. <b>Question :</b> écris en anglais « Ne t’inquiète pas, ça va bien se passer. »', lab:'En anglais',
  txt:X('Don’t worry, ',['you’ll','it’ll','everything will'],' be ',['fine','OK','okay','all right','alright'],['','.']),
  show:'Don’t worry, you’ll be fine.',
  why:'<i lang="en">Don’t worry, you’ll be fine.</i> On entend aussi <i lang="en">it’ll be fine</i> ou <i lang="en">everything will be OK</i>. Le futur de « ça va bien se passer » se fait avec <i lang="en">will</i>.'},

 {kind:'Vocabulaire', h:'Parler de l’avenir : certain, probable, douteux',
  p:`<p>Pour parler de l’avenir, il faut aussi dire <b>à quel point on en est sûr</b>. Voici les mots qui le précisent, du plus certain au plus douteux, et quelques expressions de temps.</p>`,
  mots:[['definitely','certainement, sans aucun doute','I’ll definitely be there.'],['probably','probablement','It will probably rain tonight.'],['maybe / perhaps','peut-être','Maybe she’ll call later.'],['I hope so','J’espère (que oui)','Will it be sunny? – I hope so.'],['I hope not','J’espère que non','Will it rain? – I hope not.'],['I doubt it','J’en doute','Will he come? – I doubt it.'],['in the future','à l’avenir, dans le futur','In the future, cars will drive themselves.'],['one day','un jour','One day, I’ll live by the sea.'],['in ten years’ time','dans dix ans','In ten years’ time, my son will be at university.'],['the weather forecast','les prévisions météo','The weather forecast says it will snow.']],
  note:'<b>Attention :</b> <i lang="en">I hope so</i> et <i lang="en">I hope not</i> répondent à une question entière. On ne dit pas <i lang="en">I hope yes</i> ni <i lang="en">I don’t hope</i>.'},

 {kind:'Grammaire', h:'Will et won’t : la forme',
  p:`<p>Dans le dialogue, Mia dit <i lang="en">You’ll be fine</i>, <i lang="en">I’ll get it</i> et <i lang="en">I won’t forget</i>. Ces trois phrases parlent de l’avenir avec le même petit mot : <b>will</b>.</p>
<div class="def"><p><b>will + base verbale</b> (le verbe sans <i lang="en">to</i>), à toutes les personnes : <i lang="en">I will go, she will go, they will go</i>.</p><ul><li>Contraction : <b>’ll</b>. <i lang="en">I’ll, you’ll, he’ll, it’ll, we’ll, they’ll</i>.</li><li>Négation : <b>will not</b>, presque toujours contracté en <b>won’t</b>. <i lang="en">It won’t rain.</i></li><li>Question : on inverse. <b>Will you</b> be at home? Réponses courtes : <i lang="en">Yes, I will. / No, I won’t.</i></li></ul></div>
<div class="idea"><p><i lang="en">Will</i> fonctionne exactement comme <i lang="en">can</i>, que tu connais : c’est un <b>modal</b>. Il ne prend jamais de <i lang="en">-s</i>, n’a jamais besoin de <i lang="en">do</i>, et le verbe qui suit reste nu. <i lang="en">She can swim</i> → <i lang="en">She will swim</i>. Une seule forme pour tout le monde : c’est plus simple que le futur français.</p></div>
<div class="ex"><p><i lang="en">It will be cold tomorrow.</i> → <i lang="en">It’ll be cold tomorrow.</i><br><i lang="en">They won’t come.</i> = Ils ne viendront pas.<br><i lang="en">Will you be at home tonight? – Yes, I will.</i></p></div>
<div class="warn"><p>Les pièges des francophones : <i lang="en">I will <s>to</s> go</i> (pas de <i lang="en">to</i>), <i lang="en">she <s>wills</s> come</i> (pas de <i lang="en">-s</i>), <i lang="en"><s>Do you will</s>…?</i> (pas de <i lang="en">do</i>). Et comme avec <i lang="en">to be</i>, on ne contracte pas une réponse courte : <i lang="en">Yes, I will</i>, jamais « Yes, I’ll ».</p></div>`,
  audio:'It will be cold tomorrow. It’ll be cold tomorrow. They won’t come. Will you be at home tonight? Yes, I will.'},

 {kind:'Pratique', h:'À toi : prédire avec will',
  p:'Complète avec <i lang="en">will</i> et le verbe entre parenthèses. <b>Question :</b> <i lang="en">Take an umbrella. I think it ___ (rain) this afternoon.</i> Écris les mots manquants.', lab:'Les mots', txt:['will rain'],
  why:'<i lang="en">I think it will rain</i> (ou <i lang="en">it’ll rain</i>) : <i lang="en">will</i> + base verbale, sans <i lang="en">-s</i> même avec <i lang="en">it</i>.'},

 {kind:'Grammaire', h:'Les quatre emplois de will',
  p:`<p>Le français utilise souvent le présent là où l’anglais met <i lang="en">will</i>. Quand on sonne à la porte, on dit « J’y vais&nbsp;! », au présent. Mia, elle, dit <i lang="en">I’ll get it!</i> Il faut donc connaître les situations où l’anglais exige <i lang="en">will</i>.</p>
<div class="def"><ol><li><b>Prédiction</b> (une opinion, une croyance) : <i lang="en">You’ll be fine. It will be cold in Scotland.</i></li><li><b>Décision prise au moment où l’on parle</b> : <i lang="en">The doorbell! – I’ll get it. / I’m thirsty. I think I’ll have some water.</i></li><li><b>Offre</b> d’aide : <i lang="en">I’ll help you. I’ll carry that for you.</i> En question, on dit <b>Shall I…?</b> <i lang="en">Shall I open the window?</i></li><li><b>Promesse</b> : <i lang="en">I’ll call you tonight. I won’t be late, I promise.</i></li></ol></div>
<div class="idea"><p>Le point commun : <i lang="en">will</i> exprime ce que tu <b>penses</b> ou ce que tu <b>décides</b> à l’instant même, sans plan préparé. On l’utilise aussi pour demander un service : <i lang="en">Will you help me?</i> (Tu veux bien m’aider&nbsp;?)</p></div>
<div class="ex"><p>Ton ami : <i lang="en">I haven’t got any money with me.</i> Toi : <i lang="en">Don’t worry, I’ll pay.</i> (décision immédiate et offre)<br><i lang="en">Shall I call a taxi?</i> = Veux-tu que j’appelle un taxi&nbsp;?</p></div>
<div class="warn"><p>Ne dis pas <i lang="en"><s>I answer!</s></i> ou <i lang="en"><s>I take it!</s></i> pour une décision immédiate : c’est <i lang="en">I’ll get it!</i>, <i lang="en">I’ll take it!</i> Et pour proposer, pas <i lang="en"><s>Will I open the window?</s></i> mais <i lang="en">Shall I open the window?</i></p></div>`,
  audio:[['Tom','I haven’t got any money with me.'],['Lucy','Don’t worry, I’ll pay.'],['Tom','Thanks! I’ll pay next time, I promise.'],['Lucy','It’s cold in here. Shall I close the window?']]},

 {kind:'Pratique', h:'À toi : proposer ton aide',
  p:'Une dame âgée monte l’escalier de la gare avec une grosse valise. <b>Question :</b> propose-lui ton aide par une question qui commence par <i lang="en">Shall</i>.', lab:'Ta question',
  txt:[...X('Shall I ',['carry','take'],' ',['your suitcase','your bag','it','that'],['',' for you'],['?','']),...X('Shall I help you',['',' with your suitcase',' with your bag',' with that',' with it',' carry it',' carry your suitcase',' carry your bag'],['?',''])],
  show:'Shall I carry your suitcase for you?',
  why:'<i lang="en">Shall I carry your suitcase (for you)?</i> ou <i lang="en">Shall I help you?</i> <i lang="en">Shall I…?</i> sert à proposer de faire quelque chose pour l’autre.'},

 {kind:'Pratique', h:'À toi : une promesse',
  p:'Ta cheffe s’inquiète pour la réunion de demain matin. <b>Question :</b> écris en anglais « Je promets que je ne serai pas en retard. »', lab:'Ta phrase',
  txt:[...X('I promise ',['','that '],'I won’t be late',['','.']),'I won’t be late, I promise.','I won’t be late, I promise you.'],
  show:'I promise I won’t be late.',
  why:'<i lang="en">I promise I won’t be late.</i> Une promesse se fait avec <i lang="en">will</i> ou <i lang="en">won’t</i>. Le <i lang="en">that</i> après <i lang="en">promise</i> est facultatif.'},

 {kind:'Méthode', h:'Donner son avis sur l’avenir : I think / I don’t think … will',
  p:`<p><b>Quand :</b> dès que tu donnes ton opinion sur ce qui va se passer : le temps de demain, le résultat d’un match, l’avenir d’un ami. <b>Pourquoi ça marche :</b> l’anglais aime mettre la négation <b>sur le verbe d’opinion</b>, pas sur la prédiction, comme dans <i lang="en">I don’t think so</i>. <b>Comment :</b></p>
<ul><li>Avis positif : <b>I think + sujet + will…</b> <i lang="en">I think she’ll win.</i></li><li>Avis négatif : <b>I don’t think + sujet + will…</b> <i lang="en">I don’t think she’ll win.</i> (« I think she won’t win » existe, mais sonne moins naturel.)</li><li>Nuancer : <b>probably</b> et <b>definitely</b> se placent <b>après</b> <i lang="en">will</i>, mais <b>avant</b> <i lang="en">won’t</i> : <i lang="en">She’ll probably win. She probably won’t win.</i></li><li>Demander l’avis : <b>Do you think + phrase normale ?</b> <i lang="en">Do you think she’ll win?</i> (pas d’inversion après <i lang="en">think</i>).</li></ul>`,
  demo:{enonce:'Dis en anglais « Je ne pense pas qu’il neigera demain », puis la même idée avec <i lang="en">probably</i>, puis demande l’avis d’un ami.',
   etapes:[{f:'<i lang="en">I <b>don’t think</b> it will snow tomorrow.</i>',w:'La négation va sur <i lang="en">think</i> ; la prédiction reste affirmative : <i lang="en">it will snow</i>.'},
    {f:'<i lang="en">It <b>probably won’t</b> snow tomorrow.</i>',w:'Avec la négation, <i lang="en">probably</i> se place avant <i lang="en">won’t</i>. À l’affirmatif ce serait <i lang="en">It will probably snow</i>.'},
    {f:'<i lang="en"><b>Do you think</b> it will snow tomorrow?</i>',w:'La question porte sur <i lang="en">think</i> (avec <i lang="en">do</i>) ; la suite garde l’ordre normal sujet + <i lang="en">will</i>.'}],
   conclusion:'<i lang="en">I don’t think it’ll snow tomorrow. It probably won’t snow. Do you think it’ll snow?</i>'}},

 {kind:'Pratique', h:'À toi : un avis négatif',
  p:'Ton collègue organise un apéro, mais tu connais tes amis. <b>Question :</b> écris en anglais « Je ne pense pas qu’ils viendront. »', lab:'Ta phrase',
  txt:[...X('I don’t think ',['they will come','they’re coming','they are coming','they’re going to come','they are going to come'],['','.']),'I think they won’t come.'],
  show:'I don’t think they’ll come.',
  why:'<i lang="en">I don’t think they’ll come.</i> La négation se met sur <i lang="en">think</i>. <i lang="en">I think they won’t come</i> est compris, mais moins naturel.'},

 {kind:'Pratique', h:'Remets la prédiction dans l’ordre',
  p:'Touche les mots dans le bon ordre. <b>Question :</b> comment dit-on « Elle sera probablement encore en retard »&nbsp;?',
  ordre:['She','will','probably','be','late','again.'],
  why:'<i lang="en">She will probably be late again.</i> <i lang="en">Probably</i> se place entre <i lang="en">will</i> et le verbe. À la négation : <i lang="en">She probably won’t be late.</i>'},

 {kind:'Méthode', h:'Choisir entre will et going to',
  p:`<p><b>Quand :</b> chaque fois que tu parles de l’avenir, car tu as vu <i lang="en">be going to</i> pour les projets. <b>Pourquoi ça marche :</b> le choix ne dépend pas du moment où l’action aura lieu, mais du <b>moment où tu as décidé</b> et de <b>ce sur quoi tu te fondes</b>. <b>Comment :</b></p>
<ul><li>Décision <b>déjà prise</b> avant de parler, projet : <b>going to</b>. <i lang="en">I’m going to paint my room this weekend.</i></li><li>Décision prise <b>à l’instant</b>, offre, promesse : <b>will</b>. <i lang="en">There’s no milk? I’ll buy some.</i></li><li>Prédiction fondée sur <b>ce qu’on voit</b> maintenant : <b>going to</b>. <i lang="en">Look at those clouds! It’s going to rain.</i></li><li>Prédiction fondée sur une <b>opinion</b> : <b>will</b>. <i lang="en">I think it’ll rain tomorrow.</i></li></ul>`,
  demo:{enonce:'Choisis la bonne forme dans trois situations. a) Ton colocataire dit qu’il n’y a plus de lait ; tu décides d’en acheter. b) Hier, tu as décidé de rendre visite à ta tante dimanche. c) Le ciel est tout noir au-dessus de toi.',
   etapes:[{f:'a) <i lang="en">Oh, I’ll buy some.</i>',w:'Tu viens de l’apprendre et tu décides maintenant : <i lang="en">will</i>.'},
    {f:'b) <i lang="en">I’m going to visit my aunt on Sunday.</i>',w:'La décision date d’hier : c’est un projet, donc <i lang="en">going to</i>.'},
    {f:'c) <i lang="en">It’s going to rain.</i>',w:'Tu vois les nuages : la preuve est sous tes yeux, donc <i lang="en">going to</i>.'}],
   conclusion:'Décision sur le moment ou opinion : <i lang="en">will</i>. Projet décidé ou preuve visible : <i lang="en">going to</i>.'}},

 {kind:'Pratique', h:'À toi : will ou going to ?',
  p:'Tu rentres des courses avec de la farine, des œufs et du chocolat. Ta colocataire demande : <i lang="en">Why did you buy all that?</i> <b>Question :</b> que réponds-tu&nbsp;?',
  opts:['I’ll make a cake.','I make a cake.','I’m going to make a cake.','I will to make a cake.'], ans:2,
  why:'Tu as décidé de faire un gâteau <b>avant</b> d’acheter les ingrédients : c’est un projet, donc <i lang="en">I’m going to make a cake</i>. <i lang="en">I’ll make a cake</i> conviendrait pour une décision prise à l’instant.'},

 {kind:'Prononciation', h:'Entendre ’ll et won’t',
  p:`<p>À l’oral, <i lang="en">will</i> se réduit presque toujours à un simple son « l » collé au sujet. Si tu ne l’entends pas, tu crois qu’on parle au présent.</p>
<div class="def"><ul><li><b>I’ll</b> se dit comme « aïl », <b>we’ll</b> comme « ouïl », <b>it’ll</b> en deux syllabes, « i-teul ». Le « l » anglais en fin de mot est sombre, prononcé au fond de la bouche.</li><li><b>won’t</b> se prononce avec la diphtongue de <i lang="en">don’t</i> ou de <i lang="en">no</i> : « ouôn’t ». <b>want</b> (vouloir) a un « o » court : « ouonnt ».</li></ul></div>
<div class="warn"><p>Le piège : <i lang="en">I want to go</i> (je veux y aller) et <i lang="en">I won’t go</i> (je n’irai pas) disent presque le contraire. Écoute bien la voyelle : longue et glissante dans <i lang="en">won’t</i>, brève dans <i lang="en">want</i>.</p></div>`,
  audio:'I want to go. I won’t go. I’ll call you. We’ll see. It’ll be fine.'},

 {kind:'Écoute', h:'Want ou won’t ?',
  p:'Écoute la phrase, sans la lire. <b>Question :</b> la personne viendra-t-elle à la fête&nbsp;?', audio:'Sorry, I won’t come to the party on Friday.', cache:true,
  opts:['Oui, elle veut venir.','Non, elle ne viendra pas.','Elle ne sait pas encore.'], ans:1,
  why:'<i lang="en">I won’t come</i> : la voyelle longue de <i lang="en">won’t</i>, comme dans <i lang="en">no</i>. Avec <i lang="en">want</i>, on aurait entendu <i lang="en">I want to come</i>, avec <i lang="en">to</i>.'},

 {kind:'Lecture', h:'Lire : la vie en 2050',
  p:`<p>Lis ce billet de blog, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Blog : My predictions for 2050"><p lang="en">Everyone asks me what life will be like in 2050. Here are my predictions. First, I think most people will work from home three or four days a week, so cities will be quieter. Cars will probably drive themselves, but I don’t think people will stop driving completely: some of us love it too much! We’ll definitely use less plastic, and I hope we’ll eat less meat. Will robots do the housework? Maybe, but I doubt they’ll cook as well as my grandmother. And holidays? I don’t think we’ll spend weekends on the Moon, sorry! But one thing won’t change: people will still need friends, good food and a good laugh. What are your predictions?</p></div>
<p><b>Question :</b> selon l’auteur, qu’est-ce qui ne changera pas&nbsp;?</p>`,
  audio:'Everyone asks me what life will be like in 2050. Here are my predictions. First, I think most people will work from home three or four days a week, so cities will be quieter. Cars will probably drive themselves, but I don’t think people will stop driving completely: some of us love it too much! We’ll definitely use less plastic, and I hope we’ll eat less meat. Will robots do the housework? Maybe, but I doubt they’ll cook as well as my grandmother. And holidays? I don’t think we’ll spend weekends on the Moon, sorry! But one thing won’t change: people will still need friends, good food and a good laugh. What are your predictions?',
  opts:['On passera toujours ses week-ends en ville.','Les gens auront toujours besoin d’amis, de bons repas et de rire.','Les gens n’arrêteront jamais de conduire.','Les robots ne feront jamais le ménage.'], ans:1,
  why:'<i lang="en">One thing won’t change: people will still need friends, good food and a good laugh.</i> Pour les voitures, il dit seulement qu’il ne pense pas qu’on arrêtera <b>complètement</b> de conduire ; pour les robots, <i lang="en">Maybe</i>.'},

 {kind:'Dictée', h:'Dictée : la météo de demain',
  p:'Écoute et écris exactement la phrase. Réécoute autant que tu veux, et utilise « Plus lentement ».',
  dictee:'I don’t think it will rain tomorrow, but I’ll take an umbrella.',
  why:'Deux emplois de <i lang="en">will</i> : une opinion (<i lang="en">I don’t think it will rain</i>) et une décision prise à l’instant (<i lang="en">I’ll take an umbrella</i>). Les contractions et les formes pleines sont acceptées.'},

 {kind:'Oral', h:'De mémoire : proposer',
  p:'La phrase n’est pas écrite. Écoute-la, puis redis-la de mémoire. Elle te servira chaque fois que tu veux aider quelqu’un qui porte quelque chose de lourd.',
  dire:{t:'Shall I help you with your bags?', cache:true}},

 {kind:'Oral', h:'Ta vie dans dix ans',
  p:`<p>Parle pendant 40 secondes à 1 minute : comment sera ta vie dans dix ans&nbsp;? Fais au moins quatre prédictions (travail, logement, famille, loisirs), avec des degrés de certitude différents, et au moins une phrase avec <i lang="en">I don’t think … will</i>. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'In ten years’ time, I’ll be forty. I think I’ll still live in Switzerland, but I’ll probably have a bigger flat, maybe near the lake. I don’t think I’ll work in an office: I hope I’ll work from home. I’ll definitely speak better English! I probably won’t have children, but I’ll have a dog. And one day, I’ll travel to Australia.',
   criteres:['J’ai fait au moins quatre prédictions avec will ou ’ll','J’ai utilisé probably ou definitely à la bonne place','J’ai dit au moins une phrase avec I don’t think … will','J’ai utilisé won’t au moins une fois','Je n’ai pas mis de to ni de -s après will']}},

 {kind:'Écriture', h:'Écris un message d’encouragement',
  p:'Ton ami Sam déménage samedi dans une nouvelle ville, pour un nouveau travail, et il est inquiet. Écris-lui un message (au moins 40 mots) : rassure-le avec une prédiction, propose ton aide pour le déménagement (au moins une question avec <i lang="en">Shall I…?</i>), et fais-lui une promesse.',
  ecrire:{min:40, modele:'Hi Sam! Don’t worry, you’ll be fine in Manchester. You’ll love your new job and I’m sure you’ll make friends quickly. I’m free on Saturday, so I’ll give you a hand with the boxes. Shall I bring my car? I can come at nine. And I promise I’ll visit you in the summer. Good luck!',
   criteres:[{t:'J’ai fait une prédiction avec will ou ’ll', re:'\\bwill\\b|[\'’]ll\\b'},{t:'J’ai proposé mon aide avec Shall I…?', re:'\\bshall i\\b'},{t:'J’ai fait une promesse', re:'\\bpromise\\b'},'J’ai rassuré Sam (Don’t worry, You’ll be fine…)','Je n’ai pas mis de to ni de -s après will']}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>will + base verbale</b>, à toutes les personnes, sans <i lang="en">to</i> ni <i lang="en">-s</i>. Contraction <i lang="en">’ll</i>. Négation <i lang="en">won’t</i>. Question <i lang="en">Will you…? – Yes, I will. / No, I won’t.</i></li><li>Quatre emplois : <b>prédiction</b> (<i lang="en">You’ll be fine</i>), <b>décision immédiate</b> (<i lang="en">I’ll get it!</i>), <b>offre</b> (<i lang="en">I’ll help you. Shall I…?</i>), <b>promesse</b> (<i lang="en">I promise I won’t be late</i>).</li><li>Avis : <i lang="en">I think it’ll rain. <b>I don’t think</b> it’ll rain. Do you think it’ll rain?</i></li><li><b>probably / definitely</b> après <i lang="en">will</i>, avant <i lang="en">won’t</i> : <i lang="en">She’ll probably win. She probably won’t win.</i></li><li><b>will</b> : décision sur le moment, opinion. <b>going to</b> : projet déjà décidé, preuve visible (<i lang="en">Look at those clouds! It’s going to rain.</i>).</li><li>Réponses : <i lang="en">I hope so. I hope not. I doubt it.</i> Prononciation : <i lang="en">won’t</i> (voyelle longue) ≠ <i lang="en">want</i>.</li></ul></div>`},

 {kind:'Mission', h:'Le pique-nique de samedi',
  p:'Kate et Sam organisent un pique-nique avec des amis. Écoute leur conversation, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Kate','What does the weather forecast say for Saturday?'],['Sam','It says it’ll be sunny in the morning, but it will probably rain after three.'],['Kate','OK, so let’s have the picnic at twelve. I’ll make some sandwiches.'],['Sam','Great. Shall I bring the drinks?'],['Kate','Yes, please. And can you bring a blanket too?'],['Sam','Sure. I won’t forget, I promise.'],['Kate','Do you think Ben will come?'],['Sam','I doubt it. He’s working on Saturday.']], cache:true,
  parts:[
   {q:'a) Quel temps est prévu samedi après-midi&nbsp;?', opts:['Du soleil toute la journée.','Probablement de la pluie après 15 heures.','De la neige le soir.','Du vent le matin.'], ans:1, hint:'Écoute la fin de la première réponse de Sam, après <i lang="en">but</i>.', why:'<i lang="en">It will probably rain after three</i> : il pleuvra probablement après 15 heures. Le matin, il fera beau.'},
   {q:'b) Sam propose d’apporter quelque chose. Écris sa question exacte.', lab:'Sa question', txt:X('Shall I bring ',['the drinks','drinks','some drinks'],['?','']), show:'Shall I bring the drinks?', hint:'C’est une offre : elle commence par <i lang="en">Shall I…</i>', why:'<i lang="en">Shall I bring the drinks?</i> : <i lang="en">Shall I…?</i> sert à proposer son aide.'},
   {q:'c) Ben viendra-t-il, d’après Sam&nbsp;?', opts:['Oui, certainement.','Probablement pas : il travaille samedi.','Oui, mais seulement l’après-midi.','Sam ne connaît pas Ben.'], ans:1, hint:'<i lang="en">I doubt it</i> exprime un doute.', why:'<i lang="en">I doubt it. He’s working on Saturday.</i> : Sam en doute, car Ben travaille samedi (un rendez-vous fixé, au présent continu).'},
   {q:'d) Tu es Kate. Écris en anglais : « Je pense qu’il fera beau le matin. »', lab:'Ta phrase', txt:[...X('I think ',['it will be ','the weather will be '],['sunny','nice','fine','good','beautiful'],' in the morning',['','.']),...X('I think ',['it will be ','the weather will be '],['sunny','nice','fine','good','beautiful'],['','.'])], show:'I think it’ll be sunny in the morning.', hint:'Une opinion sur l’avenir : <i lang="en">I think</i> + sujet + <i lang="en">will</i>. « Faire beau » : <i lang="en">be sunny</i> ou <i lang="en">be nice</i>.', why:'<i lang="en">I think it’ll be sunny in the morning.</i> Le « il » impersonnel de la météo se dit <i lang="en">it</i>.'},
   {q:'e) Sam a fait une promesse. Écris-la comme lui, en anglais : « Je n’oublierai pas, promis. »', lab:'Sa promesse', txt:['I won’t forget, I promise.','I promise I won’t forget.','I won’t forget, I promise you.','I will not forget, I promise.'], show:'I won’t forget, I promise.', hint:'Une promesse négative : <i lang="en">won’t</i> + verbe.', why:'<i lang="en">I won’t forget, I promise.</i> (<i lang="en">won’t</i> = <i lang="en">will not</i>).'}],
  sol:'<p lang="en">Kate: What does the weather forecast say for Saturday? – Sam: It says it’ll be sunny in the morning, but it will probably rain after three. – Kate: OK, so let’s have the picnic at twelve. I’ll make some sandwiches. – Sam: Great. Shall I bring the drinks? – Kate: Yes, please. And can you bring a blanket too? – Sam: Sure. I won’t forget, I promise. – Kate: Do you think Ben will come? – Sam: I doubt it. He’s working on Saturday.</p><p>Soleil le matin, pluie probable après 15 heures, donc pique-nique à midi. Kate décide sur le moment de faire des sandwichs (<i lang="en">I’ll make</i>), Sam propose les boissons (<i lang="en">Shall I…?</i>) et promet d’apporter une couverture (<i lang="en">I won’t forget</i>). Ben ne viendra probablement pas.</p>'},

 {kind:'Mission', h:'Un ami déménage à Édimbourg',
  p:`<p>Tu reçois ce message de ton ami Tom. Lis-le, puis réponds-lui étape par étape.</p>
<div class="blk" data-t="Message de Tom"><p lang="en">Hi! Big news: I’m moving to Edinburgh next month. I’ve got a new job there! But I’m a bit worried. I don’t know anyone in the city, and I think the winters will be very cold. Also, I need to sell my furniture before I leave, and I haven’t got much time. Will you come and visit me? Tom</p></div>`,
  parts:[
   {q:'a) Pourquoi Tom déménage-t-il&nbsp;?', opts:['Pour ses études.','Parce qu’il a un nouveau travail.','Pour se rapprocher de sa famille.','Parce que son appartement est trop froid.'], ans:1, hint:'Lis la deuxième phrase.', why:'<i lang="en">I’ve got a new job there!</i> : il a un nouveau travail à Édimbourg.'},
   {q:'b) Quelle prédiction Tom fait-il&nbsp;?', opts:['Il ne trouvera pas d’appartement.','Les hivers seront très froids.','Il ne vendra pas ses meubles.','Son travail sera difficile.'], ans:1, hint:'Cherche <i lang="en">I think … will</i>.', why:'<i lang="en">I think the winters will be very cold.</i>'},
   {q:'c) Rassure-le : écris en anglais « Ne t’inquiète pas, tu te feras vite des amis. »', lab:'Ta phrase', txt:[...X('Don’t worry, you’ll ',['make friends','make new friends'],[' quickly',' fast',' soon'],['','.']),...X('Don’t worry, you’ll ',['quickly ','soon '],['make friends','make new friends'],['','.'])], show:'Don’t worry, you’ll make friends quickly.', hint:'« Se faire des amis » : <i lang="en">make friends</i>. « Vite » : <i lang="en">quickly</i>.', why:'<i lang="en">Don’t worry, you’ll make friends quickly.</i> Une prédiction pour rassurer, avec <i lang="en">will</i>.'},
   {q:'d) Propose ton aide par une question avec <i lang="en">Shall</i> : « Veux-tu que je t’aide à vendre tes meubles ? »', lab:'Ta question', txt:X('Shall I help you ',['sell','to sell','with'],' your furniture',['?','']), show:'Shall I help you sell your furniture?', hint:'<i lang="en">Shall I help you</i> + verbe. « Meubles » se dit <i lang="en">furniture</i>, indénombrable, sans <i lang="en">-s</i>.', why:'<i lang="en">Shall I help you sell your furniture?</i> Après <i lang="en">help</i>, le <i lang="en">to</i> est facultatif. <i lang="en">Furniture</i> ne prend jamais de <i lang="en">-s</i>.'},
   {q:'e) Réponds à sa question par une promesse : « Je viendrai te voir en mars, promis. »', lab:'Ta promesse', txt:[...X(['I’ll visit you','I’ll come and visit you','I’ll come and see you','I’ll come to see you','I’ll come to visit you'],' in March',[', I promise',' I promise','. I promise.',', I promise.','. I promise']),...X('I promise ',['','that '],['I’ll visit you','I’ll come and visit you','I’ll come and see you','I’ll come to see you','I’ll come to visit you'],' in March',['','.'])], show:'I’ll come and visit you in March, I promise.', hint:'Une promesse : <i lang="en">I’ll</i> + verbe, et <i lang="en">I promise</i> au début ou à la fin. « En mars » : <i lang="en">in March</i>, avec une majuscule.', why:'<i lang="en">I’ll come and visit you in March, I promise.</i> Les mois prennent une majuscule en anglais.'}],
  sol:'<p>Tom part à Édimbourg pour un nouveau travail ; il pense que les hivers seront très froids et il doit vendre ses meubles. Une réponse possible :</p><p lang="en">Don’t worry, you’ll make friends quickly. Shall I help you sell your furniture? I’ll come and visit you in March, I promise.</p><p>On rassure avec une prédiction (<i lang="en">you’ll make friends</i>), on propose avec <i lang="en">Shall I…?</i>, on promet avec <i lang="en">I’ll … I promise</i>.</p>'},
]},
{subj:'en', sem:'a2', id:'en-a2-experiences', o:5, h:'Experiences', p:'Parler de ce qu’on a vécu (ou jamais fait) avec le present perfect, puis raconter les détails au prétérit.', steps:[
 {kind:'Écoute', h:'Au déjeuner entre collègues',
  p:`<p>À la fin de cette unité, tu sauras demander à quelqu’un ce qu’il a déjà fait dans sa vie, raconter tes propres expériences et donner les détails (quand, où, comment) au bon temps.</p>
<p>Ella et Raj, deux collègues, déjeunent dans un restaurant japonais. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> combien de fois Raj est-il allé au Pérou&nbsp;?</p>`,
  audio:[['Raj','Have you ever eaten sushi before?'],['Ella','Yes, I have. I love it! I ate sushi in Tokyo two years ago.'],['Raj','Wow, you’ve been to Japan?'],['Ella','Yes, I went there for work. Have you ever been to Asia?'],['Raj','No, I’ve never been to Asia. But I’ve travelled a lot in South America. I’ve been to Peru three times.'],['Ella','Really? Have you seen Machu Picchu?'],['Raj','Yes, I have. I walked the Inca Trail in 2019. It was amazing, but I’ve never been so tired in my life!']], cache:true,
  opts:['Une fois','Deux fois','Trois fois','Jamais'], ans:2,
  why:'<i lang="en">I’ve been to Peru three times</i> : trois fois. En revanche, il n’est jamais allé en Asie (<i lang="en">I’ve never been to Asia</i>).'},

 {kind:'Vocabulaire', h:'Raconter ce qu’on a vécu',
  p:`<p>Les expressions pour parler de ses expériences. Touche une ligne pour l’entendre, puis répète-la. Remarque que beaucoup d’exemples utilisent <i lang="en">have</i> + un verbe : c’est le temps que tu vas découvrir.</p>`,
  mots:[['Have you ever…?','As-tu déjà… ? (dans ta vie)','Have you ever eaten snails?'],['I’ve never…','Je n’ai jamais…','I’ve never seen the sea.'],['to have been to (a place)','être allé à, en (un lieu)','I’ve been to Canada twice.'],['once','une fois','I’ve been to Rome once.'],['twice','deux fois','She’s seen that film twice.'],['three times','trois fois','We’ve moved house three times.'],['in my life','de ma vie','I’ve never been so scared in my life!'],['abroad','à l’étranger','Have you ever lived abroad?'],['to try','essayer, goûter','Have you ever tried Indian food?'],['to fly','prendre l’avion, voler','I’ve never flown in a helicopter.'],['to win a prize','gagner un prix','My sister has won a prize for her photos.'],['to break your arm / leg','se casser le bras / la jambe','I broke my arm when I was ten.'],['to get lost','se perdre','We got lost in Venice.'],['an experience','une expérience (vécue)','It was a great experience.'],['amazing','incroyable, génial','The view was amazing.'],['scary','effrayant','Skydiving? That sounds scary!']],
  note:'<b>Attention :</b> <i lang="en">experience</i> = ce qu’on a vécu. Une expérience scientifique, c’est <i lang="en">an experiment</i>. Et <i lang="en">abroad</i> s’emploie sans préposition : <i lang="en">to live abroad</i>, pas « in abroad ».'},

 {kind:'Pratique', h:'À toi : jamais allé',
  p:'Utilise l’expression <i lang="en">to have been to</i> du vocabulaire. <b>Question :</b> écris en anglais « Je ne suis jamais allé en Australie. »', lab:'Ta phrase', txt:['I have never been to Australia.','I haven’t ever been to Australia.'], show:'I’ve never been to Australia.',
  why:'<i lang="en">I’ve never been to Australia.</i> « Je suis allé » se dit avec <i lang="en">have</i>, jamais avec <i lang="en">be</i>, et pour un lieu visité on emploie <i lang="en">been to</i>.'},

 {kind:'Grammaire', h:'Le present perfect : la forme',
  p:`<p>Raj demande <i lang="en">Have you ever eaten sushi?</i> et dit <i lang="en">I’ve never been to Asia</i>. Ce temps sert à parler de ce qu’on a vécu : c’est le <b>present perfect</b>.</p>
<div class="def"><p><b>have / has + participe passé</b>.</p><ul><li><i lang="en">I, you, we, they</i> <b>have</b> (<b>’ve</b>) : <i lang="en">I’ve eaten, they’ve seen</i>.</li><li><i lang="en">he, she, it</i> <b>has</b> (<b>’s</b>) : <i lang="en">she’s eaten, he’s seen</i>.</li><li>Négation : <b>haven’t / hasn’t</b> + participe. Question : <b>Have you…? Has she…?</b> Réponses courtes : <i lang="en">Yes, I have. / No, she hasn’t.</i></li></ul></div>
<div class="idea"><p>La forme ressemble au passé composé : un auxiliaire + un participe, <i lang="en">I have eaten</i> = j’ai mangé. Mais l’anglais n’a qu’un seul auxiliaire, <b>have</b> : « je suis allé » devient <i lang="en">I have been</i>, « elle est venue » devient <i lang="en">she has come</i>. Et surtout, on ne l’emploie pas comme le passé composé, tu le verras plus loin.</p></div>
<div class="ex"><p><i lang="en">She’s lived in Spain.</i> = Elle a vécu en Espagne.<br><i lang="en">They haven’t seen the film.</i><br><i lang="en">Has he travelled a lot? – Yes, he has.</i></p></div>
<div class="warn"><p>Les pièges : <i lang="en"><s>She have seen</s></i> → <b>she has seen</b>. <i lang="en">’s</i> peut vouloir dire <i lang="en">has</i> ou <i lang="en">is</i> : <i lang="en">She’s been</i> (<i lang="en">has</i>, suivi d’un participe), <i lang="en">She’s tired</i> (<i lang="en">is</i>). Et pas de contraction dans une réponse courte : <i lang="en">Yes, I have</i>.</p></div>`,
  audio:'She’s lived in Spain. They haven’t seen the film. Has he travelled a lot? Yes, he has.'},

 {kind:'Grammaire', h:'Les participes passés',
  p:`<p>Pour le present perfect, il faut la <b>3e forme</b> du verbe, le participe passé : <i lang="en">go, went, <b>gone</b></i>. Bonne nouvelle : pour la moitié des verbes, tu la connais déjà.</p>
<div class="def"><ul><li><b>Verbes réguliers</b> : participe = prétérit en <i lang="en">-ed</i>. <i lang="en">work, worked, worked ; try, tried, tried ; travel, travelled, travelled</i>.</li><li><b>Irréguliers, participe = prétérit</b> : <i lang="en">buy, bought ; have, had ; make, made ; meet, met ; lose, lost ; win, won ; find, found ; tell, told ; leave, left</i>.</li><li><b>Irréguliers, participe différent</b> (souvent en <i lang="en">-n</i>) : <i lang="en">be, was, been ; eat, ate, eaten ; see, saw, seen ; take, took, taken ; write, wrote, written ; break, broke, broken ; fly, flew, flown ; drive, drove, driven ; do, did, done ; go, went, gone ; swim, swam, swum ; drink, drank, drunk</i>.</li><li><b>Participe = base</b> : <i lang="en">come, came, come ; run, ran, run</i>.</li></ul></div>
<div class="idea"><p>Apprends toujours les trois formes ensemble, à voix haute, comme une petite chanson : <i lang="en">eat, ate, eaten</i>. Le rythme aide la mémoire.</p></div>
<div class="ex"><p><i lang="en">I’ve <b>flown</b> in a helicopter. Have you ever <b>driven</b> a lorry? She’s <b>written</b> two books.</i></p></div>
<div class="warn"><p><b>been</b> ou <b>gone</b>&nbsp;? <i lang="en">She has <b>gone</b> to Paris</i> : elle est partie, elle est là-bas maintenant. <i lang="en">She has <b>been</b> to Paris</i> : elle y est allée et elle est revenue. Pour une expérience, c’est <i lang="en">been</i>. Et jamais <i lang="en"><s>I have went</s></i>.</p></div>`,
  audio:'Eat, ate, eaten. See, saw, seen. Fly, flew, flown. Write, wrote, written. Go, went, gone. Be, was, been.'},

 {kind:'Pratique', h:'À toi : le bon participe',
  p:'Complète avec le participe passé du verbe <i lang="en">eat</i>. <b>Question :</b> <i lang="en">Have you ever ___ snails?</i> Écris le mot manquant.', lab:'Le participe', txt:['eaten'],
  why:'<i lang="en">eat, ate, eaten</i> : <i lang="en">Have you ever eaten snails?</i> <i lang="en">ate</i> est le prétérit, il ne va pas après <i lang="en">have</i>.'},

 {kind:'Méthode', h:'Parler de ses expériences : Have you ever…? I’ve never…',
  p:`<p><b>Quand :</b> pour demander à quelqu’un s’il a <b>déjà</b> fait quelque chose dans sa vie, ou pour dire ce que tu as fait ou <b>jamais</b> fait, sans dire quand. <b>Pourquoi ça marche :</b> <i lang="en">ever</i> (déjà, à un moment quelconque) et <i lang="en">never</i> (jamais) se glissent entre <i lang="en">have</i> et le participe. <b>Comment :</b></p>
<ul><li>Question : <b>Have / Has + sujet + ever + participe ?</b> <i lang="en">Have you ever eaten snails?</i></li><li>Réponses : <i lang="en">Yes, I have. / No, I haven’t. / No, never.</i></li><li>Combien de fois : <i lang="en">once, twice, three times</i>, en fin de phrase. <i lang="en">I’ve been there twice.</i></li><li>Jamais : <b>have + never + participe</b>. <i lang="en">I’ve never eaten snails.</i> <i lang="en">Never</i> est déjà négatif : pas de <i lang="en">not</i> en plus.</li></ul>`,
  demo:{enonce:'Demande à Lucas s’il a déjà vu des aurores boréales (<i lang="en">the Northern Lights</i>). Il répond que non. Dis-lui que toi, tu les as vues deux fois.',
   etapes:[{f:'<i lang="en"><b>Have</b> you <b>ever seen</b> the Northern Lights?</i>',w:'<i lang="en">Have</i> passe devant le sujet, <i lang="en">ever</i> se place avant le participe <i lang="en">seen</i> (<i lang="en">see, saw, seen</i>).'},
    {f:'Lucas : <i lang="en">No, I haven’t.</i> (ou <i lang="en">No, never.</i>)',w:'Réponse courte avec l’auxiliaire de la question.'},
    {f:'Toi : <i lang="en">I’ve seen them <b>twice</b>.</i>',w:'Affirmation au present perfect ; le nombre de fois va à la fin.'}],
   conclusion:'<i lang="en">Have you ever seen the Northern Lights? – No, I haven’t. – I’ve seen them twice.</i>'}},

 {kind:'Pratique', h:'À toi : poser la question',
  p:'Tu prépares un petit questionnaire pour un collègue. <b>Question :</b> écris en anglais « As-tu déjà conduit un camion ? »', lab:'Ta question', txt:['Have you ever driven a lorry?','Have you ever driven a truck?'], show:'Have you ever driven a lorry?',
  why:'<i lang="en">Have you ever driven a lorry?</i> (<i lang="en">lorry</i> en britannique, <i lang="en">truck</i> en américain). <i lang="en">drive, drove, driven</i>.'},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:'Touche les mots dans le bon ordre. <b>Question :</b> comment demande-t-on « Ton frère a-t-il déjà vécu à l’étranger ? »',
  ordre:['Has','your','brother','ever','lived','abroad?'],
  why:'<i lang="en">Has your brother ever lived abroad?</i> <i lang="en">Has</i> (3e personne) en tête, puis le sujet, <i lang="en">ever</i>, le participe. <i lang="en">Abroad</i> sans préposition.'},

 {kind:'Pratique', h:'À toi : à la 3e personne',
  p:'Attention à l’auxiliaire. <b>Question :</b> écris en anglais « Mon père n’a jamais pris l’avion. »', lab:'Ta phrase',
  txt:X(['My father','My dad'],[' has never ',' hasn’t ever ','’s never '],['flown','been on a plane','travelled by plane','traveled by plane','taken a plane'],['','.']),
  show:'My father has never flown.',
  why:'<i lang="en">My father has never flown</i> (ou <i lang="en">has never been on a plane</i>). À la 3e personne : <b>has</b>. <i lang="en">fly, flew, flown</i>.'},

 {kind:'Grammaire', h:'Present perfect ou prétérit ?',
  p:`<p>En français, « J’ai vu ce film » sert dans tous les cas. L’anglais, lui, choisit entre deux temps, selon une seule question : <b>est-ce qu’on dit quand</b>&nbsp;?</p>
<div class="def"><ul><li><b>Present perfect</b> : une expérience dans la vie, à un moment <b>non précisé</b>, jusqu’à aujourd’hui. Avec <i lang="en">ever, never, once, twice, three times</i>. <i lang="en">I’ve been to Japan.</i></li><li><b>Prétérit</b> : un moment <b>précis et terminé</b>. Avec <i lang="en">yesterday, last year, in 2019, two years ago, when I was ten</i>, et dans les questions <i lang="en">When…? What time…?</i> <i lang="en">I went to Japan in 2022.</i></li></ul></div>
<div class="idea"><p>Le present perfect regarde ta vie entière, jusqu’à maintenant, sans s’arrêter sur une date. Dès que tu places l’action sur le calendrier, tu passes au prétérit. Une conversation commence donc souvent au present perfect, puis continue au prétérit pour les détails, exactement comme Ella et Raj.</p></div>
<div class="ex"><p><i lang="en">Have you ever broken your arm? – Yes, I broke it when I was ten.</i><br><i lang="en">I’ve met a lot of famous people. I met Adele at an airport last year.</i></p></div>
<div class="warn"><p>Le calque du passé composé est l’erreur la plus fréquente des francophones : <i lang="en"><s>I have seen him yesterday</s></i> → <b>I saw him yesterday</b>. <i lang="en"><s>When have you arrived?</s></i> → <b>When did you arrive?</b> Un mot de temps fini interdit le present perfect.</p></div>`,
  audio:[['Ella','Have you ever broken your arm?'],['Raj','Yes, I broke it when I was ten. I fell off my bike.']]},

 {kind:'Méthode', h:'De l’expérience aux détails : du present perfect au prétérit',
  p:`<p><b>Quand :</b> dans une conversation sur les expériences, dès que l’autre répond « oui » et que tu veux en savoir plus. <b>Pourquoi ça marche :</b> la première question porte sur la vie entière (present perfect) ; les détails portent sur <b>un</b> moment précis, terminé (prétérit). <b>Comment :</b></p>
<ol><li>Question d’expérience : <i lang="en">Have you ever…?</i></li><li>Réponse courte : <i lang="en">Yes, I have.</i></li><li>Question de détail au prétérit, avec <b>did</b> : <i lang="en">When / Where / Who with… did you…?</i></li><li>Réponse au prétérit, avec un repère de temps.</li></ol>`,
  demo:{enonce:'Demande à une amie si elle est déjà allée en Écosse, puis quand elle y est allée. Elle y est allée l’été dernier et a trouvé ça magnifique.',
   etapes:[{f:'<i lang="en">Have you ever been to Scotland?</i>',w:'Expérience sans date : present perfect, avec <i lang="en">been to</i>.'},
    {f:'<i lang="en">Yes, I have.</i>',w:'Réponse courte avec <i lang="en">have</i>.'},
    {f:'<i lang="en">When <b>did</b> you <b>go</b>?</i>',w:'On demande un moment précis : prétérit, question avec <i lang="en">did</i> + base verbale. Jamais <i lang="en">When have you been?</i>'},
    {f:'<i lang="en">I <b>went</b> last summer. It <b>was</b> beautiful.</i>',w:'<i lang="en">last summer</i> fixe le moment : prétérit.'}],
   conclusion:'<i lang="en">Have you ever been to Scotland? – Yes, I have. – When did you go? – I went last summer. It was beautiful.</i>'}},

 {kind:'Pratique', h:'À toi : un moment précis',
  p:'Le moment est donné : choisis le bon temps. <b>Question :</b> écris en anglais « Je l’ai rencontré l’année dernière. »', lab:'Ta phrase', txt:['I met him last year.','Last year I met him.','Last year, I met him.'], show:'I met him last year.',
  why:'<i lang="en">last year</i> est un moment précis et terminé : prétérit, <i lang="en">I met him last year</i>. <i lang="en">I have met him last year</i> est faux.'},

 {kind:'Pratique', h:'Trouve l’erreur',
  p:'<b>Question :</b> laquelle de ces phrases contient une erreur de temps&nbsp;?',
  opts:['I’ve been to Berlin twice.','She went to Madrid in 2021.','I have seen this film last week.','Have you ever tried snails?'], ans:2,
  why:'<i lang="en">last week</i> est un moment précis : il faut le prétérit, <i lang="en">I saw this film last week</i>. Les autres phrases sont correctes.'},

 {kind:'Prononciation', h:'Les formes faibles de have',
  p:`<p>Si tu prononces chaque <i lang="en">have</i> en entier, ton anglais sonne lent et haché. Les anglophones l’<b>affaiblissent</b>, et il faut l’entendre pour comprendre.</p>
<div class="def"><ul><li>En question, <i lang="en">have</i> et <i lang="en">has</i> sont rapides et non accentués : <i lang="en">Have you ever…?</i> sonne « heuv-yeu-<b>è</b>-veu ».</li><li>Après un pronom, il ne reste qu’un son : <i lang="en">I’ve, we’ve, they’ve</i> = « v » ; <i lang="en">she’s, he’s</i> = « z ».</li><li>Dans une réponse courte, au contraire, <i lang="en">have</i> est <b>fort</b>, avec un vrai « a » : <i lang="en">Yes, I <b>have</b>.</i></li></ul></div>
<div class="warn"><p>Ne laisse pas tomber le petit « v » : <i lang="en">I’ve been</i>, pas « I been ». Et accentue le participe, qui porte le sens : <i lang="en">I’ve <b>ne</b>ver <b>been</b> to <b>Spain</b></i>.</p></div>`,
  audio:'Have you ever been to London? Yes, I have. I’ve been there twice. She’s never flown.'},

 {kind:'Oral', h:'Répète : une question d’expérience',
  p:'Écoute, puis dis les deux phrases à voix haute. Fais la forme faible dans la question, et la forme forte dans la réponse : <i lang="en">Have you <b>e</b>ver been to <b>Lon</b>don? Yes, I <b>have</b>.</i>',
  dire:'Have you ever been to London? Yes, I have.'},

 {kind:'Lecture', h:'Lire : ce que je n’avais jamais fait',
  p:`<p>Lis ce billet, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Blog : Things I’ve never done"><p lang="en">I’m 34 and I’ve done a lot of things in my life. I’ve lived in three countries, I’ve learnt two languages and I’ve run a marathon (slowly!). But there are some things I’ve never done. I’ve never been on a plane for more than four hours, so I’ve never visited Asia or America. I’ve never ridden a horse, because I’m scared of them, and I’ve never seen really high mountains. Last year, I decided to change that. I made a list, and in January I went to Switzerland. I took a train up a mountain and I saw the Alps for the first time. It was amazing! Next on the list: a long flight to Japan. Have you got a list like this?</p></div>
<p><b>Question :</b> qu’a fait l’auteur en janvier&nbsp;?</p>`,
  audio:'I’m 34 and I’ve done a lot of things in my life. I’ve lived in three countries, I’ve learnt two languages and I’ve run a marathon (slowly!). But there are some things I’ve never done. I’ve never been on a plane for more than four hours, so I’ve never visited Asia or America. I’ve never ridden a horse, because I’m scared of them, and I’ve never seen really high mountains. Last year, I decided to change that. I made a list, and in January I went to Switzerland. I took a train up a mountain and I saw the Alps for the first time. It was amazing! Next on the list: a long flight to Japan. Have you got a list like this?',
  opts:['Il a pris un long vol pour le Japon.','Il a fait du cheval pour la première fois.','Il est allé en Suisse et a vu les Alpes pour la première fois.','Il a couru un marathon en montagne.'], ans:2,
  why:'<i lang="en">In January I went to Switzerland… I saw the Alps for the first time.</i> Remarque les temps : expériences de la vie au present perfect (<i lang="en">I’ve lived, I’ve never ridden</i>), puis le récit daté au prétérit (<i lang="en">in January I went</i>). Le Japon, c’est la prochaine étape.'},

 {kind:'Dictée', h:'Dictée : l’Écosse',
  p:'Écoute et écris exactement les deux phrases. Réécoute autant que tu veux.',
  dictee:'Have you ever been to Scotland? Yes, I went there last summer.',
  why:'Question d’expérience au present perfect (<i lang="en">Have you ever been</i>), puis détail daté au prétérit (<i lang="en">I went there last summer</i>).'},

 {kind:'Oral', h:'Trois expériences',
  p:`<p>Parle pendant 40 secondes à 1 minute. Raconte deux choses que tu as faites dans ta vie (avec <i lang="en">I’ve…</i>), puis donne des détails sur l’une d’elles au prétérit (quand, où, avec qui). Termine par une chose que tu n’as jamais faite. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'I’ve been to a lot of countries, and I’ve tried some strange food. For example, I’ve eaten frogs’ legs once. I ate them in a restaurant in Lyon three years ago, with my cousins. They were OK, a bit like chicken! I’ve also run a half marathon. But I’ve never flown in a helicopter. I’d love to try one day.',
   criteres:['J’ai parlé d’au moins deux expériences avec I’ve + participe','J’ai donné des détails au prétérit, avec un repère de temps (ago, last…, in 2020)','J’ai dit une chose que je n’ai jamais faite avec never','J’ai utilisé once, twice ou … times','J’ai prononcé le v de I’ve']}},

 {kind:'Écriture', h:'Écris : la meilleure expérience de ta vie',
  p:'Sur un forum anglophone, le sujet du jour est <i lang="en">The best experience of my life</i>. Écris ta contribution (au moins 50 mots) : commence par une ou deux expériences au present perfect, raconte la meilleure en détail au prétérit, avec un repère de temps, et pose une question aux autres avec <i lang="en">Have you ever…?</i>',
  ecrire:{min:50, modele:'I’ve done some crazy things in my life, but the best experience was in Norway. I’ve seen the Northern Lights once. I went to Tromsø with my sister three years ago. We waited outside for hours in the cold, and then the sky turned green! It was amazing. I’ve never been so happy and so cold at the same time. Have you ever seen them?',
   criteres:[{t:'J’ai utilisé le present perfect (have, has, ’ve)', re:'\\b(have|has)\\b|[\'’]ve\\b'},{t:'J’ai raconté au prétérit avec un repère de temps (ago, last, yesterday, in 2020…)', re:'\\b(ago|last|yesterday|when i was|in (19|20)\\d\\d)\\b'},{t:'J’ai utilisé ever ou never', re:'\\b(ever|never)\\b'},{t:'J’ai posé une question avec Have you ever…?', re:'have you ever'},'Je n’ai pas mis de present perfect avec un moment précis']}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>Present perfect</b> = <b>have / has + participe passé</b>. <i lang="en">I’ve seen, she’s seen. I haven’t seen. Have you seen…? – Yes, I have. / No, I haven’t.</i></li><li>Participes : réguliers en <i lang="en">-ed</i> ; irréguliers à apprendre par trois (<i lang="en">eat, ate, eaten ; see, saw, seen ; go, went, gone ; be, was, been ; fly, flew, flown</i>).</li><li>Expérience : <i lang="en">Have you ever…? I’ve never… once, twice, three times.</i> Pas de <i lang="en">not</i> avec <i lang="en">never</i>.</li><li><b>been to</b> = allé et revenu (expérience) ; <b>gone to</b> = parti, là-bas maintenant.</li><li>Moment précis (<i lang="en">yesterday, last…, … ago, in 2019, When…?</i>) : <b>prétérit</b>. <i lang="en">I saw him yesterday</i>, jamais <i lang="en">I have seen him yesterday</i>.</li><li>Conversation : present perfect pour l’expérience, puis prétérit pour les détails (<i lang="en">When did you go?</i>). À l’oral : formes faibles <i lang="en">I’ve, she’s</i>, forme forte dans <i lang="en">Yes, I have</i>.</li></ul></div>`},

 {kind:'Mission', h:'Entretien pour une colonie au Canada',
  p:'Nina passe un entretien pour travailler dans une colonie de vacances. Écoute l’entretien, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Interviewer','So, Nina, have you ever worked with children?'],['Nina','Yes, I have. I worked at a summer camp in Wales two years ago.'],['Interviewer','And have you ever taught a sport?'],['Nina','Yes, I’ve taught swimming. I gave lessons at my local pool last year.'],['Interviewer','Great. Have you ever been to Canada?'],['Nina','No, I haven’t. I’ve never travelled outside Europe.'],['Interviewer','Well, our camp is near Toronto. Have you got a passport?'],['Nina','Yes, of course.']], cache:true,
  parts:[
   {q:'a) Où et quand Nina a-t-elle travaillé avec des enfants&nbsp;?', opts:['Dans une piscine, l’année dernière.','Dans une colonie au pays de Galles, il y a deux ans.','Dans une école au Canada, il y a deux ans.','Dans une colonie en Écosse, l’année dernière.'], ans:1, hint:'Écoute sa première réponse : un lieu et <i lang="en">… ago</i>.', why:'<i lang="en">I worked at a summer camp in Wales two years ago.</i> La piscine, c’est pour les cours de natation, l’an dernier.'},
   {q:'b) Écris la deuxième question de la recruteuse : « As-tu déjà enseigné un sport ? »', lab:'Sa question', txt:['Have you ever taught a sport?','And have you ever taught a sport?'], show:'Have you ever taught a sport?', hint:'<i lang="en">teach, taught, taught</i>. Pense à <i lang="en">ever</i>.', why:'<i lang="en">Have you ever taught a sport?</i> Le participe de <i lang="en">teach</i> est <i lang="en">taught</i>, comme son prétérit.'},
   {q:'c) Pourquoi Nina dit-elle <i lang="en">I gave lessons</i> et non <i lang="en">I’ve given lessons</i>&nbsp;?', opts:['Parce que give est un verbe irrégulier.','Parce qu’elle précise le moment : last year.','Parce qu’elle parle d’une expérience sans date.','Parce que la question était au prétérit.'], ans:1, hint:'Cherche le repère de temps à la fin de sa phrase.', why:'<i lang="en">last year</i> est un moment précis et terminé : prétérit. La question, elle, était au present perfect.'},
   {q:'d) <i lang="en">Have you ever been to Canada?</i> Écris la réponse courte de Nina.', lab:'Sa réponse', txt:['No, I haven’t.','No, never.','No, I have never been to Canada.','No, I haven’t been to Canada.','No, I’ve never been there.','No, I have not, never.'], show:'No, I haven’t.', hint:'Réponse courte négative avec l’auxiliaire de la question.', why:'<i lang="en">No, I haven’t.</i> On reprend <i lang="en">have</i>, à la forme négative.'},
   {q:'e) Tu es Nina. Ajoute : « Je ne suis jamais allée en Amérique du Nord. »', lab:'Ta phrase', txt:['I have never been to North America.','I’ve never been to North America before.'], show:'I’ve never been to North America.', hint:'<i lang="en">have never been to</i> + lieu.', why:'<i lang="en">I’ve never been to North America.</i> Expérience de vie, sans date : present perfect avec <i lang="en">never</i>.'}],
  sol:'<p lang="en">Interviewer: So, Nina, have you ever worked with children? – Nina: Yes, I have. I worked at a summer camp in Wales two years ago. – And have you ever taught a sport? – Yes, I’ve taught swimming. I gave lessons at my local pool last year. – Great. Have you ever been to Canada? – No, I haven’t. I’ve never travelled outside Europe. – Well, our camp is near Toronto. Have you got a passport? – Yes, of course.</p><p>Chaque échange suit le même schéma : question d’expérience au present perfect, réponse courte, puis détails datés au prétérit (<i lang="en">two years ago, last year</i>). Nina n’est jamais sortie d’Europe : <i lang="en">I’ve never travelled outside Europe</i>.</p>'},

 {kind:'Mission', h:'Un message d’Islande',
  p:`<p>Ton amie Grace t’écrit au retour de son voyage. Lis son message, puis réponds-lui étape par étape.</p>
<div class="blk" data-t="Message de Grace"><p lang="en">Hi Jo, I’m back from Iceland! It was my first time in a really cold country. I’ve visited a lot of beautiful places in my life, but nothing like this. On the second day, we swam in a hot lake outside, at minus five degrees! And on our last night, we saw the Northern Lights. Have you ever seen them? They’re incredible. I bought you a little present: a woolly hat. I know you’ve never worn a hat in your life, but you’ll need it next winter! Love, Grace</p></div>`,
  parts:[
   {q:'a) Qu’a fait Grace le deuxième jour&nbsp;?', opts:['Elle a vu des aurores boréales.','Elle a nagé dehors dans un lac chaud, par moins cinq degrés.','Elle a acheté un bonnet.','Elle a skié sur un glacier.'], ans:1, hint:'Cherche <i lang="en">On the second day</i>.', why:'<i lang="en">On the second day, we swam in a hot lake outside, at minus five degrees!</i> Les aurores, c’était le dernier soir.'},
   {q:'b) Pourquoi Grace écrit-elle <i lang="en">I’ve visited a lot of beautiful places</i> mais <i lang="en">we swam in a hot lake</i>&nbsp;?', opts:['La première phrase parle de toute sa vie sans date ; la seconde d’un moment précis du voyage.','Visit est régulier et swim est irrégulier.','La première phrase est négative.','Les deux temps sont interchangeables.'], ans:0, hint:'Laquelle des deux phrases a un repère de temps&nbsp;?', why:'<i lang="en">in my life</i> = toute la vie jusqu’à maintenant : present perfect. <i lang="en">On the second day</i> = moment précis : prétérit.'},
   {q:'c) Réponds à sa question : « Non, je ne les ai jamais vues. »', lab:'Ta réponse', txt:X('No, ',['','I haven’t. ','I haven’t, ','never. '],'I’ve never seen them',['','.']).concat(['No, I haven’t.','No, never.']), show:'No, I’ve never seen them.', hint:'<i lang="en">see, saw, seen</i>, avec <i lang="en">never</i>.', why:'<i lang="en">No, I’ve never seen them.</i> (ou <i lang="en">No, I haven’t.</i>) <i lang="en">Never</i> suffit pour la négation.'},
   {q:'d) Demande-lui : « Quand es-tu rentrée ? »', lab:'Ta question', txt:X('When did you ',['come back','get back','return','come home','get home','arrive home','arrive back','come back from Iceland','get back from Iceland','return from Iceland'],['?','']), show:'When did you get back?', hint:'Un moment précis : prétérit, question avec <i lang="en">did</i>.', why:'<i lang="en">When did you get back?</i> (ou <i lang="en">come back</i>). Avec <i lang="en">When</i>, jamais de present perfect.'},
   {q:'e) Raconte : « Je suis allé(e) en Norvège une fois, en 2021. »', lab:'Ta phrase', txt:['I went to Norway once, in 2021.','I went to Norway in 2021.','In 2021, I went to Norway.','In 2021 I went to Norway.','I went to Norway once in 2021.','Once, in 2021, I went to Norway.'], show:'I went to Norway once, in 2021.', hint:'L’année est donnée : est-ce encore une expérience sans date&nbsp;?', why:'<i lang="en">in 2021</i> fixe le moment : prétérit, <i lang="en">I went to Norway in 2021</i>. Sans la date, on dirait <i lang="en">I’ve been to Norway once</i>.'}],
  sol:'<p>Grace a nagé dans un lac chaud par −5 °C le deuxième jour, et vu les aurores boréales le dernier soir. Elle emploie le present perfect pour sa vie entière (<i lang="en">I’ve visited… in my life</i>, <i lang="en">you’ve never worn</i>) et le prétérit pour les moments du voyage. Une réponse possible :</p><p lang="en">No, I’ve never seen them. When did you get back? I went to Norway once, in 2021.</p>'},
]},
{subj:'en', sem:'a2', id:'en-a2-health', o:6, h:'Health', p:'Dire où on a mal, comprendre le médecin et le pharmacien, conseiller avec <i lang="en">should</i> et parler d’obligation avec <i lang="en">have to</i> et <i lang="en">don’t have to</i>.', steps:[
 {kind:'Écoute', h:'Chez le médecin',
  p:`<p>À la fin de cette unité, tu sauras décrire tes symptômes, comprendre ce que te dit un médecin ou un pharmacien, donner des conseils et dire ce qui est obligatoire ou non.</p>
<p>Sophie est malade et consulte son médecin. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> que lui conseille le médecin&nbsp;?</p>`,
  audio:[['Doctor','Good morning. Come in and sit down. What’s the matter?'],['Sophie','I’ve got a terrible headache and a sore throat. And I feel really tired.'],['Doctor','When did it start?'],['Sophie','On Monday. I think I’ve got a temperature too.'],['Doctor','Let me check. Yes, thirty-eight point five. It’s probably flu. You should stay in bed for a few days and drink lots of water.'],['Sophie','Do I have to take antibiotics?'],['Doctor','No, you don’t have to take antibiotics. They don’t work for flu. You can take paracetamol for the headache. But you shouldn’t go to work this week.'],['Sophie','OK. Do I have to come back?'],['Doctor','Only if you’re not better in a week.']], cache:true,
  opts:['Prendre des antibiotiques et revenir demain.','Aller travailler, mais se coucher tôt.','Rester au lit quelques jours et boire beaucoup d’eau.','Aller à l’hôpital tout de suite.'], ans:2,
  why:'<i lang="en">You should stay in bed for a few days and drink lots of water.</i> Pas d’antibiotiques (<i lang="en">you don’t have to</i>), pas de travail cette semaine (<i lang="en">you shouldn’t go to work</i>).'},

 {kind:'Vocabulaire', h:'Le corps',
  p:`<p>Les parties du corps dont on parle le plus chez le médecin. Touche une ligne pour l’entendre, puis répète-la en montrant la partie du corps : le geste aide la mémoire.</p>`,
  mots:[['head','tête','I hit my head on the door.'],['throat','gorge','My throat is very dry.'],['back','dos','I sit all day and my back hurts.'],['stomach','ventre, estomac','I ate too much. My stomach hurts.'],['chest','poitrine','He’s got a pain in his chest.'],['shoulder','épaule','I can’t lift my arm above my shoulder.'],['knee','genou','She fell and hurt her knee.'],['ankle','cheville','He broke his ankle skiing.'],['tooth / teeth','dent / dents','Brush your teeth twice a day.'],['foot / feet','pied / pieds','My feet hurt after the walk.'],['ear','oreille','My ear hurts when I swim.']],
  note:'Pluriels irréguliers : <i lang="en">one tooth, two teeth ; one foot, two feet</i>. Et en anglais, on parle de son corps avec le possessif : <i lang="en">I hurt <b>my</b> knee</i>, pas « the knee ».'},

 {kind:'Vocabulaire', h:'Symptômes et rendez-vous',
  p:`<p>Les expressions pour dire ce qui ne va pas, et pour se débrouiller chez le médecin ou à la pharmacie.</p>`,
  mots:[['What’s the matter?','Qu’est-ce qui ne va pas ?','You look pale. What’s the matter?'],['I don’t feel well','Je ne me sens pas bien','I don’t feel well. I’m going home.'],['a headache','un mal de tête','I’ve got a headache.'],['a sore throat','un mal de gorge','I’ve got a sore throat. I can’t talk.'],['a temperature','de la fièvre','He’s got a temperature of thirty-nine.'],['a cold','un rhume','Don’t kiss me, I’ve got a cold.'],['(the) flu','la grippe','She’s in bed with flu.'],['a cough','une toux','That’s a bad cough.'],['I feel sick','J’ai mal au cœur, j’ai la nausée','I always feel sick on boats.'],['It hurts','Ça fait mal','Ouch! It hurts!'],['to make an appointment','prendre rendez-vous','I need to make an appointment with the doctor.'],['to take medicine','prendre des médicaments','Take this medicine three times a day.'],['Get well soon!','Remets-toi vite !','Sorry you’re ill. Get well soon!'],['the chemist’s','la pharmacie (britannique)','You can buy it at the chemist’s.']],
  note:'En Grande-Bretagne, le médecin de famille s’appelle <i lang="en">a GP</i> et son cabinet <i lang="en">the surgery</i>. Les Américains disent <i lang="en">pharmacy</i> ou <i lang="en">drugstore</i> pour la pharmacie.'},

 {kind:'Grammaire', h:'Avoir mal : dire ses symptômes',
  p:`<p>Le français dit « avoir mal à… » pour tout le corps. L’anglais utilise trois tournures différentes, et la traduction mot à mot (« I have bad at the head ») ne marche jamais.</p>
<div class="def"><ol><li><b>Les mots en -ache</b>, avec <b>I’ve got</b> ou <b>I have</b> : <i lang="en">a headache</i> (tête), <i lang="en">toothache</i> (dents), <i lang="en">stomach ache</i> (ventre), <i lang="en">backache</i> (dos), <i lang="en">earache</i> (oreille).</li><li><b>sore</b> (douloureux, irrité) + partie du corps : <i lang="en">a sore throat, sore eyes, sore feet</i>.</li><li><b>hurt</b> (faire mal), avec la partie du corps comme sujet : <i lang="en">My knee hurts. My feet hurt. It hurts here.</i> Pour une blessure : <i lang="en">I’ve hurt my back</i> (je me suis fait mal au dos).</li></ol><p>Et aussi : <i lang="en">I’ve got a temperature, a cold, a cough, flu. I feel sick.</i></p></div>
<div class="idea"><p>Avec <i lang="en">hurt</i>, c’est la partie du corps qui « fait mal » : <i lang="en">My head hurts</i>, mot à mot « ma tête fait mal ». Le verbe s’accorde donc avec elle : <i lang="en">my knee hurt<b>s</b>, my feet hurt</i>.</p></div>
<div class="ex"><p><i lang="en">I’ve got a headache and a sore throat.</i> = J’ai mal à la tête et à la gorge.<br><i lang="en">My back hurts.</i> = J’ai mal au dos.<br><i lang="en">I broke my leg last year.</i> = Je me suis cassé la jambe l’an dernier.</p></div>
<div class="warn"><p>Faux amis : <i lang="en">I’m cold</i> = j’ai froid, mais <i lang="en">I’ve got a cold</i> = j’ai un rhume. En britannique, <i lang="en">I’m ill</i> = je suis malade, et <i lang="en">I feel sick</i> = j’ai la nausée ; en américain, <i lang="en">I’m sick</i> veut dire « je suis malade ».</p></div>`,
  audio:'I’ve got a headache and a sore throat. My back hurts. I broke my leg last year.'},

 {kind:'Pratique', h:'À toi : tes symptômes',
  p:'Tu appelles ton médecin. <b>Question :</b> écris en anglais « J’ai mal à la tête et mal à la gorge. »', lab:'Ta phrase',
  txt:[...X(['I have got','I have'],' a headache and a sore throat',['','.']),...X(['My head and my throat hurt','My head and throat hurt','My head hurts and my throat hurts','My head hurts and my throat is sore','My head hurts and I have a sore throat','My head hurts and I have got a sore throat'],['','.'])],
  show:'I’ve got a headache and a sore throat.',
  why:'<i lang="en">I’ve got a headache and a sore throat.</i> (ou <i lang="en">I have…</i>) Les mots en <i lang="en">-ache</i> et <i lang="en">sore</i> remplacent « avoir mal à ».'},

 {kind:'Grammaire', h:'Should et shouldn’t : donner un conseil',
  p:`<p>Le médecin dit à Sophie <i lang="en">You should stay in bed</i> et <i lang="en">You shouldn’t go to work</i>. Il ne donne pas un ordre : il <b>conseille</b>.</p>
<div class="def"><p><b>should + base verbale</b> = « devrais, devrait » : c’est une bonne idée.</p><ul><li>Même forme à toutes les personnes : <i lang="en">I should, she should, they should</i>.</li><li>Négation : <b>should not</b> → <b>shouldn’t</b> = ce n’est pas une bonne idée.</li><li>Question : <b>Should I…?</b> <i lang="en">What should I do?</i></li></ul></div>
<div class="idea"><p>Comme <i lang="en">can</i> et <i lang="en">will</i>, <i lang="en">should</i> est un <b>modal</b> : pas de <i lang="en">-s</i>, pas de <i lang="en">to</i>, pas de <i lang="en">do</i>. Pour adoucir un conseil, on ajoute <b>I think</b> ou <b>maybe</b> : <i lang="en">I think you should rest. Maybe you should call the doctor.</i> Au négatif, la négation va sur <i lang="en">think</i>, comme avec <i lang="en">will</i> : <i lang="en">I don’t think you should go out.</i></p></div>
<div class="ex"><p><i lang="en">You should see a doctor.</i> = Tu devrais voir un médecin.<br><i lang="en">He shouldn’t eat so much sugar.</i><br><i lang="en">What should I do? – You should rest.</i></p></div>
<div class="warn"><p>Les pièges : <i lang="en">You should <s>to</s> rest</i>, <i lang="en">She <s>shoulds</s></i>, <i lang="en">You <s>don’t should</s></i>. Et <i lang="en">should</i> traduit « tu devrais » (conseil), pas « tu dois » (obligation) : pour l’obligation, on verra <i lang="en">have to</i>.</p></div>`,
  audio:'You should see a doctor. He shouldn’t eat so much sugar. What should I do? You should rest.'},

 {kind:'Méthode', h:'Donner un conseil : should, shouldn’t, I think you should',
  p:`<p><b>Quand :</b> quelqu’un te raconte un problème, de santé ou autre, et tu veux l’aider. <b>Pourquoi ça marche :</b> <i lang="en">should</i> dit ce qui est une bonne idée selon toi, sans donner d’ordre ; <i lang="en">I think</i> le rend encore plus aimable. <b>Comment :</b></p>
<ol><li>Montre que tu as compris : <i lang="en">Oh no! / I’m sorry to hear that.</i></li><li>Ce qu’il faut faire : <b>You should + verbe</b>.</li><li>Ce qu’il faut éviter : <b>You shouldn’t + verbe</b>.</li><li>Pour adoucir : <b>I think you should…</b> ; <b>I don’t think you should…</b></li></ol>`,
  demo:{enonce:'Ton collègue te dit : <i lang="en">My back hurts. I sit at my computer all day.</i> Donne-lui trois conseils.',
   etapes:[{f:'<i lang="en">Oh no, I’m sorry to hear that.</i>',w:'On réagit d’abord au problème.'},
    {f:'<i lang="en">You <b>should</b> take a short walk every hour.</i>',w:'Un conseil positif : <i lang="en">should</i> + base verbale, sans <i lang="en">to</i>.'},
    {f:'<i lang="en">You <b>shouldn’t</b> carry heavy bags.</i>',w:'Ce qu’il vaut mieux éviter : <i lang="en">shouldn’t</i>.'},
    {f:'<i lang="en"><b>I don’t think</b> you should play tennis this weekend. <b>I think</b> you should see a doctor.</i>',w:'Pour adoucir, <i lang="en">I think</i> ; au négatif, la négation se met sur <i lang="en">think</i>.'}],
   conclusion:'<i lang="en">You should take a short walk every hour. You shouldn’t carry heavy bags. I think you should see a doctor.</i>'}},

 {kind:'Pratique', h:'À toi : un conseil',
  p:'Ton ami a de la fièvre. <b>Question :</b> écris en anglais « Tu devrais boire beaucoup d’eau. »', lab:'Ta phrase',
  txt:X(['You should drink ','I think you should drink '],['lots of','a lot of','plenty of','loads of'],' water',['','.']),
  show:'You should drink lots of water.',
  why:'<i lang="en">You should drink lots of water.</i> (<i lang="en">a lot of</i> ou <i lang="en">plenty of</i> conviennent aussi). Pas de <i lang="en">to</i> après <i lang="en">should</i>.'},

 {kind:'Pratique', h:'À toi : ce qu’il faut éviter',
  p:'Ta sœur s’est fait mal au dos. <b>Question :</b> écris en anglais « Tu ne devrais pas porter de choses lourdes. »', lab:'Ta phrase',
  txt:X('You shouldn’t ',['carry','lift'],' ',['heavy things','heavy bags','heavy objects','anything heavy'],['','.']),
  show:'You shouldn’t carry heavy things.',
  why:'<i lang="en">You shouldn’t carry heavy things.</i> <i lang="en">shouldn’t</i> + base verbale : ce n’est pas une bonne idée.'},

 {kind:'Grammaire', h:'Have to et don’t have to : obligation ou pas',
  p:`<p>Sophie demande <i lang="en">Do I have to take antibiotics?</i> Le médecin répond <i lang="en">No, you don’t have to.</i> Il ne les lui interdit pas : il dit qu’elle <b>n’est pas obligée</b>. Cette nuance est essentielle.</p>
<div class="def"><p><b>have to + base verbale</b> = devoir, être obligé de (une règle, un médecin, la situation).</p><ul><li><i lang="en">I, you, we, they</i> <b>have to</b> ; <i lang="en">he, she, it</i> <b>has to</b>.</li><li>Question : <b>Do I have to…? Does she have to…?</b></li><li>Négation : <b>don’t / doesn’t have to</b> = ne pas être obligé de, ce n’est pas nécessaire.</li><li>Passé : <b>had to</b>, <b>didn’t have to</b>.</li></ul></div>
<div class="idea"><p>Contrairement à <i lang="en">should</i>, <i lang="en">have to</i> se comporte comme un verbe ordinaire : il prend un <i lang="en">-s</i> (<i lang="en">has to</i>) et a besoin de <i lang="en">do, does, did</i>. Et le sens diffère : <i lang="en">should</i> = c’est une bonne idée ; <i lang="en">have to</i> = on n’a pas le choix.</p></div>
<div class="ex"><p><i lang="en">She has to take these tablets twice a day.</i><br><i lang="en">You don’t have to come back.</i> = Pas besoin de revenir.<br><i lang="en">Did you have to wait long? – Yes, I had to wait an hour.</i></p></div>
<div class="warn"><p>Le grand piège : <i lang="en">don’t have to</i> ne veut <b>pas</b> dire « il ne faut pas ». <i lang="en">You don’t have to smoke here</i> signifie « tu n’es pas obligé de fumer ici »&nbsp;! Pour déconseiller, dis <i lang="en">You shouldn’t smoke</i> ; l’interdiction (<i lang="en">mustn’t</i>) viendra plus tard. Et pas de <i lang="en"><s>She have to</s></i> : <i lang="en">she has to</i>.</p></div>`,
  audio:'She has to take these tablets twice a day. You don’t have to come back. Did you have to wait long? Yes, I had to wait an hour.'},

 {kind:'Méthode', h:'Choisir entre should, have to et don’t have to',
  p:`<p><b>Quand :</b> chaque fois que tu parles de ce qu’on « doit » faire, car le français « devoir » couvre plusieurs sens. <b>Pourquoi ça marche :</b> deux questions suffisent : <b>a-t-on le choix</b>&nbsp;? et <b>est-ce une bonne idée</b>&nbsp;? <b>Comment :</b></p>
<ul><li>Pas le choix (règle, prescription, situation) : <b>have to / has to</b>.</li><li>Pas nécessaire, on a le choix : <b>don’t / doesn’t have to</b>.</li><li>Bonne idée, conseil : <b>should</b>.</li><li>Mauvaise idée : <b>shouldn’t</b>.</li></ul>`,
  demo:{enonce:'Traduis ce que dit la pharmacienne. a) « Vous devez le prendre deux fois par jour » (c’est la prescription). b) « Pas besoin de rendez-vous. » c) « Ce serait bien de marcher un peu chaque jour. » d) « Mauvaise idée de courir avec ce genou. »',
   etapes:[{f:'a) <i lang="en">You <b>have to</b> take it twice a day.</i>',w:'Prescription : pas le choix.'},
    {f:'b) <i lang="en">You <b>don’t have to</b> make an appointment.</i>',w:'Ce n’est pas nécessaire : absence d’obligation.'},
    {f:'c) <i lang="en">You <b>should</b> walk a little every day.</i>',w:'Un conseil : bonne idée.'},
    {f:'d) <i lang="en">You <b>shouldn’t</b> run with that knee.</i>',w:'Une mauvaise idée : <i lang="en">shouldn’t</i>, pas <i lang="en">don’t have to</i>.'}],
   conclusion:'Obligation : <i lang="en">have to</i>. Pas nécessaire : <i lang="en">don’t have to</i>. Conseil : <i lang="en">should</i>. Mauvaise idée : <i lang="en">shouldn’t</i>.'}},

 {kind:'Pratique', h:'À toi : une obligation',
  p:'Le médecin a prescrit un traitement à ta mère. <b>Question :</b> écris en anglais « Elle doit prendre ce médicament trois fois par jour. »', lab:'Ta phrase',
  txt:X('She has to take ',['this medicine','this medication','these tablets','these pills','it'],' three times a day',['','.']),
  show:'She has to take this medicine three times a day.',
  why:'Une prescription, donc une obligation : <i lang="en">She <b>has</b> to take this medicine three times a day.</i> À la 3e personne : <i lang="en">has to</i>.'},

 {kind:'Pratique', h:'À toi : pas obligé',
  p:'Demain, c’est samedi. <b>Question :</b> comment dis-tu à ton fils « Tu n’es pas obligé de te lever tôt »&nbsp;?',
  opts:['You shouldn’t get up early.','You have to not get up early.','You don’t have to get up early.','You don’t should get up early.'], ans:2,
  why:'Absence d’obligation : <i lang="en">You don’t have to get up early.</i> <i lang="en">You shouldn’t get up early</i> voudrait dire que se lever tôt est une mauvaise idée.'},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:'Touche les mots dans le bon ordre. <b>Question :</b> comment demande-t-on « Est-ce que je dois prendre rendez-vous ? »',
  ordre:['Do','I','have','to','make','an','appointment?'],
  why:'<i lang="en">Do I have to make an appointment?</i> <i lang="en">have to</i> a besoin de <i lang="en">do</i> pour la question.'},

 {kind:'Prononciation', h:'Lettres muettes et sons trompeurs',
  p:`<p>Le vocabulaire de la santé est plein de pièges d’orthographe : on n’entend pas ce qu’on lit.</p>
<div class="def"><ul><li><b>should, could, would</b> : le <i lang="en">l</i> est muet, « choud ».</li><li><b>ache</b> se dit « éïk » : <i lang="en">headache</i> = « hèd-éïk ». <b>stomach</b> = « steu-meuk » (le <i lang="en">ch</i> se dit « k »).</li><li><b>cough</b> = « kof » : <i lang="en">gh</i> se dit « f ».</li><li><b>have to</b> se dit « haf-teu », et <b>has to</b> « has-teu » : le <i lang="en">v</i> devient « f » devant <i lang="en">to</i>.</li></ul></div>
<div class="warn"><p>Les francophones disent souvent « stomatch » ou « headatch » en lisant le <i lang="en">ch</i> à la française, et prononcent le <i lang="en">l</i> de <i lang="en">should</i>. Écoute et imite.</p></div>`,
  audio:'You should rest. I’ve got a headache. My stomach hurts. That’s a bad cough. I have to go. She has to stay in bed.'},

 {kind:'Oral', h:'Répète : chez le médecin',
  p:'Écoute, puis dis la phrase à voix haute. Attention à <i lang="en">headache</i> (« éïk ») et <i lang="en">cough</i> (« kof »).',
  dire:'I’ve got a headache and a bad cough.'},

 {kind:'Lecture', h:'Lire : mieux dormir',
  p:`<p>Lis cet article de magazine, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Magazine : Sleep better tonight"><p lang="en">Do you often feel tired? Most adults need seven to nine hours of sleep a night, but many of us sleep less. Here is some advice. First, you should go to bed and get up at the same time every day, even at the weekend. You shouldn’t drink coffee after two o’clock, and you shouldn’t eat a big meal late in the evening. Screens are a big problem: you should turn off your phone an hour before bed. Your bedroom should be dark, quiet and cool. About eighteen degrees is perfect. And you don’t have to stay in bed if you can’t sleep: get up, read a book for a while, then try again. If you still sleep badly after a few weeks, you should see your doctor.</p></div>
<p><b>Question :</b> que conseille l’article si on n’arrive pas à dormir&nbsp;?</p>`,
  audio:'Do you often feel tired? Most adults need seven to nine hours of sleep a night, but many of us sleep less. Here is some advice. First, you should go to bed and get up at the same time every day, even at the weekend. You shouldn’t drink coffee after two o’clock, and you shouldn’t eat a big meal late in the evening. Screens are a big problem: you should turn off your phone an hour before bed. Your bedroom should be dark, quiet and cool. About eighteen degrees is perfect. And you don’t have to stay in bed if you can’t sleep: get up, read a book for a while, then try again. If you still sleep badly after a few weeks, you should see your doctor.',
  opts:['Rester au lit et fermer les yeux.','Boire un café chaud.','Regarder son téléphone pour se détendre.','Se lever, lire un moment, puis réessayer.'], ans:3,
  why:'<i lang="en">You don’t have to stay in bed if you can’t sleep: get up, read a book for a while, then try again.</i> Rester au lit n’est pas obligatoire ; le téléphone et le café sont déconseillés (<i lang="en">you shouldn’t</i>).'},

 {kind:'Dictée', h:'Dictée : les conseils du médecin',
  p:'Écoute et écris exactement la phrase. Réécoute autant que tu veux.',
  dictee:'You should stay in bed, and you don’t have to go to work.',
  why:'Un conseil (<i lang="en">should</i> + base verbale) et une absence d’obligation (<i lang="en">don’t have to</i>).'},

 {kind:'Oral', h:'Conseille un ami malade',
  p:`<p>Ton ami a la grippe, trois jours avant un examen important. Parle pendant 40 secondes à 1 minute : réagis, donne-lui au moins quatre conseils (avec <i lang="en">should</i> et <i lang="en">shouldn’t</i>), dis-lui une chose qu’il n’est pas obligé de faire, et termine par une formule pour souhaiter un bon rétablissement. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'Oh no, I’m sorry to hear that! You should stay in bed and drink lots of water. You shouldn’t study all night: you have to sleep. I think you should take paracetamol for your headache. And you don’t have to go to class tomorrow. I’ll send you my notes. Get well soon!',
   criteres:['J’ai réagi au problème (Oh no, I’m sorry to hear that)','J’ai donné au moins deux conseils avec should','J’ai dit au moins une chose à éviter avec shouldn’t','J’ai utilisé don’t have to pour une chose pas obligatoire','J’ai terminé par Get well soon!']}},

 {kind:'Écriture', h:'Écris un e-mail d’absence',
  p:'Tu es malade et tu ne peux pas aller travailler. Écris un e-mail à ta cheffe, Ms Clarke (au moins 40 mots) : excuse-toi, décris tes symptômes, dis ce que le médecin t’a dit (ce que tu dois faire, ce que tu devrais faire) et promets quelque chose avec <i lang="en">I’ll</i>.',
  ecrire:{min:40, modele:'Dear Ms Clarke, I’m sorry, but I can’t come to work today. I’ve got a bad cough and a temperature of thirty-eight point five. I saw the doctor this morning and she says it’s flu. I have to stay at home for three days, and I should drink lots of water. I’ll check my emails if I can. Best wishes, Paul',
   criteres:[{t:'J’ai décrit au moins un symptôme', re:'\\b(headache|sore|temperature|cough|cold|flu|sick|ill|hurts?|ache)\\b'},{t:'J’ai utilisé have to ou has to', re:'\\b(have|has|had) to\\b'},{t:'J’ai utilisé should', re:'\\bshould\\b'},{t:'J’ai fait une promesse avec I’ll ou I will', re:'\\bi will\\b|\\bi[\'’]ll\\b'},'J’ai commencé par Dear… et terminé par une formule (Best wishes, Kind regards)']}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li>Avoir mal : <i lang="en">I’ve got a headache / stomach ache / backache</i> ; <i lang="en">a sore throat</i> ; <i lang="en">My knee hurts, my feet hurt</i> ; <i lang="en">I’ve hurt my back</i>. Toujours le possessif : <i lang="en">my leg</i>.</li><li>Faux amis : <i lang="en">I’m cold</i> (j’ai froid) ≠ <i lang="en">I’ve got a cold</i> (rhume) ; britannique <i lang="en">I feel sick</i> = nausée, <i lang="en">I’m ill</i> = malade.</li><li><b>should / shouldn’t + base verbale</b> : conseil, bonne ou mauvaise idée. <i lang="en">What should I do? I think you should… I don’t think you should…</i></li><li><b>have to / has to</b> : obligation. <i lang="en">Do I have to…? Does she have to…? had to</i> au passé.</li><li><b>don’t / doesn’t have to</b> = pas obligé, pas nécessaire. Ce n’est <b>pas</b> « il ne faut pas » (pour déconseiller : <i lang="en">shouldn’t</i>).</li><li>Prononciation : <i lang="en">should</i> (l muet), <i lang="en">headache</i> (« éïk »), <i lang="en">stomach</i> (« k »), <i lang="en">cough</i> (« f »), <i lang="en">have to</i> (« haf-teu »).</li></ul></div>`},

 {kind:'Mission', h:'À la pharmacie',
  p:'Un client entre dans une pharmacie à Londres. Écoute la conversation, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Pharmacist','Hello, can I help you?'],['Customer','Yes, I’ve got a bad cough and a sore throat. Have you got anything for that?'],['Pharmacist','Have you got a temperature?'],['Customer','No, I haven’t.'],['Pharmacist','OK, so it’s probably just a cold. Try this syrup. You have to take two spoonfuls three times a day, after meals.'],['Customer','Do I have to take it with water?'],['Pharmacist','No, you don’t have to. But you shouldn’t drive after you take it. It can make you sleepy.'],['Customer','OK, thanks. How much is it?'],['Pharmacist','It’s six pounds fifty.']], cache:true,
  parts:[
   {q:'a) Quels sont les symptômes du client&nbsp;?', opts:['Fièvre et mal de tête.','Mal au ventre et nausée.','Une toux et un mal de gorge.','Une toux et de la fièvre.'], ans:2, hint:'Écoute sa première réponse ; il dit ensuite qu’il n’a pas de fièvre.', why:'<i lang="en">I’ve got a bad cough and a sore throat.</i> Et à la question <i lang="en">Have you got a temperature?</i>, il répond <i lang="en">No, I haven’t.</i>'},
   {q:'b) Combien de cuillerées de sirop doit-il prendre <b>par jour</b>, en tout&nbsp;? Écris le nombre.', lab:'Cuillerées', txt:['6','six'], hint:'<i lang="en">two spoonfuls three times a day</i> : fais la multiplication.', why:'Deux cuillerées, trois fois par jour : 2 × 3 = 6 cuillerées par jour.'},
   {q:'c) Que lui déconseille la pharmacienne&nbsp;?', opts:['De prendre le sirop avec de l’eau.','De conduire après l’avoir pris.','De manger après le sirop.','D’aller travailler.'], ans:1, hint:'Cherche <i lang="en">shouldn’t</i>.', why:'<i lang="en">You shouldn’t drive after you take it. It can make you sleepy.</i> Le sirop peut endormir. L’eau, elle, n’est pas obligatoire (<i lang="en">you don’t have to</i>).'},
   {q:'d) Combien coûte le sirop&nbsp;? Écris le prix en livres.', lab:'Prix', txt:['6.50','£6.50','six pounds fifty','6 pounds 50','6 pounds fifty'], show:'£6.50', hint:'<i lang="en">six pounds fifty</i>.', why:'<i lang="en">Six pounds fifty</i> = 6,50 livres, qu’on écrit £6.50 en anglais.'},
   {q:'e) Écris la réponse de la pharmacienne en phrase complète : « Vous n’êtes pas obligé de le prendre avec de l’eau. »', lab:'Ta phrase', txt:['You don’t have to take it with water.','No, you don’t have to take it with water.'], show:'You don’t have to take it with water.', hint:'Absence d’obligation : <i lang="en">don’t have to</i>.', why:'<i lang="en">You don’t have to take it with water.</i> Ce n’est pas interdit, ce n’est simplement pas nécessaire.'}],
  sol:'<p lang="en">Pharmacist: Hello, can I help you? – Customer: Yes, I’ve got a bad cough and a sore throat. Have you got anything for that? – Have you got a temperature? – No, I haven’t. – OK, so it’s probably just a cold. Try this syrup. You have to take two spoonfuls three times a day, after meals. – Do I have to take it with water? – No, you don’t have to. But you shouldn’t drive after you take it. It can make you sleepy. – OK, thanks. How much is it? – It’s six pounds fifty.</p><p>Toux et mal de gorge sans fièvre : un rhume. 2 cuillerées × 3 = 6 par jour (obligation : <i lang="en">have to</i>), l’eau n’est pas nécessaire (<i lang="en">don’t have to</i>), conduire est déconseillé (<i lang="en">shouldn’t</i>). Prix : £6.50.</p>'},

 {kind:'Mission', h:'Le genou de Kai',
  p:`<p>Sur un forum de sport, Kai demande conseil. Lis son message, puis réponds-lui étape par étape.</p>
<div class="blk" data-t="Forum : Football injury, help!"><p lang="en">Hi everyone. I hurt my knee last Sunday during a football match. It’s quite swollen and it hurts when I walk. I’ve got an important match in two weeks and I don’t want to miss it! My brother says I should play anyway. But my doctor says I have to rest for ten days and I shouldn’t run at all. I don’t have to stay in bed, but I can’t go to the gym. What should I do? Kai</p></div>`,
  parts:[
   {q:'a) Que dit le médecin de Kai&nbsp;?', opts:['Il doit rester au lit deux semaines.','Il doit se reposer dix jours et ne pas courir du tout.','Il peut jouer le match s’il a moins mal.','Il devrait aller à la salle de sport.'], ans:1, hint:'Cherche <i lang="en">my doctor says</i>.', why:'<i lang="en">I have to rest for ten days and I shouldn’t run at all.</i>'},
   {q:'b) Kai doit-il rester au lit&nbsp;?', opts:['Oui, dix jours.','Oui, jusqu’au match.','Non, il n’est pas obligé.','Le message ne le dit pas.'], ans:2, hint:'Cherche <i lang="en">don’t have to</i>.', why:'<i lang="en">I don’t have to stay in bed</i> : il n’est pas obligé de rester au lit, mais il doit se reposer.'},
   {q:'c) Donne-lui un conseil : « Tu devrais écouter ton médecin. »', lab:'Ton conseil', txt:X(['You should ','I think you should '],'listen to ',['your doctor','the doctor'],['','.']), show:'You should listen to your doctor.', hint:'Un conseil : <i lang="en">should</i> + base verbale. « Écouter quelqu’un » : <i lang="en">listen to</i>.', why:'<i lang="en">You should listen to your doctor.</i> N’oublie pas <i lang="en">to</i> après <i lang="en">listen</i> (mais jamais après <i lang="en">should</i>).'},
   {q:'d) Rassure-le : « Tu n’es pas obligé de jouer ce match. »', lab:'Ta phrase', txt:X('You don’t have to play ',['this match','that match','the match','in this match','in that match','in the match','this game','that game','the game'],['','.']), show:'You don’t have to play this match.', hint:'Absence d’obligation : <i lang="en">don’t have to</i> + base verbale.', why:'<i lang="en">You don’t have to play this match.</i> Ce n’est pas obligatoire : c’est à lui de choisir.'}],
  sol:'<p>Kai s’est fait mal au genou. Son médecin lui impose dix jours de repos (<i lang="en">have to</i>) et lui déconseille de courir (<i lang="en">shouldn’t</i>), mais il n’est pas obligé de rester au lit (<i lang="en">don’t have to</i>). Une réponse possible :</p><p lang="en">You should listen to your doctor. You don’t have to play this match. There will be other matches!</p>'},
]},
);
})();
