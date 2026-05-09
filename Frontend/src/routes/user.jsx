import { MENU_OPTIONS } from '../components/Menu/Menu'
import CreateUser from '../pages/users/CreateUser'
import UpdateUser from '../pages/users/UpdateUser'
import UserInfo from '../pages/users/UserInfo'
import Users from '../pages/users/Users'
import strings from '../utils/strings'

// Estructura que permite usar "requiresAdminUser" en el contexto de la aplicación para comprobar si el usuario está autorizado o no para acceder a una página
const userRoutes = [
  {
    path: `/${MENU_OPTIONS.users.id}`,
    element: <Users />,
    requiresAdminUser: true
  },
  {
    path: `/${MENU_OPTIONS.users.id}/${strings.SALE_ACTIONS.create.id}`,
    element: <CreateUser />,
    requiresAdminUser: true
  },
  {
    path: `/${MENU_OPTIONS.users.id}/${strings.USER_ACTIONS.info.id}`,
    element: <UserInfo />,
    requiresAdminUser: true
  },
  {
    path: `/${MENU_OPTIONS.users.id}/${strings.USER_ACTIONS.profile.id}`,
    element: <UserInfo />
  },
  {
    path: `/${MENU_OPTIONS.users.id}/${strings.USER_ACTIONS.update.id}`,
    element: <UpdateUser />
  }
]

export default userRoutes
