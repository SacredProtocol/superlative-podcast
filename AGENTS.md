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
| `Firm or Company`      | `guestCompany`    |                                                    |
| *(not in Notion)*      | `guestTitle`      | Ask the user or look up from the episode page      |
| *(provided by user)*   | `youtubeUrl`      | YouTube live URL supplied separately               |
| *(provided by user)*   | `xUrl`            | X broadcast URL supplied separately               |

## episodeTitle convention

Strip the guest name (and company if present) from the end of the Notion title. The separator is ` – ` (em dash with spaces).

- `"Coastal VCs Haven't Looked Here. That's the Entire Thesis. – Jay Yarlagadda, Atoms VC"` → `"Coastal VCs Haven't Looked Here. That's the Entire Thesis."`
- `"The Comma Is Where the Story Turns – Ashley Heron"` → `"The Comma Is Where the Story Turns"`

## Workflow for adding new episodes

1. Get episode numbers and YouTube/X URLs from the user.
2. Run `notion-query-database-view` on the view URL to fetch all episode properties.
3. Find the matching episodes by `Episode` number.
4. Build the config entry using the field mapping above.
5. Insert at the **top** of the `episodes` array in `src/config.ts`.
6. Commit and push to main.
