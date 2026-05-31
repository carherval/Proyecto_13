import NumberField from '../Form/NumberField'
import strings from '../../utils/strings'

// Componente que devuelve los campos para la devolución de un coche
const DeleteSaleForm = ({ register }) => (
  <>
    <div>
      <NumberField
        id={strings.CAR_FIELDS.mileage.id}
        label={`${strings.CAR_FIELDS.mileage.label} realizado`}
        register={register}
      />
    </div>

    <button type={strings.INPUT_FIELD_TYPES.submit}>
      {strings.SALE_ACTIONS.delete.label}
    </button>
  </>
)

export default DeleteSaleForm
