import type { MetadataRoute } from "next";
import {
  getCategories,
  getCategoryById,
  getPublishedCreations,
} from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";

const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/creations", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
] as const;

function getPublicationDate(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map(
    (category) => ({
      url: new URL(`/creations/${category.slug}`, siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  const creationRoutes: MetadataRoute.Sitemap = getPublishedCreations().flatMap(
    (creation) => {
      const category = getCategoryById(creation.categoryId);

      if (!category) {
        return [];
      }

      const lastModified = getPublicationDate(creation.publishedAt);

      return [
        {
          url: new URL(
            `/creations/${category.slug}/${creation.slug}`,
            siteUrl,
          ).toString(),
          changeFrequency: "yearly" as const,
          priority: 0.5,
          ...(lastModified ? { lastModified } : {}),
        },
      ];
    },
  );

  return [...staticRoutes, ...categoryRoutes, ...creationRoutes];
}
