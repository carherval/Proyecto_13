import { MENU_OPTIONS } from '../components/Menu/Menu'
import CreateSale from '../pages/sales/CreateSale'
import SaleInfo from '../pages/sales/SaleInfo'
import Sales from '../pages/sales/Sales'
import strings from '../utils/strings'

// Estructura que permite usar "requiresAdminUser" en el contexto de la aplicación para comprobar si el usuario está autorizado o no para acceder a una página
const saleRoutes = [
  {
    path: `/${MENU_OPTIONS.sales.id}`,
    element: <Sales />
  },
  {
    path: `/${MENU_OPTIONS.sales.id}/${strings.SALE_ACTIONS.create.id}`,
    element: <CreateSale />
  },
  {
    path: `/${MENU_OPTIONS.sales.id}/${strings.SALE_ACTIONS.info.id}`,
    element: <SaleInfo />
  }
]

export default saleRoutes
