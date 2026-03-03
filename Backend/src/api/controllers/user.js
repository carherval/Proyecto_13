const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { ROLES, User } = require('../models/user')
const { helpers } = require('../../utils/helpers')
const { getJsonWebToken } = require('../../utils/token')
const { validation } = require('../../utils/validation')

const getAllUsers = async (req, res, next) => {
  try {
    const users = (await User.find()).sort(helpers.sortUsers)

    return res.status(200).json({
      msg: users.length === 0 ? 'No se han encontrado usuarios' : undefined,
      data: users
    })
  } catch (error) {
    error.message = `Se ha producido un error al consultar los usuarios:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    if (req.user.role === ROLES.seller && req.user._id.toString() !== id) {
      return next(
        helpers.getError(
          validation.getNotAllowedActionMsg(
            validation.getUserOnlyActionMsg(ROLES.admin, 'consultar')
          ),
          403
        )
      )
    }

    const user = await User.findById(id)

    return user != null
      ? res.status(200).json({ data: user })
      : next(helpers.getError(validation.getUserNotFoundByIdMsg(id), 404))
  } catch (error) {
    error.message = `Se ha producido un error al consultar el usuario:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    if (req.body.username == null || req.body.username.trim() === '') {
      throw new Error(validation.REQUIRED_USERNAME_MSG)
    }
    if (req.body.password == null || req.body.password.trim() === '') {
      throw new Error(validation.REQUIRED_PASSWORD_MSG)
    }

    const user = await User.findOne({ username: req.body.username }).select(
      '+password'
    )

    if (user == null) {
      throw new Error(validation.INVALID_USER_PASSWORD_MSG)
    }

    return bcrypt.compareSync(req.body.password, user.password)
      ? res.status(200).json({
          data: {
            token: getJsonWebToken(user._id, user.username),
            tokenExpiredDate: helpers.getMillisecondsCurrentDate(),
            _id: user._id,
            name: user.name,
            role: user.role
          }
        })
      : next(helpers.getError(validation.INVALID_USER_PASSWORD_MSG, 401))
  } catch (error) {
    error.message = `Se ha producido un error al realizar el inicio de sesión del usuario:${
      helpers.LINE_BREAK
    }${helpers.formatErrorMsg(error.message)}`
    error.status = 401

    return next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    // Se valida aquí y no en el "validate" del modelo porque, si no, en el modelo se validaría el "hash" del cifrado de la contraseña, no la contraseña
    if (
      req.body.password != null &&
      !validation.isValidPassword(req.body.password)
    ) {
      throw new Error(validation.INVALID_PASSWORD_MSG)
    }

    // Cifrado de la contraseña
    // Al ser creación del usuario se podría hacer en el "middleware" "pre save" ya que siempre se tiene que cifrar
    if (req.body.password != null) {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    }

    await new User(req.body).save()

    return res.status(201).json({ msg: 'Usuario creado correctamente' })
  } catch (error) {
    error.message = `Se ha producido un error al crear el usuario:${helpers.LINE_BREAK}${helpers.formatErrorMsg(
      error.message
    )}`
    error.status = 500

    return next(error)
  }
}

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    if (req.user.role === ROLES.seller && req.user._id.toString() !== id) {
      return next(
        helpers.getError(
          validation.getNotAllowedActionMsg(
            validation.getUserOnlyActionMsg(ROLES.admin, 'actualizar')
          ),
          403
        )
      )
    }

    const user = await User.findById(id).select('+password')

    if (user == null) {
      return next(helpers.getError(validation.getUserNotFoundByIdMsg(id), 404))
    }

    if (user.role === ROLES.superadmin) {
      return next(
        helpers.getError(
          validation.getCannotUserActionMsg(ROLES.superadmin, 'actualizar'),
          403
        )
      )
    }

    if (Object.keys(req.body).length === 0) {
      throw new Error(validation.NO_UPDATE_DATA)
    }

    const updatedUser = new User(user)
    // Se sustituye la información del usuario a actualizar por la introducida por el usuario
    const { surnames, name, username, password, email, role } = req.body

    // Se valida aquí y no en el "validate" del modelo porque, si no, en el modelo se validaría el "hash" del cifrado de la contraseña, no la contraseña
    if (password != null && !validation.isValidPassword(password)) {
      throw new Error(validation.INVALID_PASSWORD_MSG)
    }

    updatedUser.surnames = surnames ?? updatedUser.surnames
    updatedUser.name = name ?? updatedUser.name
    updatedUser.username = username ?? updatedUser.username
    // Cifrado de la contraseña
    // Se hace aquí y no en el "middleware" "pre save" para evitar que se cifre siempre aunque no se actualice
    updatedUser.password =
      password != null ? bcrypt.hashSync(password, 10) : updatedUser.password
    updatedUser.email = email ?? updatedUser.email

    // El rol sólo puede ser actualizado por un usuario "admin"
    if (req.user.role !== ROLES.seller && role != null) {
      updatedUser.role = role
    }

    await updatedUser.save()

    return res.status(200).json({ msg: 'Usuario actualizado correctamente' })
  } catch (error) {
    error.message = `Se ha producido un error al actualizar el usuario:${helpers.LINE_BREAK}${helpers.formatErrorMsg(
      error.message
    )}`
    error.status = 500

    return next(error)
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    if (req.user._id.toString() === id) {
      return next(
        helpers.getError(
          validation.getNotAllowedActionMsg(
            validation.getCannotSelfUserActionMsg('eliminar')
          ),
          403
        )
      )
    }

    const user = await User.findById(id)

    if (user == null) {
      return next(helpers.getError(validation.getUserNotFoundByIdMsg(id), 404))
    }

    if (user.role === ROLES.superadmin) {
      return next(
        helpers.getError(
          validation.getCannotUserActionMsg(ROLES.superadmin, 'eliminar'),
          403
        )
      )
    }

    await User.deleteOne(user)

    return res.status(200).json({ msg: 'Usuario eliminado correctamente' })
  } catch (error) {
    error.message = `Se ha producido un error al eliminar el usuario:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const userController = {
  getAllUsers,
  getUserById,
  loginUser,
  createUser,
  updateUserById,
  deleteUserById
}

module.exports = { userController }
