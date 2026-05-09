import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

// "Custom hook" para filtrar los datos de las entidades en las búsquedas
const useFilter = (defaultValues, getFilteredData) => {
  const { register, watch } = useForm({ defaultValues })
  const filterValues = watch()

  useEffect(() => {
    getFilteredData(filterValues)
  }, [filterValues, getFilteredData])

  return { register }
}

export default useFilter
