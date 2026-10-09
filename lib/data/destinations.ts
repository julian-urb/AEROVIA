import type { Destination } from "../types";

export const DESTINATIONS: Destination[] = [
  {
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    tag: "City break",
    price: 8990,
    image: "/assets/tokyo.jpg",
  },
  {
    slug: "singapore",
    city: "Singapore",
    country: "Singapore",
    region: "Asia",
    tag: "Weekend",
    price: 6450,
    image: "/assets/singapore.jpg",
  },
  {
    slug: "cebu",
    city: "Cebu",
    country: "Philippines",
    region: "Philippines",
    tag: "Beach",
    price: 1799,
    image: "/assets/cebu.jpg",
  },
  {
    slug: "seoul",
    city: "Seoul",
    country: "South Korea",
    region: "Asia",
    tag: "Culture",
    price: 7850,
    image: "/assets/korea.jpg",
  },
  {
    slug: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    region: "Asia",
    tag: "Food",
    price: 5990,
    image: "/assets/thailand.jpg",
  },
  {
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    tag: "Long haul",
    price: 17450,
    image: "/assets/dubai.jpg",
  },
];

export const POPULAR_DESTINATIONS = DESTINATIONS.filter((d) =>
  ["tokyo", "singapore", "cebu"].includes(d.slug),
);
