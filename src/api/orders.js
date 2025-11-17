// src/api/orders.js

const BASE_ORDERS = 'http://localhost:8081/api/v1/orders'; 
// 🔴 Cambia el puerto / path según tu microservicio real

async function handleJson(res) {
  const text = await res.text()
  let data = null

  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `Error HTTP ${res.status}`
    throw new Error(msg)
  }

  return data
}

// Historial de compras por usuario
export async function getUserOrders(userId) {
  const res = await fetch(`${BASE_ORDERS}/user/${userId}`)
  return handleJson(res)
}
