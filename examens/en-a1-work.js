/* Déclic — examen de compétence : Work and questions (anglais A1) */
(()=>{
// X('a {b|c} d') → ['a b d', 'a c d'] : toutes les variantes d’une réponse écrite
const X=(...ss)=>ss.flatMap(s=>{ const m=s.match(/\{([^{}]*)\}/); return m?m[1].split('|').flatMap(o=>X(s.replace(m[0],()=>o))):[s]; });
EXAMS['en-a1-work']=[
 {n:'Métiers et lieux de travail', r:'Les métiers', qs:[
   {q:'Écris en anglais : « Il est avocat. »', lab:'Ta phrase', txt:X('He{ is|’s} a lawyer.'), why:'Article obligatoire devant un métier : <i lang="en">He’s a lawyer.</i>'},
   {q:'Complète : <i lang="en">My mother is ___ accountant.</i>', opts:['a','an','the','—'], ans:1, why:'<i lang="en">accountant</i> commence par un son de voyelle : <i lang="en">an accountant</i>. Et l’article est obligatoire devant un métier.'},
   {q:'Écris en anglais : « Elle travaille pour une banque. »', lab:'Ta phrase', txt:['She works for a bank.'], why:'On travaille <i lang="en">for</i> une entreprise, et <i lang="en">she</i> demande le -s : <i lang="en">She works for a bank.</i>'},
   {q:'Écoute. Où Ben travaille-t-il&nbsp;?', audio:'Hi, I’m Ben. I’m a teacher, but I don’t work in a school. I teach English in a big factory, to the workers.', cache:true, opts:['Dans une école','Dans une usine','Dans un hôpital','De chez lui'], ans:1, why:'<i lang="en">I teach English in a big factory</i> : il enseigne l’anglais dans une usine, pas dans une école.'},
   {q:'Quel est le métier d’une personne qui coupe les cheveux&nbsp;?', opts:['a builder','a waiter','a hairdresser','a receptionist'], ans:2, why:'<i lang="en">a hairdresser</i> = un coiffeur, une coiffeuse.'},
   {q:'Comment dit-on « Je suis enseignant. »&nbsp;?', opts:['I’m teacher.','I’m a teacher.','I’m an teacher.','I teacher.'], ans:1, why:'Devant un métier au singulier, toujours <i lang="en">a</i> ou <i lang="en">an</i> : <i lang="en">I’m a teacher.</i>'},
 ]},
 {n:'La négation avec don’t et doesn’t', r:'Mettre une phrase au négatif', qs:[
   {q:'Mets au négatif : <i lang="en">She likes coffee.</i>', lab:'Ta phrase', txt:['She doesn’t like coffee.'], why:'Sujet <i lang="en">she</i> → <i lang="en">doesn’t</i> + base : <i lang="en">She doesn’t like coffee.</i>'},
   {q:'Mets au négatif : <i lang="en">They live in Geneva.</i>', lab:'Ta phrase', txt:['They don’t live in Geneva.'], why:'Sujet <i lang="en">they</i> → <i lang="en">don’t</i> : <i lang="en">They don’t live in Geneva.</i>'},
   {q:'Mets au négatif : <i lang="en">He is a waiter.</i>', lab:'Ta phrase', txt:['He isn’t a waiter.','He’s not a waiter.'], why:'Avec <i lang="en">to be</i>, pas de <i lang="en">do</i> : <i lang="en">He isn’t a waiter.</i>'},
   {q:'Quelle phrase est correcte&nbsp;?', opts:['He doesn’t works on Sundays.','He don’t work on Sundays.','He doesn’t work on Sundays.','He not works on Sundays.'], ans:2, why:'<i lang="en">doesn’t</i> avec <i lang="en">he</i>, puis le verbe à la base, sans -s : <i lang="en">He doesn’t work on Sundays.</i>'},
   {q:'Écris en anglais : « Mon père ne travaille pas à plein temps. »', lab:'Ta phrase', txt:X('My {father|dad} doesn’t work full-time.'), why:'<i lang="en">My father</i> = <i lang="en">he</i> → <i lang="en">doesn’t work</i>. « À plein temps » = <i lang="en">full-time</i>.'},
   {q:'Complète au négatif avec <i lang="en">have</i> : <i lang="en">We ___ lunch at work.</i>', lab:'Les mots', txt:['don’t have','We don’t have lunch at work.'], why:'Sujet <i lang="en">we</i> → <i lang="en">don’t have</i>.'},
 ]},
 {n:'Questions fermées et réponses courtes', r:'Poser une question avec do ou does', qs:[
   {q:'Transforme en question : <i lang="en">Your parents speak English.</i>', lab:'Ta question', txt:['Do your parents speak English?'], why:'<i lang="en">your parents</i> = <i lang="en">they</i> → <i lang="en">Do</i> : <i lang="en">Do your parents speak English?</i>'},
   {q:'Transforme en question : <i lang="en">Kevin works at night.</i>', lab:'Ta question', txt:['Does Kevin work at night?'], why:'<i lang="en">Kevin</i> = <i lang="en">he</i> → <i lang="en">Does</i>, et <i lang="en">works</i> redevient <i lang="en">work</i>.'},
   {q:'<i lang="en">Do you like your job?</i> Oui. Écris la réponse courte.', lab:'Ta réponse', txt:['Yes, I do.'], why:'On reprend l’auxiliaire de la question : <i lang="en">Yes, I do.</i>'},
   {q:'<i lang="en">Does Anna drive to work?</i> Non. Écris la réponse courte.', lab:'Ta réponse', txt:['No, she doesn’t.'], why:'<i lang="en">Anna</i> = <i lang="en">she</i> : <i lang="en">No, she doesn’t.</i>'},
   {q:'<i lang="en">Does he work here?</i> Oui. Quelle réponse est correcte&nbsp;?', opts:['Yes, he works.','Yes, he is.','Yes, does he.','Yes, he does.'], ans:3, why:'Question avec <i lang="en">does</i> → réponse avec <i lang="en">does</i> : <i lang="en">Yes, he does.</i>'},
   {q:'Quelle question est correcte&nbsp;?', opts:['Works your sister in Bern?','Does your sister works in Bern?','Does your sister work in Bern?','Do your sister work in Bern?'], ans:2, why:'<i lang="en">Does</i> + sujet + base verbale : <i lang="en">Does your sister work in Bern?</i>'},
 ]},
 {n:'Questions en wh- avec do et does', r:'Poser une question en wh- avec do ou does', qs:[
   {q:'Remets dans l’ordre.', ordre:['What','time','do','you','finish','work?'], why:'Q-A-S-I : <i lang="en">What time</i> + <i lang="en">do</i> + <i lang="en">you</i> + <i lang="en">finish</i>.'},
   {q:'Écris en anglais : « Où habite ton frère ? »', lab:'Ta question', txt:['Where does your brother live?'], why:'<i lang="en">Where</i> + <i lang="en">does</i> + <i lang="en">your brother</i> + <i lang="en">live</i>. « Where lives your brother? » est un calque du français.'},
   {q:'Pose la question qui a pour réponse l’information en gras : <i lang="en">Paolo goes to work <b>by bike</b>.</i>', lab:'Ta question', txt:X('How does {Paolo|he} {go|get|travel} to work?'), why:'Un moyen de transport → <i lang="en">How</i> : <i lang="en">How does Paolo go to work?</i>'},
   {q:'Comment demande-t-on le sens d’un mot&nbsp;?', opts:['What means this word?','What does this word mean?','What does this word means?','What this word means?'], ans:1, why:'<i lang="en">What does this word mean?</i> : auxiliaire <i lang="en">does</i>, puis le verbe à la base.'},
   {q:'Que veut dire la question <i lang="en">What do you do?</i>&nbsp;?', opts:['Que fais-tu en ce moment ?','Quel est ton métier ?','Qu’est-ce que tu veux ?','Que fais-tu ce soir ?'], ans:1, why:'<i lang="en">What do you do?</i> demande le métier. Le premier <i lang="en">do</i> est l’auxiliaire, le second le verbe « faire ».'},
 ]},
 {n:'Formes faibles et intonation', r:'Do you…? : formes faibles et intonation', qs:[
   {q:'Comment se termine, à l’oral, la question <i lang="en">Where do you work?</i>&nbsp;?', opts:['La voix monte.','La voix descend.','La voix reste plate.','On ne prononce pas do.'], ans:1, why:'Une question en wh- descend à la fin. C’est la question fermée (<i lang="en">Do you work here?</i>) qui monte.'},
   {q:'Dans la réponse <i lang="en">Yes, I do.</i>, comment se prononce <i lang="en">do</i>&nbsp;?', opts:['Faible, presque avalé','Fort et accentué','Muet','Comme « deuz »'], ans:1, why:'En fin de réponse courte, l’auxiliaire est fort : <i lang="en">Yes, I <b>do</b>.</i> Il n’est faible qu’au début des questions.'},
   {q:'Écoute. Qu’est-ce que Raj n’aime pas&nbsp;?', audio:[['Kim','Do you work in the city centre, Raj?'],['Raj','No, I don’t. I work in a factory near the airport.'],['Kim','Do you like it?'],['Raj','Yes, I do. My colleagues are great. But I don’t like the food in the canteen!']], cache:true, opts:['Ses collègues','Son travail à l’usine','La nourriture de la cantine','Le centre-ville'], ans:2, why:'<i lang="en">I don’t like the food in the canteen</i> : il n’aime pas la nourriture de la cantine. Il aime son travail et ses collègues.'},
   {q:'Dictée. Écoute et écris la question exacte.', dictee:'Where does your sister work?', why:'Q-A-S-I : <i lang="en">Where</i> + <i lang="en">does</i> + <i lang="en">your sister</i> + <i lang="en">work</i> (sans -s).'},
 ]},
 {n:'Comprendre à l’oral', r:'Une conversation à une fête', qs:[
   {q:'Écoute. Combien de jours par semaine Mrs Ito travaille-t-elle&nbsp;?', audio:[['Interviewer','So, Mrs Ito, what do you do?'],['Mrs Ito','I’m an accountant. I work for a hotel group.'],['Interviewer','Do you work full-time?'],['Mrs Ito','No, I don’t. I work part-time, from Tuesday to Thursday.']], cache:true, opts:['Deux','Trois','Quatre','Cinq'], ans:1, why:'<i lang="en">from Tuesday to Thursday</i> : mardi, mercredi, jeudi, donc trois jours. Elle travaille à temps partiel.'},
   {q:'Dictée. Écoute et écris la phrase négative exacte.', dictee:'My brother doesn’t like his job.', why:'<i lang="en">doesn’t</i> avec <i lang="en">my brother</i>, puis <i lang="en">like</i> à la base.'},
   {q:'Écoute la question, puis écris la réponse courte négative.', audio:'Does your boss work from home?', cache:true, lab:'Ta réponse', txt:X('No, {he|she} doesn’t.'), why:'Question avec <i lang="en">does</i> : <i lang="en">No, he doesn’t.</i> (ou <i lang="en">she</i>).'},
 ]},
];
})();
