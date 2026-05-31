import './Header.scss'

import { Link } from 'react-router-dom'
import Menu from '../Menu/Menu'
import strings from '../../utils/strings'

// Componente que muestra la cabecera de la aplicación
const Header = ({ isLogin }) => (
  <header className='header'>
    <h1>
      <Link to='/'>{strings.PAGE_TITLE}</Link>
    </h1>

    {!isLogin && <Menu />}
  </header>
)

export default Header
