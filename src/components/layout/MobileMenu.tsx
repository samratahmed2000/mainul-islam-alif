"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import type { NavigationItem } from "@/lib/constants";

interface MobileMenuProps {
  readonly items: readonly NavigationItem[];
  readonly scheduleHref: string;
  readonly scheduleExternal: boolean;
}

export default function MobileMenu({
  items,
  scheduleHref,
  scheduleExternal,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        ref={toggleRef}
        className="mobile-menu-toggle"
        type="button"
        aria-label={isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>
      <nav
        ref={menuRef}
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="মোবাইল প্রধান নেভিগেশন"
        aria-hidden={!isOpen}
        data-open={isOpen}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            className="navigation-link"
            href={item.href}
            tabIndex={isOpen ? undefined : -1}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
        {scheduleExternal ? (
          <a
            className="schedule-link"
            href={scheduleHref}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isOpen ? undefined : -1}
            onClick={closeMenu}
          >
            সময় নির্ধারণ করুন
          </a>
        ) : (
          <Link
            className="schedule-link"
            href={scheduleHref}
            tabIndex={isOpen ? undefined : -1}
            onClick={closeMenu}
          >
            সময় নির্ধারণ করুন
          </Link>
        )}
      </nav>
    </>
  );
}