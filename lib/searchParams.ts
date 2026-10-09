import {
  clampExtraKg,
  clampPassengerCounts,
  makeBaggage,
} from "./pricing";
import { CABINS } from "./types";
import type { Cabin, PassengerCounts, SearchState, TripType } from "./types";

const PAX_PARAM: Record<keyof PassengerCounts, string> = {
  adult: "adults",
  child: "children",
  infant: "infants",
  senior: "seniors",
  pwd: "pwd",
  ofw: "ofw",
};

export function searchToQuery(search: SearchState): string {
  const params = new URLSearchParams();
  if (search.from) params.set("from", search.from);
  if (search.to) params.set("to", search.to);
  if (search.depart) params.set("depart", search.depart);
  if (search.returning) params.set("return", search.returning);
  params.set("trip", search.tripType);
  params.set("cabin", search.cabin);
  (Object.keys(PAX_PARAM) as (keyof PassengerCounts)[]).forEach((key) => {
    const value = Number(search.passengers[key]) || 0;
    if (value > 0) params.set(PAX_PARAM[key], String(value));
  });
  if (search.baggage.extraKg > 0) {
    params.set("bags", String(search.baggage.extraKg));
  }
  return params.toString();
}

function parseIntOr(value: string | null, fallback: number): number {
  if (value === null) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function hasSearchParams(params: URLSearchParams): boolean {
  return ["from", "to", "depart", "return", "trip", "cabin", ...Object.values(PAX_PARAM), "bags"].some(
    (key) => params.has(key),
  );
}

export function queryToSearch(
  input: string | URLSearchParams,
  base: SearchState,
): SearchState {
  const params =
    typeof input === "string" ? new URLSearchParams(input) : input;

  const cabinParam = params.get("cabin");
  const cabin: Cabin = CABINS.includes(cabinParam as Cabin)
    ? (cabinParam as Cabin)
    : base.cabin;

  const tripParam = params.get("trip");
  const tripType: TripType = tripParam === "one" ? "one" : "round";

  const passengers = clampPassengerCounts({
    adult: parseIntOr(params.get("adults"), base.passengers.adult),
    child: parseIntOr(params.get("children"), base.passengers.child),
    infant: parseIntOr(params.get("infants"), base.passengers.infant),
    senior: parseIntOr(params.get("seniors"), base.passengers.senior),
    pwd: parseIntOr(params.get("pwd"), base.passengers.pwd),
    ofw: parseIntOr(params.get("ofw"), base.passengers.ofw),
  });

  const extraKg = clampExtraKg(parseIntOr(params.get("bags"), base.baggage.extraKg));
  const from = params.get("from") || base.from;
  const to = params.get("to") || base.to;
  const depart = params.get("depart") ?? base.depart;
  const returning = tripType === "one" ? "" : params.get("return") ?? base.returning;

  return {
    from,
    to,
    depart,
    returning,
    cabin,
    passengers,
    baggage: makeBaggage(cabin, passengers, extraKg),
    tripType,
  };
}
