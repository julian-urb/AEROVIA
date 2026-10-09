import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ServiceWorkerRegister } from "@/components/site/ServiceWorkerRegister";
import { ToastProvider } from "@/components/site/ToastProvider";
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AEROVIA | More Than A Destination",
    template: "%s | AEROVIA",
  },
  description: "AEROVIA makes flying simple, modern, and affordable.",
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: "AEROVIA | More Than A Destination",
    description: "AEROVIA makes flying simple, modern, and affordable.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07356b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ToastProvider>
          <Header />
          {children}
          <Footer />
        </ToastProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
