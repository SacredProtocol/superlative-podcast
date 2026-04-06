"use client";

import { useEffect, useRef } from "react";

interface XPostEmbedProps {
  url: string;
}

export default function XPostEmbed({ url }: XPostEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const blockquote = document.createElement("blockquote");
    blockquote.className = "twitter-tweet";
    blockquote.setAttribute("data-theme", "light");

    const anchor = document.createElement("a");
    anchor.href = url;
    blockquote.appendChild(anchor);

    container.appendChild(blockquote);

    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load(container);
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      container.appendChild(script);
    }
  }, [url]);

  return <div ref={containerRef} />;
}
