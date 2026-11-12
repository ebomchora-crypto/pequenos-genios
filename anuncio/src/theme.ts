export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const TOTAL = 900;

export const C = {
  blue: "#0756B8",
  blueDark: "#053F87",
  purple: "#7C3AED",
  purpleDark: "#5B21B6",
  teal: "#08B8B3",
  yellow: "#FFC928",
  green: "#15803D",
  greenDark: "#0E5A2C",
  white: "#FFFFFF",
  ink: "#14213D",
} as const;

export const FONT = "Nunito, system-ui, sans-serif";

/** Linha do tempo (frames a 30 fps). Cortes de cena caem nas batidas da trilha (120 BPM). */
export const T = {
  s1: 0,
  s2: 180,
  s3: 375,
  s4: 660,
  voice: { l1: 3, l2: 180, l3: 378, l4: 663 },
} as const;

/** Janelas de fala (em frames globais), usadas para abaixar a trilha sob a voz. */
export const SPEECH: [number, number][] = [
  [10, 166],
  [187, 362],
  [385, 590],
  [670, 852],
];
