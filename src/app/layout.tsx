import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { product } from "@/lib/product";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { ConsentBanner } from "@/components/ConsentBanner";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"], display: "swap", variable: "--font-nunito" });

const title = `${product.name} | Curso livre introdutório online`;
const description =
  "Curso livre online para pais, professores e cuidadores: entenda o autismo e aprenda formas práticas e respeitosas de apoiar a comunicação e a aprendizagem.";

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
  themeColor: "#0756b8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body className="min-h-screen antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
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
