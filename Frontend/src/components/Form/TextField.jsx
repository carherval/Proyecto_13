import strings from '../../utils/strings'

// Componente que devuelve un campo de texto y de contraseña
const TextField = ({
  id,
  label,
  type,
  placeholder,
  maxLength,
  register,
  isRequired = true
}) => {
  const getInput = () => (
    <input
      type={type ?? strings.INPUT_FIELD_TYPES.text}
      placeholder={
        placeholder != null
          ? `${placeholder}${isRequired && label == null ? ' *' : ''}`
          : undefined
      }
      maxLength={maxLength ?? undefined}
      autoComplete={
        type === strings.INPUT_FIELD_TYPES.password ? 'off' : undefined
      }
      {...register(id)}
    />
  )

  return label != null ? (
    <label>
      {label}
      {isRequired && <span className='required'>*</span>}:{getInput()}
    </label>
  ) : (
    getInput()
  )
}

export default TextField
