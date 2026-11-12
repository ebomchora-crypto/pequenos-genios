import { AbsoluteFill, Composition } from "remotion";
import { Anuncio } from "./Anuncio";
import { FPS, H, TOTAL, W } from "./theme";

/** 4:5 para feed: mesma montagem do 9:16, enquadrada na faixa central onde ficam textos e produto. */
const H45 = 1350;
const OFFSET_45 = 185;

const Anuncio45: React.FC = () => (
  <AbsoluteFill style={{ overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, top: -OFFSET_45, width: W, height: H }}>
      <Anuncio />
    </div>
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition id="Anuncio" component={Anuncio} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="Anuncio45" component={Anuncio45} durationInFrames={TOTAL} fps={FPS} width={W} height={H45} />
  </>
);
