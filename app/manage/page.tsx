"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/site/ToastProvider";
import { contactName, itineraryLines } from "@/lib/booking";
import { getBookingByReference, saveBooking } from "@/lib/storage";
import {
  REACHABLE_FIELDS,
  validateContact,
  type ContactErrors,
} from "@/lib/validation";
import type { Booking } from "@/lib/types";

type Result =
  | { ok: true; lines: string[] }
  | { ok: false; message: string };

export default function ManagePage() {
  const { notify } = useToast();
  const [reference, setReference] = useState("");
  const [surname, setSurname] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [hint, setHint] = useState(
    "Review your itinerary, update contact details, or check in for your flight.",
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ceErrors, setCeErrors] = useState<ContactErrors>({});
  const [ceStatus, setCeStatus] = useState<{ text: string; ok: boolean } | null>(
    null,
  );

  useEffect(() => {
    // Query string is browser-only; read it after mount. Supports share links
    // like /manage?ref=AER123&last=Santos as well as the confirmation redirect.
    const params = new URLSearchParams(window.location.search);
    const confirmation = params.get("confirmation") || params.get("ref");
    const last = params.get("last");
    /* eslint-disable react-hooks/set-state-in-effect */
    if (confirmation) {
      setReference(confirmation.toUpperCase());
      setHint(
        `Your booking reference is ${confirmation}. Enter it with your last name to view your itinerary.`,
      );
    }
    if (last) setSurname(last);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function findBooking() {
    const ref = reference.trim().toUpperCase();
    const stored = getBookingByReference(ref);
    const last = surname.trim().toLowerCase();
    const matches =
      stored &&
      ref === stored.reference &&
      last.length > 0 &&
      stored.contact.lastName.trim().toLowerCase() === last;

    if (!stored || !matches) {
      setBooking(null);
      setResult({
        ok: false,
        message:
          "We could not find that booking. Check your reference and last name, then try again.",
      });
      return;
    }

    setBooking(stored);
    setResult({ ok: true, lines: itineraryLines(stored) });
    setEmail(stored.contact.email);
    setPhone(stored.contact.phone);
    setCeErrors({});
    setCeStatus(null);
  }

  function saveContact() {
    if (!booking) return;
    const next = { ...booking.contact, email, phone };
    const found = validateContact(next, REACHABLE_FIELDS);
    setCeErrors(found);
    if (Object.keys(found).length) {
      setCeStatus({ text: "Please correct the highlighted fields.", ok: false });
      notify("Please correct the highlighted fields.", "bad");
      return;
    }
    const updated: Booking = { ...booking, contact: next };
    saveBooking(updated);
    setBooking(updated);
    setResult({ ok: true, lines: itineraryLines(updated) });
    setCeStatus({ text: "Contact details updated.", ok: true });
    notify("Contact details updated.");
  }

  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Your trip, your way</div>
          <h1>Manage your booking.</h1>
          <p>{hint}</p>
        </div>
      </section>
      <section className="section alt">
        <div className="shell">
          <div className="manage-card">
            <h2>Find your booking</h2>
            <p>
              Enter your booking reference and the last name of the lead
              passenger.
            </p>
            <div className="manage-form">
              <div className="field">
                <label htmlFor="reference">Booking reference</label>
                <input
                  id="reference"
                  placeholder="Example: AER123"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="surname">Last name</label>
                <input
                  id="surname"
                  placeholder="As shown on booking"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <button className="button" type="button" onClick={findBooking}>
                Find booking
              </button>
            </div>

            {result ? (
              <div
                className={`booking-result show${result.ok ? "" : " bad"}`}
                aria-live="polite"
              >
                {result.ok ? (
                  <>
                    <strong>{booking?.reference} confirmed</strong>
                    {result.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </>
                ) : (
                  result.message
                )}
              </div>
            ) : null}

            {booking && result?.ok ? (
              <div className="contact-editor">
                <h3>Update contact details</h3>
                <p>
                  Lead passenger:{" "}
                  <strong>{contactName(booking.contact) || "Not provided yet"}</strong>
                </p>
                <div className="manage-form">
                  <div className="field">
                    <label htmlFor="ce-email">Email</label>
                    <input
                      id="ce-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      aria-invalid={ceErrors.email ? "true" : "false"}
                      aria-describedby="ce-err-email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <small className="field-error" id="ce-err-email">
                      {ceErrors.email}
                    </small>
                  </div>
                  <div className="field">
                    <label htmlFor="ce-phone">Mobile number</label>
                    <input
                      id="ce-phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+63 917 000 0000"
                      value={phone}
                      aria-invalid={ceErrors.phone ? "true" : "false"}
                      aria-describedby="ce-err-phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <small className="field-error" id="ce-err-phone">
                      {ceErrors.phone}
                    </small>
                  </div>
                  <button
                    className="button"
                    type="button"
                    onClick={saveContact}
                  >
                    Save changes
                  </button>
                </div>
                <p
                  className={`form-status ${
                    ceStatus ? (ceStatus.ok ? "ok" : "bad") : ""
                  }`}
                  role="status"
                >
                  {ceStatus?.text}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
