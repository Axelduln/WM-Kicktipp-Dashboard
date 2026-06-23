/* ============================================================
   World Cup 2026 tracker — data only.
   Edit this file when adding results / new matchdays / refreshed
   pre-match probabilities. build_wc_dashboard.js renders it,
   scripts/check_status.js tells you which games need attention.
   Each game: {h,a,grp,ko,res,model,mp,exp,you}
     res/model/you = [H,A] or null ; mp = [win,draw,loss]% (optional, feeds the model)
     ko = "Day DD Mon · HH:MM UTC" (always UTC — keep it that way, the
          status checker assumes it)
   ============================================================ */

const UPDATED = "Tue 23 June 2026, 15:40 UTC";
const YOU_NAME = "Madausinho";
const YOU_RANK = "13th of 20 active";
const YOU_TOTAL = 44;

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
  {h:"🇵🇹 Portugal",a:"🇺🇿 Uzbekistan",grp:"K",ko:"Tue 23 Jun · 17:00 UTC",mp:[83,11,6],rec:[2,0],you:null,exp:null,note:"Opta: 83.1% Portugal from its pre-match simulations. Rúben Dias passed fit; Uzbekistan's only doubt is Ashurmatov after the Colombia loss."},
  {h:"🇨🇴 Colombia",a:"🇨🇩 DR Congo",grp:"K",ko:"Wed 24 Jun · 02:00 UTC",mp:[58,24,18],rec:[1,0],you:null,exp:null,note:"Opta supercomputer figure (58.0% Colombia from its pre-match simulations) — DR Congo's Portugal point shows they won't just roll over."},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",a:"🇬🇭 Ghana",grp:"L",ko:"Tue 23 Jun · 20:00 UTC",mp:[79,13,8],rec:[2,0],you:null,exp:null,note:"Opta: 78.8% England. Saka no longer feeling his Achilles issue; Ghana's Partey available again after a visa-related absence vs Panama."},
  {h:"🇵🇦 Panama",a:"🇭🇷 Croatia",grp:"L",ko:"Tue 23 Jun · 23:00 UTC",mp:[16,21,63],rec:[0,1],you:null,exp:null,note:"Opta now has Croatia winning 63.0% of simulations; must-win for already-eliminated-on-points Panama, who get Carrasquilla back from injury."},
]},
];

module.exports = { UPDATED, YOU_NAME, YOU_RANK, YOU_TOTAL, MATCHDAYS };
