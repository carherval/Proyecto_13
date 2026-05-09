import { MENU_OPTIONS } from '../components/Menu/Menu'
import CreateReservation from '../pages/reservations/CreateReservation'
import ReservationInfo from '../pages/reservations/ReservationInfo'
import Reservations from '../pages/reservations/Reservations'
import strings from '../utils/strings'

// Estructura que permite usar "requiresAdminUser" en el contexto de la aplicación para comprobar si el usuario está autorizado o no para acceder a una página
const reservationRoutes = [
  {
    path: `/${MENU_OPTIONS.reservations.id}`,
    element: <Reservations />
  },
  {
    path: `/${MENU_OPTIONS.reservations.id}/${strings.RESERVATION_ACTIONS.create.id}`,
    element: <CreateReservation />
  },
  {
    path: `/${MENU_OPTIONS.reservations.id}/${strings.RESERVATION_ACTIONS.info.id}`,
    element: <ReservationInfo />
  }
]

export default reservationRoutes
