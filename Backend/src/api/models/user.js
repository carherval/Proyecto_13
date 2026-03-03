const mongoose = require('mongoose')
const { helpers } = require('../../utils/helpers')
const { validation } = require('../../utils/validation')

const USER_COLLECTION_NAME = 'user'

const ROLES = { seller: 'seller', admin: 'admin', superadmin: 'superadmin' }
const { superadmin, ...ALLOWED_ROLES } = ROLES

const userSchema = new mongoose.Schema(
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
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, validation.REQUIRED_MSG],
      unique: [true, `username: ${validation.UNIQUE_MSG}`]
    },
    password: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG],
      select: false
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
    },
    role: {
      type: String,
      trim: true,
      required: [true, validation.REQUIRED_MSG],
      enum: {
        values: Object.values(ALLOWED_ROLES),
        message: validation.NOT_ALLOWED_VALUE_MSG
      }
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('validate', function () {
  if (this.surnames != null) {
    this.surnames = helpers.normalizeString(this.surnames)
  }

  if (this.name != null) {
    this.name = helpers.normalizeString(this.name)
  }

  if (this.username != null) {
    this.username = helpers.normalizeUserName(this.username)
  }

  if (this.role != null) {
    this.role = helpers.normalizeString(this.role)
  }
})

// Modelo, esquema y colección de los usuarios
// Si no se especifica, por defecto, la colección es el plural del modelo
const User = mongoose.model(
  USER_COLLECTION_NAME,
  userSchema,
  USER_COLLECTION_NAME
)

module.exports = { ROLES, User }
