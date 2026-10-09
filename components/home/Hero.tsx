"use client";

import { useEffect, useState } from "react";

const SLIDES = ["airplane", "cabin", "clark"] as const;
const INTERVAL = 5200;

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;
    const id = window.setInterval(
      () => setActive((current) => (current + 1) % SLIDES.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="hero" id="book">
      <div className="hero-slides" aria-hidden="true">
        {SLIDES.map((slide, index) => (
          <div
            key={slide}
            className={`hero-slide ${slide}${index === active ? " active" : ""}`}
          />
        ))}
        <div className="hero-tint" />
      </div>
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">More than a destination</div>
            <h1>Everyday fares. Farther possibilities.</h1>
            <p>
              Book straightforward flights from Manila to the places you want to
              go, with useful choices and no complicated process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
