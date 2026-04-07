import { siteConfig } from "@/config";

/* ═══ Icons ═══════════════════════════════════════════════════════ */

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function CalendarIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function PlayIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <polygon points="6,3 20,12 6,21" />
    </svg>
  );
}

/* ═══ 1. Hero ═════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-inverse-bg text-inverse-fg section-px overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Live badge */}
        <div className="animate-fade-up mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="font-sans text-xs tracking-widest uppercase !text-[#ffffff]/60">
            Live on X
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-up delay-1 text-[2rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[0.95] tracking-tight !text-white">
          {siteConfig.showName}
        </h1>

        {/* Decorative line */}
        <div className="animate-fade-in delay-2 mt-8 sm:mt-10 h-px w-16 sm:w-24 bg-white/20" />

        {/* Host */}
        <p className="animate-fade-up delay-2 mt-4 sm:mt-5 font-sans text-xs sm:text-sm !text-[#ffffff]/70 uppercase tracking-[0.2em]">
          Hosted by {siteConfig.host}
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-4 mt-8 sm:mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:w-auto">
          <a
            href={siteConfig.xProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-white !text-[#000000] font-sans font-medium text-sm px-7 py-4 sm:px-9 sm:py-4 transition-all duration-300 hover:bg-white/90 active:scale-[0.97] touch-manipulation"
          >
            <XIcon size={16} />
            Follow Edward ({siteConfig.hostHandle})
            <ArrowIcon size={14} />
          </a>
          <a
            href={siteConfig.youtubeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2.5 border border-white/15 !text-[#ffffff] font-sans font-medium text-sm px-7 py-4 sm:px-9 sm:py-4 transition-all duration-300 hover:border-white/30 hover:bg-white/5 active:scale-[0.97] touch-manipulation ${
              !siteConfig.youtubeUrl ? "pointer-events-none opacity-25" : ""
            }`}
          >
            <YouTubeIcon size={16} />
            YouTube &mdash; Coming Soon
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade-in delay-5 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] !text-[#ffffff]/25">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

/* ═══ 2. Episodes ═════════════════════════════════════════════════ */

function Episodes() {
  const total = siteConfig.episodes.length;
  return (
    <section id="episodes" className="bg-background text-foreground section-px section-py">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Episodes
          </h2>
          <span className="font-sans text-xs sm:text-sm text-muted pb-1">
            {total} episode{total !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-2 h-px w-full bg-foreground" />

        <div className="mt-0 flex flex-col">
          {siteConfig.episodes.map((ep, i) => {
            const epNum = String(total - i).padStart(2, "0");
            return (
              <a
                key={ep.url}
                href={ep.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 sm:gap-5 py-5 sm:py-7 border-b border-border transition-all duration-300 hover:pl-2 sm:hover:pl-4"
              >
                {/* Episode number */}
                <span className="font-sans text-xs sm:text-sm text-muted font-mono w-6 sm:w-8 flex-shrink-0 tabular-nums">
                  {epNum}
                </span>

                {/* Play button */}
                <span className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-foreground flex items-center justify-center transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                  <span className="!text-[#000000] group-hover:!text-[#ffffff] transition-colors duration-300">
                    <PlayIcon />
                  </span>
                </span>

                {/* Title + meta */}
                <span className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className="font-sans text-[10px] sm:text-xs text-muted uppercase tracking-[0.15em] mb-0.5">
                    {ep.title}
                  </span>
                  <span className="font-sans text-base sm:text-lg font-medium leading-snug truncate transition-colors">
                    {ep.guest ?? ep.title}
                  </span>
                  {ep.guestTitle && ep.guestCompany && (
                    <span className="font-sans text-[11px] sm:text-xs text-muted">
                      {ep.guestTitle} &middot; {ep.guestCompany}
                    </span>
                  )}
                  <span className="font-sans text-[11px] sm:text-xs text-muted flex items-center gap-1.5 mt-0.5">
                    <XIcon size={10} />
                    Watch on X
                  </span>
                </span>

                {/* Arrow */}
                <span className="flex-shrink-0 !text-[#000000] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1 hidden sm:block">
                  <ArrowIcon size={16} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══ 3. About ════════════════════════════════════════════════════ */

function About() {
  return (
    <section className="bg-inverse-bg text-inverse-fg section-px section-py">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] !text-[#ffffff]/40">
            About
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <blockquote className="font-sans text-lg sm:text-xl lg:text-2xl leading-relaxed !text-[#ffffff]/80 font-light">
          &ldquo;{siteConfig.blurb}&rdquo;
        </blockquote>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          <a
            href={siteConfig.xProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-white !text-[#000000] font-sans font-medium text-sm px-7 py-4 transition-all duration-300 hover:bg-white/90 active:scale-[0.97] touch-manipulation"
          >
            <XIcon size={16} />
            Follow Edward ({siteConfig.hostHandle})
            <ArrowIcon size={14} />
          </a>
          <span className="font-sans text-xs !text-[#ffffff]/30">
            20-30 min &middot; Live &middot; No edits
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═══ 4. Guest Verticals ══════════════════════════════════════════ */

const verticalIcons: Record<string, string> = {
  Startups: "S",
  Media: "M",
  Sports: "Sp",
  Finance: "F",
};

function GuestVerticals() {
  return (
    <section className="bg-background text-foreground section-px py-12 sm:py-16">
      <div className="w-full max-w-2xl mx-auto">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-muted text-center">
          Featuring Guests From
        </p>

        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {siteConfig.verticals.map((v) => (
            <div
              key={v.title}
              className="group relative border border-border rounded-sm p-4 sm:p-5 transition-all duration-300 hover:border-foreground"
            >
              <span className="font-display text-2xl sm:text-3xl leading-none opacity-[0.06] absolute top-3 right-3 uppercase">
                {verticalIcons[v.title] || v.title[0]}
              </span>
              <h3 className="font-sans text-sm sm:text-base font-semibold leading-tight">
                {v.title}
              </h3>
              <p className="mt-1.5 font-sans text-[11px] sm:text-xs text-muted leading-snug">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ 5. CTA Banner ═══════════════════════════════════════════════ */

function CTABanner() {
  return (
    <section className="bg-inverse-bg text-inverse-fg section-px py-12 sm:py-16">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-tight">
          Never miss an episode
        </h2>
        <p className="mt-3 font-sans text-sm !text-[#ffffff]/50">
          New conversations drop live on X. Follow to get notified.
        </p>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <a
            href={siteConfig.xProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-white !text-[#000000] font-sans font-medium text-sm px-8 py-4 transition-all duration-300 hover:bg-white/90 active:scale-[0.97] touch-manipulation"
          >
            <XIcon size={16} />
            Follow Edward ({siteConfig.hostHandle})
            <ArrowIcon size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══ 6. Footer ═══════════════════════════════════════════════════ */

function Footer() {
  const links = [
    { href: siteConfig.xProfileUrl, label: "X", icon: <XIcon size={14} />, disabled: false },
    { href: siteConfig.youtubeUrl || "#", label: "YouTube", icon: <YouTubeIcon size={14} />, disabled: !siteConfig.youtubeUrl },
    ...(siteConfig.calendlyUrl
      ? [{ href: siteConfig.calendlyUrl, label: "Book a Guest Slot", icon: <CalendarIcon size={14} />, disabled: false }]
      : []),
  ];

  return (
    <footer className="bg-inverse-bg text-inverse-fg border-t border-white/10 section-px py-6 sm:py-8">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <span className="font-sans text-[11px] sm:text-xs !text-[#ffffff]/30 order-2 sm:order-1">
          &copy; {new Date().getFullYear()} {siteConfig.showName}
        </span>

        <nav className="flex items-center gap-5 order-1 sm:order-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 font-sans text-[11px] sm:text-xs !text-[#ffffff]/50 transition-all duration-200 hover:!text-[#ffffff] ${
                link.disabled ? "pointer-events-none !opacity-20" : ""
              }`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* ═══ Page ═════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Hero />
      <Episodes />
      <About />
      <GuestVerticals />
      <CTABanner />
      <Footer />
    </>
  );
}
