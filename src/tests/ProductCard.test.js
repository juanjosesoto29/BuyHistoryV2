// src/tests/ProductCard.test.js

// Importa las herramientas necesarias
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Importa el componente que vas a probar
import ProductCard from '../components/ProductCard';

describe('ProductCard Component', () => {

  const mockProduct = {
    id: 1,
    nombre: 'Moneda de Prueba',
    precio: 10000,
    img: 'https://via.placeholder.com/150',
    oferta: false
  };

  it('debería renderizarse correctamente y mostrar el nombre del producto', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    // Busca el nombre del producto en el componente renderizado
    expect(screen.getByText('Moneda de Prueba')).toBeInTheDocument();
  });

  it('debería mostrar el precio formateado correctamente', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    // Busca el precio formateado (ajusta el formato si es necesario)
    expect(screen.getByText('$10,000')).toBeInTheDocument();
  });

  it('no debería mostrar la insignia de oferta si el producto no está en oferta', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    // queryByText no falla si no encuentra el elemento, devuelve null
    expect(screen.queryByText('Oferta')).not.toBeInTheDocument();
  });

  it('debería mostrar la insignia de oferta si el producto está en oferta', () => {
    const offerProduct = { ...mockProduct, oferta: true };
    render(
      <BrowserRouter>
        <ProductCard product={offerProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText('Oferta')).toBeInTheDocument();
  });
});