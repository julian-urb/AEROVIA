"use client";

import { useEffect, useRef, useState } from "react";
import {
  CABIN_BAGGAGE,
  EXTRA_KG_RATE,
  EXTRA_KG_STEP,
  MAX_EXTRA_KG,
  MAX_PAX,
  PASSENGER_TYPES,
} from "@/lib/constants";
import { totalTravelers } from "@/lib/pricing";
import { CABINS } from "@/lib/types";
import type { Cabin, PassengerCounts, PassengerKey } from "@/lib/types";

type Props = {
  passengers: PassengerCounts;
  cabin: Cabin;
  extraKg: number;
  onPassengersChange: (passengers: PassengerCounts) => void;
  onCabinChange: (cabin: Cabin) => void;
  onExtraKgChange: (extraKg: number) => void;
};

export function PassengerPicker({
  passengers,
  cabin,
  extraKg,
  onPassengersChange,
  onCabinChange,
  onExtraKgChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const travelers = totalTravelers(passengers);
  const rule = CABIN_BAGGAGE[cabin];

  function floorOf(key: PassengerKey): number {
    return PASSENGER_TYPES.find((type) => type.key === key)?.min ?? 0;
  }

  function limitOf(key: PassengerKey): number {
    if (key === "infant") return Math.min(MAX_PAX, passengers.adult);
    return MAX_PAX;
  }

  function setPassenger(key: PassengerKey, step: number) {
    const next = {
      ...passengers,
      [key]: Math.min(
        limitOf(key),
        Math.max(floorOf(key), passengers[key] + step),
      ),
    };
    if (key === "adult" && next.infant > next.adult) next.infant = next.adult;
    onPassengersChange(next);
  }

  function setExtraKg(step: number) {
    onExtraKgChange(Math.min(MAX_EXTRA_KG, Math.max(0, extraKg + step * EXTRA_KG_STEP)));
  }

  const extraCost = extraKg * EXTRA_KG_RATE;
  const triggerText = `${travelers} traveler${travelers > 1 ? "s" : ""}, ${cabin}${
    extraKg ? `, +${extraKg} kg` : ""
  }`;

  return (
    <div className="pax-field" ref={wrapRef}>
      <label htmlFor="pax-trigger">Passengers &amp; cabin</label>
      <button
        type="button"
        className="pax-trigger"
        id="pax-trigger"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls="pax-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span id="pax-trigger-text">{triggerText}</span>
        <span className="pax-caret" aria-hidden="true" />
      </button>

      <div className="pax-panel" id="pax-panel" hidden={!open}>
        <fieldset className="pax-cabins">
          <legend>Cabin</legend>
          {CABINS.map((option) => (
            <label className="cabin-pill" key={option}>
              <input
                type="radio"
                name="cabin"
                value={option}
                checked={cabin === option}
                onChange={() => onCabinChange(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>

        <small className="bgg-hint">
          {cabin} includes {rule.checked} kg checked and {rule.carryOn} kg
          carry-on per traveler, {rule.checked * travelers} kg for {travelers}{" "}
          traveler{travelers > 1 ? "s" : ""}.
        </small>

        <div className="pax-list">
          {PASSENGER_TYPES.map((type) => {
            const count = passengers[type.key];
            const min = floorOf(type.key);
            const max = limitOf(type.key);
            return (
              <div className="pax-row" key={type.key}>
                <div className="pax-name">
                  <strong>{type.label}</strong>
                  <small>{type.hint}</small>
                </div>
                <div className="stepper">
                  <button
                    type="button"
                    className="step-btn"
                    aria-label={`Remove one ${type.label.toLowerCase()}`}
                    disabled={count <= min}
                    onClick={() => setPassenger(type.key, -1)}
                  >
                    &minus;
                  </button>
                  <output className="pax-count">{count}</output>
                  <button
                    type="button"
                    className="step-btn"
                    aria-label={`Add one ${type.label.toLowerCase()}`}
                    disabled={count >= max}
                    onClick={() => setPassenger(type.key, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pax-baggage">
          <div className="pax-row">
            <div className="pax-name">
              <strong>Extra checked baggage</strong>
              <small>PHP {EXTRA_KG_RATE} per kg, added in {EXTRA_KG_STEP} kg steps</small>
            </div>
            <div className="stepper">
              <button
                type="button"
                className="step-btn"
                aria-label={`Remove ${EXTRA_KG_STEP} kg of extra checked baggage`}
                disabled={extraKg <= 0}
                onClick={() => setExtraKg(-1)}
              >
                &minus;
              </button>
              <output className="pax-count">{extraKg} kg</output>
              <button
                type="button"
                className="step-btn"
                aria-label={`Add ${EXTRA_KG_STEP} kg of extra checked baggage`}
                disabled={extraKg >= MAX_EXTRA_KG}
                onClick={() => setExtraKg(1)}
              >
                +
              </button>
            </div>
          </div>
          <small className="bgg-total" aria-live="polite">
            {extraKg
              ? `Extra baggage ${extraKg} kg x PHP ${EXTRA_KG_RATE} = PHP ${extraCost.toLocaleString()}`
              : "No extra baggage added"}
          </small>
        </div>

        <button
          className="button pax-done"
          type="button"
          onClick={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
