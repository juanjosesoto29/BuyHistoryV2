
export const products = [
  
  {
    id: 101,
    name: 'Sombrero de Napoleón',
    desc: 'Sombrero original del general. Ideal para cualquier ocasión.',
    price: 120000,
  img: '/imgs/sombrero-napoleon.webp',
    category: 'Histórico',
    discount: true
  },
  {
    id: 102,
    name: 'Máscara Egipcia',
    desc: 'Máscara funeraria dorada de época faraónica.',
    price: 80000,
  img: '/imgs/mascara-egipcia.jpg',
    category: 'Antigüedades',
    discount: false
  },
  {
    id: 103,
    name: 'Moneda Romana',
    desc: 'Antigua moneda de plata romana, conservada en buen estado.',
    price: 50000,
  img: '/imgs/moneda-romana.png',
    category: 'Numismática',
    discount: false
  },
  {
    id: 104,
    name: 'Macuquinas',
    desc: 'Moneda de oro macuquina de época colonial.',
    price: 100000,
  img: '/imgs/macuquinas.jpg',
    category: 'Numismática',
    discount: true
  },
  {
    id: 105,
    name: 'Serpiente azteca de dos cabezas',
    desc: 'Figura ceremonial azteca con doble cabeza, símbolo de poder.',
    price: 250000,
  img: '/imgs/serpiente-azteca.jpg',
    category: 'Arte Precolombino',
    discount: true
  },
  {
    id: 106,
    name: 'El penique de Maine',
    desc: 'Pieza histórica de Estados Unidos, raro ejemplar coleccionable.',
    price: 40000,
  img: '/imgs/penique-maine.jpg',
    category: 'Numismática',
    discount: false
  },
  {
    id: 107,
    name: 'Calendario Maya',
    desc: 'Calendario precolombino, perfectamente conservado.',
    price: 170000,
  img: '/imgs/calendario-maya.jpg',
    category: 'Arte Precolombino',
    discount: false
  },
  {
    id: 108,
    name: 'Máscara de Agamenón',
    desc: 'Máscara funeraria griega, de oro macizo.',
    price: 350000,
  img: '/imgs/mascara-agamenon.jpg',
    category: 'Antigüedades',
    discount: false
  }
]


export const create = (p) => { products.push(p); return p }
export const read   = () => [...products]
export const update = (id, patch) => {
  const i = products.findIndex(p => p.id === id)
  if (i >= 0) products[i] = { ...products[i], ...patch }
  return products[i]
}
export const remove = (id) => {
  const i = products.findIndex(p => p.id === id)
  if (i >= 0) products.splice(i, 1)
  return true
}
