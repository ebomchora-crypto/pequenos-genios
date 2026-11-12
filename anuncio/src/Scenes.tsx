import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "./theme";
import { Clip, Cover, Cursor, ease, Highlight, Icon, Rings, Rise, Seal, Shade, Sparkle, Txt, useIn, Vignette } from "./kit";

const clampOpts = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ---------------- CENA 1 — DOR (0–6 s) ---------------- */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const como = useIn(99, { damping: 8, stiffness: 180, mass: 0.7 });
  const shake = f >= 99 && f < 114 ? Math.sin((f - 99) * 2.2) * (114 - f) * 0.9 : 0;
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={92}>
        <Clip src="c1-licao-tablet" dur={92} zoom={[1.04, 1.17]} pan={[0, -24]} enter="none" />
      </Sequence>
      <Sequence from={90} durationInFrames={105}>
        <Clip src="c2-desenho-mae" dur={105} zoom={[1.12, 1.22]} pan={[24, -12]} exitBlur={false} />
      </Sequence>
      <Shade />
      <Vignette />

      <div style={{ position: "absolute", left: 72, top: 262 }}>
        <Txt size={24} weight={700} style={{ opacity: 0.8, letterSpacing: 1 }}>Imagens ilustrativas</Txt>
      </div>

      {/* "Você QUER AJUDAR uma criança autista," */}
      <div style={{ position: "absolute", left: 80, right: 80, top: 1000 }}>
        <Rise at={3} out={[62, 70]}>
          <Txt size={72}>Você</Txt>
        </Rise>
        <div style={{ marginTop: 14, marginLeft: 14 }}>
          <Highlight at={7} bg={C.yellow} color={C.ink} size={132} out={[62, 70]}>
            QUER AJUDAR
          </Highlight>
        </div>
        <Rise at={26} out={[62, 70]} style={{ marginTop: 24 }}>
          <Txt size={64}>uma criança autista,</Txt>
        </Rise>
      </div>
      <Sparkle at={12} x={850} y={940} rot={18} />

      {/* "mas nem sempre sabe COMO?" */}
      <div style={{ position: "absolute", left: 80, right: 80, top: 960 }}>
        <Rise at={70}>
          <Txt size={66}>mas nem sempre sabe</Txt>
        </Rise>
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 1070,
          transform: `translateX(${shake}px) scale(${como}) rotate(${-4 + (1 - como) * -10}deg)`,
          transformOrigin: "30% 60%",
          opacity: f >= 99 ? 1 : 0,
        }}
      >
        <div style={{ background: C.purple, borderRadius: 40, padding: "4px 40px 16px", boxShadow: "0 24px 50px -14px rgba(40,10,90,0.7)" }}>
          <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 172, color: "#fff", letterSpacing: -4, lineHeight: 1 }}>COMO?</span>
        </div>
      </div>
      <Rings at={99} x={420} y={1190} size={520} />
      <Sparkle at={102} x={760} y={1020} size={120} rot={20} />
      <Sparkle at={104} x={40} y={1330} size={80} rot={-160} color={C.teal} />
      <div style={{ position: "absolute", left: 80, right: 80, top: 1340 }}>
        <Rise at={116}>
          <Txt size={56}>apoiar a comunicação</Txt>
        </Rise>
        <Rise at={126}>
          <Txt size={56} color={C.yellow}>e a aprendizagem?</Txt>
        </Rise>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- CENA 2 — SOLUÇÃO (6–12,5 s) ---------------- */
const Pill: React.FC<{ at: number; top: number; icon: string; label: string; color: string; fromRight?: boolean }> = ({ at, top, icon, label, color, fromRight }) => {
  const f = useCurrentFrame();
  const v = useIn(at, { damping: 15, stiffness: 150 });
  const chk = useIn(at + 9, { damping: 9, stiffness: 220 });
  const dir = fromRight ? 1 : -1;
  const float = Math.sin((f - at) / 14) * 4;
  return (
    <div style={{ position: "absolute", left: 90, right: 90, top: top + float, height: 124, transform: `translateX(${(1 - v) * 760 * dir}px) rotate(${(1 - v) * 7 * dir}deg)` }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{ position: "absolute", top: 26 + i * 34, height: 8, borderRadius: 8, width: 260 - i * 60, background: "rgba(255,255,255,0.7)", [fromRight ? "right" : "left"]: -60 - i * 30, transform: `translateX(${dir * (v * 300)}px)`, opacity: 1 - v } as React.CSSProperties}
        />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "#fff", borderRadius: 32, display: "flex", alignItems: "center", gap: 26, padding: "0 26px", boxShadow: "0 22px 46px -18px rgba(5,26,62,0.6)" }}>
        <div style={{ width: 84, height: 84, borderRadius: 24, background: color, display: "grid", placeItems: "center" }}>
          <Icon name={icon} size={50} color="#fff" />
        </div>
        <span style={{ flex: 1, fontFamily: FONT, fontWeight: 900, fontSize: 52, color: C.ink, letterSpacing: -0.5 }}>{label}</span>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.green, display: "grid", placeItems: "center", transform: `scale(${chk})` }}>
          <Icon name="check" size={34} color="#fff" stroke={3.4} />
        </div>
      </div>
    </div>
  );
};

