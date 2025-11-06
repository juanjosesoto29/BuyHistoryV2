import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../api/users'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Completa todos los campos')
      return
    }

    try {
      setLoading(true)
      const user = await registerUser({ name, email, password })

      // Iniciar sesión automáticamente
      localStorage.setItem('bh_user', JSON.stringify(user))

      // Redirigir según rol
      if (user.role === 'admin') {
        nav('/admin', { replace: true })
      } else {
        nav('/', { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-3 text-center">Crear cuenta</h2>
      <p className="text-muted text-center mb-4">
        Regístrate para comprar y revisar tus pedidos.
      </p>

      {error && (
        <div className="alert alert-danger py-2">{error}</div>
      )}

      <form onSubmit={onSubmit} className="d-grid gap-3">
        <div>
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            placeholder="Tu nombre"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary mt-2" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>

      <p className="text-center mt-3">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  )
}
