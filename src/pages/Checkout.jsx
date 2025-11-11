import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../state/cart.jsx'
import { useNavigate } from 'react-router-dom'
import '../styles/shop.css'

const CHILE = {
  'Región Metropolitana de Santiago': [
    'Cerrillos','Cerro Navia','Conchalí','El Bosque','Estación Central','Huechuraba',
    'Independencia','La Cisterna','La Florida','La Granja','La Pintana','La Reina',
    'Las Condes','Lo Barnechea','Lo Espejo','Lo Prado','Macul','Maipú','Ñuñoa',
    'Pedro Aguirre Cerda','Peñalolén','Providencia','Pudahuel','Quilicura','Quinta Normal',
    'Recoleta','Renca','San Joaquín','San Miguel','San Ramón','Santiago','Vitacura'
  ],
}

const ORDERS_API = 'http://localhost:8081/api/v1/orders'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const nav = useNavigate()

  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    depto: '',
    region: 'Región Metropolitana de Santiago',
    comuna: '',
    notas: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Prefill con usuario si existe
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('bh_user'))
      if (u) {
        setForm(f => ({
          ...f,
          nombre: u.name ?? '',
          correo: u.email ?? ''
        }))
      }
    } catch {
      // nada
    }
  }, [])

  const comunas = useMemo(() => CHILE[form.region] || [], [form.region])

  // Si no hay productos en el carrito
  if (!items.length) {
    return (
      <div className="py-5 text-center">
        <h3>No hay productos en el carrito</h3>
        <p className="text-muted">Agrega productos para continuar con el pago.</p>
      </div>
    )
  }

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const required = ['nombre','apellidos','correo','calle','comuna']
    if (required.some(k => !String(form[k]).trim())) {
      setError('Completa los campos obligatorios marcados con *')
      return
    }

    const payload = {
      customerName: `${form.nombre} ${form.apellidos}`.trim(),
      customerEmail: form.correo.trim(),
      addressStreet: form.calle.trim(),
      addressDetail: form.depto.trim() || null,
      region: form.region,
      city: form.comuna,
      notes: form.notas?.trim() || null,
      total,
      items: items.map(it => ({
        productId: it.id,
        productName: it.name,
        quantity: it.qty,
        price: it.price
      }))
    }

    console.log('PAYLOAD A ENVIAR', payload)

    try {
      setLoading(true)

      const res = await fetch(ORDERS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(data?.message || 'Error al crear la orden')
      }

      // Limpio carrito
      clear()

      // Paso toda la info a la pantalla de éxito
      nav('/checkout/exito', {
        replace: true,
        state: {
          order: data,
          orderId: data?.id,
          form,
          items,
          total
        }
      })
    } catch (err) {
      console.error(err)
      setError(err.message || 'Ocurrió un error al procesar el pago')
      nav('/checkout/error', { replace: true, state: { message: err.message } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="shop-page">
      <div className="checkout-wrap">
        <div className="checkout-inner">

          {/* ===== Carrito ===== */}
          <div className="checkout-card card border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <div className="ck-title">Carrito de compra</div>
                  <div className="ck-subtitle">Revisa los productos antes de pagar</div>
                </div>
                <span className="total-pill">
                  Total a pagar:{' '}
                  <strong>${total.toLocaleString('es-CL')}</strong>
                </span>
              </div>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th style={{width:72}}>Imagen</th>
                      <th>Nombre</th>
                      <th style={{width:130}}>Precio</th>
                      <th style={{width:120}}>Cantidad</th>
                      <th style={{width:140}}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(it => (
                      <tr key={it.id}>
                        <td>
                          <div
                            className="rounded bg-light"
                            style={{width:48,height:36,overflow:'hidden'}}
                          >
                            {(it.img || it.imageUrl) && (
                              <img
                                src={it.img || it.imageUrl}
                                alt={it.name}
                                style={{width:'100%',height:'100%',objectFit:'cover'}}
                              />
                            )}
                          </div>
                        </td>
                        <td>{it.name}</td>
                        <td>${Number(it.price).toLocaleString('es-CL')}</td>
                        <td>{it.qty}</td>
                        <td>
                          ${Number(it.price * it.qty).toLocaleString('es-CL')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ===== Información del cliente ===== */}
          <div className="checkout-card card border-0">
            <div className="card-body">
              <div className="ck-title mb-1">Información del cliente</div>
              <div className="ck-subtitle">
                Completa la siguiente información
              </div>

              {error && (
                <div className="alert alert-danger mt-3 py-2">
                  {error}
                </div>
              )}

              <form className="mt-3" onSubmit={onSubmit}>
                {/* Nombre / Apellidos / Correo en 3 columnas */}
                <div className="row g-3">
                  <div className="col-12 col-md-12">
                    <label className="form-label">Nombre*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      placeholder="Nombre"
                      value={form.nombre}
                      onChange={handleChange('nombre')}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-12">
                    <label className="form-label">Apellidos*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      placeholder="Apellidos"
                      value={form.apellidos}
                      onChange={handleChange('apellidos')}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-12">
                    <label className="form-label">Correo*</label>
                    <input
                      type="email"
                      className="form-control ck-input ck-pill"
                      placeholder="correo@ejemplo.com"
                      value={form.correo}
                      onChange={handleChange('correo')}
                      required
                    />
                  </div>
                </div>

                {/* ===== Dirección ===== */}
                <div className="ck-section">
                  <div className="ck-title">
                    Dirección de entrega de los productos
                  </div>
                  <div className="ck-subtitle">
                    Ingrese dirección de forma detallada
                  </div>
                </div>

                <div className="row g-3 mt-1">
                  {/* Calle 8 / Depto 4 */}
                  <div className="col-12 col-md-12">
                    <label className="form-label">Calle*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      placeholder="Ej: Av. Siempre Viva 742"
                      value={form.calle}
                      onChange={handleChange('calle')}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Departamento (opcional)
                    </label>
                    <input
                      className="form-control ck-input ck-pill"
                      placeholder="Ej: Depto 603"
                      value={form.depto}
                      onChange={handleChange('depto')}
                    />
                  </div>

                  {/* Región 6 / Comuna 6 */}
                  <div className="col-12 col-md-12">
                    <label className="form-label">Región*</label>
                    <select
                      className="form-select ck-select ck-pill"
                      value={form.region}
                      onChange={e => {
                        const region = e.target.value
                        const first = (CHILE[region] || [])[0] || ''
                        setForm(f => ({
                          ...f,
                          region,
                          comuna: first
                        }))
                      }}
                    >
                      {Object.keys(CHILE).map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-8">
                    <label className="form-label">Comuna*</label>
                    <select
                      className="form-select ck-select ck-pill"
                      value={form.comuna}
                      onChange={handleChange('comuna')}
                      required
                    >
                      <option value="" disabled>Seleccione una comuna</option>
                      {comunas.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <div className="form-text ck-help">Ej.: Cerrillos</div>
                  </div>

                  {/* Notas */}
                  <div className="col-12">
                    <label className="form-label">
                      Indicaciones para la entrega (opcional)
                    </label>
                    <textarea
                      className="form-control ck-textarea"
                      placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                      value={form.notas}
                      onChange={handleChange('notas')}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-pay" disabled={loading}>
                    {loading
                      ? 'Procesando...'
                      : `Pagar ahora $${total.toLocaleString('es-CL')}`}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
