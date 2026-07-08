/* ============================================================
   World Cup 2026 tracker — data only.
   Edit this file when adding results / new matchdays / refreshed
   pre-match probabilities. build_wc_dashboard.js renders it,
   scripts/check_status.js tells you which games need attention.
   Each game: {h,a,grp,ko,res,model,mp,exp,you}
     res/model/you = [H,A] or null ; mp = [win,draw,loss]% (optional, feeds the model)
     ko = "Day DD Mon · HH:MM UTC" (always UTC — keep it that way, the
          status checker assumes it)
   Knockout stage: grp = "R32" / "R16" / "QF" / "SF" / "F"
   ============================================================ */

const UPDATED = "Tue 8 July 2026, 08:30 UTC";
const YOU_NAME = "Madausinho";
const YOU_RANK = "13th of 20 active"; // update with latest kicktipp rank
const YOU_TOTAL = 44; // update with latest kicktipp total (incl. bonus pts)

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
  {h:"🇳🇿 New Zealand",a:"🇪🇬 Egypt",grp:"G",res:[1,3],mp:[30,31,39],exp:[0,1],you:null,note:"Surman header had NZ ahead at the break, but Salah + Zico and a late Trezeguet strike turn it round — Egypt's first-ever WC win."},
]},
{ md:6, label:"Matchday 6 · Round 2: Groups I–L · 22–24 Jun", games:[
  {h:"🇳🇴 Norway",a:"🇸🇳 Senegal",grp:"I",res:[3,2],you:null,exp:null,note:"Haaland double (and a Pedersen opener) sees Norway past Senegal — sets up a Group I decider with France."},
  {h:"🇫🇷 France",a:"🇮🇶 Iraq",grp:"I",res:[3,0],you:null,exp:null,note:"Mbappé brace + Dembélé; France through to the round of 32 with a game to spare."},
  {h:"🇦🇷 Argentina",a:"🇦🇹 Austria",grp:"J",res:[2,0],you:null,exp:null,note:"Argentina win to close in on the group; Messi's side look the part again."},
  {h:"🇯🇴 Jordan",a:"🇩🇿 Algeria",grp:"J",res:[1,2],you:null,exp:null,note:"Al-Rashdan had Jordan ahead, but Benbouali levelled and Gouiri's 82nd-minute winner eliminates them."},
  {h:"🇵🇹 Portugal",a:"🇺🇿 Uzbekistan",grp:"K",res:[5,0],mp:[83,11,6],you:null,exp:null,note:"Portugal 5–0: emphatic statement ahead of the Group K decider vs Colombia. Model called the winner."},
  {h:"🇨🇴 Colombia",a:"🇨🇩 DR Congo",grp:"K",res:[1,0],mp:[58,24,18],you:null,exp:null,note:"Colombia 1–0: Opta-favoured result lands. Model EXACT 1-0."},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",a:"🇬🇭 Ghana",grp:"L",res:[0,0],mp:[79,13,8],you:null,exp:null,note:"Flat 0–0; England held by Ghana. Model had England winning — a miss for the statistical pick."},
  {h:"🇵🇦 Panama",a:"🇭🇷 Croatia",grp:"L",res:[0,1],mp:[16,21,63],you:null,exp:null,note:"Croatia grind out the three points; Panama yet to score. Model EXACT 0-1."},
]},
{ md:7, label:"Matchday 7 · Final group round: Groups A–D · 24–25 Jun", games:[
  {h:"🇲🇽 Mexico",a:"🇨🇿 Czechia",grp:"A",res:[3,0],you:null,exp:null,model:null,note:"Mexico become the first co-host to win all 3 group-stage games; Quiñones hat-trick."},
  {h:"🇰🇷 South Korea",a:"🇿🇦 South Africa",grp:"A",res:[0,1],you:null,exp:null,model:null,note:"South Africa qualify as Group A runners-up; South Korea eliminated."},
  {h:"🇨🇭 Switzerland",a:"🇨🇦 Canada",grp:"B",res:[2,1],you:null,exp:null,model:null,note:"Vargas and Manzambi send Switzerland through as group winners; Canada qualify 2nd despite the loss."},
  {h:"🇧🇦 Bosnia",a:"🇶🇦 Qatar",grp:"B",res:[3,1],you:null,exp:null,model:null,note:"Alajbegovic becomes one of WC's youngest ever scorers; Bosnia advance as one of the 8 best 3rd-place teams."},
  {h:"🇧🇷 Brazil",a:"🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland",grp:"C",res:[3,0],you:null,exp:null,model:null,note:"Vinícius Júnior brace; Brazil win Group C convincingly and head into the knockouts in form."},
  {h:"🇲🇦 Morocco",a:"🇭🇹 Haiti",grp:"C",res:[4,2],you:null,exp:null,model:null,note:"Morocco's goal-fest secures 2nd in Group C; Haiti exit winless."},
  {h:"🇺🇸 USA",a:"🇹🇷 Türkiye",grp:"D",res:[2,3],you:null,exp:null,model:null,note:"Kaan Ayhan 90+8' completes a stunning Turkey comeback — dead rubber as USA already through as group winners."},
  {h:"🇦🇺 Australia",a:"🇵🇾 Paraguay",grp:"D",res:[0,0],you:null,exp:null,model:null,note:"Goalless draw: Australia qualify 2nd in Group D; Paraguay advance as one of the 8 best 3rd-place teams on goal difference."},
]},
{ md:8, label:"Matchday 8 · Final group round: Groups E–H · 25–26 Jun", games:[
  {h:"🇩🇪 Germany",a:"🇪🇨 Ecuador",grp:"E",res:[1,2],you:null,exp:null,model:null,note:"Ecuador shock the 7-goal Germany side in what looked a dead rubber — Germany still top the group on accumulated points."},
  {h:"🇨🇮 Ivory Coast",a:"🇨🇼 Curaçao",grp:"E",res:[2,0],you:null,exp:null,model:null,note:"Ivory Coast qualify as Group E runners-up; Ecuador's concurrent win means they also advance as best 3rd."},
  {h:"🇳🇱 Netherlands",a:"🇹🇳 Tunisia",grp:"F",res:[3,1],you:null,exp:null,model:null,note:"Netherlands win Group F convincingly; Tunisia exit having conceded 9 goals across the group stage."},
  {h:"🇯🇵 Japan",a:"🇸🇪 Sweden",grp:"F",res:[1,1],you:null,exp:null,model:null,note:"Both advance — Japan 2nd, Sweden as one of the 8 best 3rd-place teams."},
  {h:"🇧🇪 Belgium",a:"🇳🇿 New Zealand",grp:"G",res:[5,1],you:null,exp:null,model:null,note:"Belgium demolish New Zealand 5–1 to seal top spot in Group G."},
  {h:"🇮🇷 Iran",a:"🇪🇬 Egypt",grp:"G",res:[1,1],you:null,exp:null,model:null,note:"Egypt claim 2nd in Group G on goal difference; Iran eliminated despite a spirited tournament."},
  {h:"🇪🇸 Spain",a:"🇺🇾 Uruguay",grp:"H",res:[1,0],you:null,exp:null,model:null,note:"Spain top Group H; Uruguay's early exit is a major disappointment for Bielsa's side."},
  {h:"🇸🇦 Saudi Arabia",a:"🇨🇻 Cape Verde",grp:"H",res:[0,0],you:null,exp:null,model:null,note:"Cape Verde's third draw! The debutants qualify as Group H runners-up — first WC debutant to reach the knockouts since Slovakia 2010."},
]},
{ md:9, label:"Matchday 9 · Final group round: Groups I–L · 26–27 Jun", games:[
  {h:"🇳🇴 Norway",a:"🇫🇷 France",grp:"I",res:[1,4],you:null,exp:null,model:null,note:"France win the group's top-two clash 4–1; Mbappé dominant. Haaland's consolation takes him to 5 tournament goals."},
  {h:"🇸🇳 Senegal",a:"🇮🇶 Iraq",grp:"I",res:[5,0],you:null,exp:null,model:null,note:"Senegal end the group stage with a 5–0 rout; they advance as one of the 8 best 3rd-place teams."},
  {h:"🇦🇷 Argentina",a:"🇯🇴 Jordan",grp:"J",res:[3,1],you:null,exp:null,model:null,note:"Argentina top Group J with a perfect record; Messi adds another goal."},
  {h:"🇦🇹 Austria",a:"🇩🇿 Algeria",grp:"J",res:[3,3],you:null,exp:null,model:null,note:"Wild 3–3 draw; Austria finish 2nd, Algeria advance as one of the best 3rd-place teams."},
  {h:"🇨🇴 Colombia",a:"🇵🇹 Portugal",grp:"K",res:[0,0],you:null,exp:null,model:null,note:"Cautious draw; Colombia seal Group K top spot, Portugal through as runners-up."},
  {h:"🇨🇩 DR Congo",a:"🇺🇿 Uzbekistan",grp:"K",res:[3,1],you:null,exp:null,model:null,note:"DR Congo's 3–1 win earns them a spot as one of the best 3rd-place teams; Uzbekistan exit."},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",a:"🇵🇦 Panama",grp:"L",res:[2,0],you:null,exp:null,model:null,note:"England top Group L; Panama exit having lost all 3 games without scoring a single goal."},
  {h:"🇭🇷 Croatia",a:"🇬🇭 Ghana",grp:"L",res:[2,1],you:null,exp:null,model:null,note:"Croatia qualify as Group L runners-up; Ghana advance as one of the 8 best 3rd-place teams."},
]},
{ md:10, nav:"R32", label:"Round of 32 · 28 Jun – 3 Jul", games:[
  {h:"🇨🇦 Canada",a:"🇿🇦 South Africa",grp:"R32",res:[1,0],you:null,exp:null,model:null,note:"Eustaquio 90+2' winner — Canada's first-ever WC knockout win."},
  {h:"🇧🇷 Brazil",a:"🇯🇵 Japan",grp:"R32",res:[2,1],you:null,exp:null,model:null,note:"Brazil came from behind to beat Japan; five-star favourites look vulnerable."},
  {h:"🇩🇪 Germany",a:"🇵🇾 Paraguay",grp:"R32",res:[1,1],you:null,exp:null,model:null,note:"SHOCK — Paraguay eliminate Germany on penalties (4-3); one of the biggest upsets in WC history."},
  {h:"🇳🇱 Netherlands",a:"🇲🇦 Morocco",grp:"R32",res:[1,1],you:null,exp:null,model:null,note:"SHOCK — Morocco eliminate Netherlands on penalties (3-2); echoes of Qatar 2022 reverberate."},
  {h:"🇳🇴 Norway",a:"🇨🇮 Ivory Coast",grp:"R32",res:[2,1],you:null,exp:null,model:null,note:"Haaland on target; Norway's first-ever WC knockout-round win sends them into the last 16."},
  {h:"🇫🇷 France",a:"🇸🇪 Sweden",grp:"R32",res:[3,0],you:null,exp:null,model:null,note:"Mbappé brace; France dominant and looking like genuine title contenders."},
  {h:"🇲🇽 Mexico",a:"🇪🇨 Ecuador",grp:"R32",res:[2,0],you:null,exp:null,model:null,note:"Mexico's first knockout-round win since 1986; Ecuador eliminated after a spirited group stage."},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",a:"🇨🇩 DR Congo",grp:"R32",res:[2,1],you:null,exp:null,model:null,note:"Kane scored twice; England through to the Round of 16 despite some nervy moments."},
  {h:"🇧🇪 Belgium",a:"🇸🇳 Senegal",grp:"R32",res:[3,2],you:null,exp:null,model:null,note:"Belgium edge a thriller 3–2 AET; Tielemans' penalty in extra time the decisive moment."},
  {h:"🇺🇸 USA",a:"🇧🇦 Bosnia",grp:"R32",res:[2,0],you:null,exp:null,model:null,note:"Comfortable USMNT win on home soil; the co-hosts advance to the Round of 16."},
  {h:"🇪🇸 Spain",a:"🇦🇹 Austria",grp:"R32",res:[3,0],you:null,exp:null,model:null,note:"Spain dominant throughout; Austria's solid tournament run ends in the Round of 32."},
  {h:"🇵🇹 Portugal",a:"🇭🇷 Croatia",grp:"R32",res:[2,1],you:null,exp:null,model:null,note:"Portugal edge past Croatia 2–1; Croatia eliminated in the first knockout round."},
  {h:"🇨🇭 Switzerland",a:"🇩🇿 Algeria",grp:"R32",res:[2,0],you:null,exp:null,model:null,note:"Switzerland advance comfortably; Algeria's impressive run as best-3rd finishers ends here."},
  {h:"🇪🇬 Egypt",a:"🇦🇺 Australia",grp:"R32",res:[1,1],you:null,exp:null,model:null,note:"Egypt edge Australia on penalties (4-2) to reach the R16 for the first time in their history."},
  {h:"🇦🇷 Argentina",a:"🇨🇻 Cape Verde",grp:"R32",res:[3,2],you:null,exp:null,model:null,note:"Argentina survive a Cape Verde scare; the debutants exit after a remarkable debut tournament."},
  {h:"🇨🇴 Colombia",a:"🇬🇭 Ghana",grp:"R32",res:[1,0],you:null,exp:null,model:null,note:"Colombia through to the Round of 16 with a tight 1–0 win over Ghana."},
]},
{ md:11, nav:"R16", label:"Round of 16 · 4–7 Jul", games:[
  {h:"🇨🇦 Canada",a:"🇲🇦 Morocco",grp:"R16",res:[0,3],you:null,exp:null,model:null,note:"Ounahi brace (50', 82') and Rahimi 90+' — Morocco demolish Canada. First co-host eliminated in the R16. Morocco are the first African nation to reach the QF more than once."},
  {h:"🇵🇾 Paraguay",a:"🇫🇷 France",grp:"R16",res:[0,1],you:null,exp:null,model:null,note:"Mbappé penalty (VAR, 69') the only difference; France advance quietly but surely to the quarterfinals."},
  {h:"🇧🇷 Brazil",a:"🇳🇴 Norway",grp:"R16",res:[1,2],you:null,exp:null,model:null,note:"Haaland brace (79', 90') — Norway reach their first-ever WC quarterfinal; Brazil suffer their earliest exit since 1990."},
  {h:"🇲🇽 Mexico",a:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",grp:"R16",res:[2,3],you:null,exp:null,model:null,note:"Bellingham quickfire brace, Quansah red (54'), Kane pen (60'); 10-man England hold on at the Azteca in a WC classic."},
  {h:"🇵🇹 Portugal",a:"🇪🇸 Spain",grp:"R16",res:[0,1],you:null,exp:null,model:null,note:"Merino 90+' winner for Spain; widely reported as Ronaldo's final WC game. The Iberian Derby settled in injury time."},
  {h:"🇺🇸 USA",a:"🇧🇪 Belgium",grp:"R16",res:[1,4],you:null,exp:null,model:null,note:"Belgium dominant from the 9th minute; Freese error gifted the 3rd goal. No host nation remains in the tournament."},
  {h:"🇪🇬 Egypt",a:"🇦🇷 Argentina",grp:"R16",res:[2,3],you:null,exp:null,model:null,note:"Stunning Argentina comeback: 0–2 down in the 78th min, then Romero (79'), Messi (83'), Fernandez (90+') to win in normal time."},
  {h:"🇨🇭 Switzerland",a:"🇨🇴 Colombia",grp:"R16",res:[0,0],you:null,exp:null,model:null,note:"Goalless after 120 min; Kobel saved Cucho's penalty, Vargas scored the winner in a 4-3 shootout. Colombia eliminated."},
]},
{ md:12, nav:"QF", label:"Quarterfinals · from 10 Jul", games:[
  {h:"🇲🇦 Morocco",a:"🇫🇷 France",grp:"QF",you:null,exp:null,model:null,note:"QF confirmed — schedule and Opta probabilities TBC."},
  {h:"🇳🇴 Norway",a:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",grp:"QF",you:null,exp:null,model:null,note:"QF confirmed — schedule and Opta probabilities TBC."},
  {h:"🇪🇸 Spain",a:"🇧🇪 Belgium",grp:"QF",you:null,exp:null,model:null,note:"QF confirmed — schedule and Opta probabilities TBC."},
  {h:"🇦🇷 Argentina",a:"🇨🇭 Switzerland",grp:"QF",you:null,exp:null,model:null,note:"QF confirmed — schedule and Opta probabilities TBC."},
]},
];

module.exports = { UPDATED, YOU_NAME, YOU_RANK, YOU_TOTAL, MATCHDAYS };
