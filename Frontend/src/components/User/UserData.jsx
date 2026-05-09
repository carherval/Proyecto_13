import { Link, useNavigate } from 'react-router-dom'
import { MENU_OPTIONS } from '../Menu/Menu'
import useDialog from '../../hooks/useDialog'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import userFetch from '../../utils/fetch/user'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que muestra los datos de un usuario
const UserData = ({ user }) => {
  const { fetchData } = useFetchWithDialog(userFetch.deleteUserById)
  const { showAlertDialog, showConfirmDialog } = useDialog()
  const navigate = useNavigate()

  const handleDeleteUserById = () =>
    helpers.handleAction(
      fetchData,
      showAlertDialog,
      navigate,
      `/${MENU_OPTIONS.users.id}`,
      user._id
    )

  return (
    <>
      {/* El usuario "superadmin" no se puede actualizar */}
      {!helpers.isSuperadminUser(user) && (
        <>
          <Link
            to={`/${MENU_OPTIONS.users.id}/${strings.USER_ACTIONS.update.id}`}
            state={{ id: user._id, action: strings.USER_ACTIONS.updateData.id }}
          >
            {strings.USER_ACTIONS.updateData.label}
          </Link>

          <Link
            to={`/${MENU_OPTIONS.users.id}/${strings.USER_ACTIONS.update.id}`}
            state={{
              id: user._id,
              action: strings.USER_ACTIONS.updatePassword.id
            }}
          >
            {strings.USER_ACTIONS.updatePassword.label}
          </Link>
        </>
      )}

      {/* El usuario "superadmin" no se puede eliminar y un usuario no se puede eliminar a sí mismo*/}
      {!helpers.isSuperadminUser(user) && !helpers.isMyself(user._id) && (
        <button
          type={strings.INPUT_FIELD_TYPES.button}
          onClick={() =>
            showConfirmDialog(strings.ACTION_CONFIRM_MSG, handleDeleteUserById)
          }
        >
          {strings.USER_ACTIONS.delete.label}
        </button>
      )}

      <div>
        {strings.CUSTOMER_USER_FIELDS.surnames.label}: {user.surnames}
      </div>

      <div>
        {strings.CUSTOMER_USER_FIELDS.name.label}: {user.name}
      </div>

      <div>
        {strings.USER_FIELDS.username.label}: {user.username}
      </div>

      <div>
        {strings.CUSTOMER_USER_FIELDS.email.label}: {user.email}
      </div>

      <div>
        {strings.USER_FIELDS.role.label}: {user.role}
      </div>
    </>
  )
}

export default UserData
