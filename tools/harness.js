// Vérifie un ou plusieurs fichiers de contenu CMS :  node tools/harness.js cms-an1.js [cms-xx.js …]
const vm=require('vm'), fs=require('fs'), path=require('path');
const files=process.argv.slice(2); if(!files.length){ console.log('usage: node tools/harness.js cms-xx.js'); process.exit(2); }
const ctx=vm.createContext({console,Math,Number,String,Array,Object,JSON,isFinite,isNaN,parseFloat,parseInt});
const run=f=>vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),ctx,{filename:f});
run('lib.js'); for(const f of files) run(f);
const CMS=vm.runInContext('CMS',ctx), SUBJ=vm.runInContext('CMS_SUBJECTS',ctx);
const errs=[], warn=[], ids=new Set(); let steps=0;
const bad=s=>/NaN|undefined|\[object Object\]|Infinity/.test(s);
const grid=p=>{ const a=[]; for(let x=p.min;x<=p.max+1e-9;x+=(p.step||1)) a.push(+x.toFixed(6)); return a; };
function* combos(params,limit=4000){ const g=params.map(grid); const tot=g.reduce((n,a)=>n*a.length,1);
  if(tot<=limit){ const rec=function*(k,v){ if(k===g.length){ yield {...v}; return; } for(const x of g[k]){ v[params[k].id]=x; yield* rec(k+1,v); } }; yield* rec(0,{}); }
  else for(let i=0;i<limit;i++){ const v={}; params.forEach((p,k)=>v[p.id]=g[k][Math.floor(Math.random()*g[k].length)]); yield v; } }
function tagsBalanced(html,where){ const st=[]; const re=/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g; let m;
  const voids=new Set(['br','img','input','hr','meta','link','line','circle','rect','path','ellipse','polyline','polygon','stop','use']);
  while((m=re.exec(html))){ const t=m[1].toLowerCase(); if(m[2]==='/'||voids.has(t)&&!m[0].startsWith('</')) continue;
    if(m[0].startsWith('</')){ if(st.pop()!==t){ errs.push(`${where}: balise </${t}> mal fermée`); return; } } else st.push(t); }
  if(st.length) errs.push(`${where}: balise <${st.pop()}> non fermée`); }
for(const ch of CMS){
  const W=`[${ch.id||'?'}]`;
  if(!ch.id||!/^cms-[a-z0-9-]+$/.test(ch.id)) errs.push(`${W} id invalide (cms-…)`);
  if(ids.has(ch.id)) errs.push(`${W} id en double`); ids.add(ch.id);
  const sj=SUBJ.find(s=>s.id===ch.subj); if(!sj) errs.push(`${W} subj inconnu ${ch.subj}`); else if(!sj.sems[ch.sem]) errs.push(`${W} sem inconnu ${ch.sem}`);
  if(!ch.h||!ch.p) errs.push(`${W} h et p requis`);
  if(!Array.isArray(ch.steps)||ch.steps.length<5) { errs.push(`${W} au moins 5 étapes`); continue; }
  let ex=0, inter=0;
  ch.steps.forEach((st,i)=>{ steps++; const w=`${W} étape ${i+1}`;
    try{
      if(st.render) { errs.push(`${w}: render() interdit, utiliser le format données`); return; }
      if(!st.h) errs.push(`${w}: h manquant`);
      let html=(st.h||'')+(st.p||'')+(st.note||'')+(st.fig||'')+(st.why||'');
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
      if(st.opts){ ex++; if(!Array.isArray(st.opts)||st.opts.length<2) errs.push(`${w}: opts`); if(!Number.isInteger(st.ans)||st.ans<0||st.ans>=st.opts.length) errs.push(`${w}: ans doit être l’indice d’une option`);
        if(!st.why) errs.push(`${w}: why manquant`); if(new Set(st.opts).size!==st.opts.length) errs.push(`${w}: options en double`); html+=st.opts.join('');
        if(st.ans===0&&ch.steps.filter(s=>s.opts&&s.ans===0).length>2) warn.push(`${w}: beaucoup de bonnes réponses en 1re position, varie l’ordre`); }
      else if('ans' in st){ ex++; if(typeof st.ans!=='number'||!isFinite(st.ans)) errs.push(`${w}: ans numérique requis`); if(!st.why) errs.push(`${w}: why manquant`); }
      if(st.ok&&st.opts) errs.push(`${w}: ok et opts ne se combinent pas`);
      if(bad(html)) errs.push(`${w}: texte contient NaN/undefined`);
      tagsBalanced(html,w);
    }catch(e){ errs.push(`${w}: exception ${e.message}`); }
  });
  if(ex<3) errs.push(`${W} au moins 3 exercices (QCM, numérique ou curseurs avec ok)`);
  if(inter<1) errs.push(`${W} au moins une figure à curseurs`);
}
console.log(`${CMS.length} chapitres, ${steps} étapes`);
warn.forEach(w=>console.log('  avertissement : '+w));
if(errs.length){ console.log(`${errs.length} erreur(s) :`); errs.forEach(e=>console.log('  ✗ '+e)); process.exit(1); } else console.log('OK');
