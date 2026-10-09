"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { FareBreakdownList } from "@/components/booking/FareBreakdownList";
import { contactName } from "@/lib/booking";
import { PAYMENT_DEMO_NOTICE } from "@/lib/constants";
import { describePassengers, peso } from "@/lib/format";
import { fareBreakdownFor, findPromo, totalTravelers } from "@/lib/pricing";
import { useBooking } from "@/lib/useBooking";

export default function PaymentPage() {
  const router = useRouter();
  const { booking, setBooking, loaded } = useBooking();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const travelers = booking
    ? booking.travelers || totalTravelers(booking.passengers)
    : 0;

  const breakdown = useMemo(() => {
    if (!booking) return null;
    const extraCost = Number(booking.baggage.cost) || 0;
    return fareBreakdownFor(
      Number(booking.fare) || 0,
      travelers,
      extraCost,
      appliedPromo,
    );
  }, [booking, travelers, appliedPromo]);

  if (!loaded) {
    return <main id="main" />;
  }

  if (!booking || !breakdown) {
    return (
      <main id="main">
        <section className="page-hero">
          <div className="shell">
            <div className="eyebrow">Almost there</div>
            <h1>Secure payment.</h1>
          </div>
        </section>
        <section className="section alt">
          <div className="shell">
            <div className="manage-card empty-state">
              <p>We could not find a booking in progress.</p>
              <p>
                <Link className="button" href="/#book">
                  Start a new search
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  function applyPromo() {
    const promo = findPromo(promoInput);
    if (!promo) {
      setAppliedPromo("");
      setPromoMessage(
        promoInput.trim()
          ? "That promo code is not recognised."
          : "Enter a promo code first.",
      );
      return;
    }
    setAppliedPromo(promo.code);
    setPromoMessage(`Applied ${promo.code}: ${promo.label}.`);
  }

  function pay() {
    if (!booking || !breakdown || submitting) return;
    setSubmitting(true);
    setBooking({
      ...booking,
      breakdown,
      total: breakdown.total,
    });
    router.push(`/confirmation?ref=${booking.reference}`);
  }

  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Step 5 of 5</div>
          <h1>Review and pay.</h1>
          <p>
            {booking.from} to {booking.to} | {booking.cabin} | {travelers}{" "}
            traveler{travelers > 1 ? "s" : ""} (
            {describePassengers(booking.passengers)}).
          </p>
        </div>
      </section>
      <section className="section alt">
        <div className="shell">
          <BookingSteps current="payment" />
          <div className="payment-grid">
            <div className="manage-card">
              <h2>Fare summary</h2>
              <FareBreakdownList breakdown={breakdown} travelers={travelers} />
              <div className="field promo-field">
                <label htmlFor="promo">Promo code</label>
                <div className="promo-row">
                  <input
                    id="promo"
                    value={promoInput}
                    placeholder="AEROVIA10"
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button
                    className="button ghost"
                    type="button"
                    onClick={applyPromo}
                  >
                    Apply
                  </button>
                </div>
                <small className="field-error" role="status">
                  {promoMessage}
                </small>
              </div>
            </div>

            <div className="manage-card">
              <h2>Your booking</h2>
              <dl className="review">
                <dt>Reference</dt>
                <dd>{booking.reference}</dd>
                <dt>Lead passenger</dt>
                <dd>{contactName(booking.contact) || "Not provided"}</dd>
                <dt>Email</dt>
                <dd>{booking.contact.email || "Not provided"}</dd>
                <dt>Travelers</dt>
                <dd>
                  {describePassengers(booking.passengers)}
                </dd>
                <dt>Seats</dt>
                <dd>{(booking.seats ?? []).join(", ") || "Not selected"}</dd>
                <dt>Checked baggage</dt>
                <dd>
                  {booking.baggage.includedKg} kg included
                  {booking.baggage.extraKg
                    ? ` + ${booking.baggage.extraKg} kg extra`
                    : ""}
                </dd>
              </dl>
              <p className="notice warn">{PAYMENT_DEMO_NOTICE}</p>
              <div className="step-actions">
                <Link className="button ghost" href="/seats">
                  Back
                </Link>
                <button
                  className="button"
                  type="button"
                  onClick={pay}
                  disabled={submitting}
                >
                  {submitting ? "Confirming..." : `Pay ${peso(breakdown.total)} (demo)`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
