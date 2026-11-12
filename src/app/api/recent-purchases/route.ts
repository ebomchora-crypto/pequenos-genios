import { recentPurchases } from "@/lib/purchases";

export const dynamic = "force-dynamic";

/** Só devolve inscrições reais confirmadas via webhook, sem dados pessoais. Sem vendas = lista vazia. */
export async function GET() {
  const events = recentPurchases().map((p) => ({ id: p.id, paidAt: new Date(p.paidAt).toISOString() }));
  return Response.json(
    { events },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30" } },
  );
}
