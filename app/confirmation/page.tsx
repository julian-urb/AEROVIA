"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JsonLd, flightReservationJsonLd } from "@/components/seo/JsonLd";
import { FareBreakdownList } from "@/components/booking/FareBreakdownList";
import { baggageSentence, bookingView, contactName } from "@/lib/booking";
import { downloadICS } from "@/lib/calendar";
import { describePassengers, peso } from "@/lib/format";
import { fareBreakdownFor, totalTravelers } from "@/lib/pricing";
import { travelerTypeLabel } from "@/lib/travelers";
import { useBooking } from "@/lib/useBooking";

export default function ConfirmationPage() {
  const [reference, setReference] = useState<string | null>(null);
  const { booking, loaded } = useBooking(reference);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReference(ref);
  }, []);

  if (!loaded) {
    return <main id="main" />;
  }

  if (!booking) {
    return (
      <main id="main">
        <section className="page-hero">
          <div className="shell">
            <div className="eyebrow">Booking</div>
            <h1>We could not find that booking.</h1>
            <p>
              Use your reference on the Manage page to look it up again.
            </p>
            <p>
              <Link className="button" href="/manage">
                Manage booking
              </Link>
            </p>
          </div>
        </section>
      </main>
    );
  }

  const view = bookingView(booking);
  const travelers = booking.travelers || totalTravelers(booking.passengers);
  const breakdown =
    booking.breakdown ??
    fareBreakdownFor(
      Number(booking.fare) || 0,
      travelers,
      Number(booking.baggage.cost) || 0,
    );

  async function copyReference() {
    if (!booking) return;
    try {
      await navigator.clipboard.writeText(booking.reference);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main id="main">
      <JsonLd
        data={flightReservationJsonLd({
          reference: booking.reference,
          origin: booking.from,
          destination: booking.to,
          departure: booking.depart,
          cabin: booking.cabin,
          total: breakdown.total,
        })}
      />
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Confirmed</div>
          <h1>You are booked.</h1>
          <p>
            Keep your reference handy: <strong>{booking.reference}</strong>
          </p>
        </div>
      </section>
      <section className="section alt">
        <div className="shell">
          <div className="manage-card confirmation-card">
            <div className="confirmation-actions">
              <button
                className="button ghost"
                type="button"
                onClick={copyReference}
              >
                {copied ? "Copied!" : "Copy reference"}
              </button>
              <button
                className="button ghost"
                type="button"
                onClick={() => downloadICS(booking)}
              >
                Add to calendar
              </button>
              <button
                className="button ghost"
                type="button"
                onClick={() => window.print()}
              >
                Print itinerary
              </button>
              <Link
                className="button ghost"
                href={`/manage?ref=${booking.reference}&last=${encodeURIComponent(
                  booking.contact.lastName,
                )}`}
              >
                Manage booking
              </Link>
            </div>

            <h2>Your itinerary</h2>
            <dl className="review">
              <dt>Route</dt>
              <dd>
                {booking.from} to {booking.to}
              </dd>
              <dt>Dates</dt>
              <dd>{view.dates}</dd>
              <dt>Departure</dt>
              <dd>{booking.time || "Flexible dates"}</dd>
              <dt>Cabin</dt>
              <dd>{booking.cabin}</dd>
              <dt>Travelers</dt>
              <dd>
                {travelers} traveler{travelers > 1 ? "s" : ""} (
                {describePassengers(view.passengers)})
              </dd>
              <dt>Seats</dt>
              <dd>{(booking.seats ?? []).join(", ") || "Not selected"}</dd>
              <dt>Checked baggage</dt>
              <dd>{baggageSentence(view)}</dd>
              <dt>Lead passenger</dt>
              <dd>{contactName(booking.contact) || "Not provided"}</dd>
            </dl>

            {booking.travelerDetails?.length ? (
              <>
                <h3>Passengers</h3>
                <ul className="traveler-summary">
                  {booking.travelerDetails.map((detail, index) => (
                    <li key={index}>
                      <strong>
                        {detail.firstName} {detail.lastName}
                      </strong>{" "}
                      <span className="tag">
                        {travelerTypeLabel(detail.type)}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <h3>Payment summary</h3>
            <FareBreakdownList breakdown={breakdown} travelers={travelers} />

            <p className="notice">
              A copy of this itinerary has been prepared for{" "}
              {booking.contact.email || "your contact email"}. Reference{" "}
              {booking.reference}.
            </p>
            <p className="notice">{peso(breakdown.total)} total paid (demo).</p>
          </div>
        </div>
      </section>
    </main>
  );
}
