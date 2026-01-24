import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Actaer - Software Development & IT Consulting";
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(ellipse at top right, rgba(124, 58, 237, 0.3), transparent 50%)",
      }}
    >
      {/* Logo text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            background: "linear-gradient(to right, #7c3aed, #a855f7, #ec4899)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
          }}
        >
          ACTAER
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Software Development & IT Consulting
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#71717a",
            marginTop: 30,
          }}
        >
          Your Success, Engineered
        </div>
      </div>

      {/* Border gradient effect */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(to right, #7c3aed, #a855f7, #ec4899)",
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
