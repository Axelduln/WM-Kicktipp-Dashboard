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

const UPDATED = "Wed 8 Jul 2026, 12:00 UTC";
const YOU_NAME = "Madausinho";
const YOU_RANK = "16th of 23";
const YOU_TOTAL = 162; // incl. 32 bonus pts; real tips now synced from kicktipp

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
  {h:"🇳🇱 Netherlands",a:"🇸🇪 Sweden",grp:"F",res:[5,1],mp:[42,29,29],exp:[2,1],you:[2,1],note:"Brobbey (2), Gakpo (2) and Summerville: Dutch five-star show. Your 2-1 got the winner (+2)."},
  {h:"🇩🇪 Germany",a:"🇨🇮 Ivory Coast",grp:"E",res:[2,1],mp:[58,25,17],exp:[2,0],you:[3,1],note:"Kessié had CIV ahead, but Undav's 94th-minute winner. Your 3-1 got the winner (+2)."},
  {h:"🇪🇨 Ecuador",a:"🇨🇼 Curaçao",grp:"E",res:[0,0],mp:[70,20,10],exp:[3,1],you:[3,0],note:"Eloy Room's 15 saves earned Curaçao a famous point — biggest shock of the round. Everyone wrong (0)."},
  {h:"🇹🇳 Tunisia",a:"🇯🇵 Japan",grp:"F",res:[0,4],mp:[27,30,43],exp:[0,2],you:[1,2],note:"Ueda brace plus Kamada and Ito; Japan's record WC win. Your 1-2 got the winner (+2)."},
  {h:"🇪🇸 Spain",a:"🇸🇦 Saudi Arabia",grp:"H",res:[4,0],mp:[68,22,10],exp:[2,0],you:[2,0],note:"Yamal + Oyarzabal brace inside first half-hour; Spain respond to the Cape Verde shock. Your 2-0 nailed the winner & GD (+3)."},
  {h:"🇧🇪 Belgium",a:"🇮🇷 Iran",grp:"G",res:[0,0],mp:[50,28,22],exp:[2,0],you:[3,1],note:"Goalless stalemate — Belgium held again after the Egypt draw. Everyone wrong (0)."},
  {h:"🇺🇾 Uruguay",a:"🇨🇻 Cape Verde",grp:"H",res:[2,2],mp:[55,28,17],exp:[2,0],you:[3,0],note:"Pina's free-kick shocked Uruguay again; two replies just to draw level. You tipped Uruguay win (0)."},
  {h:"🇳🇿 New Zealand",a:"🇪🇬 Egypt",grp:"G",res:[1,3],mp:[30,31,39],exp:[0,1],you:[0,1],note:"Salah + Zico + Trezeguet; Egypt's first-ever WC win. Your 0-1 got the winner (+2)."},
]},
{ md:6, label:"Matchday 6 · Round 2: Groups I–L · 22–24 Jun", games:[
  {h:"🇳🇴 Norway",a:"🇸🇳 Senegal",grp:"I",res:[3,2],mp:[55,25,20],you:[2,1],exp:null,note:"Haaland double (and a Pedersen opener) sees Norway past Senegal. Your 2-1 got the winner (+2)."},
  {h:"🇫🇷 France",a:"🇮🇶 Iraq",grp:"I",res:[3,0],mp:[78,15,7],you:[4,1],exp:null,note:"Mbappé brace + Dembélé; France through. Your 4-1 got the winner & GD (+3)."},
  {h:"🇦🇷 Argentina",a:"🇦🇹 Austria",grp:"J",res:[2,0],mp:[65,22,13],you:[3,1],exp:null,note:"Argentina win to close in on the group. Your 3-1 got the winner (+2)."},
  {h:"🇯🇴 Jordan",a:"🇩🇿 Algeria",grp:"J",res:[1,2],mp:[25,28,47],you:[0,1],exp:null,note:"Gouiri's 82nd-minute winner eliminates Jordan. Your 0-1 got the winner & GD (+3)."},
  {h:"🇵🇹 Portugal",a:"🇺🇿 Uzbekistan",grp:"K",res:[5,0],mp:[83,11,6],you:[3,1],exp:null,note:"Portugal 5–0: emphatic statement. Your 3-1 got the winner (+2)."},
  {h:"🇨🇴 Colombia",a:"🇨🇩 DR Congo",grp:"K",res:[1,0],mp:[58,24,18],you:[2,1],exp:null,note:"Colombia 1–0. Model EXACT 1-0 (+4). Your 2-1 got the winner (+2)."},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",a:"🇬🇭 Ghana",grp:"L",res:[0,0],mp:[79,13,8],you:[3,0],exp:null,note:"Flat 0–0; England held by Ghana. Everyone tipped an England win (0)."},
  {h:"🇵🇦 Panama",a:"🇭🇷 Croatia",grp:"L",res:[0,1],mp:[16,21,63],you:[0,2],exp:null,note:"Croatia grind out three points. Your 0-2 got the winner & GD (+3)."},
]},
{ md:7, label:"Matchday 7 · Final group round: Groups A–D · 24–25 Jun", games:[
  {h:"🇲🇽 Mexico",a:"🇨🇿 Czechia",grp:"A",res:[3,0],mp:[65,20,15],you:[1,0],exp:null,note:"Mexico become first co-host to win all 3 group games; Quiñones hat-trick. Your 1-0 got the winner (+2)."},
  {h:"🇰🇷 South Korea",a:"🇿🇦 South Africa",grp:"A",res:[0,1],mp:[45,28,27],you:[1,0],exp:null,note:"South Africa qualify as Group A runners-up; South Korea eliminated. You tipped SK win (0)."},
  {h:"🇨🇭 Switzerland",a:"🇨🇦 Canada",grp:"B",res:[2,1],mp:[55,25,20],you:[1,2],exp:null,note:"Vargas and Manzambi send Switzerland through as group winners. You tipped Canada (0)."},
  {h:"🇧🇦 Bosnia",a:"🇶🇦 Qatar",grp:"B",res:[3,1],mp:[60,22,18],you:[2,1],exp:null,note:"Alajbegovic youngest WC scorer; Bosnia advance as best 3rd. Your 2-1 got the winner (+2)."},
  {h:"🇧🇷 Brazil",a:"🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland",grp:"C",res:[3,0],mp:[65,20,15],you:[1,0],exp:null,note:"Vinícius Júnior brace; Brazil win Group C. Your 1-0 got the winner (+2)."},
  {h:"🇲🇦 Morocco",a:"🇭🇹 Haiti",grp:"C",res:[4,2],mp:[75,18,7],you:[1,0],exp:null,note:"Morocco's goal-fest secures 2nd in Group C. Your 1-0 got the winner (+2)."},
  {h:"🇺🇸 USA",a:"🇹🇷 Türkiye",grp:"D",res:[2,3],mp:[45,28,27],you:[2,0],exp:null,note:"Kaan Ayhan 90+8' completes a stunning Turkey comeback — dead rubber for USA. You tipped USA win (0)."},
  {h:"🇦🇺 Australia",a:"🇵🇾 Paraguay",grp:"D",res:[0,0],mp:[45,27,28],you:[1,0],exp:null,note:"Goalless draw: Australia qualify 2nd, Paraguay as best-3rd. You tipped Australia win (0)."},
]},
{ md:8, label:"Matchday 8 · Final group round: Groups E–H · 25–26 Jun", games:[
  {h:"🇩🇪 Germany",a:"🇪🇨 Ecuador",grp:"E",res:[1,2],mp:[55,25,20],you:[1,0],exp:null,note:"Ecuador shock Germany in a dead rubber — Germany still top on accumulated points. You tipped Germany win (0)."},
  {h:"🇨🇮 Ivory Coast",a:"🇨🇼 Curaçao",grp:"E",res:[2,0],mp:[75,18,7],you:[2,0],exp:null,note:"Ivory Coast qualify as Group E runners-up. Your EXACT 2-0 (+4)!"},
  {h:"🇳🇱 Netherlands",a:"🇹🇳 Tunisia",grp:"F",res:[3,1],mp:[70,20,10],you:[2,1],exp:null,note:"Netherlands win Group F convincingly. Your 2-1 got the winner (+2)."},
  {h:"🇯🇵 Japan",a:"🇸🇪 Sweden",grp:"F",res:[1,1],mp:[40,30,30],you:[2,1],exp:null,note:"Both advance — Japan 2nd, Sweden as best 3rd. You tipped Japan win (0)."},
  {h:"🇧🇪 Belgium",a:"🇳🇿 New Zealand",grp:"G",res:[5,1],mp:[75,18,7],you:[2,1],exp:null,note:"Belgium demolish NZ 5–1 to seal top spot in Group G. Your 2-1 got the winner (+2)."},
  {h:"🇮🇷 Iran",a:"🇪🇬 Egypt",grp:"G",res:[1,1],mp:[35,30,35],you:[1,2],exp:null,note:"Egypt claim 2nd in Group G on goal difference; Iran eliminated. You tipped Egypt win (0)."},
  {h:"🇪🇸 Spain",a:"🇺🇾 Uruguay",grp:"H",res:[1,0],mp:[60,22,18],you:[3,1],exp:null,note:"Spain top Group H; Uruguay's early exit a major disappointment. Your 3-1 got the winner (+2)."},
  {h:"🇸🇦 Saudi Arabia",a:"🇨🇻 Cape Verde",grp:"H",res:[0,0],mp:[45,28,27],you:[1,0],exp:null,note:"Cape Verde's third draw! First WC debutant to reach knockouts since Slovakia 2010. You tipped SA win (0)."},
]},
{ md:9, label:"Matchday 9 · Final group round: Groups I–L · 26–27 Jun", games:[
  {h:"🇳🇴 Norway",a:"🇫🇷 France",grp:"I",res:[1,4],mp:[27,28,45],you:null,exp:null,note:"France win the group's top-two clash 4–1; Mbappé dominant. Haaland's consolation takes him to 5 tournament goals."},
  {h:"🇸🇳 Senegal",a:"🇮🇶 Iraq",grp:"I",res:[5,0],mp:[75,16,9],you:null,exp:null,note:"Senegal end the group stage with a 5–0 rout; they advance as one of the 8 best 3rd-place teams."},
  {h:"🇦🇷 Argentina",a:"🇯🇴 Jordan",grp:"J",res:[3,1],mp:[80,14,6],you:[3,0],exp:null,note:"Argentina top Group J with a perfect record; Messi adds another goal. Your 3-0 got the winner & GD (+3)."},
  {h:"🇦🇹 Austria",a:"🇩🇿 Algeria",grp:"J",res:[3,3],mp:[40,28,32],you:[1,0],exp:null,note:"Wild 3–3 draw; Austria finish 2nd, Algeria advance as best 3rd. You tipped Austria win (0)."},
  {h:"🇨🇴 Colombia",a:"🇵🇹 Portugal",grp:"K",res:[0,0],mp:[42,30,28],you:[2,1],exp:null,note:"Cautious draw; Colombia seal Group K top spot, Portugal through as runners-up. You tipped Colombia win (0)."},
  {h:"🇨🇩 DR Congo",a:"🇺🇿 Uzbekistan",grp:"K",res:[3,1],mp:[65,20,15],you:[0,1],exp:null,note:"DR Congo's 3–1 win earns them a spot as best-3rd; Uzbekistan exit. You tipped Uzbekistan win (0)."},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",a:"🇵🇦 Panama",grp:"L",res:[2,0],mp:[80,14,6],you:[3,1],exp:null,note:"England top Group L; Panama exit scoreless. Your 3-1 got the winner (+2)."},
  {h:"🇭🇷 Croatia",a:"🇬🇭 Ghana",grp:"L",res:[2,1],mp:[45,28,27],you:[3,1],exp:null,note:"Croatia qualify as Group L runners-up; Ghana advance as best 3rd. Your 3-1 got the winner (+2)."},
]},
{ md:10, nav:"R32", label:"Round of 32 · 28 Jun – 3 Jul", games:[
  {h:"🇨🇦 Canada",a:"🇿🇦 South Africa",grp:"R32",res:[1,0],mp:[65,20,15],you:[2,1],exp:null,note:"Eustaquio 90+2' winner — Canada's first-ever WC knockout win. Your 2-1 got the winner (+2)."},
  {h:"🇧🇷 Brazil",a:"🇯🇵 Japan",grp:"R32",res:[2,1],mp:[60,22,18],you:[1,2],exp:null,note:"Brazil came from behind to beat Japan. You tipped Japan (0)."},
  {h:"🇩🇪 Germany",a:"🇵🇾 Paraguay",grp:"R32",res:[1,1],mp:[75,16,9],you:[2,1],exp:null,note:"SHOCK — Paraguay eliminate Germany on penalties (4-3). You tipped Germany win (0)."},
  {h:"🇳🇱 Netherlands",a:"🇲🇦 Morocco",grp:"R32",res:[1,1],mp:[50,27,23],you:[1,2],exp:null,note:"SHOCK — Morocco eliminate Netherlands on penalties (3-2); echoes of Qatar 2022. You tipped Morocco win, correct call (+2)."},
  {h:"🇳🇴 Norway",a:"🇨🇮 Ivory Coast",grp:"R32",res:[2,1],mp:[52,26,22],you:[1,0],exp:null,note:"Haaland on target; Norway's first-ever WC knockout-round win. Your 1-0 got the winner (+2)."},
  {h:"🇫🇷 France",a:"🇸🇪 Sweden",grp:"R32",res:[3,0],mp:[80,14,6],you:[3,1],exp:null,note:"Mbappé brace; France dominant. Your 3-1 got the winner & GD (+3)."},
  {h:"🇲🇽 Mexico",a:"🇪🇨 Ecuador",grp:"R32",res:[2,0],mp:[53,25,22],you:[2,1],exp:null,note:"Mexico's first knockout-round win since 1986. Your 2-1 got the winner (+2)."},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",a:"🇨🇩 DR Congo",grp:"R32",res:[2,1],mp:[82,12,6],you:[3,0],exp:null,note:"Kane scored twice; England through. Your 3-0 got the winner (+2)."},
  {h:"🇧🇪 Belgium",a:"🇸🇳 Senegal",grp:"R32",res:[3,2],mp:[52,26,22],you:[1,2],exp:null,note:"Belgium edge a thriller 3–2 AET; Tielemans' penalty decisive. You tipped Senegal (0)."},
  {h:"🇺🇸 USA",a:"🇧🇦 Bosnia",grp:"R32",res:[2,0],mp:[77,16,7],you:[2,1],exp:null,note:"Comfortable USMNT win on home soil. Your 2-1 got the winner (+2)."},
  {h:"🇪🇸 Spain",a:"🇦🇹 Austria",grp:"R32",res:[3,0],mp:[82,12,6],you:[2,1],exp:null,note:"Spain dominant throughout. Your 2-1 got the winner (+2)."},
  {h:"🇵🇹 Portugal",a:"🇭🇷 Croatia",grp:"R32",res:[2,1],mp:[56,25,19],you:[3,1],exp:null,note:"Portugal edge past Croatia 2–1. Your 3-1 got the winner (+2)."},
  {h:"🇨🇭 Switzerland",a:"🇩🇿 Algeria",grp:"R32",res:[2,0],mp:[64,20,16],you:[1,0],exp:null,note:"Switzerland advance comfortably. Your 1-0 got the winner (+2)."},
  {h:"🇪🇬 Egypt",a:"🇦🇺 Australia",grp:"R32",res:[1,1],mp:[43,30,27],you:[1,0],exp:null,note:"Egypt edge Australia on penalties (4-2) to reach the R16 for the first time. You tipped Egypt win (0)."},
  {h:"🇦🇷 Argentina",a:"🇨🇻 Cape Verde",grp:"R32",res:[3,2],mp:[88,9,3],you:[3,1],exp:null,note:"Argentina survive a Cape Verde scare. Your 3-1 got the winner & GD (+3)."},
  {h:"🇨🇴 Colombia",a:"🇬🇭 Ghana",grp:"R32",res:[1,0],mp:[62,21,17],you:[2,1],exp:null,note:"Colombia through with a tight 1–0. Your 2-1 got the winner (+2)."},
]},
{ md:11, nav:"R16", label:"Round of 16 · 4–7 Jul", games:[
  {h:"🇨🇦 Canada",a:"🇲🇦 Morocco",grp:"R16",res:[0,3],mp:[55,25,20],you:null,exp:null,note:"Ounahi brace (50', 82') and Rahimi 90+' — Morocco demolish Canada. First co-host eliminated in the R16. You didn't tip this one."},
  {h:"🇵🇾 Paraguay",a:"🇫🇷 France",grp:"R16",res:[0,1],mp:[8,20,72],you:[0,4],exp:null,note:"Mbappé penalty (VAR, 69') the only difference; France advance to the QF. Your 0-4 got the winner (+2)."},
  {h:"🇧🇷 Brazil",a:"🇳🇴 Norway",grp:"R16",res:[1,2],mp:[54,26,20],you:[3,1],exp:null,note:"Haaland brace (79', 90') — Norway reach their first-ever WC QF. You tipped Brazil (0)."},
  {h:"🇲🇽 Mexico",a:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",grp:"R16",res:[2,3],mp:[31,31,38],you:[2,1],exp:null,note:"Bellingham quickfire brace, Quansah red (54'), Kane pen (60'); 10-man England hold on at the Azteca. You tipped Mexico win (0)."},
  {h:"🇵🇹 Portugal",a:"🇪🇸 Spain",grp:"R16",res:[0,1],mp:[21,28,51],you:[2,3],exp:null,note:"Merino 90+' winner for Spain; widely reported as Ronaldo's final WC game. Your 2-3 got the winner (+2)."},
  {h:"🇺🇸 USA",a:"🇧🇪 Belgium",grp:"R16",res:[1,4],mp:[39,28,33],you:[2,1],exp:null,note:"Belgium dominant from the 9th minute. You tipped USA win (0)."},
  {h:"🇪🇬 Egypt",a:"🇦🇷 Argentina",grp:"R16",res:[2,3],mp:[10,20,70],you:[1,3],exp:null,note:"Stunning Argentina comeback: 0–2 down in 78', then Romero (79'), Messi (83'), Fernandez (90+'). Your 1-3 got the winner (+2)."},
  {h:"🇨🇭 Switzerland",a:"🇨🇴 Colombia",grp:"R16",res:[0,0],mp:[26,32,42],you:[2,1],exp:null,note:"Goalless after 120 min; Switzerland win 4-3 on pens. You tipped Switzerland win, correct call (+2)."},
]},
{ md:12, nav:"QF", label:"Quarterfinals · 9–11 Jul", games:[
  {h:"🇲🇦 Morocco",a:"🇫🇷 France",grp:"QF",ko:"Thu 9 Jul · 20:00 UTC",mp:[15,24,61],rec:[0,1],you:null,exp:null,note:"Gillette Stadium, Boston. France haven't conceded yet in the knockout rounds; Morocco beat Canada 3-0 in the R16. France heavy favourites (-180)."},
  {h:"🇪🇸 Spain",a:"🇧🇪 Belgium",grp:"QF",ko:"Fri 10 Jul · 19:00 UTC",mp:[59,24,17],rec:[1,0],you:null,exp:null,note:"SoFi Stadium, Los Angeles. Spain have kept 5 clean sheets in 5 games — Spain strong favourites (-160)."},
  {h:"🇳🇴 Norway",a:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",grp:"QF",ko:"Sat 11 Jul · 21:00 UTC",mp:[24,26,50],rec:[1,1],you:null,exp:null,note:"Hard Rock Stadium, Miami. Haaland (5 goals) vs Kane (4 goals) — England slight favourites but wide open. Markets: England 50%, draw 26%, Norway 24%."},
  {h:"🇦🇷 Argentina",a:"🇨🇭 Switzerland",grp:"QF",ko:"Sun 12 Jul · 01:00 UTC",mp:[56,26,18],rec:[2,1],you:null,exp:null,note:"Kansas City Stadium. Argentina after their epic comeback vs Egypt; Switzerland on penalties vs Colombia. Argentina clear favourites (-145)."},
]},
];

module.exports = { UPDATED, YOU_NAME, YOU_RANK, YOU_TOTAL, MATCHDAYS };
