import fetch from './fetch'
import helpers from '../helpers'
import strings from '../strings'

const CAR_API_URL = `${fetch.API_URL}/${strings.ENTITIES.car}`

const getAllCars = () =>
  fetch.getData(
    `${CAR_API_URL}/get/all/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const getCarById = (id) =>
  fetch.getData(
    `${CAR_API_URL}/get/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const createCar = (body) =>
  fetch.getData(
    `${CAR_API_URL}/create/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.post,
    body
  )

const updateCarById = (id, body) =>
  fetch.getData(
    `${CAR_API_URL}/update/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.put,
    body
  )

const deleteCarById = (id) =>
  fetch.getData(
    `${CAR_API_URL}/delete/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.delete,
    null
  )

const carFetch = {
  getAllCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById
}

export default carFetch
