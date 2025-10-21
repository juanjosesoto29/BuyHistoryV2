import { Link, useLocation } from 'react-router-dom'

export default function CheckoutSuccess() {
  const { state } = useLocation()
  return (
    <div className="text-center py-5">
      <div className="display-1 text-success mb-3">✓</div>
      <h2>¡Compra realizada con éxito!</h2>
      <p className="text-muted">Total pagado: ${Number(state?.total ?? 0).toLocaleString('es-CL')}</p>
      <Link to="/" className="btn btn-dark mt-3">Volver al inicio</Link>
    </div>
  )
}

// Nota: Este componente asume que la ruta que lo renderiza pasa el total pagado a través del estado de la ubicación.