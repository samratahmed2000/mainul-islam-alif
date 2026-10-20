export default function LoadingPage() {
  return (
    <section
      className="route-state"
      role="status"
      aria-live="polite"
      aria-label="পৃষ্ঠা লোড হচ্ছে"
    >
      <span className="loading-indicator" aria-hidden="true" />
      <p className="route-state-description">পৃষ্ঠা লোড হচ্ছে…</p>
    </section>
  );
}
