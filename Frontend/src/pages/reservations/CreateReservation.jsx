import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import RequiredNote from '../../components/Form/RequiredNote'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import ReservationSaleForm from '../../components/ReservationSale/ReservationSaleForm'
import useDialog from '../../hooks/useDialog'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import carFetch from '../../utils/fetch/car'
import customerFetch from '../../utils/fetch/customer'
import reservationFetch from '../../utils/fetch/reservation'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que permite reservar un coche disponible
const CreateReservation = () => {
  const [availableCars, setAvailableCars] = useState([])
  const { control, handleSubmit } = useForm()
  const { fetchData: getAllCars, data: cars } = useFetchWithDialog(
    carFetch.getAllCars
  )
  const { fetchData: getAllCustomers, data: customers } = useFetchWithDialog(
    customerFetch.getAllCustomers
  )
  const { fetchData: createReservation } = useFetchWithDialog(
    reservationFetch.createReservation
  )
  const { showAlertDialog } = useDialog()
  const navigate = useNavigate()

  const submit = async (body) =>
    helpers.handleAction(
      createReservation,
      showAlertDialog,
      navigate,
      `/${MENU_OPTIONS.reservations.id}`,
      body
    )

  // Inicialmente, se obtienen los coches y los clientes
  useEffect(() => {
    getAllCars()
    getAllCustomers()
  }, [])

  // Una vez obtenidos los coches, se obtienen sólo los coches disponibles
  useEffect(() => {
    if (cars != null) {
      setAvailableCars(
        cars.filter((car) => car.status === strings.CAR_STATUSES.available)
      )
    }
  }, [cars])

  if (cars == null || customers == null) {
    return null
  }

  return (
    <>
      <h2>{strings.RESERVATION_ACTIONS.create.label}</h2>

      <section className='form'>
        {availableCars.length > 0 && customers.length > 0 ? (
          <>
            <RequiredNote />
            <form onSubmit={handleSubmit(submit)}>
              <ReservationSaleForm
                control={control}
                cars={availableCars}
                customers={customers}
                action={strings.RESERVATION_ACTIONS.create}
              />
            </form>
          </>
        ) : (
          <div>
            <p>{strings.AVAILABLE_CARS_CUSTOMERS_NOT_FOUND_MSG}</p>
          </div>
        )}
      </section>
    </>
  )
}

export default CreateReservation
