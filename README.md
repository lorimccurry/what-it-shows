# what-it-shows — MEGA S01E03

Ticket `#4471` on the support desk merged 412 reports and was marked "known": one bug, the
date parser reads month-first. It isn't one bug. It's three.

## What's in this repo

- `src/` — the support desk's kb export (`support-kb` in the download), unpacked into a
  SvelteKit + mdsvex site so its pages render for real, plus one addition:
  `src/lib/kb/causes.ts` gained a `realCauseOf` / `groupByRealCause` pair (additive, the
  original `causeOf` / `groupByCause` used by the existing `#4471` page are untouched), and
  `src/lib/kb/SplitTable.svelte` + `src/routes/kb/incidents/4471-split/+page.svx` are new.
- `rendered/` — a static build of the whole kb (`npm run build`), so the new page can be
  read exactly as the desk would see it without running the project. Open
  `rendered/kb/incidents/4471-split.html`.
- The three GitHub issues on this repo, one per real problem, each with its report count.

## The split

| cause | reports | what it is |
|---|---:|---|
| `parser` | 374 | the shared date parser reads every date month-first |
| `hint` | 33 | `booking-v3`'s on-screen hint says `MM/DD/YYYY` to day-first tenants |
| `timezone` | 5 | the invite day is computed in the wrong timezone for some recipients |

Full writeup, evidence, and the live table: `src/routes/kb/incidents/4471-split/+page.svx`
(source) or `rendered/kb/incidents/4471-split.html` (rendered).

## Run it yourself

```sh
npm install
npm run dev     # or: npm run build && npm run preview
```
