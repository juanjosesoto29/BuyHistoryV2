// --- SIMULACIÓN DE BASE DE DATOS EN MEMORIA ---w

// --- DATOS SIMULADOS ---

let productos = [
  { id: 1, nombre: 'Moneda romana', precio: 45000, img: 'https://images.unsplash.com/photo-1571569089849-6e74d9a79fa9', categoria: 1, stock: 10, oferta: false },
  { id: 2, nombre: 'Mapa del siglo XVIII', precio: 99000, img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba', categoria: 1, stock: 5, oferta: true },
  { id: 3, nombre: 'Carta histórica', precio: 65000, img: 'https://images.unsplash.com/photo-1529119368496-2dfda6ec2804', categoria: 2, stock: 15, oferta: false },
  { id: 4, nombre: 'Fotografía antigua', price: 39000, img:'https://images.unsplash.com/photo-1516239322118-4c71d3f4d9da', categoria: 2, stock: 20, oferta: true }
];

let categorias = [
  { id: 1, nombre: 'Numismática y Mapas' },
  { id: 2, nombre: 'Documentos y Fotografía' },
];

let usuarios = [
    {id: 1, nombre: "Juanjose Soto", correo: "juan.sotoc@example.com", contrasena: "password123", rol: "admin"},
    {id: 2, nombre: "Ana Gomez", correo: "ana.gomez@example.com", contrasena: "securepass", rol: "cliente"}
];

// --- FUNCIONES CRUD ---

// PRODUCTOS
export const getProductos = () => productos;
export const getProducto = (id) => productos.find(p => p.id === parseInt(id));
export const getProductosPorCategoria = (categoriaId) => productos.filter(p => p.categoria === parseInt(categoriaId));
export const getOfertas = () => productos.filter(p => p.oferta);

export const createProducto = (producto) => {
  const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  const nuevoProducto = { id: nuevoId, ...producto };
  productos.push(nuevoProducto);
  return nuevoProducto;
};

export const updateProducto = (id, productoActualizado) => {
    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        productos[index] = { ...productos[index], ...productoActualizado };
        return productos[index];
    }
    return null;
};

export const deleteProducto = (id) => {
    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        productos.splice(index, 1);
        return true;
    }
    return false;
};


// CATEGORIAS
export const getCategorias = () => categorias;
export const getCategoria = (id) => categorias.find(c => c.id === parseInt(id));


// USUARIOS
export const getUsuarios = () => usuarios;
export const getUsuario = (id) => usuarios.find(u => u.id === parseInt(id));
export const loginUsuario = (correo, contrasena) => {
    return usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
}
export const registerUsuario = (usuario) => {
    const existe = usuarios.some(u => u.correo === usuario.correo);
    if (existe) {
        return null; // Usuario ya existe
    }
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const nuevoUsuario = { id: nuevoId, ...usuario, rol: 'cliente' }; // Por defecto, rol cliente
    usuarios.push(nuevoUsuario);
    return nuevoUsuario;
}