
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout'; // Importar el nuevo layout

// Importar páginas públicas
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import DetalleProducto from './pages/DetalleProducto';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Checkout from './pages/Checkout';
import PagoExitoso from './pages/PagoExitoso';
import PagoFallido from './pages/PagoFallido';

// Importar páginas del admin
import Dashboard from './admin/pages/Dashboard';
import GestionProductos from './admin/pages/GestionProductos';
import GestionCategorias from './admin/pages/GestionCategorias';
import GestionUsuarios from './admin/pages/GestionUsuarios';
import Ordenes from './admin/pages/Ordenes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas con Layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="producto/:id" element={<DetalleProducto />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="categorias/:id" element={<Catalog />} />
          <Route path="ofertas" element={<Ofertas />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="pago-exitoso" element={<PagoExitoso />} />
          <Route path="pago-fallido" element={<PagoFallido />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="cuenta" element={<Account />} />
        </Route>

        {/* Rutas del Panel de Administración con Layout */}
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="productos" element={<GestionProductos />} />
            <Route path="categorias" element={<GestionCategorias />} />
            <Route path="usuarios" element={<GestionUsuarios />} />
            <Route path="ordenes" element={<Ordenes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;