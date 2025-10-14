
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Account(){
  const nav = useNavigate()
  const [user,setUser]=useState(null)
  useEffect(()=>{
    try { setUser(JSON.parse(localStorage.getItem('bh_user'))) } catch {}
  },[])
  if(!user){
    return (
      <section>
        <h2>Mi cuenta</h2>
        <p>No has iniciado sesión.</p>
      </section>
    )
  }
  return (
    <section>
      <h2>Mi cuenta</h2>
      <p><strong>Nombre:</strong> {user.nombre || '(sin nombre)'}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button className="btn" onClick={()=>{ localStorage.removeItem('bh_user'); nav('/login') }}>Cerrar sesión</button>
    </section>
  )
}
