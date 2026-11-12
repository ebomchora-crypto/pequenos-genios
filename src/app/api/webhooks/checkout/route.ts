import { createHmac, timingSafeEqual } from "node:crypto";
import { recordPurchase } from "@/lib/purchases";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const TOLERANCE_MS = 5 * 60 * 1000;

/**
 * Contrato (adapte ao formato real do seu checkout):
 *   POST /api/webhooks/checkout
 *   x-webhook-timestamp: <epoch em segundos>
 *   x-webhook-signature: sha256=<hex(HMAC_SHA256(secret, `${timestamp}.${corpoBruto}`))>
 *   corpo JSON: { "event": "order.paid", "order_id": "...", "paid_at": "ISO-8601", "amount": 19.9 }
 */
function validSignature(secret: string, timestamp: string, raw: string, header: string): boolean {
  const expected = createHmac("sha256", secret).update(`${timestamp}.${raw}`).digest("hex");
  const received = header.startsWith("sha256=") ? header.slice(7) : header;
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(received, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.CHECKOUT_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: "webhook_not_configured" }, { status: 503 });

  const raw = await request.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return Response.json({ error: "payload_too_large" }, { status: 413 });

  const timestamp = request.headers.get("x-webhook-timestamp") ?? "";
  const signature = request.headers.get("x-webhook-signature") ?? "";
  const tsMs = Number(timestamp) * 1000;
  if (!Number.isFinite(tsMs) || Math.abs(Date.now() - tsMs) > TOLERANCE_MS) {
    return Response.json({ error: "stale_or_missing_timestamp" }, { status: 401 });
  }
  if (!signature || !validSignature(secret, timestamp, raw, signature)) {
    return Response.json({ error: "invalid_signature" }, { status: 401 });
  }

  let body: { event?: unknown; order_id?: unknown; paid_at?: unknown; amount?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (body.event !== "order.paid") return Response.json({ ok: true, ignored: true });

  const orderId = typeof body.order_id === "string" || typeof body.order_id === "number" ? String(body.order_id) : "";
  const amount = Number(body.amount);
  const paidAt = typeof body.paid_at === "string" ? Date.parse(body.paid_at) : Date.now();
  if (!orderId || orderId.length > 128 || !Number.isFinite(amount) || amount <= 0 || !Number.isFinite(paidAt)) {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  const result = recordPurchase(orderId, paidAt, amount);
  return Response.json({ ok: true, result });
}
