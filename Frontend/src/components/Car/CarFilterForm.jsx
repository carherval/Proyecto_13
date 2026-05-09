import RadioGroupField from '../Form/RadioGroupField'
import TextField from '../Form/TextField'
import strings from '../../utils/strings'

// Componente que devuelve los campos para la búsqueda filtrada de coches
const CarFilterForm = ({ register, isCarsSection = true }) => (
  <>
    <div className='flex'>
      <TextField
        id={strings.RESERVATION_SALE_FIELDS.car.id}
        label={strings.RESERVATION_SALE_FIELDS.car.label}
        placeholder={`${strings.CAR_FIELDS.licensePlate.label}, ${strings.CAR_FIELDS.make.label}, ${strings.CAR_FIELDS.model.label}, ${strings.CAR_FIELDS.color.label}`}
        register={register}
        isRequired={false}
      />
    </div>

    <div className='flex'>
      <RadioGroupField
        id={strings.CAR_FIELDS.condition.id}
        label={strings.CAR_FIELDS.condition.label}
        options={strings.CAR_CONDITION_FILTER_OPTIONS}
        register={register}
      />
    </div>

    {/* El filtrado por el estado del coche es sólo para la sección de coches */}
    {isCarsSection && (
      <div className='flex'>
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
