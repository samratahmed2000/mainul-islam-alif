import type { Metadata } from "next";
import CTASection from "@/components/home/CTASection";
import CreationShelf from "@/components/home/CreationShelf";
import Hero from "@/components/home/Hero";
import Container from "@/components/ui/Container";
import { getCategories, getPublishedCreations } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home",
  description:
    "The personal introduction, writing, books, Islamic music, and creative archive of Mainul Islam Alif.",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
};

export default function Homepage() {
  const categories = getCategories();
  const publishedCreations = getPublishedCreations();

  return (
    <>
      <Hero />
      <Container className="home-shelves">
        {categories.map((category) => (
          <CreationShelf
            key={category.id}
            category={category}
            creations={publishedCreations.filter(
              (creation) => creation.categoryId === category.id,
            )}
          />
        ))}
      </Container>
      <CTASection />
    </>
  );
}
