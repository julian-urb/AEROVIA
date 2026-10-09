import type { Booking } from "./types";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function parseStart(date: string, time: string): Date | null {
  if (!date) return null;
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  const base = new Date(`${date}T00:00:00`);
  if (Number.isNaN(base.getTime())) return null;
  if (!match) {
    base.setHours(9, 0, 0, 0);
    return base;
  }
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hours += 12;
  base.setHours(hours, Number(match[2]), 0, 0);
  return base;
}

function toStamp(date: Date): string {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(
    date.getDate(),
  )}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

export function buildICS(booking: Booking): string {
  const start = parseStart(booking.depart, booking.time);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AEROVIA//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${booking.reference}@aerovia`,
    `DTSTAMP:${toStamp(new Date())}`,
  ];
  if (start) {
    lines.push(`DTSTART:${toStamp(start)}`);
  }
  lines.push(
    `SUMMARY:AEROVIA flight ${booking.from} to ${booking.to}`,
    `DESCRIPTION:Booking ${booking.reference} - ${booking.cabin} - ${
      booking.travelers
    } traveler${booking.travelers > 1 ? "s" : ""}. Reference ${booking.reference}.`,
    `LOCATION:${booking.from}`,
    "END:VEVENT",
    "END:VCALENDAR",
  );
  return `${lines.join("\r\n")}\r\n`;
}

export function downloadICS(booking: Booking): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([buildICS(booking)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `aerovia-${booking.reference}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
