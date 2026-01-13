export const FETCH_ACTION_TYPES = {
  fetchInit: 'FETCH_INIT',
  sagaCharactersFetchOk: 'SAGA_CHARACTERS_FETCH_OK',
  characterFetchOk: 'CHARACTER_FETCH_OK',
  characterNotFound: 'CHARACTER_NOT_FOUND',
  fetchError: 'FETCH_ERROR',
  setFilteredData: 'SET_FILTERED_DATA'
}

/* "Reducer" para gestionar los estados de las llamadas "fetch"
data: estado para gestionar los datos de la llamada "fetch" (listado de personajes de una saga o personaje)
filteredData: estado para gestionar el filtrado de los datos de la llamada "fetch" (sólo para el listado de personajes de una saga)
isLoading: estado para gestionar la carga de los datos de la llamada "fetch" (listado de personajes de una saga o personaje)
isImageLoaded: estado para gestionar la carga de la imagen de los datos de la llamada "fetch" (sólo para el personaje)
isError: estado para gestionar errores */
const fetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ACTION_TYPES.fetchInit:
      return {
        ...state,
        isLoading: true,
        isImageLoaded: false,
        isError: false
      }

    case FETCH_ACTION_TYPES.sagaCharactersFetchOk:
      return {
        ...state,
        data: action.payload.dataJson,
        filteredData: action.payload.dataJson,
        isLoading: false
      }

    case FETCH_ACTION_TYPES.characterFetchOk:
      return {
        ...state,
        data: action.payload.dataJson,
        isLoading: false,
        isImageLoaded: true
      }

    // Si no se encuentra el personaje, se anula el "loader" para poder mostrar el mensaje de error
    case FETCH_ACTION_TYPES.characterNotFound:
      return { ...state, isLoading: false, isImageLoaded: true }

    // Se anula el "loader" para poder mostrar el mensaje de error
    case FETCH_ACTION_TYPES.fetchError:
      return {
        ...state,
        isLoading: false,
        isImageLoaded: true,
        isError: true
      }

    // "Setters" de estados

    case FETCH_ACTION_TYPES.setFilteredData:
      return { ...state, filteredData: action.payload.filteredData }

    default:
      return state
  }
}

export default fetchReducer
