const mongoose = require('mongoose')
const { helpers } = require('../../utils/helpers')
const { validation } = require('../../utils/validation')

const CUSTOMER_COLLECTION_NAME = 'customer'

const customerSchema = new mongoose.Schema(
  {
    surnames: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG]
    },
    name: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG]
    },
    email: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG],
      validate: {
        validator: validation.isValidEmail,
        message: validation.INVALID_EMAIL_MSG
      },
      unique: [true, `email: ${validation.UNIQUE_MSG}`]
    }
  },
  {
    timestamps: true
  }
)

customerSchema.pre('validate', function () {
  if (this.surnames != null) {
    this.surnames = helpers.normalizeString(this.surnames)
  }

  if (this.name != null) {
    this.name = helpers.normalizeString(this.name)
  }
})

// Modelo, esquema y colección de los clientes
// Si no se especifica, por defecto, la colección es el plural del modelo
const Customer = mongoose.model(
  CUSTOMER_COLLECTION_NAME,
  customerSchema,
  CUSTOMER_COLLECTION_NAME
)

module.exports = { Customer }
