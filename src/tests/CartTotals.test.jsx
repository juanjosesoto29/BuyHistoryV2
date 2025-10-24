import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "../state/cart";

function TotalsProbe() {
  const { add, total, clear } = useCart();
  return (
    <div>
      <div data-testid="total">{total}</div>
      <button onClick={() => {
        
        add({ id: 1, name: "A", price: 10000 });
        add({ id: 2, name: "B", price: 25000 });
        add({ id: 2, name: "B", price: 25000 }); 
      }}>Seed</button>
      <button onClick={() => clear()}>Clear</button>
    </div>
  );
}

describe("Cart totals", () => {
  it("calcula total con price * qty (CLP)", () => {
    render(<CartProvider><TotalsProbe /></CartProvider>);
    fireEvent.click(screen.getByText("Seed"));
    
    expect(Number(screen.getByTestId("total").textContent)).toBe(60000);
    fireEvent.click(screen.getByText("Clear"));
    expect(Number(screen.getByTestId("total").textContent)).toBe(0);
  });
});
