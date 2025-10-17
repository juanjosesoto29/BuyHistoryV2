import { useState } from 'react'
import { read, create, update, remove } from '../../data.products'

export default function GestionProductos() {
  const [list, setList] = useState(read())
  const [draft, setDraft] = useState({ name:'', price:'', category:'', desc:'', img:'' })

  const add = () => {
    if (!draft.name.trim()) return alert('Nombre requerido')
    const p = {
      id: Date.now(),
      name: draft.name,
      price: Number(draft.price) || 0,
      category: draft.category || 'General',
      desc: draft.desc,
      img: draft.img || '/imgs/default.jpg',
      discount: false
    }
    create(p)
    setList(prev => [...prev, p])
    setDraft({ name:'', price:'', category:'', desc:'', img:'' })
  }

  const toggleOffer = (id, checked) => {
    update(id, { discount: checked })
    setList(prev => prev.map(p => p.id===id ? {...p, discount:checked} : p))
  }

  const del = (id) => {
    remove(id)
    setList(prev => prev.filter(p=>p.id!==id))
  }

  return (
    <>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Agregar producto</h5>
          <div className="row g-2">
            <div className="col-sm-3"><input className="form-control" placeholder="Nombre" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/></div>
            <div className="col-sm-2"><input className="form-control" placeholder="Precio" value={draft.price} onChange={e=>setDraft({...draft,price:e.target.value})}/></div>
            <div className="col-sm-2"><input className="form-control" placeholder="Categoría" value={draft.category} onChange={e=>setDraft({...draft,category:e.target.value})}/></div>
            <div className="col-sm-3"><input className="form-control" placeholder="URL imagen (/imgs/...)" value={draft.img} onChange={e=>setDraft({...draft,img:e.target.value})}/></div>
            <div className="col-sm-2 d-grid"><button className="btn btn-dark" onClick={add}>Agregar</button></div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Categoría</th><th>Oferta</th><th></th></tr></thead>
          <tbody>
            {list.map(p=>(
              <tr key={p.id}>
                <td className="text-muted">{p.id}</td>
                <td>{p.name}</td>
                <td>${Number(p.price).toLocaleString('es-CL')}</td>
                <td>{p.category}</td>
                <td>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox"
                      checked={!!p.discount} onChange={e=>toggleOffer(p.id,e.target.checked)} />
                    <label className="form-check-label">{p.discount ? 'Sí' : 'No'}</label>
                  </div>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-danger" onClick={()=>del(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
