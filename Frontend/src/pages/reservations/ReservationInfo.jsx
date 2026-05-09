import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import ReservationSaleData from '../../components/ReservationSale/ReservationSaleData'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import reservationFetch from '../../utils/fetch/reservation'
import strings from '../../utils/strings'

// Componente que muestra la información de la reserva de un coche
const ReservationInfo = () => {
  // Identificador de la reserva
  const id = useLocation().state?.id

  if (id == null) {
    return <Navigate to={`/${MENU_OPTIONS.reservations.id}`} replace />
  }

  const { fetchData, data } = useFetchWithDialog(
    reservationFetch.getReservationById
  )

  useEffect(() => {
    fetchData(id)
  }, [id])

  return (
    <>
      <h2>{strings.RESERVATION_ACTIONS.info.label}</h2>

      {data != null && <ReservationSaleData reservationSale={data} />}
    </>
  )
}

export default ReservationInfo
