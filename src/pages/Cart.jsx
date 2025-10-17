import { useCart } from '../state/cart.jsx'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default function Cart() {
  const { items, inc, dec, remove, clear, total } = useCart()
  const nav = useNavigate()

  if (!items.length) {
    return (
      <div className="text-center py-5">
        <h2 className="mb-3">Tu carrito está vacío</h2>
        <Link to="/catalogo" className="btn btn-dark">Ir al catálogo</Link>
      </div>
    )
  }

  return (
    <div className="py-3">
      <h2 className="mb-3">Carrito</h2>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead><tr><th>Producto</th><th>Precio</th><th>Cant.</th><th>Total</th><th></th></tr></thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id}>
                <td>{it.name}</td>
                <td>${it.price.toLocaleString('es-CL')}</td>
                <td className="d-flex gap-2 align-items-center">
                  <button className="btn btn-outline-dark btn-sm" onClick={()=>dec(it.id)}>–</button>
                  <span className="px-2">{it.qty}</span>
                  <button className="btn btn-outline-dark btn-sm" onClick={()=>inc(it.id)}>+</button>
                </td>
                <td>${(it.price*it.qty).toLocaleString('es-CL')}</td>
                <td>
                  <button
                  className="btn btn-link text-danger"
                  onClick={() => {
                    remove(it.id)
                    Swal.fire({
                      title: 'Producto eliminado',
                      text: `"${it.name}" fue quitado del carrito.`,
                      icon: 'warning',
                      showConfirmButton: false,
                      timer: 1300,
                      toast: true,
                      position: 'bottom-end',
                      background: '#fff',
                      color: '#111',
                      timerProgressBar: true
                      })
                  }}
                  >
                  Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-danger" onClick={clear}>Vaciar</button>
        <div className="fs-5">Total: <strong>${total.toLocaleString('es-CL')}</strong></div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-warning me-2" onClick={()=>nav('/checkout')}>Continuar al pago</button>
        <Link to="/ofertas" className="btn btn-dark">Ver ofertas</Link>
      </div>
    </div>
  )
}
