/* Déclic — parcours de mathématiques.
   Chaque cours : id, br (alg | ana | geo), lv (ecole | gym | uni), h, p, lessons (titres), steps (1re leçon jouable).
   Types d'étapes (déduits des champs) :
   - params + draw [+ info]        → exploration avec curseurs
   - params + draw + ok + why      → pratique : régler les curseurs pour atteindre un but
   - opts + ans + why              → QCM
   - ans + why (sans opts)         → réponse numérique (virgule, fraction acceptées), tol optionnelle */


function fracBar(n,d,col='var(--math)'){
  const W=300,h=38,bars=Math.max(1,Math.ceil(n/d)),w=(W-4)/d; let s='';
  for(let b=0;b<bars;b++) for(let i=0;i<d;i++){ const k=b*d+i;
    s+=`<rect x="${2+i*w}" y="${2+b*(h+8)}" width="${w}" height="${h}" fill="${k<n?col:'var(--surface)'}" stroke="var(--ink)" stroke-width="1.5"/>`; }
  return `<svg viewBox="0 0 ${W} ${bars*(h+8)}" width="${W}">${s}</svg>`;
}
function balance(L,R){
  const items=(cx,o)=>{ const arr=[...Array(o.x).fill('x'),...Array(o.u).fill('u')]; return arr.map((t,i)=>{
    const x=cx-57+(i%5)*23, y=124-Math.floor(i/5)*24;
    return t==='x'?`<rect x="${x}" y="${y-22}" width="21" height="21" rx="4" fill="var(--accent)"/><text x="${x+10.5}" y="${y-6}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--accent-ink)">x</text>`
                  :`<circle cx="${x+10.5}" cy="${y-10}" r="9" fill="var(--spark)"/>`; }).join(''); };
  const pan=cx=>`<line x1="${cx-58}" y1="128" x2="${cx}" y2="30" stroke="var(--muted)"/><line x1="${cx+58}" y1="128" x2="${cx}" y2="30" stroke="var(--muted)"/><rect x="${cx-60}" y="126" width="120" height="6" rx="3" fill="var(--ink)"/>`;
  return `<svg viewBox="0 0 320 175" width="320"><path d="M160 30 L146 172 H174Z" fill="var(--muted)"/>${pan(90)}${pan(230)}<line x1="30" y1="30" x2="290" y2="30" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><circle cx="160" cy="30" r="6" fill="var(--ink)"/>${items(90,L)}${items(230,R)}</svg>`;
}
const LEVELS={ecole:{h:'École obligatoire',s:'9e – 11e année'},gym:{h:'Gymnase',s:'Maturité'},uni:{h:'Université',s:'1re année'}};
const BRANCHES={alg:'Algèbre',ana:'Analyse',geo:'Géométrie'};

const MATHS=[];
/* Les cours eux-mêmes sont dans maths-ecole.js, maths-gym.js et maths-uni.js (MATHS.push). */
