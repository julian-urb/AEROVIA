export const SITE_URL = "https://aerovia.example.com";

export const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/destinations", priority: 0.8 },
  { path: "/travel-info", priority: 0.6 },
  { path: "/manage", priority: 0.5 },
  { path: "/results", priority: 0.2 },
  { path: "/passenger-details", priority: 0.2 },
] as const;
