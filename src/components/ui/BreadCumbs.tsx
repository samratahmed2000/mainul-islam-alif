import Link from "next/link";

export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
}

interface BreadCumbsProps {
  readonly items: readonly BreadcrumbItem[];
}

export default function BreadCumbs({ items }: BreadCumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item.href ?? item.label}>
              {item.href && !isCurrent ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}