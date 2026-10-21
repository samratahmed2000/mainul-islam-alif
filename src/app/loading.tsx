export default function LoadingPage() {
  return (
    <section
      className="route-state"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <span className="loading-indicator" aria-hidden="true" />
      <p className="route-state-description">Loading page…</p>
    </section>
  );
}
