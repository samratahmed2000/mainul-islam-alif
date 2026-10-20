"use client";

import { useId, useRef, type KeyboardEvent } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CreationCard from "@/components/creations/CreationCard";
import type { Category } from "@/types/category";
import type { Creation } from "@/types/creation";

interface CreationCarouselProps {
  readonly category: Category;
  readonly creations: readonly Creation[];
}

export default function CreationCarousel({
  category,
  creations,
}: CreationCarouselProps) {
  const listId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  function scrollList(direction: -1 | 1) {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const card = list.querySelector<HTMLElement>(".creation-card");
    const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 16;
    list.scrollBy({
      left: direction * ((card?.offsetWidth ?? list.clientWidth) + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }
    event.preventDefault();
    scrollList(event.key === "ArrowLeft" ? -1 : 1);
  }

  return (
    <div className="creation-carousel">
      <div
        id={listId}
        ref={listRef}
        className="creation-carousel-track"
        role="region"
        aria-label={`${category.name} সৃষ্টিকর্ম`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {creations.map((creation) => (
          <CreationCard
            key={creation.id}
            creation={creation}
            category={category}
          />
        ))}
      </div>
      {creations.length > 1 && (
        <div className="creation-carousel-controls">
          <button
            className="carousel-control"
            type="button"
            aria-label={`${category.name}: আগের সৃষ্টিকর্ম`}
            aria-controls={listId}
            onClick={() => scrollList(-1)}
          >
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button
            className="carousel-control"
            type="button"
            aria-label={`${category.name}: পরের সৃষ্টিকর্ম`}
            aria-controls={listId}
            onClick={() => scrollList(1)}
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}