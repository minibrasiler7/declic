// Vérifie des fichiers de contenu :  node tools/harness.js cours/an1.js [cours/xx.js …]
// Sans argument : vérifie tous les fichiers de cours/.
const vm=require('vm'), fs=require('fs'), path=require('path');
const ROOT=path.join(__dirname,'..');
let files=process.argv.slice(2);
if(!files.length) files=fs.readdirSync(path.join(ROOT,'cours')).filter(f=>f.endsWith('.js')).sort((a,b)=>(b==='maths.js')-(a==='maths.js')||a.localeCompare(b)).map(f=>'cours/'+f);
const ctx=vm.createContext({console,Math,Number,String,Array,Object,JSON,isFinite,isNaN,parseFloat,parseInt});
const run=f=>vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f});
run('lib.js'); for(const f of files) run(f);
const COURS=vm.runInContext('COURS',ctx), SUBJ=vm.runInContext('MATIERES',ctx);
const MATHS=vm.runInContext('typeof MATHS!=="undefined"?MATHS:[]',ctx);
const errs=[], warn=[], ids=new Set(); let steps=0, probs=0, demos=0;
const bad=s=>/NaN(?![₀-₉])|undefined|\[object Object\]|Infinity/.test(s);
const grid=p=>{ const a=[]; for(let x=p.min;x<=p.max+1e-9;x+=(p.step||1)) a.push(+x.toFixed(6)); return a; };
function* combos(params,limit=4000){ const g=params.map(grid); const tot=g.reduce((n,a)=>n*a.length,1);
  if(tot<=limit){ const rec=function*(k,v){ if(k===g.length){ yield {...v}; return; } for(const x of g[k]){ v[params[k].id]=x; yield* rec(k+1,v); } }; yield* rec(0,{}); }
  else for(let i=0;i<limit;i++){ const v={}; params.forEach((p,k)=>v[p.id]=g[k][Math.floor(Math.random()*g[k].length)]); yield v; } }
function tagsBalanced(html,where){ const st=[]; const re=/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g; let m;
  const voids=new Set(['br','img','input','hr','meta','link','line','circle','rect','path','ellipse','polyline','polygon','stop','use']);
  while((m=re.exec(html))){ const t=m[1].toLowerCase(); if(m[2]==='/'||voids.has(t)&&!m[0].startsWith('</')) continue;
    if(m[0].startsWith('</')){ if(st.pop()!==t){ errs.push(`${where}: balise </${t}> mal fermée`); return; } } else st.push(t); }
  if(st.length) errs.push(`${where}: balise <${st.pop()}> non fermée`); }

// Une question à réponse (étape simple ou partie de problème)
function checkAnswer(q,w){
  let html='';
  const nTxt=['txt','dictee','ordre'].filter(k=>q[k]!==undefined).length;
  if(nTxt){ // langues : réponse écrite, dictée ou ordre des mots
    if(nTxt>1||q.opts||'ans' in q) errs.push(`${w}: une seule forme de réponse (txt, dictee, ordre, opts ou ans)`);
    const A=q.dictee!==undefined?[q.dictee]:q.ordre!==undefined?[Array.isArray(q.ordre)?q.ordre.join(' '):q.ordre,...(q.alt||[])]:[].concat(q.txt);
    if(!A.length||A.some(a=>typeof a!=='string'||!a.trim())) errs.push(`${w}: réponse(s) attendue(s) vides ou mal formées`);
    if(q.ordre!==undefined&&A[0].split(' ').length<3) errs.push(`${w}: ordre : au moins 3 mots`);
    if(q.dictee!==undefined&&q.audio) errs.push(`${w}: dictee porte déjà son audio`);
    if(!q.why) errs.push(`${w}: why manquant`);
    return A.join(' ')+(q.audio?audioText(q.audio,w):'');
  }
  if(q.opts){ if(!Array.isArray(q.opts)||q.opts.length<2) errs.push(`${w}: opts`);
    if(!Number.isInteger(q.ans)||q.ans<0||q.ans>=q.opts.length) errs.push(`${w}: ans doit être l’indice d’une option`);
    if(new Set(q.opts).size!==q.opts.length) errs.push(`${w}: options en double`); html+=q.opts.join(''); }
  else if('ans' in q){ if(typeof q.ans!=='number'||!isFinite(q.ans)) errs.push(`${w}: ans numérique requis`); }
  else return null;
  if(!q.why) errs.push(`${w}: why manquant`);
  return html;
}

