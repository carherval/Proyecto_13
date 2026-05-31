import React from 'react'
import CustomerFilterForm from './CustomerFilterForm'
import useFilter from '../../hooks/useFilter'

const DEFAULT_CUSTOMER_FILTER_VALUES = { customer: '' }

// Componente que muestra la búsqueda filtrada de clientes
const CustomerFilter = React.memo(({ getFilteredCustomers }) => {
  const { register } = useFilter(
    DEFAULT_CUSTOMER_FILTER_VALUES,
    getFilteredCustomers
  )

  return (
    <section className='search'>
      <form onSubmit={(event) => event.preventDefault()}>
        <CustomerFilterForm register={register} />
      </form>
    </section>
  )
})

export default CustomerFilter
