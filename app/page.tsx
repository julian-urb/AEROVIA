import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { PopularDeals } from "@/components/home/PopularDeals";

export const metadata: Metadata = {
  title: "More Than A Destination",
  description: "AEROVIA makes flying simple, modern, and affordable.",
  openGraph: {
    title: "AEROVIA | More Than A Destination",
    description: "AEROVIA makes flying simple, modern, and affordable.",
  },
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <BookingWidget />
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Popular right now</div>
              <h2>Good fares, great escapes</h2>
            </div>
            <p>
              Explore popular routes from Manila and find the trip that fits
              your plans.
            </p>
          </div>
          <PopularDeals />
        </div>
      </section>
    </main>
  );
}
