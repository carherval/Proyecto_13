import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import RequiredNote from '../Form/RequiredNote'
import { MENU_OPTIONS } from '../Menu/Menu'
import DeleteSaleForm from './DeleteSaleForm'
import useDialog from '../../hooks/useDialog'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import reservationFetch from '../../utils/fetch/reservation'
import saleFetch from '../../utils/fetch/sale'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra los datos de una reserva o de una venta
const ReservationSaleData = ({ reservationSale }) => {
  const { register, handleSubmit } = useForm()
  const { fetchData: deleteReservationById } = useFetchWithDialog(
    reservationFetch.deleteReservationById
  )
  const { fetchData: createSale } = useFetchWithDialog(saleFetch.createSale)
  const { fetchData: deleteSaleById } = useFetchWithDialog(
    saleFetch.deleteSaleById
  )
  const { showAlertDialog, showConfirmDialog } = useDialog()
  const navigate = useNavigate()
  const isReservation =
    reservationSale.car.status === strings.CAR_STATUSES.reserved

  const handleDeleteReservationById = () =>
    helpers.handleAction(
      deleteReservationById,
      showAlertDialog,
      navigate,
      `/${MENU_OPTIONS.reservations.id}`,
      reservationSale._id
    )

  // Sólo se puede vender un coche reservado al cliente de dicha reserva
  const handleCreateSale = () =>
    helpers.handleAction(
      createSale,
      showAlertDialog,
      navigate,
      `/${MENU_OPTIONS.sales.id}`,
      { car: reservationSale.car._id, customer: reservationSale.customer._id }
    )

  const handleDeleteSaleById = (body) =>
    helpers.handleAction(
      deleteSaleById,
      showAlertDialog,
      navigate,
      `/${MENU_OPTIONS.sales.id}`,
      reservationSale._id,
      body
    )

  const submit = (body) =>
    showConfirmDialog(strings.ACTION_CONFIRM_MSG, () =>
      handleDeleteSaleById(body)
    )

  return (
    <>
      <section className='btn-box'>
        <div>
          {isReservation && (
            <>
              <button
                type={strings.INPUT_FIELD_TYPES.button}
                onClick={() =>
                  showConfirmDialog(
                    strings.ACTION_CONFIRM_MSG,
                    handleDeleteReservationById
                  )
                }
              >
                {strings.RESERVATION_ACTIONS.delete.label}
              </button>

              <button
                type={strings.INPUT_FIELD_TYPES.button}
                onClick={() =>
                  showConfirmDialog(
                    strings.ACTION_CONFIRM_MSG,
                    handleCreateSale
                  )
                }
              >
                {strings.SALE_ACTIONS.create.label}
              </button>
            </>
          )}

          {!isReservation && (
            <section className='form'>
              <RequiredNote />
              <form onSubmit={handleSubmit(submit)}>
                <DeleteSaleForm register={register} />
              </form>
            </section>
          )}
        </div>
      </section>

      <section className='info'>
        <article>
          <div className='data'>
            <div>
              <div>
                {isReservation
                  ? strings.RESERVATION_FIELDS.reservationDate.label
                  : strings.SALE_FIELDS.saleDate.label}
              </div>
              <div>
                {helpers.getFormattedDate(
                  isReservation
                    ? reservationSale.reservationDate
                    : reservationSale.saleDate
                )}
              </div>
            </div>

            <div>
              <div>{strings.RESERVATION_SALE_FIELDS.car.label}</div>
              <div>
                <Link
                  to={`/${MENU_OPTIONS.cars.id}/${strings.CAR_ACTIONS.info.id}`}
                  title={strings.CAR_ACTIONS.info.label}
                  state={{ id: reservationSale.car._id }}
                >
                  {helpers.getCarDescr(reservationSale.car)}
                </Link>
              </div>
            </div>

            <div>
              <div>{strings.RESERVATION_SALE_FIELDS.customer.label}</div>
              <div>
                <Link
                  to={`/${MENU_OPTIONS.customers.id}/${strings.CUSTOMER_ACTIONS.info.id}`}
                  title={strings.CUSTOMER_ACTIONS.info.label}
                  state={{ id: reservationSale.customer._id }}
                >
                  {helpers.getCustomerFullName(reservationSale.customer)}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default ReservationSaleData
