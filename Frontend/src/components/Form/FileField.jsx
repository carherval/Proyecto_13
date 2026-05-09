import strings from '../../utils/strings'

// Componente que devuelve un campo para seleccionar la imagen del coche
const FileField = ({ id, label, fileName, register }) => (
  <label
    className='file'
    style={{
      padding: '8px 12px',
      background: '#333',
      color: '#fff',
      cursor: 'pointer',
      width: 'fit-content'
    }}
  >
    {label}:
    <input type={strings.INPUT_FIELD_TYPES.file} {...register(id)} />
    <span>{fileName}</span>
  </label>
)

export default FileField
