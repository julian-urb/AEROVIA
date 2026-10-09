import type { Destination } from "../types";

export const DESTINATIONS: Destination[] = [
  {
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    airport: "Tokyo (NRT)",
    region: "Asia",
    tag: "City break",
    price: 8990,
    image: "/assets/tokyo.jpg",
    summary:
      "Neon neighborhoods, quiet shrines, and some of the best food anywhere. Tokyo rewards travelers who wander.",
  },
  {
    slug: "singapore",
    city: "Singapore",
    country: "Singapore",
    airport: "Singapore (SIN)",
    region: "Asia",
    tag: "Weekend",
    price: 6450,
    image: "/assets/singapore.jpg",
    summary:
      "A compact, green city-state that is perfect for a long weekend of hawker food, gardens, and skyline views.",
  },
  {
    slug: "cebu",
    city: "Cebu",
    country: "Philippines",
    airport: "Cebu (CEB)",
    region: "Philippines",
    tag: "Beach",
    price: 1799,
    image: "/assets/cebu.jpg",
    summary:
      "White-sand beaches, dive sites, and warm island hospitality make Cebu an easy domestic escape.",
  },
  {
    slug: "seoul",
    city: "Seoul",
    country: "South Korea",
    airport: "Seoul (ICN)",
    region: "Asia",
    tag: "Culture",
    price: 7850,
    image: "/assets/korea.jpg",
    summary:
      "Palaces, markets, and a creative energy that runs from ancient streets to late-night cafes.",
  },
  {
    slug: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    airport: "Bangkok (BKK)",
    region: "Asia",
    tag: "Food",
    price: 5990,
    image: "/assets/thailand.jpg",
    summary:
      "Street food, river temples, and a city that never slows down. Bangkok is a feast for the senses.",
  },
  {
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    airport: "Dubai (DXB)",
    region: "Middle East",
    tag: "Long haul",
    price: 17450,
    image: "/assets/dubai.jpg",
    summary:
      "Desert dunes meet record-breaking skyscrapers in a city built for big, bold travel.",
  },
];

export const POPULAR_DESTINATIONS = DESTINATIONS.filter((d) =>
  ["tokyo", "singapore", "cebu"].includes(d.slug),
);

export function destinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((destination) => destination.slug === slug);
}
