import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomerFilter from '../../components/Customer/CustomerFilter'
import CustomerList from '../../components/Customer/CustomerList'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import customerFetch from '../../utils/fetch/customer'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que obtiene todos los clientes y que permite realizar una búsqueda filtrada sobre los mismos
const Customers = () => {
  const { fetchData, data } = useFetchWithDialog(customerFetch.getAllCustomers)
  const [filteredCustomers, setFilteredCustomers] = useState([])

  // Filtrado de clientes
  const getFilteredCustomers = useCallback(
    (filterValues) => {
      const filteredCustomers = helpers.getFilteredCustomers(data, filterValues)

      // Listado de los clientes en orden alfabético (apellidos y nombre)
      filteredCustomers.sort((customer1, customer2) =>
        helpers.sortEntities(customer1, customer2, helpers.getCustomerFullName)
      )

      setFilteredCustomers(filteredCustomers)
    },
    [data]
  )

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data != null) {
      setFilteredCustomers(data)
    }
  }, [data])

  if (data == null) {
    return null
  }

  return (
    <>
      <h2>{MENU_OPTIONS.customers.label}</h2>

      <Link
        to={`/${MENU_OPTIONS.customers.id}/${strings.CUSTOMER_ACTIONS.create.id}`}
      >
        {strings.CUSTOMER_ACTIONS.create.label}
      </Link>

      {data.length > 0 ? (
        <>
          <CustomerFilter getFilteredCustomers={getFilteredCustomers} />

          {filteredCustomers.length > 0 ? (
            <CustomerList customers={filteredCustomers} />
          ) : (
            <div className='flex'>
              <p>{strings.CUSTOMERS_NOT_FOUND_MSG}</p>
            </div>
          )}
        </>
      ) : (
        <div className='flex'>
          <p>{strings.CUSTOMERS_NOT_FOUND_MSG}</p>
        </div>
      )}
    </>
  )
}

export default Customers
