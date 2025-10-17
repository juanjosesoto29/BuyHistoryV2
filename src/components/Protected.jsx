import { Navigate } from 'react-router-dom'

export default function Protected({ children }) {
  let u = null
  try { u = JSON.parse(localStorage.getItem('bh_user')) } catch {}
  return u ? children : <Navigate to="/login" replace />
}
