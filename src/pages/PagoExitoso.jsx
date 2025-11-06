import { useLocation, Link } from 'react-router-dom'

export default function PagoExitoso() {
  const { state } = useLocation() || {}
  const order = state?.order || null
  const form = state?.form || {}
  const itemsFromCart = state?.items || []

  const total =
    order?.total ??
    state?.total ??
    itemsFromCart.reduce((acc, it) => acc + it.price * it.qty, 0)

  // Datos del cliente / dirección (mezcla order + form por si algo falta)
  const cliente = {
    nombre: form.nombre || order?.customerName?.split(' ')?.[0] || '',
    apellidos:
      form.apellidos ||
      order?.customerName?.split(' ')?.slice(1).join(' ') ||
      '',
    correo: form.correo || order?.customerEmail || '',
    calle: form.calle || order?.addressStreet || '',
    depto: form.depto || order?.addressDetail || '',
    region: form.region || order?.region || '',
    comuna: form.comuna || order?.city || '',
    notas: form.notas || order?.notes || '',
  }

  const items =
    itemsFromCart.length > 0
      ? itemsFromCart
      : order?.items?.map(it => ({
          id: it.productId,
          name: it.productName,
          price: it.price,
          qty: it.quantity,
          img: null,
        })) || []

  const fecha = order?.createdAt
    ? new Date(order.createdAt).toLocaleString('es-CL')
    : null

  const codigoOrden =
    order?.id != null ? `ORDER${String(order.id).padStart(5, '0')}` : '—'

  const handlePrint = () => {
    window.print() // por ahora usamos el print del navegador
  }

  const handleSendEmail = () => {
    alert(
      'Simulación: aquí se enviaría la boleta al correo del cliente.\n\n(Para la tarea basta con esta acción.)'
    )
  }

  return (
    <div className="shop-page">
      <div className="checkout-wrap">
        <div className="checkout-inner">
          <div className="checkout-card card border-0">
            <div className="card-body">
              {/* CABECERA */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex gap-2">
                  <i className="bi bi-check-circle-fill text-success fs-3" />
                  <div>
                    <div className="fw-bold fs-5">
                      Se ha realizado la compra. nro{' '}
                      <span className="text-success">
                        #{order?.id ?? '—'}
                      </span>
                    </div>
                    <div className="text-muted">
                      Completa la siguiente información
                    </div>
                  </div>
                </div>
                <div className="text-end text-muted small">
                  <div>
                    Código orden: <strong>{codigoOrden}</strong>
                  </div>
                  {fecha && <div>Fecha: {fecha}</div>}
                </div>
              </div>

              {/* FORMULARIO (SOLO LECTURA) */}
              <form className="mt-3">
                <div className="row g-3">
                  <div className="col-12 col-md-12">
                    <label className="form-label">Nombre*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      value={cliente.nombre}
                      disabled
                    />
                  </div>
                  <div className="col-12 col-md-12">
                    <label className="form-label">Apellidos*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      value={cliente.apellidos}
                      disabled
                    />
                  </div>
                  <div className="col-12 col-md-12">
                    <label className="form-label">Correo*</label>
                    <input
                      type="email"
                      className="form-control ck-input ck-pill"
                      value={cliente.correo}
                      disabled
                    />
                  </div>
                </div>

                <div className="ck-section">
                  <div className="ck-title">
                    Dirección de entrega de los productos
                  </div>
                  <div className="ck-subtitle">
                    Los datos quedan asociados a la orden
                  </div>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-12 col-md-12">
                    <label className="form-label">Calle*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      value={cliente.calle}
                      disabled
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Departamento (opcional)
                    </label>
                    <input
                      className="form-control ck-input ck-pill"
                      value={cliente.depto}
                      disabled
                    />
                  </div>

                  <div className="col-12 col-md-12">
                    <label className="form-label">Región*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      value={cliente.region}
                      disabled
                    />
                  </div>
                  <div className="col-12 col-md-12">
                    <label className="form-label">Comuna*</label>
                    <input
                      className="form-control ck-input ck-pill"
                      value={cliente.comuna}
                      disabled
                    />
                  </div>

                  <div className="col-12 col-md-12">
                    <label className="form-label">
                      Indicaciones para la entrega (opcional)
                    </label>
                    <textarea
                      className="form-control ck-textarea"
                      value={cliente.notas}
                      disabled
                    />
                  </div>
                </div>
              </form>

              {/* TABLA DE ITEMS */}
              <div className="table-responsive mt-4">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: 80 }}>Imagen</th>
                      <th>Nombre</th>
                      <th style={{ width: 120 }}>Precio</th>
                      <th style={{ width: 120 }}>Cantidad</th>
                      <th style={{ width: 140 }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(it => (
                      <tr key={it.id}>
                        <td>
                          <div
                            className="rounded bg-light"
                            style={{
                              width: 56,
                              height: 40,
                              overflow: 'hidden',
                            }}
                          >
                            {(it.img || it.imageUrl) && (
                              <img
                                src={it.img || it.imageUrl}
                                alt={it.name}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                          </div>
                        </td>
                        <td>{it.name}</td>
                        <td>
                          $
                          {Number(it.price).toLocaleString('es-CL')}
                        </td>
                        <td>{it.qty}</td>
                        <td>
                          $
                          {Number(it.price * it.qty).toLocaleString(
                            'es-CL'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TOTAL Y ACCIONES */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">
                <div className="fs-5 fw-semibold">
                  Total pagado:{' '}
                  <span className="text-success">
                    ${Number(total).toLocaleString('es-CL')}
                  </span>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handlePrint}
                  >
                    Imprimir boleta en PDF
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSendEmail}
                  >
                    Enviar boleta por email
                  </button>
                </div>
              </div>

              <div className="mt-3 text-end">
                <Link to="/catalogo" className="btn btn-link">
                  Volver al catálogo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
