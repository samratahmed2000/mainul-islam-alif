import {
  FiBriefcase,
  FiHome,
  FiTrendingUp,
  FiPenTool,
  FiStar,
} from "react-icons/fi";
import EmptyState from "@/components/ui/EmptyState";
import { isPlaceholderText } from "@/lib/placeholder";
import type { ProfessionalJourney } from "@/types/profile";

interface JourneyCardProps {
  readonly entries: readonly ProfessionalJourney[];
}

const JOURNEY_ICONS = [
  FiBriefcase,
  FiTrendingUp,
  FiHome,
  FiPenTool,
  FiStar,
];

export default function JourneyCard({ entries }: JourneyCardProps) {
  const verifiedEntries = entries.filter(
    (entry) =>
      !isPlaceholderText(entry.title) &&
      !isPlaceholderText(entry.description) &&
      (entry.organization.trim() !== "" ||
        entry.period.trim() !== "" ||
        entry.description.trim() !== ""),
  );

  if (verifiedEntries.length === 0) {
    return (
      <EmptyState
        title="Professional details coming soon"
        description="Verified career information will be added here once available."
      />
    );
  }

  return (
    <ol className="journey-list">
      {verifiedEntries.map((entry) => {
        const iconIndex = entries.findIndex((item) => item.id === entry.id);
        const Icon = JOURNEY_ICONS[iconIndex % JOURNEY_ICONS.length];
        const details = [entry.period, entry.organization].filter(Boolean);

        return (
          <li className="profile-card journey-card" key={entry.id}>
            <span className="profile-card-icon" aria-hidden="true">
              <Icon />
            </span>
            <div>
              <h3 className="profile-card-title">{entry.title}</h3>
              {details.length > 0 && (
                <p className="profile-card-meta">{details.join(" · ")}</p>
              )}
              {entry.description.trim() !== "" && (
                <p className="profile-card-description">
                  {entry.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
