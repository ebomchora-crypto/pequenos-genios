import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from "remotion";
import { ensureFont } from "./fonts";
import { Wipe } from "./kit";
import { S1, S2, S3, S4 } from "./Scenes";
import { C, SPEECH, T } from "./theme";

const sfx: { at: number; src: string; vol: number }[] = [
  { at: 7, src: "pop", vol: 0.35 },
  { at: 86, src: "whoosh", vol: 0.45 },
  { at: 99, src: "impacto", vol: 0.3 },
  { at: 170, src: "whoosh", vol: 0.55 },
  { at: 216, src: "pop", vol: 0.3 },
  { at: 258, src: "pop", vol: 0.3 },
  { at: 300, src: "pop", vol: 0.3 },
  { at: 372, src: "whoosh", vol: 0.55 },
  { at: 387, src: "whoosh", vol: 0.35 },
  { at: 498, src: "pop", vol: 0.3 },
  { at: 528, src: "pop", vol: 0.3 },
  { at: 561, src: "pop", vol: 0.3 },
  { at: 598, src: "whoosh", vol: 0.45 },
  { at: 628, src: "whoosh", vol: 0.35 },
  { at: 658, src: "whoosh", vol: 0.55 },
  { at: 702, src: "impacto", vol: 0.65 },
  { at: 776, src: "pop", vol: 0.3 },
  { at: 802, src: "clique", vol: 0.5 },
];

function musicVolume(f: number) {
  let duck = 0;
  for (const [a, b] of SPEECH) {
    duck = Math.max(duck, interpolate(f, [a - 6, a, b, b + 10], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  }
  const fadeIn = interpolate(f, [0, 8], [0.4, 1], { extrapolateRight: "clamp" });
  return (0.62 - duck * 0.4) * fadeIn;
}

export const Anuncio: React.FC = () => {
  ensureFont();
  return (
    <AbsoluteFill style={{ backgroundColor: C.blueDark }}>
      <Sequence from={T.s1} durationInFrames={195}>
        <S1 />
      </Sequence>
      <Sequence from={T.s2} durationInFrames={T.s3 - T.s2 + 20}>
        <S2 />
      </Sequence>
      <Sequence from={T.s3} durationInFrames={T.s4 - T.s3 + 16}>
        <S3 />
      </Sequence>
      <Sequence from={T.s4} durationInFrames={900 - T.s4}>
        <S4 />
      </Sequence>
      <Wipe at={T.s2 - 9} colors={[C.teal, C.blue]} />

      <Audio src={staticFile("audio/trilha.wav")} volume={musicVolume} />
      <Sequence from={T.voice.l1}><Audio src={staticFile("audio/l1.wav")} /></Sequence>
      <Sequence from={T.voice.l2}><Audio src={staticFile("audio/l2.wav")} /></Sequence>
      <Sequence from={T.voice.l3}><Audio src={staticFile("audio/l3.wav")} /></Sequence>
      <Sequence from={T.voice.l4}><Audio src={staticFile("audio/l4.wav")} /></Sequence>
      {sfx.map((s, i) => (
        <Sequence key={i} from={s.at} durationInFrames={45}>
          <Audio src={staticFile(`audio/${s.src}.wav`)} volume={s.vol} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
