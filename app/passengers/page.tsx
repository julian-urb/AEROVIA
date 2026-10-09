"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { describePassengers, peso } from "@/lib/format";
import { totalTravelers } from "@/lib/pricing";
import {
  emptyTravelerDetails,
  travelerTypeLabel,
  validateTravelerDetails,
  type TravelerError,
} from "@/lib/travelers";
import { useBooking } from "@/lib/useBooking";
import type { TravelerDetail } from "@/lib/types";

export default function PassengersPage() {
  const router = useRouter();
  const { booking, setBooking, loaded } = useBooking();
  const [details, setDetails] = useState<TravelerDetail[]>([]);
  const [errors, setErrors] = useState<TravelerError[]>([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (!booking) return;
    // Build one row per traveler from the stored passenger counts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetails(
      emptyTravelerDetails(booking.passengers, booking.travelerDetails ?? []),
    );
  }, [booking]);

  if (!loaded) {
    return <main id="main" />;
  }

  if (!booking) {
    return (
      <main id="main">
        <section className="page-hero">
          <div className="shell">
            <div className="eyebrow">Almost there</div>
            <h1>Who is flying?</h1>
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

  const travelers = booking.travelers || totalTravelers(booking.passengers);

  function errorFor(index: number, field: "firstName" | "lastName"): string {
    return (
      errors.find((error) => error.index === index && error.field === field)
        ?.message ?? ""
    );
  }

  function update(
    index: number,
    field: "firstName" | "lastName",
    value: string,
  ) {
    setDetails((prev) =>
      prev.map((detail, i) =>
        i === index ? { ...detail, [field]: value } : detail,
      ),
    );
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!booking) return;
    const found = validateTravelerDetails(details);
    setErrors(found);
    setAlert(
      found.length
        ? `Please complete ${found.length} field${found.length > 1 ? "s" : ""} below.`
        : "",
    );
    if (found.length) return;
    setBooking({
      ...booking,
      travelerDetails: details.map((detail) => ({
        ...detail,
        firstName: detail.firstName.trim(),
        lastName: detail.lastName.trim(),
      })),
    });
    router.push("/seats");
  }

  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Step 3 of 5</div>
          <h1>Passenger names.</h1>
          <p>
            Enter each traveler exactly as it appears on their ID. {travelers}{" "}
            traveler{travelers > 1 ? "s" : ""} ({describePassengers(
              booking.passengers,
            )}).
          </p>
        </div>
      </section>
      <section className="section alt">
        <div className="shell">
          <BookingSteps current="travelers" />
          <div className="manage-card">
            <h2>{peso(booking.fare)} per traveler</h2>
            <p>
              {booking.from} to {booking.to} | {booking.cabin}
            </p>
            <form noValidate onSubmit={submit}>
              <p className={`form-alert${alert ? " show" : ""}`} role="alert">
                {alert}
              </p>
              <div className="traveler-list">
                {details.map((detail, index) => {
                  const firstError = errorFor(index, "firstName");
                  const lastError = errorFor(index, "lastName");
                  return (
                    <fieldset className="traveler-card" key={index}>
                      <legend>
                        Traveler {index + 1}
                        <span className="tag">{travelerTypeLabel(detail.type)}</span>
                      </legend>
                      <div className="field">
                        <label htmlFor={`t-${index}-first`}>First name</label>
                        <input
                          id={`t-${index}-first`}
                          autoComplete="given-name"
                          value={detail.firstName}
                          aria-invalid={firstError ? "true" : "false"}
                          aria-describedby={`t-${index}-first-err`}
                          onChange={(e) =>
                            update(index, "firstName", e.target.value)
                          }
                        />
                        <small className="field-error" id={`t-${index}-first-err`}>
                          {firstError}
                        </small>
                      </div>
                      <div className="field">
                        <label htmlFor={`t-${index}-last`}>Last name</label>
                        <input
                          id={`t-${index}-last`}
                          autoComplete="family-name"
                          value={detail.lastName}
                          aria-invalid={lastError ? "true" : "false"}
                          aria-describedby={`t-${index}-last-err`}
                          onChange={(e) =>
                            update(index, "lastName", e.target.value)
                          }
                        />
                        <small className="field-error" id={`t-${index}-last-err`}>
                          {lastError}
                        </small>
                      </div>
                    </fieldset>
                  );
                })}
              </div>
              <div className="step-actions">
                <Link className="button ghost" href="/passenger-details">
                  Back
                </Link>
                <button className="button" type="submit">
                  Choose seats
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
