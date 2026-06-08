#!/usr/bin/env node
/**
 * Preview episode publish status without modifying files.
 * Notion metadata still requires the Notion MCP in the agent session.
 *
 * Usage:
 *   node scripts/preview-episode.mjs --auto
 *   node scripts/preview-episode.mjs 30
 *   node scripts/preview-episode.mjs 29 30 --guest "Peter Dorfner"
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CONFIG_PATH = resolve(ROOT, "src/config.ts");
const ENV_PATH = resolve(ROOT, ".env.local");
const UPLOADS_PLAYLIST = "UUo1EsiwgfAUlI3_hxudO3EA";

function loadEnv() {
  try {
    const raw = readFileSync(ENV_PATH, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // .env.local optional for read-only config checks
  }
}

function parseConfigEpisodes() {
  const src = readFileSync(CONFIG_PATH, "utf8");
  const episodesStart = src.indexOf("episodes: [");
  if (episodesStart === -1) return [];

  const episodesSrc = src.slice(episodesStart);
  const episodes = [];

  for (const chunk of episodesSrc.split(/(?=title:\s*"Episode \d+")/)) {
    const number = chunk.match(/title:\s*"Episode (\d+)"/);
    if (!number) continue;
    const guest = chunk.match(/guest:\s*"([^"]+)"/);
    const youtube = chunk.match(/youtubeUrl:\s*"([^"]+)"/);
    episodes.push({
      number: Number(number[1]),
      guest: guest?.[1] ?? "",
      youtubeUrl: youtube?.[1] ?? "",
    });
  }
  return episodes;
}

function maxEpisodeNumber(episodes) {
  return episodes.reduce((max, ep) => Math.max(max, ep.number), 0);
}

function videoIdFromUrl(url) {
  const live = url.match(/\/live\/([^?&#/]+)/);
  if (live) return live[1];
  const watch = url.match(/[?&]v=([^?&#/]+)/);
  if (watch) return watch[1];
  const short = url.match(/youtu\.be\/([^?&#/]+)/);
  if (short) return short[1];
  return null;
}

function guestTokens(guest) {
  const parts = guest.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "", last: "" };
  return { first: parts[0], last: parts[parts.length - 1] };
}

function matchesGuest(title, guest) {
  if (!guest) return false;
  const { first, last } = guestTokens(guest);
  const lower = title.toLowerCase();
  return lower.includes(first.toLowerCase()) && lower.includes(last.toLowerCase());
}

async function fetchRecentUploads(apiKey, maxResults = 25) {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("playlistId", UPLOADS_PLAYLIST);
  url.searchParams.set("maxResults", String(maxResults));
  url.searchParams.set("key", apiKey);

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube API error ${res.status}: ${body}`);
  }
  const data = await res.json();
  return (data.items ?? []).map((item) => ({
    videoId: item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId,
    title: item.snippet?.title ?? "",
    publishedAt: item.snippet?.publishedAt ?? "",
  }));
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const auto = args.includes("--auto");
  const guestIdx = args.indexOf("--guest");
  const guest = guestIdx !== -1 ? args[guestIdx + 1] : undefined;
  const numbers = args
    .filter((a) => /^\d+$/.test(a))
    .map((n) => Number(n));
  return { auto, guest, numbers };
}

function printHeader(title) {
  console.log(`\n${title}`);
  console.log("=".repeat(title.length));
}

loadEnv();

const { auto, guest: guestFlag, numbers } = parseArgs(process.argv);
const episodes = parseConfigEpisodes();
const configuredIds = new Set(
  episodes.map((ep) => videoIdFromUrl(ep.youtubeUrl)).filter(Boolean),
);
const maxConfigured = maxEpisodeNumber(episodes);

printHeader("Config status");
console.log(`Episodes in config: ${episodes.length}`);
console.log(`Highest episode number: ${maxConfigured}`);
if (episodes[0]) {
  console.log(
    `Newest in config: Episode ${episodes[0].number} — ${episodes[0].guest}`,
  );
}

const apiKey = process.env.YOUTUBE_API_KEY;
if (!apiKey) {
  console.log("\nYOUTUBE_API_KEY not found in .env.local — skipping YouTube checks.");
  process.exit(0);
}

let uploads;
try {
  uploads = await fetchRecentUploads(apiKey);
} catch (err) {
  console.error(`\nFailed to fetch YouTube uploads: ${err.message}`);
  process.exit(1);
}

const unpublished = uploads.filter((u) => u.videoId && !configuredIds.has(u.videoId));

printHeader("YouTube uploads not yet in config");
if (unpublished.length === 0) {
  console.log("None — all recent uploads appear linked in config.");
} else {
  for (const video of unpublished) {
    console.log(`- ${video.title}`);
    console.log(`  https://www.youtube.com/live/${video.videoId}`);
    console.log(`  published: ${video.publishedAt}`);
  }
}

if (auto) {
  printHeader("Auto-detect suggestion");
  const nextNumber = maxConfigured + 1;
  const newestUnpublished = unpublished[0];
  if (!newestUnpublished) {
    console.log("No unpublished YouTube uploads found among recent channel videos.");
  } else {
    console.log(`Suggested next episode number: ${nextNumber}`);
    console.log(`Newest unlinked upload: ${newestUnpublished.title}`);
    console.log(
      `Next: query Notion for Episode ${nextNumber} and confirm guest/title match.`,
    );
  }
}

for (const n of numbers) {
  printHeader(`Episode ${n} preview`);
  const existing = episodes.find((ep) => ep.number === n);
  if (existing) {
    console.log(`ALREADY IN CONFIG — ${existing.guest}`);
    if (existing.youtubeUrl) console.log(`  ${existing.youtubeUrl}`);
    continue;
  }
  console.log("Not in config yet.");
  const guest = guestFlag ?? "";
  if (guest) {
    const match = uploads.find((u) => matchesGuest(u.title, guest));
    if (match) {
      console.log(`YouTube match for "${guest}": ${match.title}`);
      console.log(`  https://www.youtube.com/live/${match.videoId} (api)`);
    } else {
      console.log(`No YouTube match for guest "${guest}" in recent uploads.`);
    }
  } else {
    console.log("Pass --guest \"Full Name\" to test YouTube name matching.");
  }
  console.log("Fetch Notion row + prep notes via MCP for full preview table.");
}
