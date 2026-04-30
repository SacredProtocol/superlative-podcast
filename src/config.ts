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
  // xUrl: X broadcast or post link | youtubeUrl: YouTube video or livestream link
  episodes: [
    {
      title: "Episode 11",
      guest: "Justin Reynolds",
      guestTitle: "Founder & Venture Builder",
      guestCompany: "Tashinga Partnership",
      xUrl: "https://x.com/i/broadcasts/1AKEmOVqgvnKL",
      youtubeUrl: "https://www.youtube.com/watch?v=KrfY5Kjbd44",
    },
    {
      title: "Episode 10",
      guest: "Peter Micca",
      guestTitle: "Managing Partner",
      guestCompany: "Caduceus Capital Partners",
      youtubeUrl: "https://youtu.be/VYSBwQBJfXM?si=pjbGntcYwtkam1pL",
    },
    {
      title: "Episode 9",
      guest: "Mark Francis",
      guestTitle: "Founder",
      guestCompany: "Preferred",
      xUrl: "https://x.com/i/broadcasts/1PKqrEZDVgQGb",
      youtubeUrl: "https://www.youtube.com/watch?v=UpphOFgNhh4",
    },
    {
      title: "Episode 8",
      guest: "Matt Ober",
      guestTitle: "Managing Partner",
      guestCompany: "Social Leverage",
      xUrl: "https://x.com/i/broadcasts/1nJOLEdOQEkxR",
    },
    {
      title: "Episode 7",
      guest: "DaVinci Jeremie",
      guestTitle: "Bitcoin Pioneer & Crypto Educator",
      guestCompany: "",
      xUrl: "https://x.com/i/broadcasts/1yKAPMvzBjaxb",
    },
    {
      title: "Episode 6",
      guest: "Tochi Chukwuemeka",
      guestTitle: "Co-Founder",
      guestCompany: "PajCash",
      xUrl: "https://x.com/thespeakerlisan/status/2045494019497836568",
    },
    {
      title: "Episode 5",
      guest: "Kevin Zhang",
      guestTitle: "Co-Founder",
      guestCompany: "Loon",
      xUrl: "https://x.com/thespeakerlisan/status/2045140831976542240",
      youtubeUrl: "https://www.youtube.com/watch?v=7JWEhgWm4M4",
    },
    {
      title: "Episode 4",
      guest: "Sunny Ray",
      guestTitle: "Co-Founder, RaaSRocket & President",
      guestCompany: "Unocoin",
      xUrl: "https://x.com/thespeakerlisan/status/2044877463785013252",
      youtubeUrl: "https://www.youtube.com/watch?v=EreH4lVMzUA",
    },
    {
      title: "Episode 3",
      guest: "Varun Turlapati",
      guestTitle: "Managing Director",
      guestCompany: "Chaanakya Capital",
      xUrl: "https://x.com/thespeakerlisan/status/2040173652868767985",
      youtubeUrl: "https://www.youtube.com/watch?v=oPjqOAxsND0",
    },
    {
      title: "Episode 2",
      guest: "Yangchen Sharma",
      guestTitle: "General Partner",
      guestCompany: "Roundtable Ventures",
      xUrl: "https://x.com/thespeakerlisan/status/2039471823423975808",
      youtubeUrl: "https://www.youtube.com/watch?v=v9g4T7kPw48",
    },
    {
      title: "Episode 1",
      guest: "Charles Cormier",
      guestTitle: "CEO",
      guestCompany: "RaaSRocket",
      xUrl: "https://x.com/thespeakerlisan/status/2038694757166379327",
      youtubeUrl: "https://www.youtube.com/watch?v=1RGwcT57MJU",
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
