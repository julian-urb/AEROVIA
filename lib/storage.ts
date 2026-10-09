import {
  BOOKING_KEY,
  DEFAULT_CONTACT,
  DEFAULT_PASSENGERS,
  EXTRA_KG_RATE,
  SEARCH_KEY,
} from "./constants";
import type { Baggage, Booking, Cabin, SearchState, TripType } from "./types";

export const DEFAULT_BAGGAGE: Baggage = {
  extraKg: 0,
  cost: 0,
  rate: EXTRA_KG_RATE,
  includedKg: 0,
};

export const SEARCH_DEFAULTS: SearchState = {
  from: "Manila (MNL)",
  to: "Tokyo (NRT)",
  depart: "",
  returning: "",
  cabin: "Economy",
  passengers: { ...DEFAULT_PASSENGERS },
  baggage: { ...DEFAULT_BAGGAGE },
  tripType: "round",
};

function readJSON(key: string): unknown {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

export function getSearch(): SearchState {
  const saved = asRecord(readJSON(SEARCH_KEY));
  const passengers = asRecord(saved.passengers);
  const baggage = asRecord(saved.baggage);
  return {
    ...SEARCH_DEFAULTS,
    ...saved,
    cabin: (saved.cabin as Cabin) ?? SEARCH_DEFAULTS.cabin,
    tripType: (saved.tripType as TripType) ?? SEARCH_DEFAULTS.tripType,
    passengers: {
      ...DEFAULT_PASSENGERS,
      ...passengers,
    },
    baggage: {
      ...DEFAULT_BAGGAGE,
      ...baggage,
    },
  } as SearchState;
}

export function saveSearch(search: SearchState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SEARCH_KEY, JSON.stringify(search));
}

export function getBooking(): Booking | null {
  const saved = readJSON(BOOKING_KEY);
  if (!saved || typeof saved !== "object") return null;
  const record = saved as Record<string, unknown>;
  if (typeof record.reference !== "string" || !record.reference) return null;
  const passengers = asRecord(record.passengers);
  const baggage = asRecord(record.baggage);
  const contact = asRecord(record.contact);
  return {
    ...SEARCH_DEFAULTS,
    ...record,
    passengers: { ...DEFAULT_PASSENGERS, ...passengers },
    baggage: { ...DEFAULT_BAGGAGE, ...baggage },
    contact: { ...DEFAULT_CONTACT, ...contact },
  } as Booking;
}

export function saveBooking(booking: Booking): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BOOKING_KEY, JSON.stringify(booking));
}

export function clearBooking(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(BOOKING_KEY);
}
