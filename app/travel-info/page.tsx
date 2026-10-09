import type { Metadata } from "next";
import Link from "next/link";
import { INFO_SECTIONS } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Travel Information",
  description:
    "Everything you need before takeoff: baggage, check-in, travel documents, and destination requirements.",
  openGraph: {
    title: "Travel Information | AEROVIA",
    description:
      "Everything you need before takeoff: baggage, check-in, travel documents, and destination requirements.",
  },
};

export default function TravelInfoPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Travel made clear</div>
          <h1>Everything you need before takeoff.</h1>
          <p>A calm, simple place for the details travelers need most.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="info-grid">
            <article className="info-card">
              <h2>Baggage</h2>
              <p>
                Know what to pack, what you can bring onboard, and how checked
                bags work before you fly.
              </p>
              <a href="#baggage">View baggage allowance</a>
            </article>
            <article className="info-card">
              <h2>Check in</h2>
              <p>
                Get ready to fly with a short check-in flow and a clear view of
                your journey.
              </p>
              <Link href="/manage">Check in now</Link>
            </article>
            <article className="info-card">
              <h2>Travel documents</h2>
              <p>
                Make sure your passport, visas, and travel requirements are
                ready for your destination.
              </p>
              <Link href="/destinations">Explore destinations</Link>
            </article>
            <article className="info-card">
              <h2>Flight updates</h2>
              <p>
                Use your booking reference to review your itinerary and stay on
                top of your trip.
              </p>
              <Link href="/manage">Manage booking</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt" id="baggage">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Baggage</div>
              <h2>What you can bring</h2>
            </div>
            <p>
              Every traveler gets a checked allowance and a carry-on limit,
              based on the cabin you book.
            </p>
          </div>
          <table className="allow-table">
            <thead>
              <tr>
                <th scope="col">Cabin</th>
                <th scope="col">Checked baggage</th>
                <th scope="col">Carry-on</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Economy</th>
                <td>20 kg</td>
                <td>7 kg</td>
              </tr>
              <tr>
                <th scope="row">Comfort</th>
                <td>25 kg</td>
                <td>10 kg</td>
              </tr>
              <tr>
                <th scope="row">Business</th>
                <td>30 kg</td>
                <td>12 kg</td>
              </tr>
            </tbody>
          </table>
          <p className="allow-note">
            The checked allowance is per traveler, so a booking for two in
            Comfort includes 50 kg in total. Need more? Add extra checked
            baggage in 5 kg steps at PHP 300 per kg when you search, and it
            appears on your fare total straight away.
          </p>
          <div className="info-grid">
            <article className="info-card">
              <h2>Carry-on</h2>
              <p>
                One bag plus one personal item per traveler. Keep valuables,
                medication, documents, and anything needed in flight in the
                cabin, not in the hold.
              </p>
            </article>
            <article className="info-card">
              <h2>Prohibited items</h2>
              <p>
                No flammables, compressed gas, corrosive liquids, or unapproved
                lithium batteries in either bag. Lighters and power banks must
                travel in the cabin.
              </p>
            </article>
            <article className="info-card">
              <h2>Special items</h2>
              <p>
                Sports gear, musical instruments, and mobility aids are
                accepted, but may need to be declared up to 48 hours before
                departure.
              </p>
            </article>
            <article className="info-card">
              <h2>Damaged or lost bags</h2>
              <p>
                Report it before leaving the airport so we can open a file. Keep
                your baggage tag until the bag is confirmed delivered.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">More information</div>
              <h2>Helpful details, all in one place</h2>
            </div>
            <p>
              Jump to the topic you need using the links in the footer, or read
              on below.
            </p>
          </div>
          <div className="info-sections">
            {INFO_SECTIONS.map((section) => (
              <section
                className="info-section"
                id={section.id}
                key={section.id}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
