import { ImageResponse } from "next/og";
import { OgCard } from "@/components/seo/OgCard";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Travel Information | AEROVIA";

export default function TravelInfoOpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Travel made clear"
        title="Everything you need before takeoff."
        subtitle="Baggage, check-in, documents, and destination requirements."
      />
    ),
    size,
  );
}
