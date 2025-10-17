// src/pages/Offers.jsx
import { products } from '../data.products'
import { useCart } from '../state/cart.jsx'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '../styles/shop.css'

export default function Ofertas() {
  const { add } = useCart()
  const offers = products.filter(p => p.discount)

  if (!offers.length) {
    return (
      <div className="shop-page text-center py-5">
        <h3>No hay ofertas disponibles</h3>
        <p className="text-muted">Vuelve pronto para descubrir nuevos descuentos.</p>
      </div>
    )
  }

  return (
    <div className="shop-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0 fw-bold">Ofertas</h2>
        <span className="badge bg-warning text-dark px-3 py-2 fs-6">
          {offers.length} productos en promoción
        </span>
      </div>

      <div className="product-grid">
        {offers.map(p => (
          <article key={p.id} className="product-card position-relative">
            {/* etiqueta oferta */}
            <span className="offer-badge">Oferta</span>

            <img className="product-thumb" src={p.img} alt={p.name} />
            <div className="product-body">
              <h5 className="product-title">{p.name}</h5>
              <p className="product-desc">{p.desc}</p>

              <div className="d-flex justify-content-between align-items-center mt-auto">
                <span className="price-badge text-danger">
                  ${Number(p.price).toLocaleString('es-CL')}
                </span>
                <button
                  className="btn btn-outline-primary shop-btn shop-btn-outline btn-sm"
                  onClick={() => {
                    add(p)
                    Swal.fire({
                      title: 'Producto añadido',
                      text: `"${p.name}" fue agregado al carrito.`,
                      icon: 'success',
                      timer: 1300,
                      toast: true,
                      position: 'bottom-end',
                      showConfirmButton: false,
                      background: '#fff',
                      color: '#111',
                      timerProgressBar: true
                    })
                  }}
                >
                  Agregar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
