import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import '../styles/contact.css' // reutilizamos el mismo CSS

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'' })

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

    // 🧩 Si pasa las validaciones, guardar usuario
    const user = { name: form.name.trim(), email: form.email }
    localStorage.setItem('bh_user', JSON.stringify(user))
    alert('Registro exitoso. Ahora puedes iniciar sesión.')
    nav('/login')
  }

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h3 className="text-center mb-4">Registro</h3>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              required
              placeholder="Agrega tu nombre completo"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              placeholder="Agrega un correo válido, gmail o hotmail"
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

          <button className="btn btn-warning w-100 text-dark">Crear cuenta</button>
        </form>

        <p className="mt-3 mb-0 text-center text-muted">
          ¿Ya tienes cuenta? <Link to="/login">Ingresar</Link>
        </p>
      </div>
    </div>
  )
}
