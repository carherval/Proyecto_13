import { Controller } from 'react-hook-form'
import Select from 'react-select'
import strings from '../../utils/strings'

// Componente que devuelve un campo de selección única mediante filtro
const SelectFieldWithFilter = ({ id, label, options, control }) => (
  <label>
    {label}
    <span className='required'>*</span>:
    <Controller
      name={id}
      control={control}
      defaultValue={options[0].value}
      render={({ field }) => (
        <Select
          options={options}
          placeholder={`Filtrar ${label.toLowerCase()}`}
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

export default SelectFieldWithFilter
