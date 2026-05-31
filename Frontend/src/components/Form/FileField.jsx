import strings from '../../utils/strings'

// Componente que devuelve un campo de selección de archivo
const FileField = ({ id, fileName, register }) => (
  <label className='file'>
    <input type={strings.INPUT_FIELD_TYPES.file} {...register(id)} />
    <span>{fileName}</span>
  </label>
)

export default FileField
