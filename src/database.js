

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