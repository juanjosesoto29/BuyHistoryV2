import { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../../api/users'

export default function GestionUsuarios() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return
    try {
      await deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      console.error(err)
      alert('No se pudo eliminar el usuario')
    }
  }

  if (loading) return <p>Cargando usuarios...</p>
  if (error) return <p className="text-danger">Error: {error}</p>

  return (
    <div className="adm-usuarios">
      <h2 className="mb-3">Gestión de usuarios</h2>
      <p className="text-muted mb-3">
        Lista de usuarios registrados en el sistema.
      </p>

      {users.length === 0 ? (
        <p className="text-muted">No hay usuarios registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th style={{ width: 120 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    {u.role !== 'admin' && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(u.id)}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
