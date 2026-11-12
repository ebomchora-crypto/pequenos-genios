"use client";

import { useEffect, useState } from "react";
import { IconClose } from "./icons";

type RecentEvent = { id: string; paidAt: string };

const POLL_MS = 60_000;
const VISIBLE_MS = 9_000;
const SEEN_KEY = "aba_seen_purchases";

function label(paidAt: string, now: number) {
  const min = Math.floor((now - Date.parse(paidAt)) / 60_000);
  if (min < 1) return "Nova inscrição confirmada há menos de 1 min";
  if (min < 60) return `Nova inscrição confirmada há ${min} min`;
  return `Nova inscrição confirmada há ${Math.floor(min / 60)} h`;
}

function readSeen(): string[] {
  try {
    return JSON.parse(window.sessionStorage.getItem(SEEN_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function markSeen(id: string) {
  try {
    window.sessionStorage.setItem(SEEN_KEY, JSON.stringify([...readSeen(), id].slice(-20)));
  } catch {
    /* sem armazenamento: o aviso pode reaparecer, sem prejuízo */
  }
}

/** Mostra SOMENTE inscrições reais vindas de /api/recent-purchases. Sem eventos ou com erro, não renderiza nada. */
export function RecentPurchaseToast() {
  const [current, setCurrent] = useState<RecentEvent | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    async function load() {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/recent-purchases", { cache: "no-store" });
        if (!res.ok) return;
        const data: { events?: RecentEvent[] } = await res.json();
        const seen = readSeen();
        const next = (data.events ?? []).find((e) => !seen.includes(e.id));
        if (cancelled || !next) return;
        markSeen(next.id);
        setNow(Date.now());
        setCurrent(next);
        hideTimer = setTimeout(() => setCurrent(null), VISIBLE_MS);
      } catch {
        /* falha de rede: simplesmente não mostra nada */
      }
    }

    load();
    const interval = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  if (!current) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-in fixed bottom-24 left-3 z-40 flex max-w-[calc(100vw-1.5rem)] items-center gap-3 rounded-2xl border border-petrol-900/10 bg-white p-3 pl-4 shadow-xl md:bottom-6 md:left-6"
    >
      <p className="text-sm font-semibold text-petrol-900">{label(current.paidAt, now)}</p>
      <button
        type="button"
        onClick={() => setCurrent(null)}
        aria-label="Fechar aviso"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-petrol-900 hover:bg-aqua-100"
      >
        <IconClose className="h-4 w-4" />
      </button>
    </div>
  );
}
