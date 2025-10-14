
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    // Lógica para manejar el carrito (añadir, quitar, etc.) iría aquí.
    // Por ahora, mostraremos un carrito estático como ejemplo.
    const items = [
        { id: 1, nombre: 'Moneda romana', precio: 45000, cantidad: 1 },
        { id: 3, nombre: 'Carta histórica', precio: 65000, cantidad: 2 },
    ];
    const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    return (
        <div>
            <h1>Carrito de Compras</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>${item.precio.toLocaleString('es-CL')}</td>
                            <td>{item.cantidad}</td>
                            <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="text-end">Total: ${total.toLocaleString('es-CL')}</h3>
            <div className="d-flex justify-content-end">
                <Link to="/checkout" className="btn btn-success">Proceder al Pago</Link>
            </div>
        </div>
    );
};

export default Cart;