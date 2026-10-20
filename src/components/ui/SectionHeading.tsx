interface SectionHeadingProps {
  readonly title: string;
  readonly eyebrow?: string;
  readonly description?: string;
  readonly className?: string;
}

export default function SectionHeading({
  title,
  eyebrow,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-heading">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
