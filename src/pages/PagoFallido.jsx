
import React from 'react';
import { Link } from 'react-router-dom';

const PagoFallido = () => {
    return (
        <div className="text-center">
            <h1 className="text-danger">Error en el Pago</h1>
            <p>No se pudo procesar tu pago. Por favor, intenta de nuevo.</p>
            <Link to="/checkout" className="btn btn-warning">Volver a Intentar</Link>
        </div>
    );
};

export default PagoFallido;