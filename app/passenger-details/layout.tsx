import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passenger Details",
  description:
    "Review your itinerary and enter the contact details for your AEROVIA booking.",
  openGraph: {
    title: "Passenger Details | AEROVIA",
    description:
      "Review your itinerary and enter the contact details for your AEROVIA booking.",
  },
};

export default function PassengerDetailsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}