import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation } from 'react-router-dom'
import CarForm from '../../components/Car/CarForm'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import carFetch from '../../utils/fetch/car'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

const DEFAULT_UPDATE_CAR_FORM_VALUES = {
  color: strings.COLORS[0]
}

// Componente que permite actualizar un coche
const UpdateCar = () => {
  // Identificador del coche
  const id = useLocation().state?.id

  if (id == null) {
    return <Navigate to={`/${MENU_OPTIONS.cars.id}`} replace />
  }

  const { register, control, reset, watch, handleSubmit } = useForm({
    defaultValues: DEFAULT_UPDATE_CAR_FORM_VALUES,
    shouldUnregister: true
  })
  const { fetchData: getCarById, data } = useFetchWithDialog(
    carFetch.getCarById
  )
  const { fetchData: updateCarById } = useFetchWithDialog(
    carFetch.updateCarById
  )

  const submit = (body) => updateCarById(id, helpers.getFormData(body))

  useEffect(() => {
    getCarById(id)
  }, [id])

  // Una vez obtenido el coche, se carga el formulario con los datos del mismo
  useEffect(() => {
    if (data != null) {
      reset({ ...DEFAULT_UPDATE_CAR_FORM_VALUES, ...data, img: [] })
    }
  }, [data, reset])

  return (
    <>
      <h2>{strings.CAR_ACTIONS.update.label}</h2>

      {data != null && (
        <form onSubmit={handleSubmit(submit)}>
          <CarForm
            register={register}
            control={control}
            watch={watch}
            car={data}
          />
        </form>
      )}
    </>
  )
}

export default UpdateCar
