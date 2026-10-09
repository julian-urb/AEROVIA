"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">Something went wrong</div>
          <h1>This page hit some turbulence.</h1>
          <p>
            An unexpected error interrupted the page. You can try again or head
            back to booking.
          </p>
          <div className="step-actions">
            <button className="button" type="button" onClick={reset}>
              Try again
            </button>
            <Link className="button ghost" href="/">
              Back to booking
            </Link>
          </div>
          {error.digest ? (
            <p className="notice">Reference: {error.digest}</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
