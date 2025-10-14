import React from 'react';
import { Link } from 'react-router-dom';

const PagoExitoso = () => {
    return (
        <div className="text-center">
            <h1 className="text-success">¡Pago Realizado con Éxito!</h1>
            <p>Gracias por tu compra. Hemos enviado un resumen a tu correo.</p>
            <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
        </div>
    );
};

export default PagoExitoso;