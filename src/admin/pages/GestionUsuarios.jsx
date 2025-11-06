import { useEffect, useState } from 'react'
import { getUsers, deleteUser, updateUserRole } from '../../api/users'

export default function GestionUsuarios() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // leer usuario logueado
    try {
      const u = JSON.parse(localStorage.getItem('bh_user'))
      setCurrentUser(u || null)
    } catch {
      setCurrentUser(null)
    }

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

  const handleDelete = async (id, role) => {
    if (role === 'admin') {
      alert('No puedes eliminar un usuario con rol admin.')
      return
    }
    if (!window.confirm('¿Eliminar este usuario?')) return
    try {
      await deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      console.error(err)
      alert('No se pudo eliminar el usuario')
    }
  }

  const handleRoleChange = async (id, newRole) => {
    try {
      const updated = await updateUserRole(id, newRole)
      setUsers(prev =>
        prev.map(u => (u.id === updated.id ? { ...u, role: updated.role } : u))
      )
    } catch (err) {
      console.error(err)
      alert(err.message || 'No se pudo actualizar el rol')
    }
  }

  if (loading) return <p>Cargando usuarios...</p>
  if (error) return <p className="text-danger">Error: {error}</p>

  return (
    <div className="adm-usuarios">
      <h2 className="mb-3">Gestión de usuarios</h2>
      <p className="text-muted mb-3">
        Lista de usuarios registrados en el sistema. Puedes cambiar el rol de cliente a admin.
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
                <th style={{ width: 160 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const isSelf = currentUser && currentUser.id === u.id
                return (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        style={{ width: '120px' }}
                        value={u.role}
                        onChange={e => handleRoleChange(u.id, e.target.value)}
                        disabled={isSelf} // opcional: no permitir que el admin se cambie a sí mismo
                      >
                        <option value="cliente">cliente</option>
                        <option value="admin">admin</option>
                      </select>
                      {isSelf && (
                        <small className="text-muted ms-2">
                          (tú)
                        </small>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(u.id, u.role)}
                        disabled={u.role === 'admin'}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
