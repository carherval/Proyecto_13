import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import CarData from '../../components/Car/CarData'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import carFetch from '../../utils/fetch/car'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra la información de un coche
const CarInfo = () => {
  // Identificador del coche
  const id = useLocation().state?.id

  if (id == null) {
    return <Navigate to={`/${MENU_OPTIONS.cars.id}`} replace />
  }

  const { fetchData, data } = useFetchWithDialog(carFetch.getCarById)

  useEffect(() => {
    fetchData(id)
  }, [id])

  return (
    <>
      <h2>{strings.CAR_ACTIONS.info.label}</h2>

      {data != null && <CarData car={data} />}
    </>
  )
}

export default CarInfo
