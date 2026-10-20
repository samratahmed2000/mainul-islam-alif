import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";

interface PersonalWorldsProps {
  readonly paragraphs: readonly string[];
}

function isPlaceholder(value: string): boolean {
  return /এখানে লেখকের নিজের ভাষায় .*যোগ করুন/u.test(value);
}

export default function PersonalWorlds({
  paragraphs,
}: PersonalWorldsProps) {
  const verifiedParagraphs = paragraphs.filter(
    (paragraph) => paragraph.trim() !== "" && !isPlaceholder(paragraph),
  );

  return (
    <section className="profile-section personal-words-section">
      <SectionHeading
        id="personal-words-heading"
        eyebrow="নিজের কথা"
        title="আমার কিছু কথা"
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
          title="নিজের বক্তব্য সংযোজনাধীন"
          description="লেখকের নিজের ভাষায় বক্তব্য পাওয়া গেলে এখানে প্রকাশ করা হবে।"
        />
      )}
    </section>
  );
}