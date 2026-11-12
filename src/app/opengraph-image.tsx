import { ImageResponse } from "next/og";

export const alt = "ABA e Autismo na Prática — curso livre online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b3c49",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#a8dad3", fontWeight: 700 }}>CURSO LIVRE ONLINE</div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>ABA e Autismo na Prática</div>
        <div style={{ fontSize: 36, marginTop: 28, color: "#e0f3f0" }}>
          Fundamentos, ética, comunicação e apoio educacional respeitoso.
        </div>
      </div>
    ),
    size,
  );
}
