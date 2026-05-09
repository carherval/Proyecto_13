import fetch from './fetch'
import helpers from '../helpers'
import strings from '../strings'

const SALE_API_URL = `${fetch.API_URL}/${strings.ENTITIES.sale}`

const getAllSales = () =>
  fetch.getData(
    `${SALE_API_URL}/get/all/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const getSaleById = (id) =>
  fetch.getData(
    `${SALE_API_URL}/get/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const getSaleByCarId = (id) =>
  fetch.getData(
    `${SALE_API_URL}/get/car-id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const getSalesByCustomerId = (id) =>
  fetch.getData(
    `${SALE_API_URL}/get/customer-id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const createSale = (body) =>
  fetch.getData(
    `${SALE_API_URL}/create/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.post,
    body
  )

const deleteSaleById = (id, body) =>
  fetch.getData(
    `${SALE_API_URL}/delete/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.delete,
    body
  )

const saleFetch = {
  getAllSales,
  getSaleById,
  getSaleByCarId,
  getSalesByCustomerId,
  createSale,
  deleteSaleById
}

export default saleFetch
