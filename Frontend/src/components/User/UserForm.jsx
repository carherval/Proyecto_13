import { useContext } from 'react'
import { AuthContext } from '../Auth/AuthProvider'
import ResetButton from '../Form/ResetButton'
import SelectField from '../Form/SelectField'
import TextField from '../Form/TextField'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que devuelve los campos para la creación o actualización de un usuario
const UserForm = ({ register, reset, action }) => {
  const { user } = useContext(AuthContext)

  return (
    <>
      {(action == null || action === strings.USER_ACTIONS.updateData.id) && (
        <>
          <div>
            <TextField
              id={strings.CUSTOMER_USER_FIELDS.surnames.id}
              label={strings.CUSTOMER_USER_FIELDS.surnames.label}
              register={register}
            />
          </div>

          <div>
            <TextField
              id={strings.CUSTOMER_USER_FIELDS.name.id}
              label={strings.CUSTOMER_USER_FIELDS.name.label}
              register={register}
            />
          </div>

          <div>
            <TextField
              id={strings.USER_FIELDS.username.id}
              label={strings.USER_FIELDS.username.label}
              register={register}
            />
          </div>
        </>
      )}

      {(action == null ||
        action === strings.USER_ACTIONS.updatePassword.id) && (
        <div>
          <TextField
            id={strings.USER_FIELDS.password.id}
            label={strings.USER_FIELDS.password.label}
            type={strings.INPUT_FIELD_TYPES.password}
            register={register}
          />
        </div>
      )}

      {(action == null || action === strings.USER_ACTIONS.updateData.id) && (
        <>
          <div>
            <TextField
              id={strings.CUSTOMER_USER_FIELDS.email.id}
              label={strings.CUSTOMER_USER_FIELDS.email.label}
              register={register}
            />
          </div>

          {/* El rol sólo puede ser actualizado por un usuario "admin" */}
          {helpers.isAdminUser(user) && (
            <div>
              <SelectField
                id={strings.USER_FIELDS.role.id}
                label={strings.USER_FIELDS.role.label}
                options={Object.keys(strings.ALLOWED_ROLES)}
                register={register}
              />
            </div>
          )}
        </>
      )}

      {reset != null && <ResetButton reset={reset} />}

      <button type={strings.INPUT_FIELD_TYPES.submit}>
        {action == null
          ? strings.USER_ACTIONS.create.label
          : action === strings.USER_ACTIONS.updateData.id
            ? strings.USER_ACTIONS.updateData.label
            : strings.USER_ACTIONS.updatePassword.label}
      </button>
    </>
  )
}

export default UserForm
