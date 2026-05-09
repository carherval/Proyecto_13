import React from 'react'
import strings from '../../utils/strings'

// Componente que devuelve un campo para las opciones de selección de las búsquedas filtradas
const RadioGroupField = ({ id, label, options, register }) => (
  <>
    <span>{label}:</span>

    {Object.values(options).map((option) => (
      <label key={option.id} className='radio-button'>
        <input
          type={strings.INPUT_FIELD_TYPES.radio}
          value={option.value}
          {...register(id)}
        />
        <span>{option.value}</span>
      </label>
    ))}
  </>
)

export default RadioGroupField
