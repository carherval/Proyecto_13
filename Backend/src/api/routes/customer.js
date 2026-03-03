const express = require('express')
const { customerController } = require('../controllers/customer')
const { isAuthorizedUser } = require('../../middlewares/auth')
const { uploadCustomer } = require('../../middlewares/upload')

const customerRouter = express.Router()

customerRouter.get(
  '/get/all/',
  isAuthorizedUser(),
  customerController.getAllCustomers
)

customerRouter.get(
  '/get/id/:id',
  isAuthorizedUser(),
  customerController.getCustomerById
)

customerRouter.post(
  '/create/',
  isAuthorizedUser(),
  uploadCustomer(),
  customerController.createCustomer
)

customerRouter.put(
  '/update/id/:id',
  isAuthorizedUser(),
  uploadCustomer(),
  customerController.updateCustomerById
)

customerRouter.delete(
  '/delete/id/:id',
  isAuthorizedUser(),
  customerController.deleteCustomerById
)

module.exports = { customerRouter }
