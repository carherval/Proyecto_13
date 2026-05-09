import React from 'react'
import CarFilterForm from './CarFilterForm'
import useFilter from '../../hooks/useFilter'
import strings from '../../utils/strings'

const INITIAL_CAR_FILTER_VALUES = {
  car: '',
  condition: strings.CAR_CONDITION_FILTER_OPTIONS.allConditions.value,
  status: strings.CAR_STATUS_FILTER_OPTIONS.allStatuses.value
}

// Componente que muestra la búsqueda filtrada de coches
const CarFilter = React.memo(({ getFilteredCars }) => {
  const { register } = useFilter(INITIAL_CAR_FILTER_VALUES, getFilteredCars)

  return (
    <form className='flex' onSubmit={(event) => event.preventDefault()}>
      <CarFilterForm register={register} />
    </form>
  )
})

export default CarFilter
