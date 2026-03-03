const express = require('express')
const { carController } = require('../controllers/car')
const { ROLES } = require('../models/user')
const { isAuthorizedUser } = require('../../middlewares/auth')
const { isValidSize } = require('../../middlewares/file')
const { uploadCarImg } = require('../../middlewares/upload')

const carRouter = express.Router()

carRouter.get(
  '/get/all/',
  isAuthorizedUser({ isRequiredLogin: false }),
  carController.getAllCars
)

carRouter.get(
  '/get/id/:id',
  isAuthorizedUser({ isRequiredLogin: false }),
  carController.getCarById
)

carRouter.post(
  '/create/',
  isAuthorizedUser({ role: ROLES.admin }),
  isValidSize,
  uploadCarImg(),
  carController.createCar
)

carRouter.put(
  '/update/id/:id',
  isAuthorizedUser({ role: ROLES.admin }),
  isValidSize,
  uploadCarImg(),
  carController.updateCarById
)

carRouter.delete(
  '/delete/id/:id',
  isAuthorizedUser({ role: ROLES.admin }),
  carController.deleteCarById
)

module.exports = { carRouter }
