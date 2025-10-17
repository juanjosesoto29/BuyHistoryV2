export default function Users() {
  let user = null
  try { user = JSON.parse(localStorage.getItem('bh_user')) } catch {}
  const list = user ? [user] : []

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Usuarios (mock)</h5>
        {!list.length ? (
          <p className="text-muted m-0">Sin usuarios (inicia sesión para ver tu usuario).</p>
        ) : (
          <div className="table-responsive">
            <table className="table m-0">
              <thead><tr><th>Nombre</th><th>Email</th></tr></thead>
              <tbody>
                {list.map((u,ix)=>(
                  <tr key={ix}><td>{u.name}</td><td>{u.email}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
