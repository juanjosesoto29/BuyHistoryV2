import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    localStorage.setItem('bh_user', JSON.stringify({ email }))
    nav('/cuenta')
  }

  return (
    <section className="formulario-seccion">
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit} className="form-login">
        <div className="campo">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label>Contraseña</label>
          <div className="fila">
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              required
            />
            <button type="submit" className="boton">Ingresar</button>
          </div>
        </div>
      </form>
    </section>
  )
}
