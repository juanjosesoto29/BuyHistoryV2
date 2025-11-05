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
    nombre:'', apellidos:'', correo:'',
    calle:'', depto:'', region:'Región Metropolitana de Santiago', comuna:'',
    notas:''
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('bh_user'))
      if (u) setForm(f => ({ ...f, nombre: u.name ?? '', correo: u.email ?? '' }))
    } catch {}
  }, [])

  const comunas = useMemo(() => CHILE[form.region] || [], [form.region])

  if (!items.length) {
    return (
      <div className="py-5 text-center">
        <h3>No hay productos en el carrito</h3>
        <p className="text-muted">Agrega productos para continuar con el pago.</p>
      </div>
    )
  }

  const onSubmit = async (e) => {
  e.preventDefault()

  const required = ['nombre','apellidos','correo','calle','comuna']
  if (required.some(k => !String(form[k]).trim())) {
    return alert('Completa los campos obligatorios marcados con *')
  }

  const payload = {
    customerName: `${form.nombre} ${form.apellidos}`.trim(),
    customerEmail: form.correo,

    // 🔹 Dirección completa que espera el backend
    addressStreet: form.calle,
    addressDetail: form.depto,
    region: form.region,
    city: form.comuna,
    notes: form.notas,

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

    const res = await fetch('http://localhost:8081/api/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Error al crear la orden')

    const data = await res.json()

    clear()
    nav('/pago-exitoso', {
      replace: true,
      state: { total, orderId: data.id }
    })
  } catch (err) {
    console.error(err)
    nav('/pago-fallido', { replace: true })
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="shop-page">
      <div className="checkout-wrap">
        <div className="checkout-inner">

          {/* Carrito */}
          <div className="checkout-card card border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <div className="ck-title">Carrito de compra</div>
                  <div className="ck-subtitle">Completa la siguiente información</div>
                </div>
                <span className="total-pill">
                  Total a pagar: <strong>${total.toLocaleString('es-CL')}</strong>
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
                          <div className="rounded bg-light" style={{width:48,height:36,overflow:'hidden'}}>
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
                        <td>${Number(it.price * it.qty).toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Información del cliente */}
          <div className="checkout-card card border-0">
            <div className="card-body">
              <div className="ck-title mb-1">Información del cliente</div>
              <div className="ck-subtitle">Completa la siguiente información</div>

              <form className="mt-3" onSubmit={onSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-12">
                    <label className="form-label">Nombre*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      placeholder="Nombre"
                      value={form.nombre}
                      onChange={e=>setForm({...form, nombre:e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-12">
                    <label className="form-label">Apellidos*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      placeholder="Apellidos"
                      value={form.apellidos}
                      onChange={e=>setForm({...form, apellidos:e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Correo*</label>
                    <input
                      type="email"
                      className="form-control ck-input ck-pill"
                      placeholder="correo@ejemplo.com"
                      value={form.correo}
                      onChange={e=>setForm({...form, correo:e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Dirección */}
                <div className="ck-section">
                  <div className="ck-title">Dirección de entrega</div>
                  <div className="ck-subtitle">Ingrese dirección de forma detallada</div>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-12">
                    <label className="form-label">Calle*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      placeholder="Ej: Av. Siempre Viva 742"
                      value={form.calle}
                      onChange={e=>setForm({...form, calle:e.target.value})}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-8">
                    <label className="form-label">Departamento (opcional)</label>
                    <input
                      className="form-control ck-input ck-pill"
                      placeholder="Ej: 603"
                      value={form.depto}
                      onChange={e=>setForm({...form, depto:e.target.value})}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Región*</label>
                    <select
                      className="form-select ck-select ck-pill"
                      value={form.region}
                      onChange={e=>{
                        const region = e.target.value
                        const first = (CHILE[region] || [])[0] || ''
                        setForm(f => ({ ...f, region, comuna: first }))
                      }}
                    >
                      {Object.keys(CHILE).map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Comuna*</label>
                    <select
                      className="form-select ck-select ck-pill"
                      value={form.comuna}
                      onChange={e=>setForm({...form, comuna:e.target.value})}
                      required
                    >
                      <option value="" disabled>Seleccione una comuna</option>
                      {comunas.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Indicaciones (opcional)</label>
                    <textarea
                      className="form-control ck-textarea"
                      placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                      value={form.notas}
                      onChange={e=>setForm({...form, notas:e.target.value})}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-pay" disabled={loading}>
                    {loading ? 'Procesando...' : `Pagar ahora $${total.toLocaleString('es-CL')}`}
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
