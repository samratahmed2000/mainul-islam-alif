import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import { isPlaceholderText } from "@/lib/placeholder";

interface PersonalWorldsProps {
  readonly paragraphs: readonly string[];
}

export default function PersonalWorlds({
  paragraphs,
}: PersonalWorldsProps) {
  const verifiedParagraphs = paragraphs.filter(
    (paragraph) => !isPlaceholderText(paragraph),
  );

  return (
    <section className="profile-section personal-words-section">
      <SectionHeading
        id="personal-words-heading"
        eyebrow="In my own words"
        title="A few words from me"
      />
      {verifiedParagraphs.length > 0 ? (
        <div
          className="personal-words"
          aria-labelledby="personal-words-heading"
        >
          {verifiedParagraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph}`}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <EmptyState
          title="A personal note is coming soon"
          description="The author's own words will be published here once available."
        />
      )}
    </section>
  );
}
