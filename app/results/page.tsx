"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cityOf } from "@/lib/data/airports";
import { getFlights } from "@/lib/data/flights";
import { describePassengers, peso } from "@/lib/format";
import { generateReference } from "@/lib/booking";
import {
  cabinRule,
  extraBaggageCost,
  fareFor,
  grandTotalFor,
  subtotalFor,
  totalTravelers,
} from "@/lib/pricing";
import { getSearch, saveBooking, saveSearch } from "@/lib/storage";
import { hasSearchParams, queryToSearch } from "@/lib/searchParams";
import type { Booking, SearchState } from "@/lib/types";

export default function ResultsPage() {
  const router = useRouter();
  const [search, setSearch] = useState<SearchState | null>(null);

  useEffect(() => {
    // localStorage is only available in the browser, so load the search after mount.
    // URL params make results shareable and survive a fresh session.
    const stored = getSearch();
    const params = new URLSearchParams(window.location.search);
    const next = hasSearchParams(params) ? queryToSearch(params, stored) : stored;
    if (hasSearchParams(params)) saveSearch(next);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(next);
  }, []);

  if (!search) {
    return (
      <main id="main">
        <section className="page-hero">
          <div className="shell">
            <div className="eyebrow">Choose your flight</div>
            <h1>Available fares</h1>
            <p id="results-summary">Loading your search...</p>
          </div>
        </section>
      </main>
    );
  }

  const travelers = totalTravelers(search.passengers);
  const rule = cabinRule(search.cabin);
  const extraKg = search.baggage.extraKg;
  const extraCost = extraBaggageCost(extraKg);
  const dates =
    search.tripType === "one"
      ? search.depart || "Flexible dates"
      : `${search.depart || "Flexible dates"} to ${
          search.returning || "Flexible return"
        }`;
  const summary = `${search.from} to ${search.to} | ${dates} | ${search.cabin} | ${travelers} traveler${
    travelers > 1 ? "s" : ""
  } (${describePassengers(search.passengers)})${
    extraCost ? ` | +${extraKg} kg extra baggage` : ""
  }`;
  const flights = getFlights(search.from, search.to);

  function chooseFlight(fare: number, total: number, time: string) {
    if (!search) return;
    const booking: Booking = {
      ...search,
      travelers,
      fare,
      total,
      time,
      reference: generateReference(),
      contact: { firstName: "", lastName: "", email: "", phone: "" },
    };
    saveBooking(booking);
    router.push("/passenger-details");
  }

  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Choose your flight</div>
          <h1>Available fares</h1>
          <p id="results-summary">{summary}</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="results-list">
            {flights.map((flight) => {
              const fare = fareFor(flight.baseFare, search.cabin);
              const subtotal = subtotalFor(fare, travelers);
              const total = grandTotalFor(fare, travelers, extraCost);
              return (
                <article className="flight-option" key={flight.id}>
                  <div>
                    <strong data-route>{`${cityOf(search.from)} to ${cityOf(
                      search.to,
                    )}`}</strong>
                    <small className="route-time">
                      {flight.departTime} - {flight.arriveTime} |{" "}
                      {flight.nonstop ? "Nonstop" : "1 stop"} |{" "}
                      {flight.duration}
                    </small>
                    <small className="bag-info" data-baggage>
                      {rule.checked} kg checked and {rule.carryOn} kg carry-on
                      per traveler
                      {extraCost
                        ? ` | +${extraKg} kg extra baggage, ${peso(extraCost)}`
                        : ""}
                    </small>
                  </div>
                  <div className="fare">
                    {peso(fare)}
                    <small>per traveler</small>
                    {travelers > 1 ? (
                      <small>
                        {peso(subtotal)} for {travelers} travelers
                      </small>
                    ) : null}
                    {extraCost ? (
                      <>
                        <small>{peso(extraCost)} extra baggage</small>
                        <small>{peso(total)} grand total</small>
                      </>
                    ) : null}
                  </div>
                  <button
                    className="button"
                    type="button"
                    onClick={() =>
                      chooseFlight(
                        fare,
                        total,
                        `${flight.departTime} - ${flight.arriveTime}`,
                      )
                    }
                  >
                    Select
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
