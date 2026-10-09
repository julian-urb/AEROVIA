"use client";

import { useState } from "react";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/data/destinations";
import { DESTINATION_REGIONS } from "@/lib/types";
import { peso } from "@/lib/format";

const ALL = "All destinations";

export function DestinationsExplorer() {
  const [region, setRegion] = useState<string>(ALL);

  const visible =
    region === ALL
      ? DESTINATIONS
      : DESTINATIONS.filter((destination) => destination.region === region);

  return (
    <>
      <div className="filter-bar">
        <div className="field">
          <label htmlFor="origin-filter">Leaving from</label>
          <select id="origin-filter" defaultValue="Manila (MNL)">
            <option>Manila (MNL)</option>
            <option>Cebu (CEB)</option>
            <option>Clark (CRK)</option>
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

      <div className="destination-grid">
        {visible.map((destination) => (
          <article
            className="destination-card"
            data-region={destination.region}
            key={destination.slug}
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
          </article>
        ))}
      </div>
    </>
  );
}
