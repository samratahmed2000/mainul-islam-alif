"use client";

interface ErrorPageProps {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <section className="route-state" role="alert" aria-labelledby="error-heading">
      <p className="section-eyebrow">দুঃখিত</p>
      <h1 id="error-heading" className="route-state-title">
        এই পৃষ্ঠাটি দেখাতে সমস্যা হয়েছে
      </h1>
      <p className="route-state-description">
        সাময়িক ত্রুটি হতে পারে। আবার চেষ্টা করুন, অথবা পরে ফিরে আসুন।
      </p>
      <button className="button button-primary" type="button" onClick={reset}>
        আবার চেষ্টা করুন
      </button>
    </section>
  );
}
