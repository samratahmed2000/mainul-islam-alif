"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

interface ContentImageProps {
  readonly src: string;
  readonly alt: string;
  readonly sizes: string;
  readonly className?: string;
  readonly fallback: ReactNode;
  readonly priority?: boolean;
}

export default function ContentImage({
  src,
  alt,
  sizes,
  className = "",
  fallback,
  priority = false,
}: ContentImageProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const hasLocalSource = src.startsWith("/") && !src.startsWith("//");

  if (!hasLocalSource) {
    return (
      <div className={`content-image-fallback ${className}`.trim()} aria-hidden="true">
        {fallback}
      </div>
    );
  }

  return (
    <>
      {/* Keep the artwork fallback underneath so missing local images never
          leave an empty frame before hydration. */}
      <div className="content-image-fallback" aria-hidden="true">
        {fallback}
      </div>
      {!hasFailed && (
        <Image
          className={className}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setHasFailed(true)}
        />
      )}
    </>
  );
}
