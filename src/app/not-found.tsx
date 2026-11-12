import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-md place-items-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-dark">Página não encontrada</h1>
        <Link href="/" className="mt-4 inline-block font-semibold text-brand underline">
          Voltar à página inicial
        </Link>
      </div>
    </main>
  );
}
