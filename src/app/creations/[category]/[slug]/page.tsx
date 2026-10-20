import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CreationDetail from "@/components/creations/CreationDetail";
import CreationGrid from "@/components/creations/CreationGrid";
import type { BreadcrumbItem } from "@/components/ui/BreadCumbs";
import BreadCumbs from "@/components/ui/BreadCumbs";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  getCategoryBySlug,
  getCreationBySlug,
  getCreationsByCategory,
} from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

interface CreationPageProps {
  readonly params: Promise<{ category: string; slug: string }>;
}

export const instant = false;

export async function generateMetadata({
  params,
}: CreationPageProps): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const creation = getCreationBySlug(categorySlug, slug);

  if (!creation) {
    notFound();
  }

  return {
    title: creation.seo.title || creation.title,
    description: creation.seo.description || creation.excerpt,
    alternates: {
      canonical: getCanonicalUrl(
        `/creations/${categorySlug}/${creation.slug}`,
      ),
    },
    openGraph: {
      title: creation.seo.title || creation.title,
      description: creation.seo.description || creation.excerpt,
      type: "article",
      ...(creation.coverImage.startsWith("/") &&
      !creation.coverImage.startsWith("//")
        ? { images: [creation.coverImage] }
        : {}),
    },
  };
}

export default async function CreationPage({ params }: CreationPageProps) {
  const { category: categorySlug, slug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const creation = getCreationBySlug(categorySlug, slug);

  if (!category || !creation) {
    notFound();
  }

  const relatedCreations = getCreationsByCategory(category.slug)
    .filter((item) => item.id !== creation.id)
    .slice(0, 3);
  const breadcrumbs: readonly BreadcrumbItem[] = [
    { label: "সৃষ্টিকর্ম", href: "/creations" },
    { label: category.name, href: `/creations/${category.slug}` },
    { label: creation.title },
  ];

  return (
    <Container className="catalog-page creation-detail-page">
      <BreadCumbs items={breadcrumbs} />
      <CreationDetail category={category} creation={creation} />
      {relatedCreations.length > 0 && (
        <section className="related-creations" aria-labelledby="related-heading">
          <SectionHeading
            id="related-heading"
            eyebrow="আরও পড়ুন ও দেখুন"
            title={`${category.name} বিভাগের আরও কাজ`}
          />
          <CreationGrid category={category} creations={relatedCreations} />
        </section>
      )}
    </Container>
  );
}
