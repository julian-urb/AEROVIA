import type { Metadata } from "next";
import { DestinationsExplorer } from "@/components/destinations/DestinationsExplorer";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore popular routes from Manila and find the trip that fits your plans.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Destinations | AEROVIA",
    description:
      "Explore popular routes from Manila and find the trip that fits your plans.",
  },
};

export default function DestinationsPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">AEROVIA network</div>
          <h1>Find your next favorite place.</h1>
          <p>
            Fresh city breaks, familiar favorites, and good reasons to book the
            trip.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <DestinationsExplorer />
        </div>
      </section>
    </main>
  );
}
