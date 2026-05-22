---
description: Add one or more new episodes to the Superlative Podcast website from Notion. Auto-fetches YouTube URLs and guest titles, then updates src/config.ts.
argument-hint: <episode_numbers> [youtube_url_ep1] [youtube_url_ep2] ...
allowed-tools: [Read, Edit, Bash, mcp__claude_ai_Notion__notion-query-database-view, mcp__claude_ai_Notion__notion-fetch, mcp__claude_ai_Attio__search-records]
---

# Add Episode(s) to the Website

The user wants to publish new podcast episode(s) to the website.

Arguments provided: $ARGUMENTS

## Step 1 — Parse arguments

Extract episode numbers and any YouTube/X URLs from $ARGUMENTS. Episode numbers are integers. URLs start with `http`.

YouTube URLs are **optional** — if not provided, Step 3 will auto-fetch them from the channel. If the user explicitly pastes a URL for an episode, prefer the provided one over the auto-fetched one.

## Step 2 — Fetch episode data from Notion

Query the Notion Episodes database view to get all episode properties at once:

- **View URL:** `https://www.notion.so/3344613294668035aa4dd29efc7b4696?v=33446132-9466-817e-934f-000c3651e323`
- Use `notion-query-database-view` on this URL.
- Find the rows matching the requested episode numbers by the `Episode` property.
- Read only the `<properties>` block — do not parse page content.

## Step 3 — Auto-fetch YouTube URLs

For any episode without a user-supplied YouTube URL, fetch the channel's recent uploads and match by guest name.

1. Load the API key from `.env.local` and list the uploads playlist (newest first):

   ```bash
   set -a && source .env.local && set +a
   curl -sS "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UUo1EsiwgfAUlI3_hxudO3EA&maxResults=25&key=${YOUTUBE_API_KEY}"
   ```

   - Channel: `@TheSuperlativePodcast` (channel ID `UCo1EsiwgfAUlI3_hxudO3EA`, uploads playlist `UUo1EsiwgfAUlI3_hxudO3EA`).
   - If `.env.local` is missing or the API call returns an error, ask the user for the YouTube URLs directly and skip the rest of this step.

2. **Match strategy:** for each Notion episode, scan returned videos and pick the one whose `snippet.title` contains both the **first token** and **last token** of the Notion `Guest` field (case-insensitive). This handles middle names and suffixes (e.g. Notion `"Susana Espinosa de los Reyes"` matches YouTube title containing `"Susana ... Reyes"` or `"Susana Espinosa"`).

3. Build the URL as `https://www.youtube.com/live/<videoId>` using `contentDetails.videoId`.

4. If no video matches a guest's name, ask the user to paste the URL for that episode. Do not invent or guess URLs.

## Step 4 — Look up guest titles

For each episode, populate `guestTitle` using this order of precedence:

1. **Attio** — call `search-records` on the `people` object with the guest's full name. Use the `job_title` attribute from the top result if present. Normalize `"President, CEO"` → `"President & CEO"`.
2. **Notion page content** — if Attio has no `job_title`, fetch the individual episode page with `notion-fetch` and look for an explicit title in the prep notes (e.g. *"He is a Partner at SCV"*).
3. **Ask the user** — if neither source has it.

## Step 5 — Build config entries

For each episode, construct the config object using this mapping:

| Notion property         | config field    | Rule                                                                 |
|-------------------------|-----------------|----------------------------------------------------------------------|
| `Episode`               | `title`         | Format as `"Episode N"`                                             |
| `Podcast Episode Title` | `episodeTitle`  | Strip the ` – Guest Name[, Company]` suffix (split on ` – `)        |
| `Guest`                 | `guest`         | Use as-is                                                           |
| `Firm or Company`       | `guestCompany`  | Use as-is — drop trailing parentheticals like `" (SCV.VC)"`         |
| *(from Step 4)*         | `guestTitle`    | Attio → Notion page → user                                          |
| *(Step 3 or arguments)* | `youtubeUrl`    | Auto-fetched from YouTube API, or user-supplied                     |
| *(from arguments)*      | `xUrl`          | X broadcast URL if provided (omit field if not)                     |

**episodeTitle stripping rule:** Split the Notion title on ` – ` and take only the first part.
- `"Coastal VCs Haven't Looked Here. – Jay Yarlagadda, Atoms VC"` → `"Coastal VCs Haven't Looked Here."`

## Step 6 — Update src/config.ts

- Read `src/config.ts`.
- Insert all new episode objects at the **top** of the `episodes` array (after the opening `[`), newest episode first.
- Do not modify any existing episodes.

## Step 7 — Commit and push

Stage only `src/config.ts`, commit with a message in the format:

```
feat: add Episode(s) N[, M] (Guest Name[, Guest Name])
```

Then push to `origin main`.

## Step 8 — Confirm

Report the episodes added, their titles, the YouTube URLs (and whether each was auto-fetched or user-supplied), and confirm the push succeeded.
