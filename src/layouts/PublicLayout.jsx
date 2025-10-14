// src/layouts/PublicLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <main className="container my-4">
        <Outlet /> {/* Aquí se renderizarán las páginas */}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;