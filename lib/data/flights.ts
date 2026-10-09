import type { Flight } from "../types";

type FlightSeed = {
  departTime: string;
  arriveTime: string;
  duration: string;
  baseFare: number;
};

const TIMES: Pick<FlightSeed, "departTime" | "arriveTime">[] = [
  { departTime: "6:15 AM", arriveTime: "11:25 AM" },
  { departTime: "1:45 PM", arriveTime: "6:55 PM" },
  { departTime: "8:20 PM", arriveTime: "1:30 AM" },
];

function build(baseFare: number, duration: string): Flight[] {
  const fares = [baseFare, Math.round(baseFare * 1.08), Math.round(baseFare * 1.15)];
  return TIMES.map((time, index) => ({
    id: `f${index + 1}`,
    departTime: time.departTime,
    arriveTime: time.arriveTime,
    duration,
    nonstop: true,
    baseFare: fares[index] ?? baseFare,
  }));
}

const ROUTES: Record<string, Flight[]> = {
  "Manila (MNL)|Tokyo (NRT)": build(8990, "4h 20m"),
  "Manila (MNL)|Singapore (SIN)": build(6450, "3h 50m"),
  "Manila (MNL)|Seoul (ICN)": build(7850, "4h 05m"),
  "Manila (MNL)|Bangkok (BKK)": build(5990, "3h 30m"),
  "Manila (MNL)|Dubai (DXB)": build(17450, "9h 15m"),
  "Manila (MNL)|Hong Kong (HKG)": build(5200, "2h 15m"),
  "Manila (MNL)|Kuala Lumpur (KUL)": build(6890, "3h 45m"),
  "Manila (MNL)|Cebu (CEB)": build(1799, "1h 25m"),
  "Clark (CRK)|Tokyo (NRT)": build(8450, "4h 15m"),
  "Clark (CRK)|Singapore (SIN)": build(6190, "3h 45m"),
  "Cebu (CEB)|Tokyo (NRT)": build(9290, "4h 30m"),
  "Cebu (CEB)|Singapore (SIN)": build(6690, "3h 55m"),
};

export function getFlights(from: string, to: string): Flight[] {
  const direct = ROUTES[`${from}|${to}`];
  if (direct) return direct;
  const reverse = ROUTES[`${to}|${from}`];
  if (reverse) return reverse;
  return build(7990, "4h 30m");
}
