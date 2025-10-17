// src/pages/Contact.jsx
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ nombre:'', email:'', mensaje:'' })
  const submit = (e) => {
    e.preventDefault()
    alert('¡Gracias! Responderemos pronto.')
    setForm({ nombre:'', email:'', mensaje:'' })
  }

  return (
    <div className="row justify-content-center py-4">
      <div className="col-12 col-md-8 col-lg-6">
        <h2>Contacto</h2>
        <form className="mt-3" onSubmit={submit}>
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
          <button className="btn btn-dark">Enviar</button>
        </form>
      </div>
    </div>
  )
}
