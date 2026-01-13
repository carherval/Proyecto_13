import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

export const PAGE_TITLE = 'Bola de Dragón'

export const DRAGON_BALL_SECTIONS = {
  dragonball: { id: 'dragonball', title: 'Dragon Ball' },
  dragonballz: { id: 'dragonballz', title: 'Dragon Ball Z' },
  dragonballgt: { id: 'dragonballgt', title: 'Dragon Ball GT' },
  dragonballsuper: { id: 'dragonballsuper', title: 'Dragon Ball Super' },
  dragons: { id: 'dragons', title: 'Dragones' }
}

export const ERROR_MSG = {
  page: 'Página no encontrada',
  saga: 'La saga no existe',
  character: 'Personaje no encontrado',
  error: 'Se ha producido un error'
}

const DragonBall = () => (
  <>
    <Header isHome={useLocation().pathname === '/'} />
    <main className='flex contenido'>
      <Outlet />
    </main>
    <Footer />
  </>
)

export default DragonBall
