// Componente que devuelve un campo de selección única
const SelectField = ({ id, label, options, register }) => (
  <label>
    {label}
    <span className='required'>*</span>:
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
