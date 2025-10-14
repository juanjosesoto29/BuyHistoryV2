// src/pages/Catalog.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductos, getProductosPorCategoria, getCategoria } from '../database';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const { id: categoriaId } = useParams(); // Obtiene el ID de la categoría de la URL
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    if (categoriaId) {
      // Si hay un ID de categoría, filtramos los productos
      setProductos(getProductosPorCategoria(categoriaId));
      setCategoria(getCategoria(categoriaId));
    } else {
      // Si no, mostramos todos los productos
      setProductos(getProductos());
      setCategoria(null);
    }
  }, [categoriaId]); // Se ejecuta cada vez que el ID de categoría cambia

  return (
    <div>
      <h1 className="mb-4">
        {categoria ? `Catálogo: ${categoria.nombre}` : 'Catálogo de Productos'}
      </h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {productos.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;