export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const tint = interpolate(f, [0, 30], [0, 1], { ...clampOpts, easing: ease });
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={62}>
        <Clip src="c3-professora" dur={62} zoom={[1.08, 1.16]} pan={[0, -16]} />
      </Sequence>
      <Sequence from={60} durationInFrames={62}>
        <Clip src="c4-brincadeira-mae" dur={62} zoom={[1.06, 1.16]} pan={[-20, 0]} />
      </Sequence>
      <Sequence from={120} durationInFrames={47}>
        <Clip src="c5-alfabeto" dur={47} zoom={[1.05, 1.15]} pan={[0, 20]} />
      </Sequence>
      <Sequence from={165} durationInFrames={50}>
        <Clip src="c6-trenzinho" dur={50} zoom={[1.1, 1.18]} pan={[16, 0]} exitBlur={false} />
      </Sequence>
      <AbsoluteFill
        style={{
          opacity: tint,
          background: `linear-gradient(to top, rgba(7,86,184,0.92) 0%, rgba(7,86,184,0.7) 26%, rgba(8,184,179,0.25) 52%, rgba(8,184,179,0) 64%), linear-gradient(to bottom, rgba(5,63,135,0.75) 0%, rgba(5,63,135,0) 30%)`,
        }}
      />
      <Vignette />

      <div style={{ position: "absolute", left: 80, right: 80, top: 290 }}>
        <Highlight at={9} bg={C.teal} color="#fff" size={84} out={[92, 100]} rotate={-1.5}>
          ORIENTAÇÃO CLARA
        </Highlight>
        <Rise at={36} out={[92, 100]} style={{ marginTop: 14 }}>
          <Txt size={60} color={C.yellow}>e estratégias respeitosas</Txt>
        </Rise>
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 290 }}>
        <Rise at={100}>
          <Txt size={68}>para apoiar o desenvolvimento</Txt>
        </Rise>
        <div style={{ marginTop: 16, marginLeft: 14 }}>
          <Highlight at={150} bg={C.yellow} color={C.ink} size={92}>
            NO DIA A DIA
          </Highlight>
        </div>
      </div>

      <Pill at={36} top={1010} icon="chat" label="COMUNICAÇÃO" color={C.blue} />
      <Pill at={78} top={1150} icon="hands" label="AUTONOMIA" color={C.teal} fromRight />
      <Pill at={120} top={1290} icon="book" label="APRENDIZAGEM" color={C.purple} />
    </AbsoluteFill>
  );
};

/* ---------------- CENA 3 — PRODUTO (12,5–22 s) ---------------- */
const Benefit: React.FC<{ at: number; top: number; label: string; clip: string; startFrom: number }> = ({ at, top, label, clip, startFrom }) => {
  const v = useIn(at, { damping: 15, stiffness: 160 });
  const chk = useIn(at + 8, { damping: 9, stiffness: 220 });
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top, height: 136, transform: `translateY(${(1 - v) * 120}px) scale(${0.9 + 0.1 * v})`, opacity: Math.min(1, v * 1.5) }}>
      <div style={{ position: "absolute", inset: 0, background: "#fff", borderRadius: 34, display: "flex", alignItems: "center", gap: 24, padding: "0 26px 0 12px", boxShadow: "0 22px 46px -18px rgba(5,26,62,0.7)" }}>
        <div style={{ width: 112, height: 112, borderRadius: 26, overflow: "hidden", flexShrink: 0, background: C.blueDark }}>
          <Sequence from={at} layout="none">
            <OffthreadVideo src={staticFile(`clips/${clip}.mp4`)} startFrom={startFrom} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        </div>
        <span style={{ flex: 1, fontFamily: FONT, fontWeight: 900, fontSize: 50, color: C.ink, letterSpacing: -0.5 }}>{label}</span>
        <div style={{ width: 58, height: 58, borderRadius: "50%", background: C.green, display: "grid", placeItems: "center", transform: `scale(${chk})` }}>
          <Icon name="check" size={36} color="#fff" stroke={3.4} />
        </div>
      </div>
    </div>
  );
};

