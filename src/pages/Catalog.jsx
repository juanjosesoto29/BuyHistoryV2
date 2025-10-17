import { useMemo, useState } from 'react'
import { products } from '../data.products'
import { useCart } from '../state/cart.jsx'
import '../styles/shop.css'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { Link } from 'react-router-dom'


export default function Catalog() {
  const { add, total } = useCart()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Todas')

  const categories = useMemo(() => ['Todas', ...new Set(products.map(p => p.category))], [])
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return products.filter(p => {
      const inCat = (cat === 'Todas') || p.category === cat
      const inText = !t || (p.name + ' ' + p.desc).toLowerCase().includes(t)
      return inCat && inText
    })
  }, [q, cat])

  return (
    <div className="shop-page">
      {/* TOOLBAR */}
      <div className="shop-toolbar">
        <div className="shop-search">
          <input
            value={q}
            onChange={e=>setQ(e.target.value)}
            className="form-control"
            placeholder="Buscar"
          />
          <button className="btn btn-success shop-btn">Buscar</button>
        </div>

        <select
          className="form-select shop-btn"
          value={cat}
          onChange={e=>setCat(e.target.value)}
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <Link to="/carrito" className="shop-btn shop-btn-cart btn">
          <i className="bi bi-cart me-2" />
          Carrito ${total.toLocaleString('es-CL')}
      </Link>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="product-grid">
        {filtered.map(p => (
          <article key={p.id} className="product-card">
            <img className="product-thumb" src={p.img} alt={p.name} />
            <div className="product-body">
              <h5 className="product-title">{p.name}</h5>
              <p className="product-desc">{p.desc}</p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="price-badge">${Number(p.price).toLocaleString('es-CL')}</span>
                <button
  className="btn btn-outline-primary shop-btn shop-btn-outline btn-sm"
  onClick={() => {
    add(p)
    Swal.fire({
      title: 'Producto añadido',
      text: `"${p.name}" fue agregado al carrito.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2e7d32', // verde BuyHistory
      timer: 1500,
      showConfirmButton: false,
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
