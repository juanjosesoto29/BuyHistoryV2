export default function ProductCard({ product, onAdd }) {
  const { name, desc, price, img } = product
  return (
    <div className="card h-100 shadow-sm border-0">
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body d-flex flex-column" style={{ background:'#FFF5E6' }}>
        <h5 className="card-title">{name}</h5>
        <p className="card-text flex-grow-1">{desc}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">${Number(price).toLocaleString('es-CL')}</span>
          <button className="btn btn-dark btn-sm" onClick={() => onAdd(product)}>Agregar</button>
        </div>
      </div>
    </div>
  )
}
