/* ============================================================
   check_status.js — kickoff-time-aware status checker for wc_data.js
   Run: node scripts/check_status.js
   Classifies every game with no res yet as:
     NOT_STARTED              kickoff is still in the future
     IN_PROGRESS               kickoff has passed but match likely still on
                                (within KICKOFF_TO_FT_BUFFER_MIN of kickoff)
     NEEDS_SCORE_VERIFICATION  kickoff + buffer has passed, no res recorded —
                                safe to go look up the final score now
     NO_KICKOFF_INFO           no `ko` field yet (too far out to be scheduled)
   Also flags any NOT_STARTED game within REFRESH_WINDOW_HOURS as needing
   fresh Opta probabilities / news / expert pick before kickoff.

   All `ko` strings are "Day DD Mon · HH:MM UTC" — always UTC (see wc_data.js
   header). Never trust a "final score" claim from a web search without
   first confirming this script would call that game NEEDS_SCORE_VERIFICATION
   or later — that's the whole point of this checker.
   ============================================================ */
const { MATCHDAYS } = require('../wc_data.js');

const YEAR = 2026;
const MONTHS = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
const KICKOFF_TO_FT_BUFFER_MIN = 130; // 90 min + HT + stoppage buffer
const REFRESH_WINDOW_HOURS = 48;

function parseKO(ko){
  // "Tue 23 Jun · 17:00 UTC"
  const m = ko.match(/(\d{1,2})\s+([A-Za-z]{3})\s*·\s*(\d{2}):(\d{2})\s*UTC/);
  if(!m) return null;
  const [, dd, mon, hh, mm] = m;
  const month = MONTHS[mon];
  if(month === undefined) return null;
  return new Date(Date.UTC(YEAR, month, Number(dd), Number(hh), Number(mm)));
}

function classify(g, now){
  if(g.res) return null; // already has a result, nothing to check
  if(!g.ko) return 'NO_KICKOFF_INFO';
  const kt = parseKO(g.ko);
  if(!kt) return 'NO_KICKOFF_INFO';
  const msSinceKickoff = now - kt;
  if(msSinceKickoff < 0) return 'NOT_STARTED';
  if(msSinceKickoff < KICKOFF_TO_FT_BUFFER_MIN * 60 * 1000) return 'IN_PROGRESS';
  return 'NEEDS_SCORE_VERIFICATION';
}

function run(now = new Date()){
  const buckets = { NEEDS_SCORE_VERIFICATION: [], IN_PROGRESS: [], NOT_STARTED: [], NO_KICKOFF_INFO: [], NEEDS_REFRESH: [] };
  for(const md of MATCHDAYS){
    for(const g of md.games){
      const status = classify(g, now);
      if(!status) continue;
      const entry = { md: md.md, h: g.h, a: g.a, grp: g.grp, ko: g.ko || null };
      buckets[status].push(entry);
      if(status === 'NOT_STARTED'){
        const kt = parseKO(g.ko);
        if(kt && (kt - now) <= REFRESH_WINDOW_HOURS*60*60*1000){
          buckets.NEEDS_REFRESH.push(entry);
        }
      }
    }
  }
  return buckets;
}

function printReport(buckets, now){
  console.log('=== WC2026 status check — now: '+now.toISOString()+' ===\n');
  const label = {
    NEEDS_SCORE_VERIFICATION: '🔴 NEEDS SCORE VERIFICATION (kickoff + buffer elapsed, no result recorded)',
    IN_PROGRESS: '🟡 LIKELY IN PROGRESS (kickoff passed, within match-duration buffer — do not record a final score yet)',
    NOT_STARTED: '⚪ NOT STARTED YET',
    NEEDS_REFRESH: '🔁 KICKS OFF WITHIN '+REFRESH_WINDOW_HOURS+'h — refresh Opta/news/expert pick',
    NO_KICKOFF_INFO: '❓ NO KICKOFF INFO (not yet scheduled)',
  };
  for(const key of ['NEEDS_SCORE_VERIFICATION','IN_PROGRESS','NEEDS_REFRESH','NOT_STARTED','NO_KICKOFF_INFO']){
    const list = buckets[key];
    console.log(label[key]+' — '+list.length);
    for(const e of list) console.log('   MD'+e.md+' · Grp '+e.grp+' · '+e.h+' v '+e.a+(e.ko?' · '+e.ko:''));
    console.log('');
  }
}

if(require.main === module){
  const now = new Date();
  const buckets = run(now);
  printReport(buckets, now);
}

module.exports = { run, parseKO, classify, KICKOFF_TO_FT_BUFFER_MIN, REFRESH_WINDOW_HOURS };
