/* ============================================================
   Kicktipp scraper for the WC2026 dashboard.
   Pulls Madausinho's tips, the match results, and the standings
   from the PUBLIC tippuebersicht pages (no login required) and
   writes kicktipp_data.json, which build_wc_dashboard.js merges in.

   Run:  node fetch_kicktipp.mjs   (then: node build_wc_dashboard.js)
   ============================================================ */
import fs from 'node:fs';

const GROUP   = 'revel8-prediction';
const SEASON  = '4593678';
const TIPPER  = 'Madausinho';
const MATCHDAYS = [1, 2, 3, 4, 5, 6];   // group stage = spieltagIndex 1..6
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36';

// Kicktipp's German short codes -> the exact team names used in build_wc_dashboard.js
const TEAM = {
  MEX:'Mexico', SAFR:'South Africa', SKOR:'South Korea', CZE:'Czechia',
  KAN:'Canada', BIH:'Bosnia', USA:'USA', PAR:'Paraguay',
  QAT:'Qatar', CH:'Switzerland', BRA:'Brazil', MAR:'Morocco',
  HAI:'Haiti', SCO:'Scotland', AUS:'Australia', TUR:'Türkiye',
  DEU:'Germany', CUR:'Curaçao', NIE:'Netherlands', JPN:'Japan',
  CIV:'Ivory Coast', ECU:'Ecuador', SWE:'Sweden', TUN:'Tunisia',
  SPA:'Spain', CPV:'Cape Verde', BEL:'Belgium', EGY:'Egypt',
  SAR:'Saudi Arabia', URU:'Uruguay', IRN:'Iran', NZL:'New Zealand',
  FRA:'France', SEN:'Senegal', IRK:'Iraq', NOR:'Norway',
  ARG:'Argentina', ALG:'Algeria', AUT:'Austria', JOR:'Jordan',
  POR:'Portugal', COD:'DR Congo', ENG:'England', KRO:'Croatia',
  GHA:'Ghana', PAN:'Panama', UZB:'Uzbekistan', KOL:'Colombia',
};

const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const team  = (code) => TEAM[code] || (console.warn('  ! unknown team code:', code), code);
const ordinal = (n) => n + (['th','st','nd','rd'][(n % 100 - 20) % 10] || ['th','st','nd','rd'][n % 100] || 'th');

async function getPage(spieltagIndex) {
  const url = `https://www.kicktipp.de/${GROUP}/tippuebersicht?tippsaisonId=${SEASON}&spieltagIndex=${spieltagIndex}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for spieltag ${spieltagIndex}`);
  return res.text();
}

// "MEX SAFR 2 : 0"  ->  { home, away, res:[2,0] | null }
function parseHeaderCell(txt) {
  const tok = txt.split(' ');
  if (tok.length < 2) return null;
  const home = team(tok[0]), away = team(tok[1]);
  const m = txt.match(/(\d+)\s*:\s*(\d+)/);
  const res = m ? [Number(m[1]), Number(m[2])] : null;
  return { home, away, res };
}

// a tip cell's inner text "3:1" (with optional points <sub>) -> [3,1] | null
function parseTip(cellHtml) {
  const m = cellHtml.match(/>\s*(\d+)\s*:\s*(\d+)/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

function parseMatchday(html, spieltagIndex) {
  const head = html.slice(0, html.indexOf('teilnehmer teilnehmer'));
  const headerCells = head.match(/<th[^>]*ereignis\d[^>]*>[\s\S]*?<\/th>/g) || [];
  const matches = headerCells.map((c) => parseHeaderCell(strip(c)));

  // Locate the tipper's row and pull its per-event tip cells.
  const ti = html.indexOf('>' + TIPPER + '<');
  if (ti === -1) throw new Error(`tipper "${TIPPER}" not found on spieltag ${spieltagIndex}`);
  const rowStart = html.lastIndexOf('<tr', ti);
  const row = html.slice(rowStart, html.indexOf('</tr>', ti));
  const tipCells = row.match(/<td[^>]*ereignis(\d+)[^>]*>[\s\S]*?<\/td>/g) || [];
  const tips = {};
  for (const cell of tipCells) {
    const idx = Number(cell.match(/ereignis(\d+)/)[1]);
    tips[idx] = parseTip(cell);
  }

  const out = [];
  matches.forEach((mt, i) => {
    if (!mt) return;
    out.push({ spieltag: spieltagIndex, home: mt.home, away: mt.away, res: mt.res, tip: tips[i] ?? null });
  });
  return { matches: out, row, html };
}

// Standings for the tipper: rank, total (Gesamt), bonus, participant count.
function parseStandings(html) {
  const ti = html.indexOf('>' + TIPPER + '<');
  const rowStart = html.lastIndexOf('<tr', ti);
  const row = html.slice(rowStart, html.indexOf('</tr>', ti));
  const pos   = Number((row.match(/position right[^>]*><div>\s*(\d+)/) || [])[1]);
  const bonus = Number((row.match(/bonus right[^"]*">\s*(\d+)/) || [])[1]);
  const total = Number((row.match(/gesamtpunkte right[^"]*">\s*(\d+)/) || [])[1]);
  const participants = (html.match(/teilnehmer teilnehmer\d+/g) || []).length;
  return { pos, bonus, total, participants };
}

(async () => {
  console.log(`Fetching ${GROUP} (tipper: ${TIPPER}) …`);
  const allMatches = {};
  let standings = null;

  for (const md of MATCHDAYS) {
    const html = await getPage(md);
    const { matches } = parseMatchday(html, md);
    for (const m of matches) allMatches[`${m.home}|${m.away}`] = { res: m.res, tip: m.tip };
    if (md === MATCHDAYS[MATCHDAYS.length - 1]) standings = parseStandings(html);
    const tipped = matches.filter((m) => m.tip).length;
    console.log(`  spieltag ${md}: ${matches.length} matches, ${tipped} tips`);
  }

  const data = {
    fetchedAt: new Date().toISOString(),
    tipper: TIPPER,
    rank: ordinal(standings.pos) + ' of ' + standings.participants,
    total: standings.total,
    bonus: standings.bonus,
    matches: allMatches,
  };
  fs.writeFileSync(new URL('./kicktipp_data.json', import.meta.url), JSON.stringify(data, null, 2));
  console.log(`Wrote kicktipp_data.json — ${Object.keys(allMatches).length} matches; ` +
              `${TIPPER}: ${data.rank}, ${data.total} pts (${data.bonus} bonus).`);
})().catch((e) => { console.error('FETCH FAILED:', e.message); process.exit(1); });
