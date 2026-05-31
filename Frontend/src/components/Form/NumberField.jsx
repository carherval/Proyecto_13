import './Form.scss'

import { getRequiredStar } from './RequiredNote'

// Componente que devuelve un campo de texto que sólo admite números y que elimina los ceros innecesarios a la izquierda
const NumberField = ({
  id,
  label,
  placeholder,
  maxLength,
  register,
  isRequired = true
}) => {
  const getInput = () => (
    <input
      type='text'
      placeholder={
        placeholder != null
          ? `${placeholder}${isRequired && label == null ? ' *' : ''}`
          : undefined
      }
      title={placeholder ?? undefined}
      maxLength={maxLength ?? undefined}
      {...register(id, {
        onChange: (event) =>
          (event.target.value = event.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^0+(?!$)/, ''))
      })}
    />
  )

  return label != null ? (
    <label>
      {label} {isRequired && getRequiredStar()}
      {getInput()}
    </label>
  ) : (
    getInput()
  )
}

export default NumberField
