<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Episode Management

**Canonical source for all episode operations.** Cursor skill: `.cursor/skills/add-episode/SKILL.md`. Preview script: `node scripts/preview-episode.mjs`.

## Where episode data lives

All episode data is in `src/config.ts` inside the `siteConfig.episodes` array. Episodes are ordered **newest first** — add new episodes at the top.

## Episode object schema

```ts
{
  title: "Episode 18",                        // "Episode N" — renders as small uppercase label
  episodeTitle: "The Comma Is Where...",      // Main display title — from Notion, guest name stripped
  guest: "Ashley Heron",                      // Guest full name
  guestTitle: "Founder",                      // Role/title
  guestCompany: "Comma8",                     // Company name — can be ""
  guestWebsite?: "https://commaeight.com",    // Company website — renders company name as a link (optional)
  youtubeUrl?: "https://youtube.com/live/...", // YouTube video or livestream link
}
```

### UI behavior

- Add new episodes at the **top** of `siteConfig.episodes`
- Display episode numbers are derived from array index — keep array newest-first; do not encode numbers elsewhere
- The site is **YouTube-only** for episode video — every episode should have a `youtubeUrl` (see X links section)
- Play button and the single "Watch on YouTube" pill both use `ep.youtubeUrl`
- `guestWebsite`, when set, renders `guestCompany` as a hover-highlighted link via the `CompanyName` component in `page.tsx`
- Episode rows are `<div>` elements with separate link pills — do not wrap the whole row in `<a>`
- React list `key` is `ep.title`, not URL fields

---

## Notion Episodes database

- **Database URL:** `https://www.notion.so/3344613294668035aa4dd29efc7b4696`
- **View URL for bulk queries:** `https://www.notion.so/3344613294668035aa4dd29efc7b4696?v=33446132-9466-817e-934f-000c3651e323`
- **Podcast Artifacts DB** (X broadcast links in content): `33346132946680cd836ec3d130e1e5cf`

Use `notion-query-database-view` on the view URL to get all episodes at once. Use `notion-fetch` on a single page URL for prep notes. **Always read the `<properties>` block** for structured fields — do not parse page content for metadata.

### Notion status values

| Status | Meaning |
|---|---|
| `Podcast Recorded` | Done — safe to publish on site |
| `Podcast Episode Booked` | Scheduled — may publish after recording |
| `Pre-Interview Done` | Onboarding complete, not yet recorded |

After publishing to the site, update status to `Podcast Recorded` (see post-publish checklist).

---

## Notion → config field mapping

| Notion property         | config.ts field | Notes                                              |
|-------------------------|-----------------|----------------------------------------------------|
| `Episode`               | `title`         | Format as `"Episode N"`                            |
| `Podcast Episode Title` | `episodeTitle`  | Strip ` – Guest Name[, Company]` suffix from end   |
| `Guest`                 | `guest`         |                                                    |
| `Firm or Company`       | `guestCompany`  | Drop trailing parentheticals like `" (SCV.VC)"`    |
| *(not in Notion)*       | `guestTitle`    | See guestTitle lookup below                        |
| *(YouTube API)*         | `youtubeUrl`    | Auto-fetched by guest name match; user can override|
| *(Attio / signatures)*  | `guestWebsite`  | Company website — see website sourcing below       |

### episodeTitle convention

Strip the guest name (and company if present) from the end of the Notion title. Separator: ` – ` (em dash with spaces).

- `"Coastal VCs Haven't Looked Here. That's the Entire Thesis. – Jay Yarlagadda, Atoms VC"` → `"Coastal VCs Haven't Looked Here. That's the Entire Thesis."`
- `"The Comma Is Where the Story Turns – Ashley Heron"` → `"The Comma Is Where the Story Turns"`

---

## YouTube auto-fetch

Channel: `@TheSuperlativePodcast` (ID `UCo1EsiwgfAUlI3_hxudO3EA`, uploads playlist `UUo1EsiwgfAUlI3_hxudO3EA`). API key: `.env.local` → `YOUTUBE_API_KEY`.

