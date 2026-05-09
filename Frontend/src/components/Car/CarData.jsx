import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Auth/AuthProvider'
import { MENU_OPTIONS } from '../Menu/Menu'
import useDialog from '../../hooks/useDialog'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import carFetch from '../../utils/fetch/car'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra los datos de un coche
const CarData = ({ car }) => {
  const { user } = useContext(AuthContext)
  const { fetchData } = useFetchWithDialog(carFetch.deleteCarById)
  const { showAlertDialog, showConfirmDialog } = useDialog()
  const navigate = useNavigate()

  const handleDeleteCarById = () =>
    helpers.handleAction(
      fetchData,
      showAlertDialog,
      navigate,
      `/${MENU_OPTIONS.cars.id}`,
      car._id
    )

  return (
    <>
      {helpers.isAdminUser(user) && (
        <Link
          to={`/${MENU_OPTIONS.cars.id}/${strings.CAR_ACTIONS.update.id}`}
          state={{ id: car._id }}
        >
          {strings.CAR_ACTIONS.update.label}
        </Link>
      )}

      {/* No se puede eliminar un coche que no está disponible */}
      {helpers.isAdminUser(user) &&
        car.status === strings.CAR_STATUSES.available && (
          <button
            type={strings.INPUT_FIELD_TYPES.button}
            onClick={() =>
              showConfirmDialog(strings.ACTION_CONFIRM_MSG, handleDeleteCarById)
            }
          >
            {strings.CAR_ACTIONS.delete.label}
          </button>
        )}

      <div>
        {strings.CAR_FIELDS.licensePlate.label}: {car.licensePlate}
      </div>

      <div>
        {strings.CAR_FIELDS.make.label}: {car.make}
      </div>

      <div>
        {strings.CAR_FIELDS.model.label}: {car.model}
      </div>

      <div>
        {strings.CAR_FIELDS.color.label}: {car.color}
      </div>

      <div>
        {strings.CAR_FIELDS.modelYear.label}: {car.modelYear}
      </div>

      {car.img !== '' && (
        <div>
          <img src={`${car.img}`} />
        </div>
      )}

      <div>
        {`${strings.CAR_FIELDS.purchaseDate.label}: ${helpers.getFormattedDate(car.purchaseDate)}`}
      </div>

      <div>
        {strings.CAR_FIELDS.condition.label}: {car.condition}
      </div>

      <div>
        {`${strings.CAR_FIELDS.mileage.label}: ${helpers.getFormattedNumber(car.mileage)} ${strings.CAR_FIELDS.mileage.unit}`}
      </div>

      <div>
        {`${strings.CAR_FIELDS.price.label}: ${helpers.getFormattedNumber(car.price)} ${strings.CAR_FIELDS.price.unit}`}
      </div>

      <div>
        {strings.CAR_FIELDS.status.label}: {car.status}
      </div>
    </>
  )
}

export default CarData
