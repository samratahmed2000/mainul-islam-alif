import {
  FiBookOpen,
  FiCpu,
  FiDroplet,
  FiAward,
  FiBookmark,
} from "react-icons/fi";
import EmptyState from "@/components/ui/EmptyState";
import type { Education } from "@/types/profile";

interface EducationCardProps {
  readonly entries: readonly Education[];
}

const EDUCATION_ICONS = [
  FiAward,
  FiDroplet,
  FiBookOpen,
  FiCpu,
  FiBookmark,
];

export default function EducationCard({ entries }: EducationCardProps) {
  const visibleEntries = entries.filter((entry) => entry.degree.trim() !== "");

  if (visibleEntries.length === 0) {
    return (
      <EmptyState
        title="Education details coming soon"
        description="Verified education information will be added here once available."
      />
    );
  }

  return (
    <ul className="education-grid">
      {visibleEntries.map((entry) => {
        const iconIndex = entries.findIndex((item) => item.id === entry.id);
        const Icon = EDUCATION_ICONS[iconIndex % EDUCATION_ICONS.length];
        const details = [
          entry.institution,
          entry.department,
          entry.year,
          entry.result,
        ].filter((value) => value.trim() !== "");

        return (
          <li className="profile-card education-card" key={entry.id}>
            <span className="profile-card-icon" aria-hidden="true">
              <Icon />
            </span>
            <div>
              <h3 className="profile-card-title">{entry.degree}</h3>
              {details.length > 0 && (
                <p className="profile-card-meta">{details.join(" · ")}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}