// Audio d'une langue : texte, ou dialogue [[qui, texte], …]
function audioText(a,w){ if(typeof a==='string') return a; if(Array.isArray(a)&&a.length&&a.every(l=>Array.isArray(l)&&l.length===2&&typeof l[1]==='string')) return a.map(l=>l.join(' ')).join(' '); errs.push(`${w}: audio doit être un texte ou [[qui, texte], …]`); return ''; }
const LANGKEYS=['txt','dictee','ordre','dire','oral','ecrire','audio','mots'];
function checkSteps(id,stepsArr,{min=5,maths=false,lang=false}={}){
  const W=`[${id}]`;
  if(!Array.isArray(stepsArr)||stepsArr.length<min){ errs.push(`${W} au moins ${min} étapes`); return; }
  let ex=0, inter=0, nprob=0, firstProb=-1, ndemo=0; const lg={audio:0,dictee:0,oral:0,ecrire:0,mots:0};
  stepsArr.forEach((st,i)=>{ steps++; const w=`${W} étape ${i+1}`;
    try{
      if(st.render){ if(!maths) errs.push(`${w}: render() interdit, utiliser le format données`); return; }
      if(!st.h) errs.push(`${w}: h manquant`);
      let html=(st.h||'')+(st.p||'')+(st.note||'')+(st.fig||'')+(st.why||'')+(st.sol||'');
      if(st.fig!==undefined&&typeof st.fig!=='string') errs.push(`${w}: fig doit être une chaîne (utiliser une IIFE)`);
      if(LANGKEYS.some(k=>st[k]!==undefined)){ // étapes de langue (docs/ANGLAIS.md)
        if(!lang) errs.push(`${w}: champs de langue réservés aux matières de langue`);
        if(st.audio!==undefined){ lg.audio++; html+=audioText(st.audio,w); }
        if(st.dictee!==undefined) lg.dictee++;
        if(st.mots!==undefined){ if(!Array.isArray(st.mots)||!st.mots.length||st.mots.some(m=>!Array.isArray(m)||m.length<2||m.length>3||m.some(x=>typeof x!=='string'||!x))) errs.push(`${w}: mots = [[anglais, français, exemple?], …]`); else { lg.mots+=st.mots.length; html+=st.mots.flat().join(' '); } }
        if(st.dire!==undefined){ lg.oral++; const t=typeof st.dire==='string'?st.dire:st.dire?.t; if(typeof t!=='string'||!t) errs.push(`${w}: dire = texte, ou {t, cache}`); else html+=t; }
        if(st.oral!==undefined){ lg.oral++; if(!st.oral||typeof st.oral.modele!=='string') errs.push(`${w}: oral = {modele, criteres}`); else html+=st.oral.modele+(st.oral.criteres||[]).map(c=>c.t||c).join(''); }
        if(st.ecrire!==undefined){ lg.ecrire++; const e=st.ecrire; if(!e||typeof e.modele!=='string'||!Array.isArray(e.criteres)) errs.push(`${w}: ecrire = {min, modele, criteres:[…]}`); else { html+=e.modele+e.criteres.map(c=>c.t||c).join('');
          e.criteres.forEach(c=>{ if(typeof c==='object'){ try{ new RegExp(c.re,'i'); }catch(x){ errs.push(`${w}: critère re invalide ${c.re}`); } if(!new RegExp(c.re,'i').test(e.modele)) errs.push(`${w}: le modèle ne remplit pas le critère « ${c.t} »`); } }); } }
      }
      if(st.params){ inter++;
        if(typeof st.draw!=='function') errs.push(`${w}: draw manquant`);
        st.params.forEach(p=>{ if(p.id===undefined||p.l===undefined||p.min===undefined||p.max===undefined||p.v===undefined) errs.push(`${w}: param incomplet ${JSON.stringify(p)}`);
          if(p.v<p.min||p.v>p.max) errs.push(`${w}: valeur initiale hors bornes (${p.id})`);
          const k=(p.v-p.min)/(p.step||1); if(Math.abs(k-Math.round(k))>1e-6) errs.push(`${w}: valeur initiale pas sur la grille du curseur (${p.id})`); });
        for(const v of combos(st.params)){ const s=st.draw(v)+(st.info?st.info(v):''); if(typeof s!=='string'||bad(s)){ errs.push(`${w}: draw/info produit NaN/undefined pour ${JSON.stringify(v)}`); break; } }
        const v0={}; st.params.forEach(p=>v0[p.id]=p.v); html+=st.draw(v0)+(st.info?st.info(v0):'');
        if(st.ok){ ex++; if(!st.why) errs.push(`${w}: why manquant`);
          if(st.ok(v0)) errs.push(`${w}: la position initiale est déjà la bonne réponse`);
          let found=false; for(const v of combos(st.params,200000)){ if(st.ok(v)){ found=true; break; } } if(!found) errs.push(`${w}: aucune position des curseurs ne satisfait ok()`); }
      }
      if(st.demo){ ndemo++; demos++; const d=st.demo;
        if(typeof d.enonce!=='string'||!d.enonce) errs.push(`${w}: demo.enonce manquant`);
        if(!Array.isArray(d.etapes)||d.etapes.length<2) errs.push(`${w}: demo.etapes doit contenir au moins 2 étapes`);
        else d.etapes.forEach((e,k)=>{ if(typeof e==='string') html+=e; else if(e&&typeof e.f==='string') html+=e.f+(e.w||''); else errs.push(`${w}: demo.etapes[${k}] doit être une chaîne ou {f, w}`); });
        html+=(d.enonce||'')+(d.conclusion||'');
        if(st.parts||st.opts||'ans' in st||st.ok) errs.push(`${w}: une étape Méthode (demo) n’est pas un exercice ; mets l’exercice d’application dans l’étape suivante`); }
      if(st.parts){ // problème en plusieurs questions
        nprob++; probs++; if(firstProb<0) firstProb=i;
        if(st.ok||st.opts||'ans' in st) errs.push(`${w}: un problème porte ses réponses dans parts, pas au niveau de l’étape`);
        if(!Array.isArray(st.parts)||st.parts.length<2) errs.push(`${w}: un problème a au moins 2 questions (parts)`);
        if(!st.p||st.p.length<80) errs.push(`${w}: l’énoncé du problème (p) est trop court`);
        if(!st.sol) errs.push(`${w}: sol (solution rédigée complète) manquante`);
        (st.parts||[]).forEach((q,k)=>{ const ww=`${w} question ${k+1}`;
          if(!q.q) errs.push(`${ww}: q (énoncé de la question) manquant`);
          if(!q.hint) errs.push(`${ww}: hint (indice) manquant`);
          const h=checkAnswer(q,ww); if(h===null) errs.push(`${ww}: ans (ou opts + ans) requis`); else html+=h;
          html+=(q.q||'')+(q.hint||'')+(q.why||'');
        });
      } else {
        const h=checkAnswer(st,w); if(h!==null){ ex++; html+=h; }
      }
      if(st.ok&&st.opts) errs.push(`${w}: ok et opts ne se combinent pas`);
      // Une étape de théorie enseigne : au moins 70 mots de texte (docs/BRIEF.md, « Une théorie qui enseigne »)
      if(!st.parts&&!st.demo&&!st.opts&&!('ans' in st)&&!st.ok&&!LANGKEYS.some(k=>st[k]!==undefined)){ const words=((st.p||'')+' '+(st.note||'')).replace(/<[^>]+>/g,' ').split(/\s+/).filter(x=>x.length>1).length;
        if(words<70) errs.push(`${w}: théorie trop courte (${words} mots) : développe (motivation, définition, idée, exemple)`); }
      if(bad(html)) errs.push(`${w}: texte contient NaN/undefined`);
      tagsBalanced(html,w);
    }catch(e){ errs.push(`${w}: exception ${e.message}`); }
  });
  if(!maths){ if(ex<3) errs.push(`${W} au moins 3 exercices (QCM, numérique ou curseurs avec ok)`);
    if(lang){ if(lg.audio<3) errs.push(`${W} au moins 3 étapes avec audio (écoute)`); if(lg.dictee<1) errs.push(`${W} au moins une dictée`);
      if(lg.oral<2) errs.push(`${W} au moins 2 étapes d’oral (dire, oral)`); if(lg.ecrire<1) errs.push(`${W} au moins une écriture guidée (ecrire)`);
      if(lg.mots<12) errs.push(`${W} au moins 12 mots de vocabulaire (mots), il y en a ${lg.mots}`); }
    else if(inter<1) errs.push(`${W} au moins une figure à curseurs`); }
  if(ndemo<1) errs.push(`${W} au moins une étape Méthode avec exemple résolu (demo)`);
  if(nprob<2) errs.push(`${W} au moins 2 problèmes (étapes avec parts) à la fin du chapitre`);
  else if(stepsArr.slice(firstProb).some(s=>!s.parts)) errs.push(`${W} les problèmes doivent être les dernières étapes du chapitre`);
}

