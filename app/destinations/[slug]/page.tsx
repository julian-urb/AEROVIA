import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { DESTINATIONS, destinationBySlug } from "@/lib/data/destinations";
import { peso } from "@/lib/format";
import { absoluteUrl } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return DESTINATIONS.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinationBySlug(slug);
  if (!destination) return { title: "Destination not found" };
  const title = `${destination.city}, ${destination.country}`;
  return {
    title,
    description: destination.summary,
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      title: `${title} | AEROVIA`,
      description: destination.summary,
      url: absoluteUrl(`/destinations/${destination.slug}`),
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const destination = destinationBySlug(slug);
  if (!destination) notFound();

  const related = DESTINATIONS.filter(
    (entry) =>
      entry.slug !== destination.slug && entry.region === destination.region,
  ).slice(0, 3);

  const bookHref = `/?from=${encodeURIComponent("Manila (MNL)")}&to=${encodeURIComponent(
    destination.airport,
  )}#book`;
  const resultsHref = `/results?from=${encodeURIComponent(
    "Manila (MNL)",
  )}&to=${encodeURIComponent(destination.airport)}`;

  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: `${destination.city}, ${destination.country}`,
          description: destination.summary,
          url: absoluteUrl(`/destinations/${destination.slug}`),
          touristType: destination.tag,
        }}
      />
      <section className="page-hero destination-hero">
        <div
          className="destination-hero-image"
          style={{ backgroundImage: `url(${destination.image})` }}
          aria-hidden="true"
        />
        <div className="shell">
          <div className="eyebrow">{destination.region}</div>
          <h1>
            {destination.city}, {destination.country}
          </h1>
          <p>{destination.summary}</p>
          <p className="destination-price">
            Flights from <strong>{peso(destination.price)}</strong> one way
          </p>
          <div className="step-actions">
            <Link className="button" href={bookHref}>
              Book this route
            </Link>
            <Link className="button ghost" href={resultsHref}>
              See fares
            </Link>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section">
          <div className="shell">
            <div className="section-head">
              <div>
                <div className="eyebrow">More in {destination.region}</div>
                <h2>Pair it with another escape</h2>
              </div>
            </div>
            <div className="destination-grid">
              {related.map((entry) => (
                <Link
                  className="destination-card"
                  key={entry.slug}
                  href={`/destinations/${entry.slug}`}
                >
                  <div
                    className="photo-slot"
                    style={{ backgroundImage: `url(${entry.image})` }}
                  >
                    <span>{entry.city}</span>
                  </div>
                  <div className="deal-body">
                    <div>
                      <strong>{entry.country}</strong>
                      <br />
                      <small>From {peso(entry.price)}</small>
                    </div>
                    <span className="tag">{entry.tag}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
