import { useEffect, useReducer } from 'react'
import fetchReducer, { FETCH_ACTION_TYPES } from '../reducers/fetchReducer'

const FETCH_INITIAL_STATE = {
  data: [],
  filteredData: [],
  isLoading: true,
  isImageLoaded: false,
  isError: false
}

// "Custom hook" para las llamadas "fetch"
const useFetch = (fetchUrl, isCharacterFetch = false) => {
  const [fetchState, dispatchFetch] = useReducer(
    fetchReducer,
    FETCH_INITIAL_STATE
  )

  const stateSetters = {
    setFilteredData: (filteredData) =>
      dispatchFetch({
        type: FETCH_ACTION_TYPES.setFilteredData,
        payload: { filteredData }
      })
  }

  const fetchData = async () => {
    try {
      dispatchFetch({ type: FETCH_ACTION_TYPES.fetchInit })

      const dataJson = await (await fetch(fetchUrl)).json()

      if (!isCharacterFetch) {
        dispatchFetch({
          type: FETCH_ACTION_TYPES.sagaCharactersFetchOk,
          payload: { dataJson }
        })
      } else {
        if (dataJson.id == null) {
          dispatchFetch({ type: FETCH_ACTION_TYPES.characterNotFound })
        } else {
          const apiImg = new Image()

          apiImg.src = dataJson.image
          apiImg.onload = () =>
            dispatchFetch({
              type: FETCH_ACTION_TYPES.characterFetchOk,
              payload: { dataJson: [dataJson] }
            })
          // Si la carga de la imagen da error, se carga una imagen genérica
          apiImg.onerror = () => {
            const localImg = new Image()

            localImg.src = '/assets/images/silueta.png'
            localImg.onload = () => {
              dataJson.image = localImg.src
              dispatchFetch({
                type: FETCH_ACTION_TYPES.characterFetchOk,
                payload: { dataJson: [dataJson] }
              })
            }
          }
        }
      }
    } catch (error) {
      dispatchFetch({ type: FETCH_ACTION_TYPES.fetchError })
    }
  }

  // Actualización de la llamada "fetch" al cambiar la URL
  useEffect(() => {
    fetchData()
  }, [fetchUrl])

  return { ...fetchState, ...stateSetters }
}

export default useFetch
