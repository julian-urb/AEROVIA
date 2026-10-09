export const BOOKING_STEPS = [
  { id: "flight", label: "Flight" },
  { id: "contact", label: "Contact" },
  { id: "travelers", label: "Travelers" },
  { id: "seats", label: "Seats" },
  { id: "payment", label: "Payment" },
] as const;

export type BookingStepId = (typeof BOOKING_STEPS)[number]["id"];

type Props = {
  current: BookingStepId;
};

export function BookingSteps({ current }: Props) {
  const currentIndex = BOOKING_STEPS.findIndex((step) => step.id === current);
  return (
    <ol className="booking-steps" aria-label="Booking progress">
      {BOOKING_STEPS.map((step, index) => {
        const state =
          index < currentIndex
            ? "done"
            : index === currentIndex
              ? "active"
              : "todo";
        return (
          <li key={step.id} className={`booking-step ${state}`}>
            <span aria-hidden="true">{index + 1}</span>
            {step.label}
            {index === currentIndex ? (
              <span className="sr-only">(current step)</span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
