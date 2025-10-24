import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="py-4">
      <section className="p-5 rounded-3" style={{ background:'#FFF5E6' }}>
        <h1 className="display-5 fw-bold">BUY HISTORY</h1>
        <p className="lead mb-4">
          Descubre objetos históricos únicos: cerámicas, numismática, documentos y piezas excepcionales.
        </p>
        <div className="d-flex gap-2">
          <Link to="/catalogo" className="btn btn-dark">Ver catálogo</Link>
          <Link to="/ofertas" className="btn btn-warning text-dark">Ofertas</Link>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-3">Nuestra curaduría</h2>
        <p className="text-muted">
          Piezas seleccionadas con rigurosidad histórica y conservación garantizada.
        </p>
      </section>
    </div>
  )
}
