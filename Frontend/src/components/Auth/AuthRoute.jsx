import { useContext } from 'react'
import { matchRoutes, Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
import { MENU_OPTIONS } from '../Menu/Menu'
import carRoutes from '../../routes/car'
import customerRoutes from '../../routes/customer'
import reservationRoutes from '../../routes/reservation'
import saleRoutes from '../../routes/sale'
import userRoutes from '../../routes/user'
import helpers from '../../utils/helpers'

// Componente que protege las rutas y redirige en función del rol del usuario del contexto de la aplicación
const AuthRoute = () => {
  const { user } = useContext(AuthContext)
  const isHome = useLocation().pathname === '/'
  const routes = [
    ...carRoutes,
    ...customerRoutes,
    ...reservationRoutes,
    ...saleRoutes,
    ...userRoutes
  ]
  // Indica si la ruta requiere que el usuario del contexto de la aplicación sea "admin"
  const requiresAdminUser = matchRoutes(routes, useLocation())?.some(
    (matchRoute) => matchRoute.route.requiresAdminUser
  )

  if (user == null && !isHome) {
    return <Navigate to='/' replace />
  }

  if (
    user != null &&
    (isHome || (requiresAdminUser && !helpers.isAdminUser(user)))
  ) {
    return <Navigate to={`/${MENU_OPTIONS.cars.id}`} replace />
  }

  return <Outlet />
}

export default AuthRoute
