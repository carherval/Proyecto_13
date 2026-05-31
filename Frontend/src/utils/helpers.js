import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import strings from './strings'

// Minutos
const EXPIRATION_TIME = 15

const MIN_YEAR = 2000
const MIN_PRICE = 1

// Milisegundos
const TIMEOUT = 100

const getUser = () => JSON.parse(localStorage.getItem(strings.ENTITIES.user))

const setUser = (user) =>
  localStorage.setItem(strings.ENTITIES.user, JSON.stringify(user))

const removeUser = () => localStorage.removeItem(strings.ENTITIES.user)

const getUserToken = () => getUser()?.token

const getUserId = () => getUser()?._id

const getUserRole = () => getUser()?.role

const isExpiredToken = () =>
  getUser() != null &&
  Date.now() - getUser().tokenExpiredDate > EXPIRATION_TIME * 60 * 1000

const isExpiredTokenMsg = (res) =>
  res.status === 403 &&
  (res.resData.msg.includes('jwt') || res.resData.msg.includes('invalid'))

const isAdminUser = (user = getUser()) =>
  Object.values(strings.ADMIN_ROLES).includes(user?.role)

const isSuperadminUser = (user = getUser()) =>
  user?.role === strings.ROLES.superadmin

const isMyself = (id) => getUserId() === id

// Devuelve los datos de un formulario en formato "FormData"
const getFormData = (body) => {
  const formData = new FormData()

  Object.keys(body).forEach((key) =>
    // Campo del formulario de selección de archivo
    key === strings.CAR_FIELDS.img.id
      ? body[key]?.[0] != null && formData.append(key, body[key][0])
      : // Campo del formulario de selección de fecha mediante un calendario
        key === strings.CAR_FIELDS.purchaseDate.id &&
          body[key].toString().trim() !== ''
        ? formData.append(key, getFormattedDate(body[key]))
        : formData.append(key, body[key])
  )

  return formData
}

// "reverseCarLicensePlate" hace que la matrícula sea "BCD1234" en vez de "1234BCD"
const getCarDescr = (
  car,
  { showCarLicensePlate = true, reverseCarLicensePlate = false } = {}
) =>
  `${car.make} ${car.model}${showCarLicensePlate ? ' (' + (reverseCarLicensePlate ? car.licensePlate.slice(4) + car.licensePlate.slice(0, 4) : car.licensePlate) + ')' : ''}`

const getCustomerFullName = (customer, naturalFormat = false) =>
  naturalFormat
    ? `${customer.name} ${customer.surnames}`
    : `${customer.surnames}, ${customer.name}`

const getCarDescrWithCustomerFullName = (
  car,
  customer,
  { customerNaturalFormat = false, reverseData = false } = {}
) =>
  reverseData
    ? `${getCustomerFullName(customer, customerNaturalFormat)} - ${getCarDescr(car)}`
    : `${getCarDescr(car)} - ${getCustomerFullName(customer, customerNaturalFormat)}`

const getUserFullName = (
  user,
  { showUserName = true, naturalFormat = false } = {}
) =>
  naturalFormat
    ? `${user.name} ${user.surnames}${showUserName ? ' (' + user.username + ')' : ''}`
    : `${user.surnames}, ${user.name}${showUserName ? ' (' + user.username + ')' : ''}`

const getFormattedDate = (date, format = 'DD/MM/YYYY') =>
  moment(date).format(format)

// Formatea un número usando el "punto" para los "miles"
const getFormattedNumber = (number) => number.toLocaleString('es-ES')

