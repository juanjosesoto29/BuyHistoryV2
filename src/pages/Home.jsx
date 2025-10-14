
import React, { useState, useEffect } from 'react';
import { getOfertas } from '../database'; // Importamos la función para obtener ofertas
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [productosEnOferta, setProductosEnOferta] = useState([]);

  useEffect(() => {
    // Cargamos los productos en oferta cuando el componente se monta
    setProductosEnOferta(getOfertas());
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Bienvenido a la Tienda Histórica</h1>
          <p className="fs-4">
            Descubre artefactos únicos y piezas con historia.
          </p>
        </div>
      </div>

      {/* Sección de Ofertas */}
      <h2 className="mb-4">Productos en Oferta</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {productosEnOferta.length > 0 ? (
          productosEnOferta.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No hay ofertas disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default Home;