export default function GestionUsuarios() {
  let u = null
  try { u = JSON.parse(localStorage.getItem('bh_user')) } catch {}
  const list = u ? [u] : []

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Gestión de usuarios</h5>
        {!list.length ? (
          <p className="text-muted m-0">Sin usuarios (inicia sesión para visualizar).</p>
        ) : (
          <table className="table align-middle m-0">
            <thead><tr><th>Nombre</th><th>Email</th></tr></thead>
            <tbody>
              {list.map((x,ix)=>(
                <tr key={ix}><td>{x.name}</td><td>{x.email}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
