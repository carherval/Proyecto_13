const express = require('express')
const { saleController } = require('../controllers/sale')
const { isAuthorizedUser } = require('../../middlewares/auth')
const { uploadCar, uploadSale } = require('../../middlewares/upload')

const saleRouter = express.Router()

saleRouter.get('/get/all/', isAuthorizedUser(), saleController.getAllSales)

saleRouter.get('/get/id/:id', isAuthorizedUser(), saleController.getSaleById)

saleRouter.get(
  '/get/car-id/:id',
  isAuthorizedUser(),
  saleController.getSaleByCarId
)

saleRouter.get(
  '/get/customer-id/:id',
  isAuthorizedUser(),
  saleController.getSalesByCustomerId
)

saleRouter.post(
  '/create/',
  isAuthorizedUser(),
  uploadSale(),
  saleController.createSale
)

saleRouter.delete(
  '/delete/id/:id',
  isAuthorizedUser(),
  uploadCar(),
  saleController.deleteSaleById
)

module.exports = { saleRouter }
