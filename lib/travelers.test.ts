import { describe, expect, it } from "vitest";
import { emptyTravelerDetails, validateTravelerDetails } from "./travelers";
import type { TravelerDetail } from "./types";

describe("emptyTravelerDetails", () => {
  it("creates one row per passenger", () => {
    const details = emptyTravelerDetails({
      adult: 2,
      child: 1,
      infant: 0,
      senior: 0,
      pwd: 0,
      ofw: 0,
    });
    expect(details).toHaveLength(3);
    expect(details.map((d) => d.type)).toEqual(["adult", "adult", "child"]);
  });

  it("preserves existing names by type and index", () => {
    const existing: TravelerDetail[] = [
      { type: "adult", firstName: "Maria", lastName: "Santos" },
    ];
    const details = emptyTravelerDetails({ ...empty(), adult: 2 }, existing);
    expect(details[0].firstName).toBe("Maria");
    expect(details[1].firstName).toBe("");
  });
});

describe("validateTravelerDetails", () => {
  it("flags missing names", () => {
    const errors = validateTravelerDetails([
      { type: "adult", firstName: "Maria", lastName: "" },
    ]);
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe("lastName");
  });

  it("passes when every traveler is named", () => {
    const errors = validateTravelerDetails([
      { type: "adult", firstName: "Maria", lastName: "Santos" },
    ]);
    expect(errors).toEqual([]);
  });
});

function empty() {
  return { adult: 0, child: 0, infant: 0, senior: 0, pwd: 0, ofw: 0 };
}
