"use client";

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
      path.startsWith("/passenger-details")
    );
  }
  return path === href || path.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

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
        <div className="nav-links">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href, pathname) ? "active" : undefined}
              aria-current={
                isActive(item.href, pathname) ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link className="button" href="/#book">
          Book a flight
        </Link>
      </nav>
    </header>
  );
}
