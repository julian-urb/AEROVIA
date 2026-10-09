import { PASSENGER_TYPES } from "./constants";
import type { PassengerCounts } from "./types";

export function peso(amount: number): string {
  return `PHP ${Math.round(amount).toLocaleString("en-PH")}`;
}

export function describePassengers(passengers: PassengerCounts): string {
  const parts = PASSENGER_TYPES.map((type) => ({
    label: type.label.toLowerCase(),
    count: Number(passengers[type.key]) || 0,
  }))
    .filter((part) => part.count > 0)
    .map((part) => `${part.count} ${part.label}${part.count > 1 ? "s" : ""}`);

  return parts.length ? parts.join(", ") : "no travelers";
}

export function travelerLabel(count: number): string {
  return `${count} traveler${count > 1 ? "s" : ""}`;
}
