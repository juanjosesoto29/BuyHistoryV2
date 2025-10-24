import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import '../styles/contact.css' // Reutilizamos el mismo CSS del contacto

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ email:'', password:'' })

  const submit = (e) => {
    e.preventDefault()
    const user = { name: form.email.split('@')[0], email: form.email }
    localStorage.setItem('bh_user', JSON.stringify(user))
    nav('/cuenta')
  }

  return (
    <div className="contact-page"> {/* 👈 usamos el contenedor flex del contacto */}
      <div className="contact-card"> {/* 👈 reutilizamos la tarjeta centrada */}
        <h3 className="text-center mb-4">Iniciar sesión</h3>
        <form onSubmit={submit}>
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
          <button className="btn btn-warning w-100">Entrar</button>
        </form>
        <p className="mt-3 mb-0 text-center text-muted">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}
