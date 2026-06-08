---
description: Add one or more new episodes to the Superlative Podcast website from Notion. Auto-fetches YouTube URLs and guest titles, then updates src/config.ts.
argument-hint: <episode_numbers> [youtube_url_ep1] [youtube_url_ep2] ... | --auto
allowed-tools: [Read, Edit, Bash, mcp__claude_ai_Notion__notion-query-database-view, mcp__claude_ai_Notion__notion-fetch, mcp__claude_ai_Attio__search-records]
---

# Add Episode(s) to the Website

**Canonical reference: `AGENTS.md`** — follow it for all field mapping, auto-detect, and special cases.

Arguments provided: $ARGUMENTS

## Step 0 — Preview script

```bash
node scripts/preview-episode.mjs --auto
# or: node scripts/preview-episode.mjs 30 --guest "Guest Name"
```

## Step 1 — Parse arguments

Extract episode numbers and any YouTube/X URLs. Episode numbers are integers; URLs start with `http`.

If no episode numbers: run auto-detect per AGENTS.md (`|candidates| == 1` → proceed).

YouTube URLs are optional — Step 3 auto-fetches from the channel. User-supplied URLs take precedence.

## Step 1.5 — Duplicate check

Read `src/config.ts` for existing `"Episode N"` titles. Stop if all requested episodes exist; ask if partial overlap.

## Step 2 — Fetch episode data from Notion

- **View URL:** `https://www.notion.so/3344613294668035aa4dd29efc7b4696?v=33446132-9466-817e-934f-000c3651e323`
- Use `notion-query-database-view`; read `<properties>` only for bulk fields.

## Step 3 — Auto-fetch YouTube URLs

```bash
set -a && source .env.local && set +a
curl -sS "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UUo1EsiwgfAUlI3_hxudO3EA&maxResults=25&key=${YOUTUBE_API_KEY}"
```

Match first + last guest name tokens in `snippet.title`. URL: `https://www.youtube.com/live/<videoId>`. Ask user if no match.

## Step 4 — Look up guest titles

1. **Attio** — `search-records` on `people` (parallel for batch adds)
2. **Notion page** — prep notes via `notion-fetch`
3. **Ask the user**

## Step 5 — Build config entries

See field mapping table in AGENTS.md.

## Step 6 — Preview and confirm

Print preview table with sources. Confirm before writing.

## Step 7 — Update src/config.ts

Insert at top of `episodes` array. Do not modify existing entries.

## Step 7.5 — Typecheck

`npx tsc --noEmit`

## Step 8 — Commit and push

**Only when the user explicitly asks.** Message format:

```
feat: add Episode(s) N[, M] (Guest Name[, Guest Name])
```

## Step 9 — Post-publish checklist

Per AGENTS.md: update Notion status, add `xUrl` when available, verify live site.

## Step 10 — Confirm

Report episodes added, URLs (api vs user), and push status if applicable.
