/* Déclic — Anglais A1 (unités 7 à 9). Format : docs/ANGLAIS.md */
(()=>{
const E=s=>`<i lang="en">${s}</i>`;
// Variantes contractées ou non pour ’s et ’d (le moteur ne les développe pas) : « There is » ↔ « There’s », « I would » ↔ « I’d ».
// Jamais en fin de phrase (« Yes, it is. » ne se contracte pas).
const CT=[['I would','I’d'],['you would','you’d'],['we would','we’d'],['it is','it’s'],['that is','that’s'],['there is','there’s'],['here is','here’s'],['what is','what’s'],['where is','where’s'],['who is','who’s'],['he is','he’s'],['she is','she’s'],['he has got','he’s got'],['she has got','she’s got'],['it has got','it’s got']];
const V=(...a)=>{ const out=new Set(a.flat()); let grew=true;
  while(grew){ grew=false; for(const s of [...out]) for(const [f,c] of CT) for(const [x,y] of [[f,c],[c,f]]){
    const re=new RegExp('\\b'+x+'\\b(?![\\s.!?,]*$)','gi'); let m;
    while((m=re.exec(s))){ const r=m[0][0]===m[0][0].toUpperCase()?y[0].toUpperCase()+y.slice(1):y, t=s.slice(0,m.index)+r+s.slice(m.index+m[0].length); if(!out.has(t)){ out.add(t); grew=true; } } } }
  return [...out]; };
// Toutes les combinaisons : X('Go ',['left','right']) → ['Go left','Go right']
const X=(...parts)=>parts.reduce((acc,p)=>acc.flatMap(a=>[].concat(p).map(b=>a+b)),['']);

// Plan de la petite ville de l’unité Around town (une copie par étape : chaque SVG a son propre identifiant)
const plan=()=>{ const P=plane({x:[0,10],y:[0,8],w:320,grid:false,axes:false});
  [[5,0,5,7],[0,7,10,7],[0,4.5,10,4.5],[0,2,10,2]].forEach(s=>P.seg(...s,{c:'var(--line)',w:14}));
  const b=(x,y,w,h,l)=>{ P.rect(x,y,w,h,{fill:'var(--other)',fo:.15,c:'var(--other)',w:1.5}); P.text(x+w/2,y+h/2,l,{a:'middle',s:10,dy:4}); };
  P.rect(0.3,7.45,9.4,0.45,{fill:'var(--ok)',fo:.25,c:null}); P.text(5,7.67,'Park',{a:'middle',s:10,dy:4});
  b(2.9,0.55,1.6,1.1,'Bank'); b(5.5,0.55,2.1,1.1,'Post office');
  b(0.3,2.5,2.3,1.5,'Supermarket'); b(3,2.5,1.5,1.5,'Café'); b(5.5,2.5,1.8,1.5,'Chemist’s'); b(7.6,2.5,2.1,1.5,'Bakery');
  b(0.3,5,2.3,1.5,'Museum'); b(2.9,5,1.6,1.5,'Library'); b(5.5,5,1.7,1.5,'Cinema'); b(7.5,5,2.2,1.5,'Hotel');
  [['Mill Lane',2],['Church Street',4.5],['Park Road',7]].forEach(([l,y])=>P.text(9.8,y,l,{a:'end',s:9,dy:3,c:'var(--muted)'}));
  P.dot(5,4.5,{c:'var(--bad)',r:4});
  P.dot(5,0.25,{c:'var(--spark)',r:5}); P.text(4.75,0.25,'You are here',{a:'end',s:10,dy:4});
  return P.svg(); };

COURS.push(
/* ================================================================== 7. Food and drink */
{subj:'en', sem:'a1', id:'en-a1-food', o:7, h:'Food and drink', p:`Parler de ce qu’on mange et boit, commander au café et payer : dénombrables et indénombrables, ${E('some/any')}, ${E('How much / How many')} et les prix.`, steps:[
 {kind:'Écoute', h:'Au café',
  p:`<p>À la fin de cette unité, tu sauras commander dans un café, demander ce qu’il y a, comprendre un prix et parler de ce que tu manges, avec les bons petits mots : ${E('some')}, ${E('any')}, ${E('How much')}, ${E('How many')}.</p>
<p>Lucy entre dans un café à Londres. <b>Écoute sans lire</b>, une ou deux fois, puis réponds. Le texte apparaîtra après ta réponse.</p>
<p><b>Question :</b> qu’est-ce que Lucy prend finalement&nbsp;?</p>`,
  audio:[['Waiter','Hi! What can I get you?'],['Lucy','Hi. Can I have a cappuccino, please?'],['Waiter','Sure. Anything else?'],['Lucy','Have you got any orange juice?'],['Waiter','Sorry, we haven’t got any orange juice today. But we’ve got some apple juice.'],['Lucy','OK, an apple juice, then. And I’d like a cheese sandwich, please.'],['Waiter','Is that to eat in or take away?'],['Lucy','Eat in, please. How much is that?'],['Waiter','That’s eight pounds forty.'],['Lucy','Here you are.'],['Waiter','Thank you!']], cache:true,
  opts:['Un cappuccino, un jus d’orange et un sandwich au fromage','Un thé, un jus de pomme et un sandwich au jambon','Un cappuccino, un jus de pomme et un sandwich au fromage','Un cappuccino et un jus de pomme, à emporter'], ans:2,
  why:`Il n’y a plus de jus d’orange (${E('we haven’t got any orange juice today')}), alors Lucy prend un jus de pomme : ${E('an apple juice, then')}. Elle mange sur place (${E('Eat in, please')}) et paie 8,40 livres (${E('eight pounds forty')}).`},

 {kind:'Vocabulaire', h:'À manger et à boire',
  p:`<p>Les aliments et les boissons de tous les jours. Touche une ligne pour l’entendre avec son exemple, puis répète à voix haute. Remarque déjà que beaucoup de ces mots s’emploient <b>sans</b> ${E('a')} ni pluriel : ${E('bread')}, ${E('cheese')}, ${E('milk')}. On verra pourquoi juste après.</p>`,
  mots:[['bread','du pain','Can I have some bread, please?'],['butter','du beurre','Toast with butter, please.'],['jam','de la confiture','I have toast and jam for breakfast.'],['cheese','du fromage','A cheese sandwich, please.'],['meat','de la viande','I don’t eat meat.'],['chicken','du poulet','Chicken and rice, please.'],['fish','du poisson','We have fish on Fridays.'],['rice','du riz','There’s some rice in the cupboard.'],['pasta','des pâtes','Pasta is my favourite food.'],['vegetables','des légumes','I eat vegetables every day.'],['fruit','des fruits','Do you eat fruit in the morning?'],['an apple','une pomme','An apple a day keeps the doctor away.'],['an egg','un œuf','Two eggs, please.'],['water','de l’eau','A glass of water, please.'],['milk','du lait','Tea with milk, please.'],['juice','du jus','An orange juice, please.'],['sugar','du sucre','No sugar, thanks.'],['chips / fries','des frites','Fish and chips is a British classic.'],['crisps','des chips (en sachet)','A packet of crisps, please.'],['breakfast','le petit-déjeuner','I have breakfast at seven.'],['lunch','le déjeuner (à midi)','We have lunch at half past twelve.'],['dinner','le repas du soir','Dinner is ready!']],
  note:`<b>Faux amis britanniques :</b> les frites se disent ${E('chips')} en Grande-Bretagne (${E('fries')} aux États-Unis), et les chips en sachet se disent ${E('crisps')} (${E('chips')} aux États-Unis). Au Royaume-Uni, ${E('fish and chips')} = poisson frit et frites.`},

 {kind:'Pratique', h:'À toi : la liste de courses',
  p:`<p>Tu prépares la liste de courses en anglais.</p><p><b>Question :</b> écris en anglais « du lait, des œufs et du fromage ».</p>`, lab:'En anglais',
  txt:X(['','some '],'milk, ',['','some '],'eggs and ',['','some '],'cheese'),
  why:`${E('milk, eggs and cheese')} : dans une liste, pas besoin d’article. « du », « de la », « des » ne se traduisent pas mot à mot ; on peut ajouter ${E('some')} (${E('some milk')}), mais ce n’est pas obligatoire.`},

 {kind:'Vocabulaire', h:'Au café : commander et payer',
  p:`<p>Les phrases toutes faites du café et du restaurant. Apprends-les en bloc, comme des mots : c’est ce qu’on entend et ce qu’on dit vraiment au comptoir.</p>`,
  mots:[['What can I get you?','Qu’est-ce que je vous sers ?'],['Can I have…, please?','Je peux avoir…, s’il vous plaît ?','Can I have a tea, please?'],['I’d like…','Je voudrais…','I’d like a cheese sandwich, please.'],['Have you got…? / Do you have…?','Vous avez… ?','Have you got any orange juice?'],['Anything else?','Autre chose ?'],['That’s all, thanks.','Ce sera tout, merci.'],['Eat in or take away?','Sur place ou à emporter ?','Take away, please.'],['How much is it?','Combien ça coûte ?','How much is a coffee?'],['The bill, please.','L’addition, s’il vous plaît.'],['Here you are.','Voilà (en tendant quelque chose).'],['a cup of tea','une tasse de thé'],['a glass of water','un verre d’eau'],['a bottle of…','une bouteille de…','A bottle of water, please.'],['a piece of cake','une part de gâteau'],['still or sparkling?','plate ou gazeuse ?','Still water, please.']],
  note:`<b>Politesse :</b> ${E('I want a coffee')} paraît brusque, presque impoli. Dis ${E('I’d like…')} (= ${E('I would like')}) ou ${E('Can I have…?')}, et n’oublie jamais ${E('please')}. Aux États-Unis : ${E('For here or to go?')} (sur place ou à emporter) et ${E('the check')} (l’addition).`},

 {kind:'Pratique', h:'À toi : commander poliment',
  p:`<p>Tu es au comptoir d’un café à Édimbourg.</p><p><b>Question :</b> demande poliment au serveur « une part de gâteau au chocolat, s’il vous plaît ». Fais une phrase complète.</p>`, lab:'Ta phrase',
  txt:V(X(['I would like','Can I have','Could I have','May I have','Can I get'],' a ',['piece','slice'],' of chocolate cake, please'),X('Please can I have a ',['piece','slice'],' of chocolate cake'),X('A ',['piece','slice'],' of chocolate cake, please')), show:'Can I have a piece of chocolate cake, please?',
  why:`${E('Can I have a piece of chocolate cake, please?')} ou ${E('I’d like a piece of chocolate cake, please.')} Le gâteau entier, c’est ${E('a cake')} ; une part, c’est ${E('a piece')} (ou ${E('a slice')}) ${E('of cake')}.`},

 {kind:'Grammaire', h:'Dénombrables et indénombrables',
  p:`<p>Lucy commande ${E('a cappuccino')} et ${E('a cheese sandwich')}, avec ${E('a')}. Mais le serveur parle de ${E('some apple juice')}, sans ${E('a')} et sans pluriel. Pourquoi&nbsp;? Parce que l’anglais range les noms en deux familles : ceux qu’on compte et ceux qu’on ne compte pas.</p>
<div class="def"><p><b>Nom dénombrable</b> (<i>countable</i>) : une chose qu’on peut compter. Il a un singulier avec ${E('a/an')} et un pluriel : ${E('an egg, two eggs; a sandwich, three sandwiches')}.</p><p><b>Nom indénombrable</b> (<i>uncountable</i>) : une matière, une masse, une idée qu’on ne compte pas. <b>Pas de ${E('a/an')}, pas de pluriel</b>, et le verbe reste au singulier : ${E('water, milk, bread, cheese, rice, pasta, sugar, money, information, advice')}.</p></div>
<div class="idea"><p>Pour compter un indénombrable, on compte son <b>contenant</b> ou sa <b>portion</b> : ${E('a glass of water')}, ${E('two cups of tea')}, ${E('a bottle of milk')}, ${E('a piece of cheese')}, ${E('a loaf of bread')} (une miche de pain), ${E('a slice of bread')} (une tranche). C’est ${E('glass')}, ${E('cup')}, ${E('piece')} qui prennent le pluriel.</p></div>
<div class="ex"><p>${E('The bread is fresh.')} (pas « The breads are ») · ${E('Pasta is my favourite food.')} · ${E('I’d like two bottles of water.')} · ${E('Fruit is good for you.')}</p></div>
<div class="warn"><p>Les pièges des francophones : ${E('a bread')} et ${E('breads')} n’existent pas au sens de « du pain » : dis ${E('some bread')} ou ${E('a loaf of bread')}. De même, pas de ${E('an information')}, ${E('advices')} ni ${E('furnitures')}. ${E('Fruit')} est en général indénombrable (${E('I eat fruit')}), et ${E('money')} est singulier : ${E('My money is in my bag')}.</p><p>Au café, on dit pourtant ${E('a coffee')}, ${E('two teas')}, ${E('an orange juice')} : on sous-entend ${E('a cup of')}, ${E('a glass of')}. C’est une portion qu’on commande.</p></div>`,
  audio:'An egg, two eggs. A sandwich, three sandwiches. Some water, a glass of water. Some bread, a loaf of bread, two slices of bread.'},

 {kind:'Pratique', h:'À toi : corrige l’erreur',
  p:`<p>Un client francophone demande au boulanger : ${E('Can I have a bread, please?')} La phrase est fautive.</p><p><b>Question :</b> écris la phrase correcte (il veut du pain, ou une miche de pain).</p>`, lab:'Ta phrase',
  txt:V(X(['Can I have','Could I have','I would like'],[' some bread',' a loaf of bread',' a loaf',' a bread roll',' bread'],[', please','']),X('Please can I have ',['some bread','a loaf of bread'])), show:'Can I have some bread, please?',
  why:`${E('bread')} est indénombrable : pas de ${E('a')}. On dit ${E('Can I have some bread, please?')} ou, pour une miche entière, ${E('Can I have a loaf of bread, please?')}`},

 {kind:'Grammaire', h:'Some et any',
  p:`<p>Le serveur dit ${E('we haven’t got <b>any</b> orange juice')} puis ${E('we’ve got <b>some</b> apple juice')}. Les deux mots traduisent « du », « de la », « des », ou « pas de ». Lequel choisir&nbsp;?</p>
<div class="def"><p><b>some</b> dans une phrase <b>affirmative</b> : ${E('There’s some milk. I’ve got some apples.')}</p><p><b>any</b> dans une phrase <b>négative</b> et dans une <b>question</b> : ${E('There isn’t any milk. Have you got any apples?')}</p><p>Les deux s’emploient avec un <b>pluriel</b> (${E('apples')}) ou un <b>indénombrable</b> (${E('milk')}). Avec un dénombrable au singulier, on garde ${E('a/an')} : ${E('Have you got an apple?')}</p></div>
<div class="idea"><p>${E('some')} = une certaine quantité, sans préciser combien. ${E('any')} = n’importe quelle quantité, même la plus petite : ${E('not any')} = pas du tout. Exception utile : pour <b>offrir</b> ou <b>demander</b> quelque chose, on garde ${E('some')} même dans une question, parce qu’on attend un oui : ${E('Would you like some tea?')} ${E('Can I have some water, please?')}</p></div>
<div class="ex"><p>${E('There are some eggs in the fridge, but there isn’t any butter.')}<br>${E('Is there any sugar? – Yes, there’s some in the cupboard.')}</p></div>
<div class="warn"><p>Pas de ${E('of')} après ${E('some')} devant un nom : ${E('some bread')}, jamais « some of bread ». Pas de ${E('some')} dans une négation : ${E('I haven’t got any money')}, pas « I haven’t got some money ». Et pour une vérité générale, ni ${E('some')} ni article : ${E('I like cheese')} (j’aime le fromage), pas « I like the cheese ».</p></div>`,
  audio:'There are some eggs in the fridge, but there isn’t any butter. Is there any sugar? Yes, there’s some in the cupboard. Would you like some tea?'},

 {kind:'Méthode', h:'Choisir entre a/an, some et any',
  p:`<p><b>Quand :</b> chaque fois que le français dit « un », « du », « de la », « des » ou « pas de » devant un nom. <b>Pourquoi ça marche :</b> le choix dépend de deux questions seulement, le type de nom et le type de phrase. <b>Comment :</b></p>
<ol><li>Le nom est-il un dénombrable <b>singulier</b> ? Alors ${E('a/an')} : ${E('an orange, a sandwich')}.</li><li>Sinon (pluriel ou indénombrable), la phrase est-elle <b>affirmative</b> ? Alors ${E('some')}.</li><li>Est-elle <b>négative</b> ou une <b>question</b> ? Alors ${E('any')}… sauf pour offrir ou demander poliment : ${E('some')}.</li></ol>`,
  demo:{enonce:`Traduis : « Il n’y a pas de lait, mais il y a des œufs. Tu veux du thé ? »`,
   etapes:[{f:`« pas de lait » : ${E('milk')} est indénombrable, la phrase est négative → ${E('There isn’t any milk')}`,w:`Indénombrable : verbe au singulier (${E('isn’t')}) et ${E('any')} dans la négation.`},
    {f:`« des œufs » : ${E('eggs')} est un pluriel, la phrase est affirmative → ${E('there are some eggs')}`,w:`Pluriel : ${E('there are')}, et ${E('some')} car on affirme.`},
    {f:`« Tu veux du thé ? » : c’est une offre → ${E('Would you like some tea?')}`,w:`Une question, mais une offre : on garde ${E('some')}. ${E('Would you like…?')} est la façon polie de proposer.`}],
   conclusion:E('There isn’t any milk, but there are some eggs. Would you like some tea?')}},

 {kind:'Pratique', h:'À toi : some ou any ?',
  p:`<p>Complète la phrase avec ${E('some')} ou ${E('any')} : ${E('There isn’t ___ milk in the fridge, but there are ___ eggs.')}</p><p><b>Question :</b> écris les deux mots manquants dans l’ordre, séparés par une virgule.</p>`, lab:'Les deux mots',
  txt:['any, some'],
  why:`${E('There isn’t <b>any</b> milk')} (négation) ${E('but there are <b>some</b> eggs')} (affirmation).`},

 {kind:'Pratique', h:'À toi : la négation',
  p:`<p>Ton colocataire écrit sur la liste : ${E('We’ve got some bananas.')} Mais c’est faux, il n’y en a plus.</p><p><b>Question :</b> écris la phrase à la forme négative.</p>`, lab:'Ta phrase',
  txt:['We haven’t got any bananas.','We don’t have any bananas.','We have no bananas.','We’ve got no bananas.'],
  why:`${E('some')} devient ${E('any')} dans la négation : ${E('We haven’t got any bananas.')} (ou ${E('We don’t have any bananas.')})`},

 {kind:'Grammaire', h:'How much, How many et les prix',
  p:`<p>Lucy demande ${E('How much is that?')} Pour demander une <b>quantité</b> ou un <b>prix</b>, l’anglais a deux questions, et le choix dépend encore du type de nom.</p>
<div class="def"><p><b>How many</b> + nom dénombrable au <b>pluriel</b> : ${E('How many eggs do you need?')}</p><p><b>How much</b> + nom <b>indénombrable</b> : ${E('How much milk do you want?')}</p><p><b>How much</b> seul = combien ça coûte : ${E('How much is it?')} (une chose), ${E('How much are they?')} (plusieurs), ${E('How much does it cost?')}</p></div>
<div class="idea"><p>Pour lire un prix, on dit l’unité monétaire entre les deux nombres : <b>£3.50</b> = ${E('three pounds fifty')} (ou ${E('three fifty')}) ; <b>80p</b> = ${E('eighty p')} ou ${E('eighty pence')} ; <b>$4.99</b> = ${E('four dollars ninety-nine')} ; <b>CHF 5.20</b> = ${E('five francs twenty')} ; <b>€2.50</b> = ${E('two euros fifty')}. À l’écrit, le symbole se met <b>devant</b> et on utilise un <b>point</b> : £3.50, pas 3,50 £.</p></div>
<div class="warn"><p>Pièges : ${E('How many money')} → ${E('How much money')} (${E('money')} est indénombrable). ${E('How much costs it?')} est faux : ${E('How much is it?')} ou ${E('How much does it cost?')} (présent simple avec ${E('does')}). Pour un prix, ${E('pound')} prend un <b>s</b> au pluriel (${E('ten pounds')}).</p></div>`,
  audio:'How many eggs do you need? How much milk do you want? How much is it? Three pounds fifty. Eighty pence. Four dollars ninety-nine. Five francs twenty.'},

 {kind:'Pratique', h:'À toi : much ou many ?',
  p:`<p>Complète les deux questions : ${E('How ___ cheese do we need? How ___ apples do you want?')}</p><p><b>Question :</b> écris les deux mots manquants dans l’ordre, séparés par une virgule.</p>`, lab:'Les deux mots',
  txt:['much, many'],
  why:`${E('cheese')} est indénombrable → ${E('How much')} ; ${E('apples')} est un pluriel → ${E('How many')}.`},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:`<p>Au marché, tu veux connaître le prix d’une bouteille d’eau.</p><p><b>Question :</b> touche les mots dans le bon ordre.</p>`,
  ordre:['How','much','is','a','bottle','of','water?'],
  why:`${E('How much is a bottle of water?')} ${E('How much')} vient en tête, puis le verbe ${E('is')}, puis le sujet.`},

 {kind:'Écoute', h:'Combien ça coûte ?',
  p:`<p>Écoute la fin d’une commande dans un café de Manchester.</p><p><b>Question :</b> combien le client doit-il payer&nbsp;? Écris le prix en chiffres.</p>`,
  audio:[['Customer','Two coffees and a muffin, please. How much is that?'],['Waiter','That’s seven pounds sixty-five, please.']], cache:true, lab:'Prix en livres',
  txt:['7.65','£7.65','7.65 pounds','7 pounds 65','seven pounds sixty-five','seven sixty-five'],
  why:`${E('Seven pounds sixty-five')} = £7.65. ${E('Sixty-five')} : attention à ne pas confondre ${E('sixty')} (60) et ${E('sixteen')} (16), dont l’accent est sur la fin.`},

 {kind:'Prononciation', h:'Les formes faibles : a cup of tea',
  p:`<p>Écoute un Britannique commander : tu n’entends presque pas ${E('a')}, ${E('of')}, ${E('some')}, ${E('and')}. Ce sont des <b>formes faibles</b> : les petits mots grammaticaux se prononcent vite, avec une voyelle neutre (le son « e » de « le »), et seuls les mots importants sont accentués.</p>
<div class="def"><p>${E('a')} → « e » · ${E('of')} → « ev » · ${E('some')} → « sem » · ${E('and')} → « en » · ${E('can')} → « ken ».</p></div>
<div class="ex"><p>${E('a <b>cup</b> of <b>tea</b>')} se dit presque « e keup ev ti ». Les Britanniques en ont même fait un mot familier : ${E('a cuppa')} (une tasse de thé). ${E('<b>fish</b> and <b>chips</b>')} → « fish en chips ».</p></div>
<div class="warn"><p>Le piège des francophones : prononcer chaque mot avec la même force, « a cup off tea ». Le résultat est compréhensible mais haché. Accentue ${E('cup')} et ${E('tea')}, et glisse sur le reste.</p></div>
<p>Écoute, puis redis la phrase en imitant le rythme.</p>`,
  audio:'A cup of tea. A glass of water. Some milk. Fish and chips. Can I have a cup of tea and a glass of water, please?',
  dire:'Can I have a cup of tea and a glass of water, please?'},

 {kind:'Lecture', h:'Le petit-déjeuner ailleurs',
  p:`<p>Lis cet article d’un blog de voyage, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Breakfast around the world"><p lang="en">In Britain, most people have a quick breakfast during the week: a bowl of cereal with milk, or some toast with butter and jam, and a cup of tea. But at the weekend, some people have a “full English breakfast”: eggs, bacon, sausages, beans, mushrooms, tomatoes and toast. It’s a big meal! There isn’t any fruit on the plate. In the USA, a lot of people have pancakes with maple syrup, or eggs and coffee. And in Switzerland? There’s often some bread, butter, jam and cheese on the table, with coffee or hot chocolate. A lot of people eat muesli too. Muesli comes from Switzerland: it’s more than a hundred years old! What about you? What do you have for breakfast?</p></div>
<p><b>Question :</b> laquelle de ces affirmations est vraie d’après le texte&nbsp;?</p>`,
  audio:'In Britain, most people have a quick breakfast during the week: a bowl of cereal with milk, or some toast with butter and jam, and a cup of tea. But at the weekend, some people have a full English breakfast: eggs, bacon, sausages, beans, mushrooms, tomatoes and toast. It’s a big meal! There isn’t any fruit on the plate. In the USA, a lot of people have pancakes with maple syrup, or eggs and coffee. And in Switzerland? There’s often some bread, butter, jam and cheese on the table, with coffee or hot chocolate. A lot of people eat muesli too. Muesli comes from Switzerland: it’s more than a hundred years old! What about you? What do you have for breakfast?',
  opts:['Le « full English breakfast » est un petit-déjeuner léger, avec beaucoup de fruits.','En semaine, beaucoup de Britanniques prennent un petit-déjeuner rapide : céréales ou toasts, et du thé.','Aux États-Unis, on mange surtout du muesli le matin.','Le muesli a été inventé il y a une vingtaine d’années.'], ans:1,
  why:`${E('Most people have a quick breakfast during the week: a bowl of cereal… or some toast… and a cup of tea.')} Le ${E('full English')} est un gros repas (${E('a big meal')}) sans fruits (${E('There isn’t any fruit on the plate')}), et le muesli, suisse, a plus de cent ans.`},

 {kind:'Dictée', h:'Dictée : dans la cuisine',
  p:'Écoute et écris exactement la phrase. Réécoute autant que tu veux, et utilise « Plus lentement » si besoin.',
  dictee:'We haven’t got any milk, but we’ve got some orange juice.',
  why:`Négation → ${E('any')} ; affirmation → ${E('some')}. ${E('haven’t')} = ${E('have not')}, ${E('we’ve')} = ${E('we have')}.`},

 {kind:'Oral', h:'Commande au café',
  p:`<p>À toi de parler, 30 secondes environ. Tu es au comptoir d’un café à Londres : salue, commande une boisson, demande s’ils ont quelque chose à manger (un gâteau, un sandwich…), réponds à ${E('Eat in or take away?')} et demande le prix. Touche « Parler », puis « J’ai fini ».</p>`,
  oral:{modele:'Hi! Can I have a large latte, please? And have you got any carrot cake? Great, I’d like a piece of carrot cake, then. Eat in, please. How much is that? Here you are. Thank you!',
   criteres:['J’ai salué','J’ai commandé avec Can I have… ou I’d like… et please','J’ai demandé Have you got any… ? ou Do you have any… ?','J’ai dit Eat in ou Take away','J’ai demandé le prix avec How much…?']}},

 {kind:'Écriture', h:'Message : les courses pour ce soir',
  p:`<p>Ce soir, tu fais à manger pour des amis. Écris un message en anglais à ton colocataire (au moins 35 mots) : dis ce qu’il y a déjà dans la cuisine, ce qui manque, demande-lui d’acheter deux ou trois choses avec des quantités, et pose-lui une question avec ${E('How much')} ou ${E('How many')}.</p>`,
  ecrire:{min:35, modele:'Hi Jess! I want to make pasta tonight for my friends. We’ve got some pasta and some cheese, but there aren’t any tomatoes and there isn’t any milk. Can you buy six tomatoes and a bottle of milk, please? Oh, and some bread. How much bread do we need for four people? Thanks! Tom',
   criteres:[{t:'J’ai utilisé some dans une phrase affirmative', re:'\\bsome\\b'},{t:'J’ai utilisé any dans une négation ou une question', re:'\\bany\\b'},{t:'J’ai posé une question avec How much ou How many', re:'\\bhow (much|many)\\b'},'Je n’ai mis ni a/an ni -s aux indénombrables (bread, milk, cheese…)',{t:'J’ai demandé poliment (please)', re:'\\bplease\\b'}]}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>Dénombrable</b> : ${E('a/an')} et pluriel (${E('an egg, two eggs')}). <b>Indénombrable</b> : ni ${E('a/an')} ni pluriel, verbe au singulier (${E('bread, milk, cheese, rice, pasta, money, fruit')}).</li><li>Compter un indénombrable : ${E('a glass of water, two cups of tea, a bottle of milk, a piece of cake, a loaf of bread')}.</li><li><b>some</b> à l’affirmatif, <b>any</b> à la négation et dans les questions ; ${E('some')} pour offrir ou demander : ${E('Would you like some tea? Can I have some water?')}</li><li><b>How many</b> + pluriel, <b>How much</b> + indénombrable ; prix : ${E('How much is it / are they?')}</li><li>Prix : £3.50 = ${E('three pounds fifty')}, 80p = ${E('eighty p')}, $4.99 = ${E('four dollars ninety-nine')}.</li><li>Commander : ${E('Can I have…, please? I’d like… Have you got any…? Eat in or take away? The bill, please.')} Évite ${E('I want')}.</li><li>Formes faibles : ${E('a cup of tea')} = « e keup ev ti ».</li></ul></div>`},

 {kind:'Mission', h:'Au comptoir',
  p:`<p>Tu attends ton tour dans un café de Bristol. Voici le menu. Écoute la commande du client devant toi, puis réponds aux questions. Tu peux réécouter.</p>
<div class="blk" data-t="Menu"><p lang="en">Tea £2.20 · Coffee £2.60 · Cappuccino £3.10 · Hot chocolate £3.00<br>Orange juice £2.40 · Water (still or sparkling), bottle £1.50<br>Cheese sandwich £4.50 · Chicken sandwich £5.20<br>Carrot cake (piece) £3.30 · Muffin £2.80</p></div>`,
  audio:[['Waiter','Good morning. What can I get you?'],['Customer','Morning! Two teas, please. And have you got any muffins?'],['Waiter','Sorry, we haven’t got any muffins this morning. But we’ve got some carrot cake.'],['Customer','OK, a piece of carrot cake, then. And a bottle of sparkling water.'],['Waiter','Anything else?'],['Customer','No, that’s all, thanks. Take away, please.']], cache:true,
  parts:[
   {q:'a) Pourquoi le client prend-il du gâteau aux carottes&nbsp;?', opts:['Il n’aime pas les muffins.','Il n’y a plus de muffins ce matin.','Le gâteau est moins cher.','Le serveur le lui offre.'], ans:1, hint:`Écoute la réponse du serveur à ${E('have you got any muffins?')}`, why:`${E('Sorry, we haven’t got any muffins this morning.')} Il n’y en a plus, alors le client se rabat sur ${E('some carrot cake')}.`},
   {q:'b) Avec le menu, calcule le prix total de sa commande. Écris-le en chiffres.', lab:'Total en livres', txt:['9.20','£9.20','9.2','9.20 pounds','nine pounds twenty','nine twenty'], hint:`Il prend deux thés (${E('two teas')}), une part de gâteau et une bouteille d’eau.`, why:'2 × 2,20 + 3,30 + 1,50 = 4,40 + 3,30 + 1,50 = 9,20 : £9.20, ' + E('nine pounds twenty') + '.'},
   {q:'c) Il paie avec un billet de 20 livres. Combien lui rend-on&nbsp;? Écris la somme en chiffres.', lab:'Monnaie en livres', txt:['10.80','£10.80','10.8','10.80 pounds','ten pounds eighty','ten eighty'], hint:'20 − 9,20.', why:'20 − 9,20 = 10,80 : £10.80, ' + E('ten pounds eighty') + '.'},
   {q:'d) C’est ton tour. Tu veux un thé avec du lait : demande poliment au serveur s’il a du lait.', lab:'Ta question', txt:V(['Have you got any milk?','Do you have any milk?','Have you got any milk, please?','Do you have any milk, please?','Is there any milk?','Can I have some milk, please?','Could I have some milk, please?','Can I have some milk?','Can I have a tea with milk, please?','I would like a tea with milk, please.','Can I have a tea with some milk, please?']), hint:`Une question → ${E('any')} ; une demande polie → ${E('some')}.`, why:`${E('Have you got any milk?')} (question) ou ${E('Can I have some milk, please?')} (demande polie, donc ${E('some')}).`}],
  sol:`<p lang="en">Waiter: Good morning. What can I get you? – Customer: Morning! Two teas, please. And have you got any muffins? – Sorry, we haven’t got any muffins this morning. But we’ve got some carrot cake. – OK, a piece of carrot cake, then. And a bottle of sparkling water. – Anything else? – No, that’s all, thanks. Take away, please.</p><p>Total : 2 × £2.20 + £3.30 + £1.50 = £9.20. Sur 20 livres, on lui rend £10.80. Pour demander du lait : ${E('Have you got any milk?')} ou ${E('Can I have some milk, please?')}</p>`},

 {kind:'Mission', h:'Un dîner pour huit',
  p:`<p>Ton amie Nina organise un dîner samedi et t’envoie ce message. Lis-le attentivement, puis réponds. (${E('starter')} = entrée, ${E('main course')} = plat principal, ${E('cupboard')} = placard, ${E('There are eight of us')} = nous sommes huit.)</p>
<div class="blk" data-t="Message"><p lang="en">Hi! Thanks for your help with the dinner on Saturday. There are eight of us. For the starter, I want to make a big salad: we’ve got some lettuce, but we haven’t got any tomatoes. Can you buy two tomatoes for each person? For the main course, there’s some rice in the cupboard and I’ve got the chicken. For dessert, my sister wants to make pancakes. She needs three eggs, but there are only two in the fridge. Oh, and we haven’t got any drinks! Can you get some sparkling water and some orange juice? Thanks! Nina</p></div>`,
  parts:[
   {q:'a) Qu’est-ce que Nina a déjà&nbsp;?', opts:['Des tomates, du riz et des œufs','De la salade, du riz, le poulet et deux œufs','De la salade, de l’eau gazeuse et du poulet','Du riz, du jus d’orange et trois œufs'], ans:1, hint:`Cherche les phrases avec ${E('we’ve got')}, ${E('there’s')}, ${E('I’ve got')} et ${E('there are only')}.`, why:`${E('we’ve got some lettuce')}, ${E('there’s some rice')}, ${E('I’ve got the chicken')}, ${E('there are only two')} (œufs). Il manque les tomates et les boissons.`},
   {q:'b) Combien de tomates dois-tu acheter&nbsp;? Écris le nombre.', lab:'Tomates', txt:['16','sixteen'], hint:`${E('There are eight of us')} et ${E('two tomatoes for each person')}.`, why:'8 personnes × 2 tomates = 16 tomates (' + E('sixteen') + ').'},
   {q:'c) Combien d’œufs faut-il acheter au minimum pour les pancakes&nbsp;? Écris le nombre.', lab:'Œufs', txt:['1','one'], hint:`${E('She needs three eggs, but there are only two in the fridge.')}`, why:'Il en faut 3 et il y en a 2 : il en manque 1 (' + E('one') + ').'},
   {q:'d) Écris en anglais à Nina : « Combien de jus d’orange est-ce que tu veux ? »', lab:'Ta question', txt:['How much orange juice do you want?','How much orange juice do you need?','How much juice do you want?','How much juice do you need?','How many bottles of orange juice do you want?','How many bottles of orange juice do you need?','How many bottles of juice do you want?','How many bottles of juice do you need?','How much orange juice would you like?'], hint:`${E('juice')} est indénombrable. Puis la question au présent simple avec ${E('do')}.`, why:`${E('How much orange juice do you want?')} (indénombrable), ou en comptant les bouteilles : ${E('How many bottles of orange juice do you want?')}`},
   {q:'e) Résume la situation en anglais : « Il n’y a pas de boissons, mais il y a du riz. »', lab:'Ta phrase', txt:V(X(['There aren’t any drinks','There are no drinks'],[', but ',' but '],['there is some rice','there is rice'])), show:'There aren’t any drinks, but there’s some rice.', hint:`${E('drinks')} est un pluriel (${E('there are')}), ${E('rice')} un indénombrable (${E('there is')}).`, why:`${E('There aren’t any drinks, but there’s some rice.')} Pluriel → ${E('there are')} + ${E('any')} ; indénombrable → ${E('there is')} + ${E('some')}.`}],
  sol:`<p>Nina a de la salade (${E('lettuce')}), du riz, le poulet et deux œufs. Il faut acheter 8 × 2 = 16 tomates, 1 œuf (3 − 2), de l’eau gazeuse et du jus d’orange.</p><p>Pour demander la quantité : ${E('How much orange juice do you want?')} (ou ${E('How many bottles…?')}). Résumé : ${E('There aren’t any drinks, but there’s some rice.')}</p>`},
]},

/* ================================================================== 8. Free time */
{subj:'en', sem:'a1', id:'en-a1-free-time', o:8, h:'Free time', p:`Parler de ses loisirs et de ses goûts, dire ce qu’on sait faire : ${E('play/go/do')}, ${E('like, love, hate + -ing')}, ${E('can/can’t')} et les pronoms compléments.`, steps:[
 {kind:'Écoute', h:'Le temps libre de Sam et Maya',
  p:`<p>À la fin de cette unité, tu sauras parler de tes loisirs, dire ce que tu aimes ou détestes faire, ce que tu sais faire ou non, et parler des autres avec ${E('him')}, ${E('her')}, ${E('them')}.</p>
<p>Sam et Maya, deux collègues, discutent à la pause. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> qu’est-ce que Sam ne sait pas faire&nbsp;?</p>`,
  audio:[['Maya','So, Sam, what do you do in your free time?'],['Sam','I love cooking, and I play football on Saturdays. What about you?'],['Maya','I don’t really like football. I like going to the cinema, and I go swimming twice a week.'],['Sam','Swimming? I can’t swim!'],['Maya','Really? It’s easy. I can teach you!'],['Sam','OK, why not? And can you play the guitar? I’ve got a guitar at home.'],['Maya','No, I can’t. But I can sing!'],['Sam','Great! So I can play and you can sing.']], cache:true,
  opts:['Jouer de la guitare','Nager','Cuisiner','Jouer au football'], ans:1,
  why:`Sam dit ${E('I can’t swim!')} (je ne sais pas nager), et Maya propose de lui apprendre : ${E('I can teach you!')} C’est Maya qui ne sait pas jouer de la guitare (${E('No, I can’t. But I can sing!')}).`},

 {kind:'Vocabulaire', h:'Les loisirs',
  p:`<p>Les loisirs les plus courants. Remarque les verbes qui vont avec chaque activité (${E('play')}, ${E('go')}, ${E('do')}) : on les apprend avec l’activité, en bloc. Touche une ligne pour l’entendre, puis répète.</p>`,
  mots:[['free time','le temps libre','What do you do in your free time?'],['to play football','jouer au football','I play football on Saturdays.'],['to play tennis','jouer au tennis','Can you play tennis?'],['to play the guitar','jouer de la guitare','My sister plays the guitar.'],['to play video games','jouer aux jeux vidéo','He plays video games every evening.'],['to go swimming','aller nager','I go swimming twice a week.'],['to go running','aller courir','We go running in the park.'],['to go cycling','faire du vélo (en balade)','They go cycling on Sundays.'],['to go shopping','faire du shopping','I hate going shopping.'],['to go for a walk','aller se promener','We go for a walk after lunch.'],['to do yoga','faire du yoga','My mum does yoga every morning.'],['to read','lire','I read in bed.'],['to watch TV','regarder la télé','I don’t watch TV very often.'],['to listen to music','écouter de la musique','I listen to music on the bus.'],['to go to the cinema','aller au cinéma','Do you often go to the cinema?'],['to cook','cuisiner','I love cooking.'],['to dance','danser','Can you dance?'],['to draw','dessiner','My son draws all the time.'],['to take photos','prendre des photos','She takes photos of birds.'],['to meet friends','retrouver des amis','I meet friends on Friday evenings.'],['twice a week','deux fois par semaine','I go running twice a week.']],
  note:`${E('once a week')} = une fois par semaine, ${E('twice a week')} = deux fois, puis ${E('three times a week')}, ${E('four times a month')}… Ces expressions se placent en fin de phrase.`},

 {kind:'Grammaire', h:'Play, go ou do ?',
  p:`<p>En français, on « fait » du sport, du vélo, du yoga, du ski. L’anglais ne dit presque jamais ${E('make')} pour un loisir : il choisit entre trois verbes, selon le type d’activité.</p>
<div class="def"><p><b>play</b> + sport de balle ou de compétition, jeu : ${E('play football, play tennis, play chess, play cards, play video games')}. Avec un <b>instrument</b>, on ajoute ${E('the')} : ${E('play the piano, play the guitar')}.</p><p><b>go</b> + activité en <b>-ing</b> (on se déplace, on « va faire ») : ${E('go swimming, go running, go cycling, go skiing, go shopping')}.</p><p><b>do</b> + les autres activités, souvent sans balle ni adversaire : ${E('do yoga, do judo, do karate, do gymnastics, do exercise')}.</p></div>
<div class="idea"><p>Une astuce : si l’activité finit déjà en ${E('-ing')}, c’est presque toujours ${E('go')}. Si elle se joue avec une balle ou contre quelqu’un, c’est ${E('play')}. Le reste, c’est ${E('do')}.</p></div>
<div class="ex"><p>${E('I play basketball and I go swimming on Fridays.')} · ${E('My dad does yoga.')} · ${E('Do you play the piano?')}</p></div>
<div class="warn"><p>Pièges des francophones : « je fais du sport » se dit ${E('I do sport')} (britannique) ou ${E('I play sports')} (américain), jamais « I make sport ». « Faire du vélo » = ${E('go cycling')} ou ${E('ride a bike')}. Et pas de ${E('the')} devant un sport : ${E('play football')}, alors qu’on dit ${E('play the guitar')}.</p></div>`,
  audio:'I play basketball and I go swimming on Fridays. My dad does yoga. Do you play the piano?'},

 {kind:'Pratique', h:'À toi : play, go ou do',
  p:`<p>Tu parles de ta sœur à un ami anglais.</p><p><b>Question :</b> écris en anglais « Ma sœur joue du piano et elle fait du ski. »</p>`, lab:'Ta phrase',
  txt:X('My sister plays ',['the piano','piano'],[' and ',', and '],['she goes skiing','goes skiing','she skis','skis']), show:'My sister plays the piano and she goes skiing.',
  why:`${E('plays the piano')} (instrument : ${E('play the')}) et ${E('goes skiing')} (activité en ${E('-ing')} : ${E('go')}). N’oublie pas le ${E('-s')} de la 3e personne : ${E('plays')}, ${E('goes')}.`},

 {kind:'Grammaire', h:'Like, love, hate + -ing',
  p:`<p>Sam dit ${E('I love cooking')}, Maya ${E('I like going to the cinema')}. Pour parler de ce qu’on aime <b>faire</b>, l’anglais met le deuxième verbe en <b>-ing</b>.</p>
<div class="def"><p><b>love / like / enjoy / don’t mind / don’t like / hate + verbe-ing</b></p><p>${E('I love dancing.')} (j’adore) · ${E('I like reading.')} (j’aime) · ${E('I enjoy cooking.')} (j’aime bien, ça me plaît) · ${E('I don’t mind ironing.')} (repasser : ça ne me dérange pas) · ${E('I don’t like running.')} (je n’aime pas) · ${E('I hate getting up early.')} (je déteste)</p></div>
<div class="idea"><p>La forme en ${E('-ing')} fait du verbe une sorte de nom : ${E('cooking')} = « la cuisine, le fait de cuisiner ». C’est pour ça qu’on peut aussi dire ${E('I love pizza')} avec un vrai nom. Après ${E('like')}, ${E('love')} et ${E('hate')}, on entend aussi ${E('to')} + verbe (${E('I like to swim')}), surtout en anglais américain ; après ${E('enjoy')} et ${E('don’t mind')}, <b>seulement</b> ${E('-ing')}.</p></div>
<div class="ex"><p>${E('Do you like dancing? – Yes, I do. / No, I don’t.')}<br>${E('She likes reading, but she hates watching TV.')} (le ${E('-s')} va sur ${E('likes')}, pas sur ${E('reading')})</p></div>
<div class="warn"><p>Ne confonds pas ${E('I like')} (j’aime, en général) et ${E('I’d like')} (je voudrais, maintenant) : ${E('I like coffee')} ≠ ${E('I’d like a coffee')}. Et pas de verbe nu : « I like swim » est faux. Enfin, pour une activité en général, pas de ${E('the')} : ${E('I love football')}, pas « I love the football ».</p></div>`,
  audio:'I love dancing. I like reading. I don’t mind ironing. I hate getting up early. She likes reading, but she hates watching TV.'},

 {kind:'Méthode', h:'Former le -ing et parler de ses goûts',
  p:`<p><b>Quand :</b> après ${E('love, like, enjoy, don’t mind, hate')}, et après ${E('go')} (${E('go swimming')}). <b>Pourquoi des règles :</b> l’orthographe garde la prononciation du verbe. <b>Comment :</b></p>
<ol><li>En général, on ajoute <b>-ing</b> : ${E('read → reading, play → playing, cook → cooking')}.</li><li>Le verbe finit par un <b>-e muet</b> : on l’enlève. ${E('dance → dancing, ride → riding, take → taking')}.</li><li>Verbe court en <b>consonne + voyelle + consonne</b> : on <b>double</b> la dernière consonne. ${E('swim → swimming, run → running, get → getting, shop → shopping')}. (Pas pour ${E('w')}, ${E('x')}, ${E('y')} : ${E('play → playing')}.)</li><li>On construit la phrase : sujet + verbe de goût (avec ${E('-s')} à la 3e personne, ou ${E('doesn’t')}) + verbe en ${E('-ing')}.</li></ol>`,
  demo:{enonce:`Traduis : « Ma copine adore danser, mais elle déteste courir. »`,
   etapes:[{f:`« adorer » = ${E('love')} ; sujet ${E('my girlfriend')} (3e personne) → ${E('loves')}`,w:`Le ${E('-s')} de la 3e personne va sur le verbe de goût.`},
    {f:`${E('dance')} finit par un ${E('e')} muet → ${E('dancing')}`,w:'Règle 2 : on enlève le e avant -ing.'},
    {f:`« détester » = ${E('hate')} → ${E('hates')} ; ${E('run')} = r-u-n, consonne + voyelle + consonne → ${E('running')}`,w:'Règle 3 : on double le n.'}],
   conclusion:E('My girlfriend loves dancing, but she hates running.')}},

 {kind:'Pratique', h:'À toi : le -ing',
  p:`<p>Complète avec le verbe entre parenthèses à la bonne forme : ${E('I hate ___ up early at the weekend.')} (${E('get')})</p><p><b>Question :</b> écris le mot manquant.</p>`, lab:'Le mot',
  txt:['getting'],
  why:`${E('hate')} + ${E('-ing')} ; ${E('get')} = consonne + voyelle + consonne, donc on double le t : ${E('getting')}.`},

 {kind:'Pratique', h:'À toi : ce qu’il n’aime pas',
  p:`<p>Ton ami Paul déteste les magasins.</p><p><b>Question :</b> écris en anglais « Il n’aime pas faire du shopping. »</p>`, lab:'Ta phrase',
  txt:X('He doesn’t like ',['shopping','going shopping','to go shopping'],'.'),
  why:`${E('He doesn’t like going shopping.')} (ou ${E('He doesn’t like shopping.')}) Avec ${E('doesn’t')}, le verbe ${E('like')} reste sans ${E('-s')}.`},

 {kind:'Pratique', h:'Remets la question dans l’ordre',
  p:`<p>Tu veux savoir si ton collègue aime regarder le foot à la télé.</p><p><b>Question :</b> touche les mots dans le bon ordre.</p>`,
  ordre:['Do','you','like','watching','football','on','TV?'],
  why:`${E('Do you like watching football on TV?')} Question au présent simple avec ${E('do')}, puis ${E('like')} + ${E('-ing')}. « À la télé » = ${E('on TV')}.`},

 {kind:'Grammaire', h:'Can et can’t : ce qu’on sait faire',
  p:`<p>Sam avoue ${E('I can’t swim!')} et Maya répond ${E('I can teach you!')} Le petit mot ${E('can')} sert à dire ce qu’on <b>sait</b> faire ou ce qu’on <b>peut</b> faire.</p>
<div class="def"><p><b>can + verbe de base</b>, sans ${E('to')}, identique à toutes les personnes : ${E('I can swim, she can swim, they can swim')}.</p><p>Négation : <b>cannot</b> (en un seul mot), presque toujours contracté en <b>can’t</b> : ${E('He can’t drive.')}</p><p>Question : on inverse. ${E('Can you swim?')} Réponses courtes : ${E('Yes, I can.')} / ${E('No, I can’t.')}</p></div>
<div class="idea"><p>« Je sais nager », « elle sait conduire », « je peux venir samedi » : en anglais, tout cela passe par ${E('can')}. Pour nuancer, on ajoute ${E('well')} à la fin : ${E('I can sing very well. I can’t cook very well.')}</p></div>
<div class="ex"><p>${E('Can your brother play the guitar? – Yes, he can. He can play the piano too.')}<br>${E('I can’t come on Monday.')} (je ne peux pas venir lundi)</p></div>
<div class="warn"><p>Les pièges : pas de ${E('to')} (« I can to swim »), pas de ${E('-s')} (« she cans », « she can swims »), pas de ${E('do')} (« Do you can…? »). Et « savoir nager » ne se dit <b>pas</b> avec ${E('know')} : « I know swim » est faux. ${E('know')} sert pour connaître une information : ${E('I know his name.')}</p></div>`,
  audio:'Can your brother play the guitar? Yes, he can. He can play the piano too. I can’t come on Monday.'},

 {kind:'Pratique', h:'À toi : poser la question',
  p:`<p>Transforme la phrase en question : ${E('She can speak Italian.')}</p><p><b>Question :</b> écris la question.</p>`, lab:'Ta question',
  txt:['Can she speak Italian?'],
  why:`On inverse ${E('can')} et le sujet : ${E('Can she speak Italian?')} Pas de ${E('does')} avec ${E('can')}.`},

 {kind:'Pratique', h:'À toi : une réponse courte',
  p:`<p>Un ami te demande : ${E('Can your brother drive?')} Ton frère ne sait pas conduire.</p><p><b>Question :</b> écris la réponse courte.</p>`, lab:'Ta réponse',
  txt:['No, he can’t.','No, he can’t drive.'],
  why:`${E('No, he can’t.')} On reprend ${E('can')} sans le verbe, et ${E('your brother')} devient ${E('he')}.`},

 {kind:'Pratique', h:'À toi : savoir faire',
  p:`<p>Tu te présentes dans un club de sport.</p><p><b>Question :</b> écris en anglais « Je sais nager, mais je ne sais pas faire de vélo. »</p>`, lab:'Ta phrase',
  txt:X('I can swim',[', but ',' but '],['I can’t ride a bike','I can’t cycle','I can’t ride a bicycle'],'.'), show:'I can swim, but I can’t ride a bike.',
  why:`« savoir faire » = ${E('can')} : ${E('I can swim, but I can’t ride a bike.')} « Faire du vélo » (savoir en faire) = ${E('ride a bike')}.`},

 {kind:'Grammaire', h:'Les pronoms compléments : me, him, her…',
  p:`<p>Maya dit ${E('I can teach <b>you</b>')}. Dans « je t’apprends », « je l’aime », « avec nous », le pronom n’est pas sujet : il <b>reçoit</b> l’action. L’anglais a alors une forme spéciale.</p>
<div class="def"><p>${E('I → <b>me</b>')} · ${E('you → <b>you</b>')} · ${E('he → <b>him</b>')} · ${E('she → <b>her</b>')} · ${E('it → <b>it</b>')} · ${E('we → <b>us</b>')} · ${E('they → <b>them</b>')}</p><p>On les met <b>après le verbe</b> (${E('I love her')}) ou <b>après une préposition</b> (${E('with us, for me, to them')}).</p></div>
<div class="idea"><p>Le sujet fait l’action, le complément la reçoit : ${E('<b>She</b> loves <b>him</b>, but <b>he</b> doesn’t love <b>her</b>.')} ${E('them')} sert pour les personnes <b>et</b> les choses au pluriel ; ${E('it')} pour une chose ou un animal.</p></div>
<div class="ex"><p>${E('Do you like jazz? – Yes, I love it.')}<br>${E('My friends? I play tennis with them on Sundays.')}<br>${E('Can you help me?')}</p></div>
<div class="warn"><p>En français, le pronom se place <b>avant</b> le verbe (« je <u>l’</u>adore ») ; en anglais, <b>après</b> : ${E('I love it')}, jamais « I it love ». Et on ne peut pas l’oublier : à ${E('Do you like pizza?')}, on répond ${E('Yes, I like it')} ou ${E('Yes, I do')}, pas « Yes, I like ». Après ${E('with')}, ${E('for')}, ${E('to')}, jamais de pronom sujet : ${E('with me')}, pas « with I ».</p></div>`,
  audio:'She loves him, but he doesn’t love her. Do you like jazz? Yes, I love it. My friends? I play tennis with them on Sundays.'},

 {kind:'Pratique', h:'À toi : remplace par un pronom',
  p:`<p>Réécris la phrase en remplaçant ${E('my sisters')} par un pronom : ${E('I often play tennis with my sisters.')}</p><p><b>Question :</b> écris la nouvelle phrase.</p>`, lab:'Ta phrase',
  txt:['I often play tennis with them.'],
  why:`${E('my sisters')} = elles (pluriel), et après la préposition ${E('with')} on met le pronom complément : ${E('with them')}.`},

 {kind:'Pratique', h:'À toi : je l’adore',
  p:`<p>Un ami te demande : ${E('Do you like this song?')}</p><p><b>Question :</b> réponds en anglais « Oui, je l’adore ! »</p>`, lab:'Ta réponse',
  txt:['Yes, I love it!','Yes, I do. I love it!','Yes, I do, I love it!','Yes! I love it!'],
  why:`${E('Yes, I love it!')} ${E('the song')} est une chose : ${E('it')}, placé <b>après</b> le verbe.`},

 {kind:'Prononciation', h:'Can ou can’t ?',
  p:`<p>${E('can')} et ${E('can’t')} se ressemblent beaucoup, et le ${E('t')} final s’entend à peine. Ce qui fait la différence, c’est la <b>voyelle</b> et l’<b>accent</b>.</p>
<div class="def"><p>Dans une phrase affirmative, ${E('can')} est <b>faible</b> et non accentué, presque « ken » ; c’est le verbe qui est fort : ${E('I can <b>swim</b>')}.</p><p>${E('can’t')} est <b>fort</b> et accentué, avec une voyelle longue comme dans ${E('car')} : ${E('I <b>can’t</b> swim')} (« caant »).</p></div>
<div class="idea"><p>Écoute donc la mélodie : si le petit mot passe vite et que le verbe ressort, c’est ${E('can')}. S’il est appuyé et long, c’est ${E('can’t')}. En réponse courte, ${E('can')} redevient fort : ${E('Yes, I <b>can</b>.')} En anglais américain, ${E('can’t')} se dit « kènt », mais il reste accentué.</p></div>
<div class="warn"><p>Le piège des francophones : prononcer ${E('can')} et ${E('can’t')} avec la même voyelle et la même force. Ton interlocuteur ne saura pas si tu sais nager ou non&nbsp;!</p></div>
<p>Écoute, puis redis la phrase en marquant bien la différence.</p>`,
  audio:'I can swim. I can’t swim. She can dance. She can’t dance. Can you drive? Yes, I can.',
  dire:'I can swim, but I can’t dance.'},

 {kind:'Lecture', h:'Une petite annonce',
  p:`<p>Lis ce message posté sur le site d’un quartier de Brighton, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="Brighton neighbours: hobbies"><p lang="en">Hi! My name is Daniel. I’m 34 and I’m new in Brighton, so I want to meet people with the same hobbies. I love running: I go running by the sea every morning before work. I can’t swim very well, but I want to learn. I also like cooking for my friends. At the weekend, I play tennis, but my tennis partner lives in London now, so I need a new one. Can you play? Are you free on Saturday mornings? I don’t like watching football on TV, sorry! But I don’t mind going to a match with friends. Write to me!</p></div>
<p><b>Question :</b> laquelle de ces affirmations est vraie&nbsp;?</p>`,
  audio:'Hi! My name is Daniel. I’m 34 and I’m new in Brighton, so I want to meet people with the same hobbies. I love running: I go running by the sea every morning before work. I can’t swim very well, but I want to learn. I also like cooking for my friends. At the weekend, I play tennis, but my tennis partner lives in London now, so I need a new one. Can you play? Are you free on Saturday mornings? I don’t like watching football on TV, sorry! But I don’t mind going to a match with friends. Write to me!',
  opts:['Daniel nage très bien.','Daniel adore regarder le football à la télévision.','Daniel va courir le soir, après le travail.','Daniel cherche un nouveau partenaire de tennis pour le samedi matin.'], ans:3,
  why:`${E('My tennis partner lives in London now, so I need a new one. … Are you free on Saturday mornings?')} Il ne sait pas bien nager (${E('I can’t swim very well')}), il court le matin (${E('every morning before work')}) et n’aime pas le foot à la télé.`},

 {kind:'Dictée', h:'Dictée : un frère sportif',
  p:'Écoute et écris exactement la phrase. Réécoute autant que tu veux.',
  dictee:'My brother can’t swim, but he loves playing tennis with us.',
  why:`${E('can’t')} + verbe de base ; ${E('loves playing')} (${E('-s')} sur ${E('loves')}, ${E('-ing')} sur ${E('play')}) ; ${E('with us')}, pronom complément.`},

 {kind:'Oral', h:'Parle de tes loisirs',
  p:`<p>À toi de parler, 30 à 45 secondes. Dis ce que tu fais pendant ton temps libre et combien de fois, ce que tu adores et ce que tu détestes faire, une chose que tu sais faire et une que tu ne sais pas faire, et avec qui tu fais une activité.</p>`,
  oral:{modele:'In my free time, I go running twice a week and I play the guitar. I love cooking, but I hate going shopping. I can swim very well, but I can’t dance! My best friend, Lisa, plays tennis, and I often play with her on Sundays.',
   criteres:['J’ai utilisé play, go ou do avec une activité','J’ai dit ce que j’aime avec love / like + -ing','J’ai dit ce que je déteste avec hate ou don’t like + -ing','J’ai utilisé can et can’t, en marquant la différence','J’ai utilisé un pronom complément (him, her, them, us…)']}},

 {kind:'Écriture', h:'Réponds à Daniel',
  p:`<p>Réponds au message de Daniel (étape « Une petite annonce ») en au moins 40 mots : présente-toi, parle de tes loisirs (ce que tu aimes ou n’aimes pas faire), dis si tu sais jouer au tennis, propose-lui une activité et termine par une question.</p>`,
  ecrire:{min:40, modele:'Hi Daniel! I’m Clara, I’m 29 and I live in Brighton too. I love running, and I go swimming twice a week. I can play tennis, but not very well! I’m free on Saturday mornings. My brother plays tennis too: I can come with him. Do you like playing doubles?',
   criteres:[{t:'J’ai utilisé like, love, enjoy ou hate + -ing', re:'\\b(like|likes|love|loves|enjoy|enjoys|hate|hates|mind)\\s+\\w+ing\\b'},{t:'J’ai utilisé can ou can’t', re:'\\bcan'},{t:'J’ai utilisé play, go ou do avec une activité', re:'\\b(play|plays|go|goes|do|does)\\s+(\\w+ing|tennis|football|yoga|the)\\b'},{t:'J’ai utilisé un pronom complément', re:'\\b(me|him|her|us|them)\\b'},{t:'J’ai posé une question', re:'\\?'}]}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li><b>play</b> + sport de balle, jeu (${E('play football, play chess')}) ; ${E('play the')} + instrument ; <b>go</b> + ${E('-ing')} (${E('go swimming')}) ; <b>do</b> + le reste (${E('do yoga')}). « Faire du sport » = ${E('do sport')}, jamais ${E('make')}.</li><li><b>love / like / enjoy / don’t mind / don’t like / hate + -ing</b> : ${E('I love dancing.')} Ne confonds pas ${E('I like')} et ${E('I’d like')}.</li><li>Le -ing : ${E('read → reading')}, ${E('dance → dancing')} (e muet enlevé), ${E('swim → swimming')} (consonne doublée).</li><li><b>can / can’t</b> + verbe de base, même forme à toutes les personnes : ${E('She can swim. Can you drive? – Yes, I can. / No, I can’t.')} « Savoir faire » = ${E('can')}, pas ${E('know')}.</li><li>Pronoms compléments : ${E('me, you, him, her, it, us, them')}, après le verbe ou la préposition : ${E('I love it. Come with us.')}</li><li>Prononciation : ${E('can')} faible (« ken »), ${E('can’t')} fort et long (« caant »).</li></ul></div>`},

 {kind:'Mission', h:'Au centre sportif',
  p:'Une mère appelle le centre sportif de son quartier pour inscrire sa fille. Écoute l’appel, puis réponds aux questions. Tu peux réécouter.',
  audio:[['Receptionist','Hello, Riverside Sports Centre. How can I help you?'],['Mother','Hi. My daughter is nine. She loves swimming, but she can’t swim very well. Have you got any lessons for children?'],['Receptionist','Yes, we’ve got lessons on Tuesdays and Thursdays at five o’clock.'],['Mother','Oh, she can’t come on Tuesdays. She does judo on Tuesdays.'],['Receptionist','No problem. Thursdays at five, then. It’s six pounds a lesson.'],['Mother','Great. And have you got any yoga classes for adults on Thursdays?'],['Receptionist','Yes, there’s one at five o’clock too.'],['Mother','Perfect! We can both come on Thursdays, then.']], cache:true,
  parts:[
   {q:'a) Pourquoi la fille ne peut-elle pas venir le mardi&nbsp;?', opts:['Elle a cours de piano.','Elle fait du judo le mardi.','La piscine est fermée.','Sa mère travaille tard.'], ans:1, hint:`Écoute la phrase qui suit ${E('she can’t come on Tuesdays')}.`, why:`${E('She does judo on Tuesdays.')} (${E('do judo')} : un sport sans balle, avec ${E('do')}.)`},
   {q:'b) Quel jour la fille va-t-elle nager&nbsp;? Écris le jour en anglais.', lab:'Le jour', txt:['Thursday','Thursdays','On Thursday','On Thursdays','On Thursdays at five'], hint:'Les cours sont le mardi et le jeudi.', why:`${E('Thursdays at five, then.')} Le jeudi (${E('Thursday')}) à 17 heures.`},
   {q:'c) Combien coûtent quatre leçons de natation&nbsp;? Écris le prix en chiffres.', lab:'Prix en livres', txt:['24','£24','24 pounds','twenty-four pounds','twenty-four'], hint:`${E('It’s six pounds a lesson.')}`, why:'4 × £6 = £24, ' + E('twenty-four pounds') + '.'},
   {q:'d) Résume en anglais : « Ma fille adore nager, mais elle ne sait pas très bien nager. »', lab:'Ta phrase', txt:X('My daughter ',['loves swimming','loves to swim'],[', but ',' but '],['she can’t swim very well','she can’t swim well'],'.'), show:'My daughter loves swimming, but she can’t swim very well.', hint:`${E('love')} + ${E('-ing')} (avec ${E('-s')}), puis ${E('can’t')} + verbe de base.`, why:`${E('My daughter loves swimming, but she can’t swim very well.')}`}],
  sol:`<p lang="en">Receptionist: Hello, Riverside Sports Centre. How can I help you? – Mother: Hi. My daughter is nine. She loves swimming, but she can’t swim very well. Have you got any lessons for children? – Yes, we’ve got lessons on Tuesdays and Thursdays at five o’clock. – Oh, she can’t come on Tuesdays. She does judo on Tuesdays. – No problem. Thursdays at five, then. It’s six pounds a lesson. – Great. And have you got any yoga classes for adults on Thursdays? – Yes, there’s one at five o’clock too. – Perfect! We can both come on Thursdays, then.</p><p>La fille nagera le jeudi à 17 heures (le mardi, elle fait du judo). Quatre leçons : 4 × £6 = £24. Résumé : ${E('My daughter loves swimming, but she can’t swim very well.')}</p>`},

 {kind:'Mission', h:'Une activité pour deux',
  p:`<p>Ton amie Emma veut commencer un loisir avec toi. Lis son message et les trois annonces du centre culturel, puis réponds.</p>
<div class="blk" data-t="Message d’Emma"><p lang="en">Hi! I want to try a new hobby with you! I sit at a desk all day at work and I hate it, so I want to do something active. But I can’t come on Mondays: I have Spanish lessons. And I don’t like getting up early at the weekend! What about you? Emma</p></div>
<div class="blk" data-t="Annonces"><p lang="en"><b>Salsa for beginners</b>: Mondays, 7–8.30 pm. You can’t dance? No problem! £8 a class.<br><b>Climbing</b>: Wednesdays, 6.30–8 pm, and Sundays, 8–10 am. Beginners welcome. £12 a session, shoes included.<br><b>Chess club</b>: Fridays, 6–8 pm. Beginners welcome. Free.</p></div>`,
  parts:[
   {q:'a) Quelle activité, et quel jour, conviennent à Emma&nbsp;?', opts:['La salsa le lundi','L’escalade le dimanche matin','L’escalade le mercredi soir','Les échecs le vendredi'], ans:2, hint:'Élimine : le lundi, le week-end tôt le matin, et une activité qui n’est pas physique.', why:`La salsa est le lundi (${E('I can’t come on Mondays')}), l’escalade du dimanche commence à 8 heures (${E('I don’t like getting up early at the weekend')}), et les échecs ne sont pas une activité physique (${E('something active')}). Reste l’escalade le mercredi soir.`},
   {q:'b) Combien paierez-vous à vous deux pour quatre séances chacun&nbsp;? Écris le prix en chiffres.', lab:'Prix en livres', txt:['96','£96','96 pounds','ninety-six pounds','ninety-six'], hint:`${E('£12 a session')} : il y a 2 personnes et 4 séances par personne.`, why:'2 personnes × 4 séances × £12 = £96 (les chaussures sont comprises : ' + E('shoes included') + ').'},
   {q:'c) Tu ne sais pas grimper. Écris à Emma : « Je ne sais pas grimper, mais tu peux m’apprendre ! »', lab:'Ta phrase', txt:X('I can’t climb',[', but ',' but '],['you can teach me','you can show me'],['!','.']), show:'I can’t climb, but you can teach me!', hint:`« savoir » = ${E('can')} ; « apprendre à quelqu’un » = ${E('teach')} ; « me », complément, se met après le verbe.`, why:`${E('I can’t climb, but you can teach me!')} ${E('me')} se place après ${E('teach')}.`},
   {q:'d) Tu penses aussi à la salsa pour un autre jour. Demande à Emma si elle aime danser.', lab:'Ta question', txt:['Do you like dancing?','Do you like to dance?','Do you love dancing?','Do you enjoy dancing?'], hint:`Présent simple : ${E('Do you like…?')}, puis le verbe en ${E('-ing')} (attention au ${E('e')} muet).`, why:`${E('Do you like dancing?')} : ${E('dance')} perd son ${E('e')} devant ${E('-ing')}.`}],
  sol:`<p>Emma veut une activité physique (${E('something active')}), pas le lundi, et pas tôt le week-end : seule l’escalade du mercredi soir convient. Quatre séances chacun : 2 × 4 × £12 = £96, chaussures comprises.</p><p>Réponse possible : ${E('Good idea! I can’t climb, but you can teach me! And do you like dancing?')}</p>`},
]},

/* ================================================================== 9. Around town */
{subj:'en', sem:'a1', id:'en-a1-town', o:9, h:'Around town', p:`Se repérer en ville, demander et indiquer le chemin, proposer une sortie : les lieux, l’impératif, ${E('opposite, between, on the left')} et ${E('Let’s…')}.`, steps:[
 {kind:'Écoute', h:'Où est la pharmacie ?',
  p:`<p>À la fin de cette unité, tu sauras demander ton chemin, comprendre et donner des indications, situer un lieu (en face, entre, au coin) et proposer une sortie avec ${E('Let’s…')}.</p>
<p>Un touriste demande son chemin à une passante, à York. <b>Écoute sans lire</b>, puis réponds.</p>
<p><b>Question :</b> où se trouve la pharmacie&nbsp;?</p>`,
  audio:[['Tourist','Excuse me. Is there a chemist’s near here?'],['Woman','Yes, there’s one on King Street. Go straight on, then take the second street on the left. That’s King Street.'],['Tourist','The second on the left. OK.'],['Woman','The chemist’s is on the right, opposite the bank, between a café and a bookshop.'],['Tourist','Is it far?'],['Woman','No, it’s about five minutes’ walk.'],['Tourist','Thank you very much.'],['Woman','You’re welcome.']], cache:true,
  opts:['Sur King Street, à côté de la banque','Sur King Street, en face de la banque','Dans la première rue à gauche, en face d’un café','Sur King Street, à gauche, entre la banque et une librairie'], ans:1,
  why:`${E('The chemist’s is on the right, opposite the bank, between a café and a bookshop.')} ${E('opposite')} = en face de. Pour y aller : tout droit, puis la deuxième rue à gauche (${E('the second street on the left')}).`},

 {kind:'Vocabulaire', h:'Les lieux de la ville',
  p:`<p>Les lieux qu’on cherche le plus souvent. Touche une ligne pour l’entendre, puis répète. Attention à deux faux amis : ${E('library')} = bibliothèque (une librairie se dit ${E('bookshop')}), et ${E('chemist’s')} = pharmacie.</p>`,
  mots:[['a bank','une banque','Is there a bank near here?'],['a post office','une poste','The post office is on King Street.'],['a chemist’s / a pharmacy','une pharmacie','The chemist’s is opposite the bank.'],['a supermarket','un supermarché','The supermarket is open on Sundays.'],['a bakery','une boulangerie','There’s a bakery on the corner.'],['a train station / a station','une gare','The train station is near the river.'],['a bus stop','un arrêt de bus','The bus stop is in front of the school.'],['a library','une bibliothèque','The library is closed on Mondays.'],['a bookshop','une librairie','I love this bookshop.'],['a museum','un musée','The museum is free.'],['a park','un parc','We go for a walk in the park.'],['a hospital','un hôpital','The hospital is behind the station.'],['a car park','un parking','The car park is behind the supermarket.'],['a cinema','un cinéma','The cinema is next to the hotel.'],['a shopping centre','un centre commercial','The shopping centre is big.'],['a square','une place','There’s a market in the square.'],['the town centre','le centre-ville','The museum is in the town centre.'],['a street','une rue','My street is very quiet.'],['the traffic lights','les feux (de circulation)','Turn left at the traffic lights.'],['a bridge','un pont','Cross the bridge.'],['a corner','un coin (de rue)','The bank is on the corner.']],
  note:`<b>Américain :</b> ${E('pharmacy')} ou ${E('drugstore')} (pharmacie), ${E('parking lot')} (parking), ${E('movie theater')} (cinéma), ${E('mall')} (centre commercial), ${E('downtown')} (centre-ville). En anglais, « un parking » n’est pas ${E('a parking')} : ${E('parking')} seul veut dire « le stationnement ».`},

 {kind:'Pratique', h:'À toi : demander un lieu',
  p:`<p>Tu as mal à la tête et tu cherches une pharmacie dans une ville anglaise.</p><p><b>Question :</b> demande poliment à un passant « Excusez-moi, est-ce qu’il y a une pharmacie près d’ici ? »</p>`, lab:'Ta question',
  txt:X(['Excuse me, ','Excuse me. ','Excuse me '],'is there a ',['chemist’s','pharmacy','chemist'],[' near here',' nearby',' around here'],'?'), show:'Excuse me, is there a chemist’s near here?',
  why:`${E('Excuse me, is there a chemist’s near here?')} (${E('pharmacy')} est aussi correct). ${E('Is there…?')} sert à demander si un lieu existe ; ${E('Where’s…?')}, si on sait qu’il existe.`},

 {kind:'Vocabulaire', h:'Demander et indiquer le chemin',
  p:`<p>Les expressions pour demander son chemin et le comprendre. Ce sont des blocs fixes : apprends-les tels quels. Touche une ligne pour l’entendre.</p>`,
  mots:[['Excuse me, where’s…?','Excusez-moi, où est… ?','Excuse me, where’s the station?'],['Is there a … near here?','Est-ce qu’il y a un(e) … près d’ici ?','Is there a bank near here?'],['How do I get to…?','Comment je vais à… ?','How do I get to the museum?'],['Is it far?','C’est loin ?'],['It’s five minutes’ walk.','C’est à cinq minutes à pied.'],['Go straight on.','Allez tout droit.','Go straight on to the end of the street.'],['Turn left. / Turn right.','Tournez à gauche. / Tournez à droite.','Turn right at the bank.'],['Take the first street on the left.','Prenez la première rue à gauche.'],['Go past…','Passez devant…','Go past the church.'],['Cross the road.','Traversez la rue.'],['at the end of the street','au bout de la rue','The park is at the end of the street.'],['on the left / on the right','à gauche / à droite (sur le côté)','The bank is on the left.'],['opposite','en face de','The bank is opposite the station.'],['between','entre','The café is between the bank and the park.'],['on the corner of','à l’angle de','The bakery is on the corner of King Street and Mill Road.'],['You can’t miss it!','Vous ne pouvez pas le manquer !']],
  note:`${E('straight')} (tout droit) se prononce comme ${E('street')} sans le « i » : « strèït ». On dit ${E('Go straight on')} en Grande-Bretagne, ${E('Go straight ahead')} partout.`},

 {kind:'Grammaire', h:'Situer un lieu : opposite, between…',
  p:`<p>La passante dit que la pharmacie est ${E('opposite the bank, between a café and a bookshop')}. Tu connais déjà ${E('in, on, under, next to')} ; voici les prépositions qui servent à situer un lieu dans une rue. Repère-les sur le plan.</p>
<div class="def"><p>${E('opposite')} = en face de · ${E('between … and …')} = entre … et … · ${E('next to')} = à côté de · ${E('near')} = près de · ${E('behind')} = derrière · ${E('in front of')} = devant · ${E('on the corner of')} = à l’angle de · ${E('at the end of')} = au bout de · ${E('on the left / on the right')} = à gauche / à droite</p></div>
<div class="ex"><p>Sur le plan : ${E('The bank is opposite the post office.')} ${E('The library is between the museum and High Street.')} ${E('The park is at the end of High Street.')} ${E('The cinema is on the corner of High Street and Church Street.')}</p></div>
<div class="idea"><p>Pour une rue, on dit ${E('on King Street')} (aussi ${E('in King Street')} en britannique) ; pour une adresse précise, ${E('at 27 Mill Road')}. Dans une phrase, c’est le plus souvent ${E('It’s')} + préposition : ${E('Where’s the café? – It’s opposite the chemist’s.')}</p></div>
<div class="warn"><p>Le piège n° 1 : « en face de » se dit ${E('opposite')}, <b>pas</b> ${E('in front of')}. ${E('in front of')} = devant, tout près : ${E('The bus stop is in front of the school')} (juste devant l’école, du même côté). Autres calques à éviter : « near of » (dis ${E('near the station')}), « next of » (dis ${E('next to')}), et « between the bank and between the park » (un seul ${E('between')}, puis ${E('and')}).</p></div>`,
  fig:plan(), audio:'The bank is opposite the post office. The library is between the museum and High Street. The park is at the end of High Street. The cinema is on the corner of High Street and Church Street.'},

 {kind:'Pratique', h:'À toi : en face de',
  p:`<p>Tu expliques à un ami où se trouve la banque.</p><p><b>Question :</b> écris en anglais « La banque est en face de la poste. »</p>`, lab:'Ta phrase',
  txt:V('The bank is opposite the post office.','The bank is across from the post office.'),
  why:`${E('The bank is opposite the post office.')} (en américain : ${E('across from')}). ${E('in front of')} voudrait dire « juste devant ».`},

 {kind:'Pratique', h:'À toi : entre',
  p:`<p>Regarde le plan.</p><p><b>Question :</b> complète la phrase : ${E('The café is between the supermarket ___ High Street.')} Écris le mot manquant.</p>`, fig:plan(), lab:'Le mot',
  txt:['and'],
  why:`${E('between A and B')} : un seul ${E('between')}, puis ${E('and')}. ${E('The café is between the supermarket and High Street.')}`},

 {kind:'Grammaire', h:'L’impératif : donner une indication',
  p:`<p>${E('Go straight on, then take the second street on the left.')} Pour donner une indication, un conseil ou un ordre, l’anglais utilise l’<b>impératif</b>. C’est la forme la plus simple de toute la langue.</p>
<div class="def"><p>Impératif = <b>verbe de base, sans sujet</b> : ${E('Turn left. Go straight on. Cross the road.')}</p><p>Négatif : <b>Don’t</b> + verbe de base : ${E('Don’t cross here. Don’t turn right.')}</p></div>
<div class="idea"><p>La même forme sert pour « tu » et « vous » : ${E('Turn left')} = tourne / tournez à gauche. Pour enchaîner les étapes, on utilise ${E('first')}, ${E('then')}, ${E('after that')} : ${E('First, go past the bank. Then turn left. After that, it’s on your right.')} Pour être plus poli, on ajoute ${E('please')} ou on commence par ${E('Just…')} : ${E('Just go straight on.')}</p></div>
<div class="ex"><p>${E('Take the first street on the right, go past the school and turn left at the traffic lights. Don’t take the bus: it’s very near!')}</p></div>
<div class="warn"><p>Pas de ${E('to')} ni de sujet : « To turn left » ou « Turn you left » sont faux. Au négatif, toujours ${E('Don’t')} : « No cross » ou « Don’t to cross » sont faux. À l’oral, on entend aussi ${E('You go straight on, then you turn left')} : c’est correct et très courant pour décrire un trajet.</p></div>`,
  audio:'Take the first street on the right, go past the school and turn left at the traffic lights. Don’t take the bus: it’s very near!'},

 {kind:'Méthode', h:'Indiquer un chemin étape par étape',
  p:`<p><b>Quand :</b> quelqu’un te demande ${E('How do I get to…?')} ou ${E('Where’s…?')} <b>Pourquoi ça marche :</b> on suit le trajet dans l’ordre, du point de vue de la personne qui marche (sa gauche, sa droite), avec un verbe à l’impératif par étape. <b>Comment :</b></p>
<ol><li>Pars de l’endroit où vous êtes : ${E('Go straight on')}, ${E('Go past…')}.</li><li>Compte les rues : ${E('Take the first / second street on the left / right')}, ou un repère : ${E('Turn left at the traffic lights')}.</li><li>Termine par la position exacte : ${E('It’s on your left / right')}, plus un repère (${E('opposite…')}, ${E('next to…')}).</li><li>Relie les étapes par ${E('then')} ou ${E('and')}.</li></ol>`,
  fig:plan(),
  demo:{enonce:`Sur le plan, tu es au point ${E('You are here')}, en bas de High Street (la rue verticale). Un touriste te demande : ${E('How do I get to the museum?')}`,
   etapes:[{f:E('Go straight on, past the bank and the café.'),w:'On monte High Street : la banque puis le café sont sur sa gauche.'},
    {f:E('Turn left at the traffic lights.'),w:`Les feux sont au croisement de Church Street, la deuxième rue : on pourrait aussi dire ${E('Take the second street on the left.')}`},
    {f:E('The museum is on your right, next to the library, opposite the supermarket.'),w:'En marchant vers la gauche du plan, le côté du haut est à sa droite. On ajoute deux repères pour qu’il ne puisse pas se tromper.'}],
   conclusion:E('Go straight on, past the bank and the café. Turn left at the traffic lights. The museum is on your right, next to the library, opposite the supermarket.')}},

 {kind:'Pratique', h:'À toi : une interdiction',
  p:`<p>Un enfant veut traverser au milieu de la route.</p><p><b>Question :</b> écris en anglais « Ne traverse pas ici, c’est dangereux ! »</p>`, lab:'Ta phrase',
  txt:V(X('Don’t cross here',[', ','. ',' '],'it is dangerous!'),X('Don’t cross here',[', ','. ',' '],'it is very dangerous!')), show:'Don’t cross here, it’s dangerous!',
  why:`Impératif négatif : ${E('Don’t')} + verbe de base. ${E('Don’t cross here, it’s dangerous!')}`},

 {kind:'Pratique', h:'À toi : donner une indication',
  p:`<p>Un touriste te demande le chemin de la gare.</p><p><b>Question :</b> écris en anglais « Allez tout droit, puis tournez à droite aux feux. »</p>`, lab:'Ta phrase',
  txt:X(['Go straight on','Go straight ahead','Go straight','You go straight on','You go straight ahead'],[', then ',' then ',', and then ',' and then ',' and '],['turn right','you turn right'],' at the ',['traffic lights','lights'],'.'), show:'Go straight on, then turn right at the traffic lights.',
  why:`Deux impératifs reliés par ${E('then')} : ${E('Go straight on, then turn right at the traffic lights.')} « Aux feux » = ${E('at the traffic lights')}.`},

 {kind:'Pratique', h:'Remets l’indication dans l’ordre',
  p:`<p>Reconstitue l’indication donnée par la passante.</p><p><b>Question :</b> touche les mots dans le bon ordre.</p>`,
  ordre:['Take','the','second','street','on','the','left.'],
  why:`${E('Take the second street on the left.')} Le verbe à l’impératif en tête, puis ${E('the second street')}, puis ${E('on the left')}.`},

 {kind:'Grammaire', h:'Let’s… : proposer une sortie',
  p:`<p>Quand on connaît la ville, on veut proposer d’y faire quelque chose ensemble : « Allons au musée ! », « Et si on prenait le bus ? ». L’anglais a une formule simple pour cela.</p>
<div class="def"><p><b>Let’s + verbe de base</b> = « allons… », « on… ? », « et si on… » : ${E('Let’s go to the museum!')}</p><p>Négatif : <b>Let’s not</b> + verbe : ${E('Let’s not take the car.')}</p></div>
<div class="idea"><p>${E('Let’s')} = ${E('let us')}, mais on dit toujours la forme courte. Elle <b>inclut</b> celui qui parle : c’est une proposition pour « nous ». Pour répondre : oui ${E('Good idea!')}, ${E('OK, why not?')}, ${E('Great!')} ; non ${E('Sorry, I can’t.')} ou ${E('Hmm, I don’t really like museums. Let’s go to the park!')} En britannique, on propose aussi avec une question : ${E('Shall we go to the park?')}</p></div>
<div class="ex"><p>${E('It’s sunny. Let’s go for a walk by the river! – Good idea!')}<br>${E('Let’s meet in front of the cinema at seven.')}</p></div>
<div class="warn"><p>Après ${E('Let’s')}, le verbe de base, sans ${E('to')} ni ${E('-ing')} : « Let’s to go » et « Let’s going » sont faux. N’oublie pas l’apostrophe : ${E('lets')} sans apostrophe veut dire « permet ». Et ${E('Let’s')} (nous) n’est pas ${E('Let me')} : ${E('Let me help you')} = laisse-moi t’aider.</p></div>`,
  audio:'It’s sunny. Let’s go for a walk by the river! Good idea! Let’s meet in front of the cinema at seven.'},

 {kind:'Pratique', h:'À toi : propose une sortie',
  p:`<p>Il pleut, ton amie s’ennuie.</p><p><b>Question :</b> écris en anglais « Allons au musée cet après-midi ! »</p>`, lab:'Ta phrase',
  txt:[...X('Let’s go to the museum this afternoon',['!','.']),...X('This afternoon',[', ',' '],'let’s go to the museum',['!','.'])], show:'Let’s go to the museum this afternoon!',
  why:`${E('Let’s')} + verbe de base : ${E('Let’s go to the museum this afternoon!')} (« cet après-midi » = ${E('this afternoon')}).`},

 {kind:'Prononciation', h:'Le th de third et de there',
  p:`<p>Dans les indications, le ${E('th')} est partout : ${E('the third street')}, ${E('the theatre')}, ${E('there')}, ${E('then')}, ${E('north')}. Ce son n’existe pas en français, et c’est l’un des plus repérables chez les francophones.</p>
<div class="def"><p>Pour le faire, place le <b>bout de la langue entre les dents</b> (ou juste derrière les dents du haut) et souffle. Il y a deux versions :</p><ul><li><b>th sourd</b> (sans vibration de la gorge) : ${E('think, three, third, thanks, theatre, north, south')}.</li><li><b>th sonore</b> (la gorge vibre) : ${E('the, this, that, there, then, with, brother')}.</li></ul></div>
<div class="warn"><p>Les pièges : remplacer le ${E('th')} par « s » ou « z » (« ze sird street »), ou par « f » ou « d ». ${E('think')} devient alors ${E('sink')} (évier) et ${E('three')} devient ${E('free')} (gratuit)&nbsp;! Exagère au début : la langue doit être visible entre les dents.</p></div>
<p>Écoute, puis redis l’indication.</p>`,
  audio:'Think, three, third, thanks, theatre, north. The, this, that, there, then, with. Go straight on, then take the third street on the right. The theatre is there.',
  dire:'Go straight on, then take the third street on the right. The theatre is there.'},

 {kind:'Écoute', h:'Suis le chemin',
  p:`<p>Regarde le plan. Tu es au point ${E('You are here')}. Écoute les indications sans lire, et suis le trajet avec le doigt.</p><p><b>Question :</b> où arrives-tu&nbsp;?</p>`,
  fig:plan(), audio:'Go straight on. Go past the bank and the café. At the traffic lights, turn right. It’s on your left, next to the cinema.', cache:true,
  opts:['À la boulangerie (Bakery)','À la pharmacie (Chemist’s)','À l’hôtel (Hotel)','Au musée (Museum)'], ans:2,
  why:`Tout droit jusqu’aux feux (Church Street), puis à droite. En marchant vers la droite du plan, le côté du haut est à gauche : ${E('on your left, next to the cinema')}, c’est l’hôtel. La boulangerie est en face, à droite.`},

 {kind:'Lecture', h:'Un e-mail pour venir chez nous',
  p:`<p>Marco va passer le week-end chez son amie Hannah, à Bristol. Lis l’e-mail qu’elle lui envoie, puis réponds. Tu peux aussi l’écouter.</p>
<div class="blk" data-t="E-mail"><p lang="en">Hi Marco! Great news: you can stay with us next weekend. Here are the directions from the station. Come out of the main entrance and turn left. Walk along Queen Street and go past the post office. At the traffic lights, turn right into Mill Road. Our building is the third on the left, between a small supermarket and a bakery. It’s number 27. Don’t take the lift: it’s very old and it often stops! We’re on the second floor, flat 4. There’s a great pizza place opposite our building. Let’s have dinner there on Saturday! See you soon, Hannah</p></div>
<p><b>Question :</b> où habite Hannah&nbsp;?</p>`,
  audio:'Hi Marco! Great news: you can stay with us next weekend. Here are the directions from the station. Come out of the main entrance and turn left. Walk along Queen Street and go past the post office. At the traffic lights, turn right into Mill Road. Our building is the third on the left, between a small supermarket and a bakery. It’s number 27. Don’t take the lift: it’s very old and it often stops! We’re on the second floor, flat 4. There’s a great pizza place opposite our building. Let’s have dinner there on Saturday! See you soon, Hannah',
  opts:['Au 27 Queen Street, en face de la poste','Au 4 Mill Road, à côté de la gare','Au 27 Mill Road, entre un petit supermarché et une boulangerie','Au 27 Mill Road, en face d’une boulangerie'], ans:2,
  why:`${E('turn right into Mill Road. Our building is the third on the left, between a small supermarket and a bakery. It’s number 27.')} En face, il y a une pizzeria (${E('a great pizza place opposite our building')}). ${E('flat 4')} est le numéro de l’appartement, au 2e étage. (${E('lift')} = ascenseur, ${E('elevator')} en américain.)`},

 {kind:'Dictée', h:'Dictée : une indication',
  p:'Écoute et écris exactement l’indication. Réécoute autant que tu veux.',
  dictee:'Go straight on, then turn left at the traffic lights. The museum is on your right.',
  why:`Deux impératifs (${E('Go')}, ${E('turn')}), ${E('at the traffic lights')} et ${E('on your right')}.`},

 {kind:'Oral', h:'Explique ton chemin',
  p:`<p>À toi de parler, 30 à 45 secondes. Un touriste est devant chez toi et te demande ${E('Excuse me, how do I get to the station?')} (ou à la boulangerie la plus proche). Explique-lui le chemin étape par étape, situe le lieu avec un repère, dis si c’est loin, puis termine par une formule aimable.</p>`,
  oral:{modele:'The station? It’s easy. Go straight on to the end of the street, then turn left. Go past the supermarket and take the second street on the right. The station is on your left, opposite a big hotel. It’s about ten minutes’ walk. You can’t miss it!',
   criteres:['J’ai donné les étapes à l’impératif (Go, Turn, Take…)','J’ai compté les rues (the first / second street on the left / right)','J’ai situé le lieu avec opposite, between, next to ou on the corner of','J’ai dit si c’est loin (… minutes’ walk)','J’ai prononcé les th de the, then, third avec la langue entre les dents']}},

 {kind:'Écriture', h:'Invite un ami chez toi',
  p:`<p>Un ami anglophone vient te voir samedi et arrive en bus. Écris-lui un message (au moins 40 mots) : propose-lui une activité avec ${E('Let’s…')}, explique le chemin de l’arrêt de bus jusqu’à chez toi à l’impératif, et situe ta maison ou ton immeuble avec au moins une préposition (${E('opposite, between, next to…')}).</p>`,
  ecrire:{min:40, modele:'Hi Ben! See you on Saturday! Get off the bus at the stop in front of the post office. Cross the road and turn left. Go past the bakery and take the first street on the right. My building is number 12, opposite the park. Let’s have lunch in the town centre and then go to the museum!',
   criteres:[{t:'J’ai fait une proposition avec Let’s + verbe', re:'\\blet[\'’]s\\s+(?!to\\b)\\w+'},{t:'J’ai donné des indications à l’impératif', re:'(^|[.!?]\\s*)(go|turn|take|cross|walk|come|get)\\b'},{t:'J’ai situé un lieu avec opposite, between, next to, near, behind, in front of ou on the corner', re:'\\b(opposite|between|next to|near|behind|in front of|on the corner)\\b'},{t:'J’ai indiqué une direction (left, right, straight on)', re:'\\b(left|right|straight)\\b'},'J’ai décrit le trajet dans l’ordre (then, after that)']}},

 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul><li>Demander : ${E('Excuse me, where’s…? Is there a … near here? How do I get to…? Is it far?')}</li><li>Indiquer, à l’<b>impératif</b> (verbe de base, sans sujet) : ${E('Go straight on. Turn left. Take the second street on the right. Go past… Cross the road.')} Négatif : ${E('Don’t')} + verbe.</li><li>Situer : ${E('opposite')} (en face de, <b>pas</b> ${E('in front of')} = devant), ${E('between … and …')}, ${E('next to')}, ${E('near')} (sans ${E('of')}), ${E('behind')}, ${E('on the corner of')}, ${E('at the end of')}, ${E('on your left / right')}.</li><li>Proposer : ${E('Let’s')} + verbe de base (${E('Let’s go!')}), ${E('Let’s not…')} ; répondre ${E('Good idea! / Sorry, I can’t.')}</li><li>Faux amis : ${E('library')} = bibliothèque, ${E('bookshop')} = librairie, ${E('chemist’s')} = pharmacie, ${E('car park')} = parking.</li><li>Le ${E('th')} : langue entre les dents, sourd (${E('three, third')}) ou sonore (${E('the, there')}).</li></ul></div>`},

 {kind:'Mission', h:'À l’office du tourisme',
  p:'Deux amies, Clara et Jo, visitent une ville du nord de l’Angleterre. Clara demande son chemin à l’office du tourisme, à côté de la gare. Écoute le dialogue, puis réponds. Tu peux réécouter.',
  audio:[['Clara','Hello. Where’s the Science Museum, please?'],['Assistant','The Science Museum? It’s quite far. You can take the number 14 bus. The bus stop is opposite the station.'],['Clara','Can we walk there?'],['Assistant','Yes, of course. It’s about twenty-five minutes’ walk. Come out of the station and turn right. Go straight on to the river. Cross the bridge, then take the first street on the left. The museum is at the end of the street.'],['Clara','Great. And is there a good café near the museum?'],['Assistant','Yes, there’s a nice café between the museum and the park.'],['Clara','Thank you very much!'],['Assistant','You’re welcome. Enjoy your visit!']], cache:true,
  parts:[
   {q:'a) Où est l’arrêt du bus pour le musée&nbsp;?', opts:['Devant la gare','En face de la gare','À côté du musée','Au bout de la rue'], ans:1, hint:`Écoute le mot après ${E('The bus stop is…')}`, why:`${E('The bus stop is opposite the station.')} ${E('opposite')} = en face de (devant = ${E('in front of')}).`},
   {q:'b) Quel est le numéro du bus&nbsp;? Écris-le en chiffres.', lab:'Bus n°', txt:['14','fourteen','number 14','number fourteen'], hint:`Un nombre en ${E('-teen')}, accentué sur la fin.`, why:`${E('the number 14 bus')} : ${E('fourteen')}.`},
   {q:'c) Quel est le bon trajet à pied&nbsp;?', opts:['À gauche en sortant de la gare, tout droit jusqu’au pont, puis la première à droite','À droite en sortant de la gare, tout droit jusqu’à la rivière, traverser le pont, puis la première à gauche','À droite en sortant de la gare, puis la première à gauche avant le pont','Traverser la rivière, puis tout droit jusqu’au parc'], ans:1, hint:'Il y a quatre étapes : sortir, aller jusqu’à la rivière, traverser, tourner.', why:`${E('Come out of the station and turn right. Go straight on to the river. Cross the bridge, then take the first street on the left.')} Le musée est au bout de cette rue.`},
   {q:'d) Le trajet dure 25 minutes et il fait beau. Propose à Jo, en anglais : « Allons-y à pied ! »', lab:'Ta phrase', txt:["Let’s walk!","Let’s walk there!","Let’s walk, then!","Let’s go on foot!","Let’s go there on foot!","Let’s walk to the museum!","Let’s go to the museum on foot!"], hint:`${E('Let’s')} + verbe de base. « Marcher, aller à pied » = ${E('walk')}.`, why:`${E('Let’s walk!')} (ou ${E('Let’s go on foot!')}). Pas de ${E('to')} après ${E('Let’s')}.`}],
  sol:`<p lang="en">Clara: Hello. Where’s the Science Museum, please? – Assistant: It’s quite far. You can take the number 14 bus. The bus stop is opposite the station. – Can we walk there? – Yes, of course. It’s about twenty-five minutes’ walk. Come out of the station and turn right. Go straight on to the river. Cross the bridge, then take the first street on the left. The museum is at the end of the street. – And is there a good café near the museum? – Yes, there’s a nice café between the museum and the park.</p><p>Bus n° 14, arrêt en face de la gare ; à pied, 25 minutes : à droite, tout droit jusqu’à la rivière, le pont, puis la première à gauche. Proposition : ${E('Let’s walk!')}</p>`},

 {kind:'Mission', h:'Guide d’un jour',
  p:`<p>Tu accueilles un ami anglais dans cette petite ville. Vous êtes au point ${E('You are here')}, en bas de High Street (la rue verticale). Utilise le plan pour répondre.</p>`,
  fig:plan(),
  parts:[
   {q:'a) Ton ami veut aller au cinéma. Quelle indication est juste&nbsp;?', opts:['Take the first street on the left. The cinema is on your right.','Go straight on, past the traffic lights. The cinema is on your right, opposite the library.','Go straight on. The cinema is on your left, opposite the bank.','Turn right at the traffic lights. The cinema is next to the bakery.'], ans:1, hint:'Le cinéma est sur High Street, juste après le croisement de Church Street.', why:`On monte High Street et on passe les feux : le cinéma est à droite, à l’angle de Church Street, en face de la bibliothèque.`},
   {q:'b) Qu’est-ce qui est en face de la pharmacie (Chemist’s)&nbsp;? Réponds par une phrase complète en anglais.', lab:'Ta phrase', txt:V(X(['The café is opposite the chemist’s','The cafe is opposite the chemist’s','The café is across from the chemist’s','The café','It is the café'],'.')), show:'The café is opposite the chemist’s.', hint:'Regarde de l’autre côté de High Street, à la même hauteur.', why:`${E('The café is opposite the chemist’s.')} Ils se font face, de chaque côté de High Street.`},
   {q:'c) Complète l’indication vers la boulangerie : « Go straight on and turn right at the traffic lights. The bakery is on your right, ___ the hotel. » Écris le mot manquant.', lab:'Le mot', txt:['opposite'], hint:'La boulangerie et l’hôtel sont de chaque côté de Church Street.', why:`${E('The bakery is on your right, opposite the hotel.')} En marchant vers la droite du plan, la boulangerie est à droite et l’hôtel à gauche, en face.`},
   {q:'d) Ton ami veut voir le musée. Écris l’indication : « Prends la deuxième rue à gauche. »', lab:'Ta phrase', txt:X('Take the second ',['street on the left','road on the left','left','turning on the left'],'.'), show:'Take the second street on the left.', hint:'Impératif, puis ordinal : first, second, third.', why:`${E('Take the second street on the left.')} (ou, plus familier, ${E('Take the second left.')})`},
   {q:'e) Il fait beau. Propose-lui en anglais : « Allons au parc après le déjeuner ! »', lab:'Ta phrase', txt:[...X('Let’s go to the park after lunch',['!','.']),...X('After lunch',[', ',' '],'let’s go to the park',['!','.'])], show:'Let’s go to the park after lunch!', hint:`${E('Let’s')} + verbe de base ; « après le déjeuner » = ${E('after lunch')}, sans article.`, why:`${E('Let’s go to the park after lunch!')} Le parc est au bout de High Street, de l’autre côté de Park Road.`}],
  sol:`<p>a) ${E('Go straight on, past the traffic lights. The cinema is on your right, opposite the library.')} b) ${E('The café is opposite the chemist’s.')} c) ${E('The bakery is on your right, opposite the hotel.')} d) ${E('Take the second street on the left.')} (Church Street, aux feux), puis le musée est à droite, à côté de la bibliothèque. e) ${E('Let’s go to the park after lunch!')}</p>`},
]},
);
})();
