import { useState } from 'react'
import '../styles/contact.css' // 👈 importa tu CSS personalizado

export default function Contact() {
  const [form, setForm] = useState({ nombre:'', email:'', mensaje:'' })
  const submit = (e) => {
    e.preventDefault()
    alert('¡Gracias! Responderemos pronto.')
    setForm({ nombre:'', email:'', mensaje:'' })
  }

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2 className="text-center mb-4">Contacto</h2>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" required
              value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required
              value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea className="form-control" rows="4" required
              value={form.mensaje} onChange={e=>setForm({...form, mensaje:e.target.value})}/>
          </div>
          <div className="text-center">
            <button className="btn btn-warning px-5">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
