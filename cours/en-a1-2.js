/* Déclic — Anglais A1 (unités 4 à 6). Format : docs/ANGLAIS.md */
(()=>{
// X('a {b|c} d') → ['a b d', 'a c d'] : développe toutes les variantes d’une réponse écrite (produit des choix entre accolades)
const X=(...ss)=>ss.flatMap(s=>{ const m=s.match(/\{([^{}]*)\}/); return m?m[1].split('|').flatMap(o=>X(s.replace(m[0],()=>o))):[s]; });
COURS.push(

/* ============================== 4. My things ============================== */
{subj:'en', sem:'a1', id:'en-a1-things', o:4, h:'My things', p:'Montrer et décrire des objets, dire ce qu’il y a dans une pièce et où sont les choses : <i lang="en">this, that, these, those</i>, <i lang="en">there is / there are</i>, les couleurs et les prépositions de lieu.', steps:[
 {kind:'Écoute', h:'Visite d’un appartement',
  p:`<p>À la fin de cette unité, tu sauras montrer et nommer des objets, dire ce qu’il y a dans une pièce, où se trouvent les choses et de quelle couleur elles sont.</p>
<p>Mia visite le nouvel appartement de son ami Jack. <b>Écoute sans lire</b>, deux fois si tu veux, puis réponds. Le texte apparaîtra après ta réponse.</p>
<p><b>Question :</b> où est la guitare de Jack&nbsp;?</p>`,
  audio:[['Mia','Wow, nice flat, Jack! Is this your bedroom?'],['Jack','Yes, it is. It’s small, but I like it.'],['Mia','What’s that on the wall?'],['Jack','That’s a map of Scotland. My family is from Edinburgh.'],['Mia','And are these your books?'],['Jack','No, they aren’t. They’re my sister’s. She’s a student.'],['Mia','Hey, there’s a guitar under the bed!'],['Jack','Yes, that’s my old guitar.'],['Mia','Is there a desk?'],['Jack','Yes, there’s a small desk next to the window. My laptop is on it.'],['Mia','It’s perfect. And there are two windows. Lots of light!']], cache:true,
  opts:['Sur le bureau','À côté de la fenêtre','Sous le lit','Au mur'], ans:2,
  why:'<i lang="en">There’s a guitar under the bed!</i> : la guitare est sous le lit (<i lang="en">under</i>). Au mur (<i lang="en">on the wall</i>), il y a une carte de l’Écosse, et le bureau est à côté de la fenêtre (<i lang="en">next to the window</i>).'},

 {kind:'Vocabulaire', h:'Les objets du quotidien',
  p:`<p>Voici les objets qu’on cherche, qu’on prête et qu’on perd tous les jours. Touche une ligne pour l’entendre, puis répète-la à voix haute. Ces mots entrent dans ta <b>révision du vocabulaire</b>.</p>`,
  mots:[['a bag','un sac','My bag is under the chair.'],['a key / keys','une clé / des clés','Where are my keys?'],['a phone','un téléphone (portable)','Is this your phone?'],['a wallet','un portefeuille','My wallet is in my bag.'],['a laptop','un ordinateur portable','The laptop is on the desk.'],['an umbrella','un parapluie','There’s an umbrella next to the door.'],['glasses','des lunettes','My glasses are on the table.'],['a watch','une montre','That’s a nice watch!'],['headphones','un casque, des écouteurs','Are these your headphones?'],['What’s this in English?','Comment dit-on ça en anglais ?','What’s this in English? – It’s a charger.'],['Here you are.','Tiens, voilà (en tendant quelque chose)','Your keys? Here you are.']],
  note:'<b>Attention :</b> <i lang="en">glasses</i> (lunettes) et <i lang="en">headphones</i> sont toujours au pluriel : <i lang="en">My glasses <b>are</b> on the table.</i> Au singulier, <i lang="en">a glass</i> veut dire « un verre ». Un téléphone portable se dit <i lang="en">a phone</i>, <i lang="en">a mobile</i> (britannique) ou <i lang="en">a cell phone</i> (américain) : en anglais, <i lang="en">portable</i> n’est qu’un adjectif.'},

 {kind:'Pratique', h:'À toi : où sont mes clés ?',
  p:'Tu es en retard et tu cherches tes clés partout. <b>Question :</b> comment demandes-tu en anglais « Où sont mes clés ? »', lab:'Ta question', txt:['Where are my keys?'],
  why:'<i lang="en">keys</i> est au pluriel, donc le verbe aussi : <i lang="en">Where <b>are</b> my keys?</i> Pour un seul objet : <i lang="en">Where’s my phone?</i> (<i lang="en">Where is…</i>).'},

 {kind:'Grammaire', h:'This, that, these, those',
  p:`<p>Jack fait visiter son appartement : <i lang="en">Is <b>this</b> your bedroom? What’s <b>that</b> on the wall? Are <b>these</b> your books?</i> Pour montrer une chose, l’anglais choisit entre quatre mots, selon deux questions : est-ce <b>près</b> ou <b>loin</b> de moi&nbsp;? Est-ce <b>une</b> chose ou <b>plusieurs</b>&nbsp;?</p>
<div class="def"><p><b>this</b> = ceci, ce…-ci (près, singulier) · <b>these</b> = ces…-ci (près, pluriel)<br><b>that</b> = cela, ce…-là (loin, singulier) · <b>those</b> = ces…-là (loin, pluriel)</p></div>
<div class="idea"><p>Le français dit « ce, cet, cette, ces » et n’ajoute « -ci » ou « -là » que pour préciser. L’anglais, lui, choisit <b>toujours</b> : ce que tu tiens ou qui est tout près, c’est <i lang="en">this/these</i> ; ce qui est plus loin, là-bas, c’est <i lang="en">that/those</i>. Le mot s’emploie seul (<i lang="en">What’s this?</i>) ou devant un nom (<i lang="en">this bag</i>). On dit aussi <i lang="en">This is Anna</i> pour présenter quelqu’un.</p></div>
<div class="ex"><p><i lang="en">This bag is heavy.</i> (le sac que je porte)<br><i lang="en">That car is my brother’s.</i> (la voiture, là-bas)<br><i lang="en">These shoes are new.</i> · <i lang="en">Those people are my colleagues.</i></p></div>
<div class="warn"><p>Tout s’accorde : <i lang="en">this book <b>is</b></i>, mais <i lang="en">these book<b>s</b> <b>are</b></i>. « This books » est une faute très fréquente. Pour répondre, on reprend avec <b>it</b> (une chose) ou <b>they</b> (plusieurs) : <i lang="en">What’s that? – <b>It’s</b> a map.</i> · <i lang="en">What are those? – <b>They’re</b> keys.</i></p></div>`,
  audio:'This bag is heavy. That car is my brother’s. These shoes are new. Those people are my colleagues.'},

 {kind:'Méthode', h:'Choisir entre this, that, these et those',
  p:`<p><b>Quand :</b> chaque fois que tu montres ou désignes une chose ou une personne. <b>Pourquoi ça marche :</b> deux questions suffisent pour trouver le bon mot, et le nombre décide ensuite du verbe et du pronom de la réponse. <b>Comment :</b></p>
<ul><li>Près de moi → <i lang="en">this / these</i> ; loin → <i lang="en">that / those</i>.</li><li>Une chose → <i lang="en">this / that</i> + <b>is</b> ; plusieurs → <i lang="en">these / those</i> + <b>are</b>, et le nom prend un <b>-s</b>.</li><li>Dans la réponse : <b>it</b> pour une chose, <b>they</b> pour plusieurs.</li></ul>`,
  demo:{enonce:'Tu tiens dans ta main des clés trouvées sur une table. Demande à ton collègue : « Ce sont tes clés ? », puis écris sa réponse « Oui ».',
   etapes:[{f:'Près ou loin&nbsp;? Les clés sont dans ta main : <b>près</b> → <i lang="en">this</i> ou <i lang="en">these</i>.',w:'La distance se juge par rapport à celui qui parle.'},
    {f:'Une ou plusieurs&nbsp;? <i lang="en">keys</i>, pluriel → <i lang="en"><b>these</b></i>, avec le verbe <i lang="en"><b>are</b></i>.',w:'Le démonstratif, le nom et le verbe s’accordent ensemble.'},
    {f:'Question : <i lang="en"><b>Are these</b> your keys?</i>',w:'Comme toujours avec <i lang="en">to be</i>, le verbe passe devant pour poser la question.'},
    {f:'Réponse : <i lang="en">Yes, <b>they</b> are.</i>',w:'On ne répète pas <i lang="en">these</i> : on reprend avec <i lang="en">they</i>, sans contraction en fin de réponse courte.'}],
   conclusion:'<i lang="en">Are these your keys? – Yes, they are.</i>'}},

 {kind:'Pratique', h:'À toi : loin et au pluriel',
  p:'Tu montres à une amie des chaussures dans une vitrine, de l’autre côté de la rue. <b>Question :</b> quel mot complète la phrase <i lang="en">___ shoes are really nice!</i>&nbsp;?', lab:'Le mot', txt:['Those'],
  why:'Loin (de l’autre côté de la rue) et pluriel (<i lang="en">shoes</i>) : <i lang="en">Those shoes are really nice!</i>'},

 {kind:'Pratique', h:'À toi : mets au pluriel',
  p:'Tu ne parles plus d’un stylo, mais de deux. <b>Question :</b> comment s’écrit au pluriel la phrase <i lang="en">This is my pen.</i>&nbsp;?', lab:'Ta phrase', txt:['These are my pens.'],
  why:'Trois mots changent ensemble : <i lang="en">this → these</i>, <i lang="en">is → are</i>, <i lang="en">pen → pens</i>. <i lang="en">My</i>, lui, ne change jamais.'},

 {kind:'Grammaire', h:'Il y a : there is, there are',
  p:`<p>Mia s’exclame <i lang="en">There’s a guitar under the bed!</i> et demande <i lang="en">Is there a desk?</i> Pour dire qu’une chose existe quelque part, notre « il y a », l’anglais a une tournure fixe.</p>
<div class="def"><p><b>There is</b> + singulier : <i lang="en">There is a desk.</i> Contraction : <b>there’s</b>.<br><b>There are</b> + pluriel : <i lang="en">There are two windows.</i> (pas de contraction à l’écrit)</p></div>
<div class="idea"><p>Le verbe s’accorde avec ce qui vient <b>après</b> : une chose → <i lang="en">is</i>, plusieurs → <i lang="en">are</i>. Le français ne change jamais (« il y a un lit, il y a deux lits »), l’anglais si. On présente d’abord la chose avec <i lang="en">there is</i>, puis on en parle avec <i lang="en">it</i> : <i lang="en">There’s a desk. It’s next to the window.</i></p></div>
<div class="ex"><p><i lang="en">There’s a café near my office.</i><br><i lang="en">There are twenty students in my class.</i><br><i lang="en">In my bag, there’s a phone, a wallet and two pens.</i> (devant une liste qui commence par un singulier, on dit <i lang="en">there’s</i>)</p></div>
<div class="warn"><p>Trois pièges : ne traduis pas « il y a » par <i lang="en">it has</i> ni par <i lang="en">it is</i> ; écris <i lang="en">There <b>are</b> two windows</i>, pas « There is two windows » ; et ne confonds pas <b>there</b> (dans <i lang="en">there is</i>), <b>their</b> (leur) et <b>they’re</b> (ils sont), qui se prononcent de la même façon.</p></div>`,
  audio:'There’s a café near my office. There are twenty students in my class. In my bag, there’s a phone, a wallet and two pens.'},

 {kind:'Méthode', h:'Questions et négations avec there is / there are',
  p:`<p><b>Quand :</b> pour demander si une chose existe (à l’hôtel, dans un appartement, en ville) ou dire qu’elle n’existe pas. <b>Pourquoi ça marche :</b> <i lang="en">there is / there are</i> se comporte comme <i lang="en">to be</i> : on inverse pour la question, on ajoute <i lang="en">not</i> pour la négation. <b>Comment :</b></p>
<ul><li>Question : <b>Is there</b> a…? / <b>Are there</b> two…? Au pluriel, on dit souvent <i lang="en">Are there <b>any</b> shops near here?</i> (<i lang="en">any</i> = des, dans une question).</li><li>Réponses courtes : <i lang="en">Yes, there is. / No, there isn’t.</i> · <i lang="en">Yes, there are. / No, there aren’t.</i></li><li>Négation : <i lang="en">There <b>isn’t</b> a lift.</i> On peut aussi dire <i lang="en">There’s <b>no</b> lift</i> (sans <i lang="en">a</i>). Au pluriel : <i lang="en">There <b>aren’t any</b> chairs</i> ou <i lang="en">There are <b>no</b> chairs</i>. Tu reverras <i lang="en">any</i> en détail dans l’unité sur la nourriture.</li></ul>`,
  demo:{enonce:'Tu visites une chambre d’hôtel. Demande s’il y a un sèche-cheveux (<i lang="en">a hairdryer</i>), écris la réponse « Non » du réceptionniste, puis dis-le en phrase complète.',
   etapes:[{f:'Une seule chose (<i lang="en">a hairdryer</i>) → <i lang="en">there is</i>.',w:'Le verbe se choisit d’après ce qui suit.'},
    {f:'Question : <i lang="en"><b>Is there</b> a hairdryer?</i>',w:'On inverse : <i lang="en">is</i> passe devant <i lang="en">there</i>.'},
    {f:'Réponse courte : <i lang="en">No, there isn’t.</i>',w:'On reprend <i lang="en">there</i> et le verbe, avec <i lang="en">not</i> contracté.'},
    {f:'Phrase complète : <i lang="en">There isn’t a hairdryer in the room.</i> ou <i lang="en">There’s no hairdryer in the room.</i>',w:'Avec <i lang="en">isn’t</i> on garde <i lang="en">a</i> ; avec <i lang="en">no</i>, on l’enlève.'}],
   conclusion:'<i lang="en">Is there a hairdryer? – No, there isn’t. There isn’t a hairdryer in the room.</i>'}},

 {kind:'Pratique', h:'À toi : il y a deux fenêtres',
  p:'Tu décris ta chambre à un ami. <b>Question :</b> comment dis-tu en anglais « Il y a deux fenêtres dans ma chambre. »&nbsp;?', lab:'Ta phrase', txt:X('There are two windows in my {bedroom|room}.','In my {bedroom|room}{,|} there are two windows.'),
  why:'Deux fenêtres, c’est un pluriel : <i lang="en">There <b>are</b> two windows in my bedroom.</i> « Ma chambre » se dit <i lang="en">my bedroom</i> (ou <i lang="en">my room</i>).'},

 {kind:'Pratique', h:'Une question à l’hôtel',
  p:'Tu appelles la réception d’un hôtel avant de réserver. Touche les mots dans le bon ordre pour demander s’il y a un ascenseur.',
  ordre:['Is','there','a','lift','in','the','hotel?'],
  why:'<i lang="en">Is there a lift in the hotel?</i> On inverse <i lang="en">there is</i> pour poser la question. <i lang="en">Lift</i> est britannique ; les Américains disent <i lang="en">elevator</i>.'},

 {kind:'Vocabulaire', h:'Les couleurs',
  p:`<p>Pour décrire un objet, le retrouver aux objets trouvés ou le demander dans un magasin, il faut sa couleur. Touche chaque ligne pour l’entendre.</p>`,
  mots:[['red','rouge','a red bag'],['blue','bleu','My phone is blue.'],['green','vert','a green umbrella'],['yellow','jaune','a yellow taxi'],['black and white','noir et blanc','a black and white photo'],['grey','gris','grey shoes'],['brown','marron, brun','a brown wallet'],['What colour is it?','De quelle couleur est-il ?','What colour is your bag? – It’s black.']],
  note:'L’adjectif se place <b>avant</b> le nom et ne prend jamais de -s : <i lang="en">a <b>red</b> car</i>, <i lang="en">two <b>red</b> cars</i> (pas « a car red », ni « reds cars »). Autres couleurs : <i lang="en">pink</i> (rose), <i lang="en">purple</i> (violet), <i lang="en">orange</i>. Orthographe : <i lang="en">colour, grey</i> en britannique, <i lang="en">color, gray</i> en américain.'},

 {kind:'Grammaire', h:'Où est-ce ? Les prépositions de lieu',
  p:`<p>Jack dit <i lang="en">My laptop is <b>on</b> the desk</i>, et Mia trouve une guitare <i lang="en"><b>under</b> the bed</i>. Pour dire où se trouve une chose, on place une préposition de lieu devant le nom : <i lang="en">The keys are <b>in</b> my bag.</i></p>
<div class="def"><p><b>in</b> = dans · <b>on</b> = sur (posé ou collé) · <b>under</b> = sous<br><b>next to</b> = à côté de · <b>behind</b> = derrière · <b>in front of</b> = devant</p></div>
<div class="idea"><p>Pense à une boîte : <i lang="en">in</i>, c’est à l’intérieur ; <i lang="en">on</i>, c’est en contact avec une surface, dessus ou contre ; <i lang="en">under</i>, c’est en dessous. <i lang="en">Next to</i> et <i lang="en">in front of</i> s’écrivent en plusieurs mots, mais se disent d’un seul souffle, comme un seul mot.</p></div>
<div class="ex"><p><i lang="en">There’s a map <b>on</b> the wall.</i> · <i lang="en">The cat is <b>behind</b> the sofa.</i><br><i lang="en">The bus stop is <b>in front of</b> the school.</i> · <i lang="en">The desk is <b>next to</b> the window.</i></p></div>
<div class="warn"><p>Les pièges des francophones : « sur le mur » se dit <i lang="en"><b>on</b> the wall</i> (contact), mais « sur la photo » se dit <i lang="en"><b>in</b> the photo</i> (on est dans l’image). « À côté de » se dit <i lang="en">next to</i>, sans <i lang="en">of</i>. Et <i lang="en">in front of</i> veut dire « devant », pas « en face de » (qui se dit <i lang="en">opposite</i>).</p></div>`,
  mots:[['in','dans','The keys are in my bag.'],['on','sur','The laptop is on the desk.'],['under','sous','The guitar is under the bed.'],['next to','à côté de','The desk is next to the window.'],['behind','derrière','The cat is behind the sofa.'],['in front of','devant','There’s a car in front of the house.']]},

 {kind:'Pratique', h:'À toi : où est le chat ?',
  p:'Ton colocataire cherche le chat. <b>Question :</b> comment lui dis-tu en anglais « Le chat est sous la table, à côté de mon sac. »&nbsp;?', lab:'Ta phrase', txt:X('The cat{ is|’s} under the table{,|} next to my bag.','{It’s|It is} under the table{,|} next to my bag.'),
  why:'<i lang="en">under</i> = sous, <i lang="en">next to</i> = à côté de (sans <i lang="en">of</i>) : <i lang="en">The cat is under the table, next to my bag.</i>'},

 {kind:'Écoute', h:'Où sont les lunettes ?',
  p:'Écoute ce court dialogue entre Tom et sa mère, sans lire. <b>Question :</b> où sont finalement les lunettes de Tom&nbsp;?',
  audio:[['Tom','Mum, where are my glasses?'],['Mum','They’re on the table in the kitchen.'],['Tom','No, they aren’t. There’s a newspaper on the table, but there aren’t any glasses.'],['Mum','Are they in your bag?'],['Tom','No… They aren’t in my bag, and they aren’t next to my bed.'],['Mum','Tom! They’re on your head!']], cache:true,
  opts:['Sur la table de la cuisine','Dans son sac','À côté de son lit','Sur sa tête'], ans:3,
  why:'<i lang="en">They’re on your head!</i> : elles sont sur sa tête. Sur la table de la cuisine, il n’y a qu’un journal (<i lang="en">a newspaper</i>).'},

 {kind:'Prononciation', h:'Le son th, et this ou these',
  p:`<p>Les mots de cette unité sont pleins de <b>th</b> : <i lang="en">this, that, these, those, there, the</i>. C’est le son le plus difficile pour un francophone, parce qu’il n’existe pas en français.</p>
<div class="def"><p>Pour dire <b>th</b>, pose le bout de la langue <b>entre les dents</b>, un peu sorti, et souffle. Dans <i lang="en">this, that, there, the</i>, la gorge vibre (comme un « z » zézayé). Dans <i lang="en">three, thanks, think</i>, elle ne vibre pas (comme un « s » zézayé).</p></div>
<div class="warn"><p>Évite « zis » et « dis » pour <i lang="en">this</i>. Autre piège : <i lang="en">this</i> a un <b>i court</b>, ouvert, presque « é », et <i lang="en">these</i> un <b>i long</b>, « iii ». Si tu les prononces pareil, on n’entend plus la différence entre singulier et pluriel.</p></div>`,
  audio:'this, these. that, those. there. three. Thank you. This is my bag. These are my keys.'},

 {kind:'Lecture', h:'Une annonce de colocation',
  p:`<p>Lis cette annonce trouvée sur un site de colocation, puis réponds. Tu peux aussi l’écouter. Mots utiles : <i lang="en">wardrobe</i> = armoire, <i lang="en">curtains</i> = rideaux, <i lang="en">tidy</i> = ordonné.</p>
<div class="blk" data-t="Room to rent"><p lang="en">Room to rent in a friendly flat! The flat is in the centre of York, next to a big park. There are three bedrooms, a kitchen, a bathroom and a living room. The free room is big and quiet. There’s a bed, a desk, a chair and a big wardrobe. The walls are white and the curtains are green. There isn’t a TV in the bedroom, but there’s a big TV in the living room. Your flatmates are Ella, a nurse, and Kofi, a student. They’re friendly and very tidy! The bus stop is in front of the building. £550 a month. Call Ella on 07700 900461.</p></div>
<p><b>Question :</b> quelle affirmation est vraie&nbsp;?</p>`,
  audio:'Room to rent in a friendly flat! The flat is in the centre of York, next to a big park. There are three bedrooms, a kitchen, a bathroom and a living room. The free room is big and quiet. There’s a bed, a desk, a chair and a big wardrobe. The walls are white and the curtains are green. There isn’t a TV in the bedroom, but there’s a big TV in the living room. Your flatmates are Ella, a nurse, and Kofi, a student. They’re friendly and very tidy! The bus stop is in front of the building. Five hundred and fifty pounds a month. Call Ella on oh seven seven oh oh, nine oh oh, four six one.',
  opts:['Il y a une télévision dans la chambre à louer.','L’appartement a deux chambres.','L’arrêt de bus est devant l’immeuble.','Les rideaux de la chambre sont blancs.'], ans:2,
  why:'<i lang="en">The bus stop is in front of the building</i> : l’arrêt est devant l’immeuble. La télévision est dans le salon (<i lang="en">There isn’t a TV in the bedroom</i>), il y a trois chambres, et ce sont les murs qui sont blancs ; les rideaux sont verts.'},

 {kind:'Dictée', h:'Dictée : sur mon bureau',
  p:'Écoute et écris exactement la phrase. Tu peux réécouter autant que tu veux, et utiliser « Plus lentement ».',
  dictee:'There are two red pens on my desk.',
  why:'<i lang="en">There are</i> (pluriel), puis l’adjectif de couleur avant le nom et sans -s : <i lang="en">two red pens</i>.'},

 {kind:'Oral', h:'Répète après le modèle',
  p:`<p>Écoute la phrase, puis dis-la à voix haute en touchant « Dire la phrase ». Soigne les <b>th</b> (langue entre les dents) et la différence entre le i court de <i lang="en">this</i> et le i long de <i lang="en">these</i>.</p>`,
  dire:'This is my bag, and these are my keys.',
  note:'Si la reconnaissance vocale entend « is » au lieu de « this », ton th est trop faible : sors un peu plus la langue.'},

 {kind:'Oral', h:'Décris ta chambre',
  p:`<p>À toi de parler, pendant 30 à 45 secondes. Décris ta chambre (ou une pièce que tu connais bien) : ce qu’il y a dedans avec <i lang="en">there is / there are</i>, où sont les objets, et de quelle couleur ils sont. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'My bedroom is quite small, but I like it. There’s a bed, a desk and a chair. The desk is next to the window, and my laptop is on the desk. There are two pictures on the wall. The walls are white and the curtains are blue. There isn’t a TV in my room. My guitar is behind the door, and my bag is usually under the bed!',
   criteres:['J’ai utilisé There is / There’s avec un singulier','J’ai utilisé There are avec un pluriel','J’ai situé au moins trois objets (in, on, under, next to, behind…)','J’ai donné au moins deux couleurs, placées avant le nom ou après is/are','J’ai fait une phrase négative (There isn’t…)']}},

 {kind:'Écriture', h:'Écris ton annonce',
  p:'Tu proposes une chambre de ton appartement à un étudiant étranger. Écris une courte annonce (au moins 40 mots) : décris l’appartement et la chambre avec <i lang="en">there is / there are</i>, dis où sont les choses, donne au moins une couleur et dis ce qu’il n’y a pas.',
  ecrire:{min:40, modele:'Room to rent in Lausanne! The flat is near the station. There are two bedrooms, a kitchen and a small bathroom. In your room, there’s a bed, a desk and a big wardrobe. The desk is next to the window. The walls are yellow. There isn’t a TV, but there’s fast wifi. The supermarket is in front of the building.',
   criteres:[{t:'J’ai utilisé there is ou there’s', re:'\\bthere(\\s+is|[’\']s)\\b'},{t:'J’ai utilisé there are', re:'\\bthere\\s+are\\b'},{t:'J’ai utilisé une préposition de lieu', re:'\\b(in|on|under|behind|next to|in front of)\\b'},{t:'J’ai donné une couleur', re:'\\b(red|blue|green|yellow|black|white|grey|gray|brown|pink|purple|orange)\\b'},{t:'J’ai dit ce qu’il n’y a pas', re:'\\bthere\\s+(isn[’\']t|aren[’\']t|is\\s+not|are\\s+not|is\\s+no|are\\s+no)\\b|\\bthere[’\']s\\s+no\\b'},'J’ai accordé le verbe : is avec un singulier, are avec un pluriel']}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>this / these</b> = près (singulier / pluriel) ; <b>that / those</b> = loin. Tout s’accorde : <i lang="en">this book is, these books are</i>. Réponse avec <i lang="en">it</i> ou <i lang="en">they</i>.</li><li><b>Il y a</b> : <i lang="en">there is (there’s)</i> + singulier, <i lang="en">there are</i> + pluriel. Jamais <i lang="en">it has</i>.</li><li>Question : <i lang="en">Is there…? Are there (any)…?</i> Réponses : <i lang="en">Yes, there is. / No, there isn’t. Yes, there are. / No, there aren’t.</i> Négation : <i lang="en">There isn’t a…, There’s no…, There aren’t any…</i></li><li>Prépositions : <i lang="en">in, on, under, next to, behind, in front of</i>. <i lang="en">on the wall</i>, mais <i lang="en">in the photo</i>.</li><li>Couleurs avant le nom, sans -s : <i lang="en">two red cars</i>. <i lang="en">What colour is it?</i></li><li><i lang="en">glasses, headphones</i> sont pluriels : <i lang="en">My glasses are…</i></li><li>Prononciation : <b>th</b> langue entre les dents ; <i lang="en">this</i> (i court) ≠ <i lang="en">these</i> (i long).</li></ul></div>`},

 {kind:'Mission', h:'Aux objets trouvés',
  p:'Tu es au bureau des objets trouvés d’une gare anglaise. Une voyageuse cherche son sac. Écoute le dialogue, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Officer','Good morning. Can I help you?'],['Woman','Good morning. I’m looking for my bag. It’s from the train from Leeds.'],['Officer','What colour is it?'],['Woman','It’s blue. A small blue bag.'],['Officer','Well, there are two blue bags here. This one, on the table, and that one, under the desk.'],['Woman','That one! That’s my bag, under the desk.'],['Officer','OK. What’s in it?'],['Woman','My wallet, my phone and my glasses. Oh, and a green umbrella.'],['Officer','Let me see… There’s a wallet, a phone and some glasses. But there isn’t an umbrella, sorry.'],['Woman','Never mind. Thank you so much!']], cache:true,
  parts:[
   {q:'a) De quelle couleur est le sac de la voyageuse&nbsp;?', opts:['Vert','Noir','Gris','Bleu'], ans:3, hint:'Écoute la réponse à la question <i lang="en">What colour is it?</i>', why:'<i lang="en">It’s blue. A small blue bag.</i> : un petit sac bleu.'},
   {q:'b) Où est son sac dans le bureau&nbsp;? Réponds en anglais, avec une préposition.', lab:'En anglais', txt:X('Under the desk.','{It’s|It is} under the desk.','{The|Her} bag{ is|’s} under the desk.'), hint:'Elle dit <i lang="en">that one</i> : celui qui est loin, pas sur la table.', why:'<i lang="en">That’s my bag, under the desk</i> : il est sous le bureau. L’autre sac bleu est sur la table (<i lang="en">on the table</i>).'},
   {q:'c) Quel objet manque dans le sac&nbsp;?', opts:['Le portefeuille','Le parapluie','Le téléphone','Les lunettes'], ans:1, hint:'Cherche la phrase négative de l’employé.', why:'<i lang="en">There isn’t an umbrella</i> : il manque le parapluie vert.'},
   {q:'d) Écris en anglais la phrase de l’employé : « Il n’y a pas de parapluie. »', lab:'Ta phrase', txt:X('There{ isn’t an| is not an| is no|’s no} umbrella{| in the bag| in it}.'), hint:'Négation de <i lang="en">there is</i> ; attention à <i lang="en">a</i> ou <i lang="en">an</i> devant <i lang="en">umbrella</i>.', why:'<i lang="en">There isn’t an umbrella.</i> (ou <i lang="en">There’s no umbrella.</i>) On écrit <i lang="en">an</i> parce que <i lang="en">umbrella</i> commence par un son de voyelle.'}],
  sol:'<p lang="en">Woman: I’m looking for my bag. – What colour is it? – It’s blue. – There are two blue bags here. This one, on the table, and that one, under the desk. – That one! … – There’s a wallet, a phone and some glasses. But there isn’t an umbrella.</p><p>Le sac est bleu et se trouve sous le bureau (<i lang="en">under the desk</i>) : la voyageuse dit <i lang="en">that one</i>, celui qui est loin. Il contient le portefeuille, le téléphone et les lunettes, mais pas le parapluie : <i lang="en">There isn’t an umbrella</i> (ou <i lang="en">There’s no umbrella</i>).</p>'},

 {kind:'Mission', h:'Le message de ton hôte',
  p:`<p>Tu loues un appartement pour un week-end à Bristol. En arrivant, tu trouves ce message de la propriétaire. Lis-le, puis réponds. <i lang="en">Towels</i> = serviettes, <i lang="en">shelf</i> = étagère, <i lang="en">mat</i> = paillasson.</p>
<div class="blk" data-t="Message"><p lang="en">Hi and welcome! The wifi password is on the fridge. In the kitchen, there’s a coffee machine, but there isn’t a microwave, sorry! There are clean towels in the bathroom, on the shelf behind the door. The supermarket is next to the bus stop. When you leave on Sunday, please put the keys under the mat. Enjoy your stay! Ruth</p></div>`,
  parts:[
   {q:'a) Que dois-tu faire des clés en partant&nbsp;?', opts:['Les laisser sur le frigo','Les mettre sous le paillasson','Les poser derrière la porte','Les déposer au supermarché'], ans:1, hint:'Cherche <i lang="en">keys</i> dans le message, et la préposition qui suit.', why:'<i lang="en">Please put the keys under the mat</i> : sous le paillasson.'},
   {q:'b) Ton ami te demande où sont les serviettes. Réponds en anglais par une phrase complète.', lab:'Ta phrase', txt:X('{They’re|They are|The towels are} on the shelf behind the door{| in the bathroom}.','{They’re|They are|The towels are} in the bathroom{,|} on the shelf behind the door.'), hint:'<i lang="en">towels</i> est au pluriel : commence par <i lang="en">They are…</i>', why:'<i lang="en">They’re in the bathroom, on the shelf behind the door.</i> Pluriel : <i lang="en">they are</i>.'},
   {q:'c) Tu veux repasser une chemise. Écris à Ruth la question : « Est-ce qu’il y a un fer à repasser ? » (<i lang="en">iron</i> = fer à repasser)', lab:'Ta question', txt:X('Is there an iron{| in the flat| in the apartment}?'), hint:'Question avec <i lang="en">there is</i> : on inverse. Et <i lang="en">iron</i> commence par un son de voyelle.', why:'<i lang="en">Is there an iron?</i> On inverse <i lang="en">there is</i>, et on écrit <i lang="en">an</i> devant <i lang="en">iron</i> (prononcé « aïeune »).'},
   {q:'d) Tu trouves des lunettes de soleil sur la table, juste devant toi. Écris à Ruth : « Ce sont tes lunettes de soleil ? » (<i lang="en">sunglasses</i>)', lab:'Ta question', txt:['Are these your sunglasses?'], hint:'Les lunettes sont près de toi, et <i lang="en">sunglasses</i> est toujours au pluriel.', why:'Près et pluriel : <i lang="en">these</i>, avec <i lang="en">are</i> placé devant : <i lang="en">Are these your sunglasses?</i>'}],
  sol:'<p>Les clés vont sous le paillasson (<i lang="en">under the mat</i>). Les serviettes : <i lang="en">They’re in the bathroom, on the shelf behind the door.</i> Pour le fer à repasser : <i lang="en">Is there an iron?</i> (<i lang="en">an</i> devant un son de voyelle). Pour les lunettes trouvées près de toi : <i lang="en">Are these your sunglasses?</i> (près + pluriel = <i lang="en">these</i>, verbe <i lang="en">are</i> devant le sujet).</p>'},
]},

/* ============================== 5. Daily routine ============================== */
{subj:'en', sem:'a1', id:'en-a1-routine', o:5, h:'Daily routine', p:'Raconter sa journée et celle des autres : le présent simple et son <i lang="en">-s</i> à la 3e personne, l’heure, les jours et les adverbes de fréquence.', steps:[
 {kind:'Écoute', h:'Deux journées très différentes',
  p:`<p>À la fin de cette unité, tu sauras raconter ta journée et celle des autres, dire l’heure, et dire à quelle fréquence tu fais les choses.</p>
<p>Ella retrouve son collègue Max à la machine à café, un lundi matin. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> à quelle heure Max se lève-t-il&nbsp;?</p>`,
  audio:[['Ella','Morning, Max! You look tired.'],['Max','I am! I get up at half past five every day.'],['Ella','Half past five? Why so early?'],['Max','I live in Brighton, so I take the train at a quarter past six. It’s a long journey.'],['Ella','Oh dear. I live near the office. I get up at eight and I usually walk to work.'],['Max','Lucky you! I never have breakfast at home. I just buy a coffee at the station.'],['Ella','And in the evening?'],['Max','I get home at seven, I cook dinner and I go to bed at ten. But my flatmate plays video games until two in the morning!'],['Ella','Oh no!'],['Max','He’s a DJ. He works at night and he sleeps all day.']], cache:true,
  opts:['À 6 h 15','À 5 h 30','À 8 h','À 7 h'], ans:1,
  why:'<i lang="en">I get up at half past five</i> : à 5 h 30 (<i lang="en">half past</i> = et demie). À 6 h 15 (<i lang="en">a quarter past six</i>), il prend le train ; c’est Ella qui se lève à 8 h.'},

 {kind:'Vocabulaire', h:'Les gestes du quotidien',
  p:`<p>Voici les expressions pour raconter une journée, du réveil au coucher. Touche une ligne pour l’entendre, puis répète-la. Elles entrent dans ta <b>révision du vocabulaire</b>.</p>`,
  mots:[['to wake up','se réveiller','I wake up at seven.'],['to get up','se lever','I get up at half past seven.'],['to have a shower','prendre une douche','I have a shower in the morning.'],['to have breakfast','prendre le petit-déjeuner','We have breakfast at eight.'],['to go to work','aller au travail','I go to work by bus.'],['to start work / to finish work','commencer / finir le travail','I start work at nine and I finish at five.'],['to have lunch','déjeuner','I have lunch with my colleagues.'],['to get home','rentrer à la maison','I get home at six.'],['to cook dinner','préparer le dîner','My dad cooks dinner.'],['to watch TV','regarder la télé','I watch TV in the evening.'],['to go to bed','aller se coucher','I go to bed at eleven.'],['every day','tous les jours','I walk to work every day.'],['by bus / by train','en bus / en train','She goes to work by train.']],
  note:'Pour les repas, l’anglais dit <b>have</b> : <i lang="en">have breakfast, have lunch, have dinner</i>, jamais « take breakfast ». Pas d’article dans <i lang="en">go to bed, go to work</i>, et pas de <i lang="en">to</i> devant <i lang="en">home</i> : <i lang="en">I get home</i>, <i lang="en">I go home</i>. Pour la douche, les Britanniques disent <i lang="en">have a shower</i>, les Américains <i lang="en">take a shower</i>.'},

 {kind:'Pratique', h:'À toi : le matin',
  p:'Tu racontes ton matin. <b>Question :</b> comment dis-tu en anglais « Je me lève et je prends une douche. »&nbsp;?', lab:'Ta phrase', txt:X('I get up and {I |}{have|take} a shower.'),
  why:'<i lang="en">I get up and I have a shower.</i> On peut ne pas répéter <i lang="en">I</i>, et dire <i lang="en">take a shower</i> (plutôt américain).'},

 {kind:'Grammaire', h:'Le présent simple : I work, she works',
  p:`<p>Max dit <i lang="en">I <b>get up</b> at half past five</i>, et de son colocataire : <i lang="en">He <b>works</b> at night.</i> Ces phrases parlent d’habitudes, de choses qui se répètent. Pour cela, l’anglais utilise le <b>présent simple</b>.</p>
<div class="def"><p>Le présent simple, c’est la <b>base verbale</b>, le verbe sans <i lang="en">to</i> : <i lang="en">I work, you work, we work, they work</i>.<br>Une seule exception : avec <b>he, she, it</b>, et tout sujet au singulier (<i lang="en">my brother, Anna, the shop</i>), on ajoute <b>-s</b> : <i lang="en">he work<b>s</b>, she work<b>s</b>, it open<b>s</b></i>.</p></div>
<div class="idea"><p>On l’emploie pour les <b>habitudes</b> (<i lang="en">I get up at seven</i>), les <b>faits</b> durables (<i lang="en">She lives in Leeds</i>) et les vérités générales (<i lang="en">Water boils at 100 degrees</i>). Retiens l’image : le présent simple raconte le film de tous les jours, pas ce qui se passe à l’instant précis où l’on parle. Pour cela, il y a un autre temps, que tu verras plus tard.</p></div>
<div class="ex"><p><i lang="en">I start work at nine. My sister start<b>s</b> at eight.</i><br><i lang="en">We live in Geneva. Our friend Paul live<b>s</b> in Bern.</i><br><i lang="en">The shop open<b>s</b> at ten.</i></p></div>
<div class="warn"><p>Le <b>-s</b> est la faute la plus fréquente de l’anglais, même à un bon niveau : on l’oublie avec <i lang="en">he/she/it</i> (« she work »), ou on l’ajoute là où il ne faut pas (« they works », « I gets up »). Pense : « une seule personne ou chose dont je parle → -s ». Attention : <i lang="en">people</i> et <i lang="en">my parents</i> sont des pluriels, donc pas de -s : <i lang="en">My parents live in Lyon.</i></p></div>`,
  audio:'I start work at nine. My sister starts at eight. We live in Geneva. Our friend Paul lives in Bern.'},

 {kind:'Méthode', h:'Écrire le verbe avec he, she, it',
  p:`<p><b>Quand :</b> chaque fois que le sujet est <i lang="en">he, she, it</i> ou un nom au singulier. <b>Pourquoi ça marche :</b> le -s s’ajoute presque toujours tel quel ; l’orthographe ne s’adapte que pour garder un mot prononçable. <b>Comment :</b> regarde la fin du verbe.</p>
<ul><li>Cas général : <b>+s</b> → <i lang="en">work → works, play → plays, read → reads</i>.</li><li>Verbe en <b>-s, -sh, -ch, -x</b> ou <b>-o</b> : <b>+es</b> → <i lang="en">watch → watches, finish → finishes, go → goes, do → does</i>.</li><li>Consonne + <b>y</b> : <b>y → ies</b> → <i lang="en">study → studies, fly → flies</i>. Mais voyelle + y garde le y : <i lang="en">play → plays, buy → buys</i>.</li><li>Un seul irrégulier : <b>have → has</b>.</li></ul>`,
  demo:{enonce:'Récris en parlant de Max (<i lang="en">he</i>) : <i lang="en">I go to work by train, I have a coffee, I study Spanish and I finish at six.</i>',
   etapes:[{f:'<i lang="en">go</i> finit par -o → <b>+es</b> : <i lang="en">he goes</i>.',w:'Même règle pour <i lang="en">do → does</i>.'},
    {f:'<i lang="en">have</i> est l’irrégulier → <i lang="en">he <b>has</b></i>.',w:'Jamais « haves ».'},
    {f:'<i lang="en">study</i> : consonne (d) + y → <b>ies</b> : <i lang="en">he studies</i>.',w:'Le y devient i, puis on ajoute -es.'},
    {f:'<i lang="en">finish</i> finit par -sh → <b>+es</b> : <i lang="en">he finishes</i>.',w:'Sans le e, « finishs » serait imprononçable.'}],
   conclusion:'<i lang="en">Max goes to work by train, he has a coffee, he studies Spanish and he finishes at six.</i>'}},

 {kind:'Pratique', h:'À toi : le bon -s',
  p:'Complète avec le verbe <i lang="en">watch</i> au présent simple. <b>Question :</b> quel mot manque dans <i lang="en">My brother ___ TV every evening.</i>&nbsp;?', lab:'Le verbe', txt:['watches'],
  why:'<i lang="en">My brother</i> = <i lang="en">he</i>, donc -s ; et <i lang="en">watch</i> finit par -ch, donc <b>-es</b> : <i lang="en">watches</i>.'},

 {kind:'Pratique', h:'À toi : parle de ta sœur',
  p:'Récris la phrase en commençant par <i lang="en">My sister</i>. <b>Question :</b> que devient <i lang="en">I study medicine and I go to the gym on Fridays.</i>&nbsp;?', lab:'Ta phrase', txt:X('My sister studies medicine and {she |}goes to the gym on Fridays.'),
  why:'<i lang="en">study → studies</i> (consonne + y) et <i lang="en">go → goes</i> (-o) : <i lang="en">My sister studies medicine and she goes to the gym on Fridays.</i>'},

 {kind:'Prononciation', h:'Le -s : /s/, /z/ ou /ɪz/',
  p:`<p>En français, le -s final est presque toujours muet. En anglais, celui de la 3e personne <b>s’entend</b>, et il a trois prononciations. Si tu ne le prononces pas, ton interlocuteur croit que tu as fait la faute.</p>
<div class="def"><ul><li><b>/s/</b> (« sss ») après les sons sourds <b>p, t, k, f</b> : <i lang="en">works, stops, gets, likes</i>.</li><li><b>/z/</b> (« zzz ») après une voyelle ou un son vibrant : <i lang="en">plays, goes, lives, reads, comes</i>. C’est le cas le plus fréquent.</li><li><b>/ɪz/</b>, une syllabe en plus (« iz »), après les sons sifflants <b>s, z, sh, ch, j</b> : <i lang="en">watches, finishes, uses, changes</i>.</li></ul></div>
<div class="warn"><p>Deux verbes changent aussi de voyelle : <i lang="en">does</i> se dit « deuz », et <i lang="en">says</i> se dit « sèz ». Et <i lang="en">watches</i> a deux syllabes : « wo-tchiz », pas « wotch ».</p></div>`,
  audio:'works, gets, likes. plays, goes, lives. watches, finishes, uses. She works, he plays, and it finishes at six.'},

 {kind:'Vocabulaire', h:'L’heure et les jours',
  p:`<p>Une routine, ce sont des heures et des jours. Touche chaque ligne pour l’entendre.</p>`,
  mots:[['What time is it?','Quelle heure est-il ?','What time is it? – It’s ten o’clock.'],['It’s seven o’clock.','Il est sept heures.'],['half past seven','sept heures et demie (7 h 30)','I get up at half past seven.'],['quarter past seven','sept heures et quart (7 h 15)'],['quarter to eight','huit heures moins le quart (7 h 45)'],['in the morning / afternoon / evening','le matin / l’après-midi / le soir','I work in the morning.'],['at night','la nuit','He works at night.'],['Monday, Tuesday, Wednesday','lundi, mardi, mercredi'],['Thursday, Friday, Saturday, Sunday','jeudi, vendredi, samedi, dimanche'],['on Monday / on Mondays','lundi / le lundi (chaque lundi)','I go swimming on Mondays.'],['at the weekend','le week-end','I sleep a lot at the weekend.']],
  note:'Les jours prennent une <b>majuscule</b> et la préposition <b>on</b> ; l’heure prend <b>at</b> (<i lang="en">at seven</i>) ; les moments de la journée prennent <b>in the</b>, sauf <i lang="en">at night</i>. <i lang="en">At the weekend</i> est britannique, les Américains disent <i lang="en">on the weekend</i>. <i lang="en">Wednesday</i> se prononce « wènz-dèï » : le premier d est muet.'},

 {kind:'Méthode', h:'Dire l’heure : past et to',
  p:`<p><b>Quand :</b> pour donner une heure ou comprendre celle qu’on te donne. <b>Pourquoi ça marche :</b> comme en français (« neuf heures moins vingt »), on compte les minutes <b>après</b> l’heure pleine pendant la première demi-heure, puis les minutes qui <b>manquent</b> avant l’heure suivante. <b>Comment :</b></p>
<ul><li>Heure pile : <i lang="en">It’s nine <b>o’clock</b>.</i></li><li>De 1 à 30 minutes : minutes + <b>past</b> + heure : <i lang="en">ten past nine</i> (9 h 10), <i lang="en">quarter past nine</i> (9 h 15), <i lang="en">half past nine</i> (9 h 30).</li><li>De 31 à 59 minutes : (60 − minutes) + <b>to</b> + heure <b>suivante</b> : <i lang="en">twenty to ten</i> (9 h 40), <i lang="en">quarter to ten</i> (9 h 45).</li><li>Plus simple et toujours correct, comme à la gare : on lit les chiffres, <i lang="en">nine forty</i> (9 h 40). À l’oral, on compte de 1 à 12 et on précise <i lang="en">in the morning / in the evening</i>, ou <b>a.m.</b> (avant midi) et <b>p.m.</b> (après midi).</li></ul>`,
  demo:{enonce:'Dis de deux façons l’heure <b>20:40</b>.',
   etapes:[{f:'20 h, c’est 8 heures du soir : on parlera de <i lang="en">eight</i> et de <i lang="en">p.m.</i> ou <i lang="en">in the evening</i>.',w:'À l’oral, on utilise surtout les heures de 1 à 12.'},
    {f:'40 minutes, c’est plus d’une demi-heure → on compte ce qui manque : 60 − 40 = <b>20</b>, donc <i lang="en">twenty <b>to</b></i>.',w:'Après la demi-heure, on passe de <i lang="en">past</i> à <i lang="en">to</i>.'},
    {f:'Avec <i lang="en">to</i>, on nomme l’heure <b>suivante</b> : <i lang="en">twenty to <b>nine</b></i>.',w:'Le piège : dire « twenty to eight », qui voudrait dire 7 h 40.'},
    {f:'Version chiffres : <i lang="en">eight forty p.m.</i>',w:'C’est ce qu’on entend dans les gares et les aéroports.'}],
   conclusion:'<i lang="en">It’s twenty to nine in the evening.</i> = <i lang="en">It’s eight forty p.m.</i>'},
  note:'<b>Piège britannique :</b> à l’oral, <i lang="en">half seven</i> veut dire 7 h 30 (<i lang="en">half past seven</i>), pas 6 h 30. Les Américains disent aussi <i lang="en">a quarter after nine</i> pour 9 h 15.'},

 {kind:'Écoute', h:'Quelle heure ?',
  p:'Écoute l’annonce en gare et écris l’heure de départ du train en chiffres (par exemple <b>9:10</b>). <b>Question :</b> à quelle heure part le train pour Oxford&nbsp;?', audio:'The next train to Oxford leaves at twenty-five to eleven.', cache:true, lab:'Heure', txt:['10:35','10h35','10 h 35','22:35','22h35'],
  why:'<i lang="en">twenty-five to eleven</i> : il manque 25 minutes pour arriver à 11 h, donc 10 h 35.'},

 {kind:'Grammaire', h:'Les adverbes de fréquence',
  p:`<p>Ella dit <i lang="en">I <b>usually</b> walk to work</i>, et Max <i lang="en">I <b>never</b> have breakfast at home</i>. Pour dire à quelle fréquence on fait quelque chose, on ajoute un adverbe de fréquence.</p>
<div class="def"><p><b>always</b> (toujours, 100 %) · <b>usually</b> (d’habitude, 90 %) · <b>often</b> (souvent, 70 %) · <b>sometimes</b> (parfois, 50 %) · <b>rarely</b> (rarement, 10 %) · <b>never</b> (jamais, 0 %)</p></div>
<div class="idea"><p>La place est fixe, et c’est là que le français trompe. L’adverbe se met <b>avant le verbe</b> : <i lang="en">I <b>often</b> drink tea</i>, pas « I drink often tea ». Mais il se met <b>après</b> <i lang="en">be</i> : <i lang="en">I’m <b>always</b> late.</i> Les expressions plus longues, <i lang="en">every day</i>, <i lang="en">once a week</i> (une fois par semaine), <i lang="en">twice a month</i> (deux fois par mois), vont à la <b>fin</b> de la phrase.</p></div>
<div class="ex"><p><i lang="en">She <b>usually</b> gets up at seven.</i><br><i lang="en">We are <b>never</b> at home on Sundays.</i><br><i lang="en">I go to the cinema <b>once a month</b>.</i></p></div>
<div class="warn"><p><i lang="en">never</i> est déjà négatif : <i lang="en">I never eat meat</i>, sans <i lang="en">not</i>. Le -s reste sur le verbe : <i lang="en">He always <b>goes</b></i>. Seul <i lang="en">sometimes</i> peut aussi ouvrir la phrase : <i lang="en">Sometimes I work at home.</i></p></div>`,
  audio:'She usually gets up at seven. We are never at home on Sundays. I go to the cinema once a month.'},

 {kind:'Méthode', h:'Placer l’adverbe de fréquence',
  p:`<p><b>Quand :</b> dès que tu ajoutes <i lang="en">always, usually, often, sometimes, rarely</i> ou <i lang="en">never</i> à une phrase. <b>Pourquoi ça marche :</b> l’adverbe se colle juste devant l’action qu’il décrit ; <i lang="en">be</i> n’est pas une action, alors l’adverbe se met juste après lui. <b>Comment :</b></p>
<ol><li>Trouve le verbe conjugué.</li><li>Si c’est <i lang="en">am, is, are</i> → l’adverbe se place <b>après</b>.</li><li>Sinon → l’adverbe se place <b>juste avant</b> le verbe, qui garde son -s.</li></ol>`,
  demo:{enonce:'Ajoute l’adverbe entre parenthèses : a) <i lang="en">Tom is tired in the morning.</i> (always) ; b) <i lang="en">Tom has lunch at his desk.</i> (often)',
   etapes:[{f:'a) Le verbe est <i lang="en">is</i>, une forme de <i lang="en">be</i> → l’adverbe après : <i lang="en">Tom is <b>always</b> tired in the morning.</i>',w:'Avec <i lang="en">be</i>, l’adverbe suit le verbe.'},
    {f:'b) Le verbe est <i lang="en">has</i>, une action → l’adverbe avant : <i lang="en">Tom <b>often</b> has lunch at his desk.</i>',w:'« Tom has often lunch » est un calque du français.'},
    {f:'Vérifie le -s : il reste sur <i lang="en">has</i>, l’adverbe ne change pas.',w:'L’adverbe est invariable.'}],
   conclusion:'<i lang="en">Tom is always tired in the morning. Tom often has lunch at his desk.</i>'}},

 {kind:'Pratique', h:'Remets dans l’ordre',
  p:'Touche les mots dans le bon ordre pour dire que ton père cuisine souvent le dîner le dimanche.',
  ordre:['My','father','often','cooks','dinner','on','Sundays.'],
  why:'<i lang="en">My father often cooks dinner on Sundays.</i> L’adverbe <i lang="en">often</i> se place juste avant le verbe <i lang="en">cooks</i>, et le moment va à la fin.'},

 {kind:'Pratique', h:'À toi : souvent du thé',
  p:'<b>Question :</b> comment dis-tu en anglais « Je bois souvent du thé le matin. »&nbsp;?', lab:'Ta phrase', txt:X('I often {drink|have} tea in the morning{s|}.','In the morning{s|}{,|} I often {drink|have} tea.'),
  why:'<i lang="en">I often drink tea in the morning.</i> L’adverbe avant le verbe. « Du thé » se dit simplement <i lang="en">tea</i>, sans article.'},

 {kind:'Pratique', h:'Corrige la phrase',
  p:'Cette phrase contient deux fautes : <i lang="en">He go always to work by bus.</i> <b>Question :</b> comment s’écrit-elle correctement&nbsp;?', lab:'Ta phrase', txt:['He always goes to work by bus.'],
  why:'Deux corrections : le -s de la 3e personne (<i lang="en">go → goes</i>) et la place de l’adverbe, avant le verbe : <i lang="en">He always goes to work by bus.</i>'},

 {kind:'Lecture', h:'La journée d’une boulangère',
  p:`<p>Lis ce portrait paru dans un journal local, puis réponds. Tu peux aussi l’écouter. <i lang="en">Bakery</i> = boulangerie, <i lang="en">customers</i> = clients.</p>
<div class="blk" data-t="A day in the life"><p lang="en">Grace is a baker in Bath. Her day is very different from other people’s days. She gets up at three o’clock in the morning. Yes, three! She has a quick shower, drinks a big cup of tea and walks to the bakery. She starts work at half past three and makes bread and cakes. The shop opens at seven, and her first customers are usually builders and nurses. Grace finishes work at one o’clock. She has lunch, and then she sleeps for two hours. In the evening, she sometimes meets friends, but she never goes out late. She always goes to bed at nine. “I love my job,” she says, “but I never see the end of a film!”</p></div>
<p><b>Question :</b> pourquoi Grace ne voit-elle jamais la fin d’un film&nbsp;?</p>`,
  audio:'Grace is a baker in Bath. Her day is very different from other people’s days. She gets up at three o’clock in the morning. Yes, three! She has a quick shower, drinks a big cup of tea and walks to the bakery. She starts work at half past three and makes bread and cakes. The shop opens at seven, and her first customers are usually builders and nurses. Grace finishes work at one o’clock. She has lunch, and then she sleeps for two hours. In the evening, she sometimes meets friends, but she never goes out late. She always goes to bed at nine. I love my job, she says, but I never see the end of a film!',
  opts:['Elle travaille le soir.','Elle n’a pas de télévision.','Elle se couche toujours à 21 heures.','Elle sort tous les soirs avec des amis.'], ans:2,
  why:'<i lang="en">She always goes to bed at nine</i> : elle se couche toujours à 21 h, car elle se lève à 3 h. Elle voit parfois des amis le soir (<i lang="en">sometimes</i>), mais ne sort jamais tard (<i lang="en">never goes out late</i>).'},

 {kind:'Dictée', h:'Dictée : le matin de Lisa',
  p:'Écoute et écris exactement la phrase. Tu peux réécouter autant que tu veux, et utiliser « Plus lentement ».',
  dictee:'Lisa usually gets up at half past six.',
  why:'Vérifie le -s de <i lang="en">gets</i>, la place de <i lang="en">usually</i> (avant le verbe) et <i lang="en">half past six</i> (6 h 30).'},

 {kind:'Oral', h:'Répète après le modèle',
  p:`<p>Écoute la phrase, puis dis-la à voix haute. Fais bien entendre les trois -s : /z/ dans <i lang="en">goes</i>, /ɪz/ (une syllabe en plus) dans <i lang="en">watches</i>, /s/ dans <i lang="en">works</i>.</p>`,
  dire:'My sister goes to bed late, watches TV and works at night.'},

 {kind:'Oral', h:'Raconte ta journée',
  p:`<p>À toi de parler, pendant 45 secondes à 1 minute. Raconte une journée typique : à quelle heure tu te lèves, ce que tu fais le matin, l’après-midi et le soir, et à quelle fréquence. Puis dis une ou deux phrases sur la journée de quelqu’un d’autre (avec <i lang="en">he</i> ou <i lang="en">she</i>). Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'On weekdays, I get up at seven o’clock. I have a shower and I usually have breakfast at half past seven. I go to work by bus. I start at nine and I finish at five. I often have lunch with my colleagues. In the evening, I cook dinner and I sometimes watch TV. I go to bed at eleven. My brother is different: he gets up at ten and he never has breakfast!',
   criteres:['J’ai donné au moins trois heures (at seven, at half past seven…)','J’ai utilisé au moins deux adverbes de fréquence, bien placés','J’ai utilisé les moments de la journée (in the morning, in the evening…)','J’ai parlé de quelqu’un d’autre avec un verbe en -s, bien prononcé']}},

 {kind:'Écriture', h:'Ta journée type',
  p:'Un correspondant anglophone te demande à quoi ressemble ta semaine. Écris-lui (au moins 40 mots) : ta journée type avec des heures, ce que tu fais certains jours, au moins deux adverbes de fréquence, et une phrase sur la routine d’un proche.',
  ecrire:{min:40, modele:'Hi Sam! On weekdays I get up at half past six. I have a shower and I usually have breakfast with my sister. I start work at eight. On Wednesdays I finish at three, so I often go swimming. I never watch TV in the evening. My sister always goes to bed at ten, but I go to bed at midnight!',
   criteres:[{t:'J’ai donné une heure avec at', re:'\\bat (\\d|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|half|quarter|twenty|midnight|noon)'},{t:'J’ai utilisé un adverbe de fréquence', re:'\\b(always|usually|often|sometimes|rarely|never)\\b'},{t:'J’ai cité un jour ou le week-end', re:'\\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekday|weekend)s?\\b'},{t:'J’ai parlé d’un proche avec he ou she', re:'\\b(he|she|my (sister|brother|mother|father|mum|dad|wife|husband|friend|flatmate|partner|son|daughter))\\b'},'J’ai mis le -s au verbe quand le sujet est he, she ou un nom singulier','J’ai placé les adverbes avant le verbe, mais après am, is, are']}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>Présent simple</b> = habitudes et faits : base verbale (<i lang="en">I work, they work</i>), <b>-s</b> avec <i lang="en">he, she, it</i> (<i lang="en">she works</i>).</li><li>Orthographe : <i lang="en">watches, finishes, goes, does</i> (+es) ; <i lang="en">studies</i> (consonne + y) mais <i lang="en">plays</i> ; <i lang="en">have → has</i>.</li><li>Prononciation du -s : /s/ <i lang="en">works</i>, /z/ <i lang="en">plays</i>, /ɪz/ <i lang="en">watches</i> ; <i lang="en">does</i> « deuz », <i lang="en">says</i> « sèz ».</li><li>L’heure : <i lang="en">o’clock</i> ; minutes + <i lang="en">past</i> (jusqu’à la demie) ; (60 − minutes) + <i lang="en">to</i> + heure suivante. <i lang="en">half past seven</i> = 7 h 30 = <i lang="en">half seven</i> (oral britannique).</li><li>Prépositions : <i lang="en">at</i> + heure, <i lang="en">on</i> + jour (majuscule), <i lang="en">in the morning/afternoon/evening</i>, <i lang="en">at night</i>, <i lang="en">at the weekend</i>.</li><li>Adverbes : <i lang="en">always, usually, often, sometimes, rarely, never</i>, <b>avant</b> le verbe, <b>après</b> <i lang="en">be</i>. <i lang="en">every day, once a week</i> à la fin.</li><li>Repas avec <b>have</b> ; <i lang="en">go to bed, go to work, get home</i> sans article.</li></ul></div>`},

 {kind:'Mission', h:'Trouver un moment pour se voir',
  p:'Ton amie Jess appelle son ami Sam pour prendre un café ensemble cette semaine. Écoute leur conversation, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Jess','Hi Sam! Are you free for a coffee this week?'],['Sam','Yes, but I’m very busy. I work from Monday to Friday, and I start at eight.'],['Jess','What about lunch?'],['Sam','I usually have lunch at my desk. But on Wednesdays I finish at half past three.'],['Jess','Great! I have a yoga class on Wednesdays at five. So, Wednesday at four?'],['Sam','Perfect. Wednesday at four, at the café next to the station.']], cache:true,
  parts:[
   {q:'a) Quel jour Sam finit-il plus tôt&nbsp;?', opts:['Le lundi','Le mercredi','Le vendredi','Le samedi'], ans:1, hint:'Cherche <i lang="en">on …s I finish at…</i>', why:'<i lang="en">On Wednesdays I finish at half past three</i> : le mercredi.'},
   {q:'b) À quelle heure finit-il ce jour-là&nbsp;? Écris l’heure en chiffres (par exemple 9:10).', lab:'Heure', txt:['15:30','15h30','15 h 30','3:30','3h30','3:30 pm','3:30 p.m.'], hint:'<i lang="en">half past</i> = et demie.', why:'<i lang="en">half past three</i> = 3 h 30 de l’après-midi, soit 15 h 30.'},
   {q:'c) Où Sam déjeune-t-il d’habitude&nbsp;? Réponds en anglais, en commençant par <i lang="en">He usually…</i>', lab:'Ta phrase', txt:X('He usually {has lunch|has his lunch|eats lunch|eats} at his desk.'), hint:'Sam dit <i lang="en">I usually have lunch…</i> : passe à <i lang="en">he</i>, et pense au -s de <i lang="en">have</i>.', why:'<i lang="en">He usually has lunch at his desk.</i> <i lang="en">have</i> devient <i lang="en">has</i> avec <i lang="en">he</i>, et <i lang="en">my desk</i> devient <i lang="en">his desk</i>.'},
   {q:'d) Pourquoi Jess ne peut-elle pas venir à 17 heures le mercredi&nbsp;?', opts:['Elle travaille jusqu’à 18 heures.','Elle a un cours de yoga.','Elle déjeune avec Sam.','Elle prend le train.'], ans:1, hint:'Écoute ce que Jess fait <i lang="en">on Wednesdays at five</i>.', why:'<i lang="en">I have a yoga class on Wednesdays at five</i> : elle a un cours de yoga à 17 h. Ils se voient donc à 16 h.'}],
  sol:'<p lang="en">Sam: I work from Monday to Friday, and I start at eight. I usually have lunch at my desk. But on Wednesdays I finish at half past three. – Jess: I have a yoga class on Wednesdays at five. So, Wednesday at four?</p><p>Sam finit plus tôt le mercredi, à 15 h 30 (<i lang="en">half past three</i>). D’habitude, il déjeune à son bureau : <i lang="en">He usually has lunch at his desk.</i> Jess a yoga à 17 h, donc ils se retrouvent le mercredi à 16 h au café près de la gare.</p>'},

 {kind:'Mission', h:'Ta famille d’accueil',
  p:`<p>Tu pars un mois en Angleterre et tu vas vivre dans une famille. Tu reçois ce message de Karen, la mère de famille. Lis-le, puis réponds.</p>
<div class="blk" data-t="E-mail"><p lang="en">Dear Lucas, we are very happy to meet you next month! Here is a normal day in our house. We get up at seven during the week. My husband, Dave, leaves for work at half past seven. He drives a bus in the city centre. I work from home, so I’m usually in the house. The children, Amy and Josh, go to school by bike. We always have dinner together at six o’clock. Dave sometimes cooks, but he often works late. At the weekend, we never get up before nine! On Saturdays, we usually go to the market, and on Sundays Josh plays football. See you soon! Karen</p></div>`,
  parts:[
   {q:'a) Comment Amy et Josh vont-ils à l’école&nbsp;?', opts:['En bus, avec leur père','À pied','À vélo','En voiture, avec leur mère'], ans:2, hint:'Cherche <i lang="en">by…</i> dans la phrase sur les enfants.', why:'<i lang="en">go to school by bike</i> : à vélo. C’est Dave qui conduit un bus, pour son travail.'},
   {q:'b) Dave cuisine-t-il souvent&nbsp;?', opts:['Oui, il cuisine tous les soirs.','Non, il ne cuisine jamais.','Parfois seulement, car il travaille souvent tard.','Seulement le week-end.'], ans:2, hint:'Deux adverbes de fréquence dans la même phrase : <i lang="en">sometimes</i> et <i lang="en">often</i>.', why:'<i lang="en">Dave sometimes cooks, but he often works late</i> : il cuisine parfois, car il travaille souvent tard.'},
   {q:'c) Tu décris la famille à un ami. Écris en anglais : « Le week-end, ils ne se lèvent jamais avant neuf heures. »', lab:'Ta phrase', txt:X('At the weekend{,|} they never get up before nine{| o’clock}.','They never get up before nine{| o’clock} at the weekend.','On the weekend{,|} they never get up before nine{| o’clock}.','At weekends{,|} they never get up before nine{| o’clock}.'), hint:'<i lang="en">never</i> se place avant le verbe, et il suffit : pas de <i lang="en">not</i>.', why:'<i lang="en">At the weekend, they never get up before nine.</i> <i lang="en">never</i> avant <i lang="en">get up</i>, sans négation en plus ; pas de -s avec <i lang="en">they</i>.'},
   {q:'d) Écris en anglais une phrase sur le métier de Dave : « Il conduit un bus. »', lab:'Ta phrase', txt:X('{He|Dave} drives a bus{| in the city centre}.'), hint:'Sujet <i lang="en">he</i> : pense au -s.', why:'<i lang="en">He drives a bus.</i> Avec <i lang="en">he</i>, <i lang="en">drive</i> prend un -s.'},
   {q:'e) Réponds à Karen sur ta propre routine : « D’habitude, je me lève à sept heures et demie. »', lab:'Ta phrase', txt:X('I usually get up at {half past seven|seven thirty|7:30}.','Usually{,|} I get up at {half past seven|seven thirty|7:30}.','I usually wake up at {half past seven|seven thirty|7:30}.'), hint:'<i lang="en">usually</i> avant le verbe ; « et demie » = <i lang="en">half past</i>.', why:'<i lang="en">I usually get up at half past seven.</i> Pas de -s avec <i lang="en">I</i>.'}],
  sol:'<p>Les enfants vont à l’école à vélo (<i lang="en">by bike</i>). Dave cuisine parfois, mais travaille souvent tard (<i lang="en">sometimes</i>, <i lang="en">often</i>). Pour la famille : <i lang="en">At the weekend, they never get up before nine.</i> (adverbe avant le verbe, pas de -s avec <i lang="en">they</i>). Pour Dave : <i lang="en">He drives a bus.</i> (-s avec <i lang="en">he</i>). Pour toi : <i lang="en">I usually get up at half past seven.</i></p>'},
]},

