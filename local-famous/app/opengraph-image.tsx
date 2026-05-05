import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Local Famous — The people, places, drama, and businesses everyone is talking about.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(ellipse at top left, #FBE9DD 0%, #F5F1E8 60%)",
          padding: 72,
          fontFamily: "Georgia, serif",
          color: "#161412",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5A554D",
          }}
        >
          Local Famous · Vol. 03 · Issue 47
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 80,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              maxWidth: 1040,
            }}
          >
            The people, places,{" "}
            <span style={{ fontStyle: "italic", color: "#E84628" }}>drama</span>,
            and businesses everyone is talking about.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 16,
            color: "#5A554D",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>localfamous.fm</span>
          <span>New every Tuesday</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
