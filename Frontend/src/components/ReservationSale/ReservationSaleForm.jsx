import SelectFieldWithFilter from '../Form/SelectFieldWithFilter'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que devuelve los campos para la reserva o la venta de un coche
const ReservationSaleForm = ({ control, cars, customers, action }) => (
  <>
    <div>
      <SelectFieldWithFilter
        id={strings.RESERVATION_SALE_FIELDS.car.id}
        label={strings.RESERVATION_SALE_FIELDS.car.label}
        options={cars.map((car) => ({
          value: car._id,
          label: helpers.getCarDescr(car)
        }))}
        control={control}
      />
    </div>

    <div>
      <SelectFieldWithFilter
        id={strings.RESERVATION_SALE_FIELDS.customer.id}
        label={strings.RESERVATION_SALE_FIELDS.customer.label}
        options={customers.map((customer) => ({
          value: customer._id,
          label: helpers.getCustomerFullName(customer)
        }))}
        control={control}
      />
    </div>

    <button type={strings.INPUT_FIELD_TYPES.submit}>{action.label}</button>
  </>
)

export default ReservationSaleForm
