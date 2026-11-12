import type { MetadataRoute } from "next";
import { product } from "@/lib/product";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/confirmacao"] },
    sitemap: `${product.siteUrl}/sitemap.xml`,
  };
}
