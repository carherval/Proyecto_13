import React from 'react'
import CarFilterForm from '../Car/CarFilterForm'
import CustomerFilterForm from '../Customer/CustomerFilterForm'
import RadioGroupField from '../Form/RadioGroupField'
import useFilter from '../../hooks/useFilter'
import strings from '../../utils/strings'

const INITIAL_RESERVATION_SALE_FILTER_VALUES = {
  car: '',
  condition: strings.CAR_CONDITION_FILTER_OPTIONS.allConditions.value,
  customer: '',
  order: strings.RESERVATION_SALE_ORDER_OPTIONS.car.value
}

// Componente que muestra la búsqueda filtrada de reservas o de ventas
const ReservationSaleFilter = React.memo(({ getFilteredReservationsSales }) => {
  const { register } = useFilter(
    INITIAL_RESERVATION_SALE_FILTER_VALUES,
    getFilteredReservationsSales
  )

  return (
    <section className='search'>
      <form onSubmit={(event) => event.preventDefault()}>
        <CarFilterForm register={register} isCarsSection={false} />
        <CustomerFilterForm register={register} />

        <div>
          <RadioGroupField
            id='order'
            label='Ordenar por'
            options={strings.RESERVATION_SALE_ORDER_OPTIONS}
            register={register}
          />
        </div>
      </form>
    </section>
  )
})

export default ReservationSaleFilter
