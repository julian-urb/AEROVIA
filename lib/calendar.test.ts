import { describe, expect, it } from "vitest";
import { buildICS } from "./calendar";
import type { Booking } from "./types";

const booking: Booking = {
  from: "Manila (MNL)",
  to: "Tokyo (NRT)",
  depart: "2026-12-01",
  returning: "2026-12-08",
  cabin: "Economy",
  passengers: { adult: 1, child: 0, infant: 0, senior: 0, pwd: 0, ofw: 0 },
  baggage: { extraKg: 0, cost: 0, rate: 300, includedKg: 20 },
  tripType: "round",
  contact: { firstName: "Maria", lastName: "Santos", email: "m@example.com", phone: "1" },
  travelers: 1,
  fare: 8990,
  total: 8990,
  time: "6:15 AM - 11:25 AM",
  reference: "AER123456",
};

describe("buildICS", () => {
  it("produces a valid calendar envelope", () => {
    const ics = buildICS(booking);
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("END:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("AER123456");
  });

  it("parses the departure time into DTSTART", () => {
    const ics = buildICS(booking);
    expect(ics).toContain("DTSTART:20261201T061500");
  });
});
