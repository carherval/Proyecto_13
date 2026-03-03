const { helpers } = require('./helpers')

const MIN_YEAR = 2000
const MIN_PRICE = 1
const PASSWORD_MIN_LENGTH = 8

const ENDPOINT_ACCESS_ERROR_MSG =
  'Se ha producido un error al acceder al "endpoint"'

/* Mensajes para validaciones en modelos */

const REQUIRED_MSG = 'El campo es obligatorio y no puede estar vacío'
const UNIQUE_MSG = 'El campo no puede estar repetido'
const NOT_ALLOWED_VALUE_MSG = 'Valor no permitido'

const INVALID_LICENSE_PLATE_MSG =
  'Matrícula no válida (formato: 4 dígitos y 3 consonantes, excluyendo la Ñ)'
const INVALID_YEAR_MSG = 'Año no válido (formato: YYYY)'
const INVALID_MAX_YEAR_MSG = `El año no puede ser posterior al año actual`
const INVALID_DATE_MSG = 'Fecha no válida (formato: DD/MM/YYYY)'
const INVALID_MAX_DATE_MSG = `La fecha no puede ser posterior a la fecha actual`
const INVALID_MILEAGE_MSG =
  'Kilometraje no válido (formato: número entero mayor que 0)'
const INVALID_PRICE_MSG = `Precio no válido (formato: número entero mayor o igual que ${MIN_PRICE})`
const INVALID_PASSWORD_MSG = `Contraseña no válida (formato: letras y números con una longitud mínima de ${PASSWORD_MIN_LENGTH}`
const INVALID_EMAIL_MSG = 'Correo electrónico no válido'
const INVALID_USER_PASSWORD_MSG = 'Usuario o contraseña incorrectos'

/* Mensajes para validaciones en "endpoints" */

const INVALID_ID_MSG = 'Identificador no válido'
const NO_UPDATE_DATA = 'No se ha introducido ningún dato para actualizar'
const CANNOT_DELETE_NOT_AVAILABLE_CAR =
  'No se puede eliminar un coche que no está disponible'
const CANNOT_DELETE_CUSTOMER_WITH_CARS_MSG =
  'No se puede eliminar un cliente con coches reservados o vendidos'
const REQUIRED_USERNAME_MSG = 'Se debe introducir el usuario'
const REQUIRED_PASSWORD_MSG = 'Se debe introducir la contraseña'

/* Devuelve mensajes para validaciones en "endpoints" */

const getLoginMsg = (role = '') =>
  `Debes iniciar sesión${role !== '' ? ` como "${role}"` : ''}`

const getNotAllowedActionMsg = (reasonMsg) =>
  `No tienes permisos para realizar la acción solicitada: ${reasonMsg}`

const getDocNotFoundByIdMsg = (doc, id, isMale = true) =>
  `No se ha encontrado ${isMale ? 'ningún' : 'ninguna'} ${doc} con el identificador "${id}"`

const getCarNotFoundByIdMsg = (id) => getDocNotFoundByIdMsg('coche', id)

const getCustomerNotFoundByIdMsg = (id) => getDocNotFoundByIdMsg('cliente', id)

const getUserNotFoundByIdMsg = (id) => getDocNotFoundByIdMsg('usuario', id)

const getReservationNotFoundByIdMsg = (id) =>
  getDocNotFoundByIdMsg('reserva', id, false)

const getSaleNotFoundByIdMsg = (id) => getDocNotFoundByIdMsg('venta', id, false)

const getUserOnlyActionMsg = (user, action) =>
  `Si no eres un usuario "${user}" sólo puedes ${action} tu propio usuario`

const getCannotSelfUserActionMsg = (action) =>
  `Un usuario no se puede ${action} a sí mismo`

const getCannotUserActionMsg = (user, action) =>
  `El usuario "${user}" no se puede ${action}`

/* Devuelve mensajes para validaciones en modelos */

const getInvalidMinYearMsg = (year = MIN_YEAR) =>
  `El año no puede ser anterior a ${year}`

const getStatusCarMsg = (status) =>
  `El coche ya se encuentra ${status.toLowerCase()}`

/* Validadores */

const isValidLicensePlate = (licensePlate) =>
  /^\d{4}[BCDFGHJKLMNPQRSTVWXYZ]{3}$/.test(licensePlate)

const isMinYear = (year) => year >= MIN_YEAR

const isMaxYear = (year) => year <= helpers.getCurrentYear()

const isMaxDate = (date) => date <= helpers.getCurrentDate()

const isValidMileage = (mileage) => mileage > 0

const isValidPrice = (price) => price >= MIN_PRICE

const isValidPassword = (password) =>
  new RegExp(`^[a-zñA-ZÑ\\d]{${PASSWORD_MIN_LENGTH},}$`).test(password)

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validation = {
  MIN_YEAR,
  MIN_PRICE,
  PASSWORD_MIN_LENGTH,
  ENDPOINT_ACCESS_ERROR_MSG,
  REQUIRED_MSG,
  UNIQUE_MSG,
  NOT_ALLOWED_VALUE_MSG,
  INVALID_LICENSE_PLATE_MSG,
  INVALID_YEAR_MSG,
  INVALID_MAX_YEAR_MSG,
  INVALID_DATE_MSG,
  INVALID_MAX_DATE_MSG,
  INVALID_MILEAGE_MSG,
  INVALID_PRICE_MSG,
  INVALID_PASSWORD_MSG,
  INVALID_EMAIL_MSG,
  INVALID_USER_PASSWORD_MSG,
  INVALID_ID_MSG,
  NO_UPDATE_DATA,
  CANNOT_DELETE_NOT_AVAILABLE_CAR,
  CANNOT_DELETE_CUSTOMER_WITH_CARS_MSG,
  REQUIRED_USERNAME_MSG,
  REQUIRED_PASSWORD_MSG,
  getLoginMsg,
  getNotAllowedActionMsg,
  getDocNotFoundByIdMsg,
  getCarNotFoundByIdMsg,
  getCustomerNotFoundByIdMsg,
  getUserNotFoundByIdMsg,
  getReservationNotFoundByIdMsg,
  getSaleNotFoundByIdMsg,
  getUserOnlyActionMsg,
  getCannotSelfUserActionMsg,
  getCannotUserActionMsg,
  getInvalidMinYearMsg,
  getStatusCarMsg,
  isValidLicensePlate,
  isMinYear,
  isMaxYear,
  isMaxDate,
  isValidMileage,
  isValidPrice,
  isValidPassword,
  isValidEmail
}

module.exports = { validation }
