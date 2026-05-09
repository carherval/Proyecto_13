const mongoose = require('mongoose')
const { Car, CAR_STATUSES } = require('../models/car')
const { Customer } = require('../models/customer')
const { Reservation } = require('../models/reservation')
const { helpers } = require('../../utils/helpers')
const { validation } = require('../../utils/validation')

const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find()
      .sort({ reservationDate: -1 })
      .populate('car')
      .populate('customer')

    return res.status(200).json({ data: reservations })
  } catch (error) {
    error.message = `Se ha producido un error al consultar las reservas:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const getReservationById = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const reservation = await Reservation.findById(id)
      .populate('car')
      .populate('customer')

    return reservation != null
      ? res.status(200).json({ data: reservation })
      : next(
          helpers.getError(validation.getReservationNotFoundByIdMsg(id), 404)
        )
  } catch (error) {
    error.message = `Se ha producido un error al consultar la reserva:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const getReservationByCarId = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const car = (await Car.findById(id))?._id

    if (car == null) {
      return next(helpers.getError(validation.getCarNotFoundByIdMsg(id), 404))
    }

    const reservation = await Reservation.findOne({ car })
      .populate('car')
      .populate('customer')

    return reservation != null
      ? res.status(200).json({ data: reservation })
      : next(
          helpers.getError('No se ha encontrado ninguna reserva del coche', 404)
        )
  } catch (error) {
    error.message = `Se ha producido un error al consultar la reserva del coche:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const getReservationsByCustomerId = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const customer = (await Customer.findById(id))?._id

    if (customer == null) {
      return next(
        helpers.getError(validation.getCustomerNotFoundByIdMsg(id), 404)
      )
    }

    const reservations = await Reservation.find({ customer })
      .sort({ reservationDate: -1 })
      .populate('car')
      .populate('customer')

    return res.status(200).json({ data: reservations })
  } catch (error) {
    error.message = `Se ha producido un error al consultar las reservas del cliente:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

// Reservar coche
const createReservation = async (req, res, next) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const reservation = await new Reservation(req.body).save({ session })
    const car = await Car.findById(reservation.car)

    // Se actualiza el estado del coche
    car.status = CAR_STATUSES.reserved
    await car.save({ session })

    await session.commitTransaction()

    return res.status(201).json({
      data: { reservation, car },
      msg: 'Coche reservado correctamente'
    })
  } catch (error) {
    console.log(error.name)
    await session.abortTransaction()

    error.message = `Se ha producido un error al reservar el coche:${helpers.LINE_BREAK}${helpers.formatErrorMsg(
      error.message
    )}`
    error.status = validation.isValidationErrorMsg(error) ? 422 : 500

    return next(error)
  } finally {
    session.endSession()
  }
}

// Anular reserva
const deleteReservationById = async (req, res, next) => {
  const session = await mongoose.startSession()

  try {
    const id = req.params.id.trim()

    session.startTransaction()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const reservation = await Reservation.findById(id)

    if (reservation == null) {
      await session.abortTransaction()

      return next(
        helpers.getError(validation.getReservationNotFoundByIdMsg(id), 404)
      )
    }

    await Reservation.deleteOne(reservation, { session })

    const car = await Car.findById(reservation.car)

    // Se actualiza el estado del coche
    car.status = CAR_STATUSES.available
    await car.save({ session })

    await session.commitTransaction()

    return res
      .status(200)
      .json({ data: { car }, msg: 'Reserva anulada correctamente' })
  } catch (error) {
    await session.abortTransaction()

    error.message = `Se ha producido un error al anular la reserva:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  } finally {
    session.endSession()
  }
}

const reservationController = {
  getAllReservations,
  getReservationById,
  getReservationByCarId,
  getReservationsByCustomerId,
  createReservation,
  deleteReservationById
}

module.exports = { reservationController }
