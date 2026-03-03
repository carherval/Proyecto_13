const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { Car } = require('../api/models/car')
const { Customer } = require('../api/models/customer')
const { Reservation } = require('../api/models/reservation')
const { Sale } = require('../api/models/sale')
const { User } = require('../api/models/user')
const { helpers } = require('../utils/helpers')

const connectToDataBase = async () => {
  // Se suprimen "logs" innecesarios
  dotenv.config({ quiet: true })

  const dbUrl = process.env.DB_URL
  const dbName = dbUrl.substring(dbUrl.lastIndexOf('/') + 1, dbUrl.indexOf('?'))

  try {
    console.log(`Conectándose con la Base de Datos "${dbName}"...`)

    await mongoose.connect(dbUrl)

    // await helpers.recreateIndexes(Car)
    // await helpers.recreateIndexes(Customer)
    // await helpers.recreateIndexes(User)
    // await helpers.recreateIndexes(Reservation)
    // await helpers.recreateIndexes(Sale)

    console.log(
      `Conexión con la Base de Datos "${dbName}" realizada correctamente`
    )
  } catch (error) {
    console.log(
      `Se ha producido un error al conectar con la Base de Datos "${dbName}":${helpers.CONSOLE_LINE_BREAK}${error.message}`
    )
  }
}

module.exports = { connectToDataBase }
