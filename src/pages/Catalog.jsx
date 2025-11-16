import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../state/cart.jsx'
import '../styles/shop.css'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { Link } from 'react-router-dom'

const API_URL = 'http://localhost:8080/api/v1/products'

// ==================
// REGLAS DE NEGOCIO
// ==================

// Rareza: COMUN / RARO / UNICO
const RARITY_MULTIPLIER = {
  COMUN: 1.0,
  RARO: 1.15,
  UNICO: 1.5
}

// Condición: EXCELENTE / BUENO / REGULAR / etc.
const CONDITION_MULTIPLIER = {
  EXCELENTE: 1.3,
  'MUY BUENO': 1.2,
  BUENO: 1.1,
  REGULAR: 1.0,
  MALO: 0.8
}

// Convierte multiplicador a texto (+15%, -20%, etc.)
function multToPercent(mult) {
  if (!mult || mult === 1) return '+0%'
  const diff = (mult - 1) * 100
  const sign = diff > 0 ? '+' : ''
  return `${sign}${diff.toFixed(0)}%`
}

// Calcula precio final y SIEMPRE devuelve etiquetas visibles
function getPriceBreakdown(product) {
  const base = product.price ?? 0

  const rarityValue = product.rarity || 'COMUN'
  const conditionValue = product.condition || 'REGULAR'

  const rarityKey = rarityValue.toUpperCase()
  const conditionKey = conditionValue.toUpperCase()

  const rarityMult = RARITY_MULTIPLIER[rarityKey] ?? 1
  const condMult = CONDITION_MULTIPLIER[conditionKey] ?? 1

  const finalPrice = Math.round(base * rarityMult * condMult)

  return {
    basePrice: base,
    finalPrice,
    rarityMult,
    condMult,
    rarityLabel: rarityValue,
    conditionLabel: conditionValue
  }
}

export default function Catalog() {
  const { add, total, items } = useCart()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Todas')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar productos desde el backend
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

  // Agregar al carrito con reglas de rareza / condición
  const handleAdd = (product) => {
    const { finalPrice } = getPriceBreakdown(product)

    const rarityKey = (product.rarity || 'COMUN').toUpperCase()
    const isUnique = rarityKey === 'UNICO'
    const existing = items?.find(it => it.id === product.id)

    // Pieza única: no se puede agregar dos veces
    if (isUnique && existing) {
      Swal.fire({
        title: 'Pieza única',
        text: 'Esta pieza ya está en tu carrito. No puedes agregarla dos veces.',
        icon: 'info'
      })
      return
    }

    // Validar stock (si viene desde el backend)
    if (product.stock !== null && product.stock !== undefined && product.stock <= 0) {
      Swal.fire({
        title: 'Sin stock',
        text: 'Lo sentimos, este producto no tiene stock disponible.',
        icon: 'error'
      })
      return
    }

    // Agregar al carrito con el precio ya ajustado
    add({
      ...product,
      price: finalPrice, // el carrito ya usa el precio final
      qty: 1
    })

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
          className="form-control"
          value={q}
          onChange={e => setQ(e.target.value)}
        />

        <select
          value={cat}
          onChange={e => setCat(e.target.value)}
          className="form-select"
        >
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
        {filtered.map(p => {
          const rarityKey = (p.rarity || '').toUpperCase()
          const isUnique = rarityKey === 'UNICO'
          const alreadyInCart = items?.some(it => it.id === p.id)

          const {
            basePrice,
            finalPrice,
            rarityLabel,
            conditionLabel,
            rarityMult,
            condMult
          } = getPriceBreakdown(p)

          // Para piezas únicas mostramos 1, para el resto usamos el stock real
          const displayStock = isUnique ? 1 : (p.stock ?? null)

          return (
            <div key={p.id} className="product-card">
              {/* BADGE SOLO SI ES PIEZA ÚNICA */}
              {isUnique && (
                <span className="product-badge badge-rarity">
                  Pieza única
                </span>
              )}

              <div className="product-image">
                <img src={p.imageUrl} alt={p.name} />
              </div>

              <div className="product-body">
                <h3>{p.name}</h3>
                <p className="product-category">{p.category}</p>
                <p className="product-desc">{p.description}</p>

                {/* Rareza */}
                <p className="product-rarity-line">
                  Rareza:{' '}
                  <strong>{rarityLabel.toUpperCase()}</strong>{' '}
                  <span className="product-tag">
                    ({multToPercent(rarityMult)})
                  </span>
                </p>

                {/* Condición */}
                <p className="product-condition-line">
                  Condición:{' '}
                  <strong>{conditionLabel.toUpperCase()}</strong>{' '}
                  <span className="product-tag">
                    ({multToPercent(condMult)})
                  </span>
                </p>

                {/* Stock */}
                {displayStock !== null && displayStock !== undefined && (
                  <p className="product-stock">
                    Stock:{' '}
                    {displayStock === 1
                      ? '1 unidad'
                      : `${displayStock} unidades`}
                    {isUnique && ' (pieza única)'}
                  </p>
                )}

                {/* Bloque de precios */}
                <div className="product-price-block">
                  <p className="product-base-price">
                    Precio base:{' '}
                    <span className="text-muted">
                      ${basePrice.toLocaleString('es-CL')}
                    </span>
                  </p>
                  <p className="product-final-price">
                    Precio final:{' '}
                    <strong>
                      ${finalPrice.toLocaleString('es-CL')}
                    </strong>{' '}
                    <span className="product-hint">
                      (ajustado por rareza y condición)
                    </span>
                  </p>
                </div>

                {/* Botón */}
                <div className="product-footer">
                  <button
                    className="btn-primary"
                    onClick={() => handleAdd(p)}
                    disabled={
                      (isUnique && alreadyInCart) ||
                      (p.stock !== null &&
                        p.stock !== undefined &&
                        p.stock <= 0)
                    }
                  >
                    {isUnique && alreadyInCart
                      ? 'Ya en el carrito'
                      : (p.stock !== null &&
                         p.stock !== undefined &&
                         p.stock <= 0)
                        ? 'Sin stock'
                        : 'Agregar al carrito'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <p className="shop-empty">No se encontraron productos.</p>
        )}
      </div>
    </div>
  )
}
