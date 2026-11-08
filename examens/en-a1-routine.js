/* Déclic — examen de compétence : Daily routine (anglais A1) */
(()=>{
// X('a {b|c} d') → ['a b d', 'a c d'] : toutes les variantes d’une réponse écrite
const X=(...ss)=>ss.flatMap(s=>{ const m=s.match(/\{([^{}]*)\}/); return m?m[1].split('|').flatMap(o=>X(s.replace(m[0],()=>o))):[s]; });
EXAMS['en-a1-routine']=[
 {n:'Les gestes du quotidien', r:'Les gestes du quotidien', qs:[
   {q:'Écris en anglais : « prendre le petit-déjeuner ».', lab:'En anglais', txt:X('{to |}have breakfast','{to |}eat breakfast'), why:'Pour les repas, l’anglais dit <i lang="en">have</i> : <i lang="en">have breakfast</i>, jamais « take breakfast ».'},
   {q:'Comment dit-on « Je vais me coucher à onze heures. »&nbsp;?', opts:['I go to the bed at eleven.','I go to bed at eleven.','I go in bed at eleven.','I go bed at eleven.'], ans:1, why:'<i lang="en">go to bed</i>, sans article : <i lang="en">I go to bed at eleven.</i>'},
   {q:'Écris en anglais : « Je rentre à la maison à six heures. »', lab:'Ta phrase', txt:X('I {get|go|come} home at {six|6}{| o’clock}{| p.m.| pm| in the evening}.'), why:'<i lang="en">I get home at six.</i> Pas de <i lang="en">to</i> devant <i lang="en">home</i>.'},
   {q:'Écris en anglais : « Elle va au travail en bus. »', lab:'Ta phrase', txt:X('She goes to work by bus.','She takes the bus to work.'), why:'<i lang="en">She goes to work by bus.</i> : <i lang="en">go → goes</i> avec <i lang="en">she</i>, <i lang="en">to work</i> sans article, et <i lang="en">by bus</i>.'},
   {q:'Quelle expression veut dire « s’habiller »&nbsp;?', opts:['to get dressed','to make dressed','to put dressed','to take dressed'], ans:0, why:'<i lang="en">to get dressed</i> : <i lang="en">I get up, I have a shower and I get dressed.</i>'},
 ]},
 {n:'Le présent simple et le -s', r:'Le présent simple : I work, she works', qs:[
   {q:'Complète avec le verbe <i lang="en">live</i> : <i lang="en">My parents ___ in Nice.</i>', lab:'Le verbe', txt:['live'], why:'<i lang="en">My parents</i> = <i lang="en">they</i> : pas de -s. <i lang="en">My parents live in Nice.</i>'},
   {q:'Complète avec le verbe <i lang="en">speak</i> : <i lang="en">Our teacher ___ four languages.</i>', lab:'Le verbe', txt:['speaks'], why:'<i lang="en">Our teacher</i> = <i lang="en">he</i> ou <i lang="en">she</i> : <i lang="en">speaks</i>.'},
   {q:'Quelle phrase est correcte&nbsp;?', opts:['She work in a bank.','They works in a bank.','She works in a bank.','I works in a bank.'], ans:2, why:'Le -s seulement avec <i lang="en">he, she, it</i> : <i lang="en">She works</i>, mais <i lang="en">They work</i>, <i lang="en">I work</i>.'},
   {q:'Écris en anglais : « Le magasin ouvre à neuf heures. »', lab:'Ta phrase', txt:X('The {shop|store} opens at {nine|9}{| o’clock| a.m.| am| in the morning}.'), why:'<i lang="en">The shop</i> = <i lang="en">it</i>, donc <i lang="en">opens</i> : <i lang="en">The shop opens at nine.</i>'},
   {q:'Écoute. Qui se lève le plus tard&nbsp;?', audio:'My brother gets up at six, but my sister gets up at ten. My parents get up at seven.', cache:true, opts:['Le frère','Les parents','La sœur','Tout le monde à la même heure'], ans:2, why:'<i lang="en">My sister gets up at ten</i> : la sœur se lève à 10 h, le frère à 6 h, les parents à 7 h.'},
 ]},
 {n:'Orthographe de la 3e personne', r:'Écrire le verbe avec he, she, it', qs:[
   {q:'Écris le verbe <i lang="en">study</i> avec <i lang="en">she</i> : <i lang="en">She ___ French.</i>', lab:'Le verbe', txt:['studies'], why:'Consonne + y → <i lang="en">ies</i> : <i lang="en">studies</i>.'},
   {q:'Écris le verbe <i lang="en">do</i> avec <i lang="en">he</i> : <i lang="en">He ___ his homework after dinner.</i>', lab:'Le verbe', txt:['does'], why:'Verbe en -o → <i lang="en">+es</i> : <i lang="en">does</i> (comme <i lang="en">goes</i>).'},
   {q:'Écris le verbe <i lang="en">have</i> avec <i lang="en">she</i> : <i lang="en">She ___ lunch at one.</i>', lab:'Le verbe', txt:['has'], why:'<i lang="en">have</i> est le seul irrégulier : <i lang="en">she has</i>.'},
   {q:'Quelle forme est <b>fausse</b>&nbsp;?', opts:['plays','buys','flys','goes'], ans:2, why:'<i lang="en">fly</i> finit par consonne + y : <i lang="en">flies</i>. Avec voyelle + y, on garde le y : <i lang="en">plays, buys</i>.'},
   {q:'Récris en commençant par <i lang="en">He</i> : <i lang="en">I finish work at five and I go home.</i>', lab:'Ta phrase', txt:X('He finishes work at five and {he |}goes home.'), why:'<i lang="en">finish → finishes</i> (-sh) et <i lang="en">go → goes</i> (-o) : <i lang="en">He finishes work at five and he goes home.</i>'},
 ]},
 {n:'L’heure et les jours', r:'Dire l’heure : past et to', qs:[
   {q:'Écoute et écris l’heure en chiffres (par exemple 9:10).', audio:'It’s quarter to four.', cache:true, lab:'Heure', txt:['3:45','3h45','15:45','15h45'], why:'<i lang="en">quarter to four</i> : il manque un quart d’heure pour 4 h, donc 3 h 45.'},
   {q:'Écoute et écris l’heure de la réunion en chiffres (par exemple 9:10).', audio:'The meeting starts at ten past two.', cache:true, lab:'Heure', txt:['2:10','2h10','14:10','14h10'], why:'<i lang="en">ten past two</i> : dix minutes après 2 h, donc 2 h 10 (14 h 10).'},
   {q:'Comment dit-on 6 h 20&nbsp;?', opts:['twenty to six','twenty past six','six to twenty','twenty past seven'], ans:1, why:'20 minutes après 6 h : <i lang="en">twenty past six</i>. <i lang="en">twenty to six</i> serait 5 h 40.'},
   {q:'Écris en lettres, en anglais, l’heure 9 h 30.', lab:'En anglais', txt:X('{|It’s |It is }half past nine','{|It’s |It is }nine thirty'), why:'<i lang="en">half past nine</i>, ou en lisant les chiffres <i lang="en">nine thirty</i>.'},
   {q:'Un ami britannique te dit <i lang="en">See you at half six!</i> À quelle heure est le rendez-vous&nbsp;?', opts:['5 h 30','6 h 30','6 h 50','7 h 30'], ans:1, why:'À l’oral, en Grande-Bretagne, <i lang="en">half six</i> = <i lang="en">half past six</i> = 6 h 30.'},
   {q:'Comment dit-on « Je travaille le samedi (tous les samedis). »&nbsp;?', opts:['I work at Saturdays.','I work in Saturday.','I work on Saturdays.','I work the Saturday.'], ans:2, why:'Les jours prennent <i lang="en">on</i> et une majuscule ; le pluriel marque l’habitude : <i lang="en">on Saturdays</i>.'},
 ]},
 {n:'Les adverbes de fréquence', r:'Placer l’adverbe de fréquence', qs:[
   {q:'Remets dans l’ordre : « Je suis souvent fatigué le lundi. »', ordre:['I','am','often','tired','on','Mondays.'], why:'Avec <i lang="en">be</i>, l’adverbe se place après : <i lang="en">I am often tired on Mondays.</i>'},
   {q:'Remets dans l’ordre : « Elle ne boit jamais de café après le déjeuner. »', ordre:['She','never','drinks','coffee','after','lunch.'], alt:['After lunch she never drinks coffee.'], why:'<i lang="en">never</i> avant le verbe : <i lang="en">She never drinks coffee after lunch.</i>'},
   {q:'Ajoute <i lang="en">usually</i> à la phrase : <i lang="en">We have dinner at eight.</i>', lab:'Ta phrase', txt:['We usually have dinner at eight.'], why:'L’adverbe se place juste avant le verbe d’action : <i lang="en">We usually have dinner at eight.</i>'},
   {q:'Comment dit-on « Il n’est jamais en retard. »&nbsp;?', opts:['He never is late.','He is never late.','He isn’t never late.','He doesn’t never late.'], ans:1, why:'Après <i lang="en">be</i> : <i lang="en">He is never late.</i> <i lang="en">never</i> est déjà négatif : pas de <i lang="en">not</i> en plus.'},
   {q:'Écris en anglais : « Je vais à la piscine une fois par semaine. »', lab:'Ta phrase', txt:X('I go {to the pool|to the swimming pool|swimming} once a week.','Once a week{,|} I go {to the pool|to the swimming pool|swimming}.'), why:'<i lang="en">once a week</i> se place à la fin : <i lang="en">I go to the pool once a week.</i>'},
   {q:'Quel adverbe correspond à environ 50 % du temps&nbsp;?', opts:['always','usually','never','sometimes'], ans:3, why:'<i lang="en">sometimes</i> = parfois. <i lang="en">always</i> 100 %, <i lang="en">usually</i> 90 %, <i lang="en">never</i> 0 %.'},
 ]},
 {n:'Écouter et prononcer le -s', r:'Le -s : /s/, /z/ ou /ɪz/', qs:[
   {q:'Dans quel verbe le -s ajoute-t-il une syllabe (« iz »)&nbsp;?', opts:['reads','gets','teaches','plays'], ans:2, why:'<i lang="en">teach</i> finit par le son sifflant ch : <i lang="en">teaches</i> se dit « tii-tchiz ». <i lang="en">gets</i> : /s/ ; <i lang="en">reads, plays</i> : /z/.'},
   {q:'Écoute. Pourquoi Paul arrive-t-il au bureau avant neuf heures&nbsp;?', audio:[['Nina','You’re always here early, Paul!'],['Paul','Yes, I start at nine, but I always get here at half past eight.'],['Nina','Why?'],['Paul','The coffee is free before nine!']], cache:true, opts:['Il commence à 8 h 30.','Le café est gratuit avant 9 h.','Il prend le premier train.','Son chef arrive tôt.'], ans:1, why:'<i lang="en">The coffee is free before nine!</i> Il commence à 9 h mais arrive toujours à 8 h 30 (<i lang="en">half past eight</i>).'},
   {q:'Dictée. Écoute et écris la phrase exacte (une habitude du matin).', dictee:'My brother never watches TV in the morning.', why:'<i lang="en">never</i> avant le verbe, et <i lang="en">watches</i> avec -es (verbe en -ch).'},
   {q:'Dictée. Écoute et écris la phrase exacte (l’heure du déjeuner).', dictee:'We usually have lunch at one o’clock.', why:'<i lang="en">usually</i> avant <i lang="en">have</i>, pas de -s avec <i lang="en">we</i>, et <i lang="en">o’clock</i> avec une apostrophe.'},
 ]},
];
})();
