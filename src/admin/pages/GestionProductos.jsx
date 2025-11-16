import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/v1/products";

const emptyForm = {
  id: null,
  name: "",
  description: "",
  category: "",
  basePrice: "",
  stock: "",
  imageUrl: "",
  discount: false,
  esUnico: false,
  rareza: "COMUN",
  condicion: "BUENA"
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

    // Si marca "esUnico", stock = 1 automáticamente
    if (name === "esUnico") {
      return setForm((f) => ({
        ...f,
        esUnico: checked,
        stock: checked ? 1 : f.stock
      }));
    }

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
      basePrice: p.basePrice ?? "",
      stock: p.stock ?? "",
      imageUrl: p.imageUrl || "",
      discount: !!p.discount,
      esUnico: !!p.esUnico,
      rareza: p.rareza || "COMUN",
      condicion: p.condicion || "BUENA"
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
      basePrice: Number(form.basePrice),
      stock: Number(form.stock),
      imageUrl: form.imageUrl,
      discount: form.discount,
      esUnico: form.esUnico,
      rareza: form.rareza,
      condicion: form.condicion
    };

    try {
      let res;
      if (editing && form.id != null) {
        res = await fetch(`${API_URL}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
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

      {/* FORMULARIO */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>{editing ? "Editar producto" : "Nuevo producto"}</h5>

          <form onSubmit={handleSubmit} className="row g-3">
            {/* Nombre y categoría */}
            <div className="col-md-6">
              <label>Nombre</label>
              <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label>Categoría</label>
              <input className="form-control" name="category" value={form.category} onChange={handleChange} required />
            </div>

            {/* Descripción */}
            <div className="col-12">
              <label>Descripción</label>
              <textarea className="form-control" name="description" rows="2" value={form.description} onChange={handleChange} />
            </div>

            {/* Base Price */}
            <div className="col-md-4">
              <label>Precio Base</label>
              <input type="number" min="0" className="form-control"
                name="basePrice" value={form.basePrice} onChange={handleChange} required />
            </div>

            {/* Stock */}
            <div className="col-md-4">
              <label>Stock</label>
              <input type="number" min="1" className="form-control"
                name="stock"
                disabled={form.esUnico}
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>

            {/* Checkbox único */}
            <div className="col-md-4 d-flex align-items-end">
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                  name="esUnico" checked={form.esUnico} onChange={handleChange} />
                <label>Artículo único</label>
              </div>
            </div>

            {/* Rareza */}
            <div className="col-md-6">
              <label>Rareza</label>
              <select className="form-select" name="rareza" value={form.rareza} onChange={handleChange}>
                <option value="COMUN">Común</option>
                <option value="RARO">Raro</option>
                <option value="LEGENDARIO">Legendario</option>
              </select>
            </div>

            {/* Condición */}
            <div className="col-md-6">
              <label>Condición</label>
              <select className="form-select" name="condicion" value={form.condicion} onChange={handleChange}>
                <option value="EXCELENTE">Excelente</option>
                <option value="BUENA">Buena</option>
                <option value="REGULAR">Regular</option>
              </select>
            </div>

            {/* Oferta */}
            <div className="col-md-12 d-flex align-items-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="discount"
                  checked={form.discount} onChange={handleChange} />
                <label>En oferta</label>
              </div>
            </div>

            {/* URL imagen */}
            <div className="col-12">
              <label>URL imagen</label>
              <input className="form-control" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
            </div>

            {/* Botones */}
            <div className="col-12 d-flex gap-2 justify-content-end">
              {editing && (
                <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                  Cancelar
                </button>
              )}
              <button className="btn btn-primary" disabled={saving}>
                {saving ? "Guardando..." : editing ? "Guardar Cambios" : "Crear Producto"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* TABLA */}
      <div className="card">
        <div className="card-body">
          <h5>Listado de productos</h5>

          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio Final</th>
                  <th>Stock</th>
                  <th>Rareza</th>
                  <th>Condición</th>
                  <th>Único</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
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
                    <td>{p.rareza}</td>
                    <td>{p.condicion}</td>
                    <td>{p.esUnico ? "Sí" : "No"}</td>
                    <td>
                      {p.imageUrl && (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 4 }}
                        />
                      )}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEdit(p)}>Editar</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
