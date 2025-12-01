import { Routes, Route } from 'react-router-dom'
import Protected from './components/Protected.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'


import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'
import Contact from './pages/Contact.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Account from './pages/Account.jsx'


import Categorias from './pages/Categorias.jsx'
import Ofertas from './pages/Ofertas.jsx'
import Checkout from './pages/Checkout.jsx'
import PagoExitoso from './pages/PagoExitoso.jsx'
import PagoFallido from './pages/PagoFallido.jsx'


import Dashboard from './admin/pages/Dashboard.jsx'
import Users from './admin/pages/Users.jsx'
import Ordenes from './admin/pages/Ordenes.jsx'
import GestionProductos from './admin/pages/GestionProductos.jsx'
import GestionCategorias from './admin/pages/GestionCategorias.jsx'
import GestionUsuarios from './admin/pages/GestionUsuarios.jsx'
import Reportes from './admin/pages/Reportes.jsx'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Routes>
        {/* Sitio público con MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/exito" element={<PagoExitoso />} />
          <Route path="/checkout/error" element={<PagoFallido/>} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/nosotros" element={<Protected><Nosotros /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/cuenta" element={<Protected><Account /></Protected>} />
          
        </Route>

        {/* Admin con layout propio */}
        <Route path="/admin" element={<Protected><AdminLayout /></Protected>}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Ordenes />} />
          <Route path="gestion-productos" element={<GestionProductos />} />
          <Route path="gestion-categorias" element={<GestionCategorias />} />
          <Route path="gestion-usuarios" element={<GestionUsuarios />} />
          <Route path="/admin/reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </div>
  )
}
