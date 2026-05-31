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
        <section className='btn-box'>
          <div>
            <Link
              to={`/${MENU_OPTIONS.cars.id}/${strings.CAR_ACTIONS.update.id}`}
              state={{ id: car._id }}
            >
              {strings.CAR_ACTIONS.update.label}
            </Link>

            {/* No se puede eliminar un coche que no está disponible */}
            {car.status === strings.CAR_STATUSES.available && (
              <button
                type={strings.INPUT_FIELD_TYPES.button}
                onClick={() =>
                  showConfirmDialog(
                    strings.ACTION_CONFIRM_MSG,
                    handleDeleteCarById
                  )
                }
              >
                {strings.CAR_ACTIONS.delete.label}
              </button>
            )}
          </div>
        </section>
      )}

      <section className='info'>
        <article>
          <h3>{helpers.getCarDescr(car)}</h3>

          {car.img !== '' && (
            <div className='img'>
              <img src={`${car.img}`} alt={helpers.getCarDescr(car)} />
            </div>
          )}

          <div className='data'>
            <div>
              <div>{strings.CAR_FIELDS.color.label}</div>
              <div>{car.color}</div>
            </div>

            <div>
              <div>{strings.CAR_FIELDS.modelYear.label}</div>
              <div>{car.modelYear}</div>
            </div>

            <div>
              <div>{strings.CAR_FIELDS.purchaseDate.label}</div>
              <div>{helpers.getFormattedDate(car.purchaseDate)}</div>
            </div>

            <div>
              <div>{strings.CAR_FIELDS.condition.label}</div>
              <div>{car.condition}</div>
            </div>

            <div>
              <div>{strings.CAR_FIELDS.mileage.label}</div>
              <div>
                {`${helpers.getFormattedNumber(car.mileage)} ${strings.CAR_FIELDS.mileage.unit}`}
              </div>
            </div>

            <div>
              <div>{strings.CAR_FIELDS.price.label}</div>
              <div>
                {`${helpers.getFormattedNumber(car.price)} ${strings.CAR_FIELDS.price.unit}`}
              </div>
            </div>

            <div>
              <div>{strings.CAR_FIELDS.status.label}</div>
              <div>{car.status}</div>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default CarData
