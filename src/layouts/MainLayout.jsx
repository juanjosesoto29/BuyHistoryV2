import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import Footer from '../components/Footer.jsx'

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="container py-4">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
