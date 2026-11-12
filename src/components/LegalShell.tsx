import Link from "next/link";
import { company, product } from "@/lib/product";

export function LegalShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link href="/" className="text-sm font-semibold text-petrol-700 underline">← Voltar</Link>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-petrol-900">{title}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-ink/90 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-petrol-900 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
        <h2>Responsável</h2>
        <p>
          {company.name ?? product.name}
          {company.cnpj ? ` — CNPJ ${company.cnpj}` : ""}
          {company.address ? ` — ${company.address}` : ""}
          {company.email ? ` — ${company.email}` : ""}
        </p>
      </div>
    </main>
  );
}
