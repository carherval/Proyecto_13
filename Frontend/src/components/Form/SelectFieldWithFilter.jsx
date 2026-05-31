import './Form.scss'

import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { getRequiredStar } from './RequiredNote'
import strings from '../../utils/strings'

// Componente que devuelve un campo de selección única mediante filtro
const SelectFieldWithFilter = ({ id, label, options, control }) => {
  const placeholderText = `Filtrar ${label.toLowerCase()}`

  return (
    <label>
      {label} {getRequiredStar()}
      <Controller
        name={id}
        control={control}
        defaultValue={options[0].value}
        render={({ field }) => (
          <Select
            name={id}
            className='slct-fltr'
            classNamePrefix='sf'
            options={options}
            placeholder={placeholderText}
            title={placeholderText}
            value={
              options.find((option) => option.value === field.value) ??
              options[0].value
            }
            onChange={(option) =>
              field.onChange(option.value ?? options[0].value)
            }
            isSearchable={true}
            noOptionsMessage={() =>
              id === strings.RESERVATION_SALE_FIELDS.car.id
                ? strings.CARS_NOT_FOUND_MSG
                : strings.CUSTOMERS_NOT_FOUND_MSG
            }
          />
        )}
      />
    </label>
  )
}

export default SelectFieldWithFilter
