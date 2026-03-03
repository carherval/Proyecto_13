const PORT = 3000

const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const { carRouter } = require('./src/api/routes/car')
const { customerRouter } = require('./src/api/routes/customer')
const { reservationRouter } = require('./src/api/routes/reservation')
const { saleRouter } = require('./src/api/routes/sale')
const { userRouter } = require('./src/api/routes/user')
const { connectToDataBase } = require('./src/config/db')
const { connectToCloudinary } = require('./src/config/cloudinary')
const { helpers } = require('./src/utils/helpers')

const carDealership = express()

carDealership.use(express.json())
// Interpreta las solicitudes HTTP a través del "req.body" de las rutas
carDealership.use(express.urlencoded({ extended: false }))
// Se suprimen "logs" innecesarios
dotenv.config({ quiet: true })
// Permite al "backend" aceptar solicitudes del "frontend" cuando son dominios diferentes
carDealership.use(
  cors({
    origin: process.env.FRONT_URL,
    methods: ['GET', 'DELETE', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

carDealership.use('/car', carRouter)
carDealership.use('/customer', customerRouter)
carDealership.use('/reservation', reservationRouter)
carDealership.use('/sale', saleRouter)
carDealership.use('/user', userRouter)

// Gestión de ruta no encontrada
carDealership.use((req, res, next) =>
  next(
    helpers.getError(
      `Ruta no encontrada${helpers.LINE_BREAK}Comprueba la URL y sus parámetros`,
      404
    )
  )
)

// Gestión de errores
carDealership.use((error, req, res, next) => {
  console.log(
    `Error ${error.status}: ${error.message.replaceAll(
      helpers.LINE_BREAK,
      helpers.CONSOLE_LINE_BREAK
    )}`
  )

  return res.status(error.status).json({ msg: error.message })
})

carDealership.listen(PORT, async () => {
  console.log(`Servidor express ejecutándose`)

  await connectToDataBase()
  connectToCloudinary()
})
