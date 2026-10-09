import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Results",
  description:
    "Compare available AEROVIA fares and pick the flight that fits your trip.",
  alternates: { canonical: "/results" },
  openGraph: {
    title: "Flight Results | AEROVIA",
    description:
      "Compare available AEROVIA fares and pick the flight that fits your trip.",
  },
};

export default function ResultsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}