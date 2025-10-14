
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const nav = useNavigate()
  const [form,setForm]=useState({nombre:'',email:'',password:''})
  const onChange = e => setForm({...form,[e.target.name]:e.target.value})
  const onSubmit = e => {
    e.preventDefault()
    localStorage.setItem('bh_user', JSON.stringify({nombre:form.nombre,email:form.email}))
    nav('/cuenta')
  }
  return (
    <section>
      <h2>Registrarse</h2>
      <form onSubmit={onSubmit} aria-label="Formulario de registro">
        <label>Nombre completo
          <input name="nombre" value={form.nombre} onChange={onChange} required />
        </label>
        <label>Correo
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </label>
        <label>Contraseña
          <input type="password" name="password" value={form.password} onChange={onChange} required />
        </label>
        <button className="btn">Crear cuenta</button>
      </form>
    </section>
  )
}
