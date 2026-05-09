import { Link } from 'react-router-dom'
import { MENU_OPTIONS } from '../Menu/Menu'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra una lista de clientes
const CustomerList = ({ customers }) => (
  <ul className='flex personajes'>
    {[...customers].map((customer) => (
      <li key={customer._id} className='flex'>
        <Link
          to={`/${MENU_OPTIONS.customers.id}/${strings.CUSTOMER_ACTIONS.info.id}`}
          state={{ id: customer._id }}
        >
          {helpers.getCustomerFullName(customer)}
        </Link>
      </li>
    ))}
  </ul>
)

export default CustomerList
