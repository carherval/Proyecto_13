export const FETCH_ACTION_TYPES = {
  fetchInit: 'FETCH_INIT',
  fetchOk: 'FETCH_OK',
  fetchError: 'FETCH_ERROR'
}

/* "Reducer" para gestionar los estados de las llamadas "fetch"
data: estado para gestionar los datos devueltos por la llamada "fetch"
msg: estado para gestionar el mensaje devuelto por la llamada "fetch"
isLoading: estado para gestionar la carga de la llamada "fetch"
isError: estado para gestionar si la llamada "fetch" ha dado error */
const fetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_ACTION_TYPES.fetchInit:
      return {
        ...state,
        isLoading: true,
        isError: false
      }

    case FETCH_ACTION_TYPES.fetchOk:
      return {
        ...state,
        data: action.payload.resData.data,
        msg: action.payload.resData.msg,
        isLoading: false
      }

    // Se anula el "loader" para poder mostrar el mensaje de error
    case FETCH_ACTION_TYPES.fetchError:
      return {
        ...state,
        msg: action.payload.resData.msg,
        isLoading: false,
        isError: true
      }

    default:
      return state
  }
}

export default fetchReducer
