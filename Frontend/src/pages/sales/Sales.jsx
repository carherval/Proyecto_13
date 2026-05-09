import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import ReservationSaleFilter from '../../components/ReservationSale/ReservationSaleFilter'
import ReservationSaleList from '../../components/ReservationSale/ReservationSaleList'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import saleFetch from '../../utils/fetch/sale'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que obtiene todas las ventas de coches y que permite realizar una búsqueda filtrada sobre las mismas
const Sales = () => {
  const { fetchData, data } = useFetchWithDialog(saleFetch.getAllSales)
  const [filteredSales, setFilteredSales] = useState([])
  const [order, setOrder] = useState(
    strings.RESERVATION_SALE_ORDER_OPTIONS.car.value
  )

  // Filtrado de ventas
  const getFilteredSales = useCallback(
    (filterValues) => {
      let filteredSales = helpers.getFilteredCars(data, filterValues, {
        getCar: (sale) => sale.car,
        isCarsSection: false
      })

      // Se combina el filtro sobre los coches con el filtro sobre los clientes
      filteredSales = helpers.getFilteredCustomers(
        filteredSales,
        filterValues,
        (sale) => sale.customer
      )

      setOrder(filterValues.order)

      // Listado de las ventas en orden alfabético de los coches (marca, modelo y matrícula) o de los clientes (apellidos y nombre)
      filteredSales.sort((sale1, sale2) =>
        helpers.sortEntities(sale1, sale2, (sale) =>
          order === strings.RESERVATION_SALE_ORDER_OPTIONS.car.value
            ? helpers.getCarDescr(sale.car, {
                reverseCarLicensePlate: true
              })
            : helpers.getCustomerFullName(sale.customer)
        )
      )

      setFilteredSales(filteredSales)
    },
    [data]
  )

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data != null) {
      setFilteredSales(data)
    }
  }, [data])

  if (data == null) {
    return null
  }

  return (
    <>
      <h2>{MENU_OPTIONS.sales.label}</h2>

      <Link to={`/${MENU_OPTIONS.sales.id}/${strings.SALE_ACTIONS.create.id}`}>
        {strings.SALE_ACTIONS.create.label}
      </Link>

      {data.length > 0 ? (
        <>
          <ReservationSaleFilter
            getFilteredReservationsSales={getFilteredSales}
          />

          {filteredSales.length > 0 ? (
            <ReservationSaleList
              reservationsSales={filteredSales}
              order={order}
            />
          ) : (
            <div className='flex'>
              <p>{strings.SALES_NOT_FOUND_MSG}</p>
            </div>
          )}
        </>
      ) : (
        <div className='flex'>
          <p>{strings.SALES_NOT_FOUND_MSG}</p>
        </div>
      )}
    </>
  )
}

export default Sales
