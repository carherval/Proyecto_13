import { useForm } from 'react-hook-form'
import CarForm from '../../components/Car/CarForm'
import RequiredNote from '../../components/Form/RequiredNote'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import carFetch from '../../utils/fetch/car'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

const DEFAULT_CREATE_CAR_FORM_VALUES = {
  make: Object.keys(strings.CAR_MAKE_MODELS)[0],
  model: strings.CAR_MAKE_MODELS.Acura[0],
  color: strings.COLORS[0],
  condition: strings.CAR_CONDITIONS.new
}

// Componente que permite crear un coche nuevo
const CreateCar = () => {
  const { register, control, watch, reset, handleSubmit } = useForm({
    defaultValues: DEFAULT_CREATE_CAR_FORM_VALUES,
    shouldUnregister: true
  })
  const { fetchData } = useFetchWithDialog(carFetch.createCar)

  const submit = (body) => fetchData(helpers.getFormData(body))

  return (
    <>
      <h2>{strings.CAR_ACTIONS.create.label}</h2>

      <section className='form'>
        <RequiredNote />
        <form onSubmit={handleSubmit(submit)}>
          <CarForm
            register={register}
            control={control}
            watch={watch}
            reset={reset}
          />
        </form>
      </section>
    </>
  )
}

export default CreateCar
