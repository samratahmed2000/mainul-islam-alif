
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CreationGrid from "@/components/creations/CreationGrid";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import { getCategories, getCategoryBySlug, getCreationsByCategory } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

interface CategoryPageProps {
  readonly params: Promise<{ category: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return getCategories().map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return {
    title: category.name,
    description: category.description,
    alternates: {
      canonical: getCanonicalUrl(`/creations/${category.slug}`),
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const creations = getCreationsByCategory(category.slug);

  return (
    <Container className="catalog-page">
      <header className="catalog-heading">
        <p className="section-eyebrow">Collection</p>
        <h1 className="catalog-title">{category.name}</h1>
        <p className="catalog-description">{category.description}</p>
        <p className="catalog-count">
          Published works: {creations.length.toLocaleString("en-US")}
        </p>
      </header>
      {creations.length > 0 ? (
        <CreationGrid category={category} creations={creations} />
      ) : (
        <EmptyState
          title={`No published work in ${category.name} yet`}
          description="Verified work will appear here once it is published."
        />
      )}
    </Container>
  );
}