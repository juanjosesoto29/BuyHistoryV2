// src/api/orders.js
const ORDERS_API_URL = 'http://localhost:8087/api/v1/orders' // ajusta el puerto

export async function getOrdersByCustomerEmail(email) {
  if (!email) throw new Error('Email requerido')

  const res = await fetch(
    `${ORDERS_API_URL}/customer/${encodeURIComponent(email)}`
  )

  if (!res.ok) {
    throw new Error('Error al cargar las órdenes')
  }

  return res.json()
}
