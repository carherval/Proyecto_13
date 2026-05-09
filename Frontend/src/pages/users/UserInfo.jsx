import { useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../components/Auth/AuthProvider'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import UserData from '../../components/User/UserData'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import userFetch from '../../utils/fetch/user'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra la información de un usuario
const UserInfo = () => {
  const { user } = useContext(AuthContext)
  // Identificador del usuario
  const id = useLocation().state?.id

  if (id == null) {
    return <Navigate to={`/${MENU_OPTIONS.users.id}`} replace />
  }

  // Un usuario que no sea "admin" sólo puede consultar su propio usuario
  if (!helpers.isAdminUser(user) && !helpers.isMyself(id)) {
    return <Navigate to={`/${MENU_OPTIONS.cars.id}`} replace />
  }

  const { fetchData, data } = useFetchWithDialog(userFetch.getUserById)

  useEffect(() => {
    fetchData(id)
  }, [id])

  return (
    <>
      <h2>{strings.USER_ACTIONS.info.label}</h2>

      {data != null && <UserData user={data} />}
    </>
  )
}

export default UserInfo
