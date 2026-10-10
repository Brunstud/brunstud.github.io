import type { MetadataRoute } from "next";
import { research, projects } from "@/content/site";
import { poems } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];
  return [
    "/",
    "/about",
    "/poetry",
    "/cv",
    ...research.filter((w) => !w.externalUrl).map((w) => `/research/${w.slug}`),
    ...projects.map((w) => `/projects/${w.slug}`),
    ...poems.map((p) => `/poetry/${p.slug}`),
  ].map((route) => ({ url: origin + route }));
}
