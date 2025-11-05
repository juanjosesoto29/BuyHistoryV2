import { useLocation, Link, Navigate } from 'react-router-dom'

export default function PagoExitoso() {
  const location = useLocation()
  const state = location.state

  if (!state) return <Navigate to="/catalogo" replace />

  const { total, orderId } = state

  return (
    <div className="checkout-wrap">
      <div className="checkout-inner">
        <div className="checkout-card card p-4 text-center">
          <h2 className="ck-title mb-2">✅ ¡Pago Exitoso!</h2>
          <p className="ck-subtitle mb-4">Tu orden fue procesada correctamente.</p>

          <div className="mb-3">
            <p><strong>Número de orden:</strong> #{orderId}</p>
            <p><strong>Total pagado:</strong> ${total.toLocaleString('es-CL')}</p>
          </div>

          <p className="text-muted mb-4">
            Recibirás un correo con los detalles de tu compra.
          </p>

          <Link to="/catalogo" className="btn btn-pay">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
