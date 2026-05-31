import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../components/Auth/AuthProvider'
import RequiredNote from '../../components/Form/RequiredNote'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import UserForm from '../../components/User/UserForm'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import userFetch from '../../utils/fetch/user'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

const DEFAULT_UPDATE_USER_FORM_VALUES = {
  role: strings.ROLES.seller
}

// Componente que permite actualizar un usuario
const UpdateUser = () => {
  const { user, login } = useContext(AuthContext)
  // Identificador del usuario
  const id = useLocation().state?.id

  if (id == null) {
    return <Navigate to={`/${MENU_OPTIONS.users.id}`} replace />
  }

  // Un usuario que no sea "admin" sólo puede actualizar su propio usuario
  if (!helpers.isAdminUser(user) && !helpers.isMyself(id)) {
    return <Navigate to={`/${MENU_OPTIONS.cars.id}`} replace />
  }

  const action = useLocation().state?.action
  const { register, reset, handleSubmit } = useForm({
    defaultValues: DEFAULT_UPDATE_USER_FORM_VALUES,
    shouldUnregister: true
  })
  const { fetchData: getUserById, data } = useFetchWithDialog(
    userFetch.getUserById
  )
  const { fetchData: updateUserById } = useFetchWithDialog(
    userFetch.updateUserById
  )

  const submit = async (body) => {
    const res = await updateUserById(id, body)

    // Si se actualiza el propio usuario se actualiza también en el contexto de la aplicación
    if (res.ok && helpers.isMyself(id)) {
      login({
        ...user,
        name: res.resData.data.name,
        role: res.resData.data.role
      })
    }
  }

  useEffect(() => {
    getUserById(id)
  }, [id])

  // Una vez obtenido el usuario, se carga el formulario con los datos del mismo
  useEffect(() => {
    if (data != null) {
      reset({ ...DEFAULT_UPDATE_USER_FORM_VALUES, ...data })
    }
  }, [data, reset])

  return (
    <>
      <h2>{strings.USER_ACTIONS.update.label}</h2>

      {data != null && (
        <section className='form'>
          <RequiredNote />
          <form onSubmit={handleSubmit(submit)}>
            <UserForm register={register} action={action} />
          </form>
        </section>
      )}
    </>
  )
}

export default UpdateUser
