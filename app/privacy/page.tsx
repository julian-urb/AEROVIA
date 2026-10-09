import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AEROVIA collects, uses, and protects the information you share when you book a flight.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | AEROVIA",
    description:
      "How AEROVIA collects, uses, and protects the information you share when you book a flight.",
  },
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p>
            AEROVIA respects your privacy. This policy explains what we collect
            and how we use it.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="info-sections">
            <section className="info-section">
              <h2>Information we collect</h2>
              <p>
                We collect the details you provide when you search and book,
                including passenger names, your contact email and phone number,
                your travel dates, and your fare selections.
              </p>
            </section>
            <section className="info-section">
              <h2>How we use it</h2>
              <p>
                We use your information to confirm and manage bookings, share
                your itinerary, and provide customer support. In this demo
                experience, booking data is stored only in your browser.
              </p>
            </section>
            <section className="info-section">
              <h2>Sharing</h2>
              <p>
                We do not sell your personal information. We share it only with
                service providers who help us operate flights and support, and
                where required by law.
              </p>
            </section>
            <section className="info-section">
              <h2>Your choices</h2>
              <p>
                You can ask us to correct or delete your information by
                contacting support. You can clear locally stored booking data at
                any time through your browser settings.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
