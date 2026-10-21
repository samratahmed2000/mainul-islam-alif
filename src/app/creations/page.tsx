
import type { Metadata } from "next";
import CategoryGrid from "@/components/creations/CategoryGrid";
import Container from "@/components/ui/Container";
import { getCategories, getCreationsByCategory } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Creations",
  description:
    "A collection of poems, stories, books, Islamic music, and other creative work.",
  alternates: {
    canonical: getCanonicalUrl("/creations"),
  },
};

export default function CreationsPage() {
  const categories = getCategories();
  const categoriesWithCounts = categories.map((category) => ({
    category,
    creationCount: getCreationsByCategory(category.slug).length,
  }));

  return (
    <Container className="catalog-page">
      <header className="catalog-heading">
        <p className="section-eyebrow">The collection</p>
        <h1 className="catalog-title">Creations</h1>
        <p className="catalog-description">
          Explore published poems, stories, books, music, and other work across
          the collections.
        </p>
      </header>
      <CategoryGrid categories={categoriesWithCounts} />
    </Container>
  );
}