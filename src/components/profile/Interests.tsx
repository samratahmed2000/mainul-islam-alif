import {
  FiBookOpen,
  FiZap,
  FiMusic,
  FiEdit3,
} from "react-icons/fi";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import { isPlaceholderText } from "@/lib/placeholder";
import type { ProfileSection } from "@/types/profile";

interface InterestsProps {
  readonly entries: readonly ProfileSection[];
}

const INTEREST_ICONS = [FiBookOpen, FiMusic, FiEdit3, FiZap];

export default function Interests({ entries }: InterestsProps) {
  const verifiedEntries = entries.filter(
    (entry) =>
      !isPlaceholderText(entry.title) &&
      !isPlaceholderText(entry.description),
  );

  return (
    <section className="profile-section" aria-labelledby="interests-heading">
      <SectionHeading
        id="interests-heading"
        eyebrow="Personal interests"
        title="Interests and pastimes"
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
          title="Interests coming soon"
          description="The author's confirmed interests and pastimes will be added here."
        />
      )}
    </section>
  );
}
