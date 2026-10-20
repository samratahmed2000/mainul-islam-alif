interface EmptyStateProps {
  readonly title: string;
  readonly description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
    </div>
  );
}
