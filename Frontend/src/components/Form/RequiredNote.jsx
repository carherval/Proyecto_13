import './Form.scss'

import strings from '../../utils/strings'

// Componente que devuelve una indicación para los campos obligatorios

export const getRequiredStar = () => <span className='required'>*</span>

const RequiredNote = () => {
  return (
    <div className='required-note'>
      {getRequiredStar()} {strings.MANDATORY_FIELDS_MSG}
    </div>
  )
}

export default RequiredNote
