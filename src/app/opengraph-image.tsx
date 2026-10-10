import { ImageResponse } from "next/og";
export const dynamic = "force-static"; 
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
      <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 20, color: "#285946", letterSpacing: 3 }}>
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none"><path d="M14 7C4 3 2 15 10 16C19 17 16 29 5 25M21 6V26M28 6V26M18 16H28" stroke="#285946" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
