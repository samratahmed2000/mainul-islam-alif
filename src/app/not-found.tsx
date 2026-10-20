import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "পাতা পাওয়া যায়নি",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return (
    <Container className="not-found-page">
      <p className="section-eyebrow">৪০৪ — পাতা পাওয়া যায়নি</p>
      <h1 className="catalog-title">এই ঠিকানায় কোনো পৃষ্ঠা নেই</h1>
      <p className="catalog-description">
        ঠিকানাটি ভুল হতে পারে, অথবা সৃষ্টিকর্মটি এখন আর প্রকাশিত নেই।
      </p>
      <div className="not-found-actions">
        <Link className="button button-primary" href="/">
          হোমে ফিরুন
        </Link>
        <Link className="button button-secondary" href="/creations">
          সৃষ্টিকর্ম দেখুন
        </Link>
      </div>
    </Container>
  );
}
