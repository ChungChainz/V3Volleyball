# V3 Volleyball League

League site for V3 Volleyball League's **Fall Reckoning** competitive co-ed
season — eight teams, eight Saturdays, USAV rules, 2-of-3 matches, played at
7638 W Post Rd, Las Vegas.

The design is taken directly from the season flyer: off-black grunge, blood
red and brushed chrome, heavy raked condensed type, film grain and diagonal
slash rules.

## What's live

| Page | Route | What it does |
|------|-------|--------------|
| Home | `/` | Hero, current-week board, season vitals, live top-four table, season terms, highlights strip, registration |
| Teams | `/teams` | All eight teams with crests, live records and the free agent pool |
| Team detail | `/teams/$teamId` | Roster with jersey numbers and positions, season stat line, week-by-week slate |

Remaining tabs — schedule with score entry, standings, highlights, waiver and
payment — are specified milestone by milestone in [PLAN.md](./PLAN.md).

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (SSR) |
| Frontend | React 19, TanStack Router v1 (file-based routes) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + a custom token layer in `src/styles.css` |
| Icons | lucide-react |
| Images | Netlify Image CDN (`/.netlify/images`) |
| Artwork | Generated with Gemini image models via Netlify AI Gateway |
| Language | TypeScript 5.9 (strict) |
| Hosting | Netlify |

## Run it locally

```bash
pnpm install
netlify dev --port 8889   # emulates Image CDN, functions and env vars
```

`pnpm dev` also works for plain Vite on port 3000, but image transforms and
other Netlify features only resolve under `netlify dev`.

## Editing league data

Everything a commissioner would change is data, not markup:

- `src/data/league.ts` — league name, season dates, fees, venue, Instagram and
  the **Venmo handle**. Replace `league.venmo.handle` with the real handle
  before sharing the payment page; every Venmo link is built from it.
- `src/data/teams.ts` — teams, crest colors, rosters, free agent pool.
- `src/data/schedule.ts` — round-robin pairings are generated; the `results`
  map holds entered scores. Sample results are in place for weeks 1–3 so
  standings and the scoresheet are demonstrable — replace them with real ones.
- `src/data/highlights.ts` — the highlight reel.
- `src/data/standings.ts` — standings are computed from results, never stored.

## Roadmap

See [PLAN.md](./PLAN.md). Next up: the schedule tab with commissioner score
entry, then standings, highlights, waiver and Venmo payment, then moving
results into Netlify Database so scores persist for everyone.
