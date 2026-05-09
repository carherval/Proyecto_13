import helpers from '../helpers'

const API_URL = import.meta.env.VITE_API_URL

const LINE_BREAK = '<br /><br />'

const TRY_AGAIN_MSG = 'Inténtalo de nuevo más tarde'
const SERVER_DOWN_MSG = `El servidor está caído${LINE_BREAK}${TRY_AGAIN_MSG}`
const SERVER_NOT_RESPONSE_MSG = `El servidor no responde${LINE_BREAK}${TRY_AGAIN_MSG}`
const UNEXPECTED_ERROR_MSG = `Error inesperado${LINE_BREAK}${TRY_AGAIN_MSG}`
const SESSION_EXPIRED_MSG = 'La sesión ha expirado'
const BAD_REQUEST_MSG = 'Solicitud incorrecta'

const FETCH_METHODS = {
  get: 'GET',
  delete: 'DELETE',
  post: 'POST',
  put: 'PUT'
}

// Estructura para mapear los mensajes del "backend" en mensajes más amigables en el "frontend"
const MESSAGES = [
  { original: 'fetch', new: SERVER_DOWN_MSG },
  { original: 'endpoint', new: SERVER_NOT_RESPONSE_MSG },
  { original: 'buffering', new: SERVER_NOT_RESPONSE_MSG },
  { original: 'timed out', new: SERVER_NOT_RESPONSE_MSG },
  { original: 'ETIMEDOUT', new: SERVER_NOT_RESPONSE_MSG },
  { original: 'getaddrinfo ENOTFOUND', new: SERVER_NOT_RESPONSE_MSG },
  { original: 'url', new: BAD_REQUEST_MSG }
]

// Función genérica para ejecutar un "endpoint" del "backend"
const getData = async (url, token, method, body) => {
  const headers = {}
  const isFormData = body instanceof FormData

  // Si el formulario está en formato "FormData" el "Content-Type" se establece automáticamente
  if (body != null && !isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  if (token != null) {
    headers.Authorization = `Bearer ${token}`
  }

  const options =
    Object.keys(headers).length !== 0 ? { headers, method } : { method }

  if (body != null) {
    options.body = isFormData ? body : JSON.stringify(body)
  }

  return await fetch(url, options)
}

const getMessage = (res) => {
  if (helpers.isExpiredTokenMsg(res)) {
    return SESSION_EXPIRED_MSG
  }

  for (const message of MESSAGES) {
    if (res.resData.msg.toLowerCase().includes(message.original)) {
      return message.new
    }
  }

  if (res.status === 500) {
    return UNEXPECTED_ERROR_MSG
  }

  return res.resData.msg
}

const fetchUtils = {
  API_URL,
  LINE_BREAK,
  TRY_AGAIN_MSG,
  SERVER_DOWN_MSG,
  SERVER_NOT_RESPONSE_MSG,
  UNEXPECTED_ERROR_MSG,
  SESSION_EXPIRED_MSG,
  BAD_REQUEST_MSG,
  FETCH_METHODS,
  MESSAGES,
  getData,
  getMessage
}

export default fetchUtils
