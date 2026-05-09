import { MENU_OPTIONS } from '../components/Menu/Menu'
import CarInfo from '../pages/cars/CarInfo'
import Cars from '../pages/cars/Cars'
import CreateCar from '../pages/cars/CreateCar'
import UpdateCar from '../pages/cars/UpdateCar'
import strings from '../utils/strings'

// Estructura que permite usar "requiresAdminUser" en el contexto de la aplicación para comprobar si el usuario está autorizado o no para acceder a una página
const carRoutes = [
  {
    path: `/${MENU_OPTIONS.cars.id}`,
    element: <Cars />
  },
  {
    path: `/${MENU_OPTIONS.cars.id}/${strings.CAR_ACTIONS.create.id}`,
    element: <CreateCar />,
    requiresAdminUser: true
  },
  {
    path: `/${MENU_OPTIONS.cars.id}/${strings.CAR_ACTIONS.info.id}`,
    element: <CarInfo />
  },
  {
    path: `/${MENU_OPTIONS.cars.id}/${strings.CAR_ACTIONS.update.id}`,
    element: <UpdateCar />,
    requiresAdminUser: true
  }
]

export default carRoutes
