const fs = require('fs')
const moment = require('moment')
const readline = require('readline')

const LINE_BREAK = '<br /><br />'
const CONSOLE_LINE_BREAK = '\n'

// Carga el contenido de un archivo CSV en un array de objetos
const loadCsvFile = async (csvFile) => {
  try {
    const csvFileContent = []
    const readLine = readline.createInterface({
      input: fs.createReadStream(csvFile, { encoding: 'utf8' }),
      // Maneja correctamente los saltos de línea
      crlfDelay: Infinity
    })

    let headers = []

    for await (const line of readLine) {
      // Se ignora la primera línea, nombre de los campos
      if (headers.length === 0) {
        headers = line.split(',')

        continue
      }

      const object = {}
      const values = line.split(',')

      for (const [index, header] of headers.entries()) {
        object[header.trim()] = values[index]?.trim()
      }

      csvFileContent.push(object)
    }

    return csvFileContent
  } catch (error) {
    // console.log(error)
    throw new Error(
      `Se ha producido un error durante la carga de los datos del archivo CSV "${csvFile}":${CONSOLE_LINE_BREAK}${error.message}`
    )
  }
}

// Recrea los índices de un modelo
const recreateIndexes = async (model) => {
  for (const index of await model.collection.indexes()) {
    // El índice "_id_" es obligatorio
    if (index.name !== '_id_') {
      await model.collection.dropIndex(index.name)
    }
  }

  await model.syncIndexes()
}

const getCurrentDate = () => new Date()

const getCurrentYear = () => getCurrentDate().getFullYear()

const getMillisecondsCurrentDate = () => Date.now()

const getMomentDate = (dateString, dateFormat, isStrictParsing = true) =>
  moment(dateString, dateFormat, isStrictParsing)

// Ordena los coches alfabéticamente por marca y modelo ignorando tildes, minúsculas y mayúsculas
const sortCars = (car1, car2) =>
  `${car1.make} (${car1.model})`.localeCompare(
    `${car2.make} (${car2.model})`,
    'en',
    { sensitivity: 'base' }
  )

// Ordena los clientes alfabéticamente por apellidos y nombre ignorando tildes, minúsculas y mayúsculas
const sortCustomers = (customer1, customer2) =>
  `${customer1.surnames}, ${customer1.name}`.localeCompare(
    `${customer2.surnames}, ${customer2.name}`,
    'en',
    { sensitivity: 'base' }
  )

// Ordena los usuarios alfabéticamente por nombre de usuario ignorando tildes, minúsculas y mayúsculas
const sortUsers = (user1, user2) =>
  user1.username.localeCompare(user2.username, 'en', { sensitivity: 'base' })

// Elimina espacios innecesarios
const normalizeString = (string) => string.replace(/\s+/g, ' ').trim()

// Elimina espacios y tildes
const normalizeUserName = (username) =>
  username
    .replace(/\s/g, '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

const getError = (msg, status) => {
  const error = new Error(msg)

  error.status = status

  return error
}

const formatErrorMsg = (msg) =>
  msg.replaceAll("', '", "','").replaceAll(', ', LINE_BREAK)

const helpers = {
  LINE_BREAK,
  CONSOLE_LINE_BREAK,
  loadCsvFile,
  recreateIndexes,
  getCurrentDate,
  getCurrentYear,
  getMillisecondsCurrentDate,
  getMomentDate,
  sortCars,
  sortCustomers,
  sortUsers,
  normalizeString,
  normalizeUserName,
  getError,
  formatErrorMsg
}

module.exports = { helpers }
