import type { Category } from "./category";
import type { Profile } from "./profile";
import type { SiteSettings } from "./site";

export type CreationStatus = "draft" | "published" | "archived";

// Protected download URLs belong in server-side order verification, not public content.
export interface Product {
  readonly isForSale: boolean;
  readonly price: number;
  readonly currency: string;
  readonly productType: string;
  readonly previewUrl: string;
  readonly license: string;
  readonly stock: number | null;
}

export interface CreationMedia {
  readonly type: string;
  readonly youtubeUrl: string;
  readonly youtubeVideoId: string;
  readonly audioUrl: string;
  readonly previewText: string;
}

export interface CreationSeo {
  readonly title: string;
  readonly description: string;
}

export interface Creation {
  readonly id: string;
  readonly slug: string;
  readonly categoryId: string;
  readonly title: string;
  readonly subtitle: string;
  readonly excerpt: string;
  readonly description: string;
  readonly coverImage: string;
  readonly publishedAt: string;
  readonly status: CreationStatus;
  readonly featured: boolean;
  readonly tags: readonly string[];
  readonly creator: string;
  readonly product: Product;
  readonly media: CreationMedia;
  readonly seo: CreationSeo;
}

export interface PortfolioData {
  readonly site: SiteSettings;
  readonly profile: Profile;
  readonly categories: readonly Category[];
  readonly creations: readonly Creation[];
}