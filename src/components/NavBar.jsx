import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../state/cart.jsx'

export default function NavBar() {
  const { count } = useCart()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const location = useLocation()

  // Leer bh_user cada vez que cambia la ruta
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('bh_user'))
      setUser(u || null)
      setIsAdmin(u?.role === 'admin')
    } catch {
      setUser(null)
      setIsAdmin(false)
    }
  }, [location.pathname])

  const link = ({ isActive }) =>
    `nav-link px-3 ${isActive ? 'active border-bottom border-2 border-warning' : ''}`

  const logout = () => {
    localStorage.removeItem('bh_user')
    setUser(null)
    setIsAdmin(false)
    window.location.href = '/'
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold text-warning">
          BUY HISTORY
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navBH"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navBH" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/catalogo" className={link}>Catálogo</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categorias" className={link}>Categorías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/ofertas" className={link}>Ofertas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className={link}>Contacto</NavLink>
            </li>

            {/* Panel Admin solo para rol admin */}
            {user && isAdmin && (
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  className="btn btn-warning ms-2 text-dark fw-semibold"
                >
                  Panel Admin
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item me-2">
              <NavLink to="/carrito" className={link}>
                Carrito{' '}
                {count > 0 && (
                  <span className="badge bg-warning text-dark ms-2">
                    {count}
                  </span>
                )}
              </NavLink>
            </li>

            {/* Login / Menú de cuenta */}
            {!user ? (
              <li className="nav-item">
                <NavLink to="/login" className={link}>
                  Ingresar
                </NavLink>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle px-3"
                  data-bs-toggle="dropdown"
                  to="#"
                  role="button"
                >
                  {user.name || 'Mi cuenta'}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/cuenta">
                      Perfil
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        Panel Admin
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
