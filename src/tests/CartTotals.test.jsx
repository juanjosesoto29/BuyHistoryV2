import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "../state/cart";

function TotalsProbe() {
  const { add, total, clear } = useCart();
  return (
    <div>
      <div data-testid="total">{total}</div>
      <button onClick={() => {
        // Agrega 3 items: A x1 ($10.000) y B x2 ($25.000)
        add({ id: 1, name: "A", price: 10000 });
        add({ id: 2, name: "B", price: 25000 });
        add({ id: 2, name: "B", price: 25000 }); // incrementa qty
      }}>Seed</button>
      <button onClick={() => clear()}>Clear</button>
    </div>
  );
}

describe("Cart totals", () => {
  it("calcula total con price * qty (CLP)", () => {
    render(<CartProvider><TotalsProbe /></CartProvider>);
    fireEvent.click(screen.getByText("Seed"));
    // 10000*1 + 25000*2 = 60.000
    expect(Number(screen.getByTestId("total").textContent)).toBe(60000);
    fireEvent.click(screen.getByText("Clear"));
    expect(Number(screen.getByTestId("total").textContent)).toBe(0);
  });
});
