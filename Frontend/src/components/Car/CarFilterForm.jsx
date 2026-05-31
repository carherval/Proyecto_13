import RadioGroupField from '../Form/RadioGroupField'
import TextField from '../Form/TextField'
import strings from '../../utils/strings'

// Componente que devuelve los campos para la búsqueda filtrada de coches
const CarFilterForm = ({ register, isCarsSection = true }) => (
  <>
    <div>
      <TextField
        id={strings.RESERVATION_SALE_FIELDS.car.id}
        placeholder={`${strings.CAR_FIELDS.licensePlate.label}, ${strings.CAR_FIELDS.make.label}, ${strings.CAR_FIELDS.model.label}, ${strings.CAR_FIELDS.color.label} del ${strings.RESERVATION_SALE_FIELDS.car.label.toLowerCase()}`}
        register={register}
        isRequired={false}
      />
    </div>

    <div>
      <RadioGroupField
        id={strings.CAR_FIELDS.condition.id}
        label={`${strings.CAR_FIELDS.condition.label}${!isCarsSection ? ' del ' + strings.RESERVATION_SALE_FIELDS.car.label.toLowerCase() : ''}`}
        options={strings.CAR_CONDITION_FILTER_OPTIONS}
        register={register}
      />
    </div>

    {/* El filtrado por el estado del coche es sólo para la sección de coches */}
    {isCarsSection && (
      <div>
        <RadioGroupField
          id={strings.CAR_FIELDS.status.id}
          label={strings.CAR_FIELDS.status.label}
          options={strings.CAR_STATUS_FILTER_OPTIONS}
          register={register}
        />
      </div>
    )}
  </>
)

export default CarFilterForm
