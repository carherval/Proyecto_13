import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MENU_OPTIONS } from '../../components/Menu/Menu'
import UserFilter from '../../components/User/UserFilter'
import UserList from '../../components/User/UserList'
import useFetchWithDialog from '../../hooks/useFetchWithDialog'
import userFetch from '../../utils/fetch/user'
import helpers from '../../utils/helpers'
import strings from '../../utils/strings'

// Componente que obtiene todos los usuarios y que permite realizar una búsqueda filtrada sobre los mismos
const Users = () => {
  const { fetchData, data } = useFetchWithDialog(userFetch.getAllUsers)
  const [filteredUsers, setFilteredUsers] = useState([])

  // Filtrado de usuarios
  const getFilteredUsers = useCallback(
    (filterValues) => {
      const filteredUsers = helpers.getFilteredUsers(data, filterValues)

      // Listado de los usuarios en orden alfabético (apellidos, nombre y nombre de usuario)
      filteredUsers.sort((user1, user2) =>
        helpers.sortEntities(user1, user2, helpers.getUserFullName)
      )

      setFilteredUsers(filteredUsers)
    },
    [data]
  )

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data != null) {
      setFilteredUsers(data)
    }
  }, [data])

  if (data == null) {
    return null
  }

  return (
    <>
      <h2>{MENU_OPTIONS.users.label}</h2>

      <section className='btn-box'>
        <div>
          <Link
            to={`/${MENU_OPTIONS.users.id}/${strings.USER_ACTIONS.create.id}`}
          >
            {strings.USER_ACTIONS.create.label}
          </Link>
        </div>
      </section>

      {data.length > 0 ? (
        <>
          <UserFilter getFilteredUsers={getFilteredUsers} />

          <section className='results'>
            {filteredUsers.length > 0 ? (
              <UserList users={filteredUsers} />
            ) : (
              <div>
                <p>{strings.USERS_NOT_FOUND_MSG}</p>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className='results'>
          <div>
            <p>{strings.USERS_NOT_FOUND_MSG}</p>
          </div>
        </section>
      )}
    </>
  )
}

export default Users