```bash
set -a && source .env.local && set +a
curl -sS "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UUo1EsiwgfAUlI3_hxudO3EA&maxResults=25&key=${YOUTUBE_API_KEY}"
```

Match by checking whether the guest's **first and last name tokens** both appear in `snippet.title` (case-insensitive). Build URL as `https://www.youtube.com/live/<videoId>`. If no match, ask the user — never guess.

Or run `node scripts/preview-episode.mjs --auto` to list unlinked uploads and suggested next episode number.

### Full-channel scan (older / mistitled uploads)

`maxResults=25` only covers recent uploads. To find an older or oddly-titled video (early episodes are titled `TSP EPn: Guest …`, not by episode headline), paginate the uploads playlist with `pageToken` until `nextPageToken` is absent. Parse JSON with Python `json.loads(…, strict=False)` — some titles contain raw newlines that break strict parsing and can silently drop an entire page (which once made three on-channel episodes look X-only).

---

## guestTitle lookup

### Cursor (Attio MCP not available)

1. **Notion episode page** — `notion-fetch` prep notes (e.g. LinkedIn summary line, role in guest profile block)
2. **Ask the user**

### Claude Code (Attio MCP available)

1. **Attio** `people` — `search-records` by guest name, use `job_title`. Check `description` if `job_title` is empty. Fire parallel searches for batch adds.
2. **Notion episode page** — prep notes fallback
3. **Ask the user**

Normalize `"President, CEO"` → `"President & CEO"`.

---

## Guest company website (`guestWebsite`)

Renders the episode's `guestCompany` as a link. Source in this order, stop at the first **live** URL:

1. **Attio, via the guest** — `search-records` on `people` by guest name, then follow that person's `company` reference and read its `domains`. **Always go person → company, never company-name search.** A name search returns whichever duplicate ranks first; the person's link is the one that reflects reality.
2. **Email signatures** — when a domain is missing, dead, or looks wrong, read the guest's own emails: `search-emails-by-metadata` (participant = guest email, or `domain =` their domain) → `get-email-content` on a message they *sent*. Signatures carry the live homepage or LinkedIn.
3. **Notion** — episode page prep notes, or the `Email` property's domain as a hint.
4. **Ask the user.**

For batch work, fan out the `people` searches in parallel, collect the company `record_id`s, then read them in bulk with `get-records-by-ids` (batches of 6–8) rather than one call per guest.

Gotchas:

