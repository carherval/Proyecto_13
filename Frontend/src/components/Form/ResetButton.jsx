import strings from '../../utils/strings'

// Componente que devuelve un botón que limpia los datos de un formulario
const ResetButton = ({ reset }) => (
  <button type={strings.INPUT_FIELD_TYPES.button} onClick={() => reset()}>
    {strings.COMMON_ACTIONS.reset.label}
  </button>
)

export default ResetButton
