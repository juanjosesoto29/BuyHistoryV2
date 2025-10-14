// src/components/Header.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Tienda Histórica
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/catalogo">Catálogo</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
              </li>
               <li className="nav-item">
                <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
              </li>
               <li className="nav-item">
                <NavLink className="nav-link" to="/blog">Blog</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
              </li>
            </ul>
            <div className="d-flex">
                 <NavLink className="btn btn-outline-success me-2" to="/carrito">
                🛒 Carrito
              </NavLink>
              <NavLink className="btn btn-primary me-2" to="/login">
                Iniciar Sesión
              </NavLink>
              <NavLink className="btn btn-secondary" to="/registro">
                Crear Cuenta
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;