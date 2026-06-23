/* ============================================================
   World Cup 2026 — prediction dashboard generator
   Data lives in wc_data.js — edit that file, then re-run `node build_wc_dashboard.js`.
   Scoring (kicktipp revel8): 4 = exact · 3 = right winner + right goal-diff · 2 = right winner · 0 = wrong/no tip.
   ============================================================ */
const fs = require('fs');
const { UPDATED, YOU_NAME, YOU_RANK, YOU_TOTAL, MATCHDAYS } = require('./wc_data.js');

// ---- Poisson helper (used for the "model" predicted score + confidence) ----
function pois(l,k){let p=Math.exp(-l);for(let i=1;i<=k;i++)p*=l/i;return p;}
function fitScore(t,T){let b=null;for(let lh=0.1;lh<=T-0.1;lh+=0.01){const la=T-lh;let w=0,d=0,l=0;for(let h=0;h<=10;h++)for(let a=0;a<=10;a++){const p=pois(lh,h)*pois(la,a);if(h>a)w+=p;else if(h===a)d+=p;else l+=p;}const e=(w*100-t[0])**2+(d*100-t[1])**2+(l*100-t[2])**2;if(!b||e<b.e)b={e,lh,la};}let best=[0,0],bp=-1;for(let h=0;h<=6;h++)for(let a=0;a<=6;a++){const p=pois(b.lh,h)*pois(b.la,a);if(p>bp){bp=p;best=[h,a];}}return best;}

// fill model scores for games that supplied mp (probabilities) but no explicit model score
const TOTS = {A_def:2.3};
for (const md of MATCHDAYS) for (const g of md.games) {
  if (!g.model && g.mp){
    const T = g.mp[0]>70?3.4:(g.mp[0]<32?2.1:2.35);
    g.model = fitScore(g.mp, T);
  }
}

// ---- scoring ----
function sc(tip,res){ if(!tip||!res) return null; const[th,ta]=tip,[ah,aa]=res; if(th===ah&&ta===aa)return 4; const so=Math.sign(th-ta),ao=Math.sign(ah-aa); if(so!==ao)return 0; if((th-ta)===(ah-aa))return 3; return 2; }
function totals(key){ let p=0,ex=0,g3=0,g2=0,hit=0,played=0; for(const md of MATCHDAYS) for(const g of md.games){ if(!g.res) continue; played++; const s=sc(g[key],g.res); if(s===null) continue; p+=s; if(s===4)ex++; else if(s===3)g3++; else if(s===2)g2++; if(s>0)hit++; } return {p,ex,g3,g2,hit,played}; }
const T_you=totals('you'), T_mod=totals('model'), T_exp=totals('exp');

// ---- render ----
const sv=(a)=>a?a[0]+'-'+a[1]:'—';
function pBadge(tip,res){ const s=sc(tip,res); if(s===null) return '<span class="pb p0">no tip</span>'; const c=s===4?'p4':s===3?'p3':s===2?'p2':'p0'; return '<span class="pb '+c+'">+'+s+'</span>'; }

function gameCard(g){
  const played=!!g.res;
  let h='<div class="gc">';
  h+='<div class="gc-top"><span class="gc-t">'+g.h+' v '+g.a+'</span><span class="gc-grp">Grp '+g.grp+(played?' · FT':(g.ko?' · '+g.ko:''))+'</span></div>';
  if(played) h+='<div class="gc-res">'+g.res[0]+'–'+g.res[1]+'</div>';
  // three predictions
  const row=(label,tip,cls)=>'<div class="pr"><span class="pr-l '+cls+'">'+label+'</span><span class="pr-s">'+sv(tip)+'</span>'+(played?pBadge(tip,g.res):(tip?'':'<span class="pb p0">—</span>'))+'</div>';
  h+='<div class="prs">';
  h+=row('You',g.you,'you');
  h+=row('Model',g.model,'mod');
  h+=row('Expert',g.exp,'exp');
  h+='</div>';
  const nm=(s)=>s.substring(s.indexOf(' ')+1);
  if(!played && g.rec) h+='<div class="rec">🎯 Suggested tip: <b>'+g.rec[0]+'–'+g.rec[1]+'</b></div>';
  if(!played && g.mp) h+='<div class="conf">Model: <b>'+g.mp[0]+'%</b> '+nm(g.h)+' · '+g.mp[1]+'% draw · '+g.mp[2]+'% '+nm(g.a)+'</div>';
  if(g.note) h+='<div class="gc-note">'+g.note+'</div>';
  h+='</div>';
  return h;
}

