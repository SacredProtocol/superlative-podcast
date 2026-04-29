export const siteConfig = {
  showName: "The Superlative Podcast",
  tagline: "One conversation. One guest. No ceiling.",
  host: "Edward Buchi",
  hostHandle: "@thespeakerlisan",

  // Links — update these before launch
  xProfileUrl: "https://x.com/thespeakerlisan",
  youtubeUrl: "https://www.youtube.com/@TheSuperlativePodcast",
  calendlyUrl: "https://cal.com/smsp-schedhuler/pdon30", // Guest booking link

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
      title: "Episode 11",
      guest: "Justin Reynolds",
      guestTitle: "Founder & Venture Builder",
      guestCompany: "Tashinga Partnership",
      url: "https://x.com/i/broadcasts/1AKEmOVqgvnKL",
    },
    {
      title: "Episode 10",
      guest: "Peter Micca",
      guestTitle: "Managing Partner",
      guestCompany: "Caduceus Capital Partners",
      url: "https://youtu.be/VYSBwQBJfXM?si=pjbGntcYwtkam1pL",
    },
    {
      title: "Episode 9",
      guest: "Mark Francis",
      guestTitle: "Founder",
      guestCompany: "Preferred",
      url: "https://x.com/i/broadcasts/1yKAPMvzBjaxb",
    },
    {
      title: "Episode 8",
      guest: "Matt Ober",
      guestTitle: "Managing Partner",
      guestCompany: "Social Leverage",
      url: "https://x.com/i/broadcasts/1nJOLEdOQEkxR",
    },
    {
      title: "Episode 7",
      guest: "DaVinci Jeremie",
      guestTitle: "Bitcoin Pioneer & Crypto Educator",
      guestCompany: "",
      url: "https://x.com/i/broadcasts/1PKqrEZDVgQGb",
    },
    {
      title: "Episode 6",
      guest: "Tochi Chukwuemeka",
      guestTitle: "Co-Founder",
      guestCompany: "PajCash",
      url: "https://x.com/thespeakerlisan/status/2045494019497836568",
    },
    {
      title: "Episode 5",
      guest: "Kevin Zhang",
      guestTitle: "Co-Founder",
      guestCompany: "Loon",
      url: "https://x.com/thespeakerlisan/status/2045140831976542240",
    },
    {
      title: "Episode 4",
      guest: "Sunny Ray",
      guestTitle: "Co-Founder, RaaSRocket & President",
      guestCompany: "Unocoin",
      url: "https://x.com/thespeakerlisan/status/2044877463785013252",
    },
    {
      title: "Episode 3",
      guest: "Varun Turlapati",
      guestTitle: "Managing Director",
      guestCompany: "Chaanakya Capital",
      url: "https://x.com/thespeakerlisan/status/2040173652868767985",
    },
    {
      title: "Episode 2",
      guest: "Yangchen Sharma",
      guestTitle: "General Partner",
      guestCompany: "Roundtable Ventures",
      url: "https://x.com/thespeakerlisan/status/2039471823423975808",
    },
    {
      title: "Episode 1",
      guest: "Charles Cormier",
      guestTitle: "CEO",
      guestCompany: "RaaSRocket",
      url: "https://x.com/thespeakerlisan/status/2038694757166379327",
    },
  ],

  blurb:
    "The Superlative Podcast is a 20-30 minute live conversation hosted by Edward Buchi, co-founder of Sacred Protocol. Each episode features one guest from startups, media, sports, or finance\u2014a founder, investor, or operator with a real story and a point of view worth putting on record. No edits, no post-production. Streamed live to X and YouTube.",

  verticals: [
    { title: "Startups", description: "Founders and builders shipping products" },
    { title: "Media", description: "Executives and creators shaping culture" },
    { title: "Sports", description: "Athletes and operators behind the game" },
    { title: "Finance", description: "Investors and dealmakers moving capital" },
  ],
};
