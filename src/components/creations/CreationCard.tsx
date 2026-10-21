import Link from "next/link";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import ContentImage from "@/components/ui/ContentImage";
import type { Category } from "@/types/category";
import type { Creation } from "@/types/creation";

interface CreationCardProps {
  readonly creation: Creation;
  readonly category: Category;
}

export default function CreationCard({
  creation,
  category,
}: CreationCardProps) {
  return (
    <article className="creation-card">
      <Link
        className="creation-card-link"
        href={`/creations/${category.slug}/${creation.slug}`}
      >
        <div className="creation-card-cover">
          <ContentImage
            src={creation.coverImage}
            alt={`${creation.title} — cover`}
            sizes="(max-width: 40rem) 82vw, (max-width: 64rem) 42vw, 20rem"
            className="creation-card-image"
            fallback={<FiBookOpen aria-hidden="true" />}
          />
          <span className="creation-card-category">{category.name}</span>
        </div>
        <div className="creation-card-copy">
          <p className="creation-card-type">{category.singular}</p>
          <h3 className="creation-card-title">{creation.title}</h3>
          {creation.excerpt && (
            <p className="creation-card-excerpt">{creation.excerpt}</p>
          )}
          <span className="creation-card-more">
            Read more
            <FiArrowRight aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
