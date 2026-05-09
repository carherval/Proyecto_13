import fetch from './fetch'
import helpers from '../helpers'
import strings from '../strings'

const CUSTOMER_API_URL = `${fetch.API_URL}/${strings.ENTITIES.customer}`

const getAllCustomers = () =>
  fetch.getData(
    `${CUSTOMER_API_URL}/get/all/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const getCustomerById = (id) =>
  fetch.getData(
    `${CUSTOMER_API_URL}/get/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const createCustomer = (body) =>
  fetch.getData(
    `${CUSTOMER_API_URL}/create/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.post,
    body
  )

const updateCustomerById = (id, body) =>
  fetch.getData(
    `${CUSTOMER_API_URL}/update/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.put,
    body
  )

const deleteCustomerById = (id) =>
  fetch.getData(
    `${CUSTOMER_API_URL}/delete/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.delete,
    null
  )

const customerFetch = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById
}

export default customerFetch
