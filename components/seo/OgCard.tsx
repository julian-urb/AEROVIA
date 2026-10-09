import { SITE_NAME } from "@/lib/site";

export type OgCardProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
};

export function OgCard({ title, eyebrow, subtitle }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #07356b 0%, #1263b4 100%)",
        color: "#ffffff",
        padding: "72px",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#ffb000",
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#d9edff",
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 34,
          fontWeight: 700,
        }}
      >
        <span>{SITE_NAME}</span>
        <span style={{ color: "#ffb000" }}>Fly simple.</span>
      </div>
    </div>
  );
}
