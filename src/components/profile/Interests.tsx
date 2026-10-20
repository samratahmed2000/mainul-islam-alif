import {
  FiBookOpen,
  FiZap,
  FiMusic,
  FiEdit3,
} from "react-icons/fi";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProfileSection } from "@/types/profile";

interface InterestsProps {
  readonly entries: readonly ProfileSection[];
}

const INTEREST_ICONS = [FiBookOpen, FiMusic, FiEdit3, FiZap];

function isPlaceholder(value: string): boolean {
  return /ব্যক্তির প্রকৃত পছন্দ অনুযায়ী সম্পাদনা করুন|এখানে .*যোগ করুন/u.test(value);
}

export default function Interests({ entries }: InterestsProps) {
  const verifiedEntries = entries.filter(
    (entry) =>
      !isPlaceholder(entry.title) &&
      !isPlaceholder(entry.description) &&
      entry.title.trim() !== "" &&
      entry.description.trim() !== "",
  );

  return (
    <section className="profile-section" aria-labelledby="interests-heading">
      <SectionHeading
        id="interests-heading"
        eyebrow="ব্যক্তিগত আগ্রহ"
        title="আগ্রহ ও শখ"
      />
      {verifiedEntries.length > 0 ? (
        <ul className="profile-card-grid">
          {verifiedEntries.map((entry) => {
            const iconIndex = entries.findIndex((item) => item.id === entry.id);
            const Icon = INTEREST_ICONS[iconIndex % INTEREST_ICONS.length];
            return (
              <li className="profile-card" key={entry.id}>
                <span className="profile-card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="profile-card-title">{entry.title}</h3>
                <p className="profile-card-description">{entry.description}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState
          title="আগ্রহ ও শখের তথ্য সংযোজনাধীন"
          description="ব্যক্তির নিশ্চিত করা পছন্দ ও আগ্রহ পাওয়া গেলে এখানে যুক্ত করা হবে।"
        />
      )}
    </section>
  );
}