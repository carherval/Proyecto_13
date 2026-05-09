import { useContext } from 'react'
import { AuthContext } from '../components/Auth/AuthProvider'
import useDialog from './useDialog'
import useFetch from './useFetch'
import fetchUtils from '../utils/fetch/fetch'
import helpers from '../utils/helpers'

// "Custom hook" para integrar los diálogos emergentes en las llamadas "fetch"
const useFetchWithDialog = (fetchCall) => {
  const { logout } = useContext(AuthContext)
  const {
    fetchData: executeFetchData,
    data,
    msg,
    isLoading,
    isError
  } = useFetch(fetchCall)
  const { showLoadingDialog, showAlertDialog, closeDialog } = useDialog()

  const fetchData = async (...fetchCallParams) => {
    showLoadingDialog()

    const res = await executeFetchData(...fetchCallParams)

    closeDialog()

    if (res.resData.msg != null) {
      showAlertDialog(
        fetchUtils.getMessage(res),
        // Se comprueba si la sesión ha expirado en la llamada "fetch"
        helpers.isExpiredTokenMsg(res) ? logout : () => {}
      )
    }

    return res
  }

  return { fetchData, data, msg, isLoading, isError }
}

export default useFetchWithDialog
