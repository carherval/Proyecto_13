import { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../components/Auth/AuthProvider'
import CarFilter from '../../components/Car/CarFilter'
import CarList from '../../components/Car/CarList'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import carFetch from '../../utils/fetch/car'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que obtiene todos los coches y que permite realizar una búsqueda filtrada sobre los mismos
const Cars = () => {
  const { user } = useContext(AuthContext)
  const { fetchData, data } = useFetchWithDialog(carFetch.getAllCars)
  const [filteredCars, setFilteredCars] = useState([])

  // Filtrado de coches
  const getFilteredCars = useCallback(
    (filterValues) => {
      const filteredCars = helpers.getFilteredCars(data, filterValues)

      // Listado de los coches en orden alfabético (marca, modelo y matrícula)
      filteredCars.sort((car1, car2) =>
        helpers.sortEntities(car1, car2, (car) =>
          helpers.getCarDescr(car, { reverseCarLicensePlate: true })
        )
      )

      setFilteredCars(filteredCars)
    },
    [data]
  )

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data != null) {
      setFilteredCars(data)
    }
  }, [data])

  if (data == null) {
    return null
  }

  return (
    <>
      <h2>{MENU_OPTIONS.cars.label}</h2>

      {helpers.isAdminUser(user) && (
        <section className='btn-box'>
          <div>
            <Link
              to={`/${MENU_OPTIONS.cars.id}/${strings.CAR_ACTIONS.create.id}`}
            >
              {strings.CAR_ACTIONS.create.label}
            </Link>
          </div>
        </section>
      )}

      {data.length > 0 ? (
        <>
          <CarFilter getFilteredCars={getFilteredCars} />

          <section className='results'>
            {filteredCars.length > 0 ? (
              <CarList cars={filteredCars} />
            ) : (
              <div>
                <p>{strings.CARS_NOT_FOUND_MSG}</p>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className='results'>
          <div>
            <p>{strings.CARS_NOT_FOUND_MSG}</p>
          </div>
        </section>
      )}
    </>
  )
}

export default Cars
