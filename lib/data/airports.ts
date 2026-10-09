import type { Airport } from "../types";

export const AIRPORTS: Airport[] = [
  { code: "MNL", city: "Manila", label: "Manila (MNL)" },
  { code: "CRK", city: "Clark", label: "Clark (CRK)" },
  { code: "CEB", city: "Cebu", label: "Cebu (CEB)" },
  { code: "NRT", city: "Tokyo", label: "Tokyo (NRT)" },
  { code: "SIN", city: "Singapore", label: "Singapore (SIN)" },
  { code: "ICN", city: "Seoul", label: "Seoul (ICN)" },
  { code: "BKK", city: "Bangkok", label: "Bangkok (BKK)" },
  { code: "DXB", city: "Dubai", label: "Dubai (DXB)" },
  { code: "HKG", city: "Hong Kong", label: "Hong Kong (HKG)" },
  { code: "KUL", city: "Kuala Lumpur", label: "Kuala Lumpur (KUL)" },
];

export const ORIGINS = ["Manila (MNL)", "Clark (CRK)", "Cebu (CEB)"] as const;

export const DESTINATIONS = [
  "Tokyo (NRT)",
  "Singapore (SIN)",
  "Seoul (ICN)",
  "Bangkok (BKK)",
  "Dubai (DXB)",
  "Hong Kong (HKG)",
  "Kuala Lumpur (KUL)",
  "Cebu (CEB)",
  "Manila (MNL)",
] as const;

export function cityOf(label: string): string {
  return label.split(" (")[0] ?? label;
}
