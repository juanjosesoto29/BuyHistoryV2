export default function Ordenes() {
  const orders = [] 

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Pedidos</h5>
        {!orders.length ? (
          <p className="text-muted m-0">Aún no hay pedidos.</p>
        ) : (
          <div className="table-responsive">
            <table className="table m-0">
              <thead><tr><th>ID</th><th>Cliente</th><th>Total</th><th>Fecha</th></tr></thead>
              <tbody>{/* map orders */}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
