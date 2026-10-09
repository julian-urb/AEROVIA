import type { Contact } from "./types";

export type ContactFieldId = "first" | "last" | "email" | "phone";

export type ContactField = {
  key: keyof Contact;
  id: ContactFieldId;
};

export const CONTACT_FIELDS: ContactField[] = [
  { key: "firstName", id: "first" },
  { key: "lastName", id: "last" },
  { key: "email", id: "email" },
  { key: "phone", id: "phone" },
];

export const REACHABLE_FIELDS: ContactField[] = CONTACT_FIELDS.filter(
  (field) => field.key === "email" || field.key === "phone",
);

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactErrors = Partial<Record<keyof Contact, string>>;

export function validateContact(
  contact: Contact,
  fields: ContactField[] = CONTACT_FIELDS,
): ContactErrors {
  const errors: ContactErrors = {};
  const first = String(contact.firstName || "").trim();
  const last = String(contact.lastName || "").trim();
  const email = String(contact.email || "").trim();
  const phone = String(contact.phone || "").trim();
  const wants = (key: keyof Contact) => fields.some((f) => f.key === key);

  if (wants("firstName") && !first) {
    errors.firstName = "Enter the lead passenger's first name.";
  }
  if (wants("lastName") && !last) {
    errors.lastName = "Enter the lead passenger's last name.";
  }
  if (wants("email")) {
    if (!email) {
      errors.email = "Enter an email address for your confirmation.";
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email = "That email address does not look right.";
    }
  }
  if (wants("phone")) {
    if (!phone) {
      errors.phone = "Enter a mobile number we can reach you on.";
    } else if (phone.replace(/\D/g, "").length < 7) {
      errors.phone = "That phone number looks too short.";
    }
  }
  return errors;
}
