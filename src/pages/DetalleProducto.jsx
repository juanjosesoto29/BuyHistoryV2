

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducto } from '../database';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price);
};

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    setProducto(getProducto(id));
  }, [id]);

  if (!producto) {
    return (
      <div className="text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <img src={producto.img} alt={producto.nombre} className="img-fluid rounded" />
      </div>
      <div className="col-md-6">
        <h1>{producto.nombre}</h1>
        {producto.oferta && <span className="badge bg-danger mb-2">Oferta</span>}
        <p className="fs-4 text-success fw-bold">{formatPrice(producto.precio)}</p>
        <p><strong>Stock disponible:</strong> {producto.stock} unidades</p>
        <p>
          Descripción del producto. Aquí iría una descripción más detallada sobre
          el artefacto histórico, su origen, y características únicas.
        </p>
        <button className="btn btn-primary btn-lg">
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default DetalleProducto;