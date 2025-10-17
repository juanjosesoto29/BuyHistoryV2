import { useMemo } from 'react'
import { products } from '../data.products'
import { Link } from 'react-router-dom'
import '../styles/shop.css'

export default function Categorias () {
  // Mapa categoría -> {count, sampleImg}
  const data = useMemo(() => {
    const map = new Map()
    for (const p of products) {
      if (!map.has(p.category)) map.set(p.category, { count: 0, img: p.img })
      const ref = map.get(p.category)
      ref.count++
      if (!ref.img) ref.img = p.img
    }
    return Array.from(map.entries()).map(([name, val]) => ({ name, ...val }))
  }, [])

  return (
    <div className="shop-page">
      <h2 className="section-title">Categorías</h2>

      <div className="category-grid">
        {data.map(cat => (
          <Link
            key={cat.name}
            to={`/catalogo?cat=${encodeURIComponent(cat.name)}`}
            className="category-card text-decoration-none"
          >
            <img className="category-thumb" src={cat.img} alt={cat.name} />
            <div className="category-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="category-name">{cat.name}</div>
                <small className="category-count">{cat.count} ítems</small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