for(const ch of COURS){
  const W=`[${ch.id||'?'}]`;
  if(!ch.id||!/^[a-z0-9]+(-[a-z0-9]+)+$/.test(ch.id)) errs.push(`${W} id invalide (matiere-mot)`);
  if(ids.has(ch.id)) errs.push(`${W} id en double`); ids.add(ch.id);
  const sj=SUBJ.find(s=>s.id===ch.subj); if(!sj) errs.push(`${W} subj inconnu ${ch.subj}`); else if(!sj.sems[ch.sem]) errs.push(`${W} sem inconnu ${ch.sem}`);
  if(!ch.h||!ch.p) errs.push(`${W} h et p requis`);
  checkSteps(ch.id,ch.steps,{lang:!!sj?.lang});
}
for(const c of MATHS){ if(c.use) continue; if(ids.has(c.id)) errs.push(`[${c.id}] id en double`); ids.add(c.id); checkSteps(c.id,c.steps,{min:4,maths:true}); }

// Examens de compétence : examens/<id>.js pour chaque chapitre vérifié
const EX=vm.runInContext('EXAMS',ctx); let nex=0, nq=0;
const chaps=[...COURS.map(c=>({id:c.id,steps:c.steps})),...MATHS.filter(c=>!c.use).map(c=>({id:c.id,steps:c.steps}))];
for(const ch of chaps){
  const f=`examens/${ch.id}.js`, W=`[examen ${ch.id}]`;
  if(!fs.existsSync(path.join(ROOT,f))){ errs.push(`${W} fichier ${f} manquant`); continue; }
  try{ run(f); }catch(e){ errs.push(`${W} exception ${e.message}`); continue; }
  const ex=EX[ch.id]; if(!Array.isArray(ex)){ errs.push(`${W} EXAMS['${ch.id}'] doit être un tableau de notions`); continue; }
  nex++; const heads=new Set(ch.steps.filter(s=>!s.parts).map(s=>s.h)), seen=new Set(); let n=0;
  if(ex.length<4||ex.length>8) errs.push(`${W} 4 à 8 notions (il y en a ${ex.length})`);
  ex.forEach((g,k)=>{ const w=`${W} notion ${k+1}`;
    if(!g.n) errs.push(`${w}: n (nom de la notion) manquant`);
    if(!heads.has(g.r)) errs.push(`${w}: r « ${g.r} » ne correspond au titre h d’aucune étape du chapitre (hors problèmes)`);
    if(!Array.isArray(g.qs)||g.qs.length<3) errs.push(`${w}: au moins 3 questions (qs)`);
    (g.qs||[]).forEach((q,j)=>{ const ww=`${w} question ${j+1}`; n++;
      try{
        if(!q.q) errs.push(`${ww}: q manquant`); else if(seen.has(q.q)) errs.push(`${ww}: question en double`); else seen.add(q.q);
        if(q.hint||q.parts||q.params) errs.push(`${ww}: une question d’examen n’a ni indice, ni parts, ni curseurs`);
        const h=checkAnswer(q,ww); if(h===null) errs.push(`${ww}: ans (ou opts + ans) requis`);
        const html=(q.q||'')+(h||'')+(q.why||'')+(q.fig||'');
        if(q.fig!==undefined&&typeof q.fig!=='string') errs.push(`${ww}: fig doit être une chaîne`);
        if(bad(html)) errs.push(`${ww}: texte contient NaN/undefined`);
        tagsBalanced(html,ww);
      }catch(e){ errs.push(`${ww}: exception ${e.message}`); }
    });
  });
  if(n<28||n>32) errs.push(`${W} 28 à 32 questions (il y en a ${n})`);
  nq+=n;
}

console.log(`${COURS.length} chapitres${MATHS.length?` + ${MATHS.filter(c=>!c.use).length} cours de maths`:''}, ${steps} étapes, ${demos} méthodes, ${probs} problèmes, ${nex} examens (${nq} questions)`);
warn.forEach(w=>console.log('  avertissement : '+w));
if(errs.length){ console.log(`${errs.length} erreur(s) :`); errs.slice(0,80).forEach(e=>console.log('  ✗ '+e)); if(errs.length>80) console.log(`  … et ${errs.length-80} autres`); process.exit(1); } else console.log('OK');
