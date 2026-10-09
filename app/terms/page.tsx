import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of the AEROVIA website and booking service.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use | AEROVIA",
    description:
      "The terms that govern your use of the AEROVIA website and booking service.",
  },
};

export default function TermsPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Legal</div>
          <h1>Terms of Use</h1>
          <p>
            By using AEROVIA you agree to these terms. Please read them
            carefully.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="info-sections">
            <section className="info-section">
              <h2>Bookings</h2>
              <p>
                Fares and availability shown on this site are for
                demonstration. A booking is confirmed when you complete the
                checkout flow and receive a booking reference.
              </p>
            </section>
            <section className="info-section">
              <h2>Fares and payments</h2>
              <p>
                Displayed fares may exclude government taxes, airport fees, and
                carrier surcharges. The full breakdown is shown before you
                confirm. Checkout on this demo takes no real payment.
              </p>
            </section>
            <section className="info-section">
              <h2>Changes and refunds</h2>
              <p>
                Changes and refunds depend on your fare rules. Contact support
                with your booking reference and we will guide you through the
                steps.
              </p>
            </section>
            <section className="info-section">
              <h2>Acceptable use</h2>
              <p>
                Do not misuse the site, attempt to disrupt it, or submit false
                information. Conditions of carriage and applicable law govern
                your flight.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
