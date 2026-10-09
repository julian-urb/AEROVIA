import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your AEROVIA booking is confirmed. Review your itinerary.",
  alternates: { canonical: "/confirmation" },
  robots: { index: false },
  openGraph: {
    title: "Booking Confirmed | AEROVIA",
    description: "Your AEROVIA booking is confirmed. Review your itinerary.",
  },
};

export default function ConfirmationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
