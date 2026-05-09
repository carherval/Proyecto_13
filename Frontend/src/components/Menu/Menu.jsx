import './Menu.css'

import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../Auth/AuthProvider'
import useDialog from '../../hooks/useDialog'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

export const MENU_OPTIONS = {
  cars: { id: 'cars', label: 'Coches' },
  customers: { id: 'customers', label: 'Clientes' },
  reservations: { id: 'reservations', label: 'Reservas' },
  sales: { id: 'sales', label: 'Ventas' },
  users: { id: 'users', label: 'Usuarios' },
  logout: { id: 'logout', label: 'Salir' }
}
const { logout, ...MENU_SECTIONS } = MENU_OPTIONS

// Componente que muestra el menú de la aplicación
const Menu = () => {
  const { user, logout } = useContext(AuthContext)
  const { showConfirmDialog } = useDialog()

  return (
    <div className='flex menu'>
      {/*Saludo (perfil del usuario) y cerrar sesión*/}
      <div>
        Hola,{' '}
        <Link to={`/${MENU_OPTIONS.users.id}/profile`} state={{ id: user._id }}>
          {user.name}
        </Link>{' '}
        (
        <Link
          onClick={(event) => {
            event.preventDefault()
            showConfirmDialog(strings.LOGOUT_CONFIRM_MSG, logout)
          }}
        >
          {MENU_OPTIONS.logout.label}
        </Link>
        )
      </div>

      {/*Secciones de navegación*/}
      <nav>
        <ul className='flex'>
          {Object.values(MENU_SECTIONS).map(
            (section) =>
              // La sección "Usuarios" sólo es visible para usuarios "admin"
              (section !== MENU_SECTIONS.users ||
                (section === MENU_SECTIONS.users &&
                  helpers.isAdminUser(user))) && (
                <li key={section.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active' : undefined
                    }
                    to={section.id}
                  >
                    {section.label}
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Menu
