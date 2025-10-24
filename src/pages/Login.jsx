import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import '../styles/contact.css' // Reutilizamos el mismo CSS del contacto

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const submit = (e) => {
    e.preventDefault()

    // 🧩 Validación del correo
    const emailRegex = /^[\w.-]+@(gmail\.com|hotmail\.cl)$/i
    if (!emailRegex.test(form.email)) {
      alert('Solo se permiten correos @gmail.com o @hotmail.cl')
      return
    }

    // 🧩 Validación de la contraseña
    if (form.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    // 🧩 Si todo está bien, guardar usuario y redirigir
    const user = { name: form.email.split('@')[0], email: form.email }
    localStorage.setItem('bh_user', JSON.stringify(user))
    alert('Inicio de sesión exitoso.')
    nav('/cuenta')
  }

  return (
    <div className="contact-page"> {/* contenedor centrado */}
      <div className="contact-card"> {/* tarjeta */}
        <h3 className="text-center mb-4">Iniciar sesión</h3>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              placeholder="Tu correo @gmail.com o @hotmail.cl"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="btn btn-warning w-100">Entrar</button>
        </form>

        <p className="mt-3 mb-0 text-center text-muted">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}
