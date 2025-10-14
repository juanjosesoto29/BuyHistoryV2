
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();

    const handlePago = (exitoso) => {
        if (exitoso) {
            navigate('/pago-exitoso');
        } else {
            navigate('/pago-fallido');
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <p>Por favor, complete sus datos para finalizar la compra.</p>
            {/* Aquí iría un formulario completo de checkout */}
            <div className="d-flex justify-content-center gap-3 mt-4">
                <button onClick={() => handlePago(true)} className="btn btn-success btn-lg">Simular Pago Exitoso</button>
                <button onClick={() => handlePago(false)} className="btn btn-danger btn-lg">Simular Pago Fallido</button>
            </div>
        </div>
    );
};

export default Checkout;