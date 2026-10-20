import CreationCard from "@/components/creations/CreationCard";
import type { Category } from "@/types/category";
import type { Creation } from "@/types/creation";

interface CreationGridProps {
  readonly category: Category;
  readonly creations: readonly Creation[];
}

export default function CreationGrid({
  category,
  creations,
}: CreationGridProps) {
  return (
    <div className="creation-grid">
      {creations.map((creation) => (
        <CreationCard
          key={creation.id}
          category={category}
          creation={creation}
        />
      ))}
    </div>
  );
}