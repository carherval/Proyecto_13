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
      {/* El usuario "superadmin" no se puede actualizar ni eliminar */}
      {!helpers.isSuperadminUser(user) && (
        <section className='btn-box'>
          <div>
            <Link
              to={`/${MENU_OPTIONS.users.id}/${strings.USER_ACTIONS.update.id}`}
              state={{
                id: user._id,
                action: strings.USER_ACTIONS.updateData.id
              }}
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

            {/* Un usuario no se puede eliminar a sí mismo*/}
            {!helpers.isMyself(user._id) && (
              <button
                type={strings.INPUT_FIELD_TYPES.button}
                onClick={() =>
                  showConfirmDialog(
                    strings.ACTION_CONFIRM_MSG,
                    handleDeleteUserById
                  )
                }
              >
                {strings.USER_ACTIONS.delete.label}
              </button>
            )}
          </div>
        </section>
      )}

      <section className='info'>
        <article>
          <h3>
            {helpers.getUserFullName(user, {
              showUserName: false,
              naturalFormat: true
            })}
          </h3>

          <div className='data'>
            <div>
              <div>{strings.USER_FIELDS.username.label}</div>
              <div>{user.username}</div>
            </div>

            <div>
              <div>{strings.CUSTOMER_USER_FIELDS.email.label}</div>
              <div>
                <Link
                  to={`mailto:${user.email}`}
                  title={`${strings.CUSTOMER_USER_ACTIONS.email.label} ${helpers.getUserFullName(user, { showUserName: false, naturalFormat: true })}`}
                >
                  {user.email}
                </Link>
              </div>
            </div>

            <div>
              <div>{strings.USER_FIELDS.role.label}</div>
              <div>{user.role}</div>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default UserData
