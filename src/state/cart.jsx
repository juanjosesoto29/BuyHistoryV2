
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartCtx = createContext(null)

export function CartProvider({ children }){
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bh_cart')) || [] } catch { return [] }
  })

  useEffect(()=>{
    localStorage.setItem('bh_cart', JSON.stringify(items))
  },[items])

  const add = (product) => {
    setItems(prev => {
      const f = prev.find(p => p.id === product.id)
      if (f) return prev.map(p => p.id===product.id? {...product, qty:p.qty+1} : p)
      return [...prev, { ...product, qty:1 }]
    })
  }
  const remove = id => setItems(prev => prev.filter(p=>p.id!==id))
  const clear = () => setItems([])
  const count = items.reduce((a,b)=>a+b.qty,0)
  const total = items.reduce((a,b)=>a+b.qty*Number(b.price),0)

  const value = useMemo(()=>({items, add, remove, clear, count, total}),[items])
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart(){ return useContext(CartCtx) }
