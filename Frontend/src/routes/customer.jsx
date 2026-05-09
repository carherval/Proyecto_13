import { MENU_OPTIONS } from '../components/Menu/Menu'
import CreateCustomer from '../pages/customers/CreateCustomer'
import CustomerInfo from '../pages/customers/CustomerInfo'
import Customers from '../pages/customers/Customers'
import UpdateCustomer from '../pages/customers/UpdateCustomer'
import strings from '../utils/strings'

// Estructura que permite usar "requiresAdminUser" en el contexto de la aplicación para comprobar si el usuario está autorizado o no para acceder a una página
const customerRoutes = [
  {
    path: `/${MENU_OPTIONS.customers.id}`,
    element: <Customers />
  },
  {
    path: `/${MENU_OPTIONS.customers.id}/${strings.CUSTOMER_ACTIONS.create.id}`,
    element: <CreateCustomer />
  },
  {
    path: `/${MENU_OPTIONS.customers.id}/${strings.CUSTOMER_ACTIONS.info.id}`,
    element: <CustomerInfo />
  },
  {
    path: `/${MENU_OPTIONS.customers.id}/${strings.CUSTOMER_ACTIONS.update.id}`,
    element: <UpdateCustomer />
  }
]

export default customerRoutes
