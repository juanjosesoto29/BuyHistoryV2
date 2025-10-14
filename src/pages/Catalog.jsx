
import { useCart } from '../state/cart.jsx'

const items = [
  { id: 'napoleon-hat', name: 'Sombrero de Napoleón', price: 120000, img: 'https://statics.forbesargentina.com/2021/09/crop/61377a4178088__980x549.webp', desc:'Sombrero original del general. Ideal para cualquier ocasión.' },
  { id: 'egyptian-mask', name: 'Máscara Egipcia', price: 80000, img: 'https://www.galeriafcervera.com/wp-content/uploads/2023/01/Egyptian-Mask-Galeria-F.-Cervera1-scaled.jpg', desc:'Máscara funeraria dorada de época faraónica.' },
  { id: 'roman-coin', name: 'Moneda Romana', price: 50000, img: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Roman_denarius_in_silver_%28Maximinus%29-transparent.png', desc:'Antigua moneda de plata romana, conservada en buen estado.' },
  { id: 'macuquinas', name: 'Macuquinas', price: 100000, img: 'https://s03.s3c.es/imag/_v0/770x420/8/a/2/moneda-galeon-770.jpg', desc:'Moneda de oro macuquina de época colonial.' },
  { id: 'aztec-snake', name: 'Serpiente azteca de dos cabezas', price: 250000, img: 'https://ep01.epimg.net/verne/imagenes/2019/02/21/mexico/1550724974_272914_1550725152_sumario_normal.jpg', desc:'Figura ceremonial azteca con doble cabeza, símbolo de poder.' },
  { id: 'maine-penny', name: 'El penique de Maine', price: 40000, img: 'https://supercurioso.com/wp-content/uploads/2014/06/ooparts-el-penique-de-maine.jpg', desc:'Pieza histórica de Estados Unidos, raro ejemplar coleccionable.' },
  { id: 'maya-calendar', name: 'Calendario Maya', price: 170000, img: 'https://www.chichenitza.com/public/assets/img/mayan-calendar.jpg', desc:'Calendario precolombino, perfectamente conservado.' },
  { id: 'mask-agamemnon', name: 'Máscara de Agamenón', price: 350000, img: 'https://www.antiguorincon.com/blog/wp-content/uploads/2020/10/mascara-de-agamenon_-768x527.jpg', desc:'Máscara funeraria griega, de oro macizo.' },
]

export default function Catalog(){
  const { add } = useCart()
  return (
    <section>
      <h2>Catálogo</h2>
      <div className="grid">
        {items.map(p => (
          <article className="card" key={p.id}>
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <p className="price">Precio: ${p.price.toLocaleString('es-CL')}</p>
            <button className="btn" onClick={()=>add(p)}>Comprar ahora</button>
          </article>
        ))}
      </div>
    </section>
  )
}
