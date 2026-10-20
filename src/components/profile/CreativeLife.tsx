import {
  FiCompass,
  FiFeather,
  FiHeart,
  FiSun,
} from "react-icons/fi";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProfileSection } from "@/types/profile";

interface CreativeLifeProps {
  readonly entries: readonly ProfileSection[];
}

const CREATIVE_ICONS = [FiFeather, FiSun, FiHeart, FiCompass];

function isPlaceholder(value: string): boolean {
  return /লেখকের নিজস্ব বক্তব্য যোগ করুন|এখানে .*যোগ করুন/u.test(value);
}

export default function CreativeLife({ entries }: CreativeLifeProps) {
  const verifiedEntries = entries.filter(
    (entry) =>
      !isPlaceholder(entry.title) &&
      !isPlaceholder(entry.description) &&
      entry.title.trim() !== "" &&
      entry.description.trim() !== "",
  );

  return (
    <section className="profile-section" aria-labelledby="creative-life-heading">
      <SectionHeading
        id="creative-life-heading"
        eyebrow="সৃজনশীলতা"
        title="সৃজনশীল জীবন"
      />
      {verifiedEntries.length > 0 ? (
        <ul className="profile-card-grid">
          {verifiedEntries.map((entry) => {
            const iconIndex = entries.findIndex((item) => item.id === entry.id);
            const Icon = CREATIVE_ICONS[iconIndex % CREATIVE_ICONS.length];
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
          title="সৃজনশীল জীবনের তথ্য সংযোজনাধীন"
          description="লেখকের নিজস্ব, যাচাইকৃত বক্তব্য পাওয়া গেলে এখানে যুক্ত করা হবে।"
        />
      )}
    </section>
  );
}