import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Actaer - Software Products & AI Consulting";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        padding: 96,
      }}
    >
      {/* Flat blue accent bar */}
      <div
        style={{
          width: 120,
          height: 12,
          backgroundColor: "#0f62fe",
          marginBottom: 48,
        }}
      />
      <div
        style={{
          fontSize: 112,
          fontWeight: 300,
          color: "#161616",
          letterSpacing: "-0.02em",
          marginBottom: 24,
        }}
      >
        Actaer
      </div>
      <div
        style={{
          fontSize: 36,
          color: "#525252",
        }}
      >
        Software Products &amp; AI Consulting
      </div>
    </div>,
    {
      ...size,
    },
  );
}
