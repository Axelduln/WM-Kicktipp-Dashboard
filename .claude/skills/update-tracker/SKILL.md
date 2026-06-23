---
name: update-tracker
description: Run the WC2026 tipp tracker's automatic update pipeline — check which games have actually finished (kickoff-time aware), fetch verified scores, refresh Opta probabilities/news/expert picks for upcoming games, rebuild the dashboard, regenerate the PDF, and commit/push.
---

# Update Tracker

Automates a full refresh cycle of the World Cup 2026 tipp tracker in this repo.

## Steps

1. **Run the status checker first, always.**
   ```
   node scripts/check_status.js
   ```
   This is the single source of truth for "has this game finished?" — it
   parses each game's `ko` (always UTC) and compares to the real current
   time with a 130-minute buffer. Never accept a "final score" from a web
   search unless the checker puts that game in `NEEDS_SCORE_VERIFICATION`.
   Games in `IN_PROGRESS` or `NOT_STARTED` must NOT be marked as played,
   even if a search result claims otherwise (search results about a
   future/in-progress tournament are frequently wrong or hallucinated —
   this caused a real bug previously, see git history).

2. **For every game in `NEEDS_SCORE_VERIFICATION`:**
   - WebSearch for the final score.
   - Cross-check the reported match date/kickoff against the stored `ko`
     field before trusting it (watch for ET/local-time vs UTC confusion).
   - Prefer corroboration from 2+ sources when feasible.
   - In `wc_data.js`, set `res:[H,A]`, remove `ko`/`mp`/`rec` (no longer
     needed once played), and write a short `note` summarizing the game.
   - Leave `you`/`exp`/`model` as-is unless you have the user's real tip.

3. **For every game in `NEEDS_REFRESH` (kicks off within 48h, not started):**
   - WebSearch for Opta supercomputer / data-model pre-match win/draw/loss
     probabilities → set `mp:[winPct,drawPct,lossPct]` for the home side.
   - WebSearch for relevant team news (injuries, lineup, form) and fold a
     one-line summary into `note`.
   - WebSearch for a real, current expert prediction for the game (no
     fixed source — search for it each run) and note it if useful; only
     set `exp:[H,A]` if you found an actual predicted scoreline.
   - Derive `rec:[H,A]` (suggested tip) from `mp` using the same Poisson
     fit `build_wc_dashboard.js` uses (`fitScore`), so the suggested tip
     stays consistent with the rest of the dashboard.

4. **Update `UPDATED` in `wc_data.js`** to the current real UTC time —
   but never set it later than the kickoff time of any game still classified
   `NOT_STARTED` or `IN_PROGRESS` by the checker.

5. **Rebuild:**
   ```
   node build_wc_dashboard.js
   ```

6. **Regenerate the PDF** with headless Chrome (binary path may vary by
   environment — locate it under `~/.cache/puppeteer/chrome/*/chrome-linux64/chrome`,
   or install it with `npx --yes puppeteer browsers install chrome` if missing):
   ```
   CHROME=$(ls ~/.cache/puppeteer/chrome/*/chrome-linux64/chrome 2>/dev/null | head -1)
   "$CHROME" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
     --print-to-pdf="wc2026_tipp_tracker.pdf" "file://$(pwd)/wc2026_tipp_tracker.html"
   ```

7. **Commit and push** `wc_data.js`, `wc2026_tipp_tracker.html`, and
   `wc2026_tipp_tracker.pdf` together (the repo's stop-hook requires no
   untracked files left behind).
