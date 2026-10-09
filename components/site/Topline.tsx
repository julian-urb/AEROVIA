import Link from "next/link";

export function Topline() {
  return (
    <div className="topline">
      <div className="shell">
        <Link href="/manage">Manage booking</Link>
        <Link href="/travel-info">Travel information</Link>
        <span>Philippines</span>
      </div>
    </div>
  );
}
