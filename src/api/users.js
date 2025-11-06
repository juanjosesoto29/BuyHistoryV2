const BASE_URL = 'http://localhost:8082/api/v1/users'

async function handleJson(res) {
  const text = await res.text()
  try {
    return text ? JSON.parse(text) : null
  } catch {
    return text
  }
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const data = await handleJson(res)

  if (!res.ok) {
    const msg = data?.message || 'Error al iniciar sesión'
    throw new Error(msg)
  }

  // data es el UserDto { id, name, email, role }
  return data
}

export async function registerUser({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })

  const data = await handleJson(res)

  if (!res.ok) {
    const msg = data?.message || 'Error al registrar usuario'
    throw new Error(msg)
  }

  return data
}

export async function getUsers() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Error al cargar usuarios')
  return res.json()
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Error al eliminar usuario')
}
