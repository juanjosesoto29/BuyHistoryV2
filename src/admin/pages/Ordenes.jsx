import { useEffect, useState } from 'react'

const ORDERS_API = 'http://localhost:8087/api/v1/orders'

export default function Ordenes() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(ORDERS_API)
        if (!res.ok) throw new Error('Error al cargar órdenes')
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) return <p>Cargando órdenes...</p>
  if (error) return <p className="text-danger">Error: {error}</p>

  if (!orders.length) {
    return (
      <div>
        <h2 className="mb-3">Órdenes de compra</h2>
        <p className="text-muted">No hay órdenes registradas todavía.</p>
      </div>
    )
  }

  return (
    <div className="adm-orders">
      <h2 className="mb-3">Órdenes de compra</h2>
      <p className="text-muted mb-3">
        Listado de todas las órdenes realizadas en la tienda.
      </p>

      <div className="table-responsive">
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>
                  {o.createdAt
                    ? new Date(o.createdAt).toLocaleString('es-CL')
                    : '-'}
                </td>
                <td>{o.customerName}</td>
                <td>{o.customerEmail}</td>
                <td>
                  {o.addressStreet}
                  {o.addressDetail ? `, ${o.addressDetail}` : ''}
                  <br />
                  {o.city}
                  {o.city && o.region ? ' - ' : ''}
                  {o.region}
                </td>
                <td>${o.total?.toLocaleString('es-CL')}</td>
                <td>
                  <span className="badge text-bg-secondary">
                    {o.status}
                  </span>
                </td>
                <td>
                  <ul className="mb-0 ps-3">
                    {o.items?.map(it => (
                      <li key={it.id}>
                        {it.productName} x{it.quantity}{' '}
                        (${it.price.toLocaleString('es-CL')})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
