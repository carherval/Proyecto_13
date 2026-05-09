import TextField from '../Form/TextField'
import strings from '../../utils/strings'

// Componente que devuelve los campos para la creación o actualización de un cliente
const CustomerForm = ({ register, customer }) => (
  <>
    <div>
      <TextField
        id={strings.CUSTOMER_USER_FIELDS.surnames.id}
        label={strings.CUSTOMER_USER_FIELDS.surnames.label}
        register={register}
      />
    </div>

    <div>
      <TextField
        id={strings.CUSTOMER_USER_FIELDS.name.id}
        label={strings.CUSTOMER_USER_FIELDS.name.label}
        register={register}
      />
    </div>

    <div>
      <TextField
        id={strings.CUSTOMER_USER_FIELDS.email.id}
        label={strings.CUSTOMER_USER_FIELDS.email.label}
        register={register}
      />
    </div>

    <button type={strings.INPUT_FIELD_TYPES.submit}>
      {customer == null
        ? strings.CUSTOMER_ACTIONS.create.label
        : strings.CUSTOMER_ACTIONS.update.label}
    </button>
  </>
)

export default CustomerForm
