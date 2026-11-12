/** Ilustração abstrata e decorativa (não representa conteúdo do curso nem pessoas). */
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-label="Ilustração abstrata de cartões e balões de conversa em tons de azul-petróleo e verde-água"
      className="h-auto w-full"
    >
      <rect x="0" y="0" width="480" height="360" rx="28" fill="#e0f3f0" />
      <circle cx="400" cy="70" r="90" fill="#a8dad3" opacity=".55" />
      <circle cx="60" cy="320" r="110" fill="#effaf8" />

      <rect x="48" y="52" width="210" height="130" rx="20" fill="#ffffff" stroke="#0f5663" strokeWidth="3" />
      <rect x="72" y="78" width="110" height="12" rx="6" fill="#0f5663" />
      <rect x="72" y="102" width="150" height="10" rx="5" fill="#a8dad3" />
      <rect x="72" y="122" width="126" height="10" rx="5" fill="#a8dad3" />
      <circle cx="226" cy="154" r="8" fill="#e8735a" />

      <path d="M250 150h150a20 20 0 0 1 20 20v62a20 20 0 0 1-20 20h-92l-34 28v-28h-24a20 20 0 0 1-20-20v-62a20 20 0 0 1 20-20z" fill="#0f5663" />
      <rect x="276" y="180" width="110" height="10" rx="5" fill="#ffffff" opacity=".9" />
      <rect x="276" y="200" width="78" height="10" rx="5" fill="#a8dad3" />

      <g transform="translate(48 232)">
        <rect width="64" height="64" rx="14" fill="#ffffff" stroke="#0f5663" strokeWidth="3" />
        <rect x="16" y="22" width="32" height="8" rx="4" fill="#0f5663" />
        <rect x="16" y="38" width="20" height="8" rx="4" fill="#a8dad3" />
        <rect x="80" width="64" height="64" rx="14" fill="#ffffff" stroke="#0f5663" strokeWidth="3" />
        <circle cx="112" cy="32" r="14" fill="#a8dad3" />
        <rect x="160" width="64" height="64" rx="14" fill="#ffffff" stroke="#0f5663" strokeWidth="3" />
        <path d="M178 40l10 10 18-22" fill="none" stroke="#0f5663" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
