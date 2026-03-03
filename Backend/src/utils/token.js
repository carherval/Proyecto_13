const dotenv = require('dotenv')
const jsonwebtoken = require('jsonwebtoken')

// Minutos
const EXPIRATION_TIME = 15

// Se suprimen "logs" innecesarios
dotenv.config({ quiet: true })

// Devuelve un token generado mediante la clave secreta
const getJsonWebToken = (id, username) =>
  jsonwebtoken.sign({ id, username }, process.env.SECRET_KEY, {
    expiresIn: `${EXPIRATION_TIME}m`
  })

// Devuelve un token decodificado validándolo mediante la clave secreta
const getDecodedToken = (token) =>
  jsonwebtoken.verify(token, process.env.SECRET_KEY)

module.exports = { getJsonWebToken, getDecodedToken }
