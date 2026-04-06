export const siteConfig = {
  showName: "The Superlative Podcast",
  tagline: "One conversation. One guest. No ceiling.",
  host: "Edward Buchi",
  hostHandle: "@thespeakerlisan",

  // Links — update these before launch
  xProfileUrl: "https://x.com/thespeakerlisan",
  youtubeUrl: "", // Placeholder — add URL once YouTube channel is live
  calendlyUrl: "", // Insert Calendly booking link before handoff

  // Episode feed config — switch source without rebuilding
  episodeFeed: {
    // "x" | "youtube"
    source: "x" as "x" | "youtube",
    // X timeline embed handle (without @)
    xHandle: "thespeakerlisan",
    // YouTube playlist embed ID (for future use)
    youtubePlaylistId: "",
  },

  // Featured episodes — add new episodes at the top
  episodes: [
    {
      title: "Episode 3",
      url: "https://x.com/thespeakerlisan/status/2040173652868767985",
    },
    {
      title: "Episode 2",
      url: "https://x.com/thespeakerlisan/status/2039471823423975808",
    },
    {
      title: "Episode 1",
      url: "https://x.com/thespeakerlisan/status/2038694757166379327",
    },
  ],

  blurb:
    "The Superlative Podcast is a 15-minute live conversation hosted by Edward Buchi, co-founder of Sacred Protocol. Each episode features one guest from startups, media, sports, or finance\u2014a founder, investor, or operator with a real story and a point of view worth putting on record. No edits, no post-production. Streamed live to X, with YouTube publishing coming soon.",

  verticals: [
    { title: "Startups", description: "Founders and builders shipping products" },
    { title: "Media", description: "Executives and creators shaping culture" },
    { title: "Sports", description: "Athletes and operators behind the game" },
    { title: "Finance", description: "Investors and dealmakers moving capital" },
  ],
};
