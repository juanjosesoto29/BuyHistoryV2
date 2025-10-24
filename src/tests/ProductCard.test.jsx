
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";

describe("ProductCard", () => {
  it("muestra nombre, precio y badge 'Oferta' cuando corresponde", () => {
    const mock = {
      id: 1,
      nombre: "Moneda Romana",
      descripcion: "S. II",
      precio: 125000,
      img: "/img/moneda.jpg",
      oferta: true
    };

    const onAdd = jasmine.createSpy("onAdd");
    render(<ProductCard product={mock} onAdd={onAdd} />);

    expect(screen.getByText("Moneda Romana")).toBeTruthy();
    expect(screen.getByText("$125.000")).toBeTruthy();
    // badge 'Oferta'
    expect(screen.getByLabelText("Oferta")).toBeTruthy();

    fireEvent.click(screen.getByText("Agregar"));
    expect(onAdd).toHaveBeenCalledWith(mock);
  });

  it("acepta claves en inglés (name/price/desc)", () => {
    const mock = {
      id: 2,
      name: "Napoleon's Hat",
      desc: "Original",
      price: 999999,
      img: "/img/hat.jpg",
      oferta: false
    };

    render(<ProductCard product={mock} />);
    expect(screen.getByText("Napoleon's Hat")).toBeTruthy();
    expect(screen.getByText("$999.999")).toBeTruthy();
  });
});
