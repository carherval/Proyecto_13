const mongoose = require('mongoose')
const { Customer } = require('../models/customer')
const { Reservation } = require('../models/reservation')
const { Sale } = require('../models/sale')
const { helpers } = require('../../utils/helpers')
const { validation } = require('../../utils/validation')

const getAllCustomers = async (req, res, next) => {
  try {
    const customers = (await Customer.find()).sort(helpers.sortCustomers)

    return res.status(200).json({ data: customers })
  } catch (error) {
    error.message = `Se ha producido un error al consultar los clientes:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const getCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const customer = await Customer.findById(id)

    return customer != null
      ? res.status(200).json({ data: customer })
      : next(helpers.getError(validation.getCustomerNotFoundByIdMsg(id), 404))
  } catch (error) {
    error.message = `Se ha producido un error al consultar el cliente:${helpers.LINE_BREAK}${error.message}`
    error.status = 500

    return next(error)
  }
}

const createCustomer = async (req, res, next) => {
  try {
    const customer = await new Customer(req.body).save()

    return res
      .status(201)
      .json({ data: customer, msg: 'Cliente creado correctamente' })
  } catch (error) {
    error.message = `Se ha producido un error al crear el cliente:${helpers.LINE_BREAK}${helpers.formatErrorMsg(
      error.message
    )}`
    error.status = validation.isValidationErrorMsg(error) ? 422 : 500

    return next(error)
  }
}

const updateCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id.trim()

    if (!mongoose.isValidObjectId(id)) {
      throw new Error(validation.INVALID_ID_MSG)
    }

    const customer = await Customer.findById(id)

    if (customer == null) {
      return next(
        helpers.getError(validation.getCustomerNotFoundByIdMsg(id), 404)
      )
    }

    if (Object.keys(req.body).length === 0) {
      throw helpers.getValidationError('form', validation.NO_UPDATE_DATA)
    }

    const updatedCustomer = new Customer(customer)
    // Se sustituye la información del cliente a actualizar por la introducida por el usuario
    const { surnames, name, email } = req.body

    updatedCustomer.surnames = surnames ?? updatedCustomer.surnames
    updatedCustomer.name = name ?? updatedCustomer.name
    updatedCustomer.email = email ?? updatedCustomer.email

    await updatedCustomer.save()

    return res
      .status(200)
      .json({ data: updatedCustomer, msg: 'Cliente actualizado correctamente' })
  } catch (error) {
    error.message = `Se ha producido un error al actualizar el cliente:${helpers.LINE_BREAK}${helpers.formatErrorMsg(
      error.message
    )}`
    error.status = validation.isValidationErrorMsg(error) ? 422 : 500

    return next(error)
  }
}

const deleteCustomerById = async (req, res, next) => {
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

    // No se puede eliminar un cliente con coches reservados o vendidos
    if (
      (await Reservation.find({ customer })).length +
        (await Sale.find({ customer })).length >
      0
    ) {
      throw helpers.getValidationError(
        'form',
        validation.CANNOT_DELETE_CUSTOMER_WITH_CARS_MSG
      )
    }

    await Customer.deleteOne(customer)

    return res.status(200).json({ msg: 'Cliente eliminado correctamente' })
  } catch (error) {
    error.message = `Se ha producido un error al eliminar el cliente:${helpers.LINE_BREAK}${error.message}`
    error.status = validation.isValidationErrorMsg(error) ? 422 : 500

    return next(error)
  }
}

const customerController = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById
}

module.exports = { customerController }
