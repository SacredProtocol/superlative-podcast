---
description: Add one or more new episodes to the Superlative Podcast website from Notion. Fetches episode data automatically and updates src/config.ts.
argument-hint: <episode_numbers> [youtube_url_ep1] [youtube_url_ep2] ...
allowed-tools: [Read, Edit, Bash, mcp__claude_ai_Notion__notion-query-database-view, mcp__claude_ai_Notion__notion-fetch]
---

# Add Episode(s) to the Website

The user wants to publish new podcast episode(s) to the website.

Arguments provided: $ARGUMENTS

## Step 1 — Parse arguments

Extract episode numbers and any YouTube/X URLs from $ARGUMENTS. Episode numbers are integers. URLs start with `http`.

If the user provided YouTube URLs alongside episode numbers, pair them up in order. If URLs are missing, ask the user for them before continuing — YouTube URLs are the primary watch link.

## Step 2 — Fetch episode data from Notion

Query the Notion Episodes database view to get all episode properties at once:

- **View URL:** `https://www.notion.so/3344613294668035aa4dd29efc7b4696?v=33446132-9466-817e-934f-000c3651e323`
- Use `notion-query-database-view` on this URL.
- Find the rows matching the requested episode numbers by the `Episode` property.
- Read only the `<properties>` block — do not parse page content.

## Step 3 — Build config entries

For each episode, construct the config object using this mapping:

| Notion property         | config field    | Rule                                                                 |
|-------------------------|-----------------|----------------------------------------------------------------------|
| `Episode`               | `title`         | Format as `"Episode N"`                                             |
| `Podcast Episode Title` | `episodeTitle`  | Strip the ` – Guest Name[, Company]` suffix (split on ` – `)        |
| `Guest`                 | `guest`         | Use as-is                                                           |
| `Firm or Company`       | `guestCompany`  | Use as-is                                                           |
| *(ask user if unknown)* | `guestTitle`    | Role/title — check the episode's Notion page if not obvious         |
| *(from arguments)*      | `youtubeUrl`    | YouTube live URL provided by user                                    |
| *(from arguments)*      | `xUrl`          | X broadcast URL if provided (omit field if not)                     |

**episodeTitle stripping rule:** Split the Notion title on ` – ` and take only the first part.
- `"Coastal VCs Haven't Looked Here. – Jay Yarlagadda, Atoms VC"` → `"Coastal VCs Haven't Looked Here."`

If `guestTitle` is not available from Notion properties, fetch the individual episode page and read the callout block, or ask the user.

## Step 4 — Update src/config.ts

- Read `src/config.ts`.
- Insert all new episode objects at the **top** of the `episodes` array (after the opening `[`), newest episode first.
- Do not modify any existing episodes.

## Step 5 — Commit and push

Stage only `src/config.ts`, commit with a message in the format:

```
feat: add Episode(s) N[, M] (Guest Name[, Guest Name])
```

Then push to `origin main`.

## Step 6 — Confirm

Report the episodes added, their titles, and confirm the push succeeded.
