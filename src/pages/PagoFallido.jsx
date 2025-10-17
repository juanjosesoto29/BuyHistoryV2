import { Link } from 'react-router-dom'

export default function CheckoutError() {
  return (
    <div className="text-center py-5">
      <div className="display-1 text-danger mb-3">✕</div>
      <h2>No se pudo procesar el pago</h2>
      <p className="text-muted">Revisa tus datos e inténtalo nuevamente.</p>
      <Link to="/checkout" className="btn btn-warning mt-3">Volver al checkout</Link>
    </div>
  )
}
