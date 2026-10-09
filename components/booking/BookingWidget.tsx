"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DESTINATIONS, ORIGINS } from "@/lib/data/airports";
import { makeBaggage, totalTravelers } from "@/lib/pricing";
import { saveSearch } from "@/lib/storage";
import { DEFAULT_PASSENGERS } from "@/lib/constants";
import type {
  Cabin,
  PassengerCounts,
  SearchState,
  TripType,
} from "@/lib/types";
import { PassengerPicker } from "./PassengerPicker";

function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export function BookingWidget() {
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>("round");
  const [from, setFrom] = useState<string>(ORIGINS[0]);
  const [to, setTo] = useState<string>(DESTINATIONS[0]);
  const [depart, setDepart] = useState("");
  const [returning, setReturning] = useState("");
  const [cabin, setCabin] = useState<Cabin>("Economy");
  const [passengers, setPassengers] = useState<PassengerCounts>({
    ...DEFAULT_PASSENGERS,
  });
  const [extraKg, setExtraKg] = useState(0);
  const [warning, setWarning] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    // Read the current date after mount to avoid an SSR/client hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(todayISO());
  }, []);

  function handleDepart(value: string) {
    setDepart(value);
    if (returning && value && returning < value) setReturning(value);
  }

  function runSearch() {
    if (passengers.infant > passengers.adult) {
      setWarning(
        "Each infant needs an accompanying adult. Add an adult or remove an infant.",
      );
      return;
    }
    setWarning("");
    const search: SearchState = {
      from,
      to,
      depart,
      returning: tripType === "one" ? "" : returning,
      cabin,
      passengers,
      baggage: makeBaggage(cabin, passengers, extraKg),
      tripType,
    };
    saveSearch(search);
    router.push("/results");
  }

  return (
    <div className="booking">
      <div className="trip-tabs" role="tablist" aria-label="Trip type">
        {(
          [
            ["round", "Round trip"],
            ["one", "One way"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tripType === value}
            className={tripType === value ? "active" : undefined}
            onClick={() => {
              setTripType(value);
              if (value === "one") setReturning("");
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="search-row">
        <div className="field">
          <label htmlFor="from">From</label>
          <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
            {ORIGINS.map((origin) => (
              <option key={origin}>{origin}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="to">To</label>
          <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
            {DESTINATIONS.map((destination) => (
              <option key={destination}>{destination}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="depart">Depart</label>
          <input
            id="depart"
            type="date"
            required
            min={today}
            value={depart}
            onChange={(e) => handleDepart(e.target.value)}
          />
        </div>

        <div className="field return-field" hidden={tripType === "one"}>
          <label htmlFor="return">Return</label>
          <input
            id="return"
            type="date"
            min={depart || today}
            value={returning}
            disabled={tripType === "one"}
            onChange={(e) => setReturning(e.target.value)}
          />
        </div>

        <PassengerPicker
          passengers={passengers}
          cabin={cabin}
          extraKg={extraKg}
          onPassengersChange={setPassengers}
          onCabinChange={setCabin}
          onExtraKgChange={setExtraKg}
        />

        <button className="button" type="button" onClick={runSearch}>
          Search flights
        </button>
      </div>

      {warning ? (
        <p className="notice" id="pax-warning" role="alert">
          {warning}
        </p>
      ) : null}
      <p className="notice">
        Choose a route, select a fare, and manage your journey in one place.
      </p>
    </div>
  );
}
