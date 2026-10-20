import "server-only";

import contentJson from "../../db.json";
import type { Category } from "@/types/category";
import type {
  Creation,
  CreationMedia,
  CreationSeo,
  CreationStatus,
  PortfolioData,
  Product,
} from "@/types/creation";
import type { Profile } from "@/types/profile";
import type { SiteSettings } from "@/types/site";

const rawContent: unknown = contentJson;
const data = deepFreeze(parsePortfolioData(rawContent));

interface RawProduct extends Product {
  readonly fileUrl: string;
}

interface RawCreation extends Omit<Creation, "product"> {
  readonly product: RawProduct;
}

export function getSiteSettings(): SiteSettings {
  return data.site;
}

export function getProfile(): Profile {
  return data.profile;
}

export function getCategories(): readonly Category[] {
  return [...data.categories].sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((category) => category.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return data.categories.find((category) => category.id === id);
}

export function getPublishedCreations(): readonly Creation[] {
  return data.creations.filter((creation) => creation.status === "published");
}

export function getCreationsByCategory(categorySlug: string): readonly Creation[] {
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return [];
  }

  return getPublishedCreations().filter(
    (creation) => creation.categoryId === category.id,
  );
}

export function getCreationBySlug(
  categorySlug: string,
  creationSlug: string,
): Creation | undefined {
  return getCreationsByCategory(categorySlug).find(
    (creation) => creation.slug === creationSlug,
  );
}

function parsePortfolioData(value: unknown): PortfolioData {
  if (!isRecord(value)) {
    throw new Error("Invalid db.json: expected a JSON object at the root.");
  }

  const site = expectValid(value.site, isSiteSettings, "site");
  const profile = expectValid(value.profile, isProfile, "profile");
  const categories = expectArray(value.categories, isCategory, "categories");
  const rawCreations = expectArray(value.creations, isCreation, "creations");
  const issues: string[] = [];

  const categoryIds = new Set<string>();
  const categorySlugs = new Set<string>();
  const categoryOrders = new Set<number>();
  const creationIds = new Set<string>();
  const creationSlugs = new Set<string>();
  const profileCollections: readonly (readonly [string, readonly { readonly id: string }[]])[] =
    [
      ["profile.professionalJourney", profile.professionalJourney],
      ["profile.education", profile.education],
      ["profile.creativeLife", profile.creativeLife],
      ["profile.interests", profile.interests],
    ];

  for (const [path, entries] of profileCollections) {
    const ids = new Set<string>();
    for (const entry of entries) {
      if (ids.has(entry.id)) {
        issues.push(`duplicate id "${entry.id}" in ${path}`);
      }
      ids.add(entry.id);
    }
  }

  for (const category of categories) {
    if (categoryIds.has(category.id)) {
      issues.push(`duplicate category id "${category.id}"`);
    }
    if (categorySlugs.has(category.slug)) {
      issues.push(`duplicate category slug "${category.slug}"`);
    }
    if (categoryOrders.has(category.order)) {
      issues.push(`duplicate category order "${category.order}"`);
    }

    categoryIds.add(category.id);
    categorySlugs.add(category.slug);
    categoryOrders.add(category.order);
  }

  for (const creation of rawCreations) {
    if (!categoryIds.has(creation.categoryId)) {
      issues.push(
        `creation "${creation.id}" references unknown category "${creation.categoryId}"`,
      );
    }
    if (creationIds.has(creation.id)) {
      issues.push(`duplicate creation id "${creation.id}"`);
    }
    if (creationSlugs.has(creation.slug)) {
      issues.push(`duplicate creation slug "${creation.slug}"`);
    }

    creationIds.add(creation.id);
    creationSlugs.add(creation.slug);
  }

  if (issues.length > 0) {
    throw new Error(`Invalid db.json: ${issues.join("; ")}.`);
  }

  return {
    site,
    profile,
    categories,
    creations: rawCreations.map(toPublicCreation),
  };
}

function isSiteSettings(value: unknown): value is SiteSettings {
  if (!isRecord(value) || !isRecord(value.socialLinks) || !isRecord(value.contact)) {
    return false;
  }

  return (
    hasNonEmptyStrings(value, ["name", "language"]) &&
    hasStrings(value, [
      "name",
      "designation",
      "tagline",
      "language",
      "description",
      "logo",
      "heroImage",
      "profileImage",
      "ctaImage",
      "scheduleUrl",
      "currency",
    ]) &&
    hasStrings(value.socialLinks, ["facebook", "youtube", "instagram", "whatsapp"]) &&
    hasStrings(value.contact, ["email", "phone", "address", "availability"])
  );
}

