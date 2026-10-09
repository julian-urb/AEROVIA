import { describe, expect, it } from "vitest";
import {
  CONTACT_FIELDS,
  REACHABLE_FIELDS,
  validateContact,
} from "./validation";

const valid = {
  firstName: "Maria",
  lastName: "Santos",
  email: "maria@example.com",
  phone: "+63 917 000 0000",
};

describe("validateContact", () => {
  it("accepts a complete contact", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires a first and last name", () => {
    const errors = validateContact({ ...valid, firstName: "", lastName: "" });
    expect(Object.keys(errors)).toContain("firstName");
    expect(Object.keys(errors)).toContain("lastName");
  });

  it("rejects a malformed email", () => {
    const errors = validateContact({ ...valid, email: "nope" });
    expect(errors.email).toBeDefined();
  });

  it("rejects a too-short phone number", () => {
    const errors = validateContact({ ...valid, phone: "123" });
    expect(errors.phone).toBeDefined();
  });

  it("only checks reachable fields when limited", () => {
    const errors = validateContact({ ...valid, firstName: "" }, REACHABLE_FIELDS);
    expect(errors).toEqual({});
  });

  it("enumerates four contact fields", () => {
    expect(CONTACT_FIELDS).toHaveLength(4);
  });
});
