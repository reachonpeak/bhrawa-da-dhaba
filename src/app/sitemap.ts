import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bharawan-dhaba.vercel.app";
  const routes = ["", "/menu", "/about", "/catering", "/contact"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: r === "/menu" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
