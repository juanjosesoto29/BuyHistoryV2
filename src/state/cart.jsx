import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const Ctx = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bh_cart')) ?? [] } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('bh_cart', JSON.stringify(items)) }, [items])

  const add = (p) => setItems(prev => {
    const i = prev.findIndex(x => x.id === p.id)
    return i >= 0 ? prev.map((x,ix)=> ix===i ? {...x, qty:x.qty+1} : x) : [...prev, {...p, qty:1}]
  })
  const inc = (id) => setItems(prev => prev.map(x => x.id===id ? {...x, qty:x.qty+1} : x))
  const dec = (id) => setItems(prev => prev.flatMap(x => x.id===id ? (x.qty>1 ? [{...x, qty:x.qty-1}] : []) : [x]))
  const remove = (id) => setItems(prev => prev.filter(x => x.id !== id))
  const clear = () => setItems([])

  const count = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items])
  const total = useMemo(() => items.reduce((s, x) => s + x.price * x.qty, 0), [items])

  const value = { items, add, inc, dec, remove, clear, count, total }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const useCart = () => useContext(Ctx)
