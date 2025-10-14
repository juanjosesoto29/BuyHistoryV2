import { useState } from 'react'

export default function Payment(){
  const [tarjeta,setTarjeta]=useState('')
  const [expiracion,setExp]=useState('')
  const [cvv,setCvv]=useState('')
  const [msg,setMsg]=useState('')

  const fmtTarjeta = v => v.replace(/\D/g,'').slice(0,16).replace(/(\d{4})(?=\d)/g,'$1 ').trim()
  const fmtExp = v => {
    let s = v.replace(/\D/g,'').slice(0,4)
    return s.length>=3 ? s.slice(0,2)+'/'+s.slice(2) : s
  }
  const fmtCvv = v => v.replace(/\D/g,'').slice(0,3)

  const onSubmit = e => {
    e.preventDefault()
    setMsg('✅ Pago exitoso')
  }

  return (
    <section>
      <h2>Completa tus datos</h2>
      <form className="form" onSubmit={onSubmit}>
        <input placeholder="Nombre" required />
        <input type="email" placeholder="Correo" required />
        <input placeholder="Tarjeta (16 dígitos)" value={tarjeta} onChange={e=>setTarjeta(fmtTarjeta(e.target.value))} required />
        <div className="row" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem'}}>
          <input placeholder="MM/AA" value={expiracion} onChange={e=>setExp(fmtExp(e.target.value))} required />
          <input placeholder="CVV" value={cvv} onChange={e=>setCvv(fmtCvv(e.target.value))} required />
        </div>
        <div style={{display:'flex', gap:'.5rem'}}>
          <button className="btn" type="submit">Pagar</button>
          <a className="btn secondary" href="/carrito">Cancelar</a>
        </div>
        <p>{msg}</p>
      </form>
    </section>
  )
}