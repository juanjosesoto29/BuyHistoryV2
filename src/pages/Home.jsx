
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section>
      <h2>Tesoros que cuentan historias</h2>
      <p>
        En <strong>BUY HISTORY</strong> traemos reliquias y curiosidades del pasado.
        Cada pieza puede ser parte de tu colección.
      </p>
      <div style={{display:'flex', gap:'12px', justifyContent:'center', margin:'12px 0 24px'}}>
        <Link to="/catalogo" className="boton">Ver catálogo</Link>
        <Link to="/contacto" className="boton">Escríbenos</Link>
      </div>
      <h3>Destacados</h3>
    </section>
  )
}
