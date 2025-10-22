// src/tests/CartContext.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { CartProvider, useCart } from "../state/cart";

// Componente de prueba que usa el contexto
function CartProbe() {
  const { addToCart, items, count } = useCart();
  const sample = { id: 10, nombre: "Casco", precio: 50000 };

  return (
    <div>
      <div data-testid="count">{count}</div>
      <button onClick={() => addToCart(sample)}>Add</button>
      <ul>
        {items.map(p => <li key={p.id}>{p.nombre ?? p.name}</li>)}
      </ul>
    </div>
  );
}

describe("Cart context", () => {
  it("agrega productos y actualiza el contador", () => {
    render(<CartProvider><CartProbe /></CartProvider>);

    expect(screen.getByTestId("count").textContent).toBe("0");
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByText("Casco")).toBeTruthy();
  });
});
