const mongoose = require('mongoose')
const { Car, CAR_CONDITIONS, CAR_STATUSES } = require('../models/car')
const { Customer } = require('../models/customer')
const { Sale } = require('../models/sale')
const { helpers } = require('../../utils/helpers')
const { validation } = require('../../utils/validation')
const { Reservation } = require('../models/reservation')

const getAllSales = async (req, res, next) => {
  try {
    const sales = await Sale.find()
      .sort({ saleDate: -1 })
      .populate('car')
      .populate('customer')

    return res.status(200).json({
      msg: sales.length === 0 ? 'No se han encontrado ventas' : undefined,
      data: sales
    })
  } catch (error) {
    error.message = `Se ha producido un error al consultar las ventas:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const getSaleById = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const sale = await Sale.findById(id).populate('car').populate('customer')

    return sale != null
      ? res.status(200).json({ data: sale })
      : next(helpers.getError(validation.getSaleNotFoundByIdMsg(id), 404))
  } catch (error) {
    error.message = `Se ha producido un error al consultar la venta:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const getSaleByCarId = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const car = (await Car.findById(id))?._id

    if (car == null) {
      return next(helpers.getError(validation.getCarNotFoundByIdMsg(id), 404))
    }

    const sale = await Sale.findOne({ car })
      .populate('car')
      .populate('customer')

    return sale != null
      ? res.status(200).json({ data: sale })
      : next(
          helpers.getError('No se ha encontrado ninguna venta del coche', 404)
        )
  } catch (error) {
    error.message = `Se ha producido un error al consultar la venta del coche:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const getSalesByCustomerId = async (req, res, next) => {
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

    const sales = await Sale.find({ customer })
      .sort({ saleDate: -1 })
      .populate('car')
      .populate('customer')

    return res.status(200).json({
      msg:
        sales.length === 0
          ? 'No se han encontrado ventas del cliente'
          : undefined,
      data: sales
    })
  } catch (error) {
    error.message = `Se ha producido un error al consultar las ventas del cliente:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

// Vender coche
const createSale = async (req, res, next) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const sale = await new Sale(req.body).save({ session })
    const car = await Car.findById(sale.car)
    const carReservation = await Reservation.findOne({ car: car._id })

    // Si se vende un coche reservado se anula la reserva
    if (carReservation != null) {
      await Reservation.deleteOne(carReservation, { session })
    }

    // Se actualiza el estado del coche
    car.status = CAR_STATUSES.sold
    await car.save({ session })

    await session.commitTransaction()

    return res.status(201).json({ msg: 'Coche vendido correctamente' })
  } catch (error) {
    await session.abortTransaction()

    error.message = `Se ha producido un error al vender el coche:${helpers.LINE_BREAK}${helpers.formatErrorMsg(
      error.message
    )}`
    error.status = 500

    return next(error)
  } finally {
    session.endSession()
  }
}

// Devolver coche
const deleteSaleById = async (req, res, next) => {
  const session = await mongoose.startSession()

  try {
    const id = req.params.id.trim()

    session.startTransaction()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const sale = await Sale.findById(id)

    if (sale == null) {
      await session.abortTransaction()

      return next(helpers.getError(validation.getSaleNotFoundByIdMsg(id), 404))
    }

    // Al devolver un coche hay que añadir el nuevo kilometraje

    if (req.body.mileage == null || req.body.mileage.trim() === '') {
      throw new Error(`mileage: ${validation.REQUIRED_MSG}`)
    }

    const mileage = Number(req.body.mileage)

    if (!Number.isInteger(mileage) || !validation.isValidMileage(mileage)) {
      throw new Error(validation.INVALID_MILEAGE_MSG)
    }

    await Sale.deleteOne(sale, { session })

    const car = await Car.findById(sale.car)

    // Se actualiza la condición, el kilometraje y el estado del coche
    car.condition = CAR_CONDITIONS.used
    car.mileage = Number(car.mileage) + mileage
    car.status = CAR_STATUSES.available
    await car.save({ session })

    await session.commitTransaction()

    return res.status(200).json({ msg: 'Coche devuelto correctamente' })
  } catch (error) {
    await session.abortTransaction()

    error.message = `Se ha producido un error al devolver el coche:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  } finally {
    session.endSession()
  }
}

const saleController = {
  getAllSales,
  getSaleById,
  getSaleByCarId,
  getSalesByCustomerId,
  createSale,
  deleteSaleById
}

module.exports = { saleController }
