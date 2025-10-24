import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Admin.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="mb-4">Admin Panel</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin" end>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/productos">
            Productos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/categorias">
            Categorías
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/usuarios">
            Usuarios
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/ordenes">
            Órdenes
          </NavLink>
        </li>
        <li className="nav-item mt-auto">
             <NavLink className="nav-link" to="/">
                ← Volver a la Tienda
            </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;