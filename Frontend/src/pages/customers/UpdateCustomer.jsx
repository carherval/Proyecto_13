import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation } from 'react-router-dom'
import CustomerForm from '../../components/Customer/CustomerForm'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import customerFetch from '../../utils/fetch/customer'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que permite actualizar un cliente
const UpdateCustomer = () => {
  // Identificador del cliente
  const id = useLocation().state?.id

  if (id == null) {
    return <Navigate to={`/${MENU_OPTIONS.customers.id}`} replace />
  }

  const { register, reset, handleSubmit } = useForm()
  const { fetchData: getCustomerById, data } = useFetchWithDialog(
    customerFetch.getCustomerById
  )
  const { fetchData: updateCustomerById } = useFetchWithDialog(
    customerFetch.updateCustomerById
  )

  const submit = (body) => updateCustomerById(id, body)

  useEffect(() => {
    getCustomerById(id)
  }, [id])

  // Una vez obtenido el cliente, se carga el formulario con los datos del mismo
  useEffect(() => {
    if (data != null) {
      reset({ ...data })
    }
  }, [data, reset])

  return (
    <>
      <h2>{strings.CUSTOMER_ACTIONS.update.label}</h2>

      {data != null && (
        <form onSubmit={handleSubmit(submit)}>
          <CustomerForm register={register} customer={data} />
        </form>
      )}
    </>
  )
}

export default UpdateCustomer
