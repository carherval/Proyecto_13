import './Header.css'

import { Link } from 'react-router-dom'
import Menu from '../Menu/Menu'
import strings from '../../utils/strings'

// Componente que muestra la cabecera de la aplicación
const Header = ({ isLogin }) => (
  <header className='flex cabecera'>
    <h1 className='flex'>
      <Link to='/'>{strings.PAGE_TITLE}</Link>
    </h1>

    {!isLogin && <Menu />}
  </header>
)

export default Header
