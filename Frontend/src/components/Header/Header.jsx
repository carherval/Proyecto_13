import './Header.css'

import { Link } from 'react-router-dom'
import { PAGE_TITLE } from '../../DragonBall'
import Menu from '../Menu/Menu'

const Header = ({ isHome }) => (
  <header className={`flex cabecera${isHome ? '-home' : ''}`}>
    {isHome ? (
      <>
        <h1>{PAGE_TITLE}</h1>
        <img src='/assets/images/bola.png' alt={PAGE_TITLE} />
      </>
    ) : (
      <h1 className='flex'>
        <Link to=''>{PAGE_TITLE}</Link>
      </h1>
    )}
    {!isHome && <Menu isHome={isHome} />}
  </header>
)

export default Header
