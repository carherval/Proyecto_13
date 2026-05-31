import { useReducer } from 'react'
import fetchReducer, { FETCH_ACTION_TYPES } from '../reducers/fetchReducer'
import helpers from '../utils/helpers'

const FETCH_INITIAL_STATE = {
  data: null,
  msg: null,
  isLoading: false,
  isError: false
}

// "Custom hook" para las llamadas "fetch"
const useFetch = (fetchCall) => {
  const [fetchState, dispatchFetch] = useReducer(
    fetchReducer,
    FETCH_INITIAL_STATE
  )

  const fetchData = async (...fetchCallParams) => {
    dispatchFetch({ type: FETCH_ACTION_TYPES.fetchInit })

    try {
      const res = await fetchCall(...fetchCallParams)
      const resData = await res.json()

      // Se carga la imagen del coche, si existe
      if (
        resData?.data?.img != null &&
        !(await helpers.isImageLoaded(resData.data.img))
      ) {
        resData.data.img = ''
      }

      res.ok
        ? dispatchFetch({
            type: FETCH_ACTION_TYPES.fetchOk,
            payload: { resData }
          })
        : dispatchFetch({
            type: FETCH_ACTION_TYPES.fetchError,
            payload: { resData }
          })

      return { ok: res.ok, status: res.status, resData }
    } catch (error) {
      const resData = { msg: error.message }

      dispatchFetch({
        type: FETCH_ACTION_TYPES.fetchError,
        payload: { resData }
      })

      return { ok: false, status: 500, resData }
    }
  }

  return { fetchData, ...fetchState }
}

export default useFetch
