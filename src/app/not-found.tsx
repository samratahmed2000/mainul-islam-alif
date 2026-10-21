import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return (
    <Container className="not-found-page">
      <p className="section-eyebrow">404 — Page not found</p>
      <h1 className="catalog-title">There is no page at this address</h1>
      <p className="catalog-description">
        The address may be incorrect, or the work may no longer be published.
      </p>
      <div className="not-found-actions">
        <Link className="button button-primary" href="/">
          Back to home
        </Link>
        <Link className="button button-secondary" href="/creations">
          Browse creations
        </Link>
      </div>
    </Container>
  );
}
