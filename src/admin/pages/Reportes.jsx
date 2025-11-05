import { useEffect, useState, useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const ORDERS_API = 'http://localhost:8081/api/v1/orders'
const PRODUCTS_API = 'http://localhost:8080/api/v1/products'

export default function Reportes() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch(ORDERS_API),
          fetch(PRODUCTS_API)
        ])

        if (!ordersRes.ok || !productsRes.ok)
          throw new Error('Error al cargar datos de reportes')

        const ordersData = await ordersRes.json()
        const productsData = await productsRes.json()

        setOrders(ordersData)
        setProducts(productsData)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // === Calcular métricas ===
  const metrics = useMemo(() => {
    const totalOrdenes = orders.length
    const totalVentas = orders.reduce((sum, o) => sum + (o.total || 0), 0)

    // Productos más vendidos
    const contador = {}
    orders.forEach(o => {
      o.items?.forEach(it => {
        if (!contador[it.productName]) {
          contador[it.productName] = { name: it.productName, cantidad: 0, ingresos: 0 }
        }
        contador[it.productName].cantidad += it.quantity
        contador[it.productName].ingresos += (it.price || 0) * it.quantity
      })
    })

    const topProductos = Object.values(contador)
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5)

    return { totalOrdenes, totalVentas, topProductos }
  }, [orders])

  if (loading) return <p>Cargando reportes...</p>
  if (error) return <p className="text-danger">Error: {error}</p>

  return (
    <div className="adm-reportes">
      <h2 className="mb-2">📊 Reportes de Ventas</h2>
      <p className="text-muted mb-4">Resumen general de las órdenes y productos vendidos.</p>

      {/* KPIs */}
      <div className="adm-kpis">
        <div className="adm-kpi adm-kpi-blue">
          <div className="adm-kpi-icon"><i className="bi bi-cart-check" /></div>
          <div>
            <div className="adm-kpi-title">Órdenes Totales</div>
            <div className="adm-kpi-value">{metrics.totalOrdenes}</div>
          </div>
        </div>

        <div className="adm-kpi adm-kpi-green">
          <div className="adm-kpi-icon"><i className="bi bi-currency-dollar" /></div>
          <div>
            <div className="adm-kpi-title">Ventas Totales</div>
            <div className="adm-kpi-value">${metrics.totalVentas.toLocaleString('es-CL')}</div>
          </div>
        </div>
      </div>

      {/* Tabla top productos */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Productos más vendidos</h5>
          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad vendida</th>
                  <th>Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {metrics.topProductos.map(p => (
                  <tr key={p.name}>
                    <td>{p.name}</td>
                    <td>{p.cantidad}</td>
                    <td>${p.ingresos.toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gráfico de barras */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Ventas por Producto</h5>
          {metrics.topProductos.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics.topProductos} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString('es-CL')}`} />
                <Legend />
                <Bar dataKey="ingresos" fill="#0d6efd" name="Ingresos ($)" />
                <Bar dataKey="cantidad" fill="#ffc107" name="Cantidad" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted">No hay datos de ventas suficientes.</p>
          )}
        </div>
      </div>
    </div>
  )
}
