import { useCart } from '../state/cart.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cart(){
  const { items, remove, clear, total } = useCart()
  const [popup,setPopup]=useState(null) // null | {msg, confirm}
  const nav = useNavigate()

  const goPay = () => {
    if(items.length === 0){
      setPopup({msg:'❌ No hay artículos en el carrito'})
    } else {
      setPopup({msg:'¿Deseas ir a la página de pago?', confirm:true})
    }
  }

  return (
    <section>
      <h2>Carrito</h2>
      {items.length === 0 ? <p>Tu carrito está vacío.</p> : (
        <>
          <ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:'.75rem'}}>
            {items.map(i => (
              <li key={i.id} className="card" style={{display:'grid', gridTemplateColumns:'80px 1fr auto', alignItems:'center', gap:'1rem', padding:'.75rem'}}>
                <img src={i.img} alt={i.name} style={{width:'80px', height:'60px', objectFit:'cover', borderRadius:12}} />
                <div>
                  <div style={{fontWeight:600}}>{i.name}</div>
                  <div>Cantidad: {i.qty}</div>
                  <div className="price">${(Number(i.price) * i.qty).toLocaleString('es-CL')}</div>
                </div>
                <button className="btn secondary" onClick={()=>remove(i.id)}>Quitar</button>
              </li>
            ))}
          </ul>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'1rem', alignItems:'center'}}>
            <strong>Total: {`$${total.toLocaleString('es-CL')}`}</strong>
            <div style={{display:'flex', gap:'.5rem'}}>
              <button className="btn secondary" onClick={clear}>Vaciar</button>
              <button className="btn" onClick={goPay}>Continuar al Pago</button>
            </div>
          </div>
        </>
      )}

      {popup && (
        <div className="popup" role="dialog" aria-modal="true" style={{position:'fixed', inset:0, background:'rgba(0,0,0,.4)', display:'grid', placeItems:'center'}}>
          <div className="card" style={{padding:'1rem', maxWidth:420}} tabIndex={-1}>
            <p>{popup.msg}</p>
            <div style={{display:'flex', gap:'.5rem', justifyContent:'flex-end'}}>
              {popup.confirm ? (
                <>
                  <button className="btn secondary" onClick={()=>setPopup(null)}>No</button>
                  <button className="btn" onClick={()=>nav('/pago')}>Sí</button>
                </>
              ) : (
                <button className="btn" onClick={()=>setPopup(null)}>Cerrar</button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}