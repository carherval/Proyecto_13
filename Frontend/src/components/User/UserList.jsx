import { Link } from 'react-router-dom'
import { MENU_OPTIONS } from '../Menu/Menu'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra una lista de usuarios
const UserList = ({ users }) => (
  <ul>
    {[...users].map((user) => (
      <li key={user._id}>
        <Link
          to={`/${MENU_OPTIONS.users.id}/${strings.USER_ACTIONS.info.id}`}
          title={strings.USER_ACTIONS.info.label}
          state={{ id: user._id }}
        >
          {helpers.getUserFullName(user)}
        </Link>
      </li>
    ))}
  </ul>
)

export default UserList
