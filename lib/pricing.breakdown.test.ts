import { describe, expect, it } from "vitest";
import {
  fareBreakdownFor,
  feesFor,
  findPromo,
  taxesFor,
} from "./pricing";

describe("findPromo", () => {
  it("matches case-insensitively", () => {
    expect(findPromo("aerovia10")?.code).toBe("AEROVIA10");
  });

  it("returns null for unknown codes", () => {
    expect(findPromo("NOPE")).toBeNull();
    expect(findPromo("")).toBeNull();
  });
});

describe("taxesFor / feesFor", () => {
  it("applies a 12% tax", () => {
    expect(taxesFor(10000)).toBe(1200);
  });

  it("charges a fixed fee per traveler", () => {
    expect(feesFor(3)).toBe(1650);
  });
});

describe("fareBreakdownFor", () => {
  it("sums fare, taxes, fees, and baggage", () => {
    const breakdown = fareBreakdownFor(1000, 2, 600);
    expect(breakdown.subtotal).toBe(2000);
    expect(breakdown.taxes).toBe(240);
    expect(breakdown.fees).toBe(1100);
    expect(breakdown.baggage).toBe(600);
    expect(breakdown.discount).toBe(0);
    expect(breakdown.total).toBe(3940);
  });

  it("applies a promo discount to the subtotal", () => {
    const breakdown = fareBreakdownFor(1000, 2, 600, "AEROVIA10");
    expect(breakdown.discount).toBe(200);
    expect(breakdown.total).toBe(3740);
    expect(breakdown.promo).toBe("AEROVIA10");
  });

  it("ignores an invalid promo", () => {
    const breakdown = fareBreakdownFor(1000, 1, 0, "NOPE");
    expect(breakdown.discount).toBe(0);
    expect(breakdown.promo).toBe("");
  });
});
