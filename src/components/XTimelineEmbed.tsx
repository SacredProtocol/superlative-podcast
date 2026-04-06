"use client";

import { useEffect, useRef } from "react";

interface XTimelineEmbedProps {
  handle: string;
  height?: number;
}

export default function XTimelineEmbed({
  handle,
  height = 600,
}: XTimelineEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous content
    container.innerHTML = "";

    // Create the timeline anchor
    const anchor = document.createElement("a");
    anchor.className = "twitter-timeline";
    anchor.setAttribute("data-theme", "light");
    anchor.setAttribute("data-chrome", "noheader nofooter noborders transparent");
    anchor.setAttribute("data-height", String(height));
    anchor.href = `https://twitter.com/${handle}`;
    anchor.textContent = `Posts by @${handle}`;
    container.appendChild(anchor);

    // Load or re-run the Twitter widgets script
    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load(container);
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      container.appendChild(script);
    }
  }, [handle, height]);

  return <div ref={containerRef} />;
}
