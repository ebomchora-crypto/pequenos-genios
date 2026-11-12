import { ImageResponse } from "next/og";

export const alt = "ABA e Autismo na Prática — curso livre online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#ffffff" }}>
        <div style={{ display: "flex", height: 16 }}>
          {["#7c3aed", "#ffc928", "#0756b8", "#08b8b3", "#15803d"].map((c) => (
            <div key={c} style={{ flex: 1, background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", background: "#eef5fe" }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, color: "#0756b8", fontWeight: 800 }}>CURSO LIVRE ONLINE</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, lineHeight: 1.02, marginTop: 20, color: "#053f87" }}>ABA e Autismo</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, lineHeight: 1.02, color: "#7c3aed" }}>na Prática</div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 26, color: "#4a5672", maxWidth: 820 }}>
            Para pais, professores e cuidadores: comunicação, autonomia e aprendizagem com respeito.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
