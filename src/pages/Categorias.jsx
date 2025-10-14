import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias } from '../database';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    setCategorias(getCategorias());
  }, []);

  return (
    <div>
      <h1 className="mb-4">Categorías</h1>
      <div className="list-group">
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            to={`/categorias/${cat.id}`}
            className="list-group-item list-group-item-action"
          >
            {cat.nombre}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categorias;