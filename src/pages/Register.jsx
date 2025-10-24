import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import '../styles/contact.css' // 👈 reutilizamos el mismo CSS del contacto

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'' })

  const submit = (e) => {
    e.preventDefault()
    if (form.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    const user = { name: form.name.trim(), email: form.email }
    localStorage.setItem('bh_user', JSON.stringify(user))
    nav('/login') // redirige al login después del registro
  }

  return (
    <div className="contact-page"> {/* 👈 contenedor centrado */}
      <div className="contact-card"> {/* 👈 tarjeta centrada */}
        <h3 className="text-center mb-4">Registro</h3>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" required
              value={form.name} onChange={e=>setForm({...form, name: e.target.value})}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required
              value={form.email} onChange={e=>setForm({...form, email: e.target.value})}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" required
              value={form.password} onChange={e=>setForm({...form, password: e.target.value})}/>
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
