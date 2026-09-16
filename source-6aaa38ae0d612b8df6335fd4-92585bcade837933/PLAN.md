# V3 Volleyball League — Product Roadmap

The league site is built in numbered milestones. Milestone 1 is done; each
milestone below is a self-contained piece of work that can ship on its own.

All league facts (season dates, fees, venue, Venmo handle, Instagram) live in
`src/data/league.ts`. All fixture data lives in `src/data/`. Standings are
always derived from match results — never stored separately.

---

## Milestone 1 — Branded product surface ✅ Done

- Design system built from the season flyer: off-black grunge, blood red and
  brushed chrome, raked condensed display type, grain and scanline overlays,
  diagonal slash rules (`src/styles.css`).
- Custom league artwork generated and served through Netlify Image CDN
  (`public/img/`): hero court action shot, chrome shield emblem, slash texture,
  trophy still life.
- Global shell: sticky tab bar across all six league tabs, footer with venue
  and Instagram, skip link, 404 "Side Out" page.
- **Home** (`/`) — hero, "now playing" week board, flyer-style season vitals
  strip, live top-four table, season terms, highlights strip, registration band.
- **Teams** (`/teams`) — all eight teams with crests, live records, position
  badges, plus the free agent pool.
- **Team detail** (`/teams/$teamId`) — crest masthead, season stat line,
  full roster with jersey numbers and positions, week-by-week slate.
- Score store (`src/lib/score-store.ts`) and best-of-three scoresheet
  (`src/components/ScoreSheet.tsx`) built and ready to mount.
- Schedule engine: eight-team round robin over seven weeks plus a playoff
  bracket (`src/data/schedule.ts`), and standings math with set differential,
  point differential and streaks (`src/data/standings.ts`).

## Milestone 2 — Schedule tab

Route `/schedule`. Week selector for weeks 1–8, each week showing its four
matches across two courts. Commissioner mode toggle reveals the existing
`ScoreSheet` inline on each match; saving recalculates standings immediately.
Week 8 renders the playoff bracket from `playoffBracket`. All pieces exist —
this milestone is the page that mounts them.

## Milestone 3 — Standings tab

Route `/standings`. Full table from `buildStandings`: rank, record, sets,
points, differential, last-five form, streak. Playoff seed line after seed 4,
sort-column controls, and a tiebreaker explainer.

## Milestone 4 — Highlights tab

Route `/highlights`. Poster grid from `src/data/highlights.ts` with week and
team filters. A submit form accepts any YouTube, Instagram or TikTok share
link via `parseVideoUrl` in `src/lib/video.ts`; YouTube links get a real inline
player and poster frame.

## Milestone 5 — Waiver tab

Route `/waiver`. USAV-aligned liability release with typed signature, player
and emergency contact fields, minor/guardian branch, and inline validation.
Submissions post to Netlify Forms (`netlify-forms` skill, then run the skill's
enable script) so the commissioner gets every signed waiver without a database.

## Milestone 6 — Payment tab

Route `/pay`. Three tiers already modelled in `paymentOptions`: $150 roster
deposit, $475 team paid in full, $85 free agent. Each builds a Venmo deep link
(`venmo://paycharge?txn=pay&recipients=…&amount=…&note=…`) with a web fallback
and a copy-the-handle control for desktop. **Set the real handle in
`league.venmo.handle` before sharing this page.**

## Milestone 7 — Live results persistence

Replace the in-memory score store with Netlify Database (Postgres + Drizzle).
Schema: `teams`, `players`, `matches`, `match_sets`, `waivers`, `highlights`.
Server functions for reading the schedule and writing a result. The component
API (`useMatches` / `saveScore` / `clearScore`) stays identical, so only
`src/lib/score-store.ts` changes.

## Milestone 8 — Commissioner auth

Netlify Identity gating score entry, waiver review and the highlight queue.
Captain role can edit only their own team's roster. Replaces the open
commissioner toggle from milestone 2.

## Milestone 9 — Season rollover

Archive a finished season, seed the next one, and keep past champions and
records browsable.