const nextMd = MATCHDAYS.find(md=>md.games.some(g=>!g.res));
const css=`
:root{--bg:#0d1117;--card:#161b22;--card2:#1c2330;--border:#2d333b;--text:#e6edf3;--muted:#8b949e;--accent:#58a6ff;--green:#3fb950;--yellow:#d29922;--red:#f85149;--orange:#f0883e}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.5;padding-bottom:50px}
a{color:var(--accent)}
header{padding:22px 16px 14px;background:linear-gradient(180deg,#101a2b,#0d1117);border-bottom:1px solid var(--border)}
h1{font-size:1.25rem;margin-bottom:3px}
.sub{color:var(--muted);font-size:.82rem}
main{max-width:880px;margin:0 auto;padding:16px}
nav{position:sticky;top:0;z-index:9;background:rgba(13,17,23,.96);backdrop-filter:blur(6px);border-bottom:1px solid var(--border);padding:9px 12px;display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
nav a{display:inline-block;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:18px;padding:5px 12px;font-size:.8rem;text-decoration:none}
nav a.act{background:var(--accent);color:#0d1117;border-color:var(--accent);font-weight:600}
section{margin-bottom:30px;scroll-margin-top:60px}
h2{font-size:1.1rem;color:var(--accent);margin-bottom:10px}
.board{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px}
.bcard{flex:1;min-width:150px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px}
.bcard .nm{font-size:.82rem;color:var(--muted)}
.bcard .pt{font-size:2rem;font-weight:800;line-height:1.1}
.bcard .br{font-size:.76rem;color:var(--muted)}
.lead{border-color:var(--green)}
.note{background:var(--card);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:8px;padding:11px 13px;font-size:.84rem;color:var(--text);margin-bottom:14px}
.next{border-left-color:var(--yellow)}
.md{margin-bottom:8px}
.md-h{font-size:.95rem;font-weight:700;margin:18px 0 8px;color:#fff;border-bottom:1px solid var(--border);padding-bottom:5px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
.gc{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:11px 12px}
.gc-top{display:flex;justify-content:space-between;align-items:baseline;gap:6px;margin-bottom:4px}
.gc-t{font-weight:600;font-size:.9rem}
.gc-grp{font-size:.7rem;color:var(--muted);white-space:nowrap}
.gc-res{font-size:1.4rem;font-weight:800;color:#fff;margin:2px 0 7px}
.prs{display:flex;flex-direction:column;gap:3px;margin-bottom:5px}
.pr{display:grid;grid-template-columns:54px 1fr auto;align-items:center;gap:8px;font-size:.82rem}
.pr-l{font-weight:600}.pr-l.you{color:var(--green)}.pr-l.mod{color:var(--accent)}.pr-l.exp{color:var(--orange)}
.pr-s{font-variant-numeric:tabular-nums;color:var(--text)}
.pb{font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:9px}
.p4{background:rgba(63,185,80,.25);color:#fff}.p3{background:rgba(88,166,255,.22);color:#cfe}.p2{background:rgba(210,153,34,.18);color:#f0c674}.p0{background:#21262d;color:var(--muted)}
.conf{font-size:.74rem;color:var(--muted);margin:3px 0 4px}
.rec{font-size:.82rem;color:#fff;background:rgba(63,185,80,.16);border:1px solid var(--green);border-radius:7px;padding:4px 9px;margin:5px 0 4px;display:inline-block}
.rec b{color:var(--green)}
.gc-note{font-size:.76rem;color:var(--muted);margin-top:4px;border-top:1px dashed var(--border);padding-top:5px}
.tab{width:100%;border-collapse:collapse;font-size:.8rem;min-width:380px}
.tab th,.tab td{padding:6px 8px;border-bottom:1px solid var(--border);text-align:center}
.tab td.l{text-align:left}
.tab tfoot td{font-weight:700;color:#fff;border-top:2px solid var(--border)}
.scroll{overflow-x:auto}
footer{max-width:880px;margin:18px auto 0;padding:0 16px;color:var(--muted);font-size:.76rem}
`;

