import React from 'react'
import RadioGroupField from '../Form/RadioGroupField'
import TextField from '../Form/TextField'
import useFilter from '../../hooks/useFilter'
import strings from '../../utils/strings'

const DEFAULT_USER_FILTER_VALUES = {
  user: '',
  role: strings.USER_ROLE_FILTER_OPTIONS.allRoles.value
}

// Componente que muestra la búsqueda filtrada de usuarios
const UserFilter = React.memo(({ getFilteredUsers }) => {
  const { register } = useFilter(DEFAULT_USER_FILTER_VALUES, getFilteredUsers)

  return (
    <section className='search'>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <TextField
            id={strings.ENTITIES.user}
            placeholder={`${strings.CUSTOMER_USER_FIELDS.surnames.label}, ${strings.CUSTOMER_USER_FIELDS.name.label}, ${strings.USER_FIELDS.username.label}, ${strings.CUSTOMER_USER_FIELDS.email.label} del ${strings.OTHER_FILTER_OPTIONS.user.value.toLowerCase()}`}
            register={register}
            isRequired={false}
          />
        </div>

        <div>
          <RadioGroupField
            id={strings.USER_FIELDS.role.id}
            label={strings.USER_FIELDS.role.label}
            options={strings.USER_ROLE_FILTER_OPTIONS}
            register={register}
          />
        </div>
      </form>
    </section>
  )
})

export default UserFilter
