import { useCallback, useEffect, useState } from "react";
import { getBooking, getBookingByReference, saveBooking } from "./storage";
import type { Booking } from "./types";

export function useBooking(reference?: string | null) {
  const [booking, setBookingState] = useState<Booking | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const found = reference
      ? getBookingByReference(reference)
      : getBooking();
    // localStorage is browser-only; hydrate after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBookingState(found);
    setLoaded(true);
  }, [reference]);

  const setBooking = useCallback((next: Booking | null) => {
    if (next) saveBooking(next);
    setBookingState(next);
  }, []);

  return { booking, setBooking, loaded };
}
