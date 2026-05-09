import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import CustomerData from '../../components/Customer/CustomerData'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import customerFetch from '../../utils/fetch/customer'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra la información de un cliente
const CustomerInfo = () => {
  // Identificador del cliente
  const id = useLocation().state?.id

  if (id == null) {
    return <Navigate to={`/${MENU_OPTIONS.customers.id}`} replace />
  }

  const { fetchData, data } = useFetchWithDialog(customerFetch.getCustomerById)

  useEffect(() => {
    fetchData(id)
  }, [id])

  return (
    <>
      <h2>{strings.CUSTOMER_ACTIONS.info.label}</h2>

      {data != null && <CustomerData customer={data} />}
    </>
  )
}

export default CustomerInfo
