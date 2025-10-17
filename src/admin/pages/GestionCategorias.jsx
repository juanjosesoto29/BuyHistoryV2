import { useState } from 'react'
import { products } from '../../data.products'

export default function GestionCategorias() {
  const [list, setList] = useState([...new Set(products.map(p => p.category))])
  const [newCat, setNewCat] = useState('')

  const add = () => {
    const cat = newCat.trim()
    if (!cat) return
    if (list.includes(cat)) return alert('Ya existe')
    setList(prev => [...prev, cat])
    setNewCat('')
  }

  const del = (c) => setList(prev => prev.filter(x=>x!==c))

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Gestión de categorías</h5>
        <div className="input-group mb-3">
          <input className="form-control" placeholder="Nueva categoría" value={newCat}
            onChange={e=>setNewCat(e.target.value)}/>
          <button className="btn btn-dark" onClick={add}>Agregar</button>
        </div>

        {!list.length ? (
          <p className="text-muted m-0">Sin categorías.</p>
        ) : (
          <ul className="list-group">
            {list.map((c,ix)=>(
              <li key={ix} className="list-group-item d-flex justify-content-between align-items-center">
                {c}
                <button className="btn btn-sm btn-outline-danger" onClick={()=>del(c)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