- **The guest's own email domain is the tiebreaker.** Every duplicate resolved so far was settled by it: `tochi@paj.cash` beat the `pajcash.com` record, `mark@preferrd.io` beat the `preferred.com` one. When enrichment and the guest's address disagree, the address wins.
- **Mis-enriched / duplicate Attio records.** Clearbit-style enrichment sometimes attaches the wrong company (a generic `.com`, wrong location/category). Duplicates also mean a `domains` write can **409-conflict** (the correct domain already lives on another record) — report it, do not force-merge.
- **Duplicate *person* records are just as common as duplicate companies.** A guest often has two: one auto-created from email, one hand-made with the good notes — each pointing at a different company. Reconcile both before concluding anything.
- **Enrichment collisions:** a record can hold the *right* domain under the *wrong* name and description (a record holding `loon.finance` was named "PayTrie", carrying PayTrie's logo, description and Twitter). Trust `domains`; treat every other enriched field as suspect.
- **The podcast company is often not the guest's primary Attio company.** Sunny Ray links to SunnyRay.com but appeared as Unocoin; Kevin Zhang links to Paytrie but appeared as Loon; Charles Cormier links to GTM Ventures but appeared as RaaSRocket. This is not an error to fix — just don't assume `person.company` is the episode's company.
- Some guests have **no live site** and run everything off **LinkedIn** — use the LinkedIn company URL (e.g. `https://www.linkedin.com/company/<slug>/`) as `guestWebsite`.
- Normalize to a clean `https://` URL. Omit `guestWebsite` entirely if none exists — never `""`.

### Syncing `guestWebsite` back to Attio

**`src/config.ts` is the source of truth for company websites** — it holds hand-verified, user-confirmed URLs. Attio should be made to match it, not the other way round.

To sync: for each episode with a `guestWebsite`, resolve guest → person → company (above) and compare `domains` to the config URL's host. Then, by case:

| Situation | Action |
|---|---|
| Domains agree | Nothing to do |
| Guest linked to a mis-enriched duplicate | Re-link the person to the record holding the correct domain, and leave a note on the wrong record flagging it for deletion |
| Correct domain exists but the record is unnamed / misnamed | Set `name`; note which enriched fields are still stale |
| Domain absent from the workspace entirely | `create-record` on `companies` with the domain, then link the guest |
| Config uses a LinkedIn URL (no live site) | Leave Attio alone — its registered domain is not wrong |

Rules for these writes:

- **Never delete or merge records.** Merging is destructive and Attio has no undo — write a note flagging the duplicate and leave the deletion to a human.
- **Before superseding a record, copy its `description` onto the keeper.** The mis-enriched record is often the one carrying all the hand-written CRM context.
- **Don't sever a correct link to create another.** `person.company` is single-value; if a guest already points at a legitimate company, link a *different* (duplicate or unlinked) person record rather than overwriting.
- Notes should name the wrong domain, the right domain, the evidence for it, the surviving record ID, and what was already done.

## X links (deprecated)

The site is **YouTube-only**. X/Twitter removes broadcast videos after ~3 months, so per-episode `xUrl` links rot — the `xUrl` field and the "Watch on X" pill have been removed. Do **not** add `xUrl` to episodes; find the YouTube upload instead (early episodes exist on YouTube under `TSP EPn: Guest …` titles). The show-level X profile/follow links (`siteConfig.xProfileUrl`) are unaffected.

---

## Auto-detect latest episode

When the user says "new podcast on YouTube" (or similar) without an episode number:

```
1. maxConfig = highest "Episode N" in src/config.ts
2. Run node scripts/preview-episode.mjs --auto
3. Query Notion Episodes view
4. candidates = Notion rows where Episode > maxConfig AND YouTube guest-name match exists
5. |candidates| == 1 → proceed with that episode
   |candidates| > 1 → ask user to pick
   |candidates| == 0 → ask user for episode number
```

---

## Workflow for adding new episodes

1. **Detect episode numbers** — from user args, or auto-detect (above).
2. **Duplicate check** — read `src/config.ts`; skip or ask if `"Episode N"` already exists.
3. **Preview** — run `node scripts/preview-episode.mjs <N>`; query Notion; fetch YouTube URLs.
4. **guestTitle** — resolve per lookup order above.
5. **Preview table** — print all entries with sources; confirm before writing:

   | # | Guest | Episode Title | Guest Title (src) | Company | YouTube URL (src) |

   Sources: `(notion)`, `(attio)`, `(api)`, `(user)`.

6. **Write** — insert at the **top** of `siteConfig.episodes` in `src/config.ts`.
7. **Typecheck** — `npx tsc --noEmit`.
8. **Commit and push** — only when the user explicitly asks. Message: `feat: add Episode(s) N (Guest Name)`.
9. **Post-publish checklist** (below).

---

## Post-publish checklist

After config is written (and pushed if requested):

- [ ] Notion episode `Select` status → `Podcast Recorded`
- [ ] `guestWebsite` set (Attio / email signature) wherever a live URL exists
- [ ] Attio reflects that `guestWebsite` — guest's linked company carries the same domain (see sync table above)
- [ ] Verify episode appears at top of live site episode list

---

## Special cases

### Guest is bigger than their company

Use `guestTitle` as a descriptor; leave `guestCompany` as `""`.

```ts
// DaVinci Jeremie — personal brand > any company
{ guest: "DaVinci Jeremie", guestTitle: "Bitcoin Pioneer & Crypto Educator", guestCompany: "" }
```

### Guest with multiple roles

```ts
guestTitle: "Co-Founder, RaaSRocket & President",
guestCompany: "Unocoin",
```

### Link added later

Add the missing `youtubeUrl` or `guestWebsite` field to the existing entry — no other changes needed.

### guestTitle without guestCompany

`guestTitle` alone renders the subtitle line; `guestCompany` is optional.