const BrandBg: React.FC<{ videoSrc?: string }> = ({ videoSrc }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `linear-gradient(165deg, ${C.blue} 0%, ${C.blueDark} 100%)` }}>
      {videoSrc ? (
        <AbsoluteFill style={{ opacity: 0.22 }}>
          <Clip src={videoSrc} dur={300} zoom={[1.2, 1.3]} enter="none" exitBlur={false} blur={18} />
        </AbsoluteFill>
      ) : null}
      <div style={{ position: "absolute", right: -220, top: -180 + Math.sin(f / 40) * 20, width: 640, height: 640, borderRadius: "50%", background: C.purple, opacity: 0.55, filter: "blur(10px)" }} />
      <div style={{ position: "absolute", left: -260, bottom: 120 + Math.cos(f / 45) * 20, width: 620, height: 620, borderRadius: "50%", border: `46px solid ${C.teal}`, opacity: 0.5 }} />
      <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 3px, transparent 3px)", backgroundSize: "44px 44px" }} />
    </AbsoluteFill>
  );
};

export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const reveal = interpolate(f, [0, 14], [0, 150], { ...clampOpts, easing: ease });
  const v = useIn(12, { damping: 13, stiffness: 90 });
  const move = interpolate(f, [110, 130], [0, 1], { ...clampOpts, easing: ease });
  const rotY = -70 * (1 - v) - 12 + Math.sin(f / 28) * 4;
  const coverTop = interpolate(move, [0, 1], [430, 330]);
  const coverScale = interpolate(move, [0, 1], [1, 0.72]) * (0.75 + 0.25 * v);
  const glint = interpolate(f, [42, 66], [-120, 160], clampOpts);
  return (
    <AbsoluteFill style={{ clipPath: `circle(${reveal}% at 50% 55%)` }}>
      <BrandBg videoSrc="c7-pai-desenho" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 262, textAlign: "center" }}>
        <Rise at={6} out={[110, 120]}>
          <Txt size={46} color={C.yellow} style={{ letterSpacing: 8 }}>CONHEÇA O CURSO</Txt>
        </Rise>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, top: coverTop, display: "flex", justifyContent: "center", perspective: 1600 }}>
        <div style={{ transform: `translateY(${(1 - v) * 380}px) rotateY(${rotY}deg) rotateX(6deg) scale(${coverScale})`, transformOrigin: "50% 0%", position: "relative" }}>
          <Cover width={600} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 34, overflow: "hidden", pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: -200, bottom: -200, width: 160, left: `${glint}%`, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)", transform: "rotate(18deg)" }} />
          </div>
        </div>
      </div>
      <Sparkle at={30} x={140} y={420} size={110} rot={-24} />
      <Sparkle at={34} x={860} y={1180} size={90} rot={150} color={C.teal} />

      <Benefit at={123} top={950} label="Aulas por módulos" clip="c7-pai-desenho" startFrom={60} />
      <Benefit at={153} top={1110} label="Exemplos práticos" clip="c5-alfabeto" startFrom={0} />
      <Benefit at={186} top={1270} label="Estudo no seu ritmo" clip="c8-pai-filha-risos" startFrom={30} />

      {/* Montagem final com vídeos */}
      <Sequence from={225} durationInFrames={32}>
        <Clip src="c9-blocos" dur={32} zoom={[1.08, 1.16]} pan={[-16, 0]} />
      </Sequence>
      <Sequence from={255} durationInFrames={45}>
        <Clip src="c10-sala-aula" dur={45} zoom={[1.06, 1.14]} pan={[10, 0]} exitBlur={false} />
      </Sequence>
      <Sequence from={225} durationInFrames={75}>
        <Shade />
        <div style={{ position: "absolute", left: 80, right: 80, top: 1040 }}>
          <Rise at={3}>
            <Txt size={74}>Para pais,</Txt>
          </Rise>
          <Rise at={8}>
            <Txt size={74}>professores</Txt>
          </Rise>
          <Rise at={13}>
            <Txt size={74} color={C.yellow}>e cuidadores</Txt>
          </Rise>
          <div style={{ marginTop: 22, marginLeft: 14 }}>
            <Highlight at={33} bg={C.teal} color="#fff" size={54} rotate={-1}>
              CURSO LIVRE E INTRODUTÓRIO
            </Highlight>
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

