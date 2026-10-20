export interface NavigationItem {
  readonly href: string;
  readonly label: string;
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { href: "/", label: "হোম" },
  { href: "/about", label: "পরিচিতি" },
  { href: "/creations", label: "সৃষ্টিকর্ম" },
  { href: "/contact", label: "যোগাযোগ" },
];