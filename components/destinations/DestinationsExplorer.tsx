"use client";

import { useState } from "react";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/data/destinations";
import { routeExists } from "@/lib/data/flights";
import { ORIGINS } from "@/lib/data/airports";
import { DESTINATION_REGIONS } from "@/lib/types";
import { peso } from "@/lib/format";

const ALL = "All destinations";

export function DestinationsExplorer() {
  const [region, setRegion] = useState<string>(ALL);
  const [origin, setOrigin] = useState<string>(ORIGINS[0]);

  const visible = DESTINATIONS.filter((destination) => {
    const matchesRegion = region === ALL || destination.region === region;
    const matchesOrigin = routeExists(origin, destination.airport);
    return matchesRegion && matchesOrigin;
  });

  return (
    <>
      <div className="filter-bar">
        <div className="field">
          <label htmlFor="origin-filter">Leaving from</label>
          <select
            id="origin-filter"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            {ORIGINS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="region-filter">Region</label>
          <select
            id="region-filter"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option>{ALL}</option>
            {DESTINATION_REGIONS.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <Link className="button" href="/#book">
          Search fares
        </Link>
      </div>

      {visible.length === 0 ? (
        <p className="notice" role="status">
          No destinations match that filter yet. Try another origin or region.
        </p>
      ) : null}

      <div className="destination-grid">
        {visible.map((destination) => (
          <Link
            className="destination-card"
            data-region={destination.region}
            key={destination.slug}
            href={`/destinations/${destination.slug}`}
          >
            <div
              className="photo-slot"
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              <span>{destination.city}</span>
            </div>
            <div className="deal-body">
              <div>
                <strong>{destination.country}</strong>
                <br />
                <small>From {peso(destination.price)}</small>
              </div>
              <span className="tag">{destination.tag}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
