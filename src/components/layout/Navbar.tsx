import Link from "next/link";
import MobileMenu from "@/components/layout/MobileMenu";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { getSiteSettings } from "@/lib/data";

function isWebUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export default function Navbar() {
  const { name, scheduleUrl } = getSiteSettings();
  const hasScheduleUrl = isWebUrl(scheduleUrl);
  const scheduleHref = hasScheduleUrl ? scheduleUrl : "/contact";

  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <Link className="brand-link" href="/" aria-label={`${name} — হোম`}>
          <span className="brand-mark" aria-hidden="true">
            ম
          </span>
          <span>{name}</span>
        </Link>

        <nav className="desktop-navigation" aria-label="প্রধান নেভিগেশন">
          {NAVIGATION_ITEMS.map((item) => (
            <Link key={item.href} className="navigation-link" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        {hasScheduleUrl ? (
          <a
            className="schedule-link header-schedule-link"
            href={scheduleHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            সময় নির্ধারণ করুন
          </a>
        ) : (
          <Link
            className="schedule-link header-schedule-link"
            href="/contact"
          >
            সময় নির্ধারণ করুন
          </Link>
        )}

        <MobileMenu
          items={NAVIGATION_ITEMS}
          scheduleHref={scheduleHref}
          scheduleExternal={hasScheduleUrl}
        />
      </div>
    </header>
  );
}