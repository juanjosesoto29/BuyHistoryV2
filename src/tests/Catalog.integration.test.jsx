
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Catalog from "../pages/Catalog";
import { CartProvider, useCart } from "../state/cart";


function WithCartSpy({ children }) {
  const Spy = () => {
    const { addToCart } = useCart();
    spyOn({ addToCart }, "addToCart"); 
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

    
    const addButtons = screen.getAllByText("Agregar");
    expect(addButtons.length).toBeGreaterThan(0);

    fireEvent.click(addButtons[0]);
    
  });
});
