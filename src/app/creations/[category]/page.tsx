
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
        <p className="section-eyebrow">সৃষ্টিকর্মের বিভাগ</p>
        <h1 className="catalog-title">{category.name}</h1>
        <p className="catalog-description">{category.description}</p>
        <p className="catalog-count">
          প্রকাশিত সৃষ্টিকর্ম: {creations.length.toLocaleString("bn-BD")}টি
        </p>
      </header>
      {creations.length > 0 ? (
        <CreationGrid category={category} creations={creations} />
      ) : (
        <EmptyState
          title={`${category.name} বিভাগে প্রকাশিত কাজ নেই`}
          description="যাচাইকৃত সৃষ্টিকর্ম প্রকাশিত হলে এখানে দেখা যাবে।"
        />
      )}
    </Container>
  );
}