/* ---------------- CENA 4 — CTA (22–30 s) ---------------- */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const enter = interpolate(f, [0, 12], [100, 0], { ...clampOpts, easing: ease });
  const cv = useIn(4, { damping: 14, stiffness: 100 });
  const seal = useIn(42, { damping: 8, stiffness: 170, mass: 0.8 });
  const btn = useIn(116, { damping: 11, stiffness: 160 });
  const cur = interpolate(f, [122, 140], [0, 1], { ...clampOpts, easing: ease });
  const press = interpolate(f, [140, 143, 150], [1, 0.93, 1], clampOpts);
  const ripple = interpolate(f, [141, 162], [0, 1], clampOpts);
  const pulse = f > 165 ? 1 + Math.sin((f - 165) / 7) * 0.02 : 1;
  const disc = useIn(150, { damping: 20 });
  const bobY = Math.sin(f / 24) * 8;
  return (
    <AbsoluteFill style={{ clipPath: `inset(${enter}% 0 0 0)` }}>
      <BrandBg />
      <Sparkle at={20} x={90} y={300} size={110} rot={-30} />
      <Sparkle at={26} x={900} y={1100} size={90} rot={140} color={C.teal} />
      <Sparkle at={50} x={130} y={980} size={80} rot={-120} />

      <div style={{ position: "absolute", left: 0, right: 0, top: 280 + bobY, display: "flex", justifyContent: "center", perspective: 1600 }}>
        <div style={{ transform: `translateY(${(1 - cv) * 900}px) rotateY(${-16 + Math.sin(f / 30) * 4}deg) rotateZ(${(1 - cv) * -8 - 3}deg)` }}>
          <Cover width={470} />
        </div>
      </div>

      <div style={{ position: "absolute", left: 610, top: 730, transform: `scale(${seal}) rotate(${-24 + seal * 16}deg)`, opacity: f >= 42 ? 1 : 0 }}>
        <Seal size={340}>
          <div style={{ fontSize: 30, fontWeight: 800 }}>Por apenas</div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", fontWeight: 900, lineHeight: 1 }}>
            <span style={{ fontSize: 42, marginTop: 14 }}>R$</span>
            <span style={{ fontSize: 128, color: C.yellow, letterSpacing: -4 }}>19</span>
            <span style={{ fontSize: 56, color: C.yellow, marginTop: 12 }}>,90</span>
          </div>
        </Seal>
      </div>
      <Rings at={42} x={780} y={900} size={460} />

      <div style={{ position: "absolute", left: 60, right: 60, top: 1110, textAlign: "center" }}>
        <Rise at={96}>
          <Txt size={58}>Veja todos os detalhes do curso</Txt>
        </Rise>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, top: 1215, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", transform: `scale(${btn * press * pulse})` }}>
          <div style={{ background: C.green, borderRadius: 34, padding: "34px 70px", boxShadow: `0 12px 0 0 ${C.greenDark}, 0 26px 40px -10px rgba(0,0,0,0.5)`, display: "flex", alignItems: "center", gap: 22 }}>
            <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 68, color: "#fff", letterSpacing: 1 }}>SAIBA MAIS</span>
            <Icon name="arrow" size={62} color="#fff" stroke={3} />
          </div>
          <div style={{ position: "absolute", left: "62%", top: "55%", width: 260, height: 260, marginLeft: -130, marginTop: -130, borderRadius: "50%", border: "8px solid rgba(255,255,255,0.9)", transform: `scale(${ripple * 1.6})`, opacity: ripple > 0 ? 1 - ripple : 0 }} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: interpolate(cur, [0, 1], [1000, 770]),
          top: interpolate(cur, [0, 1], [1700, 1300]),
          transform: `scale(${f >= 140 && f < 148 ? 0.88 : 1})`,
          opacity: f >= 122 ? 1 : 0,
        }}
      >
        <Cursor size={120} />
      </div>

      <div style={{ position: "absolute", left: 90, right: 90, top: 1420, textAlign: "center", opacity: disc }}>
        <Txt size={27} weight={700} style={{ opacity: 0.9, lineHeight: 1.3 }}>
          Curso livre e introdutório. Não substitui acompanhamento profissional.
        </Txt>
      </div>
    </AbsoluteFill>
  );
};

