// src/layouts/AdminLayout.jsx
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/admin.css'

export default function AdminLayout() {
  const [user, setUser] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    try { setUser(JSON.parse(localStorage.getItem('bh_user')) || null) } catch {}
  }, [])

  const isActive = ({ isActive }) => `adm-navlink ${isActive ? 'active' : ''}`
  const logout = () => { localStorage.removeItem('bh_user'); nav('/') }

  return (
    <div className="adm-shell">
      {/* SIDEBAR */}
      <aside className="adm-sidebar">
        <div className="adm-brand">Buy History <span className="fw-light">Admin</span></div>

        <nav className="adm-nav">
          <div className="adm-section-title">Menú</div>
          <NavLink end to="/admin" className={isActive}>
            <i className="bi bi-speedometer2 me-2"/> Dashboard
          </NavLink>
          <NavLink to="/admin/gestion-productos" className={isActive}>
            <i className="bi bi-box-seam me-2"/> Productos
          </NavLink>
          <NavLink to="/admin/gestion-categorias" className={isActive}>
            <i className="bi bi-tags me-2"/> Categorías
          </NavLink>
          <NavLink to="/admin/gestion-usuarios" className={isActive}>
            <i className="bi bi-people me-2"/> Usuarios
          </NavLink>
          <NavLink to="/admin/reportes" className={isActive}>
            <i className="bi bi-graph-up me-2"/> Reportes
          </NavLink>

          <div className="adm-section-title mt-3">Cuenta</div>
          <Link to="/cuenta" className="adm-navlink">
            <i className="bi bi-person-circle me-2"/> Perfil
          </Link>

          <div className="mt-auto" />
          <Link to="/" className="btn btn-dark w-100 mb-2">
            <i className="bi bi-shop me-2"/> Tienda
          </Link>
          <button className="btn btn-danger w-100" onClick={logout}>
            <i className="bi bi-box-arrow-right me-2"/> Cerrar Sesión
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="adm-main">
        <div className="adm-container">
          <header className="adm-header">
            <h1 className="h4 m-0 text-center">Dashboard</h1>
            <div className="text-muted small text-center">
              {user?.name ? `Hola, ${user.name}` : 'Administrador'}
            </div>
          </header>

          <div className="adm-content">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
