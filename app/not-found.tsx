import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="eyebrow">404</div>
          <h1>This page took a different flight.</h1>
          <p>
            The page you are looking for could not be found. Let us get you back
            on track.
          </p>
          <p>
            <Link className="button" href="/">
              Back to booking
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
