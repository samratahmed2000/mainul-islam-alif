export interface NavigationItem {
  readonly href: string;
  readonly label: string;
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/creations", label: "Creations" },
  { href: "/contact", label: "Contact" },
];
