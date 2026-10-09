"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/lib/nav";
import { Topline } from "@/components/site/Topline";

function normalize(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function isActive(href: string, pathname: string): boolean {
  const path = normalize(pathname);
  if (href === "/") {
    return (
      path === "/" ||
      path.startsWith("/results") ||
      path.startsWith("/passenger-details") ||
      path.startsWith("/passengers") ||
      path.startsWith("/seats") ||
      path.startsWith("/payment") ||
      path.startsWith("/confirmation")
    );
  }
  return path === href || path.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Close the mobile menu whenever the route changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Topline />
      <nav className="shell nav" aria-label="Primary">
        <Link className="brand" href="/" aria-label="AEROVIA home">
          <Image
            src="/assets/logo.jpg"
            alt="AEROVIA"
            width={154}
            height={58}
            priority
          />
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav-links"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>
        <div
          className={`nav-links${menuOpen ? " open" : ""}`}
          id="primary-nav-links"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href, pathname) ? "active" : undefined}
              aria-current={isActive(item.href, pathname) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="button nav-book-mobile"
            href="/#book"
            onClick={() => setMenuOpen(false)}
          >
            Book a flight
          </Link>
        </div>
        <Link className="button nav-book" href="/#book">
          Book a flight
        </Link>
      </nav>
    </header>
  );
}