function isProfile(value: unknown): value is Profile {
  if (
    !isRecord(value) ||
    !hasStrings(value, [
      "intro",
      "background",
      "personality",
      "professionalSummary",
      "writingAndMusicOverview",
    ])
  ) {
    return false;
  }

  return (
    isArrayOfRecords(value.professionalJourney, (entry) =>
      hasStrings(entry, ["id", "title", "organization", "period", "description", "icon"]) &&
      hasNonEmptyStrings(entry, ["id", "title"]),
    ) &&
    isArrayOfRecords(value.education, (entry) =>
      hasStrings(entry, [
        "id",
        "degree",
        "institution",
        "department",
        "year",
        "result",
        "icon",
      ]) && hasNonEmptyStrings(entry, ["id", "degree"]),
    ) &&
    isArrayOfRecords(value.creativeLife, isProfileSection) &&
    isArrayOfRecords(value.interests, isProfileSection) &&
    Array.isArray(value.personalWords) &&
    value.personalWords.every(isString)
  );
}

function isProfileSection(value: Record<string, unknown>): boolean {
  return (
    hasStrings(value, ["id", "title", "description", "icon"]) &&
    hasNonEmptyStrings(value, ["id", "title"])
  );
}

function isCategory(value: unknown): value is Category {
  return (
    isRecord(value) &&
    hasStrings(value, ["id", "slug", "name", "singular", "description", "icon"]) &&
    hasNonEmptyStrings(value, ["id", "slug", "name"]) &&
    typeof value.order === "number" &&
    Number.isInteger(value.order)
  );
}

function isCreation(value: unknown): value is RawCreation {
  if (
    !isRecord(value) ||
    !hasStrings(value, [
      "id",
      "slug",
      "categoryId",
      "title",
      "subtitle",
      "excerpt",
      "description",
      "coverImage",
      "publishedAt",
      "creator",
    ]) ||
    !hasNonEmptyStrings(value, ["id", "slug", "categoryId", "title"]) ||
    typeof value.featured !== "boolean" ||
    !Array.isArray(value.tags) ||
    !value.tags.every(isString) ||
    !isProduct(value.product) ||
    !isCreationMedia(value.media) ||
    !isCreationSeo(value.seo)
  ) {
    return false;
  }

  return isCreationStatus(value.status);
}

function isProduct(value: unknown): value is RawProduct {
  return (
    isRecord(value) &&
    typeof value.isForSale === "boolean" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    hasStrings(value, [
      "currency",
      "productType",
      "fileUrl",
      "previewUrl",
      "license",
    ]) &&
    (value.stock === null ||
      (typeof value.stock === "number" &&
        Number.isFinite(value.stock) &&
        value.stock >= 0))
  );
}

function isCreationMedia(value: unknown): value is CreationMedia {
  return (
    isRecord(value) &&
    hasStrings(value, [
      "type",
      "youtubeUrl",
      "youtubeVideoId",
      "audioUrl",
      "previewText",
    ])
  );
}

function isCreationSeo(value: unknown): value is CreationSeo {
  return isRecord(value) && hasStrings(value, ["title", "description"]);
}

function isCreationStatus(value: unknown): value is CreationStatus {
  return value === "draft" || value === "published" || value === "archived";
}

function isArrayOfRecords(
  value: unknown,
  predicate: (entry: Record<string, unknown>) => boolean,
): boolean {
  return (
    Array.isArray(value) &&
    value.every((entry) => isRecord(entry) && predicate(entry))
  );
}

function hasStrings(
  record: Record<string, unknown>,
  keys: readonly string[],
): boolean {
  return keys.every((key) => isString(record[key]));
}

function hasNonEmptyStrings(
  record: Record<string, unknown>,
  keys: readonly string[],
): boolean {
  return keys.every(
    (key) => isString(record[key]) && record[key].trim().length > 0,
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function expectValid<T>(
  value: unknown,
  guard: (candidate: unknown) => candidate is T,
  path: string,
): T {
  if (!guard(value)) {
    throw new Error(`Invalid db.json: "${path}" is missing required fields or has invalid values.`);
  }

  return value;
}

function expectArray<T>(
  value: unknown,
  guard: (candidate: unknown) => candidate is T,
  path: string,
): readonly T[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid db.json: "${path}" must be an array.`);
  }

  return value.map((entry, index) =>
    expectValid(entry, guard, `${path}[${index}]`),
  );
}

function toPublicCreation(creation: RawCreation): Creation {
  return {
    id: creation.id,
    slug: creation.slug,
    categoryId: creation.categoryId,
    title: creation.title,
    subtitle: creation.subtitle,
    excerpt: creation.excerpt,
    description: creation.description,
    coverImage: creation.coverImage,
    publishedAt: creation.publishedAt,
    status: creation.status,
    featured: creation.featured,
    tags: [...creation.tags],
    creator: creation.creator,
    product: {
      isForSale: creation.product.isForSale,
      price: creation.product.price,
      currency: creation.product.currency,
      productType: creation.product.productType,
      previewUrl: creation.product.previewUrl,
      license: creation.product.license,
      stock: creation.product.stock,
    },
    media: {
      type: creation.media.type,
      youtubeUrl: creation.media.youtubeUrl,
      youtubeVideoId: creation.media.youtubeVideoId,
      audioUrl: creation.media.audioUrl,
      previewText: creation.media.previewText,
    },
    seo: {
      title: creation.seo.title,
      description: creation.seo.description,
    },
  };
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach((nestedValue) => deepFreeze(nestedValue));
  }

  return value;
}