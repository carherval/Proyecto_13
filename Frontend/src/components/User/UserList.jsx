import { Link } from 'react-router-dom'
import { MENU_OPTIONS } from '../Menu/Menu'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra una lista de usuarios
const UserList = ({ users }) => (
  <ul className='flex personajes'>
    {[...users].map((user) => (
      <li key={user._id} className='flex'>
        <Link
          to={`/${MENU_OPTIONS.users.id}/${strings.USER_ACTIONS.info.id}`}
          state={{ id: user._id }}
        >
          {helpers.getUserFullName(user)}
        </Link>
      </li>
    ))}
  </ul>
)

export default UserList
