import React from "react";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Spring 0→1 iniciando em `at` (frame local). */
export function useIn(at: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config: { damping: 14, stiffness: 140, mass: 0.8, ...cfg } });
}

/** Saída 1→0 entre `from` e `to`. */
export function useOut(from: number, to: number) {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut });
}

/** Vídeo em tela cheia com câmera lenta (push-in/pan) e entrada com zoom + desfoque. */
export const Clip: React.FC<{
  src: string;
  dur: number;
  startFrom?: number;
  zoom?: [number, number];
  pan?: [number, number];
  enter?: "zoom" | "none";
  exitBlur?: boolean;
  blur?: number;
  style?: React.CSSProperties;
}> = ({ src, dur, startFrom = 0, zoom = [1.06, 1.16], pan = [0, 0], enter = "zoom", exitBlur = true, blur = 0, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, dur], [0, 1], { extrapolateRight: "clamp" });
  let scale = interpolate(p, [0, 1], zoom, { easing: Easing.inOut(Easing.sin) });
  const tx = interpolate(p, [0, 1], pan);
  let b = blur;
  if (enter === "zoom") {
    const e = interpolate(frame, [0, 9], [1, 0], { extrapolateRight: "clamp", easing: ease });
    scale += e * 0.14;
    b += e * 14;
  }
  if (exitBlur) {
    const x = interpolate(frame, [dur - 5, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    scale += x * 0.08;
    b += x * 10;
  }
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.blueDark, ...style }}>
      <OffthreadVideo
        src={staticFile(`clips/${src}.mp4`)}
        startFrom={startFrom}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale}) translateX(${tx}px)`, filter: b ? `blur(${b}px)` : undefined }}
      />
    </AbsoluteFill>
  );
};

export const Shade: React.FC<{ from?: string; to?: string; top?: number; bottom?: number }> = ({ from = "rgba(5,26,62,0.85)", top = 0.0, bottom = 0.0 }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(to top, ${from} 0%, rgba(5,26,62,${0.55 + bottom}) 22%, rgba(5,26,62,0) 55%), linear-gradient(to bottom, rgba(5,26,62,${0.45 + top}) 0%, rgba(5,26,62,0) 22%)`,
    }}
  />
);

export const Vignette: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)" }} />
);

/** Palavra/linha com entrada em spring (subida + escala) e máscara. */
export const Rise: React.FC<{ at: number; children: React.ReactNode; out?: [number, number]; style?: React.CSSProperties; from?: number }> = ({ at, children, out, style, from = 60 }) => {
  const v = useIn(at, { damping: 15, stiffness: 160 });
  const o = useOut(out?.[0] ?? 1e6, out?.[1] ?? 1e6 + 1);
  return (
    <div style={{ overflow: "hidden", paddingBottom: 6, ...style }}>
      <div style={{ transform: `translateY(${(1 - v) * from + (1 - o) * -40}px) scale(${0.92 + 0.08 * v})`, opacity: Math.min(v * 1.4, 1) * o, transformOrigin: "left bottom" }}>
        {children}
      </div>
    </div>
  );
};

/** Texto sobre um bloco de cor que se revela da esquerda para a direita. */
export const Highlight: React.FC<{ at: number; bg: string; color: string; children: React.ReactNode; size: number; out?: [number, number]; rotate?: number }> = ({ at, bg, color, children, size, out, rotate = -2 }) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [at, at + 10], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const t = useIn(at + 4, { damping: 13 });
  const o = useOut(out?.[0] ?? 1e6, out?.[1] ?? 1e6 + 1);
  return (
    <div style={{ position: "relative", display: "inline-block", transform: `rotate(${rotate}deg) scale(${0.9 + 0.1 * t})`, opacity: o }}>
      <div style={{ position: "absolute", inset: "0 -18px", background: bg, borderRadius: 22, clipPath: `inset(0 ${100 - w}% 0 0 round 22px)`, boxShadow: "0 18px 40px -12px rgba(0,0,0,0.45)" }} />
      <span style={{ position: "relative", fontFamily: FONT, fontWeight: 900, fontSize: size, color, letterSpacing: -1, lineHeight: 1.15, opacity: t, padding: "0 4px", display: "inline-block" }}>
        {children}
      </span>
    </div>
  );
};

