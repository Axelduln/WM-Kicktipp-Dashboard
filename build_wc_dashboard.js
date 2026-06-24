/* ============================================================
   World Cup 2026 — prediction dashboard generator
   Re-run after each matchday: add results + your tips to MATCHDAYS, run `node build_wc_dashboard.js`.
   Scoring (kicktipp revel8): 4 = exact · 3 = right winner + right goal-diff · 2 = right winner · 0 = wrong/no tip.
   Each game: {h,a,grp,ko,res,model,mp,exp,you}
     res/model/you = [H,A] or null ; mp = [win,draw,loss]% (model, optional) ; exp = "Big D pick" string
   ============================================================ */
const fs = require('fs');

const UPDATED = "Tue 23 June 2026, 10:00 UTC";
const YOU_NAME = "Madausinho";
const YOU_RANK = "13th of 20 active";
const YOU_TOTAL = 44;

// ---- Poisson helper (used for the "model" predicted score + confidence) ----
function pois(l,k){let p=Math.exp(-l);for(let i=1;i<=k;i++)p*=l/i;return p;}
function fitScore(t,T){let b=null;for(let lh=0.1;lh<=T-0.1;lh+=0.01){const la=T-lh;let w=0,d=0,l=0;for(let h=0;h<=10;h++)for(let a=0;a<=10;a++){const p=pois(lh,h)*pois(la,a);if(h>a)w+=p;else if(h===a)d+=p;else l+=p;}const e=(w*100-t[0])**2+(d*100-t[1])**2+(l*100-t[2])**2;if(!b||e<b.e)b={e,lh,la};}let best=[0,0],bp=-1;for(let h=0;h<=6;h++)for(let a=0;a<=6;a++){const p=pois(b.lh,h)*pois(b.la,a);if(p>bp){bp=p;best=[h,a];}}return best;}

