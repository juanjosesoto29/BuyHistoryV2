import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const ORDERS_API = 'http://localhost:8087/api/v1/orders'
const PRODUCTS_API = 'http://localhost:8080/api/v1/products'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)

  // Cargar órdenes reales
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch(ORDERS_API)
        if (!res.ok) throw new Error('Error al cargar órdenes')
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingOrders(false)
      }
    }
    loadOrders()
  }, [])

  // Cargar productos reales
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(PRODUCTS_API)
        if (!res.ok) throw new Error('Error al cargar productos')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingProducts(false)
      }
    }
    loadProducts()
  }, [])

  const stats = useMemo(() => {
    const compras = orders.length
    const probAumento = 20               // mock, si quieres luego lo calculamos
    const totalProductos = products.length
    const inventarioActual = 500         // mock por ahora
    const usuarios = 890                 // mock
    const nuevosMes = 120                // mock

    return {
      compras,
      probAumento,
      totalProductos,
      inventarioActual,
      usuarios,
      nuevosMes
    }
  }, [orders, products])

  return (
    <>
      <p className="text-muted text-center mb-3">
        Resumen de las actividades diarias
      </p>

      {/* KPI GRID */}
      <div className="adm-kpis">
        <div className="adm-kpi adm-kpi-blue">
          <div className="adm-kpi-icon"><i className="bi bi-cart" /></div>
          <div>
            <div className="adm-kpi-title">Compras</div>
            <div className="adm-kpi-value">
              {loadingOrders ? '…' : stats.compras.toLocaleString('es-CL')}
            </div>
            <div className="adm-kpi-foot">
              Probabilidad de aumento:{' '}
              <strong>{stats.probAumento}%</strong>
            </div>
          </div>
        </div>

        <div className="adm-kpi adm-kpi-green">
          <div className="adm-kpi-icon"><i className="bi bi-box-seam" /></div>
          <div>
            <div className="adm-kpi-title">Productos</div>
            <div className="adm-kpi-value">
              {loadingProducts ? '…' : stats.totalProductos}
            </div>
            <div className="adm-kpi-foot">
              Inventario actual:{' '}
              <strong>{stats.inventarioActual}</strong>
            </div>
          </div>
        </div>

        <div className="adm-kpi adm-kpi-yellow">
          <div className="adm-kpi-icon"><i className="bi bi-people" /></div>
          <div>
            <div className="adm-kpi-title">Usuarios</div>
            <div className="adm-kpi-value">{stats.usuarios}</div>
            <div className="adm-kpi-foot">
              Nuevos este mes:{' '}
              <strong>{stats.nuevosMes}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* TILES GRID */}
      <div className="adm-tiles">
        <Tile
          to="/admin"
          icon="bi-speedometer2"
          title="Dashboard"
          desc="Visión general de métricas y estadísticas clave."
        />
        <Tile
          to="orders"
          icon="bi-bag-check"
          title="Órdenes"
          desc="Seguimiento y detalles de órdenes de compra."
        />
        <Tile
          to="/admin/gestion-productos"
          icon="bi-box-seam"
          title="Productos"
          desc="Administrar inventario y detalles de productos."
        />
        <Tile
          to="/admin/gestion-categorias"
          icon="bi-tags"
          title="Categorías"
          desc="Organizar productos por categorías."
        />
        <Tile
          to="/admin/gestion-usuarios"
          icon="bi-people"
          title="Usuarios"
          desc="Gestión de cuentas y roles."
        />
        <Tile
          to="/admin/reportes"
          icon="bi-bar-chart-line"
          title="Reportes"
          desc="Informes detallados de operaciones."
        />
        <Tile
          to="/cuenta"
          icon="bi-person-circle"
          title="Perfil"
          desc="Información personal y configuración."
        />
        <Tile
          to="/"
          icon="bi-shop"
          title="Tienda"
          desc="Ver la tienda en tiempo real."
        />
      </div>
    </>
  )
}

function Tile({ to, icon, title, desc }) {
  return (
    <Link to={to} className="adm-tile text-decoration-none">
      <div className="adm-tile-icon"><i className={`bi ${icon}`} /></div>
      <div className="adm-tile-title">{title}</div>
      <div className="adm-tile-desc text-muted">{desc}</div>
    </Link>
  )
}
