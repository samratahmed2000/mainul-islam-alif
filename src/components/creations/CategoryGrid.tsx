import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiBook,
  FiBookOpen,
  FiArrowUpRight,
  FiFeather,
  FiGrid,
  FiLayers,
  FiMusic,
  FiVideo,
} from "react-icons/fi";
import type { Category } from "@/types/category";

interface CategoryGridItem {
  readonly category: Category;
  readonly creationCount: number;
}

interface CategoryGridProps {
  readonly categories: readonly CategoryGridItem[];
}

const CATEGORY_ICONS: Readonly<Record<string, IconType>> = {
  Feather: FiFeather,
  BookOpenText: FiBookOpen,
  Book: FiBook,
  Music: FiMusic,
  LibraryBig: FiLayers,
  Clapperboard: FiVideo,
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="category-grid">
      {categories.map(({ category, creationCount }) => {
        const Icon = CATEGORY_ICONS[category.icon] ?? FiGrid;

        return (
          <article className="category-card" key={category.id}>
            <Link
              className="category-card-link"
              href={`/creations/${category.slug}`}
            >
              <span className="category-card-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="category-card-copy">
                <span className="category-card-name">{category.name}</span>
                <span className="category-card-description">
                  {category.description}
                </span>
                <span className="category-card-count">
                  প্রকাশিত কাজ: {creationCount.toLocaleString("bn-BD")}টি
                </span>
              </span>
              <span className="category-card-arrow" aria-hidden="true">
                <FiArrowUpRight />
              </span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
