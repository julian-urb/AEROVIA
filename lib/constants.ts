import type { Cabin, PassengerCounts, PassengerKey } from "./types";

export const MAX_PAX = 9;
export const EXTRA_KG_RATE = 300;
export const EXTRA_KG_STEP = 5;
export const MAX_EXTRA_KG = 60;

export const TAX_RATE = 0.12;
export const FEES_PER_TRAVELER = 550;

export const SEAT_ROWS = 18;
export const SEAT_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

// Deterministic "already taken" seats so the demo is stable between renders.
export const OCCUPIED_SEATS = [
  "1A",
  "1B",
  "2C",
  "3D",
  "6A",
  "6B",
  "7E",
  "11F",
  "12A",
  "14C",
] as const;

export type Promo = {
  code: string;
  percent: number;
  label: string;
};

export const PROMOS: Promo[] = [
  { code: "AEROVIA10", percent: 0.1, label: "10% off your fare" },
  { code: "FLY5", percent: 0.05, label: "5% off your fare" },
];

export const PAYMENT_DEMO_NOTICE =
  "Demo checkout: no real payment is taken and no card details are stored.";

export const CABIN_BAGGAGE: Record<
  Cabin,
  { checked: number; carryOn: number }
> = {
  Economy: { checked: 20, carryOn: 7 },
  Comfort: { checked: 25, carryOn: 10 },
  Business: { checked: 30, carryOn: 12 },
};

export const CABIN_MULTIPLIER: Record<Cabin, number> = {
  Economy: 1,
  Comfort: 1.45,
  Business: 2.45,
};

export type PassengerType = {
  key: PassengerKey;
  label: string;
  hint: string;
  min: number;
};

export const PASSENGER_TYPES: PassengerType[] = [
  { key: "adult", label: "Adult", hint: "12y and above", min: 1 },
  { key: "child", label: "Child", hint: "2y \u2013 11y", min: 0 },
  { key: "infant", label: "Infant", hint: "16d \u2013 23m", min: 0 },
  {
    key: "senior",
    label: "Senior Citizen",
    hint: "60y and above",
    min: 0,
  },
  {
    key: "pwd",
    label: "Person with Disability",
    hint: "Additional assistance available",
    min: 0,
  },
  {
    key: "ofw",
    label: "Overseas Filipino Worker",
    hint: "OFW rates on request",
    min: 0,
  },
];

export const DEFAULT_PASSENGERS: PassengerCounts = {
  adult: 1,
  child: 0,
  infant: 0,
  senior: 0,
  pwd: 0,
  ofw: 0,
};

export const DEFAULT_CONTACT = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const SEARCH_KEY = "aeroviaSearch";
export const BOOKING_KEY = "aeroviaBooking";
export const BOOKINGS_KEY = "aeroviaBookings";
