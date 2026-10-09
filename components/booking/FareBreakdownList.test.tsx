// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { fareBreakdownFor } from "@/lib/pricing";
import { FareBreakdownList } from "./FareBreakdownList";

afterEach(cleanup);

describe("FareBreakdownList", () => {
  it("renders the fare, taxes, fees, and total", () => {
    const breakdown = fareBreakdownFor(1000, 2, 600);
    render(<FareBreakdownList breakdown={breakdown} travelers={2} />);
    expect(screen.getByText(/Fare/)).toBeInTheDocument();
    expect(screen.getByText("Taxes")).toBeInTheDocument();
    expect(screen.getByText("Fees")).toBeInTheDocument();
    expect(screen.getByText("Total due")).toBeInTheDocument();
  });

  it("hides baggage and promo rows when zero", () => {
    const breakdown = fareBreakdownFor(1000, 1, 0);
    render(<FareBreakdownList breakdown={breakdown} travelers={1} />);
    expect(screen.queryByText("Extra baggage")).not.toBeInTheDocument();
    expect(screen.queryByText(/Promo/)).not.toBeInTheDocument();
  });

  it("shows the promo discount when applied", () => {
    const breakdown = fareBreakdownFor(1000, 2, 0, "AEROVIA10");
    render(<FareBreakdownList breakdown={breakdown} travelers={2} />);
    expect(screen.getByText(/Promo AEROVIA10/)).toBeInTheDocument();
  });
});
