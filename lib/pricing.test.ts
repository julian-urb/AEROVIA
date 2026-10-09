import { describe, expect, it } from "vitest";
import {
  cabinRule,
  clampExtraKg,
  clampPassengerCounts,
  extraBaggageCost,
  fareFor,
  grandTotalFor,
  includedKg,
  makeBaggage,
  paxFloor,
  paxLimit,
  subtotalFor,
  totalTravelers,
} from "./pricing";
import { DEFAULT_PASSENGERS } from "./constants";

describe("totalTravelers", () => {
  it("sums every passenger type", () => {
    expect(
      totalTravelers({ adult: 1, child: 2, infant: 0, senior: 0, pwd: 0, ofw: 0 }),
    ).toBe(3);
  });

  it("defaults to one traveler", () => {
    expect(totalTravelers(DEFAULT_PASSENGERS)).toBe(1);
  });
});

describe("fareFor", () => {
  it("keeps the base fare for Economy", () => {
    expect(fareFor(8990, "Economy")).toBe(8990);
  });

  it("applies the Comfort multiplier", () => {
    expect(fareFor(8990, "Comfort")).toBe(Math.round(8990 * 1.45));
  });

  it("applies the Business multiplier", () => {
    expect(fareFor(8990, "Business")).toBe(Math.round(8990 * 2.45));
  });
});

describe("baggage", () => {
  it("charges PHP 300 per extra kg", () => {
    expect(extraBaggageCost(10)).toBe(3000);
  });

  it("clamps extra kg between 0 and 60", () => {
    expect(clampExtraKg(-20)).toBe(0);
    expect(clampExtraKg(1000)).toBe(60);
  });

  it("reports included allowance per traveler", () => {
    expect(includedKg("Comfort", 2)).toBe(50);
    expect(cabinRule("Business").carryOn).toBe(12);
  });

  it("builds a baggage record", () => {
    expect(
      makeBaggage(
        "Economy",
        { adult: 2, child: 0, infant: 0, senior: 0, pwd: 0, ofw: 0 },
        10,
      ),
    ).toEqual({ extraKg: 10, cost: 3000, rate: 300, includedKg: 40 });
  });
});

describe("passenger limits", () => {
  it("forces at least one adult", () => {
    const clamped = clampPassengerCounts({
      adult: 0,
      child: 0,
      infant: 0,
      senior: 0,
      pwd: 0,
      ofw: 0,
    });
    expect(clamped.adult).toBe(1);
  });

  it("never lets infants exceed adults", () => {
    const clamped = clampPassengerCounts({
      adult: 1,
      child: 0,
      infant: 5,
      senior: 0,
      pwd: 0,
      ofw: 0,
    });
    expect(clamped.infant).toBe(1);
    expect(paxLimit("infant", clamped)).toBe(1);
  });

  it("has a floor of one adult and zero for others", () => {
    expect(paxFloor("adult")).toBe(1);
    expect(paxFloor("child")).toBe(0);
  });
});

describe("totals", () => {
  it("multiplies fare by travelers and adds baggage", () => {
    expect(subtotalFor(1000, 3)).toBe(3000);
    expect(grandTotalFor(1000, 3, 600)).toBe(3600);
  });
});
