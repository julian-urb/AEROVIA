import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getBooking,
  getBookingByReference,
  getBookings,
  getSearch,
  saveBooking,
  saveSearch,
} from "./storage";
import type { Booking, SearchState } from "./types";
import { DEFAULT_PASSENGERS } from "./constants";

function memoryStorage() {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
  };
}

const booking: Booking = {
  from: "Manila (MNL)",
  to: "Tokyo (NRT)",
  depart: "2026-12-01",
  returning: "2026-12-08",
  cabin: "Economy",
  passengers: { ...DEFAULT_PASSENGERS },
  baggage: { extraKg: 0, cost: 0, rate: 300, includedKg: 20 },
  tripType: "round",
  contact: { firstName: "Maria", lastName: "Santos", email: "m@example.com", phone: "1" },
  travelers: 1,
  fare: 8990,
  total: 8990,
  time: "6:15 AM",
  reference: "AER111111",
};

beforeEach(() => {
  (globalThis as { window?: unknown }).window = {
    localStorage: memoryStorage(),
  };
});

afterEach(() => {
  delete (globalThis as { window?: unknown }).window;
});

describe("storage", () => {
  it("returns defaults with no saved search", () => {
    expect(getSearch().from).toBe("Manila (MNL)");
  });

  it("round-trips a search", () => {
    const search: SearchState = { ...booking, tripType: "one", returning: "" };
    saveSearch(search);
    expect(getSearch().tripType).toBe("one");
  });

  it("stores multiple bookings and looks them up by reference", () => {
    saveBooking(booking);
    saveBooking({ ...booking, reference: "AER222222" });
    expect(getBookings()).toHaveLength(2);
    expect(getBooking()?.reference).toBe("AER222222");
    expect(getBookingByReference("AER111111")?.reference).toBe("AER111111");
    expect(getBookingByReference("NOPE")).toBeNull();
  });
});
