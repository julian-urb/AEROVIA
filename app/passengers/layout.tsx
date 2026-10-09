import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passenger Details",
  description: "Enter the name of every traveler on your AEROVIA booking.",
  alternates: { canonical: "/passengers" },
  robots: { index: false },
  openGraph: {
    title: "Passengers | AEROVIA",
    description: "Enter the name of every traveler on your AEROVIA booking.",
  },
};

export default function PassengersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