export const Sparkle: React.FC<{ at: number; x: number; y: number; size?: number; color?: string; rot?: number }> = ({ at, x, y, size = 90, color = C.yellow, rot = 0 }) => {
  const frame = useCurrentFrame();
  const d = interpolate(frame, [at, at + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg) scale(${0.6 + 0.4 * d})`, opacity: d }}>
      {["M24 4v12", "M6 15l9 7", "M42 15l-9 7"].map((p) => (
        <path key={p} d={p} stroke={color} strokeWidth={5} strokeLinecap="round" fill="none" strokeDasharray={20} strokeDashoffset={20 - 20 * d} />
      ))}
    </svg>
  );
};

export const Rings: React.FC<{ at: number; x: number; y: number; color?: string; size?: number }> = ({ at, x, y, color = C.yellow, size = 300 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {[0, 6].map((delay) => {
        const p = interpolate(frame, [at + delay, at + delay + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        return (
          <div
            key={delay}
            style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: "50%", border: `6px solid ${color}`, transform: `scale(${0.3 + p * 1.2})`, opacity: p > 0 ? 1 - p : 0 }}
          />
        );
      })}
    </>
  );
};

/** Faixa diagonal colorida que cruza a tela, usada como transição com máscara. */
export const Wipe: React.FC<{ at: number; colors?: string[]; dur?: number }> = ({ at, colors = [C.teal, C.blue], dur = 16 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {colors.map((c, i) => {
        const p = interpolate(frame, [at + i * 2, at + dur + i * 2], [-1.4, 1.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut });
        if (p <= -1.4 || p >= 1.4) return null;
        const x = p * 2200;
        return (
          <div key={c} style={{ position: "absolute", left: x - 660, top: -500, width: 2400, height: 2900, background: c, transform: "rotate(18deg)" }} />
        );
      })}
    </AbsoluteFill>
  );
};

const iconPaths: Record<string, React.ReactNode> = {
  chat: <><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /><path d="M8 10h8M8 13h5" /></>,
  hands: <><path d="M12 20s-7-4.3-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5C19 15.7 12 20 12 20z" /><path d="M9.5 12.5h5M12 10v5" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8M8 11h6" /></>,
  screen: <><rect x="3" y="4" width="18" height="12" rx="2.5" /><path d="m10.5 8 3.5 2-3.5 2zM8 20h8M12 16v4" /></>,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" /></>,
  check: <><path d="m5 12.5 4.5 4.5L19 7.5" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0M16 5.2a3 3 0 0 1 0 5.6M18 20a5 5 0 0 0-2.5-4.3" /></>,
};

export const Icon: React.FC<{ name: keyof typeof iconPaths | string; size: number; color: string; stroke?: number }> = ({ name, size, color, stroke = 2.2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {iconPaths[name]}
  </svg>
);

/** Capa do produto desenhada em código, na identidade visual do site. */
export const Cover: React.FC<{ width?: number }> = ({ width = 600 }) => {
  const s = width / 600;
  return (
    <div style={{ width, height: 800 * s, borderRadius: 34 * s, overflow: "hidden", background: "#fff", position: "relative", fontFamily: FONT, boxShadow: `0 ${40 * s}px ${80 * s}px -${20 * s}px rgba(0,0,0,0.55)` }}>
      <div style={{ display: "flex", height: 16 * s }}>
        {[C.purple, C.yellow, C.blue, C.teal, C.green].map((c) => (
          <div key={c} style={{ flex: 1, background: c }} />
        ))}
      </div>
      <div style={{ position: "absolute", right: -120 * s, top: -60 * s, width: 380 * s, height: 380 * s, borderRadius: "50%", background: "rgba(8,184,179,0.18)" }} />
      <div style={{ position: "absolute", left: -140 * s, bottom: -120 * s, width: 420 * s, height: 420 * s, borderRadius: "50%", background: "rgba(124,58,237,0.12)" }} />
      <div style={{ position: "relative", padding: `${50 * s}px ${46 * s}px` }}>
        <div style={{ display: "inline-block", border: `${4 * s}px solid rgba(7,86,184,0.25)`, borderRadius: 999, padding: `${8 * s}px ${22 * s}px`, color: C.blue, fontWeight: 900, fontSize: 22 * s, letterSpacing: 3 * s }}>
          CURSO LIVRE ONLINE
        </div>
        <div style={{ marginTop: 34 * s, color: C.blueDark, fontWeight: 900, fontSize: 92 * s, lineHeight: 0.98, letterSpacing: -2 * s }}>
          ABA e<br />Autismo
        </div>
        <div style={{ color: C.purple, fontWeight: 900, fontSize: 92 * s, lineHeight: 1.05, letterSpacing: -2 * s }}>na Prática</div>
        <svg width={360 * s} height={22 * s} viewBox="0 0 200 12" preserveAspectRatio="none" style={{ display: "block", marginTop: 4 * s }}>
          <path d="M3 9c40-6 120-8 194-3" fill="none" stroke={C.yellow} strokeWidth="6" strokeLinecap="round" />
        </svg>
        <div style={{ marginTop: 26 * s, color: "#4A5672", fontWeight: 700, fontSize: 28 * s, lineHeight: 1.3 }}>
          Fundamentos, ética, comunicação e apoio educacional respeitoso.
        </div>
      </div>
      <div style={{ position: "absolute", left: 46 * s, right: 46 * s, bottom: 44 * s, display: "flex", gap: 18 * s }}>
        {[
          ["screen", C.blue],
          ["chat", C.purple],
          ["hands", C.teal],
          ["book", C.yellow],
        ].map(([n, c]) => (
          <div key={n} style={{ width: 92 * s, height: 92 * s, borderRadius: 24 * s, background: c, display: "grid", placeItems: "center" }}>
            <Icon name={n} size={52 * s} color={c === C.yellow ? C.ink : "#fff"} />
          </div>
        ))}
      </div>
    </div>
  );
};

/** Selo de preço com borda ondulada. */
export const Seal: React.FC<{ size: number; children: React.ReactNode }> = ({ size, children }) => {
  const bumps = 18;
  const pts: string[] = [];
  for (let i = 0; i <= bumps * 2; i++) {
    const a = (Math.PI * i) / bumps - Math.PI / 2;
    const r = i % 2 === 0 ? 50 : 46;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return (
    <div style={{ width: size, height: size, position: "relative", display: "grid", placeItems: "center" }}>
      <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, filter: "drop-shadow(0 18px 30px rgba(40,10,90,0.55))" }}>
        <polygon points={pts.join(" ")} fill={C.purple} />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="1.2" strokeDasharray="2 3" />
      </svg>
      <div style={{ position: "relative", textAlign: "center", color: "#fff", fontFamily: FONT }}>{children}</div>
    </div>
  );
};

/** Cursor de mão (indicativo, sem simular funcionalidade). */
export const Cursor: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.4))" }}>
    <path
      d="M11 3.5a2 2 0 0 1 4 0v9.2l.6-.1a2 2 0 0 1 2.4 1.5l.1.4.5-.1a2 2 0 0 1 2.4 1.5l.1.5.3-.1a2 2 0 0 1 2.5 1.6l.9 5.3c.3 2-.3 4-1.7 5.4l-.9.9a3 3 0 0 1-2.1.9h-6.2a3 3 0 0 1-2.4-1.2l-5.6-7.4a2 2 0 0 1 2.9-2.7l1.9 1.7z"
      fill="#fff"
      stroke={C.ink}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const Txt: React.FC<{ size: number; color?: string; weight?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ size, color = "#fff", weight = 900, children, style }) => (
  <div style={{ fontFamily: FONT, fontSize: size, fontWeight: weight, color, lineHeight: 1.08, letterSpacing: size > 80 ? -1.5 : -0.5, textShadow: color === "#fff" ? "0 4px 18px rgba(0,0,0,0.35)" : undefined, ...style }}>
    {children}
  </div>
);
