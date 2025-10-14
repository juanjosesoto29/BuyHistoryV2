import React, { useState, useEffect } from 'react';
import { getProductos, deleteProducto } from '../../database';

const GestionProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(getProductos());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            deleteProducto(id);
            // Volvemos a cargar los productos para reflejar el cambio
            setProductos(getProductos());
        }
    };

    return (
        <div>
            <h1>Gestión de Productos</h1>
            <button className="btn btn-primary mb-3">Añadir Nuevo Producto</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>${p.precio.toLocaleString('es-CL')}</td>
                            <td>{p.stock}</td>
                            <td>
                                <button className="btn btn-sm btn-info me-2">Editar</button>
                                <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionProductos;