// Liste les phrases audio des matières de langue qui n'ont pas encore leur fichier audio/<id>.mp3
//   node tools/audio.js [manifeste.json]   → écrit [{id, voice, text}] à enregistrer (par défaut : affiche le bilan)
//   node tools/audio.js --orphelins        → liste les fichiers audio qui ne servent plus
// L'enregistrement se fait ensuite avec tools/tts.py (voir son en-tête).
const vm=require('vm'), fs=require('fs'), path=require('path');
const ROOT=path.join(__dirname,'..'), AUD=path.join(ROOT,'audio');
const ctx=vm.createContext({console,Math,JSON,Array,Object,String,Number,Set,RegExp,window:{},$:()=>{}});
const run=f=>vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f});
run('lib.js'); run('langue.js');
for(const f of fs.readdirSync(path.join(ROOT,'cours')).filter(f=>f.endsWith('.js')).sort((a,b)=>(b==='maths.js')-(a==='maths.js'))) run('cours/'+f);
const COURS=vm.runInContext('COURS',ctx), SUBJ=vm.runInContext('MATIERES',ctx), EX=vm.runInContext('EXAMS',ctx), Langue=vm.runInContext('Langue',ctx);

const all=new Map();
const add=(src,lang)=>{ if(!src) return; for(const c of Langue.clips(src,lang)) if(c.text) all.set(c.id,{id:c.id,voice:c.voice,text:c.text}); };
// Comme langue.js : un mot de vocabulaire se lit sans ses parenthèses, première variante
const word=en=>en.replace(/\([^)]*\)/g,' ').split(' / ')[0];
for(const sj of SUBJ.filter(s=>s.lang)){
  const lang=sj.lang;
  for(const c of COURS.filter(c=>c.subj===sj.id)){
    run(`examens/${c.id}.js`);
    const items=[...c.steps, ...c.steps.flatMap(s=>s.parts||[]), ...(EX[c.id]||[]).flatMap(g=>g.qs)];
    for(const s of items){
      add(s.audio,lang); add(s.dictee,lang);
      if(s.dire) add(typeof s.dire==='string'?s.dire:s.dire.t,lang);
      if(s.oral) add(s.oral.modele,lang);
      (s.mots||[]).forEach(([en,,ex])=>add(ex?[[null,word(en)],[null,ex]]:word(en),lang));
    }
  }
}
const have=new Set(fs.existsSync(AUD)?fs.readdirSync(AUD).filter(f=>f.endsWith('.mp3')).map(f=>f.slice(0,-4)):[]);
if(process.argv[2]==='--orphelins'){ [...have].filter(id=>!all.has(id)).forEach(id=>console.log(`audio/${id}.mp3`)); process.exit(0); }
const todo=[...all.values()].filter(c=>!have.has(c.id));
console.log(`${all.size} phrases, ${all.size-todo.length} déjà enregistrées, ${todo.length} à enregistrer (${todo.reduce((n,c)=>n+c.text.length,0)} caractères)`);
if(process.argv[2]) fs.writeFileSync(process.argv[2],JSON.stringify(todo));
