import { describe, expect, it } from "vitest";
import { DEFAULT_PASSENGERS } from "./constants";
import {
  hasSearchParams,
  queryToSearch,
  searchToQuery,
} from "./searchParams";
import type { SearchState } from "./types";

const base: SearchState = {
  from: "Manila (MNL)",
  to: "Tokyo (NRT)",
  depart: "2026-12-01",
  returning: "2026-12-08",
  cabin: "Economy",
  passengers: { ...DEFAULT_PASSENGERS },
  baggage: { extraKg: 0, cost: 0, rate: 300, includedKg: 20 },
  tripType: "round",
};

describe("searchToQuery", () => {
  it("encodes the search state", () => {
    const query = searchToQuery({
      ...base,
      passengers: { ...base.passengers, adult: 2, child: 1 },
      baggage: { extraKg: 10, cost: 3000, rate: 300, includedKg: 60 },
    });
    const params = new URLSearchParams(query);
    expect(params.get("from")).toBe("Manila (MNL)");
    expect(params.get("to")).toBe("Tokyo (NRT)");
    expect(params.get("adults")).toBe("2");
    expect(params.get("children")).toBe("1");
    expect(params.get("bags")).toBe("10");
  });
});

describe("queryToSearch", () => {
  it("round-trips through the query string", () => {
    const original: SearchState = {
      ...base,
      passengers: { ...base.passengers, adult: 2, senior: 1 },
      baggage: { extraKg: 15, cost: 4500, rate: 300, includedKg: 75 },
    };
    const restored = queryToSearch(searchToQuery(original), base);
    expect(restored.from).toBe(original.from);
    expect(restored.to).toBe(original.to);
    expect(restored.passengers.adult).toBe(2);
    expect(restored.passengers.senior).toBe(1);
    expect(restored.baggage.extraKg).toBe(15);
  });

  it("falls back to the provided base for missing values", () => {
    const restored = queryToSearch("cabin=Business", base);
    expect(restored.from).toBe(base.from);
    expect(restored.cabin).toBe("Business");
  });

  it("ignores an invalid cabin", () => {
    const restored = queryToSearch("cabin=First", base);
    expect(restored.cabin).toBe(base.cabin);
  });

  it("forces one-way trips to clear the return date", () => {
    const restored = queryToSearch("trip=one&return=2026-12-08", base);
    expect(restored.tripType).toBe("one");
    expect(restored.returning).toBe("");
  });
});

describe("hasSearchParams", () => {
  it("detects known keys", () => {
    expect(hasSearchParams(new URLSearchParams("to=Tokyo"))).toBe(true);
    expect(hasSearchParams(new URLSearchParams("q=hello"))).toBe(false);
  });
});
