import './Form.scss'

import { getRequiredStar } from './RequiredNote'

// Componente que devuelve un campo de selección única
const SelectField = ({ id, label, options, register }) => (
  <label>
    {label} {getRequiredStar()}
    <select {...register(id)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
)

export default SelectField
