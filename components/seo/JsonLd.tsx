import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, static content defined in the app.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon.jpg"),
    email: "support@aerovia.example.com",
    telephone: "+63 2 8000 0000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manila",
      addressCountry: "PH",
    },
    sameAs: [absoluteUrl("/travel-info")],
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/results")}?to={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function flightReservationJsonLd(input: {
  reference: string;
  origin: string;
  destination: string;
  departure: string;
  cabin: string;
  total: number;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FlightReservation",
    reservationNumber: input.reference,
    reservationStatus: "https://schema.org/ReservationConfirmed",
    underName: undefined,
    totalPrice: input.total,
    priceCurrency: "PHP",
    reservationFor: {
      "@type": "Flight",
      flightNumber: input.reference,
      departureAirport: { "@type": "Airport", name: input.origin },
      arrivalAirport: { "@type": "Airport", name: input.destination },
      departureDate: input.departure,
      aircraft: input.cabin,
    },
  };
}
