import React from 'react';
import { Link } from 'react-router-dom';

// Formateador para el precio
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price);
};

const ProductCard = ({ product }) => {
  const { id, nombre, precio, img, oferta } = product;

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {oferta && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            Oferta
          </span>
        )}
        <img
          src={img}
          className="card-img-top"
          alt={nombre}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text text-success fw-bold">{formatPrice(precio)}</p>
          <Link to={`/producto/${id}`} className="btn btn-primary w-100">
            Ver Detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;