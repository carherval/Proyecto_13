import { Navigate, useLocation } from 'react-router-dom'

// Componente que redirige al nivel padre de la ruta actual si ésta no existe
const NotFoundRedirect = () => {
  // No se tienen en cuenta los elementos "falsy" (cadenas vacías)
  const pathElems = useLocation().pathname.split('/').filter(Boolean)

  // "replace" evita que el usuario navegue hacia atrás a la ruta inexistente
  return pathElems.length !== 0 ? (
    <Navigate to={`/${pathElems.slice(0, -1).join('/')}`} replace />
  ) : (
    <Navigate to='/' replace />
  )
}

export default NotFoundRedirect
