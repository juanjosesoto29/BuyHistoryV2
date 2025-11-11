import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../api/users'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError('Ingresa correo y contraseña')
      return
    }

    try {
      setLoading(true)
      const user = await loginUser(email, password)

      // 🔹 Verificamos si el rol devuelto por el backend es ADMIN
      const isAdmin = user.role?.toUpperCase() === 'ADMIN'

      // 🔹 Guardamos los datos en localStorage con el flag de admin
      localStorage.setItem('bh_user', JSON.stringify({ ...user, isAdmin }))
      localStorage.setItem('bh_isAdmin', JSON.stringify(isAdmin))

      // 🔹 Redirección según el rol
      if (isAdmin) {
        nav('/admin', { replace: true })
      } else {
        nav('/', { replace: true })
      }

    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-3 text-center">Iniciar sesión</h2>
      <p className="text-muted text-center mb-4">
        Accede con tu correo y contraseña.
      </p>

      {error && (
        <div className="alert alert-danger py-2">{error}</div>
      )}

      <form onSubmit={onSubmit} className="d-grid gap-3">
        <div>
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="btn btn-primary mt-2"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p className="text-center mt-3">
        ¿No tienes cuenta?{' '}
        <Link to="/registro">Crea una aquí</Link>
      </p>
    </div>
  )
}
