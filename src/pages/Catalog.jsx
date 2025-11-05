import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../state/cart.jsx'
import '../styles/shop.css'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { Link } from 'react-router-dom'

const API_URL = 'http://localhost:8080/api/v1/products'

export default function Catalog() {
  const { add, total } = useCart()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Todas')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Error al cargar productos')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const categories = useMemo(
    () => ['Todas', ...new Set(products.map(p => p.category))],
    [products]
  )

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return products.filter(p => {
      const inCat = cat === 'Todas' || p.category === cat
      const inText =
        !t ||
        (p.name + ' ' + (p.description ?? '')).toLowerCase().includes(t)
      return inCat && inText
    })
  }, [q, cat, products])

  const handleAdd = (product) => {
    add(product)
    Swal.fire({
      title: 'Agregado al carrito',
      text: `${product.name} se agregó correctamente`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  }

  if (loading) return <p className="shop-loading">Cargando productos...</p>
  if (error) return <p className="shop-error">Error: {error}</p>

  return (
    <div className="shop-container">
      {/* Filtros / barra superior */}
      <div className="shop-filters">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />

        <select value={cat} onChange={e => setCat(e.target.value)}>
          {categories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="shop-cart-summary">
          <span>Total carrito: ${total.toLocaleString('es-CL')}</span>
          <Link to="/carrito" className="btn-cart">
            Ver carrito
          </Link>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="shop-grid">
        {filtered.map(p => (
          <div key={p.id} className="product-card">
            {p.discount && <span className="product-badge">OFERTA</span>}

            <div className="product-image">
              <img src={p.imageUrl} alt={p.name} />
            </div>

            <div className="product-body">
              <h3>{p.name}</h3>
              <p className="product-category">{p.category}</p>
              <p className="product-desc">{p.description}</p>

              <div className="product-footer">
                <span className="product-price">
                  ${p.price.toLocaleString('es-CL')}
                </span>
                <button
                  className="btn-primary"
                  onClick={() => handleAdd(p)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="shop-empty">No se encontraron productos.</p>
        )}
      </div>
    </div>
  )
}
