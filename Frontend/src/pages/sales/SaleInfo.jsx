import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import ReservationSaleData from '../../components/ReservationSale/ReservationSaleData'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import saleFetch from '../../utils/fetch/sale'
import strings from '../../utils/strings'

// Componente que muestra la información de la venta de un coche
const SaleInfo = () => {
  // Identificador de la venta
  const id = useLocation().state?.id

  if (id == null) {
    return <Navigate to={`/${MENU_OPTIONS.sales.id}`} replace />
  }

  const { fetchData, data } = useFetchWithDialog(saleFetch.getSaleById)

  useEffect(() => {
    fetchData(id)
  }, [id])

  return (
    <>
      <h2>{strings.SALE_ACTIONS.info.label}</h2>

      {data != null && <ReservationSaleData reservationSale={data} />}
    </>
  )
}

export default SaleInfo
