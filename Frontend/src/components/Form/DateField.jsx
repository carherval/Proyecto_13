import 'react-datepicker/dist/react-datepicker.css'
import './Form.scss'

import DatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'
import { getRequiredStar } from './RequiredNote'

// Componente que devuelve un campo de selección de fecha mediante un calendario
const DateField = ({ id, label, control }) => {
  const placeholderText = 'DD/MM/AAAA'

  return (
    <label className='date'>
      {label} {getRequiredStar()}
      <Controller
        name={id}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <DatePicker
            name={id}
            dateFormat='dd/MM/yyyy'
            placeholderText={placeholderText}
            title={placeholderText}
            autoComplete='off'
            selected={field.value ?? ''}
            onChange={(date) => field.onChange(date ?? '')}
            onKeyDown={(event) => event.preventDefault()}
          />
        )}
      />
    </label>
  )
}

export default DateField
