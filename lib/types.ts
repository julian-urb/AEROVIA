export const PASSENGER_KEYS = [
  "adult",
  "child",
  "infant",
  "senior",
  "pwd",
  "ofw",
] as const;

export type PassengerKey = (typeof PASSENGER_KEYS)[number];

export type PassengerCounts = Record<PassengerKey, number>;

export const CABINS = ["Economy", "Comfort", "Business"] as const;
export type Cabin = (typeof CABINS)[number];

export type TripType = "round" | "one";

export type Baggage = {
  extraKg: number;
  cost: number;
  rate: number;
  includedKg: number;
};

export type SearchState = {
  from: string;
  to: string;
  depart: string;
  returning: string;
  cabin: Cabin;
  passengers: PassengerCounts;
  baggage: Baggage;
  tripType: TripType;
};

export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type Booking = SearchState & {
  contact: Contact;
  travelers: number;
  fare: number;
  total: number;
  time: string;
  reference: string;
};

export type Airport = {
  code: string;
  city: string;
  label: string;
};

export type Flight = {
  id: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  nonstop: boolean;
  baseFare: number;
};

export type Route = {
  from: string;
  to: string;
  flights: Flight[];
};

export type Destination = {
  slug: string;
  city: string;
  country: string;
  region: DestinationRegion;
  tag: string;
  price: number;
  image: string;
};

export const DESTINATION_REGIONS = [
  "Asia",
  "Philippines",
  "Middle East",
] as const;

export type DestinationRegion = (typeof DESTINATION_REGIONS)[number];
