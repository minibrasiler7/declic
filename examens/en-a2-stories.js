/* Déclic — examen de compétence : Life stories (anglais A2) */
(()=>{
const V=(...p)=>p.reduce((a,x)=>a.flatMap(s=>[].concat(x).map(y=>s+y)),['']);
EXAMS['en-a2-stories']=[
 {n:'Le prétérit : forme et emploi', r:'Le prétérit : un seul passé pour les faits terminés', qs:[
   {q:'Mets au prétérit : <i lang="en">We live in a small flat in Bern.</i>', lab:'Ta phrase', txt:['We lived in a small flat in Bern.'], why:'<i lang="en">live</i> est régulier et finit par <i>e</i> : on ajoute seulement <i>-d</i> : <i lang="en">lived</i>.'},
   {q:'Écris en anglais : « Il n’a pas aimé le film. »', lab:'Ta phrase', txt:['He did not like the film.','He did not like the movie.'], why:'Négation au prétérit : <i lang="en">didn’t</i> + base : <i lang="en">He didn’t like the film.</i>'},
   {q:'Quelle question est correcte&nbsp;?', opts:['Did you went to the party?','Do you went to the party?','Did you go to the party?','Went you to the party?'], ans:2, why:'Après <i lang="en">did</i>, le verbe revient à la base : <i lang="en">Did you go…?</i>'},
   {q:'Comment dit-on « Je suis né en 2001 »&nbsp;?', opts:['I am born in 2001.','I born in 2001.','I have born in 2001.','I was born in 2001.'], ans:3, why:'La naissance est un fait passé : <i lang="en">I was born</i>, prétérit de <i lang="en">be</i>.'},
   {q:'Écris en anglais : « Où étais-tu hier soir&nbsp;? »', lab:'Ta question', txt:['Where were you last night?','Where were you yesterday evening?'], why:'Avec <i lang="en">be</i>, pas de <i lang="en">did</i> : on inverse <i lang="en">were</i> et <i lang="en">you</i>. « Hier soir » = <i lang="en">last night</i>.'},
   {q:'Comment dit-on « Hier, j’ai vu Marc au marché »&nbsp;?', opts:['Yesterday, I have seen Marc at the market.','Yesterday, I saw Marc at the market.','Yesterday, I seed Marc at the market.','Yesterday, I see Marc at the market.'], ans:1, why:'Un moment passé précis (<i lang="en">yesterday</i>) impose le prétérit : <i lang="en">I saw</i> (de <i lang="en">see</i>). Le passé composé français ne se traduit pas ici par <i lang="en">have seen</i>.'},
 ]},
 {n:'Les verbes irréguliers', r:'Les verbes irréguliers par familles', qs:[
   {q:'Écris le prétérit de <i lang="en">teach</i> (enseigner).', lab:'Prétérit', txt:['taught'], why:'<i lang="en">teach → taught</i>, de la famille de <i lang="en">caught</i> ; à ne pas confondre avec <i lang="en">thought</i> (<i lang="en">think</i>).'},
   {q:'Écris le prétérit de <i lang="en">bring</i> (apporter).', lab:'Prétérit', txt:['brought'], why:'<i lang="en">bring → brought</i>. <i lang="en">bought</i>, sans r, vient de <i lang="en">buy</i> (acheter).'},
   {q:'Complète avec le prétérit de <i lang="en">leave</i> : <i lang="en">She ___ school at sixteen.</i>', lab:'Le mot', txt:['left','She left school at sixteen.'], why:'<i lang="en">leave → left</i> : <i lang="en">She left school at sixteen</i> (elle a quitté l’école à seize ans).'},
   {q:'Quelle forme n’existe pas&nbsp;?', opts:['knew','grew','throwed','flew'], ans:2, why:'<i lang="en">throw</i> fait <i lang="en">threw</i>, comme <i lang="en">know → knew, grow → grew, fly → flew</i>.'},
   {q:'Mets au prétérit : <i lang="en">I write a letter and send it.</i>', lab:'Ta phrase', txt:['I wrote a letter and sent it.'], why:'<i lang="en">write → wrote</i>, <i lang="en">send → sent</i>.'},
 ]},
 {n:'Poser une question sur le passé', r:'Poser une question au prétérit', qs:[
   {q:'Pose la question dont la partie soulignée est la réponse : <i lang="en">They got married <u>in 2010</u>.</i>', lab:'Ta question', txt:['When did they get married?','What year did they get married?'], why:'Une date → <i lang="en">When</i> + <i lang="en">did</i> + sujet + base : <i lang="en">When did they get married?</i>'},
   {q:'Pose la question dont la partie soulignée est la réponse : <i lang="en">She studied <u>law</u> at university.</i>', lab:'Ta question', txt:['What did she study at university?','What did she study?'], why:'<i lang="en">What did she study?</i> Après <i lang="en">did</i>, <i lang="en">studied</i> redevient <i lang="en">study</i>.'},
   {q:'Écris en anglais : « Qui t’a appelé&nbsp;? »', lab:'Ta question', txt:V('Who ',['called','phoned','rang'],' you?'), why:'<i lang="en">Who</i> est le sujet (la personne qui appelle) : pas de <i lang="en">did</i>, verbe au prétérit : <i lang="en">Who called you?</i>'},
   {q:'Laquelle de ces questions est correcte pour demander « Que s’est-il passé&nbsp;? »', opts:['What did happened?','What happen?','What happened?','What was happen?'], ans:2, why:'<i lang="en">What</i> est le sujet de <i lang="en">happen</i> : pas de <i lang="en">did</i>, prétérit régulier : <i lang="en">What happened?</i>'},
   {q:'Remets la question dans l’ordre.', ordre:['Why','did','you','leave','your job?'], why:'<i lang="en">Why did you leave your job?</i> Mot interrogatif + <i lang="en">did</i> + sujet + base.'},
   {q:'<i lang="en">Did you enjoy the trip?</i> Tu réponds oui. Quelle réponse courte est correcte&nbsp;?', opts:['Yes, I enjoyed.','Yes, I did.','Yes, I was.','Yes, I do.'], ans:1, why:'On reprend l’auxiliaire de la question : <i lang="en">Yes, I did.</i>'},
 ]},
 {n:'Ago, dates et prépositions', r:'Ago, in, on, at : situer un événement', qs:[
   {q:'Écris en anglais : « Je l’ai rencontrée il y a deux ans. »', lab:'Ta phrase', txt:['I met her two years ago.','Two years ago I met her.','I met her 2 years ago.','2 years ago I met her.'], why:'Prétérit + durée + <i lang="en">ago</i> : <i lang="en">I met her two years ago.</i>'},
   {q:'Quelle phrase est correcte&nbsp;?', opts:['I moved here ago five years.','I moved here there are five years.','I moved here since five years.','I moved here five years ago.'], ans:3, why:'<i lang="en">ago</i> se place après la durée, et « il y a » (temps écoulé) ne se dit jamais <i lang="en">there are</i>.'},
   {q:'Écoute et écris l’année en chiffres.', audio:'He was born in nineteen eighty-four.', cache:true, lab:'Année', txt:['1984'], why:'<i lang="en">nineteen eighty-four</i> = 19 + 84 : 1984.'},
   {q:'Écoute. En quelle année sa sœur a-t-elle fini l’université&nbsp;?', audio:'My sister finished university in two thousand and nine.', cache:true, opts:['2019','2009','1909','2090'], ans:1, why:'<i lang="en">two thousand and nine</i> = 2009. 2019 se dirait <i lang="en">twenty nineteen</i>.'},
   {q:'Complète : <i lang="en">She was born ___ 12 May.</i>', opts:['in','at','on','the'], ans:2, why:'Devant un jour ou une date précise : <i lang="en">on</i> (<i lang="en">on 12 May, on Monday</i>). <i lang="en">in</i> sert pour un mois ou une année seuls.'},
 ]},
 {n:'Les mots du récit', r:'Les mots du récit', qs:[
   {q:'Que veut dire <i lang="en">He eventually found a job.</i>&nbsp;?', opts:['Il a peut-être trouvé un travail.','Il a trouvé un travail temporaire.','Il a finalement trouvé un travail, après un long moment.','Il a trouvé un travail par hasard.'], ans:2, why:'<i lang="en">eventually</i> = finalement, au bout d’un moment. C’est un faux ami : « éventuellement » se dit <i lang="en">possibly</i>.'},
   {q:'Complète : <i lang="en">___, I didn’t like my new school, but now I love it.</i>', opts:['At first','First','At the end','After'], ans:0, why:'<i lang="en">At first</i> = au début, avant que les choses changent. <i lang="en">First</i> sert à énumérer des étapes.'},
   {q:'Complète : <i lang="en">The hero dies ___ the film.</i>', opts:['in the end of','at the end of','at the finish of','in end of'], ans:1, why:'« À la fin de » quelque chose = <i lang="en">at the end of</i>. <i lang="en">In the end</i>, sans <i lang="en">of</i>, veut dire « finalement ».'},
   {q:'Remets la phrase dans l’ordre.', ordre:['After that,','we','went','to','a café.'], alt:['We went to a café after that'], why:'<i lang="en">After that, we went to a café.</i> Le marqueur de temps ouvre la phrase, suivi d’une virgule.'},
 ]},
 {n:'Comprendre un récit à l’oral', r:'Une vie racontée', qs:[
   {q:'Écoute. Qu’a fait Daniel après l’université&nbsp;?', audio:[['Amy','What did you do after university, Daniel?'],['Daniel','I didn’t look for a job straight away. I went to Australia for a year and worked on a farm.'],['Amy','And then?'],['Daniel','Then I came back and became a teacher.']], cache:true, opts:['Il est devenu professeur tout de suite.','Il a travaillé un an dans une ferme en Australie.','Il a cherché du travail en Australie pendant deux ans.','Il est resté à l’université un an de plus.'], ans:1, why:'<i lang="en">I went to Australia for a year and worked on a farm.</i> Il est devenu professeur après son retour (<i lang="en">Then I came back and became a teacher</i>).'},
   {q:'Écoute. Quand les grands-parents se sont-ils rencontrés&nbsp;?', audio:'My grandparents met at a dance in nineteen fifty-eight. They got married three years later, and they had four children.', cache:true, opts:['En 1958.','En 1961.','En 1985.','En 1968.'], ans:0, why:'<i lang="en">They met … in nineteen fifty-eight</i> : 1958. Ils se sont mariés trois ans plus tard, en 1961.'},
   {q:'Dictée. Écoute et écris la phrase exacte.', dictee:'My parents met at university and got married a year later.', why:'Deux prétérits irréguliers : <i lang="en">met</i> (<i lang="en">meet</i>) et <i lang="en">got</i> (<i lang="en">get</i>). <i lang="en">A year later</i> = un an plus tard.'},
   {q:'Dictée. Écoute et écris cette deuxième phrase exacte.', dictee:'Then she taught English in Japan for two years.', why:'<i lang="en">taught</i> est le prétérit de <i lang="en">teach</i> ; <i lang="en">for two years</i> = pendant deux ans.'},
 ]},
];
})();
