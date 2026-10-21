"use client";

interface ErrorPageProps {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <section className="route-state" role="alert" aria-labelledby="error-heading">
      <p className="section-eyebrow">Sorry</p>
      <h1 id="error-heading" className="route-state-title">
        Something went wrong on this page
      </h1>
      <p className="route-state-description">
        This may be temporary. Try again, or come back a little later.
      </p>
      <button className="button button-primary" type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
