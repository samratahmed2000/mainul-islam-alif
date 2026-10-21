import {
  FiCompass,
  FiFeather,
  FiHeart,
  FiSun,
} from "react-icons/fi";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import { isPlaceholderText } from "@/lib/placeholder";
import type { ProfileSection } from "@/types/profile";

interface CreativeLifeProps {
  readonly entries: readonly ProfileSection[];
}

const CREATIVE_ICONS = [FiFeather, FiSun, FiHeart, FiCompass];

export default function CreativeLife({ entries }: CreativeLifeProps) {
  const verifiedEntries = entries.filter(
    (entry) =>
      !isPlaceholderText(entry.title) &&
      !isPlaceholderText(entry.description),
  );

  return (
    <section className="profile-section" aria-labelledby="creative-life-heading">
      <SectionHeading
        id="creative-life-heading"
        eyebrow="Creativity"
        title="A creative life"
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
          title="Creative life details coming soon"
          description="Verified words from the author will be published here once available."
        />
      )}
    </section>
  );
}
