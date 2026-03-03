const express = require('express')
const { reservationController } = require('../controllers/reservation')
const { isAuthorizedUser } = require('../../middlewares/auth')
const { uploadReservation } = require('../../middlewares/upload')

const reservationRouter = express.Router()

reservationRouter.get(
  '/get/all/',
  isAuthorizedUser(),
  reservationController.getAllReservations
)

reservationRouter.get(
  '/get/id/:id',
  isAuthorizedUser(),
  reservationController.getReservationById
)

reservationRouter.get(
  '/get/car-id/:id',
  isAuthorizedUser(),
  reservationController.getReservationByCarId
)

reservationRouter.get(
  '/get/customer-id/:id',
  isAuthorizedUser(),
  reservationController.getReservationsByCustomerId
)

reservationRouter.post(
  '/create/',
  isAuthorizedUser(),
  uploadReservation(),
  reservationController.createReservation
)

reservationRouter.delete(
  '/delete/id/:id',
  isAuthorizedUser(),
  reservationController.deleteReservationById
)

module.exports = { reservationRouter }
