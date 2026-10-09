import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AEROVIA",
    short_name: "AEROVIA",
    description: "AEROVIA makes flying simple, modern, and affordable.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#07356b",
    icons: [
      {
        src: "/assets/logo.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
