import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://office-imposters.schluesselmomente-escape-rooms.de/sitemap.xml",
  };
}
