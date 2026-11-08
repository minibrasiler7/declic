/* Déclic — examen de compétence : Where were you? (anglais A1) */
(()=>{
// Variantes : {a|b} donne une réponse par option ; « it is », « birthday is »… donnent aussi « it’s », « birthday’s » (le moteur ne développe pas ’s).
const V=(...ts)=>{ const out=new Set(), S=/\b(?!this\b|is\b)([a-z]+) is\b/i;
  const apo=(pre,s)=>{ const m=S.exec(s); if(!m){ out.add(pre+s); return; } const a=s.slice(0,m.index), b=s.slice(m.index+m[0].length); apo(pre+a+m[0],b); apo(pre+a+m[1]+'’s',b); };
  const rec=s=>{ const m=/\{([^{}]*)\}/.exec(s); if(m){ m[1].split('|').forEach(o=>rec(s.slice(0,m.index)+o+s.slice(m.index+m[0].length))); return; }
    apo('',s.replace(/\s+/g,' ').replace(/\s+([,.?!])/g,'$1').trim()); };
  ts.forEach(rec); return [...out]; };

EXAMS['en-a1-past-be']=[
 {n:'Was et were', r:'Was et were : le passé de to be', qs:[
   {q:'Complète avec <i lang="en">was</i> ou <i lang="en">were</i> : <i lang="en">We ___ at the beach yesterday.</i>', lab:'Le mot', txt:['were'], why:'<i lang="en">we</i> → <i lang="en">were</i> : <i lang="en">We were at the beach yesterday.</i>'},
   {q:'Complète avec <i lang="en">was</i> ou <i lang="en">were</i> : <i lang="en">The film ___ very long.</i>', lab:'Le mot', txt:['was'], why:'<i lang="en">The film</i> = <i lang="en">it</i> → <i lang="en">was</i>.'},
   {q:'Quelle phrase est correcte&nbsp;?', opts:['You was late.','You were late.','You wasn’t late.','You is late.'], ans:1, why:'<i lang="en">you</i> prend toujours <i lang="en">were</i>, même pour une seule personne : <i lang="en">You were late.</i>'},
   {q:'Écris en anglais : « Je suis né à Lyon. »', lab:'Ta phrase', txt:['I was born in Lyon.'], why:'La naissance est passée : <i lang="en">I was born in Lyon.</i> « I am born » est faux.'},
   {q:'Écris en anglais : « C’était génial&nbsp;! »', lab:'Ta phrase', txt:['It was great!','It was brilliant!','It was amazing!','It was fantastic!','It was awesome!'], why:'<i lang="en">It was great!</i> « c’était » = <i lang="en">it was</i>.'},
   {q:'Complète : <i lang="en">There ___ a lot of people at the party.</i>', opts:['was','were','is','had'], ans:1, why:'« il y avait » + pluriel (<i lang="en">a lot of people</i>) : <i lang="en">There were</i>. Jamais « there had ».'},
 ]},
 {n:'Négation, questions et réponses courtes', r:'Dire non et poser une question avec was et were', qs:[
   {q:'Écris à la forme négative : <i lang="en">My parents were at home.</i>', lab:'Ta phrase', txt:['My parents were not at home.'], why:'<i lang="en">My parents weren’t at home.</i> <i lang="en">not</i> après <i lang="en">were</i>.'},
   {q:'Transforme en question : <i lang="en">The shop was open.</i>', lab:'Ta question', txt:['Was the shop open?'], why:'On inverse le sujet et <i lang="en">was</i> : <i lang="en">Was the shop open?</i>'},
   {q:'<i lang="en">Were you at work yesterday?</i> Non. Écris la réponse courte.', lab:'Ta réponse', txt:['No, I was not.','No, I was not at work.','No, I was not at work yesterday.'], why:'La question porte sur <i lang="en">you</i>, on répond avec <i lang="en">I</i> : <i lang="en">No, I wasn’t.</i>'},
   {q:'<i lang="en">Was your sister at the party?</i> Oui. Quelle réponse est correcte&nbsp;?', opts:['Yes, she were.','Yes, she is.','Yes, she did.','Yes, she was.'], ans:3, why:'<i lang="en">she</i> → <i lang="en">was</i> : <i lang="en">Yes, she was.</i> <i lang="en">to be</i> n’utilise pas <i lang="en">did</i>.'},
   {q:'Écris en anglais : « Comment s’est passé ton week-end&nbsp;? »', lab:'Ta question', txt:['How was your weekend?','What was your weekend like?'], why:'<i lang="en">How was your weekend?</i> Réponse possible : <i lang="en">It was great, thanks!</i>'},
   {q:'Remets la question dans l’ordre.', ordre:['Why','were','you','late','this','morning?'], why:'<i lang="en">Why were you late this morning?</i> Mot interrogatif + <i lang="en">were</i> + sujet.'},
 ]},
 {n:'Yesterday, last et ago', r:'Yesterday, last et ago', qs:[
   {q:'Comment dit-on le plus naturellement « hier soir »&nbsp;?', opts:['last night','yesterday night','the last night','night ago'], ans:0, why:'« hier soir » = <i lang="en">last night</i>. On dit <i lang="en">yesterday morning / afternoon / evening</i>, mais pas « yesterday night ».'},
   {q:'Écris en anglais : « Elle était à Rome il y a deux semaines. »', lab:'Ta phrase', txt:V('She was in Rome two weeks ago.','Two weeks ago{,|} she was in Rome.'), why:'« il y a » + durée = durée + <i lang="en">ago</i> : <i lang="en">two weeks ago</i>.'},
   {q:'Comment dit-on « J’étais en Espagne il y a deux ans »&nbsp;?', opts:['I was in Spain there is two years.','I was in Spain ago two years.','I was in Spain two years ago.','I was in Spain since two years.'], ans:2, why:'<i lang="en">ago</i> se place après la durée : <i lang="en">two years ago</i>. Jamais <i lang="en">there is</i> pour « il y a » + durée.'},
   {q:'Écris en anglais : « la semaine dernière ».', lab:'En anglais', txt:['last week'], why:'<i lang="en">last week</i>, sans <i lang="en">the</i>. <i lang="en">the last week</i> voudrait dire « les sept derniers jours ».'},
   {q:'Complète : <i lang="en">I was in London ___ 2019.</i>', opts:['on','in','at','last'], ans:1, why:'<i lang="en">in</i> + année : <i lang="en">in 2019</i>. (<i lang="en">on</i> + date ou jour.)'},
   {q:'Écris en anglais : « Nous étions fatigués avant-hier. »', lab:'Ta phrase', txt:V('We were tired the day before yesterday.','The day before yesterday{,|} we were tired.'), why:'« avant-hier » = <i lang="en">the day before yesterday</i>. <i lang="en">we</i> → <i lang="en">were</i>.'},
 ]},
 {n:'Dire et écrire une date', r:'Dire et écrire une date', qs:[
   {q:'Écris en lettres le nombre ordinal 12th.', lab:'En anglais', txt:['twelfth'], why:'<i lang="en">twelve → twelfth</i> : le ve devient f, puis <i lang="en">-th</i>.'},
   {q:'Écris en lettres le nombre ordinal 3rd.', lab:'En anglais', txt:['third'], why:'<i lang="en">first, second, third</i> sont irréguliers. Les autres prennent <i lang="en">-th</i>.'},
   {q:'Comment dit-on « le 21 juillet » en anglais britannique&nbsp;?', opts:['the twenty-one of July','the twenty-first of July','the twentieth-first of July','July the twenty-one'], ans:1, why:'Dans un nombre composé, seul le dernier mot devient ordinal : <i lang="en">twenty-first</i>. <i lang="en">the twenty-first of July</i>.'},
   {q:'Écoute et écris la date en chiffres, au format jour.mois (par exemple 3.5 pour le 3 mai).', audio:'Her birthday is on the thirtieth of August.', cache:true, lab:'Date', txt:['30.8','30.08'], why:'<i lang="en">the thirtieth of August</i> = le 30 août. <i lang="en">thirtieth</i> (30e) et non <i lang="en">thirteenth</i> (13e) : l’accent est au début, <i lang="en">THIR-ti-eth</i>.'},
   {q:'Écoute. Quand était la fête&nbsp;?', audio:'The party was on the fifth of December.', cache:true, opts:['le 5 décembre','le 15 décembre','le 5 septembre','le 4 décembre'], ans:0, why:'<i lang="en">the fifth of December</i> = le 5 décembre. <i lang="en">fifth</i> : five → fif‑, puis <i lang="en">-th</i>.'},
   {q:'Une Américaine écrit la date 04/05. De quel jour parle-t-elle&nbsp;?', opts:['le 4 mai','le 5 avril','le 4 avril','le 5 mai'], ans:1, why:'Aux États-Unis, le mois vient en premier : 04/05 = <i lang="en">April 5</i>, le 5 avril. Au Royaume-Uni, ce serait le 4 mai.'},
   {q:'Écris en anglais : « Mon anniversaire est en février. »', lab:'Ta phrase', txt:V('My birthday is in February.'), why:'<i lang="en">in</i> + mois : <i lang="en">My birthday is in February.</i> Avec une majuscule à <i lang="en">February</i>.'},
 ]},
 {n:'Comprendre à l’oral', r:'Où étais-tu vendredi ?', qs:[
   {q:'Écoute. Où était Max hier soir&nbsp;?', audio:[['Jo','Were you at the gym last night?'],['Max','No, I wasn’t. I was at my sister’s. It was her birthday.']], cache:true, opts:['à la salle de sport','chez sa sœur','au travail','chez lui'], ans:1, why:'<i lang="en">I was at my sister’s</i> = chez ma sœur. C’était son anniversaire.'},
   {q:'Écoute. Qu’est-ce qui n’allait pas pendant les vacances de Ben&nbsp;?', audio:[['Anna','How was your holiday in Scotland?'],['Ben','The people were really friendly, but the weather was terrible. It was cold and wet every day.']], cache:true, opts:['les gens','l’hôtel','la nourriture','la météo'], ans:3, why:'<i lang="en">the weather was terrible. It was cold and wet</i> : la météo. Les gens, eux, étaient très sympathiques.'},
   {q:'Écoute. Pourquoi la personne n’était-elle pas à l’école lundi&nbsp;?', audio:'I wasn’t at school on Monday because I was ill. I was in bed all day.', cache:true, opts:['Elle était en voyage.','L’école était fermée.','Elle était malade.','Elle était en retard.'], ans:2, why:'<i lang="en">because I was ill. I was in bed all day</i> : elle était malade, au lit toute la journée.'},
   {q:'Écoute et écris l’année en chiffres.', audio:'I was born in nineteen ninety-eight.', cache:true, lab:'Année', txt:['1998'], why:'Les années se lisent par paires : <i lang="en">nineteen / ninety-eight</i> = 1998.'},
   {q:'Dictée. Écoute et écris la phrase exacte.', dictee:'My grandparents were in Canada three years ago.', why:'<i lang="en">My grandparents</i> = <i lang="en">they</i> → <i lang="en">were</i>, et <i lang="en">three years ago</i> à la fin.'},
 ]},
];
})();
