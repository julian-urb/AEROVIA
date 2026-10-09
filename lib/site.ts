const FALLBACK_SITE_URL = "https://aerovia.example.com";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = raw && raw.length > 0 ? raw : FALLBACK_SITE_URL;
  return value.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "AEROVIA";

export function absoluteUrl(path: string): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${suffix}`;
}

export const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/destinations", priority: 0.8 },
  { path: "/travel-info", priority: 0.6 },
  { path: "/manage", priority: 0.5 },
  { path: "/results", priority: 0.2 },
  { path: "/passenger-details", priority: 0.2 },
  { path: "/passengers", priority: 0.2 },
  { path: "/seats", priority: 0.2 },
  { path: "/payment", priority: 0.2 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
] as const;
