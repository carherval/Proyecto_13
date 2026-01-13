// "Reducer" para gestionar el estado de la opción seleccionada de los campos del filtro
const filterValuesReducer = (state, action) =>
  // Sólo se cambia el estado de la opción seleccionada que cambia en el filtro
  ({
    filterValues: {
      ...state.filterValues,
      [action.payload.filterFieldId]: action.payload.filterFieldValue
    }
  })

export default filterValuesReducer
