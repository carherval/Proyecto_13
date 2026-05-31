import DateField from '../Form/DateField'
import FileField from '../Form/FileField'
import NumberField from '../Form/NumberField'
import SelectField from '../Form/SelectField'
import TextField from '../Form/TextField'
import strings from '../../utils/strings'

// Componente que devuelve los campos para la creación o actualización de un coche
const CarForm = ({ register, control, watch, car }) => {
  const [make, img, condition] = watch([
    strings.CAR_FIELDS.make.id,
    strings.CAR_FIELDS.img.id,
    strings.CAR_FIELDS.condition.id
  ])

  // Si un coche está disponible sólo se puede actualizar el color, la imagen y el precio
  // Si un coche no está disponible sólo se puede actualizar la imagen

  return (
    <>
      {car == null && (
        <>
          <div>
            <TextField
              id={strings.CAR_FIELDS.licensePlate.id}
              label={strings.CAR_FIELDS.licensePlate.label}
              placeholder='1234BCD'
              maxLength='7'
              register={register}
            />
          </div>

          <div>
            <SelectField
              id={strings.CAR_FIELDS.make.id}
              label={strings.CAR_FIELDS.make.label}
              options={Object.keys(strings.CAR_MAKE_MODELS)}
              register={register}
            />
          </div>

          <div>
            <SelectField
              id={strings.CAR_FIELDS.model.id}
              label={strings.CAR_FIELDS.model.label}
              options={strings.CAR_MAKE_MODELS[make]}
              register={register}
            />
          </div>
        </>
      )}

      {(car == null || car.status === strings.CAR_STATUSES.available) && (
        <div>
          <SelectField
            id={strings.CAR_FIELDS.color.id}
            label={strings.CAR_FIELDS.color.label}
            options={strings.COLORS}
            register={register}
          />
        </div>
      )}

      <div>
        <FileField
          id={strings.CAR_FIELDS.img.id}
          fileName={
            img != null && img.length > 0
              ? img[0].name
              : `${strings.CAR_FIELDS.img.label} del ${strings.RESERVATION_SALE_FIELDS.car.label.toLowerCase()}`
          }
          register={register}
        />
      </div>

      {car == null && (
        <>
          <div>
            <NumberField
              id={strings.CAR_FIELDS.modelYear.id}
              label={strings.CAR_FIELDS.modelYear.label}
              maxLength='4'
              register={register}
            />
          </div>

          <div>
            <DateField
              id={strings.CAR_FIELDS.purchaseDate.id}
              label={strings.CAR_FIELDS.purchaseDate.label}
              control={control}
            />
          </div>

          <div>
            <SelectField
              id={strings.CAR_FIELDS.condition.id}
              label={strings.CAR_FIELDS.condition.label}
              options={Object.values(strings.CAR_CONDITIONS)}
              register={register}
            />
          </div>

          {/* Si se crea un coche con la condición "Nuevo" el kilometraje siempre es 0 */}
          {condition === strings.CAR_CONDITIONS.used && (
            <div>
              <NumberField
                id={strings.CAR_FIELDS.mileage.id}
                label={strings.CAR_FIELDS.mileage.label}
                register={register}
              />
            </div>
          )}
        </>
      )}

      {(car == null || car.status === strings.CAR_STATUSES.available) && (
        <div>
          <NumberField
            id={strings.CAR_FIELDS.price.id}
            label={strings.CAR_FIELDS.price.label}
            register={register}
          />
        </div>
      )}

      <button type={strings.INPUT_FIELD_TYPES.submit}>
        {car == null
          ? strings.CAR_ACTIONS.create.label
          : strings.CAR_ACTIONS.update.label}
      </button>
    </>
  )
}

export default CarForm
