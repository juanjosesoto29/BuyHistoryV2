import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/v1/products";

const emptyForm = {
  id: null,
  name: "",
  description: "",
  category: "",
  price: "",
  stock: "",
  imageUrl: "",
  discount: false,
};

export default function GestionProductos() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  // Cargar productos desde el microservicio
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (p) => {
    setForm({
      id: p.id,
      name: p.name || "",
      description: p.description || "",
      category: p.category || "",
      price: p.price ?? "",
      stock: p.stock ?? "",
      imageUrl: p.imageUrl || "",
      discount: !!p.discount,
    });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el producto");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      description: form.description,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      imageUrl: form.imageUrl,
      discount: Boolean(form.discount),
    };

    try {
      let res;
      if (editing && form.id != null) {
        // UPDATE
        res = await fetch(`${API_URL}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // CREATE
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Error al guardar producto");
      const saved = await res.json();

      setProducts((prev) => {
        if (editing) {
          return prev.map((p) => (p.id === saved.id ? saved : p));
        }
        return [...prev, saved];
      });

      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error && !saving) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="adm-gestion-productos">
      <h2 className="mb-3">Gestión de productos</h2>
      <p className="text-muted mb-4">
        Administra los productos del catálogo conectados al microservicio.
      </p>

      {/* FORMULARIO */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editing ? "Editar producto" : "Nuevo producto"}
          </h5>

          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Categoría</label>
              <input
                className="form-control"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="description"
                rows="2"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Precio</label>
              <input
                type="number"
                min="0"
                className="form-control"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Stock</label>
              <input
                type="number"
                min="0"
                className="form-control"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4 d-flex align-items-end">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="discount"
                  name="discount"
                  checked={form.discount}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="discount">
                  En oferta
                </label>
              </div>
            </div>

            <div className="col-12">
              <label className="form-label">URL de imagen</label>
              <input
                className="form-control"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
              />
              <div className="form-text">
                Debe coincidir con lo que usa el catálogo (por ejemplo
                /imgs/sombrero-napoleon.webp).
              </div>
            </div>

            <div className="col-12 d-flex gap-2 justify-content-end">
              {editing && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancelar
                </button>
              )}
              <button className="btn btn-primary" disabled={saving}>
                {saving
                  ? "Guardando..."
                  : editing
                  ? "Actualizar producto"
                  : "Crear producto"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* TABLA DE PRODUCTOS */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Listado de productos</h5>

          {products.length === 0 ? (
            <p className="text-muted">No hay productos registrados.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Oferta</th>
                    <th>Imagen</th>
                    <th style={{ width: 120 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>${p.price?.toLocaleString("es-CL")}</td>
                      <td>{p.stock}</td>
                      <td>{p.discount ? "Sí" : "No"}</td>
                      <td>
                        {p.imageUrl && (
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            style={{
                              width: 48,
                              height: 36,
                              objectFit: "cover",
                              borderRadius: 4,
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => handleEdit(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