let html='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
html+='<title>World Cup 2026 — My Tipp Tracker</title><style>'+css+'</style></head><body>';
html+='<header><h1>🏆 WC 2026 — Tipp Tracker &amp; Predictions</h1><div class="sub">You vs the statistical model vs the expert blog · scored by your kicktipp rules (4 exact / 3 goal-diff / 2 winner) · updated '+UPDATED+'</div></header>';

// nav
html+='<nav><a href="#board" class="act">🏅 Scoreboard</a><a href="#next">⏭ Next up</a>'+MATCHDAYS.map(md=>'<a href="#md'+md.md+'">MD'+md.md+'</a>').join('')+'</nav>';
html+='<main>';

// scoreboard
html+='<section id="board"><h2>🏅 Standings — '+T_you.played+' games scored</h2>';
const cards=[['You ('+YOU_NAME+')',T_you,'lead'],['Statistical model',T_mod,''],['Big D (expert)',T_exp,'']];
html+='<div class="board">'+cards.map(c=>'<div class="bcard '+c[2]+'"><div class="nm">'+c[0]+'</div><div class="pt">'+c[1].p+'</div><div class="br">'+c[1].ex+' exact · '+c[1].g3+' goal-diff · '+c[1].g2+' winner · '+c[1].hit+'/'+c[1].played+' hit</div></div>').join('')+'</div>';
html+='<div class="note">Your kicktipp rank: <b>'+YOU_RANK+'</b> — <b>'+YOU_TOTAL+' pts</b> (incl. 8 bonus points, which the model/expert don\'t play; the head-to-head above counts game tips only, so You = 36). MD5 had no tips logged for you at all — that\'s the single biggest gap vs. the model/expert. Two takeaways for MD6: (1) tip <b>every</b> game — untipped games are the costliest, and (2) for the tight matches, a cautious 1-0 scores more reliably than a 2-1. Suggested tips are on each MD6 card below. 🎯</div>';
html+='<div class="scroll"><table class="tab"><thead><tr><th class="l">Predictor</th><th>Points</th><th>Exact (4)</th><th>GoalDiff (3)</th><th>Winner (2)</th><th>Outcome hits</th></tr></thead><tbody>';
for(const c of cards) html+='<tr><td class="l">'+c[0]+'</td><td>'+c[1].p+'</td><td>'+c[1].ex+'</td><td>'+c[1].g3+'</td><td>'+c[1].g2+'</td><td>'+c[1].hit+'/'+c[1].played+'</td></tr>';
html+='</tbody></table></div></section>';

// next up
if(nextMd){
  const up=nextMd.games.filter(g=>!g.res);
  html+='<section id="next"><h2>⏭ Next up — '+nextMd.label+'</h2>';
  html+='<div class="note next">'+up.length+' games still to play in this matchday. Predictions below; <b>don\'t forget to enter your kicktipp tips</b> before kickoff. Tap a matchday in the menu to review past rounds.</div>';
  html+='<div class="grid">'+up.map(gameCard).join('')+'</div></section>';
}

// each matchday
for(const md of MATCHDAYS){
  html+='<section id="md'+md.md+'"><h2>'+md.label+'</h2>';
  html+='<div class="grid">'+md.games.map(gameCard).join('')+'</div></section>';
}

html+='</main>';
html+='<footer>Predicted scores: <b>Model</b> = Poisson fit to win/draw/loss probabilities (Opta + PELE + markets). <b>Expert</b> = Big D Soccer\'s published score for every group game. <b>You</b> = your kicktipp tips (revel8-prediction). Results via ESPN/Olympics/FIFA. Probabilities are estimates, not betting advice.</footer>';
html+='</body></html>';

fs.writeFileSync(__dirname+'/wc2026_tipp_tracker.html', html);
console.log('WROTE wc2026_tipp_tracker.html ('+html.length+' bytes)');
console.log('You   :', JSON.stringify(T_you));
console.log('Model :', JSON.stringify(T_mod));
console.log('Expert:', JSON.stringify(T_exp));
console.log('Next matchday:', nextMd?nextMd.label:'none');
// dump ST4 model scores
for(const g of MATCHDAYS[3].games) console.log('  MD4 model', g.h.replace(/[^A-Za-z ]/g,'').trim(),'v',g.a.replace(/[^A-Za-z ]/g,'').trim(),'=>',g.model, g.mp||'');
