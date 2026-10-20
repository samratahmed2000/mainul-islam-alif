interface SectionHeadingProps {
  readonly title: string;
  readonly eyebrow?: string;
  readonly description?: string;
  readonly className?: string;
  readonly id?: string;
}

export default function SectionHeading({
  title,
  eyebrow,
  description,
  className = "",
  id,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-heading">
        {title}
      </h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
