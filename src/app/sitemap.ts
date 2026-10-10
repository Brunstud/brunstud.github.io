
import type { MetadataRoute } from "next";
import { research, projects } from "@/content/site";
import { poems } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://brunstud.github.io"
  ).replace(/\/$/, "");

  const routes = [
    "/",
    "/about",
    "/poetry",
    "/cv",
    ...research
      .filter((w) => !w.externalUrl)
      .map((w) => `/research/${w.slug}`),
    ...projects.map((w) => `/projects/${w.slug}`),
    ...poems.map((p) => `/poetry/${p.slug}`),
  ];

  return routes.map((route) => ({
    url: origin + route,
  }));
}
