import Image from "next/image";
import Link from "next/link";
import { footerGroups } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="AEROVIA home">
              <Image
                src="/assets/logo.jpg"
                alt="AEROVIA"
                width={165}
                height={62}
              />
            </Link>
            <p>Simple flights and helpful journeys from the Philippines.</p>
          </div>
          {footerGroups.map((group) => (
            <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
              <h2 id={`footer-${group.id}`}>{group.heading}</h2>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 AEROVIA.</span>
          <span>Manila, Philippines</span>
        </div>
      </div>
    </footer>
  );
}
