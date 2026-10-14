import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: "Privacy Policy | The Superlative Podcast",
  description: "How The Superlative Podcast handles personal information and Google account data.",
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "What this website collects",
    body: [
      "This website does not ask you for personal information and does not use advertising cookies. Our hosting provider keeps standard server logs, such as IP address and browser type, to keep the site running and secure. If you book a conversation with us, the booking service collects the details you enter, and we use them only to arrange and run your episode.",
    ],
  },
  {
    heading: "Guests",
    body: [
      "When you appear on the show, we keep your name, contact details, the recording and its transcript to produce, publish and promote your episode. Episodes are streamed and published publicly on YouTube, LinkedIn and X.",
    ],
  },
  {
    heading: "Google account data",
    body: [
      "Our internal tools connect only to Google accounts that belong to us: our own email, calendar, documents and YouTube channel. We use that access to send our own email, manage our own calendar events, edit our own documents and add chapters to our own videos. We do not access anyone else's Google account, and we do not sell, share or use Google user data for advertising.",
      "Our use of information received from Google follows the Google API Services User Data Policy, including its Limited Use requirements.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "To ask what we hold about you, to correct it or to have it removed, write to edward@superlativepodcast.com.",
    ],
  },
  {
    heading: "Changes",
    body: ["We will post any change to this policy here, with a new date."],
  },
];

export default function PrivacyPage() {
  return (
    <main className="section-px py-16 sm:py-24">
      <div className="w-full max-w-2xl mx-auto">
        <Link href="/" className="font-sans text-xs uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">
          &larr; {siteConfig.showName}
        </Link>
        <h1 className="mt-8 text-[2rem] sm:text-[2.75rem] leading-[1] tracking-tight">Privacy Policy</h1>
        <p className="mt-3 font-sans text-xs opacity-60">Last updated: 14 October 2026</p>
        <p className="mt-8 font-sans text-sm sm:text-base leading-relaxed">
          The Superlative Podcast is hosted by Edward Buchi and based in Toronto, Canada.
        </p>
        {sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="font-sans text-base sm:text-lg font-semibold">{s.heading}</h2>
            {s.body.map((para) => (
              <p key={para.slice(0, 24)} className="mt-3 font-sans text-sm sm:text-base leading-relaxed">
                {para.includes("edward@superlativepodcast.com") ? (
                  <>
                    {para.replace("edward@superlativepodcast.com.", "")}
                    <a href="mailto:edward@superlativepodcast.com" className="underline underline-offset-2">
                      edward@superlativepodcast.com
                    </a>
                    .
                  </>
                ) : (
                  para
                )}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
