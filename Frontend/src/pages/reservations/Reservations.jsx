import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import ReservationSaleFilter from '../../components/ReservationSale/ReservationSaleFilter'
import ReservationSaleList from '../../components/ReservationSale/ReservationSaleList'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import reservationFetch from '../../utils/fetch/reservation'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que obtiene todas las reservas de coches y que permite realizar una búsqueda filtrada sobre las mismas
const Reservations = () => {
  const { fetchData, data } = useFetchWithDialog(
    reservationFetch.getAllReservations
  )
  const [filteredReservations, setFilteredReservations] = useState([])
  const [order, setOrder] = useState(
    strings.RESERVATION_SALE_ORDER_OPTIONS.car.value
  )

  // Filtrado de reservas
  const getFilteredReservations = useCallback(
    (filterValues) => {
      let filteredReservations = helpers.getFilteredCars(data, filterValues, {
        getCar: (reservation) => reservation.car,
        isCarsSection: false
      })

      // Se combina el filtro sobre los coches con el filtro sobre los clientes
      filteredReservations = helpers.getFilteredCustomers(
        filteredReservations,
        filterValues,
        (reservation) => reservation.customer
      )

      setOrder(filterValues.order)

      // Listado de las reservas en orden alfabético de los coches (marca, modelo y matrícula) o de los clientes (apellidos y nombre)
      filteredReservations.sort((reservation1, reservation2) =>
        helpers.sortEntities(reservation1, reservation2, (reservation) =>
          order === strings.RESERVATION_SALE_ORDER_OPTIONS.car.value
            ? helpers.getCarDescr(reservation.car, {
                reverseCarLicensePlate: true
              })
            : helpers.getCustomerFullName(reservation.customer)
        )
      )

      setFilteredReservations(filteredReservations)
    },
    [data]
  )

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data != null) {
      setFilteredReservations(data)
    }
  }, [data])

  if (data == null) {
    return null
  }

  return (
    <>
      <h2>{MENU_OPTIONS.reservations.label}</h2>

      <Link
        to={`/${MENU_OPTIONS.reservations.id}/${strings.RESERVATION_ACTIONS.create.id}`}
      >
        {strings.RESERVATION_ACTIONS.create.label}
      </Link>

      {data.length > 0 ? (
        <>
          <ReservationSaleFilter
            getFilteredReservationsSales={getFilteredReservations}
          />

          {filteredReservations.length > 0 ? (
            <ReservationSaleList
              reservationsSales={filteredReservations}
              order={order}
            />
          ) : (
            <div className='flex'>
              <p>{strings.RESERVATIONS_NOT_FOUND_MSG}</p>
            </div>
          )}
        </>
      ) : (
        <div className='flex'>
          <p>{strings.RESERVATIONS_NOT_FOUND_MSG}</p>
        </div>
      )}
    </>
  )
}

export default Reservations
