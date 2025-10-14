import { useState } from 'react'

export default function Contact(){
  const [form,setForm]=useState({nombre:'',apellido:'',correo:'',telefono:'',mensaje:''})
  const [resp,setResp]=useState('')
  const onChange = e => setForm({...form,[e.target.id]:e.target.value})
  const onSubmit = e => {
    e.preventDefault()
    setResp('✅ Mensaje enviado. ¡Gracias por contactarnos!')
  }
  return (
    <section>
      <h2>Escríbenos</h2>
      <form onSubmit={onSubmit} className="form" id="contactForm">
        <input id="nombre" placeholder="Nombre" required value={form.nombre} onChange={onChange} />
        <input id="apellido" placeholder="Apellido" required value={form.apellido} onChange={onChange} />
        <input id="correo" type="email" placeholder="Correo" required value={form.correo} onChange={onChange} />
        <input id="telefono" placeholder="Teléfono (Ej: 987654321)" required value={form.telefono} onChange={onChange} />
        <textarea id="mensaje" placeholder="Escribe tu mensaje..." required value={form.mensaje} onChange={onChange} />
        <button className="btn" type="submit">Enviar</button>
        <p id="respuesta">{resp}</p>
      </form>
    </section>
  )
}