import { ImageResponse } from "next/og";
import { OgCard } from "@/components/seo/OgCard";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Destinations | AEROVIA";

export default function DestinationsOpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="AEROVIA network"
        title="Find your next favorite place."
        subtitle="City breaks, beach escapes, and long-haul adventures."
      />
    ),
    size,
  );
}
