import { FiBookOpen } from "react-icons/fi";
import ContentImage from "@/components/ui/ContentImage";
import { isPlaceholderText } from "@/lib/placeholder";
import type { Category } from "@/types/category";
import type { Creation } from "@/types/creation";
import MediaPlayer from "./MediaPlayer";
import ProductPanel from "./ProductPanel";

interface CreationDetailProps {
  readonly category: Category;
  readonly creation: Creation;
}

function getPublishedDate(value: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function getCreator(value: string): string | undefined {
  const creator = value.trim();
  if (isPlaceholderText(creator)) {
    return undefined;
  }

  return creator;
}

export default function CreationDetail({
  category,
  creation,
}: CreationDetailProps) {
  const publishedDate = getPublishedDate(creation.publishedAt);
  const creator = getCreator(creation.creator);
  const description = creation.description.trim();
  const paragraphs = description
    ? description.split(/\r?\n/).filter((paragraph) => paragraph.trim())
    : [creation.excerpt];

  return (
    <article className="creation-detail">
      <header className="creation-detail-heading">
        <p className="section-eyebrow">{category.singular}</p>
        <h1 className="catalog-title">{creation.title}</h1>
        {creation.subtitle && (
          <p className="creation-detail-subtitle">{creation.subtitle}</p>
        )}
        {creation.excerpt && (
          <p className="creation-detail-excerpt">{creation.excerpt}</p>
        )}
        {(publishedDate || creator) && (
          <div className="creation-detail-meta">
            {publishedDate && (
              <time dateTime={creation.publishedAt}>{publishedDate}</time>
            )}
            {creator && <span>Creator: {creator}</span>}
          </div>
        )}
      </header>

      <div
        className={`creation-detail-layout${creation.product.isForSale ? " with-product-panel" : ""}`}
      >
        <div className="creation-detail-main">
          <div className="creation-detail-cover">
            <ContentImage
              src={creation.coverImage}
              alt={`${creation.title} — cover`}
              sizes="(max-width: 48rem) 100vw, 42rem"
              className="creation-detail-image"
              fallback={<FiBookOpen aria-hidden="true" />}
              priority
            />
          </div>
          <div className="creation-detail-body">
            {paragraphs.map((paragraph, index) => (
              <p key={`${creation.id}-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
          <MediaPlayer media={creation.media} title={creation.title} />
        </div>
        {creation.product.isForSale && (
          <aside className="creation-detail-aside">
            <ProductPanel product={creation.product} />
          </aside>
        )}
      </div>
    </article>
  );
}