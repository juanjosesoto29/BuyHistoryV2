// src/tests/Catalog.integration.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Catalog from "../pages/Catalog";
import { CartProvider, useCart } from "../state/cart";

// Espiamos addToCart desde el propio contexto usando un probe
function WithCartSpy({ children }) {
  const Spy = () => {
    const { addToCart } = useCart();
    spyOn({ addToCart }, "addToCart"); // ejemplo si quisieras interceptar
    return null;
  };
  return (
    <CartProvider>
      <Spy />
      {children}
    </CartProvider>
  );
}

describe("Catálogo (integración ligera)", () => {
  it("renderiza cards y permite agregar al carrito", () => {
    render(<WithCartSpy><Catalog /></WithCartSpy>);

    // asume que al menos un producto visible
    const addButtons = screen.getAllByText("Agregar");
    expect(addButtons.length).toBeGreaterThan(0);

    fireEvent.click(addButtons[0]);
    // Simple smoke: no explota; si tienes un contador visible en header, asértalo aquí
  });
});
