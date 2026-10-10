import { ImageResponse } from "next/og";
export const alt =
  "Shicheng Hu — intelligent agents, human behavior, and complex systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#fcfbf8",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "90px",
        color: "#292d29",
      }}
    >
      <div style={{ fontSize: 20, color: "#285946", letterSpacing: 3 }}>
        COMPUTER SCIENCE · UIUC
      </div>
      <div style={{ fontFamily: "serif", fontSize: 88, marginTop: 58 }}>
        Shicheng Hu.
      </div>
      <div
        style={{
          fontSize: 32,
          lineHeight: 1.5,
          maxWidth: 840,
          marginTop: 28,
          color: "#285946",
        }}
      >
        Exploring intelligent agents, human behavior, and complex systems.
      </div>
      <div style={{ borderBottom: "1px solid #bfc9bd", marginTop: 60 }} />
    </div>,
    size,
  );
}