/* ============================== 6. Work and questions ============================== */
{subj:'en', sem:'a1', id:'en-a1-work', o:6, h:'Work and questions', p:'Parler de son travail et poser des questions : le présent simple à la forme négative et interrogative (<i lang="en">do, does, don’t, doesn’t</i>), les réponses courtes, les métiers et les lieux de travail.', steps:[
 {kind:'Écoute', h:'Une conversation à une fête',
  p:`<p>À la fin de cette unité, tu sauras dire ce que tu fais dans la vie, ce que tu ne fais pas, et poser des questions sur le travail et les habitudes des autres.</p>
<p>Ruth et Leo se rencontrent à la fête d’un ami commun. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> quel est le métier de Ruth&nbsp;?</p>`,
  audio:[['Ruth','So, what do you do, Leo?'],['Leo','I’m a nurse. I work in a hospital in Manchester.'],['Ruth','Really? Do you work at night?'],['Leo','Yes, I do, one week a month. I don’t love it, but it’s OK. What about you?'],['Ruth','I’m an engineer. I work for a car company.'],['Leo','Do you travel a lot?'],['Ruth','No, I don’t. I work from home on Mondays and Fridays. But my husband travels a lot. He’s a pilot.'],['Leo','A pilot! Does he fly to New York?'],['Ruth','Yes, he does. Every week. And he doesn’t like it at all. He hates hotels!']], cache:true,
  opts:['Infirmière','Pilote','Ingénieure','Hôtesse de l’air'], ans:2,
  why:'<i lang="en">I’m an engineer. I work for a car company.</i> : Ruth est ingénieure dans une entreprise automobile. Leo est infirmier (<i lang="en">a nurse</i>) et le mari de Ruth est pilote (<i lang="en">a pilot</i>).'},

 {kind:'Vocabulaire', h:'Les métiers',
  p:`<p>Voici des métiers courants. Touche une ligne pour l’entendre, puis répète-la. Ils entrent dans ta <b>révision du vocabulaire</b>.</p>`,
  mots:[['a nurse','un infirmier, une infirmière','I’m a nurse.'],['a doctor','un médecin'],['a teacher','un enseignant, une enseignante','She’s a maths teacher.'],['an engineer','un ingénieur, une ingénieure','He’s an engineer.'],['a lawyer','un avocat, une avocate'],['an accountant','un ou une comptable'],['a shop assistant','un vendeur, une vendeuse','She’s a shop assistant in a bookshop.'],['a waiter / a waitress','un serveur / une serveuse'],['a chef','un cuisinier, une cuisinière (au restaurant)'],['a builder','un ouvrier du bâtiment, un maçon'],['a hairdresser','un coiffeur, une coiffeuse'],['a police officer','un policier, une policière'],['a receptionist','un ou une réceptionniste'],['What do you do?','Que fais-tu dans la vie ?','What do you do? – I’m a teacher.']],
  note:'On met toujours <b>a</b> ou <b>an</b> devant un métier : <i lang="en">I’m <b>a</b> teacher</i>, <i lang="en">She’s <b>an</b> engineer</i>. « I’m teacher » est une faute typique des francophones. La plupart des métiers ont une seule forme pour les hommes et les femmes. <i lang="en">A chef</i> cuisine dans un restaurant ; le chef au sens de patron se dit <i lang="en">the boss</i>.'},

 {kind:'Pratique', h:'À toi : elle est ingénieure',
  p:'<b>Question :</b> comment dis-tu en anglais « Ma sœur est ingénieure. »&nbsp;?', lab:'Ta phrase', txt:X('My sister{ is|’s} an engineer.'),
  why:'<i lang="en">My sister is an engineer.</i> L’article est obligatoire devant le métier, et c’est <i lang="en">an</i> car <i lang="en">engineer</i> commence par un son de voyelle.'},

 {kind:'Vocabulaire', h:'Où et comment on travaille',
  p:`<p>Pour dire où et comment tu travailles. Touche une ligne pour l’entendre.</p>`,
  mots:[['an office','un bureau (la pièce, le lieu)','My dad works in an office.'],['a hospital','un hôpital','Nurses work in a hospital.'],['a factory','une usine','She works in a factory.'],['to work for (a company)','travailler pour (une entreprise)','She works for a bank.'],['to work from home','travailler de chez soi','I work from home on Fridays.'],['full-time / part-time','à plein temps / à temps partiel','He works part-time.'],['a colleague','un ou une collègue','My colleagues are very nice.'],['the boss','le patron, la patronne','My boss is never late.'],['I’m a student.','Je suis étudiant(e).'],['I’m looking for a job.','Je cherche du travail.']],
  note:'On travaille <b>in</b> un lieu (<i lang="en">in a hospital, in an office</i>), <b>for</b> une entreprise (<i lang="en">for a bank</i>), <b>from home</b> chez soi. <i lang="en">Work</i> (le travail) s’emploie sans article : <i lang="en">I go to work</i>. Un emploi, un poste, c’est <i lang="en">a job</i>.'},

 {kind:'Grammaire', h:'La négation : don’t et doesn’t',
  p:`<p>Leo dit <i lang="en">I <b>don’t</b> love it</i>, et Ruth : <i lang="en">He <b>doesn’t</b> like it at all.</i> Avec <i lang="en">to be</i>, tu sais déjà ajouter <i lang="en">not</i> (<i lang="en">I’m not tired</i>). Avec les autres verbes, c’est impossible : « I not work » ou « I work not » ne sont pas de l’anglais. Il faut un petit verbe d’aide : <b>do</b>.</p>
<div class="def"><p><b>sujet + do not / does not + base verbale</b><br><i lang="en">I / you / we / they <b>don’t</b> work</i> (don’t = do not)<br><i lang="en">he / she / it <b>doesn’t</b> work</i> (doesn’t = does not)</p></div>
<div class="idea"><p><i lang="en">Do</i> est ici un <b>auxiliaire</b> : il ne veut rien dire, il porte la négation et la marque de la personne. Comme <i lang="en">does</i> porte déjà le <b>-s</b> de la 3e personne, le verbe principal revient à sa base : <i lang="en">She work<b>s</b></i> → <i lang="en">She doesn’t work</i>. Le -s ne s’écrit qu’une fois.</p></div>
<div class="ex"><p><i lang="en">I work on Saturdays.</i> → <i lang="en">I <b>don’t</b> work on Saturdays.</i><br><i lang="en">Tom lives in London.</i> → <i lang="en">Tom <b>doesn’t</b> live in London.</i><br><i lang="en">We have lunch at noon.</i> → <i lang="en">We <b>don’t</b> have lunch at noon.</i></p></div>
<div class="warn"><p>Trois fautes à éviter : « he <b>don’t</b> » (avec he, she, it, c’est <i lang="en">doesn’t</i>) ; « she doesn’t work<b>s</b> » (le -s est déjà sur <i lang="en">does</i>) ; « I don’t be » (avec <i lang="en">to be</i>, jamais de <i lang="en">do</i> : <i lang="en">I’m not a doctor</i>).</p></div>`,
  audio:'I don’t work on Saturdays. Tom doesn’t live in London. We don’t have lunch at noon.'},

 {kind:'Méthode', h:'Mettre une phrase au négatif',
  p:`<p><b>Quand :</b> pour dire qu’une habitude ou un fait n’est pas vrai. <b>Pourquoi ça marche :</b> <i lang="en">do/does</i> porte la négation et la personne ; le verbe principal n’a plus rien à porter et reste à sa base. <b>Comment :</b></p>
<ol><li>Le verbe est-il <i lang="en">am, is, are</i>&nbsp;? Alors on ajoute <i lang="en">not</i> après, et c’est fini.</li><li>Sinon, regarde le sujet : <i lang="en">he, she, it</i> ou un nom singulier → <b>doesn’t</b> ; tous les autres → <b>don’t</b>.</li><li>Remets le verbe à sa base : enlève le -s, le -es ou le -ies, et <i lang="en">has</i> redevient <i lang="en">have</i>.</li></ol>`,
  demo:{enonce:'Mets au négatif les trois verbes : <i lang="en">Kate is a doctor. She works in a hospital and she has lunch at home.</i>',
   etapes:[{f:'<i lang="en">Kate is a doctor</i> : verbe <i lang="en">to be</i> → <i lang="en">Kate <b>isn’t</b> a doctor.</i>',w:'Pas de <i lang="en">do</i> avec <i lang="en">to be</i>.'},
    {f:'<i lang="en">She works</i> : sujet <i lang="en">she</i> → <i lang="en">doesn’t</i>, et <i lang="en">works</i> redevient <i lang="en">work</i> : <i lang="en">She <b>doesn’t work</b> in a hospital.</i>',w:'Le -s passe sur <i lang="en">does</i>.'},
    {f:'<i lang="en">she has</i> : <i lang="en">has</i> est la forme en -s de <i lang="en">have</i> → <i lang="en">she <b>doesn’t have</b> lunch at home.</i>',w:'« doesn’t has » est une faute très courante.'}],
   conclusion:'<i lang="en">Kate isn’t a doctor. She doesn’t work in a hospital and she doesn’t have lunch at home.</i>'}},

 {kind:'Pratique', h:'À toi : au négatif',
  p:'Mets la phrase au négatif. <b>Question :</b> que devient <i lang="en">My brother drives a taxi.</i>&nbsp;?', lab:'Ta phrase', txt:['My brother doesn’t drive a taxi.'],
  why:'<i lang="en">My brother</i> = <i lang="en">he</i> → <i lang="en">doesn’t</i>, et le verbe revient à sa base : <i lang="en">My brother doesn’t drive a taxi.</i>'},

 {kind:'Pratique', h:'À toi : pas le lundi',
  p:'<b>Question :</b> comment dis-tu en anglais « Je ne travaille pas le lundi. »&nbsp;?', lab:'Ta phrase', txt:X('I don’t work on Monday{s|}.','I don’t work Mondays.','On Monday{s|}{,|} I don’t work.'),
  why:'<i lang="en">I don’t work on Mondays.</i> « Le lundi » (tous les lundis) se dit <i lang="en">on Mondays</i> ; <i lang="en">on Monday</i> est aussi courant.'},

 {kind:'Grammaire', h:'Les questions : Do you…? Does she…?',
  p:`<p>Ruth demande <i lang="en"><b>Do</b> you work at night?</i> et Leo : <i lang="en"><b>Does</b> he fly to New York?</i> Pour poser une question fermée (réponse oui ou non) avec un autre verbe que <i lang="en">to be</i>, on utilise encore <b>do</b>.</p>
<div class="def"><p><b>Do / Does + sujet + base verbale…?</b><br><i lang="en"><b>Do</b> you / we / they work…?</i> · <i lang="en"><b>Does</b> he / she / it work…?</i><br>Réponses courtes : <i lang="en">Yes, I <b>do</b>. / No, I <b>don’t</b>.</i> · <i lang="en">Yes, she <b>does</b>. / No, she <b>doesn’t</b>.</i></p></div>
<div class="idea"><p>C’est le même mécanisme que pour la négation : <i lang="en">do/does</i> passe <b>devant</b> le sujet, porte la question et le -s, et le verbe principal reste à sa base. Dans la réponse courte, on reprend seulement le sujet et l’auxiliaire. Un simple <i lang="en">Yes</i> ou <i lang="en">No</i> sonne sec en anglais.</p></div>
<div class="ex"><p><i lang="en">You like your job.</i> → <i lang="en"><b>Do</b> you like your job? – Yes, I do.</i><br><i lang="en">Your sister works in Paris.</i> → <i lang="en"><b>Does</b> your sister work in Paris? – No, she doesn’t.</i></p></div>
<div class="warn"><p>Le français pose souvent la question par l’intonation (« Tu travailles demain ? ») ou par inversion (« Travaille-t-il ? »). En anglais, « Works he? » est impossible. Évite aussi « Does she work<b>s</b>? », et ne réponds pas « Yes, I am » à une question avec <i lang="en">do</i> : on répond avec l’auxiliaire de la question.</p></div>`,
  audio:'Do you like your job? Yes, I do. Does your sister work in Paris? No, she doesn’t.'},

 {kind:'Méthode', h:'Poser une question avec do ou does',
  p:`<p><b>Quand :</b> pour demander si une habitude ou un fait est vrai (réponse oui ou non). <b>Pourquoi ça marche :</b> l’auxiliaire se met devant le sujet, comme <i lang="en">are</i> dans <i lang="en">Are you new?</i> ; le verbe principal ne bouge pas. <b>Comment :</b></p>
<ol><li>Le verbe est <i lang="en">am, is, are</i>&nbsp;? On inverse simplement : <i lang="en">Is she a nurse?</i></li><li>Sinon : <b>Does</b> si le sujet est <i lang="en">he, she, it</i> ou un nom singulier, <b>Do</b> dans tous les autres cas.</li><li>Écris <b>Do/Does + sujet + base verbale + reste</b>, puis le point d’interrogation.</li><li>Réponse courte : <i lang="en">Yes / No</i> + pronom + <i lang="en">do / does / don’t / doesn’t</i>.</li></ol>`,
  demo:{enonce:'Ton collègue dit <i lang="en">Mr Patel teaches maths.</i> Demande-lui si c’est vrai, puis donne les deux réponses courtes possibles.',
   etapes:[{f:'Le verbe est <i lang="en">teaches</i>, pas <i lang="en">to be</i> → il faut <i lang="en">do</i>.',w:'Pas d’inversion directe : « Teaches Mr Patel » est impossible.'},
    {f:'Sujet <i lang="en">Mr Patel</i> = <i lang="en">he</i> → <b>Does</b>.',w:'Un nom singulier compte comme <i lang="en">he</i> ou <i lang="en">she</i>.'},
    {f:'<i lang="en">Does</i> + <i lang="en">Mr Patel</i> + <i lang="en">teach</i> (base, sans -es) + <i lang="en">maths</i> : <i lang="en"><b>Does Mr Patel teach</b> maths?</i>',w:'Le -es est passé sur <i lang="en">does</i>.'},
    {f:'Réponses : <i lang="en">Yes, he does.</i> / <i lang="en">No, he doesn’t.</i>',w:'On remplace <i lang="en">Mr Patel</i> par <i lang="en">he</i>.'}],
   conclusion:'<i lang="en">Does Mr Patel teach maths? – Yes, he does. / No, he doesn’t.</i>'}},

 {kind:'Pratique', h:'À toi : une question',
  p:'Transforme la phrase en question. <b>Question :</b> que devient <i lang="en">You work at the weekend.</i>&nbsp;?', lab:'Ta question', txt:['Do you work at the weekend?'],
  why:'Sujet <i lang="en">you</i> → <i lang="en">Do</i>, puis le sujet et le verbe à la base : <i lang="en">Do you work at the weekend?</i>'},

 {kind:'Pratique', h:'À toi : la réponse courte',
  p:'Un ami te demande <i lang="en">Does your sister live in London?</i> Elle y habite bien. <b>Question :</b> quelle est ta réponse courte&nbsp;?', lab:'Ta réponse', txt:['Yes, she does.'],
  why:'<i lang="en">your sister</i> devient <i lang="en">she</i>, et on reprend l’auxiliaire de la question : <i lang="en">Yes, she does.</i> (pas « Yes, she lives » ni « Yes, she is »).'},

 {kind:'Méthode', h:'Poser une question en wh- avec do ou does',
  p:`<p>Ruth commence par <i lang="en"><b>What do you do?</b></i> Tu connais déjà les questions en wh- avec <i lang="en">to be</i> : <i lang="en">Where <b>are</b> you from?</i> Avec les autres verbes, <i lang="en">do/does</i> prend la place de <i lang="en">are/is</i>.</p>
<div class="def"><p><b>Mot interrogatif + do/does + sujet + base verbale…?</b> Moyen mnémotechnique : <b>QASI</b> = Question, Auxiliaire, Sujet, Infinitif (base verbale).</p></div>
<p><b>Quand :</b> pour demander une information (où, quand, quoi, comment). <b>Comment :</b> 1) choisis le mot interrogatif (<i lang="en">what, where, when, what time, how, who</i>) ; 2) ajoute <i lang="en">do</i> ou <i lang="en">does</i> selon le sujet ; 3) le sujet ; 4) le verbe à la base. On répond par l’information, pas par <i lang="en">Yes</i> ou <i lang="en">No</i>.</p>
<div class="warn"><p>Les calques du français : « Where works your brother? » (Où travaille ton frère&nbsp;?), « What means this word? » au lieu de <i lang="en">What <b>does</b> this word <b>mean</b>?</i>, et l’oubli de l’auxiliaire, « Where you live? ». Dans <i lang="en">What do you do?</i>, le premier <i lang="en">do</i> est l’auxiliaire, le second le verbe « faire » : la question veut dire « Quel est ton métier&nbsp;? ».</p></div>`,
  demo:{enonce:'Tu sais que <i lang="en">Emma works in Leeds</i>. Pose la question qui a pour réponse <i lang="en">In Leeds.</i>',
   etapes:[{f:'L’information cherchée est un lieu → <b>Where</b>.',w:'<i lang="en">where</i> = où.'},
    {f:'Le verbe est <i lang="en">works</i>, sujet <i lang="en">Emma</i> = <i lang="en">she</i> → auxiliaire <b>does</b>.',w:'Même choix que pour une question fermée.'},
    {f:'Q-A-S-I : <i lang="en"><b>Where</b> + <b>does</b> + <b>Emma</b> + <b>work</b>?</i>',w:'Le verbe perd son -s : il est passé sur <i lang="en">does</i>.'},
    {f:'Réponse : <i lang="en">In Leeds.</i> ou <i lang="en">She works in Leeds.</i>',w:'Pas de <i lang="en">Yes/No</i> à une question en wh-.'}],
   conclusion:'<i lang="en">Where does Emma work? – In Leeds.</i>'}},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:'Touche les mots dans le bon ordre pour demander où travaille le père de ton ami.',
  ordre:['Where','does','your','father','work?'],
  why:'Q-A-S-I : <i lang="en">Where</i> (question) + <i lang="en">does</i> (auxiliaire) + <i lang="en">your father</i> (sujet) + <i lang="en">work</i> (base verbale).'},

 {kind:'Pratique', h:'À toi : trouve la question',
  p:'Voici une réponse : <i lang="en">Emma starts work <b>at nine</b>.</i> <b>Question :</b> quelle question pose-t-on pour obtenir l’information en gras&nbsp;?', lab:'Ta question', txt:X('What time does {Emma|she} start{ work|}?','When does {Emma|she} start{ work|}?'),
  why:'Une heure → <i lang="en">What time</i> (ou <i lang="en">When</i>), puis <i lang="en">does</i>, le sujet et le verbe à la base : <i lang="en">What time does Emma start work?</i>'},

 {kind:'Prononciation', h:'Do you…? : formes faibles et intonation',
  p:`<p>À l’oral, <i lang="en">do</i> et <i lang="en">does</i> dans une question sont des mots <b>faibles</b> : on les dit vite et sans force, et l’accent tombe sur le verbe et l’information.</p>
<div class="def"><p><i lang="en">Do you</i> se prononce presque « djeu » : <i lang="en">Do you <b>work</b> here?</i><br><i lang="en">Does he</i> se prononce « deuz-i », très vite : <i lang="en">Does he <b>like</b> it?</i><br>Dans la réponse courte, au contraire, <i lang="en">do</i> et <i lang="en">does</i> sont <b>forts</b> : <i lang="en">Yes, I <b>do</b>.</i></p></div>
<div class="idea"><p>L’intonation : une question fermée (<i lang="en">Do you work here?</i>) <b>monte</b> à la fin. Une question en wh- (<i lang="en">Where do you work?</i>) <b>descend</b> à la fin. Si toutes tes questions montent, comme souvent en français, elles sonnent étonnées ou inquiètes.</p></div>`,
  audio:'Do you work here? Yes, I do. Where do you work? Does he like it? No, he doesn’t.'},

 {kind:'Lecture', h:'Trois voisins, trois métiers',
  p:`<p>Lis cet article d’un journal de quartier, puis réponds. Tu peux aussi l’écouter. <i lang="en">Salon</i> = salon de coiffure, <i lang="en">online</i> = en ligne.</p>
<div class="blk" data-t="Our street"><p lang="en">Meet three people from Mill Street. Sara is a hairdresser. She works in a small salon on the corner. She starts at nine and finishes at six, but she doesn’t work on Mondays. Her brother Omar is a chef. He works in an Italian restaurant in the city centre. He doesn’t work in the morning, but he often finishes at midnight. “I don’t see my friends very often,” he says. Their neighbour, Mrs Jones, is a teacher, but she doesn’t teach in a school. She works from home and teaches English online to students in Japan and Brazil. “Do I like my job? Yes, I do! I don’t travel, but I meet people from all over the world.”</p></div>
<p><b>Question :</b> quelle affirmation est vraie&nbsp;?</p>`,
  audio:'Meet three people from Mill Street. Sara is a hairdresser. She works in a small salon on the corner. She starts at nine and finishes at six, but she doesn’t work on Mondays. Her brother Omar is a chef. He works in an Italian restaurant in the city centre. He doesn’t work in the morning, but he often finishes at midnight. I don’t see my friends very often, he says. Their neighbour, Mrs Jones, is a teacher, but she doesn’t teach in a school. She works from home and teaches English online to students in Japan and Brazil. Do I like my job? Yes, I do! I don’t travel, but I meet people from all over the world.',
  opts:['Sara travaille le lundi.','Omar finit souvent à minuit.','Mrs Jones enseigne dans une école au Japon.','Omar travaille le matin.'], ans:1,
  why:'<i lang="en">He often finishes at midnight</i> : Omar finit souvent à minuit. Sara ne travaille pas le lundi (<i lang="en">she doesn’t work on Mondays</i>), Omar ne travaille pas le matin, et Mrs Jones enseigne en ligne, depuis chez elle.'},

 {kind:'Dictée', h:'Dictée : une question',
  p:'Écoute et écris exactement la phrase. Tu peux réécouter autant que tu veux, et utiliser « Plus lentement ».',
  dictee:'Does your brother work in a hospital? No, he doesn’t.',
  why:'Question avec <i lang="en">Does</i> et le verbe à la base (<i lang="en">work</i>, sans -s), puis réponse courte <i lang="en">No, he doesn’t</i>.'},

 {kind:'Oral', h:'Répète après le modèle',
  p:`<p>Écoute, puis redis ces deux répliques. Fais <b>monter</b> la voix à la fin de la question fermée, et dis <i lang="en">Do you</i> vite et léger : « djeu ».</p>`,
  dire:'Do you work from home? No, I don’t. I work in an office.'},

 {kind:'Oral', h:'Parle de ton travail',
  p:`<p>À toi de parler, pendant 45 secondes à 1 minute. Dis ce que tu fais (métier ou études), où tu travailles ou étudies, ce que tu fais et ce que tu ne fais pas (au moins deux négations), puis parle du métier d’un proche. Termine en posant deux questions à ton interlocuteur. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'I’m an accountant. I work for a small company in Lausanne. I work full-time, from Monday to Friday. I don’t work at the weekend, and I don’t travel for my job. I usually work in the office, but I work from home on Fridays. My wife is a nurse. She works in a hospital, and she sometimes works at night. She doesn’t like it! And you? What do you do? Do you like your job?',
   criteres:['J’ai dit mon métier ou mes études avec a ou an (I’m a…)','J’ai dit où je travaille (in, for, from home)','J’ai fait au moins deux phrases négatives avec don’t ou doesn’t','J’ai parlé d’un proche avec un verbe en -s','J’ai posé une question en wh- et une question fermée avec do']}},

 {kind:'Écriture', h:'Ton profil professionnel',
  p:'Tu t’inscris sur un site d’échange linguistique entre professionnels. Écris ton profil (au moins 40 mots) : ton métier ou tes études, où tu travailles, tes horaires, au moins une chose que tu ne fais pas, et termine par une question au lecteur sur son travail.',
  ecrire:{min:40, modele:'Hi! I’m Nora and I’m a software developer. I work for a bank in Zurich. I start at half past eight and I finish at five. I don’t work on Fridays, and I don’t wear a suit! My brother is a chef, so he doesn’t have free evenings. What about you? What do you do? Do you work from home?',
   criteres:[{t:'J’ai dit mon métier avec a ou an', re:'\\b(i am|i[’\']m) (a|an) \\w+'},{t:'J’ai utilisé don’t ou doesn’t', re:'\\b(don[’\']t|doesn[’\']t|do not|does not)\\b'},{t:'J’ai posé une question avec do ou does', re:'\\b(do|does)\\b[^.!?]*\\?'},{t:'J’ai dit où ou pour qui je travaille', re:'\\bwork(s)? (in|for|from|at)\\b'},'J’ai mis le verbe à la base après don’t, doesn’t, do et does']}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li>Métier : <i lang="en">I’m <b>a</b> nurse, she’s <b>an</b> engineer</i> (article obligatoire). <i lang="en">What do you do?</i> = Que fais-tu dans la vie&nbsp;?</li><li>Lieux : <i lang="en">work in a hospital / in an office</i>, <i lang="en">work for a company</i>, <i lang="en">work from home</i>, <i lang="en">full-time / part-time</i>.</li><li>Négation : <i lang="en">I/you/we/they <b>don’t</b> + base</i> ; <i lang="en">he/she/it <b>doesn’t</b> + base</i>. Jamais « he don’t », ni « doesn’t works », ni <i lang="en">do</i> avec <i lang="en">to be</i>.</li><li>Question fermée : <i lang="en"><b>Do/Does</b> + sujet + base…?</i> Réponses courtes : <i lang="en">Yes, I do. / No, she doesn’t.</i></li><li>Question en wh- (QASI) : <i lang="en">Where <b>does</b> she <b>work</b>? What time <b>do</b> you <b>start</b>? What <b>does</b> this word <b>mean</b>?</i></li><li>Oral : <i lang="en">Do you</i> faible (« djeu »), réponse courte forte ; question fermée qui monte, question en wh- qui descend.</li></ul></div>`},

 {kind:'Mission', h:'Au téléphone avec une agence',
  p:'Marco cherche un nouvel emploi à Londres. Il appelle une agence de recrutement. Écoute la conversation, puis réponds aux questions une par une. Tu peux réécouter à tout moment.',
  audio:[['Agent','Good morning, Jobs Plus. How can I help?'],['Marco','Hello. I’m looking for a job. I’m a chef.'],['Agent','OK. Do you work at the moment?'],['Marco','Yes, I do. I work in a hotel, but only part-time. I work three days a week.'],['Agent','I see. Do you speak French?'],['Marco','Yes, I do. I’m from Lausanne, in Switzerland. I speak French, Italian and English.'],['Agent','Great. Do you have a driving licence?'],['Marco','No, I don’t. I go everywhere by bike.'],['Agent','No problem. There’s a job in a restaurant in the city centre. It’s full-time.']], cache:true,
  parts:[
   {q:'a) Quel est le métier de Marco&nbsp;?', opts:['Serveur','Réceptionniste','Cuisinier','Chauffeur'], ans:2, hint:'Écoute sa première réplique : <i lang="en">I’m a…</i>', why:'<i lang="en">I’m a chef</i> : il est cuisinier. Il travaille aujourd’hui dans un hôtel.'},
   {q:'b) Combien de jours par semaine travaille-t-il en ce moment&nbsp;? Écris le nombre en chiffres.', lab:'Jours', txt:X('3','three','{3|three} days{| a week}'), hint:'Il travaille à temps partiel : <i lang="en">part-time</i>.', why:'<i lang="en">I work three days a week</i> : trois jours par semaine.'},
   {q:'c) Écris en anglais, à la 3e personne : « Il n’a pas de permis de conduire. »', lab:'Ta phrase', txt:X('{He|Marco} doesn’t have a driving {licence|license}.'), hint:'Sujet <i lang="en">he</i> → <i lang="en">doesn’t</i>, et <i lang="en">has</i> redevient <i lang="en">have</i>.', why:'<i lang="en">He doesn’t have a driving licence.</i> Après <i lang="en">doesn’t</i>, le verbe est à la base : <i lang="en">have</i>, pas <i lang="en">has</i>. (<i lang="en">licence</i> en britannique, <i lang="en">license</i> en américain)'},
   {q:'d) Quel poste l’agence lui propose-t-elle&nbsp;?', opts:['Un poste à temps partiel dans un hôtel','Un poste à plein temps dans un restaurant du centre','Un poste de chauffeur-livreur','Un poste en Suisse'], ans:1, hint:'Écoute la dernière réplique de l’agent.', why:'<i lang="en">There’s a job in a restaurant in the city centre. It’s full-time.</i> : un poste à plein temps dans un restaurant du centre-ville.'}],
  sol:'<p lang="en">Marco: I’m a chef. I work in a hotel, but only part-time. I work three days a week. I speak French, Italian and English. – Do you have a driving licence? – No, I don’t. I go everywhere by bike.</p><p>Marco est cuisinier, il travaille trois jours par semaine à l’hôtel. Il n’a pas le permis : <i lang="en">He doesn’t have a driving licence</i> (<i lang="en">doesn’t</i> + base). L’agence lui propose un poste à plein temps dans un restaurant du centre-ville.</p>'},

 {kind:'Mission', h:'Une soirée de networking',
  p:'À une soirée professionnelle, tu fais la connaissance de Hannah. Tu lui poses des questions, tu écoutes ses réponses, puis ton chef te demande de lui parler d’elle. Réponds aux questions une par une ; l’enregistrement contient la réponse de Hannah à ta première question.',
  audio:[['Hannah','I’m an architect. I work for a small company in Edinburgh. I work from Monday to Thursday, so I don’t work on Fridays. On Fridays I go climbing with my brother. And I don’t speak German, sorry, only English and a little Spanish!']], cache:true,
  parts:[
   {q:'a) Avant d’écouter : écris la question que tu poses à Hannah pour savoir quel est son métier.', lab:'Ta question', txt:X('What do you do{| for a living}?','{What’s|What is} your job?'), hint:'C’est la question de la fête, avec deux fois <i lang="en">do</i>.', why:'<i lang="en">What do you do?</i> : le premier <i lang="en">do</i> est l’auxiliaire, le second le verbe « faire ».'},
   {q:'b) Écoute sa réponse. Que fait Hannah le vendredi&nbsp;?', opts:['Elle travaille de chez elle.','Elle fait de l’escalade avec son frère.','Elle prend un cours d’allemand.','Elle travaille à Édimbourg.'], ans:1, hint:'Cherche <i lang="en">On Fridays…</i>', why:'<i lang="en">On Fridays I go climbing with my brother</i> : elle fait de l’escalade. Elle ne travaille pas le vendredi.'},
   {q:'c) Ton chef veut savoir quand elle est libre. Écris en anglais : « Elle ne travaille pas le vendredi. »', lab:'Ta phrase', txt:X('{She|Hannah} doesn’t work on Friday{s|}.','On Friday{s|}{,|} {she|Hannah} doesn’t work.'), hint:'Sujet <i lang="en">she</i> → <i lang="en">doesn’t</i> + base verbale.', why:'<i lang="en">She doesn’t work on Fridays.</i> Le -s passe sur <i lang="en">does</i>, <i lang="en">work</i> reste à la base.'},
   {q:'d) Ton chef te demande en anglais si elle parle allemand. Écris sa question : « Est-ce qu’elle parle allemand ? »', lab:'Sa question', txt:X('Does {she|Hannah} speak German?'), hint:'Question fermée, sujet <i lang="en">she</i>.', why:'<i lang="en">Does she speak German?</i> Réponse d’après l’enregistrement : <i lang="en">No, she doesn’t.</i>'},
   {q:'e) Ton chef veut aussi savoir dans quelle ville elle travaille. Écris sa question en anglais : « Où travaille-t-elle ? »', lab:'Sa question', txt:X('Where does {she|Hannah} work?'), hint:'QASI : mot interrogatif, auxiliaire, sujet, base verbale. Pas d’inversion à la française.', why:'<i lang="en">Where does she work?</i> et non « Where works she? ». Réponse : <i lang="en">In Edinburgh.</i>'}],
  sol:'<p>Question de départ : <i lang="en">What do you do?</i> Hannah est architecte dans une petite entreprise d’Édimbourg ; elle travaille du lundi au jeudi et fait de l’escalade le vendredi. Pour ton chef : <i lang="en">She doesn’t work on Fridays.</i> Ses questions : <i lang="en">Does she speak German? – No, she doesn’t.</i> et <i lang="en">Where does she work? – In Edinburgh.</i> (QASI).</p>'},
]},
);
})();
