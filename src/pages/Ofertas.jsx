import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../state/cart.jsx'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '../styles/shop.css'

const API_URL = 'http://localhost:8080/api/v1/products'

// === Reglas de negocio (mismas del catálogo) ===
const RARITY_MULTIPLIER = {
  COMUN: 1.0,
  RARO: 1.15,
  UNICO: 1.5
}

const CONDITION_MULTIPLIER = {
  EXCELENTE: 1.3,
  'MUY BUENO': 1.2,
  BUENO: 1.1,
  REGULAR: 1.0,
  MALO: 0.8
}

function multToPercent(mult) {
  if (!mult || mult === 1) return '+0%'
  const diff = (mult - 1) * 100
  const sign = diff > 0 ? '+' : ''
  return `${sign}${diff.toFixed(0)}%`
}

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
    rarityLabel: rarityValue,
    conditionLabel: conditionValue,
    rarityMult,
    condMult
  }
}

export default function Ofertas() {
  const { add, items } = useCart()
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
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  // Solo productos con "discount"
  const offers = useMemo(
    () => products.filter(p => p.discount),
    [products]
  )

  const handleAdd = (p) => {
    const { finalPrice } = getPriceBreakdown(p)

    add({
      ...p,
      price: finalPrice
    })

    Swal.fire({
      title: 'Producto añadido',
      text: `"${p.name}" fue agregado al carrito.`,
      icon: 'success',
      timer: 1300,
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false
    })
  }

  if (loading) return <p className="shop-loading">Cargando ofertas...</p>
  if (error) return <p className="shop-error">Error: {error}</p>

  return (
    <div className="offers-page">
      <div className="offers-container">

        {/* HEADER */}
        <div className="offers-header">
          <h1>Ofertas</h1>
          <span className="offers-count-badge">
            {offers.length} producto{offers.length !== 1 && 's'} en promoción
          </span>
        </div>

        {/* CARDS IGUALES AL CATÁLOGO */}
        <div className="offers-grid">
          {offers.map(p => {
            const {
              basePrice,
              finalPrice,
              rarityLabel,
              conditionLabel,
              rarityMult,
              condMult
            } = getPriceBreakdown(p)

            const rarityKey = (p.rarity || '').toUpperCase()
            const isUnique = rarityKey === 'UNICO'
            const alreadyInCart = items.some(i => i.id === p.id)

            const displayStock = isUnique ? 1 : (p.stock ?? null)

            return (
              <article key={p.id} className="product-card offer-card">
                
                {/* Badge OFERTA */}
                <div className="offer-tag">Oferta</div>

                {/* Badge PIEZA ÚNICA (si aplica) */}
                {isUnique && (
                  <span className="product-badge badge-rarity">
                    Pieza única
                  </span>
                )}

                <div className="product-image">
                  <img src={p.imageUrl} alt={p.name} />
                </div>

                <div className="product-body">

                  {/* Título */}
                  <h3>{p.name}</h3>

                  {/* Categoría */}
                  <p className="product-category">{p.category}</p>

                  {/* Descripción */}
                  <p className="product-desc">{p.description}</p>

                  {/* Rareza */}
                  <p className="product-rarity-line">
                    Rareza: <strong>{rarityLabel.toUpperCase()}</strong>{' '}
                    <span className="product-tag">
                      ({multToPercent(rarityMult)})
                    </span>
                  </p>

                  {/* Condición */}
                  <p className="product-condition-line">
                    Condición: <strong>{conditionLabel.toUpperCase()}</strong>{' '}
                    <span className="product-tag">
                      ({multToPercent(condMult)})
                    </span>
                  </p>

                  {/* Stock */}
                  {displayStock !== null && (
                    <p className="product-stock">
                      Stock:{' '}
                      {displayStock === 1 ? '1 unidad' : displayStock + ' unidades'}
                      {isUnique && ' (pieza única)'}
                    </p>
                  )}

                  {/* Precios */}
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
                      disabled={
                        (isUnique && alreadyInCart) ||
                        (p.stock !== null && p.stock <= 0)
                      }
                      onClick={() => handleAdd(p)}
                    >
                      {isUnique && alreadyInCart
                        ? 'Ya en el carrito'
                        : (p.stock !== null && p.stock <= 0)
                          ? 'Sin stock'
                          : 'Agregar al carrito'}
                    </button>
                  </div>

                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
