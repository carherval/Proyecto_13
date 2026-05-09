import 'react-datepicker/dist/react-datepicker.css'

import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'

// Componente que devuelve un campo de selección de fecha mediante un calendario
const DateField = ({ id, label, control }) => (
  <label>
    {label}
    <span className='required'>*</span>:
    <Controller
      name={id}
      control={control}
      defaultValue=''
      render={({ field }) => (
        <DatePicker
          className='input'
          dateFormat='dd/MM/yyyy'
          placeholderText='DD/MM/AAAA'
          selected={field.value ?? ''}
          onChange={(date) => field.onChange(date ?? '')}
        />
      )}
    />
  </label>
)

export default DateField
