import { ImageResponse } from "next/og";
import { OgCard } from "@/components/seo/OgCard";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AEROVIA | More Than A Destination";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="More than a destination"
        title="Everyday fares. Farther possibilities."
        subtitle="Simple flights from the Philippines to the places you want to go."
      />
    ),
    size,
  );
}
