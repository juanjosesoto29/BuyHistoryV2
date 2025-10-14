
import { NavLink, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Account from './pages/Account.jsx'
import Contact from './pages/Contact.jsx'
import Payment from './pages/Payment.jsx'
import { CartProvider, useCart } from './state/cart.jsx'

function Header(){
  const { count } = useCart()
  return (
    <header>
      <div className="marco">
        <h1 className="titulo">BUY HISTORY</h1>
        <p className="subtitulo">Descubre objetos históricos únicos</p>
      </div>

    <nav aria-label="Menú principal" className="nav-bar container">
  <ul className="nav-center">
    <li><NavLink to="/">Inicio</NavLink></li> |
    <li><NavLink to="/catalogo">Catálogo</NavLink></li> |
    <li><NavLink to="/carrito">Carrito (<span id="badgeCarrito">{count}</span>)</NavLink></li> |
    <li><NavLink to="/contacto">Contacto</NavLink></li>
  </ul>

  <div className="nav-right">
    <Link to="/login" className="boton">Iniciar sesión</Link>
  </div>
</nav>

    </header>
  )
}

function Footer(){
  return (
    <footer>
      <p>📍 Av. Historia 1945, Santiago, Chile · 📞 +56 9 7654 3210 · ✉️ <a href="mailto:contacto@buyhistory.cl">contacto@buyhistory.cl</a></p>
      <p>© {new Date().getFullYear()} BUY HISTORY. Todos los derechos reservados.</p>
    </footer>
  )
}

export default function App(){
  return (
    <CartProvider>
      <Header/>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/catalogo" element={<Catalog/>} />
          <Route path="/carrito" element={<Cart/>} />
          <Route path="/contacto" element={<Contact/>} />
          <Route path="/pago" element={<Payment/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registro" element={<Register/>} />
          <Route path="/cuenta" element={<Account/>} />
        </Routes>
      </main>
      <Footer/>
    </CartProvider>
  )
}
