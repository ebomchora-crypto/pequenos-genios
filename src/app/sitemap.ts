import type { MetadataRoute } from "next";
import { product } from "@/lib/product";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/termos", "/privacidade"].map((p) => ({ url: `${product.siteUrl}${p}` }));
}
