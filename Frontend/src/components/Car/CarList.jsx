import { Link } from 'react-router-dom'
import { MENU_OPTIONS } from '../Menu/Menu'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra una lista de coches
const CarList = ({ cars }) => (
  <ul className='flex personajes'>
    {[...cars].map((car) => (
      <li key={car._id} className='flex'>
        <Link
          to={`/${MENU_OPTIONS.cars.id}/${strings.CAR_ACTIONS.info.id}`}
          state={{ id: car._id }}
        >
          {helpers.getCarDescr(car)}
        </Link>
      </li>
    ))}
  </ul>
)

export default CarList
