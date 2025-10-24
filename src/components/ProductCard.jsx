
export default function ProductCard({ product, onAdd = () => {} }) {
  const {
    id,
    nombre, name,
    descripcion, desc,
    precio, price,
    img,
    oferta
  } = product;

  const displayName = nombre ?? name ?? "Producto";
  const displayDesc = descripcion ?? desc ?? "";
  const displayPrice = precio ?? price ?? 0;

  return (
    <div className="card h-100 shadow-sm border-0" data-testid={`product-${id ?? displayName}`}>
      <div className="position-relative">
        <img src={img} className="card-img-top" alt={displayName} />
        {oferta && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2" aria-label="Oferta">
            Oferta
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column" style={{ background: '#FFF5E6' }}>
        <h5 className="card-title">{displayName}</h5>
        {displayDesc && <p className="card-text flex-grow-1">{displayDesc}</p>}
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">${Number(displayPrice).toLocaleString('es-CL')}</span>
          <button className="btn btn-dark btn-sm" onClick={() => onAdd(product)}>Agregar</button>
        </div>
      </div>
    </div>
  );
}
