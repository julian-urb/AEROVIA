"use client";

import Link from "next/link";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main id="main">
          <section className="page-hero">
            <div className="shell">
              <div className="eyebrow">Something went wrong</div>
              <h1>AEROVIA could not load.</h1>
              <p>
                A problem interrupted the app. Please try again, or return to
                the homepage.
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
      </body>
    </html>
  );
}
