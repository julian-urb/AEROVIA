import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose Seats",
  description: "Pick a seat for each traveler on your AEROVIA booking.",
  alternates: { canonical: "/seats" },
  robots: { index: false },
  openGraph: {
    title: "Choose Seats | AEROVIA",
    description: "Pick a seat for each traveler on your AEROVIA booking.",
  },
};

export default function SeatsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