// ---- DATA ------------------------------------------------------------------
const MATCHDAYS = [
{ md:1, label:"Matchday 1 · Group openers A–D · 11–13 Jun", games:[
  {h:"🇲🇽 Mexico",a:"🇿🇦 South Africa",grp:"A",res:[2,0],model:[1,0],exp:[2,0],you:[2,0],note:"Quiñones + Jiménez; tournament opener went to plan."},
  {h:"🇰🇷 South Korea",a:"🇨🇿 Czechia",grp:"A",res:[2,1],model:[1,0],exp:[1,1],you:[1,2],note:"Korea came from behind; you had Czechia edging it."},
  {h:"🇨🇦 Canada",a:"🇧🇦 Bosnia",grp:"B",res:[1,1],model:[1,0],exp:[2,1],you:[1,0],note:"Hosts held — first of many MD1 draws."},
  {h:"🇺🇸 USA",a:"🇵🇾 Paraguay",grp:"D",res:[4,1],model:[1,0],exp:[2,1],you:[2,1],note:"Balogun x2; everyone under-called the rout."},
  {h:"🇶🇦 Qatar",a:"🇨🇭 Switzerland",grp:"B",res:[1,1],model:[0,1],exp:[0,2],you:[0,2],note:"Big shock — Qatar held the group favourite."},
  {h:"🇧🇷 Brazil",a:"🇲🇦 Morocco",grp:"C",res:[1,1],model:[1,0],exp:[2,1],you:[2,1],note:"Flagged upset risk landed: BTTS draw."},
  {h:"🇭🇹 Haiti",a:"🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland",grp:"C",res:[0,1],model:[0,1],exp:[0,2],you:[0,2],note:"Model EXACT 0-1; Scotland off the mark."},
  {h:"🇦🇺 Australia",a:"🇹🇷 Türkiye",grp:"D",res:[2,0],model:[0,1],exp:[1,1],you:[0,1],note:"Socceroos stunned Türkiye — nobody had this."},
]},
{ md:2, label:"Matchday 2 · Group openers E–H · 14–15 Jun", games:[
  {h:"🇩🇪 Germany",a:"🇨🇼 Curaçao",grp:"E",res:[7,1],model:[2,0],exp:[5,1],you:[2,0],note:"Seven! Big D's bold 5-1 was closest."},
  {h:"🇳🇱 Netherlands",a:"🇯🇵 Japan",grp:"F",res:[2,2],model:[1,0],exp:[2,1],you:[1,2],note:"Mitoma-less Japan still earned a thriller draw."},
  {h:"🇨🇮 Ivory Coast",a:"🇪🇨 Ecuador",grp:"E",res:[1,0],model:[0,1],exp:[1,1],you:[0,1],note:"90th-min CIV winner; you & model had Ecuador."},
  {h:"🇸🇪 Sweden",a:"🇹🇳 Tunisia",grp:"F",res:[5,1],model:[1,0],exp:[1,0],you:[2,1],note:"Gyökeres/Isak ran riot — all under-called."},
  {h:"🇪🇸 Spain",a:"🇨🇻 Cape Verde",grp:"H",res:[0,0],model:[2,0],exp:[4,0],you:[2,0],note:"Shock: debutants shut out the tournament favourite."},
  {h:"🇧🇪 Belgium",a:"🇪🇬 Egypt",grp:"G",res:[1,1],model:[1,1],exp:[1,1],you:[1,1],note:"The one everyone nailed: all three tipped 1-1 EXACT (+4 each)."},
  {h:"🇸🇦 Saudi Arabia",a:"🇺🇾 Uruguay",grp:"H",res:[1,1],model:[0,1],exp:[0,1],you:[0,2],note:"Bielsa's Uruguay held — favourite dropped points again."},
  {h:"🇮🇷 Iran",a:"🇳🇿 New Zealand",grp:"G",res:[2,2],model:[1,0],exp:[1,0],you:[1,2],note:"NZ fought back amid Iran's disrupted prep."},
]},
{ md:3, label:"Matchday 3 · Group openers I–L · 16–18 Jun", games:[
  {h:"🇫🇷 France",a:"🇸🇳 Senegal",grp:"I",res:[3,1],model:[1,0],exp:[2,1],you:[3,1],note:"Mbappé double — and your EXACT 3-1! +4."},
  {h:"🇮🇶 Iraq",a:"🇳🇴 Norway",grp:"I",res:[1,4],model:[0,2],exp:[0,3],you:[0,2],note:"Haaland & co.; Big D's 0-3 nailed the goal-diff."},
  {h:"🇦🇷 Argentina",a:"🇩🇿 Algeria",grp:"J",res:[3,0],model:[2,0],exp:[2,0],you:[3,1],note:"Messi hat-trick, ties Klose's WC record."},
  {h:"🇦🇹 Austria",a:"🇯🇴 Jordan",grp:"J",res:[3,1],model:[1,0],exp:[2,0],you:[1,0],note:"Austria comfortable despite missing Baumgartner."},
  {h:"🇵🇹 Portugal",a:"🇨🇩 DR Congo",grp:"K",res:[1,1],model:[2,0],exp:[3,0],you:[4,0],note:"Ronaldo frustrated — Congo's big point; everyone wrong."},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",a:"🇭🇷 Croatia",grp:"L",res:[4,2],model:[1,0],exp:[2,1],you:[1,2],note:"England in a shootout! You had Croatia — the draw-watch backfired the other way."},
  {h:"🇬🇭 Ghana",a:"🇵🇦 Panama",grp:"L",res:[1,0],model:[1,0],exp:[1,0],you:null,note:"Model & Big D EXACT 1-0 (+4). You didn't tip this one."},
  {h:"🇺🇿 Uzbekistan",a:"🇨🇴 Colombia",grp:"K",res:[1,3],model:[0,1],exp:[0,2],you:null,note:"Colombia comfortable; Big D's 0-2 caught the GD (+3). You didn't tip this one."},
]},
{ md:4, label:"Matchday 4 · Round 2: Groups A–D · 18–20 Jun", games:[
  {h:"🇨🇿 Czechia",a:"🇿🇦 South Africa",grp:"A",res:[1,1],model:[1,1],mp:[42,31,27],exp:[1,0],you:null,note:"Model EXACT 1-1 (+4). You didn't get a tip in — a missed chance."},
  {h:"🇨🇭 Switzerland",a:"🇧🇦 Bosnia",grp:"B",res:[4,1],model:[1,0],mp:[54,27,19],exp:[1,1],you:[2,1],note:"Swiss romp — your 2-1 got the winner (+2)."},
  {h:"🇨🇦 Canada",a:"🇶🇦 Qatar",grp:"B",res:[6,0],model:[1,0],mp:[66,22,12],exp:[3,0],you:[2,1],note:"Jonathan David hat-trick; Canada's first-ever WC win. Everyone way under on goals."},
  {h:"🇲🇽 Mexico",a:"🇰🇷 South Korea",grp:"A",res:[1,0],model:[1,0],mp:[49,28,23],exp:[1,0],you:[1,2],note:"Model & expert EXACT 1-0 (+4). You had Korea — wrong side (0)."},
  {h:"🇺🇸 USA",a:"🇦🇺 Australia",grp:"D",res:[2,0],model:[1,0],mp:[50,28,22],exp:[2,0],you:[2,1],note:"USA clinch Group D; expert EXACT 2-0 (+4), your 2-1 got winner (+2)."},
  {h:"🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland",a:"🇲🇦 Morocco",grp:"C",res:[0,1],model:[0,1],mp:[28,31,41],exp:[0,1],you:[1,3],note:"Model & expert EXACT 0-1 (+4). Your 1-3 got the winner (+2)."},
  {h:"🇧🇷 Brazil",a:"🇭🇹 Haiti",grp:"C",res:[3,0],model:[2,0],mp:[86,10,4],exp:[4,0],you:[5,1],note:"Routine Brazil; your 5-1 got the winner (+2)."},
  {h:"🇹🇷 Türkiye",a:"🇵🇾 Paraguay",grp:"D",res:[0,1],model:[1,0],mp:[45,30,25],exp:[1,0],you:[2,1],note:"Upset: Paraguay win, Türkiye out. Everyone backed Türkiye (0)."},
]},
{ md:5, label:"Matchday 5 · Round 2: Groups E–H · 20–22 Jun", games:[
  {h:"🇳🇱 Netherlands",a:"🇸🇪 Sweden",grp:"F",res:[5,1],mp:[42,29,29],exp:[2,1],you:null,note:"Brobbey (2), Gakpo (2) and Summerville: Dutch five-star show, Elanga's reply academic. Everyone under-called this one badly."},
  {h:"🇩🇪 Germany",a:"🇨🇮 Ivory Coast",grp:"E",res:[2,1],mp:[58,25,17],exp:[2,0],you:null,note:"Kessié had CIV ahead, but Undav's 94th-minute winner off the bench sent Germany through. Expert EXACT goal-diff (+3)."},
  {h:"🇪🇨 Ecuador",a:"🇨🇼 Curaçao",grp:"E",res:[0,0],mp:[70,20,10],exp:[3,1],you:null,note:"Eloy Room's 15 saves earned Curaçao a famous point despite 75% Ecuador possession — biggest shock of the round."},
  {h:"🇹🇳 Tunisia",a:"🇯🇵 Japan",grp:"F",res:[0,4],mp:[27,30,43],exp:[0,2],you:null,note:"Ueda brace plus Kamada and Ito; Japan's record WC win eliminates Tunisia. Expert had the right winner, way under on goals."},
  {h:"🇪🇸 Spain",a:"🇸🇦 Saudi Arabia",grp:"H",res:[4,0],mp:[68,22,10],exp:[2,0],you:null,note:"Yamal + Oyarzabal brace + an OG inside the first half-hour; Spain respond to the Cape Verde shock in style."},
  {h:"🇧🇪 Belgium",a:"🇮🇷 Iran",grp:"G",res:[0,0],mp:[50,28,22],exp:[2,0],you:null,note:"Goalless stalemate — Belgium held again after the Egypt draw; Iran's low block frustrates everyone's prediction."},
  {h:"🇺🇾 Uruguay",a:"🇨🇻 Cape Verde",grp:"H",res:[2,2],mp:[55,28,17],exp:[2,0],you:null,note:"Pina's free-kick shocked Uruguay again; Bielsa's side needed two replies just to draw level. Cape Verde's second straight point."},
  {h:"🇳🇿 New Zealand",a:"🇪🇬 Egypt",grp:"G",res:[1,3],mp:[30,31,39],exp:[0,1],you:null,note:"Surman header had NZ ahead at the break, but Salah + Zico (goal & assist each) and a late Trezeguet strike turn it round — Egypt's first-ever WC win."},
]},
{ md:6, label:"Matchday 6 · Round 2: Groups I–L · 22–24 Jun", games:[
  {h:"🇳🇴 Norway",a:"🇸🇳 Senegal",grp:"I",res:[3,2],you:null,exp:null,note:"Haaland double (and a Pedersen opener) sees Norway past Senegal in a shootout — sets up a Group I decider with France."},
  {h:"🇫🇷 France",a:"🇮🇶 Iraq",grp:"I",res:[3,0],you:null,exp:null,note:"Mbappé brace + Dembélé; France through to the round of 32 with a game to spare."},
  {h:"🇦🇷 Argentina",a:"🇦🇹 Austria",grp:"J",res:[2,0],you:null,exp:null,note:"Argentina win to close in on the group; Messi's side look the part again."},
  {h:"🇯🇴 Jordan",a:"🇩🇿 Algeria",grp:"J",res:[1,2],you:null,exp:null,note:"Al-Rashdan had Jordan ahead, but Benbouali levelled and Gouiri's 82nd-minute winner eliminates them — Group J's first casualty."},
  {h:"🇵🇹 Portugal",a:"🇺🇿 Uzbekistan",grp:"K",ko:"Tue 23 Jun · 17:00 UTC",mp:[80,13,7],rec:[2,0],you:null,exp:null,note:"Portugal heavy favourites after an underwhelming 1-1 with DR Congo; Uzbekistan shipped 3 to Colombia."},
  {h:"🇨🇴 Colombia",a:"🇨🇩 DR Congo",grp:"K",ko:"Wed 24 Jun · 02:00 UTC",mp:[58,24,18],rec:[1,0],you:null,exp:null,note:"Opta supercomputer figure (58.0% Colombia from its pre-match simulations) — DR Congo's Portugal point shows they won't just roll over."},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",a:"🇬🇭 Ghana",grp:"L",ko:"Tue 23 Jun · 20:00 UTC",mp:[73,15,12],rec:[2,0],you:null,exp:null,note:"England strongly favoured at home in Foxborough; Ghana the clear underdog on the moneyline."},
  {h:"🇵🇦 Panama",a:"🇭🇷 Croatia",grp:"L",ko:"Tue 23 Jun · 23:00 UTC",mp:[16,22,62],rec:[0,1],you:null,exp:null,note:"Opta supercomputer backs Croatia in 62.0% of its pre-match simulations; must-win for already-eliminated-on-points Panama."},
]},
];

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
fs.writeFileSync(__dirname+'/index.html', html);            // GitHub Pages entry point
fs.writeFileSync(__dirname+'/.nojekyll', '');               // serve files as-is on Pages
console.log('WROTE wc2026_tipp_tracker.html + index.html ('+html.length+' bytes)');
console.log('You   :', JSON.stringify(T_you));
console.log('Model :', JSON.stringify(T_mod));
console.log('Expert:', JSON.stringify(T_exp));
console.log('Next matchday:', nextMd?nextMd.label:'none');
// dump ST4 model scores
for(const g of MATCHDAYS[3].games) console.log('  MD4 model', g.h.replace(/[^A-Za-z ]/g,'').trim(),'v',g.a.replace(/[^A-Za-z ]/g,'').trim(),'=>',g.model, g.mp||'');
