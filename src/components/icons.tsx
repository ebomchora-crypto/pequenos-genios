const paths = {
  screen: <><rect x="3" y="4" width="18" height="12" rx="2.5" /><path d="m10.5 8 3.5 2-3.5 2zM8 20h8M12 16v4" /></>,
  printer: <><path d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" /><rect x="7" y="14" width="10" height="6" rx="1" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" /></>,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" /></>,
  home: <><path d="M4 11 12 4l8 7v8a2 2 0 0 1-2 2h-3v-6h-6v6H6a2 2 0 0 1-2-2z" /></>,
  school: <><path d="M3 9 12 4l9 5-9 5z" /><path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5M21 9v5" /></>,
  hands: <><path d="M12 20s-7-4.3-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5C19 15.7 12 20 12 20z" /><path d="M9.5 12.5h5M12 10v5" /></>,
  sprout: <><path d="M12 21v-9" /><path d="M12 12C12 8 9 5 4.5 5c0 4.5 3 7 7.5 7zM12 13c0-3.5 2.6-6 6.5-6 0 3.8-2.6 6-6.5 6z" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8M8 11h6" /></>,
  shield: <><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" /><path d="m9.5 12 2 2 3.5-4" /></>,
  leaf: <><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19 13 11" /></>,
  chat: <><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /><path d="M8 10h8M8 13h5" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0M16 5.2a3 3 0 0 1 0 5.6M18 20a5 5 0 0 0-2.5-4.3" /></>,
  ear: <><path d="M7 10a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5.5 1.6" /><path d="M10 10a2 2 0 0 1 4 0c0 1.2-1.2 1.6-1.6 2.6" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  heart: <><path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.2 12 20 12 20z" /></>,
  cart: <><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" /><circle cx="10" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></>,
  file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  check: <><path d="m5 12.5 4.5 4.5L19 7.5" /></>,
  chevron: <><path d="m6 9 6 6 6-6" /></>,
  close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className, strokeWidth = 2 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

/** Pequenos traços de "brilho" amarelos, como na peça de referência. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M24 4v10M8 14l7 6M40 14l-7 6" />
    </svg>
  );
}

/** Selo de preço com borda ondulada (gerado de forma determinística). */
export function PriceSeal({ className, children }: { className?: string; children: React.ReactNode }) {
  const bumps = 18;
  const pts: string[] = [];
  for (let i = 0; i <= bumps * 2; i++) {
    const a = (Math.PI * i) / bumps - Math.PI / 2;
    const r = i % 2 === 0 ? 50 : 46;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return (
    <div className={`grid place-items-center ${className ?? ""}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full drop-shadow-[0_10px_18px_rgba(91,33,182,0.35)]">
        <polygon points={pts.join(" ")} fill="#7c3aed" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" strokeOpacity=".35" strokeWidth="1.2" strokeDasharray="2 3" />
      </svg>
      <div className="relative text-center text-white">{children}</div>
    </div>
  );
}
