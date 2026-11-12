import type { Metadata } from "next";
import Link from "next/link";
import { PurchaseTracker } from "@/components/PurchaseTracker";
import { findPurchase } from "@/lib/purchases";
import { company, product } from "@/lib/product";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Confirmação da inscrição", robots: { index: false, follow: false } };

export default async function Confirmacao({ searchParams }: { searchParams: Promise<{ pedido?: string }> }) {
  const { pedido } = await searchParams;
  const purchase = pedido && pedido.length <= 128 ? findPurchase(pedido) : undefined;

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-4 py-16">
      <div className="w-full rounded-3xl border border-petrol-900/10 bg-white p-8 text-center shadow-lg">
        {purchase ? (
          <>
            <h1 className="text-2xl font-extrabold text-petrol-900">Inscrição confirmada</h1>
            <p className="mt-3 leading-relaxed text-ink/90">
              Obrigado! Você receberá as instruções de acesso ao curso {product.name} no e-mail informado na compra.
            </p>
            <PurchaseTracker transactionId={purchase.id} value={purchase.amount} />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-petrol-900">Ainda não encontramos a confirmação</h1>
            <p className="mt-3 leading-relaxed text-ink/90">
              A confirmação de pagamento pode levar alguns minutos. Atualize esta página em instantes.
              {company.email ? <> Se precisar, fale conosco em {company.email}.</> : null}
            </p>
          </>
        )}
        <Link href="/" className="mt-6 inline-block font-semibold text-petrol-700 underline">
          Voltar à página inicial
        </Link>
      </div>
    </main>
  );
}
