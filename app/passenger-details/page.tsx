"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { baggageSentence, bookingView } from "@/lib/booking";
import { describePassengers, peso } from "@/lib/format";
import { DEFAULT_CONTACT } from "@/lib/constants";
import { getBooking, saveBooking } from "@/lib/storage";
import {
  CONTACT_FIELDS,
  validateContact,
  type ContactErrors,
} from "@/lib/validation";
import type { Booking, Contact } from "@/lib/types";

export default function PassengerDetailsPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [contact, setContact] = useState<Contact>({ ...DEFAULT_CONTACT });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const stored = getBooking();
    // localStorage is browser-only; hydrate the booking after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBooking(stored);
    if (stored) setContact({ ...DEFAULT_CONTACT, ...stored.contact });
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <main id="main" />;
  }

  const hasBooking = Boolean(booking && booking.reference);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!booking || !booking.reference) return;
    const found = validateContact(contact);
    setErrors(found);
    const count = Object.keys(found).length;
    setAlert(
      count ? `Please correct ${count} field${count > 1 ? "s" : ""} below.` : "",
    );
    if (count) return;
    saveBooking({ ...booking, contact });
    router.push(`/manage?confirmation=${booking.reference}`);
  }

  const view = hasBooking && booking ? bookingView(booking) : null;

  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Almost there</div>
          <h1>Who is flying?</h1>
          <p>
            {hasBooking && booking ? (
              <>
                We need the lead passenger details to issue your itinerary. Your
                booking reference is <strong>{booking.reference}</strong>.
              </>
            ) : (
              "We need the lead passenger details to issue your itinerary."
            )}
          </p>
        </div>
      </section>
      <section className="section alt">
        <div className="shell">
          <div className="manage-card">
            <h2>Lead passenger details</h2>
            <p>
              Enter the name exactly as it appears on the passenger&apos;s ID. We
              use the last name to find this booking later.
            </p>

            {!hasBooking || !booking || !view ? (
              <div className="empty-state">
                <p>We could not find a booking in progress.</p>
                <p>
                  <Link className="button" href="/#book">
                    Start a new search
                  </Link>
                </p>
              </div>
            ) : (
              <>
                <div className="review">
                  <h3>Your flight</h3>
                  <dl>
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
                      {view.travelers} traveler{view.travelers > 1 ? "s" : ""} (
                      {describePassengers(view.passengers)})
                    </dd>
                    <dt>Checked baggage</dt>
                    <dd>{baggageSentence(view)}</dd>
                    <dt>Price per traveler</dt>
                    <dd>{peso(booking.fare)}</dd>
                  </dl>
                  <div className="review-total">
                    <span>Total due</span>
                    <strong>{peso(view.total)}</strong>
                  </div>
                </div>

                <form noValidate onSubmit={submit}>
                  <p className={`form-alert${alert ? " show" : ""}`} role="alert">
                    {alert}
                  </p>
                  <div className="manage-form">
                    {CONTACT_FIELDS.map((field) => {
                      const id = `pd-${field.id}`;
                      const errId = `pd-err-${field.id}`;
                      const value = contact[field.key];
                      const message = errors[field.key] ?? "";
                      const isEmail = field.key === "email";
                      const isPhone = field.key === "phone";
                      return (
                        <div className="field" key={field.key}>
                          <label htmlFor={id}>
                            {field.key === "firstName"
                              ? "First name"
                              : field.key === "lastName"
                                ? "Last name"
                                : isEmail
                                  ? "Email"
                                  : "Mobile number"}
                          </label>
                          <input
                            id={id}
                            name={field.key}
                            type={isEmail ? "email" : isPhone ? "tel" : "text"}
                            autoComplete={
                              field.key === "firstName"
                                ? "given-name"
                                : field.key === "lastName"
                                  ? "family-name"
                                  : isEmail
                                    ? "email"
                                    : "tel"
                            }
                            inputMode={isEmail || isPhone ? (isEmail ? "email" : "tel") : undefined}
                            placeholder={isPhone ? "+63 917 000 0000" : undefined}
                            value={value}
                            aria-invalid={message ? "true" : "false"}
                            aria-describedby={errId}
                            onChange={(e) =>
                              setContact((prev) => ({
                                ...prev,
                                [field.key]: e.target.value,
                              }))
                            }
                          />
                          <small className="field-error" id={errId}>
                            {message}
                          </small>
                        </div>
                      );
                    })}
                    <button className="button" type="submit">
                      Confirm booking
                    </button>
                  </div>
                </form>
              </>
            )}
            <p className="notice">
              <Link href="/results">&larr; Back to flight results</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
