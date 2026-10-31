/* Déclic — Notions fondamentales : le langage des ensembles (1) */
(()=>{
/* ---------- helpers locaux ---------- */
let GV=0;
const circP=(cx,cy,r)=>`M${cx-r} ${cy}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0Z`;
const tx=(x,y,s,q='')=>`<text x="${x}" y="${y}" font-size="14" font-weight="700" text-anchor="middle" fill="var(--ink)" ${q}>${s}</text>`;
const VF=b=>`<b style="color:${b?'var(--ok)':'var(--bad)'}">${b?'V':'F'}</b>`;
// Tableau HTML ; les booléens deviennent V / F colorés ; hl = indice de ligne surlignée
const tab=(head,rows,hl=-1)=>`<table style="border-collapse:collapse;margin:6px auto"><tr>${head.map(h=>`<th style="border-bottom:2px solid var(--line);padding:4px 9px">${h}</th>`).join('')}</tr>${rows.map((r,i)=>`<tr${i===hl?' style="background:color-mix(in srgb,var(--accent) 25%,transparent)"':''}>${r.map(c=>`<td style="padding:4px 9px;text-align:center;border-bottom:1px solid var(--line)">${typeof c==='boolean'?VF(c):c}</td>`).join('')}</tr>`).join('')}</table>`;
const imp=(p,q)=>!p||!!q;
// Diagramme de Venn à deux ensembles : s = {a, ab, b, o} régions coloriées, o.els = textes dans les régions
function venn(s,o={}){
  const id='gv'+(++GV), A=circP(125,100,62), B=circP(195,100,62), col=o.c||'var(--accent)', fo=.5, e=o.els||{};
  let g='';
  if(s.o) g+=`<rect x="10" y="10" width="300" height="180" rx="10" fill="${col}" fill-opacity="${fo}"/><path d="${A}${B}" fill="var(--surface)"/>`;
  if(s.a) g+=`<path d="${A}${B}" fill-rule="evenodd" clip-path="url(#${id}A)" fill="${col}" fill-opacity="${fo}"/>`;
  if(s.b) g+=`<path d="${A}${B}" fill-rule="evenodd" clip-path="url(#${id}B)" fill="${col}" fill-opacity="${fo}"/>`;
  if(s.ab) g+=`<path d="${B}" clip-path="url(#${id}A)" fill="${col}" fill-opacity="${fo}"/>`;
  return `<svg viewBox="0 0 320 200" width="320" role="img"><defs><clipPath id="${id}A"><path d="${A}"/></clipPath><clipPath id="${id}B"><path d="${B}"/></clipPath></defs>`
    +`<rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="var(--muted)" stroke-width="1.5"/>${g}`
    +`<path d="${A}" fill="none" stroke="var(--ink)" stroke-width="2"/><path d="${B}" fill="none" stroke="var(--ink)" stroke-width="2"/>`
    +tx(80,36,o.la||'A')+tx(240,36,o.lb||'B')+tx(292,180,o.lu||'E','fill-opacity=".7"')
    +(e.a?tx(98,105,e.a):'')+(e.ab?tx(160,105,e.ab):'')+(e.b?tx(222,105,e.b):'')+(e.o?tx(40,180,e.o):'')+'</svg>';
}
// Diagramme de Venn à trois ensembles : régions a, b, c, ab, ac, bc, abc, o (o = hors des trois)
const R3={o:[0,0,0],a:[1,0,0],b:[0,1,0],c:[0,0,1],ab:[1,1,0],ac:[1,0,1],bc:[0,1,1],abc:[1,1,1]};
const R3pos={a:[103,74],b:[217,74],c:[160,176],ab:[160,62],ac:[122,126],bc:[198,126],abc:[160,106],o:[40,194]};
function venn3(s,o={}){
  const id='gw'+(++GV), C=[[130,85],[190,85],[160,137]], r=56, col=o.c||'var(--accent)', e=o.els||{};
  const P=C.map(c=>circP(c[0],c[1],r));
  let defs=''; 'ABC'.split('').forEach((n,i)=>{ defs+=`<clipPath id="${id}c${n}"><path d="${P[i]}"/></clipPath><mask id="${id}m${n}"><rect x="0" y="0" width="320" height="212" fill="white"/><path d="${P[i]}" fill="black"/></mask>`; });
  const reg=bits=>{ let g=`<rect x="10" y="10" width="300" height="192" rx="10" fill="${col}" fill-opacity=".5"/>`;
    bits.forEach((b,i)=>{ const n='ABC'[i]; g=b?`<g clip-path="url(#${id}c${n})">${g}</g>`:`<g mask="url(#${id}m${n})">${g}</g>`; }); return g; };
  let g=''; for(const k in R3) if(s[k]) g+=reg(R3[k]);
  let lab=''; for(const k in e) if(e[k]) lab+=tx(R3pos[k][0],R3pos[k][1]+5,e[k],'font-size="13"');
  const dot=o.dot?`<circle cx="${R3pos[o.dot][0]}" cy="${R3pos[o.dot][1]}" r="7" fill="var(--spark)" stroke="var(--surface)" stroke-width="2"/>`+tx(R3pos[o.dot][0]+14,R3pos[o.dot][1]-6,'x'):'';
  return `<svg viewBox="0 0 320 212" width="320" role="img"><defs>${defs}</defs><rect x="10" y="10" width="300" height="192" rx="10" fill="none" stroke="var(--muted)" stroke-width="1.5"/>${g}`
    +P.map(p=>`<path d="${p}" fill="none" stroke="var(--ink)" stroke-width="2"/>`).join('')
    +tx(72,34,'A')+tx(248,34,'B')+tx(226,192,'C')+tx(292,194,'E','fill-opacity=".7"')+lab+dot+'</svg>';
}
const key3=(a,b,c)=>(a?'a':'')+(b?'b':'')+(c?'c':'')||'o';
const regions3=f=>{ const s={}; for(const k in R3) s[k]=f(...R3[k].map(Boolean))?1:0; return s; };
const isPrime=n=>{ if(n<2) return false; for(let d=2;d*d<=n;d++) if(n%d===0) return false; return true; };
const small=n=>{ for(let d=2;d*d<=n;d++) if(n%d===0) return d; return n; };
// Grille du produit {1..nx} × {1..ny} : st(i,j) → 0 (point gris), 1 (point plein), 2 (point plein + case colorée)
function grid(nx,ny,st,o={}){
  const P=plane({x:[-0.2,nx+0.9],y:[-0.2,ny+1.2],grid:false,axes:false,w:320,h:o.h||Math.round(320*(ny+1.4)/(nx+1.1))});
  P.arrow(0.3,0.3,nx+0.8,0.3,{c:'var(--muted)',w:1.5,hs:8}).arrow(0.3,0.3,0.3,ny+0.8,{c:'var(--muted)',w:1.5,hs:8});
  const lx=o.lx||(i=>String(i)), ly=o.ly||(j=>String(j));
  for(let i=1;i<=nx;i++) P.text(i,0.3,lx(i),{a:'middle',dy:17,c:'var(--muted)'});
  for(let j=1;j<=ny;j++) P.text(0.3,j,ly(j),{a:'end',dx:-6,dy:5,c:'var(--muted)'});
  for(let i=1;i<=nx;i++) for(let j=1;j<=ny;j++){ const s=st(i,j);
    if(s===2) P.rect(i-0.42,j-0.42,0.84,0.84,{fill:o.fill||'var(--accent)',fo:.35,c:null});
    P.dot(i,j,s?{r:7,c:o.dc||'var(--accent)'}:{r:3,c:'var(--muted)'}); }
  if(o.ex) o.ex(P);
  P.text(nx+0.75,0.3,o.nx||'E',{dy:-8,a:'end',c:'var(--muted)'}).text(0.3,ny+0.75,o.ny||'F',{dx:8,c:'var(--muted)'});
  return P.svg();
}

COURS.push(
/* ===================== 1. LES SIGNES LOGIQUES ===================== */
{subj:'gred',sem:'ens',id:'gred-logique',h:'Les signes logiques et leur emploi',p:'Propositions, connecteurs, tables de vérité, quantificateurs : la grammaire de toutes les phrases mathématiques, et l’art de les nier.',steps:[
  {h:'Qu’est-ce qu’une proposition ?',p:`<p>En mathématiques, on affirme des choses puis on vérifie si elles tiennent. Avant de raisonner, il faut donc savoir quelles phrases ont le droit d’être vraies ou fausses.</p>
<div class="def"><p>Une <b>proposition</b> est un énoncé dont on peut dire, sans ambiguïté, s’il est <b>vrai</b> (V) ou <b>faux</b> (F). Cette valeur V ou F s’appelle sa <b>valeur de vérité</b> : jamais les deux, jamais « à moitié ».</p></div>
<div class="idea"><p>Une proposition est une affirmation complète sur laquelle un juge pourrait trancher. « 7 est premier » est vraie, « 2 + 2 = 5 » est fausse. Une proposition fausse reste une proposition : ce qui compte, c’est qu’on puisse décider.</p></div>
<div class="def"><p>Un <b>prédicat</b> <i>P</i>(<i>x</i>) est un énoncé qui contient une variable libre <i>x</i> : sa valeur dépend de ce que vaut <i>x</i>.</p></div>
<div class="ex"><p><i>P</i>(<i>x</i>) : « <i>x</i> &gt; 3 ». Impossible de trancher tant qu’on ignore <i>x</i>. En remplaçant <i>x</i> par une valeur, on obtient une proposition : <i>P</i>(5) est « 5 &gt; 3 », vraie ; <i>P</i>(1) est « 1 &gt; 3 », fausse. On peut aussi <b>quantifier</b> le prédicat (« pour tout réel <i>x</i>, <i>x</i> &gt; 3 »), comme on le verra plus bas.</p></div>
<div class="warn"><p>Une phrase vague n’est pas une proposition : « 1000 est un grand nombre » ne se tranche pas, car « grand » n’est pas défini.</p></div>`,
   fig:tab(['Énoncé','Nature'],[['13 est un nombre premier','proposition vraie'],['Tout carré est un losange','proposition vraie'],['10 &lt; 3','proposition fausse'],['<i>n</i> est pair','prédicat'],['Calcule 3 · 7','ni l’un ni l’autre']]),
   note:'Une question ou un ordre ne sont pas des propositions : ils ne sont ni vrais ni faux.'},
  {h:'Proposition ou pas ?',p:'Lequel de ces énoncés est une proposition&nbsp;?',
   opts:['<i>x</i>² = 4','Simplifie la fraction 6/8','La somme de deux nombres impairs est paire','<i>n</i> est un nombre premier'],ans:2,
   why:'« La somme de deux nombres impairs est paire » a une valeur de vérité (ici V). Les énoncés avec x ou n libres sont des prédicats, et un ordre n’est ni vrai ni faux.'},
  {h:'Les connecteurs non, et, ou',p:`<p>Une phrase comme « 6 est pair et 6 est premier » est fabriquée à partir de deux phrases plus simples. Pour savoir si elle est vraie, il suffit de connaître la valeur de chaque morceau : c’est le rôle des <b>connecteurs</b>.</p>
<div class="def"><p>Pour deux propositions <i>P</i> et <i>Q</i> :</p><ul><li><b>non <i>P</i></b> (la négation) est vraie exactement quand <i>P</i> est fausse ;</li><li><b><i>P</i> et <i>Q</i></b> (la conjonction) est vraie seulement quand les deux sont vraies ;</li><li><b><i>P</i> ou <i>Q</i></b> (la disjonction) est vraie quand au moins l’une des deux est vraie.</li></ul></div>
<div class="idea"><p>La <b>table de vérité</b> liste tous les cas : deux lettres, chacune V ou F, donc 2 × 2 = 4 lignes. Un connecteur est entièrement décrit par sa colonne. « et » est exigeant : un seul F suffit à le rendre faux. « ou » est accommodant : un seul V suffit à le rendre vrai.</p></div>
<div class="ex"><p><i>P</i> : « 6 est pair » (V) et <i>Q</i> : « 6 est premier » (F). Alors <i>P</i> et <i>Q</i> est F, <i>P</i> ou <i>Q</i> est V, non <i>Q</i> est V. Règle les curseurs sur <i>P</i> V, <i>Q</i> F et retrouve cette ligne dans la table.</p></div>
<div class="warn"><p>La négation de « <i>P</i> et <i>Q</i> » n’est pas « non <i>P</i> et non <i>Q</i> ». La bonne règle viendra avec les lois de De Morgan.</p></div>`,
   params:[{id:'p',l:'P vraie ? (0 = F, 1 = V)',min:0,max:1,v:1},{id:'q',l:'Q vraie ?',min:0,max:1,v:0}],
   draw:v=>{ const rows=[[1,1],[1,0],[0,1],[0,0]]; return tab(['P','Q','non P','P et Q','P ou Q'],rows.map(([p,q])=>[!!p,!!q,!p,!!(p&&q),!!(p||q)]),rows.findIndex(r=>r[0]===v.p&&r[1]===v.q)); },
   info:v=>`Exemple avec <i>P</i> : « 6 est pair » et <i>Q</i> : « 6 est premier » : c’est la ligne <i>P</i> V, <i>Q</i> F. Ta ligne : <i>P</i> et <i>Q</i> est ${VF(v.p&&v.q)}, <i>P</i> ou <i>Q</i> est ${VF(v.p||v.q)}.`,
   note:'Le « ou » mathématique est <b>inclusif</b> : <i>P</i> ou <i>Q</i> reste vraie quand les deux sont vraies. Ce n’est pas le « fromage ou dessert » du menu.'},
  {h:'Lire les connecteurs',p:'<i>P</i> : « 12 est pair » et <i>Q</i> : « 12 est premier ». Laquelle de ces propositions est vraie&nbsp;?',
   opts:['<i>P</i> et <i>Q</i>','non <i>P</i> ou <i>Q</i>','<i>P</i> ou <i>Q</i>','non (<i>P</i> ou <i>Q</i>)'],ans:2,
   why:'P est vraie et Q est fausse. Donc P et Q est F, non P ou Q est F ou F = F, P ou Q est V, et sa négation est F.'},
  {h:'L’implication P ⇒ Q',p:`<p>Presque tous les théorèmes s’écrivent « si…, alors… ». Il faut savoir exactement quand une telle phrase est vraie, y compris quand le « si » n’a pas lieu.</p>
<div class="def"><p><b><i>P</i> ⇒ <i>Q</i></b> se lit « <i>P</i> implique <i>Q</i> » ou « si <i>P</i>, alors <i>Q</i> ». <i>P</i> est l’<b>hypothèse</b>, <i>Q</i> la <b>conclusion</b>. Elle est fausse dans <b>un seul cas</b> : <i>P</i> vraie et <i>Q</i> fausse. Sur les trois autres lignes de la table, elle est vraie.</p></div>
<div class="idea"><p>Pense à une promesse : « si tu as 6, je t’offre un livre ». Elle n’est trahie que si tu as 6 et que le livre ne vient pas. Si tu n’as pas 6, rien n’était promis : la promesse n’est pas violée, on la compte vraie. D’où la colonne V, F, V, V.</p></div>
<div class="ex"><p><i>P</i>(<i>n</i>) : « <i>n</i> est multiple de 4 » et <i>Q</i>(<i>n</i>) : « <i>n</i> est pair ». Pour <i>n</i> = 8 : V ⇒ V, vraie. Pour <i>n</i> = 6 : F ⇒ V, vraie. Pour <i>n</i> = 7 : F ⇒ F, vraie. Le cas V ⇒ F n’arrive jamais, car 4<i>k</i> = 2 · (2<i>k</i>). En revanche <i>Q</i>(6) ⇒ <i>P</i>(6) est V ⇒ F, donc fausse. Fais varier <i>n</i> pour le voir.</p></div>
<div class="warn"><p>L’implication ne parle pas de cause : « si 2 + 2 = 5, alors la Lune est carrée » est vraie, car son hypothèse est fausse.</p></div>`,
   params:[{id:'n',l:'n',min:1,max:20,v:6}],
   draw:v=>{ let s='<svg viewBox="0 0 320 96" width="320" role="img">';
     for(let k=1;k<=20;k++){ const x=10+(k-1)*15; if(k===v.n) s+=`<rect x="${x-1}" y="4" width="16" height="78" rx="4" fill="none" stroke="var(--ink)" stroke-width="2"/>`;
       s+=`<rect x="${x+1}" y="10" width="12" height="24" rx="3" fill="${k%4===0?'var(--accent)':'var(--line)'}"/><rect x="${x+1}" y="40" width="12" height="24" rx="3" fill="${k%2===0?'var(--spark)':'var(--line)'}"/><text x="${x+7}" y="78" font-size="9" text-anchor="middle" fill="var(--muted)">${k}</text>`; }
     return s+'<text x="10" y="92" font-size="10" fill="var(--muted)">haut : multiple de 4 (P) ; bas : pair (Q)</text></svg>'; },
   info:v=>{ const p=v.n%4===0, q=v.n%2===0; return `<i>n</i> = ${v.n} : <i>P</i> ${VF(p)}, <i>Q</i> ${VF(q)} ; <i>P</i> ⇒ <i>Q</i> ${VF(imp(p,q))} ; <i>Q</i> ⇒ <i>P</i> ${VF(imp(q,p))}`; },
   note:'<i>P</i> ⇒ <i>Q</i> n’affirme ni <i>P</i> ni <i>Q</i>. Elle affirme seulement qu’on ne peut pas avoir <i>P</i> sans avoir <i>Q</i>.'},
  {h:'La promesse',p:'Un parent dit : « Si tu as 6 au test, je t’offre un livre. » Dans quel cas a-t-il menti&nbsp;?',
   opts:['Tu as 5 et il t’offre un livre','Tu as 5 et il ne t’offre rien','Tu as 6 et il ne t’offre rien','Tu as 6 et il t’offre un livre'],ans:2,
   why:'L’implication n’est fausse que si l’hypothèse est vraie (tu as 6) et la conclusion fausse (pas de livre). Avec un 5, il n’avait rien promis : offrir ou non un livre ne le rend pas menteur.'},
  {h:'Une implication et sa réciproque',p:`La <b>réciproque</b> de <i>P</i> ⇒ <i>Q</i> est <i>Q</i> ⇒ <i>P</i>. Règle les valeurs de <i>P</i> et <i>Q</i> pour que <i>P</i> ⇒ <i>Q</i> soit <b>vraie</b> mais que sa réciproque soit <b>fausse</b>.`,
   params:[{id:'p',l:'P vraie ? (0 = F, 1 = V)',min:0,max:1,v:1},{id:'q',l:'Q vraie ?',min:0,max:1,v:1}],
   draw:v=>{ const rows=[[1,1],[1,0],[0,1],[0,0]]; return tab(['P','Q','P ⇒ Q','Q ⇒ P'],rows.map(([p,q])=>[!!p,!!q,imp(p,q),imp(q,p)]),rows.findIndex(r=>r[0]===v.p&&r[1]===v.q)); },
   info:v=>`<i>P</i> ⇒ <i>Q</i> : ${VF(imp(v.p,v.q))} &nbsp; <i>Q</i> ⇒ <i>P</i> : ${VF(imp(v.q,v.p))}`,
   ok:v=>v.p===0&&v.q===1,
   why:'Avec P fausse et Q vraie, P ⇒ Q est vraie (hypothèse fausse) alors que Q ⇒ P a une hypothèse vraie et une conclusion fausse. Une implication et sa réciproque sont donc deux affirmations différentes.'},
  {h:'Équivalence, réciproque, contraposée',p:`<p>À partir d’une implication <i>P</i> ⇒ <i>Q</i>, on fabrique deux autres implications en échangeant ou en niant les morceaux. Une seule des deux dit la même chose que l’originale : il faut savoir laquelle.</p>
<div class="def"><ul><li>La <b>réciproque</b> de <i>P</i> ⇒ <i>Q</i> est <i>Q</i> ⇒ <i>P</i>.</li><li>La <b>contraposée</b> de <i>P</i> ⇒ <i>Q</i> est <b>non <i>Q</i> ⇒ non <i>P</i></b>.</li><li>L’<b>équivalence</b> <i>P</i> ⇔ <i>Q</i> (« <i>P</i> si et seulement si <i>Q</i> ») est vraie quand <i>P</i> et <i>Q</i> ont la même valeur. C’est (<i>P</i> ⇒ <i>Q</i>) et (<i>Q</i> ⇒ <i>P</i>).</li></ul></div>
<div class="why"><p>non <i>Q</i> ⇒ non <i>P</i> n’est fausse que si non <i>Q</i> est vraie et non <i>P</i> fausse, c’est-à-dire <i>Q</i> fausse et <i>P</i> vraie : exactement le cas où <i>P</i> ⇒ <i>Q</i> est fausse. Les deux colonnes de la table sont identiques. La réciproque, elle, est fausse sur la ligne <i>P</i> F, <i>Q</i> V, où l’originale est vraie.</p></div>
<div class="ex"><p>« Si <i>n</i> est multiple de 4, alors <i>n</i> est pair » est vraie. Sa contraposée, « si <i>n</i> est impair, alors <i>n</i> n’est pas multiple de 4 », l’est aussi. Sa réciproque, « si <i>n</i> est pair, alors <i>n</i> est multiple de 4 », est fausse : prends <i>n</i> = 6.</p></div>
<div class="warn"><p>Prouver une implication ne prouve jamais sa réciproque. Pour une équivalence, il faut deux preuves, une par sens.</p></div>`,
   fig:tab(['P','Q','P ⇒ Q','Q ⇒ P','non Q ⇒ non P','P ⇔ Q'],[[1,1],[1,0],[0,1],[0,0]].map(([p,q])=>[!!p,!!q,imp(p,q),imp(q,p),imp(!q,!p),p===q])),
   note:'« S’il pleut, le sol est mouillé » équivaut à « si le sol n’est pas mouillé, il ne pleut pas ». Mais pas à « si le sol est mouillé, il pleut » : quelqu’un a pu arroser.'},
  {kind:'Méthode',h:'Dresser une table de vérité, reconnaître une tautologie',
   p:'<b>Quand :</b> on veut savoir si deux formules disent la même chose, ou si une formule est toujours vraie. <b>Pourquoi ça marche :</b> la valeur d’une formule ne dépend que des valeurs de ses lettres. Avec <i>n</i> lettres, il y a 2<sup><i>n</i></sup> cas, qu’on peut tous examiner. <b>Comment :</b><ol><li>une colonne par lettre et 2<sup><i>n</i></sup> lignes (V V, V F, F V, F F pour deux lettres) ;</li><li>une colonne par sous-formule, de la plus intérieure à la plus extérieure ;</li><li>une formule vraie sur <b>toutes</b> les lignes est une <b>tautologie</b> ; deux formules aux colonnes identiques sont <b>équivalentes</b>.</li></ol>',
   demo:{enonce:'Montre que (<i>P</i> ⇒ <i>Q</i>) ⇔ (non <i>P</i> ou <i>Q</i>) est une tautologie.',
    etapes:[{f:'Lignes (<i>P</i>, <i>Q</i>) : (V, V), (V, F), (F, V), (F, F).',w:'Deux lettres, donc 2² = 4 lignes.'},
     {f:'Colonne <i>P</i> ⇒ <i>Q</i> : V, F, V, V.',w:'L’implication n’est fausse que sur la ligne (V, F).'},
     {f:'Colonne non <i>P</i> : F, F, V, V. Colonne non <i>P</i> ou <i>Q</i> : V, F, V, V.',w:'On calcule d’abord la sous-formule intérieure non P, puis le « ou ».'},
     {f:'Les deux colonnes sont identiques, donc la colonne ⇔ vaut V, V, V, V.',w:'L’équivalence est vraie quand les deux côtés ont la même valeur.'}],
    conclusion:'C’est une tautologie : <b><i>P</i> ⇒ <i>Q</i> équivaut à non <i>P</i> ou <i>Q</i></b>. Cette règle sert sans cesse, notamment pour nier une implication.'+tab(['P','Q','P ⇒ Q','non P ou Q'],[[1,1],[1,0],[0,1],[0,0]].map(([p,q])=>[!!p,!!q,imp(p,q),!p||!!q]))},
   note:'Avec trois lettres, il faut 2³ = 8 lignes : V V V, V V F, V F V, V F F, puis les mêmes avec P fausse.'},
  {h:'Compter les lignes vraies',p:'On dresse la table de vérité de (<i>P</i> ⇒ <i>Q</i>) ⇒ <i>R</i>. Sur combien des 8 lignes cette formule est-elle vraie&nbsp;?',lab:'lignes :',ans:5,
   why:'Elle n’est fausse que si P ⇒ Q est vraie et R fausse. P ⇒ Q est vraie sur 3 des 4 couples (P, Q), et R est fausse : 3 lignes fausses. Il reste 8 − 3 = 5 lignes vraies.'},
  {h:'Laquelle est une tautologie ?',p:'Une seule de ces formules est vraie quelles que soient les valeurs de <i>P</i> et <i>Q</i>. Laquelle&nbsp;?',
   opts:['<i>P</i> ⇒ (<i>P</i> et <i>Q</i>)','(<i>P</i> ou <i>Q</i>) ⇒ <i>P</i>','<i>P</i> ou non <i>P</i>','(<i>P</i> ⇒ <i>Q</i>) ⇒ (<i>Q</i> ⇒ <i>P</i>)'],ans:2,
   why:'P ou non P est toujours vraie : l’une des deux est vraie. Les autres échouent : la 1re pour P V, Q F ; la 2e pour P F, Q V ; la 4e pour P F, Q V (l’implication est vraie, sa réciproque fausse).'},
  {h:'Les lois de De Morgan',p:`<p>Pour nier « je sors et je cours », faut-il dire « je ne sors pas et je ne cours pas » ? Non. La table de vérité donne la bonne négation sans hésiter.</p>
<div class="thm"><p><b>Lois de De Morgan.</b> Pour toutes propositions <i>P</i> et <i>Q</i> :<br><b>non (<i>P</i> et <i>Q</i>) ⇔ (non <i>P</i>) ou (non <i>Q</i>)</b> ;<br><b>non (<i>P</i> ou <i>Q</i>) ⇔ (non <i>P</i>) et (non <i>Q</i>)</b>.</p></div>
<div class="why"><p>« <i>P</i> et <i>Q</i> » n’est vraie que sur la ligne (V, V). Sa négation est donc vraie sur les trois autres lignes, celles où au moins une lettre est fausse : c’est exactement « non <i>P</i> ou non <i>Q</i> ». De même, « <i>P</i> ou <i>Q</i> » n’est fausse que sur la ligne (F, F), et sa négation n’est vraie que là : « non <i>P</i> et non <i>Q</i> ». La table ci-dessous le vérifie pour la première loi.</p></div>
<div class="idea"><p>Nier échange « et » et « ou ». Pour qu’une double exigence échoue, il suffit qu’<b>une</b> des deux exigences échoue.</p></div>
<div class="ex"><p>« <i>n</i> est pair et <i>n</i> &gt; 10 » est fausse pour <i>n</i> = 7 (pas pair) comme pour <i>n</i> = 4 (pas plus grand que 10). Sa négation est « <i>n</i> est impair ou <i>n</i> ≤ 10 », vraie pour 7 et pour 4. La fausse négation « <i>n</i> impair et <i>n</i> ≤ 10 » oublierait <i>n</i> = 4.</p></div>`,
   fig:tab(['P','Q','P et Q','non (P et Q)','non P ou non Q'],[[1,1],[1,0],[0,1],[0,0]].map(([p,q])=>[!!p,!!q,!!(p&&q),!(p&&q),!p||!q]))},
  {kind:'Méthode',h:'Nier une proposition composée',
   p:'<b>Quand :</b> pour une preuve par contraposée ou par l’absurde, ou pour dire précisément quand une affirmation est fausse. <b>Les règles</b> (chacune se vérifie par une table de vérité) :<ul><li>non (non <i>P</i>) = <i>P</i> ;</li><li><b>non (<i>P</i> et <i>Q</i>) = non <i>P</i> ou non <i>Q</i></b> ;</li><li><b>non (<i>P</i> ou <i>Q</i>) = non <i>P</i> et non <i>Q</i></b> (lois de De Morgan) ;</li><li><b>non (<i>P</i> ⇒ <i>Q</i>) = <i>P</i> et non <i>Q</i></b>, car <i>P</i> ⇒ <i>Q</i> = non <i>P</i> ou <i>Q</i>.</li></ul><b>Comment :</b> repère la structure de la phrase (quel connecteur est le plus extérieur), applique la règle correspondante, puis recommence à l’intérieur.',
   demo:{enonce:'Nie la phrase « S’il fait beau, je sors et je cours ».',
    etapes:[{f:'Structure : <i>P</i> ⇒ (<i>Q</i> et <i>R</i>) avec <i>P</i> : « il fait beau », <i>Q</i> : « je sors », <i>R</i> : « je cours ».',w:'Le connecteur extérieur est l’implication.'},
     {f:'non [<i>P</i> ⇒ (<i>Q</i> et <i>R</i>)] = <i>P</i> et non (<i>Q</i> et <i>R</i>).',w:'La négation d’une implication : l’hypothèse a lieu et la conclusion échoue.'},
     {f:'= <i>P</i> et (non <i>Q</i> ou non <i>R</i>).',w:'De Morgan à l’intérieur : le « et » devient « ou ».'},
     {f:'« Il fait beau, et je ne sors pas ou je ne cours pas. »',w:'On retraduit en français.'}],
    conclusion:'La négation d’une implication <b>n’est pas une implication</b> : c’est un « et ». Écrire « s’il fait beau, je ne sors pas » serait une erreur classique.'}},
  {h:'Nier une implication',p:'Pour un réel <i>x</i> fixé, quelle est la négation de « si <i>x</i> &gt; 2, alors <i>x</i>² &gt; 4 »&nbsp;?',
   opts:['<i>x</i> ≤ 2 ⇒ <i>x</i>² ≤ 4','<i>x</i> &gt; 2 et <i>x</i>² ≤ 4','<i>x</i> &gt; 2 ⇒ <i>x</i>² ≤ 4','<i>x</i> ≤ 2 et <i>x</i>² &gt; 4'],ans:1,
   why:'non (P ⇒ Q) = P et non Q. Ici P : x > 2 et non Q : x² ≤ 4. On garde l’hypothèse et on nie la conclusion.'},
  {h:'Les quantificateurs ∀ et ∃',p:`<p>« <i>x</i>² ≥ 0 » est un prédicat : sa valeur dépend de <i>x</i>. Pour en faire une proposition sans choisir de valeur, on dit pour <b>combien</b> de <i>x</i> la propriété tient : pour tous, ou pour au moins un.</p>
<div class="def"><ul><li><b>∀<i>x</i> ∈ <i>E</i>, <i>P</i>(<i>x</i>)</b> se lit « pour tout <i>x</i> de <i>E</i>, <i>P</i>(<i>x</i>) ». Elle est vraie si <i>P</i>(<i>x</i>) est vraie pour chaque élément de <i>E</i>.</li><li><b>∃<i>x</i> ∈ <i>E</i>, <i>P</i>(<i>x</i>)</b> se lit « il existe <i>x</i> dans <i>E</i> tel que <i>P</i>(<i>x</i>) ». Elle est vraie dès qu’<b>au moins un</b> élément convient.</li><li><b>∃!<i>x</i> ∈ <i>E</i>, <i>P</i>(<i>x</i>)</b> : « il en existe un et un seul ».</li></ul></div>
<div class="idea"><p>∀ est un A renversé, l’initiale de « <b>a</b>ll » (tous), et ∃ un E retourné, celle de « <b>e</b>xiste ». Sur un ensemble fini {<i>a</i> ; <i>b</i> ; <i>c</i>}, ∀ est un grand « et » : <i>P</i>(<i>a</i>) et <i>P</i>(<i>b</i>) et <i>P</i>(<i>c</i>). ∃ est un grand « ou ».</p></div>
<div class="ex"><p>∀<i>x</i> ∈ ℝ, <i>x</i>² ≥ 0 est vraie. ∃<i>n</i> ∈ ℕ, <i>n</i>² = 2 est fausse : 1² = 1 et 2² = 4 encadrent 2. Pourtant ∃<i>x</i> ∈ ℝ, <i>x</i>² = 2 est vraie avec <i>x</i> = √2. Enfin ∃!<i>x</i> ∈ ℝ, <i>x</i>³ = 8 est vraie (seul 2 convient), mais ∃!<i>x</i> ∈ ℝ, <i>x</i>² = 4 est fausse : 2 et −2 conviennent.</p></div>
<div class="warn"><p>Pour prouver un ∀, un exemple ne suffit jamais. Pour prouver un ∃, un seul exemple suffit.</p></div>`,
   note:'La variable quantifiée est <b>muette</b> : ∀x ∈ ℝ, x² ≥ 0 et ∀t ∈ ℝ, t² ≥ 0 disent la même chose. Le domaine compte : la même propriété peut être vraie dans ℝ et fausse dans ℕ.'},
  {kind:'Méthode',h:'Nier une phrase quantifiée',
   p:'<b>Pourquoi :</b> « tous les <i>x</i> vérifient <i>P</i> » est faux exactement quand <b>au moins un</b> <i>x</i> ne vérifie pas <i>P</i>. Et « il existe un <i>x</i> qui vérifie <i>P</i> » est faux quand <b>aucun</b> ne le vérifie :<br><b>non (∀<i>x</i>, <i>P</i>(<i>x</i>)) = ∃<i>x</i>, non <i>P</i>(<i>x</i>)</b> &nbsp;et&nbsp; <b>non (∃<i>x</i>, <i>P</i>(<i>x</i>)) = ∀<i>x</i>, non <i>P</i>(<i>x</i>)</b>.<br><b>Comment :</b> lis la phrase de gauche à droite, échange chaque ∀ et ∃ <b>sans toucher aux domaines</b>, puis nie la propriété finale avec les règles des connecteurs.',
   demo:{enonce:'Nie « ∀ε &gt; 0, ∃<i>n</i> ∈ ℕ*, 1/<i>n</i> &lt; ε ».',
    etapes:[{f:'∃ε &gt; 0, non (∃<i>n</i> ∈ ℕ*, 1/<i>n</i> &lt; ε)',w:'Le premier ∀ devient ∃ ; le domaine « ε > 0 » reste tel quel.'},
     {f:'∃ε &gt; 0, ∀<i>n</i> ∈ ℕ*, non (1/<i>n</i> &lt; ε)',w:'Le ∃ suivant devient ∀.'},
     {f:'∃ε &gt; 0, ∀<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε',w:'La négation de « < » est « ≥ ».'}],
    conclusion:'La négation est « ∃ε &gt; 0, ∀<i>n</i> ∈ ℕ*, 1/<i>n</i> ≥ ε ». La phrase de départ est vraie (prends <i>n</i> &gt; 1/ε), donc sa négation est fausse.'},
   note:'Erreur fréquente : nier aussi le domaine et écrire « ∃ε ≤ 0 ». On ne nie que la propriété, jamais l’endroit où l’on cherche.'},
  {h:'Nier une phrase à deux quantificateurs',p:'Quelle est la négation de « ∀<i>x</i> ∈ ℝ, ∃<i>y</i> ∈ ℝ, <i>y</i>² = <i>x</i> »&nbsp;?',
   opts:['∀<i>x</i> ∈ ℝ, ∃<i>y</i> ∈ ℝ, <i>y</i>² ≠ <i>x</i>','∃<i>x</i> ∉ ℝ, ∀<i>y</i> ∉ ℝ, <i>y</i>² ≠ <i>x</i>','∃<i>y</i> ∈ ℝ, ∀<i>x</i> ∈ ℝ, <i>y</i>² ≠ <i>x</i>','∃<i>x</i> ∈ ℝ, ∀<i>y</i> ∈ ℝ, <i>y</i>² ≠ <i>x</i>'],ans:3,
   why:'On échange ∀ et ∃ dans le même ordre, sans toucher aux domaines, et on nie l’égalité. Cette négation est vraie (x = −1 n’est le carré d’aucun réel), donc la phrase de départ est fausse.'},
  {h:'En français',p:'Quelle est la négation de « Tous les élèves de la classe ont au moins un frère »&nbsp;?',
   opts:['Aucun élève de la classe n’a de frère','Au moins un élève de la classe n’a aucun frère','Tous les élèves de la classe n’ont aucun frère','Au moins un élève de la classe a un frère'],ans:1,
   why:'La phrase a la forme « ∀ élève, ∃ un frère ». Sa négation est « ∃ un élève, ∀ garçon, ce garçon n’est pas son frère » : il existe un élève sans frère. « Aucun élève n’a de frère » est bien plus fort que la négation.'},
  {h:'L’ordre des quantificateurs',p:`<p>Une phrase peut contenir plusieurs quantificateurs, comme « pour tout <i>x</i>, il existe <i>y</i> tel que… ». On les lit de gauche à droite, et leur ordre peut changer complètement le sens.</p>
<div class="prop"><p>Deux quantificateurs de <b>même nature</b> commutent : ∀<i>x</i> ∀<i>y</i> revient à ∀<i>y</i> ∀<i>x</i>, et ∃<i>x</i> ∃<i>y</i> à ∃<i>y</i> ∃<i>x</i>. Mais <b>∀ et ∃ ne commutent pas</b>.</p></div>
<div class="idea"><p>Imagine un jeu à deux joueurs. Le joueur « ∀ » choisit les variables placées sous ∀, le joueur « ∃ » celles sous ∃, dans l’ordre de lecture ; la phrase est vraie si ∃ gagne à tous les coups. Dans « ∀<i>x</i> ∃<i>y</i> », ∃ joue après avoir vu <i>x</i> : son <i>y</i> peut <b>dépendre</b> de <i>x</i>. Dans « ∃<i>y</i> ∀<i>x</i> », ∃ annonce <i>y</i> d’abord, une fois pour toutes, et ce même <i>y</i> doit résister à tous les <i>x</i>.</p></div>
<div class="ex"><ul><li><b>∀<i>x</i> ∈ ℝ, ∃<i>y</i> ∈ ℝ, <i>y</i> &gt; <i>x</i></b> est vraie : à <i>x</i> on répond <i>y</i> = <i>x</i> + 1. Pour <i>x</i> = 7, <i>y</i> = 8 convient.</li><li><b>∃<i>y</i> ∈ ℝ, ∀<i>x</i> ∈ ℝ, <i>y</i> &gt; <i>x</i></b> est fausse : quel que soit le <i>y</i> annoncé, l’adversaire répond <i>x</i> = <i>y</i>, et <i>y</i> &gt; <i>y</i> est faux.</li></ul></div>
<div class="warn"><p>« Tout le monde a une mère » (∀ ∃) est vraie ; « quelqu’un est la mère de tout le monde » (∃ ∀) est fausse. Seul l’ordre a changé.</p></div>`,
   note:'On a toujours : (∃y ∀x, P(x, y)) ⇒ (∀x ∃y, P(x, y)). Si un même y marche pour tous les x, il marche en particulier pour chacun. La réciproque est fausse.'},
  {h:'Deux phrases, deux verdicts',p:`Sur <i>E</i> = {1, …, 5}, une relation <i>R</i>(<i>x</i>, <i>y</i>) est dessinée : un gros point en (<i>x</i> ; <i>y</i>) quand elle est vraie. « ∀<i>x</i> ∃<i>y</i> » demande un point dans <b>chaque colonne</b> ; « ∃<i>y</i> ∀<i>x</i> » demande une <b>ligne entièrement pleine</b> (surlignée). Trouve une relation pour laquelle <b>∀<i>x</i> ∃<i>y</i>, <i>R</i></b> est vraie mais <b>∃<i>y</i> ∀<i>x</i>, <i>R</i></b> est fausse.`,
   params:[{id:'r',l:'Relation',min:0,max:5,v:0}],
   draw:v=>{ const R=[(x,y)=>y>=x,(x,y)=>y===3,(x,y)=>y>x,(x,y)=>x+y===6,(x,y)=>y<x,(x,y)=>y%x===0][v.r];
     return grid(5,5,(x,y)=>R(x,y)?1:0,{nx:'x',ny:'y',h:250,ex:P=>{ for(let y=1;y<=5;y++){ let all=true; for(let x=1;x<=5;x++) if(!R(x,y)) all=false; if(all) P.rect(0.6,y-0.35,4.8,0.7,{fill:'var(--spark)',fo:.3,c:null}); } }}); },
   info:v=>{ const R=[(x,y)=>y>=x,(x,y)=>y===3,(x,y)=>y>x,(x,y)=>x+y===6,(x,y)=>y<x,(x,y)=>y%x===0][v.r], E=[1,2,3,4,5];
     const A=E.every(x=>E.some(y=>R(x,y))), B=E.some(y=>E.every(x=>R(x,y)));
     return `<i>R</i>(<i>x</i>, <i>y</i>) : <b>${['y ≥ x','y = 3','y &gt; x','x + y = 6','y &lt; x','x divise y'][v.r]}</b><br>∀<i>x</i> ∃<i>y</i>, <i>R</i> : ${VF(A)} &nbsp; ∃<i>y</i> ∀<i>x</i>, <i>R</i> : ${VF(B)}`; },
   ok:v=>{ const R=[(x,y)=>y>=x,(x,y)=>y===3,(x,y)=>y>x,(x,y)=>x+y===6,(x,y)=>y<x,(x,y)=>y%x===0][v.r], E=[1,2,3,4,5]; return E.every(x=>E.some(y=>R(x,y)))&&!E.some(y=>E.every(x=>R(x,y))); },
   why:'Avec x + y = 6, chaque x a son partenaire y = 6 − x, mais ce partenaire change avec x : aucune ligne n’est pleine. « x divise y » marche aussi (y = x convient, mais aucun y de 1 à 5 n’est multiple de 1, 2, 3, 4 et 5).'},
  {kind:'Méthode',h:'Condition nécessaire, condition suffisante',
   p:'Quand <i>P</i> ⇒ <i>Q</i> est vraie, on dit que <b><i>P</i> est une condition suffisante pour <i>Q</i></b> (« il suffit que <i>P</i> ») et que <b><i>Q</i> est une condition nécessaire pour <i>P</i></b> (« pour que <i>P</i>, il faut que <i>Q</i> »). Si <i>P</i> ⇔ <i>Q</i>, la condition est <b>nécessaire et suffisante</b> (CNS). <b>Comment trancher :</b><ol><li>écris l’implication vraie sous la forme <i>P</i> ⇒ <i>Q</i> ;</li><li>à gauche le suffisant, à droite le nécessaire ;</li><li>teste la réciproque : si elle est vraie, c’est une CNS ; sinon, un contre-exemple le montre.</li></ol>',
   demo:{enonce:'« Être pair » est-il nécessaire, suffisant, ou les deux, pour qu’un entier soit multiple de 6&nbsp;?',
    etapes:[{f:'Multiple de 6 ⇒ pair, car 6<i>k</i> = 2 · (3<i>k</i>).',w:'On cherche dans quel sens l’implication est vraie.'},
     {f:'« Pair » est à droite : c’est une condition <b>nécessaire</b> pour être multiple de 6.',w:'Pour être multiple de 6, il faut être pair.'},
     {f:'Réciproque : pair ⇒ multiple de 6 ? Non : 4 est pair mais pas multiple de 6.',w:'Un seul contre-exemple suffit à tuer la réciproque.'}],
    conclusion:'« Être pair » est nécessaire mais <b>pas suffisant</b> pour être multiple de 6. À l’inverse, « être multiple de 6 » est suffisant (mais pas nécessaire) pour être pair.'},
   note:'Moyen mnémotechnique : la condition suffisante « pousse » vers la conclusion, la condition nécessaire est ce qu’on « récolte » forcément.'},
  {h:'Il faut ou il suffit ?',p:'Pour un réel <i>x</i>, la condition « <i>x</i>² = 9 » est, pour avoir <i>x</i> = 3, une condition…',
   opts:['nécessaire et suffisante','suffisante mais pas nécessaire','nécessaire mais pas suffisante','ni nécessaire ni suffisante'],ans:2,
   why:'x = 3 ⇒ x² = 9, donc x² = 9 est nécessaire. Mais x = −3 vérifie x² = 9 sans être égal à 3 : elle n’est pas suffisante.'},
  {h:'Une condition suffisante',p:'Pour qu’un quadrilatère soit un losange, il <b>suffit</b> que…',
   opts:['il ait quatre angles droits','ses diagonales se coupent en leur milieu','ses côtés opposés soient parallèles','ce soit un carré'],ans:3,
   why:'Un carré est un losange (quatre côtés égaux), donc « être un carré » suffit. Les trois autres conditions décrivent un rectangle ou un parallélogramme, qui n’a pas forcément quatre côtés égaux.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul><li><b>Proposition</b> : énoncé vrai ou faux. <b>Prédicat</b> <i>P</i>(<i>x</i>) : sa valeur dépend de <i>x</i>.</li><li><b>non</b>, <b>et</b>, <b>ou</b> (inclusif) ; une table de vérité à <i>n</i> lettres a 2<sup><i>n</i></sup> lignes.</li><li><b><i>P</i> ⇒ <i>Q</i></b> n’est fausse que si <i>P</i> est vraie et <i>Q</i> fausse ; elle équivaut à « non <i>P</i> ou <i>Q</i> ».</li><li>La <b>contraposée</b> non <i>Q</i> ⇒ non <i>P</i> équivaut à <i>P</i> ⇒ <i>Q</i> ; la <b>réciproque</b> <i>Q</i> ⇒ <i>P</i>, non. <i>P</i> ⇔ <i>Q</i> demande les deux sens.</li><li><b>Tautologie</b> : formule vraie sur toutes les lignes de sa table.</li><li>Négations : non (<i>P</i> et <i>Q</i>) = non <i>P</i> ou non <i>Q</i> ; non (<i>P</i> ou <i>Q</i>) = non <i>P</i> et non <i>Q</i> ; non (<i>P</i> ⇒ <i>Q</i>) = <i>P</i> et non <i>Q</i>.</li><li>non (∀<i>x</i> ∈ <i>E</i>, <i>P</i>(<i>x</i>)) = ∃<i>x</i> ∈ <i>E</i>, non <i>P</i>(<i>x</i>), et inversement ; on garde les domaines et l’ordre.</li><li>Dans ∀<i>x</i> ∃<i>y</i>, <i>y</i> peut dépendre de <i>x</i> ; dans ∃<i>y</i> ∀<i>x</i>, un même <i>y</i> sert pour tous. La seconde entraîne la première.</li><li>Si <i>P</i> ⇒ <i>Q</i> : <i>P</i> est <b>suffisante</b> pour <i>Q</i>, <i>Q</i> est <b>nécessaire</b> pour <i>P</i> ; condition nécessaire et suffisante si <i>P</i> ⇔ <i>Q</i>.</li></ul></div>`},
  {kind:'Problème',h:'La transitivité de l’implication',
   p:'On veut prouver que la formule <i>T</i> : [(<i>P</i> ⇒ <i>Q</i>) et (<i>Q</i> ⇒ <i>R</i>)] ⇒ (<i>P</i> ⇒ <i>R</i>) est une tautologie. C’est elle qui autorise à enchaîner les implications dans une démonstration. Plutôt que d’écrire toute la table, on utilise qu’une implication n’est fausse que si son hypothèse est vraie et sa conclusion fausse. On examine donc seulement les lignes où la conclusion <i>P</i> ⇒ <i>R</i> est fausse.',
   parts:[
    {q:'a) Combien de lignes compte la table de vérité complète de <i>T</i>&nbsp;?',lab:'lignes :',ans:8,hint:'Chacune des lettres P, Q, R prend deux valeurs.',why:'Trois lettres : 2³ = 8 lignes.'},
    {q:'b) Sur combien de ces lignes la conclusion <i>P</i> ⇒ <i>R</i> est-elle fausse&nbsp;?',lab:'lignes :',ans:2,hint:'P ⇒ R est fausse seulement si P est V et R est F. Q, lui, est libre.',why:'Il faut P = V et R = F ; Q peut valoir V ou F : 2 lignes.'},
    {q:'c) Sur ces lignes, que vaut l’hypothèse (<i>P</i> ⇒ <i>Q</i>) et (<i>Q</i> ⇒ <i>R</i>)&nbsp;?',opts:['Elle est toujours vraie, puisque P est vraie','Elle est vraie quand Q est vraie','Elle est toujours fausse : si Q est V, Q ⇒ R est fausse ; si Q est F, P ⇒ Q est fausse','On ne peut pas savoir sans connaître R'],ans:2,hint:'Fais deux cas selon la valeur de Q, avec P = V et R = F.',why:'Q = V : Q ⇒ R = V ⇒ F est fausse. Q = F : P ⇒ Q = V ⇒ F est fausse. Dans les deux cas le « et » est faux.'},
    {q:'d) Que peut-on conclure&nbsp;?',opts:['T est fausse sur 2 lignes','T est vraie seulement quand P est vraie','T est équivalente à P ⇒ R','T est une tautologie : on n’a jamais « hypothèse vraie et conclusion fausse »'],ans:3,hint:'Une implication fausse exige une hypothèse vraie et une conclusion fausse. Ce cas se produit-il ?',why:'Sur les seules lignes où la conclusion est fausse, l’hypothèse l’est aussi : T est vraie sur les 8 lignes.'},
   ],
   sol:'T est une implication ; elle ne peut être fausse que sur une ligne où sa conclusion P ⇒ R est fausse, c’est-à-dire P = V et R = F (2 lignes sur 8, selon Q). Si Q = V, alors Q ⇒ R est fausse ; si Q = F, alors P ⇒ Q est fausse. Sur ces deux lignes, l’hypothèse (P ⇒ Q) et (Q ⇒ R) est donc fausse, et T est vraie. Sur les 6 autres lignes, la conclusion est vraie, donc T aussi. T est une tautologie : <b>si P entraîne Q et Q entraîne R, alors P entraîne R</b>. C’est la transitivité de l’implication, qui justifie les chaînes de déductions.'},
  {kind:'Problème',h:'Une suite qui n’est pas majorée',
   p:'On pose <i>u<sub>n</sub></i> = 2<i>n</i> + 1 pour tout <i>n</i> ∈ ℕ. Dire que la suite est <b>majorée</b>, c’est dire : ∃<i>M</i> ∈ ℝ, ∀<i>n</i> ∈ ℕ, <i>u<sub>n</sub></i> ≤ <i>M</i>. On veut prouver qu’elle ne l’est pas, en écrivant soigneusement la négation, puis en comparant avec la phrase où les quantificateurs sont échangés.',
   parts:[
    {q:'a) Quelle est la négation de « ∃<i>M</i> ∈ ℝ, ∀<i>n</i> ∈ ℕ, <i>u<sub>n</sub></i> ≤ <i>M</i> »&nbsp;?',opts:['∃<i>M</i> ∈ ℝ, ∀<i>n</i> ∈ ℕ, <i>u<sub>n</sub></i> &gt; <i>M</i>','∀<i>M</i> ∈ ℝ, ∀<i>n</i> ∈ ℕ, <i>u<sub>n</sub></i> &gt; <i>M</i>','∀<i>M</i> ∈ ℝ, ∃<i>n</i> ∈ ℕ, <i>u<sub>n</sub></i> &gt; <i>M</i>','∃<i>M</i> ∈ ℝ, ∃<i>n</i> ∈ ℕ, <i>u<sub>n</sub></i> &gt; <i>M</i>'],ans:2,hint:'Échange chaque quantificateur dans l’ordre et nie l’inégalité finale.',why:'∃M devient ∀M, ∀n devient ∃n, et « ≤ » devient « > ».'},
    {q:'b) Pour <i>M</i> = 50, quel est le plus petit entier <i>n</i> tel que <i>u<sub>n</sub></i> &gt; 50&nbsp;?',lab:'n =',ans:25,hint:'Résous 2n + 1 > 50.',why:'2n + 1 > 50 ⇔ n > 24,5. Le plus petit entier est n = 25 (u₂₅ = 51, alors que u₂₄ = 49).'},
    {q:'c) Pour un <i>M</i> réel quelconque, quel argument prouve la négation&nbsp;?',opts:['On prend n = 25, qui marche pour M = 50','On prend n = M, car 2M + 1 > M','Il n’y en a pas : la suite est majorée','On prend un entier n > (M − 1)/2 (il en existe toujours) : alors 2n + 1 > M'],ans:3,hint:'n doit être fourni après M et peut dépendre de M ; il doit aussi être un entier naturel.',why:'Pour tout M, un entier n > (M − 1)/2 existe et donne u_n = 2n + 1 > M. « n = M » ne va pas quand M n’est pas un entier naturel, et n = 25 ne marche que pour M < 51.'},
    {q:'d) Et la phrase « ∀<i>n</i> ∈ ℕ, ∃<i>M</i> ∈ ℝ, <i>u<sub>n</sub></i> ≤ <i>M</i> »&nbsp;?',opts:['Elle est fausse, comme la majoration','Elle est vraie, et même pour toute suite : il suffit de prendre M = u_n','Elle est vraie seulement pour les suites majorées','Ce n’est pas une proposition'],ans:1,hint:'Ici M est choisi après n : il peut dépendre de n.',why:'Pour chaque n, M = u_n convient. Échanger ∃M et ∀n change complètement le sens : la phrase ne dit plus rien sur la suite.'},
   ],
   sol:'La suite est majorée si ∃M ∈ ℝ, ∀n ∈ ℕ, u_n ≤ M. La négation est <b>∀M ∈ ℝ, ∃n ∈ ℕ, u_n &gt; M</b>. Soit M réel quelconque. Il existe un entier naturel n &gt; (M − 1)/2, et alors u_n = 2n + 1 &gt; M (pour M = 50, n = 25 donne 51). La négation est prouvée : (u_n) n’est pas majorée. En revanche, « ∀n, ∃M, u_n ≤ M » est vraie pour n’importe quelle suite (M = u_n) : dans « ∃M ∀n », M ne doit pas dépendre de n, et c’est toute la différence.'},
]},
/* ===================== 2. MÉTHODES DE DÉMONSTRATION ===================== */
{subj:'gred',sem:'ens',id:'gred-demo',h:'Méthodes de démonstration',p:'Preuve directe, contraposée, absurde, disjonction de cas, récurrence, contre-exemple, existence, double implication : la boîte à outils pour démontrer.',steps:[
  {h:'Démontrer, c’est enchaîner',p:`<p>Comment être sûr qu’une propriété vaut pour <b>tous</b> les entiers, alors qu’on ne peut en tester qu’un nombre fini ? En la <b>démontrant</b> : on montre qu’elle découle de règles admises, sans exception possible.</p>
<div class="def"><p>Une <b>démonstration</b> de <i>P</i> ⇒ <i>Q</i> est une suite d’affirmations <i>P</i> = <i>A</i>₀ ⇒ <i>A</i>₁ ⇒ … ⇒ <i>A<sub>k</sub></i> = <i>Q</i> où chaque implication est justifiée par une <b>définition</b>, une règle de calcul ou un résultat déjà prouvé.</p></div>
<div class="why"><p>La transitivité de l’implication (vue au chapitre précédent) dit que de <i>A</i>₀ ⇒ <i>A</i>₁ et <i>A</i>₁ ⇒ <i>A</i>₂ on tire <i>A</i>₀ ⇒ <i>A</i>₂. En la répétant, toute la chaîne donne <i>P</i> ⇒ <i>Q</i>. Un seul maillon faux, et la preuve ne vaut plus rien.</p></div>
<div class="ex"><p>Montrons « si <i>x</i> &gt; 2, alors <i>x</i>² &gt; 4 » pour un réel <i>x</i>. Supposons <i>x</i> &gt; 2. Alors <i>x</i> &gt; 0, et en multipliant l’inégalité <i>x</i> &gt; 2 par le nombre positif <i>x</i>, on obtient <i>x</i>² &gt; 2<i>x</i>. Or 2<i>x</i> &gt; 4, puisque <i>x</i> &gt; 2. Donc <i>x</i>² &gt; 2<i>x</i> &gt; 4. Trois maillons, chacun justifié.</p></div>
<div class="warn"><p>Une preuve commence par « supposons <i>P</i> » ou « soit <i>x</i> un réel quelconque ». Le mot « quelconque » est essentiel : on n’a rien supposé de plus sur <i>x</i>, donc l’argument vaut pour tous les <i>x</i>.</p></div>`,
   note:'Vérifier une propriété sur 10, 100 ou un million d’exemples ne <b>prouve pas</b> un « pour tout ». Le chapitre montre pourquoi avec n² + n + 41.'},
  {h:'Pair et impair : des définitions qui servent',p:`<p>Pour démontrer « la somme de deux pairs est paire », il faut savoir ce que « pair » veut dire, sous une forme avec laquelle on peut <b>calculer</b>. Une bonne définition se traduit par une égalité.</p>
<div class="def"><p>Un entier <i>n</i> est <b>pair</b> s’il existe un entier <i>k</i> tel que <i>n</i> = 2<i>k</i>. Il est <b>impair</b> s’il existe un entier <i>k</i> tel que <i>n</i> = 2<i>k</i> + 1.</p></div>
<div class="idea"><p>« Pair » devient une écriture. Dès qu’on sait que <i>n</i> est pair, on a le droit d’écrire <i>n</i> = 2<i>k</i> et de calculer avec <i>k</i>. À l’inverse, pour conclure qu’un nombre est pair, on doit <b>fabriquer</b> l’écriture 2 × (un entier).</p></div>
<div class="prop"><p>Tout entier est pair ou impair, et jamais les deux.</p></div>
<div class="why"><p>La division de <i>n</i> par 2 laisse un reste 0 ou 1, ce qui donne <i>n</i> = 2<i>k</i> ou <i>n</i> = 2<i>k</i> + 1. Si l’on avait à la fois <i>n</i> = 2<i>k</i> et <i>n</i> = 2<i>m</i> + 1, on aurait 2(<i>k</i> − <i>m</i>) = 1 : impossible, car un multiple de 2 vaut 0 ou au moins 2 en valeur absolue.</p></div>
<div class="ex"><p>−7 = 2 · (−4) + 1 est impair, avec <i>k</i> = −4. 0 = 2 · 0 est pair. Et pour tout entier <i>a</i>, 2<i>a</i> + 6 = 2(<i>a</i> + 3) est pair, car <i>a</i> + 3 est un entier.</p></div>`},
  {kind:'Méthode',h:'La preuve directe',
   p:'<b>Quand :</b> on doit prouver <i>P</i> ⇒ <i>Q</i> et l’hypothèse <i>P</i> donne une prise concrète (une écriture, une égalité). <b>Comment :</b><ol><li>« Supposons <i>P</i> » : on traduit l’hypothèse avec les définitions ;</li><li>on calcule ou on raisonne ;</li><li>on fait apparaître exactement la forme exigée par la définition de <i>Q</i>.</li></ol><b>Pourquoi ça marche :</b> une implication n’est fausse que si <i>P</i> est vraie et <i>Q</i> fausse. En montrant que <i>P</i> force <i>Q</i>, on exclut ce seul cas.',
   demo:{enonce:'Démontre : si <i>n</i> est impair, alors <i>n</i>² est impair.',
    etapes:[{f:'Supposons <i>n</i> impair : il existe un entier <i>k</i> tel que <i>n</i> = 2<i>k</i> + 1.',w:'On traduit l’hypothèse avec la définition de « impair ».'},
     {f:'<i>n</i>² = (2<i>k</i> + 1)² = 4<i>k</i>² + 4<i>k</i> + 1.',w:'On calcule à partir de l’écriture obtenue.'},
     {f:'<i>n</i>² = 2(2<i>k</i>² + 2<i>k</i>) + 1, avec <i>q</i> = 2<i>k</i>² + 2<i>k</i> entier.',w:'On vise la forme « 2 × entier + 1 » exigée par la définition.'}],
    conclusion:'<i>n</i>² = 2<i>q</i> + 1 avec <i>q</i> entier : <b><i>n</i>² est impair</b>.'}},
  {h:'Preuve guidée : somme de deux pairs',p:'On démontre « si <i>a</i> et <i>b</i> sont pairs, alors <i>a</i> + <i>b</i> est pair ». On a écrit : <i>a</i> = 2<i>k</i> et <i>b</i> = 2<i>m</i> avec <i>k</i>, <i>m</i> entiers. Quelle est la bonne étape suivante&nbsp;?',
   opts:['<i>a</i> + <i>b</i> = 2<i>k</i> + 2<i>k</i> = 4<i>k</i>, qui est pair','Par exemple 2 + 4 = 6 est pair, donc c’est vrai','<i>a</i> + <i>b</i> = 2(<i>k</i> + <i>m</i>), et <i>k</i> + <i>m</i> est un entier','<i>a</i> + <i>b</i> est pair, car <i>a</i> et <i>b</i> sont pairs'],ans:2,
   why:'On factorise par 2 et on vérifie que le facteur est entier : c’est la définition de « pair ». Utiliser la même lettre k pour a et b supposerait a = b ; un exemple ne prouve rien ; et la dernière option répète la conclusion sans la justifier.'},
  {h:'Le q de la preuve',p:'Dans la preuve « <i>n</i> impair ⇒ <i>n</i>² impair », on a obtenu <i>n</i>² = 2<i>q</i> + 1 avec <i>q</i> = 2<i>k</i>² + 2<i>k</i>. Que vaut <i>q</i> pour <i>n</i> = 15&nbsp;?',lab:'q =',ans:112,
   why:'15 = 2 · 7 + 1, donc k = 7 et q = 2 · 49 + 14 = 112. Contrôle : 15² = 225 = 2 · 112 + 1.'},
  {kind:'Méthode',h:'La preuve par contraposée',
   p:'<b>Quand :</b> l’hypothèse <i>P</i> est difficile à exploiter, mais sa négation donne une écriture commode. Typiquement : « si <i>n</i>² est pair, alors <i>n</i> est pair », où « <i>n</i>² = 2<i>k</i> » ne dit rien d’utile sur <i>n</i>. <b>Pourquoi ça marche :</b> <i>P</i> ⇒ <i>Q</i> et non <i>Q</i> ⇒ non <i>P</i> ont la même table de vérité. <b>Comment :</b> on annonce « par contraposée », on suppose non <i>Q</i>, et on démontre non <i>P</i> par une preuve directe.',
   demo:{enonce:'Démontre : si <i>n</i>² est pair, alors <i>n</i> est pair.',
    etapes:[{f:'Contraposée : si <i>n</i> n’est pas pair, alors <i>n</i>² n’est pas pair, c’est-à-dire : si <i>n</i> est impair, alors <i>n</i>² est impair.',w:'On nie la conclusion et l’hypothèse, et on échange leurs places. « Non pair » = « impair ».'},
     {f:'C’est exactement ce qu’on a prouvé dans la méthode précédente : <i>n</i> = 2<i>k</i> + 1 donne <i>n</i>² = 2(2<i>k</i>² + 2<i>k</i>) + 1.',w:'La contraposée se prouve directement.'},
     {f:'La contraposée est vraie, donc l’implication de départ aussi.',w:'Une implication et sa contraposée sont équivalentes.'}],
    conclusion:'<b>Si <i>n</i>² est pair, alors <i>n</i> est pair.</b> Ce résultat servira tout de suite pour prouver que √2 est irrationnel.'},
   note:'Ne confonds pas avec la réciproque Q ⇒ P, qui n’est pas équivalente à P ⇒ Q.'},
  {h:'Écrire la contraposée',p:'Quelle est la contraposée de « si <i>a</i> · <i>b</i> est impair, alors <i>a</i> est impair »&nbsp;?',
   opts:['Si <i>a</i> est impair, alors <i>a</i> · <i>b</i> est impair','Si <i>a</i> est pair, alors <i>a</i> · <i>b</i> est pair','Si <i>a</i> · <i>b</i> est pair, alors <i>a</i> est pair','<i>a</i> · <i>b</i> est impair et <i>a</i> est pair'],ans:1,
   why:'La contraposée de P ⇒ Q est non Q ⇒ non P : « si a n’est pas impair (a pair), alors ab n’est pas impair (ab pair) ». Elle se prouve d’un coup : a = 2k donne ab = 2(kb).'},
  {h:'Rationnels et irrationnels',p:`<p>Les preuves par l’absurde les plus célèbres montrent qu’un nombre n’est <b>pas</b> une fraction. Il faut donc une définition précise de « être une fraction ».</p>
<div class="def"><p>Un réel <i>x</i> est <b>rationnel</b> s’il existe des entiers <i>p</i> et <i>q</i>, avec <i>q</i> ≠ 0, tels que <i>x</i> = <i>p</i>/<i>q</i>. On note ℚ l’ensemble des rationnels. Un réel qui n’est pas rationnel est <b>irrationnel</b>.</p></div>
<div class="prop"><p>Tout rationnel s’écrit sous forme <b>irréductible</b> <i>p</i>/<i>q</i> : <i>q</i> &gt; 0, et <i>p</i>, <i>q</i> n’ont aucun diviseur commun autre que 1 et −1.</p></div>
<div class="why"><p>On part d’une écriture <i>p</i>/<i>q</i> quelconque. On rend <i>q</i> positif en changeant les deux signes si besoin, puis on divise <i>p</i> et <i>q</i> par leur plus grand diviseur commun. La valeur de la fraction ne change pas.</p></div>
<div class="ex"><p>0,75 = 75/100 = 3/4, après division par 25. (−6)/(−8) = 6/8 = 3/4 aussi. Les entiers sont rationnels : 5 = 5/1.</p></div>
<div class="idea"><p>« Irrationnel » est une négation : il <b>n’existe pas</b> d’entiers <i>p</i>, <i>q</i> tels que <i>x</i> = <i>p</i>/<i>q</i>. On ne peut pas essayer toutes les fractions une par une. D’où l’absurde : on suppose qu’une écriture irréductible existe, puis on aboutit à une contradiction, par exemple <i>p</i> et <i>q</i> tous deux multiples de 3.</p></div>`},
  {kind:'Méthode',h:'Le raisonnement par l’absurde',
   p:'<b>Quand :</b> la conclusion est une impossibilité (« n’est pas rationnel », « il n’existe pas »…), difficile à attaquer de face. <b>Comment :</b> on suppose le <b>contraire</b> de ce qu’on veut prouver et on déroule des déductions correctes jusqu’à une <b>contradiction</b> (une proposition et sa négation). <b>Pourquoi ça marche :</b> des déductions correctes à partir d’une hypothèse vraie ne mènent jamais au faux ; si on aboutit au faux, l’hypothèse était fausse.',
   demo:{enonce:'Démontre que √2 est irrationnel.',
    etapes:[{f:'Par l’absurde, supposons √2 = <i>p</i>/<i>q</i> avec <i>p</i>, <i>q</i> entiers, <i>q</i> ≠ 0 et la fraction <b>irréductible</b>.',w:'On suppose la négation. On peut toujours simplifier une fraction jusqu’à ce qu’elle soit irréductible.'},
     {f:'En élevant au carré : <i>p</i>² = 2<i>q</i>². Donc <i>p</i>² est pair, donc <i>p</i> est pair.',w:'On utilise « n² pair ⇒ n pair », prouvé par contraposée.'},
     {f:'Écrivons <i>p</i> = 2<i>r</i> : 4<i>r</i>² = 2<i>q</i>², soit <i>q</i>² = 2<i>r</i>². Donc <i>q</i>² est pair, donc <i>q</i> est pair.',w:'On réinjecte et on réutilise le même résultat.'},
     {f:'<i>p</i> et <i>q</i> sont tous deux pairs : la fraction se simplifie par 2. Contradiction avec « irréductible ».',w:'On a obtenu une proposition et sa négation.'}],
    conclusion:'L’hypothèse « √2 est rationnel » est fausse : <b>√2 est irrationnel</b>.'}},
  {h:'Preuve guidée : √3',p:'Pour prouver que √3 est irrationnel, on suppose √3 = <i>p</i>/<i>q</i> irréductible, et on obtient <i>p</i>² = 3<i>q</i>². Quelle est la bonne étape suivante&nbsp;?',
   opts:['<i>p</i>² est pair, donc <i>p</i> est pair','<i>p</i> est multiple de 3 : sinon <i>p</i> = 3<i>k</i> + 1 ou 3<i>k</i> + 2, et <i>p</i>² = 3(3<i>k</i>² + 2<i>k</i>) + 1 ou 3(3<i>k</i>² + 4<i>k</i> + 1) + 1 ne l’est pas','Donc <i>p</i> = 3 et <i>q</i> = 1','<i>q</i> est multiple de 3, car <i>q</i>² = <i>p</i>²/3'],ans:1,
   why:'Le rôle de « 2 » est joué par 3 : il faut « p² multiple de 3 ⇒ p multiple de 3 », prouvé par contraposée en examinant les restes 1 et 2. Ensuite p = 3r donne q² = 3r², donc q aussi est multiple de 3 : contradiction. Rien ne dit que p² est pair.'},
  {kind:'Méthode',h:'La disjonction de cas',
   p:'<b>Quand :</b> l’objet peut se trouver dans un nombre fini de situations, et chacune se traite facilement : <i>n</i> pair ou impair ; <i>n</i> = 3<i>k</i>, 3<i>k</i> + 1 ou 3<i>k</i> + 2 ; <i>x</i> ≥ 0 ou <i>x</i> &lt; 0. <b>Pourquoi ça marche :</b> si <i>A</i> ou <i>B</i> est vraie, et si <i>A</i> ⇒ <i>Q</i> et <i>B</i> ⇒ <i>Q</i>, alors <i>Q</i> est vraie. <b>Comment :</b> vérifie que les cas <b>couvrent tout</b>, puis traite-les un par un.',
   demo:{enonce:'Démontre que pour tout entier <i>n</i>, <i>n</i>² + <i>n</i> est pair. Puis classe <i>n</i>² selon le reste modulo 3.',
    etapes:[{f:'Cas <i>n</i> = 2<i>k</i> : <i>n</i>² + <i>n</i> = 4<i>k</i>² + 2<i>k</i> = 2(2<i>k</i>² + <i>k</i>), pair.',w:'Tout entier est pair ou impair : deux cas qui couvrent tout.'},
     {f:'Cas <i>n</i> = 2<i>k</i> + 1 : <i>n</i>² + <i>n</i> = (2<i>k</i> + 1)(2<i>k</i> + 2) = 2(2<i>k</i> + 1)(<i>k</i> + 1), pair.',w:'On factorise n² + n = n(n + 1).'},
     {f:'Modulo 3 : <i>n</i> = 3<i>k</i> donne <i>n</i>² = 3(3<i>k</i>²) ; <i>n</i> = 3<i>k</i> + 1 donne <i>n</i>² = 3(3<i>k</i>² + 2<i>k</i>) + 1 ; <i>n</i> = 3<i>k</i> + 2 donne <i>n</i>² = 3(3<i>k</i>² + 4<i>k</i> + 1) + 1.',w:'Trois restes possibles, donc trois cas.'}],
    conclusion:'<i>n</i>² + <i>n</i> est toujours pair, et un carré s’écrit toujours <b>3<i>q</i></b> ou <b>3<i>q</i> + 1</b>, jamais 3<i>q</i> + 2.'}},
  {h:'Choisir les cas',p:'On veut démontrer que <i>n</i>³ − <i>n</i> est multiple de 3 pour tout entier <i>n</i>. Quels cas faut-il traiter&nbsp;?',
   opts:['<i>n</i> pair et <i>n</i> impair','<i>n</i> = 3<i>k</i>, <i>n</i> = 3<i>k</i> + 1 et <i>n</i> = 3<i>k</i> + 2','<i>n</i> = 0, <i>n</i> = 1 et <i>n</i> = 2 seulement','<i>n</i> = 3<i>k</i> seulement'],ans:1,
   why:'Pour une question de divisibilité par 3, on découpe selon le reste de la division par 3. Les trois cas couvrent tous les entiers ; n³ − n = (n − 1)n(n + 1) contient alors toujours un facteur multiple de 3.'},
  {h:'Un carré modulo 3',p:'D’après la méthode, si <i>n</i> = 3<i>k</i> + 2, alors <i>n</i>² = 3<i>q</i> + 1 avec <i>q</i> = 3<i>k</i>² + 4<i>k</i> + 1. Que vaut <i>q</i> pour <i>n</i> = 11&nbsp;?',lab:'q =',ans:40,
   why:'11 = 3 · 3 + 2, donc k = 3 et q = 27 + 12 + 1 = 40. Contrôle : 121 = 3 · 40 + 1.'},
  {kind:'Méthode',h:'La récurrence',
   p:'<b>Quand :</b> on doit prouver une propriété <i>P</i>(<i>n</i>) pour tous les entiers <i>n</i> ≥ <i>n</i>₀, et <i>P</i>(<i>n</i> + 1) se relie à <i>P</i>(<i>n</i>). <b>Comment :</b><ol><li><b>Initialisation</b> : on vérifie <i>P</i>(<i>n</i>₀) ;</li><li><b>Hérédité</b> : on suppose <i>P</i>(<i>n</i>) vraie pour un <i>n</i> ≥ <i>n</i>₀ quelconque et on en déduit <i>P</i>(<i>n</i> + 1) ;</li><li>on conclut : <i>P</i>(<i>n</i>) est vraie pour tout <i>n</i> ≥ <i>n</i>₀.</li></ol><b>Pourquoi ça marche :</b> c’est l’effet domino. <i>P</i>(<i>n</i>₀) est vraie, donc <i>P</i>(<i>n</i>₀ + 1), donc <i>P</i>(<i>n</i>₀ + 2), et ainsi de suite sans fin.',
   demo:{enonce:'Démontre que 1 + 3 + 5 + … + (2<i>n</i> − 1) = <i>n</i>² pour tout <i>n</i> ≥ 1.',
    etapes:[{f:'<i>P</i>(<i>n</i>) : « 1 + 3 + … + (2<i>n</i> − 1) = <i>n</i>² ». Initialisation : pour <i>n</i> = 1, la somme vaut 1 = 1².',w:'On nomme la propriété et on la vérifie au premier rang.'},
     {f:'Hérédité : supposons <i>P</i>(<i>n</i>) pour un <i>n</i> ≥ 1. La somme jusqu’au rang <i>n</i> + 1 ajoute le terme 2(<i>n</i> + 1) − 1 = 2<i>n</i> + 1.',w:'On écrit la somme suivante à l’aide de la précédente.'},
     {f:'Elle vaut donc <i>n</i>² + 2<i>n</i> + 1 = (<i>n</i> + 1)² : c’est <i>P</i>(<i>n</i> + 1).',w:'On utilise l’hypothèse de récurrence, puis une identité remarquable.'}],
    conclusion:'Par récurrence, <b>la somme des <i>n</i> premiers impairs vaut <i>n</i>²</b>. La figure suivante en montre l’idée.'}},
  {h:'Voir la récurrence',p:`<p>La récurrence est plus facile à croire quand on la voit. Prenons <i>P</i>(<i>n</i>) : « 1 + 3 + 5 + … + (2<i>n</i> − 1) = <i>n</i>² », la somme des <i>n</i> premiers nombres impairs.</p>
<div class="idea"><p>Chaque nombre impair est une <b>équerre</b> de petits carrés posée contre le carré précédent. L’équerre numéro <i>k</i> a <i>k</i> carrés sur un côté et <i>k</i> sur l’autre, moins le coin compté deux fois : 2<i>k</i> − 1 carrés. Elle transforme un carré de côté <i>k</i> − 1 en un carré de côté <i>k</i>.</p></div>
<div class="why"><p>C’est l’hérédité, écrite en calcul. Si 1 + 3 + … + (2<i>n</i> − 1) = <i>n</i>², alors en ajoutant l’impair suivant, 2<i>n</i> + 1, on obtient <i>n</i>² + 2<i>n</i> + 1 = (<i>n</i> + 1)², c’est-à-dire <i>P</i>(<i>n</i> + 1). L’initialisation est le tout premier petit carré : 1 = 1².</p></div>
<div class="ex"><p>Pour <i>n</i> = 3 : 1 + 3 + 5 = 9 = 3². L’équerre suivante a 2 · 4 − 1 = 7 carrés, et 9 + 7 = 16 = 4². Avance le curseur : chaque nouvelle équerre (en couleur foncée) complète exactement le carré suivant.</p></div>`,
   params:[{id:'n',l:'n',min:1,max:8,v:3}],
   draw:v=>{ const P=plane({x:[-2.5,10.7],y:[-0.2,8.2],grid:false,axes:false});
     for(let i=0;i<v.n;i++) for(let j=0;j<v.n;j++){ const L=Math.max(i,j); P.rect(i,j,1,1,{fill:L%2?'var(--spark)':'var(--accent)',fo:L===v.n-1?.85:.45,c:'var(--surface)',w:1.5}); }
     P.text(v.n+0.3,v.n-0.5,`+ ${2*v.n-1}`,{c:'var(--ink)'}); return P.svg(); },
   info:v=>`${Array.from({length:v.n},(_,k)=>2*k+1).join(' + ')} = <b>${v.n*v.n}</b> = ${v.n}²`,
   note:'Les deux étapes sont indispensables : sans initialisation, les dominos ne commencent jamais à tomber.'},
  {h:'Preuve guidée : l’hérédité',p:'On prouve <i>S<sub>n</sub></i> = 1 + 2 + … + <i>n</i> = <i>n</i>(<i>n</i> + 1)/2 par récurrence. On suppose la formule vraie au rang <i>n</i>. Quelle rédaction de l’hérédité est correcte&nbsp;?',
   opts:['<i>S</i><sub><i>n</i>+1</sub> = (<i>n</i> + 1)(<i>n</i> + 2)/2, car on remplace <i>n</i> par <i>n</i> + 1 dans la formule','<i>S</i><sub><i>n</i>+1</sub> = <i>S<sub>n</sub></i> · (<i>n</i> + 1) = <i>n</i>(<i>n</i> + 1)²/2','<i>S</i><sub><i>n</i>+1</sub> = <i>S<sub>n</sub></i> + <i>n</i> = <i>n</i>(<i>n</i> + 1)/2 + <i>n</i>','<i>S</i><sub><i>n</i>+1</sub> = <i>S<sub>n</sub></i> + (<i>n</i> + 1) = <i>n</i>(<i>n</i> + 1)/2 + (<i>n</i> + 1) = (<i>n</i> + 1)(<i>n</i> + 2)/2'],ans:3,
   why:'On ajoute le terme suivant, n + 1, puis on factorise par (n + 1) : (n + 1)(n/2 + 1) = (n + 1)(n + 2)/2. La première option suppose ce qu’on veut démontrer ; les deux autres ajoutent le mauvais terme.'},
  {h:'Somme d’impairs',p:'Combien vaut 1 + 3 + 5 + … + 99&nbsp;?',lab:'somme =',ans:2500,
   why:'99 = 2 · 50 − 1 : c’est la somme des 50 premiers impairs, donc 50² = 2500.'},
  {h:'L’initialisation oubliée',p:'Soit <i>P</i>(<i>n</i>) : « 10<sup><i>n</i></sup> + 1 est multiple de 9 ». On remarque que 10<sup><i>n</i>+1</sup> + 1 = 10(10<sup><i>n</i></sup> + 1) − 9, donc <i>P</i>(<i>n</i>) ⇒ <i>P</i>(<i>n</i> + 1). Que conclure&nbsp;?',
   opts:['<i>P</i>(<i>n</i>) est vraie pour tout <i>n</i>','<i>P</i>(<i>n</i>) est vraie à partir d’un certain rang','L’hérédité est fausse','On ne peut rien conclure : <i>P</i>(0) est fausse (2 n’est pas multiple de 9), et en fait <i>P</i>(<i>n</i>) n’est jamais vraie'],ans:3,
   why:'L’hérédité est juste, mais aucun domino ne tombe : 10ⁿ + 1 a toujours pour reste 2 dans la division par 9 (10ⁿ a le reste 1). Sans initialisation, la récurrence ne prouve rien.'},
  {kind:'Méthode',h:'Réfuter un « pour tout », prouver un « il existe »',
   p:'<b>Réfuter</b> ∀<i>x</i>, <i>P</i>(<i>x</i>) : sa négation est ∃<i>x</i>, non <i>P</i>(<i>x</i>). Il suffit donc d’un <b>contre-exemple</b> : un seul <i>x</i> précis pour lequel <i>P</i>(<i>x</i>) est fausse, vérifié par le calcul.<br><b>Prouver</b> ∃<i>x</i>, <i>P</i>(<i>x</i>) : le plus simple est d’<b>exhiber</b> un <i>x</i> et de vérifier <i>P</i>(<i>x</i>). C’est une preuve d’existence constructive.<br>Attention à l’asymétrie : un exemple prouve un ∃ mais jamais un ∀, et un contre-exemple réfute un ∀.',
   demo:{enonce:'a) Réfute : « pour tout <i>n</i> ∈ ℕ, <i>n</i>² + <i>n</i> + 41 est premier ». b) Prouve : « il existe <i>n</i> ∈ ℕ tel que <i>n</i>² + 1 soit multiple de 5 ».',
    etapes:[{f:'a) Les valeurs pour <i>n</i> = 0, 1, 2, … sont 41, 43, 47, 53, 61… toutes premières jusqu’à <i>n</i> = 39.',w:'Les exemples donnent l’illusion d’une loi générale.'},
     {f:'Pour <i>n</i> = 40 : 40² + 40 + 41 = 40 · 41 + 41 = 41 · 41 = 1681, qui n’est pas premier.',w:'On cherche un n qui fait apparaître un facteur commun : n = 40 fait sortir 41.'},
     {f:'b) <i>n</i> = 2 : 2² + 1 = 5 = 5 · 1, multiple de 5.',w:'Pour un « il existe », un témoin explicite suffit.'}],
    conclusion:'a) La phrase est fausse, le contre-exemple <i>n</i> = 40 suffit. b) La phrase est vraie, le témoin <i>n</i> = 2 suffit.'}},
  {h:'Chasse au contre-exemple',p:`Pour chaque <i>n</i> de 0 à <i>N</i>, la case est verte si <i>n</i>² + <i>n</i> + 41 est premier et rouge sinon. Avance le curseur jusqu’à tomber sur un <b>contre-exemple</b> à « <i>n</i>² + <i>n</i> + 41 est toujours premier ».`,
   params:[{id:'n',l:'n',min:0,max:45,v:0}],
   draw:v=>{ let s='<svg viewBox="0 0 320 70" width="320" role="img">';
     for(let i=0;i<=45;i++){ const x=6+(i%23)*13.6, y=6+Math.floor(i/23)*30, f=i<=v.n?(isPrime(i*i+i+41)?'var(--ok)':'var(--bad)'):'var(--line)';
       s+=`<rect x="${x}" y="${y}" width="11" height="11" rx="2" fill="${f}" ${i===v.n?'stroke="var(--ink)" stroke-width="2"':''}/>`;
       if(i%5===0) s+=`<text x="${x+5.5}" y="${y+23}" font-size="8" text-anchor="middle" fill="var(--muted)">${i}</text>`; }
     return s+'</svg>'; },
   info:v=>{ const m=v.n*v.n+v.n+41, d=small(m); return `<i>n</i> = ${v.n} : <i>n</i>² + <i>n</i> + 41 = ${m} ${d===m?'est premier':`= ${d} · ${m/d} <b>n’est pas premier</b>`}`; },
   ok:v=>!isPrime(v.n*v.n+v.n+41),
   why:'Pour n = 40, on obtient 1681 = 41². C’est le premier contre-exemple : 40 valeurs vérifiées ne prouvaient rien. (n = 41 donne 41 · 43 et n = 44 donne 2021 = 43 · 47.)'},
  {h:'Que réfute ce contre-exemple ?',p:'Le couple <i>a</i> = −3, <i>b</i> = 2 est un contre-exemple à l’une de ces affirmations sur les réels. Laquelle&nbsp;?',
   opts:['∀<i>a</i>, <i>b</i>, <i>a</i> &lt; <i>b</i> ⇒ <i>a</i> + 1 &lt; <i>b</i> + 1','∀<i>a</i>, <i>b</i>, <i>a</i> &lt; <i>b</i> ⇒ <i>a</i>³ &lt; <i>b</i>³','∀<i>a</i>, <i>b</i>, <i>a</i> &lt; <i>b</i> ⇒ <i>a</i>² &lt; <i>b</i>²','∀<i>a</i>, <i>b</i>, <i>a</i> &lt; <i>b</i> ⇒ −<i>a</i> &gt; −<i>b</i>'],ans:2,
   why:'−3 < 2 mais (−3)² = 9 n’est pas inférieur à 2² = 4 : l’hypothèse est vraie et la conclusion fausse. Pour les trois autres, −3 < 2 entraîne bien −2 < 3, −27 < 8 et 3 > −2.'},
  {kind:'Méthode',h:'Équivalence et égalité : prouver les deux sens',
   p:'<b>Quand :</b> on doit prouver <i>P</i> ⇔ <i>Q</i>, ou une égalité d’ensembles <i>A</i> = <i>B</i>. <b>Pourquoi :</b> <i>P</i> ⇔ <i>Q</i> veut dire (<i>P</i> ⇒ <i>Q</i>) et (<i>Q</i> ⇒ <i>P</i>) ; de même <i>A</i> = <i>B</i> veut dire <i>A</i> ⊂ <i>B</i> et <i>B</i> ⊂ <i>A</i> (<b>double inclusion</b>). <b>Comment :</b> deux preuves séparées, chacune avec la méthode qui lui convient (directe, contraposée…). Pour <i>A</i> ⊂ <i>B</i> : « soit <i>x</i> ∈ <i>A</i> », puis on montre <i>x</i> ∈ <i>B</i>.',
   demo:{enonce:'Soit <i>A</i> = {2<i>k</i> + 1 : <i>k</i> ∈ ℤ} et <i>B</i> = {2<i>m</i> − 1 : <i>m</i> ∈ ℤ}. Montre que <i>A</i> = <i>B</i>.',
    etapes:[{f:'<i>A</i> ⊂ <i>B</i> : soit <i>x</i> ∈ <i>A</i>, <i>x</i> = 2<i>k</i> + 1. Alors <i>x</i> = 2(<i>k</i> + 1) − 1 avec <i>m</i> = <i>k</i> + 1 ∈ ℤ, donc <i>x</i> ∈ <i>B</i>.',w:'On réécrit l’élément sous la forme qui définit B, en trouvant le bon m.'},
     {f:'<i>B</i> ⊂ <i>A</i> : soit <i>x</i> ∈ <i>B</i>, <i>x</i> = 2<i>m</i> − 1. Alors <i>x</i> = 2(<i>m</i> − 1) + 1 avec <i>k</i> = <i>m</i> − 1 ∈ ℤ, donc <i>x</i> ∈ <i>A</i>.',w:'Même travail dans l’autre sens.'},
     {f:'Les deux inclusions donnent <i>A</i> = <i>B</i>.',w:'C’est la définition de l’égalité de deux ensembles.'}],
    conclusion:'<i>A</i> = <i>B</i> : c’est l’ensemble des entiers impairs, décrit de deux façons. De la même manière, « <i>n</i> pair ⇔ <i>n</i>² pair » se prouve en deux sens : directement (<i>n</i> = 2<i>k</i> ⇒ <i>n</i>² = 2 · 2<i>k</i>²) et par contraposée pour l’autre.'}},
  {h:'Une seule inclusion',p:'Soit <i>U</i> = {4<i>k</i> + 1 : <i>k</i> ∈ ℤ} et <i>V</i> = {2<i>m</i> + 1 : <i>m</i> ∈ ℤ}. Qu’est-ce qui est vrai&nbsp;?',
   opts:['<i>U</i> = <i>V</i>, car ce sont deux ensembles d’impairs','<i>V</i> ⊂ <i>U</i> seulement','<i>U</i> ⊂ <i>V</i> seulement : 4<i>k</i> + 1 = 2(2<i>k</i>) + 1, mais 3 ∈ <i>V</i> et 3 ∉ <i>U</i>','Aucune inclusion'],ans:2,
   why:'U ⊂ V en posant m = 2k. Mais V ⊄ U : 3 = 2 · 1 + 1 ∈ V, et 4k + 1 = 3 donnerait k = 1/2. Un seul élément suffit à réfuter une inclusion.'},
  {h:'Choisir sa méthode',p:'Quelle méthode convient le mieux pour démontrer qu’il existe une infinité de nombres premiers&nbsp;?',
   opts:['Une récurrence sur le plus grand nombre premier','Vérifier les mille premiers nombres premiers','Un contre-exemple','L’absurde : on suppose qu’il n’y en a qu’un nombre fini, et on fabrique un entier qui contredit cette liste'],ans:3,
   why:'« Une infinité » est la négation de « un nombre fini » : on suppose la liste finie p₁, …, p_r, et p₁ · … · p_r + 1 n’est divisible par aucun d’eux, ce qui contredit la liste. Vérifier des cas ne prouve rien.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul><li>Une <b>démonstration</b> enchaîne des implications justifiées ; « soit <i>x</i> quelconque » permet de conclure pour tous les <i>x</i>.</li><li><b>Pair</b> : <i>n</i> = 2<i>k</i> ; <b>impair</b> : <i>n</i> = 2<i>k</i> + 1 ; tout entier est l’un ou l’autre, jamais les deux.</li><li><b>Preuve directe</b> : supposer <i>P</i>, traduire avec les définitions, calculer jusqu’à la forme exigée par <i>Q</i>.</li><li><b>Contraposée</b> : prouver non <i>Q</i> ⇒ non <i>P</i> quand non <i>Q</i> donne une écriture commode.</li><li><b>Absurde</b> : supposer le contraire et aboutir à une contradiction ; idéal pour « irrationnel » ou « il n’existe pas ». Un rationnel s’écrit <i>p</i>/<i>q</i> irréductible.</li><li><b>Disjonction de cas</b> : des cas qui couvrent tout (parité, reste dans la division par 3…), traités un par un.</li><li><b>Récurrence</b> : initialisation <i>P</i>(<i>n</i>₀) et hérédité <i>P</i>(<i>n</i>) ⇒ <i>P</i>(<i>n</i> + 1) ; les deux sont indispensables.</li><li>Un <b>contre-exemple</b> réfute un ∀ ; un <b>exemple</b> prouve un ∃ ; aucun nombre d’exemples ne prouve un ∀.</li><li><b>Équivalence</b> : deux implications ; <b>égalité d’ensembles</b> : double inclusion.</li></ul></div>`},
  {kind:'Problème',h:'Rationnel plus irrationnel',
   p:'Soit <i>r</i> un nombre rationnel et <i>x</i> un nombre irrationnel. On veut démontrer que <i>s</i> = <i>r</i> + <i>x</i> est irrationnel. On admet que la somme, la différence et le produit de deux rationnels sont rationnels. La conclusion est une impossibilité (« <i>s</i> n’est pas rationnel ») : c’est le terrain de l’absurde.',
   parts:[
    {q:'a) Par quoi commence la preuve par l’absurde&nbsp;?',opts:['On suppose que s est irrationnel','On suppose que s est rationnel','On suppose que x est rationnel','On prend r = 0 pour simplifier'],ans:1,hint:'On suppose le contraire de la conclusion visée.',why:'On veut « s irrationnel » ; on suppose donc s rationnel.'},
    {q:'b) Exemple numérique : si <i>r</i> = 3/4 et si on avait <i>s</i> = 5/2, que vaudrait <i>x</i>&nbsp;?',lab:'x =',ans:1.75,tol:0.001,hint:'Isole x dans s = r + x.',why:'x = s − r = 5/2 − 3/4 = 10/4 − 3/4 = 7/4 = 1,75, un rationnel.'},
    {q:'c) Où est la contradiction dans le cas général&nbsp;?',opts:['s est à la fois rationnel et irrationnel par hypothèse','r devrait être irrationnel','x = s − r serait une différence de deux rationnels, donc rationnel, alors que x est irrationnel','Il n’y a pas de contradiction'],ans:2,hint:'Généralise le calcul du b).',why:'Si s ∈ ℚ, alors x = s − r ∈ ℚ, ce qui contredit l’hypothèse x irrationnel.'},
    {q:'d) Et la somme de deux irrationnels&nbsp;?',opts:['Elle est toujours irrationnelle, par le même raisonnement','Elle est toujours rationnelle','Elle peut être rationnelle : √2 + (−√2) = 0 est un contre-exemple à « toujours irrationnelle »','On ne peut pas additionner deux irrationnels'],ans:2,hint:'Le raisonnement ci-dessus utilisait que r est rationnel. Cherche un contre-exemple simple.',why:'√2 et −√2 sont irrationnels, et leur somme 0 est rationnelle. La propriété ne s’étend pas.'},
   ],
   sol:'Supposons par l’absurde que s = r + x soit rationnel. Alors x = s − r est la différence de deux rationnels, donc x est rationnel : c’est en contradiction avec l’hypothèse. Donc <b>s est irrationnel</b>. Par exemple, 1 + √2 et 3/4 + √2 sont irrationnels. Attention, on ne peut pas remplacer r par un irrationnel : √2 + (−√2) = 0 est rationnel. Un contre-exemple suffit à réfuter « la somme de deux irrationnels est irrationnelle ».'},
  {kind:'Problème',h:'Quand 2ⁿ dépasse n²',
   p:'On compare 2<sup><i>n</i></sup> et <i>n</i>² pour les entiers <i>n</i> ≥ 1. On a 2¹ = 2 &gt; 1, mais 2² = 4 = 2², 2³ = 8 &lt; 9 et 2⁴ = 16 = 4². On veut démontrer par récurrence que 2<sup><i>n</i></sup> &gt; <i>n</i>² à partir d’un certain rang, en choisissant correctement ce rang.',
   parts:[
    {q:'a) Quel est le plus petit entier <i>n</i>₀ ≥ 2 tel que 2<sup><i>n</i>₀</sup> &gt; <i>n</i>₀² ?',lab:'n₀ =',ans:5,hint:'Continue le tableau de l’énoncé.',why:'2⁵ = 32 > 25, alors que n = 2, 3, 4 échouent.'},
    {q:'b) Pour l’hérédité, on aura besoin de <i>n</i>² ≥ 2<i>n</i> + 1. Quel est le plus petit entier <i>n</i> ≥ 1 qui la vérifie&nbsp;?',lab:'n =',ans:3,hint:'Teste n = 1, 2, 3.',why:'1 ≥ 3 faux, 4 ≥ 5 faux, 9 ≥ 7 vrai ; ensuite n² − 2n − 1 = (n − 1)² − 2 ne fait que croître.'},
    {q:'c) Quelle rédaction de l’hérédité est correcte (on suppose 2<sup><i>n</i></sup> &gt; <i>n</i>² avec <i>n</i> ≥ 5)&nbsp;?',opts:['2ⁿ⁺¹ = 2 · 2ⁿ > 2n², et 2n² > (n + 1)² pour tout n ≥ 1','2ⁿ⁺¹ > (n + 1)², car on remplace n par n + 1 dans 2ⁿ > n²','2ⁿ⁺¹ = 2ⁿ + 1 > n² + 1','2ⁿ⁺¹ = 2 · 2ⁿ > 2n² = n² + n² ≥ n² + 2n + 1 = (n + 1)², car n² ≥ 2n + 1 dès n ≥ 3'],ans:3,hint:'Multiplie l’hypothèse par 2, puis compare 2n² et (n + 1)² avec le b).',why:'On double l’inégalité, puis on utilise n² ≥ 2n + 1, vrai puisque n ≥ 5 ≥ 3. La 1re option est fausse pour n = 2 (8 > 9 faux) ; la 2e suppose le résultat ; 2ⁿ⁺¹ n’est pas 2ⁿ + 1.'},
    {q:'d) Pourquoi initialiser à 5 et pas à 3, puisque l’hérédité marche dès 3&nbsp;?',opts:['Parce que P(3) et P(4) sont fausses : il faut démarrer à un rang où la propriété est vraie','Parce que l’hérédité est fausse pour n = 3','Par convention, on initialise toujours à 5','On pourrait initialiser à 1, car 2 > 1'],ans:0,hint:'Que vaut P(3) ? Et P(1) mène-t-il à P(2) ?',why:'Une récurrence a besoin d’un premier domino vrai et d’une hérédité valable à partir de lui. P(1) est vraie, mais l’hérédité échoue de 1 à 2 ; P(3) et P(4) sont fausses ; P(5) est le bon départ.'},
   ],
   sol:'Soit P(n) : 2ⁿ &gt; n². <b>Initialisation</b> : 2⁵ = 32 &gt; 25, donc P(5) est vraie. <b>Hérédité</b> : soit n ≥ 5 avec P(n). Alors 2ⁿ⁺¹ = 2 · 2ⁿ &gt; 2n² = n² + n². Or n ≥ 3 donne n² ≥ 2n + 1, donc 2n² ≥ n² + 2n + 1 = (n + 1)², et P(n + 1) est vraie. <b>Conclusion</b> : 2ⁿ &gt; n² pour tout n ≥ 5. On ne pouvait pas démarrer à 3 ou 4, où la propriété est fausse, ni à 1, car l’hérédité ne fonctionne pas de 1 à 2.'},
]},
/* ===================== 3. ENSEMBLES ET ÉLÉMENTS ===================== */
{subj:'gred',sem:'ens',id:'gred-ensembles',h:'Ensembles et éléments',p:'Décrire un ensemble en extension ou en compréhension, distinguer ∈ et ⊂, l’ensemble vide, singletons, paires, et l’ensemble des parties 𝒫(E) avec ses 2ⁿ éléments.',steps:[
  {h:'Ensembles et éléments',p:`<p>Tout objet mathématique vit quelque part : un nombre dans ℝ, une solution parmi les solutions d’une équation, un point dans le plan. La notion d’<b>ensemble</b> fournit le vocabulaire commun pour dire où se trouve un objet.</p>
<div class="def"><p>Un <b>ensemble</b> est une collection d’objets bien déterminés, appelés ses <b>éléments</b>. On écrit <b><i>x</i> ∈ <i>A</i></b> (« <i>x</i> appartient à <i>A</i> ») quand <i>x</i> est un élément de <i>A</i>, et <b><i>x</i> ∉ <i>A</i></b> sinon.</p></div>
<div class="idea"><p>Un ensemble est un sac dont on peut toujours dire, pour un objet donné, s’il est dedans ou non. « <i>x</i> ∈ <i>A</i> » est donc une <b>proposition</b> : vraie ou fausse, sans entre-deux. Le symbole ∈ est un epsilon stylisé.</p></div>
<div class="ex"><p>Les ensembles de nombres de référence : ℕ = {0 ; 1 ; 2 ; …} (entiers naturels), ℤ (entiers relatifs), ℚ (rationnels), ℝ (réels), et ℕ* = ℕ privé de 0. On a −2 ∈ ℤ mais −2 ∉ ℕ ; 3/4 ∈ ℚ ; √2 ∈ ℝ mais √2 ∉ ℚ.</p></div>
<div class="warn"><p>« L’ensemble des grands nombres » n’est pas un ensemble : on ne sait pas décider si 1000 en fait partie. Les éléments doivent être <b>bien déterminés</b>.</p></div>`,
   note:'Les éléments d’un ensemble peuvent eux-mêmes être des ensembles : {{1 ; 2} ; {3}} a <b>deux</b> éléments, l’ensemble {1 ; 2} et l’ensemble {3}.'},
  {h:'Extension et compréhension',p:`<p>Pour parler d’un ensemble, il faut le décrire. Deux façons existent : la liste, quand elle est courte, et la propriété, quand l’ensemble est grand ou infini.</p>
<div class="def"><ul><li><b>En extension</b> : on énumère ses éléments entre accolades, {2 ; 4 ; 6 ; 8}.</li><li><b>En compréhension</b> : {<i>x</i> ∈ <i>E</i> : <i>P</i>(<i>x</i>)} est l’ensemble des éléments <i>x</i> de l’ensemble de référence <i>E</i> qui vérifient la propriété <i>P</i>(<i>x</i>). On lit « l’ensemble des <i>x</i> de <i>E</i> tels que <i>P</i>(<i>x</i>) ».</li></ul></div>
<div class="idea"><p>La compréhension est un filtre : on passe <i>E</i> en revue et on garde ce qui vérifie <i>P</i>. Ainsi <i>a</i> ∈ {<i>x</i> ∈ <i>E</i> : <i>P</i>(<i>x</i>)} ⇔ (<i>a</i> ∈ <i>E</i> et <i>P</i>(<i>a</i>)).</p></div>
<div class="ex"><p>{<i>n</i> ∈ ℕ : 1 ≤ <i>n</i> ≤ 9 et <i>n</i> pair} = {2 ; 4 ; 6 ; 8}. {<i>x</i> ∈ ℝ : <i>x</i>² = 4} = {−2 ; 2}, mais {<i>x</i> ∈ ℕ : <i>x</i>² = 4} = {2} : changer <i>E</i> change l’ensemble. On écrit aussi {2<i>k</i> : <i>k</i> ∈ ℤ} pour l’ensemble infini des entiers pairs.</p></div>
<div class="warn"><p>Un ensemble est déterminé par ses éléments seulement : <b>l’ordre et les répétitions ne comptent pas</b>. {1 ; 2 ; 2} = {2 ; 1}, un ensemble à deux éléments.</p></div>`,
   note:'On précise toujours l’ensemble de référence dans une compréhension. Sans lui, « l’ensemble de tous les ensembles qui ne s’appartiennent pas » mène à une contradiction célèbre (le paradoxe de Russell).'},
  {kind:'Méthode',h:'Passer d’une description à l’autre',
   p:'<b>Compréhension → extension :</b> on résout la condition dans l’ensemble de référence, puis on liste les solutions. Les inégalités et les équations se résolvent comme d’habitude, mais on ne garde que les éléments du bon ensemble (entiers, naturels…). <b>Extension → compréhension :</b> on cherche ce que les éléments ont en commun, une forme (<i>n</i>², 2<i>k</i> + 1…) ou une propriété (diviseurs de…), puis on vérifie qu’elle ne capte <b>aucun élément en trop</b>.',
   demo:{enonce:'Écris en extension <i>A</i> = {<i>x</i> ∈ ℤ : <i>x</i>² &lt; 10} et <i>B</i> = {<i>n</i> ∈ ℕ : <i>n</i> divise 12}, puis en compréhension <i>C</i> = {1 ; 4 ; 9 ; 16 ; 25}.',
    etapes:[{f:'<i>x</i>² &lt; 10 ⇔ −√10 &lt; <i>x</i> &lt; √10, avec √10 ≈ 3,16. Les entiers de cet intervalle : <i>A</i> = {−3 ; −2 ; −1 ; 0 ; 1 ; 2 ; 3}.',w:'On résout dans ℝ, puis on ne garde que les entiers.'},
     {f:'Diviseurs de 12 : 1, 2, 3, 4, 6, 12. Donc <i>B</i> = {1 ; 2 ; 3 ; 4 ; 6 ; 12}.',w:'On teste les entiers de 1 à 12 ; 0 ne divise pas 12.'},
     {f:'1, 4, 9, 16, 25 sont les carrés de 1, 2, 3, 4, 5 : <i>C</i> = {<i>n</i>² : <i>n</i> ∈ ℕ, 1 ≤ <i>n</i> ≤ 5}.',w:'On repère la forme commune, puis on borne pour ne rien ajouter (36 n’est pas dans C).'}],
    conclusion:'<i>A</i> a 7 éléments, <i>B</i> en a 6. Pour <i>C</i>, on aurait aussi pu écrire {<i>m</i> ∈ ℕ : 1 ≤ <i>m</i> ≤ 25 et <i>m</i> est un carré parfait} : plusieurs compréhensions décrivent le même ensemble.'}},
  {h:'Compter les éléments',p:'Combien d’éléments a l’ensemble {<i>x</i> ∈ ℤ : |<i>x</i> − 2| ≤ 3}&nbsp;?',lab:'éléments :',ans:7,
   why:'|x − 2| ≤ 3 ⇔ −3 ≤ x − 2 ≤ 3 ⇔ −1 ≤ x ≤ 5. Les entiers de −1 à 5 sont 7 : {−1 ; 0 ; 1 ; 2 ; 3 ; 4 ; 5}.'},
  {h:'Retrouver la propriété',p:`Dans <i>E</i> = {1, …, 20}, on forme {<i>n</i> ∈ <i>E</i> : <i>k</i> divise <i>n</i>}. Règle <i>k</i> pour que cet ensemble soit exactement <b>{6 ; 12 ; 18}</b>.`,
   params:[{id:'k',l:'k',min:1,max:10,v:2}],
   draw:v=>{ let s='<svg viewBox="0 0 320 110" width="320" role="img"><rect x="4" y="4" width="312" height="102" rx="10" fill="none" stroke="var(--muted)" stroke-width="1.5"/>';
     for(let n=1;n<=20;n++){ const x=22+((n-1)%10)*30, y=n<=10?35:80, on=n%v.k===0;
       s+=`<circle cx="${x}" cy="${y}" r="12" fill="${on?'var(--accent)':'none'}" fill-opacity=".55" stroke="${on?'var(--accent)':'var(--line)'}" stroke-width="2"/><text x="${x}" y="${y+4}" font-size="11" font-weight="700" text-anchor="middle" fill="var(--ink)">${n}</text>`; }
     return s+'</svg>'; },
   info:v=>{ const L=[]; for(let n=1;n<=20;n++) if(n%v.k===0) L.push(n); return `{<i>n</i> ∈ <i>E</i> : ${v.k} divise <i>n</i>} = {${L.join(' ; ')}}, ${L.length} élément${L.length>1?'s':''}`; },
   ok:v=>v.k===6,
   why:'Les multiples de 6 entre 1 et 20 sont 6, 12, 18. Avec k = 3, on obtiendrait aussi 3, 9, 15 ; avec k = 2 tous les pairs. La compréhension {n ∈ E : 6 divise n} décrit exactement {6 ; 12 ; 18}.'},
  {h:'Le même ensemble',p:'Lequel de ces ensembles est égal à {1 ; 2 ; 3}&nbsp;?',
   opts:['{{1} ; {2} ; {3}}','{<i>n</i> ∈ ℕ : 1 ≤ <i>n</i> ≤ 4}','{<i>n</i> ∈ ℕ : <i>n</i> &lt; 3}','{3 ; 1 ; 2 ; 2}'],ans:3,
   why:'{3 ; 1 ; 2 ; 2} contient exactement 1, 2 et 3 : l’ordre et la répétition ne comptent pas. {n ∈ ℕ : n < 3} = {0 ; 1 ; 2}, et {{1} ; {2} ; {3}} a pour éléments des ensembles, pas des nombres.'},
  {h:'Appartenance et inclusion',p:`<p>Les entiers pairs sont tous des entiers : l’ensemble des pairs est « contenu » dans ℤ. Cette relation entre deux ensembles s’appelle l’inclusion. Elle ne doit pas être confondue avec l’appartenance.</p>
<div class="def"><p><b><i>A</i> ⊂ <i>B</i></b> (« <i>A</i> est inclus dans <i>B</i> », ou « <i>A</i> est une <b>partie</b> de <i>B</i> ») signifie : <b>∀<i>x</i>, <i>x</i> ∈ <i>A</i> ⇒ <i>x</i> ∈ <i>B</i></b>. Deux ensembles sont <b>égaux</b> s’ils ont les mêmes éléments : <b><i>A</i> = <i>B</i> ⇔ (<i>A</i> ⊂ <i>B</i> et <i>B</i> ⊂ <i>A</i>)</b>.</p></div>
<div class="idea"><p>Sur la figure, le disque <i>A</i> est entièrement dans <i>B</i>. ∈ relie un <b>objet</b> à un ensemble ; ⊂ relie <b>deux ensembles</b>. Tout ensemble est inclus dans lui-même, puisque « <i>x</i> ∈ <i>A</i> ⇒ <i>x</i> ∈ <i>A</i> » est toujours vraie.</p></div>
<div class="ex"><p>{4<i>k</i> : <i>k</i> ∈ ℤ} ⊂ {2<i>m</i> : <i>m</i> ∈ ℤ} : si <i>x</i> = 4<i>k</i>, alors <i>x</i> = 2 · (2<i>k</i>). L’inclusion inverse est fausse, car 2 est pair sans être multiple de 4. Autre exemple : 2 ∈ ℕ et {2} ⊂ ℕ, mais « {2} ∈ ℕ » est faux : {2} est un ensemble, pas un entier.</p></div>
<div class="warn"><p>Pour prouver une égalité d’ensembles, il faut <b>deux</b> inclusions. Une seule ne suffit pas, comme le montrent les multiples de 4.</p></div>`,
   fig:(()=>{ const P=plane({x:[0,10],y:[0,5.6],grid:false,axes:false}); P.rect(0.2,0.2,9.6,5.2,{c:'var(--muted)',w:1.5});
     P.circ(5,2.8,2.3,{fill:'var(--math)',fo:.15,c:'var(--math)',w:2}).circ(5.8,2.8,1.1,{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:2});
     P.text(3.3,2.6,'B',{}).text(5.6,2.6,'A',{}).dot(8.3,1.3,{r:5,c:'var(--ink)',l:'y'}).dot(5.9,2.2,{r:5,c:'var(--ink)',l:'x'}).text(0.5,0.6,'A ⊂ B, x ∈ A, y ∉ B',{s:12,c:'var(--muted)'}); return P.svg(); })(),
   note:'Pour prouver A ⊄ B, un seul élément de A hors de B suffit : c’est un contre-exemple à « ∀x, x ∈ A ⇒ x ∈ B ».'},
  {kind:'Méthode',h:'∈ ou ⊂ ? Lire les accolades',
   p:'<b>Quand :</b> un ensemble contient des ensembles, et on doit décider si un objet en est un <b>élément</b> ou une <b>partie</b>. <b>Comment :</b><ol><li>liste les éléments de l’ensemble, en enlevant <b>une seule couche</b> d’accolades ;</li><li><i>X</i> ∈ <i>A</i> si <i>X</i> figure tel quel dans cette liste ;</li><li><i>X</i> ⊂ <i>A</i> si <i>X</i> est un ensemble et que <b>chacun de ses éléments</b> figure dans la liste.</li></ol>',
   demo:{enonce:'Soit <i>A</i> = {1 ; {2} ; {1 ; 2}}. Classe : 1, 2, {1}, {2}, {{2}}, {1 ; 2}.',
    etapes:[{f:'Éléments de <i>A</i> : 1, {2} et {1 ; 2}. Donc card <i>A</i> = 3.',w:'On enlève les accolades extérieures, sans toucher aux autres.'},
     {f:'1 ∈ <i>A</i>, mais 2 ∉ <i>A</i> : 2 n’est pas dans la liste, seul {2} y est.',w:'Un objet est élément s’il apparaît tel quel.'},
     {f:'{1} ⊂ <i>A</i> (car 1 ∈ <i>A</i>) mais {1} ∉ <i>A</i>. {2} ∈ <i>A</i> mais {2} ⊄ <i>A</i> (car 2 ∉ <i>A</i>). {{2}} ⊂ <i>A</i>, car son seul élément {2} est dans <i>A</i>.',w:'Pour l’inclusion, on teste chaque élément de l’ensemble proposé.'},
     {f:'{1 ; 2} ∈ <i>A</i>, mais {1 ; 2} ⊄ <i>A</i> puisque 2 ∉ <i>A</i>.',w:'Un même objet peut être élément sans être partie.'}],
    conclusion:'Être élément et être partie sont deux questions indépendantes. Le test : éléments = liste après une couche d’accolades ; partie = tous ses éléments sont dans cette liste.'}},
  {h:'Trouve l’intrus',p:'Soit <i>A</i> = {∅ ; 1 ; {1}}. Laquelle de ces affirmations est <b>fausse</b>&nbsp;?',
   opts:['∅ ∈ <i>A</i>','{1} ⊂ <i>A</i>','{∅} ∈ <i>A</i>','{{1}} ⊂ <i>A</i>'],ans:2,
   why:'Les éléments de A sont ∅, 1 et {1}. L’objet {∅} n’est pas dans cette liste, donc {∅} ∉ A (en revanche {∅} ⊂ A). Les autres : ∅ figure dans la liste ; 1 ∈ A donne {1} ⊂ A ; {1} ∈ A donne {{1}} ⊂ A.'},
  {h:'Le cardinal d’un ensemble fini',p:`<p>Combien d’éléments a un ensemble ? La question paraît simple, mais les répétitions et les ensembles d’ensembles la rendent piégeuse. On lui donne un nom et une notation.</p>
<div class="def"><p>Un ensemble <i>A</i> est <b>fini</b> s’il a un nombre fini d’éléments. Ce nombre s’appelle son <b>cardinal</b>, noté <b>card <i>A</i></b> (on voit aussi |<i>A</i>| ou #<i>A</i>).</p></div>
<div class="idea"><p>Pour compter, on écrit l’ensemble en extension, on supprime les répétitions, puis on compte les objets séparés par des points-virgules au premier niveau d’accolades. Un élément qui est lui-même un ensemble compte pour <b>un</b>, quelle que soit sa taille : une boîte pleine dans un sac reste une seule boîte.</p></div>
<div class="ex"><p>card {7} = 1 ; card {1 ; 2 ; 2 ; 3} = 3 ; card {{1 ; 2 ; 3}} = 1 ; card {{1} ; {2} ; {1 ; 2}} = 3. Pour {<i>n</i> ∈ ℤ : −2 ≤ <i>n</i> ≤ 4}, on liste −2, −1, 0, 1, 2, 3, 4 : le cardinal vaut 4 − (−2) + 1 = 7.</p></div>
<div class="prop"><p>Si <i>A</i> ⊂ <i>B</i> avec <i>B</i> fini, alors <i>A</i> est fini et card <i>A</i> ≤ card <i>B</i>, avec égalité seulement si <i>A</i> = <i>B</i>.</p></div>
<div class="why"><p>Les éléments de <i>A</i> sont pris parmi ceux de <i>B</i>. Si <i>A</i> ≠ <i>B</i>, au moins un élément de <i>B</i> manque dans <i>A</i>, donc card <i>A</i> &lt; card <i>B</i>.</p></div>`},
  {h:'Un cardinal piège',p:'Combien d’éléments a l’ensemble {1 ; {1} ; {1 ; 1}}&nbsp;?',lab:'éléments :',ans:2,
   why:'{1 ; 1} = {1}, car les répétitions ne comptent pas. L’ensemble est donc {1 ; {1}}, avec deux éléments : le nombre 1 et l’ensemble {1}.'},
  {h:'Vide, singleton, paire',p:`<p>Certains ensembles sont si petits qu’ils méritent un nom. Le plus petit de tous n’a aucun élément, et il joue pour les ensembles le rôle du nombre 0.</p>
<div class="def"><p>L’<b>ensemble vide</b>, noté ∅, n’a aucun élément : card ∅ = 0. Un <b>singleton</b> {<i>a</i>} a un seul élément. Une <b>paire</b> {<i>a</i> ; <i>b</i>}, avec <i>a</i> ≠ <i>b</i>, en a deux.</p></div>
<div class="prop"><p>∅ est inclus dans tout ensemble <i>A</i>, et il n’existe qu’un seul ensemble vide.</p></div>
<div class="why"><p>∅ ⊂ <i>A</i> veut dire « ∀<i>x</i>, <i>x</i> ∈ ∅ ⇒ <i>x</i> ∈ <i>A</i> ». L’hypothèse <i>x</i> ∈ ∅ est toujours fausse, donc chaque implication est vraie : aucun contre-exemple n’est possible. Si ∅ et ∅′ sont deux ensembles vides, on a ∅ ⊂ ∅′ et ∅′ ⊂ ∅, donc ils sont égaux.</p></div>
<div class="ex"><p>{<i>x</i> ∈ ℝ : <i>x</i>² = −1} = ∅. {<i>x</i> ∈ ℝ : <i>x</i>² = 0} = {0} est un singleton. {<i>x</i> ∈ ℝ : <i>x</i>² = 9} = {−3 ; 3} est une paire. Et {5 ; 5} = {5} : malgré l’écriture, ce n’est pas une paire.</p></div>`,
   note:'∅ et {∅} sont différents : le premier est vide, le second est un singleton dont l’unique élément est l’ensemble vide. Une boîte vide n’est pas une boîte qui contient une boîte vide.'},
  {h:'Vrai ou faux ?',p:'Laquelle de ces affirmations est vraie&nbsp;?',
   opts:['∅ = {∅}','∅ ∈ ∅','{∅} a exactement un élément','{∅ ; ∅} a deux éléments'],ans:2,
   why:'{∅} est un singleton : son seul élément est ∅. ∅ n’a aucun élément, donc ∅ ∉ ∅ et ∅ ≠ {∅}. Enfin {∅ ; ∅} = {∅}, qui a un seul élément.'},
  {h:'Construis l’ensemble',p:`Dans <i>E</i> = {1, …, 8}, place dans <i>X</i> les éléments qui conviennent pour obtenir <b><i>X</i> = {<i>n</i> ∈ <i>E</i> : (<i>n</i> − 2)(<i>n</i> − 6) &lt; 0}</b>.`,
   params:[1,2,3,4,5,6,7,8].map(n=>({id:'e'+n,l:`${n} ∈ X ?`,min:0,max:1,v:0})),
   draw:v=>{ const IN=[[75,60],[110,60],[145,60],[75,95],[110,95],[145,95],[92,128],[128,128]], OUT=[[225,40],[270,40],[225,75],[270,75],[225,110],[270,110],[225,145],[270,145]];
     let s='<svg viewBox="0 0 320 180" width="320" role="img"><rect x="6" y="6" width="308" height="168" rx="10" fill="none" stroke="var(--muted)" stroke-width="1.5"/><circle cx="110" cy="92" r="72" fill="var(--accent)" fill-opacity=".15" stroke="var(--accent)" stroke-width="2"/>'+tx(48,34,'X')+tx(296,166,'E','fill-opacity=".7"');
     for(let n=1;n<=8;n++){ const p=v['e'+n]?IN[n-1]:OUT[n-1]; s+=`<circle cx="${p[0]}" cy="${p[1]}" r="13" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5"/>`+tx(p[0],p[1]+5,n); }
     return s+'</svg>'; },
   info:v=>{ const L=[]; for(let n=1;n<=8;n++) if(v['e'+n]) L.push(n); return `<i>X</i> = ${L.length?'{'+L.join(' ; ')+'}':'∅'}`; },
   ok:v=>[1,2,3,4,5,6,7,8].every(n=>!!v['e'+n]===((n-2)*(n-6)<0)),
   why:'Un produit est strictement négatif quand ses facteurs sont de signes contraires : n − 2 > 0 et n − 6 < 0, soit 2 < n < 6. Donc X = {3 ; 4 ; 5}. Pour n = 2 ou 6 le produit est nul, pas négatif.'},
  {h:'L’ensemble des parties',p:`<p>Les parties d’un ensemble <i>E</i> sont des ensembles. On peut donc les rassembler à leur tour dans un nouvel ensemble, et se demander combien il y en a.</p>
<div class="def"><p>L’<b>ensemble des parties</b> de <i>E</i>, noté <b>𝒫(<i>E</i>)</b> (« P de E », avec un P calligraphique), est l’ensemble dont les éléments sont les parties de <i>E</i> : <b><i>X</i> ∈ 𝒫(<i>E</i>) ⇔ <i>X</i> ⊂ <i>E</i></b>.</p></div>
<div class="idea"><p>On monte d’un étage : une partie de <i>E</i> devient un <b>élément</b> de 𝒫(<i>E</i>). 𝒫(<i>E</i>) contient toujours ∅, inclus dans tout, et <i>E</i> lui-même. La figure range les parties par nombre d’éléments ; un trait relie deux parties qui diffèrent d’un seul élément.</p></div>
<div class="ex"><p>Pour <i>E</i> = {<i>a</i> ; <i>b</i>} : 𝒫(<i>E</i>) = {∅ ; {<i>a</i>} ; {<i>b</i>} ; {<i>a</i> ; <i>b</i>}}, soit 4 parties. Pour <i>E</i> = {<i>a</i> ; <i>b</i> ; <i>c</i>}, on trouve 1 partie vide, 3 à un élément, 3 à deux éléments et 1 à trois éléments : 8 en tout. Fais grandir <i>E</i> et observe que le nombre double à chaque élément ajouté.</p></div>
<div class="why"><p>Pourquoi il double : quand on ajoute un élément <i>z</i> à <i>E</i>, les parties du nouvel ensemble sont celles de <i>E</i>, plus les mêmes auxquelles on ajoute <i>z</i>. D’où card 𝒫(<i>E</i>) = 2<sup>card <i>E</i></sup>.</p></div>`,
   params:[{id:'n',l:'card E',min:0,max:4,v:2}],
   draw:v=>{ const L='abcd'.slice(0,v.n).split(''), N=1<<v.n, pc=m=>{ let c=0; for(let i=0;i<v.n;i++) if(m>>i&1) c++; return c; };
     const lay=[]; for(let k=0;k<=v.n;k++) lay.push([]); for(let m=0;m<N;m++) lay[pc(m)].push(m);
     const pos={}; lay.forEach((row,k)=>{ const sp=Math.min(64,300/row.length); row.forEach((m,i)=>{ pos[m]=[160+(i-(row.length-1)/2)*sp, v.n?196-k*(176/v.n):110]; }); });
     const name=m=>m?'{'+L.filter((_,i)=>m>>i&1).join(',')+'}':'∅';
     let s='<svg viewBox="0 0 320 214" width="320" role="img">';
     for(let m=0;m<N;m++) for(let i=0;i<v.n;i++) if(!(m>>i&1)){ const a=pos[m], b=pos[m|1<<i]; s+=`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="var(--line)" stroke-width="1.5"/>`; }
     for(let m=0;m<N;m++){ const p=pos[m]; s+=`<text x="${p[0].toFixed(1)}" y="${(p[1]+4).toFixed(1)}" font-size="${v.n===4?10:12}" font-weight="700" text-anchor="middle" fill="var(--ink)" paint-order="stroke" stroke="var(--surface)" stroke-width="4">${name(m)}</text>`; }
     return s+'</svg>'; },
   info:v=>`<i>E</i> = ${v.n?'{'+'abcd'.slice(0,v.n).split('').join(' ; ')+'}':'∅'} : card 𝒫(<i>E</i>) = 2<sup>${v.n}</sup> = <b>${1<<v.n}</b>. Par taille : ${[1,1,1,1,1].slice(0,v.n+1).map((_,k)=>{ let c=1; for(let i=0;i<k;i++) c=c*(v.n-i)/(i+1); return c; }).join(' + ')}.`,
   note:'Les éléments de 𝒫(E) sont des ensembles : {a} ∈ 𝒫(E), alors que {a} ⊂ E. Même pour E = ∅, 𝒫(∅) = {∅} a un élément.'},
  {kind:'Méthode',h:'Lister et compter les parties',
   p:'<b>Pourquoi 2<sup><i>n</i></sup> :</b> pour fabriquer une partie <i>X</i> de <i>E</i> = {<i>e</i>₁, …, <i>e<sub>n</sub></i>}, on décide pour chaque élément s’il est <b>dedans ou dehors</b>. Ce sont <i>n</i> choix indépendants à 2 possibilités : <b>card 𝒫(<i>E</i>) = 2<sup><i>n</i></sup></b>. <b>Comment lister sans oubli :</b> on range par taille, ou on suit l’arbre des choix. <b>Avec contraintes :</b> un élément imposé dedans ou dehors n’offre plus qu’un seul choix ; on multiplie les choix restants.',
   demo:{enonce:'Liste les parties de <i>E</i> = {1 ; 2 ; 3}, puis compte les parties de {1 ; 2 ; 3 ; 4 ; 5} qui contiennent 1.',
    etapes:[{f:'Taille 0 : ∅. Taille 1 : {1}, {2}, {3}. Taille 2 : {1 ; 2}, {1 ; 3}, {2 ; 3}. Taille 3 : {1 ; 2 ; 3}.',w:'Ranger par taille garantit qu’on n’oublie rien.'},
     {f:'Total : 1 + 3 + 3 + 1 = 8 = 2³.',w:'On contrôle avec la règle dedans / dehors.'},
     {f:'Parties de {1, …, 5} contenant 1 : l’élément 1 est imposé (1 choix), les 4 autres sont libres (2 choix chacun) : 2⁴ = 16.',w:'Un élément imposé ne double plus le nombre de possibilités.'}],
    conclusion:'card 𝒫({1 ; 2 ; 3}) = 8, et 16 des 32 parties de {1, …, 5} contiennent 1 : exactement la moitié, puisqu’on peut associer à chaque partie sans 1 celle qu’on obtient en ajoutant 1.'}},
  {h:'Un élément de 𝒫(E)',p:'Soit <i>E</i> = {1 ; 2 ; 3}. Lequel de ces objets est un <b>élément</b> de 𝒫(<i>E</i>)&nbsp;?',
   opts:['2','{1 ; 4}','{1 ; 3}','(1 ; 3)'],ans:2,
   why:'Les éléments de 𝒫(E) sont les parties de E. {1 ; 3} ⊂ E, donc {1 ; 3} ∈ 𝒫(E). Le nombre 2 est un élément de E, pas une partie ; {1 ; 4} n’est pas inclus dans E ; (1 ; 3) est un couple, pas un ensemble de nombres.'},
  {h:'Les parties des parties',p:'Combien d’éléments a 𝒫(𝒫({1 ; 2}))&nbsp;?',lab:'éléments :',ans:16,
   why:'𝒫({1 ; 2}) = {∅ ; {1} ; {2} ; {1 ; 2}} a 2² = 4 éléments. L’ensemble de ses parties en a donc 2⁴ = 16.'},
  {h:'Parties sous contraintes',p:'Combien de parties de {1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7} contiennent 1 mais pas 2&nbsp;?',lab:'parties :',ans:32,
   why:'1 est imposé dedans, 2 imposé dehors : un seul choix pour chacun. Les 5 autres éléments sont libres : 2⁵ = 32.'},
  {h:'Toujours vrai',p:'Pour un ensemble <i>E</i> quelconque, laquelle de ces affirmations est toujours vraie&nbsp;?',
   opts:['<i>E</i> ⊂ 𝒫(<i>E</i>)','𝒫(<i>E</i>) ⊂ <i>E</i>','card 𝒫(<i>E</i>) = 2 · card <i>E</i>','∅ ∈ 𝒫(<i>E</i>) et ∅ ⊂ 𝒫(<i>E</i>)'],ans:3,
   why:'∅ ⊂ E donne ∅ ∈ 𝒫(E), et ∅ est inclus dans tout ensemble, y compris 𝒫(E). Contre-exemple pour la 1re : E = {1}, 1 ∉ 𝒫(E) = {∅ ; {1}}. Et card 𝒫(E) = 2ⁿ, pas 2n (pour n = 3 : 8 et non 6).'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul><li>Un <b>ensemble</b> est déterminé par ses éléments ; <i>x</i> ∈ <i>A</i> est une proposition. Ensembles de référence : ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.</li><li><b>Extension</b> {2 ; 4 ; 6} ou <b>compréhension</b> {<i>x</i> ∈ <i>E</i> : <i>P</i>(<i>x</i>)} ; l’ordre et les répétitions ne comptent pas.</li><li><b><i>A</i> ⊂ <i>B</i></b> ⇔ ∀<i>x</i>, <i>x</i> ∈ <i>A</i> ⇒ <i>x</i> ∈ <i>B</i> ; <b><i>A</i> = <i>B</i></b> ⇔ double inclusion ; un élément de <i>A</i> hors de <i>B</i> prouve <i>A</i> ⊄ <i>B</i>.</li><li>∈ relie un objet à un ensemble, ⊂ deux ensembles ; pour trancher, on enlève une seule couche d’accolades.</li><li><b>card <i>A</i></b> : nombre d’éléments ; un élément qui est un ensemble compte pour un.</li><li><b>∅</b> est inclus dans tout ensemble et unique ; ∅ ≠ {∅}. Singleton {<i>a</i>}, paire {<i>a</i> ; <i>b</i>} avec <i>a</i> ≠ <i>b</i>.</li><li><b>𝒫(<i>E</i>)</b> : <i>X</i> ∈ 𝒫(<i>E</i>) ⇔ <i>X</i> ⊂ <i>E</i> ; si card <i>E</i> = <i>n</i>, card 𝒫(<i>E</i>) = 2<sup><i>n</i></sup> (dedans ou dehors pour chaque élément).</li><li>Parties sous contraintes : un élément imposé n’offre plus qu’un choix, on multiplie les choix restants.</li></ul></div>`},
  {kind:'Problème',h:'Diviseurs de 24 et de 36',
   p:'On considère <i>A</i> = {<i>n</i> ∈ ℕ : <i>n</i> divise 24}, <i>B</i> = {<i>n</i> ∈ ℕ : <i>n</i> divise 36} et <i>C</i> = {<i>n</i> ∈ ℕ : <i>n</i> divise 24 et <i>n</i> divise 36}, l’ensemble des diviseurs communs. On veut les écrire en extension, les comparer et compter les parties de <i>C</i>.',
   parts:[
    {q:'a) Combien d’éléments a <i>A</i>&nbsp;?',lab:'card A =',ans:8,hint:'Cherche les diviseurs par paires : 1 × 24, 2 × 12…',why:'24 = 1 · 24 = 2 · 12 = 3 · 8 = 4 · 6 : A = {1 ; 2 ; 3 ; 4 ; 6 ; 8 ; 12 ; 24}.'},
    {q:'b) A-t-on <i>A</i> ⊂ <i>B</i>&nbsp;?',opts:['Oui, car 24 < 36','Non : 36 ∉ A','Non : 8 ∈ A mais 8 ne divise pas 36','Oui, car 12 divise 24 et 36'],ans:2,hint:'Pour réfuter une inclusion, cherche un élément de A qui n’est pas dans B.',why:'8 divise 24 mais pas 36 (36 = 4 · 8 + 4) : 8 ∈ A et 8 ∉ B. Que 36 ne soit pas dans A ne dit rien sur A ⊂ B.'},
    {q:'c) Combien d’éléments a <i>C</i>&nbsp;?',lab:'card C =',ans:6,hint:'Garde les éléments de A qui divisent aussi 36.',why:'Dans A, on retire 8 et 24 qui ne divisent pas 36 : C = {1 ; 2 ; 3 ; 4 ; 6 ; 12}, ce sont les diviseurs de 12.'},
    {q:'d) Combien d’éléments a 𝒫(<i>C</i>)&nbsp;?',lab:'card 𝒫(C) =',ans:64,hint:'Chaque élément de C est dedans ou dehors.',why:'card 𝒫(C) = 2⁶ = 64.'},
   ],
   sol:'A = {1 ; 2 ; 3 ; 4 ; 6 ; 8 ; 12 ; 24} (8 éléments) et B = {1 ; 2 ; 3 ; 4 ; 6 ; 9 ; 12 ; 18 ; 36} (9 éléments). A ⊄ B car 8 ∈ A et 8 ∉ B ; de même B ⊄ A car 9 ∈ B et 9 ∉ A. Les diviseurs communs sont C = {1 ; 2 ; 3 ; 4 ; 6 ; 12}, qui est l’ensemble des diviseurs de 12. On a C ⊂ A et C ⊂ B. Enfin card 𝒫(C) = 2⁶ = <b>64</b>.'},
  {kind:'Problème',h:'Inclusion et parties',
   p:'Soit <i>A</i> et <i>B</i> deux ensembles. On veut démontrer l’équivalence <b><i>A</i> ⊂ <i>B</i> ⇔ 𝒫(<i>A</i>) ⊂ 𝒫(<i>B</i>)</b> en prouvant les deux implications. On l’appliquera ensuite à <i>A</i> = {1 ; 2} et <i>B</i> = {1 ; 2 ; 3 ; 4} pour compter des parties.',
   parts:[
    {q:'a) Sens ⇒ : on suppose <i>A</i> ⊂ <i>B</i>. Quelle rédaction prouve 𝒫(<i>A</i>) ⊂ 𝒫(<i>B</i>)&nbsp;?',opts:['Soit x ∈ A ; alors x ∈ B, donc 𝒫(A) ⊂ 𝒫(B)','Soit X ∈ 𝒫(A) : X ⊂ A et A ⊂ B, donc X ⊂ B, c’est-à-dire X ∈ 𝒫(B)','card 𝒫(A) ≤ card 𝒫(B), donc 𝒫(A) ⊂ 𝒫(B)','A ∈ 𝒫(B), donc 𝒫(A) ⊂ 𝒫(B)'],ans:1,hint:'Les éléments de 𝒫(A) sont des parties X de A. Pars d’un tel X.',why:'Pour 𝒫(A) ⊂ 𝒫(B), on prend un élément X de 𝒫(A) et on utilise la transitivité de l’inclusion. Comparer des cardinaux ne prouve pas une inclusion.'},
    {q:'b) Sens ⇐ : on suppose 𝒫(<i>A</i>) ⊂ 𝒫(<i>B</i>). Quel argument donne <i>A</i> ⊂ <i>B</i>&nbsp;?',opts:['A ∈ 𝒫(A) ⊂ 𝒫(B), donc A ∈ 𝒫(B), c’est-à-dire A ⊂ B','∅ ∈ 𝒫(A) et ∅ ∈ 𝒫(B), donc A ⊂ B','Par contraposée, si A ⊂ B alors 𝒫(A) ⊂ 𝒫(B)','On ne peut pas conclure'],ans:0,hint:'Quelle partie de A est particulièrement utile ?',why:'A est une partie de lui-même, donc A ∈ 𝒫(A). L’inclusion supposée donne A ∈ 𝒫(B), qui signifie A ⊂ B. La 3e option énonce le sens ⇒, pas la contraposée de ⇐.'},
    {q:'c) Avec <i>A</i> = {1 ; 2} et <i>B</i> = {1 ; 2 ; 3 ; 4}, combien de parties de <i>B</i> ne sont <b>pas</b> des parties de <i>A</i>&nbsp;?',lab:'parties :',ans:12,hint:'D’après a), 𝒫(A) ⊂ 𝒫(B) : il suffit de soustraire les cardinaux.',why:'card 𝒫(B) − card 𝒫(A) = 16 − 4 = 12.'},
    {q:'d) Combien d’ensembles <i>X</i> vérifient <i>A</i> ⊂ <i>X</i> ⊂ <i>B</i>&nbsp;?',lab:'X possibles :',ans:4,hint:'1 et 2 sont imposés dans X ; 3 et 4 sont libres.',why:'X contient 1 et 2, et chacun de 3 et 4 est dedans ou dehors : 2² = 4 (X = {1 ; 2}, {1 ; 2 ; 3}, {1 ; 2 ; 4}, B).'},
   ],
   sol:'⇒ : supposons A ⊂ B. Soit X ∈ 𝒫(A). Alors X ⊂ A ⊂ B, donc X ⊂ B, soit X ∈ 𝒫(B). Ainsi 𝒫(A) ⊂ 𝒫(B). ⇐ : supposons 𝒫(A) ⊂ 𝒫(B). Comme A ⊂ A, A ∈ 𝒫(A), donc A ∈ 𝒫(B), c’est-à-dire A ⊂ B. L’équivalence est prouvée. Pour A = {1 ; 2} ⊂ B = {1 ; 2 ; 3 ; 4} : 16 − 4 = <b>12</b> parties de B ne sont pas des parties de A, et il y a 2² = <b>4</b> ensembles X entre A et B.'},
]},
/* ===================== 4. ALGÈBRE DES PARTIES ===================== */
{subj:'gred',sem:'ens',id:'gred-parties',h:'Algèbre des parties d’un ensemble',p:'Union, intersection, complémentaire, différence et différence symétrique : leurs règles de calcul, les lois de De Morgan, et deux façons de les démontrer.',steps:[
  {h:'Combiner deux parties',p:`<p>Avec des nombres, on additionne et on multiplie. Avec des parties d’un même ensemble, on fabrique de nouvelles parties en traduisant les mots « ou », « et », « non » : la logique des connecteurs, appliquée à l’appartenance.</p>
<div class="def"><p>On fixe un ensemble de référence <i>E</i> et deux parties <i>A</i>, <i>B</i> de <i>E</i>.</p><ul><li><b>Union</b> : <i>A</i> ∪ <i>B</i> = {<i>x</i> ∈ <i>E</i> : <i>x</i> ∈ <i>A</i> <b>ou</b> <i>x</i> ∈ <i>B</i>} ;</li><li><b>Intersection</b> : <i>A</i> ∩ <i>B</i> = {<i>x</i> ∈ <i>E</i> : <i>x</i> ∈ <i>A</i> <b>et</b> <i>x</i> ∈ <i>B</i>} ;</li><li><b>Complémentaire</b> : <i>A</i>ᶜ = {<i>x</i> ∈ <i>E</i> : <b>non</b> (<i>x</i> ∈ <i>A</i>)}.</li></ul></div>
<div class="idea"><p>Sur le diagramme, l’union colorie tout ce qui touche <i>A</i> ou <i>B</i>, l’intersection seulement la zone commune, le complémentaire tout ce qui est hors de <i>A</i>. Le « ou » est inclusif : la zone commune fait partie de l’union. Le curseur montre aussi les <b>différences</b> <i>A</i> ∖ <i>B</i> (dans <i>A</i>, pas dans <i>B</i>) et la <b>différence symétrique</b> <i>A</i> Δ <i>B</i> (dans exactement un des deux), détaillées juste après.</p></div>
<div class="ex"><p>Ici <i>E</i> = {1, …, 8}, <i>A</i> = {1 ; 2 ; 3 ; 4} et <i>B</i> = {3 ; 4 ; 5 ; 6}. Alors <i>A</i> ∪ <i>B</i> = {1, …, 6}, <i>A</i> ∩ <i>B</i> = {3 ; 4} et <i>A</i>ᶜ = {5 ; 6 ; 7 ; 8}. Fais défiler les six opérations.</p></div>`,
   params:[{id:'k',l:'Opération',min:0,max:5,v:0}],
   draw:v=>venn([{a:1,ab:1,b:1},{ab:1},{a:1},{b:1},{b:1,o:1},{a:1,b:1}][v.k],{els:{a:'1 2',ab:'3 4',b:'5 6',o:'7 8'}}),
   info:v=>['<b>Union</b> A ∪ B = {1 ; 2 ; 3 ; 4 ; 5 ; 6}','<b>Intersection</b> A ∩ B = {3 ; 4}','<b>Différence</b> A ∖ B = {<i>x</i> ∈ A : <i>x</i> ∉ B} = {1 ; 2}','<b>Différence</b> B ∖ A = {5 ; 6}','<b>Complémentaire</b> Aᶜ = E ∖ A = {5 ; 6 ; 7 ; 8}','<b>Différence symétrique</b> A Δ B = {1 ; 2 ; 5 ; 6} : dans A ou dans B, mais pas dans les deux'][v.k],
   note:'Deux parties sont <b>disjointes</b> si A ∩ B = ∅. Le complémentaire dépend de E : on écrit parfois ∁<sub>E</sub>A pour le rappeler.'},
  {h:'Calcule une différence symétrique',p:'Dans <i>E</i> = {1, …, 10}, <i>A</i> = {1, …, 6} et <i>B</i> = {4, …, 9}. Que vaut <i>A</i> Δ <i>B</i>&nbsp;?',
   opts:['{4 ; 5 ; 6}','{1 ; 2 ; 3 ; 7 ; 8 ; 9}','{1 ; 2 ; 3}','{1 ; 2 ; 3 ; 7 ; 8 ; 9 ; 10}'],ans:1,
   why:'A ∖ B = {1 ; 2 ; 3} et B ∖ A = {7 ; 8 ; 9}. Leur union est A Δ B. 10 n’est ni dans A ni dans B, donc pas dans A Δ B.'},
  {h:'Différence et différence symétrique',p:`<p>On veut souvent retirer d’un ensemble les éléments d’un autre, ou garder ce qui est d’un côté sans être des deux. Deux opérations le font, et elles s’écrivent avec les précédentes.</p>
<div class="def"><p><b><i>A</i> ∖ <i>B</i></b> (« <i>A</i> privé de <i>B</i> ») = {<i>x</i> ∈ <i>A</i> : <i>x</i> ∉ <i>B</i>} = <i>A</i> ∩ <i>B</i>ᶜ.<br><b><i>A</i> Δ <i>B</i></b> (la « différence symétrique ») = (<i>A</i> ∖ <i>B</i>) ∪ (<i>B</i> ∖ <i>A</i>).</p></div>
<div class="idea"><p><i>A</i> ∖ <i>B</i> : on part de <i>A</i> et on gomme ce qui est dans <i>B</i>. <i>A</i> Δ <i>B</i> : les éléments qui sont dans <b>exactement un</b> des deux ensembles. C’est le « ou exclusif » des ensembles, celui du menu « fromage ou dessert ».</p></div>
<div class="why"><p>Être dans exactement un des deux, c’est être dans au moins un (<i>A</i> ∪ <i>B</i>) sans être dans les deux (<i>A</i> ∩ <i>B</i>). D’où une seconde écriture : <b><i>A</i> Δ <i>B</i> = (<i>A</i> ∪ <i>B</i>) ∖ (<i>A</i> ∩ <i>B</i>)</b>.</p></div>
<div class="ex"><p>Avec <i>A</i> = {1 ; 2 ; 3 ; 4} et <i>B</i> = {3 ; 4 ; 5 ; 6} : <i>A</i> ∖ <i>B</i> = {1 ; 2}, <i>B</i> ∖ <i>A</i> = {5 ; 6}, donc <i>A</i> Δ <i>B</i> = {1 ; 2 ; 5 ; 6}. On retrouve bien {1, …, 6} privé de {3 ; 4}.</p></div>`,
   note:'A ∖ B et B ∖ A sont en général différents : la différence n’est pas commutative. La différence symétrique, elle, l’est : A Δ B = B Δ A.'},
  {h:'Colorie A Δ B',p:'Allume les régions du diagramme qui forment <i>A</i> Δ <i>B</i>.',
   params:[{id:'a',l:'A seul',min:0,max:1,v:0},{id:'ab',l:'A ∩ B',min:0,max:1,v:1},{id:'b',l:'B seul',min:0,max:1,v:0},{id:'o',l:'Hors de A ∪ B',min:0,max:1,v:0}],
   draw:v=>venn(v),ok:v=>v.a===1&&v.ab===0&&v.b===1&&v.o===0,
   why:'A Δ B contient les éléments d’un seul des deux ensembles : les régions « A seul » et « B seul ». Le milieu A ∩ B est exclu, l’extérieur aussi.'},
  {h:'Cardinal d’une différence symétrique',p:'Dans un ensemble fini, card <i>A</i> = 12, card <i>B</i> = 9 et card(<i>A</i> ∩ <i>B</i>) = 4. Combien d’éléments a <i>A</i> Δ <i>B</i>&nbsp;?',lab:'card(A Δ B) =',ans:13,
   why:'card(A ∖ B) = 12 − 4 = 8 et card(B ∖ A) = 9 − 4 = 5, deux ensembles disjoints : 8 + 5 = 13. Autrement dit card(A Δ B) = card A + card B − 2 card(A ∩ B).'},
  {h:'Compter une réunion',p:`<p>Dans une classe, 12 élèves font du foot et 9 du tennis. Combien pratiquent au moins un des deux sports ? Pas forcément 21 : ceux qui font les deux seraient comptés deux fois.</p>
<div class="thm"><p><b>Formule d’inclusion-exclusion.</b> Pour deux parties finies <i>A</i> et <i>B</i> :<br><b>card(<i>A</i> ∪ <i>B</i>) = card <i>A</i> + card <i>B</i> − card(<i>A</i> ∩ <i>B</i>)</b>.<br>Si <i>A</i> et <i>B</i> sont disjointes, il reste card(<i>A</i> ∪ <i>B</i>) = card <i>A</i> + card <i>B</i>.</p></div>
<div class="why"><p><i>A</i> ∪ <i>B</i> se découpe en trois morceaux disjoints : <i>A</i> ∖ <i>B</i>, <i>A</i> ∩ <i>B</i> et <i>B</i> ∖ <i>A</i>. Dans card <i>A</i> + card <i>B</i>, le morceau du milieu est compté deux fois, une fois dans <i>A</i> et une fois dans <i>B</i> : on le retire une fois.</p></div>
<div class="ex"><p>12 au foot, 9 au tennis, 4 qui font les deux : card(<i>A</i> ∪ <i>B</i>) = 12 + 9 − 4 = 17 élèves. Par morceaux : 8 font seulement du foot, 4 les deux, 5 seulement du tennis, et 8 + 4 + 5 = 17. La différence symétrique en compte 17 − 4 = 13, comme dans l’exercice précédent.</p></div>
<div class="prop"><p>Dans <i>E</i> fini : card(<i>A</i>ᶜ) = card <i>E</i> − card <i>A</i>, car <i>E</i> est l’union disjointe de <i>A</i> et <i>A</i>ᶜ ; et card(<i>A</i> ∖ <i>B</i>) = card <i>A</i> − card(<i>A</i> ∩ <i>B</i>), car <i>A</i> est l’union disjointe de <i>A</i> ∖ <i>B</i> et <i>A</i> ∩ <i>B</i>.</p></div>`},
  {h:'Les règles de calcul',p:`<p>Pour simplifier une expression d’ensembles, on ne veut pas repasser à chaque fois par les éléments. On utilise des <b>règles de calcul</b>, comme pour les nombres avec + et ×.</p>
<div class="prop"><p>Pour toutes parties <i>A</i>, <i>B</i>, <i>C</i> de <i>E</i>, les égalités du tableau sont vraies. On y lit l’union comme une « addition », l’intersection comme une « multiplication », ∅ et <i>E</i> comme leurs neutres.</p></div>
<div class="why"><p>Chaque règle d’ensembles est une règle logique déguisée. <i>x</i> ∈ <i>A</i> ∩ (<i>B</i> ∪ <i>C</i>) veut dire « <i>x</i> ∈ <i>A</i> et (<i>x</i> ∈ <i>B</i> ou <i>x</i> ∈ <i>C</i>) », ce qui revient à « (<i>x</i> ∈ <i>A</i> et <i>x</i> ∈ <i>B</i>) ou (<i>x</i> ∈ <i>A</i> et <i>x</i> ∈ <i>C</i>) » : c’est la distributivité. De Morgan pour les ensembles vient de De Morgan pour « et » et « ou ». Et <i>A</i> ∪ ∅ = <i>A</i> parce que « <i>x</i> ∈ ∅ » est toujours faux.</p></div>
<div class="ex"><p>Simplifions (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>B</i>ᶜ). Distributivité : <i>A</i> ∩ (<i>B</i> ∪ <i>B</i>ᶜ). Complémentaire : <i>A</i> ∩ <i>E</i>. Neutre : <i>A</i>. Un élément de <i>A</i> est dans <i>B</i> ou hors de <i>B</i>, et ce découpage redonne <i>A</i> en entier.</p></div>
<div class="warn"><p>Le tableau ne contient pas ∖ ni Δ : pour les traiter, on écrit d’abord <i>A</i> ∖ <i>B</i> = <i>A</i> ∩ <i>B</i>ᶜ. Et <i>A</i> ∖ <i>B</i> ≠ <i>B</i> ∖ <i>A</i> en général.</p></div>`,
   fig:tab(['Règle','Pour ∪','Pour ∩'],[
     ['commutativité','A ∪ B = B ∪ A','A ∩ B = B ∩ A'],
     ['associativité','(A ∪ B) ∪ C = A ∪ (B ∪ C)','(A ∩ B) ∩ C = A ∩ (B ∩ C)'],
     ['idempotence','A ∪ A = A','A ∩ A = A'],
     ['neutre','A ∪ ∅ = A','A ∩ E = A'],
     ['absorbant','A ∪ E = E','A ∩ ∅ = ∅'],
     ['complémentaire','A ∪ Aᶜ = E','A ∩ Aᶜ = ∅'],
     ['distributivité','A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)','A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)'],
     ['De Morgan','(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ','(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ'],
     ['absorption','A ∪ (A ∩ B) = A','A ∩ (A ∪ B) = A']]),
   note:'Différence avec les nombres : <b>les deux</b> distributivités sont vraies, alors que a + (b · c) ≠ (a + b)(a + c) en général. Et (Aᶜ)ᶜ = A.'},
  {kind:'Méthode',h:'Prouver une égalité par une table d’appartenance',
   p:'<b>Quand :</b> une égalité entre expressions formées avec ∪, ∩, ᶜ, ∖, Δ à partir de quelques parties <i>A</i>, <i>B</i>, <i>C</i>. <b>Pourquoi ça marche :</b> un élément <i>x</i> de <i>E</i> est dans <i>A</i> ou non, dans <i>B</i> ou non, dans <i>C</i> ou non : 2³ = 8 situations, les 8 régions du diagramme. Savoir si <i>x</i> appartient à une expression ne dépend que de cette situation. <b>Comment :</b><ol><li>une ligne par situation, avec 1 (dedans) ou 0 (dehors) pour <i>A</i>, <i>B</i>, <i>C</i> ;</li><li>une colonne par sous-expression, calculée avec les règles « ou », « et », « non » ;</li><li>si les colonnes des deux membres sont identiques, l’égalité est prouvée. Une ligne qui diffère donne un contre-exemple.</li></ol>',
   demo:{enonce:'Démontre que <i>A</i> ∖ (<i>B</i> ∪ <i>C</i>) = (<i>A</i> ∖ <i>B</i>) ∩ (<i>A</i> ∖ <i>C</i>).',
    etapes:[{f:'8 lignes (<i>A</i>, <i>B</i>, <i>C</i>) de 111 à 000.',w:'Trois parties, donc 2³ situations.'},
     {f:'Membre de gauche : <i>x</i> y est si <i>A</i> = 1 et <i>B</i> ∪ <i>C</i> = 0, donc seulement sur la ligne 100.',w:'B ∪ C vaut 0 seulement si B = 0 et C = 0.'},
     {f:'Membre de droite : il faut <i>x</i> ∈ <i>A</i> ∖ <i>B</i> (<i>A</i> = 1, <i>B</i> = 0) et <i>x</i> ∈ <i>A</i> ∖ <i>C</i> (<i>A</i> = 1, <i>C</i> = 0) : seulement sur la ligne 100.',w:'Le « et » demande les deux conditions en même temps.'},
     {f:'Les deux colonnes valent 1 sur la seule ligne 100 et 0 ailleurs.',w:'Colonnes identiques : égalité prouvée.'}],
    conclusion:'<b><i>A</i> ∖ (<i>B</i> ∪ <i>C</i>) = (<i>A</i> ∖ <i>B</i>) ∩ (<i>A</i> ∖ <i>C</i>)</b>. C’est une loi de De Morgan « relative à <i>A</i> ».'+tab(['A','B','C','A ∖ (B ∪ C)','(A ∖ B) ∩ (A ∖ C)'],[[1,1,1],[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]].map(([a,b,c])=>[a,b,c,+(a&&!b&&!c),+((a&&!b)&&(a&&!c))]),3)},
   note:'La table d’appartenance est la table de vérité des propositions « x ∈ A », « x ∈ B », « x ∈ C ».'},
  {h:'Une ligne de la table',p:`<p>La table d’appartenance de trois parties <i>A</i>, <i>B</i>, <i>C</i> a 8 lignes. Cette figure en montre une à la fois, sous la forme d’un point posé dans une région du diagramme : c’est la même information, vue autrement.</p>
<div class="idea"><p>Les trois curseurs disent où se trouve l’élément <i>x</i> : dans <i>A</i> ou non, dans <i>B</i> ou non, dans <i>C</i> ou non. Chaque combinaison correspond à une des 8 régions du diagramme, la région « hors des trois » comprise. La zone coloriée est le membre de gauche de l’identité choisie ; l’encadré calcule les deux membres pour ton <i>x</i>.</p></div>
<div class="ex"><p>Identité <i>A</i> ∩ (<i>B</i> ∪ <i>C</i>) = (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>C</i>), avec <i>x</i> ∈ <i>A</i>, <i>x</i> ∉ <i>B</i>, <i>x</i> ∈ <i>C</i> (la ligne 1, 0, 1). À gauche : <i>x</i> ∈ <i>B</i> ∪ <i>C</i>, donc <i>x</i> ∈ <i>A</i> ∩ (<i>B</i> ∪ <i>C</i>). À droite : <i>x</i> ∉ <i>A</i> ∩ <i>B</i>, mais <i>x</i> ∈ <i>A</i> ∩ <i>C</i>, donc <i>x</i> est dans l’union. Même réponse : V et V.</p></div>
<div class="why"><p>Huit vérifications suffisent, car deux éléments placés dans la même région se comportent de la même façon vis-à-vis de toute expression en <i>A</i>, <i>B</i>, <i>C</i>. Passe les trois identités en revue sur les 8 positions.</p></div>`,
   params:[{id:'e',l:'Identité',min:0,max:2,v:0},{id:'a',l:'x ∈ A ?',min:0,max:1,v:1},{id:'b',l:'x ∈ B ?',min:0,max:1,v:0},{id:'c',l:'x ∈ C ?',min:0,max:1,v:1}],
   draw:v=>{ const L=[(a,b,c)=>a&&(b||c),(a,b,c)=>a||(b&&c),(a,b,c)=>a&&!(b||c)][v.e]; return venn3(regions3(L),{dot:key3(v.a,v.b,v.c)}); },
   info:v=>{ const a=!!v.a,b=!!v.b,c=!!v.c, I=[['A ∩ (B ∪ C)','(A ∩ B) ∪ (A ∩ C)',a&&(b||c),(a&&b)||(a&&c)],['A ∪ (B ∩ C)','(A ∪ B) ∩ (A ∪ C)',a||(b&&c),(a||b)&&(a||c)],['A ∖ (B ∪ C)','(A ∖ B) ∩ (A ∖ C)',a&&!(b||c),(a&&!b)&&(a&&!c)]][v.e];
     return `x ∈ ${I[0]} : ${VF(I[2])} &nbsp; x ∈ ${I[1]} : ${VF(I[3])}`; },
   note:'Les 8 positions du point sont les 8 lignes de la table d’appartenance. Si une seule position donnait deux réponses différentes, l’identité serait fausse.'},
  {h:'Une fausse identité',p:'Une seule de ces égalités est <b>fausse</b> en général. Laquelle&nbsp;?',
   opts:['<i>A</i> ∪ (<i>B</i> ∩ <i>C</i>) = (<i>A</i> ∪ <i>B</i>) ∩ (<i>A</i> ∪ <i>C</i>)','<i>A</i> ∖ (<i>B</i> ∩ <i>C</i>) = (<i>A</i> ∖ <i>B</i>) ∪ (<i>A</i> ∖ <i>C</i>)','<i>A</i> ∪ (<i>B</i> ∖ <i>C</i>) = (<i>A</i> ∪ <i>B</i>) ∖ <i>C</i>','(<i>A</i> ∩ <i>B</i>)ᶜ = <i>A</i>ᶜ ∪ <i>B</i>ᶜ'],ans:2,
   why:'Sur la ligne A = 1, B = 0, C = 1 : x ∈ A, donc x est dans le membre de gauche ; mais x ∈ C, donc x n’est pas dans (A ∪ B) ∖ C. Exemple : A = C = {1}, B = ∅ donne {1} à gauche et ∅ à droite.'},
  {h:'Colorie une expression à trois ensembles',p:'Allume les régions qui forment (<i>A</i> Δ <i>B</i>) ∩ <i>C</i>.',
   params:[['a','A seul'],['b','B seul'],['c','C seul'],['ab','A ∩ B sans C'],['ac','A ∩ C sans B'],['bc','B ∩ C sans A'],['abc','A ∩ B ∩ C'],['o','hors des trois']].map(([id,l])=>({id,l,min:0,max:1,v:0})),
   draw:v=>venn3(v),
   ok:v=>{ for(const k in R3){ const [a,b,c]=R3[k]; if(!!v[k]!==((a!==b)&&!!c)) return false; } return true; },
   why:'Il faut être dans C et dans exactement un des ensembles A, B : régions « A ∩ C sans B » et « B ∩ C sans A ». Le centre A ∩ B ∩ C est exclu car l’élément est dans A et dans B.'},
  {kind:'Méthode',h:'Prouver par éléments : la chaîne d’équivalences',
   p:'<b>Quand :</b> on veut une preuve rédigée qui vaut pour des parties quelconques, ou une identité avec une famille infinie, où la table d’appartenance ne suffit plus. <b>Comment :</b> on part de « <i>x</i> ∈ membre de gauche », on traduit chaque symbole par son connecteur (∪ → ou, ∩ → et, ᶜ → non, ∖ → et non), on transforme avec les règles logiques, puis on retraduit jusqu’à « <i>x</i> ∈ membre de droite ». Si chaque étape est une <b>équivalence</b> (⇔), les deux inclusions sont prouvées d’un coup.',
   demo:{enonce:'Démontre la loi de De Morgan (<i>A</i> ∪ <i>B</i>)ᶜ = <i>A</i>ᶜ ∩ <i>B</i>ᶜ.',
    etapes:[{f:'<i>x</i> ∈ (<i>A</i> ∪ <i>B</i>)ᶜ ⇔ non (<i>x</i> ∈ <i>A</i> ∪ <i>B</i>) ⇔ non (<i>x</i> ∈ <i>A</i> ou <i>x</i> ∈ <i>B</i>)',w:'On traduit le complémentaire, puis l’union.'},
     {f:'⇔ (<i>x</i> ∉ <i>A</i>) et (<i>x</i> ∉ <i>B</i>)',w:'Loi de De Morgan logique : non (P ou Q) = non P et non Q.'},
     {f:'⇔ <i>x</i> ∈ <i>A</i>ᶜ et <i>x</i> ∈ <i>B</i>ᶜ ⇔ <i>x</i> ∈ <i>A</i>ᶜ ∩ <i>B</i>ᶜ',w:'On retraduit en ensembles.'}],
    conclusion:'Chaque étape est une équivalence, donc les deux ensembles ont exactement les mêmes éléments : <b>(<i>A</i> ∪ <i>B</i>)ᶜ = <i>A</i>ᶜ ∩ <i>B</i>ᶜ</b>. La loi ensembliste n’est que la traduction de la loi logique.'},
   note:'Si une étape n’est qu’une implication (⇒), on n’obtient qu’une inclusion : il faut alors prouver l’autre séparément.'},
  {h:'Preuve guidée : A ∖ (A ∖ B)',p:'On démontre <i>A</i> ∖ (<i>A</i> ∖ <i>B</i>) = <i>A</i> ∩ <i>B</i>. On a écrit : <i>x</i> ∈ <i>A</i> ∖ (<i>A</i> ∖ <i>B</i>) ⇔ <i>x</i> ∈ <i>A</i> et non (<i>x</i> ∈ <i>A</i> et <i>x</i> ∉ <i>B</i>) ⇔ <i>x</i> ∈ <i>A</i> et (<i>x</i> ∉ <i>A</i> ou <i>x</i> ∈ <i>B</i>). Quelle est la suite correcte&nbsp;?',
   opts:['⇔ <i>x</i> ∈ <i>A</i> et <i>x</i> ∉ <i>B</i>, donc <i>x</i> ∈ <i>A</i> ∖ <i>B</i>','⇔ (<i>x</i> ∈ <i>A</i> et <i>x</i> ∉ <i>A</i>) ou (<i>x</i> ∈ <i>A</i> et <i>x</i> ∈ <i>B</i>) ⇔ <i>x</i> ∈ <i>A</i> et <i>x</i> ∈ <i>B</i>','⇔ <i>x</i> ∉ <i>A</i> ou <i>x</i> ∈ <i>B</i>, donc <i>x</i> ∈ <i>B</i>','⇔ <i>x</i> ∈ <i>A</i>, car <i>x</i> ∈ <i>A</i> et le reste est toujours vrai'],ans:1,
   why:'On distribue « et » sur « ou ». La première parenthèse « x ∈ A et x ∉ A » est toujours fausse ; il reste x ∈ A et x ∈ B, soit x ∈ A ∩ B.'},
  {kind:'Méthode',h:'Simplifier avec les règles',
   p:'<b>Quand :</b> une expression d’ensembles est longue et on veut sa forme la plus simple, sans repasser par les éléments. <b>Comment :</b><ol><li>remplace ∖ par ∩ ᶜ, et fais entrer les complémentaires avec De Morgan ;</li><li>regroupe les termes qui ont un facteur commun et <b>factorise</b> avec une distributivité ;</li><li>conclus avec <i>X</i> ∪ <i>X</i>ᶜ = <i>E</i>, <i>X</i> ∩ <i>X</i>ᶜ = ∅, les neutres et l’absorption.</li></ol>Contrôle toujours le résultat sur le diagramme.',
   demo:{enonce:'Simplifie (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>B</i>ᶜ) ∪ (<i>A</i>ᶜ ∩ <i>B</i>).',
    etapes:[{f:'(<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>B</i>ᶜ) = <i>A</i> ∩ (<i>B</i> ∪ <i>B</i>ᶜ) = <i>A</i> ∩ <i>E</i> = <i>A</i>',w:'On factorise A dans les deux premiers termes, grâce à l’associativité de ∪.'},
     {f:'Il reste <i>A</i> ∪ (<i>A</i>ᶜ ∩ <i>B</i>) = (<i>A</i> ∪ <i>A</i>ᶜ) ∩ (<i>A</i> ∪ <i>B</i>)',w:'Distributivité de ∪ sur ∩.'},
     {f:'= <i>E</i> ∩ (<i>A</i> ∪ <i>B</i>) = <i>A</i> ∪ <i>B</i>',w:'A ∪ Aᶜ = E et E est neutre pour ∩.'}],
    conclusion:'L’expression vaut <b><i>A</i> ∪ <i>B</i></b>. Sur le diagramme : les régions « A ∩ B », « A seul » et « B seul » forment bien A ∪ B.'}},
  {h:'Simplifie',p:'À quoi est égal (<i>A</i> ∪ <i>B</i>) ∩ <i>A</i>ᶜ&nbsp;?',
   opts:['<i>B</i>','<i>A</i> ∖ <i>B</i>','∅','<i>B</i> ∖ <i>A</i>'],ans:3,
   why:'Distributivité : (A ∪ B) ∩ Aᶜ = (A ∩ Aᶜ) ∪ (B ∩ Aᶜ) = ∅ ∪ (B ∩ Aᶜ) = B ∖ A.'},
  {h:'Le contre-exemple qui tranche',p:'Un élève affirme : « pour toutes parties <i>A</i>, <i>B</i>, (<i>A</i> ∪ <i>B</i>) ∖ <i>B</i> = <i>A</i> ». Quel choix de <i>A</i> et <i>B</i> le réfute&nbsp;?',
   opts:['<i>A</i> = {1}, <i>B</i> = {2}','<i>A</i> = ∅, <i>B</i> = {1}','<i>A</i> = {1}, <i>B</i> = ∅','<i>A</i> = <i>B</i> = {1}'],ans:3,
   why:'Avec A = B = {1}, (A ∪ B) ∖ B = {1} ∖ {1} = ∅ ≠ A. Les autres choix donnent bien A : l’égalité vaut quand A et B sont disjoints. En général, (A ∪ B) ∖ B = A ∖ B.'},
  {h:'La différence symétrique, une loi remarquable',p:`<p>L’union ne se « défait » pas : connaissant <i>A</i> et <i>A</i> ∪ <i>X</i>, on ne retrouve pas toujours <i>X</i>. La différence symétrique, elle, se comporte comme une addition qu’on peut annuler.</p>
<div class="prop"><ul><li><b>Commutative</b> : <i>A</i> Δ <i>B</i> = <i>B</i> Δ <i>A</i> ;</li><li><b>associative</b> : (<i>A</i> Δ <i>B</i>) Δ <i>C</i> = <i>A</i> Δ (<i>B</i> Δ <i>C</i>) ;</li><li><b>∅ est neutre</b> : <i>A</i> Δ ∅ = <i>A</i> ;</li><li>chaque partie est <b>son propre opposé</b> : <i>A</i> Δ <i>A</i> = ∅.</li></ul></div>
<div class="why"><p><i>x</i> ∈ <i>A</i> Δ <i>B</i> exactement quand <i>x</i> est dans un nombre <b>impair</b> des deux ensembles. Appartenir à <i>X</i> Δ <i>C</i>, c’est appartenir à un seul des deux : la parité du compte change quand <i>x</i> ∈ <i>C</i>. Donc <i>x</i> ∈ (<i>A</i> Δ <i>B</i>) Δ <i>C</i> exactement quand <i>x</i> est dans un nombre impair des trois ensembles : les régions marquées 1 ou 3 sur la figure. Cette description ne dépend pas des parenthèses, d’où l’associativité. Avec ∅, aucun compte ne change ; avec <i>A</i> deux fois, chaque élément de <i>A</i> est compté deux fois, nombre pair.</p></div>
<div class="ex"><p><i>A</i> = {1 ; 2 ; 3}, <i>B</i> = {2 ; 3 ; 4}, <i>C</i> = {3 ; 4 ; 5}. 1 et 5 sont dans un seul ensemble, 2 et 4 dans deux, 3 dans les trois. Donc <i>A</i> Δ <i>B</i> Δ <i>C</i> = {1 ; 3 ; 5}. Vérification : <i>A</i> Δ <i>B</i> = {1 ; 4}, puis {1 ; 4} Δ {3 ; 4 ; 5} = {1 ; 3 ; 5}.</p></div>`,
   fig:venn3({a:1,b:1,c:1,abc:1},{els:{a:'1',b:'1',c:'1',ab:'2',ac:'2',bc:'2',abc:'3',o:'0'}}),
   note:'Ces propriétés feront de (𝒫(E), Δ) un exemple de <b>groupe</b>, la structure étudiée dans la partie suivante. Les chiffres de la figure indiquent dans combien d’ensembles se trouve chaque région.'},
  {h:'Trois ensembles, un Δ',p:'Dans <i>E</i> = {1, …, 10}, <i>A</i> = {1 ; 2 ; 3 ; 4 ; 5}, <i>B</i> = {2 ; 4 ; 6 ; 8 ; 10} et <i>C</i> = {1 ; 4 ; 9}. Combien d’éléments a <i>A</i> Δ <i>B</i> Δ <i>C</i>&nbsp;?',lab:'card =',ans:7,
   why:'On garde les éléments présents dans un nombre impair d’ensembles : 3 (A), 4 (A, B, C), 5 (A), 6 (B), 8 (B), 9 (C), 10 (B). 1 et 2 sont dans deux ensembles, 7 dans aucun. Total : 7.'},
  {h:'Unions et intersections d’une famille',p:`<p>Avec deux parties, « ou » et « et » suffisent. Mais on rencontre des familles entières, parfois infinies, comme tous les intervalles [1/<i>k</i> ; 3 − 1/<i>k</i>] pour <i>k</i> = 1, 2, 3… On généralise en remplaçant « ou » par « il existe » et « et » par « pour tout ».</p>
<div class="def"><p>Une <b>famille</b> (<i>A<sub>i</sub></i>)<sub><i>i</i> ∈ <i>I</i></sub> associe une partie <i>A<sub>i</sub></i> à chaque indice <i>i</i> d’un ensemble <i>I</i>. On pose<br><b>⋃<sub><i>i</i> ∈ <i>I</i></sub> <i>A<sub>i</sub></i></b> = {<i>x</i> : <b>∃<i>i</i> ∈ <i>I</i></b>, <i>x</i> ∈ <i>A<sub>i</sub></i>} et <b>⋂<sub><i>i</i> ∈ <i>I</i></sub> <i>A<sub>i</sub></i></b> = {<i>x</i> : <b>∀<i>i</i> ∈ <i>I</i></b>, <i>x</i> ∈ <i>A<sub>i</sub></i>}.</p></div>
<div class="idea"><p>Un point est dans l’union s’il est dans <b>au moins un</b> ensemble de la famille, dans l’intersection s’il est dans <b>tous</b>. Pour <i>I</i> = {1 ; 2}, on retrouve <i>A</i>₁ ∪ <i>A</i>₂ et <i>A</i>₁ ∩ <i>A</i>₂.</p></div>
<div class="ex"><p><i>A<sub>k</sub></i> = [1/<i>k</i> ; 3 − 1/<i>k</i>] : <i>A</i>₁ = [1 ; 2], <i>A</i>₂ = [0,5 ; 2,5], <i>A</i>₄ = [0,25 ; 2,75]. Ils grossissent, et leur union est ]0 ; 3[ : tout <i>x</i> de ]0 ; 3[ finit par être couvert, mais 0 et 3 jamais. À l’inverse, les <i>C<sub>k</sub></i> = ]−1/<i>k</i> ; 1/<i>k</i>[ rétrécissent, et seul 0 est dans tous : ⋂ <i>C<sub>k</sub></i> = {0}. Observe les deux familles avec les curseurs.</p></div>`,
   params:[{id:'f',l:'Famille (0 = union des A, 1 = intersection des C)',min:0,max:1,v:0},{id:'N',l:'k va de 1 à N',min:1,max:8,v:2}],
   draw:v=>{ const P=plane({x:[-1.4,3.4],y:[-1.6,8.8],grid:false,axes:false,h:230});
     P.seg(-1.4,-0.6,3.4,-0.6,{c:'var(--muted)',w:1.5}); [-1,0,1,2,3].forEach(t=>{ P.seg(t,-0.75,t,-0.45,{c:'var(--muted)',w:1.5}).text(t,-0.6,fmt(t),{a:'middle',dy:16,s:11,c:'var(--muted)'}); });
     const iv=k=>v.f?[-1/k,1/k,false]:[1/k,3-1/k,true];
     for(let k=1;k<=v.N;k++){ const [a,b,cl]=iv(k); P.seg(a,k,b,k,{c:'var(--math)',w:3}); const q={r:4,c:cl?'var(--math)':'var(--surface)'}; P.dot(a,k,q).dot(b,k,q); P.text(3.3,k,`k=${k}`,{a:'end',dy:4,s:10,c:'var(--muted)'}); }
     const [a,b,cl]=iv(v.N); P.seg(a,0.15,b,0.15,{c:'var(--spark)',w:6}); const q={r:5,c:cl?'var(--spark)':'var(--surface)'}; P.dot(a,0.15,q).dot(b,0.15,q);
     return P.svg(); },
   info:v=>v.f?`C₁ ∩ … ∩ C<sub>${v.N}</sub> = C<sub>${v.N}</sub> = ]−${fmt(1/v.N,3)} ; ${fmt(1/v.N,3)}[ (en orange). Sur toute la famille : ⋂ C<sub>k</sub> = {0}.`:`A₁ ∪ … ∪ A<sub>${v.N}</sub> = A<sub>${v.N}</sub> = [${fmt(1/v.N,3)} ; ${fmt(3-1/v.N,3)}] (en orange). Sur toute la famille : ⋃ A<sub>k</sub> = ]0 ; 3[.`,
   note:'Les bornes 0 et 3 ne sont atteintes par aucun A_k : l’union infinie de fermés est ici un intervalle ouvert. Et l’intersection d’ouverts ]−1/k ; 1/k[ se réduit au seul point 0.'},
  {kind:'Méthode',h:'Calculer l’union ou l’intersection d’une famille',
   p:'<b>Comment :</b><ol><li><b>Conjecture</b> le résultat <i>R</i> en dessinant quelques ensembles de la famille ;</li><li>prouve chaque inclusion par éléments, en traduisant ⋃ par « il existe un indice » et ⋂ par « pour tout indice » ;</li><li>pour exclure un point d’une intersection, il suffit d’<b>un</b> indice où il manque ; pour mettre un point dans une union, il suffit d’<b>un</b> indice où il est.</li></ol>Avec des bornes en 1/<i>n</i>, l’outil clé est : pour tout réel <i>a</i> &gt; 0, il existe un entier <i>n</i> ≥ 1 avec 1/<i>n</i> &lt; <i>a</i> (prends <i>n</i> &gt; 1/<i>a</i>).',
   demo:{enonce:'Montre que ⋂<sub><i>n</i> ≥ 1</sub> ]−1/<i>n</i> ; 1/<i>n</i>[ = {0}.',
    etapes:[{f:'{0} ⊂ ⋂ : pour tout <i>n</i> ≥ 1, −1/<i>n</i> &lt; 0 &lt; 1/<i>n</i>, donc 0 est dans chaque intervalle.',w:'Pour être dans l’intersection, il faut être dans tous les ensembles.'},
     {f:'⋂ ⊂ {0} par contraposée : soit <i>x</i> ≠ 0, donc |<i>x</i>| &gt; 0. Il existe <i>n</i> avec 1/<i>n</i> &lt; |<i>x</i>|.',w:'Un réel non nul a une distance strictement positive à 0, que 1/n finit par battre.'},
     {f:'Pour cet <i>n</i>, <i>x</i> ∉ ]−1/<i>n</i> ; 1/<i>n</i>[, donc <i>x</i> ∉ ⋂.',w:'Un seul indice où x manque suffit à l’exclure.'}],
    conclusion:'<b>⋂ ]−1/<i>n</i> ; 1/<i>n</i>[ = {0}</b>. Une intersection infinie d’intervalles ouverts n’est pas forcément un intervalle ouvert.'}},
  {h:'Une union infinie',p:'Que vaut ⋃<sub><i>n</i> ≥ 1</sub> [1/<i>n</i> ; 1]&nbsp;?',
   opts:['[0 ; 1]','{1}',']0 ; 1]',']0 ; 1['],ans:2,
   why:'0 n’est dans aucun [1/n ; 1], car 1/n > 0. Si 0 < x ≤ 1, on choisit n ≥ 1/x : alors 1/n ≤ x ≤ 1 et x ∈ [1/n ; 1]. 1 est dans tous les intervalles. L’union est ]0 ; 1].'},
  {h:'De Morgan pour une famille',p:'Les lois de De Morgan s’étendent : (⋃ <i>A<sub>i</sub></i>)ᶜ = ⋂ <i>A<sub>i</sub></i>ᶜ. Dans ℝ, avec <i>A<sub>n</sub></i> = [<i>n</i> ; <i>n</i> + 1[ pour <i>n</i> ∈ ℕ, que vaut (⋃ <i>A<sub>n</sub></i>)ᶜ&nbsp;?',
   opts:['∅',']−∞ ; 0]','ℝ ∖ ℕ',']−∞ ; 0['],ans:3,
   why:'Les intervalles [0 ; 1[, [1 ; 2[, … recouvrent [0 ; +∞[ : chaque x ≥ 0 est dans [n ; n + 1[ avec n sa partie entière. Le complémentaire est ]−∞ ; 0[, c’est aussi l’ensemble des réels qui ne sont dans aucun Aₙ.'},
  {h:'Une intersection finie',p:'Pour <i>n</i> = 1, …, 10, on pose <i>B<sub>n</sub></i> = {<i>n</i> ; <i>n</i> + 1 ; … ; 20}. Combien d’éléments a <i>B</i>₁ ∩ <i>B</i>₂ ∩ … ∩ <i>B</i>₁₀&nbsp;?',lab:'card =',ans:11,
   why:'La famille est décroissante : B₁ ⊃ B₂ ⊃ … ⊃ B₁₀. L’intersection est donc B₁₀ = {10 ; 11 ; … ; 20}, qui a 20 − 10 + 1 = 11 éléments.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul><li>∪ traduit « ou », ∩ traduit « et », ᶜ traduit « non » ; <i>A</i> et <i>B</i> sont disjointes si <i>A</i> ∩ <i>B</i> = ∅.</li><li><i>A</i> ∖ <i>B</i> = <i>A</i> ∩ <i>B</i>ᶜ ; <i>A</i> Δ <i>B</i> = (<i>A</i> ∖ <i>B</i>) ∪ (<i>B</i> ∖ <i>A</i>) = (<i>A</i> ∪ <i>B</i>) ∖ (<i>A</i> ∩ <i>B</i>).</li><li>card(<i>A</i> ∪ <i>B</i>) = card <i>A</i> + card <i>B</i> − card(<i>A</i> ∩ <i>B</i>) ; card(<i>A</i> Δ <i>B</i>) = card <i>A</i> + card <i>B</i> − 2 card(<i>A</i> ∩ <i>B</i>) ; card <i>A</i>ᶜ = card <i>E</i> − card <i>A</i>.</li><li>Règles : commutativité, associativité, les <b>deux</b> distributivités, De Morgan (<i>A</i> ∪ <i>B</i>)ᶜ = <i>A</i>ᶜ ∩ <i>B</i>ᶜ et (<i>A</i> ∩ <i>B</i>)ᶜ = <i>A</i>ᶜ ∪ <i>B</i>ᶜ, absorption.</li><li><b>Table d’appartenance</b> : 2<sup><i>n</i></sup> lignes pour <i>n</i> parties ; colonnes identiques = égalité, une ligne différente = contre-exemple.</li><li><b>Preuve par éléments</b> : chaîne d’équivalences de « <i>x</i> ∈ gauche » à « <i>x</i> ∈ droite ».</li><li><b>Δ</b> : commutative, associative, neutre ∅, <i>A</i> Δ <i>A</i> = ∅ ; <i>x</i> ∈ <i>A</i> Δ <i>B</i> Δ <i>C</i> ⇔ <i>x</i> est dans un nombre impair des trois.</li><li><b>Familles</b> : ⋃ traduit ∃<i>i</i>, ⋂ traduit ∀<i>i</i> ; (⋃ <i>A<sub>i</sub></i>)ᶜ = ⋂ <i>A<sub>i</sub></i>ᶜ.</li></ul></div>`},
  {kind:'Problème',h:'Multiples de 2 et de 3',
   p:'Dans <i>E</i> = {1, …, 12}, on note <i>A</i> l’ensemble des multiples de 2 et <i>B</i> celui des multiples de 3. On veut calculer les cardinaux de plusieurs combinaisons, en utilisant les règles du chapitre plutôt qu’en tout recomptant.',
   parts:[
    {q:'a) Combien d’éléments a <i>A</i> ∪ <i>B</i>&nbsp;?',lab:'card =',ans:8,hint:'A a 6 éléments, B en a 4. Lesquels sont comptés deux fois ?',why:'A ∩ B = {6 ; 12}. card(A ∪ B) = 6 + 4 − 2 = 8.'},
    {q:'b) Combien d’éléments a <i>A</i> Δ <i>B</i>&nbsp;?',lab:'card =',ans:6,hint:'A Δ B = (A ∪ B) ∖ (A ∩ B).',why:'8 − 2 = 6 : A Δ B = {2 ; 3 ; 4 ; 8 ; 9 ; 10}.'},
    {q:'c) Combien d’éléments a <i>A</i>ᶜ ∩ <i>B</i>ᶜ&nbsp;?',lab:'card =',ans:4,hint:'Utilise une loi de De Morgan pour te ramener au a).',why:'Aᶜ ∩ Bᶜ = (A ∪ B)ᶜ, qui a 12 − 8 = 4 éléments : {1 ; 5 ; 7 ; 11}.'},
    {q:'d) Quelle identité justifie la formule card(<i>A</i> Δ <i>B</i>) = card <i>A</i> + card <i>B</i> − 2 card(<i>A</i> ∩ <i>B</i>)&nbsp;?',opts:['A Δ B = A ∪ B','A Δ B = (A ∖ B) ∪ (B ∖ A), union disjointe, avec card(A ∖ B) = card A − card(A ∩ B)','A Δ B = (A ∩ B)ᶜ','A Δ B = Aᶜ ∪ Bᶜ'],ans:1,hint:'Découpe A Δ B en deux morceaux sans élément commun.',why:'A ∖ B et B ∖ A sont disjoints. card(A ∖ B) = card A − card(A ∩ B) et de même pour B ; on additionne.'},
   ],
   sol:'A = {2 ; 4 ; 6 ; 8 ; 10 ; 12} et B = {3 ; 6 ; 9 ; 12}, A ∩ B = {6 ; 12}. Donc card(A ∪ B) = 6 + 4 − 2 = <b>8</b>. Comme A Δ B = (A ∪ B) ∖ (A ∩ B) et A ∩ B ⊂ A ∪ B, card(A Δ B) = 8 − 2 = <b>6</b>. Par De Morgan, Aᶜ ∩ Bᶜ = (A ∪ B)ᶜ a 12 − 8 = <b>4</b> éléments : les nombres premiers avec 6. Enfin A Δ B est l’union disjointe de A ∖ B et B ∖ A, d’où card(A Δ B) = (6 − 2) + (4 − 2) = 6 = card A + card B − 2 card(A ∩ B).'},
  {kind:'Problème',h:'Résoudre une équation d’ensembles',
   p:'On fixe deux parties <i>A</i> et <i>B</i> de <i>E</i>, et on cherche toutes les parties <i>X</i> telles que <b><i>A</i> Δ <i>X</i> = <i>B</i></b>. On utilise les propriétés de Δ : associativité, <i>A</i> Δ ∅ = <i>A</i> et <i>A</i> Δ <i>A</i> = ∅. On compare ensuite avec l’équation <i>A</i> ∪ <i>X</i> = <i>B</i>, qui se comporte très différemment.',
   parts:[
    {q:'a) Si <i>A</i> Δ <i>X</i> = <i>B</i>, que vaut <i>X</i>&nbsp;?',opts:['X = B ∖ A','X = A ∪ B','X = A Δ B, car A Δ (A Δ X) = (A Δ A) Δ X = ∅ Δ X = X','X = A ∩ B'],ans:2,hint:'Applique « A Δ » aux deux membres, puis utilise l’associativité.',why:'A Δ B = A Δ (A Δ X) = (A Δ A) Δ X = ∅ Δ X = X. Réciproquement, X = A Δ B vérifie A Δ X = (A Δ A) Δ B = B : c’est l’unique solution.'},
    {q:'b) Avec <i>E</i> = {1, …, 8}, <i>A</i> = {1 ; 2 ; 3 ; 4} et <i>B</i> = {3 ; 4 ; 5 ; 6}, combien d’éléments a la solution <i>X</i>&nbsp;?',lab:'card X =',ans:4,hint:'Calcule A Δ B.',why:'X = A Δ B = {1 ; 2 ; 5 ; 6}, 4 éléments. Contrôle : A Δ X = {3 ; 4 ; 5 ; 6} = B.'},
    {q:'c) Avec <i>A</i> = {1 ; 2} et <i>B</i> = {1 ; 2 ; 3}, combien de parties <i>X</i> vérifient <i>A</i> ∪ <i>X</i> = <i>B</i>&nbsp;?',lab:'solutions :',ans:4,hint:'X doit être inclus dans B et contenir 3. Que dire de 1 et 2 ?',why:'X ⊂ B et 3 ∈ X (3 ∉ A) ; 1 et 2 sont libres car déjà dans A. 2² = 4 solutions : {3}, {1 ; 3}, {2 ; 3}, {1 ; 2 ; 3}.'},
    {q:'d) Avec <i>A</i> = {1 ; 2} et <i>B</i> = {3}, combien de parties <i>X</i> vérifient <i>A</i> ∪ <i>X</i> = <i>B</i>&nbsp;?',lab:'solutions :',ans:0,hint:'A ∪ X contient toujours A.',why:'A ⊂ A ∪ X, donc il faudrait A ⊂ B. Or 1 ∉ B : aucune solution. Avec ∪, on peut avoir 0 ou plusieurs solutions ; avec Δ, toujours exactement une.'},
   ],
   sol:'Pour Δ : si A Δ X = B, alors A Δ B = A Δ (A Δ X) = (A Δ A) Δ X = ∅ Δ X = X ; réciproquement X = A Δ B convient. L’équation a donc <b>une seule solution, X = A Δ B</b> : ici X = {1 ; 2 ; 5 ; 6}. Pour ∪ : A ∪ X = B exige A ⊂ B. Si c’est le cas, X doit contenir B ∖ A et être inclus dans B, les éléments de A étant libres : 2^card A solutions (4 dans l’exemple). Sinon, aucune. C’est parce que Δ possède un neutre et que chaque partie a un « opposé » (elle-même) qu’on peut « simplifier » comme dans une soustraction.'},
]},
/* ===================== 5. RECOUVREMENT, PARTITION, PRODUIT ===================== */
{subj:'gred',sem:'ens',id:'gred-partition',h:'Recouvrement, partition, produit cartésien',p:'Découper un ensemble en morceaux (recouvrement, partition), former des couples (produit cartésien), et reconnaître les parties d’un produit qui sont des pavés.',steps:[
  {h:'Recouvrir un ensemble',p:`<p>Pour couvrir un sol avec des tapis, on accepte qu’ils se chevauchent ; on veut seulement qu’aucun coin ne reste nu. C’est l’idée d’un recouvrement.</p>
<div class="def"><p>Une famille (<i>A<sub>i</sub></i>)<sub><i>i</i> ∈ <i>I</i></sub> de parties de <i>E</i> est un <b>recouvrement</b> de <i>E</i> si <b>⋃<sub><i>i</i> ∈ <i>I</i></sub> <i>A<sub>i</sub></i> = <i>E</i></b>.</p></div>
<div class="idea"><p>Chaque <i>A<sub>i</sub></i> est inclus dans <i>E</i>, donc leur union aussi. L’égalité demande seulement l’autre inclusion : <b>chaque élément de <i>E</i> est dans au moins un <i>A<sub>i</sub></i></b>. En quantificateurs : ∀<i>x</i> ∈ <i>E</i>, ∃<i>i</i> ∈ <i>I</i>, <i>x</i> ∈ <i>A<sub>i</sub></i>.</p></div>
<div class="ex"><p>Les intervalles ]−∞ ; 1] et [0 ; +∞[ recouvrent ℝ : un réel <i>x</i> ≤ 1 est dans le premier, un réel <i>x</i> &gt; 1 dans le second. Ils se chevauchent sur [0 ; 1], couvert deux fois, et ce n’est pas interdit. En revanche, dans {1, …, 10}, les pairs et les multiples de 3 ne recouvrent pas : 1, 5 et 7 ne sont dans aucun des deux.</p></div>
<div class="warn"><p>Pour réfuter un recouvrement, un seul élément oublié suffit : c’est un contre-exemple au « ∀<i>x</i> ».</p></div>`,
   fig:(()=>{ const P=plane({x:[-4,4],y:[-1,2],grid:false,axes:false,h:90}); P.seg(-4,0,4,0,{c:'var(--muted)',w:1.5}); [-3,-2,-1,0,1,2,3].forEach(t=>P.text(t,0,fmt(t),{a:'middle',dy:16,s:11,c:'var(--muted)'}));
     P.seg(-4,1.2,1,1.2,{c:'var(--math)',w:5}).dot(1,1.2,{r:5,c:'var(--math)'}).seg(0,0.6,4,0.6,{c:'var(--spark)',w:5}).dot(0,0.6,{r:5,c:'var(--spark)'}); return P.svg(); })(),
   note:'Un recouvrement ne demande rien sur les chevauchements. C’est la différence avec une partition.'},
  {h:'Partitionner : trois conditions',p:`<p>Ranger des objets dans des tiroirs, c’est mettre chaque objet dans un tiroir et un seul, sans tiroir vide. C’est une partition : un recouvrement sans chevauchement.</p>
<div class="def"><p>Une famille (<i>A<sub>i</sub></i>)<sub><i>i</i> ∈ <i>I</i></sub> de parties de <i>E</i> est une <b>partition</b> de <i>E</i> si :</p><ol><li>chaque <i>A<sub>i</sub></i> est <b>non vide</b> ;</li><li>les <i>A<sub>i</sub></i> sont <b>deux à deux disjoints</b> : <i>A<sub>i</sub></i> ∩ <i>A<sub>j</sub></i> = ∅ dès que <i>i</i> ≠ <i>j</i> ;</li><li>leur union est <i>E</i>.</li></ol><p>Les <i>A<sub>i</sub></i> s’appellent les <b>blocs</b> de la partition.</p></div>
<div class="idea"><p>Autrement dit, <b>chaque élément de <i>E</i> est dans exactement un bloc</b>. La condition 3 donne « au moins un », la condition 2 « au plus un ».</p></div>
<div class="ex"><p>Les pairs et les impairs forment une partition de ℤ : tout entier est l’un ou l’autre, jamais les deux. Dans <i>E</i> = {1, …, 6}, la famille {1 ; 4}, {2 ; 5}, {3 ; 6} est une partition. La famille {1 ; 2 ; 3}, {3 ; 4}, {5 ; 6} n’en est pas une : 3 est dans deux blocs.</p></div>
<div class="warn"><p>« Deux à deux disjoints » est plus fort que « sans élément commun à tous » : {1 ; 2}, {2 ; 3}, {1 ; 3} n’ont aucun élément commun aux trois, mais deux blocs se rencontrent toujours.</p></div>`,
   note:`La condition 1 évite de compter ∅ comme un bloc. Si <i>E</i> est fini, card <i>E</i> est la somme des cardinaux des blocs, puisque chaque élément est compté une fois et une seule.`},
  {kind:'Méthode',h:'Vérifier qu’une famille est une partition',
   p:'<b>Comment :</b> on contrôle les trois conditions, dans l’ordre le plus rapide. <ol><li>Un bloc vide ? Alors ce n’est pas une partition.</li><li>Un élément dans deux blocs ? Un seul suffit à réfuter la disjonction.</li><li>Un élément dans aucun bloc ? Un seul suffit à réfuter le recouvrement.</li></ol>Pour <b>prouver</b> que c’est une partition, on montre que chaque élément <i>x</i> de <i>E</i> tombe dans un bloc, et dans un seul. Souvent, c’est qu’un bloc est déterminé par une valeur calculée à partir de <i>x</i> (un reste, une somme, une parité).',
   demo:{enonce:'Dans <i>E</i> = {1, …, 9}, lesquelles de ces familles sont des partitions&nbsp;? 𝔉₁ = {{1 ; 4 ; 7}, {2 ; 5 ; 8}, {3 ; 6 ; 9}}, 𝔉₂ = {{1 ; 2 ; 3}, {3 ; 4 ; 5 ; 6}, {7 ; 8 ; 9}}, 𝔉₃ = {{1 ; 2}, {3 ; 4 ; 5}, {6 ; 7 ; 8}}.',
    etapes:[{f:'𝔉₁ : le bloc de <i>x</i> est donné par le reste de <i>x</i> dans la division par 3 (1, 2 ou 0). Chaque <i>x</i> a un seul reste : partition.',w:'Le bloc est déterminé par une valeur calculée à partir de x.'},
     {f:'𝔉₂ : 3 est dans {1 ; 2 ; 3} et dans {3 ; 4 ; 5 ; 6}. Pas disjoints : pas une partition.',w:'Un seul élément en double suffit.'},
     {f:'𝔉₃ : 9 n’est dans aucun bloc. Pas un recouvrement : pas une partition.',w:'Un seul élément oublié suffit.'}],
    conclusion:'Seule 𝔉₁ est une partition de <i>E</i>. 𝔉₂ est un recouvrement mais pas une partition ; 𝔉₃ est formée de blocs disjoints mais ne recouvre pas <i>E</i>.'}},
  {h:'Range dans les blocs',p:`Répartis les éléments de <i>E</i> = {1, …, 6} dans des blocs pour obtenir la partition selon le <b>reste dans la division par 3</b> : deux nombres sont dans le même bloc exactement quand ils ont le même reste.`,
   params:[1,2,3,4,5,6].map(n=>({id:'c'+n,l:`Bloc de ${n}`,min:1,max:3,v:1})),
   draw:v=>{ const col=['var(--accent)','var(--spark)','var(--ok)']; let s='<svg viewBox="0 0 320 190" width="320" role="img">';
     const cnt=[0,0,0];
     for(let b=0;b<3;b++) s+=`<rect x="${10+b*103}" y="28" width="94" height="150" rx="12" fill="${col[b]}" fill-opacity=".15" stroke="${col[b]}" stroke-width="2"/>`+tx(57+b*103,20,`Bloc ${b+1}`,'font-size="12" fill-opacity=".8"');
     for(let n=1;n<=6;n++){ const b=v['c'+n]-1, k=cnt[b]++, x=37+b*103+(k%2)*40, y=58+Math.floor(k/2)*42;
       s+=`<circle cx="${x}" cy="${y}" r="15" fill="var(--surface)" stroke="${col[b]}" stroke-width="2.5"/>`+tx(x,y+5,n); }
     return s+'</svg>'; },
   info:v=>{ const B=[[],[],[]]; for(let n=1;n<=6;n++) B[v['c'+n]-1].push(n); const L=B.filter(b=>b.length); return `${L.length} bloc${L.length>1?'s':''} non vide${L.length>1?'s':''} : ${L.map(b=>'{'+b.join(' ; ')+'}').join(', ')}`; },
   ok:v=>{ for(let i=1;i<=6;i++) for(let j=1;j<=6;j++) if((v['c'+i]===v['c'+j])!==(i%3===j%3)) return false; return true; },
   why:'Reste 1 : {1 ; 4}, reste 2 : {2 ; 5}, reste 0 : {3 ; 6}. Peu importe le numéro donné à chaque bloc : la partition, c’est la façon de grouper les éléments.'},
  {h:'Une partition de ℤ',p:'Laquelle de ces familles est une partition de ℤ&nbsp;?',
   opts:['ℕ et l’ensemble des entiers négatifs ou nuls','Les multiples de 2, les multiples de 3, et les autres entiers','Les entiers strictement positifs et les entiers strictement négatifs','Les multiples de 3, les entiers de la forme 3k + 1, et ceux de la forme 3k + 2'],ans:3,
   why:'Chaque entier a un seul reste 0, 1 ou 2 dans la division par 3. Les autres échouent : 0 est dans ℕ et dans les négatifs ou nuls ; 6 est multiple de 2 et de 3 ; 0 n’est ni strictement positif ni strictement négatif.'},
  {h:'Recouvrement ou partition ?',p:'Dans ℝ, la famille formée de ]−∞ ; 1] et [0 ; +∞[ est…',
   opts:['une partition','un recouvrement qui n’est pas une partition','ni l’un ni l’autre','une partition, car les deux intervalles sont non vides'],ans:1,
   why:'Tout réel est ≤ 1 ou ≥ 0 : c’est un recouvrement. Mais 0,5 est dans les deux intervalles, qui ne sont donc pas disjoints.'},
  {h:'Combien de partitions ?',p:`<p>Un même ensemble se partitionne de bien des façons : un seul gros bloc, que des singletons, ou tout ce qui se trouve entre les deux. Combien de partitions en tout ?</p>
<div class="idea"><p>Une partition est décrite par ses blocs seulement : ni l’ordre des blocs ni l’ordre à l’intérieur d’un bloc ne comptent. {1 ; 2} {3} et {3} {2 ; 1} sont la même partition. Pour compter sans doublon, on classe par nombre de blocs <i>k</i>, puis par tailles de blocs. Les barres de la figure donnent le nombre de partitions en <i>k</i> blocs ; leur somme est le total.</p></div>
<div class="ex"><p>Pour {1 ; 2 ; 3} : 1 partition en un bloc, 3 en deux blocs (l’élément isolé est 1, 2 ou 3), 1 en trois singletons, soit 5. Pour 4 éléments : 1 en un bloc ; en deux blocs, 4 de type 3 + 1 et 3 de type 2 + 2, soit 7 ; en trois blocs, on choisit la seule paire, 6 façons ; et 1 en quatre singletons. Total : 1 + 7 + 6 + 1 = 15.</p></div>
<div class="def"><p>Le nombre total de partitions d’un ensemble à <i>n</i> éléments est le <b>nombre de Bell</b> <i>B<sub>n</sub></i> : 1, 2, 5, 15, 52 pour <i>n</i> = 1, …, 5. Fais varier <i>n</i> pour voir les barres.</p></div>`,
   params:[{id:'n',l:'n = card E',min:1,max:5,v:3}],
   draw:v=>{ const S=[[1]]; for(let m=1;m<=5;m++){ S[m]=[]; for(let k=0;k<=m;k++) S[m][k]=k===0?(m===0?1:0):(k*(S[m-1][k]||0)+(S[m-1][k-1]||0)); }
     let s='<svg viewBox="0 0 320 200" width="320" role="img"><line x1="10" y1="170" x2="310" y2="170" stroke="var(--muted)" stroke-width="1.5"/>';
     for(let k=1;k<=v.n;k++){ const mx=Math.max(...S[v.n].slice(1)), h=Math.max(4,S[v.n][k]/mx*130), x=22+(k-1)*60; s+=`<rect x="${x}" y="${170-h}" width="42" height="${h}" rx="4" fill="var(--accent)" fill-opacity=".7"/>`+tx(x+21,165-h,S[v.n][k],'font-size="13"')+tx(x+21,188,`k = ${k}`,'font-size="12" fill="var(--muted)"'); }
     return s+'</svg>'; },
   info:v=>{ const parts=[]; const rec=(i,bl)=>{ if(i>v.n){ parts.push(bl.map(b=>'{'+b.join(',')+'}').join(' ')); return; } bl.forEach((b,j)=>{ b.push(i); rec(i+1,bl); b.pop(); }); bl.push([i]); rec(i+1,bl); bl.pop(); }; rec(1,[]);
     return `{1, …, ${v.n}} a <b>${parts.length}</b> partitions${v.n<=3?' : '+parts.join(' &nbsp;|&nbsp; '):'.'}`; },
   note:'La suite 1, 2, 5, 15, 52, 203… grandit très vite : avec 10 éléments, il y a déjà 115 975 partitions.'},
  {kind:'Méthode',h:'Compter les partitions d’un petit ensemble',
   p:'<b>Comment :</b> on classe les partitions par <b>nombre de blocs</b>, puis par <b>tailles des blocs</b>, et on compte chaque type. <b>Astuce pour 2 blocs :</b> on regarde le bloc qui contient un élément fixé, par exemple 1. Il suffit de choisir quels autres éléments l’accompagnent : 2<sup><i>n</i>−1</sup> choix, moins 1 car ils ne doivent pas tous y aller (l’autre bloc serait vide). D’où <b>2<sup><i>n</i>−1</sup> − 1 partitions en 2 blocs</b>.',
   demo:{enonce:'Compte les partitions de <i>E</i> = {<i>a</i> ; <i>b</i> ; <i>c</i> ; <i>d</i>}.',
    etapes:[{f:'1 bloc : {<i>abcd</i>}. Une seule.',w:'Tout dans le même bloc.'},
     {f:'2 blocs : tailles 3 + 1 (on choisit l’isolé : 4 façons) ou 2 + 2 (le partenaire de <i>a</i> : 3 façons). Total 7 = 2³ − 1.',w:'On contrôle avec l’astuce du bloc qui contient a.'},
     {f:'3 blocs : tailles 2 + 1 + 1. On choisit la paire : 6 façons ({<i>a</i> ; <i>b</i>}, {<i>a</i> ; <i>c</i>}, …).',w:'Une fois la paire choisie, les deux autres éléments sont seuls.'},
     {f:'4 blocs : {<i>a</i>}, {<i>b</i>}, {<i>c</i>}, {<i>d</i>}. Une seule.',w:'Chaque élément est seul.'}],
    conclusion:'1 + 7 + 6 + 1 = <b>15</b> partitions. Attention : l’ordre des blocs ne compte pas, {{<i>a</i> ; <i>b</i>}, {<i>c</i> ; <i>d</i>}} et {{<i>c</i> ; <i>d</i>}, {<i>a</i> ; <i>b</i>}} sont la même partition.'}},
  {h:'Partitions de {1 ; 2 ; 3}',p:'Combien de partitions possède l’ensemble {1 ; 2 ; 3}&nbsp;?',lab:'partitions :',ans:5,
   why:'1 bloc : 1 façon. 2 blocs : on choisit l’élément seul, 3 façons. 3 blocs : 1 façon. Total 1 + 3 + 1 = 5.'},
  {h:'Deux blocs',p:'Combien de partitions de {1 ; 2 ; 3 ; 4 ; 5} ont exactement <b>2</b> blocs&nbsp;?',lab:'partitions :',ans:15,
   why:'Le bloc contenant 1 reçoit une partie quelconque de {2 ; 3 ; 4 ; 5}, sauf cette partie tout entière (l’autre bloc serait vide) : 2⁴ − 1 = 15.'},
  {h:'Couple ou paire ?',p:`<p>Un point du plan a une abscisse et une ordonnée : (2 ; 5) et (5 ; 2) sont deux points différents. Or {2 ; 5} = {5 ; 2}. Il faut donc un objet qui retienne l’ordre : le couple.</p>
<div class="def"><p>Le <b>couple</b> (<i>a</i> ; <i>b</i>) a une <b>première composante</b> <i>a</i> et une <b>deuxième composante</b> <i>b</i>. Deux couples sont égaux quand leurs composantes le sont une à une :<br><b>(<i>a</i> ; <i>b</i>) = (<i>c</i> ; <i>d</i>) ⇔ <i>a</i> = <i>c</i> et <i>b</i> = <i>d</i></b>.<br>Plus généralement, un <b><i>n</i>-uplet</b> (<i>x</i>₁ ; … ; <i>x<sub>n</sub></i>) est une liste ordonnée de <i>n</i> composantes (un triplet pour <i>n</i> = 3).</p></div>
<div class="idea"><p>La paire est un sac, le couple une fiche à deux cases numérotées. Dans le sac, ni l’ordre ni les répétitions ne comptent ; dans les cases, les deux comptent.</p></div>
<div class="ex"><p>(1 ; 2) ≠ (2 ; 1), alors que {1 ; 2} = {2 ; 1}. Le couple (3 ; 3) a deux composantes égales, alors que {3 ; 3} = {3} est un singleton. Si (<i>x</i> + 1 ; 4) = (5 ; <i>y</i>), alors <i>x</i> + 1 = 5 et 4 = <i>y</i>, donc <i>x</i> = 4 et <i>y</i> = 4.</p></div>
<div class="warn"><p>Une égalité de paires ne s’identifie pas « dans l’ordre » : on traduit « chaque élément de l’une appartient à l’autre ».</p></div>`,
   note:'On peut définir le couple avec des ensembles : (a ; b) = {{a} ; {a ; b}}. Cette astuce retient bien l’ordre, car a est le seul élément commun aux deux morceaux.'},
  {h:'Égalité de couples',p:'Les réels <i>x</i> et <i>y</i> vérifient (2<i>x</i> ; <i>y</i> + 1) = (6 ; <i>x</i>). Que vaut <i>y</i>&nbsp;?',lab:'y =',ans:2,
   why:'Les composantes sont égales une à une : 2x = 6 donc x = 3, puis y + 1 = x = 3 donc y = 2.'},
  {h:'Égalité de paires',p:'Les réels <i>x</i> et <i>y</i> vérifient {<i>x</i> ; 3} = {5 ; <i>y</i>}. Que peut-on dire&nbsp;?',
   opts:['x = 3 et y = 5','x = 5 et y = 3, ou bien x = 3 et y = 5','Il n’y a aucune solution','x = 5 et y = 3, et c’est la seule possibilité'],ans:3,
   why:'3 est dans {5 ; y}, donc y = 3. Il reste {x ; 3} = {5 ; 3}, donc 5 ∈ {x ; 3}, d’où x = 5. Avec x = 3 et y = 5, on aurait {3} = {5}, ce qui est faux.'},
  {h:'Le produit cartésien en grille',p:`<p>Lancer deux dés, choisir un menu entrée-plat, repérer une case d’échiquier : chaque fois, un résultat est un <b>couple</b> formé d’un élément de chaque ensemble. Tous ces couples forment un nouvel ensemble.</p>
<div class="def"><p>Le <b>produit cartésien</b> de <i>E</i> et <i>F</i> est <b><i>E</i> × <i>F</i> = {(<i>x</i> ; <i>y</i>) : <i>x</i> ∈ <i>E</i> et <i>y</i> ∈ <i>F</i>}</b>, qu’on lit « <i>E</i> croix <i>F</i> ». Si <i>A</i> ⊂ <i>E</i> et <i>B</i> ⊂ <i>F</i>, la partie <i>A</i> × <i>B</i> de <i>E</i> × <i>F</i> s’appelle un <b>pavé</b> (ou rectangle).</p></div>
<div class="idea"><p>On dessine <i>E</i> × <i>F</i> en grille : <i>E</i> en abscisse, <i>F</i> en ordonnée, un point par couple, comme dans le repère du plan, qui est ℝ × ℝ = ℝ². Un pavé <i>A</i> × <i>B</i> est un bloc rectangulaire de points : les colonnes de <i>A</i> croisées avec les lignes de <i>B</i>. Ici <i>E</i> = {1, …, 5} et <i>F</i> = {1, …, 4} ; choisis <i>A</i> et <i>B</i>.</p></div>
<div class="ex"><p>{1 ; 2} × {<i>a</i> ; <i>b</i> ; <i>c</i>} = {(1 ; <i>a</i>) ; (1 ; <i>b</i>) ; (1 ; <i>c</i>) ; (2 ; <i>a</i>) ; (2 ; <i>b</i>) ; (2 ; <i>c</i>)} : 2 colonnes de 3 points, 6 couples. Avec <i>A</i> = {2 ; 3 ; 4} et <i>B</i> = {1 ; 2 ; 3}, le pavé a 3 · 3 = 9 points.</p></div>`,
   params:[{id:'a1',l:'A commence à',min:1,max:5,v:2},{id:'a2',l:'A finit à',min:1,max:5,v:4},{id:'b1',l:'B commence à',min:1,max:4,v:1},{id:'b2',l:'B finit à',min:1,max:4,v:3}],
   draw:v=>grid(5,4,(i,j)=>i>=v.a1&&i<=v.a2&&j>=v.b1&&j<=v.b2?2:0,{h:250}),
   info:v=>{ const na=Math.max(0,v.a2-v.a1+1), nb=Math.max(0,v.b2-v.b1+1), S=(a,b)=>a>b?'∅':a===b?`{${a}}`:`{${a}, …, ${b}}`;
     return `A = ${S(v.a1,v.a2)}, B = ${S(v.b1,v.b2)} : card(A × B) = ${na} · ${nb} = <b>${na*nb}</b> couples. En tout, card(E × F) = 5 · 4 = 20.`; },
   note:'<b>card(E × F) = card E · card F</b> : il y a card F couples dans chaque colonne. Si A ou B est vide, le pavé A × B est vide. Et E × F ≠ F × E dès que E ≠ F (avec E et F non vides).'},
  {kind:'Méthode',h:'Lister et compter un produit',
   p:'<b>Lister</b> <i>E</i> × <i>F</i> : pour chaque <i>x</i> de <i>E</i> (dans l’ordre), on écrit tous les couples (<i>x</i> ; <i>y</i>) avec <i>y</i> parcourant <i>F</i>. C’est le parcours de la grille colonne par colonne. <b>Compter :</b> card(<i>E</i> × <i>F</i>) = card <i>E</i> · card <i>F</i>. <b>Puissances :</b> <i>E</i><sup><i>n</i></sup> = <i>E</i> × … × <i>E</i> est l’ensemble des <i>n</i>-uplets d’éléments de <i>E</i>, et <b>card(<i>E</i><sup><i>n</i></sup>) = (card <i>E</i>)<sup><i>n</i></sup></b> : chaque composante se choisit indépendamment. <b>Avec une condition</b> sur le couple, on compte colonne par colonne.',
   demo:{enonce:'Liste <i>E</i> × <i>F</i> pour <i>E</i> = {<i>a</i> ; <i>b</i>} et <i>F</i> = {1 ; 2 ; 3}, compte {0 ; 1}³, puis compte les couples (<i>x</i> ; <i>y</i>) de {1, …, 4}² avec <i>x</i> &lt; <i>y</i>.',
    etapes:[{f:'<i>E</i> × <i>F</i> = {(<i>a</i> ; 1), (<i>a</i> ; 2), (<i>a</i> ; 3), (<i>b</i> ; 1), (<i>b</i> ; 2), (<i>b</i> ; 3)} : 2 · 3 = 6 couples.',w:'Colonne de a, puis colonne de b.'},
     {f:'{0 ; 1}³ contient les 2³ = 8 triplets (0 ; 0 ; 0), (0 ; 0 ; 1), …, (1 ; 1 ; 1).',w:'Ce sont exactement les codes « dedans / dehors » des parties d’un ensemble à 3 éléments.'},
     {f:'<i>x</i> &lt; <i>y</i> dans {1, …, 4}² : pour <i>x</i> = 1, 3 valeurs de <i>y</i> ; pour <i>x</i> = 2, 2 ; pour <i>x</i> = 3, 1 ; pour <i>x</i> = 4, 0. Total 6.',w:'On compte colonne par colonne. Contrôle : sur 16 couples, 4 sont sur la diagonale, et le reste se partage à égalité entre x < y et x > y : (16 − 4)/2 = 6.'}],
    conclusion:'6 couples, 8 triplets, et 6 couples au-dessus de la diagonale. Le lien {0 ; 1}<sup><i>n</i></sup> ↔ 𝒫(<i>E</i>) explique à nouveau la formule 2<sup><i>n</i></sup>.'}},
  {h:'Une puissance d’ensemble',p:'Combien d’éléments a {0 ; 1 ; 2}⁴&nbsp;?',lab:'card =',ans:81,
   why:'Chacune des 4 composantes prend 3 valeurs : 3⁴ = 81.'},
  {h:'Au-dessus de la diagonale',p:'On lance deux dés et on note le couple (<i>x</i> ; <i>y</i>) ∈ {1, …, 6}². Combien de couples vérifient <i>x</i> &lt; <i>y</i>&nbsp;?',lab:'couples :',ans:15,
   why:'Il y a 36 couples, dont 6 sur la diagonale x = y. Les 30 autres se partagent à égalité entre x < y et x > y : 15. Colonne par colonne : 5 + 4 + 3 + 2 + 1 + 0 = 15.'},
  {h:'Projeter sur les axes',p:`<p>Une partie quelconque <i>P</i> de <i>E</i> × <i>F</i> n’est pas forcément un pavé : pense à une diagonale. Pour la comparer au pavé le plus proche, on regarde son « ombre » sur chaque axe.</p>
<div class="def"><p>Pour <i>P</i> ⊂ <i>E</i> × <i>F</i>, la <b>première projection</b> est pr₁(<i>P</i>) = {<i>x</i> ∈ <i>E</i> : ∃<i>y</i> ∈ <i>F</i>, (<i>x</i> ; <i>y</i>) ∈ <i>P</i>}, l’ensemble des premières composantes des points de <i>P</i>. De même, la <b>deuxième projection</b> pr₂(<i>P</i>) rassemble les deuxièmes composantes.</p></div>
<div class="prop"><p><i>P</i> ⊂ pr₁(<i>P</i>) × pr₂(<i>P</i>), et ce pavé est le plus petit pavé qui contient <i>P</i>.</p></div>
<div class="why"><p>Si (<i>x</i> ; <i>y</i>) ∈ <i>P</i>, alors <i>x</i> ∈ pr₁(<i>P</i>) et <i>y</i> ∈ pr₂(<i>P</i>) par définition. Et si un pavé <i>A</i> × <i>B</i> contient <i>P</i>, chaque première composante d’un point de <i>P</i> est dans <i>A</i>, donc pr₁(<i>P</i>) ⊂ <i>A</i> ; de même pr₂(<i>P</i>) ⊂ <i>B</i>.</p></div>
<div class="ex"><p>La diagonale <i>D</i> = {(1 ; 1) ; (2 ; 2) ; (3 ; 3)} de {1 ; 2 ; 3}² a pour projections {1 ; 2 ; 3} et {1 ; 2 ; 3}. Le plus petit pavé qui la contient est la grille entière, 9 points, alors que <i>D</i> n’en a que 3 : <i>D</i> n’est pas un pavé.</p></div>`},
  {kind:'Méthode',h:'Reconnaître un pavé',
   p:'Pour une partie <i>P</i> de <i>E</i> × <i>F</i>, on note pr₁(<i>P</i>) l’ensemble des premières composantes et pr₂(<i>P</i>) celui des deuxièmes (les <b>projections</b>). On a toujours <i>P</i> ⊂ pr₁(<i>P</i>) × pr₂(<i>P</i>). <b>Critère :</b> <i>P</i> est un pavé si et seulement si <b><i>P</i> = pr₁(<i>P</i>) × pr₂(<i>P</i>)</b>. <b>Comment :</b> calcule les deux projections, puis compare les cardinaux : <i>P</i> est un pavé exactement quand card <i>P</i> = card pr₁(<i>P</i>) · card pr₂(<i>P</i>). Visuellement : dès que deux points sont dans <i>P</i>, les deux autres coins de leur rectangle doivent y être aussi.',
   demo:{enonce:'Dans {1 ; 2 ; 3} × {<i>a</i> ; <i>b</i>}, <i>P</i> = {(1 ; <i>a</i>), (1 ; <i>b</i>), (3 ; <i>a</i>), (3 ; <i>b</i>)} et <i>Q</i> = {(1 ; <i>a</i>), (2 ; <i>b</i>)} sont-ils des pavés&nbsp;?',
    etapes:[{f:'pr₁(<i>P</i>) = {1 ; 3}, pr₂(<i>P</i>) = {<i>a</i> ; <i>b</i>}. Le produit a 2 · 2 = 4 éléments, autant que <i>P</i>.',w:'P est inclus dans ce produit et a le même cardinal : ils sont égaux.'},
     {f:'Donc <i>P</i> = {1 ; 3} × {<i>a</i> ; <i>b</i>} est un pavé.',w:'Les colonnes 1 et 3 n’ont pas besoin d’être voisines.'},
     {f:'pr₁(<i>Q</i>) = {1 ; 2}, pr₂(<i>Q</i>) = {<i>a</i> ; <i>b</i>}, produit à 4 éléments, mais card <i>Q</i> = 2. Il manque (1 ; <i>b</i>) et (2 ; <i>a</i>).',w:'Les deux points de Q sont deux coins opposés d’un rectangle dont les deux autres coins manquent.'}],
    conclusion:'<i>P</i> est un pavé, <i>Q</i> n’en est pas un. La diagonale {(<i>x</i> ; <i>x</i>)} d’un ensemble à au moins deux éléments n’est jamais un pavé, pour la même raison.'}},
  {h:'Complète en pavé',p:`Dans {1 ; 2 ; 3}², les points (1 ; 1) et (3 ; 2) sont imposés (entourés). Allume les cases du <b>plus petit pavé</b> qui les contient.`,
   params:[[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]].map(([i,j])=>({id:`p${i}${j}`,l:`(${i} ; ${j})`,min:0,max:1,v:(i===1&&j===1)||(i===3&&j===2)?1:0})),
   draw:v=>grid(3,3,(i,j)=>v[`p${i}${j}`]?2:0,{h:250,nx:'E',ny:'E',ex:P=>{ P.circ(1,1,0.3,{c:'var(--spark)',w:3}).circ(3,2,0.3,{c:'var(--spark)',w:3}); }}),
   info:v=>{ const L=[]; for(let i=1;i<=3;i++) for(let j=1;j<=3;j++) if(v[`p${i}${j}`]) L.push(`(${i} ; ${j})`); return `${L.length} case${L.length>1?'s':''} : ${L.join(', ')||'aucune'}`; },
   ok:v=>{ const want=['p11','p12','p31','p32']; for(let i=1;i<=3;i++) for(let j=1;j<=3;j++){ const k=`p${i}${j}`; if(!!v[k]!==want.includes(k)) return false; } return true; },
   why:'Un pavé contenant (1 ; 1) et (3 ; 2) a 1 et 3 dans sa première projection, 1 et 2 dans la deuxième : il contient {1 ; 3} × {1 ; 2}. Ce produit est lui-même un pavé : (1 ; 1), (1 ; 2), (3 ; 1), (3 ; 2). La colonne 2 n’est pas nécessaire.'},
  {h:'Lequel est un pavé ?',p:'Laquelle de ces parties de {1 ; 2 ; 3}² est un pavé&nbsp;?',
   opts:['{(1 ; 1), (2 ; 2), (3 ; 3)}','{(1 ; 2), (2 ; 1)}','{(1 ; 1), (1 ; 2), (2 ; 1)}','{(1 ; 2), (1 ; 3), (2 ; 2), (2 ; 3)}'],ans:3,
   why:'Projections {1 ; 2} et {2 ; 3}, produit à 4 éléments, tous présents : c’est {1 ; 2} × {2 ; 3}. La diagonale a 3 éléments contre 9 dans le produit de ses projections ; les deux autres ont 2 et 3 éléments contre 4.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul><li><b>Recouvrement</b> de <i>E</i> : ⋃ <i>A<sub>i</sub></i> = <i>E</i>, chaque élément dans au moins un morceau ; les chevauchements sont permis.</li><li><b>Partition</b> : blocs non vides, deux à deux disjoints, d’union <i>E</i> ; chaque élément est dans exactement un bloc, et card <i>E</i> est la somme des cardinaux des blocs.</li><li>Réfuter une partition : un bloc vide, un élément dans deux blocs ou dans aucun. La prouver : un bloc déterminé par une valeur calculée (reste, parité…).</li><li>Nombre de partitions de <i>n</i> éléments : 1, 2, 5, 15, 52… ; en deux blocs : 2<sup><i>n</i> − 1</sup> − 1.</li><li><b>Couple</b> : (<i>a</i> ; <i>b</i>) = (<i>c</i> ; <i>d</i>) ⇔ <i>a</i> = <i>c</i> et <i>b</i> = <i>d</i> ; la <b>paire</b> ignore l’ordre.</li><li><b><i>E</i> × <i>F</i></b> : ensemble des couples ; card(<i>E</i> × <i>F</i>) = card <i>E</i> · card <i>F</i> et card(<i>E</i><sup><i>n</i></sup>) = (card <i>E</i>)<sup><i>n</i></sup>.</li><li><b>Pavé</b> <i>A</i> × <i>B</i> ; projections pr₁, pr₂ ; <i>P</i> est un pavé ⇔ <i>P</i> = pr₁(<i>P</i>) × pr₂(<i>P</i>) ⇔ card <i>P</i> = card pr₁(<i>P</i>) · card pr₂(<i>P</i>).</li></ul></div>`},
  {kind:'Problème',h:'La somme de deux dés',
   p:'On lance deux dés : un résultat est un couple (<i>x</i> ; <i>y</i>) de <i>E</i>² avec <i>E</i> = {1, …, 6}. Pour chaque entier <i>s</i>, on note <i>B<sub>s</sub></i> = {(<i>x</i> ; <i>y</i>) ∈ <i>E</i>² : <i>x</i> + <i>y</i> = <i>s</i>}. Sur la grille, chaque <i>B<sub>s</sub></i> est une diagonale descendante. On veut montrer que les <i>B<sub>s</sub></i> non vides forment une partition de <i>E</i>² et étudier leur forme.',
   fig:grid(6,6,(i,j)=>i+j===7?2:1,{h:260,nx:'x',ny:'y',fill:'var(--spark)'}),
   parts:[
    {q:'a) Combien d’ensembles <i>B<sub>s</sub></i> sont non vides&nbsp;?',lab:'blocs :',ans:11,hint:'Quelles sont la plus petite et la plus grande somme possibles ?',why:'s va de 1 + 1 = 2 à 6 + 6 = 12, et chaque valeur est atteinte : 11 blocs.'},
    {q:'b) Combien d’éléments a <i>B</i>₇ (en orange)&nbsp;?',lab:'card B₇ =',ans:6,hint:'Pour chaque x de 1 à 6, y = 7 − x est-il dans E ?',why:'(1 ; 6), (2 ; 5), (3 ; 4), (4 ; 3), (5 ; 2), (6 ; 1) : 6 couples.'},
    {q:'c) Pourquoi les <i>B<sub>s</sub></i> non vides forment-ils une partition de <i>E</i>²&nbsp;?',opts:['Parce qu’ils ont tous le même nombre d’éléments','Parce que chaque couple a une seule somme x + y, comprise entre 2 et 12 : il est dans exactement un bloc','Parce qu’il y en a 11','Parce que B₇ est le plus grand'],ans:1,hint:'Une partition, c’est « chaque élément est dans exactement un bloc ».',why:'Le bloc d’un couple est déterminé par sa somme : au moins un bloc (sa somme est entre 2 et 12), et au plus un (une seule somme). Les blocs n’ont d’ailleurs pas tous la même taille.'},
    {q:'d) <i>B</i>₇ est-il un pavé&nbsp;?',opts:['Oui, car c’est une partie de E²','Oui, c’est {1, …, 6} × {1, …, 6}','Non : ses projections sont E et E, dont le produit a 36 éléments, alors que card B₇ = 6','On ne peut pas savoir'],ans:2,hint:'Applique le critère des projections.',why:'pr₁(B₇) = pr₂(B₇) = E et card(E × E) = 36 ≠ 6. Par exemple (1 ; 6) et (6 ; 1) sont dans B₇, mais (1 ; 1) n’y est pas.'},
   ],
   sol:'Pour (x ; y) ∈ E², la somme x + y est un entier entre 2 et 12. Chaque couple appartient donc à un bloc B_s et à un seul : les 11 ensembles B₂, …, B₁₂ sont non vides, deux à deux disjoints et recouvrent E². C’est une partition de E², dont les cardinaux sont 1, 2, 3, 4, 5, <b>6</b>, 5, 4, 3, 2, 1 (somme 36). B₇ = {(x ; 7 − x) : x ∈ E} a pour projections E et E ; comme card B₇ = 6 &lt; 36, <b>B₇ n’est pas un pavé</b> : c’est une diagonale.'},
  {kind:'Problème',h:'Combien de pavés ?',
   p:'Soit <i>E</i> = {1 ; 2 ; 3} et <i>F</i> = {<i>a</i> ; <i>b</i>}. On veut savoir quelle proportion des parties de <i>E</i> × <i>F</i> sont des pavés <i>A</i> × <i>B</i> (avec <i>A</i> ⊂ <i>E</i>, <i>B</i> ⊂ <i>F</i>). Attention aux doublons : des choix différents de <i>A</i> et <i>B</i> peuvent donner le même pavé quand l’un d’eux est vide.',
   parts:[
    {q:'a) Combien de parties a <i>E</i> × <i>F</i>&nbsp;?',lab:'card 𝒫(E × F) =',ans:64,hint:'Calcule d’abord card(E × F).',why:'card(E × F) = 3 · 2 = 6, donc 2⁶ = 64 parties.'},
    {q:'b) Combien de pavés <b>non vides</b> y a-t-il&nbsp;?',lab:'pavés :',ans:21,hint:'Un pavé non vide A × B vient de A et B non vides, et il les détermine (ce sont ses projections).',why:'A non vide : 2³ − 1 = 7 choix ; B non vide : 2² − 1 = 3 choix. Deux choix différents donnent des pavés différents : 7 · 3 = 21.'},
    {q:'c) Combien de parties de <i>E</i> × <i>F</i> ne sont <b>pas</b> des pavés&nbsp;?',lab:'parties :',ans:42,hint:'N’oublie pas le pavé vide, obtenu dès que A = ∅ ou B = ∅, et compté une seule fois.',why:'Pavés : 21 non vides + le vide = 22. Il reste 64 − 22 = 42 parties qui ne sont pas des pavés.'},
    {q:'d) La réunion de deux pavés est-elle toujours un pavé&nbsp;?',opts:['Oui, comme l’intersection','Oui, car elle est incluse dans E × F','Non : {1} × {a} ∪ {2} × {b} a 2 éléments, alors que le produit de ses projections {1 ; 2} × {a ; b} en a 4','Non, car deux pavés sont toujours disjoints'],ans:2,hint:'Essaie deux pavés d’un seul point, placés en diagonale.',why:'Le critère des projections échoue : 2 ≠ 4. (L’intersection de deux pavés, elle, en est un : (A × B) ∩ (A′ × B′) = (A ∩ A′) × (B ∩ B′).)'},
   ],
   sol:'E × F a 6 éléments, donc <b>64</b> parties. Un pavé non vide A × B a pour projections A et B : il détermine A et B, tous deux non vides. On en compte (2³ − 1)(2² − 1) = 7 · 3 = <b>21</b>. Tous les choix avec A = ∅ ou B = ∅ donnent le même pavé ∅, compté une fois : 22 pavés. Donc 64 − 22 = <b>42</b> parties ne sont pas des pavés, soit les deux tiers. Enfin, une réunion de pavés n’est pas un pavé en général ({1} × {a} ∪ {2} × {b}), alors qu’une intersection de pavés en est toujours un.'},
]},
);
})();
