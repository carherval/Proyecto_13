import { createContext, useEffect, useState } from 'react'
import helpers from '../../utils/helpers'

export const AuthContext = createContext()

// Componente que crea el contexto global de la aplicación que almacena el usuario que ha iniciado sesión en la misma
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (helpers.isExpiredToken()) {
      helpers.removeUser()
    }

    return helpers.getUser()
  })

  const login = (user) => setUser(user)

  const logout = () => {
    helpers.removeUser()
    setUser(null)
  }

  useEffect(() => {
    user != null && !helpers.isExpiredToken()
      ? helpers.setUser(user)
      : helpers.removeUser()
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
