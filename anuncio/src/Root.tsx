import { Composition } from "remotion";
import { Anuncio } from "./Anuncio";
import { FPS, H, TOTAL, W } from "./theme";

export const Root: React.FC = () => (
  <Composition id="Anuncio" component={Anuncio} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
);
