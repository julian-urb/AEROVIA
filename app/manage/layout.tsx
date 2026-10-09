import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Booking",
  description:
    "View your AEROVIA itinerary using your booking reference and last name.",
  alternates: { canonical: "/manage" },
  openGraph: {
    title: "Manage Booking | AEROVIA",
    description:
      "View your AEROVIA itinerary using your booking reference and last name.",
  },
};

export default function ManageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}