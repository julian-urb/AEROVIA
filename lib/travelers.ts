import { PASSENGER_TYPES } from "./constants";
import { PASSENGER_KEYS } from "./types";
import type { PassengerCounts, PassengerKey, TravelerDetail } from "./types";

const TYPE_ORDER: PassengerKey[] = [...PASSENGER_KEYS];

export function travelerTypeLabel(type: PassengerKey): string {
  return PASSENGER_TYPES.find((entry) => entry.key === type)?.label ?? type;
}

export function emptyTravelerDetails(
  passengers: PassengerCounts,
  existing: TravelerDetail[] = [],
): TravelerDetail[] {
  const details: TravelerDetail[] = [];
  TYPE_ORDER.forEach((type) => {
    const count = Math.max(0, Number(passengers[type]) || 0);
    const priorOfType = existing.filter((detail) => detail.type === type);
    for (let index = 0; index < count; index += 1) {
      const prior = priorOfType[index];
      details.push({
        type,
        firstName: prior?.firstName ?? "",
        lastName: prior?.lastName ?? "",
      });
    }
  });
  return details;
}

export type TravelerError = {
  index: number;
  field: "firstName" | "lastName";
  message: string;
};

export function validateTravelerDetails(
  details: TravelerDetail[],
): TravelerError[] {
  const errors: TravelerError[] = [];
  details.forEach((detail, index) => {
    if (!detail.firstName.trim()) {
      errors.push({
        index,
        field: "firstName",
        message: "Enter a first name.",
      });
    }
    if (!detail.lastName.trim()) {
      errors.push({ index, field: "lastName", message: "Enter a last name." });
    }
  });
  return errors;
}

export function travelerSummary(details: TravelerDetail[]): string {
  return details
    .map((detail) => `${detail.firstName} ${detail.lastName}`.trim())
    .join(", ");
}
