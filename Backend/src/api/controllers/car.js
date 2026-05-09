const mongoose = require('mongoose')
const { Car, CAR_CONDITIONS, CAR_STATUSES } = require('../models/car')
const { deleteFile, getPublicIdCloudinary } = require('../../utils/file')
const { helpers } = require('../../utils/helpers')
const { validation } = require('../../utils/validation')

const getAllCars = async (req, res, next) => {
  try {
    const cars = (await Car.find()).sort(helpers.sortCars)

    return res.status(200).json({ data: cars })
  } catch (error) {
    error.message = `Se ha producido un error al consultar los coches:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const getCarById = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const car = await Car.findById(id)

    return car != null
      ? res.status(200).json({ data: car })
      : next(helpers.getError(validation.getCarNotFoundByIdMsg(id), 404))
  } catch (error) {
    error.message = `Se ha producido un error al consultar el coche:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const createCar = async (req, res, next) => {
  const isUploadedFile = req.file != null && req.file.path != null

  try {
    if (isUploadedFile) {
      req.body.img = req.file.path
    }

    // En un coche nuevo el kilometraje siempre es 0
    if (
      req.body.condition != null &&
      req.body.condition.trim() !== '' &&
      helpers.normalizeString(req.body.condition) === CAR_CONDITIONS.new
    ) {
      req.body.mileage = 0
    }

    req.body.status = CAR_STATUSES.available

    const car = await new Car(req.body).save()

    return res
      .status(201)
      .json({ data: car, msg: 'Coche creado correctamente' })
  } catch (error) {
    const msg = 'Se ha producido un error al crear el coche'

    if (isUploadedFile) {
      deleteFile(req.file.path, msg)
    }

    error.message = `${msg}:${helpers.LINE_BREAK}${helpers.formatErrorMsg(
      error.message
    )}`
    error.status = validation.isValidationErrorMsg(error) ? 422 : 500

    return next(error)
  }
}

const updateCarById = async (req, res, next) => {
  const isUploadedFile = req.file != null && req.file.path != null
  const session = await mongoose.startSession()

  try {
    const id = req.params.id.trim()

    session.startTransaction()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const car = await Car.findById(id)

    if (car == null) {
      await session.abortTransaction()

      if (isUploadedFile) {
        deleteFile(req.file.path, validation.getCarNotFoundByIdMsg(id))
      }

      return next(helpers.getError(validation.getCarNotFoundByIdMsg(id), 404))
    }

    if (Object.keys(req.body).length === 0 && req.file == null) {
      throw helpers.getValidationError('form', validation.NO_UPDATE_DATA)
    }

    const updatedCar = new Car(car)
    const updatedCarImg = updatedCar.img
    // Se sustituye la información del coche a actualizar por la introducida por el usuario
    const { color, img, price } = req.body

    updatedCar.img = isUploadedFile ? req.file.path : (img ?? updatedCar.img)

    // Si el coche no está disponible sólo se puede actualizar la imagen
    if (car.status === CAR_STATUSES.available) {
      updatedCar.color = color ?? updatedCar.color
      updatedCar.price = price ?? updatedCar.price
    }

    await updatedCar.save({ session })

    // Siempre que se actualiza la imagen del coche, se elimina la que está subida a "cloudinary"
    if (isUploadedFile || img != null) {
      deleteFile(
        updatedCarImg,
        `Actualización de la imagen "${isUploadedFile ? getPublicIdCloudinary(req.file.path) : img}" del coche`
      )
    }

    await session.commitTransaction()

    return res
      .status(200)
      .json({ data: updatedCar, msg: 'Coche actualizado correctamente' })
  } catch (error) {
    await session.abortTransaction()

    const msg = 'Se ha producido un error al actualizar el coche'

    if (isUploadedFile) {
      deleteFile(req.file.path, msg)
    }

    error.message = `${msg}:${helpers.LINE_BREAK}${helpers.formatErrorMsg(
      error.message
    )}`
    error.status = validation.isValidationErrorMsg(error) ? 422 : 500

    return next(error)
  } finally {
    session.endSession()
  }
}

const deleteCarById = async (req, res, next) => {
  const session = await mongoose.startSession()

  try {
    const id = req.params.id.trim()

    session.startTransaction()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const car = await Car.findById(id)

    if (car == null) {
      await session.abortTransaction()

      return next(helpers.getError(validation.getCarNotFoundByIdMsg(id), 404))
    }

    // No se puede eliminar un coche que no está disponible
    if (car.status !== CAR_STATUSES.available) {
      throw helpers.getValidationError(
        'form',
        validation.CANNOT_DELETE_NOT_AVAILABLE_CAR
      )
    }

    await Car.deleteOne(car, { session })

    const msg = 'Coche eliminado correctamente'

    deleteFile(car.img, msg)

    await session.commitTransaction()

    return res.status(200).json({ msg })
  } catch (error) {
    await session.abortTransaction()

    error.message = `Se ha producido un error al eliminar el coche:${helpers.LINE_BREAK}${error.message}`
    error.status = validation.isValidationErrorMsg(error) ? 422 : 500

    return next(error)
  } finally {
    session.endSession()
  }
}

const carController = {
  getAllCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById
}

module.exports = { carController }
