import type { Metadata, Viewport } from "next";
import "./globals.css";
import { product } from "@/lib/product";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { ConsentBanner } from "@/components/ConsentBanner";

const title = `${product.name} | Curso livre introdutório online`;
const description =
  "Curso livre online com introdução clara e respeitosa à ABA e ao autismo: aulas organizadas e materiais práticos para pais, cuidadores e educadores.";

export const metadata: Metadata = {
  metadataBase: new URL(product.siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", url: "/", siteName: product.name, title, description },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b3c49",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-petrol-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
        <ConsentBanner />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
