import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #07356b 0%, #1263b4 100%)",
          color: "#ffffff",
          fontSize: 92,
          fontWeight: 800,
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        A
      </div>
    ),
    size,
  );
}
