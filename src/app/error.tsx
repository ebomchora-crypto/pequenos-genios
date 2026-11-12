"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-md place-items-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-extrabold text-petrol-900">Algo deu errado</h1>
        <p className="mt-2 text-ink/85">Não foi possível carregar esta página agora. Tente novamente.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 min-h-12 rounded-xl bg-petrol-700 px-6 font-bold text-white hover:bg-petrol-900"
        >
          Tentar de novo
        </button>
      </div>
    </main>
  );
}
