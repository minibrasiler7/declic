// Vérifie des fichiers de contenu :  node tools/harness.js cours/an1.js [cours/xx.js …]
// Sans argument : vérifie tous les fichiers de cours/.
const vm=require('vm'), fs=require('fs'), path=require('path');
const ROOT=path.join(__dirname,'..');
let files=process.argv.slice(2);
if(!files.length) files=fs.readdirSync(path.join(ROOT,'cours')).filter(f=>f.endsWith('.js')).sort((a,b)=>(a==='maths.js')-(b==='maths.js')||a.localeCompare(b)).map(f=>'cours/'+f);
const ctx=vm.createContext({console,Math,Number,String,Array,Object,JSON,isFinite,isNaN,parseFloat,parseInt});
const run=f=>vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f});
run('lib.js'); for(const f of files) run(f);
const COURS=vm.runInContext('COURS',ctx), SUBJ=vm.runInContext('MATIERES',ctx);
const MATHS=vm.runInContext('typeof MATHS!=="undefined"?MATHS:[]',ctx);
const errs=[], warn=[], ids=new Set(); let steps=0, probs=0;
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
  if(q.opts){ if(!Array.isArray(q.opts)||q.opts.length<2) errs.push(`${w}: opts`);
    if(!Number.isInteger(q.ans)||q.ans<0||q.ans>=q.opts.length) errs.push(`${w}: ans doit être l’indice d’une option`);
    if(new Set(q.opts).size!==q.opts.length) errs.push(`${w}: options en double`); html+=q.opts.join(''); }
  else if('ans' in q){ if(typeof q.ans!=='number'||!isFinite(q.ans)) errs.push(`${w}: ans numérique requis`); }
  else return null;
  if(!q.why) errs.push(`${w}: why manquant`);
  return html;
}

function checkSteps(id,stepsArr,{min=5,maths=false}={}){
  const W=`[${id}]`;
  if(!Array.isArray(stepsArr)||stepsArr.length<min){ errs.push(`${W} au moins ${min} étapes`); return; }
  let ex=0, inter=0, nprob=0, firstProb=-1;
  stepsArr.forEach((st,i)=>{ steps++; const w=`${W} étape ${i+1}`;
    try{
      if(st.render){ if(!maths) errs.push(`${w}: render() interdit, utiliser le format données`); return; }
      if(!st.h) errs.push(`${w}: h manquant`);
      let html=(st.h||'')+(st.p||'')+(st.note||'')+(st.fig||'')+(st.why||'')+(st.sol||'');
      if(st.fig!==undefined&&typeof st.fig!=='string') errs.push(`${w}: fig doit être une chaîne (utiliser une IIFE)`);
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
      if(bad(html)) errs.push(`${w}: texte contient NaN/undefined`);
      tagsBalanced(html,w);
    }catch(e){ errs.push(`${w}: exception ${e.message}`); }
  });
  if(!maths){ if(ex<3) errs.push(`${W} au moins 3 exercices (QCM, numérique ou curseurs avec ok)`);
    if(inter<1) errs.push(`${W} au moins une figure à curseurs`); }
  if(nprob<2) errs.push(`${W} au moins 2 problèmes (étapes avec parts) à la fin du chapitre`);
  else if(stepsArr.slice(firstProb).some(s=>!s.parts)) errs.push(`${W} les problèmes doivent être les dernières étapes du chapitre`);
}

for(const ch of COURS){
  const W=`[${ch.id||'?'}]`;
  if(!ch.id||!/^[a-z0-9]+(-[a-z0-9]+)+$/.test(ch.id)) errs.push(`${W} id invalide (matiere-mot)`);
  if(ids.has(ch.id)) errs.push(`${W} id en double`); ids.add(ch.id);
  const sj=SUBJ.find(s=>s.id===ch.subj); if(!sj) errs.push(`${W} subj inconnu ${ch.subj}`); else if(!sj.sems[ch.sem]) errs.push(`${W} sem inconnu ${ch.sem}`);
  if(!ch.h||!ch.p) errs.push(`${W} h et p requis`);
  checkSteps(ch.id,ch.steps);
}
for(const c of MATHS){ if(c.use) continue; if(ids.has(c.id)) errs.push(`[${c.id}] id en double`); ids.add(c.id); checkSteps(c.id,c.steps,{min:4,maths:true}); }

console.log(`${COURS.length} chapitres${MATHS.length?` + ${MATHS.filter(c=>!c.use).length} cours de maths`:''}, ${steps} étapes, ${probs} problèmes`);
warn.forEach(w=>console.log('  avertissement : '+w));
if(errs.length){ console.log(`${errs.length} erreur(s) :`); errs.slice(0,80).forEach(e=>console.log('  ✗ '+e)); if(errs.length>80) console.log(`  … et ${errs.length-80} autres`); process.exit(1); } else console.log('OK');
