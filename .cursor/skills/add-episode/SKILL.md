---
name: add-episode
description: >-
  Add new Superlative Podcast episodes to the website from Notion and YouTube.
  Auto-detects the latest unpublished episode, fetches YouTube URLs and guest
  titles, updates src/config.ts, and runs post-publish checks. Use when the user
  mentions a new podcast, new episode, YouTube upload, updating the episode list,
  or publishing to the site.
---

# Add Episode to Website

Canonical reference: [AGENTS.md](../../AGENTS.md). Follow it exactly.

## Quick start

1. Run `node scripts/preview-episode.mjs --auto` (or with explicit episode numbers).
2. Resolve Notion metadata via `notion-query-database-view` on the Episodes view URL.
3. Resolve `guestTitle` (Notion prep notes first in Cursor; Attio if MCP available).
4. Print preview table → confirm with user → write `src/config.ts`.
5. Run `npx tsc --noEmit`.
6. Commit and push **only when the user explicitly asks**.
7. Run the post-publish checklist from AGENTS.md.

## Episode detection

If the user gives no episode number:

```
candidates = Notion episodes where Episode > max(config) AND YouTube guest-name match exists
|candidates| == 1  → proceed
|candidates| > 1  → ask user to pick
|candidates| == 0  → ask user
```

`node scripts/preview-episode.mjs --auto` surfaces YouTube uploads not yet in config.

## Duplicate check

Before writing, scan `siteConfig.episodes` for matching `"Episode N"` titles. Skip or ask if already present.

## Notion

- **View URL:** `https://www.notion.so/3344613294668035aa4dd29efc7b4696?v=33446132-9466-817e-934f-000c3651e323`
- Use `notion-query-database-view` for bulk properties.
- Use `notion-fetch` on the episode page URL for prep notes (`guestTitle`).

## YouTube auto-fetch

```bash
set -a && source .env.local && set +a
curl -sS "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UUo1EsiwgfAUlI3_hxudO3EA&maxResults=25&key=${YOUTUBE_API_KEY}"
```

Match: guest **first and last name tokens** in `snippet.title` (case-insensitive). URL: `https://www.youtube.com/live/<videoId>`. Never guess.

## guestTitle lookup

| Environment | Order |
|---|---|
| **Cursor** | Notion prep notes → ask user |
| **Claude Code** (Attio MCP) | Attio `people.job_title` → Notion prep notes → ask user |

Normalize `"President, CEO"` → `"President & CEO"`.

## Preview table (required before write)

| # | Guest | Episode Title | Guest Title (src) | Company | YouTube URL (src) |

Sources: `(notion)`, `(attio)`, `(api)`, `(user)`.

## Config write

Insert at the **top** of `siteConfig.episodes`. Omit `xUrl`/`youtubeUrl` entirely if unavailable — never `""`.

## Commit message

```
feat: add Episode(s) N[, M] (Guest Name[, Guest Name])
```

## Post-publish checklist

After config is written (and pushed if requested):

- [ ] Notion episode status → `Podcast Recorded`
- [ ] Add `xUrl` to config if X broadcast link becomes available
- [ ] Verify episode appears at top of live site episode list
