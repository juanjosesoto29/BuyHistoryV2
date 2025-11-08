// src/api/users.js

const BASE = 'http://localhost:8082/api/v1';

async function handleJson(res) {
  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `Error HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

// LOGIN
export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleJson(res); // UserDto: {id,name,email,role,enabled,isAdmin}
}

// REGISTRO
export async function registerUser({ name, email, password }) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleJson(res);
}

// LISTAR USUARIOS (admin)
export async function getUsers() {
  const res = await fetch(`${BASE}/users`);
  return handleJson(res);
}

// ELIMINAR USUARIO (solo si luego haces el endpoint DELETE)
export async function deleteUser(id) {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: 'DELETE',
  });
  return handleJson(res);
}

// CAMBIAR ROL
export async function updateUserRole(id, role) {
  const res = await fetch(`${BASE}/users/${id}/role`, {
    method: 'PATCH', // importante: coincide con @PatchMapping
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  return handleJson(res);
}
