const express = require('express')
const { userController } = require('../controllers/user')
const { ROLES } = require('../models/user')
const { isAuthorizedUser } = require('../../middlewares/auth')
const { uploadUser } = require('../../middlewares/upload')

const userRouter = express.Router()

userRouter.get(
  '/get/all/',
  isAuthorizedUser({ role: ROLES.admin }),
  userController.getAllUsers
)

userRouter.get('/get/id/:id', isAuthorizedUser(), userController.getUserById)

userRouter.post('/login/', uploadUser(), userController.loginUser)

userRouter.post(
  '/create/',
  isAuthorizedUser({ role: ROLES.admin }),
  uploadUser(),
  userController.createUser
)

userRouter.put(
  '/update/id/:id',
  isAuthorizedUser(),
  uploadUser(),
  userController.updateUserById
)

userRouter.delete(
  '/delete/id/:id',
  isAuthorizedUser({ role: ROLES.admin }),
  userController.deleteUserById
)

module.exports = { userRouter }
