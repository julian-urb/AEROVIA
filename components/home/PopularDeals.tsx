import Link from "next/link";
import { POPULAR_DESTINATIONS } from "@/lib/data/destinations";
import { peso } from "@/lib/format";

export function PopularDeals() {
  return (
    <div className="card-grid">
      {POPULAR_DESTINATIONS.map((destination) => (
        <article className="deal-card" key={destination.slug}>
          <div
            className="photo-slot"
            style={{ backgroundImage: `url(${destination.image})` }}
          >
            <span>{destination.city}</span>
          </div>
          <div className="deal-body">
            <small>Manila to {destination.city}</small>
            <div className="deal-price">{peso(destination.price)}</div>
            <Link href="/destinations">Explore {destination.city}</Link>
          </div>
        </article>
      ))}
    </div>
  );
}
