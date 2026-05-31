import TextField from '../Form/TextField'
import strings from '../../utils/strings'

// Componente que devuelve los campos para la búsqueda filtrada de clientes
const CustomerFilterForm = ({ register }) => (
  <div>
    <TextField
      id={strings.RESERVATION_SALE_FIELDS.customer.id}
      placeholder={`${strings.CUSTOMER_USER_FIELDS.surnames.label}, ${strings.CUSTOMER_USER_FIELDS.name.label}, ${strings.CUSTOMER_USER_FIELDS.email.label} del ${strings.RESERVATION_SALE_FIELDS.customer.label.toLowerCase()}`}
      register={register}
      isRequired={false}
    />
  </div>
)

export default CustomerFilterForm
