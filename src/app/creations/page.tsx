
import type { Metadata } from "next";
import CategoryGrid from "@/components/creations/CategoryGrid";
import Container from "@/components/ui/Container";
import { getCategories, getCreationsByCategory } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "সৃষ্টিকর্ম",
  description: "কবিতা, গল্প, বই, ইসলামী সংগীত ও অন্যান্য সৃষ্টিকর্মের সংগ্রহ।",
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
        <p className="section-eyebrow">সৃজনের সংগ্রহ</p>
        <h1 className="catalog-title">সৃষ্টিকর্ম</h1>
        <p className="catalog-description">
          বিভিন্ন বিভাগে প্রকাশিত কবিতা, গল্প, বই, সংগীত ও অন্যান্য কাজ দেখুন।
        </p>
      </header>
      <CategoryGrid categories={categoriesWithCounts} />
    </Container>
  );
}