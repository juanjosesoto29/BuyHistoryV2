import React, { useState, useEffect } from 'react';
import { getOfertas } from '../database';
import ProductCard from '../components/ProductCard';

const Ofertas = () => {
    const [productosEnOferta, setProductosEnOferta] = useState([]);

    useEffect(() => {
        setProductosEnOferta(getOfertas());
    }, []);

    return (
        <div>
            <h1 className="mb-4">Ofertas Especiales</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {productosEnOferta.length > 0 ? (
                    productosEnOferta.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No hay productos en oferta en este momento.</p>
                )}
            </div>
        </div>
    );
};

export default Ofertas;