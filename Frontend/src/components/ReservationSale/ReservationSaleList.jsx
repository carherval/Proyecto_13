import { Link } from 'react-router-dom'
import { MENU_OPTIONS } from '../Menu/Menu'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra una lista de reservas o de ventas
const ReservationSaleList = ({ reservationsSales, order }) => (
  <ul className='flex personajes'>
    {[...reservationsSales].map((reservationSale) => (
      <li key={reservationSale._id} className='flex'>
        <Link
          to={
            reservationSale.car.status === strings.CAR_STATUSES.reserved
              ? `/${MENU_OPTIONS.reservations.id}/${strings.RESERVATION_ACTIONS.info.id}`
              : `/${MENU_OPTIONS.sales.id}/${strings.SALE_ACTIONS.info.id}`
          }
          state={{ id: reservationSale._id }}
        >
          {helpers.getCarDescrWithCustomerFullName(
            reservationSale.car,
            reservationSale.customer,
            order !== strings.RESERVATION_SALE_ORDER_OPTIONS.car.value
          )}
        </Link>
      </li>
    ))}
  </ul>
)

export default ReservationSaleList
