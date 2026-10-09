import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
  description: "Review your fare and complete your AEROVIA booking.",
  alternates: { canonical: "/payment" },
  robots: { index: false },
  openGraph: {
    title: "Payment | AEROVIA",
    description: "Review your fare and complete your AEROVIA booking.",
  },
};

export default function PaymentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
