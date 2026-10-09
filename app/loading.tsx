export default function Loading() {
  return (
    <main id="main" aria-busy="true" aria-live="polite">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Loading</div>
          <h1>Getting things ready…</h1>
          <p className="sr-only">Loading, please wait.</p>
          <div className="skeleton-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
    </main>
  );
}
