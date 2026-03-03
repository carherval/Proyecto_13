const cloudinary = require('cloudinary')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { Car } = require('../api/models/car')
const { Customer } = require('../api/models/customer')
const { Reservation } = require('../api/models/reservation')
const { Sale } = require('../api/models/sale')
const { CAR_FOLDER_NAME } = require('../middlewares/upload')
const { helpers } = require('./helpers')

const MAX_RESULTS = 500

// Crea los coches y los clientes en ambas colecciones
const createData = async () => {
  // Se suprimen "logs" innecesarios
  dotenv.config({ quiet: true })

  const dbUrl = process.env.DB_URL
  const dbName = dbUrl.substring(dbUrl.lastIndexOf('/') + 1, dbUrl.indexOf('?'))

  try {
    console.log(
      `Se van a generar los datos en la colecciones "${Car.collection.name}" y "${Customer.collection.name}"`
    )

    await mongoose.connect(dbUrl)
    console.log(
      `Conexión con la Base de Datos "${dbName}" realizada correctamente`
    )

    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
    console.log('Conexión con "Cloudinary" realizada correctamente')

    await Car.collection.drop()
    console.log(
      `Se han eliminado los datos antiguos en la colección "${Car.collection.name}"`
    )

    // Se eliminan las imágenes de los coches de "cloudinary"
    try {
      await Promise.all(
        (
          await cloudinary.v2.search
            .expression(`folder:${CAR_FOLDER_NAME}`)
            .max_results(MAX_RESULTS)
            .execute()
        ).resources.map((img) => cloudinary.v2.uploader.destroy(img.public_id))
      )

      console.log('Se han eliminado las imágenes de los coches de "Cloudinary"')
    } catch (error) {
      // console.log(error)
      throw new Error(
        `Se ha producido un error durante la eliminación de las imágenes de los coches de "Cloudinary":${helpers.CONSOLE_LINE_BREAK}${error.message}`
      )
    }

    await Customer.collection.drop()
    console.log(
      `Se han eliminado los datos antiguos en la colección "${Customer.collection.name}"`
    )

    await Reservation.collection.drop()
    console.log(
      `Se han eliminado los datos antiguos en la colección "${Reservation.collection.name}"`
    )

    await Sale.collection.drop()
    console.log(
      `Se han eliminado los datos antiguos en la colección "${Sale.collection.name}"`
    )

    try {
      // La ruta del archivo se indica desde el raíz del proyecto
      const cars = await helpers.loadCsvFile('./src/data/car.csv')

      await Car.insertMany(cars)
      console.log(
        `Se han creado los nuevos datos en la colección "${Car.collection.name}"`
      )
    } catch (error) {
      // console.log(error)
      throw new Error(
        `Se ha producido un error durante la carga de los datos en la colección "${Car.collection.name}":${helpers.CONSOLE_LINE_BREAK}${error.message}`
      )
    }

    try {
      // La ruta del archivo se indica desde el raíz del proyecto
      const customers = await helpers.loadCsvFile('./src/data/customer.csv')

      await Customer.insertMany(customers)
      console.log(
        `Se han creado los nuevos datos en la colección "${Customer.collection.name}"`
      )
    } catch (error) {
      // console.log(error)
      throw new Error(
        `Se ha producido un error durante la carga de los datos en la colección "${Customer.collection.name}":${helpers.CONSOLE_LINE_BREAK}${error.message}`
      )
    }
  } catch (error) {
    console.log(
      `Se ha producido un error durante la carga de los datos:${helpers.CONSOLE_LINE_BREAK}${error.message}`
    )
  } finally {
    // No existe la desconexión como tal de "cloudinary"
    await mongoose.disconnect()
    console.log(
      `Se ha realizado la desconexión con la Base de Datos "${dbName}"`
    )
  }
}

createData()
