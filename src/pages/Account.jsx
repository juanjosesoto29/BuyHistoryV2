// src/pages/Account.jsx
import { useEffect, useState } from 'react'

export default function Account() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('bh_user'))
      setUser(u || null)
    } catch {
      setUser(null)
    }
  }, [])

  if (!user) {
    return (
      <div className="py-5 text-center">
        <h3>No has iniciado sesión</h3>
        <p className="text-muted">Ingresa desde el menú “Ingresar”.</p>
      </div>
    )
  }

  const logout = () => {
    localStorage.removeItem('bh_user')
    location.href = '/'
  }

  return (
    <div className="py-4">
      <h2>Mi cuenta</h2>
      <div className="card mt-3">
        <div className="card-body">
          <p className="mb-1"><strong>Nombre:</strong> {user.name}</p>
          <p className="mb-3"><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-outline-danger" onClick={logout}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  )
}
