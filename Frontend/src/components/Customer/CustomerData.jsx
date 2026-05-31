import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MENU_OPTIONS } from '../Menu/Menu'
import useDialog from '../../hooks/useDialog'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import customerFetch from '../../utils/fetch/customer'
import reservationFetch from '../../utils/fetch/reservation'
import saleFetch from '../../utils/fetch/sale'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra los datos de un cliente
const CustomerData = ({ customer }) => {
  const { fetchData: getReservationsByCustomerId, data: reservations } =
    useFetchWithDialog(reservationFetch.getReservationsByCustomerId)
  const { fetchData: getSalesByCustomerId, data: sales } = useFetchWithDialog(
    saleFetch.getSalesByCustomerId
  )
  const { fetchData: deleteCustomerById } = useFetchWithDialog(
    customerFetch.deleteCustomerById
  )
  const { showAlertDialog, showConfirmDialog } = useDialog()
  const navigate = useNavigate()

  const handleDeleteCustomerById = () =>
    helpers.handleAction(
      deleteCustomerById,
      showAlertDialog,
      navigate,
      `/${MENU_OPTIONS.customers.id}`,
      customer._id
    )

  // Se obtienen las reservas y las ventas del cliente
  useEffect(() => {
    getReservationsByCustomerId(customer._id)
    getSalesByCustomerId(customer._id)
  }, [customer])

  if (reservations == null || sales == null) {
    return null
  }

  return (
    <>
      <section className='btn-box'>
        <div>
          <Link
            to={`/${MENU_OPTIONS.customers.id}/${strings.CUSTOMER_ACTIONS.update.id}`}
            state={{ id: customer._id }}
          >
            {strings.CUSTOMER_ACTIONS.update.label}
          </Link>

          {/* No se puede eliminar un cliente con coches reservados o vendidos */}
          {reservations.length === 0 && sales.length === 0 && (
            <button
              type={strings.INPUT_FIELD_TYPES.button}
              onClick={() =>
                showConfirmDialog(
                  strings.ACTION_CONFIRM_MSG,
                  handleDeleteCustomerById
                )
              }
            >
              {strings.CUSTOMER_ACTIONS.delete.label}
            </button>
          )}
        </div>
      </section>

      <section className='info'>
        <article>
          <h3>{helpers.getCustomerFullName(customer, true)}</h3>

          <div className='data'>
            <div>
              <div>{strings.CUSTOMER_USER_FIELDS.email.label}</div>
              <div>
                <Link
                  to={`mailto:${customer.email}`}
                  title={`${strings.CUSTOMER_USER_ACTIONS.email.label} ${helpers.getCustomerFullName(customer, true)}`}
                >
                  {customer.email}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default CustomerData
