import {
  CABIN_BAGGAGE,
  CABIN_MULTIPLIER,
  DEFAULT_PASSENGERS,
  EXTRA_KG_RATE,
  EXTRA_KG_STEP,
  MAX_EXTRA_KG,
  MAX_PAX,
  PASSENGER_TYPES,
} from "./constants";
import { PASSENGER_KEYS } from "./types";
import type {
  Baggage,
  Cabin,
  PassengerCounts,
  PassengerKey,
} from "./types";

export function totalTravelers(passengers: PassengerCounts): number {
  return PASSENGER_KEYS.reduce(
    (sum, key) => sum + (Number(passengers[key]) || 0),
    0,
  );
}

export function paxFloor(key: PassengerKey): number {
  return PASSENGER_TYPES.find((type) => type.key === key)?.min ?? 0;
}

export function paxLimit(
  key: PassengerKey,
  passengers: PassengerCounts,
): number {
  if (key === "infant") {
    return Math.min(MAX_PAX, Number(passengers.adult) || 0);
  }
  return MAX_PAX;
}

export function clampPassengerCounts(
  passengers: PassengerCounts,
): PassengerCounts {
  const next: PassengerCounts = { ...DEFAULT_PASSENGERS, ...passengers };
  PASSENGER_KEYS.forEach((key) => {
    const min = paxFloor(key);
    const max = key === "infant" ? Math.min(MAX_PAX, next.adult) : MAX_PAX;
    next[key] = Math.min(max, Math.max(min, Number(next[key]) || 0));
  });
  if (next.infant > next.adult) next.infant = next.adult;
  return next;
}

export function cabinRule(cabin: Cabin) {
  return CABIN_BAGGAGE[cabin] ?? CABIN_BAGGAGE.Economy;
}

export function extraBaggageCost(extraKg: number): number {
  return extraKg * EXTRA_KG_RATE;
}

export function clampExtraKg(extraKg: number): number {
  return Math.min(MAX_EXTRA_KG, Math.max(0, Math.round(extraKg)));
}

export function includedKg(cabin: Cabin, travelers: number): number {
  return cabinRule(cabin).checked * travelers;
}

export function fareFor(baseFare: number, cabin: Cabin): number {
  return Math.round(baseFare * CABIN_MULTIPLIER[cabin]);
}

export function subtotalFor(fare: number, travelers: number): number {
  return fare * travelers;
}

export function grandTotalFor(
  fare: number,
  travelers: number,
  extraCost: number,
): number {
  return subtotalFor(fare, travelers) + extraCost;
}

export function makeBaggage(
  cabin: Cabin,
  passengers: PassengerCounts,
  extraKg: number,
): Baggage {
  const travelers = totalTravelers(passengers);
  const kg = clampExtraKg(extraKg);
  return {
    extraKg: kg,
    cost: extraBaggageCost(kg),
    rate: EXTRA_KG_RATE,
    includedKg: includedKg(cabin, travelers),
  };
}

export { EXTRA_KG_RATE, EXTRA_KG_STEP };
