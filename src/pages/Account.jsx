import { useEffect, useState } from 'react'
// ⬇️ CAMBIA esta importación
import { getOrdersByCustomerEmail } from '../api/orders'

export default function Account() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [errorOrders, setErrorOrders] = useState(null)

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('bh_user'))
      setUser(u || null)

      // ⛔ ANTES: if (u && u.id) {
      // ✅ AHORA: usamos el email porque el backend busca por email
      if (u && u.email) {
        setLoadingOrders(true)
        getOrdersByCustomerEmail(u.email)
          .then(data => {
            setOrders(data || [])
            setErrorOrders(null)
          })
          .catch(err => {
            console.error(err)
            setErrorOrders('No se pudo cargar el historial de compras.')
          })
          .finally(() => setLoadingOrders(false))
      }
    } catch {
      setUser(null)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('bh_user')
    location.href = '/'
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h3>No has iniciado sesión</h3>
        <p className="text-muted">Ingresa desde el menú “Ingresar”.</p>
      </div>
    )
  }

  const initials = (user.name || '')
    .trim()
    .split(' ')
    .map(p => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  const isAdmin =
    user.role?.toUpperCase() === 'ADMIN' || user.isAdmin === true

  return (
    <div className="account-page">
      <div className="container py-5">
        <h2 className="text-center mb-4">Mi cuenta</h2>

        <div className="row g-4">
          {/* Columna izquierda: resumen */}
          <div className="col-lg-8">
            <div className="account-card p-4 shadow-sm bg-white rounded-3 h-100">
              <div className="text-center mb-3">
                <div className="avatar-circle mx-auto mb-3">
                  {initials || '?'}
                </div>

                <h4 className="fw-bold mb-1">{user.name}</h4>

                {isAdmin ? (
                  <span className="badge bg-warning text-dark px-3 py-2">
                    👑 Administrador
                  </span>
                ) : (
                  <span className="badge bg-dark px-3 py-2">
                    🧑‍💼 Cliente
                  </span>
                )}
              </div>

              <hr />

              <div className="small text-muted mb-2">
                Información de cuenta
              </div>
              <p className="mb-1">
                <strong>Email:</strong> {user.email}
              </p>

              <div className="mt-3">
                <div className="small text-muted mb-1">Resumen rápido</div>
                <div className="d-flex gap-2 flex-wrap">
                  <span className="account-chip">
                    👛 Compras: {orders.length}
                  </span>
                  <span className="account-chip">
                    Rol: {isAdmin ? 'Admin' : 'Cliente'}
                  </span>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button
                  className="btn btn-warning px-4 fw-semibold"
                  onClick={logout}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>

          {/* Columna derecha: detalles + historial */}
          <div className="col-lg-12">
            <div className="account-card p-4 shadow-sm bg-white rounded-3 mb-4">
              <h5 className="mb-3">Detalles de la cuenta</h5>
              <p className="mb-2">
                <strong>Nombre completo:</strong> {user.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="mb-0 text-muted">
                Próximamente podrás editar tus datos, cambiar contraseña y
                gestionar direcciones de envío desde aquí.
              </p>
            </div>

            {/* Historial de compras */}
            <div className="account-card p-4 shadow-sm bg-white rounded-3">
              <h5 className="mb-3">Historial de compras</h5>

              {loadingOrders && (
                <p className="text-muted mb-0">
                  Cargando tus compras...
                </p>
              )}

              {errorOrders && (
                <div className="alert alert-danger py-2">
                  {errorOrders}
                </div>
              )}

              {!loadingOrders && !errorOrders && orders.length === 0 && (
                <p className="text-muted mb-0">
                  Aún no has realizado compras. Explora el catálogo y encuentra
                  tu primera pieza histórica. 🏺
                </p>
              )}

              {!loadingOrders && !errorOrders && orders.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-sm align-middle">
                    <thead>
                      <tr>
                        <th>N° pedido</th>
                        <th>Fecha</th>
                        <th>Productos</th>
                        <th>Estado</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>
                            {order.date
                              ? new Date(order.date).toLocaleDateString(
                                  'es-CL'
                                )
                              : '-'}
                          </td>
                          <td>
                            {order.itemsCount ??
                              order.items?.length ??
                              '-'}
                          </td>
                          <td>
                            <span
                              className={`badge ${getStatusClass(
                                order.status
                              )}`}
                            >
                              {formatStatus(order.status)}
                            </span>
                          </td>
                          <td className="text-end">
                            {order.total != null
                              ? `$${order.total.toLocaleString('es-CL')}`
                              : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helpers de estado
function getStatusClass(status) {
  const s = (status || '').toUpperCase()
  if (s === 'PAGADO' || s === 'COMPLETADO') return 'bg-success'
  if (s === 'PENDIENTE') return 'bg-warning text-dark'
  if (s === 'CANCELADO') return 'bg-danger'
  return 'bg-secondary'
}

function formatStatus(status) {
  if (!status) return 'Desconocido'
  const s = status.toUpperCase()
  if (s === 'PAGADO') return 'Pagado'
  if (s === 'COMPLETADO') return 'Completado'
  if (s === 'PENDIENTE') return 'Pendiente'
  if (s === 'CANCELADO') return 'Cancelado'
  return status
}
