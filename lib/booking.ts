import { DEFAULT_CONTACT, DEFAULT_PASSENGERS } from "./constants";
import { describePassengers } from "./format";
import {
  cabinRule,
  grandTotalFor,
  includedKg,
  subtotalFor,
  totalTravelers,
} from "./pricing";
import { DEFAULT_BAGGAGE } from "./storage";
import type { Booking, Contact, PassengerCounts } from "./types";

export function contactName(contact: Contact): string {
  return [contact.firstName, contact.lastName]
    .map((part) => String(part || "").trim())
    .filter(Boolean)
    .join(" ");
}

export function generateReference(): string {
  return `AER${Math.floor(100000 + Math.random() * 900000)}`;
}

export type BookingView = {
  passengers: PassengerCounts;
  travelers: number;
  rule: { checked: number; carryOn: number };
  baggage: { extraKg: number; cost: number; rate: number; includedKg: number };
  extraCost: number;
  subtotal: number;
  total: number;
  includedKg: number;
  dates: string;
  contact: Contact;
};

export function bookingView(booking: Booking): BookingView {
  const passengers: PassengerCounts = {
    ...DEFAULT_PASSENGERS,
    ...booking.passengers,
  };
  const travelers = booking.travelers || totalTravelers(passengers);
  const rule = cabinRule(booking.cabin);
  const baggage = { ...DEFAULT_BAGGAGE, ...booking.baggage };
  const extraCost = Number(baggage.cost) || 0;
  const subtotal = subtotalFor(Number(booking.fare || 0), travelers);
  const total = booking.total || grandTotalFor(Number(booking.fare || 0), travelers, extraCost);
  const included = baggage.includedKg || includedKg(booking.cabin, travelers);
  const dates =
    booking.tripType === "one"
      ? booking.depart || "Flexible dates"
      : `${booking.depart || "Flexible dates"} to ${
          booking.returning || "Flexible return"
        }`;

  return {
    passengers,
    travelers,
    rule,
    baggage,
    extraCost,
    subtotal,
    total,
    includedKg: included,
    dates,
    contact: { ...DEFAULT_CONTACT, ...booking.contact },
  };
}

export function baggageSentence(view: BookingView): string {
  const base = `${view.rule.checked} kg checked and ${view.rule.carryOn} kg carry-on per traveler, ${view.includedKg} kg included`;
  return view.extraCost
    ? `${base} | +${view.baggage.extraKg} kg extra baggage, PHP ${view.extraCost.toLocaleString()}`
    : base;
}

export function itineraryLines(booking: Booking): string[] {
  const view = bookingView(booking);
  const lines: string[] = [
    `${booking.from} to ${booking.to}`,
    `${booking.depart || "Flexible dates"} | ${booking.time || "Flexible dates"}`,
    `PHP ${Number(booking.fare || 0).toLocaleString()} per traveler | ${booking.cabin}`,
    `${view.travelers} traveler${view.travelers > 1 ? "s" : ""}: ${describePassengers(
      view.passengers,
    )}`,
    baggageSentence(view),
  ];

  if (view.extraCost) {
    lines.push(
      `Extra checked baggage ${view.baggage.extraKg} kg: PHP ${view.extraCost.toLocaleString()}`,
    );
  }
  lines.push(
    view.extraCost
      ? `PHP ${view.subtotal.toLocaleString()} fare + PHP ${view.extraCost.toLocaleString()} baggage = PHP ${view.total.toLocaleString()} total`
      : `PHP ${view.total.toLocaleString()} total`,
  );
  if (contactName(view.contact)) {
    lines.push(`Lead passenger: ${contactName(view.contact)}`);
  }
  if (view.contact.email) lines.push(`Email: ${view.contact.email}`);
  if (view.contact.phone) lines.push(`Phone: ${view.contact.phone}`);
  return lines;
}
