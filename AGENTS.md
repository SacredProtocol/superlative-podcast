<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Episode Management

## Where episode data lives

All episode data is in `src/config.ts` inside the `siteConfig.episodes` array. Episodes are ordered **newest first** — add new episodes at the top.

## Episode object schema

```ts
{
  title: "Episode 18",                        // "Episode N" — renders as small uppercase label
  episodeTitle: "The Comma Is Where...",      // Main display title — from Notion, guest name stripped
  guest: "Ashley Heron",                      // Guest full name
  guestTitle: "Founder",                      // Role/title
  guestCompany: "Comma8",                     // Company name
  xUrl: "https://x.com/...",                  // X broadcast or post link (optional)
  youtubeUrl: "https://youtube.com/live/...", // YouTube livestream link (optional)
}
```

## Notion Episodes database

- **Database URL:** `https://www.notion.so/3344613294668035aa4dd29efc7b4696`
- **View URL for bulk queries:** `https://www.notion.so/3344613294668035aa4dd29efc7b4696?v=33446132-9466-817e-934f-000c3651e323`
- Use `notion-query-database-view` on the view URL to get all episodes at once.
- Use `notion-fetch` on a single page URL for one-off lookups.
- **Always read the `<properties>` block** — it contains all structured fields directly. Do not parse page content.

## Notion → config field mapping

| Notion property        | config.ts field   | Notes                                              |
|------------------------|-------------------|----------------------------------------------------|
| `Episode`              | `title`           | Format as `"Episode N"`                            |
| `Podcast Episode Title`| `episodeTitle`    | Strip ` – Guest Name[, Company]` suffix from end   |
| `Guest`                | `guest`           |                                                    |
| `Firm or Company`      | `guestCompany`    | Drop trailing parentheticals like `" (SCV.VC)"`    |
| *(not in Notion)*      | `guestTitle`      | Attio `people.job_title` → Notion page → user      |
| *(YouTube API)*        | `youtubeUrl`      | Auto-fetched by guest name match; user can override|
| *(provided by user)*   | `xUrl`            | X broadcast URL supplied separately                |

## episodeTitle convention

Strip the guest name (and company if present) from the end of the Notion title. The separator is ` – ` (em dash with spaces).

- `"Coastal VCs Haven't Looked Here. That's the Entire Thesis. – Jay Yarlagadda, Atoms VC"` → `"Coastal VCs Haven't Looked Here. That's the Entire Thesis."`
- `"The Comma Is Where the Story Turns – Ashley Heron"` → `"The Comma Is Where the Story Turns"`

## YouTube auto-fetch

The channel uploads playlist is `UUo1EsiwgfAUlI3_hxudO3EA` (channel ID `UCo1EsiwgfAUlI3_hxudO3EA`, `@TheSuperlativePodcast`). The YouTube Data API v3 key is in `.env.local` as `YOUTUBE_API_KEY` (gitignored).

Match YouTube videos to Notion episodes by checking whether the guest's **first and last name tokens** both appear in the video's `snippet.title` (case-insensitive). Build the URL as `https://www.youtube.com/live/<videoId>`. If no match is found, ask the user — never guess.

## guestTitle lookup order

1. **Attio** `people` object — `search-records` by guest name, use `job_title` if present. Normalize `"President, CEO"` → `"President & CEO"`.
2. **Notion episode page** — fetch the individual page and check the prep notes for an explicit title.
3. **Ask the user.**

## Workflow for adding new episodes

1. Get episode numbers from the user (YouTube URLs optional — auto-fetched).
2. **Duplicate check:** read `src/config.ts` and skip any episode numbers already present.
3. Run `notion-query-database-view` on the view URL to fetch all episode properties.
4. For each episode without a user-supplied URL, hit the YouTube API and match by guest name.
5. For each episode, resolve `guestTitle` via Attio → Notion page → user.
6. Build the config entry using the field mapping above.
7. **Preview table:** print all entries (with sources for `guestTitle` and `youtubeUrl`) and confirm before writing.
8. Insert at the **top** of the `episodes` array in `src/config.ts`.
9. **Typecheck:** run `npx tsc --noEmit` to verify the config compiles.
10. Commit and push to main.
