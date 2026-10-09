import { peso } from "@/lib/format";
import type { FareBreakdown } from "@/lib/types";

type Props = {
  breakdown: FareBreakdown;
  travelers: number;
};

export function FareBreakdownList({ breakdown, travelers }: Props) {
  return (
    <dl className="fare-breakdown">
      <div>
        <dt>
          Fare ({peso(breakdown.farePerTraveler)} x {travelers})
        </dt>
        <dd>{peso(breakdown.subtotal)}</dd>
      </div>
      <div>
        <dt>Taxes</dt>
        <dd>{peso(breakdown.taxes)}</dd>
      </div>
      <div>
        <dt>Fees</dt>
        <dd>{peso(breakdown.fees)}</dd>
      </div>
      {breakdown.baggage > 0 ? (
        <div>
          <dt>Extra baggage</dt>
          <dd>{peso(breakdown.baggage)}</dd>
        </div>
      ) : null}
      {breakdown.discount > 0 ? (
        <div className="discount">
          <dt>Promo {breakdown.promo}</dt>
          <dd>-{peso(breakdown.discount)}</dd>
        </div>
      ) : null}
      <div className="fare-total">
        <dt>Total due</dt>
        <dd>{peso(breakdown.total)}</dd>
      </div>
    </dl>
  );
}
