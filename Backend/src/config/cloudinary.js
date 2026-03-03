const cloudinary = require('cloudinary')
const dotenv = require('dotenv')
const { helpers } = require('../utils/helpers')

const connectToCloudinary = () => {
  try {
    console.log('Conectándose con "Cloudinary"...')

    // Se suprimen "logs" innecesarios
    dotenv.config({ quiet: true })
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    console.log('Conexión con "Cloudinary" realizada correctamente')
  } catch (error) {
    console.log(
      `Se ha producido un error al conectar con "Cloudinary":${helpers.CONSOLE_LINE_BREAK}${error.message}`
    )
  }
}

module.exports = { connectToCloudinary }
