import { Link } from 'react-router-dom'

export default function PagoFallido() {
  return (
    <div className="checkout-wrap">
      <div className="checkout-inner">
        <div className="checkout-card card p-4 text-center">
          <h2 className="ck-title mb-2">❌ Pago fallido</h2>
          <p className="ck-subtitle mb-4">
            Ocurrió un problema al procesar tu pago. Intenta nuevamente en unos momentos.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/checkout" className="btn btn-pay">
              Reintentar pago
            </Link>
            <Link to="/catalogo" className="btn btn-outline-primary">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
