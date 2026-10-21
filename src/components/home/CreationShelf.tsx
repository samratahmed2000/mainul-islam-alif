import Link from "next/link";
import CreationCarousel from "@/components/creations/CreationCarousel";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Category } from "@/types/category";
import type { Creation } from "@/types/creation";

interface CreationShelfProps {
  readonly category: Category;
  readonly creations: readonly Creation[];
}

export default function CreationShelf({
  category,
  creations,
}: CreationShelfProps) {
  const featuredCreations = creations.slice(0, 6);

  return (
    <section className="home-shelf" aria-labelledby={`shelf-${category.id}`}>
      <div className="home-shelf-heading">
        <SectionHeading
          id={`shelf-${category.id}`}
          title={category.name}
        />
        <Link className="shelf-view-all" href={`/creations/${category.slug}`}>
          View all
        </Link>
      </div>
      {featuredCreations.length > 0 ? (
        <CreationCarousel
          category={category}
          creations={featuredCreations}
        />
      ) : (
        <EmptyState
          title={category.name}
          description="No published works in this collection yet."
        />
      )}
    </section>
  );
}
