// src/pages/Login.jsx
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const nav = useNavigate()
  const [form, setForm] = useState({ email:'', password:'' })

  const submit = (e) => {
    e.preventDefault()
    // Simulación login: persistimos un usuario mínimo
    const user = { name: form.email.split('@')[0], email: form.email }
    localStorage.setItem('bh_user', JSON.stringify(user))
    nav('/cuenta')
  }

  return (
    <div className="row justify-content-center py-4">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="mb-3">Ingresar</h3>
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
              <button className="btn btn-dark w-100">Entrar</button>
            </form>
            <p className="mt-3 mb-0 text-center text-muted">
              ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
