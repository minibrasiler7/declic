/* Déclic — examen de compétence : Last weekend (anglais A1) */
(()=>{
// Variantes : {a|b} donne une réponse par option ; « it is »… donne aussi « it’s » (le moteur ne développe pas ’s).
const V=(...ts)=>{ const out=new Set(), S=/\b(?!this\b|is\b)([a-z]+) is\b/i;
  const apo=(pre,s)=>{ const m=S.exec(s); if(!m){ out.add(pre+s); return; } const a=s.slice(0,m.index), b=s.slice(m.index+m[0].length); apo(pre+a+m[0],b); apo(pre+a+m[1]+'’s',b); };
  const rec=s=>{ const m=/\{([^{}]*)\}/.exec(s); if(m){ m[1].split('|').forEach(o=>rec(s.slice(0,m.index)+o+s.slice(m.index+m[0].length))); return; }
    apo('',s.replace(/\s+/g,' ').replace(/\s+([,.?!])/g,'$1').trim()); };
  ts.forEach(rec); return [...out]; };

EXAMS['en-a1-weekend']=[
 {n:'Raconter un week-end', r:'Le week-end : sortir ou rester chez soi', qs:[
   {q:'Écris en anglais : « faire la grasse matinée ».', lab:'En anglais', txt:['to have a lie-in','have a lie-in'], why:'<i lang="en">to have a lie-in</i> (britannique). Au passé : <i lang="en">I had a lie-in.</i>'},
   {q:'Écoute. Qu’a fait la personne samedi&nbsp;?', audio:'I didn’t go out on Saturday. I stayed in and read a book.', cache:true, opts:['Elle est sortie avec des amis.','Elle est restée chez elle et a lu un livre.','Elle a fait les magasins.','Elle a rendu visite à sa famille.'], ans:1, why:'<i lang="en">I didn’t go out… I stayed in and read a book.</i> : elle n’est pas sortie, elle est restée chez elle et a lu.'},
   {q:'Écris en anglais : « Qu’est-ce que tu as fait ce week-end&nbsp;? »', lab:'Ta question', txt:['What did you do at the weekend?','What did you do on the weekend?','What did you do this weekend?','What did you do last weekend?','What did you do over the weekend?'], why:'<i lang="en">What did you do at the weekend?</i> (<i lang="en">on the weekend</i> en américain).'},
   {q:'Ton ami raconte : <i lang="en">I went to a great concert on Saturday.</i> Que réponds-tu&nbsp;?', opts:['Not much.','I had a lie-in.','That sounds great!','How old are you?'], ans:2, why:'<i lang="en">That sounds great!</i> = Ça a l’air super ! <i lang="en">Not much</i> répond à <i lang="en">What did you do?</i>'},
   {q:'Écris en anglais : « Nous avons passé un bon moment. »', lab:'Ta phrase', txt:['We had a good time.','We had a great time.','We had a nice time.','We had a lovely time.'], why:'<i lang="en">We had a good time.</i> <i lang="en">have a good time</i> au prétérit : <i lang="en">had</i>.'},
 ]},
 {n:'Le prétérit des verbes réguliers', r:'Le prétérit des verbes réguliers', qs:[
   {q:'Écris le prétérit du verbe <i lang="en">stop</i>.', lab:'Prétérit', txt:['stopped'], why:'Une syllabe, consonne + voyelle + consonne : on double le p. <i lang="en">stopped</i>.'},
   {q:'Écris le prétérit du verbe <i lang="en">study</i>.', lab:'Prétérit', txt:['studied'], why:'Consonne + y → <i lang="en">-ied</i> : <i lang="en">studied</i>.'},
   {q:'Quel prétérit est mal écrit&nbsp;?', opts:['liked','planned','enjoied','tried'], ans:2, why:'Voyelle + y : on garde le y. <i lang="en">enjoy → enjoyed</i>. (Mais consonne + y : <i lang="en">try → tried</i>.)'},
   {q:'Mets la phrase au prétérit en remplaçant <i lang="en">every evening</i> par <i lang="en">yesterday evening</i> : <i lang="en">She cooks every evening.</i>', lab:'Ta phrase', txt:V('She cooked yesterday evening.','Yesterday evening{,|} she cooked.'), why:'<i lang="en">She cooked yesterday evening.</i> Au prétérit, plus de <i lang="en">-s</i> : la même forme à toutes les personnes.'},
   {q:'Quelle phrase est correcte&nbsp;?', opts:['I have watched a film yesterday.','I watched a film yesterday.','I watch a film yesterday.','I was watched a film yesterday.'], ans:1, why:'Moment passé précis (<i lang="en">yesterday</i>) : prétérit, <i lang="en">I watched a film yesterday.</i> Ni <i lang="en">have</i>, ni <i lang="en">was</i>.'},
   {q:'Écris en anglais : « Ils sont restés à la maison dimanche. »', lab:'Ta phrase', txt:V('They stayed {at home|in|home} on Sunday.','On Sunday{,|} they stayed {at home|in|home}.'), why:'<i lang="en">They stayed at home on Sunday.</i> (ou <i lang="en">stayed in</i>). <i lang="en">stay</i> : voyelle + y, on ajoute <i lang="en">-ed</i>.'},
 ]},
 {n:'La prononciation de -ed', r:'Trois façons de dire -ed', qs:[
   {q:'Dans quel verbe <i lang="en">-ed</i> forme-t-il une syllabe en plus (/ɪd/)&nbsp;?', opts:['cooked','needed','cleaned','washed'], ans:1, why:'<i lang="en">need</i> finit par d : <i lang="en">needed</i> se dit en deux syllabes, /ɪd/. Les autres n’ajoutent pas de syllabe.'},
   {q:'Comment se prononce la fin de <i lang="en">watched</i>&nbsp;?', opts:['/ɪd/ : « watch‑id », deux syllabes','/d/ : « watchd »','/t/ : « watcht », une syllabe','on ne prononce rien'], ans:2, why:'Après le son sourd « tch », <i lang="en">-ed</i> se dit /t/ : <i lang="en">watched</i> = « watcht », une seule syllabe.'},
   {q:'Lequel de ces verbes se termine par le même son que <i lang="en">played</i> (/d/)&nbsp;?', opts:['wanted','helped','lived','laughed'], ans:2, why:'<i lang="en">lived</i> : après le son sonore v, <i lang="en">-ed</i> se dit /d/. <i lang="en">helped</i> et <i lang="en">laughed</i> se disent /t/, <i lang="en">wanted</i> /ɪd/.'},
   {q:'Combien de syllabes compte <i lang="en">visited</i>&nbsp;?', opts:['deux','trois','quatre'], ans:1, why:'<i lang="en">vis‑i‑ted</i> : trois syllabes, car <i lang="en">visit</i> finit par t et <i lang="en">-ed</i> se dit /ɪd/.'},
 ]},
 {n:'Les verbes irréguliers', r:'Les verbes irréguliers les plus courants', qs:[
   {q:'Écris le prétérit du verbe <i lang="en">go</i>.', lab:'Prétérit', txt:['went'], why:'<i lang="en">go → went</i>, le plus irrégulier de tous.'},
   {q:'Écris le prétérit du verbe <i lang="en">buy</i>.', lab:'Prétérit', txt:['bought'], why:'<i lang="en">buy → bought</i> (prononcé « bôt »). « buyed » n’existe pas.'},
   {q:'Écris le prétérit du verbe <i lang="en">eat</i>.', lab:'Prétérit', txt:['ate'], why:'<i lang="en">eat → ate</i> : <i lang="en">We ate pizza.</i>'},
   {q:'Écris en anglais : « J’ai vu Tom en ville hier. »', lab:'Ta phrase', txt:V('I saw Tom in town yesterday.','Yesterday{,|} I saw Tom in town.','I saw Tom in the city centre yesterday.','I saw Tom in the town centre yesterday.'), why:'<i lang="en">I saw Tom in town yesterday.</i> « j’ai vu » = un seul mot, <i lang="en">saw</i> (prétérit de <i lang="en">see</i>).'},
   {q:'Complète : <i lang="en">We ___ a lot of photos in Rome.</i>', opts:['taked','takes','have took','took'], ans:3, why:'<i lang="en">take → took</i> : <i lang="en">We took a lot of photos in Rome.</i>'},
   {q:'Quelle phrase dit correctement « Je suis allé au cinéma »&nbsp;?', opts:['I went to the cinema.','I goed to the cinema.','I wented to the cinema.','I was go to the cinema.'], ans:0, why:'<i lang="en">I went to the cinema.</i> Pas de <i lang="en">-ed</i> sur un irrégulier, et pas de <i lang="en">was</i> devant.'},
 ]},
 {n:'Négation et questions avec did', r:'Négation et questions au prétérit : did', qs:[
   {q:'Écris à la forme négative : <i lang="en">He went to the party.</i>', lab:'Ta phrase', txt:['He did not go to the party.'], why:'<i lang="en">He didn’t go to the party.</i> Après <i lang="en">didn’t</i>, la base : <i lang="en">go</i>.'},
   {q:'Transforme en question : <i lang="en">You saw the match.</i>', lab:'Ta question', txt:['Did you see the match?'], why:'<i lang="en">Did you see the match?</i> <i lang="en">did</i> porte le passé, <i lang="en">saw</i> redevient <i lang="en">see</i>.'},
   {q:'<i lang="en">Did they enjoy the concert?</i> Oui. Écris la réponse courte.', lab:'Ta réponse', txt:['Yes, they did.'], why:'<i lang="en">Yes, they did.</i> La réponse courte reprend <i lang="en">did</i>.'},
   {q:'Pose la question en anglais : « Où êtes-vous allés dimanche&nbsp;? »', lab:'Ta question', txt:['Where did you go on Sunday?','Where did you go last Sunday?','On Sunday, where did you go?'], why:'<i lang="en">Where did you go on Sunday?</i> Mot interrogatif + <i lang="en">did</i> + sujet + base.'},
   {q:'Quelle phrase contient une erreur&nbsp;?', opts:['Did you have a good time?','I didn’t see her.','She didn’t went out.','What did they eat?'], ans:2, why:'Après <i lang="en">didn’t</i>, la base verbale : <i lang="en">She didn’t go out.</i>'},
   {q:'Complète : <i lang="en">___ you tired after the match?</i>', opts:['Did','Were','Was','Do'], ans:1, why:'<i lang="en">tired</i> est un adjectif : c’est <i lang="en">to be</i>, sans <i lang="en">did</i>. <i lang="en">Were you tired?</i>'},
   {q:'Remets la question dans l’ordre.', ordre:['What','did','you','buy','at','the','market?'], why:'<i lang="en">What did you buy at the market?</i> Mot interrogatif + <i lang="en">did</i> + sujet + base verbale.'},
 ]},
 {n:'Comprendre à l’oral', r:'Lundi matin, au café', qs:[
   {q:'Écoute. Où était Liam vendredi&nbsp;?', audio:[['Zoe','Did you stay in on Friday?'],['Liam','No, I didn’t. I went to Bristol and visited my cousin. We had dinner by the river.']], cache:true, opts:['chez lui','à Bristol, chez son cousin','à Londres, au restaurant','au cinéma avec Zoe'], ans:1, why:'<i lang="en">I went to Bristol and visited my cousin.</i> Ils ont dîné au bord de la rivière.'},
   {q:'Écoute. Qu’est-ce que la personne n’a <b>pas</b> fait samedi&nbsp;?', audio:'Last Saturday I got up late, then I met my friend Jess in town. We had lunch in an Italian restaurant and we bought some clothes. In the evening I watched a film at home.', cache:true, opts:['Elle s’est levée tard.','Elle a déjeuné au restaurant.','Elle est allée au cinéma.','Elle a acheté des vêtements.'], ans:2, why:'<i lang="en">I watched a film at home</i> : elle a regardé un film chez elle, pas au cinéma. Le reste est dans le récit : <i lang="en">got up late, had lunch, bought some clothes</i>.'},
   {q:'Dictée. Écoute et écris les deux phrases exactes.', dictee:'I didn’t go out on Sunday. I tidied my room.', why:'<i lang="en">didn’t go</i> (base après <i lang="en">didn’t</i>) et <i lang="en">tidied</i> : consonne + y → <i lang="en">-ied</i>.'},
 ]},
];
})();
