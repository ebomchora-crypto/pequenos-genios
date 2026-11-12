import { continueRender, delayRender, staticFile } from "remotion";

let loaded = false;

export function ensureFont() {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("Carregando Nunito");
  const face = new FontFace("Nunito", `url(${staticFile("fonts/nunito-latin.woff2")}) format("woff2")`, {
    weight: "200 1000",
  });
  face
    .load()
    .then((f) => {
      document.fonts.add(f);
      continueRender(handle);
    })
    .catch(() => continueRender(handle));
}
