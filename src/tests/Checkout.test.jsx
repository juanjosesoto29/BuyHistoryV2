import React, { useMemo, useState } from "react";
import { useCart } from "../state/cart";
import { useNavigate, Link } from "react-router-dom";

function clp(n) {
  return `$${Number(n || 0).toLocaleString("es-CL")}`;
}

export default function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    direccion: "",
    tarjeta: "",
  });
  const [errors, setErrors] = useState({});

  const isEmpty = items.length === 0;

  const subtotalPorItem = useMemo(
    () =>
      items.map((p) => ({
        id: p.id,
        label: p.name ?? p.nombre ?? `Producto ${p.id}`,
        qty: Number(p.qty ?? 1),
        price: Number(p.price ?? 0),
        subTotal: Number(p.price ?? 0) * Number(p.qty ?? 1),
        img: p.img,
      })),
    [items]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Correo inválido";
    if (!form.direccion.trim()) e.direccion = "Requerido";
    if (!form.tarjeta.trim() || form.tarjeta.replace(/\s+/g, "").length < 12)
      e.tarjeta = "Tarjeta inválida";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (isEmpty) return;
    if (!validate()) return;

    let ok = true;
    try {
      if (typeof window !== "undefined" && typeof window.fetch === "function") {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            buyer: form,
            items: items.map((p) => ({
              id: p.id,
              name: p.name ?? p.nombre,
              price: p.price,
              qty: p.qty ?? 1,
            })),
            total,
          }),
        });
        ok = res.ok;
      }
    } catch {
      ok = false;
    }

    if (ok) {
      clear();
      navigate("/pago-exitoso");
    } else {
      navigate("/pago-fallido");
    }
  };

  return (
    <div className="container my-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/carrito">Carrito</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Checkout</li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Columna resumen */}
        <div className="col-12 col-lg-5 order-lg-2">
          <div className="card border-0 shadow-sm">
            <div className="card-body" style={{ background: "#FFF5E6" }}>
              <h5 className="card-title mb-3">Resumen</h5>
              {isEmpty ? (
                <p className="text-muted">Tu carrito está vacío.</p>
              ) : (
                <>
                  <ul className="list-group list-group-flush mb-3">
                    {subtotalPorItem.map((p) => (
                      <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          {p.img && (
                            <img src={p.img} alt={p.label} width={40} height={40} style={{ objectFit: "cover", borderRadius: 8 }} />
                          )}
                          <div>
                            <div className="fw-semibold">{p.label}</div>
                            <small className="text-muted">x{p.qty} · {clp(p.price)}</small>
                          </div>
                        </div>
                        <div className="fw-semibold">{clp(p.subTotal)}</div>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Total</span>
                    <span className="h5 m-0">{clp(total)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Columna formulario */}
        <div className="col-12 col-lg-7 order-lg-1">
          <div className="card border-0 shadow-sm">
            <div className="card-body" style={{ background: "#FFF5E6" }}>
              <h5 className="card-title mb-3">Datos de compra</h5>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label" htmlFor="nombre">Nombre completo</label>
                  <input
                    id="nombre"
                    name="nombre"
                    className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                    placeholder="Juan José Soto"
                    value={form.nombre}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Correo</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="correo@ejemplo.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="direccion">Dirección</label>
                  <input
                    id="direccion"
                    name="direccion"
                    className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
                    placeholder="Av. Siempre Viva 123"
                    value={form.direccion}
                    onChange={handleChange}
                    autoComplete="address-line1"
                  />
                  {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="tarjeta">Tarjeta</label>
                  <input
                    id="tarjeta"
                    name="tarjeta"
                    className={`form-control ${errors.tarjeta ? "is-invalid" : ""}`}
                    placeholder="4111 1111 1111 1111"
                    value={form.tarjeta}
                    onChange={handleChange}
                    autoComplete="cc-number"
                  />
                  {errors.tarjeta && <div className="invalid-feedback">{errors.tarjeta}</div>}
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg"
                    disabled={isEmpty}
                    aria-disabled={isEmpty}
                  >
                    {isEmpty ? "Carrito vacío" : `Pagar ahora ${clp(total)}`}
                  </button>
                </div>

                <p className="text-muted mt-2 mb-0" style={{ fontSize: 12 }}>
                  Tus datos están protegidos. No almacenamos información de tarjetas.
                </p>
              </form>
            </div>
          </div>

          <div className="mt-3">
            <Link to="/catalogo" className="btn btn-outline-dark btn-sm">Seguir comprando</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
