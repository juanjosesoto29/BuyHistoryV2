
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Tienda Histórica. Todos los derechos reservados.
        </p>
        <p>
            <a href="/nosotros" className="text-white">Sobre Nosotros</a> | <a href="/contacto" className="text-white">Contacto</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;