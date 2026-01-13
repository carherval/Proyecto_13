// "Reducer" para gestionar el estado de los desplegables
const toggleCollapsibleReducer = (state, action) =>
  // Sólo se cambia el estado del desplegable que se abre o se cierra
  ({
    isOpened: state.isOpened.map((isOpened, index) =>
      index === action.payload.index ? !isOpened : isOpened
    )
  })

export default toggleCollapsibleReducer
