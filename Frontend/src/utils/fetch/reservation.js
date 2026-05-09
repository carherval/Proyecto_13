import fetch from './fetch'
import helpers from '../helpers'
import strings from '../strings'

const RESERVATION_API_URL = `${fetch.API_URL}/${strings.ENTITIES.reservation}`

const getAllReservations = () =>
  fetch.getData(
    `${RESERVATION_API_URL}/get/all/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const getReservationById = (id) =>
  fetch.getData(
    `${RESERVATION_API_URL}/get/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const getReservationByCarId = (id) =>
  fetch.getData(
    `${RESERVATION_API_URL}/get/car-id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const getReservationsByCustomerId = (id) =>
  fetch.getData(
    `${RESERVATION_API_URL}/get/customer-id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const createReservation = (body) =>
  fetch.getData(
    `${RESERVATION_API_URL}/create/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.post,
    body
  )

const deleteReservationById = (id) =>
  fetch.getData(
    `${RESERVATION_API_URL}/delete/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.delete,
    null
  )

const reservationFetch = {
  getAllReservations,
  getReservationById,
  getReservationByCarId,
  getReservationsByCustomerId,
  createReservation,
  deleteReservationById
}

export default reservationFetch