// Filtra los coches en función de los valores del filtro
// "getCar" obtiene el coche dependiendo de si el filtro es de coches directamente, de reservas o de ventas
const getFilteredCars = (
  elems,
  filterValues,
  { getCar = (elem) => elem, isCarsSection = true } = {}
) => {
  let filteredElems = elems

  // Filtrado por texto libre (matrícula, marca, modelo y color del coche)
  if (filterValues.car.trim() !== '') {
    filteredElems = filteredElems.filter((elem) => {
      const car = getCar(elem)

      return (
        includesIgnoreCase(filterValues.car, car.licensePlate) ||
        includesIgnoreCase(filterValues.car, car.make) ||
        includesIgnoreCase(filterValues.car, car.model) ||
        includesIgnoreCase(filterValues.car, car.color)
      )
    })
  }

  // Filtrado por la condición del coche
  if (
    filterValues.condition !==
    strings.CAR_CONDITION_FILTER_OPTIONS.allConditions.value
  ) {
    filteredElems = filteredElems.filter((elem) => {
      const car = getCar(elem)

      return car.condition === filterValues.condition
    })
  }

  // Filtrado por el estado del coche (sólo para la sección de coches)
  if (
    isCarsSection &&
    filterValues.status !== strings.CAR_STATUS_FILTER_OPTIONS.allStatuses.value
  ) {
    filteredElems = filteredElems.filter((elem) => {
      const car = getCar(elem)

      return car.status === filterValues.status
    })
  }

  return filteredElems
}

// Filtra los clientes en función de los valores del filtro
// "getCustomer" obtiene el cliente dependiendo de si el filtro es de clientes directamente, de reservas o de ventas
const getFilteredCustomers = (
  elems,
  filterValues,
  getCustomer = (elem) => elem
) => {
  let filteredElems = elems

  // Filtrado por texto libre (apellidos, nombre y correo electrónico del cliente)
  if (filterValues.customer.trim() !== '') {
    filteredElems = filteredElems.filter((elem) => {
      const customer = getCustomer(elem)

      return (
        includesIgnoreCase(filterValues.customer, customer.surnames) ||
        includesIgnoreCase(filterValues.customer, customer.name) ||
        includesIgnoreCase(filterValues.customer, customer.email)
      )
    })
  }

  return filteredElems
}

// Filtra los usuarios en función de los valores del filtro
const getFilteredUsers = (users, filterValues) => {
  let filteredUsers = users

  // Filtrado por texto libre (apellidos, nombre, nombre de usuario y correo electrónico del usuario)
  if (filterValues.user.trim() !== '') {
    filteredUsers = filteredUsers.filter(
      (user) =>
        includesIgnoreCase(filterValues.user, user.surnames) ||
        includesIgnoreCase(filterValues.user, user.name) ||
        includesIgnoreCase(filterValues.user, user.username) ||
        includesIgnoreCase(filterValues.user, user.email)
    )
  }

  // Filtrado por el rol del usuario
  if (filterValues.role !== strings.USER_ROLE_FILTER_OPTIONS.allRoles.value) {
    filteredUsers = filteredUsers.filter(
      (user) => user.role === filterValues.role
    )
  }

  return filteredUsers
}

const sortEntities = (entity1, entity2, getText) =>
  getText(entity1).localeCompare(getText(entity2), 'en', {
    sensitivity: 'base'
  })

// Devuelve "true" si "value" está contenido en "filterValue", ignorando mayúsculas y minúsculas
const includesIgnoreCase = (filterValue, value) =>
  new RegExp(filterValue?.trim(), 'i').test(value)

// Recarga la página
const selfNavigate = (navigate) => setTimeout(() => navigate(0), TIMEOUT)

// Realiza una llamada "fetch" y, si el resultado es correcto, navega a "path" después de cerrar el mensaje
const handleAction = async (
  action,
  showAlertDialog,
  navigate,
  path,
  ...params
) => {
  const res = await action(...params)

  if (res.ok) {
    showAlertDialog(res.resData.msg, () => navigate(path))
  }
}

// Comprueba si una imagen se carga correctamente
const isImageLoaded = (src) =>
  new Promise((resolve) => {
    const img = new Image()

    img.src = src

    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })

const helpers = {
  EXPIRATION_TIME,
  MIN_YEAR,
  MIN_PRICE,
  TIMEOUT,
  getUser,
  setUser,
  removeUser,
  getUserToken,
  getUserId,
  getUserRole,
  isExpiredToken,
  isExpiredTokenMsg,
  isAdminUser,
  isSuperadminUser,
  isMyself,
  getFormData,
  getCarDescr,
  getCustomerFullName,
  getCarDescrWithCustomerFullName,
  getUserFullName,
  getFormattedDate,
  getFormattedNumber,
  getFilteredCars,
  getFilteredCustomers,
  getFilteredUsers,
  sortEntities,
  includesIgnoreCase,
  selfNavigate,
  handleAction,
  isImageLoaded
}

export default helpers
