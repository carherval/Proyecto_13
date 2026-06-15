const PAGE_TITLE = 'Concesionario thePower'
const AUTHOR_FULLNAME = 'Carlos Hernández'

const MANDATORY_FIELDS_MSG = 'Campos obligatorios'
const CARS_NOT_FOUND_MSG = 'No se han encontrado coches'
const CUSTOMERS_NOT_FOUND_MSG = 'No se han encontrado clientes'
const AVAILABLE_CARS_CUSTOMERS_NOT_FOUND_MSG =
  'No se han encontrado coches o clientes disponibles'
const RESERVATIONS_NOT_FOUND_MSG = 'No se han encontrado reservas'
const SALES_NOT_FOUND_MSG = 'No se han encontrado ventas'
const USERS_NOT_FOUND_MSG = 'No se han encontrado usuarios'
const ACTION_CONFIRM_MSG = '¿Deseas realizar la acción?'
const LOGOUT_CONFIRM_MSG = '¿Deseas cerrar la sesión?'

const FILTER_ALL_OPTION = 'Todos'

const ENTITIES = {
  car: 'car',
  customer: 'customer',
  reservation: 'reservation',
  sale: 'sale',
  user: 'user'
}

const CAR_MAKE_MODELS = {
  Acura: ['MDX', 'RDX'],
  Audi: ['A4', 'Q5', 'Q7'],
  BMW: ['3 Series', '5 Series', 'X5'],
  Cadillac: ['CT5', 'Escalade', 'XT5'],
  Chevrolet: ['Equinox', 'Malibu', 'Suburban', 'Traverse'],
  Citroën: ['Berlingo', 'C3', 'C4', 'C5'],
  Dodge: ['Challenger', 'Charger'],
  Fiat: ['500', 'Stilo', 'Tipo'],
  Ford: ['Escape', 'Explorer', 'F-150', 'Focus', 'Mustang', 'Shelby GT500'],
  GMC: ['Acadia', 'Terrain', 'Yukon'],
  Honda: ['Accord', 'Civic', 'CR-V', 'HR-V'],
  Hyundai: ['Elantra', 'Santa Fe', 'Tucson'],
  Jeep: ['Cherokee', 'Grand Cherokee'],
  Kia: ['Ceed', 'Rio', 'Sorento'],
  Lincoln: ['MKC', 'MKZ', 'Town Car'],
  Mazda: ['CX-30', 'CX-5', 'Mazda3'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class'],
  MG: ['HS', 'MG3', 'MG4', 'ZS'],
  Nissan: ['Qashqai', 'Rogue', 'X-Trail'],
  Peugeot: ['208', '3008', '308', '5008'],
  Porsche: ['911', 'Carrera', 'Cayenne'],
  Ram: ['1500', '2500'],
  Renault: ['Captur', 'Clio', 'Megane'],
  Seat: ['Arona', 'Ateca', 'Ibiza', 'León'],
  Tesla: ['Model 3', 'Model S', 'Model Y'],
  Toyota: ['4Runner', 'Highlander', 'Prius', 'RAV4', 'Sienna'],
  Volkswagen: ['Golf', 'Passat', 'Tiguan'],
  Volvo: ['S40', 'S60', 'XC60', 'XC90']
}

const COLORS = [
  'Amarillo',
  'Azul',
  'Azul metálico',
  'Azul oscuro',
  'Blanco',
  'Dorado',
  'Granate',
  'Gris',
  'Gris azulado',
  'Gris oscuro',
  'Marrón',
  'Marrón oscuro',
  'Morado',
  'Mostaza',
  'Naranja',
  'Negro',
  'Oliva',
  'Plateado',
  'Rojo',
  'Turquesa',
  'Verde',
  'Verde oscuro',
  'Violeta'
]

const CAR_CONDITIONS = {
  new: 'Nuevo',
  used: 'Usado'
}

const CAR_STATUSES = {
  available: 'Disponible',
  reserved: 'Reservado',
  sold: 'Vendido'
}

const ROLES = {
  seller: 'seller',
  admin: 'admin',
  superadmin: 'superadmin'
}
const { superadmin, ...ALLOWED_ROLES } = ROLES
const { seller, ...ADMIN_ROLES } = ROLES

const INPUT_FIELD_TYPES = {
  text: 'text',
  password: 'password',
  radio: 'radio',
  file: 'file',
  button: 'button',
  submit: 'submit'
}

const CAR_FIELDS = {
  licensePlate: { id: 'licensePlate', label: 'Matrícula' },
  make: { id: 'make', label: 'Marca' },
  model: { id: 'model', label: 'Modelo' },
  color: { id: 'color', label: 'Color' },
  img: { id: 'img', label: 'Imagen' },
  modelYear: { id: 'modelYear', label: 'Año de fabricación' },
  purchaseDate: { id: 'purchaseDate', label: 'Fecha de adquisición' },
  condition: { id: 'condition', label: 'Condición' },
  mileage: { id: 'mileage', label: 'Kilometraje', unit: 'km' },
  price: { id: 'price', label: 'Precio', unit: '€' },
  status: { id: 'status', label: 'Estado' }
}

const CAR_ACTIONS = {
  create: { id: 'create', label: 'Crear coche' },
  info: { id: 'info', label: 'Información del coche' },
  update: { id: 'update', label: 'Actualizar coche' },
  delete: { id: 'delete', label: 'Eliminar coche' }
}

const CUSTOMER_USER_FIELDS = {
  surnames: { id: 'surnames', label: 'Apellidos' },
  name: { id: 'name', label: 'Nombre' },
  email: { id: 'email', label: 'Correo electrónico' }
}

const CUSTOMER_USER_ACTIONS = {
  email: { id: 'email', label: 'Enviar correo electrónico a' }
}

const CUSTOMER_ACTIONS = {
  create: { id: 'create', label: 'Crear cliente' },
  info: { id: 'info', label: 'Información del cliente' },
  update: { id: 'update', label: 'Actualizar cliente' },
  delete: { id: 'delete', label: 'Eliminar cliente' }
}

const RESERVATION_SALE_FIELDS = {
  car: { id: ENTITIES.car, label: 'Coche' },
  customer: { id: ENTITIES.customer, label: 'Cliente' }
}

const RESERVATION_FIELDS = {
  reservationDate: { id: 'reservationDate', label: 'Fecha de la reserva' }
}

const RESERVATION_ACTIONS = {
  create: { id: 'create', label: 'Reservar coche' },
  info: { id: 'info', label: 'Información de la reserva' },
  delete: { id: 'delete', label: 'Anular reserva' }
}

const SALE_FIELDS = {
  saleDate: { id: 'saleDate', label: 'Fecha de la venta' }
}

const SALE_ACTIONS = {
  create: { id: 'create', label: 'Vender coche' },
  info: { id: 'info', label: 'Información de la venta' },
  delete: { id: 'delete', label: 'Devolver coche' }
}

const USER_FIELDS = {
  username: { id: 'username', label: 'Nombre de usuario' },
  password: { id: 'password', label: 'Contraseña' },
  role: { id: 'role', label: 'Rol' }
}

const USER_ACTIONS = {
  login: { id: 'login', label: 'Login' },
  create: { id: 'create', label: 'Crear usuario' },
  info: { id: 'info', label: 'Información del usuario' },
  profile: { id: 'profile', label: 'Perfil del usuario' },
  update: { id: 'update', label: 'Actualizar usuario' },
  updateData: { id: 'update-data', label: 'Actualizar datos' },
  updatePassword: { id: 'update-password', label: 'Actualizar contraseña' },
  delete: { id: 'delete', label: 'Eliminar usuario' }
}

const COMMON_ACTIONS = {
  reset: { id: 'reset', label: 'Limpiar formulario' }
}

const CAR_CONDITION_FILTER_OPTIONS = {
  allConditions: { id: 'allConditions', value: FILTER_ALL_OPTION },
  new: { id: 'new', value: CAR_CONDITIONS.new },
  used: { id: 'used', value: CAR_CONDITIONS.used }
}

const CAR_STATUS_FILTER_OPTIONS = {
  allStatuses: { id: 'allStatuses', value: FILTER_ALL_OPTION },
  available: { id: 'available', value: CAR_STATUSES.available },
  reserved: { id: 'reserved', value: CAR_STATUSES.reserved },
  sold: { id: 'sold', value: CAR_STATUSES.sold }
}

const RESERVATION_SALE_ORDER_OPTIONS = {
  car: { id: ENTITIES.car, value: RESERVATION_SALE_FIELDS.car.label },
  customer: {
    id: ENTITIES.customer,
    value: RESERVATION_SALE_FIELDS.customer.label
  }
}

const USER_ROLE_FILTER_OPTIONS = {
  allRoles: { id: 'allRoles', value: FILTER_ALL_OPTION },
  seller: { id: ROLES.seller, value: ROLES.seller },
  admin: { id: ROLES.admin, value: ROLES.admin },
  superadmin: { id: ROLES.superadmin, value: ROLES.superadmin }
}

const OTHER_FILTER_OPTIONS = {
  user: { id: ENTITIES.user, value: 'Usuario' }
}

const strings = {
  PAGE_TITLE,
  AUTHOR_FULLNAME,
  MANDATORY_FIELDS_MSG,
  CARS_NOT_FOUND_MSG,
  CUSTOMERS_NOT_FOUND_MSG,
  AVAILABLE_CARS_CUSTOMERS_NOT_FOUND_MSG,
  RESERVATIONS_NOT_FOUND_MSG,
  SALES_NOT_FOUND_MSG,
  USERS_NOT_FOUND_MSG,
  ACTION_CONFIRM_MSG,
  LOGOUT_CONFIRM_MSG,
  FILTER_ALL_OPTION,
  ENTITIES,
  CAR_MAKE_MODELS,
  COLORS,
  CAR_CONDITIONS,
  CAR_STATUSES,
  ROLES,
  ALLOWED_ROLES,
  ADMIN_ROLES,
  INPUT_FIELD_TYPES,
  CAR_FIELDS,
  CAR_ACTIONS,
  CUSTOMER_USER_FIELDS,
  CUSTOMER_USER_ACTIONS,
  CUSTOMER_ACTIONS,
  RESERVATION_SALE_FIELDS,
  RESERVATION_FIELDS,
  RESERVATION_ACTIONS,
  SALE_FIELDS,
  SALE_ACTIONS,
  USER_FIELDS,
  USER_ACTIONS,
  COMMON_ACTIONS,
  CAR_CONDITION_FILTER_OPTIONS,
  CAR_STATUS_FILTER_OPTIONS,
  RESERVATION_SALE_ORDER_OPTIONS,
  USER_ROLE_FILTER_OPTIONS,
  OTHER_FILTER_OPTIONS
}

export default strings
