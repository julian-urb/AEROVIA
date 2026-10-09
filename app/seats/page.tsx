"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { OCCUPIED_SEATS, SEAT_LETTERS, SEAT_ROWS } from "@/lib/constants";
import { totalTravelers } from "@/lib/pricing";
import { useBooking } from "@/lib/useBooking";

const OCCUPIED = new Set<string>(OCCUPIED_SEATS);

export default function SeatsPage() {
  const router = useRouter();
  const { booking, setBooking, loaded } = useBooking();
  const [seats, setSeats] = useState<string[]>([]);
  const [hint, setHint] = useState("");

  if (!loaded) {
    return <main id="main" />;
  }

  if (!booking) {
    return (
      <main id="main">
        <section className="page-hero">
          <div className="shell">
            <div className="eyebrow">Almost there</div>
            <h1>Choose your seats.</h1>
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
  const selected = seats.length ? seats : booking.seats ?? [];
  const seatsDone = selected.length >= travelers;

  function toggleSeat(code: string) {
    const current = seats.length ? seats : booking?.seats ?? [];
    if (current.includes(code)) {
      setSeats(current.filter((seat) => seat !== code));
      setHint("");
      return;
    }
    if (current.length >= travelers) {
      setHint("Deselect a seat before choosing another.");
      return;
    }
    setHint("");
    setSeats([...current, code]);
  }

  function submit() {
    if (!booking || !seatsDone) return;
    setBooking({ ...booking, seats: selected });
    router.push("/payment");
  }

  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Step 4 of 5</div>
          <h1>Pick your seats.</h1>
          <p>
            Choose {travelers} seat{travelers > 1 ? "s" : ""} for{" "}
            {booking.from} to {booking.to}. Seats marked unavailable are
            already taken.
          </p>
        </div>
      </section>
      <section className="section alt">
        <div className="shell">
          <BookingSteps current="seats" />
          <div className="manage-card">
            <div className="seat-legend">
              <span>
                <i className="seat-dot available" /> Available
              </span>
              <span>
                <i className="seat-dot selected" /> Selected
              </span>
              <span>
                <i className="seat-dot occupied" /> Taken
              </span>
            </div>
            <div className="seat-cabin" role="group" aria-label="Aircraft seats">
              {Array.from({ length: SEAT_ROWS }, (_, rowIndex) => {
                const row = rowIndex + 1;
                return (
                  <div className="seat-row" key={row}>
                    <span className="seat-row-label" aria-hidden="true">
                      {row}
                    </span>
                    {SEAT_LETTERS.map((letter, letterIndex) => {
                      const code = `${row}${letter}`;
                      const isOccupied = OCCUPIED.has(code);
                      const isSelected = selected.includes(code);
                      return (
                        <span
                          className={
                            letterIndex === 3 ? "seat-gap" : undefined
                          }
                          key={code}
                        >
                          <button
                            type="button"
                            className={`seat ${
                              isOccupied
                                ? "occupied"
                                : isSelected
                                  ? "selected"
                                  : "available"
                            }`}
                            aria-pressed={isSelected}
                            aria-label={
                              isOccupied ? `Seat ${code} unavailable` : `Seat ${code}`
                            }
                            disabled={isOccupied}
                            onClick={() => toggleSeat(code)}
                          >
                            {letter}
                          </button>
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="seat-summary" aria-live="polite">
              {Array.from({ length: travelers }, (_, index) => (
                <span key={index}>
                  Traveler {index + 1}:{" "}
                  <strong>{selected[index] ?? "—"}</strong>
                </span>
              ))}
            </div>
            {hint ? (
              <p className="notice warn" role="status">
                {hint}
              </p>
            ) : null}

            <div className="step-actions">
              <Link className="button ghost" href="/passengers">
                Back
              </Link>
              <button
                className="button"
                type="button"
                disabled={!seatsDone}
                onClick={submit}
              >
                Continue to payment
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
