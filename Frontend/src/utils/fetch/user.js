import fetch from './fetch'
import helpers from '../helpers'
import strings from '../strings'

const USER_API_URL = `${fetch.API_URL}/${strings.ENTITIES.user}`

const getAllUsers = () =>
  fetch.getData(
    `${USER_API_URL}/get/all/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const getUserById = (id) =>
  fetch.getData(
    `${USER_API_URL}/get/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.get,
    null
  )

const loginUser = (body) =>
  fetch.getData(`${USER_API_URL}/login/`, null, fetch.FETCH_METHODS.post, body)

const createUser = (body) =>
  fetch.getData(
    `${USER_API_URL}/create/`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.post,
    body
  )

const updateUserById = (id, body) =>
  fetch.getData(
    `${USER_API_URL}/update/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.put,
    body
  )

const deleteUserById = (id) =>
  fetch.getData(
    `${USER_API_URL}/delete/id/${id}`,
    helpers.getUserToken(),
    fetch.FETCH_METHODS.delete,
    null
  )

const userFetch = {
  getAllUsers,
  getUserById,
  loginUser,
  createUser,
  updateUserById,
  deleteUserById
}

export default userFetch
